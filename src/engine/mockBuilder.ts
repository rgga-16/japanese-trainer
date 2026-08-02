// Mock test assembly: picks a deterministic (per-seed) set of bank exercises
// plus mock passages / reading passages / vocab questions to build a
// JLPT-style mock test, in one of several `MockFormat`s (問題1/2/3, 読解,
// 文字・語彙).
//
// Determinism is layered: every "random decision" (which representative
// exercise for a grammar point, which passages, which MCQ choice order, which
// ordering-exercise display order) is drawn from its OWN `mulberry32` stream
// derived from `seed ^ hashSeed(<namespaced key>)`, never from a single
// shared RNG consumed sequentially. That's deliberate — it means adding
// content (a new exercise, a new passage) can only ever change the specific
// decision that content is eligible for, never shift every other decision
// downstream of it in the stream. See `pickOnePerPoint` for the canonical
// example.

import {
  allExercises,
  allPassages,
  allReadingPassages,
  allVocabQuestions,
} from "../content";
import type {
  McqExercise,
  MockPassage,
  OrderingExercise,
  ReadingPassage,
  ReadingQuestion,
  VocabQuestion,
} from "../content/types";
import type { MockSectionKey } from "../state/types";
import { hashSeed, mulberry32, type Rng, shuffle } from "./rng";

// ---------------------------------------------------------------------------
// Format definitions
// ---------------------------------------------------------------------------

export type MockFormatId = "short" | "standard" | "full";

/** Discriminated: loose-question sections carry `count`, container sections carry `passages`. */
export type MockSectionSpec =
  | { kind: "vocab"; count: number }
  | { kind: "completion"; count: number; n4Share?: number }
  | { kind: "ordering"; count: number }
  | { kind: "passage"; passages: number } // contributes sum of gaps.length
  | { kind: "reading"; passages: number }; // contributes sum of questions.length

export interface MockFormat {
  id: MockFormatId;
  label: string;
  labelJa: string;
  durationSec: number;
  /** Declared total; every built plan's total question count must equal this exactly. */
  questionCount: number;
  /** Presentation order. */
  sections: MockSectionSpec[];
}

/** Target share of the completion section drawn from N4 (vs. N5) points. */
const N4_SHARE = 0.7;

export const MOCK_FORMATS: Record<MockFormatId, MockFormat> = {
  short: {
    id: "short",
    label: "Short",
    labelJa: "小テスト",
    durationSec: 15 * 60,
    questionCount: 15,
    sections: [
      { kind: "completion", count: 8 },
      { kind: "ordering", count: 2 },
      { kind: "passage", passages: 1 },
    ],
  },
  standard: {
    id: "standard",
    label: "Standard",
    labelJa: "標準模試",
    durationSec: 25 * 60,
    questionCount: 25,
    sections: [
      { kind: "completion", count: 15 },
      { kind: "ordering", count: 5 },
      { kind: "passage", passages: 1 },
    ],
  },
  full: {
    id: "full",
    label: "Full",
    labelJa: "完全模試",
    durationSec: 45 * 60,
    questionCount: 40,
    sections: [
      { kind: "vocab", count: 9 },
      { kind: "completion", count: 15 },
      { kind: "ordering", count: 5 },
      { kind: "passage", passages: 1 },
      { kind: "reading", passages: 2 },
    ],
  },
};

export const MOCK_SECTION_ORDER: MockSectionKey[] = [
  "vocab",
  "completion",
  "ordering",
  "passage",
  "reading",
];

export const MOCK_SECTION_LABELS: Record<MockSectionKey, string> = {
  vocab: "文字・語彙",
  completion: "問題1 文法形式の判断",
  ordering: "問題2 文の組み立て",
  passage: "問題3 文章の文法",
  reading: "読解",
};

/** @deprecated use MOCK_FORMATS.standard.durationSec */
export const MOCK_DURATION_SEC = MOCK_FORMATS.standard.durationSec;

// ---------------------------------------------------------------------------
// Plan shape
// ---------------------------------------------------------------------------

export type MockPlanSection =
  | { kind: "vocab"; questions: VocabQuestion[] }
  | { kind: "completion"; questions: McqExercise[] }
  | { kind: "ordering"; questions: OrderingExercise[]; displayOrders: number[][] }
  | { kind: "passage"; passage: MockPassage }
  | { kind: "reading"; passage: ReadingPassage };

export interface MockTestPlan {
  seed: number;
  formatId: MockFormatId;
  /** Set by `buildMockPaper` when the plan is a named preset paper. */
  paperId?: string;
  durationSec: number;
  sections: MockPlanSection[]; // ordered
}

// ---------------------------------------------------------------------------
// Choice shuffling
// ---------------------------------------------------------------------------

/**
 * Returns a NEW object with the same `id`, permuted `choices`, and
 * `correctIndex` updated to keep pointing at the same correct choice.
 *
 * Every authored mock passage gap currently has `correctIndex: 0` (and the
 * view never shuffled), so without this the correct 問題3 answer was always
 * the first button. Applied to completion MCQs, passage gaps, vocab
 * questions, and reading questions in `buildMockTest`.
 */
export function shuffleChoices<T extends { id: string; choices: string[]; correctIndex: number }>(
  q: T,
  rng: Rng
): T {
  const order = shuffle(
    q.choices.map((_, i) => i),
    rng
  );
  const choices = order.map((i) => q.choices[i]);
  const correctIndex = order.indexOf(q.correctIndex);
  return { ...q, choices, correctIndex } as T;
}

// ---------------------------------------------------------------------------
// Per-grammar-point selection
// ---------------------------------------------------------------------------

function levelOfPointId(pointId: string): "N4" | "N5" {
  return pointId.startsWith("n4.") ? "N4" : "N5";
}

function compareById(a: { id: string }, b: { id: string }): number {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

/**
 * One representative exercise per grammarPointId, chosen deterministically.
 *
 * Two bugs this fixes relative to the original implementation:
 *  1. Grouping used to iterate a `Map` in insertion order, which is the
 *     `allExercises` import-concatenation order in `src/content/index.ts` —
 *     reordering those imports silently reshuffled every seeded paper. Fixed
 *     by sorting the pool by `id` before grouping, and by deriving the
 *     representative list from the grammar-point ids in SORTED order (never
 *     Map iteration order).
 *  2. `shuffle(list, rng)[0]` consumed `list.length - 1` draws from a SHARED
 *     rng stream, so deepening one point's exercise pool shifted every
 *     later point's draw. Fixed by giving each point its own derived rng,
 *     seeded from `seed` and the point id (namespaced by `salt` so unrelated
 *     pools — e.g. completion vs. ordering — never share a stream), that
 *     consumes exactly one draw.
 *
 * Exported so tests can exercise pool-perturbation isolation directly.
 */
export function pickOnePerPoint<T extends { id: string; grammarPointId: string }>(
  pool: readonly T[],
  seed: number,
  salt = ""
): T[] {
  const sorted = [...pool].sort(compareById);
  const groups = new Map<string, T[]>();
  for (const ex of sorted) {
    const list = groups.get(ex.grammarPointId);
    if (list) {
      list.push(ex);
    } else {
      groups.set(ex.grammarPointId, [ex]);
    }
  }

  const pointIds = [...groups.keys()].sort();
  const reps: T[] = [];
  for (const pointId of pointIds) {
    const list = groups.get(pointId);
    /* istanbul ignore if -- pointIds is derived from groups.keys() */
    if (!list) continue;
    const r = mulberry32(seed ^ hashSeed(`${salt}:${pointId}`));
    reps.push(list[Math.floor(r() * list.length)]);
  }
  return reps;
}

function selectCompletion(
  pool: McqExercise[],
  count: number,
  n4Share: number,
  seed: number,
  formatId: MockFormatId
): McqExercise[] {
  const reps = pickOnePerPoint(pool, seed, "completion");
  const rng = mulberry32(seed ^ hashSeed("completion.split"));
  const n4Reps = shuffle(
    reps.filter((ex) => levelOfPointId(ex.grammarPointId) === "N4"),
    rng
  );
  const n5Reps = shuffle(
    reps.filter((ex) => levelOfPointId(ex.grammarPointId) === "N5"),
    rng
  );

  const targetN4 = Math.round(count * n4Share);
  const targetN5 = count - targetN4;

  const takeN4 = Math.min(targetN4, n4Reps.length);
  const takeN5 = Math.min(targetN5, n5Reps.length);

  const selected = [...n4Reps.slice(0, takeN4), ...n5Reps.slice(0, takeN5)];

  let shortfall = count - selected.length;
  if (shortfall > 0) {
    const usedIds = new Set(selected.map((ex) => ex.id));
    const remaining = shuffle(
      reps.filter((ex) => !usedIds.has(ex.id)),
      rng
    );
    selected.push(...remaining.slice(0, shortfall));
    shortfall = count - selected.length;
  }

  if (shortfall > 0) {
    throw new Error(
      `buildMockTest: format "${formatId}" completion section needs ${count} bank MCQ ` +
        `exercises (one per grammar point) but only ${selected.length} are available.`
    );
  }

  return selected;
}

function selectOrdering(
  pool: OrderingExercise[],
  count: number,
  seed: number,
  formatId: MockFormatId
): OrderingExercise[] {
  const reps = shuffle(pickOnePerPoint(pool, seed, "ordering"), mulberry32(seed ^ hashSeed("ordering.split")));
  if (reps.length < count) {
    throw new Error(
      `buildMockTest: format "${formatId}" ordering section needs ${count} bank ordering ` +
        `exercises (one per grammar point) but only ${reps.length} are available.`
    );
  }
  return reps.slice(0, count);
}

function selectVocab(
  pool: VocabQuestion[],
  count: number,
  seed: number,
  formatId: MockFormatId
): VocabQuestion[] {
  const shuffled = shuffle([...pool].sort(compareById), mulberry32(seed ^ hashSeed("vocab.select")));
  if (shuffled.length < count) {
    throw new Error(
      `buildMockTest: format "${formatId}" vocab section needs ${count} vocab questions ` +
        `but only ${shuffled.length} are available in the content bank.`
    );
  }
  return shuffled.slice(0, count);
}

/** Pick `n` distinct items deterministically, independent of pool array order. */
function pickDistinct<T extends { id: string }>(
  pool: readonly T[],
  n: number,
  seed: number,
  namespace: string
): T[] {
  const sorted = [...pool].sort(compareById);
  const rng = mulberry32(seed ^ hashSeed(namespace));
  return shuffle(sorted, rng).slice(0, n);
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

/**
 * Cheap capacity predicate so the UI can disable formats the content bank
 * can't fill (e.g. a format section asking for more distinct grammar points,
 * vocab questions, passages, or reading passages than are currently
 * authored) instead of letting `buildMockTest` throw.
 */
export function isFormatAvailable(formatId: MockFormatId): boolean {
  const format = MOCK_FORMATS[formatId];
  const passageGapIds = new Set(allPassages.flatMap((p) => p.gaps.map((g) => g.id)));
  const mcqPool = allExercises.filter(
    (ex): ex is McqExercise =>
      ex.kind === "mcq" && ex.source === "bank" && !passageGapIds.has(ex.id)
  );
  const orderingPool = allExercises.filter(
    (ex): ex is OrderingExercise => ex.kind === "ordering" && ex.source === "bank"
  );
  const distinctCompletionPoints = new Set(mcqPool.map((ex) => ex.grammarPointId)).size;
  const distinctOrderingPoints = new Set(orderingPool.map((ex) => ex.grammarPointId)).size;

  return format.sections.every((spec) => {
    switch (spec.kind) {
      case "vocab":
        return allVocabQuestions.length >= spec.count;
      case "completion":
        return distinctCompletionPoints >= spec.count;
      case "ordering":
        return distinctOrderingPoints >= spec.count;
      case "passage":
        return allPassages.length >= spec.passages;
      case "reading":
        return allReadingPassages.length >= spec.passages;
      default:
        return true;
    }
  });
}

/** Build a deterministic mock test plan for a given numeric seed and format ("standard" by default). */
export function buildMockTest(seed: number, formatId: MockFormatId = "standard"): MockTestPlan {
  const format = MOCK_FORMATS[formatId];

  const passageGapIds = new Set(allPassages.flatMap((p) => p.gaps.map((g) => g.id)));
  const mcqPool = allExercises.filter(
    (ex): ex is McqExercise =>
      ex.kind === "mcq" && ex.source === "bank" && !passageGapIds.has(ex.id)
  );
  const orderingPool = allExercises.filter(
    (ex): ex is OrderingExercise => ex.kind === "ordering" && ex.source === "bank"
  );

  const sections: MockPlanSection[] = [];

  for (const spec of format.sections) {
    switch (spec.kind) {
      case "vocab": {
        const picked = selectVocab(allVocabQuestions, spec.count, seed, formatId);
        const questions = picked.map((q) =>
          shuffleChoices(q, mulberry32(seed ^ hashSeed(`vocab.shuffle:${q.id}`)))
        );
        sections.push({ kind: "vocab", questions });
        break;
      }

      case "completion": {
        const picked = selectCompletion(mcqPool, spec.count, spec.n4Share ?? N4_SHARE, seed, formatId);
        const ordered = shuffle(picked, mulberry32(seed ^ hashSeed("completion.order")));
        const questions = ordered.map((q) =>
          shuffleChoices(q, mulberry32(seed ^ hashSeed(`completion.shuffle:${q.id}`)))
        );
        sections.push({ kind: "completion", questions });
        break;
      }

      case "ordering": {
        const picked = selectOrdering(orderingPool, spec.count, seed, formatId);
        const ordered = shuffle(picked, mulberry32(seed ^ hashSeed("ordering.order")));
        // `starIndex` is a SEGMENT index, so display order can't affect grading;
        // it's still computed here (not in the view) so a named preset paper
        // shows a stable-but-seeded segment order instead of one derived only
        // from the exercise id (which never changed across attempts).
        const displayOrders = ordered.map((q) =>
          shuffle(
            q.segments.map((_, i) => i),
            mulberry32(seed ^ hashSeed(`ordering.display:${q.id}`))
          )
        );
        sections.push({ kind: "ordering", questions: ordered, displayOrders });
        break;
      }

      case "passage": {
        if (allPassages.length < spec.passages) {
          throw new Error(
            `buildMockTest: format "${formatId}" passage section needs ${spec.passages} mock ` +
              `passage(s) but only ${allPassages.length} are available in the content bank.`
          );
        }
        const chosen = pickDistinct(allPassages, spec.passages, seed, "passage.select");
        for (const p of chosen) {
          const gaps = p.gaps.map((g) =>
            shuffleChoices(g, mulberry32(seed ^ hashSeed(`passage.gap:${g.id}`)))
          );
          sections.push({ kind: "passage", passage: { ...p, gaps } });
        }
        break;
      }

      case "reading": {
        if (allReadingPassages.length < spec.passages) {
          throw new Error(
            `buildMockTest: format "${formatId}" reading section needs ${spec.passages} reading ` +
              `passage(s) but only ${allReadingPassages.length} are available in the content bank.`
          );
        }
        const chosen = pickDistinct(allReadingPassages, spec.passages, seed, "reading.select");
        for (const p of chosen) {
          const questions: ReadingQuestion[] = p.questions.map((q) =>
            shuffleChoices(q, mulberry32(seed ^ hashSeed(`reading.q:${q.id}`)))
          );
          sections.push({ kind: "reading", passage: { ...p, questions } });
        }
        break;
      }

      default: {
        const _exhaustive: never = spec;
        throw new Error(`buildMockTest: unknown section spec ${JSON.stringify(_exhaustive)}`);
      }
    }
  }

  return { seed, formatId, durationSec: format.durationSec, sections };
}

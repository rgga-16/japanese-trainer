// Validates ALL authored content from the src/content barrel. Keep this
// passing as content grows — see CONTENT_GUIDE.md for the rules content
// must follow.

import { describe, expect, it } from "vitest";
import {
  allExercises,
  allGrammarPoints,
  allParticleItems,
  allPassages,
  allReadingPassages,
  allTemplates,
  allTransitivityPairs,
  allVocab,
  allVocabQuestions,
  grammarPointById,
} from "../../content";
import { parseFurigana } from "../furigana";
import type {
  ClozeExercise,
  Exercise,
  McqExercise,
  OrderingExercise,
  TransformationExercise,
  TranslationExercise,
  VocabEntry,
} from "../../content/types";

// ---------------------------------------------------------------------------
// Furigana well-formedness helper
// ---------------------------------------------------------------------------
//
// A string is well-formed furigana notation when:
//   1. every "[...]" is immediately preceded by a run of kanji characters
//      (anything else — a stray/unmatched bracket — leaves literal "[" or
//      "]" characters in the base text once parsed);
//   2. every reading inside "[...]" is hiragana-only;
//   3. no kanji character anywhere is left without a reading.

const KANJI = /[㐀-䶿一-鿿々〆ヵヶ〇]/;
const HIRAGANA_ONLY = /^[ぁ-ゟ]+$/;

function furiganaIssues(text: string, label: string): string[] {
  const issues: string[] = [];
  const segments = parseFurigana(text);
  for (const seg of segments) {
    if (seg.base.includes("[") || seg.base.includes("]")) {
      issues.push(`${label}: stray/unmatched bracket near "${seg.base}" (in "${text}")`);
    }
    if (seg.reading !== undefined) {
      if (seg.reading.length === 0 || !HIRAGANA_ONLY.test(seg.reading)) {
        issues.push(`${label}: non-hiragana or empty reading "${seg.reading}" (in "${text}")`);
      }
    } else if (KANJI.test(seg.base)) {
      issues.push(`${label}: kanji without a reading in "${seg.base}" (in "${text}")`);
    }
  }
  return issues;
}

function collectFuriganaIssues(texts: Array<[string | undefined, string]>): string[] {
  const issues: string[] = [];
  for (const [text, label] of texts) {
    if (text === undefined) continue;
    issues.push(...furiganaIssues(text, label));
  }
  return issues;
}

// ---------------------------------------------------------------------------
// Grammar points
// ---------------------------------------------------------------------------

describe("grammar points", () => {
  it("have unique ids", () => {
    const ids = allGrammarPoints.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ids match /^n[45]\\.[a-z0-9-]+$/ and level matches the id prefix", () => {
    const idPattern = /^n[45]\.[a-z0-9-]+$/;
    for (const p of allGrammarPoints) {
      expect(p.id, `grammar point id "${p.id}"`).toMatch(idPattern);
      const expectedLevel = p.id.startsWith("n5.") ? "N5" : "N4";
      expect(p.level, `level of "${p.id}"`).toBe(expectedLevel);
    }
  });

  it("have at least 3 examples each", () => {
    for (const p of allGrammarPoints) {
      expect(p.examples.length, `examples for "${p.id}"`).toBeGreaterThanOrEqual(3);
    }
  });

  it("related ids (if present) resolve to real grammar points", () => {
    for (const p of allGrammarPoints) {
      for (const relatedId of p.related ?? []) {
        expect(grammarPointById.has(relatedId), `"${p.id}".related -> "${relatedId}"`).toBe(true);
      }
    }
  });

  // Note: `title` and `formation` are free-form display/gloss text (see the
  // doc comment on GrammarPoint in content/types.ts, whose own example mixes
  // English words with bare Japanese) and may use "[placeholder]" notation
  // for grammatical roles — they are intentionally NOT part of the strict
  // furigana contract. `examples[].ja` IS full sentence content and must be
  // well-formed.
  it("have well-formed furigana in examples", () => {
    const issues: string[] = [];
    for (const p of allGrammarPoints) {
      p.examples.forEach((ex, i) => {
        issues.push(...furiganaIssues(ex.ja, `${p.id}.examples[${i}].ja`));
      });
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Exercises
// ---------------------------------------------------------------------------

function exercisesForPoint(pointId: string): Exercise[] {
  return allExercises.filter((ex) => ex.grammarPointId === pointId);
}

describe("exercises", () => {
  it("have unique ids", () => {
    const ids = allExercises.map((ex) => ex.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every grammarPointId resolves to a real grammar point", () => {
    for (const ex of allExercises) {
      expect(grammarPointById.has(ex.grammarPointId), `exercise "${ex.id}" -> "${ex.grammarPointId}"`).toBe(true);
    }
  });

  it("every grammar point has at least 4 bank exercises", () => {
    for (const p of allGrammarPoints) {
      const bank = exercisesForPoint(p.id).filter((ex) => ex.source === "bank");
      expect(bank.length, `bank exercises for "${p.id}"`).toBeGreaterThanOrEqual(4);
    }
  });

  it("translation exercises have at least one accepted answer", () => {
    for (const ex of allExercises) {
      if (ex.kind === "translation") {
        expect(ex.accepted.length, `accepted for "${ex.id}"`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("cloze exercises have exactly one ＿＿ gap and at least one accepted filler", () => {
    for (const ex of allExercises) {
      if (ex.kind === "cloze") {
        const gapCount = (ex.sentence.match(/＿＿/g) ?? []).length;
        expect(gapCount, `gap count for "${ex.id}"`).toBe(1);
        expect(ex.accepted.length, `accepted for "${ex.id}"`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("mcq exercises have 4 unique choices and a valid correctIndex", () => {
    for (const ex of allExercises) {
      if (ex.kind === "mcq") {
        expect(ex.choices.length, `choices for "${ex.id}"`).toBe(4);
        expect(new Set(ex.choices).size, `unique choices for "${ex.id}"`).toBe(4);
        expect(ex.correctIndex, `correctIndex for "${ex.id}"`).toBeGreaterThanOrEqual(0);
        expect(ex.correctIndex, `correctIndex for "${ex.id}"`).toBeLessThan(4);
      }
    }
  });

  it("ordering exercises have 3-6 segments and a valid starIndex", () => {
    for (const ex of allExercises) {
      if (ex.kind === "ordering") {
        expect(ex.segments.length, `segments for "${ex.id}"`).toBeGreaterThanOrEqual(3);
        expect(ex.segments.length, `segments for "${ex.id}"`).toBeLessThanOrEqual(6);
        expect(ex.starIndex, `starIndex for "${ex.id}"`).toBeGreaterThanOrEqual(0);
        expect(ex.starIndex, `starIndex for "${ex.id}"`).toBeLessThan(ex.segments.length);
      }
    }
  });

  it("transformation exercises have at least one accepted answer", () => {
    for (const ex of allExercises) {
      if (ex.kind === "transformation") {
        expect(ex.accepted.length, `accepted for "${ex.id}"`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  // ---------------------------------------------------------------------
  // Furigana field map — a `Record` over `Exercise["kind"]` rather than a
  // `switch`. A `switch` with no `default` silently skips validation for a
  // newly added exercise kind (that's exactly how `transformation` could
  // have slipped through unnoticed); a `Record` needs every key populated,
  // so TypeScript raises a compile-time error the moment a new kind is
  // added to the `Exercise` union without a matching entry here.
  //
  // Each function's parameter type is intentionally narrowed to its own
  // exercise variant (not `never`) so a typo in a field name is still
  // caught — the outer `Record<..., (ex: never) => JaFields>` annotation
  // only needs `never` to make each narrower function assignable to a
  // common shape; callers pass the real `Exercise` value cast `as never`
  // to invoke it, which is the standard shape for this exhaustiveness idiom.
  //
  // `instruction` (transformation) is excluded: it's English prose, not
  // Japanese content. `targetLabel` (transformation) is excluded for the
  // same reason `title`/`formation` are exempt above: it's a bare Japanese
  // gloss/chip label (e.g. "可能形"), not full sentence content.
  // ---------------------------------------------------------------------

  type JaFields = Array<[string | undefined, string]>;

  const JA_FIELDS: Record<Exercise["kind"], (ex: never) => JaFields> = {
    translation: (ex: TranslationExercise): JaFields =>
      ex.accepted.map((a, i): [string, string] => [a, `${ex.id}.accepted[${i}]`]),
    cloze: (ex: ClozeExercise): JaFields => [
      [ex.sentence, `${ex.id}.sentence`],
      ...ex.accepted.map((a, i): [string, string] => [a, `${ex.id}.accepted[${i}]`]),
    ],
    mcq: (ex: McqExercise): JaFields => [
      [ex.question, `${ex.id}.question`],
      ...ex.choices.map((c, i): [string, string] => [c, `${ex.id}.choices[${i}]`]),
    ],
    ordering: (ex: OrderingExercise): JaFields => [
      ...ex.segments.map((s, i): [string, string] => [s, `${ex.id}.segments[${i}]`]),
      [ex.lead, `${ex.id}.lead`],
      [ex.tail, `${ex.id}.tail`],
    ],
    transformation: (ex: TransformationExercise): JaFields => [
      [ex.sourceJa, `${ex.id}.sourceJa`],
      ...ex.accepted.map((a, i): [string, string] => [a, `${ex.id}.accepted[${i}]`]),
    ],
  };

  it("have well-formed furigana in every Japanese-bearing field", () => {
    const issues: string[] = [];
    for (const ex of allExercises) {
      issues.push(...collectFuriganaIssues(JA_FIELDS[ex.kind](ex as never)));
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Vocab
// ---------------------------------------------------------------------------

describe("vocab", () => {
  it("have unique ids", () => {
    const ids = allVocab.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("verbs carry a verbClass", () => {
    for (const v of allVocab) {
      if (v.pos === "verb") {
        expect(v.verbClass, `verbClass for "${v.id}"`).toBeDefined();
      }
    }
  });

  it("have no kanji left without a reading in `ja`", () => {
    const issues: string[] = [];
    for (const v of allVocab) {
      issues.push(...furiganaIssues(v.ja, `${v.id}.ja`));
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });

  it("verb `ja` ends in a plain (unbracketed) kana — okurigana convention", () => {
    for (const v of allVocab) {
      if (v.pos === "verb") {
        expect(v.ja.endsWith("]"), `verb "${v.id}" ja="${v.ja}" must not end inside a furigana bracket`).toBe(
          false
        );
      }
    }
  });

  it("na-adjectives are stored without a trailing な", () => {
    for (const v of allVocab) {
      if (v.pos === "na-adj") {
        expect(v.ja.endsWith("な"), `na-adj "${v.id}" ja="${v.ja}" should be the bare stem`).toBe(false);
      }
    }
  });

  function countByPos(pos: VocabEntry["pos"]): number {
    return allVocab.filter((v) => v.pos === pos).length;
  }

  it("has a reasonable spread of parts of speech", () => {
    expect(countByPos("verb")).toBeGreaterThanOrEqual(40);
    expect(countByPos("noun")).toBeGreaterThanOrEqual(40);
    expect(countByPos("i-adj")).toBeGreaterThanOrEqual(20);
    expect(countByPos("na-adj")).toBeGreaterThanOrEqual(20);
  });
});

// ---------------------------------------------------------------------------
// Templates (populated: 14 hand-authored templates)
// ---------------------------------------------------------------------------

describe("templates", () => {
  it("every slot referenced in patternJa exists in slots", () => {
    const slotRefPattern = /\{([a-zA-Z0-9_]+)(?:\.[a-zA-Z0-9_]+)?\}/g;
    for (const tpl of allTemplates) {
      const refs = new Set<string>();
      const re = new RegExp(slotRefPattern.source, "g");
      let m = re.exec(tpl.patternJa);
      while (m !== null) {
        refs.add(m[1]);
        m = re.exec(tpl.patternJa);
      }
      for (const ref of refs) {
        expect(tpl.slots[ref], `template "${tpl.id}" references undefined slot "${ref}"`).toBeDefined();
      }
    }
  });

  it("templates producing cloze declare a gapSlot that exists in slots", () => {
    for (const tpl of allTemplates) {
      if (tpl.produces === "cloze") {
        expect(tpl.gapSlot, `template "${tpl.id}" produces cloze but has no gapSlot`).toBeDefined();
        if (tpl.gapSlot) {
          expect(tpl.slots[tpl.gapSlot], `template "${tpl.id}" gapSlot "${tpl.gapSlot}" not in slots`).toBeDefined();
        }
      }
    }
  });

  it("grammarPointId resolves to a real grammar point", () => {
    for (const tpl of allTemplates) {
      expect(grammarPointById.has(tpl.grammarPointId), `template "${tpl.id}" -> "${tpl.grammarPointId}"`).toBe(
        true
      );
    }
  });

  it("is an array of ExerciseTemplate", () => {
    expect(Array.isArray(allTemplates)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Mock passages (populated: 10 hand-authored N4 passages — 4 in
// src/content/mock/passages.ts + 6 in src/content/mock/passages2.ts — 5 gaps
// each)
// ---------------------------------------------------------------------------

describe("mock passages", () => {
  it("is an array of MockPassage", () => {
    expect(Array.isArray(allPassages)).toBe(true);
  });

  it("have unique ids", () => {
    const ids = allPassages.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("have exactly 5 gaps each (the mock's 問題3 sizing depends on it)", () => {
    for (const p of allPassages) {
      expect(p.gaps.length, `gaps for "${p.id}"`).toBe(5);
    }
  });

  // Checks the numbers themselves, not just how many there are: a duplicated
  // ［2］ with no ［3］ has the right count but leaves one gap unreachable in
  // the rendered passage and renders the other twice.
  it("paragraphsJa mark ［1］…［N］ exactly once each, matching gaps.length", () => {
    for (const p of allPassages) {
      const markers = (p.paragraphsJa.join("").match(/［(\d+)］/g) ?? []).map(
        (m) => Number(m.slice(1, -1)),
      );
      const expected = p.gaps.map((_, i) => i + 1);
      expect([...markers].sort((a, b) => a - b), `［N］ markers for "${p.id}"`).toEqual(
        expected,
      );
    }
  });

  it("have well-formed furigana in paragraphsJa", () => {
    const issues: string[] = [];
    for (const p of allPassages) {
      p.paragraphsJa.forEach((para, i) => {
        issues.push(...furiganaIssues(para, `${p.id}.paragraphsJa[${i}]`));
      });
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });

  // Regression test for a fixed content defect: every one of the original 20
  // authored gaps hard-coded correctIndex: 0, so in 問題3 the correct choice
  // was always the FIRST button. The mock builder now shuffles choices at
  // runtime, but the authored content must vary too — otherwise any consumer
  // that doesn't shuffle inherits the tell. Keep this assertion so the
  // all-zero pattern can't creep back in with a future passage batch.
  it("passage gaps use at least 3 distinct correctIndex values", () => {
    const indices = new Set(allPassages.flatMap((p) => p.gaps.map((g) => g.correctIndex)));
    expect(indices.size, `distinct correctIndex values: ${[...indices].join(", ")}`).toBeGreaterThanOrEqual(3);
  });
});

// ---------------------------------------------------------------------------
// Reading comprehension (読解)
// ---------------------------------------------------------------------------

describe("reading passages", () => {
  it("is an array of ReadingPassage", () => {
    expect(Array.isArray(allReadingPassages)).toBe(true);
  });

  it("have unique ids", () => {
    const ids = allReadingPassages.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("have exactly 3 questions each (the mock's 読解 sizing depends on it)", () => {
    for (const p of allReadingPassages) {
      expect(p.questions.length, `questions for "${p.id}"`).toBe(3);
    }
  });

  it('question ids follow "<passageId>.q<N>"', () => {
    for (const p of allReadingPassages) {
      p.questions.forEach((q, i) => {
        expect(q.id, `question id at "${p.id}" index ${i}`).toBe(`${p.id}.q${i + 1}`);
      });
    }
  });

  it("focusPointIds (if present) resolve to real grammar points", () => {
    for (const p of allReadingPassages) {
      for (const pointId of p.focusPointIds ?? []) {
        expect(grammarPointById.has(pointId), `"${p.id}".focusPointIds -> "${pointId}"`).toBe(true);
      }
    }
  });

  it("have well-formed furigana in paragraphs and questions", () => {
    const issues: string[] = [];
    for (const p of allReadingPassages) {
      p.paragraphsJa.forEach((para, i) => {
        issues.push(...furiganaIssues(para, `${p.id}.paragraphsJa[${i}]`));
      });
      for (const q of p.questions) {
        issues.push(...furiganaIssues(q.question, `${q.id}.question`));
        q.choices.forEach((c, i) => {
          issues.push(...furiganaIssues(c, `${q.id}.choices[${i}]`));
        });
      }
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Vocabulary questions (文字・語彙)
// ---------------------------------------------------------------------------

describe("vocab questions", () => {
  const VALID_STYLES = new Set(["reading", "orthography", "context", "paraphrase"]);

  it("is an array of VocabQuestion", () => {
    expect(Array.isArray(allVocabQuestions)).toBe(true);
  });

  it("have unique ids", () => {
    const ids = allVocabQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("have a valid style", () => {
    for (const q of allVocabQuestions) {
      expect(VALID_STYLES.has(q.style), `style for "${q.id}"`).toBe(true);
    }
  });

  it("vocabIds (if present) resolve to real vocab entries", () => {
    const vocabIds = new Set(allVocab.map((v) => v.id));
    for (const q of allVocabQuestions) {
      for (const vocabId of q.vocabIds ?? []) {
        expect(vocabIds.has(vocabId), `"${q.id}".vocabIds -> "${vocabId}"`).toBe(true);
      }
    }
  });

  it('style === "context" questions have exactly one ＿＿ gap', () => {
    for (const q of allVocabQuestions) {
      if (q.style === "context") {
        const gapCount = (q.question.match(/＿＿/g) ?? []).length;
        expect(gapCount, `gap count for "${q.id}"`).toBe(1);
      }
    }
  });

  it("have well-formed furigana in question and choices", () => {
    const issues: string[] = [];
    for (const q of allVocabQuestions) {
      issues.push(...furiganaIssues(q.question, `${q.id}.question`));
      q.choices.forEach((c, i) => {
        issues.push(...furiganaIssues(c, `${q.id}.choices[${i}]`));
      });
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Particle drill items (助詞)
// ---------------------------------------------------------------------------

describe("particle drill items", () => {
  it("handles an empty particle item bank without error", () => {
    expect(Array.isArray(allParticleItems)).toBe(true);
  });

  it("have unique ids", () => {
    const ids = allParticleItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("have exactly one ＿＿ gap in sentence", () => {
    for (const item of allParticleItems) {
      const gapCount = (item.sentence.match(/＿＿/g) ?? []).length;
      expect(gapCount, `gap count for "${item.id}"`).toBe(1);
    }
  });

  it("answer is kana-only", () => {
    for (const item of allParticleItems) {
      expect(item.answer, `answer for "${item.id}" ("${item.answer}") must be kana-only`).toMatch(HIRAGANA_ONLY);
    }
  });

  it("distractors (if present) exclude the answer and are unique", () => {
    for (const item of allParticleItems) {
      if (item.distractors) {
        expect(item.distractors, `distractors for "${item.id}" must not include the answer`).not.toContain(
          item.answer
        );
        expect(new Set(item.distractors).size, `unique distractors for "${item.id}"`).toBe(item.distractors.length);
      }
    }
  });

  // Particle items are the one MCQ-shaped bank that bypasses the
  // allMcqShapedItems() union below (their choices are assembled at build
  // time, not authored), so this is the equivalent of that union's
  // "exactly 4 unique choices" guard. buildParticleQuestions tops up from
  // PARTICLE_SET so a short list can't render a 2-choice question, but the
  // fallback picks blind — an authored distractor is chosen to be wrong in
  // THAT sentence, so keep the bank self-sufficient.
  it("author at least 3 distractors, so the PARTICLE_SET top-up never has to fire", () => {
    for (const item of allParticleItems) {
      expect(
        item.distractors?.length ?? 0,
        `distractors for "${item.id}" ("${item.sentence}")`,
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it("have well-formed furigana in sentence", () => {
    const issues: string[] = [];
    for (const item of allParticleItems) {
      issues.push(...furiganaIssues(item.sentence, `${item.id}.sentence`));
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Transitivity pairs (自他動詞)
// ---------------------------------------------------------------------------

describe("transitivity pairs", () => {
  it("handles an empty transitivity pair bank without error", () => {
    expect(Array.isArray(allTransitivityPairs)).toBe(true);
  });

  it("have unique ids", () => {
    const ids = allTransitivityPairs.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("transitive and intransitive ja differ", () => {
    for (const p of allTransitivityPairs) {
      expect(p.transitive.ja, `"${p.id}" transitive/intransitive ja must differ`).not.toBe(p.intransitive.ja);
    }
  });

  it("have well-formed furigana in both members", () => {
    const issues: string[] = [];
    for (const p of allTransitivityPairs) {
      issues.push(...furiganaIssues(p.transitive.ja, `${p.id}.transitive.ja`));
      issues.push(...furiganaIssues(p.intransitive.ja, `${p.id}.intransitive.ja`));
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// MCQ-shaped items (cross-bank): mcq exercises, mock-passage gaps, vocab
// questions, and reading-passage questions all share the same shape
// (id/question/choices/correctIndex) but live in four different arrays.
// Mock-passage gaps in particular are NOT part of `allExercises` (see the
// `MockPassage` doc comment in content/types.ts), so without this union
// they escape every furigana / id-uniqueness / correctIndex-bounds check.
// Building the union from the live arrays (rather than snapshotting counts)
// keeps this correct as any of the four banks keeps growing.
// ---------------------------------------------------------------------------

interface McqShaped {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
}

function allMcqShapedItems(): McqShaped[] {
  return [
    ...allExercises.filter((ex): ex is McqExercise => ex.kind === "mcq"),
    ...allPassages.flatMap((p) => p.gaps),
    ...allVocabQuestions,
    ...allReadingPassages.flatMap((p) => p.questions),
  ];
}

describe("MCQ-shaped items (cross-bank: mcq exercises + passage gaps + vocab questions + reading questions)", () => {
  it("is an array of MCQ-shaped items across all four banks", () => {
    expect(Array.isArray(allMcqShapedItems())).toBe(true);
  });

  it("have unique ids across all four banks", () => {
    const ids = allMcqShapedItems().map((item) => item.id);
    const seen = new Map<string, number>();
    for (const id of ids) seen.set(id, (seen.get(id) ?? 0) + 1);
    const dupes = [...seen.entries()].filter(([, count]) => count > 1).map(([id]) => id);
    expect(dupes, `duplicate ids: ${dupes.join(", ")}`).toEqual([]);
  });

  it("have exactly 4 unique choices and a valid correctIndex", () => {
    for (const item of allMcqShapedItems()) {
      expect(item.choices.length, `choices for "${item.id}"`).toBe(4);
      expect(new Set(item.choices).size, `unique choices for "${item.id}"`).toBe(4);
      expect(item.correctIndex, `correctIndex for "${item.id}"`).toBeGreaterThanOrEqual(0);
      expect(item.correctIndex, `correctIndex for "${item.id}"`).toBeLessThan(item.choices.length);
    }
  });

  it("have well-formed furigana in question and choices", () => {
    const issues: string[] = [];
    for (const item of allMcqShapedItems()) {
      issues.push(...furiganaIssues(item.question, `${item.id}.question`));
      item.choices.forEach((c, i) => {
        issues.push(...furiganaIssues(c, `${item.id}.choices[${i}]`));
      });
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Cross-bank id uniqueness: nothing else checks that, say, a vocab question
// id doesn't collide with an exercise id or a grammar point id — every bank
// so far has only been checked for uniqueness WITHIN itself.
// ---------------------------------------------------------------------------

describe("cross-bank id uniqueness", () => {
  it("no id collides across any content bank", () => {
    const allIds: string[] = [
      ...allGrammarPoints.map((p) => p.id),
      ...allExercises.map((ex) => ex.id),
      ...allVocab.map((v) => v.id),
      ...allTemplates.map((tpl) => tpl.id),
      ...allPassages.map((p) => p.id),
      ...allPassages.flatMap((p) => p.gaps.map((g) => g.id)),
      ...allReadingPassages.map((p) => p.id),
      ...allReadingPassages.flatMap((p) => p.questions.map((q) => q.id)),
      ...allVocabQuestions.map((q) => q.id),
      ...allParticleItems.map((item) => item.id),
      ...allTransitivityPairs.map((p) => p.id),
    ];
    const seen = new Map<string, number>();
    for (const id of allIds) seen.set(id, (seen.get(id) ?? 0) + 1);
    const dupes = [...seen.entries()].filter(([, count]) => count > 1).map(([id]) => id);
    expect(dupes, `ids colliding across content banks: ${dupes.join(", ")}`).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Sanity: this file itself covers a non-trivial amount of content.
// ---------------------------------------------------------------------------

describe("content volume sanity check", () => {
  it("has at least 51 grammar points, with both N5 and N4 represented", () => {
    expect(allGrammarPoints.length).toBeGreaterThanOrEqual(51);
    expect(allGrammarPoints.some((p) => p.level === "N5"), "no N5 points found").toBe(true);
    expect(allGrammarPoints.some((p) => p.level === "N4"), "no N4 points found").toBe(true);
  });

  it("every grammar point has exactly 11 bank exercises", () => {
    for (const p of allGrammarPoints) {
      const bank = exercisesForPoint(p.id).filter((ex) => ex.source === "bank");
      expect(bank.length, `bank exercise count for "${p.id}"`).toBe(11);
    }
  });

  // Floors, not exact counts: the intended mix is 2 translation / 2 cloze /
  // 3 mcq / 2 ordering / 2 transformation, but CONTENT_GUIDE.md sanctions
  // swapping the 2nd transformation for a 3rd cloze on pure particle and
  // expression points, where "rewrite into form X" would be filler. Six
  // points currently take that substitution, so `transformation` floors at 1
  // and `cloze` can run to 3 while the total stays pinned at 11 above.
  it("every grammar point meets the per-kind exercise floor", () => {
    for (const p of allGrammarPoints) {
      const bank = exercisesForPoint(p.id).filter((ex) => ex.source === "bank");
      const countOf = (kind: Exercise["kind"]) => bank.filter((ex) => ex.kind === kind).length;
      expect(countOf("translation"), `translation count for "${p.id}"`).toBeGreaterThanOrEqual(2);
      expect(countOf("cloze"), `cloze count for "${p.id}"`).toBeGreaterThanOrEqual(2);
      expect(countOf("mcq"), `mcq count for "${p.id}"`).toBeGreaterThanOrEqual(3);
      expect(countOf("ordering"), `ordering count for "${p.id}"`).toBeGreaterThanOrEqual(2);
      expect(countOf("transformation"), `transformation count for "${p.id}"`).toBeGreaterThanOrEqual(1);
    }
  });

  // Derived canary (not a hardcoded multiplier): the grand total of bank
  // exercises must equal the sum of each point's own bank count. This is
  // exactly the check that catches "author added a grammar point but forgot
  // its exercises" (or an exercise whose grammarPointId silently doesn't
  // match any point it's supposed to be grouped under) without needing a
  // hand-edited constant that has to be bumped on every content batch.
  it("total bank exercises equals the sum of every point's own bank count", () => {
    const totalBank = allExercises.filter((ex) => ex.source === "bank").length;
    const perPointTotal = allGrammarPoints.reduce(
      (sum, p) => sum + exercisesForPoint(p.id).filter((ex) => ex.source === "bank").length,
      0
    );
    expect(totalBank, "total bank exercises vs. sum of per-point bank counts").toBe(perPointTotal);
  });
});

import { describe, expect, it } from "vitest";
import { allExercises, allPassages, allReadingPassages, allVocabQuestions } from "../../content";
import {
  isFormatAvailable,
  MOCK_DURATION_SEC,
  MOCK_FORMATS,
  type MockFormatId,
  MOCK_LEVELS,
  type MockLevel,
  type MockPlanSection,
  type MockTestPlan,
  pickOnePerPoint,
  shuffleChoices,
  buildMockTest,
} from "../mockBuilder";
import { buildMockPaper, MOCK_PAPERS } from "../mockPapers";
import { mulberry32 } from "../rng";

function totalQuestions(plan: MockTestPlan): number {
  return plan.sections.reduce((sum, s) => {
    switch (s.kind) {
      case "vocab":
      case "completion":
      case "ordering":
        return sum + s.questions.length;
      case "passage":
        return sum + s.passage.gaps.length;
      case "reading":
        return sum + s.passage.questions.length;
      default:
        return sum;
    }
  }, 0);
}

function allQuestionIds(plan: MockTestPlan): string[] {
  const ids: string[] = [];
  for (const s of plan.sections) {
    switch (s.kind) {
      case "vocab":
      case "completion":
      case "ordering":
        ids.push(...s.questions.map((q) => q.id));
        break;
      case "passage":
        ids.push(...s.passage.gaps.map((g) => g.id));
        break;
      case "reading":
        ids.push(...s.passage.questions.map((q) => q.id));
        break;
    }
  }
  return ids;
}

function findSection<K extends MockPlanSection["kind"]>(
  plan: MockTestPlan,
  kind: K
): Extract<MockPlanSection, { kind: K }> | undefined {
  return plan.sections.find((s): s is Extract<MockPlanSection, { kind: K }> => s.kind === kind);
}

const availableFormats = (Object.keys(MOCK_FORMATS) as MockFormatId[]).filter((id) => isFormatAvailable(id));
// Spread of seeds, not just 0..19, so the sweep isn't accidentally tied to
// small-integer artifacts of mulberry32.
const seeds = Array.from({ length: 20 }, (_, i) => i * 7 + 1);

describe("buildMockTest", () => {
  it("returns the expected section counts for the default (standard) format", () => {
    const plan = buildMockTest(1);
    expect(plan.formatId).toBe("standard");
    expect(findSection(plan, "completion")?.questions.length).toBe(15);
    expect(findSection(plan, "ordering")?.questions.length).toBe(5);
    expect(findSection(plan, "passage")).toBeDefined();
    expect(plan.seed).toBe(1);
    expect(totalQuestions(plan)).toBe(MOCK_FORMATS.standard.questionCount);
  });

  it("is deterministic for a given seed and format", () => {
    for (const formatId of availableFormats) {
      const a = buildMockTest(42, formatId);
      const b = buildMockTest(42, formatId);
      expect(a, formatId).toEqual(b);
    }
  });

  it("can produce different plans for different seeds", () => {
    for (const formatId of availableFormats) {
      const a = buildMockTest(1, formatId);
      const b = buildMockTest(2, formatId);
      expect(a, formatId).not.toEqual(b);
    }
  });

  it("has no overlap between completion exercise ids and passage gap ids", () => {
    const gapIds = new Set(allPassages.flatMap((p) => p.gaps.map((g) => g.id)));
    for (const seed of seeds) {
      const plan = buildMockTest(seed, "standard");
      const completion = findSection(plan, "completion");
      for (const ex of completion?.questions ?? []) {
        expect(gapIds.has(ex.id), `seed ${seed}: "${ex.id}"`).toBe(false);
      }
    }
  });

  it("can reach at least 6 distinct passages across seeds", () => {
    expect(allPassages.length).toBeGreaterThanOrEqual(10);
    const seen = new Set<string>();
    for (let seed = 0; seed < 300; seed++) {
      const plan = buildMockTest(seed, "standard");
      const passage = findSection(plan, "passage");
      if (passage) seen.add(passage.passage.id);
      if (seen.size >= 6) break;
    }
    expect(seen.size).toBeGreaterThanOrEqual(6);
  });

  it("MOCK_DURATION_SEC aliases the standard format's duration", () => {
    expect(MOCK_DURATION_SEC).toBe(MOCK_FORMATS.standard.durationSec);
    expect(MOCK_DURATION_SEC).toBe(25 * 60);
  });

  it("never lets a transformation exercise leak into any mock pool", () => {
    const transformationIds = new Set(
      allExercises.filter((ex) => ex.kind === "transformation").map((ex) => ex.id)
    );
    for (const formatId of availableFormats) {
      for (const seed of seeds) {
        const plan = buildMockTest(seed, formatId);
        for (const id of allQuestionIds(plan)) {
          expect(transformationIds.has(id), `seed ${seed} format ${formatId}: "${id}"`).toBe(false);
        }
      }
    }
  });

  it("does not always put the correct passage-gap answer in the same slot (regression: was always index 0)", () => {
    const seen = new Set<number>();
    for (let seed = 0; seed < 50; seed++) {
      const plan = buildMockTest(seed, "standard");
      const passage = findSection(plan, "passage");
      for (const g of passage?.passage.gaps ?? []) seen.add(g.correctIndex);
    }
    expect(seen.size).toBeGreaterThan(1);
  });

  describe.each(availableFormats)("format: %s", (formatId) => {
    const format = MOCK_FORMATS[formatId];

    it(`matches the declared question count (${format.questionCount}) across seeds`, () => {
      for (const seed of seeds) {
        const plan = buildMockTest(seed, formatId);
        expect(totalQuestions(plan), `seed ${seed}`).toBe(format.questionCount);
      }
    });

    it("has no duplicate question ids within a plan", () => {
      for (const seed of seeds) {
        const plan = buildMockTest(seed, formatId);
        const ids = allQuestionIds(plan);
        expect(new Set(ids).size, `seed ${seed}`).toBe(ids.length);
      }
    });

    it("has no duplicate grammarPointId within completion, and none within ordering", () => {
      for (const seed of seeds) {
        const plan = buildMockTest(seed, formatId);
        const completion = findSection(plan, "completion");
        if (completion) {
          const ids = completion.questions.map((q) => q.grammarPointId);
          expect(new Set(ids).size, `seed ${seed} completion`).toBe(ids.length);
        }
        const ordering = findSection(plan, "ordering");
        if (ordering) {
          const ids = ordering.questions.map((q) => q.grammarPointId);
          expect(new Set(ids).size, `seed ${seed} ordering`).toBe(ids.length);
        }
      }
    });

    it("gives every ordering question a displayOrders permutation of its segment indices", () => {
      for (const seed of [seeds[0], seeds[1]]) {
        const plan = buildMockTest(seed, formatId);
        const ordering = findSection(plan, "ordering");
        if (!ordering) continue;
        expect(ordering.displayOrders.length).toBe(ordering.questions.length);
        ordering.displayOrders.forEach((order, i) => {
          const expected = ordering.questions[i].segments.map((_, idx) => idx);
          expect([...order].sort((a, b) => a - b)).toEqual(expected);
        });
      }
    });
  });
});

describe("isFormatAvailable / graceful degradation", () => {
  it("short and standard are available from the existing bank content", () => {
    expect(isFormatAvailable("short")).toBe(true);
    expect(isFormatAvailable("standard")).toBe(true);
  });

  // `full` needs the vocab and reading banks, which were empty when this
  // format was introduced. Now that they're populated it must report
  // available — assert that directly so deleting content can't silently
  // switch the 40-question paper back off.
  it("full is available now that the vocab and reading banks are populated", () => {
    expect(allVocabQuestions.length).toBeGreaterThan(0);
    expect(allReadingPassages.length).toBeGreaterThan(0);
    expect(isFormatAvailable("full")).toBe(true);
  });

  // NOTE: the shortfall-throw path inside the section selectors is no longer
  // reachable from here, because every format is satisfiable by the current
  // banks. Covering it would mean injecting the pools rather than reading the
  // module-level content arrays; leaving it uncovered rather than keeping a
  // test whose assertions are skipped by a guard and silently pass.
  it("every declared format is satisfiable by the current content banks", () => {
    for (const formatId of Object.keys(MOCK_FORMATS) as MockFormatId[]) {
      expect(isFormatAvailable(formatId), `format "${formatId}"`).toBe(true);
      expect(() => buildMockTest(1, formatId), `format "${formatId}"`).not.toThrow();
    }
  });
});

// Gated so the suite stays green now (banks empty) AND after phase-8 content
// lands (banks populated) — these tests activate automatically either way.
describe.skipIf(!isFormatAvailable("full"))(
  "full format (vocab + reading sections — phase-8 content)",
  () => {
    it("includes a 9-question vocab section and two 3-question reading passages", () => {
      const plan = buildMockTest(7, "full");
      const vocab = findSection(plan, "vocab");
      expect(vocab?.questions.length).toBe(9);

      const readingSections = plan.sections.filter((s) => s.kind === "reading");
      expect(readingSections.length).toBe(2);
      const totalReadingQuestions = readingSections.reduce(
        (sum, s) => sum + (s.kind === "reading" ? s.passage.questions.length : 0),
        0
      );
      expect(totalReadingQuestions).toBe(6);
    });

    it("totals exactly 40 questions", () => {
      const plan = buildMockTest(7, "full");
      expect(totalQuestions(plan)).toBe(40);
    });
  }
);

describe("shuffleChoices", () => {
  it("preserves id, the choice multiset, and which choice is correct — across many seeds", () => {
    const original = { id: "q.test", choices: ["A", "B", "C", "D"], correctIndex: 2 };
    for (let seed = 0; seed < 100; seed++) {
      const shuffled = shuffleChoices(original, mulberry32(seed));
      expect(shuffled.id, `seed ${seed}`).toBe(original.id);
      expect([...shuffled.choices].sort(), `seed ${seed}`).toEqual([...original.choices].sort());
      expect(shuffled.choices[shuffled.correctIndex], `seed ${seed}`).toBe(
        original.choices[original.correctIndex]
      );
    }
  });

  it("does not mutate the input object", () => {
    const original = { id: "q.test", choices: ["A", "B", "C", "D"], correctIndex: 0 };
    const originalChoicesCopy = [...original.choices];
    shuffleChoices(original, mulberry32(1));
    expect(original.choices).toEqual(originalChoicesCopy);
    expect(original.correctIndex).toBe(0);
  });
});

describe("pickOnePerPoint", () => {
  interface Fake {
    id: string;
    grammarPointId: string;
  }

  const basePool: Fake[] = [
    { id: "n4.a.ex1", grammarPointId: "n4.a" },
    { id: "n4.a.ex2", grammarPointId: "n4.a" },
    { id: "n4.b.ex1", grammarPointId: "n4.b" },
    { id: "n4.c.ex1", grammarPointId: "n4.c" },
    { id: "n4.c.ex2", grammarPointId: "n4.c" },
    { id: "n4.c.ex3", grammarPointId: "n4.c" },
  ];

  it("is independent of the pool's array order (fixes the import-order determinism bug)", () => {
    const reversed = [...basePool].reverse();
    const shuffledOrder = [basePool[3], basePool[0], basePool[5], basePool[1], basePool[2], basePool[4]];

    const repsA = pickOnePerPoint(basePool, 42, "test");
    const repsB = pickOnePerPoint(reversed, 42, "test");
    const repsC = pickOnePerPoint(shuffledOrder, 42, "test");

    expect(repsB).toEqual(repsA);
    expect(repsC).toEqual(repsA);
  });

  it("changing one grammar point's pool only changes that point's representative (fixes the shared-rng-stream bug)", () => {
    const reps1 = pickOnePerPoint(basePool, 42, "test");
    const byPoint1 = new Map(reps1.map((r) => [r.grammarPointId, r.id]));

    // Deepen an UNRELATED point's exercise pool (n4.b, not n4.a or n4.c).
    const perturbedPool: Fake[] = [...basePool, { id: "n4.b.ex2", grammarPointId: "n4.b" }];
    const reps2 = pickOnePerPoint(perturbedPool, 42, "test");
    const byPoint2 = new Map(reps2.map((r) => [r.grammarPointId, r.id]));

    expect(byPoint2.get("n4.a")).toBe(byPoint1.get("n4.a"));
    expect(byPoint2.get("n4.c")).toBe(byPoint1.get("n4.c"));
    // n4.b itself is deliberately not asserted — its own pool changed, so its
    // representative is allowed (not guaranteed) to change.
  });

  it("is deterministic for a given seed and salt", () => {
    const a = pickOnePerPoint(basePool, 7, "salt-a");
    const b = pickOnePerPoint(basePool, 7, "salt-a");
    expect(b).toEqual(a);
  });

  it("a different salt can select different representatives for the same seed", () => {
    // Not guaranteed for every pool, but true for this one — guards against a
    // no-op salt that never namespaces the derived rng.
    const a = pickOnePerPoint(basePool, 7, "salt-a").map((r) => r.id);
    const b = pickOnePerPoint(basePool, 7, "salt-b").map((r) => r.id);
    expect(a).not.toEqual(b);
  });
});

describe("MOCK_PAPERS / buildMockPaper", () => {
  it("declares six papers per level with the expected ids and labels", () => {
    const n4 = MOCK_PAPERS.filter((p) => p.level === "N4");
    const n5 = MOCK_PAPERS.filter((p) => p.level === "N5");
    expect(n4.length).toBe(6);
    expect(n5.length).toBe(6);
    expect(n5.map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6].map((n) => `paper.n5.${n}`));
    expect(n5.map((p) => p.label)).toEqual([1, 2, 3, 4, 5, 6].map((n) => `N5 模試${n}`));
    expect(new Set(MOCK_PAPERS.map((p) => p.id)).size).toBe(MOCK_PAPERS.length);
    expect(n4.map((p) => p.id)).toEqual([
      "paper.1",
      "paper.2",
      "paper.3",
      "paper.4",
      "paper.5",
      "paper.6",
    ]);
    expect(n4.map((p) => p.label)).toEqual([
      "N4 模試1",
      "N4 模試2",
      "N4 模試3",
      "N4 模試4",
      "N4 模試5",
      "N4 模試6",
    ]);
  });

  it("builds every available paper deterministically and stamps its paperId", () => {
    for (const paper of MOCK_PAPERS) {
      if (!isFormatAvailable(paper.formatId, paper.level)) continue; // activates once phase-8 content lands
      const a = buildMockPaper(paper);
      const b = buildMockPaper(paper);
      expect(a, paper.id).toEqual(b);
      expect(a.paperId).toBe(paper.id);
      expect(a.seed).toBe(paper.seed);
      expect(a.formatId).toBe(paper.formatId);
      expect(a.level).toBe(paper.level);
    }
  });
});

function allPlanSections(plan: MockTestPlan) {
  return {
    completion: plan.sections.flatMap((s) => (s.kind === "completion" ? s.questions : [])),
    ordering: plan.sections.flatMap((s) => (s.kind === "ordering" ? s.questions : [])),
    gaps: plan.sections.flatMap((s) => (s.kind === "passage" ? s.passage.gaps : [])),
    passages: plan.sections.flatMap((s) => (s.kind === "passage" ? [s.passage] : [])),
    vocab: plan.sections.flatMap((s) => (s.kind === "vocab" ? s.questions : [])),
    readings: plan.sections.flatMap((s) => (s.kind === "reading" ? [s.passage] : [])),
  };
}

describe.each(MOCK_LEVELS)("level: %s", (level: MockLevel) => {
  describe.each(Object.keys(MOCK_FORMATS) as MockFormatId[])("format: %s", (formatId) => {
    it("is available and builds a plan with the declared question count", () => {
      expect(isFormatAvailable(formatId, level)).toBe(true);
      for (const seed of seeds) {
        const plan = buildMockTest(seed, formatId, level);
        expect(plan.level).toBe(level);
        expect(totalQuestions(plan), `seed ${seed}`).toBe(MOCK_FORMATS[formatId].questionCount);
      }
    });

    it("is deterministic per (seed, format, level)", () => {
      expect(buildMockTest(42, formatId, level)).toEqual(buildMockTest(42, formatId, level));
    });

    it("uses only items of its own level where items carry a level", () => {
      for (const seed of seeds) {
        const p = allPlanSections(buildMockTest(seed, formatId, level));
        for (const v of p.vocab) expect(v.level, v.id).toBe(level);
        for (const r of p.readings) expect(r.level, r.id).toBe(level);
        for (const m of p.passages) expect(m.level, m.id).toBe(level);
        if (level === "N5") {
          for (const q of [...p.completion, ...p.ordering, ...p.gaps]) {
            expect(q.grammarPointId.startsWith("n4."), q.id).toBe(false);
          }
        }
      }
    });
  });
});

describe("N5 vs N4 papers", () => {
  it("differ for the same seed and format", () => {
    for (const formatId of Object.keys(MOCK_FORMATS) as MockFormatId[]) {
      const n5 = buildMockTest(1, formatId, "N5");
      const n4 = buildMockTest(1, formatId, "N4");
      expect(allQuestionIds(n5), formatId).not.toEqual(allQuestionIds(n4));
    }
  });

  it("defaults to N4", () => {
    expect(buildMockTest(5).level).toBe("N4");
    expect(buildMockTest(5)).toEqual(buildMockTest(5, "standard", "N4"));
  });
});

import { describe, expect, it } from "vitest";
import { allPassages } from "../../content";
import { buildMockTest, MOCK_DURATION_SEC } from "../mockBuilder";

describe("buildMockTest", () => {
  it("returns the expected section counts", () => {
    const plan = buildMockTest(1);
    expect(plan.completion.length).toBe(15);
    expect(plan.ordering.length).toBe(5);
    expect(plan.passage).toBeDefined();
    expect(plan.seed).toBe(1);
  });

  it("is deterministic for a given seed", () => {
    const a = buildMockTest(42);
    const b = buildMockTest(42);
    expect(a.completion.map((ex) => ex.id)).toEqual(b.completion.map((ex) => ex.id));
    expect(a.ordering.map((ex) => ex.id)).toEqual(b.ordering.map((ex) => ex.id));
    expect(a.passage.id).toBe(b.passage.id);
  });

  it("can produce different plans for different seeds", () => {
    const a = buildMockTest(1);
    const b = buildMockTest(2);
    const same =
      a.completion.map((ex) => ex.id).join(",") === b.completion.map((ex) => ex.id).join(",");
    expect(same).toBe(false);
  });

  it("has at most one completion question per grammar point", () => {
    for (const seed of [1, 2, 3, 99, 12345]) {
      const plan = buildMockTest(seed);
      const ids = plan.completion.map((ex) => ex.grammarPointId);
      expect(new Set(ids).size, `seed ${seed}`).toBe(ids.length);
    }
  });

  it("has at most one ordering question per grammar point", () => {
    for (const seed of [1, 2, 3, 99, 12345]) {
      const plan = buildMockTest(seed);
      const ids = plan.ordering.map((ex) => ex.grammarPointId);
      expect(new Set(ids).size, `seed ${seed}`).toBe(ids.length);
    }
  });

  it("has no overlap between completion exercise ids and passage gap ids", () => {
    const gapIds = new Set(allPassages.flatMap((p) => p.gaps.map((g) => g.id)));
    for (const seed of [1, 2, 3, 99, 12345]) {
      const plan = buildMockTest(seed);
      for (const ex of plan.completion) {
        expect(gapIds.has(ex.id), `seed ${seed}: "${ex.id}"`).toBe(false);
      }
    }
  });

  it("can reach all 4 passages across seeds", () => {
    expect(allPassages.length).toBe(4);
    const seen = new Set<string>();
    for (let seed = 0; seed < 300; seed++) {
      seen.add(buildMockTest(seed).passage.id);
      if (seen.size === allPassages.length) break;
    }
    expect(seen.size).toBe(allPassages.length);
  });

  it("MOCK_DURATION_SEC is 25 minutes", () => {
    expect(MOCK_DURATION_SEC).toBe(25 * 60);
  });
});

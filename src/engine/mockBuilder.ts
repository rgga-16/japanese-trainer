// Mock test assembly: picks a deterministic (per-seed) set of bank exercises
// plus one passage to build a full JLPT-style mock test (問題1/2/3).

import { allExercises, allPassages } from "../content";
import type { McqExercise, MockPassage, OrderingExercise } from "../content/types";
import { mulberry32, type Rng, shuffle } from "./rng";

export interface MockTestPlan {
  seed: number;
  completion: McqExercise[]; // 15
  ordering: OrderingExercise[]; // 5
  passage: MockPassage;
}

export const MOCK_DURATION_SEC = 25 * 60;

const COMPLETION_COUNT = 15;
const ORDERING_COUNT = 5;
/** Target share of the completion section drawn from N4 (vs. N5) points. */
const N4_SHARE = 0.7;

function levelOfPointId(pointId: string): "N4" | "N5" {
  return pointId.startsWith("n4.") ? "N4" : "N5";
}

/** One representative exercise per grammarPointId, chosen with `rng`. */
function pickOnePerPoint<T extends { grammarPointId: string }>(pool: T[], rng: Rng): T[] {
  const groups = new Map<string, T[]>();
  for (const ex of pool) {
    const list = groups.get(ex.grammarPointId);
    if (list) {
      list.push(ex);
    } else {
      groups.set(ex.grammarPointId, [ex]);
    }
  }
  const reps: T[] = [];
  for (const list of groups.values()) {
    reps.push(shuffle(list, rng)[0]);
  }
  return reps;
}

function selectCompletion(pool: McqExercise[], rng: Rng): McqExercise[] {
  const reps = pickOnePerPoint(pool, rng);
  const n4Reps = shuffle(
    reps.filter((ex) => levelOfPointId(ex.grammarPointId) === "N4"),
    rng
  );
  const n5Reps = shuffle(
    reps.filter((ex) => levelOfPointId(ex.grammarPointId) === "N5"),
    rng
  );

  const targetN4 = Math.round(COMPLETION_COUNT * N4_SHARE);
  const targetN5 = COMPLETION_COUNT - targetN4;

  const takeN4 = Math.min(targetN4, n4Reps.length);
  const takeN5 = Math.min(targetN5, n5Reps.length);

  const selected = [...n4Reps.slice(0, takeN4), ...n5Reps.slice(0, takeN5)];

  let shortfall = COMPLETION_COUNT - selected.length;
  if (shortfall > 0) {
    const usedIds = new Set(selected.map((ex) => ex.id));
    const remaining = shuffle(
      reps.filter((ex) => !usedIds.has(ex.id)),
      rng
    );
    selected.push(...remaining.slice(0, shortfall));
    shortfall = COMPLETION_COUNT - selected.length;
  }

  if (shortfall > 0) {
    throw new Error(
      `buildMockTest: not enough bank MCQ exercises (one per grammar point) to fill the ` +
        `completion section — need ${COMPLETION_COUNT}, found ${selected.length}.`
    );
  }

  return selected;
}

function selectOrdering(pool: OrderingExercise[], rng: Rng): OrderingExercise[] {
  const reps = shuffle(pickOnePerPoint(pool, rng), rng);
  if (reps.length < ORDERING_COUNT) {
    throw new Error(
      `buildMockTest: not enough bank ordering exercises (one per grammar point) to fill the ` +
        `ordering section — need ${ORDERING_COUNT}, found ${reps.length}.`
    );
  }
  return reps.slice(0, ORDERING_COUNT);
}

/** Build a deterministic mock test plan for a given numeric seed. */
export function buildMockTest(seed: number): MockTestPlan {
  const rng = mulberry32(seed);

  const passageGapIds = new Set(allPassages.flatMap((p) => p.gaps.map((g) => g.id)));

  const mcqPool = allExercises.filter(
    (ex): ex is McqExercise =>
      ex.kind === "mcq" && ex.source === "bank" && !passageGapIds.has(ex.id)
  );
  const orderingPool = allExercises.filter(
    (ex): ex is OrderingExercise => ex.kind === "ordering" && ex.source === "bank"
  );

  const completion = shuffle(selectCompletion(mcqPool, rng), rng);
  const ordering = shuffle(selectOrdering(orderingPool, rng), rng);

  if (allPassages.length === 0) {
    throw new Error("buildMockTest: no mock passages are available in the content bank.");
  }
  const passage = allPassages[Math.floor(rng() * allPassages.length)];

  return { seed, completion, ordering, passage };
}

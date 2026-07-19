// Session queue building: which exercises a practice/review session shows.

import { exercisesByPointId } from "../content";
import type { Exercise } from "../content/types";
import { type Rng, shuffle } from "./rng";

export const PRACTICE_SESSION_SIZE = 10;
export const REVIEW_EXERCISES_PER_POINT = 3;

/** Shuffled bank exercises for one grammar point, capped at `count`. */
export function buildPracticeQueue(
  pointId: string,
  count: number,
  rng: Rng,
): Exercise[] {
  const bank = exercisesByPointId.get(pointId) ?? [];
  return shuffle(bank, rng).slice(0, count);
}

/**
 * Review session: REVIEW_EXERCISES_PER_POINT exercises per due point,
 * interleaved round-robin across points so one point isn't drilled back-to-back.
 */
export function buildReviewExercises(pointIds: string[], rng: Rng): Exercise[] {
  const perPoint = pointIds.map((id) =>
    buildPracticeQueue(id, REVIEW_EXERCISES_PER_POINT, rng),
  );
  const out: Exercise[] = [];
  for (let round = 0; round < REVIEW_EXERCISES_PER_POINT; round++) {
    for (const list of perPoint) {
      const ex = list[round];
      if (ex) out.push(ex);
    }
  }
  return out;
}

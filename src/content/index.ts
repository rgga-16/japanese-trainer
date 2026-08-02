// Content barrel — the single import point the app/engine use to reach all
// authored content. See CONTENT_GUIDE.md for authoring conventions.

import type { Exercise, GrammarPoint, MockPassage } from "./types";
import { allPassages as basePassages } from "./mock/passages";
import { passages2 } from "./mock/passages2";
import { points as n5Points, exercises as n5Exercises } from "./grammar/n5/seed";
import { points as n4Points, exercises as n4Exercises } from "./grammar/n4/seed";
import {
  points as n5ParticlesPoints,
  exercises as n5ParticlesExercises,
} from "./grammar/n5/batch1-particles";
import {
  points as n5VerbsPoints,
  exercises as n5VerbsExercises,
} from "./grammar/n5/batch1-verbs";
import {
  points as n5PatternsPoints,
  exercises as n5PatternsExercises,
} from "./grammar/n5/batch1-patterns";
import {
  points as n4TeTaPoints,
  exercises as n4TeTaExercises,
} from "./grammar/n4/batch1-te-ta";
import {
  points as n4PatternsPoints,
  exercises as n4PatternsExercises,
} from "./grammar/n4/batch1-patterns";
// Batch 2 sidecars: ex8–ex11 for points already defined above. Kept in separate
// files so parallel authoring doesn't collide in one array literal.
import { exercises as n5Exercises2 } from "./grammar/n5/seed.batch2";
import { exercises as n5ParticlesExercises2 } from "./grammar/n5/batch1-particles.batch2";
import { exercises as n5VerbsExercises2 } from "./grammar/n5/batch1-verbs.batch2";
import { exercises as n5PatternsExercises2 } from "./grammar/n5/batch1-patterns.batch2";
import { exercises as n4Exercises2 } from "./grammar/n4/seed.batch2";
import { exercises as n4TeTaExercises2 } from "./grammar/n4/batch1-te-ta.batch2";
import { exercises as n4PatternsExercises2 } from "./grammar/n4/batch1-patterns.batch2";

export const allGrammarPoints: GrammarPoint[] = [
  ...n5Points,
  ...n5ParticlesPoints,
  ...n5VerbsPoints,
  ...n5PatternsPoints,
  ...n4Points,
  ...n4TeTaPoints,
  ...n4PatternsPoints,
];
export const allExercises: Exercise[] = [
  ...n5Exercises,
  ...n5Exercises2,
  ...n5ParticlesExercises,
  ...n5ParticlesExercises2,
  ...n5VerbsExercises,
  ...n5VerbsExercises2,
  ...n5PatternsExercises,
  ...n5PatternsExercises2,
  ...n4Exercises,
  ...n4Exercises2,
  ...n4TeTaExercises,
  ...n4TeTaExercises2,
  ...n4PatternsExercises,
  ...n4PatternsExercises2,
];

export { allVocab } from "./vocab";
export { allTemplates } from "./templates";
export const allPassages: MockPassage[] = [...basePassages, ...passages2];
export { allReadingPassages } from "./reading";
export { allVocabQuestions } from "./vocabq";
export { allParticleItems, PARTICLE_SET } from "./drills/particles";
export { allTransitivityPairs } from "./drills/transitivity";

/**
 * Hand-bumped whenever a content batch lands. Stamped onto MockResult so a
 * named preset paper whose questions have since shifted can be flagged in the
 * history table rather than silently compared against a different paper.
 */
export const CONTENT_REVISION = 2;

export const grammarPointById: ReadonlyMap<string, GrammarPoint> = new Map(
  allGrammarPoints.map((p) => [p.id, p])
);

export const exercisesByPointId: ReadonlyMap<string, Exercise[]> = (() => {
  const map = new Map<string, Exercise[]>();
  for (const ex of allExercises) {
    const list = map.get(ex.grammarPointId);
    if (list) {
      list.push(ex);
    } else {
      map.set(ex.grammarPointId, [ex]);
    }
  }
  return map;
})();

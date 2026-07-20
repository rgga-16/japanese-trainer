// Content barrel — the single import point the app/engine use to reach all
// authored content. See CONTENT_GUIDE.md for authoring conventions.

import type { Exercise, GrammarPoint } from "./types";
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
  ...n5ParticlesExercises,
  ...n5VerbsExercises,
  ...n5PatternsExercises,
  ...n4Exercises,
  ...n4TeTaExercises,
  ...n4PatternsExercises,
];

export { allVocab } from "./vocab";
export { allTemplates } from "./templates";
export { allPassages } from "./mock/passages";

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

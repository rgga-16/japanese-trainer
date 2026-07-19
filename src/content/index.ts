// Content barrel — the single import point the app/engine use to reach all
// authored content. See CONTENT_GUIDE.md for authoring conventions.

import type { Exercise, GrammarPoint } from "./types";
import { points as n5Points, exercises as n5Exercises } from "./grammar/n5/seed";
import { points as n4Points, exercises as n4Exercises } from "./grammar/n4/seed";

export const allGrammarPoints: GrammarPoint[] = [...n5Points, ...n4Points];
export const allExercises: Exercise[] = [...n5Exercises, ...n4Exercises];

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

// Transitivity drill (自他動詞) — built from allTransitivityPairs
// (src/content/drills/transitivity.ts), which ships 25 pairs. Tests also
// exercise this builder against synthetic TransitivityPair fixtures via the
// injectable `pairs` parameter.
//
// Each pair produces typed questions in both directions: given the
// intransitive member, produce the transitive partner (and vice versa). The
// instruction spells out which direction is wanted (自動詞/他動詞) plus the
// English gloss of the GIVEN word, so the question is answerable without
// already knowing the pair.
//
// statKey namespace: "transitivity:to-transitive" and
// "transitivity:to-intransitive" — exactly 2 buckets, not per-pair.

import { allTransitivityPairs } from "../../content";
import type { TransitivityPair } from "../../content/types";
import type { Rng } from "../rng";
import { shuffle } from "../rng";
import type { DrillQuestion } from "./types";

type TransitivityDirection = "to-transitive" | "to-intransitive";

/**
 * Builds a transitivity drill session. Returns `[]` when `pairs` is empty;
 * otherwise always returns exactly `count` questions (pairs repeat via
 * shuffle-refill when the bank is smaller than `count`), matching
 * buildConjugationQuestions's degrade behavior. Each question independently
 * draws a direction.
 *
 * `pairs` is injectable (defaults to the real bank) so tests can exercise
 * this builder independent of content changes.
 */
export function buildTransitivityQuestions(
  rng: Rng,
  count: number,
  pairs: TransitivityPair[] = allTransitivityPairs,
): DrillQuestion[] {
  if (pairs.length === 0) return [];

  const drawn: TransitivityPair[] = [];
  while (drawn.length < count) {
    drawn.push(...shuffle(pairs, rng));
  }

  return drawn.slice(0, count).map((pair, i) => {
    const direction: TransitivityDirection = rng() < 0.5 ? "to-transitive" : "to-intransitive";
    // "to-transitive" means the learner is GIVEN the intransitive member and
    // must PRODUCE the transitive one; "to-intransitive" is the reverse.
    const given = direction === "to-transitive" ? pair.intransitive : pair.transitive;
    const target = direction === "to-transitive" ? pair.transitive : pair.intransitive;
    const instruction =
      direction === "to-transitive"
        ? "→ 他動詞（transitive）form"
        : "→ 自動詞（intransitive）form";

    return {
      id: `transitivity.${direction}.${i}.${pair.id}`,
      mode: "typed",
      statKey: `transitivity:${direction}`,
      promptJa: given.ja,
      promptEn: given.en,
      instruction,
      accepted: [target.ja],
      explanation: pair.note,
    };
  });
}

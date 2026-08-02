// Particle drill — pick the correct particle for a ＿＿ gap in a sentence.
// allParticleItems (src/content/drills/particles.ts) ships 73 particle items.
// Tests also exercise this builder against synthetic ParticleDrillItem
// fixtures via the injectable `items` parameter.
//
// statKey namespace: `particle:${particle}`, e.g. "particle:に".

import { allParticleItems, PARTICLE_SET } from "../../content";
import type { ParticleDrillItem } from "../../content/types";
import type { Rng } from "../rng";
import { shuffle } from "../rng";
import type { DrillQuestion } from "./types";

const DEFAULT_CHOICE_COUNT = 4;

/**
 * Builds a particle drill session: each question is `mode: "choice"` with
 * the item's `sentence` (containing the ＿＿ gap) as the Japanese prompt.
 * Choices are the correct `answer` plus distractors — hand-authored
 * `distractors` are preferred (falling back to the shared `PARTICLE_SET`
 * minus the answer when none are authored) and topped up from
 * `PARTICLE_SET` whenever the authored list is short, so a question always
 * has `choiceCount` choices — deduped and capped at `choiceCount` total,
 * shuffled so the correct answer isn't always first. `translationEn` and
 * `note` are folded into `explanation`.
 *
 * Returns `[]` when `items` is empty; otherwise always returns exactly
 * `count` questions (entries repeat via shuffle-refill when the bank is
 * smaller than `count`), matching buildConjugationQuestions's degrade
 * behavior.
 *
 * `items` is injectable (defaults to the real bank) so tests can exercise
 * this builder independent of content changes.
 */
export function buildParticleQuestions(
  rng: Rng,
  count: number,
  items: ParticleDrillItem[] = allParticleItems,
  choiceCount: number = DEFAULT_CHOICE_COUNT,
): DrillQuestion[] {
  if (items.length === 0) return [];

  const drawn: ParticleDrillItem[] = [];
  while (drawn.length < count) {
    drawn.push(...shuffle(items, rng));
  }

  return drawn.slice(0, count).map((item, i) => {
    const distractorPool = item.distractors ?? PARTICLE_SET.filter((p) => p !== item.answer);
    // Dedupe and exclude anything that (accidentally) equals the answer, so
    // `choices` never contains a repeat.
    const uniqueDistractors = Array.from(
      new Set(distractorPool.filter((d) => d !== item.answer)),
    );
    let picked = shuffle(uniqueDistractors, rng).slice(0, choiceCount - 1);
    // Top up from PARTICLE_SET when an authored (or fallback) distractor
    // list is shorter than needed, so a question never renders with fewer
    // than `choiceCount` choices. Only computed/shuffled when actually
    // short, so RNG consumption on the normal (>= choiceCount - 1
    // distractors) path is unchanged.
    if (picked.length < choiceCount - 1) {
      const fillers = PARTICLE_SET.filter((p) => p !== item.answer && !picked.includes(p));
      picked = [...picked, ...shuffle(fillers, rng).slice(0, choiceCount - 1 - picked.length)];
    }
    const choices = shuffle([item.answer, ...picked], rng);

    const explanationParts = [item.translationEn, item.note].filter(
      (part): part is string => Boolean(part),
    );

    return {
      id: `particle.${i}.${item.id}`,
      mode: "choice",
      statKey: `particle:${item.answer}`,
      promptJa: item.sentence,
      instruction: "Pick the particle that fits ＿＿.",
      choices,
      correctIndex: choices.indexOf(item.answer),
      explanation: explanationParts.length > 0 ? explanationParts.join(" — ") : undefined,
    };
  });
}

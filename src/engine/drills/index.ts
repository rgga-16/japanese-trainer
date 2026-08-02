// Drill engine barrel — DrillHub/DrillRunner (built by another agent) code
// against this file: DRILLS for the setup panel + a uniform build() call,
// describeStatKey for rendering data.drillStats rows.

import type { AdjForm, VerbClass, VerbForm } from "../../content/types";
import {
  ADJ_FORM_LABELS,
  buildConjugationQuestions,
  VERB_FORM_LABELS,
} from "./conjugation";
import { buildParticleQuestions } from "./particle";
import type { DrillId, DrillSpec } from "./types";
import { buildTransitivityQuestions } from "./transitivity";
import { buildVocabRecallQuestions } from "./vocabRecall";

export type {
  ConjugationDrillOptions,
  DrillId,
  DrillOptions,
  DrillQuestion,
  DrillSpec,
  ParticleDrillOptions,
  TransitivityDrillOptions,
  VocabRecallDirection,
  VocabRecallDrillOptions,
} from "./types";
export {
  ADJ_FORM_LABELS,
  buildConjugationQuestions,
  VERB_CLASS_LABELS,
  VERB_FORM_LABELS,
} from "./conjugation";
export { buildParticleQuestions } from "./particle";
export { buildTransitivityQuestions } from "./transitivity";
export { buildVocabRecallQuestions, pickDistractors } from "./vocabRecall";

const DEFAULT_VERB_FORMS: VerbForm[] = ["te", "ta", "nai", "potential"];
const DEFAULT_ADJ_FORMS: AdjForm[] = ["negative", "past", "te"];
const DEFAULT_VERB_CLASSES: VerbClass[] = ["godan", "ichidan"];

/**
 * One entry per DrillId, describing it for a hub UI and exposing a single
 * uniform `build(options, rng, count)`. Each `build` narrows `options` on
 * its `id` discriminant before delegating to the drill's own
 * strongly-typed builder — the narrowing is a runtime safety net (a
 * caller passing mismatched options is a caller bug), not something the
 * type system needs help proving, since `options` structurally satisfies
 * the target builder's parameter type once narrowed.
 */
export const DRILLS: Record<DrillId, DrillSpec> = {
  conjugation: {
    id: "conjugation",
    title: "Conjugation drill",
    description: "Conjugate verbs and adjectives into a target form.",
    defaultOptions: {
      id: "conjugation",
      kind: "verbs",
      classes: DEFAULT_VERB_CLASSES,
      verbForms: DEFAULT_VERB_FORMS,
      adjForms: DEFAULT_ADJ_FORMS,
    },
    build: (options, rng, count) => {
      if (options.id !== "conjugation") {
        throw new Error(`conjugation drill received mismatched options: "${options.id}"`);
      }
      return buildConjugationQuestions(options, rng, count);
    },
  },
  particle: {
    id: "particle",
    title: "Particle drill",
    description: "Choose the particle that fits a sentence gap.",
    defaultOptions: { id: "particle" },
    build: (options, rng, count) => {
      if (options.id !== "particle") {
        throw new Error(`particle drill received mismatched options: "${options.id}"`);
      }
      return buildParticleQuestions(rng, count);
    },
  },
  "vocab-recall": {
    id: "vocab-recall",
    title: "Vocab recall",
    description: "Recall word meanings, Japanese↔English.",
    defaultOptions: { id: "vocab-recall", direction: "both" },
    build: (options, rng, count) => {
      if (options.id !== "vocab-recall") {
        throw new Error(`vocab-recall drill received mismatched options: "${options.id}"`);
      }
      return buildVocabRecallQuestions(options, rng, count);
    },
  },
  transitivity: {
    id: "transitivity",
    title: "Transitivity drill",
    description: "Match transitive/intransitive (他動詞/自動詞) verb pairs.",
    defaultOptions: { id: "transitivity" },
    build: (options, rng, count) => {
      if (options.id !== "transitivity") {
        throw new Error(`transitivity drill received mismatched options: "${options.id}"`);
      }
      return buildTransitivityQuestions(rng, count);
    },
  },
};

const VERB_CLASS_PREFIXES = new Set<string>(["godan", "ichidan", "suru", "kuru"]);
const ADJ_POS_PREFIXES = new Set<string>(["i-adj", "na-adj"]);

/**
 * Friendly label for a data.drillStats key, e.g. "godan:te" → "godan ·
 * て形". Falls back to returning the raw key unchanged for
 * unrecognized/legacy keys — the stats table is the only place an old key
 * surfaces, and dropping it would look like data loss.
 */
export function describeStatKey(key: string): string {
  const colonIndex = key.indexOf(":");
  if (colonIndex === -1) return key;
  const prefix = key.slice(0, colonIndex);
  const rest = key.slice(colonIndex + 1);

  if (prefix === "particle") return `particle · ${rest}`;

  if (prefix === "vocab") {
    if (rest === "ja-en") return "vocab · JA → EN";
    if (rest === "en-ja") return "vocab · EN → JA";
    return key;
  }

  if (prefix === "transitivity") {
    if (rest === "to-transitive") return "transitivity · 他動詞";
    if (rest === "to-intransitive") return "transitivity · 自動詞";
    return key;
  }

  // Conjugation keys carry no drill prefix of their own — the verb class
  // (godan/ichidan/suru/kuru) or adjective pos (i-adj/na-adj) IS the
  // prefix, byte-identical to the historical data.drillStats keys.
  if (VERB_CLASS_PREFIXES.has(prefix)) {
    const formLabel = VERB_FORM_LABELS[rest as VerbForm];
    if (formLabel) return `${prefix} · ${formLabel}`;
    return key;
  }
  if (ADJ_POS_PREFIXES.has(prefix)) {
    const formLabel = ADJ_FORM_LABELS[rest as AdjForm];
    if (formLabel) return `${prefix} · ${formLabel}`;
    return key;
  }

  return key;
}

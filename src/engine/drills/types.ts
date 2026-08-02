// Shared types for the generalized drill engine. A "drill" is a session of
// DrillQuestions built from some content bank; question construction lives in
// pure .ts builders (conjugation.ts / particle.ts / vocabRecall.ts /
// transitivity.ts) so it can run under Vitest (environment: "node" can't load
// .tsx) and so DrillRunner.tsx / DrillHub.tsx (built by another agent) have a
// single uniform contract to render against.

import type {
  AdjForm,
  VerbClass,
  VerbForm,
} from "../../content/types";
import type { Rng } from "../rng";

export type DrillId =
  | "conjugation"
  | "particle"
  | "vocab-recall"
  | "transitivity";

interface DrillQuestionBase {
  id: string;
  /**
   * Bucket key for data.drillStats. This is a data-migration constraint, not
   * a display string: existing keys carry no version marker and there is no
   * migration path, so the exact strings each builder emits must never
   * change. See the per-builder files for the namespace each one owns.
   */
  statKey: string;
  /** Japanese prompt (furigana notation), when the prompt is Japanese. */
  promptJa?: string;
  /** English prompt/gloss, when the prompt is English. */
  promptEn?: string;
  /** What the learner must do, e.g. "→ 可能形" or "Pick the particle". */
  instruction: string;
  /** Optional explanation surfaced in feedback. */
  explanation?: string;
}

/**
 * `typed` questions are graded by the caller with `gradeTyped(input,
 * accepted)` from ../grader (kind-agnostic — it expands kanji/kana variants
 * itself, so `accepted` is furigana notation). `choice` questions are graded
 * by index: `choices[correctIndex]` is the intended answer, and no `choice`
 * question ever has duplicate entries in `choices`.
 */
export type DrillQuestion =
  | (DrillQuestionBase & { mode: "typed"; accepted: string[] })
  | (DrillQuestionBase & {
      mode: "choice";
      choices: string[];
      correctIndex: number;
    });

// ---------------------------------------------------------------------------
// Per-drill options
// ---------------------------------------------------------------------------

export interface ConjugationDrillOptions {
  kind: "verbs" | "adjectives";
  classes: VerbClass[];
  verbForms: VerbForm[];
  adjForms: AdjForm[];
}

/**
 * No configuration today beyond session size, which `build(options, rng,
 * count)` takes separately. `Record<never, never>` resolves to `{}` (an
 * empty object type with no index signature), unlike `Record<string,
 * never>` — which would force every property (including the `id`
 * discriminant added in `DrillOptions`) to be of type `never` and make the
 * union member unconstructible.
 */
export type ParticleDrillOptions = Record<never, never>;

export type VocabRecallDirection = "ja-en" | "en-ja" | "both";

export interface VocabRecallDrillOptions {
  direction: VocabRecallDirection;
}

/** No configuration today beyond session size — see ParticleDrillOptions. */
export type TransitivityDrillOptions = Record<never, never>;

/**
 * Discriminated union of every drill's options, keyed by `id` (== DrillId).
 * `DrillSpec.build` takes this union uniformly; each drill's build function
 * narrows on `options.id` before delegating to its own strongly-typed
 * builder (see index.ts).
 */
export type DrillOptions =
  | ({ id: "conjugation" } & ConjugationDrillOptions)
  | ({ id: "particle" } & ParticleDrillOptions)
  | ({ id: "vocab-recall" } & VocabRecallDrillOptions)
  | ({ id: "transitivity" } & TransitivityDrillOptions);

/** Describes a drill for the hub UI and gives it a uniform builder entry point. */
export interface DrillSpec {
  id: DrillId;
  title: string;
  description: string;
  defaultOptions: DrillOptions;
  build: (options: DrillOptions, rng: Rng, count: number) => DrillQuestion[];
}

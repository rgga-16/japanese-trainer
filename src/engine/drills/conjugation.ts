// Conjugation drill — verb/adjective form practice. Extracted from
// src/views/ConjugationDrill.tsx (`buildQuestions`, lines 71-113 pre-extraction)
// so question construction can run under Vitest (environment: "node" can't
// load .tsx) and slot into the shared DrillQuestion contract.
//
// statKey namespace: kept BYTE-IDENTICAL to the pre-extraction view —
// `${verbClass}:${form}` for verbs (e.g. "godan:te", "kuru:ta") and
// `${pos}:${form}` for adjectives (e.g. "i-adj:past", "na-adj:te"). No
// "conjugation:" prefix — data.drillStats keys carry no version marker, so
// renaming these would silently orphan every existing user's drill history.

import { allVocab } from "../../content";
import type { AdjForm, VerbClass, VerbForm, VocabEntry } from "../../content/types";
import { conjugateAdjective, conjugateVerb } from "../conjugator";
import type { Rng } from "../rng";
import { shuffle } from "../rng";
import type { ConjugationDrillOptions, DrillQuestion } from "./types";

// Intentionally partial: omits dictionary/stem/masen/mashita/masen-deshita.
// Those are either the un-conjugated starting point (dictionary/stem) or
// covered by the plain `masu` target already (the polite-negative/past-polite
// family), so they aren't useful drill targets on their own.
export const VERB_FORM_LABELS: Partial<Record<VerbForm, string>> = {
  masu: "ます形",
  te: "て形",
  ta: "た形（plain past）",
  nai: "ない形",
  nakatta: "なかった形",
  potential: "可能形",
  passive: "受身形",
  causative: "使役形",
  volitional: "意向形",
  imperative: "命令形",
  prohibitive: "禁止形（〜な）",
  ba: "ば形",
  tara: "たら形",
  tai: "たい形",
};

export const ADJ_FORM_LABELS: Record<AdjForm, string> = {
  plain: "plain",
  negative: "negative（〜くない/じゃない）",
  past: "past（〜かった/だった）",
  "past-negative": "past negative",
  te: "て形",
  adverbial: "adverbial（〜く/に）",
  ba: "ば形",
  tara: "たら形",
};

export const VERB_CLASS_LABELS: Record<VerbClass, string> = {
  godan: "godan（う-verbs）",
  ichidan: "ichidan（る-verbs）",
  suru: "する verbs",
  kuru: "来る",
};

/**
 * Builds a conjugation drill session. Behaves identically to the
 * pre-extraction `buildQuestions`: same pool filtering, same
 * repeated-shuffle-then-slice session assembly (so a pool smaller than
 * `count` still yields `count` questions, with entries repeating), same
 * per-question form draw. The only externalized decision is the RNG (was
 * `mulberry32(Date.now() >>> 0)` created inline; now injected) — that's what
 * makes this deterministic/testable. Returns `[]` when the pool is empty
 * (no candidate verbs/adjectives) or when the requested form list is empty.
 *
 * `pool` is injectable (defaults to the real vocab bank) for test
 * convenience; production callers should omit it.
 */
export function buildConjugationQuestions(
  options: ConjugationDrillOptions,
  rng: Rng,
  count: number,
  pool: VocabEntry[] = allVocab,
): DrillQuestion[] {
  const { kind, classes, verbForms, adjForms } = options;
  if (kind === "verbs" && verbForms.length === 0) return [];
  if (kind === "adjectives" && adjForms.length === 0) return [];

  const candidates =
    kind === "verbs"
      ? pool.filter(
          (v) => v.pos === "verb" && v.verbClass !== undefined && classes.includes(v.verbClass),
        )
      : pool.filter((v) => v.pos === "i-adj" || v.pos === "na-adj");
  if (candidates.length === 0) return [];

  const entries: VocabEntry[] = [];
  while (entries.length < count) {
    entries.push(...shuffle(candidates, rng));
  }

  const questions: DrillQuestion[] = [];
  entries.slice(0, count).forEach((entry, i) => {
    if (kind === "verbs") {
      const form = verbForms[Math.floor(rng() * verbForms.length)];
      const formLabel = VERB_FORM_LABELS[form] ?? form;
      questions.push({
        id: `conjugation.${i}.${entry.id}.${form}`,
        mode: "typed",
        statKey: `${entry.verbClass}:${form}`,
        promptJa: entry.ja,
        promptEn: entry.en,
        instruction: `→ ${formLabel}`,
        accepted: [conjugateVerb(entry, form)],
      });
    } else {
      const form = adjForms[Math.floor(rng() * adjForms.length)];
      const formLabel = ADJ_FORM_LABELS[form];
      questions.push({
        id: `conjugation.${i}.${entry.id}.${form}`,
        mode: "typed",
        statKey: `${entry.pos}:${form}`,
        promptJa: entry.ja,
        promptEn: entry.en,
        instruction: `→ ${formLabel}`,
        accepted: [conjugateAdjective(entry, form)],
      });
    }
  });
  return questions;
}

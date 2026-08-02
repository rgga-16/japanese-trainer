// Vocab recall drill — built from the existing 122-entry allVocab bank (no
// new content needed). Two directions:
//   - JA→EN is `mode: "choice"`: free-text English is ungradable (gradeTyped
//     targets Japanese furigana notation, not English prose).
//   - EN→JA is `mode: "typed"`, accepted = the entry's `ja` in furigana
//     notation (gradeTyped already derives the kana-only variant, which is
//     the behavior we want for a recall drill).
//
// statKey namespace: exactly 2 buckets — "vocab:ja-en" and "vocab:en-ja" —
// NOT per-word (that would explode the stats table to 122 rows).

import { allVocab } from "../../content";
import type { VocabEntry } from "../../content/types";
import type { Rng } from "../rng";
import { shuffle } from "../rng";
import type {
  DrillQuestion,
  VocabRecallDirection,
  VocabRecallDrillOptions,
} from "./types";

const DEFAULT_CHOICE_COUNT = 4;

/**
 * Normalizes one comma-separated gloss token for near-synonym comparison:
 * trims, lowercases, and drops a leading "to " (verb infinitive marker) so
 * "to see" and "see" — or "to see" and "to see, to watch"'s first token —
 * compare equal.
 */
function normalizeGlossToken(token: string): string {
  return token.trim().toLowerCase().replace(/^to\s+/, "");
}

/** Every comma-separated gloss token in `en`, normalized, e.g. "to see, to
 * watch" -> ["see", "watch"]. */
function glossTokens(en: string): string[] {
  return en
    .split(",")
    .map(normalizeGlossToken)
    .filter((t) => t.length > 0);
}

/**
 * Picks up to `count` distractor entries for `answer` out of `candidates`:
 * same part of speech (keeps the question grammatically coherent — a noun
 * question shouldn't offer verb glosses) and no overlapping gloss token with
 * the answer OR with a distractor already picked. Rejecting on ANY shared
 * token (not just a whole-string match on the first token) is what catches
 * near-synonym pairs — e.g. 見る "to see, to watch" against a hypothetical
 * "to look" entry sharing no full-string match but still making the question
 * unfair — and the "already picked" check keeps the distractors from
 * duplicating/overlapping each other, not just the answer.
 */
export function pickDistractors(
  answer: VocabEntry,
  candidates: VocabEntry[],
  rng: Rng,
  count: number,
): VocabEntry[] {
  const usedTokens = new Set(glossTokens(answer.en));
  const shuffled = shuffle(
    candidates.filter((c) => c.id !== answer.id && c.pos === answer.pos),
    rng,
  );

  const picked: VocabEntry[] = [];
  for (const candidate of shuffled) {
    if (picked.length >= count) break;
    const tokens = glossTokens(candidate.en);
    if (tokens.some((t) => usedTokens.has(t))) continue;
    picked.push(candidate);
    for (const t of tokens) usedTokens.add(t);
  }
  return picked;
}

/**
 * Builds a vocab recall drill session. Returns `[]` when `vocab` is empty;
 * otherwise always returns exactly `count` questions (entries repeat via
 * shuffle-refill when the bank is smaller than `count`), matching
 * buildConjugationQuestions's degrade behavior. When `options.direction` is
 * "both", each question independently draws JA→EN or EN→JA.
 *
 * `vocab` is injectable (defaults to the real bank) for test convenience.
 */
export function buildVocabRecallQuestions(
  options: VocabRecallDrillOptions,
  rng: Rng,
  count: number,
  vocab: VocabEntry[] = allVocab,
): DrillQuestion[] {
  if (vocab.length === 0) return [];

  const directions: VocabRecallDirection[] =
    options.direction === "both" ? ["ja-en", "en-ja"] : [options.direction];

  const drawn: VocabEntry[] = [];
  while (drawn.length < count) {
    drawn.push(...shuffle(vocab, rng));
  }

  return drawn.slice(0, count).map((entry, i) => {
    const direction = directions[Math.floor(rng() * directions.length)];

    if (direction === "ja-en") {
      const distractors = pickDistractors(entry, vocab, rng, DEFAULT_CHOICE_COUNT - 1);
      const choices = shuffle([entry.en, ...distractors.map((d) => d.en)], rng);
      return {
        id: `vocab.ja-en.${i}.${entry.id}`,
        mode: "choice",
        statKey: "vocab:ja-en",
        promptJa: entry.ja,
        instruction: "Pick the English meaning.",
        choices,
        correctIndex: choices.indexOf(entry.en),
      };
    }

    return {
      id: `vocab.en-ja.${i}.${entry.id}`,
      mode: "typed",
      statKey: "vocab:en-ja",
      promptEn: entry.en,
      instruction: "Type the Japanese word.",
      accepted: [entry.ja],
    };
  });
}

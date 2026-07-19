// Answer grading for typed-input exercises. Accepted answers are authored in
// furigana notation (see furigana.ts); user input is graded against both the
// kanji-surface and all-kana expansions of each accepted answer.

import { stripFurigana, toKana } from "./furigana";

const PUNCTUATION_TO_STRIP = /[。．.！!？?、,]/g;
const WHITESPACE = /\s|　/g;

/**
 * Unicode-normalize (NFKC, unifies full/half-width ASCII and half-width
 * katakana), strip all whitespace (including 全角スペース), and strip
 * sentence punctuation. Does NOT convert between kana scripts.
 */
export function normalize(s: string): string {
  return s
    .normalize("NFKC")
    .replace(WHITESPACE, "")
    .replace(PUNCTUATION_TO_STRIP, "");
}

/**
 * Expand each authored answer (furigana notation) into its kanji-surface and
 * all-kana forms, deduped, order-preserving.
 */
export function expandAccepted(acceptedFurigana: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const a of acceptedFurigana) {
    for (const variant of [stripFurigana(a), toKana(a)]) {
      if (!seen.has(variant)) {
        seen.add(variant);
        out.push(variant);
      }
    }
  }
  return out;
}

/** Standard O(n*m) two-row Levenshtein edit distance. */
export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  let prev = new Array<number>(n + 1);
  let curr = new Array<number>(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost
      );
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

export interface GradeResult {
  correct: boolean;
  matched?: string;
  closest: string;
}

export function gradeTyped(input: string, acceptedFurigana: string[]): GradeResult {
  const normalizedInput = normalize(input);
  const expanded = expandAccepted(acceptedFurigana);

  for (const variant of expanded) {
    if (normalize(variant) === normalizedInput) {
      // Find which authored answer this variant came from, for `closest`.
      const source = acceptedFurigana.find((a) => {
        const surface = stripFurigana(a);
        const kana = toKana(a);
        return surface === variant || kana === variant;
      });
      return {
        correct: true,
        matched: variant,
        closest: source !== undefined ? stripFurigana(source) : variant,
      };
    }
  }

  // Wrong: find the authored answer whose normalized kanji-surface form is
  // closest (smallest Levenshtein distance) to the normalized input.
  let closest = "";
  let bestDistance = Infinity;
  for (const a of acceptedFurigana) {
    const surface = stripFurigana(a);
    const distance = levenshtein(normalizedInput, normalize(surface));
    if (distance < bestDistance) {
      bestDistance = distance;
      closest = surface;
    }
  }

  return { correct: false, closest };
}

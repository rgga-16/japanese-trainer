// Answer grading for typed-input exercises. Accepted answers are authored in
// furigana notation (see furigana.ts); user input is graded against both the
// kanji-surface and all-kana expansions of each accepted answer.

import { parseFurigana, stripFurigana } from "./furigana";

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
 * Expand a single authored answer (furigana notation) into every mixed
 * kanji/kana rendering: each segment with a reading may render as its kanji
 * `base` or its kana `reading`; literal segments render as-is. Segments are
 * folded via cartesian product, so the result has up to 2^k entries (k =
 * number of reading segments). The all-kanji rendering is always first.
 * Never converts between kana scripts (katakana stays katakana) — only a
 * kanji run is substituted for its authored reading.
 */
export function expandVariants(furigana: string): string[] {
  const segments = parseFurigana(furigana);
  let variants = [""];
  for (const segment of segments) {
    if (segment.reading === undefined) {
      variants = variants.map((v) => v + segment.base);
    } else {
      const next: string[] = [];
      for (const v of variants) {
        next.push(v + segment.base);
      }
      for (const v of variants) {
        next.push(v + segment.reading);
      }
      variants = next;
    }
  }
  return variants;
}

/**
 * Expand each authored answer (furigana notation) into all of its mixed
 * kanji/kana renderings, deduped, order-preserving (canonical all-kanji form
 * of each answer first).
 */
export function expandAccepted(acceptedFurigana: string[]): string[] {
  return expandAcceptedWithSource(acceptedFurigana).map((e) => e.variant);
}

interface ExpandedVariant {
  variant: string;
  source: string;
}

/**
 * Like `expandAccepted`, but keeps track of which authored answer each
 * variant came from (needed so `gradeTyped` can resolve a mixed-form match
 * back to its canonical kanji surface).
 */
function expandAcceptedWithSource(
  acceptedFurigana: string[],
): ExpandedVariant[] {
  const out: ExpandedVariant[] = [];
  const seen = new Set<string>();
  for (const a of acceptedFurigana) {
    for (const variant of expandVariants(a)) {
      if (!seen.has(variant)) {
        seen.add(variant);
        out.push({ variant, source: a });
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
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

export interface GradeResult {
  correct: boolean;
  matched?: string;
  closest: string;
  /** Canonical (all-kanji, furigana-stripped) surface of the matched authored
   * answer. Set whenever `correct` is true. */
  canonical?: string;
  /** True when correct but the normalized input differs from the normalized
   * canonical surface (the user used kana where the canonical form has
   * kanji). */
  nonCanonical?: boolean;
}

export function gradeTyped(
  input: string,
  acceptedFurigana: string[],
): GradeResult {
  const normalizedInput = normalize(input);
  const expanded = expandAcceptedWithSource(acceptedFurigana);

  for (const { variant, source } of expanded) {
    if (normalize(variant) === normalizedInput) {
      // `closest` stays the raw kanji surface (as authored, minus furigana) so
      // callers can map it back to the furigana-notation answer for display;
      // `canonical` is its normalized form, used only for the "written form"
      // note and the non-canonical check.
      const surface = stripFurigana(source);
      const canonical = normalize(surface);
      return {
        correct: true,
        matched: variant,
        closest: surface,
        canonical,
        nonCanonical: canonical !== normalizedInput,
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

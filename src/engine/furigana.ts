// Furigana notation: a kanji run immediately followed by its kana reading in
// brackets — 食[た]べる, 日本語[にほんご]. Everything else is literal text.

export interface FuriganaSegment {
  base: string;
  reading?: string;
}

const KANJI_RUN_WITH_READING =
  /([㐀-䶿一-鿿々〆ヵヶ〇]+)\[([^\]]+)\]/g;

export function parseFurigana(text: string): FuriganaSegment[] {
  const segments: FuriganaSegment[] = [];
  const re = new RegExp(KANJI_RUN_WITH_READING.source, "g");
  let last = 0;
  let m: RegExpExecArray | null = re.exec(text);
  while (m !== null) {
    if (m.index > last) {
      segments.push({ base: text.slice(last, m.index) });
    }
    segments.push({ base: m[1], reading: m[2] });
    last = re.lastIndex;
    m = re.exec(text);
  }
  if (last < text.length) {
    segments.push({ base: text.slice(last) });
  }
  return segments;
}

/** Surface form with kanji: 食[た]べる → 食べる */
export function stripFurigana(text: string): string {
  return parseFurigana(text)
    .map((s) => s.base)
    .join("");
}

/** All-kana form: 食[た]べる → たべる */
export function toKana(text: string): string {
  return parseFurigana(text)
    .map((s) => s.reading ?? s.base)
    .join("");
}

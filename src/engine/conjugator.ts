// Conjugation engine — takes a VocabEntry whose `ja` is the dictionary form
// in furigana notation (see src/engine/furigana.ts) and returns the requested
// form, also in furigana notation.
//
// Approach: split `ja` into an invariant prefix and a conjugating tail.
// Content is authored so the tail (the kana that changes on conjugation)
// always sits outside the furigana brackets — e.g. 食[た]べる's tail is
// "べる", 飲[の]む's tail is "む" — so plain string slicing on `ja` is safe
// and never needs to look inside a [reading].

import type { AdjForm, VerbForm, VocabEntry } from "../content/types";
import { toKana } from "./furigana";

function assertNever(x: never): never {
  throw new Error(`conjugator: unhandled case "${JSON.stringify(x)}"`);
}

// ---------------------------------------------------------------------------
// Verbs
// ---------------------------------------------------------------------------

export function conjugateVerb(v: VocabEntry, form: VerbForm): string {
  if (v.pos !== "verb") {
    throw new Error(`conjugateVerb: "${v.id}" is not a verb (pos="${v.pos}")`);
  }
  if (!v.verbClass) {
    throw new Error(`conjugateVerb: "${v.id}" has pos="verb" but no verbClass`);
  }
  switch (v.verbClass) {
    case "godan":
      return conjugateGodan(v.ja, form);
    case "ichidan":
      return conjugateIchidan(v.ja, form);
    case "suru":
      return conjugateSuru(v.ja, form);
    case "kuru":
      return conjugateKuru(v.ja, form);
    default:
      return assertNever(v.verbClass);
  }
}

interface GodanRow {
  /** negative base: わ/た/ら/ま/ば/な/か/が/さ */
  a: string;
  /** ます-stem base: い/ち/り/み/び/に/き/ぎ/し */
  i: string;
  /** potential/ba/imperative base: え/て/れ/め/べ/ね/け/げ/せ */
  e: string;
  /** volitional base: お/と/ろ/も/ぼ/の/こ/ご/そ */
  o: string;
  te: string;
  ta: string;
}

const GODAN_ROWS: Record<string, GodanRow> = {
  "う": { a: "わ", i: "い", e: "え", o: "お", te: "って", ta: "った" },
  "つ": { a: "た", i: "ち", e: "て", o: "と", te: "って", ta: "った" },
  "る": { a: "ら", i: "り", e: "れ", o: "ろ", te: "って", ta: "った" },
  "む": { a: "ま", i: "み", e: "め", o: "も", te: "んで", ta: "んだ" },
  "ぶ": { a: "ば", i: "び", e: "べ", o: "ぼ", te: "んで", ta: "んだ" },
  "ぬ": { a: "な", i: "に", e: "ね", o: "の", te: "んで", ta: "んだ" },
  "く": { a: "か", i: "き", e: "け", o: "こ", te: "いて", ta: "いた" },
  "ぐ": { a: "が", i: "ぎ", e: "げ", o: "ご", te: "いで", ta: "いだ" },
  "す": { a: "さ", i: "し", e: "せ", o: "そ", te: "して", ta: "した" },
};

function conjugateGodan(ja: string, form: VerbForm): string {
  const tail = ja.slice(-1);
  const prefix = ja.slice(0, -1);
  const row = GODAN_ROWS[tail];
  if (!row) {
    throw new Error(`conjugateVerb: "${ja}" does not end in a valid godan kana ("${tail}")`);
  }

  // Special cases: 行く's te/ta are irregular (行って/行った, not 行いて/行いた);
  // ある's negative drops the whole stem (ない, not あらない).
  const isIku = ja.endsWith("行[い]く");
  const isAru = toKana(ja) === "ある";

  const stem = prefix + row.i;
  const teForm = isIku ? prefix + "って" : prefix + row.te;
  const taForm = isIku ? prefix + "った" : prefix + row.ta;
  const naiForm = isAru ? "ない" : prefix + row.a + "ない";

  switch (form) {
    case "dictionary":
      return ja;
    case "stem":
      return stem;
    case "masu":
      return stem + "ます";
    case "masen":
      return stem + "ません";
    case "mashita":
      return stem + "ました";
    case "masen-deshita":
      return stem + "ませんでした";
    case "te":
      return teForm;
    case "ta":
      return taForm;
    case "nai":
      return naiForm;
    case "nakatta":
      return naiForm.replace(/ない$/, "なかった");
    case "potential":
      return prefix + row.e + "る";
    case "passive":
      return prefix + row.a + "れる";
    case "causative":
      return prefix + row.a + "せる";
    case "volitional":
      return prefix + row.o + "う";
    case "imperative":
      return prefix + row.e;
    case "prohibitive":
      return ja + "な";
    case "ba":
      return prefix + row.e + "ば";
    case "tara":
      return taForm + "ら";
    case "tai":
      return stem + "たい";
    default:
      return assertNever(form);
  }
}

function conjugateIchidan(ja: string, form: VerbForm): string {
  const stem = ja.slice(0, -1); // drop る
  const teForm = stem + "て";
  const taForm = stem + "た";
  const naiForm = stem + "ない";

  switch (form) {
    case "dictionary":
      return ja;
    case "stem":
      return stem;
    case "masu":
      return stem + "ます";
    case "masen":
      return stem + "ません";
    case "mashita":
      return stem + "ました";
    case "masen-deshita":
      return stem + "ませんでした";
    case "te":
      return teForm;
    case "ta":
      return taForm;
    case "nai":
      return naiForm;
    case "nakatta":
      return naiForm.replace(/ない$/, "なかった");
    case "potential":
      return stem + "られる";
    case "passive":
      return stem + "られる";
    case "causative":
      return stem + "させる";
    case "volitional":
      return stem + "よう";
    case "imperative":
      return stem + "ろ";
    case "prohibitive":
      return ja + "な";
    case "ba":
      return stem + "れば";
    case "tara":
      return taForm + "ら";
    case "tai":
      return stem + "たい";
    default:
      return assertNever(form);
  }
}

function conjugateSuru(ja: string, form: VerbForm): string {
  if (!ja.endsWith("する")) {
    throw new Error(`conjugateVerb: suru verb "${ja}" does not end in "する"`);
  }
  const prefix = ja.slice(0, -2); // everything before the final する, e.g. 勉強[べんきょう]
  const teForm = prefix + "して";
  const taForm = prefix + "した";
  const naiForm = prefix + "しない";

  switch (form) {
    case "dictionary":
      return ja;
    case "stem":
      return prefix + "し";
    case "masu":
      return prefix + "します";
    case "masen":
      return prefix + "しません";
    case "mashita":
      return prefix + "しました";
    case "masen-deshita":
      return prefix + "しませんでした";
    case "te":
      return teForm;
    case "ta":
      return taForm;
    case "nai":
      return naiForm;
    case "nakatta":
      return naiForm.replace(/ない$/, "なかった");
    case "potential":
      return prefix + "できる";
    case "passive":
      return prefix + "される";
    case "causative":
      return prefix + "させる";
    case "volitional":
      return prefix + "しよう";
    case "imperative":
      return prefix + "しろ";
    case "prohibitive":
      return ja + "な";
    case "ba":
      return prefix + "すれば";
    case "tara":
      return taForm + "ら";
    case "tai":
      return prefix + "したい";
    default:
      return assertNever(form);
  }
}

const KURU_DICTIONARY = "来[く]る";

function conjugateKuru(ja: string, form: VerbForm): string {
  if (!ja.endsWith(KURU_DICTIONARY)) {
    throw new Error(`conjugateVerb: kuru verb "${ja}" does not end in "${KURU_DICTIONARY}"`);
  }
  const prefix = ja.slice(0, -KURU_DICTIONARY.length);
  const teForm = prefix + "来[き]て";
  const taForm = prefix + "来[き]た";
  const naiForm = prefix + "来[こ]ない";

  switch (form) {
    case "dictionary":
      return ja;
    case "stem":
      return prefix + "来[き]";
    case "masu":
      return prefix + "来[き]ます";
    case "masen":
      return prefix + "来[き]ません";
    case "mashita":
      return prefix + "来[き]ました";
    case "masen-deshita":
      return prefix + "来[き]ませんでした";
    case "te":
      return teForm;
    case "ta":
      return taForm;
    case "nai":
      return naiForm;
    case "nakatta":
      return naiForm.replace(/ない$/, "なかった");
    case "potential":
      return prefix + "来[こ]られる";
    case "passive":
      return prefix + "来[こ]られる";
    case "causative":
      return prefix + "来[こ]させる";
    case "volitional":
      return prefix + "来[こ]よう";
    case "imperative":
      return prefix + "来[こ]い";
    case "prohibitive":
      return ja + "な";
    case "ba":
      return prefix + "来[く]れば";
    case "tara":
      return taForm + "ら";
    case "tai":
      return prefix + "来[き]たい";
    default:
      return assertNever(form);
  }
}

// ---------------------------------------------------------------------------
// Adjectives
// ---------------------------------------------------------------------------

export function conjugateAdjective(a: VocabEntry, form: AdjForm): string {
  if (a.pos === "i-adj") {
    return conjugateIAdj(a.ja, form);
  }
  if (a.pos === "na-adj") {
    return conjugateNaAdj(a.ja, form);
  }
  throw new Error(`conjugateAdjective: "${a.id}" is not an adjective (pos="${a.pos}")`);
}

function conjugateIAdj(ja: string, form: AdjForm): string {
  if (!ja.endsWith("い")) {
    throw new Error(`conjugateAdjective: i-adjective "${ja}" does not end in "い"`);
  }
  // いい is irregular: every non-plain form conjugates off of よい's stem.
  const isPlainIi = ja === "いい";
  const stem = isPlainIi ? "よ" : ja.slice(0, -1);

  switch (form) {
    case "plain":
      return ja;
    case "negative":
      return stem + "くない";
    case "past":
      return stem + "かった";
    case "past-negative":
      return stem + "くなかった";
    case "te":
      return stem + "くて";
    case "adverbial":
      return stem + "く";
    case "ba":
      return stem + "ければ";
    case "tara":
      return stem + "かったら";
    default:
      return assertNever(form);
  }
}

function conjugateNaAdj(ja: string, form: AdjForm): string {
  switch (form) {
    case "plain":
      return ja;
    case "negative":
      return ja + "じゃない";
    case "past":
      return ja + "だった";
    case "past-negative":
      return ja + "じゃなかった";
    case "te":
      return ja + "で";
    case "adverbial":
      return ja + "に";
    case "ba":
      return ja + "なら";
    case "tara":
      return ja + "だったら";
    default:
      return assertNever(form);
  }
}

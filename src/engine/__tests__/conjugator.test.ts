import { describe, expect, it } from "vitest";

import type { AdjForm, VerbForm, VocabEntry } from "../../content/types";
import { conjugateAdjective, conjugateVerb } from "../conjugator";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const kau: VocabEntry = { id: "v.kau", ja: "買[か]う", en: "to buy", pos: "verb", verbClass: "godan", tags: [] };
const matsu: VocabEntry = { id: "v.matsu", ja: "待[ま]つ", en: "to wait", pos: "verb", verbClass: "godan", tags: [] };
const kaeru: VocabEntry = { id: "v.kaeru", ja: "帰[かえ]る", en: "to return", pos: "verb", verbClass: "godan", tags: [] };
const nomu: VocabEntry = { id: "v.nomu", ja: "飲[の]む", en: "to drink", pos: "verb", verbClass: "godan", tags: [] };
const asobu: VocabEntry = { id: "v.asobu", ja: "遊[あそ]ぶ", en: "to play", pos: "verb", verbClass: "godan", tags: [] };
const shinu: VocabEntry = { id: "v.shinu", ja: "死[し]ぬ", en: "to die", pos: "verb", verbClass: "godan", tags: [] };
const kaku: VocabEntry = { id: "v.kaku", ja: "書[か]く", en: "to write", pos: "verb", verbClass: "godan", tags: [] };
const oyogu: VocabEntry = { id: "v.oyogu", ja: "泳[およ]ぐ", en: "to swim", pos: "verb", verbClass: "godan", tags: [] };
const hanasu: VocabEntry = { id: "v.hanasu", ja: "話[はな]す", en: "to speak", pos: "verb", verbClass: "godan", tags: [] };
const iku: VocabEntry = { id: "v.iku", ja: "行[い]く", en: "to go", pos: "verb", verbClass: "godan", tags: [] };
const aru: VocabEntry = { id: "v.aru", ja: "ある", en: "to exist (inanimate)", pos: "verb", verbClass: "godan", tags: [] };

const taberu: VocabEntry = { id: "v.taberu", ja: "食[た]べる", en: "to eat", pos: "verb", verbClass: "ichidan", tags: [] };
const miru: VocabEntry = { id: "v.miru", ja: "見[み]る", en: "to see", pos: "verb", verbClass: "ichidan", tags: [] };

const suru: VocabEntry = { id: "v.suru", ja: "する", en: "to do", pos: "verb", verbClass: "suru", tags: [] };
const benkyouSuru: VocabEntry = {
  id: "v.benkyousuru",
  ja: "勉強[べんきょう]する",
  en: "to study",
  pos: "verb",
  verbClass: "suru",
  tags: [],
};

const kuru: VocabEntry = { id: "v.kuru", ja: "来[く]る", en: "to come", pos: "verb", verbClass: "kuru", tags: [] };

const takai: VocabEntry = { id: "adj.takai", ja: "高[たか]い", en: "expensive/tall", pos: "i-adj", tags: [] };
const ii: VocabEntry = { id: "adj.ii", ja: "いい", en: "good", pos: "i-adj", tags: [] };
const shizuka: VocabEntry = { id: "adj.shizuka", ja: "静[しず]か", en: "quiet", pos: "na-adj", tags: [] };

const noun: VocabEntry = { id: "n.mado", ja: "窓[まど]", en: "window", pos: "noun", tags: [] };
const verbNoClass: VocabEntry = { id: "v.broken", ja: "壊[こわ]れる", en: "broken", pos: "verb", tags: [] };

// ---------------------------------------------------------------------------
// Golden-case tables
// ---------------------------------------------------------------------------

interface VerbCase {
  v: VocabEntry;
  form: VerbForm;
  expected: string;
}

const ALL_VERB_FORMS: VerbForm[] = [
  "dictionary",
  "stem",
  "masu",
  "masen",
  "mashita",
  "masen-deshita",
  "te",
  "ta",
  "nai",
  "nakatta",
  "potential",
  "passive",
  "causative",
  "volitional",
  "imperative",
  "prohibitive",
  "ba",
  "tara",
  "tai",
];

function fullVerbCases(v: VocabEntry, expected: Record<VerbForm, string>): VerbCase[] {
  return ALL_VERB_FORMS.map((form) => ({ v, form, expected: expected[form] }));
}

const kauCases = fullVerbCases(kau, {
  dictionary: "買[か]う",
  stem: "買[か]い",
  masu: "買[か]います",
  masen: "買[か]いません",
  mashita: "買[か]いました",
  "masen-deshita": "買[か]いませんでした",
  te: "買[か]って",
  ta: "買[か]った",
  nai: "買[か]わない",
  nakatta: "買[か]わなかった",
  potential: "買[か]える",
  passive: "買[か]われる",
  causative: "買[か]わせる",
  volitional: "買[か]おう",
  imperative: "買[か]え",
  prohibitive: "買[か]うな",
  ba: "買[か]えば",
  tara: "買[か]ったら",
  tai: "買[か]いたい",
});

const kaeruCases = fullVerbCases(kaeru, {
  dictionary: "帰[かえ]る",
  stem: "帰[かえ]り",
  masu: "帰[かえ]ります",
  masen: "帰[かえ]りません",
  mashita: "帰[かえ]りました",
  "masen-deshita": "帰[かえ]りませんでした",
  te: "帰[かえ]って",
  ta: "帰[かえ]った",
  nai: "帰[かえ]らない",
  nakatta: "帰[かえ]らなかった",
  potential: "帰[かえ]れる",
  passive: "帰[かえ]られる",
  causative: "帰[かえ]らせる",
  volitional: "帰[かえ]ろう",
  imperative: "帰[かえ]れ",
  prohibitive: "帰[かえ]るな",
  ba: "帰[かえ]れば",
  tara: "帰[かえ]ったら",
  tai: "帰[かえ]りたい",
});

const nomuCases = fullVerbCases(nomu, {
  dictionary: "飲[の]む",
  stem: "飲[の]み",
  masu: "飲[の]みます",
  masen: "飲[の]みません",
  mashita: "飲[の]みました",
  "masen-deshita": "飲[の]みませんでした",
  te: "飲[の]んで",
  ta: "飲[の]んだ",
  nai: "飲[の]まない",
  nakatta: "飲[の]まなかった",
  potential: "飲[の]める",
  passive: "飲[の]まれる",
  causative: "飲[の]ませる",
  volitional: "飲[の]もう",
  imperative: "飲[の]め",
  prohibitive: "飲[の]むな",
  ba: "飲[の]めば",
  tara: "飲[の]んだら",
  tai: "飲[の]みたい",
});

const hanasuCases = fullVerbCases(hanasu, {
  dictionary: "話[はな]す",
  stem: "話[はな]し",
  masu: "話[はな]します",
  masen: "話[はな]しません",
  mashita: "話[はな]しました",
  "masen-deshita": "話[はな]しませんでした",
  te: "話[はな]して",
  ta: "話[はな]した",
  nai: "話[はな]さない",
  nakatta: "話[はな]さなかった",
  potential: "話[はな]せる",
  passive: "話[はな]される",
  causative: "話[はな]させる",
  volitional: "話[はな]そう",
  imperative: "話[はな]せ",
  prohibitive: "話[はな]すな",
  ba: "話[はな]せば",
  tara: "話[はな]したら",
  tai: "話[はな]したい",
});

const taberuCases = fullVerbCases(taberu, {
  dictionary: "食[た]べる",
  stem: "食[た]べ",
  masu: "食[た]べます",
  masen: "食[た]べません",
  mashita: "食[た]べました",
  "masen-deshita": "食[た]べませんでした",
  te: "食[た]べて",
  ta: "食[た]べた",
  nai: "食[た]べない",
  nakatta: "食[た]べなかった",
  potential: "食[た]べられる",
  passive: "食[た]べられる",
  causative: "食[た]べさせる",
  volitional: "食[た]べよう",
  imperative: "食[た]べろ",
  prohibitive: "食[た]べるな",
  ba: "食[た]べれば",
  tara: "食[た]べたら",
  tai: "食[た]べたい",
});

const miruCases = fullVerbCases(miru, {
  dictionary: "見[み]る",
  stem: "見[み]",
  masu: "見[み]ます",
  masen: "見[み]ません",
  mashita: "見[み]ました",
  "masen-deshita": "見[み]ませんでした",
  te: "見[み]て",
  ta: "見[み]た",
  nai: "見[み]ない",
  nakatta: "見[み]なかった",
  potential: "見[み]られる",
  passive: "見[み]られる",
  causative: "見[み]させる",
  volitional: "見[み]よう",
  imperative: "見[み]ろ",
  prohibitive: "見[み]るな",
  ba: "見[み]れば",
  tara: "見[み]たら",
  tai: "見[み]たい",
});

const suruCases = fullVerbCases(suru, {
  dictionary: "する",
  stem: "し",
  masu: "します",
  masen: "しません",
  mashita: "しました",
  "masen-deshita": "しませんでした",
  te: "して",
  ta: "した",
  nai: "しない",
  nakatta: "しなかった",
  potential: "できる",
  passive: "される",
  causative: "させる",
  volitional: "しよう",
  imperative: "しろ",
  prohibitive: "するな",
  ba: "すれば",
  tara: "したら",
  tai: "したい",
});

const benkyouSuruCases = fullVerbCases(benkyouSuru, {
  dictionary: "勉強[べんきょう]する",
  stem: "勉強[べんきょう]し",
  masu: "勉強[べんきょう]します",
  masen: "勉強[べんきょう]しません",
  mashita: "勉強[べんきょう]しました",
  "masen-deshita": "勉強[べんきょう]しませんでした",
  te: "勉強[べんきょう]して",
  ta: "勉強[べんきょう]した",
  nai: "勉強[べんきょう]しない",
  nakatta: "勉強[べんきょう]しなかった",
  potential: "勉強[べんきょう]できる",
  passive: "勉強[べんきょう]される",
  causative: "勉強[べんきょう]させる",
  volitional: "勉強[べんきょう]しよう",
  imperative: "勉強[べんきょう]しろ",
  prohibitive: "勉強[べんきょう]するな",
  ba: "勉強[べんきょう]すれば",
  tara: "勉強[べんきょう]したら",
  tai: "勉強[べんきょう]したい",
});

const kuruCases = fullVerbCases(kuru, {
  dictionary: "来[く]る",
  stem: "来[き]",
  masu: "来[き]ます",
  masen: "来[き]ません",
  mashita: "来[き]ました",
  "masen-deshita": "来[き]ませんでした",
  te: "来[き]て",
  ta: "来[き]た",
  nai: "来[こ]ない",
  nakatta: "来[こ]なかった",
  potential: "来[こ]られる",
  passive: "来[こ]られる",
  causative: "来[こ]させる",
  volitional: "来[こ]よう",
  imperative: "来[こ]い",
  prohibitive: "来[く]るな",
  ba: "来[く]れば",
  tara: "来[き]たら",
  tai: "来[き]たい",
});

// te/ta only, for the remaining godan endings not already fully covered above.
const teTaCases: VerbCase[] = [
  { v: matsu, form: "te", expected: "待[ま]って" },
  { v: matsu, form: "ta", expected: "待[ま]った" },
  { v: asobu, form: "te", expected: "遊[あそ]んで" },
  { v: asobu, form: "ta", expected: "遊[あそ]んだ" },
  { v: shinu, form: "te", expected: "死[し]んで" },
  { v: shinu, form: "ta", expected: "死[し]んだ" },
  { v: kaku, form: "te", expected: "書[か]いて" },
  { v: kaku, form: "ta", expected: "書[か]いた" },
  { v: oyogu, form: "te", expected: "泳[およ]いで" },
  { v: oyogu, form: "ta", expected: "泳[およ]いだ" },
];

const specialCases: VerbCase[] = [
  { v: iku, form: "te", expected: "行[い]って" },
  { v: iku, form: "ta", expected: "行[い]った" },
  { v: aru, form: "nai", expected: "ない" },
  { v: aru, form: "nakatta", expected: "なかった" },
];

const ALL_VERB_CASES: VerbCase[] = [
  ...kauCases,
  ...kaeruCases,
  ...nomuCases,
  ...hanasuCases,
  ...taberuCases,
  ...miruCases,
  ...suruCases,
  ...benkyouSuruCases,
  ...kuruCases,
  ...teTaCases,
  ...specialCases,
];

interface AdjCase {
  a: VocabEntry;
  form: AdjForm;
  expected: string;
}

const ALL_ADJ_FORMS: AdjForm[] = ["plain", "negative", "past", "past-negative", "te", "adverbial", "ba", "tara"];

function fullAdjCases(a: VocabEntry, expected: Record<AdjForm, string>): AdjCase[] {
  return ALL_ADJ_FORMS.map((form) => ({ a, form, expected: expected[form] }));
}

const takaiCases = fullAdjCases(takai, {
  plain: "高[たか]い",
  negative: "高[たか]くない",
  past: "高[たか]かった",
  "past-negative": "高[たか]くなかった",
  te: "高[たか]くて",
  adverbial: "高[たか]く",
  ba: "高[たか]ければ",
  tara: "高[たか]かったら",
});

const iiCases = fullAdjCases(ii, {
  plain: "いい",
  negative: "よくない",
  past: "よかった",
  "past-negative": "よくなかった",
  te: "よくて",
  adverbial: "よく",
  ba: "よければ",
  tara: "よかったら",
});

const shizukaCases = fullAdjCases(shizuka, {
  plain: "静[しず]か",
  negative: "静[しず]かじゃない",
  past: "静[しず]かだった",
  "past-negative": "静[しず]かじゃなかった",
  te: "静[しず]かで",
  adverbial: "静[しず]かに",
  ba: "静[しず]かなら",
  tara: "静[しず]かだったら",
});

const ALL_ADJ_CASES: AdjCase[] = [...takaiCases, ...iiCases, ...shizukaCases];

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("conjugateVerb", () => {
  it.each(ALL_VERB_CASES.map((c) => [c.v.id, c.form, c.expected, c.v] as const))(
    "%s / %s -> %s",
    (_id, form, expected, v) => {
      expect(conjugateVerb(v, form)).toBe(expected);
    },
  );

  it("throws when given a noun", () => {
    expect(() => conjugateVerb(noun, "dictionary")).toThrow(/not a verb/);
  });

  it("throws when a verb entry is missing verbClass", () => {
    expect(() => conjugateVerb(verbNoClass, "dictionary")).toThrow(/verbClass/);
  });
});

describe("conjugateAdjective", () => {
  it.each(ALL_ADJ_CASES.map((c) => [c.a.id, c.form, c.expected, c.a] as const))(
    "%s / %s -> %s",
    (_id, form, expected, a) => {
      expect(conjugateAdjective(a, form)).toBe(expected);
    },
  );

  it("throws when given a verb", () => {
    expect(() => conjugateAdjective(taberu, "plain")).toThrow(/not an adjective/);
  });

  it("throws when given a noun", () => {
    expect(() => conjugateAdjective(noun, "plain")).toThrow(/not an adjective/);
  });
});

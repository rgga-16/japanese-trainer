// Transitive/intransitive verb pairs (自他動詞) for the transitivity drill.
//
// These verbs deliberately do NOT go into vocab.ts: entries there are
// load-bearing for conjugator.ts and generator.ts slot selection, so ~50 new
// verbs would change generated-exercise output and skew the part-of-speech
// spread thresholds in content.test.ts.

import type { TransitivityPair } from "../types";

export const allTransitivityPairs: TransitivityPair[] = [
  {
    id: "tp.akeru-aku",
    transitive: { ja: "開[あ]ける", en: "to open (something)" },
    intransitive: { ja: "開[あ]く", en: "to open (by itself)" },
    note: "窓を開ける (open the window) vs 窓が開く (the window opens).",
  },
  {
    id: "tp.shimeru-shimaru",
    transitive: { ja: "閉[し]める", en: "to close (something)" },
    intransitive: { ja: "閉[し]まる", en: "to close (by itself)" },
  },
  {
    id: "tp.hajimeru-hajimaru",
    transitive: { ja: "始[はじ]める", en: "to start (something)" },
    intransitive: { ja: "始[はじ]まる", en: "to start, begin (by itself)" },
  },
  {
    id: "tp.dasu-deru",
    transitive: { ja: "出[だ]す", en: "to take (something) out" },
    intransitive: { ja: "出[で]る", en: "to go out, come out" },
  },
  {
    id: "tp.ireru-hairu",
    transitive: { ja: "入[い]れる", en: "to put (something) in" },
    intransitive: { ja: "入[はい]る", en: "to go in, enter" },
  },
  {
    id: "tp.ageru-agaru",
    transitive: { ja: "上[あ]げる", en: "to raise (something)" },
    intransitive: { ja: "上[あ]がる", en: "to rise, go up (by itself)" },
  },
  {
    id: "tp.sageru-sagaru",
    transitive: { ja: "下[さ]げる", en: "to lower (something)" },
    intransitive: { ja: "下[さ]がる", en: "to go down, drop (by itself)" },
  },
  {
    id: "tp.otosu-ochiru",
    transitive: { ja: "落[お]とす", en: "to drop (something)" },
    intransitive: { ja: "落[お]ちる", en: "to fall (by itself)" },
  },
  {
    id: "tp.kesu-kieru",
    transitive: { ja: "消[け]す", en: "to turn off / erase (something)" },
    intransitive: { ja: "消[き]える", en: "to go out, disappear (by itself)" },
  },
  {
    id: "tp.tsukeru-tsuku",
    transitive: { ja: "つける", en: "to turn on (something)" },
    intransitive: { ja: "つく", en: "to turn on, light up (by itself)" },
    note: "Both are pure hiragana (no distinguishing kanji), so the direction relies entirely on the gloss and the object marker: テレビをつける (turn on the TV) vs テレビがつく (the TV comes on).",
  },
  {
    id: "tp.naosu-naoru",
    transitive: { ja: "直[なお]す", en: "to fix, repair (something)" },
    intransitive: { ja: "直[なお]る", en: "to get fixed, be repaired (by itself)" },
  },
  {
    id: "tp.okosu-okiru",
    transitive: { ja: "起[お]こす", en: "to wake (someone) up" },
    intransitive: { ja: "起[お]きる", en: "to wake up, get up (by oneself)" },
    note: "起こす/起きる also extend to events (事故を起こす 'to cause an accident' / 事故が起きる 'an accident occurs'); the wake-up sense is the core N4 pairing.",
  },
  {
    id: "tp.tomeru-tomaru",
    transitive: { ja: "止[と]める", en: "to stop (something)" },
    intransitive: { ja: "止[と]まる", en: "to stop, come to a halt (by itself)" },
  },
  {
    id: "tp.kaeru-kawaru",
    transitive: { ja: "変[か]える", en: "to change (something)" },
    intransitive: { ja: "変[か]わる", en: "to change (by itself)" },
  },
  {
    id: "tp.kimeru-kimaru",
    transitive: { ja: "決[き]める", en: "to decide (something)" },
    intransitive: { ja: "決[き]まる", en: "to be decided" },
  },
  {
    id: "tp.mitsukeru-mitsukaru",
    transitive: { ja: "見[み]つける", en: "to find (something)" },
    intransitive: { ja: "見[み]つかる", en: "to be found, turn up" },
  },
  {
    id: "tp.atsumeru-atsumaru",
    transitive: { ja: "集[あつ]める", en: "to gather, collect (something)" },
    intransitive: { ja: "集[あつ]まる", en: "to gather, get together (by itself)" },
  },
  {
    id: "tp.naraberu-narabu",
    transitive: { ja: "並[なら]べる", en: "to line (something) up" },
    intransitive: { ja: "並[なら]ぶ", en: "to line up, stand in a row (by itself)" },
  },
  {
    id: "tp.waru-wareru",
    transitive: { ja: "割[わ]る", en: "to break, split (something)" },
    intransitive: { ja: "割[わ]れる", en: "to break, shatter (by itself)" },
  },
  {
    id: "tp.yogosu-yogoreru",
    transitive: { ja: "汚[よご]す", en: "to get (something) dirty" },
    intransitive: { ja: "汚[よご]れる", en: "to get dirty, become soiled (by itself)" },
  },
  {
    id: "tp.kowasu-kowareru",
    transitive: { ja: "壊[こわ]す", en: "to break (something)" },
    intransitive: { ja: "壊[こわ]れる", en: "to break, get broken (by itself)" },
  },
  {
    id: "tp.wakasu-waku",
    transitive: { ja: "沸[わ]かす", en: "to boil (something, e.g. water)" },
    intransitive: { ja: "沸[わ]く", en: "to boil, come to a boil (by itself)" },
  },
  {
    id: "tp.hiyasu-hieru",
    transitive: { ja: "冷[ひ]やす", en: "to chill, cool (something)" },
    intransitive: { ja: "冷[ひ]える", en: "to get cold, cool down (by itself)" },
  },
  {
    id: "tp.tateru-tatsu",
    transitive: { ja: "立[た]てる", en: "to stand (something) up" },
    intransitive: { ja: "立[た]つ", en: "to stand up, rise (by oneself)" },
    note: "立てる also extends to abstract uses like 計画を立てる 'to make a plan'; the physical standing-up sense is the core N4 pairing.",
  },
  {
    id: "tp.kakeru-kakaru",
    transitive: { ja: "掛[か]ける", en: "to hang (something)" },
    intransitive: { ja: "掛[か]かる", en: "to hang, be hanging (by itself)" },
    note: "掛ける/掛かる also cover locking (鍵をかける/かかる) and cost (お金がかかる); the hanging sense is the core N4 pairing.",
  },
];

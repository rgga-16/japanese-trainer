// Batch 2 exercises for the N5 particle points (ex8–ex11).
// Sidecar to grammar/n5/batch1-particles.ts — see CONTENT_GUIDE.md "Sidecar files".

import type { Exercise } from "../../types";

export const exercises: Exercise[] = [
  // ---- n5.no ------------------------------------------------------------
  {
    id: "n5.no.ex8",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "mcq",
    question: "この時計[とけい]は先生[せんせい]＿＿です。",
    choices: ["の", "は", "が", "を"],
    correctIndex: 0,
    explanation:
      "の stands in for the omitted noun: 先生の(時計)です — \"it's the teacher's.\" は・が mark a noun's role in the sentence and can't link it to a following noun; を marks a direct object, which doesn't fit here.",
  },
  {
    id: "n5.no.ex9",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "ordering",
    segments: ["これは", "図書館[としょかん]の", "本[ほん]", "です。"],
    starIndex: 1,
    translationEn: "This is a library book.",
  },
  {
    id: "n5.no.ex10",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "transformation",
    sourceJa: "この傘[かさ]は田中[たなか]さんの傘[かさ]です。",
    instruction:
      "Rewrite dropping the repeated noun so の stands alone for it (like English \"his/hers\").",
    accepted: [
      "この傘[かさ]は田中[たなか]さんのです。",
      "この傘[かさ]は田中[たなか]さんのだ。",
    ],
    translationEn: "This umbrella is Mr. Tanaka's.",
  },
  {
    id: "n5.no.ex11",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "cloze",
    sentence: "あの黒[くろ]いかばんは山田[やまだ]さん＿＿です。",
    accepted: ["の"],
    translationEn: "That black bag is Mr. Yamada's.",
  },

  // ---- n5.mo ------------------------------------------------------------
  {
    id: "n5.mo.ex8",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "mcq",
    question:
      "先週[せんしゅう]は京都[きょうと]へ行[い]きました。今週[こんしゅう]は大阪[おおさか]＿＿行[い]きます。",
    choices: ["もへ", "へも", "がも", "をも"],
    correctIndex: 1,
    explanation:
      "も stacks AFTER へ rather than replacing it: 大阪へも行きます. もへ reverses the correct order and is ungrammatical; が/を don't combine with へ this way.",
  },
  {
    id: "n5.mo.ex9",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "ordering",
    segments: ["兄[あに]は", "フランス語[ご]も", "英語[えいご]も", "話[はな]せます。"],
    starIndex: 1,
    translationEn: "My older brother can speak both French and English.",
  },
  {
    id: "n5.mo.ex10",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "transformation",
    sourceJa: "冷蔵庫[れいぞうこ]に何[なに]かあります。",
    instruction:
      "Rewrite as a negative sentence saying there is nothing in the fridge, using 何[なに]も〜ません.",
    targetLabel: "何も〜ません",
    accepted: ["冷蔵庫[れいぞうこ]に何[なに]もありません。"],
    translationEn: "There is nothing in the refrigerator.",
  },
  {
    id: "n5.mo.ex11",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "transformation",
    sourceJa: "今日[きょう]はどこかへ行[い]きました。",
    instruction:
      "Rewrite as a negative sentence saying you didn't go anywhere, using どこも〜ませんでした.",
    targetLabel: "どこも〜ませんでした",
    accepted: [
      "今日[きょう]はどこへも行[い]きませんでした。",
      "今日[きょう]はどこも行[い]きませんでした。",
    ],
    translationEn: "I didn't go anywhere today.",
  },

  // ---- n5.to-ya ---------------------------------------------------------
  {
    id: "n5.to-ya.ex8",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "mcq",
    question:
      "テーブルの上[うえ]にコップ＿＿お皿[さら]があります。全部[ぜんぶ]でそれだけです。",
    choices: ["や", "も", "と", "か"],
    correctIndex: 2,
    explanation:
      "それだけです signals a complete, closed list, so exhaustive と is correct. や would suggest more items exist, and も・か don't join two nouns into a list here.",
  },
  {
    id: "n5.to-ya.ex9",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "ordering",
    segments: ["机[つくえ]の上[うえ]に", "教科書[きょうかしょ]や", "ノートなどが", "あります。"],
    starIndex: 1,
    translationEn: "There are things like textbooks and notebooks on the desk.",
  },
  {
    id: "n5.to-ya.ex10",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "transformation",
    sourceJa: "教室[きょうしつ]に机[つくえ]といすがあります。それだけです。",
    instruction:
      "Rewrite as an open-ended list using や(…など), implying there may be more items than stated.",
    targetLabel: "や〜など",
    accepted: ["教室[きょうしつ]に机[つくえ]やいすなどがあります。"],
    translationEn: "There are things like a desk and chairs in the classroom (among other things).",
  },
  {
    id: "n5.to-ya.ex11",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "transformation",
    sourceJa: "冷蔵庫[れいぞうこ]に卵[たまご]やチーズなどがあります。",
    instruction:
      "Rewrite as a complete, exhaustive list using と, implying there is nothing else.",
    targetLabel: "と (exhaustive)",
    accepted: ["冷蔵庫[れいぞうこ]に卵[たまご]とチーズがあります。"],
    translationEn: "There are eggs and cheese in the refrigerator (and nothing else).",
  },

  // ---- n5.kara-made -------------------------------------------------------
  {
    id: "n5.kara-made.ex8",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "mcq",
    question: "図書館[としょかん]は月曜日[げつようび]＿＿土曜日[どようび]まで開[あ]いています。",
    choices: ["に", "で", "を", "から"],
    correctIndex: 3,
    explanation:
      "The まで later in the sentence needs a matching starting point: 月曜日から〜まで \"from Monday to Saturday.\" に・で・を don't mark the start of a from–to span.",
  },
  {
    id: "n5.kara-made.ex9",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "ordering",
    segments: ["この電車[でんしゃ]は", "大阪[おおさか]から", "東京[とうきょう]まで", "走[はし]ります。"],
    starIndex: 1,
    translationEn: "This train runs from Osaka to Tokyo.",
  },
  {
    id: "n5.kara-made.ex10",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "transformation",
    sourceJa: "この店[みせ]は十時[じゅうじ]に開[あ]いて、六時[ろくじ]に閉[し]まります。",
    instruction: "Rewrite as a single sentence describing the shop's hours using 〜から〜まで.",
    accepted: [
      "この店[みせ]は十時[じゅうじ]から六時[ろくじ]までです。",
      "この店[みせ]は十時[じゅうじ]から六時[ろくじ]まで開[あ]いています。",
    ],
    translationEn: "This shop is open from 10 to 6.",
  },
  {
    id: "n5.kara-made.ex11",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "transformation",
    sourceJa: "冬休[ふゆやす]みは十二月[じゅうにがつ]に始[はじ]まって、一月[いちがつ]に終[お]わります。",
    instruction: "Rewrite as a single sentence using 〜から〜まで to describe the span.",
    accepted: ["冬休[ふゆやす]みは十二月[じゅうにがつ]から一月[いちがつ]までです。"],
    translationEn: "Winter break runs from December to January.",
  },

  // ---- n5.dake-shika ------------------------------------------------------
  {
    id: "n5.dake-shika.ex8",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "mcq",
    question: "この教室[きょうしつ]にはいすが三[みっ]つ＿＿ありません。",
    choices: ["しか", "だけ", "も", "の"],
    correctIndex: 0,
    explanation:
      "The negative predicate ありません calls for しか (\"only — and that's disappointingly few\"). だけ needs an affirmative verb (三つだけあります); も・の don't fit this slot.",
  },
  {
    id: "n5.dake-shika.ex9",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "ordering",
    segments: ["冷蔵庫[れいぞうこ]には", "牛乳[ぎゅうにゅう]が", "少[すこ]ししか", "ありません。"],
    starIndex: 2,
    translationEn: "There is only a little milk in the refrigerator.",
  },
  {
    id: "n5.dake-shika.ex10",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "transformation",
    sourceJa: "冷蔵庫[れいぞうこ]にジュースが一本[いっぽん]だけあります。",
    instruction: "Rewrite using しか〜ない to express the same limited amount.",
    targetLabel: "しか〜ない",
    accepted: ["冷蔵庫[れいぞうこ]にジュースが一本[いっぽん]しかありません。"],
    translationEn: "There is only one bottle of juice in the refrigerator.",
  },
  {
    id: "n5.dake-shika.ex11",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "transformation",
    sourceJa: "この本屋[ほんや]には辞書[じしょ]が二冊[にさつ]しかありません。",
    instruction: "Rewrite using だけ to express the same idea with a neutral, affirmative tone.",
    targetLabel: "だけ",
    accepted: ["この本屋[ほんや]には辞書[じしょ]が二冊[にさつ]だけあります。"],
    translationEn: "This bookstore has just two dictionaries.",
  },

  // ---- n5.yori-hou-ga ------------------------------------------------------
  {
    id: "n5.yori-hou-ga.ex8",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "mcq",
    question:
      "「英語[えいご]と中国語[ちゅうごくご]と、どちらが難[むずか]しいですか。」「中国語[ちゅうごくご]＿＿難[むずか]しいです。」",
    choices: ["がいちばん", "のほうが", "より", "だけ"],
    correctIndex: 1,
    explanation:
      "A two-item どちら question is answered with のほうが. がいちばん needs a group of three or more; より alone (without のほうが) needs to attach to the noun being compared against, not stand alone as the predicate; だけ doesn't express comparison.",
  },
  {
    id: "n5.yori-hou-ga.ex9",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "ordering",
    lead: "果物[くだもの]の中[なか]で",
    segments: ["いちごが", "いちばん", "好[す]きです。"],
    starIndex: 1,
    translationEn: "Of all the fruits, I like strawberries the best.",
  },
  {
    id: "n5.yori-hou-ga.ex10",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "transformation",
    sourceJa: "今日[きょう]は昨日[きのう]より寒[さむ]いです。",
    instruction: "Rewrite adding のほうが to highlight the colder day.",
    targetLabel: "〜のほうが〜",
    accepted: ["今日[きょう]のほうが昨日[きのう]より寒[さむ]いです。"],
    translationEn: "Today is colder than yesterday.",
  },
  {
    id: "n5.yori-hou-ga.ex11",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "transformation",
    sourceJa: "地下鉄[ちかてつ]よりタクシーのほうが早[はや]く着[つ]きます。",
    instruction: "Rewrite as a simple AはBより〜 comparison, dropping のほうが.",
    accepted: ["タクシーは地下鉄[ちかてつ]より早[はや]く着[つ]きます。"],
    translationEn: "A taxi arrives faster than the subway.",
  },
];

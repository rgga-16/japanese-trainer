// Batch 2 exercises for the N4 sentence-pattern points (ex8–ex11).
// Sidecar to grammar/n4/batch1-patterns.ts — see CONTENT_GUIDE.md "Sidecar files".

import type { Exercise } from "../../types";

export const exercises: Exercise[] = [
  // -------------------------------------------------------------------
  // n4.hazu
  // -------------------------------------------------------------------
  {
    id: "n4.hazu.ex8",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "mcq",
    question: "彼女[かのじょ]は先週[せんしゅう]京都[きょうと]に行[い]ったから、お土産[みやげ]を＿＿。",
    choices: [
      "持[も]っているはずです",
      "持[も]つはずがありません",
      "持[も]つつもりです",
      "持[も]っているらしいです",
    ],
    correctIndex: 0,
    explanation:
      "Having gone to Kyoto last week makes it reasonable to expect she has a souvenir: 持っているはずです. はずがない would deny that expectation, つもり states someone's own intention, and らしい reports secondhand information rather than the speaker's own reasoning.",
  },
  {
    id: "n4.hazu.ex9",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "ordering",
    segments: ["彼[かれ]は", "毎日[まいにち]練習[れんしゅう]しているから", "試合[しあい]に", "勝[か]つはずです。"],
    starIndex: 1,
    translationEn: "He practices every day, so he should win the match.",
  },
  {
    id: "n4.hazu.ex10",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "transformation",
    sourceJa: "この電車[でんしゃ]は次[つぎ]の駅[えき]に五分後[ごふんご]に着[つ]きます。",
    instruction: "Rewrite as a confident expectation using 〜はずです。",
    targetLabel: "〜はずです",
    accepted: ["この電車[でんしゃ]は次[つぎ]の駅[えき]に五分後[ごふんご]に着[つ]くはずです。"],
    translationEn: "This train should arrive at the next station in five minutes.",
  },
  {
    id: "n4.hazu.ex11",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "cloze",
    sentence: "彼[かれ]はフランス語[ご]を十年[じゅうねん]勉強[べんきょう]しましたから、上手[じょうず]な＿＿です。",
    accepted: ["はず"],
    translationEn: "He studied French for ten years, so he should be good at it.",
  },

  // -------------------------------------------------------------------
  // n4.kamoshirenai
  // -------------------------------------------------------------------
  {
    id: "n4.kamoshirenai.ex8",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "mcq",
    question: "田中[たなか]さんはお酒[さけ]を飲[の]んでいるから、今日[きょう]は車[くるま]を＿＿。",
    choices: [
      "運転[うんてん]するでしょう",
      "運転[うんてん]しないかもしれません",
      "運転[うんてん]しなさい",
      "運転[うんてん]するところです",
    ],
    correctIndex: 1,
    explanation:
      "Having been drinking makes it a cautious guess that he won't drive: 運転しないかもしれません. でしょう leans the wrong way (toward yes), しなさい is a command, and するところです describes an action about to start — none fit a mere possibility.",
  },
  {
    id: "n4.kamoshirenai.ex9",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "ordering",
    segments: ["今夜[こんや]は", "星[ほし]が", "きれいに見[み]えるかもしれません。"],
    starIndex: 1,
    translationEn: "Tonight the stars might look beautiful.",
  },
  {
    id: "n4.kamoshirenai.ex10",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "transformation",
    sourceJa: "明日[あした]の会議[かいぎ]は中止[ちゅうし]になるだろう。",
    instruction: "Rewrite replacing だろう with the more uncertain かもしれません.",
    targetLabel: "〜かもしれません",
    accepted: ["明日[あした]の会議[かいぎ]は中止[ちゅうし]になるかもしれません。"],
    translationEn: "Tomorrow's meeting might be cancelled.",
  },
  {
    id: "n4.kamoshirenai.ex11",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "cloze",
    sentence: "この漢字[かんじ]の読[よ]み方[かた]は、たぶん間違[まちが]い＿＿。",
    accepted: ["かもしれません", "かもしれない", "かも"],
    translationEn: "This kanji's reading might be a mistake.",
  },

  // -------------------------------------------------------------------
  // n4.node
  // -------------------------------------------------------------------
  {
    id: "n4.node.ex8",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "mcq",
    question: "疲[つか]れました＿＿、少[すこ]し休[やす]ませてください。",
    choices: ["ので", "のに", "ても", "し"],
    correctIndex: 0,
    explanation:
      "疲れましたので states the reason behind the request. のに would flag it as contrary to expectation, ても means \"even if,\" and し just lists reasons rather than leading into a request.",
  },
  {
    id: "n4.node.ex9",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "ordering",
    segments: ["電車[でんしゃ]が", "止[と]まったので", "会社[かいしゃ]に", "遅刻[ちこく]しました。"],
    starIndex: 1,
    translationEn: "The train stopped, so I was late for work.",
  },
  {
    id: "n4.node.ex10",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "transformation",
    sourceJa: "熱[ねつ]があります。今日[きょう]は仕事[しごと]を休[やす]みます。",
    instruction: "Combine the two sentences into one, using ので to state the reason.",
    targetLabel: "〜ので",
    accepted: [
      "熱[ねつ]があるので、今日[きょう]は仕事[しごと]を休[やす]みます。",
      "熱[ねつ]がありますので、今日[きょう]は仕事[しごと]を休[やす]みます。",
    ],
    translationEn: "I have a fever, so I'll take today off work.",
  },
  {
    id: "n4.node.ex11",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "transformation",
    sourceJa: "この部屋[へや]は静[しず]かです。よく眠[ねむ]れます。",
    instruction: "Combine the two sentences into one, using ので to state the reason.",
    targetLabel: "〜なので",
    accepted: [
      "この部屋[へや]は静[しず]かなので、よく眠[ねむ]れます。",
      "この部屋[へや]は静[しず]かなので、よく眠[ねむ]れる。",
    ],
    translationEn: "This room is quiet, so I can sleep well.",
  },

  // -------------------------------------------------------------------
  // n4.noni
  // -------------------------------------------------------------------
  {
    id: "n4.noni.ex8",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "mcq",
    question: "この漢字[かんじ]は簡単[かんたん]な＿＿、いつも間違[まちが]えます。",
    choices: ["ので", "のに", "から", "ても"],
    correctIndex: 1,
    explanation:
      "The kanji is simple, yet the speaker keeps getting it wrong — that mismatch is のに. ので/から would wrongly make the simplicity the CAUSE of the mistake, and ても needs a different clause shape.",
  },
  {
    id: "n4.noni.ex9",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "ordering",
    segments: ["彼[かれ]は", "お金[かね]がないのに", "高[たか]い車[くるま]を", "買[か]いました。"],
    starIndex: 1,
    translationEn: "Even though he doesn't have money, he bought an expensive car.",
  },
  {
    id: "n4.noni.ex10",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "transformation",
    sourceJa: "早[はや]く出[で]かけました。バスに乗[の]り遅[おく]れました。",
    instruction: "Combine the two sentences into one, using のに to show the unexpected outcome.",
    targetLabel: "〜のに",
    accepted: ["早[はや]く出[で]かけたのに、バスに乗[の]り遅[おく]れました。"],
    translationEn: "Even though I left early, I missed the bus.",
  },
  {
    id: "n4.noni.ex11",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "transformation",
    sourceJa: "彼[かれ]は元気[げんき]です。今日[きょう]は学校[がっこう]を休[やす]みました。",
    instruction: "Combine the two sentences into one, using のに to show contrast/surprise.",
    targetLabel: "〜なのに",
    accepted: [
      "彼[かれ]は元気[げんき]なのに、今日[きょう]は学校[がっこう]を休[やす]みました。",
      "彼[かれ]は元気[げんき]なのに、今日[きょう]は学校[がっこう]を休[やす]んだ。",
    ],
    translationEn: "Even though he's healthy, he was absent from school today.",
  },

  // -------------------------------------------------------------------
  // n4.tame-ni
  // -------------------------------------------------------------------
  {
    id: "n4.tame-ni.ex8",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "mcq",
    question: "試験[しけん]に＿＿ために、毎日[まいにち]遅[おそ]くまで勉強[べんきょう]しています。",
    choices: ["合格[ごうかく]して", "合格[ごうかく]し", "合格[ごうかく]する", "合格[ごうかく]した"],
    correctIndex: 2,
    explanation:
      "Purpose ために takes the dictionary form of a volitional verb: 合格するために. The て-form, stem, and た-form can't attach to ため this way.",
  },
  {
    id: "n4.tame-ni.ex9",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "ordering",
    segments: ["彼女[かのじょ]は", "医者[いしゃ]になるために", "一生懸命[いっしょうけんめい]", "勉強[べんきょう]しています。"],
    starIndex: 1,
    translationEn: "She's studying hard in order to become a doctor.",
  },
  {
    id: "n4.tame-ni.ex10",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "transformation",
    sourceJa: "資格[しかく]を取[と]ります。毎晩[まいばん]勉強[べんきょう]しています。",
    instruction: "Combine the two sentences into one, turning the first into the purpose with 〜ために。",
    targetLabel: "〜ために",
    accepted: ["資格[しかく]を取[と]るために、毎晩[まいばん]勉強[べんきょう]しています。"],
    translationEn: "I study every night in order to get a certification.",
  },
  {
    id: "n4.tame-ni.ex11",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "transformation",
    sourceJa: "子供[こども]の教育[きょういく]です。両親[りょうしん]はお金[かね]を貯[た]めています。",
    instruction: "Combine the two sentences into one, turning the first into the purpose with 〜のために。",
    targetLabel: "〜のために",
    accepted: ["子供[こども]の教育[きょういく]のために、両親[りょうしん]はお金[かね]を貯[た]めています。"],
    translationEn: "The parents are saving money for their children's education.",
  },

  // -------------------------------------------------------------------
  // n4.you-ni
  // -------------------------------------------------------------------
  {
    id: "n4.you-ni.ex8",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "mcq",
    question: "忘[わす]れ物[もの]をしない＿＿、かばんの中[なか]を確認[かくにん]しています。",
    choices: ["ために", "はずに", "ことに", "ように"],
    correctIndex: 3,
    explanation:
      "Negative purpose (\"so as not to forget things\") takes ように: 忘れ物をしないように. ために resists negative verbs, and はずに／ことに aren't purpose connectors at all.",
  },
  {
    id: "n4.you-ni.ex9",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "ordering",
    segments: ["試験[しけん]に", "受[う]かるように", "毎日[まいにち]", "勉強[べんきょう]しています。"],
    starIndex: 1,
    translationEn: "I study every day so that I'll pass the exam.",
  },
  {
    id: "n4.you-ni.ex10",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "transformation",
    sourceJa: "日本語[にほんご]で手紙[てがみ]を書[か]くために、練習[れんしゅう]しています。",
    instruction: "Rewrite the purpose clause using the potential form + ように instead of ために。",
    targetLabel: "可能形+ように",
    accepted: [
      "日本語[にほんご]で手紙[てがみ]が書[か]けるように、練習[れんしゅう]しています。",
      "日本語[にほんご]で手紙[てがみ]が書[か]けるように、練習[れんしゅう]します。",
    ],
    translationEn: "I'm practicing so that I'll be able to write letters in Japanese.",
  },
  {
    id: "n4.you-ni.ex11",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "transformation",
    sourceJa: "会議[かいぎ]に遅[おく]れないでください。",
    instruction: "Rewrite as a softened, ongoing instruction using 〜ようにしてください instead of 〜ないでください。",
    targetLabel: "〜ようにしてください",
    accepted: ["会議[かいぎ]に遅[おく]れないようにしてください。"],
    translationEn: "Please try not to be late for the meeting.",
  },

  // -------------------------------------------------------------------
  // n4.to-nara
  // -------------------------------------------------------------------
  {
    id: "n4.to-nara.ex8",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "mcq",
    question: "「今度[こんど]沖縄[おきなわ]へ行[い]きたいんですが。」「沖縄[おきなわ]＿＿、六月[ろくがつ]がいいですよ。」",
    choices: ["と", "たら", "ば", "なら"],
    correctIndex: 3,
    explanation:
      "The reply picks up 沖縄 as a topic and offers advice — that's なら. と/たら/ば all need a verb-based conditional clause, not a bare noun topic.",
  },
  {
    id: "n4.to-nara.ex9",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "ordering",
    segments: ["ボタンを", "押[お]すと", "切符[きっぷ]が", "出[で]てきます。"],
    starIndex: 1,
    translationEn: "When you press the button, a ticket comes out.",
  },
  {
    id: "n4.to-nara.ex10",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "transformation",
    sourceJa: "このスイッチを入[い]れます。電気[でんき]がつきます。",
    instruction: "Combine into one sentence expressing an automatic result, using 〜と。",
    targetLabel: "〜と",
    accepted: ["このスイッチを入[い]れると、電気[でんき]がつきます。"],
    translationEn: "When you turn on this switch, the light comes on.",
  },
  {
    id: "n4.to-nara.ex11",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "transformation",
    sourceJa: "中古[ちゅうこ]の車[くるま]を買[か]いたいんですが、どこがいいですか。",
    instruction: "Reply using 〜なら, recommending 「あの店」(that shop) as a comment on the topic.",
    targetLabel: "〜なら",
    accepted: [
      "中古[ちゅうこ]の車[くるま]なら、あの店[みせ]がいいですよ。",
      "中古[ちゅうこ]の車[くるま]なら、あの店[みせ]がいいです。",
    ],
    translationEn: "If it's a used car (you want), that shop is good.",
  },

  // -------------------------------------------------------------------
  // n4.rashii
  // -------------------------------------------------------------------
  {
    id: "n4.rashii.ex8",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "mcq",
    question: "友達[ともだち]の話[はなし]では、あのレストランは来月[らいげつ]閉店[へいてん]する＿＿。",
    choices: ["でしょう", "つもりです", "らしいです", "ようにします"],
    correctIndex: 2,
    explanation:
      "友達の話では marks this as something heard from someone else — the textbook cue for らしい. でしょう is the speaker's own guess, つもり is intention, and ようにします is an effort/habit expression.",
  },
  {
    id: "n4.rashii.ex9",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "ordering",
    segments: ["ニュースによると", "来週[らいしゅう]から", "電車[でんしゃ]の運賃[うんちん]が", "上[あ]がるらしいです。"],
    starIndex: 1,
    translationEn: "According to the news, apparently train fares will go up from next week.",
  },
  {
    id: "n4.rashii.ex10",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "transformation",
    sourceJa: "隣[となり]の田中[たなか]さんの息子[むすこ]さんは、有名[ゆうめい]な大学[だいがく]に合格[ごうかく]しました。",
    instruction: "Rewrite as something you heard secondhand, using 〜らしいです。",
    targetLabel: "〜らしいです",
    accepted: [
      "隣[となり]の田中[たなか]さんの息子[むすこ]さんは、有名[ゆうめい]な大学[だいがく]に合格[ごうかく]したらしいです。",
    ],
    translationEn: "I hear the Tanakas' son next door got into a famous university.",
  },
  {
    id: "n4.rashii.ex11",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "cloze",
    sentence: "今日[きょう]は一日中[いちにちじゅう]曇[くも]っていて、いかにも冬[ふゆ]＿＿寒[さむ]さです。",
    accepted: ["らしい"],
    translationEn: "It's been cloudy all day — the cold really feels like winter.",
  },
];

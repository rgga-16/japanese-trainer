// Mock test passages (問題3 文章の文法). Four short N4-level passages, each
// with 5 numbered gaps (［1］…［5］) and a matching McqExercise per gap.
// Furigana notation throughout (see src/engine/furigana.ts).

import type { MockPassage } from "../types";

export const allPassages: MockPassage[] = [
  {
    id: "passage.diary",
    title: "桜[さくら]の日[ひ]の日記[にっき]",
    paragraphsJa: [
      "今日[きょう]は日曜日[にちようび]です。公園[こうえん]で桜[さくら]を見[み]ていたら、とても＿＿［1］、写真[しゃしん]を撮[と]りました。少[すこ]し歩[ある]いて＿＿［2］、喫茶店[きっさてん]で休[やす]みました。",
      "家[いえ]に帰[かえ]ってから、晩[ばん]ごはんを作[つく]りました。毎日[まいにち]練習[れんしゅう]して、料理[りょうり]が＿＿［3］ようになりました。今度[こんど]の週末[しゅうまつ]、友達[ともだち]と一緒[いっしょ]に＿＿［4］と思[おも]います。",
      "本当[ほんとう]は甘[あま]い物[もの]が＿＿［5］ですが、我慢[がまん]しています。",
    ],
    gaps: [
      {
        id: "passage.diary.g1",
        grammarPointId: "n5.na-adjectives",
        source: "bank",
        kind: "mcq",
        question: "公園[こうえん]で桜[さくら]を見[み]ていたら、とても＿＿、写真[しゃしん]を撮[と]りました。",
        choices: ["きれいで", "きれいだ", "きれいな", "きれいに"],
        correctIndex: 0,
        explanation:
          "な-adjectives use their て-form (stem+で) to connect to the next clause, like きれいで — きれいな would need a following noun, and きれいだ can't link two clauses this way.",
      },
      {
        id: "passage.diary.g2",
        grammarPointId: "n5.te-form",
        source: "bank",
        kind: "mcq",
        question: "少[すこ]し歩[ある]いて＿＿、喫茶店[きっさてん]で休[やす]みました。",
        choices: ["疲[つか]れながら", "疲[つか]れて", "疲[つか]れる", "疲[つか]れた"],
        correctIndex: 1,
        explanation:
          "The て-form links the reason (got tired) to the next clause (rested) — 疲れる/疲れた can't connect clauses this way, and ながら needs two simultaneous actions, not a reason-result chain.",
      },
      {
        id: "passage.diary.g3",
        grammarPointId: "n4.you-ni-naru",
        source: "bank",
        kind: "mcq",
        question: "毎日[まいにち]練習[れんしゅう]して、料理[りょうり]が＿＿ようになりました。",
        choices: ["できて", "できた", "できる", "する"],
        correctIndex: 2,
        explanation:
          "〜ようになる attaches to the plain dictionary/potential form to show a new ability gained over time, so できる is correct — する drops that nuance, and て/た forms don't attach to ようになる.",
      },
      {
        id: "passage.diary.g4",
        grammarPointId: "n4.volitional",
        source: "bank",
        kind: "mcq",
        question: "今度[こんど]の週末[しゅうまつ]、友達[ともだち]と一緒[いっしょ]に＿＿と思[おも]います。",
        choices: ["食[た]べる", "食[た]べて", "食[た]べた", "食[た]べよう"],
        correctIndex: 3,
        explanation:
          "〜(よ)うと思います requires the volitional form immediately before と思います to state a fresh intention.",
      },
      {
        id: "passage.diary.g5",
        grammarPointId: "n5.tai-form",
        source: "bank",
        kind: "mcq",
        question: "本当[ほんとう]は甘[あま]い物[もの]が＿＿ですが、我慢[がまん]しています。",
        choices: ["食[た]べたい", "食[た]べる", "食[た]べます", "食[た]べて"],
        correctIndex: 0,
        explanation:
          "たい attaches to the ます-stem to express the speaker's own desire, and its object often takes が, as in 甘い物が食べたい.",
      },
    ],
  },
  {
    id: "passage.letter",
    title: "友達[ともだち]へのメール",
    paragraphsJa: [
      "けんさん、お元気[げんき]ですか。来月[らいげつ]、日本[にほん]に行[い]くことになりました。日本語[にほんご]の勉強[べんきょう]を始[はじ]めてから一年[いちねん]、簡単[かんたん]な会話[かいわ]なら少[すこ]し＿＿［1］。",
      "もし時間[じかん]が＿＿［2］、一緒[いっしょ]に京都[きょうと]へ旅行[りょこう]しませんか。今週[こんしゅう]は天気[てんき]が＿＿［3］そうです。",
      "出発[しゅっぱつ]の前[まえ]に、飛行機[ひこうき]のチケットを＿＿［4］。先週[せんしゅう]はまだ予定[よてい]が＿＿［5］が、今[いま]はもう決[き]まりました。それでは、お返事[へんじ]を待[ま]っています。",
    ],
    gaps: [
      {
        id: "passage.letter.g1",
        grammarPointId: "n4.potential",
        source: "bank",
        kind: "mcq",
        question: "簡単[かんたん]な会話[かいわ]なら少[すこ]し＿＿。",
        choices: ["話[はな]されます", "話[はな]せます", "話[はな]します", "話[はな]させます"],
        correctIndex: 1,
        explanation:
          "話せます is the potential form ('can speak'); します is plain non-potential, させます is causative ('make [someone] speak'), and されます is passive ('is spoken') — none fit 'a bit of conversation.'",
      },
      {
        id: "passage.letter.g2",
        grammarPointId: "n4.ba-tara",
        source: "bank",
        kind: "mcq",
        question: "もし時間[じかん]が＿＿、一緒[いっしょ]に京都[きょうと]へ旅行[りょこう]しませんか。",
        choices: ["あって", "あるなら", "あったら", "あれば"],
        correctIndex: 2,
        explanation:
          "When the main clause is a one-time invitation, たら (あったら) is the natural choice — ば can sound odd here, and あって/あるなら don't fit the conditional slot.",
      },
      {
        id: "passage.letter.g3",
        grammarPointId: "n4.sou-da",
        source: "bank",
        kind: "mcq",
        question: "今週[こんしゅう]は天気[てんき]が＿＿そうです。",
        choices: ["いい", "よく", "よければ", "よさ"],
        correctIndex: 3,
        explanation:
          "いい is the one irregular い-adjective for appearance-そう: it becomes よさそう, never ×いいそう — よく (adverbial) and よければ (conditional) don't attach to そう either.",
      },
      {
        id: "passage.letter.g4",
        grammarPointId: "n4.nakereba-naranai",
        source: "bank",
        kind: "mcq",
        question: "出発[しゅっぱつ]の前[まえ]に、飛行機[ひこうき]のチケットを＿＿。",
        choices: [
          "予約[よやく]しなければなりません",
          "予約[よやく]しなくてもいいです",
          "予約[よやく]してはいけません",
          "予約[よやく]しました",
        ],
        correctIndex: 0,
        explanation:
          "Booking the ticket before departure is a necessary obligation, so 〜なければなりません (must do) fits — not 'don't have to,' 'must not,' or a simple past statement.",
      },
      {
        id: "passage.letter.g5",
        grammarPointId: "n5.masu-form",
        source: "bank",
        kind: "mcq",
        question: "先週[せんしゅう]はまだ予定[よてい]が＿＿が、今[いま]はもう決[き]まりました。",
        choices: [
          "決[き]まりませんでしたか",
          "決[き]まりませんでした",
          "決[き]まりません",
          "決[き]まりました",
        ],
        correctIndex: 1,
        explanation:
          "先週 (last week) marks a completed past time, contrasted with 今 (now), so the past-negative 決まりませんでした ('wasn't decided') is needed.",
      },
    ],
  },
  {
    id: "passage.essay",
    title: "健康[けんこう]の習慣[しゅうかん]",
    paragraphsJa: [
      "私[わたし]＿＿［1］毎朝[まいあさ]、近[ちか]くの公園[こうえん]を走[はし]っています。走[はし]り始[はじ]める前[まえ]は、朝[あさ]早[はや]く起[お]きるのが＿＿［2］。",
      "最初[さいしょ]は一人[ひとり]で大変[たいへん]でしたが、友達[ともだち]が一緒[いっしょ]に走[はし]って＿＿［3］ので、続[つづ]けられました。今[いま]は公園[こうえん]で音楽[おんがく]を聞[き]きながら走[はし]っても＿＿［4］と思[おも]っています。誰[だれ]にも迷惑[めいわく]をかけないからです。",
      "公園[こうえん]には他[ほか]にも走[はし]っている人[ひと]が＿＿［5］。みんなで挨拶[あいさつ]をして、とても楽[たの]しいです。",
    ],
    gaps: [
      {
        id: "passage.essay.g1",
        grammarPointId: "n5.wa-ga",
        source: "bank",
        kind: "mcq",
        question: "私[わたし]＿＿毎朝[まいあさ]、近[ちか]くの公園[こうえん]を走[はし]っています。",
        choices: ["を", "に", "は", "が"],
        correctIndex: 2,
        explanation:
          "私 is the topic being introduced ('as for me'), so は is correct — が would instead single out 私 as new/focused information among alternatives.",
      },
      {
        id: "passage.essay.g2",
        grammarPointId: "n5.i-adjectives",
        source: "bank",
        kind: "mcq",
        question: "走[はし]り始[はじ]める前[まえ]は、朝[あさ]早[はや]く起[お]きるのが＿＿。",
        choices: [
          "難[むずか]しいでした",
          "難[むずか]しくないです",
          "難[むずか]しいです",
          "難[むずか]しかったです",
        ],
        correctIndex: 3,
        explanation:
          "前は (in the past, before) sets a past-time frame, so the past polite 難しかったです is needed — い-adjectives never combine directly with でした.",
      },
      {
        id: "passage.essay.g3",
        grammarPointId: "n4.age-kure-morau",
        source: "bank",
        kind: "mcq",
        question: "友達[ともだち]が一緒[いっしょ]に走[はし]って＿＿ので、続[つづ]けられました。",
        choices: ["くれた", "あげた", "もらった", "くれられた"],
        correctIndex: 0,
        explanation:
          "The friend did the favor of running along *for the speaker*, so the inward-direction くれた is correct — あげた points the wrong way, もらった would need 友達に, and くれられた isn't a valid form.",
      },
      {
        id: "passage.essay.g4",
        grammarPointId: "n4.temo-ii",
        source: "bank",
        kind: "mcq",
        question: "今[いま]は公園[こうえん]で音楽[おんがく]を聞[き]きながら走[はし]っても＿＿と思[おも]っています。",
        choices: ["いけません", "いい", "いけない", "だめ"],
        correctIndex: 1,
        explanation:
          "〜てもいい grants permission ('it's fine to'); since running while listening doesn't bother anyone, いい fits, not the prohibition choices.",
      },
      {
        id: "passage.essay.g5",
        grammarPointId: "n5.aru-iru",
        source: "bank",
        kind: "mcq",
        question: "公園[こうえん]には他[ほか]にも走[はし]っている人[ひと]が＿＿。",
        choices: ["いません", "ありません", "います", "あります"],
        correctIndex: 2,
        explanation:
          "People (animate) existing somewhere take いる, so います is correct — あります is for inanimate things, and the negatives don't fit since other runners ARE there.",
      },
    ],
  },
  {
    id: "passage.work",
    title: "会議[かいぎ]についてのメール",
    paragraphsJa: [
      "山田[やまだ]さん、いつもお世話[せわ]になっております。来週[らいしゅう]の会議[かいぎ]は火曜日[かようび]の午後[ごご]三時[さんじ]＿＿［1］、会議室[かいぎしつ]で行[おこな]われます。",
      "部長[ぶちょう]は今回[こんかい]、新[あたら]しいメンバー全員[ぜんいん]に資料[しりょう]を＿＿［2］予定[よてい]です。会議[かいぎ]の内容[ないよう]は後[あと]でメールで＿＿［3］ので、ご安心[あんしん]ください。",
      "もし都合[つごう]が悪[わる]ければ、他[ほか]の日[ひ]に変更[へんこう]しても＿＿［4］です。何[なに]か質問[しつもん]＿＿［5］あれば、いつでもご連絡[れんらく]ください。よろしくお願[ねが]いいたします。",
    ],
    gaps: [
      {
        id: "passage.work.g1",
        grammarPointId: "n5.o-ni-de",
        source: "bank",
        kind: "mcq",
        question: "来週[らいしゅう]の会議[かいぎ]は火曜日[かようび]の午後[ごご]三時[さんじ]＿＿、会議室[かいぎしつ]で行[おこな]われます。",
        choices: ["で", "を", "へ", "に"],
        correctIndex: 3,
        explanation:
          "に marks the specific point in time (a clock time) — で would instead mark a location, which doesn't fit a time expression.",
      },
      {
        id: "passage.work.g2",
        grammarPointId: "n4.causative",
        source: "bank",
        kind: "mcq",
        question: "部長[ぶちょう]は今回[こんかい]、新[あたら]しいメンバー全員[ぜんいん]に資料[しりょう]を＿＿予定[よてい]です。",
        choices: ["準備[じゅんび]させる", "準備[じゅんび]される", "準備[じゅんび]できる", "準備[じゅんび]する"],
        correctIndex: 0,
        explanation:
          "The manager is having the new members do the preparing, so the causative 準備させる (make/have [them] prepare) fits — される is passive, できる is potential, and する alone drops the causing nuance.",
      },
      {
        id: "passage.work.g3",
        grammarPointId: "n4.passive",
        source: "bank",
        kind: "mcq",
        question: "会議[かいぎ]の内容[ないよう]は後[あと]でメールで＿＿ので、ご安心[あんしん]ください。",
        choices: ["送[おく]れます", "送[おく]られます", "送[おく]ります", "送[おく]らせます"],
        correctIndex: 1,
        explanation:
          "The content, as grammatical subject, undergoes the action of being sent, so the passive 送られます is correct, not the active, causative, or potential forms.",
      },
      {
        id: "passage.work.g4",
        grammarPointId: "n4.temo-ii",
        source: "bank",
        kind: "mcq",
        question: "もし都合[つごう]が悪[わる]ければ、他[ほか]の日[ひ]に変更[へんこう]しても＿＿です。",
        choices: ["だめ", "いけません", "いい", "いけない"],
        correctIndex: 2,
        explanation:
          "〜てもいい grants permission to change the date if it's inconvenient — the other choices would wrongly forbid changing it.",
      },
      {
        id: "passage.work.g5",
        grammarPointId: "n5.wa-ga",
        source: "bank",
        kind: "mcq",
        question: "何[なに]か質問[しつもん]＿＿あれば、いつでもご連絡[れんらく]ください。",
        choices: ["は", "を", "に", "が"],
        correctIndex: 3,
        explanation:
          "質問 as the grammatical subject of the existence verb あれば takes が, like other indefinite subjects (何か) — は would wrongly make it the topic.",
      },
    ],
  },
];

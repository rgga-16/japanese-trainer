// Additional mock passages (問題3 文章の文法). Sidecar to passages.ts — six more
// short N4-level passages, each with 5 numbered gaps (［1］…［5］) and a matching
// McqExercise per gap. Furigana notation throughout (see src/engine/furigana.ts).

import type { MockPassage } from "../types";

export const passages2: MockPassage[] = [
  {
    id: "passage.recipe",
    title: "卵焼[たまごや]きの作[つく]り方[かた]",
    paragraphsJa: [
      "今日[きょう]は簡単[かんたん]な卵焼[たまごや]きの作[つく]り方[かた]を紹介[しょうかい]します。まず、卵[たまご]を三[みっ]つボウルに割[わ]って、砂糖[さとう]と塩[しお]を入[い]れてよく＿＿［1］。卵[たまご]を流[なが]し入[い]れる前[まえ]に、フライパンを＿＿［2］。弱火[よわび]で焼[や]きながら端[はし]から丸[まる]めていくと、きれいな形[かたち]に＿＿［3］。",
      "焼[や]き上[あ]がったら、少[すこ]し冷[さ]まして食[た]べやすい大[おお]きさに切[き]ります。きれいに切[き]る＿＿［4］、包丁[ほうちょう]を濡[ぬ]らしておくと便利[べんり]です。",
      "卵焼[たまごや]きは冷[つめ]たくても温[あたた]かくてもおいしいので、お弁当[べんとう]にもよく入[い]れます。子供[こども]に＿＿［5］人気[にんき]があります。",
    ],
    gaps: [
      {
        id: "passage.recipe.g1",
        grammarPointId: "n4.te-oku",
        source: "bank",
        kind: "mcq",
        question: "卵[たまご]を三[みっ]つボウルに割[わ]って、砂糖[さとう]と塩[しお]を入[い]れてよく＿＿。",
        choices: [
          "かき混[ま]ぜておきます",
          "かき混[ま]ぜます",
          "かき混[ま]ぜました",
          "かき混[ま]ぜてもいいです",
        ],
        correctIndex: 0,
        explanation:
          "〜ておく marks doing something now so it's ready for later — mixing the egg mixture in advance before cooking. Plain ます just states the action without that 'preparing ahead' nuance, ました wrongly shifts to past tense mid-instruction, and てもいいです (permission) doesn't fit a recipe step.",
      },
      {
        id: "passage.recipe.g2",
        grammarPointId: "n5.mae-ni-ato-de",
        source: "bank",
        kind: "mcq",
        question: "卵[たまご]を流[なが]し入[い]れる前[まえ]に、フライパンを＿＿。",
        choices: ["熱[あつ]くしません", "熱[あつ]くします", "熱[あつ]かったです", "熱[あつ]くなかったです"],
        correctIndex: 1,
        explanation:
          "前に always pairs with a plain non-past verb describing what happens first — here, heating the pan before pouring in the egg. 熱くしません wrongly negates the step, 熱かったです is a past state ('was hot'), and 熱くなかったです is a negative past — none is the action the instruction calls for.",
      },
      {
        id: "passage.recipe.g3",
        grammarPointId: "n5.naru",
        source: "bank",
        kind: "mcq",
        question: "弱火[よわび]で焼[や]きながら端[はし]から丸[まる]めていくと、きれいな形[かたち]に＿＿。",
        choices: ["します", "なりました", "なります", "してあります"],
        correctIndex: 2,
        explanation:
          "〜になる describes a change of state reached through the rolling process — 'it becomes a nice shape.' します would need を and describes deliberately making something (wrong transitivity here), なりました shifts to past tense mid-instruction, and してあります describes a resultant state from a deliberate action, not a natural becoming.",
      },
      {
        id: "passage.recipe.g4",
        grammarPointId: "n4.tame-ni",
        source: "bank",
        kind: "mcq",
        question: "きれいに切[き]る＿＿、包丁[ほうちょう]を濡[ぬ]らしておくと便利[べんり]です。",
        choices: ["のに", "から", "ように", "ために"],
        correctIndex: 3,
        explanation:
          "ために states the purpose ('in order to cut it nicely') that motivates wetting the knife beforehand. のに would signal an unexpected contrast, から reverses the logic (cutting nicely isn't the CAUSE of wetting the knife), and ように is typically used with non-volitional/potential verbs, not a plain volitional action like 切る here.",
      },
      {
        id: "passage.recipe.g5",
        grammarPointId: "n5.mo",
        source: "bank",
        kind: "mcq",
        question: "子供[こども]に＿＿人気[にんき]があります。",
        choices: ["も", "は", "が", "を"],
        correctIndex: 0,
        explanation:
          "も adds 'children too/even children' to a group that already likes tamagoyaki (implicitly adults). は would make 子供 the flat topic instead of 'also,' が would mark 子供 as the subject of a different verb, and を doesn't fit this existence/quality expression at all.",
      },
    ],
  },
  {
    id: "passage.station",
    title: "電車[でんしゃ]の遅[おく]れのお知[し]らせ",
    paragraphsJa: [
      "本日[ほんじつ]、上[のぼ]り電車[でんしゃ]は大雨[おおあめ]の影響[えいきょう]で、十分[じゅっぷん]ほど＿＿［1］。次[つぎ]の電車[でんしゃ]はもうすぐ到着[とうちゃく]する＿＿［2］ので、もうしばらくお待[ま]ちください。",
      "ホームでお待[ま]ちの間[あいだ]、黄色[きいろ]い点字[てんじ]ブロックより内側[うちがわ]でお待[ま]ちください。線路[せんろ]に物[もの]を落[お]とさない＿＿［3］、足元[あしもと]にご注意[ちゅうい]ください。ドアが閉[し]まる際[さい]は、駆[か]け込[こ]み乗車[じょうしゃ]をし＿＿［4］。",
      "電車[でんしゃ]が動[うご]き出[だ]したら、揺[ゆ]れます＿＿［5］、お気[き]をつけください。ご迷惑[めいわく]をおかけして、申[もう]し訳[わけ]ございません。",
    ],
    gaps: [
      {
        id: "passage.station.g1",
        grammarPointId: "n4.te-shimau",
        source: "bank",
        kind: "mcq",
        question: "上[のぼ]り電車[でんしゃ]は大雨[おおあめ]の影響[えいきょう]で、十分[じゅっぷん]ほど＿＿。",
        choices: ["遅[おく]れませんでした", "遅[おく]れてしまいました", "遅[おく]れています", "遅[おく]れてもいいです"],
        correctIndex: 1,
        explanation:
          "〜てしまう marks an unfortunate, completed event — fitting the apologetic tone of a delay announcement. 遅れませんでした wrongly negates the delay, 遅れています describes an ongoing state rather than the completed regrettable event, and 遅れてもいいです (permission) makes no sense for a delay.",
      },
      {
        id: "passage.station.g2",
        grammarPointId: "n4.hazu",
        source: "bank",
        kind: "mcq",
        question: "次[つぎ]の電車[でんしゃ]はもうすぐ到着[とうちゃく]する＿＿ので、もうしばらくお待[ま]ちください。",
        choices: ["よう", "つもり", "はず", "そう"],
        correctIndex: 2,
        explanation:
          "はず expresses the speaker's confident expectation, based on the schedule, that the next train should arrive soon. よう would suggest a visual appearance/resemblance rather than a scheduled certainty, つもり refers to the SPEAKER's own intention (a train can't have an 'intention'), and そう would need a different conjugation entirely to attach here.",
      },
      {
        id: "passage.station.g3",
        grammarPointId: "n4.you-ni",
        source: "bank",
        kind: "mcq",
        question: "線路[せんろ]に物[もの]を落[お]とさない＿＿、足元[あしもと]にご注意[ちゅうい]ください。",
        choices: ["から", "のに", "ために", "ように"],
        correctIndex: 3,
        explanation:
          "〜ないように pairs with a cautionary, non-volitional verb to mean 'so as not to' — exactly the safety-warning register here. から would state a blunt reason rather than a soft caution, のに signals unexpected contrast, and ために frames a deliberate purpose, which doesn't fit warning against an accidental slip.",
      },
      {
        id: "passage.station.g4",
        grammarPointId: "n5.naide-kudasai",
        source: "bank",
        kind: "mcq",
        question: "ドアが閉[し]まる際[さい]は、駆[か]け込[こ]み乗車[じょうしゃ]をし＿＿。",
        choices: ["ないでください", "てください", "たいです", "てもいいです"],
        correctIndex: 0,
        explanation:
          "ないでください politely requests someone NOT to do something — fitting the instruction against rushing onto a departing train. てください would wrongly request the opposite (please do rush aboard), たいです expresses the speaker's own desire, and てもいいです grants permission rather than prohibiting the action.",
      },
      {
        id: "passage.station.g5",
        grammarPointId: "n4.node",
        source: "bank",
        kind: "mcq",
        question: "電車[でんしゃ]が動[うご]き出[だ]したら、揺[ゆ]れます＿＿、お気[き]をつけください。",
        choices: ["けど", "ので", "し", "のに"],
        correctIndex: 1,
        explanation:
          "ので gives a polite, objective reason ('because it will shake') leading into the caution — the standard announcement pattern. けど is a casual 'but,' not a reason-clause, し implies just one item among several reasons rather than a single direct cause, and のに would wrongly signal an unexpected contrast.",
      },
    ],
  },
  {
    id: "passage.club",
    title: "テニス部[ぶ]からのお知[し]らせ",
    paragraphsJa: [
      "テニス部[ぶ]です。今週[こんしゅう]の練習[れんしゅう]は体育館[たいいくかん]が使[つか]えないため、近[ちか]くの公園[こうえん]で行[おこな]います。新[あたら]しい部員[ぶいん]も歓迎[かんげい]しますので、興味[きょうみ]がある人[ひと]は一緒[いっしょ]に＿＿［1］。初[はじ]めての人[ひと]は、まずラケットを借[か]りに＿＿［2］。",
      "先週[せんしゅう]の試合[しあい]では、二年生[にねんせい]のチームは勝[か]ったり負[ま]けたり＿＿［3］。それでも、最後[さいご]まで全力[ぜんりょく]で戦[たたか]いました。三年生[さんねんせい]の中[なか]には、緊張[きんちょう]し＿＿［4］、うまく打[う]てなかった人[ひと]もいたそうです。",
      "来週[らいしゅう]は月曜日[げつようび]と水曜日[すいようび]に練習[れんしゅう]があります。スケジュールは＿＿［5］決[き]まっていますので、部室[ぶしつ]の掲示板[けいじばん]で確認[かくにん]してください。",
    ],
    gaps: [
      {
        id: "passage.club.g1",
        grammarPointId: "n5.mashou-masen-ka",
        source: "bank",
        kind: "mcq",
        question: "新[あたら]しい部員[ぶいん]も歓迎[かんげい]しますので、興味[きょうみ]がある人[ひと]は一緒[いっしょ]に＿＿。",
        choices: ["練習[れんしゅう]しています", "練習[れんしゅう]しなさい", "練習[れんしゅう]しませんか", "練習[れんしゅう]しましょうか"],
        correctIndex: 2,
        explanation:
          "〜ませんか politely invites without presuming a yes — ideal for inviting prospective new members to join. している describes an ongoing state, not an invitation; しなさい is a blunt command, the wrong register entirely; and しましょうか offers to do something FOR a specific listener rather than issuing a general open invitation.",
      },
      {
        id: "passage.club.g2",
        grammarPointId: "n5.ni-iku",
        source: "bank",
        kind: "mcq",
        question: "初[はじ]めての人[ひと]は、まずラケットを借[か]りに＿＿。",
        choices: ["来[き]ましょう", "帰[かえ]りましょう", "しましょう", "行[い]きましょう"],
        correctIndex: 3,
        explanation:
          "〜に行く marks going somewhere to do something — here, going to get a racket. 来ましょう ('let's come') has the wrong direction, 帰りましょう means 'let's return' (not fitting a first errand), and しましょう is ungrammatical after に in this construction, which requires 行く/来る/帰る.",
      },
      {
        id: "passage.club.g3",
        grammarPointId: "n4.tari-tari",
        source: "bank",
        kind: "mcq",
        question: "先週[せんしゅう]の試合[しあい]では、二年生[にねんせい]のチームは勝[か]ったり負[ま]けたり＿＿。",
        choices: ["しました", "しません", "するでしょう", "するところです"],
        correctIndex: 0,
        explanation:
          "〜たり〜たりする closes with する conjugated to fit the narrative — here past tense しました for a completed match. しません wrongly negates something that clearly happened, するでしょう is a future guess, and するところです ('about to do') doesn't fit an event already over.",
      },
      {
        id: "passage.club.g4",
        grammarPointId: "n4.sugiru",
        source: "bank",
        kind: "mcq",
        question: "三年生[さんねんせい]の中[なか]には、緊張[きんちょう]し＿＿、うまく打[う]てなかった人[ひと]もいたそうです。",
        choices: ["すぎた", "すぎて", "すぎれば", "すぎる"],
        correctIndex: 1,
        explanation:
          "すぎる attaches to the stem to mean 'excessively,' and its て-form links smoothly to the next clause describing the result (couldn't hit well). Plain すぎる, past すぎた, and conditional すぎれば can't connect two clauses the way て does.",
      },
      {
        id: "passage.club.g5",
        grammarPointId: "n5.mou-mada",
        source: "bank",
        kind: "mcq",
        question: "来週[らいしゅう]のスケジュールは＿＿決[き]まっていますので、部室[ぶしつ]の掲示板[けいじばん]で確認[かくにん]してください。",
        choices: ["すぐ", "まだ", "もう", "もっと"],
        correctIndex: 2,
        explanation:
          "もう + a resultant state marks something already settled — 'already decided.' まだ ('not yet') would contradict 決まっています being settled, もっと means 'more' (a comparison, doesn't fit), and すぐ means 'soon' (wrong — the schedule is already fixed, not upcoming).",
      },
    ],
  },
  {
    id: "passage.shopping",
    title: "買[か]い物[もの]に行[い]った日[ひ]",
    paragraphsJa: [
      "土曜日[どようび]、妹[いもうと]と一緒[いっしょ]にデパートへ買[か]い物[もの]に行[い]きました。新[あたら]しい靴[くつ]が＿＿［1］ので、靴屋[くつや]に入[はい]りました。店員[てんいん]さんに勧[すす]められた靴[くつ]を＿＿［2］ことにしました。",
      "サイズはちょうどよかったですが、デパートの靴[くつ]は商店街[しょうてんがい]の靴[くつ]＿＿［3］高[たか]かったので、少[すこ]し迷[まよ]いました。妹[いもうと]は「今[こん]シーズンの新[しん]モデルは、この店[みせ]に＿＿［4］売[う]っていません」と言[い]いました。",
      "結局[けっきょく]、その靴[くつ]を買[か]いました。とても気[き]に入[い]っているので、毎日[まいにち]履[は]く＿＿［5］。",
    ],
    gaps: [
      {
        id: "passage.shopping.g1",
        grammarPointId: "n5.ga-hoshii",
        source: "bank",
        kind: "mcq",
        question: "新[あたら]しい靴[くつ]が＿＿ので、靴屋[くつや]に入[はい]りました。",
        choices: ["欲[ほ]しがった", "欲[ほ]しいだった", "欲[ほ]しくない", "欲[ほ]しかった"],
        correctIndex: 3,
        explanation:
          "ほしい directly expresses the SPEAKER's own past desire — 'I wanted new shoes.' 欲しがった is the third-person form (describing someone else's visible desire, wrong subject here), 欲しいだった is ungrammatical (い-adjectives never take だった), and 欲しくない is the wrong polarity — she clearly did want them, since she went in.",
      },
      {
        id: "passage.shopping.g2",
        grammarPointId: "n4.te-miru",
        source: "bank",
        kind: "mcq",
        question: "店員[てんいん]さんに勧[すす]められた靴[くつ]を＿＿ことにしました。",
        choices: ["履[は]いてみる", "履[は]いてみたい", "履[は]いてみせる", "履[は]いておく"],
        correctIndex: 0,
        explanation:
          "〜てみる ('try doing') plus ことにしました ('decided to') describes deciding to try the shoes on. 履いてみたい expresses a wish, not a decision made; 履いてみせる means 'try to show/prove by wearing' (a different construction, てみせる); and 履いておく (て-おく) means preparing them in advance, an unrelated meaning.",
      },
      {
        id: "passage.shopping.g3",
        grammarPointId: "n5.yori-hou-ga",
        source: "bank",
        kind: "mcq",
        question: "デパートの靴[くつ]は商店街[しょうてんがい]の靴[くつ]＿＿高[たか]かったので、少[すこ]し迷[まよ]いました。",
        choices: ["でも", "より", "しか", "ほど"],
        correctIndex: 1,
        explanation:
          "より marks the item being compared against ('more expensive THAN the shopping-street shoes'). でも means 'even/or something,' しか must pair with a negative predicate (高かった is affirmative here), and ほど is used with negatives to mean 'not as ~ as,' not a plain comparison.",
      },
      {
        id: "passage.shopping.g4",
        grammarPointId: "n5.dake-shika",
        source: "bank",
        kind: "mcq",
        question: "妹[いもうと]は「今[こん]シーズンの新[しん]モデルは、この店[みせ]に＿＿売[う]っていません」と言[い]いました。",
        choices: ["も", "だけ", "しか", "まで"],
        correctIndex: 2,
        explanation:
          "しか must pair with a negative predicate to mean 'only' — しか売っていません says it's sold nowhere else but here. だけ + a negative predicate actually reverses the meaning (roughly 'only here it ISN'T sold'), も means 'also/even' (wrong meaning), and まで means 'until/as far as,' unrelated here.",
      },
      {
        id: "passage.shopping.g5",
        grammarPointId: "n4.kamoshirenai",
        source: "bank",
        kind: "mcq",
        question: "とても気[き]に入[い]っているので、毎日[まいにち]履[は]く＿＿。",
        choices: ["ようです", "そうです", "はずです", "かもしれません"],
        correctIndex: 3,
        explanation:
          "かもしれません is the natural way to voice a soft, personal guess about one's own future habit ('I might wear them every day'). ようです and そうです are inference forms typically based on outside visual/reported evidence, and はずです expresses a confident expectation — too strong a claim for a casual guess about oneself.",
      },
    ],
  },
  {
    id: "passage.trip-plan",
    title: "温泉[おんせん]旅行[りょこう]の計画[けいかく]",
    paragraphsJa: [
      "来月[らいげつ]、友達[ともだち]と一緒[いっしょ]に温泉[おんせん]へ旅行[りょこう]に行[い]きます。東京駅[とうきょうえき]＿＿［1］新幹線[しんかんせん]に乗[の]って、二時間[にじかん]ほどで温泉[おんせん]の駅[えき]まで着[つ]きます。実[じつ]は、この温泉[おんせん]に前[まえ]に一度[いちど]行[い]った＿＿［2］がありますが、友達[ともだち]は初[はじ]めてです。",
      "旅行[りょこう]のかばんには、着替[きが]え＿＿［3］カメラなど、いろいろな物[もの]を入[い]れました。",
      "友達[ともだち]は写真[しゃしん]を撮[と]る＿＿［4］、きれいな景色[けしき]の場所[ばしょ]に行[い]きたいと言[い]っています。私[わたし]は温泉[おんせん]でのんびりする＿＿［5］好[す]きなので、場所[ばしょ]はどこでもいいです。",
    ],
    gaps: [
      {
        id: "passage.trip-plan.g1",
        grammarPointId: "n5.kara-made",
        source: "bank",
        kind: "mcq",
        question: "東京駅[とうきょうえき]＿＿新幹線[しんかんせん]に乗[の]って、二時間[にじかん]ほどで温泉[おんせん]の駅[えき]まで着[つ]きます。",
        choices: ["から", "まで", "より", "ので"],
        correctIndex: 0,
        explanation:
          "から marks the starting point of the journey — 'from Tokyo Station.' まで marks an ending point instead (and already appears later in the sentence for the destination), より is for comparisons, and ので would require a reason-clause structure, not a bare location slot.",
      },
      {
        id: "passage.trip-plan.g2",
        grammarPointId: "n4.ta-koto-ga-aru",
        source: "bank",
        kind: "mcq",
        question: "実[じつ]は、この温泉[おんせん]に前[まえ]に一度[いちど]行[い]った＿＿がありますが、友達[ともだち]は初[はじ]めてです。",
        choices: ["もの", "こと", "ところ", "はず"],
        correctIndex: 1,
        explanation:
          "〜たことがある uses こと to nominalize the past experience ('the experience of having gone'). もの and ところ are different nominalizers with unrelated meanings, and はず (a confident expectation) doesn't fit a claim about one's own past experience at all.",
      },
      {
        id: "passage.trip-plan.g3",
        grammarPointId: "n5.to-ya",
        source: "bank",
        kind: "mcq",
        question: "旅行[りょこう]のかばんには、着替[きが]え＿＿カメラなど、いろいろな物[もの]を入[い]れました。",
        choices: ["か", "も", "や", "と"],
        correctIndex: 2,
        explanation:
          "や lists examples from a non-exhaustive set, matching the trailing など ('things like a change of clothes, a camera, etc.'). と would imply a complete, closed list (incompatible with など following it), も means 'also' (wrong slot), and か marks alternatives ('or'), not items packed together.",
      },
      {
        id: "passage.trip-plan.g4",
        grammarPointId: "n4.to-nara",
        source: "bank",
        kind: "mcq",
        question: "友達[ともだち]は写真[しゃしん]を撮[と]る＿＿、きれいな景色[けしき]の場所[ばしょ]に行[い]きたいと言[い]っています。",
        choices: ["と", "ば", "たら", "なら"],
        correctIndex: 3,
        explanation:
          "なら picks up a topic just mentioned (photography) and attaches a comment about what she wants — exactly this 'if it's about X, then...' usage. と forces an automatic, non-volitional result (incompatible with a personal wish like 行きたい), ば awkwardly frames it as a narrow hypothetical requirement, and たら would force strict before/after sequencing that doesn't fit a general preference.",
      },
      {
        id: "passage.trip-plan.g5",
        grammarPointId: "n5.no-ga-suki",
        source: "bank",
        kind: "mcq",
        question: "私[わたし]は温泉[おんせん]でのんびりする＿＿好[す]きなので、場所[ばしょ]はどこでもいいです。",
        choices: ["のが", "のを", "こと", "なのが"],
        correctIndex: 0,
        explanation:
          "好き takes が, and a verb clause needs the nominalizer の first — のが好き is the fixed pairing ('like doing ~'). のを wrongly pairs 好き with を, bare こと is missing the required が entirely, and なのが wrongly inserts な, which attaches after nouns/na-adjectives, not after a plain dictionary-form verb.",
      },
    ],
  },
  {
    id: "passage.lost-and-found",
    title: "忘[わす]れ物[もの]のお知[し]らせ",
    paragraphsJa: [
      "昨日[きのう]の午後[ごご]、二階[にかい]の教室[きょうしつ]で黒[くろ]い傘[かさ]が＿＿［1］。この傘[かさ]は誰[だれ]＿＿［2］か、まだ分[わ]かりません。心当[こころあ]たりがある人[ひと]は、事務室[じむしつ]まで取[と]りに来[き]てください。",
      "他[ほか]にも、小[ちい]さいカバンが届[とど]いています。この忘[わす]れ物[もの]のカバンは、とても子供[こども]＿＿［3］ですね。小[ちい]さくてかわいいです。",
      "事務室[じむしつ]の担当[たんとう]の人[ひと]は、他[ほか]の仕事[しごと]をし＿＿［4］、忘[わす]れ物[もの]の管理[かんり]もしています。開[あ]いている時間[じかん]が短[みじか]い＿＿［5］、なるべく早[はや]く取[と]りに来[き]てください。",
    ],
    gaps: [
      {
        id: "passage.lost-and-found.g1",
        grammarPointId: "n5.te-iru",
        source: "bank",
        kind: "mcq",
        question: "昨日[きのう]の午後[ごご]、二階[にかい]の教室[きょうしつ]で黒[くろ]い傘[かさ]が＿＿。",
        choices: ["落[お]ちるでしょう", "落[お]ちていました", "落[お]ちます", "落[お]ちました"],
        correctIndex: 1,
        explanation:
          "〜ている (past 〜ていた) describes the resulting state after a change — the umbrella was lying there, having fallen, which is exactly how a lost-and-found notice describes a found item. 落ちるでしょう is a future guess, 落ちます is generic non-past, and 落ちました only marks the one-time event without the 'still lying there' state.",
      },
      {
        id: "passage.lost-and-found.g2",
        grammarPointId: "n5.no",
        source: "bank",
        kind: "mcq",
        question: "この傘[かさ]は誰[だれ]＿＿か、まだ分[わ]かりません。",
        choices: ["は", "を", "の", "が"],
        correctIndex: 2,
        explanation:
          "誰の asks about possession — 'whose [is it]' — with の standing in for the omitted noun. は would wrongly make 誰 a flat topic, を doesn't fit a possession question at all, and が would ask 'who' as the subject performing some action, not who something belongs to.",
      },
      {
        id: "passage.lost-and-found.g3",
        grammarPointId: "n4.rashii",
        source: "bank",
        kind: "mcq",
        question: "この忘[わす]れ物[もの]のカバンは、とても子供[こども]＿＿ですね。",
        choices: ["らしくて", "らしかった", "らしいだ", "らしい"],
        correctIndex: 3,
        explanation:
          "らしい attaches bare to a noun and conjugates like an い-adjective, so plain らしい is correct before です for a present description. らしくて is the て-form (needs a following clause, but the sentence ends here), らしかった wrongly shifts to past tense, and らしいだ is the classic mistake of adding だ, which らしい never takes.",
      },
      {
        id: "passage.lost-and-found.g4",
        grammarPointId: "n4.nagara",
        source: "bank",
        kind: "mcq",
        question:
          "事務室[じむしつ]の担当[たんとう]の人[ひと]は、他[ほか]の仕事[しごと]をし＿＿、忘[わす]れ物[もの]の管理[かんり]もしています。",
        choices: ["ながら", "てから", "ても", "ないで"],
        correctIndex: 0,
        explanation:
          "ながら links two actions the same person does at once — handling other work WHILE also managing lost items. てから means 'after doing' (sequential, not simultaneous), ても means 'even if/though' (concessive, wrong meaning), and ないで means 'without doing,' which would reverse the meaning entirely.",
      },
      {
        id: "passage.lost-and-found.g5",
        grammarPointId: "n5.kara-reason",
        source: "bank",
        kind: "mcq",
        question: "開[あ]いている時間[じかん]が短[みじか]い＿＿、なるべく早[はや]く取[と]りに来[き]てください。",
        choices: ["し", "から", "のに", "けど"],
        correctIndex: 1,
        explanation:
          "から tags the reason clause ('because the open hours are short') right before the request that follows — the standard reason-then-outcome pattern. のに signals an unexpected contrast, けど is a casual 'but,' and し implies one reason among several rather than a single direct cause.",
      },
    ],
  },
];

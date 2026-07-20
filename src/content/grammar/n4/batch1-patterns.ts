// N4 grammar batch 1 — sentence patterns, conjunctions, conditionals:
// 8 points with lessons, examples, and bank exercises. Furigana notation
// throughout (see src/engine/furigana.ts).

import type { Exercise, GrammarPoint } from "../../types";

export const points: GrammarPoint[] = [
  {
    id: "n4.hazu",
    level: "N4",
    category: "sentence-patterns",
    title: "〜はずだ・〜はずがない",
    meaning: "should be / is supposed to ~ (confident expectation); はずがない — can't possibly be",
    formation: [
      "Plain form + はずだ／はずです — 来るはずです",
      "な-adjective + なはず; noun + のはず — 有名なはず, 休みのはず",
      "〜はずがない／はずがありません — there's no way that ~",
    ],
    lesson: `はず states an expectation you've REASONED your way to: given what I know, this should be so. 田中[たなか]さんはもう駅[えき]に着[つ]いているはずです — he left an hour ago, so he should be at the station by now. There's always an implicit "because" behind はず.

Attachment follows the usual noun-modifying pattern (はず is grammatically a noun): plain verb + はず (行[い]くはず, 行[い]ったはず), い-adjective + はず (高[たか]いはず), な-adjective + **な**はず (有名[ゆうめい]なはず), noun + **の**はず (休[やす]みのはず).

The negative expectation flips to **はずがない**: 彼[かれ]が約束[やくそく]を忘[わす]れるはずがありません — there's no way he'd forget a promise. Note the difference between 来[こ]ないはずだ ("I expect he won't come") and 来[く]るはずがない ("it's impossible that he comes") — the second is much stronger.

Keep はず apart from its neighbors:

- **かもしれない** is a guess with low confidence ("maybe"); はず is high confidence built on reasons.
- **つもり** is someone's INTENTION; はず is your INFERENCE about how things stand.

A common learner mistake is using はず for your own planned actions (×明日[あした]映画[えいが]を見[み]るはずです for "I plan to see a movie") — for your own plans use つもり or the volitional; はず is for expectations about things outside your control.`,
    examples: [
      { ja: "田中[たなか]さんはもう駅[えき]に着[つ]いているはずです。", en: "Mr. Tanaka should have arrived at the station by now." },
      { ja: "明日[あした]は日曜日[にちようび]だから、銀行[ぎんこう]は休[やす]みのはずです。", en: "Tomorrow is Sunday, so the bank should be closed." },
      { ja: "彼女[かのじょ]は十年[じゅうねん]日本[にほん]に住[す]んでいたから、日本語[にほんご]が上手[じょうず]なはずです。", en: "She lived in Japan for ten years, so her Japanese should be good." },
      { ja: "まじめな田中[たなか]さんが約束[やくそく]を忘[わす]れるはずがありません。", en: "There's no way the diligent Mr. Tanaka would forget a promise." },
    ],
    related: ["n4.kamoshirenai", "n4.rashii", "n5.plain-form"],
  },
  {
    id: "n4.kamoshirenai",
    level: "N4",
    category: "expressions",
    title: "〜かもしれない",
    meaning: "might / maybe ~ (possibility, low certainty)",
    formation: [
      "Plain form + かもしれない／かもしれません — 降るかもしれない",
      "な-adjective stem + かもしれない; noun + かもしれない (no だ) — 静かかもしれない, 学生かもしれない",
      "Casual speech often clips it to 〜かも",
    ],
    lesson: `かもしれない tags a statement as a mere possibility — "might, maybe." 午後[ごご]から雨[あめ]が降[ふ]るかもしれません — it might rain in the afternoon. The speaker isn't committing; the chance could be fifty-fifty or less.

Attachment is refreshingly bare: plain forms connect directly (行[い]くかもしれない, 行[い]ったかもしれない, 高[たか]いかもしれない), and — the part that trips people — **な-adjectives and nouns attach WITHOUT な or だ**: 病気[びょうき]かもしれない (might be sick), 静[しず]かかもしれない. Writing ×病気[びょうき]だかもしれない is the classic error.

The polite form is かもしれません; casual conversation often clips the whole thing to かも: 遅[おく]れるかも！ ("might be late!").

Calibrate it against the other guessing words:

- **でしょう** — probably (speaker leans yes).
- **はずだ** — should be (confident, reason-based).
- **かもしれない** — merely possible (no lean at all).

So 雨[あめ]が降[ふ]るでしょう is a forecast; 降[ふ]るかもしれない just keeps an umbrella in the conversation.

Because it expresses uncertainty about facts, かもしれない doesn't combine naturally with things you yourself control and have decided — for wobbly intentions, Japanese prefers 行[い]こうかと思[おも]っている or similar. Use かもしれない for outcomes, not resolutions.`,
    examples: [
      { ja: "午後[ごご]から雨[あめ]が降[ふ]るかもしれません。", en: "It might rain from the afternoon." },
      { ja: "田中[たなか]さんはもう帰[かえ]ったかもしれない。", en: "Mr. Tanaka may have already gone home." },
      { ja: "来年[らいねん]、大阪[おおさか]に引[ひ]っ越[こ]すかもしれません。", en: "I might move to Osaka next year." },
      { ja: "その話[はなし]は本当[ほんとう]かもしれませんが、信[しん]じられません。", en: "That story may be true, but I can't believe it." },
    ],
    related: ["n4.hazu", "n4.rashii", "n5.plain-form"],
  },
  {
    id: "n4.node",
    level: "N4",
    category: "conjunctions",
    title: "〜ので",
    meaning: "because / since ~ — softer, more objective reason than から",
    formation: [
      "Plain form + ので — 時間がないので",
      "な-adjective + なので; noun + なので — 静かなので, 学生なので",
      "Polite speech may keep ますので／ですので in formal requests",
    ],
    lesson: `ので gives a reason, like から, but with a different flavor: it presents the reason as an objective circumstance rather than the speaker's personal claim. That softness makes ので the natural choice when asking for favors, excusing yourself, or explaining things politely: 頭[あたま]が痛[いた]いので、早[はや]く帰[かえ]ってもいいですか — since I have a headache, may I go home early?

Attachment is the noun-modifying pattern (の is historically a noun): plain verb/い-adjective connect directly (降[ふ]るので, 高[たか]いので), while **な-adjectives and nouns take な**: 静[しず]かなので, 日曜日[にちようび]**な**ので. The bare-だ version ×日曜日[にちようび]だので is a standard exam trap.

から vs ので in practice:

- から states the speaker's own reasoning, so it pairs freely with strong endings — commands, opinions, invitations.
- ので frames the reason as circumstance; it sounds milder and more formal, and is preferred before requests and in polite explanations.
- ので rarely ends an answer by itself — 「どうして？」「〜からです」 uses から.

In very polite speech you'll also hear ますので (お時間[じかん]がありませんので…) — keeping the polite form before ので raises the formality another notch, something から doesn't usually do.

Both are correct in many sentences; the mistake to avoid is mechanical — the なので attachment — rather than the choice itself.`,
    examples: [
      { ja: "頭[あたま]が痛[いた]いので、早[はや]く帰[かえ]ってもいいですか。", en: "I have a headache, so may I go home early?" },
      { ja: "明日[あした]はテストがあるので、今日[きょう]は早[はや]く寝[ね]ます。", en: "I have a test tomorrow, so I'll go to bed early today." },
      { ja: "ここは静[しず]かなので、勉強[べんきょう]しやすいです。", en: "It's quiet here, so it's easy to study." },
      { ja: "日曜日[にちようび]なので、銀行[ぎんこう]は閉[し]まっています。", en: "Since it's Sunday, the bank is closed." },
    ],
    related: ["n5.kara-reason", "n4.noni", "n4.temo-ii"],
  },
  {
    id: "n4.noni",
    level: "N4",
    category: "conjunctions",
    title: "〜のに",
    meaning: "even though / despite ~ — contrary to expectation, with surprise or dissatisfaction",
    formation: [
      "Plain form + のに — 勉強したのに",
      "な-adjective + なのに; noun + なのに — 元気なのに, 休みなのに",
      "Sentence-final 〜のに… — unfinished, laments the outcome",
    ],
    lesson: `のに joins two clauses whose combination is surprising: the first sets up an expectation, the second breaks it — and the speaker isn't happy or is at least struck by it. たくさん勉強[べんきょう]したのに、テストは五十点[ごじゅってん]でした — even though I studied hard, I got a 50.

Attachment mirrors ので: plain forms connect directly (行[い]くのに, 高[たか]いのに), な-adjectives and nouns take な (元気[げんき]**な**のに, 休[やす]み**な**のに).

The emotional charge is what separates のに from neutral contrast words:

- **が／けど** simply connect contrasting facts: 高[たか]いですが、買[か]います — it's expensive, but I'll buy it. Neutral, no surprise.
- **のに** adds "and that's not how it should have gone": 高[たか]いのに、すぐ壊[こわ]れました — even though it was expensive, it broke right away (can you believe it?).

Because のに carries that built-in disappointment, it doesn't fit before requests, invitations, or your own decisions — ×寒[さむ]いのに、窓[まど]を閉[し]めてください is wrong; neutral contrast there uses が/けど.

Trailing のに at the end of a sentence leaves the reproach hanging: 言[い]ってくれればよかったのに… — you could have just told me…

Exam trap: のに vs ので. Both attach with な, both follow plain forms — but ので gives a reason leading naturally TO the result, while のに marks the result as clashing with the setup. Read the two clauses' logic, not just the form.`,
    examples: [
      { ja: "たくさん勉強[べんきょう]したのに、テストは五十点[ごじゅってん]でした。", en: "Even though I studied a lot, I got 50 points on the test." },
      { ja: "彼[かれ]は約束[やくそく]したのに、来[き]ませんでした。", en: "Even though he promised, he didn't come." },
      { ja: "この店[みせ]は高[たか]いのに、いつも込[こ]んでいます。", en: "Even though this shop is expensive, it's always crowded." },
      { ja: "兄[あに]は休[やす]みなのに、朝[あさ]から仕事[しごと]をしています。", en: "Even though it's his day off, my brother has been working since morning." },
    ],
    related: ["n4.node", "n5.kara-reason"],
  },
  {
    id: "n4.tame-ni",
    level: "N4",
    category: "sentence-patterns",
    title: "〜ために",
    meaning: "in order to ~ / for the sake of ~ (purpose with controllable actions; noun + のために)",
    formation: [
      "[verb, dictionary form] + ために — 買うために (in order to buy)",
      "[noun] + のために — 家族のために (for my family)",
      "The verb before ために must be volitional (something you can decide to do)",
    ],
    lesson: `ために expresses purpose — "in order to" — when the goal is an action you can deliberately take. 日本[にほん]の大学[だいがく]に入[はい]るために、日本語[にほんご]を勉強[べんきょう]しています — I'm studying Japanese in order to enter a Japanese university.

The verb before ために is in the **dictionary form**, and it must be **volitional** — something decidable: 買[か]う, 行[い]く, なる (as a chosen goal). The clause after ために is the effort you make toward that goal.

Nouns take の: 家族[かぞく]のために働[はたら]く — work for the sake of one's family; 健康[けんこう]のために走[はし]る — run for one's health. With nouns the meaning shades from purpose into benefit ("for").

The essential contrast is with **ように** (its own point): ように takes NON-volitional verbs — potentials (読[よ]めるように), negatives (忘[わす]れないように), and verbs like 分[わ]かる that describe states you can't simply decide. Rule of thumb: can you choose to do it? → ために. Is it an outcome you hope will hold? → ように. So: 日本[にほん]で働[はたら]くために (in order to work — a choice) vs 日本語[にほんご]が話[はな]せるように (so that I can speak — an outcome).

One more face: with a past or stative clause, ため(に) reads as CAUSE rather than purpose (事故[じこ]のために電車[でんしゃ]が遅[おく]れた — the train was late because of an accident). Context and tense make the reading clear.`,
    examples: [
      { ja: "日本[にほん]の大学[だいがく]に入[はい]るために、日本語[にほんご]を勉強[べんきょう]しています。", en: "I'm studying Japanese in order to enter a Japanese university." },
      { ja: "家[いえ]を買[か]うために、お金[かね]をためています。", en: "I'm saving money in order to buy a house." },
      { ja: "家族[かぞく]のために、毎日[まいにち]働[はたら]いています。", en: "I work every day for my family." },
      { ja: "健康[けんこう]のために、毎朝[まいあさ]走[はし]っています。", en: "I run every morning for my health." },
    ],
    related: ["n4.you-ni", "n5.ni-iku", "n5.no"],
  },
  {
    id: "n4.you-ni",
    level: "N4",
    category: "sentence-patterns",
    title: "〜ように",
    meaning: "so that ~ (purpose with potential/negative/non-volitional verbs); 〜ようにする — make a habit/effort",
    formation: [
      "[potential/non-volitional verb] + ように — 読めるように (so that I can read)",
      "[verb, ない-form] + ように — 忘れないように (so as not to forget)",
      "〜ようにしています — make a point of doing; 〜ようにしてください — soft instruction",
    ],
    lesson: `ように expresses purpose when the goal is an OUTCOME you can't directly will into being — you can only work toward it. That's why it pairs with potentials, negatives, and non-volitional verbs:

- 日本語[にほんご]が話[はな]せるように、毎日[まいにち]練習[れんしゅう]しています。 — I practice every day so that I can speak Japanese.
- 忘[わす]れないように、メモしてください。 — Note it down so that you don't forget.
- 後[うし]ろの人[ひと]にも聞[き]こえるように、大[おお]きい声[こえ]で話[はな]しました。 — I spoke loudly so that people in the back could hear too.

The mirror-image rule with **ために**: volitional verb → ために; potential/negative/non-volitional → ように. Compare 買[か]うために (in order to buy) with 買[か]えるように (so that I'll be able to buy).

Two spin-off patterns matter at N4:

- **〜ようにする** — make a conscious effort or habit: 毎日[まいにち]野菜[やさい]を食[た]べるようにしています (I make a point of eating vegetables daily). Here a volitional verb is fine, because ようにする is about sustaining a behavior, not a single act.
- **〜ようにしてください** — a softened instruction aimed at ongoing behavior: 遅[おく]れないようにしてください (please try not to be late) — gentler and broader than the direct 遅[おく]れないでください.

Don't confuse this purpose ように with 〜ようになる (change over time — its own point) or with the similarity よう ("like/as if", N3 territory).`,
    examples: [
      { ja: "日本語[にほんご]が話[はな]せるように、毎日[まいにち]練習[れんしゅう]しています。", en: "I practice every day so that I can speak Japanese." },
      { ja: "忘[わす]れないように、手帳[てちょう]に書[か]きました。", en: "I wrote it in my planner so that I wouldn't forget." },
      { ja: "風邪[かぜ]をひかないように、気[き]をつけてください。", en: "Please take care not to catch a cold." },
      { ja: "毎朝[まいあさ]、朝[あさ]ごはんを食[た]べるようにしています。", en: "I make a point of eating breakfast every morning." },
    ],
    related: ["n4.tame-ni", "n4.you-ni-naru", "n4.potential"],
  },
  {
    id: "n4.to-nara",
    level: "N4",
    category: "conditionals",
    title: "〜と・〜なら",
    meaning: "と — whenever/automatic result; なら — \"if that's the case\" topic conditional (completes the ば/たら/と/なら set)",
    formation: [
      "[dictionary/ない form] + と、[result] — 押すと、開きます (result clause: facts only, no requests/commands)",
      "[plain form / noun] + なら、[comment] — 京都なら、新幹線が便利です",
      "なら picks up something just said and comments on it",
    ],
    lesson: `と and なら round out the four conditionals alongside ば/たら.

**と** links a condition to its AUTOMATIC consequence — natural laws, machines, directions, habits: このボタンを押[お]すと、ドアが開[あ]きます (press this button and the door opens); 春[はる]になると、桜[さくら]が咲[さ]きます (when spring comes, the cherries bloom). Because the result must follow by itself, the clause after と cannot be a request, command, invitation, or decision — ×降[ふ]ると、傘[かさ]を持[も]って行[い]ってください is wrong; use たら there.

**なら** is the "if we're talking about that" conditional. It takes something from the conversation and attaches the speaker's comment — typically advice or a recommendation: 「京都[きょうと]へ行[い]きたいんですが。」「京都[きょうと]なら、新幹線[しんかんせん]が便利[べんり]ですよ。」 Nouns attach directly (京都[きょうと]なら), verbs in plain form (行[い]くなら).

なら's special power: the condition doesn't have to happen BEFORE the main clause. 日本[にほん]へ行[い]くなら、カメラを持[も]って行[い]ったほうがいいですよ — if you're going to Japan (at some point), take a camera when you go. たら would instead sequence it strictly ("after arriving").

Quick placement guide for the whole family: と = automatic/habitual "whenever"; ば = focus on the requirement; たら = one-off "when/if, then"; なら = responding to a topic with advice. On the exam, first check the result clause — a command or suggestion after と is the giveaway wrong answer.`,
    examples: [
      { ja: "このボタンを押[お]すと、ドアが開[あ]きます。", en: "When you press this button, the door opens." },
      { ja: "春[はる]になると、桜[さくら]が咲[さ]きます。", en: "When spring comes, the cherry blossoms bloom." },
      { ja: "「京都[きょうと]へ行[い]きたいんですが。」「京都[きょうと]なら、新幹線[しんかんせん]が便利[べんり]ですよ。」", en: "\"I'd like to go to Kyoto.\" \"If it's Kyoto, the Shinkansen is convenient.\"" },
      { ja: "日本[にほん]の漫画[まんが]なら、何[なん]でも知[し]っています。", en: "When it comes to Japanese manga, I know everything." },
    ],
    related: ["n4.ba-tara", "n5.plain-form"],
  },
  {
    id: "n4.rashii",
    level: "N4",
    category: "expressions",
    title: "〜らしい",
    meaning: "apparently / I hear ~ (inference from information); noun + らしい — typical of ~",
    formation: [
      "Plain form + らしい — 雨が降るらしい",
      "な-adjective stem / noun + らしい — 元気らしい, 学生らしい",
      "[noun]らしい[noun] — 男らしい人 (typical-of use); conjugates like an い-adjective",
    ],
    lesson: `らしい has two jobs at N4.

**1. Reported inference — "apparently, I hear."** The speaker passes on something learned secondhand (rumor, news, overheard talk), lightly filtered through their own judgment: 田中[たなか]さんは会社[かいしゃ]をやめるらしい — apparently Tanaka is quitting. Attachment is bare: plain forms, な-adjective stems, and nouns connect directly (雨[あめ]らしい, 元気[げんき]らしい) — no だ, no な.

Against its neighbors: 〜そうだ (hearsay) reports the source's words as-is, often with によると; らしい blends the report with the speaker's own reading of the situation, and sounds a bit more distanced. かもしれない is pure guessing with no outside information at all.

**2. Typical-of — "[noun]らしい".** Attached to a noun and modifying another, らしい means "true to the nature of": 男[おとこ]らしい人[ひと] — a manly person; 今日[きょう]は春[はる]らしい天気[てんき]ですね — proper spring-like weather. The compound conjugates like an い-adjective: 彼[かれ]らしくない — that's not like him.

Context separates the two: 学生[がくせい]らしい can mean "apparently (he) is a student" (inference) or "student-like" (typical-of, when modifying a noun: 学生[がくせい]らしい服[ふく] — clothes befitting a student).

Common mistake: adding だ before it (×やめるだらしい) or using らしい for firsthand appearances — for what your own eyes suggest right now (looks about to fall), that's the 降[ふ]りそう face of そうだ, not らしい.`,
    examples: [
      { ja: "天気予報[てんきよほう]によると、明日[あした]は雨[あめ]らしいです。", en: "According to the weather forecast, it will apparently rain tomorrow." },
      { ja: "田中[たなか]さんは会社[かいしゃ]をやめるらしい。", en: "Apparently Mr. Tanaka is quitting the company." },
      { ja: "あの二人[ふたり]は来月[らいげつ]結婚[けっこん]するらしいですよ。", en: "I hear those two are getting married next month." },
      { ja: "彼[かれ]はとても男[おとこ]らしい人[ひと]です。", en: "He is a very manly person." },
    ],
    related: ["n4.sou-da", "n4.kamoshirenai", "n4.hazu"],
  },
];

export const exercises: Exercise[] = [
  // ---- n4.hazu ------------------------------------------------------------
  {
    id: "n4.hazu.ex1",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "translation",
    promptEn: "The train should arrive at three o'clock.",
    accepted: [
      "電車[でんしゃ]は三時[さんじ]に着[つ]くはずです。",
      "電車[でんしゃ]は三時[さんじ]に着[つ]くはずだ。",
      "三時[さんじ]に電車[でんしゃ]が着[つ]くはずです。",
    ],
    hint: "confident expectation: 〜はず",
  },
  {
    id: "n4.hazu.ex2",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "translation",
    promptEn: "There's no way he knows my phone number.",
    accepted: [
      "彼[かれ]が私[わたし]の電話番号[でんわばんごう]を知[し]っているはずがありません。",
      "彼[かれ]が私[わたし]の電話番号[でんわばんごう]を知[し]っているはずがない。",
    ],
    hint: "use 〜はずがない",
  },
  {
    id: "n4.hazu.ex3",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "cloze",
    sentence: "山田[やまだ]さんは今日[きょう]は休[やす]み＿＿はずです。",
    accepted: ["の"],
    translationEn: "Mr. Yamada should be off today.",
  },
  {
    id: "n4.hazu.ex4",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "cloze",
    sentence: "あのレストランは有名[ゆうめい]＿＿はずです。テレビで見[み]ましたから。",
    accepted: ["な"],
    translationEn: "That restaurant should be famous — I saw it on TV.",
  },
  {
    id: "n4.hazu.ex5",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "mcq",
    question: "田中[たなか]さんは昨日[きのう]アメリカへ行[い]ったから、今日[きょう]ここに＿＿。",
    choices: [
      "いるはずがありません",
      "いるはずです",
      "いたはずです",
      "いるつもりです",
    ],
    correctIndex: 0,
    explanation:
      "He flew to America yesterday, so him being here today is impossible: いるはずがない. いるはずです asserts the opposite expectation, and つもり states someone's own intention.",
  },
  {
    id: "n4.hazu.ex6",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "mcq",
    question: "荷物[にもつ]は昨日[きのう]送[おく]ったから、明日[あした]＿＿はずです。",
    choices: ["着[つ]く", "着[つ]いた", "着[つ]きます", "着[つ]いて"],
    correctIndex: 0,
    explanation:
      "はず follows the plain form, and 明日 needs non-past: 着くはずです. 着いた clashes with 明日, and the polite/て-forms can't attach to はず.",
  },
  {
    id: "n4.hazu.ex7",
    grammarPointId: "n4.hazu",
    source: "bank",
    kind: "ordering",
    segments: [
      "彼[かれ]は",
      "学生[がくせい]だから",
      "平日[へいじつ]は",
      "学校[がっこう]にいる",
      "はずです。",
    ],
    starIndex: 2,
    translationEn: "He's a student, so he should be at school on weekdays.",
  },

  // ---- n4.kamoshirenai ------------------------------------------------------
  {
    id: "n4.kamoshirenai.ex1",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "translation",
    promptEn: "It might snow tomorrow.",
    accepted: [
      "明日[あした]は雪[ゆき]が降[ふ]るかもしれません。",
      "明日[あした]は雪[ゆき]が降[ふ]るかもしれない。",
      "明日[あした]、雪[ゆき]が降[ふ]るかもしれません。",
    ],
  },
  {
    id: "n4.kamoshirenai.ex2",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "translation",
    promptEn: "He might not come to the party.",
    accepted: [
      "彼[かれ]はパーティーに来[こ]ないかもしれません。",
      "彼[かれ]はパーティーに来[こ]ないかもしれない。",
    ],
    hint: "negative plain form + かもしれない",
  },
  {
    id: "n4.kamoshirenai.ex3",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "cloze",
    sentence: "空[そら]が暗[くら]いですね。午後[ごご]は雨[あめ]が降[ふ]る＿＿ね。",
    accepted: ["かもしれません", "かもしれない", "かも"],
    translationEn: "The sky is dark. It might rain in the afternoon.",
  },
  {
    id: "n4.kamoshirenai.ex4",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "cloze",
    sentence: "かぎがありません。電車[でんしゃ]の中[なか]で落[お]とした＿＿しれません。",
    accepted: ["かも"],
    translationEn: "My keys are gone. I might have dropped them on the train.",
  },
  {
    id: "n4.kamoshirenai.ex5",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "mcq",
    question: "彼女[かのじょ]は今日[きょう]、学校[がっこう]を休[やす]んでいます。＿＿かもしれません。",
    choices: ["病気[びょうき]", "病気[びょうき]だ", "病気[びょうき]な", "病気[びょうき]の"],
    correctIndex: 0,
    explanation:
      "Nouns attach to かもしれない directly, with no だ/な/の: 病気かもしれない. Keeping だ (病気だかもしれない) is the classic attachment error.",
  },
  {
    id: "n4.kamoshirenai.ex6",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "mcq",
    question: "「田中[たなか]さん、遅[おそ]いですね。」「道[みち]が込[こ]んでいる＿＿ね。」",
    choices: [
      "かもしれません",
      "はずがありません",
      "なければなりません",
      "てもいいです",
    ],
    correctIndex: 0,
    explanation:
      "The speaker is offering a possible explanation, so かもしれません (\"maybe the roads are crowded\"). はずがない would deny the possibility outright, and the other two don't fit the guessing context.",
  },
  {
    id: "n4.kamoshirenai.ex7",
    grammarPointId: "n4.kamoshirenai",
    source: "bank",
    kind: "ordering",
    segments: ["週末[しゅうまつ]は", "天気[てんき]が", "悪[わる]くなる", "かもしれません。"],
    starIndex: 1,
    translationEn: "The weather might get bad over the weekend.",
  },

  // ---- n4.node ------------------------------------------------------------
  {
    id: "n4.node.ex1",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "translation",
    promptEn: "I caught a cold, so I will rest today.",
    accepted: [
      "かぜをひいたので、今日[きょう]は休[やす]みます。",
      "かぜをひきましたので、今日[きょう]は休[やす]みます。",
    ],
    hint: "use ので",
  },
  {
    id: "n4.node.ex2",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "translation",
    promptEn: "This town is quiet, so I like it.",
    accepted: [
      "この町[まち]は静[しず]かなので、好[す]きです。",
      "この町[まち]は静[しず]かなので、好[す]きだ。",
    ],
    hint: "な-adjective + なので",
  },
  {
    id: "n4.node.ex3",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "cloze",
    sentence: "明日[あした]は休[やす]み＿＿ので、映画[えいが]を見[み]に行[い]きます。",
    accepted: ["な"],
    translationEn: "Tomorrow is a day off, so I'm going to see a movie.",
  },
  {
    id: "n4.node.ex4",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "cloze",
    sentence: "バスが来[こ]なかった＿＿、会議[かいぎ]に遅[おく]れました。",
    accepted: ["ので", "から"],
    translationEn: "The bus didn't come, so I was late for the meeting.",
  },
  {
    id: "n4.node.ex5",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "mcq",
    question: "学生[がくせい]＿＿ので、お金[かね]がありません。",
    choices: ["な", "だ", "で", "じゃ"],
    correctIndex: 0,
    explanation:
      "Nouns and な-adjectives attach to ので with な: 学生なので. 学生だので is ungrammatical — the だ changes to な before ので.",
  },
  {
    id: "n4.node.ex6",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "mcq",
    question: "すみません、気分[きぶん]が悪[わる]い＿＿、先[さき]に帰[かえ]らせていただけませんか。",
    choices: ["ので", "のに", "ながら", "まで"],
    correctIndex: 0,
    explanation:
      "A polite request backed by a reason favors ので. のに would mark contradiction (\"even though I feel sick\"), which makes no sense before asking to leave early.",
  },
  {
    id: "n4.node.ex7",
    grammarPointId: "n4.node",
    source: "bank",
    kind: "ordering",
    segments: ["雨[あめ]が", "降[ふ]りそうなので", "傘[かさ]を", "持[も]って行[い]きます。"],
    starIndex: 1,
    translationEn: "It looks like rain, so I'll take an umbrella.",
  },

  // ---- n4.noni ------------------------------------------------------------
  {
    id: "n4.noni.ex1",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "translation",
    promptEn: "Even though I took medicine, I'm not getting better.",
    accepted: [
      "薬[くすり]を飲[の]んだのに、よくなりません。",
      "薬[くすり]を飲[の]んだのに、よくならない。",
    ],
    hint: "use のに",
  },
  {
    id: "n4.noni.ex2",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "translation",
    promptEn: "Even though it's summer, it's cold.",
    accepted: [
      "夏[なつ]なのに、寒[さむ]いです。",
      "夏[なつ]なのに、寒[さむ]い。",
    ],
    hint: "noun + なのに",
  },
  {
    id: "n4.noni.ex3",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "cloze",
    sentence: "何度[なんど]も練習[れんしゅう]した＿＿、うまくできませんでした。",
    accepted: ["のに", "けど"],
    translationEn: "Even though I practiced many times, I couldn't do it well.",
  },
  {
    id: "n4.noni.ex4",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "cloze",
    sentence: "日曜日[にちようび]＿＿のに、父[ちち]は会社[かいしゃ]へ行[い]きました。",
    accepted: ["な"],
    translationEn: "Even though it was Sunday, my father went to the office.",
  },
  {
    id: "n4.noni.ex5",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "mcq",
    question: "一生懸命[いっしょうけんめい]走[はし]った＿＿、電車[でんしゃ]に間[ま]に合[あ]いませんでした。",
    choices: ["のに", "ので", "から", "と"],
    correctIndex: 0,
    explanation:
      "Running hard should have meant catching the train — the miss is contrary to expectation, so のに. ので/から would absurdly make the running the CAUSE of missing it.",
  },
  {
    id: "n4.noni.ex6",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "mcq",
    question: "彼女[かのじょ]は歌手[かしゅ]＿＿のに、歌[うた]が下手[へた]です。",
    choices: ["な", "だ", "の", "で"],
    correctIndex: 0,
    explanation:
      "Nouns attach to のに with な: 歌手なのに \"even though she's a singer.\" だのに and のに directly after the bare noun are both ungrammatical.",
  },
  {
    id: "n4.noni.ex7",
    grammarPointId: "n4.noni",
    source: "bank",
    kind: "ordering",
    lead: "彼[かれ]は",
    segments: ["何度[なんど]も", "約束[やくそく]したのに", "来[き]ませんでした。"],
    starIndex: 1,
    translationEn: "Even though he promised many times, he didn't come.",
  },

  // ---- n4.tame-ni ------------------------------------------------------------
  {
    id: "n4.tame-ni.ex1",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "translation",
    promptEn: "I'm saving money in order to travel.",
    accepted: [
      "旅行[りょこう]するために、お金[かね]をためています。",
      "旅行[りょこう]のために、お金[かね]をためています。",
    ],
  },
  {
    id: "n4.tame-ni.ex2",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "translation",
    promptEn: "I bought a present for my mother.",
    accepted: [
      "母[はは]のために、プレゼントを買[か]いました。",
      "母[はは]のためにプレゼントを買[か]いました。",
    ],
    hint: "noun + のために",
  },
  {
    id: "n4.tame-ni.ex3",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "cloze",
    sentence: "車[くるま]を買[か]う＿＿に、アルバイトをしています。",
    accepted: ["ため"],
    translationEn: "I'm working part-time in order to buy a car.",
  },
  {
    id: "n4.tame-ni.ex4",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "cloze",
    sentence: "子供[こども]＿＿ために、絵本[えほん]を買[か]いました。",
    accepted: ["の"],
    translationEn: "I bought a picture book for my child.",
  },
  {
    id: "n4.tame-ni.ex5",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "mcq",
    question: "日本[にほん]で＿＿ために、日本語[にほんご]を勉強[べんきょう]しています。",
    choices: ["働[はたら]く", "働[はたら]いて", "働[はたら]き", "働[はたら]いた"],
    correctIndex: 0,
    explanation:
      "Purpose ために follows the dictionary form: 働くために. 働いたために would read as past CAUSE (\"because I worked\"), which clashes with the ongoing purpose here.",
  },
  {
    id: "n4.tame-ni.ex6",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "mcq",
    question: "健康[けんこう]の＿＿に、たばこをやめました。",
    choices: ["ため", "よう", "はず", "つもり"],
    correctIndex: 0,
    explanation:
      "Noun + のために = \"for the sake of\": 健康のために. ように cannot follow a bare noun + の this way, and はず/つもり make no sense here.",
  },
  {
    id: "n4.tame-ni.ex7",
    grammarPointId: "n4.tame-ni",
    source: "bank",
    kind: "ordering",
    segments: ["母[はは]は", "家族[かぞく]のために", "おいしい料理[りょうり]を", "作[つく]ります。"],
    starIndex: 1,
    translationEn: "My mother makes delicious meals for the family.",
  },

  // ---- n4.you-ni ------------------------------------------------------------
  {
    id: "n4.you-ni.ex1",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "translation",
    promptEn: "I practice every day so that I can swim.",
    accepted: [
      "泳[およ]げるように、毎日[まいにち]練習[れんしゅう]しています。",
      "泳[およ]げるように、毎日[まいにち]練習[れんしゅう]します。",
    ],
    hint: "potential verb + ように",
  },
  {
    id: "n4.you-ni.ex2",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "translation",
    promptEn: "Please write it down so that you don't forget.",
    accepted: [
      "忘[わす]れないように、書[か]いておいてください。",
      "忘[わす]れないように、書[か]いてください。",
      "忘[わす]れないように、メモしてください。",
    ],
    hint: "ない-form + ように",
  },
  {
    id: "n4.you-ni.ex3",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "cloze",
    sentence: "後[うし]ろの人[ひと]にも聞[き]こえる＿＿に、大[おお]きい声[こえ]で話[はな]しました。",
    accepted: ["よう"],
    translationEn: "I spoke loudly so that the people in the back could hear too.",
  },
  {
    id: "n4.you-ni.ex4",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "cloze",
    sentence: "毎日[まいにち]野菜[やさい]を食[た]べる＿＿しています。",
    accepted: ["ように", "ことに"],
    translationEn: "I make a point of eating vegetables every day.",
  },
  {
    id: "n4.you-ni.ex5",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "mcq",
    question: "漢字[かんじ]が読[よ]める＿＿、毎日[まいにち]練習[れんしゅう]しています。",
    choices: ["ように", "ために", "ことに", "はずに"],
    correctIndex: 0,
    explanation:
      "読める is a potential (non-volitional) verb, so purpose is expressed with ように. ために needs a volitional verb (読むために would be the ために shape).",
  },
  {
    id: "n4.you-ni.ex6",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "mcq",
    question: "電車[でんしゃ]に遅[おく]れない＿＿、早[はや]く家[いえ]を出[で]ました。",
    choices: ["ように", "ために", "のに", "まえに"],
    correctIndex: 0,
    explanation:
      "Negative purpose (\"so as not to be late\") takes ように: 遅れないように. ために resists negative verbs, のに means \"even though,\" and 前に needs an affirmative verb.",
  },
  {
    id: "n4.you-ni.ex7",
    grammarPointId: "n4.you-ni",
    source: "bank",
    kind: "ordering",
    segments: ["みんなに", "聞[き]こえるように", "大[おお]きい声[こえ]で", "話[はな]してください。"],
    starIndex: 1,
    translationEn: "Please speak loudly so that everyone can hear you.",
  },

  // ---- n4.to-nara ------------------------------------------------------------
  {
    id: "n4.to-nara.ex1",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "translation",
    promptEn: "When you turn right, there is a station.",
    accepted: [
      "右[みぎ]に曲[ま]がると、駅[えき]があります。",
      "右[みぎ]へ曲[ま]がると、駅[えき]があります。",
    ],
    hint: "automatic result: use と",
  },
  {
    id: "n4.to-nara.ex2",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "translation",
    promptEn: "If it's sushi, I can eat a lot.",
    accepted: [
      "すしなら、たくさん食[た]べられます。",
      "すしなら、たくさん食[た]べられる。",
    ],
    hint: "topic conditional: use なら",
  },
  {
    id: "n4.to-nara.ex3",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "cloze",
    sentence: "このボタンを押[お]す＿＿、お湯[ゆ]が出[で]ます。",
    accepted: ["と"],
    translationEn: "When you press this button, hot water comes out.",
  },
  {
    id: "n4.to-nara.ex4",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "cloze",
    sentence: "「頭[あたま]が痛[いた]いんです。」「頭[あたま]が痛[いた]い＿＿、早[はや]く帰[かえ]ったほうがいいですよ。」",
    accepted: ["なら"],
    translationEn: "\"I have a headache.\" \"If that's the case, you should go home early.\"",
  },
  {
    id: "n4.to-nara.ex5",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "mcq",
    question: "雨[あめ]が降[ふ]る＿＿、試合[しあい]は中止[ちゅうし]になります。",
    choices: ["と", "たら", "ば", "のに"],
    correctIndex: 0,
    explanation:
      "After the dictionary form, only と attaches directly: 降ると \"whenever it rains.\" たら/ば need different stems (降ったら/降れば), and のに would claim the cancellation is surprising.",
  },
  {
    id: "n4.to-nara.ex6",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "mcq",
    question: "「カメラを買[か]いたいんですが、どこがいいですか。」「カメラを買[か]う＿＿、あの店[みせ]が安[やす]いですよ。」",
    choices: ["なら", "と", "たら", "ので"],
    correctIndex: 0,
    explanation:
      "The reply picks up the topic (\"if it's a camera you're buying\") and gives advice — that's なら. と states an automatic result, たら can't attach to 買う, and ので gives a reason, not advice.",
  },
  {
    id: "n4.to-nara.ex7",
    grammarPointId: "n4.to-nara",
    source: "bank",
    kind: "ordering",
    segments: ["春[はる]に", "なると", "桜[さくら]の花[はな]が", "咲[さ]きます。"],
    starIndex: 1,
    translationEn: "When spring comes, the cherry blossoms bloom.",
  },

  // ---- n4.rashii ------------------------------------------------------------
  {
    id: "n4.rashii.ex1",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "translation",
    promptEn: "I hear that teacher is strict.",
    accepted: [
      "あの先生[せんせい]は厳[きび]しいらしいです。",
      "あの先生[せんせい]は厳[きび]しいらしい。",
    ],
    hint: "use らしい",
  },
  {
    id: "n4.rashii.ex2",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "translation",
    promptEn: "Apparently Mr. Yamada moved to Osaka.",
    accepted: [
      "山田[やまだ]さんは大阪[おおさか]に引[ひ]っ越[こ]したらしいです。",
      "山田[やまだ]さんは大阪[おおさか]へ引[ひ]っ越[こ]したらしいです。",
      "山田[やまだ]さんは大阪[おおさか]に引[ひ]っ越[こ]したらしい。",
    ],
  },
  {
    id: "n4.rashii.ex3",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "cloze",
    sentence: "今日[きょう]は春[はる]＿＿暖[あたた]かい日[ひ]ですね。",
    accepted: ["らしい", "みたいに"],
    translationEn: "Today is a warm, spring-like day, isn't it?",
  },
  {
    id: "n4.rashii.ex4",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "cloze",
    sentence: "話[はなし]によると、あの店[みせ]は先月[せんげつ]閉[し]まった＿＿です。",
    accepted: ["らしい", "そう", "みたい"],
    translationEn: "From what I hear, that shop closed last month.",
  },
  {
    id: "n4.rashii.ex5",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "mcq",
    question: "彼[かれ]はとても男[おとこ]＿＿人[ひと]です。",
    choices: ["らしい", "ような", "そうな", "はずな"],
    correctIndex: 0,
    explanation:
      "Noun + らしい = \"true to the nature of\": 男らしい人 \"a manly person.\" ような would need の (男のような), and そうな/はずな can't attach to a bare noun.",
  },
  {
    id: "n4.rashii.ex6",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "mcq",
    question: "「田中[たなか]さん、最近[さいきん]見[み]ませんね。」「国[くに]へ帰[かえ]った＿＿ですよ。」",
    choices: ["らしい", "らしく", "らしいだ", "らしくて"],
    correctIndex: 0,
    explanation:
      "Before です the plain らしい stands as-is: 帰ったらしいです \"apparently he went home.\" らしく/らしくて are connective forms and らしいだ doubles the copula.",
  },
  {
    id: "n4.rashii.ex7",
    grammarPointId: "n4.rashii",
    source: "bank",
    kind: "ordering",
    segments: ["天気予報[てんきよほう]によると", "週末[しゅうまつ]は", "晴[は]れる", "らしいです。"],
    starIndex: 1,
    translationEn: "According to the weather forecast, it will apparently be sunny on the weekend.",
  },
];

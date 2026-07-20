// N5 grammar batch 1 — sentence patterns & expressions: 6 points with lessons,
// examples, and bank exercises. Furigana notation throughout.

import type { Exercise, GrammarPoint } from "../../types";

export const points: GrammarPoint[] = [
  {
    id: "n5.ga-hoshii",
    level: "N5",
    category: "sentence-patterns",
    title: "〜がほしい",
    meaning: "want a thing — [noun]がほしい (conjugates like an い-adjective)",
    formation: [
      "[noun]がほしい(です) — I want [noun]",
      "Negative: ほしくない(です); past: ほしかった(です)",
      "Third person: ほしがっている (\"appears to want\")",
    ],
    lesson: `ほしい expresses wanting a THING (a noun). The wanted thing is marked with が, not を: 新[あたら]しいパソコンがほしいです — I want a new computer.

Grammatically ほしい is an **い-adjective**, so it conjugates like 高[たか]い:

- ほしくないです — don't want it
- ほしかったです — wanted it
- ほしくなかったです — didn't want it

Keep it apart from its sibling 〜たい: ほしい takes a noun (水[みず]がほしい — I want water), while たい attaches to a verb stem (水[みず]が飲[の]みたい — I want to drink water). English "want" covers both, so pick by asking: is the wanted thing a noun or an action?

Like たい, plain ほしい is reserved for the speaker's own feelings (and direct questions: 何[なに]がほしいですか). To describe a third person's desire, Japanese switches to ほしがっている ("shows signs of wanting"), and the particle becomes を: 妹[いもうと]は新[あたら]しい靴[くつ]をほしがっています.

Common mistakes:

- ×水[みず]をほしいです — the thing wanted takes が.
- ×ほしいじゃないです — ほしい is an い-adjective, so the negative is ほしくない, never じゃない.
- Announcing someone else's wants with bare ほしい (×弟[おとうと]はゲームがほしいです is odd as a flat statement — use ほしがっている).`,
    examples: [
      { ja: "新[あたら]しいパソコンがほしいです。", en: "I want a new computer." },
      { ja: "誕生日[たんじょうび]に何[なに]がほしいですか。", en: "What do you want for your birthday?" },
      { ja: "今[いま]は何[なに]もほしくないです。", en: "I don't want anything right now." },
      { ja: "妹[いもうと]は自分[じぶん]の部屋[へや]をほしがっています。", en: "My little sister wants her own room." },
    ],
    related: ["n5.tai-form", "n5.i-adjectives", "n5.wa-ga"],
  },
  {
    id: "n5.no-ga-suki",
    level: "N5",
    category: "sentence-patterns",
    title: "〜のが好き・上手・下手",
    meaning: "like / be good at / be bad at doing ~ (verb + の nominalizer + が)",
    formation: [
      "[verb, dictionary form] + のが好きです — like doing ~",
      "[verb, dictionary form] + のが上手です／下手です — be good/bad at doing ~",
      "の turns the verb clause into a noun; the particle is が",
    ],
    lesson: `好[す]き, 上手[じょうず], and 下手[へた] are な-adjectives that describe your relationship to a NOUN: 音楽[おんがく]が好[す]きです — I like music. To say you like **doing** something, the verb must first be turned into a noun — that's the nominalizer の.

Take the dictionary form and add のが: 音楽[おんがく]を聞[き]くのが好[す]きです — I like listening to music. The structure is [verb clause] + の + が + 好き/上手/下手.

- 兄[あに]は料理[りょうり]を作[つく]るのが上手[じょうず]です。 — My brother is good at cooking.
- 私[わたし]は歌[うた]うのが下手[へた]です。 — I'm bad at singing.

Three things to watch:

- **The verb before の stays in dictionary form** — never ます-form: ×聞[き]きますのが.
- **The particle is が**, because 好き/上手/下手 are adjectives, not verbs: ×のを好[す]きです.
- 上手 is for OTHER people's skill. Praising your own skill with 上手 sounds boastful — for yourself, use 得意[とくい] (or just say you like it). Self-deprecating 下手 is fine for yourself.

You will also meet 〜ことが好[す]きです — こと is another nominalizer and is not wrong, but in casual speech and for this pattern, の is the everyday choice.`,
    examples: [
      { ja: "私[わたし]は音楽[おんがく]を聞[き]くのが好[す]きです。", en: "I like listening to music." },
      { ja: "兄[あに]は料理[りょうり]を作[つく]るのが上手[じょうず]です。", en: "My older brother is good at cooking." },
      { ja: "私[わたし]は歌[うた]うのが下手[へた]です。", en: "I'm bad at singing." },
      { ja: "本[ほん]を読[よ]むのが好[す]きですか。", en: "Do you like reading books?" },
    ],
    related: ["n5.no", "n5.na-adjectives", "n5.plain-form"],
  },
  {
    id: "n5.kara-reason",
    level: "N5",
    category: "conjunctions",
    title: "〜から（理由）",
    meaning: "because ~ / so ~ — reason clause + から + result clause",
    formation: [
      "[reason]から、[result] — 時間がないから、タクシーで行きます",
      "Polite or plain forms can both come before から",
      "Answering どうして: 〜からです",
    ],
    lesson: `To give a reason, attach から to the END of the reason clause; the result follows: 時間[じかん]がありませんから、タクシーで行[い]きます — I don't have time, so I'll take a taxi.

The order is the reverse of English "because": Japanese states the reason first, tags it with から, then gives the outcome. Reading tip — when you hit から, everything before it is the "because" part.

Both polite and plain forms can precede から: 暑[あつ]いですから／暑[あつ]いから both work; in casual speech the plain form is usual. Nouns and な-adjectives take だ before plain から: 休[やす]みだから (because it's a day off).

When answering a どうして ("why?") question, から carries the whole answer: 「どうして食[た]べないんですか。」「おなかがいっぱいだからです。」 — "Because I'm full."

Distinguish this clause-final から from the noun-attached から meaning "from" (九時[くじ]から — from 9 o'clock): if から follows a whole clause, it's "because"; if it follows a bare noun, it's "from."

A common early mistake is putting から on the RESULT clause. Anchor the tag to the reason: 雨[あめ]が降[ふ]っているから、行[い]きません (because it's raining, I won't go) — never ×行[い]きませんから、雨[あめ]が降[ふ]っています for that meaning. (You'll later meet ので, a softer "because" — it's an N4 point.)`,
    examples: [
      { ja: "時間[じかん]がありませんから、タクシーで行[い]きます。", en: "I don't have time, so I'll go by taxi." },
      { ja: "暑[あつ]いですから、窓[まど]を開[あ]けてください。", en: "It's hot, so please open the window." },
      { ja: "明日[あした]はテストがあるから、今晩[こんばん]勉強[べんきょう]します。", en: "I have a test tomorrow, so I'll study tonight." },
      { ja: "「どうして食[た]べないんですか。」「おなかがいっぱいだからです。」", en: "\"Why aren't you eating?\" \"Because I'm full.\"" },
    ],
    related: ["n5.kara-made", "n5.plain-form"],
  },
  {
    id: "n5.mae-ni-ato-de",
    level: "N5",
    category: "sentence-patterns",
    title: "〜前に・〜た後で",
    meaning: "before doing ~ / after doing ~ (and noun + の前に/の後で)",
    formation: [
      "[verb, dictionary form] + 前に — before doing ~ (ALWAYS dictionary form, even for past events)",
      "[verb, た-form] + 後で — after doing ~ (ALWAYS た-form, even for future events)",
      "[noun]の前に / [noun]の後で — before/after [noun]",
    ],
    lesson: `前[まえ]に ("before") and 後[あと]で ("after") order two events — and each one locks the verb before it into a fixed form, no matter when the events happen.

**Verb + 前に: always the dictionary form.** 寝[ね]る前[まえ]に、歯[は]をみがきます — before sleeping, I brush my teeth. Even if everything happened in the past, the verb before 前に stays in dictionary form: 日本[にほん]へ来[く]る前[まえ]に、日本語[にほんご]を勉強[べんきょう]しました — before coming to Japan, I studied Japanese. (Logic: at the "before" moment, the action hasn't happened yet.)

**Verb + た後で: always the た-form.** ごはんを食[た]べた後[あと]で、薬[くすり]を飲[の]みます — after eating, I take medicine. Even for future plans the た stays: 宿題[しゅくだい]をした後[あと]で、ゲームをします. (At the "after" moment, the action is already done.)

Nouns connect with の: 仕事[しごと]の前[まえ]に (before work), 授業[じゅぎょう]の後[あと]で (after class).

The tense of the whole sentence lives ONLY in the final verb. The classic mistake is matching the 前に/後で verb to the sentence tense: ×来[き]た前[まえ]に and ×食[た]べる後[あと]で are both wrong, always.`,
    examples: [
      { ja: "寝[ね]る前[まえ]に、歯[は]をみがきます。", en: "I brush my teeth before going to bed." },
      { ja: "ごはんを食[た]べた後[あと]で、薬[くすり]を飲[の]みます。", en: "I take my medicine after eating." },
      { ja: "日本[にほん]へ来[く]る前[まえ]に、少[すこ]し日本語[にほんご]を勉強[べんきょう]しました。", en: "I studied a little Japanese before coming to Japan." },
      { ja: "仕事[しごと]の後[あと]で、友達[ともだち]と食事[しょくじ]をします。", en: "After work, I'm having a meal with a friend." },
    ],
    related: ["n5.plain-form", "n5.ta-form", "n5.no"],
  },
  {
    id: "n5.mou-mada",
    level: "N5",
    category: "expressions",
    title: "もう〜・まだ〜",
    meaning: "already / not yet — もう〜ました vs まだ〜ていません (and still / no longer)",
    formation: [
      "もう + past — already did: もう食べました",
      "まだ + 〜ていません — not yet: まだ食べていません (NOT ×食べませんでした)",
      "まだ + affirmative — still: まだ学生です; もう + negative — no longer",
      "Short answer: いいえ、まだです",
    ],
    lesson: `もう and まだ report where things stand right now.

**もう + past = "already."** もう昼[ひる]ごはんを食[た]べました — I've already eaten lunch. The question もう食[た]べましたか asks "have you eaten yet?"

**まだ + 〜ていません = "not yet."** This is the pattern that catches everyone: the answer to もう食[た]べましたか is まだ食[た]べていません — NOT ×まだ食[た]べませんでした. The plain past negative states that the eating never happened at some finished time; 〜ていません says it hasn't happened YET, leaving the door open. When "yet" is in the sentence, you want ていません.

There's also a handy short answer: いいえ、まだです — "not yet."

Both words have a second face with the opposite polarity:

- **まだ + affirmative = "still":** 弟[おとうと]はまだ子供[こども]です — my brother is still a child; まだ雨[あめ]が降[ふ]っています — it's still raining.
- **もう + negative = "no longer":** もう降[ふ]っていません — it's not raining anymore.

So the pairing is: もう = a change has happened (already / no longer), まだ = it hasn't (still / not yet). Match the polarity of the verb to pick the right reading.`,
    examples: [
      { ja: "もう昼[ひる]ごはんを食[た]べました。", en: "I have already eaten lunch." },
      { ja: "宿題[しゅくだい]はまだ終[お]わっていません。", en: "My homework isn't finished yet." },
      { ja: "「レポートを書[か]きましたか。」「いいえ、まだです。」", en: "\"Have you written the report?\" \"No, not yet.\"" },
      { ja: "弟[おとうと]はまだ高校生[こうこうせい]です。", en: "My younger brother is still a high school student." },
    ],
    related: ["n5.te-iru", "n5.masu-form"],
  },
  {
    id: "n5.naru",
    level: "N5",
    category: "sentence-patterns",
    title: "〜くなる・〜になる",
    meaning: "become ~ / get ~ (change of state): い-adj くなる, な-adj・noun になる",
    formation: [
      "い-adjective: drop い + くなる — 寒い→寒くなる",
      "な-adjective: stem + になる — きれい→きれいになる",
      "Noun + になる — 先生になる (become a teacher)",
    ],
    lesson: `なる ("to become") turns a description into a CHANGE. What comes before it must be in adverb-ish form:

- **い-adjectives** drop the final い and add くなる: 寒[さむ]い → 寒[さむ]くなる (get cold); 大[おお]きい → 大[おお]きくなる (get bigger). いい is irregular: よくなる (get better).
- **な-adjectives** take になる (no な): 静[しず]か → 静[しず]かになる (become quiet); きれいになる (become pretty/clean).
- **Nouns** also take になる: 医者[いしゃ]になる (become a doctor); 二十歳[はたち]になる (turn twenty).

なる conjugates like any godan verb, so the pattern slots into everything you know: 寒[さむ]くなりました (it got cold), 上手[じょうず]になりたいです (I want to get good at it), 静[しず]かになってください (please get quiet).

なる describes the change happening on its own — the subject ends up in a new state. (Its transitive partner する — 部屋[へや]をきれいにする "make the room clean" — is worth noticing when you meet it.)

Common mistakes:

- ×寒[さむ]いなる／寒[さむ]くになる — the い must drop and く takes no に.
- ×きれいくなる — きれい looks like an い-adjective but is a な-adjective: きれいになる.
- Using なる where nothing changes: 寒[さむ]いです is "it's cold"; 寒[さむ]くなりました is "it GOT cold."`,
    examples: [
      { ja: "最近[さいきん]、暖[あたた]かくなりましたね。", en: "It's gotten warm recently, hasn't it?" },
      { ja: "部屋[へや]がきれいになりました。", en: "The room became clean." },
      { ja: "息子[むすこ]は医者[いしゃ]になりました。", en: "My son became a doctor." },
      { ja: "来年[らいねん]、二十歳[はたち]になります。", en: "I'll turn twenty next year." },
    ],
    related: ["n5.i-adjectives", "n5.na-adjectives", "n4.you-ni-naru"],
  },
];

export const exercises: Exercise[] = [
  // ---- n5.ga-hoshii ------------------------------------------------------
  {
    id: "n5.ga-hoshii.ex1",
    grammarPointId: "n5.ga-hoshii",
    source: "bank",
    kind: "translation",
    promptEn: "I want a new bicycle.",
    accepted: [
      "新[あたら]しい自転車[じてんしゃ]がほしいです。",
      "私[わたし]は新[あたら]しい自転車[じてんしゃ]がほしいです。",
      "新[あたら]しい自転車[じてんしゃ]がほしい。",
    ],
  },
  {
    id: "n5.ga-hoshii.ex2",
    grammarPointId: "n5.ga-hoshii",
    source: "bank",
    kind: "translation",
    promptEn: "What do you want for your birthday?",
    accepted: [
      "誕生日[たんじょうび]に何[なに]がほしいですか。",
      "誕生日[たんじょうび]には何[なに]がほしいですか。",
    ],
  },
  {
    id: "n5.ga-hoshii.ex3",
    grammarPointId: "n5.ga-hoshii",
    source: "bank",
    kind: "cloze",
    sentence: "私[わたし]は大[おお]きい犬[いぬ]＿＿ほしいです。",
    accepted: ["が"],
    translationEn: "I want a big dog.",
  },
  {
    id: "n5.ga-hoshii.ex4",
    grammarPointId: "n5.ga-hoshii",
    source: "bank",
    kind: "cloze",
    sentence: "のどがかわきましたから、冷[つめ]たい水[みず]が＿＿です。",
    accepted: ["ほしい", "飲[の]みたい"],
    translationEn: "I'm thirsty, so I want some cold water.",
  },
  {
    id: "n5.ga-hoshii.ex5",
    grammarPointId: "n5.ga-hoshii",
    source: "bank",
    kind: "mcq",
    question: "私[わたし]は新[あたら]しい靴[くつ]＿＿ほしいです。",
    choices: ["が", "を", "に", "で"],
    correctIndex: 0,
    explanation:
      "The thing wanted with ほしい is marked by が, not を — ほしい is an adjective, not a verb taking an object.",
  },
  {
    id: "n5.ga-hoshii.ex6",
    grammarPointId: "n5.ga-hoshii",
    source: "bank",
    kind: "mcq",
    question: "「ケーキ、食[た]べますか。」「いいえ、今[いま]は＿＿。」",
    choices: [
      "ほしくないです",
      "ほしいじゃないです",
      "ほしくありました",
      "ほしいないです",
    ],
    correctIndex: 0,
    explanation:
      "ほしい conjugates like an い-adjective: the negative is ほしくない(です). じゃない is for nouns/な-adjectives, and the other forms mix the conjugation up.",
  },
  {
    id: "n5.ga-hoshii.ex7",
    grammarPointId: "n5.ga-hoshii",
    source: "bank",
    kind: "ordering",
    segments: ["誕生日[たんじょうび]に", "新[あたら]しい", "かばんが", "ほしいです。"],
    starIndex: 1,
    translationEn: "I want a new bag for my birthday.",
  },

  // ---- n5.no-ga-suki ------------------------------------------------------
  {
    id: "n5.no-ga-suki.ex1",
    grammarPointId: "n5.no-ga-suki",
    source: "bank",
    kind: "translation",
    promptEn: "I like watching movies.",
    accepted: [
      "映画[えいが]を見[み]るのが好[す]きです。",
      "私[わたし]は映画[えいが]を見[み]るのが好[す]きです。",
      "映画[えいが]を見[み]るのが好[す]きだ。",
    ],
    hint: "turn the verb into a noun with の",
  },
  {
    id: "n5.no-ga-suki.ex2",
    grammarPointId: "n5.no-ga-suki",
    source: "bank",
    kind: "translation",
    promptEn: "My younger brother is good at swimming.",
    accepted: [
      "弟[おとうと]は泳[およ]ぐのが上手[じょうず]です。",
      "弟[おとうと]は水泳[すいえい]が上手[じょうず]です。",
    ],
  },
  {
    id: "n5.no-ga-suki.ex3",
    grammarPointId: "n5.no-ga-suki",
    source: "bank",
    kind: "cloze",
    sentence: "私[わたし]は写真[しゃしん]を撮[と]る＿＿が好[す]きです。",
    accepted: ["の"],
    translationEn: "I like taking photos.",
  },
  {
    id: "n5.no-ga-suki.ex4",
    grammarPointId: "n5.no-ga-suki",
    source: "bank",
    kind: "cloze",
    sentence: "父[ちち]は運転[うんてん]する＿＿上手[じょうず]です。",
    accepted: ["のが"],
    translationEn: "My father is good at driving.",
  },
  {
    id: "n5.no-ga-suki.ex5",
    grammarPointId: "n5.no-ga-suki",
    source: "bank",
    kind: "mcq",
    question: "妹[いもうと]は絵[え]をかく＿＿好[す]きです。",
    choices: ["のが", "のを", "ことを", "がの"],
    correctIndex: 0,
    explanation:
      "The verb is nominalized with の and the object of liking takes が: かくのが好き. を is wrong because 好き is an adjective, not a verb.",
  },
  {
    id: "n5.no-ga-suki.ex6",
    grammarPointId: "n5.no-ga-suki",
    source: "bank",
    kind: "mcq",
    question: "私[わたし]は日本[にほん]の歌[うた]を＿＿のが好[す]きです。",
    choices: ["歌[うた]う", "歌[うた]います", "歌[うた]って", "歌[うた]い"],
    correctIndex: 0,
    explanation:
      "The verb before the nominalizer の must be in the plain dictionary form: 歌うのが好きです. ます-form, て-form, and the bare stem can't attach to の.",
  },
  {
    id: "n5.no-ga-suki.ex7",
    grammarPointId: "n5.no-ga-suki",
    source: "bank",
    kind: "ordering",
    segments: ["私[わたし]は", "友達[ともだち]と", "話[はな]すのが", "好[す]きです。"],
    starIndex: 2,
    translationEn: "I like talking with my friends.",
  },

  // ---- n5.kara-reason ------------------------------------------------------
  {
    id: "n5.kara-reason.ex1",
    grammarPointId: "n5.kara-reason",
    source: "bank",
    kind: "translation",
    promptEn: "It's cold, so please close the window.",
    accepted: [
      "寒[さむ]いですから、窓[まど]を閉[し]めてください。",
      "寒[さむ]いから、窓[まど]を閉[し]めてください。",
    ],
    hint: "reason + から, then the request",
  },
  {
    id: "n5.kara-reason.ex2",
    grammarPointId: "n5.kara-reason",
    source: "bank",
    kind: "translation",
    promptEn: "I'm busy today, so I won't watch TV.",
    accepted: [
      "今日[きょう]は忙[いそが]しいですから、テレビを見[み]ません。",
      "今日[きょう]は忙[いそが]しいから、テレビを見[み]ません。",
      "今日[きょう]は忙[いそが]しいから、テレビを見[み]ない。",
    ],
  },
  {
    id: "n5.kara-reason.ex3",
    grammarPointId: "n5.kara-reason",
    source: "bank",
    kind: "cloze",
    sentence: "雨[あめ]が降[ふ]っています＿＿、傘[かさ]を持[も]って行[い]きます。",
    accepted: ["から", "ので"],
    translationEn: "It's raining, so I'll take an umbrella.",
  },
  {
    id: "n5.kara-reason.ex4",
    grammarPointId: "n5.kara-reason",
    source: "bank",
    kind: "cloze",
    sentence: "「どうしてコートを着[き]ますか。」「寒[さむ]い＿＿です。」",
    accepted: ["から"],
    translationEn: "\"Why are you putting on a coat?\" \"Because it's cold.\"",
  },
  {
    id: "n5.kara-reason.ex5",
    grammarPointId: "n5.kara-reason",
    source: "bank",
    kind: "mcq",
    question: "おなかがすきました＿＿、何[なに]か食[た]べましょう。",
    choices: ["から", "が", "でも", "まで"],
    correctIndex: 0,
    explanation:
      "The first clause is the reason for the suggestion, so から fits. が (\"but\") would set up a contrast that isn't there; でも/まで don't connect clauses this way.",
  },
  {
    id: "n5.kara-reason.ex6",
    grammarPointId: "n5.kara-reason",
    source: "bank",
    kind: "mcq",
    question: "あの店[みせ]は安[やす]い＿＿、いつも人[ひと]が多[おお]いです。",
    choices: ["から", "のに", "でも", "を"],
    correctIndex: 0,
    explanation:
      "Cheap prices are the REASON the shop is crowded, so から. のに (\"even though\") would claim the crowding is surprising given the low prices — backwards logic here.",
  },
  {
    id: "n5.kara-reason.ex7",
    grammarPointId: "n5.kara-reason",
    source: "bank",
    kind: "ordering",
    segments: ["明日[あした]は", "休[やす]みだから", "映画[えいが]を", "見[み]に行[い]きます。"],
    starIndex: 1,
    translationEn: "Tomorrow is a day off, so I'm going to see a movie.",
  },

  // ---- n5.mae-ni-ato-de ------------------------------------------------------
  {
    id: "n5.mae-ni-ato-de.ex1",
    grammarPointId: "n5.mae-ni-ato-de",
    source: "bank",
    kind: "translation",
    promptEn: "Please wash your hands before eating.",
    accepted: [
      "食[た]べる前[まえ]に、手[て]を洗[あら]ってください。",
      "ごはんを食[た]べる前[まえ]に、手[て]を洗[あら]ってください。",
      "食事[しょくじ]の前[まえ]に、手[て]を洗[あら]ってください。",
    ],
  },
  {
    id: "n5.mae-ni-ato-de.ex2",
    grammarPointId: "n5.mae-ni-ato-de",
    source: "bank",
    kind: "translation",
    promptEn: "After studying, I watched TV.",
    accepted: [
      "勉強[べんきょう]した後[あと]で、テレビを見[み]ました。",
      "勉強[べんきょう]の後[あと]で、テレビを見[み]ました。",
    ],
    hint: "verb + 後で takes the た-form",
  },
  {
    id: "n5.mae-ni-ato-de.ex3",
    grammarPointId: "n5.mae-ni-ato-de",
    source: "bank",
    kind: "cloze",
    sentence: "国[くに]へ帰[かえ]る＿＿に、京都[きょうと]へ行[い]きたいです。",
    accepted: ["前[まえ]"],
    translationEn: "Before going back to my country, I want to visit Kyoto.",
  },
  {
    id: "n5.mae-ni-ato-de.ex4",
    grammarPointId: "n5.mae-ni-ato-de",
    source: "bank",
    kind: "cloze",
    sentence: "シャワーを＿＿後[あと]で、寝[ね]ます。",
    accepted: ["浴[あ]びた"],
    translationEn: "After taking a shower, I go to bed.",
  },
  {
    id: "n5.mae-ni-ato-de.ex5",
    grammarPointId: "n5.mae-ni-ato-de",
    source: "bank",
    kind: "mcq",
    question: "日本[にほん]へ＿＿前[まえ]に、ひらがなを覚[おぼ]えました。",
    choices: ["来[く]る", "来[き]た", "来[き]て", "来[こ]ない"],
    correctIndex: 0,
    explanation:
      "The verb before 前に is ALWAYS dictionary form, even when the whole sentence is past: 来る前に. 来た前に is the classic tense-matching mistake.",
  },
  {
    id: "n5.mae-ni-ato-de.ex6",
    grammarPointId: "n5.mae-ni-ato-de",
    source: "bank",
    kind: "mcq",
    question: "宿題[しゅくだい]を＿＿後[あと]で、ゲームをします。",
    choices: ["した", "する", "して", "します"],
    correctIndex: 0,
    explanation:
      "後で always follows the た-form, even for future plans: した後で. The dictionary form goes with 前に, not 後で.",
  },
  {
    id: "n5.mae-ni-ato-de.ex7",
    grammarPointId: "n5.mae-ni-ato-de",
    source: "bank",
    kind: "ordering",
    segments: ["晩[ばん]ごはんを", "食[た]べた後[あと]で", "おふろに", "入[はい]ります。"],
    starIndex: 1,
    translationEn: "After eating dinner, I take a bath.",
  },

  // ---- n5.mou-mada ------------------------------------------------------
  {
    id: "n5.mou-mada.ex1",
    grammarPointId: "n5.mou-mada",
    source: "bank",
    kind: "translation",
    promptEn: "I have already read this book.",
    accepted: [
      "この本[ほん]はもう読[よ]みました。",
      "もうこの本[ほん]を読[よ]みました。",
      "この本[ほん]はもう読[よ]んだ。",
    ],
  },
  {
    id: "n5.mou-mada.ex2",
    grammarPointId: "n5.mou-mada",
    source: "bank",
    kind: "translation",
    promptEn: "I haven't eaten breakfast yet.",
    accepted: [
      "朝[あさ]ごはんはまだ食[た]べていません。",
      "まだ朝[あさ]ごはんを食[た]べていません。",
      "朝[あさ]ごはんはまだ食[た]べていない。",
    ],
    hint: "\"not yet\" needs 〜ていません, not the plain past negative",
  },
  {
    id: "n5.mou-mada.ex3",
    grammarPointId: "n5.mou-mada",
    source: "bank",
    kind: "cloze",
    sentence: "「もう荷物[にもつ]を送[おく]りましたか。」「いいえ、＿＿送[おく]っていません。」",
    accepted: ["まだ"],
    translationEn: "\"Have you sent the package yet?\" \"No, I haven't sent it yet.\"",
  },
  {
    id: "n5.mou-mada.ex4",
    grammarPointId: "n5.mou-mada",
    source: "bank",
    kind: "cloze",
    sentence: "「まだ雨[あめ]が降[ふ]っていますか。」「いいえ、＿＿降[ふ]っていません。」",
    accepted: ["もう"],
    translationEn: "\"Is it still raining?\" \"No, it's not raining anymore.\"",
  },
  {
    id: "n5.mou-mada.ex5",
    grammarPointId: "n5.mou-mada",
    source: "bank",
    kind: "mcq",
    question: "「もう昼[ひる]ごはんを食[た]べましたか。」「いいえ、まだ＿＿。」",
    choices: [
      "食[た]べていません",
      "食[た]べませんでした",
      "食[た]べません",
      "食[た]べました",
    ],
    correctIndex: 0,
    explanation:
      "\"Not yet\" is まだ〜ていません. 食べませんでした states the eating simply never happened at a past time and clashes with まだ, which points at the still-open present.",
  },
  {
    id: "n5.mou-mada.ex6",
    grammarPointId: "n5.mou-mada",
    source: "bank",
    kind: "mcq",
    question: "急[いそ]ぎましょう。電車[でんしゃ]は＿＿出[で]ました。",
    choices: ["もう", "まだ", "あとで", "ぜんぜん"],
    correctIndex: 0,
    explanation:
      "もう + past = \"already\": the train has already left. まだ with a perfective affirmative (まだ出ました) is ungrammatical, and ぜんぜん needs a negative at this level.",
  },
  {
    id: "n5.mou-mada.ex7",
    grammarPointId: "n5.mou-mada",
    source: "bank",
    kind: "ordering",
    lead: "すみません、",
    segments: ["レポートは", "まだ", "書[か]いていません。"],
    starIndex: 1,
    translationEn: "Sorry — I haven't written the report yet.",
  },

  // ---- n5.naru ------------------------------------------------------
  {
    id: "n5.naru.ex1",
    grammarPointId: "n5.naru",
    source: "bank",
    kind: "translation",
    promptEn: "It has gotten cold, hasn't it?",
    accepted: [
      "寒[さむ]くなりましたね。",
      "寒[さむ]くなったね。",
    ],
    hint: "い-adjective + なる",
  },
  {
    id: "n5.naru.ex2",
    grammarPointId: "n5.naru",
    source: "bank",
    kind: "translation",
    promptEn: "My younger sister became a teacher.",
    accepted: [
      "妹[いもうと]は先生[せんせい]になりました。",
      "妹[いもうと]は先生[せんせい]になった。",
    ],
  },
  {
    id: "n5.naru.ex3",
    grammarPointId: "n5.naru",
    source: "bank",
    kind: "cloze",
    sentence: "日本語[にほんご]の勉強[べんきょう]が楽[たの]しく＿＿ました。",
    accepted: ["なり"],
    translationEn: "Studying Japanese has become fun.",
  },
  {
    id: "n5.naru.ex4",
    grammarPointId: "n5.naru",
    source: "bank",
    kind: "cloze",
    sentence: "夜[よる]になって、町[まち]が静[しず]か＿＿なりました。",
    accepted: ["に"],
    translationEn: "Night fell, and the town became quiet.",
  },
  {
    id: "n5.naru.ex5",
    grammarPointId: "n5.naru",
    source: "bank",
    kind: "mcq",
    question: "このごろ、朝[あさ]は＿＿なりました。",
    choices: ["涼[すず]しく", "涼[すず]しいに", "涼[すず]しい", "涼[すず]しくて"],
    correctIndex: 0,
    explanation:
      "い-adjectives drop い and take く before なる: 涼しくなる. 〜いに and the plain/て-forms cannot connect to なる.",
  },
  {
    id: "n5.naru.ex6",
    grammarPointId: "n5.naru",
    source: "bank",
    kind: "mcq",
    question: "弟[おとうと]は来月[らいげつ]、大学生[だいがくせい]＿＿なります。",
    choices: ["に", "が", "を", "へ"],
    correctIndex: 0,
    explanation:
      "Nouns (and な-adjectives) connect to なる with に: 大学生になる \"become a university student.\"",
  },
  {
    id: "n5.naru.ex7",
    grammarPointId: "n5.naru",
    source: "bank",
    kind: "ordering",
    segments: ["たくさん練習[れんしゅう]して、", "テニスが", "上手[じょうず]に", "なりました。"],
    starIndex: 2,
    translationEn: "I practiced a lot, and my tennis got better.",
  },
];

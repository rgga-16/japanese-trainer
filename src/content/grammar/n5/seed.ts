// N5 grammar seed content: 8 points with lessons, examples, and bank exercises.
// Furigana notation throughout (see src/engine/furigana.ts).

import type { Exercise, GrammarPoint } from "../../types";

export const points: GrammarPoint[] = [
  {
    id: "n5.wa-ga",
    level: "N5",
    category: "particles",
    title: "は vs が",
    meaning: "topic marker は vs. subject marker が",
    formation: [
      "Noun + は — marks the topic; what the rest of the sentence is about",
      "Noun + が — marks the grammatical subject; often new or focused information",
      "Question words (誰[だれ], 何[なに], どこ) as subject always take が, never は",
    ],
    lesson: `は (pronounced "wa" as a particle) and が are both often translated as "is/are," but they do different jobs. は marks the **topic** — the thing the rest of the sentence is a comment about. It sets the stage: "as for X, ...". が marks the **grammatical subject** and tends to introduce new information or single something out from a group.

Compare 私[わたし]は学生[がくせい]です (as for me, [I] am a student — a simple statement about myself) with あの人[ひと]が学生[がくせい]です (that person, specifically, is the student — picking one person out of a group, maybe answering "which one is the student?").

A useful test: if the sentence answers a "who/which one" question, use が. If it introduces or comments on something already known or being talked about, use は. Question words like 誰[だれ] and 何[なに] almost always take が, because a question word is by definition new information — you can't make it the topic of "what we already agreed to discuss."

は also has a contrastive use: it can mark something other than the grammatical subject, and even attach to objects (魚[さかな]は食[た]べません — as for fish, [I] don't eat it, implying other things are fine).

A common beginner mistake is to overuse は on every noun. In practice, only one は per sentence is normal, and が is required inside a clause that is itself commenting on a topic already set by は, as in the classic 象[ぞう]は鼻[はな]が長[なが]い (elephants have long trunks): 象 is the overall topic, while 鼻 is the subject of the description "is long."`,
    examples: [
      { ja: "私[わたし]は学生[がくせい]です。", en: "I am a student." },
      { ja: "あの人[ひと]が田中[たなか]さんです。", en: "That person (over there) is Mr. Tanaka." },
      { ja: "誰[だれ]が来[き]ましたか。", en: "Who came?" },
      { ja: "象[ぞう]は鼻[はな]が長[なが]いです。", en: "Elephants have long trunks." },
    ],
    related: ["n5.o-ni-de"],
  },
  {
    id: "n5.o-ni-de",
    level: "N5",
    category: "particles",
    title: "を・に・で",
    meaning: "object marker を, target/time marker に, location-of-action marker で",
    formation: [
      "Noun + を — marks the direct object of a transitive verb",
      "Noun + に — marks a destination, a specific point in time, or an existence location (with ある/いる)",
      "Noun + で — marks where an action takes place, or the means/method used",
    ],
    lesson: `を, に, and で all often correspond to English prepositions, but each has a distinct job. を marks the direct object — the thing directly acted upon: パンを食[た]べる (eat bread), 手紙[てがみ]を書[か]く (write a letter).

に has several uses at N5: marking a destination with motion verbs (学校[がっこう]に行[い]く — go to school), a specific point in time (七時[しちじ]に起[お]きる — get up at seven o'clock), and the location where something exists with ある/いる (机[つくえ]の上[うえ]に本[ほん]があります — there is a book on the desk).

で marks the location where an action happens (公園[こうえん]で遊[あそ]ぶ — play in the park) — contrast this with に for where something simply exists. で also marks the means or instrument used (バスで行[い]く — go by bus, ペンで書[か]く — write with a pen).

The most common mixup is に vs で for location: use に for existing/being somewhere (static), で for doing something somewhere (an action). 図書館[としょかん]にいます (I am at the library — existence) versus 図書館[としょかん]で勉強[べんきょう]します (I study at the library — action).

Also watch time expressions: に is used with clock times, days of the week, and dates (三時[さんじ]に, 月曜日[げつようび]に), but is usually dropped after relative time words like 今日[きょう] (today) or 明日[あした] (tomorrow).`,
    examples: [
      { ja: "毎朝[まいあさ]パンを食[た]べます。", en: "I eat bread every morning." },
      { ja: "七時[しちじ]に学校[がっこう]に行[い]きます。", en: "I go to school at seven o'clock." },
      { ja: "公園[こうえん]で友達[ともだち]と遊[あそ]びます。", en: "I play with my friends in the park." },
      { ja: "机[つくえ]の上[うえ]に本[ほん]があります。", en: "There is a book on the desk." },
    ],
    related: ["n5.wa-ga", "n5.aru-iru"],
  },
  {
    id: "n5.masu-form",
    level: "N5",
    category: "verb-forms",
    title: "ます形",
    meaning: "polite non-past ます, negative ません, past ました, past negative ませんでした",
    formation: [
      "ます-stem + ます — polite non-past (present/future)",
      "ます-stem + ません — polite negative",
      "ます-stem + ました — polite past",
      "ます-stem + ませんでした — polite past negative",
    ],
    lesson: `The ます-form is the polite conjugation used in textbooks, with strangers, and in formal or business speech. To build it, first find the ます-stem: for godan verbs, change the final u-row kana to the i-row (飲[の]む→飲[の]み), for ichidan verbs drop る (食[た]べる→食[た]べ), and irregulars are する→し and 来[く]る→来[き]. Then attach ます/ません/ました/ませんでした for non-past, negative, past, and past-negative.

例[れい]えば: 毎日[まいにち]日本語[にほんご]を勉強[べんきょう]します (I study Japanese every day, non-past), 昨日[きのう]は勉強[べんきょう]しませんでした (I didn't study yesterday, past negative).

The plain form (だ/る-ending form) is used informally with friends and family, and is also the base every other grammar pattern in this course builds from (て-form, ば-form, etc.) — but ます-form is what you should default to in polite conversation and writing.

A common mistake is forgetting the u→i row shift for godan verbs — 飲[の]む does not become 飲[の]むます, it becomes 飲[の]みます. Another is trying to negate an い-adjective or noun with ません — that only works for verbs; adjectives and nouns use different negative patterns (くない for い-adjectives, じゃない for nouns/な-adjectives).`,
    examples: [
      { ja: "毎日[まいにち]日本語[にほんご]を勉強[べんきょう]します。", en: "I study Japanese every day." },
      { ja: "昨日[きのう]は雨[あめ]が降[ふ]りませんでした。", en: "It didn't rain yesterday." },
      { ja: "朝[あさ]ごはんを食[た]べませんでした。", en: "I didn't eat breakfast." },
      { ja: "来週[らいしゅう]京都[きょうと]へ行[い]きます。", en: "I will go to Kyoto next week." },
    ],
    related: ["n5.te-form"],
  },
  {
    id: "n5.te-form",
    level: "N5",
    category: "verb-forms",
    title: "て形",
    meaning: "て-form for requests (〜てください) and ongoing/states (〜ている)",
    formation: [
      "Godan: sound change by ending — く→いて, ぐ→いで, う/つ/る→って, ぬ/ぶ/む→んで, す→して",
      "Ichidan: drop る, add て (食[た]べる→食[た]べて)",
      "する→して, 来[く]る→来[き]て",
      "て-form + ください — polite request; て-form + いる/います — ongoing action or resulting state",
    ],
    lesson: `The て-form is a connector form used across a huge range of grammar points. Godan verbs change depending on their final kana: 書[か]く→書[か]いて, 泳[およ]ぐ→泳[およ]いで, 買[か]う→買[か]って, 待[ま]つ→待[ま]って, 帰[かえ]る→帰[かえ]って, 遊[あそ]ぶ→遊[あそ]んで, 飲[の]む→飲[の]んで, 話[はな]す→話[はな]して. Ichidan verbs just drop る and add て (見[み]る→見[み]て), and irregulars are する→して, 来[く]る→来[き]て.

Two major uses at N5: **〜てください** ("please do ~," a polite request or instruction), and **〜ている**, which covers both an action in progress ("is doing") and a resulting state after a change verb ("is/has become"). For example, 結婚[けっこん]している means "is married" (a resulting state), not "is marrying."

A common mistake is applying the continuous "is ~ing" translation to every 〜ている, when for instantaneous or change verbs like 知[し]る, 結婚[けっこん]する, and 住[す]む it actually expresses a resulting state, not an action mid-progress. The て-form also links clauses and sequential actions in a story: 窓[まど]を開[あ]けて、部屋[へや]に入[はい]った (opened the window, and entered the room).`,
    examples: [
      { ja: "窓[まど]を開[あ]けてください。", en: "Please open the window." },
      { ja: "今[いま]、テレビを見[み]ています。", en: "I am watching TV now." },
      { ja: "彼[かれ]は結婚[けっこん]しています。", en: "He is married." },
      { ja: "ちょっと待[ま]ってください。", en: "Please wait a moment." },
    ],
    related: ["n5.masu-form"],
  },
  {
    id: "n5.i-adjectives",
    level: "N5",
    category: "adjectives",
    title: "い形容詞",
    meaning: "い-adjective conjugation: plain/polite, negative, past",
    formation: [
      "Plain non-past: dictionary form ends in い (高[たか]い)",
      "Negative: drop い, add くない (高[たか]くない); polite くないです/くありません",
      "Past: drop い, add かった (高[たか]かった); polite かったです",
      "Past negative: drop い, add くなかった (高[たか]くなかった); polite くなかったです",
    ],
    lesson: `い-adjectives conjugate on their own — unlike な-adjectives and nouns, they need no copula (だ/です) to work as a predicate in plain speech: この本[ほん]は高[たか]い is already a complete sentence.

All four core forms are built by dropping the final い and adding an ending: 高[たか]い→高[たか]くない (negative), 高[たか]かった (past), 高[たか]くなかった (past negative). です can be added after any of these for politeness without changing the meaning: 高[たか]くないです is exactly as valid as 高[たか]くありません.

The one irregular い-adjective is いい (good) — it conjugates from the old stem よい for every form except the plain non-past: よくない, よかった, よくなかった — never いくない.

い-adjectives also have an adverbial form in く (早[はや]く起[お]きる — get up early) and a て-form in くて for connecting two adjectives (安[やす]くて、おいしいです — it's cheap and delicious).

A common mistake is adding だ after くない, thinking くないです isn't "complete" — くないです is perfectly correct on its own. The opposite mistake — attaching だ directly to an い-adjective (×高[たか]いだ) — is always wrong, since い-adjectives never take だ.`,
    examples: [
      { ja: "この本[ほん]は高[たか]いです。", en: "This book is expensive." },
      { ja: "昨日[きのう]は暑[あつ]くなかったです。", en: "It wasn't hot yesterday." },
      { ja: "あの映画[えいが]は面白[おもしろ]かったです。", en: "That movie was interesting." },
      { ja: "この店[みせ]の料理[りょうり]は安[やす]くておいしいです。", en: "This restaurant's food is cheap and delicious." },
    ],
    related: ["n5.na-adjectives"],
  },
  {
    id: "n5.na-adjectives",
    level: "N5",
    category: "adjectives",
    title: "な形容詞",
    meaning: "な-adjective usage: だ/です copula, な before nouns, negative/past via copula",
    formation: [
      "Predicate: stem + です/だ (静[しず]かです / 静[しず]かだ)",
      "Before a noun: stem + な (静[しず]かな部屋[へや])",
      "Negative: stem + じゃないです/ではありません",
      "Past: stem + でした/だった",
    ],
    lesson: `な-adjectives (sometimes called "adjectival nouns") behave grammatically like nouns — they need だ/です to work as a predicate, and な only appears when directly modifying a following noun: 静[しず]かな部屋[へや] (a quiet room) but 部屋[へや]は静[しず]かです (the room is quiet) — no な here, because 静[しず]か isn't modifying a noun in that sentence.

Negative and past forms are borrowed from the noun-style copula rather than conjugated internally, unlike い-adjectives: じゃない/ではない for negative, だった/でした for past. So 元気[げんき] (energetic) becomes 元気[げんき]じゃないです (not energetic) and 元気[げんき]でした (was energetic).

A common mistake is attaching な directly before です (×静[しず]かなです) — な only glues a な-adjective to a following noun, never to だ/です. Another trap is きれい (pretty/clean) and きらい (dislike): both end in い and look like い-adjectives, but they are actually な-adjectives — きれいな部屋[へや], not ×きれい部屋[へや].`,
    examples: [
      { ja: "この町[まち]は静[しず]かです。", en: "This town is quiet." },
      { ja: "静[しず]かな部屋[へや]がほしいです。", en: "I want a quiet room." },
      { ja: "田中[たなか]さんは料理[りょうり]が上手[じょうず]じゃないです。", en: "Mr. Tanaka is not good at cooking." },
      { ja: "子供[こども]の時[とき]、私[わたし]は元気[げんき]でした。", en: "When I was a child, I was energetic." },
    ],
    related: ["n5.i-adjectives"],
  },
  {
    id: "n5.tai-form",
    level: "N5",
    category: "expressions",
    title: "〜たい",
    meaning: "〜たい — want to do (first/second person desire)",
    formation: [
      "ます-stem + たい (飲[の]みたい, 食[た]べたい)",
      "たい conjugates like an い-adjective: たくない, たかった, たくなかった",
      "The object of a たい verb often takes が instead of を",
    ],
    lesson: `たい attaches to the ます-stem and expresses the speaker's own desire to do something (or, in questions, the listener's). Once attached, たい conjugates exactly like an い-adjective, since it functionally becomes one: 食[た]べたいです, 食[た]べたくないです, 食[た]べたかったです.

There's a particle shift to notice: with a direct object, を is often replaced by が to emphasize the thing desired — コーヒーが飲[の]みたい — though を is not wrong either.

たい normally can't describe a third person's desire directly; saying ×彼[かれ]は行[い]きたいです sounds odd, almost like you're reading his mind. To talk about someone else wanting something, Japanese uses 〜たがっている (an external, observed desire) — a separate, more advanced pattern. At N5, keep たい to your own wishes, or use it in questions addressed to the listener: あなたは何[なに]が食[た]べたいですか (what do you want to eat?).

A softer, very common way to state your own wish in polite speech is 〜たいと思[おも]います, which sounds less blunt than a bare たいです.`,
    examples: [
      { ja: "日本[にほん]へ行[い]きたいです。", en: "I want to go to Japan." },
      { ja: "何[なに]が食[た]べたいですか。", en: "What do you want to eat?" },
      { ja: "昨日[きのう]は誰[だれ]にも会[あ]いたくなかったです。", en: "Yesterday I didn't want to see anyone." },
      { ja: "冷[つめ]たい水[みず]が飲[の]みたいです。", en: "I want to drink cold water." },
    ],
    related: ["n5.masu-form"],
  },
  {
    id: "n5.aru-iru",
    level: "N5",
    category: "sentence-patterns",
    title: "ある・いる",
    meaning: "existence: ある for inanimate things/plants, いる for animate things (people/animals)",
    formation: [
      "Inanimate objects, plants: 〜があります (机[つくえ]の上[うえ]に本[ほん]があります)",
      "People, animals: 〜がいます (部屋[へや]に猫[ねこ]がいます)",
      "Pattern: [place]に[thing]が + ある/いる; negative ありません/いません",
    ],
    lesson: `Japanese uses two different verbs for "there is/are" depending on whether the thing existing has its own will and can move on its own: ある for inanimate objects, plants, and abstract things (机[つくえ]の上[うえ]に本[ほん]があります — there's a book on the desk; 明日[あした]試験[しけん]があります — there's a test tomorrow), and いる for people and animals (部屋[へや]に猫[ねこ]がいます — there's a cat in the room).

The basic pattern places the location first with に, then the thing with が: [place]に[thing]がある/いる. If instead you want to say *where* an already-known thing is, the thing becomes the topic and takes は: 猫[ねこ]は部屋[へや]にいます (the cat is in the room) — this swap between "what's in a place" and "where a known thing is" is the same は/が logic covered in n5.wa-ga.

Negative forms are ありません and いません.

A common mistake is using いる for plants and trees — 木[き] (a tree) takes ある, not いる, because even though it's alive, it can't move on its own. Another is forgetting to swap は/が depending on whether the location or the thing is already the known topic of conversation.`,
    examples: [
      { ja: "部屋[へや]に猫[ねこ]がいます。", en: "There is a cat in the room." },
      { ja: "机[つくえ]の上[うえ]に辞書[じしょ]があります。", en: "There is a dictionary on the desk." },
      { ja: "猫[ねこ]は部屋[へや]にいます。", en: "The cat is in the room." },
      { ja: "公園[こうえん]に木[き]がたくさんあります。", en: "There are many trees in the park." },
    ],
    related: ["n5.o-ni-de"],
  },
];

export const exercises: Exercise[] = [
  // -------------------------------------------------------------------
  // n5.wa-ga
  // -------------------------------------------------------------------
  {
    id: "n5.wa-ga.ex1",
    grammarPointId: "n5.wa-ga",
    source: "bank",
    kind: "translation",
    promptEn: "I am a teacher.",
    accepted: ["私[わたし]は先生[せんせい]です。", "先生[せんせい]です。"],
    hint: "state the topic with は",
  },
  {
    id: "n5.wa-ga.ex2",
    grammarPointId: "n5.wa-ga",
    source: "bank",
    kind: "translation",
    promptEn: "Who is coming to the party?",
    accepted: ["誰[だれ]がパーティーに来[き]ますか。", "パーティーに誰[だれ]が来[き]ますか。"],
    hint: "question words as subject take が",
  },
  {
    id: "n5.wa-ga.ex3",
    grammarPointId: "n5.wa-ga",
    source: "bank",
    kind: "cloze",
    sentence: "私[わたし]＿＿学生[がくせい]です。",
    accepted: ["は"],
    translationEn: "I am a student.",
  },
  {
    id: "n5.wa-ga.ex4",
    grammarPointId: "n5.wa-ga",
    source: "bank",
    kind: "cloze",
    sentence: "誰[だれ]＿＿来[き]ましたか。",
    accepted: ["が"],
    translationEn: "Who came?",
  },
  {
    id: "n5.wa-ga.ex5",
    grammarPointId: "n5.wa-ga",
    source: "bank",
    kind: "mcq",
    question: "教室[きょうしつ]に誰[だれ]＿＿いますか。",
    choices: ["は", "が", "を", "で"],
    correctIndex: 1,
    explanation: "誰 (who) as the grammatical subject always takes が, never は.",
  },
  {
    id: "n5.wa-ga.ex6",
    grammarPointId: "n5.wa-ga",
    source: "bank",
    kind: "mcq",
    question: "私[わたし]＿＿日本[にほん]の映画[えいが]が好[す]きです。",
    choices: ["は", "が", "を", "に"],
    correctIndex: 0,
    explanation: "私 is the topic being commented on ('as for me'); the liked thing 映画 takes が inside the comment.",
  },
  {
    id: "n5.wa-ga.ex7",
    grammarPointId: "n5.wa-ga",
    source: "bank",
    kind: "ordering",
    segments: ["あの", "人[ひと]は", "誰[だれ]", "ですか。"],
    starIndex: 2,
    translationEn: "Who is that person?",
  },

  // -------------------------------------------------------------------
  // n5.o-ni-de
  // -------------------------------------------------------------------
  {
    id: "n5.o-ni-de.ex1",
    grammarPointId: "n5.o-ni-de",
    source: "bank",
    kind: "translation",
    promptEn: "I write a letter every day.",
    accepted: ["毎日[まいにち]手紙[てがみ]を書[か]きます。", "毎日[まいにち]手紙[てがみ]を書[か]く。"],
    hint: "を marks the object",
  },
  {
    id: "n5.o-ni-de.ex2",
    grammarPointId: "n5.o-ni-de",
    source: "bank",
    kind: "translation",
    promptEn: "I go to the station by bicycle.",
    accepted: ["自転車[じてんしゃ]で駅[えき]に行[い]きます。", "自転車[じてんしゃ]で駅[えき]へ行[い]きます。"],
    hint: "で = means, に/へ = destination",
  },
  {
    id: "n5.o-ni-de.ex3",
    grammarPointId: "n5.o-ni-de",
    source: "bank",
    kind: "cloze",
    sentence: "私[わたし]は毎朝[まいあさ]コーヒー＿＿飲[の]みます。",
    accepted: ["を"],
    translationEn: "I drink coffee every morning.",
  },
  {
    id: "n5.o-ni-de.ex4",
    grammarPointId: "n5.o-ni-de",
    source: "bank",
    kind: "cloze",
    sentence: "図書館[としょかん]＿＿本[ほん]を読[よ]みます。",
    accepted: ["で"],
    translationEn: "I read a book at the library.",
  },
  {
    id: "n5.o-ni-de.ex5",
    grammarPointId: "n5.o-ni-de",
    source: "bank",
    kind: "mcq",
    question: "駅[えき]＿＿友達[ともだち]に会[あ]います。",
    choices: ["を", "に", "で", "が"],
    correctIndex: 2,
    explanation: "で marks where the meeting takes place; に would instead mark the person met, not the place.",
  },
  {
    id: "n5.o-ni-de.ex6",
    grammarPointId: "n5.o-ni-de",
    source: "bank",
    kind: "mcq",
    question: "土曜日[どようび]＿＿映画[えいが]を見[み]に行[い]きます。",
    choices: ["に", "で", "を", "が"],
    correctIndex: 0,
    explanation: "に marks the specific point in time (a day of the week) when the action happens.",
  },
  {
    id: "n5.o-ni-de.ex7",
    grammarPointId: "n5.o-ni-de",
    source: "bank",
    kind: "ordering",
    segments: ["毎週[まいしゅう]", "公園[こうえん]で", "サッカーを", "します。"],
    starIndex: 2,
    translationEn: "I play soccer in the park every week.",
  },

  // -------------------------------------------------------------------
  // n5.masu-form
  // -------------------------------------------------------------------
  {
    id: "n5.masu-form.ex1",
    grammarPointId: "n5.masu-form",
    source: "bank",
    kind: "translation",
    promptEn: "I watch TV every night.",
    accepted: ["毎晩[まいばん]テレビを見[み]ます。", "毎晩[まいばん]テレビを見[み]る。"],
  },
  {
    id: "n5.masu-form.ex2",
    grammarPointId: "n5.masu-form",
    source: "bank",
    kind: "translation",
    promptEn: "I didn't go to school yesterday.",
    accepted: ["昨日[きのう]学校[がっこう]へ行[い]きませんでした。", "昨日[きのう]学校[がっこう]に行[い]きませんでした。"],
  },
  {
    id: "n5.masu-form.ex3",
    grammarPointId: "n5.masu-form",
    source: "bank",
    kind: "cloze",
    sentence: "毎朝[まいあさ]コーヒーを＿＿ます。",
    accepted: ["飲[の]み"],
    translationEn: "I drink coffee every morning.",
  },
  {
    id: "n5.masu-form.ex4",
    grammarPointId: "n5.masu-form",
    source: "bank",
    kind: "cloze",
    sentence: "昨日[きのう]は誰[だれ]も＿＿。",
    accepted: ["来[き]ませんでした"],
    translationEn: "Nobody came yesterday.",
  },
  {
    id: "n5.masu-form.ex5",
    grammarPointId: "n5.masu-form",
    source: "bank",
    kind: "mcq",
    question: "今朝[けさ]新聞[しんぶん]を＿＿。",
    choices: ["読[よ]みます", "読[よ]みました", "読[よ]みません", "読[よ]みませんでした"],
    correctIndex: 1,
    explanation: "今朝 (this morning) refers to a completed past action, so the polite past ました is needed.",
  },
  {
    id: "n5.masu-form.ex6",
    grammarPointId: "n5.masu-form",
    source: "bank",
    kind: "mcq",
    question: "明日[あした]は忙[いそが]しいので、パーティーに＿＿。",
    choices: ["行[い]きます", "行[い]きました", "行[い]きません", "行[い]きませんでした"],
    correctIndex: 2,
    explanation: "明日 (tomorrow) is future, so the non-past negative 行きません is needed, not the past forms.",
  },
  {
    id: "n5.masu-form.ex7",
    grammarPointId: "n5.masu-form",
    source: "bank",
    kind: "ordering",
    segments: ["明日[あした]", "図書館[としょかん]で", "日本語[にほんご]を", "勉強[べんきょう]します。"],
    starIndex: 2,
    translationEn: "I will study Japanese at the library tomorrow.",
  },

  // -------------------------------------------------------------------
  // n5.te-form
  // -------------------------------------------------------------------
  {
    id: "n5.te-form.ex1",
    grammarPointId: "n5.te-form",
    source: "bank",
    kind: "translation",
    promptEn: "Please write your name here.",
    accepted: ["ここに名前[なまえ]を書[か]いてください。", "名前[なまえ]をここに書[か]いてください。"],
  },
  {
    id: "n5.te-form.ex2",
    grammarPointId: "n5.te-form",
    source: "bank",
    kind: "translation",
    promptEn: "I am reading a book now.",
    accepted: ["今[いま]、本[ほん]を読[よ]んでいます。", "今[いま]本[ほん]を読[よ]んでいます。"],
  },
  {
    id: "n5.te-form.ex3",
    grammarPointId: "n5.te-form",
    source: "bank",
    kind: "cloze",
    sentence: "部屋[へや]が寒[さむ]いです。ドアを＿＿ください。",
    accepted: ["閉[し]めて"],
    translationEn: "The room is cold. Please close the door.",
  },
  {
    id: "n5.te-form.ex4",
    grammarPointId: "n5.te-form",
    source: "bank",
    kind: "cloze",
    sentence: "山田[やまだ]さんは今[いま]、音楽[おんがく]を＿＿います。",
    accepted: ["聞[き]いて"],
    translationEn: "Mr. Yamada is listening to music now.",
  },
  {
    id: "n5.te-form.ex5",
    grammarPointId: "n5.te-form",
    source: "bank",
    kind: "mcq",
    question: "すみません、写真[しゃしん]を＿＿ください。",
    choices: ["撮[と]って", "撮[と]て", "撮[と]んで", "撮[と]きて"],
    correctIndex: 0,
    explanation: "撮る is a godan る-verb that takes the って sound change (like 待つ、乗る), so 撮って is correct.",
  },
  {
    id: "n5.te-form.ex6",
    grammarPointId: "n5.te-form",
    source: "bank",
    kind: "mcq",
    question: "田中[たなか]さんは今[いま]、椅子[いす]に＿＿います。",
    choices: ["座[すわ]って", "座[すわ]んで", "座[すわ]て", "座[すわ]いて"],
    correctIndex: 0,
    explanation: "座る is a godan る-verb using the って pattern: 座って.",
  },
  {
    id: "n5.te-form.ex7",
    grammarPointId: "n5.te-form",
    source: "bank",
    kind: "ordering",
    segments: ["ここで", "ちょっと", "待[ま]って", "ください。"],
    starIndex: 2,
    translationEn: "Please wait here for a moment.",
  },

  // -------------------------------------------------------------------
  // n5.i-adjectives
  // -------------------------------------------------------------------
  {
    id: "n5.i-adjectives.ex1",
    grammarPointId: "n5.i-adjectives",
    source: "bank",
    kind: "translation",
    promptEn: "This coffee is not hot.",
    accepted: ["このコーヒーは熱[あつ]くないです。", "このコーヒーは熱[あつ]くありません。"],
  },
  {
    id: "n5.i-adjectives.ex2",
    grammarPointId: "n5.i-adjectives",
    source: "bank",
    kind: "translation",
    promptEn: "Yesterday's test was difficult.",
    accepted: ["昨日[きのう]のテストは難[むずか]しかったです。", "昨日[きのう]のテストは難[むずか]しかった。"],
  },
  {
    id: "n5.i-adjectives.ex3",
    grammarPointId: "n5.i-adjectives",
    source: "bank",
    kind: "cloze",
    sentence: "去年[きょねん]の冬[ふゆ]は寒[さむ]＿＿。",
    accepted: ["くなかったです", "くなかった"],
    translationEn: "Last winter wasn't cold.",
  },
  {
    id: "n5.i-adjectives.ex4",
    grammarPointId: "n5.i-adjectives",
    source: "bank",
    kind: "cloze",
    sentence: "この靴[くつ]は＿＿ですから、買[か]いません。",
    accepted: ["高[たか]い"],
    translationEn: "These shoes are expensive, so I won't buy them.",
  },
  {
    id: "n5.i-adjectives.ex5",
    grammarPointId: "n5.i-adjectives",
    source: "bank",
    kind: "mcq",
    question: "この料理[りょうり]は＿＿です。とても好[す]きです。",
    choices: ["おいしい", "おいしいだ", "おいしかった", "おいしくて"],
    correctIndex: 0,
    explanation: "い-adjectives never take だ, and this is a simple present description, so plain おいしい + です is correct.",
  },
  {
    id: "n5.i-adjectives.ex6",
    grammarPointId: "n5.i-adjectives",
    source: "bank",
    kind: "mcq",
    question: "先週[せんしゅう]は仕事[しごと]がたくさんあって、とても＿＿。",
    choices: ["忙[いそが]しいでした", "忙[いそが]しかったです", "忙[いそが]しくないです", "忙[いそが]しいです"],
    correctIndex: 1,
    explanation: "先週 (last week) is past, so the past polite form 忙しかったです is needed — い-adjectives never combine directly with でした.",
  },
  {
    id: "n5.i-adjectives.ex7",
    grammarPointId: "n5.i-adjectives",
    source: "bank",
    kind: "ordering",
    segments: ["この", "部屋[へや]は", "小[ちい]さいですが", "明[あか]るいです。"],
    starIndex: 2,
    translationEn: "This room is small, but it's bright.",
  },

  // -------------------------------------------------------------------
  // n5.na-adjectives
  // -------------------------------------------------------------------
  {
    id: "n5.na-adjectives.ex1",
    grammarPointId: "n5.na-adjectives",
    source: "bank",
    kind: "translation",
    promptEn: "This town is lively.",
    accepted: ["この町[まち]は賑[にぎ]やかです。", "この町[まち]は賑[にぎ]やかだ。"],
  },
  {
    id: "n5.na-adjectives.ex2",
    grammarPointId: "n5.na-adjectives",
    source: "bank",
    kind: "translation",
    promptEn: "This place was not convenient.",
    accepted: ["ここは便利[べんり]じゃなかったです。", "ここは便利[べんり]ではありませんでした。"],
  },
  {
    id: "n5.na-adjectives.ex3",
    grammarPointId: "n5.na-adjectives",
    source: "bank",
    kind: "cloze",
    sentence: "山田[やまだ]さんはとても＿＿人[ひと]です。",
    accepted: ["親切[しんせつ]な"],
    translationEn: "Mr. Yamada is a very kind person.",
  },
  {
    id: "n5.na-adjectives.ex4",
    grammarPointId: "n5.na-adjectives",
    source: "bank",
    kind: "cloze",
    sentence: "この問題[もんだい]は＿＿じゃないです。",
    accepted: ["簡単[かんたん]"],
    translationEn: "This problem is not simple.",
  },
  {
    id: "n5.na-adjectives.ex5",
    grammarPointId: "n5.na-adjectives",
    source: "bank",
    kind: "mcq",
    question: "彼女[かのじょ]はダンスが＿＿です。",
    choices: ["上手[じょうず]", "上手[じょうず]な", "上手[じょうず]の", "上手[じょうず]で"],
    correctIndex: 0,
    explanation: "As a predicate before です, the な-adjective stem is used alone — な only attaches when directly modifying a following noun.",
  },
  {
    id: "n5.na-adjectives.ex6",
    grammarPointId: "n5.na-adjectives",
    source: "bank",
    kind: "mcq",
    question: "＿＿部屋[へや]で寝[ね]たいです。",
    choices: ["静[しず]かな", "静[しず]か", "静[しず]かの", "静[しず]かで"],
    correctIndex: 0,
    explanation: "静か directly modifies the following noun 部屋, so it needs な.",
  },
  {
    id: "n5.na-adjectives.ex7",
    grammarPointId: "n5.na-adjectives",
    source: "bank",
    kind: "ordering",
    segments: ["便利[べんり]な", "町[まち]に", "住[す]みたい", "です。"],
    starIndex: 1,
    translationEn: "I want to live in a convenient town.",
  },

  // -------------------------------------------------------------------
  // n5.tai-form
  // -------------------------------------------------------------------
  {
    id: "n5.tai-form.ex1",
    grammarPointId: "n5.tai-form",
    source: "bank",
    kind: "translation",
    promptEn: "I want to buy a new bag.",
    accepted: ["新[あたら]しいかばんが買[か]いたいです。", "新[あたら]しいかばんを買[か]いたいです。"],
  },
  {
    id: "n5.tai-form.ex2",
    grammarPointId: "n5.tai-form",
    source: "bank",
    kind: "translation",
    promptEn: "I didn't want to go to school yesterday.",
    accepted: ["昨日[きのう]は学校[がっこう]へ行[い]きたくなかったです。", "昨日[きのう]は学校[がっこう]に行[い]きたくなかったです。"],
  },
  {
    id: "n5.tai-form.ex3",
    grammarPointId: "n5.tai-form",
    source: "bank",
    kind: "cloze",
    sentence: "疲[つか]れましたから、少[すこ]し＿＿です。",
    accepted: ["休[やす]みたい"],
    translationEn: "I'm tired, so I want to rest a little.",
  },
  {
    id: "n5.tai-form.ex4",
    grammarPointId: "n5.tai-form",
    source: "bank",
    kind: "cloze",
    sentence: "喉[のど]が渇[かわ]きました。冷[つめ]たいジュースが＿＿。",
    accepted: ["飲[の]みたいです"],
    translationEn: "I'm thirsty. I want to drink cold juice.",
  },
  {
    id: "n5.tai-form.ex5",
    grammarPointId: "n5.tai-form",
    source: "bank",
    kind: "mcq",
    question: "旅行[りょこう]に行[い]く前[まえ]に、お金[かね]を＿＿。",
    choices: ["貯[た]めたいです", "貯[た]めたいでした", "貯[た]めたかったです", "貯[た]めたくないでした"],
    correctIndex: 0,
    explanation: "A current wish before a future trip is the plain present たい form, not a past or malformed negative.",
  },
  {
    id: "n5.tai-form.ex6",
    grammarPointId: "n5.tai-form",
    source: "bank",
    kind: "mcq",
    question: "去年[きょねん]、私[わたし]は医者[いしゃ]に＿＿。",
    choices: ["なりたいです", "なりたかったです", "なりたくないです", "なります"],
    correctIndex: 1,
    explanation: "去年 (last year) marks a past desire, so たい must conjugate to its past form たかった, like an い-adjective.",
  },
  {
    id: "n5.tai-form.ex7",
    grammarPointId: "n5.tai-form",
    source: "bank",
    kind: "ordering",
    segments: ["日本[にほん]で", "寿司[すし]が", "食[た]べたい", "です。"],
    starIndex: 1,
    translationEn: "I want to eat sushi in Japan.",
  },

  // -------------------------------------------------------------------
  // n5.aru-iru
  // -------------------------------------------------------------------
  {
    id: "n5.aru-iru.ex1",
    grammarPointId: "n5.aru-iru",
    source: "bank",
    kind: "translation",
    promptEn: "There is a dog in the garden.",
    accepted: ["庭[にわ]に犬[いぬ]がいます。", "犬[いぬ]が庭[にわ]にいます。"],
    hint: "animate → いる",
  },
  {
    id: "n5.aru-iru.ex2",
    grammarPointId: "n5.aru-iru",
    source: "bank",
    kind: "translation",
    promptEn: "There isn't any money in my wallet.",
    accepted: ["財布[さいふ]にお金[かね]がありません。", "財布[さいふ]の中[なか]にお金[かね]がありません。"],
  },
  {
    id: "n5.aru-iru.ex3",
    grammarPointId: "n5.aru-iru",
    source: "bank",
    kind: "cloze",
    sentence: "教室[きょうしつ]に学生[がくせい]が三人[さんにん]＿＿。",
    accepted: ["います"],
    translationEn: "There are three students in the classroom.",
  },
  {
    id: "n5.aru-iru.ex4",
    grammarPointId: "n5.aru-iru",
    source: "bank",
    kind: "cloze",
    sentence: "冷蔵庫[れいぞうこ]に卵[たまご]が＿＿。",
    accepted: ["あります"],
    translationEn: "There are eggs in the fridge.",
  },
  {
    id: "n5.aru-iru.ex5",
    grammarPointId: "n5.aru-iru",
    source: "bank",
    kind: "mcq",
    question: "庭[にわ]に大[おお]きい木[き]が＿＿。",
    choices: ["います", "いません", "あります", "あった"],
    correctIndex: 2,
    explanation: "木 (a tree) is inanimate/immobile, so it takes ある, not いる, even though it's a living thing.",
  },
  {
    id: "n5.aru-iru.ex6",
    grammarPointId: "n5.aru-iru",
    source: "bank",
    kind: "mcq",
    question: "図書館[としょかん]に誰[だれ]も＿＿。",
    choices: ["いません", "ありません", "いない", "ありませんでした"],
    correctIndex: 0,
    explanation: "誰も (no one) with the animate existence verb needs the negative いません, not ありません, which is for inanimate things.",
  },
  {
    id: "n5.aru-iru.ex7",
    grammarPointId: "n5.aru-iru",
    source: "bank",
    kind: "ordering",
    segments: ["駅[えき]の", "前[まえ]に", "銀行[ぎんこう]が", "あります。"],
    starIndex: 2,
    translationEn: "There is a bank in front of the station.",
  },
];

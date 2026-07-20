// N5 grammar batch 1 — particles: 6 points with lessons, examples, and bank
// exercises. Furigana notation throughout (see src/engine/furigana.ts).

import type { Exercise, GrammarPoint } from "../../types";

export const points: GrammarPoint[] = [
  {
    id: "n5.no",
    level: "N5",
    category: "particles",
    title: "〜の",
    meaning: "の — possession, noun-to-noun modification, and the pronoun の (\"mine\")",
    formation: [
      "[owner]の[thing] — 私の本 (my book)",
      "[category/attribute]の[noun] — 日本語の先生 (a teacher of Japanese)",
      "[owner]の with the noun omitted — 私のです (it's mine)",
      "誰の〜 / 誰のですか — whose ~ / whose is it?",
    ],
    lesson: `の links two nouns, with the first noun describing the second. The most familiar use is possession — 私[わたし]の本[ほん] (my book) — but の is much broader than English "'s": it also marks category, material, origin, and position (日本語[にほんご]の先生[せんせい] — a Japanese-language teacher; 東京[とうきょう]の大学[だいがく] — a university in Tokyo).

Chains are allowed and read left to right, with each の-phrase narrowing the next noun: 私[わたし]の友達[ともだち]の車[くるま] — my friend's car.

When the second noun is obvious from context, drop it and let の stand in for it like English "mine/yours": この傘[かさ]は私[わたし]のです (this umbrella is mine). Questions use 誰[だれ]の: これは誰[だれ]のですか (whose is this?).

- **Order matters**: the describing noun comes FIRST. "My friend" is 私[わたし]の友達[ともだち], never 友達[ともだち]の私[わたし] (that means "the me who belongs to my friend").
- Don't confuse の with な: な-adjectives connect with な (静[しず]かな町[まち]), nouns connect with の (石[いし]の家[いえ] — a stone house).

A common mistake is dropping の between nouns because English can stack them ("Japanese teacher"): ×日本語[にほんご]先生[せんせい] is wrong — Japanese almost always needs the の.`,
    examples: [
      { ja: "これは私[わたし]の本[ほん]です。", en: "This is my book." },
      { ja: "日本語[にほんご]の先生[せんせい]は田中[たなか]さんです。", en: "The Japanese teacher is Mr. Tanaka." },
      { ja: "この傘[かさ]は誰[だれ]のですか。", en: "Whose umbrella is this?" },
      { ja: "その赤[あか]いかばんは妹[いもうと]のです。", en: "That red bag is my little sister's." },
    ],
    related: ["n5.wa-ga", "n5.na-adjectives", "n5.no-ga-suki"],
  },
  {
    id: "n5.mo",
    level: "N5",
    category: "particles",
    title: "〜も",
    meaning: "も — also/too; も…も both/neither; 何も・誰も + negative",
    formation: [
      "[noun]も — replaces は/が/を: 私も学生です (I'm a student too)",
      "[noun]にも / [noun]でも etc. — も stacks AFTER に・で・へ",
      "AもBも — both A and B; with a negative, neither A nor B",
      "何も・誰も・どこも + negative — nothing / no one / nowhere",
    ],
    lesson: `も means "also / too." It REPLACES は, が, and を rather than sitting next to them: 私[わたし]も学生[がくせい]です (I'm also a student) — never ×私[わたし]はも. With other particles (に, で, へ), も stacks after them instead of replacing: 大阪[おおさか]にも行[い]きました (I went to Osaka too).

Note what も claims: 私[わたし]も学生[がくせい]です says "I, too, am a student" (someone else is one). The "also" always attaches to the noun right before も.

Doubling gives "both … and": 兄[あに]も姉[あね]も東京[とうきょう]にいます (both my brother and my sister are in Tokyo). With a negative predicate the same pattern flips to "neither … nor": 肉[にく]も魚[さかな]も食[た]べません (I eat neither meat nor fish).

Question words + も + negative make total negatives:

- 何[なに]も食[た]べません — I won't eat anything.
- 誰[だれ]もいません — nobody is here.
- どこも行[い]きませんでした — I didn't go anywhere.

A common mistake is keeping the original particle (×私[わたし]がも) or using も with a question word in an affirmative sentence where 〜か is needed instead (何[なに]か食[た]べます — I'll eat something; 何[なに]も needs a negative).`,
    examples: [
      { ja: "私[わたし]も学生[がくせい]です。", en: "I am a student, too." },
      { ja: "田中[たなか]さんは中国語[ちゅうごくご]も勉強[べんきょう]しています。", en: "Mr. Tanaka is studying Chinese as well." },
      { ja: "昨日[きのう]は何[なに]も食[た]べませんでした。", en: "I didn't eat anything yesterday." },
      { ja: "東京[とうきょう]にも大阪[おおさか]にも行[い]きたいです。", en: "I want to go to both Tokyo and Osaka." },
    ],
    related: ["n5.wa-ga", "n5.dake-shika"],
  },
  {
    id: "n5.to-ya",
    level: "N5",
    category: "particles",
    title: "〜と・〜や(〜など)",
    meaning: "listing nouns: と = complete list (\"A and B\"), や(…など) = open list (\"A and B, among others\")",
    formation: [
      "AとB — A and B (nothing else): ペンとノート",
      "AやB(など) — A and B, among other things: パンや卵など",
      "など — \"and so on,\" often closing a や list",
    ],
    lesson: `Both と and や join nouns like English "and," but they promise different things.

**と is exhaustive**: the list is complete. 机[つくえ]の上[うえ]にペンとノートがあります means the pen and the notebook are all there is to report. と only joins nouns — it can never join whole sentences the way English "and" does (that's what the て-form is for).

**や is open-ended**: it gives examples from a longer list. 朝[あさ]はパンや卵[たまご]を食[た]べます implies bread and eggs are typical, but not the whole story. や lists often end with など ("and so on"): パンや卵[たまご]などを食[た]べます.

Choosing between them changes the claim, not the grammar:

- 「何[なに]を買[か]いましたか。」「りんごとバナナを買[か]いました。」 — that's the complete shopping list.
- 「りんごやバナナを買[か]いました。」 — those are highlights; there was more.

Watch out for these common mistakes:

- ×〜となど — など pairs with や, not と (a complete list has no "and so on").
- Using と to join sentences: ×食[た]べると寝[ね]ました for "I ate and slept" — use the て-form (食[た]べて寝[ね]ました).

(と has a separate "together with a person" use — 友達[ともだち]と行[い]きます — covered with the companion particles.)`,
    examples: [
      { ja: "机[つくえ]の上[うえ]にペンとノートがあります。", en: "There are a pen and a notebook on the desk." },
      { ja: "朝[あさ]ごはんはいつもパンや卵[たまご]などを食[た]べます。", en: "For breakfast I usually eat things like bread and eggs." },
      { ja: "スーパーで野菜[やさい]や肉[にく]を買[か]いました。", en: "I bought vegetables, meat, and so on at the supermarket." },
      { ja: "家[いえ]には犬[いぬ]と猫[ねこ]がいます。", en: "We have a dog and a cat at home." },
    ],
    related: ["n5.o-ni-de", "n5.aru-iru"],
  },
  {
    id: "n5.kara-made",
    level: "N5",
    category: "particles",
    title: "〜から・〜まで",
    meaning: "から = from (starting point), まで = until/as far as (end point) — time and place",
    formation: [
      "[time/place]から — from: 九時から, 東京から",
      "[time/place]まで — until / as far as: 五時まで, 駅まで",
      "AからBまで — from A to B (they pair up but can each stand alone)",
    ],
    lesson: `から marks a starting point and まで an end point — and unlike English "from/to," they work identically for **time and space**.

- 銀行[ぎんこう]は九時[くじ]から三時[さんじ]までです。 — The bank is open from 9 to 3.
- 家[いえ]から駅[えき]まで歩[ある]きます。 — I walk from home to the station.

They don't have to appear as a pair. Each stands alone happily: 授業[じゅぎょう]は十時[じゅうじ]から始[はじ]まります (class starts at/from 10); このバスは空港[くうこう]まで行[い]きます (this bus goes as far as the airport).

まで is stronger than に/へ for destinations: 駅[えき]まで走[はし]りました emphasizes covering the whole distance up to the station, while 駅[えき]に行[い]きました just names the destination.

Two cautions:

- **まで vs までに**: まで means an action continues UP TO a time (五時[ごじ]まで働[はたら]きます — I work until 5). までに ("by ~", a deadline) is a separate N4 pattern — don't reach for it yet, but don't be surprised when you meet it.
- から here attaches to nouns. Attached to the end of a clause, から instead means "because" — 時間[じかん]がないから (because there's no time). Same kana, different job; the noun-vs-clause attachment tells you which is which.`,
    examples: [
      { ja: "銀行[ぎんこう]は九時[くじ]から三時[さんじ]までです。", en: "The bank is open from 9 to 3." },
      { ja: "家[いえ]から駅[えき]まで歩[ある]いて十分[じゅっぷん]です。", en: "It's a ten-minute walk from my house to the station." },
      { ja: "夏休[なつやす]みは七月[しちがつ]から始[はじ]まります。", en: "Summer vacation starts in July." },
      { ja: "このバスは東京駅[とうきょうえき]まで行[い]きますか。", en: "Does this bus go to Tokyo Station?" },
    ],
    related: ["n5.o-ni-de", "n5.kara-reason"],
  },
  {
    id: "n5.dake-shika",
    level: "N5",
    category: "particles",
    title: "〜だけ・〜しか〜ない",
    meaning: "only: だけ (+ affirmative, neutral) vs しか (+ negative, \"no more than that\")",
    formation: [
      "[noun]だけ + affirmative — 一つだけあります (there's just one)",
      "[noun]しか + NEGATIVE — 一つしかありません (there's only one)",
      "しか replaces が/を; other particles keep しか after them (〜にしか etc.)",
    ],
    lesson: `Japanese has two "only"s, and they are not interchangeable.

**だけ** is the neutral one. It attaches to a noun and the sentence stays affirmative: 学生[がくせい]が一人[ひとり]だけいます — there's just one student. No feeling attached; it simply limits.

**しか** MUST be followed by a negative predicate, and together しか〜ない means "nothing but ~," with a built-in feeling that the amount is small or disappointing: 財布[さいふ]に百円[ひゃくえん]しかありません — I've got only 100 yen (and that's not much). The negative here is grammatical glue, not real negation — the sentence's meaning is positive ("I have 100 yen"), just limited.

Compare:

- 水[みず]だけ飲[の]みました。 — I drank just water. (plain fact)
- 水[みず]しか飲[の]みませんでした。 — Water was the ONLY thing I drank. (and I wish there'd been more)

Particle mechanics: しか replaces が and を (水[みず]しか飲[の]まない), but follows other particles (日曜日[にちようび]にしか会[あ]えません — we can meet only on Sundays). だけ can sit before or after を/が, and both orders are heard.

The classic mistake is しか with an affirmative — ×百円[ひゃくえん]しかあります is simply broken. If the verb is affirmative, you want だけ.`,
    examples: [
      { ja: "教室[きょうしつ]に学生[がくせい]が一人[ひとり]だけいます。", en: "There is just one student in the classroom." },
      { ja: "財布[さいふ]に百円[ひゃくえん]しかありません。", en: "I have only 100 yen in my wallet." },
      { ja: "昨日[きのう]は少[すこ]しだけ勉強[べんきょう]しました。", en: "I studied just a little yesterday." },
      { ja: "日本語[にほんご]は少[すこ]ししか分[わ]かりません。", en: "I understand only a little Japanese." },
    ],
    related: ["n5.mo", "n5.aru-iru"],
  },
  {
    id: "n5.yori-hou-ga",
    level: "N5",
    category: "sentence-patterns",
    title: "〜より・〜のほうが・いちばん",
    meaning: "comparisons: A is more ~ than B; which is more ~?; the most ~ (superlative)",
    formation: [
      "AはBより[adj] — A is more [adj] than B",
      "BよりAのほうが[adj] — A is the more [adj] one (compared with B)",
      "AとBと、どちらが[adj]ですか — which is more [adj], A or B? → Aのほうが…",
      "[group]の中で、Aがいちばん[adj] — A is the most [adj] in [group]",
    ],
    lesson: `Japanese adjectives never change form to compare — no "-er" or "-est." The work is done by より, のほうが, and いちばん.

**より** marks the loser of the comparison: 東京[とうきょう]は大阪[おおさか]より大[おお]きいです — Tokyo is bigger than Osaka. The adjective stays in its plain form.

**のほうが** highlights the winner: 電車[でんしゃ]のほうがバスより速[はや]いです. You can use either or both — より alone, のほうが alone, or the pair together.

Two-item questions use どちら: AとBと、どちらが好[す]きですか (which do you like better, A or B?). The natural answer echoes のほうが: Aのほうが好[す]きです. どちら never changes for people vs things.

**いちばん** ("number one") makes superlatives, usually with a group marked by 〜の中[なか]で: 季節[きせつ]の中[なか]で夏[なつ]がいちばん好[す]きです — of the seasons, I like summer best. Question word matters here: for three or more items ask with 何[なに]/どこ/誰[だれ] (+がいちばん), not どちら.

Common mistakes:

- Answering a どちら question with いちばん — for two items use のほうが.
- Trying to conjugate the adjective (×大[おお]きより) — より attaches to the NOUN being compared against.`,
    examples: [
      { ja: "東京[とうきょう]は大阪[おおさか]より大[おお]きいです。", en: "Tokyo is bigger than Osaka." },
      { ja: "バスより電車[でんしゃ]のほうが速[はや]いです。", en: "The train is faster than the bus." },
      { ja: "「犬[いぬ]と猫[ねこ]と、どちらが好[す]きですか。」「猫[ねこ]のほうが好[す]きです。」", en: "\"Which do you like better, dogs or cats?\" \"I like cats better.\"" },
      { ja: "飲[の]み物[もの]の中[なか]でお茶[ちゃ]がいちばん好[す]きです。", en: "Among drinks, I like tea the best." },
    ],
    related: ["n5.i-adjectives", "n5.no-ga-suki"],
  },
];

export const exercises: Exercise[] = [
  // ---- n5.no ------------------------------------------------------------
  {
    id: "n5.no.ex1",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "translation",
    promptEn: "This is my friend's car.",
    accepted: [
      "これは友達[ともだち]の車[くるま]です。",
      "これは私[わたし]の友達[ともだち]の車[くるま]です。",
      "これは友達[ともだち]の車[くるま]だ。",
    ],
  },
  {
    id: "n5.no.ex2",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "translation",
    promptEn: "Whose umbrella is this?",
    accepted: [
      "これは誰[だれ]の傘[かさ]ですか。",
      "この傘[かさ]は誰[だれ]のですか。",
    ],
    hint: "two natural shapes: 誰の + noun, or 誰の with the noun dropped",
  },
  {
    id: "n5.no.ex3",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "cloze",
    sentence: "これは母[はは]＿＿かばんです。",
    accepted: ["の"],
    translationEn: "This is my mother's bag.",
  },
  {
    id: "n5.no.ex4",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "cloze",
    sentence: "この靴[くつ]は私[わたし]のじゃなくて、姉[あね]＿＿です。",
    accepted: ["の"],
    translationEn: "These shoes aren't mine — they're my older sister's.",
  },
  {
    id: "n5.no.ex5",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "mcq",
    question: "これは＿＿かばんです。",
    choices: ["私[わたし]の", "私[わたし]は", "私[わたし]が", "私[わたし]も"],
    correctIndex: 0,
    explanation:
      "Possession before a noun needs の: 私のかばん \"my bag.\" は・が・も mark a noun's role in the sentence and cannot link it to a following noun.",
  },
  {
    id: "n5.no.ex6",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "mcq",
    question: "「この辞書[じしょ]は誰[だれ]のですか。」「田中[たなか]さん＿＿です。」",
    choices: ["の", "は", "が", "を"],
    correctIndex: 0,
    explanation:
      "With the noun omitted, の stands in for it: 田中さんの(辞書)です \"it's Mr. Tanaka's.\" 田中さんはです/がです are ungrammatical — nothing follows は/が here.",
  },
  {
    id: "n5.no.ex7",
    grammarPointId: "n5.no",
    source: "bank",
    kind: "ordering",
    segments: ["これは", "誰[だれ]の", "傘[かさ]", "ですか。"],
    starIndex: 1,
    translationEn: "Whose umbrella is this?",
  },

  // ---- n5.mo ------------------------------------------------------------
  {
    id: "n5.mo.ex1",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "translation",
    promptEn: "Mr. Yamada is a teacher, too.",
    accepted: [
      "山田[やまだ]さんも先生[せんせい]です。",
      "山田[やまだ]さんも先生[せんせい]だ。",
    ],
  },
  {
    id: "n5.mo.ex2",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "translation",
    promptEn: "I drank coffee. I drank tea, too.",
    accepted: [
      "コーヒーを飲[の]みました。お茶[ちゃ]も飲[の]みました。",
      "コーヒーを飲[の]んだ。お茶[ちゃ]も飲[の]んだ。",
    ],
    hint: "も replaces を in the second sentence",
  },
  {
    id: "n5.mo.ex3",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "cloze",
    sentence: "「私[わたし]は猫[ねこ]が好[す]きです。」「私[わたし]＿＿好[す]きです。」",
    accepted: ["も"],
    translationEn: "\"I like cats.\" \"I like them too.\"",
  },
  {
    id: "n5.mo.ex4",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "cloze",
    sentence: "今朝[けさ]は何[なに]＿＿食[た]べませんでした。",
    accepted: ["も"],
    translationEn: "I didn't eat anything this morning.",
  },
  {
    id: "n5.mo.ex5",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "mcq",
    question: "部屋[へや]には誰[だれ]＿＿いません。",
    choices: ["も", "が", "は", "か"],
    correctIndex: 0,
    explanation:
      "Question word + も + negative = total negative: 誰もいません \"nobody is here.\" 誰が/誰は + negative is ungrammatical, and 誰か (\"someone\") clashes with the plain negative statement.",
  },
  {
    id: "n5.mo.ex6",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "mcq",
    question: "弟[おとうと]は肉[にく]も魚[さかな]＿＿食[た]べません。",
    choices: ["も", "を", "は", "が"],
    correctIndex: 0,
    explanation:
      "AもBも + negative = \"neither A nor B.\" After starting the pattern with 肉も, the second item must also take も — switching back to を/は/が breaks the pairing.",
  },
  {
    id: "n5.mo.ex7",
    grammarPointId: "n5.mo",
    source: "bank",
    kind: "ordering",
    segments: ["私[わたし]の", "母[はは]も", "料理[りょうり]が", "好[す]きです。"],
    starIndex: 1,
    translationEn: "My mother likes cooking, too.",
  },

  // ---- n5.to-ya ---------------------------------------------------------
  {
    id: "n5.to-ya.ex1",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "translation",
    promptEn: "There are a book and a dictionary on the desk.",
    accepted: [
      "机[つくえ]の上[うえ]に本[ほん]と辞書[じしょ]があります。",
      "本[ほん]と辞書[じしょ]が机[つくえ]の上[うえ]にあります。",
    ],
    hint: "a complete two-item list — use と",
  },
  {
    id: "n5.to-ya.ex2",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "translation",
    promptEn: "I bought vegetables, fruit, and so on at the supermarket.",
    accepted: [
      "スーパーで野菜[やさい]や果物[くだもの]などを買[か]いました。",
      "スーパーで野菜[やさい]や果物[くだもの]を買[か]いました。",
    ],
    hint: "an open list — use や(…など)",
  },
  {
    id: "n5.to-ya.ex3",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "cloze",
    sentence: "冷蔵庫[れいぞうこ]に卵[たまご]＿＿牛乳[ぎゅうにゅう]などがあります。",
    accepted: ["や"],
    translationEn: "In the fridge there are eggs, milk, and things like that.",
  },
  {
    id: "n5.to-ya.ex4",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "cloze",
    sentence: "日曜日[にちようび]に田中[たなか]さん＿＿山田[やまだ]さんが来[き]ました。",
    accepted: ["と", "や"],
    translationEn: "Mr. Tanaka and Mr. Yamada came on Sunday.",
  },
  {
    id: "n5.to-ya.ex5",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "mcq",
    question: "朝[あさ]ごはんはいつもごはん＿＿みそしるなどを食[た]べます。",
    choices: ["や", "と", "も", "を"],
    correctIndex: 0,
    explanation:
      "など (\"and so on\") pairs with the open-list particle や. と claims a complete list, which contradicts など; も and を can't join the two nouns.",
  },
  {
    id: "n5.to-ya.ex6",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "mcq",
    question: "「机[つくえ]の上[うえ]に何[なに]がありますか。」「ペン＿＿ノートがあります。それだけです。」",
    choices: ["と", "や", "の", "へ"],
    correctIndex: 0,
    explanation:
      "それだけです (\"that's all\") signals a complete list, so exhaustive と is the fit. や would imply there is more, contradicting それだけです.",
  },
  {
    id: "n5.to-ya.ex7",
    grammarPointId: "n5.to-ya",
    source: "bank",
    kind: "ordering",
    segments: ["私[わたし]は", "りんごや", "バナナなどの", "果物[くだもの]が", "好[す]きです。"],
    starIndex: 2,
    translationEn: "I like fruit such as apples and bananas.",
  },

  // ---- n5.kara-made ------------------------------------------------------
  {
    id: "n5.kara-made.ex1",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "translation",
    promptEn: "The class is from 9 o'clock to 12 o'clock.",
    accepted: [
      "授業[じゅぎょう]は九時[くじ]から十二時[じゅうにじ]までです。",
      "クラスは九時[くじ]から十二時[じゅうにじ]までです。",
    ],
  },
  {
    id: "n5.kara-made.ex2",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "translation",
    promptEn: "I walked from the station to the hotel.",
    accepted: [
      "駅[えき]からホテルまで歩[ある]きました。",
      "駅[えき]からホテルまで歩[ある]いて行[い]きました。",
    ],
  },
  {
    id: "n5.kara-made.ex3",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "cloze",
    sentence: "会議[かいぎ]は二時[にじ]＿＿四時[よじ]までです。",
    accepted: ["から"],
    translationEn: "The meeting is from 2 to 4.",
  },
  {
    id: "n5.kara-made.ex4",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "cloze",
    sentence: "昨日[きのう]は朝[あさ]から晩[ばん]＿＿働[はたら]きました。",
    accepted: ["まで"],
    translationEn: "Yesterday I worked from morning till night.",
  },
  {
    id: "n5.kara-made.ex5",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "mcq",
    question: "テストは十時[じゅうじ]＿＿始[はじ]まります。",
    choices: ["から", "まで", "を", "で"],
    correctIndex: 0,
    explanation:
      "始まります (\"starts\") wants the starting point, so から. まで would mark an end point, and を/で don't mark a start time.",
  },
  {
    id: "n5.kara-made.ex6",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "mcq",
    question: "駅[えき]＿＿家[いえ]まで自転車[じてんしゃ]で帰[かえ]りました。",
    choices: ["から", "まで", "に", "を"],
    correctIndex: 0,
    explanation:
      "The まで later in the sentence marks the end point, so the gap needs the matching start point から: 駅から家まで \"from the station to my house.\"",
  },
  {
    id: "n5.kara-made.ex7",
    grammarPointId: "n5.kara-made",
    source: "bank",
    kind: "ordering",
    segments: ["デパートは", "十時[じゅうじ]から", "八時[はちじ]まで", "開[あ]いています。"],
    starIndex: 1,
    translationEn: "The department store is open from 10 to 8.",
  },

  // ---- n5.dake-shika ------------------------------------------------------
  {
    id: "n5.dake-shika.ex1",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "translation",
    promptEn: "There is only one egg in the refrigerator.",
    accepted: [
      "冷蔵庫[れいぞうこ]に卵[たまご]が一[ひと]つしかありません。",
      "冷蔵庫[れいぞうこ]に卵[たまご]は一[ひと]つしかありません。",
      "冷蔵庫[れいぞうこ]に卵[たまご]が一[ひと]つしかない。",
    ],
    hint: "use しか〜ない",
  },
  {
    id: "n5.dake-shika.ex2",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "translation",
    promptEn: "I watched TV for just thirty minutes.",
    accepted: [
      "テレビを三十分[さんじゅっぷん]だけ見[み]ました。",
      "三十分[さんじゅっぷん]だけテレビを見[み]ました。",
    ],
    hint: "use だけ (the verb stays affirmative)",
  },
  {
    id: "n5.dake-shika.ex3",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "cloze",
    sentence: "今朝[けさ]はコーヒー＿＿飲[の]みませんでした。",
    accepted: ["しか"],
    translationEn: "This morning I drank nothing but coffee.",
  },
  {
    id: "n5.dake-shika.ex4",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "cloze",
    sentence: "パーティーに友達[ともだち]が三人[さんにん]＿＿来[き]ました。",
    accepted: ["だけ"],
    translationEn: "Only three friends came to the party.",
  },
  {
    id: "n5.dake-shika.ex5",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "mcq",
    question: "今[いま]、財布[さいふ]に五百円[ごひゃくえん]＿＿ありません。",
    choices: ["しか", "だけ", "も", "を"],
    correctIndex: 0,
    explanation:
      "The negative ありません is the signal for しか: 五百円しかありません \"I have only 500 yen.\" だけ pairs with an affirmative (五百円だけあります).",
  },
  {
    id: "n5.dake-shika.ex6",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "mcq",
    question: "休[やす]みは日曜日[にちようび]＿＿です。",
    choices: ["だけ", "しか", "まで", "から"],
    correctIndex: 0,
    explanation:
      "The predicate です is affirmative, so only だけ works: 日曜日だけです \"only Sundays.\" しか demands a negative (しか〜ない).",
  },
  {
    id: "n5.dake-shika.ex7",
    grammarPointId: "n5.dake-shika",
    source: "bank",
    kind: "ordering",
    segments: ["教室[きょうしつ]には", "学生[がくせい]が", "一人[ひとり]しか", "いません。"],
    starIndex: 2,
    translationEn: "There is only one student in the classroom.",
  },

  // ---- n5.yori-hou-ga ------------------------------------------------------
  {
    id: "n5.yori-hou-ga.ex1",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "translation",
    promptEn: "Japanese is more difficult than English.",
    accepted: [
      "日本語[にほんご]は英語[えいご]より難[むずか]しいです。",
      "英語[えいご]より日本語[にほんご]のほうが難[むずか]しいです。",
      "日本語[にほんご]のほうが英語[えいご]より難[むずか]しいです。",
    ],
  },
  {
    id: "n5.yori-hou-ga.ex2",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "translation",
    promptEn: "Of the seasons, I like summer the best.",
    accepted: [
      "季節[きせつ]の中[なか]で夏[なつ]がいちばん好[す]きです。",
      "季節[きせつ]の中[なか]では夏[なつ]がいちばん好[す]きです。",
    ],
    hint: "superlative: 〜の中で + いちばん",
  },
  {
    id: "n5.yori-hou-ga.ex3",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "cloze",
    sentence: "飛行機[ひこうき]は新幹線[しんかんせん]＿＿速[はや]いです。",
    accepted: ["より"],
    translationEn: "Airplanes are faster than the bullet train.",
  },
  {
    id: "n5.yori-hou-ga.ex4",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "cloze",
    sentence: "「コーヒーと紅茶[こうちゃ]と、どちらが好[す]きですか。」「コーヒーの＿＿が好[す]きです。」",
    accepted: ["ほう"],
    translationEn: "\"Which do you like better, coffee or black tea?\" \"I like coffee better.\"",
  },
  {
    id: "n5.yori-hou-ga.ex5",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "mcq",
    question: "クラスの中[なか]で田中[たなか]さんが＿＿背[せ]が高[たか]いです。",
    choices: ["いちばん", "より", "ほうが", "だけ"],
    correctIndex: 0,
    explanation:
      "〜の中で marks a group of three or more, so the superlative いちばん fits. より and ほうが compare exactly two things and can't follow が here.",
  },
  {
    id: "n5.yori-hou-ga.ex6",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "mcq",
    question: "「バスと電車[でんしゃ]と、どちらが便利[べんり]ですか。」「電車[でんしゃ]＿＿便利[べんり]です。」",
    choices: ["のほうが", "がいちばん", "より", "だけ"],
    correctIndex: 0,
    explanation:
      "A two-item どちら question is answered with のほうが. いちばん is for groups of three or more, and 電車より would mean \"more convenient than the train,\" contradicting the answer.",
  },
  {
    id: "n5.yori-hou-ga.ex7",
    grammarPointId: "n5.yori-hou-ga",
    source: "bank",
    kind: "ordering",
    lead: "スポーツの中[なか]で",
    segments: ["サッカーが", "いちばん", "おもしろいです。"],
    starIndex: 1,
    translationEn: "Of all sports, soccer is the most interesting.",
  },
];

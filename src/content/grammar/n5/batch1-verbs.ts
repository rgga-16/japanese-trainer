// N5 grammar batch 1: verb forms — plain non-past, plain past, ている, invitations,
// purpose-of-movement に行く, and ないでください. 6 points with lessons, examples,
// and bank exercises. Furigana notation throughout (see src/engine/furigana.ts).

import type { Exercise, GrammarPoint } from "../../types";

export const points: GrammarPoint[] = [
  {
    id: "n5.plain-form",
    level: "N5",
    category: "verb-forms",
    title: "辞書形・ない形",
    meaning: "plain non-past: dictionary form (affirmative) and ない-form (negative)",
    formation: [
      "Godan: shift the final u-row kana to the a-row + ない (飲[の]む→飲[の]まない); う-ending verbs take わない, not あない (買[か]う→買[か]わない)",
      "Ichidan: drop る, add ない (食[た]べる→食[た]べない)",
      "する→しない, 来[く]る→来[こ]ない (reading shifts to こ)",
      "Dictionary form alone = plain non-past affirmative; ない-form = plain non-past negative",
    ],
    lesson: `The **dictionary form** — the form you'd look a verb up under in a dictionary — is already a complete plain non-past sentence on its own: 毎日[まいにち]日本語[にほんご]を勉強[べんきょう]する means "I study Japanese every day," with no ます needed. Its negative counterpart is the **ない形**, built with the same kind of stem change ます-form uses, but landing on a different ending.

For godan verbs, take the final u-row kana and shift it to the a-row, then add ない: 飲[の]む→飲[の]まない, 書[か]く→書[か]かない. The one exception is verbs ending in う, which take わない rather than あない, to avoid an awkward vowel sequence: 買[か]う→買[か]わない, never 買[か]あない. Ichidan verbs simply drop る and add ない: 食[た]べる→食[た]べない, 見[み]る→見[み]ない. The irregulars are する→しない and 来[く]る→来[こ]ない — note the reading shifts to こ, not き, for the negative.

The plain form (both the dictionary form and ない形) is the register used with close friends and family, in diaries, and in your own thoughts — it's less formal than ます/ません, not just a mechanical variant of it. It's also the base that quoting and reported-speech patterns attach to: と思[おも]います (I think that ~) takes the plain form before と, even inside an otherwise polite sentence: 明日[あした]は雨[あめ]が降[ふ]ると思[おも]います (I think it will rain tomorrow) — not 降[ふ]りますと.

A common mistake is mixing plain and polite forms inside the same clause, or forgetting the わ exception for う-ending verbs.`,
    examples: [
      { ja: "毎日[まいにち]日本語[にほんご]を勉強[べんきょう]する。", en: "I study Japanese every day." },
      { ja: "明日[あした]は学校[がっこう]に行[い]かない。", en: "I'm not going to school tomorrow." },
      { ja: "私[わたし]は肉[にく]を食[た]べない。", en: "I don't eat meat." },
      { ja: "明日[あした]は雨[あめ]が降[ふ]ると思[おも]います。", en: "I think it will rain tomorrow." },
    ],
    related: ["n5.masu-form", "n5.ta-form"],
  },
  {
    id: "n5.ta-form",
    level: "N5",
    category: "verb-forms",
    title: "〜た・〜なかった",
    meaning: "plain past 〜た (affirmative) and 〜なかった (negative)",
    formation: [
      "Godan: same sound changes as て-form, with て→た and で→だ (書[か]いて→書[か]いた, 飲[の]んで→飲[の]んだ)",
      "Ichidan: drop る, add た (食[た]べる→食[た]べた)",
      "する→した, 来[く]る→来[き]た",
      "Negative past: ない-form, drop い, add かった (飲[の]まない→飲[の]まなかった)",
    ],
    lesson: `The plain past た-form is built with exactly the same sound changes as the て-form (see n5.te-form) — wherever て appears, swap in た, and wherever で appears, swap in だ. So 書[か]いて→書[か]いた, 飲[の]んで→飲[の]んだ, 買[か]って→買[か]った. Ichidan verbs just drop る and add た (食[た]べる→食[た]べた), and the irregulars are する→した and 来[く]る→来[き]た.

The plain past negative, 〜なかった, is built from the ない-form: drop the final い and add かった, exactly like an い-adjective's past negative (see n5.i-adjectives) — because ない itself behaves like an い-adjective once attached. 飲[の]まない→飲[の]まなかった, 食[た]べない→食[た]べなかった, 来[こ]ない→来[こ]なかった.

Like the plain non-past, plain past is the register for friends, family, diaries, and casual narration, and it's also the form that attaches before nouns like こと and とき: 日本[にほん]に行[い]ったとき (when I went to Japan) — even in an otherwise polite sentence, the verb right before とき stays plain.

A common mistake is trying to attach でした directly onto a verb (×食[た]べたでした) — でした is for nouns and な-adjectives, never verbs; a verb's polite past is ました, and its plain past is simply た. Another is forgetting the sound changes and writing ×飲[の]むた instead of 飲[の]んだ.`,
    examples: [
      { ja: "昨日[きのう]、映画[えいが]を見[み]た。", en: "I watched a movie yesterday." },
      { ja: "朝[あさ]ごはんを食[た]べなかった。", en: "I didn't eat breakfast." },
      { ja: "去年[きょねん]、日本[にほん]に行[い]った。", en: "I went to Japan last year." },
      { ja: "日本[にほん]に行[い]ったとき、写真[しゃしん]をたくさん撮[と]った。", en: "When I went to Japan, I took a lot of photos." },
    ],
    related: ["n5.te-form", "n5.plain-form"],
  },
  {
    id: "n5.te-iru",
    level: "N5",
    category: "verb-forms",
    title: "〜ている",
    meaning: "〜ている — action in progress, resulting state, or habitual action",
    formation: [
      "Verb て-form + いる/います",
      "Action verbs → in progress: \"is doing\" (見[み]ている)",
      "Change/instantaneous verbs (結婚[けっこん]する, 住[す]む, 知[し]る) → resulting state: \"is/has been\" (結婚[けっこん]している)",
      "知[し]る is special: 知[し]っています = \"know\", but the negative is 知[し]りません, never 知[し]っていません",
    ],
    lesson: `〜ている attaches to a verb's て-form and covers three related meanings depending on the verb. With ordinary action verbs, it describes an **action in progress**: 今[いま]、ご飯[はん]を食[た]べています (I am eating right now) — the direct equivalent of English "is ~ing."

With **instantaneous or change-of-state verbs** — verbs that describe a switch from one state to another rather than a stretched-out action, like 結婚[けっこん]する (to get married), 住[す]む (to live/reside), and 死[し]ぬ (to die) — 〜ている instead describes the **resulting state** after that change happened. 結婚[けっこん]しています means "is married" (the state that resulted from getting married), not "is in the middle of getting married." Likewise 大阪[おおさか]に住[す]んでいます means "lives in Osaka," a standing state, not an action happening this second.

〜ている can also describe a **habitual** action repeated over a period: 毎朝[まいあさ]、公園[こうえん]を走[はし]っています (I run in the park every morning).

The verb 知[し]る (to know/find out) has a special asymmetry worth memorizing: the affirmative "I know" is 知[し]っています (a resulting state — you "know" because you once "found out"), but the negative "I don't know" is simply 知[し]りません, never ×知[し]っていません.

A common mistake is translating every 〜ている as "is ~ing" — for change verbs like 結婚[けっこん]する and 住[す]む, that reading is wrong; check whether the verb describes a momentary change or a stretched-out action before deciding which meaning applies.`,
    examples: [
      { ja: "今[いま]、雨[あめ]が降[ふ]っています。", en: "It is raining now." },
      { ja: "彼[かれ]は結婚[けっこん]しています。", en: "He is married." },
      { ja: "毎朝[まいあさ]、公園[こうえん]を走[はし]っています。", en: "I run in the park every morning." },
      { ja: "田中[たなか]さんは山田[やまだ]さんを知[し]っていますが、私[わたし]は知[し]りません。", en: "Mr. Tanaka knows Mr. Yamada, but I don't." },
    ],
    related: ["n5.te-form", "n5.plain-form"],
  },
  {
    id: "n5.mashou-masen-ka",
    level: "N5",
    category: "sentence-patterns",
    title: "〜ましょう・〜ましょうか・〜ませんか",
    meaning: "〜ましょう (let's ~) / 〜ましょうか (shall I/we ~?) / 〜ませんか (won't you ~?)",
    formation: [
      "ます-stem + ましょう — \"let's do ~,\" proposing a joint action",
      "ます-stem + ましょうか — \"shall I/we ~?\", offering to do something or checking in before acting",
      "ます-stem + ませんか — \"won't you ~?\", a gentle invitation that doesn't assume a yes",
    ],
    lesson: `These three patterns all attach to the ます-stem and are used for invitations, suggestions, and offers rather than plain statements of fact.

〜ましょう means "let's do ~" — proposing a joint action where you assume the listener will agree: 一緒[いっしょ]に昼[ひる]ごはんを食[た]べましょう (let's eat lunch together). It's confident and works well when you're fairly sure of a "yes."

〜ましょうか adds か to soften it into a question — "shall we ~?" or, when offering to do something *for* someone, "shall I ~?": 荷物[にもつ]を持[も]ちましょうか (shall I carry your bags?). This checks in with the listener rather than assuming agreement.

〜ませんか is grammatically a negative question ("won't you ~?") but functions as a polite, gentle invitation that leaves more room for the listener to decline than 〜ましょう does: 今度[こんど]の週末[しゅうまつ]、映画[えいが]を見[み]に行[い]きませんか (would you like to go see a movie this coming weekend?). Because it doesn't presume a "yes," 〜ませんか is often considered more polite than 〜ましょう when inviting someone you don't know well.

A useful way to keep them apart: 〜ましょう assumes agreement, 〜ませんか politely asks without assuming it, and 〜ましょうか adds an offer/checking-in nuance, especially strong for "shall I do this for you." A common mistake is using 〜ましょう toward someone of higher status when 〜ませんか would be more appropriately humble — and confusing the offering 〜ましょうか with the inviting 〜ませんか.`,
    examples: [
      { ja: "一緒[いっしょ]に昼[ひる]ごはんを食[た]べましょう。", en: "Let's eat lunch together." },
      { ja: "荷物[にもつ]を持[も]ちましょうか。", en: "Shall I carry your bags?" },
      { ja: "今度[こんど]の週末[しゅうまつ]、映画[えいが]を見[み]に行[い]きませんか。", en: "Would you like to go see a movie this coming weekend?" },
      { ja: "窓[まど]を開[あ]けましょうか。", en: "Shall I open the window?" },
    ],
    related: ["n5.masu-form", "n5.ni-iku"],
  },
  {
    id: "n5.ni-iku",
    level: "N5",
    category: "sentence-patterns",
    title: "〜に行く・来る・帰る",
    meaning: "ます-stem + に行く/来る/帰る — go/come/return in order to do ~",
    formation: [
      "Verb ます-stem + に + 行[い]く／来[く]る／帰[かえ]る — expresses the purpose of the movement",
      "Activity noun (買[か]い物[もの], 旅行[りょこう], 食事[しょくじ], 散歩[さんぽ]) + に + 行[い]く／来[く]る／帰[かえ]る",
      "The purpose verb stays at the ます-stem; only 行[い]く／来[く]る／帰[かえ]る carries tense and politeness",
    ],
    lesson: `To express going, coming, or returning somewhere **in order to** do something, attach に to the ます-stem of the purpose verb, then follow with a verb of movement — 行[い]く (go), 来[く]る (come), or 帰[かえ]る (return): 図書館[としょかん]へ本[ほん]を借[か]りに行[い]きます (I'm going to the library to borrow a book). The purpose verb itself stays frozen at the ます-stem — it's never conjugated further; only the movement verb at the end carries tense and politeness.

The same に also attaches directly to certain nouns that already imply an activity — especially 買[か]い物[もの] (shopping), 旅行[りょこう] (travel), 食事[しょくじ] (a meal), and 散歩[さんぽ] (a walk) — skipping the verb entirely: スーパーへ買[か]い物[もの]に行[い]きます (I'm going to the supermarket to shop), rather than the longer 買[か]い物[もの]をしに行[い]きます (though that longer form is also correct).

The destination, if stated, is usually marked with へ or に, and either particle is fine here — this に marking purpose is a separate, unrelated use of the same particle shape.

A common mistake is conjugating the purpose verb fully instead of leaving it at the ます-stem — ×見[み]ますに行[い]きます is wrong; it must be 見[み]に行[い]きます. Another is trying to use this pattern with a movement verb other than 行[い]く/来[く]る/帰[かえ]る — the construction is limited to these three.`,
    examples: [
      { ja: "図書館[としょかん]へ本[ほん]を借[か]りに行[い]きます。", en: "I'm going to the library to borrow a book." },
      { ja: "友達[ともだち]が私[わたし]の家[いえ]に遊[あそ]びに来[き]ます。", en: "My friend is coming to my house to hang out." },
      { ja: "週末[しゅうまつ]、スーパーへ買[か]い物[もの]に行[い]きます。", en: "I'm going to the supermarket to shop this weekend." },
      { ja: "昼[ひる]ごはんを食[た]べに家[いえ]に帰[かえ]ります。", en: "I'm going home to eat lunch." },
    ],
    related: ["n5.masu-form", "n5.mashou-masen-ka"],
  },
  {
    id: "n5.naide-kudasai",
    level: "N5",
    category: "verb-forms",
    title: "〜ないでください",
    meaning: "please don't do ~ (polite negative request)",
    formation: [
      "Verb ない-form + でください (書[か]かないでください)",
      "Contrast: 〜てください = affirmative request (\"please do ~\"); 〜ないでください = negative request (\"please don't ~\")",
      "Casual: drop ください, use the bare ない-form or 〜ないで alone (忘[わす]れないで)",
    ],
    lesson: `〜ないでください is the negative counterpart to 〜てください (see n5.te-form): where 〜てください politely asks someone *to* do something, 〜ないでください politely asks someone *not* to do it. It's built by taking the plain ない-form of a verb (see n5.plain-form) and adding でください: 入[はい]らないでください (please don't enter), 心配[しんぱい]しないでください (please don't worry).

Because it's built on the ない-form, all the same formation rules apply — godan verbs shift to the a-row (触[さわ]る→触[さわ]らないでください), う-verbs take わ (吸[す]う→吸[す]わないでください, e.g. たばこを吸[す]わないでください — please don't smoke), ichidan verbs just drop る (食[た]べる→食[た]べないでください), and the irregulars are しないでください and 来[こ]ないでください.

In casual speech among friends or family, ください is often dropped entirely, leaving just the bare ない-form with request intonation, or the softer-sounding 〜ないで on its own: 忘[わす]れないで (don't forget) is a natural, gentle way to say this to someone close to you, without the formality of the full ください.

A common mistake is trying to negate 〜てください directly by adding ない after て (×てないください) — the negative request is never built by negating て; the ない always attaches to the verb stem first, before でください. Another is confusing 〜ないでください with 〜なくてもいいです ("you don't have to ~"), which is a completely different meaning — permission to skip something, not a prohibition against doing it.`,
    examples: [
      { ja: "ここで写真[しゃしん]を撮[と]らないでください。", en: "Please don't take photos here." },
      { ja: "心配[しんぱい]しないでください。", en: "Please don't worry." },
      { ja: "教室[きょうしつ]でたばこを吸[す]わないでください。", en: "Please don't smoke in the classroom." },
      { ja: "遅[おそ]く来[こ]ないでください。", en: "Please don't come late." },
    ],
    related: ["n5.te-form", "n5.plain-form"],
  },
];

export const exercises: Exercise[] = [
  // -------------------------------------------------------------------
  // n5.plain-form
  // -------------------------------------------------------------------
  {
    id: "n5.plain-form.ex1",
    grammarPointId: "n5.plain-form",
    source: "bank",
    kind: "translation",
    promptEn: "I don't drink coffee.",
    accepted: ["コーヒーを飲[の]まない。", "コーヒー飲[の]まない。"],
    hint: "use the plain ない-form, not ません",
  },
  {
    id: "n5.plain-form.ex2",
    grammarPointId: "n5.plain-form",
    source: "bank",
    kind: "translation",
    promptEn: "I think he will come tomorrow.",
    accepted: ["明日[あした]彼[かれ]が来[く]ると思[おも]います。", "明日[あした]彼[かれ]は来[く]ると思[おも]います。"],
    hint: "the verb right before と思います stays in the plain form",
  },
  {
    id: "n5.plain-form.ex3",
    grammarPointId: "n5.plain-form",
    source: "bank",
    kind: "cloze",
    sentence: "私[わたし]は魚[さかな]を＿＿。",
    accepted: ["食[た]べない"],
    translationEn: "I don't eat fish.",
  },
  {
    id: "n5.plain-form.ex4",
    grammarPointId: "n5.plain-form",
    source: "bank",
    kind: "cloze",
    sentence: "毎朝[まいあさ]六時[ろくじ]に＿＿。",
    accepted: ["起[お]きる"],
    translationEn: "I get up at six every morning.",
  },
  {
    id: "n5.plain-form.ex5",
    grammarPointId: "n5.plain-form",
    source: "bank",
    kind: "mcq",
    question: "友達[ともだち]「明[あ]した、学校[がっこう]に行[い]く？」　あなた「ううん、＿＿。」",
    choices: ["行[い]かない", "行[い]きません", "行[い]かなかった", "行[い]っていない"],
    correctIndex: 0,
    explanation: "A friend using casual plain speech gets a casual plain reply: the non-past negative 行かない, not the polite ません or a past/unrelated form.",
  },
  {
    id: "n5.plain-form.ex6",
    grammarPointId: "n5.plain-form",
    source: "bank",
    kind: "mcq",
    question: "そのお酒[さけ]は高[たか]いので、＿＿。",
    choices: ["買[か]わない", "買[か]あない", "買[か]いない", "買[か]らない"],
    correctIndex: 0,
    explanation: "買う ends in う, so its ない-form takes わ (買わない) — あない, いない, and らない are not valid conjugations of 買う.",
  },
  {
    id: "n5.plain-form.ex7",
    grammarPointId: "n5.plain-form",
    source: "bank",
    kind: "ordering",
    segments: ["夜[よる]は", "コーヒーを", "飲[の]まない。"],
    starIndex: 1,
    translationEn: "I don't drink coffee at night.",
  },

  // -------------------------------------------------------------------
  // n5.ta-form
  // -------------------------------------------------------------------
  {
    id: "n5.ta-form.ex1",
    grammarPointId: "n5.ta-form",
    source: "bank",
    kind: "translation",
    promptEn: "I read that book yesterday.",
    accepted: ["昨日[きのう]、あの本[ほん]を読[よ]んだ。", "あの本[ほん]を昨日[きのう]読[よ]んだ。"],
    hint: "use the plain past た, not ました",
  },
  {
    id: "n5.ta-form.ex2",
    grammarPointId: "n5.ta-form",
    source: "bank",
    kind: "translation",
    promptEn: "I didn't go to the party last night.",
    accepted: ["昨夜[ゆうべ]、パーティーに行[い]かなかった。", "昨夜[ゆうべ]、パーティーへ行[い]かなかった。"],
    hint: "use the plain past negative なかった",
  },
  {
    id: "n5.ta-form.ex3",
    grammarPointId: "n5.ta-form",
    source: "bank",
    kind: "cloze",
    sentence: "今朝[けさ]、公園[こうえん]を＿＿。",
    accepted: ["歩[ある]いた"],
    translationEn: "I walked in the park this morning.",
  },
  {
    id: "n5.ta-form.ex4",
    grammarPointId: "n5.ta-form",
    source: "bank",
    kind: "cloze",
    sentence: "昨日[きのう]は誰[だれ]にも＿＿。",
    accepted: ["会[あ]わなかった"],
    translationEn: "I didn't meet anyone yesterday.",
  },
  {
    id: "n5.ta-form.ex5",
    grammarPointId: "n5.ta-form",
    source: "bank",
    kind: "mcq",
    question: "先週[せんしゅう]、新[あたら]しい車[くるま]を＿＿。",
    choices: ["買[か]った", "買[か]う", "買[か]わない", "買[か]いた"],
    correctIndex: 0,
    explanation: "先週 (last week) needs the plain past; 買う takes the って/った sound change, so 買った is correct — 買いた is not a real form.",
  },
  {
    id: "n5.ta-form.ex6",
    grammarPointId: "n5.ta-form",
    source: "bank",
    kind: "mcq",
    question: "「昨日[きのう]、学校[がっこう]に来[き]た？」「ううん、＿＿。」",
    choices: ["来[こ]なかった", "来[き]なかった", "来[き]ません", "来[こ]ない"],
    correctIndex: 0,
    explanation: "来る's negative stem reading is こ, so the plain past negative is 来[こ]なかった, not 来[き]なかった.",
  },
  {
    id: "n5.ta-form.ex7",
    grammarPointId: "n5.ta-form",
    source: "bank",
    kind: "ordering",
    segments: ["昨夜[ゆうべ]は", "テレビを", "見[み]なかった。"],
    starIndex: 1,
    translationEn: "I didn't watch TV last night.",
  },

  // -------------------------------------------------------------------
  // n5.te-iru
  // -------------------------------------------------------------------
  {
    id: "n5.te-iru.ex1",
    grammarPointId: "n5.te-iru",
    source: "bank",
    kind: "translation",
    promptEn: "I am reading a newspaper now.",
    accepted: ["今[いま]、新聞[しんぶん]を読[よ]んでいます。", "今[いま]、新聞[しんぶん]を読[よ]んでいる。"],
  },
  {
    id: "n5.te-iru.ex2",
    grammarPointId: "n5.te-iru",
    source: "bank",
    kind: "translation",
    promptEn: "My sister lives in Tokyo.",
    accepted: ["姉[あね]は東京[とうきょう]に住[す]んでいます。", "姉[あね]は東京[とうきょう]に住[す]んでいる。"],
    hint: "住む describes a standing state with 〜ている, not the plain dictionary form",
  },
  {
    id: "n5.te-iru.ex3",
    grammarPointId: "n5.te-iru",
    source: "bank",
    kind: "cloze",
    sentence: "彼[かれ]は今[いま]、部屋[へや]で音楽[おんがく]を＿＿。",
    accepted: ["聞[き]いています"],
    translationEn: "He is listening to music in his room now.",
  },
  {
    id: "n5.te-iru.ex4",
    grammarPointId: "n5.te-iru",
    source: "bank",
    kind: "cloze",
    sentence: "田中[たなか]さんの電話番号[でんわばんごう]を＿＿か。",
    accepted: ["知[し]っています"],
    translationEn: "Do you know Mr. Tanaka's phone number?",
  },
  {
    id: "n5.te-iru.ex5",
    grammarPointId: "n5.te-iru",
    source: "bank",
    kind: "mcq",
    question: "すみません、その人[ひと]を＿＿。",
    choices: ["知[し]りません", "知[し]っていません", "知[し]りましょう", "知[し]りたいです"],
    correctIndex: 0,
    explanation: "知る's negative 'don't know' is 知りません (or plain 知らない) — the doubled-negative ×知っていません is never used.",
  },
  {
    id: "n5.te-iru.ex6",
    grammarPointId: "n5.te-iru",
    source: "bank",
    kind: "mcq",
    question: "山田[やまだ]さんは五年前[ごねんまえ]に結婚[けっこん]しました。今[いま]も＿＿。",
    choices: ["結婚[けっこん]しています", "結婚[けっこん]します", "結婚[けっこん]しました", "結婚[けっこん]するでしょう"],
    correctIndex: 0,
    explanation: "結婚する is a change verb; 結婚しています expresses the current resulting state ('is married'), not a repeated future action or a bare past report.",
  },
  {
    id: "n5.te-iru.ex7",
    grammarPointId: "n5.te-iru",
    source: "bank",
    kind: "ordering",
    segments: ["彼[かれ]は", "台所[だいどころ]で", "料理[りょうり]を", "しています。"],
    starIndex: 2,
    translationEn: "He is cooking in the kitchen.",
  },

  // -------------------------------------------------------------------
  // n5.mashou-masen-ka
  // -------------------------------------------------------------------
  {
    id: "n5.mashou-masen-ka.ex1",
    grammarPointId: "n5.mashou-masen-ka",
    source: "bank",
    kind: "translation",
    promptEn: "Let's study together.",
    accepted: ["一緒[いっしょ]に勉強[べんきょう]しましょう。", "一緒[いっしょ]に勉強[べんきょう]をしましょう。"],
  },
  {
    id: "n5.mashou-masen-ka.ex2",
    grammarPointId: "n5.mashou-masen-ka",
    source: "bank",
    kind: "translation",
    promptEn: "Won't you come to the party?",
    accepted: ["パーティーに来[き]ませんか。", "パーティーへ来[き]ませんか。"],
    hint: "use the polite invitation 〜ませんか",
  },
  {
    id: "n5.mashou-masen-ka.ex3",
    grammarPointId: "n5.mashou-masen-ka",
    source: "bank",
    kind: "cloze",
    sentence: "疲[つか]れましたね。少[すこ]し＿＿か。",
    accepted: ["休[やす]みましょう", "休[やす]みません"],
    translationEn: "You must be tired. Shall we rest a little?",
  },
  {
    id: "n5.mashou-masen-ka.ex4",
    grammarPointId: "n5.mashou-masen-ka",
    source: "bank",
    kind: "cloze",
    sentence: "重[おも]そうですね。荷物[にもつ]を＿＿か。",
    accepted: ["持[も]ちましょう"],
    translationEn: "That looks heavy. Shall I carry your bags?",
  },
  {
    id: "n5.mashou-masen-ka.ex5",
    grammarPointId: "n5.mashou-masen-ka",
    source: "bank",
    kind: "mcq",
    question: "今度[こんど]、一緒[いっしょ]に旅行[りょこう]に＿＿。",
    choices: ["行[い]きませんか", "行[い]きます", "行[い]きました", "行[い]きたいです"],
    correctIndex: 0,
    explanation: "〜ませんか politely invites someone to join; the plain statement forms don't carry that invitational nuance.",
  },
  {
    id: "n5.mashou-masen-ka.ex6",
    grammarPointId: "n5.mashou-masen-ka",
    source: "bank",
    kind: "mcq",
    question: "先生[せんせい]、荷物[にもつ]を＿＿。",
    choices: ["持[も]ちましょうか", "持[も]ちませんか", "持[も]ちました", "持[も]ってください"],
    correctIndex: 0,
    explanation: "Offering to do something for someone ('shall I ~?') uses 〜ましょうか; 〜ませんか instead invites the listener to do the action themselves, and 持ちました/持ってください reverse the situation.",
  },
  {
    id: "n5.mashou-masen-ka.ex7",
    grammarPointId: "n5.mashou-masen-ka",
    source: "bank",
    kind: "ordering",
    segments: ["一緒[いっしょ]に", "レストランへ", "行[い]きましょうか。"],
    starIndex: 1,
    translationEn: "Shall we go to a restaurant together?",
  },

  // -------------------------------------------------------------------
  // n5.ni-iku
  // -------------------------------------------------------------------
  {
    id: "n5.ni-iku.ex1",
    grammarPointId: "n5.ni-iku",
    source: "bank",
    kind: "translation",
    promptEn: "I'm going to the park to play soccer.",
    accepted: ["公園[こうえん]へサッカーをしに行[い]きます。", "公園[こうえん]にサッカーをしに行[い]きます。"],
  },
  {
    id: "n5.ni-iku.ex2",
    grammarPointId: "n5.ni-iku",
    source: "bank",
    kind: "translation",
    promptEn: "My mother is coming to Japan to see me.",
    accepted: ["母[はは]は私[わたし]に会[あ]いに日本[にほん]へ来[き]ます。", "母[はは]が私[わたし]に会[あ]いに日本[にほん]に来[き]ます。"],
    hint: "the purpose verb stays at the ます-stem before に",
  },
  {
    id: "n5.ni-iku.ex3",
    grammarPointId: "n5.ni-iku",
    source: "bank",
    kind: "cloze",
    sentence: "毎週[まいしゅう]、映画[えいが]を＿＿行[い]きます。",
    accepted: ["見[み]に"],
    translationEn: "I go to see a movie every week.",
  },
  {
    id: "n5.ni-iku.ex4",
    grammarPointId: "n5.ni-iku",
    source: "bank",
    kind: "cloze",
    sentence: "友達[ともだち]と旅行[りょこう]＿＿行[い]きます。",
    accepted: ["に"],
    translationEn: "I'm going on a trip with my friend.",
  },
  {
    id: "n5.ni-iku.ex5",
    grammarPointId: "n5.ni-iku",
    source: "bank",
    kind: "mcq",
    question: "デパートへ靴[くつ]を＿＿行[い]きます。",
    choices: ["買[か]いに", "買[か]うに", "買[か]いて", "買[か]んに"],
    correctIndex: 0,
    explanation: "The purpose verb attaches to a movement verb via ます-stem + に (買いに); attaching に to the dictionary form or using other endings isn't how this pattern works.",
  },
  {
    id: "n5.ni-iku.ex6",
    grammarPointId: "n5.ni-iku",
    source: "bank",
    kind: "mcq",
    question: "毎朝[まいあさ]、公園[こうえん]へ散歩[さんぽ]＿＿行[い]きます。",
    choices: ["に", "を", "で", "へ"],
    correctIndex: 0,
    explanation: "散歩 is an activity noun, so it takes に before 行く, parallel to 買[か]い物[もの]に行[い]く.",
  },
  {
    id: "n5.ni-iku.ex7",
    grammarPointId: "n5.ni-iku",
    source: "bank",
    kind: "ordering",
    segments: ["図書館[としょかん]へ", "本[ほん]を", "返[かえ]しに", "行[い]きます。"],
    starIndex: 2,
    translationEn: "I'm going to the library to return a book.",
  },

  // -------------------------------------------------------------------
  // n5.naide-kudasai
  // -------------------------------------------------------------------
  {
    id: "n5.naide-kudasai.ex1",
    grammarPointId: "n5.naide-kudasai",
    source: "bank",
    kind: "translation",
    promptEn: "Please don't open the window.",
    accepted: ["窓[まど]を開[あ]けないでください。", "窓[まど]、開[あ]けないで。"],
  },
  {
    id: "n5.naide-kudasai.ex2",
    grammarPointId: "n5.naide-kudasai",
    source: "bank",
    kind: "translation",
    promptEn: "Please don't run in the hallway.",
    accepted: ["廊下[ろうか]で走[はし]らないでください。", "廊下[ろうか]で走[はし]らないで。"],
    hint: "negative request 〜ないでください",
  },
  {
    id: "n5.naide-kudasai.ex3",
    grammarPointId: "n5.naide-kudasai",
    source: "bank",
    kind: "cloze",
    sentence: "この部屋[へや]に入[はい]＿＿ください。",
    accepted: ["らないで"],
    translationEn: "Please don't enter this room.",
  },
  {
    id: "n5.naide-kudasai.ex4",
    grammarPointId: "n5.naide-kudasai",
    source: "bank",
    kind: "cloze",
    sentence: "大[おお]きい声[こえ]で＿＿ください。",
    accepted: ["話[はな]さないで"],
    translationEn: "Please don't speak in a loud voice.",
  },
  {
    id: "n5.naide-kudasai.ex5",
    grammarPointId: "n5.naide-kudasai",
    source: "bank",
    kind: "mcq",
    question: "図書館[としょかん]でお菓子[かし]を＿＿ください。",
    choices: ["食[た]べないで", "食[た]べて", "食[た]べなくて", "食[た]べます"],
    correctIndex: 0,
    explanation: "The negative request pattern is ない-form + でください; 食べて would make it an affirmative request, the opposite meaning.",
  },
  {
    id: "n5.naide-kudasai.ex6",
    grammarPointId: "n5.naide-kudasai",
    source: "bank",
    kind: "mcq",
    question: "パーティーに遅[おそ]く＿＿ください。",
    choices: ["来[こ]ないで", "来[き]ないで", "来[き]なくて", "来[こ]なくて"],
    correctIndex: 0,
    explanation: "来る's ない-form reading is こ, so the negative request is 来[こ]ないでください, not 来[き]ないで.",
  },
  {
    id: "n5.naide-kudasai.ex7",
    grammarPointId: "n5.naide-kudasai",
    source: "bank",
    kind: "ordering",
    segments: ["この", "絵[え]を", "触[さわ]らないで", "ください。"],
    starIndex: 2,
    translationEn: "Please don't touch this picture.",
  },
];

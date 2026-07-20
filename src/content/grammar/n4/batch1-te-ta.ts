// N4 grammar batch 1: た/たり/ながら/て-auxiliary cluster + すぎる.
// 7 points, 7 bank exercises each. Furigana notation throughout (see src/engine/furigana.ts).

import type { Exercise, GrammarPoint } from "../../types";

export const points: GrammarPoint[] = [
  {
    id: "n4.ta-koto-ga-aru",
    level: "N4",
    category: "expressions",
    title: "〜たことがある",
    meaning: "experience — have done ~ before / have never done ~ (contrast: sometimes happens)",
    formation: [
      "た-form (plain past) + ことがある — has the experience of doing ~ (食[た]べたことがある)",
      "Negative: た-form + ことがない — has never done ~ (食[た]べたことがない)",
      "Contrast: dictionary form + ことがある — describes something that sometimes happens (食[た]べることがある), not a past experience",
    ],
    lesson: `〜たことがある attaches to the plain past (た-form) and expresses that the speaker or subject has had the experience of doing something at some unspecified point in the past — like English "have (ever) done X" or "have been to X": 私[わたし]は日本[にほん]に行[い]ったことがあります (I have been to Japan).

This is different from a simple past-tense statement (行[い]きました), which reports a specific, completed event, often anchored to a particular time. 〜たことがある instead foregrounds accumulated life experience with no specific time attached — you generally can't pair it with time words like 昨日[きのう] or 先週[せんしゅう], since "have you ever" doesn't ask about one occasion.

The negative, 〜たことがない, means "have never done ~": 一度[いちど]も海外[かいがい]に行[い]ったことがありません (I've never been abroad, not even once) — 一度[いちど]も pairs naturally with the negative for emphasis.

A common mistake is confusing 〜たことがある with the superficially similar **dictionary form + ことがある**, which means something different: an occasional, recurring occurrence rather than a one-time-ever experience. 彼[かれ]は時々[ときどき]遅刻[ちこく]することがあります (he's sometimes late) uses the dictionary form 遅刻[ちこく]する, describing a recurring tendency — not the past-experience meaning of たことがある. Always check the form immediately before ことがある to tell the two apart.`,
    examples: [
      { ja: "私[わたし]は日本[にほん]に行[い]ったことがあります。", en: "I have been to Japan before." },
      { ja: "富士山[ふじさん]に登[のぼ]ったことがありますか。", en: "Have you ever climbed Mt. Fuji?" },
      { ja: "生[なま]の魚[さかな]を食[た]べたことがありません。", en: "I have never eaten raw fish." },
      { ja: "彼[かれ]は時々[ときどき]遅刻[ちこく]することがあります。", en: "He's sometimes late (occasional occurrence, not an experience)." },
    ],
    related: ["n5.ta-form", "n5.plain-form"],
  },
  {
    id: "n4.tari-tari",
    level: "N4",
    category: "expressions",
    title: "〜たり〜たりする",
    meaning: "do things like ~ and ~ (non-exhaustive activity list); the final する carries tense",
    formation: [
      "た-form + り, repeated for each activity, + する — 読[よ]んだり、見[み]たりする",
      "Only the final する is conjugated for tense/politeness: 〜たりしました, 〜たりします",
      "Also used with a single verb: 〜たりする — 'do things like ~ (among others)'",
    ],
    lesson: `〜たり〜たりする lists a few representative activities out of a larger, unspecified set — it means "do things like X and Y (among others)," not an exhaustive account. It's built from the plain past (た-form) of each verb with り attached, repeated for each item, and closed with a conjugated form of する that carries the sentence's tense and politeness: 週末[しゅうまつ]は本[ほん]を読[よ]んだり、映画[えいが]を見[み]たりします (on weekends, I do things like read books and watch movies).

Because the final する is what actually gets conjugated, only it needs to change for tense or negation — the たり verbs themselves stay in their fixed 〜たり shape no matter whether the sentence is past, present, or negative.

〜たりする can also appear with just a single verb, softening a flat statement into "I do things like X (among other things)": 疲[つか]れた時[とき]は、コーヒーを飲[の]んだりします。A second item isn't required.

Compare this with a plain て-form chain (家[いえ]に帰[かえ]って、ご飯[はん]を食[た]べて…), which presents actions as a complete, ordered sequence. 〜たり explicitly signals a **non-exhaustive, unordered sample** — swapping the order of the たり clauses doesn't change the meaning, unlike a て-form chain, where order usually reflects the actual sequence of events.

A common mistake is forgetting the final する and just stacking たり clauses without closing the sentence. (Adjective/noun 〜だったり forms exist too, but go beyond N4.)`,
    examples: [
      { ja: "週末[しゅうまつ]は本[ほん]を読[よ]んだり、映画[えいが]を見[み]たりします。", en: "On weekends, I do things like read books and watch movies." },
      { ja: "子供[こども]たちは公園[こうえん]で走[はし]ったり、遊[あそ]んだりしました。", en: "The kids ran around and played (among other things) at the park." },
      { ja: "疲[つか]れた時[とき]は、コーヒーを飲[の]んだりします。", en: "When I'm tired, I do things like drink coffee." },
      { ja: "授業中[じゅぎょうちゅう]に寝[ね]たりしないでください。", en: "Please don't do things like sleeping during class." },
    ],
    related: ["n5.ta-form", "n4.ta-koto-ga-aru"],
  },
  {
    id: "n4.nagara",
    level: "N4",
    category: "verb-forms",
    title: "〜ながら",
    meaning: "while doing ~ (simultaneous actions, same subject); the main action follows ながら",
    formation: [
      "ます-stem + ながら — 読[よ]みながら, 食[た]べながら",
      "[background action]ながら、[main action]。 — both actions share the same subject",
      "The clause AFTER ながら is the main action; the ながら-clause is secondary/background",
    ],
    lesson: `〜ながら attaches to the ます-stem of a verb and links two actions performed by the same subject at the same time: 音楽[おんがく]を聞[き]きながら、勉強[べんきょう]します (I study while listening to music).

Word order carries meaning here: the clause before ながら is the **background/secondary action**, and the clause after ながら — right before the sentence ends — is the **main action** the speaker wants to emphasize. In the example above, studying is what's really happening; listening to music is incidental.

A very common mistake for English speakers is putting the more important action first, mirroring English word order. If you actually mean "I listen to music while studying" (studying is the background, listening is what you want to emphasize), you'd need 勉強[べんきょう]をしながら音楽[おんがく]を聞[き]きます — swapping the clauses changes which action is the main one, so it's worth pausing to think about which action you actually want to emphasize before choosing the order.

ながら strictly requires a **single shared subject** doing both things simultaneously — it can't link two different people's actions. It also can't describe two sequential (not simultaneous) actions; for that, use て-form linking or 〜てから instead.

Don't confuse ながら with 〜ている, which marks an ongoing state or action on its own, not a pairing of two simultaneous actions by the same subject.`,
    examples: [
      { ja: "音楽[おんがく]を聞[き]きながら、勉強[べんきょう]します。", en: "I study while listening to music." },
      { ja: "テレビを見[み]ながら、ご飯[はん]を食[た]べないでください。", en: "Please don't eat while watching TV." },
      { ja: "彼女[かのじょ]は歌[うた]いながら、料理[りょうり]を作[つく]っています。", en: "She's cooking while singing." },
      { ja: "アルバイトをしながら、大学[だいがく]に通[かよ]っています。", en: "I'm attending university while working part-time." },
    ],
    related: ["n5.masu-form", "n5.te-iru"],
  },
  {
    id: "n4.te-oku",
    level: "N4",
    category: "verb-forms",
    title: "〜ておく",
    meaning: "do ~ in advance / leave ~ as is (preparation)",
    formation: [
      "て-form + おく — 買[か]っておく, 開[あ]けておく (do something now, for later)",
      "そのままにしておく — leave something as it is, on purpose",
      "Casual contraction: 〜ておく→〜とく, 〜でおく→〜どく",
    ],
    lesson: `〜ておく attaches to the て-form and marks an action done in advance, in preparation for something later: 明日[あした]のパーティーのために、飲[の]み物[もの]を買[か]っておきます (I'll buy drinks ahead of time for tomorrow's party). The nuance is purposeful preparation — doing X now so things are ready when needed.

A second, related use is deliberately leaving something in a particular state, often paired with そのまま (as-is): そのままにしておいてください (please leave it as it is) — here おく isn't about preparing so much as consciously leaving something alone.

In casual speech, ておく and でおく are very commonly contracted to **とく** and **どく**: 買[か]っておく→買[か]っとく, 読[よ]んでおく→読[よ]んどく. These contractions are extremely frequent in spoken Japanese but should be expanded to the full form in writing or formal contexts.

Compare with 〜てある, which describes the resulting state of something someone deliberately prepared (窓[まど]が開[あ]けてあります — the window has been left open, focusing on the current state), versus ておく, which focuses on the deliberate act of preparing (窓[まど]を開[あ]けておきます — I'll leave the window open, focusing on the action taken for a purpose).

A common mistake is using ておく for something that just happens to be a completed action with no forward-looking purpose — without that "in preparation for later" nuance, plain past or 〜てある usually fits better.`,
    examples: [
      { ja: "明日[あした]のパーティーのために、飲[の]み物[もの]を買[か]っておきます。", en: "I'll buy drinks in advance for tomorrow's party." },
      { ja: "ドアを開[あ]けておいてください。", en: "Please leave the door open." },
      { ja: "旅行[りょこう]の前[まえ]に、ホテルを予約[よやく]しておきました。", en: "I booked a hotel in advance before the trip." },
      { ja: "その本[ほん]、読[よ]んだらそこに置[お]いといて。", en: "When you're done reading that book, just leave it there." },
    ],
    related: ["n5.te-form", "n4.te-shimau", "n4.te-miru"],
  },
  {
    id: "n4.te-shimau",
    level: "N4",
    category: "verb-forms",
    title: "〜てしまう",
    meaning: "finish ~ entirely / do ~ unfortunately (completion or regret)",
    formation: [
      "て-form + しまう — completion: finish doing ~ entirely (食[た]べてしまう)",
      "Same form also expresses regret: did ~ unfortunately/by accident (忘[わす]れてしまう)",
      "Casual contraction: 〜てしまう→〜ちゃう, 〜でしまう→〜じゃう (past: 〜ちゃった/〜じゃった)",
    ],
    lesson: `〜てしまう attaches to the て-form and carries two related but distinct nuances, both built around the idea of something happening completely or finally. The first is simple **completion**, emphasizing that an action was finished entirely, often with a sense of relief or accomplishment: 宿題[しゅくだい]をもう全部[ぜんぶ]やってしまいました (I've already finished all my homework). The second, very common in conversation, is **regret** or an unintended consequence — something happened that the speaker didn't want or couldn't help: 電車[でんしゃ]の中[なか]に傘[かさ]を忘[わす]れてしまいました (I accidentally left my umbrella on the train).

Which reading applies depends entirely on context — there's no separate grammatical marker distinguishing them; a listener infers it from whether the situation sounds intentional/positive (completion) or accidental/unwanted (regret).

In casual speech, てしまう and でしまう contract to **ちゃう** and **じゃう**, with past forms ちゃった/じゃった: 食[た]べてしまった→食[た]べちゃった, 死[し]んでしまった→死[し]んじゃった. These contractions are everywhere in spoken, informal Japanese but should be avoided in formal writing.

A common mistake is overusing てしまう for any completed action — it specifically adds finality or emotional coloring (relief, regret, surprise), so a neutral, emotionally flat statement is often better left as plain past tense without てしまう.`,
    examples: [
      { ja: "宿題[しゅくだい]をもう全部[ぜんぶ]やってしまいました。", en: "I've already finished all my homework." },
      { ja: "電車[でんしゃ]の中[なか]に傘[かさ]を忘[わす]れてしまいました。", en: "I accidentally left my umbrella on the train." },
      { ja: "このケーキ、おいしくて全部[ぜんぶ]食[た]べちゃった。", en: "This cake was so good I ate the whole thing." },
      { ja: "大事[だいじ]な約束[やくそく]を忘[わす]れてしまって、彼女[かのじょ]を怒[おこ]らせてしまいました。", en: "I forgot an important promise and ended up making her angry." },
    ],
    related: ["n4.te-oku", "n4.te-miru"],
  },
  {
    id: "n4.te-miru",
    level: "N4",
    category: "verb-forms",
    title: "〜てみる",
    meaning: "try doing ~ and see what happens",
    formation: [
      "て-form + みる — try doing ~ and see (食[た]べてみる)",
      "〜てみたい — want to try doing ~",
      "〜てみてください — please try doing ~ (and see)",
    ],
    lesson: `〜てみる attaches to the て-form and means to try doing something in order to find out what happens or what it's like — the focus is on **discovering a result**, not on struggling to accomplish something difficult. 新[あたら]しい店[みせ]に行[い]ってみました (I tried going to the new shop [to see what it's like]) implies the speaker actually went and found something out, not that going there was hard.

This is an important contrast with English "try to," which usually implies effort toward something that might fail ("I tried to open the door" — maybe it didn't open). てみる, by contrast, implies the action was actually carried out and an outcome was observed. "Try to do something difficult" is better expressed with 〜（よ）うとする (to attempt/make an effort to), a different pattern.

〜てみたい combines with たい to express wanting to try something and see: 一度[いちど]、富士山[ふじさん]に登[のぼ]ってみたいです (I'd like to try climbing Mt. Fuji sometime). 〜てみてください softens a suggestion into "please try doing X (and see how it goes)": 先生[せんせい]に聞[き]いてみてください。

みる is written in hiragana here, not 見[み]る, since it's a grammaticalized auxiliary rather than the literal verb "to see" — though "see [what happens]" is clearly where the meaning comes from.

A common mistake is using てみる for a one-off, irreversible action with no real result to observe, or confusing it with 〜（よ）うとする for effortful attempts.`,
    examples: [
      { ja: "この料理[りょうり]を作[つく]ってみました。おいしかったです。", en: "I tried making this dish. It was delicious." },
      { ja: "一度[いちど]、富士山[ふじさん]に登[のぼ]ってみたいです。", en: "I want to try climbing Mt. Fuji once." },
      { ja: "分[わ]からなかったら、先生[せんせい]に聞[き]いてみてください。", en: "If you don't understand, please try asking the teacher." },
      { ja: "新[あたら]しい店[みせ]に行[い]ってみましたが、あまりよくなかったです。", en: "I tried going to the new shop, but it wasn't very good." },
    ],
    related: ["n4.te-oku", "n4.te-shimau", "n5.tai-form"],
  },
  {
    id: "n4.sugiru",
    level: "N4",
    category: "verb-forms",
    title: "〜すぎる",
    meaning: "too ~ / excessively ~ (verb ます-stem or adjective stem + すぎる)",
    formation: [
      "Verb ます-stem + すぎる — 食[た]べすぎる (eat too much)",
      "い-adjective: drop い + すぎる — 高[たか]すぎる (too expensive)",
      "な-adjective: bare stem + すぎる — 静[しず]かすぎる (too quiet)",
      "Noun form drops る: 〜すぎ — 飲[の]みすぎ (overdrinking); irregular いい→よすぎる",
    ],
    lesson: `すぎる attaches after a verb's ます-stem or an adjective's stem to mean "too much / excessively." With verbs: 食[た]べる→食[た]べすぎる (eat too much); with い-adjectives, drop the final い and add すぎる: 高[たか]い→高[たか]すぎる (too expensive); with な-adjectives, attach directly to the bare stem: 静[しず]か→静[しず]かすぎる (too quiet). Once attached, すぎる conjugates as an ordinary ichidan verb: すぎます, すぎました, すぎて, and so on.

すぎる always carries a **negative or excessive** nuance — "more than is appropriate or desirable" — even when the underlying word is neutral or positive: 親切[しんせつ]すぎる (too kind) still implies the kindness is somehow excessive or awkward, not simply "very kind."

A noun form drops る, often written 過[す]ぎ, used to talk about the excess as a thing in itself: 飲[の]みすぎ (overdrinking), 働[はたら]きすぎ (overworking) — 働[はたら]きすぎは体[からだ]によくないです (overworking isn't good for your health).

The adjective いい is irregular, following the same pattern as its そう and negative forms: いい→よすぎる (never ×いすぎる), built off the archaic root よい rather than いい itself.

A common mistake is confusing すぎる with とても/すごく (very) — すぎる specifically means "beyond a reasonable amount," so it can sound odd to plainly praise something with it (きれいすぎる can read as faint backhanded praise, depending on tone), where とてもきれい is a simple, unambiguous compliment.`,
    examples: [
      { ja: "昨日[きのう]、お酒[さけ]を飲[の]みすぎました。", en: "I drank too much alcohol yesterday." },
      { ja: "このかばんは高[たか]すぎて、買[か]えません。", en: "This bag is too expensive, so I can't buy it." },
      { ja: "図書館[としょかん]は静[しず]かすぎて、少[すこ]し怖[こわ]いです。", en: "The library is too quiet, and it's a little scary." },
      { ja: "働[はたら]きすぎは体[からだ]によくないです。", en: "Overworking isn't good for your health." },
    ],
    related: ["n5.i-adjectives", "n5.na-adjectives", "n5.masu-form"],
  },
];

export const exercises: Exercise[] = [
  // -------------------------------------------------------------------
  // n4.ta-koto-ga-aru
  // -------------------------------------------------------------------
  {
    id: "n4.ta-koto-ga-aru.ex1",
    grammarPointId: "n4.ta-koto-ga-aru",
    source: "bank",
    kind: "translation",
    promptEn: "I have been to Kyoto before.",
    accepted: ["京都[きょうと]に行[い]ったことがあります。", "京都[きょうと]へ行[い]ったことがあります。"],
    hint: "use 〜たことがある",
  },
  {
    id: "n4.ta-koto-ga-aru.ex2",
    grammarPointId: "n4.ta-koto-ga-aru",
    source: "bank",
    kind: "translation",
    promptEn: "I have never eaten natto.",
    accepted: ["納豆[なっとう]を食[た]べたことがありません。", "納豆[なっとう]を食[た]べたことが一度[いちど]もありません。"],
    hint: "use 〜たことがない",
  },
  {
    id: "n4.ta-koto-ga-aru.ex3",
    grammarPointId: "n4.ta-koto-ga-aru",
    source: "bank",
    kind: "cloze",
    sentence: "彼[かれ]は海外[かいがい]に＿＿ことがあります。",
    accepted: ["住[す]んだ"],
    translationEn: "He has lived abroad before.",
  },
  {
    id: "n4.ta-koto-ga-aru.ex4",
    grammarPointId: "n4.ta-koto-ga-aru",
    source: "bank",
    kind: "cloze",
    sentence: "この映画[えいが]は前[まえ]に＿＿ことがあります。",
    accepted: ["見[み]た"],
    translationEn: "I've seen this movie before.",
  },
  {
    id: "n4.ta-koto-ga-aru.ex5",
    grammarPointId: "n4.ta-koto-ga-aru",
    source: "bank",
    kind: "mcq",
    question: "私[わたし]は富士山[ふじさん]に＿＿ことがあります。",
    choices: ["登[のぼ]った", "登[のぼ]る", "登[のぼ]って", "登[のぼ]ります"],
    correctIndex: 0,
    explanation: "〜たことがある requires the plain past (た-form) immediately before ことがある: 登った.",
  },
  {
    id: "n4.ta-koto-ga-aru.ex6",
    grammarPointId: "n4.ta-koto-ga-aru",
    source: "bank",
    kind: "mcq",
    question: "田中[たなか]さんは時々[ときどき]会議[かいぎ]に＿＿。",
    choices: ["遅[おく]れることがあります", "遅[おく]れたことがあります", "遅[おく]れませんでした", "遅[おく]れることができます"],
    correctIndex: 0,
    explanation: "Dictionary form + ことがある means 'sometimes happens' — describes recurring occasional behavior, unlike たことがある (the experience of having done something at least once).",
  },
  {
    id: "n4.ta-koto-ga-aru.ex7",
    grammarPointId: "n4.ta-koto-ga-aru",
    source: "bank",
    kind: "ordering",
    segments: ["彼[かれ]は", "タイ料理[りょうり]を", "食[た]べたことが", "あります。"],
    starIndex: 2,
    translationEn: "He has eaten Thai food before.",
  },

  // -------------------------------------------------------------------
  // n4.tari-tari
  // -------------------------------------------------------------------
  {
    id: "n4.tari-tari.ex1",
    grammarPointId: "n4.tari-tari",
    source: "bank",
    kind: "translation",
    promptEn: "On my day off, I do things like read manga and watch movies.",
    accepted: [
      "休[やす]みの日[ひ]に漫画[まんが]を読[よ]んだり、映画[えいが]を見[み]たりします。",
      "休[やす]みの日[ひ]に映画[えいが]を見[み]たり、漫画[まんが]を読[よ]んだりする。",
    ],
    hint: "use 〜たり〜たりする",
  },
  {
    id: "n4.tari-tari.ex2",
    grammarPointId: "n4.tari-tari",
    source: "bank",
    kind: "translation",
    promptEn: "Last weekend, we did things like swim and play volleyball at the beach.",
    accepted: [
      "先週末[せんしゅうまつ]、海[うみ]で泳[およ]いだり、バレーボールをしたりしました。",
      "先週末[せんしゅうまつ]、海[うみ]でバレーボールをしたり、泳[およ]いだりしました。",
    ],
  },
  {
    id: "n4.tari-tari.ex3",
    grammarPointId: "n4.tari-tari",
    source: "bank",
    kind: "cloze",
    sentence: "週末[しゅうまつ]は掃除[そうじ]を＿＿、買[か]い物[もの]に行[い]ったりします。",
    accepted: ["したり"],
    translationEn: "On weekends, I do things like clean and go shopping.",
  },
  {
    id: "n4.tari-tari.ex4",
    grammarPointId: "n4.tari-tari",
    source: "bank",
    kind: "cloze",
    sentence: "友達[ともだち]と話[はな]したり、ゲームを＿＿して、楽[たの]しかったです。",
    accepted: ["したり"],
    translationEn: "I talked with friends, played games, and had fun.",
  },
  {
    id: "n4.tari-tari.ex5",
    grammarPointId: "n4.tari-tari",
    source: "bank",
    kind: "mcq",
    question: "日曜日[にちようび]は本[ほん]を読[よ]んだり、音楽[おんがく]を＿＿します。",
    choices: ["聞[き]いたり", "聞[き]いて", "聞[き]く", "聞[き]きます"],
    correctIndex: 0,
    explanation: "The たり〜たりする pattern requires たり on each listed verb (聞いたり); only the final する carries the sentence's tense.",
  },
  {
    id: "n4.tari-tari.ex6",
    grammarPointId: "n4.tari-tari",
    source: "bank",
    kind: "mcq",
    question: "祭[まつり]では、花火[はなび]を見[み]たり、屋台[やたい]で＿＿たりしました。",
    choices: ["食[た]べ", "食[た]べる", "食[た]べて", "食[た]べた"],
    correctIndex: 0,
    explanation: "たり attaches to the verb's た-form root (食べ+たり=食べたり); the other choices would give ungrammatical combinations like 食べるたり or 食べてたり.",
  },
  {
    id: "n4.tari-tari.ex7",
    grammarPointId: "n4.tari-tari",
    source: "bank",
    kind: "ordering",
    segments: ["疲[つか]れた時[とき]は、", "コーヒーを", "飲[の]んだり", "します。"],
    starIndex: 2,
    translationEn: "When I'm tired, I do things like drinking coffee.",
  },

  // -------------------------------------------------------------------
  // n4.nagara
  // -------------------------------------------------------------------
  {
    id: "n4.nagara.ex1",
    grammarPointId: "n4.nagara",
    source: "bank",
    kind: "translation",
    promptEn: "I eat breakfast while reading the newspaper.",
    accepted: ["新聞[しんぶん]を読[よ]みながら朝[あさ]ご飯[はん]を食[た]べます。", "新聞[しんぶん]を読[よ]みながら朝[あさ]ご飯[はん]を食[た]べる。"],
    hint: "use ます-stem + ながら; the eating is the main action",
  },
  {
    id: "n4.nagara.ex2",
    grammarPointId: "n4.nagara",
    source: "bank",
    kind: "translation",
    promptEn: "Don't talk while eating.",
    accepted: ["食[た]べながら話[はな]さないでください。", "食[た]べながら話[はな]さないで。"],
  },
  {
    id: "n4.nagara.ex3",
    grammarPointId: "n4.nagara",
    source: "bank",
    kind: "cloze",
    sentence: "テレビを＿＿、宿題[しゅくだい]をしないでください。",
    accepted: ["見[み]ながら"],
    translationEn: "Please don't do homework while watching TV.",
  },
  {
    id: "n4.nagara.ex4",
    grammarPointId: "n4.nagara",
    source: "bank",
    kind: "cloze",
    sentence: "彼[かれ]は音楽[おんがく]を＿＿、絵[え]を描[か]いています。",
    accepted: ["聞[き]きながら"],
    translationEn: "He is painting while listening to music.",
  },
  {
    id: "n4.nagara.ex5",
    grammarPointId: "n4.nagara",
    source: "bank",
    kind: "mcq",
    question: "電話[でんわ]で話[はな]し＿＿、運転[うんてん]しないでください。",
    choices: ["ながら", "ながらも", "ので", "けど"],
    correctIndex: 0,
    explanation: "ながら attaches to the ます-stem to link two simultaneous actions by the same subject: 話しながら運転する (drive while talking on the phone) — the point being warned against here.",
  },
  {
    id: "n4.nagara.ex6",
    grammarPointId: "n4.nagara",
    source: "bank",
    kind: "mcq",
    question: "友達[ともだち]と＿＿ながら、公園[こうえん]を歩[ある]きました。",
    choices: ["話[はな]し", "話[はな]す", "話[はな]して", "話[はな]した"],
    correctIndex: 0,
    explanation: "ながら attaches directly to the ます-stem (話し), not the dictionary, て-, or た-form.",
  },
  {
    id: "n4.nagara.ex7",
    grammarPointId: "n4.nagara",
    source: "bank",
    kind: "ordering",
    segments: ["母[はは]は", "歌[うた]を歌[うた]いながら、", "料理[りょうり]を", "作[つく]っています。"],
    starIndex: 2,
    translationEn: "My mother is cooking while singing a song.",
  },

  // -------------------------------------------------------------------
  // n4.te-oku
  // -------------------------------------------------------------------
  {
    id: "n4.te-oku.ex1",
    grammarPointId: "n4.te-oku",
    source: "bank",
    kind: "translation",
    promptEn: "I'll wash the dishes before the guests arrive.",
    accepted: ["お客[きゃく]さんが来[く]る前[まえ]に、お皿[さら]を洗[あら]っておきます。", "お客[きゃく]さんが来[く]る前[まえ]に、お皿[さら]を洗[あら]っておく。"],
    hint: "use 〜ておく",
  },
  {
    id: "n4.te-oku.ex2",
    grammarPointId: "n4.te-oku",
    source: "bank",
    kind: "translation",
    promptEn: "Please leave the window open.",
    accepted: ["窓[まど]を開[あ]けておいてください。", "窓[まど]を開[あ]けたままにしておいてください。"],
  },
  {
    id: "n4.te-oku.ex3",
    grammarPointId: "n4.te-oku",
    source: "bank",
    kind: "cloze",
    sentence: "旅行[りょこう]の前[まえ]に、ホテルを＿＿おきました。",
    accepted: ["予約[よやく]して"],
    translationEn: "I made a hotel reservation in advance before the trip.",
  },
  {
    id: "n4.te-oku.ex4",
    grammarPointId: "n4.te-oku",
    source: "bank",
    kind: "cloze",
    sentence: "使[つか]ったら、そのままに＿＿ください。",
    accepted: ["しておいて"],
    translationEn: "Once you're done using it, please just leave it as it is.",
  },
  {
    id: "n4.te-oku.ex5",
    grammarPointId: "n4.te-oku",
    source: "bank",
    kind: "mcq",
    question: "パーティーのために、飲[の]み物[もの]をたくさん＿＿。",
    choices: ["買[か]っておきました", "買[か]わせました", "買[か]えました", "買[か]われました"],
    correctIndex: 0,
    explanation: "ておく (bought in advance) fits here; the other choices are causative (買わせました — made someone buy), potential (買えました — could buy), and passive (買われました — was bought) forms.",
  },
  {
    id: "n4.te-oku.ex6",
    grammarPointId: "n4.te-oku",
    source: "bank",
    kind: "mcq",
    question: "忘[わす]れないように、名前[なまえ]をここに＿＿。",
    choices: ["書[か]いておきます", "書[か]かせます", "書[か]けます", "書[か]かれます"],
    correctIndex: 0,
    explanation: "ておく expresses doing something now so it's ready/useful later (writing the name down so it won't be forgotten); the other options are causative, potential, and passive forms.",
  },
  {
    id: "n4.te-oku.ex7",
    grammarPointId: "n4.te-oku",
    source: "bank",
    kind: "ordering",
    segments: ["友達[ともだち]が", "来[く]る前[まえ]に、", "部屋[へや]を", "掃除[そうじ]しておきました。"],
    starIndex: 2,
    translationEn: "I cleaned the room in advance before my friend came.",
  },

  // -------------------------------------------------------------------
  // n4.te-shimau
  // -------------------------------------------------------------------
  {
    id: "n4.te-shimau.ex1",
    grammarPointId: "n4.te-shimau",
    source: "bank",
    kind: "translation",
    promptEn: "I already finished reading this book.",
    accepted: ["この本[ほん]はもう読[よ]んでしまいました。", "もうこの本[ほん]を読[よ]んでしまいました。"],
  },
  {
    id: "n4.te-shimau.ex2",
    grammarPointId: "n4.te-shimau",
    source: "bank",
    kind: "translation",
    promptEn: "I lost my key (unfortunately).",
    accepted: ["鍵[かぎ]をなくしてしまいました。", "鍵[かぎ]をなくしちゃいました。"],
    hint: "use 〜てしまう to show it was unwanted/unfortunate",
  },
  {
    id: "n4.te-shimau.ex3",
    grammarPointId: "n4.te-shimau",
    source: "bank",
    kind: "cloze",
    sentence: "友達[ともだち]との約束[やくそく]を＿＿しまいました。",
    accepted: ["忘[わす]れて"],
    translationEn: "I forgot my promise with my friend (unfortunately).",
  },
  {
    id: "n4.te-shimau.ex4",
    grammarPointId: "n4.te-shimau",
    source: "bank",
    kind: "cloze",
    sentence: "暑[あつ]くて、アイスクリームが＿＿しまいました。",
    accepted: ["溶[と]けて"],
    translationEn: "It was hot, and the ice cream ended up melting.",
  },
  {
    id: "n4.te-shimau.ex5",
    grammarPointId: "n4.te-shimau",
    source: "bank",
    kind: "mcq",
    question: "大切[たいせつ]な書類[しょるい]を＿＿しまいました。",
    choices: ["なくして", "なくす", "なくした", "なくします"],
    correctIndex: 0,
    explanation: "てしまう attaches to the て-form; なくして is the correct form immediately before しまいました.",
  },
  {
    id: "n4.te-shimau.ex6",
    grammarPointId: "n4.te-shimau",
    source: "bank",
    kind: "mcq",
    question: "彼[かれ]は宿題[しゅくだい]を一時間[いちじかん]で全部[ぜんぶ]＿＿。",
    choices: ["やってしまいました", "やってあげました", "やってもらいました", "やっておきました"],
    correctIndex: 0,
    explanation: "やってしまいました emphasizes that he completed all the homework entirely (in just one hour); あげました/もらいました are giving-receiving verbs that don't fit, and おきました would mean doing it in advance, not describing completion.",
  },
  {
    id: "n4.te-shimau.ex7",
    grammarPointId: "n4.te-shimau",
    source: "bank",
    kind: "ordering",
    segments: ["大切[たいせつ]な", "写真[しゃしん]を", "消[け]して", "しまいました。"],
    starIndex: 2,
    translationEn: "I accidentally deleted an important photo.",
  },

  // -------------------------------------------------------------------
  // n4.te-miru
  // -------------------------------------------------------------------
  {
    id: "n4.te-miru.ex1",
    grammarPointId: "n4.te-miru",
    source: "bank",
    kind: "translation",
    promptEn: "I tried wearing this dress.",
    accepted: ["このドレスを着[き]てみました。", "このドレスを着[き]てみた。"],
  },
  {
    id: "n4.te-miru.ex2",
    grammarPointId: "n4.te-miru",
    source: "bank",
    kind: "translation",
    promptEn: "Please try calling him.",
    accepted: ["彼[かれ]に電話[でんわ]してみてください。", "彼[かれ]に電話[でんわ]をかけてみてください。"],
  },
  {
    id: "n4.te-miru.ex3",
    grammarPointId: "n4.te-miru",
    source: "bank",
    kind: "cloze",
    sentence: "分[わ]からないことがあったら、辞書[じしょ]で＿＿ください。",
    accepted: ["調[しら]べてみて"],
    translationEn: "If there's something you don't understand, please try looking it up in the dictionary.",
  },
  {
    id: "n4.te-miru.ex4",
    grammarPointId: "n4.te-miru",
    source: "bank",
    kind: "cloze",
    sentence: "一度[いちど]、あの新[あたら]しいレストランに＿＿たいです。",
    accepted: ["行[い]ってみ"],
    translationEn: "I want to try going to that new restaurant once.",
  },
  {
    id: "n4.te-miru.ex5",
    grammarPointId: "n4.te-miru",
    source: "bank",
    kind: "mcq",
    question: "この靴[くつ]を＿＿もいいですか。",
    choices: ["履[は]いてみて", "履[は]いてみ", "履[は]いてみる", "履[は]きてみて"],
    correctIndex: 0,
    explanation: "〜てみてもいいですか (may I try doing X) needs the て-form of てみる itself — 履いてみて — before もいいですか; the other choices are ungrammatical conjugations.",
  },
  {
    id: "n4.te-miru.ex6",
    grammarPointId: "n4.te-miru",
    source: "bank",
    kind: "mcq",
    question: "難[むずか]しそうですが、まず自分[じぶん]で＿＿。",
    choices: ["やってみます", "やってみません", "やってあげます", "やってもらいます"],
    correctIndex: 0,
    explanation: "やってみます (I'll try doing it myself and see) fits 'first, I'll try it myself'; あげます/もらいます are giving-receiving verbs that don't match doing something oneself, and みません is negative, contradicting 'first, I'll try.'",
  },
  {
    id: "n4.te-miru.ex7",
    grammarPointId: "n4.te-miru",
    source: "bank",
    kind: "ordering",
    segments: ["私[わたし]は", "自分[じぶん]で", "料理[りょうり]を", "作[つく]ってみたいです。"],
    starIndex: 2,
    translationEn: "I want to try cooking by myself.",
  },

  // -------------------------------------------------------------------
  // n4.sugiru
  // -------------------------------------------------------------------
  {
    id: "n4.sugiru.ex1",
    grammarPointId: "n4.sugiru",
    source: "bank",
    kind: "translation",
    promptEn: "I ate too much last night.",
    accepted: ["昨夜[ゆうべ]、食[た]べすぎました。", "昨夜[ゆうべ]、食[た]べすぎた。"],
  },
  {
    id: "n4.sugiru.ex2",
    grammarPointId: "n4.sugiru",
    source: "bank",
    kind: "translation",
    promptEn: "This test was too difficult.",
    accepted: ["このテストは難[むずか]しすぎました。", "このテストは難[むずか]しすぎた。"],
  },
  {
    id: "n4.sugiru.ex3",
    grammarPointId: "n4.sugiru",
    source: "bank",
    kind: "cloze",
    sentence: "このコーヒーは＿＿すぎて、飲[の]めません。",
    accepted: ["熱[あつ]"],
    translationEn: "This coffee is too hot to drink.",
  },
  {
    id: "n4.sugiru.ex4",
    grammarPointId: "n4.sugiru",
    source: "bank",
    kind: "cloze",
    sentence: "毎日[まいにち]お酒[さけ]を＿＿すぎるのは体[からだ]によくないです。",
    accepted: ["飲[の]み"],
    translationEn: "Drinking alcohol too much every day isn't good for your health.",
  },
  {
    id: "n4.sugiru.ex5",
    grammarPointId: "n4.sugiru",
    source: "bank",
    kind: "mcq",
    question: "この店[みせ]のラーメンは＿＿すぎて、ちょっと食[た]べにくいです。",
    choices: ["辛[から]", "辛[から]い", "辛[から]く", "辛[から]かった"],
    correctIndex: 0,
    explanation: "すぎる attaches to an い-adjective stem after dropping the final い: 辛い→辛すぎる, so 辛 is correct here.",
  },
  {
    id: "n4.sugiru.ex6",
    grammarPointId: "n4.sugiru",
    source: "bank",
    kind: "mcq",
    question: "働[はたら]き＿＿は体[からだ]によくないですよ。",
    choices: ["すぎ", "すぎる", "すぎて", "すぎた"],
    correctIndex: 0,
    explanation: "The noun form of すぎる drops る: 働きすぎ (overworking), used here as a topic noun rather than a conjugated verb.",
  },
  {
    id: "n4.sugiru.ex7",
    grammarPointId: "n4.sugiru",
    source: "bank",
    kind: "ordering",
    segments: ["この漢字[かんじ]は", "複雑[ふくざつ]すぎて、", "覚[おぼ]えられません。"],
    starIndex: 1,
    translationEn: "This kanji is too complicated, so I can't remember it.",
  },
];

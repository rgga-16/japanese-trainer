// N4 grammar seed content: 10 points with lessons, examples, and bank exercises.
// Furigana notation throughout (see src/engine/furigana.ts).

import type { Exercise, GrammarPoint } from "../../types";

export const points: GrammarPoint[] = [
  {
    id: "n4.potential",
    level: "N4",
    category: "verb-forms",
    title: "可能形",
    meaning: "potential form — can do ~",
    formation: [
      "Godan: change the final u-row kana to e-row + る (書[か]く→書[か]ける, 飲[の]む→飲[の]める)",
      "Ichidan: drop る, add られる (食[た]べる→食[た]べられる); casual ら抜[ぬ]き 食[た]べれる is common in speech",
      "する→できる; 来[く]る→来[こ]られる",
      "The object of a potential verb often takes が instead of を",
    ],
    lesson: `The potential form turns any verb into a new ichidan verb meaning "can do X." For godan verbs, shift the final kana to the e-row and add る (書[か]く→書[か]ける, 飲[の]む→飲[の]める). For ichidan verbs, drop る and add られる (食[た]べる→食[た]べられる).

られる is shared between the ichidan potential and the ichidan passive — context usually disambiguates: 食[た]べられる can mean "can eat" or "is eaten," but the potential reading is clearer when the object is marked with が (パンが食[た]べられる — can eat bread) rather than に (an agent marker typical of passive sentences).

In casual speech, ichidan verbs commonly drop the ら (**ら抜[ぬ]き言葉[ことば]**): 食[た]べれる instead of 食[た]べられる. This is extremely common but considered non-standard in formal writing, so the full form is safer for JLPT answers.

できる is both the potential of する and a standalone verb meaning "to be capable of / to be completed": 日本語[にほんご]ができる (can [do/speak] Japanese).

A common mistake is applying the godan e-row pattern to する (saying ×しれる instead of できる), or forgetting that potential objects prefer が — 英語[えいご]が話[はな]せます sounds more natural than 英語[えいご]を話[はな]せます, though を is not strictly wrong.`,
    examples: [
      { ja: "私[わたし]は漢字[かんじ]が読[よ]めます。", en: "I can read kanji." },
      { ja: "田中[たなか]さんは日本語[にほんご]を話[はな]すことができます。", en: "Mr. Tanaka can speak Japanese." },
      { ja: "今日[きょう]は忙[いそが]しくて、休[やす]めません。", en: "I'm busy today, so I can't rest." },
      { ja: "一人[ひとり]で来[こ]られますか。", en: "Can you come alone?" },
    ],
    related: ["n4.passive", "n5.masu-form"],
  },
  {
    id: "n4.passive",
    level: "N4",
    category: "verb-forms",
    title: "受身形",
    meaning: "passive form — direct passive and suffering/indirect passive",
    formation: [
      "Godan: change the final u-row kana to a-row + れる (書[か]く→書[か]かれる); う-verbs → われる (買[か]う→買[か]われる)",
      "Ichidan: drop る, add られる (見[み]る→見[み]られる)",
      "する→される; 来[く]る→来[こ]られる",
      "Direct passive: [thing]が/は…される, agent marked に (formal/written: によって)",
    ],
    lesson: `The direct passive parallels English "is done": この本[ほん]は多[おお]くの人[ひと]に読[よ]まれています (this book is read by many people). The agent (the doer) is marked with に, or によって in more formal/written contexts.

Japanese also has a distinctly local pattern, the **suffering/adversity passive** (迷惑[めいわく]の受身), which can even be built from intransitive verbs to say the speaker was negatively affected by someone else's action: 雨[あめ]に降[ふ]られました (literally "was rained on," meaning it rained and I was inconvenienced by it — got caught in the rain); 友達[ともだち]に来[こ]られて、勉強[べんきょう]できなかった (a friend came [uninvited] and I couldn't study). This nuance often has no direct English translation and depends on context.

For ichidan verbs, られる is identical whether the meaning is potential or passive — only context tells them apart: an agent marked with に usually signals passive, while が marking the thing acted on usually signals potential.

A common mistake is overusing the passive for plain factual statements where Japanese actually prefers the active voice far more than English does. Also remember: the suffering passive's whole point is the speaker's negative feeling about the event, so it's odd to use it for something the speaker was happy about.`,
    examples: [
      { ja: "このパンは毎朝[まいあさ]焼[や]かれます。", en: "This bread is baked every morning." },
      { ja: "私[わたし]は先生[せんせい]に褒[ほ]められました。", en: "I was praised by my teacher." },
      { ja: "子供[こども]の時[とき]、よく兄[あに]にいじめられました。", en: "When I was a child, I was often bullied by my older brother." },
      { ja: "昨日[きのう]、雨[あめ]に降[ふ]られました。", en: "I got rained on yesterday (and it was a bother)." },
    ],
    related: ["n4.potential", "n4.causative"],
  },
  {
    id: "n4.causative",
    level: "N4",
    category: "verb-forms",
    title: "使役形",
    meaning: "causative form — make/let someone do ~",
    formation: [
      "Godan: change the final u-row kana to a-row + せる (書[か]く→書[か]かせる); う-verbs → わせる (買[か]う→買[か]わせる)",
      "Ichidan: drop る, add させる (食[た]べる→食[た]べさせる)",
      "する→させる; 来[く]る→来[こ]させる",
      "[causer]は[causee]に/を…せる/させる — に if the verb already has an を object, を if the base verb is intransitive",
    ],
    lesson: `The causative expresses either "make someone do" (coercion) or "let someone do" (permission), depending on context and the feeling of the sentence. Godan verbs shift to the a-row and add せる (書[か]く→書[か]かせる); ichidan verbs drop る and add させる (食[た]べる→食[た]べさせる).

The causee's particle depends on whether the base verb already takes an object: if it does, the causee is marked with に, since を is already busy marking the object (先生[せんせい]は学生[がくせい]に本[ほん]を読[よ]ませた — the teacher made the student read a book). If the base verb is intransitive with no other object, the causee takes を instead (母[はは]は子供[こども]を歩[ある]かせた — the mother made the child walk).

A polite way to ask for permission to do something yourself is causative-て + ください: 使[つか]わせてください (please let me use [it]).

At a more advanced level, the causative combines with the passive to mean "was made to do" (causative-passive: せられる/される — 行[い]かせられる, often contracted for godan verbs to 行[い]かされる; ichidan verbs like 食[た]べさせられる don't contract).

A common mistake is confusing causative せる/させる with potential/passive られる — they look superficially similar but mean roughly opposite things (せる = make/let do, られる = can do / is done).`,
    examples: [
      { ja: "母[はは]は子供[こども]に野菜[やさい]を食[た]べさせました。", en: "My mother made the child eat vegetables." },
      { ja: "先生[せんせい]は学生[がくせい]に漢字[かんじ]を書[か]かせました。", en: "The teacher made the students write kanji." },
      { ja: "少[すこ]し休[やす]ませてください。", en: "Please let me rest a little." },
      { ja: "部長[ぶちょう]は私[わたし]を早[はや]く帰[かえ]らせました。", en: "The manager let/made me go home early." },
    ],
    related: ["n4.passive", "n4.volitional"],
  },
  {
    id: "n4.volitional",
    level: "N4",
    category: "verb-forms",
    title: "意向形",
    meaning: "volitional form — let's / I will (intend to); 〜(よ)うと思う I think I'll do ~",
    formation: [
      "Godan: change the final u-row kana to o-row + う (行[い]く→行[い]こう, 飲[の]む→飲[の]もう)",
      "Ichidan: drop る, add よう (食[た]べる→食[た]べよう)",
      "する→しよう; 来[く]る→来[こ]よう",
      "Volitional + と思[おも]います — states an intention/decision made just now",
    ],
    lesson: `The volitional form has two main uses: alone, it's a casual "let's do X" (among friends, roughly equivalent to the polite 〜ましょう: 行[い]こう casually = 行[い]きましょう politely). Combined with と思[おも]う, it states the speaker's own intention or decision — "I think I'll do X" / "I've decided to X."

Compare 〜と思[おも]います (a decision made in the moment, right now) with the related-but-different 〜つもりです (a pre-existing plan). Both translate loosely as "intend to," but と思[おも]います carries more of a fresh, just-decided nuance.

A common mistake is using volitional + と思[おも]う to describe someone else's intentions — と思[おも]う reports the speaker's own thoughts, so it's grammatically odd for a third party (for others' plans, you'd need something like 〜と思[おも]っている, an observed/reported thought). Also remember volitional isn't just "future tense" — ます-form already covers plain future actions; volitional specifically adds the nuance of an active decision or an invitation to join in.`,
    examples: [
      { ja: "疲[つか]れたから、少[すこ]し休[やす]もう。", en: "I'm tired, so let's rest a bit." },
      { ja: "今度[こんど]の休[やす]みに旅行[りょこう]に行[い]こうと思[おも]います。", en: "I'm thinking of going on a trip next holiday." },
      { ja: "一緒[いっしょ]に映画[えいが]を見[み]よう。", en: "Let's watch a movie together." },
      { ja: "今晩[こんばん]は早[はや]く寝[ね]ようと思[おも]います。", en: "I think I'll go to bed early tonight." },
    ],
    related: ["n4.causative"],
  },
  {
    id: "n4.ba-tara",
    level: "N4",
    category: "conditionals",
    title: "〜ば・〜たら",
    meaning: "conditionals 〜ば and 〜たら — if/when",
    formation: [
      "ば-form: godan e-row + ば (飲[の]む→飲[の]めば); ichidan drop る + れば; する→すれば; 来[く]る→来[く]れば",
      "い-adjective: drop い + ければ (高[たか]い→高[たか]ければ)",
      "な-adjective/noun: stem + なら(ば) (静[しず]かなら)",
      "たら-form: た-form + ら for everything (食[た]べたら, 飲[の]んだら, 高[たか]かったら, 静[しず]かだったら)",
    ],
    lesson: `Both ば and たら translate to "if/when," but with different constraints. たら is the most versatile — usable for hypotheticals, one-time future events, and even sequential "when X happened, Y" narrations: 家[いえ]に帰[かえ]ったら、誰[だれ]もいませんでした (when I got home, no one was there).

ば is more restricted: it works well for general or habitual truths and hypotheticals (お金[かね]があれば、旅行[りょこう]します — if I had money, I would travel) and is common in set expressions and with adjectives (安[やす]ければ買[か]います). Traditionally, ば is avoided when the main clause is a one-time request, invitation, or command with the same subject as the if-clause — たら is used instead in those cases.

Sound changes for たら mirror the た-form exactly: ぬ/ぶ/む→んだら, く→いたら, ぐ→いだら, う/つ/る→ったら, す→したら.

A common mistake is using ば with a past/completed main-clause event (日本[にほん]に行[い]けば、写真[しゃしん]をたくさん撮[と]った is odd — it should be 日本[にほん]に行[い]ったら…). Also watch the い-adjective ば-form: it's ければ (安[やす]ければ), never いければ or くれば.`,
    examples: [
      { ja: "安[やす]ければ、買[か]います。", en: "If it's cheap, I'll buy it." },
      { ja: "日本[にほん]に行[い]ったら、たくさん写真[しゃしん]を撮[と]りたいです。", en: "When I go to Japan, I want to take a lot of photos." },
      { ja: "雨[あめ]が降[ふ]れば、試合[しあい]は中止[ちゅうし]です。", en: "If it rains, the game will be cancelled." },
      { ja: "家[いえ]に帰[かえ]ったら、誰[だれ]もいませんでした。", en: "When I got home, no one was there." },
    ],
    related: ["n4.nakereba-naranai"],
  },
  {
    id: "n4.nakereba-naranai",
    level: "N4",
    category: "expressions",
    title: "〜なければならない・〜なくてもいい",
    meaning: "〜なければならない (must / have to) and 〜なくてもいい (don't have to)",
    formation: [
      "ない-form drop い, add ければならない — 行[い]かなければならない (must go)",
      "Near-synonym: 〜なければいけない; casual contractions なきゃ(いけない), なくちゃ(いけない)",
      "ない-form drop い, add くてもいい — 行[い]かなくてもいい (don't have to go)",
    ],
    lesson: `〜なければならない literally means "if [one] doesn't do X, it won't do" — giving the sense of obligation, "must." The near-synonym 〜なければいけない is largely interchangeable; ならない leans slightly more toward an objective/general rule, while いけない can feel a bit more personal or spoken, though the difference is subtle and both are widely used.

Very common casual contractions are なきゃ(いけない) and なくちゃ(いけない), heard constantly in spoken Japanese, though the full forms are safer for formal writing and JLPT answers.

The negative-obligation opposite is 〜なくてもいい — "it's fine even without doing X," i.e. don't have to / no need to. It's built the same way, just swapping ければならない for くてもいい: 行[い]かなくてもいい (don't have to go).

A common mistake is confusing 〜なければならない (must do) with 〜てはいけない (must not do — a different, opposite-meaning pattern). Remember なければ already contains the negative ない, so the whole phrase logically works out to "must," not "must not" — the double-negative flavor ("if not, no good") equals an obligation to do it.`,
    examples: [
      { ja: "明日[あした]は早[はや]く起[お]きなければなりません。", en: "I have to get up early tomorrow." },
      { ja: "レポートを来週[らいしゅう]までに出[だ]さなければいけません。", en: "I have to submit the report by next week." },
      { ja: "今日[きょう]は仕事[しごと]がないので、早[はや]く来[こ]なくてもいいです。", en: "There's no work today, so you don't have to come early." },
      { ja: "薬[くすり]を毎日[まいにち]飲[の]まなければなりません。", en: "I have to take the medicine every day." },
    ],
    related: ["n4.temo-ii", "n4.ba-tara"],
  },
  {
    id: "n4.temo-ii",
    level: "N4",
    category: "expressions",
    title: "〜てもいい・〜てはいけない",
    meaning: "〜てもいい (permission: may/it's okay to) and 〜てはいけない (prohibition: must not)",
    formation: [
      "て-form + もいい(です) — permission: 使[つか]ってもいいです (you may use it)",
      "て-form + はいけない/はいけません — prohibition: 使[つか]ってはいけません (you must not use it)",
      "Casual: 〜てもいい？(rising question); 〜ちゃ/じゃだめ — softer casual prohibition",
    ],
    lesson: `〜てもいい attaches to the て-form and grants or asks for permission — literally "even if [one] does X, it's fine." It's used both to ask permission (入[はい]ってもいいですか — may I come in?) and to grant it (はい、入[はい]ってもいいです).

Its opposite, 〜てはいけない, forbids an action — literally "if [one] does X, it's no good" — and is common in rules, signs, and instructions: ここでたばこを吸[す]ってはいけません (you must not smoke here).

Casual speech often contracts て→ちゃ and で→じゃ before だめ: 食[た]べちゃだめ (mustn't eat, casual) versus the more formal 食[た]べてはいけません.

A common mistake is confusing this pair with 〜なければならない/〜なくてもいい (obligation, "required," not "allowed"). てもいい/てはいけない is about what's *permitted*; なければならない/なくてもいい is about what's *required*. Also, in polite conversation, answering a てもいいですか question negatively is often softened to いいえ、ちょっと… rather than a blunt てはいけません.`,
    examples: [
      { ja: "ここに座[すわ]ってもいいですか。", en: "May I sit here?" },
      { ja: "教室[きょうしつ]で食[た]べてもいいですか。", en: "Is it okay to eat in the classroom?" },
      { ja: "図書館[としょかん]で大[おお]きい声[こえ]で話[はな]してはいけません。", en: "You must not talk loudly in the library." },
      { ja: "写真[しゃしん]を撮[と]ってはいけません。", en: "You must not take photos." },
    ],
    related: ["n4.nakereba-naranai"],
  },
  {
    id: "n4.age-kure-morau",
    level: "N4",
    category: "giving-receiving",
    title: "あげる・くれる・もらう",
    meaning: "giving/receiving verbs あげる・くれる・もらう, and て-form versions for favors",
    formation: [
      "あげる — the speaker (or their in-group) gives to someone else, never to the speaker themselves",
      "くれる — someone gives to the speaker (or the speaker's in-group); direction is inward",
      "もらう — the subject receives, marked with に or から for the giver",
      "て-form + あげる/くれる/もらう — doing a favor for/receiving a favor from someone",
    ],
    lesson: `Japanese giving/receiving verbs encode the *direction* of the exchange relative to the speaker — something English "give/receive" doesn't mark on the verb itself. あげる is used when the giver is the speaker (or someone in the speaker's sphere) and the receiver is someone else — never when the speaker is the receiver. くれる is the mirror image: someone else gives *to* the speaker or the speaker's in-group (family, close friends) — the direction is inward. もらう marks receiving, with the subject as receiver and the giver marked by に or から.

All three attach to the て-form to describe doing or receiving a favor, not just handing over an object: 手伝[てつだ]ってあげる (I'll help you, framed as a favor from me), 手伝[てつだ]ってくれる (someone helps me, framed as a favor to me), 手伝[てつだ]ってもらう (I get someone to help me, framed from the receiver's side).

〜てあげる can sound slightly presumptuous or condescending toward someone of higher status, so it's often avoided when talking about doing favors for superiors — 〜ましょうか is a safer, more humble alternative in polite contexts.

A very common beginner mistake is using あげる when the speaker is actually the receiver — it should be くれる. This trips up English speakers constantly, since English "give" doesn't distinguish direction. Also remember the giver in もらう sentences takes に or から — both are fine, but から is preferred when the giver is more of an impersonal source (an organization, a shop).`,
    examples: [
      { ja: "私[わたし]は妹[いもうと]に本[ほん]をあげました。", en: "I gave my younger sister a book." },
      { ja: "友達[ともだち]が私[わたし]に誕生日[たんじょうび]プレゼントをくれました。", en: "My friend gave me a birthday present." },
      { ja: "私[わたし]は先生[せんせい]に日本語[にほんご]を教[おし]えてもらいました。", en: "I had my teacher teach me Japanese." },
      { ja: "弟[おとうと]の宿題[しゅくだい]を手伝[てつだ]ってあげました。", en: "I helped my younger brother with his homework." },
    ],
    related: ["n4.temo-ii"],
  },
  {
    id: "n4.sou-da",
    level: "N4",
    category: "expressions",
    title: "〜そうだ（様態）",
    meaning: "〜そうだ — looks like/seems (based on visual appearance or immediate impression)",
    formation: [
      "い-adjective: drop い, add そう (おいしい→おいしそう); irregular いい→よさそう, ない→なさそう",
      "な-adjective: stem + そう (元気[げんき]→元気[げんき]そう)",
      "Verb ます-stem + そう (降[ふ]る→降[ふ]りそう, 落[お]ちる→落[お]ちそう)",
      "そうだ itself conjugates like a な-adjective: そうです, そうでした, そうな + noun",
    ],
    lesson: `This そうだ expresses a conjecture based on how something *looks* right now (様態[ようたい] — "manner/appearance"). It's completely different in formation from the unrelated-looking hearsay そうだ (伝聞[でんぶん], "I heard that...," attached to the full plain form: 雨[あめ]が降[ふ]るそうです — I heard it's going to rain — a separate N4 pattern).

The formation is the tell: appearance-そう drops the adjective ending or attaches to the verb stem (おいし+そう, 降[ふ]り+そう), while hearsay-そう attaches to the complete, unchanged plain form (おいしいそうだ, 降[ふ]るそうだ). A single い is the whole difference between "looks delicious" and "I heard it's delicious."

Watch the irregular adjectives: いい becomes よさそう (never ×いいそう), and ない becomes なさそう.

The verb use describes something about to happen based on visible signs: 雨[あめ]が降[ふ]りそうです (it looks like it's about to rain, from a dark sky); 荷物[にもつ]が落[お]ちそうです (the luggage looks like it's about to fall).

A common mistake is applying appearance-そう to something already confirmed rather than inferred from appearance — そう implies a guess from external cues, not a stated fact. Also remember そうだ itself needs な before a following noun, since it behaves like a な-adjective: 楽[たの]しそうな顔[かお] (a happy-looking face).`,
    examples: [
      { ja: "この料理[りょうり]はおいしそうです。", en: "This dish looks delicious." },
      { ja: "彼女[かのじょ]は今日[きょう]、元気[げんき]そうです。", en: "She looks energetic today." },
      { ja: "空[そら]が暗[くら]くて、雨[あめ]が降[ふ]りそうです。", en: "The sky is dark, and it looks like it's going to rain." },
      { ja: "楽[たの]しそうな顔[かお]をしていますね。", en: "You've got a happy-looking face, huh." },
    ],
    related: ["n4.you-ni-naru"],
  },
  {
    id: "n4.you-ni-naru",
    level: "N4",
    category: "sentence-patterns",
    title: "〜ようになる",
    meaning: "〜ようになる — reach the point where.../come to (change over time, ability or habit)",
    formation: [
      "Dictionary or potential form + ようになる — a gradual change resulting in a new ability/habit/state",
      "Negative counterpart: 〜なくなる — came to no longer do/be (食[た]べなくなる — no longer eats)",
      "Related but distinct: 〜ようにする — make a deliberate, ongoing effort to do something",
    ],
    lesson: `〜ようになる marks a *change of state over time* — most often the emergence of a new ability, built on the potential form (漢字[かんじ]が読[よ]めるようになりました — I've come to be able to read kanji), or a new habit/situation that wasn't true before, built on the plain dictionary form (朝[あさ]早[はや]く起[お]きるようになりました — I've started getting up early). The key nuance is gradual, resultant change — "before vs. after" — unlike a simple statement of current ability.

The negative なくなる marks the reverse: something that used to happen or be possible no longer does (甘[あま]いものを食[た]べなくなりました — I no longer eat sweets; 前[まえ]ほど忙[いそが]しくなくなりました — I'm not as busy as before).

Don't confuse this with the similar-looking 〜ようにする, which expresses a *deliberate, ongoing effort or policy* rather than a change that has already occurred: 野菜[やさい]を食[た]べるようにしています (I make a point of eating vegetables — an intentional habit, not necessarily a change that's already happened).

A common mistake is using ようになる for an action that isn't really a change (it needs a clear "before vs. after" contrast to make sense), or forgetting that adjectives use their adverbial form before なる (高[たか]くなる, 静[しず]かになる) rather than ようになる, which is reserved for verbs.`,
    examples: [
      { ja: "漢字[かんじ]が読[よ]めるようになりました。", en: "I've become able to read kanji." },
      { ja: "毎朝[まいあさ]、六時[ろくじ]に起[お]きるようになりました。", en: "I've started getting up at six every morning." },
      { ja: "最近[さいきん]、あまりテレビを見[み]なくなりました。", en: "Recently, I've stopped watching TV much." },
      { ja: "野菜[やさい]を食[た]べるようにしています。", en: "I make a point of eating vegetables." },
    ],
    related: ["n4.potential", "n4.sou-da"],
  },
];

export const exercises: Exercise[] = [
  // -------------------------------------------------------------------
  // n4.potential
  // -------------------------------------------------------------------
  {
    id: "n4.potential.ex1",
    grammarPointId: "n4.potential",
    source: "bank",
    kind: "translation",
    promptEn: "I can swim 1000 meters.",
    accepted: ["千[せん]メートル泳[およ]げます。", "千[せん]メートル泳[およ]ぐことができます。"],
  },
  {
    id: "n4.potential.ex2",
    grammarPointId: "n4.potential",
    source: "bank",
    kind: "translation",
    promptEn: "I couldn't sleep last night.",
    accepted: ["昨夜[ゆうべ]は眠[ねむ]れませんでした。", "昨夜[ゆうべ]は寝[ね]られませんでした。"],
  },
  {
    id: "n4.potential.ex3",
    grammarPointId: "n4.potential",
    source: "bank",
    kind: "cloze",
    sentence: "この漢字[かんじ]が＿＿ますか。",
    accepted: ["読[よ]め"],
    translationEn: "Can you read this kanji?",
  },
  {
    id: "n4.potential.ex4",
    grammarPointId: "n4.potential",
    source: "bank",
    kind: "cloze",
    sentence: "忙[いそが]しくて、今日[きょう]は友達[ともだち]に＿＿ませんでした。",
    accepted: ["会[あ]え"],
    translationEn: "I was busy, so I couldn't meet my friend today.",
  },
  {
    id: "n4.potential.ex5",
    grammarPointId: "n4.potential",
    source: "bank",
    kind: "mcq",
    question: "田中[たなか]さんは辛[から]い料理[りょうり]が＿＿。",
    choices: ["食[た]べられます", "食[た]べます", "食[た]べさせます", "食[た]べれば"],
    correctIndex: 0,
    explanation: "The potential form 食べられます (can eat) fits '田中さんは辛い料理が…' — が marks the object of ability.",
  },
  {
    id: "n4.potential.ex6",
    grammarPointId: "n4.potential",
    source: "bank",
    kind: "mcq",
    question: "この本[ほん]は難[むずか]しくて、すぐに＿＿。",
    choices: ["終[お]わりません", "終[お]われません", "終[お]わらせません", "終[お]わりました"],
    correctIndex: 1,
    explanation: "終わる is a godan verb; its potential form is 終われる → negative 終われません, 'cannot finish.'",
  },
  {
    id: "n4.potential.ex7",
    grammarPointId: "n4.potential",
    source: "bank",
    kind: "ordering",
    segments: ["お酒[さけ]が", "全然[ぜんぜん]", "飲[の]め", "ません。"],
    starIndex: 2,
    translationEn: "I can't drink alcohol at all.",
  },

  // -------------------------------------------------------------------
  // n4.passive
  // -------------------------------------------------------------------
  {
    id: "n4.passive.ex1",
    grammarPointId: "n4.passive",
    source: "bank",
    kind: "translation",
    promptEn: "This song is loved by many people.",
    accepted: ["この歌[うた]はたくさんの人[ひと]に愛[あい]されています。", "この歌[うた]は多[おお]くの人[ひと]に愛[あい]されています。"],
  },
  {
    id: "n4.passive.ex2",
    grammarPointId: "n4.passive",
    source: "bank",
    kind: "translation",
    promptEn: "I was scolded by my mother.",
    accepted: ["母[はは]に叱[しか]られました。", "私[わたし]は母[はは]に叱[しか]られました。"],
  },
  {
    id: "n4.passive.ex3",
    grammarPointId: "n4.passive",
    source: "bank",
    kind: "cloze",
    sentence: "この建物[たてもの]は百年前[ひゃくねんまえ]に＿＿。",
    accepted: ["建[た]てられました"],
    translationEn: "This building was built a hundred years ago.",
  },
  {
    id: "n4.passive.ex4",
    grammarPointId: "n4.passive",
    source: "bank",
    kind: "cloze",
    sentence: "夜[よる]、赤[あか]ちゃんに＿＿、よく眠[ねむ]れませんでした。",
    accepted: ["泣[な]かれて"],
    translationEn: "I couldn't sleep well because the baby cried [on me] at night.",
  },
  {
    id: "n4.passive.ex5",
    grammarPointId: "n4.passive",
    source: "bank",
    kind: "mcq",
    question: "このケーキは有名[ゆうめい]なパン屋[や]さんに＿＿。",
    choices: ["作[つく]られました", "作[つく]りました", "作[つく]らせました", "作[つく]れました"],
    correctIndex: 0,
    explanation: "The cake is the grammatical subject and undergoes the action, so passive 作られました (was made) is correct — the baker is marked with に.",
  },
  {
    id: "n4.passive.ex6",
    grammarPointId: "n4.passive",
    source: "bank",
    kind: "mcq",
    question: "電車[でんしゃ]の中[なか]で、隣[となり]の人[ひと]に足[あし]を＿＿。",
    choices: ["踏[ふ]まれました", "踏[ふ]みました", "踏[ふ]ませました", "踏[ふ]めました"],
    correctIndex: 0,
    explanation: "This is a suffering passive: the speaker was negatively affected by someone stepping on their foot, so 踏まれました is correct.",
  },
  {
    id: "n4.passive.ex7",
    grammarPointId: "n4.passive",
    source: "bank",
    kind: "ordering",
    segments: ["友達[ともだち]に", "パーティーに", "招待[しょうたい]", "されました。"],
    starIndex: 2,
    translationEn: "I was invited to the party by my friend.",
  },

  // -------------------------------------------------------------------
  // n4.causative
  // -------------------------------------------------------------------
  {
    id: "n4.causative.ex1",
    grammarPointId: "n4.causative",
    source: "bank",
    kind: "translation",
    promptEn: "The teacher made the students practice kanji.",
    accepted: ["先生[せんせい]は学生[がくせい]に漢字[かんじ]を練習[れんしゅう]させました。", "先生[せんせい]は学生[がくせい]に漢字[かんじ]の練習[れんしゅう]をさせました。"],
  },
  {
    id: "n4.causative.ex2",
    grammarPointId: "n4.causative",
    source: "bank",
    kind: "translation",
    promptEn: "Please let me use the telephone.",
    accepted: ["電話[でんわ]を使[つか]わせてください。", "電話[でんわ]を使[つか]わせてくださいませんか。"],
  },
  {
    id: "n4.causative.ex3",
    grammarPointId: "n4.causative",
    source: "bank",
    kind: "cloze",
    sentence: "母[はは]は妹[いもうと]に部屋[へや]を＿＿。",
    accepted: ["掃除[そうじ]させました"],
    translationEn: "My mother made my younger sister clean the room.",
  },
  {
    id: "n4.causative.ex4",
    grammarPointId: "n4.causative",
    source: "bank",
    kind: "cloze",
    sentence: "すみませんが、今日[きょう]は早[はや]く＿＿ください。",
    accepted: ["帰[かえ]らせて"],
    translationEn: "I'm sorry, but please let me go home early today.",
  },
  {
    id: "n4.causative.ex5",
    grammarPointId: "n4.causative",
    source: "bank",
    kind: "mcq",
    question: "医者[いしゃ]は患者[かんじゃ]に薬[くすり]を＿＿。",
    choices: ["飲[の]ませました", "飲[の]まれました", "飲[の]めました", "飲[の]みました"],
    correctIndex: 0,
    explanation: "The doctor caused the patient to take medicine, so the causative 飲ませました (made/had [them] drink) is correct.",
  },
  {
    id: "n4.causative.ex6",
    grammarPointId: "n4.causative",
    source: "bank",
    kind: "mcq",
    question: "父[ちち]は弟[おとうと]＿＿一人[ひとり]で旅行[りょこう]に行[い]かせました。",
    choices: ["を", "に", "が", "で"],
    correctIndex: 0,
    explanation: "行く is intransitive with no other object, so the causee takes を: 弟を行かせる (made [my] brother go).",
  },
  {
    id: "n4.causative.ex7",
    grammarPointId: "n4.causative",
    source: "bank",
    kind: "ordering",
    segments: ["部長[ぶちょう]は", "私[わたし]に", "報告書[ほうこくしょ]を", "書[か]かせました。"],
    starIndex: 2,
    translationEn: "The manager made me write the report.",
  },

  // -------------------------------------------------------------------
  // n4.volitional
  // -------------------------------------------------------------------
  {
    id: "n4.volitional.ex1",
    grammarPointId: "n4.volitional",
    source: "bank",
    kind: "translation",
    promptEn: "Let's eat lunch together.",
    accepted: ["一緒[いっしょ]に昼[ひる]ごはんを食[た]べよう。", "一緒[いっしょ]に昼[ひる]ごはんを食[た]べましょう。"],
  },
  {
    id: "n4.volitional.ex2",
    grammarPointId: "n4.volitional",
    source: "bank",
    kind: "translation",
    promptEn: "I think I'll study Japanese more from tomorrow.",
    accepted: ["明日[あした]からもっと日本語[にほんご]を勉強[べんきょう]しようと思[おも]います。", "明日[あした]からもっと日本語[にほんご]を勉強[べんきょう]しようと思[おも]う。"],
  },
  {
    id: "n4.volitional.ex3",
    grammarPointId: "n4.volitional",
    source: "bank",
    kind: "cloze",
    sentence: "雨[あめ]が降[ふ]りそうだから、傘[かさ]を＿＿。",
    accepted: ["持[も]とう"],
    translationEn: "It looks like rain, so let's bring an umbrella.",
  },
  {
    id: "n4.volitional.ex4",
    grammarPointId: "n4.volitional",
    source: "bank",
    kind: "cloze",
    sentence: "来年[らいねん]、日本[にほん]へ＿＿と思[おも]います。",
    accepted: ["行[い]こう"],
    translationEn: "I'm thinking of going to Japan next year.",
  },
  {
    id: "n4.volitional.ex5",
    grammarPointId: "n4.volitional",
    source: "bank",
    kind: "mcq",
    question: "お腹[なか]が空[す]いた。何[なに]か＿＿。",
    choices: ["食[た]べよう", "食[た]べる", "食[た]べます", "食[た]べて"],
    correctIndex: 0,
    explanation: "The casual self-invitation 'let's eat something' calls for the volitional form 食べよう, not the plain dictionary form.",
  },
  {
    id: "n4.volitional.ex6",
    grammarPointId: "n4.volitional",
    source: "bank",
    kind: "mcq",
    question: "今度[こんど]の週末[しゅうまつ]、新[あたら]しいレストランに＿＿と思[おも]います。",
    choices: ["行[い]こう", "行[い]く", "行[い]って", "行[い]けば"],
    correctIndex: 0,
    explanation: "〜(よ)うと思います requires the volitional form immediately before と思います to express a fresh intention.",
  },
  {
    id: "n4.volitional.ex7",
    grammarPointId: "n4.volitional",
    source: "bank",
    kind: "ordering",
    segments: ["来月[らいげつ]から", "日本語[にほんご]の", "勉強[べんきょう]を", "始[はじ]めようと思[おも]います。"],
    starIndex: 2,
    translationEn: "I think I'll start studying Japanese from next month.",
  },

  // -------------------------------------------------------------------
  // n4.ba-tara
  // -------------------------------------------------------------------
  {
    id: "n4.ba-tara.ex1",
    grammarPointId: "n4.ba-tara",
    source: "bank",
    kind: "translation",
    promptEn: "If you press this button, the door will open.",
    accepted: ["このボタンを押[お]せば、ドアが開[あ]きます。", "このボタンを押[お]したら、ドアが開[あ]きます。"],
  },
  {
    id: "n4.ba-tara.ex2",
    grammarPointId: "n4.ba-tara",
    source: "bank",
    kind: "translation",
    promptEn: "When I finish work, I'll call you.",
    accepted: ["仕事[しごと]が終[お]わったら、電話[でんわ]します。", "仕事[しごと]が終[お]わったら、電話[でんわ]をします。"],
  },
  {
    id: "n4.ba-tara.ex3",
    grammarPointId: "n4.ba-tara",
    source: "bank",
    kind: "cloze",
    sentence: "分[わ]からないことがあれば、＿＿ください。",
    accepted: ["聞[き]いて"],
    translationEn: "If there's anything you don't understand, please ask.",
  },
  {
    id: "n4.ba-tara.ex4",
    grammarPointId: "n4.ba-tara",
    source: "bank",
    kind: "cloze",
    sentence: "薬[くすり]を＿＿、よくなりますよ。",
    accepted: ["飲[の]んだら"],
    translationEn: "If you take the medicine, you'll get better.",
  },
  {
    id: "n4.ba-tara.ex5",
    grammarPointId: "n4.ba-tara",
    source: "bank",
    kind: "mcq",
    question: "値段[ねだん]が＿＿、この店[みせ]でよく買[か]い物[もの]をします。",
    choices: ["安[やす]ければ", "安[やす]いければ", "安[やす]くれば", "安[やす]きければ"],
    correctIndex: 0,
    explanation: "い-adjectives form ば by dropping い and adding ければ: 安い→安ければ. The other choices are not valid conjugations.",
  },
  {
    id: "n4.ba-tara.ex6",
    grammarPointId: "n4.ba-tara",
    source: "bank",
    kind: "mcq",
    question: "駅[えき]に着[つ]いたら、＿＿ください。",
    choices: ["電話[でんわ]して", "電話[でんわ]すれば", "電話[でんわ]したら", "電話[でんわ]しよう"],
    correctIndex: 0,
    explanation: "〜てください always attaches to the て-form, regardless of the conditional used in the first clause: 電話してください.",
  },
  {
    id: "n4.ba-tara.ex7",
    grammarPointId: "n4.ba-tara",
    source: "bank",
    kind: "ordering",
    segments: ["明日[あした]", "天気[てんき]が", "よければ", "公園[こうえん]に行[い]きましょう。"],
    starIndex: 2,
    translationEn: "If it's fine tomorrow, let's go to the park.",
  },

  // -------------------------------------------------------------------
  // n4.nakereba-naranai
  // -------------------------------------------------------------------
  {
    id: "n4.nakereba-naranai.ex1",
    grammarPointId: "n4.nakereba-naranai",
    source: "bank",
    kind: "translation",
    promptEn: "I have to study for the test tonight.",
    accepted: ["今晩[こんばん]、テストのために勉強[べんきょう]しなければなりません。", "今晩[こんばん]、テストのために勉強[べんきょう]しなければいけません。"],
  },
  {
    id: "n4.nakereba-naranai.ex2",
    grammarPointId: "n4.nakereba-naranai",
    source: "bank",
    kind: "translation",
    promptEn: "You don't have to bring an umbrella today.",
    accepted: ["今日[きょう]は傘[かさ]を持[も]ってこなくてもいいです。", "今日[きょう]は傘[かさ]を持[も]たなくてもいいです。"],
  },
  {
    id: "n4.nakereba-naranai.ex3",
    grammarPointId: "n4.nakereba-naranai",
    source: "bank",
    kind: "cloze",
    sentence: "会議[かいぎ]の前[まえ]に、資料[しりょう]を＿＿なりません。",
    accepted: ["準備[じゅんび]しなければ"],
    translationEn: "I have to prepare the materials before the meeting.",
  },
  {
    id: "n4.nakereba-naranai.ex4",
    grammarPointId: "n4.nakereba-naranai",
    source: "bank",
    kind: "cloze",
    sentence: "今日[きょう]は休[やす]みですから、会社[かいしゃ]に＿＿いいです。",
    accepted: ["行[い]かなくても"],
    translationEn: "Today is a day off, so you don't have to go to the company.",
  },
  {
    id: "n4.nakereba-naranai.ex5",
    grammarPointId: "n4.nakereba-naranai",
    source: "bank",
    kind: "mcq",
    question: "パスポートを＿＿海外旅行[かいがいりょこう]はできません。",
    choices: ["持[も]っていなければ", "持[も]っていなくても", "持[も]っていても", "持[も]っていたら"],
    correctIndex: 0,
    explanation: "'Without a passport, [one] can't travel abroad' needs the conditional-negative 持っていなければ (if [one] doesn't have).",
  },
  {
    id: "n4.nakereba-naranai.ex6",
    grammarPointId: "n4.nakereba-naranai",
    source: "bank",
    kind: "mcq",
    question: "熱[ねつ]がないなら、薬[くすり]を＿＿。",
    choices: ["飲[の]まなくてもいいです", "飲[の]まなければなりません", "飲[の]んでもいいです", "飲[の]んではいけません"],
    correctIndex: 0,
    explanation: "If there's no fever, taking the medicine is unnecessary rather than required or prohibited, so 飲まなくてもいいです fits best.",
  },
  {
    id: "n4.nakereba-naranai.ex7",
    grammarPointId: "n4.nakereba-naranai",
    source: "bank",
    kind: "ordering",
    segments: ["この本[ほん]を", "明日[あした]までに", "返[かえ]さなければ", "なりません。"],
    starIndex: 2,
    translationEn: "I have to return this book by tomorrow.",
  },

  // -------------------------------------------------------------------
  // n4.temo-ii
  // -------------------------------------------------------------------
  {
    id: "n4.temo-ii.ex1",
    grammarPointId: "n4.temo-ii",
    source: "bank",
    kind: "translation",
    promptEn: "May I use this pen?",
    accepted: ["このペンを使[つか]ってもいいですか。", "このペンを使[つか]ってもいいでしょうか。"],
  },
  {
    id: "n4.temo-ii.ex2",
    grammarPointId: "n4.temo-ii",
    source: "bank",
    kind: "translation",
    promptEn: "You must not park a car here.",
    accepted: ["ここに車[くるま]を止[と]めてはいけません。", "ここに車[くるま]を駐車[ちゅうしゃ]してはいけません。"],
  },
  {
    id: "n4.temo-ii.ex3",
    grammarPointId: "n4.temo-ii",
    source: "bank",
    kind: "cloze",
    sentence: "窓[まど]を＿＿もいいですか。",
    accepted: ["開[あ]けて"],
    translationEn: "Is it okay to open the window?",
  },
  {
    id: "n4.temo-ii.ex4",
    grammarPointId: "n4.temo-ii",
    source: "bank",
    kind: "cloze",
    sentence: "この部屋[へや]に入[はい]って＿＿。",
    accepted: ["はいけません", "はいけない"],
    translationEn: "You must not enter this room.",
  },
  {
    id: "n4.temo-ii.ex5",
    grammarPointId: "n4.temo-ii",
    source: "bank",
    kind: "mcq",
    question: "すみません、ここでたばこを＿＿。",
    choices: ["吸[す]ってもいいですか", "吸[す]わなければなりませんか", "吸[す]わなくてもいいですか", "吸[す]ってはいけませんか"],
    correctIndex: 0,
    explanation: "吸ってもいいですか politely asks for permission ('may I smoke?'); the other choices ask about obligation instead.",
  },
  {
    id: "n4.temo-ii.ex6",
    grammarPointId: "n4.temo-ii",
    source: "bank",
    kind: "mcq",
    question: "テストの間[あいだ]、辞書[じしょ]を＿＿。",
    choices: ["使[つか]ってはいけません", "使[つか]ってもいいです", "使[つか]わなくてもいいです", "使[つか]いません"],
    correctIndex: 0,
    explanation: "Test rules forbidding dictionary use call for the prohibition 使ってはいけません (must not use).",
  },
  {
    id: "n4.temo-ii.ex7",
    grammarPointId: "n4.temo-ii",
    source: "bank",
    kind: "ordering",
    segments: ["絶対[ぜったい]に", "この川[かわ]で", "泳[およ]いでは", "いけません。"],
    starIndex: 2,
    translationEn: "You must never swim in this river.",
  },

  // -------------------------------------------------------------------
  // n4.age-kure-morau
  // -------------------------------------------------------------------
  {
    id: "n4.age-kure-morau.ex1",
    grammarPointId: "n4.age-kure-morau",
    source: "bank",
    kind: "translation",
    promptEn: "My mother gave me a sweater.",
    accepted: ["母[はは]は私[わたし]にセーターをくれました。", "母[はは]が私[わたし]にセーターをくれました。"],
  },
  {
    id: "n4.age-kure-morau.ex2",
    grammarPointId: "n4.age-kure-morau",
    source: "bank",
    kind: "translation",
    promptEn: "I had my friend carry the luggage.",
    accepted: ["友達[ともだち]に荷物[にもつ]を持[も]ってもらいました。", "友達[ともだち]に荷物[にもつ]を運[はこ]んでもらいました。"],
  },
  {
    id: "n4.age-kure-morau.ex3",
    grammarPointId: "n4.age-kure-morau",
    source: "bank",
    kind: "cloze",
    sentence: "誕生日[たんじょうび]に、彼[かれ]は私[わたし]に花[はな]を＿＿。",
    accepted: ["くれました"],
    translationEn: "For my birthday, he gave me flowers.",
  },
  {
    id: "n4.age-kure-morau.ex4",
    grammarPointId: "n4.age-kure-morau",
    source: "bank",
    kind: "cloze",
    sentence: "分[わ]からなかったので、友達[ともだち]に＿＿もらいました。",
    accepted: ["教[おし]えて"],
    translationEn: "I didn't understand, so I had my friend explain it to me.",
  },
  {
    id: "n4.age-kure-morau.ex5",
    grammarPointId: "n4.age-kure-morau",
    source: "bank",
    kind: "mcq",
    question: "私[わたし]は隣[となり]の人[ひと]に道[みち]を＿＿。",
    choices: ["教[おし]えてもらいました", "教[おし]えてあげました", "教[おし]えてくれました", "教[おし]えました"],
    correctIndex: 0,
    explanation: "私は…もらいました frames the speaker as the receiver of the favor; あげました would wrongly make the speaker the giver.",
  },
  {
    id: "n4.age-kure-morau.ex6",
    grammarPointId: "n4.age-kure-morau",
    source: "bank",
    kind: "mcq",
    question: "田中[たなか]さんは私[わたし]に本[ほん]を＿＿。",
    choices: ["くれました", "あげました", "もらいました", "さしあげました"],
    correctIndex: 0,
    explanation: "くれました fits because the giver (田中さん) is not the speaker and the receiver is 私 — direction is inward toward the speaker. あげました/さしあげました point away from the speaker, and もらいました would need 田中さんに.",
  },
  {
    id: "n4.age-kure-morau.ex7",
    grammarPointId: "n4.age-kure-morau",
    source: "bank",
    kind: "ordering",
    segments: ["姉[あね]に", "宿題[しゅくだい]を", "チェックして", "もらいました。"],
    starIndex: 2,
    translationEn: "I had my older sister check my homework.",
  },

  // -------------------------------------------------------------------
  // n4.sou-da
  // -------------------------------------------------------------------
  {
    id: "n4.sou-da.ex1",
    grammarPointId: "n4.sou-da",
    source: "bank",
    kind: "translation",
    promptEn: "This cake looks delicious.",
    accepted: ["このケーキはおいしそうです。", "このケーキはおいしそうですね。"],
  },
  {
    id: "n4.sou-da.ex2",
    grammarPointId: "n4.sou-da",
    source: "bank",
    kind: "translation",
    promptEn: "That box looks heavy.",
    accepted: ["あの箱[はこ]は重[おも]そうです。", "その箱[はこ]は重[おも]そうです。"],
  },
  {
    id: "n4.sou-da.ex3",
    grammarPointId: "n4.sou-da",
    source: "bank",
    kind: "cloze",
    sentence: "字[じ]が小[ちい]さくて、この本[ほん]は＿＿そうです。",
    accepted: ["難[むずか]し"],
    translationEn: "The letters are small, so this book looks difficult.",
  },
  {
    id: "n4.sou-da.ex4",
    grammarPointId: "n4.sou-da",
    source: "bank",
    kind: "cloze",
    sentence: "棚[たな]の上[うえ]の花瓶[かびん]が今[いま]にも＿＿そうです。",
    accepted: ["落[お]ち"],
    translationEn: "The vase on the shelf looks like it's about to fall at any moment.",
  },
  {
    id: "n4.sou-da.ex5",
    grammarPointId: "n4.sou-da",
    source: "bank",
    kind: "mcq",
    question: "田中[たなか]さんは＿＿そうな顔[かお]をしています。",
    choices: ["嬉[うれ]し", "嬉[うれ]しい", "嬉[うれ]しく", "嬉[うれ]しくて"],
    correctIndex: 0,
    explanation: "Appearance-そう attaches to the い-adjective stem after dropping い: 嬉しい→嬉しそう, so 嬉し is correct before そう.",
  },
  {
    id: "n4.sou-da.ex6",
    grammarPointId: "n4.sou-da",
    source: "bank",
    kind: "mcq",
    question: "この天気[てんき]だと、明日[あした]は雪[ゆき]が＿＿ですね。",
    choices: ["降[ふ]りそう", "降[ふ]るそう", "降[ふ]りそうな", "降[ふ]ってそう"],
    correctIndex: 0,
    explanation: "Verb appearance-そう attaches to the ます-stem: 降る→降り+そう=降りそう, predicting snow from visible signs.",
  },
  {
    id: "n4.sou-da.ex7",
    grammarPointId: "n4.sou-da",
    source: "bank",
    kind: "ordering",
    segments: ["この", "かばんは", "便利[べんり]", "そうです。"],
    starIndex: 2,
    translationEn: "This bag looks convenient.",
  },

  // -------------------------------------------------------------------
  // n4.you-ni-naru
  // -------------------------------------------------------------------
  {
    id: "n4.you-ni-naru.ex1",
    grammarPointId: "n4.you-ni-naru",
    source: "bank",
    kind: "translation",
    promptEn: "I've become able to speak Japanese a little.",
    accepted: ["日本語[にほんご]が少[すこ]し話[はな]せるようになりました。", "少[すこ]し日本語[にほんご]が話[はな]せるようになりました。"],
  },
  {
    id: "n4.you-ni-naru.ex2",
    grammarPointId: "n4.you-ni-naru",
    source: "bank",
    kind: "translation",
    promptEn: "I no longer drink coffee.",
    accepted: ["コーヒーを飲[の]まなくなりました。", "もうコーヒーを飲[の]みません。"],
  },
  {
    id: "n4.you-ni-naru.ex3",
    grammarPointId: "n4.you-ni-naru",
    source: "bank",
    kind: "cloze",
    sentence: "練習[れんしゅう]して、ピアノが＿＿ようになりました。",
    accepted: ["弾[ひ]ける"],
    translationEn: "I practiced, and I've become able to play the piano.",
  },
  {
    id: "n4.you-ni-naru.ex4",
    grammarPointId: "n4.you-ni-naru",
    source: "bank",
    kind: "cloze",
    sentence: "引[ひ]っ越[こ]してから、あまり友達[ともだち]に＿＿なくなりました。",
    accepted: ["会[あ]え"],
    translationEn: "Since I moved, I no longer meet my friends much.",
  },
  {
    id: "n4.you-ni-naru.ex5",
    grammarPointId: "n4.you-ni-naru",
    source: "bank",
    kind: "mcq",
    question: "毎日[まいにち]練習[れんしゅう]して、速[はや]く＿＿ようになりました。",
    choices: ["泳[およ]げる", "泳[およ]ぐ", "泳[およ]いで", "泳[およ]いだ"],
    correctIndex: 0,
    explanation: "〜ようになる for a new ability attaches to the potential form: 泳げる (can swim) → 泳げるようになる.",
  },
  {
    id: "n4.you-ni-naru.ex6",
    grammarPointId: "n4.you-ni-naru",
    source: "bank",
    kind: "mcq",
    question: "体[からだ]のために、毎朝[まいあさ]走[はし]る＿＿しています。",
    choices: ["ように", "ようになる", "ようだ", "そうに"],
    correctIndex: 0,
    explanation: "A deliberate ongoing effort/habit uses 〜ようにしています, not 〜ようになる (a completed change), so ように is correct here.",
  },
  {
    id: "n4.you-ni-naru.ex7",
    grammarPointId: "n4.you-ni-naru",
    source: "bank",
    kind: "ordering",
    segments: ["箸[はし]が", "上手[じょうず]に", "使[つか]える", "ようになりました。"],
    starIndex: 2,
    translationEn: "I've come to be able to use chopsticks well.",
  },
];

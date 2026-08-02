// Vocabulary questions (文字・語彙), batch 1.
//
// 48 items split roughly evenly across the four `style` values (12 each):
//   reading      漢字読み — given a kanji word (authored WITH furigana brackets
//                per CONTENT_GUIDE.md so the validator can check it), pick its
//                reading. The renderer forces furigana mode "hidden" for this
//                style so the bracketed reading doesn't print above the word.
//   orthography  表記 — a short sentence gives meaning context for a word
//                written in kana; pick the correct kanji spelling among
//                homophones / visually-similar kanji.
//   context      文脈規定 — a sentence with exactly one ＿＿ gap; pick the
//                word that fits.
//   paraphrase   言い換え類義 — pick the closest synonym/near-synonym.
//
// `correctIndex` is deliberately cycled across 0/1/2/3 within each style so
// no position is favored (see "Never let correctIndex settle on 0" in
// CONTENT_GUIDE.md). `vocabIds` is omitted throughout — safer than guessing
// per the task brief, since an unresolved id fails content.test.ts.

import type { VocabQuestion } from "../types";

export const vocabQuestionsBatch1: VocabQuestion[] = [
  // ---------------------------------------------------------------------
  // style: "reading" (漢字読み) — 12 items
  // ---------------------------------------------------------------------
  {
    id: "vq.read-atarashii",
    style: "reading",
    level: "N5",
    question: "新[あたら]しい",
    choices: ["あらたしい", "あたらしい", "しんしい", "あたらしく"],
    correctIndex: 1,
    explanation:
      "あたらしい is the correct kun'yomi reading. あらたしい reverses two morae, しんしい wrongly applies the on'yomi しん (as in 新聞), and あたらしく is the adverbial form, not the dictionary form.",
  },
  {
    id: "vq.read-isogashii",
    style: "reading",
    level: "N4",
    question: "忙[いそが]しい",
    choices: ["いそかしい", "ぼうしい", "いそがしい", "いそがしく"],
    correctIndex: 2,
    explanation:
      "いそがしい is correct. いそかしい unvoices が to か, ぼうしい wrongly applies the on'yomi ぼう (as in 多忙), and いそがしく is the adverbial form, not the dictionary form.",
  },
  {
    id: "vq.read-toshokan",
    style: "reading",
    level: "N5",
    question: "図書館[としょかん]",
    choices: ["とうしょかん", "どしょかん", "としょうかん", "としょかん"],
    correctIndex: 3,
    explanation:
      "としょかん is correct. とうしょかん and としょうかん each insert an extra long vowel, and どしょかん wrongly voices と to ど.",
  },
  {
    id: "vq.read-tenki",
    style: "reading",
    level: "N5",
    question: "天気[てんき]",
    choices: ["てんき", "でんき", "てんぎ", "てんきい"],
    correctIndex: 0,
    explanation:
      "てんき is correct. でんき is a different real word (電気, electricity), てんぎ wrongly voices き to ぎ, and てんきい adds an extra vowel.",
  },
  {
    id: "vq.read-byouki",
    style: "reading",
    level: "N4",
    question: "病気[びょうき]",
    choices: ["びょうぎ", "びょうき", "ひょうき", "びよき"],
    correctIndex: 1,
    explanation:
      "びょうき is correct. びょうぎ wrongly voices き to ぎ, ひょうき drops the voicing on び, and びよき omits a mora.",
  },
  {
    id: "vq.read-jouzu",
    style: "reading",
    level: "N5",
    question: "上手[じょうず]",
    choices: ["うわて", "じょうしゅ", "じょうず", "じょうて"],
    correctIndex: 2,
    explanation:
      "じょうず ('skillful') is correct here. うわて is a real alternate reading of 上手 meaning 'the upper hand,' じょうしゅ misapplies an on'yomi-style reading, and じょうて is not a real reading of this word.",
  },
  {
    id: "vq.read-kaishain",
    style: "reading",
    level: "N4",
    question: "会社員[かいしゃいん]",
    choices: ["がいしゃいん", "かいしゃにん", "かいしゃいいん", "かいしゃいん"],
    correctIndex: 3,
    explanation:
      "かいしゃいん is correct. がいしゃいん wrongly voices か to が, かいしゃにん substitutes the wrong final word, and かいしゃいいん adds a spurious extra mora.",
  },
  {
    id: "vq.read-tokubetsu",
    style: "reading",
    level: "N4",
    question: "特別[とくべつ]",
    choices: ["とくべつ", "どくべつ", "とくべち", "とっべつ"],
    correctIndex: 0,
    explanation:
      "とくべつ is correct. どくべつ wrongly voices と to ど, とくべち alters the final consonant, and とっべつ inserts a spurious っ.",
  },
  {
    id: "vq.read-ichinichi",
    style: "reading",
    level: "N5",
    question: "一日[いちにち]",
    choices: ["ついたち", "いちにち", "いちじつ", "いっぷ"],
    correctIndex: 1,
    explanation:
      "Read as いちにち ('one day') here. ついたち is the real alternate reading of 一日 used for 'the first day of the month' — a classic multi-reading trap — いちじつ misapplies an on'yomi-style reading, and いっぷ is not a valid reading.",
  },
  {
    id: "vq.read-hanabi",
    style: "reading",
    level: "N4",
    question: "花火[はなび]",
    choices: ["ばなび", "はなひ", "はなび", "かひ"],
    correctIndex: 2,
    explanation:
      "はなび is correct. ばなび wrongly voices は to ば, はなひ drops the voicing on び, and かひ misapplies on'yomi readings to both kanji.",
  },
  {
    id: "vq.read-daijoubu",
    style: "reading",
    level: "N5",
    question: "大丈夫[だいじょうぶ]",
    choices: ["だいじょうふ", "だいじょぶ", "たいじょうぶ", "だいじょうぶ"],
    correctIndex: 3,
    explanation:
      "だいじょうぶ is correct. だいじょうふ drops the voicing on ぶ, だいじょぶ omits the う, and たいじょうぶ wrongly unvoices だ to た.",
  },
  {
    id: "vq.read-yuumei",
    style: "reading",
    level: "N4",
    question: "有名[ゆうめい]",
    choices: ["ゆうめい", "ゆめい", "ゆうめえ", "ゆうみょう"],
    correctIndex: 0,
    explanation:
      "ゆうめい is correct. ゆめい drops the う, ゆうめえ substitutes a long え for めい, and ゆうみょう wrongly reads 名 with the みょう reading (as in 名字[みょうじ]) instead of めい.",
  },

  // ---------------------------------------------------------------------
  // style: "orthography" (表記) — 12 items
  // ---------------------------------------------------------------------
  {
    id: "vq.ortho-hayai-train",
    style: "orthography",
    level: "N4",
    question: "この電車[でんしゃ]はとてもはやいです。",
    choices: ["早[はや]い", "速[はや]い", "遅[おそ]い", "暗[くら]い"],
    correctIndex: 1,
    explanation:
      "速い(はやい) describes speed, matching a fast train. 早い is the same reading but means 'early' (time), 遅い(おそい) is the antonym 'slow', and 暗い(くらい) means 'dark'.",
  },
  {
    id: "vq.ortho-atsui-coffee",
    style: "orthography",
    level: "N4",
    question: "このコーヒーはあついですから、気[き]をつけてください。",
    choices: ["暑[あつ]い", "厚[あつ]い", "熱[あつ]い", "寒[さむ]い"],
    correctIndex: 2,
    explanation:
      "熱い(あつい) describes something hot to the touch, like coffee. 暑い is the same reading but for hot weather, 厚い is the same reading but means 'thick', and 寒い(さむい) means 'cold' with a different reading entirely.",
  },
  {
    id: "vq.ortho-kiku-kusuri",
    style: "orthography",
    level: "N4",
    question: "この薬[くすり]はよくききます。",
    choices: ["聞[き]く", "利[き]く", "弾[ひ]く", "効[き]く"],
    correctIndex: 3,
    explanation:
      "効く(きく) means 'to be effective,' matching medicine that works. 聞く is the same reading but means 'to hear/ask', 利く is the same reading but is used for senses/faculties working (鼻が利く), and 弾く is read ひく, an unrelated word.",
  },
  {
    id: "vq.ortho-toru-shashin",
    style: "orthography",
    level: "N4",
    question: "友達[ともだち]としゃしんをとりました。",
    choices: ["撮[と]る", "取[と]る", "採[と]る", "送[おく]る"],
    correctIndex: 0,
    explanation:
      "撮る(とる) specifically means 'to take a photo.' 取る is the same reading but means 'to take/pick up' generally, 採る is the same reading but means 'to gather/adopt', and 送る(おくる) means 'to send' with a different reading.",
  },
  {
    id: "vq.ortho-naosu-byouki",
    style: "orthography",
    level: "N4",
    question: "医者[いしゃ]に病気[びょうき]をなおしてもらいました。",
    choices: ["直[なお]す", "治[なお]す", "忘[わす]れる", "教[おし]える"],
    correctIndex: 1,
    explanation:
      "治す(なおす) means 'to cure/heal,' used for illness. 直す is the same reading but means 'to fix/repair,' a very common learner mix-up — 忘れる and 教える have different readings and are unrelated in meaning.",
  },
  {
    id: "vq.ortho-ookii-zou",
    style: "orthography",
    level: "N5",
    question: "象[ぞう]はとてもおおきい動物[どうぶつ]です。",
    choices: ["太[ふと]い", "多[おお]い", "大[おお]きい", "高[たか]い"],
    correctIndex: 2,
    explanation:
      "大きい(おおきい) means physically big, matching an elephant's size. 太い(ふとい) means 'thick/fat' — visually similar kanji but a different reading — 多い(おおい) shares the おお- root but means 'many' (countable), and 高い(たかい) means 'tall/expensive'.",
  },
  {
    id: "vq.ortho-kau-kaban",
    style: "orthography",
    level: "N5",
    question: "デパートでかばんをかいました。",
    choices: ["飼[か]う", "売[う]る", "待[ま]つ", "買[か]う"],
    correctIndex: 3,
    explanation:
      "買う(かう) means 'to buy,' matching purchasing a bag. 飼う is the same reading but means 'to keep/raise a pet,' a classic homophone trap — 売る(うる) means 'to sell' (visually similar kanji, opposite meaning), and 待つ(まつ) means 'to wait'.",
  },
  {
    id: "vq.ortho-kiru-coat",
    style: "orthography",
    level: "N5",
    question: "寒[さむ]いので、コートをきてください。",
    choices: ["着[き]る", "切[き]る", "起[お]きる", "帰[かえ]る"],
    correctIndex: 0,
    explanation:
      "着る(きる) means 'to wear,' matching putting on a coat. 切る is the same reading but means 'to cut,' a classic homophone trap — 起きる(おきる) ends in a similar きる sound but means 'to get up,' and 帰る(かえる) means 'to go home'.",
  },
  {
    id: "vq.ortho-hanasu-nihongo",
    style: "orthography",
    level: "N4",
    question: "先生[せんせい]と日本語[にほんご]ではなしました。",
    choices: ["離[はな]す", "話[はな]す", "放[はな]す", "直[なお]す"],
    correctIndex: 1,
    explanation:
      "話す(はなす) means 'to speak/talk,' matching a conversation. 離す is the same reading but means 'to separate/let go of,' 放す is also the same reading but means 'to release/set free,' and 直す(なおす) means 'to fix' with a different reading.",
  },
  {
    id: "vq.ortho-aku-doa",
    style: "orthography",
    level: "N5",
    question: "ドアがひとりでにあきました。",
    choices: ["空[あ]く", "閉[し]まる", "開[あ]く", "消[き]える"],
    correctIndex: 2,
    explanation:
      "開く(あく) means 'to open' (intransitive), matching a door opening by itself. 空く is the same reading but means 'to become vacant/empty' (e.g. a seat), 閉まる(しまる) is the antonym with a different reading, and 消える(きえる) means 'to disappear/go out'.",
  },
  {
    id: "vq.ortho-tomaru-ryokan",
    style: "orthography",
    level: "N4",
    question: "私[わたし]たちはりょかんにとまりました。",
    choices: ["止[と]まる", "止[と]める", "集[あつ]まる", "泊[と]まる"],
    correctIndex: 3,
    explanation:
      "泊まる(とまる) means 'to stay overnight' at an inn. 止まる is the same reading but means 'to stop moving,' a classic homophone confusion — 止める(とめる) means 'to stop something' (different reading), and 集まる(あつまる) means 'to gather' (different reading).",
  },
  {
    id: "vq.ortho-tsuku-eki",
    style: "orthography",
    level: "N5",
    question: "電車[でんしゃ]は九時[くじ]に駅[えき]につきました。",
    choices: ["着[つ]く", "付[つ]く", "突[つ]く", "着[き]る"],
    correctIndex: 0,
    explanation:
      "着く(つく) means 'to arrive,' matching the train reaching the station. 付く is the same reading but means 'to be attached/stick to,' 突く is also the same reading but means 'to poke/thrust,' and 着る is the SAME kanji 着 but read きる, meaning 'to wear' — one kanji, two readings.",
  },

  // ---------------------------------------------------------------------
  // style: "context" (文脈規定) — 12 items
  // ---------------------------------------------------------------------
  {
    id: "vq.context-ame-kasa",
    style: "context",
    level: "N5",
    question: "＿＿がふっていますから、傘[かさ]を持[も]って行[い]ってください。",
    choices: ["天気[てんき]", "雨[あめ]", "音楽[おんがく]", "病気[びょうき]"],
    correctIndex: 1,
    explanation: "雨が降る is the set collocation for rain falling; 天気 doesn't take 降る the same way, and 音楽/病気 make no sense with an umbrella.",
  },
  {
    id: "vq.context-jitensha-benri",
    style: "context",
    level: "N5",
    question: "この＿＿は新[あたら]しくて、便利[べんり]です。",
    choices: ["音楽[おんがく]", "犬[いぬ]", "自転車[じてんしゃ]", "天気[てんき]"],
    correctIndex: 2,
    explanation: "Bicycles are commonly described as new and convenient; music, dogs, and weather aren't described with 便利.",
  },
  {
    id: "vq.context-shinbun-yomu",
    style: "context",
    level: "N5",
    question: "毎朝[まいあさ]、新聞[しんぶん]を＿＿。",
    choices: ["書[か]く", "話[はな]す", "待[ま]つ", "読[よ]む"],
    correctIndex: 3,
    explanation: "新聞を読む is the natural collocation for reading a newspaper; writing, speaking, and waiting don't fit a daily newspaper habit.",
  },
  {
    id: "vq.context-isogashii-shigoto",
    style: "context",
    level: "N4",
    question: "毎日[まいにち]仕事[しごと]がおおくて、＿＿です。",
    choices: ["忙[いそが]しい", "暇[ひま]", "便利[べんり]", "静[しず]か"],
    correctIndex: 0,
    explanation: "A heavy daily workload naturally makes someone 忙しい (busy); 暇 is its opposite, and 便利/静か don't describe a person's state from workload.",
  },
  {
    id: "vq.context-tegami-tanjoubi",
    style: "context",
    level: "N4",
    question: "友達[ともだち]の誕生日[たんじょうび]に、＿＿を送[おく]りました。",
    choices: ["音楽[おんがく]", "手紙[てがみ]", "天気[てんき]", "会社[かいしゃ]"],
    correctIndex: 1,
    explanation: "手紙を送る (to send a letter) is a natural collocation for a birthday gift by mail; music, weather, and a company aren't things you 送る in this sense.",
  },
  {
    id: "vq.context-toshokan-shizuka",
    style: "context",
    level: "N4",
    question: "図書館[としょかん]は＿＿ですから、みんな静[しず]かにしています。",
    choices: ["賑[にぎ]やか", "便利[べんり]", "静[しず]か", "有名[ゆうめい]"],
    correctIndex: 2,
    explanation: "The library being 静か (quiet) explains why everyone keeps quiet; 賑やか contradicts the result, and 便利/有名 don't causally explain quietness.",
  },
  {
    id: "vq.context-samui-coat",
    style: "context",
    level: "N5",
    question: "きょうは＿＿ですから、コートを着[き]ます。",
    choices: ["暑[あつ]い", "忙[いそが]しい", "簡単[かんたん]", "寒[さむ]い"],
    correctIndex: 3,
    explanation: "Wearing a coat is explained by cold weather (寒い); hot weather is the opposite, and busy/simple don't relate to needing a coat.",
  },
  {
    id: "vq.context-muzukashii-kanji",
    style: "context",
    level: "N4",
    question: "この漢字[かんじ]は＿＿ですから、辞書[じしょ]で調[しら]べました。",
    choices: ["難[むずか]しい", "簡単[かんたん]", "面白[おもしろ]い", "有名[ゆうめい]"],
    correctIndex: 0,
    explanation: "Looking something up in a dictionary is explained by it being 難しい (difficult); 簡単 contradicts that need, and 面白い/有名 don't necessitate looking it up.",
  },
  {
    id: "vq.context-hashiru-kouen",
    style: "context",
    level: "N5",
    question: "毎朝[まいあさ]、公園[こうえん]で＿＿。",
    choices: ["泳[およ]ぎます", "走[はし]ります", "料理[りょうり]します", "洗[あら]います"],
    correctIndex: 1,
    explanation: "走る (running) is the typical morning activity in a park; parks don't have pools or kitchens, so swim/cook don't fit, and washing is unrelated.",
  },
  {
    id: "vq.context-atsui-coat",
    style: "context",
    level: "N4",
    question: "今日[きょう]は＿＿ですから、コートはいりません。",
    choices: ["寒[さむ]い", "忙[いそが]しい", "暑[あつ]い", "面白[おもしろ]い"],
    correctIndex: 2,
    explanation: "Not needing a coat is explained by hot weather (暑い); cold would require a coat (a contradiction), and busy/interesting are unrelated to temperature.",
  },
  {
    id: "vq.context-kusuri-byouin",
    style: "context",
    level: "N5",
    question: "びょういんで＿＿をもらいました。",
    choices: ["果物[くだもの]", "新聞[しんぶん]", "手紙[てがみ]", "薬[くすり]"],
    correctIndex: 3,
    explanation: "薬をもらう (to receive medicine) is the standard reason to visit a hospital; fruit, newspapers, and letters aren't dispensed there.",
  },
  {
    id: "vq.context-shinsetsu-sensei",
    style: "context",
    level: "N4",
    question: "先生[せんせい]はいつも＿＿ですから、みんな彼[かれ]が好[す]きです。",
    choices: ["親切[しんせつ]", "忙[いそが]しい", "大変[たいへん]", "心配[しんぱい]"],
    correctIndex: 0,
    explanation: "Being kind (親切) directly explains why everyone likes the teacher; busy/tough/worried don't causally connect to being liked.",
  },

  // ---------------------------------------------------------------------
  // style: "paraphrase" (言い換え類義) — 12 items
  // ---------------------------------------------------------------------
  {
    id: "vq.para-kantan",
    style: "paraphrase",
    level: "N5",
    question: "簡単[かんたん]",
    choices: ["やさしい", "難[むずか]しい", "便利[べんり]", "大変[たいへん]"],
    correctIndex: 0,
    explanation: "やさしい (easy) is the closest match to 簡単; 難しい is the opposite, and 便利/大変 describe different qualities, not simplicity.",
  },
  {
    id: "vq.para-taihen",
    style: "paraphrase",
    level: "N4",
    question: "大変[たいへん]",
    choices: ["簡単[かんたん]", "難[むずか]しい", "元気[げんき]", "暇[ひま]"],
    correctIndex: 1,
    explanation: "難しい (difficult) is closest to how 大変 describes a hard task; 簡単 is the opposite, and 元気/暇 are unrelated qualities.",
  },
  {
    id: "vq.para-omoshiroi",
    style: "paraphrase",
    level: "N5",
    question: "面白[おもしろ]い",
    choices: ["悲[かな]しい", "難[むずか]しい", "楽[たの]しい", "静[しず]か"],
    correctIndex: 2,
    explanation: "楽しい (fun/enjoyable) is closest in feeling to 面白い; 悲しい (sad) and 難しい/静か describe entirely different qualities.",
  },
  {
    id: "vq.para-isogashii",
    style: "paraphrase",
    level: "N4",
    question: "忙[いそが]しい",
    choices: ["暇[ひま]", "元気[げんき]", "静[しず]か", "時間[じかん]がない"],
    correctIndex: 3,
    explanation: "時間がない (to have no time) captures the same idea as being busy; 暇 is the direct opposite, and 元気/静か don't relate to busyness.",
  },
  {
    id: "vq.para-jouzu",
    style: "paraphrase",
    level: "N5",
    question: "上手[じょうず]",
    choices: ["得意[とくい]", "下手[へた]", "簡単[かんたん]", "親切[しんせつ]"],
    correctIndex: 0,
    explanation: "得意 (good at, skilled) is closest to 上手; 下手 is the opposite, and 簡単/親切 describe unrelated qualities.",
  },
  {
    id: "vq.para-shinsetsu",
    style: "paraphrase",
    level: "N4",
    question: "親切[しんせつ]",
    choices: ["元気[げんき]", "優[やさ]しい", "有名[ゆうめい]", "大丈夫[だいじょうぶ]"],
    correctIndex: 1,
    explanation: "優しい (kind, gentle) is closest to 親切; note this is the kanji 優, not the kana-only やさしい meaning 'easy' — 元気/有名/大丈夫 are unrelated qualities.",
  },
  {
    id: "vq.para-daijoubu",
    style: "paraphrase",
    level: "N5",
    question: "大丈夫[だいじょうぶ]",
    choices: ["心配[しんぱい]", "大変[たいへん]", "問題[もんだい]ない", "特別[とくべつ]"],
    correctIndex: 2,
    explanation: "問題ない (no problem) is closest to 大丈夫 in reassuring contexts; 心配 is the worry that 大丈夫 addresses, not a synonym, and 大変/特別 are unrelated.",
  },
  {
    id: "vq.para-tokubetsu",
    style: "paraphrase",
    level: "N4",
    question: "特別[とくべつ]",
    choices: ["有名[ゆうめい]", "簡単[かんたん]", "大切[たいせつ]", "珍[めずら]しい"],
    correctIndex: 3,
    explanation: "珍しい (rare/unusual) is closest to 特別; 有名 (famous) and 大切 (important) are related but distinct concepts, and 簡単 is unrelated.",
  },
  {
    id: "vq.para-taisetsu",
    style: "paraphrase",
    level: "N5",
    question: "大切[たいせつ]",
    choices: ["重要[じゅうよう]", "便利[べんり]", "有名[ゆうめい]", "心配[しんぱい]"],
    correctIndex: 0,
    explanation: "重要 (important) is the closest synonym to 大切; 便利/有名/心配 describe different qualities.",
  },
  {
    id: "vq.para-shinpai",
    style: "paraphrase",
    level: "N4",
    question: "心配[しんぱい]",
    choices: ["元気[げんき]", "不安[ふあん]", "大丈夫[だいじょうぶ]", "楽[たの]しい"],
    correctIndex: 1,
    explanation: "不安 (anxious/uneasy) is closest to 心配; 元気/大丈夫 describe the opposite state (calm/fine), and 楽しい is unrelated.",
  },
  {
    id: "vq.para-benri",
    style: "paraphrase",
    level: "N5",
    question: "便利[べんり]",
    choices: ["不便[ふべん]", "簡単[かんたん]", "役[やく]に立[た]つ", "大切[たいせつ]"],
    correctIndex: 2,
    explanation: "役に立つ (useful, helpful) is closest to 便利; 不便 is the direct opposite, and 簡単/大切 describe unrelated qualities.",
  },
  {
    id: "vq.para-nigiyaka",
    style: "paraphrase",
    level: "N4",
    question: "賑[にぎ]やか",
    choices: ["静[しず]か", "有名[ゆうめい]", "便利[べんり]", "人[ひと]が多[おお]い"],
    correctIndex: 3,
    explanation: "人が多い (crowded, many people) captures why a place feels 賑やか; 静か is the opposite, and 有名/便利 don't describe liveliness.",
  },
];

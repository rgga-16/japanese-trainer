// Common N5/N4 vocabulary bank. `ja` is dictionary/citation form in furigana
// notation (see src/engine/furigana.ts). Okurigana that conjugates is kept
// OUTSIDE brackets so src/engine/conjugator.ts can slice it safely:
//   - verbs: godan/ichidan/kuru end in a plain (unbracketed) kana; suru
//     compounds end in plain "する".
//   - na-adjectives are stored WITHOUT the attributive な (stem only), since
//     the conjugator appends だ/じゃない/な etc. directly onto `ja`.

import type { VocabEntry } from "./types";

export const allVocab: VocabEntry[] = [
  // ---------------------------------------------------------------------
  // Verbs — ichidan
  // ---------------------------------------------------------------------
  { id: "v.taberu", ja: "食[た]べる", en: "to eat", pos: "verb", verbClass: "ichidan", tags: ["food", "activity", "transitive"] },
  { id: "v.miru", ja: "見[み]る", en: "to see, to watch", pos: "verb", verbClass: "ichidan", tags: ["activity", "transitive"] },
  { id: "v.okiru", ja: "起[お]きる", en: "to get up, to wake up", pos: "verb", verbClass: "ichidan", tags: ["daily-life", "intransitive"] },
  { id: "v.neru", ja: "寝[ね]る", en: "to sleep, to go to bed", pos: "verb", verbClass: "ichidan", tags: ["daily-life", "intransitive"] },
  { id: "v.deru", ja: "出[で]る", en: "to leave, to exit", pos: "verb", verbClass: "ichidan", tags: ["activity", "intransitive"] },
  { id: "v.akeru", ja: "開[あ]ける", en: "to open (something)", pos: "verb", verbClass: "ichidan", tags: ["object", "transitive"] },
  { id: "v.shimeru", ja: "閉[し]める", en: "to close (something)", pos: "verb", verbClass: "ichidan", tags: ["object", "transitive"] },
  { id: "v.oshieru", ja: "教[おし]える", en: "to teach, to tell (info)", pos: "verb", verbClass: "ichidan", tags: ["school", "communication", "transitive"] },
  { id: "v.oboeru", ja: "覚[おぼ]える", en: "to memorize, to remember", pos: "verb", verbClass: "ichidan", tags: ["school", "transitive"] },
  { id: "v.wasureru", ja: "忘[わす]れる", en: "to forget", pos: "verb", verbClass: "ichidan", tags: ["daily-life", "transitive"] },
  { id: "v.kariru", ja: "借[か]りる", en: "to borrow", pos: "verb", verbClass: "ichidan", tags: ["object", "transitive"] },
  { id: "v.kiru2", ja: "着[き]る", en: "to wear, to put on (upper body)", pos: "verb", verbClass: "ichidan", tags: ["clothing", "transitive"] },
  { id: "v.oriru", ja: "降[お]りる", en: "to get off, to go down", pos: "verb", verbClass: "ichidan", tags: ["travel", "intransitive"] },
  { id: "v.tsukareru", ja: "疲[つか]れる", en: "to get tired", pos: "verb", verbClass: "ichidan", tags: ["body", "intransitive"] },
  { id: "v.iru", ja: "いる", en: "to exist, to be (animate)", pos: "verb", verbClass: "ichidan", tags: ["existence", "person", "animal", "intransitive"] },

  // ---------------------------------------------------------------------
  // Verbs — godan
  // ---------------------------------------------------------------------
  { id: "v.iku", ja: "行[い]く", en: "to go", pos: "verb", verbClass: "godan", tags: ["travel", "activity", "intransitive"] },
  { id: "v.hanasu", ja: "話[はな]す", en: "to speak, to talk", pos: "verb", verbClass: "godan", tags: ["communication", "transitive"] },
  { id: "v.kaku", ja: "書[か]く", en: "to write", pos: "verb", verbClass: "godan", tags: ["school", "communication", "transitive"] },
  { id: "v.yomu", ja: "読[よ]む", en: "to read", pos: "verb", verbClass: "godan", tags: ["school", "activity", "transitive"] },
  { id: "v.nomu", ja: "飲[の]む", en: "to drink", pos: "verb", verbClass: "godan", tags: ["food", "activity", "transitive"] },
  { id: "v.kau", ja: "買[か]う", en: "to buy", pos: "verb", verbClass: "godan", tags: ["shopping", "transitive"] },
  { id: "v.matsu", ja: "待[ま]つ", en: "to wait", pos: "verb", verbClass: "godan", tags: ["activity", "transitive"] },
  { id: "v.asobu", ja: "遊[あそ]ぶ", en: "to play, to hang out", pos: "verb", verbClass: "godan", tags: ["activity", "intransitive"] },
  { id: "v.oyogu", ja: "泳[およ]ぐ", en: "to swim", pos: "verb", verbClass: "godan", tags: ["activity", "sport", "intransitive"] },
  { id: "v.hashiru", ja: "走[はし]る", en: "to run", pos: "verb", verbClass: "godan", tags: ["activity", "sport", "intransitive"] },
  { id: "v.kaeru", ja: "帰[かえ]る", en: "to go home, to return", pos: "verb", verbClass: "godan", tags: ["travel", "daily-life", "intransitive"] },
  { id: "v.hairu", ja: "入[はい]る", en: "to enter", pos: "verb", verbClass: "godan", tags: ["place", "intransitive"] },
  { id: "v.tsukuru", ja: "作[つく]る", en: "to make", pos: "verb", verbClass: "godan", tags: ["food", "activity", "transitive"] },
  { id: "v.tsukau", ja: "使[つか]う", en: "to use", pos: "verb", verbClass: "godan", tags: ["object", "transitive"] },
  { id: "v.arau", ja: "洗[あら]う", en: "to wash", pos: "verb", verbClass: "godan", tags: ["daily-life", "transitive"] },
  { id: "v.au", ja: "会[あ]う", en: "to meet (a person)", pos: "verb", verbClass: "godan", tags: ["person", "social", "intransitive"] },
  { id: "v.okuru", ja: "送[おく]る", en: "to send", pos: "verb", verbClass: "godan", tags: ["communication", "transitive"] },
  { id: "v.motsu", ja: "持[も]つ", en: "to hold, to carry", pos: "verb", verbClass: "godan", tags: ["object", "transitive"] },
  { id: "v.shiru", ja: "知[し]る", en: "to get to know, to learn of", pos: "verb", verbClass: "godan", tags: ["cognition", "transitive"] },
  { id: "v.wakaru", ja: "分[わ]かる", en: "to understand", pos: "verb", verbClass: "godan", tags: ["cognition", "intransitive"] },
  { id: "v.aru", ja: "ある", en: "to exist, to be (inanimate)", pos: "verb", verbClass: "godan", tags: ["existence", "object", "intransitive"] },

  // ---------------------------------------------------------------------
  // Verbs — suru compounds
  // ---------------------------------------------------------------------
  { id: "v.benkyousuru", ja: "勉強[べんきょう]する", en: "to study", pos: "verb", verbClass: "suru", tags: ["school", "activity", "transitive"] },
  { id: "v.renshuusuru", ja: "練習[れんしゅう]する", en: "to practice", pos: "verb", verbClass: "suru", tags: ["school", "activity", "transitive"] },
  { id: "v.denwasuru", ja: "電話[でんわ]する", en: "to phone, to call", pos: "verb", verbClass: "suru", tags: ["communication", "activity"] },
  { id: "v.soujisuru", ja: "掃除[そうじ]する", en: "to clean", pos: "verb", verbClass: "suru", tags: ["daily-life", "activity", "transitive"] },
  { id: "v.shinpaisuru", ja: "心配[しんぱい]する", en: "to worry (about)", pos: "verb", verbClass: "suru", tags: ["emotion", "activity"] },

  // ---------------------------------------------------------------------
  // Verbs — kuru
  // ---------------------------------------------------------------------
  { id: "v.kuru", ja: "来[く]る", en: "to come", pos: "verb", verbClass: "kuru", tags: ["travel", "activity", "intransitive"] },

  // ---------------------------------------------------------------------
  // Nouns
  // ---------------------------------------------------------------------
  { id: "n.gakkou", ja: "学校[がっこう]", en: "school", pos: "noun", tags: ["place", "school"] },
  { id: "n.sensei", ja: "先生[せんせい]", en: "teacher", pos: "noun", tags: ["person", "school"] },
  { id: "n.gakusei", ja: "学生[がくせい]", en: "student", pos: "noun", tags: ["person", "school"] },
  { id: "n.kaisha", ja: "会社[かいしゃ]", en: "company", pos: "noun", tags: ["place", "work"] },
  { id: "n.kaishain", ja: "会社員[かいしゃいん]", en: "company employee", pos: "noun", tags: ["person", "work"] },
  { id: "n.byouin", ja: "病院[びょういん]", en: "hospital", pos: "noun", tags: ["place"] },
  { id: "n.toshokan", ja: "図書館[としょかん]", en: "library", pos: "noun", tags: ["place", "school"] },
  { id: "n.eki", ja: "駅[えき]", en: "station", pos: "noun", tags: ["place", "travel"] },
  { id: "n.densha", ja: "電車[でんしゃ]", en: "train", pos: "noun", tags: ["travel", "object"] },
  { id: "n.kuruma", ja: "車[くるま]", en: "car", pos: "noun", tags: ["travel", "object"] },
  { id: "n.jitensha", ja: "自転車[じてんしゃ]", en: "bicycle", pos: "noun", tags: ["travel", "object"] },
  { id: "n.ie", ja: "家[いえ]", en: "house, home", pos: "noun", tags: ["place"] },
  { id: "n.heya", ja: "部屋[へや]", en: "room", pos: "noun", tags: ["place"] },
  { id: "n.mado", ja: "窓[まど]", en: "window", pos: "noun", tags: ["object"] },
  { id: "n.tsukue", ja: "机[つくえ]", en: "desk", pos: "noun", tags: ["object"] },
  { id: "n.isu", ja: "椅子[いす]", en: "chair", pos: "noun", tags: ["object"] },
  { id: "n.hon", ja: "本[ほん]", en: "book", pos: "noun", tags: ["object", "school"] },
  { id: "n.shinbun", ja: "新聞[しんぶん]", en: "newspaper", pos: "noun", tags: ["object"] },
  { id: "n.tegami", ja: "手紙[てがみ]", en: "letter", pos: "noun", tags: ["object", "communication"] },
  { id: "n.shashin", ja: "写真[しゃしん]", en: "photo", pos: "noun", tags: ["object"] },
  { id: "n.eiga", ja: "映画[えいが]", en: "movie", pos: "noun", tags: ["activity"] },
  { id: "n.ongaku", ja: "音楽[おんがく]", en: "music", pos: "noun", tags: ["activity"] },
  { id: "n.tenki", ja: "天気[てんき]", en: "weather", pos: "noun", tags: ["nature", "weather"] },
  { id: "n.ame", ja: "雨[あめ]", en: "rain", pos: "noun", tags: ["nature", "weather"] },
  { id: "n.tomodachi", ja: "友達[ともだち]", en: "friend", pos: "noun", tags: ["person"] },
  { id: "n.kazoku", ja: "家族[かぞく]", en: "family", pos: "noun", tags: ["person"] },
  { id: "n.kodomo", ja: "子供[こども]", en: "child", pos: "noun", tags: ["person"] },
  { id: "n.inu", ja: "犬[いぬ]", en: "dog", pos: "noun", tags: ["animal"] },
  { id: "n.neko", ja: "猫[ねこ]", en: "cat", pos: "noun", tags: ["animal"] },
  { id: "n.sakana", ja: "魚[さかな]", en: "fish", pos: "noun", tags: ["animal", "food"] },
  { id: "n.kudamono", ja: "果物[くだもの]", en: "fruit", pos: "noun", tags: ["food"] },
  { id: "n.yasai", ja: "野菜[やさい]", en: "vegetable", pos: "noun", tags: ["food"] },
  { id: "n.ryouri", ja: "料理[りょうり]", en: "cooking, dish", pos: "noun", tags: ["food", "activity"] },
  { id: "n.okane", ja: "お金[かね]", en: "money", pos: "noun", tags: ["object"] },
  { id: "n.jikan", ja: "時間[じかん]", en: "time", pos: "noun", tags: ["time"] },
  { id: "n.shigoto", ja: "仕事[しごと]", en: "work, job", pos: "noun", tags: ["work", "activity"] },
  { id: "n.ryokou", ja: "旅行[りょこう]", en: "trip, travel", pos: "noun", tags: ["travel", "activity"] },
  { id: "n.kouen", ja: "公園[こうえん]", en: "park", pos: "noun", tags: ["place"] },
  { id: "n.byouki", ja: "病気[びょうき]", en: "sickness", pos: "noun", tags: ["body"] },
  { id: "n.kusuri", ja: "薬[くすり]", en: "medicine", pos: "noun", tags: ["object", "body"] },

  // ---------------------------------------------------------------------
  // い-adjectives
  // ---------------------------------------------------------------------
  { id: "adj.ookii", ja: "大[おお]きい", en: "big", pos: "i-adj", tags: ["size"] },
  { id: "adj.chiisai", ja: "小[ちい]さい", en: "small", pos: "i-adj", tags: ["size"] },
  { id: "adj.takai", ja: "高[たか]い", en: "expensive, tall, high", pos: "i-adj", tags: ["price", "size"] },
  { id: "adj.yasui", ja: "安[やす]い", en: "cheap", pos: "i-adj", tags: ["price"] },
  { id: "adj.atarashii", ja: "新[あたら]しい", en: "new", pos: "i-adj", tags: ["object"] },
  { id: "adj.furui", ja: "古[ふる]い", en: "old (things)", pos: "i-adj", tags: ["object"] },
  { id: "adj.ii", ja: "いい", en: "good", pos: "i-adj", tags: ["evaluation"] },
  { id: "adj.omoshiroi", ja: "面白[おもしろ]い", en: "interesting, funny", pos: "i-adj", tags: ["evaluation"] },
  { id: "adj.oishii", ja: "おいしい", en: "delicious", pos: "i-adj", tags: ["food", "evaluation"] },
  { id: "adj.muzukashii", ja: "難[むずか]しい", en: "difficult", pos: "i-adj", tags: ["school", "evaluation"] },
  { id: "adj.isogashii", ja: "忙[いそが]しい", en: "busy", pos: "i-adj", tags: ["work", "evaluation"] },
  { id: "adj.tanoshii", ja: "楽[たの]しい", en: "fun, enjoyable", pos: "i-adj", tags: ["emotion", "evaluation"] },
  { id: "adj.kanashii", ja: "悲[かな]しい", en: "sad", pos: "i-adj", tags: ["emotion"] },
  { id: "adj.ureshii", ja: "嬉[うれ]しい", en: "happy, glad", pos: "i-adj", tags: ["emotion"] },
  { id: "adj.samui", ja: "寒[さむ]い", en: "cold (weather)", pos: "i-adj", tags: ["weather"] },
  { id: "adj.atsui", ja: "暑[あつ]い", en: "hot (weather)", pos: "i-adj", tags: ["weather"] },
  { id: "adj.atsui-touch", ja: "熱[あつ]い", en: "hot (to the touch)", pos: "i-adj", tags: ["food", "object"] },
  { id: "adj.suzushii", ja: "涼[すず]しい", en: "cool (weather)", pos: "i-adj", tags: ["weather"] },
  { id: "adj.omoi", ja: "重[おも]い", en: "heavy", pos: "i-adj", tags: ["object", "size"] },
  { id: "adj.karui", ja: "軽[かる]い", en: "light (weight)", pos: "i-adj", tags: ["object", "size"] },

  // ---------------------------------------------------------------------
  // な-adjectives (stored as the bare stem, without な)
  // ---------------------------------------------------------------------
  { id: "na.shizuka", ja: "静[しず]か", en: "quiet", pos: "na-adj", tags: ["place", "evaluation"] },
  { id: "na.nigiyaka", ja: "賑[にぎ]やか", en: "lively, bustling", pos: "na-adj", tags: ["place", "evaluation"] },
  { id: "na.benri", ja: "便利[べんり]", en: "convenient", pos: "na-adj", tags: ["object", "place", "evaluation"] },
  { id: "na.fuben", ja: "不便[ふべん]", en: "inconvenient", pos: "na-adj", tags: ["object", "place", "evaluation"] },
  { id: "na.yuumei", ja: "有名[ゆうめい]", en: "famous", pos: "na-adj", tags: ["person", "place", "evaluation"] },
  { id: "na.genki", ja: "元気[げんき]", en: "energetic, healthy", pos: "na-adj", tags: ["person", "body"] },
  { id: "na.shinsetsu", ja: "親切[しんせつ]", en: "kind", pos: "na-adj", tags: ["person", "evaluation"] },
  { id: "na.daijoubu", ja: "大丈夫[だいじょうぶ]", en: "okay, fine", pos: "na-adj", tags: ["evaluation"] },
  { id: "na.taisetsu", ja: "大切[たいせつ]", en: "important, precious", pos: "na-adj", tags: ["evaluation"] },
  { id: "na.taihen", ja: "大変[たいへん]", en: "tough, hard, serious", pos: "na-adj", tags: ["evaluation"] },
  { id: "na.kantan", ja: "簡単[かんたん]", en: "simple, easy", pos: "na-adj", tags: ["school", "evaluation"] },
  { id: "na.jouzu", ja: "上手[じょうず]", en: "skillful, good at", pos: "na-adj", tags: ["person", "evaluation"] },
  { id: "na.heta", ja: "下手[へた]", en: "unskillful, poor at", pos: "na-adj", tags: ["person", "evaluation"] },
  { id: "na.suki", ja: "好[す]き", en: "likable, fond of", pos: "na-adj", tags: ["emotion"] },
  { id: "na.kirai", ja: "嫌[きら]い", en: "disliked", pos: "na-adj", tags: ["emotion"] },
  { id: "na.hima", ja: "暇[ひま]", en: "free (time), not busy", pos: "na-adj", tags: ["time", "work"] },
  { id: "na.kirei", ja: "綺麗[きれい]", en: "pretty, clean", pos: "na-adj", tags: ["place", "person", "evaluation"] },
  { id: "na.tokubetsu", ja: "特別[とくべつ]", en: "special", pos: "na-adj", tags: ["evaluation"] },
  { id: "na.shinpai", ja: "心配[しんぱい]", en: "worried, anxious", pos: "na-adj", tags: ["emotion"] },
  { id: "na.majime", ja: "真面目[まじめ]", en: "serious, diligent", pos: "na-adj", tags: ["person", "evaluation"] },
];

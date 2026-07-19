// Exercise templates — slotted with vocab at runtime by src/engine/generator.ts.
//
// Tag-selection notes (see CONTENT_GUIDE.md-style reasoning below): several
// vocab entries in src/content/vocab.ts share IDENTICAL tag arrays (e.g.
// v.taberu/v.nomu/v.tsukuru are all exactly ["food","activity","transitive"];
// v.benkyousuru/v.renshuusuru/v.yomu are all exactly ["school","activity",
// "transitive"]). Because TemplateSlot filtering is a pure subset check with
// no exclusion mechanism, a tag-identical cluster can never be split apart —
// any filter that matches one member matches all of them. Every template
// below was authored by hand-checking that ALL entries a slot's tags can
// resolve to still produce a natural sentence, so slot tag sets are
// sometimes deliberately narrow (occasionally a single vocab entry) rather
// than the broadest tag that happens to exist.

import type { ExerciseTemplate } from "../types";

export const allTemplates: ExerciseTemplate[] = [
  // -------------------------------------------------------------------
  // n5.te-form — 〜てください (polite request)
  // -------------------------------------------------------------------
  {
    id: "tpl.te-form.1",
    grammarPointId: "n5.te-form",
    produces: "translation",
    patternJa: "{v}ください。",
    patternEn: "Please {v.en}.",
    slots: {
      v: { pos: "verb", tags: ["school", "activity"], form: "te" },
    },
  },
  {
    id: "tpl.te-form.2",
    grammarPointId: "n5.te-form",
    produces: "cloze",
    patternJa: "{obj}に{v}ください。",
    patternEn: "Please enter the {obj.en}.",
    gapSlot: "v",
    slots: {
      obj: { pos: "noun", tags: ["place", "school"] },
      v: { pos: "verb", tags: ["place"], form: "te" },
    },
  },

  // -------------------------------------------------------------------
  // n5.tai-form — 〜たい (want to)
  // -------------------------------------------------------------------
  {
    id: "tpl.tai-form.1",
    grammarPointId: "n5.tai-form",
    produces: "translation",
    patternJa: "{v}です。",
    patternEn: "I want to {v.en}.",
    slots: {
      v: { pos: "verb", tags: ["school", "activity"], form: "tai" },
    },
  },
  {
    id: "tpl.tai-form.2",
    grammarPointId: "n5.tai-form",
    produces: "cloze",
    patternJa: "{v}です。",
    patternEn: "I want to {v.en}.",
    gapSlot: "v",
    slots: {
      v: { pos: "verb", tags: ["daily-life", "transitive"], form: "tai" },
    },
  },

  // -------------------------------------------------------------------
  // n5.masu-form — polite non-past
  // -------------------------------------------------------------------
  {
    id: "tpl.masu-form.1",
    grammarPointId: "n5.masu-form",
    produces: "translation",
    patternJa: "私[わたし]は{v}。",
    patternEn: "I {v.en}.",
    slots: {
      v: { pos: "verb", tags: ["sport"], form: "masu" },
    },
  },

  // -------------------------------------------------------------------
  // n4.potential — 可能形 (can do ~)
  // -------------------------------------------------------------------
  {
    id: "tpl.potential.1",
    grammarPointId: "n4.potential",
    produces: "translation",
    patternJa: "私[わたし]は{v}。",
    patternEn: "I can {v.en}.",
    slots: {
      v: { pos: "verb", tags: ["sport"], form: "potential" },
    },
  },
  {
    id: "tpl.potential.2",
    grammarPointId: "n4.potential",
    produces: "cloze",
    patternJa: "明日[あした]、{v}。",
    patternEn: "I can {v.en} tomorrow.",
    gapSlot: "v",
    slots: {
      v: { pos: "verb", tags: ["travel", "activity", "intransitive"], form: "potential" },
    },
  },

  // -------------------------------------------------------------------
  // n4.passive — 受身形 (direct passive)
  // -------------------------------------------------------------------
  {
    id: "tpl.passive.1",
    grammarPointId: "n4.passive",
    produces: "translation",
    patternJa: "{subj}はみんなに{v}。",
    patternEn: "The {subj.en} is known by everyone.",
    slots: {
      subj: { pos: "noun", tags: ["place", "work"] },
      v: { pos: "verb", tags: ["cognition", "transitive"], form: "passive" },
    },
  },

  // -------------------------------------------------------------------
  // n4.causative — 使役形 (make/let someone do)
  // -------------------------------------------------------------------
  {
    id: "tpl.causative.1",
    grammarPointId: "n4.causative",
    produces: "translation",
    patternJa: "先生[せんせい]は{causee}を{v}。",
    patternEn: "The teacher makes the {causee.en} {v.en}.",
    slots: {
      causee: { pos: "noun", tags: ["person", "school"] },
      v: { pos: "verb", tags: ["sport"], form: "causative" },
    },
  },

  // -------------------------------------------------------------------
  // n4.volitional — 意向形 (let's ~)
  // -------------------------------------------------------------------
  {
    id: "tpl.volitional.1",
    grammarPointId: "n4.volitional",
    produces: "translation",
    patternJa: "一緒[いっしょ]に{v}。",
    patternEn: "Let's {v.en} together.",
    slots: {
      v: { pos: "verb", tags: ["school", "activity"], form: "volitional" },
    },
  },

  // -------------------------------------------------------------------
  // n4.ba-tara — 〜ば・〜たら (conditionals)
  // -------------------------------------------------------------------
  {
    id: "tpl.ba-tara.1",
    grammarPointId: "n4.ba-tara",
    produces: "cloze",
    patternJa: "{v}いいですよ。",
    patternEn: "You should just {v.en}. (use 〜ば)",
    gapSlot: "v",
    slots: {
      v: { pos: "verb", tags: ["sport"], form: "ba" },
    },
  },
  {
    id: "tpl.ba-tara.2",
    grammarPointId: "n4.ba-tara",
    produces: "cloze",
    patternJa: "{adj}、教[おし]えてください。",
    patternEn: "If it's {adj.en}, please tell me. (use 〜たら)",
    gapSlot: "adj",
    slots: {
      adj: { pos: "i-adj", tags: ["school", "evaluation"], form: "tara" },
    },
  },

  // -------------------------------------------------------------------
  // n4.nakereba-naranai — obligation (using the 〜ないと + いけません
  // variant, since VerbForm has no composite "nakereba" form to derive
  // なければ from the negative — see conjugator.ts's VerbForm union)
  // -------------------------------------------------------------------
  {
    id: "tpl.nakereba-naranai.1",
    grammarPointId: "n4.nakereba-naranai",
    produces: "cloze",
    patternJa: "{v}といけません。",
    patternEn: "You must {v.en}.",
    gapSlot: "v",
    slots: {
      v: { pos: "verb", tags: ["sport"], form: "nai" },
    },
  },

  // -------------------------------------------------------------------
  // n4.temo-ii — 〜てもいい (permission)
  // -------------------------------------------------------------------
  {
    id: "tpl.temo-ii.1",
    grammarPointId: "n4.temo-ii",
    produces: "translation",
    patternJa: "{v}もいいです。",
    patternEn: "You may {v.en}.",
    slots: {
      v: { pos: "verb", tags: ["daily-life", "transitive"], form: "te" },
    },
  },
];

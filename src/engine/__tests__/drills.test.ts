import { describe, expect, it } from "vitest";

import { allParticleItems, allVocab } from "../../content";
import type {
  AdjForm,
  ParticleDrillItem,
  TransitivityPair,
  VerbClass,
  VerbForm,
  VocabEntry,
} from "../../content/types";
import { conjugateAdjective, conjugateVerb } from "../conjugator";
import {
  ADJ_FORM_LABELS,
  buildConjugationQuestions,
  buildParticleQuestions,
  buildTransitivityQuestions,
  buildVocabRecallQuestions,
  describeStatKey,
  DRILLS,
  pickDistractors,
  VERB_FORM_LABELS,
} from "../drills";
import type { DrillQuestion } from "../drills";
import { mulberry32 } from "../rng";

// ---------------------------------------------------------------------------
// Synthetic fixtures — small hand-built banks that keep the particle/
// transitivity tests focused on builder behavior rather than the shape of
// the real content banks. Both builders accept their source array as an
// injectable parameter for exactly this reason.
// ---------------------------------------------------------------------------

const testParticleItems: ParticleDrillItem[] = [
  {
    id: "pd.test1",
    sentence: "私[わたし]＿＿学校[がっこう]に行[い]きます。",
    answer: "は",
    translationEn: "I go to school.",
    level: "N5",
  },
  {
    id: "pd.test2",
    sentence: "友達[ともだち]＿＿会[あ]いました。",
    answer: "に",
    translationEn: "I met a friend.",
    level: "N5",
    note: "に marks the person met, not を",
  },
  {
    id: "pd.test3",
    sentence: "図書館[としょかん]＿＿本[ほん]を読[よ]みます。",
    answer: "で",
    distractors: ["に", "を", "へ"],
    translationEn: "I read a book at the library.",
    level: "N4",
  },
  {
    // Only one authored distractor — proves the PARTICLE_SET top-up fires
    // and still yields 4 unique choices.
    id: "pd.test4",
    sentence: "テスト＿＿文[ぶん]です。",
    answer: "の",
    distractors: ["は"],
    translationEn: "This is a test sentence.",
    level: "N4",
  },
];

const testTransitivityPairs: TransitivityPair[] = [
  {
    id: "tp.test1",
    transitive: { ja: "開[あ]ける", en: "to open (something)" },
    intransitive: { ja: "開[あ]く", en: "to open (by itself)" },
    note: "開ける takes を; 開く takes が",
  },
  {
    id: "tp.test2",
    transitive: { ja: "閉[し]める", en: "to close (something)" },
    intransitive: { ja: "閉[し]まる", en: "to close (by itself)" },
  },
  {
    id: "tp.test3",
    transitive: { ja: "始[はじ]める", en: "to start (something)" },
    intransitive: { ja: "始[はじ]まる", en: "to start (by itself)" },
  },
];

/** Small vocab fixture deliberately containing a near-synonym pair (miru /
 * nagameru both gloss "watch") to exercise pickDistractors' rejection logic. */
const synonymVocab: VocabEntry[] = [
  { id: "v.test.miru", ja: "見[み]る", en: "to see, to watch", pos: "verb", verbClass: "ichidan", tags: [] },
  { id: "v.test.nagameru", ja: "眺[なが]める", en: "to watch, to gaze at", pos: "verb", verbClass: "ichidan", tags: [] },
  { id: "v.test.kaku", ja: "書[か]く", en: "to write", pos: "verb", verbClass: "godan", tags: [] },
  { id: "v.test.yomu", ja: "読[よ]む", en: "to read", pos: "verb", verbClass: "godan", tags: [] },
  { id: "v.test.taberu", ja: "食[た]べる", en: "to eat", pos: "verb", verbClass: "ichidan", tags: [] },
  { id: "v.test.mado", ja: "窓[まど]", en: "window", pos: "noun", tags: [] },
];

const SEEDS = [1, 2, 3, 42, 99, 12345];

function choiceQuestions(qs: DrillQuestion[]) {
  return qs.filter((q): q is Extract<DrillQuestion, { mode: "choice" }> => q.mode === "choice");
}

// ---------------------------------------------------------------------------
// buildConjugationQuestions
// ---------------------------------------------------------------------------

describe("buildConjugationQuestions", () => {
  it("returns exactly `count` questions for verbs", () => {
    const qs = buildConjugationQuestions(
      { kind: "verbs", classes: ["godan", "ichidan"], verbForms: ["te", "ta"], adjForms: [] },
      mulberry32(1),
      10,
    );
    expect(qs.length).toBe(10);
    for (const q of qs) expect(q.mode).toBe("typed");
  });

  it("returns exactly `count` questions for adjectives", () => {
    const qs = buildConjugationQuestions(
      { kind: "adjectives", classes: [], verbForms: [], adjForms: ["negative", "past"] },
      mulberry32(1),
      8,
    );
    expect(qs.length).toBe(8);
  });

  it("degrades to [] when no vocab matches the requested verb classes", () => {
    const qs = buildConjugationQuestions(
      { kind: "verbs", classes: ["suru"], verbForms: ["te"], adjForms: [] },
      mulberry32(1),
      5,
      [], // empty pool
    );
    expect(qs).toEqual([]);
  });

  it("degrades to [] when the target form list is empty", () => {
    const qs = buildConjugationQuestions(
      { kind: "verbs", classes: ["godan"], verbForms: [], adjForms: [] },
      mulberry32(1),
      5,
    );
    expect(qs).toEqual([]);
  });

  it("repeats entries to still return exactly `count` when the pool is smaller than count", () => {
    const tinyPool: VocabEntry[] = [
      { id: "v.tiny", ja: "行[い]く", en: "to go", pos: "verb", verbClass: "godan", tags: [] },
    ];
    const qs = buildConjugationQuestions(
      { kind: "verbs", classes: ["godan"], verbForms: ["te"], adjForms: [] },
      mulberry32(1),
      6,
      tinyPool,
    );
    expect(qs.length).toBe(6);
    expect(qs.every((q) => q.promptJa === "行[い]く")).toBe(true);
  });

  it("is deterministic for a fixed seed and varies across seeds", () => {
    const opts = {
      kind: "verbs" as const,
      classes: ["godan", "ichidan"] as VerbClass[],
      verbForms: ["te", "ta", "nai", "potential"] as VerbForm[],
      adjForms: [] as AdjForm[],
    };
    const a = buildConjugationQuestions(opts, mulberry32(7), 10);
    const b = buildConjugationQuestions(opts, mulberry32(7), 10);
    expect(a).toEqual(b);

    const ids = new Set(
      SEEDS.map((seed) =>
        buildConjugationQuestions(
          { kind: "verbs", classes: ["godan", "ichidan"], verbForms: ["te", "ta", "nai", "potential"], adjForms: [] },
          mulberry32(seed),
          10,
        )
          .map((q) => q.id)
          .join(","),
      ),
    );
    expect(ids.size).toBeGreaterThan(1);
  });

  it("statKey has no 'conjugation:' prefix — byte-identical to the pre-extraction schema", () => {
    const qs = buildConjugationQuestions(
      { kind: "verbs", classes: ["godan", "ichidan", "suru", "kuru"], verbForms: ["te", "ta", "nai", "potential"], adjForms: [] },
      mulberry32(3),
      20,
    );
    for (const q of qs) {
      expect(q.statKey).toMatch(/^(godan|ichidan|suru|kuru):[a-z-]+$/);
      expect(q.statKey.startsWith("conjugation:")).toBe(false);
    }

    const adjQs = buildConjugationQuestions(
      { kind: "adjectives", classes: [], verbForms: [], adjForms: ["negative", "past", "te", "ba"] },
      mulberry32(3),
      20,
    );
    for (const q of adjQs) {
      expect(q.statKey).toMatch(/^(i-adj|na-adj):[a-z-]+$/);
      expect(q.statKey.startsWith("conjugation:")).toBe(false);
    }
  });

  it("parity: accepted[] matches conjugateVerb/conjugateAdjective directly for a fixed seed", () => {
    const verbQs = buildConjugationQuestions(
      { kind: "verbs", classes: ["godan", "ichidan", "suru", "kuru"], verbForms: ["te", "ta", "nai", "potential", "volitional"], adjForms: [] },
      mulberry32(5),
      15,
    );
    for (const q of verbQs) {
      if (q.mode !== "typed") throw new Error("conjugation questions must be typed");
      const entry = allVocab.find((v) => v.ja === q.promptJa);
      if (entry?.pos !== "verb") throw new Error(`fixture lookup failed for "${q.promptJa}"`);
      const [, form] = q.statKey.split(":");
      const expected = conjugateVerb(entry, form as Parameters<typeof conjugateVerb>[1]);
      expect(q.accepted).toEqual([expected]);
    }

    const adjQs = buildConjugationQuestions(
      { kind: "adjectives", classes: [], verbForms: [], adjForms: ["negative", "past", "te", "ba", "tara"] },
      mulberry32(5),
      15,
    );
    for (const q of adjQs) {
      if (q.mode !== "typed") throw new Error("conjugation questions must be typed");
      const entry = allVocab.find((v) => v.ja === q.promptJa);
      if (!entry || (entry.pos !== "i-adj" && entry.pos !== "na-adj")) {
        throw new Error(`fixture lookup failed for "${q.promptJa}"`);
      }
      const [, form] = q.statKey.split(":");
      const expected = conjugateAdjective(entry, form as Parameters<typeof conjugateAdjective>[1]);
      expect(q.accepted).toEqual([expected]);
    }
  });

  it("instruction is the arrow-prefixed form label", () => {
    const qs = buildConjugationQuestions(
      { kind: "verbs", classes: ["godan"], verbForms: ["potential"], adjForms: [] },
      mulberry32(1),
      3,
    );
    for (const q of qs) expect(q.instruction).toBe(`→ ${VERB_FORM_LABELS.potential}`);
  });
});

// ---------------------------------------------------------------------------
// buildParticleQuestions
// ---------------------------------------------------------------------------

describe("buildParticleQuestions", () => {
  it("returns [] when the item bank is empty", () => {
    expect(buildParticleQuestions(mulberry32(1), 5, [])).toEqual([]);
  });

  it("returns exactly `count` questions, repeating items when the bank is smaller than count", () => {
    const qs = buildParticleQuestions(mulberry32(1), 7, testParticleItems);
    expect(qs.length).toBe(7);
  });

  it("is deterministic for a fixed seed and varies across seeds", () => {
    const a = buildParticleQuestions(mulberry32(9), 6, testParticleItems);
    const b = buildParticleQuestions(mulberry32(9), 6, testParticleItems);
    expect(a).toEqual(b);

    const variants = new Set(
      SEEDS.map((seed) =>
        buildParticleQuestions(mulberry32(seed), 6, testParticleItems)
          .map((q) => JSON.stringify(q))
          .join("|"),
      ),
    );
    expect(variants.size).toBeGreaterThan(1);
  });

  it("statKey is namespaced particle:<particle>", () => {
    for (const seed of SEEDS) {
      const qs = buildParticleQuestions(mulberry32(seed), 6, testParticleItems);
      for (const q of qs) expect(q.statKey).toMatch(/^particle:.+$/);
    }
  });

  it("explanation folds in translationEn and note", () => {
    const qs = buildParticleQuestions(mulberry32(1), 3, [testParticleItems[1]]);
    for (const q of qs) {
      expect(q.explanation).toContain("I met a friend.");
      expect(q.explanation).toContain("に marks the person met");
    }
  });

  it("choices never contain duplicates and correctIndex is the answer, across many seeds", () => {
    for (let seed = 0; seed < 60; seed++) {
      const qs = choiceQuestions(buildParticleQuestions(mulberry32(seed), 6, testParticleItems));
      for (const q of qs) {
        expect(new Set(q.choices).size, `seed ${seed} q ${q.id}`).toBe(q.choices.length);
        expect(q.choices[q.correctIndex]).toBe(q.statKey.split(":")[1]);
      }
    }
  });

  it("every question against the real bank has exactly 4 unique choices, answer included", () => {
    for (let seed = 0; seed < 5; seed++) {
      const qs = choiceQuestions(buildParticleQuestions(mulberry32(seed), 60, allParticleItems));
      expect(qs.length).toBe(60);
      for (const q of qs) {
        expect(q.choices.length, `seed ${seed} q ${q.id}`).toBe(4);
        expect(new Set(q.choices).size, `seed ${seed} q ${q.id}`).toBe(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
        expect(q.choices[q.correctIndex]).toBe(q.statKey.split(":")[1]);
      }
    }
  });

  it("tops up from PARTICLE_SET to 4 unique choices when only one distractor is authored", () => {
    for (let seed = 0; seed < 20; seed++) {
      const qs = choiceQuestions(
        buildParticleQuestions(mulberry32(seed), 3, [testParticleItems[3]]),
      );
      for (const q of qs) {
        expect(q.choices.length, `seed ${seed} q ${q.id}`).toBe(4);
        expect(new Set(q.choices).size, `seed ${seed} q ${q.id}`).toBe(4);
        expect(q.choices).toContain("の");
      }
    }
  });
});

// ---------------------------------------------------------------------------
// buildTransitivityQuestions
// ---------------------------------------------------------------------------

describe("buildTransitivityQuestions", () => {
  it("returns [] when the pair bank is empty", () => {
    expect(buildTransitivityQuestions(mulberry32(1), 5, [])).toEqual([]);
  });

  it("returns exactly `count` questions, repeating pairs when the bank is smaller than count", () => {
    const qs = buildTransitivityQuestions(mulberry32(1), 8, testTransitivityPairs);
    expect(qs.length).toBe(8);
  });

  it("is deterministic for a fixed seed and varies across seeds", () => {
    const a = buildTransitivityQuestions(mulberry32(4), 6, testTransitivityPairs);
    const b = buildTransitivityQuestions(mulberry32(4), 6, testTransitivityPairs);
    expect(a).toEqual(b);

    const variants = new Set(
      SEEDS.map((seed) =>
        buildTransitivityQuestions(mulberry32(seed), 6, testTransitivityPairs)
          .map((q) => JSON.stringify(q))
          .join("|"),
      ),
    );
    expect(variants.size).toBeGreaterThan(1);
  });

  it("statKey is exactly transitivity:to-transitive or transitivity:to-intransitive", () => {
    const qs = buildTransitivityQuestions(mulberry32(2), 20, testTransitivityPairs);
    for (const q of qs) {
      expect(["transitivity:to-transitive", "transitivity:to-intransitive"]).toContain(q.statKey);
    }
    // Both directions actually occur across enough draws.
    const seen = new Set(qs.map((q) => q.statKey));
    expect(seen.size).toBe(2);
  });

  it("accepted[] is always the OTHER member of the pair, never the given one", () => {
    const qs = buildTransitivityQuestions(mulberry32(2), 20, testTransitivityPairs);
    for (const q of qs) {
      if (q.mode !== "typed") throw new Error("transitivity questions must be typed");
      const pair = testTransitivityPairs.find(
        (p) => p.transitive.ja === q.promptJa || p.intransitive.ja === q.promptJa,
      );
      if (!pair) throw new Error(`fixture lookup failed for "${q.promptJa}"`);
      if (q.statKey === "transitivity:to-transitive") {
        expect(q.promptJa).toBe(pair.intransitive.ja);
        expect(q.accepted).toEqual([pair.transitive.ja]);
      } else {
        expect(q.promptJa).toBe(pair.transitive.ja);
        expect(q.accepted).toEqual([pair.intransitive.ja]);
      }
    }
  });

  it("explanation carries the pair's note when present", () => {
    const qs = buildTransitivityQuestions(mulberry32(1), 3, [testTransitivityPairs[0]]);
    for (const q of qs) expect(q.explanation).toBe(testTransitivityPairs[0].note);
  });
});

// ---------------------------------------------------------------------------
// buildVocabRecallQuestions
// ---------------------------------------------------------------------------

describe("buildVocabRecallQuestions", () => {
  it("returns [] when vocab is empty", () => {
    expect(buildVocabRecallQuestions({ direction: "both" }, mulberry32(1), 5, [])).toEqual([]);
  });

  it("returns exactly `count` questions for each direction", () => {
    expect(buildVocabRecallQuestions({ direction: "ja-en" }, mulberry32(1), 10).length).toBe(10);
    expect(buildVocabRecallQuestions({ direction: "en-ja" }, mulberry32(1), 10).length).toBe(10);
    expect(buildVocabRecallQuestions({ direction: "both" }, mulberry32(1), 10).length).toBe(10);
  });

  it("ja-en is always mode 'choice' and en-ja is always mode 'typed'", () => {
    const jaEn = buildVocabRecallQuestions({ direction: "ja-en" }, mulberry32(1), 20);
    expect(jaEn.every((q) => q.mode === "choice")).toBe(true);
    const enJa = buildVocabRecallQuestions({ direction: "en-ja" }, mulberry32(1), 20);
    expect(enJa.every((q) => q.mode === "typed")).toBe(true);
  });

  it("both directions occur when direction is 'both'", () => {
    const qs = buildVocabRecallQuestions({ direction: "both" }, mulberry32(1), 20);
    const modes = new Set(qs.map((q) => q.mode));
    expect(modes.size).toBe(2);
  });

  it("statKey is exactly vocab:ja-en or vocab:en-ja (2 buckets, not per-word)", () => {
    const qs = buildVocabRecallQuestions({ direction: "both" }, mulberry32(1), 30);
    const keys = new Set(qs.map((q) => q.statKey));
    for (const k of keys) expect(["vocab:ja-en", "vocab:en-ja"]).toContain(k);
    expect(keys.size).toBeLessThanOrEqual(2);
  });

  it("en-ja accepted[] is the entry's furigana-notation `ja`", () => {
    const qs = buildVocabRecallQuestions({ direction: "en-ja" }, mulberry32(1), 15);
    for (const q of qs) {
      if (q.mode !== "typed") throw new Error("en-ja questions must be typed");
      const entry = allVocab.find((v) => v.en === q.promptEn);
      if (!entry) throw new Error(`fixture lookup failed for "${q.promptEn}"`);
      expect(q.accepted).toEqual([entry.ja]);
    }
  });

  it("is deterministic for a fixed seed and varies across seeds", () => {
    const a = buildVocabRecallQuestions({ direction: "both" }, mulberry32(11), 12);
    const b = buildVocabRecallQuestions({ direction: "both" }, mulberry32(11), 12);
    expect(a).toEqual(b);

    const variants = new Set(
      SEEDS.map((seed) =>
        buildVocabRecallQuestions({ direction: "both" }, mulberry32(seed), 12)
          .map((q) => q.id)
          .join(","),
      ),
    );
    expect(variants.size).toBeGreaterThan(1);
  });

  it("choices never contain duplicates and correctIndex is the answer, across many seeds and the full vocab bank", () => {
    for (let seed = 0; seed < 60; seed++) {
      const qs = choiceQuestions(buildVocabRecallQuestions({ direction: "ja-en" }, mulberry32(seed), 10));
      for (const q of qs) {
        expect(new Set(q.choices).size, `seed ${seed} q ${q.id}`).toBe(q.choices.length);
        const entry = allVocab.find((v) => v.ja === q.promptJa);
        expect(entry).toBeDefined();
        expect(q.choices[q.correctIndex]).toBe(entry?.en);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// pickDistractors — the near-synonym guard
// ---------------------------------------------------------------------------

describe("pickDistractors", () => {
  const miru = synonymVocab[0]; // "to see, to watch"
  const nagameru = synonymVocab[1]; // "to watch, to gaze at" — shares "watch"

  it("never includes an entry whose gloss shares a token with the answer", () => {
    for (let seed = 0; seed < 40; seed++) {
      const picked = pickDistractors(miru, synonymVocab, mulberry32(seed), 4);
      expect(picked.some((p) => p.id === nagameru.id)).toBe(false);
    }
  });

  it("only draws distractors matching the answer's part of speech", () => {
    const picked = pickDistractors(miru, synonymVocab, mulberry32(1), 4);
    expect(picked.every((p) => p.pos === "verb")).toBe(true);
    expect(picked.some((p) => p.id === "v.test.mado")).toBe(false); // noun, excluded by pos
  });

  it("never includes the answer itself", () => {
    for (let seed = 0; seed < 20; seed++) {
      const picked = pickDistractors(miru, synonymVocab, mulberry32(seed), 4);
      expect(picked.some((p) => p.id === miru.id)).toBe(false);
    }
  });

  it("never produces duplicate glosses among the picked distractors themselves", () => {
    const dupGlossPool: VocabEntry[] = [
      ...synonymVocab,
      { id: "v.test.kaku2", ja: "書[か]く", en: "to write", pos: "verb", verbClass: "godan", tags: [] }, // duplicate gloss of v.test.kaku, different id
    ];
    for (let seed = 0; seed < 20; seed++) {
      const picked = pickDistractors(miru, dupGlossPool, mulberry32(seed), 5);
      const glosses = picked.map((p) => p.en);
      expect(new Set(glosses).size).toBe(glosses.length);
    }
  });

  it("degrades to fewer than `count` when there aren't enough safe candidates", () => {
    const tinyPool = [miru, nagameru]; // only the near-synonym, which must be excluded
    const picked = pickDistractors(miru, tinyPool, mulberry32(1), 4);
    expect(picked).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// DRILLS + describeStatKey
// ---------------------------------------------------------------------------

describe("DRILLS", () => {
  it("has all four drill ids with matching `id` fields", () => {
    expect(Object.keys(DRILLS).sort()).toEqual(
      ["conjugation", "particle", "transitivity", "vocab-recall"].sort(),
    );
    for (const [key, spec] of Object.entries(DRILLS)) {
      expect(spec.id).toBe(key);
    }
  });

  it("build() works uniformly through defaultOptions for conjugation", () => {
    const qs = DRILLS.conjugation.build(DRILLS.conjugation.defaultOptions, mulberry32(1), 5);
    expect(qs.length).toBe(5);
  });

  it("build() throws on mismatched options (caller bug, not a silent no-op)", () => {
    expect(() => DRILLS.particle.build(DRILLS.conjugation.defaultOptions, mulberry32(1), 5)).toThrow();
  });
});

describe("describeStatKey", () => {
  it("renders known conjugation keys", () => {
    expect(describeStatKey("godan:te")).toBe(`godan · ${VERB_FORM_LABELS.te}`);
    expect(describeStatKey("i-adj:past")).toBe(`i-adj · ${ADJ_FORM_LABELS.past}`);
    expect(describeStatKey("na-adj:te")).toBe(`na-adj · ${ADJ_FORM_LABELS.te}`);
  });

  it("renders known particle/vocab/transitivity keys", () => {
    expect(describeStatKey("particle:に")).toBe("particle · に");
    expect(describeStatKey("vocab:ja-en")).toBe("vocab · JA → EN");
    expect(describeStatKey("vocab:en-ja")).toBe("vocab · EN → JA");
    expect(describeStatKey("transitivity:to-transitive")).toBe("transitivity · 他動詞");
    expect(describeStatKey("transitivity:to-intransitive")).toBe("transitivity · 自動詞");
  });

  it("falls back to the raw key for unrecognized/legacy keys", () => {
    expect(describeStatKey("some-legacy-key")).toBe("some-legacy-key");
    expect(describeStatKey("godan:not-a-real-form")).toBe("godan:not-a-real-form");
    expect(describeStatKey("vocab:not-a-real-direction")).toBe("vocab:not-a-real-direction");
    expect(describeStatKey("totally:unknown")).toBe("totally:unknown");
  });
});

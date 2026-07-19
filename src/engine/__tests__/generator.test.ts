import { describe, expect, it } from "vitest";

import { allTemplates, allVocab, grammarPointById } from "../../content";
import type { ExerciseTemplate } from "../../content/types";
import { parseFurigana } from "../furigana";
import { generateExercise, generateForPoint } from "../generator";
import { mulberry32 } from "../rng";

// ---------------------------------------------------------------------------
// Furigana well-formedness helper — reimplemented locally (not imported from
// content.test.ts) per the task instructions: a string is well-formed when
// every "[...]" is immediately preceded by a run of kanji, every reading is
// hiragana-only, and no kanji is left without a reading.
// ---------------------------------------------------------------------------

const KANJI = /[㐀-䶿一-鿿々〆ヵヶ〇]/;
const HIRAGANA_ONLY = /^[ぁ-ゟ]+$/;

function furiganaIssues(text: string, label: string): string[] {
  const issues: string[] = [];
  for (const seg of parseFurigana(text)) {
    if (seg.base.includes("[") || seg.base.includes("]")) {
      issues.push(`${label}: stray/unmatched bracket near "${seg.base}" (in "${text}")`);
    }
    if (seg.reading !== undefined) {
      if (seg.reading.length === 0 || !HIRAGANA_ONLY.test(seg.reading)) {
        issues.push(`${label}: non-hiragana or empty reading "${seg.reading}" (in "${text}")`);
      }
    } else if (KANJI.test(seg.base)) {
      issues.push(`${label}: kanji without a reading in "${seg.base}" (in "${text}")`);
    }
  }
  return issues;
}

const SEEDS = [1, 2, 3, 42, 99, 12345];

describe("generateExercise — determinism", () => {
  it("same template + pool + seed produces an identical exercise", () => {
    for (const tpl of allTemplates) {
      for (const seed of [1, 7, 500]) {
        const a = generateExercise(tpl, allVocab, mulberry32(seed));
        const b = generateExercise(tpl, allVocab, mulberry32(seed));
        expect(a, `template "${tpl.id}" seed ${seed}`).toEqual(b);
      }
    }
  });

  it("different seeds explore different vocab for multi-candidate templates", () => {
    // Templates whose slots resolve to more than one candidate should show
    // some variation across a spread of seeds.
    const multiCandidateTemplates = allTemplates.filter((tpl) =>
      Object.values(tpl.slots).some((slot) => {
        const count = allVocab.filter(
          (v) => v.pos === slot.pos && (slot.tags ?? []).every((t) => v.tags.includes(t))
        ).length;
        return count > 1;
      })
    );
    expect(multiCandidateTemplates.length).toBeGreaterThan(0);

    for (const tpl of multiCandidateTemplates) {
      const ids = new Set<string>();
      for (let seed = 0; seed < 30; seed++) {
        const ex = generateExercise(tpl, allVocab, mulberry32(seed));
        if (ex) ids.add(ex.id);
      }
      expect(ids.size, `template "${tpl.id}" should vary across seeds`).toBeGreaterThan(1);
    }
  });
});

describe("generateExercise — every authored template", () => {
  it("generates a non-null exercise for at least 3 distinct seeds against allVocab", () => {
    for (const tpl of allTemplates) {
      let successCount = 0;
      for (const seed of SEEDS) {
        const ex = generateExercise(tpl, allVocab, mulberry32(seed));
        if (ex) successCount++;
      }
      expect(successCount, `template "${tpl.id}" successes`).toBeGreaterThanOrEqual(3);
    }
  });

  it("produces well-shaped, well-formed-furigana output for every seed", () => {
    const issues: string[] = [];
    for (const tpl of allTemplates) {
      for (const seed of SEEDS) {
        const ex = generateExercise(tpl, allVocab, mulberry32(seed));
        if (!ex) continue;

        expect(ex.grammarPointId, `"${ex.id}" grammarPointId`).toBe(tpl.grammarPointId);
        expect(grammarPointById.has(ex.grammarPointId), `"${ex.id}" -> "${ex.grammarPointId}"`).toBe(true);
        expect(ex.source, `"${ex.id}" source`).toBe("generated");
        expect(ex.id.startsWith(`gen.${tpl.id}.`), `"${ex.id}" id prefix`).toBe(true);

        if (ex.kind === "translation") {
          expect(ex.accepted.length, `"${ex.id}" accepted`).toBeGreaterThanOrEqual(1);
          expect(ex.promptEn.length, `"${ex.id}" promptEn`).toBeGreaterThan(0);
          issues.push(...ex.accepted.flatMap((a, i) => furiganaIssues(a, `${ex.id}.accepted[${i}]`)));
        } else if (ex.kind === "cloze") {
          const gapCount = (ex.sentence.match(/＿＿/g) ?? []).length;
          expect(gapCount, `"${ex.id}" gap count`).toBe(1);
          expect(ex.accepted.length, `"${ex.id}" accepted`).toBeGreaterThanOrEqual(1);
          expect(ex.translationEn.length, `"${ex.id}" translationEn`).toBeGreaterThan(0);
          issues.push(...furiganaIssues(ex.sentence, `${ex.id}.sentence`));
          issues.push(...ex.accepted.flatMap((a, i) => furiganaIssues(a, `${ex.id}.accepted[${i}]`)));
        }
      }
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });
});

describe("generateForPoint", () => {
  it("returns `count` unique-id exercises when the template/vocab space allows", () => {
    const exercises = generateForPoint("n4.causative", allTemplates, allVocab, mulberry32(1), 4);
    expect(exercises.length).toBe(4);
    const ids = new Set(exercises.map((e) => e.id));
    expect(ids.size).toBe(4);
    for (const ex of exercises) {
      expect(ex.grammarPointId).toBe("n4.causative");
    }
  });

  it("returns [] when there are no templates for the point", () => {
    const exercises = generateForPoint("n5.i-adjectives", allTemplates, allVocab, mulberry32(1), 5);
    expect(exercises).toEqual([]);
  });

  it("stops within the attempt cap (count * 10) rather than looping forever", () => {
    // n4.passive has exactly one template with a single verb candidate
    // (v.shiru) x a single noun candidate (n.kaisha), so there is only ever
    // one possible generated exercise — asking for 5 unique ones can never
    // succeed, and generateForPoint must still terminate.
    const exercises = generateForPoint("n4.passive", allTemplates, allVocab, mulberry32(1), 5);
    expect(exercises.length).toBeGreaterThanOrEqual(1);
    expect(exercises.length).toBeLessThan(5);
  });
});

describe("generateExercise — impossible slot filter", () => {
  it("returns null when a slot's tag filter matches no vocab", () => {
    const impossible: ExerciseTemplate = {
      id: "tpl.test.impossible",
      grammarPointId: "n4.potential",
      produces: "translation",
      patternJa: "{v}。",
      patternEn: "{v.en}.",
      slots: {
        v: { pos: "verb", tags: ["this-tag-does-not-exist-in-any-vocab-entry"] },
      },
    };
    expect(generateExercise(impossible, allVocab, mulberry32(1))).toBeNull();
  });

  it("returns null when a slot's pos has zero vocab entries at all", () => {
    const impossible: ExerciseTemplate = {
      id: "tpl.test.impossible2",
      grammarPointId: "n4.potential",
      produces: "translation",
      patternJa: "{obj}。",
      patternEn: "{obj.en}.",
      slots: {
        obj: { pos: "noun", tags: ["food", "verb-only-nonsense-tag"] },
      },
    };
    expect(generateExercise(impossible, allVocab, mulberry32(1))).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Spot-checks: exact expected sentence strings for pinned seeds, verified by
// hand against the frozen conjugator's output before being locked in here.
// ---------------------------------------------------------------------------

describe("spot-checks (pinned seeds)", () => {
  const byId = new Map(allTemplates.map((t) => [t.id, t]));

  function mustGet(id: string): ExerciseTemplate {
    const tpl = byId.get(id);
    if (!tpl) throw new Error(`missing template ${id}`);
    return tpl;
  }

  it("tpl.te-form.1 seed 1 -> 勉強してください (Please study.)", () => {
    const tpl = mustGet("tpl.te-form.1");
    const ex = generateExercise(tpl, allVocab, mulberry32(1));
    expect(ex).toEqual({
      kind: "translation",
      id: "gen.tpl.te-form.1.v.benkyousuru",
      grammarPointId: "n5.te-form",
      source: "generated",
      promptEn: "Please study.",
      accepted: ["勉強[べんきょう]してください。"],
    });
  });

  it("tpl.te-form.1 seed 2 -> 練習してください (Please practice.)", () => {
    const tpl = mustGet("tpl.te-form.1");
    const ex = generateExercise(tpl, allVocab, mulberry32(2));
    expect(ex).toEqual({
      kind: "translation",
      id: "gen.tpl.te-form.1.v.renshuusuru",
      grammarPointId: "n5.te-form",
      source: "generated",
      promptEn: "Please practice.",
      accepted: ["練習[れんしゅう]してください。"],
    });
  });

  it("tpl.nakereba-naranai.1 seed 1 -> 走らないといけません (You must run.)", () => {
    const tpl = mustGet("tpl.nakereba-naranai.1");
    const ex = generateExercise(tpl, allVocab, mulberry32(1));
    expect(ex).toEqual({
      kind: "cloze",
      id: "gen.tpl.nakereba-naranai.1.v.hashiru",
      grammarPointId: "n4.nakereba-naranai",
      source: "generated",
      sentence: "＿＿といけません。",
      accepted: ["走[はし]らない"],
      translationEn: "You must run.",
    });
  });

  it("tpl.passive.1 seed 1 -> 会社はみんなに知られる (The company is known by everyone.)", () => {
    const tpl = mustGet("tpl.passive.1");
    const ex = generateExercise(tpl, allVocab, mulberry32(1));
    expect(ex).toEqual({
      kind: "translation",
      id: "gen.tpl.passive.1.n.kaisha+v.shiru",
      grammarPointId: "n4.passive",
      source: "generated",
      promptEn: "The company is known by everyone.",
      accepted: ["会社[かいしゃ]はみんなに知[し]られる。"],
    });
  });

  it("tpl.potential.2 seed 1 -> 明日、来られる (I can come tomorrow.)", () => {
    const tpl = mustGet("tpl.potential.2");
    const ex = generateExercise(tpl, allVocab, mulberry32(1));
    expect(ex).toEqual({
      kind: "cloze",
      id: "gen.tpl.potential.2.v.kuru",
      grammarPointId: "n4.potential",
      source: "generated",
      sentence: "明日[あした]、＿＿。",
      accepted: ["来[こ]られる"],
      translationEn: "I can come tomorrow.",
    });
  });
});

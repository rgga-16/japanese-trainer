// Validates ALL authored content from the src/content barrel. Keep this
// passing as content grows — see CONTENT_GUIDE.md for the rules content
// must follow.

import { describe, expect, it } from "vitest";
import {
  allExercises,
  allGrammarPoints,
  allPassages,
  allTemplates,
  allVocab,
  grammarPointById,
} from "../../content";
import { parseFurigana } from "../furigana";
import type { Exercise, VocabEntry } from "../../content/types";

// ---------------------------------------------------------------------------
// Furigana well-formedness helper
// ---------------------------------------------------------------------------
//
// A string is well-formed furigana notation when:
//   1. every "[...]" is immediately preceded by a run of kanji characters
//      (anything else — a stray/unmatched bracket — leaves literal "[" or
//      "]" characters in the base text once parsed);
//   2. every reading inside "[...]" is hiragana-only;
//   3. no kanji character anywhere is left without a reading.

const KANJI = /[㐀-䶿一-鿿々〆ヵヶ〇]/;
const HIRAGANA_ONLY = /^[ぁ-ゟ]+$/;

function furiganaIssues(text: string, label: string): string[] {
  const issues: string[] = [];
  const segments = parseFurigana(text);
  for (const seg of segments) {
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

function collectFuriganaIssues(texts: Array<[string | undefined, string]>): string[] {
  const issues: string[] = [];
  for (const [text, label] of texts) {
    if (text === undefined) continue;
    issues.push(...furiganaIssues(text, label));
  }
  return issues;
}

// ---------------------------------------------------------------------------
// Grammar points
// ---------------------------------------------------------------------------

describe("grammar points", () => {
  it("have unique ids", () => {
    const ids = allGrammarPoints.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ids match /^n[45]\\.[a-z0-9-]+$/ and level matches the id prefix", () => {
    const idPattern = /^n[45]\.[a-z0-9-]+$/;
    for (const p of allGrammarPoints) {
      expect(p.id, `grammar point id "${p.id}"`).toMatch(idPattern);
      const expectedLevel = p.id.startsWith("n5.") ? "N5" : "N4";
      expect(p.level, `level of "${p.id}"`).toBe(expectedLevel);
    }
  });

  it("have at least 3 examples each", () => {
    for (const p of allGrammarPoints) {
      expect(p.examples.length, `examples for "${p.id}"`).toBeGreaterThanOrEqual(3);
    }
  });

  it("related ids (if present) resolve to real grammar points", () => {
    for (const p of allGrammarPoints) {
      for (const relatedId of p.related ?? []) {
        expect(grammarPointById.has(relatedId), `"${p.id}".related -> "${relatedId}"`).toBe(true);
      }
    }
  });

  // Note: `title` and `formation` are free-form display/gloss text (see the
  // doc comment on GrammarPoint in content/types.ts, whose own example mixes
  // English words with bare Japanese) and may use "[placeholder]" notation
  // for grammatical roles — they are intentionally NOT part of the strict
  // furigana contract. `examples[].ja` IS full sentence content and must be
  // well-formed.
  it("have well-formed furigana in examples", () => {
    const issues: string[] = [];
    for (const p of allGrammarPoints) {
      p.examples.forEach((ex, i) => {
        issues.push(...furiganaIssues(ex.ja, `${p.id}.examples[${i}].ja`));
      });
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Exercises
// ---------------------------------------------------------------------------

function exercisesForPoint(pointId: string): Exercise[] {
  return allExercises.filter((ex) => ex.grammarPointId === pointId);
}

describe("exercises", () => {
  it("have unique ids", () => {
    const ids = allExercises.map((ex) => ex.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every grammarPointId resolves to a real grammar point", () => {
    for (const ex of allExercises) {
      expect(grammarPointById.has(ex.grammarPointId), `exercise "${ex.id}" -> "${ex.grammarPointId}"`).toBe(true);
    }
  });

  it("every grammar point has at least 4 bank exercises", () => {
    for (const p of allGrammarPoints) {
      const bank = exercisesForPoint(p.id).filter((ex) => ex.source === "bank");
      expect(bank.length, `bank exercises for "${p.id}"`).toBeGreaterThanOrEqual(4);
    }
  });

  it("translation exercises have at least one accepted answer", () => {
    for (const ex of allExercises) {
      if (ex.kind === "translation") {
        expect(ex.accepted.length, `accepted for "${ex.id}"`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("cloze exercises have exactly one ＿＿ gap and at least one accepted filler", () => {
    for (const ex of allExercises) {
      if (ex.kind === "cloze") {
        const gapCount = (ex.sentence.match(/＿＿/g) ?? []).length;
        expect(gapCount, `gap count for "${ex.id}"`).toBe(1);
        expect(ex.accepted.length, `accepted for "${ex.id}"`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("mcq exercises have 4 unique choices and a valid correctIndex", () => {
    for (const ex of allExercises) {
      if (ex.kind === "mcq") {
        expect(ex.choices.length, `choices for "${ex.id}"`).toBe(4);
        expect(new Set(ex.choices).size, `unique choices for "${ex.id}"`).toBe(4);
        expect(ex.correctIndex, `correctIndex for "${ex.id}"`).toBeGreaterThanOrEqual(0);
        expect(ex.correctIndex, `correctIndex for "${ex.id}"`).toBeLessThan(4);
      }
    }
  });

  it("ordering exercises have 3-6 segments and a valid starIndex", () => {
    for (const ex of allExercises) {
      if (ex.kind === "ordering") {
        expect(ex.segments.length, `segments for "${ex.id}"`).toBeGreaterThanOrEqual(3);
        expect(ex.segments.length, `segments for "${ex.id}"`).toBeLessThanOrEqual(6);
        expect(ex.starIndex, `starIndex for "${ex.id}"`).toBeGreaterThanOrEqual(0);
        expect(ex.starIndex, `starIndex for "${ex.id}"`).toBeLessThan(ex.segments.length);
      }
    }
  });

  it("have well-formed furigana in every Japanese-bearing field", () => {
    const issues: string[] = [];
    for (const ex of allExercises) {
      const fields: Array<[string | undefined, string]> = [];
      switch (ex.kind) {
        case "translation":
          ex.accepted.forEach((a, i) => {
            fields.push([a, `${ex.id}.accepted[${i}]`]);
          });
          break;
        case "cloze":
          fields.push([ex.sentence, `${ex.id}.sentence`]);
          ex.accepted.forEach((a, i) => {
            fields.push([a, `${ex.id}.accepted[${i}]`]);
          });
          break;
        case "mcq":
          fields.push([ex.question, `${ex.id}.question`]);
          ex.choices.forEach((c, i) => {
            fields.push([c, `${ex.id}.choices[${i}]`]);
          });
          break;
        case "ordering":
          ex.segments.forEach((s, i) => {
            fields.push([s, `${ex.id}.segments[${i}]`]);
          });
          fields.push([ex.lead, `${ex.id}.lead`]);
          fields.push([ex.tail, `${ex.id}.tail`]);
          break;
      }
      issues.push(...collectFuriganaIssues(fields));
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Vocab
// ---------------------------------------------------------------------------

describe("vocab", () => {
  it("have unique ids", () => {
    const ids = allVocab.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("verbs carry a verbClass", () => {
    for (const v of allVocab) {
      if (v.pos === "verb") {
        expect(v.verbClass, `verbClass for "${v.id}"`).toBeDefined();
      }
    }
  });

  it("have no kanji left without a reading in `ja`", () => {
    const issues: string[] = [];
    for (const v of allVocab) {
      issues.push(...furiganaIssues(v.ja, `${v.id}.ja`));
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });

  it("verb `ja` ends in a plain (unbracketed) kana — okurigana convention", () => {
    for (const v of allVocab) {
      if (v.pos === "verb") {
        expect(v.ja.endsWith("]"), `verb "${v.id}" ja="${v.ja}" must not end inside a furigana bracket`).toBe(
          false
        );
      }
    }
  });

  it("na-adjectives are stored without a trailing な", () => {
    for (const v of allVocab) {
      if (v.pos === "na-adj") {
        expect(v.ja.endsWith("な"), `na-adj "${v.id}" ja="${v.ja}" should be the bare stem`).toBe(false);
      }
    }
  });

  function countByPos(pos: VocabEntry["pos"]): number {
    return allVocab.filter((v) => v.pos === pos).length;
  }

  it("has a reasonable spread of parts of speech", () => {
    expect(countByPos("verb")).toBeGreaterThanOrEqual(40);
    expect(countByPos("noun")).toBeGreaterThanOrEqual(40);
    expect(countByPos("i-adj")).toBeGreaterThanOrEqual(20);
    expect(countByPos("na-adj")).toBeGreaterThanOrEqual(20);
  });
});

// ---------------------------------------------------------------------------
// Templates (currently empty — must not crash on an empty array)
// ---------------------------------------------------------------------------

describe("templates", () => {
  it("every slot referenced in patternJa exists in slots", () => {
    const slotRefPattern = /\{([a-zA-Z0-9_]+)(?:\.[a-zA-Z0-9_]+)?\}/g;
    for (const tpl of allTemplates) {
      const refs = new Set<string>();
      const re = new RegExp(slotRefPattern.source, "g");
      let m = re.exec(tpl.patternJa);
      while (m !== null) {
        refs.add(m[1]);
        m = re.exec(tpl.patternJa);
      }
      for (const ref of refs) {
        expect(tpl.slots[ref], `template "${tpl.id}" references undefined slot "${ref}"`).toBeDefined();
      }
    }
  });

  it("templates producing cloze declare a gapSlot that exists in slots", () => {
    for (const tpl of allTemplates) {
      if (tpl.produces === "cloze") {
        expect(tpl.gapSlot, `template "${tpl.id}" produces cloze but has no gapSlot`).toBeDefined();
        if (tpl.gapSlot) {
          expect(tpl.slots[tpl.gapSlot], `template "${tpl.id}" gapSlot "${tpl.gapSlot}" not in slots`).toBeDefined();
        }
      }
    }
  });

  it("grammarPointId resolves to a real grammar point", () => {
    for (const tpl of allTemplates) {
      expect(grammarPointById.has(tpl.grammarPointId), `template "${tpl.id}" -> "${tpl.grammarPointId}"`).toBe(
        true
      );
    }
  });

  it("handles an empty template bank without error", () => {
    expect(Array.isArray(allTemplates)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Mock passages (currently empty — must not crash on an empty array)
// ---------------------------------------------------------------------------

describe("mock passages", () => {
  it("handles an empty passage bank without error", () => {
    expect(Array.isArray(allPassages)).toBe(true);
  });

  it("gap MCQs (if any) are individually valid", () => {
    for (const passage of allPassages) {
      for (const gap of passage.gaps) {
        expect(gap.choices.length, `${passage.id} gap "${gap.id}" choices`).toBe(4);
        expect(new Set(gap.choices).size, `${passage.id} gap "${gap.id}" unique choices`).toBe(4);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Sanity: this file itself covers a non-trivial amount of content.
// ---------------------------------------------------------------------------

describe("content volume sanity check", () => {
  it("has all 18 seed grammar points", () => {
    expect(allGrammarPoints.length).toBe(18);
  });

  it("has 7 bank exercises per seed grammar point (126 total)", () => {
    expect(allExercises.length).toBe(126);
  });
});

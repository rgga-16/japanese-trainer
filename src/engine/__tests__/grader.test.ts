import { describe, expect, it } from "vitest";
import { expandAccepted, gradeTyped, levenshtein, normalize } from "../grader";

describe("normalize", () => {
  const cases: [string, string, string][] = [
    ["full-width to half-width ASCII", "ａｂｃ", "abc"],
    ["half-width to full-width katakana", "ｶﾀｶﾅ", "カタカナ"],
    ["removes ASCII whitespace", "食 べ ます", "食べます"],
    ["removes full-width space (　)", "食　べ　ます", "食べます"],
    ["strips full-width period", "食べます。", "食べます"],
    ["strips full-width exclamation", "食べます！", "食べます"],
    ["strips full-width question mark", "食べます？", "食べます"],
    ["strips full-width comma anywhere", "食べる、飲む", "食べる飲む"],
    ["strips ASCII period", "tabemasu.", "tabemasu"],
    ["strips ASCII exclamation", "tabemasu!", "tabemasu"],
    ["strips ASCII question mark", "tabemasu?", "tabemasu"],
    ["strips ASCII comma", "a,b", "ab"],
  ];

  it.each(cases)("%s", (_label, input, expected) => {
    expect(normalize(input)).toBe(expected);
  });

  it("does not convert katakana to hiragana", () => {
    expect(normalize("タベマス")).toBe("タベマス");
  });
});

describe("expandAccepted", () => {
  it("expands to kanji-surface and all-kana forms, deduped", () => {
    expect(expandAccepted(["食[た]べます"])).toEqual(["食べます", "たべます"]);
  });

  it("dedupes when surface and kana forms are identical (no kanji)", () => {
    expect(expandAccepted(["たべます"])).toEqual(["たべます"]);
  });

  it("preserves order across multiple accepted answers", () => {
    expect(expandAccepted(["食[た]べる", "飲[の]む"])).toEqual([
      "食べる",
      "たべる",
      "飲む",
      "のむ",
    ]);
  });
});

describe("levenshtein", () => {
  it("returns 0 for identical strings", () => {
    expect(levenshtein("abc", "abc")).toBe(0);
  });

  it("returns length of the other string when one is empty", () => {
    expect(levenshtein("", "abc")).toBe(3);
    expect(levenshtein("abc", "")).toBe(3);
  });

  it("counts a single substitution", () => {
    expect(levenshtein("cat", "cot")).toBe(1);
  });

  it("counts insertions and deletions", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });
});

describe("gradeTyped", () => {
  it("accepts kanji-surface input", () => {
    const result = gradeTyped("食べます", ["食[た]べます"]);
    expect(result.correct).toBe(true);
    expect(result.matched).toBe("食べます");
    expect(result.closest).toBe("食べます");
  });

  it("accepts kana-variant input matching an authored kanji answer", () => {
    const result = gradeTyped("たべます", ["食[た]べます"]);
    expect(result.correct).toBe(true);
    expect(result.matched).toBe("たべます");
    expect(result.closest).toBe("食べます");
  });

  it("accepts input with punctuation and whitespace normalized away", () => {
    const result = gradeTyped("食べます。", ["食[た]べます"]);
    expect(result.correct).toBe(true);
  });

  it("rejects katakana input for a hiragana-only answer", () => {
    const result = gradeTyped("タベマス", ["たべます"]);
    expect(result.correct).toBe(false);
  });

  it("returns the nearest accepted surface as `closest` on a wrong answer", () => {
    const result = gradeTyped("食べません", ["食[た]べます", "飲[の]みます"]);
    expect(result.correct).toBe(false);
    expect(result.closest).toBe("食べます");
    expect(result.matched).toBeUndefined();
  });

  it("sets matched only when correct", () => {
    const wrong = gradeTyped("xyz", ["食[た]べます"]);
    expect(wrong.matched).toBeUndefined();

    const right = gradeTyped("食べます", ["食[た]べます"]);
    expect(right.matched).toBe("食べます");
  });
});

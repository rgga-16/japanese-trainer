// Regression test for the vocab 表記 (orthography) furigana leak: all 12
// `style: "orthography"` items author furigana on EVERY choice (the prompt
// states the target word in bare kana; the choices are candidate kanji
// spellings with their own readings — see src/content/vocabq/batch1.ts). If
// the renderer applies one computed furigana mode to both the prompt AND the
// choices, the default mode "always" prints each choice's reading and the
// learner can eliminate distractors without any kanji knowledge.
//
// `furiganaModeFor` (prompt mode) and `choiceFuriganaModeFor` (choice mode)
// in ../MockTest must diverge for "orthography": the prompt keeps the user's
// base setting (it's already bare kana), while the choices are forced
// "hidden" regardless of base.
//
// Driven by the real content bank, not hand-written fixtures, so a future
// content batch can't silently break the invariant this test protects.

import { describe, expect, it } from "vitest";
import { allVocabQuestions } from "../../content";
import type { VocabQuestion } from "../../content/types";
import { choiceFuriganaModeFor, furiganaModeFor } from "../MockTest";

function vocabItem(question: VocabQuestion) {
  return { section: "vocab" as const, question };
}

describe("mock furigana mode helpers", () => {
  const orthographyQuestions = allVocabQuestions.filter((q) => q.style === "orthography");
  const readingQuestions = allVocabQuestions.filter((q) => q.style === "reading");
  const contextQuestions = allVocabQuestions.filter((q) => q.style === "context");
  const paraphraseQuestions = allVocabQuestions.filter((q) => q.style === "paraphrase");

  it("orthography bank is non-empty (otherwise this suite would pass vacuously)", () => {
    expect(orthographyQuestions.length).toBeGreaterThan(0);
  });

  it('choiceFuriganaModeFor forces "hidden" for style "reading" and "orthography", for any base', () => {
    for (const q of [...readingQuestions, ...orthographyQuestions]) {
      const item = vocabItem(q);
      expect(choiceFuriganaModeFor(item, "always"), `${q.id} base "always"`).toBe("hidden");
      expect(choiceFuriganaModeFor(item, "hover"), `${q.id} base "hover"`).toBe("hidden");
    }
  });

  it('choiceFuriganaModeFor passes `base` through unchanged for style "context" and "paraphrase"', () => {
    for (const q of [...contextQuestions, ...paraphraseQuestions]) {
      const item = vocabItem(q);
      expect(choiceFuriganaModeFor(item, "always"), `${q.id} base "always"`).toBe("always");
      expect(choiceFuriganaModeFor(item, "hover"), `${q.id} base "hover"`).toBe("hover");
      expect(choiceFuriganaModeFor(item, "hidden"), `${q.id} base "hidden"`).toBe("hidden");
    }
  });

  it('furiganaModeFor (prompt mode) forces "hidden" for style "reading" but keeps `base` for "orthography"', () => {
    for (const q of readingQuestions) {
      const item = vocabItem(q);
      expect(furiganaModeFor(item, "always"), `${q.id} base "always"`).toBe("hidden");
      expect(furiganaModeFor(item, "hover"), `${q.id} base "hover"`).toBe("hidden");
    }
    for (const q of orthographyQuestions) {
      const item = vocabItem(q);
      expect(furiganaModeFor(item, "always"), `${q.id} base "always"`).toBe("always");
      expect(furiganaModeFor(item, "hover"), `${q.id} base "hover"`).toBe("hover");
    }
  });
});

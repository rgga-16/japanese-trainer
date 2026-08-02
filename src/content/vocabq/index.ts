// Vocabulary questions (文字・語彙). Standalone bank — vocab items don't belong
// to a grammar point, so these are not `Exercise`s. See CONTENT_GUIDE.md.

import type { VocabQuestion } from "../types";
import { vocabQuestionsBatch1 } from "./batch1";

export const allVocabQuestions: VocabQuestion[] = [...vocabQuestionsBatch1];

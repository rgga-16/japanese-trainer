// Reading comprehension passages (読解). Deliberately NOT part of `allExercises`
// — see the ReadingPassage doc comment in ../types.ts and CONTENT_GUIDE.md.
//
// Every passage must carry EXACTLY 3 questions: the mock's 読解 section sizes
// itself by passage count, so variable-length passages would break the Full
// format's question total.

import type { ReadingPassage } from "../types";
import { readingBatch1 } from "./batch1";

export const allReadingPassages: ReadingPassage[] = [...readingBatch1];

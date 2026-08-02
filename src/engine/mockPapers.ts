// Named preset mock papers ("模試1".."模試6"): fixed (seed, format) pairs so
// a learner can retake "the same test" and compare scores over time.
//
// These are only as stable as the content bank they draw from — landing a new
// content batch (more exercises per grammar point, more passages) can change
// which items a given seed resolves to, even though `buildMockTest` itself is
// deterministic for a fixed bank. That's why `MockResult.contentRevision`
// exists (see src/state/types.ts): it stamps `CONTENT_REVISION` at attempt
// time so the results history can flag a preset paper whose questions have
// since drifted, rather than silently comparing two different tests.

import type { MockFormatId, MockTestPlan } from "./mockBuilder";
import { buildMockTest } from "./mockBuilder";

export interface MockPaper {
  id: string;
  label: string;
  formatId: MockFormatId;
  /** Literal, fixed — never derived at runtime — so a paper is stable across sessions. */
  seed: number;
}

export const MOCK_PAPERS: MockPaper[] = [
  { id: "paper.1", label: "模試1", formatId: "standard", seed: 1001 },
  { id: "paper.2", label: "模試2", formatId: "standard", seed: 2002 },
  { id: "paper.3", label: "模試3", formatId: "short", seed: 3003 },
  { id: "paper.4", label: "模試4", formatId: "full", seed: 4004 },
  { id: "paper.5", label: "模試5", formatId: "full", seed: 5005 },
  { id: "paper.6", label: "模試6", formatId: "full", seed: 6006 },
];

/** Build a named preset paper's plan; identical to `buildMockTest` plus `paperId`. */
export function buildMockPaper(paper: MockPaper): MockTestPlan {
  const plan = buildMockTest(paper.seed, paper.formatId);
  return { ...plan, paperId: paper.id };
}

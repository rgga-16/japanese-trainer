// Named preset mock papers ("N4 模試1".."N4 模試6" and "N5 模試1".."N5 模試6"): fixed (seed, format) pairs so
// a learner can retake "the same test" and compare scores over time.
//
// These are only as stable as the content bank they draw from — landing a new
// content batch (more exercises per grammar point, more passages) can change
// which items a given seed resolves to, even though `buildMockTest` itself is
// deterministic for a fixed bank. That's why `MockResult.contentRevision`
// exists (see src/state/types.ts): it stamps `CONTENT_REVISION` at attempt
// time so the results history can flag a preset paper whose questions have
// since drifted, rather than silently comparing two different tests.

import type { MockFormatId, MockLevel, MockTestPlan } from "./mockBuilder";
import { buildMockTest } from "./mockBuilder";

export interface MockPaper {
  id: string;
  label: string;
  level: MockLevel;
  formatId: MockFormatId;
  /** Literal, fixed — never derived at runtime — so a paper is stable across sessions. */
  seed: number;
}

export const MOCK_PAPERS: MockPaper[] = [
  { id: "paper.1", label: "N4 模試1", level: "N4", formatId: "standard", seed: 1001 },
  { id: "paper.2", label: "N4 模試2", level: "N4", formatId: "standard", seed: 2002 },
  { id: "paper.3", label: "N4 模試3", level: "N4", formatId: "short", seed: 3003 },
  { id: "paper.4", label: "N4 模試4", level: "N4", formatId: "full", seed: 4004 },
  { id: "paper.5", label: "N4 模試5", level: "N4", formatId: "full", seed: 5005 },
  { id: "paper.6", label: "N4 模試6", level: "N4", formatId: "full", seed: 6006 },
  { id: "paper.n5.1", label: "N5 模試1", level: "N5", formatId: "standard", seed: 15001 },
  { id: "paper.n5.2", label: "N5 模試2", level: "N5", formatId: "standard", seed: 25002 },
  { id: "paper.n5.3", label: "N5 模試3", level: "N5", formatId: "short", seed: 35003 },
  { id: "paper.n5.4", label: "N5 模試4", level: "N5", formatId: "full", seed: 45004 },
  { id: "paper.n5.5", label: "N5 模試5", level: "N5", formatId: "full", seed: 55005 },
  { id: "paper.n5.6", label: "N5 模試6", level: "N5", formatId: "full", seed: 65006 },
];

/** Build a named preset paper's plan; identical to `buildMockTest` plus `paperId`. */
export function buildMockPaper(paper: MockPaper): MockTestPlan {
  const plan = buildMockTest(paper.seed, paper.formatId, paper.level);
  return { ...plan, paperId: paper.id };
}

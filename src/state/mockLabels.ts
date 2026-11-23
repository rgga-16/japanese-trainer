// Shared display helpers for stored mock attempts (MockResults + Dashboard).

import { MOCK_FORMATS, type MockFormatId, type MockLevel } from "../engine/mockBuilder";
import { MOCK_PAPERS } from "../engine/mockPapers";
import type { MockResult } from "./types";

function isMockFormatId(id: string): id is MockFormatId {
  return id === "short" || id === "standard" || id === "full";
}

/** Records saved before N5 mocks existed have no `level` and were all N4. */
export function mockResultLevel(r: MockResult): MockLevel {
  return r.level === "N5" ? "N5" : "N4";
}

/**
 * Attempt label without the level prefix: a paper's label already carries its
 * level ("N5 模試1"), a plain format is "Standard", "—" for pre-v2 records.
 */
export function mockFormatLabel(r: MockResult): string {
  if (r.paperId) {
    const paper = MOCK_PAPERS.find((p) => p.id === r.paperId);
    if (paper) return paper.label;
  }
  if (r.formatId && isMockFormatId(r.formatId)) {
    return MOCK_FORMATS[r.formatId].label;
  }
  return "—";
}

/** "N5 · Standard" for plain formats, "N4 模試1" for papers, "—" when unknown. */
export function mockAttemptLabel(r: MockResult): string {
  const label = mockFormatLabel(r);
  if (label === "—") return label;
  const paper = r.paperId ? MOCK_PAPERS.find((p) => p.id === r.paperId) : undefined;
  return paper ? label : `${mockResultLevel(r)} · ${label}`;
}

// Leitner-box spaced-repetition scheduler. All date math is pure
// string-in/string-out over ISO "YYYY-MM-DD" dates, using Date.UTC
// internally so results are not affected by the host's timezone offset.

import type { SrsState } from "../state/types";

export const BOX_INTERVALS_DAYS = [0, 1, 3, 7, 14, 30, 60] as const;
export const MASTERED_BOX = 5;

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/** "2026-07-20" — local calendar date. */
export function todayIso(now: Date = new Date()): string {
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

/** Add (or subtract) whole days to an ISO date string, UTC-safe. */
export function addDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const ms = Date.UTC(year, month - 1, day) + days * 86400000;
  const d = new Date(ms);
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

export function introducePoint(grammarPointId: string, today: string): SrsState {
  return {
    grammarPointId,
    box: 0,
    due: addDays(today, 1),
    lastResult: null,
    correctTotal: 0,
    incorrectTotal: 0,
    introducedAt: today,
  };
}

/** Pure: returns a new SrsState reflecting the result of a study session. */
export function applySessionResult(
  s: SrsState,
  correct: number,
  total: number,
  today: string
): SrsState {
  const pass = total > 0 && correct / total >= 2 / 3;
  const box = pass ? Math.min(s.box + 1, 6) : Math.max(0, s.box - 2);
  const due = pass ? addDays(today, BOX_INTERVALS_DAYS[box]) : addDays(today, 1);

  return {
    ...s,
    box,
    due,
    lastResult: pass ? "pass" : "fail",
    correctTotal: s.correctTotal + correct,
    incorrectTotal: s.incorrectTotal + (total - correct),
  };
}

export function isDue(s: SrsState, today: string): boolean {
  return s.due <= today;
}

/** Due grammar-point ids, most overdue first (ties: lower box first). */
export function buildReviewQueue(
  states: SrsState[],
  today: string,
  cap = 15
): string[] {
  return states
    .filter((s) => isDue(s, today))
    .sort((a, b) => {
      const dueDiff = a.due.localeCompare(b.due);
      return dueDiff !== 0 ? dueDiff : a.box - b.box;
    })
    .slice(0, cap)
    .map((s) => s.grammarPointId);
}

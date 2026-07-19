import { describe, expect, it } from "vitest";
import type { SrsState } from "../../state/types";
import {
  addDays,
  applySessionResult,
  buildReviewQueue,
  BOX_INTERVALS_DAYS,
  introducePoint,
  isDue,
  todayIso,
} from "../srs";

function makeState(overrides: Partial<SrsState> = {}): SrsState {
  return {
    grammarPointId: "gp-1",
    box: 2,
    due: "2026-07-20",
    lastResult: null,
    correctTotal: 0,
    incorrectTotal: 0,
    introducedAt: "2026-07-01",
    ...overrides,
  };
}

describe("todayIso", () => {
  it("formats a Date as local YYYY-MM-DD", () => {
    const d = new Date(2026, 6, 20); // July 20 2026, local time, month is 0-indexed
    expect(todayIso(d)).toBe("2026-07-20");
  });

  it("zero-pads single-digit months and days", () => {
    const d = new Date(2026, 0, 5); // Jan 5 2026
    expect(todayIso(d)).toBe("2026-01-05");
  });
});

describe("addDays", () => {
  it("adds days within the same month", () => {
    expect(addDays("2026-07-20", 3)).toBe("2026-07-23");
  });

  it("crosses a month boundary", () => {
    expect(addDays("2026-07-30", 3)).toBe("2026-08-02");
  });

  it("crosses a year boundary", () => {
    expect(addDays("2026-12-30", 3)).toBe("2027-01-02");
  });

  it("handles zero days (no-op)", () => {
    expect(addDays("2026-07-20", 0)).toBe("2026-07-20");
  });

  it("handles leap-year February correctly", () => {
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
  });
});

describe("introducePoint", () => {
  it("creates a fresh box-0 entry due tomorrow", () => {
    const s = introducePoint("gp-negation", "2026-07-20");
    expect(s).toEqual({
      grammarPointId: "gp-negation",
      box: 0,
      due: "2026-07-21",
      lastResult: null,
      correctTotal: 0,
      incorrectTotal: 0,
      introducedAt: "2026-07-20",
    });
  });
});

describe("applySessionResult", () => {
  it("passing climbs one box and sets due = today + interval for the new box", () => {
    const s = makeState({ box: 2 });
    const result = applySessionResult(s, 3, 3, "2026-07-20");
    expect(result.box).toBe(3);
    expect(result.due).toBe(addDays("2026-07-20", BOX_INTERVALS_DAYS[3]));
    expect(result.due).toBe("2026-07-27");
    expect(result.lastResult).toBe("pass");
  });

  it("passing at box 6 stays at box 6", () => {
    const s = makeState({ box: 6 });
    const result = applySessionResult(s, 3, 3, "2026-07-20");
    expect(result.box).toBe(6);
    expect(result.due).toBe(addDays("2026-07-20", BOX_INTERVALS_DAYS[6]));
  });

  it("failing at box 5 drops to box 3, due tomorrow", () => {
    const s = makeState({ box: 5 });
    const result = applySessionResult(s, 0, 3, "2026-07-20");
    expect(result.box).toBe(3);
    expect(result.due).toBe("2026-07-21");
    expect(result.lastResult).toBe("fail");
  });

  it("failing at box 1 floors at box 0", () => {
    const s = makeState({ box: 1 });
    const result = applySessionResult(s, 0, 3, "2026-07-20");
    expect(result.box).toBe(0);
    expect(result.due).toBe("2026-07-21");
  });

  it("2-of-3 correct counts as a pass", () => {
    const s = makeState({ box: 2 });
    const result = applySessionResult(s, 2, 3, "2026-07-20");
    expect(result.lastResult).toBe("pass");
    expect(result.box).toBe(3);
  });

  it("1-of-3 correct counts as a fail", () => {
    const s = makeState({ box: 2 });
    const result = applySessionResult(s, 1, 3, "2026-07-20");
    expect(result.lastResult).toBe("fail");
    expect(result.box).toBe(0);
  });

  it("accumulates correct/incorrect totals", () => {
    const s = makeState({ box: 2, correctTotal: 5, incorrectTotal: 2 });
    const result = applySessionResult(s, 2, 3, "2026-07-20");
    expect(result.correctTotal).toBe(7);
    expect(result.incorrectTotal).toBe(3);
  });

  it("is pure: does not mutate the input state", () => {
    const s = makeState({ box: 2 });
    const snapshot = { ...s };
    applySessionResult(s, 3, 3, "2026-07-20");
    expect(s).toEqual(snapshot);
  });
});

describe("isDue", () => {
  it("is due when due date is today", () => {
    expect(isDue(makeState({ due: "2026-07-20" }), "2026-07-20")).toBe(true);
  });

  it("is due when due date is in the past", () => {
    expect(isDue(makeState({ due: "2026-07-10" }), "2026-07-20")).toBe(true);
  });

  it("is not due when due date is in the future", () => {
    expect(isDue(makeState({ due: "2026-07-21" }), "2026-07-20")).toBe(false);
  });
});

describe("buildReviewQueue", () => {
  const today = "2026-07-20";

  it("filters out points that are not yet due", () => {
    const states = [
      makeState({ grammarPointId: "future", due: "2026-07-21" }),
      makeState({ grammarPointId: "due-today", due: "2026-07-20" }),
    ];
    expect(buildReviewQueue(states, today)).toEqual(["due-today"]);
  });

  it("sorts most-overdue first", () => {
    const states = [
      makeState({ grammarPointId: "less-overdue", due: "2026-07-18", box: 2 }),
      makeState({ grammarPointId: "most-overdue", due: "2026-07-10", box: 2 }),
      makeState({ grammarPointId: "due-today", due: "2026-07-20", box: 2 }),
    ];
    expect(buildReviewQueue(states, today)).toEqual([
      "most-overdue",
      "less-overdue",
      "due-today",
    ]);
  });

  it("breaks ties on equal due date by lower box first", () => {
    const states = [
      makeState({ grammarPointId: "high-box", due: "2026-07-15", box: 4 }),
      makeState({ grammarPointId: "low-box", due: "2026-07-15", box: 1 }),
    ];
    expect(buildReviewQueue(states, today)).toEqual(["low-box", "high-box"]);
  });

  it("caps output at the given cap", () => {
    const states = Array.from({ length: 5 }, (_, i) =>
      makeState({ grammarPointId: `gp-${i}`, due: "2026-07-10", box: i })
    );
    expect(buildReviewQueue(states, today, 2)).toHaveLength(2);
  });

  it("defaults the cap to 15", () => {
    const states = Array.from({ length: 20 }, (_, i) =>
      makeState({ grammarPointId: `gp-${i}`, due: "2026-07-10", box: 0 })
    );
    expect(buildReviewQueue(states, today)).toHaveLength(15);
  });
});

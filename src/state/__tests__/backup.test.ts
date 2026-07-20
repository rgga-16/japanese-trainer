import { describe, expect, it } from "vitest";
import { shouldShowBackupReminder } from "../backup";
import { defaultStoredData } from "../types";
import type { StoredData } from "../types";

const NOW = new Date("2026-07-20T12:00:00.000Z");

function withProgress(data: StoredData): StoredData {
  return {
    ...data,
    srs: {
      "n4.foo": {
        grammarPointId: "n4.foo",
        box: 1,
        due: "2026-07-21",
        lastResult: null,
        correctTotal: 1,
        incorrectTotal: 0,
        introducedAt: "2026-07-10",
      },
    },
  };
}

describe("shouldShowBackupReminder", () => {
  it("is false with no progress at all", () => {
    expect(shouldShowBackupReminder(defaultStoredData(), NOW)).toBe(false);
  });

  it("is true with progress and no backup ever", () => {
    expect(
      shouldShowBackupReminder(withProgress(defaultStoredData()), NOW),
    ).toBe(true);
  });

  it("is false with progress and a recent backup", () => {
    const data = withProgress(defaultStoredData());
    data.settings.lastBackupAt = "2026-07-19T00:00:00.000Z";
    expect(shouldShowBackupReminder(data, NOW)).toBe(false);
  });

  it("is true with progress and a backup older than 14 days", () => {
    const data = withProgress(defaultStoredData());
    data.settings.lastBackupAt = "2026-07-01T00:00:00.000Z";
    expect(shouldShowBackupReminder(data, NOW)).toBe(true);
  });

  it("is false right after being dismissed, even if backup is stale", () => {
    const data = withProgress(defaultStoredData());
    data.settings.lastBackupAt = "2026-06-01T00:00:00.000Z";
    data.settings.backupRemindedAt = "2026-07-19T00:00:00.000Z";
    expect(shouldShowBackupReminder(data, NOW)).toBe(false);
  });

  it("is true again once the dismiss snooze has elapsed", () => {
    const data = withProgress(defaultStoredData());
    data.settings.lastBackupAt = "2026-06-01T00:00:00.000Z";
    data.settings.backupRemindedAt = "2026-06-15T00:00:00.000Z";
    expect(shouldShowBackupReminder(data, NOW)).toBe(true);
  });

  it("counts history entries as meaningful progress too", () => {
    const data = defaultStoredData();
    data.history = [
      {
        exerciseId: "e1",
        grammarPointId: "n4.foo",
        kind: "mcq",
        correct: true,
        at: "2026-07-19T00:00:00.000Z",
        mode: "practice",
      },
    ];
    expect(shouldShowBackupReminder(data, NOW)).toBe(true);
  });
});

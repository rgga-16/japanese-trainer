import { describe, expect, it } from "vitest";
import { parseStoredJson } from "../storage";

describe("parseStoredJson / withDefaults", () => {
  it("fills in defaults for a completely empty object", () => {
    const data = parseStoredJson("{}");
    expect(data.settings.furiganaMode).toBe("always");
    expect(data.settings.reviewCap).toBe(15);
    expect(data.settings.lastBackupAt).toBeUndefined();
    expect(data.settings.backupRemindedAt).toBeUndefined();
    expect(data.srs).toEqual({});
    expect(data.history).toEqual([]);
  });

  it("derives furiganaMode='always' from legacy showFurigana=true when furiganaMode is absent", () => {
    const data = parseStoredJson(
      JSON.stringify({ settings: { showFurigana: true } }),
    );
    expect(data.settings.furiganaMode).toBe("always");
  });

  it("derives furiganaMode='hidden' from legacy showFurigana=false when furiganaMode is absent", () => {
    const data = parseStoredJson(
      JSON.stringify({ settings: { showFurigana: false } }),
    );
    expect(data.settings.furiganaMode).toBe("hidden");
  });

  it("prefers an explicit furiganaMode over a legacy showFurigana value", () => {
    const data = parseStoredJson(
      JSON.stringify({
        settings: { showFurigana: false, furiganaMode: "hover" },
      }),
    );
    expect(data.settings.furiganaMode).toBe("hover");
  });

  it("preserves lastBackupAt/backupRemindedAt when present", () => {
    const data = parseStoredJson(
      JSON.stringify({
        settings: {
          lastBackupAt: "2026-07-01T00:00:00.000Z",
          backupRemindedAt: "2026-07-10T00:00:00.000Z",
        },
      }),
    );
    expect(data.settings.lastBackupAt).toBe("2026-07-01T00:00:00.000Z");
    expect(data.settings.backupRemindedAt).toBe("2026-07-10T00:00:00.000Z");
  });

  it("rejects non-object JSON", () => {
    expect(() => parseStoredJson("[1,2,3]")).toThrow();
    expect(() => parseStoredJson("null")).toThrow();
  });
});

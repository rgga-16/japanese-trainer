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

describe("migrations[1] (v1 -> v2 mockResults)", () => {
  it("renames perSection.cloze to perSection.passage", () => {
    const data = parseStoredJson(
      JSON.stringify({
        version: 1,
        mockResults: [
          {
            at: "2026-07-01T00:00:00.000Z",
            score: 20,
            max: 25,
            perSection: {
              completion: { correct: 8, total: 10 },
              ordering: { correct: 7, total: 10 },
              cloze: { correct: 3, total: 5 },
            },
            durationSec: 600,
            wrongQuestionIds: [],
          },
        ],
      }),
    );
    const perSection = data.mockResults[0].perSection as Record<
      string,
      unknown
    >;
    expect(perSection.passage).toEqual({ correct: 3, total: 5 });
    expect(perSection.cloze).toBeUndefined();
  });

  it("drops a section whose total is 0", () => {
    const data = parseStoredJson(
      JSON.stringify({
        version: 1,
        mockResults: [
          {
            at: "2026-07-01T00:00:00.000Z",
            score: 20,
            max: 25,
            perSection: {
              completion: { correct: 8, total: 10 },
              ordering: { correct: 0, total: 0 },
              cloze: { correct: 3, total: 5 },
            },
            durationSec: 600,
            wrongQuestionIds: [],
          },
        ],
      }),
    );
    const perSection = data.mockResults[0].perSection;
    expect(perSection.ordering).toBeUndefined();
    expect(perSection.completion).toEqual({ correct: 8, total: 10 });
  });

  it('backfills formatId to "standard" when max is 25', () => {
    const data = parseStoredJson(
      JSON.stringify({
        version: 1,
        mockResults: [
          {
            at: "2026-07-01T00:00:00.000Z",
            score: 20,
            max: 25,
            perSection: {},
            durationSec: 600,
            wrongQuestionIds: [],
          },
        ],
      }),
    );
    expect(data.mockResults[0].formatId).toBe("standard");
  });

  it("does not backfill formatId when max is not 25", () => {
    const data = parseStoredJson(
      JSON.stringify({
        version: 1,
        mockResults: [
          {
            at: "2026-07-01T00:00:00.000Z",
            score: 12,
            max: 15,
            perSection: {},
            durationSec: 400,
            wrongQuestionIds: [],
          },
        ],
      }),
    );
    expect(data.mockResults[0].formatId).toBeUndefined();
  });

  it("is idempotent: a record that already has passage (and no cloze) is left untouched", () => {
    const data = parseStoredJson(
      JSON.stringify({
        version: 1,
        mockResults: [
          {
            at: "2026-07-01T00:00:00.000Z",
            score: 20,
            max: 25,
            perSection: {
              completion: { correct: 8, total: 10 },
              ordering: { correct: 7, total: 10 },
              passage: { correct: 4, total: 5 },
            },
            durationSec: 600,
            wrongQuestionIds: [],
          },
        ],
      }),
    );
    expect(data.mockResults[0].perSection.passage).toEqual({
      correct: 4,
      total: 5,
    });
  });

  it("prefers an existing passage over cloze when both are present (rename never overwrites)", () => {
    const data = parseStoredJson(
      JSON.stringify({
        version: 1,
        mockResults: [
          {
            at: "2026-07-01T00:00:00.000Z",
            score: 20,
            max: 25,
            perSection: {
              passage: { correct: 4, total: 5 },
              cloze: { correct: 9, total: 9 },
            },
            durationSec: 600,
            wrongQuestionIds: [],
          },
        ],
      }),
    );
    const perSection = data.mockResults[0].perSection as Record<
      string,
      unknown
    >;
    expect(perSection.passage).toEqual({ correct: 4, total: 5 });
    expect(perSection.cloze).toBeUndefined();
  });

  it("migrates a v1 record with no mockResults key at all without throwing", () => {
    expect(() => parseStoredJson(JSON.stringify({ version: 1 }))).not.toThrow();
    const data = parseStoredJson(JSON.stringify({ version: 1 }));
    expect(data.mockResults).toEqual([]);
  });

  it("does not throw on malformed mockResults records", () => {
    const json = JSON.stringify({
      version: 1,
      mockResults: [
        "not an object",
        { at: "2026-07-01T00:00:00.000Z", score: 1, max: 25 }, // no perSection at all
        {
          at: "2026-07-01T00:00:00.000Z",
          score: 1,
          max: 25,
          perSection: "not an object",
        },
        {
          at: "2026-07-01T00:00:00.000Z",
          score: 1,
          max: 25,
          perSection: { completion: "not a section score" },
        },
        null,
      ],
    });
    expect(() => parseStoredJson(json)).not.toThrow();
    const data = parseStoredJson(json);
    // Every surviving record has a safe, object-shaped perSection.
    for (const result of data.mockResults) {
      expect(typeof result.perSection).toBe("object");
      expect(result.perSection).not.toBeNull();
      // Every other MockResult field is coerced to its declared type too, so a
      // non-object entry (the string, `null`) still comes back fully-shaped.
      expect(typeof result.at).toBe("string");
      expect(Number.isFinite(result.score)).toBe(true);
      expect(Number.isFinite(result.max)).toBe(true);
      expect(Number.isFinite(result.durationSec)).toBe(true);
      expect(Array.isArray(result.wrongQuestionIds)).toBe(true);
    }
    // This is the exact expression MockResults.tsx uses to sort attempts; it
    // must never throw even when records backfilled `at` to the same epoch.
    expect(() =>
      [...data.mockResults].sort((a, b) => b.at.localeCompare(a.at)),
    ).not.toThrow();
  });

  // `migrate()` now defaults an ABSENT `version` field to 1 (not
  // SCHEMA_VERSION) so a version-less blob — an imported file, hand-edited
  // JSON — runs migrations[1] just like a real v1 record would. Real v1
  // records always carry `version: 1` anyway, so this only changes behavior
  // for the case that most needs the migration: data with no version at all.
  it("runs migrations[1] on a version-less blob (defaults version to 1, not SCHEMA_VERSION)", () => {
    const data = parseStoredJson(
      JSON.stringify({
        mockResults: [
          {
            at: "2026-07-01T00:00:00.000Z",
            score: 20,
            max: 25,
            perSection: {
              cloze: { correct: 3, total: 5 },
            },
            durationSec: 600,
            wrongQuestionIds: [],
          },
        ],
      }),
    );
    const perSection = data.mockResults[0].perSection as Record<
      string,
      unknown
    >;
    expect(perSection.passage).toEqual({ correct: 3, total: 5 });
    expect(perSection.cloze).toBeUndefined();
  });

  it("is idempotent on a version-less blob that is already v2-shaped", () => {
    const data = parseStoredJson(
      JSON.stringify({
        mockResults: [
          {
            at: "2026-07-01T00:00:00.000Z",
            score: 20,
            max: 25,
            perSection: {
              completion: { correct: 8, total: 10 },
              ordering: { correct: 7, total: 10 },
              passage: { correct: 4, total: 5 },
            },
            durationSec: 600,
            wrongQuestionIds: [],
            formatId: "standard",
          },
        ],
      }),
    );
    const perSection = data.mockResults[0].perSection as Record<
      string,
      unknown
    >;
    expect(perSection.passage).toEqual({ correct: 4, total: 5 });
    expect(perSection.cloze).toBeUndefined();
    expect(perSection.completion).toEqual({ correct: 8, total: 10 });
    expect(perSection.ordering).toEqual({ correct: 7, total: 10 });
    expect(data.mockResults[0].formatId).toBe("standard");
  });
});

// localStorage persistence: single namespaced key, versioned with migrations.

import {
  DEFAULT_SETTINGS,
  defaultStoredData,
  SCHEMA_VERSION,
  type MockResult,
  type StoredData,
} from "./types";

export const STORAGE_KEY = "jlpt-n4-trainer";
export const HISTORY_CAP = 2000;

/** Migration from version N to N+1; add entries as SCHEMA_VERSION grows. */
type Migration = (data: Record<string, unknown>) => Record<string, unknown>;

/** Narrows untrusted JSON to a plain (non-null, non-array) object. */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Narrows an untrusted `perSection` entry to a valid `{correct, total}` shape. */
function isSectionScore(
  value: unknown,
): value is { correct: number; total: number } {
  return (
    isPlainObject(value) &&
    typeof value.correct === "number" &&
    typeof value.total === "number"
  );
}

const migrations: Record<number, Migration> = {
  // v1 -> v2: MockResult.perSection went open-keyed, and the "passage"
  // section (問題3) — stored under the misnomer `cloze` in v1 — was renamed.
  // v1 always wrote all three keys (completion/ordering/cloze) even when the
  // paper's format had no such section, so a zero-total section is noise
  // under v2's "only sections the paper contained are present" contract and
  // gets dropped. `formatId` is new in v2; "standard" (max === 25) was the
  // only format v1 ever produced, so it's the only safe backfill — anything
  // else is left absent rather than guessed.
  1: (data) => {
    if (!Array.isArray(data.mockResults)) return data;
    data.mockResults = data.mockResults.map((entry: unknown) => {
      if (!isPlainObject(entry)) return entry;
      const rawSection = isPlainObject(entry.perSection)
        ? entry.perSection
        : {};

      const perSection: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(rawSection)) {
        if (!isSectionScore(value) || value.total === 0) continue;
        perSection[key] = value;
      }
      if (perSection.cloze !== undefined) {
        if (perSection.passage === undefined) {
          perSection.passage = perSection.cloze;
        }
        delete perSection.cloze;
      }

      const result: Record<string, unknown> = { ...entry, perSection };
      if (result.formatId === undefined && result.max === 25) {
        result.formatId = "standard";
      }
      return result;
    });
    return data;
  },
};

function migrate(raw: Record<string, unknown>): Record<string, unknown> {
  let data = raw;
  // An absent/non-numeric `version` defaults to 1, not SCHEMA_VERSION, so a
  // version-less blob (an imported file, hand-edited JSON) still runs
  // migrations[1] instead of being stamped current and left un-migrated
  // forever. This is safe for data that's already v2-shaped: migrations[1]
  // is effectively idempotent there — v2 has no `cloze` key to rename, v2's
  // "only sections the paper contained" contract means there are no
  // zero-total sections left to drop, and the `formatId` backfill only
  // fires when it's absent AND `max === 25`. `save()` always writes
  // `version`, so no real stored blob is affected — only imports.
  let version = typeof data.version === "number" ? data.version : 1;
  while (version < SCHEMA_VERSION) {
    const step = migrations[version];
    if (!step) break;
    data = step(data);
    version += 1;
  }
  data.version = SCHEMA_VERSION;
  return data;
}

/** Fill any missing top-level fields so old/partial data can't crash the app. */
function withDefaults(raw: Record<string, unknown>): StoredData {
  const base = defaultStoredData();
  const data = { ...base, ...raw } as StoredData;
  data.stats = { ...base.stats, ...(raw.stats as object | undefined) };
  const rawSettings =
    (raw.settings as Record<string, unknown> | undefined) ?? {};
  data.settings = { ...DEFAULT_SETTINGS, ...rawSettings };
  // Legacy v1 data only had a boolean `showFurigana`; derive the new 3-way
  // mode from it when `furiganaMode` itself isn't present.
  if (
    rawSettings.furiganaMode === undefined &&
    typeof rawSettings.showFurigana === "boolean"
  ) {
    data.settings.furiganaMode = rawSettings.showFurigana ? "always" : "hidden";
  }
  data.history = Array.isArray(data.history) ? data.history : [];
  data.mockResults = Array.isArray(data.mockResults) ? data.mockResults : [];
  // Per-record hardening: a malformed/hand-edited record (or a non-object
  // entry entirely) must not crash a renderer that reads any MockResult
  // field directly — every field is coerced to its declared type, so the
  // result is guaranteed to be a fully-shaped MockResult, not just a record
  // with a safe `perSection`. This is a whitelist, not a spread: a NEW field
  // added to MockResult must be added here too, or it is dropped on load.
  data.mockResults = data.mockResults.map((entry: unknown): MockResult => {
    const rec = isPlainObject(entry) ? entry : {};
    const result: MockResult = {
      at: typeof rec.at === "string" ? rec.at : new Date(0).toISOString(),
      score: Number.isFinite(rec.score) ? (rec.score as number) : 0,
      max: Number.isFinite(rec.max) ? (rec.max as number) : 0,
      perSection: isPlainObject(rec.perSection)
        ? (rec.perSection as MockResult["perSection"])
        : {},
      durationSec: Number.isFinite(rec.durationSec)
        ? (rec.durationSec as number)
        : 0,
      wrongQuestionIds: Array.isArray(rec.wrongQuestionIds)
        ? (rec.wrongQuestionIds as string[])
        : [],
    };
    if (typeof rec.formatId === "string") result.formatId = rec.formatId;
    if (typeof rec.paperId === "string") result.paperId = rec.paperId;
    if (Number.isFinite(rec.contentRevision)) {
      result.contentRevision = rec.contentRevision as number;
    }
    return result;
  });
  return data;
}

export function parseStoredJson(json: string): StoredData {
  const parsed: unknown = JSON.parse(json);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Not a settings object");
  }
  return withDefaults(migrate(parsed as Record<string, unknown>));
}

export function load(): StoredData {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return defaultStoredData();
    return parseStoredJson(json);
  } catch {
    return defaultStoredData();
  }
}

/** Persists to localStorage; returns whether the write succeeded. */
export function save(data: StoredData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    // Storage full/unavailable — the session still works in memory.
    return false;
  }
}

export function clearStored(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportJson(data: StoredData): string {
  return JSON.stringify(data, null, 2);
}

// localStorage persistence: single namespaced key, versioned with migrations.

import {
  DEFAULT_SETTINGS,
  defaultStoredData,
  SCHEMA_VERSION,
  type StoredData,
} from "./types";

export const STORAGE_KEY = "jlpt-n4-trainer";
export const HISTORY_CAP = 2000;

/** Migration from version N to N+1; add entries as SCHEMA_VERSION grows. */
type Migration = (data: Record<string, unknown>) => Record<string, unknown>;
const migrations: Record<number, Migration> = {};

function migrate(raw: Record<string, unknown>): Record<string, unknown> {
  let data = raw;
  let version = typeof data.version === "number" ? data.version : SCHEMA_VERSION;
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
  data.settings = { ...DEFAULT_SETTINGS, ...(raw.settings as object | undefined) };
  data.history = Array.isArray(data.history) ? data.history : [];
  data.mockResults = Array.isArray(data.mockResults) ? data.mockResults : [];
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

export function save(data: StoredData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full/unavailable — the session still works in memory.
  }
}

export function clearStored(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportJson(data: StoredData): string {
  return JSON.stringify(data, null, 2);
}

// Shared runtime/persistence types. localStorage schema lives here so the
// engine (srs.ts), UI (SessionRunner), and storage all agree on shapes.

import type { Exercise } from "../content/types";

export type StudyMode = "practice" | "review" | "drill" | "mock" | "reading";

/**
 * Sentinel `grammarPointId`s for items that legitimately belong to no grammar
 * point (reading comprehension, 文字・語彙). Safe because every consumer looks
 * points up through `grammarPointById` and null-guards the miss, and real ids
 * always match /^n[45]\./ so these can never collide.
 */
export const META_READING_POINT_ID = "meta.reading";
export const META_VOCAB_POINT_ID = "meta.vocab";

export interface ExerciseResult {
  exerciseId: string;
  grammarPointId: string;
  /**
   * `Exercise["kind"]` widens automatically as content kinds are added; the
   * drill/reading/vocab members are hand-maintained. Widening is safe for
   * persisted data — this is a read-position union over existing strings.
   */
  kind:
    | Exercise["kind"]
    | "conjugation"
    | "particle"
    | "vocab-recall"
    | "transitivity"
    | "reading"
    | "vocab";
  correct: boolean;
  /** ISO datetime */
  at: string;
  mode: StudyMode;
}

export interface SrsState {
  grammarPointId: string;
  /** Leitner box 0–6; box >= 5 counts as "mastered". */
  box: number;
  /** ISO date "2026-07-21" */
  due: string;
  lastResult: "pass" | "fail" | null;
  correctTotal: number;
  incorrectTotal: number;
  /** ISO date the point was introduced (first practice completed). */
  introducedAt: string;
  /** Additive: true when the learner explicitly marked this point as already known. */
  testedOut?: boolean;
}

export interface MockSectionScore {
  correct: number;
  total: number;
}

/** Mock section identities. `passage` was called `cloze` in v1 — see migrations[1]. */
export type MockSectionKey =
  | "vocab"
  | "completion"
  | "ordering"
  | "passage"
  | "reading";

export interface MockResult {
  /** ISO datetime */
  at: string;
  score: number;
  max: number;
  /**
   * Open-keyed: only the sections the paper actually contained are present, so
   * every read MUST be optional (`perSection.passage?.correct ?? 0`).
   */
  perSection: Partial<Record<MockSectionKey, MockSectionScore>>;
  durationSec: number;
  wrongQuestionIds: string[];
  /** Additive; absent on pre-v2 records (backfilled to "standard" when max === 25). */
  formatId?: string;
  /** Set when the attempt was a named preset paper ("paper.1" … "paper.6"). */
  paperId?: string;
  /** CONTENT_REVISION at the time of the attempt; flags preset-paper drift. */
  contentRevision?: number;
}

export interface DrillStat {
  correct: number;
  wrong: number;
}

export type FuriganaMode = "always" | "hover" | "hidden";

export interface AppSettings {
  /** How furigana readings are displayed; replaces the legacy `showFurigana` boolean. */
  furiganaMode: FuriganaMode;
  /** Max grammar points per review session. */
  reviewCap: number;
  /** ISO datetime of the last successful "Export data" backup. */
  lastBackupAt?: string;
  /** ISO datetime the backup reminder banner was last dismissed (snoozes it). */
  backupRemindedAt?: string;
}

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  /** ISO date */
  lastActiveDate: string;
}

export interface StoredData {
  version: number;
  srs: Record<string, SrsState>;
  /** Ring buffer, newest last, capped at 2000. */
  history: ExerciseResult[];
  /**
   * Drill accuracy buckets. These raw keys ARE the schema — they carry no
   * version marker and there is no migration path, so existing conjugation
   * keys (`${verbClass}:${form}` for verbs, `${pos}:${form}` for adjectives,
   * e.g. "godan:te", "i-adj:past") must never be renamed. New drills are
   * namespaced instead: "particle:に", "vocab:ja-en", "transitivity:to-transitive".
   */
  drillStats: Record<string, DrillStat>;
  mockResults: MockResult[];
  stats: StreakStats;
  settings: AppSettings;
}

/** v2: MockResult.perSection went open-keyed and `cloze` was renamed `passage`. */
export const SCHEMA_VERSION = 2;

export const DEFAULT_SETTINGS: AppSettings = {
  furiganaMode: "always",
  reviewCap: 15,
};

export function defaultStoredData(): StoredData {
  return {
    version: SCHEMA_VERSION,
    srs: {},
    history: [],
    drillStats: {},
    mockResults: [],
    stats: { currentStreak: 0, longestStreak: 0, lastActiveDate: "" },
    settings: { ...DEFAULT_SETTINGS },
  };
}

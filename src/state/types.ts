// Shared runtime/persistence types. localStorage schema lives here so the
// engine (srs.ts), UI (SessionRunner), and storage all agree on shapes.

import type { Exercise } from "../content/types";

export type StudyMode = "practice" | "review" | "drill" | "mock";

export interface ExerciseResult {
  exerciseId: string;
  grammarPointId: string;
  kind: Exercise["kind"] | "conjugation";
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

export interface MockResult {
  /** ISO datetime */
  at: string;
  score: number;
  max: number;
  perSection: {
    completion: MockSectionScore;
    ordering: MockSectionScore;
    cloze: MockSectionScore;
  };
  durationSec: number;
  wrongQuestionIds: string[];
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
  /** Key: `${verbClass}:${form}` (or `adj:${form}` for adjectives). */
  drillStats: Record<string, DrillStat>;
  mockResults: MockResult[];
  stats: StreakStats;
  settings: AppSettings;
}

export const SCHEMA_VERSION = 1;

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

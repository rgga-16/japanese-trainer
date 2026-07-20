// App-wide persistent state. Every mutator produces a new StoredData,
// saves it synchronously (data is small), and bumps the activity streak.

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  addDays,
  applySessionResult,
  introducePoint,
  MASTERED_BOX,
  todayIso,
} from "../engine/srs";
import { clearStored, HISTORY_CAP, load, save } from "./storage";
import type {
  AppSettings,
  ExerciseResult,
  MockResult,
  StoredData,
  StreakStats,
} from "./types";
import { defaultStoredData } from "./types";

function bumpStreak(stats: StreakStats, today: string): StreakStats {
  if (stats.lastActiveDate === today) return stats;
  const current =
    stats.lastActiveDate === addDays(today, -1) ? stats.currentStreak + 1 : 1;
  return {
    currentStreak: current,
    longestStreak: Math.max(stats.longestStreak, current),
    lastActiveDate: today,
  };
}

export interface AppState {
  data: StoredData;
  /** ISO datetime of the last successful save, or null before the first commit. */
  lastSavedAt: string | null;
  /** Append graded results to history (any mode) and touch the streak. */
  recordResults: (results: ExerciseResult[]) => void;
  /** Create SRS state for a point if absent (first practice completed). */
  introduce: (grammarPointId: string) => void;
  /** Apply a scheduled review outcome to a point's Leitner box. */
  completeReview: (
    grammarPointId: string,
    correct: number,
    total: number,
  ) => void;
  recordDrill: (statKey: string, correct: boolean) => void;
  recordMock: (result: MockResult) => void;
  updateSettings: (partial: Partial<AppSettings>) => void;
  /** Mark a grammar point as already known: mastered box, far-future due date. */
  markKnown: (grammarPointId: string) => void;
  /** Delete a grammar point's SRS state entirely (re-enters as unstudied). */
  resetPoint: (grammarPointId: string) => void;
  /** Replace everything (import). */
  replaceData: (data: StoredData) => void;
  resetAll: () => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoredData>(load);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const commit = useCallback(
    (updater: (prev: StoredData, today: string) => StoredData) => {
      setData((prev) => {
        const next = updater(prev, todayIso());
        if (save(next)) setLastSavedAt(new Date().toISOString());
        return next;
      });
    },
    [],
  );

  const recordResults = useCallback(
    (results: ExerciseResult[]) => {
      if (results.length === 0) return;
      commit((prev, today) => ({
        ...prev,
        history: [...prev.history, ...results].slice(-HISTORY_CAP),
        stats: bumpStreak(prev.stats, today),
      }));
    },
    [commit],
  );

  const introduce = useCallback(
    (grammarPointId: string) => {
      commit((prev, today) =>
        prev.srs[grammarPointId]
          ? prev
          : {
              ...prev,
              srs: {
                ...prev.srs,
                [grammarPointId]: introducePoint(grammarPointId, today),
              },
            },
      );
    },
    [commit],
  );

  const completeReview = useCallback(
    (grammarPointId: string, correct: number, total: number) => {
      commit((prev, today) => {
        const s = prev.srs[grammarPointId];
        if (!s) return prev;
        return {
          ...prev,
          srs: {
            ...prev.srs,
            [grammarPointId]: applySessionResult(s, correct, total, today),
          },
          stats: bumpStreak(prev.stats, today),
        };
      });
    },
    [commit],
  );

  const recordDrill = useCallback(
    (statKey: string, correct: boolean) => {
      commit((prev, today) => {
        const stat = prev.drillStats[statKey] ?? { correct: 0, wrong: 0 };
        return {
          ...prev,
          drillStats: {
            ...prev.drillStats,
            [statKey]: {
              correct: stat.correct + (correct ? 1 : 0),
              wrong: stat.wrong + (correct ? 0 : 1),
            },
          },
          stats: bumpStreak(prev.stats, today),
        };
      });
    },
    [commit],
  );

  const recordMock = useCallback(
    (result: MockResult) => {
      commit((prev, today) => ({
        ...prev,
        mockResults: [...prev.mockResults, result],
        stats: bumpStreak(prev.stats, today),
      }));
    },
    [commit],
  );

  const updateSettings = useCallback(
    (partial: Partial<AppSettings>) => {
      commit((prev) => ({
        ...prev,
        settings: { ...prev.settings, ...partial },
      }));
    },
    [commit],
  );

  const markKnown = useCallback(
    (grammarPointId: string) => {
      commit((prev, today) => {
        const existing = prev.srs[grammarPointId];
        return {
          ...prev,
          srs: {
            ...prev.srs,
            [grammarPointId]: {
              grammarPointId,
              box: MASTERED_BOX,
              // Far enough out that it never re-enters buildReviewQueue.
              due: addDays(today, 3650),
              lastResult: existing?.lastResult ?? null,
              correctTotal: existing?.correctTotal ?? 0,
              incorrectTotal: existing?.incorrectTotal ?? 0,
              introducedAt: existing?.introducedAt ?? today,
              testedOut: true,
            },
          },
        };
      });
    },
    [commit],
  );

  const resetPoint = useCallback(
    (grammarPointId: string) => {
      commit((prev) => {
        if (!(grammarPointId in prev.srs)) return prev;
        const srs = { ...prev.srs };
        delete srs[grammarPointId];
        return { ...prev, srs };
      });
    },
    [commit],
  );

  const replaceData = useCallback((next: StoredData) => {
    if (save(next)) setLastSavedAt(new Date().toISOString());
    setData(next);
  }, []);

  const resetAll = useCallback(() => {
    clearStored();
    setData(defaultStoredData());
    setLastSavedAt(null);
  }, []);

  const value = useMemo(
    () => ({
      data,
      lastSavedAt,
      recordResults,
      introduce,
      completeReview,
      recordDrill,
      recordMock,
      updateSettings,
      markKnown,
      resetPoint,
      replaceData,
      resetAll,
    }),
    [
      data,
      lastSavedAt,
      recordResults,
      introduce,
      completeReview,
      recordDrill,
      recordMock,
      updateSettings,
      markKnown,
      resetPoint,
      replaceData,
      resetAll,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}

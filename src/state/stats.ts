// Derived statistics — computed from history/srs/mockResults, never stored.

import { allGrammarPoints, grammarPointById } from "../content";
import type { StoredData } from "./types";

export interface PointAccuracy {
  grammarPointId: string;
  attempts: number;
  correct: number;
  accuracy: number; // 0..1
}

export function accuracyByPoint(data: StoredData): Map<string, PointAccuracy> {
  const map = new Map<string, PointAccuracy>();
  for (const r of data.history) {
    let entry = map.get(r.grammarPointId);
    if (!entry) {
      entry = { grammarPointId: r.grammarPointId, attempts: 0, correct: 0, accuracy: 0 };
      map.set(r.grammarPointId, entry);
    }
    entry.attempts += 1;
    if (r.correct) entry.correct += 1;
  }
  for (const entry of map.values()) {
    entry.accuracy = entry.attempts > 0 ? entry.correct / entry.attempts : 0;
  }
  return map;
}

/** Lowest-accuracy points with at least `minAttempts` answers. */
export function weakestPoints(
  data: StoredData,
  minAttempts = 5,
  n = 5,
): PointAccuracy[] {
  return [...accuracyByPoint(data).values()]
    .filter((p) => p.attempts >= minAttempts && grammarPointById.has(p.grammarPointId))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, n);
}

/**
 * N4-readiness estimate in [0, 1] — grammar section only.
 * Blend: 0.5 × share of N4 points at box ≥ 3, 0.3 × rolling accuracy over the
 * last 100 N4-point answers, 0.2 × best mock score of the last 5. Components
 * with no data yet are dropped and the weights renormalized.
 */
export function readiness(data: StoredData): number {
  const n4Ids = allGrammarPoints.filter((p) => p.level === "N4").map((p) => p.id);

  const parts: Array<{ weight: number; value: number } | null> = [];

  if (n4Ids.length > 0) {
    const solid = n4Ids.filter((id) => (data.srs[id]?.box ?? 0) >= 3).length;
    parts.push({ weight: 0.5, value: solid / n4Ids.length });
  }

  const n4Set = new Set(n4Ids);
  const recentN4 = data.history.filter((r) => n4Set.has(r.grammarPointId)).slice(-100);
  parts.push(
    recentN4.length > 0
      ? {
          weight: 0.3,
          value: recentN4.filter((r) => r.correct).length / recentN4.length,
        }
      : null,
  );

  const recentMocks = data.mockResults.slice(-5);
  parts.push(
    recentMocks.length > 0
      ? {
          weight: 0.2,
          value: Math.max(...recentMocks.map((m) => (m.max > 0 ? m.score / m.max : 0))),
        }
      : null,
  );

  const present = parts.filter((p): p is { weight: number; value: number } => p !== null);
  const totalWeight = present.reduce((sum, p) => sum + p.weight, 0);
  if (totalWeight === 0) return 0;
  return present.reduce((sum, p) => sum + p.weight * p.value, 0) / totalWeight;
}

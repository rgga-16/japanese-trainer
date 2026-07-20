import { useState } from "react";
import { Link } from "react-router-dom";
import SessionRunner, {
  type SessionOutcome,
} from "../components/SessionRunner";
import {
  clearQueueRecord,
  clearRunRecord,
  loadQueueRecord,
  saveQueueRecord,
} from "../components/sessionPersistence";
import type { Exercise } from "../content/types";
import { buildReviewExercises } from "../engine/queue";
import { mulberry32 } from "../engine/rng";
import { buildReviewQueue, todayIso } from "../engine/srs";
import { useAppState } from "../state/AppStateContext";

const REVIEW_SESSION_KEY = "review";

/** Basic shape check: a non-empty array is treated as a reusable queue. */
function isNonEmptyArray<T>(value: T[] | null): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

export default function ReviewSession() {
  const { data, recordResults, completeReview } = useAppState();

  // Reuse an in-progress review's exercise set if one was persisted — a
  // started review resumes with the same questions even if dueness has
  // since changed (e.g. time passed, other reviews completed elsewhere).
  const [exercises] = useState<Exercise[]>(() => {
    const stored = loadQueueRecord<Exercise[]>(REVIEW_SESSION_KEY);
    if (isNonEmptyArray(stored)) return stored;
    const dueIds = buildReviewQueue(
      Object.values(data.srs),
      todayIso(),
      data.settings.reviewCap,
    );
    const fresh = buildReviewExercises(dueIds, mulberry32(Date.now() >>> 0));
    if (fresh.length > 0) saveQueueRecord(REVIEW_SESSION_KEY, fresh);
    return fresh;
  });

  const [phase, setPhase] = useState<"active" | "done">("active");
  const [updatedCount, setUpdatedCount] = useState(0);

  if (exercises.length === 0) {
    return (
      <div className="card session-empty">
        <h1>No reviews due</h1>
        <p>
          You're all caught up. Come back later, or study a new grammar point.
        </p>
        <Link to="/lessons">Browse lessons</Link>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="card session-empty">
        <h1>Review complete</h1>
        <p>
          Review complete — {updatedCount} point{updatedCount === 1 ? "" : "s"}{" "}
          updated.
        </p>
        <Link to="/lessons">Browse lessons</Link>
      </div>
    );
  }

  function handleComplete(outcome: SessionOutcome) {
    recordResults(outcome.results);
    const byPoint = new Map<string, { correct: number; total: number }>();
    for (const r of outcome.results) {
      const stat = byPoint.get(r.grammarPointId) ?? { correct: 0, total: 0 };
      stat.total += 1;
      if (r.correct) stat.correct += 1;
      byPoint.set(r.grammarPointId, stat);
    }
    for (const [pointId, stat] of byPoint) {
      completeReview(pointId, stat.correct, stat.total);
    }
    clearQueueRecord(REVIEW_SESSION_KEY);
    clearRunRecord(REVIEW_SESSION_KEY);
    setUpdatedCount(byPoint.size);
    setPhase("done");
  }

  return (
    <SessionRunner
      exercises={exercises}
      mode="review"
      title="Review"
      onComplete={handleComplete}
      sessionKey={REVIEW_SESSION_KEY}
    />
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import SessionRunner, { type SessionOutcome } from "../components/SessionRunner";
import type { Exercise } from "../content/types";
import { buildReviewExercises } from "../engine/queue";
import { mulberry32 } from "../engine/rng";
import { buildReviewQueue, todayIso } from "../engine/srs";
import { useAppState } from "../state/AppStateContext";

export default function ReviewSession() {
  const { data, recordResults, completeReview } = useAppState();

  const [dueIds] = useState<string[]>(() =>
    buildReviewQueue(Object.values(data.srs), todayIso(), data.settings.reviewCap),
  );
  const [exercises] = useState<Exercise[]>(() =>
    buildReviewExercises(dueIds, mulberry32(Date.now() >>> 0)),
  );

  const [phase, setPhase] = useState<"active" | "done">("active");
  const [updatedCount, setUpdatedCount] = useState(0);

  if (dueIds.length === 0) {
    return (
      <div className="card session-empty">
        <h1>No reviews due</h1>
        <p>You're all caught up. Come back later, or study a new grammar point.</p>
        <Link to="/lessons">Browse lessons</Link>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="card session-empty">
        <h1>Review complete</h1>
        <p>
          Review complete — {updatedCount} point{updatedCount === 1 ? "" : "s"} updated.
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
    setUpdatedCount(byPoint.size);
    setPhase("done");
  }

  return <SessionRunner exercises={exercises} mode="review" title="Review" onComplete={handleComplete} />;
}

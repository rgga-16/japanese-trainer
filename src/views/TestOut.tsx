import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SessionRunner, {
  type SessionOutcome,
} from "../components/SessionRunner";
import {
  clearQueueRecord,
  clearRunRecord,
  loadQueueRecord,
  saveQueueRecord,
} from "../components/sessionPersistence";
import { grammarPointById } from "../content";
import type { Exercise } from "../content/types";
import { buildPracticeQueue } from "../engine/queue";
import { mulberry32 } from "../engine/rng";
import { useAppState } from "../state/AppStateContext";

const TESTOUT_SIZE = 6;
const TESTOUT_PASS_THRESHOLD = 5;

/** Basic shape check: a non-empty array is treated as a reusable queue. */
function isNonEmptyArray<T>(value: T[] | null): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

export default function TestOut() {
  const { id } = useParams<{ id: string }>();
  const { markKnown } = useAppState();

  const point = id ? grammarPointById.get(id) : undefined;
  const sessionKey = point ? `testout:${point.id}` : undefined;

  const [exercises] = useState<Exercise[]>(() => {
    if (!point) return [];
    if (sessionKey) {
      const stored = loadQueueRecord<Exercise[]>(sessionKey);
      if (isNonEmptyArray(stored)) return stored;
    }
    const fresh = buildPracticeQueue(
      point.id,
      TESTOUT_SIZE,
      mulberry32(Date.now() >>> 0),
    );
    if (sessionKey) saveQueueRecord(sessionKey, fresh);
    return fresh;
  });

  const [phase, setPhase] = useState<"active" | "passed" | "failed">("active");
  const [correctCount, setCorrectCount] = useState(0);

  if (!point) {
    return (
      <div className="card session-empty">
        <h1>Grammar point not found</h1>
        <p>We couldn't find "{id}". It may have been renamed or removed.</p>
        <Link to="/lessons">Back to lessons</Link>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="card session-empty">
        <h1>{point.title}</h1>
        <p>No practice exercises are available for this grammar point yet.</p>
        <Link to={`/lessons/${point.id}`}>Back to lesson</Link>
      </div>
    );
  }

  if (phase === "passed") {
    return (
      <div className="card session-empty">
        <h1>🎉 Mastered!</h1>
        <p>
          {point.title} is now marked as known — it's set to mastered and will
          be skipped in future reviews.
        </p>
        <Link
          to={`/lessons/${point.id}`}
          className="browse-btn browse-btn-primary"
        >
          Back to lesson
        </Link>
        <Link to="/lessons">Browse lessons</Link>
      </div>
    );
  }

  if (phase === "failed") {
    return (
      <div className="card session-empty">
        <h1>Not quite yet</h1>
        <p>
          {correctCount} / {exercises.length} correct — keep studying, you need{" "}
          {TESTOUT_PASS_THRESHOLD} of {TESTOUT_SIZE}.
        </p>
        <Link
          to={`/lessons/${point.id}`}
          className="browse-btn browse-btn-primary"
        >
          Back to lesson
        </Link>
        <Link to={`/practice/${point.id}`}>Practice this point</Link>
      </div>
    );
  }

  function handleComplete(outcome: SessionOutcome) {
    if (!point) return;
    const correct = outcome.results.filter((r) => r.correct).length;
    setCorrectCount(correct);
    if (sessionKey) {
      clearQueueRecord(sessionKey);
      clearRunRecord(sessionKey);
    }
    if (correct >= TESTOUT_PASS_THRESHOLD) {
      markKnown(point.id);
      setPhase("passed");
    } else {
      setPhase("failed");
    }
  }

  return (
    <SessionRunner
      exercises={exercises}
      mode="practice"
      title={`Test out — ${point.title}`}
      onComplete={handleComplete}
      sessionKey={sessionKey}
    />
  );
}

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SessionRunner, { type SessionOutcome } from "../components/SessionRunner";
import { grammarPointById } from "../content";
import type { Exercise } from "../content/types";
import { buildPracticeQueue, PRACTICE_SESSION_SIZE } from "../engine/queue";
import { mulberry32 } from "../engine/rng";
import { useAppState } from "../state/AppStateContext";

export default function PracticeSession() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recordResults, introduce } = useAppState();

  const point = id ? grammarPointById.get(id) : undefined;

  const [exercises] = useState<Exercise[]>(() =>
    point ? buildPracticeQueue(point.id, PRACTICE_SESSION_SIZE, mulberry32(Date.now() >>> 0)) : [],
  );

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

  function handleComplete(outcome: SessionOutcome) {
    if (!point) return;
    recordResults(outcome.results);
    introduce(point.id);
    navigate(`/lessons/${point.id}`);
  }

  return (
    <SessionRunner exercises={exercises} mode="practice" title={point.title} onComplete={handleComplete} />
  );
}

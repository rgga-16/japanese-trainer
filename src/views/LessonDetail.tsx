import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Furigana from "../components/Furigana";
import LessonProse from "../components/LessonProse";
import MasteryBadge from "../components/MasteryBadge";
import { exercisesByPointId, grammarPointById } from "../content";
import type { Category } from "../content/types";
import { useAppState } from "../state/AppStateContext";
import { accuracyByPoint } from "../state/stats";

const CATEGORY_LABELS: Record<Category, string> = {
  particles: "Particles",
  "verb-forms": "Verb Forms",
  adjectives: "Adjectives",
  conditionals: "Conditionals",
  "giving-receiving": "Giving & Receiving",
  "sentence-patterns": "Sentence Patterns",
  conjunctions: "Conjunctions",
  keigo: "Keigo (Polite Language)",
  expressions: "Expressions",
};

const PRACTICE_TARGET = 10;

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, resetPoint } = useAppState();
  const furiganaMode = data.settings.furiganaMode;

  // Track which point armed the reset (not a bare boolean) so navigating to a
  // different lesson — which reuses this component and only changes `id` —
  // implicitly disarms, without a reset-on-id effect.
  const [armedPointId, setArmedPointId] = useState<string | null>(null);

  const point = id ? grammarPointById.get(id) : undefined;

  if (!point) {
    return (
      <div className="lesson-root">
        <div className="card lesson-notfound">
          <h1>Lesson not found</h1>
          <p>We couldn't find a grammar point with id "{id}".</p>
          <Link to="/lessons" className="browse-btn browse-btn-primary">
            Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  const srs = data.srs[point.id];
  const bankSize = exercisesByPointId.get(point.id)?.length ?? 0;
  const practiceCount =
    bankSize > 0 && bankSize < PRACTICE_TARGET ? bankSize : PRACTICE_TARGET;
  const acc = accuracyByPoint(data).get(point.id);

  const resetArmed = armedPointId === point.id;

  function handleResetClick() {
    if (!point) return;
    if (resetArmed) {
      resetPoint(point.id);
      setArmedPointId(null);
    } else {
      setArmedPointId(point.id);
    }
  }

  return (
    <div className="lesson-root">
      <Link to="/lessons" className="lesson-back">
        ← Back to lessons
      </Link>

      <h1 className="lesson-title">
        <Furigana text={point.title} mode={furiganaMode} />
      </h1>
      <p className="lesson-meaning">{point.meaning}</p>

      <div className="lesson-chips">
        <span className="lesson-chip">{point.level}</span>
        <span className="lesson-chip">{CATEGORY_LABELS[point.category]}</span>
        <MasteryBadge box={srs?.box} testedOut={srs?.testedOut} />
      </div>

      {acc && acc.attempts > 0 && (
        <p className="lesson-accuracy">
          {Math.round(acc.accuracy * 100)}% accuracy over {acc.attempts} attempt
          {acc.attempts === 1 ? "" : "s"}
        </p>
      )}

      <div className="card lesson-formation">
        <h2>Formation</h2>
        <ul>
          {point.formation.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <section className="lesson-section">
        <h2>Lesson</h2>
        <LessonProse text={point.lesson} mode={furiganaMode} />
      </section>

      <section className="lesson-section">
        <h2>Examples</h2>
        <div className="lesson-examples">
          {point.examples.map((ex) => (
            <div key={ex.ja} className="lesson-example">
              <div className="lesson-example-ja">
                <Furigana text={ex.ja} mode={furiganaMode} />
              </div>
              <div className="lesson-example-en">{ex.en}</div>
            </div>
          ))}
        </div>
      </section>

      {point.related && point.related.length > 0 && (
        <section className="lesson-section">
          <h2>Related</h2>
          <div className="lesson-related">
            {point.related.map((relId) => {
              const rel = grammarPointById.get(relId);
              if (!rel) return null;
              return (
                <Link
                  key={relId}
                  to={`/lessons/${relId}`}
                  className="lesson-related-link"
                >
                  <Furigana text={rel.title} mode={furiganaMode} />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <div className="lesson-practice-bar">
        <Link
          to={`/practice/${point.id}`}
          className="browse-btn browse-btn-primary"
        >
          Practice — {practiceCount} question{practiceCount === 1 ? "" : "s"}
        </Link>
        {srs?.testedOut ? (
          <>
            <span className="lesson-known-indicator">Known ✓</span>
            <button
              type="button"
              className={
                resetArmed
                  ? "browse-btn browse-btn-secondary lesson-reset-armed"
                  : "browse-btn browse-btn-secondary"
              }
              onClick={handleResetClick}
            >
              {resetArmed ? "Click again to confirm" : "Reset progress"}
            </button>
          </>
        ) : (
          <Link
            to={`/testout/${point.id}`}
            className="browse-btn browse-btn-secondary"
          >
            もう知っている — テストで確認 / I already know this
          </Link>
        )}
      </div>
    </div>
  );
}

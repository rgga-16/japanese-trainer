import { Link } from "react-router-dom";
import { grammarPointById } from "../content";
import Furigana from "./Furigana";

interface FeedbackPanelProps {
  correct: boolean;
  /** Furigana-notation (or plain) text of what the learner answered. */
  userAnswer: string;
  /** Furigana-notation text of the primary expected/correct answer. */
  expected: string;
  /** Other accepted surface forms (translation/cloze only), furigana notation. */
  alternatives?: string[];
  /** MCQ explanation, plain English. */
  explanation?: string;
  grammarPointId: string;
  showFurigana: boolean;
  onNext: () => void;
}

/** Correct/incorrect feedback shown after grading one exercise. */
export default function FeedbackPanel({
  correct,
  userAnswer,
  expected,
  alternatives,
  explanation,
  grammarPointId,
  showFurigana,
  onNext,
}: FeedbackPanelProps) {
  const point = grammarPointById.get(grammarPointId);

  return (
    <div className={`card feedback-panel ${correct ? "feedback-correct" : "feedback-incorrect"}`}>
      <p className="feedback-status">{correct ? "✓ Correct" : "✗ Not quite"}</p>

      <div className="feedback-row">
        <span className="feedback-label">Your answer</span>
        <Furigana text={userAnswer || "—"} show={showFurigana} className="feedback-answer" />
      </div>

      <div className="feedback-row">
        <span className="feedback-label">Expected</span>
        <Furigana text={expected} show={showFurigana} className="feedback-answer" />
      </div>

      {alternatives && alternatives.length > 0 && (
        <div className="feedback-row">
          <span className="feedback-label">Also accepted</span>
          <div className="feedback-alt-list">
            {alternatives.map((a) => (
              <Furigana key={a} text={a} show={showFurigana} className="feedback-answer" />
            ))}
          </div>
        </div>
      )}

      {explanation && <p className="feedback-explanation">{explanation}</p>}

      {point && (
        <Link to={`/lessons/${point.id}`} className="feedback-lesson-link">
          Lesson: {point.title} →
        </Link>
      )}

      <button type="button" className="primary feedback-next" onClick={onNext}>
        Next
      </button>
    </div>
  );
}

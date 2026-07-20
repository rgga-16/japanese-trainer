import { Link } from "react-router-dom";
import { grammarPointById } from "../content";
import type { FuriganaMode } from "../state/types";
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
  /** Canonical (all-kanji, furigana-stripped) surface of the matched answer;
   * set when correct (typed exercises only). */
  canonical?: string;
  /** True when correct but the learner's input used kana where the canonical
   * form uses kanji. */
  nonCanonical?: boolean;
  grammarPointId: string;
  furiganaMode: FuriganaMode;
  onNext: () => void;
}

/** Correct/incorrect feedback shown after grading one exercise. */
export default function FeedbackPanel({
  correct,
  userAnswer,
  expected,
  alternatives,
  explanation,
  canonical,
  nonCanonical,
  grammarPointId,
  furiganaMode,
  onNext,
}: FeedbackPanelProps) {
  const point = grammarPointById.get(grammarPointId);
  const showCanonicalNote = correct && nonCanonical && !!canonical;

  return (
    <div
      className={`card feedback-panel ${correct ? "feedback-correct" : "feedback-incorrect"}`}
    >
      <p className="feedback-status">{correct ? "✓ Correct" : "✗ Not quite"}</p>

      {showCanonicalNote && (
        <p className="feedback-canonical-note">
          <span className="jp">✓ 正解 — 漢字で書くと: </span>
          <Furigana
            text={canonical}
            mode={furiganaMode}
            className="feedback-canonical-answer"
          />
          <span className="feedback-canonical-note-en">
            {" "}
            (standard written form uses kanji)
          </span>
        </p>
      )}

      <div className="feedback-row">
        <span className="feedback-label">Your answer</span>
        <Furigana
          text={userAnswer || "—"}
          mode={furiganaMode}
          className="feedback-answer"
        />
      </div>

      <div className="feedback-row">
        <span className="feedback-label">Expected</span>
        <Furigana
          text={expected}
          mode={furiganaMode}
          className="feedback-answer"
        />
      </div>

      {alternatives && alternatives.length > 0 && (
        <div className="feedback-row">
          <span className="feedback-label">Also accepted</span>
          <div className="feedback-alt-list">
            {alternatives.map((a) => (
              <Furigana
                key={a}
                text={a}
                mode={furiganaMode}
                className="feedback-answer"
              />
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

import { useEffect, useRef, useState } from "react";
import type { ReadingPassage } from "../content/types";
import { useAppState } from "../state/AppStateContext";
import { META_READING_POINT_ID, type ExerciseResult } from "../state/types";
import Furigana from "./Furigana";
import "../styles/reading.css";

export interface ReadingRunnerProps {
  passage: ReadingPassage;
  /** Called once the learner has reviewed feedback and taps "Next passage"/"Done". */
  onComplete?: (correct: number, total: number) => void;
}

/** Visual state of one choice button, post-submission. */
function choiceClassName(
  submitted: boolean,
  isSelected: boolean,
  isAnswer: boolean,
): string {
  const state = submitted
    ? isAnswer
      ? "reading-choice-correct"
      : isSelected
        ? "reading-choice-incorrect"
        : ""
    : isSelected
      ? "reading-choice-selected"
      : "";
  return ["mcq-choice", "reading-choice", state].filter(Boolean).join(" ");
}

/**
 * Real-JLPT-style 読解 runner: the whole passage plus all 3 of its questions
 * render on one screen, graded together on a single submit. Deliberately NOT
 * a SessionRunner loop — see ReadingPassage's doc comment in
 * content/types.ts for why one passage can't be flattened into `Exercise`s
 * (1 exercise = 1 graded answer breaks with 3 questions per passage).
 */
export default function ReadingRunner({
  passage,
  onComplete,
}: ReadingRunnerProps) {
  const { data, recordResults } = useAppState();
  const furiganaMode = data.settings.furiganaMode;

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  // Guards the results-recording effect so a StrictMode double-invoke (or any
  // re-render while submitted stays true) can never double-write history —
  // same idiom as MockTest's recordedRef.
  const recordedRef = useRef(false);

  const total = passage.questions.length;
  const answeredCount = passage.questions.filter(
    (q) => answers[q.id] !== undefined,
  ).length;
  const allAnswered = answeredCount === total;
  const correctCount = passage.questions.filter(
    (q) => answers[q.id] === q.correctIndex,
  ).length;

  useEffect(() => {
    if (!submitted || recordedRef.current) return;
    recordedRef.current = true;
    const at = new Date().toISOString();
    const results: ExerciseResult[] = passage.questions.map((q) => ({
      exerciseId: q.id,
      grammarPointId: META_READING_POINT_ID,
      kind: "reading",
      correct: answers[q.id] === q.correctIndex,
      at,
      mode: "reading",
    }));
    recordResults(results);
  }, [submitted, passage.questions, answers, recordResults]);

  function selectChoice(questionId: string, choiceIndex: number) {
    // Guard against changing an answer (or re-submitting) once graded.
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  }

  function handleSubmit() {
    if (submitted || !allAnswered) return;
    setSubmitted(true);
  }

  return (
    <div className="reading-runner">
      <div className="reading-header">
        <h1 className="reading-title">
          <Furigana text={passage.title} mode={furiganaMode} />
        </h1>
        <span className="lesson-chip">{passage.level}</span>
      </div>

      <div className="card reading-passage">
        {passage.paragraphsJa.map((paragraph, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static paragraph list
          <p key={i} className="reading-paragraph">
            <Furigana text={paragraph} mode={furiganaMode} />
          </p>
        ))}
      </div>

      <div className="reading-questions">
        {passage.questions.map((q, qi) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctIndex;
          const cardClass = submitted
            ? `card reading-question ${isCorrect ? "feedback-correct" : "feedback-incorrect"}`
            : "card reading-question";
          return (
            <div key={q.id} className={cardClass}>
              <p className="feedback-label">Question {qi + 1}</p>
              <Furigana
                text={q.question}
                mode={furiganaMode}
                className="reading-question-text"
              />
              <div className="mcq-choices">
                {q.choices.map((choice, ci) => (
                  <button
                    key={choice}
                    type="button"
                    className={choiceClassName(
                      submitted,
                      selected === ci,
                      ci === q.correctIndex,
                    )}
                    onClick={() => selectChoice(q.id, ci)}
                    disabled={submitted}
                  >
                    <span className="mcq-choice-num">{ci + 1}</span>
                    <Furigana text={choice} mode={furiganaMode} />
                  </button>
                ))}
              </div>

              {submitted && (
                <p className="feedback-status">
                  {isCorrect ? "✓ Correct" : "✗ Not quite"}
                </p>
              )}
              {submitted && q.explanation && (
                <p className="feedback-explanation">{q.explanation}</p>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          className="primary reading-submit"
          onClick={handleSubmit}
          disabled={!allAnswered}
        >
          {allAnswered
            ? "Submit answers"
            : `Answer all questions to submit (${answeredCount}/${total})`}
        </button>
      ) : (
        <div className="card reading-summary">
          <p className="session-score">
            {correctCount} / {total} correct
          </p>
          <div className="reading-summary-actions">
            <button
              type="button"
              className="primary"
              onClick={() => onComplete?.(correctCount, total)}
            >
              Next passage
            </button>
            <button
              type="button"
              onClick={() => onComplete?.(correctCount, total)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

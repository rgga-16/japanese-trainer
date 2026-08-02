// Shared run loop for all four drills (conjugation / particle / vocab-recall /
// transitivity). Generalizes the old ConjugationDrill.tsx run/done phases to
// the uniform DrillQuestion contract (src/engine/drills): "typed" questions
// are graded with gradeTyped + rendered via AnswerInput (IME-safe), "choice"
// questions are graded by index + rendered as a numbered button grid (same
// visual/keyboard pattern as McqExercise.tsx: 1-4 shortcuts, reusing the
// global .mcq-choices/.mcq-choice(-num) classes from session.css).
//
// The parent (DrillHub) owns question construction/options and is expected to
// remount this component (via a changing `key`) whenever it hands over a
// fresh `questions` array, so this component's own index/answered/feedback
// state never needs to be reset by hand.

import { useCallback, useEffect, useRef, useState } from "react";
import type { DrillQuestion } from "../engine/drills";
import { gradeTyped } from "../engine/grader";
import { useAppState } from "../state/AppStateContext";
import "../styles/drill.css";
// Choice-mode drills reuse the .mcq-choices/.mcq-choice(-num) rules that live
// in session.css. Imported explicitly rather than relying on some other
// mounted component having pulled session.css into the bundle first.
import "../styles/session.css";
import AnswerInput from "./AnswerInput";
import Furigana from "./Furigana";

interface DrillRunnerProps {
  questions: DrillQuestion[];
  /** Start a fresh session with the same drill + options ("Again"). */
  onRestart: () => void;
  /** Return to the drill's setup panel (or the hub, for option-less drills). */
  onChangeSettings: () => void;
}

interface AnsweredEntry {
  question: DrillQuestion;
  /** What the learner typed, or the text of the choice they picked. */
  displayInput: string;
  correct: boolean;
  /** Plain-text expected answer, for the compact end-of-session review row. */
  expectedDisplay: string;
}

/** Shared run loop: one question at a time, then a score + review screen. */
export default function DrillRunner({
  questions,
  onRestart,
  onChangeSettings,
}: DrillRunnerProps) {
  const { data, recordDrill } = useAppState();
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<AnsweredEntry[]>([]);
  const [feedback, setFeedback] = useState<AnsweredEntry | null>(null);
  const [done, setDone] = useState(false);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (feedback !== null) nextButtonRef.current?.focus();
  }, [feedback]);

  const question = questions[index];

  const submitTyped = useCallback(
    (input: string) => {
      if (feedback !== null || !question || question.mode !== "typed") return;
      const result = gradeTyped(input, question.accepted);
      recordDrill(question.statKey, result.correct);
      const entry: AnsweredEntry = {
        question,
        displayInput: input,
        correct: result.correct,
        expectedDisplay: result.closest,
      };
      setAnswered((prev) => [...prev, entry]);
      setFeedback(entry);
    },
    [feedback, question, recordDrill],
  );

  const submitChoice = useCallback(
    (choiceIndex: number) => {
      if (feedback !== null || !question || question.mode !== "choice") return;
      const correct = choiceIndex === question.correctIndex;
      recordDrill(question.statKey, correct);
      const entry: AnsweredEntry = {
        question,
        displayInput: question.choices[choiceIndex],
        correct,
        expectedDisplay: question.choices[question.correctIndex],
      };
      setAnswered((prev) => [...prev, entry]);
      setFeedback(entry);
    },
    [feedback, question, recordDrill],
  );

  // Keyboard 1-N shortcut for choice questions, same affordance as McqExercise.
  useEffect(() => {
    if (feedback !== null || !question || question.mode !== "choice") return;
    function handleKeyDown(e: KeyboardEvent) {
      if (question?.mode !== "choice") return;
      const n = Number(e.key);
      if (n >= 1 && n <= question.choices.length) {
        submitChoice(n - 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedback, question, submitChoice]);

  function next() {
    setFeedback(null);
    if (index + 1 >= questions.length) {
      setDone(true);
    } else {
      setIndex(index + 1);
    }
  }

  if (questions.length === 0 || !question) return null;

  if (done) {
    const correctCount = answered.filter((a) => a.correct).length;
    return (
      <div className="drill">
        <h1>Drill complete</h1>
        <div className="card">
          <p className="drill-score">
            {correctCount} / {answered.length} correct
          </p>
          <ul className="drill-summary">
            {answered.map((a, i) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: append-only result list; a question id can repeat within a session
                key={i}
                className={a.correct ? "drill-row-ok" : "drill-row-bad"}
              >
                <span>{a.correct ? "✓" : "✗"}</span>
                {a.question.promptJa && (
                  <Furigana
                    text={a.question.promptJa}
                    mode={data.settings.furiganaMode}
                  />
                )}
                {a.question.promptEn && <span>{a.question.promptEn}</span>}
                <span className="drill-form jp">{a.question.instruction}</span>
                <span className="jp">
                  {a.correct
                    ? a.displayInput
                    : `${a.displayInput || "—"} → ${a.expectedDisplay}`}
                </span>
              </li>
            ))}
          </ul>
          <div className="drill-actions">
            <button type="button" className="primary" onClick={onRestart}>
              Again
            </button>
            <button type="button" onClick={onChangeSettings}>
              Change settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="drill">
      <div className="drill-progress">
        {index + 1} / {questions.length}
      </div>
      <div className="card drill-question">
        <div className="drill-prompt">
          {question.promptJa && (
            <Furigana
              text={question.promptJa}
              mode={data.settings.furiganaMode}
              className="drill-word"
            />
          )}
          {question.promptEn && (
            <span className="drill-gloss">{question.promptEn}</span>
          )}
        </div>
        <p className="drill-target jp">{question.instruction}</p>

        {feedback === null ? (
          question.mode === "typed" ? (
            <AnswerInput
              key={question.id}
              onSubmit={submitTyped}
              placeholder="答えを入力…"
            />
          ) : (
            <div className="mcq-choices">
              {question.choices.map((choice, i) => (
                <button
                  key={choice}
                  type="button"
                  className="mcq-choice"
                  onClick={() => submitChoice(i)}
                >
                  <span className="mcq-choice-num">{i + 1}</span>
                  <span>{choice}</span>
                </button>
              ))}
            </div>
          )
        ) : (
          <div
            className={
              feedback.correct
                ? "drill-feedback drill-fb-ok"
                : "drill-feedback drill-fb-bad"
            }
          >
            <p>
              {feedback.correct ? "正解！" : "残念…"}{" "}
              <span className="jp drill-expected">
                {feedback.question.mode === "typed" ? (
                  <Furigana
                    text={feedback.question.accepted[0]}
                    mode={data.settings.furiganaMode}
                  />
                ) : (
                  feedback.question.choices[feedback.question.correctIndex]
                )}
              </span>
            </p>
            {feedback.question.explanation && (
              <p className="drill-explanation">
                {feedback.question.explanation}
              </p>
            )}
            <button
              type="button"
              className="primary"
              onClick={next}
              ref={nextButtonRef}
            >
              {index + 1 >= questions.length ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

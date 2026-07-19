import { useCallback, useEffect, useState } from "react";
import type { Exercise } from "../content/types";
import { stripFurigana } from "../engine/furigana";
import { gradeTyped } from "../engine/grader";
import { useAppState } from "../state/AppStateContext";
import type { ExerciseResult, StudyMode } from "../state/types";
import "../styles/session.css";
import ClozeExercise from "./exercises/ClozeExercise";
import McqExercise from "./exercises/McqExercise";
import OrderingExercise from "./exercises/OrderingExercise";
import TranslationExercise from "./exercises/TranslationExercise";
import FeedbackPanel from "./FeedbackPanel";

export interface SessionOutcome {
  results: ExerciseResult[];
}

interface SessionRunnerProps {
  exercises: Exercise[];
  /** Stamped into each ExerciseResult. */
  mode: StudyMode;
  onComplete: (outcome: SessionOutcome) => void;
  title: string;
}

interface FeedbackData {
  correct: boolean;
  userAnswer: string;
  expected: string;
  alternatives?: string[];
  explanation?: string;
}

function gradeTypedAnswer(accepted: string[], input: string): FeedbackData {
  const grade = gradeTyped(input, accepted);
  const matchedFurigana = accepted.find((a) => stripFurigana(a) === grade.closest);
  return {
    correct: grade.correct,
    userAnswer: input,
    expected: matchedFurigana ?? grade.closest,
    alternatives: accepted.filter((a) => a !== matchedFurigana),
  };
}

function promptLabel(ex: Exercise): string {
  switch (ex.kind) {
    case "translation":
      return ex.promptEn;
    case "cloze":
      return ex.translationEn;
    case "mcq":
      return stripFurigana(ex.question);
    case "ordering":
      return ex.translationEn;
  }
}

/** Reusable session loop: renders one exercise at a time, grades, shows feedback, then a summary. */
export default function SessionRunner({ exercises, mode, onComplete, title }: SessionRunnerProps) {
  const { data } = useAppState();
  const showFurigana = data.settings.showFurigana;

  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [finished, setFinished] = useState(false);

  const total = exercises.length;
  const exercise = exercises[index];

  const advance = useCallback(() => {
    setFeedback(null);
    setIndex((i) => {
      if (i + 1 >= total) {
        setFinished(true);
        return i;
      }
      return i + 1;
    });
  }, [total]);

  // Advance on Enter while feedback is showing. Only mounted during the
  // feedback phase, so it never races with an exercise's own Enter-submit.
  useEffect(() => {
    if (!feedback) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        e.preventDefault();
        advance();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedback, advance]);

  function recordAndShowFeedback(ex: Exercise, correct: boolean, fb: FeedbackData) {
    const result: ExerciseResult = {
      exerciseId: ex.id,
      grammarPointId: ex.grammarPointId,
      kind: ex.kind,
      correct,
      at: new Date().toISOString(),
      mode,
    };
    setResults((prev) => [...prev, result]);
    setFeedback(fb);
  }

  if (finished) {
    const correctCount = results.filter((r) => r.correct).length;
    return (
      <div className="card session-summary">
        <h1>{title} — Summary</h1>
        <p className="session-score">
          {correctCount} / {results.length} correct
        </p>
        <ul className="session-summary-list">
          {exercises.map((ex, i) => {
            const r = results[i];
            return (
              <li key={ex.id} className={r?.correct ? "summary-correct" : "summary-incorrect"}>
                <span className="summary-mark">{r?.correct ? "✓" : "✗"}</span>
                <span className="summary-prompt">{promptLabel(ex)}</span>
              </li>
            );
          })}
        </ul>
        <button type="button" className="primary" onClick={() => onComplete({ results })}>
          Finish
        </button>
      </div>
    );
  }

  return (
    <div className="session-runner">
      <h1 className="session-title">{title}</h1>
      <div className="session-progress">
        <div className="session-progress-label">
          {index + 1} / {total}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(results.length / total) * 100}%` }} />
        </div>
      </div>

      <div className="card session-exercise">
        {(() => {
          switch (exercise.kind) {
            case "translation":
              return (
                <TranslationExercise
                  key={exercise.id}
                  exercise={exercise}
                  showFurigana={showFurigana}
                  onAnswer={(value) => {
                    const fb = gradeTypedAnswer(exercise.accepted, value);
                    recordAndShowFeedback(exercise, fb.correct, fb);
                  }}
                />
              );
            case "cloze":
              return (
                <ClozeExercise
                  key={exercise.id}
                  exercise={exercise}
                  showFurigana={showFurigana}
                  onAnswer={(value) => {
                    const fb = gradeTypedAnswer(exercise.accepted, value);
                    recordAndShowFeedback(exercise, fb.correct, fb);
                  }}
                />
              );
            case "mcq":
              return (
                <McqExercise
                  key={exercise.id}
                  exercise={exercise}
                  showFurigana={showFurigana}
                  onAnswer={(choiceIndex) => {
                    const correct = choiceIndex === exercise.correctIndex;
                    const fb: FeedbackData = {
                      correct,
                      userAnswer: exercise.choices[choiceIndex] ?? "",
                      expected: exercise.choices[exercise.correctIndex],
                      explanation: exercise.explanation,
                    };
                    recordAndShowFeedback(exercise, correct, fb);
                  }}
                />
              );
            case "ordering":
              return (
                <OrderingExercise
                  key={exercise.id}
                  exercise={exercise}
                  showFurigana={showFurigana}
                  onAnswer={(order) => {
                    const correct = order.every((v, i) => v === i);
                    const lead = exercise.lead ?? "";
                    const tail = exercise.tail ?? "";
                    const fb: FeedbackData = {
                      correct,
                      userAnswer: `${lead}${order.map((i) => exercise.segments[i]).join("")}${tail}`,
                      expected: `${lead}${exercise.segments.join("")}${tail}`,
                    };
                    recordAndShowFeedback(exercise, correct, fb);
                  }}
                />
              );
            default:
              return null;
          }
        })()}
      </div>

      {feedback && (
        <FeedbackPanel
          correct={feedback.correct}
          userAnswer={feedback.userAnswer}
          expected={feedback.expected}
          alternatives={feedback.alternatives}
          explanation={feedback.explanation}
          grammarPointId={exercise.grammarPointId}
          showFurigana={showFurigana}
          onNext={advance}
        />
      )}
    </div>
  );
}

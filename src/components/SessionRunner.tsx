import { useCallback, useEffect, useRef, useState } from "react";
import type { Exercise } from "../content/types";
import { stripFurigana } from "../engine/furigana";
import { gradeTyped } from "../engine/grader";
import { useAppState } from "../state/AppStateContext";
import type { ExerciseResult, StudyMode } from "../state/types";
import "../styles/session.css";
import ClozeExercise from "./exercises/ClozeExercise";
import McqExercise from "./exercises/McqExercise";
import OrderingExercise from "./exercises/OrderingExercise";
import TransformationExercise from "./exercises/TransformationExercise";
import TranslationExercise from "./exercises/TranslationExercise";
import FeedbackPanel from "./FeedbackPanel";
import {
  clearRunRecord,
  loadRunRecord,
  saveRunRecord,
} from "./sessionPersistence";

export interface SessionOutcome {
  results: ExerciseResult[];
}

interface SessionRunnerProps {
  exercises: Exercise[];
  /** Stamped into each ExerciseResult. */
  mode: StudyMode;
  onComplete: (outcome: SessionOutcome) => void;
  title: string;
  /**
   * When provided, the in-progress run (index/results/feedback/finished) is
   * persisted to sessionStorage so navigating away and back resumes the same
   * question instead of losing state. Omit (e.g. MockTest) to opt out.
   */
  sessionKey?: string;
}

interface FeedbackData {
  correct: boolean;
  userAnswer: string;
  expected: string;
  alternatives?: string[];
  explanation?: string;
  /** Canonical (all-kanji) surface of the matched answer; set when correct. */
  canonical?: string;
  /** True when correct but the user's input used kana where the canonical
   * form uses kanji. */
  nonCanonical?: boolean;
}

interface RunRecord {
  index: number;
  results: ExerciseResult[];
  feedback: FeedbackData | null;
  finished: boolean;
}

/** Basic shape/bounds check so a corrupt or stale record never wedges the UI. */
function isValidRunRecord(value: unknown, total: number): value is RunRecord {
  if (!value || typeof value !== "object") return false;
  const r = value as Partial<RunRecord>;
  if (typeof r.index !== "number" || !Number.isInteger(r.index) || r.index < 0)
    return false;
  if (total > 0 && r.index >= total) return false;
  if (!Array.isArray(r.results)) return false;
  if (typeof r.finished !== "boolean") return false;
  if (
    r.feedback !== null &&
    r.feedback !== undefined &&
    typeof r.feedback !== "object"
  )
    return false;
  return true;
}

function loadValidRunRecord(
  sessionKey: string,
  total: number,
): RunRecord | null {
  const record = loadRunRecord<RunRecord>(sessionKey);
  return isValidRunRecord(record, total) ? record : null;
}

function gradeTypedAnswer(accepted: string[], input: string): FeedbackData {
  const grade = gradeTyped(input, accepted);
  const matchedFurigana = accepted.find(
    (a) => stripFurigana(a) === grade.closest,
  );
  return {
    correct: grade.correct,
    userAnswer: input,
    expected: matchedFurigana ?? grade.closest,
    alternatives: accepted.filter((a) => a !== matchedFurigana),
    canonical: grade.canonical,
    nonCanonical: grade.nonCanonical,
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
    case "transformation":
      return ex.translationEn;
  }
}

/** Reusable session loop: renders one exercise at a time, grades, shows feedback, then a summary. */
export default function SessionRunner({
  exercises,
  mode,
  onComplete,
  title,
  sessionKey,
}: SessionRunnerProps) {
  const { data } = useAppState();
  const furiganaMode = data.settings.furiganaMode;

  // Read any persisted run once per mount (not per render) — StrictMode-safe
  // since it never re-reads after the first commit.
  const initialRun = useRef<RunRecord | null | undefined>(undefined);
  if (initialRun.current === undefined) {
    initialRun.current = sessionKey
      ? loadValidRunRecord(sessionKey, exercises.length)
      : null;
  }

  const [index, setIndex] = useState(() => initialRun.current?.index ?? 0);
  const [feedback, setFeedback] = useState<FeedbackData | null>(
    () => initialRun.current?.feedback ?? null,
  );
  const [results, setResults] = useState<ExerciseResult[]>(
    () => initialRun.current?.results ?? [],
  );
  const [finished, setFinished] = useState(
    () => initialRun.current?.finished ?? false,
  );

  const total = exercises.length;
  const exercise = exercises[index];

  // Persist the run so navigating away (e.g. to Settings) and back resumes at
  // the same question. Once the session finishes, drop the record instead —
  // the next visit should start clean (the view also clears its queue record).
  useEffect(() => {
    if (!sessionKey) return;
    if (finished) {
      clearRunRecord(sessionKey);
      return;
    }
    saveRunRecord(sessionKey, { index, results, feedback, finished });
  }, [sessionKey, index, results, feedback, finished]);

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

  function recordAndShowFeedback(
    ex: Exercise,
    correct: boolean,
    fb: FeedbackData,
  ) {
    // Guard against double-submit (repeated Enter/click while feedback is
    // already showing) inflating the progress bar with duplicate results.
    if (feedback !== null) return;
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
              <li
                key={ex.id}
                className={r?.correct ? "summary-correct" : "summary-incorrect"}
              >
                <span className="summary-mark">{r?.correct ? "✓" : "✗"}</span>
                <span className="summary-prompt">{promptLabel(ex)}</span>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="primary"
          onClick={() => {
            // Idempotent: the finished-effect above already clears this, but
            // clear again defensively in case onComplete fires first.
            if (sessionKey) clearRunRecord(sessionKey);
            onComplete({ results });
          }}
        >
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
          <div
            className="progress-fill"
            style={{ width: `${(results.length / total) * 100}%` }}
          />
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
                  furiganaMode={furiganaMode}
                  disabled={feedback !== null}
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
                  furiganaMode={furiganaMode}
                  disabled={feedback !== null}
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
                  furiganaMode={furiganaMode}
                  disabled={feedback !== null}
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
                  furiganaMode={furiganaMode}
                  disabled={feedback !== null}
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
            case "transformation":
              return (
                <TransformationExercise
                  key={exercise.id}
                  exercise={exercise}
                  furiganaMode={furiganaMode}
                  disabled={feedback !== null}
                  onAnswer={(value) => {
                    const fb = gradeTypedAnswer(exercise.accepted, value);
                    recordAndShowFeedback(exercise, fb.correct, fb);
                  }}
                />
              );
            default: {
              // Exhaustiveness guard: a new Exercise kind must be registered
              // here. Without it TypeScript stays silent and the card renders
              // blank at runtime instead of failing the build.
              const unhandled: never = exercise;
              return unhandled;
            }
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
          canonical={feedback.canonical}
          nonCanonical={feedback.nonCanonical}
          grammarPointId={exercise.grammarPointId}
          furiganaMode={furiganaMode}
          onNext={advance}
        />
      )}
    </div>
  );
}

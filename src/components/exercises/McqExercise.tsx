import { useCallback, useEffect, useRef } from "react";
import type { McqExercise as McqExerciseType } from "../../content/types";
import type { FuriganaMode } from "../../state/types";
import Furigana from "../Furigana";

interface McqExerciseProps {
  exercise: McqExerciseType;
  furiganaMode: FuriganaMode;
  onAnswer: (choiceIndex: number) => void;
  /** Locks choice selection, e.g. while feedback for the answer is showing. */
  disabled?: boolean;
}

/** Multiple-choice fill-in exercise; 4 choices, keyboard 1-4 select. */
export default function McqExercise({
  exercise,
  furiganaMode,
  onAnswer,
  disabled,
}: McqExerciseProps) {
  const answeredRef = useRef(false);

  const select = useCallback(
    (index: number) => {
      if (disabled || answeredRef.current) return;
      answeredRef.current = true;
      onAnswer(index);
    },
    [disabled, onAnswer],
  );

  useEffect(() => {
    if (disabled) return;
    function handleKeyDown(e: KeyboardEvent) {
      const n = Number(e.key);
      if (n >= 1 && n <= exercise.choices.length) {
        select(n - 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, exercise.choices.length, select]);

  return (
    <div className="exercise mcq-exercise">
      <Furigana
        text={exercise.question}
        mode={furiganaMode}
        className="exercise-prompt"
      />
      <div className="mcq-choices">
        {exercise.choices.map((choice, i) => (
          <button
            key={choice}
            type="button"
            className="mcq-choice"
            onClick={() => select(i)}
            disabled={disabled}
          >
            <span className="mcq-choice-num">{i + 1}</span>
            <Furigana text={choice} mode={furiganaMode} />
          </button>
        ))}
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef } from "react";
import type { McqExercise as McqExerciseType } from "../../content/types";
import Furigana from "../Furigana";

interface McqExerciseProps {
  exercise: McqExerciseType;
  showFurigana: boolean;
  onAnswer: (choiceIndex: number) => void;
}

/** Multiple-choice fill-in exercise; 4 choices, keyboard 1-4 select. */
export default function McqExercise({ exercise, showFurigana, onAnswer }: McqExerciseProps) {
  const answeredRef = useRef(false);

  const select = useCallback(
    (index: number) => {
      if (answeredRef.current) return;
      answeredRef.current = true;
      onAnswer(index);
    },
    [onAnswer],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const n = Number(e.key);
      if (n >= 1 && n <= exercise.choices.length) {
        select(n - 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [exercise.choices.length, select]);

  return (
    <div className="exercise mcq-exercise">
      <Furigana text={exercise.question} show={showFurigana} className="exercise-prompt" />
      <div className="mcq-choices">
        {exercise.choices.map((choice, i) => (
          <button key={choice} type="button" className="mcq-choice" onClick={() => select(i)}>
            <span className="mcq-choice-num">{i + 1}</span>
            <Furigana text={choice} show={showFurigana} />
          </button>
        ))}
      </div>
    </div>
  );
}

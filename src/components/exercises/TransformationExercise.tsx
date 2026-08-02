import type { TransformationExercise as TransformationExerciseType } from "../../content/types";
import type { FuriganaMode } from "../../state/types";
import AnswerInput from "../AnswerInput";
import Furigana from "../Furigana";

interface TransformationExerciseProps {
  exercise: TransformationExerciseType;
  furiganaMode: FuriganaMode;
  onAnswer: (value: string) => void;
  disabled?: boolean;
}

/**
 * 変換: rewrite a whole sentence into a target form. Unlike cloze, the learner
 * produces the entire sentence, so the source stays fully visible and the
 * instruction carries the target form.
 */
export default function TransformationExercise({
  exercise,
  furiganaMode,
  onAnswer,
  disabled,
}: TransformationExerciseProps) {
  return (
    <div className="exercise transformation-exercise">
      <p className="exercise-prompt jp transformation-source">
        <Furigana text={exercise.sourceJa} mode={furiganaMode} />
      </p>
      <p className="transformation-instruction">
        {exercise.instruction}
        {exercise.targetLabel && (
          <span className="transformation-target jp">
            {exercise.targetLabel}
          </span>
        )}
      </p>
      <p className="exercise-translation">{exercise.translationEn}</p>
      {exercise.hint && <p className="exercise-hint">{exercise.hint}</p>}
      <AnswerInput
        onSubmit={onAnswer}
        placeholder="書きかえた文を入力…"
        disabled={disabled}
      />
    </div>
  );
}

import type { ClozeExercise as ClozeExerciseType } from "../../content/types";
import type { FuriganaMode } from "../../state/types";
import AnswerInput from "../AnswerInput";
import Furigana from "../Furigana";

interface ClozeExerciseProps {
  exercise: ClozeExerciseType;
  furiganaMode: FuriganaMode;
  onAnswer: (value: string) => void;
  disabled?: boolean;
}

/** Fill-in-the-blank sentence exercise. */
export default function ClozeExercise({
  exercise,
  furiganaMode,
  onAnswer,
  disabled,
}: ClozeExerciseProps) {
  const [before, after] = exercise.sentence.split("＿＿");

  return (
    <div className="exercise cloze-exercise">
      <p className="exercise-prompt jp cloze-sentence">
        <Furigana text={before ?? ""} mode={furiganaMode} />
        <span className="cloze-gap">＿＿</span>
        <Furigana text={after ?? ""} mode={furiganaMode} />
      </p>
      <p className="exercise-translation">{exercise.translationEn}</p>
      <AnswerInput
        onSubmit={onAnswer}
        placeholder="＿＿に入る言葉"
        disabled={disabled}
      />
    </div>
  );
}

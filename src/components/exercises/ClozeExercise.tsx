import type { ClozeExercise as ClozeExerciseType } from "../../content/types";
import AnswerInput from "../AnswerInput";
import Furigana from "../Furigana";

interface ClozeExerciseProps {
  exercise: ClozeExerciseType;
  showFurigana: boolean;
  onAnswer: (value: string) => void;
}

/** Fill-in-the-blank sentence exercise. */
export default function ClozeExercise({ exercise, showFurigana, onAnswer }: ClozeExerciseProps) {
  const [before, after] = exercise.sentence.split("＿＿");

  return (
    <div className="exercise cloze-exercise">
      <p className="exercise-prompt jp cloze-sentence">
        <Furigana text={before ?? ""} show={showFurigana} />
        <span className="cloze-gap">＿＿</span>
        <Furigana text={after ?? ""} show={showFurigana} />
      </p>
      <p className="exercise-translation">{exercise.translationEn}</p>
      <AnswerInput onSubmit={onAnswer} placeholder="＿＿に入る言葉" />
    </div>
  );
}

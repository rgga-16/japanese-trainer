import type { TranslationExercise as TranslationExerciseType } from "../../content/types";
import AnswerInput from "../AnswerInput";

interface TranslationExerciseProps {
  exercise: TranslationExerciseType;
  showFurigana: boolean;
  onAnswer: (value: string) => void;
}

/** English → Japanese translation prompt. */
export default function TranslationExercise({ exercise, onAnswer }: TranslationExerciseProps) {
  return (
    <div className="exercise translation-exercise">
      <p className="exercise-prompt">{exercise.promptEn}</p>
      {exercise.hint && <p className="exercise-hint">Hint: {exercise.hint}</p>}
      <AnswerInput onSubmit={onAnswer} placeholder="日本語で答えてください" />
    </div>
  );
}

import { useState } from "react";
import type { OrderingExercise as OrderingExerciseType } from "../../content/types";
import { hashSeed, mulberry32, shuffle } from "../../engine/rng";
import type { FuriganaMode } from "../../state/types";
import Furigana from "../Furigana";

interface OrderingExerciseProps {
  exercise: OrderingExerciseType;
  furiganaMode: FuriganaMode;
  onAnswer: (order: number[]) => void;
  /** Locks placement/confirm, e.g. while feedback for the answer is showing. */
  disabled?: boolean;
}

/** JLPT 文の組み立て: arrange shuffled segments into the correct order. */
export default function OrderingExercise({
  exercise,
  furiganaMode,
  onAnswer,
  disabled,
}: OrderingExerciseProps) {
  const [shuffled] = useState<number[]>(() =>
    shuffle(
      exercise.segments.map((_, i) => i),
      mulberry32(hashSeed(exercise.id)),
    ),
  );
  const [placed, setPlaced] = useState<number[]>([]);

  const available = shuffled.filter((i) => !placed.includes(i));
  const allPlaced = placed.length === exercise.segments.length;

  function place(i: number) {
    if (disabled) return;
    setPlaced((prev) => [...prev, i]);
  }

  function unplace(i: number) {
    if (disabled) return;
    setPlaced((prev) => prev.filter((x) => x !== i));
  }

  function confirm() {
    if (disabled || !allPlaced) return;
    onAnswer(placed);
  }

  return (
    <div className="exercise ordering-exercise">
      <p className="exercise-translation">{exercise.translationEn}</p>

      <div className="ordering-answer-row">
        {exercise.lead && <Furigana text={exercise.lead} mode={furiganaMode} />}
        {placed.length === 0 && (
          <span className="ordering-placeholder">タップして並べる</span>
        )}
        {placed.map((i) => (
          <button
            key={i}
            type="button"
            className="ordering-chip ordering-chip-placed"
            onClick={() => unplace(i)}
            disabled={disabled}
          >
            <Furigana text={exercise.segments[i]} mode={furiganaMode} />
          </button>
        ))}
        {exercise.tail && <Furigana text={exercise.tail} mode={furiganaMode} />}
      </div>

      <div className="ordering-tray">
        {available.map((i) => (
          <button
            key={i}
            type="button"
            className="ordering-chip"
            onClick={() => place(i)}
            disabled={disabled}
          >
            <Furigana text={exercise.segments[i]} mode={furiganaMode} />
          </button>
        ))}
      </div>

      <div className="ordering-actions">
        <button
          type="button"
          onClick={() => setPlaced([])}
          disabled={disabled || placed.length === 0}
        >
          やり直す
        </button>
        <button
          type="button"
          className="primary"
          onClick={confirm}
          disabled={disabled || !allPlaced}
        >
          確定
        </button>
      </div>
    </div>
  );
}

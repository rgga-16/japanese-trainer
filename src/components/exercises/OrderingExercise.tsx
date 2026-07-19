import { useState } from "react";
import type { OrderingExercise as OrderingExerciseType } from "../../content/types";
import { hashSeed, mulberry32, shuffle } from "../../engine/rng";
import Furigana from "../Furigana";

interface OrderingExerciseProps {
  exercise: OrderingExerciseType;
  showFurigana: boolean;
  onAnswer: (order: number[]) => void;
}

/** JLPT 文の組み立て: arrange shuffled segments into the correct order. */
export default function OrderingExercise({ exercise, showFurigana, onAnswer }: OrderingExerciseProps) {
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
    setPlaced((prev) => [...prev, i]);
  }

  function unplace(i: number) {
    setPlaced((prev) => prev.filter((x) => x !== i));
  }

  function confirm() {
    if (allPlaced) onAnswer(placed);
  }

  return (
    <div className="exercise ordering-exercise">
      <p className="exercise-translation">{exercise.translationEn}</p>

      <div className="ordering-answer-row">
        {exercise.lead && <Furigana text={exercise.lead} show={showFurigana} />}
        {placed.length === 0 && <span className="ordering-placeholder">タップして並べる</span>}
        {placed.map((i) => (
          <button
            key={i}
            type="button"
            className="ordering-chip ordering-chip-placed"
            onClick={() => unplace(i)}
          >
            <Furigana text={exercise.segments[i]} show={showFurigana} />
          </button>
        ))}
        {exercise.tail && <Furigana text={exercise.tail} show={showFurigana} />}
      </div>

      <div className="ordering-tray">
        {available.map((i) => (
          <button key={i} type="button" className="ordering-chip" onClick={() => place(i)}>
            <Furigana text={exercise.segments[i]} show={showFurigana} />
          </button>
        ))}
      </div>

      <div className="ordering-actions">
        <button type="button" onClick={() => setPlaced([])} disabled={placed.length === 0}>
          やり直す
        </button>
        <button type="button" className="primary" onClick={confirm} disabled={!allPlaced}>
          確定
        </button>
      </div>
    </div>
  );
}

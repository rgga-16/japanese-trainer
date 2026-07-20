import { MASTERED_BOX } from "../engine/srs";

interface MasteryBadgeProps {
  /** SRS Leitner box (0–6). Undefined = never studied. */
  box?: number;
  /** True when the learner explicitly tested out of this point (vs. earning mastery through review). */
  testedOut?: boolean;
}

type MasteryLevel = "new" | "learning" | "strong" | "mastered" | "known";

function levelFor(
  box: number | undefined,
  testedOut: boolean | undefined,
): MasteryLevel {
  if (testedOut) return "known";
  if (box === undefined) return "new";
  if (box >= MASTERED_BOX) return "mastered";
  if (box >= 3) return "strong";
  return "learning";
}

const LABELS: Record<MasteryLevel, string> = {
  new: "New",
  learning: "Learning",
  strong: "Strong",
  mastered: "Mastered",
  known: "Known",
};

function titleFor(box: number | undefined, level: MasteryLevel): string {
  if (level === "known") {
    return "Marked as already known via test-out — skipped in reviews";
  }
  if (box === undefined) {
    return "Not yet studied — will start at Leitner box 0";
  }
  return `Leitner box ${box} of ${MASTERED_BOX} (${LABELS[level].toLowerCase()}) — higher boxes review less often`;
}

/** Small pill showing SRS progress: dots for the Leitner box + a compact label. */
export default function MasteryBadge({ box, testedOut }: MasteryBadgeProps) {
  const level = levelFor(box, testedOut);
  const filledDots = Math.min(box ?? 0, MASTERED_BOX);
  const dots = Array.from({ length: MASTERED_BOX }, (_, i) => i < filledDots);

  return (
    <span
      className={`browse-mastery-badge browse-mastery-badge-${level}`}
      title={titleFor(box, level)}
    >
      <span className="browse-mastery-dots" aria-hidden="true">
        {dots.map((filled, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static-length dot list
            key={i}
            className={
              filled
                ? "browse-mastery-dot browse-mastery-dot-filled"
                : "browse-mastery-dot"
            }
          />
        ))}
      </span>
      <span className="browse-mastery-label">{LABELS[level]}</span>
    </span>
  );
}

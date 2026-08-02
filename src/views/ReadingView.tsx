import { useMemo, useState } from "react";
import Furigana from "../components/Furigana";
import ReadingRunner from "../components/ReadingRunner";
import { allReadingPassages } from "../content";
import type { ReadingPassage } from "../content/types";
import { useAppState } from "../state/AppStateContext";
import { META_READING_POINT_ID } from "../state/types";
import "../styles/reading.css";

/** Route view at /reading: pick a passage from the list, then work through it. */
export default function ReadingView() {
  const { data } = useAppState();
  const furiganaMode = data.settings.furiganaMode;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Question ids are "<passageId>.qN", recorded with the meta.reading
  // sentinel — any history entry with that id means the passage was attempted.
  const attemptedQuestionIds = useMemo(() => {
    const ids = new Set<string>();
    for (const r of data.history) {
      if (r.grammarPointId === META_READING_POINT_ID) ids.add(r.exerciseId);
    }
    return ids;
  }, [data.history]);

  function isAttempted(passage: ReadingPassage): boolean {
    return passage.questions.some((q) => attemptedQuestionIds.has(q.id));
  }

  if (allReadingPassages.length === 0) {
    return (
      <div className="card session-empty">
        <h1>Reading Comprehension</h1>
        <p>
          No reading passages yet — check back after the next content update.
        </p>
      </div>
    );
  }

  const selected = selectedId
    ? allReadingPassages.find((p) => p.id === selectedId)
    : undefined;

  if (selected) {
    return (
      <div className="reading-view-active">
        <button
          type="button"
          className="lesson-back reading-back-btn"
          onClick={() => setSelectedId(null)}
        >
          ← Back to passages
        </button>
        <ReadingRunner
          key={selected.id}
          passage={selected}
          onComplete={() => setSelectedId(null)}
        />
      </div>
    );
  }

  return (
    <div className="browse-root">
      <h1>Reading Comprehension (読解)</h1>
      <p className="reading-list-intro">
        Pick a passage, read it carefully, then answer all 3 questions.
      </p>
      <div className="card browse-list">
        {allReadingPassages.map((p) => (
          <button
            key={p.id}
            type="button"
            className="reading-list-row"
            onClick={() => setSelectedId(p.id)}
          >
            <span className="browse-row-main">
              <span className="browse-row-title">
                <Furigana text={p.title} mode={furiganaMode} />
              </span>
              <span className="browse-row-meaning">
                {p.questions.length} question
                {p.questions.length === 1 ? "" : "s"}
              </span>
            </span>
            <span className="reading-list-badges">
              {isAttempted(p) && (
                <span className="reading-attempted-chip">Attempted</span>
              )}
              <span className="lesson-chip">{p.level}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

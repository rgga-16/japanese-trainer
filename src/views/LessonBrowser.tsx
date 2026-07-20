import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Furigana from "../components/Furigana";
import MasteryBadge from "../components/MasteryBadge";
import { allGrammarPoints } from "../content";
import type { Category, GrammarPoint, Level } from "../content/types";
import { useAppState } from "../state/AppStateContext";

const CATEGORY_ORDER: Category[] = [
  "particles",
  "verb-forms",
  "adjectives",
  "conditionals",
  "giving-receiving",
  "sentence-patterns",
  "conjunctions",
  "keigo",
  "expressions",
];

const CATEGORY_LABELS: Record<Category, string> = {
  particles: "Particles",
  "verb-forms": "Verb Forms",
  adjectives: "Adjectives",
  conditionals: "Conditionals",
  "giving-receiving": "Giving & Receiving",
  "sentence-patterns": "Sentence Patterns",
  conjunctions: "Conjunctions",
  keigo: "Keigo (Polite Language)",
  expressions: "Expressions",
};

interface CategoryGroup {
  category: Category;
  points: GrammarPoint[];
}

export default function LessonBrowser() {
  const { data } = useAppState();
  const [level, setLevel] = useState<Level>("N4");
  const furiganaMode = data.settings.furiganaMode;

  const n4Count = useMemo(
    () => allGrammarPoints.filter((p) => p.level === "N4").length,
    [],
  );
  const n5Count = useMemo(
    () => allGrammarPoints.filter((p) => p.level === "N5").length,
    [],
  );

  const groups = useMemo<CategoryGroup[]>(() => {
    const byCategory = new Map<Category, GrammarPoint[]>();
    for (const p of allGrammarPoints) {
      if (p.level !== level) continue;
      const list = byCategory.get(p.category);
      if (list) {
        list.push(p);
      } else {
        byCategory.set(p.category, [p]);
      }
    }
    const result: CategoryGroup[] = [];
    for (const category of CATEGORY_ORDER) {
      const points = byCategory.get(category);
      if (points && points.length > 0) {
        result.push({ category, points });
      }
    }
    return result;
  }, [level]);

  return (
    <div className="browse-root">
      <h1>Lessons</h1>

      <div className="browse-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={level === "N4"}
          className={
            level === "N4" ? "browse-tab browse-tab-active" : "browse-tab"
          }
          onClick={() => setLevel("N4")}
        >
          N4 ({n4Count})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={level === "N5"}
          className={
            level === "N5" ? "browse-tab browse-tab-active" : "browse-tab"
          }
          onClick={() => setLevel("N5")}
        >
          N5 ({n5Count})
        </button>
      </div>

      {groups.map(({ category, points }) => (
        <section key={category} className="browse-group">
          <h2>{CATEGORY_LABELS[category]}</h2>
          <div className="card browse-list">
            {points.map((p) => (
              <Link key={p.id} to={`/lessons/${p.id}`} className="browse-row">
                <span className="browse-row-main">
                  <span className="browse-row-title">
                    <Furigana text={p.title} mode={furiganaMode} />
                  </span>
                  <span className="browse-row-meaning">{p.meaning}</span>
                </span>
                <MasteryBadge
                  box={data.srs[p.id]?.box}
                  testedOut={data.srs[p.id]?.testedOut}
                />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// Multi-drill hub — replaces the single-purpose ConjugationDrill.tsx view.
// Three phases: "pick" (tile grid of all DRILLS), "setup" (per-drill options
// panel — only conjugation/vocab-recall have options), "run" (DrillRunner).
//
// Content-bank availability is detected generically by test-building one
// question from each drill's defaultOptions, so a drill only "lights up"
// once its bank actually has matching content — no further code change here
// needed if a bank is ever emptied or narrowed (e.g. by an options filter
// that matches nothing).

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import DrillRunner from "../components/DrillRunner";
import type { AdjForm, VerbClass, VerbForm } from "../content/types";
import {
  ADJ_FORM_LABELS,
  DRILLS,
  type DrillId,
  type DrillOptions,
  type DrillQuestion,
  describeStatKey,
  VERB_CLASS_LABELS,
  VERB_FORM_LABELS,
  type VocabRecallDirection,
} from "../engine/drills";
import { mulberry32 } from "../engine/rng";
import { useAppState } from "../state/AppStateContext";
import "../styles/drill.css";

const SESSION_SIZE = 10;
const DRILL_IDS = Object.keys(DRILLS) as DrillId[];

function isDrillId(value: string): value is DrillId {
  return (DRILL_IDS as string[]).includes(value);
}

/** Pure — builds one session's questions with a fresh time-seeded rng. */
function buildSession(
  id: DrillId,
  options: DrillOptions,
  count: number,
): DrillQuestion[] {
  const rng = mulberry32(Date.now() >>> 0);
  return DRILLS[id].build(options, rng, count);
}

type Phase = "pick" | "setup" | "run";

const VOCAB_DIRECTIONS: { value: VocabRecallDirection; label: string }[] = [
  { value: "ja-en", label: "JA → EN" },
  { value: "en-ja", label: "EN → JA" },
  { value: "both", label: "Both" },
];

export default function DrillHub() {
  const { data } = useAppState();
  const { drillId } = useParams<{ drillId: string }>();

  const [phase, setPhase] = useState<Phase>("pick");
  const [selectedId, setSelectedId] = useState<DrillId | null>(null);
  const [questions, setQuestions] = useState<DrillQuestion[]>([]);
  const [sessionKey, setSessionKey] = useState(0);

  // Conjugation setup state (mirrors the pre-hub ConjugationDrill defaults).
  const [conjKind, setConjKind] = useState<"verbs" | "adjectives">("verbs");
  const [conjClasses, setConjClasses] = useState<VerbClass[]>(() => {
    const defaults = DRILLS.conjugation.defaultOptions;
    return defaults.id === "conjugation" ? defaults.classes : [];
  });
  const [conjVerbForms, setConjVerbForms] = useState<VerbForm[]>(() => {
    const defaults = DRILLS.conjugation.defaultOptions;
    return defaults.id === "conjugation" ? defaults.verbForms : [];
  });
  const [conjAdjForms, setConjAdjForms] = useState<AdjForm[]>(() => {
    const defaults = DRILLS.conjugation.defaultOptions;
    return defaults.id === "conjugation" ? defaults.adjForms : [];
  });

  // Vocab recall setup state.
  const [vocabDirection, setVocabDirection] = useState<VocabRecallDirection>(
    () => {
      const defaults = DRILLS["vocab-recall"].defaultOptions;
      return defaults.id === "vocab-recall" ? defaults.direction : "both";
    },
  );

  const availability = useMemo(() => {
    const result = {} as Record<DrillId, boolean>;
    for (const id of DRILL_IDS) {
      result[id] =
        DRILLS[id].build(DRILLS[id].defaultOptions, mulberry32(1), 1).length >
        0;
    }
    return result;
  }, []);

  // Preselect a drill from the route (integrator wires /drills/:drillId).
  // An unknown or currently-unavailable id falls back to the picker.
  useEffect(() => {
    if (!drillId || !isDrillId(drillId) || !availability[drillId]) return;
    if (drillId === "particle" || drillId === "transitivity") {
      const qs = buildSession(drillId, DRILLS[drillId].defaultOptions, SESSION_SIZE);
      if (qs.length === 0) return;
      setSelectedId(drillId);
      setQuestions(qs);
      setSessionKey((k) => k + 1);
      setPhase("run");
    } else {
      setSelectedId(drillId);
      setPhase("setup");
    }
  }, [drillId, availability]);

  function toggle<T>(list: T[], item: T, set: (next: T[]) => void) {
    set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  }

  function buildOptionsFor(id: DrillId): DrillOptions {
    switch (id) {
      case "conjugation":
        return {
          id: "conjugation",
          kind: conjKind,
          classes: conjClasses,
          verbForms: conjVerbForms,
          adjForms: conjAdjForms,
        };
      case "vocab-recall":
        return { id: "vocab-recall", direction: vocabDirection };
      case "particle":
        return DRILLS.particle.defaultOptions;
      case "transitivity":
        return DRILLS.transitivity.defaultOptions;
    }
  }

  function selectDrill(id: DrillId) {
    if (!availability[id]) return;
    if (id === "particle" || id === "transitivity") {
      const qs = buildSession(id, DRILLS[id].defaultOptions, SESSION_SIZE);
      if (qs.length === 0) return;
      setSelectedId(id);
      setQuestions(qs);
      setSessionKey((k) => k + 1);
      setPhase("run");
    } else {
      setSelectedId(id);
      setPhase("setup");
    }
  }

  function startSelected() {
    if (!selectedId) return;
    const qs = buildSession(selectedId, buildOptionsFor(selectedId), SESSION_SIZE);
    if (qs.length === 0) return;
    setQuestions(qs);
    setSessionKey((k) => k + 1);
    setPhase("run");
  }

  function backToPicker() {
    setPhase("pick");
    setSelectedId(null);
  }

  function handleChangeSettings() {
    if (selectedId === "particle" || selectedId === "transitivity") {
      backToPicker();
    } else {
      setPhase("setup");
    }
  }

  const canStart =
    selectedId === "conjugation"
      ? conjKind === "verbs"
        ? conjClasses.length > 0 && conjVerbForms.length > 0
        : conjAdjForms.length > 0
      : true;

  const drillStatRows = useMemo(
    () =>
      Object.entries(data.drillStats)
        .map(([key, s]) => ({ key, ...s, total: s.correct + s.wrong }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 12),
    [data.drillStats],
  );

  if (phase === "run") {
    return (
      <DrillRunner
        key={sessionKey}
        questions={questions}
        onRestart={startSelected}
        onChangeSettings={handleChangeSettings}
      />
    );
  }

  if (phase === "setup" && selectedId) {
    const spec = DRILLS[selectedId];
    return (
      <div className="drill">
        <h1>{spec.title}</h1>
        <div className="card drill-setup">
          <button type="button" className="drill-back" onClick={backToPicker}>
            ← All drills
          </button>

          {selectedId === "conjugation" && (
            <>
              <div className="drill-tabs">
                <button
                  type="button"
                  className={
                    conjKind === "verbs"
                      ? "drill-tab drill-tab-active"
                      : "drill-tab"
                  }
                  onClick={() => setConjKind("verbs")}
                >
                  Verbs
                </button>
                <button
                  type="button"
                  className={
                    conjKind === "adjectives"
                      ? "drill-tab drill-tab-active"
                      : "drill-tab"
                  }
                  onClick={() => setConjKind("adjectives")}
                >
                  Adjectives
                </button>
              </div>

              {conjKind === "verbs" ? (
                <>
                  <h2>Verb classes</h2>
                  <div className="drill-options">
                    {(Object.keys(VERB_CLASS_LABELS) as VerbClass[]).map((c) => (
                      <label key={c} className="drill-option">
                        <input
                          type="checkbox"
                          checked={conjClasses.includes(c)}
                          onChange={() => toggle(conjClasses, c, setConjClasses)}
                        />
                        <span className="jp">{VERB_CLASS_LABELS[c]}</span>
                      </label>
                    ))}
                  </div>
                  <h2>Target forms</h2>
                  <div className="drill-options">
                    {(Object.keys(VERB_FORM_LABELS) as VerbForm[]).map((f) => (
                      <label key={f} className="drill-option">
                        <input
                          type="checkbox"
                          checked={conjVerbForms.includes(f)}
                          onChange={() =>
                            toggle(conjVerbForms, f, setConjVerbForms)
                          }
                        />
                        <span className="jp">{VERB_FORM_LABELS[f]}</span>
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2>Target forms（い/な adjectives mixed）</h2>
                  <div className="drill-options">
                    {(Object.keys(ADJ_FORM_LABELS) as AdjForm[]).map((f) => (
                      <label key={f} className="drill-option">
                        <input
                          type="checkbox"
                          checked={conjAdjForms.includes(f)}
                          onChange={() =>
                            toggle(conjAdjForms, f, setConjAdjForms)
                          }
                        />
                        <span className="jp">{ADJ_FORM_LABELS[f]}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {selectedId === "vocab-recall" && (
            <>
              <h2>Direction</h2>
              <div className="drill-tabs">
                {VOCAB_DIRECTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    className={
                      vocabDirection === value
                        ? "drill-tab drill-tab-active"
                        : "drill-tab"
                    }
                    onClick={() => setVocabDirection(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}

          <button
            type="button"
            className="primary drill-start"
            onClick={startSelected}
            disabled={!canStart}
          >
            Start — {SESSION_SIZE} questions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="drill">
      <h1>Drills</h1>
      <div className="drill-hub-grid">
        {DRILL_IDS.map((id) => {
          const spec = DRILLS[id];
          const available = availability[id];
          return (
            <button
              key={id}
              type="button"
              className={
                available ? "drill-tile" : "drill-tile drill-tile-disabled"
              }
              onClick={() => selectDrill(id)}
              disabled={!available}
            >
              <h2>{spec.title}</h2>
              <p>{spec.description}</p>
              {!available && (
                <p className="drill-tile-note">
                  No content yet — check back soon.
                </p>
              )}
            </button>
          );
        })}
      </div>

      {drillStatRows.length > 0 && (
        <div className="card drill-stats">
          <h2>Your drill accuracy</h2>
          <table>
            <thead>
              <tr>
                <th>Drill</th>
                <th>Answered</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {drillStatRows.map((row) => (
                <tr key={row.key}>
                  <td className="jp">{describeStatKey(row.key)}</td>
                  <td>{row.total}</td>
                  <td>{Math.round((row.correct / row.total) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

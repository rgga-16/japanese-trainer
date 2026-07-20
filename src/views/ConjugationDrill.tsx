import { useEffect, useMemo, useRef, useState } from "react";
import AnswerInput from "../components/AnswerInput";
import Furigana from "../components/Furigana";
import { allVocab } from "../content";
import type {
  AdjForm,
  VerbClass,
  VerbForm,
  VocabEntry,
} from "../content/types";
import { conjugateAdjective, conjugateVerb } from "../engine/conjugator";
import { gradeTyped } from "../engine/grader";
import { mulberry32, shuffle } from "../engine/rng";
import { useAppState } from "../state/AppStateContext";
import "../styles/drill.css";

const VERB_FORM_LABELS: Partial<Record<VerbForm, string>> = {
  masu: "ます形",
  te: "て形",
  ta: "た形（plain past）",
  nai: "ない形",
  nakatta: "なかった形",
  potential: "可能形",
  passive: "受身形",
  causative: "使役形",
  volitional: "意向形",
  imperative: "命令形",
  prohibitive: "禁止形（〜な）",
  ba: "ば形",
  tara: "たら形",
  tai: "たい形",
};

const ADJ_FORM_LABELS: Record<AdjForm, string> = {
  plain: "plain",
  negative: "negative（〜くない/じゃない）",
  past: "past（〜かった/だった）",
  "past-negative": "past negative",
  te: "て形",
  adverbial: "adverbial（〜く/に）",
  ba: "ば形",
  tara: "たら形",
};

const VERB_CLASS_LABELS: Record<VerbClass, string> = {
  godan: "godan（う-verbs）",
  ichidan: "ichidan（る-verbs）",
  suru: "する verbs",
  kuru: "来る",
};

const DEFAULT_VERB_FORMS: VerbForm[] = ["te", "ta", "nai", "potential"];
const SESSION_SIZE = 10;

interface DrillQuestion {
  entry: VocabEntry;
  formLabel: string;
  statKey: string;
  accepted: string; // furigana notation
}

interface AnsweredQuestion extends DrillQuestion {
  input: string;
  correct: boolean;
  expectedSurface: string;
}

type DrillKind = "verbs" | "adjectives";
type Phase = "setup" | "run" | "done";

function buildQuestions(
  kind: DrillKind,
  classes: VerbClass[],
  verbForms: VerbForm[],
  adjForms: AdjForm[],
): DrillQuestion[] {
  const rng = mulberry32(Date.now() >>> 0);
  const pool =
    kind === "verbs"
      ? allVocab.filter(
          (v) =>
            v.pos === "verb" && v.verbClass && classes.includes(v.verbClass),
        )
      : allVocab.filter((v) => v.pos === "i-adj" || v.pos === "na-adj");
  if (pool.length === 0) return [];

  const entries: VocabEntry[] = [];
  while (entries.length < SESSION_SIZE) {
    entries.push(...shuffle(pool, rng));
  }

  const questions: DrillQuestion[] = [];
  for (const entry of entries.slice(0, SESSION_SIZE)) {
    if (kind === "verbs") {
      const form = verbForms[Math.floor(rng() * verbForms.length)];
      questions.push({
        entry,
        formLabel: VERB_FORM_LABELS[form] ?? form,
        statKey: `${entry.verbClass}:${form}`,
        accepted: conjugateVerb(entry, form),
      });
    } else {
      const form = adjForms[Math.floor(rng() * adjForms.length)];
      questions.push({
        entry,
        formLabel: ADJ_FORM_LABELS[form],
        statKey: `${entry.pos}:${form}`,
        accepted: conjugateAdjective(entry, form),
      });
    }
  }
  return questions;
}

export default function ConjugationDrill() {
  const { data, recordDrill } = useAppState();
  const [phase, setPhase] = useState<Phase>("setup");
  const [kind, setKind] = useState<DrillKind>("verbs");
  const [classes, setClasses] = useState<VerbClass[]>(["godan", "ichidan"]);
  const [verbForms, setVerbForms] = useState<VerbForm[]>(DEFAULT_VERB_FORMS);
  const [adjForms, setAdjForms] = useState<AdjForm[]>([
    "negative",
    "past",
    "te",
  ]);
  const [questions, setQuestions] = useState<DrillQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<AnsweredQuestion[]>([]);
  const [feedback, setFeedback] = useState<AnsweredQuestion | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (feedback !== null) nextButtonRef.current?.focus();
  }, [feedback]);

  const canStart =
    kind === "verbs"
      ? classes.length > 0 && verbForms.length > 0
      : adjForms.length > 0;

  const drillStatRows = useMemo(
    () =>
      Object.entries(data.drillStats)
        .map(([key, s]) => ({ key, ...s, total: s.correct + s.wrong }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 12),
    [data.drillStats],
  );

  function toggle<T>(list: T[], item: T, set: (next: T[]) => void) {
    set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  }

  function start() {
    const qs = buildQuestions(kind, classes, verbForms, adjForms);
    if (qs.length === 0) return;
    setQuestions(qs);
    setIndex(0);
    setAnswered([]);
    setFeedback(null);
    setPhase("run");
  }

  function submit(input: string) {
    const q = questions[index];
    const result = gradeTyped(input, [q.accepted]);
    const item: AnsweredQuestion = {
      ...q,
      input,
      correct: result.correct,
      expectedSurface: result.closest,
    };
    recordDrill(q.statKey, result.correct);
    setAnswered((prev) => [...prev, item]);
    setFeedback(item);
  }

  function next() {
    setFeedback(null);
    if (index + 1 >= questions.length) {
      setPhase("done");
    } else {
      setIndex(index + 1);
    }
  }

  if (phase === "setup") {
    return (
      <div className="drill">
        <h1>Conjugation drills</h1>
        <div className="card drill-setup">
          <div className="drill-tabs">
            <button
              type="button"
              className={
                kind === "verbs" ? "drill-tab drill-tab-active" : "drill-tab"
              }
              onClick={() => setKind("verbs")}
            >
              Verbs
            </button>
            <button
              type="button"
              className={
                kind === "adjectives"
                  ? "drill-tab drill-tab-active"
                  : "drill-tab"
              }
              onClick={() => setKind("adjectives")}
            >
              Adjectives
            </button>
          </div>

          {kind === "verbs" ? (
            <>
              <h2>Verb classes</h2>
              <div className="drill-options">
                {(Object.keys(VERB_CLASS_LABELS) as VerbClass[]).map((c) => (
                  <label key={c} className="drill-option">
                    <input
                      type="checkbox"
                      checked={classes.includes(c)}
                      onChange={() => toggle(classes, c, setClasses)}
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
                      checked={verbForms.includes(f)}
                      onChange={() => toggle(verbForms, f, setVerbForms)}
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
                      checked={adjForms.includes(f)}
                      onChange={() => toggle(adjForms, f, setAdjForms)}
                    />
                    <span className="jp">{ADJ_FORM_LABELS[f]}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          <button
            type="button"
            className="primary drill-start"
            onClick={start}
            disabled={!canStart}
          >
            Start — {SESSION_SIZE} questions
          </button>
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
                    <td className="jp">{row.key}</td>
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

  if (phase === "done") {
    const correctCount = answered.filter((a) => a.correct).length;
    return (
      <div className="drill">
        <h1>Drill complete</h1>
        <div className="card">
          <p className="drill-score">
            {correctCount} / {answered.length} correct
          </p>
          <ul className="drill-summary">
            {answered.map((a, i) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: static result list
                key={i}
                className={a.correct ? "drill-row-ok" : "drill-row-bad"}
              >
                <span>{a.correct ? "✓" : "✗"}</span>
                <Furigana text={a.entry.ja} mode={data.settings.furiganaMode} />
                <span className="drill-form jp">{a.formLabel}</span>
                <span className="jp">
                  {a.correct
                    ? a.input
                    : `${a.input || "—"} → ${a.expectedSurface}`}
                </span>
              </li>
            ))}
          </ul>
          <div className="drill-actions">
            <button type="button" className="primary" onClick={start}>
              Again
            </button>
            <button type="button" onClick={() => setPhase("setup")}>
              Change settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[index];
  return (
    <div className="drill">
      <div className="drill-progress">
        {index + 1} / {questions.length}
      </div>
      <div className="card drill-question">
        <div className="drill-prompt">
          <Furigana
            text={q.entry.ja}
            mode={data.settings.furiganaMode}
            className="drill-word"
          />
          <span className="drill-gloss">{q.entry.en}</span>
        </div>
        <p className="drill-target">
          → <span className="jp">{q.formLabel}</span>
        </p>
        {feedback === null ? (
          <AnswerInput
            key={index}
            onSubmit={submit}
            placeholder="答えを入力…"
          />
        ) : (
          <div
            className={
              feedback.correct
                ? "drill-feedback drill-fb-ok"
                : "drill-feedback drill-fb-bad"
            }
          >
            <p>
              {feedback.correct ? "正解！" : "残念…"}{" "}
              <span className="jp drill-expected">
                <Furigana
                  text={feedback.accepted}
                  mode={data.settings.furiganaMode}
                />
              </span>
            </p>
            <button
              type="button"
              className="primary"
              onClick={next}
              ref={nextButtonRef}
            >
              {index + 1 >= questions.length ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

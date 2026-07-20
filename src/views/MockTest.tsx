import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../components/Countdown";
import Furigana from "../components/Furigana";
import type {
  McqExercise,
  MockPassage,
  OrderingExercise,
} from "../content/types";
import { stripFurigana } from "../engine/furigana";
import {
  buildMockTest,
  MOCK_DURATION_SEC,
  type MockTestPlan,
} from "../engine/mockBuilder";
import { hashSeed, mulberry32, shuffle } from "../engine/rng";
import { useAppState } from "../state/AppStateContext";
import type { ExerciseResult, FuriganaMode, MockResult } from "../state/types";
import "../styles/mock.css";

type QuestionItem =
  | { section: "completion"; sectionIndex: number; exercise: McqExercise }
  | { section: "ordering"; sectionIndex: number; exercise: OrderingExercise }
  | { section: "passage"; sectionIndex: number; exercise: McqExercise };

interface QuestionGrade {
  item: QuestionItem;
  chosenIndex: number | undefined;
  correct: boolean;
}

function buildQuestions(plan: MockTestPlan): QuestionItem[] {
  const items: QuestionItem[] = [];
  plan.completion.forEach((exercise, sectionIndex) => {
    items.push({ section: "completion", sectionIndex, exercise });
  });
  plan.ordering.forEach((exercise, sectionIndex) => {
    items.push({ section: "ordering", sectionIndex, exercise });
  });
  plan.passage.gaps.forEach((exercise, sectionIndex) => {
    items.push({ section: "passage", sectionIndex, exercise });
  });
  return items;
}

function correctIndexFor(item: QuestionItem): number {
  if (item.section === "ordering") return item.exercise.starIndex;
  return item.exercise.correctIndex;
}

function gradeQuestions(
  questions: QuestionItem[],
  answers: Record<string, number>,
): QuestionGrade[] {
  return questions.map((item) => {
    const chosenIndex = answers[item.exercise.id];
    const correct =
      chosenIndex !== undefined && chosenIndex === correctIndexFor(item);
    return { item, chosenIndex, correct };
  });
}

function sectionLabel(section: QuestionItem["section"]): string {
  switch (section) {
    case "completion":
      return "問題1 文法形式の判断";
    case "ordering":
      return "問題2 文の組み立て";
    case "passage":
      return "問題3 文章の文法";
  }
}

function optionText(item: QuestionItem, index: number): string {
  if (item.section === "ordering") return item.exercise.segments[index];
  return item.exercise.choices[index];
}

function reviewQuestionText(item: QuestionItem): string {
  if (item.section === "ordering") {
    const ex = item.exercise;
    return [ex.lead, ...ex.segments, ex.tail]
      .filter((s): s is string => Boolean(s))
      .join("");
  }
  return item.exercise.question;
}

interface McqChoicesProps {
  choices: string[];
  selected: number | undefined;
  furiganaMode: FuriganaMode;
  onSelect: (index: number) => void;
}

function McqChoices({
  choices,
  selected,
  furiganaMode,
  onSelect,
}: McqChoicesProps) {
  return (
    <div className="mock-choice-list">
      {choices.map((choice, i) => (
        <button
          key={choice}
          type="button"
          className={
            i === selected ? "mock-choice mock-choice-selected" : "mock-choice"
          }
          onClick={() => onSelect(i)}
        >
          <Furigana text={choice} mode={furiganaMode} />
        </button>
      ))}
    </div>
  );
}

interface OrderingQuestionProps {
  exercise: OrderingExercise;
  selected: number | undefined;
  furiganaMode: FuriganaMode;
  onSelect: (index: number) => void;
}

function OrderingQuestion({
  exercise,
  selected,
  furiganaMode,
  onSelect,
}: OrderingQuestionProps) {
  const shuffledIndices = useMemo(
    () =>
      shuffle(
        exercise.segments.map((_, i) => i),
        mulberry32(hashSeed(exercise.id)),
      ),
    [exercise.id, exercise.segments],
  );

  return (
    <div>
      <div className="mock-ordering-slots jp">
        {exercise.lead && <Furigana text={exercise.lead} mode={furiganaMode} />}
        {exercise.segments.map((_, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: slots are positional by definition
            key={`slot-${exercise.id}-${i}`}
            className={
              i === exercise.starIndex
                ? "mock-slot mock-slot-star"
                : "mock-slot"
            }
          >
            {i === exercise.starIndex ? "★" : "＿"}
          </span>
        ))}
        {exercise.tail && <Furigana text={exercise.tail} mode={furiganaMode} />}
      </div>
      <div className="mock-choice-list">
        {shuffledIndices.map((originalIndex) => (
          <button
            key={originalIndex}
            type="button"
            className={
              originalIndex === selected
                ? "mock-choice mock-choice-selected"
                : "mock-choice"
            }
            onClick={() => onSelect(originalIndex)}
          >
            <Furigana
              text={exercise.segments[originalIndex]}
              mode={furiganaMode}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

interface PassageQuestionProps {
  passage: MockPassage;
  gapNumber: number;
  exercise: McqExercise;
  selected: number | undefined;
  furiganaMode: FuriganaMode;
  onSelect: (index: number) => void;
}

function highlightGap(
  paragraph: string,
  gapNumber: number,
  furiganaMode: FuriganaMode,
) {
  const marker = `［${gapNumber}］`;
  const idx = paragraph.indexOf(marker);
  if (idx === -1) {
    return <Furigana text={paragraph} mode={furiganaMode} />;
  }
  const before = paragraph.slice(0, idx);
  const after = paragraph.slice(idx + marker.length);
  return (
    <>
      <Furigana text={before} mode={furiganaMode} />
      <mark className="mock-gap-marker">{marker}</mark>
      <Furigana text={after} mode={furiganaMode} />
    </>
  );
}

function PassageQuestion({
  passage,
  gapNumber,
  exercise,
  selected,
  furiganaMode,
  onSelect,
}: PassageQuestionProps) {
  return (
    <div>
      <h3 className="mock-passage-title jp">
        <Furigana text={passage.title} mode={furiganaMode} />
      </h3>
      {passage.paragraphsJa.map((para) => (
        <p key={para} className="mock-passage-paragraph jp">
          {highlightGap(para, gapNumber, furiganaMode)}
        </p>
      ))}
      <p className="mock-question-text jp">
        <Furigana text={exercise.question} mode={furiganaMode} />
      </p>
      <McqChoices
        choices={exercise.choices}
        selected={selected}
        furiganaMode={furiganaMode}
        onSelect={onSelect}
      />
    </div>
  );
}

export default function MockTest() {
  const { data, recordMock, recordResults } = useAppState();
  const [phase, setPhase] = useState<"intro" | "test" | "result">("intro");
  const [plan, setPlan] = useState<MockTestPlan | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [durationSec, setDurationSec] = useState<number | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const recordedRef = useRef(false);

  const furiganaMode = data.settings.furiganaMode;

  const questions = useMemo(() => (plan ? buildQuestions(plan) : []), [plan]);
  const grades = useMemo(
    () => gradeQuestions(questions, answers),
    [questions, answers],
  );
  const score = grades.filter((g) => g.correct).length;
  const perSection = useMemo(() => {
    const sections: MockResult["perSection"] = {
      completion: { correct: 0, total: 0 },
      ordering: { correct: 0, total: 0 },
      cloze: { correct: 0, total: 0 },
    };
    for (const g of grades) {
      const key = g.item.section === "passage" ? "cloze" : g.item.section;
      sections[key].total += 1;
      if (g.correct) sections[key].correct += 1;
    }
    return sections;
  }, [grades]);
  const wrongQuestionIds = grades
    .filter((g) => !g.correct)
    .map((g) => g.item.exercise.id);

  useEffect(() => {
    if (
      phase !== "result" ||
      !plan ||
      durationSec === null ||
      recordedRef.current
    )
      return;
    recordedRef.current = true;
    const nowIso = new Date().toISOString();

    recordMock({
      at: nowIso,
      score,
      max: questions.length,
      perSection,
      durationSec,
      wrongQuestionIds,
    });

    const results: ExerciseResult[] = grades.map((g) => ({
      exerciseId: g.item.exercise.id,
      grammarPointId: g.item.exercise.grammarPointId,
      kind: g.item.section === "ordering" ? "ordering" : "mcq",
      correct: g.correct,
      at: nowIso,
      mode: "mock",
    }));
    recordResults(results);
    // recordedRef guards against double-recording, so the wider dependency
    // list (identities change per render) can't cause duplicate writes.
  }, [
    phase,
    plan,
    durationSec,
    score,
    perSection,
    wrongQuestionIds,
    grades,
    questions.length,
    recordMock,
    recordResults,
  ]);

  function startTest() {
    const newPlan = buildMockTest(Date.now() >>> 0);
    setPlan(newPlan);
    setAnswers({});
    setCurrent(0);
    setDurationSec(null);
    setShowSubmitConfirm(false);
    recordedRef.current = false;
    setStartedAt(Date.now());
    setPhase("test");
  }

  function selectAnswer(exerciseId: string, choiceIndex: number) {
    setAnswers((prev) => ({ ...prev, [exerciseId]: choiceIndex }));
  }

  function finishTest(auto: boolean) {
    const elapsedSec =
      startedAt !== null
        ? Math.round((Date.now() - startedAt) / 1000)
        : MOCK_DURATION_SEC;
    const finalDuration = auto
      ? MOCK_DURATION_SEC
      : Math.min(MOCK_DURATION_SEC, Math.max(0, elapsedSec));
    setDurationSec(finalDuration);
    setShowSubmitConfirm(false);
    setPhase("result");
  }

  function handleSubmitClick() {
    const unanswered = questions.length - Object.keys(answers).length;
    if (unanswered > 0 && !showSubmitConfirm) {
      setShowSubmitConfirm(true);
      return;
    }
    finishTest(false);
  }

  if (phase === "intro") {
    const pastBest =
      data.mockResults.length > 0
        ? Math.max(...data.mockResults.map((r) => r.score))
        : null;
    const pastMax =
      data.mockResults.length > 0
        ? data.mockResults[data.mockResults.length - 1].max
        : 25;

    return (
      <div className="mock-intro">
        <h1>模擬テスト</h1>
        <div className="card mock-rules-card">
          <ul>
            <li>25 questions · 25 minutes</li>
            <li>3 sections mirroring the real N4 grammar section</li>
            <li>Auto-submits when the timer hits 0:00</li>
            <li>No feedback until you finish</li>
          </ul>
        </div>
        {pastBest !== null && (
          <p className="mock-past-best">
            Your best score so far: {pastBest}/{pastMax}
          </p>
        )}
        <button type="button" className="primary" onClick={startTest}>
          Start
        </button>
        <p className="mock-history-link">
          <Link to="/mock/results">View past attempts</Link>
        </p>
      </div>
    );
  }

  if (phase === "test" && plan) {
    const item = questions[current];
    const isLast = current === questions.length - 1;
    const answeredCount = Object.keys(answers).length;
    const unanswered = questions.length - answeredCount;
    const selected = answers[item.exercise.id];

    return (
      <div className="mock-test">
        <div className="mock-test-header">
          <div className="mock-section-label">{sectionLabel(item.section)}</div>
          <Countdown
            seconds={MOCK_DURATION_SEC}
            running
            onExpire={() => finishTest(true)}
          />
        </div>

        <div className="mock-question card">
          <div className="mock-question-number">
            Question {current + 1} / {questions.length}
          </div>

          {item.section === "completion" && (
            <>
              <p className="mock-question-text jp">
                <Furigana text={item.exercise.question} mode={furiganaMode} />
              </p>
              <McqChoices
                choices={item.exercise.choices}
                selected={selected}
                furiganaMode={furiganaMode}
                onSelect={(i) => selectAnswer(item.exercise.id, i)}
              />
            </>
          )}

          {item.section === "ordering" && (
            <OrderingQuestion
              exercise={item.exercise}
              selected={selected}
              furiganaMode={furiganaMode}
              onSelect={(i) => selectAnswer(item.exercise.id, i)}
            />
          )}

          {item.section === "passage" && (
            <PassageQuestion
              passage={plan.passage}
              gapNumber={item.sectionIndex + 1}
              exercise={item.exercise}
              selected={selected}
              furiganaMode={furiganaMode}
              onSelect={(i) => selectAnswer(item.exercise.id, i)}
            />
          )}
        </div>

        {item.section === "ordering" && item.sectionIndex === 0 && (
          <p className="mock-hint card">
            How this question type works: the sentence has a ★ blank. Pick the
            choice below that correctly fills that ★ position when the whole
            sentence is put in order.
          </p>
        )}

        <div className="mock-nav">
          <button
            type="button"
            disabled={current === 0}
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          >
            Prev
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() =>
                setCurrent((c) => Math.min(questions.length - 1, c + 1))
              }
            >
              Next
            </button>
          )}
          {isLast && (
            <button
              type="button"
              className="primary"
              onClick={handleSubmitClick}
            >
              Submit test
            </button>
          )}
        </div>

        <div className="mock-jump-strip">
          <div className="mock-jump-grid">
            {questions.map((q, i) => {
              const answered = answers[q.exercise.id] !== undefined;
              let cls = "mock-jump-btn";
              if (i === current) cls += " mock-jump-btn-current";
              if (answered) cls += " mock-jump-btn-answered";
              return (
                <button
                  key={q.exercise.id}
                  type="button"
                  className={cls}
                  onClick={() => setCurrent(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="mock-jump-footer">
            <span>
              {answeredCount}/{questions.length} answered
            </span>
            <button
              type="button"
              className="primary"
              onClick={handleSubmitClick}
            >
              Submit test
            </button>
          </div>
          {showSubmitConfirm && (
            <div className="mock-submit-confirm">
              <span>{unanswered} unanswered — submit anyway?</span>
              <button
                type="button"
                className="primary"
                onClick={() => finishTest(false)}
              >
                Submit anyway
              </button>
              <button type="button" onClick={() => setShowSubmitConfirm(false)}>
                Keep answering
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === "result" && plan && durationSec !== null) {
    return (
      <div className="mock-result">
        <h1>
          {score} / {questions.length}
        </h1>
        <table className="mock-breakdown-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>問題1 文法形式の判断</td>
              <td>
                {perSection.completion.correct}/{perSection.completion.total}
              </td>
            </tr>
            <tr>
              <td>問題2 文の組み立て</td>
              <td>
                {perSection.ordering.correct}/{perSection.ordering.total}
              </td>
            </tr>
            <tr>
              <td>問題3 文章の文法</td>
              <td>
                {perSection.cloze.correct}/{perSection.cloze.total}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mock-guidance">
          The real N4 grammar section needs roughly 50% — aim for 70%+ here.
        </p>

        <h2>Review</h2>
        <ol className="mock-review-list">
          {grades.map((g, i) => {
            const explanation =
              "explanation" in g.item.exercise
                ? g.item.exercise.explanation
                : undefined;
            const yourAnswer =
              g.chosenIndex !== undefined
                ? stripFurigana(optionText(g.item, g.chosenIndex))
                : "(no answer)";
            const correctAnswer = stripFurigana(
              optionText(g.item, correctIndexFor(g.item)),
            );
            return (
              <li
                key={g.item.exercise.id}
                className={
                  g.correct
                    ? "mock-review-item mock-review-correct"
                    : "mock-review-item mock-review-wrong"
                }
              >
                <div className="mock-review-question jp">
                  <span className="mock-review-number">{i + 1}.</span>{" "}
                  <Furigana
                    text={reviewQuestionText(g.item)}
                    mode={furiganaMode}
                  />
                </div>
                <div className="mock-review-answers">
                  <span>Your answer: {yourAnswer}</span>
                  <span>Correct answer: {correctAnswer}</span>
                </div>
                {explanation && (
                  <p className="mock-review-explanation">{explanation}</p>
                )}
                <Link to={`/lessons/${g.item.exercise.grammarPointId}`}>
                  Review lesson
                </Link>
              </li>
            );
          })}
        </ol>

        <button type="button" className="primary" onClick={startTest}>
          Take another mock test
        </button>
      </div>
    );
  }

  return null;
}

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../components/Countdown";
import Furigana from "../components/Furigana";
import { CONTENT_REVISION } from "../content";
import type {
  McqExercise,
  MockPassage,
  OrderingExercise,
  ReadingPassage,
  ReadingQuestion,
  VocabQuestion,
} from "../content/types";
import { stripFurigana } from "../engine/furigana";
import {
  isFormatAvailable,
  MOCK_FORMATS,
  MOCK_SECTION_LABELS,
  MOCK_SECTION_ORDER,
  type MockFormatId,
  type MockTestPlan,
  buildMockTest,
} from "../engine/mockBuilder";
import { buildMockPaper, MOCK_PAPERS, type MockPaper } from "../engine/mockPapers";
import { useAppState } from "../state/AppStateContext";
import {
  META_READING_POINT_ID,
  META_VOCAB_POINT_ID,
} from "../state/types";
import type { ExerciseResult, FuriganaMode, MockResult } from "../state/types";
import "../styles/mock.css";

const FORMAT_ORDER: MockFormatId[] = ["short", "standard", "full"];

type QuestionItem =
  | { section: "vocab"; question: VocabQuestion }
  | { section: "completion"; question: McqExercise }
  | {
      section: "ordering";
      question: OrderingExercise;
      displayOrder: number[];
    }
  | {
      section: "passage";
      passage: MockPassage;
      gapNumber: number;
      question: McqExercise;
    }
  | {
      section: "reading";
      passage: ReadingPassage;
      questionNumber: number;
      question: ReadingQuestion;
    };

interface QuestionGrade {
  item: QuestionItem;
  chosenIndex: number | undefined;
  correct: boolean;
}

/** Flattens the plan's ordered `sections` array into one question per gradable item. */
function buildQuestions(plan: MockTestPlan): QuestionItem[] {
  const items: QuestionItem[] = [];
  for (const section of plan.sections) {
    switch (section.kind) {
      case "vocab":
        for (const question of section.questions) {
          items.push({ section: "vocab", question });
        }
        break;
      case "completion":
        for (const question of section.questions) {
          items.push({ section: "completion", question });
        }
        break;
      case "ordering":
        section.questions.forEach((question, i) => {
          items.push({
            section: "ordering",
            question,
            displayOrder: section.displayOrders[i],
          });
        });
        break;
      case "passage":
        section.passage.gaps.forEach((question, i) => {
          items.push({
            section: "passage",
            passage: section.passage,
            gapNumber: i + 1,
            question,
          });
        });
        break;
      case "reading":
        section.passage.questions.forEach((question, i) => {
          items.push({
            section: "reading",
            passage: section.passage,
            questionNumber: i + 1,
            question,
          });
        });
        break;
      default: {
        const _exhaustive: never = section;
        void _exhaustive;
      }
    }
  }
  return items;
}

function correctIndexFor(item: QuestionItem): number {
  if (item.section === "ordering") return item.question.starIndex;
  return item.question.correctIndex;
}

function optionText(item: QuestionItem, index: number): string {
  if (item.section === "ordering") return item.question.segments[index];
  return item.question.choices[index];
}

function reviewQuestionText(item: QuestionItem): string {
  if (item.section === "ordering") {
    const ex = item.question;
    return [ex.lead, ...ex.segments, ex.tail]
      .filter((s): s is string => Boolean(s))
      .join("");
  }
  return item.question.question;
}

function explanationFor(item: QuestionItem): string | undefined {
  if (item.section === "ordering") return undefined;
  return item.question.explanation;
}

/**
 * Mode for the QUESTION PROMPT only — see `choiceFuriganaModeFor` below for
 * the (independent) mode used on a vocab question's choices. Vocab 漢字読み
 * (style "reading") prompts are authored WITH furigana brackets, so the
 * renderer must force "hidden" here or the ruby text prints the answer above
 * the word. Every other section/style keeps the user's own setting.
 */
export function furiganaModeFor(item: QuestionItem, base: FuriganaMode): FuriganaMode {
  if (item.section === "vocab" && item.question.style === "reading") {
    return "hidden";
  }
  return base;
}

/**
 * Mode for a vocab question's CHOICES, computed independently of
 * `furiganaModeFor` (the prompt mode) because the two styles that need
 * suppressing differ in WHERE their furigana lives:
 *  - "orthography" (表記): the prompt states the target word in bare kana and
 *    the choices are candidate kanji spellings, each authored WITH its own
 *    furigana reading (see src/content/vocabq/batch1.ts) — showing that ruby
 *    hands the learner the reading the prompt is testing, with no kanji
 *    knowledge required to eliminate distractors.
 *  - "reading" (漢字読み): the choices are already bare kana with no brackets,
 *    so forcing "hidden" here is a harmless no-op. It's included anyway so
 *    this helper stays symmetric with `furiganaModeFor` instead of only
 *    special-casing "orthography".
 * Every other vocab style ("context", "paraphrase") and every non-vocab
 * section returns `base` unchanged.
 */
export function choiceFuriganaModeFor(item: QuestionItem, base: FuriganaMode): FuriganaMode {
  if (
    item.section === "vocab" &&
    (item.question.style === "reading" || item.question.style === "orthography")
  ) {
    return "hidden";
  }
  return base;
}

function grammarPointIdFor(item: QuestionItem): string {
  switch (item.section) {
    case "vocab":
      return META_VOCAB_POINT_ID;
    case "reading":
      return META_READING_POINT_ID;
    default:
      return item.question.grammarPointId;
  }
}

function resultKindFor(item: QuestionItem): ExerciseResult["kind"] {
  switch (item.section) {
    case "vocab":
      return "vocab";
    case "reading":
      return "reading";
    case "ordering":
      return "ordering";
    case "completion":
    case "passage":
      return "mcq";
  }
}

function gradeQuestions(
  questions: QuestionItem[],
  answers: Record<string, number>,
): QuestionGrade[] {
  return questions.map((item) => {
    const chosenIndex = answers[item.question.id];
    const correct =
      chosenIndex !== undefined && chosenIndex === correctIndexFor(item);
    return { item, chosenIndex, correct };
  });
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
  displayOrder: number[];
  selected: number | undefined;
  furiganaMode: FuriganaMode;
  onSelect: (index: number) => void;
}

function OrderingQuestion({
  exercise,
  displayOrder,
  selected,
  furiganaMode,
  onSelect,
}: OrderingQuestionProps) {
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
        {displayOrder.map((originalIndex) => (
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

interface ReadingQuestionCardProps {
  passage: ReadingPassage;
  questionNumber: number;
  question: ReadingQuestion;
  selected: number | undefined;
  furiganaMode: FuriganaMode;
  onSelect: (index: number) => void;
}

function ReadingQuestionCard({
  passage,
  questionNumber,
  question,
  selected,
  furiganaMode,
  onSelect,
}: ReadingQuestionCardProps) {
  return (
    <div>
      <h3 className="mock-passage-title jp">
        <Furigana text={passage.title} mode={furiganaMode} />
      </h3>
      {passage.paragraphsJa.map((para) => (
        <p key={para} className="mock-passage-paragraph jp">
          <Furigana text={para} mode={furiganaMode} />
        </p>
      ))}
      <p className="mock-question-text jp">
        <span className="mock-review-number">{questionNumber}.</span>{" "}
        <Furigana text={question.question} mode={furiganaMode} />
      </p>
      <McqChoices
        choices={question.choices}
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
  const [startError, setStartError] = useState<string | null>(null);
  const recordedRef = useRef(false);

  const furiganaMode = data.settings.furiganaMode;

  const questions = useMemo(() => (plan ? buildQuestions(plan) : []), [plan]);
  const grades = useMemo(
    () => gradeQuestions(questions, answers),
    [questions, answers],
  );
  const score = grades.filter((g) => g.correct).length;
  const perSection = useMemo(() => {
    const sections: MockResult["perSection"] = {};
    for (const g of grades) {
      const key = g.item.section;
      const existing = sections[key] ?? { correct: 0, total: 0 };
      existing.total += 1;
      if (g.correct) existing.correct += 1;
      sections[key] = existing;
    }
    return sections;
  }, [grades]);
  const wrongQuestionIds = grades
    .filter((g) => !g.correct)
    .map((g) => g.item.question.id);

  const firstIndexBySection = useMemo(() => {
    const map = new Map<QuestionItem["section"], number>();
    questions.forEach((q, i) => {
      if (!map.has(q.section)) map.set(q.section, i);
    });
    return map;
  }, [questions]);

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
      formatId: plan.formatId,
      paperId: plan.paperId,
      contentRevision: CONTENT_REVISION,
    });

    const results: ExerciseResult[] = grades.map((g) => ({
      exerciseId: g.item.question.id,
      grammarPointId: grammarPointIdFor(g.item),
      kind: resultKindFor(g.item),
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

  function startWithPlan(newPlan: MockTestPlan) {
    setPlan(newPlan);
    setAnswers({});
    setCurrent(0);
    setDurationSec(null);
    setShowSubmitConfirm(false);
    setStartError(null);
    recordedRef.current = false;
    setStartedAt(Date.now());
    setPhase("test");
  }

  function startFormat(formatId: MockFormatId) {
    try {
      startWithPlan(buildMockTest(Date.now() >>> 0, formatId));
    } catch (err) {
      setStartError(
        err instanceof Error
          ? err.message
          : "Couldn't build this mock test — try another format.",
      );
    }
  }

  function startPaper(paper: MockPaper) {
    try {
      startWithPlan(buildMockPaper(paper));
    } catch (err) {
      setStartError(
        err instanceof Error
          ? err.message
          : "Couldn't build this paper — try another one.",
      );
    }
  }

  function selectAnswer(questionId: string, choiceIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  }

  function finishTest(auto: boolean) {
    if (!plan) return;
    const elapsedSec =
      startedAt !== null
        ? Math.round((Date.now() - startedAt) / 1000)
        : plan.durationSec;
    const finalDuration = auto
      ? plan.durationSec
      : Math.min(plan.durationSec, Math.max(0, elapsedSec));
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
    const bestResult =
      data.mockResults.length > 0
        ? data.mockResults.reduce((best, r) =>
            r.score / r.max > best.score / best.max ? r : best,
          )
        : null;

    return (
      <div className="mock-intro">
        <h1>模擬テスト</h1>
        <div className="card mock-rules-card">
          <ul>
            <li>Choose a format below, or a named paper (模試1〜6)</li>
            <li>Auto-submits when the timer hits 0:00</li>
            <li>No feedback until you finish</li>
            <li>
              A named paper uses a fixed seed, so retaking it is a repeatable,
              comparable test. A plain format is randomly seeded fresh every
              time.
            </li>
          </ul>
        </div>
        {bestResult !== null && (
          <p className="mock-past-best">
            Your best score so far: {bestResult.score}/{bestResult.max}
          </p>
        )}
        {startError && <div className="card mock-start-error">{startError}</div>}

        <section className="mock-picker-section">
          <h2>Choose a format</h2>
          <div className="mock-format-grid">
            {FORMAT_ORDER.map((id) => {
              const format = MOCK_FORMATS[id];
              const available = isFormatAvailable(id);
              return (
                <button
                  key={id}
                  type="button"
                  className="mock-format-card"
                  disabled={!available}
                  onClick={() => startFormat(id)}
                >
                  <span className="mock-format-title">
                    {format.label} · {format.labelJa}
                  </span>
                  <span className="mock-format-meta">
                    {format.questionCount} questions ·{" "}
                    {Math.round(format.durationSec / 60)} min
                  </span>
                  {!available && (
                    <span className="mock-format-unavailable">
                      Not available yet — more content is coming for this
                      format.
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mock-picker-section">
          <h2>Named papers</h2>
          <div className="mock-paper-grid">
            {MOCK_PAPERS.map((paper) => {
              const available = isFormatAvailable(paper.formatId);
              return (
                <button
                  key={paper.id}
                  type="button"
                  className="mock-paper-card"
                  disabled={!available}
                  onClick={() => startPaper(paper)}
                >
                  <span className="mock-format-title">{paper.label}</span>
                  <span className="mock-format-meta">
                    {MOCK_FORMATS[paper.formatId].label}
                  </span>
                  {!available && (
                    <span className="mock-format-unavailable">
                      Not available yet
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

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
    const selected = answers[item.question.id];
    const itemFuriganaMode = furiganaModeFor(item, furiganaMode);
    const choiceMode = choiceFuriganaModeFor(item, furiganaMode);
    const showOrderingHint =
      item.section === "ordering" &&
      current === firstIndexBySection.get("ordering");

    return (
      <div className="mock-test">
        <div className="mock-test-header">
          <div className="mock-section-label">
            {MOCK_SECTION_LABELS[item.section]}
          </div>
          <Countdown
            seconds={plan.durationSec}
            running
            onExpire={() => finishTest(true)}
          />
        </div>

        <div className="mock-question card">
          <div className="mock-question-number">
            Question {current + 1} / {questions.length}
          </div>

          {item.section === "vocab" && (
            <>
              <p className="mock-question-text jp">
                <Furigana text={item.question.question} mode={itemFuriganaMode} />
              </p>
              <McqChoices
                choices={item.question.choices}
                selected={selected}
                furiganaMode={choiceMode}
                onSelect={(i) => selectAnswer(item.question.id, i)}
              />
            </>
          )}

          {item.section === "completion" && (
            <>
              <p className="mock-question-text jp">
                <Furigana text={item.question.question} mode={itemFuriganaMode} />
              </p>
              <McqChoices
                choices={item.question.choices}
                selected={selected}
                furiganaMode={itemFuriganaMode}
                onSelect={(i) => selectAnswer(item.question.id, i)}
              />
            </>
          )}

          {item.section === "ordering" && (
            <OrderingQuestion
              exercise={item.question}
              displayOrder={item.displayOrder}
              selected={selected}
              furiganaMode={itemFuriganaMode}
              onSelect={(i) => selectAnswer(item.question.id, i)}
            />
          )}

          {item.section === "passage" && (
            <PassageQuestion
              passage={item.passage}
              gapNumber={item.gapNumber}
              exercise={item.question}
              selected={selected}
              furiganaMode={itemFuriganaMode}
              onSelect={(i) => selectAnswer(item.question.id, i)}
            />
          )}

          {item.section === "reading" && (
            <ReadingQuestionCard
              passage={item.passage}
              questionNumber={item.questionNumber}
              question={item.question}
              selected={selected}
              furiganaMode={itemFuriganaMode}
              onSelect={(i) => selectAnswer(item.question.id, i)}
            />
          )}
        </div>

        {showOrderingHint && (
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
              const answered = answers[q.question.id] !== undefined;
              let cls = "mock-jump-btn";
              if (i === current) cls += " mock-jump-btn-current";
              if (answered) cls += " mock-jump-btn-answered";
              return (
                <button
                  key={q.question.id}
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
            {MOCK_SECTION_ORDER.filter((key) => perSection[key]).map(
              (key) => (
                <tr key={key}>
                  <td>{MOCK_SECTION_LABELS[key]}</td>
                  <td>
                    {perSection[key]?.correct ?? 0}/{perSection[key]?.total ?? 0}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
        <p className="mock-guidance">
          The real N4 grammar section needs roughly 50% — aim for 70%+ here.
        </p>

        <h2>Review</h2>
        <ol className="mock-review-list">
          {grades.map((g, i) => {
            const explanation = explanationFor(g.item);
            const reviewFuriganaMode = furiganaModeFor(g.item, furiganaMode);
            const yourAnswer =
              g.chosenIndex !== undefined
                ? stripFurigana(optionText(g.item, g.chosenIndex))
                : "(no answer)";
            const correctAnswer = stripFurigana(
              optionText(g.item, correctIndexFor(g.item)),
            );
            const gpId = grammarPointIdFor(g.item);
            const showLessonLink =
              gpId !== META_VOCAB_POINT_ID && gpId !== META_READING_POINT_ID;
            return (
              <li
                key={g.item.question.id}
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
                    mode={reviewFuriganaMode}
                  />
                </div>
                <div className="mock-review-answers">
                  <span>Your answer: {yourAnswer}</span>
                  <span>Correct answer: {correctAnswer}</span>
                </div>
                {explanation && (
                  <p className="mock-review-explanation">{explanation}</p>
                )}
                {showLessonLink && (
                  <Link to={`/lessons/${gpId}`}>Review lesson</Link>
                )}
              </li>
            );
          })}
        </ol>

        <button type="button" className="primary" onClick={() => setPhase("intro")}>
          Take another mock test
        </button>
      </div>
    );
  }

  return null;
}

// Content schema — the contract between authored content, the engine, and the UI.
// All Japanese text in content uses furigana notation: a kanji run immediately
// followed by its kana reading in brackets, e.g. 食[た]べる, 日本語[にほんご].
// See src/engine/furigana.ts for parse/strip/toKana.

export type Level = "N5" | "N4";

export type Category =
  | "particles"
  | "verb-forms"
  | "adjectives"
  | "sentence-patterns"
  | "conjunctions"
  | "keigo"
  | "giving-receiving"
  | "conditionals"
  | "expressions";

export interface ExampleSentence {
  /** Furigana notation, e.g. "窓[まど]を開[あ]けてください。" */
  ja: string;
  en: string;
}

export interface GrammarPoint {
  /** "<level>.<kebab-slug>", e.g. "n4.te-form-request". Unique across all content. */
  id: string;
  level: Level;
  category: Category;
  /** Display title, e.g. "〜てください" */
  title: string;
  /** Short English gloss, e.g. "please do ~ (polite request)" */
  meaning: string;
  /** Formation rules, one per line, e.g. ["Verb て-form + ください"] */
  formation: string[];
  /** Lesson prose. Markdown-lite: blank-line paragraphs, **bold**, lines starting with "- " as bullets. */
  lesson: string;
  /** At least 3 examples. */
  examples: ExampleSentence[];
  /** Ids of related grammar points ("see also"). */
  related?: string[];
}

// ---------------------------------------------------------------------------
// Exercises (discriminated union on `kind`)
// ---------------------------------------------------------------------------

export interface ExerciseBase {
  /** Unique id. Bank items: "<grammarPointId>.ex<N>". Generated: template id + vocab ids. */
  id: string;
  grammarPointId: string;
  source: "bank" | "generated";
}

export interface TranslationExercise extends ExerciseBase {
  kind: "translation";
  /** English prompt to translate, e.g. "Please open the window." */
  promptEn: string;
  /** Accepted answers in furigana notation; kana-only variants are derived automatically. */
  accepted: string[];
  /** Optional nudge, e.g. "use 〜てください" */
  hint?: string;
}

export interface ClozeExercise extends ExerciseBase {
  kind: "cloze";
  /** Furigana notation with exactly one "＿＿" gap, e.g. "ここで写真[しゃしん]を＿＿ください。" */
  sentence: string;
  /** Accepted gap fillers in furigana notation. */
  accepted: string[];
  translationEn: string;
}

export interface McqExercise extends ExerciseBase {
  kind: "mcq";
  /** Question / sentence with the gap marked ＿＿ (furigana notation). */
  question: string;
  /** Exactly 4 unique choices (furigana notation). */
  choices: string[];
  correctIndex: number;
  explanation?: string;
}

export interface OrderingExercise extends ExerciseBase {
  /** JLPT 文の組み立て: segments are stored IN CORRECT ORDER and shuffled at runtime. */
  kind: "ordering";
  /** 3–6 segments in correct order (furigana notation). */
  segments: string[];
  /** 0-based index of the ★ slot (the graded blank in mock mode). */
  starIndex: number;
  translationEn: string;
  /** Optional fixed fragments before/after the blanks. */
  lead?: string;
  tail?: string;
}

export interface TransformationExercise extends ExerciseBase {
  /**
   * 変換: rewrite a whole sentence into a target form. Distinct from cloze in
   * that the learner produces the ENTIRE sentence, not just a gap filler.
   */
  kind: "transformation";
  /** The sentence to rewrite, furigana notation. No gap marker. */
  sourceJa: string;
  /** English instruction, e.g. "Rewrite using the potential form." */
  instruction: string;
  /** Japanese form label shown as a chip, e.g. "可能形". */
  targetLabel?: string;
  /** Full rewritten sentences, furigana notation; kana variants derived automatically. */
  accepted: string[];
  /** Meaning of the TARGET (rewritten) sentence, not the source. */
  translationEn: string;
  hint?: string;
}

export type Exercise =
  | TranslationExercise
  | ClozeExercise
  | McqExercise
  | OrderingExercise
  | TransformationExercise;

// ---------------------------------------------------------------------------
// Conjugation forms (used by engine/conjugator.ts, templates, drills)
// ---------------------------------------------------------------------------

export type VerbForm =
  | "dictionary"
  | "stem" // ます-stem: 食べ / 飲み
  | "masu"
  | "masen"
  | "mashita"
  | "masen-deshita"
  | "te"
  | "ta"
  | "nai"
  | "nakatta"
  | "potential"
  | "passive"
  | "causative"
  | "volitional" // plain: 食べよう / 飲もう
  | "imperative" // 飲め
  | "prohibitive" // 飲むな
  | "ba" // 飲めば
  | "tara" // 飲んだら
  | "tai"; // 飲みたい

export type AdjForm =
  | "plain"
  | "negative"
  | "past"
  | "past-negative"
  | "te" // 高くて / 静かで
  | "adverbial" // 高く / 静かに
  | "ba" // 高ければ / 静かなら(ば)
  | "tara"; // 高かったら / 静かだったら

export type VerbClass = "godan" | "ichidan" | "suru" | "kuru";

export interface VocabEntry {
  /** "v.taberu", "n.mado", "adj.takai" … unique. */
  id: string;
  /** Furigana notation dictionary form, e.g. "食[た]べる", "窓[まど]", "高[たか]い". */
  ja: string;
  /** English gloss, e.g. "to eat", "window", "expensive". */
  en: string;
  pos: "verb" | "noun" | "i-adj" | "na-adj";
  /** Required when pos === "verb". */
  verbClass?: VerbClass;
  /** Selection tags for templates, e.g. ["food", "transitive"], ["place"]. */
  tags: string[];
}

// ---------------------------------------------------------------------------
// Exercise templates (engine/generator.ts slots vocab into these)
// ---------------------------------------------------------------------------

export interface TemplateSlot {
  pos: VocabEntry["pos"];
  /** Vocab must carry ALL of these tags (if given). */
  tags?: string[];
  /** Conjugated form the slot is rendered in (verbs/adjectives only). */
  form?: VerbForm | AdjForm;
}

export interface ExerciseTemplate {
  /** "tpl.<grammar-slug>.<n>" — unique. */
  id: string;
  grammarPointId: string;
  produces: "cloze" | "translation";
  /**
   * Japanese pattern with slot refs like "{obj}を{v}ください"; the slot's `form`
   * decides the conjugation. Furigana notation outside slots.
   */
  patternJa: string;
  /** English pattern with slot refs using ".en", e.g. "Please {v.en} the {obj.en}." */
  patternEn: string;
  /** For `produces: "cloze"`: which slot becomes the ＿＿ gap. */
  gapSlot?: string;
  slots: Record<string, TemplateSlot>;
}

// ---------------------------------------------------------------------------
// Mock test passages (問題3 文章の文法)
// ---------------------------------------------------------------------------

export interface MockPassage {
  /** "passage.<slug>" — unique. */
  id: string;
  title: string;
  /** Paragraphs in furigana notation; gap positions marked ［1］, ［2］ … */
  paragraphsJa: string[];
  /** One MCQ per numbered gap, in order. EXACTLY 5 gaps; the mock's 問題3 sizing depends on it. */
  gaps: McqExercise[];
}

// ---------------------------------------------------------------------------
// Reading comprehension (読解)
// ---------------------------------------------------------------------------

/**
 * Deliberately NOT an `Exercise`: a passage carries several questions, which
 * breaks the flat union's "1 exercise = 1 graded answer = 1 ExerciseResult"
 * assumption that SessionRunner's progress bar and result indexing rely on.
 * Reading is graded by ReadingRunner and recorded with the `meta.reading`
 * grammarPointId sentinel. See CONTENT_GUIDE.md.
 */
export interface ReadingQuestion {
  /** "<passageId>.q<N>" — unique. */
  id: string;
  /** Comprehension question, furigana notation. */
  question: string;
  /** Exactly 4 unique choices (furigana notation). */
  choices: string[];
  correctIndex: number;
  explanation?: string;
}

export interface ReadingPassage {
  /** "reading.<slug>" — unique. */
  id: string;
  title: string;
  level: Level;
  /** Paragraphs in furigana notation. No gap markers — this is comprehension. */
  paragraphsJa: string[];
  /** EXACTLY 3 questions; the mock's 読解 section sizing depends on it. */
  questions: ReadingQuestion[];
  /** Optional "this passage leans on these points"; ids must resolve. */
  focusPointIds?: string[];
}

// ---------------------------------------------------------------------------
// Vocabulary questions (文字・語彙)
// ---------------------------------------------------------------------------

/**
 * Standalone like ReadingQuestion — vocab items don't belong to a grammar
 * point. Recorded with the `meta.vocab` sentinel.
 */
export interface VocabQuestion {
  /** "vq.<slug>" — unique. */
  id: string;
  /**
   * reading = 漢字読み (read the kanji word) · orthography = pick the right kanji
   * · context = ＿＿ gap, pick the fitting word · paraphrase = closest meaning.
   *
   * NOTE for `reading`: the prompt is authored WITH furigana brackets so the
   * validator works, so the renderer MUST force furigana mode "hidden" or the
   * answer prints above the word.
   *
   * NOTE for `orthography`: it's the CHOICES, not the prompt, that carry
   * furigana brackets — the prompt writes the target word in bare kana, and
   * each kanji-spelling choice is authored with its own reading (see
   * src/content/vocabq/batch1.ts). The renderer MUST suppress ruby on the
   * choices here or the question is trivially solvable without any kanji
   * knowledge.
   */
  style: "reading" | "orthography" | "context" | "paraphrase";
  level: Level;
  /** Furigana notation; contains one ＿＿ gap when style === "context". */
  question: string;
  /** Exactly 4 unique choices. */
  choices: string[];
  correctIndex: number;
  explanation?: string;
  /** Optional back-references into allVocab; ids must resolve. */
  vocabIds?: string[];
}

// ---------------------------------------------------------------------------
// Drill content (engine/drills/*)
// ---------------------------------------------------------------------------

export interface ParticleDrillItem {
  /** "pd.<slug>" — unique. */
  id: string;
  /** Furigana notation with exactly one ＿＿ gap where the particle goes. */
  sentence: string;
  /** The correct particle, e.g. "に". Kana only. */
  answer: string;
  /** Optional hand-picked distractors; defaults to the shared particle set. */
  distractors?: string[];
  translationEn: string;
  level: Level;
  /** Optional note explaining why this particle and not the near-miss. */
  note?: string;
}

export interface TransitivityPair {
  /** "tp.<slug>" — unique. */
  id: string;
  /** Transitive (他動詞) member, e.g. 開[あ]ける — takes を. */
  transitive: { ja: string; en: string };
  /** Intransitive (自動詞) member, e.g. 開[あ]く — takes が. */
  intransitive: { ja: string; en: string };
  /** Optional disambiguation note shown in feedback. */
  note?: string;
}

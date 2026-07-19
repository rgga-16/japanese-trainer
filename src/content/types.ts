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

export type Exercise =
  | TranslationExercise
  | ClozeExercise
  | McqExercise
  | OrderingExercise;

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
  /** One MCQ per numbered gap, in order. */
  gaps: McqExercise[];
}

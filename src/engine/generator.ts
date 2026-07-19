// Template-based exercise generator — slots vocab into ExerciseTemplate
// patterns (see src/content/types.ts) using a seeded Rng so generation is
// reproducible. See src/content/templates/index.ts for authored templates.

import type { AdjForm, Exercise, ExerciseTemplate, TemplateSlot, VerbForm, VocabEntry } from "../content/types";
import { conjugateAdjective, conjugateVerb } from "./conjugator";
import type { Rng } from "./rng";

// ---------------------------------------------------------------------------
// Slot filtering / rendering
// ---------------------------------------------------------------------------

function candidatesFor(slot: TemplateSlot, vocabPool: VocabEntry[]): VocabEntry[] {
  const requiredTags = slot.tags ?? [];
  return vocabPool.filter(
    (entry) => entry.pos === slot.pos && requiredTags.every((tag) => entry.tags.includes(tag))
  );
}

function renderSlot(entry: VocabEntry, slot: TemplateSlot): string {
  if (entry.pos === "verb") {
    return conjugateVerb(entry, (slot.form as VerbForm | undefined) ?? "dictionary");
  }
  if (entry.pos === "i-adj" || entry.pos === "na-adj") {
    if (slot.form) {
      return conjugateAdjective(entry, slot.form as AdjForm);
    }
    return entry.ja;
  }
  // noun
  return entry.ja;
}

// ---------------------------------------------------------------------------
// Pattern filling
// ---------------------------------------------------------------------------

const JA_TOKEN = /\{([a-zA-Z0-9_]+)\}/g;
const EN_TOKEN = /\{([a-zA-Z0-9_]+)\.en\}/g;

function fillJa(pattern: string, rendered: ReadonlyMap<string, string>): string {
  return pattern.replace(JA_TOKEN, (whole, name: string) => {
    const value = rendered.get(name);
    return value ?? whole;
  });
}

function fillEn(pattern: string, chosen: ReadonlyMap<string, VocabEntry>): string {
  return pattern.replace(EN_TOKEN, (whole, name: string) => {
    const entry = chosen.get(name);
    if (!entry) return whole;
    let value = entry.en;
    // Strip a leading "to " from verb glosses referenced as {v.en} so they
    // read naturally mid-sentence (e.g. "Please {v.en}." -> "Please eat.").
    if (name === "v" && value.startsWith("to ")) {
      value = value.slice(3);
    }
    return value;
  });
}

// ---------------------------------------------------------------------------
// generateExercise
// ---------------------------------------------------------------------------

export function generateExercise(template: ExerciseTemplate, vocabPool: VocabEntry[], rng: Rng): Exercise | null {
  const slotNames = Object.keys(template.slots);
  if (slotNames.length === 0) return null;

  const chosen = new Map<string, VocabEntry>();
  const usedIds = new Set<string>();
  for (const name of slotNames) {
    const candidates = candidatesFor(template.slots[name], vocabPool);
    if (candidates.length === 0) return null;
    const unused = candidates.filter((entry) => !usedIds.has(entry.id));
    const pool = unused.length > 0 ? unused : candidates;
    const entry = pool[Math.floor(rng() * pool.length)];
    chosen.set(name, entry);
    usedIds.add(entry.id);
  }

  const rendered = new Map<string, string>();
  const entryIds: string[] = [];
  for (const [name, entry] of chosen) {
    rendered.set(name, renderSlot(entry, template.slots[name]));
    entryIds.push(entry.id);
  }

  const filledJa = fillJa(template.patternJa, rendered);
  const filledEn = fillEn(template.patternEn, chosen);
  const id = `gen.${template.id}.${entryIds.join("+")}`;

  if (template.produces === "translation") {
    return {
      kind: "translation",
      id,
      grammarPointId: template.grammarPointId,
      source: "generated",
      promptEn: filledEn,
      accepted: [filledJa],
    };
  }

  // produces === "cloze"
  const gapName = template.gapSlot;
  if (!gapName) return null;
  const gapRendered = rendered.get(gapName);
  if (gapRendered === undefined) return null;
  const sentence = filledJa.replace(gapRendered, "＿＿");

  return {
    kind: "cloze",
    id,
    grammarPointId: template.grammarPointId,
    source: "generated",
    sentence,
    accepted: [gapRendered],
    translationEn: filledEn,
  };
}

// ---------------------------------------------------------------------------
// generateForPoint
// ---------------------------------------------------------------------------

export function generateForPoint(
  grammarPointId: string,
  templates: ExerciseTemplate[],
  vocabPool: VocabEntry[],
  rng: Rng,
  count: number
): Exercise[] {
  const pointTemplates = templates.filter((t) => t.grammarPointId === grammarPointId);
  const results: Exercise[] = [];
  if (pointTemplates.length === 0 || count <= 0) return results;

  const seenIds = new Set<string>();
  const maxAttempts = count * 10;
  let attempts = 0;
  let templateIndex = 0;

  while (results.length < count && attempts < maxAttempts) {
    const template = pointTemplates[templateIndex % pointTemplates.length];
    templateIndex++;
    attempts++;

    const exercise = generateExercise(template, vocabPool, rng);
    if (exercise && !seenIds.has(exercise.id)) {
      seenIds.add(exercise.id);
      results.push(exercise);
    }
  }

  return results;
}

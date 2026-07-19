# Content authoring guide

This guide is for anyone (human or agent) adding to the JLPT N4 Trainer
content bank. Read `src/content/types.ts` first — it is the authoritative
schema with doc comments. This file explains the *conventions* on top of
that schema and how to verify your work.

## File layout

```
src/content/
  types.ts                 # schema — read-only, do not edit
  vocab.ts                 # allVocab: VocabEntry[]
  index.ts                 # barrel: re-exports + derived maps
  grammar/
    n5/seed.ts              # N5 points + bank exercises
    n4/seed.ts              # N4 points + bank exercises
  templates/
    index.ts                # allTemplates: ExerciseTemplate[]
  mock/
    passages.ts             # allPassages: MockPassage[]
src/engine/
  furigana.ts               # parseFurigana/stripFurigana/toKana — read-only
  conjugator.ts              # conjugateVerb/conjugateAdjective — read-only
  __tests__/
    content.test.ts          # validates everything in this guide
```

Add new grammar points as new files under `grammar/n5/` or `grammar/n4/`
(e.g. `grammar/n4/more.ts` exporting `points`/`exercises`), then wire them
into `content/index.ts`'s `allGrammarPoints`/`allExercises` arrays. Keep the
existing `seed.ts` files as the original 18-point seed bank; don't grow them
unboundedly — prefer a new file per batch of additions.

## Furigana notation — the hard rule

**Every kanji run must be immediately followed by its reading in brackets.**
No exceptions, anywhere kanji appears in content: `ja`, `sentence`,
`question`, `choices`, `segments`, `accepted`, `lead`, `tail`, and
`examples[].ja`. Readings are hiragana only. Punctuation and kana are
literal (no brackets needed).

```
Correct:    窓[まど]を開[あ]けてください。
Correct:    食[た]べる          (okurigana べる stays OUTSIDE the bracket)
Correct:    お金[かね]           (お is kana, not part of the kanji run)
Wrong:      窓を開けてください。        (no readings at all)
Wrong:      食[たべ]る            (okurigana swallowed into the bracket)
Wrong:      窓[マド]を開[あ]けてください。 (katakana reading — must be hiragana)
```

Use `src/engine/furigana.ts`'s `parseFurigana`/`stripFurigana`/`toKana` to
sanity-check a string while authoring if you're unsure.

**`title` and `formation` are exempt** from the strict furigana contract —
they are free-form display/gloss text and `formation` commonly uses
`[placeholder]` notation for grammatical roles (e.g. `[causer]は[causee]に…`),
which is English glossing, not furigana. Everything else is not exempt.

### Okurigana and the conjugator

`src/engine/conjugator.ts` slices `VocabEntry.ja` by plain string operations
(no bracket-awareness), so vocab `ja` must follow these exact boundaries:

- **Godan verbs**: end in a single plain (unbracketed) kana from the u-row
  (く/ぐ/す/つ/ぬ/ぶ/む/る/う). `書[か]く`, `飲[の]む`, `帰[かえ]る`.
- **Ichidan verbs**: end in a plain `る`. `食[た]べる`, `見[み]る`.
- **する-compounds**: end in plain `する`. `勉強[べんきょう]する`.
- **来る**: must be written exactly `来[く]る` (the conjugator special-cases
  this literal string; reading changes to き/こ across forms are handled
  for you).
- **い-adjectives**: end in plain `い`. `高[たか]い`. `いい` is irregular and
  is handled as a special case (conjugates off `よい`'s stem) — write it as
  bare `いい`, not `良[よ]い`.
- **な-adjectives**: stored as the **bare stem, without な** — `静[しず]か`,
  not `静[しず]かな`. The UI/conjugator appends な/だ/です/じゃない as needed.

If you add a new verb and aren't sure it conjugates correctly, you can
temporarily import `conjugateVerb`/`conjugateAdjective` from
`src/engine/conjugator.ts` in a scratch test and print the forms — the
content test suite doesn't do this for you.

## Grammar points (`GrammarPoint`)

- `id`: `"<n4|n5>.<kebab-slug>"`, unique across all content.
- `meaning`: short English gloss.
- `formation`: 2–4 lines. Free-form (see furigana exemption above).
- `lesson`: 150–300 words, markdown-lite (blank-line paragraphs, `**bold**`,
  lines starting with `"- "` as bullets). Explain the grammar for an English
  speaker, contrast it with near-synonyms, and call out common mistakes.
- `examples`: at least 3 (seed content uses 4). Natural, level-appropriate
  vocabulary, full furigana.
- `related`: optional array of other grammar point ids ("see also"). Every
  id must resolve to a real point — the test checks this.

## Exercises (`Exercise`, discriminated on `kind`)

Bank items use id `"<grammarPointId>.ex<N>"` (e.g. `n4.potential.ex1`) and
`source: "bank"`. Each grammar point needs **at least 4 bank exercises**;
the seed content uses 7 per point (2 translation, 2 cloze, 2 mcq, 1
ordering) — follow that mix for new points too.

- **translation**: `accepted` needs 2–4 natural variants (polite/plain,
  with/without an optional particle, alternate word order) — not just
  kanji-vs-kana spelling, which the grader derives automatically from a
  single authored string. Add `hint` when the target grammar isn't obvious
  from the English prompt alone.
- **cloze**: `sentence` must contain **exactly one** `＿＿` (fullwidth
  underscore x2) gap. `accepted` is the gap filler(s), 1–3 variants.
- **mcq**: exactly 4 **unique** `choices`, `0 <= correctIndex < 4`.
  Distractors should be plausible (wrong conjugation, wrong particle, a
  different-but-similar grammar point) — not obviously silly. Add a 1–2
  sentence `explanation`.
- **ordering**: 3–6 `segments` in the CORRECT order (the UI shuffles them at
  runtime). `starIndex` should be 1 or 2 (the ★ blank lands early-ish, as in
  real JLPT 文の組み立て questions), and must satisfy
  `0 <= starIndex < segments.length`. Include `translationEn`; `lead`/`tail`
  are optional fixed fragments outside the shuffled segments.

Vary politeness levels and vocabulary across the 7 exercises for a point so
learners see the grammar in different contexts.

## Vocab (`VocabEntry`)

- `id`: `v.<romaji>` (verb), `n.<romaji>` (noun), `adj.<romaji>` (i-adj),
  `na.<romaji>` (na-adj). Unique. If a romaji form collides (e.g. 暑い/熱い
  are both "atsui"), disambiguate with a suffix like `adj.atsui-touch`.
- `pos: "verb"` requires `verbClass: "godan" | "ichidan" | "suru" | "kuru"`.
- `tags`: useful, searchable — transitivity (`"transitive"`/`"intransitive"`)
  plus semantic tags (`"food"`, `"place"`, `"person"`, `"object"`,
  `"activity"`, etc.). These drive template slot selection later.
- See the okurigana/na-adjective rules above — they're enforced by the test.

## Templates and mock passages

Both are currently empty placeholder arrays
(`allTemplates`/`allPassages`) — the content test suite is written to pass
on empty arrays, so don't feel obligated to fill them. If you do add a
template: every `{slotName}` (and `{slotName.en}`) referenced in
`patternJa`/`patternEn` must have a matching key in `slots`, and
`produces: "cloze"` templates must set `gapSlot` to one of those keys.

## Verification — required before you're done

From the project directory:

```
npx tsc --noEmit
npx vitest run src/engine/__tests__/content.test.ts
```

Both must be clean/passing. `content.test.ts` checks (non-exhaustive):

- grammar ids unique, match `/^n[45]\.[a-z0-9-]+$/`, `level` matches prefix
- every exercise's/template's `grammarPointId` resolves; exercise ids unique
- every point has ≥3 examples and ≥4 bank exercises
- furigana is well-formed everywhere it's required (see above)
- translation/cloze `accepted.length >= 1`; cloze has exactly one `＿＿`
- mcq has 4 unique choices and a valid `correctIndex`
- ordering has 3–6 segments and a valid `starIndex`
- vocab ids unique, verbs carry `verbClass`, no un-bracketed kanji in `ja`,
  verb `ja` doesn't end mid-bracket, na-adjectives have no trailing な

## Checklist before submitting new content

- [ ] Every new kanji occurrence has a hiragana reading in brackets,
      immediately after the kanji run, everywhere except `title`/`formation`.
- [ ] New verb/adjective vocab conjugates correctly (spot-check with
      `conjugator.ts` if unsure — see "Okurigana and the conjugator" above).
- [ ] Grammar point ids are unique and follow `n4.`/`n5.` + kebab-case.
- [ ] Each point has ≥3 examples and ≥4 bank exercises (7 recommended, with
      the 2 translation / 2 cloze / 2 mcq / 1 ordering mix).
- [ ] `related` ids (if any) point to real grammar points.
- [ ] Exercise ids are unique and follow `<pointId>.ex<N>`.
- [ ] `npx tsc --noEmit` is clean.
- [ ] `npx vitest run src/engine/__tests__/content.test.ts` passes.
- [ ] List anything you were unsure about (a nuance, a borderline reading,
      a translation choice) for a native/advanced reviewer to double-check.

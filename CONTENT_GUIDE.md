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
  index.ts                 # barrel: re-exports + derived maps + CONTENT_REVISION
  grammar/
    n5/seed.ts              # 8 points + bank exercises
    n5/batch1-particles.ts  # 6 points
    n5/batch1-verbs.ts      # 6 points
    n5/batch1-patterns.ts   # 6 points
    n4/seed.ts              # 10 points
    n4/batch1-te-ta.ts      # 7 points
    n4/batch1-patterns.ts   # 8 points
  templates/
    index.ts                # allTemplates: ExerciseTemplate[]  (14)
  mock/
    passages.ts             # allPassages: MockPassage[]  (問題3 文章の文法)
  reading/
    index.ts                # allReadingPassages: ReadingPassage[]  (読解)
  vocabq/
    index.ts                # allVocabQuestions: VocabQuestion[]  (文字・語彙)
  drills/
    particles.ts            # allParticleItems + PARTICLE_SET
    transitivity.ts         # allTransitivityPairs
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

**Sidecar files for additions to existing points.** The grammar files are
already 583–950 lines and hold `points`/`exercises` in single array literals,
so several agents appending to the same literal will conflict. When you are
adding exercises to points that already exist, create a **new sidecar file**
next to the original (e.g. `grammar/n4/seed.batch2.ts` exporting just
`exercises`) and never open the original. Only the integrator edits
`content/index.ts`.

**Never renumber or reuse an existing exercise id.** `ex1`–`ex7` are
referenced by string from saved user progress (`ExerciseResult.exerciseId` in
history, and `MockResult.wrongQuestionIds`). Renumbering silently orphans real
learners' records. Append new ids only.

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
`source: "bank"`. Every grammar point carries **exactly 11 bank exercises**:

| kind | per point |
|---|---|
| translation | 2 |
| cloze | 2 |
| mcq | 3 |
| ordering | 2 |
| transformation | 2 |

The mcq and ordering counts are load-bearing beyond practice: the mock test
picks **one representative exercise per grammar point per section**, so the
depth of a point's mcq/ordering pool *is* how much a mock paper varies between
attempts. (Before this contract there was exactly 1 ordering exercise per
point, which made 問題2's content fully deterministic.)

**Escape hatch for pure-particle and pure-expression points.** On points where
there is no "form to transform into" — `n5.mo`, `n5.dake-shika`, `n5.to-ya`,
`n4.kamoshirenai` and similar — a second transformation exercise would be
filler. There, author **1 transformation + 3 cloze** instead, keeping the total
at 11. Note the substitution in your batch notes so a reviewer knows it was
deliberate. The test enforces the total and per-kind floors, not the exact mix.

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
  sentence `explanation`. **Vary `correctIndex` across 0–3** — see the warning
  below.
- **ordering**: 3–6 `segments` in the CORRECT order (the UI shuffles them at
  runtime). `starIndex` should be 1 or 2 (the ★ blank lands early-ish, as in
  real JLPT 文の組み立て questions), and must satisfy
  `0 <= starIndex < segments.length`. Include `translationEn`; `lead`/`tail`
  are optional fixed fragments outside the shuffled segments.
- **transformation**: the learner rewrites a **whole sentence** into a target
  form — that whole-sentence output is what distinguishes it from cloze.
  - `sourceJa`: the sentence to rewrite, furigana notation, **no gap marker**.
  - `instruction`: English, imperative, names the target grammar explicitly —
    "Rewrite using the potential form." A learner must be able to produce
    exactly one intended answer from it.
  - `targetLabel`: optional Japanese form chip, e.g. `可能形`, `受身形`.
  - `accepted`: 1–3 **complete** rewritten sentences in furigana notation.
    Include genuine variants (politeness, an optional particle) — not
    kanji-vs-kana spellings, which the grader derives for you.
  - `translationEn`: the meaning of the **target** sentence, not the source.

  ```ts
  {
    id: "n4.potential.ex8",
    grammarPointId: "n4.potential",
    source: "bank",
    kind: "transformation",
    sourceJa: "日本語[にほんご]を話[はな]します。",
    instruction: "Rewrite using the potential form.",
    targetLabel: "可能形",
    accepted: ["日本語[にほんご]が話[はな]せます。", "日本語[にほんご]を話[はな]すことができます。"],
    translationEn: "I can speak Japanese.",
  }
  ```

  Watch the particle shift: 〜を→〜が with potential, 〜が→〜を with causative.
  If the transformation changes the particle, the source must contain the
  original particle so the change is actually being practised.

Vary politeness levels and vocabulary across a point's 11 exercises so
learners see the grammar in different contexts.

### Never let `correctIndex` settle on 0

All 20 originally-authored mock passage gaps used `correctIndex: 0`, which made
the correct answer the first button every single time in 問題3. The mock builder
now shuffles choices at runtime, but **authored content must vary too** — a
reader of the source, and any future consumer that doesn't shuffle, would
otherwise inherit the leak. Spread `correctIndex` across 0–3 in every MCQ-shaped
bank: `mcq` exercises, passage gaps, vocab questions, and reading questions.

## Vocab (`VocabEntry`)

- `id`: `v.<romaji>` (verb), `n.<romaji>` (noun), `adj.<romaji>` (i-adj),
  `na.<romaji>` (na-adj). Unique. If a romaji form collides (e.g. 暑い/熱い
  are both "atsui"), disambiguate with a suffix like `adj.atsui-touch`.
- `pos: "verb"` requires `verbClass: "godan" | "ichidan" | "suru" | "kuru"`.
- `tags`: useful, searchable — transitivity (`"transitive"`/`"intransitive"`)
  plus semantic tags (`"food"`, `"place"`, `"person"`, `"object"`,
  `"activity"`, etc.). These drive template slot selection later.
- See the okurigana/na-adjective rules above — they're enforced by the test.

## Templates

`allTemplates` holds 14 templates. Every `{slotName}` (and `{slotName.en}`)
referenced in `patternJa`/`patternEn` must have a matching key in `slots`, and
`produces: "cloze"` templates must set `gapSlot` to one of those keys.

Slot filtering is a pure **subset** check (`requiredTags.every(...)`) with no
exclusion mechanism, so tag-identical vocab clusters can never be split apart —
keep slot tag sets narrow. The header comment in `templates/index.ts` has the
details.

## Mock passages (`MockPassage` — 問題3 文章の文法)

A short text with 5 numbered gaps, used as the mock's grammar-in-context
section.

- `paragraphsJa`: gap positions marked `＿＿［1］` … `＿＿［5］`.
- `gaps`: one `McqExercise` per numbered gap, **in order**, id
  `"<passageId>.g<N>"`, `source: "bank"`, each with a real `grammarPointId` and
  an `explanation`.
- The number of `gaps` must match the number of `［N］` markers in the
  paragraphs, or the runtime silently renders the paragraph un-highlighted.

## Reading comprehension (`ReadingPassage` — 読解)

Comprehension, **not** grammar gaps: the questions ask what the text *means*.

- `id`: `"reading.<slug>"`. Questions are `"<passageId>.q<N>"`.
- `paragraphsJa`: **no gap markers at all.** 100–200 characters is the right
  size for N4.
- `questions`: **exactly 3.** The mock's 読解 section sizes itself by passage
  count, so a passage with a different number of questions breaks the Full
  format's question total. The test enforces this.
- `level`: `"N5"` or `"N4"`. `focusPointIds` is optional and every id must
  resolve to a real grammar point.
- Reading questions carry **no** `grammarPointId` — they belong to no single
  point, which is exactly why this is a separate bank and not an `Exercise`.

Write questions that require reading the passage. A question answerable from
general knowledge, or from the choices alone, is not testing comprehension.
Include at least one question whose answer is stated indirectly.

## Vocabulary questions (`VocabQuestion` — 文字・語彙)

Four `style` values:

- `reading` — 漢字読み: given a word in kanji, pick its reading.
- `orthography` — given a reading, pick the correct kanji.
- `context` — a sentence with one `＿＿` gap; pick the word that fits.
- `paraphrase` — pick the choice closest in meaning to an underlined phrase.

> **The `style: "reading"` trap.** Author the prompt **with** furigana brackets
> like everything else, so the furigana validator still works and the answer key
> stays derivable — then the renderer forces furigana mode `hidden` for this
> style. If you author it *without* brackets to "hide" the answer, you break the
> validator; if the renderer forgets to hide, the answer prints in ruby text
> above the word. Both halves of that contract must hold.

`vocabIds` is optional; every id must resolve against `allVocab`.

## Particle drill items (`ParticleDrillItem`)

- `sentence`: furigana notation, **exactly one** `＿＿` where the particle goes.
- `answer`: the particle, kana only.
- `distractors`: optional. When omitted, the drill draws from `PARTICLE_SET`
  (`は が を に で へ と も から まで より の`) minus the answer. Supply explicit
  distractors when you want a specific near-miss contrast (に vs で, は vs が).
- `note`: optional, and the most valuable field — say *why* the near-miss is
  wrong ("に marks the destination; で would mark where the action happens").
- **Only one particle may be defensible.** If a native speaker could justify a
  second option, rewrite the sentence.

## Transitive/intransitive pairs (`TransitivityPair`)

`{ transitive: {ja,en}, intransitive: {ja,en}, note? }` — e.g.
開[あ]ける/開[あ]く, 閉[し]める/閉[し]まる, 出[だ]す/出[で]る.

The English glosses must make the direction unambiguous ("to open (something)"
vs "to open (by itself)") — that gloss is the only cue the learner gets about
which member is being asked for.

**Do not add these verbs to `vocab.ts`.** Entries there are load-bearing for
`conjugator.ts` and for `generator.ts` slot selection, so ~50 new verbs would
change generated-exercise output and skew the part-of-speech spread thresholds
in `content.test.ts`. The drill reads this pair list directly.

## Verification — required before you're done

From the project directory:

```
npx tsc --noEmit
npx vitest run src/engine/__tests__/content.test.ts
```

Both must be clean/passing. `content.test.ts` checks (non-exhaustive):

- grammar ids unique, match `/^n[45]\.[a-z0-9-]+$/`, `level` matches prefix
- every exercise's/template's `grammarPointId` resolves; exercise ids unique
- **ids are unique across *all* banks**, not just within one
- every point has ≥3 examples and the full 11-exercise bank with per-kind floors
- furigana is well-formed everywhere it's required (see above)
- translation/cloze/transformation `accepted.length >= 1`; cloze has exactly one `＿＿`
- **every MCQ-shaped item in every bank** — `mcq` exercises, passage gaps,
  vocab questions, reading questions — has 4 unique choices and an in-range
  `correctIndex`
- ordering has 3–6 segments and a valid `starIndex`
- reading passages have exactly 3 questions; `focusPointIds` resolve
- particle items have exactly one `＿＿` and a kana-only answer
- vocab ids unique, verbs carry `verbClass`, no un-bracketed kanji in `ja`,
  verb `ja` doesn't end mid-bracket, na-adjectives have no trailing な

Do **not** run `biome format` or `biome check` repo-wide. This repo is
deliberately lint-clean but not format-clean, so those commands rewrite files
unrelated to your change. `npm run lint` (which is `biome lint src`) is the
right command.

## Checklist before submitting new content

- [ ] Every new kanji occurrence has a hiragana reading in brackets,
      immediately after the kanji run, everywhere except `title`/`formation`.
- [ ] New verb/adjective vocab conjugates correctly (spot-check with
      `conjugator.ts` if unsure — see "Okurigana and the conjugator" above).
- [ ] Grammar point ids are unique and follow `n4.`/`n5.` + kebab-case.
- [ ] Each point has ≥3 examples and 11 bank exercises with the
      2 translation / 2 cloze / 3 mcq / 2 ordering / 2 transformation mix
      (or the documented 3-cloze substitution on particle/expression points).
- [ ] `related` ids (if any) point to real grammar points.
- [ ] Exercise ids are unique and follow `<pointId>.ex<N>`, and **no existing
      id was renumbered, reused, or removed** (saved user progress references
      them by string).
- [ ] `correctIndex` values vary across 0–3 — not all 0.
- [ ] You created only your own file(s); you did not edit `content/index.ts`,
      this guide, or another agent's file.
- [ ] `npx tsc --noEmit` is clean.
- [ ] `npx vitest run src/engine/__tests__/content.test.ts` passes.
- [ ] List anything you were unsure about (a nuance, a borderline reading,
      a translation choice) for a native/advanced reviewer to double-check.

# jlpt-n4-trainer

A JLPT N4 grammar study app: lessons, exercises, spaced-repetition reviews, conjugation drills, and timed mock tests. Fully offline — no backend, no external APIs, no CDNs. Progress is saved to `localStorage` in your browser.

## Features

- **Lessons** covering N5/N4 grammar points, each with explanations and worked examples
- **Exercises** in four formats: translation, cloze, multiple choice, and sentence ordering (文の組み立て)
- **Spaced repetition reviews** using a Leitner-system scheduler
- **Conjugation drills** for verb/adjective forms in scope for N4
- **Timed mock tests** built from mixed passages and exercises
- **Progress dashboard** tracking mastery across grammar points
- Furigana rendering throughout (kanji + reading notation, e.g. `食[た]べる`)

## Tech stack

React + TypeScript (strict) + Vite, with hash-based routing (`react-router-dom`). No backend — all content is static TypeScript compiled into the bundle, and progress persists to a single versioned `localStorage` key.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc --noEmit`) and build for production |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Vitest test suite (engine + content validation) |
| `npm run test:watch` | Run tests in watch mode |

Linting is handled by the workspace-root Biome setup (`npm run lint` from the workspace root).

## Project structure

```
src/
  content/    # Static grammar/vocab/template/mock-passage data (types.ts defines the schema)
  engine/     # Pure logic: conjugator, grader, generator, SRS scheduler, furigana parsing
  state/      # localStorage persistence, app context, derived stats
  components/ # Shared UI, including per-format exercise components
  views/      # Route-level pages (dashboard, lesson browser, sessions, mock test, settings)
```

## Content authoring

Grammar content follows a strict schema (`src/content/types.ts`): each point needs an id (`n5.<slug>` / `n4.<slug>`), a lesson, at least three examples, and bank exercises. `content.test.ts` validates every content change against this schema. See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) before authoring new grammar batches.

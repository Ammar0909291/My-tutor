# Educational Intelligence Sprint 6 — Tutor Max Adaptive Teaching Integration · Audit (Task 1)

**Status: audit only. No Tutor Max engine rebuilt. Teaching STYLE only — content stays
curriculum-controlled.**

## Tutor Max pipeline trace

The lesson AI lives in `src/app/api/learn/chat/route.ts` (`POST`). Flow:

1. **Lesson generation / context resolution** — resolves `learnSession`, `profile`, and the
   active `lessonCtx` from DB curriculum rows, the knowledge graph, the subject catalog, or the
   school chapter (lines ~107–242). `topicProgressRowsShared` is fetched once (line 110) and
   shared across blocks — it already tells us the current in-progress topic.
2. **System-prompt construction** — `buildTutorSystemPrompt(...)` (`src/lib/ai/client.ts`) builds
   the base prompt (lines ~246–254).
3. **Additive context blocks** — ~20 independent blocks then APPEND to `systemPrompt`, each in
   its own `try/catch` with the uniform shape:
   ```ts
   try {
     const { getX, buildXBlock } = await import('...')
     systemPrompt += buildXBlock(await getX(...))   // additive, non-fatal
   } catch { /* never blocks the lesson */ }
   ```
   Examples already present: School curriculum context, Adaptive Tutor Context (lines ~770–794),
   Mastery & Spaced Repetition, Knowledge Graph context, Learner Intelligence Profile, etc.
4. **AI call** — `routeAI([...history, message], systemPrompt, ...)` (line ~960). The system
   prompt is the only adaptation surface; history and the user message are untouched.

## Safest integration point

A **new additive block**, appended after the existing "Adaptive Tutor Context" block (~line 794),
in its own `try/catch`, identical in shape to every other adaptive block. Rationale:

- It only ever **appends natural-language teaching-style guidance** to `systemPrompt` — it cannot
  touch curriculum resolution, progression writes (`studentProgress.upsert`), XP, grading, or
  assessment scoring, none of which live in the prompt.
- Its `try/catch` makes it strictly non-fatal: any failure leaves Tutor Max exactly as it is today.
- It reuses `topicProgressRowsShared` (already fetched) to identify the current topic — no schema
  change, no new "current topic" concept.
- It consumes the **Sprint 5 `TeachingPlan` directly** (via `getTeachingPlans()`), filtered to the
  current `subjectSlug:topicSlug`. The plan is NOT regenerated or modified.

## What is consumed (Task 2)

From the Sprint 5 `TeachingPlan` for the current topic: `difficultyLevel`, `recommendedMethods`,
`practiceIntensity`, `revisionPriority`, `retestPriority`. These are mapped to teaching-style
directives (Task 4) and injected as prose — **never as raw JSON** (Task 3).

## Safety boundary (Task 5)

- The block changes only HOW the tutor explains (pacing, example density, analogies, visual
  encouragement, understanding checks).
- It contains an explicit guard line instructing the model never to skip/add/reorder curriculum
  topics or change assessment difficulty — content stays curriculum-controlled.
- No new lessons are generated; the existing curriculum/KG/school-chapter resolution is unchanged.
- No progression/XP/grading code path is touched.

## Insertion points (for implementation)

- `src/lib/intelligence/tutorTeachingContext.ts` — `TutorTeachingContext` type +
  `buildTutorTeachingContext()` (pure filter) + `buildTutorTeachingContextBlock()` (pure
  method→prose mapping) + `getTutorTeachingContext()` (thin wrapper over Sprint 5's
  `getTeachingPlans`).
- `src/app/api/learn/chat/route.ts` — one new additive `try/catch` block appending the context.

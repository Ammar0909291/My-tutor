# Visual Learning Sprint M — Persistence Report

**Goal**: Persist Visual Mastery Signals (Sprint L's collector is entirely
in-memory and loses everything on session end) and connect mastery tracking
to the existing educational intelligence system — persistence and
documentation only, no grading/XP/curriculum changes.

## 1. Persistence architecture

```
Mastery Event (renderer onMasteryEvent, Sprint L)
   -> Collector (useVisualMastery — per-instance dedup + summary, Sprint L)
   -> Persistence Adapter (src/lib/visuals/visualMasteryPersistence.ts, Sprint M)
   -> Storage (EvidenceRecord, type: VISUAL, weight: 0, via /api/visual-mastery/persist)
```

`docs/VISUAL_MASTERY_PERSISTENCE_AUDIT.md` (Task 1) compared
`EvidenceRecord`, `TopicProgress`, `StudentProgress` and selected
`EvidenceRecord` as the persistence target: it was completely unused
(zero existing read/write call sites), so writing to it carries zero risk
of touching `masteryPct`/`completionPercent`/XP/grading computations, which
all live exclusively in `TopicProgress`/`StudentProgress`.

The only schema change is additive: one new `EvidenceType` enum value,
`VISUAL` (`prisma/schema.prisma`). No new tables, no new columns, no
changes to any existing model. Applied via `npx prisma db push` (no
migration files, per this repo's convention) — verified in this session
(`🚀 Your database is now in sync with your Prisma schema`).

## 2. Storage strategy

One `EvidenceRecord` row per visual engine observed in a completed quiz
session (not one row per click, not one row per raw `VisualMasterySignal`):

```ts
{
  userId,                      // from the authenticated session, never trusted from the client
  subjectSlug, topicSlug,      // from the calling quiz component
  type: 'VISUAL',
  score: completed/shown * 100,  // 0 when shown but never completed
  weight: 0,                     // always 0 — see Task 1 audit's rationale
  method: 'visual_mastery',
  notes: {
    visualType, shown, interacted, completed,
    source, sessionId, persistedAt,
  },
}
```

`shown`/`interacted`/`completed` are stored as counts inside `notes` (one
engine's tally for that session), directly mirroring the collector's
`VisualMasterySummary` shape from Sprint L — no new aggregation semantics
invented, the existing summary is just written to disk as-is. `weight: 0`
is the deliberate mechanism that keeps this data evidence-only: any future
weighted-average mastery formula that respects `weight` will treat these
rows as contributing nothing by default, so a future engineer has to
*opt in* to blending visual signals into a score, rather than risk silently
inheriting them.

## 3. Integration points

- `src/lib/visuals/visualMasteryPersistence.ts` — pure adapter
  (`buildVisualMasteryEvidence`) plus a client-side fire-and-forget helper
  (`persistVisualMasterySummary`) that POSTs to the API and never throws.
- `src/app/api/visual-mastery/persist/route.ts` — `POST` (authenticated,
  zod-validated, writes via `prisma.evidenceRecord.createMany`) and `GET`
  (authenticated, returns the caller's own `VISUAL` rows, newest first,
  max 50) — used only by the dev-only viewer.
- `PracticeQuiz.tsx`, `AssessmentQuiz.tsx`, `MockTestQuiz.tsx` — each calls
  `persistVisualMasterySummary()` exactly once, immediately after its
  existing `setResult(data); setPhase('results')` on successful submission
  (Task 4). The call is `void`-fired (not awaited), so a slow or failed
  save can never delay or alter the results screen, scoring, or
  `submitAnswers()`'s existing control flow.
- `src/components/visuals/VisualMasteryViewer.tsx` — dev-only (renders
  `null` outside `NODE_ENV === 'development'`), fetches the `GET` endpoint
  and displays both the raw saved rows and an aggregated "persisted
  summary" (Task 5).
- `src/app/dev/visual-demo/VisualDemo.tsx` — new "Sprint M — Visual Mastery
  Persistence" section: a manual "Persist current session summary" button
  (this page has no quiz-completion event of its own to hook), plus the
  viewer rendered live below it (Task 5/7 demo).

No changes to `submitAnswers()`'s scoring logic, `TopicProgress`,
`StudentProgress`, XP, pass/fail rules, or Tutor Max prompts in any of the
three quiz components.

## 4. Demonstration results

Verified end-to-end against the local dev server and a real seeded demo
account (`shot.student@mytutor-demo.local`), one POST per engine followed
by a GET:

```
POST graph         -> 200 {"saved":1}
POST number_line    -> 200 {"saved":1}
POST geometry        -> 200 {"saved":1}
POST process_flow    -> 200 {"saved":1}
GET  -> 200, 4 records returned

 - process_flow  score: 100  weight: 0  shown: 1  completed: 1
 - geometry      score: 0    weight: 0  shown: 1  completed: 0
 - number_line   score: 100  weight: 0  shown: 1  completed: 1
 - graph         score: 50   weight: 0  shown: 2  completed: 1
```

All four engines: **saved** (POST returns `{"saved":1}` per engine),
**retrieved** (GET returns all 4 rows with correct `notes`), **displayed**
(same shape the `VisualMasteryViewer` renders). Confirmed separately that
this test data produced **zero** new `TopicProgress` rows
(`topicProgress.findMany({ where: { topicSlug: { startsWith: 'verify-' } } })`
returned 0 rows) — the persistence path is fully isolated from grading
tables, as designed. Test rows were deleted after verification; no demo
data was left behind.

## 5. Future intelligence opportunities (Task 6 — review only, not implemented)

How persisted visual mastery evidence *could* later inform the existing
educational-intelligence surfaces, without changing any of their current
formulas:

- **Recommendations** (`src/lib/school/adaptive/masteryIntelligence.ts` and
  the Learning Navigator): a topic where a student has high
  `TopicProgress.masteryPct` from text-based practice but a low or absent
  `EvidenceRecord(type: VISUAL)` completion rate could surface a
  *supplementary* recommendation — "try the visual for this topic" — read
  alongside, never instead of, the existing mastery signal.
- **Weak-point detection**
  (`src/lib/school/analytics/learningEffectiveness.ts`): a low visual
  `shown`-to-`completed` ratio for a concept (e.g. a student repeatedly
  abandons graph challenges before reaching the target) is itself a signal
  distinct from quiz-question accuracy — it could flag a *visual-spatial*
  difficulty even when text-based scores look fine, or vice versa.
  Currently undetectable, since visual interaction data didn't outlive the
  session before this sprint.
- **Revision planning** (`src/lib/school/adaptive/spacedRevision.ts`):
  topics whose only mastery evidence is visual (high
  `EvidenceRecord(type:VISUAL)` completion, low `TopicProgress.attempts`)
  could be prioritized differently in a spaced-revision schedule than
  topics mastered purely through repeated text practice — a richer signal
  for *how* a concept was learned, not just *whether*.
- **Adaptive learning** (Teaching Strategy Engine, Sprint I): the
  `concept`/`visualType` already embedded in each persisted row's `notes`
  could eventually feed back into `planVisualTeaching()`'s decision of
  *which* visual to show next for a given student — e.g. preferring number
  lines for a student whose persisted history shows high number-line
  completion and low geometry completion. This would be a read of
  historical evidence to bias a future teaching choice, not a change to
  how any single visual is rendered or graded today.

All four are described as *possible future reads* of the new
`EvidenceRecord(type: VISUAL)` rows — none are implemented this sprint, per
the brief's "No implementation" instruction for this task.

## 6. Remaining gaps

- `VisualMasteryViewer`'s GET endpoint is a normal authenticated route, not
  itself environment-gated — only the component (and the `/dev/visual-demo`
  page, which 404s in production) hide it from end users. This matches the
  precedent set by `VisualMasteryDevSummary` in Sprint L.
- No retention/cleanup policy exists for `EvidenceRecord(type: VISUAL)`
  rows — they accumulate indefinitely, same as every other `EvidenceRecord`
  row would. Acceptable for this sprint's scope; worth revisiting if volume
  becomes a concern.
- `MockTestQuiz`'s `topicSlug` is synthesized as `mock-${testType}` since
  mock tests aren't scoped to a single chapter the way Practice/Assessment
  are — this is a reasonable but somewhat arbitrary convention or a future
  refinement.
- The persistence call from each quiz component is fire-and-forget with no
  retry — a failed save (e.g. transient network issue) is silently
  dropped. This is intentional (matches the "must never affect grading"
  requirement) but means data loss is possible on save failure, not just
  on session abandonment before this sprint's work.
- No screenshots were captured of the new demo section (consistent with
  Sprint L's report, which also noted this as a gap rather than a blocker).

## Validation results

```
npx tsc --noEmit   -> clean, zero errors
npm run build      -> succeeded (Postgres running locally during this build;
                      no Prisma connection errors this time, unlike the
                      Sprint L validation pass). /api/visual-mastery/persist
                      appears in the route list; all 82 pages generated.
```

Sprint B–L functionality unchanged: no edits to any renderer's rendering or
challenge logic, no edits to `useVisualMastery.ts`'s collector logic, no
edits to `submitAnswers()`/scoring in any quiz component beyond appending
one `void persistVisualMasterySummary(...)` call after the existing
success path. Existing grading, XP, and assessment pass/fail logic in
`TopicProgress`/`StudentProgress` were not read or written by any new code
this sprint — confirmed directly during the Section 4 demonstration (zero
new `TopicProgress` rows from the verification POSTs).

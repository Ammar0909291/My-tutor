# Educational Intelligence Audit — Sprint 1, Task 1

Audit of `TopicProgress`, `StudentProgress`, `EvidenceRecord`,
`VisualLearningProfile`, weakness detection, revision systems, and
practice systems, to identify available signals, missing signals, and
the safest integration points for a new, read-only
weakness-based revision recommendation layer.

## 1. TopicProgress

`prisma/schema.prisma:334-354`. Fields: `userId, subjectSlug, topicSlug,
status (TopicStatus), masteryPct, attempts, lastScore, completedAt,
revisionCount, lastRevisionAt`.

**Readers** (19 files): `src/lib/school/adaptive/{spacedRevision,
weakTopics, examReadiness, masteryIntelligence, learningMomentum,
prerequisiteRecovery, lessonPlanner, learningProfile}.ts`,
`src/lib/school/{schoolProgress, reports/progressReport,
analytics/learningEffectiveness, exams/mockTestEngine}.ts`,
`src/lib/analytics/coachInsights.ts`, `src/lib/ai/learnerProfile.ts`,
`src/lib/dashboard/getDashboardV2Data.ts`,
`src/app/api/{topic-progress,curriculum,learn/chat,
school/practice/submit,assessment/evaluate}/route.ts`.

**Writers** (only these mutate it): `src/app/api/topic-progress/route.ts`
(upsert), `src/app/api/school/practice/submit/route.ts` (upsert:
`status, masteryPct, attempts, lastScore, completedAt`),
`src/app/api/assessment/evaluate/route.ts` (upsert),
`src/lib/school/adaptive/spacedRevision.ts` (`advanceRevision()` — the
**only** writer of `revisionCount`/`lastRevisionAt`).

**Available signal**: `masteryPct` and `lastScore` are persisted mastery
scores per KG node — directly usable, read-only, to classify a topic as
a strength or weakness.

**Missing signal**: no production code today reads `masteryPct` to
decide revision priority — `spacedRevision.ts`'s "due" calculation is
purely time-based (forgetting-curve interval since `lastRevisionAt`/
`completedAt`), never mastery-based. This sprint's `recommendedRevisionTopics`
fills that specific gap without modifying `spacedRevision.ts`.

## 2. StudentProgress

`prisma/schema.prisma:612-631`. Fields: `userId, subjectCode,
currentLesson, completedLessons[], lastStudiedAt, isCompleted,
completedAt, completionPercent`. This is the legacy lesson-based
tracker (`subjectCode`, e.g. `"python"`), architecturally separate from
the KG-node `TopicProgress` system (`subjectSlug`, e.g.
`"computer_science"`) — **the two do not share an identifier
namespace**, so cross-referencing them only succeeds where a
`subjectCode` happens to equal a `subjectSlug`.

**Available signal**: `lastStudiedAt` per subject — usable, read-only,
as a staleness/recency annotation on a recommendation (e.g. "not
studied in 14 days").

**Missing signal**: no topic-level granularity — only subject-level
lesson progress, so it cannot identify *which* topic within a subject
is weak; it can only annotate recency.

## 3. EvidenceRecord

`prisma/schema.prisma:367-396`. `EvidenceType` enum has six values
(`QUIZ, PRACTICE, PROJECT, REVIEW, ASSESSMENT, VISUAL`) but **only
`VISUAL` is ever written** anywhere in the codebase (sole writer:
`src/app/api/visual-mastery/persist/route.ts`, always `weight: 0`).
Quiz/practice evidence instead lives in `TopicProgress.attempts/
lastScore` and in `MistakeRecord` — not in `EvidenceRecord`. This
sprint does not change that; it reads `EvidenceRecord(type: VISUAL)`
exclusively via the existing, unmodified
`getVisualLearningProfile()`/`detectVisualWeaknesses()` (Sprint N).

## 4. VisualLearningProfile / weakness detection (Sprints M–P — unmodified)

`src/lib/visuals/visualMasteryProfile.ts` exports `VisualLearningProfile`,
`buildVisualLearningProfile()`, `getVisualLearningProfile(userId)`,
`detectVisualWeaknesses(profile, thresholdPct = 50)` →
`VisualWeaknessEntry[]`. `src/lib/visuals/visualMasteryRecommendations.ts`
exports `buildVisualLearningRecommendations()`. All are pure or
single-purpose read-only Prisma calls, already complete — this sprint
calls them, never edits them.

## 5. Revision systems

- `src/lib/school/adaptive/spacedRevision.ts` — time/forgetting-curve
  based (`getDueRevisions`, `advanceRevision`). Never reads
  `masteryPct`/`lastScore`. Not modified this sprint; noted as a
  parallel, disconnected signal (Task 7 future roadmap covers merging
  them later).
- `src/lib/school/adaptive/weakTopics.ts` — `MistakeRecord`-severity
  based (`getWeakTopics`, `getRevisionChapters`,
  `getRecommendedRevisionChapter`). A different, already-complete
  weakness engine, oriented around mistake recency/severity rather than
  mastery percentage. Not modified, not duplicated — this sprint's
  `RevisionProfile` is mastery-percentage-based and visual-engagement-
  based, a distinct signal source from mistake severity.

**Three currently-disconnected weakness signals exist**: time-based
(spaced revision), mistake-severity-based (`weakTopics.ts`), and now
(this sprint) mastery-percentage-based + visual-engagement-based. They
are not merged in Sprint 1 — see Task 7 (Future Targeted Practice
Review) for how a later sprint could combine them, without touching
any of their existing logic.

## 6. Practice systems

`src/app/api/school/practice/{generate,submit}/route.ts`. `generate`
picks chapters from the static curriculum, independent of any weakness
signal. `submit` reads `TopicProgress` only to avoid downgrading
already-`MASTERED` nodes, and creates `MistakeRecord` rows for
`result.weakNodeIds`. Neither route reads `EvidenceRecord` or
`VisualLearningProfile`. **Missing signal**: practice topic selection
does not currently use any weakness signal at generation time — this
is the integration point flagged for a *future* sprint (Task 7), not
implemented now per the brief ("Recommendations only — no automatic
assignments").

## 7. Dev-only intelligence viewer

`src/components/visuals/VisualMasteryViewer.tsx`, gated by
`if (process.env.NODE_ENV !== 'development') return null` (both at the
effect and the render), mounted in
`src/app/dev/visual-demo/VisualDemo.tsx:531`. This sprint adds a sibling
component, `RevisionIntelligenceViewer`, using the identical gate, and
mounts it on the same dev-only page — no existing dev viewer code is
modified.

## 8. KnowledgeNode title lookup

`src/lib/education/educationTypes.ts` defines `KnowledgeNode { id,
domain, title, description, difficulty, prerequisites[] }`; source array
`ALL_KG_NODES` (`src/lib/education/educationGraph.ts`). No shared
lookup helper exists — every consumer (`progressReport.ts`,
`spacedRevision.ts`, `learningOrchestrator.ts`, `weakTopics.ts`)
builds its own local `Map`. This sprint's `revisionProfile.ts` follows
the same established pattern rather than introducing a new shared
helper (out of scope; a refactor candidate, not a Sprint 1 task).

## Safest integration points (conclusion)

1. **`src/lib/intelligence/revisionProfile.ts`** — a new, pure
   aggregation module, structurally identical in spirit to
   `visualMasteryProfile.ts`: one read-only Prisma wrapper
   (`getRevisionProfile(userId)`) plus a pure builder
   (`buildRevisionProfile()`) that takes already-fetched
   `TopicProgress` rows and the already-built `VisualLearningProfile`/
   weaknesses (calling Sprint N's functions, never reimplementing
   them).
2. **`src/lib/intelligence/revisionRecommendations.ts`** — a pure
   function over the `RevisionProfile` (plus `StudentProgress` rows for
   recency annotation only), mirroring the N→O→P layering
   (`generateVisualGuidance` consumes `detectVisualWeaknesses` output
   without recomputing it).
3. **`src/app/api/intelligence/revision-profile/route.ts`** — a new,
   normal authenticated `GET` route (same security posture as every
   other route in the app), used only by the new dev-only viewer — no
   production page calls it this sprint.
4. **`src/components/intelligence/RevisionIntelligenceViewer.tsx`** —
   new dev-gated component, mounted alongside `VisualMasteryViewer` on
   the existing `/dev/visual-demo` page.

None of these four insertion points write to `TopicProgress`,
`StudentProgress`, `EvidenceRecord`, or any grading/XP table — all are
read-only consumers of already-persisted data, exactly mirroring the
read-only architecture established in Sprints M–Q.

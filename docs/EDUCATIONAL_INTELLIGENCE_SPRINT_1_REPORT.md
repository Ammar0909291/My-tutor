# Educational Intelligence Sprint 1 Report — Weakness-Based Revision System

Goal: use existing intelligence (mastery data, visual learning profile)
to generate targeted, learner-facing revision recommendations — without
rebuilding any visual engine, and without touching grading, XP,
scoring, pass/fail rules, curriculum, or Tutor Max prompts.

## 1. Audit results

Full detail in `docs/EDUCATIONAL_INTELLIGENCE_REVISION_AUDIT.md`.
Summary:

- `TopicProgress.masteryPct`/`lastScore` are persisted, read-only,
  per-KG-node mastery signals that **no existing production code uses
  to drive revision** — `spacedRevision.ts`'s "due" logic is purely
  time-based, never mastery-based. This is the gap Sprint 1 fills.
- `StudentProgress` is the legacy lesson tracker (`subjectCode`),
  architecturally separate from the KG-node `TopicProgress` system
  (`subjectSlug`) — useful only as a recency annotation, and only where
  the two identifier namespaces happen to coincide.
- `EvidenceRecord` only ever stores `type: VISUAL` rows in production;
  Sprint N's `VisualLearningProfile`/`detectVisualWeaknesses()` (read
  exclusively, never modified) remain the sole source of visual
  weakness signal.
- Two other weakness engines already exist and are intentionally left
  untouched and unduplicated: `spacedRevision.ts` (time/forgetting-curve)
  and `weakTopics.ts` (`MistakeRecord` severity-scoring). Sprint 1
  introduces a third, independent signal — mastery-percentage-based —
  rather than merging into either.
- No production route currently reads any weakness signal at practice-
  generation time; this remains out of scope for Sprint 1 (Task 7
  covers it as a future architecture review only).

## 2. Revision profile architecture

`src/lib/intelligence/revisionProfile.ts`:

```ts
export interface RevisionProfile {
  strengths: TopicMasterySignal[]
  weaknesses: TopicMasterySignal[]
  visualWeaknesses: VisualWeaknessEntry[]          // Sprint N, unmodified
  recommendedRevisionTopics: RecommendedRevisionTopic[]
}
```

- `buildRevisionProfile(topicRows, visualWeaknesses)` — pure function,
  classifies each non-`NOT_STARTED` `TopicProgress` row as a strength
  (`masteryPct >= 75` or status `MASTERED`) or a weakness
  (`masteryPct < 50`), sorted strongest/weakest-first. Takes
  Sprint N's already-computed `visualWeaknesses` as a parameter rather
  than recomputing them.
- `getRevisionProfile(userId)` — the only new Prisma call, reads
  `TopicProgress` only (read-only `findMany`), and calls Sprint N's own
  existing `getVisualLearningProfile()`/`detectVisualWeaknesses()`
  rather than re-querying `EvidenceRecord` itself.

This mirrors the exact architecture pattern of
`visualMasteryProfile.ts` — one pure builder, one thin read-only
Prisma wrapper.

## 3. Recommendation architecture

`src/lib/intelligence/revisionRecommendations.ts`:

```ts
export interface RevisionRecommendations {
  review: ReviewRecommendation[]     // "Review: Photosynthesis, ..." — from TopicProgress weaknesses
  practice: PracticeRecommendation[] // "Practice: Process Flow Activities, ..." — from visual weaknesses
}

export function generateRevisionRecommendations(
  profile: RevisionProfile,
  studentProgressRows: StudentProgressRow[] = []
): RevisionRecommendations
```

- `review` items come from `profile.recommendedRevisionTopics` (top 5
  weakest topics), each optionally annotated with
  `daysSinceLastStudied` by matching `StudentProgress.subjectCode` to
  the topic's `subjectSlug` — recency context only, never a gating
  condition.
- `practice` items come directly from `profile.visualWeaknesses`,
  mapped to a friendly activity label (e.g. `process_flow` → "Process
  Flow Activities").
- Pure function: same `RevisionProfile` in, same recommendations out,
  every time. No automatic assignment of practice or revision tasks —
  recommendations only, per the brief.

`src/app/api/intelligence/revision-profile/route.ts` — `GET` only,
authenticated, read-only, returns `{ profile, recommendations }`. Used
only by the new dev-only viewer this sprint.

## 4. Demonstration results

Using the demo account (`shot.student@mytutor-demo.local`), which
already has real `python` `StudentProgress`/`TopicProgress` history
from prior sprints, additional data was seeded to exercise all three
required scenarios:

| Signal | Seeded data | Result |
|---|---|---|
| Strong graph mastery | `EvidenceRecord(VISUAL)`: graph 10 shown / 9 completed (90%) | Not flagged as a visual weakness (above 50% threshold) |
| Weak process-flow mastery | `EvidenceRecord(VISUAL)`: process_flow 10 shown / 1 completed (10%) | `visualWeaknesses` → `process_flow`, 10% |
| Mixed topic progress | `TopicProgress`: `sprint1-demo-strong-topic` MASTERED 92%, `sprint1-demo-weak-topic` IN_PROGRESS 28% (plus the account's pre-existing real `python` topics, mostly 76–98% MASTERED/COMPLETED) | `strengths` includes 6 topics (the seeded strong one + 5 real ones); `weaknesses` includes exactly the seeded weak topic |

A full NextAuth credentials login was performed against the running
dev server, then `GET /api/intelligence/revision-profile` was called
as the authenticated user. Verified response:

```json
"weaknesses": [{ "topicSlug": "sprint1-demo-weak-topic", "masteryPct": 28, "status": "IN_PROGRESS" }],
"visualWeaknesses": [{ "visualType": "process_flow", "completionRatePct": 10 }],
"recommendedRevisionTopics": [{ "topicSlug": "sprint1-demo-weak-topic", "masteryPct": 28 }],
"recommendations": {
  "review": [{ "title": "sprint1 demo weak topic", "masteryPct": 28, "daysSinceLastStudied": null }],
  "practice": [{ "visualType": "process_flow", "label": "Process Flow Activities", "completionRatePct": 10 }]
}
```

`daysSinceLastStudied: null` correctly demonstrates the documented
identifier-namespace caveat: the weak topic's `subjectSlug` is
`computer_science`, but the demo account's only `StudentProgress` row
is `subjectCode: "python"` — no match, so the recency annotation is
correctly omitted rather than guessed.

All seeded `EvidenceRecord` and demo `TopicProgress` rows were deleted
afterward; confirmed zero residual rows for both.

## 5. Future targeted-practice path (architecture review only)

A future sprint could connect today's read-only recommendations to
actual practice generation without touching grading:

```
Weakness (TopicProgress.masteryPct, or VisualLearningProfile)
   ↓
Recommendation (this sprint's review/practice lists — already exists)
   ↓
Targeted Practice (future): pass `recommendedRevisionTopics[].topicSlug`
   into `getSchoolChapters()`'s chapter-selection step in
   `src/app/api/school/practice/generate/route.ts`, as an additional
   *input* to which chapter/topic is offered next — purely a selection
   bias, not a change to `evaluatePracticeAnswer.ts`'s scoring or
   `practice/submit/route.ts`'s `TopicProgress` write logic.
```

This would require zero changes to grading: `generate/route.ts`
already separates "which chapter to generate questions for" from
`submit/route.ts`'s scoring, so a future weakness-aware chapter
selector only changes the first step. It would also need to reconcile
with `spacedRevision.ts`'s due-list and `weakTopics.ts`'s severity
scoring — not done this sprint, since the brief asks for recommendations
only, not automatic assignment.

## 6. Remaining intelligence gaps

- `TopicProgress.subjectSlug` and `StudentProgress.subjectCode` are
  different identifier namespaces; a future sprint would need either a
  shared mapping or to retire one tracker before recency annotations
  can be reliable across the whole catalog.
- No shared `KnowledgeNode` title-lookup helper exists; this sprint
  followed the existing copy-pasted-`Map` pattern rather than
  introducing one (out of scope for a recommendations-only sprint).
- Three weakness signals (time-based, mistake-severity-based,
  mastery-percentage-based) remain disconnected by design this sprint;
  merging them is a future architecture decision, not implemented here.
- `EvidenceRecord` types `QUIZ`/`PRACTICE`/`PROJECT`/`REVIEW`/
  `ASSESSMENT` remain unused — quiz/practice evidence still lives only
  in `TopicProgress`/`MistakeRecord`. Not changed this sprint.

## Validation

- `npx tsc --noEmit` — clean, zero errors.
- `npm run build` — succeeds; `/dev/visual-demo` and the new
  `/api/intelligence/revision-profile` route build as expected.
- Sprint B–Q functionality: untouched — only new files plus two
  additive lines (one import, one JSX line) in
  `src/app/dev/visual-demo/VisualDemo.tsx` were added.
- Grading, XP, assessments, curriculum: untouched — no scoring,
  grading, or curriculum file was modified; the only Prisma calls added
  are read-only `findMany` queries.

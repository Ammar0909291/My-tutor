# Educational Intelligence Sprint 4 Report — Improvement Tracking

Goal: answer "is the learner getting better?" by tracking mastery
trends over time, built entirely on top of Sprint 1's `RevisionProfile`,
Sprint 2's `PracticeTargetPlan`, and Sprint 3's `RetestCandidatePlan`
(all three reused unmodified), without touching grading, XP, scoring,
pass/fail rules, curriculum, or Tutor Max prompts, and without
building any promotion-readiness system.

## 1. Improvement architecture

Full audit in `docs/EDUCATIONAL_INTELLIGENCE_IMPROVEMENT_AUDIT.md`
(Task 1). Key finding: `TopicProgress.masteryPct`/`lastScore` are
**both overwritten** on every submission (confirmed by reading
`practice/submit/route.ts:73-81` and `assessment/submit/route.ts:121-123`)
— the row itself retains no history, so it cannot answer a "previous
vs current" question on its own. The actual historical signal already
in the schema is `PracticeSession` (one timestamped, never-overwritten
row per attempt) plus `EvidenceRecord(VISUAL)` (already read once by
`getVisualLearningProfile()`, read a second time here to recover the
per-row timestamps the aggregate profile discards).

**Identifier-namespace finding**: for school-chapter sessions,
`PracticeSession.topicSlug` is set to the **chapter ID**
(`practice/generate/route.ts:57`, `assessment/generate/route.ts:57`),
not a KG-node `topicSlug` — a third instance of the namespace pattern
already documented in Sprints 1–3. This is resolved, not avoided: the
new API route expands each chapter session into one history point per
`chapter.kgNodeIds` entry via the existing, unmodified
`getSchoolChapters()` (the same lookup `assessment/submit/route.ts`
already uses). Separately, legacy topic-level sessions
(`/api/practice/submit/route.ts`, `chapterId: null`) already use the
real KG-node `topicSlug` directly — these are accepted only when the
pair already appears in the user's own `TopicProgress` rows, which
correctly excludes subject-level mock-test sessions
(`mock/generate/route.ts:62`, `topicSlug: subjectSlug`) from being
misread as topic history.

```
PracticeSession (chapter-keyed or legacy topic-keyed, timestamped score history)
  + chapter.kgNodeIds (existing getSchoolChapters() lookup, unmodified)
       → TopicScoreHistoryRow[] { subjectSlug, topicSlug, score, completedAt }

EvidenceRecord(VISUAL) (already read by getVisualLearningProfile(), read again here)
       → VisualEvidenceHistoryRow[] { visualType, shown, completed, createdAt }
```

`src/lib/intelligence/improvementTracking.ts` (Tasks 2/3) is a pure
function module — no Prisma dependency, no writes:

- `analyzeImprovement(profile, historyRows, visualHistoryRows, targets?, retestCandidates?): ImprovementSummary`
- Groups history rows by topic/visual type, requires at least two
  points (omits topics with only one attempt rather than guessing),
  sorts chronologically, and compares earliest vs. latest score
  (topics) or earliest-half vs. latest-half completion rate (visuals).
- Reuses `RevisionProfile.strengths`/`weaknesses` only to resolve
  titles (both already carry `.title`), and `PracticeTargetPlan`/
  `RetestCandidatePlan` only to set a context-only `flagged` boolean —
  never to compute the trend itself.

`src/app/api/intelligence/improvement-tracking/route.ts` (Task 4
backing route) — `GET` only, `auth()`-gated, read-only. New, sibling to
the existing practice-targets/retest-candidates routes (neither edited
in place). The only new Prisma reads: `PracticeSession` (never read by
any prior Educational Intelligence sprint) and a second
`EvidenceRecord(VISUAL)` read. Returns
`{ profile, targets, retestCandidates, improvement }`.

`src/components/intelligence/ImprovementTrackingViewer.tsx` (Task 4
viewer) — new dev-only sibling component, gated identically to every
prior viewer. Displays improving/stable/declining lists. Mounted on
`src/app/dev/visual-demo/VisualDemo.tsx` directly below
`RetestIntelligenceViewer`, under a new heading.

## 2. Tracking model

```ts
export interface TopicImprovementEntry {
  topic: string
  previousMastery: number
  currentMastery: number
  improvementPct: number          // currentMastery - previousMastery
  status: 'improving' | 'stable' | 'declining'
  subjectSlug?: string             // topic-based entries only
  topicSlug?: string                // topic-based entries only
  visualType?: string               // visual-based entries only
  flagged: boolean                  // currently in a Sprint 2/3 plan — context only
}

export const IMPROVEMENT_THRESHOLD_PCT = 10
// improvementPct >= +10  -> improving
// improvementPct <= -10  -> declining
// otherwise               -> stable
```

Deterministic and reuse-only: no new mastery percentage is computed
anywhere — `previousMastery`/`currentMastery` are read verbatim from
already-persisted `PracticeSession.score` / derived `EvidenceRecord`
completion rates, and `improvementPct` is a plain subtraction.

## 3. Demonstration results

Using the existing demo account (`shot.student@mytutor-demo.local`),
three legacy topic-level `PracticeSession` histories (3 attempts each,
spaced two days apart) plus matching `TopicProgress` rows were seeded
to exercise all three required scenarios, then deleted afterward:

| Signal | Seeded scores (chronological) | Result |
|---|---|---|
| Improving topic | `sprint4-demo-improving-topic`: 22 → 35 → 48 | `previousMastery: 22, currentMastery: 48, improvementPct: 26, status: "improving"` — reproduces the brief's own example numbers exactly |
| Stable topic | `sprint4-demo-stable-topic`: 60 → 58 → 64 | `previousMastery: 60, currentMastery: 64, improvementPct: 4, status: "stable"` (within the ±10 threshold) |
| Declining topic | `sprint4-demo-declining-topic`: 70 → 55 → 40 | `previousMastery: 70, currentMastery: 40, improvementPct: -30, status: "declining"` |

A full NextAuth credentials login was performed against the running
dev server, then `GET /api/intelligence/improvement-tracking` was
called as the authenticated user. Verified response (`improvement`
section):

```json
{
  "improving": [{ "topic": "sprint4 demo improving topic", "previousMastery": 22, "currentMastery": 48, "improvementPct": 26, "status": "improving", "flagged": true }],
  "stable":    [{ "topic": "sprint4 demo stable topic",    "previousMastery": 60, "currentMastery": 64, "improvementPct": 4,  "status": "stable",    "flagged": false }],
  "declining": [{ "topic": "sprint4 demo declining topic", "previousMastery": 70, "currentMastery": 40, "improvementPct": -30, "status": "declining", "flagged": true }]
}
```

All three statuses classified correctly at the documented thresholds.
The improving and declining topics both correctly show `flagged: true`
(both are still weak enough to appear in the current
`PracticeTargetPlan`/`RetestCandidatePlan`, since 48% and 40% are both
below Sprint 1's 50% weakness cutoff), while the stable topic (64%,
above the cutoff) correctly shows `flagged: false` — confirming the
flag is read from Sprint 2/3's existing output, not recomputed.

All seeded `PracticeSession` and `TopicProgress` rows were deleted
afterward; confirmed zero residual rows for both (`residual
practiceSession: 0`, `residual topicProgress: 0`).

## 4. Promotion-readiness path (architecture review only — not implemented)

A future sprint could extend today's read-only improvement summaries
into a promotion-readiness signal without touching grading:

```
Weakness (Sprint 1 — RevisionProfile.weaknesses/visualWeaknesses)
   ↓
Practice Target (Sprint 2 — PracticeTargetPlan, priority-banded)
   ↓
Retest Candidate (Sprint 3 — RetestCandidatePlan, same priority reused)
   ↓
Improvement (this sprint — ImprovementSummary, trend over PracticeSession/EvidenceRecord history)
   ↓
Promotion Readiness (future): a topic could be considered "ready" once
   it satisfies all of: (a) no longer appears in RevisionProfile.weaknesses
   (i.e. masteryPct >= Sprint 1's 50% threshold), (b) its improvement
   status is "improving" or "stable" rather than "declining" (this
   sprint's signal), and (c) it has accumulated enough PracticeSession
   attempts to be confident the current score isn't a one-off (the same
   ATTEMPT_ESCALATION_THRESHOLD-style attempt-count reasoning Sprint 2
   already uses, applied in the opposite direction). All three
   ingredients already exist after this sprint — promotion readiness
   would be a read-only combination of them, not a new mastery system.
```

This requires zero new grading or write logic — every signal it would
combine is already produced, read-only, by Sprints 1–4. Per the brief,
no promotion-readiness system is built this sprint.

## 5. Remaining intelligence gaps

- `StudentProgress` remains unread by this sprint's pipeline, same
  reasoning as Sprint 3 (namespace mismatch with `TopicProgress`).
- Topics/visual types with only one recorded attempt produce no
  improvement entry at all (correctly omitted rather than guessed) —
  a learner's very first attempt at anything is invisible to this
  sprint's trend analysis until a second attempt exists.
- The `IMPROVEMENT_THRESHOLD_PCT = 10` band-width is a single fixed
  constant for both topic-score trends and visual completion-rate
  trends; a future sprint might tune these independently if visual
  completion rates prove noisier than topic scores in practice — not
  done here, since the brief asks for deterministic, non-invented
  logic only.
- Subject-level mock-test `PracticeSession` rows
  (`mock/generate/route.ts`, `topicSlug: subjectSlug`) are deliberately
  excluded from topic-level history (their `topicSlug` is not a real
  KG node), so mock-test performance trends are not yet represented in
  `ImprovementSummary` — a future sprint could fold them in via
  `mockResult.chapterIds` (already collected at generation time) the
  same way chapter sessions are expanded here.
- No production route or UI consumes `ImprovementSummary` yet — per
  the brief, Task 4's viewer is dev-only and Task 7's promotion-
  readiness path is documentation only.

## Validation

- `npx tsc --noEmit` — clean, zero errors.
- `npm run build` — succeeds; `/api/intelligence/improvement-tracking`
  and the extended `/dev/visual-demo` page build as expected alongside
  every pre-existing route.
- Sprint B–Q and Educational Intelligence Sprints 1–3: unchanged —
  `git status` confirmed only new files
  (`docs/EDUCATIONAL_INTELLIGENCE_IMPROVEMENT_AUDIT.md`,
  `src/lib/intelligence/improvementTracking.ts`,
  `src/app/api/intelligence/improvement-tracking/route.ts`,
  `src/components/intelligence/ImprovementTrackingViewer.tsx`) plus one
  additive edit to `src/app/dev/visual-demo/VisualDemo.tsx` (one new
  import, one new mount block) — no existing Sprint 1/2/3 file
  (`revisionProfile.ts`, `revisionRecommendations.ts`,
  `practiceTargets.ts`, `retestCandidates.ts`, any existing API route,
  or any existing viewer component) was modified.
- Grading, XP, assessments, curriculum: untouched — no scoring,
  grading, or curriculum file was modified; no new Prisma writes were
  added; no promotion-readiness system was built, per the brief.

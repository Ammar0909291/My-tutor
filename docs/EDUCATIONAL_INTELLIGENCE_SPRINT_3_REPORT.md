# Educational Intelligence Sprint 3 Report — Retest Intelligence

Goal: identify when a learner should be retested, answering "what
should be re-evaluated after practice?" — built entirely on top of
Sprint 1's `RevisionProfile` and Sprint 2's `PracticeTargetPlan` (both
reused unmodified), without touching grading, XP, scoring, pass/fail
rules, curriculum, or Tutor Max prompts, and without building any
improvement-tracking system.

## 1. Retest architecture

Full audit in `docs/EDUCATIONAL_INTELLIGENCE_RETEST_AUDIT.md` (Task 1).
Summary:

```
RevisionProfile.weaknesses / visualWeaknesses (Sprint 1, unmodified)
  + PracticeTargetPlan.{high,medium,low} (Sprint 2, unmodified — priority already computed)
       → RetestCandidate { topic, reason, retestPriority } per weak topic/visual area
```

`src/lib/intelligence/retestCandidates.ts` (Tasks 2/3) is a pure
function module — no Prisma dependency, no writes:

- `generateRetestCandidates(targets: PracticeTargetPlan): RetestCandidatePlan`
- Maps every existing `PracticeTarget` (Sprint 2, unmodified) to a
  `RetestCandidate` in the **same** priority band — `retestPriority`
  is read directly from `target.priority`, never recomputed from a raw
  percentage a second time. No new mastery system, no new severity
  scale, exactly per the brief's rules.
- Does not call or modify `revisionProfile.ts`, `revisionRecommendations.ts`,
  or `practiceTargets.ts` — all three remain exactly as Sprint 1/2 left
  them.

`src/app/api/intelligence/retest-candidates/route.ts` (Task 4 backing
route) — `GET` only, `auth()`-gated, read-only. New, sibling to
Sprint 2's `practice-targets` route (left unmodified) rather than
edited in place, preserving the "Sprint 2 unchanged" validation
requirement. Reuses `getRevisionProfile()` and
`generatePracticeTargets()` unmodified; requires **zero** new Prisma
reads beyond what Sprint 2's pipeline already fetches (the existing
`TopicProgress.attempts` read is reused as-is for the escalation step
inside `generatePracticeTargets()`). Returns
`{ profile, targets, retestCandidates }`.

`src/components/intelligence/RetestIntelligenceViewer.tsx` (Task 4
viewer) — new dev-only sibling component to `PracticeTargetsViewer`,
gated identically (`NODE_ENV !== 'development'` → `null`, both in the
fetch effect and the render). Displays Sprint 2's practice target plan
alongside the new high/medium/low retest candidate plan. Mounted on
`src/app/dev/visual-demo/VisualDemo.tsx` directly below
`PracticeTargetsViewer`, under a new heading — no new dev route
created, consistent with every prior sprint's single shared dev page.

## 2. Candidate model

```ts
export interface RetestCandidate {
  topic: string
  reason: string
  retestPriority: 'high' | 'medium' | 'low'
  subjectSlug?: string   // topic-based candidates only
  topicSlug?: string     // topic-based candidates only
  visualType?: string    // visual-based candidates only
}
```

- `retestPriority` is identical to the matching `PracticeTarget.priority`
  — `high`-priority practice targets produce `high`-retestPriority
  candidates, and so on. This is a direct, lossless mapping, not a
  re-derivation.
- `reason` is a fixed string per band (`"high-priority weakness"`,
  `"medium-priority weakness"`, `"low-priority weakness"`) — matching
  the brief's own example (`"high-priority weakness"` for Photosynthesis).
- Every `PracticeTarget` produces exactly one `RetestCandidate` in the
  same band; there is no filtering or re-ranking step. A weakness with
  no corresponding practice target cannot occur, since `practiceTargets.ts`
  derives every target from the same `weaknesses`/`visualWeaknesses`
  lists `retestCandidates.ts` ultimately traces back to.

## 3. Demonstration results

Using the existing demo account (`shot.student@mytutor-demo.local`),
the following `TopicProgress` rows were seeded to exercise all three
required scenarios, then deleted afterward:

| Signal | Seeded data | Practice target (Sprint 2) | Retest candidate (Sprint 3) |
|---|---|---|---|
| Strong topic | `sprint3-demo-strong-topic`, MASTERED, 90% | none (excluded from weaknesses) | none |
| Weak topic (low band) | `sprint3-demo-weak-topic-low`, IN_PROGRESS, 48% | `targets.low` | `retestCandidates.low`, `retestPriority: "low"` |
| High-priority practice target | `sprint3-demo-weak-topic-high`, IN_PROGRESS, 15% | `targets.high` | `retestCandidates.high`, `retestPriority: "high"` |

A full NextAuth credentials login was performed against the running
dev server, then `GET /api/intelligence/retest-candidates` was called
as the authenticated user. Verified response (`retestCandidates`
section):

```json
"retestCandidates": {
  "high": [
    { "topic": "sprint3 demo weak topic high", "reason": "high-priority weakness", "retestPriority": "high",
      "subjectSlug": "computer_science", "topicSlug": "sprint3-demo-weak-topic-high" }
  ],
  "medium": [],
  "low": [
    { "topic": "sprint3 demo weak topic low", "reason": "low-priority weakness", "retestPriority": "low",
      "subjectSlug": "computer_science", "topicSlug": "sprint3-demo-weak-topic-low" }
  ]
}
```

The strong topic correctly produced zero practice targets and zero
retest candidates, confirming `retestCandidates.ts` only ever derives
candidates from existing practice targets — never from strengths, and
never by recomputing mastery itself. Both weak topics' `retestPriority`
exactly matched their `PracticeTarget.priority`, confirming the
priority-reuse rule.

All seeded `TopicProgress` rows were deleted afterward; confirmed zero
residual rows (`residual topicProgress: 0`).

## 4. Future improvement-tracking path (architecture review only — not implemented)

A future sprint could extend today's read-only retest candidates into
an improvement-tracking loop without touching grading:

```
Weakness (Sprint 1 — RevisionProfile.weaknesses/visualWeaknesses)
   ↓
Practice Target (Sprint 2 — PracticeTargetPlan, priority-banded)
   ↓
Retest Candidate (this sprint — RetestCandidatePlan, same priority reused)
   ↓
Improvement Tracking (future): after a learner retakes an assessment
   for a candidate's topicSlug (via the existing, unmodified
   src/app/api/school/assessment/submit/route.ts, which already
   updates TopicProgress.masteryPct/attempts), re-run
   getRevisionProfile() → generatePracticeTargets() →
   generateRetestCandidates() for that same user. If the candidate's
   topic no longer appears in profile.weaknesses (or appears in a
   lower-severity band), that is itself the "improvement" signal — no
   new schema, no new write path, no new "improvement" model needed.
   A future improvement-tracking UI would only need to snapshot a
   candidate's retestPriority before and after a retest and diff the
   two read-only results.
```

This requires zero new grading or assessment logic — the existing
`assessment/submit/route.ts` already updates the exact `TopicProgress`
fields this sprint's entire pipeline reads. Per the brief, no
improvement-tracking system is built this sprint.

## 5. Remaining intelligence gaps

- `StudentProgress` was deliberately **not** read by this sprint's
  pipeline (see audit Task 1, section 4) — retest candidacy is driven
  entirely by `TopicProgress`-based mastery signals, avoiding a third
  reintroduction of the `subjectSlug`/`subjectCode` namespace mismatch
  documented in Sprints 1 and 2.
- Visual-based retest candidates inherit the same limitation Sprint 2
  documented for visual practice targets: no per-visual-type
  attempt/retry count exists in `EvidenceRecord`, so visual candidates
  are never escalated the way topic candidates can be (escalation
  happens upstream, inside Sprint 2's `practiceTargets.ts`, before this
  sprint's mapping step ever runs).
- The three disconnected weakness-detection signals noted in Sprints 1
  and 2 (`spacedRevision.ts` time-based, `weakTopics.ts`
  mistake-severity-based, `revisionProfile.ts`/`practiceTargets.ts`
  mastery-percentage-based) remain disconnected by design —
  `retestCandidates.ts` only consumes the third signal's downstream
  output (`PracticeTargetPlan`), same as Sprint 2's relationship to
  Sprint 1.
- No production route or UI consumes `RetestCandidatePlan` yet — per
  the brief, Task 4's viewer is dev-only and Task 7's improvement-
  tracking path is documentation only; wiring retest candidates into
  actual assessment generation remains a future sprint's decision.
- `retestCandidates.ts` does not itself trigger or schedule any
  assessment session — "this topic is a high-priority retest
  candidate" is a recommendation only; `assessment/generate/route.ts`
  is completely unaware of this sprint's output, exactly as the brief
  requires ("DO NOT BUILD IMPROVEMENT TRACKING YET").

## Validation

- `npx tsc --noEmit` — clean, zero errors.
- `npm run build` — succeeds; `/api/intelligence/retest-candidates` and
  the extended `/dev/visual-demo` page build as expected alongside
  every pre-existing route.
- Sprint B–Q, Educational Intelligence Sprint 1, and Educational
  Intelligence Sprint 2: unchanged — `git status` confirmed only new
  files (`docs/EDUCATIONAL_INTELLIGENCE_RETEST_AUDIT.md`,
  `src/lib/intelligence/retestCandidates.ts`,
  `src/app/api/intelligence/retest-candidates/route.ts`,
  `src/components/intelligence/RetestIntelligenceViewer.tsx`) plus one
  additive edit to `src/app/dev/visual-demo/VisualDemo.tsx` (one new
  import, one new mount block) — no existing Sprint 1 or Sprint 2 file
  (`revisionProfile.ts`, `revisionRecommendations.ts`,
  `practiceTargets.ts`, either existing API route, or either existing
  viewer component) was modified.
- Grading, XP, assessments, curriculum: untouched — no scoring,
  grading, or curriculum file was modified; no new Prisma writes were
  added; no improvement-tracking system was built, per the brief.

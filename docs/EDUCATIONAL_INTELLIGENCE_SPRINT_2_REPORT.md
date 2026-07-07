# Educational Intelligence Sprint 2 Report — Targeted Practice Intelligence

Goal: turn Sprint 1's already-implemented `RevisionProfile` (weakness
detection, visual weakness detection, revision recommendations, the
Revision Intelligence Viewer) into a structured, priority-banded
practice plan answering "what should the learner practice next?" —
without rebuilding any of Sprint 1's systems, and without touching
grading, XP, scoring, pass/fail rules, curriculum, or Tutor Max
prompts.

## 1. Practice-target architecture

Full audit in `docs/EDUCATIONAL_INTELLIGENCE_PRACTICE_AUDIT.md`
(Task 1). Summary:

```
RevisionProfile.weaknesses (TopicMasterySignal[], masteryPct < 50)
  + TopicProgress.attempts (new read-only escalation signal)
       → PracticeTarget { topic, reason, priority } per topic

RevisionProfile.visualWeaknesses (VisualWeaknessEntry[], completionRatePct < 50)
       → PracticeTarget { topic, reason, priority } per visual type

Both streams bucketed into one combined, prioritized PracticeTargetPlan
{ high, medium, low }.
```

`src/lib/intelligence/practiceTargets.ts` (Tasks 2/3) is a pure
function module — no Prisma dependency, no writes:

- `generatePracticeTargets(profile: RevisionProfile, attemptsRows?: TopicAttemptsRow[]): PracticeTargetPlan`
- Reads `profile.weaknesses` directly (the full, uncapped list Sprint 1
  already computes) rather than the capped `recommendedRevisionTopics`,
  so prioritization isn't pre-truncated to 5.
- Does not call or modify `revisionRecommendations.ts` — both modules
  are independent, parallel consumers of the same `RevisionProfile`,
  exactly as `visualMasteryRecommendations.ts` and `visualGuidance.ts`
  are both independent consumers of `visualMasteryProfile.ts`.

`src/app/api/intelligence/practice-targets/route.ts` (Task 4 backing
route) — `GET` only, `auth()`-gated, read-only. Reuses Sprint 1's
`getRevisionProfile()` and `generateRevisionRecommendations()`
unmodified; the only new Prisma read is `TopicProgress.attempts`,
added to a `findMany` alongside the existing fields. Returns
`{ profile, recommendations, targets }`.

`src/components/intelligence/PracticeTargetsViewer.tsx` (Task 4
viewer) — new dev-only sibling component to
`RevisionIntelligenceViewer`, gated identically
(`NODE_ENV !== 'development'` → `null`, both in the fetch effect and
the render). Displays Sprint 1's review/practice recommendations
alongside the new high/medium/low practice target lists. Mounted on
`src/app/dev/visual-demo/VisualDemo.tsx` directly below
`RevisionIntelligenceViewer`, under a new heading — no new dev route
created, consistent with every prior sprint's single shared dev page.

## 2. Priority model

```ts
HIGH_PRIORITY_MAX_PCT = 25     // masteryPct/completionRatePct < 25%  -> high
MEDIUM_PRIORITY_MAX_PCT = 40   // 25% <= pct < 40%                   -> medium
                                // 40% <= pct < 50% (Sprint 1's weakness cutoff) -> low
ATTEMPT_ESCALATION_THRESHOLD = 3
```

- Topic targets and visual targets are bucketed into the **same**
  three bands by percentage, so both signal types are directly
  comparable in one plan.
- Escalation: if `TopicProgress.attempts >= 3` for a topic already
  identified as a weakness, its priority is raised one band (low →
  medium → high; high stays high), and its `reason` changes from
  `"low mastery"` to `"low mastery, repeated attempts"`. This is the
  only new signal beyond what Sprint 1's `RevisionProfile` already
  carries — attempts never introduce a target on their own, they only
  re-prioritize a target `profile.weaknesses` already identified.
- Visual targets are never escalated by attempts (no per-visual-type
  attempt count exists in `EvidenceRecord`); they're banded purely by
  `completionRatePct`.

## 3. Demonstration results

Using the existing demo account (`shot.student@mytutor-demo.local`),
the following `TopicProgress`/`EvidenceRecord` rows were seeded to
exercise every required scenario, then deleted afterward:

| Signal | Seeded data | Result |
|---|---|---|
| Strong topic | `sprint2-demo-strong-topic`, MASTERED, 92% | Excluded from `weaknesses` (Sprint 1 behavior, unchanged) — no practice target generated |
| Weak topic, high band by % alone | `sprint2-demo-weak-topic-high`, IN_PROGRESS, 18%, 1 attempt | `targets.high`: `{ topic: "sprint2 demo weak topic high", reason: "low mastery", priority: "high" }` |
| Weak topic, escalated by attempts | `sprint2-demo-weak-topic-escalated`, IN_PROGRESS, 45%, 4 attempts | Bands to `low` by % (45% is in the 40–49% low range) but escalates one band to `targets.medium`: `{ reason: "low mastery, repeated attempts", priority: "medium" }` |
| Weak visual area | `EvidenceRecord(VISUAL)`: `sprint2_demo_visual`, 10 shown / 1 completed (10%) | `targets.high`: `{ topic: "sprint2_demo_visual activities", reason: "weak visual engagement", priority: "high" }` |

A full NextAuth credentials login was performed against the running
dev server, then `GET /api/intelligence/practice-targets` was called
as the authenticated user. Verified response (`targets` section):

```json
"targets": {
  "high": [
    { "topic": "sprint2 demo weak topic high", "reason": "low mastery", "priority": "high",
      "subjectSlug": "computer_science", "topicSlug": "sprint2-demo-weak-topic-high" },
    { "topic": "sprint2_demo_visual activities", "reason": "weak visual engagement", "priority": "high",
      "visualType": "sprint2_demo_visual" }
  ],
  "medium": [
    { "topic": "sprint2 demo weak topic escalated", "reason": "low mastery, repeated attempts", "priority": "medium",
      "subjectSlug": "computer_science", "topicSlug": "sprint2-demo-weak-topic-escalated" }
  ],
  "low": []
}
```

All three priority bands and the escalation rule behaved exactly as
designed. The strong topic correctly produced zero targets, confirming
`practiceTargets.ts` only ever derives targets from `profile.weaknesses`
and `profile.visualWeaknesses` — never from strengths.

All seeded `TopicProgress` and `EvidenceRecord` rows were deleted
afterward; confirmed zero residual rows for both (`residual
topicProgress: 0`, `residual evidenceRecord: 0`).

## 4. Future retest path (architecture review only — not implemented)

A future sprint could extend today's read-only practice targets into
a retest loop without touching grading:

```
PracticeTarget (this sprint — high/medium/low, reason, topic/visual identity)
   ↓
Targeted Practice Session (future): pass target.topicSlug/visualType
   into src/app/api/school/practice/generate/route.ts's chapter-selection
   step, same future path Sprint 1 already documented — a selection
   bias only, not a scoring change.
   ↓
Retest Candidate (future): after a practice session, re-read the same
   target's updated TopicProgress.masteryPct (or updated
   EvidenceRecord-derived completionRatePct) and re-run
   generatePracticeTargets() — if the target's band has improved, it
   naturally drops out of the high/medium bands or disappears from
   profile.weaknesses entirely. No new "retest" schema or write path is
   needed: the existing read-only pipeline, re-run after a real
   submit/practice event, already produces a "did this target improve"
   signal for free.
```

This requires zero new grading logic — `practice/submit/route.ts`
already updates `TopicProgress.masteryPct`/`attempts` on every
submission; a future retest UI would only need to re-call
`GET /api/intelligence/practice-targets` after a submission to see
whether a given target's priority dropped. Per the brief, no retest
system is built this sprint.

## 5. Remaining intelligence gaps

- The same identifier-namespace gap from Sprint 1 persists unchanged:
  `TopicProgress.subjectSlug` vs `StudentProgress.subjectCode` are
  still different namespaces; `recommendations.review[].daysSinceLastStudied`
  is still `null` whenever they don't coincide (unchanged, demonstrated
  again this sprint with the same `computer_science`/`python` mismatch).
- Visual targets have no per-visual-type attempt/retry count in
  `EvidenceRecord`, so escalation only applies to topic-based targets,
  not visual-based ones — a future sprint could add an `interacted`-vs-`shown`
  ratio as an analogous escalation signal for visuals, but that's a new
  derived metric, not implemented here.
- The three disconnected weakness-detection signals noted in Sprint 1
  (`spacedRevision.ts` time-based, `weakTopics.ts` mistake-severity-based,
  `revisionProfile.ts`/`practiceTargets.ts` mastery-percentage-based)
  remain disconnected by design — `practiceTargets.ts` only consumes
  the third signal, same as Sprint 1's recommendations.
- No production route consumes `PracticeTargetPlan` yet — per the
  brief, Task 4's viewer is dev-only and Task 7's retest path is
  documentation only; wiring targets into actual practice generation
  remains a future sprint's decision.

## Validation

- `npx tsc --noEmit` — clean, zero errors.
- `npm run build` — succeeds; `/api/intelligence/practice-targets` and
  the extended `/dev/visual-demo` page build as expected alongside
  every pre-existing route.
- Sprint B–Q and Educational Intelligence Sprint 1: unchanged — `git
  status` confirms only new files (`docs/EDUCATIONAL_INTELLIGENCE_PRACTICE_AUDIT.md`,
  `src/lib/intelligence/practiceTargets.ts`,
  `src/app/api/intelligence/practice-targets/route.ts`,
  `src/components/intelligence/PracticeTargetsViewer.tsx`) plus one
  additive edit to `src/app/dev/visual-demo/VisualDemo.tsx` (one new
  import, one new mount block) — no existing Sprint 1 file
  (`revisionProfile.ts`, `revisionRecommendations.ts`, the revision-profile
  route, `RevisionIntelligenceViewer.tsx`) was modified.
- Grading, XP, assessments, curriculum: untouched — no scoring,
  grading, or curriculum file was modified; the only new Prisma read is
  one additional `attempts` field in a read-only `findMany`. No
  retesting system was built, per the brief.

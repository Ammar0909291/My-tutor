# Educational Intelligence Audit — Sprint 3, Task 1

Audit of Sprint 1's `RevisionProfile`, Sprint 2's `PracticeTargetPlan`,
`TopicProgress`, `StudentProgress`, and the existing practice/assessment
systems, to determine how a weak area — already surfaced as a
practice target — can become a retest candidate, without rebuilding
any prior sprint's output and without touching grading, XP, or
curriculum.

## 1. RevisionProfile (Sprint 1 — read only, unmodified)

`src/lib/intelligence/revisionProfile.ts` already exports
`weaknesses: TopicMasterySignal[]` (full, uncapped, weakest-first) and
`visualWeaknesses: VisualWeaknessEntry[]`. Sprint 3 reads both exactly
as Sprint 2 did — no new fields needed from this module.

## 2. Practice Targets (Sprint 2 — read only, unmodified)

`src/lib/intelligence/practiceTargets.ts`'s `generatePracticeTargets()`
already produces a `PracticeTargetPlan { high, medium, low }` of
`PracticeTarget { topic, reason, priority, subjectSlug?, topicSlug?,
visualType? }` entries, with attempt-based escalation already applied.

**Key signal Sprint 3 reuses, not recomputes**: a target's existing
`priority` band (`high`/`medium`/`low`) is the single strongest signal
that a weak area needs re-evaluation after practice — Sprint 3's
`retestCandidates.ts` reads `PracticeTargetPlan` directly and maps each
existing band to a `retestPriority` of the same name, rather than
re-deriving severity from raw percentages a second time.

## 3. TopicProgress

Already audited in Sprints 1 and 2. New for Sprint 3: no new fields
are read — `masteryPct`, `status`, and `attempts` (already read by
Sprint 2) are sufficient. Sprint 3 does not add any new `TopicProgress`
selects beyond what `getRevisionProfile()` and Sprint 2's route already
fetch.

## 4. StudentProgress

`subjectCode`, `completedLessons`, `isCompleted`, `completionPercent`
(`prisma/schema.prisma:612-631`). As in Sprint 1, this is the legacy
lesson tracker, namespaced by `subjectCode` rather than the KG-node
`subjectSlug`/`topicSlug` pair. Sprint 3 does **not** read
`StudentProgress` — retest candidacy is driven entirely by
`TopicProgress`-based mastery signals (via `RevisionProfile`) and
`PracticeTargetPlan` priorities, neither of which need lesson-tracker
recency data. This avoids re-introducing the namespace-mismatch
problem documented in Sprints 1 and 2 into a third module.

## 5. Practice systems

`src/app/api/school/practice/{generate,submit}/route.ts` — confirmed
again unchanged: `generate` selects chapters independent of any
weakness signal; `submit` only reads `TopicProgress` to avoid
downgrading `MASTERED` nodes. Sprint 3 does not wire retest candidates
into either route — per the brief, only the candidate model is built
this sprint.

## 6. Assessment systems

`src/app/api/school/assessment/{generate,submit}/route.ts` —
`submit/route.ts` evaluates via `evaluateChapterAssessment()`
(unmodified, untouched), then writes `TopicProgress.masteryPct`/
`status`/`attempts` and (on failure) `MistakeRecord` rows for weak
nodes. This is the **existing** mechanism by which a topic's mastery
signal changes after a learner is "retested" — Sprint 3 does not
change this write path or `evaluateChapterAssessment()` in any way. A
retest candidate this sprint is purely a read-only recommendation
("this topic/visual area is a candidate for an assessment retry");
actually triggering a new assessment session remains exactly today's
existing `assessment/generate` flow, unchanged.

## How weaknesses become retest candidates (conclusion)

```
RevisionProfile.weaknesses / visualWeaknesses (Sprint 1, unmodified)
  + PracticeTargetPlan.{high,medium,low} (Sprint 2, unmodified — priority already computed)
       → RetestCandidate { topic, reason, retestPriority } per weak topic/visual area

retestPriority is read directly from the matching PracticeTarget's
existing `priority` — Sprint 3 invents no new mastery system and
recomputes no percentage thresholds. A weakness that has no matching
practice target (should not occur, since practiceTargets.ts derives
every target from the same weaknesses/visualWeaknesses lists) simply
produces no candidate.
```

This is implemented in `src/lib/intelligence/retestCandidates.ts`
(Task 2/3): a pure function, no Prisma dependency, no writes, no
grading or assessment-generation changes. No new Prisma reads are
required at all — the existing `getRevisionProfile()` and
`generatePracticeTargets()` outputs (already fetched by Sprint 2's
route) are sufficient inputs.

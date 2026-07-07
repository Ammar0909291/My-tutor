# Visual Intelligence Audit — Sprint N, Task 1

Audit of the four existing Educational Intelligence systems named in the
Sprint N brief — recommendations, progress systems, revision systems,
weak-point detection — to determine where the persisted Visual Mastery
evidence (Sprint M's `EvidenceRecord(type: VISUAL, weight: 0)` rows) could
safely contribute, without modifying any of their existing
formulas/thresholds/writes.

## 1. Recommendations

- **`src/lib/school/navigation/learningNavigator.ts`** —
  `getLearningNavigatorAction()` is a presentation wrapper: it calls
  `getTopRecommendation()` (the orchestrator) and falls back to
  `getDailyStudyPlan()`. No writes.
- **`src/lib/school/adaptive/learningOrchestrator.ts`** —
  `getTopRecommendation()` runs an 8-tier priority order (failed
  assessment, prerequisite gap, spaced revision due, weak topic, exam
  readiness risk, mock test weakness, continue/start chapter), reading
  `PracticeSession`, `TopicProgress`, and `MistakeRecord`. No writes.
- **Reads `EvidenceRecord` today: no.**
- **Safe contribution point**: a new, read-only function could surface
  visual-engagement context (e.g. "this topic has low visual completion")
  as an *additional, lower-priority tier* or as supplementary metadata
  attached to an existing recommendation — without changing the existing
  8-tier ordering, its thresholds, or its data sources.

## 2. Progress systems

- **`src/lib/school/analytics/learningEffectiveness.ts`** —
  `computeLearningEffectiveness(userId)` reads `TopicProgress`
  (masteryPct, attempts, revisionCount, status), `PracticeSession` (score),
  `MistakeRecord`, and `LearningCheckpoint`. Pure computation, no writes.
- **`src/lib/dashboard/getDashboardV2Data.ts`** — dashboard rollups read
  `TopicProgress`, `PracticeSession`, `StudentProgress` (level/XP display).
  No writes performed by this aggregation layer itself.
- **Reads `EvidenceRecord` today: no.**
- **Safe contribution point**: a parallel, separate aggregation (this
  sprint's `VisualLearningProfile`) can read `EvidenceRecord(type: VISUAL)`
  independently and be displayed alongside these existing metrics, with
  zero risk of altering `masteryPct`, XP, or any existing dashboard number,
  since it's a wholly separate read path into a table neither file touches.

## 3. Revision systems

- **`src/lib/school/adaptive/spacedRevision.ts`** —
  `getDueRevisions()` / `getDueRevisionsBySubjects()` read `TopicProgress`
  (`completedAt`, `revisionCount`, `lastRevisionAt`) and compute
  `nextReviewAt` from a fixed interval schedule. The **only write** in this
  module is `advanceRevision()`, which updates
  `TopicProgress.revisionCount`/`lastRevisionAt`.
- **Reads `EvidenceRecord` today: no.**
- **Safe contribution point**: visual completion data could one day inform
  *which* topics get suggested for visual-based revision practice (vs.
  text-based), as a read-only filter layered on top of
  `getDueRevisions()`'s output — never by modifying `advanceRevision()` or
  the interval schedule itself. Documented further in Task 5 below.

## 4. Weak-point detection

- **`src/lib/school/adaptive/masteryIntelligence.ts`** —
  `classify()` combines assessment score, `LearningCheckpoint` pass rate,
  `MistakeRecord` severity, and revision stage into AT_RISK/FALSE_MASTERY
  labels (thresholds: checkpoint pass rate < 55, mistake severity > 6/> 3).
  No writes.
- **`src/lib/school/adaptive/weakTopics.ts`** —
  `getWeakTopics()` scores topics from `MistakeRecord` (category-weighted,
  recency-multiplied) and excludes `TopicProgress.status === 'MASTERED'`
  nodes. No writes.
- **Reads `EvidenceRecord` today: no.**
- **Safe contribution point**: a visual-type completion rate below a
  threshold (Task 4, this sprint) is a *different kind* of weak-point
  signal than mistake-severity-based detection — it flags weak engagement
  with a *visual representation* of a concept, not necessarily a wrong
  answer. It can be computed and surfaced entirely separately from
  `getWeakTopics()`'s formula, with no shared state and no risk of
  double-counting or threshold interference.

## Conclusion

None of the four systems read `EvidenceRecord` today, and the only write
among them (`spacedRevision.advanceRevision()`) touches a field this
sprint's work never writes to. This means a new, standalone, read-only
`VisualLearningProfile` aggregation (Task 2/3) and a separate weakness
list (Task 4) can be built and even *referenced in documentation* as future
recommendation/revision inputs (Task 5) with zero risk of altering any
existing recommendation ordering, progress number, revision schedule, or
weak-topic classification — because none of this sprint's new code calls
into, writes to, or is called by any of the five files audited above.

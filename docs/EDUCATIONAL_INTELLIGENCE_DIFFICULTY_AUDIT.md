# Educational Intelligence Sprint 4 — Learning Difficulty Intelligence · Audit (Task 1)

**Status: audit only. No code changed in this task. Detection only — this sprint does NOT
attempt to solve difficulty.**

## Goal of the audit

Identify which **already-persisted / already-computed** signals indicate that a learner is
struggling, so a read-only Learning Difficulty layer can classify difficulty (LOW / MEDIUM /
HIGH) without inventing a new mastery system, without new writes, and without touching grading,
XP, curriculum, or Tutor Max.

## Source inventory & which signal each provides

| Source | Where | Persisted / derived | Difficulty signal it carries |
|---|---|---|---|
| `TopicProgress.masteryPct` | `prisma.topicProgress` | persisted (overwritten snapshot) | **weak mastery** — the primary struggle signal |
| `TopicProgress.attempts` | same | persisted (monotonic) | **repeated retries** — many attempts = effortful topic |
| `TopicProgress.revisionCount` | same | persisted | **poor retention** — re-revised yet still weak |
| `TopicProgress.lastScore` | same | persisted | **repeated failure** — low last score |
| `TopicProgress.status` | same | persisted | distinguishes NOT_STARTED (no signal) from engaged-but-weak |
| `StudentProgress.lastStudiedAt` | `prisma.studentProgress` | persisted | recency context (already used by Revision recs) |
| Revision Intelligence (`RevisionProfile`) | `src/lib/intelligence/revisionProfile.ts` | derived (Sprint 1) | **weak mastery** weaknesses list + titles + `visualWeaknesses` |
| Practice Intelligence (`PracticeTargetPlan`) | `src/lib/intelligence/practiceTargets.ts` | derived (Sprint 2) | priority bands already encode severity + attempt-escalation |
| Retest Intelligence (`RetestCandidatePlan`) | `src/lib/intelligence/retestCandidates.ts` | derived (Sprint 3) | **needs re-evaluation** — topic flagged for retesting |
| Improvement Tracking (`ImprovementSummary`) | `src/lib/intelligence/improvementTracking.ts` | derived (Sprint 4-Improvement) | **slow improvement** — stable/declining despite attempts |
| Visual Mastery (`VisualLearningProfile`) | `src/lib/visuals/visualMasteryProfile.ts` | persisted via `EvidenceRecord(VISUAL)` | visual engagement/completion rate |
| Visual Weaknesses (`detectVisualWeaknesses`) | same | derived | **visual learning difficulties** — weak visual types |
| Visual Recommendations / Guidance | `src/lib/visuals/*` | derived | adaptation hints (re-used conceptually for Task 4) |

## Signal → difficulty mapping (evidence already available)

| Difficulty signal (from the brief) | Backing evidence (no new computation) |
|---|---|
| repeated failure | `masteryPct` low + `lastScore` low + `RevisionProfile.weaknesses` |
| repeated retries | `TopicProgress.attempts` (already escalated by Practice Intelligence at ≥3) |
| poor retention | `revisionCount ≥ 2` **and** `masteryPct` still below the weakness threshold |
| slow improvement | `ImprovementSummary` status `stable`/`declining` (optional context input) |
| weak mastery | `RevisionProfile.weaknesses` (mastery < 50, Sprint 1 threshold) |
| visual learning difficulties | `RevisionProfile.visualWeaknesses` (Sprint N `detectVisualWeaknesses`) |

## Key data-model finding (constrains the design)

Visual mastery in this app is keyed by **visual type / concept**, NOT by `topicSlug`
(`EvidenceRecord(VISUAL)` + `VisualLearningProfile`). There is no persisted topic↔visualType
link. Therefore visual-weakness signal is **cross-cutting**, not per-topic. The Learning
Difficulty layer surfaces weak visual types at the **profile level** and attaches them to a
struggling topic entry only as co-occurring context (a learner who is weak on visuals *and*
weak on a topic gets a difficulty bump), clearly labelled — it never fabricates a topic-specific
visual score.

## Reuse decision (no rebuilds)

The new layer is a **pure consumer** of `RevisionProfile` (Sprint 1), `RetestCandidatePlan`
(Sprint 3), and raw `TopicProgress` attempt/revision rows — exactly the same consumer
relationship Practice Intelligence (Sprint 2) and Retest Intelligence (Sprint 3) already have to
Sprint 1. No mastery system, no thresholds for grading, no writes. Classification is a
deterministic points score over the signals above.

## Insertion points (for the implementation tasks)

- `src/lib/intelligence/learningDifficultyProfile.ts` — types + pure builder + classifier +
  `detectLearningDifficulties()` + thin Prisma wrapper (mirrors `revisionProfile.ts`).
- `src/lib/intelligence/teachingAdaptations.ts` — `TeachingAdaptationRecommendation` +
  `generateTeachingAdaptations()` (mirrors `revisionRecommendations.ts`; recommendations only).
- `GET /api/intelligence/learning-difficulty` — read-only route (mirrors `practice-targets`).
- `src/components/intelligence/LearningDifficultyViewer.tsx` — dev-only viewer.

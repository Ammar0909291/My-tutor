# Educational Intelligence Audit — Sprint 2, Task 1

Audit of Sprint 1's `RevisionProfile`, `RevisionRecommendations`,
`TopicProgress`, visual weaknesses, and the existing practice systems,
to determine how an existing weakness signal can become a structured,
prioritized practice target — without rebuilding any Sprint 1 output
and without touching grading, XP, curriculum, or practice generation.

## 1. RevisionProfile (Sprint 1 — read only, unmodified)

`src/lib/intelligence/revisionProfile.ts` already exports everything
Sprint 2 needs as input:

```ts
export interface RevisionProfile {
  strengths: TopicMasterySignal[]
  weaknesses: TopicMasterySignal[]               // full list, not capped
  visualWeaknesses: VisualWeaknessEntry[]         // Sprint N, unmodified
  recommendedRevisionTopics: RecommendedRevisionTopic[]  // top 5 of weaknesses only
}
```

**Available signal**: `profile.weaknesses` is the full, uncapped list of
weak topics (sorted weakest-first by `masteryPct`); Sprint 1's
`recommendedRevisionTopics` only exposes the top 5. Sprint 2's target
generator reads `profile.weaknesses` directly (not
`recommendedRevisionTopics`) so it isn't artificially capped before
prioritization runs.

**Missing signal**: `TopicMasterySignal` does not carry `attempts` —
only `masteryPct`, `status`, `lastScore`. A topic attempted many times
with persistently low mastery is a stronger "needs more practice"
signal than one attempted once. This sprint reads `TopicProgress.attempts`
separately (one additional read-only field) to refine priority — see
Task 2/3.

## 2. Revision Recommendations (Sprint 1 — read only, unmodified)

`src/lib/intelligence/revisionRecommendations.ts`'s
`generateRevisionRecommendations()` produces `review`/`practice` text
lists from the profile. Sprint 2 does not call this module — it
reads the same upstream `RevisionProfile` directly, since Sprint 2's
output (priority-banded targets) is a different shape than Sprint 1's
(flat review/practice text), not a refinement of it. Both modules are
independent consumers of `RevisionProfile`, exactly as
`visualMasteryRecommendations.ts` and `visualGuidance.ts` are both
independent consumers of `visualMasteryProfile.ts`.

## 3. TopicProgress

Already audited in Sprint 1 (`docs/EDUCATIONAL_INTELLIGENCE_REVISION_AUDIT.md`).
New for Sprint 2: `attempts` (Int, default 0) is read alongside the
fields Sprint 1 already selects, purely to escalate priority for
topics with repeated unsuccessful attempts. Still read-only —
`generatePracticeTargets()` never writes to `TopicProgress`.

## 4. Visual Weaknesses (Sprint N — read only, unmodified)

`VisualWeaknessEntry { visualType, shown, completed, completionRatePct,
recommendation }`. Sprint 2 buckets `completionRatePct` into the same
high/medium/low priority bands as topic `masteryPct`, so both signal
types produce directly comparable priority levels.

## 5. Practice systems

`src/app/api/school/practice/{generate,submit}/route.ts` — confirmed
again unchanged from Sprint 1's audit: `generate` selects chapters from
the static curriculum independent of any weakness signal; `submit`
only reads `TopicProgress` to avoid downgrading `MASTERED` nodes. **Sprint
2 does not wire practice targets into either route** — per the brief,
this sprint produces structured targets only; using them to drive
actual question generation is explicitly out of scope (Task 7 covers
the future path only, as a review).

## How weaknesses become practice targets (conclusion)

```
RevisionProfile.weaknesses (TopicMasterySignal[], masteryPct < 50)
  + TopicProgress.attempts (read-only, escalation signal)
       → PracticeTarget { topic, reason, priority } per topic

RevisionProfile.visualWeaknesses (VisualWeaknessEntry[], completionRatePct < 50)
       → PracticeTarget { topic, reason, priority } per visual type

Both streams bucketed into the same { high, medium, low } severity
bands by completion/mastery percentage, optionally escalated one band
when attempts are high — producing one combined, prioritized
PracticeTargetPlan.
```

This is implemented in `src/lib/intelligence/practiceTargets.ts` (Task
2/3): a pure function, no Prisma dependency, no writes, no curriculum
or practice-generation changes. The only new Prisma read is one
additional `attempts` field in the existing Sprint 1 `TopicProgress`
query (`src/app/api/intelligence/practice-targets/route.ts`).

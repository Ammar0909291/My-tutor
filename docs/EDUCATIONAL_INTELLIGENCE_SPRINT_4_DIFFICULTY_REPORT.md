# Educational Intelligence Sprint 4 — Learning Difficulty Intelligence · Report

A new **read-only** intelligence layer that DETECTS when a learner is struggling and classifies
each topic LOW / MEDIUM / HIGH, plus advisory teaching-adaptation recommendations. Detection only —
it does **not** attempt to solve difficulty, does not modify Tutor Max, curriculum, XP, grading,
assessment scoring, or any existing intelligence sprint. Built entirely from already-persisted /
already-derived signals.

## Audit findings (Task 1 → `docs/EDUCATIONAL_INTELLIGENCE_DIFFICULTY_AUDIT.md`)

Signals available without any new computation:
- **weak mastery** → `TopicProgress.masteryPct` + Sprint 1 `RevisionProfile.weaknesses`
- **repeated retries** → `TopicProgress.attempts`
- **poor retention** → `TopicProgress.revisionCount ≥ 2` while mastery still weak
- **repeated failure** → `TopicProgress.lastScore`
- **needs re-evaluation** → Sprint 3 `RetestCandidatePlan`
- **slow improvement** → Sprint 4-Improvement `ImprovementSummary` (available as context)
- **visual learning difficulties** → Sprint N `detectVisualWeaknesses()` via `RevisionProfile.visualWeaknesses`

**Key data-model finding:** visual mastery is keyed by visual *type*, not by `topicSlug` — there is
no persisted topic↔visual link. Visual weakness is therefore cross-cutting and must NOT be scored
per-topic (doing so uniformly inflates every topic). It is surfaced at the profile level and
attached to struggling entries as context only.

## Root analysis

Difficulty is a deterministic points score over topic-specific evidence:

| Evidence | Points | Signal |
|---|---|---|
| mastery < 25 / < 50 / < 75 | +3 / +2 / +1 | severely weak / weak / shaky mastery |
| attempts ≥ 5 / ≥ 3 | +2 / +1 | many / some repeated retries |
| revisions ≥ 2 | +1 (+1 more if mastery < 50) | repeated revisions / poor retention |
| flagged as retest candidate (Sprint 3) | +1 | needs re-evaluation |

Score ≥ 5 → **HIGH**, ≥ 3 → **MEDIUM**, else **LOW**. Visual weakness is attached as context to
medium/high entries (and drives visual adaptations) but is **not scored** — a correction made after
the demonstration caught it inflating a medium learner to high.

## Files changed

**New**
- `docs/EDUCATIONAL_INTELLIGENCE_DIFFICULTY_AUDIT.md` — Task 1 audit.
- `src/lib/intelligence/learningDifficultyProfile.ts` — `LearningDifficultyProfile`/`Entry` types,
  `classifyDifficulty()` (pure), `buildLearningDifficultyProfile()` (pure), `detectLearningDifficulties()`
  (Task 3), and the thin Prisma wrapper `getLearningDifficultyProfile()`. Read-only.
- `src/lib/intelligence/teachingAdaptations.ts` — `TeachingAdaptationRecommendation` +
  `generateTeachingAdaptations()` (Task 4). Recommendations only; nothing executed.
- `src/app/api/intelligence/learning-difficulty/route.ts` — `GET` only, returns
  `{ profile, difficulties, recommendations }` (Task 5). No writes.
- `src/components/intelligence/LearningDifficultyViewer.tsx` — dev-only viewer (Task 6), gated on
  `NODE_ENV === 'development'`, same pattern as the other intelligence viewers.

**Modified**
- `src/app/dev/visual-demo/VisualDemo.tsx` — adds the dev-only “Educational Intelligence Sprint 4 —
  Learning Difficulty Intelligence” section rendering the viewer.

**Reused unmodified:** `revisionProfile.ts` (Sprint 1), `practiceTargets.ts` (Sprint 2),
`retestCandidates.ts` (Sprint 3), `visualMasteryProfile.ts` (Sprint N). No existing file's logic
was changed.

## Demonstration results (Task 8)

Seeded three in-memory learners (one topic each) and ran them through the **real** pure functions
(`buildLearningDifficultyProfile` → `detectLearningDifficulties` → `generateTeachingAdaptations`):

```
counts: {"low":1,"medium":1,"high":1}
  hard_topic:   HIGH   (mastery 18, attempts 6, rev 3, retest 1)
                signals=[severely weak mastery; many repeated retries; repeated revisions;
                         poor retention (revised but still weak); flagged for retesting] visualWk=[graph]
  medium_topic: MEDIUM (mastery 45, attempts 3, rev 1, retest 1)
                signals=[weak mastery; repeated retries; flagged for retesting] visualWk=[graph]
  easy_topic:   LOW    (mastery 82, attempts 1, rev 0, retest 0) signals=[] visualWk=[]
adaptations:
  hard_topic [high]:   More worked examples, Step-by-step learning path, More guided practice,
                       More revision, More retesting, More visual explanation, Analogy-based teaching
  medium_topic [medium]: More worked examples, Step-by-step learning path, More guided practice,
                       More retesting, More visual explanation, Analogy-based teaching
VERIFY classifications correct: true
```

Easy → LOW, Medium → MEDIUM, High → HIGH — all correct. The demonstration used a **temporary
script that was deleted immediately after running**, and seeded **no database rows** (pure
functions only — this environment has no live DB), so there is no demo data to clean up.

## Validation results (Task 9)

```
npx prisma generate                       (required first — stale client otherwise)
npx tsc --noEmit -p tsconfig.json   → 0 errors
npm run build                       → exit 0; /api/intelligence/learning-difficulty compiled
```

(Build logs show `prisma:error` lines from DB-connection attempts during build-time static
evaluation of pre-existing routes — no DB in this sandbox — which do not fail the build.)

Confirmed untouched: grading, assessment scoring, XP, curriculum, Tutor Max prompts/behavior,
Retest Intelligence, Practice Intelligence, Revision Intelligence, Visual Mastery. This sprint adds
only a detection/recommendation layer that reads existing data.

## Educational review (Task 7 — architecture suitability)

| Domain | Suitability of this difficulty layer | Notes |
|---|---|---|
| CBSE | High | Mastery/attempts/revision signals map directly onto chapter-topic progression. |
| UP Board | High | Same `TopicProgress` model; board is just a namespace on `subjectCode`. |
| Programming | High | Attempts/retries are a strong struggle signal for coding topics; visual weakness less relevant. |
| Finance | Medium-High | Works on any topic with mastery/attempt tracking; visual signal mostly N/A. |
| Engineering | High | Heavy worked-example/step-by-step adaptations are well-suited to the recommendation set. |
| Medicine | Medium | Retention (revisionCount) signal is especially relevant; may want a future spaced-retention weight. |
| Future Universal Learning | High | The layer is domain-agnostic — it consumes generic `TopicProgress` + derived intelligence, with no subject-specific assumptions. The only domain-specific coupling is the visual-weakness signal, already isolated as cross-cutting context. |

Architecture is portable: pure functions over a generic progress model, no curriculum-specific
branching. No implementation changes recommended for cross-domain use beyond optionally weighting
retention vs. retries differently per domain in a future sprint.

## Future roadmap recommendations

1. **Sprint 5 (out of scope here):** consume this layer to actually *adapt* teaching (the
   recommendations are intentionally inert now).
2. Add a persisted topic↔visualType association so visual difficulty can become a per-topic
   (not cross-cutting) signal.
3. Incorporate `ImprovementSummary` (slow-improvement) directly into the score once a per-topic
   timestamped history is consistently available (currently available as context only).
4. Per-domain weighting of the difficulty score (e.g. retention-weighted for Medicine).

**STOP AFTER REPORT** — no Educational Intelligence Sprint 5, no adaptive teaching, no Tutor Max
changes. This sprint creates the intelligence (detection) layer only.

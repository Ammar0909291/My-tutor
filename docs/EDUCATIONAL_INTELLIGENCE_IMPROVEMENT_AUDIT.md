# Educational Intelligence Audit — Sprint 4, Task 1

Audit of `RevisionProfile`, `PracticeTargetPlan`, `RetestCandidatePlan`,
`TopicProgress`, `StudentProgress`, and Visual Mastery data, to
determine which already-persisted signals can safely indicate whether
a learner is improving over time — without inventing a new scoring
system and without touching grading, XP, or curriculum.

## 1. RevisionProfile / Practice Targets / Retest Candidates (Sprints 1–3 — read only, unmodified)

All three continue to expose only a **single current snapshot** per
topic/visual type (`masteryPct` / `completionRatePct` as of now,
already-computed `priority` / `retestPriority` bands). None of them
carry history — none is itself a safe improvement signal on its own.
Sprint 4 reuses them for two purposes only: (a) resolving topic titles
(`profile.strengths`/`profile.weaknesses` already carry `.title`,
avoiding a second copy-pasted KnowledgeNode lookup), and (b) flagging
whether a topic/visual area currently still appears in the Sprint 2/3
plans, as contextual annotation alongside a computed trend — never as
the trend computation itself.

## 2. TopicProgress — confirmed NOT a safe history signal by itself

`masteryPct` and `lastScore` are **both overwritten to the same latest
`accuracyPercent`** on every submission (`practice/submit/route.ts:73-81`,
`assessment/submit/route.ts:121-123`). There is no retained "previous"
value anywhere on the `TopicProgress` row itself — by the time a
second submission lands, the first score is gone. `attempts` (an
incrementing counter, already consumed by Sprint 2's escalation rule)
tells us *how many times* a topic was attempted, never whether the
score trend across those attempts went up or down. **Conclusion**:
`TopicProgress` alone cannot answer "is the learner getting better?" —
it only ever answers "where do they stand right now?" (which is
exactly what Sprints 1–3 already used it for).

## 3. PracticeSession — the actual historical signal, with one identifier-namespace caveat

`prisma/schema.prisma:398-418`: `PracticeSession` rows are **never
overwritten** — every submitted practice/assessment session persists
its own `score: Int?` and `completedAt: DateTime?`, timestamped,
one row per attempt. This is the only truly historical, per-attempt
mastery signal already in the schema, and it is exactly what Sprint 4
needs for "previous vs. current."

**New namespace caveat, confirmed by reading both generate routes**:
for school chapter sessions (`practice/generate/route.ts:57` and
`assessment/generate/route.ts:57`), `PracticeSession.topicSlug` is set
to the **chapter ID** (`topicSlug: chapterId`), not a KG-node
`topicSlug` — a third instance of the identifier-namespace pattern
already documented in Sprints 1–3 (alongside `StudentProgress.subjectCode`).
This is resolvable, not a dead end: every chapter already exposes
`chapter.kgNodeIds` (the same array `assessment/submit/route.ts` and
`practice/submit/route.ts` already use to update `TopicProgress`), so
a session's `chapterId` can be expanded back into the KG-node
`topicSlug`s it covers via the existing, unmodified
`getSchoolChapters()` — exactly the same lookup those two submit routes
already perform, reused here read-only with zero new logic invented.
Sprint 4's API route performs this expansion once per session before
calling the pure analyzer, so the pure analyzer itself only ever sees
already-resolved KG-node `topicSlug`s (consistent with how
`practiceTargets.ts`/`retestCandidates.ts` only ever see
already-resolved Sprint 1/2 shapes, never raw Prisma rows).

## 4. StudentProgress — confirmed out of scope, same reasoning as Sprint 3

Still namespaced by `subjectCode`, not `subjectSlug`/`topicSlug`. As
in Sprint 3, this sprint does not read `StudentProgress` — `PracticeSession`
already supplies a true per-topic timestamped history, so there is no
need to reach for the legacy, differently-namespaced lesson tracker.

## 5. Visual Mastery data — already historical, just needs splitting in time

`getVisualLearningProfile()` (Sprint N, unmodified) aggregates **every**
persisted `EvidenceRecord(type: VISUAL)` row for a user into one
all-time total per visual type — by design, it discards the order
rows arrived in. The raw rows themselves, however, each carry
`createdAt` and a `notes.{shown,interacted,completed}` triple, so they
already are a timestamped series. Sprint 4 reads these same raw rows a
second time (a second, parallel `findMany` over `EvidenceRecord`,
exactly mirroring how `getVisualLearningProfile()` reads them — no new
write path, no change to that function), and splits them
chronologically into an earlier half and a later half to compute a
completion-rate trend per visual type, the visual-side equivalent of
the topic-side previous-vs-current comparison.

## How weaknesses become improvement signals (conclusion)

```
PracticeSession (chapterId-keyed, timestamped score history)
  + chapter.kgNodeIds (existing getSchoolChapters() lookup, unmodified)
       → TopicScoreHistoryRow[] { subjectSlug, topicSlug, score, completedAt }

EvidenceRecord(VISUAL) (already read by getVisualLearningProfile(), read again here)
       → VisualEvidenceHistoryRow[] { visualType, shown, completed, createdAt }

For each topic/visual type with >= 2 history points, sorted chronologically:
  previousMastery = earliest score / earliest-half completion rate
  currentMastery  = latest score   / latest-half completion rate
  improvementPct  = currentMastery - previousMastery
  status = improving (>= +10) | declining (<= -10) | stable (otherwise)

RevisionProfile (titles) + PracticeTargetPlan/RetestCandidatePlan
(flag annotation only) are reused as context, never recomputed.
```

This is implemented in `src/lib/intelligence/improvementTracking.ts`
(Task 2/3): a pure function, no Prisma dependency, no writes, no
grading or scoring changes. The only new Prisma reads are in the new
API route — a second `EvidenceRecord` read (already-existing table,
already-read-elsewhere) and a `PracticeSession` read (already-existing
table, never read by any prior Educational Intelligence sprint).

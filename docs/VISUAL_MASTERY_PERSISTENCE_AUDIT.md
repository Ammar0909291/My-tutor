# Visual Mastery Persistence Audit — Sprint M, Task 1

Audit of the three candidate persistence targets named in the Sprint M
brief — `EvidenceRecord`, `TopicProgress`, `StudentProgress` — to determine
the lowest-risk place to durably store the `VisualMasterySignal`/summary
data Sprint L introduced (currently entirely in-memory, lost on session end).

## EvidenceRecord

```prisma
model EvidenceRecord {
  id          String       @id @default(cuid())
  userId      String
  subjectSlug String
  topicSlug   String
  type        EvidenceType   // QUIZ | PRACTICE | PROJECT | REVIEW | ASSESSMENT
  score       Float
  weight      Float        @default(1.0)
  method      String       @default("AI")
  notes       Json?
  createdAt   DateTime     @default(now())
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId, subjectSlug, topicSlug])
  @@map("evidence_records")
}
```

- **Current usage: none.** A repo-wide search of `prisma.evidenceRecord.*`
  finds zero call sites — the model exists in the schema but is never read
  or written anywhere today. No existing feature depends on its rows, its
  `score`/`weight` semantics, or its `notes` JSON shape.
- **Shape fit**: already has `userId`, `subjectSlug`, `topicSlug`,
  `createdAt`, a `score: Float`, a `weight: Float` (defaults to 1.0, but
  nothing reads it yet — so a written `weight: 0` row is guaranteed
  inert against any future "weighted average" aggregation that respects
  the field), a `method: String` (free text, already used for provenance
  like `"AI"`), and a `notes: Json?` field with no established schema —
  ideal for the full `VisualMasterySignal`-shaped payload.
- **Risk of touching existing logic**: zero. No `masteryPct`,
  `completionPercent`, XP, or grading computation reads this table.

## TopicProgress

```prisma
model TopicProgress {
  id, userId, subjectSlug, topicSlug, status, masteryPct, attempts,
  lastScore, completedAt, revisionCount, lastRevisionAt, createdAt, updatedAt
  @@unique([userId, subjectSlug, topicSlug])
}
```

- **Current usage: heavy and load-bearing.** `masteryPct` is written by:
  - `src/app/api/practice/submit/route.ts` — `masteryPct =
    Math.round((existing.masteryPct + newScore) / 2)`, a running average.
  - `src/app/api/assessment/evaluate/route.ts` — hybrid
    deterministic+AI score written directly.
  - `src/app/api/school/practice/submit/route.ts` and
    `.../assessment/submit/route.ts` — chapter accuracy percent written
    directly.
  - `attempts` increments on every submission; `revisionCount` is bumped
    by `src/lib/school/adaptive/spacedRevision.ts`.
  - Read by `src/lib/school/analytics/learningEffectiveness.ts` and
    `src/lib/school/adaptive/masteryIntelligence.ts` for recommendations.
- **Risk of touching this row**: high if visual data were folded into
  `masteryPct`/`attempts`/`status` directly — any write here is one
  `(userId, subjectSlug, topicSlug)` unique row shared with real
  grading outcomes, with no field reserved for "non-grading" data. Sprint
  M's "DO NOT MODIFY XP/grading/scoring/pass-fail" rule makes writing
  visual signals into this row's existing columns unsafe by construction:
  there's no way to add a value here that a future reader couldn't
  mistake for (or rely on conflating with) real assessment-derived
  mastery, since the model doesn't separate evidence sources.

## StudentProgress

```prisma
model StudentProgress {
  id, userId, subjectCode, currentLesson, completedLessons[],
  lastStudiedAt, lastLessonTitle, lastUnitTitle, isCompleted,
  completedAt, completionPercent, updatedAt
  @@unique([userId, subjectCode])
}
```

- **Current usage**: curriculum-wide lesson/chapter completion tracking
  (`currentLesson`, `completedLessons[]`, `completionPercent`,
  `isCompleted`), written by `src/app/api/curriculum/progress/route.ts`,
  `src/app/api/learn/chat/route.ts`, and
  `src/app/api/school/assessment/submit/route.ts`
  (`completionPercent = completedLessons.length / totalChapters * 100`).
  Independent of `TopicProgress.masteryPct` — it tracks "how far through
  the subject", not "how well".
- **Risk**: same shape problem as `TopicProgress` — one row per
  `(userId, subjectCode)`, no field reserved for supplementary evidence,
  and `completionPercent`/`isCompleted` directly gate subject-completion
  and certificate logic downstream. Not a safe place to add visual data.

## Decision

**`EvidenceRecord` is the best persistence target and the lowest-risk
integration path.**

Rationale:
1. It is completely unused today — there is no existing read path to
   accidentally affect, and no existing write path to collide with.
2. Its shape already matches a "one observation, tagged by source,
   carrying free-form notes" record — exactly what a
   `VisualMasterySignal`/summary is.
3. Its `weight` field, written as `0` for visual rows, gives a built-in,
   self-documenting signal to any future aggregation logic that these
   rows are evidence-only and should not be blended into a score by
   default — without needing to touch `TopicProgress`/`StudentProgress`
   at all.
4. Implementation is additive at the schema level: one new
   `EvidenceType` enum value (`VISUAL`), no new columns, no changes to
   any existing model, table, or relation.

This keeps Sprint M's persistence work entirely out of the path of
`TopicProgress.masteryPct`, `StudentProgress.completionPercent`, and every
XP/grading/pass-fail computation that reads those two models — satisfying
the brief's "DO NOT MODIFY XP OR GRADING" constraint by construction, not
by convention.

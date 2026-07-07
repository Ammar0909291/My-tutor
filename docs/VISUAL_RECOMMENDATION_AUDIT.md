# Visual Recommendation Audit — Sprint O, Task 1

Audit of recommendation systems, revision systems, study tools, and the
existing visual mastery systems, to determine where a new
`VisualLearningRecommendation` layer (built on Sprint N's
`VisualLearningProfile`/`detectVisualWeaknesses()`) could safely surface
recommendations without modifying any existing formula, threshold, write,
or curriculum/XP/grading rule.

## 1. Recommendation systems

- **`src/lib/school/navigation/learningNavigator.ts`** —
  `getLearningNavigatorAction()`, presentation wrapper, no writes.
- **`src/lib/school/adaptive/learningOrchestrator.ts`** —
  `getTopRecommendation()`, 8-tier priority order (failed assessment,
  prerequisite gap, spaced revision due, weak topic, exam readiness risk,
  mock test weakness, continue/start chapter), reads `PracticeSession`,
  `TopicProgress`, `MistakeRecord`. No writes.
- **Reads `EvidenceRecord`/visual data today: no.**
- **Safe contribution point**: a `VisualLearningRecommendation` list is a
  separate, parallel output — never inserted into the existing 8-tier
  array, never changing its ordering or thresholds.

## 2. Revision systems

- **`src/lib/school/adaptive/spacedRevision.ts`** — `getDueRevisions()` /
  `getDueRevisionsBySubjects()` read `TopicProgress`
  (`completedAt`, `revisionCount`, `lastRevisionAt`). **Only write**:
  `advanceRevision()` (updates `TopicProgress.revisionCount`/
  `lastRevisionAt`).
- **`src/lib/school/revision/revisionNotes.ts`** — generates/caches
  revision sheets (quick/exam/formula) from `RevisionNotesCache` + KG
  chapter metadata. Writes only to `RevisionNotesCache` (a global,
  per-chapter cache, not per-student).
- **Reads `EvidenceRecord`/visual data today: no, in either file.**
- **Safe contribution point**: visual recommendations could one day
  annotate `getDueRevisions()`'s output (Task 5, documentation only) —
  never by writing to `RevisionNotesCache`, `TopicProgress.revisionCount`,
  or `lastRevisionAt`.

## 3. Study tools

- **`src/app/api/flashcards/route.ts`** — reads/writes `Flashcard`
  (`nextReview`, `reviewCount`, `lastReviewedAt`, `easy`) and
  `User.xpPoints` (+2 XP, farm-guarded). **This is the one study tool that
  writes XP** — confirmed out of scope for any Sprint O code.
- **`src/app/api/quiz/generate/route.ts`** — pure AI generation, no DB
  reads or writes.
- **Chapter practice/assessment/mock generation and submission**
  (`generateChapterPractice.ts`, `evaluatePracticeAnswer.ts`,
  `generateChapterAssessment.ts`, mock test engine and submit routes) —
  read `Profile`/`Chapter`/KG metadata/`PracticeSession`/`TopicProgress`;
  write `PracticeSession`, `TopicProgress`, `StudentProgress`,
  `MistakeRecord`. Weak-topic mixing in mock tests already uses
  `MistakeRecord` + failed checkpoints — a different, pre-existing
  weak-point signal, untouched by this sprint.
- **`src/app/final-assessment/generate/route.ts`** — reads
  `StudentProgress`, writes `FinalAssessmentResult`.
- **Reads `EvidenceRecord`/visual data today: no, in any study tool.**
- **Safe contribution point**: none of these tools need to change. A
  visual recommendation is informational text, never a question-selection
  input this sprint (Task 7 documents this as a *future* possibility only)
  — none of the generation/evaluation/scoring logic above is touched.

## 4. Visual mastery systems (Sprint M/N — read-only inputs to Sprint O)

- **`src/lib/visuals/visualMasteryProfile.ts`** (Sprint N) —
  `getVisualLearningProfile(userId)` (one read-only Prisma query over
  `EvidenceRecord(type: VISUAL)`), `buildVisualLearningProfile()` (pure),
  `detectVisualWeaknesses()` (pure). No writes. This is the **only**
  module Sprint O's new code will read from for visual-engagement data.
- **`src/app/api/visual-mastery/persist/route.ts`** (Sprint M/N) — `POST`
  writes `EvidenceRecord(type: VISUAL)` rows (untouched this sprint);
  `GET` now returns `records`/`profile`/`weaknesses` (Sprint N) — Sprint O
  will extend this `GET` response additively with `recommendations`,
  the same pattern Sprint N used for `profile`/`weaknesses`.

## Conclusion

No recommendation, revision, or study-tool system reads visual-engagement
data today, and the only XP-writing study tool (`flashcards/route.ts`) and
only grading-writing tools (practice/assessment/mock submit routes) are
untouched by this sprint's plan. `VisualLearningRecommendation` (Task 2)
will be a new, standalone, read-only module built exclusively from Sprint
N's `VisualLearningProfile`/`detectVisualWeaknesses()` output — never
called by, never calling into, any of the files audited above, mirroring
the same zero-risk pattern established in Sprints M and N.

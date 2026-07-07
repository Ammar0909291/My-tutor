# Quantum Physics — Assessment Integration Audit (Task 1)

**Status: audit only.** Maps the existing assessment architecture and identifies the integration path
for Quantum Physics. Key finding: the assessment system is **fully generic and subject-agnostic**, so
a new Library subject requires **no assessment-code registration** — it is registered implicitly when
its curriculum is registered (done in the Subject Integration sprint).

## Summary / bottom line

My Tutor assesses Library subjects through a generic, tutor-driven, slug-keyed pipeline: the Tutor
emits in-lesson assessment results, `/api/assessment/evaluate` (or `/api/practice/submit`) grades them
deterministically + AI-blended, and writes `TopicProgress` (status + masteryPct). There is **no
per-subject assessment engine, question bank, or tier/blueprint registry** to extend. Quantum Physics
already flows through this with zero code change; the only work is reconciling the assessment spec doc
to Revision-2 numbering and verifying coverage + grading.

## 1. Components reviewed

### Assessment engine (two paths, both generic)
- **`POST /api/assessment/evaluate`** — in-lesson `[ASSESSMENT_RESULT]` evaluation. Blends AI-reported
  `correctness/reasoning/confidence` (0.5/0.35/0.15) with deterministic `[MATH_ANSWER]/[CODE_ANSWER]`
  checks (0.6 det / 0.4 ai when present). Decision ladder: `PROMOTED ≥80`, `REVIEW_REQUIRED <60`,
  else `STAY`. Writes `TopicProgress`. Keyed by `subjectSlug`/`topicSlug` only — no subject branch.
- **`POST /api/practice/submit`** — batch practice grading. `score = correct/total`; mastery ladder
  `masteryPct = (prev+score)/2`, `status = ≥80 MASTERED / ≥50 COMPLETED / else IN_PROGRESS`. Records
  `PracticeSession` + `MistakeRecord`. Also generic by slug.
- The **school** path (`/api/school/assessment/*`, `generateChapterAssessment`) is board-only
  (chapter/KG) and does **not** serve Library subjects — quantum does not use it.

### Question generation
Question **types** are reused from the practice layer (`MCQQuestion`, `TrueFalseQuestion`,
`ShortAnswerQuestion`; `ASSESSMENT_MCQ_COUNT=8`, `TF=4`, `SA=3`). For Library subjects, questions are
**AI-generated in-lesson** from the lesson/curriculum context (the chat route already injects the
quantum curriculum tree + current-module boundary). No per-subject question bank exists or is needed.

### Mastery progression
`TopicProgress` (`status`, `masteryPct`, `attempts`, `lastScore`, `completedAt`) per
`(userId, subjectSlug, topicSlug)`. Status ladder: `NOT_STARTED → IN_PROGRESS → COMPLETED → MASTERED`.
Level progression (`profileSubject.currentLevelIndex/targetLevelIndex`) is generic.

### Evidence records & grading
`EvidenceRecord` and the evaluate breakdown (`byType: deterministic/ai`) are generic. Grading
thresholds (`PROMOTE_AT 80`, `ASSESSMENT_PASS_THRESHOLD 70`, COMPLETED `50`) are global constants, not
per-subject. No grading redesign needed.

### Assessment history
`PracticeSession`, `SubjectAssessmentResult`, `AssessmentResult` rows accumulate by `subjectSlug` —
quantum history records like any other subject.

## 2. Registration points

| # | Point | Needed? |
|---|---|---|
| Curriculum tree (`subjectCatalog`) | already registered (Subject Integration sprint) — drives in-lesson question context | ✅ done |
| Generic evaluate/practice routes | accept any `subjectSlug`/`topicSlug`; no allowlist | ✅ no change |
| Per-subject assessment registry | **does not exist** in the architecture | ❌ n/a |

There is no additive code registration point for assessments (unlike the misconception `RULES`
table). Registering the subject + curriculum *is* the assessment registration.

## 3. Compatibility requirements

- **Additive only / no schema change:** reuse `TopicProgress`, `EvidenceRecord`, `PracticeSession`,
  `MistakeRecord`.
- **No new engine / no grading redesign:** reuse evaluate + practice ladders and global thresholds.
- **Subject isolation:** all queries are `subjectSlug`-scoped.
- **Slug compatibility:** quantum topic slugs `l<unit>-<lesson>` are valid `topicSlug` keys.

## 4. Integration path

1. Reconcile `QUANTUM_PHYSICS_ASSESSMENTS.md` tier→unit ranges to Revision-2 (consistency only).
2. Verify the 5-tier mapping covers all 33 units / 144 lessons with no orphans (automated).
3. Verify the generic grading ladders produce correct transitions for representative quantum topics
   (automated).
4. Confirm EI consumers (Revision/Retest/Teaching Plans) read the resulting `TopicProgress` generically.
5. Validate (`prisma generate` / `tsc` / `build`) and report.

No new code artifact is created or permitted; the assessment system is reused as-is.

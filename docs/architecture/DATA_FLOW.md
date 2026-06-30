# Data Flow — Educational Brain v1.0

Code-grounded trace of every data flow in the system: the full ordered
pipeline through `src/app/api/learn/chat/route.ts` (1688 lines), database
ownership, and per-domain flow diagrams.

---

## 1. The chat-turn pipeline, in file order

`src/app/api/learn/chat/route.ts` is the single point where almost every
Educational Brain engine converges. Below is the complete, ordered trace —
every dynamic import and every `systemPrompt +=` block, in the order they
execute.

```
0.  prisma.message.create — persist the USER message (line 61)
    — before any context assembly begins.

PRE-GATE SETUP
1.  @/lib/school/schoolRouting → getSchoolChapters, schoolSubjectCode,
    chapterDisplayTitle (L89) — resolves School Mode board/grade/chapter,
    builds schoolCtx.
2.  @/lib/curriculum/knowledgeGraph → getKnowledgeGraph (L140).
3.  @/lib/curriculum/subjectCatalog → findLibrarySubject (L192) — resolves
    non-school Library subject.

GATE 1 — if (schoolCtx) (L240–248): lessonCtx override only.

GATE 2 — the big `if (schoolCtx) { ... }` block (L294–838). Everything
numbered 4–34 below runs only in School Mode:
4.  @/lib/education + schoolRouting (L309) — chapter KG node list.
5.  @/lib/school/adaptive/learningProfile → buildLearningProfile,
    checkpointFrequencyForMode (L335).
6.  @/lib/school/checkpoints/evaluateCheckpoint + checkpointStats
    (L342) — periodic comprehension checkpoints.
7.  @/lib/school/adaptive/{weakTopics,nextBestAction,schoolProgress,
    schoolRouting} (L409) → STUDENT STATUS block (L431).
8.  @/lib/school/adaptive/masteryIntelligence (L438) →
    buildMasteryIntelligenceBlock (L446).
9.  @/lib/school/adaptive/assessmentIntelligence (L456) →
    buildAssessmentIntelligenceBlock (L464).
10. @/lib/school/adaptive/misconceptionEngine (L472) → detectMisconceptions
    / buildMisconceptionBlock / buildRemediationStrategy (L478–480).
11. @/lib/school/adaptive/conceptTransfer (L488) → evaluateConceptTransfer
    / buildTransferReasoningBlock / generateTransferPrompt (L492–494).
12. @/lib/school/adaptive/confidenceCalibration (L503) →
    buildConfidenceCalibrationBlock (L513).
13. @/lib/school/adaptive/learningMomentum (L520) → buildMomentumBlock (L522).
14. @/lib/school/adaptive/teachingStrategy (L529) → getTeachingStrategy /
    buildTeachingStrategyBlock (L537) — hoisted as strategyHoisted.
15. @/lib/school/adaptive/teachingOutputBias (L541, L559) →
    deriveOutputBias / deriveHintBias / isOptionalInlinePractice (hoisted).
16. @/lib/school/practice/generateInlinePractice + schoolRouting (L564) →
    [INLINE_PRACTICE] tag instruction (L574).
17. Inline [HINT] tag instruction or suppression instruction (L594/596) —
    literal append, no new import.
18. @/lib/school/adaptive/learningNarrative + schoolRouting (L604) →
    getLearningNarrative / buildLearningNarrativeBlock (L612).
19. @/lib/school/adaptive/dailyPlan (L620) → getDailyStudyPlan → DAILY
    STUDY PLAN block (L624).
20. @/lib/school/tutoring/guidedTeachingPrompt (L634) →
    buildGuidedTeachingPrompt (L635) — core guided-teaching instructions.
21. @/lib/school/adaptive/learningProfile (L652) → buildLearningProfile /
    formatLearningProfileContext (L655).
22. @/lib/school/adaptive/teachingStyle (L659) → buildTeachingStyleBlock (L660).
23. WEAK TOPIC RECOVERY literal block (L665) — reuses guidedWeakTopicTitles.
24. @/lib/school/tutoring/workedExamples (L675) →
    detectWorkedExampleIntent / buildWorkedExampleBlock (L680, L691) —
    sets workedExampleActive.
25. @/lib/school/navigation/learningNavigator (L701) →
    getLearningNavigatorAction / buildNavigatorSystemPromptBlock (L703).
26. @/lib/school/roadmap/learningRoadmap (L705) → getSubjectRoadmap /
    roadmapProgressPhrase → ROADMAP PROGRESS block (L708).
27. @/lib/school/adaptive/lessonPlanner + @/lib/education + schoolRouting
    (L717) → buildLessonPlan / buildLessonPlanBlock (L733) — hoisted as
    lessonPlanHoisted. (First of the two "lesson plan" sources — see
    ARCHITECTURE_DECISIONS.md.)
28. @/lib/school/adaptive/spacedRevision (L742) → getDueRevisions /
    buildRevisionBlock (L745).
29. @/lib/school/adaptive/prerequisiteRecovery + @/lib/education +
    schoolRouting (L753) → detectPrerequisiteGap /
    buildPrerequisiteAlertBlock (L763) — hoisted.
30. @/lib/school/adaptive/examReadiness + @/lib/education (L773) →
    getExamReadinessForSubject / buildExamReadinessBlock (L778).
31. @/lib/education + @/lib/school/exams/mockTestEngine + schoolRouting
    (L792) → buildMockTestInsightsBlock (L804).
32. REVISION NOTES AVAILABLE literal block (L817) — no new import.
33. @/lib/school/visuals/detectVisual (L827, L846) → detectVisual /
    buildVisualsSystemBlock (L834, L853) — run twice (chapter-scoped, then
    a second lesson-variant context).
34. @/lib/curriculum/engine (L863, L866) → generateRoadmap /
    buildTutorRoadmapContext (L867) — legacy roadmap context; tail of the
    big gate (closes ~L838, items 33/34 straddle the close).

SHARED / LIBRARY-SUBJECT PATH (L889–1280) — runs for both School and
Library sessions, or guarded by `if (!schoolCtx)` where noted:
35. @/lib/curriculum/subjectCatalog → findLibrarySubject (L900, L938),
    reused for two blocks.
36. CURRICULUM PROGRESSION block (L924) — Library module lock/complete state.
37. @/lib/school/adaptive/misconceptionEngine, non-school path (L942,
    `if (!schoolCtx)`) — same engine as #10, reused for Library lesson slugs.
38. ADAPTIVE TUTOR CONTEXT block (L976) — learning style/pace/trend, from
    already-fetched data.
39. @/lib/intelligence/tutorTeachingContext (L989) →
    getTutorTeachingContext / buildTutorTeachingContextBlock (L991).
40. Mastery + Spaced Repetition context block (L1040) — literal append
    from prior fetches.
41. @/lib/curriculum/knowledgeGraph (L1050) → getKnowledgeGraph /
    buildKnowledgeGraphContext / getAvailableNodes / getDirectUnlocks /
    getAllNodes — PREREQUISITES NOT MET (L1073), WHY THIS TOPIC MATTERS
    (L1077), NEXT RECOMMENDED TOPIC (L1086), KNOWLEDGE GAPS (L1096).
42. @/lib/assessment/subjectValidator (L1102) → getAssessmentRequirement
    → ASSESSMENT PROTOCOL block (L1109/1122).
43. @/lib/ai/learnerProfile (L1135) → buildLearnerIntelligenceProfile /
    formatLearnerIntelligenceContext (L1144) — cross-cutting summary,
    works for any subject.
44. @/lib/curriculum/subjectKgAdapter (L1156) → createSubjectAdapter —
    generic per-subject KG adapter.
45. @/lib/memory (L1159) → readLearnerMemoryFromPreload /
    toTeachingSnapshot — loads the Teaching Engine's memory snapshot.
46. TEACHING ENGINE DECISION block (L1204) — decide()-equivalent output:
    goal/mode/action/difficulty/target time; appends due spaced-repetition
    touchpoints (L1213).
47. @/lib/school/adaptive/teachingActionGenerator + schoolRouting (L1221)
    → getTeachingAction / buildTeachingActionBlock (L1237).
48. @/lib/school/adaptive/lessonComposer (L1245) → getLessonPlan /
    buildLessonPlanBlock (L1256) — the second "lesson plan" source,
    layered after the Teaching Engine decision and TAG.

THE LLM CALL
49. **routeAI(...)** at L1281 — the single AI Router call. Takes
    [...historyMessages, userMessage], the fully-assembled systemPrompt,
    country, max tokens 1024, teachingLang, {userId, subject}. Returns
    {text, provider}.

POST-LLM (response parsing + persistence), in order:
50. Empty-response guard (L1291) — 502 if !text.
51. if (schoolCtx) (L1300) → @/lib/school/visuals/detectVisual →
    parseVisualTag (L1302) — strips VISUAL:<type> from response text.
52. @/lib/school/tutoring/workedExamples → parseWorkedExampleTag (L1311).
53. Non-school mirror path (L1320) — same parseVisualTag reused.
54. @/lib/school/practice/generateInlinePractice → parseInlinePracticeTag
    (L1336) — hoisted as inlinePracticeHoisted.
55. @/lib/school/tutoring/hintTag → parseHintTag (L1348) — hoisted as
    hintHoisted, discarded if hintBias was SUPPRESSED.
56. Deterministic visual-spec detection on final text →
    planVisualTeaching / buildVisualSpec → detectedVisualSpec.
57. Flag-gated (ENABLE_PARAMETRIC_SCENE_GENERATION) parametric scene
    generation → routeSceneGenerator / generateRoutedScene →
    detectedSceneSpec, falling back to generic buildSceneSpec.
58. @/lib/school/adaptive/teachingOutputBias → isOptionalVisual /
    isOptionalVisualTag / isRequiredSceneSpec (L1499, L1515, L1530) —
    output-bias gate on whether to keep/suppress the detected visual/scene.
59. **prisma.message.create** (L1567) — persist the ASSISTANT message.
60. if (schoolCtx) (L1574) → prisma.learnSession.update (L1589) — writes
    contextSnapshot: lastSuccessfulTeachingStyle, currentConceptNodeId /
    nextConceptNodeId (if changed), lastPrerequisiteGap,
    currentWorkedExample.
61. prisma.studentProgress.upsert (unconditional) — lastStudiedAt /
    lastLessonTitle / lastUnitTitle / currentLesson.
62. if (schoolCtx) (L1631) → fire-and-forget
    @/lib/school/achievements/streakEngine → updateStudyStreak, then
    conditionally @/lib/school/achievements/achievementEngine →
    checkAndUnlockAchievements (new-day only).
63. Fire-and-forget @/lib/educationalBrain/pipeline →
    runEducationalBrainPipeline — only active under
    ENABLE_EDUCATIONAL_BRAIN_PIPELINE=true, never awaited.
64. Final NextResponse.json({ text, provider, visual, visualSpec,
    sceneSpec, dynamicVisualizationCode, inlinePractice, hint,
    lessonOrder, completedLessons }).
65. Outer catch blocks: AIBudgetExceededError → 429; AI error → 500
    (captureError); ZodError → 400; generic → 500.
```

**Key structural fact:** there is no single `schoolCtx` gate wrapping the
whole file — there are two pre-LLM gates (a small one at L240, the big one
at L294–838) plus three small post-LLM gates (L1300, L1574, L1631), with a
large shared/Library-only section in between that runs for every session
regardless of School/Library mode.

**Two independent "lesson plan" sources land in the same system prompt:**
item 27 (`lessonPlanner.ts`, School Mode only, chapter roadmap) and item 48
(`lessonComposer.ts`, both modes, single-turn pedagogical sequence). They
do not collide (different header strings, different scopes) but are a
documented naming-overlap finding — see `ARCHITECTURE_DECISIONS.md`.

**Student Memory write-back is never triggered from this route.** The chat
turn only *reads* memory (item 45). Writes happen exclusively from
`api/school/practice/submit/route.ts` and
`api/school/assessment/submit/route.ts`.

---

## 2. Database ownership

`prisma/schema.prisma` — 84 models, grouped by owner:

### Auth / Identity
`User, Account, AuthSession, VerificationToken, EmailVerificationToken,
Profile, GuardianLink, TeacherNote, Organization, OrganizationMember,
SocialProfile`

### Conversation / Session State
`LearnSession, Message, LearningPath`

### Learner Longitudinal State — **owned exclusively by the Student Memory Engine's write path**
`TopicProgress, EvidenceRecord, PracticeSession, MistakeRecord,
LearningCheckpoint, LearningProfile, SubjectAnalytics, RetentionMetric,
ReviewSchedule, ReviewAttempt, KnowledgeRetention, PerformanceMetric,
LearningAnalytics, TeachingStrategyEvent, ModuleProgress, StudentProgress,
EbLearnerConceptMastery, EbLearnerActiveMisconception`

> Of these, only `RetentionMetric` and `ReviewSchedule` are written
> exclusively by `src/lib/memory/update-pipeline.ts`. The others
> (`TopicProgress`, `MistakeRecord`, `PracticeSession`, etc.) are written
> directly by their owning feature routes (practice submit, assessment
> submit, checkpoint evaluation) — Student Memory *reads* them but is not
> their sole writer. "Sole owner of longitudinal learner state" means
> Student Memory is the only **aggregation/projection** layer over this
> whole bucket, and the only writer of the two derived/computed tables.

### Curriculum / Subject Configuration
`Subject, ProfileSubject, Curriculum, Roadmap, RoadmapEnrollment,
Milestone, CapstoneProject, Project, ChapterContentCache,
RevisionNotesCache, VisualizationCache, EbConcept, EbConceptEdge,
EbMisconception, EbConceptMisconception, EbLearningObjective,
EbObjectiveConcept, EbCurriculum, EbModule, EbModuleObjective,
EbAssetIdentity, EbExplanation, EbVisual, EbProbe`

> The file-based canonical KG (`docs/{subject}/kg/graph.json`) and the
> `Eb*` concept-graph tables are **two separate, coexisting
> representations** of curriculum structure — the DB tables do not
> replace the JSON files. See `ARCHITECTURE_DECISIONS.md`.

### Assessment
`SubjectAssessment, SubjectAssessmentResult, Assessment, AssessmentResult,
FinalAssessmentResult, SubjectCertificate, PlacementAssessment,
AssessmentAttempt, LearningEstimate, StudyCommitment, CapstoneSubmission,
ProjectSubmission, ProjectFeedback, Certificate, CoachProfile,
LearningGoal, CoachInsight`

### Billing / Subscription
`Subscription, Payment, AiUsageLimit`

### Gamification / Engagement / Admin-adjacent
`WeeklyXP, XpTransaction, UserLevel, Achievement, UserAchievement,
StudyStreak, LearningChallenge, ChallengeProgress, ActivityLog,
ClientEvent, PushSubscription, Referral, Flashcard, CareerProfile,
JobReadiness, YandexUsageLog`

### Educational Brain experiment infrastructure (separate "Eb" subsystem)
`EbKnowledgeAcquisitionTrace, EbSourceSegment, EbEvidenceEvent,
EbAssetScore, EbBrainConfig, EbExperiment, EbExperimentAssignment`

---

## 3. Knowledge flow

```
docs/{subject}/kg/graph.json  (immutable, 10-field canonical schema)
        │ fs.readFileSync, cached process-lifetime
        ▼
subjectKgAdapter.ts (inferDomain, inferConceptType — derived, never stored)
        │
        ▼
knowledgeGraph.ts (SUBJECT_ADAPTERS registry → KGNode / KnowledgeGraph)
        │
        ├──▶ Teaching Engine (ConceptNode input)
        ├──▶ TAG / Lesson Composer (ConceptNode input)
        ├──▶ Recommendation cluster (prerequisite walks, weak-topic mapping)
        └──▶ AI-prompt context strings (buildKnowledgeGraphContext)

scripts/validate-knowledge-graph.ts — offline CLI check, reads the same
graph.json, never in the runtime request path.
```

## 4. Teaching flow

```
Student Memory (TeachingMemorySnapshot)
  + ConceptNode (from Generic Subject Adapter)
  + LearningHistory
        │
        ▼
Teaching Engine .decide()  → TeachingDecision (frozen 6-field shape)
        │
        ▼
Teaching Action Generator .deriveTeachingAction()  → TeachingAction
        │ (reads AssessmentDecision for challenge_problem bump only)
        ▼
Dynamic Lesson Composer .composeLessonPlan()  → LessonPlan (stage sequence)
        │
        ▼
systemPrompt += buildTeachingActionBlock() + buildLessonPlanBlock()
        │
        ▼
AI Router → LLM (advisory text only — tutor adapts naturally, not scripted)
```

## 5. Assessment flow

```
Student Memory (readLearnerMemory)
  + Mastery Intelligence (getMasteryProfile)
  + chapter progress details
        │  Promise.all
        ▼
Assessment Intelligence .getAssessmentDecision()  → AssessmentDecision
        │
        ├──▶ Teaching Action Generator (assessmentType → challenge_problem trigger)
        ├──▶ Dynamic Lesson Composer (assessment_required → mastery_check stage)
        └──▶ systemPrompt += buildAssessmentIntelligenceBlock()

Subject Assessment Requirements (subjectValidator.ts) — independent,
static, category-keyed structural requirements (question type, min score,
grading instructions) → ASSESSMENT PROTOCOL block. Does not feed or read
from Assessment Intelligence.
```

## 6. Memory flow

```
READ PATH (every chat turn):
  repository.ts (parallel Prisma reads: TopicProgress, MistakeRecord,
  LearningProfile, RetentionMetric, ReviewSchedule, SubjectAnalytics,
  Message count, LearnSession)
        ▼
  service.ts aggregate() → LearnerMemory
        ▼
  toTeachingSnapshot() → TeachingMemorySnapshot
        ▼
  Teaching Engine .decide() input

WRITE PATH (never from the chat turn):
  api/school/practice/submit/route.ts ──▶ updateMemoryFromPractice()
  api/school/assessment/submit/route.ts ──▶ updateMemoryFromAssessment()
  (updateMemoryFromLesson defined + exported, currently uncalled)
        │  fire-and-forget, upsert (idempotent)
        ▼
  RetentionMetric, ReviewSchedule (the only two tables this engine writes)
```

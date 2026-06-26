# My Tutor — Architecture Reference

> Generated: 2026-06-15  
> Branch: `claude/my-tutor-foundation-KDSUO`  
> Source of truth: actual codebase at `/home/user/My-tutor`

---

## 1. PROJECT OVERVIEW

### Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router |
| Auth | NextAuth v5 (JWT strategy) |
| Database | PostgreSQL via Prisma ORM (`db push`, no migration files) |
| AI — Primary | Groq (openai/gpt-oss-20b) for most users |
| AI — Regional | YandexGPT (Russia/`country=ru` users only) |
| AI — JSON | Groq via `routeJSON()` (always, faster for structured output) |
| Cache | Redis (optional; app runs without it — falls back to in-memory) |
| Rate Limiting | Edge: in-memory sliding window (`src/lib/rateLimitEdge.ts`); Node: Redis-backed (`src/lib/rateLimit.ts`) |
| Monitoring | Structured stderr + optional webhook (`MONITORING_WEBHOOK_URL`) |
| Notifications | Email (SMTP) + Telegram bot |
| Voice | ElevenLabs TTS (`src/lib/voice/elevenlabs.ts`), browser STT |
| Deployment | Vercel (see `vercel.json`) |
| Styling | Tailwind CSS + CSS Modules + custom token system |

### Canonical Branch

`claude/my-tutor-foundation-KDSUO`

### High-Level Subsystems

1. **Auth & User Management** — NextAuth v5, credential + OAuth, password reset, email verification, soft-delete
2. **Onboarding Wizard** — multi-step (learner mode → board → grade → subject → voice/language preferences)
3. **General Learning** — AI chat tutor (`/learn`), flashcards, quiz, coach, practice, final assessments
4. **School Mode** — CBSE/UP Board chapter-structured learning, chapter practice, assessments, mock tests, revision notes
5. **Educational Intelligence Layer** — static knowledge graphs, board catalogs (CBSE + UP), adaptive engine sub-modules
6. **Analytics** — learning effectiveness, retention, misconception tracking, checkpoint analysis
7. **Gamification** — XP, levels, achievements, streaks, leaderboard, challenges
8. **Career / Roadmaps** — roadmap enrollment, milestones, capstone projects, certificates, job-readiness score
9. **Guardian / Teacher** — read-only links for parents/teachers, teacher notes channel
10. **Admin Console** — users, subjects, curriculum, knowledge graphs, AI ops, system settings, ops center
11. **Candy Design System** — gamified visual language (`src/components/ui/candy/`)
12. **Subscription / Payments** — subscription model with YooKassa payment records

### Feature-Flag Status

| Flag | Location | Value |
|---|---|---|
| `SCHOOL_MODE_ENABLED` | `src/lib/education/index.ts` | `false` (school chapter routing hidden) |
| `SCHOOL_ONBOARDING_ENABLED` | `src/lib/education/index.ts` | `true` (board/grade collected at onboarding) |

---

## 2. PRISMA DATA MODEL INVENTORY

Source: `/home/user/My-tutor/prisma/schema.prisma`

### Auth Models

| Model | Table | Purpose | Key Fields |
|---|---|---|---|
| `User` | `users` | Core user entity | `id`, `email`, `role (STUDENT|ADMIN)`, `onboardingCompleted`, `xpPoints`, `referralCode`, `telegramChatId`, `isDeleted` |
| `Account` | `accounts` | OAuth provider accounts (NextAuth) | `userId`, `provider`, `providerAccountId` |
| `AuthSession` | `auth_sessions` | Database sessions (NextAuth) | `sessionToken`, `userId`, `expires` |
| `VerificationToken` | `verification_tokens` | NextAuth email verification | `identifier`, `token`, `expires` |
| `EmailVerificationToken` | `email_verification_tokens` | Custom email verification flow | `userId`, `token`, `expiresAt`, `usedAt` |

### Profile & Subjects

| Model | Table | Purpose | Key Fields |
|---|---|---|---|
| `Profile` | `profiles` | Student profile | `userId`, `displayName`, `userType (GENERAL_LEARNER|SCHOOL_STUDENT)`, `educationBoard`, `grade`, `voiceId`, `teachingLanguage (ru|en|hi)`, `streakDays`, `confusedTopics[]`, `masteredTopics[]` |
| `Subject` | `subjects` | Subject catalog | `slug`, `name`, `type (SubjectType enum)` |
| `ProfileSubject` | `profile_subjects` | Enrolled subjects per student | `profileId`, `subjectId`, `currentLevelIndex (0-5)`, `targetLevelIndex`, `progressPercent`, `isActive` |

### Curriculum & Progress

| Model | Table | Purpose | Key Fields |
|---|---|---|---|
| `Curriculum` | `curriculum` | Static lesson catalog | `subjectCode`, `unit`, `lesson`, `lessonTitle`, `topicSlug` (links to KG node) |
| `StudentProgress` | `student_progress` | Per-user per-subject lesson progress | `userId`, `subjectCode`, `currentLesson`, `completedLessons[]`, `completionPercent` |
| `LearningPath` | `learning_paths` | AI-generated custom curriculum JSON | `userId`, `subjectId`, `curriculum (Json)`, `currentStep`, `totalSteps` |
| `ModuleProgress` | `module_progress` | Subject Library module unlock chain | `userId`, `subjectId`, `moduleSlug`, `status (LOCKED|AVAILABLE|IN_PROGRESS|COMPLETED)`, `masteryPct` |
| `TopicProgress` | `topic_progress` | KG node-level mastery tracking | `userId`, `subjectSlug`, `topicSlug`, `status (NOT_STARTED|IN_PROGRESS|COMPLETED|MASTERED|SKIPPED|REVISION)`, `masteryPct`, `attempts`, `revisionCount` |

### Learning Sessions & Messages

| Model | Table | Purpose | Key Fields |
|---|---|---|---|
| `LearnSession` | `learn_sessions` | AI tutoring session | `userId`, `subjectId`, `status`, `contextSnapshot (Json)`, `moodAnalysis (Json)`, `summary` |
| `Message` | `messages` | Session messages | `sessionId`, `role (USER|ASSISTANT|SYSTEM)`, `content`, `audioUrl`, `inputTokens`, `outputTokens` |

### Assessment Models

| Model | Table | Purpose | Key Fields |
|---|---|---|---|
| `Assessment` | `assessments` | Module gating assessments | `subjectCode`, `levelBand`, `moduleIndex`, `type (QUIZ|CHALLENGE|PROJECT)`, `passingScore` |
| `AssessmentResult` | `assessment_results` | User assessment scores | `userId`, `assessmentId`, `score`, `passed`, `masteryPct` |
| `SubjectAssessment` | `subject_assessments` | Per-subject module quizzes | `subjectId`, `kind (LESSON_QUIZ|MODULE_EXAM|PRACTICAL|MASTERY)`, `moduleSlug`, `questions (Json)` |
| `SubjectAssessmentResult` | `subject_assessment_results` | Results for subject assessments | `userId`, `assessmentId`, `score`, `passed`, `answers (Json)` |
| `FinalAssessmentResult` | `final_assessment_results` | Subject completion exam | `userId`, `subjectCode`, `score`, `passed` |
| `SubjectCertificate` | `subject_certificates` | Issued subject certificates | `userId`, `subjectCode`, `certificateCode`, `score`, `issuedAt` |

### Coach & Placement

| Model | Table | Purpose | Key Fields |
|---|---|---|---|
| `CoachProfile` | `coach_profiles` | Coach session data | `userId`, `notes` |
| `LearningGoal` | `learning_goals` | Per-subject learning intent | `coachProfileId`, `subjectId`, `claimedLevel`, `targetLevel`, `reason (LearningReason)`, `dailyMinutes`, `status (GoalStatus)` |
| `PlacementAssessment` | `placement_assessments` | Generated placement MCQ | `learningGoalId`, `questions (Json)`, `status (PENDING|COMPLETED|SKIPPED)` |
| `AssessmentAttempt` | `assessment_attempts` | Placement attempt record | `placementAssessmentId`, `userId`, `answers (Json)`, `score`, `recommendedLevel`, `strengths[]`, `weaknesses[]` |
| `LearningEstimate` | `learning_estimates` | Time-to-goal estimate | `learningGoalId`, `estimatedHours`, `estimatedWeeks`, `pathSummary` |
| `StudyCommitment` | `study_commitments` | Daily study time pledge | `learningGoalId`, `dailyMinutes`, `label` |

### Practice & Evidence

| Model | Table | Purpose | Key Fields |
|---|---|---|---|
| `PracticeSession` | `practice_sessions` | Practice question set (topic or chapter) | `userId`, `subjectSlug`, `topicSlug`, `chapterId?`, `kind ("practice"|"assessment")`, `questions (Json)`, `score` |
| `MistakeRecord` | `mistake_records` | Mistake taxonomy tracking | `userId`, `subjectSlug`, `topicSlug`, `sessionId`, `category`, `questionId` |
| `LearningCheckpoint` | `learning_checkpoints` | In-session micro-comprehension checks | `userId`, `board`, `grade`, `subjectSlug`, `chapterId`, `kgNodeId?`, `question`, `answer`, `userResponse`, `passed`, `hintUsed` |
| `EvidenceRecord` | `evidence_records` | Assessment integrity log | `userId`, `subjectSlug`, `topicSlug`, `type (QUIZ|PRACTICE|PROJECT|REVIEW|ASSESSMENT)`, `score`, `weight` |

### Analytics Models

| Model | Table | Purpose |
|---|---|---|
| `LearningAnalytics` | `learning_analytics` | Aggregate study stats (streaks, minutes, completions) |
| `LearningProfile` | `learning_profiles` | Preferred style/pace/difficulty |
| `SubjectAnalytics` | `subject_analytics` | Per-subject progress trends |
| `RetentionMetric` | `retention_metrics` | Per-topic mastery/confidence/decay |
| `StudySession` | `study_sessions` | Raw study time records |
| `PerformanceMetric` | `performance_metrics` | Per-topic correct/missed counts |
| `CoachInsight` | `coach_insights` | AI-generated coach nudges |
| `ReviewSchedule` | `review_schedules` | Spaced repetition schedule per topic |
| `ReviewAttempt` | `review_attempts` | Spaced repetition attempt log |
| `KnowledgeRetention` | `knowledge_retention` | Aggregate retention snapshot |

### Gamification Models

| Model | Table | Purpose |
|---|---|---|
| `XpTransaction` | `xp_transactions` | XP ledger per action |
| `UserLevel` | `user_levels` | Current level, tier, XP-in-level |
| `Achievement` | `achievements` | Achievement catalog |
| `UserAchievement` | `user_achievements` | Unlocked achievements |
| `StudyStreak` | `study_streaks` | Streak tracking |
| `LearningChallenge` | `learning_challenges` | Challenge definitions |
| `ChallengeProgress` | `challenge_progress` | User challenge progress |
| `ActivityLog` | `activity_logs` | Gamification event log |
| `SocialProfile` | `social_profiles` | Public learner profile |
| `WeeklyXP` | `weekly_xp` | Weekly XP for leaderboard |

### Career / Roadmap Models

| Model | Table | Purpose |
|---|---|---|
| `Roadmap` | `roadmaps` | Career roadmap definition |
| `RoadmapEnrollment` | `roadmap_enrollments` | User enrolled in roadmap |
| `Milestone` | `milestones` | Roadmap milestone achievements |
| `CapstoneProject` | `capstone_projects` | End-of-roadmap capstone definition |
| `CapstoneSubmission` | `capstone_submissions` | User capstone submission + AI review |
| `Certificate` | `certificates` | Roadmap completion certificate |
| `CareerProfile` | `career_profiles` | Target role + active roadmap |
| `JobReadiness` | `job_readiness` | Composite job readiness score |

### School Mode Models

| Model | Table | Purpose |
|---|---|---|
| `ChapterContentCache` | `chapter_content_cache` | Global AI-generated chapter summaries/objectives |
| `RevisionNotesCache` | `revision_notes_cache` | Global AI-generated revision notes (quick/exam/formula) |

### Social / Organization Models

| Model | Table | Purpose |
|---|---|---|
| `GuardianLink` | `guardian_links` | Parent/teacher read-only link to student |
| `TeacherNote` | `teacher_notes` | Teacher → student goals/recommendations |
| `Organization` | `organizations` | School/training-center entity (architecture-only) |
| `OrganizationMember` | `organization_members` | Org membership (architecture-only) |

### Misc Models

| Model | Table | Purpose |
|---|---|---|
| `Flashcard` | `flashcards` | User-created flashcards with spaced review |
| `Project` | `projects` | Subject project definitions |
| `ProjectSubmission` | `project_submissions` | User project submissions |
| `ProjectFeedback` | `project_feedback` | AI review of project submissions |
| `Subscription` | `subscriptions` | Plan (free/basic/pro/annual), YooKassa ID |
| `Payment` | `payments` | YooKassa payment records (RUB) |
| `Referral` | `referrals` | Referral code tracking |
| `YandexUsageLog` | `yandex_usage_logs` | AI provider call log (cost/tokens/success) |
| `AiUsageLimit` | `ai_usage_limits` | Singleton admin-configurable AI budget |
| `ClientEvent` | `client_events` | PWA/offline analytics events |
| `PushSubscription` | `push_subscriptions` | Web Push subscription records |

---

## 3. COMPLETE ROUTE INVENTORY (Pages)

| File Path | URL | Purpose |
|---|---|---|
| `src/app/page.tsx` | `/` | Landing / home page |
| `src/app/auth/login/page.tsx` | `/auth/login` | Login form |
| `src/app/auth/signup/page.tsx` | `/auth/signup` | Registration form |
| `src/app/auth/forgot-password/page.tsx` | `/auth/forgot-password` | Request password reset |
| `src/app/auth/reset-password/page.tsx` | `/auth/reset-password` | Set new password |
| `src/app/onboarding/page.tsx` | `/onboarding` | Multi-step onboarding wizard |
| `src/app/dashboard/page.tsx` | `/dashboard` | Main student dashboard (DashboardV2) |
| `src/app/dashboard/_legacy/page.tsx` | `/dashboard/_legacy` | Legacy dashboard (archived) |
| `src/app/learn/page.tsx` | `/learn` | AI tutoring chat session |
| `src/app/coach/page.tsx` | `/coach` | Coach interview + placement |
| `src/app/quiz/page.tsx` | `/quiz` | Quiz mode |
| `src/app/flashcards/page.tsx` | `/flashcards` | Flashcard study |
| `src/app/progress/page.tsx` | `/progress` | Learning progress overview |
| `src/app/library/page.tsx` | `/library` | Subject library catalog |
| `src/app/library/[slug]/page.tsx` | `/library/:slug` | Subject module tree |
| `src/app/leaderboard/page.tsx` | `/leaderboard` | Weekly XP leaderboard |
| `src/app/settings/page.tsx` | `/settings` | User settings |
| `src/app/certificates/page.tsx` | `/certificates` | User certificates list |
| `src/app/certificates/[code]/page.tsx` | `/certificates/:code` | Single certificate view |
| `src/app/school/[subject]/page.tsx` | `/school/:subject` | School subject overview |
| `src/app/school/[subject]/chapters/page.tsx` | `/school/:subject/chapters` | Chapter list for subject |
| `src/app/school/[subject]/chapter/[chapterId]/page.tsx` | `/school/:subject/chapter/:chapterId` | Chapter learning workspace |
| `src/app/school/[subject]/chapter/[chapterId]/practice/page.tsx` | `/school/:subject/chapter/:chapterId/practice` | Chapter practice quiz |
| `src/app/school/[subject]/chapter/[chapterId]/assessment/page.tsx` | `/school/:subject/chapter/:chapterId/assessment` | Chapter assessment |
| `src/app/school/[subject]/mock/page.tsx` | `/school/:subject/mock` | Mock exam |
| `src/app/school/focus/page.tsx` | `/school/focus` | Focus/study mode |
| `src/app/admin/page.tsx` | `/admin` | Admin console overview |
| `src/app/admin/users/page.tsx` | `/admin/users` | User management list |
| `src/app/admin/users/[id]/page.tsx` | `/admin/users/:id` | Single user detail |
| `src/app/admin/subjects/page.tsx` | `/admin/subjects` | Subject catalog admin |
| `src/app/admin/curriculum/page.tsx` | `/admin/curriculum` | Curriculum structure admin |
| `src/app/admin/knowledge-graphs/page.tsx` | `/admin/knowledge-graphs` | KG nodes + misconception weights |
| `src/app/admin/analytics/page.tsx` | `/admin/analytics` | Platform-wide analytics |
| `src/app/admin/ai-ops/page.tsx` | `/admin/ai-ops` | AI usage, budget, model routing |
| `src/app/admin/settings/page.tsx` | `/admin/settings` | Env validation + admin roster |
| `src/app/admin/ops/page.tsx` | `/admin/ops` | Operational health dashboard |

---

## 4. COMPLETE API INVENTORY

| File Path | URL | Methods | Purpose |
|---|---|---|---|
| `src/app/api/auth/[...nextauth]/route.ts` | `/api/auth/*` | GET/POST | NextAuth v5 handler |
| `src/app/api/auth/register/route.ts` | `/api/auth/register` | POST | User registration |
| `src/app/api/auth/forgot-password/route.ts` | `/api/auth/forgot-password` | POST | Send reset email |
| `src/app/api/auth/reset-password/route.ts` | `/api/auth/reset-password` | POST | Apply new password |
| `src/app/api/onboarding/route.ts` | `/api/onboarding` | POST | Save onboarding answers |
| `src/app/api/profile/route.ts` | `/api/profile` | GET/PATCH | Get/update user profile |
| `src/app/api/user/profile/route.ts` | `/api/user/profile` | GET/PATCH | User profile (alternate) |
| `src/app/api/user/delete-account/route.ts` | `/api/user/delete-account` | DELETE | Soft-delete account |
| `src/app/api/settings/route.ts` | `/api/settings` | GET/PATCH | User settings |
| `src/app/api/subjects/route.ts` | `/api/subjects` | GET | List enrolled subjects |
| `src/app/api/subjects/enroll/route.ts` | `/api/subjects/enroll` | POST | Enroll in a subject |
| `src/app/api/subjects/library/route.ts` | `/api/subjects/library` | GET | Subject library catalog |
| `src/app/api/sessions/route.ts` | `/api/sessions` | GET/POST | List/create learn sessions |
| `src/app/api/sessions/[sessionId]/messages/route.ts` | `/api/sessions/:id/messages` | GET | Session message history |
| `src/app/api/sessions/end/route.ts` | `/api/sessions/end` | POST | End a learn session |
| `src/app/api/learn/chat/route.ts` | `/api/learn/chat` | POST | AI tutor chat (streaming) |
| `src/app/api/learn/run/route.ts` | `/api/learn/run` | POST | Run/execute code |
| `src/app/api/coach/route.ts` | `/api/coach` | GET/POST | Coach interview chat |
| `src/app/api/quiz/generate/route.ts` | `/api/quiz/generate` | POST | Generate quiz questions |
| `src/app/api/flashcards/route.ts` | `/api/flashcards` | GET/POST/PATCH | Flashcard CRUD + review |
| `src/app/api/practice/submit/route.ts` | `/api/practice/submit` | POST | Submit practice answers |
| `src/app/api/practice/analysis/route.ts` | `/api/practice/analysis` | GET | Practice performance analysis |
| `src/app/api/assessment/evaluate/route.ts` | `/api/assessment/evaluate` | POST | Evaluate assessment answers |
| `src/app/api/final-assessment/route.ts` | `/api/final-assessment` | GET | Get final assessment status |
| `src/app/api/final-assessment/generate/route.ts` | `/api/final-assessment/generate` | POST | Generate final exam |
| `src/app/api/topic-progress/route.ts` | `/api/topic-progress` | GET/POST | Topic mastery read/write |
| `src/app/api/curriculum/route.ts` | `/api/curriculum` | GET | Curriculum for a subject |
| `src/app/api/curriculum/progress/route.ts` | `/api/curriculum/progress` | GET/PATCH | Lesson progress |
| `src/app/api/school/practice/generate/route.ts` | `/api/school/practice/generate` | POST | Generate chapter practice questions |
| `src/app/api/school/practice/submit/route.ts` | `/api/school/practice/submit` | POST | Submit chapter practice |
| `src/app/api/school/assessment/generate/route.ts` | `/api/school/assessment/generate` | POST | Generate chapter assessment |
| `src/app/api/school/assessment/submit/route.ts` | `/api/school/assessment/submit` | POST | Submit chapter assessment |
| `src/app/api/school/mock/generate/route.ts` | `/api/school/mock/generate` | POST | Generate mock exam |
| `src/app/api/school/mock/submit/route.ts` | `/api/school/mock/submit` | POST | Submit mock exam |
| `src/app/api/school/progress/route.ts` | `/api/school/progress` | GET | School subject progress |
| `src/app/api/school/report/route.ts` | `/api/school/report` | GET | Progress report PDF/data |
| `src/app/api/school/revision/route.ts` | `/api/school/revision` | GET/POST | Revision notes |
| `src/app/api/analytics/center/route.ts` | `/api/analytics/center` | GET | Analytics center data |
| `src/app/api/analytics/learning-effectiveness/route.ts` | `/api/analytics/learning-effectiveness` | GET | Student effectiveness report |
| `src/app/api/analytics/learning-effectiveness/admin/route.ts` | `/api/analytics/learning-effectiveness/admin` | GET | Admin platform-wide effectiveness |
| `src/app/api/learner/profile-insights/route.ts` | `/api/learner/profile-insights` | GET | AI learner profile analysis |
| `src/app/api/leaderboard/route.ts` | `/api/leaderboard` | GET | Weekly XP leaderboard |
| `src/app/api/referral/route.ts` | `/api/referral` | GET/POST | Referral code management |
| `src/app/api/certificates/[code]/route.ts` | `/api/certificates/:code` | GET | Certificate verification |
| `src/app/api/tts/route.ts` | `/api/tts` | POST | Text-to-speech synthesis |
| `src/app/api/stt/route.ts` | `/api/stt` | POST | Speech-to-text transcription |
| `src/app/api/voice/synthesize/route.ts` | `/api/voice/synthesize` | POST | Voice synthesis (ElevenLabs) |
| `src/app/api/vision/route.ts` | `/api/vision` | POST | Image/vision analysis |
| `src/app/api/guardian/links/route.ts` | `/api/guardian/links` | GET/POST/DELETE | Guardian link management |
| `src/app/api/health/route.ts` | `/api/health` | GET | Health check endpoint |
| `src/app/api/admin/ops/route.ts` | `/api/admin/ops` | GET | Ops dashboard data (DB health, failure counters, env status) |
| `src/app/api/cron/reminders/route.ts` | `/api/cron/reminders` | POST | Cron: send study reminders |
| `src/app/api/telegram/webhook/route.ts` | `/api/telegram/webhook` | POST | Telegram bot webhook |
| `src/app/api/debug-session/route.ts` | `/api/debug-session` | GET | Debug current session (dev only) |
| `src/app/api/test-auth/route.ts` | `/api/test-auth` | GET | Test auth state (dev only) |

---

## 5. EDUCATIONAL INTELLIGENCE LAYER

### Boards Supported

| Board | ID | Grades | Subjects |
|---|---|---|---|
| CBSE (Central Board of Secondary Education) | `cbse` | 5–12 | mathematics, science, social_science, english, hindi, sanskrit, physics, chemistry, biology, history, geography, political_science, economics, accountancy, business_studies, computer_science, information_technology, sociology, psychology, urdu |
| UP Board (UPMSP) | `up_board` | 5–12 | Same subjects as CBSE (note: UP Grade 12 Economics catalog is incomplete) |

### School Learning Flow

1. Student selects board + grade at onboarding
2. `SCHOOL_ONBOARDING_ENABLED=true` — board/grade captured
3. `SCHOOL_MODE_ENABLED=false` — chapter workspace still gated; general tutor used instead
4. Chapter content served from `ChapterContentCache` (global, AI-generated, shared)
5. Revision notes served from `RevisionNotesCache` (3 types: `quick`, `exam`, `formula`)

### Learning Orchestrator (`src/lib/school/adaptive/learningOrchestrator.ts`)

Deterministic priority engine returning exactly ONE recommendation per student:

1. `failed_assessment` — latest chapter assessment failed, chapter incomplete
2. `prerequisite_gap` — HIGH-confidence KG prerequisite missing
3. `spaced_revision_due` — overdue node from spaced revision engine
4. `weak_topic` — severe weakness (severity ≥ threshold)
5. `exam_readiness_risk` — subject readiness < 40%
6. `mock_test_weakness` — recent mock weak node not yet mastered
7. `continue_chapter` — resume current chapter
8. `start_next_chapter` — begin first chapter for a new subject

### Adaptive Sub-Modules (`src/lib/school/adaptive/`)

| File | Module |
|---|---|
| `conceptTransfer.ts` | Concept transfer between related topics |
| `confidenceCalibration.ts` | Student confidence vs. actual performance |
| `dailyPlan.ts` | Daily study plan generation |
| `examReadiness.ts` | Exam readiness scoring |
| `learningMomentum.ts` | Momentum/engagement tracking |
| `learningNarrative.ts` | Contextual learning narrative for student |
| `learningOrchestrator.ts` | Top-level recommendation engine |
| `learningProfile.ts` | Adaptive learner profile builder |
| `lessonPlanner.ts` | Lesson plan generation |
| `masteryIntelligence.ts` | Mastery computation intelligence |
| `misconceptionEngine.ts` | Misconception detection and tracking |
| `nextBestAction.ts` | Next best action selection |
| `prerequisiteRecovery.ts` | Prerequisite gap recovery |
| `spacedRevision.ts` | Spaced revision scheduling |
| `studyPlan.ts` | Multi-week study plan |
| `teachingStrategy.ts` | Teaching strategy selection |
| `teachingStyle.ts` | Teaching style adaptation |
| `weakTopics.ts` | Weak topic identification |

---

## 6. KNOWLEDGE GRAPH INVENTORY

All KG files are in `/home/user/My-tutor/src/lib/education/`. The `KnowledgeNode` type is:

```typescript
interface KnowledgeNode {
  id: string
  domain: string
  title: string
  description: string
  difficulty: 'foundational' | 'developing' | 'proficient' | 'advanced'
  prerequisites: string[]   // array of prerequisite node IDs
}
```

Misconception data is runtime (`MistakeRecord` table), NOT in the static KG type.

### Knowledge Graph Files

| File | Export | Subject Coverage |
|---|---|---|
| `mathKnowledgeGraph.ts` | `MATH_KNOWLEDGE_GRAPH` | Full math: arithmetic through calculus, vectors, matrices, combinatorics |
| `scienceKnowledgeGraph.ts` | `SCIENCE_KNOWLEDGE_GRAPH` | Physics, chemistry, biology, earth/environmental science |
| `englishKnowledgeGraph.ts` | `ENGLISH_KNOWLEDGE_GRAPH` | Grammar, vocabulary, reading, writing, communication, literature |
| `socialScienceKnowledgeGraph.ts` | `SOCIAL_SCIENCE_KNOWLEDGE_GRAPH` | History, geography, civics, economics, society |
| `hindiKnowledgeGraph.ts` | `HINDI_KNOWLEDGE_GRAPH` | व्याकरण, शब्दावली, पठन, लेखन, गद्य, पद्य, साहित्य विश्लेषण, काव्य-बोध |
| `sanskritKnowledgeGraph.ts` | `SANSKRIT_KNOWLEDGE_GRAPH` | व्याकरण, संधि, समास, शब्द-रूप, धातु-रूप, गद्य, पद्य |
| `physicsKnowledgeGraph.ts` | `PHYSICS_KNOWLEDGE_GRAPH` | Senior-secondary Physics (Grades 11–12) |
| `chemistryKnowledgeGraph.ts` | `CHEMISTRY_KNOWLEDGE_GRAPH` | Senior-secondary Chemistry (Grades 11–12) |
| `biologyKnowledgeGraph.ts` | `BIOLOGY_KNOWLEDGE_GRAPH` | Senior-secondary Biology (Grades 11–12) |
| `historyKnowledgeGraph.ts` | `HISTORY_KNOWLEDGE_GRAPH` | History (ancient, medieval, modern, world) |
| `geographyKnowledgeGraph.ts` | `GEOGRAPHY_KNOWLEDGE_GRAPH` | Geography (physical, human, maps) |
| `politicalScienceKnowledgeGraph.ts` | `POLITICAL_SCIENCE_KNOWLEDGE_GRAPH` | Political science / civics |
| `economicsKnowledgeGraph.ts` | `ECONOMICS_KNOWLEDGE_GRAPH` | Economics (micro, macro, Indian) |
| `accountancyKnowledgeGraph.ts` | `ACCOUNTANCY_KNOWLEDGE_GRAPH` | Accountancy (Grades 11–12) |
| `businessStudiesKnowledgeGraph.ts` | `BUSINESS_STUDIES_KNOWLEDGE_GRAPH` | Business Studies (Grades 11–12) |
| `computerScienceKnowledgeGraph.ts` | `COMPUTER_SCIENCE_KNOWLEDGE_GRAPH` | Computer Science (Grades 9–12) |
| `informationTechnologyKnowledgeGraph.ts` | `INFORMATION_TECHNOLOGY_KNOWLEDGE_GRAPH` | Information Technology (Grades 9–12) |
| `sociologyKnowledgeGraph.ts` | `SOCIOLOGY_KNOWLEDGE_GRAPH` | Sociology (Grades 11–12) |
| `psychologyKnowledgeGraph.ts` | `PSYCHOLOGY_KNOWLEDGE_GRAPH` | Psychology (Grades 11–12) |
| `urduKnowledgeGraph.ts` | `URDU_KNOWLEDGE_GRAPH` | Urdu language (Grades 6–12) |

### Hindi Sub-Catalogs (`src/lib/education/hindi/`)

| File | Content |
|---|---|
| `durvaBhag1.ts` | Durva Part 1 textbook nodes |
| `durvaBhag2.ts` | Durva Part 2 textbook nodes |
| `durvaBhag3.ts` | Durva Part 3 textbook nodes |
| `sanchayanBhag1.ts` | Sanchayan Part 1 textbook nodes |
| `sanchayanBhag2.ts` | Sanchayan Part 2 textbook nodes |
| `sparshBhag1.ts` | Sparsh Part 1 textbook nodes |
| `sparshBhag2.ts` | Sparsh Part 2 textbook nodes |

### Coverage Audit (`src/lib/education/coverageAudit.ts`)

Provides: `auditSubjectCoverage()`, `auditGradeCoverage()`, `auditBoardCoverage()`, `findUnmappedChapters()`, `findUnusedKnowledgeNodes()`.

Currently only the 4 core subjects (mathematics, science, english, social_science) are included in `ALL_KG_NODES` for audit purposes. Stream subjects [UNVERIFIED node counts].

---

## 7. STUDENT JOURNEY MAP

```
Registration (/auth/signup)
  → Email/password or OAuth
  → maybeBootstrapAdmin() checks ADMIN_EMAILS env

Onboarding (/onboarding) — 4 steps
  Step 1: Who are you? (General Learner vs. School Student)
    → If School: Board selection (CBSE / UP Board) → Grade selection (5–12)
    → If General: Subject selection from catalog
  Step 2: Describe yourself (free text / skill level)
  Step 3: Voice preferences (male/female/warm, language ru/en/hi, speech rate)
  Step 4: Preview + confirm → POST /api/onboarding → Profile created

Dashboard (/dashboard)
  → DashboardV2 component
  → ContinueCard (last lesson), DailyGoalCard, SkillPath, PracticeModes
  → School students see SchoolDashboard

Learning (/learn or /school/...)
  General: AI chat tutor → LearnSession + Messages
  School: Chapter workspace → ChapterContentCache → AI tutor context
    → Chapter Practice (/school/:subject/chapter/:id/practice)
    → Chapter Assessment (/school/:subject/chapter/:id/assessment)
    → Mock Test (/school/:subject/mock)

Progress Tracking
  → TopicProgress: per KG-node mastery
  → LearningCheckpoints: in-session micro-checks
  → PracticeSession + MistakeRecord: wrong answer taxonomy

Assessments
  → Chapter assessments → PracticeSession (kind="assessment")
  → Module assessments → SubjectAssessment
  → Final exam → FinalAssessmentResult → SubjectCertificate

Career (optional)
  → Coach placement → CoachProfile + LearningGoal + PlacementAssessment
  → Roadmap enrollment → RoadmapEnrollment → Milestones → Capstone → Certificate
  → JobReadiness score computation
```

---

## 8. ANALYTICS ARCHITECTURE

### Core Analytics Tables

| Table | Granularity | Updated By |
|---|---|---|
| `TopicProgress` | Per user × subject × KG-node | Practice/assessment APIs |
| `PracticeSession` | Per attempt (topic or chapter) | `/api/school/practice/submit`, `/api/practice/submit` |
| `MistakeRecord` | Per wrong answer | Practice submit APIs |
| `LearningCheckpoint` | Per in-session micro-check | `/api/learn/chat` (tutor evaluates inline) |
| `StudySession` | Per date, per subject | End-of-session |
| `RetentionMetric` | Per user × subject × topic | Spaced repetition review |
| `SubjectAnalytics` | Per user × subject | Aggregated on study events |
| `LearningAnalytics` | Per user (global) | Aggregated on study events |

### Learning Effectiveness Module (`src/lib/school/analytics/learningEffectiveness.ts`)

Pure computation — no AI, no new schema. Aggregates existing tables into a `LearningEffectivenessReport`:

| Score | Formula Source |
|---|---|
| `learningEffectivenessScore` | Mastery growth rate vs. attempts invested |
| `retentionEffectivenessScore` | Revision impact on mastery stability |
| `recommendationEffectivenessScore` | Checkpoint + practice pass rates |

Output types: `MasteryGrowthMetrics`, `RevisionEffectiveness`, `RecommendationEffectiveness`, `MisconceptionReport`, `SubjectEffectiveness`.

### Mistake Taxonomy

`MistakeRecord.category` field stores mistake category strings from a taxonomy (e.g., `arithmetic_error`). Categories are defined at the practice evaluation layer (`src/lib/school/practice/evaluatePracticeAnswer.ts`).

### Analytics APIs

- `GET /api/analytics/center` — analytics center data
- `GET /api/analytics/learning-effectiveness` — per-student effectiveness report
- `GET /api/analytics/learning-effectiveness/admin` — platform-wide admin view
- `GET /api/learner/profile-insights` — AI analysis of learner profile

---

## 9. ADMIN & OPERATIONS

### Admin Gating

Admin access is gated by **DB role** (`User.role === 'ADMIN'`), bootstrapped from the `ADMIN_EMAILS` env var at first login via `maybeBootstrapAdmin()` in `src/lib/auth/admin.ts`. Once in DB, the env var is no longer required for that user.

```
src/lib/auth/admin.ts
  isAdmin(userId)       — DB check
  requireAdmin()        — throws Unauthorized/Forbidden
  isAdminEmail(email)   — checks ADMIN_EMAILS env var
  maybeBootstrapAdmin() — promotes user to ADMIN on login
```

### Admin Pages

| URL | Purpose |
|---|---|
| `/admin` | Console overview: user count, admin count, nav grid |
| `/admin/users` | User list with search |
| `/admin/users/:id` | Single user detail, actions |
| `/admin/subjects` | Subject catalog management |
| `/admin/curriculum` | Chapter/lesson/module structure |
| `/admin/knowledge-graphs` | KG nodes, misconception weights, mastery config |
| `/admin/analytics` | Platform-wide engagement + completion metrics |
| `/admin/ai-ops` | AI usage, budget limits, model routing config |
| `/admin/settings` | Env validation, feature flags, admin roster |
| `/admin/ops` | Operational health: DB status, Redis status, failure counters, env var presence |

### Ops Center (`/admin/ops` → `GET /api/admin/ops`)

Returns:
- `health.db` — PostgreSQL connectivity
- `health.redis` — Redis status string
- `health.uptime` — process uptime
- `failureCounters` — from `getFailureCounters()` in monitoring.ts
- `env` — presence of: `smtp`, `monitoring`, `groq`, `yandex`, `openrouter`, `adminEmails`

### Monitoring (`src/lib/monitoring.ts`)

- `reportError(context, err, meta)` — structured stderr log + optional webhook POST
- `captureError(err, { route, tags, extra })` — alias used by API routes
- `getFailureCounters()` — in-process failure counts by context key
- `maskEmail(email)` — safe email masking for logs
- Webhook: `MONITORING_WEBHOOK_URL` env var (Sentry/Logtail/Slack-compatible)
- Redacts keys matching `/pass|secret|token|key|authorization|cookie|smtp_pass/i`

### Rate Limiting Architecture

**Edge Layer** (`src/lib/rateLimitEdge.ts` → `src/middleware.ts`):
- In-memory sliding window, runs on Edge runtime
- Tiers: `strict` (5/min — auth routes), `ai` (30/min — AI routes), `general` (120/min)
- Applied to every `/api/*` request before reaching Node runtime

**Node Layer** (`src/lib/rateLimit.ts`):
- Redis-backed per-user/IP limiter (falls back to in-memory if Redis unavailable)
- Layered on top of Edge rate limiting for sensitive routes

### Environment Validation (`src/lib/env/validate.ts`)

Required vars: `DATABASE_URL`, `AUTH_SECRET`. In production, missing vars throw (app refuses to start). In dev, warns to console.

---

## 10. DESIGN SYSTEM INVENTORY

### Candy Design System (`src/components/ui/candy/`)

Gamified visual language introduced for Dashboard V2.

| Component | File | Purpose |
|---|---|---|
| `Button` | `candy/Button.tsx` | Candy-styled button |
| `Card` | `candy/Card.tsx` | Candy-styled card |
| `Mascot` | `candy/Mascot.tsx` | Animated mascot/avatar |
| `Pill` | `candy/Pill.tsx` | Label pill badge |
| `ProgressBar` | `candy/ProgressBar.tsx` | Animated progress bar |
| `ProgressRing` | `candy/ProgressRing.tsx` | Circular progress ring |
| `SectionTitle` | `candy/SectionTitle.tsx` | Styled section heading |
| `useConfetti` | `candy/useConfetti.ts` | Confetti animation hook |

**Token files:**

- `candy/tokens.module.css` — CSS custom properties (`--candy-*` prefix):
  - `--candy-bg`, `--candy-card`, `--candy-ink`, `--candy-ink-soft`
  - `--candy-purple`, `--candy-blue`, `--candy-green`, `--candy-yellow`, `--candy-orange`, `--candy-red`, `--candy-pink`
  - Dark mode override via `[data-theme='dark']`
- `candy/primitives.module.css` — Base primitive styles
- `src/styles/tokens.css` — App-wide semantic tokens (`--purple`, `--blue`, `--green`, etc.)

### Base UI Components (`src/components/ui/`)

| Component | Purpose |
|---|---|
| `Avatar.tsx` | User avatar |
| `Badge.tsx` | Status badge |
| `Button.tsx` | Base button |
| `LanguageToggle.tsx` | ru/en/hi language switcher |
| `LoadingSkeleton.tsx` | Loading skeleton |
| `ThemeToggle.tsx` | Light/dark theme toggle |
| `Toast.tsx` | Toast notification |

### School Visuals (`src/components/school/visuals/`)

Interactive educational diagrams rendered as React components:

| Component | Subject Coverage |
|---|---|
| `CircuitDiagram.tsx` | Physics — electric circuits |
| `CoordinatePlane.tsx` | Math — coordinate geometry |
| `FoodChain.tsx` | Biology — ecology |
| `ForceDiagram.tsx` | Physics — forces |
| `FractionBar.tsx` | Math — fractions |
| `GeometryShapes.tsx` | Math — geometry |
| `NumberLine.tsx` | Math — number systems |
| `PercentageGrid.tsx` | Math — percentages |
| `SolarSystem.tsx` | Science — earth/space |
| `WaterCycle.tsx` | Science — environmental |
| `VisualCard.tsx` | Wrapper card for any visual |

Visual type detection: `src/lib/school/visuals/detectVisual.ts`

---

## 11. FILE TREE SUMMARY

```
src/
├── app/
│   ├── (root pages: page.tsx, layout.tsx, globals.css)
│   ├── admin/                    # Admin console (7 sections + ops)
│   ├── api/                      # ~50 API routes
│   │   ├── admin/ops/
│   │   ├── analytics/
│   │   ├── assessment/
│   │   ├── auth/
│   │   ├── certificates/
│   │   ├── coach/
│   │   ├── cron/
│   │   ├── curriculum/
│   │   ├── final-assessment/
│   │   ├── flashcards/
│   │   ├── guardian/
│   │   ├── health/
│   │   ├── learn/
│   │   ├── leaderboard/
│   │   ├── learner/
│   │   ├── onboarding/
│   │   ├── practice/
│   │   ├── profile/
│   │   ├── quiz/
│   │   ├── referral/
│   │   ├── school/
│   │   ├── sessions/
│   │   ├── settings/
│   │   ├── subjects/
│   │   ├── telegram/
│   │   ├── topic-progress/
│   │   ├── tts/, stt/, vision/, voice/
│   │   └── user/
│   ├── auth/                     # Login, signup, reset
│   ├── certificates/
│   ├── coach/
│   ├── dashboard/ (_legacy + current)
│   ├── flashcards/
│   ├── learn/
│   ├── leaderboard/
│   ├── library/
│   ├── onboarding/
│   ├── progress/
│   ├── quiz/
│   ├── school/                   # School mode pages
│   └── settings/
├── components/
│   ├── analytics/
│   ├── auth/
│   ├── career/
│   ├── dashboard/ (v2 sub-dir)
│   ├── gamification/
│   ├── learn/
│   ├── library/
│   ├── mastery/
│   ├── onboarding/
│   ├── school/
│   │   ├── visuals/              # 10 interactive diagram components
│   │   └── (quiz, assessment, mock, navigator components)
│   ├── ui/
│   │   ├── candy/                # Gamified design system
│   │   └── (base components)
│   └── Providers.tsx
├── lib/
│   ├── ai/                       # AI client, router, budget, mood, learner profile
│   ├── analytics/
│   ├── assessment/
│   ├── auth/                     # NextAuth config, admin helpers
│   ├── cognitive-profile.ts
│   ├── curriculum/               # KG, engine, levels, static, subjectCatalog
│   ├── dashboard/
│   ├── db/                       # Prisma client, withRetry
│   ├── education/                # 40+ KG and catalog files
│   │   ├── hindi/                # 7 textbook-specific sub-catalogs
│   │   ├── (20 KG files)
│   │   ├── (CBSE + UP catalog files per subject)
│   │   └── (board registry, education graph, coverage audit)
│   ├── email.ts
│   ├── env/
│   ├── hooks/
│   ├── i18n.ts
│   ├── mastery/                  # Spaced repetition, levels
│   ├── monitoring.ts
│   ├── notifications/            # Email + Telegram
│   ├── rateLimit.ts              # Redis-backed rate limiter
│   ├── rateLimitEdge.ts          # Edge-safe in-memory rate limiter
│   ├── redis/
│   ├── roadmaps/
│   ├── school/
│   │   ├── achievements/         # Achievement engine, streak engine
│   │   ├── adaptive/             # 18 adaptive intelligence modules
│   │   ├── analytics/            # Learning effectiveness
│   │   ├── assessment/
│   │   ├── checkpoints/
│   │   ├── exams/                # Mock test engine
│   │   ├── navigation/
│   │   ├── practice/
│   │   ├── quality/              # Content quality + tutor audit
│   │   ├── reports/              # Progress report
│   │   ├── revision/             # Revision notes
│   │   ├── roadmap/
│   │   ├── schoolProgress.ts
│   │   ├── schoolRouting.ts
│   │   ├── tutoring/             # Guided teaching + worked examples
│   │   └── visuals/
│   ├── tts.ts, tts-cleaner.ts
│   ├── voice/
│   ├── xp.ts
│   └── (prisma.ts, rateLimit.ts, redis.ts, i18n.ts, email.ts)
├── auth.ts                       # NextAuth config export
├── middleware.ts                 # Edge rate limiter + route protection
├── scripts/fix-db.ts
├── styles/tokens.css
└── types/index.ts
```

---

## 12. HINDI CURRICULUM STATUS

### What Exists

**CBSE Hindi Catalog** (`src/lib/education/cbseHindiCatalog.ts`):
- Grades 5–12 with full chapter listings
- Shared grammar/writing/vocab/reading core (Sprint DF)
- Literature chapters (Sprint DG):
  - Grade 5: रिमझिम (गद्य + पद्य)
  - Grade 6: वसंत भाग–1 + बाल रामकथा
  - Grade 7: वसंत भाग–2 + बाल महाभारत कथा
  - Grade 8: वसंत भाग–3 + भारत की खोज
  - Grade 9: क्षितिज भाग–1 + कृतिका भाग–1
  - Grade 10: क्षितिज भाग–2 + कृतिका भाग–2
  - Grade 11: आरोह भाग–1 + वितान भाग–1
  - Grade 12: आरोह भाग–2 + वितान भाग–2

**CBSE Hindi B Catalog** (`src/lib/education/cbseHindiBCatalog.ts`): separate `BoardSubjectCatalog` with `subjectSlug: 'hindi-b'`. Added in Sprint EU.2. Grade 9 = Sparsh Bhag-1 (13) + Sanchayan Bhag-1 (3); Grade 10 = Sparsh Bhag-2 (17) + Sanchayan Bhag-2 (3). Onboarding/track-selection not yet wired.

**UP Hindi Catalog** (`src/lib/education/upHindiCatalog.ts`): exists

**Hindi Knowledge Graph** (`src/lib/education/hindiKnowledgeGraph.ts`):
- Domains: `hindi.vyakaran` (grammar), `hindi.shabdavali` (vocabulary), `hindi.padhna` (reading), `hindi.lekhan` (writing), `hindi.gadya` (prose), `hindi.padya` (poetry), `hindi.sahitya_vishleshan` (literary analysis), `hindi.kavya_bodh` (poetic understanding)
- Coverage: grammar nodes (वर्ण-विचार through काल), vocab, reading comprehension, writing types, prose/poetry genres

**Hindi Sub-Catalogs** (`src/lib/education/hindi/`):
- 7 files: Durva (1–3, Grade 6–8 supplementary), Sanchayan (1–2, Hindi B Grade 9–10), Sparsh (1–2, Hindi B Grade 9–10)

### Hindi Rebuild Sprint Status (EU series)

- **EU.1A** — Corrected Class 10 Kshitij-2 poetry attributions (सूरदास/देव split from तुलसीदास/प्रसाद; "अट नहीं रही है" title fix).
- **EU.1B** — Completed Grade 6–8 Vasant additions (नौकर; रक्त और हमारा शरीर, कंचा, धनराज पिल्लै, आश्रम का अनुमानित व्यय; जब सिनेमा ने बोलना सीखा, पानी की कहानी, टोपी) and created Durva Bhag 1–3.
- **EU.1C** — Read-only forensic audit; verdict B (minor corrections). Found D-01 author error + others.
- **EU.1D** — Applied corrections: removed wrong यतींद्र मिश्र attribution, added missing अपूर्व अनुभव (Vasant Bhag-2 ch10), removed unverified Grade 8 authors, normalized Durva Bhag-2 titles.
- **EU.2** — Completed Grade 9–10 Hindi A (added यमराज की दिशा, एक कहानी यह भी, एहि ठैयाँ झुलनी हेरानी हो रामा!) and created the Hindi B track (Sparsh + Sanchayan).

### Teaching Language Support

Profile stores `teachingLanguage (ru|en|hi)`. The AI router supports `hi` language tag; tutor prompts are language-aware. TTS preview text exists in Hindi.

### What's Missing / Gaps

- Hindi KG is **not included** in `coverageAudit.ts`'s `ALL_KG_NODES` (only math/science/english/social_science audited) — so Hindi coverage audit produces no data
- `SCHOOL_MODE_ENABLED=false` means Hindi chapter workspace not yet live
- KG node count for Hindi [UNVERIFIED — file not fully enumerated]
- Hindi B (secondary course) coverage relative to main Hindi [UNVERIFIED]

---

## 13. KNOWN ISSUES / TECHNICAL DEBT

| Severity | Location | Description |
|---|---|---|
| HIGH | `src/lib/education/index.ts` | `SCHOOL_MODE_ENABLED = false` — school chapter workspace gated off even though all infrastructure exists |
| MEDIUM | `src/lib/education/upBoardCatalog.ts` (comment) | UP Grade 12 Economics has no chapters yet (catalog gap noted as Sprint DB) |
| MEDIUM | `src/lib/education/coverageAudit.ts` | Coverage audit only includes 4 core subjects (math/science/english/social_science); 16+ stream subjects are unaudited |
| MEDIUM | `src/lib/ai/router.ts` | `CLAUDE.md` says OpenRouter is primary AI; actual code shows Groq (llama-3.1-8b-instant) as primary, YandexGPT for Russia — OpenRouter not used in current code |
| LOW | `src/lib/ai/budget.ts` | `AI_GLOBAL_RPM=0` disables global budget; needs active configuration in production |
| LOW | `src/app/dashboard/_legacy/page.tsx` | Legacy dashboard still in codebase |
| LOW | `src/app/api/debug-session/route.ts`, `test-auth/route.ts` | Debug/test routes in production build |
| LOW | `prisma/schema.prisma` (Organization models) | `Organization` + `OrganizationMember` are "architecture only" — no queries use them yet |
| LOW | `prisma/schema.prisma` (PushSubscription) | Web Push subscription table exists but nothing sends push notifications yet |
| INFO | `prisma/schema.prisma` (Subscription/Payment) | Payments use YooKassa (`yookassaPaymentId`). Stripe dead code was removed in Sprint EP; `npx tsc --noEmit` is currently clean (0 errors) on this branch |
| INFO | `tailwind.config.js` + `tailwind.config.ts` | Two Tailwind config files exist (may cause confusion) |

---

## 14. ROADMAP STATUS

### Completed Sprints (evidenced in codebase)

| Sprint Tag | Feature |
|---|---|
| Sprint AT | CBSE subject list honesty (only subjects with catalogs) |
| Sprint AW | CBSE English catalog |
| Sprint BF | School onboarding (board/grade capture) |
| Sprint BL | Chapter learning workspace + `ChapterContentCache` |
| Sprint BM | Chapter practice (`PracticeSession.chapterId`) |
| Sprint BN | Practice vs. assessment kind (`PracticeSession.kind`) |
| Sprint BS | Learning checkpoints (`LearningCheckpoint` model + in-session micro-checks) |
| Sprint CG | Learning Intelligence Orchestrator |
| Sprint CI | Revision notes cache (`RevisionNotesCache`) |
| Sprint DC | Senior-secondary (11–12) stream subjects as first-class |
| Sprint DF | CBSE Hindi grammar/writing/vocab/reading core |
| Sprint DG | CBSE Hindi literature chapters (all grades) |
| Sprint DX | Commerce streams: Accountancy, Business Studies |
| Sprint DY | Computer Science (Grades 9–12) |
| Sprint DZ | Science stream KGs: Physics, Chemistry, Biology |
| Sprint EA | Information Technology (Grades 9–12) |
| Sprint EB | Sociology (Grades 11–12) |
| Sprint EC | Psychology (Grades 11–12) |
| Sprint ED | Urdu (Grades 6–12) |
| Sprint EG | Learning Effectiveness Intelligence |
| Sprint EK | Monitoring (`captureError`), Edge rate limiter (`rateLimitEdge.ts`) |
| Sprint EP | Stripe dead-code removal; green build (0 TS errors) |
| Sprint EQ | Operations hardening: admin ops center, env validation, ops/deployment docs |
| Sprint EU.1A–EU.2 | Hindi curriculum forensic correction + rebuild (Grades 6–10, Durva, Hindi B track) |
| Sprint 1 | Coach interview + placement |
| Sprint 3 | Learning analytics + AI personalization |
| Sprint C | Spaced repetition, projects, knowledge retention |
| Sprint D | Career roadmaps, capstone, certificates, job readiness |
| Sprint E | Gamification, achievements, streaks, challenges, social profiles |
| Sprint F | PWA/mobile: `ClientEvent`, `PushSubscription` (architecture) |
| Sprint G | Guardian links, teacher notes, Organization (architecture) |

### In-Progress / Next

- Activate `SCHOOL_MODE_ENABLED` (all infrastructure ready, feature flag is the gate)
- Hindi KG coverage audit integration
- Fill UP Board Grade 12 Economics catalog gap
- Push notification implementation (table exists, sender not built)
- Organization / multi-tenant activation (schema exists, queries not built)
- OpenRouter integration (noted in CLAUDE.md as primary but not yet in code)

---

## Running Locally

```bash
# 1. Clone and configure
cp .env.example .env
# Edit .env: set DATABASE_URL, DIRECT_URL, AUTH_SECRET, OPENROUTER_API_KEY (or GROQ_API_KEY)
# Optional: ADMIN_EMAILS, MONITORING_WEBHOOK_URL, YANDEX_API_KEY, YANDEX_FOLDER_ID, REDIS_URL

# 2. Install
npm install

# 3. Push schema
npx prisma db push

# 4. Dev server
npm run dev   # http://localhost:3000

# 5. Type check (currently clean — 0 errors on this branch)
npx tsc --noEmit

# 6. Production build
npm run build   # runs prisma generate && next build
```

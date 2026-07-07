-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ModuleStatus" AS ENUM ('LOCKED', 'AVAILABLE', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TopicStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'MASTERED', 'SKIPPED', 'REVISION');

-- CreateEnum
CREATE TYPE "EvidenceType" AS ENUM ('QUIZ', 'PRACTICE', 'PROJECT', 'REVIEW', 'ASSESSMENT');

-- CreateEnum
CREATE TYPE "AssessmentType" AS ENUM ('QUIZ', 'CHALLENGE', 'PROJECT');

-- CreateEnum
CREATE TYPE "LevelBand" AS ENUM ('COMPLETE_BEGINNER', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PROFESSIONAL', 'EXPERT');

-- CreateEnum
CREATE TYPE "LearningReason" AS ENUM ('CAREER', 'JOB_CHANGE', 'SCHOOL', 'UNIVERSITY', 'BUSINESS', 'PERSONAL_INTEREST');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('INTERVIEW', 'PLACEMENT_OFFERED', 'PLACEMENT_IN_PROGRESS', 'PLACED', 'PLAN_READY');

-- CreateEnum
CREATE TYPE "PlacementStatus" AS ENUM ('PENDING', 'COMPLETED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "TeachingLanguage" AS ENUM ('ru', 'en', 'hi');

-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('C', 'CPP', 'PYTHON', 'ENGLISH', 'LANGUAGE', 'PROGRAMMING', 'MATHEMATICS', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'AI');

-- CreateEnum
CREATE TYPE "AssessmentKind" AS ENUM ('LESSON_QUIZ', 'MODULE_EXAM', 'PRACTICAL', 'MASTERY');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "ReviewOutcome" AS ENUM ('AGAIN', 'HARD', 'GOOD', 'EASY');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "LearningStyle" AS ENUM ('VISUAL', 'PRACTICAL', 'THEORETICAL', 'BALANCED');

-- CreateEnum
CREATE TYPE "LessonLengthPref" AS ENUM ('SHORT', 'MEDIUM', 'LONG');

-- CreateEnum
CREATE TYPE "DifficultyPref" AS ENUM ('EASIER', 'ADAPTIVE', 'HARDER');

-- CreateEnum
CREATE TYPE "LearningPace" AS ENUM ('SLOW', 'STEADY', 'FAST');

-- CreateEnum
CREATE TYPE "TrendDirection" AS ENUM ('IMPROVING', 'STEADY', 'DECLINING');

-- CreateEnum
CREATE TYPE "CoachInsightKind" AS ENUM ('PROGRESS', 'STREAK_RISK', 'REVIEW_NEEDED', 'PACE_ESTIMATE', 'FOCUS_RECOMMENDATION', 'GENERAL');

-- CreateEnum
CREATE TYPE "InsightSeverity" AS ENUM ('INFO', 'POSITIVE', 'WARNING');

-- CreateEnum
CREATE TYPE "AIProvider" AS ENUM ('YANDEX', 'GROQ', 'FALLBACK');

-- CreateEnum
CREATE TYPE "RoadmapStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'PAUSED');

-- CreateEnum
CREATE TYPE "MilestoneKind" AS ENUM ('SUBJECT_COMPLETE', 'ROADMAP_PROGRESS', 'CAPSTONE_COMPLETE', 'ROADMAP_COMPLETE');

-- CreateEnum
CREATE TYPE "XpAction" AS ENUM ('LESSON_COMPLETED', 'QUIZ_PASSED', 'ASSESSMENT_PASSED', 'PROJECT_COMPLETED', 'REVIEW_COMPLETED', 'ROADMAP_MILESTONE', 'CAPSTONE_COMPLETED', 'CERTIFICATE_EARNED', 'OTHER');

-- CreateEnum
CREATE TYPE "AchievementCategory" AS ENUM ('LEARNING', 'PROJECTS', 'STREAKS', 'SUBJECTS', 'ROADMAPS', 'CERTIFICATES');

-- CreateEnum
CREATE TYPE "ChallengePeriod" AS ENUM ('WEEKLY', 'DAILY');

-- CreateEnum
CREATE TYPE "ChallengeMetric" AS ENUM ('LESSONS_COMPLETED', 'STUDY_DAYS', 'PROJECTS_COMPLETED', 'REVIEWS_COMPLETED', 'ASSESSMENTS_PASSED');

-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ActivityKind" AS ENUM ('ACHIEVEMENT_UNLOCKED', 'LEVEL_UP', 'STREAK_MILESTONE', 'CHALLENGE_COMPLETED');

-- CreateEnum
CREATE TYPE "ClientEventKind" AS ENUM ('PWA_INSTALL_PROMPT', 'PWA_INSTALLED', 'OFFLINE_SESSION', 'SESSION_RECOVERY', 'VIEWPORT_CLASS');

-- CreateEnum
CREATE TYPE "GuardianRelationship" AS ENUM ('PARENT', 'TEACHER');

-- CreateEnum
CREATE TYPE "GuardianLinkStatus" AS ENUM ('PENDING', 'ACTIVE', 'REVOKED');

-- CreateEnum
CREATE TYPE "TeacherNoteKind" AS ENUM ('GOAL', 'MODULE_RECOMMENDATION', 'NOTE');

-- CreateEnum
CREATE TYPE "TeacherNoteStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "OrganizationKind" AS ENUM ('SCHOOL', 'TRAINING_CENTER', 'CORPORATE');

-- CreateEnum
CREATE TYPE "OrgMemberRole" AS ENUM ('OWNER', 'ADMIN', 'TEACHER', 'MEMBER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "passwordHash" TEXT,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "xpPoints" INTEGER NOT NULL DEFAULT 0,
    "referralCode" TEXT,
    "referredBy" TEXT,
    "freeSessionsExtra" INTEGER NOT NULL DEFAULT 0,
    "telegramChatId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "email_verification_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "email_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "selfDescription" TEXT NOT NULL,
    "currentLevel" TEXT,
    "targetLevel" TEXT,
    "learningGoals" TEXT,
    "voiceId" TEXT,
    "teachingLanguage" "TeachingLanguage" NOT NULL DEFAULT 'en',
    "country" TEXT NOT NULL DEFAULT 'global',
    "confusedTopics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "masteredTopics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "totalSessions" INTEGER NOT NULL DEFAULT 0,
    "totalMessages" INTEGER NOT NULL DEFAULT 0,
    "lastStudiedTopic" TEXT,
    "streakDays" INTEGER NOT NULL DEFAULT 0,
    "lastStudyDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SubjectType" NOT NULL,
    "description" TEXT,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_subjects" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "level" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentLevelIndex" INTEGER NOT NULL DEFAULT 0,
    "targetLevelIndex" INTEGER,
    "progressPercent" INTEGER NOT NULL DEFAULT 0,
    "estimatedHoursLeft" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_assessments" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "kind" "AssessmentKind" NOT NULL DEFAULT 'LESSON_QUIZ',
    "levelIndex" INTEGER NOT NULL DEFAULT 0,
    "moduleSlug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "passScore" INTEGER NOT NULL DEFAULT 70,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subject_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_assessment_results" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "answers" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subject_assessment_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "moduleSlug" TEXT NOT NULL,
    "status" "ModuleStatus" NOT NULL DEFAULT 'LOCKED',
    "masteryPct" INTEGER NOT NULL DEFAULT 0,
    "bestScore" INTEGER,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "module_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectSlug" TEXT NOT NULL,
    "topicSlug" TEXT NOT NULL,
    "status" "TopicStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "masteryPct" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastScore" INTEGER,
    "completedAt" TIMESTAMP(3),
    "revisionCount" INTEGER NOT NULL DEFAULT 0,
    "lastRevisionAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topic_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence_records" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectSlug" TEXT NOT NULL,
    "topicSlug" TEXT NOT NULL,
    "type" "EvidenceType" NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "method" TEXT NOT NULL DEFAULT 'AI',
    "notes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evidence_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectSlug" TEXT NOT NULL,
    "topicSlug" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "completedAt" TIMESTAMP(3),
    "score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "practice_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mistake_records" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectSlug" TEXT NOT NULL,
    "topicSlug" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mistake_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_paths" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "curriculum" JSONB NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "totalSteps" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning_paths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learn_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "title" TEXT,
    "status" "SessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "contextSnapshot" JSONB,
    "moodAnalysis" JSONB,
    "summary" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learn_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "audioUrl" TEXT,
    "codeSnippet" TEXT,
    "codeLanguage" TEXT,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'free',
    "planExpiresAt" TIMESTAMP(3),
    "lessonsThisMonth" INTEGER NOT NULL DEFAULT 0,
    "monthResetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "yookassaPaymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "yookassaId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'RUB',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flashcards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "nextReview" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "easy" BOOLEAN NOT NULL DEFAULT false,
    "lastReviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flashcards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum" (
    "id" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "unit" INTEGER NOT NULL,
    "unitTitle" TEXT NOT NULL,
    "lesson" INTEGER NOT NULL,
    "lessonTitle" TEXT NOT NULL,
    "lessonGoal" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "topicSlug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "currentLesson" INTEGER NOT NULL DEFAULT 1,
    "completedLessons" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "lastStudiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLessonTitle" TEXT,
    "lastUnitTitle" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "completionPercent" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_assessment_results" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "final_assessment_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_certificates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "certificateCode" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "totalLessons" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subject_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessments" (
    "id" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "levelBand" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "moduleTitle" TEXT NOT NULL,
    "type" "AssessmentType" NOT NULL DEFAULT 'QUIZ',
    "passingScore" INTEGER NOT NULL DEFAULT 70,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_results" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "masteryPct" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assessment_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_goals" (
    "id" TEXT NOT NULL,
    "coachProfileId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "claimedLevel" "LevelBand" NOT NULL,
    "targetLevel" "LevelBand" NOT NULL,
    "reason" "LearningReason" NOT NULL,
    "dailyMinutes" INTEGER NOT NULL,
    "recommendedLevel" "LevelBand",
    "status" "GoalStatus" NOT NULL DEFAULT 'INTERVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placement_assessments" (
    "id" TEXT NOT NULL,
    "learningGoalId" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "status" "PlacementStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "placement_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_attempts" (
    "id" TEXT NOT NULL,
    "placementAssessmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "score" INTEGER NOT NULL,
    "recommendedLevel" "LevelBand" NOT NULL,
    "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "weaknesses" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assessment_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_estimates" (
    "id" TEXT NOT NULL,
    "learningGoalId" TEXT NOT NULL,
    "estimatedHours" INTEGER NOT NULL,
    "estimatedWeeks" INTEGER NOT NULL,
    "estimatedMonths" INTEGER NOT NULL,
    "pathSummary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning_estimates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_commitments" (
    "id" TEXT NOT NULL,
    "learningGoalId" TEXT NOT NULL,
    "dailyMinutes" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "study_commitments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredId" TEXT,
    "code" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekly_xp" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "week" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "weekly_xp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_analytics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalStudyMinutes" INTEGER NOT NULL DEFAULT 0,
    "currentStreakDays" INTEGER NOT NULL DEFAULT 0,
    "longestStreakDays" INTEGER NOT NULL DEFAULT 0,
    "lastStudyDate" TIMESTAMP(3),
    "lessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "assessmentsPassed" INTEGER NOT NULL DEFAULT 0,
    "projectsCompleted" INTEGER NOT NULL DEFAULT 0,
    "overallCompletionPct" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "learning_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredLearningStyle" "LearningStyle" NOT NULL DEFAULT 'BALANCED',
    "preferredLessonLength" "LessonLengthPref" NOT NULL DEFAULT 'MEDIUM',
    "preferredDifficulty" "DifficultyPref" NOT NULL DEFAULT 'ADAPTIVE',
    "preferredSubjectOrder" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "confidenceLevel" INTEGER NOT NULL DEFAULT 50,
    "learningPace" "LearningPace" NOT NULL DEFAULT 'STEADY',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "learning_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_analytics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "progressPercent" INTEGER NOT NULL DEFAULT 0,
    "studyMinutes" INTEGER NOT NULL DEFAULT 0,
    "lessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "assessmentsPassed" INTEGER NOT NULL DEFAULT 0,
    "strongTopics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "weakTopics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "trend" "TrendDirection" NOT NULL DEFAULT 'STEADY',
    "lastStudiedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subject_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retention_metrics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "masteryScore" INTEGER NOT NULL DEFAULT 0,
    "confidenceScore" INTEGER NOT NULL DEFAULT 0,
    "decayScore" INTEGER NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "lastReviewedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "retention_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_schedules" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "stage" INTEGER NOT NULL DEFAULT 0,
    "nextReviewAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastOutcome" "ReviewOutcome",
    "lastReviewedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_attempts" (
    "id" TEXT NOT NULL,
    "reviewScheduleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "outcome" "ReviewOutcome" NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "levelIndex" INTEGER NOT NULL DEFAULT 0,
    "estimatedHours" INTEGER NOT NULL DEFAULT 2,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_submissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "content" TEXT,
    "score" INTEGER,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_feedback" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "aiReview" TEXT NOT NULL,
    "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "improvements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "masteryImpact" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_retention" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT,
    "retentionScore" INTEGER NOT NULL DEFAULT 0,
    "conceptsTracked" INTEGER NOT NULL DEFAULT 0,
    "conceptsMastered" INTEGER NOT NULL DEFAULT 0,
    "trend" "TrendDirection" NOT NULL DEFAULT 'STEADY',
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "knowledge_retention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minutes" INTEGER NOT NULL DEFAULT 0,
    "source" TEXT NOT NULL DEFAULT 'learn_session',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "study_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performance_metrics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "timesCorrect" INTEGER NOT NULL DEFAULT 0,
    "timesMissed" INTEGER NOT NULL DEFAULT 0,
    "lastSeenAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "performance_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_insights" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT,
    "kind" "CoachInsightKind" NOT NULL DEFAULT 'GENERAL',
    "message" TEXT NOT NULL,
    "severity" "InsightSeverity" NOT NULL DEFAULT 'INFO',
    "dismissed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coach_insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yandex_usage_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "subject" TEXT,
    "teachingLanguage" TEXT NOT NULL,
    "provider" "AIProvider" NOT NULL,
    "requestTokens" INTEGER NOT NULL DEFAULT 0,
    "responseTokens" INTEGER NOT NULL DEFAULT 0,
    "estimatedCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "success" BOOLEAN NOT NULL,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "yandex_usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_usage_limits" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "dailyRequestLimit" INTEGER NOT NULL DEFAULT 500,
    "monthlyCostLimitUsd" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "maxTokensPerRequest" INTEGER NOT NULL DEFAULT 2000,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_usage_limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmaps" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "requiredSubjects" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "estimatedWeeks" INTEGER NOT NULL DEFAULT 12,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_enrollments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "status" "RoadmapStatus" NOT NULL DEFAULT 'ACTIVE',
    "progressPct" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roadmap_enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milestones" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "MilestoneKind" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "achievedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capstone_projects" (
    "id" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "estimatedHours" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "capstone_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capstone_submissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "capstoneId" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "content" TEXT,
    "score" INTEGER,
    "aiReview" TEXT,
    "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "improvements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "capstone_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL,
    "certificateCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "roadmapTitle" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetRole" TEXT,
    "activeRoadmapId" TEXT,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "career_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_readiness" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "label" TEXT NOT NULL,
    "skillsScore" INTEGER NOT NULL DEFAULT 0,
    "projectsScore" INTEGER NOT NULL DEFAULT 0,
    "assessmentsScore" INTEGER NOT NULL DEFAULT 0,
    "masteryScore" INTEGER NOT NULL DEFAULT 0,
    "roadmapScore" INTEGER NOT NULL DEFAULT 0,
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_readiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xp_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "action" "XpAction" NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xp_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_levels" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "tier" TEXT NOT NULL,
    "xpInLevel" INTEGER NOT NULL DEFAULT 0,
    "xpToNext" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "AchievementCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "tier" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_achievements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_streaks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "totalActiveDays" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "study_streaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_challenges" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "period" "ChallengePeriod" NOT NULL,
    "metric" "ChallengeMetric" NOT NULL,
    "target" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "learning_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "periodKey" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "status" "ChallengeStatus" NOT NULL DEFAULT 'ACTIVE',
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenge_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "ActivityKind" NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT,
    "subject" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT,
    "bio" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "ClientEventKind" NOT NULL,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "push_subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "topics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guardian_links" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "guardianId" TEXT,
    "relationship" "GuardianRelationship" NOT NULL,
    "status" "GuardianLinkStatus" NOT NULL DEFAULT 'PENDING',
    "inviteCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guardian_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_notes" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "kind" "TeacherNoteKind" NOT NULL DEFAULT 'NOTE',
    "subjectSlug" TEXT,
    "title" TEXT NOT NULL,
    "detail" TEXT,
    "status" "TeacherNoteStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacher_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "OrganizationKind" NOT NULL DEFAULT 'SCHOOL',
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_members" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "OrgMemberRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organization_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_referralCode_key" ON "users"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "auth_sessions_sessionToken_key" ON "auth_sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_tokens_token_key" ON "email_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "email_verification_tokens_userId_idx" ON "email_verification_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_slug_key" ON "subjects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profile_subjects_profileId_subjectId_key" ON "profile_subjects"("profileId", "subjectId");

-- CreateIndex
CREATE INDEX "subject_assessments_subjectId_levelIndex_moduleSlug_idx" ON "subject_assessments"("subjectId", "levelIndex", "moduleSlug");

-- CreateIndex
CREATE UNIQUE INDEX "subject_assessments_subjectId_moduleSlug_key" ON "subject_assessments"("subjectId", "moduleSlug");

-- CreateIndex
CREATE INDEX "subject_assessment_results_userId_assessmentId_idx" ON "subject_assessment_results"("userId", "assessmentId");

-- CreateIndex
CREATE INDEX "module_progress_userId_subjectId_idx" ON "module_progress"("userId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "module_progress_userId_subjectId_moduleSlug_key" ON "module_progress"("userId", "subjectId", "moduleSlug");

-- CreateIndex
CREATE INDEX "topic_progress_userId_subjectSlug_idx" ON "topic_progress"("userId", "subjectSlug");

-- CreateIndex
CREATE UNIQUE INDEX "topic_progress_userId_subjectSlug_topicSlug_key" ON "topic_progress"("userId", "subjectSlug", "topicSlug");

-- CreateIndex
CREATE INDEX "evidence_records_userId_subjectSlug_topicSlug_idx" ON "evidence_records"("userId", "subjectSlug", "topicSlug");

-- CreateIndex
CREATE INDEX "practice_sessions_userId_subjectSlug_topicSlug_idx" ON "practice_sessions"("userId", "subjectSlug", "topicSlug");

-- CreateIndex
CREATE INDEX "mistake_records_userId_subjectSlug_idx" ON "mistake_records"("userId", "subjectSlug");

-- CreateIndex
CREATE INDEX "mistake_records_userId_subjectSlug_topicSlug_idx" ON "mistake_records"("userId", "subjectSlug", "topicSlug");

-- CreateIndex
CREATE INDEX "mistake_records_userId_subjectSlug_category_idx" ON "mistake_records"("userId", "subjectSlug", "category");

-- CreateIndex
CREATE INDEX "learning_paths_userId_subjectId_idx" ON "learning_paths"("userId", "subjectId");

-- CreateIndex
CREATE INDEX "learn_sessions_userId_subjectId_idx" ON "learn_sessions"("userId", "subjectId");

-- CreateIndex
CREATE INDEX "learn_sessions_userId_status_idx" ON "learn_sessions"("userId", "status");

-- CreateIndex
CREATE INDEX "messages_sessionId_createdAt_idx" ON "messages"("sessionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_userId_key" ON "subscriptions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_yookassaId_key" ON "payments"("yookassaId");

-- CreateIndex
CREATE INDEX "flashcards_userId_nextReview_idx" ON "flashcards"("userId", "nextReview");

-- CreateIndex
CREATE INDEX "flashcards_userId_lastReviewedAt_idx" ON "flashcards"("userId", "lastReviewedAt");

-- CreateIndex
CREATE INDEX "curriculum_subjectCode_idx" ON "curriculum"("subjectCode");

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_subjectCode_order_key" ON "curriculum"("subjectCode", "order");

-- CreateIndex
CREATE UNIQUE INDEX "student_progress_userId_subjectCode_key" ON "student_progress"("userId", "subjectCode");

-- CreateIndex
CREATE UNIQUE INDEX "final_assessment_results_userId_subjectCode_key" ON "final_assessment_results"("userId", "subjectCode");

-- CreateIndex
CREATE UNIQUE INDEX "subject_certificates_certificateCode_key" ON "subject_certificates"("certificateCode");

-- CreateIndex
CREATE UNIQUE INDEX "subject_certificates_userId_subjectCode_key" ON "subject_certificates"("userId", "subjectCode");

-- CreateIndex
CREATE INDEX "assessments_subjectCode_idx" ON "assessments"("subjectCode");

-- CreateIndex
CREATE UNIQUE INDEX "assessments_subjectCode_levelBand_moduleIndex_key" ON "assessments"("subjectCode", "levelBand", "moduleIndex");

-- CreateIndex
CREATE INDEX "assessment_results_userId_assessmentId_idx" ON "assessment_results"("userId", "assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "coach_profiles_userId_key" ON "coach_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "learning_goals_coachProfileId_subjectId_key" ON "learning_goals"("coachProfileId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "placement_assessments_learningGoalId_key" ON "placement_assessments"("learningGoalId");

-- CreateIndex
CREATE UNIQUE INDEX "learning_estimates_learningGoalId_key" ON "learning_estimates"("learningGoalId");

-- CreateIndex
CREATE UNIQUE INDEX "study_commitments_learningGoalId_key" ON "study_commitments"("learningGoalId");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_code_key" ON "referrals"("code");

-- CreateIndex
CREATE UNIQUE INDEX "weekly_xp_userId_week_key" ON "weekly_xp"("userId", "week");

-- CreateIndex
CREATE UNIQUE INDEX "learning_analytics_userId_key" ON "learning_analytics"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "learning_profiles_userId_key" ON "learning_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subject_analytics_userId_subjectId_key" ON "subject_analytics"("userId", "subjectId");

-- CreateIndex
CREATE INDEX "retention_metrics_userId_subjectId_masteryScore_idx" ON "retention_metrics"("userId", "subjectId", "masteryScore");

-- CreateIndex
CREATE UNIQUE INDEX "retention_metrics_userId_subjectId_topic_key" ON "retention_metrics"("userId", "subjectId", "topic");

-- CreateIndex
CREATE INDEX "review_schedules_userId_nextReviewAt_idx" ON "review_schedules"("userId", "nextReviewAt");

-- CreateIndex
CREATE UNIQUE INDEX "review_schedules_userId_subjectId_topic_key" ON "review_schedules"("userId", "subjectId", "topic");

-- CreateIndex
CREATE INDEX "review_attempts_userId_createdAt_idx" ON "review_attempts"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "projects_subjectId_slug_key" ON "projects"("subjectId", "slug");

-- CreateIndex
CREATE INDEX "project_submissions_userId_status_idx" ON "project_submissions"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "project_submissions_userId_projectId_key" ON "project_submissions"("userId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "project_feedback_submissionId_key" ON "project_feedback"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "knowledge_retention_userId_subjectId_key" ON "knowledge_retention"("userId", "subjectId");

-- CreateIndex
CREATE INDEX "study_sessions_userId_date_idx" ON "study_sessions"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "performance_metrics_userId_subjectId_topic_key" ON "performance_metrics"("userId", "subjectId", "topic");

-- CreateIndex
CREATE INDEX "coach_insights_userId_dismissed_idx" ON "coach_insights"("userId", "dismissed");

-- CreateIndex
CREATE INDEX "yandex_usage_logs_createdAt_idx" ON "yandex_usage_logs"("createdAt");

-- CreateIndex
CREATE INDEX "yandex_usage_logs_userId_idx" ON "yandex_usage_logs"("userId");

-- CreateIndex
CREATE INDEX "yandex_usage_logs_provider_idx" ON "yandex_usage_logs"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "roadmaps_slug_key" ON "roadmaps"("slug");

-- CreateIndex
CREATE INDEX "roadmap_enrollments_userId_status_idx" ON "roadmap_enrollments"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "roadmap_enrollments_userId_roadmapId_key" ON "roadmap_enrollments"("userId", "roadmapId");

-- CreateIndex
CREATE INDEX "milestones_userId_achievedAt_idx" ON "milestones"("userId", "achievedAt");

-- CreateIndex
CREATE UNIQUE INDEX "milestones_enrollmentId_kind_title_key" ON "milestones"("enrollmentId", "kind", "title");

-- CreateIndex
CREATE UNIQUE INDEX "capstone_projects_roadmapId_key" ON "capstone_projects"("roadmapId");

-- CreateIndex
CREATE INDEX "capstone_submissions_userId_status_idx" ON "capstone_submissions"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "capstone_submissions_userId_capstoneId_key" ON "capstone_submissions"("userId", "capstoneId");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_certificateCode_key" ON "certificates"("certificateCode");

-- CreateIndex
CREATE INDEX "certificates_certificateCode_idx" ON "certificates"("certificateCode");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_userId_roadmapId_key" ON "certificates"("userId", "roadmapId");

-- CreateIndex
CREATE UNIQUE INDEX "career_profiles_userId_key" ON "career_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "job_readiness_userId_key" ON "job_readiness"("userId");

-- CreateIndex
CREATE INDEX "xp_transactions_userId_createdAt_idx" ON "xp_transactions"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_levels_userId_key" ON "user_levels"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "achievements_slug_key" ON "achievements"("slug");

-- CreateIndex
CREATE INDEX "user_achievements_userId_idx" ON "user_achievements"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_achievements_userId_achievementId_key" ON "user_achievements"("userId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "study_streaks_userId_key" ON "study_streaks"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "learning_challenges_slug_key" ON "learning_challenges"("slug");

-- CreateIndex
CREATE INDEX "challenge_progress_userId_periodKey_idx" ON "challenge_progress"("userId", "periodKey");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_progress_userId_challengeId_periodKey_key" ON "challenge_progress"("userId", "challengeId", "periodKey");

-- CreateIndex
CREATE INDEX "activity_logs_userId_createdAt_idx" ON "activity_logs"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "social_profiles_userId_key" ON "social_profiles"("userId");

-- CreateIndex
CREATE INDEX "client_events_userId_kind_createdAt_idx" ON "client_events"("userId", "kind", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "push_subscriptions_endpoint_key" ON "push_subscriptions"("endpoint");

-- CreateIndex
CREATE INDEX "push_subscriptions_userId_idx" ON "push_subscriptions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "guardian_links_inviteCode_key" ON "guardian_links"("inviteCode");

-- CreateIndex
CREATE INDEX "guardian_links_studentId_status_idx" ON "guardian_links"("studentId", "status");

-- CreateIndex
CREATE INDEX "guardian_links_guardianId_status_idx" ON "guardian_links"("guardianId", "status");

-- CreateIndex
CREATE INDEX "teacher_notes_studentId_status_idx" ON "teacher_notes"("studentId", "status");

-- CreateIndex
CREATE INDEX "teacher_notes_teacherId_createdAt_idx" ON "teacher_notes"("teacherId", "createdAt");

-- CreateIndex
CREATE INDEX "organizations_ownerId_idx" ON "organizations"("ownerId");

-- CreateIndex
CREATE INDEX "organization_members_userId_idx" ON "organization_members"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "organization_members_organizationId_userId_key" ON "organization_members"("organizationId", "userId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_subjects" ADD CONSTRAINT "profile_subjects_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_subjects" ADD CONSTRAINT "profile_subjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_assessments" ADD CONSTRAINT "subject_assessments_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_assessment_results" ADD CONSTRAINT "subject_assessment_results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_assessment_results" ADD CONSTRAINT "subject_assessment_results_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "subject_assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_progress" ADD CONSTRAINT "module_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_progress" ADD CONSTRAINT "module_progress_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_progress" ADD CONSTRAINT "topic_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence_records" ADD CONSTRAINT "evidence_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_sessions" ADD CONSTRAINT "practice_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mistake_records" ADD CONSTRAINT "mistake_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_paths" ADD CONSTRAINT "learning_paths_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_paths" ADD CONSTRAINT "learning_paths_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learn_sessions" ADD CONSTRAINT "learn_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learn_sessions" ADD CONSTRAINT "learn_sessions_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "learn_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_assessment_results" ADD CONSTRAINT "final_assessment_results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_certificates" ADD CONSTRAINT "subject_certificates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_results" ADD CONSTRAINT "assessment_results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_results" ADD CONSTRAINT "assessment_results_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_profiles" ADD CONSTRAINT "coach_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_goals" ADD CONSTRAINT "learning_goals_coachProfileId_fkey" FOREIGN KEY ("coachProfileId") REFERENCES "coach_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_goals" ADD CONSTRAINT "learning_goals_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placement_assessments" ADD CONSTRAINT "placement_assessments_learningGoalId_fkey" FOREIGN KEY ("learningGoalId") REFERENCES "learning_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_attempts" ADD CONSTRAINT "assessment_attempts_placementAssessmentId_fkey" FOREIGN KEY ("placementAssessmentId") REFERENCES "placement_assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_attempts" ADD CONSTRAINT "assessment_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_estimates" ADD CONSTRAINT "learning_estimates_learningGoalId_fkey" FOREIGN KEY ("learningGoalId") REFERENCES "learning_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_commitments" ADD CONSTRAINT "study_commitments_learningGoalId_fkey" FOREIGN KEY ("learningGoalId") REFERENCES "learning_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_xp" ADD CONSTRAINT "weekly_xp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_analytics" ADD CONSTRAINT "learning_analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_profiles" ADD CONSTRAINT "learning_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_analytics" ADD CONSTRAINT "subject_analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_analytics" ADD CONSTRAINT "subject_analytics_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retention_metrics" ADD CONSTRAINT "retention_metrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retention_metrics" ADD CONSTRAINT "retention_metrics_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_schedules" ADD CONSTRAINT "review_schedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_schedules" ADD CONSTRAINT "review_schedules_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_attempts" ADD CONSTRAINT "review_attempts_reviewScheduleId_fkey" FOREIGN KEY ("reviewScheduleId") REFERENCES "review_schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_attempts" ADD CONSTRAINT "review_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_submissions" ADD CONSTRAINT "project_submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_submissions" ADD CONSTRAINT "project_submissions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_feedback" ADD CONSTRAINT "project_feedback_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "project_submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_retention" ADD CONSTRAINT "knowledge_retention_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_retention" ADD CONSTRAINT "knowledge_retention_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_sessions" ADD CONSTRAINT "study_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_sessions" ADD CONSTRAINT "study_sessions_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_metrics" ADD CONSTRAINT "performance_metrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_metrics" ADD CONSTRAINT "performance_metrics_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_insights" ADD CONSTRAINT "coach_insights_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_insights" ADD CONSTRAINT "coach_insights_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "yandex_usage_logs" ADD CONSTRAINT "yandex_usage_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_enrollments" ADD CONSTRAINT "roadmap_enrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_enrollments" ADD CONSTRAINT "roadmap_enrollments_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "roadmap_enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capstone_projects" ADD CONSTRAINT "capstone_projects_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capstone_submissions" ADD CONSTRAINT "capstone_submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capstone_submissions" ADD CONSTRAINT "capstone_submissions_capstoneId_fkey" FOREIGN KEY ("capstoneId") REFERENCES "capstone_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "roadmap_enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_profiles" ADD CONSTRAINT "career_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_readiness" ADD CONSTRAINT "job_readiness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "xp_transactions" ADD CONSTRAINT "xp_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_levels" ADD CONSTRAINT "user_levels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_streaks" ADD CONSTRAINT "study_streaks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_progress" ADD CONSTRAINT "challenge_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_progress" ADD CONSTRAINT "challenge_progress_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "learning_challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_profiles" ADD CONSTRAINT "social_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_events" ADD CONSTRAINT "client_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "push_subscriptions" ADD CONSTRAINT "push_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardian_links" ADD CONSTRAINT "guardian_links_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardian_links" ADD CONSTRAINT "guardian_links_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_notes" ADD CONSTRAINT "teacher_notes_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_notes" ADD CONSTRAINT "teacher_notes_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;


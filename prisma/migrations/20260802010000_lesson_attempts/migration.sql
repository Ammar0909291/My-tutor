-- P6.5 — canonical owner of lesson-scoped outcomes.
-- Additive: a new table plus its enum. No existing table is modified, so
-- existing lessons and progress rows are untouched.
CREATE TYPE "LessonAttemptStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

CREATE TABLE "lesson_attempts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectSlug" TEXT NOT NULL,
    "lessonKey" TEXT NOT NULL,
    "lessonTitle" TEXT,
    "status" "LessonAttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "durationSeconds" INTEGER,
    "conceptsMastered" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "conceptsNeedingReview" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "misconceptionsCorrected" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "teachingAttempts" INTEGER NOT NULL DEFAULT 0,
    "budgetExhaustions" INTEGER NOT NULL DEFAULT 0,
    "summaryEvidence" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "lesson_attempts_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "lesson_attempts_userId_subjectSlug_lessonKey_idx" ON "lesson_attempts"("userId", "subjectSlug", "lessonKey");
CREATE INDEX "lesson_attempts_userId_status_idx" ON "lesson_attempts"("userId", "status");

ALTER TABLE "lesson_attempts" ADD CONSTRAINT "lesson_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

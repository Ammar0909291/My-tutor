-- Coach onboarding interview (P5).
-- Additive and fully nullable: existing profiles keep working unchanged and
-- Tutor Max renders no adaptation block until the interview is completed.
-- Experience and subjects are NOT added here — they reuse the existing
-- profiles.currentLevel column and the profile_subjects table.
ALTER TABLE "profiles" ADD COLUMN "goalCategory" TEXT;
ALTER TABLE "profiles" ADD COLUMN "dailyStudyMinutes" INTEGER;
ALTER TABLE "profiles" ADD COLUMN "learningStyle" TEXT;
ALTER TABLE "profiles" ADD COLUMN "confidenceBaseline" TEXT;
ALTER TABLE "profiles" ADD COLUMN "coachCompletedAt" TIMESTAMP(3);

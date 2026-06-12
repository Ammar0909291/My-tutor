-- AlterTable: add chapterId for school chapter practice sessions (Sprint BM)
ALTER TABLE "practice_sessions" ADD COLUMN "chapterId" TEXT;
CREATE INDEX "practice_sessions_userId_chapterId_idx" ON "practice_sessions"("userId", "chapterId");

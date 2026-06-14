-- AlterTable: add kind for practice vs assessment sessions (Sprint BN)
ALTER TABLE "practice_sessions" ADD COLUMN "kind" TEXT NOT NULL DEFAULT 'practice';
CREATE INDEX "practice_sessions_userId_kind_idx" ON "practice_sessions"("userId", "kind");

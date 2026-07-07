-- CreateTable: in-session understanding-check tracking (Sprint BS)
CREATE TABLE "learning_checkpoints" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "subjectSlug" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "kgNodeId" TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "userResponse" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "hintUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "learning_checkpoints_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "learning_checkpoints_userId_subjectSlug_chapterId_idx" ON "learning_checkpoints"("userId", "subjectSlug", "chapterId");
CREATE INDEX "learning_checkpoints_userId_subjectSlug_createdAt_idx" ON "learning_checkpoints"("userId", "subjectSlug", "createdAt");

ALTER TABLE "learning_checkpoints" ADD CONSTRAINT "learning_checkpoints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

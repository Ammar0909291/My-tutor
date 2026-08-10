-- Visual Generation Outcome — the audit trail for runtime figure generation.
--
-- Additive only. Nothing on the teaching path reads this table, and no existing
-- table is altered, so applying it cannot change what any learner sees.

CREATE TABLE "visual_generation_outcome" (
    "id" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "conceptTitle" TEXT NOT NULL,
    "policy" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "served" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT,
    "cached" BOOLEAN NOT NULL DEFAULT false,
    "model" TEXT,
    "elapsedMs" INTEGER NOT NULL,
    "renderer" TEXT,
    "payload" JSONB,
    "assetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visual_generation_outcome_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "visual_generation_outcome_conceptId_createdAt_idx" ON "visual_generation_outcome"("conceptId", "createdAt");
CREATE INDEX "visual_generation_outcome_accepted_reason_idx" ON "visual_generation_outcome"("accepted", "reason");
CREATE INDEX "visual_generation_outcome_createdAt_idx" ON "visual_generation_outcome"("createdAt");

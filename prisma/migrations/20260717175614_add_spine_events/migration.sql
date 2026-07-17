-- CreateTable
CREATE TABLE "spine_events" (
    "eventId" TEXT NOT NULL,
    "seq" INTEGER NOT NULL,
    "learnerId" TEXT NOT NULL,
    "sessionId" TEXT,
    "turnId" TEXT,
    "type" TEXT NOT NULL,
    "schemaVersion" INTEGER NOT NULL DEFAULT 1,
    "payload" JSONB NOT NULL,
    "source" JSONB NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "packVersion" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spine_events_pkey" PRIMARY KEY ("eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "spine_events_idempotencyKey_key" ON "spine_events"("idempotencyKey");

-- CreateIndex
CREATE INDEX "spine_events_sessionId_idx" ON "spine_events"("sessionId");

-- CreateIndex
CREATE INDEX "spine_events_learnerId_type_idx" ON "spine_events"("learnerId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "spine_events_learnerId_seq_key" ON "spine_events"("learnerId", "seq");

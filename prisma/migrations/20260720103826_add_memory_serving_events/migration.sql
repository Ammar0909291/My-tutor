-- CreateTable
CREATE TABLE "memory_serving_events" (
    "id" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "subjectSlug" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "servingMode" TEXT,
    "confidence" DOUBLE PRECISION,
    "fallbackReason" TEXT NOT NULL,
    "assetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "memory_serving_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "memory_serving_events_conceptId_idx" ON "memory_serving_events"("conceptId");

-- CreateIndex
CREATE INDEX "memory_serving_events_subjectSlug_createdAt_idx" ON "memory_serving_events"("subjectSlug", "createdAt");

-- CreateIndex
CREATE INDEX "memory_serving_events_createdAt_idx" ON "memory_serving_events"("createdAt");

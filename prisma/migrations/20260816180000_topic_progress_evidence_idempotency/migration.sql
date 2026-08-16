-- Idempotency marker for the Library-mode graded-signal checkpoint.
--
-- Additive and nullable: existing rows keep every value they have, and NULL is
-- read by the guard as "no evidence event applied yet". No historical row is
-- rewritten or repaired by this migration.
ALTER TABLE "topic_progress" ADD COLUMN IF NOT EXISTS "lastEvidenceMessageId" TEXT;

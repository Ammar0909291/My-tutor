-- The figure a message actually displayed, persisted as IDENTITY (not payload).
--
-- Additive and nullable: every existing row keeps working unchanged, and an
-- assistant turn that showed no figure stores NULL. The payload is never
-- copied — restoreVisualSession() re-derives it deterministically through the
-- resolver and the same admission gate the live turn cleared, so restoring
-- history costs 0 LLM calls and 0 visual-generation calls.
ALTER TABLE "messages" ADD COLUMN "visualSession" JSONB;

-- LLM-DEPENDENCY INSTRUMENTATION — Phase 1 of the dependency-reduction plan.
--
-- The dependency audit could measure the aggregate (87.0% of assistant turns
-- served by an LLM, n=484 since 2026-08-12) but had to ESTIMATE every
-- per-path share, because the three values that explain WHY a turn needed a
-- model are computed on every turn and then thrown away into logs:
--
--   dispatchPlan.decision   — the teaching decision (12 types)
--   dispatchPlan.executor   — which executor ran (only 2 of 12 are LLM-free)
--   memoryFallbackReason    — why Explanation Memory did or did not serve
--
-- Log retention is shorter than the deploy age and there is no organic
-- traffic, so those values are unrecoverable after the fact. Persisting them
-- converts the audit's estimates into measurements. No new model call, no
-- teaching-behaviour change.
--
-- llmCallCount is a COUNT rather than a boolean on purpose: "provider"
-- already records WHICH driver answered, but not how many provider calls the
-- turn actually spent. The verifier-gate and definition-agreement REPAIR
-- calls are additional calls on the same turn, and they were the two paths
-- the audit had to leave explicitly unsized. A count measures them; a boolean
-- would hide them exactly as `provider` already does.
--
-- All four columns are additive and NULLABLE, matching the provider /
-- visualSession / lessonKey migrations before this one: every existing row
-- keeps working and simply carries no instrumentation, and the write path
-- degrades to a create WITHOUT these columns if a deploy has not applied them
-- yet. No backfill — historical rows are honestly unattributed rather than
-- retro-labelled with a decision nobody recorded.
ALTER TABLE "messages" ADD COLUMN "teachingDecision" TEXT;
ALTER TABLE "messages" ADD COLUMN "dispatchExecutor" TEXT;
ALTER TABLE "messages" ADD COLUMN "memoryFallbackReason" TEXT;
ALTER TABLE "messages" ADD COLUMN "llmCallCount" INTEGER;

-- The distribution query this exists to serve groups ASSISTANT rows by
-- executor over a recent window; without this the analysis scans the whole
-- table. Partial: USER rows never carry an executor.
CREATE INDEX "messages_dispatchExecutor_createdAt_idx"
  ON "messages"("dispatchExecutor", "createdAt")
  WHERE "dispatchExecutor" IS NOT NULL;

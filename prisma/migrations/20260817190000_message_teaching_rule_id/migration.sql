-- PHASE 8 — persist the decision engine's ruleId.
--
-- Phase 1 persisted teachingDecision, dispatchExecutor, memoryFallbackReason
-- and llmCallCount. Measuring against them showed the decision is the wrong
-- granularity for the question this programme is trying to answer.
--
-- ESCALATE_TO_LLM was 11 of the 17 `brain_decision` provider calls in
-- production, and it is reachable from seven different rules in
-- decisionEngine.ts. Two of them want opposite responses:
--
--   D4b-ANSWER-STUDENT-FIRST — the learner asked a question. The reply must
--     address what THEY actually said, so no authored asset can serve it.
--     Almost certainly permanently LLM-powered.
--   D8-LLM-FLOOR — the explicit catch-all: no deterministic rule fired.
--     Every turn here is a MISSING RULE, i.e. a candidate.
--
-- Collapsed into one decision label they are indistinguishable, so the largest
-- remaining bucket cannot be ranked. The engine already computes the ruleId
-- and already emits it to the in-process BrainEvent sink — it is simply never
-- persisted, and log retention is shorter than the deploy age, so it is
-- unrecoverable after the fact.
--
-- Additive and NULLABLE, matching every instrumentation migration before it.
-- Rows written before this deploy carry NULL and stay honestly unattributed;
-- there is NO backfill, because no ruleId was recorded for them and inventing
-- one would be a fabricated measurement. The write path degrades to a create
-- WITHOUT this column if a deploy has not applied it yet, so a lagging
-- migration can never fail a learner's turn.
--
-- No model call, no decision change, no teaching-behaviour change.
ALTER TABLE "messages" ADD COLUMN "teachingRuleId" TEXT;

-- The Phase 8 distribution query groups ASSISTANT rows by rule over a recent
-- window, exactly as the executor index already serves the executor query.
-- Partial: USER rows and pre-Phase-8 rows never carry a rule.
CREATE INDEX "messages_teachingRuleId_createdAt_idx"
  ON "messages"("teachingRuleId", "createdAt")
  WHERE "teachingRuleId" IS NOT NULL;

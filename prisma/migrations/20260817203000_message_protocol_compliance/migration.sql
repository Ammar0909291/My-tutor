-- PHASE 10 — make the Brain's mandatory promises observable.
--
-- Phase 9 root cause: D0b-CLOSING-PROTECT, D0c-FIRST-LESSON-PROTOCOL and
-- D0d-SESSION-OPENING-PROTOCOL each inject a MANDATORY instruction block, and
-- all three route to executor LLM_OPEN. checkBrainCompliance returned
-- compliant-by-construction for LLM_OPEN on the premise that open escalation
-- carries no structural directive — false for exactly these three.
--
-- Measured consequence (production, phys.mech.newtons-first-law): 8 D0b turns,
-- 7 carrying a question mark, introducing new scenarios the close block
-- forbids. Not one was flagged. The affect budget — the guarantee that most
-- distinguishes a tutor from an assistant — was advisory.
--
-- MEASUREMENT ONLY. No re-render, no second provider call, no replaced output.
-- A violating turn still reaches the learner exactly as it does today, because
-- an enforcement decision must follow an honest baseline, not precede it.
--
-- Two columns, not one, and violations are '+'-joined rather than collapsed:
-- Phase 6 showed what a shared bucket costs (`confidence_failed` was really the
-- already-read guard and pointed the next optimization at a working matcher).
--
-- Additive and NULLABLE, matching every instrumentation migration before it.
-- No backfill — pre-deploy rows were never checked, and inventing a verdict
-- would fabricate the very rate this exists to measure.
ALTER TABLE "messages" ADD COLUMN "teachingComplianceStatus" TEXT;
ALTER TABLE "messages" ADD COLUMN "teachingComplianceViolation" TEXT;

-- The Phase 10 query groups ASSISTANT rows by status over a recent window.
-- Partial: USER rows and pre-Phase-10 rows never carry a status.
CREATE INDEX "messages_teachingComplianceStatus_createdAt_idx"
  ON "messages"("teachingComplianceStatus", "createdAt")
  WHERE "teachingComplianceStatus" IS NOT NULL;

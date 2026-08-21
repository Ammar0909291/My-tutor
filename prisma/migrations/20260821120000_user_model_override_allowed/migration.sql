-- A/B provider certification gate (2026-08-21).
--
-- Adds one narrow, additive, default-false flag to the users table. It has
-- no effect on any learner by default. It exists so a specific throwaway
-- certification account, flagged TRUE directly via SQL (never through any
-- client-reachable code path), can request a non-default Groq model for a
-- controlled certification run — gated in code on BOTH this DB flag (read
-- from the authenticated server session) AND a dedicated request header
-- naming a valid Groq model. Neither condition alone does anything.
ALTER TABLE "users" ADD COLUMN "modelOverrideAllowed" BOOLEAN NOT NULL DEFAULT false;

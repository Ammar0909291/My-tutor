-- WP-4 (AH-2, AH-6, VH-8) — structural persistence carriers.
--
-- ADDITIVE ONLY. Four nullable columns on two existing tables. No table is
-- created, no column is dropped or retyped, no relation changes, no index
-- changes, no data is backfilled, and nothing writes these columns yet.
-- NULL means "not yet captured" for every one of them.

-- AH-2: Adaptation State Vector as per-learner-per-concept standing state.
-- Reuses the existing store (no new store, per the handoff). Json because the
-- ASV shape is owned by EOS C-32 and is not yet typed (producer: AH-1).
ALTER TABLE "concept_mastery_records" ADD COLUMN "adaptationState" JSONB;

-- VH-8: representation-dependence, three levels (producer: Phase 2 V6).
ALTER TABLE "concept_mastery_records" ADD COLUMN "representationDependence" TEXT;

-- AH-6: keep assisted and unassisted evidence distinguishable.
-- scaffoldLevel mirrors EOS_V2_RUNTIME_SPECIFICATION §3.4's scaffoldDial 0-4.
ALTER TABLE "evidence_events" ADD COLUMN "scaffoldLevel" INTEGER;
ALTER TABLE "evidence_events" ADD COLUMN "hintDebt" INTEGER;

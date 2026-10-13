-- R1 (Chemistry visual closure, 2026-10-09) — production repair for the unbalanced Hall-Héroult probe.
--
-- STATUS: PREPARED, NOT EXECUTED. Writing to production `probe_assets` is owner-confirm territory
-- (CLAUDE.md: "genuinely risky/hard-to-reverse actions ... anything affecting shared/production state").
-- The seed (src/lib/teaching/assets/chemistrySeedAssets.ts) is already corrected on `main`, but the
-- content bootstrap is CREATE-ONLY, so the edit never reaches the live row by itself.
--
-- WHAT WAS MEASURED (read-only SELECTs, 2026-10-09, project ywakxiqbevfuxsiwewnw):
--   probe_assets / asset_identity row  assetId 2fedea4e-06ea-4b80-806a-5ee3bb9b2931
--   conceptId chem.elect.industrial · canonicalSlug chem.elect.industrial:step_check:en:undergraduate
--   status ACTIVE · version 1 · contentHash h61f4a6ca
--   correctValue  "They are consumed: C + O²⁻ → CO₂ + 4e⁻"        <- unbalanced (O +1, charge +4 on the left)
--   choices[0].text contains the same equation
--   no other probe, no explanation_assets row and no visualization_cache row contains the string.
--
-- WHY THE FIX IS SAFE:
--   * contentHash is hashContent(stem) (teachingActionRepository.ts) and the STEM IS UNCHANGED, so the
--     hash, version, canonicalSlug and lineage stay valid — only `choices` and `correctValue` change.
--   * the replacement is the exact text now in the seed: C + 2O²⁻ → CO₂ + 4e⁻ (1 C, 2 O, charge −4 = 4e⁻).
--   * idempotent: the WHERE guard matches only the old form; a second run updates 0 rows.
--
-- RUN (single statement), then re-run the verification SELECT below:
UPDATE probe_assets
SET "correctValue" = replace("correctValue", 'C + O²⁻ → CO₂', 'C + 2O²⁻ → CO₂'),
    choices        = replace(choices::text, 'C + O²⁻ → CO₂', 'C + 2O²⁻ → CO₂')::jsonb
WHERE "assetId" = '2fedea4e-06ea-4b80-806a-5ee3bb9b2931'
  AND ("correctValue" LIKE '%C + O²⁻ → CO₂%' OR choices::text LIKE '%C + O²⁻ → CO₂%');

-- VERIFY (expect 0 old / 1 new):
SELECT count(*) FILTER (WHERE "correctValue" LIKE '%C + O²⁻ → CO₂%' OR choices::text LIKE '%C + O²⁻ → CO₂%') AS old_form,
       count(*) FILTER (WHERE "correctValue" LIKE '%C + 2O²⁻ → CO₂%' AND choices::text LIKE '%C + 2O²⁻ → CO₂%') AS new_form
FROM probe_assets
WHERE "assetId" = '2fedea4e-06ea-4b80-806a-5ee3bb9b2931';

-- ROLLBACK (only if ever needed): swap the two literals in the UPDATE above.

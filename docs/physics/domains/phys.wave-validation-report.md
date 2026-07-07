# Domain Validation Report — Waves & Oscillations (`phys.wave`)

Date: 2026-07-02
Verdict: **PASS**

## Check Results

| Check | Result |
|-------|--------|
| Concept Count | ✓ PASS (17 concepts) |
| Prerequisite Integrity | ✓ PASS (0 broken edges) |
| Unlocks Integrity | ✓ PASS (0 broken edges) |
| Duplicate Detection | ✓ PASS (0 duplicates) |
| Orphan Detection | ✓ PASS (0 orphans) |
| Broken Cross Links | ✓ PASS (0 broken cross-links) |
| Asset Completeness | ✓ PASS (17 assets complete, all status=draft) |
| Curriculum Completeness | ✓ PASS (1962 lines, all 17 concept IDs present) |
| Quality Audit | ✓ PASS (no placeholder/template text remaining) |
| Teaching Asset Schema (deep + provenance) | ✓ PASS (17/17) |
| Prerequisite Review Triggers | ✓ PASS (all 95 drafted assets use valid KG concept IDs) |
| Bloom Alignment (asset ↔ KG) | ✓ PASS (17/17 match) |
| KG Cycle Detection (whole subject) | ✓ PASS (0 cycles across 194 concepts) |
| Subject-wide Coverage | ✓ PASS (194/194 concepts have exactly 1 asset) |
| Regression (meas/mech/therm untouched) | ✓ PASS (8/8, 52/52, 18/18 still draft) |
| Physics KG unchanged | ✓ PASS (sha256 79d9b356… matches pinned value) |
| Mathematics / Educational Brain / other subjects unchanged | ✓ PASS (working tree touches docs/physics only) |

## Statistics

| Metric | Value |
|--------|-------|
| Domain | Waves & Oscillations (`phys.wave`) |
| Concepts (KG) | 17 |
| Assets authored | 17 |
| Assets status=draft | 17 |
| Assets status=placeholder (this domain) | 0 |
| Broken prerequisite edges | 0 |
| Broken cross-links | 0 |
| Orphan KG concepts | 0 |
| Stray assets | 0 |
| Placeholder content found | 0 |
| Chapter file | `docs/physics/chapters/wave.md` (1962 lines) |
| Authoring chunks | 5 (4+4+4+4+1, deterministic graph order) |

## Method Note

Validation executed with the documented Python equivalents of
`scripts/validate-teaching-assets.ts` (6 structural checks) plus the
domain-level report checks and regression checks (see
`docs/physics/CURRICULUM_PROGRESS.md` Workflow step 5), because
`node_modules` is unavailable in this container. Physics convention upheld:
`prerequisite_review_triggers` are strict KG concept IDs. Provenance
`source_references` are drawn deterministically from each concept's own KG
`references` field.

## Issues

None — all checks passed.

## Verdict

**PASS** — Domain `phys.wave` is validated and ready to commit.

# Domain Validation Report — Classical Mechanics (`phys.mech`)

Date: 2026-07-02
Verdict: **PASS**

## Check Results

| Check | Result |
|-------|--------|
| Concept Count | ✓ PASS (52 concepts) |
| Prerequisite Integrity | ✓ PASS (0 broken edges) |
| Unlocks Integrity | ✓ PASS (0 broken edges) |
| Duplicate Detection | ✓ PASS (0 duplicates) |
| Orphan Detection | ✓ PASS (0 orphans) |
| Broken Cross Links | ✓ PASS (0 broken cross-links) |
| Asset Completeness | ✓ PASS (52 assets complete, all status=draft) |
| Curriculum Completeness | ✓ PASS (5779 lines, all 52 concept IDs present) |
| Quality Audit | ✓ PASS (no placeholder/template text remaining) |
| Teaching Asset Schema (deep) | ✓ PASS (all 10 dimensions + provenance on all 52 assets) |
| Prerequisite Review Triggers | ✓ PASS (all triggers are valid KG concept IDs) |
| Bloom Alignment (asset ↔ KG) | ✓ PASS (52/52 match) |
| KG Cycle Detection (whole subject) | ✓ PASS (0 cycles across 194 concepts) |
| Subject-wide Coverage | ✓ PASS (194/194 concepts have exactly 1 asset) |
| Regression (phys.meas untouched) | ✓ PASS (8/8 still draft) |
| Physics KG unchanged | ✓ PASS (sha256 79d9b356… matches phys.meas manifest) |
| Mathematics / Educational Brain unchanged | ✓ PASS (working tree touches docs/physics only) |

## Statistics

| Metric | Value |
|--------|-------|
| Domain | Classical Mechanics (`phys.mech`) |
| Concepts (KG) | 52 |
| Assets authored | 52 |
| Assets status=draft | 52 |
| Assets status=placeholder (this domain) | 0 |
| Broken prerequisite edges | 0 |
| Broken cross-links | 0 |
| Orphan KG concepts | 0 |
| Stray assets | 0 |
| Placeholder content found | 0 |
| Chapter file | `docs/physics/chapters/mech.md` (5779 lines) |
| Authoring chunks | 13 × 4 concepts (deterministic graph order) |

## Method Note

Validation executed with the documented Python equivalents of
`scripts/validate-teaching-assets.ts` (6 structural checks) plus the
domain-level report checks (see `docs/physics/CURRICULUM_PROGRESS.md`
Workflow step 5), because `node_modules` is unavailable in this container.
Physics convention upheld: `prerequisite_review_triggers` are strict KG
concept IDs. Provenance `source_references` are drawn deterministically
from each concept's own KG `references` field.

## Issues

None — all checks passed.

## Verdict

**PASS** — Domain `phys.mech` is validated and ready to commit.

# Physics Curriculum Production — Progress Tracker

*Source of truth for all sessions. Do not rely on conversation memory.*

## Branch
`claude/physics-curriculum-production-2x8byo` (Physics production branch, based on
`claude/my-tutor-foundation-KDSUO` at `c24e40d`; Mathematics production continues
independently on the foundation branch — do NOT touch Mathematics from here.)

## Latest Commit (update after each domain)
_(set after commit — see git log for `docs/physics/`)_

## Knowledge Graph
| File | Concepts | Domains | Status |
|------|----------|---------|--------|
| `docs/physics/kg/graph.json` | 194 | 11 | v1.0.0, production (treated as FROZEN, read-only) |

**Do not modify `graph.json`.** The Physics KG was shipped at commit `c83bc8c`
(`feat(physics): 194-node Physics KG + adapter wired to Teaching Engine`).
Note: unlike the Mathematics KG, its `domains[]` entries use `{key, name, count}`
(no `domain_id`/`id_prefix`/`level_range`), so `scripts/prepare-domain-chunks.ts`
cannot be pointed at it unmodified — the Python-equivalent pipeline steps documented
below handle the lookup by `key`/prefix instead. Also note the KG ships with
`total_cross_links: 0` — cross-link authoring belongs to a future KG revision by the
Curriculum Production Pipeline, not to teaching-asset sessions.

## Teaching-Asset Production Status

| # | Domain | ID Prefix | Concepts | Asset Status | Chapter File | Notes |
|---|--------|-----------|----------|--------------|--------------|-------|
| 01 | Measurement & Units | phys.meas | 8 | draft ✓ | chapters/meas.md ✓ | Complete |
| 02 | Classical Mechanics | phys.mech | 52 | placeholder | — | **NEXT** |
| 03 | Thermodynamics | phys.therm | 18 | placeholder | — | Pending |
| 04 | Waves & Oscillations | phys.wave | 17 | placeholder | — | Pending |
| 05 | Optics | phys.opt | 15 | placeholder | — | Pending |
| 06 | Electromagnetism | phys.em | 35 | placeholder | — | Pending |
| 07 | Modern Physics | phys.mod | 15 | placeholder | — | Pending |
| 08 | Quantum Mechanics | phys.qm | 12 | placeholder | — | Pending |
| 09 | Special Relativity | phys.rel | 8 | placeholder | — | Pending |
| 10 | Statistical Mechanics | phys.stat | 8 | placeholder | — | Pending |
| 11 | Astrophysics | phys.astro | 6 | placeholder | — | Pending |

**Summary:** 1/11 domains complete · 8/194 assets drafted · 186/194 remaining

## Completed Concepts Per Domain

### phys.meas (8 concepts) — COMPLETE
All 8 concepts authored: units, scalars-vectors, dimensions, errors,
significant-figures, vector-addition, vector-products, unit-conversion

### phys.mech (52 concepts) — NOT STARTED
0/52 authored. First unfinished domain — start here next session.

## Workflow (Python-equivalent pipeline, mirrors Mathematics)

1. **Extract domain slice** — filter `graph.json` concepts by `phys.{prefix}.`
   (Python; the TS chunk-preparer expects the Mathematics domains[] schema).
2. **Author chunks** — `chunk-output-XX.json` files, each an array of
   `{concept_id, asset: {10 authorable fields}, chapter_extra: {vocabulary,
   teacher_notes, student_notes, common_mistakes, cross_topic_connections,
   revision_guidance}}`. Skip chunks whose outputs already exist.
3. **Deterministic merge** — single read-modify-write pass into
   `teaching-assets/assets.json`: replace the 10 authorable fields on matching
   `concept_id`, set `version: 1.1.0`, `status: draft`, attach `provenance`,
   update file `build_date`. Semantics of `scripts/merge-teaching-asset-batch.ts`.
4. **Deterministic assembly** — render `chapters/{prefix}.md` from chunks + KG
   (pure templating, template of `scripts/assemble-chapter-markdown.ts`, header
   reads "Physics Knowledge Graph domain").
5. **Validate** — Python equivalents of `scripts/validate-teaching-assets.ts`
   (6 structural checks) + the domain-level Mathematics report checks
   (count/prereq/unlocks/duplicates/orphans/cross-links/completeness/quality/
   cycle detection/deep schema/bloom alignment).
   **Physics convention:** `prerequisite_review_triggers` are strict KG concept
   IDs (the TS validator's check 6 requires this; Mathematics drafts used
   behavioral descriptions instead and would fail that check as written).
6. **Domain artifacts** — write `domains/phys.{prefix}-validation-report.md`,
   `-summary.md`, `-manifest.json` (with sha256 checksums).
7. **Update this file**, commit, push. One domain per session turn, then STOP.

## Build Verification Notes

- `node_modules` absent in this container (npm install blocked by network
  policy — same limitation as recorded in the Mathematics tracker). All
  pipeline steps therefore run as documented Python equivalents; results are
  deterministic and re-verifiable locally with the TS scripts after
  `npm install`.
- Local re-verification: `npx tsx scripts/validate-teaching-assets.ts physics`
  (expects exit 0 for drafted domains under the Physics trigger convention).

## Validation Status

| Check | Result |
|-------|--------|
| KG cycle detection (194 concepts) | PASS — 0 cycles |
| KG orphan audit (phys.meas) | PASS — 0 orphans |
| KG dependency integrity (phys.meas requires+unlocks) | PASS — 0 broken edges |
| Teaching asset schema (phys.meas, deep) | PASS |
| Prerequisite review triggers = valid KG IDs | PASS |
| Bloom alignment asset ↔ KG (phys.meas) | PASS |
| Chapter assembly (meas.md) | PASS — 888 lines |
| Subject-wide asset coverage | PASS — 194/194 |

## Session Resumption Checklist

1. `git fetch origin claude/physics-curriculum-production-2x8byo` and check out that branch
2. Read this file to determine the current domain and next unfinished chunk
3. Check `docs/physics/teaching-assets/assets.json` — domains with `status: draft` are complete
4. Check `docs/physics/chapters/` — present `.md` files are assembled and committed
5. Resume at the first domain where assets are still `placeholder`
6. Do NOT regenerate already-drafted assets
7. Do NOT modify `docs/physics/kg/graph.json`
8. Do NOT touch Mathematics, Chemistry, Biology, Computer Science, or the Educational Brain

## Next Planned Domain (after phys.meas)
**phys.mech** — Classical Mechanics · 52 concepts · largest Physics domain;
plan ~13 chunks of 4 concepts (or 7 of 8) and author across parallel agents
if session budget allows.

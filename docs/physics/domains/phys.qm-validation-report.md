# Domain Validation Report — Quantum Mechanics (`phys.qm`)

Date: 2026-07-03
Verdict: **PASS**

## Check Results

| Check | Result |
|-------|--------|
| Concept Count | ✓ PASS (12 concepts) |
| Prerequisite Integrity | ✓ PASS (0 broken edges) |
| Unlocks Integrity | ✓ PASS (0 broken edges) |
| Duplicate Detection | ✓ PASS (0 duplicates) |
| Orphan Detection | ✓ PASS (0 orphans) |
| Broken Cross Links | ✓ PASS (0 broken cross-links; KG ships `total_cross_links: 0`) |
| Asset Completeness | ✓ PASS (12 assets complete, all status=draft) |
| Curriculum Completeness | ✓ PASS (1370 lines, all 12 concept IDs present) |
| Quality Audit | ✓ PASS (no placeholder/template text remaining) |
| Teaching Asset Schema (deep + provenance) | ✓ PASS (12/12) |
| Prerequisite Review Triggers | ✓ PASS (all 172 drafted assets use valid KG concept IDs, exact match with KG `requires` edges) |
| Bloom Alignment (asset ↔ KG) | ✓ PASS (12/12) |
| KG Cycle Detection (whole subject) | ✓ PASS (0 cycles across 194 concepts) |
| Subject-wide Coverage | ✓ PASS (194/194 concepts have exactly 1 asset) |
| Regression (7 prior domains untouched) | ✓ PASS (8/8, 52/52, 18/18, 17/17, 15/15, 35/35, 15/15 still draft) |
| Physics KG unchanged | ✓ PASS (sha256 79d9b356… matches pinned value) |
| Mathematics / Educational Brain / other subjects unchanged | ✓ PASS (working tree touches docs/physics only) |

## Pedagogical Audit (≥20% gate)

Scope: **5 of 12 concepts fully audited (41.7%, exceeding the 20% requirement)**,
selected to span `phys.qm`'s difficulty range (KG distribution: 3 `advanced`,
8 `expert`, 1 `research` — the KG's single highest difficulty tier anywhere
in the Physics subject):

- `phys.qm.wave-function` (advanced — foundational)
- `phys.qm.schrodinger-equation` (expert — central governing equation)
- `phys.qm.particle-in-box` (expert — the domain's primary exactly-solved worked example)
- `phys.qm.pauli-exclusion` (advanced — conceptual, chemistry/astrophysics payoff)
- `phys.qm.selection-rules` (expert — domain capstone, closes the loop to atomic spectra)

Audited dimensions per concept: factual correctness, explanation quality,
prerequisite correctness (against the frozen KG), worked-example correctness
(every numeric value independently recomputed programmatically), misconception
quality, notation consistency, terminology consistency, and pedagogical flow.

| Audit item | Result |
|---|---|
| wave-function: worked example (normalization A, ⟨x⟩, ⟨x²⟩ for ψ=Ax(L−x)) | ✓ A²L⁵=30, ⟨x⟩=L/2, ⟨x²⟩=2L²/7 — all confirmed by independent numerical integration |
| wave-function: Born interpretation framing, 4 misconceptions, prerequisites | ✓ correct; KG edge `phys.mod.wave-particle-duality` verified |
| schrodinger-equation: worked example (TISE verification, E=π²ℏ²/2mL², |ψ|² time-independence) | ✓ φ''=−(π/L)²φ confirmed by direct differentiation; E≈1.51 eV for 0.50 nm well — all correct |
| schrodinger-equation: postulate-status framing, stationary-state explanation, 4 misconceptions, prerequisites | ✓ correct; KG edge `phys.qm.wave-function` verified |
| particle-in-box: worked example (E₁–E₄, 2→1 transition wavelength, node location, 1/L² scaling) | ✓ E₁≈1.51/E₂≈6.03/E₃≈13.6/E₄≈24.1 eV, λ≈274 nm, E₁'(10×L)≈0.0151 eV — all confirmed |
| particle-in-box: boundary-condition derivation, node-counting, 4 misconceptions, prerequisites | ✓ correct; KG edge `phys.qm.schrodinger-equation` verified |
| pauli-exclusion: worked example (orbital/subshell capacity, 4l+2 formula, aufbau reasoning) | ✓ 3p subshell=6, general formula 4l+2 verified against s:2/p:6/d:10/f:14 — all correct |
| pauli-exclusion: antisymmetric-wave-function origin, fermion/boson distinction, 4 misconceptions, prerequisites | ✓ correct; KG edge `phys.qm.spin` verified |
| selection-rules: worked example (Δl classification, photon energies for 4 transition pairs) | ✓ 3d→2p allowed (1.889 eV), 3s→2s forbidden, 4p→1s allowed (12.75 eV), 2s→1s forbidden — all confirmed |
| selection-rules: angular-momentum-conservation origin, 2s metastability, 4 misconceptions, prerequisites | ✓ correct; KG edges `phys.qm.operators`+`phys.qm.hydrogen-atom-qm` verified |

**Full-domain independent worked-example arithmetic recomputation (all 12
concepts, per this session's additional requirement to recompute EVERY
numerical worked example in the entire domain before commit):** every
worked-example numeric result across all 12 concepts was independently
recomputed in Python from stated inputs, including concepts outside the
5 fully audited above — **86 individual value checks** spanning wave
function normalization/expectation values, TISE verification, uncertainty-
principle confinement estimates (atomic and nuclear scale), operator
eigenvalue verification (momentum and kinetic-energy operators on a plane
wave, antisymmetry check on a real wave function), particle-in-a-box energy
levels and transitions, quantum harmonic oscillator levels and spacing,
hydrogen atom degeneracy counting, electron spin magnitude and orientations,
Pauli exclusion subshell capacities, quantum tunneling decay constant and
transmission coefficients (two barrier widths plus their ratio), first-order
perturbation theory (symmetry-based half-well shift, verified for n=1 and
n=2, and level-spacing invariance), and selection-rule photon energies.
**86/86 passed — 0 defects found in this domain.**

**Notation/terminology consistency scan:** grep-verified across the
assembled chapter — ℏ used consistently (98 occurrences); the particle-in-
box energy formula's two equivalent forms (n²π²ℏ²/2mL² and n²h²/8mL²) both
appear, deliberately, with their equivalence explicitly demonstrated in the
Schrödinger-equation concept's worked example; the `hc=1240 eV·nm` shortcut
used correctly in both concepts requiring a wavelength conversion
(particle-in-box, harmonic oscillator); "Schrödinger" spelled consistently
throughout (51 occurrences); "Stern-Gerlach" spelled consistently (21
occurrences); "Pauli Exclusion" appears capitalized only in the table of
contents/section header (2 occurrences, standard title-case convention
matching prior domains), with "Pauli exclusion" used in body prose (16
occurrences) — no inconsistency.

**Prerequisite correctness (all 12 concepts, not just the 5 audited):**
every asset's `prerequisite_review_triggers` matched the KG's `requires`
array exactly, verified programmatically — no drift, including for the
two concepts with dual prerequisites (`hydrogen-atom-qm`: requires
`schrodinger-equation`+`operators`; `perturbation-theory` and
`selection-rules`: both require `operators`+`hydrogen-atom-qm`).

**Audit verdict: PASS — 20 full-concept audit items + 86 arithmetic-sweep
checks + notation/terminology scan, zero defects found; no audit expansion
or correction required.**

## Statistics

| Metric | Value |
|--------|-------|
| Domain | Quantum Mechanics (`phys.qm`) |
| Concepts (KG) | 12 |
| Assets authored | 12 |
| Assets status=draft | 12 |
| Broken prerequisite edges / cross-links / orphans / strays | 0 |
| Chapter file | `docs/physics/chapters/qm.md` (1370 lines) |
| Authoring chunks | 3 (4+4+4, deterministic graph order) |

## Method Note

Validation executed with the documented Python equivalents of
`scripts/validate-teaching-assets.ts` (6 structural checks) plus the
domain-level report checks and regression checks (see
`docs/physics/CURRICULUM_PROGRESS.md` Workflow step 5), because
`node_modules` is unavailable in this container. Physics convention upheld:
`prerequisite_review_triggers` are strict KG concept IDs. Provenance
`source_references` are drawn deterministically from each concept's own KG
`references` field (all Griffiths *Introduction to Quantum Mechanics*
chapter citations, plus NCERT Physics Class 12 for uncertainty-principle
and Pauli-exclusion, matching the KG's own reference metadata exactly).
This session's quality gate additionally required independently
recomputing every numerical worked example in the entire domain before
commit (not just the audited subset) and revalidating after any
correction — 86 checks were run and all passed on first computation, so
no correction cycle was needed for `phys.qm` (contrast with the prior
`phys.mod` session, where an identical full-domain sweep caught and fixed
one genuine defect).

## Knowledge Graph Issues Discovered

None. No inconsistency, gap, or defect in `docs/physics/kg/graph.json` was
found during authoring or validation of `phys.qm`. The graph's structure
(12 concepts, prefix `phys.qm.`, `requires`/`unlocks` edges including one
edge into `phys.mod` and one forward unlock into `phys.stat`, `cross_links:
[]` throughout) was used exactly as shipped; no modification was made or
proposed.

## Issues

None — all checks and all audit items passed; no defects found or
corrections required.

## Verdict

**PASS** — Domain `phys.qm` is validated, pedagogically audited (41.7%
full-concept coverage plus a complete 86-check domain-wide arithmetic
recomputation), and ready to commit.

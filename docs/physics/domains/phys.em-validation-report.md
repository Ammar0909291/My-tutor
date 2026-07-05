# Domain Validation Report — Electromagnetism (`phys.em`)

Date: 2026-07-03
Verdict: **PASS**

## Check Results

| Check | Result |
|-------|--------|
| Concept Count | ✓ PASS (35 concepts) |
| Prerequisite Integrity | ✓ PASS (0 broken edges) |
| Unlocks Integrity | ✓ PASS (0 broken edges) |
| Duplicate Detection | ✓ PASS (0 duplicates) |
| Orphan Detection | ✓ PASS (0 orphans) |
| Broken Cross Links | ✓ PASS (0 broken cross-links; KG ships `total_cross_links: 0`) |
| Asset Completeness | ✓ PASS (35 assets complete, all status=draft) |
| Curriculum Completeness | ✓ PASS (3949 lines, all 35 concept IDs present) |
| Quality Audit | ✓ PASS (no placeholder/template text remaining) |
| Teaching Asset Schema (deep + provenance) | ✓ PASS (35/35) |
| Prerequisite Review Triggers | ✓ PASS (all 145 drafted assets use valid KG concept IDs) |
| Bloom Alignment (asset ↔ KG) | ✓ PASS (35/35 match) |
| KG Cycle Detection (whole subject) | ✓ PASS (0 cycles across 194 concepts) |
| Subject-wide Coverage | ✓ PASS (194/194 concepts have exactly 1 asset) |
| Regression (meas/mech/therm/wave/opt untouched) | ✓ PASS (8/8, 52/52, 18/18, 17/17, 15/15 still draft) |
| Physics KG unchanged | ✓ PASS (sha256 79d9b356… matches pinned value) |
| Mathematics / Educational Brain / other subjects unchanged | ✓ PASS (working tree touches docs/physics only) |

## Pedagogical Audit (expanded scope this session)

Scope: **10 of 35 concepts fully audited (28.6%, exceeding the 20% requirement)**,
selected to span all three difficulty bands present in `phys.em` (KG `difficulty`
field, used as the beginner/intermediate/advanced proxy):

- **Beginner (`developing`, 7 concepts in domain)** — `phys.em.electric-charge`,
  `phys.em.ohms-law`, `phys.em.magnetic-field`
- **Intermediate (`proficient`, 19 concepts in domain)** — `phys.em.gauss-law`,
  `phys.em.kirchhoffs-laws`, `phys.em.faradays-law`
- **Advanced (`advanced`/`expert`, 9 concepts in domain)** — `phys.em.biot-savart`,
  `phys.em.self-inductance`, `phys.em.maxwells-equations`,
  `phys.em.electromagnetic-waves`

Audited dimensions per concept (per this session's expanded quality gate):
factual correctness, explanation quality, prerequisite correctness (against
the frozen KG), worked-example correctness (every numeric value recomputed
programmatically), misconception quality, notation consistency, terminology
consistency, and pedagogical flow.

| Audit item | Result |
|---|---|
| electric-charge: worked example (electron count, induction sequence) | ✓ 3.0×10¹⁰ electrons, +4.8 nC on wool, sphere ends positive — all correct |
| electric-charge: facts, 4 misconceptions, prerequisites | ✓ correct (conservation/quantization stated accurately; KG edge `phys.meas.units` verified) |
| ohms-law: worked example (R, prediction, non-ohmic discrepancy) | ✓ 12 Ω, 0.75 A prediction, 12.9 Ω actual — all correct |
| ohms-law: definition-vs-law distinction, 4 misconceptions, prerequisites | ✓ correct (ohmic/non-ohmic distinction accurate; KG edges `electric-current`+`electric-potential` verified) |
| magnetic-field: worked example (B from straight wire, Earth-field ratio, inverse solve) | ✓ 1.2×10⁻⁴ T, ratio 2.4, r = 1.2 m — all correct |
| magnetic-field: field-line topology, 4 misconceptions, prerequisites | ✓ correct (no-monopole/closed-loop claims accurate; KG edge `electric-current` verified) |
| gauss-law: worked example (E inside/at surface/outside conductor, flux) | ✓ 0, 3.6×10⁶ N/C, 9.0×10⁵ N/C, flux 4.5×10⁵ N·m²/C — all correct |
| gauss-law: shell-theorem claims, 4 misconceptions, prerequisites | ✓ correct (conductor-equilibrium physics accurate; KG edge `electric-field` verified) |
| kirchhoffs-laws: worked example (two-loop system, signed solve) | ✓ I₁≈2.73 A, I₂≈−0.55 A, I₃≈2.18 A, loop-sum check closes — all correct |
| kirchhoffs-laws: sign-convention drill, 4 misconceptions, prerequisites | ✓ correct (KCL/KVL as conservation laws stated accurately; KG edge `dc-circuits` verified) |
| faradays-law: worked example (flux-rate EMF, motional EMF cross-check, lever-equivalence) | ✓ 6.0 V, 0.50 A, 0.10 C, motional 1.2 V (two derivations agree) — all correct |
| faradays-law: three-lever framing, 4 misconceptions, prerequisites | ✓ correct (change-not-value emphasis accurate; KG edge `magnetic-flux` verified) |
| biot-savart: worked example (loop-center B, loop/wire π-ratio, N-turn scaling, arc fraction) | ✓ 3.1×10⁻⁵ T, ratio π confirmed, 3.1×10⁻³ T (100 turns), 1.6×10⁻⁵ T (semicircle) — all correct |
| biot-savart: cross-product/axis-dead-zone claims, 4 misconceptions, prerequisites | ✓ correct (element-law structure accurate; KG edge `magnetic-force` verified) |
| self-inductance: worked example (L from solenoid geometry, LR growth/decay, energy) | ✓ L≈1.0 mH, τ=40 μs, I(1τ)=0.25 A, I_f=0.40 A, U=80 μJ, I(0.5τ)=0.24 A — all correct |
| self-inductance: LR/RC opposite-limit claims, 4 misconceptions, prerequisites | ✓ correct (t=0 break / t→∞ wire behavior accurate, correctly opposite to RC; KG edge `faradays-law` verified) |
| maxwells-equations: worked example (displacement current, conduction-current consistency, c derivation) | ✓ I_d≈35 mA, consistency argument correct, c≈3.00×10⁸ m/s matching light's speed — all correct |
| maxwells-equations: four-equation statements, 4 misconceptions, prerequisites | ✓ correct (Gauss-E/Gauss-B/Faraday/Ampère-Maxwell physics accurate; all 3 KG edges `gauss-law`+`amperes-law`+`faradays-law` verified) |
| electromagnetic-waves: worked example (c=fλ across bands, photon-energy ranking, inverse-square intensity) | ✓ λ=3.00 m and 12.2 cm, f_red≈4.29×10¹⁴ Hz, E≈2.84×10⁻¹⁹ J, I≈2.0×10⁻¹⁴ W/m² — all correct |
| electromagnetic-waves: spectrum ordering, same-speed claim, 4 misconceptions, prerequisites | ✓ correct (transverse/in-phase/medium-free structure accurate; KG edge `maxwells-equations` verified) |

**Full-domain worked-example arithmetic sweep (all 35 concepts, not just the
10 fully audited):** every worked-example numeric result across the entire
domain was independently recomputed in Python from the stated inputs — 108
individual value checks spanning electrostatics (charge, Coulomb's law,
field, dipole, Gauss, potential, capacitance, dielectrics), circuits
(energy-capacitor, current, Ohm's law, resistivity, series/parallel, EMF, RC),
magnetism (field, force, Biot–Savart, Ampère, solenoid), induction (flux,
Faraday, self-/mutual-inductance), and AC/waves (AC RMS, LC resonance,
Maxwell's equations, EM waves). **108/108 passed** (one value — RC energy
20.25 mJ stated as "≈ 20 mJ" — is correct 2-significant-figure rounding, not
a defect).

**Notation/terminology consistency scan:** grep-verified across the assembled
chapter — Coulomb constant consistently `k ≈ 9.0 × 10⁹ N·m²/C²`; `μ₀` (107
occurrences) and `ε₀` (65 occurrences) used consistently throughout; "EMF"
capitalized consistently in prose (8 lowercase instances are all embedded
`phys.em.emf` concept-ID references, not prose); "Faraday's law"/"Lenz's law"
lowercase in prose vs. title-case only in section headers (standard style,
matches `phys.opt` precedent); iron Curie temperature consistently 770 °C;
speed of light consistently 3.00 × 10⁸ m/s. One cosmetic KG-vs-authored-prose
spelling split noted and accepted, not fixed: the frozen KG's own `name`/
`description` strings for `phys.em.amperes-law` spell "Ampere" (no accent,
3 occurrences, KG source text — not modifiable), while all authored prose
in this domain consistently uses "Ampère" (with accent) — not a defect, as
the KG content is frozen and out of scope.

**Prerequisite correctness (10 audited concepts):** in every case the
asset's `prerequisite_review_triggers` matched the KG's `requires` array
exactly (verified programmatically) — no drift between the pedagogical
review triggers and the graph's actual dependency edges.

**Audit verdict: PASS — 20 full-concept audit items + 108 arithmetic-sweep
checks + notation/terminology scan, zero defects found; no audit expansion
required.**

## Statistics

| Metric | Value |
|--------|-------|
| Domain | Electromagnetism (`phys.em`) |
| Concepts (KG) | 35 |
| Assets authored | 35 |
| Assets status=draft | 35 |
| Broken prerequisite edges / cross-links / orphans / strays | 0 |
| Chapter file | `docs/physics/chapters/em.md` (3949 lines) |
| Authoring chunks | 9 (4+4+4+4+4+4+4+4+3, deterministic graph order) |

## Method Note

Validation executed with the documented Python equivalents of
`scripts/validate-teaching-assets.ts` (6 structural checks) plus the
domain-level report checks and regression checks (see
`docs/physics/CURRICULUM_PROGRESS.md` Workflow step 5), because
`node_modules` is unavailable in this container. Physics convention upheld:
`prerequisite_review_triggers` are strict KG concept IDs. Provenance
`source_references` are drawn deterministically from each concept's own KG
`references` field. This session's quality gate was expanded from the
`phys.opt` precedent (10% audit) to 20% minimum with explicit
beginner/intermediate/advanced band coverage and the additional
notation-consistency, terminology-consistency, and pedagogical-flow
dimensions — the audit exceeded the requirement at 28.6% full-concept
coverage.

## Knowledge Graph Issues Discovered

None. No inconsistency, gap, or defect in `docs/physics/kg/graph.json` was
found during authoring or validation of `phys.em`. The graph's structure
(35 concepts, prefix `phys.em.`, `requires`/`unlocks` edges, `cross_links: []`
throughout) was used exactly as shipped; no modification was made or
proposed.

## Issues

None — all checks and all audit items passed.

## Verdict

**PASS** — Domain `phys.em` is validated, pedagogically audited (expanded
20%+ gate), and ready to commit.

# Physics Curriculum Production — Progress Tracker

*Source of truth for all sessions. Do not rely on conversation memory.*

## Branch
`claude/my-tutor-foundation-KDSUO` — the ONLY canonical working branch as of
2026-07-02. The temporary isolation branch `claude/physics-curriculum-production-2x8byo`
(used for domain 01 only) was fast-forward merged into the foundation branch at
`ec87189` and must not receive further development. Mathematics production continues
independently on this same foundation branch — do NOT touch Mathematics files.

## Latest Commit (update after each domain)
`PENDING` — feat(physics): author Statistical Mechanics domain (phys.stat, 8 concepts)

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
KG sha256 (must stay constant): `79d9b356f14ea65f3df270da8063c3b1e4c1da1b11255887406022c3a755117f`.

## Teaching-Asset Production Status

| # | Domain | ID Prefix | Concepts | Asset Status | Chapter File | Notes |
|---|--------|-----------|----------|--------------|--------------|-------|
| 01 | Measurement & Units | phys.meas | 8 | draft ✓ | chapters/meas.md ✓ | Complete |
| 02 | Classical Mechanics | phys.mech | 52 | draft ✓ | chapters/mech.md ✓ | Complete |
| 03 | Thermodynamics | phys.therm | 18 | draft ✓ | chapters/therm.md ✓ | Complete |
| 04 | Waves & Oscillations | phys.wave | 17 | draft ✓ | chapters/wave.md ✓ | Complete |
| 05 | Optics | phys.opt | 15 | draft ✓ | chapters/opt.md ✓ | Complete |
| 06 | Electromagnetism | phys.em | 35 | draft ✓ | chapters/em.md ✓ | Complete |
| 07 | Modern Physics | phys.mod | 15 | draft ✓ | chapters/mod.md ✓ | Complete |
| 08 | Quantum Mechanics | phys.qm | 12 | draft ✓ | chapters/qm.md ✓ | Complete |
| 09 | Special Relativity | phys.rel | 8 | draft ✓ | chapters/rel.md ✓ | Complete |
| 10 | Statistical Mechanics | phys.stat | 8 | draft ✓ | chapters/stat.md ✓ | Complete |
| 11 | Astrophysics | phys.astro | 6 | placeholder | — | **NEXT** |

**Summary:** 10/11 domains complete · 188/194 assets drafted · 6/194 remaining (96.9%)

## Completed Concepts Per Domain

### phys.meas (8 concepts) — COMPLETE
All 8 concepts authored: units, scalars-vectors, dimensions, errors,
significant-figures, vector-addition, vector-products, unit-conversion

### phys.mech (52 concepts) — COMPLETE
All 52 concepts authored: displacement, velocity, acceleration, kinematics-1d,
kinematics-2d, projectile-motion, relative-motion, circular-motion, force,
newtons-first-law, newtons-second-law, newtons-third-law, free-body-diagram,
friction, tension, normal-force, inclined-plane, work, kinetic-energy,
potential-energy, work-energy-theorem, conservation-of-energy, power,
conservative-forces, momentum, impulse, conservation-of-momentum,
collisions-elastic, collisions-inelastic, center-of-mass, angular-kinematics,
torque, moment-of-inertia, rotational-dynamics, angular-momentum,
conservation-of-angular-momentum, rolling-motion, equilibrium,
universal-gravitation, gravitational-field, gravitational-potential,
orbital-mechanics, keplers-laws, escape-velocity, satellites, hookes-law,
stress-strain, pressure-fluids, buoyancy, bernoulli, surface-tension, viscosity
(13 chunks × 4 concepts, deterministic graph order.)

### phys.therm (18 concepts) — COMPLETE
All 18 concepts authored: temperature, zeroth-law, thermal-expansion,
heat-transfer, specific-heat, calorimetry, phase-transitions, ideal-gas-law,
kinetic-theory, first-law, internal-energy, thermodynamic-processes,
second-law, entropy, heat-engines, carnot-cycle, refrigerators, third-law
(5 chunks: 4+4+4+4+2, deterministic graph order.)

### phys.wave (17 concepts) — COMPLETE
All 17 concepts authored: shm, shm-energy, pendulum, spring-mass,
damped-oscillations, forced-oscillations, wave-properties, transverse-waves,
longitudinal-waves, wave-speed, superposition, interference, standing-waves,
sound-waves, sound-intensity, doppler-effect, beats
(5 chunks: 4+4+4+4+1, deterministic graph order.)

### phys.opt (15 concepts) — COMPLETE
All 15 concepts authored: nature-of-light, reflection, mirrors, refraction,
total-internal-reflection, lenses, lens-power, optical-instruments,
dispersion, wave-optics, youngs-experiment, diffraction, single-slit,
polarization, brewsters-law
(4 chunks: 4+4+4+3, deterministic graph order. Pedagogical audit: 3/15
concepts fully audited (20%) + all-concept worked-example arithmetic
sweep — PASS, 0 defects; see phys.opt-validation-report.md.)

### phys.em (35 concepts) — COMPLETE
All 35 concepts authored: electric-charge, coulombs-law, electric-field,
electric-dipole, gauss-law, electric-potential, capacitance, dielectrics,
energy-capacitor, electric-current, ohms-law, resistivity, dc-circuits,
kirchhoffs-laws, wheatstone-bridge, potentiometer, electrical-power, emf,
rc-circuits, magnetic-field, magnetic-force, biot-savart, amperes-law,
solenoid, magnetic-materials, magnetic-dipole, magnetic-flux, faradays-law,
lenzs-law, self-inductance, mutual-inductance, ac-basics, lc-circuits,
maxwells-equations, electromagnetic-waves
(9 chunks: 4+4+4+4+4+4+4+4+3, deterministic graph order. Pedagogical audit:
10/35 concepts fully audited (28.6%) across beginner/intermediate/advanced
difficulty bands + full-domain worked-example arithmetic sweep (108 checks)
— PASS, 0 defects; see phys.em-validation-report.md.)

### phys.mod (15 concepts) — COMPLETE
All 15 concepts authored: photoelectric-effect, photons, compton-effect,
de-broglie, wave-particle-duality, bohr-model, atomic-spectra, x-rays,
radioactivity, radioactive-decay, nuclear-reactions, binding-energy,
nuclear-fission, nuclear-fusion, nuclear-models
(4 chunks: 4+4+4+3, deterministic graph order. Pedagogical audit: 7/15
concepts fully audited (46.7%) across beginner/intermediate/advanced
difficulty bands + full-domain worked-example arithmetic sweep (65 checks;
1 defect found in the nuclear-fusion energy-density comparison — a 10,000x
vs. correct 100,000x ratio — found and fixed before commit) — PASS, 0
defects remaining; see phys.mod-validation-report.md.)

### phys.qm (12 concepts) — COMPLETE
All 12 concepts authored: wave-function, schrodinger-equation,
uncertainty-principle, operators, particle-in-box, harmonic-oscillator-qm,
hydrogen-atom-qm, spin, pauli-exclusion, quantum-tunneling,
perturbation-theory, selection-rules
(3 chunks: 4+4+4, deterministic graph order. Pedagogical audit: 5/12
concepts fully audited (41.7%) spanning advanced/expert/research difficulty
tiers + full-domain worked-example arithmetic recomputation (86 checks,
every numeric value in the domain independently recomputed before commit
per this session's expanded requirement) — PASS, 0 defects found; see
phys.qm-validation-report.md.)

### phys.rel (8 concepts) — COMPLETE
All 8 concepts authored: postulates, simultaneity, time-dilation,
length-contraction, lorentz-transform, relativistic-momentum, mass-energy,
spacetime
(2 chunks: 4+4, deterministic graph order — a linear dependency chain.
Pedagogical audit: 4/8 concepts fully audited (50%) spanning
proficient/advanced/expert difficulty tiers + full-domain worked-example
arithmetic recomputation (31 checks, every numeric value in the domain
independently recomputed before commit per this session's requirement) —
PASS, 0 defects found; see phys.rel-validation-report.md.)

### phys.stat (8 concepts) — COMPLETE
All 8 concepts authored: probability-basics, boltzmann-factor,
partition-function, maxwell-boltzmann, fermi-dirac, bose-einstein,
entropy-statistical, free-energy
(2 chunks: 4+4, deterministic graph order — a hub-and-spoke dependency
graph radiating from partition-function. Pedagogical audit: 4/8 concepts
fully audited (50%) spanning advanced/expert difficulty tiers +
full-domain worked-example arithmetic recomputation (30 checks, every
numeric value in the domain independently recomputed before commit per
this session's requirement) — PASS, 0 arithmetic defects found. One
non-arithmetic Unicode text-encoding corruption was found and fixed
during authoring, before validation or commit; see
phys.stat-validation-report.md.)

### phys.astro (6 concepts) — NOT STARTED
0/6 authored. First unfinished domain — start here next session.

## Workflow (Python-equivalent pipeline, mirrors Mathematics)

1. **Extract domain slice** — filter `graph.json` concepts by `phys.{prefix}.`
   (Python; the TS chunk-preparer expects the Mathematics domains[] schema).
2. **Author chunks** — `chunk-output-XX.json` files, each an array of
   `{concept_id, asset: {10 authorable fields}, chapter_extra: {vocabulary,
   teacher_notes, student_notes, common_mistakes, cross_topic_connections,
   revision_guidance}}`. Skip chunks whose outputs already exist.
3. **Deterministic merge** — single read-modify-write pass into
   `teaching-assets/assets.json`: replace the 10 authorable fields on matching
   `concept_id`, set `version: 1.1.0`, `status: draft`, attach `provenance`
   (with `source_references` drawn from the concept's own KG `references`),
   update file `build_date`. Semantics of `scripts/merge-teaching-asset-batch.ts`.
4. **Deterministic assembly** — render `chapters/{prefix}.md` from chunks + KG
   (pure templating, template of `scripts/assemble-chapter-markdown.ts`, header
   reads "Physics Knowledge Graph domain").
5. **Validate** — Python equivalents of `scripts/validate-teaching-assets.ts`
   (6 structural checks) + the domain-level Mathematics report checks
   (count/prereq/unlocks/duplicates/orphans/cross-links/completeness/quality/
   cycle detection/deep schema/bloom alignment) + regression checks that
   previously drafted domains and the KG sha256 are untouched.
   **Physics convention:** `prerequisite_review_triggers` are strict KG concept
   IDs (the TS validator's check 6 requires this; Mathematics drafts used
   behavioral descriptions instead and would fail that check as written).
6. **Domain artifacts** — write `domains/phys.{prefix}-validation-report.md`,
   `-summary.md`, `-manifest.json` (with sha256 checksums).
7. **Update this file**, commit, push to `claude/my-tutor-foundation-KDSUO`.
   One domain per session turn, then STOP.

## Build Verification Notes

- `node_modules` absent in this container (npm install blocked by network
  policy — same limitation as recorded in the Mathematics tracker). All
  pipeline steps therefore run as documented Python equivalents; results are
  deterministic and re-verifiable locally with the TS scripts after
  `npm install`.
- Local re-verification: `npx tsx scripts/validate-teaching-assets.ts physics`
  (expects exit 0 for drafted domains under the Physics trigger convention).

## Validation Status (latest domain: phys.stat)

| Check | Result |
|-------|--------|
| KG cycle detection (194 concepts) | PASS — 0 cycles |
| KG orphan audit (phys.stat) | PASS — 0 orphans |
| KG dependency integrity (phys.stat requires+unlocks) | PASS — 0 broken edges |
| Teaching asset schema (phys.stat, deep + provenance) | PASS — 8/8 |
| Prerequisite review triggers = valid KG IDs (all 188 drafted) | PASS |
| Bloom alignment asset ↔ KG (phys.stat) | PASS — 8/8 |
| Chapter assembly (stat.md) | PASS — 913 lines |
| Subject-wide asset coverage | PASS — 194/194 |
| Regression: meas + mech + therm + wave + opt + em + mod + qm + rel untouched | PASS — 8/8, 52/52, 18/18, 17/17, 15/15, 35/35, 15/15, 12/12, 8/8 draft |
| Physics KG sha256 unchanged | PASS |
| Mathematics / Educational Brain untouched | PASS — diff confined to docs/physics |
| Pedagogical audit (4 concepts + full-domain arithmetic recomputation) | PASS — 16 audit items + 30 arithmetic checks, 0 arithmetic defects (1 non-arithmetic text-encoding defect found and fixed pre-commit during authoring) |

## Session Resumption Checklist

1. `git fetch origin claude/my-tutor-foundation-KDSUO` and check out that branch
2. Read this file to determine the current domain and next unfinished chunk
3. Check `docs/physics/teaching-assets/assets.json` — domains with `status: draft` are complete
4. Check `docs/physics/chapters/` — present `.md` files are assembled and committed
5. Resume at the first domain where assets are still `placeholder`
6. Do NOT regenerate already-drafted assets
7. Do NOT modify `docs/physics/kg/graph.json`
8. Do NOT touch Mathematics, Chemistry, Biology, Computer Science, or the Educational Brain
9. Push ONLY to `claude/my-tutor-foundation-KDSUO`

## Next Planned Domain (after phys.stat)
**phys.astro** — Astrophysics · 6 concepts. Final Physics domain — after this,
all 194/194 Physics concepts will be complete.

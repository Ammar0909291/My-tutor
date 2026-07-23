# Authoring Queue — Permanent Order

Computed purely from the prerequisite graph — no manual ordering. Every
concept already `READY` (has an Educational Brain entry) is excluded from
this queue; everything else is ordered by two rules only:

1. **Dependency level** (topological depth from that subject's root(s),
   computed by Kahn's algorithm over the `requires` DAG): a concept can
   never appear before every one of its prerequisites.
2. **Subject interleaving**: at each dependency level, subjects are
   processed in a fixed order — mathematics, physics, english, chemistry,
   biology, computer_science (the order `COVERAGE.md`'s table already
   uses) — rather than fully draining one subject before starting the
   next. This directly implements Phase 4's "find unfinished root
   concepts; if none remain, unlock the next dependency layer" rule at
   global scale, and generalizes `ROADMAP.md`'s prior recommendation
   (entry points across all subjects before going deep in any one).
3. **Within the same subject and level**: KG file order (the order
   concepts already appear in that subject's `graph.json`, itself
   authored in roughly domain/prerequisite order by the Curriculum
   Production Pipeline) — the one remaining tie-break, deterministic and
   reproducible, not a preference.

Total queued: **1524** (= 1,775 KG concepts − 251 already `READY`).

**Domain Certification Mode override (binding until `math.found` reaches
82/82, EXPLICITLY SUSPENDED for physics-specific batches by direct user
instruction — see note below)**: the global graph-derived order below is
otherwise superseded at the top by the standing single-domain constraint
— `math.found`'s own 51 remaining concepts (Wave 6 onward) must be
authored to completion before any other subject or domain is started,
regardless of where those 51 concepts fall in the global order shown
here. Wave 6 (5 concepts, level 6 — prerequisites satisfied by Wave 5):
`math.found.logical-equivalence`, `math.found.ordinal-number`,
`math.found.quantifiers`, `math.found.relation`, `math.found.subset`. See
`ROADMAP.md` §3/§5 for the authoritative domain-status tracker; this
file's row order remains the correct reference for cross-domain priority
ONLY once `math.found` is complete and certified.

**Physics Wave 6 exception (2026-07-22)**: a direct, explicit user
instruction ("continue authoring the remaining Educational Brain
concepts [for physics] in strict prerequisite/topological order")
directed work specifically at the physics subject for this batch,
overriding the math.found-first default above for this one batch only.
`math.found` was NOT touched (still 31/82, still IN PROGRESS) and remains
the standing default priority for any future batch that is not given an
equally explicit subject-specific instruction. This batch authored all
12 physics concepts at dependency level 6 (the full level, not a partial
slice) — `phys.mech.universal-gravitation`, `phys.mech.hookes-law`,
`phys.mech.pressure-fluids`, `phys.wave.standing-waves`, `phys.wave.beats`,
`phys.opt.optical-instruments`, `phys.opt.youngs-experiment`,
`phys.em.capacitance`, `phys.em.ohms-law`, `phys.em.amperes-law`,
`phys.em.lenzs-law`, `phys.em.self-inductance` — verified programmatically
against the live physics KG's `requires` edges (all had every prerequisite
already `READY`), removed from the rows below, and priority numbers
renumbered accordingly (1673 → 1661 remaining).

**Physics Wave 7 (2026-07-23)**: continuing the same explicit physics-specific
override (mandatory rules issued directly for continued Physics Educational
Brain production), authored all 25 physics concepts at dependency level 7
(the full level, not a partial slice) — `phys.mech.friction`,
`phys.mech.tension`, `phys.mech.normal-force`, `phys.mech.kinetic-energy`,
`phys.mech.potential-energy`, `phys.mech.power`, `phys.mech.impulse`,
`phys.mech.center-of-mass`, `phys.mech.angular-kinematics`,
`phys.mech.gravitational-field`, `phys.mech.stress-strain`,
`phys.mech.buoyancy`, `phys.mech.surface-tension`, `phys.therm.first-law`,
`phys.wave.shm`, `phys.opt.diffraction`, `phys.em.dielectrics`,
`phys.em.energy-capacitor`, `phys.em.resistivity`, `phys.em.dc-circuits`,
`phys.em.electrical-power`, `phys.em.solenoid`, `phys.em.mutual-inductance`,
`phys.em.ac-basics`, `phys.em.maxwells-equations` — verified programmatically
against the live physics KG's `requires` edges via an independent Kahn's-
algorithm recomputation (matched the stored level-7 row set exactly, zero
discrepancy), removed from the rows below, and priority numbers renumbered
accordingly (1661 → 1636 remaining). `math.found` remains untouched at
31/82 per the standing default. Physics EB now 104/238 (79 existing + 25
this wave); next unlocked wave is dependency level 8 (15 concepts).

**Physics Wave 8 (2026-07-23)**: continuing the same mandatory-rules
production cycle, authored all 15 physics concepts at dependency level 8
(the full level, not a partial slice) — `phys.mech.inclined-plane`,
`phys.mech.work-energy-theorem`, `phys.mech.conservation-of-energy`,
`phys.mech.conservation-of-momentum`, `phys.mech.torque`,
`phys.mech.gravitational-potential`, `phys.therm.thermodynamic-processes`,
`phys.wave.shm-energy`, `phys.wave.pendulum`, `phys.wave.spring-mass`,
`phys.opt.single-slit`, `phys.em.kirchhoffs-laws`, `phys.em.emf`,
`phys.em.lc-circuits`, `phys.em.electromagnetic-waves` — verified
programmatically against the live physics KG's `requires` edges via an
independent Kahn's-algorithm recomputation (matched the stored level-8
row set exactly, zero discrepancy), removed from the rows below, and
priority numbers renumbered accordingly (1636 → 1621 remaining).
`math.found` remains untouched at 31/82. Physics EB now 119/238 (104
existing + 15 this wave); next unlocked wave is dependency level 9 (16
concepts).

**Physics Wave 9 (2026-07-23)**: continuing the same mandatory-rules
production cycle, authored all 16 physics concepts at dependency level 9
(the full level, not a partial slice) — `phys.mech.conservative-forces`,
`phys.mech.collisions-elastic`, `phys.mech.collisions-inelastic`,
`phys.mech.moment-of-inertia`, `phys.mech.equilibrium`,
`phys.mech.orbital-mechanics`, `phys.mech.escape-velocity`,
`phys.mech.bernoulli`, `phys.therm.second-law`, `phys.therm.heat-engines`,
`phys.wave.damped-oscillations`, `phys.em.wheatstone-bridge`,
`phys.em.potentiometer`, `phys.em.rc-circuits`,
`phys.mod.photoelectric-effect`, `phys.rel.postulates` — verified
programmatically against the live physics KG's `requires` edges via an
independent Kahn's-algorithm recomputation (matched the stored level-9
row set exactly, zero discrepancy), removed from the rows below, and
priority numbers renumbered accordingly (1621 → 1605 remaining).
`math.found` remains untouched at 31/82. Physics EB now 135/238 (119
existing + 16 this wave); next unlocked wave is dependency level 10 (9
concepts). This wave included the entry points into two new physics
domains for this program: Modern Physics
(`phys.mod.photoelectric-effect`) and Relativity (`phys.rel.postulates`).

**Physics Wave 10 (2026-07-23)**: continuing the same mandatory-rules
production cycle, authored all 9 physics concepts at dependency level 10
(the full level, not a partial slice) — `phys.mech.rotational-dynamics`,
`phys.mech.keplers-laws`, `phys.mech.satellites`, `phys.mech.viscosity`,
`phys.mech.generalized-coordinates`, `phys.therm.entropy`,
`phys.wave.forced-oscillations`, `phys.mod.photons`,
`phys.rel.simultaneity` — verified programmatically against the live
physics KG's `requires` edges via an independent Kahn's-algorithm
recomputation (matched the stored level-10 row set exactly, zero
discrepancy), removed from the rows below, and priority numbers
renumbered accordingly (1605 → 1596 remaining). `math.found` remains
untouched at 31/82. Physics EB now 144/238 (135 existing + 9 this wave);
next unlocked wave is dependency level 11 (11 concepts).

**Physics Wave 11 (2026-07-23)**: continuing the same mandatory-rules
production cycle, authored all 11 physics concepts at dependency level 11
(the full level, not a partial slice) — `phys.mech.angular-momentum`,
`phys.mech.rolling-motion`, `phys.mech.euler-lagrange-equation`,
`phys.therm.carnot-cycle`, `phys.therm.third-law`,
`phys.mod.compton-effect`, `phys.mod.de-broglie`, `phys.mod.bohr-model`,
`phys.mod.x-rays`, `phys.rel.time-dilation`,
`phys.stat.probability-basics` — verified programmatically against the
live physics KG's `requires` edges via an independent Kahn's-algorithm
recomputation (matched the stored level-11 row set exactly, zero
discrepancy), removed from the rows below, and priority numbers
renumbered accordingly (1596 → 1585 remaining). `math.found` remains
untouched at 31/82. Physics EB now 155/238 (144 existing + 11 this
wave); next unlocked wave is dependency level 12 (8 concepts). This
wave included the first Statistical Mechanics domain entry for this
program (`phys.stat.probability-basics`).

**Physics Wave 12 (2026-07-23)**: continuing the same mandatory-rules
production cycle, authored all 8 physics concepts at dependency level 12
(the full level, not a partial slice) — `phys.mech.conservation-of-angular-momentum`,
`phys.mech.cyclic-coordinates-conservation-laws`, `phys.mech.hamiltonian`,
`phys.therm.refrigerators`, `phys.mod.wave-particle-duality`,
`phys.mod.atomic-spectra`, `phys.rel.length-contraction`,
`phys.stat.boltzmann-factor` — verified programmatically against the live
physics KG's `requires` edges via an independent Kahn's-algorithm
recomputation (matched the stored level-12 row set exactly, zero
discrepancy), removed from the rows below, and priority numbers
renumbered accordingly (1585 → 1577 remaining). `math.found` remains
untouched at 31/82. Physics EB now 163/238 (155 existing + 8 this wave);
next unlocked wave is dependency level 13 (6 concepts):
`phys.mech.hamiltons-equations`, `phys.mod.radioactivity`,
`phys.qm.wave-function`, `phys.rel.lorentz-transform`,
`phys.stat.maxwell-boltzmann`, `phys.stat.partition-function`.

**Concurrent-session reconciliation (2026-07-23, same push)**: while this
Wave 12 batch was in progress, a separate concurrent session pushed
`math.found` Wave 6 (5 concepts: `logical-equivalence`, `ordinal-number`,
`quantifiers`, `relation`, `subset` — already removed from the rows below
by that session's own commit) and a Chemistry Educational Brain batch (24
concepts across `chem.found`/`chem.atomic`/`chem.state`/`chem.thermo`/
`chem.elect`/`chem.surface`/`chem.env`/`chem.period`, levels 0-3) to
`origin/main`. Merging found that the chemistry batch's own commits had
authored all 24 entries but never removed the corresponding 24 rows from
this queue — a bookkeeping gap in that session's work, not this one's;
corrected here as part of this merge (24 chemistry rows removed,
renumbered) rather than left inconsistent. True post-merge total: 227
`READY` (163 physics + 37 mathematics + 24 chemistry + 3 english), 1548
remaining — verified directly against the live `educational-brain/
concepts/{subject}/` directory counts, not estimated.

**Physics Wave 13 (2026-07-23)**: continuing the same mandatory-rules
production cycle, authored all 6 physics concepts at dependency level 13
(the full level, not a partial slice) — `phys.mech.hamiltons-equations`,
`phys.mod.radioactivity`, `phys.qm.wave-function`,
`phys.rel.lorentz-transform`, `phys.stat.maxwell-boltzmann`,
`phys.stat.partition-function` — verified programmatically against the
live physics KG's `requires` edges via an independent Kahn's-algorithm
recomputation (matched the stored level-13 row set exactly, zero
discrepancy), removed from the rows below, and priority numbers
renumbered accordingly (1548 → 1542 remaining). `math.found` remains
untouched at 37/82. Physics EB now 169/238 (163 existing + 6 this wave);
this wave introduced the first Quantum Mechanics domain entry in this
program (`phys.qm.wave-function`) and the second Statistical Mechanics
hub expansion (`phys.stat.maxwell-boltzmann`, `phys.stat.partition-function`).
Next unlocked wave is dependency level 14 (10 concepts):
`phys.mech.poisson-brackets`, `phys.mod.radioactive-decay`,
`phys.qm.schrodinger-equation`, `phys.qm.uncertainty-principle`,
`phys.rel.relativistic-momentum`, `phys.stat.bose-einstein`,
`phys.stat.entropy-statistical`, `phys.stat.fluctuations-correlations`,
`phys.stat.free-energy`, `phys.stat.grand-canonical-ensemble`.

**Concurrent-session reconciliation (2026-07-23, same push)**: this
Wave 13 push encountered a second concurrent Chemistry Educational Brain
batch (8 concepts, level 4: `chem.atomic.bohr-model`, `chem.kinet.rate`,
`chem.sol.types`, `chem.state.molar-mass-gas`, `chem.state.real-gases`,
`chem.thermo.enthalpy`, `chem.thermo.entropy`,
`chem.thermo.heat-capacities`). As with the Wave 12 merge, that
session's commit authored all 8 files but never removed their rows from
this queue (nor added them to `EDUCATIONAL_BRAIN_INDEX.md`/`QUALITY.md`)
— corrected here (8 chemistry rows removed, renumbered: 1542 → 1534).
True post-merge total: 241 `READY` (169 physics + 37 mathematics + 32
chemistry + 3 english), 1534 remaining — verified directly against the
live `educational-brain/concepts/{subject}/` directory counts.

**Physics Wave 14 (2026-07-23)**: continuing the same mandatory-rules
production cycle, authored all 10 physics concepts at dependency level
14 (the full level, not a partial slice) — `phys.mech.poisson-brackets`,
`phys.mod.radioactive-decay`, `phys.qm.schrodinger-equation`,
`phys.qm.uncertainty-principle`, `phys.rel.relativistic-momentum`,
`phys.stat.bose-einstein`, `phys.stat.entropy-statistical`,
`phys.stat.fluctuations-correlations`, `phys.stat.free-energy`,
`phys.stat.grand-canonical-ensemble` — verified programmatically against
the live physics KG's `requires` edges via an independent Kahn's-
algorithm recomputation (matched the stored level-14 row set exactly,
zero discrepancy), removed from the rows below, and priority numbers
renumbered accordingly (1534 → 1524 remaining). `math.found` remains
untouched at 37/82. Physics EB now 179/238 (169 existing + 10 this
wave); this wave completed the Schrödinger-equation hub
(`phys.qm.schrodinger-equation`, unlocking 5 downstream quantum-
mechanics concepts) and the grand-canonical/free-energy hub expansion of
Statistical Mechanics.

**Physics Wave 15 (2026-07-23)**: continuing the same mandatory-rules
production cycle after a read-only forensic repository audit concluded
(no production work that turn), re-fetched `origin/main` (moved twice
during the audit — a concurrent session landed 16 more Chemistry EB
files), authored all 9 physics concepts at dependency level 15 —
`phys.mech.canonical-transformations`, `phys.mod.nuclear-reactions`,
`phys.qm.harmonic-oscillator-qm`, `phys.qm.operators`,
`phys.qm.particle-in-box`, `phys.qm.quantum-tunneling`,
`phys.rel.mass-energy`, `phys.stat.chemical-potential`,
`phys.stat.phase-transitions` — verified programmatically against the
live physics KG's `requires` edges via an independent Kahn's-algorithm
recomputation, removed from the rows below, priority numbers renumbered
accordingly. This same pass also found and corrected 57 stale chemistry
rows left behind by a concurrent session's Chemistry EB batches (level
10-11 authoring landed the files but never removed their queue rows) —
removed and renumbered together with the physics Wave 15 removal in one
pass. Physics EB now 188/238 (179 existing + 9 this wave); this wave
completed all four `phys.qm.schrodinger-equation` hub downstream
concepts (operators, particle-in-box, harmonic oscillator, quantum
tunneling), closed out Statistical Mechanics' two remaining leaf concepts
(chemical potential, phase transitions), and added one Classical
Mechanics capstone (canonical transformations) and one Modern Physics
capstone (nuclear reactions). Next unlocked physics wave (Wave 16) was
NOT computed this batch — recompute fresh from the live KG before
starting, per this program's standing discipline. Total remaining after
both corrections: 1,458 (verified as the exact row count of the table
below).

**Physics Wave 16 (2026-07-23)**: continuing the same mandatory-rules
production cycle immediately after Wave 15 in response to a plain
"Continue" instruction. Re-fetched `origin/main` (0 ahead/0 behind, no
concurrent push this time), re-audited physics EB state fresh (188/238),
authored all 7 physics concepts at dependency level 16 —
`phys.mech.hamilton-jacobi-equation`, `phys.mod.binding-energy`,
`phys.qm.hydrogen-atom-qm`, `phys.qm.spin`, `phys.rel.spacetime`,
`phys.stat.ising-model`, `phys.particle.four-forces` — verified
programmatically against the live physics KG's `requires` edges via an
independent Kahn's-algorithm recomputation, removed from the rows below,
priority numbers renumbered accordingly. `phys.particle.four-forces` is
notable as the verified formal root node of the Particle Physics domain
(its only prerequisites, `phys.em.coulombs-law` and `phys.mod.nuclear-
reactions`, lie outside the domain) — authoring it opens the entire
16-concept Particle Physics domain for future waves. This pass also
discovered and corrected a pre-existing Blueprint-column accuracy bug in
`EDUCATIONAL_BRAIN_INDEX.md`: 21 rows (15 `phys.particle.*` plus 6
`phys.mod.*` semiconductor concepts) had existing Blueprint files on
disk but were recorded as Blueprint="No" — fixed in the same pass;
repo-wide Blueprint-column accuracy re-verified as 0 mismatches in
either direction across the entire file. Physics EB now 195/238
(188 existing + 7 this wave). Next unlocked physics wave (Wave 17) was
NOT computed this batch — recompute fresh from the live KG before
starting. Total remaining after this wave: 1,451 (verified as the exact
row count of the table below).

**Physics Wave 17 (2026-07-23)**: continuing the same mandatory-rules
production cycle in response to an explicit standing instruction — "Keep
continue until 238/238 done" — which sets 238/238 as the stopping
condition for this program rather than a single batch. Re-fetched
`origin/main` (0 ahead/0 behind), re-audited physics EB state fresh
(195/238), independently recomputed dependency levels via a fresh Kahn's-
algorithm pass over the live KG's `requires` edges — Wave 16's authoring
of `phys.particle.four-forces` and its five domain-siblings unlocked the
largest single wave since Wave 9: all 12 concepts newly at dependency
level 17 — `phys.mod.nuclear-fission`, `phys.mod.nuclear-fusion`,
`phys.mod.nuclear-models`, `phys.qm.pauli-exclusion`,
`phys.qm.perturbation-theory`, `phys.qm.selection-rules`,
`phys.qm.angular-momentum-addition`, `phys.qm.density-matrix`,
`phys.stat.phase-transitions-critical-phenomena`,
`phys.stat.monte-carlo-basics`, `phys.particle.particle-classification`,
`phys.particle.gauge-bosons`. All 12 had existing Blueprints, reused by
reference; all verified via heading-structure diff (0 mismatches) and a
repo-wide orphan/duplicate scan (clean). Physics EB now 207/238
(195 existing + 12 this wave), 31 concepts remaining. Next unlocked
physics wave (Wave 18) was NOT computed this batch — recompute fresh
from the live KG before starting, per this program's standing
discipline; per the user's standing instruction, Wave 18 begins
immediately after this wave's tracking-file/commit/push steps complete.
Total remaining after this wave: 1,439 (verified as the exact row count
of the table below).

**Physics Wave 18 (2026-07-23)**: continuing the same mandatory-rules
production cycle in response to the same explicit standing instruction —
"Keep continue until 238/238 done." Re-fetched `origin/main` (0
ahead/0 behind), re-audited physics EB state fresh (207/238),
independently recomputed dependency levels via a fresh Kahn's-algorithm
pass over the live KG's `requires` edges — the level-18 set (8 concepts)
matched the expected candidate list exactly: `phys.qm.variational-
method`, `phys.qm.identical-particles`, `phys.qm.scattering-theory-born-
approximation`, `phys.stat.fermi-dirac`, `phys.astro.stellar-structure`,
`phys.particle.antimatter`, `phys.particle.quarks`, `phys.particle.
leptons`. `phys.astro.stellar-structure` is notable as the first
Astrophysics-domain concept authored under this program — a 6-concept
domain (`phys.astro.*`) confirmed present in the live KG. All 8 had
existing Blueprints, reused by reference; all verified via heading-
structure diff (0 mismatches) and a repo-wide orphan/duplicate scan
(clean). Physics EB now 215/238 (207 existing + 8 this wave), 23
concepts remaining. Next unlocked physics wave (Wave 19) was NOT
computed this batch — recompute fresh from the live KG before starting,
per this program's standing discipline; per the user's standing
instruction, Wave 19 begins immediately after this wave's tracking-
file/commit/push steps complete. Total remaining after this wave: 1,431
(verified as the exact row count of the table below).

**Physics Wave 19 (2026-07-23)**: continuing the same mandatory-rules
production cycle in response to the same explicit standing instruction —
"Keep continue until 238/238 done." Re-fetched `origin/main` (0
ahead/0 behind), re-audited physics EB state fresh (215/238),
independently recomputed dependency levels via a fresh Kahn's-algorithm
pass over the live KG's `requires` edges — the level-19 set (8 concepts)
matched the expected candidate list exactly: `phys.qm.wkb-approximation`,
`phys.qm.s-matrix-basics`, `phys.astro.stellar-evolution`, `phys.astro.
cosmology`, `phys.particle.neutrinos`, `phys.particle.hadron-quark-
model`, `phys.particle.strong-interaction`, `phys.mod.energy-bands`.
`phys.mod.energy-bands` is notable as the entry point for the
six-concept semiconductor-physics extension of the Modern Physics
domain. All 8 had existing Blueprints, reused by reference; all verified
via heading-structure diff (0 mismatches) and a repo-wide orphan/
duplicate scan (clean). Physics EB now 223/238 (215 existing + 8 this
wave), 15 concepts remaining. Next unlocked physics wave (Wave 20) was
NOT computed this batch — recompute fresh from the live KG before
starting, per this program's standing discipline; per the user's
standing instruction, Wave 20 begins immediately after this wave's
tracking-file/commit/push steps complete. Total remaining after this
wave: 1,423 (verified as the exact row count of the table below).

**Merge reconciliation (2026-07-23)**: pushing this Wave 19 commit
required merging a concurrent session's Chemistry EB level-12 batch (17
concepts: chem.bond.mo-theory, chem.bond.polar-molecules,
chem.coord.werner, chem.dblock.first-row, chem.dblock.lanthanides,
chem.org.hybridization, chem.org.purification, chem.org.spectroscopy,
chem.pblock.trends, chem.redox.activity-series,
chem.redox.disproportionation, chem.redox.titrations,
chem.sblock.alkaline-earth, chem.solid.amorphous, chem.solid.defects,
chem.solid.packing, chem.thermo.bond-enthalpy), which had landed on
`origin/main` while this wave was in progress. That session's own
commit did not remove its 17 rows from this file (the same bookkeeping
gap previously found and corrected in Waves 12, 13, 15, and 16) — found
and corrected here: all 17 rows removed, remaining rows renumbered.
Total remaining after this reconciliation: 1,406 (verified as the exact
row count of the table below).

**Second merge reconciliation (2026-07-23)**: a second concurrent
Chemistry batch (level 13, 15 concepts: chem.anal.spectroscopy,
chem.anal.volumetric, chem.bond.intermolecular, chem.coord.cft,
chem.coord.nomenclature, chem.coord.stability, chem.dblock.oxo-species,
chem.elect.galvanic-cell, chem.hyd.alkanes, chem.org.aromaticity,
chem.org.electronic-effects, chem.org.isomerism, chem.org.qualitative-
analysis, chem.solid.ionic-solids, chem.solid.properties) landed on
`origin/main` immediately after the first reconciliation above, before
this Wave 19 commit could be pushed. Same bookkeeping gap found (rows
never removed from this file) — corrected: all 15 rows removed,
remaining rows renumbered. Total remaining after both reconciliations:
1,391 (verified as the exact row count of the table below).

**Physics Wave 20 (2026-07-23)**: continuing the same mandatory-rules
production cycle in response to the same explicit standing instruction —
"Keep continue until 238/238 done." Re-fetched `origin/main` (0
ahead/0 behind), re-audited physics EB state fresh (223/238),
independently recomputed dependency levels via a fresh Kahn's-algorithm
pass over the live KG's `requires` edges — the level-20 set (5 concepts)
matched the expected candidate list exactly: `phys.astro.dark-matter`,
`phys.astro.black-holes`, `phys.particle.weak-interaction`,
`phys.particle.conservation-laws`, `phys.mod.semiconductor-
classification`. All 5 had existing Blueprints, reused by reference; all
verified via heading-structure diff (0 mismatches) and a repo-wide
orphan/duplicate scan (clean). Physics EB now 228/238 (223 existing + 5
this wave), only 10 concepts remaining — all in Particle Physics (levels
21-23) and the Modern Physics semiconductor extension (levels 21-24).
Next unlocked physics wave (Wave 21) was NOT computed this batch —
recompute fresh from the live KG before starting, per this program's
standing discipline; per the user's standing instruction, Wave 21 begins
immediately after this wave's tracking-file/commit/push steps complete.
Total remaining after this wave: 1,386 (verified as the exact row count
of the table below).

| Priority | Subject | Level | KG ID | Concept Name |
|---|---|---|---|---|
| 1 | biology | 0 | `bio.found.what-is-biology` | What is Biology |
| 2 | computer_science | 0 | `cs.found.intro-computers` | Introduction to Computers |
| 3 | mathematics | 1 | `math.geom.point` | Point |
| 4 | english | 1 | `eng.phonics.alphabet-recognition` | Alphabet Recognition |
| 5 | english | 1 | `eng.phonics.rhyming` | Rhyming |
| 6 | english | 1 | `eng.phonetics.speech-sounds-overview` | Overview of Speech Sounds |
| 7 | biology | 1 | `bio.found.characteristics-of-life` | Characteristics of Living Organisms |
| 8 | computer_science | 1 | `cs.found.computer-organisation` | Computer Organisation |
| 9 | computer_science | 1 | `cs.found.number-systems` | Number Systems |
| 10 | computer_science | 1 | `cs.found.software-concepts` | Software Concepts |
| 11 | computer_science | 1 | `cs.algo.problem-solving` | Problem Solving Methodology |
| 12 | computer_science | 1 | `cs.sec.cyber-ethics-safety` | Cyber Ethics and Online Safety |
| 13 | mathematics | 2 | `math.geom.line` | Line |
| 14 | english | 2 | `eng.phonics.blending-segmenting` | Blending and Segmenting |
| 15 | english | 2 | `eng.phonetics.articulation-organs` | Organs of Articulation |
| 16 | english | 2 | `eng.writing.handwriting-and-formation` | Handwriting and Letter Formation |
| 17 | biology | 2 | `bio.found.classification-need` | Need for Classification |
| 18 | biology | 2 | `bio.found.microscopy-basics` | Microscopy and Laboratory Techniques |
| 19 | biology | 2 | `bio.found.biomes-levels-of-organisation` | Levels of Biological Organisation |
| 20 | computer_science | 2 | `cs.found.boolean-logic` | Boolean Logic and Logic Gates |
| 21 | computer_science | 2 | `cs.found.memory-storage` | Memory and Storage Systems |
| 22 | computer_science | 2 | `cs.found.os-concepts` | Operating System Fundamentals |
| 23 | computer_science | 2 | `cs.algo.algorithms` | Algorithms |
| 24 | computer_science | 2 | `cs.net.networking-basics` | Networking Basics |
| 25 | mathematics | 3 | `math.geom.line-segment` | Line Segment |
| 26 | mathematics | 3 | `math.geom.ray` | Ray |
| 27 | mathematics | 3 | `math.geom.plane` | Plane |
| 28 | english | 3 | `eng.phonetics.consonant-sounds` | Consonant Phoneme Classification |
| 29 | english | 3 | `eng.phonetics.vowel-sounds` | Vowel Phoneme Classification |
| 30 | biology | 3 | `bio.found.five-kingdom` | Five Kingdom Classification |
| 31 | biology | 3 | `bio.found.binomial-nomenclature` | Binomial Nomenclature |
| 32 | biology | 3 | `bio.cell.cell-theory` | Cell Theory |
| 33 | biology | 3 | `bio.eco.organism-environment` | Organisms and their Environment |
| 34 | computer_science | 3 | `cs.found.cpu-architecture` | CPU Architecture and Instruction Sets |
| 35 | computer_science | 3 | `cs.algo.flowcharts` | Flowcharts and Pseudocode |
| 36 | computer_science | 3 | `cs.algo.asymptotic-notation` | Asymptotic Notation |
| 37 | computer_science | 3 | `cs.os.process-management` | Process Management |
| 38 | computer_science | 3 | `cs.net.osi-tcp-ip-models` | OSI and TCP/IP Reference Models |
| 39 | computer_science | 3 | `cs.sec.cryptography-basics` | Cryptography Fundamentals |
| 40 | mathematics | 4 | `math.geom.angle` | Angle |
| 41 | mathematics | 4 | `math.geom.perimeter` | Perimeter |
| 42 | mathematics | 4 | `math.geom.circle` | Circle |
| 43 | mathematics | 4 | `math.geom.length` | Length |
| 44 | mathematics | 4 | `math.prob.sample-space` | Sample Space |
| 45 | mathematics | 4 | `math.disc.graph` | Graph |
| 46 | mathematics | 4 | `math.abst.algebraic-structure` | Algebraic Structure |
| 47 | mathematics | 4 | `math.top.topological-space` | Topological Space |
| 48 | mathematics | 4 | `math.meas.sigma-algebra` | σ-Algebra |
| 49 | mathematics | 4 | `math.graph.graph` | Graph |
| 50 | english | 4 | `eng.phonics.consonants` | Consonant Sounds |
| 51 | english | 4 | `eng.phonics.short-vowels` | Short Vowel Sounds |
| 52 | english | 4 | `eng.phonics.sight-words` | High-Frequency Sight Words |
| 53 | english | 4 | `eng.phonetics.ipa-basics` | IPA Basics for English |
| 54 | biology | 4 | `bio.found.viruses-viroids-lichens` | Viruses, Viroids and Lichens |
| 55 | biology | 4 | `bio.cell.prokaryotic-cell` | Prokaryotic Cell Structure |
| 56 | biology | 4 | `bio.cell.eukaryotic-cell` | Eukaryotic Cell Structure |
| 57 | biology | 4 | `bio.eco.population-ecology` | Population Ecology |
| 58 | biology | 4 | `bio.div.three-domain-system` | Three Domain System |
| 59 | biology | 4 | `bio.div.fungal-biology` | Fungal Biology |
| 60 | computer_science | 4 | `cs.found.pipelining-cache` | Pipelining and Cache Memory |
| 61 | computer_science | 4 | `cs.algo.time-space-complexity` | Time and Space Complexity Analysis |
| 62 | computer_science | 4 | `cs.prog.intro-programming` | Introduction to Programming |
| 63 | computer_science | 4 | `cs.os.threads-concurrency` | Threads and Concurrency |
| 64 | computer_science | 4 | `cs.os.cpu-scheduling` | CPU Scheduling Algorithms |
| 65 | computer_science | 4 | `cs.os.memory-management-os` | Memory Management |
| 66 | computer_science | 4 | `cs.net.ip-addressing` | IP Addressing and Subnetting |
| 67 | computer_science | 4 | `cs.net.tcp-udp-transport` | TCP and UDP — Transport Layer |
| 68 | computer_science | 4 | `cs.theory.finite-automata` | Finite Automata |
| 69 | mathematics | 5 | `math.geom.angle-types` | Types of Angles |
| 70 | mathematics | 5 | `math.geom.angle-measurement` | Angle Measurement |
| 71 | mathematics | 5 | `math.geom.angle-pairs` | Angle Pairs |
| 72 | mathematics | 5 | `math.geom.perpendicular-lines` | Perpendicular Lines |
| 73 | mathematics | 5 | `math.geom.triangle` | Triangle |
| 74 | mathematics | 5 | `math.geom.circle-parts` | Parts of a Circle |
| 75 | mathematics | 5 | `math.geom.circle-circumference` | Circumference of a Circle |
| 76 | mathematics | 5 | `math.prob.event` | Event |
| 77 | mathematics | 5 | `math.disc.graph-types` | Types of Graphs |
| 78 | mathematics | 5 | `math.disc.graph-connectivity` | Graph Connectivity |
| 79 | mathematics | 5 | `math.disc.graph-coloring` | Graph Coloring |
| 80 | mathematics | 5 | `math.disc.planar-graph` | Planar Graph |
| 81 | mathematics | 5 | `math.disc.propositional-logic` | Propositional Logic |
| 82 | mathematics | 5 | `math.top.open-sets` | Open and Closed Sets (Topology) |
| 83 | mathematics | 5 | `math.top.basis` | Basis for a Topology |
| 84 | mathematics | 5 | `math.top.continuity-top` | Continuity (Topology) |
| 85 | mathematics | 5 | `math.top.compactness` | Compactness (Topology) |
| 86 | mathematics | 5 | `math.top.connectedness` | Connectedness (Topology) |
| 87 | mathematics | 5 | `math.top.separation-axioms` | Separation Axioms |
| 88 | mathematics | 5 | `math.top.product-space` | Product Topology |
| 89 | mathematics | 5 | `math.top.simplicial-complex` | Simplicial Complex |
| 90 | mathematics | 5 | `math.meas.measure` | Measure |
| 91 | mathematics | 5 | `math.meas.measurable-function` | Measurable Function |
| 92 | mathematics | 5 | `math.graph.graph-invariants` | Graph Invariants |
| 93 | mathematics | 5 | `math.graph.graph-operations` | Graph Operations |
| 94 | mathematics | 5 | `math.graph.matching` | Matching |
| 95 | english | 5 | `eng.phonics.consonant-blends` | Consonant Blends |
| 96 | english | 5 | `eng.phonics.long-vowels-silent-e` | Long Vowels and Silent E |
| 97 | english | 5 | `eng.phonetics.minimal-pairs` | Minimal Pairs |
| 98 | english | 5 | `eng.phonetics.syllable-stress` | Word Stress |
| 99 | biology | 5 | `bio.cell.cell-membrane-transport` | Cell Membrane and Transport |
| 100 | biology | 5 | `bio.cell.nucleus-chromosomes` | Nucleus and Chromosomes |
| 101 | biology | 5 | `bio.cell.mitochondria-energy` | Mitochondria and Energy Organelles |
| 102 | biology | 5 | `bio.cell.chloroplast-structure` | Chloroplast Structure |
| 103 | biology | 5 | `bio.cell.endomembrane-system` | Endomembrane System |
| 104 | biology | 5 | `bio.mol.biomolecule-types` | Types of Biomolecules |
| 105 | biology | 5 | `bio.eco.ecosystem-structure-function` | Ecosystem Structure and Function |
| 106 | biology | 5 | `bio.micro.microbial-diversity` | Microbial Diversity |
| 107 | computer_science | 5 | `cs.algo.divide-and-conquer` | Divide and Conquer |
| 108 | computer_science | 5 | `cs.algo.greedy-algorithms` | Greedy Algorithms |
| 109 | computer_science | 5 | `cs.prog.python-basics` | Python Language Basics |
| 110 | computer_science | 5 | `cs.os.synchronisation-deadlocks` | Synchronisation and Deadlocks |
| 111 | computer_science | 5 | `cs.os.virtual-memory` | Virtual Memory |
| 112 | computer_science | 5 | `cs.os.file-systems` | File Systems |
| 113 | computer_science | 5 | `cs.net.dns-dhcp` | DNS and DHCP |
| 114 | computer_science | 5 | `cs.net.routing-congestion` | Routing and Congestion Control |
| 115 | computer_science | 5 | `cs.theory.regular-expressions` | Regular Expressions and Regular Languages |
| 116 | mathematics | 6 | `math.geom.parallel-lines` | Parallel Lines |
| 117 | mathematics | 6 | `math.geom.triangle-types` | Types of Triangles |
| 118 | mathematics | 6 | `math.geom.right-triangle` | Right Triangle |
| 119 | mathematics | 6 | `math.geom.congruent-triangles` | Congruent Triangles |
| 120 | mathematics | 6 | `math.geom.area-triangle` | Area of a Triangle |
| 121 | mathematics | 6 | `math.geom.polygon` | Polygon |
| 122 | mathematics | 6 | `math.geom.circle-theorems` | Circle Theorems |
| 123 | mathematics | 6 | `math.geom.geometric-constructions` | Geometric Constructions |
| 124 | mathematics | 6 | `math.trig.angle-measure` | Angle Measure |
| 125 | mathematics | 6 | `math.prob.probability-measure` | Probability Measure |
| 126 | mathematics | 6 | `math.disc.euler-hamiltonian` | Euler and Hamiltonian Paths |
| 127 | mathematics | 6 | `math.disc.graph-trees` | Trees |
| 128 | mathematics | 6 | `math.disc.boolean-circuits` | Boolean Circuits and Logic Gates |
| 129 | mathematics | 6 | `math.disc.predicate-logic-disc` | Predicate Logic and Proof Methods |
| 130 | mathematics | 6 | `math.top.interior-closure` | Interior, Closure, and Boundary |
| 131 | mathematics | 6 | `math.top.homeomorphism` | Homeomorphism |
| 132 | mathematics | 6 | `math.top.tychonoff` | Tychonoff's Theorem |
| 133 | mathematics | 6 | `math.top.homotopy` | Homotopy |
| 134 | mathematics | 6 | `math.meas.lebesgue-measure` | Lebesgue Measure |
| 135 | mathematics | 6 | `math.meas.simple-function` | Simple Function |
| 136 | mathematics | 6 | `math.meas.abstract-measure-spaces` | Abstract Measure Spaces |
| 137 | mathematics | 6 | `math.graph.connectivity` | Connectivity |
| 138 | mathematics | 6 | `math.graph.graph-coloring` | Graph Coloring |
| 139 | english | 6 | `eng.phonics.digraphs` | Consonant and Vowel Digraphs |
| 140 | english | 6 | `eng.phonetics.sentence-stress` | Sentence Stress |
| 141 | english | 6 | `eng.phonetics.phonetic-transcription` | Phonetic Transcription |
| 142 | biology | 6 | `bio.cell.cytoskeleton` | Cytoskeleton and Cell Motility |
| 143 | biology | 6 | `bio.cell.cell-cycle` | The Cell Cycle |
| 144 | biology | 6 | `bio.cell.cell-signalling` | Cell Signalling |
| 145 | biology | 6 | `bio.mol.carbohydrates-lipids` | Carbohydrates and Lipids |
| 146 | biology | 6 | `bio.mol.proteins-structure` | Proteins and Protein Structure |
| 147 | biology | 6 | `bio.mol.nucleic-acid-structure` | Nucleic Acid Structure |
| 148 | biology | 6 | `bio.evo.origin-of-life` | Origin of Life |
| 149 | biology | 6 | `bio.physio.respiratory-system` | Human Respiratory System |
| 150 | biology | 6 | `bio.plant.plant-water-relations` | Plant Water Relations |
| 151 | biology | 6 | `bio.eco.nutrient-cycling` | Nutrient Cycling and Succession |
| 152 | biology | 6 | `bio.micro.microbial-growth-culture` | Microbial Growth and Culture Techniques |
| 153 | biology | 6 | `bio.micro.pathogenic-microbes` | Pathogenic Microorganisms and Disease |
| 154 | biology | 6 | `bio.div.endosymbiotic-theory` | Endosymbiotic Theory |
| 155 | biology | 6 | `bio.mol.bioenergetics` | Bioenergetics and Thermodynamics of Life |
| 156 | biology | 6 | `bio.eco.community-ecology` | Community Ecology |
| 157 | computer_science | 6 | `cs.algo.dynamic-programming` | Dynamic Programming |
| 158 | computer_science | 6 | `cs.prog.data-types-variables` | Data Types and Variables |
| 159 | computer_science | 6 | `cs.net.application-protocols` | Application-Layer Protocols |
| 160 | computer_science | 6 | `cs.net.wireless-mobile-networks` | Wireless and Mobile Networks |
| 161 | computer_science | 6 | `cs.theory.context-free-grammars` | Context-Free Grammars |
| 162 | mathematics | 7 | `math.found.rules-of-inference` | Rules of Inference |
| 163 | mathematics | 7 | `math.found.proper-subset` | Proper Subset |
| 164 | mathematics | 7 | `math.found.set-equality` | Set Equality |
| 165 | mathematics | 7 | `math.found.set-operations` | Set Operations |
| 166 | mathematics | 7 | `math.found.power-set` | Power Set |
| 167 | mathematics | 7 | `math.found.reflexive-relation` | Reflexive Relation |
| 168 | mathematics | 7 | `math.found.symmetric-relation` | Symmetric Relation |
| 169 | mathematics | 7 | `math.found.transitive-relation` | Transitive Relation |
| 170 | mathematics | 7 | `math.found.partition` | Partition |
| 171 | mathematics | 7 | `math.found.function-set-theoretic` | Function (Set-Theoretic) |
| 172 | mathematics | 7 | `math.found.cardinal-arithmetic` | Cardinal Arithmetic |
| 173 | mathematics | 7 | `math.geom.triangle-angle-sum` | Triangle Angle Sum Theorem |
| 174 | mathematics | 7 | `math.geom.triangle-centers` | Triangle Centers |
| 175 | mathematics | 7 | `math.geom.quadrilateral` | Quadrilateral |
| 176 | mathematics | 7 | `math.geom.regular-polygon` | Regular Polygon |
| 177 | mathematics | 7 | `math.geom.area-polygon` | Area of Polygons |
| 178 | mathematics | 7 | `math.geom.solid-3d` | Three-Dimensional Solids |
| 179 | mathematics | 7 | `math.trig.degree-radian-conversion` | Degree-Radian Conversion |
| 180 | mathematics | 7 | `math.prob.probability-axioms` | Axioms of Probability |
| 181 | mathematics | 7 | `math.disc.spanning-tree` | Spanning Tree |
| 182 | mathematics | 7 | `math.top.homotopy-equivalence` | Homotopy Equivalence |
| 183 | mathematics | 7 | `math.top.manifold` | Topological Manifold |
| 184 | mathematics | 7 | `math.meas.measure-zero` | Measure Zero |
| 185 | mathematics | 7 | `math.meas.lebesgue-integral` | Lebesgue Integral |
| 186 | mathematics | 7 | `math.graph.tree` | Tree |
| 187 | mathematics | 7 | `math.graph.maximum-flow` | Maximum Flow |
| 188 | mathematics | 7 | `math.graph.eulerian-circuit` | Eulerian Circuit |
| 189 | mathematics | 7 | `math.graph.hamiltonian-cycle` | Hamiltonian Cycle |
| 190 | english | 7 | `eng.phonics.syllable-types` | Syllable Types |
| 191 | english | 7 | `eng.phonetics.intonation-patterns` | Intonation Patterns |
| 192 | biology | 7 | `bio.cell.mitosis` | Mitosis |
| 193 | biology | 7 | `bio.mol.enzymes` | Enzymes and Enzyme Kinetics |
| 194 | biology | 7 | `bio.evo.evidence-for-evolution` | Evidence for Evolution |
| 195 | biology | 7 | `bio.physio.circulatory-system` | Human Circulatory System |
| 196 | biology | 7 | `bio.physio.nervous-system` | Nervous System and Neural Control |
| 197 | biology | 7 | `bio.plant.mineral-nutrition` | Mineral Nutrition in Plants |
| 198 | biology | 7 | `bio.eco.biodiversity-conservation` | Biodiversity and Conservation |
| 199 | biology | 7 | `bio.micro.microbes-in-human-welfare` | Microbes in Human Welfare |
| 200 | biology | 7 | `bio.div.protist-diversity` | Eukaryotic Supergroups and Protist Diversity |
| 201 | biology | 7 | `bio.mol.signal-transduction-pathways` | Core Signal Transduction Pathways |
| 202 | computer_science | 7 | `cs.algo.backtracking` | Backtracking |
| 203 | computer_science | 7 | `cs.prog.operators-expressions` | Operators and Expressions |
| 204 | computer_science | 7 | `cs.net.cloud-computing` | Cloud Computing |
| 205 | computer_science | 7 | `cs.sec.network-web-security` | Network and Web Security |
| 206 | computer_science | 7 | `cs.web.client-server-model` | The Client-Server Model |
| 207 | computer_science | 7 | `cs.theory.turing-machines` | Turing Machines |
| 208 | mathematics | 8 | `math.found.proof` | Mathematical Proof |
| 209 | mathematics | 8 | `math.found.union` | Union |
| 210 | mathematics | 8 | `math.found.intersection` | Intersection |
| 211 | mathematics | 8 | `math.found.set-difference` | Set Difference |
| 212 | mathematics | 8 | `math.found.complement` | Set Complement |
| 213 | mathematics | 8 | `math.found.venn-diagram` | Venn Diagram |
| 214 | mathematics | 8 | `math.found.equivalence-relation` | Equivalence Relation |
| 215 | mathematics | 8 | `math.found.partial-order` | Partial Order |
| 216 | mathematics | 8 | `math.found.cardinality` | Cardinality |
| 217 | mathematics | 8 | `math.geom.polygon-angle-sum` | Polygon Angle Sum |
| 218 | mathematics | 8 | `math.geom.parallelogram` | Parallelogram |
| 219 | mathematics | 8 | `math.geom.trapezoid` | Trapezoid |
| 220 | mathematics | 8 | `math.geom.area` | Area |
| 221 | mathematics | 8 | `math.geom.volume` | Volume |
| 222 | mathematics | 8 | `math.geom.platonic-solids` | Platonic Solids |
| 223 | mathematics | 8 | `math.func.function-concept` | Function |
| 224 | mathematics | 8 | `math.prob.conditional-probability` | Conditional Probability |
| 225 | mathematics | 8 | `math.abst.binary-operation` | Binary Operation |
| 226 | mathematics | 8 | `math.meas.convergence-theorems` | Convergence Theorems |
| 227 | mathematics | 8 | `math.meas.lp-space` | Lᵖ Spaces |
| 228 | mathematics | 8 | `math.meas.product-measure` | Product Measure and Fubini's Theorem |
| 229 | mathematics | 8 | `math.meas.radon-nikodym` | Radon-Nikodym Theorem |
| 230 | mathematics | 8 | `math.fnal.convolution` | Convolution |
| 231 | mathematics | 8 | `math.graph.minimum-spanning-tree` | Minimum Spanning Tree |
| 232 | mathematics | 8 | `math.graph.random-graph` | Random Graphs |
| 233 | mathematics | 8 | `math.cat.category` | Category |
| 234 | english | 8 | `eng.phonics.decoding-fluency` | Decoding Fluency |
| 235 | english | 8 | `eng.phonetics.connected-speech` | Connected Speech |
| 236 | english | 8 | `eng.phonetics.prosody` | Prosody |
| 237 | english | 8 | `eng.writing.spelling-strategies` | Spelling Strategies |
| 238 | biology | 8 | `bio.cell.meiosis` | Meiosis |
| 239 | biology | 8 | `bio.mol.dna-replication` | DNA Replication |
| 240 | biology | 8 | `bio.evo.natural-selection` | Natural Selection and Darwinism |
| 241 | biology | 8 | `bio.physio.digestive-system` | Human Digestive System |
| 242 | biology | 8 | `bio.physio.excretory-system` | Excretory System and Osmoregulation |
| 243 | biology | 8 | `bio.physio.endocrine-system` | Endocrine System |
| 244 | biology | 8 | `bio.physio.musculoskeletal-system` | Locomotion and Musculoskeletal System |
| 245 | biology | 8 | `bio.physio.immune-system-intro` | Immune System Overview |
| 246 | biology | 8 | `bio.plant.photosynthesis` | Photosynthesis |
| 247 | biology | 8 | `bio.plant.plant-growth-hormones` | Plant Growth and Hormones |
| 248 | biology | 8 | `bio.repro.asexual-reproduction` | Asexual Reproduction |
| 249 | biology | 8 | `bio.eco.environmental-issues` | Environmental Issues and Pollution |
| 250 | biology | 8 | `bio.div.cladistics-phylogenetic-thinking` | Cladistics and Phylogenetic Thinking |
| 251 | computer_science | 8 | `cs.algo.np-completeness` | NP-Completeness and Intractability |
| 252 | computer_science | 8 | `cs.prog.type-conversion` | Type Conversion and Casting |
| 253 | computer_science | 8 | `cs.control.conditionals` | Conditional Statements |
| 254 | computer_science | 8 | `cs.sec.data-protection-privacy` | Data Protection and Privacy |
| 255 | computer_science | 8 | `cs.web.html-css-basics` | HTML and CSS Basics |
| 256 | mathematics | 9 | `math.found.direct-proof` | Direct Proof |
| 257 | mathematics | 9 | `math.found.proof-by-contradiction` | Proof by Contradiction |
| 258 | mathematics | 9 | `math.found.proof-by-contrapositive` | Proof by Contrapositive |
| 259 | mathematics | 9 | `math.found.proof-by-cases` | Proof by Cases |
| 260 | mathematics | 9 | `math.found.existence-proof` | Existence Proof |
| 261 | mathematics | 9 | `math.found.writing-mathematics` | Writing Mathematics |
| 262 | mathematics | 9 | `math.found.theorem` | Theorem |
| 263 | mathematics | 9 | `math.found.conjecture` | Conjecture |
| 264 | mathematics | 9 | `math.found.equivalence-class` | Equivalence Class |
| 265 | mathematics | 9 | `math.found.total-order` | Total Order |
| 266 | mathematics | 9 | `math.found.hasse-diagram` | Hasse Diagram |
| 267 | mathematics | 9 | `math.found.finite-set` | Finite Set |
| 268 | mathematics | 9 | `math.geom.circle-area` | Area of a Circle |
| 269 | mathematics | 9 | `math.geom.geometric-proof` | Geometric Proof |
| 270 | mathematics | 9 | `math.geom.surface-area` | Surface Area |
| 271 | mathematics | 9 | `math.func.domain-range` | Domain and Range |
| 272 | mathematics | 9 | `math.func.function-notation` | Function Notation |
| 273 | mathematics | 9 | `math.func.injectivity` | Injective (One-to-One) Function |
| 274 | mathematics | 9 | `math.func.surjectivity` | Surjective (Onto) Function |
| 275 | mathematics | 9 | `math.func.composition` | Composition of Functions |
| 276 | mathematics | 9 | `math.func.periodic-function` | Periodic Function |
| 277 | mathematics | 9 | `math.func.piecewise-function` | Piecewise-Defined Function |
| 278 | mathematics | 9 | `math.func.monotonic-function` | Monotonic Function |
| 279 | mathematics | 9 | `math.func.function-operations` | Operations on Functions |
| 280 | mathematics | 9 | `math.prob.total-probability` | Law of Total Probability |
| 281 | mathematics | 9 | `math.prob.independence` | Independence |
| 282 | mathematics | 9 | `math.prob.random-variable` | Random Variable |
| 283 | mathematics | 9 | `math.abst.group-theory` | Group |
| 284 | mathematics | 9 | `math.top.quotient-space` | Quotient Space |
| 285 | mathematics | 9 | `math.meas.l2-space` | L² Space |
| 286 | mathematics | 9 | `math.cat.morphism-types` | Types of Morphisms |
| 287 | mathematics | 9 | `math.cat.functor` | Functor |
| 288 | english | 9 | `eng.phonetics.rhythm-and-timing` | Rhythm and Timing |
| 289 | english | 9 | `eng.vocab.word-recognition` | Word Recognition |
| 290 | english | 9 | `eng.listening.active-listening` | Active Listening |
| 291 | english | 9 | `eng.speaking.oral-fluency` | Oral Fluency |
| 292 | biology | 9 | `bio.mol.transcription` | Transcription |
| 293 | biology | 9 | `bio.gen.mendelian-genetics` | Mendelian Genetics |
| 294 | biology | 9 | `bio.plant.plant-respiration` | Respiration in Plants |
| 295 | biology | 9 | `bio.repro.sexual-reproduction-plants` | Sexual Reproduction in Flowering Plants |
| 296 | biology | 9 | `bio.repro.human-reproductive-system` | Human Reproductive System |
| 297 | biology | 9 | `bio.immuno.innate-adaptive-immunity` | Innate and Adaptive Immunity |
| 298 | biology | 9 | `bio.micro.viral-replication` | Viral Replication and Lifecycle |
| 299 | biology | 9 | `bio.micro.horizontal-gene-transfer` | Horizontal Gene Transfer |
| 300 | computer_science | 9 | `cs.prog.input-output` | Input, Output and Formatting |
| 301 | computer_science | 9 | `cs.control.loops` | Iteration — while and for Loops |
| 302 | computer_science | 9 | `cs.web.rest-apis` | REST APIs |
| 303 | computer_science | 9 | `cs.theory.complexity-classes` | Computational Complexity Classes |
| 304 | mathematics | 10 | `math.found.uniqueness-proof` | Uniqueness Proof |
| 305 | mathematics | 10 | `math.found.lemma` | Lemma |
| 306 | mathematics | 10 | `math.found.corollary` | Corollary |
| 307 | mathematics | 10 | `math.found.natural-numbers` | Natural Numbers |
| 308 | mathematics | 10 | `math.func.bijection` | Bijective Function |
| 309 | mathematics | 10 | `math.func.step-function` | Step Function |
| 310 | mathematics | 10 | `math.prob.bayes-theorem` | Bayes' Theorem |
| 311 | mathematics | 10 | `math.prob.discrete-rv` | Discrete Random Variable |
| 312 | mathematics | 10 | `math.prob.cdf` | Cumulative Distribution Function |
| 313 | mathematics | 10 | `math.abst.group-operation` | Group Operation Examples |
| 314 | mathematics | 10 | `math.abst.subgroup` | Subgroup |
| 315 | mathematics | 10 | `math.abst.cyclic-group` | Cyclic Group |
| 316 | mathematics | 10 | `math.abst.group-order` | Order of Group and Elements |
| 317 | mathematics | 10 | `math.abst.group-homomorphism` | Group Homomorphism |
| 318 | mathematics | 10 | `math.abst.group-action` | Group Action |
| 319 | mathematics | 10 | `math.abst.symmetric-group` | Symmetric Group |
| 320 | mathematics | 10 | `math.abst.ring-theory` | Ring |
| 321 | mathematics | 10 | `math.abst.group-inverse` | Group Inverse |
| 322 | mathematics | 10 | `math.top.fundamental-group` | Fundamental Group |
| 323 | mathematics | 10 | `math.top.homology` | Homology |
| 324 | mathematics | 10 | `math.cat.natural-transformation` | Natural Transformation |
| 325 | english | 10 | `eng.phonetics.accents-and-dialects` | Accents and Dialects |
| 326 | english | 10 | `eng.vocab.context-clues` | Context Clues |
| 327 | english | 10 | `eng.vocab.synonyms-antonyms` | Synonyms and Antonyms |
| 328 | english | 10 | `eng.vocab.word-families` | Word Families |
| 329 | english | 10 | `eng.grammar.word-classes-overview` | Overview of Word Classes |
| 330 | english | 10 | `eng.listening.listening-for-gist` | Listening for Gist |
| 331 | english | 10 | `eng.listening.distinguishing-sounds-in-speech` | Distinguishing Sounds in Speech |
| 332 | english | 10 | `eng.speaking.pronunciation-in-conversation` | Pronunciation in Conversation |
| 333 | biology | 10 | `bio.mol.translation-genetic-code` | Translation and the Genetic Code |
| 334 | biology | 10 | `bio.gen.gene-interactions` | Gene Interactions and Extensions of Mendelism |
| 335 | biology | 10 | `bio.repro.fertilisation-development` | Fertilisation and Embryonic Development |
| 336 | biology | 10 | `bio.immuno.antibody-structure-function` | Antibody Structure and Function |
| 337 | biology | 10 | `bio.div.plant-diversity-alternation-of-generations` | Plant Diversity and Alternation of Generations |
| 338 | biology | 10 | `bio.immuno.mhc-antigen-presentation` | MHC and Antigen Presentation |
| 339 | computer_science | 10 | `cs.prog.exception-handling` | Exception Handling |
| 340 | computer_science | 10 | `cs.control.nested-control-patterns` | Nested Control Flow Patterns |
| 341 | computer_science | 10 | `cs.data.strings` | Strings |
| 342 | mathematics | 11 | `math.found.proof-by-induction` | Mathematical Induction |
| 343 | mathematics | 11 | `math.found.well-ordering-principle` | Well-Ordering Principle |
| 344 | mathematics | 11 | `math.found.countable-set` | Countable Set |
| 345 | mathematics | 11 | `math.found.integers` | Integers |
| 346 | mathematics | 11 | `math.arith.counting` | Counting |
| 347 | mathematics | 11 | `math.func.inverse-functions` | Inverse Functions |
| 348 | mathematics | 11 | `math.seq.sequence` | Sequence |
| 349 | mathematics | 11 | `math.prob.bayesian-inference` | Bayesian Inference |
| 350 | mathematics | 11 | `math.prob.pmf` | Probability Mass Function |
| 351 | mathematics | 11 | `math.prob.quantile` | Quantile |
| 352 | mathematics | 11 | `math.prob.distribution` | Probability Distribution |
| 353 | mathematics | 11 | `math.abst.coset` | Coset |
| 354 | mathematics | 11 | `math.abst.group-isomorphism` | Group Isomorphism |
| 355 | mathematics | 11 | `math.abst.burnside-lemma` | Burnside's Lemma |
| 356 | mathematics | 11 | `math.abst.ideal` | Ideal |
| 357 | mathematics | 11 | `math.abst.ring-homomorphism` | Ring Homomorphism |
| 358 | mathematics | 11 | `math.abst.polynomial-ring` | Polynomial Ring |
| 359 | mathematics | 11 | `math.top.van-kampen` | Seifert-van Kampen Theorem |
| 360 | mathematics | 11 | `math.top.covering-space` | Covering Space |
| 361 | mathematics | 11 | `math.top.euler-characteristic` | Euler Characteristic |
| 362 | mathematics | 11 | `math.top.cohomology` | Cohomology |
| 363 | mathematics | 11 | `math.cat.functor-category` | Functor Category |
| 364 | mathematics | 11 | `math.cat.limits` | Limits and Colimits |
| 365 | mathematics | 11 | `math.cat.adjunction` | Adjunction |
| 366 | english | 11 | `eng.vocab.compound-words` | Compound Words |
| 367 | english | 11 | `eng.vocab.prefixes` | Prefixes |
| 368 | english | 11 | `eng.vocab.suffixes` | Suffixes |
| 369 | english | 11 | `eng.vocab.homonyms-homophones` | Homonyms and Homophones |
| 370 | english | 11 | `eng.vocab.connotation-denotation` | Connotation and Denotation |
| 371 | english | 11 | `eng.grammar.nouns` | Nouns |
| 372 | english | 11 | `eng.grammar.verbs` | Verbs |
| 373 | english | 11 | `eng.grammar.prepositions` | Prepositions |
| 374 | english | 11 | `eng.grammar.conjunctions` | Conjunctions |
| 375 | english | 11 | `eng.grammar.interjections` | Interjections |
| 376 | english | 11 | `eng.reading.print-to-meaning` | From Print to Meaning |
| 377 | english | 11 | `eng.listening.listening-for-detail` | Listening for Detail |
| 378 | english | 11 | `eng.speaking.conversation-skills` | Conversation Skills |
| 379 | biology | 11 | `bio.mol.gene-regulation` | Regulation of Gene Expression |
| 380 | biology | 11 | `bio.gen.chromosomal-theory-linkage` | Chromosomal Theory and Linkage |
| 381 | biology | 11 | `bio.repro.reproductive-health` | Reproductive Health and Contraception |
| 382 | biology | 11 | `bio.dev.gametogenesis-fertilisation-dev` | Fundamentals of Animal Development |
| 383 | biology | 11 | `bio.immuno.vaccination-immunisation` | Vaccination and Immunisation |
| 384 | computer_science | 11 | `cs.data.lists` | Lists |
| 385 | computer_science | 11 | `cs.func.functions` | Functions |
| 386 | mathematics | 12 | `math.found.strong-induction` | Strong Induction |
| 387 | mathematics | 12 | `math.found.uncountable-set` | Uncountable Set |
| 388 | mathematics | 12 | `math.found.rational-numbers` | Rational Numbers |
| 389 | mathematics | 12 | `math.arith.counting-sequence` | Counting Sequence |
| 390 | mathematics | 12 | `math.arith.subitizing` | Subitizing |
| 391 | mathematics | 12 | `math.arith.place-value` | Place Value |
| 392 | mathematics | 12 | `math.arith.number-line` | Number Line |
| 393 | mathematics | 12 | `math.seq.arithmetic-sequence` | Arithmetic Sequence |
| 394 | mathematics | 12 | `math.seq.geometric-sequence` | Geometric Sequence |
| 395 | mathematics | 12 | `math.seq.recursive-sequences` | Recursive Sequences |
| 396 | mathematics | 12 | `math.seq.series` | Series |
| 397 | mathematics | 12 | `math.prob.discrete-distributions` | Discrete Distributions |
| 398 | mathematics | 12 | `math.prob.joint-distribution` | Joint Distribution |
| 399 | mathematics | 12 | `math.abst.lagrange-theorem` | Lagrange's Theorem |
| 400 | mathematics | 12 | `math.abst.normal-subgroup` | Normal Subgroup |
| 401 | mathematics | 12 | `math.abst.quotient-ring` | Quotient Ring |
| 402 | mathematics | 12 | `math.abst.prime-ideal` | Prime and Maximal Ideals |
| 403 | mathematics | 12 | `math.abst.euclidean-domain` | Euclidean Domain |
| 404 | mathematics | 12 | `math.cat.yoneda-lemma` | Yoneda Lemma |
| 405 | mathematics | 12 | `math.cat.equalizer` | Equalizer and Coequalizer |
| 406 | mathematics | 12 | `math.cat.pullback` | Pullback and Pushout |
| 407 | mathematics | 12 | `math.cat.monad` | Monad |
| 408 | mathematics | 12 | `math.cat.tensor-product` | Tensor Product (Categorical) |
| 409 | mathematics | 12 | `math.cat.topos` | Topos |
| 410 | english | 12 | `eng.vocab.roots-and-origins` | Greek and Latin Roots |
| 411 | english | 12 | `eng.vocab.multiple-meaning-words` | Multiple-Meaning Words |
| 412 | english | 12 | `eng.vocab.collocations` | Collocations |
| 413 | english | 12 | `eng.vocab.register-and-formality` | Register and Formality |
| 414 | english | 12 | `eng.grammar.pronouns` | Pronouns |
| 415 | english | 12 | `eng.grammar.adjectives` | Adjectives |
| 416 | english | 12 | `eng.grammar.articles-and-determiners` | Articles and Determiners |
| 417 | english | 12 | `eng.grammar.subject-and-predicate` | Subject and Predicate |
| 418 | english | 12 | `eng.grammar.present-tenses` | Present Tenses |
| 419 | english | 12 | `eng.reading.reading-fluency` | Reading Fluency |
| 420 | english | 12 | `eng.listening.following-instructions` | Following Spoken Instructions |
| 421 | english | 12 | `eng.listening.note-taking-while-listening` | Note-Taking While Listening |
| 422 | english | 12 | `eng.speaking.asking-and-answering-questions` | Asking and Answering Questions |
| 423 | english | 12 | `eng.speaking.storytelling-orally` | Oral Storytelling |
| 424 | english | 12 | `eng.speaking.non-verbal-communication` | Non-Verbal Communication |
| 425 | biology | 12 | `bio.gen.pedigree-human-genetics` | Pedigree Analysis and Human Genetic Disorders |
| 426 | biology | 12 | `bio.gen.mutations` | Mutations |
| 427 | biology | 12 | `bio.dev.morphogenesis-differentiation` | Morphogenesis and Cell Differentiation |
| 428 | biology | 12 | `bio.immuno.immune-disorders` | Immune Disorders |
| 429 | biology | 12 | `bio.cell.apoptosis` | Apoptosis and Programmed Cell Death |
| 430 | biology | 12 | `bio.mol.epigenetics` | Epigenetics and Chromatin Regulation |
| 431 | biology | 12 | `bio.mol.noncoding-rna` | Non-coding RNA Biology |
| 432 | computer_science | 12 | `cs.data.tuples` | Tuples |
| 433 | computer_science | 12 | `cs.data.dictionaries` | Dictionaries |
| 434 | computer_science | 12 | `cs.func.scope-namespaces` | Scope and Namespaces |
| 435 | computer_science | 12 | `cs.file.text-files` | Text File Handling |
| 436 | computer_science | 12 | `cs.struct.linear-search` | Linear Search |
| 437 | computer_science | 12 | `cs.oop.oop-concepts` | Object-Oriented Programming Concepts |
| 438 | mathematics | 13 | `math.found.irrational-numbers` | Irrational Numbers |
| 439 | mathematics | 13 | `math.arith.ones-tens-hundreds` | Ones, Tens, Hundreds |
| 440 | mathematics | 13 | `math.arith.expanded-form` | Expanded Form |
| 441 | mathematics | 13 | `math.arith.number-base` | Number Base |
| 442 | mathematics | 13 | `math.arith.addition` | Addition |
| 443 | mathematics | 13 | `math.arith.ordering` | Ordering Numbers |
| 444 | mathematics | 13 | `math.seq.partial-sums` | Partial Sums |
| 445 | mathematics | 13 | `math.seq.arithmetic-series` | Arithmetic Series |
| 446 | mathematics | 13 | `math.seq.geometric-series` | Geometric Series |
| 447 | mathematics | 13 | `math.prob.marginal-distribution` | Marginal Distribution |
| 448 | mathematics | 13 | `math.prob.conditional-distribution` | Conditional Distribution |
| 449 | mathematics | 13 | `math.abst.quotient-group` | Quotient Group |
| 450 | mathematics | 13 | `math.abst.alternating-group` | Alternating Group |
| 451 | mathematics | 13 | `math.abst.pid` | Principal Ideal Domain |
| 452 | mathematics | 13 | `math.abst.field` | Field |
| 453 | mathematics | 13 | `math.cat.representable-functor` | Representable Functor |
| 454 | mathematics | 13 | `math.cat.higher-category` | Higher Category Theory |
| 455 | english | 13 | `eng.vocab.word-formation-processes` | Word Formation Processes |
| 456 | english | 13 | `eng.vocab.idioms` | Idioms |
| 457 | english | 13 | `eng.vocab.phrasal-verbs` | Phrasal Verbs |
| 458 | english | 13 | `eng.vocab.etymology` | Etymology |
| 459 | english | 13 | `eng.vocab.thesaurus-and-dictionary-skills` | Thesaurus and Dictionary Skills |
| 460 | english | 13 | `eng.grammar.adverbs` | Adverbs |
| 461 | english | 13 | `eng.grammar.word-order` | Basic Word Order |
| 462 | english | 13 | `eng.grammar.past-tenses` | Past Tenses |
| 463 | english | 13 | `eng.grammar.future-tenses` | Future Tenses |
| 464 | english | 13 | `eng.grammar.modals` | Modal Verbs |
| 465 | english | 13 | `eng.grammar.gerunds-and-infinitives` | Gerunds and Infinitives |
| 466 | english | 13 | `eng.grammar.subject-verb-agreement` | Subject-Verb Agreement |
| 467 | english | 13 | `eng.reading.literal-comprehension` | Literal Comprehension |
| 468 | english | 13 | `eng.reading.skimming-and-scanning` | Skimming and Scanning |
| 469 | english | 13 | `eng.listening.listening-comprehension-strategies` | Listening Comprehension Strategies |
| 470 | english | 13 | `eng.speaking.discussion-skills` | Discussion Skills |
| 471 | english | 13 | `eng.communication.digital-communication` | Digital Communication |
| 472 | biology | 13 | `bio.gen.population-genetics` | Population Genetics |
| 473 | biology | 13 | `bio.gen.genetic-engineering` | Genetic Engineering and Recombinant DNA |
| 474 | biology | 13 | `bio.dev.stem-cells-regeneration` | Stem Cells and Regeneration |
| 475 | biology | 13 | `bio.mol.dna-damage-repair` | DNA Damage Response and Repair |
| 476 | biology | 13 | `bio.gen.transposable-elements` | Transposable Elements and Genome Organisation |
| 477 | biology | 13 | `bio.evo.evo-devo` | Evolutionary Developmental Biology |
| 478 | computer_science | 13 | `cs.data.sets` | Sets |
| 479 | computer_science | 13 | `cs.func.recursion` | Recursion |
| 480 | computer_science | 13 | `cs.file.csv-files` | CSV File Handling |
| 481 | computer_science | 13 | `cs.file.binary-serialisation` | Binary Files and Serialisation |
| 482 | computer_science | 13 | `cs.struct.hashing-hash-tables` | Hashing and Hash Tables |
| 483 | computer_science | 13 | `cs.struct.binary-search` | Binary Search |
| 484 | computer_science | 13 | `cs.oop.classes-objects-python` | Classes and Objects in Python |
| 485 | computer_science | 13 | `cs.db.database-concepts` | Database Concepts |
| 486 | computer_science | 13 | `cs.se.sdlc` | Software Development Life Cycle |
| 487 | mathematics | 14 | `math.found.real-numbers` | Real Numbers |
| 488 | mathematics | 14 | `math.arith.carrying` | Carrying (Regrouping) |
| 489 | mathematics | 14 | `math.arith.mental-addition` | Mental Addition |
| 490 | mathematics | 14 | `math.arith.subtraction` | Subtraction |
| 491 | mathematics | 14 | `math.arith.multiplication` | Multiplication |
| 492 | mathematics | 14 | `math.seq.infinite-geometric-series` | Infinite Geometric Series |
| 493 | mathematics | 14 | `math.seq.telescoping-series` | Telescoping Series |
| 494 | mathematics | 14 | `math.prob.conditional-expectation` | Conditional Expectation |
| 495 | mathematics | 14 | `math.abst.first-isomorphism-theorem` | First Isomorphism Theorem |
| 496 | mathematics | 14 | `math.abst.ufd` | Unique Factorization Domain |
| 497 | mathematics | 14 | `math.abst.field-extension` | Field Extension |
| 498 | english | 14 | `eng.vocab.academic-vocabulary` | Academic Vocabulary |
| 499 | english | 14 | `eng.vocab.semantic-fields` | Semantic Fields |
| 500 | english | 14 | `eng.grammar.sentence-types-by-function` | Sentence Types by Function |
| 501 | english | 14 | `eng.grammar.phrases` | Phrases |
| 502 | english | 14 | `eng.grammar.tense-consistency` | Tense Consistency |
| 503 | english | 14 | `eng.grammar.conditionals` | Conditional Sentences |
| 504 | english | 14 | `eng.grammar.participles-and-participial-phrases` | Participles and Participial Phrases |
| 505 | english | 14 | `eng.grammar.pronoun-antecedent-agreement` | Pronoun-Antecedent Agreement |
| 506 | english | 14 | `eng.grammar.comparatives-and-superlatives` | Comparatives and Superlatives |
| 507 | english | 14 | `eng.reading.main-idea-and-details` | Main Idea and Supporting Details |
| 508 | english | 14 | `eng.listening.critical-listening` | Critical Listening |
| 509 | english | 14 | `eng.speaking.public-speaking-basics` | Public Speaking Basics |
| 510 | chemistry | 14 | `chem.state.liquids` | Liquid State Properties |
| 511 | chemistry | 14 | `chem.elect.standard-electrode` | Standard Electrode Potential |
| 512 | chemistry | 14 | `chem.elect.electrolysis` | Electrolysis and Faraday's Laws |
| 513 | chemistry | 14 | `chem.elect.batteries` | Batteries and Fuel Cells |
| 514 | chemistry | 14 | `chem.elect.corrosion` | Corrosion |
| 515 | chemistry | 14 | `chem.coord.isomerism` | Isomerism in Complexes |
| 516 | chemistry | 14 | `chem.coord.bonding` | Bonding in Complexes |
| 517 | chemistry | 14 | `chem.coord.applications` | Applications of Coordination Chemistry |
| 518 | chemistry | 14 | `chem.sblock.water` | Chemistry of Water |
| 519 | chemistry | 14 | `chem.dblock.organometallics` | Organometallic Chemistry |
| 520 | chemistry | 14 | `chem.org.reactive-intermediates` | Reactive Intermediates |
| 521 | chemistry | 14 | `chem.hyd.arenes` | Benzene and Arenes |
| 522 | chemistry | 14 | `chem.hyd.conformations` | Conformational Analysis |
| 523 | chemistry | 14 | `chem.hyd.petroleum` | Petroleum Refining |
| 524 | chemistry | 14 | `chem.hal.introduction` | Haloalkanes and Haloarenes |
| 525 | biology | 14 | `bio.evo.modern-synthesis-speciation` | Modern Synthesis and Speciation |
| 526 | biology | 14 | `bio.biotech.biotech-principles` | Principles of Biotechnology |
| 527 | computer_science | 14 | `cs.data.comprehensions-iterators` | Comprehensions, Iterators and Generators |
| 528 | computer_science | 14 | `cs.func.lambda-functional` | Lambda Expressions and Functional Tools |
| 529 | computer_science | 14 | `cs.struct.stacks` | Stacks |
| 530 | computer_science | 14 | `cs.struct.elementary-sorts` | Elementary Sorting — Bubble, Selection, Insertion |
| 531 | computer_science | 14 | `cs.oop.encapsulation-abstraction` | Encapsulation and Abstraction |
| 532 | computer_science | 14 | `cs.db.er-modeling` | Entity-Relationship Modeling |
| 533 | computer_science | 14 | `cs.se.version-control-git` | Version Control with Git |
| 534 | mathematics | 15 | `math.found.complex-numbers` | Complex Numbers |
| 535 | mathematics | 15 | `math.arith.column-addition` | Column Addition |
| 536 | mathematics | 15 | `math.arith.borrowing` | Borrowing (Regrouping in Subtraction) |
| 537 | mathematics | 15 | `math.arith.negative-numbers` | Negative Numbers |
| 538 | mathematics | 15 | `math.arith.multiplication-table` | Multiplication Table |
| 539 | mathematics | 15 | `math.arith.division` | Division |
| 540 | mathematics | 15 | `math.arith.exponentiation` | Exponentiation |
| 541 | mathematics | 15 | `math.geom.coordinate-plane` | Coordinate Plane |
| 542 | mathematics | 15 | `math.func.real-valued-function` | Real-Valued Function |
| 543 | mathematics | 15 | `math.prob.martingale` | Martingale |
| 544 | mathematics | 15 | `math.disc.counting-principles` | Counting Principles |
| 545 | mathematics | 15 | `math.abst.second-isomorphism-theorem` | Second and Third Isomorphism Theorems |
| 546 | mathematics | 15 | `math.abst.algebraic-extension` | Algebraic Extension |
| 547 | mathematics | 15 | `math.real.completeness` | Completeness of ℝ |
| 548 | mathematics | 15 | `math.real.metric-space` | Metric Space |
| 549 | english | 15 | `eng.grammar.question-formation` | Question Formation |
| 550 | english | 15 | `eng.grammar.negation` | Negation |
| 551 | english | 15 | `eng.grammar.clauses` | Independent and Dependent Clauses |
| 552 | english | 15 | `eng.grammar.active-and-passive-voice` | Active and Passive Voice |
| 553 | english | 15 | `eng.grammar.direct-and-indirect-speech` | Direct and Indirect Speech |
| 554 | english | 15 | `eng.grammar.capitalization-rules` | Capitalization Rules |
| 555 | english | 15 | `eng.reading.inference-in-reading` | Inference in Reading |
| 556 | english | 15 | `eng.reading.summarizing` | Summarizing |
| 557 | english | 15 | `eng.reading.text-structure` | Text Structure |
| 558 | english | 15 | `eng.speaking.presentation-skills` | Presentation Skills |
| 559 | chemistry | 15 | `chem.state.phase-diagram` | Phase Diagrams |
| 560 | chemistry | 15 | `chem.sol.vapour-pressure` | Vapour Pressure of Solutions |
| 561 | chemistry | 15 | `chem.elect.nernst` | Nernst Equation |
| 562 | chemistry | 15 | `chem.elect.industrial` | Industrial Electrolysis |
| 563 | chemistry | 15 | `chem.surface.surfactants` | Surfactants and Micelles |
| 564 | chemistry | 15 | `chem.org.mechanisms` | Organic Reaction Mechanisms |
| 565 | chemistry | 15 | `chem.hyd.polycyclic` | Polycyclic and Heterocyclic Systems |
| 566 | chemistry | 15 | `chem.hal.sn1` | SN1 Mechanism |
| 567 | chemistry | 15 | `chem.hal.sn2` | SN2 Mechanism |
| 568 | chemistry | 15 | `chem.hal.haloarenes` | Haloarenes |
| 569 | chemistry | 15 | `chem.hal.cfcs` | Polyhalogen Compounds and CFCs |
| 570 | chemistry | 15 | `chem.nitro.nitro-compounds` | Nitro Compounds |
| 571 | biology | 15 | `bio.evo.human-evolution` | Human Evolution |
| 572 | biology | 15 | `bio.biotech.biotech-process-applications` | Biotechnology Process Applications |
| 573 | computer_science | 15 | `cs.func.modules-packages` | Modules and Packages |
| 574 | computer_science | 15 | `cs.struct.queues` | Queues |
| 575 | computer_science | 15 | `cs.struct.efficient-sorts` | Efficient Sorting — Merge Sort and Quick Sort |
| 576 | computer_science | 15 | `cs.oop.inheritance` | Inheritance |
| 577 | computer_science | 15 | `cs.db.relational-model` | The Relational Model |
| 578 | computer_science | 15 | `cs.se.software-testing` | Software Testing Fundamentals |
| 579 | mathematics | 16 | `math.arith.absolute-value` | Absolute Value |
| 580 | mathematics | 16 | `math.arith.integer-arithmetic` | Integer Arithmetic |
| 581 | mathematics | 16 | `math.arith.long-multiplication` | Long Multiplication |
| 582 | mathematics | 16 | `math.arith.mental-multiplication` | Mental Multiplication |
| 583 | mathematics | 16 | `math.arith.remainder` | Remainder |
| 584 | mathematics | 16 | `math.arith.divisor-dividend` | Divisor and Dividend |
| 585 | mathematics | 16 | `math.arith.order-of-operations` | Order of Operations |
| 586 | mathematics | 16 | `math.arith.exponent-rules` | Exponent Rules |
| 587 | mathematics | 16 | `math.arith.square-numbers` | Perfect Squares |
| 588 | mathematics | 16 | `math.arith.cube-numbers` | Perfect Cubes |
| 589 | mathematics | 16 | `math.nt.divisibility` | Divisibility |
| 590 | mathematics | 16 | `math.nt.division-algorithm` | Division Algorithm |
| 591 | mathematics | 16 | `math.geom.circle-equation` | Equation of a Circle |
| 592 | mathematics | 16 | `math.geom.x-y-coordinates` | Cartesian Coordinates |
| 593 | mathematics | 16 | `math.geom.quadrants` | Quadrants |
| 594 | mathematics | 16 | `math.geom.midpoint-formula` | Midpoint Formula |
| 595 | mathematics | 16 | `math.geom.slope` | Slope |
| 596 | mathematics | 16 | `math.geom.transformations` | Geometric Transformations |
| 597 | mathematics | 16 | `math.geom.vectors-2d` | Vectors in 2D |
| 598 | mathematics | 16 | `math.func.graph-of-function` | Graph of a Function |
| 599 | mathematics | 16 | `math.calc.limits` | Limit of a Function |
| 600 | mathematics | 16 | `math.calc.parametric-curves` | Parametric Equations and Curves |
| 601 | mathematics | 16 | `math.prob.classical-probability` | Classical Probability |
| 602 | mathematics | 16 | `math.disc.permutations` | Permutations |
| 603 | mathematics | 16 | `math.disc.pigeonhole` | Pigeonhole Principle |
| 604 | mathematics | 16 | `math.abst.galois-theory` | Galois Theory |
| 605 | mathematics | 16 | `math.real.sup-inf` | Supremum and Infimum |
| 606 | mathematics | 16 | `math.real.archimedean` | Archimedean Property |
| 607 | mathematics | 16 | `math.real.convergence-sequences` | Convergence of Sequences |
| 608 | mathematics | 16 | `math.real.open-sets` | Open and Closed Sets |
| 609 | english | 16 | `eng.grammar.simple-sentences` | Simple Sentences |
| 610 | english | 16 | `eng.grammar.end-punctuation` | End Punctuation |
| 611 | english | 16 | `eng.reading.predicting-and-confirming` | Predicting and Confirming |
| 612 | english | 16 | `eng.reading.genre-recognition` | Genre Recognition |
| 613 | english | 16 | `eng.reading.authors-purpose-and-tone` | Author's Purpose and Tone |
| 614 | english | 16 | `eng.reading.compare-and-contrast-texts` | Comparing and Contrasting Texts |
| 615 | english | 16 | `eng.speaking.debate-skills` | Debate Skills |
| 616 | chemistry | 16 | `chem.sol.colligative` | Colligative Properties |
| 617 | chemistry | 16 | `chem.sol.activity` | Activity and Non-ideal Solutions |
| 618 | chemistry | 16 | `chem.elect.concentration-cell` | Concentration Cells |
| 619 | chemistry | 16 | `chem.org.arrow-pushing` | Electron Flow and Arrow Notation |
| 620 | chemistry | 16 | `chem.org.pericyclic` | Pericyclic Reactions |
| 621 | chemistry | 16 | `chem.hyd.alkenes` | Alkenes |
| 622 | chemistry | 16 | `chem.hal.elimination` | Elimination Reactions |
| 623 | chemistry | 16 | `chem.hal.grignard` | Grignard and Organolithium Reagents |
| 624 | chemistry | 16 | `chem.alc.alcohols` | Alcohols |
| 625 | biology | 16 | `bio.biotech.genomics-proteomics` | Genomics and Proteomics |
| 626 | computer_science | 16 | `cs.func.decorators` | Decorators |
| 627 | computer_science | 16 | `cs.struct.deques-priority-queues` | Deques and Priority Queues |
| 628 | computer_science | 16 | `cs.struct.linked-lists` | Singly Linked Lists |
| 629 | computer_science | 16 | `cs.oop.polymorphism-overloading` | Polymorphism and Operator Overloading |
| 630 | computer_science | 16 | `cs.db.normalisation` | Normalisation |
| 631 | computer_science | 16 | `cs.db.sql-ddl-dml` | SQL — DDL and DML Basics |
| 632 | computer_science | 16 | `cs.ds.numpy-arrays` | NumPy for Numerical Computing |
| 633 | mathematics | 17 | `math.arith.long-division` | Long Division |
| 634 | mathematics | 17 | `math.arith.fraction-equivalence` | Equivalent Fractions |
| 635 | mathematics | 17 | `math.arith.fraction-multiplication` | Multiplication and Division of Fractions |
| 636 | mathematics | 17 | `math.arith.fraction-reciprocal` | Reciprocal |
| 637 | mathematics | 17 | `math.arith.mixed-numbers` | Mixed Numbers |
| 638 | mathematics | 17 | `math.arith.improper-fractions` | Improper Fractions |
| 639 | mathematics | 17 | `math.arith.decimals` | Decimals |
| 640 | mathematics | 17 | `math.arith.ratios` | Ratio |
| 641 | mathematics | 17 | `math.arith.square-roots` | Square Roots |
| 642 | mathematics | 17 | `math.arith.mental-arithmetic` | Mental Arithmetic |
| 643 | mathematics | 17 | `math.nt.divisibility-rules` | Divisibility Rules |
| 644 | mathematics | 17 | `math.nt.prime-number` | Prime Number |
| 645 | mathematics | 17 | `math.nt.modular-arithmetic` | Modular Arithmetic |
| 646 | mathematics | 17 | `math.nt.induction-applications` | Induction in Number Theory |
| 647 | mathematics | 17 | `math.alg.expression` | Algebraic Expression |
| 648 | mathematics | 17 | `math.geom.pythagorean-theorem` | Pythagorean Theorem |
| 649 | mathematics | 17 | `math.geom.line-equation` | Equations of Lines |
| 650 | mathematics | 17 | `math.geom.translation` | Translation |
| 651 | mathematics | 17 | `math.geom.reflection` | Reflection |
| 652 | mathematics | 17 | `math.geom.vectors-3d` | Vectors in 3D |
| 653 | mathematics | 17 | `math.func.zero-of-function` | Zero of a Function |
| 654 | mathematics | 17 | `math.func.even-odd-functions` | Even and Odd Functions |
| 655 | mathematics | 17 | `math.func.transformations-functions` | Transformations of Functions |
| 656 | mathematics | 17 | `math.func.linear-function` | Linear Function |
| 657 | mathematics | 17 | `math.seq.convergent` | Convergent Sequence |
| 658 | mathematics | 17 | `math.calc.limit-laws` | Limit Laws |
| 659 | mathematics | 17 | `math.calc.one-sided-limits` | One-Sided Limits |
| 660 | mathematics | 17 | `math.calc.limits-at-infinity` | Limits at Infinity |
| 661 | mathematics | 17 | `math.calc.continuity` | Continuity |
| 662 | mathematics | 17 | `math.calc.derivative-intro` | Slope of Tangent and Rate of Change |
| 663 | mathematics | 17 | `math.calc.riemann-sums` | Riemann Sums |
| 664 | mathematics | 17 | `math.calc.sequence-limits` | Limits of Sequences (Calculus) |
| 665 | mathematics | 17 | `math.linalg.vector` | Vector |
| 666 | mathematics | 17 | `math.prob.convergence-types` | Modes of Convergence |
| 667 | mathematics | 17 | `math.stats.population-sample` | Population and Sample |
| 668 | mathematics | 17 | `math.disc.combinations` | Combinations |
| 669 | mathematics | 17 | `math.disc.asymptotic-notation` | Asymptotic Notation |
| 670 | mathematics | 17 | `math.abst.galois-group` | Galois Group |
| 671 | mathematics | 17 | `math.real.cauchy-sequence` | Cauchy Sequence |
| 672 | mathematics | 17 | `math.real.series-rigorous` | Series (Rigorous) |
| 673 | mathematics | 17 | `math.real.compactness` | Compactness |
| 674 | mathematics | 17 | `math.real.connectedness` | Connectedness |
| 675 | mathematics | 17 | `math.real.pointwise-convergence` | Pointwise Convergence |
| 676 | mathematics | 17 | `math.graph.ramsey-theory` | Ramsey Theory |
| 677 | english | 17 | `eng.grammar.compound-sentences` | Compound Sentences |
| 678 | english | 17 | `eng.grammar.comma-usage` | Comma Usage |
| 679 | english | 17 | `eng.grammar.sentence-fragments` | Sentence Fragments |
| 680 | english | 17 | `eng.reading.close-reading` | Close Reading |
| 681 | english | 17 | `eng.writing.sentence-writing` | Sentence Writing |
| 682 | chemistry | 17 | `chem.sol.osmosis` | Osmosis and Osmotic Pressure |
| 683 | chemistry | 17 | `chem.hyd.alkynes` | Alkynes |
| 684 | chemistry | 17 | `chem.alc.phenols` | Phenols |
| 685 | chemistry | 17 | `chem.alc.ethers` | Ethers |
| 686 | chemistry | 17 | `chem.alc.diols` | Diols and Polyols |
| 687 | chemistry | 17 | `chem.carb.aldehydes` | Aldehydes |
| 688 | chemistry | 17 | `chem.nitro.amines` | Amines |
| 689 | chemistry | 17 | `chem.poly.addition` | Addition Polymerization |
| 690 | biology | 17 | `bio.biotech.crispr-genome-editing` | CRISPR and Genome Editing |
| 691 | biology | 17 | `bio.bioinfo.bioinformatics-intro` | Introduction to Bioinformatics |
| 692 | computer_science | 17 | `cs.struct.doubly-circular-lists` | Doubly and Circular Linked Lists |
| 693 | computer_science | 17 | `cs.struct.trees` | Trees |
| 694 | computer_science | 17 | `cs.oop.class-static-methods` | Class Methods and Static Methods |
| 695 | computer_science | 17 | `cs.db.sql-queries-functions` | SQL — Queries and Aggregate Functions |
| 696 | computer_science | 17 | `cs.ds.pandas-dataframes` | Pandas for Data Analysis |
| 697 | mathematics | 18 | `math.arith.decimal-operations` | Decimal Operations |
| 698 | mathematics | 18 | `math.arith.terminating-decimals` | Terminating Decimals |
| 699 | mathematics | 18 | `math.arith.repeating-decimals` | Repeating Decimals |
| 700 | mathematics | 18 | `math.arith.percentages` | Percentages |
| 701 | mathematics | 18 | `math.arith.proportion` | Proportion |
| 702 | mathematics | 18 | `math.arith.unit-rate` | Unit Rate |
| 703 | mathematics | 18 | `math.arith.rounding` | Rounding |
| 704 | mathematics | 18 | `math.arith.irrational-roots` | Irrational Square Roots |
| 705 | mathematics | 18 | `math.arith.scientific-notation` | Scientific Notation |
| 706 | mathematics | 18 | `math.nt.composite-number` | Composite Number |
| 707 | mathematics | 18 | `math.nt.sieve-of-eratosthenes` | Sieve of Eratosthenes |
| 708 | mathematics | 18 | `math.nt.prime-factorization` | Prime Factorization |
| 709 | mathematics | 18 | `math.nt.congruence` | Congruence |
| 710 | mathematics | 18 | `math.nt.fermats-little-theorem` | Fermat's Little Theorem |
| 711 | mathematics | 18 | `math.nt.prime-distribution` | Distribution of Primes |
| 712 | mathematics | 18 | `math.alg.term` | Term |
| 713 | mathematics | 18 | `math.alg.equation` | Equation |
| 714 | mathematics | 18 | `math.alg.polynomial` | Polynomial |
| 715 | mathematics | 18 | `math.alg.exponent-rules` | Exponent Rules (Algebraic) |
| 716 | mathematics | 18 | `math.geom.pythagorean-converse` | Converse of the Pythagorean Theorem |
| 717 | mathematics | 18 | `math.geom.similar-triangles` | Similar Triangles |
| 718 | mathematics | 18 | `math.geom.distance-formula` | Distance Formula |
| 719 | mathematics | 18 | `math.geom.dilation` | Dilation |
| 720 | mathematics | 18 | `math.geom.cross-product` | Cross Product |
| 721 | mathematics | 18 | `math.geom.differential-geometry-curves` | Curves in Space |
| 722 | mathematics | 18 | `math.seq.divergent-sequence` | Divergent Sequence |
| 723 | mathematics | 18 | `math.seq.series-convergence` | Convergence of Series |
| 724 | mathematics | 18 | `math.calc.squeeze-theorem` | Squeeze Theorem |
| 725 | mathematics | 18 | `math.calc.continuity-types` | Types of Discontinuity |
| 726 | mathematics | 18 | `math.calc.ivt` | Intermediate Value Theorem |
| 727 | mathematics | 18 | `math.calc.derivative-definition` | Derivative (Definition) |
| 728 | mathematics | 18 | `math.calc.definite-integral` | Definite Integral |
| 729 | mathematics | 18 | `math.calc.line-integrals` | Line Integrals |
| 730 | mathematics | 18 | `math.linalg.vector-addition` | Vector Addition |
| 731 | mathematics | 18 | `math.linalg.scalar-multiplication` | Scalar Multiplication |
| 732 | mathematics | 18 | `math.linalg.dot-product` | Dot Product |
| 733 | mathematics | 18 | `math.linalg.matrix` | Matrix |
| 734 | mathematics | 18 | `math.prob.combinatorial-probability` | Combinatorial Probability |
| 735 | mathematics | 18 | `math.stats.descriptive-statistics` | Descriptive Statistics |
| 736 | mathematics | 18 | `math.stats.sampling` | Sampling Methods |
| 737 | mathematics | 18 | `math.disc.binomial-theorem` | Binomial Theorem |
| 738 | mathematics | 18 | `math.disc.combinatorics` | Combinatorics |
| 739 | mathematics | 18 | `math.disc.stars-bars` | Stars and Bars |
| 740 | mathematics | 18 | `math.disc.inclusion-exclusion` | Inclusion-Exclusion Principle |
| 741 | mathematics | 18 | `math.abst.sylow-theorems` | Sylow Theorems |
| 742 | mathematics | 18 | `math.abst.finite-field` | Finite Field |
| 743 | mathematics | 18 | `math.abst.galois-correspondence` | Fundamental Theorem of Galois Theory |
| 744 | mathematics | 18 | `math.real.absolute-convergence` | Absolute Convergence |
| 745 | mathematics | 18 | `math.real.completeness-metric` | Completeness of Metric Spaces |
| 746 | mathematics | 18 | `math.real.continuity-rigorous` | Continuity (ε-δ) |
| 747 | mathematics | 18 | `math.opt.convex-set` | Convex Set |
| 748 | mathematics | 18 | `math.graph.shortest-path` | Shortest Path Algorithms |
| 749 | english | 18 | `eng.grammar.complex-sentences` | Complex Sentences |
| 750 | english | 18 | `eng.grammar.parallel-structure` | Parallel Structure |
| 751 | english | 18 | `eng.grammar.apostrophes` | Apostrophes |
| 752 | english | 18 | `eng.grammar.quotation-marks` | Quotation Marks |
| 753 | english | 18 | `eng.grammar.colons-semicolons-dashes` | Colons, Semicolons, and Dashes |
| 754 | english | 18 | `eng.grammar.run-on-sentences-and-comma-splices` | Run-On Sentences and Comma Splices |
| 755 | english | 18 | `eng.reading.critical-reading` | Critical Reading |
| 756 | english | 18 | `eng.writing.paragraph-structure` | Paragraph Structure |
| 757 | english | 18 | `eng.literature.narrative-elements` | Narrative Elements |
| 758 | chemistry | 18 | `chem.alc.epoxides` | Epoxides |
| 759 | chemistry | 18 | `chem.alc.protection` | Protecting Group Strategy |
| 760 | chemistry | 18 | `chem.carb.ketones` | Ketones |
| 761 | chemistry | 18 | `chem.carb.carboxylic` | Carboxylic Acids |
| 762 | chemistry | 18 | `chem.nitro.diazonium` | Diazonium Salts |
| 763 | chemistry | 18 | `chem.nitro.heterocycles` | Nitrogen Heterocycles |
| 764 | chemistry | 18 | `chem.bio.carbohydrates` | Carbohydrates |
| 765 | biology | 18 | `bio.bioinfo.sequence-alignment` | Sequence Alignment |
| 766 | biology | 18 | `bio.sys.systems-biology-intro` | Introduction to Systems Biology |
| 767 | computer_science | 18 | `cs.struct.binary-search-trees` | Binary Search Trees |
| 768 | computer_science | 18 | `cs.struct.heaps` | Heaps |
| 769 | computer_science | 18 | `cs.struct.graphs-representation` | Graphs and Their Representations |
| 770 | computer_science | 18 | `cs.oop.design-patterns-intro` | Introduction to Design Patterns |
| 771 | computer_science | 18 | `cs.db.sql-joins-subqueries` | SQL — Joins and Subqueries |
| 772 | computer_science | 18 | `cs.ds.data-visualisation` | Data Visualisation with Matplotlib |
| 773 | mathematics | 19 | `math.arith.percentage-calculations` | Percentage Calculations |
| 774 | mathematics | 19 | `math.arith.direct-variation` | Direct Variation |
| 775 | mathematics | 19 | `math.arith.inverse-variation` | Inverse Variation |
| 776 | mathematics | 19 | `math.arith.estimation` | Estimation |
| 777 | mathematics | 19 | `math.arith.significant-figures` | Significant Figures |
| 778 | mathematics | 19 | `math.nt.fundamental-theorem-arithmetic` | Fundamental Theorem of Arithmetic |
| 779 | mathematics | 19 | `math.nt.gcd` | Greatest Common Divisor |
| 780 | mathematics | 19 | `math.nt.residue-classes` | Residue Classes |
| 781 | mathematics | 19 | `math.nt.eulers-theorem` | Euler's Theorem |
| 782 | mathematics | 19 | `math.nt.eulers-totient` | Euler's Totient Function |
| 783 | mathematics | 19 | `math.nt.primality-testing` | Primality Testing |
| 784 | mathematics | 19 | `math.alg.coefficient` | Coefficient |
| 785 | mathematics | 19 | `math.alg.solution-set` | Solution Set |
| 786 | mathematics | 19 | `math.alg.degree` | Degree of a Polynomial |
| 787 | mathematics | 19 | `math.alg.zero-exponent` | Zero Exponent |
| 788 | mathematics | 19 | `math.alg.negative-exponent` | Negative Exponent |
| 789 | mathematics | 19 | `math.alg.radicals` | Radical Expressions |
| 790 | mathematics | 19 | `math.alg.exponential-function` | Exponential Function |
| 791 | mathematics | 19 | `math.alg.inequality` | Inequality |
| 792 | mathematics | 19 | `math.alg.binomial-theorem` | Binomial Theorem |
| 793 | mathematics | 19 | `math.trig.right-triangle-trig` | Right-Triangle Trigonometry |
| 794 | mathematics | 19 | `math.seq.divergence-test` | Divergence Test (nth Term Test) |
| 795 | mathematics | 19 | `math.seq.comparison-test` | Comparison Test |
| 796 | mathematics | 19 | `math.seq.ratio-test` | Ratio Test |
| 797 | mathematics | 19 | `math.seq.root-test` | Root Test |
| 798 | mathematics | 19 | `math.seq.alternating-series` | Alternating Series |
| 799 | mathematics | 19 | `math.seq.harmonic-series` | Harmonic Series |
| 800 | mathematics | 19 | `math.calc.differentiability` | Differentiability |
| 801 | mathematics | 19 | `math.calc.derivative-rules` | Basic Differentiation Rules |
| 802 | mathematics | 19 | `math.calc.lhopitals-rule` | L'Hôpital's Rule |
| 803 | mathematics | 19 | `math.calc.mean-value-theorem` | Mean Value Theorem |
| 804 | mathematics | 19 | `math.calc.linearization` | Linearization and Differentials |
| 805 | mathematics | 19 | `math.calc.ftc-part1` | Fundamental Theorem of Calculus Part 1 |
| 806 | mathematics | 19 | `math.calc.improper-integrals` | Improper Integrals |
| 807 | mathematics | 19 | `math.calc.integral-area` | Area by Integration |
| 808 | mathematics | 19 | `math.calc.power-series` | Power Series |
| 809 | mathematics | 19 | `math.calc.multivariable-intro` | Introduction to Multivariable Calculus |
| 810 | mathematics | 19 | `math.linalg.norm` | Vector Norm |
| 811 | mathematics | 19 | `math.linalg.orthogonality` | Orthogonality |
| 812 | mathematics | 19 | `math.linalg.cross-product` | Cross Product |
| 813 | mathematics | 19 | `math.linalg.matrix-addition` | Matrix Addition |
| 814 | mathematics | 19 | `math.linalg.matrix-multiplication` | Matrix Multiplication |
| 815 | mathematics | 19 | `math.linalg.matrix-transpose` | Matrix Transpose |
| 816 | mathematics | 19 | `math.linalg.vector-space` | Vector Space |
| 817 | mathematics | 19 | `math.prob.continuous-rv` | Continuous Random Variable |
| 818 | mathematics | 19 | `math.stats.measures-of-center` | Measures of Center |
| 819 | mathematics | 19 | `math.stats.measures-of-spread` | Measures of Spread |
| 820 | mathematics | 19 | `math.stats.data-visualization` | Data Visualization |
| 821 | mathematics | 19 | `math.disc.derangements` | Derangements |
| 822 | mathematics | 19 | `math.disc.recurrence-relation` | Recurrence Relation |
| 823 | mathematics | 19 | `math.disc.graph-representation` | Graph Representation |
| 824 | mathematics | 19 | `math.real.uniform-continuity` | Uniform Continuity |
| 825 | mathematics | 19 | `math.real.extreme-value-theorem` | Extreme Value Theorem |
| 826 | mathematics | 19 | `math.real.ivt` | Intermediate Value Theorem (Rigorous) |
| 827 | mathematics | 19 | `math.real.differentiability-rigorous` | Differentiability (Rigorous) |
| 828 | mathematics | 19 | `math.real.riemann-integral` | Riemann Integral (Rigorous) |
| 829 | mathematics | 19 | `math.real.uniform-convergence` | Uniform Convergence |
| 830 | mathematics | 19 | `math.real.baire-category` | Baire Category Theorem |
| 831 | mathematics | 19 | `math.graph.extremal-graph-theory` | Extremal Graph Theory |
| 832 | english | 19 | `eng.grammar.sentence-combining` | Sentence Combining |
| 833 | english | 19 | `eng.reading.evaluating-sources` | Evaluating Sources |
| 834 | english | 19 | `eng.writing.topic-sentences` | Topic Sentences |
| 835 | english | 19 | `eng.literature.plot-structure` | Plot Structure |
| 836 | english | 19 | `eng.literature.character-development` | Character Development |
| 837 | english | 19 | `eng.literature.setting-and-atmosphere` | Setting and Atmosphere |
| 838 | english | 19 | `eng.literature.point-of-view` | Point of View |
| 839 | english | 19 | `eng.literature.drama-basics` | Drama Basics |
| 840 | chemistry | 19 | `chem.carb.alpha-reactions` | Alpha-Carbon Reactions |
| 841 | chemistry | 19 | `chem.carb.derivatives` | Carboxylic Acid Derivatives |
| 842 | chemistry | 19 | `chem.carb.spectro` | Spectroscopic ID of Carbonyls |
| 843 | chemistry | 19 | `chem.nitro.amino-acids` | Amino Acids |
| 844 | biology | 19 | `bio.bioinfo.phylogenetics-computational` | Computational Phylogenetics |
| 845 | biology | 19 | `bio.bioinfo.structural-bioinformatics` | Structural Bioinformatics |
| 846 | biology | 19 | `bio.sys.gene-regulatory-networks` | Gene Regulatory Networks |
| 847 | biology | 19 | `bio.evo.molecular-evolution` | Molecular Evolution and Neutral Theory |
| 848 | computer_science | 19 | `cs.struct.balanced-trees` | Balanced Search Trees |
| 849 | computer_science | 19 | `cs.struct.graph-traversal` | Graph Traversal — BFS and DFS |
| 850 | computer_science | 19 | `cs.db.transactions-acid` | Transactions and the ACID Properties |
| 851 | computer_science | 19 | `cs.db.mysql-python` | Connecting Python to MySQL |
| 852 | computer_science | 19 | `cs.se.agile-design-principles` | Agile Practices and Software Design Principles |
| 853 | computer_science | 19 | `cs.ds.intro-machine-learning` | Introduction to Machine Learning |
| 854 | mathematics | 20 | `math.arith.fraction-simplification` | Fraction Simplification |
| 855 | mathematics | 20 | `math.arith.percentage-change` | Percentage Change |
| 856 | mathematics | 20 | `math.nt.euclidean-algorithm` | Euclidean Algorithm |
| 857 | mathematics | 20 | `math.nt.lcm` | Least Common Multiple |
| 858 | mathematics | 20 | `math.nt.chinese-remainder-theorem` | Chinese Remainder Theorem |
| 859 | mathematics | 20 | `math.alg.like-terms` | Like Terms |
| 860 | mathematics | 20 | `math.alg.fractional-exponent` | Fractional Exponent |
| 861 | mathematics | 20 | `math.alg.simplifying-radicals` | Simplifying Radical Expressions |
| 862 | mathematics | 20 | `math.alg.radical-equations` | Radical Equations |
| 863 | mathematics | 20 | `math.alg.exponential-equations` | Exponential Equations |
| 864 | mathematics | 20 | `math.alg.logarithm` | Logarithm |
| 865 | mathematics | 20 | `math.alg.pascals-triangle` | Pascal's Triangle |
| 866 | mathematics | 20 | `math.geom.curvature` | Curvature |
| 867 | mathematics | 20 | `math.trig.basic-ratios` | Six Trigonometric Ratios |
| 868 | mathematics | 20 | `math.trig.unit-circle` | Unit Circle |
| 869 | mathematics | 20 | `math.trig.law-of-sines` | Law of Sines |
| 870 | mathematics | 20 | `math.trig.law-of-cosines` | Law of Cosines |
| 871 | mathematics | 20 | `math.func.exponential-function` | Exponential Function |
| 872 | mathematics | 20 | `math.seq.integral-test` | Integral Test |
| 873 | mathematics | 20 | `math.seq.absolute-convergence` | Absolute and Conditional Convergence |
| 874 | mathematics | 20 | `math.calc.product-rule` | Product Rule |
| 875 | mathematics | 20 | `math.calc.chain-rule` | Chain Rule |
| 876 | mathematics | 20 | `math.calc.higher-order-derivatives` | Higher-Order Derivatives |
| 877 | mathematics | 20 | `math.calc.rolles-theorem` | Rolle's Theorem |
| 878 | mathematics | 20 | `math.calc.increasing-decreasing` | Increasing and Decreasing Functions |
| 879 | mathematics | 20 | `math.calc.critical-points` | Critical Points |
| 880 | mathematics | 20 | `math.calc.antiderivatives` | Antiderivatives |
| 881 | mathematics | 20 | `math.calc.volume-revolution` | Volumes of Revolution |
| 882 | mathematics | 20 | `math.calc.arc-length` | Arc Length |
| 883 | mathematics | 20 | `math.calc.radius-of-convergence` | Radius of Convergence |
| 884 | mathematics | 20 | `math.calc.partial-derivatives` | Partial Derivatives |
| 885 | mathematics | 20 | `math.calc.multiple-integrals` | Multiple Integrals |
| 886 | mathematics | 20 | `math.linalg.unit-vector` | Unit Vector |
| 887 | mathematics | 20 | `math.linalg.symmetric-matrix` | Symmetric Matrix |
| 888 | mathematics | 20 | `math.linalg.determinant` | Determinant |
| 889 | mathematics | 20 | `math.linalg.subspace` | Subspace |
| 890 | mathematics | 20 | `math.linalg.linear-map` | Linear Map |
| 891 | mathematics | 20 | `math.linalg.inner-product` | Inner Product |
| 892 | mathematics | 20 | `math.linalg.distance` | Distance in Vector Spaces |
| 893 | mathematics | 20 | `math.linalg.angle-vectors` | Angle Between Vectors |
| 894 | mathematics | 20 | `math.prob.pdf` | Probability Density Function |
| 895 | mathematics | 20 | `math.prob.generating-function` | Probability Generating Function |
| 896 | mathematics | 20 | `math.prob.markov-chain` | Markov Chain |
| 897 | mathematics | 20 | `math.stats.percentile` | Percentile |
| 898 | mathematics | 20 | `math.disc.generating-functions` | Generating Functions |
| 899 | mathematics | 20 | `math.disc.catalan-numbers` | Catalan Numbers |
| 900 | mathematics | 20 | `math.disc.stirling-numbers` | Stirling Numbers |
| 901 | mathematics | 20 | `math.real.lipschitz-continuity` | Lipschitz Continuity |
| 902 | mathematics | 20 | `math.real.mvt` | Mean Value Theorem (Rigorous) |
| 903 | mathematics | 20 | `math.real.riemann-integrability` | Riemann Integrability |
| 904 | mathematics | 20 | `math.real.ftc-rigorous` | Fundamental Theorem of Calculus (Rigorous) |
| 905 | mathematics | 20 | `math.real.weierstrass-approximation` | Weierstrass Approximation Theorem |
| 906 | mathematics | 20 | `math.top.smooth-manifold` | Smooth Manifold |
| 907 | mathematics | 20 | `math.fnal.normed-space` | Normed Space |
| 908 | mathematics | 20 | `math.num.floating-point` | Floating-Point Arithmetic |
| 909 | mathematics | 20 | `math.num.root-finding` | Root-Finding Methods |
| 910 | mathematics | 20 | `math.opt.dynamic-programming` | Dynamic Programming |
| 911 | english | 20 | `eng.reading.reading-across-genres` | Reading Across Genres |
| 912 | english | 20 | `eng.writing.supporting-details` | Supporting Details |
| 913 | english | 20 | `eng.literature.theme-and-message` | Theme and Message |
| 914 | english | 20 | `eng.literature.foreshadowing-and-suspense` | Foreshadowing and Suspense |
| 915 | english | 20 | `eng.literature.dramatic-structure` | Dramatic Structure |
| 916 | english | 20 | `eng.literature.prose-fiction` | Prose Fiction |
| 917 | english | 20 | `eng.linguistics.what-is-linguistics` | What Is Linguistics? |
| 918 | english | 20 | `eng.communication.media-literacy` | Media Literacy |
| 919 | chemistry | 20 | `chem.carb.named-reactions` | Named Carbonyl Reactions |
| 920 | chemistry | 20 | `chem.bio.proteins` | Proteins |
| 921 | chemistry | 20 | `chem.bio.lipids` | Lipids |
| 922 | chemistry | 20 | `chem.poly.condensation` | Condensation Polymerization |
| 923 | biology | 20 | `bio.sys.metabolic-network-modelling` | Metabolic Network Modelling |
| 924 | computer_science | 20 | `cs.struct.shortest-path-algorithms` | Shortest Path Algorithms |
| 925 | computer_science | 20 | `cs.db.indexing-query-optimisation` | Indexing and Query Optimisation |
| 926 | computer_science | 20 | `cs.db.nosql-intro` | Introduction to NoSQL Databases |
| 927 | computer_science | 20 | `cs.ds.supervised-learning-models` | Supervised Learning Models |
| 928 | computer_science | 20 | `cs.ds.unsupervised-learning-models` | Unsupervised Learning Models |
| 929 | mathematics | 21 | `math.arith.fraction-addition` | Addition and Subtraction of Fractions |
| 930 | mathematics | 21 | `math.nt.extended-euclidean-algorithm` | Extended Euclidean Algorithm |
| 931 | mathematics | 21 | `math.nt.continued-fractions` | Continued Fractions |
| 932 | mathematics | 21 | `math.alg.simplification` | Algebraic Simplification |
| 933 | mathematics | 21 | `math.alg.polynomial-operations` | Polynomial Operations |
| 934 | mathematics | 21 | `math.alg.rationalizing-denominators` | Rationalizing the Denominator |
| 935 | mathematics | 21 | `math.alg.logarithm-properties` | Logarithm Properties |
| 936 | mathematics | 21 | `math.alg.natural-logarithm` | Natural Logarithm |
| 937 | mathematics | 21 | `math.geom.frenet-serret` | Frenet-Serret Formulas |
| 938 | mathematics | 21 | `math.geom.differential-geometry-surfaces` | Differential Geometry of Surfaces |
| 939 | mathematics | 21 | `math.trig.special-angles` | Trigonometric Values at Special Angles |
| 940 | mathematics | 21 | `math.trig.reference-angles` | Reference Angles |
| 941 | mathematics | 21 | `math.trig.trig-functions` | Trigonometric Functions |
| 942 | mathematics | 21 | `math.func.logarithmic-function` | Logarithmic Function |
| 943 | mathematics | 21 | `math.calc.quotient-rule` | Quotient Rule |
| 944 | mathematics | 21 | `math.calc.derivative-exponential` | Derivative of Exponential Functions |
| 945 | mathematics | 21 | `math.calc.implicit-differentiation` | Implicit Differentiation |
| 946 | mathematics | 21 | `math.calc.local-extrema` | Local Extrema |
| 947 | mathematics | 21 | `math.calc.concavity` | Concavity and Inflection Points |
| 948 | mathematics | 21 | `math.calc.ftc-part2` | Fundamental Theorem of Calculus Part 2 |
| 949 | mathematics | 21 | `math.calc.surface-area-integral` | Surface Area of Revolution |
| 950 | mathematics | 21 | `math.calc.taylor-series` | Taylor Series |
| 951 | mathematics | 21 | `math.calc.parametric-calculus` | Calculus of Parametric Curves |
| 952 | mathematics | 21 | `math.calc.gradient` | Gradient |
| 953 | mathematics | 21 | `math.calc.chain-rule-multivariable` | Multivariable Chain Rule |
| 954 | mathematics | 21 | `math.calc.double-integrals` | Double Integrals |
| 955 | mathematics | 21 | `math.calc.change-of-variables` | Change of Variables (Jacobian) |
| 956 | mathematics | 21 | `math.de.ode` | Ordinary Differential Equation |
| 957 | mathematics | 21 | `math.linalg.matrix-inverse` | Matrix Inverse |
| 958 | mathematics | 21 | `math.linalg.cofactor-expansion` | Cofactor Expansion |
| 959 | mathematics | 21 | `math.linalg.det-properties` | Properties of Determinants |
| 960 | mathematics | 21 | `math.linalg.span` | Span |
| 961 | mathematics | 21 | `math.linalg.kernel-image` | Kernel and Image of Linear Map |
| 962 | mathematics | 21 | `math.linalg.eigenvalues` | Eigenvalues and Eigenvectors |
| 963 | mathematics | 21 | `math.linalg.inner-product-space` | Inner Product Space |
| 964 | mathematics | 21 | `math.linalg.projection` | Orthogonal Projection |
| 965 | mathematics | 21 | `math.linalg.tensor` | Tensor |
| 966 | mathematics | 21 | `math.linalg.dual-space` | Dual Space |
| 967 | mathematics | 21 | `math.prob.continuous-distributions` | Continuous Distributions |
| 968 | mathematics | 21 | `math.prob.expected-value` | Expected Value |
| 969 | mathematics | 21 | `math.prob.transition-matrix` | Transition Matrix |
| 970 | mathematics | 21 | `math.disc.divide-conquer-recurrence` | Divide-and-Conquer Recurrence |
| 971 | mathematics | 21 | `math.disc.ogf` | Ordinary Generating Function |
| 972 | mathematics | 21 | `math.disc.egf` | Exponential Generating Function |
| 973 | mathematics | 21 | `math.real.taylor-rigorous` | Taylor's Theorem (Rigorous) |
| 974 | mathematics | 21 | `math.real.fixed-point-theorem` | Banach Fixed-Point Theorem |
| 975 | mathematics | 21 | `math.fnal.completeness` | Completeness |
| 976 | mathematics | 21 | `math.num.error-analysis` | Error Analysis |
| 977 | mathematics | 21 | `math.num.newtons-method` | Newton's Method |
| 978 | physics | 21 | `phys.astro.gravitational-waves` | Gravitational Waves |
| 979 | physics | 21 | `phys.particle.electroweak-unification` | Electroweak Unification |
| 980 | physics | 21 | `phys.particle.feynman-diagrams` | Feynman Diagrams (Qualitative) |
| 981 | physics | 21 | `phys.particle.accelerators-detectors` | Particle Accelerators and Detectors |
| 982 | physics | 21 | `phys.mod.intrinsic-semiconductors` | Intrinsic Semiconductors |
| 983 | english | 21 | `eng.writing.transitions-and-cohesion` | Transitions and Cohesion |
| 984 | english | 21 | `eng.literature.literary-devices-overview` | Overview of Literary Devices |
| 985 | english | 21 | `eng.literature.prose-nonfiction` | Prose Nonfiction |
| 986 | english | 21 | `eng.linguistics.phonology-intro` | Introduction to Phonology |
| 987 | english | 21 | `eng.linguistics.morphology-intro` | Introduction to Morphology |
| 988 | chemistry | 21 | `chem.bio.nucleic-acids` | Nucleic Acids |
| 989 | chemistry | 21 | `chem.bio.vitamins` | Vitamins and Hormones |
| 990 | chemistry | 21 | `chem.bio.enzyme-kinetics` | Enzyme Kinetics |
| 991 | chemistry | 21 | `chem.poly.natural` | Natural Polymers |
| 992 | chemistry | 21 | `chem.poly.properties` | Polymer Properties |
| 993 | chemistry | 21 | `chem.poly.biodegradable` | Biodegradable and Functional Polymers |
| 994 | biology | 21 | `bio.sys.synthetic-biology` | Synthetic Biology |
| 995 | computer_science | 21 | `cs.struct.minimum-spanning-tree` | Minimum Spanning Trees |
| 996 | computer_science | 21 | `cs.ds.neural-networks-intro` | Introduction to Neural Networks |
| 997 | mathematics | 22 | `math.nt.bezout-identity` | Bézout's Identity |
| 998 | mathematics | 22 | `math.nt.modular-inverse` | Modular Inverse |
| 999 | mathematics | 22 | `math.alg.linear-equation-1var` | Linear Equation in One Variable |
| 1000 | mathematics | 22 | `math.alg.polynomial-division` | Polynomial Division |
| 1001 | mathematics | 22 | `math.alg.change-of-base` | Change of Base Formula |
| 1002 | mathematics | 22 | `math.alg.logarithmic-equations` | Logarithmic Equations |
| 1003 | mathematics | 22 | `math.geom.polar-coordinates` | Polar Coordinates |
| 1004 | mathematics | 22 | `math.geom.rotation` | Rotation |
| 1005 | mathematics | 22 | `math.geom.dot-product` | Dot Product |
| 1006 | mathematics | 22 | `math.trig.amplitude-period-phase` | Amplitude, Period, Phase Shift |
| 1007 | mathematics | 22 | `math.trig.trig-identities` | Trigonometric Identities |
| 1008 | mathematics | 22 | `math.trig.inverse-trig` | Inverse Trigonometric Functions |
| 1009 | mathematics | 22 | `math.trig.hyperbolic-functions` | Hyperbolic Functions |
| 1010 | mathematics | 22 | `math.calc.derivative-ln` | Derivative of Logarithmic Functions |
| 1011 | mathematics | 22 | `math.calc.derivative-trig` | Derivatives of Trigonometric Functions |
| 1012 | mathematics | 22 | `math.calc.related-rates` | Related Rates |
| 1013 | mathematics | 22 | `math.calc.optimization` | Optimization (Calculus) |
| 1014 | mathematics | 22 | `math.calc.curve-sketching` | Curve Sketching |
| 1015 | mathematics | 22 | `math.calc.u-substitution` | Integration by Substitution |
| 1016 | mathematics | 22 | `math.calc.maclaurin-series` | Maclaurin Series |
| 1017 | mathematics | 22 | `math.calc.taylor-remainder` | Taylor Remainder and Error Bound |
| 1018 | mathematics | 22 | `math.calc.directional-derivative` | Directional Derivative |
| 1019 | mathematics | 22 | `math.calc.multivariable-extrema` | Multivariable Extrema |
| 1020 | mathematics | 22 | `math.calc.triple-integrals` | Triple Integrals |
| 1021 | mathematics | 22 | `math.calc.surface-integrals` | Surface Integrals |
| 1022 | mathematics | 22 | `math.calc.vector-fields` | Vector Fields |
| 1023 | mathematics | 22 | `math.calc.greens-theorem` | Green's Theorem |
| 1024 | mathematics | 22 | `math.calc.fourier-series-intro` | Fourier Series (Introduction) |
| 1025 | mathematics | 22 | `math.de.ode-order` | Order of a Differential Equation |
| 1026 | mathematics | 22 | `math.de.ode-linearity` | Linearity of Differential Equations |
| 1027 | mathematics | 22 | `math.de.solution-types` | Types of Solutions |
| 1028 | mathematics | 22 | `math.de.pde` | Partial Differential Equation |
| 1029 | mathematics | 22 | `math.linalg.cramer-rule` | Cramer's Rule |
| 1030 | mathematics | 22 | `math.linalg.linear-independence` | Linear Independence |
| 1031 | mathematics | 22 | `math.linalg.column-space` | Column Space |
| 1032 | mathematics | 22 | `math.linalg.characteristic-polynomial` | Characteristic Polynomial |
| 1033 | mathematics | 22 | `math.linalg.least-squares` | Least Squares |
| 1034 | mathematics | 22 | `math.prob.normal-distribution` | Normal Distribution |
| 1035 | mathematics | 22 | `math.prob.linearity-expectation` | Linearity of Expectation |
| 1036 | mathematics | 22 | `math.prob.law-of-unconscious` | Law of the Unconscious Statistician |
| 1037 | mathematics | 22 | `math.prob.variance` | Variance |
| 1038 | mathematics | 22 | `math.prob.moments` | Moments |
| 1039 | mathematics | 22 | `math.prob.markov-inequality` | Markov's Inequality |
| 1040 | mathematics | 22 | `math.prob.stationary-distribution` | Stationary Distribution |
| 1041 | mathematics | 22 | `math.prob.poisson-process` | Poisson Process |
| 1042 | mathematics | 22 | `math.disc.algorithm-complexity` | Algorithm Complexity |
| 1043 | mathematics | 22 | `math.real.implicit-function-theorem` | Implicit Function Theorem |
| 1044 | mathematics | 22 | `math.real.inverse-function-theorem` | Inverse Function Theorem |
| 1045 | mathematics | 22 | `math.fnal.banach-space` | Banach Space |
| 1046 | mathematics | 22 | `math.num.numerical-differentiation` | Numerical Differentiation |
| 1047 | mathematics | 22 | `math.opt.unconstrained-optimization` | Unconstrained Optimization |
| 1048 | mathematics | 22 | `math.opt.convex-function` | Convex Function |
| 1049 | mathematics | 22 | `math.graph.algebraic-graph-theory` | Algebraic Graph Theory |
| 1050 | physics | 22 | `phys.particle.higgs-mechanism` | The Higgs Mechanism |
| 1051 | physics | 22 | `phys.mod.extrinsic-semiconductors` | Extrinsic Semiconductors: Doping and Carrier Types |
| 1052 | english | 22 | `eng.writing.narrative-writing` | Narrative Writing |
| 1053 | english | 22 | `eng.writing.descriptive-writing` | Descriptive Writing |
| 1054 | english | 22 | `eng.writing.expository-writing` | Expository Writing |
| 1055 | english | 22 | `eng.writing.persuasive-writing-basics` | Persuasive Writing Basics |
| 1056 | english | 22 | `eng.literature.metaphor-and-simile` | Metaphor and Simile |
| 1057 | english | 22 | `eng.literature.irony` | Irony |
| 1058 | english | 22 | `eng.literature.poetry-basics` | Poetry Basics |
| 1059 | english | 22 | `eng.linguistics.syntax-theory-intro` | Introduction to Syntactic Theory |
| 1060 | english | 22 | `eng.linguistics.historical-linguistics-intro` | Introduction to Historical Linguistics |
| 1061 | mathematics | 23 | `math.nt.linear-diophantine` | Linear Diophantine Equations |
| 1062 | mathematics | 23 | `math.nt.rsa-basics` | RSA Cryptography (Number-Theoretic Basis) |
| 1063 | mathematics | 23 | `math.alg.inequality-1var` | Linear Inequality in One Variable |
| 1064 | mathematics | 23 | `math.alg.absolute-value-equations` | Absolute Value Equations and Inequalities |
| 1065 | mathematics | 23 | `math.alg.linear-equation-2var` | Linear Equation in Two Variables |
| 1066 | mathematics | 23 | `math.alg.remainder-theorem` | Remainder Theorem |
| 1067 | mathematics | 23 | `math.geom.polar-curves` | Polar Curves |
| 1068 | mathematics | 23 | `math.trig.trig-graphs` | Graphs of Trigonometric Functions |
| 1069 | mathematics | 23 | `math.trig.pythagorean-identities` | Pythagorean Identities |
| 1070 | mathematics | 23 | `math.trig.reciprocal-identities` | Reciprocal Identities |
| 1071 | mathematics | 23 | `math.trig.sum-difference-formulas` | Sum and Difference Formulas |
| 1072 | mathematics | 23 | `math.trig.trig-equations` | Trigonometric Equations |
| 1073 | mathematics | 23 | `math.trig.polar-form-complex` | Polar Form of Complex Numbers |
| 1074 | mathematics | 23 | `math.calc.logarithmic-differentiation` | Logarithmic Differentiation |
| 1075 | mathematics | 23 | `math.calc.derivative-inverse-trig` | Derivatives of Inverse Trig Functions |
| 1076 | mathematics | 23 | `math.calc.hyperbolic-derivatives` | Derivatives of Hyperbolic Functions |
| 1077 | mathematics | 23 | `math.calc.integration-by-parts` | Integration by Parts |
| 1078 | mathematics | 23 | `math.calc.curl-divergence` | Curl and Divergence |
| 1079 | mathematics | 23 | `math.de.ivp` | Initial Value Problem |
| 1080 | mathematics | 23 | `math.de.first-order-ode` | First-Order ODE |
| 1081 | mathematics | 23 | `math.de.pde-classification` | Classification of Second-Order PDEs |
| 1082 | mathematics | 23 | `math.linalg.basis` | Basis |
| 1083 | mathematics | 23 | `math.prob.standard-normal` | Standard Normal Distribution |
| 1084 | mathematics | 23 | `math.prob.standard-deviation` | Standard Deviation |
| 1085 | mathematics | 23 | `math.prob.mgf` | Moment Generating Function |
| 1086 | mathematics | 23 | `math.prob.covariance` | Covariance |
| 1087 | mathematics | 23 | `math.prob.chebyshev` | Chebyshev's Inequality |
| 1088 | mathematics | 23 | `math.prob.ergodicity` | Ergodic Theorem (Markov Chains) |
| 1089 | mathematics | 23 | `math.stats.normal-distribution` | Normal Distribution (Statistics) |
| 1090 | mathematics | 23 | `math.disc.complexity-classes` | Complexity Classes |
| 1091 | mathematics | 23 | `math.fnal.hilbert-space` | Hilbert Space |
| 1092 | mathematics | 23 | `math.fnal.bounded-operator` | Bounded Linear Operator |
| 1093 | mathematics | 23 | `math.fnal.dense-subspace` | Dense Subspaces and Approximation |
| 1094 | mathematics | 23 | `math.opt.convex-optimization` | Convex Optimization |
| 1095 | mathematics | 23 | `math.opt.lagrange-multipliers` | Lagrange Multipliers |
| 1096 | mathematics | 23 | `math.opt.gradient-methods` | Gradient Descent |
| 1097 | physics | 23 | `phys.particle.standard-model` | The Standard Model |
| 1098 | physics | 23 | `phys.mod.pn-junction` | The p-n Junction |
| 1099 | english | 23 | `eng.writing.the-writing-process` | The Writing Process |
| 1100 | english | 23 | `eng.writing.creative-writing-forms` | Creative Writing Forms |
| 1101 | english | 23 | `eng.literature.symbolism` | Symbolism |
| 1102 | english | 23 | `eng.literature.imagery` | Imagery |
| 1103 | english | 23 | `eng.literature.poetic-forms` | Poetic Forms |
| 1104 | english | 23 | `eng.literature.literary-genres-overview` | Overview of Literary Genres |
| 1105 | english | 23 | `eng.linguistics.semantics-intro` | Introduction to Semantics |
| 1106 | english | 23 | `eng.linguistics.language-families` | Language Families |
| 1107 | english | 23 | `eng.linguistics.language-acquisition-intro` | Introduction to Language Acquisition |
| 1108 | mathematics | 24 | `math.nt.general-diophantine` | Diophantine Equations |
| 1109 | mathematics | 24 | `math.alg.inequality-2var` | Linear Inequality in Two Variables |
| 1110 | mathematics | 24 | `math.alg.system-linear-equations` | Systems of Linear Equations |
| 1111 | mathematics | 24 | `math.alg.factor-theorem` | Factor Theorem |
| 1112 | mathematics | 24 | `math.trig.double-angle-formulas` | Double Angle Formulas |
| 1113 | mathematics | 24 | `math.trig.product-to-sum` | Product-to-Sum and Sum-to-Product Formulas |
| 1114 | mathematics | 24 | `math.trig.de-moivres-theorem` | De Moivre's Theorem |
| 1115 | mathematics | 24 | `math.trig.eulers-formula` | Euler's Formula |
| 1116 | mathematics | 24 | `math.calc.reduction-formulas` | Reduction Formulas |
| 1117 | mathematics | 24 | `math.calc.stokes-theorem` | Stokes' Theorem |
| 1118 | mathematics | 24 | `math.calc.divergence-theorem` | Divergence Theorem |
| 1119 | mathematics | 24 | `math.de.existence-uniqueness` | Existence and Uniqueness Theorem |
| 1120 | mathematics | 24 | `math.de.separable` | Separable Differential Equation |
| 1121 | mathematics | 24 | `math.de.linear-first-order` | Linear First-Order ODE |
| 1122 | mathematics | 24 | `math.de.exact-ode` | Exact Differential Equation |
| 1123 | mathematics | 24 | `math.de.slope-field` | Slope Field |
| 1124 | mathematics | 24 | `math.de.euler-method` | Euler's Method |
| 1125 | mathematics | 24 | `math.de.second-order-ode` | Second-Order ODE |
| 1126 | mathematics | 24 | `math.linalg.dimension` | Dimension |
| 1127 | mathematics | 24 | `math.linalg.coordinates` | Coordinates |
| 1128 | mathematics | 24 | `math.linalg.matrix-representation` | Matrix Representation of Linear Map |
| 1129 | mathematics | 24 | `math.linalg.orthogonal-basis` | Orthogonal and Orthonormal Basis |
| 1130 | mathematics | 24 | `math.prob.correlation` | Correlation |
| 1131 | mathematics | 24 | `math.prob.lln` | Law of Large Numbers |
| 1132 | mathematics | 24 | `math.stats.covariance-matrix` | Covariance Matrix |
| 1133 | mathematics | 24 | `math.cx.complex-numbers-analysis` | Complex Numbers (Analysis) |
| 1134 | mathematics | 24 | `math.fnal.dual-space-functional` | Dual Space |
| 1135 | mathematics | 24 | `math.fnal.open-mapping-theorem` | Open Mapping Theorem |
| 1136 | mathematics | 24 | `math.fnal.uniform-boundedness` | Uniform Boundedness Principle |
| 1137 | mathematics | 24 | `math.fnal.riesz-representation` | Riesz Representation Theorem |
| 1138 | mathematics | 24 | `math.fnal.spectral-theory` | Spectral Theory |
| 1139 | mathematics | 24 | `math.fnal.fourier-transform` | Fourier Transform (Functional Analysis) |
| 1140 | mathematics | 24 | `math.opt.duality` | Duality Theory |
| 1141 | mathematics | 24 | `math.opt.stochastic-gradient` | Stochastic Gradient Descent |
| 1142 | mathematics | 24 | `math.opt.newton-optimization` | Newton's Method for Optimization |
| 1143 | physics | 24 | `phys.mod.diode-rectification` | Diode Rectifying Behavior |
| 1144 | english | 24 | `eng.writing.outlining-and-planning` | Outlining and Planning |
| 1145 | english | 24 | `eng.literature.meter-and-rhyme` | Meter and Rhyme |
| 1146 | english | 24 | `eng.literature.short-story-study` | Short Story Study |
| 1147 | english | 24 | `eng.literature.literary-periods-survey` | Survey of Literary Periods |
| 1148 | english | 24 | `eng.linguistics.pragmatics-intro` | Introduction to Pragmatics |
| 1149 | english | 24 | `eng.linguistics.psycholinguistics-intro` | Introduction to Psycholinguistics |
| 1150 | mathematics | 25 | `math.nt.pythagorean-triples` | Pythagorean Triples |
| 1151 | mathematics | 25 | `math.nt.pells-equation` | Pell's Equation |
| 1152 | mathematics | 25 | `math.nt.algebraic-number-theory` | Algebraic Number Theory |
| 1153 | mathematics | 25 | `math.nt.analytic-number-theory` | Analytic Number Theory |
| 1154 | mathematics | 25 | `math.alg.substitution-method` | Substitution Method |
| 1155 | mathematics | 25 | `math.alg.elimination-method` | Elimination Method |
| 1156 | mathematics | 25 | `math.alg.system-3var` | Systems of 3 Equations in 3 Variables |
| 1157 | mathematics | 25 | `math.alg.factoring` | Factoring Polynomials |
| 1158 | mathematics | 25 | `math.trig.half-angle-formulas` | Half Angle Formulas |
| 1159 | mathematics | 25 | `math.calc.trig-integrals` | Trigonometric Integrals |
| 1160 | mathematics | 25 | `math.de.bernoulli` | Bernoulli Equation |
| 1161 | mathematics | 25 | `math.de.homogeneous-ode` | Homogeneous First-Order ODE |
| 1162 | mathematics | 25 | `math.de.second-order-linear` | Second-Order Linear ODE |
| 1163 | mathematics | 25 | `math.de.laplace-transform` | Laplace Transform |
| 1164 | mathematics | 25 | `math.de.systems-ode` | Systems of ODEs |
| 1165 | mathematics | 25 | `math.de.bvp` | Boundary Value Problem |
| 1166 | mathematics | 25 | `math.linalg.linear-system` | System of Linear Equations |
| 1167 | mathematics | 25 | `math.linalg.change-of-basis` | Change of Basis |
| 1168 | mathematics | 25 | `math.linalg.spectral-theorem` | Spectral Theorem |
| 1169 | mathematics | 25 | `math.linalg.gram-schmidt` | Gram-Schmidt Process |
| 1170 | mathematics | 25 | `math.prob.clt` | Central Limit Theorem |
| 1171 | mathematics | 25 | `math.stats.correlation` | Sample Correlation |
| 1172 | mathematics | 25 | `math.cx.complex-function` | Complex-Valued Function |
| 1173 | mathematics | 25 | `math.fnal.hahn-banach` | Hahn-Banach Theorem |
| 1174 | mathematics | 25 | `math.fnal.closed-graph-theorem` | Closed Graph Theorem |
| 1175 | mathematics | 25 | `math.fnal.compact-operator-spectrum` | Compact Operators |
| 1176 | mathematics | 25 | `math.fnal.distributions` | Distributions |
| 1177 | mathematics | 25 | `math.num.euler-method` | Euler's Method (Numerical ODE) |
| 1178 | mathematics | 25 | `math.opt.kkt` | KKT Conditions |
| 1179 | english | 25 | `eng.writing.drafting` | Drafting |
| 1180 | english | 25 | `eng.literature.novel-study` | Novel Study |
| 1181 | english | 25 | `eng.literature.literary-criticism-intro` | Introduction to Literary Criticism |
| 1182 | english | 25 | `eng.linguistics.discourse-analysis-intro` | Introduction to Discourse Analysis |
| 1183 | english | 25 | `eng.linguistics.sociolinguistics-intro` | Introduction to Sociolinguistics |
| 1184 | mathematics | 26 | `math.nt.algebraic-integers` | Algebraic Integers |
| 1185 | mathematics | 26 | `math.alg.factoring-gcf` | Factoring out the GCF |
| 1186 | mathematics | 26 | `math.alg.factoring-special` | Special Factoring Patterns |
| 1187 | mathematics | 26 | `math.alg.rational-expressions` | Rational Expressions |
| 1188 | mathematics | 26 | `math.calc.trig-substitution` | Trigonometric Substitution |
| 1189 | mathematics | 26 | `math.de.second-order-homogeneous` | Homogeneous Second-Order Linear ODE |
| 1190 | mathematics | 26 | `math.de.laplace-properties` | Laplace Transform Properties |
| 1191 | mathematics | 26 | `math.de.convolution-theorem` | Convolution Theorem (Laplace) |
| 1192 | mathematics | 26 | `math.de.phase-plane` | Phase Plane Analysis |
| 1193 | mathematics | 26 | `math.de.series-solution` | Series Solution of ODEs |
| 1194 | mathematics | 26 | `math.de.sturm-liouville` | Sturm-Liouville Theory |
| 1195 | mathematics | 26 | `math.de.fourier-series` | Fourier Series |
| 1196 | mathematics | 26 | `math.linalg.augmented-matrix` | Augmented Matrix |
| 1197 | mathematics | 26 | `math.linalg.positive-definite` | Positive Definite Matrix |
| 1198 | mathematics | 26 | `math.linalg.qr-factorization` | QR Factorization |
| 1199 | mathematics | 26 | `math.stats.sampling-distribution` | Sampling Distribution |
| 1200 | mathematics | 26 | `math.stats.linear-regression` | Simple Linear Regression |
| 1201 | mathematics | 26 | `math.stats.normal-approximation` | Normal Approximation |
| 1202 | mathematics | 26 | `math.cx.cauchy-riemann` | Cauchy-Riemann Equations |
| 1203 | mathematics | 26 | `math.num.interpolation` | Polynomial Interpolation |
| 1204 | mathematics | 26 | `math.num.iterative-linear` | Iterative Methods for Linear Systems |
| 1205 | mathematics | 26 | `math.num.runge-kutta` | Runge-Kutta Methods |
| 1206 | mathematics | 26 | `math.opt.linear-programming` | Linear Programming |
| 1207 | english | 26 | `eng.writing.revising-for-content` | Revising for Content |
| 1208 | english | 26 | `eng.literature.comparative-literature-intro` | Introduction to Comparative Literature |
| 1209 | english | 26 | `eng.linguistics.applied-linguistics-intro` | Introduction to Applied Linguistics |
| 1210 | english | 26 | `eng.linguistics.dialectology` | Dialectology |
| 1211 | english | 26 | `eng.linguistics.corpus-linguistics-intro` | Introduction to Corpus Linguistics |
| 1212 | english | 26 | `eng.communication.discourse-markers-advanced` | Advanced Discourse Markers |
| 1213 | english | 26 | `eng.communication.cross-cultural-communication` | Cross-Cultural Communication |
| 1214 | mathematics | 27 | `math.nt.number-fields` | Number Fields |
| 1215 | mathematics | 27 | `math.alg.factoring-trinomials` | Factoring Trinomials |
| 1216 | mathematics | 27 | `math.alg.rational-expressions-addition` | Addition of Rational Expressions |
| 1217 | mathematics | 27 | `math.alg.rational-expressions-multiplication` | Multiplication of Rational Expressions |
| 1218 | mathematics | 27 | `math.alg.rational-equations` | Rational Equations |
| 1219 | mathematics | 27 | `math.de.wronskian` | Wronskian |
| 1220 | mathematics | 27 | `math.de.stability-analysis` | Stability Analysis |
| 1221 | mathematics | 27 | `math.de.frobenius-method` | Frobenius Method |
| 1222 | mathematics | 27 | `math.de.legendre-equation` | Legendre's Equation |
| 1223 | mathematics | 27 | `math.de.eigenfunction-expansion` | Eigenfunction Expansion |
| 1224 | mathematics | 27 | `math.de.fourier-convergence` | Convergence of Fourier Series |
| 1225 | mathematics | 27 | `math.de.fourier-sine-cosine` | Fourier Sine and Cosine Series |
| 1226 | mathematics | 27 | `math.de.fourier-transform` | Fourier Transform |
| 1227 | mathematics | 27 | `math.de.separation-of-variables-pde` | Separation of Variables (PDE) |
| 1228 | mathematics | 27 | `math.linalg.row-reduction` | Row Reduction |
| 1229 | mathematics | 27 | `math.linalg.svd` | Singular Value Decomposition |
| 1230 | mathematics | 27 | `math.stats.standard-error` | Standard Error |
| 1231 | mathematics | 27 | `math.stats.estimator` | Estimator |
| 1232 | mathematics | 27 | `math.stats.confidence-interval` | Confidence Interval |
| 1233 | mathematics | 27 | `math.stats.hypothesis-testing` | Hypothesis Testing |
| 1234 | mathematics | 27 | `math.stats.multiple-regression` | Multiple Linear Regression |
| 1235 | mathematics | 27 | `math.cx.analytic-functions` | Analytic (Holomorphic) Functions |
| 1236 | mathematics | 27 | `math.num.splines` | Spline Interpolation |
| 1237 | mathematics | 27 | `math.num.numerical-integration` | Numerical Integration |
| 1238 | mathematics | 27 | `math.num.qr-algorithm` | QR Algorithm |
| 1239 | mathematics | 27 | `math.num.stiff-ode` | Stiff ODEs and Implicit Methods |
| 1240 | mathematics | 27 | `math.opt.quadratic-programming` | Quadratic Programming |
| 1241 | mathematics | 27 | `math.opt.semidefinite-programming` | Semidefinite Programming |
| 1242 | mathematics | 27 | `math.opt.integer-programming` | Integer Programming |
| 1243 | english | 27 | `eng.writing.editing-and-proofreading` | Editing and Proofreading |
| 1244 | english | 27 | `eng.linguistics.bilingualism-and-multilingualism` | Bilingualism and Multilingualism |
| 1245 | english | 27 | `eng.linguistics.computational-linguistics-intro` | Introduction to Computational Linguistics |
| 1246 | mathematics | 28 | `math.alg.quadratic-equation` | Quadratic Equation |
| 1247 | mathematics | 28 | `math.de.variation-of-parameters` | Variation of Parameters |
| 1248 | mathematics | 28 | `math.de.bessel-equation` | Bessel's Equation |
| 1249 | mathematics | 28 | `math.de.heat-equation` | Heat Equation |
| 1250 | mathematics | 28 | `math.de.wave-equation` | Wave Equation |
| 1251 | mathematics | 28 | `math.de.laplace-equation` | Laplace's Equation |
| 1252 | mathematics | 28 | `math.de.nonlinear-ode` | Nonlinear ODE |
| 1253 | mathematics | 28 | `math.linalg.row-echelon` | Row Echelon Form |
| 1254 | mathematics | 28 | `math.linalg.lu-factorization` | LU Factorization |
| 1255 | mathematics | 28 | `math.linalg.singular-values` | Singular Values |
| 1256 | mathematics | 28 | `math.linalg.pseudoinverse` | Moore-Penrose Pseudoinverse |
| 1257 | mathematics | 28 | `math.prob.characteristic-function` | Characteristic Function |
| 1258 | mathematics | 28 | `math.stats.bias-variance` | Bias-Variance Tradeoff |
| 1259 | mathematics | 28 | `math.stats.consistency` | Consistency of Estimators |
| 1260 | mathematics | 28 | `math.stats.mle` | Maximum Likelihood Estimation |
| 1261 | mathematics | 28 | `math.stats.method-of-moments` | Method of Moments |
| 1262 | mathematics | 28 | `math.stats.ci-mean` | Confidence Interval for a Mean |
| 1263 | mathematics | 28 | `math.stats.ci-proportion` | Confidence Interval for a Proportion |
| 1264 | mathematics | 28 | `math.stats.test-statistic` | Test Statistic |
| 1265 | mathematics | 28 | `math.stats.type-errors` | Type I and Type II Errors |
| 1266 | mathematics | 28 | `math.stats.z-test` | z-Test |
| 1267 | mathematics | 28 | `math.stats.t-test` | t-Test |
| 1268 | mathematics | 28 | `math.stats.chi-squared-test` | Chi-Squared Test |
| 1269 | mathematics | 28 | `math.stats.anova` | Analysis of Variance |
| 1270 | mathematics | 28 | `math.stats.nonparametric` | Nonparametric Tests |
| 1271 | mathematics | 28 | `math.stats.sufficient-statistic` | Sufficient Statistic |
| 1272 | mathematics | 28 | `math.cx.power-series-cx` | Power Series in ℂ |
| 1273 | mathematics | 28 | `math.cx.complex-integration` | Complex Line Integral |
| 1274 | mathematics | 28 | `math.cx.singularities` | Singularities |
| 1275 | mathematics | 28 | `math.cx.conformal-mapping` | Conformal Mapping |
| 1276 | mathematics | 28 | `math.num.svd` | SVD (Numerical) |
| 1277 | mathematics | 28 | `math.opt.pca` | Principal Component Analysis |
| 1278 | english | 28 | `eng.writing.essay-structure` | Essay Structure |
| 1279 | english | 28 | `eng.linguistics.translation-studies-intro` | Introduction to Translation Studies |
| 1280 | mathematics | 29 | `math.nt.prime-number-theorem` | Prime Number Theorem |
| 1281 | mathematics | 29 | `math.alg.completing-the-square` | Completing the Square |
| 1282 | mathematics | 29 | `math.alg.polynomial-roots` | Polynomial Roots (Real and Complex) |
| 1283 | mathematics | 29 | `math.geom.conic-sections` | Conic Sections |
| 1284 | mathematics | 29 | `math.func.quadratic-function` | Quadratic Function |
| 1285 | mathematics | 29 | `math.de.harmonic-functions` | Harmonic Functions |
| 1286 | mathematics | 29 | `math.de.poisson-equation` | Poisson's Equation |
| 1287 | mathematics | 29 | `math.de.bifurcation` | Bifurcation Theory |
| 1288 | mathematics | 29 | `math.linalg.rank` | Rank |
| 1289 | mathematics | 29 | `math.linalg.null-space` | Null Space |
| 1290 | mathematics | 29 | `math.linalg.cholesky` | Cholesky Decomposition |
| 1291 | mathematics | 29 | `math.stats.p-value` | p-value |
| 1292 | mathematics | 29 | `math.stats.power` | Power of a Test |
| 1293 | mathematics | 29 | `math.stats.two-way-anova` | Two-Way ANOVA |
| 1294 | mathematics | 29 | `math.stats.bayesian-inference` | Bayesian Statistics |
| 1295 | mathematics | 29 | `math.stats.experimental-design` | Experimental Design |
| 1296 | mathematics | 29 | `math.stats.rao-blackwell` | Rao-Blackwell Theorem |
| 1297 | mathematics | 29 | `math.cx.harmonic-functions` | Harmonic Functions (Complex Analysis) |
| 1298 | mathematics | 29 | `math.cx.cauchy-theorem` | Cauchy's Theorem |
| 1299 | mathematics | 29 | `math.cx.identity-theorem` | Identity Theorem |
| 1300 | mathematics | 29 | `math.cx.poles` | Poles and Meromorphic Functions |
| 1301 | mathematics | 29 | `math.cx.essential-singularity` | Essential Singularity |
| 1302 | mathematics | 29 | `math.cx.laurent-series` | Laurent Series |
| 1303 | mathematics | 29 | `math.cx.mobius-transformation` | Möbius Transformation |
| 1304 | mathematics | 29 | `math.cx.riemann-mapping` | Riemann Mapping Theorem |
| 1305 | mathematics | 29 | `math.fnal.special-functions` | Special Functions |
| 1306 | mathematics | 29 | `math.num.lu-factorization` | LU Factorization (Numerical) |
| 1307 | english | 29 | `eng.writing.thesis-statements` | Thesis Statements |
| 1308 | english | 29 | `eng.composition.audience-and-purpose` | Audience and Purpose |
| 1309 | mathematics | 30 | `math.alg.quadratic-formula` | Quadratic Formula |
| 1310 | mathematics | 30 | `math.alg.rational-root-theorem` | Rational Root Theorem |
| 1311 | mathematics | 30 | `math.alg.fundamental-theorem-algebra` | Fundamental Theorem of Algebra |
| 1312 | mathematics | 30 | `math.alg.polynomial-inequality` | Polynomial Inequality |
| 1313 | mathematics | 30 | `math.alg.vietas-formulas` | Vieta's Formulas |
| 1314 | mathematics | 30 | `math.geom.parabola` | Parabola |
| 1315 | mathematics | 30 | `math.geom.ellipse` | Ellipse |
| 1316 | mathematics | 30 | `math.geom.hyperbola` | Hyperbola |
| 1317 | mathematics | 30 | `math.func.vertex-form` | Vertex Form of a Quadratic |
| 1318 | mathematics | 30 | `math.func.polynomial-function` | Polynomial Function |
| 1319 | mathematics | 30 | `math.calc.partial-fractions` | Partial Fraction Decomposition |
| 1320 | mathematics | 30 | `math.de.higher-order-ode` | Higher-Order Linear ODE |
| 1321 | mathematics | 30 | `math.de.greens-function` | Green's Function |
| 1322 | mathematics | 30 | `math.de.chaos` | Chaotic Dynamics |
| 1323 | mathematics | 30 | `math.linalg.rank-nullity` | Rank-Nullity Theorem |
| 1324 | mathematics | 30 | `math.linalg.eigenspace` | Eigenspace |
| 1325 | mathematics | 30 | `math.stats.conjugate-prior` | Conjugate Prior |
| 1326 | mathematics | 30 | `math.stats.credible-interval` | Credible Interval |
| 1327 | mathematics | 30 | `math.disc.linear-recurrence` | Linear Recurrence |
| 1328 | mathematics | 30 | `math.cx.cauchy-goursat` | Cauchy-Goursat Theorem |
| 1329 | mathematics | 30 | `math.cx.cauchy-integral-formula` | Cauchy Integral Formula |
| 1330 | mathematics | 30 | `math.cx.analytic-continuation` | Analytic Continuation |
| 1331 | mathematics | 30 | `math.cx.residue` | Residue |
| 1332 | mathematics | 30 | `math.num.cholesky` | Cholesky Factorization (Numerical) |
| 1333 | english | 30 | `eng.writing.citations-and-referencing` | Citations and Referencing |
| 1334 | english | 30 | `eng.composition.claim-evidence-reasoning` | Claim, Evidence, and Reasoning |
| 1335 | english | 30 | `eng.composition.rhetorical-appeals` | Rhetorical Appeals: Ethos, Pathos, Logos |
| 1336 | mathematics | 31 | `math.alg.discriminant` | Discriminant |
| 1337 | mathematics | 31 | `math.alg.complex-polynomial-roots` | Complex Roots of Polynomials |
| 1338 | mathematics | 31 | `math.alg.rational-inequality` | Rational Inequality |
| 1339 | mathematics | 31 | `math.func.end-behavior` | End Behavior |
| 1340 | mathematics | 31 | `math.func.rational-root` | Real Roots of Polynomials |
| 1341 | mathematics | 31 | `math.func.rational-function` | Rational Function |
| 1342 | mathematics | 31 | `math.de.char-equation` | Characteristic Equation |
| 1343 | mathematics | 31 | `math.de.inverse-laplace` | Inverse Laplace Transform |
| 1344 | mathematics | 31 | `math.linalg.diagonalization` | Diagonalization |
| 1345 | mathematics | 31 | `math.cx.higher-derivatives` | Derivatives of Holomorphic Functions |
| 1346 | mathematics | 31 | `math.cx.morera-theorem` | Morera's Theorem |
| 1347 | mathematics | 31 | `math.cx.residue-theorem` | Residue Theorem |
| 1348 | mathematics | 31 | `math.cx.maximum-modulus` | Maximum Modulus Principle |
| 1349 | mathematics | 31 | `math.cx.riemann-surface` | Riemann Surface |
| 1350 | mathematics | 31 | `math.cx.riemann-zeta` | Riemann Zeta Function |
| 1351 | english | 31 | `eng.composition.argumentation-basics` | Argumentation Basics |
| 1352 | english | 31 | `eng.composition.rhetorical-devices` | Rhetorical Devices |
| 1353 | mathematics | 32 | `math.nt.riemann-hypothesis` | Riemann Hypothesis |
| 1354 | mathematics | 32 | `math.func.vertical-asymptote` | Vertical Asymptote |
| 1355 | mathematics | 32 | `math.func.horizontal-asymptote` | Horizontal Asymptote |
| 1356 | mathematics | 32 | `math.de.undetermined-coefficients` | Method of Undetermined Coefficients |
| 1357 | mathematics | 32 | `math.de.laplace-ode` | Solving ODEs with Laplace Transform |
| 1358 | mathematics | 32 | `math.de.systems-matrix-method` | Matrix Method for Linear Systems |
| 1359 | mathematics | 32 | `math.linalg.matrix-exponential` | Matrix Exponential |
| 1360 | mathematics | 32 | `math.linalg.jordan-form` | Jordan Normal Form |
| 1361 | mathematics | 32 | `math.cx.liouville-theorem` | Liouville's Theorem |
| 1362 | mathematics | 32 | `math.cx.real-integral-residues` | Evaluating Real Integrals via Residues |
| 1363 | mathematics | 32 | `math.cx.argument-principle` | Argument Principle |
| 1364 | english | 32 | `eng.composition.counterargument-and-rebuttal` | Counterargument and Rebuttal |
| 1365 | english | 32 | `eng.composition.logical-fallacies` | Logical Fallacies |
| 1366 | english | 32 | `eng.composition.figurative-language-in-composition` | Figurative Language in Composition |
| 1367 | english | 32 | `eng.composition.rhetorical-analysis` | Rhetorical Analysis |
| 1368 | mathematics | 33 | `math.de.harmonic-oscillator` | Harmonic Oscillator |
| 1369 | mathematics | 33 | `math.cx.fundamental-theorem-algebra` | Fundamental Theorem of Algebra (Complex Analysis) |
| 1370 | mathematics | 33 | `math.cx.rouche-theorem` | Rouché's Theorem |
| 1371 | english | 33 | `eng.composition.style-voice-and-tone` | Style, Voice, and Tone |
| 1372 | english | 33 | `eng.composition.persuasive-techniques` | Advanced Persuasive Techniques |
| 1373 | english | 33 | `eng.composition.comparative-essay-writing` | Comparative Essay Writing |
| 1374 | english | 33 | `eng.composition.research-paper-writing` | Research Paper Writing |
| 1375 | mathematics | 34 | `math.de.resonance` | Resonance |
| 1376 | english | 34 | `eng.composition.academic-writing-conventions` | Academic Writing Conventions |
| 1377 | english | 35 | `eng.composition.plagiarism-and-citation-ethics` | Plagiarism and Citation Ethics |
| 1378 | english | 35 | `eng.composition.editing-for-style` | Editing for Style |
| 1379 | english | 35 | `eng.communication.academic-writing-advanced` | Advanced Academic Writing |
| 1380 | english | 36 | `eng.communication.research-methodology-writing` | Writing Research Methodology |
| 1381 | english | 36 | `eng.communication.technical-writing` | Technical Writing |
| 1382 | english | 36 | `eng.communication.business-writing` | Business Writing |
| 1383 | english | 37 | `eng.communication.professional-communication` | Professional Communication |
| 1384 | english | 37 | `eng.communication.presentation-design` | Presentation Design |
| 1385 | english | 37 | `eng.communication.editing-for-publication` | Editing for Publication |
| 1386 | english | 38 | `eng.communication.negotiation-language` | Negotiation Language |

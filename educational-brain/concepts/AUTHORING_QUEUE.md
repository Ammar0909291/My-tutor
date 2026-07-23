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

Total queued: **1548** (= 1,775 KG concepts − 227 already `READY`).

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
| 54 | chemistry | 4 | `chem.atomic.bohr-model` | Bohr Model of the Atom |
| 55 | chemistry | 4 | `chem.state.molar-mass-gas` | Molar Mass from Gas Data |
| 56 | chemistry | 4 | `chem.state.real-gases` | Real Gases and van der Waals Equation |
| 57 | chemistry | 4 | `chem.sol.types` | Types of Solutions |
| 58 | chemistry | 4 | `chem.thermo.enthalpy` | Enthalpy and Hess's Law |
| 59 | chemistry | 4 | `chem.thermo.entropy` | Entropy and Second Law |
| 60 | chemistry | 4 | `chem.thermo.heat-capacities` | Heat Capacities of Gases |
| 61 | chemistry | 4 | `chem.kinet.rate` | Rate of Reaction |
| 62 | biology | 4 | `bio.found.viruses-viroids-lichens` | Viruses, Viroids and Lichens |
| 63 | biology | 4 | `bio.cell.prokaryotic-cell` | Prokaryotic Cell Structure |
| 64 | biology | 4 | `bio.cell.eukaryotic-cell` | Eukaryotic Cell Structure |
| 65 | biology | 4 | `bio.eco.population-ecology` | Population Ecology |
| 66 | biology | 4 | `bio.div.three-domain-system` | Three Domain System |
| 67 | biology | 4 | `bio.div.fungal-biology` | Fungal Biology |
| 68 | computer_science | 4 | `cs.found.pipelining-cache` | Pipelining and Cache Memory |
| 69 | computer_science | 4 | `cs.algo.time-space-complexity` | Time and Space Complexity Analysis |
| 70 | computer_science | 4 | `cs.prog.intro-programming` | Introduction to Programming |
| 71 | computer_science | 4 | `cs.os.threads-concurrency` | Threads and Concurrency |
| 72 | computer_science | 4 | `cs.os.cpu-scheduling` | CPU Scheduling Algorithms |
| 73 | computer_science | 4 | `cs.os.memory-management-os` | Memory Management |
| 74 | computer_science | 4 | `cs.net.ip-addressing` | IP Addressing and Subnetting |
| 75 | computer_science | 4 | `cs.net.tcp-udp-transport` | TCP and UDP — Transport Layer |
| 76 | computer_science | 4 | `cs.theory.finite-automata` | Finite Automata |
| 77 | mathematics | 5 | `math.geom.angle-types` | Types of Angles |
| 78 | mathematics | 5 | `math.geom.angle-measurement` | Angle Measurement |
| 79 | mathematics | 5 | `math.geom.angle-pairs` | Angle Pairs |
| 80 | mathematics | 5 | `math.geom.perpendicular-lines` | Perpendicular Lines |
| 81 | mathematics | 5 | `math.geom.triangle` | Triangle |
| 82 | mathematics | 5 | `math.geom.circle-parts` | Parts of a Circle |
| 83 | mathematics | 5 | `math.geom.circle-circumference` | Circumference of a Circle |
| 84 | mathematics | 5 | `math.prob.event` | Event |
| 85 | mathematics | 5 | `math.disc.graph-types` | Types of Graphs |
| 86 | mathematics | 5 | `math.disc.graph-connectivity` | Graph Connectivity |
| 87 | mathematics | 5 | `math.disc.graph-coloring` | Graph Coloring |
| 88 | mathematics | 5 | `math.disc.planar-graph` | Planar Graph |
| 89 | mathematics | 5 | `math.disc.propositional-logic` | Propositional Logic |
| 90 | mathematics | 5 | `math.top.open-sets` | Open and Closed Sets (Topology) |
| 91 | mathematics | 5 | `math.top.basis` | Basis for a Topology |
| 92 | mathematics | 5 | `math.top.continuity-top` | Continuity (Topology) |
| 93 | mathematics | 5 | `math.top.compactness` | Compactness (Topology) |
| 94 | mathematics | 5 | `math.top.connectedness` | Connectedness (Topology) |
| 95 | mathematics | 5 | `math.top.separation-axioms` | Separation Axioms |
| 96 | mathematics | 5 | `math.top.product-space` | Product Topology |
| 97 | mathematics | 5 | `math.top.simplicial-complex` | Simplicial Complex |
| 98 | mathematics | 5 | `math.meas.measure` | Measure |
| 99 | mathematics | 5 | `math.meas.measurable-function` | Measurable Function |
| 100 | mathematics | 5 | `math.graph.graph-invariants` | Graph Invariants |
| 101 | mathematics | 5 | `math.graph.graph-operations` | Graph Operations |
| 102 | mathematics | 5 | `math.graph.matching` | Matching |
| 103 | english | 5 | `eng.phonics.consonant-blends` | Consonant Blends |
| 104 | english | 5 | `eng.phonics.long-vowels-silent-e` | Long Vowels and Silent E |
| 105 | english | 5 | `eng.phonetics.minimal-pairs` | Minimal Pairs |
| 106 | english | 5 | `eng.phonetics.syllable-stress` | Word Stress |
| 107 | chemistry | 5 | `chem.atomic.quantum-numbers` | Quantum Numbers |
| 108 | chemistry | 5 | `chem.sol.solubility` | Solubility and Henry's Law |
| 109 | chemistry | 5 | `chem.thermo.gibbs` | Gibbs Free Energy and Spontaneity |
| 110 | chemistry | 5 | `chem.thermo.third-law` | Third Law and Absolute Entropy |
| 111 | chemistry | 5 | `chem.kinet.rate-law` | Rate Law and Order |
| 112 | chemistry | 5 | `chem.kinet.photochemistry` | Photochemical Reactions |
| 113 | biology | 5 | `bio.cell.cell-membrane-transport` | Cell Membrane and Transport |
| 114 | biology | 5 | `bio.cell.nucleus-chromosomes` | Nucleus and Chromosomes |
| 115 | biology | 5 | `bio.cell.mitochondria-energy` | Mitochondria and Energy Organelles |
| 116 | biology | 5 | `bio.cell.chloroplast-structure` | Chloroplast Structure |
| 117 | biology | 5 | `bio.cell.endomembrane-system` | Endomembrane System |
| 118 | biology | 5 | `bio.mol.biomolecule-types` | Types of Biomolecules |
| 119 | biology | 5 | `bio.eco.ecosystem-structure-function` | Ecosystem Structure and Function |
| 120 | biology | 5 | `bio.micro.microbial-diversity` | Microbial Diversity |
| 121 | computer_science | 5 | `cs.algo.divide-and-conquer` | Divide and Conquer |
| 122 | computer_science | 5 | `cs.algo.greedy-algorithms` | Greedy Algorithms |
| 123 | computer_science | 5 | `cs.prog.python-basics` | Python Language Basics |
| 124 | computer_science | 5 | `cs.os.synchronisation-deadlocks` | Synchronisation and Deadlocks |
| 125 | computer_science | 5 | `cs.os.virtual-memory` | Virtual Memory |
| 126 | computer_science | 5 | `cs.os.file-systems` | File Systems |
| 127 | computer_science | 5 | `cs.net.dns-dhcp` | DNS and DHCP |
| 128 | computer_science | 5 | `cs.net.routing-congestion` | Routing and Congestion Control |
| 129 | computer_science | 5 | `cs.theory.regular-expressions` | Regular Expressions and Regular Languages |
| 130 | mathematics | 6 | `math.geom.parallel-lines` | Parallel Lines |
| 131 | mathematics | 6 | `math.geom.triangle-types` | Types of Triangles |
| 132 | mathematics | 6 | `math.geom.right-triangle` | Right Triangle |
| 133 | mathematics | 6 | `math.geom.congruent-triangles` | Congruent Triangles |
| 134 | mathematics | 6 | `math.geom.area-triangle` | Area of a Triangle |
| 135 | mathematics | 6 | `math.geom.polygon` | Polygon |
| 136 | mathematics | 6 | `math.geom.circle-theorems` | Circle Theorems |
| 137 | mathematics | 6 | `math.geom.geometric-constructions` | Geometric Constructions |
| 138 | mathematics | 6 | `math.trig.angle-measure` | Angle Measure |
| 139 | mathematics | 6 | `math.prob.probability-measure` | Probability Measure |
| 140 | mathematics | 6 | `math.disc.euler-hamiltonian` | Euler and Hamiltonian Paths |
| 141 | mathematics | 6 | `math.disc.graph-trees` | Trees |
| 142 | mathematics | 6 | `math.disc.boolean-circuits` | Boolean Circuits and Logic Gates |
| 143 | mathematics | 6 | `math.disc.predicate-logic-disc` | Predicate Logic and Proof Methods |
| 144 | mathematics | 6 | `math.top.interior-closure` | Interior, Closure, and Boundary |
| 145 | mathematics | 6 | `math.top.homeomorphism` | Homeomorphism |
| 146 | mathematics | 6 | `math.top.tychonoff` | Tychonoff's Theorem |
| 147 | mathematics | 6 | `math.top.homotopy` | Homotopy |
| 148 | mathematics | 6 | `math.meas.lebesgue-measure` | Lebesgue Measure |
| 149 | mathematics | 6 | `math.meas.simple-function` | Simple Function |
| 150 | mathematics | 6 | `math.meas.abstract-measure-spaces` | Abstract Measure Spaces |
| 151 | mathematics | 6 | `math.graph.connectivity` | Connectivity |
| 152 | mathematics | 6 | `math.graph.graph-coloring` | Graph Coloring |
| 153 | english | 6 | `eng.phonics.digraphs` | Consonant and Vowel Digraphs |
| 154 | english | 6 | `eng.phonetics.sentence-stress` | Sentence Stress |
| 155 | english | 6 | `eng.phonetics.phonetic-transcription` | Phonetic Transcription |
| 156 | chemistry | 6 | `chem.atomic.orbitals` | Atomic Orbitals |
| 157 | chemistry | 6 | `chem.thermo.cell-thermo` | Electrochemical Thermodynamics |
| 158 | chemistry | 6 | `chem.equil.concept` | Equilibrium Concept |
| 159 | chemistry | 6 | `chem.kinet.integrated-rate` | Integrated Rate Laws |
| 160 | chemistry | 6 | `chem.kinet.arrhenius` | Arrhenius Equation |
| 161 | chemistry | 6 | `chem.kinet.mechanism` | Reaction Mechanisms |
| 162 | chemistry | 6 | `chem.env.ozone` | Ozone Depletion |
| 163 | biology | 6 | `bio.cell.cytoskeleton` | Cytoskeleton and Cell Motility |
| 164 | biology | 6 | `bio.cell.cell-cycle` | The Cell Cycle |
| 165 | biology | 6 | `bio.cell.cell-signalling` | Cell Signalling |
| 166 | biology | 6 | `bio.mol.carbohydrates-lipids` | Carbohydrates and Lipids |
| 167 | biology | 6 | `bio.mol.proteins-structure` | Proteins and Protein Structure |
| 168 | biology | 6 | `bio.mol.nucleic-acid-structure` | Nucleic Acid Structure |
| 169 | biology | 6 | `bio.evo.origin-of-life` | Origin of Life |
| 170 | biology | 6 | `bio.physio.respiratory-system` | Human Respiratory System |
| 171 | biology | 6 | `bio.plant.plant-water-relations` | Plant Water Relations |
| 172 | biology | 6 | `bio.eco.nutrient-cycling` | Nutrient Cycling and Succession |
| 173 | biology | 6 | `bio.micro.microbial-growth-culture` | Microbial Growth and Culture Techniques |
| 174 | biology | 6 | `bio.micro.pathogenic-microbes` | Pathogenic Microorganisms and Disease |
| 175 | biology | 6 | `bio.div.endosymbiotic-theory` | Endosymbiotic Theory |
| 176 | biology | 6 | `bio.mol.bioenergetics` | Bioenergetics and Thermodynamics of Life |
| 177 | biology | 6 | `bio.eco.community-ecology` | Community Ecology |
| 178 | computer_science | 6 | `cs.algo.dynamic-programming` | Dynamic Programming |
| 179 | computer_science | 6 | `cs.prog.data-types-variables` | Data Types and Variables |
| 180 | computer_science | 6 | `cs.net.application-protocols` | Application-Layer Protocols |
| 181 | computer_science | 6 | `cs.net.wireless-mobile-networks` | Wireless and Mobile Networks |
| 182 | computer_science | 6 | `cs.theory.context-free-grammars` | Context-Free Grammars |
| 183 | mathematics | 7 | `math.found.rules-of-inference` | Rules of Inference |
| 184 | mathematics | 7 | `math.found.proper-subset` | Proper Subset |
| 185 | mathematics | 7 | `math.found.set-equality` | Set Equality |
| 186 | mathematics | 7 | `math.found.set-operations` | Set Operations |
| 187 | mathematics | 7 | `math.found.power-set` | Power Set |
| 188 | mathematics | 7 | `math.found.reflexive-relation` | Reflexive Relation |
| 189 | mathematics | 7 | `math.found.symmetric-relation` | Symmetric Relation |
| 190 | mathematics | 7 | `math.found.transitive-relation` | Transitive Relation |
| 191 | mathematics | 7 | `math.found.partition` | Partition |
| 192 | mathematics | 7 | `math.found.function-set-theoretic` | Function (Set-Theoretic) |
| 193 | mathematics | 7 | `math.found.cardinal-arithmetic` | Cardinal Arithmetic |
| 194 | mathematics | 7 | `math.geom.triangle-angle-sum` | Triangle Angle Sum Theorem |
| 195 | mathematics | 7 | `math.geom.triangle-centers` | Triangle Centers |
| 196 | mathematics | 7 | `math.geom.quadrilateral` | Quadrilateral |
| 197 | mathematics | 7 | `math.geom.regular-polygon` | Regular Polygon |
| 198 | mathematics | 7 | `math.geom.area-polygon` | Area of Polygons |
| 199 | mathematics | 7 | `math.geom.solid-3d` | Three-Dimensional Solids |
| 200 | mathematics | 7 | `math.trig.degree-radian-conversion` | Degree-Radian Conversion |
| 201 | mathematics | 7 | `math.prob.probability-axioms` | Axioms of Probability |
| 202 | mathematics | 7 | `math.disc.spanning-tree` | Spanning Tree |
| 203 | mathematics | 7 | `math.top.homotopy-equivalence` | Homotopy Equivalence |
| 204 | mathematics | 7 | `math.top.manifold` | Topological Manifold |
| 205 | mathematics | 7 | `math.meas.measure-zero` | Measure Zero |
| 206 | mathematics | 7 | `math.meas.lebesgue-integral` | Lebesgue Integral |
| 207 | mathematics | 7 | `math.graph.tree` | Tree |
| 208 | mathematics | 7 | `math.graph.maximum-flow` | Maximum Flow |
| 209 | mathematics | 7 | `math.graph.eulerian-circuit` | Eulerian Circuit |
| 210 | mathematics | 7 | `math.graph.hamiltonian-cycle` | Hamiltonian Cycle |
| 211 | english | 7 | `eng.phonics.syllable-types` | Syllable Types |
| 212 | english | 7 | `eng.phonetics.intonation-patterns` | Intonation Patterns |
| 213 | chemistry | 7 | `chem.atomic.electronic-config` | Electronic Configuration |
| 214 | chemistry | 7 | `chem.atomic.quantum-mech-model` | Quantum Mechanical Model |
| 215 | chemistry | 7 | `chem.equil.kc-kp` | Equilibrium Constants Kc and Kp |
| 216 | chemistry | 7 | `chem.equil.kw-ph` | Water Ionization and pH |
| 217 | chemistry | 7 | `chem.kinet.catalysis` | Catalysis |
| 218 | biology | 7 | `bio.cell.mitosis` | Mitosis |
| 219 | biology | 7 | `bio.mol.enzymes` | Enzymes and Enzyme Kinetics |
| 220 | biology | 7 | `bio.evo.evidence-for-evolution` | Evidence for Evolution |
| 221 | biology | 7 | `bio.physio.circulatory-system` | Human Circulatory System |
| 222 | biology | 7 | `bio.physio.nervous-system` | Nervous System and Neural Control |
| 223 | biology | 7 | `bio.plant.mineral-nutrition` | Mineral Nutrition in Plants |
| 224 | biology | 7 | `bio.eco.biodiversity-conservation` | Biodiversity and Conservation |
| 225 | biology | 7 | `bio.micro.microbes-in-human-welfare` | Microbes in Human Welfare |
| 226 | biology | 7 | `bio.div.protist-diversity` | Eukaryotic Supergroups and Protist Diversity |
| 227 | biology | 7 | `bio.mol.signal-transduction-pathways` | Core Signal Transduction Pathways |
| 228 | computer_science | 7 | `cs.algo.backtracking` | Backtracking |
| 229 | computer_science | 7 | `cs.prog.operators-expressions` | Operators and Expressions |
| 230 | computer_science | 7 | `cs.net.cloud-computing` | Cloud Computing |
| 231 | computer_science | 7 | `cs.sec.network-web-security` | Network and Web Security |
| 232 | computer_science | 7 | `cs.web.client-server-model` | The Client-Server Model |
| 233 | computer_science | 7 | `cs.theory.turing-machines` | Turing Machines |
| 234 | mathematics | 8 | `math.found.proof` | Mathematical Proof |
| 235 | mathematics | 8 | `math.found.union` | Union |
| 236 | mathematics | 8 | `math.found.intersection` | Intersection |
| 237 | mathematics | 8 | `math.found.set-difference` | Set Difference |
| 238 | mathematics | 8 | `math.found.complement` | Set Complement |
| 239 | mathematics | 8 | `math.found.venn-diagram` | Venn Diagram |
| 240 | mathematics | 8 | `math.found.equivalence-relation` | Equivalence Relation |
| 241 | mathematics | 8 | `math.found.partial-order` | Partial Order |
| 242 | mathematics | 8 | `math.found.cardinality` | Cardinality |
| 243 | mathematics | 8 | `math.geom.polygon-angle-sum` | Polygon Angle Sum |
| 244 | mathematics | 8 | `math.geom.parallelogram` | Parallelogram |
| 245 | mathematics | 8 | `math.geom.trapezoid` | Trapezoid |
| 246 | mathematics | 8 | `math.geom.area` | Area |
| 247 | mathematics | 8 | `math.geom.volume` | Volume |
| 248 | mathematics | 8 | `math.geom.platonic-solids` | Platonic Solids |
| 249 | mathematics | 8 | `math.func.function-concept` | Function |
| 250 | mathematics | 8 | `math.prob.conditional-probability` | Conditional Probability |
| 251 | mathematics | 8 | `math.abst.binary-operation` | Binary Operation |
| 252 | mathematics | 8 | `math.meas.convergence-theorems` | Convergence Theorems |
| 253 | mathematics | 8 | `math.meas.lp-space` | Lᵖ Spaces |
| 254 | mathematics | 8 | `math.meas.product-measure` | Product Measure and Fubini's Theorem |
| 255 | mathematics | 8 | `math.meas.radon-nikodym` | Radon-Nikodym Theorem |
| 256 | mathematics | 8 | `math.fnal.convolution` | Convolution |
| 257 | mathematics | 8 | `math.graph.minimum-spanning-tree` | Minimum Spanning Tree |
| 258 | mathematics | 8 | `math.graph.random-graph` | Random Graphs |
| 259 | mathematics | 8 | `math.cat.category` | Category |
| 260 | english | 8 | `eng.phonics.decoding-fluency` | Decoding Fluency |
| 261 | english | 8 | `eng.phonetics.connected-speech` | Connected Speech |
| 262 | english | 8 | `eng.phonetics.prosody` | Prosody |
| 263 | english | 8 | `eng.writing.spelling-strategies` | Spelling Strategies |
| 264 | chemistry | 8 | `chem.period.modern-periodic-law` | Modern Periodic Law and Table |
| 265 | chemistry | 8 | `chem.equil.le-chatelier` | Le Chatelier's Principle |
| 266 | chemistry | 8 | `chem.equil.acids-bases` | Acid–Base Theories |
| 267 | chemistry | 8 | `chem.equil.solubility` | Solubility Equilibria |
| 268 | chemistry | 8 | `chem.equil.complex-equil` | Complex Ion Equilibria |
| 269 | chemistry | 8 | `chem.surface.adsorption` | Adsorption |
| 270 | biology | 8 | `bio.cell.meiosis` | Meiosis |
| 271 | biology | 8 | `bio.mol.dna-replication` | DNA Replication |
| 272 | biology | 8 | `bio.evo.natural-selection` | Natural Selection and Darwinism |
| 273 | biology | 8 | `bio.physio.digestive-system` | Human Digestive System |
| 274 | biology | 8 | `bio.physio.excretory-system` | Excretory System and Osmoregulation |
| 275 | biology | 8 | `bio.physio.endocrine-system` | Endocrine System |
| 276 | biology | 8 | `bio.physio.musculoskeletal-system` | Locomotion and Musculoskeletal System |
| 277 | biology | 8 | `bio.physio.immune-system-intro` | Immune System Overview |
| 278 | biology | 8 | `bio.plant.photosynthesis` | Photosynthesis |
| 279 | biology | 8 | `bio.plant.plant-growth-hormones` | Plant Growth and Hormones |
| 280 | biology | 8 | `bio.repro.asexual-reproduction` | Asexual Reproduction |
| 281 | biology | 8 | `bio.eco.environmental-issues` | Environmental Issues and Pollution |
| 282 | biology | 8 | `bio.div.cladistics-phylogenetic-thinking` | Cladistics and Phylogenetic Thinking |
| 283 | computer_science | 8 | `cs.algo.np-completeness` | NP-Completeness and Intractability |
| 284 | computer_science | 8 | `cs.prog.type-conversion` | Type Conversion and Casting |
| 285 | computer_science | 8 | `cs.control.conditionals` | Conditional Statements |
| 286 | computer_science | 8 | `cs.sec.data-protection-privacy` | Data Protection and Privacy |
| 287 | computer_science | 8 | `cs.web.html-css-basics` | HTML and CSS Basics |
| 288 | mathematics | 9 | `math.found.direct-proof` | Direct Proof |
| 289 | mathematics | 9 | `math.found.proof-by-contradiction` | Proof by Contradiction |
| 290 | mathematics | 9 | `math.found.proof-by-contrapositive` | Proof by Contrapositive |
| 291 | mathematics | 9 | `math.found.proof-by-cases` | Proof by Cases |
| 292 | mathematics | 9 | `math.found.existence-proof` | Existence Proof |
| 293 | mathematics | 9 | `math.found.writing-mathematics` | Writing Mathematics |
| 294 | mathematics | 9 | `math.found.theorem` | Theorem |
| 295 | mathematics | 9 | `math.found.conjecture` | Conjecture |
| 296 | mathematics | 9 | `math.found.equivalence-class` | Equivalence Class |
| 297 | mathematics | 9 | `math.found.total-order` | Total Order |
| 298 | mathematics | 9 | `math.found.hasse-diagram` | Hasse Diagram |
| 299 | mathematics | 9 | `math.found.finite-set` | Finite Set |
| 300 | mathematics | 9 | `math.geom.circle-area` | Area of a Circle |
| 301 | mathematics | 9 | `math.geom.geometric-proof` | Geometric Proof |
| 302 | mathematics | 9 | `math.geom.surface-area` | Surface Area |
| 303 | mathematics | 9 | `math.func.domain-range` | Domain and Range |
| 304 | mathematics | 9 | `math.func.function-notation` | Function Notation |
| 305 | mathematics | 9 | `math.func.injectivity` | Injective (One-to-One) Function |
| 306 | mathematics | 9 | `math.func.surjectivity` | Surjective (Onto) Function |
| 307 | mathematics | 9 | `math.func.composition` | Composition of Functions |
| 308 | mathematics | 9 | `math.func.periodic-function` | Periodic Function |
| 309 | mathematics | 9 | `math.func.piecewise-function` | Piecewise-Defined Function |
| 310 | mathematics | 9 | `math.func.monotonic-function` | Monotonic Function |
| 311 | mathematics | 9 | `math.func.function-operations` | Operations on Functions |
| 312 | mathematics | 9 | `math.prob.total-probability` | Law of Total Probability |
| 313 | mathematics | 9 | `math.prob.independence` | Independence |
| 314 | mathematics | 9 | `math.prob.random-variable` | Random Variable |
| 315 | mathematics | 9 | `math.abst.group-theory` | Group |
| 316 | mathematics | 9 | `math.top.quotient-space` | Quotient Space |
| 317 | mathematics | 9 | `math.meas.l2-space` | L² Space |
| 318 | mathematics | 9 | `math.cat.morphism-types` | Types of Morphisms |
| 319 | mathematics | 9 | `math.cat.functor` | Functor |
| 320 | english | 9 | `eng.phonetics.rhythm-and-timing` | Rhythm and Timing |
| 321 | english | 9 | `eng.vocab.word-recognition` | Word Recognition |
| 322 | english | 9 | `eng.listening.active-listening` | Active Listening |
| 323 | english | 9 | `eng.speaking.oral-fluency` | Oral Fluency |
| 324 | chemistry | 9 | `chem.period.atomic-radius` | Atomic and Ionic Radius |
| 325 | chemistry | 9 | `chem.period.ionization-energy` | Ionization Energy |
| 326 | chemistry | 9 | `chem.period.electron-affinity` | Electron Affinity and Electronegativity |
| 327 | chemistry | 9 | `chem.period.valency` | Valency and Oxidation State |
| 328 | chemistry | 9 | `chem.bond.metallic-bonding` | Metallic Bonding |
| 329 | chemistry | 9 | `chem.equil.weak-acid` | Weak Acid and Base Equilibria |
| 330 | chemistry | 9 | `chem.surface.heterogeneous-cat` | Mechanism of Heterogeneous Catalysis |
| 331 | chemistry | 9 | `chem.sblock.hydrogen` | Hydrogen |
| 332 | chemistry | 9 | `chem.anal.gravimetric` | Gravimetric Analysis |
| 333 | chemistry | 9 | `chem.anal.chromatography` | Chromatography |
| 334 | biology | 9 | `bio.mol.transcription` | Transcription |
| 335 | biology | 9 | `bio.gen.mendelian-genetics` | Mendelian Genetics |
| 336 | biology | 9 | `bio.plant.plant-respiration` | Respiration in Plants |
| 337 | biology | 9 | `bio.repro.sexual-reproduction-plants` | Sexual Reproduction in Flowering Plants |
| 338 | biology | 9 | `bio.repro.human-reproductive-system` | Human Reproductive System |
| 339 | biology | 9 | `bio.immuno.innate-adaptive-immunity` | Innate and Adaptive Immunity |
| 340 | biology | 9 | `bio.micro.viral-replication` | Viral Replication and Lifecycle |
| 341 | biology | 9 | `bio.micro.horizontal-gene-transfer` | Horizontal Gene Transfer |
| 342 | computer_science | 9 | `cs.prog.input-output` | Input, Output and Formatting |
| 343 | computer_science | 9 | `cs.control.loops` | Iteration — while and for Loops |
| 344 | computer_science | 9 | `cs.web.rest-apis` | REST APIs |
| 345 | computer_science | 9 | `cs.theory.complexity-classes` | Computational Complexity Classes |
| 346 | mathematics | 10 | `math.found.uniqueness-proof` | Uniqueness Proof |
| 347 | mathematics | 10 | `math.found.lemma` | Lemma |
| 348 | mathematics | 10 | `math.found.corollary` | Corollary |
| 349 | mathematics | 10 | `math.found.natural-numbers` | Natural Numbers |
| 350 | mathematics | 10 | `math.func.bijection` | Bijective Function |
| 351 | mathematics | 10 | `math.func.step-function` | Step Function |
| 352 | mathematics | 10 | `math.prob.bayes-theorem` | Bayes' Theorem |
| 353 | mathematics | 10 | `math.prob.discrete-rv` | Discrete Random Variable |
| 354 | mathematics | 10 | `math.prob.cdf` | Cumulative Distribution Function |
| 355 | mathematics | 10 | `math.abst.group-operation` | Group Operation Examples |
| 356 | mathematics | 10 | `math.abst.subgroup` | Subgroup |
| 357 | mathematics | 10 | `math.abst.cyclic-group` | Cyclic Group |
| 358 | mathematics | 10 | `math.abst.group-order` | Order of Group and Elements |
| 359 | mathematics | 10 | `math.abst.group-homomorphism` | Group Homomorphism |
| 360 | mathematics | 10 | `math.abst.group-action` | Group Action |
| 361 | mathematics | 10 | `math.abst.symmetric-group` | Symmetric Group |
| 362 | mathematics | 10 | `math.abst.ring-theory` | Ring |
| 363 | mathematics | 10 | `math.abst.group-inverse` | Group Inverse |
| 364 | mathematics | 10 | `math.top.fundamental-group` | Fundamental Group |
| 365 | mathematics | 10 | `math.top.homology` | Homology |
| 366 | mathematics | 10 | `math.cat.natural-transformation` | Natural Transformation |
| 367 | english | 10 | `eng.phonetics.accents-and-dialects` | Accents and Dialects |
| 368 | english | 10 | `eng.vocab.context-clues` | Context Clues |
| 369 | english | 10 | `eng.vocab.synonyms-antonyms` | Synonyms and Antonyms |
| 370 | english | 10 | `eng.vocab.word-families` | Word Families |
| 371 | english | 10 | `eng.grammar.word-classes-overview` | Overview of Word Classes |
| 372 | english | 10 | `eng.listening.listening-for-gist` | Listening for Gist |
| 373 | english | 10 | `eng.listening.distinguishing-sounds-in-speech` | Distinguishing Sounds in Speech |
| 374 | english | 10 | `eng.speaking.pronunciation-in-conversation` | Pronunciation in Conversation |
| 375 | chemistry | 10 | `chem.period.periodic-properties` | Periodic Trends Overview |
| 376 | chemistry | 10 | `chem.bond.ionic-bonding` | Ionic Bonding |
| 377 | chemistry | 10 | `chem.bond.covalent-bonding` | Covalent Bonding |
| 378 | chemistry | 10 | `chem.equil.buffer` | Buffer Solutions |
| 379 | chemistry | 10 | `chem.equil.hydrolysis` | Salt Hydrolysis |
| 380 | chemistry | 10 | `chem.equil.titration` | Acid–Base Titrations |
| 381 | chemistry | 10 | `chem.redox.oxidation-state` | Oxidation State |
| 382 | biology | 10 | `bio.mol.translation-genetic-code` | Translation and the Genetic Code |
| 383 | biology | 10 | `bio.gen.gene-interactions` | Gene Interactions and Extensions of Mendelism |
| 384 | biology | 10 | `bio.repro.fertilisation-development` | Fertilisation and Embryonic Development |
| 385 | biology | 10 | `bio.immuno.antibody-structure-function` | Antibody Structure and Function |
| 386 | biology | 10 | `bio.div.plant-diversity-alternation-of-generations` | Plant Diversity and Alternation of Generations |
| 387 | biology | 10 | `bio.immuno.mhc-antigen-presentation` | MHC and Antigen Presentation |
| 388 | computer_science | 10 | `cs.prog.exception-handling` | Exception Handling |
| 389 | computer_science | 10 | `cs.control.nested-control-patterns` | Nested Control Flow Patterns |
| 390 | computer_science | 10 | `cs.data.strings` | Strings |
| 391 | mathematics | 11 | `math.found.proof-by-induction` | Mathematical Induction |
| 392 | mathematics | 11 | `math.found.well-ordering-principle` | Well-Ordering Principle |
| 393 | mathematics | 11 | `math.found.countable-set` | Countable Set |
| 394 | mathematics | 11 | `math.found.integers` | Integers |
| 395 | mathematics | 11 | `math.arith.counting` | Counting |
| 396 | mathematics | 11 | `math.func.inverse-functions` | Inverse Functions |
| 397 | mathematics | 11 | `math.seq.sequence` | Sequence |
| 398 | mathematics | 11 | `math.prob.bayesian-inference` | Bayesian Inference |
| 399 | mathematics | 11 | `math.prob.pmf` | Probability Mass Function |
| 400 | mathematics | 11 | `math.prob.quantile` | Quantile |
| 401 | mathematics | 11 | `math.prob.distribution` | Probability Distribution |
| 402 | mathematics | 11 | `math.abst.coset` | Coset |
| 403 | mathematics | 11 | `math.abst.group-isomorphism` | Group Isomorphism |
| 404 | mathematics | 11 | `math.abst.burnside-lemma` | Burnside's Lemma |
| 405 | mathematics | 11 | `math.abst.ideal` | Ideal |
| 406 | mathematics | 11 | `math.abst.ring-homomorphism` | Ring Homomorphism |
| 407 | mathematics | 11 | `math.abst.polynomial-ring` | Polynomial Ring |
| 408 | mathematics | 11 | `math.top.van-kampen` | Seifert-van Kampen Theorem |
| 409 | mathematics | 11 | `math.top.covering-space` | Covering Space |
| 410 | mathematics | 11 | `math.top.euler-characteristic` | Euler Characteristic |
| 411 | mathematics | 11 | `math.top.cohomology` | Cohomology |
| 412 | mathematics | 11 | `math.cat.functor-category` | Functor Category |
| 413 | mathematics | 11 | `math.cat.limits` | Limits and Colimits |
| 414 | mathematics | 11 | `math.cat.adjunction` | Adjunction |
| 415 | english | 11 | `eng.vocab.compound-words` | Compound Words |
| 416 | english | 11 | `eng.vocab.prefixes` | Prefixes |
| 417 | english | 11 | `eng.vocab.suffixes` | Suffixes |
| 418 | english | 11 | `eng.vocab.homonyms-homophones` | Homonyms and Homophones |
| 419 | english | 11 | `eng.vocab.connotation-denotation` | Connotation and Denotation |
| 420 | english | 11 | `eng.grammar.nouns` | Nouns |
| 421 | english | 11 | `eng.grammar.verbs` | Verbs |
| 422 | english | 11 | `eng.grammar.prepositions` | Prepositions |
| 423 | english | 11 | `eng.grammar.conjunctions` | Conjunctions |
| 424 | english | 11 | `eng.grammar.interjections` | Interjections |
| 425 | english | 11 | `eng.reading.print-to-meaning` | From Print to Meaning |
| 426 | english | 11 | `eng.listening.listening-for-detail` | Listening for Detail |
| 427 | english | 11 | `eng.speaking.conversation-skills` | Conversation Skills |
| 428 | chemistry | 11 | `chem.bond.vsepr` | VSEPR Theory |
| 429 | chemistry | 11 | `chem.bond.hybridization` | Hybridization |
| 430 | chemistry | 11 | `chem.bond.resonance` | Resonance Structures |
| 431 | chemistry | 11 | `chem.bond.bond-parameters` | Bond Parameters |
| 432 | chemistry | 11 | `chem.bond.coordinate-bond` | Coordinate and Dative Bonding |
| 433 | chemistry | 11 | `chem.redox.balancing` | Balancing Redox Equations |
| 434 | chemistry | 11 | `chem.solid.crystal-systems` | Crystal Systems |
| 435 | chemistry | 11 | `chem.sblock.alkali` | Alkali Metals |
| 436 | chemistry | 11 | `chem.pblock.group13` | Group 13 — Boron Family |
| 437 | chemistry | 11 | `chem.pblock.group14` | Group 14 — Carbon Family |
| 438 | chemistry | 11 | `chem.pblock.group15` | Group 15 — Nitrogen Family |
| 439 | chemistry | 11 | `chem.pblock.group16` | Group 16 — Oxygen Family |
| 440 | chemistry | 11 | `chem.pblock.group17` | Group 17 — Halogens |
| 441 | chemistry | 11 | `chem.pblock.group18` | Group 18 — Noble Gases |
| 442 | chemistry | 11 | `chem.dblock.general` | Transition Metals — General Properties |
| 443 | chemistry | 11 | `chem.org.iupac` | IUPAC Nomenclature |
| 444 | biology | 11 | `bio.mol.gene-regulation` | Regulation of Gene Expression |
| 445 | biology | 11 | `bio.gen.chromosomal-theory-linkage` | Chromosomal Theory and Linkage |
| 446 | biology | 11 | `bio.repro.reproductive-health` | Reproductive Health and Contraception |
| 447 | biology | 11 | `bio.dev.gametogenesis-fertilisation-dev` | Fundamentals of Animal Development |
| 448 | biology | 11 | `bio.immuno.vaccination-immunisation` | Vaccination and Immunisation |
| 449 | computer_science | 11 | `cs.data.lists` | Lists |
| 450 | computer_science | 11 | `cs.func.functions` | Functions |
| 451 | mathematics | 12 | `math.found.strong-induction` | Strong Induction |
| 452 | mathematics | 12 | `math.found.uncountable-set` | Uncountable Set |
| 453 | mathematics | 12 | `math.found.rational-numbers` | Rational Numbers |
| 454 | mathematics | 12 | `math.arith.counting-sequence` | Counting Sequence |
| 455 | mathematics | 12 | `math.arith.subitizing` | Subitizing |
| 456 | mathematics | 12 | `math.arith.place-value` | Place Value |
| 457 | mathematics | 12 | `math.arith.number-line` | Number Line |
| 458 | mathematics | 12 | `math.seq.arithmetic-sequence` | Arithmetic Sequence |
| 459 | mathematics | 12 | `math.seq.geometric-sequence` | Geometric Sequence |
| 460 | mathematics | 12 | `math.seq.recursive-sequences` | Recursive Sequences |
| 461 | mathematics | 12 | `math.seq.series` | Series |
| 462 | mathematics | 12 | `math.prob.discrete-distributions` | Discrete Distributions |
| 463 | mathematics | 12 | `math.prob.joint-distribution` | Joint Distribution |
| 464 | mathematics | 12 | `math.abst.lagrange-theorem` | Lagrange's Theorem |
| 465 | mathematics | 12 | `math.abst.normal-subgroup` | Normal Subgroup |
| 466 | mathematics | 12 | `math.abst.quotient-ring` | Quotient Ring |
| 467 | mathematics | 12 | `math.abst.prime-ideal` | Prime and Maximal Ideals |
| 468 | mathematics | 12 | `math.abst.euclidean-domain` | Euclidean Domain |
| 469 | mathematics | 12 | `math.cat.yoneda-lemma` | Yoneda Lemma |
| 470 | mathematics | 12 | `math.cat.equalizer` | Equalizer and Coequalizer |
| 471 | mathematics | 12 | `math.cat.pullback` | Pullback and Pushout |
| 472 | mathematics | 12 | `math.cat.monad` | Monad |
| 473 | mathematics | 12 | `math.cat.tensor-product` | Tensor Product (Categorical) |
| 474 | mathematics | 12 | `math.cat.topos` | Topos |
| 475 | english | 12 | `eng.vocab.roots-and-origins` | Greek and Latin Roots |
| 476 | english | 12 | `eng.vocab.multiple-meaning-words` | Multiple-Meaning Words |
| 477 | english | 12 | `eng.vocab.collocations` | Collocations |
| 478 | english | 12 | `eng.vocab.register-and-formality` | Register and Formality |
| 479 | english | 12 | `eng.grammar.pronouns` | Pronouns |
| 480 | english | 12 | `eng.grammar.adjectives` | Adjectives |
| 481 | english | 12 | `eng.grammar.articles-and-determiners` | Articles and Determiners |
| 482 | english | 12 | `eng.grammar.subject-and-predicate` | Subject and Predicate |
| 483 | english | 12 | `eng.grammar.present-tenses` | Present Tenses |
| 484 | english | 12 | `eng.reading.reading-fluency` | Reading Fluency |
| 485 | english | 12 | `eng.listening.following-instructions` | Following Spoken Instructions |
| 486 | english | 12 | `eng.listening.note-taking-while-listening` | Note-Taking While Listening |
| 487 | english | 12 | `eng.speaking.asking-and-answering-questions` | Asking and Answering Questions |
| 488 | english | 12 | `eng.speaking.storytelling-orally` | Oral Storytelling |
| 489 | english | 12 | `eng.speaking.non-verbal-communication` | Non-Verbal Communication |
| 490 | chemistry | 12 | `chem.bond.mo-theory` | Molecular Orbital Theory |
| 491 | chemistry | 12 | `chem.bond.polar-molecules` | Polarity and Dipole Moment |
| 492 | chemistry | 12 | `chem.thermo.bond-enthalpy` | Bond Enthalpy |
| 493 | chemistry | 12 | `chem.redox.disproportionation` | Disproportionation |
| 494 | chemistry | 12 | `chem.redox.activity-series` | Electrochemical Activity Series |
| 495 | chemistry | 12 | `chem.redox.titrations` | Redox Titrations |
| 496 | chemistry | 12 | `chem.solid.packing` | Close Packing and Efficiency |
| 497 | chemistry | 12 | `chem.solid.defects` | Crystal Defects |
| 498 | chemistry | 12 | `chem.solid.amorphous` | Amorphous Solids |
| 499 | chemistry | 12 | `chem.coord.werner` | Werner's Theory |
| 500 | chemistry | 12 | `chem.sblock.alkaline-earth` | Alkaline Earth Metals |
| 501 | chemistry | 12 | `chem.pblock.trends` | Trends Across p-Block |
| 502 | chemistry | 12 | `chem.dblock.first-row` | First-Row Transition Metals |
| 503 | chemistry | 12 | `chem.dblock.lanthanides` | Lanthanides and Actinides |
| 504 | chemistry | 12 | `chem.org.hybridization` | Carbon Hybridization |
| 505 | chemistry | 12 | `chem.org.purification` | Purification Techniques |
| 506 | chemistry | 12 | `chem.org.spectroscopy` | Introduction to Spectroscopy |
| 507 | biology | 12 | `bio.gen.pedigree-human-genetics` | Pedigree Analysis and Human Genetic Disorders |
| 508 | biology | 12 | `bio.gen.mutations` | Mutations |
| 509 | biology | 12 | `bio.dev.morphogenesis-differentiation` | Morphogenesis and Cell Differentiation |
| 510 | biology | 12 | `bio.immuno.immune-disorders` | Immune Disorders |
| 511 | biology | 12 | `bio.cell.apoptosis` | Apoptosis and Programmed Cell Death |
| 512 | biology | 12 | `bio.mol.epigenetics` | Epigenetics and Chromatin Regulation |
| 513 | biology | 12 | `bio.mol.noncoding-rna` | Non-coding RNA Biology |
| 514 | computer_science | 12 | `cs.data.tuples` | Tuples |
| 515 | computer_science | 12 | `cs.data.dictionaries` | Dictionaries |
| 516 | computer_science | 12 | `cs.func.scope-namespaces` | Scope and Namespaces |
| 517 | computer_science | 12 | `cs.file.text-files` | Text File Handling |
| 518 | computer_science | 12 | `cs.struct.linear-search` | Linear Search |
| 519 | computer_science | 12 | `cs.oop.oop-concepts` | Object-Oriented Programming Concepts |
| 520 | mathematics | 13 | `math.found.irrational-numbers` | Irrational Numbers |
| 521 | mathematics | 13 | `math.arith.ones-tens-hundreds` | Ones, Tens, Hundreds |
| 522 | mathematics | 13 | `math.arith.expanded-form` | Expanded Form |
| 523 | mathematics | 13 | `math.arith.number-base` | Number Base |
| 524 | mathematics | 13 | `math.arith.addition` | Addition |
| 525 | mathematics | 13 | `math.arith.ordering` | Ordering Numbers |
| 526 | mathematics | 13 | `math.seq.partial-sums` | Partial Sums |
| 527 | mathematics | 13 | `math.seq.arithmetic-series` | Arithmetic Series |
| 528 | mathematics | 13 | `math.seq.geometric-series` | Geometric Series |
| 529 | mathematics | 13 | `math.prob.marginal-distribution` | Marginal Distribution |
| 530 | mathematics | 13 | `math.prob.conditional-distribution` | Conditional Distribution |
| 531 | mathematics | 13 | `math.abst.quotient-group` | Quotient Group |
| 532 | mathematics | 13 | `math.abst.alternating-group` | Alternating Group |
| 533 | mathematics | 13 | `math.abst.pid` | Principal Ideal Domain |
| 534 | mathematics | 13 | `math.abst.field` | Field |
| 535 | mathematics | 13 | `math.cat.representable-functor` | Representable Functor |
| 536 | mathematics | 13 | `math.cat.higher-category` | Higher Category Theory |
| 537 | physics | 13 | `phys.mech.hamiltons-equations` | Hamilton's Equations of Motion |
| 538 | physics | 13 | `phys.mod.radioactivity` | Radioactivity: Alpha, Beta, Gamma Decay |
| 539 | physics | 13 | `phys.qm.wave-function` | Wave Function and Probability Interpretation |
| 540 | physics | 13 | `phys.rel.lorentz-transform` | Lorentz Transformations |
| 541 | physics | 13 | `phys.stat.partition-function` | Partition Function |
| 542 | physics | 13 | `phys.stat.maxwell-boltzmann` | Maxwell-Boltzmann Speed Distribution |
| 543 | english | 13 | `eng.vocab.word-formation-processes` | Word Formation Processes |
| 544 | english | 13 | `eng.vocab.idioms` | Idioms |
| 545 | english | 13 | `eng.vocab.phrasal-verbs` | Phrasal Verbs |
| 546 | english | 13 | `eng.vocab.etymology` | Etymology |
| 547 | english | 13 | `eng.vocab.thesaurus-and-dictionary-skills` | Thesaurus and Dictionary Skills |
| 548 | english | 13 | `eng.grammar.adverbs` | Adverbs |
| 549 | english | 13 | `eng.grammar.word-order` | Basic Word Order |
| 550 | english | 13 | `eng.grammar.past-tenses` | Past Tenses |
| 551 | english | 13 | `eng.grammar.future-tenses` | Future Tenses |
| 552 | english | 13 | `eng.grammar.modals` | Modal Verbs |
| 553 | english | 13 | `eng.grammar.gerunds-and-infinitives` | Gerunds and Infinitives |
| 554 | english | 13 | `eng.grammar.subject-verb-agreement` | Subject-Verb Agreement |
| 555 | english | 13 | `eng.reading.literal-comprehension` | Literal Comprehension |
| 556 | english | 13 | `eng.reading.skimming-and-scanning` | Skimming and Scanning |
| 557 | english | 13 | `eng.listening.listening-comprehension-strategies` | Listening Comprehension Strategies |
| 558 | english | 13 | `eng.speaking.discussion-skills` | Discussion Skills |
| 559 | english | 13 | `eng.communication.digital-communication` | Digital Communication |
| 560 | chemistry | 13 | `chem.bond.intermolecular` | Intermolecular Forces |
| 561 | chemistry | 13 | `chem.elect.galvanic-cell` | Galvanic Cell |
| 562 | chemistry | 13 | `chem.solid.ionic-solids` | Ionic Crystal Structures |
| 563 | chemistry | 13 | `chem.solid.properties` | Electrical and Magnetic Properties |
| 564 | chemistry | 13 | `chem.coord.nomenclature` | Nomenclature of Complexes |
| 565 | chemistry | 13 | `chem.coord.cft` | Crystal Field Theory |
| 566 | chemistry | 13 | `chem.coord.stability` | Stability Constants |
| 567 | chemistry | 13 | `chem.dblock.oxo-species` | Oxides and Oxyanions of Transition Metals |
| 568 | chemistry | 13 | `chem.org.isomerism` | Structural and Stereoisomerism |
| 569 | chemistry | 13 | `chem.org.electronic-effects` | Inductive and Mesomeric Effects |
| 570 | chemistry | 13 | `chem.org.qualitative-analysis` | Qualitative Organic Analysis |
| 571 | chemistry | 13 | `chem.org.aromaticity` | Aromaticity |
| 572 | chemistry | 13 | `chem.hyd.alkanes` | Alkanes |
| 573 | chemistry | 13 | `chem.anal.volumetric` | Volumetric Analysis |
| 574 | chemistry | 13 | `chem.anal.spectroscopy` | Spectroscopic Methods |
| 575 | biology | 13 | `bio.gen.population-genetics` | Population Genetics |
| 576 | biology | 13 | `bio.gen.genetic-engineering` | Genetic Engineering and Recombinant DNA |
| 577 | biology | 13 | `bio.dev.stem-cells-regeneration` | Stem Cells and Regeneration |
| 578 | biology | 13 | `bio.mol.dna-damage-repair` | DNA Damage Response and Repair |
| 579 | biology | 13 | `bio.gen.transposable-elements` | Transposable Elements and Genome Organisation |
| 580 | biology | 13 | `bio.evo.evo-devo` | Evolutionary Developmental Biology |
| 581 | computer_science | 13 | `cs.data.sets` | Sets |
| 582 | computer_science | 13 | `cs.func.recursion` | Recursion |
| 583 | computer_science | 13 | `cs.file.csv-files` | CSV File Handling |
| 584 | computer_science | 13 | `cs.file.binary-serialisation` | Binary Files and Serialisation |
| 585 | computer_science | 13 | `cs.struct.hashing-hash-tables` | Hashing and Hash Tables |
| 586 | computer_science | 13 | `cs.struct.binary-search` | Binary Search |
| 587 | computer_science | 13 | `cs.oop.classes-objects-python` | Classes and Objects in Python |
| 588 | computer_science | 13 | `cs.db.database-concepts` | Database Concepts |
| 589 | computer_science | 13 | `cs.se.sdlc` | Software Development Life Cycle |
| 590 | mathematics | 14 | `math.found.real-numbers` | Real Numbers |
| 591 | mathematics | 14 | `math.arith.carrying` | Carrying (Regrouping) |
| 592 | mathematics | 14 | `math.arith.mental-addition` | Mental Addition |
| 593 | mathematics | 14 | `math.arith.subtraction` | Subtraction |
| 594 | mathematics | 14 | `math.arith.multiplication` | Multiplication |
| 595 | mathematics | 14 | `math.seq.infinite-geometric-series` | Infinite Geometric Series |
| 596 | mathematics | 14 | `math.seq.telescoping-series` | Telescoping Series |
| 597 | mathematics | 14 | `math.prob.conditional-expectation` | Conditional Expectation |
| 598 | mathematics | 14 | `math.abst.first-isomorphism-theorem` | First Isomorphism Theorem |
| 599 | mathematics | 14 | `math.abst.ufd` | Unique Factorization Domain |
| 600 | mathematics | 14 | `math.abst.field-extension` | Field Extension |
| 601 | physics | 14 | `phys.mech.poisson-brackets` | Poisson Brackets and Phase Space Dynamics |
| 602 | physics | 14 | `phys.mod.radioactive-decay` | Radioactive Decay Law and Half-Life |
| 603 | physics | 14 | `phys.qm.schrodinger-equation` | Time-Dependent Schrödinger Equation |
| 604 | physics | 14 | `phys.qm.uncertainty-principle` | Heisenberg's Uncertainty Principle |
| 605 | physics | 14 | `phys.rel.relativistic-momentum` | Relativistic Momentum and Energy |
| 606 | physics | 14 | `phys.stat.bose-einstein` | Bose-Einstein Statistics |
| 607 | physics | 14 | `phys.stat.entropy-statistical` | Statistical Definition of Entropy |
| 608 | physics | 14 | `phys.stat.free-energy` | Helmholtz and Gibbs Free Energy |
| 609 | physics | 14 | `phys.stat.grand-canonical-ensemble` | Grand Canonical Ensemble |
| 610 | physics | 14 | `phys.stat.fluctuations-correlations` | Fluctuations, Response Functions, and Correlations |
| 611 | english | 14 | `eng.vocab.academic-vocabulary` | Academic Vocabulary |
| 612 | english | 14 | `eng.vocab.semantic-fields` | Semantic Fields |
| 613 | english | 14 | `eng.grammar.sentence-types-by-function` | Sentence Types by Function |
| 614 | english | 14 | `eng.grammar.phrases` | Phrases |
| 615 | english | 14 | `eng.grammar.tense-consistency` | Tense Consistency |
| 616 | english | 14 | `eng.grammar.conditionals` | Conditional Sentences |
| 617 | english | 14 | `eng.grammar.participles-and-participial-phrases` | Participles and Participial Phrases |
| 618 | english | 14 | `eng.grammar.pronoun-antecedent-agreement` | Pronoun-Antecedent Agreement |
| 619 | english | 14 | `eng.grammar.comparatives-and-superlatives` | Comparatives and Superlatives |
| 620 | english | 14 | `eng.reading.main-idea-and-details` | Main Idea and Supporting Details |
| 621 | english | 14 | `eng.listening.critical-listening` | Critical Listening |
| 622 | english | 14 | `eng.speaking.public-speaking-basics` | Public Speaking Basics |
| 623 | chemistry | 14 | `chem.state.liquids` | Liquid State Properties |
| 624 | chemistry | 14 | `chem.elect.standard-electrode` | Standard Electrode Potential |
| 625 | chemistry | 14 | `chem.elect.electrolysis` | Electrolysis and Faraday's Laws |
| 626 | chemistry | 14 | `chem.elect.batteries` | Batteries and Fuel Cells |
| 627 | chemistry | 14 | `chem.elect.corrosion` | Corrosion |
| 628 | chemistry | 14 | `chem.coord.isomerism` | Isomerism in Complexes |
| 629 | chemistry | 14 | `chem.coord.bonding` | Bonding in Complexes |
| 630 | chemistry | 14 | `chem.coord.applications` | Applications of Coordination Chemistry |
| 631 | chemistry | 14 | `chem.sblock.water` | Chemistry of Water |
| 632 | chemistry | 14 | `chem.dblock.organometallics` | Organometallic Chemistry |
| 633 | chemistry | 14 | `chem.org.reactive-intermediates` | Reactive Intermediates |
| 634 | chemistry | 14 | `chem.hyd.arenes` | Benzene and Arenes |
| 635 | chemistry | 14 | `chem.hyd.conformations` | Conformational Analysis |
| 636 | chemistry | 14 | `chem.hyd.petroleum` | Petroleum Refining |
| 637 | chemistry | 14 | `chem.hal.introduction` | Haloalkanes and Haloarenes |
| 638 | biology | 14 | `bio.evo.modern-synthesis-speciation` | Modern Synthesis and Speciation |
| 639 | biology | 14 | `bio.biotech.biotech-principles` | Principles of Biotechnology |
| 640 | computer_science | 14 | `cs.data.comprehensions-iterators` | Comprehensions, Iterators and Generators |
| 641 | computer_science | 14 | `cs.func.lambda-functional` | Lambda Expressions and Functional Tools |
| 642 | computer_science | 14 | `cs.struct.stacks` | Stacks |
| 643 | computer_science | 14 | `cs.struct.elementary-sorts` | Elementary Sorting — Bubble, Selection, Insertion |
| 644 | computer_science | 14 | `cs.oop.encapsulation-abstraction` | Encapsulation and Abstraction |
| 645 | computer_science | 14 | `cs.db.er-modeling` | Entity-Relationship Modeling |
| 646 | computer_science | 14 | `cs.se.version-control-git` | Version Control with Git |
| 647 | mathematics | 15 | `math.found.complex-numbers` | Complex Numbers |
| 648 | mathematics | 15 | `math.arith.column-addition` | Column Addition |
| 649 | mathematics | 15 | `math.arith.borrowing` | Borrowing (Regrouping in Subtraction) |
| 650 | mathematics | 15 | `math.arith.negative-numbers` | Negative Numbers |
| 651 | mathematics | 15 | `math.arith.multiplication-table` | Multiplication Table |
| 652 | mathematics | 15 | `math.arith.division` | Division |
| 653 | mathematics | 15 | `math.arith.exponentiation` | Exponentiation |
| 654 | mathematics | 15 | `math.geom.coordinate-plane` | Coordinate Plane |
| 655 | mathematics | 15 | `math.func.real-valued-function` | Real-Valued Function |
| 656 | mathematics | 15 | `math.prob.martingale` | Martingale |
| 657 | mathematics | 15 | `math.disc.counting-principles` | Counting Principles |
| 658 | mathematics | 15 | `math.abst.second-isomorphism-theorem` | Second and Third Isomorphism Theorems |
| 659 | mathematics | 15 | `math.abst.algebraic-extension` | Algebraic Extension |
| 660 | mathematics | 15 | `math.real.completeness` | Completeness of ℝ |
| 661 | mathematics | 15 | `math.real.metric-space` | Metric Space |
| 662 | physics | 15 | `phys.mech.canonical-transformations` | Canonical Transformations and Generating Functions |
| 663 | physics | 15 | `phys.mod.nuclear-reactions` | Nuclear Reactions and Q-Value |
| 664 | physics | 15 | `phys.qm.operators` | Quantum Operators and Observables |
| 665 | physics | 15 | `phys.qm.particle-in-box` | Particle in an Infinite Square Well |
| 666 | physics | 15 | `phys.qm.harmonic-oscillator-qm` | Quantum Harmonic Oscillator |
| 667 | physics | 15 | `phys.qm.quantum-tunneling` | Quantum Tunneling |
| 668 | physics | 15 | `phys.rel.mass-energy` | Mass-Energy Equivalence: E=mc² |
| 669 | physics | 15 | `phys.stat.chemical-potential` | Chemical Potential and Thermodynamic Equilibrium |
| 670 | physics | 15 | `phys.stat.phase-transitions` | Phase Transitions and Landau Mean-Field Theory |
| 671 | english | 15 | `eng.grammar.question-formation` | Question Formation |
| 672 | english | 15 | `eng.grammar.negation` | Negation |
| 673 | english | 15 | `eng.grammar.clauses` | Independent and Dependent Clauses |
| 674 | english | 15 | `eng.grammar.active-and-passive-voice` | Active and Passive Voice |
| 675 | english | 15 | `eng.grammar.direct-and-indirect-speech` | Direct and Indirect Speech |
| 676 | english | 15 | `eng.grammar.capitalization-rules` | Capitalization Rules |
| 677 | english | 15 | `eng.reading.inference-in-reading` | Inference in Reading |
| 678 | english | 15 | `eng.reading.summarizing` | Summarizing |
| 679 | english | 15 | `eng.reading.text-structure` | Text Structure |
| 680 | english | 15 | `eng.speaking.presentation-skills` | Presentation Skills |
| 681 | chemistry | 15 | `chem.state.phase-diagram` | Phase Diagrams |
| 682 | chemistry | 15 | `chem.sol.vapour-pressure` | Vapour Pressure of Solutions |
| 683 | chemistry | 15 | `chem.elect.nernst` | Nernst Equation |
| 684 | chemistry | 15 | `chem.elect.industrial` | Industrial Electrolysis |
| 685 | chemistry | 15 | `chem.surface.surfactants` | Surfactants and Micelles |
| 686 | chemistry | 15 | `chem.org.mechanisms` | Organic Reaction Mechanisms |
| 687 | chemistry | 15 | `chem.hyd.polycyclic` | Polycyclic and Heterocyclic Systems |
| 688 | chemistry | 15 | `chem.hal.sn1` | SN1 Mechanism |
| 689 | chemistry | 15 | `chem.hal.sn2` | SN2 Mechanism |
| 690 | chemistry | 15 | `chem.hal.haloarenes` | Haloarenes |
| 691 | chemistry | 15 | `chem.hal.cfcs` | Polyhalogen Compounds and CFCs |
| 692 | chemistry | 15 | `chem.nitro.nitro-compounds` | Nitro Compounds |
| 693 | biology | 15 | `bio.evo.human-evolution` | Human Evolution |
| 694 | biology | 15 | `bio.biotech.biotech-process-applications` | Biotechnology Process Applications |
| 695 | computer_science | 15 | `cs.func.modules-packages` | Modules and Packages |
| 696 | computer_science | 15 | `cs.struct.queues` | Queues |
| 697 | computer_science | 15 | `cs.struct.efficient-sorts` | Efficient Sorting — Merge Sort and Quick Sort |
| 698 | computer_science | 15 | `cs.oop.inheritance` | Inheritance |
| 699 | computer_science | 15 | `cs.db.relational-model` | The Relational Model |
| 700 | computer_science | 15 | `cs.se.software-testing` | Software Testing Fundamentals |
| 701 | mathematics | 16 | `math.arith.absolute-value` | Absolute Value |
| 702 | mathematics | 16 | `math.arith.integer-arithmetic` | Integer Arithmetic |
| 703 | mathematics | 16 | `math.arith.long-multiplication` | Long Multiplication |
| 704 | mathematics | 16 | `math.arith.mental-multiplication` | Mental Multiplication |
| 705 | mathematics | 16 | `math.arith.remainder` | Remainder |
| 706 | mathematics | 16 | `math.arith.divisor-dividend` | Divisor and Dividend |
| 707 | mathematics | 16 | `math.arith.order-of-operations` | Order of Operations |
| 708 | mathematics | 16 | `math.arith.exponent-rules` | Exponent Rules |
| 709 | mathematics | 16 | `math.arith.square-numbers` | Perfect Squares |
| 710 | mathematics | 16 | `math.arith.cube-numbers` | Perfect Cubes |
| 711 | mathematics | 16 | `math.nt.divisibility` | Divisibility |
| 712 | mathematics | 16 | `math.nt.division-algorithm` | Division Algorithm |
| 713 | mathematics | 16 | `math.geom.circle-equation` | Equation of a Circle |
| 714 | mathematics | 16 | `math.geom.x-y-coordinates` | Cartesian Coordinates |
| 715 | mathematics | 16 | `math.geom.quadrants` | Quadrants |
| 716 | mathematics | 16 | `math.geom.midpoint-formula` | Midpoint Formula |
| 717 | mathematics | 16 | `math.geom.slope` | Slope |
| 718 | mathematics | 16 | `math.geom.transformations` | Geometric Transformations |
| 719 | mathematics | 16 | `math.geom.vectors-2d` | Vectors in 2D |
| 720 | mathematics | 16 | `math.func.graph-of-function` | Graph of a Function |
| 721 | mathematics | 16 | `math.calc.limits` | Limit of a Function |
| 722 | mathematics | 16 | `math.calc.parametric-curves` | Parametric Equations and Curves |
| 723 | mathematics | 16 | `math.prob.classical-probability` | Classical Probability |
| 724 | mathematics | 16 | `math.disc.permutations` | Permutations |
| 725 | mathematics | 16 | `math.disc.pigeonhole` | Pigeonhole Principle |
| 726 | mathematics | 16 | `math.abst.galois-theory` | Galois Theory |
| 727 | mathematics | 16 | `math.real.sup-inf` | Supremum and Infimum |
| 728 | mathematics | 16 | `math.real.archimedean` | Archimedean Property |
| 729 | mathematics | 16 | `math.real.convergence-sequences` | Convergence of Sequences |
| 730 | mathematics | 16 | `math.real.open-sets` | Open and Closed Sets |
| 731 | physics | 16 | `phys.mech.hamilton-jacobi-equation` | Hamilton-Jacobi Equation and Action-Angle Variables |
| 732 | physics | 16 | `phys.mod.binding-energy` | Nuclear Binding Energy and Mass Defect |
| 733 | physics | 16 | `phys.qm.hydrogen-atom-qm` | Quantum Treatment of Hydrogen Atom |
| 734 | physics | 16 | `phys.qm.spin` | Electron Spin and the Stern-Gerlach Experiment |
| 735 | physics | 16 | `phys.rel.spacetime` | Spacetime Interval and Four-Vectors |
| 736 | physics | 16 | `phys.stat.ising-model` | Ising Model |
| 737 | physics | 16 | `phys.particle.four-forces` | Four Fundamental Forces |
| 738 | english | 16 | `eng.grammar.simple-sentences` | Simple Sentences |
| 739 | english | 16 | `eng.grammar.end-punctuation` | End Punctuation |
| 740 | english | 16 | `eng.reading.predicting-and-confirming` | Predicting and Confirming |
| 741 | english | 16 | `eng.reading.genre-recognition` | Genre Recognition |
| 742 | english | 16 | `eng.reading.authors-purpose-and-tone` | Author's Purpose and Tone |
| 743 | english | 16 | `eng.reading.compare-and-contrast-texts` | Comparing and Contrasting Texts |
| 744 | english | 16 | `eng.speaking.debate-skills` | Debate Skills |
| 745 | chemistry | 16 | `chem.sol.colligative` | Colligative Properties |
| 746 | chemistry | 16 | `chem.sol.activity` | Activity and Non-ideal Solutions |
| 747 | chemistry | 16 | `chem.elect.concentration-cell` | Concentration Cells |
| 748 | chemistry | 16 | `chem.org.arrow-pushing` | Electron Flow and Arrow Notation |
| 749 | chemistry | 16 | `chem.org.pericyclic` | Pericyclic Reactions |
| 750 | chemistry | 16 | `chem.hyd.alkenes` | Alkenes |
| 751 | chemistry | 16 | `chem.hal.elimination` | Elimination Reactions |
| 752 | chemistry | 16 | `chem.hal.grignard` | Grignard and Organolithium Reagents |
| 753 | chemistry | 16 | `chem.alc.alcohols` | Alcohols |
| 754 | biology | 16 | `bio.biotech.genomics-proteomics` | Genomics and Proteomics |
| 755 | computer_science | 16 | `cs.func.decorators` | Decorators |
| 756 | computer_science | 16 | `cs.struct.deques-priority-queues` | Deques and Priority Queues |
| 757 | computer_science | 16 | `cs.struct.linked-lists` | Singly Linked Lists |
| 758 | computer_science | 16 | `cs.oop.polymorphism-overloading` | Polymorphism and Operator Overloading |
| 759 | computer_science | 16 | `cs.db.normalisation` | Normalisation |
| 760 | computer_science | 16 | `cs.db.sql-ddl-dml` | SQL — DDL and DML Basics |
| 761 | computer_science | 16 | `cs.ds.numpy-arrays` | NumPy for Numerical Computing |
| 762 | mathematics | 17 | `math.arith.long-division` | Long Division |
| 763 | mathematics | 17 | `math.arith.fraction-equivalence` | Equivalent Fractions |
| 764 | mathematics | 17 | `math.arith.fraction-multiplication` | Multiplication and Division of Fractions |
| 765 | mathematics | 17 | `math.arith.fraction-reciprocal` | Reciprocal |
| 766 | mathematics | 17 | `math.arith.mixed-numbers` | Mixed Numbers |
| 767 | mathematics | 17 | `math.arith.improper-fractions` | Improper Fractions |
| 768 | mathematics | 17 | `math.arith.decimals` | Decimals |
| 769 | mathematics | 17 | `math.arith.ratios` | Ratio |
| 770 | mathematics | 17 | `math.arith.square-roots` | Square Roots |
| 771 | mathematics | 17 | `math.arith.mental-arithmetic` | Mental Arithmetic |
| 772 | mathematics | 17 | `math.nt.divisibility-rules` | Divisibility Rules |
| 773 | mathematics | 17 | `math.nt.prime-number` | Prime Number |
| 774 | mathematics | 17 | `math.nt.modular-arithmetic` | Modular Arithmetic |
| 775 | mathematics | 17 | `math.nt.induction-applications` | Induction in Number Theory |
| 776 | mathematics | 17 | `math.alg.expression` | Algebraic Expression |
| 777 | mathematics | 17 | `math.geom.pythagorean-theorem` | Pythagorean Theorem |
| 778 | mathematics | 17 | `math.geom.line-equation` | Equations of Lines |
| 779 | mathematics | 17 | `math.geom.translation` | Translation |
| 780 | mathematics | 17 | `math.geom.reflection` | Reflection |
| 781 | mathematics | 17 | `math.geom.vectors-3d` | Vectors in 3D |
| 782 | mathematics | 17 | `math.func.zero-of-function` | Zero of a Function |
| 783 | mathematics | 17 | `math.func.even-odd-functions` | Even and Odd Functions |
| 784 | mathematics | 17 | `math.func.transformations-functions` | Transformations of Functions |
| 785 | mathematics | 17 | `math.func.linear-function` | Linear Function |
| 786 | mathematics | 17 | `math.seq.convergent` | Convergent Sequence |
| 787 | mathematics | 17 | `math.calc.limit-laws` | Limit Laws |
| 788 | mathematics | 17 | `math.calc.one-sided-limits` | One-Sided Limits |
| 789 | mathematics | 17 | `math.calc.limits-at-infinity` | Limits at Infinity |
| 790 | mathematics | 17 | `math.calc.continuity` | Continuity |
| 791 | mathematics | 17 | `math.calc.derivative-intro` | Slope of Tangent and Rate of Change |
| 792 | mathematics | 17 | `math.calc.riemann-sums` | Riemann Sums |
| 793 | mathematics | 17 | `math.calc.sequence-limits` | Limits of Sequences (Calculus) |
| 794 | mathematics | 17 | `math.linalg.vector` | Vector |
| 795 | mathematics | 17 | `math.prob.convergence-types` | Modes of Convergence |
| 796 | mathematics | 17 | `math.stats.population-sample` | Population and Sample |
| 797 | mathematics | 17 | `math.disc.combinations` | Combinations |
| 798 | mathematics | 17 | `math.disc.asymptotic-notation` | Asymptotic Notation |
| 799 | mathematics | 17 | `math.abst.galois-group` | Galois Group |
| 800 | mathematics | 17 | `math.real.cauchy-sequence` | Cauchy Sequence |
| 801 | mathematics | 17 | `math.real.series-rigorous` | Series (Rigorous) |
| 802 | mathematics | 17 | `math.real.compactness` | Compactness |
| 803 | mathematics | 17 | `math.real.connectedness` | Connectedness |
| 804 | mathematics | 17 | `math.real.pointwise-convergence` | Pointwise Convergence |
| 805 | mathematics | 17 | `math.graph.ramsey-theory` | Ramsey Theory |
| 806 | physics | 17 | `phys.mod.nuclear-fission` | Nuclear Fission and Chain Reactions |
| 807 | physics | 17 | `phys.mod.nuclear-fusion` | Nuclear Fusion and Stellar Energy |
| 808 | physics | 17 | `phys.mod.nuclear-models` | Nuclear Models: Shell Model |
| 809 | physics | 17 | `phys.qm.pauli-exclusion` | Pauli Exclusion Principle |
| 810 | physics | 17 | `phys.qm.perturbation-theory` | Time-Independent Perturbation Theory |
| 811 | physics | 17 | `phys.qm.selection-rules` | Selection Rules and Transition Probabilities |
| 812 | physics | 17 | `phys.qm.angular-momentum-addition` | Addition of Angular Momenta and Clebsch-Gordan Coefficients |
| 813 | physics | 17 | `phys.qm.density-matrix` | Density Matrix and Mixed Quantum States |
| 814 | physics | 17 | `phys.stat.phase-transitions-critical-phenomena` | Critical Phenomena, Scaling Laws, and Universality |
| 815 | physics | 17 | `phys.stat.monte-carlo-basics` | Monte Carlo Methods in Statistical Physics |
| 816 | physics | 17 | `phys.particle.particle-classification` | Particle Classification: Hadrons and Leptons |
| 817 | physics | 17 | `phys.particle.gauge-bosons` | Gauge Bosons and Force Carriers |
| 818 | english | 17 | `eng.grammar.compound-sentences` | Compound Sentences |
| 819 | english | 17 | `eng.grammar.comma-usage` | Comma Usage |
| 820 | english | 17 | `eng.grammar.sentence-fragments` | Sentence Fragments |
| 821 | english | 17 | `eng.reading.close-reading` | Close Reading |
| 822 | english | 17 | `eng.writing.sentence-writing` | Sentence Writing |
| 823 | chemistry | 17 | `chem.sol.osmosis` | Osmosis and Osmotic Pressure |
| 824 | chemistry | 17 | `chem.hyd.alkynes` | Alkynes |
| 825 | chemistry | 17 | `chem.alc.phenols` | Phenols |
| 826 | chemistry | 17 | `chem.alc.ethers` | Ethers |
| 827 | chemistry | 17 | `chem.alc.diols` | Diols and Polyols |
| 828 | chemistry | 17 | `chem.carb.aldehydes` | Aldehydes |
| 829 | chemistry | 17 | `chem.nitro.amines` | Amines |
| 830 | chemistry | 17 | `chem.poly.addition` | Addition Polymerization |
| 831 | biology | 17 | `bio.biotech.crispr-genome-editing` | CRISPR and Genome Editing |
| 832 | biology | 17 | `bio.bioinfo.bioinformatics-intro` | Introduction to Bioinformatics |
| 833 | computer_science | 17 | `cs.struct.doubly-circular-lists` | Doubly and Circular Linked Lists |
| 834 | computer_science | 17 | `cs.struct.trees` | Trees |
| 835 | computer_science | 17 | `cs.oop.class-static-methods` | Class Methods and Static Methods |
| 836 | computer_science | 17 | `cs.db.sql-queries-functions` | SQL — Queries and Aggregate Functions |
| 837 | computer_science | 17 | `cs.ds.pandas-dataframes` | Pandas for Data Analysis |
| 838 | mathematics | 18 | `math.arith.decimal-operations` | Decimal Operations |
| 839 | mathematics | 18 | `math.arith.terminating-decimals` | Terminating Decimals |
| 840 | mathematics | 18 | `math.arith.repeating-decimals` | Repeating Decimals |
| 841 | mathematics | 18 | `math.arith.percentages` | Percentages |
| 842 | mathematics | 18 | `math.arith.proportion` | Proportion |
| 843 | mathematics | 18 | `math.arith.unit-rate` | Unit Rate |
| 844 | mathematics | 18 | `math.arith.rounding` | Rounding |
| 845 | mathematics | 18 | `math.arith.irrational-roots` | Irrational Square Roots |
| 846 | mathematics | 18 | `math.arith.scientific-notation` | Scientific Notation |
| 847 | mathematics | 18 | `math.nt.composite-number` | Composite Number |
| 848 | mathematics | 18 | `math.nt.sieve-of-eratosthenes` | Sieve of Eratosthenes |
| 849 | mathematics | 18 | `math.nt.prime-factorization` | Prime Factorization |
| 850 | mathematics | 18 | `math.nt.congruence` | Congruence |
| 851 | mathematics | 18 | `math.nt.fermats-little-theorem` | Fermat's Little Theorem |
| 852 | mathematics | 18 | `math.nt.prime-distribution` | Distribution of Primes |
| 853 | mathematics | 18 | `math.alg.term` | Term |
| 854 | mathematics | 18 | `math.alg.equation` | Equation |
| 855 | mathematics | 18 | `math.alg.polynomial` | Polynomial |
| 856 | mathematics | 18 | `math.alg.exponent-rules` | Exponent Rules (Algebraic) |
| 857 | mathematics | 18 | `math.geom.pythagorean-converse` | Converse of the Pythagorean Theorem |
| 858 | mathematics | 18 | `math.geom.similar-triangles` | Similar Triangles |
| 859 | mathematics | 18 | `math.geom.distance-formula` | Distance Formula |
| 860 | mathematics | 18 | `math.geom.dilation` | Dilation |
| 861 | mathematics | 18 | `math.geom.cross-product` | Cross Product |
| 862 | mathematics | 18 | `math.geom.differential-geometry-curves` | Curves in Space |
| 863 | mathematics | 18 | `math.seq.divergent-sequence` | Divergent Sequence |
| 864 | mathematics | 18 | `math.seq.series-convergence` | Convergence of Series |
| 865 | mathematics | 18 | `math.calc.squeeze-theorem` | Squeeze Theorem |
| 866 | mathematics | 18 | `math.calc.continuity-types` | Types of Discontinuity |
| 867 | mathematics | 18 | `math.calc.ivt` | Intermediate Value Theorem |
| 868 | mathematics | 18 | `math.calc.derivative-definition` | Derivative (Definition) |
| 869 | mathematics | 18 | `math.calc.definite-integral` | Definite Integral |
| 870 | mathematics | 18 | `math.calc.line-integrals` | Line Integrals |
| 871 | mathematics | 18 | `math.linalg.vector-addition` | Vector Addition |
| 872 | mathematics | 18 | `math.linalg.scalar-multiplication` | Scalar Multiplication |
| 873 | mathematics | 18 | `math.linalg.dot-product` | Dot Product |
| 874 | mathematics | 18 | `math.linalg.matrix` | Matrix |
| 875 | mathematics | 18 | `math.prob.combinatorial-probability` | Combinatorial Probability |
| 876 | mathematics | 18 | `math.stats.descriptive-statistics` | Descriptive Statistics |
| 877 | mathematics | 18 | `math.stats.sampling` | Sampling Methods |
| 878 | mathematics | 18 | `math.disc.binomial-theorem` | Binomial Theorem |
| 879 | mathematics | 18 | `math.disc.combinatorics` | Combinatorics |
| 880 | mathematics | 18 | `math.disc.stars-bars` | Stars and Bars |
| 881 | mathematics | 18 | `math.disc.inclusion-exclusion` | Inclusion-Exclusion Principle |
| 882 | mathematics | 18 | `math.abst.sylow-theorems` | Sylow Theorems |
| 883 | mathematics | 18 | `math.abst.finite-field` | Finite Field |
| 884 | mathematics | 18 | `math.abst.galois-correspondence` | Fundamental Theorem of Galois Theory |
| 885 | mathematics | 18 | `math.real.absolute-convergence` | Absolute Convergence |
| 886 | mathematics | 18 | `math.real.completeness-metric` | Completeness of Metric Spaces |
| 887 | mathematics | 18 | `math.real.continuity-rigorous` | Continuity (ε-δ) |
| 888 | mathematics | 18 | `math.opt.convex-set` | Convex Set |
| 889 | mathematics | 18 | `math.graph.shortest-path` | Shortest Path Algorithms |
| 890 | physics | 18 | `phys.qm.variational-method` | Variational Method and Variational Principle |
| 891 | physics | 18 | `phys.qm.identical-particles` | Identical Particles and the Symmetrization Postulate |
| 892 | physics | 18 | `phys.qm.scattering-theory-born-approximation` | Scattering Theory and the Born Approximation |
| 893 | physics | 18 | `phys.stat.fermi-dirac` | Fermi-Dirac Statistics |
| 894 | physics | 18 | `phys.astro.stellar-structure` | Stellar Structure and the Main Sequence |
| 895 | physics | 18 | `phys.particle.antimatter` | Antimatter and Antiparticles |
| 896 | physics | 18 | `phys.particle.quarks` | Quarks |
| 897 | physics | 18 | `phys.particle.leptons` | Leptons |
| 898 | english | 18 | `eng.grammar.complex-sentences` | Complex Sentences |
| 899 | english | 18 | `eng.grammar.parallel-structure` | Parallel Structure |
| 900 | english | 18 | `eng.grammar.apostrophes` | Apostrophes |
| 901 | english | 18 | `eng.grammar.quotation-marks` | Quotation Marks |
| 902 | english | 18 | `eng.grammar.colons-semicolons-dashes` | Colons, Semicolons, and Dashes |
| 903 | english | 18 | `eng.grammar.run-on-sentences-and-comma-splices` | Run-On Sentences and Comma Splices |
| 904 | english | 18 | `eng.reading.critical-reading` | Critical Reading |
| 905 | english | 18 | `eng.writing.paragraph-structure` | Paragraph Structure |
| 906 | english | 18 | `eng.literature.narrative-elements` | Narrative Elements |
| 907 | chemistry | 18 | `chem.alc.epoxides` | Epoxides |
| 908 | chemistry | 18 | `chem.alc.protection` | Protecting Group Strategy |
| 909 | chemistry | 18 | `chem.carb.ketones` | Ketones |
| 910 | chemistry | 18 | `chem.carb.carboxylic` | Carboxylic Acids |
| 911 | chemistry | 18 | `chem.nitro.diazonium` | Diazonium Salts |
| 912 | chemistry | 18 | `chem.nitro.heterocycles` | Nitrogen Heterocycles |
| 913 | chemistry | 18 | `chem.bio.carbohydrates` | Carbohydrates |
| 914 | biology | 18 | `bio.bioinfo.sequence-alignment` | Sequence Alignment |
| 915 | biology | 18 | `bio.sys.systems-biology-intro` | Introduction to Systems Biology |
| 916 | computer_science | 18 | `cs.struct.binary-search-trees` | Binary Search Trees |
| 917 | computer_science | 18 | `cs.struct.heaps` | Heaps |
| 918 | computer_science | 18 | `cs.struct.graphs-representation` | Graphs and Their Representations |
| 919 | computer_science | 18 | `cs.oop.design-patterns-intro` | Introduction to Design Patterns |
| 920 | computer_science | 18 | `cs.db.sql-joins-subqueries` | SQL — Joins and Subqueries |
| 921 | computer_science | 18 | `cs.ds.data-visualisation` | Data Visualisation with Matplotlib |
| 922 | mathematics | 19 | `math.arith.percentage-calculations` | Percentage Calculations |
| 923 | mathematics | 19 | `math.arith.direct-variation` | Direct Variation |
| 924 | mathematics | 19 | `math.arith.inverse-variation` | Inverse Variation |
| 925 | mathematics | 19 | `math.arith.estimation` | Estimation |
| 926 | mathematics | 19 | `math.arith.significant-figures` | Significant Figures |
| 927 | mathematics | 19 | `math.nt.fundamental-theorem-arithmetic` | Fundamental Theorem of Arithmetic |
| 928 | mathematics | 19 | `math.nt.gcd` | Greatest Common Divisor |
| 929 | mathematics | 19 | `math.nt.residue-classes` | Residue Classes |
| 930 | mathematics | 19 | `math.nt.eulers-theorem` | Euler's Theorem |
| 931 | mathematics | 19 | `math.nt.eulers-totient` | Euler's Totient Function |
| 932 | mathematics | 19 | `math.nt.primality-testing` | Primality Testing |
| 933 | mathematics | 19 | `math.alg.coefficient` | Coefficient |
| 934 | mathematics | 19 | `math.alg.solution-set` | Solution Set |
| 935 | mathematics | 19 | `math.alg.degree` | Degree of a Polynomial |
| 936 | mathematics | 19 | `math.alg.zero-exponent` | Zero Exponent |
| 937 | mathematics | 19 | `math.alg.negative-exponent` | Negative Exponent |
| 938 | mathematics | 19 | `math.alg.radicals` | Radical Expressions |
| 939 | mathematics | 19 | `math.alg.exponential-function` | Exponential Function |
| 940 | mathematics | 19 | `math.alg.inequality` | Inequality |
| 941 | mathematics | 19 | `math.alg.binomial-theorem` | Binomial Theorem |
| 942 | mathematics | 19 | `math.trig.right-triangle-trig` | Right-Triangle Trigonometry |
| 943 | mathematics | 19 | `math.seq.divergence-test` | Divergence Test (nth Term Test) |
| 944 | mathematics | 19 | `math.seq.comparison-test` | Comparison Test |
| 945 | mathematics | 19 | `math.seq.ratio-test` | Ratio Test |
| 946 | mathematics | 19 | `math.seq.root-test` | Root Test |
| 947 | mathematics | 19 | `math.seq.alternating-series` | Alternating Series |
| 948 | mathematics | 19 | `math.seq.harmonic-series` | Harmonic Series |
| 949 | mathematics | 19 | `math.calc.differentiability` | Differentiability |
| 950 | mathematics | 19 | `math.calc.derivative-rules` | Basic Differentiation Rules |
| 951 | mathematics | 19 | `math.calc.lhopitals-rule` | L'Hôpital's Rule |
| 952 | mathematics | 19 | `math.calc.mean-value-theorem` | Mean Value Theorem |
| 953 | mathematics | 19 | `math.calc.linearization` | Linearization and Differentials |
| 954 | mathematics | 19 | `math.calc.ftc-part1` | Fundamental Theorem of Calculus Part 1 |
| 955 | mathematics | 19 | `math.calc.improper-integrals` | Improper Integrals |
| 956 | mathematics | 19 | `math.calc.integral-area` | Area by Integration |
| 957 | mathematics | 19 | `math.calc.power-series` | Power Series |
| 958 | mathematics | 19 | `math.calc.multivariable-intro` | Introduction to Multivariable Calculus |
| 959 | mathematics | 19 | `math.linalg.norm` | Vector Norm |
| 960 | mathematics | 19 | `math.linalg.orthogonality` | Orthogonality |
| 961 | mathematics | 19 | `math.linalg.cross-product` | Cross Product |
| 962 | mathematics | 19 | `math.linalg.matrix-addition` | Matrix Addition |
| 963 | mathematics | 19 | `math.linalg.matrix-multiplication` | Matrix Multiplication |
| 964 | mathematics | 19 | `math.linalg.matrix-transpose` | Matrix Transpose |
| 965 | mathematics | 19 | `math.linalg.vector-space` | Vector Space |
| 966 | mathematics | 19 | `math.prob.continuous-rv` | Continuous Random Variable |
| 967 | mathematics | 19 | `math.stats.measures-of-center` | Measures of Center |
| 968 | mathematics | 19 | `math.stats.measures-of-spread` | Measures of Spread |
| 969 | mathematics | 19 | `math.stats.data-visualization` | Data Visualization |
| 970 | mathematics | 19 | `math.disc.derangements` | Derangements |
| 971 | mathematics | 19 | `math.disc.recurrence-relation` | Recurrence Relation |
| 972 | mathematics | 19 | `math.disc.graph-representation` | Graph Representation |
| 973 | mathematics | 19 | `math.real.uniform-continuity` | Uniform Continuity |
| 974 | mathematics | 19 | `math.real.extreme-value-theorem` | Extreme Value Theorem |
| 975 | mathematics | 19 | `math.real.ivt` | Intermediate Value Theorem (Rigorous) |
| 976 | mathematics | 19 | `math.real.differentiability-rigorous` | Differentiability (Rigorous) |
| 977 | mathematics | 19 | `math.real.riemann-integral` | Riemann Integral (Rigorous) |
| 978 | mathematics | 19 | `math.real.uniform-convergence` | Uniform Convergence |
| 979 | mathematics | 19 | `math.real.baire-category` | Baire Category Theorem |
| 980 | mathematics | 19 | `math.graph.extremal-graph-theory` | Extremal Graph Theory |
| 981 | physics | 19 | `phys.qm.wkb-approximation` | WKB Approximation (Semiclassical Limit) |
| 982 | physics | 19 | `phys.qm.s-matrix-basics` | S-Matrix and Scattering Amplitudes |
| 983 | physics | 19 | `phys.astro.stellar-evolution` | Stellar Evolution and End States |
| 984 | physics | 19 | `phys.astro.cosmology` | Big Bang Cosmology |
| 985 | physics | 19 | `phys.particle.neutrinos` | Neutrinos |
| 986 | physics | 19 | `phys.particle.hadron-quark-model` | Quark Model of Hadrons: Baryons and Mesons |
| 987 | physics | 19 | `phys.particle.strong-interaction` | The Strong Interaction and Color Charge |
| 988 | physics | 19 | `phys.mod.energy-bands` | Energy Bands in Solids |
| 989 | english | 19 | `eng.grammar.sentence-combining` | Sentence Combining |
| 990 | english | 19 | `eng.reading.evaluating-sources` | Evaluating Sources |
| 991 | english | 19 | `eng.writing.topic-sentences` | Topic Sentences |
| 992 | english | 19 | `eng.literature.plot-structure` | Plot Structure |
| 993 | english | 19 | `eng.literature.character-development` | Character Development |
| 994 | english | 19 | `eng.literature.setting-and-atmosphere` | Setting and Atmosphere |
| 995 | english | 19 | `eng.literature.point-of-view` | Point of View |
| 996 | english | 19 | `eng.literature.drama-basics` | Drama Basics |
| 997 | chemistry | 19 | `chem.carb.alpha-reactions` | Alpha-Carbon Reactions |
| 998 | chemistry | 19 | `chem.carb.derivatives` | Carboxylic Acid Derivatives |
| 999 | chemistry | 19 | `chem.carb.spectro` | Spectroscopic ID of Carbonyls |
| 1000 | chemistry | 19 | `chem.nitro.amino-acids` | Amino Acids |
| 1001 | biology | 19 | `bio.bioinfo.phylogenetics-computational` | Computational Phylogenetics |
| 1002 | biology | 19 | `bio.bioinfo.structural-bioinformatics` | Structural Bioinformatics |
| 1003 | biology | 19 | `bio.sys.gene-regulatory-networks` | Gene Regulatory Networks |
| 1004 | biology | 19 | `bio.evo.molecular-evolution` | Molecular Evolution and Neutral Theory |
| 1005 | computer_science | 19 | `cs.struct.balanced-trees` | Balanced Search Trees |
| 1006 | computer_science | 19 | `cs.struct.graph-traversal` | Graph Traversal — BFS and DFS |
| 1007 | computer_science | 19 | `cs.db.transactions-acid` | Transactions and the ACID Properties |
| 1008 | computer_science | 19 | `cs.db.mysql-python` | Connecting Python to MySQL |
| 1009 | computer_science | 19 | `cs.se.agile-design-principles` | Agile Practices and Software Design Principles |
| 1010 | computer_science | 19 | `cs.ds.intro-machine-learning` | Introduction to Machine Learning |
| 1011 | mathematics | 20 | `math.arith.fraction-simplification` | Fraction Simplification |
| 1012 | mathematics | 20 | `math.arith.percentage-change` | Percentage Change |
| 1013 | mathematics | 20 | `math.nt.euclidean-algorithm` | Euclidean Algorithm |
| 1014 | mathematics | 20 | `math.nt.lcm` | Least Common Multiple |
| 1015 | mathematics | 20 | `math.nt.chinese-remainder-theorem` | Chinese Remainder Theorem |
| 1016 | mathematics | 20 | `math.alg.like-terms` | Like Terms |
| 1017 | mathematics | 20 | `math.alg.fractional-exponent` | Fractional Exponent |
| 1018 | mathematics | 20 | `math.alg.simplifying-radicals` | Simplifying Radical Expressions |
| 1019 | mathematics | 20 | `math.alg.radical-equations` | Radical Equations |
| 1020 | mathematics | 20 | `math.alg.exponential-equations` | Exponential Equations |
| 1021 | mathematics | 20 | `math.alg.logarithm` | Logarithm |
| 1022 | mathematics | 20 | `math.alg.pascals-triangle` | Pascal's Triangle |
| 1023 | mathematics | 20 | `math.geom.curvature` | Curvature |
| 1024 | mathematics | 20 | `math.trig.basic-ratios` | Six Trigonometric Ratios |
| 1025 | mathematics | 20 | `math.trig.unit-circle` | Unit Circle |
| 1026 | mathematics | 20 | `math.trig.law-of-sines` | Law of Sines |
| 1027 | mathematics | 20 | `math.trig.law-of-cosines` | Law of Cosines |
| 1028 | mathematics | 20 | `math.func.exponential-function` | Exponential Function |
| 1029 | mathematics | 20 | `math.seq.integral-test` | Integral Test |
| 1030 | mathematics | 20 | `math.seq.absolute-convergence` | Absolute and Conditional Convergence |
| 1031 | mathematics | 20 | `math.calc.product-rule` | Product Rule |
| 1032 | mathematics | 20 | `math.calc.chain-rule` | Chain Rule |
| 1033 | mathematics | 20 | `math.calc.higher-order-derivatives` | Higher-Order Derivatives |
| 1034 | mathematics | 20 | `math.calc.rolles-theorem` | Rolle's Theorem |
| 1035 | mathematics | 20 | `math.calc.increasing-decreasing` | Increasing and Decreasing Functions |
| 1036 | mathematics | 20 | `math.calc.critical-points` | Critical Points |
| 1037 | mathematics | 20 | `math.calc.antiderivatives` | Antiderivatives |
| 1038 | mathematics | 20 | `math.calc.volume-revolution` | Volumes of Revolution |
| 1039 | mathematics | 20 | `math.calc.arc-length` | Arc Length |
| 1040 | mathematics | 20 | `math.calc.radius-of-convergence` | Radius of Convergence |
| 1041 | mathematics | 20 | `math.calc.partial-derivatives` | Partial Derivatives |
| 1042 | mathematics | 20 | `math.calc.multiple-integrals` | Multiple Integrals |
| 1043 | mathematics | 20 | `math.linalg.unit-vector` | Unit Vector |
| 1044 | mathematics | 20 | `math.linalg.symmetric-matrix` | Symmetric Matrix |
| 1045 | mathematics | 20 | `math.linalg.determinant` | Determinant |
| 1046 | mathematics | 20 | `math.linalg.subspace` | Subspace |
| 1047 | mathematics | 20 | `math.linalg.linear-map` | Linear Map |
| 1048 | mathematics | 20 | `math.linalg.inner-product` | Inner Product |
| 1049 | mathematics | 20 | `math.linalg.distance` | Distance in Vector Spaces |
| 1050 | mathematics | 20 | `math.linalg.angle-vectors` | Angle Between Vectors |
| 1051 | mathematics | 20 | `math.prob.pdf` | Probability Density Function |
| 1052 | mathematics | 20 | `math.prob.generating-function` | Probability Generating Function |
| 1053 | mathematics | 20 | `math.prob.markov-chain` | Markov Chain |
| 1054 | mathematics | 20 | `math.stats.percentile` | Percentile |
| 1055 | mathematics | 20 | `math.disc.generating-functions` | Generating Functions |
| 1056 | mathematics | 20 | `math.disc.catalan-numbers` | Catalan Numbers |
| 1057 | mathematics | 20 | `math.disc.stirling-numbers` | Stirling Numbers |
| 1058 | mathematics | 20 | `math.real.lipschitz-continuity` | Lipschitz Continuity |
| 1059 | mathematics | 20 | `math.real.mvt` | Mean Value Theorem (Rigorous) |
| 1060 | mathematics | 20 | `math.real.riemann-integrability` | Riemann Integrability |
| 1061 | mathematics | 20 | `math.real.ftc-rigorous` | Fundamental Theorem of Calculus (Rigorous) |
| 1062 | mathematics | 20 | `math.real.weierstrass-approximation` | Weierstrass Approximation Theorem |
| 1063 | mathematics | 20 | `math.top.smooth-manifold` | Smooth Manifold |
| 1064 | mathematics | 20 | `math.fnal.normed-space` | Normed Space |
| 1065 | mathematics | 20 | `math.num.floating-point` | Floating-Point Arithmetic |
| 1066 | mathematics | 20 | `math.num.root-finding` | Root-Finding Methods |
| 1067 | mathematics | 20 | `math.opt.dynamic-programming` | Dynamic Programming |
| 1068 | physics | 20 | `phys.astro.dark-matter` | Dark Matter and Dark Energy |
| 1069 | physics | 20 | `phys.astro.black-holes` | Black Holes and Schwarzschild Radius |
| 1070 | physics | 20 | `phys.particle.weak-interaction` | The Weak Interaction |
| 1071 | physics | 20 | `phys.particle.conservation-laws` | Conservation Laws in Particle Interactions |
| 1072 | physics | 20 | `phys.mod.semiconductor-classification` | Conductors, Insulators, and Semiconductors |
| 1073 | english | 20 | `eng.reading.reading-across-genres` | Reading Across Genres |
| 1074 | english | 20 | `eng.writing.supporting-details` | Supporting Details |
| 1075 | english | 20 | `eng.literature.theme-and-message` | Theme and Message |
| 1076 | english | 20 | `eng.literature.foreshadowing-and-suspense` | Foreshadowing and Suspense |
| 1077 | english | 20 | `eng.literature.dramatic-structure` | Dramatic Structure |
| 1078 | english | 20 | `eng.literature.prose-fiction` | Prose Fiction |
| 1079 | english | 20 | `eng.linguistics.what-is-linguistics` | What Is Linguistics? |
| 1080 | english | 20 | `eng.communication.media-literacy` | Media Literacy |
| 1081 | chemistry | 20 | `chem.carb.named-reactions` | Named Carbonyl Reactions |
| 1082 | chemistry | 20 | `chem.bio.proteins` | Proteins |
| 1083 | chemistry | 20 | `chem.bio.lipids` | Lipids |
| 1084 | chemistry | 20 | `chem.poly.condensation` | Condensation Polymerization |
| 1085 | biology | 20 | `bio.sys.metabolic-network-modelling` | Metabolic Network Modelling |
| 1086 | computer_science | 20 | `cs.struct.shortest-path-algorithms` | Shortest Path Algorithms |
| 1087 | computer_science | 20 | `cs.db.indexing-query-optimisation` | Indexing and Query Optimisation |
| 1088 | computer_science | 20 | `cs.db.nosql-intro` | Introduction to NoSQL Databases |
| 1089 | computer_science | 20 | `cs.ds.supervised-learning-models` | Supervised Learning Models |
| 1090 | computer_science | 20 | `cs.ds.unsupervised-learning-models` | Unsupervised Learning Models |
| 1091 | mathematics | 21 | `math.arith.fraction-addition` | Addition and Subtraction of Fractions |
| 1092 | mathematics | 21 | `math.nt.extended-euclidean-algorithm` | Extended Euclidean Algorithm |
| 1093 | mathematics | 21 | `math.nt.continued-fractions` | Continued Fractions |
| 1094 | mathematics | 21 | `math.alg.simplification` | Algebraic Simplification |
| 1095 | mathematics | 21 | `math.alg.polynomial-operations` | Polynomial Operations |
| 1096 | mathematics | 21 | `math.alg.rationalizing-denominators` | Rationalizing the Denominator |
| 1097 | mathematics | 21 | `math.alg.logarithm-properties` | Logarithm Properties |
| 1098 | mathematics | 21 | `math.alg.natural-logarithm` | Natural Logarithm |
| 1099 | mathematics | 21 | `math.geom.frenet-serret` | Frenet-Serret Formulas |
| 1100 | mathematics | 21 | `math.geom.differential-geometry-surfaces` | Differential Geometry of Surfaces |
| 1101 | mathematics | 21 | `math.trig.special-angles` | Trigonometric Values at Special Angles |
| 1102 | mathematics | 21 | `math.trig.reference-angles` | Reference Angles |
| 1103 | mathematics | 21 | `math.trig.trig-functions` | Trigonometric Functions |
| 1104 | mathematics | 21 | `math.func.logarithmic-function` | Logarithmic Function |
| 1105 | mathematics | 21 | `math.calc.quotient-rule` | Quotient Rule |
| 1106 | mathematics | 21 | `math.calc.derivative-exponential` | Derivative of Exponential Functions |
| 1107 | mathematics | 21 | `math.calc.implicit-differentiation` | Implicit Differentiation |
| 1108 | mathematics | 21 | `math.calc.local-extrema` | Local Extrema |
| 1109 | mathematics | 21 | `math.calc.concavity` | Concavity and Inflection Points |
| 1110 | mathematics | 21 | `math.calc.ftc-part2` | Fundamental Theorem of Calculus Part 2 |
| 1111 | mathematics | 21 | `math.calc.surface-area-integral` | Surface Area of Revolution |
| 1112 | mathematics | 21 | `math.calc.taylor-series` | Taylor Series |
| 1113 | mathematics | 21 | `math.calc.parametric-calculus` | Calculus of Parametric Curves |
| 1114 | mathematics | 21 | `math.calc.gradient` | Gradient |
| 1115 | mathematics | 21 | `math.calc.chain-rule-multivariable` | Multivariable Chain Rule |
| 1116 | mathematics | 21 | `math.calc.double-integrals` | Double Integrals |
| 1117 | mathematics | 21 | `math.calc.change-of-variables` | Change of Variables (Jacobian) |
| 1118 | mathematics | 21 | `math.de.ode` | Ordinary Differential Equation |
| 1119 | mathematics | 21 | `math.linalg.matrix-inverse` | Matrix Inverse |
| 1120 | mathematics | 21 | `math.linalg.cofactor-expansion` | Cofactor Expansion |
| 1121 | mathematics | 21 | `math.linalg.det-properties` | Properties of Determinants |
| 1122 | mathematics | 21 | `math.linalg.span` | Span |
| 1123 | mathematics | 21 | `math.linalg.kernel-image` | Kernel and Image of Linear Map |
| 1124 | mathematics | 21 | `math.linalg.eigenvalues` | Eigenvalues and Eigenvectors |
| 1125 | mathematics | 21 | `math.linalg.inner-product-space` | Inner Product Space |
| 1126 | mathematics | 21 | `math.linalg.projection` | Orthogonal Projection |
| 1127 | mathematics | 21 | `math.linalg.tensor` | Tensor |
| 1128 | mathematics | 21 | `math.linalg.dual-space` | Dual Space |
| 1129 | mathematics | 21 | `math.prob.continuous-distributions` | Continuous Distributions |
| 1130 | mathematics | 21 | `math.prob.expected-value` | Expected Value |
| 1131 | mathematics | 21 | `math.prob.transition-matrix` | Transition Matrix |
| 1132 | mathematics | 21 | `math.disc.divide-conquer-recurrence` | Divide-and-Conquer Recurrence |
| 1133 | mathematics | 21 | `math.disc.ogf` | Ordinary Generating Function |
| 1134 | mathematics | 21 | `math.disc.egf` | Exponential Generating Function |
| 1135 | mathematics | 21 | `math.real.taylor-rigorous` | Taylor's Theorem (Rigorous) |
| 1136 | mathematics | 21 | `math.real.fixed-point-theorem` | Banach Fixed-Point Theorem |
| 1137 | mathematics | 21 | `math.fnal.completeness` | Completeness |
| 1138 | mathematics | 21 | `math.num.error-analysis` | Error Analysis |
| 1139 | mathematics | 21 | `math.num.newtons-method` | Newton's Method |
| 1140 | physics | 21 | `phys.astro.gravitational-waves` | Gravitational Waves |
| 1141 | physics | 21 | `phys.particle.electroweak-unification` | Electroweak Unification |
| 1142 | physics | 21 | `phys.particle.feynman-diagrams` | Feynman Diagrams (Qualitative) |
| 1143 | physics | 21 | `phys.particle.accelerators-detectors` | Particle Accelerators and Detectors |
| 1144 | physics | 21 | `phys.mod.intrinsic-semiconductors` | Intrinsic Semiconductors |
| 1145 | english | 21 | `eng.writing.transitions-and-cohesion` | Transitions and Cohesion |
| 1146 | english | 21 | `eng.literature.literary-devices-overview` | Overview of Literary Devices |
| 1147 | english | 21 | `eng.literature.prose-nonfiction` | Prose Nonfiction |
| 1148 | english | 21 | `eng.linguistics.phonology-intro` | Introduction to Phonology |
| 1149 | english | 21 | `eng.linguistics.morphology-intro` | Introduction to Morphology |
| 1150 | chemistry | 21 | `chem.bio.nucleic-acids` | Nucleic Acids |
| 1151 | chemistry | 21 | `chem.bio.vitamins` | Vitamins and Hormones |
| 1152 | chemistry | 21 | `chem.bio.enzyme-kinetics` | Enzyme Kinetics |
| 1153 | chemistry | 21 | `chem.poly.natural` | Natural Polymers |
| 1154 | chemistry | 21 | `chem.poly.properties` | Polymer Properties |
| 1155 | chemistry | 21 | `chem.poly.biodegradable` | Biodegradable and Functional Polymers |
| 1156 | biology | 21 | `bio.sys.synthetic-biology` | Synthetic Biology |
| 1157 | computer_science | 21 | `cs.struct.minimum-spanning-tree` | Minimum Spanning Trees |
| 1158 | computer_science | 21 | `cs.ds.neural-networks-intro` | Introduction to Neural Networks |
| 1159 | mathematics | 22 | `math.nt.bezout-identity` | Bézout's Identity |
| 1160 | mathematics | 22 | `math.nt.modular-inverse` | Modular Inverse |
| 1161 | mathematics | 22 | `math.alg.linear-equation-1var` | Linear Equation in One Variable |
| 1162 | mathematics | 22 | `math.alg.polynomial-division` | Polynomial Division |
| 1163 | mathematics | 22 | `math.alg.change-of-base` | Change of Base Formula |
| 1164 | mathematics | 22 | `math.alg.logarithmic-equations` | Logarithmic Equations |
| 1165 | mathematics | 22 | `math.geom.polar-coordinates` | Polar Coordinates |
| 1166 | mathematics | 22 | `math.geom.rotation` | Rotation |
| 1167 | mathematics | 22 | `math.geom.dot-product` | Dot Product |
| 1168 | mathematics | 22 | `math.trig.amplitude-period-phase` | Amplitude, Period, Phase Shift |
| 1169 | mathematics | 22 | `math.trig.trig-identities` | Trigonometric Identities |
| 1170 | mathematics | 22 | `math.trig.inverse-trig` | Inverse Trigonometric Functions |
| 1171 | mathematics | 22 | `math.trig.hyperbolic-functions` | Hyperbolic Functions |
| 1172 | mathematics | 22 | `math.calc.derivative-ln` | Derivative of Logarithmic Functions |
| 1173 | mathematics | 22 | `math.calc.derivative-trig` | Derivatives of Trigonometric Functions |
| 1174 | mathematics | 22 | `math.calc.related-rates` | Related Rates |
| 1175 | mathematics | 22 | `math.calc.optimization` | Optimization (Calculus) |
| 1176 | mathematics | 22 | `math.calc.curve-sketching` | Curve Sketching |
| 1177 | mathematics | 22 | `math.calc.u-substitution` | Integration by Substitution |
| 1178 | mathematics | 22 | `math.calc.maclaurin-series` | Maclaurin Series |
| 1179 | mathematics | 22 | `math.calc.taylor-remainder` | Taylor Remainder and Error Bound |
| 1180 | mathematics | 22 | `math.calc.directional-derivative` | Directional Derivative |
| 1181 | mathematics | 22 | `math.calc.multivariable-extrema` | Multivariable Extrema |
| 1182 | mathematics | 22 | `math.calc.triple-integrals` | Triple Integrals |
| 1183 | mathematics | 22 | `math.calc.surface-integrals` | Surface Integrals |
| 1184 | mathematics | 22 | `math.calc.vector-fields` | Vector Fields |
| 1185 | mathematics | 22 | `math.calc.greens-theorem` | Green's Theorem |
| 1186 | mathematics | 22 | `math.calc.fourier-series-intro` | Fourier Series (Introduction) |
| 1187 | mathematics | 22 | `math.de.ode-order` | Order of a Differential Equation |
| 1188 | mathematics | 22 | `math.de.ode-linearity` | Linearity of Differential Equations |
| 1189 | mathematics | 22 | `math.de.solution-types` | Types of Solutions |
| 1190 | mathematics | 22 | `math.de.pde` | Partial Differential Equation |
| 1191 | mathematics | 22 | `math.linalg.cramer-rule` | Cramer's Rule |
| 1192 | mathematics | 22 | `math.linalg.linear-independence` | Linear Independence |
| 1193 | mathematics | 22 | `math.linalg.column-space` | Column Space |
| 1194 | mathematics | 22 | `math.linalg.characteristic-polynomial` | Characteristic Polynomial |
| 1195 | mathematics | 22 | `math.linalg.least-squares` | Least Squares |
| 1196 | mathematics | 22 | `math.prob.normal-distribution` | Normal Distribution |
| 1197 | mathematics | 22 | `math.prob.linearity-expectation` | Linearity of Expectation |
| 1198 | mathematics | 22 | `math.prob.law-of-unconscious` | Law of the Unconscious Statistician |
| 1199 | mathematics | 22 | `math.prob.variance` | Variance |
| 1200 | mathematics | 22 | `math.prob.moments` | Moments |
| 1201 | mathematics | 22 | `math.prob.markov-inequality` | Markov's Inequality |
| 1202 | mathematics | 22 | `math.prob.stationary-distribution` | Stationary Distribution |
| 1203 | mathematics | 22 | `math.prob.poisson-process` | Poisson Process |
| 1204 | mathematics | 22 | `math.disc.algorithm-complexity` | Algorithm Complexity |
| 1205 | mathematics | 22 | `math.real.implicit-function-theorem` | Implicit Function Theorem |
| 1206 | mathematics | 22 | `math.real.inverse-function-theorem` | Inverse Function Theorem |
| 1207 | mathematics | 22 | `math.fnal.banach-space` | Banach Space |
| 1208 | mathematics | 22 | `math.num.numerical-differentiation` | Numerical Differentiation |
| 1209 | mathematics | 22 | `math.opt.unconstrained-optimization` | Unconstrained Optimization |
| 1210 | mathematics | 22 | `math.opt.convex-function` | Convex Function |
| 1211 | mathematics | 22 | `math.graph.algebraic-graph-theory` | Algebraic Graph Theory |
| 1212 | physics | 22 | `phys.particle.higgs-mechanism` | The Higgs Mechanism |
| 1213 | physics | 22 | `phys.mod.extrinsic-semiconductors` | Extrinsic Semiconductors: Doping and Carrier Types |
| 1214 | english | 22 | `eng.writing.narrative-writing` | Narrative Writing |
| 1215 | english | 22 | `eng.writing.descriptive-writing` | Descriptive Writing |
| 1216 | english | 22 | `eng.writing.expository-writing` | Expository Writing |
| 1217 | english | 22 | `eng.writing.persuasive-writing-basics` | Persuasive Writing Basics |
| 1218 | english | 22 | `eng.literature.metaphor-and-simile` | Metaphor and Simile |
| 1219 | english | 22 | `eng.literature.irony` | Irony |
| 1220 | english | 22 | `eng.literature.poetry-basics` | Poetry Basics |
| 1221 | english | 22 | `eng.linguistics.syntax-theory-intro` | Introduction to Syntactic Theory |
| 1222 | english | 22 | `eng.linguistics.historical-linguistics-intro` | Introduction to Historical Linguistics |
| 1223 | mathematics | 23 | `math.nt.linear-diophantine` | Linear Diophantine Equations |
| 1224 | mathematics | 23 | `math.nt.rsa-basics` | RSA Cryptography (Number-Theoretic Basis) |
| 1225 | mathematics | 23 | `math.alg.inequality-1var` | Linear Inequality in One Variable |
| 1226 | mathematics | 23 | `math.alg.absolute-value-equations` | Absolute Value Equations and Inequalities |
| 1227 | mathematics | 23 | `math.alg.linear-equation-2var` | Linear Equation in Two Variables |
| 1228 | mathematics | 23 | `math.alg.remainder-theorem` | Remainder Theorem |
| 1229 | mathematics | 23 | `math.geom.polar-curves` | Polar Curves |
| 1230 | mathematics | 23 | `math.trig.trig-graphs` | Graphs of Trigonometric Functions |
| 1231 | mathematics | 23 | `math.trig.pythagorean-identities` | Pythagorean Identities |
| 1232 | mathematics | 23 | `math.trig.reciprocal-identities` | Reciprocal Identities |
| 1233 | mathematics | 23 | `math.trig.sum-difference-formulas` | Sum and Difference Formulas |
| 1234 | mathematics | 23 | `math.trig.trig-equations` | Trigonometric Equations |
| 1235 | mathematics | 23 | `math.trig.polar-form-complex` | Polar Form of Complex Numbers |
| 1236 | mathematics | 23 | `math.calc.logarithmic-differentiation` | Logarithmic Differentiation |
| 1237 | mathematics | 23 | `math.calc.derivative-inverse-trig` | Derivatives of Inverse Trig Functions |
| 1238 | mathematics | 23 | `math.calc.hyperbolic-derivatives` | Derivatives of Hyperbolic Functions |
| 1239 | mathematics | 23 | `math.calc.integration-by-parts` | Integration by Parts |
| 1240 | mathematics | 23 | `math.calc.curl-divergence` | Curl and Divergence |
| 1241 | mathematics | 23 | `math.de.ivp` | Initial Value Problem |
| 1242 | mathematics | 23 | `math.de.first-order-ode` | First-Order ODE |
| 1243 | mathematics | 23 | `math.de.pde-classification` | Classification of Second-Order PDEs |
| 1244 | mathematics | 23 | `math.linalg.basis` | Basis |
| 1245 | mathematics | 23 | `math.prob.standard-normal` | Standard Normal Distribution |
| 1246 | mathematics | 23 | `math.prob.standard-deviation` | Standard Deviation |
| 1247 | mathematics | 23 | `math.prob.mgf` | Moment Generating Function |
| 1248 | mathematics | 23 | `math.prob.covariance` | Covariance |
| 1249 | mathematics | 23 | `math.prob.chebyshev` | Chebyshev's Inequality |
| 1250 | mathematics | 23 | `math.prob.ergodicity` | Ergodic Theorem (Markov Chains) |
| 1251 | mathematics | 23 | `math.stats.normal-distribution` | Normal Distribution (Statistics) |
| 1252 | mathematics | 23 | `math.disc.complexity-classes` | Complexity Classes |
| 1253 | mathematics | 23 | `math.fnal.hilbert-space` | Hilbert Space |
| 1254 | mathematics | 23 | `math.fnal.bounded-operator` | Bounded Linear Operator |
| 1255 | mathematics | 23 | `math.fnal.dense-subspace` | Dense Subspaces and Approximation |
| 1256 | mathematics | 23 | `math.opt.convex-optimization` | Convex Optimization |
| 1257 | mathematics | 23 | `math.opt.lagrange-multipliers` | Lagrange Multipliers |
| 1258 | mathematics | 23 | `math.opt.gradient-methods` | Gradient Descent |
| 1259 | physics | 23 | `phys.particle.standard-model` | The Standard Model |
| 1260 | physics | 23 | `phys.mod.pn-junction` | The p-n Junction |
| 1261 | english | 23 | `eng.writing.the-writing-process` | The Writing Process |
| 1262 | english | 23 | `eng.writing.creative-writing-forms` | Creative Writing Forms |
| 1263 | english | 23 | `eng.literature.symbolism` | Symbolism |
| 1264 | english | 23 | `eng.literature.imagery` | Imagery |
| 1265 | english | 23 | `eng.literature.poetic-forms` | Poetic Forms |
| 1266 | english | 23 | `eng.literature.literary-genres-overview` | Overview of Literary Genres |
| 1267 | english | 23 | `eng.linguistics.semantics-intro` | Introduction to Semantics |
| 1268 | english | 23 | `eng.linguistics.language-families` | Language Families |
| 1269 | english | 23 | `eng.linguistics.language-acquisition-intro` | Introduction to Language Acquisition |
| 1270 | mathematics | 24 | `math.nt.general-diophantine` | Diophantine Equations |
| 1271 | mathematics | 24 | `math.alg.inequality-2var` | Linear Inequality in Two Variables |
| 1272 | mathematics | 24 | `math.alg.system-linear-equations` | Systems of Linear Equations |
| 1273 | mathematics | 24 | `math.alg.factor-theorem` | Factor Theorem |
| 1274 | mathematics | 24 | `math.trig.double-angle-formulas` | Double Angle Formulas |
| 1275 | mathematics | 24 | `math.trig.product-to-sum` | Product-to-Sum and Sum-to-Product Formulas |
| 1276 | mathematics | 24 | `math.trig.de-moivres-theorem` | De Moivre's Theorem |
| 1277 | mathematics | 24 | `math.trig.eulers-formula` | Euler's Formula |
| 1278 | mathematics | 24 | `math.calc.reduction-formulas` | Reduction Formulas |
| 1279 | mathematics | 24 | `math.calc.stokes-theorem` | Stokes' Theorem |
| 1280 | mathematics | 24 | `math.calc.divergence-theorem` | Divergence Theorem |
| 1281 | mathematics | 24 | `math.de.existence-uniqueness` | Existence and Uniqueness Theorem |
| 1282 | mathematics | 24 | `math.de.separable` | Separable Differential Equation |
| 1283 | mathematics | 24 | `math.de.linear-first-order` | Linear First-Order ODE |
| 1284 | mathematics | 24 | `math.de.exact-ode` | Exact Differential Equation |
| 1285 | mathematics | 24 | `math.de.slope-field` | Slope Field |
| 1286 | mathematics | 24 | `math.de.euler-method` | Euler's Method |
| 1287 | mathematics | 24 | `math.de.second-order-ode` | Second-Order ODE |
| 1288 | mathematics | 24 | `math.linalg.dimension` | Dimension |
| 1289 | mathematics | 24 | `math.linalg.coordinates` | Coordinates |
| 1290 | mathematics | 24 | `math.linalg.matrix-representation` | Matrix Representation of Linear Map |
| 1291 | mathematics | 24 | `math.linalg.orthogonal-basis` | Orthogonal and Orthonormal Basis |
| 1292 | mathematics | 24 | `math.prob.correlation` | Correlation |
| 1293 | mathematics | 24 | `math.prob.lln` | Law of Large Numbers |
| 1294 | mathematics | 24 | `math.stats.covariance-matrix` | Covariance Matrix |
| 1295 | mathematics | 24 | `math.cx.complex-numbers-analysis` | Complex Numbers (Analysis) |
| 1296 | mathematics | 24 | `math.fnal.dual-space-functional` | Dual Space |
| 1297 | mathematics | 24 | `math.fnal.open-mapping-theorem` | Open Mapping Theorem |
| 1298 | mathematics | 24 | `math.fnal.uniform-boundedness` | Uniform Boundedness Principle |
| 1299 | mathematics | 24 | `math.fnal.riesz-representation` | Riesz Representation Theorem |
| 1300 | mathematics | 24 | `math.fnal.spectral-theory` | Spectral Theory |
| 1301 | mathematics | 24 | `math.fnal.fourier-transform` | Fourier Transform (Functional Analysis) |
| 1302 | mathematics | 24 | `math.opt.duality` | Duality Theory |
| 1303 | mathematics | 24 | `math.opt.stochastic-gradient` | Stochastic Gradient Descent |
| 1304 | mathematics | 24 | `math.opt.newton-optimization` | Newton's Method for Optimization |
| 1305 | physics | 24 | `phys.mod.diode-rectification` | Diode Rectifying Behavior |
| 1306 | english | 24 | `eng.writing.outlining-and-planning` | Outlining and Planning |
| 1307 | english | 24 | `eng.literature.meter-and-rhyme` | Meter and Rhyme |
| 1308 | english | 24 | `eng.literature.short-story-study` | Short Story Study |
| 1309 | english | 24 | `eng.literature.literary-periods-survey` | Survey of Literary Periods |
| 1310 | english | 24 | `eng.linguistics.pragmatics-intro` | Introduction to Pragmatics |
| 1311 | english | 24 | `eng.linguistics.psycholinguistics-intro` | Introduction to Psycholinguistics |
| 1312 | mathematics | 25 | `math.nt.pythagorean-triples` | Pythagorean Triples |
| 1313 | mathematics | 25 | `math.nt.pells-equation` | Pell's Equation |
| 1314 | mathematics | 25 | `math.nt.algebraic-number-theory` | Algebraic Number Theory |
| 1315 | mathematics | 25 | `math.nt.analytic-number-theory` | Analytic Number Theory |
| 1316 | mathematics | 25 | `math.alg.substitution-method` | Substitution Method |
| 1317 | mathematics | 25 | `math.alg.elimination-method` | Elimination Method |
| 1318 | mathematics | 25 | `math.alg.system-3var` | Systems of 3 Equations in 3 Variables |
| 1319 | mathematics | 25 | `math.alg.factoring` | Factoring Polynomials |
| 1320 | mathematics | 25 | `math.trig.half-angle-formulas` | Half Angle Formulas |
| 1321 | mathematics | 25 | `math.calc.trig-integrals` | Trigonometric Integrals |
| 1322 | mathematics | 25 | `math.de.bernoulli` | Bernoulli Equation |
| 1323 | mathematics | 25 | `math.de.homogeneous-ode` | Homogeneous First-Order ODE |
| 1324 | mathematics | 25 | `math.de.second-order-linear` | Second-Order Linear ODE |
| 1325 | mathematics | 25 | `math.de.laplace-transform` | Laplace Transform |
| 1326 | mathematics | 25 | `math.de.systems-ode` | Systems of ODEs |
| 1327 | mathematics | 25 | `math.de.bvp` | Boundary Value Problem |
| 1328 | mathematics | 25 | `math.linalg.linear-system` | System of Linear Equations |
| 1329 | mathematics | 25 | `math.linalg.change-of-basis` | Change of Basis |
| 1330 | mathematics | 25 | `math.linalg.spectral-theorem` | Spectral Theorem |
| 1331 | mathematics | 25 | `math.linalg.gram-schmidt` | Gram-Schmidt Process |
| 1332 | mathematics | 25 | `math.prob.clt` | Central Limit Theorem |
| 1333 | mathematics | 25 | `math.stats.correlation` | Sample Correlation |
| 1334 | mathematics | 25 | `math.cx.complex-function` | Complex-Valued Function |
| 1335 | mathematics | 25 | `math.fnal.hahn-banach` | Hahn-Banach Theorem |
| 1336 | mathematics | 25 | `math.fnal.closed-graph-theorem` | Closed Graph Theorem |
| 1337 | mathematics | 25 | `math.fnal.compact-operator-spectrum` | Compact Operators |
| 1338 | mathematics | 25 | `math.fnal.distributions` | Distributions |
| 1339 | mathematics | 25 | `math.num.euler-method` | Euler's Method (Numerical ODE) |
| 1340 | mathematics | 25 | `math.opt.kkt` | KKT Conditions |
| 1341 | english | 25 | `eng.writing.drafting` | Drafting |
| 1342 | english | 25 | `eng.literature.novel-study` | Novel Study |
| 1343 | english | 25 | `eng.literature.literary-criticism-intro` | Introduction to Literary Criticism |
| 1344 | english | 25 | `eng.linguistics.discourse-analysis-intro` | Introduction to Discourse Analysis |
| 1345 | english | 25 | `eng.linguistics.sociolinguistics-intro` | Introduction to Sociolinguistics |
| 1346 | mathematics | 26 | `math.nt.algebraic-integers` | Algebraic Integers |
| 1347 | mathematics | 26 | `math.alg.factoring-gcf` | Factoring out the GCF |
| 1348 | mathematics | 26 | `math.alg.factoring-special` | Special Factoring Patterns |
| 1349 | mathematics | 26 | `math.alg.rational-expressions` | Rational Expressions |
| 1350 | mathematics | 26 | `math.calc.trig-substitution` | Trigonometric Substitution |
| 1351 | mathematics | 26 | `math.de.second-order-homogeneous` | Homogeneous Second-Order Linear ODE |
| 1352 | mathematics | 26 | `math.de.laplace-properties` | Laplace Transform Properties |
| 1353 | mathematics | 26 | `math.de.convolution-theorem` | Convolution Theorem (Laplace) |
| 1354 | mathematics | 26 | `math.de.phase-plane` | Phase Plane Analysis |
| 1355 | mathematics | 26 | `math.de.series-solution` | Series Solution of ODEs |
| 1356 | mathematics | 26 | `math.de.sturm-liouville` | Sturm-Liouville Theory |
| 1357 | mathematics | 26 | `math.de.fourier-series` | Fourier Series |
| 1358 | mathematics | 26 | `math.linalg.augmented-matrix` | Augmented Matrix |
| 1359 | mathematics | 26 | `math.linalg.positive-definite` | Positive Definite Matrix |
| 1360 | mathematics | 26 | `math.linalg.qr-factorization` | QR Factorization |
| 1361 | mathematics | 26 | `math.stats.sampling-distribution` | Sampling Distribution |
| 1362 | mathematics | 26 | `math.stats.linear-regression` | Simple Linear Regression |
| 1363 | mathematics | 26 | `math.stats.normal-approximation` | Normal Approximation |
| 1364 | mathematics | 26 | `math.cx.cauchy-riemann` | Cauchy-Riemann Equations |
| 1365 | mathematics | 26 | `math.num.interpolation` | Polynomial Interpolation |
| 1366 | mathematics | 26 | `math.num.iterative-linear` | Iterative Methods for Linear Systems |
| 1367 | mathematics | 26 | `math.num.runge-kutta` | Runge-Kutta Methods |
| 1368 | mathematics | 26 | `math.opt.linear-programming` | Linear Programming |
| 1369 | english | 26 | `eng.writing.revising-for-content` | Revising for Content |
| 1370 | english | 26 | `eng.literature.comparative-literature-intro` | Introduction to Comparative Literature |
| 1371 | english | 26 | `eng.linguistics.applied-linguistics-intro` | Introduction to Applied Linguistics |
| 1372 | english | 26 | `eng.linguistics.dialectology` | Dialectology |
| 1373 | english | 26 | `eng.linguistics.corpus-linguistics-intro` | Introduction to Corpus Linguistics |
| 1374 | english | 26 | `eng.communication.discourse-markers-advanced` | Advanced Discourse Markers |
| 1375 | english | 26 | `eng.communication.cross-cultural-communication` | Cross-Cultural Communication |
| 1376 | mathematics | 27 | `math.nt.number-fields` | Number Fields |
| 1377 | mathematics | 27 | `math.alg.factoring-trinomials` | Factoring Trinomials |
| 1378 | mathematics | 27 | `math.alg.rational-expressions-addition` | Addition of Rational Expressions |
| 1379 | mathematics | 27 | `math.alg.rational-expressions-multiplication` | Multiplication of Rational Expressions |
| 1380 | mathematics | 27 | `math.alg.rational-equations` | Rational Equations |
| 1381 | mathematics | 27 | `math.de.wronskian` | Wronskian |
| 1382 | mathematics | 27 | `math.de.stability-analysis` | Stability Analysis |
| 1383 | mathematics | 27 | `math.de.frobenius-method` | Frobenius Method |
| 1384 | mathematics | 27 | `math.de.legendre-equation` | Legendre's Equation |
| 1385 | mathematics | 27 | `math.de.eigenfunction-expansion` | Eigenfunction Expansion |
| 1386 | mathematics | 27 | `math.de.fourier-convergence` | Convergence of Fourier Series |
| 1387 | mathematics | 27 | `math.de.fourier-sine-cosine` | Fourier Sine and Cosine Series |
| 1388 | mathematics | 27 | `math.de.fourier-transform` | Fourier Transform |
| 1389 | mathematics | 27 | `math.de.separation-of-variables-pde` | Separation of Variables (PDE) |
| 1390 | mathematics | 27 | `math.linalg.row-reduction` | Row Reduction |
| 1391 | mathematics | 27 | `math.linalg.svd` | Singular Value Decomposition |
| 1392 | mathematics | 27 | `math.stats.standard-error` | Standard Error |
| 1393 | mathematics | 27 | `math.stats.estimator` | Estimator |
| 1394 | mathematics | 27 | `math.stats.confidence-interval` | Confidence Interval |
| 1395 | mathematics | 27 | `math.stats.hypothesis-testing` | Hypothesis Testing |
| 1396 | mathematics | 27 | `math.stats.multiple-regression` | Multiple Linear Regression |
| 1397 | mathematics | 27 | `math.cx.analytic-functions` | Analytic (Holomorphic) Functions |
| 1398 | mathematics | 27 | `math.num.splines` | Spline Interpolation |
| 1399 | mathematics | 27 | `math.num.numerical-integration` | Numerical Integration |
| 1400 | mathematics | 27 | `math.num.qr-algorithm` | QR Algorithm |
| 1401 | mathematics | 27 | `math.num.stiff-ode` | Stiff ODEs and Implicit Methods |
| 1402 | mathematics | 27 | `math.opt.quadratic-programming` | Quadratic Programming |
| 1403 | mathematics | 27 | `math.opt.semidefinite-programming` | Semidefinite Programming |
| 1404 | mathematics | 27 | `math.opt.integer-programming` | Integer Programming |
| 1405 | english | 27 | `eng.writing.editing-and-proofreading` | Editing and Proofreading |
| 1406 | english | 27 | `eng.linguistics.bilingualism-and-multilingualism` | Bilingualism and Multilingualism |
| 1407 | english | 27 | `eng.linguistics.computational-linguistics-intro` | Introduction to Computational Linguistics |
| 1408 | mathematics | 28 | `math.alg.quadratic-equation` | Quadratic Equation |
| 1409 | mathematics | 28 | `math.de.variation-of-parameters` | Variation of Parameters |
| 1410 | mathematics | 28 | `math.de.bessel-equation` | Bessel's Equation |
| 1411 | mathematics | 28 | `math.de.heat-equation` | Heat Equation |
| 1412 | mathematics | 28 | `math.de.wave-equation` | Wave Equation |
| 1413 | mathematics | 28 | `math.de.laplace-equation` | Laplace's Equation |
| 1414 | mathematics | 28 | `math.de.nonlinear-ode` | Nonlinear ODE |
| 1415 | mathematics | 28 | `math.linalg.row-echelon` | Row Echelon Form |
| 1416 | mathematics | 28 | `math.linalg.lu-factorization` | LU Factorization |
| 1417 | mathematics | 28 | `math.linalg.singular-values` | Singular Values |
| 1418 | mathematics | 28 | `math.linalg.pseudoinverse` | Moore-Penrose Pseudoinverse |
| 1419 | mathematics | 28 | `math.prob.characteristic-function` | Characteristic Function |
| 1420 | mathematics | 28 | `math.stats.bias-variance` | Bias-Variance Tradeoff |
| 1421 | mathematics | 28 | `math.stats.consistency` | Consistency of Estimators |
| 1422 | mathematics | 28 | `math.stats.mle` | Maximum Likelihood Estimation |
| 1423 | mathematics | 28 | `math.stats.method-of-moments` | Method of Moments |
| 1424 | mathematics | 28 | `math.stats.ci-mean` | Confidence Interval for a Mean |
| 1425 | mathematics | 28 | `math.stats.ci-proportion` | Confidence Interval for a Proportion |
| 1426 | mathematics | 28 | `math.stats.test-statistic` | Test Statistic |
| 1427 | mathematics | 28 | `math.stats.type-errors` | Type I and Type II Errors |
| 1428 | mathematics | 28 | `math.stats.z-test` | z-Test |
| 1429 | mathematics | 28 | `math.stats.t-test` | t-Test |
| 1430 | mathematics | 28 | `math.stats.chi-squared-test` | Chi-Squared Test |
| 1431 | mathematics | 28 | `math.stats.anova` | Analysis of Variance |
| 1432 | mathematics | 28 | `math.stats.nonparametric` | Nonparametric Tests |
| 1433 | mathematics | 28 | `math.stats.sufficient-statistic` | Sufficient Statistic |
| 1434 | mathematics | 28 | `math.cx.power-series-cx` | Power Series in ℂ |
| 1435 | mathematics | 28 | `math.cx.complex-integration` | Complex Line Integral |
| 1436 | mathematics | 28 | `math.cx.singularities` | Singularities |
| 1437 | mathematics | 28 | `math.cx.conformal-mapping` | Conformal Mapping |
| 1438 | mathematics | 28 | `math.num.svd` | SVD (Numerical) |
| 1439 | mathematics | 28 | `math.opt.pca` | Principal Component Analysis |
| 1440 | english | 28 | `eng.writing.essay-structure` | Essay Structure |
| 1441 | english | 28 | `eng.linguistics.translation-studies-intro` | Introduction to Translation Studies |
| 1442 | mathematics | 29 | `math.nt.prime-number-theorem` | Prime Number Theorem |
| 1443 | mathematics | 29 | `math.alg.completing-the-square` | Completing the Square |
| 1444 | mathematics | 29 | `math.alg.polynomial-roots` | Polynomial Roots (Real and Complex) |
| 1445 | mathematics | 29 | `math.geom.conic-sections` | Conic Sections |
| 1446 | mathematics | 29 | `math.func.quadratic-function` | Quadratic Function |
| 1447 | mathematics | 29 | `math.de.harmonic-functions` | Harmonic Functions |
| 1448 | mathematics | 29 | `math.de.poisson-equation` | Poisson's Equation |
| 1449 | mathematics | 29 | `math.de.bifurcation` | Bifurcation Theory |
| 1450 | mathematics | 29 | `math.linalg.rank` | Rank |
| 1451 | mathematics | 29 | `math.linalg.null-space` | Null Space |
| 1452 | mathematics | 29 | `math.linalg.cholesky` | Cholesky Decomposition |
| 1453 | mathematics | 29 | `math.stats.p-value` | p-value |
| 1454 | mathematics | 29 | `math.stats.power` | Power of a Test |
| 1455 | mathematics | 29 | `math.stats.two-way-anova` | Two-Way ANOVA |
| 1456 | mathematics | 29 | `math.stats.bayesian-inference` | Bayesian Statistics |
| 1457 | mathematics | 29 | `math.stats.experimental-design` | Experimental Design |
| 1458 | mathematics | 29 | `math.stats.rao-blackwell` | Rao-Blackwell Theorem |
| 1459 | mathematics | 29 | `math.cx.harmonic-functions` | Harmonic Functions (Complex Analysis) |
| 1460 | mathematics | 29 | `math.cx.cauchy-theorem` | Cauchy's Theorem |
| 1461 | mathematics | 29 | `math.cx.identity-theorem` | Identity Theorem |
| 1462 | mathematics | 29 | `math.cx.poles` | Poles and Meromorphic Functions |
| 1463 | mathematics | 29 | `math.cx.essential-singularity` | Essential Singularity |
| 1464 | mathematics | 29 | `math.cx.laurent-series` | Laurent Series |
| 1465 | mathematics | 29 | `math.cx.mobius-transformation` | Möbius Transformation |
| 1466 | mathematics | 29 | `math.cx.riemann-mapping` | Riemann Mapping Theorem |
| 1467 | mathematics | 29 | `math.fnal.special-functions` | Special Functions |
| 1468 | mathematics | 29 | `math.num.lu-factorization` | LU Factorization (Numerical) |
| 1469 | english | 29 | `eng.writing.thesis-statements` | Thesis Statements |
| 1470 | english | 29 | `eng.composition.audience-and-purpose` | Audience and Purpose |
| 1471 | mathematics | 30 | `math.alg.quadratic-formula` | Quadratic Formula |
| 1472 | mathematics | 30 | `math.alg.rational-root-theorem` | Rational Root Theorem |
| 1473 | mathematics | 30 | `math.alg.fundamental-theorem-algebra` | Fundamental Theorem of Algebra |
| 1474 | mathematics | 30 | `math.alg.polynomial-inequality` | Polynomial Inequality |
| 1475 | mathematics | 30 | `math.alg.vietas-formulas` | Vieta's Formulas |
| 1476 | mathematics | 30 | `math.geom.parabola` | Parabola |
| 1477 | mathematics | 30 | `math.geom.ellipse` | Ellipse |
| 1478 | mathematics | 30 | `math.geom.hyperbola` | Hyperbola |
| 1479 | mathematics | 30 | `math.func.vertex-form` | Vertex Form of a Quadratic |
| 1480 | mathematics | 30 | `math.func.polynomial-function` | Polynomial Function |
| 1481 | mathematics | 30 | `math.calc.partial-fractions` | Partial Fraction Decomposition |
| 1482 | mathematics | 30 | `math.de.higher-order-ode` | Higher-Order Linear ODE |
| 1483 | mathematics | 30 | `math.de.greens-function` | Green's Function |
| 1484 | mathematics | 30 | `math.de.chaos` | Chaotic Dynamics |
| 1485 | mathematics | 30 | `math.linalg.rank-nullity` | Rank-Nullity Theorem |
| 1486 | mathematics | 30 | `math.linalg.eigenspace` | Eigenspace |
| 1487 | mathematics | 30 | `math.stats.conjugate-prior` | Conjugate Prior |
| 1488 | mathematics | 30 | `math.stats.credible-interval` | Credible Interval |
| 1489 | mathematics | 30 | `math.disc.linear-recurrence` | Linear Recurrence |
| 1490 | mathematics | 30 | `math.cx.cauchy-goursat` | Cauchy-Goursat Theorem |
| 1491 | mathematics | 30 | `math.cx.cauchy-integral-formula` | Cauchy Integral Formula |
| 1492 | mathematics | 30 | `math.cx.analytic-continuation` | Analytic Continuation |
| 1493 | mathematics | 30 | `math.cx.residue` | Residue |
| 1494 | mathematics | 30 | `math.num.cholesky` | Cholesky Factorization (Numerical) |
| 1495 | english | 30 | `eng.writing.citations-and-referencing` | Citations and Referencing |
| 1496 | english | 30 | `eng.composition.claim-evidence-reasoning` | Claim, Evidence, and Reasoning |
| 1497 | english | 30 | `eng.composition.rhetorical-appeals` | Rhetorical Appeals: Ethos, Pathos, Logos |
| 1498 | mathematics | 31 | `math.alg.discriminant` | Discriminant |
| 1499 | mathematics | 31 | `math.alg.complex-polynomial-roots` | Complex Roots of Polynomials |
| 1500 | mathematics | 31 | `math.alg.rational-inequality` | Rational Inequality |
| 1501 | mathematics | 31 | `math.func.end-behavior` | End Behavior |
| 1502 | mathematics | 31 | `math.func.rational-root` | Real Roots of Polynomials |
| 1503 | mathematics | 31 | `math.func.rational-function` | Rational Function |
| 1504 | mathematics | 31 | `math.de.char-equation` | Characteristic Equation |
| 1505 | mathematics | 31 | `math.de.inverse-laplace` | Inverse Laplace Transform |
| 1506 | mathematics | 31 | `math.linalg.diagonalization` | Diagonalization |
| 1507 | mathematics | 31 | `math.cx.higher-derivatives` | Derivatives of Holomorphic Functions |
| 1508 | mathematics | 31 | `math.cx.morera-theorem` | Morera's Theorem |
| 1509 | mathematics | 31 | `math.cx.residue-theorem` | Residue Theorem |
| 1510 | mathematics | 31 | `math.cx.maximum-modulus` | Maximum Modulus Principle |
| 1511 | mathematics | 31 | `math.cx.riemann-surface` | Riemann Surface |
| 1512 | mathematics | 31 | `math.cx.riemann-zeta` | Riemann Zeta Function |
| 1513 | english | 31 | `eng.composition.argumentation-basics` | Argumentation Basics |
| 1514 | english | 31 | `eng.composition.rhetorical-devices` | Rhetorical Devices |
| 1515 | mathematics | 32 | `math.nt.riemann-hypothesis` | Riemann Hypothesis |
| 1516 | mathematics | 32 | `math.func.vertical-asymptote` | Vertical Asymptote |
| 1517 | mathematics | 32 | `math.func.horizontal-asymptote` | Horizontal Asymptote |
| 1518 | mathematics | 32 | `math.de.undetermined-coefficients` | Method of Undetermined Coefficients |
| 1519 | mathematics | 32 | `math.de.laplace-ode` | Solving ODEs with Laplace Transform |
| 1520 | mathematics | 32 | `math.de.systems-matrix-method` | Matrix Method for Linear Systems |
| 1521 | mathematics | 32 | `math.linalg.matrix-exponential` | Matrix Exponential |
| 1522 | mathematics | 32 | `math.linalg.jordan-form` | Jordan Normal Form |
| 1523 | mathematics | 32 | `math.cx.liouville-theorem` | Liouville's Theorem |
| 1524 | mathematics | 32 | `math.cx.real-integral-residues` | Evaluating Real Integrals via Residues |
| 1525 | mathematics | 32 | `math.cx.argument-principle` | Argument Principle |
| 1526 | english | 32 | `eng.composition.counterargument-and-rebuttal` | Counterargument and Rebuttal |
| 1527 | english | 32 | `eng.composition.logical-fallacies` | Logical Fallacies |
| 1528 | english | 32 | `eng.composition.figurative-language-in-composition` | Figurative Language in Composition |
| 1529 | english | 32 | `eng.composition.rhetorical-analysis` | Rhetorical Analysis |
| 1530 | mathematics | 33 | `math.de.harmonic-oscillator` | Harmonic Oscillator |
| 1531 | mathematics | 33 | `math.cx.fundamental-theorem-algebra` | Fundamental Theorem of Algebra (Complex Analysis) |
| 1532 | mathematics | 33 | `math.cx.rouche-theorem` | Rouché's Theorem |
| 1533 | english | 33 | `eng.composition.style-voice-and-tone` | Style, Voice, and Tone |
| 1534 | english | 33 | `eng.composition.persuasive-techniques` | Advanced Persuasive Techniques |
| 1535 | english | 33 | `eng.composition.comparative-essay-writing` | Comparative Essay Writing |
| 1536 | english | 33 | `eng.composition.research-paper-writing` | Research Paper Writing |
| 1537 | mathematics | 34 | `math.de.resonance` | Resonance |
| 1538 | english | 34 | `eng.composition.academic-writing-conventions` | Academic Writing Conventions |
| 1539 | english | 35 | `eng.composition.plagiarism-and-citation-ethics` | Plagiarism and Citation Ethics |
| 1540 | english | 35 | `eng.composition.editing-for-style` | Editing for Style |
| 1541 | english | 35 | `eng.communication.academic-writing-advanced` | Advanced Academic Writing |
| 1542 | english | 36 | `eng.communication.research-methodology-writing` | Writing Research Methodology |
| 1543 | english | 36 | `eng.communication.technical-writing` | Technical Writing |
| 1544 | english | 36 | `eng.communication.business-writing` | Business Writing |
| 1545 | english | 37 | `eng.communication.professional-communication` | Professional Communication |
| 1546 | english | 37 | `eng.communication.presentation-design` | Presentation Design |
| 1547 | english | 37 | `eng.communication.editing-for-publication` | Editing for Publication |
| 1548 | english | 38 | `eng.communication.negotiation-language` | Negotiation Language |

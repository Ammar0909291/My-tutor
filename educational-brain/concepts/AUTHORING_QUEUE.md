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

Total queued: **1596** (= 1,775 KG concepts − 179 already `READY`).

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

| Priority | Subject | Level | KG ID | Concept Name |
|---|---|---|---|---|
| 1 | chemistry | 0 | `chem.found.matter` | Nature of Matter |
| 2 | biology | 0 | `bio.found.what-is-biology` | What is Biology |
| 3 | computer_science | 0 | `cs.found.intro-computers` | Introduction to Computers |
| 4 | mathematics | 1 | `math.geom.point` | Point |
| 5 | english | 1 | `eng.phonics.alphabet-recognition` | Alphabet Recognition |
| 6 | english | 1 | `eng.phonics.rhyming` | Rhyming |
| 7 | english | 1 | `eng.phonetics.speech-sounds-overview` | Overview of Speech Sounds |
| 8 | chemistry | 1 | `chem.found.states-of-matter` | States of Matter |
| 9 | chemistry | 1 | `chem.found.pure-substances` | Pure Substances and Mixtures |
| 10 | chemistry | 1 | `chem.found.measurement` | Physical Quantities and SI Units |
| 11 | chemistry | 1 | `chem.atomic.atomic-theory` | Atomic Theory |
| 12 | biology | 1 | `bio.found.characteristics-of-life` | Characteristics of Living Organisms |
| 13 | computer_science | 1 | `cs.found.computer-organisation` | Computer Organisation |
| 14 | computer_science | 1 | `cs.found.number-systems` | Number Systems |
| 15 | computer_science | 1 | `cs.found.software-concepts` | Software Concepts |
| 16 | computer_science | 1 | `cs.algo.problem-solving` | Problem Solving Methodology |
| 17 | computer_science | 1 | `cs.sec.cyber-ethics-safety` | Cyber Ethics and Online Safety |
| 18 | mathematics | 2 | `math.geom.line` | Line |
| 19 | english | 2 | `eng.phonics.blending-segmenting` | Blending and Segmenting |
| 20 | english | 2 | `eng.phonetics.articulation-organs` | Organs of Articulation |
| 21 | english | 2 | `eng.writing.handwriting-and-formation` | Handwriting and Letter Formation |
| 22 | chemistry | 2 | `chem.found.significant-figures` | Significant Figures and Error Analysis |
| 23 | chemistry | 2 | `chem.found.mole-concept` | Mole Concept and Avogadro's Number |
| 24 | chemistry | 2 | `chem.atomic.subatomic-particles` | Subatomic Particles |
| 25 | chemistry | 2 | `chem.atomic.electromagnetic-radiation` | Electromagnetic Radiation |
| 26 | chemistry | 2 | `chem.state.kinetic-theory` | Kinetic Molecular Theory of Gases |
| 27 | chemistry | 2 | `chem.thermo.system` | System, Surroundings and State Functions |
| 28 | chemistry | 2 | `chem.elect.conductance` | Electrolytic Conductance |
| 29 | chemistry | 2 | `chem.surface.colloids` | Colloids |
| 30 | chemistry | 2 | `chem.env.atmosphere` | Atmosphere and Composition |
| 31 | biology | 2 | `bio.found.classification-need` | Need for Classification |
| 32 | biology | 2 | `bio.found.microscopy-basics` | Microscopy and Laboratory Techniques |
| 33 | biology | 2 | `bio.found.biomes-levels-of-organisation` | Levels of Biological Organisation |
| 34 | computer_science | 2 | `cs.found.boolean-logic` | Boolean Logic and Logic Gates |
| 35 | computer_science | 2 | `cs.found.memory-storage` | Memory and Storage Systems |
| 36 | computer_science | 2 | `cs.found.os-concepts` | Operating System Fundamentals |
| 37 | computer_science | 2 | `cs.algo.algorithms` | Algorithms |
| 38 | computer_science | 2 | `cs.net.networking-basics` | Networking Basics |
| 39 | mathematics | 3 | `math.geom.line-segment` | Line Segment |
| 40 | mathematics | 3 | `math.geom.ray` | Ray |
| 41 | mathematics | 3 | `math.geom.plane` | Plane |
| 42 | english | 3 | `eng.phonetics.consonant-sounds` | Consonant Phoneme Classification |
| 43 | english | 3 | `eng.phonetics.vowel-sounds` | Vowel Phoneme Classification |
| 44 | chemistry | 3 | `chem.found.stoichiometry` | Stoichiometry |
| 45 | chemistry | 3 | `chem.found.concentration` | Concentration Units |
| 46 | chemistry | 3 | `chem.atomic.atomic-spectra` | Atomic Spectra |
| 47 | chemistry | 3 | `chem.atomic.photoelectric-effect` | Photoelectric Effect and Dual Nature |
| 48 | chemistry | 3 | `chem.period.classification` | Early Classification of Elements |
| 49 | chemistry | 3 | `chem.state.gas-laws` | Gas Laws |
| 50 | chemistry | 3 | `chem.thermo.first-law` | First Law of Thermodynamics |
| 51 | chemistry | 3 | `chem.surface.emulsions` | Emulsions and Gels |
| 52 | chemistry | 3 | `chem.env.air-pollution` | Air Pollution |
| 53 | chemistry | 3 | `chem.env.water-soil` | Water and Soil Pollution |
| 54 | biology | 3 | `bio.found.five-kingdom` | Five Kingdom Classification |
| 55 | biology | 3 | `bio.found.binomial-nomenclature` | Binomial Nomenclature |
| 56 | biology | 3 | `bio.cell.cell-theory` | Cell Theory |
| 57 | biology | 3 | `bio.eco.organism-environment` | Organisms and their Environment |
| 58 | computer_science | 3 | `cs.found.cpu-architecture` | CPU Architecture and Instruction Sets |
| 59 | computer_science | 3 | `cs.algo.flowcharts` | Flowcharts and Pseudocode |
| 60 | computer_science | 3 | `cs.algo.asymptotic-notation` | Asymptotic Notation |
| 61 | computer_science | 3 | `cs.os.process-management` | Process Management |
| 62 | computer_science | 3 | `cs.net.osi-tcp-ip-models` | OSI and TCP/IP Reference Models |
| 63 | computer_science | 3 | `cs.sec.cryptography-basics` | Cryptography Fundamentals |
| 64 | mathematics | 4 | `math.geom.angle` | Angle |
| 65 | mathematics | 4 | `math.geom.perimeter` | Perimeter |
| 66 | mathematics | 4 | `math.geom.circle` | Circle |
| 67 | mathematics | 4 | `math.geom.length` | Length |
| 68 | mathematics | 4 | `math.prob.sample-space` | Sample Space |
| 69 | mathematics | 4 | `math.disc.graph` | Graph |
| 70 | mathematics | 4 | `math.abst.algebraic-structure` | Algebraic Structure |
| 71 | mathematics | 4 | `math.top.topological-space` | Topological Space |
| 72 | mathematics | 4 | `math.meas.sigma-algebra` | σ-Algebra |
| 73 | mathematics | 4 | `math.graph.graph` | Graph |
| 74 | english | 4 | `eng.phonics.consonants` | Consonant Sounds |
| 75 | english | 4 | `eng.phonics.short-vowels` | Short Vowel Sounds |
| 76 | english | 4 | `eng.phonics.sight-words` | High-Frequency Sight Words |
| 77 | english | 4 | `eng.phonetics.ipa-basics` | IPA Basics for English |
| 78 | chemistry | 4 | `chem.atomic.bohr-model` | Bohr Model of the Atom |
| 79 | chemistry | 4 | `chem.state.molar-mass-gas` | Molar Mass from Gas Data |
| 80 | chemistry | 4 | `chem.state.real-gases` | Real Gases and van der Waals Equation |
| 81 | chemistry | 4 | `chem.sol.types` | Types of Solutions |
| 82 | chemistry | 4 | `chem.thermo.enthalpy` | Enthalpy and Hess's Law |
| 83 | chemistry | 4 | `chem.thermo.entropy` | Entropy and Second Law |
| 84 | chemistry | 4 | `chem.thermo.heat-capacities` | Heat Capacities of Gases |
| 85 | chemistry | 4 | `chem.kinet.rate` | Rate of Reaction |
| 86 | biology | 4 | `bio.found.viruses-viroids-lichens` | Viruses, Viroids and Lichens |
| 87 | biology | 4 | `bio.cell.prokaryotic-cell` | Prokaryotic Cell Structure |
| 88 | biology | 4 | `bio.cell.eukaryotic-cell` | Eukaryotic Cell Structure |
| 89 | biology | 4 | `bio.eco.population-ecology` | Population Ecology |
| 90 | biology | 4 | `bio.div.three-domain-system` | Three Domain System |
| 91 | biology | 4 | `bio.div.fungal-biology` | Fungal Biology |
| 92 | computer_science | 4 | `cs.found.pipelining-cache` | Pipelining and Cache Memory |
| 93 | computer_science | 4 | `cs.algo.time-space-complexity` | Time and Space Complexity Analysis |
| 94 | computer_science | 4 | `cs.prog.intro-programming` | Introduction to Programming |
| 95 | computer_science | 4 | `cs.os.threads-concurrency` | Threads and Concurrency |
| 96 | computer_science | 4 | `cs.os.cpu-scheduling` | CPU Scheduling Algorithms |
| 97 | computer_science | 4 | `cs.os.memory-management-os` | Memory Management |
| 98 | computer_science | 4 | `cs.net.ip-addressing` | IP Addressing and Subnetting |
| 99 | computer_science | 4 | `cs.net.tcp-udp-transport` | TCP and UDP — Transport Layer |
| 100 | computer_science | 4 | `cs.theory.finite-automata` | Finite Automata |
| 101 | mathematics | 5 | `math.geom.angle-types` | Types of Angles |
| 102 | mathematics | 5 | `math.geom.angle-measurement` | Angle Measurement |
| 103 | mathematics | 5 | `math.geom.angle-pairs` | Angle Pairs |
| 104 | mathematics | 5 | `math.geom.perpendicular-lines` | Perpendicular Lines |
| 105 | mathematics | 5 | `math.geom.triangle` | Triangle |
| 106 | mathematics | 5 | `math.geom.circle-parts` | Parts of a Circle |
| 107 | mathematics | 5 | `math.geom.circle-circumference` | Circumference of a Circle |
| 108 | mathematics | 5 | `math.prob.event` | Event |
| 109 | mathematics | 5 | `math.disc.graph-types` | Types of Graphs |
| 110 | mathematics | 5 | `math.disc.graph-connectivity` | Graph Connectivity |
| 111 | mathematics | 5 | `math.disc.graph-coloring` | Graph Coloring |
| 112 | mathematics | 5 | `math.disc.planar-graph` | Planar Graph |
| 113 | mathematics | 5 | `math.disc.propositional-logic` | Propositional Logic |
| 114 | mathematics | 5 | `math.top.open-sets` | Open and Closed Sets (Topology) |
| 115 | mathematics | 5 | `math.top.basis` | Basis for a Topology |
| 116 | mathematics | 5 | `math.top.continuity-top` | Continuity (Topology) |
| 117 | mathematics | 5 | `math.top.compactness` | Compactness (Topology) |
| 118 | mathematics | 5 | `math.top.connectedness` | Connectedness (Topology) |
| 119 | mathematics | 5 | `math.top.separation-axioms` | Separation Axioms |
| 120 | mathematics | 5 | `math.top.product-space` | Product Topology |
| 121 | mathematics | 5 | `math.top.simplicial-complex` | Simplicial Complex |
| 122 | mathematics | 5 | `math.meas.measure` | Measure |
| 123 | mathematics | 5 | `math.meas.measurable-function` | Measurable Function |
| 124 | mathematics | 5 | `math.graph.graph-invariants` | Graph Invariants |
| 125 | mathematics | 5 | `math.graph.graph-operations` | Graph Operations |
| 126 | mathematics | 5 | `math.graph.matching` | Matching |
| 127 | english | 5 | `eng.phonics.consonant-blends` | Consonant Blends |
| 128 | english | 5 | `eng.phonics.long-vowels-silent-e` | Long Vowels and Silent E |
| 129 | english | 5 | `eng.phonetics.minimal-pairs` | Minimal Pairs |
| 130 | english | 5 | `eng.phonetics.syllable-stress` | Word Stress |
| 131 | chemistry | 5 | `chem.atomic.quantum-numbers` | Quantum Numbers |
| 132 | chemistry | 5 | `chem.sol.solubility` | Solubility and Henry's Law |
| 133 | chemistry | 5 | `chem.thermo.gibbs` | Gibbs Free Energy and Spontaneity |
| 134 | chemistry | 5 | `chem.thermo.third-law` | Third Law and Absolute Entropy |
| 135 | chemistry | 5 | `chem.kinet.rate-law` | Rate Law and Order |
| 136 | chemistry | 5 | `chem.kinet.photochemistry` | Photochemical Reactions |
| 137 | biology | 5 | `bio.cell.cell-membrane-transport` | Cell Membrane and Transport |
| 138 | biology | 5 | `bio.cell.nucleus-chromosomes` | Nucleus and Chromosomes |
| 139 | biology | 5 | `bio.cell.mitochondria-energy` | Mitochondria and Energy Organelles |
| 140 | biology | 5 | `bio.cell.chloroplast-structure` | Chloroplast Structure |
| 141 | biology | 5 | `bio.cell.endomembrane-system` | Endomembrane System |
| 142 | biology | 5 | `bio.mol.biomolecule-types` | Types of Biomolecules |
| 143 | biology | 5 | `bio.eco.ecosystem-structure-function` | Ecosystem Structure and Function |
| 144 | biology | 5 | `bio.micro.microbial-diversity` | Microbial Diversity |
| 145 | computer_science | 5 | `cs.algo.divide-and-conquer` | Divide and Conquer |
| 146 | computer_science | 5 | `cs.algo.greedy-algorithms` | Greedy Algorithms |
| 147 | computer_science | 5 | `cs.prog.python-basics` | Python Language Basics |
| 148 | computer_science | 5 | `cs.os.synchronisation-deadlocks` | Synchronisation and Deadlocks |
| 149 | computer_science | 5 | `cs.os.virtual-memory` | Virtual Memory |
| 150 | computer_science | 5 | `cs.os.file-systems` | File Systems |
| 151 | computer_science | 5 | `cs.net.dns-dhcp` | DNS and DHCP |
| 152 | computer_science | 5 | `cs.net.routing-congestion` | Routing and Congestion Control |
| 153 | computer_science | 5 | `cs.theory.regular-expressions` | Regular Expressions and Regular Languages |
| 154 | mathematics | 6 | `math.found.quantifiers` | Quantifiers |
| 155 | mathematics | 6 | `math.found.logical-equivalence` | Logical Equivalence |
| 156 | mathematics | 6 | `math.found.subset` | Subset |
| 157 | mathematics | 6 | `math.found.relation` | Relation |
| 158 | mathematics | 6 | `math.found.ordinal-number` | Ordinal Number |
| 159 | mathematics | 6 | `math.geom.parallel-lines` | Parallel Lines |
| 160 | mathematics | 6 | `math.geom.triangle-types` | Types of Triangles |
| 161 | mathematics | 6 | `math.geom.right-triangle` | Right Triangle |
| 162 | mathematics | 6 | `math.geom.congruent-triangles` | Congruent Triangles |
| 163 | mathematics | 6 | `math.geom.area-triangle` | Area of a Triangle |
| 164 | mathematics | 6 | `math.geom.polygon` | Polygon |
| 165 | mathematics | 6 | `math.geom.circle-theorems` | Circle Theorems |
| 166 | mathematics | 6 | `math.geom.geometric-constructions` | Geometric Constructions |
| 167 | mathematics | 6 | `math.trig.angle-measure` | Angle Measure |
| 168 | mathematics | 6 | `math.prob.probability-measure` | Probability Measure |
| 169 | mathematics | 6 | `math.disc.euler-hamiltonian` | Euler and Hamiltonian Paths |
| 170 | mathematics | 6 | `math.disc.graph-trees` | Trees |
| 171 | mathematics | 6 | `math.disc.boolean-circuits` | Boolean Circuits and Logic Gates |
| 172 | mathematics | 6 | `math.disc.predicate-logic-disc` | Predicate Logic and Proof Methods |
| 173 | mathematics | 6 | `math.top.interior-closure` | Interior, Closure, and Boundary |
| 174 | mathematics | 6 | `math.top.homeomorphism` | Homeomorphism |
| 175 | mathematics | 6 | `math.top.tychonoff` | Tychonoff's Theorem |
| 176 | mathematics | 6 | `math.top.homotopy` | Homotopy |
| 177 | mathematics | 6 | `math.meas.lebesgue-measure` | Lebesgue Measure |
| 178 | mathematics | 6 | `math.meas.simple-function` | Simple Function |
| 179 | mathematics | 6 | `math.meas.abstract-measure-spaces` | Abstract Measure Spaces |
| 180 | mathematics | 6 | `math.graph.connectivity` | Connectivity |
| 181 | mathematics | 6 | `math.graph.graph-coloring` | Graph Coloring |
| 182 | english | 6 | `eng.phonics.digraphs` | Consonant and Vowel Digraphs |
| 183 | english | 6 | `eng.phonetics.sentence-stress` | Sentence Stress |
| 184 | english | 6 | `eng.phonetics.phonetic-transcription` | Phonetic Transcription |
| 185 | chemistry | 6 | `chem.atomic.orbitals` | Atomic Orbitals |
| 186 | chemistry | 6 | `chem.thermo.cell-thermo` | Electrochemical Thermodynamics |
| 187 | chemistry | 6 | `chem.equil.concept` | Equilibrium Concept |
| 188 | chemistry | 6 | `chem.kinet.integrated-rate` | Integrated Rate Laws |
| 189 | chemistry | 6 | `chem.kinet.arrhenius` | Arrhenius Equation |
| 190 | chemistry | 6 | `chem.kinet.mechanism` | Reaction Mechanisms |
| 191 | chemistry | 6 | `chem.env.ozone` | Ozone Depletion |
| 192 | biology | 6 | `bio.cell.cytoskeleton` | Cytoskeleton and Cell Motility |
| 193 | biology | 6 | `bio.cell.cell-cycle` | The Cell Cycle |
| 194 | biology | 6 | `bio.cell.cell-signalling` | Cell Signalling |
| 195 | biology | 6 | `bio.mol.carbohydrates-lipids` | Carbohydrates and Lipids |
| 196 | biology | 6 | `bio.mol.proteins-structure` | Proteins and Protein Structure |
| 197 | biology | 6 | `bio.mol.nucleic-acid-structure` | Nucleic Acid Structure |
| 198 | biology | 6 | `bio.evo.origin-of-life` | Origin of Life |
| 199 | biology | 6 | `bio.physio.respiratory-system` | Human Respiratory System |
| 200 | biology | 6 | `bio.plant.plant-water-relations` | Plant Water Relations |
| 201 | biology | 6 | `bio.eco.nutrient-cycling` | Nutrient Cycling and Succession |
| 202 | biology | 6 | `bio.micro.microbial-growth-culture` | Microbial Growth and Culture Techniques |
| 203 | biology | 6 | `bio.micro.pathogenic-microbes` | Pathogenic Microorganisms and Disease |
| 204 | biology | 6 | `bio.div.endosymbiotic-theory` | Endosymbiotic Theory |
| 205 | biology | 6 | `bio.mol.bioenergetics` | Bioenergetics and Thermodynamics of Life |
| 206 | biology | 6 | `bio.eco.community-ecology` | Community Ecology |
| 207 | computer_science | 6 | `cs.algo.dynamic-programming` | Dynamic Programming |
| 208 | computer_science | 6 | `cs.prog.data-types-variables` | Data Types and Variables |
| 209 | computer_science | 6 | `cs.net.application-protocols` | Application-Layer Protocols |
| 210 | computer_science | 6 | `cs.net.wireless-mobile-networks` | Wireless and Mobile Networks |
| 211 | computer_science | 6 | `cs.theory.context-free-grammars` | Context-Free Grammars |
| 212 | mathematics | 7 | `math.found.rules-of-inference` | Rules of Inference |
| 213 | mathematics | 7 | `math.found.proper-subset` | Proper Subset |
| 214 | mathematics | 7 | `math.found.set-equality` | Set Equality |
| 215 | mathematics | 7 | `math.found.set-operations` | Set Operations |
| 216 | mathematics | 7 | `math.found.power-set` | Power Set |
| 217 | mathematics | 7 | `math.found.reflexive-relation` | Reflexive Relation |
| 218 | mathematics | 7 | `math.found.symmetric-relation` | Symmetric Relation |
| 219 | mathematics | 7 | `math.found.transitive-relation` | Transitive Relation |
| 220 | mathematics | 7 | `math.found.partition` | Partition |
| 221 | mathematics | 7 | `math.found.function-set-theoretic` | Function (Set-Theoretic) |
| 222 | mathematics | 7 | `math.found.cardinal-arithmetic` | Cardinal Arithmetic |
| 223 | mathematics | 7 | `math.geom.triangle-angle-sum` | Triangle Angle Sum Theorem |
| 224 | mathematics | 7 | `math.geom.triangle-centers` | Triangle Centers |
| 225 | mathematics | 7 | `math.geom.quadrilateral` | Quadrilateral |
| 226 | mathematics | 7 | `math.geom.regular-polygon` | Regular Polygon |
| 227 | mathematics | 7 | `math.geom.area-polygon` | Area of Polygons |
| 228 | mathematics | 7 | `math.geom.solid-3d` | Three-Dimensional Solids |
| 229 | mathematics | 7 | `math.trig.degree-radian-conversion` | Degree-Radian Conversion |
| 230 | mathematics | 7 | `math.prob.probability-axioms` | Axioms of Probability |
| 231 | mathematics | 7 | `math.disc.spanning-tree` | Spanning Tree |
| 232 | mathematics | 7 | `math.top.homotopy-equivalence` | Homotopy Equivalence |
| 233 | mathematics | 7 | `math.top.manifold` | Topological Manifold |
| 234 | mathematics | 7 | `math.meas.measure-zero` | Measure Zero |
| 235 | mathematics | 7 | `math.meas.lebesgue-integral` | Lebesgue Integral |
| 236 | mathematics | 7 | `math.graph.tree` | Tree |
| 237 | mathematics | 7 | `math.graph.maximum-flow` | Maximum Flow |
| 238 | mathematics | 7 | `math.graph.eulerian-circuit` | Eulerian Circuit |
| 239 | mathematics | 7 | `math.graph.hamiltonian-cycle` | Hamiltonian Cycle |
| 240 | english | 7 | `eng.phonics.syllable-types` | Syllable Types |
| 241 | english | 7 | `eng.phonetics.intonation-patterns` | Intonation Patterns |
| 242 | chemistry | 7 | `chem.atomic.electronic-config` | Electronic Configuration |
| 243 | chemistry | 7 | `chem.atomic.quantum-mech-model` | Quantum Mechanical Model |
| 244 | chemistry | 7 | `chem.equil.kc-kp` | Equilibrium Constants Kc and Kp |
| 245 | chemistry | 7 | `chem.equil.kw-ph` | Water Ionization and pH |
| 246 | chemistry | 7 | `chem.kinet.catalysis` | Catalysis |
| 247 | biology | 7 | `bio.cell.mitosis` | Mitosis |
| 248 | biology | 7 | `bio.mol.enzymes` | Enzymes and Enzyme Kinetics |
| 249 | biology | 7 | `bio.evo.evidence-for-evolution` | Evidence for Evolution |
| 250 | biology | 7 | `bio.physio.circulatory-system` | Human Circulatory System |
| 251 | biology | 7 | `bio.physio.nervous-system` | Nervous System and Neural Control |
| 252 | biology | 7 | `bio.plant.mineral-nutrition` | Mineral Nutrition in Plants |
| 253 | biology | 7 | `bio.eco.biodiversity-conservation` | Biodiversity and Conservation |
| 254 | biology | 7 | `bio.micro.microbes-in-human-welfare` | Microbes in Human Welfare |
| 255 | biology | 7 | `bio.div.protist-diversity` | Eukaryotic Supergroups and Protist Diversity |
| 256 | biology | 7 | `bio.mol.signal-transduction-pathways` | Core Signal Transduction Pathways |
| 257 | computer_science | 7 | `cs.algo.backtracking` | Backtracking |
| 258 | computer_science | 7 | `cs.prog.operators-expressions` | Operators and Expressions |
| 259 | computer_science | 7 | `cs.net.cloud-computing` | Cloud Computing |
| 260 | computer_science | 7 | `cs.sec.network-web-security` | Network and Web Security |
| 261 | computer_science | 7 | `cs.web.client-server-model` | The Client-Server Model |
| 262 | computer_science | 7 | `cs.theory.turing-machines` | Turing Machines |
| 263 | mathematics | 8 | `math.found.proof` | Mathematical Proof |
| 264 | mathematics | 8 | `math.found.union` | Union |
| 265 | mathematics | 8 | `math.found.intersection` | Intersection |
| 266 | mathematics | 8 | `math.found.set-difference` | Set Difference |
| 267 | mathematics | 8 | `math.found.complement` | Set Complement |
| 268 | mathematics | 8 | `math.found.venn-diagram` | Venn Diagram |
| 269 | mathematics | 8 | `math.found.equivalence-relation` | Equivalence Relation |
| 270 | mathematics | 8 | `math.found.partial-order` | Partial Order |
| 271 | mathematics | 8 | `math.found.cardinality` | Cardinality |
| 272 | mathematics | 8 | `math.geom.polygon-angle-sum` | Polygon Angle Sum |
| 273 | mathematics | 8 | `math.geom.parallelogram` | Parallelogram |
| 274 | mathematics | 8 | `math.geom.trapezoid` | Trapezoid |
| 275 | mathematics | 8 | `math.geom.area` | Area |
| 276 | mathematics | 8 | `math.geom.volume` | Volume |
| 277 | mathematics | 8 | `math.geom.platonic-solids` | Platonic Solids |
| 278 | mathematics | 8 | `math.func.function-concept` | Function |
| 279 | mathematics | 8 | `math.prob.conditional-probability` | Conditional Probability |
| 280 | mathematics | 8 | `math.abst.binary-operation` | Binary Operation |
| 281 | mathematics | 8 | `math.meas.convergence-theorems` | Convergence Theorems |
| 282 | mathematics | 8 | `math.meas.lp-space` | Lᵖ Spaces |
| 283 | mathematics | 8 | `math.meas.product-measure` | Product Measure and Fubini's Theorem |
| 284 | mathematics | 8 | `math.meas.radon-nikodym` | Radon-Nikodym Theorem |
| 285 | mathematics | 8 | `math.fnal.convolution` | Convolution |
| 286 | mathematics | 8 | `math.graph.minimum-spanning-tree` | Minimum Spanning Tree |
| 287 | mathematics | 8 | `math.graph.random-graph` | Random Graphs |
| 288 | mathematics | 8 | `math.cat.category` | Category |
| 289 | english | 8 | `eng.phonics.decoding-fluency` | Decoding Fluency |
| 290 | english | 8 | `eng.phonetics.connected-speech` | Connected Speech |
| 291 | english | 8 | `eng.phonetics.prosody` | Prosody |
| 292 | english | 8 | `eng.writing.spelling-strategies` | Spelling Strategies |
| 293 | chemistry | 8 | `chem.period.modern-periodic-law` | Modern Periodic Law and Table |
| 294 | chemistry | 8 | `chem.equil.le-chatelier` | Le Chatelier's Principle |
| 295 | chemistry | 8 | `chem.equil.acids-bases` | Acid–Base Theories |
| 296 | chemistry | 8 | `chem.equil.solubility` | Solubility Equilibria |
| 297 | chemistry | 8 | `chem.equil.complex-equil` | Complex Ion Equilibria |
| 298 | chemistry | 8 | `chem.surface.adsorption` | Adsorption |
| 299 | biology | 8 | `bio.cell.meiosis` | Meiosis |
| 300 | biology | 8 | `bio.mol.dna-replication` | DNA Replication |
| 301 | biology | 8 | `bio.evo.natural-selection` | Natural Selection and Darwinism |
| 302 | biology | 8 | `bio.physio.digestive-system` | Human Digestive System |
| 303 | biology | 8 | `bio.physio.excretory-system` | Excretory System and Osmoregulation |
| 304 | biology | 8 | `bio.physio.endocrine-system` | Endocrine System |
| 305 | biology | 8 | `bio.physio.musculoskeletal-system` | Locomotion and Musculoskeletal System |
| 306 | biology | 8 | `bio.physio.immune-system-intro` | Immune System Overview |
| 307 | biology | 8 | `bio.plant.photosynthesis` | Photosynthesis |
| 308 | biology | 8 | `bio.plant.plant-growth-hormones` | Plant Growth and Hormones |
| 309 | biology | 8 | `bio.repro.asexual-reproduction` | Asexual Reproduction |
| 310 | biology | 8 | `bio.eco.environmental-issues` | Environmental Issues and Pollution |
| 311 | biology | 8 | `bio.div.cladistics-phylogenetic-thinking` | Cladistics and Phylogenetic Thinking |
| 312 | computer_science | 8 | `cs.algo.np-completeness` | NP-Completeness and Intractability |
| 313 | computer_science | 8 | `cs.prog.type-conversion` | Type Conversion and Casting |
| 314 | computer_science | 8 | `cs.control.conditionals` | Conditional Statements |
| 315 | computer_science | 8 | `cs.sec.data-protection-privacy` | Data Protection and Privacy |
| 316 | computer_science | 8 | `cs.web.html-css-basics` | HTML and CSS Basics |
| 317 | mathematics | 9 | `math.found.direct-proof` | Direct Proof |
| 318 | mathematics | 9 | `math.found.proof-by-contradiction` | Proof by Contradiction |
| 319 | mathematics | 9 | `math.found.proof-by-contrapositive` | Proof by Contrapositive |
| 320 | mathematics | 9 | `math.found.proof-by-cases` | Proof by Cases |
| 321 | mathematics | 9 | `math.found.existence-proof` | Existence Proof |
| 322 | mathematics | 9 | `math.found.writing-mathematics` | Writing Mathematics |
| 323 | mathematics | 9 | `math.found.theorem` | Theorem |
| 324 | mathematics | 9 | `math.found.conjecture` | Conjecture |
| 325 | mathematics | 9 | `math.found.equivalence-class` | Equivalence Class |
| 326 | mathematics | 9 | `math.found.total-order` | Total Order |
| 327 | mathematics | 9 | `math.found.hasse-diagram` | Hasse Diagram |
| 328 | mathematics | 9 | `math.found.finite-set` | Finite Set |
| 329 | mathematics | 9 | `math.geom.circle-area` | Area of a Circle |
| 330 | mathematics | 9 | `math.geom.geometric-proof` | Geometric Proof |
| 331 | mathematics | 9 | `math.geom.surface-area` | Surface Area |
| 332 | mathematics | 9 | `math.func.domain-range` | Domain and Range |
| 333 | mathematics | 9 | `math.func.function-notation` | Function Notation |
| 334 | mathematics | 9 | `math.func.injectivity` | Injective (One-to-One) Function |
| 335 | mathematics | 9 | `math.func.surjectivity` | Surjective (Onto) Function |
| 336 | mathematics | 9 | `math.func.composition` | Composition of Functions |
| 337 | mathematics | 9 | `math.func.periodic-function` | Periodic Function |
| 338 | mathematics | 9 | `math.func.piecewise-function` | Piecewise-Defined Function |
| 339 | mathematics | 9 | `math.func.monotonic-function` | Monotonic Function |
| 340 | mathematics | 9 | `math.func.function-operations` | Operations on Functions |
| 341 | mathematics | 9 | `math.prob.total-probability` | Law of Total Probability |
| 342 | mathematics | 9 | `math.prob.independence` | Independence |
| 343 | mathematics | 9 | `math.prob.random-variable` | Random Variable |
| 344 | mathematics | 9 | `math.abst.group-theory` | Group |
| 345 | mathematics | 9 | `math.top.quotient-space` | Quotient Space |
| 346 | mathematics | 9 | `math.meas.l2-space` | L² Space |
| 347 | mathematics | 9 | `math.cat.morphism-types` | Types of Morphisms |
| 348 | mathematics | 9 | `math.cat.functor` | Functor |
| 349 | english | 9 | `eng.phonetics.rhythm-and-timing` | Rhythm and Timing |
| 350 | english | 9 | `eng.vocab.word-recognition` | Word Recognition |
| 351 | english | 9 | `eng.listening.active-listening` | Active Listening |
| 352 | english | 9 | `eng.speaking.oral-fluency` | Oral Fluency |
| 353 | chemistry | 9 | `chem.period.atomic-radius` | Atomic and Ionic Radius |
| 354 | chemistry | 9 | `chem.period.ionization-energy` | Ionization Energy |
| 355 | chemistry | 9 | `chem.period.electron-affinity` | Electron Affinity and Electronegativity |
| 356 | chemistry | 9 | `chem.period.valency` | Valency and Oxidation State |
| 357 | chemistry | 9 | `chem.bond.metallic-bonding` | Metallic Bonding |
| 358 | chemistry | 9 | `chem.equil.weak-acid` | Weak Acid and Base Equilibria |
| 359 | chemistry | 9 | `chem.surface.heterogeneous-cat` | Mechanism of Heterogeneous Catalysis |
| 360 | chemistry | 9 | `chem.sblock.hydrogen` | Hydrogen |
| 361 | chemistry | 9 | `chem.anal.gravimetric` | Gravimetric Analysis |
| 362 | chemistry | 9 | `chem.anal.chromatography` | Chromatography |
| 363 | biology | 9 | `bio.mol.transcription` | Transcription |
| 364 | biology | 9 | `bio.gen.mendelian-genetics` | Mendelian Genetics |
| 365 | biology | 9 | `bio.plant.plant-respiration` | Respiration in Plants |
| 366 | biology | 9 | `bio.repro.sexual-reproduction-plants` | Sexual Reproduction in Flowering Plants |
| 367 | biology | 9 | `bio.repro.human-reproductive-system` | Human Reproductive System |
| 368 | biology | 9 | `bio.immuno.innate-adaptive-immunity` | Innate and Adaptive Immunity |
| 369 | biology | 9 | `bio.micro.viral-replication` | Viral Replication and Lifecycle |
| 370 | biology | 9 | `bio.micro.horizontal-gene-transfer` | Horizontal Gene Transfer |
| 371 | computer_science | 9 | `cs.prog.input-output` | Input, Output and Formatting |
| 372 | computer_science | 9 | `cs.control.loops` | Iteration — while and for Loops |
| 373 | computer_science | 9 | `cs.web.rest-apis` | REST APIs |
| 374 | computer_science | 9 | `cs.theory.complexity-classes` | Computational Complexity Classes |
| 375 | mathematics | 10 | `math.found.uniqueness-proof` | Uniqueness Proof |
| 376 | mathematics | 10 | `math.found.lemma` | Lemma |
| 377 | mathematics | 10 | `math.found.corollary` | Corollary |
| 378 | mathematics | 10 | `math.found.natural-numbers` | Natural Numbers |
| 379 | mathematics | 10 | `math.func.bijection` | Bijective Function |
| 380 | mathematics | 10 | `math.func.step-function` | Step Function |
| 381 | mathematics | 10 | `math.prob.bayes-theorem` | Bayes' Theorem |
| 382 | mathematics | 10 | `math.prob.discrete-rv` | Discrete Random Variable |
| 383 | mathematics | 10 | `math.prob.cdf` | Cumulative Distribution Function |
| 384 | mathematics | 10 | `math.abst.group-operation` | Group Operation Examples |
| 385 | mathematics | 10 | `math.abst.subgroup` | Subgroup |
| 386 | mathematics | 10 | `math.abst.cyclic-group` | Cyclic Group |
| 387 | mathematics | 10 | `math.abst.group-order` | Order of Group and Elements |
| 388 | mathematics | 10 | `math.abst.group-homomorphism` | Group Homomorphism |
| 389 | mathematics | 10 | `math.abst.group-action` | Group Action |
| 390 | mathematics | 10 | `math.abst.symmetric-group` | Symmetric Group |
| 391 | mathematics | 10 | `math.abst.ring-theory` | Ring |
| 392 | mathematics | 10 | `math.abst.group-inverse` | Group Inverse |
| 393 | mathematics | 10 | `math.top.fundamental-group` | Fundamental Group |
| 394 | mathematics | 10 | `math.top.homology` | Homology |
| 395 | mathematics | 10 | `math.cat.natural-transformation` | Natural Transformation |
| 396 | english | 10 | `eng.phonetics.accents-and-dialects` | Accents and Dialects |
| 397 | english | 10 | `eng.vocab.context-clues` | Context Clues |
| 398 | english | 10 | `eng.vocab.synonyms-antonyms` | Synonyms and Antonyms |
| 399 | english | 10 | `eng.vocab.word-families` | Word Families |
| 400 | english | 10 | `eng.grammar.word-classes-overview` | Overview of Word Classes |
| 401 | english | 10 | `eng.listening.listening-for-gist` | Listening for Gist |
| 402 | english | 10 | `eng.listening.distinguishing-sounds-in-speech` | Distinguishing Sounds in Speech |
| 403 | english | 10 | `eng.speaking.pronunciation-in-conversation` | Pronunciation in Conversation |
| 404 | chemistry | 10 | `chem.period.periodic-properties` | Periodic Trends Overview |
| 405 | chemistry | 10 | `chem.bond.ionic-bonding` | Ionic Bonding |
| 406 | chemistry | 10 | `chem.bond.covalent-bonding` | Covalent Bonding |
| 407 | chemistry | 10 | `chem.equil.buffer` | Buffer Solutions |
| 408 | chemistry | 10 | `chem.equil.hydrolysis` | Salt Hydrolysis |
| 409 | chemistry | 10 | `chem.equil.titration` | Acid–Base Titrations |
| 410 | chemistry | 10 | `chem.redox.oxidation-state` | Oxidation State |
| 411 | biology | 10 | `bio.mol.translation-genetic-code` | Translation and the Genetic Code |
| 412 | biology | 10 | `bio.gen.gene-interactions` | Gene Interactions and Extensions of Mendelism |
| 413 | biology | 10 | `bio.repro.fertilisation-development` | Fertilisation and Embryonic Development |
| 414 | biology | 10 | `bio.immuno.antibody-structure-function` | Antibody Structure and Function |
| 415 | biology | 10 | `bio.div.plant-diversity-alternation-of-generations` | Plant Diversity and Alternation of Generations |
| 416 | biology | 10 | `bio.immuno.mhc-antigen-presentation` | MHC and Antigen Presentation |
| 417 | computer_science | 10 | `cs.prog.exception-handling` | Exception Handling |
| 418 | computer_science | 10 | `cs.control.nested-control-patterns` | Nested Control Flow Patterns |
| 419 | computer_science | 10 | `cs.data.strings` | Strings |
| 420 | mathematics | 11 | `math.found.proof-by-induction` | Mathematical Induction |
| 421 | mathematics | 11 | `math.found.well-ordering-principle` | Well-Ordering Principle |
| 422 | mathematics | 11 | `math.found.countable-set` | Countable Set |
| 423 | mathematics | 11 | `math.found.integers` | Integers |
| 424 | mathematics | 11 | `math.arith.counting` | Counting |
| 425 | mathematics | 11 | `math.func.inverse-functions` | Inverse Functions |
| 426 | mathematics | 11 | `math.seq.sequence` | Sequence |
| 427 | mathematics | 11 | `math.prob.bayesian-inference` | Bayesian Inference |
| 428 | mathematics | 11 | `math.prob.pmf` | Probability Mass Function |
| 429 | mathematics | 11 | `math.prob.quantile` | Quantile |
| 430 | mathematics | 11 | `math.prob.distribution` | Probability Distribution |
| 431 | mathematics | 11 | `math.abst.coset` | Coset |
| 432 | mathematics | 11 | `math.abst.group-isomorphism` | Group Isomorphism |
| 433 | mathematics | 11 | `math.abst.burnside-lemma` | Burnside's Lemma |
| 434 | mathematics | 11 | `math.abst.ideal` | Ideal |
| 435 | mathematics | 11 | `math.abst.ring-homomorphism` | Ring Homomorphism |
| 436 | mathematics | 11 | `math.abst.polynomial-ring` | Polynomial Ring |
| 437 | mathematics | 11 | `math.top.van-kampen` | Seifert-van Kampen Theorem |
| 438 | mathematics | 11 | `math.top.covering-space` | Covering Space |
| 439 | mathematics | 11 | `math.top.euler-characteristic` | Euler Characteristic |
| 440 | mathematics | 11 | `math.top.cohomology` | Cohomology |
| 441 | mathematics | 11 | `math.cat.functor-category` | Functor Category |
| 442 | mathematics | 11 | `math.cat.limits` | Limits and Colimits |
| 443 | mathematics | 11 | `math.cat.adjunction` | Adjunction |
| 444 | physics | 11 | `phys.mech.angular-momentum` | Angular Momentum |
| 445 | physics | 11 | `phys.mech.rolling-motion` | Rolling Without Slipping |
| 446 | physics | 11 | `phys.mech.euler-lagrange-equation` | The Euler-Lagrange Equation and Hamilton's Principle |
| 447 | physics | 11 | `phys.therm.carnot-cycle` | Carnot Cycle |
| 448 | physics | 11 | `phys.therm.third-law` | Third Law of Thermodynamics |
| 449 | physics | 11 | `phys.mod.compton-effect` | Compton Scattering |
| 450 | physics | 11 | `phys.mod.de-broglie` | de Broglie Hypothesis — Matter Waves |
| 451 | physics | 11 | `phys.mod.bohr-model` | Bohr Model of the Hydrogen Atom |
| 452 | physics | 11 | `phys.mod.x-rays` | X-Rays and Their Properties |
| 453 | physics | 11 | `phys.rel.time-dilation` | Time Dilation |
| 454 | physics | 11 | `phys.stat.probability-basics` | Probability Distributions in Physics |
| 455 | english | 11 | `eng.vocab.compound-words` | Compound Words |
| 456 | english | 11 | `eng.vocab.prefixes` | Prefixes |
| 457 | english | 11 | `eng.vocab.suffixes` | Suffixes |
| 458 | english | 11 | `eng.vocab.homonyms-homophones` | Homonyms and Homophones |
| 459 | english | 11 | `eng.vocab.connotation-denotation` | Connotation and Denotation |
| 460 | english | 11 | `eng.grammar.nouns` | Nouns |
| 461 | english | 11 | `eng.grammar.verbs` | Verbs |
| 462 | english | 11 | `eng.grammar.prepositions` | Prepositions |
| 463 | english | 11 | `eng.grammar.conjunctions` | Conjunctions |
| 464 | english | 11 | `eng.grammar.interjections` | Interjections |
| 465 | english | 11 | `eng.reading.print-to-meaning` | From Print to Meaning |
| 466 | english | 11 | `eng.listening.listening-for-detail` | Listening for Detail |
| 467 | english | 11 | `eng.speaking.conversation-skills` | Conversation Skills |
| 468 | chemistry | 11 | `chem.bond.vsepr` | VSEPR Theory |
| 469 | chemistry | 11 | `chem.bond.hybridization` | Hybridization |
| 470 | chemistry | 11 | `chem.bond.resonance` | Resonance Structures |
| 471 | chemistry | 11 | `chem.bond.bond-parameters` | Bond Parameters |
| 472 | chemistry | 11 | `chem.bond.coordinate-bond` | Coordinate and Dative Bonding |
| 473 | chemistry | 11 | `chem.redox.balancing` | Balancing Redox Equations |
| 474 | chemistry | 11 | `chem.solid.crystal-systems` | Crystal Systems |
| 475 | chemistry | 11 | `chem.sblock.alkali` | Alkali Metals |
| 476 | chemistry | 11 | `chem.pblock.group13` | Group 13 — Boron Family |
| 477 | chemistry | 11 | `chem.pblock.group14` | Group 14 — Carbon Family |
| 478 | chemistry | 11 | `chem.pblock.group15` | Group 15 — Nitrogen Family |
| 479 | chemistry | 11 | `chem.pblock.group16` | Group 16 — Oxygen Family |
| 480 | chemistry | 11 | `chem.pblock.group17` | Group 17 — Halogens |
| 481 | chemistry | 11 | `chem.pblock.group18` | Group 18 — Noble Gases |
| 482 | chemistry | 11 | `chem.dblock.general` | Transition Metals — General Properties |
| 483 | chemistry | 11 | `chem.org.iupac` | IUPAC Nomenclature |
| 484 | biology | 11 | `bio.mol.gene-regulation` | Regulation of Gene Expression |
| 485 | biology | 11 | `bio.gen.chromosomal-theory-linkage` | Chromosomal Theory and Linkage |
| 486 | biology | 11 | `bio.repro.reproductive-health` | Reproductive Health and Contraception |
| 487 | biology | 11 | `bio.dev.gametogenesis-fertilisation-dev` | Fundamentals of Animal Development |
| 488 | biology | 11 | `bio.immuno.vaccination-immunisation` | Vaccination and Immunisation |
| 489 | computer_science | 11 | `cs.data.lists` | Lists |
| 490 | computer_science | 11 | `cs.func.functions` | Functions |
| 491 | mathematics | 12 | `math.found.strong-induction` | Strong Induction |
| 492 | mathematics | 12 | `math.found.uncountable-set` | Uncountable Set |
| 493 | mathematics | 12 | `math.found.rational-numbers` | Rational Numbers |
| 494 | mathematics | 12 | `math.arith.counting-sequence` | Counting Sequence |
| 495 | mathematics | 12 | `math.arith.subitizing` | Subitizing |
| 496 | mathematics | 12 | `math.arith.place-value` | Place Value |
| 497 | mathematics | 12 | `math.arith.number-line` | Number Line |
| 498 | mathematics | 12 | `math.seq.arithmetic-sequence` | Arithmetic Sequence |
| 499 | mathematics | 12 | `math.seq.geometric-sequence` | Geometric Sequence |
| 500 | mathematics | 12 | `math.seq.recursive-sequences` | Recursive Sequences |
| 501 | mathematics | 12 | `math.seq.series` | Series |
| 502 | mathematics | 12 | `math.prob.discrete-distributions` | Discrete Distributions |
| 503 | mathematics | 12 | `math.prob.joint-distribution` | Joint Distribution |
| 504 | mathematics | 12 | `math.abst.lagrange-theorem` | Lagrange's Theorem |
| 505 | mathematics | 12 | `math.abst.normal-subgroup` | Normal Subgroup |
| 506 | mathematics | 12 | `math.abst.quotient-ring` | Quotient Ring |
| 507 | mathematics | 12 | `math.abst.prime-ideal` | Prime and Maximal Ideals |
| 508 | mathematics | 12 | `math.abst.euclidean-domain` | Euclidean Domain |
| 509 | mathematics | 12 | `math.cat.yoneda-lemma` | Yoneda Lemma |
| 510 | mathematics | 12 | `math.cat.equalizer` | Equalizer and Coequalizer |
| 511 | mathematics | 12 | `math.cat.pullback` | Pullback and Pushout |
| 512 | mathematics | 12 | `math.cat.monad` | Monad |
| 513 | mathematics | 12 | `math.cat.tensor-product` | Tensor Product (Categorical) |
| 514 | mathematics | 12 | `math.cat.topos` | Topos |
| 515 | physics | 12 | `phys.mech.conservation-of-angular-momentum` | Conservation of Angular Momentum |
| 516 | physics | 12 | `phys.mech.cyclic-coordinates-conservation-laws` | Cyclic Coordinates and Noether's Theorem |
| 517 | physics | 12 | `phys.mech.hamiltonian` | The Hamiltonian and Legendre Transform |
| 518 | physics | 12 | `phys.therm.refrigerators` | Refrigerators and Heat Pumps |
| 519 | physics | 12 | `phys.mod.wave-particle-duality` | Wave-Particle Duality |
| 520 | physics | 12 | `phys.mod.atomic-spectra` | Atomic Spectra and Energy Levels |
| 521 | physics | 12 | `phys.rel.length-contraction` | Length Contraction |
| 522 | physics | 12 | `phys.stat.boltzmann-factor` | Boltzmann Factor and Statistical Weight |
| 523 | english | 12 | `eng.vocab.roots-and-origins` | Greek and Latin Roots |
| 524 | english | 12 | `eng.vocab.multiple-meaning-words` | Multiple-Meaning Words |
| 525 | english | 12 | `eng.vocab.collocations` | Collocations |
| 526 | english | 12 | `eng.vocab.register-and-formality` | Register and Formality |
| 527 | english | 12 | `eng.grammar.pronouns` | Pronouns |
| 528 | english | 12 | `eng.grammar.adjectives` | Adjectives |
| 529 | english | 12 | `eng.grammar.articles-and-determiners` | Articles and Determiners |
| 530 | english | 12 | `eng.grammar.subject-and-predicate` | Subject and Predicate |
| 531 | english | 12 | `eng.grammar.present-tenses` | Present Tenses |
| 532 | english | 12 | `eng.reading.reading-fluency` | Reading Fluency |
| 533 | english | 12 | `eng.listening.following-instructions` | Following Spoken Instructions |
| 534 | english | 12 | `eng.listening.note-taking-while-listening` | Note-Taking While Listening |
| 535 | english | 12 | `eng.speaking.asking-and-answering-questions` | Asking and Answering Questions |
| 536 | english | 12 | `eng.speaking.storytelling-orally` | Oral Storytelling |
| 537 | english | 12 | `eng.speaking.non-verbal-communication` | Non-Verbal Communication |
| 538 | chemistry | 12 | `chem.bond.mo-theory` | Molecular Orbital Theory |
| 539 | chemistry | 12 | `chem.bond.polar-molecules` | Polarity and Dipole Moment |
| 540 | chemistry | 12 | `chem.thermo.bond-enthalpy` | Bond Enthalpy |
| 541 | chemistry | 12 | `chem.redox.disproportionation` | Disproportionation |
| 542 | chemistry | 12 | `chem.redox.activity-series` | Electrochemical Activity Series |
| 543 | chemistry | 12 | `chem.redox.titrations` | Redox Titrations |
| 544 | chemistry | 12 | `chem.solid.packing` | Close Packing and Efficiency |
| 545 | chemistry | 12 | `chem.solid.defects` | Crystal Defects |
| 546 | chemistry | 12 | `chem.solid.amorphous` | Amorphous Solids |
| 547 | chemistry | 12 | `chem.coord.werner` | Werner's Theory |
| 548 | chemistry | 12 | `chem.sblock.alkaline-earth` | Alkaline Earth Metals |
| 549 | chemistry | 12 | `chem.pblock.trends` | Trends Across p-Block |
| 550 | chemistry | 12 | `chem.dblock.first-row` | First-Row Transition Metals |
| 551 | chemistry | 12 | `chem.dblock.lanthanides` | Lanthanides and Actinides |
| 552 | chemistry | 12 | `chem.org.hybridization` | Carbon Hybridization |
| 553 | chemistry | 12 | `chem.org.purification` | Purification Techniques |
| 554 | chemistry | 12 | `chem.org.spectroscopy` | Introduction to Spectroscopy |
| 555 | biology | 12 | `bio.gen.pedigree-human-genetics` | Pedigree Analysis and Human Genetic Disorders |
| 556 | biology | 12 | `bio.gen.mutations` | Mutations |
| 557 | biology | 12 | `bio.dev.morphogenesis-differentiation` | Morphogenesis and Cell Differentiation |
| 558 | biology | 12 | `bio.immuno.immune-disorders` | Immune Disorders |
| 559 | biology | 12 | `bio.cell.apoptosis` | Apoptosis and Programmed Cell Death |
| 560 | biology | 12 | `bio.mol.epigenetics` | Epigenetics and Chromatin Regulation |
| 561 | biology | 12 | `bio.mol.noncoding-rna` | Non-coding RNA Biology |
| 562 | computer_science | 12 | `cs.data.tuples` | Tuples |
| 563 | computer_science | 12 | `cs.data.dictionaries` | Dictionaries |
| 564 | computer_science | 12 | `cs.func.scope-namespaces` | Scope and Namespaces |
| 565 | computer_science | 12 | `cs.file.text-files` | Text File Handling |
| 566 | computer_science | 12 | `cs.struct.linear-search` | Linear Search |
| 567 | computer_science | 12 | `cs.oop.oop-concepts` | Object-Oriented Programming Concepts |
| 568 | mathematics | 13 | `math.found.irrational-numbers` | Irrational Numbers |
| 569 | mathematics | 13 | `math.arith.ones-tens-hundreds` | Ones, Tens, Hundreds |
| 570 | mathematics | 13 | `math.arith.expanded-form` | Expanded Form |
| 571 | mathematics | 13 | `math.arith.number-base` | Number Base |
| 572 | mathematics | 13 | `math.arith.addition` | Addition |
| 573 | mathematics | 13 | `math.arith.ordering` | Ordering Numbers |
| 574 | mathematics | 13 | `math.seq.partial-sums` | Partial Sums |
| 575 | mathematics | 13 | `math.seq.arithmetic-series` | Arithmetic Series |
| 576 | mathematics | 13 | `math.seq.geometric-series` | Geometric Series |
| 577 | mathematics | 13 | `math.prob.marginal-distribution` | Marginal Distribution |
| 578 | mathematics | 13 | `math.prob.conditional-distribution` | Conditional Distribution |
| 579 | mathematics | 13 | `math.abst.quotient-group` | Quotient Group |
| 580 | mathematics | 13 | `math.abst.alternating-group` | Alternating Group |
| 581 | mathematics | 13 | `math.abst.pid` | Principal Ideal Domain |
| 582 | mathematics | 13 | `math.abst.field` | Field |
| 583 | mathematics | 13 | `math.cat.representable-functor` | Representable Functor |
| 584 | mathematics | 13 | `math.cat.higher-category` | Higher Category Theory |
| 585 | physics | 13 | `phys.mech.hamiltons-equations` | Hamilton's Equations of Motion |
| 586 | physics | 13 | `phys.mod.radioactivity` | Radioactivity: Alpha, Beta, Gamma Decay |
| 587 | physics | 13 | `phys.qm.wave-function` | Wave Function and Probability Interpretation |
| 588 | physics | 13 | `phys.rel.lorentz-transform` | Lorentz Transformations |
| 589 | physics | 13 | `phys.stat.partition-function` | Partition Function |
| 590 | physics | 13 | `phys.stat.maxwell-boltzmann` | Maxwell-Boltzmann Speed Distribution |
| 591 | english | 13 | `eng.vocab.word-formation-processes` | Word Formation Processes |
| 592 | english | 13 | `eng.vocab.idioms` | Idioms |
| 593 | english | 13 | `eng.vocab.phrasal-verbs` | Phrasal Verbs |
| 594 | english | 13 | `eng.vocab.etymology` | Etymology |
| 595 | english | 13 | `eng.vocab.thesaurus-and-dictionary-skills` | Thesaurus and Dictionary Skills |
| 596 | english | 13 | `eng.grammar.adverbs` | Adverbs |
| 597 | english | 13 | `eng.grammar.word-order` | Basic Word Order |
| 598 | english | 13 | `eng.grammar.past-tenses` | Past Tenses |
| 599 | english | 13 | `eng.grammar.future-tenses` | Future Tenses |
| 600 | english | 13 | `eng.grammar.modals` | Modal Verbs |
| 601 | english | 13 | `eng.grammar.gerunds-and-infinitives` | Gerunds and Infinitives |
| 602 | english | 13 | `eng.grammar.subject-verb-agreement` | Subject-Verb Agreement |
| 603 | english | 13 | `eng.reading.literal-comprehension` | Literal Comprehension |
| 604 | english | 13 | `eng.reading.skimming-and-scanning` | Skimming and Scanning |
| 605 | english | 13 | `eng.listening.listening-comprehension-strategies` | Listening Comprehension Strategies |
| 606 | english | 13 | `eng.speaking.discussion-skills` | Discussion Skills |
| 607 | english | 13 | `eng.communication.digital-communication` | Digital Communication |
| 608 | chemistry | 13 | `chem.bond.intermolecular` | Intermolecular Forces |
| 609 | chemistry | 13 | `chem.elect.galvanic-cell` | Galvanic Cell |
| 610 | chemistry | 13 | `chem.solid.ionic-solids` | Ionic Crystal Structures |
| 611 | chemistry | 13 | `chem.solid.properties` | Electrical and Magnetic Properties |
| 612 | chemistry | 13 | `chem.coord.nomenclature` | Nomenclature of Complexes |
| 613 | chemistry | 13 | `chem.coord.cft` | Crystal Field Theory |
| 614 | chemistry | 13 | `chem.coord.stability` | Stability Constants |
| 615 | chemistry | 13 | `chem.dblock.oxo-species` | Oxides and Oxyanions of Transition Metals |
| 616 | chemistry | 13 | `chem.org.isomerism` | Structural and Stereoisomerism |
| 617 | chemistry | 13 | `chem.org.electronic-effects` | Inductive and Mesomeric Effects |
| 618 | chemistry | 13 | `chem.org.qualitative-analysis` | Qualitative Organic Analysis |
| 619 | chemistry | 13 | `chem.org.aromaticity` | Aromaticity |
| 620 | chemistry | 13 | `chem.hyd.alkanes` | Alkanes |
| 621 | chemistry | 13 | `chem.anal.volumetric` | Volumetric Analysis |
| 622 | chemistry | 13 | `chem.anal.spectroscopy` | Spectroscopic Methods |
| 623 | biology | 13 | `bio.gen.population-genetics` | Population Genetics |
| 624 | biology | 13 | `bio.gen.genetic-engineering` | Genetic Engineering and Recombinant DNA |
| 625 | biology | 13 | `bio.dev.stem-cells-regeneration` | Stem Cells and Regeneration |
| 626 | biology | 13 | `bio.mol.dna-damage-repair` | DNA Damage Response and Repair |
| 627 | biology | 13 | `bio.gen.transposable-elements` | Transposable Elements and Genome Organisation |
| 628 | biology | 13 | `bio.evo.evo-devo` | Evolutionary Developmental Biology |
| 629 | computer_science | 13 | `cs.data.sets` | Sets |
| 630 | computer_science | 13 | `cs.func.recursion` | Recursion |
| 631 | computer_science | 13 | `cs.file.csv-files` | CSV File Handling |
| 632 | computer_science | 13 | `cs.file.binary-serialisation` | Binary Files and Serialisation |
| 633 | computer_science | 13 | `cs.struct.hashing-hash-tables` | Hashing and Hash Tables |
| 634 | computer_science | 13 | `cs.struct.binary-search` | Binary Search |
| 635 | computer_science | 13 | `cs.oop.classes-objects-python` | Classes and Objects in Python |
| 636 | computer_science | 13 | `cs.db.database-concepts` | Database Concepts |
| 637 | computer_science | 13 | `cs.se.sdlc` | Software Development Life Cycle |
| 638 | mathematics | 14 | `math.found.real-numbers` | Real Numbers |
| 639 | mathematics | 14 | `math.arith.carrying` | Carrying (Regrouping) |
| 640 | mathematics | 14 | `math.arith.mental-addition` | Mental Addition |
| 641 | mathematics | 14 | `math.arith.subtraction` | Subtraction |
| 642 | mathematics | 14 | `math.arith.multiplication` | Multiplication |
| 643 | mathematics | 14 | `math.seq.infinite-geometric-series` | Infinite Geometric Series |
| 644 | mathematics | 14 | `math.seq.telescoping-series` | Telescoping Series |
| 645 | mathematics | 14 | `math.prob.conditional-expectation` | Conditional Expectation |
| 646 | mathematics | 14 | `math.abst.first-isomorphism-theorem` | First Isomorphism Theorem |
| 647 | mathematics | 14 | `math.abst.ufd` | Unique Factorization Domain |
| 648 | mathematics | 14 | `math.abst.field-extension` | Field Extension |
| 649 | physics | 14 | `phys.mech.poisson-brackets` | Poisson Brackets and Phase Space Dynamics |
| 650 | physics | 14 | `phys.mod.radioactive-decay` | Radioactive Decay Law and Half-Life |
| 651 | physics | 14 | `phys.qm.schrodinger-equation` | Time-Dependent Schrödinger Equation |
| 652 | physics | 14 | `phys.qm.uncertainty-principle` | Heisenberg's Uncertainty Principle |
| 653 | physics | 14 | `phys.rel.relativistic-momentum` | Relativistic Momentum and Energy |
| 654 | physics | 14 | `phys.stat.bose-einstein` | Bose-Einstein Statistics |
| 655 | physics | 14 | `phys.stat.entropy-statistical` | Statistical Definition of Entropy |
| 656 | physics | 14 | `phys.stat.free-energy` | Helmholtz and Gibbs Free Energy |
| 657 | physics | 14 | `phys.stat.grand-canonical-ensemble` | Grand Canonical Ensemble |
| 658 | physics | 14 | `phys.stat.fluctuations-correlations` | Fluctuations, Response Functions, and Correlations |
| 659 | english | 14 | `eng.vocab.academic-vocabulary` | Academic Vocabulary |
| 660 | english | 14 | `eng.vocab.semantic-fields` | Semantic Fields |
| 661 | english | 14 | `eng.grammar.sentence-types-by-function` | Sentence Types by Function |
| 662 | english | 14 | `eng.grammar.phrases` | Phrases |
| 663 | english | 14 | `eng.grammar.tense-consistency` | Tense Consistency |
| 664 | english | 14 | `eng.grammar.conditionals` | Conditional Sentences |
| 665 | english | 14 | `eng.grammar.participles-and-participial-phrases` | Participles and Participial Phrases |
| 666 | english | 14 | `eng.grammar.pronoun-antecedent-agreement` | Pronoun-Antecedent Agreement |
| 667 | english | 14 | `eng.grammar.comparatives-and-superlatives` | Comparatives and Superlatives |
| 668 | english | 14 | `eng.reading.main-idea-and-details` | Main Idea and Supporting Details |
| 669 | english | 14 | `eng.listening.critical-listening` | Critical Listening |
| 670 | english | 14 | `eng.speaking.public-speaking-basics` | Public Speaking Basics |
| 671 | chemistry | 14 | `chem.state.liquids` | Liquid State Properties |
| 672 | chemistry | 14 | `chem.elect.standard-electrode` | Standard Electrode Potential |
| 673 | chemistry | 14 | `chem.elect.electrolysis` | Electrolysis and Faraday's Laws |
| 674 | chemistry | 14 | `chem.elect.batteries` | Batteries and Fuel Cells |
| 675 | chemistry | 14 | `chem.elect.corrosion` | Corrosion |
| 676 | chemistry | 14 | `chem.coord.isomerism` | Isomerism in Complexes |
| 677 | chemistry | 14 | `chem.coord.bonding` | Bonding in Complexes |
| 678 | chemistry | 14 | `chem.coord.applications` | Applications of Coordination Chemistry |
| 679 | chemistry | 14 | `chem.sblock.water` | Chemistry of Water |
| 680 | chemistry | 14 | `chem.dblock.organometallics` | Organometallic Chemistry |
| 681 | chemistry | 14 | `chem.org.reactive-intermediates` | Reactive Intermediates |
| 682 | chemistry | 14 | `chem.hyd.arenes` | Benzene and Arenes |
| 683 | chemistry | 14 | `chem.hyd.conformations` | Conformational Analysis |
| 684 | chemistry | 14 | `chem.hyd.petroleum` | Petroleum Refining |
| 685 | chemistry | 14 | `chem.hal.introduction` | Haloalkanes and Haloarenes |
| 686 | biology | 14 | `bio.evo.modern-synthesis-speciation` | Modern Synthesis and Speciation |
| 687 | biology | 14 | `bio.biotech.biotech-principles` | Principles of Biotechnology |
| 688 | computer_science | 14 | `cs.data.comprehensions-iterators` | Comprehensions, Iterators and Generators |
| 689 | computer_science | 14 | `cs.func.lambda-functional` | Lambda Expressions and Functional Tools |
| 690 | computer_science | 14 | `cs.struct.stacks` | Stacks |
| 691 | computer_science | 14 | `cs.struct.elementary-sorts` | Elementary Sorting — Bubble, Selection, Insertion |
| 692 | computer_science | 14 | `cs.oop.encapsulation-abstraction` | Encapsulation and Abstraction |
| 693 | computer_science | 14 | `cs.db.er-modeling` | Entity-Relationship Modeling |
| 694 | computer_science | 14 | `cs.se.version-control-git` | Version Control with Git |
| 695 | mathematics | 15 | `math.found.complex-numbers` | Complex Numbers |
| 696 | mathematics | 15 | `math.arith.column-addition` | Column Addition |
| 697 | mathematics | 15 | `math.arith.borrowing` | Borrowing (Regrouping in Subtraction) |
| 698 | mathematics | 15 | `math.arith.negative-numbers` | Negative Numbers |
| 699 | mathematics | 15 | `math.arith.multiplication-table` | Multiplication Table |
| 700 | mathematics | 15 | `math.arith.division` | Division |
| 701 | mathematics | 15 | `math.arith.exponentiation` | Exponentiation |
| 702 | mathematics | 15 | `math.geom.coordinate-plane` | Coordinate Plane |
| 703 | mathematics | 15 | `math.func.real-valued-function` | Real-Valued Function |
| 704 | mathematics | 15 | `math.prob.martingale` | Martingale |
| 705 | mathematics | 15 | `math.disc.counting-principles` | Counting Principles |
| 706 | mathematics | 15 | `math.abst.second-isomorphism-theorem` | Second and Third Isomorphism Theorems |
| 707 | mathematics | 15 | `math.abst.algebraic-extension` | Algebraic Extension |
| 708 | mathematics | 15 | `math.real.completeness` | Completeness of ℝ |
| 709 | mathematics | 15 | `math.real.metric-space` | Metric Space |
| 710 | physics | 15 | `phys.mech.canonical-transformations` | Canonical Transformations and Generating Functions |
| 711 | physics | 15 | `phys.mod.nuclear-reactions` | Nuclear Reactions and Q-Value |
| 712 | physics | 15 | `phys.qm.operators` | Quantum Operators and Observables |
| 713 | physics | 15 | `phys.qm.particle-in-box` | Particle in an Infinite Square Well |
| 714 | physics | 15 | `phys.qm.harmonic-oscillator-qm` | Quantum Harmonic Oscillator |
| 715 | physics | 15 | `phys.qm.quantum-tunneling` | Quantum Tunneling |
| 716 | physics | 15 | `phys.rel.mass-energy` | Mass-Energy Equivalence: E=mc² |
| 717 | physics | 15 | `phys.stat.chemical-potential` | Chemical Potential and Thermodynamic Equilibrium |
| 718 | physics | 15 | `phys.stat.phase-transitions` | Phase Transitions and Landau Mean-Field Theory |
| 719 | english | 15 | `eng.grammar.question-formation` | Question Formation |
| 720 | english | 15 | `eng.grammar.negation` | Negation |
| 721 | english | 15 | `eng.grammar.clauses` | Independent and Dependent Clauses |
| 722 | english | 15 | `eng.grammar.active-and-passive-voice` | Active and Passive Voice |
| 723 | english | 15 | `eng.grammar.direct-and-indirect-speech` | Direct and Indirect Speech |
| 724 | english | 15 | `eng.grammar.capitalization-rules` | Capitalization Rules |
| 725 | english | 15 | `eng.reading.inference-in-reading` | Inference in Reading |
| 726 | english | 15 | `eng.reading.summarizing` | Summarizing |
| 727 | english | 15 | `eng.reading.text-structure` | Text Structure |
| 728 | english | 15 | `eng.speaking.presentation-skills` | Presentation Skills |
| 729 | chemistry | 15 | `chem.state.phase-diagram` | Phase Diagrams |
| 730 | chemistry | 15 | `chem.sol.vapour-pressure` | Vapour Pressure of Solutions |
| 731 | chemistry | 15 | `chem.elect.nernst` | Nernst Equation |
| 732 | chemistry | 15 | `chem.elect.industrial` | Industrial Electrolysis |
| 733 | chemistry | 15 | `chem.surface.surfactants` | Surfactants and Micelles |
| 734 | chemistry | 15 | `chem.org.mechanisms` | Organic Reaction Mechanisms |
| 735 | chemistry | 15 | `chem.hyd.polycyclic` | Polycyclic and Heterocyclic Systems |
| 736 | chemistry | 15 | `chem.hal.sn1` | SN1 Mechanism |
| 737 | chemistry | 15 | `chem.hal.sn2` | SN2 Mechanism |
| 738 | chemistry | 15 | `chem.hal.haloarenes` | Haloarenes |
| 739 | chemistry | 15 | `chem.hal.cfcs` | Polyhalogen Compounds and CFCs |
| 740 | chemistry | 15 | `chem.nitro.nitro-compounds` | Nitro Compounds |
| 741 | biology | 15 | `bio.evo.human-evolution` | Human Evolution |
| 742 | biology | 15 | `bio.biotech.biotech-process-applications` | Biotechnology Process Applications |
| 743 | computer_science | 15 | `cs.func.modules-packages` | Modules and Packages |
| 744 | computer_science | 15 | `cs.struct.queues` | Queues |
| 745 | computer_science | 15 | `cs.struct.efficient-sorts` | Efficient Sorting — Merge Sort and Quick Sort |
| 746 | computer_science | 15 | `cs.oop.inheritance` | Inheritance |
| 747 | computer_science | 15 | `cs.db.relational-model` | The Relational Model |
| 748 | computer_science | 15 | `cs.se.software-testing` | Software Testing Fundamentals |
| 749 | mathematics | 16 | `math.arith.absolute-value` | Absolute Value |
| 750 | mathematics | 16 | `math.arith.integer-arithmetic` | Integer Arithmetic |
| 751 | mathematics | 16 | `math.arith.long-multiplication` | Long Multiplication |
| 752 | mathematics | 16 | `math.arith.mental-multiplication` | Mental Multiplication |
| 753 | mathematics | 16 | `math.arith.remainder` | Remainder |
| 754 | mathematics | 16 | `math.arith.divisor-dividend` | Divisor and Dividend |
| 755 | mathematics | 16 | `math.arith.order-of-operations` | Order of Operations |
| 756 | mathematics | 16 | `math.arith.exponent-rules` | Exponent Rules |
| 757 | mathematics | 16 | `math.arith.square-numbers` | Perfect Squares |
| 758 | mathematics | 16 | `math.arith.cube-numbers` | Perfect Cubes |
| 759 | mathematics | 16 | `math.nt.divisibility` | Divisibility |
| 760 | mathematics | 16 | `math.nt.division-algorithm` | Division Algorithm |
| 761 | mathematics | 16 | `math.geom.circle-equation` | Equation of a Circle |
| 762 | mathematics | 16 | `math.geom.x-y-coordinates` | Cartesian Coordinates |
| 763 | mathematics | 16 | `math.geom.quadrants` | Quadrants |
| 764 | mathematics | 16 | `math.geom.midpoint-formula` | Midpoint Formula |
| 765 | mathematics | 16 | `math.geom.slope` | Slope |
| 766 | mathematics | 16 | `math.geom.transformations` | Geometric Transformations |
| 767 | mathematics | 16 | `math.geom.vectors-2d` | Vectors in 2D |
| 768 | mathematics | 16 | `math.func.graph-of-function` | Graph of a Function |
| 769 | mathematics | 16 | `math.calc.limits` | Limit of a Function |
| 770 | mathematics | 16 | `math.calc.parametric-curves` | Parametric Equations and Curves |
| 771 | mathematics | 16 | `math.prob.classical-probability` | Classical Probability |
| 772 | mathematics | 16 | `math.disc.permutations` | Permutations |
| 773 | mathematics | 16 | `math.disc.pigeonhole` | Pigeonhole Principle |
| 774 | mathematics | 16 | `math.abst.galois-theory` | Galois Theory |
| 775 | mathematics | 16 | `math.real.sup-inf` | Supremum and Infimum |
| 776 | mathematics | 16 | `math.real.archimedean` | Archimedean Property |
| 777 | mathematics | 16 | `math.real.convergence-sequences` | Convergence of Sequences |
| 778 | mathematics | 16 | `math.real.open-sets` | Open and Closed Sets |
| 779 | physics | 16 | `phys.mech.hamilton-jacobi-equation` | Hamilton-Jacobi Equation and Action-Angle Variables |
| 780 | physics | 16 | `phys.mod.binding-energy` | Nuclear Binding Energy and Mass Defect |
| 781 | physics | 16 | `phys.qm.hydrogen-atom-qm` | Quantum Treatment of Hydrogen Atom |
| 782 | physics | 16 | `phys.qm.spin` | Electron Spin and the Stern-Gerlach Experiment |
| 783 | physics | 16 | `phys.rel.spacetime` | Spacetime Interval and Four-Vectors |
| 784 | physics | 16 | `phys.stat.ising-model` | Ising Model |
| 785 | physics | 16 | `phys.particle.four-forces` | Four Fundamental Forces |
| 786 | english | 16 | `eng.grammar.simple-sentences` | Simple Sentences |
| 787 | english | 16 | `eng.grammar.end-punctuation` | End Punctuation |
| 788 | english | 16 | `eng.reading.predicting-and-confirming` | Predicting and Confirming |
| 789 | english | 16 | `eng.reading.genre-recognition` | Genre Recognition |
| 790 | english | 16 | `eng.reading.authors-purpose-and-tone` | Author's Purpose and Tone |
| 791 | english | 16 | `eng.reading.compare-and-contrast-texts` | Comparing and Contrasting Texts |
| 792 | english | 16 | `eng.speaking.debate-skills` | Debate Skills |
| 793 | chemistry | 16 | `chem.sol.colligative` | Colligative Properties |
| 794 | chemistry | 16 | `chem.sol.activity` | Activity and Non-ideal Solutions |
| 795 | chemistry | 16 | `chem.elect.concentration-cell` | Concentration Cells |
| 796 | chemistry | 16 | `chem.org.arrow-pushing` | Electron Flow and Arrow Notation |
| 797 | chemistry | 16 | `chem.org.pericyclic` | Pericyclic Reactions |
| 798 | chemistry | 16 | `chem.hyd.alkenes` | Alkenes |
| 799 | chemistry | 16 | `chem.hal.elimination` | Elimination Reactions |
| 800 | chemistry | 16 | `chem.hal.grignard` | Grignard and Organolithium Reagents |
| 801 | chemistry | 16 | `chem.alc.alcohols` | Alcohols |
| 802 | biology | 16 | `bio.biotech.genomics-proteomics` | Genomics and Proteomics |
| 803 | computer_science | 16 | `cs.func.decorators` | Decorators |
| 804 | computer_science | 16 | `cs.struct.deques-priority-queues` | Deques and Priority Queues |
| 805 | computer_science | 16 | `cs.struct.linked-lists` | Singly Linked Lists |
| 806 | computer_science | 16 | `cs.oop.polymorphism-overloading` | Polymorphism and Operator Overloading |
| 807 | computer_science | 16 | `cs.db.normalisation` | Normalisation |
| 808 | computer_science | 16 | `cs.db.sql-ddl-dml` | SQL — DDL and DML Basics |
| 809 | computer_science | 16 | `cs.ds.numpy-arrays` | NumPy for Numerical Computing |
| 810 | mathematics | 17 | `math.arith.long-division` | Long Division |
| 811 | mathematics | 17 | `math.arith.fraction-equivalence` | Equivalent Fractions |
| 812 | mathematics | 17 | `math.arith.fraction-multiplication` | Multiplication and Division of Fractions |
| 813 | mathematics | 17 | `math.arith.fraction-reciprocal` | Reciprocal |
| 814 | mathematics | 17 | `math.arith.mixed-numbers` | Mixed Numbers |
| 815 | mathematics | 17 | `math.arith.improper-fractions` | Improper Fractions |
| 816 | mathematics | 17 | `math.arith.decimals` | Decimals |
| 817 | mathematics | 17 | `math.arith.ratios` | Ratio |
| 818 | mathematics | 17 | `math.arith.square-roots` | Square Roots |
| 819 | mathematics | 17 | `math.arith.mental-arithmetic` | Mental Arithmetic |
| 820 | mathematics | 17 | `math.nt.divisibility-rules` | Divisibility Rules |
| 821 | mathematics | 17 | `math.nt.prime-number` | Prime Number |
| 822 | mathematics | 17 | `math.nt.modular-arithmetic` | Modular Arithmetic |
| 823 | mathematics | 17 | `math.nt.induction-applications` | Induction in Number Theory |
| 824 | mathematics | 17 | `math.alg.expression` | Algebraic Expression |
| 825 | mathematics | 17 | `math.geom.pythagorean-theorem` | Pythagorean Theorem |
| 826 | mathematics | 17 | `math.geom.line-equation` | Equations of Lines |
| 827 | mathematics | 17 | `math.geom.translation` | Translation |
| 828 | mathematics | 17 | `math.geom.reflection` | Reflection |
| 829 | mathematics | 17 | `math.geom.vectors-3d` | Vectors in 3D |
| 830 | mathematics | 17 | `math.func.zero-of-function` | Zero of a Function |
| 831 | mathematics | 17 | `math.func.even-odd-functions` | Even and Odd Functions |
| 832 | mathematics | 17 | `math.func.transformations-functions` | Transformations of Functions |
| 833 | mathematics | 17 | `math.func.linear-function` | Linear Function |
| 834 | mathematics | 17 | `math.seq.convergent` | Convergent Sequence |
| 835 | mathematics | 17 | `math.calc.limit-laws` | Limit Laws |
| 836 | mathematics | 17 | `math.calc.one-sided-limits` | One-Sided Limits |
| 837 | mathematics | 17 | `math.calc.limits-at-infinity` | Limits at Infinity |
| 838 | mathematics | 17 | `math.calc.continuity` | Continuity |
| 839 | mathematics | 17 | `math.calc.derivative-intro` | Slope of Tangent and Rate of Change |
| 840 | mathematics | 17 | `math.calc.riemann-sums` | Riemann Sums |
| 841 | mathematics | 17 | `math.calc.sequence-limits` | Limits of Sequences (Calculus) |
| 842 | mathematics | 17 | `math.linalg.vector` | Vector |
| 843 | mathematics | 17 | `math.prob.convergence-types` | Modes of Convergence |
| 844 | mathematics | 17 | `math.stats.population-sample` | Population and Sample |
| 845 | mathematics | 17 | `math.disc.combinations` | Combinations |
| 846 | mathematics | 17 | `math.disc.asymptotic-notation` | Asymptotic Notation |
| 847 | mathematics | 17 | `math.abst.galois-group` | Galois Group |
| 848 | mathematics | 17 | `math.real.cauchy-sequence` | Cauchy Sequence |
| 849 | mathematics | 17 | `math.real.series-rigorous` | Series (Rigorous) |
| 850 | mathematics | 17 | `math.real.compactness` | Compactness |
| 851 | mathematics | 17 | `math.real.connectedness` | Connectedness |
| 852 | mathematics | 17 | `math.real.pointwise-convergence` | Pointwise Convergence |
| 853 | mathematics | 17 | `math.graph.ramsey-theory` | Ramsey Theory |
| 854 | physics | 17 | `phys.mod.nuclear-fission` | Nuclear Fission and Chain Reactions |
| 855 | physics | 17 | `phys.mod.nuclear-fusion` | Nuclear Fusion and Stellar Energy |
| 856 | physics | 17 | `phys.mod.nuclear-models` | Nuclear Models: Shell Model |
| 857 | physics | 17 | `phys.qm.pauli-exclusion` | Pauli Exclusion Principle |
| 858 | physics | 17 | `phys.qm.perturbation-theory` | Time-Independent Perturbation Theory |
| 859 | physics | 17 | `phys.qm.selection-rules` | Selection Rules and Transition Probabilities |
| 860 | physics | 17 | `phys.qm.angular-momentum-addition` | Addition of Angular Momenta and Clebsch-Gordan Coefficients |
| 861 | physics | 17 | `phys.qm.density-matrix` | Density Matrix and Mixed Quantum States |
| 862 | physics | 17 | `phys.stat.phase-transitions-critical-phenomena` | Critical Phenomena, Scaling Laws, and Universality |
| 863 | physics | 17 | `phys.stat.monte-carlo-basics` | Monte Carlo Methods in Statistical Physics |
| 864 | physics | 17 | `phys.particle.particle-classification` | Particle Classification: Hadrons and Leptons |
| 865 | physics | 17 | `phys.particle.gauge-bosons` | Gauge Bosons and Force Carriers |
| 866 | english | 17 | `eng.grammar.compound-sentences` | Compound Sentences |
| 867 | english | 17 | `eng.grammar.comma-usage` | Comma Usage |
| 868 | english | 17 | `eng.grammar.sentence-fragments` | Sentence Fragments |
| 869 | english | 17 | `eng.reading.close-reading` | Close Reading |
| 870 | english | 17 | `eng.writing.sentence-writing` | Sentence Writing |
| 871 | chemistry | 17 | `chem.sol.osmosis` | Osmosis and Osmotic Pressure |
| 872 | chemistry | 17 | `chem.hyd.alkynes` | Alkynes |
| 873 | chemistry | 17 | `chem.alc.phenols` | Phenols |
| 874 | chemistry | 17 | `chem.alc.ethers` | Ethers |
| 875 | chemistry | 17 | `chem.alc.diols` | Diols and Polyols |
| 876 | chemistry | 17 | `chem.carb.aldehydes` | Aldehydes |
| 877 | chemistry | 17 | `chem.nitro.amines` | Amines |
| 878 | chemistry | 17 | `chem.poly.addition` | Addition Polymerization |
| 879 | biology | 17 | `bio.biotech.crispr-genome-editing` | CRISPR and Genome Editing |
| 880 | biology | 17 | `bio.bioinfo.bioinformatics-intro` | Introduction to Bioinformatics |
| 881 | computer_science | 17 | `cs.struct.doubly-circular-lists` | Doubly and Circular Linked Lists |
| 882 | computer_science | 17 | `cs.struct.trees` | Trees |
| 883 | computer_science | 17 | `cs.oop.class-static-methods` | Class Methods and Static Methods |
| 884 | computer_science | 17 | `cs.db.sql-queries-functions` | SQL — Queries and Aggregate Functions |
| 885 | computer_science | 17 | `cs.ds.pandas-dataframes` | Pandas for Data Analysis |
| 886 | mathematics | 18 | `math.arith.decimal-operations` | Decimal Operations |
| 887 | mathematics | 18 | `math.arith.terminating-decimals` | Terminating Decimals |
| 888 | mathematics | 18 | `math.arith.repeating-decimals` | Repeating Decimals |
| 889 | mathematics | 18 | `math.arith.percentages` | Percentages |
| 890 | mathematics | 18 | `math.arith.proportion` | Proportion |
| 891 | mathematics | 18 | `math.arith.unit-rate` | Unit Rate |
| 892 | mathematics | 18 | `math.arith.rounding` | Rounding |
| 893 | mathematics | 18 | `math.arith.irrational-roots` | Irrational Square Roots |
| 894 | mathematics | 18 | `math.arith.scientific-notation` | Scientific Notation |
| 895 | mathematics | 18 | `math.nt.composite-number` | Composite Number |
| 896 | mathematics | 18 | `math.nt.sieve-of-eratosthenes` | Sieve of Eratosthenes |
| 897 | mathematics | 18 | `math.nt.prime-factorization` | Prime Factorization |
| 898 | mathematics | 18 | `math.nt.congruence` | Congruence |
| 899 | mathematics | 18 | `math.nt.fermats-little-theorem` | Fermat's Little Theorem |
| 900 | mathematics | 18 | `math.nt.prime-distribution` | Distribution of Primes |
| 901 | mathematics | 18 | `math.alg.term` | Term |
| 902 | mathematics | 18 | `math.alg.equation` | Equation |
| 903 | mathematics | 18 | `math.alg.polynomial` | Polynomial |
| 904 | mathematics | 18 | `math.alg.exponent-rules` | Exponent Rules (Algebraic) |
| 905 | mathematics | 18 | `math.geom.pythagorean-converse` | Converse of the Pythagorean Theorem |
| 906 | mathematics | 18 | `math.geom.similar-triangles` | Similar Triangles |
| 907 | mathematics | 18 | `math.geom.distance-formula` | Distance Formula |
| 908 | mathematics | 18 | `math.geom.dilation` | Dilation |
| 909 | mathematics | 18 | `math.geom.cross-product` | Cross Product |
| 910 | mathematics | 18 | `math.geom.differential-geometry-curves` | Curves in Space |
| 911 | mathematics | 18 | `math.seq.divergent-sequence` | Divergent Sequence |
| 912 | mathematics | 18 | `math.seq.series-convergence` | Convergence of Series |
| 913 | mathematics | 18 | `math.calc.squeeze-theorem` | Squeeze Theorem |
| 914 | mathematics | 18 | `math.calc.continuity-types` | Types of Discontinuity |
| 915 | mathematics | 18 | `math.calc.ivt` | Intermediate Value Theorem |
| 916 | mathematics | 18 | `math.calc.derivative-definition` | Derivative (Definition) |
| 917 | mathematics | 18 | `math.calc.definite-integral` | Definite Integral |
| 918 | mathematics | 18 | `math.calc.line-integrals` | Line Integrals |
| 919 | mathematics | 18 | `math.linalg.vector-addition` | Vector Addition |
| 920 | mathematics | 18 | `math.linalg.scalar-multiplication` | Scalar Multiplication |
| 921 | mathematics | 18 | `math.linalg.dot-product` | Dot Product |
| 922 | mathematics | 18 | `math.linalg.matrix` | Matrix |
| 923 | mathematics | 18 | `math.prob.combinatorial-probability` | Combinatorial Probability |
| 924 | mathematics | 18 | `math.stats.descriptive-statistics` | Descriptive Statistics |
| 925 | mathematics | 18 | `math.stats.sampling` | Sampling Methods |
| 926 | mathematics | 18 | `math.disc.binomial-theorem` | Binomial Theorem |
| 927 | mathematics | 18 | `math.disc.combinatorics` | Combinatorics |
| 928 | mathematics | 18 | `math.disc.stars-bars` | Stars and Bars |
| 929 | mathematics | 18 | `math.disc.inclusion-exclusion` | Inclusion-Exclusion Principle |
| 930 | mathematics | 18 | `math.abst.sylow-theorems` | Sylow Theorems |
| 931 | mathematics | 18 | `math.abst.finite-field` | Finite Field |
| 932 | mathematics | 18 | `math.abst.galois-correspondence` | Fundamental Theorem of Galois Theory |
| 933 | mathematics | 18 | `math.real.absolute-convergence` | Absolute Convergence |
| 934 | mathematics | 18 | `math.real.completeness-metric` | Completeness of Metric Spaces |
| 935 | mathematics | 18 | `math.real.continuity-rigorous` | Continuity (ε-δ) |
| 936 | mathematics | 18 | `math.opt.convex-set` | Convex Set |
| 937 | mathematics | 18 | `math.graph.shortest-path` | Shortest Path Algorithms |
| 938 | physics | 18 | `phys.qm.variational-method` | Variational Method and Variational Principle |
| 939 | physics | 18 | `phys.qm.identical-particles` | Identical Particles and the Symmetrization Postulate |
| 940 | physics | 18 | `phys.qm.scattering-theory-born-approximation` | Scattering Theory and the Born Approximation |
| 941 | physics | 18 | `phys.stat.fermi-dirac` | Fermi-Dirac Statistics |
| 942 | physics | 18 | `phys.astro.stellar-structure` | Stellar Structure and the Main Sequence |
| 943 | physics | 18 | `phys.particle.antimatter` | Antimatter and Antiparticles |
| 944 | physics | 18 | `phys.particle.quarks` | Quarks |
| 945 | physics | 18 | `phys.particle.leptons` | Leptons |
| 946 | english | 18 | `eng.grammar.complex-sentences` | Complex Sentences |
| 947 | english | 18 | `eng.grammar.parallel-structure` | Parallel Structure |
| 948 | english | 18 | `eng.grammar.apostrophes` | Apostrophes |
| 949 | english | 18 | `eng.grammar.quotation-marks` | Quotation Marks |
| 950 | english | 18 | `eng.grammar.colons-semicolons-dashes` | Colons, Semicolons, and Dashes |
| 951 | english | 18 | `eng.grammar.run-on-sentences-and-comma-splices` | Run-On Sentences and Comma Splices |
| 952 | english | 18 | `eng.reading.critical-reading` | Critical Reading |
| 953 | english | 18 | `eng.writing.paragraph-structure` | Paragraph Structure |
| 954 | english | 18 | `eng.literature.narrative-elements` | Narrative Elements |
| 955 | chemistry | 18 | `chem.alc.epoxides` | Epoxides |
| 956 | chemistry | 18 | `chem.alc.protection` | Protecting Group Strategy |
| 957 | chemistry | 18 | `chem.carb.ketones` | Ketones |
| 958 | chemistry | 18 | `chem.carb.carboxylic` | Carboxylic Acids |
| 959 | chemistry | 18 | `chem.nitro.diazonium` | Diazonium Salts |
| 960 | chemistry | 18 | `chem.nitro.heterocycles` | Nitrogen Heterocycles |
| 961 | chemistry | 18 | `chem.bio.carbohydrates` | Carbohydrates |
| 962 | biology | 18 | `bio.bioinfo.sequence-alignment` | Sequence Alignment |
| 963 | biology | 18 | `bio.sys.systems-biology-intro` | Introduction to Systems Biology |
| 964 | computer_science | 18 | `cs.struct.binary-search-trees` | Binary Search Trees |
| 965 | computer_science | 18 | `cs.struct.heaps` | Heaps |
| 966 | computer_science | 18 | `cs.struct.graphs-representation` | Graphs and Their Representations |
| 967 | computer_science | 18 | `cs.oop.design-patterns-intro` | Introduction to Design Patterns |
| 968 | computer_science | 18 | `cs.db.sql-joins-subqueries` | SQL — Joins and Subqueries |
| 969 | computer_science | 18 | `cs.ds.data-visualisation` | Data Visualisation with Matplotlib |
| 970 | mathematics | 19 | `math.arith.percentage-calculations` | Percentage Calculations |
| 971 | mathematics | 19 | `math.arith.direct-variation` | Direct Variation |
| 972 | mathematics | 19 | `math.arith.inverse-variation` | Inverse Variation |
| 973 | mathematics | 19 | `math.arith.estimation` | Estimation |
| 974 | mathematics | 19 | `math.arith.significant-figures` | Significant Figures |
| 975 | mathematics | 19 | `math.nt.fundamental-theorem-arithmetic` | Fundamental Theorem of Arithmetic |
| 976 | mathematics | 19 | `math.nt.gcd` | Greatest Common Divisor |
| 977 | mathematics | 19 | `math.nt.residue-classes` | Residue Classes |
| 978 | mathematics | 19 | `math.nt.eulers-theorem` | Euler's Theorem |
| 979 | mathematics | 19 | `math.nt.eulers-totient` | Euler's Totient Function |
| 980 | mathematics | 19 | `math.nt.primality-testing` | Primality Testing |
| 981 | mathematics | 19 | `math.alg.coefficient` | Coefficient |
| 982 | mathematics | 19 | `math.alg.solution-set` | Solution Set |
| 983 | mathematics | 19 | `math.alg.degree` | Degree of a Polynomial |
| 984 | mathematics | 19 | `math.alg.zero-exponent` | Zero Exponent |
| 985 | mathematics | 19 | `math.alg.negative-exponent` | Negative Exponent |
| 986 | mathematics | 19 | `math.alg.radicals` | Radical Expressions |
| 987 | mathematics | 19 | `math.alg.exponential-function` | Exponential Function |
| 988 | mathematics | 19 | `math.alg.inequality` | Inequality |
| 989 | mathematics | 19 | `math.alg.binomial-theorem` | Binomial Theorem |
| 990 | mathematics | 19 | `math.trig.right-triangle-trig` | Right-Triangle Trigonometry |
| 991 | mathematics | 19 | `math.seq.divergence-test` | Divergence Test (nth Term Test) |
| 992 | mathematics | 19 | `math.seq.comparison-test` | Comparison Test |
| 993 | mathematics | 19 | `math.seq.ratio-test` | Ratio Test |
| 994 | mathematics | 19 | `math.seq.root-test` | Root Test |
| 995 | mathematics | 19 | `math.seq.alternating-series` | Alternating Series |
| 996 | mathematics | 19 | `math.seq.harmonic-series` | Harmonic Series |
| 997 | mathematics | 19 | `math.calc.differentiability` | Differentiability |
| 998 | mathematics | 19 | `math.calc.derivative-rules` | Basic Differentiation Rules |
| 999 | mathematics | 19 | `math.calc.lhopitals-rule` | L'Hôpital's Rule |
| 1000 | mathematics | 19 | `math.calc.mean-value-theorem` | Mean Value Theorem |
| 1001 | mathematics | 19 | `math.calc.linearization` | Linearization and Differentials |
| 1002 | mathematics | 19 | `math.calc.ftc-part1` | Fundamental Theorem of Calculus Part 1 |
| 1003 | mathematics | 19 | `math.calc.improper-integrals` | Improper Integrals |
| 1004 | mathematics | 19 | `math.calc.integral-area` | Area by Integration |
| 1005 | mathematics | 19 | `math.calc.power-series` | Power Series |
| 1006 | mathematics | 19 | `math.calc.multivariable-intro` | Introduction to Multivariable Calculus |
| 1007 | mathematics | 19 | `math.linalg.norm` | Vector Norm |
| 1008 | mathematics | 19 | `math.linalg.orthogonality` | Orthogonality |
| 1009 | mathematics | 19 | `math.linalg.cross-product` | Cross Product |
| 1010 | mathematics | 19 | `math.linalg.matrix-addition` | Matrix Addition |
| 1011 | mathematics | 19 | `math.linalg.matrix-multiplication` | Matrix Multiplication |
| 1012 | mathematics | 19 | `math.linalg.matrix-transpose` | Matrix Transpose |
| 1013 | mathematics | 19 | `math.linalg.vector-space` | Vector Space |
| 1014 | mathematics | 19 | `math.prob.continuous-rv` | Continuous Random Variable |
| 1015 | mathematics | 19 | `math.stats.measures-of-center` | Measures of Center |
| 1016 | mathematics | 19 | `math.stats.measures-of-spread` | Measures of Spread |
| 1017 | mathematics | 19 | `math.stats.data-visualization` | Data Visualization |
| 1018 | mathematics | 19 | `math.disc.derangements` | Derangements |
| 1019 | mathematics | 19 | `math.disc.recurrence-relation` | Recurrence Relation |
| 1020 | mathematics | 19 | `math.disc.graph-representation` | Graph Representation |
| 1021 | mathematics | 19 | `math.real.uniform-continuity` | Uniform Continuity |
| 1022 | mathematics | 19 | `math.real.extreme-value-theorem` | Extreme Value Theorem |
| 1023 | mathematics | 19 | `math.real.ivt` | Intermediate Value Theorem (Rigorous) |
| 1024 | mathematics | 19 | `math.real.differentiability-rigorous` | Differentiability (Rigorous) |
| 1025 | mathematics | 19 | `math.real.riemann-integral` | Riemann Integral (Rigorous) |
| 1026 | mathematics | 19 | `math.real.uniform-convergence` | Uniform Convergence |
| 1027 | mathematics | 19 | `math.real.baire-category` | Baire Category Theorem |
| 1028 | mathematics | 19 | `math.graph.extremal-graph-theory` | Extremal Graph Theory |
| 1029 | physics | 19 | `phys.qm.wkb-approximation` | WKB Approximation (Semiclassical Limit) |
| 1030 | physics | 19 | `phys.qm.s-matrix-basics` | S-Matrix and Scattering Amplitudes |
| 1031 | physics | 19 | `phys.astro.stellar-evolution` | Stellar Evolution and End States |
| 1032 | physics | 19 | `phys.astro.cosmology` | Big Bang Cosmology |
| 1033 | physics | 19 | `phys.particle.neutrinos` | Neutrinos |
| 1034 | physics | 19 | `phys.particle.hadron-quark-model` | Quark Model of Hadrons: Baryons and Mesons |
| 1035 | physics | 19 | `phys.particle.strong-interaction` | The Strong Interaction and Color Charge |
| 1036 | physics | 19 | `phys.mod.energy-bands` | Energy Bands in Solids |
| 1037 | english | 19 | `eng.grammar.sentence-combining` | Sentence Combining |
| 1038 | english | 19 | `eng.reading.evaluating-sources` | Evaluating Sources |
| 1039 | english | 19 | `eng.writing.topic-sentences` | Topic Sentences |
| 1040 | english | 19 | `eng.literature.plot-structure` | Plot Structure |
| 1041 | english | 19 | `eng.literature.character-development` | Character Development |
| 1042 | english | 19 | `eng.literature.setting-and-atmosphere` | Setting and Atmosphere |
| 1043 | english | 19 | `eng.literature.point-of-view` | Point of View |
| 1044 | english | 19 | `eng.literature.drama-basics` | Drama Basics |
| 1045 | chemistry | 19 | `chem.carb.alpha-reactions` | Alpha-Carbon Reactions |
| 1046 | chemistry | 19 | `chem.carb.derivatives` | Carboxylic Acid Derivatives |
| 1047 | chemistry | 19 | `chem.carb.spectro` | Spectroscopic ID of Carbonyls |
| 1048 | chemistry | 19 | `chem.nitro.amino-acids` | Amino Acids |
| 1049 | biology | 19 | `bio.bioinfo.phylogenetics-computational` | Computational Phylogenetics |
| 1050 | biology | 19 | `bio.bioinfo.structural-bioinformatics` | Structural Bioinformatics |
| 1051 | biology | 19 | `bio.sys.gene-regulatory-networks` | Gene Regulatory Networks |
| 1052 | biology | 19 | `bio.evo.molecular-evolution` | Molecular Evolution and Neutral Theory |
| 1053 | computer_science | 19 | `cs.struct.balanced-trees` | Balanced Search Trees |
| 1054 | computer_science | 19 | `cs.struct.graph-traversal` | Graph Traversal — BFS and DFS |
| 1055 | computer_science | 19 | `cs.db.transactions-acid` | Transactions and the ACID Properties |
| 1056 | computer_science | 19 | `cs.db.mysql-python` | Connecting Python to MySQL |
| 1057 | computer_science | 19 | `cs.se.agile-design-principles` | Agile Practices and Software Design Principles |
| 1058 | computer_science | 19 | `cs.ds.intro-machine-learning` | Introduction to Machine Learning |
| 1059 | mathematics | 20 | `math.arith.fraction-simplification` | Fraction Simplification |
| 1060 | mathematics | 20 | `math.arith.percentage-change` | Percentage Change |
| 1061 | mathematics | 20 | `math.nt.euclidean-algorithm` | Euclidean Algorithm |
| 1062 | mathematics | 20 | `math.nt.lcm` | Least Common Multiple |
| 1063 | mathematics | 20 | `math.nt.chinese-remainder-theorem` | Chinese Remainder Theorem |
| 1064 | mathematics | 20 | `math.alg.like-terms` | Like Terms |
| 1065 | mathematics | 20 | `math.alg.fractional-exponent` | Fractional Exponent |
| 1066 | mathematics | 20 | `math.alg.simplifying-radicals` | Simplifying Radical Expressions |
| 1067 | mathematics | 20 | `math.alg.radical-equations` | Radical Equations |
| 1068 | mathematics | 20 | `math.alg.exponential-equations` | Exponential Equations |
| 1069 | mathematics | 20 | `math.alg.logarithm` | Logarithm |
| 1070 | mathematics | 20 | `math.alg.pascals-triangle` | Pascal's Triangle |
| 1071 | mathematics | 20 | `math.geom.curvature` | Curvature |
| 1072 | mathematics | 20 | `math.trig.basic-ratios` | Six Trigonometric Ratios |
| 1073 | mathematics | 20 | `math.trig.unit-circle` | Unit Circle |
| 1074 | mathematics | 20 | `math.trig.law-of-sines` | Law of Sines |
| 1075 | mathematics | 20 | `math.trig.law-of-cosines` | Law of Cosines |
| 1076 | mathematics | 20 | `math.func.exponential-function` | Exponential Function |
| 1077 | mathematics | 20 | `math.seq.integral-test` | Integral Test |
| 1078 | mathematics | 20 | `math.seq.absolute-convergence` | Absolute and Conditional Convergence |
| 1079 | mathematics | 20 | `math.calc.product-rule` | Product Rule |
| 1080 | mathematics | 20 | `math.calc.chain-rule` | Chain Rule |
| 1081 | mathematics | 20 | `math.calc.higher-order-derivatives` | Higher-Order Derivatives |
| 1082 | mathematics | 20 | `math.calc.rolles-theorem` | Rolle's Theorem |
| 1083 | mathematics | 20 | `math.calc.increasing-decreasing` | Increasing and Decreasing Functions |
| 1084 | mathematics | 20 | `math.calc.critical-points` | Critical Points |
| 1085 | mathematics | 20 | `math.calc.antiderivatives` | Antiderivatives |
| 1086 | mathematics | 20 | `math.calc.volume-revolution` | Volumes of Revolution |
| 1087 | mathematics | 20 | `math.calc.arc-length` | Arc Length |
| 1088 | mathematics | 20 | `math.calc.radius-of-convergence` | Radius of Convergence |
| 1089 | mathematics | 20 | `math.calc.partial-derivatives` | Partial Derivatives |
| 1090 | mathematics | 20 | `math.calc.multiple-integrals` | Multiple Integrals |
| 1091 | mathematics | 20 | `math.linalg.unit-vector` | Unit Vector |
| 1092 | mathematics | 20 | `math.linalg.symmetric-matrix` | Symmetric Matrix |
| 1093 | mathematics | 20 | `math.linalg.determinant` | Determinant |
| 1094 | mathematics | 20 | `math.linalg.subspace` | Subspace |
| 1095 | mathematics | 20 | `math.linalg.linear-map` | Linear Map |
| 1096 | mathematics | 20 | `math.linalg.inner-product` | Inner Product |
| 1097 | mathematics | 20 | `math.linalg.distance` | Distance in Vector Spaces |
| 1098 | mathematics | 20 | `math.linalg.angle-vectors` | Angle Between Vectors |
| 1099 | mathematics | 20 | `math.prob.pdf` | Probability Density Function |
| 1100 | mathematics | 20 | `math.prob.generating-function` | Probability Generating Function |
| 1101 | mathematics | 20 | `math.prob.markov-chain` | Markov Chain |
| 1102 | mathematics | 20 | `math.stats.percentile` | Percentile |
| 1103 | mathematics | 20 | `math.disc.generating-functions` | Generating Functions |
| 1104 | mathematics | 20 | `math.disc.catalan-numbers` | Catalan Numbers |
| 1105 | mathematics | 20 | `math.disc.stirling-numbers` | Stirling Numbers |
| 1106 | mathematics | 20 | `math.real.lipschitz-continuity` | Lipschitz Continuity |
| 1107 | mathematics | 20 | `math.real.mvt` | Mean Value Theorem (Rigorous) |
| 1108 | mathematics | 20 | `math.real.riemann-integrability` | Riemann Integrability |
| 1109 | mathematics | 20 | `math.real.ftc-rigorous` | Fundamental Theorem of Calculus (Rigorous) |
| 1110 | mathematics | 20 | `math.real.weierstrass-approximation` | Weierstrass Approximation Theorem |
| 1111 | mathematics | 20 | `math.top.smooth-manifold` | Smooth Manifold |
| 1112 | mathematics | 20 | `math.fnal.normed-space` | Normed Space |
| 1113 | mathematics | 20 | `math.num.floating-point` | Floating-Point Arithmetic |
| 1114 | mathematics | 20 | `math.num.root-finding` | Root-Finding Methods |
| 1115 | mathematics | 20 | `math.opt.dynamic-programming` | Dynamic Programming |
| 1116 | physics | 20 | `phys.astro.dark-matter` | Dark Matter and Dark Energy |
| 1117 | physics | 20 | `phys.astro.black-holes` | Black Holes and Schwarzschild Radius |
| 1118 | physics | 20 | `phys.particle.weak-interaction` | The Weak Interaction |
| 1119 | physics | 20 | `phys.particle.conservation-laws` | Conservation Laws in Particle Interactions |
| 1120 | physics | 20 | `phys.mod.semiconductor-classification` | Conductors, Insulators, and Semiconductors |
| 1121 | english | 20 | `eng.reading.reading-across-genres` | Reading Across Genres |
| 1122 | english | 20 | `eng.writing.supporting-details` | Supporting Details |
| 1123 | english | 20 | `eng.literature.theme-and-message` | Theme and Message |
| 1124 | english | 20 | `eng.literature.foreshadowing-and-suspense` | Foreshadowing and Suspense |
| 1125 | english | 20 | `eng.literature.dramatic-structure` | Dramatic Structure |
| 1126 | english | 20 | `eng.literature.prose-fiction` | Prose Fiction |
| 1127 | english | 20 | `eng.linguistics.what-is-linguistics` | What Is Linguistics? |
| 1128 | english | 20 | `eng.communication.media-literacy` | Media Literacy |
| 1129 | chemistry | 20 | `chem.carb.named-reactions` | Named Carbonyl Reactions |
| 1130 | chemistry | 20 | `chem.bio.proteins` | Proteins |
| 1131 | chemistry | 20 | `chem.bio.lipids` | Lipids |
| 1132 | chemistry | 20 | `chem.poly.condensation` | Condensation Polymerization |
| 1133 | biology | 20 | `bio.sys.metabolic-network-modelling` | Metabolic Network Modelling |
| 1134 | computer_science | 20 | `cs.struct.shortest-path-algorithms` | Shortest Path Algorithms |
| 1135 | computer_science | 20 | `cs.db.indexing-query-optimisation` | Indexing and Query Optimisation |
| 1136 | computer_science | 20 | `cs.db.nosql-intro` | Introduction to NoSQL Databases |
| 1137 | computer_science | 20 | `cs.ds.supervised-learning-models` | Supervised Learning Models |
| 1138 | computer_science | 20 | `cs.ds.unsupervised-learning-models` | Unsupervised Learning Models |
| 1139 | mathematics | 21 | `math.arith.fraction-addition` | Addition and Subtraction of Fractions |
| 1140 | mathematics | 21 | `math.nt.extended-euclidean-algorithm` | Extended Euclidean Algorithm |
| 1141 | mathematics | 21 | `math.nt.continued-fractions` | Continued Fractions |
| 1142 | mathematics | 21 | `math.alg.simplification` | Algebraic Simplification |
| 1143 | mathematics | 21 | `math.alg.polynomial-operations` | Polynomial Operations |
| 1144 | mathematics | 21 | `math.alg.rationalizing-denominators` | Rationalizing the Denominator |
| 1145 | mathematics | 21 | `math.alg.logarithm-properties` | Logarithm Properties |
| 1146 | mathematics | 21 | `math.alg.natural-logarithm` | Natural Logarithm |
| 1147 | mathematics | 21 | `math.geom.frenet-serret` | Frenet-Serret Formulas |
| 1148 | mathematics | 21 | `math.geom.differential-geometry-surfaces` | Differential Geometry of Surfaces |
| 1149 | mathematics | 21 | `math.trig.special-angles` | Trigonometric Values at Special Angles |
| 1150 | mathematics | 21 | `math.trig.reference-angles` | Reference Angles |
| 1151 | mathematics | 21 | `math.trig.trig-functions` | Trigonometric Functions |
| 1152 | mathematics | 21 | `math.func.logarithmic-function` | Logarithmic Function |
| 1153 | mathematics | 21 | `math.calc.quotient-rule` | Quotient Rule |
| 1154 | mathematics | 21 | `math.calc.derivative-exponential` | Derivative of Exponential Functions |
| 1155 | mathematics | 21 | `math.calc.implicit-differentiation` | Implicit Differentiation |
| 1156 | mathematics | 21 | `math.calc.local-extrema` | Local Extrema |
| 1157 | mathematics | 21 | `math.calc.concavity` | Concavity and Inflection Points |
| 1158 | mathematics | 21 | `math.calc.ftc-part2` | Fundamental Theorem of Calculus Part 2 |
| 1159 | mathematics | 21 | `math.calc.surface-area-integral` | Surface Area of Revolution |
| 1160 | mathematics | 21 | `math.calc.taylor-series` | Taylor Series |
| 1161 | mathematics | 21 | `math.calc.parametric-calculus` | Calculus of Parametric Curves |
| 1162 | mathematics | 21 | `math.calc.gradient` | Gradient |
| 1163 | mathematics | 21 | `math.calc.chain-rule-multivariable` | Multivariable Chain Rule |
| 1164 | mathematics | 21 | `math.calc.double-integrals` | Double Integrals |
| 1165 | mathematics | 21 | `math.calc.change-of-variables` | Change of Variables (Jacobian) |
| 1166 | mathematics | 21 | `math.de.ode` | Ordinary Differential Equation |
| 1167 | mathematics | 21 | `math.linalg.matrix-inverse` | Matrix Inverse |
| 1168 | mathematics | 21 | `math.linalg.cofactor-expansion` | Cofactor Expansion |
| 1169 | mathematics | 21 | `math.linalg.det-properties` | Properties of Determinants |
| 1170 | mathematics | 21 | `math.linalg.span` | Span |
| 1171 | mathematics | 21 | `math.linalg.kernel-image` | Kernel and Image of Linear Map |
| 1172 | mathematics | 21 | `math.linalg.eigenvalues` | Eigenvalues and Eigenvectors |
| 1173 | mathematics | 21 | `math.linalg.inner-product-space` | Inner Product Space |
| 1174 | mathematics | 21 | `math.linalg.projection` | Orthogonal Projection |
| 1175 | mathematics | 21 | `math.linalg.tensor` | Tensor |
| 1176 | mathematics | 21 | `math.linalg.dual-space` | Dual Space |
| 1177 | mathematics | 21 | `math.prob.continuous-distributions` | Continuous Distributions |
| 1178 | mathematics | 21 | `math.prob.expected-value` | Expected Value |
| 1179 | mathematics | 21 | `math.prob.transition-matrix` | Transition Matrix |
| 1180 | mathematics | 21 | `math.disc.divide-conquer-recurrence` | Divide-and-Conquer Recurrence |
| 1181 | mathematics | 21 | `math.disc.ogf` | Ordinary Generating Function |
| 1182 | mathematics | 21 | `math.disc.egf` | Exponential Generating Function |
| 1183 | mathematics | 21 | `math.real.taylor-rigorous` | Taylor's Theorem (Rigorous) |
| 1184 | mathematics | 21 | `math.real.fixed-point-theorem` | Banach Fixed-Point Theorem |
| 1185 | mathematics | 21 | `math.fnal.completeness` | Completeness |
| 1186 | mathematics | 21 | `math.num.error-analysis` | Error Analysis |
| 1187 | mathematics | 21 | `math.num.newtons-method` | Newton's Method |
| 1188 | physics | 21 | `phys.astro.gravitational-waves` | Gravitational Waves |
| 1189 | physics | 21 | `phys.particle.electroweak-unification` | Electroweak Unification |
| 1190 | physics | 21 | `phys.particle.feynman-diagrams` | Feynman Diagrams (Qualitative) |
| 1191 | physics | 21 | `phys.particle.accelerators-detectors` | Particle Accelerators and Detectors |
| 1192 | physics | 21 | `phys.mod.intrinsic-semiconductors` | Intrinsic Semiconductors |
| 1193 | english | 21 | `eng.writing.transitions-and-cohesion` | Transitions and Cohesion |
| 1194 | english | 21 | `eng.literature.literary-devices-overview` | Overview of Literary Devices |
| 1195 | english | 21 | `eng.literature.prose-nonfiction` | Prose Nonfiction |
| 1196 | english | 21 | `eng.linguistics.phonology-intro` | Introduction to Phonology |
| 1197 | english | 21 | `eng.linguistics.morphology-intro` | Introduction to Morphology |
| 1198 | chemistry | 21 | `chem.bio.nucleic-acids` | Nucleic Acids |
| 1199 | chemistry | 21 | `chem.bio.vitamins` | Vitamins and Hormones |
| 1200 | chemistry | 21 | `chem.bio.enzyme-kinetics` | Enzyme Kinetics |
| 1201 | chemistry | 21 | `chem.poly.natural` | Natural Polymers |
| 1202 | chemistry | 21 | `chem.poly.properties` | Polymer Properties |
| 1203 | chemistry | 21 | `chem.poly.biodegradable` | Biodegradable and Functional Polymers |
| 1204 | biology | 21 | `bio.sys.synthetic-biology` | Synthetic Biology |
| 1205 | computer_science | 21 | `cs.struct.minimum-spanning-tree` | Minimum Spanning Trees |
| 1206 | computer_science | 21 | `cs.ds.neural-networks-intro` | Introduction to Neural Networks |
| 1207 | mathematics | 22 | `math.nt.bezout-identity` | Bézout's Identity |
| 1208 | mathematics | 22 | `math.nt.modular-inverse` | Modular Inverse |
| 1209 | mathematics | 22 | `math.alg.linear-equation-1var` | Linear Equation in One Variable |
| 1210 | mathematics | 22 | `math.alg.polynomial-division` | Polynomial Division |
| 1211 | mathematics | 22 | `math.alg.change-of-base` | Change of Base Formula |
| 1212 | mathematics | 22 | `math.alg.logarithmic-equations` | Logarithmic Equations |
| 1213 | mathematics | 22 | `math.geom.polar-coordinates` | Polar Coordinates |
| 1214 | mathematics | 22 | `math.geom.rotation` | Rotation |
| 1215 | mathematics | 22 | `math.geom.dot-product` | Dot Product |
| 1216 | mathematics | 22 | `math.trig.amplitude-period-phase` | Amplitude, Period, Phase Shift |
| 1217 | mathematics | 22 | `math.trig.trig-identities` | Trigonometric Identities |
| 1218 | mathematics | 22 | `math.trig.inverse-trig` | Inverse Trigonometric Functions |
| 1219 | mathematics | 22 | `math.trig.hyperbolic-functions` | Hyperbolic Functions |
| 1220 | mathematics | 22 | `math.calc.derivative-ln` | Derivative of Logarithmic Functions |
| 1221 | mathematics | 22 | `math.calc.derivative-trig` | Derivatives of Trigonometric Functions |
| 1222 | mathematics | 22 | `math.calc.related-rates` | Related Rates |
| 1223 | mathematics | 22 | `math.calc.optimization` | Optimization (Calculus) |
| 1224 | mathematics | 22 | `math.calc.curve-sketching` | Curve Sketching |
| 1225 | mathematics | 22 | `math.calc.u-substitution` | Integration by Substitution |
| 1226 | mathematics | 22 | `math.calc.maclaurin-series` | Maclaurin Series |
| 1227 | mathematics | 22 | `math.calc.taylor-remainder` | Taylor Remainder and Error Bound |
| 1228 | mathematics | 22 | `math.calc.directional-derivative` | Directional Derivative |
| 1229 | mathematics | 22 | `math.calc.multivariable-extrema` | Multivariable Extrema |
| 1230 | mathematics | 22 | `math.calc.triple-integrals` | Triple Integrals |
| 1231 | mathematics | 22 | `math.calc.surface-integrals` | Surface Integrals |
| 1232 | mathematics | 22 | `math.calc.vector-fields` | Vector Fields |
| 1233 | mathematics | 22 | `math.calc.greens-theorem` | Green's Theorem |
| 1234 | mathematics | 22 | `math.calc.fourier-series-intro` | Fourier Series (Introduction) |
| 1235 | mathematics | 22 | `math.de.ode-order` | Order of a Differential Equation |
| 1236 | mathematics | 22 | `math.de.ode-linearity` | Linearity of Differential Equations |
| 1237 | mathematics | 22 | `math.de.solution-types` | Types of Solutions |
| 1238 | mathematics | 22 | `math.de.pde` | Partial Differential Equation |
| 1239 | mathematics | 22 | `math.linalg.cramer-rule` | Cramer's Rule |
| 1240 | mathematics | 22 | `math.linalg.linear-independence` | Linear Independence |
| 1241 | mathematics | 22 | `math.linalg.column-space` | Column Space |
| 1242 | mathematics | 22 | `math.linalg.characteristic-polynomial` | Characteristic Polynomial |
| 1243 | mathematics | 22 | `math.linalg.least-squares` | Least Squares |
| 1244 | mathematics | 22 | `math.prob.normal-distribution` | Normal Distribution |
| 1245 | mathematics | 22 | `math.prob.linearity-expectation` | Linearity of Expectation |
| 1246 | mathematics | 22 | `math.prob.law-of-unconscious` | Law of the Unconscious Statistician |
| 1247 | mathematics | 22 | `math.prob.variance` | Variance |
| 1248 | mathematics | 22 | `math.prob.moments` | Moments |
| 1249 | mathematics | 22 | `math.prob.markov-inequality` | Markov's Inequality |
| 1250 | mathematics | 22 | `math.prob.stationary-distribution` | Stationary Distribution |
| 1251 | mathematics | 22 | `math.prob.poisson-process` | Poisson Process |
| 1252 | mathematics | 22 | `math.disc.algorithm-complexity` | Algorithm Complexity |
| 1253 | mathematics | 22 | `math.real.implicit-function-theorem` | Implicit Function Theorem |
| 1254 | mathematics | 22 | `math.real.inverse-function-theorem` | Inverse Function Theorem |
| 1255 | mathematics | 22 | `math.fnal.banach-space` | Banach Space |
| 1256 | mathematics | 22 | `math.num.numerical-differentiation` | Numerical Differentiation |
| 1257 | mathematics | 22 | `math.opt.unconstrained-optimization` | Unconstrained Optimization |
| 1258 | mathematics | 22 | `math.opt.convex-function` | Convex Function |
| 1259 | mathematics | 22 | `math.graph.algebraic-graph-theory` | Algebraic Graph Theory |
| 1260 | physics | 22 | `phys.particle.higgs-mechanism` | The Higgs Mechanism |
| 1261 | physics | 22 | `phys.mod.extrinsic-semiconductors` | Extrinsic Semiconductors: Doping and Carrier Types |
| 1262 | english | 22 | `eng.writing.narrative-writing` | Narrative Writing |
| 1263 | english | 22 | `eng.writing.descriptive-writing` | Descriptive Writing |
| 1264 | english | 22 | `eng.writing.expository-writing` | Expository Writing |
| 1265 | english | 22 | `eng.writing.persuasive-writing-basics` | Persuasive Writing Basics |
| 1266 | english | 22 | `eng.literature.metaphor-and-simile` | Metaphor and Simile |
| 1267 | english | 22 | `eng.literature.irony` | Irony |
| 1268 | english | 22 | `eng.literature.poetry-basics` | Poetry Basics |
| 1269 | english | 22 | `eng.linguistics.syntax-theory-intro` | Introduction to Syntactic Theory |
| 1270 | english | 22 | `eng.linguistics.historical-linguistics-intro` | Introduction to Historical Linguistics |
| 1271 | mathematics | 23 | `math.nt.linear-diophantine` | Linear Diophantine Equations |
| 1272 | mathematics | 23 | `math.nt.rsa-basics` | RSA Cryptography (Number-Theoretic Basis) |
| 1273 | mathematics | 23 | `math.alg.inequality-1var` | Linear Inequality in One Variable |
| 1274 | mathematics | 23 | `math.alg.absolute-value-equations` | Absolute Value Equations and Inequalities |
| 1275 | mathematics | 23 | `math.alg.linear-equation-2var` | Linear Equation in Two Variables |
| 1276 | mathematics | 23 | `math.alg.remainder-theorem` | Remainder Theorem |
| 1277 | mathematics | 23 | `math.geom.polar-curves` | Polar Curves |
| 1278 | mathematics | 23 | `math.trig.trig-graphs` | Graphs of Trigonometric Functions |
| 1279 | mathematics | 23 | `math.trig.pythagorean-identities` | Pythagorean Identities |
| 1280 | mathematics | 23 | `math.trig.reciprocal-identities` | Reciprocal Identities |
| 1281 | mathematics | 23 | `math.trig.sum-difference-formulas` | Sum and Difference Formulas |
| 1282 | mathematics | 23 | `math.trig.trig-equations` | Trigonometric Equations |
| 1283 | mathematics | 23 | `math.trig.polar-form-complex` | Polar Form of Complex Numbers |
| 1284 | mathematics | 23 | `math.calc.logarithmic-differentiation` | Logarithmic Differentiation |
| 1285 | mathematics | 23 | `math.calc.derivative-inverse-trig` | Derivatives of Inverse Trig Functions |
| 1286 | mathematics | 23 | `math.calc.hyperbolic-derivatives` | Derivatives of Hyperbolic Functions |
| 1287 | mathematics | 23 | `math.calc.integration-by-parts` | Integration by Parts |
| 1288 | mathematics | 23 | `math.calc.curl-divergence` | Curl and Divergence |
| 1289 | mathematics | 23 | `math.de.ivp` | Initial Value Problem |
| 1290 | mathematics | 23 | `math.de.first-order-ode` | First-Order ODE |
| 1291 | mathematics | 23 | `math.de.pde-classification` | Classification of Second-Order PDEs |
| 1292 | mathematics | 23 | `math.linalg.basis` | Basis |
| 1293 | mathematics | 23 | `math.prob.standard-normal` | Standard Normal Distribution |
| 1294 | mathematics | 23 | `math.prob.standard-deviation` | Standard Deviation |
| 1295 | mathematics | 23 | `math.prob.mgf` | Moment Generating Function |
| 1296 | mathematics | 23 | `math.prob.covariance` | Covariance |
| 1297 | mathematics | 23 | `math.prob.chebyshev` | Chebyshev's Inequality |
| 1298 | mathematics | 23 | `math.prob.ergodicity` | Ergodic Theorem (Markov Chains) |
| 1299 | mathematics | 23 | `math.stats.normal-distribution` | Normal Distribution (Statistics) |
| 1300 | mathematics | 23 | `math.disc.complexity-classes` | Complexity Classes |
| 1301 | mathematics | 23 | `math.fnal.hilbert-space` | Hilbert Space |
| 1302 | mathematics | 23 | `math.fnal.bounded-operator` | Bounded Linear Operator |
| 1303 | mathematics | 23 | `math.fnal.dense-subspace` | Dense Subspaces and Approximation |
| 1304 | mathematics | 23 | `math.opt.convex-optimization` | Convex Optimization |
| 1305 | mathematics | 23 | `math.opt.lagrange-multipliers` | Lagrange Multipliers |
| 1306 | mathematics | 23 | `math.opt.gradient-methods` | Gradient Descent |
| 1307 | physics | 23 | `phys.particle.standard-model` | The Standard Model |
| 1308 | physics | 23 | `phys.mod.pn-junction` | The p-n Junction |
| 1309 | english | 23 | `eng.writing.the-writing-process` | The Writing Process |
| 1310 | english | 23 | `eng.writing.creative-writing-forms` | Creative Writing Forms |
| 1311 | english | 23 | `eng.literature.symbolism` | Symbolism |
| 1312 | english | 23 | `eng.literature.imagery` | Imagery |
| 1313 | english | 23 | `eng.literature.poetic-forms` | Poetic Forms |
| 1314 | english | 23 | `eng.literature.literary-genres-overview` | Overview of Literary Genres |
| 1315 | english | 23 | `eng.linguistics.semantics-intro` | Introduction to Semantics |
| 1316 | english | 23 | `eng.linguistics.language-families` | Language Families |
| 1317 | english | 23 | `eng.linguistics.language-acquisition-intro` | Introduction to Language Acquisition |
| 1318 | mathematics | 24 | `math.nt.general-diophantine` | Diophantine Equations |
| 1319 | mathematics | 24 | `math.alg.inequality-2var` | Linear Inequality in Two Variables |
| 1320 | mathematics | 24 | `math.alg.system-linear-equations` | Systems of Linear Equations |
| 1321 | mathematics | 24 | `math.alg.factor-theorem` | Factor Theorem |
| 1322 | mathematics | 24 | `math.trig.double-angle-formulas` | Double Angle Formulas |
| 1323 | mathematics | 24 | `math.trig.product-to-sum` | Product-to-Sum and Sum-to-Product Formulas |
| 1324 | mathematics | 24 | `math.trig.de-moivres-theorem` | De Moivre's Theorem |
| 1325 | mathematics | 24 | `math.trig.eulers-formula` | Euler's Formula |
| 1326 | mathematics | 24 | `math.calc.reduction-formulas` | Reduction Formulas |
| 1327 | mathematics | 24 | `math.calc.stokes-theorem` | Stokes' Theorem |
| 1328 | mathematics | 24 | `math.calc.divergence-theorem` | Divergence Theorem |
| 1329 | mathematics | 24 | `math.de.existence-uniqueness` | Existence and Uniqueness Theorem |
| 1330 | mathematics | 24 | `math.de.separable` | Separable Differential Equation |
| 1331 | mathematics | 24 | `math.de.linear-first-order` | Linear First-Order ODE |
| 1332 | mathematics | 24 | `math.de.exact-ode` | Exact Differential Equation |
| 1333 | mathematics | 24 | `math.de.slope-field` | Slope Field |
| 1334 | mathematics | 24 | `math.de.euler-method` | Euler's Method |
| 1335 | mathematics | 24 | `math.de.second-order-ode` | Second-Order ODE |
| 1336 | mathematics | 24 | `math.linalg.dimension` | Dimension |
| 1337 | mathematics | 24 | `math.linalg.coordinates` | Coordinates |
| 1338 | mathematics | 24 | `math.linalg.matrix-representation` | Matrix Representation of Linear Map |
| 1339 | mathematics | 24 | `math.linalg.orthogonal-basis` | Orthogonal and Orthonormal Basis |
| 1340 | mathematics | 24 | `math.prob.correlation` | Correlation |
| 1341 | mathematics | 24 | `math.prob.lln` | Law of Large Numbers |
| 1342 | mathematics | 24 | `math.stats.covariance-matrix` | Covariance Matrix |
| 1343 | mathematics | 24 | `math.cx.complex-numbers-analysis` | Complex Numbers (Analysis) |
| 1344 | mathematics | 24 | `math.fnal.dual-space-functional` | Dual Space |
| 1345 | mathematics | 24 | `math.fnal.open-mapping-theorem` | Open Mapping Theorem |
| 1346 | mathematics | 24 | `math.fnal.uniform-boundedness` | Uniform Boundedness Principle |
| 1347 | mathematics | 24 | `math.fnal.riesz-representation` | Riesz Representation Theorem |
| 1348 | mathematics | 24 | `math.fnal.spectral-theory` | Spectral Theory |
| 1349 | mathematics | 24 | `math.fnal.fourier-transform` | Fourier Transform (Functional Analysis) |
| 1350 | mathematics | 24 | `math.opt.duality` | Duality Theory |
| 1351 | mathematics | 24 | `math.opt.stochastic-gradient` | Stochastic Gradient Descent |
| 1352 | mathematics | 24 | `math.opt.newton-optimization` | Newton's Method for Optimization |
| 1353 | physics | 24 | `phys.mod.diode-rectification` | Diode Rectifying Behavior |
| 1354 | english | 24 | `eng.writing.outlining-and-planning` | Outlining and Planning |
| 1355 | english | 24 | `eng.literature.meter-and-rhyme` | Meter and Rhyme |
| 1356 | english | 24 | `eng.literature.short-story-study` | Short Story Study |
| 1357 | english | 24 | `eng.literature.literary-periods-survey` | Survey of Literary Periods |
| 1358 | english | 24 | `eng.linguistics.pragmatics-intro` | Introduction to Pragmatics |
| 1359 | english | 24 | `eng.linguistics.psycholinguistics-intro` | Introduction to Psycholinguistics |
| 1360 | mathematics | 25 | `math.nt.pythagorean-triples` | Pythagorean Triples |
| 1361 | mathematics | 25 | `math.nt.pells-equation` | Pell's Equation |
| 1362 | mathematics | 25 | `math.nt.algebraic-number-theory` | Algebraic Number Theory |
| 1363 | mathematics | 25 | `math.nt.analytic-number-theory` | Analytic Number Theory |
| 1364 | mathematics | 25 | `math.alg.substitution-method` | Substitution Method |
| 1365 | mathematics | 25 | `math.alg.elimination-method` | Elimination Method |
| 1366 | mathematics | 25 | `math.alg.system-3var` | Systems of 3 Equations in 3 Variables |
| 1367 | mathematics | 25 | `math.alg.factoring` | Factoring Polynomials |
| 1368 | mathematics | 25 | `math.trig.half-angle-formulas` | Half Angle Formulas |
| 1369 | mathematics | 25 | `math.calc.trig-integrals` | Trigonometric Integrals |
| 1370 | mathematics | 25 | `math.de.bernoulli` | Bernoulli Equation |
| 1371 | mathematics | 25 | `math.de.homogeneous-ode` | Homogeneous First-Order ODE |
| 1372 | mathematics | 25 | `math.de.second-order-linear` | Second-Order Linear ODE |
| 1373 | mathematics | 25 | `math.de.laplace-transform` | Laplace Transform |
| 1374 | mathematics | 25 | `math.de.systems-ode` | Systems of ODEs |
| 1375 | mathematics | 25 | `math.de.bvp` | Boundary Value Problem |
| 1376 | mathematics | 25 | `math.linalg.linear-system` | System of Linear Equations |
| 1377 | mathematics | 25 | `math.linalg.change-of-basis` | Change of Basis |
| 1378 | mathematics | 25 | `math.linalg.spectral-theorem` | Spectral Theorem |
| 1379 | mathematics | 25 | `math.linalg.gram-schmidt` | Gram-Schmidt Process |
| 1380 | mathematics | 25 | `math.prob.clt` | Central Limit Theorem |
| 1381 | mathematics | 25 | `math.stats.correlation` | Sample Correlation |
| 1382 | mathematics | 25 | `math.cx.complex-function` | Complex-Valued Function |
| 1383 | mathematics | 25 | `math.fnal.hahn-banach` | Hahn-Banach Theorem |
| 1384 | mathematics | 25 | `math.fnal.closed-graph-theorem` | Closed Graph Theorem |
| 1385 | mathematics | 25 | `math.fnal.compact-operator-spectrum` | Compact Operators |
| 1386 | mathematics | 25 | `math.fnal.distributions` | Distributions |
| 1387 | mathematics | 25 | `math.num.euler-method` | Euler's Method (Numerical ODE) |
| 1388 | mathematics | 25 | `math.opt.kkt` | KKT Conditions |
| 1389 | english | 25 | `eng.writing.drafting` | Drafting |
| 1390 | english | 25 | `eng.literature.novel-study` | Novel Study |
| 1391 | english | 25 | `eng.literature.literary-criticism-intro` | Introduction to Literary Criticism |
| 1392 | english | 25 | `eng.linguistics.discourse-analysis-intro` | Introduction to Discourse Analysis |
| 1393 | english | 25 | `eng.linguistics.sociolinguistics-intro` | Introduction to Sociolinguistics |
| 1394 | mathematics | 26 | `math.nt.algebraic-integers` | Algebraic Integers |
| 1395 | mathematics | 26 | `math.alg.factoring-gcf` | Factoring out the GCF |
| 1396 | mathematics | 26 | `math.alg.factoring-special` | Special Factoring Patterns |
| 1397 | mathematics | 26 | `math.alg.rational-expressions` | Rational Expressions |
| 1398 | mathematics | 26 | `math.calc.trig-substitution` | Trigonometric Substitution |
| 1399 | mathematics | 26 | `math.de.second-order-homogeneous` | Homogeneous Second-Order Linear ODE |
| 1400 | mathematics | 26 | `math.de.laplace-properties` | Laplace Transform Properties |
| 1401 | mathematics | 26 | `math.de.convolution-theorem` | Convolution Theorem (Laplace) |
| 1402 | mathematics | 26 | `math.de.phase-plane` | Phase Plane Analysis |
| 1403 | mathematics | 26 | `math.de.series-solution` | Series Solution of ODEs |
| 1404 | mathematics | 26 | `math.de.sturm-liouville` | Sturm-Liouville Theory |
| 1405 | mathematics | 26 | `math.de.fourier-series` | Fourier Series |
| 1406 | mathematics | 26 | `math.linalg.augmented-matrix` | Augmented Matrix |
| 1407 | mathematics | 26 | `math.linalg.positive-definite` | Positive Definite Matrix |
| 1408 | mathematics | 26 | `math.linalg.qr-factorization` | QR Factorization |
| 1409 | mathematics | 26 | `math.stats.sampling-distribution` | Sampling Distribution |
| 1410 | mathematics | 26 | `math.stats.linear-regression` | Simple Linear Regression |
| 1411 | mathematics | 26 | `math.stats.normal-approximation` | Normal Approximation |
| 1412 | mathematics | 26 | `math.cx.cauchy-riemann` | Cauchy-Riemann Equations |
| 1413 | mathematics | 26 | `math.num.interpolation` | Polynomial Interpolation |
| 1414 | mathematics | 26 | `math.num.iterative-linear` | Iterative Methods for Linear Systems |
| 1415 | mathematics | 26 | `math.num.runge-kutta` | Runge-Kutta Methods |
| 1416 | mathematics | 26 | `math.opt.linear-programming` | Linear Programming |
| 1417 | english | 26 | `eng.writing.revising-for-content` | Revising for Content |
| 1418 | english | 26 | `eng.literature.comparative-literature-intro` | Introduction to Comparative Literature |
| 1419 | english | 26 | `eng.linguistics.applied-linguistics-intro` | Introduction to Applied Linguistics |
| 1420 | english | 26 | `eng.linguistics.dialectology` | Dialectology |
| 1421 | english | 26 | `eng.linguistics.corpus-linguistics-intro` | Introduction to Corpus Linguistics |
| 1422 | english | 26 | `eng.communication.discourse-markers-advanced` | Advanced Discourse Markers |
| 1423 | english | 26 | `eng.communication.cross-cultural-communication` | Cross-Cultural Communication |
| 1424 | mathematics | 27 | `math.nt.number-fields` | Number Fields |
| 1425 | mathematics | 27 | `math.alg.factoring-trinomials` | Factoring Trinomials |
| 1426 | mathematics | 27 | `math.alg.rational-expressions-addition` | Addition of Rational Expressions |
| 1427 | mathematics | 27 | `math.alg.rational-expressions-multiplication` | Multiplication of Rational Expressions |
| 1428 | mathematics | 27 | `math.alg.rational-equations` | Rational Equations |
| 1429 | mathematics | 27 | `math.de.wronskian` | Wronskian |
| 1430 | mathematics | 27 | `math.de.stability-analysis` | Stability Analysis |
| 1431 | mathematics | 27 | `math.de.frobenius-method` | Frobenius Method |
| 1432 | mathematics | 27 | `math.de.legendre-equation` | Legendre's Equation |
| 1433 | mathematics | 27 | `math.de.eigenfunction-expansion` | Eigenfunction Expansion |
| 1434 | mathematics | 27 | `math.de.fourier-convergence` | Convergence of Fourier Series |
| 1435 | mathematics | 27 | `math.de.fourier-sine-cosine` | Fourier Sine and Cosine Series |
| 1436 | mathematics | 27 | `math.de.fourier-transform` | Fourier Transform |
| 1437 | mathematics | 27 | `math.de.separation-of-variables-pde` | Separation of Variables (PDE) |
| 1438 | mathematics | 27 | `math.linalg.row-reduction` | Row Reduction |
| 1439 | mathematics | 27 | `math.linalg.svd` | Singular Value Decomposition |
| 1440 | mathematics | 27 | `math.stats.standard-error` | Standard Error |
| 1441 | mathematics | 27 | `math.stats.estimator` | Estimator |
| 1442 | mathematics | 27 | `math.stats.confidence-interval` | Confidence Interval |
| 1443 | mathematics | 27 | `math.stats.hypothesis-testing` | Hypothesis Testing |
| 1444 | mathematics | 27 | `math.stats.multiple-regression` | Multiple Linear Regression |
| 1445 | mathematics | 27 | `math.cx.analytic-functions` | Analytic (Holomorphic) Functions |
| 1446 | mathematics | 27 | `math.num.splines` | Spline Interpolation |
| 1447 | mathematics | 27 | `math.num.numerical-integration` | Numerical Integration |
| 1448 | mathematics | 27 | `math.num.qr-algorithm` | QR Algorithm |
| 1449 | mathematics | 27 | `math.num.stiff-ode` | Stiff ODEs and Implicit Methods |
| 1450 | mathematics | 27 | `math.opt.quadratic-programming` | Quadratic Programming |
| 1451 | mathematics | 27 | `math.opt.semidefinite-programming` | Semidefinite Programming |
| 1452 | mathematics | 27 | `math.opt.integer-programming` | Integer Programming |
| 1453 | english | 27 | `eng.writing.editing-and-proofreading` | Editing and Proofreading |
| 1454 | english | 27 | `eng.linguistics.bilingualism-and-multilingualism` | Bilingualism and Multilingualism |
| 1455 | english | 27 | `eng.linguistics.computational-linguistics-intro` | Introduction to Computational Linguistics |
| 1456 | mathematics | 28 | `math.alg.quadratic-equation` | Quadratic Equation |
| 1457 | mathematics | 28 | `math.de.variation-of-parameters` | Variation of Parameters |
| 1458 | mathematics | 28 | `math.de.bessel-equation` | Bessel's Equation |
| 1459 | mathematics | 28 | `math.de.heat-equation` | Heat Equation |
| 1460 | mathematics | 28 | `math.de.wave-equation` | Wave Equation |
| 1461 | mathematics | 28 | `math.de.laplace-equation` | Laplace's Equation |
| 1462 | mathematics | 28 | `math.de.nonlinear-ode` | Nonlinear ODE |
| 1463 | mathematics | 28 | `math.linalg.row-echelon` | Row Echelon Form |
| 1464 | mathematics | 28 | `math.linalg.lu-factorization` | LU Factorization |
| 1465 | mathematics | 28 | `math.linalg.singular-values` | Singular Values |
| 1466 | mathematics | 28 | `math.linalg.pseudoinverse` | Moore-Penrose Pseudoinverse |
| 1467 | mathematics | 28 | `math.prob.characteristic-function` | Characteristic Function |
| 1468 | mathematics | 28 | `math.stats.bias-variance` | Bias-Variance Tradeoff |
| 1469 | mathematics | 28 | `math.stats.consistency` | Consistency of Estimators |
| 1470 | mathematics | 28 | `math.stats.mle` | Maximum Likelihood Estimation |
| 1471 | mathematics | 28 | `math.stats.method-of-moments` | Method of Moments |
| 1472 | mathematics | 28 | `math.stats.ci-mean` | Confidence Interval for a Mean |
| 1473 | mathematics | 28 | `math.stats.ci-proportion` | Confidence Interval for a Proportion |
| 1474 | mathematics | 28 | `math.stats.test-statistic` | Test Statistic |
| 1475 | mathematics | 28 | `math.stats.type-errors` | Type I and Type II Errors |
| 1476 | mathematics | 28 | `math.stats.z-test` | z-Test |
| 1477 | mathematics | 28 | `math.stats.t-test` | t-Test |
| 1478 | mathematics | 28 | `math.stats.chi-squared-test` | Chi-Squared Test |
| 1479 | mathematics | 28 | `math.stats.anova` | Analysis of Variance |
| 1480 | mathematics | 28 | `math.stats.nonparametric` | Nonparametric Tests |
| 1481 | mathematics | 28 | `math.stats.sufficient-statistic` | Sufficient Statistic |
| 1482 | mathematics | 28 | `math.cx.power-series-cx` | Power Series in ℂ |
| 1483 | mathematics | 28 | `math.cx.complex-integration` | Complex Line Integral |
| 1484 | mathematics | 28 | `math.cx.singularities` | Singularities |
| 1485 | mathematics | 28 | `math.cx.conformal-mapping` | Conformal Mapping |
| 1486 | mathematics | 28 | `math.num.svd` | SVD (Numerical) |
| 1487 | mathematics | 28 | `math.opt.pca` | Principal Component Analysis |
| 1488 | english | 28 | `eng.writing.essay-structure` | Essay Structure |
| 1489 | english | 28 | `eng.linguistics.translation-studies-intro` | Introduction to Translation Studies |
| 1490 | mathematics | 29 | `math.nt.prime-number-theorem` | Prime Number Theorem |
| 1491 | mathematics | 29 | `math.alg.completing-the-square` | Completing the Square |
| 1492 | mathematics | 29 | `math.alg.polynomial-roots` | Polynomial Roots (Real and Complex) |
| 1493 | mathematics | 29 | `math.geom.conic-sections` | Conic Sections |
| 1494 | mathematics | 29 | `math.func.quadratic-function` | Quadratic Function |
| 1495 | mathematics | 29 | `math.de.harmonic-functions` | Harmonic Functions |
| 1496 | mathematics | 29 | `math.de.poisson-equation` | Poisson's Equation |
| 1497 | mathematics | 29 | `math.de.bifurcation` | Bifurcation Theory |
| 1498 | mathematics | 29 | `math.linalg.rank` | Rank |
| 1499 | mathematics | 29 | `math.linalg.null-space` | Null Space |
| 1500 | mathematics | 29 | `math.linalg.cholesky` | Cholesky Decomposition |
| 1501 | mathematics | 29 | `math.stats.p-value` | p-value |
| 1502 | mathematics | 29 | `math.stats.power` | Power of a Test |
| 1503 | mathematics | 29 | `math.stats.two-way-anova` | Two-Way ANOVA |
| 1504 | mathematics | 29 | `math.stats.bayesian-inference` | Bayesian Statistics |
| 1505 | mathematics | 29 | `math.stats.experimental-design` | Experimental Design |
| 1506 | mathematics | 29 | `math.stats.rao-blackwell` | Rao-Blackwell Theorem |
| 1507 | mathematics | 29 | `math.cx.harmonic-functions` | Harmonic Functions (Complex Analysis) |
| 1508 | mathematics | 29 | `math.cx.cauchy-theorem` | Cauchy's Theorem |
| 1509 | mathematics | 29 | `math.cx.identity-theorem` | Identity Theorem |
| 1510 | mathematics | 29 | `math.cx.poles` | Poles and Meromorphic Functions |
| 1511 | mathematics | 29 | `math.cx.essential-singularity` | Essential Singularity |
| 1512 | mathematics | 29 | `math.cx.laurent-series` | Laurent Series |
| 1513 | mathematics | 29 | `math.cx.mobius-transformation` | Möbius Transformation |
| 1514 | mathematics | 29 | `math.cx.riemann-mapping` | Riemann Mapping Theorem |
| 1515 | mathematics | 29 | `math.fnal.special-functions` | Special Functions |
| 1516 | mathematics | 29 | `math.num.lu-factorization` | LU Factorization (Numerical) |
| 1517 | english | 29 | `eng.writing.thesis-statements` | Thesis Statements |
| 1518 | english | 29 | `eng.composition.audience-and-purpose` | Audience and Purpose |
| 1519 | mathematics | 30 | `math.alg.quadratic-formula` | Quadratic Formula |
| 1520 | mathematics | 30 | `math.alg.rational-root-theorem` | Rational Root Theorem |
| 1521 | mathematics | 30 | `math.alg.fundamental-theorem-algebra` | Fundamental Theorem of Algebra |
| 1522 | mathematics | 30 | `math.alg.polynomial-inequality` | Polynomial Inequality |
| 1523 | mathematics | 30 | `math.alg.vietas-formulas` | Vieta's Formulas |
| 1524 | mathematics | 30 | `math.geom.parabola` | Parabola |
| 1525 | mathematics | 30 | `math.geom.ellipse` | Ellipse |
| 1526 | mathematics | 30 | `math.geom.hyperbola` | Hyperbola |
| 1527 | mathematics | 30 | `math.func.vertex-form` | Vertex Form of a Quadratic |
| 1528 | mathematics | 30 | `math.func.polynomial-function` | Polynomial Function |
| 1529 | mathematics | 30 | `math.calc.partial-fractions` | Partial Fraction Decomposition |
| 1530 | mathematics | 30 | `math.de.higher-order-ode` | Higher-Order Linear ODE |
| 1531 | mathematics | 30 | `math.de.greens-function` | Green's Function |
| 1532 | mathematics | 30 | `math.de.chaos` | Chaotic Dynamics |
| 1533 | mathematics | 30 | `math.linalg.rank-nullity` | Rank-Nullity Theorem |
| 1534 | mathematics | 30 | `math.linalg.eigenspace` | Eigenspace |
| 1535 | mathematics | 30 | `math.stats.conjugate-prior` | Conjugate Prior |
| 1536 | mathematics | 30 | `math.stats.credible-interval` | Credible Interval |
| 1537 | mathematics | 30 | `math.disc.linear-recurrence` | Linear Recurrence |
| 1538 | mathematics | 30 | `math.cx.cauchy-goursat` | Cauchy-Goursat Theorem |
| 1539 | mathematics | 30 | `math.cx.cauchy-integral-formula` | Cauchy Integral Formula |
| 1540 | mathematics | 30 | `math.cx.analytic-continuation` | Analytic Continuation |
| 1541 | mathematics | 30 | `math.cx.residue` | Residue |
| 1542 | mathematics | 30 | `math.num.cholesky` | Cholesky Factorization (Numerical) |
| 1543 | english | 30 | `eng.writing.citations-and-referencing` | Citations and Referencing |
| 1544 | english | 30 | `eng.composition.claim-evidence-reasoning` | Claim, Evidence, and Reasoning |
| 1545 | english | 30 | `eng.composition.rhetorical-appeals` | Rhetorical Appeals: Ethos, Pathos, Logos |
| 1546 | mathematics | 31 | `math.alg.discriminant` | Discriminant |
| 1547 | mathematics | 31 | `math.alg.complex-polynomial-roots` | Complex Roots of Polynomials |
| 1548 | mathematics | 31 | `math.alg.rational-inequality` | Rational Inequality |
| 1549 | mathematics | 31 | `math.func.end-behavior` | End Behavior |
| 1550 | mathematics | 31 | `math.func.rational-root` | Real Roots of Polynomials |
| 1551 | mathematics | 31 | `math.func.rational-function` | Rational Function |
| 1552 | mathematics | 31 | `math.de.char-equation` | Characteristic Equation |
| 1553 | mathematics | 31 | `math.de.inverse-laplace` | Inverse Laplace Transform |
| 1554 | mathematics | 31 | `math.linalg.diagonalization` | Diagonalization |
| 1555 | mathematics | 31 | `math.cx.higher-derivatives` | Derivatives of Holomorphic Functions |
| 1556 | mathematics | 31 | `math.cx.morera-theorem` | Morera's Theorem |
| 1557 | mathematics | 31 | `math.cx.residue-theorem` | Residue Theorem |
| 1558 | mathematics | 31 | `math.cx.maximum-modulus` | Maximum Modulus Principle |
| 1559 | mathematics | 31 | `math.cx.riemann-surface` | Riemann Surface |
| 1560 | mathematics | 31 | `math.cx.riemann-zeta` | Riemann Zeta Function |
| 1561 | english | 31 | `eng.composition.argumentation-basics` | Argumentation Basics |
| 1562 | english | 31 | `eng.composition.rhetorical-devices` | Rhetorical Devices |
| 1563 | mathematics | 32 | `math.nt.riemann-hypothesis` | Riemann Hypothesis |
| 1564 | mathematics | 32 | `math.func.vertical-asymptote` | Vertical Asymptote |
| 1565 | mathematics | 32 | `math.func.horizontal-asymptote` | Horizontal Asymptote |
| 1566 | mathematics | 32 | `math.de.undetermined-coefficients` | Method of Undetermined Coefficients |
| 1567 | mathematics | 32 | `math.de.laplace-ode` | Solving ODEs with Laplace Transform |
| 1568 | mathematics | 32 | `math.de.systems-matrix-method` | Matrix Method for Linear Systems |
| 1569 | mathematics | 32 | `math.linalg.matrix-exponential` | Matrix Exponential |
| 1570 | mathematics | 32 | `math.linalg.jordan-form` | Jordan Normal Form |
| 1571 | mathematics | 32 | `math.cx.liouville-theorem` | Liouville's Theorem |
| 1572 | mathematics | 32 | `math.cx.real-integral-residues` | Evaluating Real Integrals via Residues |
| 1573 | mathematics | 32 | `math.cx.argument-principle` | Argument Principle |
| 1574 | english | 32 | `eng.composition.counterargument-and-rebuttal` | Counterargument and Rebuttal |
| 1575 | english | 32 | `eng.composition.logical-fallacies` | Logical Fallacies |
| 1576 | english | 32 | `eng.composition.figurative-language-in-composition` | Figurative Language in Composition |
| 1577 | english | 32 | `eng.composition.rhetorical-analysis` | Rhetorical Analysis |
| 1578 | mathematics | 33 | `math.de.harmonic-oscillator` | Harmonic Oscillator |
| 1579 | mathematics | 33 | `math.cx.fundamental-theorem-algebra` | Fundamental Theorem of Algebra (Complex Analysis) |
| 1580 | mathematics | 33 | `math.cx.rouche-theorem` | Rouché's Theorem |
| 1581 | english | 33 | `eng.composition.style-voice-and-tone` | Style, Voice, and Tone |
| 1582 | english | 33 | `eng.composition.persuasive-techniques` | Advanced Persuasive Techniques |
| 1583 | english | 33 | `eng.composition.comparative-essay-writing` | Comparative Essay Writing |
| 1584 | english | 33 | `eng.composition.research-paper-writing` | Research Paper Writing |
| 1585 | mathematics | 34 | `math.de.resonance` | Resonance |
| 1586 | english | 34 | `eng.composition.academic-writing-conventions` | Academic Writing Conventions |
| 1587 | english | 35 | `eng.composition.plagiarism-and-citation-ethics` | Plagiarism and Citation Ethics |
| 1588 | english | 35 | `eng.composition.editing-for-style` | Editing for Style |
| 1589 | english | 35 | `eng.communication.academic-writing-advanced` | Advanced Academic Writing |
| 1590 | english | 36 | `eng.communication.research-methodology-writing` | Writing Research Methodology |
| 1591 | english | 36 | `eng.communication.technical-writing` | Technical Writing |
| 1592 | english | 36 | `eng.communication.business-writing` | Business Writing |
| 1593 | english | 37 | `eng.communication.professional-communication` | Professional Communication |
| 1594 | english | 37 | `eng.communication.presentation-design` | Presentation Design |
| 1595 | english | 37 | `eng.communication.editing-for-publication` | Editing for Publication |
| 1596 | english | 38 | `eng.communication.negotiation-language` | Negotiation Language |
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

Total queued: **1605** (= 1,775 KG concepts − 170 already `READY`).

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
| 396 | physics | 10 | `phys.mech.rotational-dynamics` | Rotational Dynamics |
| 397 | physics | 10 | `phys.mech.keplers-laws` | Kepler's Laws of Planetary Motion |
| 398 | physics | 10 | `phys.mech.satellites` | Artificial Satellites and Geostationary Orbits |
| 399 | physics | 10 | `phys.mech.viscosity` | Viscosity and Stokes' Law |
| 400 | physics | 10 | `phys.mech.generalized-coordinates` | Generalized Coordinates and Configuration Space |
| 401 | physics | 10 | `phys.therm.entropy` | Entropy and Disorder |
| 402 | physics | 10 | `phys.wave.forced-oscillations` | Forced Oscillations and Resonance |
| 403 | physics | 10 | `phys.mod.photons` | Photons and Quantization of Light |
| 404 | physics | 10 | `phys.rel.simultaneity` | Relativity of Simultaneity |
| 405 | english | 10 | `eng.phonetics.accents-and-dialects` | Accents and Dialects |
| 406 | english | 10 | `eng.vocab.context-clues` | Context Clues |
| 407 | english | 10 | `eng.vocab.synonyms-antonyms` | Synonyms and Antonyms |
| 408 | english | 10 | `eng.vocab.word-families` | Word Families |
| 409 | english | 10 | `eng.grammar.word-classes-overview` | Overview of Word Classes |
| 410 | english | 10 | `eng.listening.listening-for-gist` | Listening for Gist |
| 411 | english | 10 | `eng.listening.distinguishing-sounds-in-speech` | Distinguishing Sounds in Speech |
| 412 | english | 10 | `eng.speaking.pronunciation-in-conversation` | Pronunciation in Conversation |
| 413 | chemistry | 10 | `chem.period.periodic-properties` | Periodic Trends Overview |
| 414 | chemistry | 10 | `chem.bond.ionic-bonding` | Ionic Bonding |
| 415 | chemistry | 10 | `chem.bond.covalent-bonding` | Covalent Bonding |
| 416 | chemistry | 10 | `chem.equil.buffer` | Buffer Solutions |
| 417 | chemistry | 10 | `chem.equil.hydrolysis` | Salt Hydrolysis |
| 418 | chemistry | 10 | `chem.equil.titration` | Acid–Base Titrations |
| 419 | chemistry | 10 | `chem.redox.oxidation-state` | Oxidation State |
| 420 | biology | 10 | `bio.mol.translation-genetic-code` | Translation and the Genetic Code |
| 421 | biology | 10 | `bio.gen.gene-interactions` | Gene Interactions and Extensions of Mendelism |
| 422 | biology | 10 | `bio.repro.fertilisation-development` | Fertilisation and Embryonic Development |
| 423 | biology | 10 | `bio.immuno.antibody-structure-function` | Antibody Structure and Function |
| 424 | biology | 10 | `bio.div.plant-diversity-alternation-of-generations` | Plant Diversity and Alternation of Generations |
| 425 | biology | 10 | `bio.immuno.mhc-antigen-presentation` | MHC and Antigen Presentation |
| 426 | computer_science | 10 | `cs.prog.exception-handling` | Exception Handling |
| 427 | computer_science | 10 | `cs.control.nested-control-patterns` | Nested Control Flow Patterns |
| 428 | computer_science | 10 | `cs.data.strings` | Strings |
| 429 | mathematics | 11 | `math.found.proof-by-induction` | Mathematical Induction |
| 430 | mathematics | 11 | `math.found.well-ordering-principle` | Well-Ordering Principle |
| 431 | mathematics | 11 | `math.found.countable-set` | Countable Set |
| 432 | mathematics | 11 | `math.found.integers` | Integers |
| 433 | mathematics | 11 | `math.arith.counting` | Counting |
| 434 | mathematics | 11 | `math.func.inverse-functions` | Inverse Functions |
| 435 | mathematics | 11 | `math.seq.sequence` | Sequence |
| 436 | mathematics | 11 | `math.prob.bayesian-inference` | Bayesian Inference |
| 437 | mathematics | 11 | `math.prob.pmf` | Probability Mass Function |
| 438 | mathematics | 11 | `math.prob.quantile` | Quantile |
| 439 | mathematics | 11 | `math.prob.distribution` | Probability Distribution |
| 440 | mathematics | 11 | `math.abst.coset` | Coset |
| 441 | mathematics | 11 | `math.abst.group-isomorphism` | Group Isomorphism |
| 442 | mathematics | 11 | `math.abst.burnside-lemma` | Burnside's Lemma |
| 443 | mathematics | 11 | `math.abst.ideal` | Ideal |
| 444 | mathematics | 11 | `math.abst.ring-homomorphism` | Ring Homomorphism |
| 445 | mathematics | 11 | `math.abst.polynomial-ring` | Polynomial Ring |
| 446 | mathematics | 11 | `math.top.van-kampen` | Seifert-van Kampen Theorem |
| 447 | mathematics | 11 | `math.top.covering-space` | Covering Space |
| 448 | mathematics | 11 | `math.top.euler-characteristic` | Euler Characteristic |
| 449 | mathematics | 11 | `math.top.cohomology` | Cohomology |
| 450 | mathematics | 11 | `math.cat.functor-category` | Functor Category |
| 451 | mathematics | 11 | `math.cat.limits` | Limits and Colimits |
| 452 | mathematics | 11 | `math.cat.adjunction` | Adjunction |
| 453 | physics | 11 | `phys.mech.angular-momentum` | Angular Momentum |
| 454 | physics | 11 | `phys.mech.rolling-motion` | Rolling Without Slipping |
| 455 | physics | 11 | `phys.mech.euler-lagrange-equation` | The Euler-Lagrange Equation and Hamilton's Principle |
| 456 | physics | 11 | `phys.therm.carnot-cycle` | Carnot Cycle |
| 457 | physics | 11 | `phys.therm.third-law` | Third Law of Thermodynamics |
| 458 | physics | 11 | `phys.mod.compton-effect` | Compton Scattering |
| 459 | physics | 11 | `phys.mod.de-broglie` | de Broglie Hypothesis — Matter Waves |
| 460 | physics | 11 | `phys.mod.bohr-model` | Bohr Model of the Hydrogen Atom |
| 461 | physics | 11 | `phys.mod.x-rays` | X-Rays and Their Properties |
| 462 | physics | 11 | `phys.rel.time-dilation` | Time Dilation |
| 463 | physics | 11 | `phys.stat.probability-basics` | Probability Distributions in Physics |
| 464 | english | 11 | `eng.vocab.compound-words` | Compound Words |
| 465 | english | 11 | `eng.vocab.prefixes` | Prefixes |
| 466 | english | 11 | `eng.vocab.suffixes` | Suffixes |
| 467 | english | 11 | `eng.vocab.homonyms-homophones` | Homonyms and Homophones |
| 468 | english | 11 | `eng.vocab.connotation-denotation` | Connotation and Denotation |
| 469 | english | 11 | `eng.grammar.nouns` | Nouns |
| 470 | english | 11 | `eng.grammar.verbs` | Verbs |
| 471 | english | 11 | `eng.grammar.prepositions` | Prepositions |
| 472 | english | 11 | `eng.grammar.conjunctions` | Conjunctions |
| 473 | english | 11 | `eng.grammar.interjections` | Interjections |
| 474 | english | 11 | `eng.reading.print-to-meaning` | From Print to Meaning |
| 475 | english | 11 | `eng.listening.listening-for-detail` | Listening for Detail |
| 476 | english | 11 | `eng.speaking.conversation-skills` | Conversation Skills |
| 477 | chemistry | 11 | `chem.bond.vsepr` | VSEPR Theory |
| 478 | chemistry | 11 | `chem.bond.hybridization` | Hybridization |
| 479 | chemistry | 11 | `chem.bond.resonance` | Resonance Structures |
| 480 | chemistry | 11 | `chem.bond.bond-parameters` | Bond Parameters |
| 481 | chemistry | 11 | `chem.bond.coordinate-bond` | Coordinate and Dative Bonding |
| 482 | chemistry | 11 | `chem.redox.balancing` | Balancing Redox Equations |
| 483 | chemistry | 11 | `chem.solid.crystal-systems` | Crystal Systems |
| 484 | chemistry | 11 | `chem.sblock.alkali` | Alkali Metals |
| 485 | chemistry | 11 | `chem.pblock.group13` | Group 13 — Boron Family |
| 486 | chemistry | 11 | `chem.pblock.group14` | Group 14 — Carbon Family |
| 487 | chemistry | 11 | `chem.pblock.group15` | Group 15 — Nitrogen Family |
| 488 | chemistry | 11 | `chem.pblock.group16` | Group 16 — Oxygen Family |
| 489 | chemistry | 11 | `chem.pblock.group17` | Group 17 — Halogens |
| 490 | chemistry | 11 | `chem.pblock.group18` | Group 18 — Noble Gases |
| 491 | chemistry | 11 | `chem.dblock.general` | Transition Metals — General Properties |
| 492 | chemistry | 11 | `chem.org.iupac` | IUPAC Nomenclature |
| 493 | biology | 11 | `bio.mol.gene-regulation` | Regulation of Gene Expression |
| 494 | biology | 11 | `bio.gen.chromosomal-theory-linkage` | Chromosomal Theory and Linkage |
| 495 | biology | 11 | `bio.repro.reproductive-health` | Reproductive Health and Contraception |
| 496 | biology | 11 | `bio.dev.gametogenesis-fertilisation-dev` | Fundamentals of Animal Development |
| 497 | biology | 11 | `bio.immuno.vaccination-immunisation` | Vaccination and Immunisation |
| 498 | computer_science | 11 | `cs.data.lists` | Lists |
| 499 | computer_science | 11 | `cs.func.functions` | Functions |
| 500 | mathematics | 12 | `math.found.strong-induction` | Strong Induction |
| 501 | mathematics | 12 | `math.found.uncountable-set` | Uncountable Set |
| 502 | mathematics | 12 | `math.found.rational-numbers` | Rational Numbers |
| 503 | mathematics | 12 | `math.arith.counting-sequence` | Counting Sequence |
| 504 | mathematics | 12 | `math.arith.subitizing` | Subitizing |
| 505 | mathematics | 12 | `math.arith.place-value` | Place Value |
| 506 | mathematics | 12 | `math.arith.number-line` | Number Line |
| 507 | mathematics | 12 | `math.seq.arithmetic-sequence` | Arithmetic Sequence |
| 508 | mathematics | 12 | `math.seq.geometric-sequence` | Geometric Sequence |
| 509 | mathematics | 12 | `math.seq.recursive-sequences` | Recursive Sequences |
| 510 | mathematics | 12 | `math.seq.series` | Series |
| 511 | mathematics | 12 | `math.prob.discrete-distributions` | Discrete Distributions |
| 512 | mathematics | 12 | `math.prob.joint-distribution` | Joint Distribution |
| 513 | mathematics | 12 | `math.abst.lagrange-theorem` | Lagrange's Theorem |
| 514 | mathematics | 12 | `math.abst.normal-subgroup` | Normal Subgroup |
| 515 | mathematics | 12 | `math.abst.quotient-ring` | Quotient Ring |
| 516 | mathematics | 12 | `math.abst.prime-ideal` | Prime and Maximal Ideals |
| 517 | mathematics | 12 | `math.abst.euclidean-domain` | Euclidean Domain |
| 518 | mathematics | 12 | `math.cat.yoneda-lemma` | Yoneda Lemma |
| 519 | mathematics | 12 | `math.cat.equalizer` | Equalizer and Coequalizer |
| 520 | mathematics | 12 | `math.cat.pullback` | Pullback and Pushout |
| 521 | mathematics | 12 | `math.cat.monad` | Monad |
| 522 | mathematics | 12 | `math.cat.tensor-product` | Tensor Product (Categorical) |
| 523 | mathematics | 12 | `math.cat.topos` | Topos |
| 524 | physics | 12 | `phys.mech.conservation-of-angular-momentum` | Conservation of Angular Momentum |
| 525 | physics | 12 | `phys.mech.cyclic-coordinates-conservation-laws` | Cyclic Coordinates and Noether's Theorem |
| 526 | physics | 12 | `phys.mech.hamiltonian` | The Hamiltonian and Legendre Transform |
| 527 | physics | 12 | `phys.therm.refrigerators` | Refrigerators and Heat Pumps |
| 528 | physics | 12 | `phys.mod.wave-particle-duality` | Wave-Particle Duality |
| 529 | physics | 12 | `phys.mod.atomic-spectra` | Atomic Spectra and Energy Levels |
| 530 | physics | 12 | `phys.rel.length-contraction` | Length Contraction |
| 531 | physics | 12 | `phys.stat.boltzmann-factor` | Boltzmann Factor and Statistical Weight |
| 532 | english | 12 | `eng.vocab.roots-and-origins` | Greek and Latin Roots |
| 533 | english | 12 | `eng.vocab.multiple-meaning-words` | Multiple-Meaning Words |
| 534 | english | 12 | `eng.vocab.collocations` | Collocations |
| 535 | english | 12 | `eng.vocab.register-and-formality` | Register and Formality |
| 536 | english | 12 | `eng.grammar.pronouns` | Pronouns |
| 537 | english | 12 | `eng.grammar.adjectives` | Adjectives |
| 538 | english | 12 | `eng.grammar.articles-and-determiners` | Articles and Determiners |
| 539 | english | 12 | `eng.grammar.subject-and-predicate` | Subject and Predicate |
| 540 | english | 12 | `eng.grammar.present-tenses` | Present Tenses |
| 541 | english | 12 | `eng.reading.reading-fluency` | Reading Fluency |
| 542 | english | 12 | `eng.listening.following-instructions` | Following Spoken Instructions |
| 543 | english | 12 | `eng.listening.note-taking-while-listening` | Note-Taking While Listening |
| 544 | english | 12 | `eng.speaking.asking-and-answering-questions` | Asking and Answering Questions |
| 545 | english | 12 | `eng.speaking.storytelling-orally` | Oral Storytelling |
| 546 | english | 12 | `eng.speaking.non-verbal-communication` | Non-Verbal Communication |
| 547 | chemistry | 12 | `chem.bond.mo-theory` | Molecular Orbital Theory |
| 548 | chemistry | 12 | `chem.bond.polar-molecules` | Polarity and Dipole Moment |
| 549 | chemistry | 12 | `chem.thermo.bond-enthalpy` | Bond Enthalpy |
| 550 | chemistry | 12 | `chem.redox.disproportionation` | Disproportionation |
| 551 | chemistry | 12 | `chem.redox.activity-series` | Electrochemical Activity Series |
| 552 | chemistry | 12 | `chem.redox.titrations` | Redox Titrations |
| 553 | chemistry | 12 | `chem.solid.packing` | Close Packing and Efficiency |
| 554 | chemistry | 12 | `chem.solid.defects` | Crystal Defects |
| 555 | chemistry | 12 | `chem.solid.amorphous` | Amorphous Solids |
| 556 | chemistry | 12 | `chem.coord.werner` | Werner's Theory |
| 557 | chemistry | 12 | `chem.sblock.alkaline-earth` | Alkaline Earth Metals |
| 558 | chemistry | 12 | `chem.pblock.trends` | Trends Across p-Block |
| 559 | chemistry | 12 | `chem.dblock.first-row` | First-Row Transition Metals |
| 560 | chemistry | 12 | `chem.dblock.lanthanides` | Lanthanides and Actinides |
| 561 | chemistry | 12 | `chem.org.hybridization` | Carbon Hybridization |
| 562 | chemistry | 12 | `chem.org.purification` | Purification Techniques |
| 563 | chemistry | 12 | `chem.org.spectroscopy` | Introduction to Spectroscopy |
| 564 | biology | 12 | `bio.gen.pedigree-human-genetics` | Pedigree Analysis and Human Genetic Disorders |
| 565 | biology | 12 | `bio.gen.mutations` | Mutations |
| 566 | biology | 12 | `bio.dev.morphogenesis-differentiation` | Morphogenesis and Cell Differentiation |
| 567 | biology | 12 | `bio.immuno.immune-disorders` | Immune Disorders |
| 568 | biology | 12 | `bio.cell.apoptosis` | Apoptosis and Programmed Cell Death |
| 569 | biology | 12 | `bio.mol.epigenetics` | Epigenetics and Chromatin Regulation |
| 570 | biology | 12 | `bio.mol.noncoding-rna` | Non-coding RNA Biology |
| 571 | computer_science | 12 | `cs.data.tuples` | Tuples |
| 572 | computer_science | 12 | `cs.data.dictionaries` | Dictionaries |
| 573 | computer_science | 12 | `cs.func.scope-namespaces` | Scope and Namespaces |
| 574 | computer_science | 12 | `cs.file.text-files` | Text File Handling |
| 575 | computer_science | 12 | `cs.struct.linear-search` | Linear Search |
| 576 | computer_science | 12 | `cs.oop.oop-concepts` | Object-Oriented Programming Concepts |
| 577 | mathematics | 13 | `math.found.irrational-numbers` | Irrational Numbers |
| 578 | mathematics | 13 | `math.arith.ones-tens-hundreds` | Ones, Tens, Hundreds |
| 579 | mathematics | 13 | `math.arith.expanded-form` | Expanded Form |
| 580 | mathematics | 13 | `math.arith.number-base` | Number Base |
| 581 | mathematics | 13 | `math.arith.addition` | Addition |
| 582 | mathematics | 13 | `math.arith.ordering` | Ordering Numbers |
| 583 | mathematics | 13 | `math.seq.partial-sums` | Partial Sums |
| 584 | mathematics | 13 | `math.seq.arithmetic-series` | Arithmetic Series |
| 585 | mathematics | 13 | `math.seq.geometric-series` | Geometric Series |
| 586 | mathematics | 13 | `math.prob.marginal-distribution` | Marginal Distribution |
| 587 | mathematics | 13 | `math.prob.conditional-distribution` | Conditional Distribution |
| 588 | mathematics | 13 | `math.abst.quotient-group` | Quotient Group |
| 589 | mathematics | 13 | `math.abst.alternating-group` | Alternating Group |
| 590 | mathematics | 13 | `math.abst.pid` | Principal Ideal Domain |
| 591 | mathematics | 13 | `math.abst.field` | Field |
| 592 | mathematics | 13 | `math.cat.representable-functor` | Representable Functor |
| 593 | mathematics | 13 | `math.cat.higher-category` | Higher Category Theory |
| 594 | physics | 13 | `phys.mech.hamiltons-equations` | Hamilton's Equations of Motion |
| 595 | physics | 13 | `phys.mod.radioactivity` | Radioactivity: Alpha, Beta, Gamma Decay |
| 596 | physics | 13 | `phys.qm.wave-function` | Wave Function and Probability Interpretation |
| 597 | physics | 13 | `phys.rel.lorentz-transform` | Lorentz Transformations |
| 598 | physics | 13 | `phys.stat.partition-function` | Partition Function |
| 599 | physics | 13 | `phys.stat.maxwell-boltzmann` | Maxwell-Boltzmann Speed Distribution |
| 600 | english | 13 | `eng.vocab.word-formation-processes` | Word Formation Processes |
| 601 | english | 13 | `eng.vocab.idioms` | Idioms |
| 602 | english | 13 | `eng.vocab.phrasal-verbs` | Phrasal Verbs |
| 603 | english | 13 | `eng.vocab.etymology` | Etymology |
| 604 | english | 13 | `eng.vocab.thesaurus-and-dictionary-skills` | Thesaurus and Dictionary Skills |
| 605 | english | 13 | `eng.grammar.adverbs` | Adverbs |
| 606 | english | 13 | `eng.grammar.word-order` | Basic Word Order |
| 607 | english | 13 | `eng.grammar.past-tenses` | Past Tenses |
| 608 | english | 13 | `eng.grammar.future-tenses` | Future Tenses |
| 609 | english | 13 | `eng.grammar.modals` | Modal Verbs |
| 610 | english | 13 | `eng.grammar.gerunds-and-infinitives` | Gerunds and Infinitives |
| 611 | english | 13 | `eng.grammar.subject-verb-agreement` | Subject-Verb Agreement |
| 612 | english | 13 | `eng.reading.literal-comprehension` | Literal Comprehension |
| 613 | english | 13 | `eng.reading.skimming-and-scanning` | Skimming and Scanning |
| 614 | english | 13 | `eng.listening.listening-comprehension-strategies` | Listening Comprehension Strategies |
| 615 | english | 13 | `eng.speaking.discussion-skills` | Discussion Skills |
| 616 | english | 13 | `eng.communication.digital-communication` | Digital Communication |
| 617 | chemistry | 13 | `chem.bond.intermolecular` | Intermolecular Forces |
| 618 | chemistry | 13 | `chem.elect.galvanic-cell` | Galvanic Cell |
| 619 | chemistry | 13 | `chem.solid.ionic-solids` | Ionic Crystal Structures |
| 620 | chemistry | 13 | `chem.solid.properties` | Electrical and Magnetic Properties |
| 621 | chemistry | 13 | `chem.coord.nomenclature` | Nomenclature of Complexes |
| 622 | chemistry | 13 | `chem.coord.cft` | Crystal Field Theory |
| 623 | chemistry | 13 | `chem.coord.stability` | Stability Constants |
| 624 | chemistry | 13 | `chem.dblock.oxo-species` | Oxides and Oxyanions of Transition Metals |
| 625 | chemistry | 13 | `chem.org.isomerism` | Structural and Stereoisomerism |
| 626 | chemistry | 13 | `chem.org.electronic-effects` | Inductive and Mesomeric Effects |
| 627 | chemistry | 13 | `chem.org.qualitative-analysis` | Qualitative Organic Analysis |
| 628 | chemistry | 13 | `chem.org.aromaticity` | Aromaticity |
| 629 | chemistry | 13 | `chem.hyd.alkanes` | Alkanes |
| 630 | chemistry | 13 | `chem.anal.volumetric` | Volumetric Analysis |
| 631 | chemistry | 13 | `chem.anal.spectroscopy` | Spectroscopic Methods |
| 632 | biology | 13 | `bio.gen.population-genetics` | Population Genetics |
| 633 | biology | 13 | `bio.gen.genetic-engineering` | Genetic Engineering and Recombinant DNA |
| 634 | biology | 13 | `bio.dev.stem-cells-regeneration` | Stem Cells and Regeneration |
| 635 | biology | 13 | `bio.mol.dna-damage-repair` | DNA Damage Response and Repair |
| 636 | biology | 13 | `bio.gen.transposable-elements` | Transposable Elements and Genome Organisation |
| 637 | biology | 13 | `bio.evo.evo-devo` | Evolutionary Developmental Biology |
| 638 | computer_science | 13 | `cs.data.sets` | Sets |
| 639 | computer_science | 13 | `cs.func.recursion` | Recursion |
| 640 | computer_science | 13 | `cs.file.csv-files` | CSV File Handling |
| 641 | computer_science | 13 | `cs.file.binary-serialisation` | Binary Files and Serialisation |
| 642 | computer_science | 13 | `cs.struct.hashing-hash-tables` | Hashing and Hash Tables |
| 643 | computer_science | 13 | `cs.struct.binary-search` | Binary Search |
| 644 | computer_science | 13 | `cs.oop.classes-objects-python` | Classes and Objects in Python |
| 645 | computer_science | 13 | `cs.db.database-concepts` | Database Concepts |
| 646 | computer_science | 13 | `cs.se.sdlc` | Software Development Life Cycle |
| 647 | mathematics | 14 | `math.found.real-numbers` | Real Numbers |
| 648 | mathematics | 14 | `math.arith.carrying` | Carrying (Regrouping) |
| 649 | mathematics | 14 | `math.arith.mental-addition` | Mental Addition |
| 650 | mathematics | 14 | `math.arith.subtraction` | Subtraction |
| 651 | mathematics | 14 | `math.arith.multiplication` | Multiplication |
| 652 | mathematics | 14 | `math.seq.infinite-geometric-series` | Infinite Geometric Series |
| 653 | mathematics | 14 | `math.seq.telescoping-series` | Telescoping Series |
| 654 | mathematics | 14 | `math.prob.conditional-expectation` | Conditional Expectation |
| 655 | mathematics | 14 | `math.abst.first-isomorphism-theorem` | First Isomorphism Theorem |
| 656 | mathematics | 14 | `math.abst.ufd` | Unique Factorization Domain |
| 657 | mathematics | 14 | `math.abst.field-extension` | Field Extension |
| 658 | physics | 14 | `phys.mech.poisson-brackets` | Poisson Brackets and Phase Space Dynamics |
| 659 | physics | 14 | `phys.mod.radioactive-decay` | Radioactive Decay Law and Half-Life |
| 660 | physics | 14 | `phys.qm.schrodinger-equation` | Time-Dependent Schrödinger Equation |
| 661 | physics | 14 | `phys.qm.uncertainty-principle` | Heisenberg's Uncertainty Principle |
| 662 | physics | 14 | `phys.rel.relativistic-momentum` | Relativistic Momentum and Energy |
| 663 | physics | 14 | `phys.stat.bose-einstein` | Bose-Einstein Statistics |
| 664 | physics | 14 | `phys.stat.entropy-statistical` | Statistical Definition of Entropy |
| 665 | physics | 14 | `phys.stat.free-energy` | Helmholtz and Gibbs Free Energy |
| 666 | physics | 14 | `phys.stat.grand-canonical-ensemble` | Grand Canonical Ensemble |
| 667 | physics | 14 | `phys.stat.fluctuations-correlations` | Fluctuations, Response Functions, and Correlations |
| 668 | english | 14 | `eng.vocab.academic-vocabulary` | Academic Vocabulary |
| 669 | english | 14 | `eng.vocab.semantic-fields` | Semantic Fields |
| 670 | english | 14 | `eng.grammar.sentence-types-by-function` | Sentence Types by Function |
| 671 | english | 14 | `eng.grammar.phrases` | Phrases |
| 672 | english | 14 | `eng.grammar.tense-consistency` | Tense Consistency |
| 673 | english | 14 | `eng.grammar.conditionals` | Conditional Sentences |
| 674 | english | 14 | `eng.grammar.participles-and-participial-phrases` | Participles and Participial Phrases |
| 675 | english | 14 | `eng.grammar.pronoun-antecedent-agreement` | Pronoun-Antecedent Agreement |
| 676 | english | 14 | `eng.grammar.comparatives-and-superlatives` | Comparatives and Superlatives |
| 677 | english | 14 | `eng.reading.main-idea-and-details` | Main Idea and Supporting Details |
| 678 | english | 14 | `eng.listening.critical-listening` | Critical Listening |
| 679 | english | 14 | `eng.speaking.public-speaking-basics` | Public Speaking Basics |
| 680 | chemistry | 14 | `chem.state.liquids` | Liquid State Properties |
| 681 | chemistry | 14 | `chem.elect.standard-electrode` | Standard Electrode Potential |
| 682 | chemistry | 14 | `chem.elect.electrolysis` | Electrolysis and Faraday's Laws |
| 683 | chemistry | 14 | `chem.elect.batteries` | Batteries and Fuel Cells |
| 684 | chemistry | 14 | `chem.elect.corrosion` | Corrosion |
| 685 | chemistry | 14 | `chem.coord.isomerism` | Isomerism in Complexes |
| 686 | chemistry | 14 | `chem.coord.bonding` | Bonding in Complexes |
| 687 | chemistry | 14 | `chem.coord.applications` | Applications of Coordination Chemistry |
| 688 | chemistry | 14 | `chem.sblock.water` | Chemistry of Water |
| 689 | chemistry | 14 | `chem.dblock.organometallics` | Organometallic Chemistry |
| 690 | chemistry | 14 | `chem.org.reactive-intermediates` | Reactive Intermediates |
| 691 | chemistry | 14 | `chem.hyd.arenes` | Benzene and Arenes |
| 692 | chemistry | 14 | `chem.hyd.conformations` | Conformational Analysis |
| 693 | chemistry | 14 | `chem.hyd.petroleum` | Petroleum Refining |
| 694 | chemistry | 14 | `chem.hal.introduction` | Haloalkanes and Haloarenes |
| 695 | biology | 14 | `bio.evo.modern-synthesis-speciation` | Modern Synthesis and Speciation |
| 696 | biology | 14 | `bio.biotech.biotech-principles` | Principles of Biotechnology |
| 697 | computer_science | 14 | `cs.data.comprehensions-iterators` | Comprehensions, Iterators and Generators |
| 698 | computer_science | 14 | `cs.func.lambda-functional` | Lambda Expressions and Functional Tools |
| 699 | computer_science | 14 | `cs.struct.stacks` | Stacks |
| 700 | computer_science | 14 | `cs.struct.elementary-sorts` | Elementary Sorting — Bubble, Selection, Insertion |
| 701 | computer_science | 14 | `cs.oop.encapsulation-abstraction` | Encapsulation and Abstraction |
| 702 | computer_science | 14 | `cs.db.er-modeling` | Entity-Relationship Modeling |
| 703 | computer_science | 14 | `cs.se.version-control-git` | Version Control with Git |
| 704 | mathematics | 15 | `math.found.complex-numbers` | Complex Numbers |
| 705 | mathematics | 15 | `math.arith.column-addition` | Column Addition |
| 706 | mathematics | 15 | `math.arith.borrowing` | Borrowing (Regrouping in Subtraction) |
| 707 | mathematics | 15 | `math.arith.negative-numbers` | Negative Numbers |
| 708 | mathematics | 15 | `math.arith.multiplication-table` | Multiplication Table |
| 709 | mathematics | 15 | `math.arith.division` | Division |
| 710 | mathematics | 15 | `math.arith.exponentiation` | Exponentiation |
| 711 | mathematics | 15 | `math.geom.coordinate-plane` | Coordinate Plane |
| 712 | mathematics | 15 | `math.func.real-valued-function` | Real-Valued Function |
| 713 | mathematics | 15 | `math.prob.martingale` | Martingale |
| 714 | mathematics | 15 | `math.disc.counting-principles` | Counting Principles |
| 715 | mathematics | 15 | `math.abst.second-isomorphism-theorem` | Second and Third Isomorphism Theorems |
| 716 | mathematics | 15 | `math.abst.algebraic-extension` | Algebraic Extension |
| 717 | mathematics | 15 | `math.real.completeness` | Completeness of ℝ |
| 718 | mathematics | 15 | `math.real.metric-space` | Metric Space |
| 719 | physics | 15 | `phys.mech.canonical-transformations` | Canonical Transformations and Generating Functions |
| 720 | physics | 15 | `phys.mod.nuclear-reactions` | Nuclear Reactions and Q-Value |
| 721 | physics | 15 | `phys.qm.operators` | Quantum Operators and Observables |
| 722 | physics | 15 | `phys.qm.particle-in-box` | Particle in an Infinite Square Well |
| 723 | physics | 15 | `phys.qm.harmonic-oscillator-qm` | Quantum Harmonic Oscillator |
| 724 | physics | 15 | `phys.qm.quantum-tunneling` | Quantum Tunneling |
| 725 | physics | 15 | `phys.rel.mass-energy` | Mass-Energy Equivalence: E=mc² |
| 726 | physics | 15 | `phys.stat.chemical-potential` | Chemical Potential and Thermodynamic Equilibrium |
| 727 | physics | 15 | `phys.stat.phase-transitions` | Phase Transitions and Landau Mean-Field Theory |
| 728 | english | 15 | `eng.grammar.question-formation` | Question Formation |
| 729 | english | 15 | `eng.grammar.negation` | Negation |
| 730 | english | 15 | `eng.grammar.clauses` | Independent and Dependent Clauses |
| 731 | english | 15 | `eng.grammar.active-and-passive-voice` | Active and Passive Voice |
| 732 | english | 15 | `eng.grammar.direct-and-indirect-speech` | Direct and Indirect Speech |
| 733 | english | 15 | `eng.grammar.capitalization-rules` | Capitalization Rules |
| 734 | english | 15 | `eng.reading.inference-in-reading` | Inference in Reading |
| 735 | english | 15 | `eng.reading.summarizing` | Summarizing |
| 736 | english | 15 | `eng.reading.text-structure` | Text Structure |
| 737 | english | 15 | `eng.speaking.presentation-skills` | Presentation Skills |
| 738 | chemistry | 15 | `chem.state.phase-diagram` | Phase Diagrams |
| 739 | chemistry | 15 | `chem.sol.vapour-pressure` | Vapour Pressure of Solutions |
| 740 | chemistry | 15 | `chem.elect.nernst` | Nernst Equation |
| 741 | chemistry | 15 | `chem.elect.industrial` | Industrial Electrolysis |
| 742 | chemistry | 15 | `chem.surface.surfactants` | Surfactants and Micelles |
| 743 | chemistry | 15 | `chem.org.mechanisms` | Organic Reaction Mechanisms |
| 744 | chemistry | 15 | `chem.hyd.polycyclic` | Polycyclic and Heterocyclic Systems |
| 745 | chemistry | 15 | `chem.hal.sn1` | SN1 Mechanism |
| 746 | chemistry | 15 | `chem.hal.sn2` | SN2 Mechanism |
| 747 | chemistry | 15 | `chem.hal.haloarenes` | Haloarenes |
| 748 | chemistry | 15 | `chem.hal.cfcs` | Polyhalogen Compounds and CFCs |
| 749 | chemistry | 15 | `chem.nitro.nitro-compounds` | Nitro Compounds |
| 750 | biology | 15 | `bio.evo.human-evolution` | Human Evolution |
| 751 | biology | 15 | `bio.biotech.biotech-process-applications` | Biotechnology Process Applications |
| 752 | computer_science | 15 | `cs.func.modules-packages` | Modules and Packages |
| 753 | computer_science | 15 | `cs.struct.queues` | Queues |
| 754 | computer_science | 15 | `cs.struct.efficient-sorts` | Efficient Sorting — Merge Sort and Quick Sort |
| 755 | computer_science | 15 | `cs.oop.inheritance` | Inheritance |
| 756 | computer_science | 15 | `cs.db.relational-model` | The Relational Model |
| 757 | computer_science | 15 | `cs.se.software-testing` | Software Testing Fundamentals |
| 758 | mathematics | 16 | `math.arith.absolute-value` | Absolute Value |
| 759 | mathematics | 16 | `math.arith.integer-arithmetic` | Integer Arithmetic |
| 760 | mathematics | 16 | `math.arith.long-multiplication` | Long Multiplication |
| 761 | mathematics | 16 | `math.arith.mental-multiplication` | Mental Multiplication |
| 762 | mathematics | 16 | `math.arith.remainder` | Remainder |
| 763 | mathematics | 16 | `math.arith.divisor-dividend` | Divisor and Dividend |
| 764 | mathematics | 16 | `math.arith.order-of-operations` | Order of Operations |
| 765 | mathematics | 16 | `math.arith.exponent-rules` | Exponent Rules |
| 766 | mathematics | 16 | `math.arith.square-numbers` | Perfect Squares |
| 767 | mathematics | 16 | `math.arith.cube-numbers` | Perfect Cubes |
| 768 | mathematics | 16 | `math.nt.divisibility` | Divisibility |
| 769 | mathematics | 16 | `math.nt.division-algorithm` | Division Algorithm |
| 770 | mathematics | 16 | `math.geom.circle-equation` | Equation of a Circle |
| 771 | mathematics | 16 | `math.geom.x-y-coordinates` | Cartesian Coordinates |
| 772 | mathematics | 16 | `math.geom.quadrants` | Quadrants |
| 773 | mathematics | 16 | `math.geom.midpoint-formula` | Midpoint Formula |
| 774 | mathematics | 16 | `math.geom.slope` | Slope |
| 775 | mathematics | 16 | `math.geom.transformations` | Geometric Transformations |
| 776 | mathematics | 16 | `math.geom.vectors-2d` | Vectors in 2D |
| 777 | mathematics | 16 | `math.func.graph-of-function` | Graph of a Function |
| 778 | mathematics | 16 | `math.calc.limits` | Limit of a Function |
| 779 | mathematics | 16 | `math.calc.parametric-curves` | Parametric Equations and Curves |
| 780 | mathematics | 16 | `math.prob.classical-probability` | Classical Probability |
| 781 | mathematics | 16 | `math.disc.permutations` | Permutations |
| 782 | mathematics | 16 | `math.disc.pigeonhole` | Pigeonhole Principle |
| 783 | mathematics | 16 | `math.abst.galois-theory` | Galois Theory |
| 784 | mathematics | 16 | `math.real.sup-inf` | Supremum and Infimum |
| 785 | mathematics | 16 | `math.real.archimedean` | Archimedean Property |
| 786 | mathematics | 16 | `math.real.convergence-sequences` | Convergence of Sequences |
| 787 | mathematics | 16 | `math.real.open-sets` | Open and Closed Sets |
| 788 | physics | 16 | `phys.mech.hamilton-jacobi-equation` | Hamilton-Jacobi Equation and Action-Angle Variables |
| 789 | physics | 16 | `phys.mod.binding-energy` | Nuclear Binding Energy and Mass Defect |
| 790 | physics | 16 | `phys.qm.hydrogen-atom-qm` | Quantum Treatment of Hydrogen Atom |
| 791 | physics | 16 | `phys.qm.spin` | Electron Spin and the Stern-Gerlach Experiment |
| 792 | physics | 16 | `phys.rel.spacetime` | Spacetime Interval and Four-Vectors |
| 793 | physics | 16 | `phys.stat.ising-model` | Ising Model |
| 794 | physics | 16 | `phys.particle.four-forces` | Four Fundamental Forces |
| 795 | english | 16 | `eng.grammar.simple-sentences` | Simple Sentences |
| 796 | english | 16 | `eng.grammar.end-punctuation` | End Punctuation |
| 797 | english | 16 | `eng.reading.predicting-and-confirming` | Predicting and Confirming |
| 798 | english | 16 | `eng.reading.genre-recognition` | Genre Recognition |
| 799 | english | 16 | `eng.reading.authors-purpose-and-tone` | Author's Purpose and Tone |
| 800 | english | 16 | `eng.reading.compare-and-contrast-texts` | Comparing and Contrasting Texts |
| 801 | english | 16 | `eng.speaking.debate-skills` | Debate Skills |
| 802 | chemistry | 16 | `chem.sol.colligative` | Colligative Properties |
| 803 | chemistry | 16 | `chem.sol.activity` | Activity and Non-ideal Solutions |
| 804 | chemistry | 16 | `chem.elect.concentration-cell` | Concentration Cells |
| 805 | chemistry | 16 | `chem.org.arrow-pushing` | Electron Flow and Arrow Notation |
| 806 | chemistry | 16 | `chem.org.pericyclic` | Pericyclic Reactions |
| 807 | chemistry | 16 | `chem.hyd.alkenes` | Alkenes |
| 808 | chemistry | 16 | `chem.hal.elimination` | Elimination Reactions |
| 809 | chemistry | 16 | `chem.hal.grignard` | Grignard and Organolithium Reagents |
| 810 | chemistry | 16 | `chem.alc.alcohols` | Alcohols |
| 811 | biology | 16 | `bio.biotech.genomics-proteomics` | Genomics and Proteomics |
| 812 | computer_science | 16 | `cs.func.decorators` | Decorators |
| 813 | computer_science | 16 | `cs.struct.deques-priority-queues` | Deques and Priority Queues |
| 814 | computer_science | 16 | `cs.struct.linked-lists` | Singly Linked Lists |
| 815 | computer_science | 16 | `cs.oop.polymorphism-overloading` | Polymorphism and Operator Overloading |
| 816 | computer_science | 16 | `cs.db.normalisation` | Normalisation |
| 817 | computer_science | 16 | `cs.db.sql-ddl-dml` | SQL — DDL and DML Basics |
| 818 | computer_science | 16 | `cs.ds.numpy-arrays` | NumPy for Numerical Computing |
| 819 | mathematics | 17 | `math.arith.long-division` | Long Division |
| 820 | mathematics | 17 | `math.arith.fraction-equivalence` | Equivalent Fractions |
| 821 | mathematics | 17 | `math.arith.fraction-multiplication` | Multiplication and Division of Fractions |
| 822 | mathematics | 17 | `math.arith.fraction-reciprocal` | Reciprocal |
| 823 | mathematics | 17 | `math.arith.mixed-numbers` | Mixed Numbers |
| 824 | mathematics | 17 | `math.arith.improper-fractions` | Improper Fractions |
| 825 | mathematics | 17 | `math.arith.decimals` | Decimals |
| 826 | mathematics | 17 | `math.arith.ratios` | Ratio |
| 827 | mathematics | 17 | `math.arith.square-roots` | Square Roots |
| 828 | mathematics | 17 | `math.arith.mental-arithmetic` | Mental Arithmetic |
| 829 | mathematics | 17 | `math.nt.divisibility-rules` | Divisibility Rules |
| 830 | mathematics | 17 | `math.nt.prime-number` | Prime Number |
| 831 | mathematics | 17 | `math.nt.modular-arithmetic` | Modular Arithmetic |
| 832 | mathematics | 17 | `math.nt.induction-applications` | Induction in Number Theory |
| 833 | mathematics | 17 | `math.alg.expression` | Algebraic Expression |
| 834 | mathematics | 17 | `math.geom.pythagorean-theorem` | Pythagorean Theorem |
| 835 | mathematics | 17 | `math.geom.line-equation` | Equations of Lines |
| 836 | mathematics | 17 | `math.geom.translation` | Translation |
| 837 | mathematics | 17 | `math.geom.reflection` | Reflection |
| 838 | mathematics | 17 | `math.geom.vectors-3d` | Vectors in 3D |
| 839 | mathematics | 17 | `math.func.zero-of-function` | Zero of a Function |
| 840 | mathematics | 17 | `math.func.even-odd-functions` | Even and Odd Functions |
| 841 | mathematics | 17 | `math.func.transformations-functions` | Transformations of Functions |
| 842 | mathematics | 17 | `math.func.linear-function` | Linear Function |
| 843 | mathematics | 17 | `math.seq.convergent` | Convergent Sequence |
| 844 | mathematics | 17 | `math.calc.limit-laws` | Limit Laws |
| 845 | mathematics | 17 | `math.calc.one-sided-limits` | One-Sided Limits |
| 846 | mathematics | 17 | `math.calc.limits-at-infinity` | Limits at Infinity |
| 847 | mathematics | 17 | `math.calc.continuity` | Continuity |
| 848 | mathematics | 17 | `math.calc.derivative-intro` | Slope of Tangent and Rate of Change |
| 849 | mathematics | 17 | `math.calc.riemann-sums` | Riemann Sums |
| 850 | mathematics | 17 | `math.calc.sequence-limits` | Limits of Sequences (Calculus) |
| 851 | mathematics | 17 | `math.linalg.vector` | Vector |
| 852 | mathematics | 17 | `math.prob.convergence-types` | Modes of Convergence |
| 853 | mathematics | 17 | `math.stats.population-sample` | Population and Sample |
| 854 | mathematics | 17 | `math.disc.combinations` | Combinations |
| 855 | mathematics | 17 | `math.disc.asymptotic-notation` | Asymptotic Notation |
| 856 | mathematics | 17 | `math.abst.galois-group` | Galois Group |
| 857 | mathematics | 17 | `math.real.cauchy-sequence` | Cauchy Sequence |
| 858 | mathematics | 17 | `math.real.series-rigorous` | Series (Rigorous) |
| 859 | mathematics | 17 | `math.real.compactness` | Compactness |
| 860 | mathematics | 17 | `math.real.connectedness` | Connectedness |
| 861 | mathematics | 17 | `math.real.pointwise-convergence` | Pointwise Convergence |
| 862 | mathematics | 17 | `math.graph.ramsey-theory` | Ramsey Theory |
| 863 | physics | 17 | `phys.mod.nuclear-fission` | Nuclear Fission and Chain Reactions |
| 864 | physics | 17 | `phys.mod.nuclear-fusion` | Nuclear Fusion and Stellar Energy |
| 865 | physics | 17 | `phys.mod.nuclear-models` | Nuclear Models: Shell Model |
| 866 | physics | 17 | `phys.qm.pauli-exclusion` | Pauli Exclusion Principle |
| 867 | physics | 17 | `phys.qm.perturbation-theory` | Time-Independent Perturbation Theory |
| 868 | physics | 17 | `phys.qm.selection-rules` | Selection Rules and Transition Probabilities |
| 869 | physics | 17 | `phys.qm.angular-momentum-addition` | Addition of Angular Momenta and Clebsch-Gordan Coefficients |
| 870 | physics | 17 | `phys.qm.density-matrix` | Density Matrix and Mixed Quantum States |
| 871 | physics | 17 | `phys.stat.phase-transitions-critical-phenomena` | Critical Phenomena, Scaling Laws, and Universality |
| 872 | physics | 17 | `phys.stat.monte-carlo-basics` | Monte Carlo Methods in Statistical Physics |
| 873 | physics | 17 | `phys.particle.particle-classification` | Particle Classification: Hadrons and Leptons |
| 874 | physics | 17 | `phys.particle.gauge-bosons` | Gauge Bosons and Force Carriers |
| 875 | english | 17 | `eng.grammar.compound-sentences` | Compound Sentences |
| 876 | english | 17 | `eng.grammar.comma-usage` | Comma Usage |
| 877 | english | 17 | `eng.grammar.sentence-fragments` | Sentence Fragments |
| 878 | english | 17 | `eng.reading.close-reading` | Close Reading |
| 879 | english | 17 | `eng.writing.sentence-writing` | Sentence Writing |
| 880 | chemistry | 17 | `chem.sol.osmosis` | Osmosis and Osmotic Pressure |
| 881 | chemistry | 17 | `chem.hyd.alkynes` | Alkynes |
| 882 | chemistry | 17 | `chem.alc.phenols` | Phenols |
| 883 | chemistry | 17 | `chem.alc.ethers` | Ethers |
| 884 | chemistry | 17 | `chem.alc.diols` | Diols and Polyols |
| 885 | chemistry | 17 | `chem.carb.aldehydes` | Aldehydes |
| 886 | chemistry | 17 | `chem.nitro.amines` | Amines |
| 887 | chemistry | 17 | `chem.poly.addition` | Addition Polymerization |
| 888 | biology | 17 | `bio.biotech.crispr-genome-editing` | CRISPR and Genome Editing |
| 889 | biology | 17 | `bio.bioinfo.bioinformatics-intro` | Introduction to Bioinformatics |
| 890 | computer_science | 17 | `cs.struct.doubly-circular-lists` | Doubly and Circular Linked Lists |
| 891 | computer_science | 17 | `cs.struct.trees` | Trees |
| 892 | computer_science | 17 | `cs.oop.class-static-methods` | Class Methods and Static Methods |
| 893 | computer_science | 17 | `cs.db.sql-queries-functions` | SQL — Queries and Aggregate Functions |
| 894 | computer_science | 17 | `cs.ds.pandas-dataframes` | Pandas for Data Analysis |
| 895 | mathematics | 18 | `math.arith.decimal-operations` | Decimal Operations |
| 896 | mathematics | 18 | `math.arith.terminating-decimals` | Terminating Decimals |
| 897 | mathematics | 18 | `math.arith.repeating-decimals` | Repeating Decimals |
| 898 | mathematics | 18 | `math.arith.percentages` | Percentages |
| 899 | mathematics | 18 | `math.arith.proportion` | Proportion |
| 900 | mathematics | 18 | `math.arith.unit-rate` | Unit Rate |
| 901 | mathematics | 18 | `math.arith.rounding` | Rounding |
| 902 | mathematics | 18 | `math.arith.irrational-roots` | Irrational Square Roots |
| 903 | mathematics | 18 | `math.arith.scientific-notation` | Scientific Notation |
| 904 | mathematics | 18 | `math.nt.composite-number` | Composite Number |
| 905 | mathematics | 18 | `math.nt.sieve-of-eratosthenes` | Sieve of Eratosthenes |
| 906 | mathematics | 18 | `math.nt.prime-factorization` | Prime Factorization |
| 907 | mathematics | 18 | `math.nt.congruence` | Congruence |
| 908 | mathematics | 18 | `math.nt.fermats-little-theorem` | Fermat's Little Theorem |
| 909 | mathematics | 18 | `math.nt.prime-distribution` | Distribution of Primes |
| 910 | mathematics | 18 | `math.alg.term` | Term |
| 911 | mathematics | 18 | `math.alg.equation` | Equation |
| 912 | mathematics | 18 | `math.alg.polynomial` | Polynomial |
| 913 | mathematics | 18 | `math.alg.exponent-rules` | Exponent Rules (Algebraic) |
| 914 | mathematics | 18 | `math.geom.pythagorean-converse` | Converse of the Pythagorean Theorem |
| 915 | mathematics | 18 | `math.geom.similar-triangles` | Similar Triangles |
| 916 | mathematics | 18 | `math.geom.distance-formula` | Distance Formula |
| 917 | mathematics | 18 | `math.geom.dilation` | Dilation |
| 918 | mathematics | 18 | `math.geom.cross-product` | Cross Product |
| 919 | mathematics | 18 | `math.geom.differential-geometry-curves` | Curves in Space |
| 920 | mathematics | 18 | `math.seq.divergent-sequence` | Divergent Sequence |
| 921 | mathematics | 18 | `math.seq.series-convergence` | Convergence of Series |
| 922 | mathematics | 18 | `math.calc.squeeze-theorem` | Squeeze Theorem |
| 923 | mathematics | 18 | `math.calc.continuity-types` | Types of Discontinuity |
| 924 | mathematics | 18 | `math.calc.ivt` | Intermediate Value Theorem |
| 925 | mathematics | 18 | `math.calc.derivative-definition` | Derivative (Definition) |
| 926 | mathematics | 18 | `math.calc.definite-integral` | Definite Integral |
| 927 | mathematics | 18 | `math.calc.line-integrals` | Line Integrals |
| 928 | mathematics | 18 | `math.linalg.vector-addition` | Vector Addition |
| 929 | mathematics | 18 | `math.linalg.scalar-multiplication` | Scalar Multiplication |
| 930 | mathematics | 18 | `math.linalg.dot-product` | Dot Product |
| 931 | mathematics | 18 | `math.linalg.matrix` | Matrix |
| 932 | mathematics | 18 | `math.prob.combinatorial-probability` | Combinatorial Probability |
| 933 | mathematics | 18 | `math.stats.descriptive-statistics` | Descriptive Statistics |
| 934 | mathematics | 18 | `math.stats.sampling` | Sampling Methods |
| 935 | mathematics | 18 | `math.disc.binomial-theorem` | Binomial Theorem |
| 936 | mathematics | 18 | `math.disc.combinatorics` | Combinatorics |
| 937 | mathematics | 18 | `math.disc.stars-bars` | Stars and Bars |
| 938 | mathematics | 18 | `math.disc.inclusion-exclusion` | Inclusion-Exclusion Principle |
| 939 | mathematics | 18 | `math.abst.sylow-theorems` | Sylow Theorems |
| 940 | mathematics | 18 | `math.abst.finite-field` | Finite Field |
| 941 | mathematics | 18 | `math.abst.galois-correspondence` | Fundamental Theorem of Galois Theory |
| 942 | mathematics | 18 | `math.real.absolute-convergence` | Absolute Convergence |
| 943 | mathematics | 18 | `math.real.completeness-metric` | Completeness of Metric Spaces |
| 944 | mathematics | 18 | `math.real.continuity-rigorous` | Continuity (ε-δ) |
| 945 | mathematics | 18 | `math.opt.convex-set` | Convex Set |
| 946 | mathematics | 18 | `math.graph.shortest-path` | Shortest Path Algorithms |
| 947 | physics | 18 | `phys.qm.variational-method` | Variational Method and Variational Principle |
| 948 | physics | 18 | `phys.qm.identical-particles` | Identical Particles and the Symmetrization Postulate |
| 949 | physics | 18 | `phys.qm.scattering-theory-born-approximation` | Scattering Theory and the Born Approximation |
| 950 | physics | 18 | `phys.stat.fermi-dirac` | Fermi-Dirac Statistics |
| 951 | physics | 18 | `phys.astro.stellar-structure` | Stellar Structure and the Main Sequence |
| 952 | physics | 18 | `phys.particle.antimatter` | Antimatter and Antiparticles |
| 953 | physics | 18 | `phys.particle.quarks` | Quarks |
| 954 | physics | 18 | `phys.particle.leptons` | Leptons |
| 955 | english | 18 | `eng.grammar.complex-sentences` | Complex Sentences |
| 956 | english | 18 | `eng.grammar.parallel-structure` | Parallel Structure |
| 957 | english | 18 | `eng.grammar.apostrophes` | Apostrophes |
| 958 | english | 18 | `eng.grammar.quotation-marks` | Quotation Marks |
| 959 | english | 18 | `eng.grammar.colons-semicolons-dashes` | Colons, Semicolons, and Dashes |
| 960 | english | 18 | `eng.grammar.run-on-sentences-and-comma-splices` | Run-On Sentences and Comma Splices |
| 961 | english | 18 | `eng.reading.critical-reading` | Critical Reading |
| 962 | english | 18 | `eng.writing.paragraph-structure` | Paragraph Structure |
| 963 | english | 18 | `eng.literature.narrative-elements` | Narrative Elements |
| 964 | chemistry | 18 | `chem.alc.epoxides` | Epoxides |
| 965 | chemistry | 18 | `chem.alc.protection` | Protecting Group Strategy |
| 966 | chemistry | 18 | `chem.carb.ketones` | Ketones |
| 967 | chemistry | 18 | `chem.carb.carboxylic` | Carboxylic Acids |
| 968 | chemistry | 18 | `chem.nitro.diazonium` | Diazonium Salts |
| 969 | chemistry | 18 | `chem.nitro.heterocycles` | Nitrogen Heterocycles |
| 970 | chemistry | 18 | `chem.bio.carbohydrates` | Carbohydrates |
| 971 | biology | 18 | `bio.bioinfo.sequence-alignment` | Sequence Alignment |
| 972 | biology | 18 | `bio.sys.systems-biology-intro` | Introduction to Systems Biology |
| 973 | computer_science | 18 | `cs.struct.binary-search-trees` | Binary Search Trees |
| 974 | computer_science | 18 | `cs.struct.heaps` | Heaps |
| 975 | computer_science | 18 | `cs.struct.graphs-representation` | Graphs and Their Representations |
| 976 | computer_science | 18 | `cs.oop.design-patterns-intro` | Introduction to Design Patterns |
| 977 | computer_science | 18 | `cs.db.sql-joins-subqueries` | SQL — Joins and Subqueries |
| 978 | computer_science | 18 | `cs.ds.data-visualisation` | Data Visualisation with Matplotlib |
| 979 | mathematics | 19 | `math.arith.percentage-calculations` | Percentage Calculations |
| 980 | mathematics | 19 | `math.arith.direct-variation` | Direct Variation |
| 981 | mathematics | 19 | `math.arith.inverse-variation` | Inverse Variation |
| 982 | mathematics | 19 | `math.arith.estimation` | Estimation |
| 983 | mathematics | 19 | `math.arith.significant-figures` | Significant Figures |
| 984 | mathematics | 19 | `math.nt.fundamental-theorem-arithmetic` | Fundamental Theorem of Arithmetic |
| 985 | mathematics | 19 | `math.nt.gcd` | Greatest Common Divisor |
| 986 | mathematics | 19 | `math.nt.residue-classes` | Residue Classes |
| 987 | mathematics | 19 | `math.nt.eulers-theorem` | Euler's Theorem |
| 988 | mathematics | 19 | `math.nt.eulers-totient` | Euler's Totient Function |
| 989 | mathematics | 19 | `math.nt.primality-testing` | Primality Testing |
| 990 | mathematics | 19 | `math.alg.coefficient` | Coefficient |
| 991 | mathematics | 19 | `math.alg.solution-set` | Solution Set |
| 992 | mathematics | 19 | `math.alg.degree` | Degree of a Polynomial |
| 993 | mathematics | 19 | `math.alg.zero-exponent` | Zero Exponent |
| 994 | mathematics | 19 | `math.alg.negative-exponent` | Negative Exponent |
| 995 | mathematics | 19 | `math.alg.radicals` | Radical Expressions |
| 996 | mathematics | 19 | `math.alg.exponential-function` | Exponential Function |
| 997 | mathematics | 19 | `math.alg.inequality` | Inequality |
| 998 | mathematics | 19 | `math.alg.binomial-theorem` | Binomial Theorem |
| 999 | mathematics | 19 | `math.trig.right-triangle-trig` | Right-Triangle Trigonometry |
| 1000 | mathematics | 19 | `math.seq.divergence-test` | Divergence Test (nth Term Test) |
| 1001 | mathematics | 19 | `math.seq.comparison-test` | Comparison Test |
| 1002 | mathematics | 19 | `math.seq.ratio-test` | Ratio Test |
| 1003 | mathematics | 19 | `math.seq.root-test` | Root Test |
| 1004 | mathematics | 19 | `math.seq.alternating-series` | Alternating Series |
| 1005 | mathematics | 19 | `math.seq.harmonic-series` | Harmonic Series |
| 1006 | mathematics | 19 | `math.calc.differentiability` | Differentiability |
| 1007 | mathematics | 19 | `math.calc.derivative-rules` | Basic Differentiation Rules |
| 1008 | mathematics | 19 | `math.calc.lhopitals-rule` | L'Hôpital's Rule |
| 1009 | mathematics | 19 | `math.calc.mean-value-theorem` | Mean Value Theorem |
| 1010 | mathematics | 19 | `math.calc.linearization` | Linearization and Differentials |
| 1011 | mathematics | 19 | `math.calc.ftc-part1` | Fundamental Theorem of Calculus Part 1 |
| 1012 | mathematics | 19 | `math.calc.improper-integrals` | Improper Integrals |
| 1013 | mathematics | 19 | `math.calc.integral-area` | Area by Integration |
| 1014 | mathematics | 19 | `math.calc.power-series` | Power Series |
| 1015 | mathematics | 19 | `math.calc.multivariable-intro` | Introduction to Multivariable Calculus |
| 1016 | mathematics | 19 | `math.linalg.norm` | Vector Norm |
| 1017 | mathematics | 19 | `math.linalg.orthogonality` | Orthogonality |
| 1018 | mathematics | 19 | `math.linalg.cross-product` | Cross Product |
| 1019 | mathematics | 19 | `math.linalg.matrix-addition` | Matrix Addition |
| 1020 | mathematics | 19 | `math.linalg.matrix-multiplication` | Matrix Multiplication |
| 1021 | mathematics | 19 | `math.linalg.matrix-transpose` | Matrix Transpose |
| 1022 | mathematics | 19 | `math.linalg.vector-space` | Vector Space |
| 1023 | mathematics | 19 | `math.prob.continuous-rv` | Continuous Random Variable |
| 1024 | mathematics | 19 | `math.stats.measures-of-center` | Measures of Center |
| 1025 | mathematics | 19 | `math.stats.measures-of-spread` | Measures of Spread |
| 1026 | mathematics | 19 | `math.stats.data-visualization` | Data Visualization |
| 1027 | mathematics | 19 | `math.disc.derangements` | Derangements |
| 1028 | mathematics | 19 | `math.disc.recurrence-relation` | Recurrence Relation |
| 1029 | mathematics | 19 | `math.disc.graph-representation` | Graph Representation |
| 1030 | mathematics | 19 | `math.real.uniform-continuity` | Uniform Continuity |
| 1031 | mathematics | 19 | `math.real.extreme-value-theorem` | Extreme Value Theorem |
| 1032 | mathematics | 19 | `math.real.ivt` | Intermediate Value Theorem (Rigorous) |
| 1033 | mathematics | 19 | `math.real.differentiability-rigorous` | Differentiability (Rigorous) |
| 1034 | mathematics | 19 | `math.real.riemann-integral` | Riemann Integral (Rigorous) |
| 1035 | mathematics | 19 | `math.real.uniform-convergence` | Uniform Convergence |
| 1036 | mathematics | 19 | `math.real.baire-category` | Baire Category Theorem |
| 1037 | mathematics | 19 | `math.graph.extremal-graph-theory` | Extremal Graph Theory |
| 1038 | physics | 19 | `phys.qm.wkb-approximation` | WKB Approximation (Semiclassical Limit) |
| 1039 | physics | 19 | `phys.qm.s-matrix-basics` | S-Matrix and Scattering Amplitudes |
| 1040 | physics | 19 | `phys.astro.stellar-evolution` | Stellar Evolution and End States |
| 1041 | physics | 19 | `phys.astro.cosmology` | Big Bang Cosmology |
| 1042 | physics | 19 | `phys.particle.neutrinos` | Neutrinos |
| 1043 | physics | 19 | `phys.particle.hadron-quark-model` | Quark Model of Hadrons: Baryons and Mesons |
| 1044 | physics | 19 | `phys.particle.strong-interaction` | The Strong Interaction and Color Charge |
| 1045 | physics | 19 | `phys.mod.energy-bands` | Energy Bands in Solids |
| 1046 | english | 19 | `eng.grammar.sentence-combining` | Sentence Combining |
| 1047 | english | 19 | `eng.reading.evaluating-sources` | Evaluating Sources |
| 1048 | english | 19 | `eng.writing.topic-sentences` | Topic Sentences |
| 1049 | english | 19 | `eng.literature.plot-structure` | Plot Structure |
| 1050 | english | 19 | `eng.literature.character-development` | Character Development |
| 1051 | english | 19 | `eng.literature.setting-and-atmosphere` | Setting and Atmosphere |
| 1052 | english | 19 | `eng.literature.point-of-view` | Point of View |
| 1053 | english | 19 | `eng.literature.drama-basics` | Drama Basics |
| 1054 | chemistry | 19 | `chem.carb.alpha-reactions` | Alpha-Carbon Reactions |
| 1055 | chemistry | 19 | `chem.carb.derivatives` | Carboxylic Acid Derivatives |
| 1056 | chemistry | 19 | `chem.carb.spectro` | Spectroscopic ID of Carbonyls |
| 1057 | chemistry | 19 | `chem.nitro.amino-acids` | Amino Acids |
| 1058 | biology | 19 | `bio.bioinfo.phylogenetics-computational` | Computational Phylogenetics |
| 1059 | biology | 19 | `bio.bioinfo.structural-bioinformatics` | Structural Bioinformatics |
| 1060 | biology | 19 | `bio.sys.gene-regulatory-networks` | Gene Regulatory Networks |
| 1061 | biology | 19 | `bio.evo.molecular-evolution` | Molecular Evolution and Neutral Theory |
| 1062 | computer_science | 19 | `cs.struct.balanced-trees` | Balanced Search Trees |
| 1063 | computer_science | 19 | `cs.struct.graph-traversal` | Graph Traversal — BFS and DFS |
| 1064 | computer_science | 19 | `cs.db.transactions-acid` | Transactions and the ACID Properties |
| 1065 | computer_science | 19 | `cs.db.mysql-python` | Connecting Python to MySQL |
| 1066 | computer_science | 19 | `cs.se.agile-design-principles` | Agile Practices and Software Design Principles |
| 1067 | computer_science | 19 | `cs.ds.intro-machine-learning` | Introduction to Machine Learning |
| 1068 | mathematics | 20 | `math.arith.fraction-simplification` | Fraction Simplification |
| 1069 | mathematics | 20 | `math.arith.percentage-change` | Percentage Change |
| 1070 | mathematics | 20 | `math.nt.euclidean-algorithm` | Euclidean Algorithm |
| 1071 | mathematics | 20 | `math.nt.lcm` | Least Common Multiple |
| 1072 | mathematics | 20 | `math.nt.chinese-remainder-theorem` | Chinese Remainder Theorem |
| 1073 | mathematics | 20 | `math.alg.like-terms` | Like Terms |
| 1074 | mathematics | 20 | `math.alg.fractional-exponent` | Fractional Exponent |
| 1075 | mathematics | 20 | `math.alg.simplifying-radicals` | Simplifying Radical Expressions |
| 1076 | mathematics | 20 | `math.alg.radical-equations` | Radical Equations |
| 1077 | mathematics | 20 | `math.alg.exponential-equations` | Exponential Equations |
| 1078 | mathematics | 20 | `math.alg.logarithm` | Logarithm |
| 1079 | mathematics | 20 | `math.alg.pascals-triangle` | Pascal's Triangle |
| 1080 | mathematics | 20 | `math.geom.curvature` | Curvature |
| 1081 | mathematics | 20 | `math.trig.basic-ratios` | Six Trigonometric Ratios |
| 1082 | mathematics | 20 | `math.trig.unit-circle` | Unit Circle |
| 1083 | mathematics | 20 | `math.trig.law-of-sines` | Law of Sines |
| 1084 | mathematics | 20 | `math.trig.law-of-cosines` | Law of Cosines |
| 1085 | mathematics | 20 | `math.func.exponential-function` | Exponential Function |
| 1086 | mathematics | 20 | `math.seq.integral-test` | Integral Test |
| 1087 | mathematics | 20 | `math.seq.absolute-convergence` | Absolute and Conditional Convergence |
| 1088 | mathematics | 20 | `math.calc.product-rule` | Product Rule |
| 1089 | mathematics | 20 | `math.calc.chain-rule` | Chain Rule |
| 1090 | mathematics | 20 | `math.calc.higher-order-derivatives` | Higher-Order Derivatives |
| 1091 | mathematics | 20 | `math.calc.rolles-theorem` | Rolle's Theorem |
| 1092 | mathematics | 20 | `math.calc.increasing-decreasing` | Increasing and Decreasing Functions |
| 1093 | mathematics | 20 | `math.calc.critical-points` | Critical Points |
| 1094 | mathematics | 20 | `math.calc.antiderivatives` | Antiderivatives |
| 1095 | mathematics | 20 | `math.calc.volume-revolution` | Volumes of Revolution |
| 1096 | mathematics | 20 | `math.calc.arc-length` | Arc Length |
| 1097 | mathematics | 20 | `math.calc.radius-of-convergence` | Radius of Convergence |
| 1098 | mathematics | 20 | `math.calc.partial-derivatives` | Partial Derivatives |
| 1099 | mathematics | 20 | `math.calc.multiple-integrals` | Multiple Integrals |
| 1100 | mathematics | 20 | `math.linalg.unit-vector` | Unit Vector |
| 1101 | mathematics | 20 | `math.linalg.symmetric-matrix` | Symmetric Matrix |
| 1102 | mathematics | 20 | `math.linalg.determinant` | Determinant |
| 1103 | mathematics | 20 | `math.linalg.subspace` | Subspace |
| 1104 | mathematics | 20 | `math.linalg.linear-map` | Linear Map |
| 1105 | mathematics | 20 | `math.linalg.inner-product` | Inner Product |
| 1106 | mathematics | 20 | `math.linalg.distance` | Distance in Vector Spaces |
| 1107 | mathematics | 20 | `math.linalg.angle-vectors` | Angle Between Vectors |
| 1108 | mathematics | 20 | `math.prob.pdf` | Probability Density Function |
| 1109 | mathematics | 20 | `math.prob.generating-function` | Probability Generating Function |
| 1110 | mathematics | 20 | `math.prob.markov-chain` | Markov Chain |
| 1111 | mathematics | 20 | `math.stats.percentile` | Percentile |
| 1112 | mathematics | 20 | `math.disc.generating-functions` | Generating Functions |
| 1113 | mathematics | 20 | `math.disc.catalan-numbers` | Catalan Numbers |
| 1114 | mathematics | 20 | `math.disc.stirling-numbers` | Stirling Numbers |
| 1115 | mathematics | 20 | `math.real.lipschitz-continuity` | Lipschitz Continuity |
| 1116 | mathematics | 20 | `math.real.mvt` | Mean Value Theorem (Rigorous) |
| 1117 | mathematics | 20 | `math.real.riemann-integrability` | Riemann Integrability |
| 1118 | mathematics | 20 | `math.real.ftc-rigorous` | Fundamental Theorem of Calculus (Rigorous) |
| 1119 | mathematics | 20 | `math.real.weierstrass-approximation` | Weierstrass Approximation Theorem |
| 1120 | mathematics | 20 | `math.top.smooth-manifold` | Smooth Manifold |
| 1121 | mathematics | 20 | `math.fnal.normed-space` | Normed Space |
| 1122 | mathematics | 20 | `math.num.floating-point` | Floating-Point Arithmetic |
| 1123 | mathematics | 20 | `math.num.root-finding` | Root-Finding Methods |
| 1124 | mathematics | 20 | `math.opt.dynamic-programming` | Dynamic Programming |
| 1125 | physics | 20 | `phys.astro.dark-matter` | Dark Matter and Dark Energy |
| 1126 | physics | 20 | `phys.astro.black-holes` | Black Holes and Schwarzschild Radius |
| 1127 | physics | 20 | `phys.particle.weak-interaction` | The Weak Interaction |
| 1128 | physics | 20 | `phys.particle.conservation-laws` | Conservation Laws in Particle Interactions |
| 1129 | physics | 20 | `phys.mod.semiconductor-classification` | Conductors, Insulators, and Semiconductors |
| 1130 | english | 20 | `eng.reading.reading-across-genres` | Reading Across Genres |
| 1131 | english | 20 | `eng.writing.supporting-details` | Supporting Details |
| 1132 | english | 20 | `eng.literature.theme-and-message` | Theme and Message |
| 1133 | english | 20 | `eng.literature.foreshadowing-and-suspense` | Foreshadowing and Suspense |
| 1134 | english | 20 | `eng.literature.dramatic-structure` | Dramatic Structure |
| 1135 | english | 20 | `eng.literature.prose-fiction` | Prose Fiction |
| 1136 | english | 20 | `eng.linguistics.what-is-linguistics` | What Is Linguistics? |
| 1137 | english | 20 | `eng.communication.media-literacy` | Media Literacy |
| 1138 | chemistry | 20 | `chem.carb.named-reactions` | Named Carbonyl Reactions |
| 1139 | chemistry | 20 | `chem.bio.proteins` | Proteins |
| 1140 | chemistry | 20 | `chem.bio.lipids` | Lipids |
| 1141 | chemistry | 20 | `chem.poly.condensation` | Condensation Polymerization |
| 1142 | biology | 20 | `bio.sys.metabolic-network-modelling` | Metabolic Network Modelling |
| 1143 | computer_science | 20 | `cs.struct.shortest-path-algorithms` | Shortest Path Algorithms |
| 1144 | computer_science | 20 | `cs.db.indexing-query-optimisation` | Indexing and Query Optimisation |
| 1145 | computer_science | 20 | `cs.db.nosql-intro` | Introduction to NoSQL Databases |
| 1146 | computer_science | 20 | `cs.ds.supervised-learning-models` | Supervised Learning Models |
| 1147 | computer_science | 20 | `cs.ds.unsupervised-learning-models` | Unsupervised Learning Models |
| 1148 | mathematics | 21 | `math.arith.fraction-addition` | Addition and Subtraction of Fractions |
| 1149 | mathematics | 21 | `math.nt.extended-euclidean-algorithm` | Extended Euclidean Algorithm |
| 1150 | mathematics | 21 | `math.nt.continued-fractions` | Continued Fractions |
| 1151 | mathematics | 21 | `math.alg.simplification` | Algebraic Simplification |
| 1152 | mathematics | 21 | `math.alg.polynomial-operations` | Polynomial Operations |
| 1153 | mathematics | 21 | `math.alg.rationalizing-denominators` | Rationalizing the Denominator |
| 1154 | mathematics | 21 | `math.alg.logarithm-properties` | Logarithm Properties |
| 1155 | mathematics | 21 | `math.alg.natural-logarithm` | Natural Logarithm |
| 1156 | mathematics | 21 | `math.geom.frenet-serret` | Frenet-Serret Formulas |
| 1157 | mathematics | 21 | `math.geom.differential-geometry-surfaces` | Differential Geometry of Surfaces |
| 1158 | mathematics | 21 | `math.trig.special-angles` | Trigonometric Values at Special Angles |
| 1159 | mathematics | 21 | `math.trig.reference-angles` | Reference Angles |
| 1160 | mathematics | 21 | `math.trig.trig-functions` | Trigonometric Functions |
| 1161 | mathematics | 21 | `math.func.logarithmic-function` | Logarithmic Function |
| 1162 | mathematics | 21 | `math.calc.quotient-rule` | Quotient Rule |
| 1163 | mathematics | 21 | `math.calc.derivative-exponential` | Derivative of Exponential Functions |
| 1164 | mathematics | 21 | `math.calc.implicit-differentiation` | Implicit Differentiation |
| 1165 | mathematics | 21 | `math.calc.local-extrema` | Local Extrema |
| 1166 | mathematics | 21 | `math.calc.concavity` | Concavity and Inflection Points |
| 1167 | mathematics | 21 | `math.calc.ftc-part2` | Fundamental Theorem of Calculus Part 2 |
| 1168 | mathematics | 21 | `math.calc.surface-area-integral` | Surface Area of Revolution |
| 1169 | mathematics | 21 | `math.calc.taylor-series` | Taylor Series |
| 1170 | mathematics | 21 | `math.calc.parametric-calculus` | Calculus of Parametric Curves |
| 1171 | mathematics | 21 | `math.calc.gradient` | Gradient |
| 1172 | mathematics | 21 | `math.calc.chain-rule-multivariable` | Multivariable Chain Rule |
| 1173 | mathematics | 21 | `math.calc.double-integrals` | Double Integrals |
| 1174 | mathematics | 21 | `math.calc.change-of-variables` | Change of Variables (Jacobian) |
| 1175 | mathematics | 21 | `math.de.ode` | Ordinary Differential Equation |
| 1176 | mathematics | 21 | `math.linalg.matrix-inverse` | Matrix Inverse |
| 1177 | mathematics | 21 | `math.linalg.cofactor-expansion` | Cofactor Expansion |
| 1178 | mathematics | 21 | `math.linalg.det-properties` | Properties of Determinants |
| 1179 | mathematics | 21 | `math.linalg.span` | Span |
| 1180 | mathematics | 21 | `math.linalg.kernel-image` | Kernel and Image of Linear Map |
| 1181 | mathematics | 21 | `math.linalg.eigenvalues` | Eigenvalues and Eigenvectors |
| 1182 | mathematics | 21 | `math.linalg.inner-product-space` | Inner Product Space |
| 1183 | mathematics | 21 | `math.linalg.projection` | Orthogonal Projection |
| 1184 | mathematics | 21 | `math.linalg.tensor` | Tensor |
| 1185 | mathematics | 21 | `math.linalg.dual-space` | Dual Space |
| 1186 | mathematics | 21 | `math.prob.continuous-distributions` | Continuous Distributions |
| 1187 | mathematics | 21 | `math.prob.expected-value` | Expected Value |
| 1188 | mathematics | 21 | `math.prob.transition-matrix` | Transition Matrix |
| 1189 | mathematics | 21 | `math.disc.divide-conquer-recurrence` | Divide-and-Conquer Recurrence |
| 1190 | mathematics | 21 | `math.disc.ogf` | Ordinary Generating Function |
| 1191 | mathematics | 21 | `math.disc.egf` | Exponential Generating Function |
| 1192 | mathematics | 21 | `math.real.taylor-rigorous` | Taylor's Theorem (Rigorous) |
| 1193 | mathematics | 21 | `math.real.fixed-point-theorem` | Banach Fixed-Point Theorem |
| 1194 | mathematics | 21 | `math.fnal.completeness` | Completeness |
| 1195 | mathematics | 21 | `math.num.error-analysis` | Error Analysis |
| 1196 | mathematics | 21 | `math.num.newtons-method` | Newton's Method |
| 1197 | physics | 21 | `phys.astro.gravitational-waves` | Gravitational Waves |
| 1198 | physics | 21 | `phys.particle.electroweak-unification` | Electroweak Unification |
| 1199 | physics | 21 | `phys.particle.feynman-diagrams` | Feynman Diagrams (Qualitative) |
| 1200 | physics | 21 | `phys.particle.accelerators-detectors` | Particle Accelerators and Detectors |
| 1201 | physics | 21 | `phys.mod.intrinsic-semiconductors` | Intrinsic Semiconductors |
| 1202 | english | 21 | `eng.writing.transitions-and-cohesion` | Transitions and Cohesion |
| 1203 | english | 21 | `eng.literature.literary-devices-overview` | Overview of Literary Devices |
| 1204 | english | 21 | `eng.literature.prose-nonfiction` | Prose Nonfiction |
| 1205 | english | 21 | `eng.linguistics.phonology-intro` | Introduction to Phonology |
| 1206 | english | 21 | `eng.linguistics.morphology-intro` | Introduction to Morphology |
| 1207 | chemistry | 21 | `chem.bio.nucleic-acids` | Nucleic Acids |
| 1208 | chemistry | 21 | `chem.bio.vitamins` | Vitamins and Hormones |
| 1209 | chemistry | 21 | `chem.bio.enzyme-kinetics` | Enzyme Kinetics |
| 1210 | chemistry | 21 | `chem.poly.natural` | Natural Polymers |
| 1211 | chemistry | 21 | `chem.poly.properties` | Polymer Properties |
| 1212 | chemistry | 21 | `chem.poly.biodegradable` | Biodegradable and Functional Polymers |
| 1213 | biology | 21 | `bio.sys.synthetic-biology` | Synthetic Biology |
| 1214 | computer_science | 21 | `cs.struct.minimum-spanning-tree` | Minimum Spanning Trees |
| 1215 | computer_science | 21 | `cs.ds.neural-networks-intro` | Introduction to Neural Networks |
| 1216 | mathematics | 22 | `math.nt.bezout-identity` | Bézout's Identity |
| 1217 | mathematics | 22 | `math.nt.modular-inverse` | Modular Inverse |
| 1218 | mathematics | 22 | `math.alg.linear-equation-1var` | Linear Equation in One Variable |
| 1219 | mathematics | 22 | `math.alg.polynomial-division` | Polynomial Division |
| 1220 | mathematics | 22 | `math.alg.change-of-base` | Change of Base Formula |
| 1221 | mathematics | 22 | `math.alg.logarithmic-equations` | Logarithmic Equations |
| 1222 | mathematics | 22 | `math.geom.polar-coordinates` | Polar Coordinates |
| 1223 | mathematics | 22 | `math.geom.rotation` | Rotation |
| 1224 | mathematics | 22 | `math.geom.dot-product` | Dot Product |
| 1225 | mathematics | 22 | `math.trig.amplitude-period-phase` | Amplitude, Period, Phase Shift |
| 1226 | mathematics | 22 | `math.trig.trig-identities` | Trigonometric Identities |
| 1227 | mathematics | 22 | `math.trig.inverse-trig` | Inverse Trigonometric Functions |
| 1228 | mathematics | 22 | `math.trig.hyperbolic-functions` | Hyperbolic Functions |
| 1229 | mathematics | 22 | `math.calc.derivative-ln` | Derivative of Logarithmic Functions |
| 1230 | mathematics | 22 | `math.calc.derivative-trig` | Derivatives of Trigonometric Functions |
| 1231 | mathematics | 22 | `math.calc.related-rates` | Related Rates |
| 1232 | mathematics | 22 | `math.calc.optimization` | Optimization (Calculus) |
| 1233 | mathematics | 22 | `math.calc.curve-sketching` | Curve Sketching |
| 1234 | mathematics | 22 | `math.calc.u-substitution` | Integration by Substitution |
| 1235 | mathematics | 22 | `math.calc.maclaurin-series` | Maclaurin Series |
| 1236 | mathematics | 22 | `math.calc.taylor-remainder` | Taylor Remainder and Error Bound |
| 1237 | mathematics | 22 | `math.calc.directional-derivative` | Directional Derivative |
| 1238 | mathematics | 22 | `math.calc.multivariable-extrema` | Multivariable Extrema |
| 1239 | mathematics | 22 | `math.calc.triple-integrals` | Triple Integrals |
| 1240 | mathematics | 22 | `math.calc.surface-integrals` | Surface Integrals |
| 1241 | mathematics | 22 | `math.calc.vector-fields` | Vector Fields |
| 1242 | mathematics | 22 | `math.calc.greens-theorem` | Green's Theorem |
| 1243 | mathematics | 22 | `math.calc.fourier-series-intro` | Fourier Series (Introduction) |
| 1244 | mathematics | 22 | `math.de.ode-order` | Order of a Differential Equation |
| 1245 | mathematics | 22 | `math.de.ode-linearity` | Linearity of Differential Equations |
| 1246 | mathematics | 22 | `math.de.solution-types` | Types of Solutions |
| 1247 | mathematics | 22 | `math.de.pde` | Partial Differential Equation |
| 1248 | mathematics | 22 | `math.linalg.cramer-rule` | Cramer's Rule |
| 1249 | mathematics | 22 | `math.linalg.linear-independence` | Linear Independence |
| 1250 | mathematics | 22 | `math.linalg.column-space` | Column Space |
| 1251 | mathematics | 22 | `math.linalg.characteristic-polynomial` | Characteristic Polynomial |
| 1252 | mathematics | 22 | `math.linalg.least-squares` | Least Squares |
| 1253 | mathematics | 22 | `math.prob.normal-distribution` | Normal Distribution |
| 1254 | mathematics | 22 | `math.prob.linearity-expectation` | Linearity of Expectation |
| 1255 | mathematics | 22 | `math.prob.law-of-unconscious` | Law of the Unconscious Statistician |
| 1256 | mathematics | 22 | `math.prob.variance` | Variance |
| 1257 | mathematics | 22 | `math.prob.moments` | Moments |
| 1258 | mathematics | 22 | `math.prob.markov-inequality` | Markov's Inequality |
| 1259 | mathematics | 22 | `math.prob.stationary-distribution` | Stationary Distribution |
| 1260 | mathematics | 22 | `math.prob.poisson-process` | Poisson Process |
| 1261 | mathematics | 22 | `math.disc.algorithm-complexity` | Algorithm Complexity |
| 1262 | mathematics | 22 | `math.real.implicit-function-theorem` | Implicit Function Theorem |
| 1263 | mathematics | 22 | `math.real.inverse-function-theorem` | Inverse Function Theorem |
| 1264 | mathematics | 22 | `math.fnal.banach-space` | Banach Space |
| 1265 | mathematics | 22 | `math.num.numerical-differentiation` | Numerical Differentiation |
| 1266 | mathematics | 22 | `math.opt.unconstrained-optimization` | Unconstrained Optimization |
| 1267 | mathematics | 22 | `math.opt.convex-function` | Convex Function |
| 1268 | mathematics | 22 | `math.graph.algebraic-graph-theory` | Algebraic Graph Theory |
| 1269 | physics | 22 | `phys.particle.higgs-mechanism` | The Higgs Mechanism |
| 1270 | physics | 22 | `phys.mod.extrinsic-semiconductors` | Extrinsic Semiconductors: Doping and Carrier Types |
| 1271 | english | 22 | `eng.writing.narrative-writing` | Narrative Writing |
| 1272 | english | 22 | `eng.writing.descriptive-writing` | Descriptive Writing |
| 1273 | english | 22 | `eng.writing.expository-writing` | Expository Writing |
| 1274 | english | 22 | `eng.writing.persuasive-writing-basics` | Persuasive Writing Basics |
| 1275 | english | 22 | `eng.literature.metaphor-and-simile` | Metaphor and Simile |
| 1276 | english | 22 | `eng.literature.irony` | Irony |
| 1277 | english | 22 | `eng.literature.poetry-basics` | Poetry Basics |
| 1278 | english | 22 | `eng.linguistics.syntax-theory-intro` | Introduction to Syntactic Theory |
| 1279 | english | 22 | `eng.linguistics.historical-linguistics-intro` | Introduction to Historical Linguistics |
| 1280 | mathematics | 23 | `math.nt.linear-diophantine` | Linear Diophantine Equations |
| 1281 | mathematics | 23 | `math.nt.rsa-basics` | RSA Cryptography (Number-Theoretic Basis) |
| 1282 | mathematics | 23 | `math.alg.inequality-1var` | Linear Inequality in One Variable |
| 1283 | mathematics | 23 | `math.alg.absolute-value-equations` | Absolute Value Equations and Inequalities |
| 1284 | mathematics | 23 | `math.alg.linear-equation-2var` | Linear Equation in Two Variables |
| 1285 | mathematics | 23 | `math.alg.remainder-theorem` | Remainder Theorem |
| 1286 | mathematics | 23 | `math.geom.polar-curves` | Polar Curves |
| 1287 | mathematics | 23 | `math.trig.trig-graphs` | Graphs of Trigonometric Functions |
| 1288 | mathematics | 23 | `math.trig.pythagorean-identities` | Pythagorean Identities |
| 1289 | mathematics | 23 | `math.trig.reciprocal-identities` | Reciprocal Identities |
| 1290 | mathematics | 23 | `math.trig.sum-difference-formulas` | Sum and Difference Formulas |
| 1291 | mathematics | 23 | `math.trig.trig-equations` | Trigonometric Equations |
| 1292 | mathematics | 23 | `math.trig.polar-form-complex` | Polar Form of Complex Numbers |
| 1293 | mathematics | 23 | `math.calc.logarithmic-differentiation` | Logarithmic Differentiation |
| 1294 | mathematics | 23 | `math.calc.derivative-inverse-trig` | Derivatives of Inverse Trig Functions |
| 1295 | mathematics | 23 | `math.calc.hyperbolic-derivatives` | Derivatives of Hyperbolic Functions |
| 1296 | mathematics | 23 | `math.calc.integration-by-parts` | Integration by Parts |
| 1297 | mathematics | 23 | `math.calc.curl-divergence` | Curl and Divergence |
| 1298 | mathematics | 23 | `math.de.ivp` | Initial Value Problem |
| 1299 | mathematics | 23 | `math.de.first-order-ode` | First-Order ODE |
| 1300 | mathematics | 23 | `math.de.pde-classification` | Classification of Second-Order PDEs |
| 1301 | mathematics | 23 | `math.linalg.basis` | Basis |
| 1302 | mathematics | 23 | `math.prob.standard-normal` | Standard Normal Distribution |
| 1303 | mathematics | 23 | `math.prob.standard-deviation` | Standard Deviation |
| 1304 | mathematics | 23 | `math.prob.mgf` | Moment Generating Function |
| 1305 | mathematics | 23 | `math.prob.covariance` | Covariance |
| 1306 | mathematics | 23 | `math.prob.chebyshev` | Chebyshev's Inequality |
| 1307 | mathematics | 23 | `math.prob.ergodicity` | Ergodic Theorem (Markov Chains) |
| 1308 | mathematics | 23 | `math.stats.normal-distribution` | Normal Distribution (Statistics) |
| 1309 | mathematics | 23 | `math.disc.complexity-classes` | Complexity Classes |
| 1310 | mathematics | 23 | `math.fnal.hilbert-space` | Hilbert Space |
| 1311 | mathematics | 23 | `math.fnal.bounded-operator` | Bounded Linear Operator |
| 1312 | mathematics | 23 | `math.fnal.dense-subspace` | Dense Subspaces and Approximation |
| 1313 | mathematics | 23 | `math.opt.convex-optimization` | Convex Optimization |
| 1314 | mathematics | 23 | `math.opt.lagrange-multipliers` | Lagrange Multipliers |
| 1315 | mathematics | 23 | `math.opt.gradient-methods` | Gradient Descent |
| 1316 | physics | 23 | `phys.particle.standard-model` | The Standard Model |
| 1317 | physics | 23 | `phys.mod.pn-junction` | The p-n Junction |
| 1318 | english | 23 | `eng.writing.the-writing-process` | The Writing Process |
| 1319 | english | 23 | `eng.writing.creative-writing-forms` | Creative Writing Forms |
| 1320 | english | 23 | `eng.literature.symbolism` | Symbolism |
| 1321 | english | 23 | `eng.literature.imagery` | Imagery |
| 1322 | english | 23 | `eng.literature.poetic-forms` | Poetic Forms |
| 1323 | english | 23 | `eng.literature.literary-genres-overview` | Overview of Literary Genres |
| 1324 | english | 23 | `eng.linguistics.semantics-intro` | Introduction to Semantics |
| 1325 | english | 23 | `eng.linguistics.language-families` | Language Families |
| 1326 | english | 23 | `eng.linguistics.language-acquisition-intro` | Introduction to Language Acquisition |
| 1327 | mathematics | 24 | `math.nt.general-diophantine` | Diophantine Equations |
| 1328 | mathematics | 24 | `math.alg.inequality-2var` | Linear Inequality in Two Variables |
| 1329 | mathematics | 24 | `math.alg.system-linear-equations` | Systems of Linear Equations |
| 1330 | mathematics | 24 | `math.alg.factor-theorem` | Factor Theorem |
| 1331 | mathematics | 24 | `math.trig.double-angle-formulas` | Double Angle Formulas |
| 1332 | mathematics | 24 | `math.trig.product-to-sum` | Product-to-Sum and Sum-to-Product Formulas |
| 1333 | mathematics | 24 | `math.trig.de-moivres-theorem` | De Moivre's Theorem |
| 1334 | mathematics | 24 | `math.trig.eulers-formula` | Euler's Formula |
| 1335 | mathematics | 24 | `math.calc.reduction-formulas` | Reduction Formulas |
| 1336 | mathematics | 24 | `math.calc.stokes-theorem` | Stokes' Theorem |
| 1337 | mathematics | 24 | `math.calc.divergence-theorem` | Divergence Theorem |
| 1338 | mathematics | 24 | `math.de.existence-uniqueness` | Existence and Uniqueness Theorem |
| 1339 | mathematics | 24 | `math.de.separable` | Separable Differential Equation |
| 1340 | mathematics | 24 | `math.de.linear-first-order` | Linear First-Order ODE |
| 1341 | mathematics | 24 | `math.de.exact-ode` | Exact Differential Equation |
| 1342 | mathematics | 24 | `math.de.slope-field` | Slope Field |
| 1343 | mathematics | 24 | `math.de.euler-method` | Euler's Method |
| 1344 | mathematics | 24 | `math.de.second-order-ode` | Second-Order ODE |
| 1345 | mathematics | 24 | `math.linalg.dimension` | Dimension |
| 1346 | mathematics | 24 | `math.linalg.coordinates` | Coordinates |
| 1347 | mathematics | 24 | `math.linalg.matrix-representation` | Matrix Representation of Linear Map |
| 1348 | mathematics | 24 | `math.linalg.orthogonal-basis` | Orthogonal and Orthonormal Basis |
| 1349 | mathematics | 24 | `math.prob.correlation` | Correlation |
| 1350 | mathematics | 24 | `math.prob.lln` | Law of Large Numbers |
| 1351 | mathematics | 24 | `math.stats.covariance-matrix` | Covariance Matrix |
| 1352 | mathematics | 24 | `math.cx.complex-numbers-analysis` | Complex Numbers (Analysis) |
| 1353 | mathematics | 24 | `math.fnal.dual-space-functional` | Dual Space |
| 1354 | mathematics | 24 | `math.fnal.open-mapping-theorem` | Open Mapping Theorem |
| 1355 | mathematics | 24 | `math.fnal.uniform-boundedness` | Uniform Boundedness Principle |
| 1356 | mathematics | 24 | `math.fnal.riesz-representation` | Riesz Representation Theorem |
| 1357 | mathematics | 24 | `math.fnal.spectral-theory` | Spectral Theory |
| 1358 | mathematics | 24 | `math.fnal.fourier-transform` | Fourier Transform (Functional Analysis) |
| 1359 | mathematics | 24 | `math.opt.duality` | Duality Theory |
| 1360 | mathematics | 24 | `math.opt.stochastic-gradient` | Stochastic Gradient Descent |
| 1361 | mathematics | 24 | `math.opt.newton-optimization` | Newton's Method for Optimization |
| 1362 | physics | 24 | `phys.mod.diode-rectification` | Diode Rectifying Behavior |
| 1363 | english | 24 | `eng.writing.outlining-and-planning` | Outlining and Planning |
| 1364 | english | 24 | `eng.literature.meter-and-rhyme` | Meter and Rhyme |
| 1365 | english | 24 | `eng.literature.short-story-study` | Short Story Study |
| 1366 | english | 24 | `eng.literature.literary-periods-survey` | Survey of Literary Periods |
| 1367 | english | 24 | `eng.linguistics.pragmatics-intro` | Introduction to Pragmatics |
| 1368 | english | 24 | `eng.linguistics.psycholinguistics-intro` | Introduction to Psycholinguistics |
| 1369 | mathematics | 25 | `math.nt.pythagorean-triples` | Pythagorean Triples |
| 1370 | mathematics | 25 | `math.nt.pells-equation` | Pell's Equation |
| 1371 | mathematics | 25 | `math.nt.algebraic-number-theory` | Algebraic Number Theory |
| 1372 | mathematics | 25 | `math.nt.analytic-number-theory` | Analytic Number Theory |
| 1373 | mathematics | 25 | `math.alg.substitution-method` | Substitution Method |
| 1374 | mathematics | 25 | `math.alg.elimination-method` | Elimination Method |
| 1375 | mathematics | 25 | `math.alg.system-3var` | Systems of 3 Equations in 3 Variables |
| 1376 | mathematics | 25 | `math.alg.factoring` | Factoring Polynomials |
| 1377 | mathematics | 25 | `math.trig.half-angle-formulas` | Half Angle Formulas |
| 1378 | mathematics | 25 | `math.calc.trig-integrals` | Trigonometric Integrals |
| 1379 | mathematics | 25 | `math.de.bernoulli` | Bernoulli Equation |
| 1380 | mathematics | 25 | `math.de.homogeneous-ode` | Homogeneous First-Order ODE |
| 1381 | mathematics | 25 | `math.de.second-order-linear` | Second-Order Linear ODE |
| 1382 | mathematics | 25 | `math.de.laplace-transform` | Laplace Transform |
| 1383 | mathematics | 25 | `math.de.systems-ode` | Systems of ODEs |
| 1384 | mathematics | 25 | `math.de.bvp` | Boundary Value Problem |
| 1385 | mathematics | 25 | `math.linalg.linear-system` | System of Linear Equations |
| 1386 | mathematics | 25 | `math.linalg.change-of-basis` | Change of Basis |
| 1387 | mathematics | 25 | `math.linalg.spectral-theorem` | Spectral Theorem |
| 1388 | mathematics | 25 | `math.linalg.gram-schmidt` | Gram-Schmidt Process |
| 1389 | mathematics | 25 | `math.prob.clt` | Central Limit Theorem |
| 1390 | mathematics | 25 | `math.stats.correlation` | Sample Correlation |
| 1391 | mathematics | 25 | `math.cx.complex-function` | Complex-Valued Function |
| 1392 | mathematics | 25 | `math.fnal.hahn-banach` | Hahn-Banach Theorem |
| 1393 | mathematics | 25 | `math.fnal.closed-graph-theorem` | Closed Graph Theorem |
| 1394 | mathematics | 25 | `math.fnal.compact-operator-spectrum` | Compact Operators |
| 1395 | mathematics | 25 | `math.fnal.distributions` | Distributions |
| 1396 | mathematics | 25 | `math.num.euler-method` | Euler's Method (Numerical ODE) |
| 1397 | mathematics | 25 | `math.opt.kkt` | KKT Conditions |
| 1398 | english | 25 | `eng.writing.drafting` | Drafting |
| 1399 | english | 25 | `eng.literature.novel-study` | Novel Study |
| 1400 | english | 25 | `eng.literature.literary-criticism-intro` | Introduction to Literary Criticism |
| 1401 | english | 25 | `eng.linguistics.discourse-analysis-intro` | Introduction to Discourse Analysis |
| 1402 | english | 25 | `eng.linguistics.sociolinguistics-intro` | Introduction to Sociolinguistics |
| 1403 | mathematics | 26 | `math.nt.algebraic-integers` | Algebraic Integers |
| 1404 | mathematics | 26 | `math.alg.factoring-gcf` | Factoring out the GCF |
| 1405 | mathematics | 26 | `math.alg.factoring-special` | Special Factoring Patterns |
| 1406 | mathematics | 26 | `math.alg.rational-expressions` | Rational Expressions |
| 1407 | mathematics | 26 | `math.calc.trig-substitution` | Trigonometric Substitution |
| 1408 | mathematics | 26 | `math.de.second-order-homogeneous` | Homogeneous Second-Order Linear ODE |
| 1409 | mathematics | 26 | `math.de.laplace-properties` | Laplace Transform Properties |
| 1410 | mathematics | 26 | `math.de.convolution-theorem` | Convolution Theorem (Laplace) |
| 1411 | mathematics | 26 | `math.de.phase-plane` | Phase Plane Analysis |
| 1412 | mathematics | 26 | `math.de.series-solution` | Series Solution of ODEs |
| 1413 | mathematics | 26 | `math.de.sturm-liouville` | Sturm-Liouville Theory |
| 1414 | mathematics | 26 | `math.de.fourier-series` | Fourier Series |
| 1415 | mathematics | 26 | `math.linalg.augmented-matrix` | Augmented Matrix |
| 1416 | mathematics | 26 | `math.linalg.positive-definite` | Positive Definite Matrix |
| 1417 | mathematics | 26 | `math.linalg.qr-factorization` | QR Factorization |
| 1418 | mathematics | 26 | `math.stats.sampling-distribution` | Sampling Distribution |
| 1419 | mathematics | 26 | `math.stats.linear-regression` | Simple Linear Regression |
| 1420 | mathematics | 26 | `math.stats.normal-approximation` | Normal Approximation |
| 1421 | mathematics | 26 | `math.cx.cauchy-riemann` | Cauchy-Riemann Equations |
| 1422 | mathematics | 26 | `math.num.interpolation` | Polynomial Interpolation |
| 1423 | mathematics | 26 | `math.num.iterative-linear` | Iterative Methods for Linear Systems |
| 1424 | mathematics | 26 | `math.num.runge-kutta` | Runge-Kutta Methods |
| 1425 | mathematics | 26 | `math.opt.linear-programming` | Linear Programming |
| 1426 | english | 26 | `eng.writing.revising-for-content` | Revising for Content |
| 1427 | english | 26 | `eng.literature.comparative-literature-intro` | Introduction to Comparative Literature |
| 1428 | english | 26 | `eng.linguistics.applied-linguistics-intro` | Introduction to Applied Linguistics |
| 1429 | english | 26 | `eng.linguistics.dialectology` | Dialectology |
| 1430 | english | 26 | `eng.linguistics.corpus-linguistics-intro` | Introduction to Corpus Linguistics |
| 1431 | english | 26 | `eng.communication.discourse-markers-advanced` | Advanced Discourse Markers |
| 1432 | english | 26 | `eng.communication.cross-cultural-communication` | Cross-Cultural Communication |
| 1433 | mathematics | 27 | `math.nt.number-fields` | Number Fields |
| 1434 | mathematics | 27 | `math.alg.factoring-trinomials` | Factoring Trinomials |
| 1435 | mathematics | 27 | `math.alg.rational-expressions-addition` | Addition of Rational Expressions |
| 1436 | mathematics | 27 | `math.alg.rational-expressions-multiplication` | Multiplication of Rational Expressions |
| 1437 | mathematics | 27 | `math.alg.rational-equations` | Rational Equations |
| 1438 | mathematics | 27 | `math.de.wronskian` | Wronskian |
| 1439 | mathematics | 27 | `math.de.stability-analysis` | Stability Analysis |
| 1440 | mathematics | 27 | `math.de.frobenius-method` | Frobenius Method |
| 1441 | mathematics | 27 | `math.de.legendre-equation` | Legendre's Equation |
| 1442 | mathematics | 27 | `math.de.eigenfunction-expansion` | Eigenfunction Expansion |
| 1443 | mathematics | 27 | `math.de.fourier-convergence` | Convergence of Fourier Series |
| 1444 | mathematics | 27 | `math.de.fourier-sine-cosine` | Fourier Sine and Cosine Series |
| 1445 | mathematics | 27 | `math.de.fourier-transform` | Fourier Transform |
| 1446 | mathematics | 27 | `math.de.separation-of-variables-pde` | Separation of Variables (PDE) |
| 1447 | mathematics | 27 | `math.linalg.row-reduction` | Row Reduction |
| 1448 | mathematics | 27 | `math.linalg.svd` | Singular Value Decomposition |
| 1449 | mathematics | 27 | `math.stats.standard-error` | Standard Error |
| 1450 | mathematics | 27 | `math.stats.estimator` | Estimator |
| 1451 | mathematics | 27 | `math.stats.confidence-interval` | Confidence Interval |
| 1452 | mathematics | 27 | `math.stats.hypothesis-testing` | Hypothesis Testing |
| 1453 | mathematics | 27 | `math.stats.multiple-regression` | Multiple Linear Regression |
| 1454 | mathematics | 27 | `math.cx.analytic-functions` | Analytic (Holomorphic) Functions |
| 1455 | mathematics | 27 | `math.num.splines` | Spline Interpolation |
| 1456 | mathematics | 27 | `math.num.numerical-integration` | Numerical Integration |
| 1457 | mathematics | 27 | `math.num.qr-algorithm` | QR Algorithm |
| 1458 | mathematics | 27 | `math.num.stiff-ode` | Stiff ODEs and Implicit Methods |
| 1459 | mathematics | 27 | `math.opt.quadratic-programming` | Quadratic Programming |
| 1460 | mathematics | 27 | `math.opt.semidefinite-programming` | Semidefinite Programming |
| 1461 | mathematics | 27 | `math.opt.integer-programming` | Integer Programming |
| 1462 | english | 27 | `eng.writing.editing-and-proofreading` | Editing and Proofreading |
| 1463 | english | 27 | `eng.linguistics.bilingualism-and-multilingualism` | Bilingualism and Multilingualism |
| 1464 | english | 27 | `eng.linguistics.computational-linguistics-intro` | Introduction to Computational Linguistics |
| 1465 | mathematics | 28 | `math.alg.quadratic-equation` | Quadratic Equation |
| 1466 | mathematics | 28 | `math.de.variation-of-parameters` | Variation of Parameters |
| 1467 | mathematics | 28 | `math.de.bessel-equation` | Bessel's Equation |
| 1468 | mathematics | 28 | `math.de.heat-equation` | Heat Equation |
| 1469 | mathematics | 28 | `math.de.wave-equation` | Wave Equation |
| 1470 | mathematics | 28 | `math.de.laplace-equation` | Laplace's Equation |
| 1471 | mathematics | 28 | `math.de.nonlinear-ode` | Nonlinear ODE |
| 1472 | mathematics | 28 | `math.linalg.row-echelon` | Row Echelon Form |
| 1473 | mathematics | 28 | `math.linalg.lu-factorization` | LU Factorization |
| 1474 | mathematics | 28 | `math.linalg.singular-values` | Singular Values |
| 1475 | mathematics | 28 | `math.linalg.pseudoinverse` | Moore-Penrose Pseudoinverse |
| 1476 | mathematics | 28 | `math.prob.characteristic-function` | Characteristic Function |
| 1477 | mathematics | 28 | `math.stats.bias-variance` | Bias-Variance Tradeoff |
| 1478 | mathematics | 28 | `math.stats.consistency` | Consistency of Estimators |
| 1479 | mathematics | 28 | `math.stats.mle` | Maximum Likelihood Estimation |
| 1480 | mathematics | 28 | `math.stats.method-of-moments` | Method of Moments |
| 1481 | mathematics | 28 | `math.stats.ci-mean` | Confidence Interval for a Mean |
| 1482 | mathematics | 28 | `math.stats.ci-proportion` | Confidence Interval for a Proportion |
| 1483 | mathematics | 28 | `math.stats.test-statistic` | Test Statistic |
| 1484 | mathematics | 28 | `math.stats.type-errors` | Type I and Type II Errors |
| 1485 | mathematics | 28 | `math.stats.z-test` | z-Test |
| 1486 | mathematics | 28 | `math.stats.t-test` | t-Test |
| 1487 | mathematics | 28 | `math.stats.chi-squared-test` | Chi-Squared Test |
| 1488 | mathematics | 28 | `math.stats.anova` | Analysis of Variance |
| 1489 | mathematics | 28 | `math.stats.nonparametric` | Nonparametric Tests |
| 1490 | mathematics | 28 | `math.stats.sufficient-statistic` | Sufficient Statistic |
| 1491 | mathematics | 28 | `math.cx.power-series-cx` | Power Series in ℂ |
| 1492 | mathematics | 28 | `math.cx.complex-integration` | Complex Line Integral |
| 1493 | mathematics | 28 | `math.cx.singularities` | Singularities |
| 1494 | mathematics | 28 | `math.cx.conformal-mapping` | Conformal Mapping |
| 1495 | mathematics | 28 | `math.num.svd` | SVD (Numerical) |
| 1496 | mathematics | 28 | `math.opt.pca` | Principal Component Analysis |
| 1497 | english | 28 | `eng.writing.essay-structure` | Essay Structure |
| 1498 | english | 28 | `eng.linguistics.translation-studies-intro` | Introduction to Translation Studies |
| 1499 | mathematics | 29 | `math.nt.prime-number-theorem` | Prime Number Theorem |
| 1500 | mathematics | 29 | `math.alg.completing-the-square` | Completing the Square |
| 1501 | mathematics | 29 | `math.alg.polynomial-roots` | Polynomial Roots (Real and Complex) |
| 1502 | mathematics | 29 | `math.geom.conic-sections` | Conic Sections |
| 1503 | mathematics | 29 | `math.func.quadratic-function` | Quadratic Function |
| 1504 | mathematics | 29 | `math.de.harmonic-functions` | Harmonic Functions |
| 1505 | mathematics | 29 | `math.de.poisson-equation` | Poisson's Equation |
| 1506 | mathematics | 29 | `math.de.bifurcation` | Bifurcation Theory |
| 1507 | mathematics | 29 | `math.linalg.rank` | Rank |
| 1508 | mathematics | 29 | `math.linalg.null-space` | Null Space |
| 1509 | mathematics | 29 | `math.linalg.cholesky` | Cholesky Decomposition |
| 1510 | mathematics | 29 | `math.stats.p-value` | p-value |
| 1511 | mathematics | 29 | `math.stats.power` | Power of a Test |
| 1512 | mathematics | 29 | `math.stats.two-way-anova` | Two-Way ANOVA |
| 1513 | mathematics | 29 | `math.stats.bayesian-inference` | Bayesian Statistics |
| 1514 | mathematics | 29 | `math.stats.experimental-design` | Experimental Design |
| 1515 | mathematics | 29 | `math.stats.rao-blackwell` | Rao-Blackwell Theorem |
| 1516 | mathematics | 29 | `math.cx.harmonic-functions` | Harmonic Functions (Complex Analysis) |
| 1517 | mathematics | 29 | `math.cx.cauchy-theorem` | Cauchy's Theorem |
| 1518 | mathematics | 29 | `math.cx.identity-theorem` | Identity Theorem |
| 1519 | mathematics | 29 | `math.cx.poles` | Poles and Meromorphic Functions |
| 1520 | mathematics | 29 | `math.cx.essential-singularity` | Essential Singularity |
| 1521 | mathematics | 29 | `math.cx.laurent-series` | Laurent Series |
| 1522 | mathematics | 29 | `math.cx.mobius-transformation` | Möbius Transformation |
| 1523 | mathematics | 29 | `math.cx.riemann-mapping` | Riemann Mapping Theorem |
| 1524 | mathematics | 29 | `math.fnal.special-functions` | Special Functions |
| 1525 | mathematics | 29 | `math.num.lu-factorization` | LU Factorization (Numerical) |
| 1526 | english | 29 | `eng.writing.thesis-statements` | Thesis Statements |
| 1527 | english | 29 | `eng.composition.audience-and-purpose` | Audience and Purpose |
| 1528 | mathematics | 30 | `math.alg.quadratic-formula` | Quadratic Formula |
| 1529 | mathematics | 30 | `math.alg.rational-root-theorem` | Rational Root Theorem |
| 1530 | mathematics | 30 | `math.alg.fundamental-theorem-algebra` | Fundamental Theorem of Algebra |
| 1531 | mathematics | 30 | `math.alg.polynomial-inequality` | Polynomial Inequality |
| 1532 | mathematics | 30 | `math.alg.vietas-formulas` | Vieta's Formulas |
| 1533 | mathematics | 30 | `math.geom.parabola` | Parabola |
| 1534 | mathematics | 30 | `math.geom.ellipse` | Ellipse |
| 1535 | mathematics | 30 | `math.geom.hyperbola` | Hyperbola |
| 1536 | mathematics | 30 | `math.func.vertex-form` | Vertex Form of a Quadratic |
| 1537 | mathematics | 30 | `math.func.polynomial-function` | Polynomial Function |
| 1538 | mathematics | 30 | `math.calc.partial-fractions` | Partial Fraction Decomposition |
| 1539 | mathematics | 30 | `math.de.higher-order-ode` | Higher-Order Linear ODE |
| 1540 | mathematics | 30 | `math.de.greens-function` | Green's Function |
| 1541 | mathematics | 30 | `math.de.chaos` | Chaotic Dynamics |
| 1542 | mathematics | 30 | `math.linalg.rank-nullity` | Rank-Nullity Theorem |
| 1543 | mathematics | 30 | `math.linalg.eigenspace` | Eigenspace |
| 1544 | mathematics | 30 | `math.stats.conjugate-prior` | Conjugate Prior |
| 1545 | mathematics | 30 | `math.stats.credible-interval` | Credible Interval |
| 1546 | mathematics | 30 | `math.disc.linear-recurrence` | Linear Recurrence |
| 1547 | mathematics | 30 | `math.cx.cauchy-goursat` | Cauchy-Goursat Theorem |
| 1548 | mathematics | 30 | `math.cx.cauchy-integral-formula` | Cauchy Integral Formula |
| 1549 | mathematics | 30 | `math.cx.analytic-continuation` | Analytic Continuation |
| 1550 | mathematics | 30 | `math.cx.residue` | Residue |
| 1551 | mathematics | 30 | `math.num.cholesky` | Cholesky Factorization (Numerical) |
| 1552 | english | 30 | `eng.writing.citations-and-referencing` | Citations and Referencing |
| 1553 | english | 30 | `eng.composition.claim-evidence-reasoning` | Claim, Evidence, and Reasoning |
| 1554 | english | 30 | `eng.composition.rhetorical-appeals` | Rhetorical Appeals: Ethos, Pathos, Logos |
| 1555 | mathematics | 31 | `math.alg.discriminant` | Discriminant |
| 1556 | mathematics | 31 | `math.alg.complex-polynomial-roots` | Complex Roots of Polynomials |
| 1557 | mathematics | 31 | `math.alg.rational-inequality` | Rational Inequality |
| 1558 | mathematics | 31 | `math.func.end-behavior` | End Behavior |
| 1559 | mathematics | 31 | `math.func.rational-root` | Real Roots of Polynomials |
| 1560 | mathematics | 31 | `math.func.rational-function` | Rational Function |
| 1561 | mathematics | 31 | `math.de.char-equation` | Characteristic Equation |
| 1562 | mathematics | 31 | `math.de.inverse-laplace` | Inverse Laplace Transform |
| 1563 | mathematics | 31 | `math.linalg.diagonalization` | Diagonalization |
| 1564 | mathematics | 31 | `math.cx.higher-derivatives` | Derivatives of Holomorphic Functions |
| 1565 | mathematics | 31 | `math.cx.morera-theorem` | Morera's Theorem |
| 1566 | mathematics | 31 | `math.cx.residue-theorem` | Residue Theorem |
| 1567 | mathematics | 31 | `math.cx.maximum-modulus` | Maximum Modulus Principle |
| 1568 | mathematics | 31 | `math.cx.riemann-surface` | Riemann Surface |
| 1569 | mathematics | 31 | `math.cx.riemann-zeta` | Riemann Zeta Function |
| 1570 | english | 31 | `eng.composition.argumentation-basics` | Argumentation Basics |
| 1571 | english | 31 | `eng.composition.rhetorical-devices` | Rhetorical Devices |
| 1572 | mathematics | 32 | `math.nt.riemann-hypothesis` | Riemann Hypothesis |
| 1573 | mathematics | 32 | `math.func.vertical-asymptote` | Vertical Asymptote |
| 1574 | mathematics | 32 | `math.func.horizontal-asymptote` | Horizontal Asymptote |
| 1575 | mathematics | 32 | `math.de.undetermined-coefficients` | Method of Undetermined Coefficients |
| 1576 | mathematics | 32 | `math.de.laplace-ode` | Solving ODEs with Laplace Transform |
| 1577 | mathematics | 32 | `math.de.systems-matrix-method` | Matrix Method for Linear Systems |
| 1578 | mathematics | 32 | `math.linalg.matrix-exponential` | Matrix Exponential |
| 1579 | mathematics | 32 | `math.linalg.jordan-form` | Jordan Normal Form |
| 1580 | mathematics | 32 | `math.cx.liouville-theorem` | Liouville's Theorem |
| 1581 | mathematics | 32 | `math.cx.real-integral-residues` | Evaluating Real Integrals via Residues |
| 1582 | mathematics | 32 | `math.cx.argument-principle` | Argument Principle |
| 1583 | english | 32 | `eng.composition.counterargument-and-rebuttal` | Counterargument and Rebuttal |
| 1584 | english | 32 | `eng.composition.logical-fallacies` | Logical Fallacies |
| 1585 | english | 32 | `eng.composition.figurative-language-in-composition` | Figurative Language in Composition |
| 1586 | english | 32 | `eng.composition.rhetorical-analysis` | Rhetorical Analysis |
| 1587 | mathematics | 33 | `math.de.harmonic-oscillator` | Harmonic Oscillator |
| 1588 | mathematics | 33 | `math.cx.fundamental-theorem-algebra` | Fundamental Theorem of Algebra (Complex Analysis) |
| 1589 | mathematics | 33 | `math.cx.rouche-theorem` | Rouché's Theorem |
| 1590 | english | 33 | `eng.composition.style-voice-and-tone` | Style, Voice, and Tone |
| 1591 | english | 33 | `eng.composition.persuasive-techniques` | Advanced Persuasive Techniques |
| 1592 | english | 33 | `eng.composition.comparative-essay-writing` | Comparative Essay Writing |
| 1593 | english | 33 | `eng.composition.research-paper-writing` | Research Paper Writing |
| 1594 | mathematics | 34 | `math.de.resonance` | Resonance |
| 1595 | english | 34 | `eng.composition.academic-writing-conventions` | Academic Writing Conventions |
| 1596 | english | 35 | `eng.composition.plagiarism-and-citation-ethics` | Plagiarism and Citation Ethics |
| 1597 | english | 35 | `eng.composition.editing-for-style` | Editing for Style |
| 1598 | english | 35 | `eng.communication.academic-writing-advanced` | Advanced Academic Writing |
| 1599 | english | 36 | `eng.communication.research-methodology-writing` | Writing Research Methodology |
| 1600 | english | 36 | `eng.communication.technical-writing` | Technical Writing |
| 1601 | english | 36 | `eng.communication.business-writing` | Business Writing |
| 1602 | english | 37 | `eng.communication.professional-communication` | Professional Communication |
| 1603 | english | 37 | `eng.communication.presentation-design` | Presentation Design |
| 1604 | english | 37 | `eng.communication.editing-for-publication` | Editing for Publication |
| 1605 | english | 38 | `eng.communication.negotiation-language` | Negotiation Language |
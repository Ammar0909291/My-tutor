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

Total queued: **1661** (= 1,775 KG concepts − 114 already `READY`).

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
| 240 | physics | 7 | `phys.mech.friction` | Friction Forces |
| 241 | physics | 7 | `phys.mech.tension` | Tension in Strings and Ropes |
| 242 | physics | 7 | `phys.mech.normal-force` | Normal Force and Constraint Forces |
| 243 | physics | 7 | `phys.mech.kinetic-energy` | Kinetic Energy |
| 244 | physics | 7 | `phys.mech.potential-energy` | Potential Energy |
| 245 | physics | 7 | `phys.mech.power` | Power |
| 246 | physics | 7 | `phys.mech.impulse` | Impulse and Momentum Change |
| 247 | physics | 7 | `phys.mech.center-of-mass` | Center of Mass |
| 248 | physics | 7 | `phys.mech.angular-kinematics` | Angular Kinematics |
| 249 | physics | 7 | `phys.mech.gravitational-field` | Gravitational Field and Field Lines |
| 250 | physics | 7 | `phys.mech.stress-strain` | Stress, Strain, and Elastic Moduli |
| 251 | physics | 7 | `phys.mech.buoyancy` | Buoyancy and Archimedes' Principle |
| 252 | physics | 7 | `phys.mech.surface-tension` | Surface Tension and Capillarity |
| 253 | physics | 7 | `phys.therm.first-law` | First Law of Thermodynamics |
| 254 | physics | 7 | `phys.wave.shm` | Simple Harmonic Motion |
| 255 | physics | 7 | `phys.opt.diffraction` | Diffraction of Light |
| 256 | physics | 7 | `phys.em.dielectrics` | Dielectrics and Polarization |
| 257 | physics | 7 | `phys.em.energy-capacitor` | Energy Stored in a Capacitor |
| 258 | physics | 7 | `phys.em.resistivity` | Resistivity and Conductivity |
| 259 | physics | 7 | `phys.em.dc-circuits` | Series and Parallel Circuits |
| 260 | physics | 7 | `phys.em.electrical-power` | Electrical Power and Joule Heating |
| 261 | physics | 7 | `phys.em.solenoid` | Magnetic Field of a Solenoid and Toroid |
| 262 | physics | 7 | `phys.em.mutual-inductance` | Mutual Inductance and Transformers |
| 263 | physics | 7 | `phys.em.ac-basics` | Alternating Current: Peak and RMS Values |
| 264 | physics | 7 | `phys.em.maxwells-equations` | Maxwell's Equations and Displacement Current |
| 265 | english | 7 | `eng.phonics.syllable-types` | Syllable Types |
| 266 | english | 7 | `eng.phonetics.intonation-patterns` | Intonation Patterns |
| 267 | chemistry | 7 | `chem.atomic.electronic-config` | Electronic Configuration |
| 268 | chemistry | 7 | `chem.atomic.quantum-mech-model` | Quantum Mechanical Model |
| 269 | chemistry | 7 | `chem.equil.kc-kp` | Equilibrium Constants Kc and Kp |
| 270 | chemistry | 7 | `chem.equil.kw-ph` | Water Ionization and pH |
| 271 | chemistry | 7 | `chem.kinet.catalysis` | Catalysis |
| 272 | biology | 7 | `bio.cell.mitosis` | Mitosis |
| 273 | biology | 7 | `bio.mol.enzymes` | Enzymes and Enzyme Kinetics |
| 274 | biology | 7 | `bio.evo.evidence-for-evolution` | Evidence for Evolution |
| 275 | biology | 7 | `bio.physio.circulatory-system` | Human Circulatory System |
| 276 | biology | 7 | `bio.physio.nervous-system` | Nervous System and Neural Control |
| 277 | biology | 7 | `bio.plant.mineral-nutrition` | Mineral Nutrition in Plants |
| 278 | biology | 7 | `bio.eco.biodiversity-conservation` | Biodiversity and Conservation |
| 279 | biology | 7 | `bio.micro.microbes-in-human-welfare` | Microbes in Human Welfare |
| 280 | biology | 7 | `bio.div.protist-diversity` | Eukaryotic Supergroups and Protist Diversity |
| 281 | biology | 7 | `bio.mol.signal-transduction-pathways` | Core Signal Transduction Pathways |
| 282 | computer_science | 7 | `cs.algo.backtracking` | Backtracking |
| 283 | computer_science | 7 | `cs.prog.operators-expressions` | Operators and Expressions |
| 284 | computer_science | 7 | `cs.net.cloud-computing` | Cloud Computing |
| 285 | computer_science | 7 | `cs.sec.network-web-security` | Network and Web Security |
| 286 | computer_science | 7 | `cs.web.client-server-model` | The Client-Server Model |
| 287 | computer_science | 7 | `cs.theory.turing-machines` | Turing Machines |
| 288 | mathematics | 8 | `math.found.proof` | Mathematical Proof |
| 289 | mathematics | 8 | `math.found.union` | Union |
| 290 | mathematics | 8 | `math.found.intersection` | Intersection |
| 291 | mathematics | 8 | `math.found.set-difference` | Set Difference |
| 292 | mathematics | 8 | `math.found.complement` | Set Complement |
| 293 | mathematics | 8 | `math.found.venn-diagram` | Venn Diagram |
| 294 | mathematics | 8 | `math.found.equivalence-relation` | Equivalence Relation |
| 295 | mathematics | 8 | `math.found.partial-order` | Partial Order |
| 296 | mathematics | 8 | `math.found.cardinality` | Cardinality |
| 297 | mathematics | 8 | `math.geom.polygon-angle-sum` | Polygon Angle Sum |
| 298 | mathematics | 8 | `math.geom.parallelogram` | Parallelogram |
| 299 | mathematics | 8 | `math.geom.trapezoid` | Trapezoid |
| 300 | mathematics | 8 | `math.geom.area` | Area |
| 301 | mathematics | 8 | `math.geom.volume` | Volume |
| 302 | mathematics | 8 | `math.geom.platonic-solids` | Platonic Solids |
| 303 | mathematics | 8 | `math.func.function-concept` | Function |
| 304 | mathematics | 8 | `math.prob.conditional-probability` | Conditional Probability |
| 305 | mathematics | 8 | `math.abst.binary-operation` | Binary Operation |
| 306 | mathematics | 8 | `math.meas.convergence-theorems` | Convergence Theorems |
| 307 | mathematics | 8 | `math.meas.lp-space` | Lᵖ Spaces |
| 308 | mathematics | 8 | `math.meas.product-measure` | Product Measure and Fubini's Theorem |
| 309 | mathematics | 8 | `math.meas.radon-nikodym` | Radon-Nikodym Theorem |
| 310 | mathematics | 8 | `math.fnal.convolution` | Convolution |
| 311 | mathematics | 8 | `math.graph.minimum-spanning-tree` | Minimum Spanning Tree |
| 312 | mathematics | 8 | `math.graph.random-graph` | Random Graphs |
| 313 | mathematics | 8 | `math.cat.category` | Category |
| 314 | physics | 8 | `phys.mech.inclined-plane` | Motion on Inclined Planes |
| 315 | physics | 8 | `phys.mech.work-energy-theorem` | Work-Energy Theorem |
| 316 | physics | 8 | `phys.mech.conservation-of-energy` | Conservation of Mechanical Energy |
| 317 | physics | 8 | `phys.mech.conservation-of-momentum` | Conservation of Linear Momentum |
| 318 | physics | 8 | `phys.mech.torque` | Torque |
| 319 | physics | 8 | `phys.mech.gravitational-potential` | Gravitational Potential Energy |
| 320 | physics | 8 | `phys.therm.thermodynamic-processes` | Thermodynamic Processes |
| 321 | physics | 8 | `phys.wave.shm-energy` | Energy in Simple Harmonic Motion |
| 322 | physics | 8 | `phys.wave.pendulum` | Simple Pendulum |
| 323 | physics | 8 | `phys.wave.spring-mass` | Spring-Mass System |
| 324 | physics | 8 | `phys.opt.single-slit` | Single-Slit Diffraction |
| 325 | physics | 8 | `phys.em.kirchhoffs-laws` | Kirchhoff's Current and Voltage Laws |
| 326 | physics | 8 | `phys.em.emf` | EMF, Internal Resistance, and Terminal Voltage |
| 327 | physics | 8 | `phys.em.lc-circuits` | LC Oscillations and Resonance |
| 328 | physics | 8 | `phys.em.electromagnetic-waves` | Electromagnetic Waves and the EM Spectrum |
| 329 | english | 8 | `eng.phonics.decoding-fluency` | Decoding Fluency |
| 330 | english | 8 | `eng.phonetics.connected-speech` | Connected Speech |
| 331 | english | 8 | `eng.phonetics.prosody` | Prosody |
| 332 | english | 8 | `eng.writing.spelling-strategies` | Spelling Strategies |
| 333 | chemistry | 8 | `chem.period.modern-periodic-law` | Modern Periodic Law and Table |
| 334 | chemistry | 8 | `chem.equil.le-chatelier` | Le Chatelier's Principle |
| 335 | chemistry | 8 | `chem.equil.acids-bases` | Acid–Base Theories |
| 336 | chemistry | 8 | `chem.equil.solubility` | Solubility Equilibria |
| 337 | chemistry | 8 | `chem.equil.complex-equil` | Complex Ion Equilibria |
| 338 | chemistry | 8 | `chem.surface.adsorption` | Adsorption |
| 339 | biology | 8 | `bio.cell.meiosis` | Meiosis |
| 340 | biology | 8 | `bio.mol.dna-replication` | DNA Replication |
| 341 | biology | 8 | `bio.evo.natural-selection` | Natural Selection and Darwinism |
| 342 | biology | 8 | `bio.physio.digestive-system` | Human Digestive System |
| 343 | biology | 8 | `bio.physio.excretory-system` | Excretory System and Osmoregulation |
| 344 | biology | 8 | `bio.physio.endocrine-system` | Endocrine System |
| 345 | biology | 8 | `bio.physio.musculoskeletal-system` | Locomotion and Musculoskeletal System |
| 346 | biology | 8 | `bio.physio.immune-system-intro` | Immune System Overview |
| 347 | biology | 8 | `bio.plant.photosynthesis` | Photosynthesis |
| 348 | biology | 8 | `bio.plant.plant-growth-hormones` | Plant Growth and Hormones |
| 349 | biology | 8 | `bio.repro.asexual-reproduction` | Asexual Reproduction |
| 350 | biology | 8 | `bio.eco.environmental-issues` | Environmental Issues and Pollution |
| 351 | biology | 8 | `bio.div.cladistics-phylogenetic-thinking` | Cladistics and Phylogenetic Thinking |
| 352 | computer_science | 8 | `cs.algo.np-completeness` | NP-Completeness and Intractability |
| 353 | computer_science | 8 | `cs.prog.type-conversion` | Type Conversion and Casting |
| 354 | computer_science | 8 | `cs.control.conditionals` | Conditional Statements |
| 355 | computer_science | 8 | `cs.sec.data-protection-privacy` | Data Protection and Privacy |
| 356 | computer_science | 8 | `cs.web.html-css-basics` | HTML and CSS Basics |
| 357 | mathematics | 9 | `math.found.direct-proof` | Direct Proof |
| 358 | mathematics | 9 | `math.found.proof-by-contradiction` | Proof by Contradiction |
| 359 | mathematics | 9 | `math.found.proof-by-contrapositive` | Proof by Contrapositive |
| 360 | mathematics | 9 | `math.found.proof-by-cases` | Proof by Cases |
| 361 | mathematics | 9 | `math.found.existence-proof` | Existence Proof |
| 362 | mathematics | 9 | `math.found.writing-mathematics` | Writing Mathematics |
| 363 | mathematics | 9 | `math.found.theorem` | Theorem |
| 364 | mathematics | 9 | `math.found.conjecture` | Conjecture |
| 365 | mathematics | 9 | `math.found.equivalence-class` | Equivalence Class |
| 366 | mathematics | 9 | `math.found.total-order` | Total Order |
| 367 | mathematics | 9 | `math.found.hasse-diagram` | Hasse Diagram |
| 368 | mathematics | 9 | `math.found.finite-set` | Finite Set |
| 369 | mathematics | 9 | `math.geom.circle-area` | Area of a Circle |
| 370 | mathematics | 9 | `math.geom.geometric-proof` | Geometric Proof |
| 371 | mathematics | 9 | `math.geom.surface-area` | Surface Area |
| 372 | mathematics | 9 | `math.func.domain-range` | Domain and Range |
| 373 | mathematics | 9 | `math.func.function-notation` | Function Notation |
| 374 | mathematics | 9 | `math.func.injectivity` | Injective (One-to-One) Function |
| 375 | mathematics | 9 | `math.func.surjectivity` | Surjective (Onto) Function |
| 376 | mathematics | 9 | `math.func.composition` | Composition of Functions |
| 377 | mathematics | 9 | `math.func.periodic-function` | Periodic Function |
| 378 | mathematics | 9 | `math.func.piecewise-function` | Piecewise-Defined Function |
| 379 | mathematics | 9 | `math.func.monotonic-function` | Monotonic Function |
| 380 | mathematics | 9 | `math.func.function-operations` | Operations on Functions |
| 381 | mathematics | 9 | `math.prob.total-probability` | Law of Total Probability |
| 382 | mathematics | 9 | `math.prob.independence` | Independence |
| 383 | mathematics | 9 | `math.prob.random-variable` | Random Variable |
| 384 | mathematics | 9 | `math.abst.group-theory` | Group |
| 385 | mathematics | 9 | `math.top.quotient-space` | Quotient Space |
| 386 | mathematics | 9 | `math.meas.l2-space` | L² Space |
| 387 | mathematics | 9 | `math.cat.morphism-types` | Types of Morphisms |
| 388 | mathematics | 9 | `math.cat.functor` | Functor |
| 389 | physics | 9 | `phys.mech.conservative-forces` | Conservative and Non-Conservative Forces |
| 390 | physics | 9 | `phys.mech.collisions-elastic` | Elastic Collisions |
| 391 | physics | 9 | `phys.mech.collisions-inelastic` | Inelastic Collisions |
| 392 | physics | 9 | `phys.mech.moment-of-inertia` | Moment of Inertia |
| 393 | physics | 9 | `phys.mech.equilibrium` | Static Equilibrium |
| 394 | physics | 9 | `phys.mech.orbital-mechanics` | Circular Orbital Mechanics |
| 395 | physics | 9 | `phys.mech.escape-velocity` | Escape Velocity |
| 396 | physics | 9 | `phys.mech.bernoulli` | Bernoulli's Equation and Fluid Flow |
| 397 | physics | 9 | `phys.therm.second-law` | Second Law of Thermodynamics |
| 398 | physics | 9 | `phys.therm.heat-engines` | Heat Engines and Efficiency |
| 399 | physics | 9 | `phys.wave.damped-oscillations` | Damped Oscillations |
| 400 | physics | 9 | `phys.em.wheatstone-bridge` | Wheatstone Bridge |
| 401 | physics | 9 | `phys.em.potentiometer` | Potentiometer |
| 402 | physics | 9 | `phys.em.rc-circuits` | RC Circuits: Charging and Discharging |
| 403 | physics | 9 | `phys.mod.photoelectric-effect` | Photoelectric Effect |
| 404 | physics | 9 | `phys.rel.postulates` | Postulates of Special Relativity |
| 405 | english | 9 | `eng.phonetics.rhythm-and-timing` | Rhythm and Timing |
| 406 | english | 9 | `eng.vocab.word-recognition` | Word Recognition |
| 407 | english | 9 | `eng.listening.active-listening` | Active Listening |
| 408 | english | 9 | `eng.speaking.oral-fluency` | Oral Fluency |
| 409 | chemistry | 9 | `chem.period.atomic-radius` | Atomic and Ionic Radius |
| 410 | chemistry | 9 | `chem.period.ionization-energy` | Ionization Energy |
| 411 | chemistry | 9 | `chem.period.electron-affinity` | Electron Affinity and Electronegativity |
| 412 | chemistry | 9 | `chem.period.valency` | Valency and Oxidation State |
| 413 | chemistry | 9 | `chem.bond.metallic-bonding` | Metallic Bonding |
| 414 | chemistry | 9 | `chem.equil.weak-acid` | Weak Acid and Base Equilibria |
| 415 | chemistry | 9 | `chem.surface.heterogeneous-cat` | Mechanism of Heterogeneous Catalysis |
| 416 | chemistry | 9 | `chem.sblock.hydrogen` | Hydrogen |
| 417 | chemistry | 9 | `chem.anal.gravimetric` | Gravimetric Analysis |
| 418 | chemistry | 9 | `chem.anal.chromatography` | Chromatography |
| 419 | biology | 9 | `bio.mol.transcription` | Transcription |
| 420 | biology | 9 | `bio.gen.mendelian-genetics` | Mendelian Genetics |
| 421 | biology | 9 | `bio.plant.plant-respiration` | Respiration in Plants |
| 422 | biology | 9 | `bio.repro.sexual-reproduction-plants` | Sexual Reproduction in Flowering Plants |
| 423 | biology | 9 | `bio.repro.human-reproductive-system` | Human Reproductive System |
| 424 | biology | 9 | `bio.immuno.innate-adaptive-immunity` | Innate and Adaptive Immunity |
| 425 | biology | 9 | `bio.micro.viral-replication` | Viral Replication and Lifecycle |
| 426 | biology | 9 | `bio.micro.horizontal-gene-transfer` | Horizontal Gene Transfer |
| 427 | computer_science | 9 | `cs.prog.input-output` | Input, Output and Formatting |
| 428 | computer_science | 9 | `cs.control.loops` | Iteration — while and for Loops |
| 429 | computer_science | 9 | `cs.web.rest-apis` | REST APIs |
| 430 | computer_science | 9 | `cs.theory.complexity-classes` | Computational Complexity Classes |
| 431 | mathematics | 10 | `math.found.uniqueness-proof` | Uniqueness Proof |
| 432 | mathematics | 10 | `math.found.lemma` | Lemma |
| 433 | mathematics | 10 | `math.found.corollary` | Corollary |
| 434 | mathematics | 10 | `math.found.natural-numbers` | Natural Numbers |
| 435 | mathematics | 10 | `math.func.bijection` | Bijective Function |
| 436 | mathematics | 10 | `math.func.step-function` | Step Function |
| 437 | mathematics | 10 | `math.prob.bayes-theorem` | Bayes' Theorem |
| 438 | mathematics | 10 | `math.prob.discrete-rv` | Discrete Random Variable |
| 439 | mathematics | 10 | `math.prob.cdf` | Cumulative Distribution Function |
| 440 | mathematics | 10 | `math.abst.group-operation` | Group Operation Examples |
| 441 | mathematics | 10 | `math.abst.subgroup` | Subgroup |
| 442 | mathematics | 10 | `math.abst.cyclic-group` | Cyclic Group |
| 443 | mathematics | 10 | `math.abst.group-order` | Order of Group and Elements |
| 444 | mathematics | 10 | `math.abst.group-homomorphism` | Group Homomorphism |
| 445 | mathematics | 10 | `math.abst.group-action` | Group Action |
| 446 | mathematics | 10 | `math.abst.symmetric-group` | Symmetric Group |
| 447 | mathematics | 10 | `math.abst.ring-theory` | Ring |
| 448 | mathematics | 10 | `math.abst.group-inverse` | Group Inverse |
| 449 | mathematics | 10 | `math.top.fundamental-group` | Fundamental Group |
| 450 | mathematics | 10 | `math.top.homology` | Homology |
| 451 | mathematics | 10 | `math.cat.natural-transformation` | Natural Transformation |
| 452 | physics | 10 | `phys.mech.rotational-dynamics` | Rotational Dynamics |
| 453 | physics | 10 | `phys.mech.keplers-laws` | Kepler's Laws of Planetary Motion |
| 454 | physics | 10 | `phys.mech.satellites` | Artificial Satellites and Geostationary Orbits |
| 455 | physics | 10 | `phys.mech.viscosity` | Viscosity and Stokes' Law |
| 456 | physics | 10 | `phys.mech.generalized-coordinates` | Generalized Coordinates and Configuration Space |
| 457 | physics | 10 | `phys.therm.entropy` | Entropy and Disorder |
| 458 | physics | 10 | `phys.wave.forced-oscillations` | Forced Oscillations and Resonance |
| 459 | physics | 10 | `phys.mod.photons` | Photons and Quantization of Light |
| 460 | physics | 10 | `phys.rel.simultaneity` | Relativity of Simultaneity |
| 461 | english | 10 | `eng.phonetics.accents-and-dialects` | Accents and Dialects |
| 462 | english | 10 | `eng.vocab.context-clues` | Context Clues |
| 463 | english | 10 | `eng.vocab.synonyms-antonyms` | Synonyms and Antonyms |
| 464 | english | 10 | `eng.vocab.word-families` | Word Families |
| 465 | english | 10 | `eng.grammar.word-classes-overview` | Overview of Word Classes |
| 466 | english | 10 | `eng.listening.listening-for-gist` | Listening for Gist |
| 467 | english | 10 | `eng.listening.distinguishing-sounds-in-speech` | Distinguishing Sounds in Speech |
| 468 | english | 10 | `eng.speaking.pronunciation-in-conversation` | Pronunciation in Conversation |
| 469 | chemistry | 10 | `chem.period.periodic-properties` | Periodic Trends Overview |
| 470 | chemistry | 10 | `chem.bond.ionic-bonding` | Ionic Bonding |
| 471 | chemistry | 10 | `chem.bond.covalent-bonding` | Covalent Bonding |
| 472 | chemistry | 10 | `chem.equil.buffer` | Buffer Solutions |
| 473 | chemistry | 10 | `chem.equil.hydrolysis` | Salt Hydrolysis |
| 474 | chemistry | 10 | `chem.equil.titration` | Acid–Base Titrations |
| 475 | chemistry | 10 | `chem.redox.oxidation-state` | Oxidation State |
| 476 | biology | 10 | `bio.mol.translation-genetic-code` | Translation and the Genetic Code |
| 477 | biology | 10 | `bio.gen.gene-interactions` | Gene Interactions and Extensions of Mendelism |
| 478 | biology | 10 | `bio.repro.fertilisation-development` | Fertilisation and Embryonic Development |
| 479 | biology | 10 | `bio.immuno.antibody-structure-function` | Antibody Structure and Function |
| 480 | biology | 10 | `bio.div.plant-diversity-alternation-of-generations` | Plant Diversity and Alternation of Generations |
| 481 | biology | 10 | `bio.immuno.mhc-antigen-presentation` | MHC and Antigen Presentation |
| 482 | computer_science | 10 | `cs.prog.exception-handling` | Exception Handling |
| 483 | computer_science | 10 | `cs.control.nested-control-patterns` | Nested Control Flow Patterns |
| 484 | computer_science | 10 | `cs.data.strings` | Strings |
| 485 | mathematics | 11 | `math.found.proof-by-induction` | Mathematical Induction |
| 486 | mathematics | 11 | `math.found.well-ordering-principle` | Well-Ordering Principle |
| 487 | mathematics | 11 | `math.found.countable-set` | Countable Set |
| 488 | mathematics | 11 | `math.found.integers` | Integers |
| 489 | mathematics | 11 | `math.arith.counting` | Counting |
| 490 | mathematics | 11 | `math.func.inverse-functions` | Inverse Functions |
| 491 | mathematics | 11 | `math.seq.sequence` | Sequence |
| 492 | mathematics | 11 | `math.prob.bayesian-inference` | Bayesian Inference |
| 493 | mathematics | 11 | `math.prob.pmf` | Probability Mass Function |
| 494 | mathematics | 11 | `math.prob.quantile` | Quantile |
| 495 | mathematics | 11 | `math.prob.distribution` | Probability Distribution |
| 496 | mathematics | 11 | `math.abst.coset` | Coset |
| 497 | mathematics | 11 | `math.abst.group-isomorphism` | Group Isomorphism |
| 498 | mathematics | 11 | `math.abst.burnside-lemma` | Burnside's Lemma |
| 499 | mathematics | 11 | `math.abst.ideal` | Ideal |
| 500 | mathematics | 11 | `math.abst.ring-homomorphism` | Ring Homomorphism |
| 501 | mathematics | 11 | `math.abst.polynomial-ring` | Polynomial Ring |
| 502 | mathematics | 11 | `math.top.van-kampen` | Seifert-van Kampen Theorem |
| 503 | mathematics | 11 | `math.top.covering-space` | Covering Space |
| 504 | mathematics | 11 | `math.top.euler-characteristic` | Euler Characteristic |
| 505 | mathematics | 11 | `math.top.cohomology` | Cohomology |
| 506 | mathematics | 11 | `math.cat.functor-category` | Functor Category |
| 507 | mathematics | 11 | `math.cat.limits` | Limits and Colimits |
| 508 | mathematics | 11 | `math.cat.adjunction` | Adjunction |
| 509 | physics | 11 | `phys.mech.angular-momentum` | Angular Momentum |
| 510 | physics | 11 | `phys.mech.rolling-motion` | Rolling Without Slipping |
| 511 | physics | 11 | `phys.mech.euler-lagrange-equation` | The Euler-Lagrange Equation and Hamilton's Principle |
| 512 | physics | 11 | `phys.therm.carnot-cycle` | Carnot Cycle |
| 513 | physics | 11 | `phys.therm.third-law` | Third Law of Thermodynamics |
| 514 | physics | 11 | `phys.mod.compton-effect` | Compton Scattering |
| 515 | physics | 11 | `phys.mod.de-broglie` | de Broglie Hypothesis — Matter Waves |
| 516 | physics | 11 | `phys.mod.bohr-model` | Bohr Model of the Hydrogen Atom |
| 517 | physics | 11 | `phys.mod.x-rays` | X-Rays and Their Properties |
| 518 | physics | 11 | `phys.rel.time-dilation` | Time Dilation |
| 519 | physics | 11 | `phys.stat.probability-basics` | Probability Distributions in Physics |
| 520 | english | 11 | `eng.vocab.compound-words` | Compound Words |
| 521 | english | 11 | `eng.vocab.prefixes` | Prefixes |
| 522 | english | 11 | `eng.vocab.suffixes` | Suffixes |
| 523 | english | 11 | `eng.vocab.homonyms-homophones` | Homonyms and Homophones |
| 524 | english | 11 | `eng.vocab.connotation-denotation` | Connotation and Denotation |
| 525 | english | 11 | `eng.grammar.nouns` | Nouns |
| 526 | english | 11 | `eng.grammar.verbs` | Verbs |
| 527 | english | 11 | `eng.grammar.prepositions` | Prepositions |
| 528 | english | 11 | `eng.grammar.conjunctions` | Conjunctions |
| 529 | english | 11 | `eng.grammar.interjections` | Interjections |
| 530 | english | 11 | `eng.reading.print-to-meaning` | From Print to Meaning |
| 531 | english | 11 | `eng.listening.listening-for-detail` | Listening for Detail |
| 532 | english | 11 | `eng.speaking.conversation-skills` | Conversation Skills |
| 533 | chemistry | 11 | `chem.bond.vsepr` | VSEPR Theory |
| 534 | chemistry | 11 | `chem.bond.hybridization` | Hybridization |
| 535 | chemistry | 11 | `chem.bond.resonance` | Resonance Structures |
| 536 | chemistry | 11 | `chem.bond.bond-parameters` | Bond Parameters |
| 537 | chemistry | 11 | `chem.bond.coordinate-bond` | Coordinate and Dative Bonding |
| 538 | chemistry | 11 | `chem.redox.balancing` | Balancing Redox Equations |
| 539 | chemistry | 11 | `chem.solid.crystal-systems` | Crystal Systems |
| 540 | chemistry | 11 | `chem.sblock.alkali` | Alkali Metals |
| 541 | chemistry | 11 | `chem.pblock.group13` | Group 13 — Boron Family |
| 542 | chemistry | 11 | `chem.pblock.group14` | Group 14 — Carbon Family |
| 543 | chemistry | 11 | `chem.pblock.group15` | Group 15 — Nitrogen Family |
| 544 | chemistry | 11 | `chem.pblock.group16` | Group 16 — Oxygen Family |
| 545 | chemistry | 11 | `chem.pblock.group17` | Group 17 — Halogens |
| 546 | chemistry | 11 | `chem.pblock.group18` | Group 18 — Noble Gases |
| 547 | chemistry | 11 | `chem.dblock.general` | Transition Metals — General Properties |
| 548 | chemistry | 11 | `chem.org.iupac` | IUPAC Nomenclature |
| 549 | biology | 11 | `bio.mol.gene-regulation` | Regulation of Gene Expression |
| 550 | biology | 11 | `bio.gen.chromosomal-theory-linkage` | Chromosomal Theory and Linkage |
| 551 | biology | 11 | `bio.repro.reproductive-health` | Reproductive Health and Contraception |
| 552 | biology | 11 | `bio.dev.gametogenesis-fertilisation-dev` | Fundamentals of Animal Development |
| 553 | biology | 11 | `bio.immuno.vaccination-immunisation` | Vaccination and Immunisation |
| 554 | computer_science | 11 | `cs.data.lists` | Lists |
| 555 | computer_science | 11 | `cs.func.functions` | Functions |
| 556 | mathematics | 12 | `math.found.strong-induction` | Strong Induction |
| 557 | mathematics | 12 | `math.found.uncountable-set` | Uncountable Set |
| 558 | mathematics | 12 | `math.found.rational-numbers` | Rational Numbers |
| 559 | mathematics | 12 | `math.arith.counting-sequence` | Counting Sequence |
| 560 | mathematics | 12 | `math.arith.subitizing` | Subitizing |
| 561 | mathematics | 12 | `math.arith.place-value` | Place Value |
| 562 | mathematics | 12 | `math.arith.number-line` | Number Line |
| 563 | mathematics | 12 | `math.seq.arithmetic-sequence` | Arithmetic Sequence |
| 564 | mathematics | 12 | `math.seq.geometric-sequence` | Geometric Sequence |
| 565 | mathematics | 12 | `math.seq.recursive-sequences` | Recursive Sequences |
| 566 | mathematics | 12 | `math.seq.series` | Series |
| 567 | mathematics | 12 | `math.prob.discrete-distributions` | Discrete Distributions |
| 568 | mathematics | 12 | `math.prob.joint-distribution` | Joint Distribution |
| 569 | mathematics | 12 | `math.abst.lagrange-theorem` | Lagrange's Theorem |
| 570 | mathematics | 12 | `math.abst.normal-subgroup` | Normal Subgroup |
| 571 | mathematics | 12 | `math.abst.quotient-ring` | Quotient Ring |
| 572 | mathematics | 12 | `math.abst.prime-ideal` | Prime and Maximal Ideals |
| 573 | mathematics | 12 | `math.abst.euclidean-domain` | Euclidean Domain |
| 574 | mathematics | 12 | `math.cat.yoneda-lemma` | Yoneda Lemma |
| 575 | mathematics | 12 | `math.cat.equalizer` | Equalizer and Coequalizer |
| 576 | mathematics | 12 | `math.cat.pullback` | Pullback and Pushout |
| 577 | mathematics | 12 | `math.cat.monad` | Monad |
| 578 | mathematics | 12 | `math.cat.tensor-product` | Tensor Product (Categorical) |
| 579 | mathematics | 12 | `math.cat.topos` | Topos |
| 580 | physics | 12 | `phys.mech.conservation-of-angular-momentum` | Conservation of Angular Momentum |
| 581 | physics | 12 | `phys.mech.cyclic-coordinates-conservation-laws` | Cyclic Coordinates and Noether's Theorem |
| 582 | physics | 12 | `phys.mech.hamiltonian` | The Hamiltonian and Legendre Transform |
| 583 | physics | 12 | `phys.therm.refrigerators` | Refrigerators and Heat Pumps |
| 584 | physics | 12 | `phys.mod.wave-particle-duality` | Wave-Particle Duality |
| 585 | physics | 12 | `phys.mod.atomic-spectra` | Atomic Spectra and Energy Levels |
| 586 | physics | 12 | `phys.rel.length-contraction` | Length Contraction |
| 587 | physics | 12 | `phys.stat.boltzmann-factor` | Boltzmann Factor and Statistical Weight |
| 588 | english | 12 | `eng.vocab.roots-and-origins` | Greek and Latin Roots |
| 589 | english | 12 | `eng.vocab.multiple-meaning-words` | Multiple-Meaning Words |
| 590 | english | 12 | `eng.vocab.collocations` | Collocations |
| 591 | english | 12 | `eng.vocab.register-and-formality` | Register and Formality |
| 592 | english | 12 | `eng.grammar.pronouns` | Pronouns |
| 593 | english | 12 | `eng.grammar.adjectives` | Adjectives |
| 594 | english | 12 | `eng.grammar.articles-and-determiners` | Articles and Determiners |
| 595 | english | 12 | `eng.grammar.subject-and-predicate` | Subject and Predicate |
| 596 | english | 12 | `eng.grammar.present-tenses` | Present Tenses |
| 597 | english | 12 | `eng.reading.reading-fluency` | Reading Fluency |
| 598 | english | 12 | `eng.listening.following-instructions` | Following Spoken Instructions |
| 599 | english | 12 | `eng.listening.note-taking-while-listening` | Note-Taking While Listening |
| 600 | english | 12 | `eng.speaking.asking-and-answering-questions` | Asking and Answering Questions |
| 601 | english | 12 | `eng.speaking.storytelling-orally` | Oral Storytelling |
| 602 | english | 12 | `eng.speaking.non-verbal-communication` | Non-Verbal Communication |
| 603 | chemistry | 12 | `chem.bond.mo-theory` | Molecular Orbital Theory |
| 604 | chemistry | 12 | `chem.bond.polar-molecules` | Polarity and Dipole Moment |
| 605 | chemistry | 12 | `chem.thermo.bond-enthalpy` | Bond Enthalpy |
| 606 | chemistry | 12 | `chem.redox.disproportionation` | Disproportionation |
| 607 | chemistry | 12 | `chem.redox.activity-series` | Electrochemical Activity Series |
| 608 | chemistry | 12 | `chem.redox.titrations` | Redox Titrations |
| 609 | chemistry | 12 | `chem.solid.packing` | Close Packing and Efficiency |
| 610 | chemistry | 12 | `chem.solid.defects` | Crystal Defects |
| 611 | chemistry | 12 | `chem.solid.amorphous` | Amorphous Solids |
| 612 | chemistry | 12 | `chem.coord.werner` | Werner's Theory |
| 613 | chemistry | 12 | `chem.sblock.alkaline-earth` | Alkaline Earth Metals |
| 614 | chemistry | 12 | `chem.pblock.trends` | Trends Across p-Block |
| 615 | chemistry | 12 | `chem.dblock.first-row` | First-Row Transition Metals |
| 616 | chemistry | 12 | `chem.dblock.lanthanides` | Lanthanides and Actinides |
| 617 | chemistry | 12 | `chem.org.hybridization` | Carbon Hybridization |
| 618 | chemistry | 12 | `chem.org.purification` | Purification Techniques |
| 619 | chemistry | 12 | `chem.org.spectroscopy` | Introduction to Spectroscopy |
| 620 | biology | 12 | `bio.gen.pedigree-human-genetics` | Pedigree Analysis and Human Genetic Disorders |
| 621 | biology | 12 | `bio.gen.mutations` | Mutations |
| 622 | biology | 12 | `bio.dev.morphogenesis-differentiation` | Morphogenesis and Cell Differentiation |
| 623 | biology | 12 | `bio.immuno.immune-disorders` | Immune Disorders |
| 624 | biology | 12 | `bio.cell.apoptosis` | Apoptosis and Programmed Cell Death |
| 625 | biology | 12 | `bio.mol.epigenetics` | Epigenetics and Chromatin Regulation |
| 626 | biology | 12 | `bio.mol.noncoding-rna` | Non-coding RNA Biology |
| 627 | computer_science | 12 | `cs.data.tuples` | Tuples |
| 628 | computer_science | 12 | `cs.data.dictionaries` | Dictionaries |
| 629 | computer_science | 12 | `cs.func.scope-namespaces` | Scope and Namespaces |
| 630 | computer_science | 12 | `cs.file.text-files` | Text File Handling |
| 631 | computer_science | 12 | `cs.struct.linear-search` | Linear Search |
| 632 | computer_science | 12 | `cs.oop.oop-concepts` | Object-Oriented Programming Concepts |
| 633 | mathematics | 13 | `math.found.irrational-numbers` | Irrational Numbers |
| 634 | mathematics | 13 | `math.arith.ones-tens-hundreds` | Ones, Tens, Hundreds |
| 635 | mathematics | 13 | `math.arith.expanded-form` | Expanded Form |
| 636 | mathematics | 13 | `math.arith.number-base` | Number Base |
| 637 | mathematics | 13 | `math.arith.addition` | Addition |
| 638 | mathematics | 13 | `math.arith.ordering` | Ordering Numbers |
| 639 | mathematics | 13 | `math.seq.partial-sums` | Partial Sums |
| 640 | mathematics | 13 | `math.seq.arithmetic-series` | Arithmetic Series |
| 641 | mathematics | 13 | `math.seq.geometric-series` | Geometric Series |
| 642 | mathematics | 13 | `math.prob.marginal-distribution` | Marginal Distribution |
| 643 | mathematics | 13 | `math.prob.conditional-distribution` | Conditional Distribution |
| 644 | mathematics | 13 | `math.abst.quotient-group` | Quotient Group |
| 645 | mathematics | 13 | `math.abst.alternating-group` | Alternating Group |
| 646 | mathematics | 13 | `math.abst.pid` | Principal Ideal Domain |
| 647 | mathematics | 13 | `math.abst.field` | Field |
| 648 | mathematics | 13 | `math.cat.representable-functor` | Representable Functor |
| 649 | mathematics | 13 | `math.cat.higher-category` | Higher Category Theory |
| 650 | physics | 13 | `phys.mech.hamiltons-equations` | Hamilton's Equations of Motion |
| 651 | physics | 13 | `phys.mod.radioactivity` | Radioactivity: Alpha, Beta, Gamma Decay |
| 652 | physics | 13 | `phys.qm.wave-function` | Wave Function and Probability Interpretation |
| 653 | physics | 13 | `phys.rel.lorentz-transform` | Lorentz Transformations |
| 654 | physics | 13 | `phys.stat.partition-function` | Partition Function |
| 655 | physics | 13 | `phys.stat.maxwell-boltzmann` | Maxwell-Boltzmann Speed Distribution |
| 656 | english | 13 | `eng.vocab.word-formation-processes` | Word Formation Processes |
| 657 | english | 13 | `eng.vocab.idioms` | Idioms |
| 658 | english | 13 | `eng.vocab.phrasal-verbs` | Phrasal Verbs |
| 659 | english | 13 | `eng.vocab.etymology` | Etymology |
| 660 | english | 13 | `eng.vocab.thesaurus-and-dictionary-skills` | Thesaurus and Dictionary Skills |
| 661 | english | 13 | `eng.grammar.adverbs` | Adverbs |
| 662 | english | 13 | `eng.grammar.word-order` | Basic Word Order |
| 663 | english | 13 | `eng.grammar.past-tenses` | Past Tenses |
| 664 | english | 13 | `eng.grammar.future-tenses` | Future Tenses |
| 665 | english | 13 | `eng.grammar.modals` | Modal Verbs |
| 666 | english | 13 | `eng.grammar.gerunds-and-infinitives` | Gerunds and Infinitives |
| 667 | english | 13 | `eng.grammar.subject-verb-agreement` | Subject-Verb Agreement |
| 668 | english | 13 | `eng.reading.literal-comprehension` | Literal Comprehension |
| 669 | english | 13 | `eng.reading.skimming-and-scanning` | Skimming and Scanning |
| 670 | english | 13 | `eng.listening.listening-comprehension-strategies` | Listening Comprehension Strategies |
| 671 | english | 13 | `eng.speaking.discussion-skills` | Discussion Skills |
| 672 | english | 13 | `eng.communication.digital-communication` | Digital Communication |
| 673 | chemistry | 13 | `chem.bond.intermolecular` | Intermolecular Forces |
| 674 | chemistry | 13 | `chem.elect.galvanic-cell` | Galvanic Cell |
| 675 | chemistry | 13 | `chem.solid.ionic-solids` | Ionic Crystal Structures |
| 676 | chemistry | 13 | `chem.solid.properties` | Electrical and Magnetic Properties |
| 677 | chemistry | 13 | `chem.coord.nomenclature` | Nomenclature of Complexes |
| 678 | chemistry | 13 | `chem.coord.cft` | Crystal Field Theory |
| 679 | chemistry | 13 | `chem.coord.stability` | Stability Constants |
| 680 | chemistry | 13 | `chem.dblock.oxo-species` | Oxides and Oxyanions of Transition Metals |
| 681 | chemistry | 13 | `chem.org.isomerism` | Structural and Stereoisomerism |
| 682 | chemistry | 13 | `chem.org.electronic-effects` | Inductive and Mesomeric Effects |
| 683 | chemistry | 13 | `chem.org.qualitative-analysis` | Qualitative Organic Analysis |
| 684 | chemistry | 13 | `chem.org.aromaticity` | Aromaticity |
| 685 | chemistry | 13 | `chem.hyd.alkanes` | Alkanes |
| 686 | chemistry | 13 | `chem.anal.volumetric` | Volumetric Analysis |
| 687 | chemistry | 13 | `chem.anal.spectroscopy` | Spectroscopic Methods |
| 688 | biology | 13 | `bio.gen.population-genetics` | Population Genetics |
| 689 | biology | 13 | `bio.gen.genetic-engineering` | Genetic Engineering and Recombinant DNA |
| 690 | biology | 13 | `bio.dev.stem-cells-regeneration` | Stem Cells and Regeneration |
| 691 | biology | 13 | `bio.mol.dna-damage-repair` | DNA Damage Response and Repair |
| 692 | biology | 13 | `bio.gen.transposable-elements` | Transposable Elements and Genome Organisation |
| 693 | biology | 13 | `bio.evo.evo-devo` | Evolutionary Developmental Biology |
| 694 | computer_science | 13 | `cs.data.sets` | Sets |
| 695 | computer_science | 13 | `cs.func.recursion` | Recursion |
| 696 | computer_science | 13 | `cs.file.csv-files` | CSV File Handling |
| 697 | computer_science | 13 | `cs.file.binary-serialisation` | Binary Files and Serialisation |
| 698 | computer_science | 13 | `cs.struct.hashing-hash-tables` | Hashing and Hash Tables |
| 699 | computer_science | 13 | `cs.struct.binary-search` | Binary Search |
| 700 | computer_science | 13 | `cs.oop.classes-objects-python` | Classes and Objects in Python |
| 701 | computer_science | 13 | `cs.db.database-concepts` | Database Concepts |
| 702 | computer_science | 13 | `cs.se.sdlc` | Software Development Life Cycle |
| 703 | mathematics | 14 | `math.found.real-numbers` | Real Numbers |
| 704 | mathematics | 14 | `math.arith.carrying` | Carrying (Regrouping) |
| 705 | mathematics | 14 | `math.arith.mental-addition` | Mental Addition |
| 706 | mathematics | 14 | `math.arith.subtraction` | Subtraction |
| 707 | mathematics | 14 | `math.arith.multiplication` | Multiplication |
| 708 | mathematics | 14 | `math.seq.infinite-geometric-series` | Infinite Geometric Series |
| 709 | mathematics | 14 | `math.seq.telescoping-series` | Telescoping Series |
| 710 | mathematics | 14 | `math.prob.conditional-expectation` | Conditional Expectation |
| 711 | mathematics | 14 | `math.abst.first-isomorphism-theorem` | First Isomorphism Theorem |
| 712 | mathematics | 14 | `math.abst.ufd` | Unique Factorization Domain |
| 713 | mathematics | 14 | `math.abst.field-extension` | Field Extension |
| 714 | physics | 14 | `phys.mech.poisson-brackets` | Poisson Brackets and Phase Space Dynamics |
| 715 | physics | 14 | `phys.mod.radioactive-decay` | Radioactive Decay Law and Half-Life |
| 716 | physics | 14 | `phys.qm.schrodinger-equation` | Time-Dependent Schrödinger Equation |
| 717 | physics | 14 | `phys.qm.uncertainty-principle` | Heisenberg's Uncertainty Principle |
| 718 | physics | 14 | `phys.rel.relativistic-momentum` | Relativistic Momentum and Energy |
| 719 | physics | 14 | `phys.stat.bose-einstein` | Bose-Einstein Statistics |
| 720 | physics | 14 | `phys.stat.entropy-statistical` | Statistical Definition of Entropy |
| 721 | physics | 14 | `phys.stat.free-energy` | Helmholtz and Gibbs Free Energy |
| 722 | physics | 14 | `phys.stat.grand-canonical-ensemble` | Grand Canonical Ensemble |
| 723 | physics | 14 | `phys.stat.fluctuations-correlations` | Fluctuations, Response Functions, and Correlations |
| 724 | english | 14 | `eng.vocab.academic-vocabulary` | Academic Vocabulary |
| 725 | english | 14 | `eng.vocab.semantic-fields` | Semantic Fields |
| 726 | english | 14 | `eng.grammar.sentence-types-by-function` | Sentence Types by Function |
| 727 | english | 14 | `eng.grammar.phrases` | Phrases |
| 728 | english | 14 | `eng.grammar.tense-consistency` | Tense Consistency |
| 729 | english | 14 | `eng.grammar.conditionals` | Conditional Sentences |
| 730 | english | 14 | `eng.grammar.participles-and-participial-phrases` | Participles and Participial Phrases |
| 731 | english | 14 | `eng.grammar.pronoun-antecedent-agreement` | Pronoun-Antecedent Agreement |
| 732 | english | 14 | `eng.grammar.comparatives-and-superlatives` | Comparatives and Superlatives |
| 733 | english | 14 | `eng.reading.main-idea-and-details` | Main Idea and Supporting Details |
| 734 | english | 14 | `eng.listening.critical-listening` | Critical Listening |
| 735 | english | 14 | `eng.speaking.public-speaking-basics` | Public Speaking Basics |
| 736 | chemistry | 14 | `chem.state.liquids` | Liquid State Properties |
| 737 | chemistry | 14 | `chem.elect.standard-electrode` | Standard Electrode Potential |
| 738 | chemistry | 14 | `chem.elect.electrolysis` | Electrolysis and Faraday's Laws |
| 739 | chemistry | 14 | `chem.elect.batteries` | Batteries and Fuel Cells |
| 740 | chemistry | 14 | `chem.elect.corrosion` | Corrosion |
| 741 | chemistry | 14 | `chem.coord.isomerism` | Isomerism in Complexes |
| 742 | chemistry | 14 | `chem.coord.bonding` | Bonding in Complexes |
| 743 | chemistry | 14 | `chem.coord.applications` | Applications of Coordination Chemistry |
| 744 | chemistry | 14 | `chem.sblock.water` | Chemistry of Water |
| 745 | chemistry | 14 | `chem.dblock.organometallics` | Organometallic Chemistry |
| 746 | chemistry | 14 | `chem.org.reactive-intermediates` | Reactive Intermediates |
| 747 | chemistry | 14 | `chem.hyd.arenes` | Benzene and Arenes |
| 748 | chemistry | 14 | `chem.hyd.conformations` | Conformational Analysis |
| 749 | chemistry | 14 | `chem.hyd.petroleum` | Petroleum Refining |
| 750 | chemistry | 14 | `chem.hal.introduction` | Haloalkanes and Haloarenes |
| 751 | biology | 14 | `bio.evo.modern-synthesis-speciation` | Modern Synthesis and Speciation |
| 752 | biology | 14 | `bio.biotech.biotech-principles` | Principles of Biotechnology |
| 753 | computer_science | 14 | `cs.data.comprehensions-iterators` | Comprehensions, Iterators and Generators |
| 754 | computer_science | 14 | `cs.func.lambda-functional` | Lambda Expressions and Functional Tools |
| 755 | computer_science | 14 | `cs.struct.stacks` | Stacks |
| 756 | computer_science | 14 | `cs.struct.elementary-sorts` | Elementary Sorting — Bubble, Selection, Insertion |
| 757 | computer_science | 14 | `cs.oop.encapsulation-abstraction` | Encapsulation and Abstraction |
| 758 | computer_science | 14 | `cs.db.er-modeling` | Entity-Relationship Modeling |
| 759 | computer_science | 14 | `cs.se.version-control-git` | Version Control with Git |
| 760 | mathematics | 15 | `math.found.complex-numbers` | Complex Numbers |
| 761 | mathematics | 15 | `math.arith.column-addition` | Column Addition |
| 762 | mathematics | 15 | `math.arith.borrowing` | Borrowing (Regrouping in Subtraction) |
| 763 | mathematics | 15 | `math.arith.negative-numbers` | Negative Numbers |
| 764 | mathematics | 15 | `math.arith.multiplication-table` | Multiplication Table |
| 765 | mathematics | 15 | `math.arith.division` | Division |
| 766 | mathematics | 15 | `math.arith.exponentiation` | Exponentiation |
| 767 | mathematics | 15 | `math.geom.coordinate-plane` | Coordinate Plane |
| 768 | mathematics | 15 | `math.func.real-valued-function` | Real-Valued Function |
| 769 | mathematics | 15 | `math.prob.martingale` | Martingale |
| 770 | mathematics | 15 | `math.disc.counting-principles` | Counting Principles |
| 771 | mathematics | 15 | `math.abst.second-isomorphism-theorem` | Second and Third Isomorphism Theorems |
| 772 | mathematics | 15 | `math.abst.algebraic-extension` | Algebraic Extension |
| 773 | mathematics | 15 | `math.real.completeness` | Completeness of ℝ |
| 774 | mathematics | 15 | `math.real.metric-space` | Metric Space |
| 775 | physics | 15 | `phys.mech.canonical-transformations` | Canonical Transformations and Generating Functions |
| 776 | physics | 15 | `phys.mod.nuclear-reactions` | Nuclear Reactions and Q-Value |
| 777 | physics | 15 | `phys.qm.operators` | Quantum Operators and Observables |
| 778 | physics | 15 | `phys.qm.particle-in-box` | Particle in an Infinite Square Well |
| 779 | physics | 15 | `phys.qm.harmonic-oscillator-qm` | Quantum Harmonic Oscillator |
| 780 | physics | 15 | `phys.qm.quantum-tunneling` | Quantum Tunneling |
| 781 | physics | 15 | `phys.rel.mass-energy` | Mass-Energy Equivalence: E=mc² |
| 782 | physics | 15 | `phys.stat.chemical-potential` | Chemical Potential and Thermodynamic Equilibrium |
| 783 | physics | 15 | `phys.stat.phase-transitions` | Phase Transitions and Landau Mean-Field Theory |
| 784 | english | 15 | `eng.grammar.question-formation` | Question Formation |
| 785 | english | 15 | `eng.grammar.negation` | Negation |
| 786 | english | 15 | `eng.grammar.clauses` | Independent and Dependent Clauses |
| 787 | english | 15 | `eng.grammar.active-and-passive-voice` | Active and Passive Voice |
| 788 | english | 15 | `eng.grammar.direct-and-indirect-speech` | Direct and Indirect Speech |
| 789 | english | 15 | `eng.grammar.capitalization-rules` | Capitalization Rules |
| 790 | english | 15 | `eng.reading.inference-in-reading` | Inference in Reading |
| 791 | english | 15 | `eng.reading.summarizing` | Summarizing |
| 792 | english | 15 | `eng.reading.text-structure` | Text Structure |
| 793 | english | 15 | `eng.speaking.presentation-skills` | Presentation Skills |
| 794 | chemistry | 15 | `chem.state.phase-diagram` | Phase Diagrams |
| 795 | chemistry | 15 | `chem.sol.vapour-pressure` | Vapour Pressure of Solutions |
| 796 | chemistry | 15 | `chem.elect.nernst` | Nernst Equation |
| 797 | chemistry | 15 | `chem.elect.industrial` | Industrial Electrolysis |
| 798 | chemistry | 15 | `chem.surface.surfactants` | Surfactants and Micelles |
| 799 | chemistry | 15 | `chem.org.mechanisms` | Organic Reaction Mechanisms |
| 800 | chemistry | 15 | `chem.hyd.polycyclic` | Polycyclic and Heterocyclic Systems |
| 801 | chemistry | 15 | `chem.hal.sn1` | SN1 Mechanism |
| 802 | chemistry | 15 | `chem.hal.sn2` | SN2 Mechanism |
| 803 | chemistry | 15 | `chem.hal.haloarenes` | Haloarenes |
| 804 | chemistry | 15 | `chem.hal.cfcs` | Polyhalogen Compounds and CFCs |
| 805 | chemistry | 15 | `chem.nitro.nitro-compounds` | Nitro Compounds |
| 806 | biology | 15 | `bio.evo.human-evolution` | Human Evolution |
| 807 | biology | 15 | `bio.biotech.biotech-process-applications` | Biotechnology Process Applications |
| 808 | computer_science | 15 | `cs.func.modules-packages` | Modules and Packages |
| 809 | computer_science | 15 | `cs.struct.queues` | Queues |
| 810 | computer_science | 15 | `cs.struct.efficient-sorts` | Efficient Sorting — Merge Sort and Quick Sort |
| 811 | computer_science | 15 | `cs.oop.inheritance` | Inheritance |
| 812 | computer_science | 15 | `cs.db.relational-model` | The Relational Model |
| 813 | computer_science | 15 | `cs.se.software-testing` | Software Testing Fundamentals |
| 814 | mathematics | 16 | `math.arith.absolute-value` | Absolute Value |
| 815 | mathematics | 16 | `math.arith.integer-arithmetic` | Integer Arithmetic |
| 816 | mathematics | 16 | `math.arith.long-multiplication` | Long Multiplication |
| 817 | mathematics | 16 | `math.arith.mental-multiplication` | Mental Multiplication |
| 818 | mathematics | 16 | `math.arith.remainder` | Remainder |
| 819 | mathematics | 16 | `math.arith.divisor-dividend` | Divisor and Dividend |
| 820 | mathematics | 16 | `math.arith.order-of-operations` | Order of Operations |
| 821 | mathematics | 16 | `math.arith.exponent-rules` | Exponent Rules |
| 822 | mathematics | 16 | `math.arith.square-numbers` | Perfect Squares |
| 823 | mathematics | 16 | `math.arith.cube-numbers` | Perfect Cubes |
| 824 | mathematics | 16 | `math.nt.divisibility` | Divisibility |
| 825 | mathematics | 16 | `math.nt.division-algorithm` | Division Algorithm |
| 826 | mathematics | 16 | `math.geom.circle-equation` | Equation of a Circle |
| 827 | mathematics | 16 | `math.geom.x-y-coordinates` | Cartesian Coordinates |
| 828 | mathematics | 16 | `math.geom.quadrants` | Quadrants |
| 829 | mathematics | 16 | `math.geom.midpoint-formula` | Midpoint Formula |
| 830 | mathematics | 16 | `math.geom.slope` | Slope |
| 831 | mathematics | 16 | `math.geom.transformations` | Geometric Transformations |
| 832 | mathematics | 16 | `math.geom.vectors-2d` | Vectors in 2D |
| 833 | mathematics | 16 | `math.func.graph-of-function` | Graph of a Function |
| 834 | mathematics | 16 | `math.calc.limits` | Limit of a Function |
| 835 | mathematics | 16 | `math.calc.parametric-curves` | Parametric Equations and Curves |
| 836 | mathematics | 16 | `math.prob.classical-probability` | Classical Probability |
| 837 | mathematics | 16 | `math.disc.permutations` | Permutations |
| 838 | mathematics | 16 | `math.disc.pigeonhole` | Pigeonhole Principle |
| 839 | mathematics | 16 | `math.abst.galois-theory` | Galois Theory |
| 840 | mathematics | 16 | `math.real.sup-inf` | Supremum and Infimum |
| 841 | mathematics | 16 | `math.real.archimedean` | Archimedean Property |
| 842 | mathematics | 16 | `math.real.convergence-sequences` | Convergence of Sequences |
| 843 | mathematics | 16 | `math.real.open-sets` | Open and Closed Sets |
| 844 | physics | 16 | `phys.mech.hamilton-jacobi-equation` | Hamilton-Jacobi Equation and Action-Angle Variables |
| 845 | physics | 16 | `phys.mod.binding-energy` | Nuclear Binding Energy and Mass Defect |
| 846 | physics | 16 | `phys.qm.hydrogen-atom-qm` | Quantum Treatment of Hydrogen Atom |
| 847 | physics | 16 | `phys.qm.spin` | Electron Spin and the Stern-Gerlach Experiment |
| 848 | physics | 16 | `phys.rel.spacetime` | Spacetime Interval and Four-Vectors |
| 849 | physics | 16 | `phys.stat.ising-model` | Ising Model |
| 850 | physics | 16 | `phys.particle.four-forces` | Four Fundamental Forces |
| 851 | english | 16 | `eng.grammar.simple-sentences` | Simple Sentences |
| 852 | english | 16 | `eng.grammar.end-punctuation` | End Punctuation |
| 853 | english | 16 | `eng.reading.predicting-and-confirming` | Predicting and Confirming |
| 854 | english | 16 | `eng.reading.genre-recognition` | Genre Recognition |
| 855 | english | 16 | `eng.reading.authors-purpose-and-tone` | Author's Purpose and Tone |
| 856 | english | 16 | `eng.reading.compare-and-contrast-texts` | Comparing and Contrasting Texts |
| 857 | english | 16 | `eng.speaking.debate-skills` | Debate Skills |
| 858 | chemistry | 16 | `chem.sol.colligative` | Colligative Properties |
| 859 | chemistry | 16 | `chem.sol.activity` | Activity and Non-ideal Solutions |
| 860 | chemistry | 16 | `chem.elect.concentration-cell` | Concentration Cells |
| 861 | chemistry | 16 | `chem.org.arrow-pushing` | Electron Flow and Arrow Notation |
| 862 | chemistry | 16 | `chem.org.pericyclic` | Pericyclic Reactions |
| 863 | chemistry | 16 | `chem.hyd.alkenes` | Alkenes |
| 864 | chemistry | 16 | `chem.hal.elimination` | Elimination Reactions |
| 865 | chemistry | 16 | `chem.hal.grignard` | Grignard and Organolithium Reagents |
| 866 | chemistry | 16 | `chem.alc.alcohols` | Alcohols |
| 867 | biology | 16 | `bio.biotech.genomics-proteomics` | Genomics and Proteomics |
| 868 | computer_science | 16 | `cs.func.decorators` | Decorators |
| 869 | computer_science | 16 | `cs.struct.deques-priority-queues` | Deques and Priority Queues |
| 870 | computer_science | 16 | `cs.struct.linked-lists` | Singly Linked Lists |
| 871 | computer_science | 16 | `cs.oop.polymorphism-overloading` | Polymorphism and Operator Overloading |
| 872 | computer_science | 16 | `cs.db.normalisation` | Normalisation |
| 873 | computer_science | 16 | `cs.db.sql-ddl-dml` | SQL — DDL and DML Basics |
| 874 | computer_science | 16 | `cs.ds.numpy-arrays` | NumPy for Numerical Computing |
| 875 | mathematics | 17 | `math.arith.long-division` | Long Division |
| 876 | mathematics | 17 | `math.arith.fraction-equivalence` | Equivalent Fractions |
| 877 | mathematics | 17 | `math.arith.fraction-multiplication` | Multiplication and Division of Fractions |
| 878 | mathematics | 17 | `math.arith.fraction-reciprocal` | Reciprocal |
| 879 | mathematics | 17 | `math.arith.mixed-numbers` | Mixed Numbers |
| 880 | mathematics | 17 | `math.arith.improper-fractions` | Improper Fractions |
| 881 | mathematics | 17 | `math.arith.decimals` | Decimals |
| 882 | mathematics | 17 | `math.arith.ratios` | Ratio |
| 883 | mathematics | 17 | `math.arith.square-roots` | Square Roots |
| 884 | mathematics | 17 | `math.arith.mental-arithmetic` | Mental Arithmetic |
| 885 | mathematics | 17 | `math.nt.divisibility-rules` | Divisibility Rules |
| 886 | mathematics | 17 | `math.nt.prime-number` | Prime Number |
| 887 | mathematics | 17 | `math.nt.modular-arithmetic` | Modular Arithmetic |
| 888 | mathematics | 17 | `math.nt.induction-applications` | Induction in Number Theory |
| 889 | mathematics | 17 | `math.alg.expression` | Algebraic Expression |
| 890 | mathematics | 17 | `math.geom.pythagorean-theorem` | Pythagorean Theorem |
| 891 | mathematics | 17 | `math.geom.line-equation` | Equations of Lines |
| 892 | mathematics | 17 | `math.geom.translation` | Translation |
| 893 | mathematics | 17 | `math.geom.reflection` | Reflection |
| 894 | mathematics | 17 | `math.geom.vectors-3d` | Vectors in 3D |
| 895 | mathematics | 17 | `math.func.zero-of-function` | Zero of a Function |
| 896 | mathematics | 17 | `math.func.even-odd-functions` | Even and Odd Functions |
| 897 | mathematics | 17 | `math.func.transformations-functions` | Transformations of Functions |
| 898 | mathematics | 17 | `math.func.linear-function` | Linear Function |
| 899 | mathematics | 17 | `math.seq.convergent` | Convergent Sequence |
| 900 | mathematics | 17 | `math.calc.limit-laws` | Limit Laws |
| 901 | mathematics | 17 | `math.calc.one-sided-limits` | One-Sided Limits |
| 902 | mathematics | 17 | `math.calc.limits-at-infinity` | Limits at Infinity |
| 903 | mathematics | 17 | `math.calc.continuity` | Continuity |
| 904 | mathematics | 17 | `math.calc.derivative-intro` | Slope of Tangent and Rate of Change |
| 905 | mathematics | 17 | `math.calc.riemann-sums` | Riemann Sums |
| 906 | mathematics | 17 | `math.calc.sequence-limits` | Limits of Sequences (Calculus) |
| 907 | mathematics | 17 | `math.linalg.vector` | Vector |
| 908 | mathematics | 17 | `math.prob.convergence-types` | Modes of Convergence |
| 909 | mathematics | 17 | `math.stats.population-sample` | Population and Sample |
| 910 | mathematics | 17 | `math.disc.combinations` | Combinations |
| 911 | mathematics | 17 | `math.disc.asymptotic-notation` | Asymptotic Notation |
| 912 | mathematics | 17 | `math.abst.galois-group` | Galois Group |
| 913 | mathematics | 17 | `math.real.cauchy-sequence` | Cauchy Sequence |
| 914 | mathematics | 17 | `math.real.series-rigorous` | Series (Rigorous) |
| 915 | mathematics | 17 | `math.real.compactness` | Compactness |
| 916 | mathematics | 17 | `math.real.connectedness` | Connectedness |
| 917 | mathematics | 17 | `math.real.pointwise-convergence` | Pointwise Convergence |
| 918 | mathematics | 17 | `math.graph.ramsey-theory` | Ramsey Theory |
| 919 | physics | 17 | `phys.mod.nuclear-fission` | Nuclear Fission and Chain Reactions |
| 920 | physics | 17 | `phys.mod.nuclear-fusion` | Nuclear Fusion and Stellar Energy |
| 921 | physics | 17 | `phys.mod.nuclear-models` | Nuclear Models: Shell Model |
| 922 | physics | 17 | `phys.qm.pauli-exclusion` | Pauli Exclusion Principle |
| 923 | physics | 17 | `phys.qm.perturbation-theory` | Time-Independent Perturbation Theory |
| 924 | physics | 17 | `phys.qm.selection-rules` | Selection Rules and Transition Probabilities |
| 925 | physics | 17 | `phys.qm.angular-momentum-addition` | Addition of Angular Momenta and Clebsch-Gordan Coefficients |
| 926 | physics | 17 | `phys.qm.density-matrix` | Density Matrix and Mixed Quantum States |
| 927 | physics | 17 | `phys.stat.phase-transitions-critical-phenomena` | Critical Phenomena, Scaling Laws, and Universality |
| 928 | physics | 17 | `phys.stat.monte-carlo-basics` | Monte Carlo Methods in Statistical Physics |
| 929 | physics | 17 | `phys.particle.particle-classification` | Particle Classification: Hadrons and Leptons |
| 930 | physics | 17 | `phys.particle.gauge-bosons` | Gauge Bosons and Force Carriers |
| 931 | english | 17 | `eng.grammar.compound-sentences` | Compound Sentences |
| 932 | english | 17 | `eng.grammar.comma-usage` | Comma Usage |
| 933 | english | 17 | `eng.grammar.sentence-fragments` | Sentence Fragments |
| 934 | english | 17 | `eng.reading.close-reading` | Close Reading |
| 935 | english | 17 | `eng.writing.sentence-writing` | Sentence Writing |
| 936 | chemistry | 17 | `chem.sol.osmosis` | Osmosis and Osmotic Pressure |
| 937 | chemistry | 17 | `chem.hyd.alkynes` | Alkynes |
| 938 | chemistry | 17 | `chem.alc.phenols` | Phenols |
| 939 | chemistry | 17 | `chem.alc.ethers` | Ethers |
| 940 | chemistry | 17 | `chem.alc.diols` | Diols and Polyols |
| 941 | chemistry | 17 | `chem.carb.aldehydes` | Aldehydes |
| 942 | chemistry | 17 | `chem.nitro.amines` | Amines |
| 943 | chemistry | 17 | `chem.poly.addition` | Addition Polymerization |
| 944 | biology | 17 | `bio.biotech.crispr-genome-editing` | CRISPR and Genome Editing |
| 945 | biology | 17 | `bio.bioinfo.bioinformatics-intro` | Introduction to Bioinformatics |
| 946 | computer_science | 17 | `cs.struct.doubly-circular-lists` | Doubly and Circular Linked Lists |
| 947 | computer_science | 17 | `cs.struct.trees` | Trees |
| 948 | computer_science | 17 | `cs.oop.class-static-methods` | Class Methods and Static Methods |
| 949 | computer_science | 17 | `cs.db.sql-queries-functions` | SQL — Queries and Aggregate Functions |
| 950 | computer_science | 17 | `cs.ds.pandas-dataframes` | Pandas for Data Analysis |
| 951 | mathematics | 18 | `math.arith.decimal-operations` | Decimal Operations |
| 952 | mathematics | 18 | `math.arith.terminating-decimals` | Terminating Decimals |
| 953 | mathematics | 18 | `math.arith.repeating-decimals` | Repeating Decimals |
| 954 | mathematics | 18 | `math.arith.percentages` | Percentages |
| 955 | mathematics | 18 | `math.arith.proportion` | Proportion |
| 956 | mathematics | 18 | `math.arith.unit-rate` | Unit Rate |
| 957 | mathematics | 18 | `math.arith.rounding` | Rounding |
| 958 | mathematics | 18 | `math.arith.irrational-roots` | Irrational Square Roots |
| 959 | mathematics | 18 | `math.arith.scientific-notation` | Scientific Notation |
| 960 | mathematics | 18 | `math.nt.composite-number` | Composite Number |
| 961 | mathematics | 18 | `math.nt.sieve-of-eratosthenes` | Sieve of Eratosthenes |
| 962 | mathematics | 18 | `math.nt.prime-factorization` | Prime Factorization |
| 963 | mathematics | 18 | `math.nt.congruence` | Congruence |
| 964 | mathematics | 18 | `math.nt.fermats-little-theorem` | Fermat's Little Theorem |
| 965 | mathematics | 18 | `math.nt.prime-distribution` | Distribution of Primes |
| 966 | mathematics | 18 | `math.alg.term` | Term |
| 967 | mathematics | 18 | `math.alg.equation` | Equation |
| 968 | mathematics | 18 | `math.alg.polynomial` | Polynomial |
| 969 | mathematics | 18 | `math.alg.exponent-rules` | Exponent Rules (Algebraic) |
| 970 | mathematics | 18 | `math.geom.pythagorean-converse` | Converse of the Pythagorean Theorem |
| 971 | mathematics | 18 | `math.geom.similar-triangles` | Similar Triangles |
| 972 | mathematics | 18 | `math.geom.distance-formula` | Distance Formula |
| 973 | mathematics | 18 | `math.geom.dilation` | Dilation |
| 974 | mathematics | 18 | `math.geom.cross-product` | Cross Product |
| 975 | mathematics | 18 | `math.geom.differential-geometry-curves` | Curves in Space |
| 976 | mathematics | 18 | `math.seq.divergent-sequence` | Divergent Sequence |
| 977 | mathematics | 18 | `math.seq.series-convergence` | Convergence of Series |
| 978 | mathematics | 18 | `math.calc.squeeze-theorem` | Squeeze Theorem |
| 979 | mathematics | 18 | `math.calc.continuity-types` | Types of Discontinuity |
| 980 | mathematics | 18 | `math.calc.ivt` | Intermediate Value Theorem |
| 981 | mathematics | 18 | `math.calc.derivative-definition` | Derivative (Definition) |
| 982 | mathematics | 18 | `math.calc.definite-integral` | Definite Integral |
| 983 | mathematics | 18 | `math.calc.line-integrals` | Line Integrals |
| 984 | mathematics | 18 | `math.linalg.vector-addition` | Vector Addition |
| 985 | mathematics | 18 | `math.linalg.scalar-multiplication` | Scalar Multiplication |
| 986 | mathematics | 18 | `math.linalg.dot-product` | Dot Product |
| 987 | mathematics | 18 | `math.linalg.matrix` | Matrix |
| 988 | mathematics | 18 | `math.prob.combinatorial-probability` | Combinatorial Probability |
| 989 | mathematics | 18 | `math.stats.descriptive-statistics` | Descriptive Statistics |
| 990 | mathematics | 18 | `math.stats.sampling` | Sampling Methods |
| 991 | mathematics | 18 | `math.disc.binomial-theorem` | Binomial Theorem |
| 992 | mathematics | 18 | `math.disc.combinatorics` | Combinatorics |
| 993 | mathematics | 18 | `math.disc.stars-bars` | Stars and Bars |
| 994 | mathematics | 18 | `math.disc.inclusion-exclusion` | Inclusion-Exclusion Principle |
| 995 | mathematics | 18 | `math.abst.sylow-theorems` | Sylow Theorems |
| 996 | mathematics | 18 | `math.abst.finite-field` | Finite Field |
| 997 | mathematics | 18 | `math.abst.galois-correspondence` | Fundamental Theorem of Galois Theory |
| 998 | mathematics | 18 | `math.real.absolute-convergence` | Absolute Convergence |
| 999 | mathematics | 18 | `math.real.completeness-metric` | Completeness of Metric Spaces |
| 1000 | mathematics | 18 | `math.real.continuity-rigorous` | Continuity (ε-δ) |
| 1001 | mathematics | 18 | `math.opt.convex-set` | Convex Set |
| 1002 | mathematics | 18 | `math.graph.shortest-path` | Shortest Path Algorithms |
| 1003 | physics | 18 | `phys.qm.variational-method` | Variational Method and Variational Principle |
| 1004 | physics | 18 | `phys.qm.identical-particles` | Identical Particles and the Symmetrization Postulate |
| 1005 | physics | 18 | `phys.qm.scattering-theory-born-approximation` | Scattering Theory and the Born Approximation |
| 1006 | physics | 18 | `phys.stat.fermi-dirac` | Fermi-Dirac Statistics |
| 1007 | physics | 18 | `phys.astro.stellar-structure` | Stellar Structure and the Main Sequence |
| 1008 | physics | 18 | `phys.particle.antimatter` | Antimatter and Antiparticles |
| 1009 | physics | 18 | `phys.particle.quarks` | Quarks |
| 1010 | physics | 18 | `phys.particle.leptons` | Leptons |
| 1011 | english | 18 | `eng.grammar.complex-sentences` | Complex Sentences |
| 1012 | english | 18 | `eng.grammar.parallel-structure` | Parallel Structure |
| 1013 | english | 18 | `eng.grammar.apostrophes` | Apostrophes |
| 1014 | english | 18 | `eng.grammar.quotation-marks` | Quotation Marks |
| 1015 | english | 18 | `eng.grammar.colons-semicolons-dashes` | Colons, Semicolons, and Dashes |
| 1016 | english | 18 | `eng.grammar.run-on-sentences-and-comma-splices` | Run-On Sentences and Comma Splices |
| 1017 | english | 18 | `eng.reading.critical-reading` | Critical Reading |
| 1018 | english | 18 | `eng.writing.paragraph-structure` | Paragraph Structure |
| 1019 | english | 18 | `eng.literature.narrative-elements` | Narrative Elements |
| 1020 | chemistry | 18 | `chem.alc.epoxides` | Epoxides |
| 1021 | chemistry | 18 | `chem.alc.protection` | Protecting Group Strategy |
| 1022 | chemistry | 18 | `chem.carb.ketones` | Ketones |
| 1023 | chemistry | 18 | `chem.carb.carboxylic` | Carboxylic Acids |
| 1024 | chemistry | 18 | `chem.nitro.diazonium` | Diazonium Salts |
| 1025 | chemistry | 18 | `chem.nitro.heterocycles` | Nitrogen Heterocycles |
| 1026 | chemistry | 18 | `chem.bio.carbohydrates` | Carbohydrates |
| 1027 | biology | 18 | `bio.bioinfo.sequence-alignment` | Sequence Alignment |
| 1028 | biology | 18 | `bio.sys.systems-biology-intro` | Introduction to Systems Biology |
| 1029 | computer_science | 18 | `cs.struct.binary-search-trees` | Binary Search Trees |
| 1030 | computer_science | 18 | `cs.struct.heaps` | Heaps |
| 1031 | computer_science | 18 | `cs.struct.graphs-representation` | Graphs and Their Representations |
| 1032 | computer_science | 18 | `cs.oop.design-patterns-intro` | Introduction to Design Patterns |
| 1033 | computer_science | 18 | `cs.db.sql-joins-subqueries` | SQL — Joins and Subqueries |
| 1034 | computer_science | 18 | `cs.ds.data-visualisation` | Data Visualisation with Matplotlib |
| 1035 | mathematics | 19 | `math.arith.percentage-calculations` | Percentage Calculations |
| 1036 | mathematics | 19 | `math.arith.direct-variation` | Direct Variation |
| 1037 | mathematics | 19 | `math.arith.inverse-variation` | Inverse Variation |
| 1038 | mathematics | 19 | `math.arith.estimation` | Estimation |
| 1039 | mathematics | 19 | `math.arith.significant-figures` | Significant Figures |
| 1040 | mathematics | 19 | `math.nt.fundamental-theorem-arithmetic` | Fundamental Theorem of Arithmetic |
| 1041 | mathematics | 19 | `math.nt.gcd` | Greatest Common Divisor |
| 1042 | mathematics | 19 | `math.nt.residue-classes` | Residue Classes |
| 1043 | mathematics | 19 | `math.nt.eulers-theorem` | Euler's Theorem |
| 1044 | mathematics | 19 | `math.nt.eulers-totient` | Euler's Totient Function |
| 1045 | mathematics | 19 | `math.nt.primality-testing` | Primality Testing |
| 1046 | mathematics | 19 | `math.alg.coefficient` | Coefficient |
| 1047 | mathematics | 19 | `math.alg.solution-set` | Solution Set |
| 1048 | mathematics | 19 | `math.alg.degree` | Degree of a Polynomial |
| 1049 | mathematics | 19 | `math.alg.zero-exponent` | Zero Exponent |
| 1050 | mathematics | 19 | `math.alg.negative-exponent` | Negative Exponent |
| 1051 | mathematics | 19 | `math.alg.radicals` | Radical Expressions |
| 1052 | mathematics | 19 | `math.alg.exponential-function` | Exponential Function |
| 1053 | mathematics | 19 | `math.alg.inequality` | Inequality |
| 1054 | mathematics | 19 | `math.alg.binomial-theorem` | Binomial Theorem |
| 1055 | mathematics | 19 | `math.trig.right-triangle-trig` | Right-Triangle Trigonometry |
| 1056 | mathematics | 19 | `math.seq.divergence-test` | Divergence Test (nth Term Test) |
| 1057 | mathematics | 19 | `math.seq.comparison-test` | Comparison Test |
| 1058 | mathematics | 19 | `math.seq.ratio-test` | Ratio Test |
| 1059 | mathematics | 19 | `math.seq.root-test` | Root Test |
| 1060 | mathematics | 19 | `math.seq.alternating-series` | Alternating Series |
| 1061 | mathematics | 19 | `math.seq.harmonic-series` | Harmonic Series |
| 1062 | mathematics | 19 | `math.calc.differentiability` | Differentiability |
| 1063 | mathematics | 19 | `math.calc.derivative-rules` | Basic Differentiation Rules |
| 1064 | mathematics | 19 | `math.calc.lhopitals-rule` | L'Hôpital's Rule |
| 1065 | mathematics | 19 | `math.calc.mean-value-theorem` | Mean Value Theorem |
| 1066 | mathematics | 19 | `math.calc.linearization` | Linearization and Differentials |
| 1067 | mathematics | 19 | `math.calc.ftc-part1` | Fundamental Theorem of Calculus Part 1 |
| 1068 | mathematics | 19 | `math.calc.improper-integrals` | Improper Integrals |
| 1069 | mathematics | 19 | `math.calc.integral-area` | Area by Integration |
| 1070 | mathematics | 19 | `math.calc.power-series` | Power Series |
| 1071 | mathematics | 19 | `math.calc.multivariable-intro` | Introduction to Multivariable Calculus |
| 1072 | mathematics | 19 | `math.linalg.norm` | Vector Norm |
| 1073 | mathematics | 19 | `math.linalg.orthogonality` | Orthogonality |
| 1074 | mathematics | 19 | `math.linalg.cross-product` | Cross Product |
| 1075 | mathematics | 19 | `math.linalg.matrix-addition` | Matrix Addition |
| 1076 | mathematics | 19 | `math.linalg.matrix-multiplication` | Matrix Multiplication |
| 1077 | mathematics | 19 | `math.linalg.matrix-transpose` | Matrix Transpose |
| 1078 | mathematics | 19 | `math.linalg.vector-space` | Vector Space |
| 1079 | mathematics | 19 | `math.prob.continuous-rv` | Continuous Random Variable |
| 1080 | mathematics | 19 | `math.stats.measures-of-center` | Measures of Center |
| 1081 | mathematics | 19 | `math.stats.measures-of-spread` | Measures of Spread |
| 1082 | mathematics | 19 | `math.stats.data-visualization` | Data Visualization |
| 1083 | mathematics | 19 | `math.disc.derangements` | Derangements |
| 1084 | mathematics | 19 | `math.disc.recurrence-relation` | Recurrence Relation |
| 1085 | mathematics | 19 | `math.disc.graph-representation` | Graph Representation |
| 1086 | mathematics | 19 | `math.real.uniform-continuity` | Uniform Continuity |
| 1087 | mathematics | 19 | `math.real.extreme-value-theorem` | Extreme Value Theorem |
| 1088 | mathematics | 19 | `math.real.ivt` | Intermediate Value Theorem (Rigorous) |
| 1089 | mathematics | 19 | `math.real.differentiability-rigorous` | Differentiability (Rigorous) |
| 1090 | mathematics | 19 | `math.real.riemann-integral` | Riemann Integral (Rigorous) |
| 1091 | mathematics | 19 | `math.real.uniform-convergence` | Uniform Convergence |
| 1092 | mathematics | 19 | `math.real.baire-category` | Baire Category Theorem |
| 1093 | mathematics | 19 | `math.graph.extremal-graph-theory` | Extremal Graph Theory |
| 1094 | physics | 19 | `phys.qm.wkb-approximation` | WKB Approximation (Semiclassical Limit) |
| 1095 | physics | 19 | `phys.qm.s-matrix-basics` | S-Matrix and Scattering Amplitudes |
| 1096 | physics | 19 | `phys.astro.stellar-evolution` | Stellar Evolution and End States |
| 1097 | physics | 19 | `phys.astro.cosmology` | Big Bang Cosmology |
| 1098 | physics | 19 | `phys.particle.neutrinos` | Neutrinos |
| 1099 | physics | 19 | `phys.particle.hadron-quark-model` | Quark Model of Hadrons: Baryons and Mesons |
| 1100 | physics | 19 | `phys.particle.strong-interaction` | The Strong Interaction and Color Charge |
| 1101 | physics | 19 | `phys.mod.energy-bands` | Energy Bands in Solids |
| 1102 | english | 19 | `eng.grammar.sentence-combining` | Sentence Combining |
| 1103 | english | 19 | `eng.reading.evaluating-sources` | Evaluating Sources |
| 1104 | english | 19 | `eng.writing.topic-sentences` | Topic Sentences |
| 1105 | english | 19 | `eng.literature.plot-structure` | Plot Structure |
| 1106 | english | 19 | `eng.literature.character-development` | Character Development |
| 1107 | english | 19 | `eng.literature.setting-and-atmosphere` | Setting and Atmosphere |
| 1108 | english | 19 | `eng.literature.point-of-view` | Point of View |
| 1109 | english | 19 | `eng.literature.drama-basics` | Drama Basics |
| 1110 | chemistry | 19 | `chem.carb.alpha-reactions` | Alpha-Carbon Reactions |
| 1111 | chemistry | 19 | `chem.carb.derivatives` | Carboxylic Acid Derivatives |
| 1112 | chemistry | 19 | `chem.carb.spectro` | Spectroscopic ID of Carbonyls |
| 1113 | chemistry | 19 | `chem.nitro.amino-acids` | Amino Acids |
| 1114 | biology | 19 | `bio.bioinfo.phylogenetics-computational` | Computational Phylogenetics |
| 1115 | biology | 19 | `bio.bioinfo.structural-bioinformatics` | Structural Bioinformatics |
| 1116 | biology | 19 | `bio.sys.gene-regulatory-networks` | Gene Regulatory Networks |
| 1117 | biology | 19 | `bio.evo.molecular-evolution` | Molecular Evolution and Neutral Theory |
| 1118 | computer_science | 19 | `cs.struct.balanced-trees` | Balanced Search Trees |
| 1119 | computer_science | 19 | `cs.struct.graph-traversal` | Graph Traversal — BFS and DFS |
| 1120 | computer_science | 19 | `cs.db.transactions-acid` | Transactions and the ACID Properties |
| 1121 | computer_science | 19 | `cs.db.mysql-python` | Connecting Python to MySQL |
| 1122 | computer_science | 19 | `cs.se.agile-design-principles` | Agile Practices and Software Design Principles |
| 1123 | computer_science | 19 | `cs.ds.intro-machine-learning` | Introduction to Machine Learning |
| 1124 | mathematics | 20 | `math.arith.fraction-simplification` | Fraction Simplification |
| 1125 | mathematics | 20 | `math.arith.percentage-change` | Percentage Change |
| 1126 | mathematics | 20 | `math.nt.euclidean-algorithm` | Euclidean Algorithm |
| 1127 | mathematics | 20 | `math.nt.lcm` | Least Common Multiple |
| 1128 | mathematics | 20 | `math.nt.chinese-remainder-theorem` | Chinese Remainder Theorem |
| 1129 | mathematics | 20 | `math.alg.like-terms` | Like Terms |
| 1130 | mathematics | 20 | `math.alg.fractional-exponent` | Fractional Exponent |
| 1131 | mathematics | 20 | `math.alg.simplifying-radicals` | Simplifying Radical Expressions |
| 1132 | mathematics | 20 | `math.alg.radical-equations` | Radical Equations |
| 1133 | mathematics | 20 | `math.alg.exponential-equations` | Exponential Equations |
| 1134 | mathematics | 20 | `math.alg.logarithm` | Logarithm |
| 1135 | mathematics | 20 | `math.alg.pascals-triangle` | Pascal's Triangle |
| 1136 | mathematics | 20 | `math.geom.curvature` | Curvature |
| 1137 | mathematics | 20 | `math.trig.basic-ratios` | Six Trigonometric Ratios |
| 1138 | mathematics | 20 | `math.trig.unit-circle` | Unit Circle |
| 1139 | mathematics | 20 | `math.trig.law-of-sines` | Law of Sines |
| 1140 | mathematics | 20 | `math.trig.law-of-cosines` | Law of Cosines |
| 1141 | mathematics | 20 | `math.func.exponential-function` | Exponential Function |
| 1142 | mathematics | 20 | `math.seq.integral-test` | Integral Test |
| 1143 | mathematics | 20 | `math.seq.absolute-convergence` | Absolute and Conditional Convergence |
| 1144 | mathematics | 20 | `math.calc.product-rule` | Product Rule |
| 1145 | mathematics | 20 | `math.calc.chain-rule` | Chain Rule |
| 1146 | mathematics | 20 | `math.calc.higher-order-derivatives` | Higher-Order Derivatives |
| 1147 | mathematics | 20 | `math.calc.rolles-theorem` | Rolle's Theorem |
| 1148 | mathematics | 20 | `math.calc.increasing-decreasing` | Increasing and Decreasing Functions |
| 1149 | mathematics | 20 | `math.calc.critical-points` | Critical Points |
| 1150 | mathematics | 20 | `math.calc.antiderivatives` | Antiderivatives |
| 1151 | mathematics | 20 | `math.calc.volume-revolution` | Volumes of Revolution |
| 1152 | mathematics | 20 | `math.calc.arc-length` | Arc Length |
| 1153 | mathematics | 20 | `math.calc.radius-of-convergence` | Radius of Convergence |
| 1154 | mathematics | 20 | `math.calc.partial-derivatives` | Partial Derivatives |
| 1155 | mathematics | 20 | `math.calc.multiple-integrals` | Multiple Integrals |
| 1156 | mathematics | 20 | `math.linalg.unit-vector` | Unit Vector |
| 1157 | mathematics | 20 | `math.linalg.symmetric-matrix` | Symmetric Matrix |
| 1158 | mathematics | 20 | `math.linalg.determinant` | Determinant |
| 1159 | mathematics | 20 | `math.linalg.subspace` | Subspace |
| 1160 | mathematics | 20 | `math.linalg.linear-map` | Linear Map |
| 1161 | mathematics | 20 | `math.linalg.inner-product` | Inner Product |
| 1162 | mathematics | 20 | `math.linalg.distance` | Distance in Vector Spaces |
| 1163 | mathematics | 20 | `math.linalg.angle-vectors` | Angle Between Vectors |
| 1164 | mathematics | 20 | `math.prob.pdf` | Probability Density Function |
| 1165 | mathematics | 20 | `math.prob.generating-function` | Probability Generating Function |
| 1166 | mathematics | 20 | `math.prob.markov-chain` | Markov Chain |
| 1167 | mathematics | 20 | `math.stats.percentile` | Percentile |
| 1168 | mathematics | 20 | `math.disc.generating-functions` | Generating Functions |
| 1169 | mathematics | 20 | `math.disc.catalan-numbers` | Catalan Numbers |
| 1170 | mathematics | 20 | `math.disc.stirling-numbers` | Stirling Numbers |
| 1171 | mathematics | 20 | `math.real.lipschitz-continuity` | Lipschitz Continuity |
| 1172 | mathematics | 20 | `math.real.mvt` | Mean Value Theorem (Rigorous) |
| 1173 | mathematics | 20 | `math.real.riemann-integrability` | Riemann Integrability |
| 1174 | mathematics | 20 | `math.real.ftc-rigorous` | Fundamental Theorem of Calculus (Rigorous) |
| 1175 | mathematics | 20 | `math.real.weierstrass-approximation` | Weierstrass Approximation Theorem |
| 1176 | mathematics | 20 | `math.top.smooth-manifold` | Smooth Manifold |
| 1177 | mathematics | 20 | `math.fnal.normed-space` | Normed Space |
| 1178 | mathematics | 20 | `math.num.floating-point` | Floating-Point Arithmetic |
| 1179 | mathematics | 20 | `math.num.root-finding` | Root-Finding Methods |
| 1180 | mathematics | 20 | `math.opt.dynamic-programming` | Dynamic Programming |
| 1181 | physics | 20 | `phys.astro.dark-matter` | Dark Matter and Dark Energy |
| 1182 | physics | 20 | `phys.astro.black-holes` | Black Holes and Schwarzschild Radius |
| 1183 | physics | 20 | `phys.particle.weak-interaction` | The Weak Interaction |
| 1184 | physics | 20 | `phys.particle.conservation-laws` | Conservation Laws in Particle Interactions |
| 1185 | physics | 20 | `phys.mod.semiconductor-classification` | Conductors, Insulators, and Semiconductors |
| 1186 | english | 20 | `eng.reading.reading-across-genres` | Reading Across Genres |
| 1187 | english | 20 | `eng.writing.supporting-details` | Supporting Details |
| 1188 | english | 20 | `eng.literature.theme-and-message` | Theme and Message |
| 1189 | english | 20 | `eng.literature.foreshadowing-and-suspense` | Foreshadowing and Suspense |
| 1190 | english | 20 | `eng.literature.dramatic-structure` | Dramatic Structure |
| 1191 | english | 20 | `eng.literature.prose-fiction` | Prose Fiction |
| 1192 | english | 20 | `eng.linguistics.what-is-linguistics` | What Is Linguistics? |
| 1193 | english | 20 | `eng.communication.media-literacy` | Media Literacy |
| 1194 | chemistry | 20 | `chem.carb.named-reactions` | Named Carbonyl Reactions |
| 1195 | chemistry | 20 | `chem.bio.proteins` | Proteins |
| 1196 | chemistry | 20 | `chem.bio.lipids` | Lipids |
| 1197 | chemistry | 20 | `chem.poly.condensation` | Condensation Polymerization |
| 1198 | biology | 20 | `bio.sys.metabolic-network-modelling` | Metabolic Network Modelling |
| 1199 | computer_science | 20 | `cs.struct.shortest-path-algorithms` | Shortest Path Algorithms |
| 1200 | computer_science | 20 | `cs.db.indexing-query-optimisation` | Indexing and Query Optimisation |
| 1201 | computer_science | 20 | `cs.db.nosql-intro` | Introduction to NoSQL Databases |
| 1202 | computer_science | 20 | `cs.ds.supervised-learning-models` | Supervised Learning Models |
| 1203 | computer_science | 20 | `cs.ds.unsupervised-learning-models` | Unsupervised Learning Models |
| 1204 | mathematics | 21 | `math.arith.fraction-addition` | Addition and Subtraction of Fractions |
| 1205 | mathematics | 21 | `math.nt.extended-euclidean-algorithm` | Extended Euclidean Algorithm |
| 1206 | mathematics | 21 | `math.nt.continued-fractions` | Continued Fractions |
| 1207 | mathematics | 21 | `math.alg.simplification` | Algebraic Simplification |
| 1208 | mathematics | 21 | `math.alg.polynomial-operations` | Polynomial Operations |
| 1209 | mathematics | 21 | `math.alg.rationalizing-denominators` | Rationalizing the Denominator |
| 1210 | mathematics | 21 | `math.alg.logarithm-properties` | Logarithm Properties |
| 1211 | mathematics | 21 | `math.alg.natural-logarithm` | Natural Logarithm |
| 1212 | mathematics | 21 | `math.geom.frenet-serret` | Frenet-Serret Formulas |
| 1213 | mathematics | 21 | `math.geom.differential-geometry-surfaces` | Differential Geometry of Surfaces |
| 1214 | mathematics | 21 | `math.trig.special-angles` | Trigonometric Values at Special Angles |
| 1215 | mathematics | 21 | `math.trig.reference-angles` | Reference Angles |
| 1216 | mathematics | 21 | `math.trig.trig-functions` | Trigonometric Functions |
| 1217 | mathematics | 21 | `math.func.logarithmic-function` | Logarithmic Function |
| 1218 | mathematics | 21 | `math.calc.quotient-rule` | Quotient Rule |
| 1219 | mathematics | 21 | `math.calc.derivative-exponential` | Derivative of Exponential Functions |
| 1220 | mathematics | 21 | `math.calc.implicit-differentiation` | Implicit Differentiation |
| 1221 | mathematics | 21 | `math.calc.local-extrema` | Local Extrema |
| 1222 | mathematics | 21 | `math.calc.concavity` | Concavity and Inflection Points |
| 1223 | mathematics | 21 | `math.calc.ftc-part2` | Fundamental Theorem of Calculus Part 2 |
| 1224 | mathematics | 21 | `math.calc.surface-area-integral` | Surface Area of Revolution |
| 1225 | mathematics | 21 | `math.calc.taylor-series` | Taylor Series |
| 1226 | mathematics | 21 | `math.calc.parametric-calculus` | Calculus of Parametric Curves |
| 1227 | mathematics | 21 | `math.calc.gradient` | Gradient |
| 1228 | mathematics | 21 | `math.calc.chain-rule-multivariable` | Multivariable Chain Rule |
| 1229 | mathematics | 21 | `math.calc.double-integrals` | Double Integrals |
| 1230 | mathematics | 21 | `math.calc.change-of-variables` | Change of Variables (Jacobian) |
| 1231 | mathematics | 21 | `math.de.ode` | Ordinary Differential Equation |
| 1232 | mathematics | 21 | `math.linalg.matrix-inverse` | Matrix Inverse |
| 1233 | mathematics | 21 | `math.linalg.cofactor-expansion` | Cofactor Expansion |
| 1234 | mathematics | 21 | `math.linalg.det-properties` | Properties of Determinants |
| 1235 | mathematics | 21 | `math.linalg.span` | Span |
| 1236 | mathematics | 21 | `math.linalg.kernel-image` | Kernel and Image of Linear Map |
| 1237 | mathematics | 21 | `math.linalg.eigenvalues` | Eigenvalues and Eigenvectors |
| 1238 | mathematics | 21 | `math.linalg.inner-product-space` | Inner Product Space |
| 1239 | mathematics | 21 | `math.linalg.projection` | Orthogonal Projection |
| 1240 | mathematics | 21 | `math.linalg.tensor` | Tensor |
| 1241 | mathematics | 21 | `math.linalg.dual-space` | Dual Space |
| 1242 | mathematics | 21 | `math.prob.continuous-distributions` | Continuous Distributions |
| 1243 | mathematics | 21 | `math.prob.expected-value` | Expected Value |
| 1244 | mathematics | 21 | `math.prob.transition-matrix` | Transition Matrix |
| 1245 | mathematics | 21 | `math.disc.divide-conquer-recurrence` | Divide-and-Conquer Recurrence |
| 1246 | mathematics | 21 | `math.disc.ogf` | Ordinary Generating Function |
| 1247 | mathematics | 21 | `math.disc.egf` | Exponential Generating Function |
| 1248 | mathematics | 21 | `math.real.taylor-rigorous` | Taylor's Theorem (Rigorous) |
| 1249 | mathematics | 21 | `math.real.fixed-point-theorem` | Banach Fixed-Point Theorem |
| 1250 | mathematics | 21 | `math.fnal.completeness` | Completeness |
| 1251 | mathematics | 21 | `math.num.error-analysis` | Error Analysis |
| 1252 | mathematics | 21 | `math.num.newtons-method` | Newton's Method |
| 1253 | physics | 21 | `phys.astro.gravitational-waves` | Gravitational Waves |
| 1254 | physics | 21 | `phys.particle.electroweak-unification` | Electroweak Unification |
| 1255 | physics | 21 | `phys.particle.feynman-diagrams` | Feynman Diagrams (Qualitative) |
| 1256 | physics | 21 | `phys.particle.accelerators-detectors` | Particle Accelerators and Detectors |
| 1257 | physics | 21 | `phys.mod.intrinsic-semiconductors` | Intrinsic Semiconductors |
| 1258 | english | 21 | `eng.writing.transitions-and-cohesion` | Transitions and Cohesion |
| 1259 | english | 21 | `eng.literature.literary-devices-overview` | Overview of Literary Devices |
| 1260 | english | 21 | `eng.literature.prose-nonfiction` | Prose Nonfiction |
| 1261 | english | 21 | `eng.linguistics.phonology-intro` | Introduction to Phonology |
| 1262 | english | 21 | `eng.linguistics.morphology-intro` | Introduction to Morphology |
| 1263 | chemistry | 21 | `chem.bio.nucleic-acids` | Nucleic Acids |
| 1264 | chemistry | 21 | `chem.bio.vitamins` | Vitamins and Hormones |
| 1265 | chemistry | 21 | `chem.bio.enzyme-kinetics` | Enzyme Kinetics |
| 1266 | chemistry | 21 | `chem.poly.natural` | Natural Polymers |
| 1267 | chemistry | 21 | `chem.poly.properties` | Polymer Properties |
| 1268 | chemistry | 21 | `chem.poly.biodegradable` | Biodegradable and Functional Polymers |
| 1269 | biology | 21 | `bio.sys.synthetic-biology` | Synthetic Biology |
| 1270 | computer_science | 21 | `cs.struct.minimum-spanning-tree` | Minimum Spanning Trees |
| 1271 | computer_science | 21 | `cs.ds.neural-networks-intro` | Introduction to Neural Networks |
| 1272 | mathematics | 22 | `math.nt.bezout-identity` | Bézout's Identity |
| 1273 | mathematics | 22 | `math.nt.modular-inverse` | Modular Inverse |
| 1274 | mathematics | 22 | `math.alg.linear-equation-1var` | Linear Equation in One Variable |
| 1275 | mathematics | 22 | `math.alg.polynomial-division` | Polynomial Division |
| 1276 | mathematics | 22 | `math.alg.change-of-base` | Change of Base Formula |
| 1277 | mathematics | 22 | `math.alg.logarithmic-equations` | Logarithmic Equations |
| 1278 | mathematics | 22 | `math.geom.polar-coordinates` | Polar Coordinates |
| 1279 | mathematics | 22 | `math.geom.rotation` | Rotation |
| 1280 | mathematics | 22 | `math.geom.dot-product` | Dot Product |
| 1281 | mathematics | 22 | `math.trig.amplitude-period-phase` | Amplitude, Period, Phase Shift |
| 1282 | mathematics | 22 | `math.trig.trig-identities` | Trigonometric Identities |
| 1283 | mathematics | 22 | `math.trig.inverse-trig` | Inverse Trigonometric Functions |
| 1284 | mathematics | 22 | `math.trig.hyperbolic-functions` | Hyperbolic Functions |
| 1285 | mathematics | 22 | `math.calc.derivative-ln` | Derivative of Logarithmic Functions |
| 1286 | mathematics | 22 | `math.calc.derivative-trig` | Derivatives of Trigonometric Functions |
| 1287 | mathematics | 22 | `math.calc.related-rates` | Related Rates |
| 1288 | mathematics | 22 | `math.calc.optimization` | Optimization (Calculus) |
| 1289 | mathematics | 22 | `math.calc.curve-sketching` | Curve Sketching |
| 1290 | mathematics | 22 | `math.calc.u-substitution` | Integration by Substitution |
| 1291 | mathematics | 22 | `math.calc.maclaurin-series` | Maclaurin Series |
| 1292 | mathematics | 22 | `math.calc.taylor-remainder` | Taylor Remainder and Error Bound |
| 1293 | mathematics | 22 | `math.calc.directional-derivative` | Directional Derivative |
| 1294 | mathematics | 22 | `math.calc.multivariable-extrema` | Multivariable Extrema |
| 1295 | mathematics | 22 | `math.calc.triple-integrals` | Triple Integrals |
| 1296 | mathematics | 22 | `math.calc.surface-integrals` | Surface Integrals |
| 1297 | mathematics | 22 | `math.calc.vector-fields` | Vector Fields |
| 1298 | mathematics | 22 | `math.calc.greens-theorem` | Green's Theorem |
| 1299 | mathematics | 22 | `math.calc.fourier-series-intro` | Fourier Series (Introduction) |
| 1300 | mathematics | 22 | `math.de.ode-order` | Order of a Differential Equation |
| 1301 | mathematics | 22 | `math.de.ode-linearity` | Linearity of Differential Equations |
| 1302 | mathematics | 22 | `math.de.solution-types` | Types of Solutions |
| 1303 | mathematics | 22 | `math.de.pde` | Partial Differential Equation |
| 1304 | mathematics | 22 | `math.linalg.cramer-rule` | Cramer's Rule |
| 1305 | mathematics | 22 | `math.linalg.linear-independence` | Linear Independence |
| 1306 | mathematics | 22 | `math.linalg.column-space` | Column Space |
| 1307 | mathematics | 22 | `math.linalg.characteristic-polynomial` | Characteristic Polynomial |
| 1308 | mathematics | 22 | `math.linalg.least-squares` | Least Squares |
| 1309 | mathematics | 22 | `math.prob.normal-distribution` | Normal Distribution |
| 1310 | mathematics | 22 | `math.prob.linearity-expectation` | Linearity of Expectation |
| 1311 | mathematics | 22 | `math.prob.law-of-unconscious` | Law of the Unconscious Statistician |
| 1312 | mathematics | 22 | `math.prob.variance` | Variance |
| 1313 | mathematics | 22 | `math.prob.moments` | Moments |
| 1314 | mathematics | 22 | `math.prob.markov-inequality` | Markov's Inequality |
| 1315 | mathematics | 22 | `math.prob.stationary-distribution` | Stationary Distribution |
| 1316 | mathematics | 22 | `math.prob.poisson-process` | Poisson Process |
| 1317 | mathematics | 22 | `math.disc.algorithm-complexity` | Algorithm Complexity |
| 1318 | mathematics | 22 | `math.real.implicit-function-theorem` | Implicit Function Theorem |
| 1319 | mathematics | 22 | `math.real.inverse-function-theorem` | Inverse Function Theorem |
| 1320 | mathematics | 22 | `math.fnal.banach-space` | Banach Space |
| 1321 | mathematics | 22 | `math.num.numerical-differentiation` | Numerical Differentiation |
| 1322 | mathematics | 22 | `math.opt.unconstrained-optimization` | Unconstrained Optimization |
| 1323 | mathematics | 22 | `math.opt.convex-function` | Convex Function |
| 1324 | mathematics | 22 | `math.graph.algebraic-graph-theory` | Algebraic Graph Theory |
| 1325 | physics | 22 | `phys.particle.higgs-mechanism` | The Higgs Mechanism |
| 1326 | physics | 22 | `phys.mod.extrinsic-semiconductors` | Extrinsic Semiconductors: Doping and Carrier Types |
| 1327 | english | 22 | `eng.writing.narrative-writing` | Narrative Writing |
| 1328 | english | 22 | `eng.writing.descriptive-writing` | Descriptive Writing |
| 1329 | english | 22 | `eng.writing.expository-writing` | Expository Writing |
| 1330 | english | 22 | `eng.writing.persuasive-writing-basics` | Persuasive Writing Basics |
| 1331 | english | 22 | `eng.literature.metaphor-and-simile` | Metaphor and Simile |
| 1332 | english | 22 | `eng.literature.irony` | Irony |
| 1333 | english | 22 | `eng.literature.poetry-basics` | Poetry Basics |
| 1334 | english | 22 | `eng.linguistics.syntax-theory-intro` | Introduction to Syntactic Theory |
| 1335 | english | 22 | `eng.linguistics.historical-linguistics-intro` | Introduction to Historical Linguistics |
| 1336 | mathematics | 23 | `math.nt.linear-diophantine` | Linear Diophantine Equations |
| 1337 | mathematics | 23 | `math.nt.rsa-basics` | RSA Cryptography (Number-Theoretic Basis) |
| 1338 | mathematics | 23 | `math.alg.inequality-1var` | Linear Inequality in One Variable |
| 1339 | mathematics | 23 | `math.alg.absolute-value-equations` | Absolute Value Equations and Inequalities |
| 1340 | mathematics | 23 | `math.alg.linear-equation-2var` | Linear Equation in Two Variables |
| 1341 | mathematics | 23 | `math.alg.remainder-theorem` | Remainder Theorem |
| 1342 | mathematics | 23 | `math.geom.polar-curves` | Polar Curves |
| 1343 | mathematics | 23 | `math.trig.trig-graphs` | Graphs of Trigonometric Functions |
| 1344 | mathematics | 23 | `math.trig.pythagorean-identities` | Pythagorean Identities |
| 1345 | mathematics | 23 | `math.trig.reciprocal-identities` | Reciprocal Identities |
| 1346 | mathematics | 23 | `math.trig.sum-difference-formulas` | Sum and Difference Formulas |
| 1347 | mathematics | 23 | `math.trig.trig-equations` | Trigonometric Equations |
| 1348 | mathematics | 23 | `math.trig.polar-form-complex` | Polar Form of Complex Numbers |
| 1349 | mathematics | 23 | `math.calc.logarithmic-differentiation` | Logarithmic Differentiation |
| 1350 | mathematics | 23 | `math.calc.derivative-inverse-trig` | Derivatives of Inverse Trig Functions |
| 1351 | mathematics | 23 | `math.calc.hyperbolic-derivatives` | Derivatives of Hyperbolic Functions |
| 1352 | mathematics | 23 | `math.calc.integration-by-parts` | Integration by Parts |
| 1353 | mathematics | 23 | `math.calc.curl-divergence` | Curl and Divergence |
| 1354 | mathematics | 23 | `math.de.ivp` | Initial Value Problem |
| 1355 | mathematics | 23 | `math.de.first-order-ode` | First-Order ODE |
| 1356 | mathematics | 23 | `math.de.pde-classification` | Classification of Second-Order PDEs |
| 1357 | mathematics | 23 | `math.linalg.basis` | Basis |
| 1358 | mathematics | 23 | `math.prob.standard-normal` | Standard Normal Distribution |
| 1359 | mathematics | 23 | `math.prob.standard-deviation` | Standard Deviation |
| 1360 | mathematics | 23 | `math.prob.mgf` | Moment Generating Function |
| 1361 | mathematics | 23 | `math.prob.covariance` | Covariance |
| 1362 | mathematics | 23 | `math.prob.chebyshev` | Chebyshev's Inequality |
| 1363 | mathematics | 23 | `math.prob.ergodicity` | Ergodic Theorem (Markov Chains) |
| 1364 | mathematics | 23 | `math.stats.normal-distribution` | Normal Distribution (Statistics) |
| 1365 | mathematics | 23 | `math.disc.complexity-classes` | Complexity Classes |
| 1366 | mathematics | 23 | `math.fnal.hilbert-space` | Hilbert Space |
| 1367 | mathematics | 23 | `math.fnal.bounded-operator` | Bounded Linear Operator |
| 1368 | mathematics | 23 | `math.fnal.dense-subspace` | Dense Subspaces and Approximation |
| 1369 | mathematics | 23 | `math.opt.convex-optimization` | Convex Optimization |
| 1370 | mathematics | 23 | `math.opt.lagrange-multipliers` | Lagrange Multipliers |
| 1371 | mathematics | 23 | `math.opt.gradient-methods` | Gradient Descent |
| 1372 | physics | 23 | `phys.particle.standard-model` | The Standard Model |
| 1373 | physics | 23 | `phys.mod.pn-junction` | The p-n Junction |
| 1374 | english | 23 | `eng.writing.the-writing-process` | The Writing Process |
| 1375 | english | 23 | `eng.writing.creative-writing-forms` | Creative Writing Forms |
| 1376 | english | 23 | `eng.literature.symbolism` | Symbolism |
| 1377 | english | 23 | `eng.literature.imagery` | Imagery |
| 1378 | english | 23 | `eng.literature.poetic-forms` | Poetic Forms |
| 1379 | english | 23 | `eng.literature.literary-genres-overview` | Overview of Literary Genres |
| 1380 | english | 23 | `eng.linguistics.semantics-intro` | Introduction to Semantics |
| 1381 | english | 23 | `eng.linguistics.language-families` | Language Families |
| 1382 | english | 23 | `eng.linguistics.language-acquisition-intro` | Introduction to Language Acquisition |
| 1383 | mathematics | 24 | `math.nt.general-diophantine` | Diophantine Equations |
| 1384 | mathematics | 24 | `math.alg.inequality-2var` | Linear Inequality in Two Variables |
| 1385 | mathematics | 24 | `math.alg.system-linear-equations` | Systems of Linear Equations |
| 1386 | mathematics | 24 | `math.alg.factor-theorem` | Factor Theorem |
| 1387 | mathematics | 24 | `math.trig.double-angle-formulas` | Double Angle Formulas |
| 1388 | mathematics | 24 | `math.trig.product-to-sum` | Product-to-Sum and Sum-to-Product Formulas |
| 1389 | mathematics | 24 | `math.trig.de-moivres-theorem` | De Moivre's Theorem |
| 1390 | mathematics | 24 | `math.trig.eulers-formula` | Euler's Formula |
| 1391 | mathematics | 24 | `math.calc.reduction-formulas` | Reduction Formulas |
| 1392 | mathematics | 24 | `math.calc.stokes-theorem` | Stokes' Theorem |
| 1393 | mathematics | 24 | `math.calc.divergence-theorem` | Divergence Theorem |
| 1394 | mathematics | 24 | `math.de.existence-uniqueness` | Existence and Uniqueness Theorem |
| 1395 | mathematics | 24 | `math.de.separable` | Separable Differential Equation |
| 1396 | mathematics | 24 | `math.de.linear-first-order` | Linear First-Order ODE |
| 1397 | mathematics | 24 | `math.de.exact-ode` | Exact Differential Equation |
| 1398 | mathematics | 24 | `math.de.slope-field` | Slope Field |
| 1399 | mathematics | 24 | `math.de.euler-method` | Euler's Method |
| 1400 | mathematics | 24 | `math.de.second-order-ode` | Second-Order ODE |
| 1401 | mathematics | 24 | `math.linalg.dimension` | Dimension |
| 1402 | mathematics | 24 | `math.linalg.coordinates` | Coordinates |
| 1403 | mathematics | 24 | `math.linalg.matrix-representation` | Matrix Representation of Linear Map |
| 1404 | mathematics | 24 | `math.linalg.orthogonal-basis` | Orthogonal and Orthonormal Basis |
| 1405 | mathematics | 24 | `math.prob.correlation` | Correlation |
| 1406 | mathematics | 24 | `math.prob.lln` | Law of Large Numbers |
| 1407 | mathematics | 24 | `math.stats.covariance-matrix` | Covariance Matrix |
| 1408 | mathematics | 24 | `math.cx.complex-numbers-analysis` | Complex Numbers (Analysis) |
| 1409 | mathematics | 24 | `math.fnal.dual-space-functional` | Dual Space |
| 1410 | mathematics | 24 | `math.fnal.open-mapping-theorem` | Open Mapping Theorem |
| 1411 | mathematics | 24 | `math.fnal.uniform-boundedness` | Uniform Boundedness Principle |
| 1412 | mathematics | 24 | `math.fnal.riesz-representation` | Riesz Representation Theorem |
| 1413 | mathematics | 24 | `math.fnal.spectral-theory` | Spectral Theory |
| 1414 | mathematics | 24 | `math.fnal.fourier-transform` | Fourier Transform (Functional Analysis) |
| 1415 | mathematics | 24 | `math.opt.duality` | Duality Theory |
| 1416 | mathematics | 24 | `math.opt.stochastic-gradient` | Stochastic Gradient Descent |
| 1417 | mathematics | 24 | `math.opt.newton-optimization` | Newton's Method for Optimization |
| 1418 | physics | 24 | `phys.mod.diode-rectification` | Diode Rectifying Behavior |
| 1419 | english | 24 | `eng.writing.outlining-and-planning` | Outlining and Planning |
| 1420 | english | 24 | `eng.literature.meter-and-rhyme` | Meter and Rhyme |
| 1421 | english | 24 | `eng.literature.short-story-study` | Short Story Study |
| 1422 | english | 24 | `eng.literature.literary-periods-survey` | Survey of Literary Periods |
| 1423 | english | 24 | `eng.linguistics.pragmatics-intro` | Introduction to Pragmatics |
| 1424 | english | 24 | `eng.linguistics.psycholinguistics-intro` | Introduction to Psycholinguistics |
| 1425 | mathematics | 25 | `math.nt.pythagorean-triples` | Pythagorean Triples |
| 1426 | mathematics | 25 | `math.nt.pells-equation` | Pell's Equation |
| 1427 | mathematics | 25 | `math.nt.algebraic-number-theory` | Algebraic Number Theory |
| 1428 | mathematics | 25 | `math.nt.analytic-number-theory` | Analytic Number Theory |
| 1429 | mathematics | 25 | `math.alg.substitution-method` | Substitution Method |
| 1430 | mathematics | 25 | `math.alg.elimination-method` | Elimination Method |
| 1431 | mathematics | 25 | `math.alg.system-3var` | Systems of 3 Equations in 3 Variables |
| 1432 | mathematics | 25 | `math.alg.factoring` | Factoring Polynomials |
| 1433 | mathematics | 25 | `math.trig.half-angle-formulas` | Half Angle Formulas |
| 1434 | mathematics | 25 | `math.calc.trig-integrals` | Trigonometric Integrals |
| 1435 | mathematics | 25 | `math.de.bernoulli` | Bernoulli Equation |
| 1436 | mathematics | 25 | `math.de.homogeneous-ode` | Homogeneous First-Order ODE |
| 1437 | mathematics | 25 | `math.de.second-order-linear` | Second-Order Linear ODE |
| 1438 | mathematics | 25 | `math.de.laplace-transform` | Laplace Transform |
| 1439 | mathematics | 25 | `math.de.systems-ode` | Systems of ODEs |
| 1440 | mathematics | 25 | `math.de.bvp` | Boundary Value Problem |
| 1441 | mathematics | 25 | `math.linalg.linear-system` | System of Linear Equations |
| 1442 | mathematics | 25 | `math.linalg.change-of-basis` | Change of Basis |
| 1443 | mathematics | 25 | `math.linalg.spectral-theorem` | Spectral Theorem |
| 1444 | mathematics | 25 | `math.linalg.gram-schmidt` | Gram-Schmidt Process |
| 1445 | mathematics | 25 | `math.prob.clt` | Central Limit Theorem |
| 1446 | mathematics | 25 | `math.stats.correlation` | Sample Correlation |
| 1447 | mathematics | 25 | `math.cx.complex-function` | Complex-Valued Function |
| 1448 | mathematics | 25 | `math.fnal.hahn-banach` | Hahn-Banach Theorem |
| 1449 | mathematics | 25 | `math.fnal.closed-graph-theorem` | Closed Graph Theorem |
| 1450 | mathematics | 25 | `math.fnal.compact-operator-spectrum` | Compact Operators |
| 1451 | mathematics | 25 | `math.fnal.distributions` | Distributions |
| 1452 | mathematics | 25 | `math.num.euler-method` | Euler's Method (Numerical ODE) |
| 1453 | mathematics | 25 | `math.opt.kkt` | KKT Conditions |
| 1454 | english | 25 | `eng.writing.drafting` | Drafting |
| 1455 | english | 25 | `eng.literature.novel-study` | Novel Study |
| 1456 | english | 25 | `eng.literature.literary-criticism-intro` | Introduction to Literary Criticism |
| 1457 | english | 25 | `eng.linguistics.discourse-analysis-intro` | Introduction to Discourse Analysis |
| 1458 | english | 25 | `eng.linguistics.sociolinguistics-intro` | Introduction to Sociolinguistics |
| 1459 | mathematics | 26 | `math.nt.algebraic-integers` | Algebraic Integers |
| 1460 | mathematics | 26 | `math.alg.factoring-gcf` | Factoring out the GCF |
| 1461 | mathematics | 26 | `math.alg.factoring-special` | Special Factoring Patterns |
| 1462 | mathematics | 26 | `math.alg.rational-expressions` | Rational Expressions |
| 1463 | mathematics | 26 | `math.calc.trig-substitution` | Trigonometric Substitution |
| 1464 | mathematics | 26 | `math.de.second-order-homogeneous` | Homogeneous Second-Order Linear ODE |
| 1465 | mathematics | 26 | `math.de.laplace-properties` | Laplace Transform Properties |
| 1466 | mathematics | 26 | `math.de.convolution-theorem` | Convolution Theorem (Laplace) |
| 1467 | mathematics | 26 | `math.de.phase-plane` | Phase Plane Analysis |
| 1468 | mathematics | 26 | `math.de.series-solution` | Series Solution of ODEs |
| 1469 | mathematics | 26 | `math.de.sturm-liouville` | Sturm-Liouville Theory |
| 1470 | mathematics | 26 | `math.de.fourier-series` | Fourier Series |
| 1471 | mathematics | 26 | `math.linalg.augmented-matrix` | Augmented Matrix |
| 1472 | mathematics | 26 | `math.linalg.positive-definite` | Positive Definite Matrix |
| 1473 | mathematics | 26 | `math.linalg.qr-factorization` | QR Factorization |
| 1474 | mathematics | 26 | `math.stats.sampling-distribution` | Sampling Distribution |
| 1475 | mathematics | 26 | `math.stats.linear-regression` | Simple Linear Regression |
| 1476 | mathematics | 26 | `math.stats.normal-approximation` | Normal Approximation |
| 1477 | mathematics | 26 | `math.cx.cauchy-riemann` | Cauchy-Riemann Equations |
| 1478 | mathematics | 26 | `math.num.interpolation` | Polynomial Interpolation |
| 1479 | mathematics | 26 | `math.num.iterative-linear` | Iterative Methods for Linear Systems |
| 1480 | mathematics | 26 | `math.num.runge-kutta` | Runge-Kutta Methods |
| 1481 | mathematics | 26 | `math.opt.linear-programming` | Linear Programming |
| 1482 | english | 26 | `eng.writing.revising-for-content` | Revising for Content |
| 1483 | english | 26 | `eng.literature.comparative-literature-intro` | Introduction to Comparative Literature |
| 1484 | english | 26 | `eng.linguistics.applied-linguistics-intro` | Introduction to Applied Linguistics |
| 1485 | english | 26 | `eng.linguistics.dialectology` | Dialectology |
| 1486 | english | 26 | `eng.linguistics.corpus-linguistics-intro` | Introduction to Corpus Linguistics |
| 1487 | english | 26 | `eng.communication.discourse-markers-advanced` | Advanced Discourse Markers |
| 1488 | english | 26 | `eng.communication.cross-cultural-communication` | Cross-Cultural Communication |
| 1489 | mathematics | 27 | `math.nt.number-fields` | Number Fields |
| 1490 | mathematics | 27 | `math.alg.factoring-trinomials` | Factoring Trinomials |
| 1491 | mathematics | 27 | `math.alg.rational-expressions-addition` | Addition of Rational Expressions |
| 1492 | mathematics | 27 | `math.alg.rational-expressions-multiplication` | Multiplication of Rational Expressions |
| 1493 | mathematics | 27 | `math.alg.rational-equations` | Rational Equations |
| 1494 | mathematics | 27 | `math.de.wronskian` | Wronskian |
| 1495 | mathematics | 27 | `math.de.stability-analysis` | Stability Analysis |
| 1496 | mathematics | 27 | `math.de.frobenius-method` | Frobenius Method |
| 1497 | mathematics | 27 | `math.de.legendre-equation` | Legendre's Equation |
| 1498 | mathematics | 27 | `math.de.eigenfunction-expansion` | Eigenfunction Expansion |
| 1499 | mathematics | 27 | `math.de.fourier-convergence` | Convergence of Fourier Series |
| 1500 | mathematics | 27 | `math.de.fourier-sine-cosine` | Fourier Sine and Cosine Series |
| 1501 | mathematics | 27 | `math.de.fourier-transform` | Fourier Transform |
| 1502 | mathematics | 27 | `math.de.separation-of-variables-pde` | Separation of Variables (PDE) |
| 1503 | mathematics | 27 | `math.linalg.row-reduction` | Row Reduction |
| 1504 | mathematics | 27 | `math.linalg.svd` | Singular Value Decomposition |
| 1505 | mathematics | 27 | `math.stats.standard-error` | Standard Error |
| 1506 | mathematics | 27 | `math.stats.estimator` | Estimator |
| 1507 | mathematics | 27 | `math.stats.confidence-interval` | Confidence Interval |
| 1508 | mathematics | 27 | `math.stats.hypothesis-testing` | Hypothesis Testing |
| 1509 | mathematics | 27 | `math.stats.multiple-regression` | Multiple Linear Regression |
| 1510 | mathematics | 27 | `math.cx.analytic-functions` | Analytic (Holomorphic) Functions |
| 1511 | mathematics | 27 | `math.num.splines` | Spline Interpolation |
| 1512 | mathematics | 27 | `math.num.numerical-integration` | Numerical Integration |
| 1513 | mathematics | 27 | `math.num.qr-algorithm` | QR Algorithm |
| 1514 | mathematics | 27 | `math.num.stiff-ode` | Stiff ODEs and Implicit Methods |
| 1515 | mathematics | 27 | `math.opt.quadratic-programming` | Quadratic Programming |
| 1516 | mathematics | 27 | `math.opt.semidefinite-programming` | Semidefinite Programming |
| 1517 | mathematics | 27 | `math.opt.integer-programming` | Integer Programming |
| 1518 | english | 27 | `eng.writing.editing-and-proofreading` | Editing and Proofreading |
| 1519 | english | 27 | `eng.linguistics.bilingualism-and-multilingualism` | Bilingualism and Multilingualism |
| 1520 | english | 27 | `eng.linguistics.computational-linguistics-intro` | Introduction to Computational Linguistics |
| 1521 | mathematics | 28 | `math.alg.quadratic-equation` | Quadratic Equation |
| 1522 | mathematics | 28 | `math.de.variation-of-parameters` | Variation of Parameters |
| 1523 | mathematics | 28 | `math.de.bessel-equation` | Bessel's Equation |
| 1524 | mathematics | 28 | `math.de.heat-equation` | Heat Equation |
| 1525 | mathematics | 28 | `math.de.wave-equation` | Wave Equation |
| 1526 | mathematics | 28 | `math.de.laplace-equation` | Laplace's Equation |
| 1527 | mathematics | 28 | `math.de.nonlinear-ode` | Nonlinear ODE |
| 1528 | mathematics | 28 | `math.linalg.row-echelon` | Row Echelon Form |
| 1529 | mathematics | 28 | `math.linalg.lu-factorization` | LU Factorization |
| 1530 | mathematics | 28 | `math.linalg.singular-values` | Singular Values |
| 1531 | mathematics | 28 | `math.linalg.pseudoinverse` | Moore-Penrose Pseudoinverse |
| 1532 | mathematics | 28 | `math.prob.characteristic-function` | Characteristic Function |
| 1533 | mathematics | 28 | `math.stats.bias-variance` | Bias-Variance Tradeoff |
| 1534 | mathematics | 28 | `math.stats.consistency` | Consistency of Estimators |
| 1535 | mathematics | 28 | `math.stats.mle` | Maximum Likelihood Estimation |
| 1536 | mathematics | 28 | `math.stats.method-of-moments` | Method of Moments |
| 1537 | mathematics | 28 | `math.stats.ci-mean` | Confidence Interval for a Mean |
| 1538 | mathematics | 28 | `math.stats.ci-proportion` | Confidence Interval for a Proportion |
| 1539 | mathematics | 28 | `math.stats.test-statistic` | Test Statistic |
| 1540 | mathematics | 28 | `math.stats.type-errors` | Type I and Type II Errors |
| 1541 | mathematics | 28 | `math.stats.z-test` | z-Test |
| 1542 | mathematics | 28 | `math.stats.t-test` | t-Test |
| 1543 | mathematics | 28 | `math.stats.chi-squared-test` | Chi-Squared Test |
| 1544 | mathematics | 28 | `math.stats.anova` | Analysis of Variance |
| 1545 | mathematics | 28 | `math.stats.nonparametric` | Nonparametric Tests |
| 1546 | mathematics | 28 | `math.stats.sufficient-statistic` | Sufficient Statistic |
| 1547 | mathematics | 28 | `math.cx.power-series-cx` | Power Series in ℂ |
| 1548 | mathematics | 28 | `math.cx.complex-integration` | Complex Line Integral |
| 1549 | mathematics | 28 | `math.cx.singularities` | Singularities |
| 1550 | mathematics | 28 | `math.cx.conformal-mapping` | Conformal Mapping |
| 1551 | mathematics | 28 | `math.num.svd` | SVD (Numerical) |
| 1552 | mathematics | 28 | `math.opt.pca` | Principal Component Analysis |
| 1553 | english | 28 | `eng.writing.essay-structure` | Essay Structure |
| 1554 | english | 28 | `eng.linguistics.translation-studies-intro` | Introduction to Translation Studies |
| 1555 | mathematics | 29 | `math.nt.prime-number-theorem` | Prime Number Theorem |
| 1556 | mathematics | 29 | `math.alg.completing-the-square` | Completing the Square |
| 1557 | mathematics | 29 | `math.alg.polynomial-roots` | Polynomial Roots (Real and Complex) |
| 1558 | mathematics | 29 | `math.geom.conic-sections` | Conic Sections |
| 1559 | mathematics | 29 | `math.func.quadratic-function` | Quadratic Function |
| 1560 | mathematics | 29 | `math.de.harmonic-functions` | Harmonic Functions |
| 1561 | mathematics | 29 | `math.de.poisson-equation` | Poisson's Equation |
| 1562 | mathematics | 29 | `math.de.bifurcation` | Bifurcation Theory |
| 1563 | mathematics | 29 | `math.linalg.rank` | Rank |
| 1564 | mathematics | 29 | `math.linalg.null-space` | Null Space |
| 1565 | mathematics | 29 | `math.linalg.cholesky` | Cholesky Decomposition |
| 1566 | mathematics | 29 | `math.stats.p-value` | p-value |
| 1567 | mathematics | 29 | `math.stats.power` | Power of a Test |
| 1568 | mathematics | 29 | `math.stats.two-way-anova` | Two-Way ANOVA |
| 1569 | mathematics | 29 | `math.stats.bayesian-inference` | Bayesian Statistics |
| 1570 | mathematics | 29 | `math.stats.experimental-design` | Experimental Design |
| 1571 | mathematics | 29 | `math.stats.rao-blackwell` | Rao-Blackwell Theorem |
| 1572 | mathematics | 29 | `math.cx.harmonic-functions` | Harmonic Functions (Complex Analysis) |
| 1573 | mathematics | 29 | `math.cx.cauchy-theorem` | Cauchy's Theorem |
| 1574 | mathematics | 29 | `math.cx.identity-theorem` | Identity Theorem |
| 1575 | mathematics | 29 | `math.cx.poles` | Poles and Meromorphic Functions |
| 1576 | mathematics | 29 | `math.cx.essential-singularity` | Essential Singularity |
| 1577 | mathematics | 29 | `math.cx.laurent-series` | Laurent Series |
| 1578 | mathematics | 29 | `math.cx.mobius-transformation` | Möbius Transformation |
| 1579 | mathematics | 29 | `math.cx.riemann-mapping` | Riemann Mapping Theorem |
| 1580 | mathematics | 29 | `math.fnal.special-functions` | Special Functions |
| 1581 | mathematics | 29 | `math.num.lu-factorization` | LU Factorization (Numerical) |
| 1582 | english | 29 | `eng.writing.thesis-statements` | Thesis Statements |
| 1583 | english | 29 | `eng.composition.audience-and-purpose` | Audience and Purpose |
| 1584 | mathematics | 30 | `math.alg.quadratic-formula` | Quadratic Formula |
| 1585 | mathematics | 30 | `math.alg.rational-root-theorem` | Rational Root Theorem |
| 1586 | mathematics | 30 | `math.alg.fundamental-theorem-algebra` | Fundamental Theorem of Algebra |
| 1587 | mathematics | 30 | `math.alg.polynomial-inequality` | Polynomial Inequality |
| 1588 | mathematics | 30 | `math.alg.vietas-formulas` | Vieta's Formulas |
| 1589 | mathematics | 30 | `math.geom.parabola` | Parabola |
| 1590 | mathematics | 30 | `math.geom.ellipse` | Ellipse |
| 1591 | mathematics | 30 | `math.geom.hyperbola` | Hyperbola |
| 1592 | mathematics | 30 | `math.func.vertex-form` | Vertex Form of a Quadratic |
| 1593 | mathematics | 30 | `math.func.polynomial-function` | Polynomial Function |
| 1594 | mathematics | 30 | `math.calc.partial-fractions` | Partial Fraction Decomposition |
| 1595 | mathematics | 30 | `math.de.higher-order-ode` | Higher-Order Linear ODE |
| 1596 | mathematics | 30 | `math.de.greens-function` | Green's Function |
| 1597 | mathematics | 30 | `math.de.chaos` | Chaotic Dynamics |
| 1598 | mathematics | 30 | `math.linalg.rank-nullity` | Rank-Nullity Theorem |
| 1599 | mathematics | 30 | `math.linalg.eigenspace` | Eigenspace |
| 1600 | mathematics | 30 | `math.stats.conjugate-prior` | Conjugate Prior |
| 1601 | mathematics | 30 | `math.stats.credible-interval` | Credible Interval |
| 1602 | mathematics | 30 | `math.disc.linear-recurrence` | Linear Recurrence |
| 1603 | mathematics | 30 | `math.cx.cauchy-goursat` | Cauchy-Goursat Theorem |
| 1604 | mathematics | 30 | `math.cx.cauchy-integral-formula` | Cauchy Integral Formula |
| 1605 | mathematics | 30 | `math.cx.analytic-continuation` | Analytic Continuation |
| 1606 | mathematics | 30 | `math.cx.residue` | Residue |
| 1607 | mathematics | 30 | `math.num.cholesky` | Cholesky Factorization (Numerical) |
| 1608 | english | 30 | `eng.writing.citations-and-referencing` | Citations and Referencing |
| 1609 | english | 30 | `eng.composition.claim-evidence-reasoning` | Claim, Evidence, and Reasoning |
| 1610 | english | 30 | `eng.composition.rhetorical-appeals` | Rhetorical Appeals: Ethos, Pathos, Logos |
| 1611 | mathematics | 31 | `math.alg.discriminant` | Discriminant |
| 1612 | mathematics | 31 | `math.alg.complex-polynomial-roots` | Complex Roots of Polynomials |
| 1613 | mathematics | 31 | `math.alg.rational-inequality` | Rational Inequality |
| 1614 | mathematics | 31 | `math.func.end-behavior` | End Behavior |
| 1615 | mathematics | 31 | `math.func.rational-root` | Real Roots of Polynomials |
| 1616 | mathematics | 31 | `math.func.rational-function` | Rational Function |
| 1617 | mathematics | 31 | `math.de.char-equation` | Characteristic Equation |
| 1618 | mathematics | 31 | `math.de.inverse-laplace` | Inverse Laplace Transform |
| 1619 | mathematics | 31 | `math.linalg.diagonalization` | Diagonalization |
| 1620 | mathematics | 31 | `math.cx.higher-derivatives` | Derivatives of Holomorphic Functions |
| 1621 | mathematics | 31 | `math.cx.morera-theorem` | Morera's Theorem |
| 1622 | mathematics | 31 | `math.cx.residue-theorem` | Residue Theorem |
| 1623 | mathematics | 31 | `math.cx.maximum-modulus` | Maximum Modulus Principle |
| 1624 | mathematics | 31 | `math.cx.riemann-surface` | Riemann Surface |
| 1625 | mathematics | 31 | `math.cx.riemann-zeta` | Riemann Zeta Function |
| 1626 | english | 31 | `eng.composition.argumentation-basics` | Argumentation Basics |
| 1627 | english | 31 | `eng.composition.rhetorical-devices` | Rhetorical Devices |
| 1628 | mathematics | 32 | `math.nt.riemann-hypothesis` | Riemann Hypothesis |
| 1629 | mathematics | 32 | `math.func.vertical-asymptote` | Vertical Asymptote |
| 1630 | mathematics | 32 | `math.func.horizontal-asymptote` | Horizontal Asymptote |
| 1631 | mathematics | 32 | `math.de.undetermined-coefficients` | Method of Undetermined Coefficients |
| 1632 | mathematics | 32 | `math.de.laplace-ode` | Solving ODEs with Laplace Transform |
| 1633 | mathematics | 32 | `math.de.systems-matrix-method` | Matrix Method for Linear Systems |
| 1634 | mathematics | 32 | `math.linalg.matrix-exponential` | Matrix Exponential |
| 1635 | mathematics | 32 | `math.linalg.jordan-form` | Jordan Normal Form |
| 1636 | mathematics | 32 | `math.cx.liouville-theorem` | Liouville's Theorem |
| 1637 | mathematics | 32 | `math.cx.real-integral-residues` | Evaluating Real Integrals via Residues |
| 1638 | mathematics | 32 | `math.cx.argument-principle` | Argument Principle |
| 1639 | english | 32 | `eng.composition.counterargument-and-rebuttal` | Counterargument and Rebuttal |
| 1640 | english | 32 | `eng.composition.logical-fallacies` | Logical Fallacies |
| 1641 | english | 32 | `eng.composition.figurative-language-in-composition` | Figurative Language in Composition |
| 1642 | english | 32 | `eng.composition.rhetorical-analysis` | Rhetorical Analysis |
| 1643 | mathematics | 33 | `math.de.harmonic-oscillator` | Harmonic Oscillator |
| 1644 | mathematics | 33 | `math.cx.fundamental-theorem-algebra` | Fundamental Theorem of Algebra (Complex Analysis) |
| 1645 | mathematics | 33 | `math.cx.rouche-theorem` | Rouché's Theorem |
| 1646 | english | 33 | `eng.composition.style-voice-and-tone` | Style, Voice, and Tone |
| 1647 | english | 33 | `eng.composition.persuasive-techniques` | Advanced Persuasive Techniques |
| 1648 | english | 33 | `eng.composition.comparative-essay-writing` | Comparative Essay Writing |
| 1649 | english | 33 | `eng.composition.research-paper-writing` | Research Paper Writing |
| 1650 | mathematics | 34 | `math.de.resonance` | Resonance |
| 1651 | english | 34 | `eng.composition.academic-writing-conventions` | Academic Writing Conventions |
| 1652 | english | 35 | `eng.composition.plagiarism-and-citation-ethics` | Plagiarism and Citation Ethics |
| 1653 | english | 35 | `eng.composition.editing-for-style` | Editing for Style |
| 1654 | english | 35 | `eng.communication.academic-writing-advanced` | Advanced Academic Writing |
| 1655 | english | 36 | `eng.communication.research-methodology-writing` | Writing Research Methodology |
| 1656 | english | 36 | `eng.communication.technical-writing` | Technical Writing |
| 1657 | english | 36 | `eng.communication.business-writing` | Business Writing |
| 1658 | english | 37 | `eng.communication.professional-communication` | Professional Communication |
| 1659 | english | 37 | `eng.communication.presentation-design` | Presentation Design |
| 1660 | english | 37 | `eng.communication.editing-for-publication` | Editing for Publication |
| 1661 | english | 38 | `eng.communication.negotiation-language` | Negotiation Language |
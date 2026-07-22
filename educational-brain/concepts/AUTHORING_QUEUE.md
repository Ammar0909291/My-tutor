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

Total queued: **1672** (= 1,756 KG concepts − 84 already `READY`).

## Root / intermediate / terminal breakdown (from the KG alone)

Root = `requires` is empty. Terminal = no other concept in the same
subject lists it in `requires` (a true leaf — nothing downstream depends
on it). Intermediate = everything else. Computed directly from each
subject's live `graph.json`, independent of Educational Brain or
Blueprint status:

| Subject | Root | Intermediate | Terminal | Max level | Total |
|---|---|---|---|---|---|
| mathematics | 1 | 521 | 386 | 34 | 908 |
| physics | 1 | 157 | 80 | 24 | 238 |
| english | 2 | 156 | 58 | 38 | 216 |
| chemistry | 1 | 117 | 68 | 21 | 186 |
| biology | 1 | 71 | 17 | 21 | 89 |
| computer_science | 1 | 94 | 24 | 21 | 119 |

## Domain-in-progress note (math.found)

`math.found` (82 concepts) is IN PROGRESS, not COMPLETE. 13 of 82
authored so far: Wave 1 (root + 4 direct children) + Wave 2 (8 level-2
concepts: `definition`, `generalization`, `inductive-reasoning`,
`logic`, `mathematical-modeling`, `mathematical-notation`,
`mathematical-symbols`, `problem-solving-strategies`). Wave 3 (6
level-3 concepts, whose prerequisites are now all satisfied by Waves
1-2) is next, in strict order, no other domain started:
`axiom`, `deductive-reasoning`, `proposition`, `reading-mathematics`,
`set-theory`, `variable`. 69 math.found concepts remain after Wave 3.

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
| 39 | mathematics | 3 | `math.found.variable` | Variable |
| 40 | mathematics | 3 | `math.found.reading-mathematics` | Reading Mathematics |
| 41 | mathematics | 3 | `math.found.proposition` | Proposition |
| 42 | mathematics | 3 | `math.found.axiom` | Axiom |
| 43 | mathematics | 3 | `math.found.set-theory` | Set Theory |
| 44 | mathematics | 3 | `math.found.deductive-reasoning` | Deductive Reasoning |
| 45 | mathematics | 3 | `math.geom.line-segment` | Line Segment |
| 46 | mathematics | 3 | `math.geom.ray` | Ray |
| 47 | mathematics | 3 | `math.geom.plane` | Plane |
| 48 | english | 3 | `eng.phonetics.consonant-sounds` | Consonant Phoneme Classification |
| 49 | english | 3 | `eng.phonetics.vowel-sounds` | Vowel Phoneme Classification |
| 50 | chemistry | 3 | `chem.found.stoichiometry` | Stoichiometry |
| 51 | chemistry | 3 | `chem.found.concentration` | Concentration Units |
| 52 | chemistry | 3 | `chem.atomic.atomic-spectra` | Atomic Spectra |
| 53 | chemistry | 3 | `chem.atomic.photoelectric-effect` | Photoelectric Effect and Dual Nature |
| 54 | chemistry | 3 | `chem.period.classification` | Early Classification of Elements |
| 55 | chemistry | 3 | `chem.state.gas-laws` | Gas Laws |
| 56 | chemistry | 3 | `chem.thermo.first-law` | First Law of Thermodynamics |
| 57 | chemistry | 3 | `chem.surface.emulsions` | Emulsions and Gels |
| 58 | chemistry | 3 | `chem.env.air-pollution` | Air Pollution |
| 59 | chemistry | 3 | `chem.env.water-soil` | Water and Soil Pollution |
| 60 | biology | 3 | `bio.found.five-kingdom` | Five Kingdom Classification |
| 61 | biology | 3 | `bio.found.binomial-nomenclature` | Binomial Nomenclature |
| 62 | biology | 3 | `bio.cell.cell-theory` | Cell Theory |
| 63 | biology | 3 | `bio.eco.organism-environment` | Organisms and their Environment |
| 64 | computer_science | 3 | `cs.found.cpu-architecture` | CPU Architecture and Instruction Sets |
| 65 | computer_science | 3 | `cs.algo.flowcharts` | Flowcharts and Pseudocode |
| 66 | computer_science | 3 | `cs.algo.asymptotic-notation` | Asymptotic Notation |
| 67 | computer_science | 3 | `cs.os.process-management` | Process Management |
| 68 | computer_science | 3 | `cs.net.osi-tcp-ip-models` | OSI and TCP/IP Reference Models |
| 69 | computer_science | 3 | `cs.sec.cryptography-basics` | Cryptography Fundamentals |
| 70 | mathematics | 4 | `math.found.logical-connectives` | Logical Connectives |
| 71 | mathematics | 4 | `math.found.predicate` | Predicate |
| 72 | mathematics | 4 | `math.found.axiomatic-system` | Axiomatic System |
| 73 | mathematics | 4 | `math.found.set` | Set |
| 74 | mathematics | 4 | `math.geom.angle` | Angle |
| 75 | mathematics | 4 | `math.geom.perimeter` | Perimeter |
| 76 | mathematics | 4 | `math.geom.circle` | Circle |
| 77 | mathematics | 4 | `math.geom.length` | Length |
| 78 | mathematics | 4 | `math.prob.sample-space` | Sample Space |
| 79 | mathematics | 4 | `math.disc.graph` | Graph |
| 80 | mathematics | 4 | `math.abst.algebraic-structure` | Algebraic Structure |
| 81 | mathematics | 4 | `math.top.topological-space` | Topological Space |
| 82 | mathematics | 4 | `math.meas.sigma-algebra` | σ-Algebra |
| 83 | mathematics | 4 | `math.graph.graph` | Graph |
| 84 | english | 4 | `eng.phonics.consonants` | Consonant Sounds |
| 85 | english | 4 | `eng.phonics.short-vowels` | Short Vowel Sounds |
| 86 | english | 4 | `eng.phonics.sight-words` | High-Frequency Sight Words |
| 87 | english | 4 | `eng.phonetics.ipa-basics` | IPA Basics for English |
| 88 | chemistry | 4 | `chem.atomic.bohr-model` | Bohr Model of the Atom |
| 89 | chemistry | 4 | `chem.state.molar-mass-gas` | Molar Mass from Gas Data |
| 90 | chemistry | 4 | `chem.state.real-gases` | Real Gases and van der Waals Equation |
| 91 | chemistry | 4 | `chem.sol.types` | Types of Solutions |
| 92 | chemistry | 4 | `chem.thermo.enthalpy` | Enthalpy and Hess's Law |
| 93 | chemistry | 4 | `chem.thermo.entropy` | Entropy and Second Law |
| 94 | chemistry | 4 | `chem.thermo.heat-capacities` | Heat Capacities of Gases |
| 95 | chemistry | 4 | `chem.kinet.rate` | Rate of Reaction |
| 96 | biology | 4 | `bio.found.viruses-viroids-lichens` | Viruses, Viroids and Lichens |
| 97 | biology | 4 | `bio.cell.prokaryotic-cell` | Prokaryotic Cell Structure |
| 98 | biology | 4 | `bio.cell.eukaryotic-cell` | Eukaryotic Cell Structure |
| 99 | biology | 4 | `bio.eco.population-ecology` | Population Ecology |
| 100 | computer_science | 4 | `cs.found.pipelining-cache` | Pipelining and Cache Memory |
| 101 | computer_science | 4 | `cs.algo.time-space-complexity` | Time and Space Complexity Analysis |
| 102 | computer_science | 4 | `cs.prog.intro-programming` | Introduction to Programming |
| 103 | computer_science | 4 | `cs.os.threads-concurrency` | Threads and Concurrency |
| 104 | computer_science | 4 | `cs.os.cpu-scheduling` | CPU Scheduling Algorithms |
| 105 | computer_science | 4 | `cs.os.memory-management-os` | Memory Management |
| 106 | computer_science | 4 | `cs.net.ip-addressing` | IP Addressing and Subnetting |
| 107 | computer_science | 4 | `cs.net.tcp-udp-transport` | TCP and UDP — Transport Layer |
| 108 | computer_science | 4 | `cs.theory.finite-automata` | Finite Automata |
| 109 | mathematics | 5 | `math.found.truth-table` | Truth Table |
| 110 | mathematics | 5 | `math.found.predicate-logic` | Predicate Logic |
| 111 | mathematics | 5 | `math.found.set-membership` | Set Membership |
| 112 | mathematics | 5 | `math.found.empty-set` | Empty Set |
| 113 | mathematics | 5 | `math.found.set-builder-notation` | Set-Builder Notation |
| 114 | mathematics | 5 | `math.found.cartesian-product` | Cartesian Product |
| 115 | mathematics | 5 | `math.found.ordered-pair` | Ordered Pair |
| 116 | mathematics | 5 | `math.found.set-theory-axiomatic` | Axiomatic Set Theory |
| 117 | mathematics | 5 | `math.geom.angle-types` | Types of Angles |
| 118 | mathematics | 5 | `math.geom.angle-measurement` | Angle Measurement |
| 119 | mathematics | 5 | `math.geom.angle-pairs` | Angle Pairs |
| 120 | mathematics | 5 | `math.geom.perpendicular-lines` | Perpendicular Lines |
| 121 | mathematics | 5 | `math.geom.triangle` | Triangle |
| 122 | mathematics | 5 | `math.geom.circle-parts` | Parts of a Circle |
| 123 | mathematics | 5 | `math.geom.circle-circumference` | Circumference of a Circle |
| 124 | mathematics | 5 | `math.prob.event` | Event |
| 125 | mathematics | 5 | `math.disc.graph-types` | Types of Graphs |
| 126 | mathematics | 5 | `math.disc.graph-connectivity` | Graph Connectivity |
| 127 | mathematics | 5 | `math.disc.graph-coloring` | Graph Coloring |
| 128 | mathematics | 5 | `math.disc.planar-graph` | Planar Graph |
| 129 | mathematics | 5 | `math.disc.propositional-logic` | Propositional Logic |
| 130 | mathematics | 5 | `math.top.open-sets` | Open and Closed Sets (Topology) |
| 131 | mathematics | 5 | `math.top.basis` | Basis for a Topology |
| 132 | mathematics | 5 | `math.top.continuity-top` | Continuity (Topology) |
| 133 | mathematics | 5 | `math.top.compactness` | Compactness (Topology) |
| 134 | mathematics | 5 | `math.top.connectedness` | Connectedness (Topology) |
| 135 | mathematics | 5 | `math.top.separation-axioms` | Separation Axioms |
| 136 | mathematics | 5 | `math.top.product-space` | Product Topology |
| 137 | mathematics | 5 | `math.top.simplicial-complex` | Simplicial Complex |
| 138 | mathematics | 5 | `math.meas.measure` | Measure |
| 139 | mathematics | 5 | `math.meas.measurable-function` | Measurable Function |
| 140 | mathematics | 5 | `math.graph.graph-invariants` | Graph Invariants |
| 141 | mathematics | 5 | `math.graph.graph-operations` | Graph Operations |
| 142 | mathematics | 5 | `math.graph.matching` | Matching |
| 143 | english | 5 | `eng.phonics.consonant-blends` | Consonant Blends |
| 144 | english | 5 | `eng.phonics.long-vowels-silent-e` | Long Vowels and Silent E |
| 145 | english | 5 | `eng.phonetics.minimal-pairs` | Minimal Pairs |
| 146 | english | 5 | `eng.phonetics.syllable-stress` | Word Stress |
| 147 | chemistry | 5 | `chem.atomic.quantum-numbers` | Quantum Numbers |
| 148 | chemistry | 5 | `chem.sol.solubility` | Solubility and Henry's Law |
| 149 | chemistry | 5 | `chem.thermo.gibbs` | Gibbs Free Energy and Spontaneity |
| 150 | chemistry | 5 | `chem.thermo.third-law` | Third Law and Absolute Entropy |
| 151 | chemistry | 5 | `chem.kinet.rate-law` | Rate Law and Order |
| 152 | chemistry | 5 | `chem.kinet.photochemistry` | Photochemical Reactions |
| 153 | biology | 5 | `bio.cell.cell-membrane-transport` | Cell Membrane and Transport |
| 154 | biology | 5 | `bio.cell.nucleus-chromosomes` | Nucleus and Chromosomes |
| 155 | biology | 5 | `bio.cell.mitochondria-energy` | Mitochondria and Energy Organelles |
| 156 | biology | 5 | `bio.cell.chloroplast-structure` | Chloroplast Structure |
| 157 | biology | 5 | `bio.cell.endomembrane-system` | Endomembrane System |
| 158 | biology | 5 | `bio.mol.biomolecule-types` | Types of Biomolecules |
| 159 | biology | 5 | `bio.eco.ecosystem-structure-function` | Ecosystem Structure and Function |
| 160 | biology | 5 | `bio.micro.microbial-diversity` | Microbial Diversity |
| 161 | computer_science | 5 | `cs.algo.divide-and-conquer` | Divide and Conquer |
| 162 | computer_science | 5 | `cs.algo.greedy-algorithms` | Greedy Algorithms |
| 163 | computer_science | 5 | `cs.prog.python-basics` | Python Language Basics |
| 164 | computer_science | 5 | `cs.os.synchronisation-deadlocks` | Synchronisation and Deadlocks |
| 165 | computer_science | 5 | `cs.os.virtual-memory` | Virtual Memory |
| 166 | computer_science | 5 | `cs.os.file-systems` | File Systems |
| 167 | computer_science | 5 | `cs.net.dns-dhcp` | DNS and DHCP |
| 168 | computer_science | 5 | `cs.net.routing-congestion` | Routing and Congestion Control |
| 169 | computer_science | 5 | `cs.theory.regular-expressions` | Regular Expressions and Regular Languages |
| 170 | mathematics | 6 | `math.found.quantifiers` | Quantifiers |
| 171 | mathematics | 6 | `math.found.logical-equivalence` | Logical Equivalence |
| 172 | mathematics | 6 | `math.found.subset` | Subset |
| 173 | mathematics | 6 | `math.found.relation` | Relation |
| 174 | mathematics | 6 | `math.found.ordinal-number` | Ordinal Number |
| 175 | mathematics | 6 | `math.geom.parallel-lines` | Parallel Lines |
| 176 | mathematics | 6 | `math.geom.triangle-types` | Types of Triangles |
| 177 | mathematics | 6 | `math.geom.right-triangle` | Right Triangle |
| 178 | mathematics | 6 | `math.geom.congruent-triangles` | Congruent Triangles |
| 179 | mathematics | 6 | `math.geom.area-triangle` | Area of a Triangle |
| 180 | mathematics | 6 | `math.geom.polygon` | Polygon |
| 181 | mathematics | 6 | `math.geom.circle-theorems` | Circle Theorems |
| 182 | mathematics | 6 | `math.geom.geometric-constructions` | Geometric Constructions |
| 183 | mathematics | 6 | `math.trig.angle-measure` | Angle Measure |
| 184 | mathematics | 6 | `math.prob.probability-measure` | Probability Measure |
| 185 | mathematics | 6 | `math.disc.euler-hamiltonian` | Euler and Hamiltonian Paths |
| 186 | mathematics | 6 | `math.disc.graph-trees` | Trees |
| 187 | mathematics | 6 | `math.disc.boolean-circuits` | Boolean Circuits and Logic Gates |
| 188 | mathematics | 6 | `math.disc.predicate-logic-disc` | Predicate Logic and Proof Methods |
| 189 | mathematics | 6 | `math.top.interior-closure` | Interior, Closure, and Boundary |
| 190 | mathematics | 6 | `math.top.homeomorphism` | Homeomorphism |
| 191 | mathematics | 6 | `math.top.tychonoff` | Tychonoff's Theorem |
| 192 | mathematics | 6 | `math.top.homotopy` | Homotopy |
| 193 | mathematics | 6 | `math.meas.lebesgue-measure` | Lebesgue Measure |
| 194 | mathematics | 6 | `math.meas.simple-function` | Simple Function |
| 195 | mathematics | 6 | `math.meas.abstract-measure-spaces` | Abstract Measure Spaces |
| 196 | mathematics | 6 | `math.graph.connectivity` | Connectivity |
| 197 | mathematics | 6 | `math.graph.graph-coloring` | Graph Coloring |
| 198 | physics | 6 | `phys.mech.universal-gravitation` | Newton's Law of Universal Gravitation |
| 199 | physics | 6 | `phys.mech.hookes-law` | Hooke's Law and Spring Force |
| 200 | physics | 6 | `phys.mech.pressure-fluids` | Pressure in Fluids |
| 201 | physics | 6 | `phys.wave.standing-waves` | Standing Waves |
| 202 | physics | 6 | `phys.wave.beats` | Beats and Beat Frequency |
| 203 | physics | 6 | `phys.opt.optical-instruments` | Optical Instruments: Eye, Microscope, Telescope |
| 204 | physics | 6 | `phys.opt.youngs-experiment` | Young's Double-Slit Experiment |
| 205 | physics | 6 | `phys.em.capacitance` | Capacitance and Capacitors |
| 206 | physics | 6 | `phys.em.ohms-law` | Ohm's Law and Resistance |
| 207 | physics | 6 | `phys.em.amperes-law` | Ampere's Circuital Law |
| 208 | physics | 6 | `phys.em.lenzs-law` | Lenz's Law and Induced EMF Direction |
| 209 | physics | 6 | `phys.em.self-inductance` | Self-Inductance |
| 210 | english | 6 | `eng.phonics.digraphs` | Consonant and Vowel Digraphs |
| 211 | english | 6 | `eng.phonetics.sentence-stress` | Sentence Stress |
| 212 | english | 6 | `eng.phonetics.phonetic-transcription` | Phonetic Transcription |
| 213 | chemistry | 6 | `chem.atomic.orbitals` | Atomic Orbitals |
| 214 | chemistry | 6 | `chem.thermo.cell-thermo` | Electrochemical Thermodynamics |
| 215 | chemistry | 6 | `chem.equil.concept` | Equilibrium Concept |
| 216 | chemistry | 6 | `chem.kinet.integrated-rate` | Integrated Rate Laws |
| 217 | chemistry | 6 | `chem.kinet.arrhenius` | Arrhenius Equation |
| 218 | chemistry | 6 | `chem.kinet.mechanism` | Reaction Mechanisms |
| 219 | chemistry | 6 | `chem.env.ozone` | Ozone Depletion |
| 220 | biology | 6 | `bio.cell.cytoskeleton` | Cytoskeleton and Cell Motility |
| 221 | biology | 6 | `bio.cell.cell-cycle` | The Cell Cycle |
| 222 | biology | 6 | `bio.cell.cell-signalling` | Cell Signalling |
| 223 | biology | 6 | `bio.mol.carbohydrates-lipids` | Carbohydrates and Lipids |
| 224 | biology | 6 | `bio.mol.proteins-structure` | Proteins and Protein Structure |
| 225 | biology | 6 | `bio.mol.nucleic-acid-structure` | Nucleic Acid Structure |
| 226 | biology | 6 | `bio.evo.origin-of-life` | Origin of Life |
| 227 | biology | 6 | `bio.physio.respiratory-system` | Human Respiratory System |
| 228 | biology | 6 | `bio.plant.plant-water-relations` | Plant Water Relations |
| 229 | biology | 6 | `bio.eco.nutrient-cycling` | Nutrient Cycling and Succession |
| 230 | biology | 6 | `bio.micro.microbial-growth-culture` | Microbial Growth and Culture Techniques |
| 231 | biology | 6 | `bio.micro.pathogenic-microbes` | Pathogenic Microorganisms and Disease |
| 232 | computer_science | 6 | `cs.algo.dynamic-programming` | Dynamic Programming |
| 233 | computer_science | 6 | `cs.prog.data-types-variables` | Data Types and Variables |
| 234 | computer_science | 6 | `cs.net.application-protocols` | Application-Layer Protocols |
| 235 | computer_science | 6 | `cs.net.wireless-mobile-networks` | Wireless and Mobile Networks |
| 236 | computer_science | 6 | `cs.theory.context-free-grammars` | Context-Free Grammars |
| 237 | mathematics | 7 | `math.found.rules-of-inference` | Rules of Inference |
| 238 | mathematics | 7 | `math.found.proper-subset` | Proper Subset |
| 239 | mathematics | 7 | `math.found.set-equality` | Set Equality |
| 240 | mathematics | 7 | `math.found.set-operations` | Set Operations |
| 241 | mathematics | 7 | `math.found.power-set` | Power Set |
| 242 | mathematics | 7 | `math.found.reflexive-relation` | Reflexive Relation |
| 243 | mathematics | 7 | `math.found.symmetric-relation` | Symmetric Relation |
| 244 | mathematics | 7 | `math.found.transitive-relation` | Transitive Relation |
| 245 | mathematics | 7 | `math.found.partition` | Partition |
| 246 | mathematics | 7 | `math.found.function-set-theoretic` | Function (Set-Theoretic) |
| 247 | mathematics | 7 | `math.found.cardinal-arithmetic` | Cardinal Arithmetic |
| 248 | mathematics | 7 | `math.geom.triangle-angle-sum` | Triangle Angle Sum Theorem |
| 249 | mathematics | 7 | `math.geom.triangle-centers` | Triangle Centers |
| 250 | mathematics | 7 | `math.geom.quadrilateral` | Quadrilateral |
| 251 | mathematics | 7 | `math.geom.regular-polygon` | Regular Polygon |
| 252 | mathematics | 7 | `math.geom.area-polygon` | Area of Polygons |
| 253 | mathematics | 7 | `math.geom.solid-3d` | Three-Dimensional Solids |
| 254 | mathematics | 7 | `math.trig.degree-radian-conversion` | Degree-Radian Conversion |
| 255 | mathematics | 7 | `math.prob.probability-axioms` | Axioms of Probability |
| 256 | mathematics | 7 | `math.disc.spanning-tree` | Spanning Tree |
| 257 | mathematics | 7 | `math.top.homotopy-equivalence` | Homotopy Equivalence |
| 258 | mathematics | 7 | `math.top.manifold` | Topological Manifold |
| 259 | mathematics | 7 | `math.meas.measure-zero` | Measure Zero |
| 260 | mathematics | 7 | `math.meas.lebesgue-integral` | Lebesgue Integral |
| 261 | mathematics | 7 | `math.graph.tree` | Tree |
| 262 | mathematics | 7 | `math.graph.maximum-flow` | Maximum Flow |
| 263 | mathematics | 7 | `math.graph.eulerian-circuit` | Eulerian Circuit |
| 264 | mathematics | 7 | `math.graph.hamiltonian-cycle` | Hamiltonian Cycle |
| 265 | physics | 7 | `phys.mech.friction` | Friction Forces |
| 266 | physics | 7 | `phys.mech.tension` | Tension in Strings and Ropes |
| 267 | physics | 7 | `phys.mech.normal-force` | Normal Force and Constraint Forces |
| 268 | physics | 7 | `phys.mech.kinetic-energy` | Kinetic Energy |
| 269 | physics | 7 | `phys.mech.potential-energy` | Potential Energy |
| 270 | physics | 7 | `phys.mech.power` | Power |
| 271 | physics | 7 | `phys.mech.impulse` | Impulse and Momentum Change |
| 272 | physics | 7 | `phys.mech.center-of-mass` | Center of Mass |
| 273 | physics | 7 | `phys.mech.angular-kinematics` | Angular Kinematics |
| 274 | physics | 7 | `phys.mech.gravitational-field` | Gravitational Field and Field Lines |
| 275 | physics | 7 | `phys.mech.stress-strain` | Stress, Strain, and Elastic Moduli |
| 276 | physics | 7 | `phys.mech.buoyancy` | Buoyancy and Archimedes' Principle |
| 277 | physics | 7 | `phys.mech.surface-tension` | Surface Tension and Capillarity |
| 278 | physics | 7 | `phys.therm.first-law` | First Law of Thermodynamics |
| 279 | physics | 7 | `phys.wave.shm` | Simple Harmonic Motion |
| 280 | physics | 7 | `phys.opt.diffraction` | Diffraction of Light |
| 281 | physics | 7 | `phys.em.dielectrics` | Dielectrics and Polarization |
| 282 | physics | 7 | `phys.em.energy-capacitor` | Energy Stored in a Capacitor |
| 283 | physics | 7 | `phys.em.resistivity` | Resistivity and Conductivity |
| 284 | physics | 7 | `phys.em.dc-circuits` | Series and Parallel Circuits |
| 285 | physics | 7 | `phys.em.electrical-power` | Electrical Power and Joule Heating |
| 286 | physics | 7 | `phys.em.solenoid` | Magnetic Field of a Solenoid and Toroid |
| 287 | physics | 7 | `phys.em.mutual-inductance` | Mutual Inductance and Transformers |
| 288 | physics | 7 | `phys.em.ac-basics` | Alternating Current: Peak and RMS Values |
| 289 | physics | 7 | `phys.em.maxwells-equations` | Maxwell's Equations and Displacement Current |
| 290 | english | 7 | `eng.phonics.syllable-types` | Syllable Types |
| 291 | english | 7 | `eng.phonetics.intonation-patterns` | Intonation Patterns |
| 292 | chemistry | 7 | `chem.atomic.electronic-config` | Electronic Configuration |
| 293 | chemistry | 7 | `chem.atomic.quantum-mech-model` | Quantum Mechanical Model |
| 294 | chemistry | 7 | `chem.equil.kc-kp` | Equilibrium Constants Kc and Kp |
| 295 | chemistry | 7 | `chem.equil.kw-ph` | Water Ionization and pH |
| 296 | chemistry | 7 | `chem.kinet.catalysis` | Catalysis |
| 297 | biology | 7 | `bio.cell.mitosis` | Mitosis |
| 298 | biology | 7 | `bio.mol.enzymes` | Enzymes and Enzyme Kinetics |
| 299 | biology | 7 | `bio.evo.evidence-for-evolution` | Evidence for Evolution |
| 300 | biology | 7 | `bio.physio.circulatory-system` | Human Circulatory System |
| 301 | biology | 7 | `bio.physio.nervous-system` | Nervous System and Neural Control |
| 302 | biology | 7 | `bio.plant.mineral-nutrition` | Mineral Nutrition in Plants |
| 303 | biology | 7 | `bio.eco.biodiversity-conservation` | Biodiversity and Conservation |
| 304 | biology | 7 | `bio.micro.microbes-in-human-welfare` | Microbes in Human Welfare |
| 305 | computer_science | 7 | `cs.algo.backtracking` | Backtracking |
| 306 | computer_science | 7 | `cs.prog.operators-expressions` | Operators and Expressions |
| 307 | computer_science | 7 | `cs.net.cloud-computing` | Cloud Computing |
| 308 | computer_science | 7 | `cs.sec.network-web-security` | Network and Web Security |
| 309 | computer_science | 7 | `cs.web.client-server-model` | The Client-Server Model |
| 310 | computer_science | 7 | `cs.theory.turing-machines` | Turing Machines |
| 311 | mathematics | 8 | `math.found.proof` | Mathematical Proof |
| 312 | mathematics | 8 | `math.found.union` | Union |
| 313 | mathematics | 8 | `math.found.intersection` | Intersection |
| 314 | mathematics | 8 | `math.found.set-difference` | Set Difference |
| 315 | mathematics | 8 | `math.found.complement` | Set Complement |
| 316 | mathematics | 8 | `math.found.venn-diagram` | Venn Diagram |
| 317 | mathematics | 8 | `math.found.equivalence-relation` | Equivalence Relation |
| 318 | mathematics | 8 | `math.found.partial-order` | Partial Order |
| 319 | mathematics | 8 | `math.found.cardinality` | Cardinality |
| 320 | mathematics | 8 | `math.geom.polygon-angle-sum` | Polygon Angle Sum |
| 321 | mathematics | 8 | `math.geom.parallelogram` | Parallelogram |
| 322 | mathematics | 8 | `math.geom.trapezoid` | Trapezoid |
| 323 | mathematics | 8 | `math.geom.area` | Area |
| 324 | mathematics | 8 | `math.geom.volume` | Volume |
| 325 | mathematics | 8 | `math.geom.platonic-solids` | Platonic Solids |
| 326 | mathematics | 8 | `math.func.function-concept` | Function |
| 327 | mathematics | 8 | `math.prob.conditional-probability` | Conditional Probability |
| 328 | mathematics | 8 | `math.abst.binary-operation` | Binary Operation |
| 329 | mathematics | 8 | `math.meas.convergence-theorems` | Convergence Theorems |
| 330 | mathematics | 8 | `math.meas.lp-space` | Lᵖ Spaces |
| 331 | mathematics | 8 | `math.meas.product-measure` | Product Measure and Fubini's Theorem |
| 332 | mathematics | 8 | `math.meas.radon-nikodym` | Radon-Nikodym Theorem |
| 333 | mathematics | 8 | `math.fnal.convolution` | Convolution |
| 334 | mathematics | 8 | `math.graph.minimum-spanning-tree` | Minimum Spanning Tree |
| 335 | mathematics | 8 | `math.graph.random-graph` | Random Graphs |
| 336 | mathematics | 8 | `math.cat.category` | Category |
| 337 | physics | 8 | `phys.mech.inclined-plane` | Motion on Inclined Planes |
| 338 | physics | 8 | `phys.mech.work-energy-theorem` | Work-Energy Theorem |
| 339 | physics | 8 | `phys.mech.conservation-of-energy` | Conservation of Mechanical Energy |
| 340 | physics | 8 | `phys.mech.conservation-of-momentum` | Conservation of Linear Momentum |
| 341 | physics | 8 | `phys.mech.torque` | Torque |
| 342 | physics | 8 | `phys.mech.gravitational-potential` | Gravitational Potential Energy |
| 343 | physics | 8 | `phys.therm.thermodynamic-processes` | Thermodynamic Processes |
| 344 | physics | 8 | `phys.wave.shm-energy` | Energy in Simple Harmonic Motion |
| 345 | physics | 8 | `phys.wave.pendulum` | Simple Pendulum |
| 346 | physics | 8 | `phys.wave.spring-mass` | Spring-Mass System |
| 347 | physics | 8 | `phys.opt.single-slit` | Single-Slit Diffraction |
| 348 | physics | 8 | `phys.em.kirchhoffs-laws` | Kirchhoff's Current and Voltage Laws |
| 349 | physics | 8 | `phys.em.emf` | EMF, Internal Resistance, and Terminal Voltage |
| 350 | physics | 8 | `phys.em.lc-circuits` | LC Oscillations and Resonance |
| 351 | physics | 8 | `phys.em.electromagnetic-waves` | Electromagnetic Waves and the EM Spectrum |
| 352 | english | 8 | `eng.phonics.decoding-fluency` | Decoding Fluency |
| 353 | english | 8 | `eng.phonetics.connected-speech` | Connected Speech |
| 354 | english | 8 | `eng.phonetics.prosody` | Prosody |
| 355 | english | 8 | `eng.writing.spelling-strategies` | Spelling Strategies |
| 356 | chemistry | 8 | `chem.period.modern-periodic-law` | Modern Periodic Law and Table |
| 357 | chemistry | 8 | `chem.equil.le-chatelier` | Le Chatelier's Principle |
| 358 | chemistry | 8 | `chem.equil.acids-bases` | Acid–Base Theories |
| 359 | chemistry | 8 | `chem.equil.solubility` | Solubility Equilibria |
| 360 | chemistry | 8 | `chem.equil.complex-equil` | Complex Ion Equilibria |
| 361 | chemistry | 8 | `chem.surface.adsorption` | Adsorption |
| 362 | biology | 8 | `bio.cell.meiosis` | Meiosis |
| 363 | biology | 8 | `bio.mol.dna-replication` | DNA Replication |
| 364 | biology | 8 | `bio.evo.natural-selection` | Natural Selection and Darwinism |
| 365 | biology | 8 | `bio.physio.digestive-system` | Human Digestive System |
| 366 | biology | 8 | `bio.physio.excretory-system` | Excretory System and Osmoregulation |
| 367 | biology | 8 | `bio.physio.endocrine-system` | Endocrine System |
| 368 | biology | 8 | `bio.physio.musculoskeletal-system` | Locomotion and Musculoskeletal System |
| 369 | biology | 8 | `bio.physio.immune-system-intro` | Immune System Overview |
| 370 | biology | 8 | `bio.plant.photosynthesis` | Photosynthesis |
| 371 | biology | 8 | `bio.plant.plant-growth-hormones` | Plant Growth and Hormones |
| 372 | biology | 8 | `bio.repro.asexual-reproduction` | Asexual Reproduction |
| 373 | biology | 8 | `bio.eco.environmental-issues` | Environmental Issues and Pollution |
| 374 | computer_science | 8 | `cs.algo.np-completeness` | NP-Completeness and Intractability |
| 375 | computer_science | 8 | `cs.prog.type-conversion` | Type Conversion and Casting |
| 376 | computer_science | 8 | `cs.control.conditionals` | Conditional Statements |
| 377 | computer_science | 8 | `cs.sec.data-protection-privacy` | Data Protection and Privacy |
| 378 | computer_science | 8 | `cs.web.html-css-basics` | HTML and CSS Basics |
| 379 | mathematics | 9 | `math.found.direct-proof` | Direct Proof |
| 380 | mathematics | 9 | `math.found.proof-by-contradiction` | Proof by Contradiction |
| 381 | mathematics | 9 | `math.found.proof-by-contrapositive` | Proof by Contrapositive |
| 382 | mathematics | 9 | `math.found.proof-by-cases` | Proof by Cases |
| 383 | mathematics | 9 | `math.found.existence-proof` | Existence Proof |
| 384 | mathematics | 9 | `math.found.writing-mathematics` | Writing Mathematics |
| 385 | mathematics | 9 | `math.found.theorem` | Theorem |
| 386 | mathematics | 9 | `math.found.conjecture` | Conjecture |
| 387 | mathematics | 9 | `math.found.equivalence-class` | Equivalence Class |
| 388 | mathematics | 9 | `math.found.total-order` | Total Order |
| 389 | mathematics | 9 | `math.found.hasse-diagram` | Hasse Diagram |
| 390 | mathematics | 9 | `math.found.finite-set` | Finite Set |
| 391 | mathematics | 9 | `math.geom.circle-area` | Area of a Circle |
| 392 | mathematics | 9 | `math.geom.geometric-proof` | Geometric Proof |
| 393 | mathematics | 9 | `math.geom.surface-area` | Surface Area |
| 394 | mathematics | 9 | `math.func.domain-range` | Domain and Range |
| 395 | mathematics | 9 | `math.func.function-notation` | Function Notation |
| 396 | mathematics | 9 | `math.func.injectivity` | Injective (One-to-One) Function |
| 397 | mathematics | 9 | `math.func.surjectivity` | Surjective (Onto) Function |
| 398 | mathematics | 9 | `math.func.composition` | Composition of Functions |
| 399 | mathematics | 9 | `math.func.periodic-function` | Periodic Function |
| 400 | mathematics | 9 | `math.func.piecewise-function` | Piecewise-Defined Function |
| 401 | mathematics | 9 | `math.func.monotonic-function` | Monotonic Function |
| 402 | mathematics | 9 | `math.func.function-operations` | Operations on Functions |
| 403 | mathematics | 9 | `math.prob.total-probability` | Law of Total Probability |
| 404 | mathematics | 9 | `math.prob.independence` | Independence |
| 405 | mathematics | 9 | `math.prob.random-variable` | Random Variable |
| 406 | mathematics | 9 | `math.abst.group-theory` | Group |
| 407 | mathematics | 9 | `math.top.quotient-space` | Quotient Space |
| 408 | mathematics | 9 | `math.meas.l2-space` | L² Space |
| 409 | mathematics | 9 | `math.cat.morphism-types` | Types of Morphisms |
| 410 | mathematics | 9 | `math.cat.functor` | Functor |
| 411 | physics | 9 | `phys.mech.conservative-forces` | Conservative and Non-Conservative Forces |
| 412 | physics | 9 | `phys.mech.collisions-elastic` | Elastic Collisions |
| 413 | physics | 9 | `phys.mech.collisions-inelastic` | Inelastic Collisions |
| 414 | physics | 9 | `phys.mech.moment-of-inertia` | Moment of Inertia |
| 415 | physics | 9 | `phys.mech.equilibrium` | Static Equilibrium |
| 416 | physics | 9 | `phys.mech.orbital-mechanics` | Circular Orbital Mechanics |
| 417 | physics | 9 | `phys.mech.escape-velocity` | Escape Velocity |
| 418 | physics | 9 | `phys.mech.bernoulli` | Bernoulli's Equation and Fluid Flow |
| 419 | physics | 9 | `phys.therm.second-law` | Second Law of Thermodynamics |
| 420 | physics | 9 | `phys.therm.heat-engines` | Heat Engines and Efficiency |
| 421 | physics | 9 | `phys.wave.damped-oscillations` | Damped Oscillations |
| 422 | physics | 9 | `phys.em.wheatstone-bridge` | Wheatstone Bridge |
| 423 | physics | 9 | `phys.em.potentiometer` | Potentiometer |
| 424 | physics | 9 | `phys.em.rc-circuits` | RC Circuits: Charging and Discharging |
| 425 | physics | 9 | `phys.mod.photoelectric-effect` | Photoelectric Effect |
| 426 | physics | 9 | `phys.rel.postulates` | Postulates of Special Relativity |
| 427 | english | 9 | `eng.phonetics.rhythm-and-timing` | Rhythm and Timing |
| 428 | english | 9 | `eng.vocab.word-recognition` | Word Recognition |
| 429 | english | 9 | `eng.listening.active-listening` | Active Listening |
| 430 | english | 9 | `eng.speaking.oral-fluency` | Oral Fluency |
| 431 | chemistry | 9 | `chem.period.atomic-radius` | Atomic and Ionic Radius |
| 432 | chemistry | 9 | `chem.period.ionization-energy` | Ionization Energy |
| 433 | chemistry | 9 | `chem.period.electron-affinity` | Electron Affinity and Electronegativity |
| 434 | chemistry | 9 | `chem.period.valency` | Valency and Oxidation State |
| 435 | chemistry | 9 | `chem.bond.metallic-bonding` | Metallic Bonding |
| 436 | chemistry | 9 | `chem.equil.weak-acid` | Weak Acid and Base Equilibria |
| 437 | chemistry | 9 | `chem.surface.heterogeneous-cat` | Mechanism of Heterogeneous Catalysis |
| 438 | chemistry | 9 | `chem.sblock.hydrogen` | Hydrogen |
| 439 | chemistry | 9 | `chem.anal.gravimetric` | Gravimetric Analysis |
| 440 | chemistry | 9 | `chem.anal.chromatography` | Chromatography |
| 441 | biology | 9 | `bio.mol.transcription` | Transcription |
| 442 | biology | 9 | `bio.gen.mendelian-genetics` | Mendelian Genetics |
| 443 | biology | 9 | `bio.plant.plant-respiration` | Respiration in Plants |
| 444 | biology | 9 | `bio.repro.sexual-reproduction-plants` | Sexual Reproduction in Flowering Plants |
| 445 | biology | 9 | `bio.repro.human-reproductive-system` | Human Reproductive System |
| 446 | biology | 9 | `bio.immuno.innate-adaptive-immunity` | Innate and Adaptive Immunity |
| 447 | computer_science | 9 | `cs.prog.input-output` | Input, Output and Formatting |
| 448 | computer_science | 9 | `cs.control.loops` | Iteration — while and for Loops |
| 449 | computer_science | 9 | `cs.web.rest-apis` | REST APIs |
| 450 | computer_science | 9 | `cs.theory.complexity-classes` | Computational Complexity Classes |
| 451 | mathematics | 10 | `math.found.uniqueness-proof` | Uniqueness Proof |
| 452 | mathematics | 10 | `math.found.lemma` | Lemma |
| 453 | mathematics | 10 | `math.found.corollary` | Corollary |
| 454 | mathematics | 10 | `math.found.natural-numbers` | Natural Numbers |
| 455 | mathematics | 10 | `math.func.bijection` | Bijective Function |
| 456 | mathematics | 10 | `math.func.step-function` | Step Function |
| 457 | mathematics | 10 | `math.prob.bayes-theorem` | Bayes' Theorem |
| 458 | mathematics | 10 | `math.prob.discrete-rv` | Discrete Random Variable |
| 459 | mathematics | 10 | `math.prob.cdf` | Cumulative Distribution Function |
| 460 | mathematics | 10 | `math.abst.group-operation` | Group Operation Examples |
| 461 | mathematics | 10 | `math.abst.subgroup` | Subgroup |
| 462 | mathematics | 10 | `math.abst.cyclic-group` | Cyclic Group |
| 463 | mathematics | 10 | `math.abst.group-order` | Order of Group and Elements |
| 464 | mathematics | 10 | `math.abst.group-homomorphism` | Group Homomorphism |
| 465 | mathematics | 10 | `math.abst.group-action` | Group Action |
| 466 | mathematics | 10 | `math.abst.symmetric-group` | Symmetric Group |
| 467 | mathematics | 10 | `math.abst.ring-theory` | Ring |
| 468 | mathematics | 10 | `math.abst.group-inverse` | Group Inverse |
| 469 | mathematics | 10 | `math.top.fundamental-group` | Fundamental Group |
| 470 | mathematics | 10 | `math.top.homology` | Homology |
| 471 | mathematics | 10 | `math.cat.natural-transformation` | Natural Transformation |
| 472 | physics | 10 | `phys.mech.rotational-dynamics` | Rotational Dynamics |
| 473 | physics | 10 | `phys.mech.keplers-laws` | Kepler's Laws of Planetary Motion |
| 474 | physics | 10 | `phys.mech.satellites` | Artificial Satellites and Geostationary Orbits |
| 475 | physics | 10 | `phys.mech.viscosity` | Viscosity and Stokes' Law |
| 476 | physics | 10 | `phys.mech.generalized-coordinates` | Generalized Coordinates and Configuration Space |
| 477 | physics | 10 | `phys.therm.entropy` | Entropy and Disorder |
| 478 | physics | 10 | `phys.wave.forced-oscillations` | Forced Oscillations and Resonance |
| 479 | physics | 10 | `phys.mod.photons` | Photons and Quantization of Light |
| 480 | physics | 10 | `phys.rel.simultaneity` | Relativity of Simultaneity |
| 481 | english | 10 | `eng.phonetics.accents-and-dialects` | Accents and Dialects |
| 482 | english | 10 | `eng.vocab.context-clues` | Context Clues |
| 483 | english | 10 | `eng.vocab.synonyms-antonyms` | Synonyms and Antonyms |
| 484 | english | 10 | `eng.vocab.word-families` | Word Families |
| 485 | english | 10 | `eng.grammar.word-classes-overview` | Overview of Word Classes |
| 486 | english | 10 | `eng.listening.listening-for-gist` | Listening for Gist |
| 487 | english | 10 | `eng.listening.distinguishing-sounds-in-speech` | Distinguishing Sounds in Speech |
| 488 | english | 10 | `eng.speaking.pronunciation-in-conversation` | Pronunciation in Conversation |
| 489 | chemistry | 10 | `chem.period.periodic-properties` | Periodic Trends Overview |
| 490 | chemistry | 10 | `chem.bond.ionic-bonding` | Ionic Bonding |
| 491 | chemistry | 10 | `chem.bond.covalent-bonding` | Covalent Bonding |
| 492 | chemistry | 10 | `chem.equil.buffer` | Buffer Solutions |
| 493 | chemistry | 10 | `chem.equil.hydrolysis` | Salt Hydrolysis |
| 494 | chemistry | 10 | `chem.equil.titration` | Acid–Base Titrations |
| 495 | chemistry | 10 | `chem.redox.oxidation-state` | Oxidation State |
| 496 | biology | 10 | `bio.mol.translation-genetic-code` | Translation and the Genetic Code |
| 497 | biology | 10 | `bio.gen.gene-interactions` | Gene Interactions and Extensions of Mendelism |
| 498 | biology | 10 | `bio.repro.fertilisation-development` | Fertilisation and Embryonic Development |
| 499 | biology | 10 | `bio.immuno.antibody-structure-function` | Antibody Structure and Function |
| 500 | computer_science | 10 | `cs.prog.exception-handling` | Exception Handling |
| 501 | computer_science | 10 | `cs.control.nested-control-patterns` | Nested Control Flow Patterns |
| 502 | computer_science | 10 | `cs.data.strings` | Strings |
| 503 | mathematics | 11 | `math.found.proof-by-induction` | Mathematical Induction |
| 504 | mathematics | 11 | `math.found.well-ordering-principle` | Well-Ordering Principle |
| 505 | mathematics | 11 | `math.found.countable-set` | Countable Set |
| 506 | mathematics | 11 | `math.found.integers` | Integers |
| 507 | mathematics | 11 | `math.arith.counting` | Counting |
| 508 | mathematics | 11 | `math.func.inverse-functions` | Inverse Functions |
| 509 | mathematics | 11 | `math.seq.sequence` | Sequence |
| 510 | mathematics | 11 | `math.prob.bayesian-inference` | Bayesian Inference |
| 511 | mathematics | 11 | `math.prob.pmf` | Probability Mass Function |
| 512 | mathematics | 11 | `math.prob.quantile` | Quantile |
| 513 | mathematics | 11 | `math.prob.distribution` | Probability Distribution |
| 514 | mathematics | 11 | `math.abst.coset` | Coset |
| 515 | mathematics | 11 | `math.abst.group-isomorphism` | Group Isomorphism |
| 516 | mathematics | 11 | `math.abst.burnside-lemma` | Burnside's Lemma |
| 517 | mathematics | 11 | `math.abst.ideal` | Ideal |
| 518 | mathematics | 11 | `math.abst.ring-homomorphism` | Ring Homomorphism |
| 519 | mathematics | 11 | `math.abst.polynomial-ring` | Polynomial Ring |
| 520 | mathematics | 11 | `math.top.van-kampen` | Seifert-van Kampen Theorem |
| 521 | mathematics | 11 | `math.top.covering-space` | Covering Space |
| 522 | mathematics | 11 | `math.top.euler-characteristic` | Euler Characteristic |
| 523 | mathematics | 11 | `math.top.cohomology` | Cohomology |
| 524 | mathematics | 11 | `math.cat.functor-category` | Functor Category |
| 525 | mathematics | 11 | `math.cat.limits` | Limits and Colimits |
| 526 | mathematics | 11 | `math.cat.adjunction` | Adjunction |
| 527 | physics | 11 | `phys.mech.angular-momentum` | Angular Momentum |
| 528 | physics | 11 | `phys.mech.rolling-motion` | Rolling Without Slipping |
| 529 | physics | 11 | `phys.mech.euler-lagrange-equation` | The Euler-Lagrange Equation and Hamilton's Principle |
| 530 | physics | 11 | `phys.therm.carnot-cycle` | Carnot Cycle |
| 531 | physics | 11 | `phys.therm.third-law` | Third Law of Thermodynamics |
| 532 | physics | 11 | `phys.mod.compton-effect` | Compton Scattering |
| 533 | physics | 11 | `phys.mod.de-broglie` | de Broglie Hypothesis — Matter Waves |
| 534 | physics | 11 | `phys.mod.bohr-model` | Bohr Model of the Hydrogen Atom |
| 535 | physics | 11 | `phys.mod.x-rays` | X-Rays and Their Properties |
| 536 | physics | 11 | `phys.rel.time-dilation` | Time Dilation |
| 537 | physics | 11 | `phys.stat.probability-basics` | Probability Distributions in Physics |
| 538 | english | 11 | `eng.vocab.compound-words` | Compound Words |
| 539 | english | 11 | `eng.vocab.prefixes` | Prefixes |
| 540 | english | 11 | `eng.vocab.suffixes` | Suffixes |
| 541 | english | 11 | `eng.vocab.homonyms-homophones` | Homonyms and Homophones |
| 542 | english | 11 | `eng.vocab.connotation-denotation` | Connotation and Denotation |
| 543 | english | 11 | `eng.grammar.nouns` | Nouns |
| 544 | english | 11 | `eng.grammar.verbs` | Verbs |
| 545 | english | 11 | `eng.grammar.prepositions` | Prepositions |
| 546 | english | 11 | `eng.grammar.conjunctions` | Conjunctions |
| 547 | english | 11 | `eng.grammar.interjections` | Interjections |
| 548 | english | 11 | `eng.reading.print-to-meaning` | From Print to Meaning |
| 549 | english | 11 | `eng.listening.listening-for-detail` | Listening for Detail |
| 550 | english | 11 | `eng.speaking.conversation-skills` | Conversation Skills |
| 551 | chemistry | 11 | `chem.bond.vsepr` | VSEPR Theory |
| 552 | chemistry | 11 | `chem.bond.hybridization` | Hybridization |
| 553 | chemistry | 11 | `chem.bond.resonance` | Resonance Structures |
| 554 | chemistry | 11 | `chem.bond.bond-parameters` | Bond Parameters |
| 555 | chemistry | 11 | `chem.bond.coordinate-bond` | Coordinate and Dative Bonding |
| 556 | chemistry | 11 | `chem.redox.balancing` | Balancing Redox Equations |
| 557 | chemistry | 11 | `chem.solid.crystal-systems` | Crystal Systems |
| 558 | chemistry | 11 | `chem.sblock.alkali` | Alkali Metals |
| 559 | chemistry | 11 | `chem.pblock.group13` | Group 13 — Boron Family |
| 560 | chemistry | 11 | `chem.pblock.group14` | Group 14 — Carbon Family |
| 561 | chemistry | 11 | `chem.pblock.group15` | Group 15 — Nitrogen Family |
| 562 | chemistry | 11 | `chem.pblock.group16` | Group 16 — Oxygen Family |
| 563 | chemistry | 11 | `chem.pblock.group17` | Group 17 — Halogens |
| 564 | chemistry | 11 | `chem.pblock.group18` | Group 18 — Noble Gases |
| 565 | chemistry | 11 | `chem.dblock.general` | Transition Metals — General Properties |
| 566 | chemistry | 11 | `chem.org.iupac` | IUPAC Nomenclature |
| 567 | biology | 11 | `bio.mol.gene-regulation` | Regulation of Gene Expression |
| 568 | biology | 11 | `bio.gen.chromosomal-theory-linkage` | Chromosomal Theory and Linkage |
| 569 | biology | 11 | `bio.repro.reproductive-health` | Reproductive Health and Contraception |
| 570 | biology | 11 | `bio.dev.gametogenesis-fertilisation-dev` | Fundamentals of Animal Development |
| 571 | biology | 11 | `bio.immuno.vaccination-immunisation` | Vaccination and Immunisation |
| 572 | computer_science | 11 | `cs.data.lists` | Lists |
| 573 | computer_science | 11 | `cs.func.functions` | Functions |
| 574 | mathematics | 12 | `math.found.strong-induction` | Strong Induction |
| 575 | mathematics | 12 | `math.found.uncountable-set` | Uncountable Set |
| 576 | mathematics | 12 | `math.found.rational-numbers` | Rational Numbers |
| 577 | mathematics | 12 | `math.arith.counting-sequence` | Counting Sequence |
| 578 | mathematics | 12 | `math.arith.subitizing` | Subitizing |
| 579 | mathematics | 12 | `math.arith.place-value` | Place Value |
| 580 | mathematics | 12 | `math.arith.number-line` | Number Line |
| 581 | mathematics | 12 | `math.seq.arithmetic-sequence` | Arithmetic Sequence |
| 582 | mathematics | 12 | `math.seq.geometric-sequence` | Geometric Sequence |
| 583 | mathematics | 12 | `math.seq.recursive-sequences` | Recursive Sequences |
| 584 | mathematics | 12 | `math.seq.series` | Series |
| 585 | mathematics | 12 | `math.prob.discrete-distributions` | Discrete Distributions |
| 586 | mathematics | 12 | `math.prob.joint-distribution` | Joint Distribution |
| 587 | mathematics | 12 | `math.abst.lagrange-theorem` | Lagrange's Theorem |
| 588 | mathematics | 12 | `math.abst.normal-subgroup` | Normal Subgroup |
| 589 | mathematics | 12 | `math.abst.quotient-ring` | Quotient Ring |
| 590 | mathematics | 12 | `math.abst.prime-ideal` | Prime and Maximal Ideals |
| 591 | mathematics | 12 | `math.abst.euclidean-domain` | Euclidean Domain |
| 592 | mathematics | 12 | `math.cat.yoneda-lemma` | Yoneda Lemma |
| 593 | mathematics | 12 | `math.cat.equalizer` | Equalizer and Coequalizer |
| 594 | mathematics | 12 | `math.cat.pullback` | Pullback and Pushout |
| 595 | mathematics | 12 | `math.cat.monad` | Monad |
| 596 | mathematics | 12 | `math.cat.tensor-product` | Tensor Product (Categorical) |
| 597 | mathematics | 12 | `math.cat.topos` | Topos |
| 598 | physics | 12 | `phys.mech.conservation-of-angular-momentum` | Conservation of Angular Momentum |
| 599 | physics | 12 | `phys.mech.cyclic-coordinates-conservation-laws` | Cyclic Coordinates and Noether's Theorem |
| 600 | physics | 12 | `phys.mech.hamiltonian` | The Hamiltonian and Legendre Transform |
| 601 | physics | 12 | `phys.therm.refrigerators` | Refrigerators and Heat Pumps |
| 602 | physics | 12 | `phys.mod.wave-particle-duality` | Wave-Particle Duality |
| 603 | physics | 12 | `phys.mod.atomic-spectra` | Atomic Spectra and Energy Levels |
| 604 | physics | 12 | `phys.rel.length-contraction` | Length Contraction |
| 605 | physics | 12 | `phys.stat.boltzmann-factor` | Boltzmann Factor and Statistical Weight |
| 606 | english | 12 | `eng.vocab.roots-and-origins` | Greek and Latin Roots |
| 607 | english | 12 | `eng.vocab.multiple-meaning-words` | Multiple-Meaning Words |
| 608 | english | 12 | `eng.vocab.collocations` | Collocations |
| 609 | english | 12 | `eng.vocab.register-and-formality` | Register and Formality |
| 610 | english | 12 | `eng.grammar.pronouns` | Pronouns |
| 611 | english | 12 | `eng.grammar.adjectives` | Adjectives |
| 612 | english | 12 | `eng.grammar.articles-and-determiners` | Articles and Determiners |
| 613 | english | 12 | `eng.grammar.subject-and-predicate` | Subject and Predicate |
| 614 | english | 12 | `eng.grammar.present-tenses` | Present Tenses |
| 615 | english | 12 | `eng.reading.reading-fluency` | Reading Fluency |
| 616 | english | 12 | `eng.listening.following-instructions` | Following Spoken Instructions |
| 617 | english | 12 | `eng.listening.note-taking-while-listening` | Note-Taking While Listening |
| 618 | english | 12 | `eng.speaking.asking-and-answering-questions` | Asking and Answering Questions |
| 619 | english | 12 | `eng.speaking.storytelling-orally` | Oral Storytelling |
| 620 | english | 12 | `eng.speaking.non-verbal-communication` | Non-Verbal Communication |
| 621 | chemistry | 12 | `chem.bond.mo-theory` | Molecular Orbital Theory |
| 622 | chemistry | 12 | `chem.bond.polar-molecules` | Polarity and Dipole Moment |
| 623 | chemistry | 12 | `chem.thermo.bond-enthalpy` | Bond Enthalpy |
| 624 | chemistry | 12 | `chem.redox.disproportionation` | Disproportionation |
| 625 | chemistry | 12 | `chem.redox.activity-series` | Electrochemical Activity Series |
| 626 | chemistry | 12 | `chem.redox.titrations` | Redox Titrations |
| 627 | chemistry | 12 | `chem.solid.packing` | Close Packing and Efficiency |
| 628 | chemistry | 12 | `chem.solid.defects` | Crystal Defects |
| 629 | chemistry | 12 | `chem.solid.amorphous` | Amorphous Solids |
| 630 | chemistry | 12 | `chem.coord.werner` | Werner's Theory |
| 631 | chemistry | 12 | `chem.sblock.alkaline-earth` | Alkaline Earth Metals |
| 632 | chemistry | 12 | `chem.pblock.trends` | Trends Across p-Block |
| 633 | chemistry | 12 | `chem.dblock.first-row` | First-Row Transition Metals |
| 634 | chemistry | 12 | `chem.dblock.lanthanides` | Lanthanides and Actinides |
| 635 | chemistry | 12 | `chem.org.hybridization` | Carbon Hybridization |
| 636 | chemistry | 12 | `chem.org.purification` | Purification Techniques |
| 637 | chemistry | 12 | `chem.org.spectroscopy` | Introduction to Spectroscopy |
| 638 | biology | 12 | `bio.gen.pedigree-human-genetics` | Pedigree Analysis and Human Genetic Disorders |
| 639 | biology | 12 | `bio.gen.mutations` | Mutations |
| 640 | biology | 12 | `bio.dev.morphogenesis-differentiation` | Morphogenesis and Cell Differentiation |
| 641 | biology | 12 | `bio.immuno.immune-disorders` | Immune Disorders |
| 642 | computer_science | 12 | `cs.data.tuples` | Tuples |
| 643 | computer_science | 12 | `cs.data.dictionaries` | Dictionaries |
| 644 | computer_science | 12 | `cs.func.scope-namespaces` | Scope and Namespaces |
| 645 | computer_science | 12 | `cs.file.text-files` | Text File Handling |
| 646 | computer_science | 12 | `cs.struct.linear-search` | Linear Search |
| 647 | computer_science | 12 | `cs.oop.oop-concepts` | Object-Oriented Programming Concepts |
| 648 | mathematics | 13 | `math.found.irrational-numbers` | Irrational Numbers |
| 649 | mathematics | 13 | `math.arith.ones-tens-hundreds` | Ones, Tens, Hundreds |
| 650 | mathematics | 13 | `math.arith.expanded-form` | Expanded Form |
| 651 | mathematics | 13 | `math.arith.number-base` | Number Base |
| 652 | mathematics | 13 | `math.arith.addition` | Addition |
| 653 | mathematics | 13 | `math.arith.ordering` | Ordering Numbers |
| 654 | mathematics | 13 | `math.seq.partial-sums` | Partial Sums |
| 655 | mathematics | 13 | `math.seq.arithmetic-series` | Arithmetic Series |
| 656 | mathematics | 13 | `math.seq.geometric-series` | Geometric Series |
| 657 | mathematics | 13 | `math.prob.marginal-distribution` | Marginal Distribution |
| 658 | mathematics | 13 | `math.prob.conditional-distribution` | Conditional Distribution |
| 659 | mathematics | 13 | `math.abst.quotient-group` | Quotient Group |
| 660 | mathematics | 13 | `math.abst.alternating-group` | Alternating Group |
| 661 | mathematics | 13 | `math.abst.pid` | Principal Ideal Domain |
| 662 | mathematics | 13 | `math.abst.field` | Field |
| 663 | mathematics | 13 | `math.cat.representable-functor` | Representable Functor |
| 664 | mathematics | 13 | `math.cat.higher-category` | Higher Category Theory |
| 665 | physics | 13 | `phys.mech.hamiltons-equations` | Hamilton's Equations of Motion |
| 666 | physics | 13 | `phys.mod.radioactivity` | Radioactivity: Alpha, Beta, Gamma Decay |
| 667 | physics | 13 | `phys.qm.wave-function` | Wave Function and Probability Interpretation |
| 668 | physics | 13 | `phys.rel.lorentz-transform` | Lorentz Transformations |
| 669 | physics | 13 | `phys.stat.partition-function` | Partition Function |
| 670 | physics | 13 | `phys.stat.maxwell-boltzmann` | Maxwell-Boltzmann Speed Distribution |
| 671 | english | 13 | `eng.vocab.word-formation-processes` | Word Formation Processes |
| 672 | english | 13 | `eng.vocab.idioms` | Idioms |
| 673 | english | 13 | `eng.vocab.phrasal-verbs` | Phrasal Verbs |
| 674 | english | 13 | `eng.vocab.etymology` | Etymology |
| 675 | english | 13 | `eng.vocab.thesaurus-and-dictionary-skills` | Thesaurus and Dictionary Skills |
| 676 | english | 13 | `eng.grammar.adverbs` | Adverbs |
| 677 | english | 13 | `eng.grammar.word-order` | Basic Word Order |
| 678 | english | 13 | `eng.grammar.past-tenses` | Past Tenses |
| 679 | english | 13 | `eng.grammar.future-tenses` | Future Tenses |
| 680 | english | 13 | `eng.grammar.modals` | Modal Verbs |
| 681 | english | 13 | `eng.grammar.gerunds-and-infinitives` | Gerunds and Infinitives |
| 682 | english | 13 | `eng.grammar.subject-verb-agreement` | Subject-Verb Agreement |
| 683 | english | 13 | `eng.reading.literal-comprehension` | Literal Comprehension |
| 684 | english | 13 | `eng.reading.skimming-and-scanning` | Skimming and Scanning |
| 685 | english | 13 | `eng.listening.listening-comprehension-strategies` | Listening Comprehension Strategies |
| 686 | english | 13 | `eng.speaking.discussion-skills` | Discussion Skills |
| 687 | english | 13 | `eng.communication.digital-communication` | Digital Communication |
| 688 | chemistry | 13 | `chem.bond.intermolecular` | Intermolecular Forces |
| 689 | chemistry | 13 | `chem.elect.galvanic-cell` | Galvanic Cell |
| 690 | chemistry | 13 | `chem.solid.ionic-solids` | Ionic Crystal Structures |
| 691 | chemistry | 13 | `chem.solid.properties` | Electrical and Magnetic Properties |
| 692 | chemistry | 13 | `chem.coord.nomenclature` | Nomenclature of Complexes |
| 693 | chemistry | 13 | `chem.coord.cft` | Crystal Field Theory |
| 694 | chemistry | 13 | `chem.coord.stability` | Stability Constants |
| 695 | chemistry | 13 | `chem.dblock.oxo-species` | Oxides and Oxyanions of Transition Metals |
| 696 | chemistry | 13 | `chem.org.isomerism` | Structural and Stereoisomerism |
| 697 | chemistry | 13 | `chem.org.electronic-effects` | Inductive and Mesomeric Effects |
| 698 | chemistry | 13 | `chem.org.qualitative-analysis` | Qualitative Organic Analysis |
| 699 | chemistry | 13 | `chem.org.aromaticity` | Aromaticity |
| 700 | chemistry | 13 | `chem.hyd.alkanes` | Alkanes |
| 701 | chemistry | 13 | `chem.anal.volumetric` | Volumetric Analysis |
| 702 | chemistry | 13 | `chem.anal.spectroscopy` | Spectroscopic Methods |
| 703 | biology | 13 | `bio.gen.population-genetics` | Population Genetics |
| 704 | biology | 13 | `bio.gen.genetic-engineering` | Genetic Engineering and Recombinant DNA |
| 705 | biology | 13 | `bio.dev.stem-cells-regeneration` | Stem Cells and Regeneration |
| 706 | computer_science | 13 | `cs.data.sets` | Sets |
| 707 | computer_science | 13 | `cs.func.recursion` | Recursion |
| 708 | computer_science | 13 | `cs.file.csv-files` | CSV File Handling |
| 709 | computer_science | 13 | `cs.file.binary-serialisation` | Binary Files and Serialisation |
| 710 | computer_science | 13 | `cs.struct.hashing-hash-tables` | Hashing and Hash Tables |
| 711 | computer_science | 13 | `cs.struct.binary-search` | Binary Search |
| 712 | computer_science | 13 | `cs.oop.classes-objects-python` | Classes and Objects in Python |
| 713 | computer_science | 13 | `cs.db.database-concepts` | Database Concepts |
| 714 | computer_science | 13 | `cs.se.sdlc` | Software Development Life Cycle |
| 715 | mathematics | 14 | `math.found.real-numbers` | Real Numbers |
| 716 | mathematics | 14 | `math.arith.carrying` | Carrying (Regrouping) |
| 717 | mathematics | 14 | `math.arith.mental-addition` | Mental Addition |
| 718 | mathematics | 14 | `math.arith.subtraction` | Subtraction |
| 719 | mathematics | 14 | `math.arith.multiplication` | Multiplication |
| 720 | mathematics | 14 | `math.seq.infinite-geometric-series` | Infinite Geometric Series |
| 721 | mathematics | 14 | `math.seq.telescoping-series` | Telescoping Series |
| 722 | mathematics | 14 | `math.prob.conditional-expectation` | Conditional Expectation |
| 723 | mathematics | 14 | `math.abst.first-isomorphism-theorem` | First Isomorphism Theorem |
| 724 | mathematics | 14 | `math.abst.ufd` | Unique Factorization Domain |
| 725 | mathematics | 14 | `math.abst.field-extension` | Field Extension |
| 726 | physics | 14 | `phys.mech.poisson-brackets` | Poisson Brackets and Phase Space Dynamics |
| 727 | physics | 14 | `phys.mod.radioactive-decay` | Radioactive Decay Law and Half-Life |
| 728 | physics | 14 | `phys.qm.schrodinger-equation` | Time-Dependent Schrödinger Equation |
| 729 | physics | 14 | `phys.qm.uncertainty-principle` | Heisenberg's Uncertainty Principle |
| 730 | physics | 14 | `phys.rel.relativistic-momentum` | Relativistic Momentum and Energy |
| 731 | physics | 14 | `phys.stat.bose-einstein` | Bose-Einstein Statistics |
| 732 | physics | 14 | `phys.stat.entropy-statistical` | Statistical Definition of Entropy |
| 733 | physics | 14 | `phys.stat.free-energy` | Helmholtz and Gibbs Free Energy |
| 734 | physics | 14 | `phys.stat.grand-canonical-ensemble` | Grand Canonical Ensemble |
| 735 | physics | 14 | `phys.stat.fluctuations-correlations` | Fluctuations, Response Functions, and Correlations |
| 736 | english | 14 | `eng.vocab.academic-vocabulary` | Academic Vocabulary |
| 737 | english | 14 | `eng.vocab.semantic-fields` | Semantic Fields |
| 738 | english | 14 | `eng.grammar.sentence-types-by-function` | Sentence Types by Function |
| 739 | english | 14 | `eng.grammar.phrases` | Phrases |
| 740 | english | 14 | `eng.grammar.tense-consistency` | Tense Consistency |
| 741 | english | 14 | `eng.grammar.conditionals` | Conditional Sentences |
| 742 | english | 14 | `eng.grammar.participles-and-participial-phrases` | Participles and Participial Phrases |
| 743 | english | 14 | `eng.grammar.pronoun-antecedent-agreement` | Pronoun-Antecedent Agreement |
| 744 | english | 14 | `eng.grammar.comparatives-and-superlatives` | Comparatives and Superlatives |
| 745 | english | 14 | `eng.reading.main-idea-and-details` | Main Idea and Supporting Details |
| 746 | english | 14 | `eng.listening.critical-listening` | Critical Listening |
| 747 | english | 14 | `eng.speaking.public-speaking-basics` | Public Speaking Basics |
| 748 | chemistry | 14 | `chem.state.liquids` | Liquid State Properties |
| 749 | chemistry | 14 | `chem.elect.standard-electrode` | Standard Electrode Potential |
| 750 | chemistry | 14 | `chem.elect.electrolysis` | Electrolysis and Faraday's Laws |
| 751 | chemistry | 14 | `chem.elect.batteries` | Batteries and Fuel Cells |
| 752 | chemistry | 14 | `chem.elect.corrosion` | Corrosion |
| 753 | chemistry | 14 | `chem.coord.isomerism` | Isomerism in Complexes |
| 754 | chemistry | 14 | `chem.coord.bonding` | Bonding in Complexes |
| 755 | chemistry | 14 | `chem.coord.applications` | Applications of Coordination Chemistry |
| 756 | chemistry | 14 | `chem.sblock.water` | Chemistry of Water |
| 757 | chemistry | 14 | `chem.dblock.organometallics` | Organometallic Chemistry |
| 758 | chemistry | 14 | `chem.org.reactive-intermediates` | Reactive Intermediates |
| 759 | chemistry | 14 | `chem.hyd.arenes` | Benzene and Arenes |
| 760 | chemistry | 14 | `chem.hyd.conformations` | Conformational Analysis |
| 761 | chemistry | 14 | `chem.hyd.petroleum` | Petroleum Refining |
| 762 | chemistry | 14 | `chem.hal.introduction` | Haloalkanes and Haloarenes |
| 763 | biology | 14 | `bio.evo.modern-synthesis-speciation` | Modern Synthesis and Speciation |
| 764 | biology | 14 | `bio.biotech.biotech-principles` | Principles of Biotechnology |
| 765 | computer_science | 14 | `cs.data.comprehensions-iterators` | Comprehensions, Iterators and Generators |
| 766 | computer_science | 14 | `cs.func.lambda-functional` | Lambda Expressions and Functional Tools |
| 767 | computer_science | 14 | `cs.struct.stacks` | Stacks |
| 768 | computer_science | 14 | `cs.struct.elementary-sorts` | Elementary Sorting — Bubble, Selection, Insertion |
| 769 | computer_science | 14 | `cs.oop.encapsulation-abstraction` | Encapsulation and Abstraction |
| 770 | computer_science | 14 | `cs.db.er-modeling` | Entity-Relationship Modeling |
| 771 | computer_science | 14 | `cs.se.version-control-git` | Version Control with Git |
| 772 | mathematics | 15 | `math.found.complex-numbers` | Complex Numbers |
| 773 | mathematics | 15 | `math.arith.column-addition` | Column Addition |
| 774 | mathematics | 15 | `math.arith.borrowing` | Borrowing (Regrouping in Subtraction) |
| 775 | mathematics | 15 | `math.arith.negative-numbers` | Negative Numbers |
| 776 | mathematics | 15 | `math.arith.multiplication-table` | Multiplication Table |
| 777 | mathematics | 15 | `math.arith.division` | Division |
| 778 | mathematics | 15 | `math.arith.exponentiation` | Exponentiation |
| 779 | mathematics | 15 | `math.geom.coordinate-plane` | Coordinate Plane |
| 780 | mathematics | 15 | `math.func.real-valued-function` | Real-Valued Function |
| 781 | mathematics | 15 | `math.prob.martingale` | Martingale |
| 782 | mathematics | 15 | `math.disc.counting-principles` | Counting Principles |
| 783 | mathematics | 15 | `math.abst.second-isomorphism-theorem` | Second and Third Isomorphism Theorems |
| 784 | mathematics | 15 | `math.abst.algebraic-extension` | Algebraic Extension |
| 785 | mathematics | 15 | `math.real.completeness` | Completeness of ℝ |
| 786 | mathematics | 15 | `math.real.metric-space` | Metric Space |
| 787 | physics | 15 | `phys.mech.canonical-transformations` | Canonical Transformations and Generating Functions |
| 788 | physics | 15 | `phys.mod.nuclear-reactions` | Nuclear Reactions and Q-Value |
| 789 | physics | 15 | `phys.qm.operators` | Quantum Operators and Observables |
| 790 | physics | 15 | `phys.qm.particle-in-box` | Particle in an Infinite Square Well |
| 791 | physics | 15 | `phys.qm.harmonic-oscillator-qm` | Quantum Harmonic Oscillator |
| 792 | physics | 15 | `phys.qm.quantum-tunneling` | Quantum Tunneling |
| 793 | physics | 15 | `phys.rel.mass-energy` | Mass-Energy Equivalence: E=mc² |
| 794 | physics | 15 | `phys.stat.chemical-potential` | Chemical Potential and Thermodynamic Equilibrium |
| 795 | physics | 15 | `phys.stat.phase-transitions` | Phase Transitions and Landau Mean-Field Theory |
| 796 | english | 15 | `eng.grammar.question-formation` | Question Formation |
| 797 | english | 15 | `eng.grammar.negation` | Negation |
| 798 | english | 15 | `eng.grammar.clauses` | Independent and Dependent Clauses |
| 799 | english | 15 | `eng.grammar.active-and-passive-voice` | Active and Passive Voice |
| 800 | english | 15 | `eng.grammar.direct-and-indirect-speech` | Direct and Indirect Speech |
| 801 | english | 15 | `eng.grammar.capitalization-rules` | Capitalization Rules |
| 802 | english | 15 | `eng.reading.inference-in-reading` | Inference in Reading |
| 803 | english | 15 | `eng.reading.summarizing` | Summarizing |
| 804 | english | 15 | `eng.reading.text-structure` | Text Structure |
| 805 | english | 15 | `eng.speaking.presentation-skills` | Presentation Skills |
| 806 | chemistry | 15 | `chem.state.phase-diagram` | Phase Diagrams |
| 807 | chemistry | 15 | `chem.sol.vapour-pressure` | Vapour Pressure of Solutions |
| 808 | chemistry | 15 | `chem.elect.nernst` | Nernst Equation |
| 809 | chemistry | 15 | `chem.elect.industrial` | Industrial Electrolysis |
| 810 | chemistry | 15 | `chem.surface.surfactants` | Surfactants and Micelles |
| 811 | chemistry | 15 | `chem.org.mechanisms` | Organic Reaction Mechanisms |
| 812 | chemistry | 15 | `chem.hyd.polycyclic` | Polycyclic and Heterocyclic Systems |
| 813 | chemistry | 15 | `chem.hal.sn1` | SN1 Mechanism |
| 814 | chemistry | 15 | `chem.hal.sn2` | SN2 Mechanism |
| 815 | chemistry | 15 | `chem.hal.haloarenes` | Haloarenes |
| 816 | chemistry | 15 | `chem.hal.cfcs` | Polyhalogen Compounds and CFCs |
| 817 | chemistry | 15 | `chem.nitro.nitro-compounds` | Nitro Compounds |
| 818 | biology | 15 | `bio.evo.human-evolution` | Human Evolution |
| 819 | biology | 15 | `bio.biotech.biotech-process-applications` | Biotechnology Process Applications |
| 820 | computer_science | 15 | `cs.func.modules-packages` | Modules and Packages |
| 821 | computer_science | 15 | `cs.struct.queues` | Queues |
| 822 | computer_science | 15 | `cs.struct.efficient-sorts` | Efficient Sorting — Merge Sort and Quick Sort |
| 823 | computer_science | 15 | `cs.oop.inheritance` | Inheritance |
| 824 | computer_science | 15 | `cs.db.relational-model` | The Relational Model |
| 825 | computer_science | 15 | `cs.se.software-testing` | Software Testing Fundamentals |
| 826 | mathematics | 16 | `math.arith.absolute-value` | Absolute Value |
| 827 | mathematics | 16 | `math.arith.integer-arithmetic` | Integer Arithmetic |
| 828 | mathematics | 16 | `math.arith.long-multiplication` | Long Multiplication |
| 829 | mathematics | 16 | `math.arith.mental-multiplication` | Mental Multiplication |
| 830 | mathematics | 16 | `math.arith.remainder` | Remainder |
| 831 | mathematics | 16 | `math.arith.divisor-dividend` | Divisor and Dividend |
| 832 | mathematics | 16 | `math.arith.order-of-operations` | Order of Operations |
| 833 | mathematics | 16 | `math.arith.exponent-rules` | Exponent Rules |
| 834 | mathematics | 16 | `math.arith.square-numbers` | Perfect Squares |
| 835 | mathematics | 16 | `math.arith.cube-numbers` | Perfect Cubes |
| 836 | mathematics | 16 | `math.nt.divisibility` | Divisibility |
| 837 | mathematics | 16 | `math.nt.division-algorithm` | Division Algorithm |
| 838 | mathematics | 16 | `math.geom.circle-equation` | Equation of a Circle |
| 839 | mathematics | 16 | `math.geom.x-y-coordinates` | Cartesian Coordinates |
| 840 | mathematics | 16 | `math.geom.quadrants` | Quadrants |
| 841 | mathematics | 16 | `math.geom.midpoint-formula` | Midpoint Formula |
| 842 | mathematics | 16 | `math.geom.slope` | Slope |
| 843 | mathematics | 16 | `math.geom.transformations` | Geometric Transformations |
| 844 | mathematics | 16 | `math.geom.vectors-2d` | Vectors in 2D |
| 845 | mathematics | 16 | `math.func.graph-of-function` | Graph of a Function |
| 846 | mathematics | 16 | `math.calc.limits` | Limit of a Function |
| 847 | mathematics | 16 | `math.calc.parametric-curves` | Parametric Equations and Curves |
| 848 | mathematics | 16 | `math.prob.classical-probability` | Classical Probability |
| 849 | mathematics | 16 | `math.disc.permutations` | Permutations |
| 850 | mathematics | 16 | `math.disc.pigeonhole` | Pigeonhole Principle |
| 851 | mathematics | 16 | `math.abst.galois-theory` | Galois Theory |
| 852 | mathematics | 16 | `math.real.sup-inf` | Supremum and Infimum |
| 853 | mathematics | 16 | `math.real.archimedean` | Archimedean Property |
| 854 | mathematics | 16 | `math.real.convergence-sequences` | Convergence of Sequences |
| 855 | mathematics | 16 | `math.real.open-sets` | Open and Closed Sets |
| 856 | physics | 16 | `phys.mech.hamilton-jacobi-equation` | Hamilton-Jacobi Equation and Action-Angle Variables |
| 857 | physics | 16 | `phys.mod.binding-energy` | Nuclear Binding Energy and Mass Defect |
| 858 | physics | 16 | `phys.qm.hydrogen-atom-qm` | Quantum Treatment of Hydrogen Atom |
| 859 | physics | 16 | `phys.qm.spin` | Electron Spin and the Stern-Gerlach Experiment |
| 860 | physics | 16 | `phys.rel.spacetime` | Spacetime Interval and Four-Vectors |
| 861 | physics | 16 | `phys.stat.ising-model` | Ising Model |
| 862 | physics | 16 | `phys.particle.four-forces` | Four Fundamental Forces |
| 863 | english | 16 | `eng.grammar.simple-sentences` | Simple Sentences |
| 864 | english | 16 | `eng.grammar.end-punctuation` | End Punctuation |
| 865 | english | 16 | `eng.reading.predicting-and-confirming` | Predicting and Confirming |
| 866 | english | 16 | `eng.reading.genre-recognition` | Genre Recognition |
| 867 | english | 16 | `eng.reading.authors-purpose-and-tone` | Author's Purpose and Tone |
| 868 | english | 16 | `eng.reading.compare-and-contrast-texts` | Comparing and Contrasting Texts |
| 869 | english | 16 | `eng.speaking.debate-skills` | Debate Skills |
| 870 | chemistry | 16 | `chem.sol.colligative` | Colligative Properties |
| 871 | chemistry | 16 | `chem.sol.activity` | Activity and Non-ideal Solutions |
| 872 | chemistry | 16 | `chem.elect.concentration-cell` | Concentration Cells |
| 873 | chemistry | 16 | `chem.org.arrow-pushing` | Electron Flow and Arrow Notation |
| 874 | chemistry | 16 | `chem.org.pericyclic` | Pericyclic Reactions |
| 875 | chemistry | 16 | `chem.hyd.alkenes` | Alkenes |
| 876 | chemistry | 16 | `chem.hal.elimination` | Elimination Reactions |
| 877 | chemistry | 16 | `chem.hal.grignard` | Grignard and Organolithium Reagents |
| 878 | chemistry | 16 | `chem.alc.alcohols` | Alcohols |
| 879 | biology | 16 | `bio.biotech.genomics-proteomics` | Genomics and Proteomics |
| 880 | computer_science | 16 | `cs.func.decorators` | Decorators |
| 881 | computer_science | 16 | `cs.struct.deques-priority-queues` | Deques and Priority Queues |
| 882 | computer_science | 16 | `cs.struct.linked-lists` | Singly Linked Lists |
| 883 | computer_science | 16 | `cs.oop.polymorphism-overloading` | Polymorphism and Operator Overloading |
| 884 | computer_science | 16 | `cs.db.normalisation` | Normalisation |
| 885 | computer_science | 16 | `cs.db.sql-ddl-dml` | SQL — DDL and DML Basics |
| 886 | computer_science | 16 | `cs.ds.numpy-arrays` | NumPy for Numerical Computing |
| 887 | mathematics | 17 | `math.arith.long-division` | Long Division |
| 888 | mathematics | 17 | `math.arith.fraction-equivalence` | Equivalent Fractions |
| 889 | mathematics | 17 | `math.arith.fraction-multiplication` | Multiplication and Division of Fractions |
| 890 | mathematics | 17 | `math.arith.fraction-reciprocal` | Reciprocal |
| 891 | mathematics | 17 | `math.arith.mixed-numbers` | Mixed Numbers |
| 892 | mathematics | 17 | `math.arith.improper-fractions` | Improper Fractions |
| 893 | mathematics | 17 | `math.arith.decimals` | Decimals |
| 894 | mathematics | 17 | `math.arith.ratios` | Ratio |
| 895 | mathematics | 17 | `math.arith.square-roots` | Square Roots |
| 896 | mathematics | 17 | `math.arith.mental-arithmetic` | Mental Arithmetic |
| 897 | mathematics | 17 | `math.nt.divisibility-rules` | Divisibility Rules |
| 898 | mathematics | 17 | `math.nt.prime-number` | Prime Number |
| 899 | mathematics | 17 | `math.nt.modular-arithmetic` | Modular Arithmetic |
| 900 | mathematics | 17 | `math.nt.induction-applications` | Induction in Number Theory |
| 901 | mathematics | 17 | `math.alg.expression` | Algebraic Expression |
| 902 | mathematics | 17 | `math.geom.pythagorean-theorem` | Pythagorean Theorem |
| 903 | mathematics | 17 | `math.geom.line-equation` | Equations of Lines |
| 904 | mathematics | 17 | `math.geom.translation` | Translation |
| 905 | mathematics | 17 | `math.geom.reflection` | Reflection |
| 906 | mathematics | 17 | `math.geom.vectors-3d` | Vectors in 3D |
| 907 | mathematics | 17 | `math.func.zero-of-function` | Zero of a Function |
| 908 | mathematics | 17 | `math.func.even-odd-functions` | Even and Odd Functions |
| 909 | mathematics | 17 | `math.func.transformations-functions` | Transformations of Functions |
| 910 | mathematics | 17 | `math.func.linear-function` | Linear Function |
| 911 | mathematics | 17 | `math.seq.convergent` | Convergent Sequence |
| 912 | mathematics | 17 | `math.calc.limit-laws` | Limit Laws |
| 913 | mathematics | 17 | `math.calc.one-sided-limits` | One-Sided Limits |
| 914 | mathematics | 17 | `math.calc.limits-at-infinity` | Limits at Infinity |
| 915 | mathematics | 17 | `math.calc.continuity` | Continuity |
| 916 | mathematics | 17 | `math.calc.derivative-intro` | Slope of Tangent and Rate of Change |
| 917 | mathematics | 17 | `math.calc.riemann-sums` | Riemann Sums |
| 918 | mathematics | 17 | `math.calc.sequence-limits` | Limits of Sequences (Calculus) |
| 919 | mathematics | 17 | `math.linalg.vector` | Vector |
| 920 | mathematics | 17 | `math.prob.convergence-types` | Modes of Convergence |
| 921 | mathematics | 17 | `math.stats.population-sample` | Population and Sample |
| 922 | mathematics | 17 | `math.disc.combinations` | Combinations |
| 923 | mathematics | 17 | `math.disc.asymptotic-notation` | Asymptotic Notation |
| 924 | mathematics | 17 | `math.abst.galois-group` | Galois Group |
| 925 | mathematics | 17 | `math.real.cauchy-sequence` | Cauchy Sequence |
| 926 | mathematics | 17 | `math.real.series-rigorous` | Series (Rigorous) |
| 927 | mathematics | 17 | `math.real.compactness` | Compactness |
| 928 | mathematics | 17 | `math.real.connectedness` | Connectedness |
| 929 | mathematics | 17 | `math.real.pointwise-convergence` | Pointwise Convergence |
| 930 | mathematics | 17 | `math.graph.ramsey-theory` | Ramsey Theory |
| 931 | physics | 17 | `phys.mod.nuclear-fission` | Nuclear Fission and Chain Reactions |
| 932 | physics | 17 | `phys.mod.nuclear-fusion` | Nuclear Fusion and Stellar Energy |
| 933 | physics | 17 | `phys.mod.nuclear-models` | Nuclear Models: Shell Model |
| 934 | physics | 17 | `phys.qm.pauli-exclusion` | Pauli Exclusion Principle |
| 935 | physics | 17 | `phys.qm.perturbation-theory` | Time-Independent Perturbation Theory |
| 936 | physics | 17 | `phys.qm.selection-rules` | Selection Rules and Transition Probabilities |
| 937 | physics | 17 | `phys.qm.angular-momentum-addition` | Addition of Angular Momenta and Clebsch-Gordan Coefficients |
| 938 | physics | 17 | `phys.qm.density-matrix` | Density Matrix and Mixed Quantum States |
| 939 | physics | 17 | `phys.stat.phase-transitions-critical-phenomena` | Critical Phenomena, Scaling Laws, and Universality |
| 940 | physics | 17 | `phys.stat.monte-carlo-basics` | Monte Carlo Methods in Statistical Physics |
| 941 | physics | 17 | `phys.particle.particle-classification` | Particle Classification: Hadrons and Leptons |
| 942 | physics | 17 | `phys.particle.gauge-bosons` | Gauge Bosons and Force Carriers |
| 943 | english | 17 | `eng.grammar.compound-sentences` | Compound Sentences |
| 944 | english | 17 | `eng.grammar.comma-usage` | Comma Usage |
| 945 | english | 17 | `eng.grammar.sentence-fragments` | Sentence Fragments |
| 946 | english | 17 | `eng.reading.close-reading` | Close Reading |
| 947 | english | 17 | `eng.writing.sentence-writing` | Sentence Writing |
| 948 | chemistry | 17 | `chem.sol.osmosis` | Osmosis and Osmotic Pressure |
| 949 | chemistry | 17 | `chem.hyd.alkynes` | Alkynes |
| 950 | chemistry | 17 | `chem.alc.phenols` | Phenols |
| 951 | chemistry | 17 | `chem.alc.ethers` | Ethers |
| 952 | chemistry | 17 | `chem.alc.diols` | Diols and Polyols |
| 953 | chemistry | 17 | `chem.carb.aldehydes` | Aldehydes |
| 954 | chemistry | 17 | `chem.nitro.amines` | Amines |
| 955 | chemistry | 17 | `chem.poly.addition` | Addition Polymerization |
| 956 | biology | 17 | `bio.biotech.crispr-genome-editing` | CRISPR and Genome Editing |
| 957 | biology | 17 | `bio.bioinfo.bioinformatics-intro` | Introduction to Bioinformatics |
| 958 | computer_science | 17 | `cs.struct.doubly-circular-lists` | Doubly and Circular Linked Lists |
| 959 | computer_science | 17 | `cs.struct.trees` | Trees |
| 960 | computer_science | 17 | `cs.oop.class-static-methods` | Class Methods and Static Methods |
| 961 | computer_science | 17 | `cs.db.sql-queries-functions` | SQL — Queries and Aggregate Functions |
| 962 | computer_science | 17 | `cs.ds.pandas-dataframes` | Pandas for Data Analysis |
| 963 | mathematics | 18 | `math.arith.decimal-operations` | Decimal Operations |
| 964 | mathematics | 18 | `math.arith.terminating-decimals` | Terminating Decimals |
| 965 | mathematics | 18 | `math.arith.repeating-decimals` | Repeating Decimals |
| 966 | mathematics | 18 | `math.arith.percentages` | Percentages |
| 967 | mathematics | 18 | `math.arith.proportion` | Proportion |
| 968 | mathematics | 18 | `math.arith.unit-rate` | Unit Rate |
| 969 | mathematics | 18 | `math.arith.rounding` | Rounding |
| 970 | mathematics | 18 | `math.arith.irrational-roots` | Irrational Square Roots |
| 971 | mathematics | 18 | `math.arith.scientific-notation` | Scientific Notation |
| 972 | mathematics | 18 | `math.nt.composite-number` | Composite Number |
| 973 | mathematics | 18 | `math.nt.sieve-of-eratosthenes` | Sieve of Eratosthenes |
| 974 | mathematics | 18 | `math.nt.prime-factorization` | Prime Factorization |
| 975 | mathematics | 18 | `math.nt.congruence` | Congruence |
| 976 | mathematics | 18 | `math.nt.fermats-little-theorem` | Fermat's Little Theorem |
| 977 | mathematics | 18 | `math.nt.prime-distribution` | Distribution of Primes |
| 978 | mathematics | 18 | `math.alg.term` | Term |
| 979 | mathematics | 18 | `math.alg.equation` | Equation |
| 980 | mathematics | 18 | `math.alg.polynomial` | Polynomial |
| 981 | mathematics | 18 | `math.alg.exponent-rules` | Exponent Rules (Algebraic) |
| 982 | mathematics | 18 | `math.geom.pythagorean-converse` | Converse of the Pythagorean Theorem |
| 983 | mathematics | 18 | `math.geom.similar-triangles` | Similar Triangles |
| 984 | mathematics | 18 | `math.geom.distance-formula` | Distance Formula |
| 985 | mathematics | 18 | `math.geom.dilation` | Dilation |
| 986 | mathematics | 18 | `math.geom.cross-product` | Cross Product |
| 987 | mathematics | 18 | `math.geom.differential-geometry-curves` | Curves in Space |
| 988 | mathematics | 18 | `math.seq.divergent-sequence` | Divergent Sequence |
| 989 | mathematics | 18 | `math.seq.series-convergence` | Convergence of Series |
| 990 | mathematics | 18 | `math.calc.squeeze-theorem` | Squeeze Theorem |
| 991 | mathematics | 18 | `math.calc.continuity-types` | Types of Discontinuity |
| 992 | mathematics | 18 | `math.calc.ivt` | Intermediate Value Theorem |
| 993 | mathematics | 18 | `math.calc.derivative-definition` | Derivative (Definition) |
| 994 | mathematics | 18 | `math.calc.definite-integral` | Definite Integral |
| 995 | mathematics | 18 | `math.calc.line-integrals` | Line Integrals |
| 996 | mathematics | 18 | `math.linalg.vector-addition` | Vector Addition |
| 997 | mathematics | 18 | `math.linalg.scalar-multiplication` | Scalar Multiplication |
| 998 | mathematics | 18 | `math.linalg.dot-product` | Dot Product |
| 999 | mathematics | 18 | `math.linalg.matrix` | Matrix |
| 1000 | mathematics | 18 | `math.prob.combinatorial-probability` | Combinatorial Probability |
| 1001 | mathematics | 18 | `math.stats.descriptive-statistics` | Descriptive Statistics |
| 1002 | mathematics | 18 | `math.stats.sampling` | Sampling Methods |
| 1003 | mathematics | 18 | `math.disc.binomial-theorem` | Binomial Theorem |
| 1004 | mathematics | 18 | `math.disc.combinatorics` | Combinatorics |
| 1005 | mathematics | 18 | `math.disc.stars-bars` | Stars and Bars |
| 1006 | mathematics | 18 | `math.disc.inclusion-exclusion` | Inclusion-Exclusion Principle |
| 1007 | mathematics | 18 | `math.abst.sylow-theorems` | Sylow Theorems |
| 1008 | mathematics | 18 | `math.abst.finite-field` | Finite Field |
| 1009 | mathematics | 18 | `math.abst.galois-correspondence` | Fundamental Theorem of Galois Theory |
| 1010 | mathematics | 18 | `math.real.absolute-convergence` | Absolute Convergence |
| 1011 | mathematics | 18 | `math.real.completeness-metric` | Completeness of Metric Spaces |
| 1012 | mathematics | 18 | `math.real.continuity-rigorous` | Continuity (ε-δ) |
| 1013 | mathematics | 18 | `math.opt.convex-set` | Convex Set |
| 1014 | mathematics | 18 | `math.graph.shortest-path` | Shortest Path Algorithms |
| 1015 | physics | 18 | `phys.qm.variational-method` | Variational Method and Variational Principle |
| 1016 | physics | 18 | `phys.qm.identical-particles` | Identical Particles and the Symmetrization Postulate |
| 1017 | physics | 18 | `phys.qm.scattering-theory-born-approximation` | Scattering Theory and the Born Approximation |
| 1018 | physics | 18 | `phys.stat.fermi-dirac` | Fermi-Dirac Statistics |
| 1019 | physics | 18 | `phys.astro.stellar-structure` | Stellar Structure and the Main Sequence |
| 1020 | physics | 18 | `phys.particle.antimatter` | Antimatter and Antiparticles |
| 1021 | physics | 18 | `phys.particle.quarks` | Quarks |
| 1022 | physics | 18 | `phys.particle.leptons` | Leptons |
| 1023 | english | 18 | `eng.grammar.complex-sentences` | Complex Sentences |
| 1024 | english | 18 | `eng.grammar.parallel-structure` | Parallel Structure |
| 1025 | english | 18 | `eng.grammar.apostrophes` | Apostrophes |
| 1026 | english | 18 | `eng.grammar.quotation-marks` | Quotation Marks |
| 1027 | english | 18 | `eng.grammar.colons-semicolons-dashes` | Colons, Semicolons, and Dashes |
| 1028 | english | 18 | `eng.grammar.run-on-sentences-and-comma-splices` | Run-On Sentences and Comma Splices |
| 1029 | english | 18 | `eng.reading.critical-reading` | Critical Reading |
| 1030 | english | 18 | `eng.writing.paragraph-structure` | Paragraph Structure |
| 1031 | english | 18 | `eng.literature.narrative-elements` | Narrative Elements |
| 1032 | chemistry | 18 | `chem.alc.epoxides` | Epoxides |
| 1033 | chemistry | 18 | `chem.alc.protection` | Protecting Group Strategy |
| 1034 | chemistry | 18 | `chem.carb.ketones` | Ketones |
| 1035 | chemistry | 18 | `chem.carb.carboxylic` | Carboxylic Acids |
| 1036 | chemistry | 18 | `chem.nitro.diazonium` | Diazonium Salts |
| 1037 | chemistry | 18 | `chem.nitro.heterocycles` | Nitrogen Heterocycles |
| 1038 | chemistry | 18 | `chem.bio.carbohydrates` | Carbohydrates |
| 1039 | biology | 18 | `bio.bioinfo.sequence-alignment` | Sequence Alignment |
| 1040 | biology | 18 | `bio.sys.systems-biology-intro` | Introduction to Systems Biology |
| 1041 | computer_science | 18 | `cs.struct.binary-search-trees` | Binary Search Trees |
| 1042 | computer_science | 18 | `cs.struct.heaps` | Heaps |
| 1043 | computer_science | 18 | `cs.struct.graphs-representation` | Graphs and Their Representations |
| 1044 | computer_science | 18 | `cs.oop.design-patterns-intro` | Introduction to Design Patterns |
| 1045 | computer_science | 18 | `cs.db.sql-joins-subqueries` | SQL — Joins and Subqueries |
| 1046 | computer_science | 18 | `cs.ds.data-visualisation` | Data Visualisation with Matplotlib |
| 1047 | mathematics | 19 | `math.arith.percentage-calculations` | Percentage Calculations |
| 1048 | mathematics | 19 | `math.arith.direct-variation` | Direct Variation |
| 1049 | mathematics | 19 | `math.arith.inverse-variation` | Inverse Variation |
| 1050 | mathematics | 19 | `math.arith.estimation` | Estimation |
| 1051 | mathematics | 19 | `math.arith.significant-figures` | Significant Figures |
| 1052 | mathematics | 19 | `math.nt.fundamental-theorem-arithmetic` | Fundamental Theorem of Arithmetic |
| 1053 | mathematics | 19 | `math.nt.gcd` | Greatest Common Divisor |
| 1054 | mathematics | 19 | `math.nt.residue-classes` | Residue Classes |
| 1055 | mathematics | 19 | `math.nt.eulers-theorem` | Euler's Theorem |
| 1056 | mathematics | 19 | `math.nt.eulers-totient` | Euler's Totient Function |
| 1057 | mathematics | 19 | `math.nt.primality-testing` | Primality Testing |
| 1058 | mathematics | 19 | `math.alg.coefficient` | Coefficient |
| 1059 | mathematics | 19 | `math.alg.solution-set` | Solution Set |
| 1060 | mathematics | 19 | `math.alg.degree` | Degree of a Polynomial |
| 1061 | mathematics | 19 | `math.alg.zero-exponent` | Zero Exponent |
| 1062 | mathematics | 19 | `math.alg.negative-exponent` | Negative Exponent |
| 1063 | mathematics | 19 | `math.alg.radicals` | Radical Expressions |
| 1064 | mathematics | 19 | `math.alg.exponential-function` | Exponential Function |
| 1065 | mathematics | 19 | `math.alg.inequality` | Inequality |
| 1066 | mathematics | 19 | `math.alg.binomial-theorem` | Binomial Theorem |
| 1067 | mathematics | 19 | `math.trig.right-triangle-trig` | Right-Triangle Trigonometry |
| 1068 | mathematics | 19 | `math.seq.divergence-test` | Divergence Test (nth Term Test) |
| 1069 | mathematics | 19 | `math.seq.comparison-test` | Comparison Test |
| 1070 | mathematics | 19 | `math.seq.ratio-test` | Ratio Test |
| 1071 | mathematics | 19 | `math.seq.root-test` | Root Test |
| 1072 | mathematics | 19 | `math.seq.alternating-series` | Alternating Series |
| 1073 | mathematics | 19 | `math.seq.harmonic-series` | Harmonic Series |
| 1074 | mathematics | 19 | `math.calc.differentiability` | Differentiability |
| 1075 | mathematics | 19 | `math.calc.derivative-rules` | Basic Differentiation Rules |
| 1076 | mathematics | 19 | `math.calc.lhopitals-rule` | L'Hôpital's Rule |
| 1077 | mathematics | 19 | `math.calc.mean-value-theorem` | Mean Value Theorem |
| 1078 | mathematics | 19 | `math.calc.linearization` | Linearization and Differentials |
| 1079 | mathematics | 19 | `math.calc.ftc-part1` | Fundamental Theorem of Calculus Part 1 |
| 1080 | mathematics | 19 | `math.calc.improper-integrals` | Improper Integrals |
| 1081 | mathematics | 19 | `math.calc.integral-area` | Area by Integration |
| 1082 | mathematics | 19 | `math.calc.power-series` | Power Series |
| 1083 | mathematics | 19 | `math.calc.multivariable-intro` | Introduction to Multivariable Calculus |
| 1084 | mathematics | 19 | `math.linalg.norm` | Vector Norm |
| 1085 | mathematics | 19 | `math.linalg.orthogonality` | Orthogonality |
| 1086 | mathematics | 19 | `math.linalg.cross-product` | Cross Product |
| 1087 | mathematics | 19 | `math.linalg.matrix-addition` | Matrix Addition |
| 1088 | mathematics | 19 | `math.linalg.matrix-multiplication` | Matrix Multiplication |
| 1089 | mathematics | 19 | `math.linalg.matrix-transpose` | Matrix Transpose |
| 1090 | mathematics | 19 | `math.linalg.vector-space` | Vector Space |
| 1091 | mathematics | 19 | `math.prob.continuous-rv` | Continuous Random Variable |
| 1092 | mathematics | 19 | `math.stats.measures-of-center` | Measures of Center |
| 1093 | mathematics | 19 | `math.stats.measures-of-spread` | Measures of Spread |
| 1094 | mathematics | 19 | `math.stats.data-visualization` | Data Visualization |
| 1095 | mathematics | 19 | `math.disc.derangements` | Derangements |
| 1096 | mathematics | 19 | `math.disc.recurrence-relation` | Recurrence Relation |
| 1097 | mathematics | 19 | `math.disc.graph-representation` | Graph Representation |
| 1098 | mathematics | 19 | `math.real.uniform-continuity` | Uniform Continuity |
| 1099 | mathematics | 19 | `math.real.extreme-value-theorem` | Extreme Value Theorem |
| 1100 | mathematics | 19 | `math.real.ivt` | Intermediate Value Theorem (Rigorous) |
| 1101 | mathematics | 19 | `math.real.differentiability-rigorous` | Differentiability (Rigorous) |
| 1102 | mathematics | 19 | `math.real.riemann-integral` | Riemann Integral (Rigorous) |
| 1103 | mathematics | 19 | `math.real.uniform-convergence` | Uniform Convergence |
| 1104 | mathematics | 19 | `math.real.baire-category` | Baire Category Theorem |
| 1105 | mathematics | 19 | `math.graph.extremal-graph-theory` | Extremal Graph Theory |
| 1106 | physics | 19 | `phys.qm.wkb-approximation` | WKB Approximation (Semiclassical Limit) |
| 1107 | physics | 19 | `phys.qm.s-matrix-basics` | S-Matrix and Scattering Amplitudes |
| 1108 | physics | 19 | `phys.astro.stellar-evolution` | Stellar Evolution and End States |
| 1109 | physics | 19 | `phys.astro.cosmology` | Big Bang Cosmology |
| 1110 | physics | 19 | `phys.particle.neutrinos` | Neutrinos |
| 1111 | physics | 19 | `phys.particle.hadron-quark-model` | Quark Model of Hadrons: Baryons and Mesons |
| 1112 | physics | 19 | `phys.particle.strong-interaction` | The Strong Interaction and Color Charge |
| 1113 | physics | 19 | `phys.mod.energy-bands` | Energy Bands in Solids |
| 1114 | english | 19 | `eng.grammar.sentence-combining` | Sentence Combining |
| 1115 | english | 19 | `eng.reading.evaluating-sources` | Evaluating Sources |
| 1116 | english | 19 | `eng.writing.topic-sentences` | Topic Sentences |
| 1117 | english | 19 | `eng.literature.plot-structure` | Plot Structure |
| 1118 | english | 19 | `eng.literature.character-development` | Character Development |
| 1119 | english | 19 | `eng.literature.setting-and-atmosphere` | Setting and Atmosphere |
| 1120 | english | 19 | `eng.literature.point-of-view` | Point of View |
| 1121 | english | 19 | `eng.literature.drama-basics` | Drama Basics |
| 1122 | chemistry | 19 | `chem.carb.alpha-reactions` | Alpha-Carbon Reactions |
| 1123 | chemistry | 19 | `chem.carb.derivatives` | Carboxylic Acid Derivatives |
| 1124 | chemistry | 19 | `chem.carb.spectro` | Spectroscopic ID of Carbonyls |
| 1125 | chemistry | 19 | `chem.nitro.amino-acids` | Amino Acids |
| 1126 | biology | 19 | `bio.bioinfo.phylogenetics-computational` | Computational Phylogenetics |
| 1127 | biology | 19 | `bio.bioinfo.structural-bioinformatics` | Structural Bioinformatics |
| 1128 | biology | 19 | `bio.sys.gene-regulatory-networks` | Gene Regulatory Networks |
| 1129 | computer_science | 19 | `cs.struct.balanced-trees` | Balanced Search Trees |
| 1130 | computer_science | 19 | `cs.struct.graph-traversal` | Graph Traversal — BFS and DFS |
| 1131 | computer_science | 19 | `cs.db.transactions-acid` | Transactions and the ACID Properties |
| 1132 | computer_science | 19 | `cs.db.mysql-python` | Connecting Python to MySQL |
| 1133 | computer_science | 19 | `cs.se.agile-design-principles` | Agile Practices and Software Design Principles |
| 1134 | computer_science | 19 | `cs.ds.intro-machine-learning` | Introduction to Machine Learning |
| 1135 | mathematics | 20 | `math.arith.fraction-simplification` | Fraction Simplification |
| 1136 | mathematics | 20 | `math.arith.percentage-change` | Percentage Change |
| 1137 | mathematics | 20 | `math.nt.euclidean-algorithm` | Euclidean Algorithm |
| 1138 | mathematics | 20 | `math.nt.lcm` | Least Common Multiple |
| 1139 | mathematics | 20 | `math.nt.chinese-remainder-theorem` | Chinese Remainder Theorem |
| 1140 | mathematics | 20 | `math.alg.like-terms` | Like Terms |
| 1141 | mathematics | 20 | `math.alg.fractional-exponent` | Fractional Exponent |
| 1142 | mathematics | 20 | `math.alg.simplifying-radicals` | Simplifying Radical Expressions |
| 1143 | mathematics | 20 | `math.alg.radical-equations` | Radical Equations |
| 1144 | mathematics | 20 | `math.alg.exponential-equations` | Exponential Equations |
| 1145 | mathematics | 20 | `math.alg.logarithm` | Logarithm |
| 1146 | mathematics | 20 | `math.alg.pascals-triangle` | Pascal's Triangle |
| 1147 | mathematics | 20 | `math.geom.curvature` | Curvature |
| 1148 | mathematics | 20 | `math.trig.basic-ratios` | Six Trigonometric Ratios |
| 1149 | mathematics | 20 | `math.trig.unit-circle` | Unit Circle |
| 1150 | mathematics | 20 | `math.trig.law-of-sines` | Law of Sines |
| 1151 | mathematics | 20 | `math.trig.law-of-cosines` | Law of Cosines |
| 1152 | mathematics | 20 | `math.func.exponential-function` | Exponential Function |
| 1153 | mathematics | 20 | `math.seq.integral-test` | Integral Test |
| 1154 | mathematics | 20 | `math.seq.absolute-convergence` | Absolute and Conditional Convergence |
| 1155 | mathematics | 20 | `math.calc.product-rule` | Product Rule |
| 1156 | mathematics | 20 | `math.calc.chain-rule` | Chain Rule |
| 1157 | mathematics | 20 | `math.calc.higher-order-derivatives` | Higher-Order Derivatives |
| 1158 | mathematics | 20 | `math.calc.rolles-theorem` | Rolle's Theorem |
| 1159 | mathematics | 20 | `math.calc.increasing-decreasing` | Increasing and Decreasing Functions |
| 1160 | mathematics | 20 | `math.calc.critical-points` | Critical Points |
| 1161 | mathematics | 20 | `math.calc.antiderivatives` | Antiderivatives |
| 1162 | mathematics | 20 | `math.calc.volume-revolution` | Volumes of Revolution |
| 1163 | mathematics | 20 | `math.calc.arc-length` | Arc Length |
| 1164 | mathematics | 20 | `math.calc.radius-of-convergence` | Radius of Convergence |
| 1165 | mathematics | 20 | `math.calc.partial-derivatives` | Partial Derivatives |
| 1166 | mathematics | 20 | `math.calc.multiple-integrals` | Multiple Integrals |
| 1167 | mathematics | 20 | `math.linalg.unit-vector` | Unit Vector |
| 1168 | mathematics | 20 | `math.linalg.symmetric-matrix` | Symmetric Matrix |
| 1169 | mathematics | 20 | `math.linalg.determinant` | Determinant |
| 1170 | mathematics | 20 | `math.linalg.subspace` | Subspace |
| 1171 | mathematics | 20 | `math.linalg.linear-map` | Linear Map |
| 1172 | mathematics | 20 | `math.linalg.inner-product` | Inner Product |
| 1173 | mathematics | 20 | `math.linalg.distance` | Distance in Vector Spaces |
| 1174 | mathematics | 20 | `math.linalg.angle-vectors` | Angle Between Vectors |
| 1175 | mathematics | 20 | `math.prob.pdf` | Probability Density Function |
| 1176 | mathematics | 20 | `math.prob.generating-function` | Probability Generating Function |
| 1177 | mathematics | 20 | `math.prob.markov-chain` | Markov Chain |
| 1178 | mathematics | 20 | `math.stats.percentile` | Percentile |
| 1179 | mathematics | 20 | `math.disc.generating-functions` | Generating Functions |
| 1180 | mathematics | 20 | `math.disc.catalan-numbers` | Catalan Numbers |
| 1181 | mathematics | 20 | `math.disc.stirling-numbers` | Stirling Numbers |
| 1182 | mathematics | 20 | `math.real.lipschitz-continuity` | Lipschitz Continuity |
| 1183 | mathematics | 20 | `math.real.mvt` | Mean Value Theorem (Rigorous) |
| 1184 | mathematics | 20 | `math.real.riemann-integrability` | Riemann Integrability |
| 1185 | mathematics | 20 | `math.real.ftc-rigorous` | Fundamental Theorem of Calculus (Rigorous) |
| 1186 | mathematics | 20 | `math.real.weierstrass-approximation` | Weierstrass Approximation Theorem |
| 1187 | mathematics | 20 | `math.top.smooth-manifold` | Smooth Manifold |
| 1188 | mathematics | 20 | `math.fnal.normed-space` | Normed Space |
| 1189 | mathematics | 20 | `math.num.floating-point` | Floating-Point Arithmetic |
| 1190 | mathematics | 20 | `math.num.root-finding` | Root-Finding Methods |
| 1191 | mathematics | 20 | `math.opt.dynamic-programming` | Dynamic Programming |
| 1192 | physics | 20 | `phys.astro.dark-matter` | Dark Matter and Dark Energy |
| 1193 | physics | 20 | `phys.astro.black-holes` | Black Holes and Schwarzschild Radius |
| 1194 | physics | 20 | `phys.particle.weak-interaction` | The Weak Interaction |
| 1195 | physics | 20 | `phys.particle.conservation-laws` | Conservation Laws in Particle Interactions |
| 1196 | physics | 20 | `phys.mod.semiconductor-classification` | Conductors, Insulators, and Semiconductors |
| 1197 | english | 20 | `eng.reading.reading-across-genres` | Reading Across Genres |
| 1198 | english | 20 | `eng.writing.supporting-details` | Supporting Details |
| 1199 | english | 20 | `eng.literature.theme-and-message` | Theme and Message |
| 1200 | english | 20 | `eng.literature.foreshadowing-and-suspense` | Foreshadowing and Suspense |
| 1201 | english | 20 | `eng.literature.dramatic-structure` | Dramatic Structure |
| 1202 | english | 20 | `eng.literature.prose-fiction` | Prose Fiction |
| 1203 | english | 20 | `eng.linguistics.what-is-linguistics` | What Is Linguistics? |
| 1204 | english | 20 | `eng.communication.media-literacy` | Media Literacy |
| 1205 | chemistry | 20 | `chem.carb.named-reactions` | Named Carbonyl Reactions |
| 1206 | chemistry | 20 | `chem.bio.proteins` | Proteins |
| 1207 | chemistry | 20 | `chem.bio.lipids` | Lipids |
| 1208 | chemistry | 20 | `chem.poly.condensation` | Condensation Polymerization |
| 1209 | biology | 20 | `bio.sys.metabolic-network-modelling` | Metabolic Network Modelling |
| 1210 | computer_science | 20 | `cs.struct.shortest-path-algorithms` | Shortest Path Algorithms |
| 1211 | computer_science | 20 | `cs.db.indexing-query-optimisation` | Indexing and Query Optimisation |
| 1212 | computer_science | 20 | `cs.db.nosql-intro` | Introduction to NoSQL Databases |
| 1213 | computer_science | 20 | `cs.ds.supervised-learning-models` | Supervised Learning Models |
| 1214 | computer_science | 20 | `cs.ds.unsupervised-learning-models` | Unsupervised Learning Models |
| 1215 | mathematics | 21 | `math.arith.fraction-addition` | Addition and Subtraction of Fractions |
| 1216 | mathematics | 21 | `math.nt.extended-euclidean-algorithm` | Extended Euclidean Algorithm |
| 1217 | mathematics | 21 | `math.nt.continued-fractions` | Continued Fractions |
| 1218 | mathematics | 21 | `math.alg.simplification` | Algebraic Simplification |
| 1219 | mathematics | 21 | `math.alg.polynomial-operations` | Polynomial Operations |
| 1220 | mathematics | 21 | `math.alg.rationalizing-denominators` | Rationalizing the Denominator |
| 1221 | mathematics | 21 | `math.alg.logarithm-properties` | Logarithm Properties |
| 1222 | mathematics | 21 | `math.alg.natural-logarithm` | Natural Logarithm |
| 1223 | mathematics | 21 | `math.geom.frenet-serret` | Frenet-Serret Formulas |
| 1224 | mathematics | 21 | `math.geom.differential-geometry-surfaces` | Differential Geometry of Surfaces |
| 1225 | mathematics | 21 | `math.trig.special-angles` | Trigonometric Values at Special Angles |
| 1226 | mathematics | 21 | `math.trig.reference-angles` | Reference Angles |
| 1227 | mathematics | 21 | `math.trig.trig-functions` | Trigonometric Functions |
| 1228 | mathematics | 21 | `math.func.logarithmic-function` | Logarithmic Function |
| 1229 | mathematics | 21 | `math.calc.quotient-rule` | Quotient Rule |
| 1230 | mathematics | 21 | `math.calc.derivative-exponential` | Derivative of Exponential Functions |
| 1231 | mathematics | 21 | `math.calc.implicit-differentiation` | Implicit Differentiation |
| 1232 | mathematics | 21 | `math.calc.local-extrema` | Local Extrema |
| 1233 | mathematics | 21 | `math.calc.concavity` | Concavity and Inflection Points |
| 1234 | mathematics | 21 | `math.calc.ftc-part2` | Fundamental Theorem of Calculus Part 2 |
| 1235 | mathematics | 21 | `math.calc.surface-area-integral` | Surface Area of Revolution |
| 1236 | mathematics | 21 | `math.calc.taylor-series` | Taylor Series |
| 1237 | mathematics | 21 | `math.calc.parametric-calculus` | Calculus of Parametric Curves |
| 1238 | mathematics | 21 | `math.calc.gradient` | Gradient |
| 1239 | mathematics | 21 | `math.calc.chain-rule-multivariable` | Multivariable Chain Rule |
| 1240 | mathematics | 21 | `math.calc.double-integrals` | Double Integrals |
| 1241 | mathematics | 21 | `math.calc.change-of-variables` | Change of Variables (Jacobian) |
| 1242 | mathematics | 21 | `math.de.ode` | Ordinary Differential Equation |
| 1243 | mathematics | 21 | `math.linalg.matrix-inverse` | Matrix Inverse |
| 1244 | mathematics | 21 | `math.linalg.cofactor-expansion` | Cofactor Expansion |
| 1245 | mathematics | 21 | `math.linalg.det-properties` | Properties of Determinants |
| 1246 | mathematics | 21 | `math.linalg.span` | Span |
| 1247 | mathematics | 21 | `math.linalg.kernel-image` | Kernel and Image of Linear Map |
| 1248 | mathematics | 21 | `math.linalg.eigenvalues` | Eigenvalues and Eigenvectors |
| 1249 | mathematics | 21 | `math.linalg.inner-product-space` | Inner Product Space |
| 1250 | mathematics | 21 | `math.linalg.projection` | Orthogonal Projection |
| 1251 | mathematics | 21 | `math.linalg.tensor` | Tensor |
| 1252 | mathematics | 21 | `math.linalg.dual-space` | Dual Space |
| 1253 | mathematics | 21 | `math.prob.continuous-distributions` | Continuous Distributions |
| 1254 | mathematics | 21 | `math.prob.expected-value` | Expected Value |
| 1255 | mathematics | 21 | `math.prob.transition-matrix` | Transition Matrix |
| 1256 | mathematics | 21 | `math.disc.divide-conquer-recurrence` | Divide-and-Conquer Recurrence |
| 1257 | mathematics | 21 | `math.disc.ogf` | Ordinary Generating Function |
| 1258 | mathematics | 21 | `math.disc.egf` | Exponential Generating Function |
| 1259 | mathematics | 21 | `math.real.taylor-rigorous` | Taylor's Theorem (Rigorous) |
| 1260 | mathematics | 21 | `math.real.fixed-point-theorem` | Banach Fixed-Point Theorem |
| 1261 | mathematics | 21 | `math.fnal.completeness` | Completeness |
| 1262 | mathematics | 21 | `math.num.error-analysis` | Error Analysis |
| 1263 | mathematics | 21 | `math.num.newtons-method` | Newton's Method |
| 1264 | physics | 21 | `phys.astro.gravitational-waves` | Gravitational Waves |
| 1265 | physics | 21 | `phys.particle.electroweak-unification` | Electroweak Unification |
| 1266 | physics | 21 | `phys.particle.feynman-diagrams` | Feynman Diagrams (Qualitative) |
| 1267 | physics | 21 | `phys.particle.accelerators-detectors` | Particle Accelerators and Detectors |
| 1268 | physics | 21 | `phys.mod.intrinsic-semiconductors` | Intrinsic Semiconductors |
| 1269 | english | 21 | `eng.writing.transitions-and-cohesion` | Transitions and Cohesion |
| 1270 | english | 21 | `eng.literature.literary-devices-overview` | Overview of Literary Devices |
| 1271 | english | 21 | `eng.literature.prose-nonfiction` | Prose Nonfiction |
| 1272 | english | 21 | `eng.linguistics.phonology-intro` | Introduction to Phonology |
| 1273 | english | 21 | `eng.linguistics.morphology-intro` | Introduction to Morphology |
| 1274 | chemistry | 21 | `chem.bio.nucleic-acids` | Nucleic Acids |
| 1275 | chemistry | 21 | `chem.bio.vitamins` | Vitamins and Hormones |
| 1276 | chemistry | 21 | `chem.bio.enzyme-kinetics` | Enzyme Kinetics |
| 1277 | chemistry | 21 | `chem.poly.natural` | Natural Polymers |
| 1278 | chemistry | 21 | `chem.poly.properties` | Polymer Properties |
| 1279 | chemistry | 21 | `chem.poly.biodegradable` | Biodegradable and Functional Polymers |
| 1280 | biology | 21 | `bio.sys.synthetic-biology` | Synthetic Biology |
| 1281 | computer_science | 21 | `cs.struct.minimum-spanning-tree` | Minimum Spanning Trees |
| 1282 | computer_science | 21 | `cs.ds.neural-networks-intro` | Introduction to Neural Networks |
| 1283 | mathematics | 22 | `math.nt.bezout-identity` | Bézout's Identity |
| 1284 | mathematics | 22 | `math.nt.modular-inverse` | Modular Inverse |
| 1285 | mathematics | 22 | `math.alg.linear-equation-1var` | Linear Equation in One Variable |
| 1286 | mathematics | 22 | `math.alg.polynomial-division` | Polynomial Division |
| 1287 | mathematics | 22 | `math.alg.change-of-base` | Change of Base Formula |
| 1288 | mathematics | 22 | `math.alg.logarithmic-equations` | Logarithmic Equations |
| 1289 | mathematics | 22 | `math.geom.polar-coordinates` | Polar Coordinates |
| 1290 | mathematics | 22 | `math.geom.rotation` | Rotation |
| 1291 | mathematics | 22 | `math.geom.dot-product` | Dot Product |
| 1292 | mathematics | 22 | `math.trig.amplitude-period-phase` | Amplitude, Period, Phase Shift |
| 1293 | mathematics | 22 | `math.trig.trig-identities` | Trigonometric Identities |
| 1294 | mathematics | 22 | `math.trig.inverse-trig` | Inverse Trigonometric Functions |
| 1295 | mathematics | 22 | `math.trig.hyperbolic-functions` | Hyperbolic Functions |
| 1296 | mathematics | 22 | `math.calc.derivative-ln` | Derivative of Logarithmic Functions |
| 1297 | mathematics | 22 | `math.calc.derivative-trig` | Derivatives of Trigonometric Functions |
| 1298 | mathematics | 22 | `math.calc.related-rates` | Related Rates |
| 1299 | mathematics | 22 | `math.calc.optimization` | Optimization (Calculus) |
| 1300 | mathematics | 22 | `math.calc.curve-sketching` | Curve Sketching |
| 1301 | mathematics | 22 | `math.calc.u-substitution` | Integration by Substitution |
| 1302 | mathematics | 22 | `math.calc.maclaurin-series` | Maclaurin Series |
| 1303 | mathematics | 22 | `math.calc.taylor-remainder` | Taylor Remainder and Error Bound |
| 1304 | mathematics | 22 | `math.calc.directional-derivative` | Directional Derivative |
| 1305 | mathematics | 22 | `math.calc.multivariable-extrema` | Multivariable Extrema |
| 1306 | mathematics | 22 | `math.calc.triple-integrals` | Triple Integrals |
| 1307 | mathematics | 22 | `math.calc.surface-integrals` | Surface Integrals |
| 1308 | mathematics | 22 | `math.calc.vector-fields` | Vector Fields |
| 1309 | mathematics | 22 | `math.calc.greens-theorem` | Green's Theorem |
| 1310 | mathematics | 22 | `math.calc.fourier-series-intro` | Fourier Series (Introduction) |
| 1311 | mathematics | 22 | `math.de.ode-order` | Order of a Differential Equation |
| 1312 | mathematics | 22 | `math.de.ode-linearity` | Linearity of Differential Equations |
| 1313 | mathematics | 22 | `math.de.solution-types` | Types of Solutions |
| 1314 | mathematics | 22 | `math.de.pde` | Partial Differential Equation |
| 1315 | mathematics | 22 | `math.linalg.cramer-rule` | Cramer's Rule |
| 1316 | mathematics | 22 | `math.linalg.linear-independence` | Linear Independence |
| 1317 | mathematics | 22 | `math.linalg.column-space` | Column Space |
| 1318 | mathematics | 22 | `math.linalg.characteristic-polynomial` | Characteristic Polynomial |
| 1319 | mathematics | 22 | `math.linalg.least-squares` | Least Squares |
| 1320 | mathematics | 22 | `math.prob.normal-distribution` | Normal Distribution |
| 1321 | mathematics | 22 | `math.prob.linearity-expectation` | Linearity of Expectation |
| 1322 | mathematics | 22 | `math.prob.law-of-unconscious` | Law of the Unconscious Statistician |
| 1323 | mathematics | 22 | `math.prob.variance` | Variance |
| 1324 | mathematics | 22 | `math.prob.moments` | Moments |
| 1325 | mathematics | 22 | `math.prob.markov-inequality` | Markov's Inequality |
| 1326 | mathematics | 22 | `math.prob.stationary-distribution` | Stationary Distribution |
| 1327 | mathematics | 22 | `math.prob.poisson-process` | Poisson Process |
| 1328 | mathematics | 22 | `math.disc.algorithm-complexity` | Algorithm Complexity |
| 1329 | mathematics | 22 | `math.real.implicit-function-theorem` | Implicit Function Theorem |
| 1330 | mathematics | 22 | `math.real.inverse-function-theorem` | Inverse Function Theorem |
| 1331 | mathematics | 22 | `math.fnal.banach-space` | Banach Space |
| 1332 | mathematics | 22 | `math.num.numerical-differentiation` | Numerical Differentiation |
| 1333 | mathematics | 22 | `math.opt.unconstrained-optimization` | Unconstrained Optimization |
| 1334 | mathematics | 22 | `math.opt.convex-function` | Convex Function |
| 1335 | mathematics | 22 | `math.graph.algebraic-graph-theory` | Algebraic Graph Theory |
| 1336 | physics | 22 | `phys.particle.higgs-mechanism` | The Higgs Mechanism |
| 1337 | physics | 22 | `phys.mod.extrinsic-semiconductors` | Extrinsic Semiconductors: Doping and Carrier Types |
| 1338 | english | 22 | `eng.writing.narrative-writing` | Narrative Writing |
| 1339 | english | 22 | `eng.writing.descriptive-writing` | Descriptive Writing |
| 1340 | english | 22 | `eng.writing.expository-writing` | Expository Writing |
| 1341 | english | 22 | `eng.writing.persuasive-writing-basics` | Persuasive Writing Basics |
| 1342 | english | 22 | `eng.literature.metaphor-and-simile` | Metaphor and Simile |
| 1343 | english | 22 | `eng.literature.irony` | Irony |
| 1344 | english | 22 | `eng.literature.poetry-basics` | Poetry Basics |
| 1345 | english | 22 | `eng.linguistics.syntax-theory-intro` | Introduction to Syntactic Theory |
| 1346 | english | 22 | `eng.linguistics.historical-linguistics-intro` | Introduction to Historical Linguistics |
| 1347 | mathematics | 23 | `math.nt.linear-diophantine` | Linear Diophantine Equations |
| 1348 | mathematics | 23 | `math.nt.rsa-basics` | RSA Cryptography (Number-Theoretic Basis) |
| 1349 | mathematics | 23 | `math.alg.inequality-1var` | Linear Inequality in One Variable |
| 1350 | mathematics | 23 | `math.alg.absolute-value-equations` | Absolute Value Equations and Inequalities |
| 1351 | mathematics | 23 | `math.alg.linear-equation-2var` | Linear Equation in Two Variables |
| 1352 | mathematics | 23 | `math.alg.remainder-theorem` | Remainder Theorem |
| 1353 | mathematics | 23 | `math.geom.polar-curves` | Polar Curves |
| 1354 | mathematics | 23 | `math.trig.trig-graphs` | Graphs of Trigonometric Functions |
| 1355 | mathematics | 23 | `math.trig.pythagorean-identities` | Pythagorean Identities |
| 1356 | mathematics | 23 | `math.trig.reciprocal-identities` | Reciprocal Identities |
| 1357 | mathematics | 23 | `math.trig.sum-difference-formulas` | Sum and Difference Formulas |
| 1358 | mathematics | 23 | `math.trig.trig-equations` | Trigonometric Equations |
| 1359 | mathematics | 23 | `math.trig.polar-form-complex` | Polar Form of Complex Numbers |
| 1360 | mathematics | 23 | `math.calc.logarithmic-differentiation` | Logarithmic Differentiation |
| 1361 | mathematics | 23 | `math.calc.derivative-inverse-trig` | Derivatives of Inverse Trig Functions |
| 1362 | mathematics | 23 | `math.calc.hyperbolic-derivatives` | Derivatives of Hyperbolic Functions |
| 1363 | mathematics | 23 | `math.calc.integration-by-parts` | Integration by Parts |
| 1364 | mathematics | 23 | `math.calc.curl-divergence` | Curl and Divergence |
| 1365 | mathematics | 23 | `math.de.ivp` | Initial Value Problem |
| 1366 | mathematics | 23 | `math.de.first-order-ode` | First-Order ODE |
| 1367 | mathematics | 23 | `math.de.pde-classification` | Classification of Second-Order PDEs |
| 1368 | mathematics | 23 | `math.linalg.basis` | Basis |
| 1369 | mathematics | 23 | `math.prob.standard-normal` | Standard Normal Distribution |
| 1370 | mathematics | 23 | `math.prob.standard-deviation` | Standard Deviation |
| 1371 | mathematics | 23 | `math.prob.mgf` | Moment Generating Function |
| 1372 | mathematics | 23 | `math.prob.covariance` | Covariance |
| 1373 | mathematics | 23 | `math.prob.chebyshev` | Chebyshev's Inequality |
| 1374 | mathematics | 23 | `math.prob.ergodicity` | Ergodic Theorem (Markov Chains) |
| 1375 | mathematics | 23 | `math.stats.normal-distribution` | Normal Distribution (Statistics) |
| 1376 | mathematics | 23 | `math.disc.complexity-classes` | Complexity Classes |
| 1377 | mathematics | 23 | `math.fnal.hilbert-space` | Hilbert Space |
| 1378 | mathematics | 23 | `math.fnal.bounded-operator` | Bounded Linear Operator |
| 1379 | mathematics | 23 | `math.fnal.dense-subspace` | Dense Subspaces and Approximation |
| 1380 | mathematics | 23 | `math.opt.convex-optimization` | Convex Optimization |
| 1381 | mathematics | 23 | `math.opt.lagrange-multipliers` | Lagrange Multipliers |
| 1382 | mathematics | 23 | `math.opt.gradient-methods` | Gradient Descent |
| 1383 | physics | 23 | `phys.particle.standard-model` | The Standard Model |
| 1384 | physics | 23 | `phys.mod.pn-junction` | The p-n Junction |
| 1385 | english | 23 | `eng.writing.the-writing-process` | The Writing Process |
| 1386 | english | 23 | `eng.writing.creative-writing-forms` | Creative Writing Forms |
| 1387 | english | 23 | `eng.literature.symbolism` | Symbolism |
| 1388 | english | 23 | `eng.literature.imagery` | Imagery |
| 1389 | english | 23 | `eng.literature.poetic-forms` | Poetic Forms |
| 1390 | english | 23 | `eng.literature.literary-genres-overview` | Overview of Literary Genres |
| 1391 | english | 23 | `eng.linguistics.semantics-intro` | Introduction to Semantics |
| 1392 | english | 23 | `eng.linguistics.language-families` | Language Families |
| 1393 | english | 23 | `eng.linguistics.language-acquisition-intro` | Introduction to Language Acquisition |
| 1394 | mathematics | 24 | `math.nt.general-diophantine` | Diophantine Equations |
| 1395 | mathematics | 24 | `math.alg.inequality-2var` | Linear Inequality in Two Variables |
| 1396 | mathematics | 24 | `math.alg.system-linear-equations` | Systems of Linear Equations |
| 1397 | mathematics | 24 | `math.alg.factor-theorem` | Factor Theorem |
| 1398 | mathematics | 24 | `math.trig.double-angle-formulas` | Double Angle Formulas |
| 1399 | mathematics | 24 | `math.trig.product-to-sum` | Product-to-Sum and Sum-to-Product Formulas |
| 1400 | mathematics | 24 | `math.trig.de-moivres-theorem` | De Moivre's Theorem |
| 1401 | mathematics | 24 | `math.trig.eulers-formula` | Euler's Formula |
| 1402 | mathematics | 24 | `math.calc.reduction-formulas` | Reduction Formulas |
| 1403 | mathematics | 24 | `math.calc.stokes-theorem` | Stokes' Theorem |
| 1404 | mathematics | 24 | `math.calc.divergence-theorem` | Divergence Theorem |
| 1405 | mathematics | 24 | `math.de.existence-uniqueness` | Existence and Uniqueness Theorem |
| 1406 | mathematics | 24 | `math.de.separable` | Separable Differential Equation |
| 1407 | mathematics | 24 | `math.de.linear-first-order` | Linear First-Order ODE |
| 1408 | mathematics | 24 | `math.de.exact-ode` | Exact Differential Equation |
| 1409 | mathematics | 24 | `math.de.slope-field` | Slope Field |
| 1410 | mathematics | 24 | `math.de.euler-method` | Euler's Method |
| 1411 | mathematics | 24 | `math.de.second-order-ode` | Second-Order ODE |
| 1412 | mathematics | 24 | `math.linalg.dimension` | Dimension |
| 1413 | mathematics | 24 | `math.linalg.coordinates` | Coordinates |
| 1414 | mathematics | 24 | `math.linalg.matrix-representation` | Matrix Representation of Linear Map |
| 1415 | mathematics | 24 | `math.linalg.orthogonal-basis` | Orthogonal and Orthonormal Basis |
| 1416 | mathematics | 24 | `math.prob.correlation` | Correlation |
| 1417 | mathematics | 24 | `math.prob.lln` | Law of Large Numbers |
| 1418 | mathematics | 24 | `math.stats.covariance-matrix` | Covariance Matrix |
| 1419 | mathematics | 24 | `math.cx.complex-numbers-analysis` | Complex Numbers (Analysis) |
| 1420 | mathematics | 24 | `math.fnal.dual-space-functional` | Dual Space |
| 1421 | mathematics | 24 | `math.fnal.open-mapping-theorem` | Open Mapping Theorem |
| 1422 | mathematics | 24 | `math.fnal.uniform-boundedness` | Uniform Boundedness Principle |
| 1423 | mathematics | 24 | `math.fnal.riesz-representation` | Riesz Representation Theorem |
| 1424 | mathematics | 24 | `math.fnal.spectral-theory` | Spectral Theory |
| 1425 | mathematics | 24 | `math.fnal.fourier-transform` | Fourier Transform (Functional Analysis) |
| 1426 | mathematics | 24 | `math.opt.duality` | Duality Theory |
| 1427 | mathematics | 24 | `math.opt.stochastic-gradient` | Stochastic Gradient Descent |
| 1428 | mathematics | 24 | `math.opt.newton-optimization` | Newton's Method for Optimization |
| 1429 | physics | 24 | `phys.mod.diode-rectification` | Diode Rectifying Behavior |
| 1430 | english | 24 | `eng.writing.outlining-and-planning` | Outlining and Planning |
| 1431 | english | 24 | `eng.literature.meter-and-rhyme` | Meter and Rhyme |
| 1432 | english | 24 | `eng.literature.short-story-study` | Short Story Study |
| 1433 | english | 24 | `eng.literature.literary-periods-survey` | Survey of Literary Periods |
| 1434 | english | 24 | `eng.linguistics.pragmatics-intro` | Introduction to Pragmatics |
| 1435 | english | 24 | `eng.linguistics.psycholinguistics-intro` | Introduction to Psycholinguistics |
| 1436 | mathematics | 25 | `math.nt.pythagorean-triples` | Pythagorean Triples |
| 1437 | mathematics | 25 | `math.nt.pells-equation` | Pell's Equation |
| 1438 | mathematics | 25 | `math.nt.algebraic-number-theory` | Algebraic Number Theory |
| 1439 | mathematics | 25 | `math.nt.analytic-number-theory` | Analytic Number Theory |
| 1440 | mathematics | 25 | `math.alg.substitution-method` | Substitution Method |
| 1441 | mathematics | 25 | `math.alg.elimination-method` | Elimination Method |
| 1442 | mathematics | 25 | `math.alg.system-3var` | Systems of 3 Equations in 3 Variables |
| 1443 | mathematics | 25 | `math.alg.factoring` | Factoring Polynomials |
| 1444 | mathematics | 25 | `math.trig.half-angle-formulas` | Half Angle Formulas |
| 1445 | mathematics | 25 | `math.calc.trig-integrals` | Trigonometric Integrals |
| 1446 | mathematics | 25 | `math.de.bernoulli` | Bernoulli Equation |
| 1447 | mathematics | 25 | `math.de.homogeneous-ode` | Homogeneous First-Order ODE |
| 1448 | mathematics | 25 | `math.de.second-order-linear` | Second-Order Linear ODE |
| 1449 | mathematics | 25 | `math.de.laplace-transform` | Laplace Transform |
| 1450 | mathematics | 25 | `math.de.systems-ode` | Systems of ODEs |
| 1451 | mathematics | 25 | `math.de.bvp` | Boundary Value Problem |
| 1452 | mathematics | 25 | `math.linalg.linear-system` | System of Linear Equations |
| 1453 | mathematics | 25 | `math.linalg.change-of-basis` | Change of Basis |
| 1454 | mathematics | 25 | `math.linalg.spectral-theorem` | Spectral Theorem |
| 1455 | mathematics | 25 | `math.linalg.gram-schmidt` | Gram-Schmidt Process |
| 1456 | mathematics | 25 | `math.prob.clt` | Central Limit Theorem |
| 1457 | mathematics | 25 | `math.stats.correlation` | Sample Correlation |
| 1458 | mathematics | 25 | `math.cx.complex-function` | Complex-Valued Function |
| 1459 | mathematics | 25 | `math.fnal.hahn-banach` | Hahn-Banach Theorem |
| 1460 | mathematics | 25 | `math.fnal.closed-graph-theorem` | Closed Graph Theorem |
| 1461 | mathematics | 25 | `math.fnal.compact-operator-spectrum` | Compact Operators |
| 1462 | mathematics | 25 | `math.fnal.distributions` | Distributions |
| 1463 | mathematics | 25 | `math.num.euler-method` | Euler's Method (Numerical ODE) |
| 1464 | mathematics | 25 | `math.opt.kkt` | KKT Conditions |
| 1465 | english | 25 | `eng.writing.drafting` | Drafting |
| 1466 | english | 25 | `eng.literature.novel-study` | Novel Study |
| 1467 | english | 25 | `eng.literature.literary-criticism-intro` | Introduction to Literary Criticism |
| 1468 | english | 25 | `eng.linguistics.discourse-analysis-intro` | Introduction to Discourse Analysis |
| 1469 | english | 25 | `eng.linguistics.sociolinguistics-intro` | Introduction to Sociolinguistics |
| 1470 | mathematics | 26 | `math.nt.algebraic-integers` | Algebraic Integers |
| 1471 | mathematics | 26 | `math.alg.factoring-gcf` | Factoring out the GCF |
| 1472 | mathematics | 26 | `math.alg.factoring-special` | Special Factoring Patterns |
| 1473 | mathematics | 26 | `math.alg.rational-expressions` | Rational Expressions |
| 1474 | mathematics | 26 | `math.calc.trig-substitution` | Trigonometric Substitution |
| 1475 | mathematics | 26 | `math.de.second-order-homogeneous` | Homogeneous Second-Order Linear ODE |
| 1476 | mathematics | 26 | `math.de.laplace-properties` | Laplace Transform Properties |
| 1477 | mathematics | 26 | `math.de.convolution-theorem` | Convolution Theorem (Laplace) |
| 1478 | mathematics | 26 | `math.de.phase-plane` | Phase Plane Analysis |
| 1479 | mathematics | 26 | `math.de.series-solution` | Series Solution of ODEs |
| 1480 | mathematics | 26 | `math.de.sturm-liouville` | Sturm-Liouville Theory |
| 1481 | mathematics | 26 | `math.de.fourier-series` | Fourier Series |
| 1482 | mathematics | 26 | `math.linalg.augmented-matrix` | Augmented Matrix |
| 1483 | mathematics | 26 | `math.linalg.positive-definite` | Positive Definite Matrix |
| 1484 | mathematics | 26 | `math.linalg.qr-factorization` | QR Factorization |
| 1485 | mathematics | 26 | `math.stats.sampling-distribution` | Sampling Distribution |
| 1486 | mathematics | 26 | `math.stats.linear-regression` | Simple Linear Regression |
| 1487 | mathematics | 26 | `math.stats.normal-approximation` | Normal Approximation |
| 1488 | mathematics | 26 | `math.cx.cauchy-riemann` | Cauchy-Riemann Equations |
| 1489 | mathematics | 26 | `math.num.interpolation` | Polynomial Interpolation |
| 1490 | mathematics | 26 | `math.num.iterative-linear` | Iterative Methods for Linear Systems |
| 1491 | mathematics | 26 | `math.num.runge-kutta` | Runge-Kutta Methods |
| 1492 | mathematics | 26 | `math.opt.linear-programming` | Linear Programming |
| 1493 | english | 26 | `eng.writing.revising-for-content` | Revising for Content |
| 1494 | english | 26 | `eng.literature.comparative-literature-intro` | Introduction to Comparative Literature |
| 1495 | english | 26 | `eng.linguistics.applied-linguistics-intro` | Introduction to Applied Linguistics |
| 1496 | english | 26 | `eng.linguistics.dialectology` | Dialectology |
| 1497 | english | 26 | `eng.linguistics.corpus-linguistics-intro` | Introduction to Corpus Linguistics |
| 1498 | english | 26 | `eng.communication.discourse-markers-advanced` | Advanced Discourse Markers |
| 1499 | english | 26 | `eng.communication.cross-cultural-communication` | Cross-Cultural Communication |
| 1500 | mathematics | 27 | `math.nt.number-fields` | Number Fields |
| 1501 | mathematics | 27 | `math.alg.factoring-trinomials` | Factoring Trinomials |
| 1502 | mathematics | 27 | `math.alg.rational-expressions-addition` | Addition of Rational Expressions |
| 1503 | mathematics | 27 | `math.alg.rational-expressions-multiplication` | Multiplication of Rational Expressions |
| 1504 | mathematics | 27 | `math.alg.rational-equations` | Rational Equations |
| 1505 | mathematics | 27 | `math.de.wronskian` | Wronskian |
| 1506 | mathematics | 27 | `math.de.stability-analysis` | Stability Analysis |
| 1507 | mathematics | 27 | `math.de.frobenius-method` | Frobenius Method |
| 1508 | mathematics | 27 | `math.de.legendre-equation` | Legendre's Equation |
| 1509 | mathematics | 27 | `math.de.eigenfunction-expansion` | Eigenfunction Expansion |
| 1510 | mathematics | 27 | `math.de.fourier-convergence` | Convergence of Fourier Series |
| 1511 | mathematics | 27 | `math.de.fourier-sine-cosine` | Fourier Sine and Cosine Series |
| 1512 | mathematics | 27 | `math.de.fourier-transform` | Fourier Transform |
| 1513 | mathematics | 27 | `math.de.separation-of-variables-pde` | Separation of Variables (PDE) |
| 1514 | mathematics | 27 | `math.linalg.row-reduction` | Row Reduction |
| 1515 | mathematics | 27 | `math.linalg.svd` | Singular Value Decomposition |
| 1516 | mathematics | 27 | `math.stats.standard-error` | Standard Error |
| 1517 | mathematics | 27 | `math.stats.estimator` | Estimator |
| 1518 | mathematics | 27 | `math.stats.confidence-interval` | Confidence Interval |
| 1519 | mathematics | 27 | `math.stats.hypothesis-testing` | Hypothesis Testing |
| 1520 | mathematics | 27 | `math.stats.multiple-regression` | Multiple Linear Regression |
| 1521 | mathematics | 27 | `math.cx.analytic-functions` | Analytic (Holomorphic) Functions |
| 1522 | mathematics | 27 | `math.num.splines` | Spline Interpolation |
| 1523 | mathematics | 27 | `math.num.numerical-integration` | Numerical Integration |
| 1524 | mathematics | 27 | `math.num.qr-algorithm` | QR Algorithm |
| 1525 | mathematics | 27 | `math.num.stiff-ode` | Stiff ODEs and Implicit Methods |
| 1526 | mathematics | 27 | `math.opt.quadratic-programming` | Quadratic Programming |
| 1527 | mathematics | 27 | `math.opt.semidefinite-programming` | Semidefinite Programming |
| 1528 | mathematics | 27 | `math.opt.integer-programming` | Integer Programming |
| 1529 | english | 27 | `eng.writing.editing-and-proofreading` | Editing and Proofreading |
| 1530 | english | 27 | `eng.linguistics.bilingualism-and-multilingualism` | Bilingualism and Multilingualism |
| 1531 | english | 27 | `eng.linguistics.computational-linguistics-intro` | Introduction to Computational Linguistics |
| 1532 | mathematics | 28 | `math.alg.quadratic-equation` | Quadratic Equation |
| 1533 | mathematics | 28 | `math.de.variation-of-parameters` | Variation of Parameters |
| 1534 | mathematics | 28 | `math.de.bessel-equation` | Bessel's Equation |
| 1535 | mathematics | 28 | `math.de.heat-equation` | Heat Equation |
| 1536 | mathematics | 28 | `math.de.wave-equation` | Wave Equation |
| 1537 | mathematics | 28 | `math.de.laplace-equation` | Laplace's Equation |
| 1538 | mathematics | 28 | `math.de.nonlinear-ode` | Nonlinear ODE |
| 1539 | mathematics | 28 | `math.linalg.row-echelon` | Row Echelon Form |
| 1540 | mathematics | 28 | `math.linalg.lu-factorization` | LU Factorization |
| 1541 | mathematics | 28 | `math.linalg.singular-values` | Singular Values |
| 1542 | mathematics | 28 | `math.linalg.pseudoinverse` | Moore-Penrose Pseudoinverse |
| 1543 | mathematics | 28 | `math.prob.characteristic-function` | Characteristic Function |
| 1544 | mathematics | 28 | `math.stats.bias-variance` | Bias-Variance Tradeoff |
| 1545 | mathematics | 28 | `math.stats.consistency` | Consistency of Estimators |
| 1546 | mathematics | 28 | `math.stats.mle` | Maximum Likelihood Estimation |
| 1547 | mathematics | 28 | `math.stats.method-of-moments` | Method of Moments |
| 1548 | mathematics | 28 | `math.stats.ci-mean` | Confidence Interval for a Mean |
| 1549 | mathematics | 28 | `math.stats.ci-proportion` | Confidence Interval for a Proportion |
| 1550 | mathematics | 28 | `math.stats.test-statistic` | Test Statistic |
| 1551 | mathematics | 28 | `math.stats.type-errors` | Type I and Type II Errors |
| 1552 | mathematics | 28 | `math.stats.z-test` | z-Test |
| 1553 | mathematics | 28 | `math.stats.t-test` | t-Test |
| 1554 | mathematics | 28 | `math.stats.chi-squared-test` | Chi-Squared Test |
| 1555 | mathematics | 28 | `math.stats.anova` | Analysis of Variance |
| 1556 | mathematics | 28 | `math.stats.nonparametric` | Nonparametric Tests |
| 1557 | mathematics | 28 | `math.stats.sufficient-statistic` | Sufficient Statistic |
| 1558 | mathematics | 28 | `math.cx.power-series-cx` | Power Series in ℂ |
| 1559 | mathematics | 28 | `math.cx.complex-integration` | Complex Line Integral |
| 1560 | mathematics | 28 | `math.cx.singularities` | Singularities |
| 1561 | mathematics | 28 | `math.cx.conformal-mapping` | Conformal Mapping |
| 1562 | mathematics | 28 | `math.num.svd` | SVD (Numerical) |
| 1563 | mathematics | 28 | `math.opt.pca` | Principal Component Analysis |
| 1564 | english | 28 | `eng.writing.essay-structure` | Essay Structure |
| 1565 | english | 28 | `eng.linguistics.translation-studies-intro` | Introduction to Translation Studies |
| 1566 | mathematics | 29 | `math.nt.prime-number-theorem` | Prime Number Theorem |
| 1567 | mathematics | 29 | `math.alg.completing-the-square` | Completing the Square |
| 1568 | mathematics | 29 | `math.alg.polynomial-roots` | Polynomial Roots (Real and Complex) |
| 1569 | mathematics | 29 | `math.geom.conic-sections` | Conic Sections |
| 1570 | mathematics | 29 | `math.func.quadratic-function` | Quadratic Function |
| 1571 | mathematics | 29 | `math.de.harmonic-functions` | Harmonic Functions |
| 1572 | mathematics | 29 | `math.de.poisson-equation` | Poisson's Equation |
| 1573 | mathematics | 29 | `math.de.bifurcation` | Bifurcation Theory |
| 1574 | mathematics | 29 | `math.linalg.rank` | Rank |
| 1575 | mathematics | 29 | `math.linalg.null-space` | Null Space |
| 1576 | mathematics | 29 | `math.linalg.cholesky` | Cholesky Decomposition |
| 1577 | mathematics | 29 | `math.stats.p-value` | p-value |
| 1578 | mathematics | 29 | `math.stats.power` | Power of a Test |
| 1579 | mathematics | 29 | `math.stats.two-way-anova` | Two-Way ANOVA |
| 1580 | mathematics | 29 | `math.stats.bayesian-inference` | Bayesian Statistics |
| 1581 | mathematics | 29 | `math.stats.experimental-design` | Experimental Design |
| 1582 | mathematics | 29 | `math.stats.rao-blackwell` | Rao-Blackwell Theorem |
| 1583 | mathematics | 29 | `math.cx.harmonic-functions` | Harmonic Functions (Complex Analysis) |
| 1584 | mathematics | 29 | `math.cx.cauchy-theorem` | Cauchy's Theorem |
| 1585 | mathematics | 29 | `math.cx.identity-theorem` | Identity Theorem |
| 1586 | mathematics | 29 | `math.cx.poles` | Poles and Meromorphic Functions |
| 1587 | mathematics | 29 | `math.cx.essential-singularity` | Essential Singularity |
| 1588 | mathematics | 29 | `math.cx.laurent-series` | Laurent Series |
| 1589 | mathematics | 29 | `math.cx.mobius-transformation` | Möbius Transformation |
| 1590 | mathematics | 29 | `math.cx.riemann-mapping` | Riemann Mapping Theorem |
| 1591 | mathematics | 29 | `math.fnal.special-functions` | Special Functions |
| 1592 | mathematics | 29 | `math.num.lu-factorization` | LU Factorization (Numerical) |
| 1593 | english | 29 | `eng.writing.thesis-statements` | Thesis Statements |
| 1594 | english | 29 | `eng.composition.audience-and-purpose` | Audience and Purpose |
| 1595 | mathematics | 30 | `math.alg.quadratic-formula` | Quadratic Formula |
| 1596 | mathematics | 30 | `math.alg.rational-root-theorem` | Rational Root Theorem |
| 1597 | mathematics | 30 | `math.alg.fundamental-theorem-algebra` | Fundamental Theorem of Algebra |
| 1598 | mathematics | 30 | `math.alg.polynomial-inequality` | Polynomial Inequality |
| 1599 | mathematics | 30 | `math.alg.vietas-formulas` | Vieta's Formulas |
| 1600 | mathematics | 30 | `math.geom.parabola` | Parabola |
| 1601 | mathematics | 30 | `math.geom.ellipse` | Ellipse |
| 1602 | mathematics | 30 | `math.geom.hyperbola` | Hyperbola |
| 1603 | mathematics | 30 | `math.func.vertex-form` | Vertex Form of a Quadratic |
| 1604 | mathematics | 30 | `math.func.polynomial-function` | Polynomial Function |
| 1605 | mathematics | 30 | `math.calc.partial-fractions` | Partial Fraction Decomposition |
| 1606 | mathematics | 30 | `math.de.higher-order-ode` | Higher-Order Linear ODE |
| 1607 | mathematics | 30 | `math.de.greens-function` | Green's Function |
| 1608 | mathematics | 30 | `math.de.chaos` | Chaotic Dynamics |
| 1609 | mathematics | 30 | `math.linalg.rank-nullity` | Rank-Nullity Theorem |
| 1610 | mathematics | 30 | `math.linalg.eigenspace` | Eigenspace |
| 1611 | mathematics | 30 | `math.stats.conjugate-prior` | Conjugate Prior |
| 1612 | mathematics | 30 | `math.stats.credible-interval` | Credible Interval |
| 1613 | mathematics | 30 | `math.disc.linear-recurrence` | Linear Recurrence |
| 1614 | mathematics | 30 | `math.cx.cauchy-goursat` | Cauchy-Goursat Theorem |
| 1615 | mathematics | 30 | `math.cx.cauchy-integral-formula` | Cauchy Integral Formula |
| 1616 | mathematics | 30 | `math.cx.analytic-continuation` | Analytic Continuation |
| 1617 | mathematics | 30 | `math.cx.residue` | Residue |
| 1618 | mathematics | 30 | `math.num.cholesky` | Cholesky Factorization (Numerical) |
| 1619 | english | 30 | `eng.writing.citations-and-referencing` | Citations and Referencing |
| 1620 | english | 30 | `eng.composition.claim-evidence-reasoning` | Claim, Evidence, and Reasoning |
| 1621 | english | 30 | `eng.composition.rhetorical-appeals` | Rhetorical Appeals: Ethos, Pathos, Logos |
| 1622 | mathematics | 31 | `math.alg.discriminant` | Discriminant |
| 1623 | mathematics | 31 | `math.alg.complex-polynomial-roots` | Complex Roots of Polynomials |
| 1624 | mathematics | 31 | `math.alg.rational-inequality` | Rational Inequality |
| 1625 | mathematics | 31 | `math.func.end-behavior` | End Behavior |
| 1626 | mathematics | 31 | `math.func.rational-root` | Real Roots of Polynomials |
| 1627 | mathematics | 31 | `math.func.rational-function` | Rational Function |
| 1628 | mathematics | 31 | `math.de.char-equation` | Characteristic Equation |
| 1629 | mathematics | 31 | `math.de.inverse-laplace` | Inverse Laplace Transform |
| 1630 | mathematics | 31 | `math.linalg.diagonalization` | Diagonalization |
| 1631 | mathematics | 31 | `math.cx.higher-derivatives` | Derivatives of Holomorphic Functions |
| 1632 | mathematics | 31 | `math.cx.morera-theorem` | Morera's Theorem |
| 1633 | mathematics | 31 | `math.cx.residue-theorem` | Residue Theorem |
| 1634 | mathematics | 31 | `math.cx.maximum-modulus` | Maximum Modulus Principle |
| 1635 | mathematics | 31 | `math.cx.riemann-surface` | Riemann Surface |
| 1636 | mathematics | 31 | `math.cx.riemann-zeta` | Riemann Zeta Function |
| 1637 | english | 31 | `eng.composition.argumentation-basics` | Argumentation Basics |
| 1638 | english | 31 | `eng.composition.rhetorical-devices` | Rhetorical Devices |
| 1639 | mathematics | 32 | `math.nt.riemann-hypothesis` | Riemann Hypothesis |
| 1640 | mathematics | 32 | `math.func.vertical-asymptote` | Vertical Asymptote |
| 1641 | mathematics | 32 | `math.func.horizontal-asymptote` | Horizontal Asymptote |
| 1642 | mathematics | 32 | `math.de.undetermined-coefficients` | Method of Undetermined Coefficients |
| 1643 | mathematics | 32 | `math.de.laplace-ode` | Solving ODEs with Laplace Transform |
| 1644 | mathematics | 32 | `math.de.systems-matrix-method` | Matrix Method for Linear Systems |
| 1645 | mathematics | 32 | `math.linalg.matrix-exponential` | Matrix Exponential |
| 1646 | mathematics | 32 | `math.linalg.jordan-form` | Jordan Normal Form |
| 1647 | mathematics | 32 | `math.cx.liouville-theorem` | Liouville's Theorem |
| 1648 | mathematics | 32 | `math.cx.real-integral-residues` | Evaluating Real Integrals via Residues |
| 1649 | mathematics | 32 | `math.cx.argument-principle` | Argument Principle |
| 1650 | english | 32 | `eng.composition.counterargument-and-rebuttal` | Counterargument and Rebuttal |
| 1651 | english | 32 | `eng.composition.logical-fallacies` | Logical Fallacies |
| 1652 | english | 32 | `eng.composition.figurative-language-in-composition` | Figurative Language in Composition |
| 1653 | english | 32 | `eng.composition.rhetorical-analysis` | Rhetorical Analysis |
| 1654 | mathematics | 33 | `math.de.harmonic-oscillator` | Harmonic Oscillator |
| 1655 | mathematics | 33 | `math.cx.fundamental-theorem-algebra` | Fundamental Theorem of Algebra (Complex Analysis) |
| 1656 | mathematics | 33 | `math.cx.rouche-theorem` | Rouché's Theorem |
| 1657 | english | 33 | `eng.composition.style-voice-and-tone` | Style, Voice, and Tone |
| 1658 | english | 33 | `eng.composition.persuasive-techniques` | Advanced Persuasive Techniques |
| 1659 | english | 33 | `eng.composition.comparative-essay-writing` | Comparative Essay Writing |
| 1660 | english | 33 | `eng.composition.research-paper-writing` | Research Paper Writing |
| 1661 | mathematics | 34 | `math.de.resonance` | Resonance |
| 1662 | english | 34 | `eng.composition.academic-writing-conventions` | Academic Writing Conventions |
| 1663 | english | 35 | `eng.composition.plagiarism-and-citation-ethics` | Plagiarism and Citation Ethics |
| 1664 | english | 35 | `eng.composition.editing-for-style` | Editing for Style |
| 1665 | english | 35 | `eng.communication.academic-writing-advanced` | Advanced Academic Writing |
| 1666 | english | 36 | `eng.communication.research-methodology-writing` | Writing Research Methodology |
| 1667 | english | 36 | `eng.communication.technical-writing` | Technical Writing |
| 1668 | english | 36 | `eng.communication.business-writing` | Business Writing |
| 1669 | english | 37 | `eng.communication.professional-communication` | Professional Communication |
| 1670 | english | 37 | `eng.communication.presentation-design` | Presentation Design |
| 1671 | english | 37 | `eng.communication.editing-for-publication` | Editing for Publication |
| 1672 | english | 38 | `eng.communication.negotiation-language` | Negotiation Language |
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

Total queued: **1685** (= 1,756 KG concepts − 71 already `READY`).

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

"Max level" is the longest prerequisite chain in that subject (e.g.
mathematics has concepts 34 layers deep before reaching a terminal node —
consistent with it also being the largest and structurally deepest
subject). English shows 2 roots by design (its two independent
zero-prerequisite entry points, both already `READY`).

## The queue

| Priority | Subject | Level | KG ID | Concept Name |
|---|---|---|---|---|
| 1 | mathematics | 0 | `math.found.mathematical-thinking` | Mathematical Thinking |
| 2 | chemistry | 0 | `chem.found.matter` | Nature of Matter |
| 3 | biology | 0 | `bio.found.what-is-biology` | What is Biology |
| 4 | computer_science | 0 | `cs.found.intro-computers` | Introduction to Computers |
| 5 | mathematics | 1 | `math.found.abstraction` | Abstraction |
| 6 | mathematics | 1 | `math.found.pattern-recognition` | Pattern Recognition |
| 7 | mathematics | 1 | `math.found.problem-solving` | Mathematical Problem Solving |
| 8 | mathematics | 1 | `math.found.mathematical-language` | Mathematical Language |
| 9 | mathematics | 1 | `math.geom.point` | Point |
| 10 | english | 1 | `eng.phonics.alphabet-recognition` | Alphabet Recognition |
| 11 | english | 1 | `eng.phonics.rhyming` | Rhyming |
| 12 | english | 1 | `eng.phonetics.speech-sounds-overview` | Overview of Speech Sounds |
| 13 | chemistry | 1 | `chem.found.states-of-matter` | States of Matter |
| 14 | chemistry | 1 | `chem.found.pure-substances` | Pure Substances and Mixtures |
| 15 | chemistry | 1 | `chem.found.measurement` | Physical Quantities and SI Units |
| 16 | chemistry | 1 | `chem.atomic.atomic-theory` | Atomic Theory |
| 17 | biology | 1 | `bio.found.characteristics-of-life` | Characteristics of Living Organisms |
| 18 | computer_science | 1 | `cs.found.computer-organisation` | Computer Organisation |
| 19 | computer_science | 1 | `cs.found.number-systems` | Number Systems |
| 20 | computer_science | 1 | `cs.found.software-concepts` | Software Concepts |
| 21 | computer_science | 1 | `cs.algo.problem-solving` | Problem Solving Methodology |
| 22 | computer_science | 1 | `cs.sec.cyber-ethics-safety` | Cyber Ethics and Online Safety |
| 23 | mathematics | 2 | `math.found.problem-solving-strategies` | Problem-Solving Strategies |
| 24 | mathematics | 2 | `math.found.mathematical-modeling` | Mathematical Modeling |
| 25 | mathematics | 2 | `math.found.generalization` | Generalization |
| 26 | mathematics | 2 | `math.found.mathematical-notation` | Mathematical Notation |
| 27 | mathematics | 2 | `math.found.mathematical-symbols` | Mathematical Symbols |
| 28 | mathematics | 2 | `math.found.logic` | Mathematical Logic |
| 29 | mathematics | 2 | `math.found.definition` | Mathematical Definition |
| 30 | mathematics | 2 | `math.found.inductive-reasoning` | Inductive Reasoning |
| 31 | mathematics | 2 | `math.geom.line` | Line |
| 32 | english | 2 | `eng.phonics.blending-segmenting` | Blending and Segmenting |
| 33 | english | 2 | `eng.phonetics.articulation-organs` | Organs of Articulation |
| 34 | english | 2 | `eng.writing.handwriting-and-formation` | Handwriting and Letter Formation |
| 35 | chemistry | 2 | `chem.found.significant-figures` | Significant Figures and Error Analysis |
| 36 | chemistry | 2 | `chem.found.mole-concept` | Mole Concept and Avogadro's Number |
| 37 | chemistry | 2 | `chem.atomic.subatomic-particles` | Subatomic Particles |
| 38 | chemistry | 2 | `chem.atomic.electromagnetic-radiation` | Electromagnetic Radiation |
| 39 | chemistry | 2 | `chem.state.kinetic-theory` | Kinetic Molecular Theory of Gases |
| 40 | chemistry | 2 | `chem.thermo.system` | System, Surroundings and State Functions |
| 41 | chemistry | 2 | `chem.elect.conductance` | Electrolytic Conductance |
| 42 | chemistry | 2 | `chem.surface.colloids` | Colloids |
| 43 | chemistry | 2 | `chem.env.atmosphere` | Atmosphere and Composition |
| 44 | biology | 2 | `bio.found.classification-need` | Need for Classification |
| 45 | biology | 2 | `bio.found.microscopy-basics` | Microscopy and Laboratory Techniques |
| 46 | biology | 2 | `bio.found.biomes-levels-of-organisation` | Levels of Biological Organisation |
| 47 | computer_science | 2 | `cs.found.boolean-logic` | Boolean Logic and Logic Gates |
| 48 | computer_science | 2 | `cs.found.memory-storage` | Memory and Storage Systems |
| 49 | computer_science | 2 | `cs.found.os-concepts` | Operating System Fundamentals |
| 50 | computer_science | 2 | `cs.algo.algorithms` | Algorithms |
| 51 | computer_science | 2 | `cs.net.networking-basics` | Networking Basics |
| 52 | mathematics | 3 | `math.found.variable` | Variable |
| 53 | mathematics | 3 | `math.found.reading-mathematics` | Reading Mathematics |
| 54 | mathematics | 3 | `math.found.proposition` | Proposition |
| 55 | mathematics | 3 | `math.found.axiom` | Axiom |
| 56 | mathematics | 3 | `math.found.set-theory` | Set Theory |
| 57 | mathematics | 3 | `math.found.deductive-reasoning` | Deductive Reasoning |
| 58 | mathematics | 3 | `math.geom.line-segment` | Line Segment |
| 59 | mathematics | 3 | `math.geom.ray` | Ray |
| 60 | mathematics | 3 | `math.geom.plane` | Plane |
| 61 | english | 3 | `eng.phonetics.consonant-sounds` | Consonant Phoneme Classification |
| 62 | english | 3 | `eng.phonetics.vowel-sounds` | Vowel Phoneme Classification |
| 63 | chemistry | 3 | `chem.found.stoichiometry` | Stoichiometry |
| 64 | chemistry | 3 | `chem.found.concentration` | Concentration Units |
| 65 | chemistry | 3 | `chem.atomic.atomic-spectra` | Atomic Spectra |
| 66 | chemistry | 3 | `chem.atomic.photoelectric-effect` | Photoelectric Effect and Dual Nature |
| 67 | chemistry | 3 | `chem.period.classification` | Early Classification of Elements |
| 68 | chemistry | 3 | `chem.state.gas-laws` | Gas Laws |
| 69 | chemistry | 3 | `chem.thermo.first-law` | First Law of Thermodynamics |
| 70 | chemistry | 3 | `chem.surface.emulsions` | Emulsions and Gels |
| 71 | chemistry | 3 | `chem.env.air-pollution` | Air Pollution |
| 72 | chemistry | 3 | `chem.env.water-soil` | Water and Soil Pollution |
| 73 | biology | 3 | `bio.found.five-kingdom` | Five Kingdom Classification |
| 74 | biology | 3 | `bio.found.binomial-nomenclature` | Binomial Nomenclature |
| 75 | biology | 3 | `bio.cell.cell-theory` | Cell Theory |
| 76 | biology | 3 | `bio.eco.organism-environment` | Organisms and their Environment |
| 77 | computer_science | 3 | `cs.found.cpu-architecture` | CPU Architecture and Instruction Sets |
| 78 | computer_science | 3 | `cs.algo.flowcharts` | Flowcharts and Pseudocode |
| 79 | computer_science | 3 | `cs.algo.asymptotic-notation` | Asymptotic Notation |
| 80 | computer_science | 3 | `cs.os.process-management` | Process Management |
| 81 | computer_science | 3 | `cs.net.osi-tcp-ip-models` | OSI and TCP/IP Reference Models |
| 82 | computer_science | 3 | `cs.sec.cryptography-basics` | Cryptography Fundamentals |
| 83 | mathematics | 4 | `math.found.logical-connectives` | Logical Connectives |
| 84 | mathematics | 4 | `math.found.predicate` | Predicate |
| 85 | mathematics | 4 | `math.found.axiomatic-system` | Axiomatic System |
| 86 | mathematics | 4 | `math.found.set` | Set |
| 87 | mathematics | 4 | `math.geom.angle` | Angle |
| 88 | mathematics | 4 | `math.geom.perimeter` | Perimeter |
| 89 | mathematics | 4 | `math.geom.circle` | Circle |
| 90 | mathematics | 4 | `math.geom.length` | Length |
| 91 | mathematics | 4 | `math.prob.sample-space` | Sample Space |
| 92 | mathematics | 4 | `math.disc.graph` | Graph |
| 93 | mathematics | 4 | `math.abst.algebraic-structure` | Algebraic Structure |
| 94 | mathematics | 4 | `math.top.topological-space` | Topological Space |
| 95 | mathematics | 4 | `math.meas.sigma-algebra` | σ-Algebra |
| 96 | mathematics | 4 | `math.graph.graph` | Graph |
| 97 | english | 4 | `eng.phonics.consonants` | Consonant Sounds |
| 98 | english | 4 | `eng.phonics.short-vowels` | Short Vowel Sounds |
| 99 | english | 4 | `eng.phonics.sight-words` | High-Frequency Sight Words |
| 100 | english | 4 | `eng.phonetics.ipa-basics` | IPA Basics for English |
| 101 | chemistry | 4 | `chem.atomic.bohr-model` | Bohr Model of the Atom |
| 102 | chemistry | 4 | `chem.state.molar-mass-gas` | Molar Mass from Gas Data |
| 103 | chemistry | 4 | `chem.state.real-gases` | Real Gases and van der Waals Equation |
| 104 | chemistry | 4 | `chem.sol.types` | Types of Solutions |
| 105 | chemistry | 4 | `chem.thermo.enthalpy` | Enthalpy and Hess's Law |
| 106 | chemistry | 4 | `chem.thermo.entropy` | Entropy and Second Law |
| 107 | chemistry | 4 | `chem.thermo.heat-capacities` | Heat Capacities of Gases |
| 108 | chemistry | 4 | `chem.kinet.rate` | Rate of Reaction |
| 109 | biology | 4 | `bio.found.viruses-viroids-lichens` | Viruses, Viroids and Lichens |
| 110 | biology | 4 | `bio.cell.prokaryotic-cell` | Prokaryotic Cell Structure |
| 111 | biology | 4 | `bio.cell.eukaryotic-cell` | Eukaryotic Cell Structure |
| 112 | biology | 4 | `bio.eco.population-ecology` | Population Ecology |
| 113 | computer_science | 4 | `cs.found.pipelining-cache` | Pipelining and Cache Memory |
| 114 | computer_science | 4 | `cs.algo.time-space-complexity` | Time and Space Complexity Analysis |
| 115 | computer_science | 4 | `cs.prog.intro-programming` | Introduction to Programming |
| 116 | computer_science | 4 | `cs.os.threads-concurrency` | Threads and Concurrency |
| 117 | computer_science | 4 | `cs.os.cpu-scheduling` | CPU Scheduling Algorithms |
| 118 | computer_science | 4 | `cs.os.memory-management-os` | Memory Management |
| 119 | computer_science | 4 | `cs.net.ip-addressing` | IP Addressing and Subnetting |
| 120 | computer_science | 4 | `cs.net.tcp-udp-transport` | TCP and UDP — Transport Layer |
| 121 | computer_science | 4 | `cs.theory.finite-automata` | Finite Automata |
| 122 | mathematics | 5 | `math.found.truth-table` | Truth Table |
| 123 | mathematics | 5 | `math.found.predicate-logic` | Predicate Logic |
| 124 | mathematics | 5 | `math.found.set-membership` | Set Membership |
| 125 | mathematics | 5 | `math.found.empty-set` | Empty Set |
| 126 | mathematics | 5 | `math.found.set-builder-notation` | Set-Builder Notation |
| 127 | mathematics | 5 | `math.found.cartesian-product` | Cartesian Product |
| 128 | mathematics | 5 | `math.found.ordered-pair` | Ordered Pair |
| 129 | mathematics | 5 | `math.found.set-theory-axiomatic` | Axiomatic Set Theory |
| 130 | mathematics | 5 | `math.geom.angle-types` | Types of Angles |
| 131 | mathematics | 5 | `math.geom.angle-measurement` | Angle Measurement |
| 132 | mathematics | 5 | `math.geom.angle-pairs` | Angle Pairs |
| 133 | mathematics | 5 | `math.geom.perpendicular-lines` | Perpendicular Lines |
| 134 | mathematics | 5 | `math.geom.triangle` | Triangle |
| 135 | mathematics | 5 | `math.geom.circle-parts` | Parts of a Circle |
| 136 | mathematics | 5 | `math.geom.circle-circumference` | Circumference of a Circle |
| 137 | mathematics | 5 | `math.prob.event` | Event |
| 138 | mathematics | 5 | `math.disc.graph-types` | Types of Graphs |
| 139 | mathematics | 5 | `math.disc.graph-connectivity` | Graph Connectivity |
| 140 | mathematics | 5 | `math.disc.graph-coloring` | Graph Coloring |
| 141 | mathematics | 5 | `math.disc.planar-graph` | Planar Graph |
| 142 | mathematics | 5 | `math.disc.propositional-logic` | Propositional Logic |
| 143 | mathematics | 5 | `math.top.open-sets` | Open and Closed Sets (Topology) |
| 144 | mathematics | 5 | `math.top.basis` | Basis for a Topology |
| 145 | mathematics | 5 | `math.top.continuity-top` | Continuity (Topology) |
| 146 | mathematics | 5 | `math.top.compactness` | Compactness (Topology) |
| 147 | mathematics | 5 | `math.top.connectedness` | Connectedness (Topology) |
| 148 | mathematics | 5 | `math.top.separation-axioms` | Separation Axioms |
| 149 | mathematics | 5 | `math.top.product-space` | Product Topology |
| 150 | mathematics | 5 | `math.top.simplicial-complex` | Simplicial Complex |
| 151 | mathematics | 5 | `math.meas.measure` | Measure |
| 152 | mathematics | 5 | `math.meas.measurable-function` | Measurable Function |
| 153 | mathematics | 5 | `math.graph.graph-invariants` | Graph Invariants |
| 154 | mathematics | 5 | `math.graph.graph-operations` | Graph Operations |
| 155 | mathematics | 5 | `math.graph.matching` | Matching |
| 156 | english | 5 | `eng.phonics.consonant-blends` | Consonant Blends |
| 157 | english | 5 | `eng.phonics.long-vowels-silent-e` | Long Vowels and Silent E |
| 158 | english | 5 | `eng.phonetics.minimal-pairs` | Minimal Pairs |
| 159 | english | 5 | `eng.phonetics.syllable-stress` | Word Stress |
| 160 | chemistry | 5 | `chem.atomic.quantum-numbers` | Quantum Numbers |
| 161 | chemistry | 5 | `chem.sol.solubility` | Solubility and Henry's Law |
| 162 | chemistry | 5 | `chem.thermo.gibbs` | Gibbs Free Energy and Spontaneity |
| 163 | chemistry | 5 | `chem.thermo.third-law` | Third Law and Absolute Entropy |
| 164 | chemistry | 5 | `chem.kinet.rate-law` | Rate Law and Order |
| 165 | chemistry | 5 | `chem.kinet.photochemistry` | Photochemical Reactions |
| 166 | biology | 5 | `bio.cell.cell-membrane-transport` | Cell Membrane and Transport |
| 167 | biology | 5 | `bio.cell.nucleus-chromosomes` | Nucleus and Chromosomes |
| 168 | biology | 5 | `bio.cell.mitochondria-energy` | Mitochondria and Energy Organelles |
| 169 | biology | 5 | `bio.cell.chloroplast-structure` | Chloroplast Structure |
| 170 | biology | 5 | `bio.cell.endomembrane-system` | Endomembrane System |
| 171 | biology | 5 | `bio.mol.biomolecule-types` | Types of Biomolecules |
| 172 | biology | 5 | `bio.eco.ecosystem-structure-function` | Ecosystem Structure and Function |
| 173 | biology | 5 | `bio.micro.microbial-diversity` | Microbial Diversity |
| 174 | computer_science | 5 | `cs.algo.divide-and-conquer` | Divide and Conquer |
| 175 | computer_science | 5 | `cs.algo.greedy-algorithms` | Greedy Algorithms |
| 176 | computer_science | 5 | `cs.prog.python-basics` | Python Language Basics |
| 177 | computer_science | 5 | `cs.os.synchronisation-deadlocks` | Synchronisation and Deadlocks |
| 178 | computer_science | 5 | `cs.os.virtual-memory` | Virtual Memory |
| 179 | computer_science | 5 | `cs.os.file-systems` | File Systems |
| 180 | computer_science | 5 | `cs.net.dns-dhcp` | DNS and DHCP |
| 181 | computer_science | 5 | `cs.net.routing-congestion` | Routing and Congestion Control |
| 182 | computer_science | 5 | `cs.theory.regular-expressions` | Regular Expressions and Regular Languages |
| 183 | mathematics | 6 | `math.found.quantifiers` | Quantifiers |
| 184 | mathematics | 6 | `math.found.logical-equivalence` | Logical Equivalence |
| 185 | mathematics | 6 | `math.found.subset` | Subset |
| 186 | mathematics | 6 | `math.found.relation` | Relation |
| 187 | mathematics | 6 | `math.found.ordinal-number` | Ordinal Number |
| 188 | mathematics | 6 | `math.geom.parallel-lines` | Parallel Lines |
| 189 | mathematics | 6 | `math.geom.triangle-types` | Types of Triangles |
| 190 | mathematics | 6 | `math.geom.right-triangle` | Right Triangle |
| 191 | mathematics | 6 | `math.geom.congruent-triangles` | Congruent Triangles |
| 192 | mathematics | 6 | `math.geom.area-triangle` | Area of a Triangle |
| 193 | mathematics | 6 | `math.geom.polygon` | Polygon |
| 194 | mathematics | 6 | `math.geom.circle-theorems` | Circle Theorems |
| 195 | mathematics | 6 | `math.geom.geometric-constructions` | Geometric Constructions |
| 196 | mathematics | 6 | `math.trig.angle-measure` | Angle Measure |
| 197 | mathematics | 6 | `math.prob.probability-measure` | Probability Measure |
| 198 | mathematics | 6 | `math.disc.euler-hamiltonian` | Euler and Hamiltonian Paths |
| 199 | mathematics | 6 | `math.disc.graph-trees` | Trees |
| 200 | mathematics | 6 | `math.disc.boolean-circuits` | Boolean Circuits and Logic Gates |
| 201 | mathematics | 6 | `math.disc.predicate-logic-disc` | Predicate Logic and Proof Methods |
| 202 | mathematics | 6 | `math.top.interior-closure` | Interior, Closure, and Boundary |
| 203 | mathematics | 6 | `math.top.homeomorphism` | Homeomorphism |
| 204 | mathematics | 6 | `math.top.tychonoff` | Tychonoff's Theorem |
| 205 | mathematics | 6 | `math.top.homotopy` | Homotopy |
| 206 | mathematics | 6 | `math.meas.lebesgue-measure` | Lebesgue Measure |
| 207 | mathematics | 6 | `math.meas.simple-function` | Simple Function |
| 208 | mathematics | 6 | `math.meas.abstract-measure-spaces` | Abstract Measure Spaces |
| 209 | mathematics | 6 | `math.graph.connectivity` | Connectivity |
| 210 | mathematics | 6 | `math.graph.graph-coloring` | Graph Coloring |
| 211 | physics | 6 | `phys.mech.universal-gravitation` | Newton's Law of Universal Gravitation |
| 212 | physics | 6 | `phys.mech.hookes-law` | Hooke's Law and Spring Force |
| 213 | physics | 6 | `phys.mech.pressure-fluids` | Pressure in Fluids |
| 214 | physics | 6 | `phys.wave.standing-waves` | Standing Waves |
| 215 | physics | 6 | `phys.wave.beats` | Beats and Beat Frequency |
| 216 | physics | 6 | `phys.opt.optical-instruments` | Optical Instruments: Eye, Microscope, Telescope |
| 217 | physics | 6 | `phys.opt.youngs-experiment` | Young's Double-Slit Experiment |
| 218 | physics | 6 | `phys.em.capacitance` | Capacitance and Capacitors |
| 219 | physics | 6 | `phys.em.ohms-law` | Ohm's Law and Resistance |
| 220 | physics | 6 | `phys.em.amperes-law` | Ampere's Circuital Law |
| 221 | physics | 6 | `phys.em.lenzs-law` | Lenz's Law and Induced EMF Direction |
| 222 | physics | 6 | `phys.em.self-inductance` | Self-Inductance |
| 223 | english | 6 | `eng.phonics.digraphs` | Consonant and Vowel Digraphs |
| 224 | english | 6 | `eng.phonetics.sentence-stress` | Sentence Stress |
| 225 | english | 6 | `eng.phonetics.phonetic-transcription` | Phonetic Transcription |
| 226 | chemistry | 6 | `chem.atomic.orbitals` | Atomic Orbitals |
| 227 | chemistry | 6 | `chem.thermo.cell-thermo` | Electrochemical Thermodynamics |
| 228 | chemistry | 6 | `chem.equil.concept` | Equilibrium Concept |
| 229 | chemistry | 6 | `chem.kinet.integrated-rate` | Integrated Rate Laws |
| 230 | chemistry | 6 | `chem.kinet.arrhenius` | Arrhenius Equation |
| 231 | chemistry | 6 | `chem.kinet.mechanism` | Reaction Mechanisms |
| 232 | chemistry | 6 | `chem.env.ozone` | Ozone Depletion |
| 233 | biology | 6 | `bio.cell.cytoskeleton` | Cytoskeleton and Cell Motility |
| 234 | biology | 6 | `bio.cell.cell-cycle` | The Cell Cycle |
| 235 | biology | 6 | `bio.cell.cell-signalling` | Cell Signalling |
| 236 | biology | 6 | `bio.mol.carbohydrates-lipids` | Carbohydrates and Lipids |
| 237 | biology | 6 | `bio.mol.proteins-structure` | Proteins and Protein Structure |
| 238 | biology | 6 | `bio.mol.nucleic-acid-structure` | Nucleic Acid Structure |
| 239 | biology | 6 | `bio.evo.origin-of-life` | Origin of Life |
| 240 | biology | 6 | `bio.physio.respiratory-system` | Human Respiratory System |
| 241 | biology | 6 | `bio.plant.plant-water-relations` | Plant Water Relations |
| 242 | biology | 6 | `bio.eco.nutrient-cycling` | Nutrient Cycling and Succession |
| 243 | biology | 6 | `bio.micro.microbial-growth-culture` | Microbial Growth and Culture Techniques |
| 244 | biology | 6 | `bio.micro.pathogenic-microbes` | Pathogenic Microorganisms and Disease |
| 245 | computer_science | 6 | `cs.algo.dynamic-programming` | Dynamic Programming |
| 246 | computer_science | 6 | `cs.prog.data-types-variables` | Data Types and Variables |
| 247 | computer_science | 6 | `cs.net.application-protocols` | Application-Layer Protocols |
| 248 | computer_science | 6 | `cs.net.wireless-mobile-networks` | Wireless and Mobile Networks |
| 249 | computer_science | 6 | `cs.theory.context-free-grammars` | Context-Free Grammars |
| 250 | mathematics | 7 | `math.found.rules-of-inference` | Rules of Inference |
| 251 | mathematics | 7 | `math.found.proper-subset` | Proper Subset |
| 252 | mathematics | 7 | `math.found.set-equality` | Set Equality |
| 253 | mathematics | 7 | `math.found.set-operations` | Set Operations |
| 254 | mathematics | 7 | `math.found.power-set` | Power Set |
| 255 | mathematics | 7 | `math.found.reflexive-relation` | Reflexive Relation |
| 256 | mathematics | 7 | `math.found.symmetric-relation` | Symmetric Relation |
| 257 | mathematics | 7 | `math.found.transitive-relation` | Transitive Relation |
| 258 | mathematics | 7 | `math.found.partition` | Partition |
| 259 | mathematics | 7 | `math.found.function-set-theoretic` | Function (Set-Theoretic) |
| 260 | mathematics | 7 | `math.found.cardinal-arithmetic` | Cardinal Arithmetic |
| 261 | mathematics | 7 | `math.geom.triangle-angle-sum` | Triangle Angle Sum Theorem |
| 262 | mathematics | 7 | `math.geom.triangle-centers` | Triangle Centers |
| 263 | mathematics | 7 | `math.geom.quadrilateral` | Quadrilateral |
| 264 | mathematics | 7 | `math.geom.regular-polygon` | Regular Polygon |
| 265 | mathematics | 7 | `math.geom.area-polygon` | Area of Polygons |
| 266 | mathematics | 7 | `math.geom.solid-3d` | Three-Dimensional Solids |
| 267 | mathematics | 7 | `math.trig.degree-radian-conversion` | Degree-Radian Conversion |
| 268 | mathematics | 7 | `math.prob.probability-axioms` | Axioms of Probability |
| 269 | mathematics | 7 | `math.disc.spanning-tree` | Spanning Tree |
| 270 | mathematics | 7 | `math.top.homotopy-equivalence` | Homotopy Equivalence |
| 271 | mathematics | 7 | `math.top.manifold` | Topological Manifold |
| 272 | mathematics | 7 | `math.meas.measure-zero` | Measure Zero |
| 273 | mathematics | 7 | `math.meas.lebesgue-integral` | Lebesgue Integral |
| 274 | mathematics | 7 | `math.graph.tree` | Tree |
| 275 | mathematics | 7 | `math.graph.maximum-flow` | Maximum Flow |
| 276 | mathematics | 7 | `math.graph.eulerian-circuit` | Eulerian Circuit |
| 277 | mathematics | 7 | `math.graph.hamiltonian-cycle` | Hamiltonian Cycle |
| 278 | physics | 7 | `phys.mech.friction` | Friction Forces |
| 279 | physics | 7 | `phys.mech.tension` | Tension in Strings and Ropes |
| 280 | physics | 7 | `phys.mech.normal-force` | Normal Force and Constraint Forces |
| 281 | physics | 7 | `phys.mech.kinetic-energy` | Kinetic Energy |
| 282 | physics | 7 | `phys.mech.potential-energy` | Potential Energy |
| 283 | physics | 7 | `phys.mech.power` | Power |
| 284 | physics | 7 | `phys.mech.impulse` | Impulse and Momentum Change |
| 285 | physics | 7 | `phys.mech.center-of-mass` | Center of Mass |
| 286 | physics | 7 | `phys.mech.angular-kinematics` | Angular Kinematics |
| 287 | physics | 7 | `phys.mech.gravitational-field` | Gravitational Field and Field Lines |
| 288 | physics | 7 | `phys.mech.stress-strain` | Stress, Strain, and Elastic Moduli |
| 289 | physics | 7 | `phys.mech.buoyancy` | Buoyancy and Archimedes' Principle |
| 290 | physics | 7 | `phys.mech.surface-tension` | Surface Tension and Capillarity |
| 291 | physics | 7 | `phys.therm.first-law` | First Law of Thermodynamics |
| 292 | physics | 7 | `phys.wave.shm` | Simple Harmonic Motion |
| 293 | physics | 7 | `phys.opt.diffraction` | Diffraction of Light |
| 294 | physics | 7 | `phys.em.dielectrics` | Dielectrics and Polarization |
| 295 | physics | 7 | `phys.em.energy-capacitor` | Energy Stored in a Capacitor |
| 296 | physics | 7 | `phys.em.resistivity` | Resistivity and Conductivity |
| 297 | physics | 7 | `phys.em.dc-circuits` | Series and Parallel Circuits |
| 298 | physics | 7 | `phys.em.electrical-power` | Electrical Power and Joule Heating |
| 299 | physics | 7 | `phys.em.solenoid` | Magnetic Field of a Solenoid and Toroid |
| 300 | physics | 7 | `phys.em.mutual-inductance` | Mutual Inductance and Transformers |
| 301 | physics | 7 | `phys.em.ac-basics` | Alternating Current: Peak and RMS Values |
| 302 | physics | 7 | `phys.em.maxwells-equations` | Maxwell's Equations and Displacement Current |
| 303 | english | 7 | `eng.phonics.syllable-types` | Syllable Types |
| 304 | english | 7 | `eng.phonetics.intonation-patterns` | Intonation Patterns |
| 305 | chemistry | 7 | `chem.atomic.electronic-config` | Electronic Configuration |
| 306 | chemistry | 7 | `chem.atomic.quantum-mech-model` | Quantum Mechanical Model |
| 307 | chemistry | 7 | `chem.equil.kc-kp` | Equilibrium Constants Kc and Kp |
| 308 | chemistry | 7 | `chem.equil.kw-ph` | Water Ionization and pH |
| 309 | chemistry | 7 | `chem.kinet.catalysis` | Catalysis |
| 310 | biology | 7 | `bio.cell.mitosis` | Mitosis |
| 311 | biology | 7 | `bio.mol.enzymes` | Enzymes and Enzyme Kinetics |
| 312 | biology | 7 | `bio.evo.evidence-for-evolution` | Evidence for Evolution |
| 313 | biology | 7 | `bio.physio.circulatory-system` | Human Circulatory System |
| 314 | biology | 7 | `bio.physio.nervous-system` | Nervous System and Neural Control |
| 315 | biology | 7 | `bio.plant.mineral-nutrition` | Mineral Nutrition in Plants |
| 316 | biology | 7 | `bio.eco.biodiversity-conservation` | Biodiversity and Conservation |
| 317 | biology | 7 | `bio.micro.microbes-in-human-welfare` | Microbes in Human Welfare |
| 318 | computer_science | 7 | `cs.algo.backtracking` | Backtracking |
| 319 | computer_science | 7 | `cs.prog.operators-expressions` | Operators and Expressions |
| 320 | computer_science | 7 | `cs.net.cloud-computing` | Cloud Computing |
| 321 | computer_science | 7 | `cs.sec.network-web-security` | Network and Web Security |
| 322 | computer_science | 7 | `cs.web.client-server-model` | The Client-Server Model |
| 323 | computer_science | 7 | `cs.theory.turing-machines` | Turing Machines |
| 324 | mathematics | 8 | `math.found.proof` | Mathematical Proof |
| 325 | mathematics | 8 | `math.found.union` | Union |
| 326 | mathematics | 8 | `math.found.intersection` | Intersection |
| 327 | mathematics | 8 | `math.found.set-difference` | Set Difference |
| 328 | mathematics | 8 | `math.found.complement` | Set Complement |
| 329 | mathematics | 8 | `math.found.venn-diagram` | Venn Diagram |
| 330 | mathematics | 8 | `math.found.equivalence-relation` | Equivalence Relation |
| 331 | mathematics | 8 | `math.found.partial-order` | Partial Order |
| 332 | mathematics | 8 | `math.found.cardinality` | Cardinality |
| 333 | mathematics | 8 | `math.geom.polygon-angle-sum` | Polygon Angle Sum |
| 334 | mathematics | 8 | `math.geom.parallelogram` | Parallelogram |
| 335 | mathematics | 8 | `math.geom.trapezoid` | Trapezoid |
| 336 | mathematics | 8 | `math.geom.area` | Area |
| 337 | mathematics | 8 | `math.geom.volume` | Volume |
| 338 | mathematics | 8 | `math.geom.platonic-solids` | Platonic Solids |
| 339 | mathematics | 8 | `math.func.function-concept` | Function |
| 340 | mathematics | 8 | `math.prob.conditional-probability` | Conditional Probability |
| 341 | mathematics | 8 | `math.abst.binary-operation` | Binary Operation |
| 342 | mathematics | 8 | `math.meas.convergence-theorems` | Convergence Theorems |
| 343 | mathematics | 8 | `math.meas.lp-space` | Lᵖ Spaces |
| 344 | mathematics | 8 | `math.meas.product-measure` | Product Measure and Fubini's Theorem |
| 345 | mathematics | 8 | `math.meas.radon-nikodym` | Radon-Nikodym Theorem |
| 346 | mathematics | 8 | `math.fnal.convolution` | Convolution |
| 347 | mathematics | 8 | `math.graph.minimum-spanning-tree` | Minimum Spanning Tree |
| 348 | mathematics | 8 | `math.graph.random-graph` | Random Graphs |
| 349 | mathematics | 8 | `math.cat.category` | Category |
| 350 | physics | 8 | `phys.mech.inclined-plane` | Motion on Inclined Planes |
| 351 | physics | 8 | `phys.mech.work-energy-theorem` | Work-Energy Theorem |
| 352 | physics | 8 | `phys.mech.conservation-of-energy` | Conservation of Mechanical Energy |
| 353 | physics | 8 | `phys.mech.conservation-of-momentum` | Conservation of Linear Momentum |
| 354 | physics | 8 | `phys.mech.torque` | Torque |
| 355 | physics | 8 | `phys.mech.gravitational-potential` | Gravitational Potential Energy |
| 356 | physics | 8 | `phys.therm.thermodynamic-processes` | Thermodynamic Processes |
| 357 | physics | 8 | `phys.wave.shm-energy` | Energy in Simple Harmonic Motion |
| 358 | physics | 8 | `phys.wave.pendulum` | Simple Pendulum |
| 359 | physics | 8 | `phys.wave.spring-mass` | Spring-Mass System |
| 360 | physics | 8 | `phys.opt.single-slit` | Single-Slit Diffraction |
| 361 | physics | 8 | `phys.em.kirchhoffs-laws` | Kirchhoff's Current and Voltage Laws |
| 362 | physics | 8 | `phys.em.emf` | EMF, Internal Resistance, and Terminal Voltage |
| 363 | physics | 8 | `phys.em.lc-circuits` | LC Oscillations and Resonance |
| 364 | physics | 8 | `phys.em.electromagnetic-waves` | Electromagnetic Waves and the EM Spectrum |
| 365 | english | 8 | `eng.phonics.decoding-fluency` | Decoding Fluency |
| 366 | english | 8 | `eng.phonetics.connected-speech` | Connected Speech |
| 367 | english | 8 | `eng.phonetics.prosody` | Prosody |
| 368 | english | 8 | `eng.writing.spelling-strategies` | Spelling Strategies |
| 369 | chemistry | 8 | `chem.period.modern-periodic-law` | Modern Periodic Law and Table |
| 370 | chemistry | 8 | `chem.equil.le-chatelier` | Le Chatelier's Principle |
| 371 | chemistry | 8 | `chem.equil.acids-bases` | Acid–Base Theories |
| 372 | chemistry | 8 | `chem.equil.solubility` | Solubility Equilibria |
| 373 | chemistry | 8 | `chem.equil.complex-equil` | Complex Ion Equilibria |
| 374 | chemistry | 8 | `chem.surface.adsorption` | Adsorption |
| 375 | biology | 8 | `bio.cell.meiosis` | Meiosis |
| 376 | biology | 8 | `bio.mol.dna-replication` | DNA Replication |
| 377 | biology | 8 | `bio.evo.natural-selection` | Natural Selection and Darwinism |
| 378 | biology | 8 | `bio.physio.digestive-system` | Human Digestive System |
| 379 | biology | 8 | `bio.physio.excretory-system` | Excretory System and Osmoregulation |
| 380 | biology | 8 | `bio.physio.endocrine-system` | Endocrine System |
| 381 | biology | 8 | `bio.physio.musculoskeletal-system` | Locomotion and Musculoskeletal System |
| 382 | biology | 8 | `bio.physio.immune-system-intro` | Immune System Overview |
| 383 | biology | 8 | `bio.plant.photosynthesis` | Photosynthesis |
| 384 | biology | 8 | `bio.plant.plant-growth-hormones` | Plant Growth and Hormones |
| 385 | biology | 8 | `bio.repro.asexual-reproduction` | Asexual Reproduction |
| 386 | biology | 8 | `bio.eco.environmental-issues` | Environmental Issues and Pollution |
| 387 | computer_science | 8 | `cs.algo.np-completeness` | NP-Completeness and Intractability |
| 388 | computer_science | 8 | `cs.prog.type-conversion` | Type Conversion and Casting |
| 389 | computer_science | 8 | `cs.control.conditionals` | Conditional Statements |
| 390 | computer_science | 8 | `cs.sec.data-protection-privacy` | Data Protection and Privacy |
| 391 | computer_science | 8 | `cs.web.html-css-basics` | HTML and CSS Basics |
| 392 | mathematics | 9 | `math.found.direct-proof` | Direct Proof |
| 393 | mathematics | 9 | `math.found.proof-by-contradiction` | Proof by Contradiction |
| 394 | mathematics | 9 | `math.found.proof-by-contrapositive` | Proof by Contrapositive |
| 395 | mathematics | 9 | `math.found.proof-by-cases` | Proof by Cases |
| 396 | mathematics | 9 | `math.found.existence-proof` | Existence Proof |
| 397 | mathematics | 9 | `math.found.writing-mathematics` | Writing Mathematics |
| 398 | mathematics | 9 | `math.found.theorem` | Theorem |
| 399 | mathematics | 9 | `math.found.conjecture` | Conjecture |
| 400 | mathematics | 9 | `math.found.equivalence-class` | Equivalence Class |
| 401 | mathematics | 9 | `math.found.total-order` | Total Order |
| 402 | mathematics | 9 | `math.found.hasse-diagram` | Hasse Diagram |
| 403 | mathematics | 9 | `math.found.finite-set` | Finite Set |
| 404 | mathematics | 9 | `math.geom.circle-area` | Area of a Circle |
| 405 | mathematics | 9 | `math.geom.geometric-proof` | Geometric Proof |
| 406 | mathematics | 9 | `math.geom.surface-area` | Surface Area |
| 407 | mathematics | 9 | `math.func.domain-range` | Domain and Range |
| 408 | mathematics | 9 | `math.func.function-notation` | Function Notation |
| 409 | mathematics | 9 | `math.func.injectivity` | Injective (One-to-One) Function |
| 410 | mathematics | 9 | `math.func.surjectivity` | Surjective (Onto) Function |
| 411 | mathematics | 9 | `math.func.composition` | Composition of Functions |
| 412 | mathematics | 9 | `math.func.periodic-function` | Periodic Function |
| 413 | mathematics | 9 | `math.func.piecewise-function` | Piecewise-Defined Function |
| 414 | mathematics | 9 | `math.func.monotonic-function` | Monotonic Function |
| 415 | mathematics | 9 | `math.func.function-operations` | Operations on Functions |
| 416 | mathematics | 9 | `math.prob.total-probability` | Law of Total Probability |
| 417 | mathematics | 9 | `math.prob.independence` | Independence |
| 418 | mathematics | 9 | `math.prob.random-variable` | Random Variable |
| 419 | mathematics | 9 | `math.abst.group-theory` | Group |
| 420 | mathematics | 9 | `math.top.quotient-space` | Quotient Space |
| 421 | mathematics | 9 | `math.meas.l2-space` | L² Space |
| 422 | mathematics | 9 | `math.cat.morphism-types` | Types of Morphisms |
| 423 | mathematics | 9 | `math.cat.functor` | Functor |
| 424 | physics | 9 | `phys.mech.conservative-forces` | Conservative and Non-Conservative Forces |
| 425 | physics | 9 | `phys.mech.collisions-elastic` | Elastic Collisions |
| 426 | physics | 9 | `phys.mech.collisions-inelastic` | Inelastic Collisions |
| 427 | physics | 9 | `phys.mech.moment-of-inertia` | Moment of Inertia |
| 428 | physics | 9 | `phys.mech.equilibrium` | Static Equilibrium |
| 429 | physics | 9 | `phys.mech.orbital-mechanics` | Circular Orbital Mechanics |
| 430 | physics | 9 | `phys.mech.escape-velocity` | Escape Velocity |
| 431 | physics | 9 | `phys.mech.bernoulli` | Bernoulli's Equation and Fluid Flow |
| 432 | physics | 9 | `phys.therm.second-law` | Second Law of Thermodynamics |
| 433 | physics | 9 | `phys.therm.heat-engines` | Heat Engines and Efficiency |
| 434 | physics | 9 | `phys.wave.damped-oscillations` | Damped Oscillations |
| 435 | physics | 9 | `phys.em.wheatstone-bridge` | Wheatstone Bridge |
| 436 | physics | 9 | `phys.em.potentiometer` | Potentiometer |
| 437 | physics | 9 | `phys.em.rc-circuits` | RC Circuits: Charging and Discharging |
| 438 | physics | 9 | `phys.mod.photoelectric-effect` | Photoelectric Effect |
| 439 | physics | 9 | `phys.rel.postulates` | Postulates of Special Relativity |
| 440 | english | 9 | `eng.phonetics.rhythm-and-timing` | Rhythm and Timing |
| 441 | english | 9 | `eng.vocab.word-recognition` | Word Recognition |
| 442 | english | 9 | `eng.listening.active-listening` | Active Listening |
| 443 | english | 9 | `eng.speaking.oral-fluency` | Oral Fluency |
| 444 | chemistry | 9 | `chem.period.atomic-radius` | Atomic and Ionic Radius |
| 445 | chemistry | 9 | `chem.period.ionization-energy` | Ionization Energy |
| 446 | chemistry | 9 | `chem.period.electron-affinity` | Electron Affinity and Electronegativity |
| 447 | chemistry | 9 | `chem.period.valency` | Valency and Oxidation State |
| 448 | chemistry | 9 | `chem.bond.metallic-bonding` | Metallic Bonding |
| 449 | chemistry | 9 | `chem.equil.weak-acid` | Weak Acid and Base Equilibria |
| 450 | chemistry | 9 | `chem.surface.heterogeneous-cat` | Mechanism of Heterogeneous Catalysis |
| 451 | chemistry | 9 | `chem.sblock.hydrogen` | Hydrogen |
| 452 | chemistry | 9 | `chem.anal.gravimetric` | Gravimetric Analysis |
| 453 | chemistry | 9 | `chem.anal.chromatography` | Chromatography |
| 454 | biology | 9 | `bio.mol.transcription` | Transcription |
| 455 | biology | 9 | `bio.gen.mendelian-genetics` | Mendelian Genetics |
| 456 | biology | 9 | `bio.plant.plant-respiration` | Respiration in Plants |
| 457 | biology | 9 | `bio.repro.sexual-reproduction-plants` | Sexual Reproduction in Flowering Plants |
| 458 | biology | 9 | `bio.repro.human-reproductive-system` | Human Reproductive System |
| 459 | biology | 9 | `bio.immuno.innate-adaptive-immunity` | Innate and Adaptive Immunity |
| 460 | computer_science | 9 | `cs.prog.input-output` | Input, Output and Formatting |
| 461 | computer_science | 9 | `cs.control.loops` | Iteration — while and for Loops |
| 462 | computer_science | 9 | `cs.web.rest-apis` | REST APIs |
| 463 | computer_science | 9 | `cs.theory.complexity-classes` | Computational Complexity Classes |
| 464 | mathematics | 10 | `math.found.uniqueness-proof` | Uniqueness Proof |
| 465 | mathematics | 10 | `math.found.lemma` | Lemma |
| 466 | mathematics | 10 | `math.found.corollary` | Corollary |
| 467 | mathematics | 10 | `math.found.natural-numbers` | Natural Numbers |
| 468 | mathematics | 10 | `math.func.bijection` | Bijective Function |
| 469 | mathematics | 10 | `math.func.step-function` | Step Function |
| 470 | mathematics | 10 | `math.prob.bayes-theorem` | Bayes' Theorem |
| 471 | mathematics | 10 | `math.prob.discrete-rv` | Discrete Random Variable |
| 472 | mathematics | 10 | `math.prob.cdf` | Cumulative Distribution Function |
| 473 | mathematics | 10 | `math.abst.group-operation` | Group Operation Examples |
| 474 | mathematics | 10 | `math.abst.subgroup` | Subgroup |
| 475 | mathematics | 10 | `math.abst.cyclic-group` | Cyclic Group |
| 476 | mathematics | 10 | `math.abst.group-order` | Order of Group and Elements |
| 477 | mathematics | 10 | `math.abst.group-homomorphism` | Group Homomorphism |
| 478 | mathematics | 10 | `math.abst.group-action` | Group Action |
| 479 | mathematics | 10 | `math.abst.symmetric-group` | Symmetric Group |
| 480 | mathematics | 10 | `math.abst.ring-theory` | Ring |
| 481 | mathematics | 10 | `math.abst.group-inverse` | Group Inverse |
| 482 | mathematics | 10 | `math.top.fundamental-group` | Fundamental Group |
| 483 | mathematics | 10 | `math.top.homology` | Homology |
| 484 | mathematics | 10 | `math.cat.natural-transformation` | Natural Transformation |
| 485 | physics | 10 | `phys.mech.rotational-dynamics` | Rotational Dynamics |
| 486 | physics | 10 | `phys.mech.keplers-laws` | Kepler's Laws of Planetary Motion |
| 487 | physics | 10 | `phys.mech.satellites` | Artificial Satellites and Geostationary Orbits |
| 488 | physics | 10 | `phys.mech.viscosity` | Viscosity and Stokes' Law |
| 489 | physics | 10 | `phys.mech.generalized-coordinates` | Generalized Coordinates and Configuration Space |
| 490 | physics | 10 | `phys.therm.entropy` | Entropy and Disorder |
| 491 | physics | 10 | `phys.wave.forced-oscillations` | Forced Oscillations and Resonance |
| 492 | physics | 10 | `phys.mod.photons` | Photons and Quantization of Light |
| 493 | physics | 10 | `phys.rel.simultaneity` | Relativity of Simultaneity |
| 494 | english | 10 | `eng.phonetics.accents-and-dialects` | Accents and Dialects |
| 495 | english | 10 | `eng.vocab.context-clues` | Context Clues |
| 496 | english | 10 | `eng.vocab.synonyms-antonyms` | Synonyms and Antonyms |
| 497 | english | 10 | `eng.vocab.word-families` | Word Families |
| 498 | english | 10 | `eng.grammar.word-classes-overview` | Overview of Word Classes |
| 499 | english | 10 | `eng.listening.listening-for-gist` | Listening for Gist |
| 500 | english | 10 | `eng.listening.distinguishing-sounds-in-speech` | Distinguishing Sounds in Speech |
| 501 | english | 10 | `eng.speaking.pronunciation-in-conversation` | Pronunciation in Conversation |
| 502 | chemistry | 10 | `chem.period.periodic-properties` | Periodic Trends Overview |
| 503 | chemistry | 10 | `chem.bond.ionic-bonding` | Ionic Bonding |
| 504 | chemistry | 10 | `chem.bond.covalent-bonding` | Covalent Bonding |
| 505 | chemistry | 10 | `chem.equil.buffer` | Buffer Solutions |
| 506 | chemistry | 10 | `chem.equil.hydrolysis` | Salt Hydrolysis |
| 507 | chemistry | 10 | `chem.equil.titration` | Acid–Base Titrations |
| 508 | chemistry | 10 | `chem.redox.oxidation-state` | Oxidation State |
| 509 | biology | 10 | `bio.mol.translation-genetic-code` | Translation and the Genetic Code |
| 510 | biology | 10 | `bio.gen.gene-interactions` | Gene Interactions and Extensions of Mendelism |
| 511 | biology | 10 | `bio.repro.fertilisation-development` | Fertilisation and Embryonic Development |
| 512 | biology | 10 | `bio.immuno.antibody-structure-function` | Antibody Structure and Function |
| 513 | computer_science | 10 | `cs.prog.exception-handling` | Exception Handling |
| 514 | computer_science | 10 | `cs.control.nested-control-patterns` | Nested Control Flow Patterns |
| 515 | computer_science | 10 | `cs.data.strings` | Strings |
| 516 | mathematics | 11 | `math.found.proof-by-induction` | Mathematical Induction |
| 517 | mathematics | 11 | `math.found.well-ordering-principle` | Well-Ordering Principle |
| 518 | mathematics | 11 | `math.found.countable-set` | Countable Set |
| 519 | mathematics | 11 | `math.found.integers` | Integers |
| 520 | mathematics | 11 | `math.arith.counting` | Counting |
| 521 | mathematics | 11 | `math.func.inverse-functions` | Inverse Functions |
| 522 | mathematics | 11 | `math.seq.sequence` | Sequence |
| 523 | mathematics | 11 | `math.prob.bayesian-inference` | Bayesian Inference |
| 524 | mathematics | 11 | `math.prob.pmf` | Probability Mass Function |
| 525 | mathematics | 11 | `math.prob.quantile` | Quantile |
| 526 | mathematics | 11 | `math.prob.distribution` | Probability Distribution |
| 527 | mathematics | 11 | `math.abst.coset` | Coset |
| 528 | mathematics | 11 | `math.abst.group-isomorphism` | Group Isomorphism |
| 529 | mathematics | 11 | `math.abst.burnside-lemma` | Burnside's Lemma |
| 530 | mathematics | 11 | `math.abst.ideal` | Ideal |
| 531 | mathematics | 11 | `math.abst.ring-homomorphism` | Ring Homomorphism |
| 532 | mathematics | 11 | `math.abst.polynomial-ring` | Polynomial Ring |
| 533 | mathematics | 11 | `math.top.van-kampen` | Seifert-van Kampen Theorem |
| 534 | mathematics | 11 | `math.top.covering-space` | Covering Space |
| 535 | mathematics | 11 | `math.top.euler-characteristic` | Euler Characteristic |
| 536 | mathematics | 11 | `math.top.cohomology` | Cohomology |
| 537 | mathematics | 11 | `math.cat.functor-category` | Functor Category |
| 538 | mathematics | 11 | `math.cat.limits` | Limits and Colimits |
| 539 | mathematics | 11 | `math.cat.adjunction` | Adjunction |
| 540 | physics | 11 | `phys.mech.angular-momentum` | Angular Momentum |
| 541 | physics | 11 | `phys.mech.rolling-motion` | Rolling Without Slipping |
| 542 | physics | 11 | `phys.mech.euler-lagrange-equation` | The Euler-Lagrange Equation and Hamilton's Principle |
| 543 | physics | 11 | `phys.therm.carnot-cycle` | Carnot Cycle |
| 544 | physics | 11 | `phys.therm.third-law` | Third Law of Thermodynamics |
| 545 | physics | 11 | `phys.mod.compton-effect` | Compton Scattering |
| 546 | physics | 11 | `phys.mod.de-broglie` | de Broglie Hypothesis — Matter Waves |
| 547 | physics | 11 | `phys.mod.bohr-model` | Bohr Model of the Hydrogen Atom |
| 548 | physics | 11 | `phys.mod.x-rays` | X-Rays and Their Properties |
| 549 | physics | 11 | `phys.rel.time-dilation` | Time Dilation |
| 550 | physics | 11 | `phys.stat.probability-basics` | Probability Distributions in Physics |
| 551 | english | 11 | `eng.vocab.compound-words` | Compound Words |
| 552 | english | 11 | `eng.vocab.prefixes` | Prefixes |
| 553 | english | 11 | `eng.vocab.suffixes` | Suffixes |
| 554 | english | 11 | `eng.vocab.homonyms-homophones` | Homonyms and Homophones |
| 555 | english | 11 | `eng.vocab.connotation-denotation` | Connotation and Denotation |
| 556 | english | 11 | `eng.grammar.nouns` | Nouns |
| 557 | english | 11 | `eng.grammar.verbs` | Verbs |
| 558 | english | 11 | `eng.grammar.prepositions` | Prepositions |
| 559 | english | 11 | `eng.grammar.conjunctions` | Conjunctions |
| 560 | english | 11 | `eng.grammar.interjections` | Interjections |
| 561 | english | 11 | `eng.reading.print-to-meaning` | From Print to Meaning |
| 562 | english | 11 | `eng.listening.listening-for-detail` | Listening for Detail |
| 563 | english | 11 | `eng.speaking.conversation-skills` | Conversation Skills |
| 564 | chemistry | 11 | `chem.bond.vsepr` | VSEPR Theory |
| 565 | chemistry | 11 | `chem.bond.hybridization` | Hybridization |
| 566 | chemistry | 11 | `chem.bond.resonance` | Resonance Structures |
| 567 | chemistry | 11 | `chem.bond.bond-parameters` | Bond Parameters |
| 568 | chemistry | 11 | `chem.bond.coordinate-bond` | Coordinate and Dative Bonding |
| 569 | chemistry | 11 | `chem.redox.balancing` | Balancing Redox Equations |
| 570 | chemistry | 11 | `chem.solid.crystal-systems` | Crystal Systems |
| 571 | chemistry | 11 | `chem.sblock.alkali` | Alkali Metals |
| 572 | chemistry | 11 | `chem.pblock.group13` | Group 13 — Boron Family |
| 573 | chemistry | 11 | `chem.pblock.group14` | Group 14 — Carbon Family |
| 574 | chemistry | 11 | `chem.pblock.group15` | Group 15 — Nitrogen Family |
| 575 | chemistry | 11 | `chem.pblock.group16` | Group 16 — Oxygen Family |
| 576 | chemistry | 11 | `chem.pblock.group17` | Group 17 — Halogens |
| 577 | chemistry | 11 | `chem.pblock.group18` | Group 18 — Noble Gases |
| 578 | chemistry | 11 | `chem.dblock.general` | Transition Metals — General Properties |
| 579 | chemistry | 11 | `chem.org.iupac` | IUPAC Nomenclature |
| 580 | biology | 11 | `bio.mol.gene-regulation` | Regulation of Gene Expression |
| 581 | biology | 11 | `bio.gen.chromosomal-theory-linkage` | Chromosomal Theory and Linkage |
| 582 | biology | 11 | `bio.repro.reproductive-health` | Reproductive Health and Contraception |
| 583 | biology | 11 | `bio.dev.gametogenesis-fertilisation-dev` | Fundamentals of Animal Development |
| 584 | biology | 11 | `bio.immuno.vaccination-immunisation` | Vaccination and Immunisation |
| 585 | computer_science | 11 | `cs.data.lists` | Lists |
| 586 | computer_science | 11 | `cs.func.functions` | Functions |
| 587 | mathematics | 12 | `math.found.strong-induction` | Strong Induction |
| 588 | mathematics | 12 | `math.found.uncountable-set` | Uncountable Set |
| 589 | mathematics | 12 | `math.found.rational-numbers` | Rational Numbers |
| 590 | mathematics | 12 | `math.arith.counting-sequence` | Counting Sequence |
| 591 | mathematics | 12 | `math.arith.subitizing` | Subitizing |
| 592 | mathematics | 12 | `math.arith.place-value` | Place Value |
| 593 | mathematics | 12 | `math.arith.number-line` | Number Line |
| 594 | mathematics | 12 | `math.seq.arithmetic-sequence` | Arithmetic Sequence |
| 595 | mathematics | 12 | `math.seq.geometric-sequence` | Geometric Sequence |
| 596 | mathematics | 12 | `math.seq.recursive-sequences` | Recursive Sequences |
| 597 | mathematics | 12 | `math.seq.series` | Series |
| 598 | mathematics | 12 | `math.prob.discrete-distributions` | Discrete Distributions |
| 599 | mathematics | 12 | `math.prob.joint-distribution` | Joint Distribution |
| 600 | mathematics | 12 | `math.abst.lagrange-theorem` | Lagrange's Theorem |
| 601 | mathematics | 12 | `math.abst.normal-subgroup` | Normal Subgroup |
| 602 | mathematics | 12 | `math.abst.quotient-ring` | Quotient Ring |
| 603 | mathematics | 12 | `math.abst.prime-ideal` | Prime and Maximal Ideals |
| 604 | mathematics | 12 | `math.abst.euclidean-domain` | Euclidean Domain |
| 605 | mathematics | 12 | `math.cat.yoneda-lemma` | Yoneda Lemma |
| 606 | mathematics | 12 | `math.cat.equalizer` | Equalizer and Coequalizer |
| 607 | mathematics | 12 | `math.cat.pullback` | Pullback and Pushout |
| 608 | mathematics | 12 | `math.cat.monad` | Monad |
| 609 | mathematics | 12 | `math.cat.tensor-product` | Tensor Product (Categorical) |
| 610 | mathematics | 12 | `math.cat.topos` | Topos |
| 611 | physics | 12 | `phys.mech.conservation-of-angular-momentum` | Conservation of Angular Momentum |
| 612 | physics | 12 | `phys.mech.cyclic-coordinates-conservation-laws` | Cyclic Coordinates and Noether's Theorem |
| 613 | physics | 12 | `phys.mech.hamiltonian` | The Hamiltonian and Legendre Transform |
| 614 | physics | 12 | `phys.therm.refrigerators` | Refrigerators and Heat Pumps |
| 615 | physics | 12 | `phys.mod.wave-particle-duality` | Wave-Particle Duality |
| 616 | physics | 12 | `phys.mod.atomic-spectra` | Atomic Spectra and Energy Levels |
| 617 | physics | 12 | `phys.rel.length-contraction` | Length Contraction |
| 618 | physics | 12 | `phys.stat.boltzmann-factor` | Boltzmann Factor and Statistical Weight |
| 619 | english | 12 | `eng.vocab.roots-and-origins` | Greek and Latin Roots |
| 620 | english | 12 | `eng.vocab.multiple-meaning-words` | Multiple-Meaning Words |
| 621 | english | 12 | `eng.vocab.collocations` | Collocations |
| 622 | english | 12 | `eng.vocab.register-and-formality` | Register and Formality |
| 623 | english | 12 | `eng.grammar.pronouns` | Pronouns |
| 624 | english | 12 | `eng.grammar.adjectives` | Adjectives |
| 625 | english | 12 | `eng.grammar.articles-and-determiners` | Articles and Determiners |
| 626 | english | 12 | `eng.grammar.subject-and-predicate` | Subject and Predicate |
| 627 | english | 12 | `eng.grammar.present-tenses` | Present Tenses |
| 628 | english | 12 | `eng.reading.reading-fluency` | Reading Fluency |
| 629 | english | 12 | `eng.listening.following-instructions` | Following Spoken Instructions |
| 630 | english | 12 | `eng.listening.note-taking-while-listening` | Note-Taking While Listening |
| 631 | english | 12 | `eng.speaking.asking-and-answering-questions` | Asking and Answering Questions |
| 632 | english | 12 | `eng.speaking.storytelling-orally` | Oral Storytelling |
| 633 | english | 12 | `eng.speaking.non-verbal-communication` | Non-Verbal Communication |
| 634 | chemistry | 12 | `chem.bond.mo-theory` | Molecular Orbital Theory |
| 635 | chemistry | 12 | `chem.bond.polar-molecules` | Polarity and Dipole Moment |
| 636 | chemistry | 12 | `chem.thermo.bond-enthalpy` | Bond Enthalpy |
| 637 | chemistry | 12 | `chem.redox.disproportionation` | Disproportionation |
| 638 | chemistry | 12 | `chem.redox.activity-series` | Electrochemical Activity Series |
| 639 | chemistry | 12 | `chem.redox.titrations` | Redox Titrations |
| 640 | chemistry | 12 | `chem.solid.packing` | Close Packing and Efficiency |
| 641 | chemistry | 12 | `chem.solid.defects` | Crystal Defects |
| 642 | chemistry | 12 | `chem.solid.amorphous` | Amorphous Solids |
| 643 | chemistry | 12 | `chem.coord.werner` | Werner's Theory |
| 644 | chemistry | 12 | `chem.sblock.alkaline-earth` | Alkaline Earth Metals |
| 645 | chemistry | 12 | `chem.pblock.trends` | Trends Across p-Block |
| 646 | chemistry | 12 | `chem.dblock.first-row` | First-Row Transition Metals |
| 647 | chemistry | 12 | `chem.dblock.lanthanides` | Lanthanides and Actinides |
| 648 | chemistry | 12 | `chem.org.hybridization` | Carbon Hybridization |
| 649 | chemistry | 12 | `chem.org.purification` | Purification Techniques |
| 650 | chemistry | 12 | `chem.org.spectroscopy` | Introduction to Spectroscopy |
| 651 | biology | 12 | `bio.gen.pedigree-human-genetics` | Pedigree Analysis and Human Genetic Disorders |
| 652 | biology | 12 | `bio.gen.mutations` | Mutations |
| 653 | biology | 12 | `bio.dev.morphogenesis-differentiation` | Morphogenesis and Cell Differentiation |
| 654 | biology | 12 | `bio.immuno.immune-disorders` | Immune Disorders |
| 655 | computer_science | 12 | `cs.data.tuples` | Tuples |
| 656 | computer_science | 12 | `cs.data.dictionaries` | Dictionaries |
| 657 | computer_science | 12 | `cs.func.scope-namespaces` | Scope and Namespaces |
| 658 | computer_science | 12 | `cs.file.text-files` | Text File Handling |
| 659 | computer_science | 12 | `cs.struct.linear-search` | Linear Search |
| 660 | computer_science | 12 | `cs.oop.oop-concepts` | Object-Oriented Programming Concepts |
| 661 | mathematics | 13 | `math.found.irrational-numbers` | Irrational Numbers |
| 662 | mathematics | 13 | `math.arith.ones-tens-hundreds` | Ones, Tens, Hundreds |
| 663 | mathematics | 13 | `math.arith.expanded-form` | Expanded Form |
| 664 | mathematics | 13 | `math.arith.number-base` | Number Base |
| 665 | mathematics | 13 | `math.arith.addition` | Addition |
| 666 | mathematics | 13 | `math.arith.ordering` | Ordering Numbers |
| 667 | mathematics | 13 | `math.seq.partial-sums` | Partial Sums |
| 668 | mathematics | 13 | `math.seq.arithmetic-series` | Arithmetic Series |
| 669 | mathematics | 13 | `math.seq.geometric-series` | Geometric Series |
| 670 | mathematics | 13 | `math.prob.marginal-distribution` | Marginal Distribution |
| 671 | mathematics | 13 | `math.prob.conditional-distribution` | Conditional Distribution |
| 672 | mathematics | 13 | `math.abst.quotient-group` | Quotient Group |
| 673 | mathematics | 13 | `math.abst.alternating-group` | Alternating Group |
| 674 | mathematics | 13 | `math.abst.pid` | Principal Ideal Domain |
| 675 | mathematics | 13 | `math.abst.field` | Field |
| 676 | mathematics | 13 | `math.cat.representable-functor` | Representable Functor |
| 677 | mathematics | 13 | `math.cat.higher-category` | Higher Category Theory |
| 678 | physics | 13 | `phys.mech.hamiltons-equations` | Hamilton's Equations of Motion |
| 679 | physics | 13 | `phys.mod.radioactivity` | Radioactivity: Alpha, Beta, Gamma Decay |
| 680 | physics | 13 | `phys.qm.wave-function` | Wave Function and Probability Interpretation |
| 681 | physics | 13 | `phys.rel.lorentz-transform` | Lorentz Transformations |
| 682 | physics | 13 | `phys.stat.partition-function` | Partition Function |
| 683 | physics | 13 | `phys.stat.maxwell-boltzmann` | Maxwell-Boltzmann Speed Distribution |
| 684 | english | 13 | `eng.vocab.word-formation-processes` | Word Formation Processes |
| 685 | english | 13 | `eng.vocab.idioms` | Idioms |
| 686 | english | 13 | `eng.vocab.phrasal-verbs` | Phrasal Verbs |
| 687 | english | 13 | `eng.vocab.etymology` | Etymology |
| 688 | english | 13 | `eng.vocab.thesaurus-and-dictionary-skills` | Thesaurus and Dictionary Skills |
| 689 | english | 13 | `eng.grammar.adverbs` | Adverbs |
| 690 | english | 13 | `eng.grammar.word-order` | Basic Word Order |
| 691 | english | 13 | `eng.grammar.past-tenses` | Past Tenses |
| 692 | english | 13 | `eng.grammar.future-tenses` | Future Tenses |
| 693 | english | 13 | `eng.grammar.modals` | Modal Verbs |
| 694 | english | 13 | `eng.grammar.gerunds-and-infinitives` | Gerunds and Infinitives |
| 695 | english | 13 | `eng.grammar.subject-verb-agreement` | Subject-Verb Agreement |
| 696 | english | 13 | `eng.reading.literal-comprehension` | Literal Comprehension |
| 697 | english | 13 | `eng.reading.skimming-and-scanning` | Skimming and Scanning |
| 698 | english | 13 | `eng.listening.listening-comprehension-strategies` | Listening Comprehension Strategies |
| 699 | english | 13 | `eng.speaking.discussion-skills` | Discussion Skills |
| 700 | english | 13 | `eng.communication.digital-communication` | Digital Communication |
| 701 | chemistry | 13 | `chem.bond.intermolecular` | Intermolecular Forces |
| 702 | chemistry | 13 | `chem.elect.galvanic-cell` | Galvanic Cell |
| 703 | chemistry | 13 | `chem.solid.ionic-solids` | Ionic Crystal Structures |
| 704 | chemistry | 13 | `chem.solid.properties` | Electrical and Magnetic Properties |
| 705 | chemistry | 13 | `chem.coord.nomenclature` | Nomenclature of Complexes |
| 706 | chemistry | 13 | `chem.coord.cft` | Crystal Field Theory |
| 707 | chemistry | 13 | `chem.coord.stability` | Stability Constants |
| 708 | chemistry | 13 | `chem.dblock.oxo-species` | Oxides and Oxyanions of Transition Metals |
| 709 | chemistry | 13 | `chem.org.isomerism` | Structural and Stereoisomerism |
| 710 | chemistry | 13 | `chem.org.electronic-effects` | Inductive and Mesomeric Effects |
| 711 | chemistry | 13 | `chem.org.qualitative-analysis` | Qualitative Organic Analysis |
| 712 | chemistry | 13 | `chem.org.aromaticity` | Aromaticity |
| 713 | chemistry | 13 | `chem.hyd.alkanes` | Alkanes |
| 714 | chemistry | 13 | `chem.anal.volumetric` | Volumetric Analysis |
| 715 | chemistry | 13 | `chem.anal.spectroscopy` | Spectroscopic Methods |
| 716 | biology | 13 | `bio.gen.population-genetics` | Population Genetics |
| 717 | biology | 13 | `bio.gen.genetic-engineering` | Genetic Engineering and Recombinant DNA |
| 718 | biology | 13 | `bio.dev.stem-cells-regeneration` | Stem Cells and Regeneration |
| 719 | computer_science | 13 | `cs.data.sets` | Sets |
| 720 | computer_science | 13 | `cs.func.recursion` | Recursion |
| 721 | computer_science | 13 | `cs.file.csv-files` | CSV File Handling |
| 722 | computer_science | 13 | `cs.file.binary-serialisation` | Binary Files and Serialisation |
| 723 | computer_science | 13 | `cs.struct.hashing-hash-tables` | Hashing and Hash Tables |
| 724 | computer_science | 13 | `cs.struct.binary-search` | Binary Search |
| 725 | computer_science | 13 | `cs.oop.classes-objects-python` | Classes and Objects in Python |
| 726 | computer_science | 13 | `cs.db.database-concepts` | Database Concepts |
| 727 | computer_science | 13 | `cs.se.sdlc` | Software Development Life Cycle |
| 728 | mathematics | 14 | `math.found.real-numbers` | Real Numbers |
| 729 | mathematics | 14 | `math.arith.carrying` | Carrying (Regrouping) |
| 730 | mathematics | 14 | `math.arith.mental-addition` | Mental Addition |
| 731 | mathematics | 14 | `math.arith.subtraction` | Subtraction |
| 732 | mathematics | 14 | `math.arith.multiplication` | Multiplication |
| 733 | mathematics | 14 | `math.seq.infinite-geometric-series` | Infinite Geometric Series |
| 734 | mathematics | 14 | `math.seq.telescoping-series` | Telescoping Series |
| 735 | mathematics | 14 | `math.prob.conditional-expectation` | Conditional Expectation |
| 736 | mathematics | 14 | `math.abst.first-isomorphism-theorem` | First Isomorphism Theorem |
| 737 | mathematics | 14 | `math.abst.ufd` | Unique Factorization Domain |
| 738 | mathematics | 14 | `math.abst.field-extension` | Field Extension |
| 739 | physics | 14 | `phys.mech.poisson-brackets` | Poisson Brackets and Phase Space Dynamics |
| 740 | physics | 14 | `phys.mod.radioactive-decay` | Radioactive Decay Law and Half-Life |
| 741 | physics | 14 | `phys.qm.schrodinger-equation` | Time-Dependent Schrödinger Equation |
| 742 | physics | 14 | `phys.qm.uncertainty-principle` | Heisenberg's Uncertainty Principle |
| 743 | physics | 14 | `phys.rel.relativistic-momentum` | Relativistic Momentum and Energy |
| 744 | physics | 14 | `phys.stat.bose-einstein` | Bose-Einstein Statistics |
| 745 | physics | 14 | `phys.stat.entropy-statistical` | Statistical Definition of Entropy |
| 746 | physics | 14 | `phys.stat.free-energy` | Helmholtz and Gibbs Free Energy |
| 747 | physics | 14 | `phys.stat.grand-canonical-ensemble` | Grand Canonical Ensemble |
| 748 | physics | 14 | `phys.stat.fluctuations-correlations` | Fluctuations, Response Functions, and Correlations |
| 749 | english | 14 | `eng.vocab.academic-vocabulary` | Academic Vocabulary |
| 750 | english | 14 | `eng.vocab.semantic-fields` | Semantic Fields |
| 751 | english | 14 | `eng.grammar.sentence-types-by-function` | Sentence Types by Function |
| 752 | english | 14 | `eng.grammar.phrases` | Phrases |
| 753 | english | 14 | `eng.grammar.tense-consistency` | Tense Consistency |
| 754 | english | 14 | `eng.grammar.conditionals` | Conditional Sentences |
| 755 | english | 14 | `eng.grammar.participles-and-participial-phrases` | Participles and Participial Phrases |
| 756 | english | 14 | `eng.grammar.pronoun-antecedent-agreement` | Pronoun-Antecedent Agreement |
| 757 | english | 14 | `eng.grammar.comparatives-and-superlatives` | Comparatives and Superlatives |
| 758 | english | 14 | `eng.reading.main-idea-and-details` | Main Idea and Supporting Details |
| 759 | english | 14 | `eng.listening.critical-listening` | Critical Listening |
| 760 | english | 14 | `eng.speaking.public-speaking-basics` | Public Speaking Basics |
| 761 | chemistry | 14 | `chem.state.liquids` | Liquid State Properties |
| 762 | chemistry | 14 | `chem.elect.standard-electrode` | Standard Electrode Potential |
| 763 | chemistry | 14 | `chem.elect.electrolysis` | Electrolysis and Faraday's Laws |
| 764 | chemistry | 14 | `chem.elect.batteries` | Batteries and Fuel Cells |
| 765 | chemistry | 14 | `chem.elect.corrosion` | Corrosion |
| 766 | chemistry | 14 | `chem.coord.isomerism` | Isomerism in Complexes |
| 767 | chemistry | 14 | `chem.coord.bonding` | Bonding in Complexes |
| 768 | chemistry | 14 | `chem.coord.applications` | Applications of Coordination Chemistry |
| 769 | chemistry | 14 | `chem.sblock.water` | Chemistry of Water |
| 770 | chemistry | 14 | `chem.dblock.organometallics` | Organometallic Chemistry |
| 771 | chemistry | 14 | `chem.org.reactive-intermediates` | Reactive Intermediates |
| 772 | chemistry | 14 | `chem.hyd.arenes` | Benzene and Arenes |
| 773 | chemistry | 14 | `chem.hyd.conformations` | Conformational Analysis |
| 774 | chemistry | 14 | `chem.hyd.petroleum` | Petroleum Refining |
| 775 | chemistry | 14 | `chem.hal.introduction` | Haloalkanes and Haloarenes |
| 776 | biology | 14 | `bio.evo.modern-synthesis-speciation` | Modern Synthesis and Speciation |
| 777 | biology | 14 | `bio.biotech.biotech-principles` | Principles of Biotechnology |
| 778 | computer_science | 14 | `cs.data.comprehensions-iterators` | Comprehensions, Iterators and Generators |
| 779 | computer_science | 14 | `cs.func.lambda-functional` | Lambda Expressions and Functional Tools |
| 780 | computer_science | 14 | `cs.struct.stacks` | Stacks |
| 781 | computer_science | 14 | `cs.struct.elementary-sorts` | Elementary Sorting — Bubble, Selection, Insertion |
| 782 | computer_science | 14 | `cs.oop.encapsulation-abstraction` | Encapsulation and Abstraction |
| 783 | computer_science | 14 | `cs.db.er-modeling` | Entity-Relationship Modeling |
| 784 | computer_science | 14 | `cs.se.version-control-git` | Version Control with Git |
| 785 | mathematics | 15 | `math.found.complex-numbers` | Complex Numbers |
| 786 | mathematics | 15 | `math.arith.column-addition` | Column Addition |
| 787 | mathematics | 15 | `math.arith.borrowing` | Borrowing (Regrouping in Subtraction) |
| 788 | mathematics | 15 | `math.arith.negative-numbers` | Negative Numbers |
| 789 | mathematics | 15 | `math.arith.multiplication-table` | Multiplication Table |
| 790 | mathematics | 15 | `math.arith.division` | Division |
| 791 | mathematics | 15 | `math.arith.exponentiation` | Exponentiation |
| 792 | mathematics | 15 | `math.geom.coordinate-plane` | Coordinate Plane |
| 793 | mathematics | 15 | `math.func.real-valued-function` | Real-Valued Function |
| 794 | mathematics | 15 | `math.prob.martingale` | Martingale |
| 795 | mathematics | 15 | `math.disc.counting-principles` | Counting Principles |
| 796 | mathematics | 15 | `math.abst.second-isomorphism-theorem` | Second and Third Isomorphism Theorems |
| 797 | mathematics | 15 | `math.abst.algebraic-extension` | Algebraic Extension |
| 798 | mathematics | 15 | `math.real.completeness` | Completeness of ℝ |
| 799 | mathematics | 15 | `math.real.metric-space` | Metric Space |
| 800 | physics | 15 | `phys.mech.canonical-transformations` | Canonical Transformations and Generating Functions |
| 801 | physics | 15 | `phys.mod.nuclear-reactions` | Nuclear Reactions and Q-Value |
| 802 | physics | 15 | `phys.qm.operators` | Quantum Operators and Observables |
| 803 | physics | 15 | `phys.qm.particle-in-box` | Particle in an Infinite Square Well |
| 804 | physics | 15 | `phys.qm.harmonic-oscillator-qm` | Quantum Harmonic Oscillator |
| 805 | physics | 15 | `phys.qm.quantum-tunneling` | Quantum Tunneling |
| 806 | physics | 15 | `phys.rel.mass-energy` | Mass-Energy Equivalence: E=mc² |
| 807 | physics | 15 | `phys.stat.chemical-potential` | Chemical Potential and Thermodynamic Equilibrium |
| 808 | physics | 15 | `phys.stat.phase-transitions` | Phase Transitions and Landau Mean-Field Theory |
| 809 | english | 15 | `eng.grammar.question-formation` | Question Formation |
| 810 | english | 15 | `eng.grammar.negation` | Negation |
| 811 | english | 15 | `eng.grammar.clauses` | Independent and Dependent Clauses |
| 812 | english | 15 | `eng.grammar.active-and-passive-voice` | Active and Passive Voice |
| 813 | english | 15 | `eng.grammar.direct-and-indirect-speech` | Direct and Indirect Speech |
| 814 | english | 15 | `eng.grammar.capitalization-rules` | Capitalization Rules |
| 815 | english | 15 | `eng.reading.inference-in-reading` | Inference in Reading |
| 816 | english | 15 | `eng.reading.summarizing` | Summarizing |
| 817 | english | 15 | `eng.reading.text-structure` | Text Structure |
| 818 | english | 15 | `eng.speaking.presentation-skills` | Presentation Skills |
| 819 | chemistry | 15 | `chem.state.phase-diagram` | Phase Diagrams |
| 820 | chemistry | 15 | `chem.sol.vapour-pressure` | Vapour Pressure of Solutions |
| 821 | chemistry | 15 | `chem.elect.nernst` | Nernst Equation |
| 822 | chemistry | 15 | `chem.elect.industrial` | Industrial Electrolysis |
| 823 | chemistry | 15 | `chem.surface.surfactants` | Surfactants and Micelles |
| 824 | chemistry | 15 | `chem.org.mechanisms` | Organic Reaction Mechanisms |
| 825 | chemistry | 15 | `chem.hyd.polycyclic` | Polycyclic and Heterocyclic Systems |
| 826 | chemistry | 15 | `chem.hal.sn1` | SN1 Mechanism |
| 827 | chemistry | 15 | `chem.hal.sn2` | SN2 Mechanism |
| 828 | chemistry | 15 | `chem.hal.haloarenes` | Haloarenes |
| 829 | chemistry | 15 | `chem.hal.cfcs` | Polyhalogen Compounds and CFCs |
| 830 | chemistry | 15 | `chem.nitro.nitro-compounds` | Nitro Compounds |
| 831 | biology | 15 | `bio.evo.human-evolution` | Human Evolution |
| 832 | biology | 15 | `bio.biotech.biotech-process-applications` | Biotechnology Process Applications |
| 833 | computer_science | 15 | `cs.func.modules-packages` | Modules and Packages |
| 834 | computer_science | 15 | `cs.struct.queues` | Queues |
| 835 | computer_science | 15 | `cs.struct.efficient-sorts` | Efficient Sorting — Merge Sort and Quick Sort |
| 836 | computer_science | 15 | `cs.oop.inheritance` | Inheritance |
| 837 | computer_science | 15 | `cs.db.relational-model` | The Relational Model |
| 838 | computer_science | 15 | `cs.se.software-testing` | Software Testing Fundamentals |
| 839 | mathematics | 16 | `math.arith.absolute-value` | Absolute Value |
| 840 | mathematics | 16 | `math.arith.integer-arithmetic` | Integer Arithmetic |
| 841 | mathematics | 16 | `math.arith.long-multiplication` | Long Multiplication |
| 842 | mathematics | 16 | `math.arith.mental-multiplication` | Mental Multiplication |
| 843 | mathematics | 16 | `math.arith.remainder` | Remainder |
| 844 | mathematics | 16 | `math.arith.divisor-dividend` | Divisor and Dividend |
| 845 | mathematics | 16 | `math.arith.order-of-operations` | Order of Operations |
| 846 | mathematics | 16 | `math.arith.exponent-rules` | Exponent Rules |
| 847 | mathematics | 16 | `math.arith.square-numbers` | Perfect Squares |
| 848 | mathematics | 16 | `math.arith.cube-numbers` | Perfect Cubes |
| 849 | mathematics | 16 | `math.nt.divisibility` | Divisibility |
| 850 | mathematics | 16 | `math.nt.division-algorithm` | Division Algorithm |
| 851 | mathematics | 16 | `math.geom.circle-equation` | Equation of a Circle |
| 852 | mathematics | 16 | `math.geom.x-y-coordinates` | Cartesian Coordinates |
| 853 | mathematics | 16 | `math.geom.quadrants` | Quadrants |
| 854 | mathematics | 16 | `math.geom.midpoint-formula` | Midpoint Formula |
| 855 | mathematics | 16 | `math.geom.slope` | Slope |
| 856 | mathematics | 16 | `math.geom.transformations` | Geometric Transformations |
| 857 | mathematics | 16 | `math.geom.vectors-2d` | Vectors in 2D |
| 858 | mathematics | 16 | `math.func.graph-of-function` | Graph of a Function |
| 859 | mathematics | 16 | `math.calc.limits` | Limit of a Function |
| 860 | mathematics | 16 | `math.calc.parametric-curves` | Parametric Equations and Curves |
| 861 | mathematics | 16 | `math.prob.classical-probability` | Classical Probability |
| 862 | mathematics | 16 | `math.disc.permutations` | Permutations |
| 863 | mathematics | 16 | `math.disc.pigeonhole` | Pigeonhole Principle |
| 864 | mathematics | 16 | `math.abst.galois-theory` | Galois Theory |
| 865 | mathematics | 16 | `math.real.sup-inf` | Supremum and Infimum |
| 866 | mathematics | 16 | `math.real.archimedean` | Archimedean Property |
| 867 | mathematics | 16 | `math.real.convergence-sequences` | Convergence of Sequences |
| 868 | mathematics | 16 | `math.real.open-sets` | Open and Closed Sets |
| 869 | physics | 16 | `phys.mech.hamilton-jacobi-equation` | Hamilton-Jacobi Equation and Action-Angle Variables |
| 870 | physics | 16 | `phys.mod.binding-energy` | Nuclear Binding Energy and Mass Defect |
| 871 | physics | 16 | `phys.qm.hydrogen-atom-qm` | Quantum Treatment of Hydrogen Atom |
| 872 | physics | 16 | `phys.qm.spin` | Electron Spin and the Stern-Gerlach Experiment |
| 873 | physics | 16 | `phys.rel.spacetime` | Spacetime Interval and Four-Vectors |
| 874 | physics | 16 | `phys.stat.ising-model` | Ising Model |
| 875 | physics | 16 | `phys.particle.four-forces` | Four Fundamental Forces |
| 876 | english | 16 | `eng.grammar.simple-sentences` | Simple Sentences |
| 877 | english | 16 | `eng.grammar.end-punctuation` | End Punctuation |
| 878 | english | 16 | `eng.reading.predicting-and-confirming` | Predicting and Confirming |
| 879 | english | 16 | `eng.reading.genre-recognition` | Genre Recognition |
| 880 | english | 16 | `eng.reading.authors-purpose-and-tone` | Author's Purpose and Tone |
| 881 | english | 16 | `eng.reading.compare-and-contrast-texts` | Comparing and Contrasting Texts |
| 882 | english | 16 | `eng.speaking.debate-skills` | Debate Skills |
| 883 | chemistry | 16 | `chem.sol.colligative` | Colligative Properties |
| 884 | chemistry | 16 | `chem.sol.activity` | Activity and Non-ideal Solutions |
| 885 | chemistry | 16 | `chem.elect.concentration-cell` | Concentration Cells |
| 886 | chemistry | 16 | `chem.org.arrow-pushing` | Electron Flow and Arrow Notation |
| 887 | chemistry | 16 | `chem.org.pericyclic` | Pericyclic Reactions |
| 888 | chemistry | 16 | `chem.hyd.alkenes` | Alkenes |
| 889 | chemistry | 16 | `chem.hal.elimination` | Elimination Reactions |
| 890 | chemistry | 16 | `chem.hal.grignard` | Grignard and Organolithium Reagents |
| 891 | chemistry | 16 | `chem.alc.alcohols` | Alcohols |
| 892 | biology | 16 | `bio.biotech.genomics-proteomics` | Genomics and Proteomics |
| 893 | computer_science | 16 | `cs.func.decorators` | Decorators |
| 894 | computer_science | 16 | `cs.struct.deques-priority-queues` | Deques and Priority Queues |
| 895 | computer_science | 16 | `cs.struct.linked-lists` | Singly Linked Lists |
| 896 | computer_science | 16 | `cs.oop.polymorphism-overloading` | Polymorphism and Operator Overloading |
| 897 | computer_science | 16 | `cs.db.normalisation` | Normalisation |
| 898 | computer_science | 16 | `cs.db.sql-ddl-dml` | SQL — DDL and DML Basics |
| 899 | computer_science | 16 | `cs.ds.numpy-arrays` | NumPy for Numerical Computing |
| 900 | mathematics | 17 | `math.arith.long-division` | Long Division |
| 901 | mathematics | 17 | `math.arith.fraction-equivalence` | Equivalent Fractions |
| 902 | mathematics | 17 | `math.arith.fraction-multiplication` | Multiplication and Division of Fractions |
| 903 | mathematics | 17 | `math.arith.fraction-reciprocal` | Reciprocal |
| 904 | mathematics | 17 | `math.arith.mixed-numbers` | Mixed Numbers |
| 905 | mathematics | 17 | `math.arith.improper-fractions` | Improper Fractions |
| 906 | mathematics | 17 | `math.arith.decimals` | Decimals |
| 907 | mathematics | 17 | `math.arith.ratios` | Ratio |
| 908 | mathematics | 17 | `math.arith.square-roots` | Square Roots |
| 909 | mathematics | 17 | `math.arith.mental-arithmetic` | Mental Arithmetic |
| 910 | mathematics | 17 | `math.nt.divisibility-rules` | Divisibility Rules |
| 911 | mathematics | 17 | `math.nt.prime-number` | Prime Number |
| 912 | mathematics | 17 | `math.nt.modular-arithmetic` | Modular Arithmetic |
| 913 | mathematics | 17 | `math.nt.induction-applications` | Induction in Number Theory |
| 914 | mathematics | 17 | `math.alg.expression` | Algebraic Expression |
| 915 | mathematics | 17 | `math.geom.pythagorean-theorem` | Pythagorean Theorem |
| 916 | mathematics | 17 | `math.geom.line-equation` | Equations of Lines |
| 917 | mathematics | 17 | `math.geom.translation` | Translation |
| 918 | mathematics | 17 | `math.geom.reflection` | Reflection |
| 919 | mathematics | 17 | `math.geom.vectors-3d` | Vectors in 3D |
| 920 | mathematics | 17 | `math.func.zero-of-function` | Zero of a Function |
| 921 | mathematics | 17 | `math.func.even-odd-functions` | Even and Odd Functions |
| 922 | mathematics | 17 | `math.func.transformations-functions` | Transformations of Functions |
| 923 | mathematics | 17 | `math.func.linear-function` | Linear Function |
| 924 | mathematics | 17 | `math.seq.convergent` | Convergent Sequence |
| 925 | mathematics | 17 | `math.calc.limit-laws` | Limit Laws |
| 926 | mathematics | 17 | `math.calc.one-sided-limits` | One-Sided Limits |
| 927 | mathematics | 17 | `math.calc.limits-at-infinity` | Limits at Infinity |
| 928 | mathematics | 17 | `math.calc.continuity` | Continuity |
| 929 | mathematics | 17 | `math.calc.derivative-intro` | Slope of Tangent and Rate of Change |
| 930 | mathematics | 17 | `math.calc.riemann-sums` | Riemann Sums |
| 931 | mathematics | 17 | `math.calc.sequence-limits` | Limits of Sequences (Calculus) |
| 932 | mathematics | 17 | `math.linalg.vector` | Vector |
| 933 | mathematics | 17 | `math.prob.convergence-types` | Modes of Convergence |
| 934 | mathematics | 17 | `math.stats.population-sample` | Population and Sample |
| 935 | mathematics | 17 | `math.disc.combinations` | Combinations |
| 936 | mathematics | 17 | `math.disc.asymptotic-notation` | Asymptotic Notation |
| 937 | mathematics | 17 | `math.abst.galois-group` | Galois Group |
| 938 | mathematics | 17 | `math.real.cauchy-sequence` | Cauchy Sequence |
| 939 | mathematics | 17 | `math.real.series-rigorous` | Series (Rigorous) |
| 940 | mathematics | 17 | `math.real.compactness` | Compactness |
| 941 | mathematics | 17 | `math.real.connectedness` | Connectedness |
| 942 | mathematics | 17 | `math.real.pointwise-convergence` | Pointwise Convergence |
| 943 | mathematics | 17 | `math.graph.ramsey-theory` | Ramsey Theory |
| 944 | physics | 17 | `phys.mod.nuclear-fission` | Nuclear Fission and Chain Reactions |
| 945 | physics | 17 | `phys.mod.nuclear-fusion` | Nuclear Fusion and Stellar Energy |
| 946 | physics | 17 | `phys.mod.nuclear-models` | Nuclear Models: Shell Model |
| 947 | physics | 17 | `phys.qm.pauli-exclusion` | Pauli Exclusion Principle |
| 948 | physics | 17 | `phys.qm.perturbation-theory` | Time-Independent Perturbation Theory |
| 949 | physics | 17 | `phys.qm.selection-rules` | Selection Rules and Transition Probabilities |
| 950 | physics | 17 | `phys.qm.angular-momentum-addition` | Addition of Angular Momenta and Clebsch-Gordan Coefficients |
| 951 | physics | 17 | `phys.qm.density-matrix` | Density Matrix and Mixed Quantum States |
| 952 | physics | 17 | `phys.stat.phase-transitions-critical-phenomena` | Critical Phenomena, Scaling Laws, and Universality |
| 953 | physics | 17 | `phys.stat.monte-carlo-basics` | Monte Carlo Methods in Statistical Physics |
| 954 | physics | 17 | `phys.particle.particle-classification` | Particle Classification: Hadrons and Leptons |
| 955 | physics | 17 | `phys.particle.gauge-bosons` | Gauge Bosons and Force Carriers |
| 956 | english | 17 | `eng.grammar.compound-sentences` | Compound Sentences |
| 957 | english | 17 | `eng.grammar.comma-usage` | Comma Usage |
| 958 | english | 17 | `eng.grammar.sentence-fragments` | Sentence Fragments |
| 959 | english | 17 | `eng.reading.close-reading` | Close Reading |
| 960 | english | 17 | `eng.writing.sentence-writing` | Sentence Writing |
| 961 | chemistry | 17 | `chem.sol.osmosis` | Osmosis and Osmotic Pressure |
| 962 | chemistry | 17 | `chem.hyd.alkynes` | Alkynes |
| 963 | chemistry | 17 | `chem.alc.phenols` | Phenols |
| 964 | chemistry | 17 | `chem.alc.ethers` | Ethers |
| 965 | chemistry | 17 | `chem.alc.diols` | Diols and Polyols |
| 966 | chemistry | 17 | `chem.carb.aldehydes` | Aldehydes |
| 967 | chemistry | 17 | `chem.nitro.amines` | Amines |
| 968 | chemistry | 17 | `chem.poly.addition` | Addition Polymerization |
| 969 | biology | 17 | `bio.biotech.crispr-genome-editing` | CRISPR and Genome Editing |
| 970 | biology | 17 | `bio.bioinfo.bioinformatics-intro` | Introduction to Bioinformatics |
| 971 | computer_science | 17 | `cs.struct.doubly-circular-lists` | Doubly and Circular Linked Lists |
| 972 | computer_science | 17 | `cs.struct.trees` | Trees |
| 973 | computer_science | 17 | `cs.oop.class-static-methods` | Class Methods and Static Methods |
| 974 | computer_science | 17 | `cs.db.sql-queries-functions` | SQL — Queries and Aggregate Functions |
| 975 | computer_science | 17 | `cs.ds.pandas-dataframes` | Pandas for Data Analysis |
| 976 | mathematics | 18 | `math.arith.decimal-operations` | Decimal Operations |
| 977 | mathematics | 18 | `math.arith.terminating-decimals` | Terminating Decimals |
| 978 | mathematics | 18 | `math.arith.repeating-decimals` | Repeating Decimals |
| 979 | mathematics | 18 | `math.arith.percentages` | Percentages |
| 980 | mathematics | 18 | `math.arith.proportion` | Proportion |
| 981 | mathematics | 18 | `math.arith.unit-rate` | Unit Rate |
| 982 | mathematics | 18 | `math.arith.rounding` | Rounding |
| 983 | mathematics | 18 | `math.arith.irrational-roots` | Irrational Square Roots |
| 984 | mathematics | 18 | `math.arith.scientific-notation` | Scientific Notation |
| 985 | mathematics | 18 | `math.nt.composite-number` | Composite Number |
| 986 | mathematics | 18 | `math.nt.sieve-of-eratosthenes` | Sieve of Eratosthenes |
| 987 | mathematics | 18 | `math.nt.prime-factorization` | Prime Factorization |
| 988 | mathematics | 18 | `math.nt.congruence` | Congruence |
| 989 | mathematics | 18 | `math.nt.fermats-little-theorem` | Fermat's Little Theorem |
| 990 | mathematics | 18 | `math.nt.prime-distribution` | Distribution of Primes |
| 991 | mathematics | 18 | `math.alg.term` | Term |
| 992 | mathematics | 18 | `math.alg.equation` | Equation |
| 993 | mathematics | 18 | `math.alg.polynomial` | Polynomial |
| 994 | mathematics | 18 | `math.alg.exponent-rules` | Exponent Rules (Algebraic) |
| 995 | mathematics | 18 | `math.geom.pythagorean-converse` | Converse of the Pythagorean Theorem |
| 996 | mathematics | 18 | `math.geom.similar-triangles` | Similar Triangles |
| 997 | mathematics | 18 | `math.geom.distance-formula` | Distance Formula |
| 998 | mathematics | 18 | `math.geom.dilation` | Dilation |
| 999 | mathematics | 18 | `math.geom.cross-product` | Cross Product |
| 1000 | mathematics | 18 | `math.geom.differential-geometry-curves` | Curves in Space |
| 1001 | mathematics | 18 | `math.seq.divergent-sequence` | Divergent Sequence |
| 1002 | mathematics | 18 | `math.seq.series-convergence` | Convergence of Series |
| 1003 | mathematics | 18 | `math.calc.squeeze-theorem` | Squeeze Theorem |
| 1004 | mathematics | 18 | `math.calc.continuity-types` | Types of Discontinuity |
| 1005 | mathematics | 18 | `math.calc.ivt` | Intermediate Value Theorem |
| 1006 | mathematics | 18 | `math.calc.derivative-definition` | Derivative (Definition) |
| 1007 | mathematics | 18 | `math.calc.definite-integral` | Definite Integral |
| 1008 | mathematics | 18 | `math.calc.line-integrals` | Line Integrals |
| 1009 | mathematics | 18 | `math.linalg.vector-addition` | Vector Addition |
| 1010 | mathematics | 18 | `math.linalg.scalar-multiplication` | Scalar Multiplication |
| 1011 | mathematics | 18 | `math.linalg.dot-product` | Dot Product |
| 1012 | mathematics | 18 | `math.linalg.matrix` | Matrix |
| 1013 | mathematics | 18 | `math.prob.combinatorial-probability` | Combinatorial Probability |
| 1014 | mathematics | 18 | `math.stats.descriptive-statistics` | Descriptive Statistics |
| 1015 | mathematics | 18 | `math.stats.sampling` | Sampling Methods |
| 1016 | mathematics | 18 | `math.disc.binomial-theorem` | Binomial Theorem |
| 1017 | mathematics | 18 | `math.disc.combinatorics` | Combinatorics |
| 1018 | mathematics | 18 | `math.disc.stars-bars` | Stars and Bars |
| 1019 | mathematics | 18 | `math.disc.inclusion-exclusion` | Inclusion-Exclusion Principle |
| 1020 | mathematics | 18 | `math.abst.sylow-theorems` | Sylow Theorems |
| 1021 | mathematics | 18 | `math.abst.finite-field` | Finite Field |
| 1022 | mathematics | 18 | `math.abst.galois-correspondence` | Fundamental Theorem of Galois Theory |
| 1023 | mathematics | 18 | `math.real.absolute-convergence` | Absolute Convergence |
| 1024 | mathematics | 18 | `math.real.completeness-metric` | Completeness of Metric Spaces |
| 1025 | mathematics | 18 | `math.real.continuity-rigorous` | Continuity (ε-δ) |
| 1026 | mathematics | 18 | `math.opt.convex-set` | Convex Set |
| 1027 | mathematics | 18 | `math.graph.shortest-path` | Shortest Path Algorithms |
| 1028 | physics | 18 | `phys.qm.variational-method` | Variational Method and Variational Principle |
| 1029 | physics | 18 | `phys.qm.identical-particles` | Identical Particles and the Symmetrization Postulate |
| 1030 | physics | 18 | `phys.qm.scattering-theory-born-approximation` | Scattering Theory and the Born Approximation |
| 1031 | physics | 18 | `phys.stat.fermi-dirac` | Fermi-Dirac Statistics |
| 1032 | physics | 18 | `phys.astro.stellar-structure` | Stellar Structure and the Main Sequence |
| 1033 | physics | 18 | `phys.particle.antimatter` | Antimatter and Antiparticles |
| 1034 | physics | 18 | `phys.particle.quarks` | Quarks |
| 1035 | physics | 18 | `phys.particle.leptons` | Leptons |
| 1036 | english | 18 | `eng.grammar.complex-sentences` | Complex Sentences |
| 1037 | english | 18 | `eng.grammar.parallel-structure` | Parallel Structure |
| 1038 | english | 18 | `eng.grammar.apostrophes` | Apostrophes |
| 1039 | english | 18 | `eng.grammar.quotation-marks` | Quotation Marks |
| 1040 | english | 18 | `eng.grammar.colons-semicolons-dashes` | Colons, Semicolons, and Dashes |
| 1041 | english | 18 | `eng.grammar.run-on-sentences-and-comma-splices` | Run-On Sentences and Comma Splices |
| 1042 | english | 18 | `eng.reading.critical-reading` | Critical Reading |
| 1043 | english | 18 | `eng.writing.paragraph-structure` | Paragraph Structure |
| 1044 | english | 18 | `eng.literature.narrative-elements` | Narrative Elements |
| 1045 | chemistry | 18 | `chem.alc.epoxides` | Epoxides |
| 1046 | chemistry | 18 | `chem.alc.protection` | Protecting Group Strategy |
| 1047 | chemistry | 18 | `chem.carb.ketones` | Ketones |
| 1048 | chemistry | 18 | `chem.carb.carboxylic` | Carboxylic Acids |
| 1049 | chemistry | 18 | `chem.nitro.diazonium` | Diazonium Salts |
| 1050 | chemistry | 18 | `chem.nitro.heterocycles` | Nitrogen Heterocycles |
| 1051 | chemistry | 18 | `chem.bio.carbohydrates` | Carbohydrates |
| 1052 | biology | 18 | `bio.bioinfo.sequence-alignment` | Sequence Alignment |
| 1053 | biology | 18 | `bio.sys.systems-biology-intro` | Introduction to Systems Biology |
| 1054 | computer_science | 18 | `cs.struct.binary-search-trees` | Binary Search Trees |
| 1055 | computer_science | 18 | `cs.struct.heaps` | Heaps |
| 1056 | computer_science | 18 | `cs.struct.graphs-representation` | Graphs and Their Representations |
| 1057 | computer_science | 18 | `cs.oop.design-patterns-intro` | Introduction to Design Patterns |
| 1058 | computer_science | 18 | `cs.db.sql-joins-subqueries` | SQL — Joins and Subqueries |
| 1059 | computer_science | 18 | `cs.ds.data-visualisation` | Data Visualisation with Matplotlib |
| 1060 | mathematics | 19 | `math.arith.percentage-calculations` | Percentage Calculations |
| 1061 | mathematics | 19 | `math.arith.direct-variation` | Direct Variation |
| 1062 | mathematics | 19 | `math.arith.inverse-variation` | Inverse Variation |
| 1063 | mathematics | 19 | `math.arith.estimation` | Estimation |
| 1064 | mathematics | 19 | `math.arith.significant-figures` | Significant Figures |
| 1065 | mathematics | 19 | `math.nt.fundamental-theorem-arithmetic` | Fundamental Theorem of Arithmetic |
| 1066 | mathematics | 19 | `math.nt.gcd` | Greatest Common Divisor |
| 1067 | mathematics | 19 | `math.nt.residue-classes` | Residue Classes |
| 1068 | mathematics | 19 | `math.nt.eulers-theorem` | Euler's Theorem |
| 1069 | mathematics | 19 | `math.nt.eulers-totient` | Euler's Totient Function |
| 1070 | mathematics | 19 | `math.nt.primality-testing` | Primality Testing |
| 1071 | mathematics | 19 | `math.alg.coefficient` | Coefficient |
| 1072 | mathematics | 19 | `math.alg.solution-set` | Solution Set |
| 1073 | mathematics | 19 | `math.alg.degree` | Degree of a Polynomial |
| 1074 | mathematics | 19 | `math.alg.zero-exponent` | Zero Exponent |
| 1075 | mathematics | 19 | `math.alg.negative-exponent` | Negative Exponent |
| 1076 | mathematics | 19 | `math.alg.radicals` | Radical Expressions |
| 1077 | mathematics | 19 | `math.alg.exponential-function` | Exponential Function |
| 1078 | mathematics | 19 | `math.alg.inequality` | Inequality |
| 1079 | mathematics | 19 | `math.alg.binomial-theorem` | Binomial Theorem |
| 1080 | mathematics | 19 | `math.trig.right-triangle-trig` | Right-Triangle Trigonometry |
| 1081 | mathematics | 19 | `math.seq.divergence-test` | Divergence Test (nth Term Test) |
| 1082 | mathematics | 19 | `math.seq.comparison-test` | Comparison Test |
| 1083 | mathematics | 19 | `math.seq.ratio-test` | Ratio Test |
| 1084 | mathematics | 19 | `math.seq.root-test` | Root Test |
| 1085 | mathematics | 19 | `math.seq.alternating-series` | Alternating Series |
| 1086 | mathematics | 19 | `math.seq.harmonic-series` | Harmonic Series |
| 1087 | mathematics | 19 | `math.calc.differentiability` | Differentiability |
| 1088 | mathematics | 19 | `math.calc.derivative-rules` | Basic Differentiation Rules |
| 1089 | mathematics | 19 | `math.calc.lhopitals-rule` | L'Hôpital's Rule |
| 1090 | mathematics | 19 | `math.calc.mean-value-theorem` | Mean Value Theorem |
| 1091 | mathematics | 19 | `math.calc.linearization` | Linearization and Differentials |
| 1092 | mathematics | 19 | `math.calc.ftc-part1` | Fundamental Theorem of Calculus Part 1 |
| 1093 | mathematics | 19 | `math.calc.improper-integrals` | Improper Integrals |
| 1094 | mathematics | 19 | `math.calc.integral-area` | Area by Integration |
| 1095 | mathematics | 19 | `math.calc.power-series` | Power Series |
| 1096 | mathematics | 19 | `math.calc.multivariable-intro` | Introduction to Multivariable Calculus |
| 1097 | mathematics | 19 | `math.linalg.norm` | Vector Norm |
| 1098 | mathematics | 19 | `math.linalg.orthogonality` | Orthogonality |
| 1099 | mathematics | 19 | `math.linalg.cross-product` | Cross Product |
| 1100 | mathematics | 19 | `math.linalg.matrix-addition` | Matrix Addition |
| 1101 | mathematics | 19 | `math.linalg.matrix-multiplication` | Matrix Multiplication |
| 1102 | mathematics | 19 | `math.linalg.matrix-transpose` | Matrix Transpose |
| 1103 | mathematics | 19 | `math.linalg.vector-space` | Vector Space |
| 1104 | mathematics | 19 | `math.prob.continuous-rv` | Continuous Random Variable |
| 1105 | mathematics | 19 | `math.stats.measures-of-center` | Measures of Center |
| 1106 | mathematics | 19 | `math.stats.measures-of-spread` | Measures of Spread |
| 1107 | mathematics | 19 | `math.stats.data-visualization` | Data Visualization |
| 1108 | mathematics | 19 | `math.disc.derangements` | Derangements |
| 1109 | mathematics | 19 | `math.disc.recurrence-relation` | Recurrence Relation |
| 1110 | mathematics | 19 | `math.disc.graph-representation` | Graph Representation |
| 1111 | mathematics | 19 | `math.real.uniform-continuity` | Uniform Continuity |
| 1112 | mathematics | 19 | `math.real.extreme-value-theorem` | Extreme Value Theorem |
| 1113 | mathematics | 19 | `math.real.ivt` | Intermediate Value Theorem (Rigorous) |
| 1114 | mathematics | 19 | `math.real.differentiability-rigorous` | Differentiability (Rigorous) |
| 1115 | mathematics | 19 | `math.real.riemann-integral` | Riemann Integral (Rigorous) |
| 1116 | mathematics | 19 | `math.real.uniform-convergence` | Uniform Convergence |
| 1117 | mathematics | 19 | `math.real.baire-category` | Baire Category Theorem |
| 1118 | mathematics | 19 | `math.graph.extremal-graph-theory` | Extremal Graph Theory |
| 1119 | physics | 19 | `phys.qm.wkb-approximation` | WKB Approximation (Semiclassical Limit) |
| 1120 | physics | 19 | `phys.qm.s-matrix-basics` | S-Matrix and Scattering Amplitudes |
| 1121 | physics | 19 | `phys.astro.stellar-evolution` | Stellar Evolution and End States |
| 1122 | physics | 19 | `phys.astro.cosmology` | Big Bang Cosmology |
| 1123 | physics | 19 | `phys.particle.neutrinos` | Neutrinos |
| 1124 | physics | 19 | `phys.particle.hadron-quark-model` | Quark Model of Hadrons: Baryons and Mesons |
| 1125 | physics | 19 | `phys.particle.strong-interaction` | The Strong Interaction and Color Charge |
| 1126 | physics | 19 | `phys.mod.energy-bands` | Energy Bands in Solids |
| 1127 | english | 19 | `eng.grammar.sentence-combining` | Sentence Combining |
| 1128 | english | 19 | `eng.reading.evaluating-sources` | Evaluating Sources |
| 1129 | english | 19 | `eng.writing.topic-sentences` | Topic Sentences |
| 1130 | english | 19 | `eng.literature.plot-structure` | Plot Structure |
| 1131 | english | 19 | `eng.literature.character-development` | Character Development |
| 1132 | english | 19 | `eng.literature.setting-and-atmosphere` | Setting and Atmosphere |
| 1133 | english | 19 | `eng.literature.point-of-view` | Point of View |
| 1134 | english | 19 | `eng.literature.drama-basics` | Drama Basics |
| 1135 | chemistry | 19 | `chem.carb.alpha-reactions` | Alpha-Carbon Reactions |
| 1136 | chemistry | 19 | `chem.carb.derivatives` | Carboxylic Acid Derivatives |
| 1137 | chemistry | 19 | `chem.carb.spectro` | Spectroscopic ID of Carbonyls |
| 1138 | chemistry | 19 | `chem.nitro.amino-acids` | Amino Acids |
| 1139 | biology | 19 | `bio.bioinfo.phylogenetics-computational` | Computational Phylogenetics |
| 1140 | biology | 19 | `bio.bioinfo.structural-bioinformatics` | Structural Bioinformatics |
| 1141 | biology | 19 | `bio.sys.gene-regulatory-networks` | Gene Regulatory Networks |
| 1142 | computer_science | 19 | `cs.struct.balanced-trees` | Balanced Search Trees |
| 1143 | computer_science | 19 | `cs.struct.graph-traversal` | Graph Traversal — BFS and DFS |
| 1144 | computer_science | 19 | `cs.db.transactions-acid` | Transactions and the ACID Properties |
| 1145 | computer_science | 19 | `cs.db.mysql-python` | Connecting Python to MySQL |
| 1146 | computer_science | 19 | `cs.se.agile-design-principles` | Agile Practices and Software Design Principles |
| 1147 | computer_science | 19 | `cs.ds.intro-machine-learning` | Introduction to Machine Learning |
| 1148 | mathematics | 20 | `math.arith.fraction-simplification` | Fraction Simplification |
| 1149 | mathematics | 20 | `math.arith.percentage-change` | Percentage Change |
| 1150 | mathematics | 20 | `math.nt.euclidean-algorithm` | Euclidean Algorithm |
| 1151 | mathematics | 20 | `math.nt.lcm` | Least Common Multiple |
| 1152 | mathematics | 20 | `math.nt.chinese-remainder-theorem` | Chinese Remainder Theorem |
| 1153 | mathematics | 20 | `math.alg.like-terms` | Like Terms |
| 1154 | mathematics | 20 | `math.alg.fractional-exponent` | Fractional Exponent |
| 1155 | mathematics | 20 | `math.alg.simplifying-radicals` | Simplifying Radical Expressions |
| 1156 | mathematics | 20 | `math.alg.radical-equations` | Radical Equations |
| 1157 | mathematics | 20 | `math.alg.exponential-equations` | Exponential Equations |
| 1158 | mathematics | 20 | `math.alg.logarithm` | Logarithm |
| 1159 | mathematics | 20 | `math.alg.pascals-triangle` | Pascal's Triangle |
| 1160 | mathematics | 20 | `math.geom.curvature` | Curvature |
| 1161 | mathematics | 20 | `math.trig.basic-ratios` | Six Trigonometric Ratios |
| 1162 | mathematics | 20 | `math.trig.unit-circle` | Unit Circle |
| 1163 | mathematics | 20 | `math.trig.law-of-sines` | Law of Sines |
| 1164 | mathematics | 20 | `math.trig.law-of-cosines` | Law of Cosines |
| 1165 | mathematics | 20 | `math.func.exponential-function` | Exponential Function |
| 1166 | mathematics | 20 | `math.seq.integral-test` | Integral Test |
| 1167 | mathematics | 20 | `math.seq.absolute-convergence` | Absolute and Conditional Convergence |
| 1168 | mathematics | 20 | `math.calc.product-rule` | Product Rule |
| 1169 | mathematics | 20 | `math.calc.chain-rule` | Chain Rule |
| 1170 | mathematics | 20 | `math.calc.higher-order-derivatives` | Higher-Order Derivatives |
| 1171 | mathematics | 20 | `math.calc.rolles-theorem` | Rolle's Theorem |
| 1172 | mathematics | 20 | `math.calc.increasing-decreasing` | Increasing and Decreasing Functions |
| 1173 | mathematics | 20 | `math.calc.critical-points` | Critical Points |
| 1174 | mathematics | 20 | `math.calc.antiderivatives` | Antiderivatives |
| 1175 | mathematics | 20 | `math.calc.volume-revolution` | Volumes of Revolution |
| 1176 | mathematics | 20 | `math.calc.arc-length` | Arc Length |
| 1177 | mathematics | 20 | `math.calc.radius-of-convergence` | Radius of Convergence |
| 1178 | mathematics | 20 | `math.calc.partial-derivatives` | Partial Derivatives |
| 1179 | mathematics | 20 | `math.calc.multiple-integrals` | Multiple Integrals |
| 1180 | mathematics | 20 | `math.linalg.unit-vector` | Unit Vector |
| 1181 | mathematics | 20 | `math.linalg.symmetric-matrix` | Symmetric Matrix |
| 1182 | mathematics | 20 | `math.linalg.determinant` | Determinant |
| 1183 | mathematics | 20 | `math.linalg.subspace` | Subspace |
| 1184 | mathematics | 20 | `math.linalg.linear-map` | Linear Map |
| 1185 | mathematics | 20 | `math.linalg.inner-product` | Inner Product |
| 1186 | mathematics | 20 | `math.linalg.distance` | Distance in Vector Spaces |
| 1187 | mathematics | 20 | `math.linalg.angle-vectors` | Angle Between Vectors |
| 1188 | mathematics | 20 | `math.prob.pdf` | Probability Density Function |
| 1189 | mathematics | 20 | `math.prob.generating-function` | Probability Generating Function |
| 1190 | mathematics | 20 | `math.prob.markov-chain` | Markov Chain |
| 1191 | mathematics | 20 | `math.stats.percentile` | Percentile |
| 1192 | mathematics | 20 | `math.disc.generating-functions` | Generating Functions |
| 1193 | mathematics | 20 | `math.disc.catalan-numbers` | Catalan Numbers |
| 1194 | mathematics | 20 | `math.disc.stirling-numbers` | Stirling Numbers |
| 1195 | mathematics | 20 | `math.real.lipschitz-continuity` | Lipschitz Continuity |
| 1196 | mathematics | 20 | `math.real.mvt` | Mean Value Theorem (Rigorous) |
| 1197 | mathematics | 20 | `math.real.riemann-integrability` | Riemann Integrability |
| 1198 | mathematics | 20 | `math.real.ftc-rigorous` | Fundamental Theorem of Calculus (Rigorous) |
| 1199 | mathematics | 20 | `math.real.weierstrass-approximation` | Weierstrass Approximation Theorem |
| 1200 | mathematics | 20 | `math.top.smooth-manifold` | Smooth Manifold |
| 1201 | mathematics | 20 | `math.fnal.normed-space` | Normed Space |
| 1202 | mathematics | 20 | `math.num.floating-point` | Floating-Point Arithmetic |
| 1203 | mathematics | 20 | `math.num.root-finding` | Root-Finding Methods |
| 1204 | mathematics | 20 | `math.opt.dynamic-programming` | Dynamic Programming |
| 1205 | physics | 20 | `phys.astro.dark-matter` | Dark Matter and Dark Energy |
| 1206 | physics | 20 | `phys.astro.black-holes` | Black Holes and Schwarzschild Radius |
| 1207 | physics | 20 | `phys.particle.weak-interaction` | The Weak Interaction |
| 1208 | physics | 20 | `phys.particle.conservation-laws` | Conservation Laws in Particle Interactions |
| 1209 | physics | 20 | `phys.mod.semiconductor-classification` | Conductors, Insulators, and Semiconductors |
| 1210 | english | 20 | `eng.reading.reading-across-genres` | Reading Across Genres |
| 1211 | english | 20 | `eng.writing.supporting-details` | Supporting Details |
| 1212 | english | 20 | `eng.literature.theme-and-message` | Theme and Message |
| 1213 | english | 20 | `eng.literature.foreshadowing-and-suspense` | Foreshadowing and Suspense |
| 1214 | english | 20 | `eng.literature.dramatic-structure` | Dramatic Structure |
| 1215 | english | 20 | `eng.literature.prose-fiction` | Prose Fiction |
| 1216 | english | 20 | `eng.linguistics.what-is-linguistics` | What Is Linguistics? |
| 1217 | english | 20 | `eng.communication.media-literacy` | Media Literacy |
| 1218 | chemistry | 20 | `chem.carb.named-reactions` | Named Carbonyl Reactions |
| 1219 | chemistry | 20 | `chem.bio.proteins` | Proteins |
| 1220 | chemistry | 20 | `chem.bio.lipids` | Lipids |
| 1221 | chemistry | 20 | `chem.poly.condensation` | Condensation Polymerization |
| 1222 | biology | 20 | `bio.sys.metabolic-network-modelling` | Metabolic Network Modelling |
| 1223 | computer_science | 20 | `cs.struct.shortest-path-algorithms` | Shortest Path Algorithms |
| 1224 | computer_science | 20 | `cs.db.indexing-query-optimisation` | Indexing and Query Optimisation |
| 1225 | computer_science | 20 | `cs.db.nosql-intro` | Introduction to NoSQL Databases |
| 1226 | computer_science | 20 | `cs.ds.supervised-learning-models` | Supervised Learning Models |
| 1227 | computer_science | 20 | `cs.ds.unsupervised-learning-models` | Unsupervised Learning Models |
| 1228 | mathematics | 21 | `math.arith.fraction-addition` | Addition and Subtraction of Fractions |
| 1229 | mathematics | 21 | `math.nt.extended-euclidean-algorithm` | Extended Euclidean Algorithm |
| 1230 | mathematics | 21 | `math.nt.continued-fractions` | Continued Fractions |
| 1231 | mathematics | 21 | `math.alg.simplification` | Algebraic Simplification |
| 1232 | mathematics | 21 | `math.alg.polynomial-operations` | Polynomial Operations |
| 1233 | mathematics | 21 | `math.alg.rationalizing-denominators` | Rationalizing the Denominator |
| 1234 | mathematics | 21 | `math.alg.logarithm-properties` | Logarithm Properties |
| 1235 | mathematics | 21 | `math.alg.natural-logarithm` | Natural Logarithm |
| 1236 | mathematics | 21 | `math.geom.frenet-serret` | Frenet-Serret Formulas |
| 1237 | mathematics | 21 | `math.geom.differential-geometry-surfaces` | Differential Geometry of Surfaces |
| 1238 | mathematics | 21 | `math.trig.special-angles` | Trigonometric Values at Special Angles |
| 1239 | mathematics | 21 | `math.trig.reference-angles` | Reference Angles |
| 1240 | mathematics | 21 | `math.trig.trig-functions` | Trigonometric Functions |
| 1241 | mathematics | 21 | `math.func.logarithmic-function` | Logarithmic Function |
| 1242 | mathematics | 21 | `math.calc.quotient-rule` | Quotient Rule |
| 1243 | mathematics | 21 | `math.calc.derivative-exponential` | Derivative of Exponential Functions |
| 1244 | mathematics | 21 | `math.calc.implicit-differentiation` | Implicit Differentiation |
| 1245 | mathematics | 21 | `math.calc.local-extrema` | Local Extrema |
| 1246 | mathematics | 21 | `math.calc.concavity` | Concavity and Inflection Points |
| 1247 | mathematics | 21 | `math.calc.ftc-part2` | Fundamental Theorem of Calculus Part 2 |
| 1248 | mathematics | 21 | `math.calc.surface-area-integral` | Surface Area of Revolution |
| 1249 | mathematics | 21 | `math.calc.taylor-series` | Taylor Series |
| 1250 | mathematics | 21 | `math.calc.parametric-calculus` | Calculus of Parametric Curves |
| 1251 | mathematics | 21 | `math.calc.gradient` | Gradient |
| 1252 | mathematics | 21 | `math.calc.chain-rule-multivariable` | Multivariable Chain Rule |
| 1253 | mathematics | 21 | `math.calc.double-integrals` | Double Integrals |
| 1254 | mathematics | 21 | `math.calc.change-of-variables` | Change of Variables (Jacobian) |
| 1255 | mathematics | 21 | `math.de.ode` | Ordinary Differential Equation |
| 1256 | mathematics | 21 | `math.linalg.matrix-inverse` | Matrix Inverse |
| 1257 | mathematics | 21 | `math.linalg.cofactor-expansion` | Cofactor Expansion |
| 1258 | mathematics | 21 | `math.linalg.det-properties` | Properties of Determinants |
| 1259 | mathematics | 21 | `math.linalg.span` | Span |
| 1260 | mathematics | 21 | `math.linalg.kernel-image` | Kernel and Image of Linear Map |
| 1261 | mathematics | 21 | `math.linalg.eigenvalues` | Eigenvalues and Eigenvectors |
| 1262 | mathematics | 21 | `math.linalg.inner-product-space` | Inner Product Space |
| 1263 | mathematics | 21 | `math.linalg.projection` | Orthogonal Projection |
| 1264 | mathematics | 21 | `math.linalg.tensor` | Tensor |
| 1265 | mathematics | 21 | `math.linalg.dual-space` | Dual Space |
| 1266 | mathematics | 21 | `math.prob.continuous-distributions` | Continuous Distributions |
| 1267 | mathematics | 21 | `math.prob.expected-value` | Expected Value |
| 1268 | mathematics | 21 | `math.prob.transition-matrix` | Transition Matrix |
| 1269 | mathematics | 21 | `math.disc.divide-conquer-recurrence` | Divide-and-Conquer Recurrence |
| 1270 | mathematics | 21 | `math.disc.ogf` | Ordinary Generating Function |
| 1271 | mathematics | 21 | `math.disc.egf` | Exponential Generating Function |
| 1272 | mathematics | 21 | `math.real.taylor-rigorous` | Taylor's Theorem (Rigorous) |
| 1273 | mathematics | 21 | `math.real.fixed-point-theorem` | Banach Fixed-Point Theorem |
| 1274 | mathematics | 21 | `math.fnal.completeness` | Completeness |
| 1275 | mathematics | 21 | `math.num.error-analysis` | Error Analysis |
| 1276 | mathematics | 21 | `math.num.newtons-method` | Newton's Method |
| 1277 | physics | 21 | `phys.astro.gravitational-waves` | Gravitational Waves |
| 1278 | physics | 21 | `phys.particle.electroweak-unification` | Electroweak Unification |
| 1279 | physics | 21 | `phys.particle.feynman-diagrams` | Feynman Diagrams (Qualitative) |
| 1280 | physics | 21 | `phys.particle.accelerators-detectors` | Particle Accelerators and Detectors |
| 1281 | physics | 21 | `phys.mod.intrinsic-semiconductors` | Intrinsic Semiconductors |
| 1282 | english | 21 | `eng.writing.transitions-and-cohesion` | Transitions and Cohesion |
| 1283 | english | 21 | `eng.literature.literary-devices-overview` | Overview of Literary Devices |
| 1284 | english | 21 | `eng.literature.prose-nonfiction` | Prose Nonfiction |
| 1285 | english | 21 | `eng.linguistics.phonology-intro` | Introduction to Phonology |
| 1286 | english | 21 | `eng.linguistics.morphology-intro` | Introduction to Morphology |
| 1287 | chemistry | 21 | `chem.bio.nucleic-acids` | Nucleic Acids |
| 1288 | chemistry | 21 | `chem.bio.vitamins` | Vitamins and Hormones |
| 1289 | chemistry | 21 | `chem.bio.enzyme-kinetics` | Enzyme Kinetics |
| 1290 | chemistry | 21 | `chem.poly.natural` | Natural Polymers |
| 1291 | chemistry | 21 | `chem.poly.properties` | Polymer Properties |
| 1292 | chemistry | 21 | `chem.poly.biodegradable` | Biodegradable and Functional Polymers |
| 1293 | biology | 21 | `bio.sys.synthetic-biology` | Synthetic Biology |
| 1294 | computer_science | 21 | `cs.struct.minimum-spanning-tree` | Minimum Spanning Trees |
| 1295 | computer_science | 21 | `cs.ds.neural-networks-intro` | Introduction to Neural Networks |
| 1296 | mathematics | 22 | `math.nt.bezout-identity` | Bézout's Identity |
| 1297 | mathematics | 22 | `math.nt.modular-inverse` | Modular Inverse |
| 1298 | mathematics | 22 | `math.alg.linear-equation-1var` | Linear Equation in One Variable |
| 1299 | mathematics | 22 | `math.alg.polynomial-division` | Polynomial Division |
| 1300 | mathematics | 22 | `math.alg.change-of-base` | Change of Base Formula |
| 1301 | mathematics | 22 | `math.alg.logarithmic-equations` | Logarithmic Equations |
| 1302 | mathematics | 22 | `math.geom.polar-coordinates` | Polar Coordinates |
| 1303 | mathematics | 22 | `math.geom.rotation` | Rotation |
| 1304 | mathematics | 22 | `math.geom.dot-product` | Dot Product |
| 1305 | mathematics | 22 | `math.trig.amplitude-period-phase` | Amplitude, Period, Phase Shift |
| 1306 | mathematics | 22 | `math.trig.trig-identities` | Trigonometric Identities |
| 1307 | mathematics | 22 | `math.trig.inverse-trig` | Inverse Trigonometric Functions |
| 1308 | mathematics | 22 | `math.trig.hyperbolic-functions` | Hyperbolic Functions |
| 1309 | mathematics | 22 | `math.calc.derivative-ln` | Derivative of Logarithmic Functions |
| 1310 | mathematics | 22 | `math.calc.derivative-trig` | Derivatives of Trigonometric Functions |
| 1311 | mathematics | 22 | `math.calc.related-rates` | Related Rates |
| 1312 | mathematics | 22 | `math.calc.optimization` | Optimization (Calculus) |
| 1313 | mathematics | 22 | `math.calc.curve-sketching` | Curve Sketching |
| 1314 | mathematics | 22 | `math.calc.u-substitution` | Integration by Substitution |
| 1315 | mathematics | 22 | `math.calc.maclaurin-series` | Maclaurin Series |
| 1316 | mathematics | 22 | `math.calc.taylor-remainder` | Taylor Remainder and Error Bound |
| 1317 | mathematics | 22 | `math.calc.directional-derivative` | Directional Derivative |
| 1318 | mathematics | 22 | `math.calc.multivariable-extrema` | Multivariable Extrema |
| 1319 | mathematics | 22 | `math.calc.triple-integrals` | Triple Integrals |
| 1320 | mathematics | 22 | `math.calc.surface-integrals` | Surface Integrals |
| 1321 | mathematics | 22 | `math.calc.vector-fields` | Vector Fields |
| 1322 | mathematics | 22 | `math.calc.greens-theorem` | Green's Theorem |
| 1323 | mathematics | 22 | `math.calc.fourier-series-intro` | Fourier Series (Introduction) |
| 1324 | mathematics | 22 | `math.de.ode-order` | Order of a Differential Equation |
| 1325 | mathematics | 22 | `math.de.ode-linearity` | Linearity of Differential Equations |
| 1326 | mathematics | 22 | `math.de.solution-types` | Types of Solutions |
| 1327 | mathematics | 22 | `math.de.pde` | Partial Differential Equation |
| 1328 | mathematics | 22 | `math.linalg.cramer-rule` | Cramer's Rule |
| 1329 | mathematics | 22 | `math.linalg.linear-independence` | Linear Independence |
| 1330 | mathematics | 22 | `math.linalg.column-space` | Column Space |
| 1331 | mathematics | 22 | `math.linalg.characteristic-polynomial` | Characteristic Polynomial |
| 1332 | mathematics | 22 | `math.linalg.least-squares` | Least Squares |
| 1333 | mathematics | 22 | `math.prob.normal-distribution` | Normal Distribution |
| 1334 | mathematics | 22 | `math.prob.linearity-expectation` | Linearity of Expectation |
| 1335 | mathematics | 22 | `math.prob.law-of-unconscious` | Law of the Unconscious Statistician |
| 1336 | mathematics | 22 | `math.prob.variance` | Variance |
| 1337 | mathematics | 22 | `math.prob.moments` | Moments |
| 1338 | mathematics | 22 | `math.prob.markov-inequality` | Markov's Inequality |
| 1339 | mathematics | 22 | `math.prob.stationary-distribution` | Stationary Distribution |
| 1340 | mathematics | 22 | `math.prob.poisson-process` | Poisson Process |
| 1341 | mathematics | 22 | `math.disc.algorithm-complexity` | Algorithm Complexity |
| 1342 | mathematics | 22 | `math.real.implicit-function-theorem` | Implicit Function Theorem |
| 1343 | mathematics | 22 | `math.real.inverse-function-theorem` | Inverse Function Theorem |
| 1344 | mathematics | 22 | `math.fnal.banach-space` | Banach Space |
| 1345 | mathematics | 22 | `math.num.numerical-differentiation` | Numerical Differentiation |
| 1346 | mathematics | 22 | `math.opt.unconstrained-optimization` | Unconstrained Optimization |
| 1347 | mathematics | 22 | `math.opt.convex-function` | Convex Function |
| 1348 | mathematics | 22 | `math.graph.algebraic-graph-theory` | Algebraic Graph Theory |
| 1349 | physics | 22 | `phys.particle.higgs-mechanism` | The Higgs Mechanism |
| 1350 | physics | 22 | `phys.mod.extrinsic-semiconductors` | Extrinsic Semiconductors: Doping and Carrier Types |
| 1351 | english | 22 | `eng.writing.narrative-writing` | Narrative Writing |
| 1352 | english | 22 | `eng.writing.descriptive-writing` | Descriptive Writing |
| 1353 | english | 22 | `eng.writing.expository-writing` | Expository Writing |
| 1354 | english | 22 | `eng.writing.persuasive-writing-basics` | Persuasive Writing Basics |
| 1355 | english | 22 | `eng.literature.metaphor-and-simile` | Metaphor and Simile |
| 1356 | english | 22 | `eng.literature.irony` | Irony |
| 1357 | english | 22 | `eng.literature.poetry-basics` | Poetry Basics |
| 1358 | english | 22 | `eng.linguistics.syntax-theory-intro` | Introduction to Syntactic Theory |
| 1359 | english | 22 | `eng.linguistics.historical-linguistics-intro` | Introduction to Historical Linguistics |
| 1360 | mathematics | 23 | `math.nt.linear-diophantine` | Linear Diophantine Equations |
| 1361 | mathematics | 23 | `math.nt.rsa-basics` | RSA Cryptography (Number-Theoretic Basis) |
| 1362 | mathematics | 23 | `math.alg.inequality-1var` | Linear Inequality in One Variable |
| 1363 | mathematics | 23 | `math.alg.absolute-value-equations` | Absolute Value Equations and Inequalities |
| 1364 | mathematics | 23 | `math.alg.linear-equation-2var` | Linear Equation in Two Variables |
| 1365 | mathematics | 23 | `math.alg.remainder-theorem` | Remainder Theorem |
| 1366 | mathematics | 23 | `math.geom.polar-curves` | Polar Curves |
| 1367 | mathematics | 23 | `math.trig.trig-graphs` | Graphs of Trigonometric Functions |
| 1368 | mathematics | 23 | `math.trig.pythagorean-identities` | Pythagorean Identities |
| 1369 | mathematics | 23 | `math.trig.reciprocal-identities` | Reciprocal Identities |
| 1370 | mathematics | 23 | `math.trig.sum-difference-formulas` | Sum and Difference Formulas |
| 1371 | mathematics | 23 | `math.trig.trig-equations` | Trigonometric Equations |
| 1372 | mathematics | 23 | `math.trig.polar-form-complex` | Polar Form of Complex Numbers |
| 1373 | mathematics | 23 | `math.calc.logarithmic-differentiation` | Logarithmic Differentiation |
| 1374 | mathematics | 23 | `math.calc.derivative-inverse-trig` | Derivatives of Inverse Trig Functions |
| 1375 | mathematics | 23 | `math.calc.hyperbolic-derivatives` | Derivatives of Hyperbolic Functions |
| 1376 | mathematics | 23 | `math.calc.integration-by-parts` | Integration by Parts |
| 1377 | mathematics | 23 | `math.calc.curl-divergence` | Curl and Divergence |
| 1378 | mathematics | 23 | `math.de.ivp` | Initial Value Problem |
| 1379 | mathematics | 23 | `math.de.first-order-ode` | First-Order ODE |
| 1380 | mathematics | 23 | `math.de.pde-classification` | Classification of Second-Order PDEs |
| 1381 | mathematics | 23 | `math.linalg.basis` | Basis |
| 1382 | mathematics | 23 | `math.prob.standard-normal` | Standard Normal Distribution |
| 1383 | mathematics | 23 | `math.prob.standard-deviation` | Standard Deviation |
| 1384 | mathematics | 23 | `math.prob.mgf` | Moment Generating Function |
| 1385 | mathematics | 23 | `math.prob.covariance` | Covariance |
| 1386 | mathematics | 23 | `math.prob.chebyshev` | Chebyshev's Inequality |
| 1387 | mathematics | 23 | `math.prob.ergodicity` | Ergodic Theorem (Markov Chains) |
| 1388 | mathematics | 23 | `math.stats.normal-distribution` | Normal Distribution (Statistics) |
| 1389 | mathematics | 23 | `math.disc.complexity-classes` | Complexity Classes |
| 1390 | mathematics | 23 | `math.fnal.hilbert-space` | Hilbert Space |
| 1391 | mathematics | 23 | `math.fnal.bounded-operator` | Bounded Linear Operator |
| 1392 | mathematics | 23 | `math.fnal.dense-subspace` | Dense Subspaces and Approximation |
| 1393 | mathematics | 23 | `math.opt.convex-optimization` | Convex Optimization |
| 1394 | mathematics | 23 | `math.opt.lagrange-multipliers` | Lagrange Multipliers |
| 1395 | mathematics | 23 | `math.opt.gradient-methods` | Gradient Descent |
| 1396 | physics | 23 | `phys.particle.standard-model` | The Standard Model |
| 1397 | physics | 23 | `phys.mod.pn-junction` | The p-n Junction |
| 1398 | english | 23 | `eng.writing.the-writing-process` | The Writing Process |
| 1399 | english | 23 | `eng.writing.creative-writing-forms` | Creative Writing Forms |
| 1400 | english | 23 | `eng.literature.symbolism` | Symbolism |
| 1401 | english | 23 | `eng.literature.imagery` | Imagery |
| 1402 | english | 23 | `eng.literature.poetic-forms` | Poetic Forms |
| 1403 | english | 23 | `eng.literature.literary-genres-overview` | Overview of Literary Genres |
| 1404 | english | 23 | `eng.linguistics.semantics-intro` | Introduction to Semantics |
| 1405 | english | 23 | `eng.linguistics.language-families` | Language Families |
| 1406 | english | 23 | `eng.linguistics.language-acquisition-intro` | Introduction to Language Acquisition |
| 1407 | mathematics | 24 | `math.nt.general-diophantine` | Diophantine Equations |
| 1408 | mathematics | 24 | `math.alg.inequality-2var` | Linear Inequality in Two Variables |
| 1409 | mathematics | 24 | `math.alg.system-linear-equations` | Systems of Linear Equations |
| 1410 | mathematics | 24 | `math.alg.factor-theorem` | Factor Theorem |
| 1411 | mathematics | 24 | `math.trig.double-angle-formulas` | Double Angle Formulas |
| 1412 | mathematics | 24 | `math.trig.product-to-sum` | Product-to-Sum and Sum-to-Product Formulas |
| 1413 | mathematics | 24 | `math.trig.de-moivres-theorem` | De Moivre's Theorem |
| 1414 | mathematics | 24 | `math.trig.eulers-formula` | Euler's Formula |
| 1415 | mathematics | 24 | `math.calc.reduction-formulas` | Reduction Formulas |
| 1416 | mathematics | 24 | `math.calc.stokes-theorem` | Stokes' Theorem |
| 1417 | mathematics | 24 | `math.calc.divergence-theorem` | Divergence Theorem |
| 1418 | mathematics | 24 | `math.de.existence-uniqueness` | Existence and Uniqueness Theorem |
| 1419 | mathematics | 24 | `math.de.separable` | Separable Differential Equation |
| 1420 | mathematics | 24 | `math.de.linear-first-order` | Linear First-Order ODE |
| 1421 | mathematics | 24 | `math.de.exact-ode` | Exact Differential Equation |
| 1422 | mathematics | 24 | `math.de.slope-field` | Slope Field |
| 1423 | mathematics | 24 | `math.de.euler-method` | Euler's Method |
| 1424 | mathematics | 24 | `math.de.second-order-ode` | Second-Order ODE |
| 1425 | mathematics | 24 | `math.linalg.dimension` | Dimension |
| 1426 | mathematics | 24 | `math.linalg.coordinates` | Coordinates |
| 1427 | mathematics | 24 | `math.linalg.matrix-representation` | Matrix Representation of Linear Map |
| 1428 | mathematics | 24 | `math.linalg.orthogonal-basis` | Orthogonal and Orthonormal Basis |
| 1429 | mathematics | 24 | `math.prob.correlation` | Correlation |
| 1430 | mathematics | 24 | `math.prob.lln` | Law of Large Numbers |
| 1431 | mathematics | 24 | `math.stats.covariance-matrix` | Covariance Matrix |
| 1432 | mathematics | 24 | `math.cx.complex-numbers-analysis` | Complex Numbers (Analysis) |
| 1433 | mathematics | 24 | `math.fnal.dual-space-functional` | Dual Space |
| 1434 | mathematics | 24 | `math.fnal.open-mapping-theorem` | Open Mapping Theorem |
| 1435 | mathematics | 24 | `math.fnal.uniform-boundedness` | Uniform Boundedness Principle |
| 1436 | mathematics | 24 | `math.fnal.riesz-representation` | Riesz Representation Theorem |
| 1437 | mathematics | 24 | `math.fnal.spectral-theory` | Spectral Theory |
| 1438 | mathematics | 24 | `math.fnal.fourier-transform` | Fourier Transform (Functional Analysis) |
| 1439 | mathematics | 24 | `math.opt.duality` | Duality Theory |
| 1440 | mathematics | 24 | `math.opt.stochastic-gradient` | Stochastic Gradient Descent |
| 1441 | mathematics | 24 | `math.opt.newton-optimization` | Newton's Method for Optimization |
| 1442 | physics | 24 | `phys.mod.diode-rectification` | Diode Rectifying Behavior |
| 1443 | english | 24 | `eng.writing.outlining-and-planning` | Outlining and Planning |
| 1444 | english | 24 | `eng.literature.meter-and-rhyme` | Meter and Rhyme |
| 1445 | english | 24 | `eng.literature.short-story-study` | Short Story Study |
| 1446 | english | 24 | `eng.literature.literary-periods-survey` | Survey of Literary Periods |
| 1447 | english | 24 | `eng.linguistics.pragmatics-intro` | Introduction to Pragmatics |
| 1448 | english | 24 | `eng.linguistics.psycholinguistics-intro` | Introduction to Psycholinguistics |
| 1449 | mathematics | 25 | `math.nt.pythagorean-triples` | Pythagorean Triples |
| 1450 | mathematics | 25 | `math.nt.pells-equation` | Pell's Equation |
| 1451 | mathematics | 25 | `math.nt.algebraic-number-theory` | Algebraic Number Theory |
| 1452 | mathematics | 25 | `math.nt.analytic-number-theory` | Analytic Number Theory |
| 1453 | mathematics | 25 | `math.alg.substitution-method` | Substitution Method |
| 1454 | mathematics | 25 | `math.alg.elimination-method` | Elimination Method |
| 1455 | mathematics | 25 | `math.alg.system-3var` | Systems of 3 Equations in 3 Variables |
| 1456 | mathematics | 25 | `math.alg.factoring` | Factoring Polynomials |
| 1457 | mathematics | 25 | `math.trig.half-angle-formulas` | Half Angle Formulas |
| 1458 | mathematics | 25 | `math.calc.trig-integrals` | Trigonometric Integrals |
| 1459 | mathematics | 25 | `math.de.bernoulli` | Bernoulli Equation |
| 1460 | mathematics | 25 | `math.de.homogeneous-ode` | Homogeneous First-Order ODE |
| 1461 | mathematics | 25 | `math.de.second-order-linear` | Second-Order Linear ODE |
| 1462 | mathematics | 25 | `math.de.laplace-transform` | Laplace Transform |
| 1463 | mathematics | 25 | `math.de.systems-ode` | Systems of ODEs |
| 1464 | mathematics | 25 | `math.de.bvp` | Boundary Value Problem |
| 1465 | mathematics | 25 | `math.linalg.linear-system` | System of Linear Equations |
| 1466 | mathematics | 25 | `math.linalg.change-of-basis` | Change of Basis |
| 1467 | mathematics | 25 | `math.linalg.spectral-theorem` | Spectral Theorem |
| 1468 | mathematics | 25 | `math.linalg.gram-schmidt` | Gram-Schmidt Process |
| 1469 | mathematics | 25 | `math.prob.clt` | Central Limit Theorem |
| 1470 | mathematics | 25 | `math.stats.correlation` | Sample Correlation |
| 1471 | mathematics | 25 | `math.cx.complex-function` | Complex-Valued Function |
| 1472 | mathematics | 25 | `math.fnal.hahn-banach` | Hahn-Banach Theorem |
| 1473 | mathematics | 25 | `math.fnal.closed-graph-theorem` | Closed Graph Theorem |
| 1474 | mathematics | 25 | `math.fnal.compact-operator-spectrum` | Compact Operators |
| 1475 | mathematics | 25 | `math.fnal.distributions` | Distributions |
| 1476 | mathematics | 25 | `math.num.euler-method` | Euler's Method (Numerical ODE) |
| 1477 | mathematics | 25 | `math.opt.kkt` | KKT Conditions |
| 1478 | english | 25 | `eng.writing.drafting` | Drafting |
| 1479 | english | 25 | `eng.literature.novel-study` | Novel Study |
| 1480 | english | 25 | `eng.literature.literary-criticism-intro` | Introduction to Literary Criticism |
| 1481 | english | 25 | `eng.linguistics.discourse-analysis-intro` | Introduction to Discourse Analysis |
| 1482 | english | 25 | `eng.linguistics.sociolinguistics-intro` | Introduction to Sociolinguistics |
| 1483 | mathematics | 26 | `math.nt.algebraic-integers` | Algebraic Integers |
| 1484 | mathematics | 26 | `math.alg.factoring-gcf` | Factoring out the GCF |
| 1485 | mathematics | 26 | `math.alg.factoring-special` | Special Factoring Patterns |
| 1486 | mathematics | 26 | `math.alg.rational-expressions` | Rational Expressions |
| 1487 | mathematics | 26 | `math.calc.trig-substitution` | Trigonometric Substitution |
| 1488 | mathematics | 26 | `math.de.second-order-homogeneous` | Homogeneous Second-Order Linear ODE |
| 1489 | mathematics | 26 | `math.de.laplace-properties` | Laplace Transform Properties |
| 1490 | mathematics | 26 | `math.de.convolution-theorem` | Convolution Theorem (Laplace) |
| 1491 | mathematics | 26 | `math.de.phase-plane` | Phase Plane Analysis |
| 1492 | mathematics | 26 | `math.de.series-solution` | Series Solution of ODEs |
| 1493 | mathematics | 26 | `math.de.sturm-liouville` | Sturm-Liouville Theory |
| 1494 | mathematics | 26 | `math.de.fourier-series` | Fourier Series |
| 1495 | mathematics | 26 | `math.linalg.augmented-matrix` | Augmented Matrix |
| 1496 | mathematics | 26 | `math.linalg.positive-definite` | Positive Definite Matrix |
| 1497 | mathematics | 26 | `math.linalg.qr-factorization` | QR Factorization |
| 1498 | mathematics | 26 | `math.stats.sampling-distribution` | Sampling Distribution |
| 1499 | mathematics | 26 | `math.stats.linear-regression` | Simple Linear Regression |
| 1500 | mathematics | 26 | `math.stats.normal-approximation` | Normal Approximation |
| 1501 | mathematics | 26 | `math.cx.cauchy-riemann` | Cauchy-Riemann Equations |
| 1502 | mathematics | 26 | `math.num.interpolation` | Polynomial Interpolation |
| 1503 | mathematics | 26 | `math.num.iterative-linear` | Iterative Methods for Linear Systems |
| 1504 | mathematics | 26 | `math.num.runge-kutta` | Runge-Kutta Methods |
| 1505 | mathematics | 26 | `math.opt.linear-programming` | Linear Programming |
| 1506 | english | 26 | `eng.writing.revising-for-content` | Revising for Content |
| 1507 | english | 26 | `eng.literature.comparative-literature-intro` | Introduction to Comparative Literature |
| 1508 | english | 26 | `eng.linguistics.applied-linguistics-intro` | Introduction to Applied Linguistics |
| 1509 | english | 26 | `eng.linguistics.dialectology` | Dialectology |
| 1510 | english | 26 | `eng.linguistics.corpus-linguistics-intro` | Introduction to Corpus Linguistics |
| 1511 | english | 26 | `eng.communication.discourse-markers-advanced` | Advanced Discourse Markers |
| 1512 | english | 26 | `eng.communication.cross-cultural-communication` | Cross-Cultural Communication |
| 1513 | mathematics | 27 | `math.nt.number-fields` | Number Fields |
| 1514 | mathematics | 27 | `math.alg.factoring-trinomials` | Factoring Trinomials |
| 1515 | mathematics | 27 | `math.alg.rational-expressions-addition` | Addition of Rational Expressions |
| 1516 | mathematics | 27 | `math.alg.rational-expressions-multiplication` | Multiplication of Rational Expressions |
| 1517 | mathematics | 27 | `math.alg.rational-equations` | Rational Equations |
| 1518 | mathematics | 27 | `math.de.wronskian` | Wronskian |
| 1519 | mathematics | 27 | `math.de.stability-analysis` | Stability Analysis |
| 1520 | mathematics | 27 | `math.de.frobenius-method` | Frobenius Method |
| 1521 | mathematics | 27 | `math.de.legendre-equation` | Legendre's Equation |
| 1522 | mathematics | 27 | `math.de.eigenfunction-expansion` | Eigenfunction Expansion |
| 1523 | mathematics | 27 | `math.de.fourier-convergence` | Convergence of Fourier Series |
| 1524 | mathematics | 27 | `math.de.fourier-sine-cosine` | Fourier Sine and Cosine Series |
| 1525 | mathematics | 27 | `math.de.fourier-transform` | Fourier Transform |
| 1526 | mathematics | 27 | `math.de.separation-of-variables-pde` | Separation of Variables (PDE) |
| 1527 | mathematics | 27 | `math.linalg.row-reduction` | Row Reduction |
| 1528 | mathematics | 27 | `math.linalg.svd` | Singular Value Decomposition |
| 1529 | mathematics | 27 | `math.stats.standard-error` | Standard Error |
| 1530 | mathematics | 27 | `math.stats.estimator` | Estimator |
| 1531 | mathematics | 27 | `math.stats.confidence-interval` | Confidence Interval |
| 1532 | mathematics | 27 | `math.stats.hypothesis-testing` | Hypothesis Testing |
| 1533 | mathematics | 27 | `math.stats.multiple-regression` | Multiple Linear Regression |
| 1534 | mathematics | 27 | `math.cx.analytic-functions` | Analytic (Holomorphic) Functions |
| 1535 | mathematics | 27 | `math.num.splines` | Spline Interpolation |
| 1536 | mathematics | 27 | `math.num.numerical-integration` | Numerical Integration |
| 1537 | mathematics | 27 | `math.num.qr-algorithm` | QR Algorithm |
| 1538 | mathematics | 27 | `math.num.stiff-ode` | Stiff ODEs and Implicit Methods |
| 1539 | mathematics | 27 | `math.opt.quadratic-programming` | Quadratic Programming |
| 1540 | mathematics | 27 | `math.opt.semidefinite-programming` | Semidefinite Programming |
| 1541 | mathematics | 27 | `math.opt.integer-programming` | Integer Programming |
| 1542 | english | 27 | `eng.writing.editing-and-proofreading` | Editing and Proofreading |
| 1543 | english | 27 | `eng.linguistics.bilingualism-and-multilingualism` | Bilingualism and Multilingualism |
| 1544 | english | 27 | `eng.linguistics.computational-linguistics-intro` | Introduction to Computational Linguistics |
| 1545 | mathematics | 28 | `math.alg.quadratic-equation` | Quadratic Equation |
| 1546 | mathematics | 28 | `math.de.variation-of-parameters` | Variation of Parameters |
| 1547 | mathematics | 28 | `math.de.bessel-equation` | Bessel's Equation |
| 1548 | mathematics | 28 | `math.de.heat-equation` | Heat Equation |
| 1549 | mathematics | 28 | `math.de.wave-equation` | Wave Equation |
| 1550 | mathematics | 28 | `math.de.laplace-equation` | Laplace's Equation |
| 1551 | mathematics | 28 | `math.de.nonlinear-ode` | Nonlinear ODE |
| 1552 | mathematics | 28 | `math.linalg.row-echelon` | Row Echelon Form |
| 1553 | mathematics | 28 | `math.linalg.lu-factorization` | LU Factorization |
| 1554 | mathematics | 28 | `math.linalg.singular-values` | Singular Values |
| 1555 | mathematics | 28 | `math.linalg.pseudoinverse` | Moore-Penrose Pseudoinverse |
| 1556 | mathematics | 28 | `math.prob.characteristic-function` | Characteristic Function |
| 1557 | mathematics | 28 | `math.stats.bias-variance` | Bias-Variance Tradeoff |
| 1558 | mathematics | 28 | `math.stats.consistency` | Consistency of Estimators |
| 1559 | mathematics | 28 | `math.stats.mle` | Maximum Likelihood Estimation |
| 1560 | mathematics | 28 | `math.stats.method-of-moments` | Method of Moments |
| 1561 | mathematics | 28 | `math.stats.ci-mean` | Confidence Interval for a Mean |
| 1562 | mathematics | 28 | `math.stats.ci-proportion` | Confidence Interval for a Proportion |
| 1563 | mathematics | 28 | `math.stats.test-statistic` | Test Statistic |
| 1564 | mathematics | 28 | `math.stats.type-errors` | Type I and Type II Errors |
| 1565 | mathematics | 28 | `math.stats.z-test` | z-Test |
| 1566 | mathematics | 28 | `math.stats.t-test` | t-Test |
| 1567 | mathematics | 28 | `math.stats.chi-squared-test` | Chi-Squared Test |
| 1568 | mathematics | 28 | `math.stats.anova` | Analysis of Variance |
| 1569 | mathematics | 28 | `math.stats.nonparametric` | Nonparametric Tests |
| 1570 | mathematics | 28 | `math.stats.sufficient-statistic` | Sufficient Statistic |
| 1571 | mathematics | 28 | `math.cx.power-series-cx` | Power Series in ℂ |
| 1572 | mathematics | 28 | `math.cx.complex-integration` | Complex Line Integral |
| 1573 | mathematics | 28 | `math.cx.singularities` | Singularities |
| 1574 | mathematics | 28 | `math.cx.conformal-mapping` | Conformal Mapping |
| 1575 | mathematics | 28 | `math.num.svd` | SVD (Numerical) |
| 1576 | mathematics | 28 | `math.opt.pca` | Principal Component Analysis |
| 1577 | english | 28 | `eng.writing.essay-structure` | Essay Structure |
| 1578 | english | 28 | `eng.linguistics.translation-studies-intro` | Introduction to Translation Studies |
| 1579 | mathematics | 29 | `math.nt.prime-number-theorem` | Prime Number Theorem |
| 1580 | mathematics | 29 | `math.alg.completing-the-square` | Completing the Square |
| 1581 | mathematics | 29 | `math.alg.polynomial-roots` | Polynomial Roots (Real and Complex) |
| 1582 | mathematics | 29 | `math.geom.conic-sections` | Conic Sections |
| 1583 | mathematics | 29 | `math.func.quadratic-function` | Quadratic Function |
| 1584 | mathematics | 29 | `math.de.harmonic-functions` | Harmonic Functions |
| 1585 | mathematics | 29 | `math.de.poisson-equation` | Poisson's Equation |
| 1586 | mathematics | 29 | `math.de.bifurcation` | Bifurcation Theory |
| 1587 | mathematics | 29 | `math.linalg.rank` | Rank |
| 1588 | mathematics | 29 | `math.linalg.null-space` | Null Space |
| 1589 | mathematics | 29 | `math.linalg.cholesky` | Cholesky Decomposition |
| 1590 | mathematics | 29 | `math.stats.p-value` | p-value |
| 1591 | mathematics | 29 | `math.stats.power` | Power of a Test |
| 1592 | mathematics | 29 | `math.stats.two-way-anova` | Two-Way ANOVA |
| 1593 | mathematics | 29 | `math.stats.bayesian-inference` | Bayesian Statistics |
| 1594 | mathematics | 29 | `math.stats.experimental-design` | Experimental Design |
| 1595 | mathematics | 29 | `math.stats.rao-blackwell` | Rao-Blackwell Theorem |
| 1596 | mathematics | 29 | `math.cx.harmonic-functions` | Harmonic Functions (Complex Analysis) |
| 1597 | mathematics | 29 | `math.cx.cauchy-theorem` | Cauchy's Theorem |
| 1598 | mathematics | 29 | `math.cx.identity-theorem` | Identity Theorem |
| 1599 | mathematics | 29 | `math.cx.poles` | Poles and Meromorphic Functions |
| 1600 | mathematics | 29 | `math.cx.essential-singularity` | Essential Singularity |
| 1601 | mathematics | 29 | `math.cx.laurent-series` | Laurent Series |
| 1602 | mathematics | 29 | `math.cx.mobius-transformation` | Möbius Transformation |
| 1603 | mathematics | 29 | `math.cx.riemann-mapping` | Riemann Mapping Theorem |
| 1604 | mathematics | 29 | `math.fnal.special-functions` | Special Functions |
| 1605 | mathematics | 29 | `math.num.lu-factorization` | LU Factorization (Numerical) |
| 1606 | english | 29 | `eng.writing.thesis-statements` | Thesis Statements |
| 1607 | english | 29 | `eng.composition.audience-and-purpose` | Audience and Purpose |
| 1608 | mathematics | 30 | `math.alg.quadratic-formula` | Quadratic Formula |
| 1609 | mathematics | 30 | `math.alg.rational-root-theorem` | Rational Root Theorem |
| 1610 | mathematics | 30 | `math.alg.fundamental-theorem-algebra` | Fundamental Theorem of Algebra |
| 1611 | mathematics | 30 | `math.alg.polynomial-inequality` | Polynomial Inequality |
| 1612 | mathematics | 30 | `math.alg.vietas-formulas` | Vieta's Formulas |
| 1613 | mathematics | 30 | `math.geom.parabola` | Parabola |
| 1614 | mathematics | 30 | `math.geom.ellipse` | Ellipse |
| 1615 | mathematics | 30 | `math.geom.hyperbola` | Hyperbola |
| 1616 | mathematics | 30 | `math.func.vertex-form` | Vertex Form of a Quadratic |
| 1617 | mathematics | 30 | `math.func.polynomial-function` | Polynomial Function |
| 1618 | mathematics | 30 | `math.calc.partial-fractions` | Partial Fraction Decomposition |
| 1619 | mathematics | 30 | `math.de.higher-order-ode` | Higher-Order Linear ODE |
| 1620 | mathematics | 30 | `math.de.greens-function` | Green's Function |
| 1621 | mathematics | 30 | `math.de.chaos` | Chaotic Dynamics |
| 1622 | mathematics | 30 | `math.linalg.rank-nullity` | Rank-Nullity Theorem |
| 1623 | mathematics | 30 | `math.linalg.eigenspace` | Eigenspace |
| 1624 | mathematics | 30 | `math.stats.conjugate-prior` | Conjugate Prior |
| 1625 | mathematics | 30 | `math.stats.credible-interval` | Credible Interval |
| 1626 | mathematics | 30 | `math.disc.linear-recurrence` | Linear Recurrence |
| 1627 | mathematics | 30 | `math.cx.cauchy-goursat` | Cauchy-Goursat Theorem |
| 1628 | mathematics | 30 | `math.cx.cauchy-integral-formula` | Cauchy Integral Formula |
| 1629 | mathematics | 30 | `math.cx.analytic-continuation` | Analytic Continuation |
| 1630 | mathematics | 30 | `math.cx.residue` | Residue |
| 1631 | mathematics | 30 | `math.num.cholesky` | Cholesky Factorization (Numerical) |
| 1632 | english | 30 | `eng.writing.citations-and-referencing` | Citations and Referencing |
| 1633 | english | 30 | `eng.composition.claim-evidence-reasoning` | Claim, Evidence, and Reasoning |
| 1634 | english | 30 | `eng.composition.rhetorical-appeals` | Rhetorical Appeals: Ethos, Pathos, Logos |
| 1635 | mathematics | 31 | `math.alg.discriminant` | Discriminant |
| 1636 | mathematics | 31 | `math.alg.complex-polynomial-roots` | Complex Roots of Polynomials |
| 1637 | mathematics | 31 | `math.alg.rational-inequality` | Rational Inequality |
| 1638 | mathematics | 31 | `math.func.end-behavior` | End Behavior |
| 1639 | mathematics | 31 | `math.func.rational-root` | Real Roots of Polynomials |
| 1640 | mathematics | 31 | `math.func.rational-function` | Rational Function |
| 1641 | mathematics | 31 | `math.de.char-equation` | Characteristic Equation |
| 1642 | mathematics | 31 | `math.de.inverse-laplace` | Inverse Laplace Transform |
| 1643 | mathematics | 31 | `math.linalg.diagonalization` | Diagonalization |
| 1644 | mathematics | 31 | `math.cx.higher-derivatives` | Derivatives of Holomorphic Functions |
| 1645 | mathematics | 31 | `math.cx.morera-theorem` | Morera's Theorem |
| 1646 | mathematics | 31 | `math.cx.residue-theorem` | Residue Theorem |
| 1647 | mathematics | 31 | `math.cx.maximum-modulus` | Maximum Modulus Principle |
| 1648 | mathematics | 31 | `math.cx.riemann-surface` | Riemann Surface |
| 1649 | mathematics | 31 | `math.cx.riemann-zeta` | Riemann Zeta Function |
| 1650 | english | 31 | `eng.composition.argumentation-basics` | Argumentation Basics |
| 1651 | english | 31 | `eng.composition.rhetorical-devices` | Rhetorical Devices |
| 1652 | mathematics | 32 | `math.nt.riemann-hypothesis` | Riemann Hypothesis |
| 1653 | mathematics | 32 | `math.func.vertical-asymptote` | Vertical Asymptote |
| 1654 | mathematics | 32 | `math.func.horizontal-asymptote` | Horizontal Asymptote |
| 1655 | mathematics | 32 | `math.de.undetermined-coefficients` | Method of Undetermined Coefficients |
| 1656 | mathematics | 32 | `math.de.laplace-ode` | Solving ODEs with Laplace Transform |
| 1657 | mathematics | 32 | `math.de.systems-matrix-method` | Matrix Method for Linear Systems |
| 1658 | mathematics | 32 | `math.linalg.matrix-exponential` | Matrix Exponential |
| 1659 | mathematics | 32 | `math.linalg.jordan-form` | Jordan Normal Form |
| 1660 | mathematics | 32 | `math.cx.liouville-theorem` | Liouville's Theorem |
| 1661 | mathematics | 32 | `math.cx.real-integral-residues` | Evaluating Real Integrals via Residues |
| 1662 | mathematics | 32 | `math.cx.argument-principle` | Argument Principle |
| 1663 | english | 32 | `eng.composition.counterargument-and-rebuttal` | Counterargument and Rebuttal |
| 1664 | english | 32 | `eng.composition.logical-fallacies` | Logical Fallacies |
| 1665 | english | 32 | `eng.composition.figurative-language-in-composition` | Figurative Language in Composition |
| 1666 | english | 32 | `eng.composition.rhetorical-analysis` | Rhetorical Analysis |
| 1667 | mathematics | 33 | `math.de.harmonic-oscillator` | Harmonic Oscillator |
| 1668 | mathematics | 33 | `math.cx.fundamental-theorem-algebra` | Fundamental Theorem of Algebra (Complex Analysis) |
| 1669 | mathematics | 33 | `math.cx.rouche-theorem` | Rouché's Theorem |
| 1670 | english | 33 | `eng.composition.style-voice-and-tone` | Style, Voice, and Tone |
| 1671 | english | 33 | `eng.composition.persuasive-techniques` | Advanced Persuasive Techniques |
| 1672 | english | 33 | `eng.composition.comparative-essay-writing` | Comparative Essay Writing |
| 1673 | english | 33 | `eng.composition.research-paper-writing` | Research Paper Writing |
| 1674 | mathematics | 34 | `math.de.resonance` | Resonance |
| 1675 | english | 34 | `eng.composition.academic-writing-conventions` | Academic Writing Conventions |
| 1676 | english | 35 | `eng.composition.plagiarism-and-citation-ethics` | Plagiarism and Citation Ethics |
| 1677 | english | 35 | `eng.composition.editing-for-style` | Editing for Style |
| 1678 | english | 35 | `eng.communication.academic-writing-advanced` | Advanced Academic Writing |
| 1679 | english | 36 | `eng.communication.research-methodology-writing` | Writing Research Methodology |
| 1680 | english | 36 | `eng.communication.technical-writing` | Technical Writing |
| 1681 | english | 36 | `eng.communication.business-writing` | Business Writing |
| 1682 | english | 37 | `eng.communication.professional-communication` | Professional Communication |
| 1683 | english | 37 | `eng.communication.presentation-design` | Presentation Design |
| 1684 | english | 37 | `eng.communication.editing-for-publication` | Editing for Publication |
| 1685 | english | 38 | `eng.communication.negotiation-language` | Negotiation Language |
# Visual Coverage Gap Analysis

Read-only research report. No source code was changed as part of this task.

Scope: (1) catalog every `VisualType` and what it renders, (2) scan the K-12
subject catalogs (CBSE/UP boards) for concept categories that have no matching
`VisualType`, (3) catalog the 9 deterministic parametric scene generators and
find physics/math topics outside their coverage, (4) produce a gap matrix.

Sources read:
- `src/lib/school/visuals/visualTypes.ts` (VisualType enum + VISUAL_META)
- `src/components/school/visuals/VisualCard.tsx` (renderer wiring)
- `src/lib/teaching/sceneGenerators/*.ts` + `sceneRouter.ts` (9 generators + router)
- `src/lib/curriculum/subjectCatalog.ts` (adult/self-directed subject catalog —
  programming, languages, mathematics, physics, chemistry, biology, AI)
- `src/lib/education/*Catalog.ts` (CBSE + UP K-12 board catalogs: Science, Math,
  Social Science, English, Computer Science, and others)

---

## 1. VisualType inventory

`VisualType` is defined in `src/lib/school/visuals/visualTypes.ts` and rendered
by `src/components/school/visuals/VisualCard.tsx`, which maps each type to a
dedicated SVG (2D) or Three.js (`three_*`, 3D) component. Pipeline: AI response
→ tagged `VisualType` → `VisualCard` → matching component. 47 types total.

**2D SVG (10) — Sprint BW core set**
- `number_line` — horizontal line showing numbers/position relative to zero
- `fraction_bar` — bar divided into equal parts to show a fraction
- `percentage_grid` — 10×10 grid with filled squares representing a percentage
- `coordinate_plane` — x-y axis for plotting points/lines
- `geometry_shape` — common 2D shapes with labelled properties
- `food_chain` — linear producer→consumer energy-flow sequence
- `water_cycle` — evaporation/condensation/precipitation cycle
- `solar_system` — Sun + eight planets in orbital paths
- `force_diagram` — object with force vectors acting on it
- `circuit_diagram` — battery/wires/switch/bulb simple circuit

**Quantum Physics 2D (9) — Phase 1 + 2**
- `double_slit`, `wave_function`, `potential_well`, `quantum_tunneling`,
  `bloch_sphere`, `energy_level_diagram`, `quantum_circuit`, `stern_gerlach`,
  `entanglement_pair`

**3D engine + Quantum 3D (6)**
- `three_particle_system` (reusable engine primitive)
- `three_double_slit`, `three_quantum_tunneling`, `three_bloch_sphere`,
  `three_stern_gerlach`, `three_hydrogen_orbital`

**Classical Mechanics 3D (5)**
- `three_projectile_motion`, `three_newton_forces`, `three_momentum_collision`,
  `three_circular_motion`, `three_pendulum_motion`

**Chemistry 3D (5)**
- `three_atomic_structure`, `three_electron_shells`, `three_molecular_shapes`,
  `three_bond_formation`, `three_crystal_lattice`

**Mathematics 3D (5)**
- `three_coordinate_system`, `three_vector_visualization`,
  `three_surface_visualization`, `three_geometric_solids`, `three_transformations`

**Computer Science 3D (5)**
- `three_computer_architecture`, `three_memory_storage`,
  `three_network_packet_flow`, `three_data_structure`,
  `three_algorithm_visualization`

**Data Science 3D (5)**
- `three_statistical_distribution`, `three_data_visualization`,
  `three_correlation`, `three_clustering`, `three_ml_pipeline`

`VISUAL_SUBJECTS` (the set of subjects visuals are currently applicable to) is
`{mathematics, science, math, quantum_physics, physics, chemistry,
computer_science}` — notably **excludes** biology, social science/history/
geography/civics/economics, and all languages (English/Hindi/Sanskrit/Urdu) as
a top-level gate, even though several VisualTypes (`food_chain`, `water_cycle`,
`solar_system`) are clearly biology/earth-science content. This means even the
existing biology-relevant visual types may not currently be offered when the
active subject is tagged `biology` or `social_science` rather than `science`.

---

## 2. Subject-catalog scan — concept categories with no matching VisualType

Catalogs scanned: `cbseScienceCatalog.ts`, `cbseMathCatalog.ts`,
`cbseSocialScienceCatalog.ts`, `cbseEnglishCatalog.ts`,
`cbseComputerScienceCatalog.ts` (plus their UP-board counterparts, which mirror
the same concept categories), and `subjectCatalog.ts` (adult self-directed
math/physics/chemistry/biology/programming tracks). Findings grouped by subject:

### Science (CBSE/UP, grades 5-12)
- **Cell biology / microscopic structures** — "The Fundamental Unit of Life",
  "Tissues", "Cell — The Unit of Life", "Cell Cycle and Cell Division" — no
  VisualType for a cell diagram, organelles, mitosis/meiosis stages.
- **Human physiology (organ systems)** — digestion, circulation, respiration,
  excretion, nervous/endocrine, reproduction chapters (grades 6, 7, 9, 10, 11) —
  no VisualType for a labelled human-body/organ diagram.
- **Plant physiology** — photosynthesis, transport, morphology/anatomy of
  flowering plants — no plant-structure or photosynthesis-process VisualType.
- **Genetics/heredity** — "Heredity", "Principles of Inheritance and
  Variation", "Molecular Basis of Inheritance" — no Punnett-square / DNA /
  chromosome VisualType (only quantum/classical/chem/math/CS/data-science 3D
  sets exist).
- **Evolution** — "Evolution" chapter — no phylogenetic-tree/timeline visual.
- **Ecology/ecosystems** — beyond `food_chain`, no biome map, energy-pyramid,
  or nutrient-cycle (carbon/nitrogen) visual.
- **Light/optics ray diagrams** — "Light: Reflection and Refraction", "The
  Human Eye", "Ray Optics and Optical Instruments", "Wave Optics" — no
  ray-diagram/lens/mirror VisualType (distinct from the existing
  `double_slit`/`wave_function` quantum visuals, which don't cover classical
  ray optics, mirrors, or lens formula diagrams).
- **Periodic table / periodicity** — "Classification of Elements and
  Periodicity" — no periodic-table VisualType.
- **Chemical bonding (beyond molecule geometry)** — ionic lattice formation,
  orbital hybridization diagrams — partially covered by `three_bond_formation`/
  `three_molecular_shapes`/`three_crystal_lattice`, but no VisualType for
  ionic-bond electron-transfer diagrams or orbital hybridization (sp/sp2/sp3).
- **Organic chemistry reaction mechanisms** — Hydrocarbons, Haloalkanes,
  Alcohols/Phenols/Ethers, Aldehydes/Ketones/Carboxylic Acids, Amines — no
  reaction-mechanism/functional-group VisualType.
- **Earth/weather systems** — "Pressure, Winds, Storms and Cyclones",
  "Keeping Time with the Skies" — no weather-system/cyclone diagram (distinct
  from `solar_system`/`water_cycle`).
- **Electromagnetic induction / AC circuits** — "Electromagnetic Induction",
  "Alternating Current" — `circuit_diagram` is DC-only (battery/switch/bulb);
  no AC-waveform or induction-coil visual.
- **Semiconductor devices** — "Semiconductor Electronics" — no diode/transistor
  band-diagram visual.

### Mathematics (CBSE/UP, grades 5-12)
- **Symmetry/transformations (2D, school level)** — "Does it Look the Same?",
  "Symmetry" chapters — covered only by the advanced `three_transformations`
  (3D solids); no simple 2D line-symmetry/reflection visual for younger grades.
- **Statistics (data presentation: bar/pie/histogram)** — "Smart Charts",
  "Data Handling", "Tales by Dots and Lines", "Statistics" — no
  bar-chart/pie-chart/histogram VisualType for school-level data handling
  (the `three_data_visualization`/`three_statistical_distribution` set is
  scoped to the separate "Data Science" track, not the school math statistics
  chapters).
- **Trigonometric ratios/identities, heights & distances** — "Introduction to
  Trigonometry", "Applications of Trigonometry" — no right-triangle/
  angle-of-elevation diagram VisualType.
- **Conic sections** — "Conic Sections" chapter — no parabola/ellipse/
  hyperbola VisualType (distinct from `coordinate_plane`, which is generic
  point/line plotting).
- **Matrices/determinants** — no grid/matrix-transformation visual.
- **Mensuration (surface area/volume of solids)** — partially covered by
  `geometry_shape` (2D) and `three_geometric_solids` (advanced 3D primitives:
  cube/sphere/cylinder/cone), but no labelled-formula visual tying a solid to
  its surface-area/volume derivation for school-level mensuration chapters.

### Social Science (History / Geography / Civics / Economics, CBSE/UP, grades 5-12)
- **Historical timelines** — every History sub-catalog (French Revolution,
  Nationalism in India, ancient/medieval/modern India, World Wars, Cold War,
  etc.) — no timeline VisualType at all.
- **Maps / map skills** — "Locating Places on the Earth", Geography chapters
  throughout (physical features, climate, resources, agriculture, industries)
  — no map/choropleth VisualType (this is a large, recurring gap — Geography
  is map-centric content with zero map-rendering support).
- **Government/institutional structure diagrams** — "The Parliamentary
  System", "Working of Institutions", "Federalism", "Local Governments" — no
  org-chart/flow-of-power diagram.
- **Economics graphs (supply/demand, circular flow)** — "Understanding
  Markets", "Determination of Income and Employment", "Consumer Rights" — no
  supply-demand-curve or circular-flow-of-income VisualType (`coordinate_plane`
  is generic, not a labelled economics-curve template).
- **Population/demographic pyramids** — "Population" chapters (grade 9 and
  12) — no demographic-pyramid visual.

### English / Languages (CBSE/UP English, Hindi, Sanskrit, Urdu)
- **Grammar trees (sentence structure / parts of speech)** — "Nouns and
  Pronouns", "Simple Sentences and Punctuation", grammar chapters across all
  grades — no sentence-diagram/parse-tree VisualType. Also out of scope per
  `VISUAL_SUBJECTS` gating (languages aren't in the visual-eligible subject set
  at all).
- **Literature/story structure** — no story-arc/character-map visual (likely
  lower priority/appropriate fit for this app's visual style).

### Computer Science (CBSE CS catalog)
- **Data structures (stacks/queues/lists beyond the "3D Data Structures"
  scope)** — `three_data_structure` exists, but is grouped under the separate
  "Computer Science 3D Foundation Sprint" tier and is a single generic
  comparison visual (array/list/stack/queue), not chapter-specific (e.g. no
  step-by-step stack push/pop or queue enqueue/dequeue animation distinct from
  the generic comparison).
- **SQL / relational model** — "Database Management Systems", "SQL — DDL/DML/
  Queries/Joins" — no table/ER-diagram/join-visualization VisualType.
- **Boolean logic / logic gates** — "Boolean Logic and Logic Gates" — no
  logic-gate-diagram VisualType (distinct from the CS-3D set, which covers
  architecture/memory/networking/data-structures/algorithms, not gates).
- **Flowcharts** — "Flowcharts" chapter — no flowchart VisualType.

### Adult/self-directed catalog (`subjectCatalog.ts`)
This catalog uses thematic module titles (Mechanics, Energy, Electricity,
Thermodynamics, Modern Physics, Organic/Physical Chemistry, Cell/Human
Biology, Genetics, Evolution, Ecology, plus the existing programming/language
tracks) rather than itemized lesson titles, so most of the gaps above recur at
the module level rather than adding new categories. Its `Genetics`,
`Evolution`, and `Cell Biology` modules reinforce the biology gap found above.

---

## 3. Parametric scene generators — coverage and gaps

Confirmed via `src/lib/teaching/sceneGenerators/sceneRouter.ts` (the single
keyword-routing entry point) and the individual generator files. There are
**9 generators**, each with `extract → build (formula-driven) → validate →
consistency-check`, fully deterministic except for LLM-based parameter
extraction from free text:

| Generator | File | Topic |
|---|---|---|
| `projectile` | `projectileMotion.ts` | Projectile/ballistic motion, launch angle, parabolic trajectory |
| `triangle` | `triangleAngleSum.ts` | Triangle interior-angle-sum geometry |
| `molecule` | `moleculeGeometry.ts` | VSEPR molecular geometry (H2O, CO2, CH4, NH3, BF3, etc.) |
| `vector` | `vectorAddition.ts` | 2D vector addition (parallelogram law, tip-to-tail, resultant) |
| `circular` | `circularMotion.ts` | Uniform circular motion, centripetal force, angular velocity |
| `pendulum` | `pendulumMotion.ts` | Simple pendulum swing/oscillation |
| `electron_shells` | `electronShells.ts` | Bohr-model electron shell/configuration diagrams |
| `lattice` | `crystalLattice.ts` | Crystal lattice / unit cell (simple cubic, BCC, FCC) |
| `collision` | `momentumCollision.ts` | 1D momentum collision (elastic/inelastic) |

`sceneRouter.ts` explicitly documents 3 topics as **intentionally out of
scope** for this generator family (not gaps to fill, but deliberate
exclusions noted in the code):
- SHM / y = A·sin(ωt) graphs — already owned by the separate 2D graph engine
  (`visualConceptDetector.ts`)
- Free-body/net-force diagrams — folded into the `vector` generator (net force
  treated as vector addition)
- 2D/oblique collisions — deferred; current `collision` generator is 1D only

### Physics/math topics in the curriculum outside all 9 generators

Cross-referencing the CBSE Physics/Math chapter lists (`cbseScienceCatalog.ts`
grades 11-12, `cbseMathCatalog.ts`) against the 9 generators above:

- **Kinematics graphs** (position/velocity/acceleration-time graphs;
  "Motion in a Straight Line and a Plane") — no generator; distinct from
  projectile (which is 2D parabolic, not general 1D motion-graph plotting).
- **Newton's laws / free-body force diagrams beyond vector addition** — the
  router folds this into `vector`, but a genuinely separate free-body-diagram
  builder (multiple labelled forces on an arbitrary object, not just two
  vectors summing) doesn't exist as its own generator.
- **Rotational motion / torque** ("System of Particles and Rotational
  Motion") — no generator (circular motion ≠ torque/rotational dynamics).
- **Gravitation** (orbits, escape velocity) — no generator; `circular` only
  covers uniform circular motion generically, not gravitational orbit-specific
  parameters (orbital radius vs. mass, escape velocity).
- **Work-energy / power problems** ("Work, Energy and Power") — no generator.
- **Thermodynamics / kinetic theory** (PV diagrams, heat-engine cycles) — no
  generator.
- **Electrostatics / current electricity circuit problems** beyond the static
  `circuit_diagram` VisualType — no parametric circuit-solving generator (e.g.
  series/parallel resistor networks, Kirchhoff's laws).
- **Electromagnetic induction / AC circuits** — no generator.
- **Ray optics** (lens/mirror ray diagrams, image formation) — no generator.
- **Wave optics / interference beyond the existing quantum `double_slit`** —
  no parametric generator (the quantum visuals are static/templated, not
  parameter-extracted from arbitrary problem text the way the 9 generators are).
- **Math: trigonometry (heights & distances)** — no generator (distinct from
  `triangle`, which is angle-sum only, not right-triangle trig with
  elevation/depression angles).
- **Math: coordinate geometry (straight lines, conics)** — no generator.
- **Math: calculus (limits, derivatives, integrals, differential equations)**
  — no generator; these are inherently graph-of-a-function visuals, a
  different visual family from the parametric physical-scene generators.
- **Math: 2D collisions / projectile-with-air-resistance variants** — noted
  above as explicitly deferred in the router's own comments.

---

## 4. Gap matrix

Lesson-count estimates are rough (counted matching chapter titles across CBSE
grades 5-12 for the relevant board catalog files; UP-board counterparts track
closely and are not separately re-counted, so true totals across both boards
are likely 1.5-2x these figures). "Buildable deterministically" means a
parameter-extraction + formula-driven SceneSpec builder (like the 9 existing
generators) is plausible; "needs generative/LLM" means the content is too
open-ended/visual-design-heavy for a fixed formula (e.g. arbitrary maps,
historical timelines, free-text diagrams).

| Concept category | Subject(s) | Approx lesson count | Visual complexity | Buildable approach |
|---|---|---|---|---|
| Human/animal/plant physiology diagrams (organ systems) | Science (Biology) | approx 15-20 | medium | Needs generative/LLM (anatomical SVG library + labelling) |
| Cell structure & division (mitosis/meiosis) | Science (Biology) | approx 6-8 | medium | Deterministic-leaning (fixed organelle/stage templates) |
| Genetics (Punnett squares, DNA/chromosome) | Science (Biology) | approx 5-6 | medium | Deterministic (formulaic Punnett-square generator very feasible) |
| Maps / map skills (physical, climate, resource, choropleth) | Social Science (Geography) | approx 25-35 | complex | Needs generative/LLM (geographic data + rendering) |
| Historical timelines | Social Science (History) | approx 30-40 | simple-medium | Deterministic (timeline is a structured, formulaic layout) |
| Ray optics (mirrors/lenses/image formation) | Science (Physics) | approx 6-8 | medium | Deterministic (formula-driven: lens/mirror equations) |
| Periodic table / periodicity trends | Science (Chemistry) | approx 2-3 | simple | Deterministic (static templated grid + property overlay) |
| Organic reaction mechanisms / functional groups | Science (Chemistry) | approx 6-8 | complex | Needs generative/LLM (mechanism diagrams vary widely) |
| Kinematics graphs (x-t, v-t, a-t) | Science/Math (Physics) | approx 4-6 | simple | Deterministic (straightforward formula-to-graph) |
| Rotational motion / torque diagrams | Science (Physics) | approx 2-3 | medium | Deterministic (extension of existing vector/circular pattern) |
| Gravitation (orbits, escape velocity) | Science (Physics) | approx 2-3 | medium | Deterministic (extension of circular-motion pattern) |
| Trigonometry — heights & distances | Math | approx 3-4 | simple | Deterministic (extension of triangle generator) |
| School-level statistics charts (bar/pie/histogram) | Math | approx 5-6 | simple | Deterministic (direct formula-to-chart, no LLM-heavy step) |
| Economics curves (supply/demand, circular flow) | Social Science (Economics) | approx 6-8 | medium | Deterministic (templated curve-shift generator) |
| Demographic pyramids | Social Science (Geography) | approx 2 | simple | Deterministic (formula-driven bar layout) |
| Coordinate geometry (straight lines, conics) | Math | approx 4-5 | medium | Deterministic (formula-to-curve, similar to existing vector/coordinate visuals) |
| Calculus (function graphs, derivatives/integrals) | Math | approx 9-10 | medium | Deterministic (function-plotting is formulaic, though function variety is large) |
| Government/institutional org-charts | Social Science (Civics) | approx 8-10 | simple | Deterministic (fixed hierarchy templates) |
| Grammar trees / sentence diagrams | English/Hindi/Sanskrit/Urdu | approx 10-15 | simple-medium | Deterministic (parse-tree layout is formulaic) but currently fully out-of-scope per `VISUAL_SUBJECTS` |
| Logic gates / flowcharts | Computer Science | approx 2-3 | simple | Deterministic (templated gate/flowchart symbols) |
| SQL / ER diagrams | Computer Science | approx 4 | medium | Deterministic (table/relationship layout is formulaic) |
| Electrostatics/circuit-solving (beyond static diagram) | Science (Physics) | approx 5-6 | medium | Deterministic (Kirchhoff's-law solver + circuit layout) |
| Ecology (energy pyramid, nutrient cycles) | Science (Biology) | approx 3-4 | simple | Deterministic (extension of existing food_chain/water_cycle pattern) |

---

## Caveats

- Lesson counts are estimated by counting matching chapter titles in the
  authored CBSE catalog files only; the UP-board catalogs (`up*Catalog.ts`)
  largely mirror the same concept categories per their own header comments, so
  true cross-board totals are likely higher than stated here.
- "Visual complexity" and "buildable" classifications are qualitative
  judgments based on how the 9 existing generators are structured (clean
  formula → SceneSpec), not a formal complexity scoring system.
- The codebase has an unusually large `docs/` history of visual-system audits
  and sprint reports (quantum, 3D engine, classical mechanics, chemistry,
  math, CS, data science) — this document does not attempt to reconcile every
  prior sprint's stated scope; it reflects only what currently exists in
  `visualTypes.ts` and `sceneGenerators/` as of this scan.

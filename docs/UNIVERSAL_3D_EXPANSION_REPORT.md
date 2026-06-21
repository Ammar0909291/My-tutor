# Universal 3D Educational Framework — Phase 2 Expansion Report

**Status: design only. No code changes, no commits.** Plans how the quantum-proven 3D engine
generalizes to Classical Mechanics, Chemistry, and Mathematics, using `docs/UNIVERSAL_3D_AUDIT.md`'s
classification as ground truth. Quantum Physics remains the reference implementation; nothing here
modifies it.

## Task 2 — Classical Mechanics 3D roadmap (design only)

All five reuse `ThreeDVisual` + the `revealStep`-gated `Scene` pattern; cross-references
`docs/CLASSICAL_MECHANICS_VISUALS.md` and `docs/CLASSICAL_MECHANICS_MISCONCEPTIONS.md` (already
authored, design-stage, from the Classical Mechanics Curriculum sprint).

| Simulation | `VisualType` (proposed) | Reveal steps (5, matching the quantum convention) | Narration compatibility | Mastery opportunity |
|---|---|---|---|---|
| **Projectile Motion** | `three_projectile_motion` | 1 launch point → 2 velocity vector (angle/magnitude) → 3 trajectory arc tracing → 4 landing point + range readout → 5 completed parabola with peak height marked | Standard `revealStep` mapping, identical to `DoubleSlit3D`'s wave-propagation steps | Interactive variant: angle/speed sliders, "hit a target range" challenge — directly reuses the `challenge`-style threshold pattern from `QuantumTunnelingInteractive3D`'s mastery bridge |
| **Newton's Forces** | `three_newton_forces` | 1 object at rest → 2 single applied force arrow → 3 net force from multiple arrows → 4 resulting acceleration vector → 5 motion trace confirming F=ma | Same pattern | Interactive: force-magnitude/direction sliders per applied force; "balance the forces" challenge (net force → zero) |
| **Momentum & Collisions** | `three_momentum_collision` | 1 two objects approaching → 2 momentum vectors shown → 3 collision moment → 4 post-collision vectors → 5 elastic vs. inelastic comparison | Same pattern | Interactive: mass/velocity sliders per object, elastic/inelastic toggle; "conserve total momentum" challenge |
| **Circular Motion** | `three_circular_motion` | 1 object on a circular path → 2 velocity vector (tangential) → 3 centripetal force vector (inward) → 4 full revolution traced → 5 radius/speed comparison | Same pattern | Interactive: radius/speed sliders; counters the "centrifugal force pushes outward" misconception (already flagged in `CLASSICAL_MECHANICS_MISCONCEPTIONS.md`) by never rendering an outward force arrow |
| **Pendulum Motion** | `three_pendulum_motion` | 1 pendulum at rest → 2 displaced to amplitude → 3 swinging with velocity vector → 4 energy bar (KE↔PE) → 5 period vs. length comparison | Same pattern | Interactive: length/amplitude sliders, live period readout; "find the length for a 2-second period" challenge |

**Engine reuse**: all five are net-new `Scene` content only — `ThreeDVisual`, `SimulationControlPanel`,
`GuidedSimulationMode`, and the `VisualCard`/`VisualType`/`detectVisual` mechanisms need zero
changes beyond the additive registrations every prior quantum sprint already demonstrated (new union
members, `VISUAL_META` entries, switch cases, step counts, keyword rules in a new `MECHANICS_3D_RULES`
table mirroring `QUANTUM_3D_RULES`'s "explicit 3D phrasing first" selection strategy).

## Task 3 — Chemistry 3D roadmap (design only)

| Simulation | `VisualType` (proposed) | Reveal steps | Narration compatibility | Mastery opportunity |
|---|---|---|---|---|
| **Atomic Structure** | `three_atomic_structure` | 1 nucleus → 2 proton/neutron detail → 3 electron shells appear → 4 electrons populate shells → 5 labeled complete atom | Standard | Interactive: element/atomic-number selector; "predict the electron count" challenge |
| **Electron Shells** | `three_electron_shells` | 1 nucleus → 2 shell 1 (K) → 3 shell 2 (L) → 4 shell 3 (M) → 5 full shell diagram with fill order | Standard | Interactive: element selector, live shell-filling animation; reuses the `HydrogenOrbital3D`/`HydrogenOrbitalInteractive3D` cloud-point generator directly — same probability-cloud math, different element parameters |
| **Molecular Shapes** | `three_molecular_shapes` | 1 central atom → 2 bonded atoms appear → 3 lone pairs shown → 4 VSEPR geometry forms → 5 labeled shape (tetrahedral, bent, etc.) | Standard | Interactive: molecule selector (CH₄, H₂O, NH₃, CO₂); "identify the shape" MCQ bridge — directly reuses `QuantumVisualChallenge`'s pattern |
| **Bond Formation** | `three_bond_formation` | 1 two separate atoms → 2 electron clouds approach → 3 orbital overlap → 4 shared electron pair → 5 completed bond with energy-released note | Standard | Interactive: ionic vs. covalent toggle; counters a "bonds are physical sticks" misconception analogous to the quantum tunneling counter-misconception pattern |
| **Crystal Lattices** | `three_crystal_lattice` | 1 single unit cell → 2 lattice points → 3 repeating in one direction → 4 repeating in 3D → 5 completed lattice (NaCl/diamond comparison) | Standard | Interactive: lattice-type selector (cubic/FCC/BCC/diamond); reuses `ParticleSystem3D`'s repeating-point-field pattern directly |

**Engine reuse**: `Electron Shells` and `Crystal Lattices` are the strongest direct ports of existing
code (`HydrogenOrbital3D`'s cloud generator, `ParticleSystem3D`'s point-field pattern respectively) —
lowest-effort items in this entire roadmap.

## Task 4 — Mathematics 3D roadmap (design only)

| Simulation | `VisualType` (proposed) | Reveal steps | Narration compatibility | Mastery opportunity |
|---|---|---|---|---|
| **3D Geometry** | `three_solid_geometry` | 1 base shape (cube/sphere/cone/cylinder/pyramid) → 2 edges highlighted → 3 faces highlighted → 4 volume formula overlay → 5 cross-section cut | Standard | Interactive: shape selector + dimension sliders; "match the volume" challenge — directly mirrors the existing 2D `GeometryShapes` drag-challenge pattern from `VisualRenderer`'s `geometry` spec, ported to 3D |
| **Coordinate Systems** | `three_coordinate_systems` | 1 Cartesian axes → 2 a plotted point → 3 cylindrical overlay → 4 spherical overlay → 5 side-by-side comparison | Standard | Interactive: point coordinates sliders across the three systems; "convert between systems" challenge |
| **Vector Visualization** | `three_vector_visualization` | 1 single vector → 2 second vector → 3 vector addition (parallelogram) → 4 dot/cross product result → 5 resultant comparison | Standard | Interactive: vector-component sliders per vector; "predict the resultant" challenge |
| **Surface Visualization** | `three_surface_visualization` | 1 flat grid → 2 z = f(x,y) deformation begins → 3 full surface → 4 contour lines projected → 5 critical point (max/min/saddle) highlighted | Standard | Interactive: function selector (paraboloid, saddle, sine wave); "identify the critical point type" MCQ bridge |
| **Transformations** | `three_transformations` | 1 original shape → 2 translation → 3 rotation → 4 scaling → 5 combined transformation | Standard | Interactive: transformation-parameter sliders (translate x/y/z, rotation angle, scale factor) live-applied to a mesh |

**Engine reuse**: all five are net-new `Scene` content; `Vector Visualization` and `Force Diagram`'s
existing 2D arrow-rendering conventions (already used by `ForceDiagram.tsx`) translate directly to 3D
arrow meshes, making it the most template-ready item in this roadmap.

## Task 5 — Subject-independent 3D primitives

| Primitive | Already exists as | Subjects it would serve |
|---|---|---|
| **Particles** | `ParticleSystem3D.tsx` (generic point/sphere field + movement) | Chemistry (crystal lattices, electron clouds — `HydrogenOrbital3D` is a parametrized particle cloud), Mechanics (projectile trail dots), Math (point clouds for coordinate demos) |
| **Vectors (arrows)** | New primitive needed; 2D precedent in `ForceDiagram.tsx` | Mechanics (force/velocity/momentum, 4 of 5 roadmap items), Math (vector visualization, transformations), Chemistry (bond-dipole arrows) |
| **Fields** | `FieldVisualization3D` stub (placeholder, needs a real arrow/gradient-field renderer) | Mechanics (gravitational/force fields), Chemistry (electron probability fields — overlaps with Particles), Math (surface gradient fields) |
| **Paths/trajectories** | New primitive needed; precedent in `DoubleSlit3D`'s expanding-wavefront rings and `QuantumTunneling3D`'s wave-packet path | Mechanics (projectile arc, pendulum swing, circular motion path — 3 of 5 roadmap items), Math (parametric curves) |
| **Orbit systems** | `SolarSystem.tsx` exists in 2D only; no 3D port yet | Mechanics (circular motion), Chemistry (legacy Bohr-model comparisons, used carefully to avoid reinforcing the planetary-orbit misconception `HydrogenOrbital3D` already counters) |
| **Graphs/surfaces** | New primitive needed; `StructureVisualization3D` stub is the closest existing placeholder | Math (surface visualization), Chemistry (molecular shapes — bond-angle "surfaces") |
| **Molecular nodes (labeled spheres + bond lines)** | New primitive needed; structurally identical to `BlochSphere3D`'s labeled-pole-plus-line pattern | Chemistry (atomic structure, molecular shapes, bond formation, crystal lattices — all 5 roadmap items) |
| **Force arrows** | Same as Vectors above, specialized with magnitude-to-length scaling | Mechanics (Newton's forces, momentum) |

**Reuse estimate**: of the 15 simulations roadmapped across Tasks 2–4, the **Particles** primitive
(already built) directly seeds 4+ simulations (electron shells, crystal lattices, projectile trail,
coordinate point clouds); a new **Vectors/Arrows** primitive, once built once, would seed 6+
simulations (4 mechanics + vector visualization + transformations); a new **Molecular nodes**
primitive would seed all 5 chemistry simulations. Building 2 new primitives (Vectors, Molecular
nodes) alongside the 1 already-built primitive (Particles) covers roughly 12 of the 15 roadmapped
simulations' core visual vocabulary — the remaining content per simulation is parameter/physics
logic, not new rendering primitives.

## Task 6 — Universal 3D library plan (design only, no files moved)

Proposed structure (paths only; **no files moved or created this sprint**):

```
src/components/3d/
  primitives/        # subject-independent meshes: ParticleField, VectorArrow,
                      # MolecularNode, FieldGrid, PathTrail, OrbitRing, SurfaceMesh
  scenes/             # subject-independent scene hosts/utilities: the current
                      # ThreeDVisual.tsx, SimulationControlPanel.tsx,
                      # GuidedSimulationMode.tsx would conceptually live here
  education/          # subject-specific Scene content, one subfolder per subject:
    quantum/          # today's DoubleSlit3D, QuantumTunneling3D, BlochSphere3D,
                      # SternGerlach3D, HydrogenOrbital3D + their *Interactive3D
                      # siblings (current location: src/components/school/visuals/)
    mechanics/         # Task 2's 5 simulations
    chemistry/          # Task 3's 5 simulations
    mathematics/         # Task 4's 5 simulations
```

This mirrors the audit's classification exactly: `primitives/` = the "subject-independent" row,
`scenes/` = the "generic reusable" engine-host row, `education/<subject>/` = the "subject-specific"
row, scaled to one folder per subject instead of one flat directory. **This is a target-state
proposal only** — migrating the existing nine quantum files from
`src/components/school/visuals/` into this structure is explicitly out of scope this sprint ("Do
NOT move files") and should be its own low-risk, mechanical refactor sprint once a second subject's
3D content actually exists to validate the split is worth the churn.

## Task 7 — 3D curriculum coverage review

| Curriculum | Lessons reviewed | Benefit from 3D | Require 3D | Better left 2D |
|---|---|---|---|---|
| **CBSE** (Math + Science, existing knowledge graphs) | ~120 lessons across `mathKnowledgeGraph.ts`/`scienceKnowledgeGraph.ts` topics | Geometry (solids, surface area/volume), force/motion topics, circuit topics with spatial layout — roughly 15–20% | Near-zero — CBSE's syllabus is concept-first, not spatial-visualization-first; almost nothing strictly *requires* 3D to teach correctly | The large majority (number lines, fractions, percentages, basic algebra, food chains, water cycle) — 2D diagrams are already the correct, simplest representation |
| **UP Board** (state board, broadly CBSE-aligned per existing subject catalog) | Same knowledge-graph coverage as CBSE (no separate UP Board-specific visual set exists in this codebase) | Same estimate as CBSE — ~15–20%, concentrated in geometry/mechanics | Near-zero, same reasoning | Same majority as CBSE |
| **Quantum Physics** (Subject Library, 33 modules / 144 lessons) | All 144 lessons | High — wave/particle duality, superposition, spin, orbital topics are inherently spatial/abstract concepts where 2D diagrams are a simplification of a 3D phenomenon; reference implementation already covers the 5 highest-value topics | Double-slit, Bloch sphere, Stern–Gerlach, hydrogen orbitals — these *are* 3D phenomena being flattened into 2D textbook diagrams; 3D is the more faithful representation, hence "requires" for full conceptual accuracy (~15–20 lessons across the 5 covered topic clusters) | Lessons on quantum notation, math formalism, historical context — text/2D-equation lessons gain little from a 3D scene |

**Headline estimate**: across CBSE/UP Board's ~120 generic-curriculum lessons, roughly 15–20% (≈20
lessons) would meaningfully benefit from 3D (mostly geometry and mechanics), with almost none
strictly requiring it. Within Quantum Physics's 144 lessons, the proportion is much higher precisely
because quantum phenomena are inherently 3D/spatial — this is why quantum was correctly chosen as
the reference implementation rather than a general K-12 subject.

## Reusable engine assets (summary)

Per `docs/UNIVERSAL_3D_AUDIT.md`: `ThreeDVisual`, `ParticleSystem3D`, `SimulationControlPanel`,
`GuidedSimulationMode`, and the `VisualType`/`VisualCard`/`detectVisual` mechanisms are fully
subject-independent today and require zero modification for any of the three new subjects — only
additive registrations (new union members, `VISUAL_META` entries, switch cases, keyword tables)
following the exact pattern every quantum sprint already established and validated end-to-end.

## Subject rollout order (recommendation)

1. **Classical Mechanics** — design docs already exist (`CLASSICAL_MECHANICS_VISUALS.md`,
   `CLASSICAL_MECHANICS_MISCONCEPTIONS.md`); Vectors/Arrows primitive has the highest reuse count
   (6+ future simulations); curriculum is large and already fully designed (127 lessons).
2. **Chemistry** — `Electron Shells` and `Crystal Lattices` are near-direct ports of existing code
   (`HydrogenOrbital3D` cloud math, `ParticleSystem3D` point fields), making this the lowest-effort
   second subject despite needing a new Molecular-nodes primitive.
3. **Mathematics** — smallest curriculum footprint of the three for 3D-specific benefit (geometry,
   vectors), and most of its value is captured once the Vectors/Arrows primitive already exists from
   step 1.

## Effort estimates (rough, design-stage only)

| Item | Estimate |
|---|---|
| 1 new primitive (Vectors/Arrows or Molecular nodes), reusable engine code only | ~0.5–1 sprint each |
| 1 new non-interactive simulation (`*3D.tsx`, revealStep-gated, following the quantum template) | ~0.3–0.5 sprint each (smaller than the original quantum estimate since the template/primitives now exist) |
| 1 new interactive simulation (`*Interactive3D.tsx` + mastery-bridge wiring) | ~0.3–0.5 sprint each, same reasoning |
| Full first subject package (5 simulations, non-interactive only, like Quantum Phase 1) | ~1.5–2 sprints, given primitives reused |
| Full first subject package, interactive + guided + mastery (matching Quantum's full depth) | ~3–4 sprints total, spread the same way Quantum's work was (Foundation → Phase 1 → Interactive Phase 1 → Phase 2 → Production Integration) |

## Educational impact

Quantum's pattern (2D default, 3D for explicit/deeper visualization, interactive for hands-on
exploration, guided mode for directed instruction, mastery bridge for evidence) is a complete,
proven instructional design — replicating it for Mechanics directly addresses the misconceptions
`CLASSICAL_MECHANICS_MISCONCEPTIONS.md` already identified (e.g. circular motion's "centrifugal
force" misconception, addressed the same way tunneling's "borrowed energy" misconception is
addressed: by simply never rendering the incorrect element). Chemistry's electron-shell and
molecular-shape simulations directly extend the "probability cloud, not planetary orbit" message
`HydrogenOrbital3D` already established, giving students one consistent mental model from quantum
orbitals through to chemical bonding. Mathematics's 3D geometry/vectors give the most procedurally
mechanical subjects of the three a genuinely new capability (rotatable solids, live vector addition)
that 2D `GeometryShapes`/`CoordinatePlane` cannot represent at all.

## Recommended next implementation sprint

**Classical Mechanics 3D Foundation** (mirroring "Quantum Physics 3D Simulations Phase 1"
structure): build the Vectors/Arrows primitive once, then the five `Scene`s in Task 2's table as
non-interactive `revealStep`-gated simulations first (skip interactivity/guided-mode/mastery in the
first pass, exactly as Quantum's own rollout sequenced foundation → phase 1 → interactive layers
across separate sprints). This is the lowest-risk next step: curriculum content already exists,
the riskiest unknown (a new primitive) is scoped to one item, and it follows the exact phased
pattern already validated five times over for Quantum Physics.

## STOP AFTER REPORT

Design only. No code changes, no file moves, no commits in this sprint. No Tutor Max, Educational
Intelligence, Assessment, Curriculum, Narration Engine, or Visual Learning Engine changes.

# Classical Mechanics — Master Curriculum

**Status: design only. No code, no DB, no subject registration.**

Built to the Quantum Physics quality standard (see `QUANTUM_PHYSICS_MASTER_CURRICULUM.md`) and the
reusable build pattern in `docs/ADVANCED_SUBJECT_TEMPLATE.md`. Grounded in the research findings of
`CLASSICAL_MECHANICS_CURRICULUM_RESEARCH.md`.

**Totals: 7 levels → 28 units → 127 lessons.**

Legend: **U#** = unit, **L#.#** = lesson. "Prereq" lists unit-level or lesson-level prerequisites by id.
Difficulty: `F`=foundational, `D`=developing, `P`=proficient, `A`=advanced.

Tier mapping (per Task 2's Beginner→Expert requirement):

| Tier | Levels |
|---|---|
| Beginner | Level 1 |
| Intermediate | Level 2–3 |
| Advanced | Level 4–5 |
| Professional | Level 6 |
| Expert | Level 7 |

---

## TASK 2 — LEVELS

### Level 1 — Foundations (`LevelIndex` 0) — Beginner
- **Goal:** build vector/kinematics fluency and free-body-diagram literacy from an algebra-only base,
  ending with Newton's three laws fully internalized.
- **Competencies:** vector algebra and components; 1D/2D kinematics including projectile motion; draw
  and interpret correct free-body diagrams; state and apply Newton's three laws.
- **Prerequisite knowledge:** high-school algebra and basic trigonometry only.
- **Estimated hours:** ~42

### Level 2 — Newtonian Dynamics (`LevelIndex` 1) — Beginner–Intermediate
- **Goal:** apply Newton's laws to realistic force systems (friction, tension, springs, circular
  motion) and master the work–energy and momentum conservation frameworks.
- **Competencies:** solve multi-force/multi-body problems; circular motion and centripetal force;
  work–energy theorem; conservation of momentum and energy; analyze collisions.
- **Prerequisite knowledge:** Level 1.
- **Estimated hours:** ~48

### Level 3 — Analytical Reformulation (`LevelIndex` 2) — Intermediate
- **Goal:** the formal-reformulation pivot (mirrors Quantum Physics's Hilbert-space pivot) — re-derive
  mechanics from generalized coordinates and the principle of least action.
- **Competencies:** multivariable calculus and ODE fluency for mechanics; generalized coordinates and
  constraints; the Euler–Lagrange equation; symmetry and conserved quantities (Noether's theorem,
  qualitative).
- **Prerequisite knowledge:** Level 2 + single-variable calculus.
- **Estimated hours:** ~50

### Level 4 — Rotational Mechanics & Gravitation (`LevelIndex` 3) — Advanced
- **Goal:** extend dynamics to rotating and orbiting systems.
- **Competencies:** rotational kinematics; torque and moment of inertia; angular momentum and rolling
  motion; Newtonian gravitation; Kepler's laws and orbital mechanics.
- **Prerequisite knowledge:** Level 3 (esp. generalized coordinates for orbit problems).
- **Estimated hours:** ~46

### Level 5 — Oscillations & Mechanical Waves (`LevelIndex` 4) — Advanced
- **Goal:** master periodic motion from a single oscillator to coupled systems and mechanical wave
  propagation.
- **Competencies:** simple harmonic motion; damped and driven oscillation, resonance; coupled
  oscillators and normal modes; mechanical waves and wave equations.
- **Prerequisite knowledge:** Level 3 (ODEs), Level 4 helpful for coupled systems.
- **Estimated hours:** ~44

### Level 6 — Hamiltonian & Rigid-Body Mechanics (`LevelIndex` 5) — Professional
- **Goal:** the second formal layer — Hamiltonian mechanics, rigid-body dynamics, and non-inertial
  frames, at the depth of MIT 8.012 / Cambridge Part IB / Oxford Part A.
- **Competencies:** Hamiltonian formalism and phase space; Euler's equations for rigid bodies;
  non-inertial reference frames and pseudo-forces; the central-force problem and scattering.
- **Prerequisite knowledge:** Level 3 (Lagrangian mechanics) + Level 4.
- **Estimated hours:** ~48

### Level 7 — Research Foundations — Orientation & Literacy (`LevelIndex` 6) — Expert
- **Goal (mirrors Quantum Physics's Level 7 design decision):** literacy/orientation, not full
  technical fluency — builds the vocabulary and conceptual map to read and follow nonlinear dynamics,
  continuum mechanics, and the classical–relativistic boundary, deferring full working fluency to a
  dedicated graduate sequence (out of scope here).
- **Competencies:** nonlinear dynamics and chaos (orientation); continuum mechanics introduction
  (stress, strain, elasticity); the classical limit of special relativity; research literacy & methods.
- **Prerequisite knowledge:** Level 6.
- **Estimated hours:** ~40

**Total estimated hours: ~318**

---

## TASK 3 + TASK 4 — UNITS & LESSONS

### LEVEL 1 — FOUNDATIONS

**U1 — Mathematical & Measurement Toolkit** · purpose: vectors, units, the calculus mechanics needs ·
prereq: — · `F` · ~12h
- L1.1 Units, dimensional analysis & significant figures (obj: convert and validate physical
  quantities) · prereq: —
- L1.2 Scalars vs. vectors; vector addition & subtraction (obj: add/resolve vectors graphically) ·
  prereq: L1.1
- L1.3 Vector components & unit vectors (obj: resolve vectors into x/y components) · prereq: L1.2
- L1.4 Derivatives & integrals for motion (obj: differentiate/integrate position–velocity–acceleration
  relations) · prereq: L1.1

**U2 — One-Dimensional Kinematics** · purpose: motion along a line · prereq: U1 · `F` · ~10h
- L2.1 Position, displacement & distance · prereq: L1.4
- L2.2 Velocity & speed; reading motion graphs · prereq: L2.1
- L2.3 Acceleration & the kinematic equations · prereq: L2.2
- L2.4 Free fall & motion under constant acceleration · prereq: L2.3

**U3 — Two-Dimensional Kinematics & Projectile Motion** · purpose: motion in a plane · prereq: U2 ·
`F` · ~10h
- L3.1 Position, velocity & acceleration as vectors in 2D · prereq: L1.3, L2.3
- L3.2 Relative velocity · prereq: L3.1
- L3.3 Projectile motion: trajectory, range & time of flight · prereq: L3.1
- L3.4 Projectile motion: maximum height & launch-angle optimization · prereq: L3.3

**U4 — Forces & Newton's Laws** · purpose: the foundation of dynamics · prereq: U3 · `D` · ~10h
- L4.1 The concept of force; types of forces (gravity, normal, tension, applied) · prereq: L2.3
- L4.2 Newton's first law & inertia · prereq: L4.1
- L4.3 Newton's second law: F = ma · prereq: L4.2
- L4.4 Newton's third law & force pairs · prereq: L4.3
- L4.5 Free-body diagrams: construction and common errors · prereq: L4.4

*Level 1 lessons: 4+4+4+5 = **17**.*

### LEVEL 2 — NEWTONIAN DYNAMICS

**U5 — Applications of Newton's Laws** · purpose: realistic multi-force systems · prereq: U4 · `D` ·
~12h
- L5.1 Friction: static and kinetic · prereq: L4.5
- L5.2 Inclined planes & force decomposition · prereq: L5.1
- L5.3 Tension, pulleys & connected objects · prereq: L5.1
- L5.4 Spring forces & Hooke's law · prereq: L4.3
- L5.5 Problem-solving with multiple coupled bodies · prereq: L5.2, L5.3

**U6 — Circular Motion** · purpose: centripetal dynamics · prereq: U5 · `D` · ~10h
- L6.1 Uniform circular motion: centripetal acceleration · prereq: L3.1
- L6.2 Centripetal force & applications (banked curves, conical pendulum) · prereq: L6.1, L5.2
- L6.3 Non-uniform circular motion · prereq: L6.2
- L6.4 Rotating reference frames: an introduction to pseudo-forces · prereq: L6.2

**U7 — Work & Energy** · purpose: the energy framework · prereq: U5 · `D` · ~12h
- L7.1 Work done by a force, including variable forces · prereq: L4.3
- L7.2 Kinetic energy & the work–energy theorem · prereq: L7.1
- L7.3 Potential energy: gravitational and elastic · prereq: L7.1, L5.4
- L7.4 Conservation of mechanical energy · prereq: L7.2, L7.3
- L7.5 Power · prereq: L7.2

**U8 — Momentum & Collisions** · purpose: the momentum framework · prereq: U7 · `D` · ~14h
- L8.1 Linear momentum & impulse · prereq: L4.3
- L8.2 Conservation of momentum · prereq: L8.1
- L8.3 Elastic collisions · prereq: L8.2, L7.4
- L8.4 Inelastic collisions · prereq: L8.2
- L8.5 Center of mass & systems of particles · prereq: L8.2

*Level 2 lessons: 5+4+5+5 = **19**.*

### LEVEL 3 — ANALYTICAL REFORMULATION

**U9 — Mathematical Toolkit II** · purpose: multivariable calculus & ODEs for mechanics · prereq: U1 ·
`D` · ~14h
- L9.1 Partial derivatives & the gradient · prereq: L1.4
- L9.2 Multiple integrals (line/surface intuition) · prereq: L9.1
- L9.3 Second-order linear ODEs (general solution methods) · prereq: L1.4
- L9.4 Variational reasoning: what it means to minimize a quantity · prereq: L9.2

**U10 — Generalized Coordinates & Constraints** · purpose: bridge from forces to coordinates · prereq:
U9, U8 · `P` · ~12h
- L10.1 Degrees of freedom & generalized coordinates · prereq: L9.1, L8.5
- L10.2 Holonomic vs. non-holonomic constraints · prereq: L10.1
- L10.3 Virtual work & D'Alembert's principle (conceptual bridge) · prereq: L10.2
- L10.4 Kinetic and potential energy in generalized coordinates · prereq: L10.1, L7.4

**U11 — Lagrangian Mechanics** · purpose: the formal-reformulation pivot · prereq: U10 · `P` · ~16h
- L11.1 The principle of least action (conceptual) · prereq: L9.4, L10.3
- L11.2 The Lagrangian L = T − V · prereq: L10.4
- L11.3 The Euler–Lagrange equation · prereq: L11.1, L11.2
- L11.4 Solving simple systems with the Euler–Lagrange equation (pendulum, Atwood machine) · prereq:
  L11.3
- L11.5 Equivalence with Newtonian mechanics — recovering F = ma · prereq: L11.3

**U12 — Symmetry & Conservation** · purpose: connect formalism back to conservation laws · prereq: U11
· `P` · ~8h
- L12.1 Cyclic coordinates & conserved momenta · prereq: L11.3
- L12.2 Noether's theorem (qualitative): symmetry implies conservation · prereq: L12.1
- L12.3 Energy conservation revisited via the Lagrangian · prereq: L12.1, L7.4

*Level 3 lessons: 4+4+5+3 = **16**.*

### LEVEL 4 — ROTATIONAL MECHANICS & GRAVITATION

**U13 — Rotational Kinematics & Dynamics** · purpose: rotation as a parallel to linear motion · prereq:
U8, U11 · `P` · ~12h
- L13.1 Angular position, velocity & acceleration · prereq: L2.3
- L13.2 Torque · prereq: L4.3
- L13.3 Moment of inertia: definition and the parallel-axis theorem · prereq: L13.1
- L13.4 Rotational form of Newton's second law (τ = Iα) · prereq: L13.2, L13.3

**U14 — Angular Momentum & Rolling Motion** · purpose: the rotational conservation framework · prereq:
U13 · `P` · ~12h
- L14.1 Angular momentum of a particle and a rigid body · prereq: L13.3
- L14.2 Conservation of angular momentum · prereq: L14.1
- L14.3 Rolling without slipping · prereq: L13.4, L14.1
- L14.4 Rotational kinetic energy & combined translation–rotation problems · prereq: L14.3, L7.4

**U15 — Newtonian Gravitation** · purpose: the force law behind orbits · prereq: U7 · `P` · ~10h
- L15.1 Newton's law of universal gravitation · prereq: L4.3
- L15.2 Gravitational potential energy & escape velocity · prereq: L15.1, L7.3
- L15.3 Gravitational field & superposition · prereq: L15.1

**U16 — Orbital Mechanics** · purpose: Kepler's laws from Newtonian gravity · prereq: U15, U14 · `P` ·
~12h
- L16.1 Kepler's three laws (empirical statement) · prereq: L15.1
- L16.2 Deriving circular-orbit period from gravitation · prereq: L15.1, L14.2
- L16.3 Elliptical orbits & energy of an orbit · prereq: L15.2, L16.1
- L16.4 Orbital transfers & escape trajectories (conceptual) · prereq: L16.3

*Level 4 lessons: 4+4+3+4 = **15**.*

### LEVEL 5 — OSCILLATIONS & MECHANICAL WAVES

**U17 — Simple Harmonic Motion** · purpose: the canonical periodic system · prereq: U9, U7 · `P` ·
~10h
- L17.1 The SHM equation and its solution · prereq: L9.3
- L17.2 Mass–spring systems · prereq: L17.1, L5.4
- L17.3 The simple pendulum (small-angle approximation) · prereq: L17.1
- L17.4 Energy in simple harmonic motion · prereq: L17.2, L7.4

**U18 — Damped & Driven Oscillations** · purpose: realistic oscillators · prereq: U17 · `P` · ~10h
- L18.1 Damped harmonic motion (underdamped/critical/overdamped) · prereq: L17.1
- L18.2 Driven oscillations & resonance · prereq: L18.1
- L18.3 Quality factor and energy dissipation · prereq: L18.1, L18.2

**U19 — Coupled Oscillators & Normal Modes** · purpose: many-body periodic systems · prereq: U18, U11
· `A` · ~12h
- L19.1 Two coupled oscillators: equations of motion · prereq: L17.1, L11.3
- L19.2 Normal modes & normal-mode frequencies · prereq: L19.1
- L19.3 Beats & energy exchange between coupled oscillators · prereq: L19.2

**U20 — Mechanical Waves** · purpose: from oscillators to wave propagation · prereq: U19 · `A` · ~12h
- L20.1 The wave equation for a stretched string · prereq: L19.1, L9.3
- L20.2 Traveling vs. standing waves; superposition · prereq: L20.1
- L20.3 Wave energy & power transmission · prereq: L20.2, L7.5
- L20.4 The continuum limit: from coupled oscillators to a wave medium · prereq: L19.2, L20.1

*Level 5 lessons: 4+3+3+4 = **14**.*

### LEVEL 6 — HAMILTONIAN & RIGID-BODY MECHANICS

**U21 — Hamiltonian Mechanics** · purpose: the second formal layer, phase-space dynamics · prereq:
U12 · `A` · ~14h
- L21.1 Generalized momenta & the Legendre transform (conceptual) · prereq: L12.1
- L21.2 The Hamiltonian H = T + V and Hamilton's equations · prereq: L21.1
- L21.3 Phase space & phase portraits · prereq: L21.2
- L21.4 Poisson brackets & conserved quantities (orientation) · prereq: L21.2

**U22 — Rigid-Body Dynamics** · purpose: full 3D rotational formalism · prereq: U14, U21 · `A` · ~14h
- L22.1 The inertia tensor · prereq: L13.3
- L22.2 Principal axes & moments of inertia · prereq: L22.1
- L22.3 Euler's equations for rigid-body rotation · prereq: L22.2, L21.2
- L22.4 Precession & gyroscopic motion · prereq: L22.3

**U23 — Non-Inertial Reference Frames** · purpose: motion as seen from accelerating frames · prereq:
U6, U21 · `A` · ~10h
- L23.1 Pseudo-forces in linearly accelerating frames · prereq: L6.4
- L23.2 The Coriolis and centrifugal forces in rotating frames · prereq: L6.4, L23.1
- L23.3 Applications: Foucault pendulum, weather systems (conceptual) · prereq: L23.2

**U24 — Central-Force Problem & Scattering** · purpose: the orbit problem in full generality · prereq:
U16, U21 · `A` · ~10h
- L24.1 The effective potential for central forces · prereq: L21.2, L16.3
- L24.2 Classifying orbits by energy (bound vs. unbound) · prereq: L24.1
- L24.3 Scattering & the differential cross-section (conceptual) · prereq: L24.2

*Level 6 lessons: 4+4+3+3 = **14**.*

### LEVEL 7 — RESEARCH FOUNDATIONS — ORIENTATION & LITERACY

**U25 — Nonlinear Dynamics & Chaos (orientation)** · purpose: literacy with deterministic chaos ·
prereq: U21 · `A` · ~10h
- L25.1 Nonlinear oscillators: the driven pendulum beyond small angles · prereq: L18.2, L21.3
- L25.2 Sensitivity to initial conditions & the butterfly effect (conceptual) · prereq: L25.1
- L25.3 Bifurcations & strange attractors (orientation, no derivation) · prereq: L25.2

**U26 — Continuum Mechanics Introduction** · purpose: from particles/rigid bodies to deformable media ·
prereq: U22, U20 · `A` · ~10h
- L26.1 Stress and strain (conceptual) · prereq: L22.1
- L26.2 Elasticity & Hooke's law for continuous media · prereq: L26.1, L5.4
- L26.3 Fluids at rest: pressure and buoyancy (orientation) · prereq: L26.1

**U27 — The Classical–Relativistic Boundary** · purpose: where Newtonian mechanics breaks down ·
prereq: U21 · `A` · ~10h
- L27.1 The Galilean transformation & its limits · prereq: L3.2
- L27.2 Why Newtonian mechanics fails at high speed (conceptual bridge to relativity) · prereq: L27.1
- L27.3 The classical limit as an approximation of relativistic mechanics (orientation) · prereq: L27.2

**U28 — Research Literacy & Methods** · purpose: capstone orientation, mirrors Quantum Physics's Level
7 capstone · prereq: U25, U26, U27 · `A` · ~10h
- L28.1 Reading a classical-mechanics research abstract: vocabulary & structure · prereq: L25.3, L26.2
- L28.2 How modern classical-mechanics research connects to robotics, astrodynamics & engineering ·
  prereq: L28.1
- L28.3 Where this curriculum ends and graduate mechanics begins (map of the field) · prereq: L27.3,
  L28.1

*Level 7 lessons: 3+3+3+3 = **12**.*

---

## Lesson count summary

| Level | Units | Lessons |
|---|---|---|
| 1 | 4 | 17 |
| 2 | 4 | 19 |
| 3 | 4 | 16 |
| 4 | 4 | 15 |
| 5 | 4 | 14 |
| 6 | 4 | 14 |
| 7 | 4 | 12 |
| **Total** | **28** | **127** |

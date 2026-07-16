# Teaching Blueprint — phys.mech.generalized-coordinates

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.generalized-coordinates
name:               Generalized Coordinates and Configuration Space
domain:             Classical Mechanics — Analytical Mechanics (Physics)
difficulty:         expert (6)
bloom:              understand
mastery_threshold:  0.85
estimated_hours:    6
prerequisites:      [phys.mech.conservative-forces, phys.mech.kinematics-2d]
cross_links:        [phys.mech.euler-lagrange-equation, phys.mech.hamiltonian,
                     phys.mech.constraints]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a bead constrained to a wire has only one degree of
                       freedom, not three — what is the natural coordinate?;
                       difficulty 6 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Generalized coordinates are the smallest independent set of parameters that
completely specifies the configuration of a mechanical system. For a system with N particles in
3D and k holonomic constraints, the number of degrees of freedom is f = 3N − k. The generalized
coordinates q₁, q₂, …, qf can be any convenient quantities (angles, arc lengths, ratios) — not
necessarily Cartesian positions. The space swept by all possible (q₁, …, qf) is configuration
space.

**Formal Definitions:**

Holonomic constraint: a constraint expressible as f(r₁, r₂, …, t) = 0 (reduces DOF by 1 each).

Degrees of freedom: f = 3N − k (k = number of independent holonomic constraints).

Generalized coordinates: any set {qᵢ}, i = 1…f, that parameterizes all allowed configurations.

Transformation:  rⱼ = rⱼ(q₁, q₂, …, qf, t)   (Cartesian positions expressed in terms of qᵢ).

Generalized velocity: q̇ᵢ = dqᵢ/dt.

**Canonical examples:**

| System | N | Constraints k | DOF f | Natural coordinates |
|--------|---|--------------|-------|---------------------|
| Bead on wire (3D) | 1 | 2 | 1 | arc length s |
| Pendulum (2D) | 1 | 1 (fixed length) | 1 | angle θ |
| Double pendulum | 2 | 2 (fixed lengths) | 2 | θ₁, θ₂ |
| Planet (2D) | 1 | 0 | 2 | r, φ (polar) |
| Rigid body (3D) | ∞ | ∞ − 6 | 6 | 3 position + 3 Euler angles |

**Worked Example 1 (Pendulum):**
A simple pendulum: mass m, fixed string length L.
N = 1 (one particle), k = 1 (length constraint: x² + y² = L²).
f = 3(1) − 1 = 2... but pendulum is planar → f = 2(1) − 1 = 1.
Natural q: angle θ. Position: x = L sinθ, y = −L cosθ.
One coordinate θ completely specifies the configuration.

**Worked Example 2 (Double pendulum):**
Two masses, two fixed strings of lengths L₁, L₂.
Constraints: string 1 fixed length, string 2 fixed length → k = 2.
Planar: f = 2(2) − 2 = 2. Coordinates: θ₁ (angle of upper rod), θ₂ (angle of lower rod relative to vertical).

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.conservative-forces  ──►
                                     phys.mech.generalized-coordinates
phys.mech.kinematics-2d        ──►
```

**PD-1 (Conservative forces — potential energy):**
"A mass on a frictionless ramp (height h) has V = mgh. Is the normal force a constraint force?
What work does it do?"
Expected: N is a constraint force (perpendicular to motion → W = 0); V = mgh is the only potential.

**PD-2 (2D kinematics — polar coordinates):**
"A particle moves in a circle of radius R. Express its velocity in terms of angle θ and θ̇."
Expected: v = Rθ̇ (tangential); |v| = Rθ̇.

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-COORD-MUST-BE-CARTESIAN (Priority 1)
**Label:** "Coordinates must be x, y, z — you can't use angles or arc lengths as coordinates"

**Trigger signals:**
- Insists on writing x, y, z even for constrained systems
- Says "but coordinates have to be in metres"
- Struggles with θ as a coordinate ("it's not a position")

**Conflict evidence [P28]:**
"A pendulum swings. If I insist on using x and y, I need x² + y² = L² always. That's two
numbers with one constraint. But the pendulum has only one independent motion — it swings.
One coordinate should be enough. θ specifies where the bob is completely. Why is θ not a
valid coordinate?"

**Bridge [P30]:**
"A coordinate is any quantity that uniquely specifies a configuration — no restriction to
distance units. θ in radians is as valid as x in metres. The only requirement: given θ, you
can find x and y uniquely (x = L sinθ, y = −L cosθ). Generalized coordinates can be angles,
lengths along a curve, or any measurable parameter."

**Replacement [P31]:**
"Count constraints first: DOF = 3N − k. Choose any f quantities that parameterize the
allowed configurations. Angles, arc lengths, ratios — all valid. Write x = x(q₁, …, qf, t)
to connect back to Cartesian."

**Discrimination pairs [P33]:**
- Pendulum: θ (angle, scalar, one DOF) vs x, y (two variables, one constraint) — θ is simpler ✓
- Bead on ring: arc length s (one DOF) vs x, y, z (three, two constraints) — s is simpler ✓

**s6_path:** Fix a pendulum example. "One number, θ, tells us everything. Any number that
does that is a valid coordinate."

---

### MC-CONSTRAINT-REDUCES-FREEDOM (Priority 2)
**Label:** "A constraint adds force; it doesn't remove degrees of freedom"

**Trigger signals:**
- Counts DOF as 3N regardless of constraints
- Conflates constraint forces (normal, tension) with constraint equations
- Says "even with the constraint, the particle can still move in 3D"

**Conflict evidence [P28]:**
"A bead threaded on a wire can only move along the wire — it has 1 DOF regardless of how
many force components act on it. The wire exerts a normal force, yes. But that force is always
perpendicular to motion; it does no work and the bead cannot leave the wire. So we have 3D space
but only 1D freedom of movement. Where did the 2 dimensions of freedom go?"

**Bridge [P30]:**
"A holonomic constraint f(r, t) = 0 reduces the independent motions by 1. It does this by
making one coordinate derivable from the others — the constraint is a geometrical restriction
on where the particle can be, not just a force. DOF = 3N − k counts the remaining independent
dimensions of motion."

**Replacement [P31]:**
"For each holonomic constraint, subtract 1 from 3N. The result f tells you how many
independent parameters you need. Those f parameters are the generalized coordinates. The
constraint forces (normal, tension) are reaction forces that enforce the geometry — they appear
implicitly; you don't need to compute them in Lagrangian mechanics."

**Discrimination pairs [P33]:**
- Pendulum: 1 constraint → f = 1 (not 2 or 3) ✓
- Ball on table surface: 1 constraint (z = 0) → f = 2 (x, y move freely) ✓

**s6_path:** "Count which directions the particle cannot move in. Each blocked direction is one
constraint, reducing DOF by 1."

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Orient to why generalized coordinates matter — Newtonian mechanics with constraints
requires computing constraint forces; Lagrangian mechanics eliminates them entirely by
choosing coordinates that respect the constraints from the start.

P04: "A bead threaded onto a rigid circular wire (radius R, fixed in a vertical plane).
How many numbers do you need to specify where the bead is? If you use x and y, you have
two numbers — but they're linked by x² + y² = R². How many are really independent?"

P06: "One number — the angle θ — says everything. This is the idea: choose coordinates
that already respect the constraints. Then every configuration corresponds to exactly one
set of coordinate values, with no wasted constraint equations."

---

### TA-2 — Conceptual Development [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Table of canonical examples (from Component 1). Diagram: pendulum with
(x, y) coordinates and constraint circle vs θ as the single coordinate on a number line.

P08 (definition): DOF formula f = 3N − k. Transformation equations rⱼ = rⱼ(q₁, …, qf, t).
Generalized velocity q̇ᵢ. Walk through single pendulum (Example 1) and double pendulum
(Example 2).

P05: "The payoff: in Lagrangian mechanics, we write T and V in terms of qᵢ and q̇ᵢ. The
Euler-Lagrange equation gives equations of motion automatically — without ever computing
the tension in the string or the normal force from the wire."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: Present PD-1 and PD-2. Gap in either → repair before continuing.

P10: "A mass slides on a frictionless surface inside a spherical bowl of radius R (fixed).
(a) How many constraints? (b) DOF? (c) Suggest natural generalized coordinates."

P13: "(a) 1 constraint: x² + y² + z² = R². (b) f = 3(1) − 1 = 2. (c) θ (polar angle from
vertical) and φ (azimuthal angle) — spherical coordinates on the surface."

---

### TA-4 — MC-COORD-MUST-BE-CARTESIAN Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A simple pendulum oscillates in a plane. A student says: 'I need both x
and y to describe its position.' Another student says: 'I only need θ.' Who is right, and why?"

Listen: if student sides with x and y and cannot explain the redundancy → MC-COORD-MUST-BE-CARTESIAN.

P28 → P30 → P31 (full Misconception Engine sequence).

P33: "θ determines x = L sinθ and y = −L cosθ uniquely. So θ alone is sufficient. Using
x and y requires carrying the constraint x² + y² = L² alongside every equation. θ respects
the constraint automatically."

P36: "How would you handle a double pendulum? Two angles θ₁ and θ₂ — two DOF, zero
constraint equations needed."

---

### TA-5 — MC-CONSTRAINT-REDUCES-FREEDOM Probe + DOF Practice [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "Two masses connected by a rigid rod of length d, moving freely in 3D. How many DOF?"

Listen: if student says 6 (three per mass, ignoring constraint) → MC-CONSTRAINT-REDUCES-FREEDOM.

P28 → P30 → P31 (Misconception Engine for MC-CONSTRAINT-REDUCES-FREEDOM).

P10 (DOF practice):
1. "Single mass, free in 3D, no constraints. DOF?" [3]
2. "Single pendulum, planar motion. DOF?" [1]
3. "Mass on a frictionless horizontal table. DOF?" [2]
4. "Double pendulum in a plane. DOF?" [2]
5. "Two masses connected by a rigid rod, moving freely in 3D. DOF?" [f = 3(2) − 1 = 5:
   3 for CM position + 2 for rod orientation]

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

Problem set:

1. **DOF count:** A rigid body (airplane) in free 3D space. DOF?
   [Answer: 6 — 3 translational (CM) + 3 rotational (Euler angles)]

2. **Coordinate choice:** A mass on a frictionless ramp inclined at angle α. Single coordinate?
   [Answer: s (distance along the ramp); or equivalently x with y = x tanα, but s is cleaner]

3. **Transformation:** Single pendulum, length L, angle θ from vertical. Write x(θ) and y(θ).
   [Answer: x = L sinθ, y = −L cosθ (measuring y downward) or y = −L cosθ (upward)]

4. **Constraint identification:** Two particles at r₁ and r₂ connected by a spring of natural
   length L₀ (spring can stretch/compress). How many DOF? Is the spring-length constraint holonomic?
   [Answer: 6 DOF — the spring exerts a force but the distance |r₁ − r₂| is not fixed → no
   holonomic constraint. DOF = 3(2) − 0 = 6.]

5. **Configuration space:** A bead on a closed loop (circle). Configuration space is a circle S¹.
   A bead on a torus (two concentric loops) — how many DOF and what is configuration space?
   [Answer: 2 DOF; configuration space is a torus T².]

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: DOF = 3N − k (k holonomic constraints). Generalized coordinates qᵢ are any
independent parameters that specify the configuration — angles, arc lengths, anything. The
transformation rⱼ = rⱼ(q₁, …, qf, t) connects back to Cartesian. The key gain: constraints
are absorbed into the coordinate choice; we never need to compute constraint forces."

P62: "Next session opener: 'A planar double pendulum has two rods of lengths L₁ and L₂.
How many DOF? Write the kinetic energy T in terms of θ₁, θ₂, θ̇₁, θ̇₂.'"

P85: "You recognized that fewer free parameters means simpler equations of motion — the core
motivation for everything in Lagrangian and Hamiltonian mechanics."

P89: Log MC flags; note DOF counting errors; record whether transformation equations were set
up correctly.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4.25/5 correct = PASS at threshold 0.85)

**MP-1 (Understand — DOF formula):**
"A planar double pendulum has masses m₁, m₂ and fixed string lengths L₁, L₂.
(a) How many particles? (b) How many constraints? (c) DOF?"
Expected: (a) 2 particles; (b) 2 constraints (fixed lengths, planar → k=2); (c) f = 2(2) − 2 = 2.
_Discriminates: f = 2N − k for planar case; constraint counting._

**MP-2 (Understand — coordinate choice):**
"A mass slides without friction on the inner surface of a fixed sphere of radius R.
Suggest the minimal set of generalized coordinates and state their range."
Expected: θ ∈ [0, π] (polar angle from vertical axis), φ ∈ [0, 2π) (azimuthal angle);
2 DOF; 2 coordinates.
_Discriminates: 2D surface → 2 DOF; natural spherical coordinates._

**MP-3 (Apply — transformation):**
"A simple pendulum of length L oscillates in a vertical plane. Write x(θ), y(θ)
and derive ẋ(θ, θ̇), ẏ(θ, θ̇)."
Expected: x = L sinθ, y = −L cosθ; ẋ = L cosθ · θ̇, ẏ = L sinθ · θ̇.
_Discriminates: chain rule for generalized velocities._

**MP-4 (Understand — constraint classification):**
"For each system, state whether the constraint is holonomic or not:
(a) Bead on a rigid wire: |r|² = R².
(b) Particle constrained to stay inside a sphere: |r| ≤ R.
(c) Rolling without slipping (pure rolling condition)."
Expected: (a) holonomic; (b) NOT holonomic (inequality, not equation); (c) non-holonomic
(the rolling constraint involves velocities in a way not integrable to a position constraint).
_Discriminates: distinction between holonomic, inequality, and non-holonomic constraints._

**MP-5 (Understand — configuration space):**
"A planar pendulum (angle θ ∈ (−π, π]) can swing all the way around. What is its
configuration space topologically? What if the pendulum can only swing between −90° and +90°?"
Expected: Full-circle pendulum: configuration space = S¹ (circle); limited pendulum:
configuration space = interval (segment of a line).
_Discriminates: topology of configuration space; physical interpretation of coordinate range._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "DOF formula? Example: single pendulum."
Threshold: f = 3N − k; single pendulum f = 1.

**FA-2 (TA-4 exit):** "Why is θ sufficient for a pendulum? What makes it a valid generalized coordinate?"
Expected: θ uniquely determines (x, y) via x = L sinθ, y = −L cosθ; it parameterizes all
allowed configurations; constraint is automatically satisfied.

**FA-3 (TA-5 exit):** "Two masses, rigid rod in 3D. DOF?"
Expected: f = 5 (3 for CM + 2 for rod direction). If student says 6 → MC-CONSTRAINT-REDUCES-FREEDOM not resolved.

**FA-4 (Session exit):** Administer MP-1, MP-2, MP-3. 3/3 → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Stay with planar examples only (θ for pendulum, s for bead on wire).
- Skip non-holonomic constraints in first pass (TA-5 MP-4 part (c)).
- Reassure: "One number specifies where everything is. Count the constraints, subtract from 3N."
- Build from pendulum (1 DOF) before anything more complex.

**S7 (Overconfident) path [Protocol G]:**
- Lead with MP-4 (non-holonomic) and MP-5 (topology of configuration space).
- Challenge: "For a double pendulum, write T in terms of θ₁, θ₂, θ̇₁, θ̇₂. Is there a
  cross-term (θ̇₁θ̇₂)?  Show why."
- Discuss non-holonomic constraints and why they don't reduce DOF.

**S4 (Prereq gap):**
- PD-1 gap (conservative forces) → repair potential energy and work concepts before returning.
- PD-2 gap (2D kinematics / polar) → repair velocity components in polar coordinates.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → DOF formula → MC-COORD probe).
**Session 2 (≥24 h later):** Retrieval: "DOF formula? Single pendulum coordinates?"
  → TA-5 (MC-CONSTRAINT probe) → TA-6 (Problem set, at least problems 1–3).
**Session 3 (≥72 h later):** Interleaved probe:
  "A particle is confined to the surface of a cone z = α√(x²+y²). How many DOF?
  What are natural generalized coordinates?"
  (Answer: 2 DOF — use r (distance from cone axis) and φ (azimuthal angle);
  then z = αr automatically.)
**Pre-Euler-Lagrange session:** All 5 P91 probes cold; require 4/5 before advancing.

**Interleaving partners:** phys.mech.conservative-forces (potential energy in q coordinates),
phys.mech.euler-lagrange-equation (next concept in chain).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.generalized-coordinates ✓
V-2   prerequisites listed and exist in KG: phys.mech.conservative-forces,
      phys.mech.kinematics-2d ✓
V-3   bloom level consistent with difficulty 6/expert: understand ✓
V-4   mastery_threshold in range [0.70, 0.95]: 0.85 ✓
V-5   estimated_hours reasonable for difficulty: 6h for expert ✓
V-6   session_cap derivation correct: ≥1h → 7 TAs ✓
V-7   cpa_entry_stage rationale present: bead on wire / one-number anchor ✓
V-8   ≥2 misconceptions engineered: MC-COORD-MUST-BE-CARTESIAN,
      MC-CONSTRAINT-REDUCES-FREEDOM ✓
V-9   each MC has trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P06]: bead-on-wire / pendulum scene ✓
V-12  TA-4 is MC diagnostic probe [P14, P28, P30, P31, P33, P36]:
      MC-COORD-MUST-BE-CARTESIAN ✓
V-13  TA-7 is closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 mastery probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments with thresholds: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols specified in Component 7 ✓
V-17  3-session spaced retrieval plan present: Component 8 ✓
V-18  interleaving partners named: conservative-forces, euler-lagrange-equation ✓
V-19  cross_links match KG edges: euler-lagrange-equation, hamiltonian ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY — V-1 through V-20 PASS**

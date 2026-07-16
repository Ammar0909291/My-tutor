# Teaching Blueprint — phys.mech.euler-lagrange-equation

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.euler-lagrange-equation
name:               The Euler-Lagrange Equation and Hamilton's Principle
domain:             Classical Mechanics — Analytical Mechanics (Physics)
difficulty:         expert (6)
bloom:              apply
mastery_threshold:  0.85
estimated_hours:    8
prerequisites:      [phys.mech.generalized-coordinates]
cross_links:        [phys.mech.cyclic-coordinates-conservation-laws,
                     phys.mech.hamiltonian, phys.mech.conservative-forces]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a pendulum equation of motion derived without resolving
                       the tension — show the Lagrangian approach gives the
                       same θ̈ equation as the Newtonian approach but without
                       needing T; difficulty 6 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** The Lagrangian L = T − V is a function of generalized coordinates qᵢ,
generalized velocities q̇ᵢ, and time t. Hamilton's Principle states that the actual path
of a system between two configurations is the one that makes the action S = ∫L dt stationary.
This variational principle yields the Euler-Lagrange equations:

    d/dt (∂L/∂q̇ᵢ) − ∂L/∂qᵢ = 0   for each i = 1, …, f

These are the equations of motion. They replace Newton's F = ma and automatically exclude
constraint forces — the key power of the Lagrangian formulation.

**Formal Definitions:**

Lagrangian: L(q, q̇, t) = T(q, q̇, t) − V(q, t)

Action: S[q(t)] = ∫[t₁ to t₂] L(q, q̇, t) dt    (functional of the path)

Hamilton's Principle (Principle of Stationary Action): δS = 0 ⟺ actual path.

Euler-Lagrange equation: d/dt(∂L/∂q̇ᵢ) − ∂L/∂qᵢ = 0

Generalized force: Qᵢ = ∂L/∂qᵢ (from potential forces only in conservative systems).

Generalized momentum: pᵢ = ∂L/∂q̇ᵢ (canonical momentum conjugate to qᵢ).

**Worked Example 1 (Simple pendulum):**
Single pendulum, length L, mass m, angle θ from vertical.
T = ½m(Lθ̇)² = ½mL²θ̇²
V = −mgL cosθ (taking pivot as origin, y positive upward)
L = T − V = ½mL²θ̇² + mgL cosθ

∂L/∂θ̇ = mL²θ̇  →  d/dt(∂L/∂θ̇) = mL²θ̈
∂L/∂θ = −mgL sinθ

E-L equation: mL²θ̈ − (−mgL sinθ) = 0  →  mL²θ̈ + mgL sinθ = 0
→  θ̈ + (g/L) sinθ = 0   (standard pendulum equation — no tension ever computed!)

**Worked Example 2 (Mass on spring):**
1D spring-mass: x the displacement, mass m, spring constant k.
T = ½mẋ²,  V = ½kx²,  L = ½mẋ² − ½kx²

∂L/∂ẋ = mẋ  →  d/dt(∂L/∂ẋ) = mẍ
∂L/∂x = −kx

E-L: mẍ − (−kx) = 0  →  mẍ + kx = 0  ✓  (Newton's 2nd confirmed)

**Worked Example 3 (Particle in polar coordinates):**
Free particle in 2D polar (r, φ). No potential.
T = ½m(ṙ² + r²φ̇²),  V = 0,  L = ½m(ṙ² + r²φ̇²)

For r: d/dt(mṙ) − mrφ̇² = 0  →  r̈ − rφ̇² = 0
For φ: d/dt(mr²φ̇) − 0 = 0  →  d/dt(mr²φ̇) = 0  (mr²φ̇ = const → angular momentum conserved)

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.generalized-coordinates  ──►  phys.mech.euler-lagrange-equation
```

**PD-1 (Generalized coordinates — DOF and kinetic energy in q, q̇):**
"A pendulum (length L, angle θ). Write T in terms of θ and θ̇."
Expected: T = ½mL²θ̇².

**PD-2 (Conservative forces — potential energy):**
"For the same pendulum (V = 0 at pivot level, V = −mgL cosθ for angle θ from vertical).
Write V(θ)."
Expected: V = −mgL cosθ.

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-LAGRANGIAN-IS-ENERGY (Priority 1)
**Label:** "The Lagrangian L = T − V is the total energy of the system"

**Trigger signals:**
- Calls L "the energy" or "total mechanical energy"
- Sets L = T + V
- Confused when L can be negative (V > T)

**Conflict evidence [P28]:**
"Total mechanical energy is E = T + V. But the Lagrangian is L = T − V — the minus sign
is not a typo. For a spring at maximum stretch (all potential energy): T = 0, V = ½kA² > 0,
so E = ½kA² but L = −½kA² < 0. If L were the energy, it could not be negative. What is L
actually?"

**Bridge [P30]:**
"L = T − V is not an energy — it's a mathematical object (a function of q and q̇) whose
time-integral gives the action. The E-L equation is derived by requiring the action to be
stationary — the minus sign in T − V is essential to that derivation and gives the correct
equations of motion. Think of L as 'the quantity whose integral you minimize' not 'energy.'"

**Replacement [P31]:**
"L = T − V. Write it this way every time. Total energy = T + V = E. Lagrangian = T − V = L.
They look similar but play different roles: E is conserved (when ∂L/∂t = 0); L is the
integrand of the action."

**Discrimination pairs [P33]:**
- At equilibrium (T=0, V=V₀): E = V₀ > 0, but L = −V₀ < 0 ✓
- Free particle (V=0): E = T = L (coincidentally equal — not in general) ✓

**s6_path:** "T − V, not T + V. Write 'L = T − V' at the top of every problem."

---

### MC-EL-NEEDS-FORCES (Priority 2)
**Label:** "You still need to find the constraint forces to use the Euler-Lagrange equation"

**Trigger signals:**
- Tries to add tension or normal force to the E-L equation
- Says "but I need the tension to find θ̈ for the pendulum"
- Adds a constraint force term to the right-hand side

**Conflict evidence [P28]:**
"In the pendulum derivation (Worked Example 1), did the tension T appear anywhere in L?
L = ½mL²θ̇² + mgL cosθ — only kinetic energy (from θ̇) and gravitational potential (from θ).
The tension did no work (perpendicular to motion); the θ coordinate already enforces the
fixed-length constraint. Where does the tension enter the Euler-Lagrange equation?"

**Bridge [P30]:**
"The tension doesn't enter at all — that's the entire point. By choosing θ as the generalized
coordinate, the length constraint x² + y² = L² is automatically satisfied. Constraint forces
do no work in the direction of motion along the constraint surface — they cancel out of the
variational principle. L contains only the forces derivable from a potential."

**Replacement [P31]:**
"Write T and V in terms of the generalized coordinates. Constraint forces — normal forces,
tensions, joint forces — do not appear in L if the constraints are holonomic. Apply the E-L
equation directly: d/dt(∂L/∂q̇ᵢ) = ∂L/∂qᵢ. The equations of motion appear automatically."

**Discrimination pairs [P33]:**
- Pendulum with Newtonian approach: need T (tension) + θ component of gravity
- Pendulum with E-L approach: L = ½mL²θ̇² + mgL cosθ, no T anywhere ✓

**s6_path:** "Write L = T − V using only coordinates and velocities. Stop there.
Apply the formula. No forces needed."

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Connect to generalized coordinates from last session. The goal: equations of motion
for any mechanical system, without ever drawing a free-body diagram.

P04: "A pendulum. The Newtonian approach: identify forces (gravity, tension), resolve
into components (messy), apply Newton's 2nd. The tension cancels anyway in the final
equation. Is there a method that produces the θ̈ equation directly, without ever computing
the tension?"

P06: "Yes: the Lagrangian method. Write L = T − V using θ and θ̇. Apply one formula.
Out comes θ̈ + (g/L)sinθ = 0. No tension, no component resolution."

---

### TA-2 — Formula Development [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Diagram of a path q(t) between configurations A and B in configuration
space. The actual path (solid) vs varied paths (dashed). Caption: "δS = 0 selects the
actual path."

P08 (formula): L = T − V. Action S = ∫L dt. E-L equation:
  d/dt(∂L/∂q̇ᵢ) − ∂L/∂qᵢ = 0.
  Canonical momentum pᵢ = ∂L/∂q̇ᵢ.
Walk through Worked Example 1 (pendulum) step by step.

P05: "The E-L equation for each qᵢ is one ODE. For f degrees of freedom, you get f ODEs —
the complete equations of motion. This is the Lagrangian recipe."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: PD-1 and PD-2. Both must pass.

P10: "A particle on a frictionless inclined plane (angle α, height h, displacement s along
the ramp). (a) Write T in terms of ṡ. (b) Write V in terms of s. (c) Write L. (d) Apply
E-L for coordinate s to find the equation of motion."

P13:
(a) T = ½mṡ²
(b) V = mgs sinα (taking bottom as reference)
(c) L = ½mṡ² − mgs sinα
(d) d/dt(∂L/∂ṡ) = mṡ̈ = ms̈; ∂L/∂s = −mg sinα; E-L: ms̈ = −(−mg sinα) → s̈ = g sinα ✓
(Correct — particle slides down the ramp with acceleration g sinα.)

---

### TA-4 — MC-LAGRANGIAN-IS-ENERGY Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A spring-mass system (k = 100 N/m, m = 0.5 kg) has amplitude A = 0.2 m.
At maximum displacement (x = A, ẋ = 0): what is the total energy? What is the Lagrangian?"

Listen: if student writes L = T + V or L = E → MC-LAGRANGIAN-IS-ENERGY confirmed.

P28 → P30 → P31 (full MC sequence).

P33: E = T + V = 0 + ½kA² = ½(100)(0.04) = 2 J.
L = T − V = 0 − ½kA² = −2 J. Same magnitude, opposite sign — definitely not the same.

P36: "Now compute L at x = 0 (equilibrium, ẋ = Aω): T = ½mA²ω² = E = 2 J, V = 0,
L = 2 J − 0 = 2 J. So L changes over the cycle but E stays constant at 2 J."

---

### TA-5 — MC-EL-NEEDS-FORCES Probe + Practice [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "For a pendulum, a student writes L = T − V and gets stuck. They say: 'I need the
tension to apply E-L.' What would you tell them?"

Listen: if student agrees the tension is needed → MC-EL-NEEDS-FORCES confirmed.

P28 → P30 → P31 (MC sequence).

P10 (E-L practice — polar coordinates):
"A particle of mass m moves freely in 2D (no potential). Use polar coordinates (r, φ).
(a) Write T. (b) Write L. (c) Apply E-L for r and for φ. Identify what the φ equation says."

P13:
(a) T = ½m(ṙ² + r²φ̇²), V = 0.
(b) L = ½m(ṙ² + r²φ̇²).
(c) For r: d/dt(mṙ) − mrφ̇² = 0 → r̈ − rφ̇² = 0.
    For φ: d/dt(mr²φ̇) − 0 = 0 → angular momentum mr²φ̇ = const.
    The φ equation says angular momentum is conserved (since φ doesn't appear in L).

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

1. **Spring on incline:** Spring (k) on frictionless incline (α), equilibrium displaced
   by s from natural length. Write L and find equation of motion.
   [Answer: L = ½mṡ² − ½ks² + mgs sinα; E-L: ms̈ = −ks + mg sinα; SHM about new equilibrium]

2. **Atwood machine:** Two masses m₁, m₂ over frictionless pulley. One coordinate: x
   (displacement of m₁). Write L and derive equation of motion.
   [Answer: T = ½(m₁+m₂)ẋ²; V = −m₁gx + m₂gx; L = ½(m₁+m₂)ẋ² − (m₂−m₁)gx;
   E-L: (m₁+m₂)ẍ = (m₁−m₂)g ✓]

3. **2D polar free particle:** Verify that the r equation r̈ − rφ̇² = 0 is the
   centripetal acceleration condition for circular motion (φ̇ = const).
   [Answer: if φ̇ = ω = const, r̈ = rω² = centripetal; also obtainable from F = ma in polar]

4. **Canonical momentum:** For the pendulum L = ½mL²θ̇² + mgL cosθ, what is the
   canonical momentum p_θ? What does it represent physically?
   [Answer: p_θ = ∂L/∂θ̇ = mL²θ̇ = angular momentum about the pivot]

5. **Generalize:** Write the E-L equation for a coordinate qᵢ when ∂L/∂qᵢ = 0 (cyclic
   coordinate). What is conserved?
   [Answer: d/dt(∂L/∂q̇ᵢ) = 0 → pᵢ = ∂L/∂q̇ᵢ = const; the canonical momentum pᵢ is conserved]

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: L = T − V (Lagrangian). E-L equation: d/dt(∂L/∂q̇ᵢ) = ∂L/∂qᵢ for each i.
Canonical momentum pᵢ = ∂L/∂q̇ᵢ. Constraint forces never appear. Recipe: (1) count DOF,
(2) write T and V in q, q̇, (3) compute L = T − V, (4) apply E-L to each coordinate."

P62: "Next session opener: 'A cyclic coordinate (∂L/∂qᵢ = 0) means pᵢ = const.
For the pendulum in polar coordinates, which coordinate is cyclic? What is conserved?'"

P85: "You applied a single formula and obtained equations of motion that would have
required free-body diagrams, component resolution, and constraint force analysis
with Newtonian mechanics."

P89: Log MC flags; note whether L = T + V error appeared; record E-L calculation accuracy.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4.25/5 correct = PASS at threshold 0.85)

**MP-1 (Apply — Lagrangian construction):**
"A bead (mass m) slides on a frictionless vertical circular wire of radius R.
Use angle θ from the bottom. Write T(θ, θ̇) and V(θ). Then write L."
Expected: T = ½mR²θ̇², V = mgR(1 − cosθ) (zero at bottom), L = ½mR²θ̇² − mgR(1 − cosθ).
_Discriminates: T and V in generalized coordinates; V reference choice._

**MP-2 (Apply — E-L equation):**
"From MP-1's Lagrangian, apply the Euler-Lagrange equation to get the equation of motion."
Expected: d/dt(mR²θ̇) − (−mgR sinθ) = 0 → mR²θ̈ + mgR sinθ = 0 → θ̈ + (g/R) sinθ = 0.
_Discriminates: full E-L procedure; sign handling._

**MP-3 (Apply — canonical momentum):**
"For the bead on a ring (MP-1), what is the canonical momentum p_θ?"
Expected: p_θ = ∂L/∂θ̇ = mR²θ̇ (angular momentum about the centre).
_Discriminates: canonical momentum definition._

**MP-4 (Understand — constraint forces absent):**
"In the bead-on-ring problem, the wire exerts a normal force N on the bead. Where does N
appear in the Lagrangian L = ½mR²θ̇² − mgR(1 − cosθ)?"
Expected: N does not appear — it is a constraint force perpendicular to motion; it does no
work along θ; choosing θ as the coordinate automatically satisfies the constraint |r| = R.
_Discriminates: MC-EL-NEEDS-FORCES resolution._

**MP-5 (Apply — two-DOF system):**
"Atwood machine (masses m₁ > m₂, one coordinate x = displacement of m₁ downward).
Write L and find the acceleration ẍ."
Expected: L = ½(m₁+m₂)ẋ² − (m₂−m₁)gx + const;
d/dt[(m₁+m₂)ẋ] = (m₁−m₂)g; ẍ = (m₁−m₂)/(m₁+m₂) · g.
_Discriminates: multi-mass single-DOF; T for system; E-L applied correctly._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "What is L? Write the E-L equation."
Threshold: L = T − V; d/dt(∂L/∂q̇ᵢ) − ∂L/∂qᵢ = 0.

**FA-2 (TA-4 exit):** "At maximum spring stretch, compare L and E."
Expected: L = T − V = 0 − V < 0; E = T + V = V > 0; L ≠ E.
If student writes L = E → MC-LAGRANGIAN-IS-ENERGY not resolved.

**FA-3 (TA-5 exit):** "Pendulum: where does the tension appear in L?"
Expected: Nowhere — L = ½mL²θ̇² + mgL cosθ; tension is a constraint force.
If student says "you need tension" → MC-EL-NEEDS-FORCES not resolved.

**FA-4 (Session exit):** MP-1 and MP-2. Both correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Stay on 1-DOF systems: pendulum, incline, spring.
- Reassure: "Four steps. Write T. Write V. Subtract. Apply formula."
- Skip polar 2-DOF example (TA-5 practice) if anxiety remains after TA-4.
- Do not introduce Hamilton's Principle (variational derivation) in first pass.

**S7 (Overconfident) path [Protocol G]:**
- Challenge with constrained 2-DOF: double pendulum L (four terms including cross-term).
- Ask for canonical momenta p_θ₁ and p_θ₂ for the double pendulum.
- Present non-conservative extension: generalized forces Qᵢ when friction is present.

**S4 (Prereq gap):**
- PD-1 gap (generalized coordinates) → repair DOF counting and coordinate transformations
  before returning. Cannot do TA-3 until T can be written in q, q̇.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → L formula → MC-LAGRANGIAN-IS-ENERGY probe).
**Session 2 (≥24 h later):** Retrieval: "Write the E-L equation from memory."
  → TA-5 (MC-EL-NEEDS-FORCES probe) → TA-6 problems 1–3.
**Session 3 (≥72 h later):** Interleaved probe:
  "A double pendulum (lengths L₁, L₂, masses m₁, m₂, angles θ₁, θ₂). Write T."
  [T = ½m₁L₁²θ̇₁² + ½m₂(L₁²θ̇₁² + L₂²θ̇₂² + 2L₁L₂θ̇₁θ̇₂ cos(θ₁−θ₂))]
  Then write L and identify which coordinates are cyclic (none, in general).
**Pre-cyclic-coordinates session:** All 5 P91 probes cold; require 4/5.

**Interleaving partners:** phys.mech.generalized-coordinates (prerequisite chain),
phys.mech.cyclic-coordinates-conservation-laws (next concept),
phys.mech.conservative-forces (V construction).

---

## Component 9 — V-Check Trace

```
V-1   concept_id present and matches KG: phys.mech.euler-lagrange-equation ✓
V-2   prerequisite listed and exists in KG: phys.mech.generalized-coordinates ✓
V-3   bloom level consistent with difficulty 6/expert: apply ✓
V-4   mastery_threshold: 0.85 ✓
V-5   estimated_hours: 8h for expert apply ✓
V-6   session_cap: 7 TAs ✓
V-7   cpa_entry_stage rationale: pendulum-without-tension concrete hook ✓
V-8   ≥2 misconceptions: MC-LAGRANGIAN-IS-ENERGY, MC-EL-NEEDS-FORCES ✓
V-9   each MC: trigger/conflict/bridge/replacement/pairs/s6_path ✓
V-10  TA count = 7: TA-1…TA-7 ✓
V-11  TA-1 Concrete [P06]: pendulum Newtonian vs Lagrangian comparison ✓
V-12  TA-4 MC diagnostic [P14, P28, P30, P31, P33, P36]: L vs E ✓
V-13  TA-7 closure [P68, P62, P85, P89] ✓
V-14  ≥5 P91 probes with expected answers: MP-1…MP-5 ✓
V-15  4 formative assessments: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols: Component 7 ✓
V-17  3-session retrieval plan: Component 8 ✓
V-18  interleaving partners: generalized-coordinates, cyclic-coordinates,
      conservative-forces ✓
V-19  cross_links match KG: cyclic-coordinates-conservation-laws, hamiltonian ✓
V-20  status = READY, all V-checks passed ✓
```

**Status: READY — V-1 through V-20 PASS**

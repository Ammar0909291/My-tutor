# Teaching Blueprint — phys.mech.hamiltonian

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.hamiltonian
name:               The Hamiltonian and Legendre Transform
domain:             Classical Mechanics — Analytical Mechanics (Physics)
difficulty:         expert (6)
bloom:              understand
mastery_threshold:  0.85
estimated_hours:    6
prerequisites:      [phys.mech.euler-lagrange-equation]
cross_links:        [phys.mech.hamiltons-equations, phys.mech.cyclic-coordinates-conservation-laws,
                     phys.mech.conservation-of-energy]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (for a spring-mass system, compute H = p²/2m + ½kx² and
                       note it equals the total energy E; difficulty 6 →
                       C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** The Hamiltonian H is obtained from the Lagrangian L via a Legendre
transform with respect to generalized velocities. It is a function of generalized coordinates
qᵢ and canonical momenta pᵢ (not q̇ᵢ). When the kinetic energy is a quadratic function of
velocities and the constraints are time-independent:

    H = Σᵢ pᵢq̇ᵢ − L = T + V = total energy

The Hamiltonian moves mechanics from the (q, q̇, t) space used by the Lagrangian to the
(q, p, t) phase space — a symmetric first-order framework that is the foundation of
Hamiltonian mechanics, quantum mechanics, and statistical mechanics.

**Formal Definitions:**

Canonical (generalized) momentum: pᵢ = ∂L/∂q̇ᵢ

Legendre transform: H(q, p, t) = Σᵢ pᵢq̇ᵢ − L(q, q̇, t)   [with q̇ expressed in terms of p]

When T is quadratic in q̇ and constraints time-independent: H = T + V = E.

Phase space: the 2f-dimensional space with coordinates (q₁, …, qf, p₁, …, pf).

**Worked Example 1 (Simple pendulum):**
L = ½mL²θ̇² + mgL cosθ.
p_θ = ∂L/∂θ̇ = mL²θ̇  →  θ̇ = p_θ/(mL²).
H = p_θ · θ̇ − L = p_θ · p_θ/(mL²) − [½mL²(p_θ/mL²)² + mgL cosθ]
  = p_θ²/(mL²) − p_θ²/(2mL²) − mgL cosθ
  = p_θ²/(2mL²) − mgL cosθ
  = T + V = E ✓

**Worked Example 2 (Spring-mass in 1D):**
L = ½mẋ² − ½kx².
p = mẋ  →  ẋ = p/m.
H = p·ẋ − L = p·(p/m) − [½m(p/m)² − ½kx²]
  = p²/m − p²/(2m) + ½kx²
  = p²/(2m) + ½kx²
  = T + V ✓

**Worked Example 3 (2D polar, free particle):**
T = ½m(ṙ² + r²φ̇²).
p_r = mṙ, p_φ = mr²φ̇.
ṙ = p_r/m, φ̇ = p_φ/(mr²).
H = p_r²/(2m) + p_φ²/(2mr²)   (kinetic energy in phase space variables).

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.euler-lagrange-equation  ──►  phys.mech.hamiltonian
```

**PD-1 (Canonical momentum definition):**
"For L = ½mẋ² − V(x), compute p = ∂L/∂ẋ."
Expected: p = mẋ.

**PD-2 (Expressing q̇ in terms of p):**
"If p = mẋ, express ẋ in terms of p."
Expected: ẋ = p/m.

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-H-IS-L (Priority 1)
**Label:** "The Hamiltonian H is just the Lagrangian with different notation"

**Trigger signals:**
- Writes H = T − V (confuses H with L)
- Says H and L are the same object evaluated differently
- Cannot state the different domains: L(q, q̇, t) vs H(q, p, t)

**Conflict evidence [P28]:**
"For a spring: L = T − V = ½mẋ² − ½kx². H = T + V = p²/(2m) + ½kx².
At maximum stretch (x = A, ẋ = 0, p = 0): L = 0 − ½kA² = −½kA² < 0.
H = 0 + ½kA² = ½kA² > 0. Same magnitude, opposite sign. Same thing?"

**Bridge [P30]:**
"L = T − V; H = T + V. They use different independent variables: L takes (q, q̇, t) as inputs;
H takes (q, p, t) as inputs. The Legendre transform is the mathematical operation that switches
from velocity to momentum as the independent variable. They encode the same physics
but are different mathematical objects with different signs and different domains."

**Replacement [P31]:**
"L(q, q̇, t) = T − V. H(q, p, t) = T + V (when T quadratic, constraints time-independent).
Two different functions. Derive H from L: (1) compute pᵢ = ∂L/∂q̇ᵢ; (2) solve for q̇ᵢ(q, p);
(3) H = Σpᵢq̇ᵢ − L, substituting everything in terms of q and p."

**Discrimination pairs [P33]:**
- At v = 0: L = −V, H = V (opposite) ✓
- At x = 0 (equilibrium): L = T, H = T (coincide — misleading!) — but only at this instant ✓

**s6_path:** "H = T + V. L = T − V. Write both on the page for comparison every time."

---

### MC-H-ALWAYS-ENERGY (Priority 2)
**Label:** "H always equals the total energy T + V"

**Trigger signals:**
- Assumes H = E without checking whether constraints are time-dependent
- Applies H = E to systems with explicitly time-dependent L
- Does not know when H ≠ E

**Conflict evidence [P28]:**
"Consider a bead on a wire that is being pulled outward at constant speed v₀ (the wire
rotates so that r increases as r = r₀ + v₀t). The constraint is time-dependent.
In this case H = Σpᵢq̇ᵢ − L, but T contains cross-terms from the moving constraint,
so H ≠ T + V. H is still conserved (if ∂L/∂t = 0 in the new frame), but it does not
equal the energy in the lab frame. When is H guaranteed to equal T + V?"

**Bridge [P30]:**
"H = T + V requires two conditions: (1) the kinetic energy T is a homogeneous quadratic
function of the velocities q̇ᵢ (no linear terms), AND (2) the constraints are
time-independent. When either fails — time-dependent constraints or non-standard T —
H may not equal the mechanical energy, though it is still a well-defined conserved
quantity if ∂L/∂t = 0."

**Replacement [P31]:**
"H = Σpᵢq̇ᵢ − L always. H = T + V only when T is quadratic in q̇ and constraints are
time-independent. Check both conditions before writing H = E."

**Discrimination pairs [P33]:**
- Simple pendulum (time-independent): H = E = T + V ✓
- Bead on expanding ring (time-dependent constraint): H ≠ E (compute explicitly to show) ✓

**s6_path:** "For all standard problems in this course: T is quadratic, constraints are
fixed → H = E = T + V. State this condition explicitly."

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Connect to the Lagrangian approach. The Lagrangian L(q, q̇, t) is great for deriving
equations of motion — but q̇ appears as an independent variable. Can we trade q̇ for
something more symmetric with q?

P04: "The Hamiltonian H is like the Lagrangian's alter ego. For a spring: L = ½mẋ² − ½kx²;
H = p²/(2m) + ½kx² where p = mẋ. H describes the same physics but uses momentum p instead
of velocity ẋ. What's the advantage of using p instead of ẋ?"

P06: "Phase space (q, p) is symmetric: H gives equations for q̇ and ṗ both as first-order
equations. This turns out to be more powerful — it's the language of quantum mechanics, chaos
theory, and statistical mechanics."

---

### TA-2 — Legendre Transform Procedure [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Side-by-side table: L(q, q̇) vs H(q, p). Variables → expressions → equations of motion.

P08 (procedure): Step 1: pᵢ = ∂L/∂q̇ᵢ. Step 2: Solve for q̇ᵢ(q, p). Step 3: H = Σpᵢq̇ᵢ − L.
Substitution required in Step 3. Walk Worked Examples 1 and 2.

P05: "When T is quadratic in q̇ (always true for standard mechanics) and constraints are
time-independent: H = T + V = total energy. This is the usual case."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: PD-1 and PD-2.

P10: "Particle in 2D Cartesian, V = V(x, y):
(a) Write L. (b) Compute pₓ and p_y. (c) Express ẋ, ẏ in terms of pₓ, p_y.
(d) Compute H = pₓẋ + p_yẏ − L."

P13:
(a) L = ½m(ẋ² + ẏ²) − V(x, y)
(b) pₓ = mẋ, p_y = mẏ
(c) ẋ = pₓ/m, ẏ = p_y/m
(d) H = pₓ(pₓ/m) + p_y(p_y/m) − [½m(pₓ/m)² + ½m(p_y/m)² − V]
     = pₓ²/m + p_y²/m − pₓ²/(2m) − p_y²/(2m) + V
     = (pₓ² + p_y²)/(2m) + V = T + V ✓

---

### TA-4 — MC-H-IS-L Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "For a spring-mass system at maximum stretch (x = A, v = 0):
compute L and H. Are they equal? What does this tell you about the relationship between L and H?"

Listen: if student writes H = L = 0 or H = T − V → MC-H-IS-L confirmed.

P28 → P30 → P31 (MC sequence).

P33: L = T − V = 0 − ½kA² = −½kA². H = T + V = 0 + ½kA² = +½kA². L = −H ≠ H.

P36: "At x = 0, v = Aω (maximum speed): T = E, V = 0. L = E − 0 = E. H = E + 0 = E.
Here L = H = E — a coincidence (not the general case). Confirm by computing at x = A/2."

---

### TA-5 — MC-H-ALWAYS-ENERGY Probe + Phase Space [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "State the conditions under which H = T + V exactly."

Listen: if student says "always" without stating conditions → MC-H-ALWAYS-ENERGY.

P28 → P30 → P31.

P10 (phase space portrait):
"For a spring-mass (L = ½mẋ² − ½kx², H = p²/(2m) + ½kx²):
(a) What are the (x, p) phase space variables?
(b) H = E defines a curve in phase space. What shape is it?
(c) At (x, p) = (A, 0) and (0, mAω): compute H. Are they the same?"

P13:
(a) x (position), p = mẋ (momentum).
(b) p²/(2mE) + x²/(2E/k) = 1 → ellipse in phase space (semiaxes mAω in p, A in x).
(c) H(A, 0) = ½kA²; H(0, mAω) = (mAω)²/(2m) = ½mA²ω² = ½kA² ✓ (same energy on ellipse).

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

1. **Pendulum Hamiltonian:** L = ½mL²θ̇² + mgL cosθ. Derive H(θ, p_θ).
   [Answer: p_θ = mL²θ̇; H = p_θ²/(2mL²) − mgL cosθ]

2. **Free particle in polar:** L = ½m(ṙ² + r²φ̇²). Derive H(r, φ, p_r, p_φ).
   [Answer: p_r = mṙ, p_φ = mr²φ̇; H = p_r²/(2m) + p_φ²/(2mr²)]

3. **Identify phase space:** For H = p²/(2m) + V(x), the phase space trajectory for
   constant H is a level curve of H. Describe the trajectory qualitatively for
   V(x) = mgx (free fall in 1D).
   [Answer: H = const → p² = 2m(H − mgx); as x increases, p decreases; trajectory is
   a parabola in (x, p) space opening left]

4. **When H ≠ E:** A pendulum of length L(t) = L₀ + vt (the string is slowly shortened).
   Is ∂L/∂t = 0? Does H = E in this case? (Qualitative only — exact T is more complex.)
   [Answer: ∂L/∂t ≠ 0 (explicit time dependence); H is NOT conserved and H ≠ E;
   the person shortening the string does work on the system]

5. **Canonical momenta identification:** For a diatomic molecule modeled as two masses
   (m) connected by a spring (k), moving in 1D: use coordinates x_cm (centre of mass)
   and r (separation). Write T in terms of ẋ_cm and ṙ. Compute canonical momenta.
   [Answer: T = ½(2m)ẋ_cm² + ½(m/2)ṙ² (reduced mass μ = m/2);
   p_cm = 2mẋ_cm, p_r = (m/2)ṙ]

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: pᵢ = ∂L/∂q̇ᵢ (canonical momentum). H = Σpᵢq̇ᵢ − L (Legendre transform).
When T quadratic and constraints time-independent: H = T + V = E. Phase space = (q, p) space.
Hamiltonian ≠ Lagrangian: L = T − V, H = T + V, different variables."

P62: "Next session opener: 'From H = p²/(2m) + ½kx², derive dH/dt without solving the
equations of motion. What does this imply about energy conservation?'"

P85: "You performed the Legendre transform — the same operation that connects temperature
to entropy in thermodynamics, and free energy to internal energy. It appears across all of
physics."

P89: Log MC flags; record whether L vs H confusion appeared; note Legendre transform
accuracy.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4.25/5 correct = PASS at threshold 0.85)

**MP-1 (Understand — Legendre transform procedure):**
"A particle moves in a 1D potential V(x). L = ½mẋ² − V(x).
Carry out the Legendre transform to find H(x, p)."
Expected: p = mẋ → ẋ = p/m; H = p·(p/m) − [½m(p/m)² − V(x)] = p²/(2m) + V(x).
_Discriminates: three-step Legendre transform._

**MP-2 (Understand — domain of H vs L):**
"What are the independent variables of L? Of H? Why does this difference matter?"
Expected: L = L(q, q̇, t): q and q̇ independent. H = H(q, p, t): q and p independent.
Matters because the equations derived from H (Hamilton's equations) treat q and p symmetrically.
_Discriminates: variable distinction; not just L vs E sign._

**MP-3 (Apply — pendulum H):**
"L = ½mL²θ̇² + mgL cosθ. Derive H(θ, p_θ). What is p_θ physically?"
Expected: p_θ = mL²θ̇ (angular momentum). H = p_θ²/(2mL²) − mgL cosθ = T + V.
_Discriminates: full derivation; physical interpretation of p_θ._

**MP-4 (Understand — H = E conditions):**
"A charged particle (charge q) moves in a magnetic field B(x,t) (time-varying).
Does H necessarily equal the total kinetic energy? Explain."
Expected: In a magnetic field, the canonical momentum p = mv + qA (includes vector potential A);
T = (p − qA)²/(2m) ≠ p²/(2m). H ≠ T alone (and H ≠ T + V_electric in general).
The condition T = quadratic in q̇ must be checked carefully.
_Discriminates: H ≠ E in non-trivial cases; standard mechanics vs EM._

**MP-5 (Apply — phase space):**
"For H = p²/(2m) + mgx (particle under gravity in 1D, x measured upward):
(a) Sketch the phase space portrait (qualitative: what shape are the H = const curves?).
(b) At (x = 0, p = p₀ > 0): does the particle move up or down? What is ẋ?"
Expected: (a) Parabolas opening to the left (as x increases, |p| decreases).
(b) p₀ > 0 → p = mẋ > 0 → ẋ > 0 → moving upward; ẋ = p₀/m.
_Discriminates: reading phase space; sign conventions._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Three-step Legendre transform recipe?"
Threshold: (1) pᵢ = ∂L/∂q̇ᵢ; (2) solve q̇ᵢ(p); (3) H = Σpᵢq̇ᵢ − L.

**FA-2 (TA-4 exit):** "At maximum spring stretch: L = ? H = ? Are they equal?"
Expected: L = −½kA² < 0; H = +½kA² > 0; L ≠ H.
If student writes L = H → MC-H-IS-L not resolved.

**FA-3 (TA-5 exit):** "When does H = T + V?"
Expected: When T is quadratic in q̇ AND constraints are time-independent.

**FA-4 (Session exit):** MP-1 and MP-3. Both correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Stay on spring-mass (1D) throughout TA-3 and TA-4.
- Reassure: "Three steps: compute p, solve for q̇, plug into H = pq̇ − L."
- Skip time-dependent constraint example (TA-5 MC-H-ALWAYS-ENERGY collision) in first pass.

**S7 (Overconfident) path [Protocol G]:**
- MP-4 (charged particle in magnetic field: canonical vs kinetic momentum).
- Discuss non-standard kinetic energies (rotating frames, relativistic T).
- Preview: Routhian (partial Legendre transform, hybrid L/H for rotating systems).

**S4 (Prereq gap):**
- PD-1 gap (canonical momentum) → return to E-L equation; drill pᵢ = ∂L/∂q̇ᵢ.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → Legendre transform → MC-H-IS-L).
**Session 2 (≥24 h later):** Retrieval: "Three steps of Legendre transform. When H = E?"
  → TA-5 (phase space portrait) → TA-6 problems 1–3.
**Session 3 (≥72 h later):** Interleaved: "From H = p_θ²/(2mL²) − mgL cosθ, derive
  dH/dt using partial derivatives. Show H = const for the pendulum."
**Pre-Hamilton's-equations session:** All 5 P91 probes cold; require 4/5.

**Interleaving partners:** phys.mech.euler-lagrange-equation (prerequisite),
phys.mech.hamiltons-equations (next concept),
phys.mech.cyclic-coordinates-conservation-laws (cyclic q in H formulation).

---

## Component 9 — V-Check Trace

```
V-1   concept_id matches KG: phys.mech.hamiltonian ✓
V-2   prerequisite: phys.mech.euler-lagrange-equation ✓
V-3   bloom: understand (expert level) ✓
V-4   mastery_threshold: 0.85 ✓
V-5   estimated_hours: 6h ✓
V-6   session_cap: 7 TAs ✓
V-7   cpa_entry_stage: spring H = T + V anchor ✓
V-8   ≥2 MCs: MC-H-IS-L, MC-H-ALWAYS-ENERGY ✓
V-9   each MC: full 6-field engine ✓
V-10  TA count = 7 ✓
V-11  TA-1 Concrete ✓
V-12  TA-4 MC diagnostic ✓
V-13  TA-7 closure ✓
V-14  ≥5 P91 probes: MP-1…MP-5 ✓
V-15  4 FAs ✓
V-16  S6/S7/S4 protocols ✓
V-17  3-session retrieval plan ✓
V-18  interleaving partners named ✓
V-19  cross_links: hamiltons-equations, cyclic-coordinates, conservation-of-energy ✓
V-20  status = READY ✓
```

**Status: READY — V-1 through V-20 PASS**

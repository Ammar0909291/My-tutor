# Teaching Blueprint — phys.mech.cyclic-coordinates-conservation-laws

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.cyclic-coordinates-conservation-laws
name:               Cyclic Coordinates and Noether's Theorem
domain:             Classical Mechanics — Analytical Mechanics (Physics)
difficulty:         expert (6)
bloom:              analyze
mastery_threshold:  0.85
estimated_hours:    7
prerequisites:      [phys.mech.euler-lagrange-equation]
cross_links:        [phys.mech.hamiltonian, phys.mech.conservation-of-angular-momentum,
                     phys.mech.conservation-of-energy]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a free particle moving in a straight line — nothing depends
                       on x-position, so momentum is conserved; difficulty 6 →
                       C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** A generalized coordinate qᵢ is cyclic (ignorable) if ∂L/∂qᵢ = 0 — the
Lagrangian does not explicitly depend on qᵢ. The Euler-Lagrange equation then gives:

    d/dt(∂L/∂q̇ᵢ) = 0   ⟹   pᵢ = ∂L/∂q̇ᵢ = constant

The conjugate canonical momentum pᵢ is conserved. Noether's theorem generalizes this:
every continuous symmetry of the Lagrangian corresponds to a conserved quantity.

**Key symmetry-conservation pairs:**

| Symmetry | Cyclic coordinate | Conserved quantity |
|----------|------------------|--------------------|
| Translational invariance in x | x (no ∂L/∂x) | Linear momentum pₓ = mẋ |
| Translational invariance in y | y | Linear momentum p_y = mẏ |
| Rotational invariance (φ) | φ (no ∂L/∂φ) | Angular momentum L_z = mr²φ̇ |
| Time translation invariance (∂L/∂t = 0) | t (not a q — special case) | Energy E = H |

**Formal Statement (Noether's Theorem):**
If L is invariant under a one-parameter continuous transformation q → q + εδq,
then J = Σᵢ (∂L/∂q̇ᵢ) δqᵢ is a conserved quantity.

**Worked Example 1 (Free particle in 2D polar):**
L = ½m(ṙ² + r²φ̇²). No explicit φ dependence → φ is cyclic.
p_φ = ∂L/∂φ̇ = mr²φ̇ = angular momentum = constant.

**Worked Example 2 (Central force potential):**
V = V(r) (depends only on r, not φ).
L = ½m(ṙ² + r²φ̇²) − V(r). Again φ cyclic → p_φ = mr²φ̇ = const.
This is the origin of Kepler's second law (equal areas in equal times).

**Worked Example 3 (Translational symmetry):**
Free particle in 1D: L = ½mẋ². No explicit x → x is cyclic.
p_x = mẋ = const (linear momentum conserved — no force acting).

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.euler-lagrange-equation  ──►  phys.mech.cyclic-coordinates-conservation-laws
```

**PD-1 (E-L equation — canonical momentum):**
"For a particle in polar coordinates with L = ½m(ṙ² + r²φ̇²) − V(r),
write the canonical momenta p_r and p_φ."
Expected: p_r = mṙ; p_φ = mr²φ̇.

**PD-2 (E-L equation — condition for cyclic coordinate):**
"What condition on L makes qᵢ a cyclic coordinate? What does the E-L equation give?"
Expected: ∂L/∂qᵢ = 0 → cyclic; E-L gives d/dt(pᵢ) = 0 → pᵢ = const.

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-CYCLIC-MEANS-ZERO (Priority 1)
**Label:** "A cyclic coordinate means that coordinate is zero or constant"

**Trigger signals:**
- Says "φ is cyclic so φ = 0" or "φ = const"
- Confuses the coordinate being cyclic with the coordinate being fixed
- Says "if φ doesn't appear in L, then nothing in φ is happening"

**Conflict evidence [P28]:**
"For a central-force problem, φ is cyclic. Does this mean the particle doesn't move
angularly? No — the planet orbits the sun (φ changes all the time). Kepler's second law
says the orbit sweeps equal areas in equal times — φ is changing, not constant.
What is cyclic is not φ itself, but its absence from L. Something else is constant — what?"

**Bridge [P30]:**
"'Cyclic coordinate' means ∂L/∂qᵢ = 0 — the Lagrangian is independent of the VALUE of
qᵢ (it can change freely). The E-L equation then gives d/dt(pᵢ) = 0 → pᵢ is constant.
The coordinate changes; its CONJUGATE MOMENTUM is what's constant."

**Replacement [P31]:**
"Step 1: Check ∂L/∂qᵢ. Step 2: If zero, call qᵢ cyclic. Step 3: pᵢ = ∂L/∂q̇ᵢ = const.
The coordinate itself can change freely; the canonical momentum conjugate to it is conserved."

**Discrimination pairs [P33]:**
- Pendulum: θ is NOT cyclic (∂L/∂θ = −mgL sinθ ≠ 0); θ̈ ≠ 0 ✓
- Free particle in x: x IS cyclic (∂L/∂x = 0); p_x = mẋ = const; but x still changes ✓

**s6_path:** "Cyclic = absent from L. Absent from L → momentum conserved. The coordinate itself moves."

---

### MC-SYMMETRY-IS-SHAPE (Priority 2)
**Label:** "Symmetry means the system looks the same (spherical or cylindrical shape)"

**Trigger signals:**
- Identifies symmetry only from visual shape of the system
- Misses translational symmetry for a free particle (no visible shape)
- Confuses geometric symmetry with Lagrangian symmetry

**Conflict evidence [P28]:**
"A free particle in 1D has no shape at all — it's a point. Yet L = ½mẋ² is independent
of x (translational symmetry → p_x = const). Meanwhile, a bead threaded on a symmetric-
looking ring can have L that depends on φ if there's a bump on the ring — the geometric
shape looks symmetric but the physics isn't. What actually matters for Noether's theorem?"

**Bridge [P30]:**
"The relevant symmetry is: does L change when you shift the coordinate? If L(q + ε) = L(q)
for all ε (infinitesimally), that's a continuous symmetry of the Lagrangian, and by Noether's
theorem a conserved quantity exists. Shape is a hint, not the definition."

**Replacement [P31]:**
"Check: does L change if I shift qᵢ → qᵢ + ε (tiny change)? Equivalently: does ∂L/∂qᵢ = 0?
If yes → conservation law. Look at L, not at pictures."

**Discrimination pairs [P33]:**
- Ball in cylindrical bowl with φ-independent V: φ cyclic → L_z conserved ✓
- Ball in bowl with ridge along one side: V = V(r, φ) → φ NOT cyclic → L_z NOT conserved ✓

**s6_path:** "Write L. Check if φ or x or θ appears explicitly. If absent: conserved momentum."

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Connect to E-L equations from last session. Now: when can we identify a conserved
quantity WITHOUT solving the full equation of motion?

P04: "A planet orbits the sun. You use polar coordinates (r, φ). You write L and
immediately — without solving for r(t) and φ(t) — you can say 'angular momentum is
conserved.' How? What told you that before you solved anything?"

P06: "φ doesn't appear in L (only φ̇ does) → φ is cyclic → p_φ = mr²φ̇ = const.
Conservation law read off immediately from the Lagrangian, before any solving."

---

### TA-2 — Conceptual Development [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Symmetry table (from Component 1): symmetry → cyclic coordinate → conserved quantity.
Time-translation invariance → energy conservation (special case, flagged separately).

P08 (statement): Cyclic: ∂L/∂qᵢ = 0 → d/dt(pᵢ) = 0. Noether's theorem (statement only;
proof deferred). Walk through Worked Examples 1–3.

P05: "This is profound: the existence of a conservation law is equivalent to the existence of
a symmetry. No symmetry → no conservation law. The universe conserves momentum because the
laws of physics are the same everywhere in space (translational symmetry)."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: PD-1 and PD-2.

P10: "For a particle in 2D with L = ½m(ẋ² + ẏ²) − V(y):
(a) Which coordinates are cyclic? (b) Which canonical momenta are conserved?"

P13:
(a) ∂L/∂x = 0 → x is cyclic; ∂L/∂y = −∂V/∂y ≠ 0 → y is NOT cyclic.
(b) p_x = mẋ = const (x-momentum conserved); p_y = mẏ NOT constant (y has a force from V(y)).

---

### TA-4 — MC-CYCLIC-MEANS-ZERO Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "A planet orbits the sun (central force). φ is cyclic. Does this mean
the planet doesn't move angularly? What changes, and what stays constant?"

Listen: if student says "φ is constant" or "nothing happens in the φ direction" →
MC-CYCLIC-MEANS-ZERO confirmed.

P28 → P30 → P31 (full MC sequence).

P33: Kepler orbit — φ changes as the planet orbits; but p_φ = mr²φ̇ = const.
At perihelion (small r): φ̇ is large; at aphelion (large r): φ̇ is small. Area swept per unit
time = ½r²φ̇ = p_φ/(2m) = const → Kepler's 2nd law.

P36: "Generalize: for any central force V(r), identify the conserved quantity from symmetry alone."

---

### TA-5 — MC-SYMMETRY-IS-SHAPE Probe + Noether Practice [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "A uniform gravitational field g acts in the −y direction on a particle in 2D.
Is there a translational symmetry? Which direction(s)? What is conserved?"

Listen: if student misidentifies symmetry based on a visual of the setup →
MC-SYMMETRY-IS-SHAPE possible.

P28 → P30 → P31.

P10 (Noether analysis):
"For each system, identify cyclic coordinates and conserved quantities:
(a) L = ½m(ẋ² + ẏ²) − mgy.  [x cyclic → p_x = mẋ; y NOT cyclic → p_y not conserved]
(b) L = ½m(ṙ² + r²φ̇²) − kr².  [φ cyclic → p_φ = mr²φ̇; r NOT cyclic]
(c) L = ½m(ṙ² + r²φ̇² + ż²).  [φ cyclic → p_φ; z cyclic → p_z = mż; r NOT cyclic]"

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

1. **Cylindrical coordinates:** A particle moves in 3D under V(r, z) (cylindrical
   symmetry — no φ dependence). Identify conserved quantities.
   [Answer: φ cyclic → L_z = mr²φ̇ conserved]

2. **Symmetric potential:** V = αr² (isotropic 2D harmonic oscillator, polar coords).
   L = ½m(ṙ² + r²φ̇²) − αr². What is cyclic? What is conserved?
   [Answer: φ cyclic → p_φ = mr²φ̇ = const; r NOT cyclic]

3. **Kepler problem:** V = −k/r. L = ½m(ṙ² + r²φ̇²) + k/r. Identify conserved
   quantity from Noether's argument.
   [Answer: φ cyclic → p_φ = mr²φ̇ = angular momentum constant]

4. **Energy as Noether conserved quantity:** When ∂L/∂t = 0, the Hamiltonian H is
   conserved. For a simple pendulum, verify ∂L/∂t = 0 and state what is conserved.
   [Answer: L = ½mL²θ̇² + mgL cosθ — no explicit t → H = E = T + V = const]

5. **Challenge:** A particle in 3D with L = ½m(ẋ² + ẏ² + ż²) − V(√(x²+y²)).
   Identify all cyclic coordinates and conserved quantities.
   [Answer: z is cyclic → p_z conserved; and since V depends only on ρ = √(x²+y²),
   using cylindrical (ρ, φ, z): φ is also cyclic → L_z = mρ²φ̇ conserved;
   ρ NOT cyclic]

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: cyclic coordinate = ∂L/∂qᵢ = 0 → pᵢ = const. Symmetry ↔ conservation law
(Noether's theorem). Key pairs: translational symmetry → linear momentum; rotational
symmetry → angular momentum; time-translation symmetry → energy. Read off conservation
laws directly from L before solving equations of motion."

P62: "Next session opener: 'For the central force Kepler problem, show that p_φ = mr²φ̇
= const directly from the E-L equation. Then explain Kepler's second law.'"

P85: "You connected abstract symmetry to measurable conserved quantities — one of the
deepest results in all of physics."

P89: Log MC flags; record whether student confused cyclic coordinate with fixed coordinate;
note which symmetry-conservation pairs were identified correctly.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4.25/5 correct = PASS at threshold 0.85)

**MP-1 (Analyze — cyclic identification):**
"L = ½m(ṙ² + r²θ̇² + r²sin²θ φ̇²) (spherical coordinates, no potential).
Which coordinates are cyclic? What is conserved for each?"
Expected: r — NOT cyclic (kinetic energy depends on ṙ but also ∂L/∂r = mr(θ̇²+sin²θ φ̇²) ≠ 0);
θ — NOT cyclic (∂L/∂θ = mr²sinθ cosθ φ̇² ≠ 0 in general);
φ — cyclic (∂L/∂φ = 0) → p_φ = mr²sin²θ φ̇ = L_z = const.
_Discriminates: careful check of ∂L/∂qᵢ; spherical coordinates._

**MP-2 (Analyze — Noether application):**
"L = ½m(ẋ² + ẏ²) − V(x − y). Identify any symmetry and conserved quantity."
Expected: L is invariant under simultaneous translation x → x + ε, y → y + ε (since
x − y is unchanged). Noether: conserved J = p_x + p_y = m(ẋ + ẏ).
_Discriminates: non-obvious symmetry; Noether's theorem in action._

**MP-3 (Apply — Kepler second law derivation):**
"A planet (mass m) orbits the sun under V(r) = −GMm/r. Using L = ½m(ṙ² + r²φ̇²) + GMm/r,
prove that the rate at which area is swept is constant."
Expected: φ cyclic → p_φ = mr²φ̇ = ℓ = const. Area swept dA = ½r² dφ.
dA/dt = ½r²φ̇ = ℓ/(2m) = const ✓ (Kepler's 2nd law).
_Discriminates: cyclic → pᵢ constant → physical consequence; Kepler derivation._

**MP-4 (Analyze — energy conservation from Noether):**
"State the condition on L that implies energy conservation (via Noether's theorem for
time translation). Give one example where this holds and one where it fails."
Expected: ∂L/∂t = 0 → H = T + V = const. Holds: pendulum (L has no explicit t).
Fails: particle in a time-varying field V = V(x, t) (L = ½mẋ² − V(x,t) depends on t).
_Discriminates: time-translation symmetry ↔ energy conservation; conditions._

**MP-5 (Analyze — conservation by inspection):**
"A particle moves in 3D under V = α(x² + y²) (α > 0). Without solving the equations of
motion, identify all conserved quantities using the Lagrangian approach."
Expected: L = ½m(ẋ² + ẏ² + ż²) − α(x² + y²). z cyclic → p_z = mż = const.
In cylindrical (ρ = √(x²+y²), φ): V = αρ² → φ cyclic → L_z = mρ²φ̇ = const.
∂L/∂t = 0 → E = const.
_Discriminates: multiple conservation laws; coordinate transformation choice._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Definition of cyclic coordinate? What does it imply?"
Threshold: ∂L/∂qᵢ = 0; pᵢ = const.

**FA-2 (TA-4 exit):** "Planet in central force — φ cyclic. Does φ change? What stays constant?"
Expected: φ changes (planet orbits); p_φ = mr²φ̇ stays constant.
If student says φ is constant → MC-CYCLIC-MEANS-ZERO not resolved.

**FA-3 (TA-5 exit):** "L = ½m(ẋ² + ẏ²) − mgy. What is conserved? Why?"
Expected: p_x = mẋ (x cyclic); energy E = T + mgy (∂L/∂t = 0); p_y is NOT conserved.

**FA-4 (Session exit):** MP-1 and MP-3. Both correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Use only 1D and 2D Cartesian examples initially (translational symmetry only).
- Defer Noether's theorem statement; stay with "cyclic = absent from L → momentum constant."
- Pendulum example last (non-cyclic θ) — after student is confident with cyclic examples.

**S7 (Overconfident) path [Protocol G]:**
- MP-2 (non-obvious symmetry under x → x+ε, y → y+ε simultaneously).
- Discuss breaking of symmetry: what happens to momentum if a small V(φ) term is added?
- Preview: conservation of Runge-Lenz vector in Kepler problem (extra symmetry, harder).

**S4 (Prereq gap):**
- PD-1 gap (canonical momentum) → return to E-L equation; drill pᵢ = ∂L/∂q̇ᵢ.
- PD-2 gap (cyclic condition) → return to E-L applied to a free particle in 1D.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → Noether framework → MC-CYCLIC probe).
**Session 2 (≥24 h later):** Retrieval: "Cyclic coordinate definition? Symmetry → conservation?"
  → TA-5 (MC-SYMMETRY probe) → TA-6 problems 1–3.
**Session 3 (≥72 h later):** Interleaved: "Kepler problem: identify ALL conserved quantities
  from symmetry (E, L_z). What additional conserved quantity exists (Runge-Lenz vector)?
  (Preview only — requires a hidden symmetry.)"
**Pre-Hamiltonian session:** All 5 P91 probes cold; require 4/5.

**Interleaving partners:** phys.mech.euler-lagrange-equation (prerequisite),
phys.mech.conservation-of-angular-momentum (physical consequence),
phys.mech.hamiltonian (next concept — cyclic q are also cyclic in Hamiltonian formulation).

---

## Component 9 — V-Check Trace

```
V-1   concept_id matches KG: phys.mech.cyclic-coordinates-conservation-laws ✓
V-2   prerequisite: phys.mech.euler-lagrange-equation ✓
V-3   bloom: analyze ✓
V-4   mastery_threshold: 0.85 ✓
V-5   estimated_hours: 7h ✓
V-6   session_cap: 7 TAs ✓
V-7   cpa_entry_stage: free particle / central force concrete anchor ✓
V-8   ≥2 MCs: MC-CYCLIC-MEANS-ZERO, MC-SYMMETRY-IS-SHAPE ✓
V-9   each MC: full 6-field engine ✓
V-10  TA count = 7 ✓
V-11  TA-1 Concrete ✓
V-12  TA-4 MC diagnostic ✓
V-13  TA-7 closure ✓
V-14  ≥5 P91 probes: MP-1…MP-5 ✓
V-15  4 FAs: FA-1…FA-4 ✓
V-16  S6/S7/S4 protocols ✓
V-17  3-session retrieval plan ✓
V-18  interleaving partners named ✓
V-19  cross_links match KG ✓
V-20  status = READY ✓
```

**Status: READY — V-1 through V-20 PASS**

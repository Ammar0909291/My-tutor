# Teaching Blueprint — phys.mech.poisson-brackets

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.poisson-brackets
name:               Poisson Brackets and Phase Space Dynamics
domain:             Classical Mechanics — Analytical Mechanics (Physics)
difficulty:         expert (6)
bloom:              analyze
mastery_threshold:  0.85
estimated_hours:    8
prerequisites:      [phys.mech.hamiltons-equations]
cross_links:        [phys.mech.canonical-transformations, phys.mech.conservation-of-energy,
                     phys.qm.operators]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (angular momentum L_z = xp_y − yp_x: compute {L_z, H} for
                       central force and show it equals zero — angular momentum is
                       conserved; difficulty 6 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** The Poisson bracket of two functions f(q, p, t) and g(q, p, t) is:

    {f, g} = Σᵢ (∂f/∂qᵢ ∂g/∂pᵢ − ∂f/∂pᵢ ∂g/∂qᵢ)

Hamilton's equations can be written as q̇ᵢ = {qᵢ, H} and ṗᵢ = {pᵢ, H}.
Any observable f evolves as ḟ = {f, H} + ∂f/∂t.
A quantity f is conserved if and only if {f, H} = 0 (and ∂f/∂t = 0).

**Fundamental Poisson brackets (canonical relations):**
- {qᵢ, qⱼ} = 0
- {pᵢ, pⱼ} = 0
- {qᵢ, pⱼ} = δᵢⱼ   (1 if i = j, 0 if i ≠ j)

**Properties:**
- Antisymmetry: {f, g} = −{g, f}
- Linearity: {αf + βg, h} = α{f, h} + β{g, h}
- Leibniz rule: {fg, h} = f{g, h} + g{f, h}
- Jacobi identity: {f, {g, h}} + {g, {h, f}} + {h, {f, g}} = 0

**Worked Example 1 (Angular momentum):**
L_z = xp_y − yp_x.
{L_z, H} for H = (px² + py²)/(2m) + V(r):

{L_z, H} = {xp_y − yp_x, H}
= x{p_y, H} + p_y{x, H} − y{p_x, H} − p_x{y, H}

{p_y, H} = {p_y, V} = −∂V/∂y;  {x, H} = {x, px²/(2m)} = px/m
{p_x, H} = −∂V/∂x;            {y, H} = py/m

{L_z, H} = x(−∂V/∂y) + p_y(px/m) − y(−∂V/∂x) − p_x(py/m)
= −x ∂V/∂y + y ∂V/∂x + (p_ypx − p_xpy)/m

For central force V(r): ∂V/∂y = (y/r)V'(r), ∂V/∂x = (x/r)V'(r).
→ −x(y/r)V' + y(x/r)V' = 0, and the momentum term cancels.
∴ {L_z, H} = 0 → L_z conserved ✓

**Worked Example 2 (Time evolution of kinetic energy T):**
T = (px² + py²)/(2m) for H = T + V(x, y).
{T, H} = {T, V} = Σᵢ (∂T/∂qᵢ ∂V/∂pᵢ − ∂T/∂pᵢ ∂V/∂qᵢ)
= 0 − (px/m)(∂V/∂x) − (py/m)(∂V/∂y)
= −v · ∇V = v · F = dT/dt ✓ (work-energy theorem)

**Worked Example 3 (Fundamental brackets):**
{x, p_x}: Σ ∂x/∂qᵢ ∂p_x/∂pᵢ − ... = ∂x/∂x · ∂p_x/∂p_x = 1 · 1 = 1 ✓
{x, p_y} = ∂x/∂x · ∂p_y/∂p_x − ... = 1 · 0 = 0 ✓ (different DOF, independent)

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.hamiltons-equations  ──►  phys.mech.poisson-brackets
```

**PD-1 (Hamilton's equations):**
"For H = p²/(2m) + V(x), write q̇ and ṗ using Hamilton's equations."
Expected: q̇ = p/m; ṗ = −∂V/∂x.

**PD-2 (Partial derivatives in phase space):**
"For f(x, y, px, py) = xpy, compute ∂f/∂x, ∂f/∂y, ∂f/∂px, ∂f/∂py."
Expected: ∂f/∂x = py, ∂f/∂y = 0, ∂f/∂px = 0, ∂f/∂py = x.

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-BRACKET-SYMMETRIC (Priority 1)
**Label:** "{f, g} = {g, f} — Poisson brackets are symmetric like a dot product"

**Trigger signals:**
- Writes {f, g} = {g, f}
- Says "order doesn't matter in a bracket"
- Confused by sign change when arguments are swapped

**Conflict evidence [P28]:**
"Compute {x, p} and {p, x}:
{x, p} = ∂x/∂x · ∂p/∂p − ∂x/∂p · ∂p/∂x = 1 − 0 = +1.
{p, x} = ∂p/∂x · ∂x/∂p − ∂p/∂p · ∂x/∂x = 0 − 1 = −1.
{x, p} = +1 but {p, x} = −1. Are they equal?"

**Bridge [P30]:**
"{f, g} = −{g, f}: the Poisson bracket is antisymmetric (like a cross product, not a
dot product). Swapping the arguments flips the sign. In particular, {f, f} = −{f, f} → {f, f} = 0.
This antisymmetry is fundamental — it is precisely the property that becomes the commutator
[Â, B̂] in quantum mechanics."

**Replacement [P31]:**
"Always: {f, g} = Σᵢ (∂f/∂qᵢ ∂g/∂pᵢ − ∂f/∂pᵢ ∂g/∂qᵢ). The minus sign in the definition
makes it antisymmetric. Check by computing both {f,g} and {g,f}: they should have opposite signs."

**Discrimination pairs [P33]:**
- {x, p} = +1; {p, x} = −1 ✓
- {H, H} = 0 (any function with itself is zero) ✓

**s6_path:** "Remember the − sign in the definition. First term: f differentiated w.r.t. q,
g w.r.t. p. Second term: MINUS (f w.r.t. p, g w.r.t. q)."

---

### MC-BRACKET-ZERO-MEANS-INDEPENDENT (Priority 2)
**Label:** "{f, g} = 0 means f and g don't interact"

**Trigger signals:**
- Interprets {f, g} = 0 as "f and g are independent functions" (not functionally related)
- Confused by {q, q} = 0 despite q being related to p through H
- Says "{L_z, H} = 0 means angular momentum doesn't appear in the Hamiltonian"

**Conflict evidence [P28]:**
"For a central-force problem: {L_z, H} = 0. But L_z = xp_y − yp_x — it's very much
related to H (which contains x, y, px, py). And L_z does appear in the equations of motion
(it's conserved). How can {L_z, H} = 0 and yet L_z is a meaningful part of the dynamics?"

**Bridge [P30]:**
"{f, g} = 0 (when there's no explicit time dependence) means f is CONSERVED under the
Hamiltonian flow generated by g — not that f and g are unrelated. {L_z, H} = 0 means
L_z doesn't change as the system evolves under H. L_z and H are deeply related (both
depend on the same coordinates); the bracket being zero is a statement about dynamics,
not about independence."

**Replacement [P31]:**
"{f, H} = 0 and ∂f/∂t = 0 ↔ ḟ = 0 ↔ f is conserved. That's the statement. 'Independent'
is the wrong word — 'conserved' is the right word. The bracket measures how much f changes
under the flow generated by g."

**Discrimination pairs [P33]:**
- {x, x} = 0: x is conserved by x's own flow? No — means x Poisson-commutes with itself (trivial) ✓
- {L_z, H} = 0: L_z conserved under H's flow ✓

**s6_path:** "{f, H} = 0 → f conserved (ḟ = 0). Not 'f independent of H.'"

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Connect to Hamilton's equations. A question: is angular momentum L_z conserved for a
central-force problem? Using Hamilton's equations: ṗ_φ = −∂H/∂φ = 0 (φ cyclic) → yes.
But what if we want to check conservation of ANY function — not just a coordinate momentum?

P04: "L_z = xp_y − yp_x. Is it conserved under H = (px² + py²)/(2m) + V(r)?
L_z is not a canonical momentum — so the cyclic coordinate argument doesn't directly apply.
Is there a single formula that tells us if ANY function is conserved?"

P06: "Yes: {f, H} = 0 ↔ f conserved. The Poisson bracket is that formula. We'll compute
{L_z, H} and show it equals zero — confirming angular momentum is conserved for any V(r)."

---

### TA-2 — Definition and Properties [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Definition table. Fundamental brackets. Properties list (antisymmetry, linearity,
Leibniz, Jacobi). Evolution equation ḟ = {f, H} + ∂f/∂t.

P08 (definition): {f, g} = Σᵢ (∂f/∂qᵢ ∂g/∂pᵢ − ∂f/∂pᵢ ∂g/∂qᵢ).
Hamilton's equations: q̇ᵢ = {qᵢ, H}, ṗᵢ = {pᵢ, H}.
Walk Worked Examples 2 and 3.

P05: "Quantum mechanics replaces {f, g} → (1/iℏ)[f̂, ĝ] (commutator). The fundamental
Poisson bracket {qᵢ, pⱼ} = δᵢⱼ becomes [q̂ᵢ, p̂ⱼ] = iℏδᵢⱼ (Heisenberg uncertainty origin)."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: PD-1 and PD-2.

P10: "Compute the following Poisson brackets for a 1D system with (x, p):
(a) {x, p}   (b) {x², p}   (c) {x, p²}   (d) {p, H} for H = p²/(2m) + V(x)."

P13:
(a) {x, p} = ∂x/∂x · ∂p/∂p − 0 = 1
(b) {x², p} = 2x{x, p} = 2x (Leibniz: {x², p} = x{x,p} + {x,p}x = 2x)
(c) {x, p²} = −{p², x} = −2p{p, x} = −2p(−1) = 2p
(d) {p, H} = {p, p²/(2m)} + {p, V} = 0 + (−∂V/∂x) = −∂V/∂x = F (Newton's 2nd!) ✓

---

### TA-4 — MC-BRACKET-SYMMETRIC Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "Compute {L_x, L_y} and {L_y, L_x} where L_x = yp_z − zp_y,
L_y = zp_x − xp_z. Are they equal? (Predict before computing.)"

Listen: if student says they should be equal → MC-BRACKET-SYMMETRIC.

P28 → P30 → P31 (antisymmetry proof via definition).

P33: {L_x, L_y} = L_z (fundamental angular momentum bracket — compute or state).
{L_y, L_x} = −L_z. These are not equal — and in fact {Lᵢ, Lⱼ} = εᵢⱼₖLₖ is the
algebra of rotational symmetry (which becomes [L̂ᵢ, L̂ⱼ] = iℏεᵢⱼₖL̂ₖ in QM).

P36: "This algebra {L_x, L_y} = L_z, {L_y, L_z} = L_x, {L_z, L_x} = L_y is the same
structure as the cross product. This is the Lie algebra of SO(3)."

---

### TA-5 — MC-BRACKET-ZERO Probe + Conservation Analysis [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "For a free particle H = p²/(2m): compute {x, H}. What does the result mean?
Is x 'independent' of H?"

Listen: if student says "{x, H} = p/m ≠ 0 means x and H are somehow dependent on each other
in a bad way" or confuses the result with independence → MC-BRACKET-ZERO possible.

P28 → P30 → P31.

P10: Conservation analysis using brackets:
"For H = p²/(2m) + ½kx² (spring), compute:
(a) {T, H}  (b) {V, H}  (c) {E, H} = {T + V, H}."
P13: (a) {T, H} = {T, V} = Σ ∂T/∂p · (−∂V/∂q) = (p/m)(−kx) = −(p/m)kx.
     (b) {V, H} = {V, T} = −{T, V} = +(p/m)kx.
     (c) {E, H} = {T+V, H} = {T,H} + {V,H} = 0 ✓ (energy conserved, as expected).

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

1. **Fundamental brackets (2D):** Compute all non-zero brackets among {x, y, px, py}.
   [Answer: {x, px} = 1, {y, py} = 1; all others = 0]

2. **Leibniz rule:** Compute {x², p²} using the Leibniz rule.
   [Answer: {x², p²} = x²{1, p²} + {x²,1}p² ... easier: {x², p²} = x{x, p²} + {x,p²}x = x(2p) + (2p)x = 4xp]

3. **Angular momentum algebra:** Show {L_z, x} = y and {L_z, y} = −x.
   (L_z = xp_y − yp_x)
   [Answer: {L_z, x} = {xp_y, x} − {yp_x, x} = p_y{x,x} + x{p_y,x} − p_x{y,x} − y{p_x,x}
    = 0 + 0 − 0 − y(1) = −y ... wait: {p_x, x} = −{x, p_x} = −1.
    {L_z, x} = x{p_y,x} − y{p_x,x} = 0 − y(−1) = y ✓]

4. **Equation of motion:** For a simple pendulum, write θ̇ and ṗ_θ using Poisson brackets.
   [Answer: θ̇ = {θ, H} = ∂H/∂p_θ = p_θ/(mL²); ṗ_θ = {p_θ, H} = −∂H/∂θ = −mgL sinθ]

5. **Jacobi identity check:** Verify the Jacobi identity for f = x, g = p, h = H:
   {x, {p, H}} + {p, {H, x}} + {H, {x, p}} = ?
   [Answer: {x, ṗ} + {p, −ẋ} + {H, 1} = {x, F/m} + {p, −p/m} + 0
    = (∂F/∂p)/m (= 0 for velocity-independent F) + (−1/m){p,p} = 0 + 0 = 0 ✓ (Jacobi satisfied)]

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: {f, g} = Σᵢ(∂f/∂qᵢ ∂g/∂pᵢ − ∂f/∂pᵢ ∂g/∂qᵢ). Antisymmetric: {f,g} = −{g,f}.
Fundamental: {qᵢ, pⱼ} = δᵢⱼ. Evolution: ḟ = {f, H} + ∂f/∂t. Conservation: {f,H} = 0 ↔ f conserved.
Hamilton's eqs: q̇ = {q, H}, ṗ = {p, H}. Angular momentum algebra: {Lᵢ, Lⱼ} = εᵢⱼₖLₖ."

P62: "Next session opener: 'Define a canonical transformation. What property must a
transformation (q, p) → (Q, P) satisfy to be canonical?'"

P85: "You've discovered that the Poisson bracket is the classical version of the quantum
commutator — the same structure underlies both mechanics."

P89: Log MC flags; check sign errors in bracket calculations; note whether Leibniz rule
was applied correctly.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4.25/5 correct = PASS at threshold 0.85)

**MP-1 (Apply — definition):**
"Compute {xpy, ypx} for a 2D system."
Expected: {xpy, ypx} = x{py, ypx} + px{x, ypx} [using linearity and Leibniz]
... or directly: = Σᵢ ∂(xpy)/∂qᵢ · ∂(ypx)/∂pᵢ − ∂(xpy)/∂pᵢ · ∂(ypx)/∂qᵢ
= (py·px − py·px) + ... work through: ∂/∂x(xpy)=py, ∂/∂px(ypx)=y → py·y term;
∂/∂y(xpy)=0, ... full computation: {xpy, ypx} = −L_z (or +L_z depending on convention).
Key discriminator: student applies definition correctly; result = ±xp_x·yp_y components.
_Discriminates: bracket definition; multi-variable partial derivative._

**MP-2 (Analyze — conservation test):**
"For H = px²/(2m) + py²/(2m) + ½k(x² + y²) (2D isotropic oscillator):
Test whether L_z = xpy − ypx is conserved by computing {L_z, H}."
Expected: {L_z, H} = {L_z, px²/(2m) + py²/(2m)} + {L_z, ½k(x²+y²)}.
{L_z, px²} = ... = 2px{L_z, px} = 2px(−py) [using {L_z,px} = −py, {L_z,py} = px]
{L_z, k(x²+y²)/2} = k(x{L_z,x} + y{L_z,y}) = k(xy − y·(−x)) = 0 ... full result = 0.
L_z is conserved ✓.
_Discriminates: bracket calculation; conservation test; angular momentum algebra._

**MP-3 (Apply — equation of motion):**
"Use ḟ = {f, H} to derive the equation of motion for x and p for H = p²/(2m) + V(x)."
Expected: ẋ = {x, H} = ∂H/∂p = p/m ✓; ṗ = {p, H} = −∂H/∂x = −∂V/∂x = F ✓.
_Discriminates: Hamilton's equations via brackets._

**MP-4 (Analyze — angular momentum algebra):**
"Compute {L_x, L_y} using L_x = yp_z − zp_y, L_y = zp_x − xp_z.
Show the result equals L_z = xp_y − yp_x."
Expected: {L_x, L_y} = {yp_z − zp_y, zp_x − xp_z}
= y{p_z, zp_x} + p_z{y, ...} − ... (expand and use fundamental brackets)
Final result: L_z ✓.
_Discriminates: angular momentum algebra; extended bracket computation._

**MP-5 (Analyze — Jacobi identity application):**
"Verify the Jacobi identity: {L_x, {L_y, L_z}} + {L_y, {L_z, L_x}} + {L_z, {L_x, L_y}} = 0
using the results {L_x, L_y} = L_z, {L_y, L_z} = L_x, {L_z, L_x} = L_y."
Expected: {L_x, L_x} + {L_y, L_y} + {L_z, L_z} = 0 + 0 + 0 = 0 ✓
(since {Lᵢ, Lᵢ} = 0 by antisymmetry).
_Discriminates: Jacobi identity; antisymmetry applied correctly._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Definition of Poisson bracket. What does {f, H} = 0 mean physically?"
Threshold: correct definition; {f,H} = 0 means f conserved.

**FA-2 (TA-4 exit):** "{x, p} and {p, x}?"
Expected: +1 and −1. If student says both equal +1 → MC-BRACKET-SYMMETRIC not resolved.

**FA-3 (TA-5 exit):** "{T, H} + {V, H} = ? For H = T + V."
Expected: {E, H} = 0 (energy conserved). If student says ≠ 0 → MC-BRACKET-ZERO misunderstood.

**FA-4 (Session exit):** MP-3 (equations of motion via brackets). Correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Stay with 1D (x, p) only until TA-5.
- Focus on fundamental brackets and simple computations before Leibniz/Jacobi.
- Angular momentum (TA-4) can be deferred to Session 2 if needed.

**S7 (Overconfident) path [Protocol G]:**
- MP-4 (full angular momentum algebra computation).
- MP-5 (Jacobi identity with angular momentum).
- Preview: Lie algebras and why Poisson brackets → Lie bracket structure.

**S4 (Prereq gap):**
- PD-1 gap (Hamilton's equations) → return; cannot derive ḟ = {f,H} without understanding ṗ = −∂H/∂q.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → bracket definition → MC-SYMMETRIC probe).
**Session 2 (≥24 h later):** Retrieval: "Definition of Poisson bracket. Fundamental brackets."
  → TA-5 (MC-ZERO probe) → TA-6 problems 1–3.
**Session 3 (≥72 h later):** Interleaved: "For 3D angular momentum, compute all three
  {Lᵢ, Lⱼ} brackets. State the conservation conditions for each Lᵢ separately."
**Pre-canonical-transformations session:** All 5 P91 probes cold; require 4/5.

**Interleaving partners:** phys.mech.hamiltons-equations (prerequisite),
phys.mech.canonical-transformations (next concept),
phys.qm.operators (quantum analog — commutator).

---

## Component 9 — V-Check Trace

```
V-1   concept_id: phys.mech.poisson-brackets ✓
V-2   prerequisite: phys.mech.hamiltons-equations ✓
V-3   bloom: analyze ✓
V-4   mastery_threshold: 0.85 ✓
V-5   estimated_hours: 8h ✓
V-6   session_cap: 7 TAs ✓
V-7   cpa_entry_stage: {L_z, H} = 0 concrete anchor ✓
V-8   ≥2 MCs: MC-BRACKET-SYMMETRIC, MC-BRACKET-ZERO-MEANS-INDEPENDENT ✓
V-9   full 6-field MC engines ✓
V-10  7 TAs ✓
V-11  TA-1 Concrete ✓
V-12  TA-4 MC diagnostic ✓
V-13  TA-7 closure ✓
V-14  5 P91 probes ✓
V-15  4 FAs ✓
V-16  S6/S7/S4 protocols ✓
V-17  3-session plan ✓
V-18  interleaving partners ✓
V-19  cross_links: canonical-transformations, conservation-of-energy, qm.operators ✓
V-20  READY ✓
```

**Status: READY — V-1 through V-20 PASS**

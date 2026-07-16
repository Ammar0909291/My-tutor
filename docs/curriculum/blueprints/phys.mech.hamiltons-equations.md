# Teaching Blueprint — phys.mech.hamiltons-equations

## Component 0 — Concept Metadata

```
concept_id:         phys.mech.hamiltons-equations
name:               Hamilton's Equations of Motion
domain:             Classical Mechanics — Analytical Mechanics (Physics)
difficulty:         expert (6)
bloom:              apply
mastery_threshold:  0.85
estimated_hours:    7
prerequisites:      [phys.mech.hamiltonian]
cross_links:        [phys.mech.poisson-brackets, phys.mech.cyclic-coordinates-conservation-laws,
                     phys.mech.phase-space]
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (for a spring: H = p²/2m + ½kx²; ẋ = ∂H/∂p = p/m and
                       ṗ = −∂H/∂x = −kx — these are Newton's equations in disguise;
                       difficulty 6 → C with accelerated P track)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Hamilton's equations are a pair of first-order ODEs that replace Newton's
single second-order ODE. For each generalized coordinate qᵢ with conjugate momentum pᵢ:

    q̇ᵢ = +∂H/∂pᵢ
    ṗᵢ = −∂H/∂qᵢ

These 2f equations (f per coordinate, f per momentum) give the equations of motion.
They treat q and p symmetrically. The sign asymmetry (+ for q̇, − for ṗ) encodes the
geometry of phase space and is the origin of symplectic structure.

**Properties:**
- H = const along every trajectory (when ∂H/∂t = 0) — Liouville's theorem precursor.
- dH/dt = ∂H/∂t (H changes only if explicitly time-dependent).
- Cyclic coordinate qᵢ (∂H/∂qᵢ = 0) → ṗᵢ = 0 → pᵢ = const (conservation, same as Lagrangian).

**Worked Example 1 (Spring-mass):**
H = p²/(2m) + ½kx².
q̇ = ∂H/∂p = p/m  →  ẋ = p/m  (velocity from momentum)
ṗ = −∂H/∂x = −kx  →  dp/dt = −kx  (Newton's law: F = −kx)

Combining: ẍ = ṗ/m = −kx/m  →  ẍ + (k/m)x = 0 ✓

**Worked Example 2 (Pendulum):**
H = p_θ²/(2mL²) − mgL cosθ.
θ̇ = ∂H/∂p_θ = p_θ/(mL²)
ṗ_θ = −∂H/∂θ = −mgL sinθ

Combining: mL²θ̈ = ṗ_θ = −mgL sinθ  →  θ̈ + (g/L) sinθ = 0 ✓

**Worked Example 3 (Central force, angular momentum):**
H = p_r²/(2m) + p_φ²/(2mr²) + V(r).
φ̇ = ∂H/∂p_φ = p_φ/(mr²);  ṗ_φ = −∂H/∂φ = 0  →  p_φ = const (angular momentum).
r̈: combine r̈ = ∂H/∂p_r|_time derivative → gives effective radial equation.

---

## Component 2 — Prerequisite Dependency Map

```
phys.mech.hamiltonian  ──►  phys.mech.hamiltons-equations
```

**PD-1 (Hamiltonian construction):**
"Derive H for a simple pendulum (L = ½mL²θ̇² + mgL cosθ)."
Expected: H = p_θ²/(2mL²) − mgL cosθ.

**PD-2 (Partial derivatives of H):**
"For H = p²/(2m) + ½kx², compute ∂H/∂p and ∂H/∂x."
Expected: ∂H/∂p = p/m; ∂H/∂x = kx.

Both must pass before TA-3.

---

## Component 3 — Misconception Engine

### MC-SIGN-BOTH-POSITIVE (Priority 1)
**Label:** "Both Hamilton's equations have + signs: q̇ = +∂H/∂p and ṗ = +∂H/∂q"

**Trigger signals:**
- Writes ṗᵢ = +∂H/∂qᵢ (misses the minus sign)
- Gets wrong sign for force in spring problem
- Says "the minus sign looks wrong — shouldn't force be in the direction of increasing q?"

**Conflict evidence [P28]:**
"Spring: H = p²/(2m) + ½kx². If ṗ = +∂H/∂x = +kx, then dp/dt = +kx → force is in +x
direction when stretched to +x. But a compressed/stretched spring exerts restoring force:
F = −kx (toward equilibrium). The + sign gives the wrong physics. Where does the − come from?"

**Bridge [P30]:**
"The − sign in ṗ = −∂H/∂qᵢ comes from the Legendre transform. In Lagrangian terms:
ṗᵢ = d/dt(∂L/∂q̇ᵢ) = ∂L/∂qᵢ (E-L equation). And ∂L/∂q = −∂V/∂q = F (since L = T − V).
So ṗᵢ = ∂L/∂qᵢ. But H = Σpq̇ − L → ∂H/∂qᵢ = −∂L/∂qᵢ. Hence ṗᵢ = −∂H/∂qᵢ.
The minus sign is forced by the Legendre transform."

**Replacement [P31]:**
"Memorize the asymmetric pair: q̇ᵢ = +∂H/∂pᵢ and ṗᵢ = −∂H/∂qᵢ. Plus for q, minus for p.
Mnemonic: 'q flows with H's momentum gradient; p flows against H's position gradient.'"

**Discrimination pairs [P33]:**
- Spring with −∂H/∂x = −kx: restoring force (correct) ✓
- Spring with +∂H/∂x = +kx: anti-restoring force (wrong physics) ✗

**s6_path:** "Write the equations at the top of every problem: q̇ = +∂H/∂p, ṗ = −∂H/∂q.
Box them. Refer back every time."

---

### MC-TWO-EQUATIONS-REDUNDANT (Priority 2)
**Label:** "Hamilton's two equations are just two ways of writing the same equation"

**Trigger signals:**
- Derives only one of the two equations and stops
- Claims ẋ = p/m is trivial (just the definition of momentum)
- Does not see that BOTH are needed to get the full dynamics

**Conflict evidence [P28]:**
"For the spring: if I only use ṗ = −kx, I have dp/dt = −kx. One equation in two unknowns
(x and p). I need a second equation to solve for both. The second equation ẋ = p/m tells me
how x and p are related dynamically. Together they give ẍ = −(k/m)x. Without both, I'm stuck.
Why is ẋ = p/m not 'trivially obvious'?"

**Bridge [P30]:**
"In phase space, x and p are independent variables. ẋ = p/m is the equation of motion for x
(how x evolves in time); ṗ = −kx is the equation of motion for p. Both are needed to integrate
the trajectory (x(t), p(t)) in phase space. In Hamiltonian mechanics, we don't have ẍ — only
first-order equations ẋ and ṗ, which together give second-order dynamics."

**Replacement [P31]:**
"Hamilton's equations: always write BOTH. q̇ = +∂H/∂p gives the velocity equation.
ṗ = −∂H/∂q gives the force equation. Together they fully determine (q(t), p(t))."

**Discrimination pairs [P33]:**
- Using only ṗ = −kx: stuck with two unknowns (x, p) and one equation ✓
- Using both: solve to get ẍ + (k/m)x = 0, fully determined ✓

**s6_path:** "Two equations per DOF, always. ẋ equation (velocity) + ṗ equation (force)."

---

## Component 4 — Teaching Action Sequence

### TA-1 — Concrete Experience [Protocol A, S0/S1]
**Primitives:** P01, P04, P06

P01: Connect to Hamiltonian from last session. Today: how do we get equations of motion
from H? Not via a Lagrangian E-L equation — directly from H using partial derivatives.

P04: "Spring: H = p²/(2m) + ½kx². Take ∂H/∂p = p/m. Take −∂H/∂x = −kx.
Call the first ẋ and the second ṗ. Write ẋ = p/m and ṗ = −kx.
These are Newton's equations for a spring — with no calculus of variations, no Lagrangian.
Just two partial derivatives of H."

P06: "This is the Hamiltonian recipe: from H, take ∂H/∂p (positive) and −∂H/∂q (negative).
These give the equations of motion for q and p directly."

---

### TA-2 — Equation Statement and Derivation [Protocol A, S0/S1]
**Primitives:** P07, P08, P05

P07 (visual): Phase space trajectory for spring (ellipse). At each point: arrows showing
(q̇, ṗ) = (∂H/∂p, −∂H/∂q). The gradient of H is perpendicular to the trajectory.

P08 (equations): q̇ᵢ = ∂H/∂pᵢ and ṗᵢ = −∂H/∂qᵢ. Property: dH/dt = ∂H/∂t (H conserved
when ∂H/∂t = 0). Walk Examples 1 and 2.

P05: "Key feature: 2f first-order equations replace f second-order equations. Phase space
trajectories never cross (uniqueness of Hamilton's equations). The flow is symplectic —
area in phase space is preserved."

---

### TA-3 — Prerequisite Checks + Guided Practice [Protocol C]
**Primitives:** P41, P34, P10, P13

P41: PD-1 and PD-2.

P10: "For a free particle in polar coordinates: H = p_r²/(2m) + p_φ²/(2mr²).
(a) Write all four Hamilton's equations (r̈, φ̇, ṗ_r, ṗ_φ).
(b) What does the ṗ_φ equation tell you?"

P13:
(a) ṙ = ∂H/∂p_r = p_r/m; φ̇ = ∂H/∂p_φ = p_φ/(mr²);
    ṗ_r = −∂H/∂r = p_φ²/(mr³) (centrifugal term);
    ṗ_φ = −∂H/∂φ = 0.
(b) ṗ_φ = 0 → p_φ = mr²φ̇ = const (angular momentum conserved — same as Lagrangian).

---

### TA-4 — MC-SIGN-BOTH-POSITIVE Probe [Protocol B]
**Primitives:** P14, P28, P30, P31, P33, P36

P14 (predict): "Pendulum: H = p_θ²/(2mL²) − mgL cosθ. Which equation is correct?
(A) ṗ_θ = +∂H/∂θ = +mgL sinθ, or (B) ṗ_θ = −∂H/∂θ = −mgL sinθ?"

Listen: if student chooses (A) → MC-SIGN-BOTH-POSITIVE confirmed.

P28 → P30 → P31 (full MC sequence).

P33: Derive from both Hamilton's equations for pendulum → θ̈ + (g/L) sinθ = 0.
Check: if ṗ_θ = +mgL sinθ → mL²θ̈ = +mgL sinθ → θ̈ = +(g/L) sinθ: exponential runaway
(wrong physics). If ṗ_θ = −mgL sinθ → oscillation (correct).

P36: "Why does the − sign give restoring force? Because H increases as θ moves away from 0
(more potential energy), so −∂H/∂θ points back toward θ = 0."

---

### TA-5 — MC-TWO-EQUATIONS-REDUNDANT Probe + Practice [Protocol B + C]
**Primitives:** P14, P28, P30, P31, P33, P10

P14: "For the spring: 'ẋ = p/m is trivially obvious — it's just the definition of momentum.
I only need ṗ = −kx.' Is this correct? What would you lose by discarding ẋ = p/m?"

Listen: if student agrees with the claim → MC-TWO-EQUATIONS-REDUNDANT.

P28 → P30 → P31.

P10: "Integrate the two Hamilton's equations for the spring numerically (conceptually):
Starting at (x₀ = A, p₀ = 0), step forward in time δt. What are (x, p) after δt?"

P13: Δx = ẋ·δt = (p₀/m)·δt = 0. Δp = ṗ·δt = (−kx₀)·δt = −kA·δt.
After δt: x ≈ A, p ≈ −kA·δt. Next step: ẋ = p/m = −kA·δt/m (now x starts moving).
"Without the ẋ equation, we couldn't update x — the particle would be stuck."

---

### TA-6 — Independent Problem Set [Protocol A → C]
**Primitives:** P10, P51, P52, P55, P54

1. **Vertical spring:** H = p²/(2m) + ½kx² + mgx (spring + gravity, x upward).
   Write Hamilton's equations and combine to get ẍ.
   [Answer: ẋ = p/m; ṗ = −kx − mg; ẍ = −(k/m)x − g — SHM about shifted equilibrium]

2. **Pendulum simulation:** Write Hamilton's equations for the pendulum.
   Starting at θ = 0.1 rad, p_θ = 0 (released from rest), estimate θ after a small δt = 0.01s
   (m=1, L=1, g=10). [Answer: θ̇ = p_θ/(mL²) = 0; ṗ_θ = −mgL sinθ ≈ −10×0.1 = −1 N·m.
   After δt: θ ≈ 0.1, p_θ ≈ −0.01]

3. **Phase space topology:** For H = p²/(2m) − ½kx² (inverted oscillator), sketch
   the (x, p) phase space portrait qualitatively. What do trajectories look like?
   [Answer: ṗ = +kx (p grows when x > 0 — unstable); trajectories are hyperbolas diverging
   from the origin; ṗ = 0 on the x-axis gives unstable equilibrium at origin]

4. **Conservation via Hamilton:** For H = p_r²/(2m) + p_φ²/(2mr²) + V(r), use
   Hamilton's equations to show that p_φ = const without solving for r(t) or φ(t).
   [Answer: ṗ_φ = −∂H/∂φ = 0 → p_φ = const (since φ absent from H)]

5. **dH/dt computation:** For H = p²/(2m) + ½kx² (no explicit t dependence):
   compute dH/dt using the chain rule and Hamilton's equations. Show dH/dt = 0.
   [Answer: dH/dt = (∂H/∂x)ẋ + (∂H/∂p)ṗ + ∂H/∂t = kx·(p/m) + (p/m)·(−kx) + 0 = 0 ✓]

---

### TA-7 — Closure + Retrieval Schedule [Protocol A]
**Primitives:** P68, P62, P85, P89

P68: "Today: Hamilton's equations: q̇ᵢ = +∂H/∂pᵢ (velocity), ṗᵢ = −∂H/∂qᵢ (generalized force).
Both needed. Sign asymmetry: + for q̇, − for ṗ. dH/dt = ∂H/∂t — conserved when no explicit t.
Phase space trajectories never cross. Cyclic qᵢ → ṗᵢ = 0 → pᵢ = const."

P62: "Next session opener: 'Define the Poisson bracket {f, g} for functions f and g of (q, p).
Show that ḟ = {f, H} + ∂f/∂t for any observable f.'"

P85: "You've moved from second-order ODEs (Newton, Lagrange) to first-order ODEs (Hamilton).
This symmetry between q and p is the deepest structural feature of classical mechanics."

P89: Log MC flags; record sign errors; note whether both equations were used correctly.

---

## Component 5 — Mastery Probe Bank

### P91 Mastery Probes (5 required; 4.25/5 correct = PASS at threshold 0.85)

**MP-1 (Apply — spring Hamilton's equations):**
"H = p²/(2m) + ½kx². Write both Hamilton's equations and combine them to get ẍ + (k/m)x = 0."
Expected: ẋ = p/m; ṗ = −kx; differentiate first: ẍ = ṗ/m = −kx/m ✓.
_Discriminates: both equations; correct signs; combination procedure._

**MP-2 (Apply — pendulum equations):**
"H = p_θ²/(2mL²) − mgL cosθ. Write Hamilton's equations and derive θ̈ + (g/L) sinθ = 0."
Expected: θ̇ = p_θ/(mL²); ṗ_θ = −mgL sinθ; combine: mL²θ̈ = −mgL sinθ ✓.
_Discriminates: pendulum H; sign of ṗ_θ._

**MP-3 (Apply — conservation from Hamilton):**
"H = p_r²/(2m) + p_φ²/(2mr²) + V(r). Show that angular momentum is conserved using
Hamilton's equations (without solving for the trajectory)."
Expected: ṗ_φ = −∂H/∂φ = 0 → p_φ = const.
_Discriminates: conservation from cyclic coordinate in H._

**MP-4 (Apply — energy conservation):**
"Show that dH/dt = ∂H/∂t for any H(q, p, t) using Hamilton's equations."
Expected: dH/dt = Σᵢ[(∂H/∂qᵢ)q̇ᵢ + (∂H/∂pᵢ)ṗᵢ] + ∂H/∂t
= Σᵢ[(∂H/∂qᵢ)(∂H/∂pᵢ) + (∂H/∂pᵢ)(−∂H/∂qᵢ)] + ∂H/∂t = 0 + ∂H/∂t = ∂H/∂t.
_Discriminates: chain rule + Hamilton's equations; algebraic cancellation._

**MP-5 (Apply — 3D central force):**
"H = p_r²/(2m) + p_θ²/(2mr²) + p_φ²/(2mr² sin²θ) + V(r) (spherical coordinates).
Write ṗ_φ and ṗ_θ. What is conserved? Why is p_θ not conserved?"
Expected: ṗ_φ = −∂H/∂φ = 0 → p_φ = L_z = const.
ṗ_θ = −∂H/∂θ = (p_φ² cosθ)/(mr² sin³θ) ≠ 0 → p_θ not conserved (θ appears in H).
_Discriminates: 3D spherical Hamilton's equations; identifying which momenta are constant._

---

## Component 6 — Formative Assessment Strategy

**FA-1 (TA-2 exit):** "Write both Hamilton's equations from memory. Which has + and which has −?"
Threshold: q̇ᵢ = +∂H/∂pᵢ; ṗᵢ = −∂H/∂qᵢ.

**FA-2 (TA-4 exit):** "Pendulum: correct sign for ṗ_θ?"
Expected: ṗ_θ = −∂H/∂θ = −mgL sinθ. If student writes +mgL sinθ → MC-SIGN-BOTH-POSITIVE not resolved.

**FA-3 (TA-5 exit):** "Why do you need BOTH Hamilton's equations, not just ṗ = −∂H/∂q?"
Expected: Need both to update (q, p) in phase space; ẋ = p/m tells x how to evolve given p;
without it, cannot integrate trajectory.

**FA-4 (Session exit):** MP-1 and MP-2. Both correct → advance to TA-7.

---

## Component 7 — Anxiety & Confidence Protocols

**S6 (Anxiety) path:**
- Stay on spring-mass and pendulum only.
- Emphasize: two partial derivatives, two equations. No second derivatives needed.
- Skip phase space topology (TA-5 problem 3 — inverted oscillator).

**S7 (Overconfident) path [Protocol G]:**
- MP-4 (algebraic proof of dH/dt = ∂H/∂t).
- MP-5 (3D spherical Hamilton's equations; θ momentum not conserved).
- Preview: Poisson brackets as the next natural step.

**S4 (Prereq gap):**
- PD-1 gap (Hamiltonian construction) → return to Legendre transform; cannot apply Hamilton's
  equations without knowing H.

---

## Component 8 — Spaced Retrieval & Interleaving Plan

**Session 1:** TA-1 through TA-4 (Concrete → equations statement → MC-SIGN probe).
**Session 2 (≥24 h later):** Retrieval: "Write Hamilton's equations from memory for H = p²/2m + ½kx²."
  → TA-5 (MC-REDUNDANT probe) → TA-6 problems 1–3.
**Session 3 (≥72 h later):** "For the Kepler problem H = p_r²/(2m) + p_φ²/(2mr²) − k/r,
  write all four Hamilton's equations and identify what is conserved."
**Pre-Poisson-brackets session:** All 5 P91 probes cold; require 4/5.

**Interleaving partners:** phys.mech.hamiltonian (prerequisite),
phys.mech.poisson-brackets (next concept),
phys.mech.cyclic-coordinates-conservation-laws (conservation in H formulation).

---

## Component 9 — V-Check Trace

```
V-1   concept_id: phys.mech.hamiltons-equations ✓
V-2   prerequisite: phys.mech.hamiltonian ✓
V-3   bloom: apply ✓
V-4   mastery_threshold: 0.85 ✓
V-5   estimated_hours: 7h ✓
V-6   session_cap: 7 TAs ✓
V-7   cpa_entry_stage: spring ẋ=p/m, ṗ=−kx anchor ✓
V-8   ≥2 MCs: MC-SIGN-BOTH-POSITIVE, MC-TWO-EQUATIONS-REDUNDANT ✓
V-9   full 6-field MC engines ✓
V-10  7 TAs ✓
V-11  TA-1 Concrete ✓
V-12  TA-4 MC diagnostic ✓
V-13  TA-7 closure ✓
V-14  5 P91 probes ✓
V-15  4 FAs ✓
V-16  S6/S7/S4 ✓
V-17  3-session plan ✓
V-18  interleaving partners ✓
V-19  cross_links: poisson-brackets, cyclic-coordinates, phase-space ✓
V-20  READY ✓
```

**Status: READY — V-1 through V-20 PASS**

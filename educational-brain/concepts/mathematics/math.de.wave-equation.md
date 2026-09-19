# math.de.wave-equation

## Identity
- **KG id**: `math.de.wave-equation`
- **Domain**: math.de
- **Requires**: `math.de.separation-of-variables-pde`, `math.de.fourier-series`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 7

## Learning Objective
Solve the IBVP for $u_{tt}=c^2u_{xx}$ on $[0,L]$ requiring BOTH initial conditions $u(x,0)=f(x)$
AND $u_t(x,0)=g(x)$ (never just one, since the equation is second-order in $t$); correctly derive
the time-oscillation frequency $\omega_n=c\sqrt{\lambda_n}=cn\pi/L$ (never $\lambda_n$ itself);
and apply d'Alembert's formula $u=\frac12[f(x+ct)+f(x-ct)]$ ONLY on the unbounded line directly
(never on a bounded domain without the odd-periodic-extension correction).

## Core Understanding
TWO INITIAL CONDITIONS ARE REQUIRED — NEVER JUST ONE, BECAUSE THE EQUATION IS SECOND-ORDER IN
$t$: $u_{tt}=c^2u_{xx}$ integrated once in $t$ gives $u_t$, integrated again gives $u$ — each
integration introduces an arbitrary function of $x$ that must be pinned down. Exactly like a
second-order ODE IVP needing BOTH $y(0)$ AND $y'(0)$, the wave IBVP needs BOTH $u(x,0)=f(x)$
(determining the $a_n$ coefficients) AND $u_t(x,0)=g(x)$ (determining the $b_n$ coefficients).
Carrying over the heat equation's single-IC habit (that equation is only FIRST-order in $t$) leaves
the $b_n$ entirely undetermined — genuinely half the solution missing.

THE TIME-OSCILLATION FREQUENCY IS $c\sqrt{\lambda_n}$ — NEVER $\lambda_n$ ITSELF: the time ODE
$T''+c^2\lambda_nT=0$ is simple harmonic motion with angular frequency $\omega_n=c\sqrt{\lambda_n}$
— for $\lambda_n=(n\pi/L)^2$, this gives $\omega_n=cn\pi/L$ (LINEAR in $n$, since the SQUARE ROOT
of $\lambda_n$ undoes its own square). Writing $T_n(t)=A\sin(\lambda_nt)+B\cos(\lambda_nt)$ (using
the eigenvalue directly as the frequency) confuses $\lambda_n$ with its square root — the correct
form is $T_n(t)=a_n\cos(\omega_nt)+b_n\sin(\omega_nt)$ with $\omega_n=c\sqrt{\lambda_n}$.

D'ALEMBERT'S FORMULA REQUIRES THE ODD-PERIODIC EXTENSION ON A BOUNDED DOMAIN — NEVER APPLIED
DIRECTLY: $u(x,t)=\frac12[f(x+ct)+f(x-ct)]+\frac1{2c}\int_{x-ct}^{x+ct}g(s)\,ds$ is derived for the
UNBOUNDED line $-\infty<x<\infty$, where characteristics $x\pm ct$ never hit a boundary. On
$[0,L]$ with $u(0,t)=u(L,t)=0$, applying the formula naively (using $f$ as given, with no
extension) produces a function that generally does NOT vanish at $x=0,L$ — violating the boundary
conditions. The fix: extend $f$ to $\mathbb{R}$ as an ODD, $2L$-periodic function $F$ (so
$F(0)=F(nL)=0$ automatically), then $u(x,t)=\frac12[F(x+ct)+F(x-ct)]$ genuinely satisfies the
BCs — this odd-extension correction produces EXACTLY the same answer as the Fourier sine series
superposition, just expressed differently.

## Mental Models
- **"Second-order in time means two initial conditions — position AND velocity — exactly like a
  second-order ODE needs y(0) and y'(0)."**
- **"The time frequency is the square root of the eigenvalue, times c — never the eigenvalue
  itself."**
- **"D'Alembert's formula lives on the infinite line — bring it to a bounded domain only through
  the odd-periodic extension, never directly."**

## Why Students Fail

### MC-1: ONE-INITIAL-CONDITION-FOR-WAVE
- **Surface form**: sets up the wave equation IBVP with only $u(x,0)=f(x)$, forgetting
  $u_t(x,0)=g(x)$, producing an underdetermined system.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the heat
  equation (first-order in $t$) requires only one IC, and students carry this habit forward without
  noticing the wave equation's second-order-in-$t$ structure demands two).
- **Repair**: re-walk the second-order-ODE analogy requiring both $y(0)$ and $y'(0)$.

### MC-2: TIME-OSCILLATION-FREQUENCY-EQUALS-EIGENVALUE
- **Surface form**: writes $T_n(t)=A\sin(\lambda_nt)+B\cos(\lambda_nt)$ using $\lambda_n$ directly
  as the frequency, instead of $\omega_n=c\sqrt{\lambda_n}$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the time ODE's
  angular frequency $c\sqrt{\lambda_n}$ is confused with the eigenvalue $\lambda_n$ itself, or used
  linearly as $c\lambda_n$).
- **Repair**: re-derive $\omega_n=c\sqrt{\lambda_n}=cn\pi/L$ directly from $T''+c^2\lambda_nT=0$.

### MC-3: DALEMBERT-APPLIES-INSIDE-BOUNDED-DOMAIN
- **Surface form**: applies d'Alembert's formula directly to the bounded $[0,L]$ problem without
  the odd-extension correction, producing a solution violating the boundary conditions.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — d'Alembert's
  formula is derived for the unbounded line, and applying it naively to a bounded domain ignores
  the reflections at the boundaries).
- **Repair**: re-walk the odd-2L-periodic extension construction, confirming $F(0)=F(nL)=0$
  automatically.

## Misconceptions

### MC-1: ONE-INITIAL-CONDITION-FOR-WAVE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: TIME-OSCILLATION-FREQUENCY-EQUALS-EIGENVALUE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: DALEMBERT-APPLIES-INSIDE-BOUNDED-DOMAIN
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A vibrating string needs both its starting SHAPE and its starting VELOCITY to determine its
  future — just like a thrown ball needs both position and velocity to predict its path."**
- **Anti-analogy**: d'Alembert's formula is NOT a universal shortcut usable on any domain — on a
  bounded interval it needs the odd-extension trick to respect the boundary conditions, or it gives
  a wrong answer.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the plucked-string worked example, deriving $a_n$ from $f$
  and $b_n$ from $g$ separately.
- **Demonstration 2 (targets MC-2)**: the direct $\omega_n=c\sqrt{\lambda_n}=cn\pi/L$ derivation
  from $T''+c^2\lambda_nT=0$.
- **Demonstration 3 (targets MC-3)**: the odd-2L-periodic extension construction, confirming
  $F(0)=F(nL)=0$ and matching the Fourier sine series superposition.

## Discovery Questions
1. "Is the wave equation first-order or second-order in time — and how many initial conditions
   does that require?"
2. "Is the time-oscillation frequency equal to the eigenvalue λₙ itself, or to c times its square
   root?"
3. "Can d'Alembert's formula be applied directly to a bounded interval, or does it need a
   correction first?"

## Teaching Sequence
1. **Representation shift**: the full two-IC separation-of-variables derivation, working
   Demonstration 1, isolating MC-1 and MC-2.
2. **Pattern induction**: d'Alembert's formula, finite propagation speed, and energy conservation,
   working Demonstration 2 (frequency) directly within the same derivation.
3. **Conflict evidence**: the odd-extension correction for bounded domains, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct two-IC solution with the correct frequency $\omega_n$, a
   correct d'Alembert derivation on the infinite line, and a correct odd-extension application on a
   bounded domain, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a wave IBVP set up with only one initial condition.
- Never accept a time-oscillation frequency stated as $\lambda_n$ itself rather than
  $c\sqrt{\lambda_n}$.
- Never accept d'Alembert's formula applied to a bounded domain without the odd-extension
  correction.

## Voice Teaching Notes
- Say "is this equation first- or second-order in time, and how many initial conditions does that
  need?" whenever a wave IBVP is set up.
- Before applying d'Alembert's formula to a bounded interval, ask "have you extended f as an odd,
  periodic function first?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the need for two initial conditions and
  derives both coefficient sets.
- **Rung 2 (application)**: learner correctly computes $\omega_n=c\sqrt{\lambda_n}$ and assembles
  the full two-IC solution.
- **Rung 3 (transfer)**: learner correctly applies d'Alembert's formula with the odd-periodic
  extension on a bounded domain and verifies energy conservation.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the second-order-ODE two-IC analogy.
- If MC-2 recurs, re-derive $\omega_n=c\sqrt{\lambda_n}$ directly.
- If MC-3 recurs, re-walk the odd-2L-periodic extension construction.

## Memory Hooks
- "Second-order in time needs two initial conditions — position and velocity."
- "The frequency is c times the square root of the eigenvalue — never the eigenvalue itself."
- "D'Alembert lives on the infinite line — extend f as odd and periodic before using it on a
  bounded domain."

## Transfer Connections
- `math.de.separation-of-variables-pde` (already authored, this campaign, Batch 165): supplies the
  general separation-eigenvalue-superposition technique this concept applies to the canonical
  hyperbolic PDE.
- `math.de.fourier-series` (already authored, this campaign, Batch 163): supplies the coefficient-
  extraction machinery used to match both initial conditions.
- `math.de.heat-equation` (authored earlier this same batch, KG's declared related concept): the
  canonical parabolic PDE this concept is directly contrasted against (finite propagation speed and
  time-reversibility vs. infinite-speed smoothing and irreversibility).

## Cross-Subject Connections
- Physics/acoustics: vibrating strings, sound waves, electromagnetic waves (light).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.wave-equation.md`, reused by reference for
  its full two-IC separation-of-variables derivation, its d'Alembert formula and odd-extension
  construction, its standing-wave-as-superposition-of-traveling-waves identity, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting the wave equation to
  dispersion relations, reflection/transmission at a wave-speed discontinuity, and the
  3D Kirchhoff formula/Huygens' principle.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.separation-of-variables-pde`/`math.de.fourier-series`, unlocks none, cross_links none,
  expert/apply, mastery_threshold 0.8, estimated_hours 7) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-19 (Batch 166): authored. Second entry this batch. Companion batch concept:
  `math.de.heat-equation`.

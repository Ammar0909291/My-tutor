# math.num.stiff-ode

## Identity
- **KG id**: `math.num.stiff-ode`
- **Domain**: math.num
- **Requires**: `math.num.runge-kutta`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 6

## Learning Objective
Identify stiffness via the Jacobian's eigenvalue SPREAD ($|\lambda_{\max}|/|\lambda_{\min}|\gg1$)
— NEVER a synonym for "numerically difficult" in general; recognize implicit methods are
preferred for STABILITY, NEVER because they are more accurate than explicit methods; and
recognize stiffness is a LOCAL, evolving property of the trajectory — NEVER a fixed, global
property of the equation.

## Core Understanding
STIFF NEVER MEANS "HARD TO SOLVE" IN GENERAL — IT MEANS A SPECIFIC EIGENVALUE-SPREAD CONDITION: a
nonlinear ODE where an explicit solver takes millions of tiny steps is correctly diagnosed as
STIFF if the Jacobian has eigenvalues of widely different magnitude with negative real parts. But
"hard to solve" is misleading — the PHYSICAL solution may be perfectly smooth (slow dynamics
only); what is hard is using an EXPLICIT method, which must track every fast transient even after
it has decayed. Treating "stiff" as a synonym for "numerically difficult" or "ill-conditioned"
misses the SPECIFIC technical definition — the true difficulty is the INNER LINEAR SOLVE each
implicit step requires, never the ODE's inherent describability.

IMPLICIT METHODS ARE PREFERRED FOR STABILITY — NEVER BECAUSE THEY ARE MORE ACCURATE: implicit
Euler (BDF1) has global error $O(h)$ — the SAME order as explicit Euler; BDF2 has $O(h^2)$ — the
same as the trapezoidal rule. For a NON-stiff problem, RK4 ($O(h^4)$) is MUCH more accurate than
BDF2 at the SAME $h$. Believing implicit methods (implicit Euler, BDF) are more accurate than
explicit methods (RK4) because they're used "for hard problems" is WRONG — their advantage for
STIFF problems is that explicit methods are STABILITY-limited (forced to tiny $h$ regardless of
accuracy needs), while implicit methods are ACCURACY-limited (can use a much larger $h$, at the
cost of one Jacobian solve per step) — never a claim about formal accuracy order.

STIFFNESS IS A LOCAL PROPERTY THAT EVOLVES ALONG THE TRAJECTORY — NEVER A FIXED GLOBAL LABEL: the
Jacobian $J(t)=\partial f/\partial y(t)$, evaluated at the CURRENT solution $y(t)$, changes as
$y(t)$ evolves in a nonlinear system — so the stiffness ratio changes too. In Robertson chemical
kinetics, the intermediate species $y_2(t)$ PEAKS briefly then decays; during the peak, an
eigenvalue has $|\text{Re}|\approx3\times10^7$; AFTER the peak, all eigenvalues are small.
Believing stiffness is an intrinsic, FIXED property of the ODE regardless of the time interval
misses that a problem can be extremely stiff during an initial transient and NON-stiff once that
transient decays — a good adaptive stiff solver detects this and INCREASES $h$ automatically once
the fast mode decays.

## Mental Models
- **"Stiff describes a specific eigenvalue-spread ratio, never a general synonym for 'hard' —
  the physical solution can be perfectly smooth while explicit methods still struggle."**
- **"Implicit methods win on stability, never accuracy — for stiff problems, explicit methods are
  stability-limited to absurdly small steps, not accuracy-limited."**
- **"Stiffness lives in the Jacobian's current eigenvalues, which change as the solution evolves
  — never a fixed label attached to the equation forever."**

## Why Students Fail

### MC-1: STIFF-MEANS-HARD-TO-SOLVE
- **Surface form**: treats "stiff" as a synonym for "numerically difficult" or "ill-conditioned,"
  not understanding stiffness is specifically about the ratio of timescales that forces explicit
  methods to use unnecessarily small steps.
- **Birth type**: language contamination (Blueprint's own declared birth type — "stiff" sounds
  like "rigid" or "hard"; the technical definition via Jacobian eigenvalue ratios is
  counterintuitive since a stiff ODE can have a smooth, simple slow solution).
- **Repair**: re-diagnose the true difficulty as the inner linear solve required by implicit
  methods, never the ODE's inherent describability.

### MC-2: IMPLICIT-METHODS-MORE-ACCURATE
- **Surface form**: believes implicit methods are more accurate than explicit methods because
  they are used for hard problems, not recognizing A-stable implicit methods often have lower
  formal order and their advantage is stability, not accuracy.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — stiff solvers are
  recommended for hard problems, so students infer "recommended for hard" means "more accurate").
- **Repair**: re-compare formal orders explicitly (BDF1/BDF2 versus RK4), confirming the
  advantage is stability-driven step-size relief, never accuracy.

### MC-3: STIFFNESS-IS-A-PROPERTY-OF-THE-EQUATION
- **Surface form**: believes stiffness is an intrinsic, fixed property of the ODE regardless of
  the time interval, not recognizing an ODE can be stiff during a fast transient and non-stiff
  afterward.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — a textbook labels an
  ODE "stiff" or "non-stiff" as if it were a fixed, global property).
- **Repair**: re-present the Robertson-kinetics example, confirming the stiffness ratio changes
  dramatically as $y_2(t)$ peaks then decays.

## Misconceptions

### MC-1: STIFF-MEANS-HARD-TO-SOLVE
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

### MC-2: IMPLICIT-METHODS-MORE-ACCURATE
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: STIFFNESS-IS-A-PROPERTY-OF-THE-EQUATION
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A car suspension responding to bumps (fast mode) while settling smoothly over minutes (slow
  mode) — a driver chasing every millisecond bump is stability-obsessed, never actually improving
  the ride's accuracy."**
- **Anti-analogy**: a stiff ODE's smooth long-term solution isn't secretly complicated — it's an
  explicit solver being forced to babysit a transient that's already died out, never evidence the
  underlying dynamics are hard to describe.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the stiffness-as-synonym gate question, diagnosing the true
  difficulty as the inner Jacobian solve.
- **Demonstration 2 (targets MC-2)**: the BDF1/BDF2-versus-RK4 formal-order comparison.
- **Demonstration 3 (targets MC-3)**: the Robertson-kinetics evolving-stiffness-ratio example.

## Discovery Questions
1. "Does 'stiff' mean the ODE is inherently hard to describe, or specifically that its Jacobian
   has widely spread eigenvalues?"
2. "Are implicit methods used for stiff problems because they're more accurate, or because
   they're more stable?"
3. "Is stiffness a fixed property of an ODE for all time, or can it change as the solution
   evolves?"

## Teaching Sequence
1. **Representation shift**: the four-representation stiffness derivation (physical,
   mathematical, stability diagram, cost comparison), setting up the A-stability groundwork.
2. **Pattern induction**: the stiff-solver gallery (Robertson kinetics, BDF methods, L-stability
   versus A-stability).
3. **Misconception detector**: the stiffness-as-synonym gate question, working Demonstration 1,
   isolating MC-1.
4. **Reused procedure**: the formal-order comparison, working Demonstration 2, isolating MC-2;
   and the evolving-stiffness-ratio demonstration, working Demonstration 3, isolating MC-3.
5. **Mastery gate**: require a correct stiffness-ratio computation and diagnosis, a correct
   explanation of why implicit methods trade accuracy order for stability, and a correct
   recognition that stiffness changes along a trajectory, at the Blueprint's own stated MAMR of
   4/5.

## Tutor Actions
- Never accept "stiff" used as a general synonym for "numerically difficult."
- Never accept implicit methods described as more accurate than explicit methods.
- Never accept stiffness treated as a fixed, time-independent property of an ODE.

## Voice Teaching Notes
- Say "is the eigenvalue spread actually wide here, or are you just calling this 'hard' loosely?"
  whenever "stiff" is invoked.
- Ask "is that method choice about accuracy, or about stability?" whenever implicit-versus-
  explicit methods are compared.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a stiffness ratio and diagnoses whether an
  ODE is stiff.
- **Rung 2 (application)**: learner correctly explains why implicit Euler is A-stable while
  contrasting its formal accuracy order against RK4.
- **Rung 3 (transfer)**: learner correctly connects stiff ODEs to differential-algebraic
  equations as the singular-perturbation limit.

## Tutor Recovery Strategy
- If MC-1 recurs, re-diagnose the true difficulty as the inner linear solve.
- If MC-2 recurs, re-compare formal accuracy orders explicitly.
- If MC-3 recurs, re-present the Robertson-kinetics evolving stiffness example.

## Memory Hooks
- "Stiff means a specific eigenvalue spread — never a general synonym for hard."
- "Implicit methods win on stability, never accuracy."
- "Stiffness evolves with the trajectory — never a fixed global label."

## Transfer Connections
- `math.num.runge-kutta` (already authored, this campaign, Batch 221): supplies the explicit
  Runge-Kutta framework this concept contrasts against implicit methods for stiff problems.

## Cross-Subject Connections
- Chemical kinetics and circuit simulation: reaction networks with vastly different reaction
  rates, or circuits with fast switching transients, are classic real-world sources of stiff
  ODEs requiring implicit solvers.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.stiff-ode.md`, reused by reference for
  its four-representation stiffness derivation, its stiff-solver gallery (Robertson kinetics,
  BDF methods, L-stability), its stiffness-as-synonym gate question, and its three-misconception
  registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on differential-algebraic equations
  as the singular-perturbation limit of stiff ODEs, and BDF solvability for index-1 DAEs.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.num.runge-kutta`, unlocks none, cross_links none, expert/analyze, mastery_threshold
  0.75, estimated_hours 6) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 223): authored. First entry this batch. Companion batch concept:
  `math.opt.pca`. Completes the math.num domain (16/16 authored).

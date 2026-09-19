# math.de.nonlinear-ode

## Identity
- **KG id**: `math.de.nonlinear-ode`
- **Domain**: math.de
- **Requires**: `math.de.first-order-ode`, `math.de.stability-analysis`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 8

## Learning Objective
Find ALL equilibria of $x'=f(x)$ by solving $f(x^*)=0$ COMPLETELY (never stopping at $x^*=0$);
linearize via the Jacobian and classify HYPERBOLIC equilibria's local behavior reliably
(Hartman-Grobman), but recognize a linear CENTER (purely imaginary eigenvalues) is INCONCLUSIVE
for the nonlinear system — never assumed reliable there; identify limit cycles via the
Poincaré-Bendixson theorem and construct Lyapunov functions where linearization fails; and never
assume "nonlinear" automatically means "no exact solution or no complete analysis is possible."

## Core Understanding
A NONLINEAR SYSTEM CAN HAVE ZERO, ONE, OR MANY EQUILIBRIA — NEVER ASSUME UNIQUENESS LIKE A LINEAR
SYSTEM'S ORIGIN: for the pendulum $x'=y,y'=-\sin x$: $f=0$ requires $y=0$ AND $\sin x=0$, giving
$x^*=(n\pi,0)$ for EVERY integer $n$ — infinitely many equilibria. Linear constant-coefficient
systems have only the origin; nonlinear systems can have zero, one, or arbitrarily many,
DEPENDING entirely on the shape of $f$ — checking only $x^*=0$ misses this entirely.

A LINEAR CENTER IS INCONCLUSIVE FOR THE NONLINEAR SYSTEM — NEVER TREATED AS RELIABLE LIKE A NODE
OR SADDLE: by Hartman-Grobman, HYPERBOLIC equilibria (no eigenvalue with zero real part) are
reliably classified by the Jacobian's eigenvalues — nodes, saddles, and spirals genuinely match
the linearization. But for PURELY IMAGINARY eigenvalues (a linear center): $\dot x=-y+x^3,
\dot y=x+y^3$ and $\dot x=-y-x^3,\dot y=x-y^3$ BOTH have the identical Jacobian
$\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ (a center) — yet the FIRST is an unstable spiral (energy
grows as $r^4$) and the SECOND is a stable spiral. The nonlinear terms alone determine the true
behavior; resolving this needs a conserved quantity or a Lyapunov function, never linearization
alone.

"NONLINEAR" NEVER MEANS "UNSOLVABLE" OR "NO COMPLETE ANALYSIS POSSIBLE": many nonlinear ODEs
(separable, Bernoulli, exact, homogeneous-substitution) have genuine EXACT solutions. Even without
an exact formula, the PHASE PORTRAIT (nullclines, equilibrium classification, Poincaré-Bendixson)
gives a COMPLETE qualitative picture for 2D systems — is a trajectory drawn to an equilibrium, a
limit cycle, or escaping to infinity? This is EXHAUSTIVE information for 2D, never merely an
approximation.

## Mental Models
- **"Solve f(x*)=0 completely — a nonlinear system's equilibria can be zero, one, or infinitely
  many, never assumed unique like a linear system's origin."**
- **"A linear center is a question mark, not an answer — the nonlinear terms decide whether it's a
  true center, a stable spiral, or an unstable spiral."**

## Why Students Fail

### MC-1: LINEARISATION-ALWAYS-DETERMINES-NONLINEAR-BEHAVIOUR
- **Surface form**: believes the Jacobian eigenvalue classification always correctly describes
  the nonlinear system's behavior, missing that a linear center may actually be a stable or
  unstable spiral.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — Hartman-
  Grobman's reliability for hyperbolic equilibria is often generalized without stressing the
  center exception).
- **Repair**: re-walk the $x^3$-versus-$-x^3$ example, showing identical Jacobians but genuinely
  opposite nonlinear behaviors.

### MC-2: ALL-NONLINEAR-ODES-CANNOT-BE-SOLVED-EXACTLY
- **Surface form**: assumes nonlinearity automatically means no exact solution exists.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — "nonlinear =
  hard = no exact solution" is over-applied, missing that separable/Bernoulli/exact techniques
  often apply, and qualitative analysis is itself complete methodology).
- **Repair**: re-anchor on the list of exact-solution techniques that still apply to many
  nonlinear ODEs, and the completeness of phase-portrait analysis even without one.

### MC-3: EQUILIBRIUM-AT-ZERO-ONLY
- **Surface form**: looks only at $x^*=0$ as an equilibrium, missing other fixed points where
  $f(x^*)=0$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — linear
  constant-coefficient systems have only the origin as an equilibrium, and students transfer this
  uniqueness assumption).
- **Repair**: re-walk the pendulum's infinitely-many-equilibria example, solving $f(x^*)=0$
  completely.

## Misconceptions

### MC-1: LINEARISATION-ALWAYS-DETERMINES-NONLINEAR-BEHAVIOUR
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: ALL-NONLINEAR-ODES-CANNOT-BE-SOLVED-EXACTLY
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: EQUILIBRIUM-AT-ZERO-ONLY
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Linearization is a magnifying glass that works perfectly for sharp features (hyperbolic
  equilibria) but goes blurry for a borderline case (a center) — you need a different tool (a
  Lyapunov function or conserved quantity) to see clearly there."**
- **Anti-analogy**: a nonlinear equation is NOT automatically a dead end for exact solving — many
  nonlinear ODEs solve exactly via already-known techniques, and even those that don't yield to a
  complete qualitative analysis.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: the pendulum's infinitely-many-equilibria derivation from
  $f(x^*)=0$.
- **Demonstration 2 (targets MC-1)**: the identical-Jacobian, opposite-behavior spiral example
  ($x^3$ versus $-x^3$ terms).
- **Demonstration 3 (targets MC-2)**: the exact-solution-technique checklist and the
  phase-portrait's exhaustive qualitative picture.

## Discovery Questions
1. "Does a nonlinear system have exactly one equilibrium, like a linear constant-coefficient
   system's origin, or could it have zero, one, or many?"
2. "If linearization gives a center (purely imaginary eigenvalues), does that reliably tell you
   the nonlinear system's true behavior?"
3. "Does 'nonlinear' automatically mean no exact solution exists and no complete analysis is
   possible?"

## Teaching Sequence
1. **Representation shift**: fixed-point finding and linearization, working Demonstration 1,
   isolating MC-3.
2. **Conflict evidence**: the center-case inconclusiveness, working Demonstration 2, isolating
   MC-1.
3. **Pattern induction**: nullclines, Poincaré-Bendixson, limit cycles, and Lyapunov functions,
   working Demonstration 3, isolating MC-2.
4. **Mastery gate**: require a correct complete-equilibrium search, a correct classification
   distinguishing hyperbolic (reliable) from center (inconclusive) cases, and a correct
   application of Poincaré-Bendixson or a Lyapunov function, at the Blueprint's own stated MAMR of
   4/5.

## Tutor Actions
- Never accept an equilibrium search that stops after checking only $x^*=0$.
- Never accept a linear center's classification treated as conclusive for the nonlinear system.
- Never accept "nonlinear" used to dismiss the possibility of an exact solution or a complete
  qualitative analysis.

## Voice Teaching Notes
- Say "have you solved f(x*)=0 completely, for every possible equilibrium?" whenever a nonlinear
  system's fixed points are sought.
- When a center is found via linearization, ask "is that conclusive, or do you need a Lyapunov
  function or conserved quantity to resolve it?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly finds all equilibria of a given nonlinear system.
- **Rung 2 (application)**: learner correctly classifies hyperbolic equilibria via the Jacobian
  and recognizes when a center requires further analysis.
- **Rung 3 (transfer)**: learner correctly applies the Poincaré-Bendixson theorem or constructs a
  Lyapunov function to resolve a limit cycle or an inconclusive center case (e.g. the van der Pol
  oscillator or Lotka-Volterra system).

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the identical-Jacobian, opposite-behavior spiral example.
- If MC-2 recurs, re-anchor on the exact-solution-technique checklist and phase-portrait
  completeness.
- If MC-3 recurs, re-walk the pendulum's complete equilibrium search.

## Memory Hooks
- "Solve f(x*)=0 completely — nonlinear systems can have many equilibria, never assume just one."
- "A linear center is inconclusive — nonlinear terms decide the true behavior."
- "Nonlinear doesn't mean unsolvable — exact techniques and phase-portrait analysis both remain
  powerful."

## Transfer Connections
- `math.de.first-order-ode` (already authored, certified domain): supplies the first-order ODE
  framework and solution techniques (separable, Bernoulli, exact) still applicable to many
  nonlinear equations.
- `math.de.stability-analysis` (already authored, this campaign, Batch 154): supplies the
  equilibrium-type/stability distinction and Lyapunov-function machinery this concept directly
  extends to genuinely nonlinear systems and limit cycles.
- `math.de.systems-ode` (already authored, certified domain, KG's declared related concept):
  supplies the linear systems framework this concept's linearization step connects back to.

## Cross-Subject Connections
- Physics/engineering: the pendulum, the van der Pol oscillator, predator-prey (Lotka-Volterra)
  population dynamics.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.nonlinear-ode.md`, reused by reference
  for its pendulum and Lotka-Volterra equilibrium examples, its center-case counterexample, its
  van der Pol limit-cycle discussion, and its three-misconception library (birth types adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting phase-portrait analysis
  to the Poincaré map, index theory, and Hopf bifurcation normal form.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.first-order-ode`/`math.de.stability-analysis`, unlocks none, cross_links none,
  expert/analyze, mastery_threshold 0.7, estimated_hours 8) was directly verified against the live
  KG and matches exactly. This entry closes the `math.de` domain's entire currently-reachable
  frontier for this campaign.

## Version History
- 2026-09-19 (Batch 162): authored. Second entry this batch, closing the `math.de` domain's
  currently-reachable frontier. Companion batch concept: `math.de.eigenfunction-expansion`.

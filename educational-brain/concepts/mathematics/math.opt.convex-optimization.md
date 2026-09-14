# math.opt.convex-optimization

## Identity
- **KG id**: `math.opt.convex-optimization`
- **Domain**: math.opt
- **Requires**: `math.opt.convex-function`, `math.opt.convex-set`
- **Unlocks**: `math.opt.duality`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 7

## Learning Objective
Given a minimization problem $\min f(x)$ s.t. $x\in C$ with $f$ convex and $C$ a convex set, state
the FUNDAMENTAL THEOREM (any local minimum is a global minimum — directly reusing
`math.opt.convex-function`'s own every-local-min-is-global theorem, extended here to a constrained
feasible set), verify the OPTIMALITY CONDITION ($\nabla f(x^*)=0$ for unconstrained;
$\langle\nabla f(x^*),y-x^*\rangle\ge0$ for all $y\in C$ for constrained), apply PROJECTED GRADIENT
DESCENT, and select among standard problem classes (LP, QP, SDP) by matching the structural form
of $f$ and $C$.

## Core Understanding
The FUNDAMENTAL THEOREM of convex optimization: if $f$ is convex and $x^*$ is a LOCAL minimum of
$f$ over a convex set $C$, then $x^*$ is a GLOBAL minimum. This is `math.opt.convex-function`'s own
every-local-min-is-global theorem, extended from an unconstrained function to a function minimized
over a convex FEASIBLE SET — the identical proof-by-contradiction structure applies, now using
`math.opt.convex-set`'s own convexity of $C$ to guarantee the segment toward a hypothetically
better point stays feasible. This is the central guarantee that makes convex optimization
TRACTABLE: finding ANY local minimum suffices to find THE minimum, with no risk of a "trap."

The OPTIMALITY CONDITION generalizes across the constrained/unconstrained boundary. Unconstrained
($C=\mathbb R^n$): $x^*$ is optimal iff $\nabla f(x^*)=0$ — reusing `math.opt.unconstrained-
optimization`'s own stationary-point condition directly. Constrained ($C\ne\mathbb R^n$): $x^*$ is
optimal iff $\langle\nabla f(x^*),y-x^*\rangle\ge0$ for ALL $y\in C$ — the VARIATIONAL INEQUALITY.
Intuition: $-\nabla f(x^*)$ is the descent direction; if $x^*$ is on the boundary of $C$, moving in
that descent direction may leave $C$ entirely, so $\nabla f(x^*)$ need NOT be zero — it only needs
to point in a direction from which every FEASIBLE direction is non-improving. PROJECTED GRADIENT
DESCENT implements this iteratively: $x_{k+1}=\Pi_C(x_k-\alpha\nabla f(x_k))$, where $\Pi_C$
projects the unconstrained gradient step back onto $C$.

A problem is CONVEX only when BOTH the objective $f$ is convex AND the feasible set $C$ is convex
— neither alone suffices. Standard PROBLEM CLASSES are distinguished by the structural form of $f$
and the constraints: LP (linear $f$, polyhedral $C$), QP (quadratic convex $f$, polyhedral $C$),
SOCP (second-order-cone constraints), SDP (semidefinite constraints) — each has mature, efficient
standard solvers, in contrast to non-convex problems, which carry no polynomial-time optimality
guarantee.

## Mental Models
- **"Convex objective plus convex feasible set: one bowl over one basin — any local dip IS the
  global dip."**
- **"Unconstrained: gradient vanishes. Constrained: gradient just can't point feasibly downhill."**
- **"Convexity needs BOTH: a convex objective AND a convex feasible set — one alone isn't enough."**

## Why Students Fail

### MC-1: LOCAL-IS-NOT-GLOBAL-FOR-CONVEX
- **Surface form**: treats a locally optimal point as potentially not global; applies heuristics
  (random restarts, simulated annealing) unnecessarily to a convex problem.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type). Learners are
  taught, correctly, that local $\neq$ global for NON-convex problems, and that caution is
  over-applied to convex problems as well, where the fundamental theorem specifically rules it
  out.
- **Repair**: re-walk the fundamental theorem's proof-by-contradiction for the specific convex
  function in question, confirming no "trap" local minimum can exist.

### MC-2: GRADIENT-ZERO-SUFFICIENT-CONSTRAINED
- **Surface form**: uses $\nabla f(x^*)=0$ as the constrained optimality condition without
  checking feasibility, failing to use the projected-gradient/variational-inequality condition.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type). In the
  unconstrained case, $\nabla f=0$ is both necessary AND sufficient, and that sufficiency is
  overgeneralized directly into the constrained case, where it no longer applies.
- **Repair**: re-verify the specific constrained example, showing $\nabla f(x^*)\ne0$ at the
  genuine constrained optimum, yet the variational inequality still holds.

### MC-3: CONVEXITY-OF-FEASIBLE-SET-ENOUGH
- **Surface form**: believes a problem is convex as long as the feasible set $C$ is convex, without
  checking that the objective $f$ is also convex.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type). Convexity of
  the feasible set is one of two requirements, and its presence is overgeneralized into sufficiency
  for the whole problem, missing that a non-convex objective over a convex set can still have many
  local minima.
- **Repair**: re-examine the specific non-convex-objective-over-convex-set counterexample,
  confirming multiple genuinely different local minima exist despite the feasible set's convexity.

## Misconceptions

### MC-1: LOCAL-IS-NOT-GLOBAL-FOR-CONVEX
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: GRADIENT-ZERO-SUFFICIENT-CONSTRAINED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: CONVEXITY-OF-FEASIBLE-SET-ENOUGH
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A ball rolling in a single bowl-shaped basin always settles at the true bottom — no matter
  where it starts, there's only one low point to find. That's convex optimization's central
  guarantee."**
- **Anti-analogy**: convex optimization is NOT "just check the feasible set is convex and you're
  done" — the objective's own convexity is a SEPARATE, equally necessary requirement.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $f_1(x)=x^2$ (convex, one minimum) against $f_2(x)=\sin
  x$ (non-convex, infinitely many local minima), confirm only $f_1$ carries the local-implies-
  global guarantee.
- **Demonstration 2 (targets MC-2)**: for $\min x^2+y^2$ s.t. $x+y\ge1$, the unconstrained minimum
  $(0,0)$ is infeasible; the constrained optimum is $(1/2,1/2)$ with $\nabla f=(1,1)\ne0$, yet the
  variational inequality $\langle\nabla f,y-x^*\rangle\ge0$ holds for every feasible $y$.
- **Demonstration 3 (targets MC-3)**: for $\min\sin x$ s.t. $x\in[0,4\pi]$ (convex feasible
  interval, non-convex objective), confirm multiple genuinely distinct local minima exist despite
  the feasible set's convexity.

## Discovery Questions
1. "For a convex function over a convex feasible set, can a local minimum fail to be the global
   minimum?"
2. "At a constrained optimum, does the gradient $\nabla f(x^*)$ have to equal zero, the way it
   does in the unconstrained case?"
3. "If the feasible set $C$ is convex, is that alone enough to guarantee the optimization problem
   is convex?"

## Teaching Sequence
1. **Anchor**: connect to `math.opt.convex-function`'s own every-local-min-is-global theorem and
   `math.opt.convex-set`'s own convexity-preserving structure, framing the fundamental theorem as
   their direct combination.
2. **Conflict evidence**: the constrained-optimum example where $\nabla f(x^*)\ne0$ yet the
   variational inequality holds, breaking MC-2 directly.
3. **Contrast pair**: the problem-class gallery (LP/QP/SOCP/SDP vs. non-convex), isolating the
   three-part convexity check and breaking MC-3.
4. **Mastery gate**: require a correct fundamental-theorem application, a correct optimality-
   condition verification (constrained or unconstrained), and a correct problem-class
   classification, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept "local minimum found, so it must be the answer" for a non-convex problem — require
  the objective AND feasible set to both be verified convex first.
- When a constrained optimum is claimed, require the variational inequality (not $\nabla f=0$
  alone) to be checked.

## Voice Teaching Notes
- Say "is this problem convex because the objective is convex, the feasible set is convex, or
  both?" whenever convexity is claimed from only one of the two.
- When a candidate optimum is on the boundary of the feasible set, ask "does the gradient have to
  be zero there, or just point the right way?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies the fundamental theorem to conclude a found
  local minimum of a convex problem is global.
- **Rung 2 (application)**: learner correctly verifies the variational inequality at a constrained
  optimum and correctly classifies a problem into LP/QP/SOCP/SDP/non-convex.
- **Rung 3 (transfer)**: learner correctly extends the framework to a non-smooth convex objective
  (e.g. the LASSO penalty) via the proximal gradient method, and explains why the problem remains
  convex despite non-differentiability.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the specific fundamental-theorem proof for the function in question.
- If MC-2 recurs, re-verify the specific variational inequality for the constrained point in
  question.
- If MC-3 recurs, re-examine the specific non-convex-objective-over-convex-set counterexample in
  question.

## Memory Hooks
- "Convex + convex: one bowl, one basin, local is global."
- "Unconstrained: gradient zero. Constrained: variational inequality."
- "Two checks, not one: objective convex AND feasible set convex."

## Transfer Connections
- `math.opt.convex-function` (already authored, this campaign): supplies the every-local-min-is-
  global theorem this concept extends to a constrained feasible set.
- `math.opt.convex-set` (already authored, this campaign): supplies the convexity-preserving
  structure of the feasible set $C$ the fundamental theorem's proof directly relies on.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.convex-optimization.md`, reused by
  reference for its representation-shift problem-form gallery and fundamental-theorem proof
  sketch, its conflict-evidence variational-inequality demonstration, its pattern-induction
  problem-class gallery, its contrast-pair convex/non-convex comparison, and its three-
  misconception registry (birth types EXPLICITLY given by this Blueprint, adopted directly).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (the proximal
  gradient method extending convex optimization to non-smooth objectives, using the LASSO penalty
  as the worked case).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG `unlocks` discrepancy found**: the Blueprint's Component 0 states
  "unlocks: math.opt.linear-programming, math.opt.semidefinite-programming, math.opt.duality" —
  but the live KG lists only `unlocks: ['math.opt.duality']`. Resolved toward the KG per standing
  policy (never fixing the KG or Blueprint file). Recorded as a standing forward note: the
  Blueprint's problem-class gallery (Component 5, A03) genuinely anticipates `math.opt.linear-
  programming` and `math.opt.semidefinite-programming` as forward relationships, but the KG's own
  `unlocks` field does not currently reflect this — a future KG sync may reconcile it.
- All other metadata fields (requires `math.opt.convex-function`+`math.opt.convex-set`, cross_links
  none, expert/apply, mastery_threshold 0.8, estimated_hours 7) verified against the live KG and
  match exactly.

## Version History
- 2026-09-14 (Batch 81): authored. Fourth and final entry this batch, closing the ENTIRE
  batch-start math.opt frontier (alongside `dynamic-programming`, `gradient-methods`,
  `lagrange-multipliers`) with none deferred. `math.opt` moves from 3/16 to **7/16** this batch.

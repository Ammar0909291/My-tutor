# math.opt.newton-optimization

## Identity
- **KG id**: `math.opt.newton-optimization`
- **Domain**: math.opt
- **Requires**: `math.opt.gradient-methods`, `math.calc.multivariable-extrema`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 6

## Learning Objective
Given a twice-differentiable objective function $f:\mathbb R^n\to\mathbb R$, apply the NEWTON STEP
$\theta_{k+1}=\theta_k-[\nabla^2f(\theta_k)]^{-1}\nabla f(\theta_k)$ — reusing `math.opt.gradient-
methods`' own iterative-update framework, now with second-order information — interpret this
GEOMETRICALLY as minimizing the local QUADRATIC approximation, explain why the convergence rate is
QUADRATIC near a non-degenerate local minimum (reusing `math.calc.multivariable-extrema`'s own
Hessian-based classification), identify when the method can FAIL (indefinite Hessian, far-from-
minimum start, singular Hessian), and state the quasi-Newton and damped-Newton remedies.

## Core Understanding
Where `math.opt.gradient-methods`' descent step uses only FIRST-order information (the gradient),
Newton's method uses SECOND-order information (the Hessian) to take a genuinely smarter step: at
each iterate $\theta_k$, it forms the local QUADRATIC Taylor approximation of $f$ and jumps
DIRECTLY to that quadratic's own minimum, $\theta_{k+1}=\theta_k-[\nabla^2f(\theta_k)]^{-1}
\nabla f(\theta_k)$ — equivalently, this is Newton's ROOT-FINDING method applied to solving
$\nabla f(\theta)=0$ directly, reusing `math.calc.multivariable-extrema`'s own stationary-point
target.

CONVERGENCE RATE is the qualitative payoff: gradient descent converges LINEARLY (error shrinks by
a constant FACTOR each step); Newton's method converges QUADRATICALLY near a non-degenerate local
minimum (error shrinks like its own SQUARE each step, $e_{k+1}\le Ce_k^2$) — this means the number
of CORRECT DIGITS roughly DOUBLES with every step, not that convergence happens in exactly two
steps. From 1 correct digit, three Newton steps can reach roughly 8 correct digits — a dramatically
faster guarantee than gradient descent's constant-factor shrinkage, but this fast regime applies
only ONCE the iterate is already close to the minimum.

Newton's method can FAIL in several genuine ways: an INDEFINITE Hessian (not positive definite,
reusing `math.calc.multivariable-extrema`'s own classification) can send the step UPHILL instead
of downhill; a SINGULAR Hessian (determinant zero) makes the matrix non-invertible outright; and
starting FAR from the minimum makes the local quadratic approximation a poor guide, risking
overshoot. Standard remedies: DAMPED NEWTON (or Levenberg-Marquardt) adds regularization,
$\theta_{k+1}=\theta_k-(\nabla^2f+\lambda I)^{-1}\nabla f$ for $\lambda>0$, to handle an indefinite
or singular Hessian; a LINE SEARCH along the Newton direction handles the far-from-minimum case;
and QUASI-NEWTON methods (BFGS, L-BFGS) approximate the Hessian's inverse using only gradient
information, avoiding the $O(n^3)$ cost of exact Hessian inversion entirely — a genuinely different
tradeoff (superlinear convergence, $O(n^2)$ or better per-step cost) rather than an inferior
substitute.

## Mental Models
- **"Gradient descent uses the slope; Newton uses the slope AND the curvature to jump straight to
  the local quadratic's own minimum."**
- **"Quadratic convergence doubles correct digits each step — it describes the RATE, never a step
  count."**
- **"Newton finds the NEAREST critical point from where you start — not automatically the global
  minimum."**

## Why Students Fail

### MC-1: NEWTON-ALWAYS-FINDS-GLOBAL-MIN
- **Surface form**: assumes Newton's method converges to the global minimum regardless of starting
  point, conflating local quadratic convergence with global convergence.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type). "Newton's
  method converges fast" is frequently stated without the "near a critical point" qualifier,
  leaving the impression that speed implies reaching the true global answer from anywhere.
- **Repair**: re-run the specific case where Newton converges to a local MAXIMUM or saddle point
  from a poorly chosen start, confirming it finds the nearest critical point, not the global
  minimum.

### MC-2: HESSIAN-INVERSION-IS-EXPENSIVE-SO-SKIP
- **Surface form**: dismisses Newton's method as unusable because Hessian inversion costs
  $O(n^3)$, without considering quasi-Newton alternatives.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type). The
  computational cost of exact Hessian inversion is emphasized, while the quasi-Newton family that
  sidesteps it entirely is often introduced separately or later, leaving the cost objection
  unresolved.
- **Repair**: re-examine the specific quasi-Newton (BFGS/L-BFGS) update cost for the dimension in
  question, confirming it avoids ever forming or inverting the full Hessian.

### MC-3: QUADRATIC-CONVERGENCE-MEANS-TWO-STEPS
- **Surface form**: interprets "quadratic convergence" as converging in exactly 2 steps, confusing
  the convergence rate (error-squared behavior) with a step count.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type). The word
  "quadratic" is strongly associated with the number 2 (a quadratic equation, degree 2), and that
  association is carried over incorrectly into a claim about how many iterations are needed.
- **Repair**: re-trace the specific digit-doubling sequence for the case in question, confirming
  "quadratic" describes the exponent in $e_{k+1}\le Ce_k^2$, not a fixed step count.

## Misconceptions

### MC-1: NEWTON-ALWAYS-FINDS-GLOBAL-MIN
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: HESSIAN-INVERSION-IS-EXPENSIVE-SO-SKIP
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: QUADRATIC-CONVERGENCE-MEANS-TWO-STEPS
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Gradient descent feels its way downhill one careful step at a time; Newton's method briefly
  imagines the whole valley is a perfect bowl and jumps straight to that bowl's own bottom — a
  brilliant shortcut when the imagined bowl is a good match, and a bad guess when it isn't."**
- **Anti-analogy**: Newton's method is NOT "always converges in 2 steps" — the doubling-of-digits
  behavior can take several steps to even begin, and only kicks in once the iterate is already
  close to a genuine local minimum.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: for $f(\theta)=\theta^4-4\theta^2$ starting at $\theta_0=2$,
  trace several Newton iterations converging toward $\theta=\sqrt2$ — slowly at first, illustrating
  that fast convergence is a NEAR-minimum property, not immediate.
- **Demonstration 2 (targets MC-3)**: from error $e_k=0.1$ (1 correct digit), trace
  $e_{k+1}\le C(0.01)$ (2 digits), $e_{k+2}\le C(0.0001)$ (4 digits) — doubling of correct digits
  per step, contrasted with gradient descent's constant-factor shrinkage.
- **Demonstration 3 (targets MC-1)**: for $f(\theta)=\theta^3-3\theta$ (critical points at
  $\theta=\pm1$, a local max at $-1$ and local min at $1$), starting at $\theta_0=-0.5$, Newton
  converges toward $\theta=-1$ — the LOCAL MAXIMUM, not the global minimum.

## Discovery Questions
1. "Does Newton's method always converge to the global minimum, regardless of where it starts?"
2. "If Hessian inversion costs $O(n^3)$, does that mean Newton-style methods are simply unusable
   for large problems?"
3. "Does 'quadratic convergence' mean the method converges in exactly two steps?"

## Teaching Sequence
1. **Anchor**: connect to `math.opt.gradient-methods`' own iterative-update framework and
   `math.calc.multivariable-extrema`'s own Hessian-based classification, framing the Newton step
   as their direct combination.
2. **Conflict evidence**: the local-maximum convergence case, breaking MC-1 directly.
3. **Contrast pair**: exact Newton against quasi-Newton (BFGS/L-BFGS), isolating the cost-vs-
   convergence-rate tradeoff and breaking MC-2.
4. **Mastery gate**: require a correct hand-computed Newton step, a correct convergence-rate
   distinction (quadratic vs. linear, as an exponent not a step count), and a correct failure-mode
   diagnosis with remedy, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept "Newton found a critical point, so it must be the global minimum" — require the
  Hessian to be checked at that point.
- When "quadratic convergence" is invoked, require the learner to state it as a rate (error
  squared), never a step count.

## Voice Teaching Notes
- Say "is that the global minimum, or just the nearest critical point from your starting guess?"
  whenever a Newton result is claimed globally optimal without justification.
- When Hessian cost is raised as an objection, ask "is there a way to get the benefit without
  forming the full Hessian?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly hand-computes one or more Newton steps for a given
  function.
- **Rung 2 (application)**: learner correctly diagnoses a Newton failure mode (indefinite/singular
  Hessian, far-from-minimum start) and proposes the matching remedy.
- **Rung 3 (transfer)**: learner correctly recognizes the Newton structure in a novel context
  (e.g. natural gradient descent using the Fisher information matrix) and explains why a
  guaranteed-positive-semidefinite metric avoids Newton's indefinite-Hessian failure mode.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the specific local-maximum-convergence case for the starting point in
  question.
- If MC-2 recurs, re-examine the specific quasi-Newton cost comparison for the dimension in
  question.
- If MC-3 recurs, re-trace the specific digit-doubling sequence for the case in question.

## Memory Hooks
- "Newton jumps to the local quadratic's own minimum — using curvature, not just slope."
- "Quadratic convergence doubles digits each step — a rate, never a step count."
- "Indefinite or singular Hessian, or too far from the minimum: Newton can fail."

## Transfer Connections
- `math.opt.gradient-methods` (already authored, this campaign): supplies the iterative-update
  framework this concept extends with second-order (Hessian) information.
- `math.calc.multivariable-extrema`: NOT authored as an Educational Brain entry within
  mathematics's own tree at the time of authoring — the Hessian-based local-extremum
  classification is reused conceptually per the Blueprint's own citation.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.newton-optimization.md`, reused by
  reference for its representation-shift geometric/algebraic/matrix-form/root-finding gallery, its
  pattern-induction quadratic-convergence digit-doubling table, its contrast-pair Newton-vs-
  gradient-descent-vs-quasi-Newton comparison, and its three-misconception registry (birth types
  EXPLICITLY given by this Blueprint, adopted directly).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (natural gradient
  descent using the Fisher information matrix as a Newton-style metric, explaining its guaranteed
  positive-semidefiniteness).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG `unlocks` discrepancy found**: the Blueprint's Component 0 states
  "unlocks: math.opt.kkt" — but the live KG lists `unlocks: []` (empty) for this concept. Resolved
  toward the KG per standing policy, not fixed in the KG or Blueprint file. Noted alongside
  `math.opt.duality`'s own KG-confirmed `unlocks: ['math.opt.kkt']` in this same batch — the
  Blueprint's forward relationship to `math.opt.kkt` genuinely exists via `duality` instead, and
  this entry's own Blueprint appears to have duplicated that relationship in error.
- All other metadata fields (requires `math.opt.gradient-methods`+`math.calc.multivariable-
  extrema`, cross_links none, expert/apply, mastery_threshold 0.75, estimated_hours 6) verified
  against the live KG and match exactly.

## Version History
- 2026-09-14 (Batch 82): authored. Third and final entry this batch, alongside `duality` and
  `linear-programming` — closing the ENTIRE batch-start math.opt frontier with none deferred.
  `math.opt` moves from 7/16 to **10/16** this batch.

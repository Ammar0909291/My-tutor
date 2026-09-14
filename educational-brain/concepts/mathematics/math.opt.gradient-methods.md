# math.opt.gradient-methods

## Identity
- **KG id**: `math.opt.gradient-methods`
- **Domain**: math.opt
- **Requires**: `math.opt.unconstrained-optimization`, `math.calc.gradient`
- **Unlocks**: `math.opt.stochastic-gradient`, `math.opt.newton-optimization`
- **Cross-links**: `math.num.newtons-method`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
State the GRADIENT DESCENT update rule $x_{k+1}=x_k-\alpha_k\nabla f(x_k)$ — directly reusing
`math.calc.gradient`'s own steepest-ascent fact ($\nabla f$ points toward steepest ASCENT, so
$-\nabla f$ points toward steepest DESCENT) — and perform iterations by hand in the CORRECT
direction; recognize the critical role of the STEP SIZE $\alpha_k$ (too large causes DIVERGENCE;
too small converges slowly); and state the CONVERGENCE-RATE distinction — SUBLINEAR ($O(1/k)$) for
general convex $f$, LINEAR (geometric) for STRONGLY convex $f$.

## Core Understanding
`math.calc.gradient` established that $\nabla f$ points in the direction of steepest ASCENT.
Gradient descent seeks a MINIMUM, so each step moves in the OPPOSITE direction, $-\nabla f(x_k)$ —
the direction of steepest DESCENT. The update rule $x_{k+1}=x_k-\alpha_k\nabla f(x_k)$ takes a step
of size $\alpha_k$ (the STEP SIZE or LEARNING RATE) in that descent direction, repeated
iteratively, aiming toward the stationary point `math.opt.unconstrained-optimization`'s own
condition $\nabla f(x^*)=0$ identifies.

Step size choice is CRITICAL, not automatic: choosing $\alpha_k$ too LARGE can cause the iterates
to OVERSHOOT the minimum and DIVERGE — growing in magnitude, moving further away with each step —
even for a simple convex quadratic function where the minimum is easy to find in principle.
Choosing $\alpha_k$ appropriately small guarantees convergence, but too small a value converges
very slowly. Step size is typically chosen via a line search or a fixed rule tuned to the
function's known properties.

Convergence RATE depends on the function's convexity structure, reusing
`math.opt.unconstrained-optimization`'s own Hessian-positive-definiteness idea: for a general
convex function $f$ with Lipschitz continuous gradient, gradient descent converges only at a
SUBLINEAR rate, $O(1/k)$ — the error shrinks roughly like $1/k$. For a STRONGLY convex function
(one whose curvature is bounded away from zero everywhere, a uniform strengthening of the Hessian
condition), gradient descent converges LINEARLY (geometrically) instead — the error shrinks by a
fixed multiplicative FACTOR at every step, a genuinely faster guarantee. The FUNCTION's own
structure — not gradient descent itself — determines which guarantee applies.

## Mental Models
- **"Steepest ascent points one way; descent walks the opposite way — subtract, never add."**
- **"Step size is a knob: too big overshoots and diverges, too small crawls."**
- **"Strongly convex earns a faster, geometric guarantee; merely convex gets only the slow
  sublinear one."**

## Why Students Fail

### MC-1: GRADIENT-DESCENT-DIRECTION-SIGN-ERROR
- **Surface form**: believes gradient descent moves in the direction of the gradient itself rather
  than its negative, confusing steepest ascent with steepest descent.
- **Birth type**: Type 4, notation-induced (independently classified — the Blueprint gives
  Description and Severity but not birth type). The update rule's minus sign is a single symbol
  easy to drop or misread, and "the gradient" is casually spoken of as pointing "the way to go"
  without the ascent/descent distinction being carried along.
- **Repair**: re-walk the correct-direction iteration explicitly, contrasting it against the
  wrong-sign alternative moving away from the minimum.

### MC-2: ANY-POSITIVE-STEP-SIZE-ASSUMED-SUFFICIENT
- **Surface form**: believes any positive step size guarantees convergence, missing that too large
  a step size can cause the iterates to diverge, even for a simple convex function.
- **Birth type**: Type 1, overgeneralization (independently classified). Moving in the correct
  DIRECTION feels like it should be enough to make progress, and that correctness is
  overgeneralized past the separate requirement that the step SIZE also be small enough not to
  overshoot.
- **Repair**: re-run the specific diverging iteration sequence for the case in question, showing
  the iterates growing in magnitude despite a positive step size and the correct direction.

### MC-3: CONVERGENCE-RATE-ASSUMED-UNIFORM-ACROSS-ALL-CONVEX-FUNCTIONS
- **Surface form**: believes gradient descent converges at the same rate for every convex
  function, missing the genuine distinction between sublinear (merely convex) and linear (strongly
  convex) convergence guarantees.
- **Birth type**: Type 1, overgeneralization (independently classified). "Convex" is treated as one
  uniform category with one uniform behavior, overgeneralizing past the genuinely stronger
  strongly-convex subcategory that earns a faster guarantee.
- **Repair**: re-compute the specific geometric ratio for the strongly convex case against the
  weaker sublinear rate for the merely convex case in question.

## Misconceptions

### MC-1: GRADIENT-DESCENT-DIRECTION-SIGN-ERROR
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-2: ANY-POSITIVE-STEP-SIZE-ASSUMED-SUFFICIENT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: CONVERGENCE-RATE-ASSUMED-UNIFORM-ACROSS-ALL-CONVEX-FUNCTIONS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Walking downhill in the fog: you feel which way is steepest and step the OPPOSITE way to
  descend — and if your stride is too long, you can stride right over the valley floor and end up
  higher on the other side."**
- **Anti-analogy**: gradient descent is NOT "any step in the right direction eventually gets
  there" — a step too large in the correct direction can still diverge entirely.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $f(x)=x^2$ starting at $x_0=4$, $\alpha=0.1$: iterate
  $x_1=3.2$, $x_2=2.56$, moving steadily toward $x=0$; contrast the wrong-sign alternative
  $x_1=4.8$, moving away.
- **Demonstration 2 (targets MC-2)**: same $f(x)=x^2$, $x_0=4$, but $\alpha=1.5$: iterate
  $x_1=-8$, $x_2=16$, $x_3=-32$ — growing in magnitude, diverging.
- **Demonstration 3 (targets MC-3)**: for $f(x)=x^2$ with $\alpha=0.1$: error ratio
  $e_{k+1}=0.8e_k$ exactly, a clean geometric (linear) convergence; contrast $f(x)=x^4$ near its
  flat minimum, where the strong-convexity condition fails and only the weaker $O(1/k)$ guarantee
  applies.

## Discovery Questions
1. "Does gradient descent move in the direction of the gradient, $\nabla f(x_k)$, or the opposite
   direction?"
2. "As long as the step size is positive, is gradient descent guaranteed to converge to the
   minimum?"
3. "Does gradient descent converge at the same rate for every convex function, strongly convex or
   not?"

## Teaching Sequence
1. **Anchor**: connect to `math.calc.gradient`'s own steepest-ascent fact and
   `math.opt.unconstrained-optimization`'s own stationary-point target, framing the update rule as
   an iterative search toward it.
2. **Conflict evidence**: the diverging large-step-size iteration, breaking MC-2 directly.
3. **Contrast pair**: the strongly-convex geometric-ratio case against the merely-convex sublinear
   case, isolating MC-3.
4. **Mastery gate**: require a correct hand-iterated update in the correct direction, a correct
   step-size-divergence explanation, and a correct convergence-rate distinction, at the Blueprint's
   own stated MAMR of 5/5.

## Tutor Actions
- Never accept an update computed by ADDING the gradient — require the negative-gradient direction
  to be stated explicitly.
- When iterates are diverging, require the learner to check the step size before any other
  explanation.

## Voice Teaching Notes
- Say "are you subtracting or adding the gradient there?" whenever a computed update moves in the
  wrong direction.
- When convergence rate is discussed, ask "is this function strongly convex, or just convex — does
  that change what rate you can expect?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly hand-computes one or more gradient descent
  iterations in the correct (negative-gradient) direction.
- **Rung 2 (application)**: learner correctly identifies that a given diverging iteration sequence
  is caused by an oversized step size, and proposes a smaller one.
- **Rung 3 (transfer)**: learner correctly explains, in a novel machine-learning context, why two
  models with different convexity structure should be expected to converge at different rates
  under the identical algorithm and step-size rule.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the specific correct-direction iteration for the case in question.
- If MC-2 recurs, re-run the specific diverging sequence for the case in question.
- If MC-3 recurs, re-compute the specific geometric-vs-sublinear rate comparison for the case in
  question.

## Memory Hooks
- "Subtract the gradient — that's descent."
- "Step size too big: overshoot and diverge. Too small: crawl."
- "Strongly convex: fast geometric convergence. Merely convex: slow $O(1/k)$."

## Transfer Connections
- `math.opt.unconstrained-optimization` (already authored, this campaign): supplies the stationary-
  point target this concept's iterative search aims to satisfy, and the Hessian-positive-
  definiteness idea this concept's strong-convexity condition uniformly strengthens.
- `math.calc.gradient`: NOT authored as an Educational Brain entry within mathematics's own tree at
  the time of authoring — the steepest-ascent fact is reused conceptually per the Blueprint's own
  citation, consistent with standard cross-reference practice for a prerequisite whose EB status is
  independently tracked.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.gradient-methods.md`, reused by reference
  for its representation-shift correct-direction demonstration, its conflict-evidence divergence
  demonstration, its contrast-pair convergence-rate demonstration, and its three-misconception
  registry (birth types independently classified, since this Blueprint states severity but not
  birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a machine
  learning training-loss scenario applying the direction fact, the divergence diagnosis, and the
  strongly-convex-vs-merely-convex convergence-rate distinction).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.opt.unconstrained-optimization`+`math.calc.gradient`, unlocks
  `math.opt.stochastic-gradient`+`math.opt.newton-optimization`, cross_links
  `math.num.newtons-method`, proficient/apply, mastery_threshold 0.85, estimated_hours 5) was
  directly verified against the live KG and matches exactly. The Blueprint's own P76_mode
  (independence, since `math.num.newtons-method` is confirmed unauthored via `ls` — `math.num`
  entirely unstarted) is correctly declared and required no correction.

## Version History
- 2026-09-14 (Batch 81): authored. Second entry this batch, closing the entire batch-start
  math.opt frontier alongside `dynamic-programming`, `convex-optimization`,
  `lagrange-multipliers`. `math.opt` moves toward **7/16** this batch.

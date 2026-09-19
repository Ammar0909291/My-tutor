# math.num.newtons-method

## Identity
- **KG id**: `math.num.newtons-method`
- **Domain**: math.num
- **Requires**: `math.num.root-finding`, `math.calc.derivative-definition`
- **Unlocks**: none
- **Cross-links**: `math.opt.gradient-methods`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Derive the Newton iteration $x_{n+1}=x_n-f(x_n)/f'(x_n)$ from the tangent-line approximation and
apply it to locate a root to prescribed precision; identify its failure modes (zero derivative,
divergence from a bad initial guess, oscillation/cycles) — NEVER assuming Newton's method converges
for any continuous function from any starting point; and recognize that LINEAR convergence (as at
a multiple root) is still practically useful, NEVER dismissed as "too slow to matter," while
quadratic convergence for simple roots roughly DOUBLES the correct digits each iteration.

## Core Understanding
NEWTON'S ITERATION IS THE TANGENT LINE'S X-INTERCEPT — NEVER AN ARBITRARY FORMULA: the tangent
line to $y=f(x)$ at $(x_n,f(x_n))$ is $y-f(x_n)=f'(x_n)(x-x_n)$; setting $y=0$ and solving gives
$x_{n+1}=x_n-f(x_n)/f'(x_n)$ — geometrically, each iterate is exactly where the CURRENT tangent
line crosses the $x$-axis. For $f(x)=x^2-2$, $x_0=2$: $x_1\approx1.5$ (error $\approx0.086$),
$x_2\approx1.4167$ (error $\approx0.0025$), $x_3\approx1.41422$ (error $\approx2\times10^{-6}$) —
the number of correct digits roughly DOUBLES each step, this is QUADRATIC convergence, valid for a
SIMPLE root ($f'(\alpha)\neq0$) with a sufficiently close starting point.

NEWTON'S METHOD NEVER CONVERGES UNCONDITIONALLY — NEVER ASSUME ANY STARTING POINT WORKS: for
$f(x)=x^{1/3}$, $f'(x)=\frac13x^{-2/3}$, the iteration becomes $x_{n+1}=x_n-3x_n=-2x_n$ — the
iterate DOUBLES in magnitude and flips sign every step, DIVERGING from any nonzero start, because
$f'(0)=0$ at the very root being sought. For $f(x)=x^3-x$ (roots $0,\pm1$), starting at
$x_0=1/\sqrt5$ produces a 2-CYCLE — the iteration oscillates between two points FOREVER, never
converging. Convergence REQUIRES $f$ twice differentiable, $f'(\alpha)\neq0$ at the root, and $x_0$
within the root's "basin of attraction" — NEVER guaranteed for an arbitrary starting point.

LINEAR CONVERGENCE AT A MULTIPLE ROOT IS SLOWER, NOT USELESS — NEVER DISMISSED AS "TOO SLOW": for
$f(x)=(x-1)^2$ (a DOUBLE root at $x=1$), Newton's iteration reduces to $x_{n+1}=(1+x_n)/2$ — a
fixed-point iteration with ratio $\tfrac12$, gaining roughly $\log_{10}2\approx0.3$ correct digits
per iteration (LINEAR convergence) rather than doubling digits each step (quadratic). This is
SLOWER than quadratic, but still reaches 15 digits of accuracy in about 50 iterations — genuinely
USABLE, never "too slow to be useful." The MODIFIED iteration $x_{n+1}=x_n-m\cdot f(x_n)/f'(x_n)$
(with multiplicity $m=2$ here) RESTORES quadratic convergence, at the cost of needing to know $m$.

## Mental Models
- **"Newton's method walks down the tangent line to where it crosses zero — never an arbitrary
  numerical trick."**
- **"Quadratic convergence for a simple root from a good start; but a zero derivative, a bad
  starting point, or a multiple root can each break that guarantee — never assume it just works."**
- **"Linear convergence is slower than quadratic, never useless — a rate below 1 still reaches
  full precision, just in more steps."**

## Why Students Fail

### MC-1: NEWTON-ALWAYS-CONVERGES
- **Surface form**: believes Newton's method converges for any continuous function and any
  starting point, not considering divergence, cycles, or failure at flat regions.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — introductory examples
  converge beautifully and failure cases are deferred, while the convergence theorem's "sufficiently
  close initial guess" clause is stated but not enforced in practice).
- **Repair**: re-present the $f(x)=x^{1/3}$ divergence ($x_{n+1}=-2x_n$) as direct counter-evidence,
  tracing the failure to $f'(0)=0$ at the root itself.

### MC-2: INITIAL-GUESS-IRRELEVANT
- **Surface form**: picks an arbitrary starting point and expects convergence, without using sign
  changes, graphs, or bracketing to find a good initial guess.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — nice quadratic-
  convergence examples work from any reasonable start, hiding that the basin of attraction can be
  small or fractal-shaped).
- **Repair**: re-present the $f(x)=x^3-x$, $x_0=1/\sqrt5$ 2-cycle, then the bracket-first-refine-
  with-Newton-second strategy.

### MC-3: LINEAR-CONVERGENCE-MEANS-SLOW
- **Surface form**: discards a method showing linear convergence as "too slow to be useful,"
  missing that a rate like $\tfrac12$ still adds digits steadily every iteration.
- **Birth type**: language contamination (Blueprint's own declared birth type — "linear"/"first-
  order" is associated with "slow" relative to "quadratic," when the actual RATE matters more than
  the order label).
- **Repair**: re-present the double-root $(x-1)^2$ case numerically — 50 linear-rate iterations
  reach the same 15-digit accuracy that 4 quadratic-rate iterations would, just via more steps.

## Misconceptions

### MC-1: NEWTON-ALWAYS-CONVERGES
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: INITIAL-GUESS-IRRELEVANT
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: LINEAR-CONVERGENCE-MEANS-SLOW
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Newton's method is following the tangent line downhill to where it crosses the axis, then
  drawing a new tangent from there — never a magic root-guessing formula."**
- **Anti-analogy**: a method with a small, steady rate of improvement (linear convergence) is not
  automatically worthless — a savings account earning steadily still reaches a large sum, just more
  slowly than compounding at a faster rate would.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the geometric tangent-line derivation and $x^2-2$ convergence
  table, showing quadratic error-squaring.
- **Demonstration 2 (targets MC-1/MC-2)**: the $x^{1/3}$ divergence and $x^3-x$ 2-cycle, both
  genuine failures of unconditional convergence.
- **Demonstration 3 (targets MC-3)**: the $(x-1)^2$ double-root linear-convergence case, with the
  50-iteration digit-count comparison against the quadratic case.

## Discovery Questions
1. "Does Newton's method converge for any continuous function starting from any point?"
2. "If a reasonable-looking starting point works for one function, will it always work regardless
   of which function or root you're targeting?"
3. "If a method converges linearly rather than quadratically, does that mean it's too slow to be
   practically useful?"

## Teaching Sequence
1. **Representation shift**: the geometric/algebraic/numeric/code four-representation derivation,
   working Demonstration 1.
2. **Pattern induction**: the convergence-and-failure gallery, working Demonstration 2, isolating
   MC-1 and MC-2.
3. **Misconception detector**: the $x-\tan(x)$ divergence-from-a-bad-start gate question, isolating
   MC-1/MC-2 jointly, with bracketing-first as the recovery strategy.
4. **Contrast pair**: the linear-versus-quadratic convergence-rate comparison, working
   Demonstration 3, isolating MC-3.
5. **Mastery gate**: require a correct hand-computed iteration, a correct failure-mode diagnosis,
   and a correct linear-vs-quadratic convergence-rate explanation, at the Blueprint's own stated
   MAMR of 5/5.

## Tutor Actions
- Never accept "Newton's method always converges" from any starting point.
- Never accept an arbitrary starting point chosen without checking a sign change, graph, or
  bracket.
- Never accept "linear convergence is too slow to be useful" without a numerical comparison.

## Voice Teaching Notes
- Say "what is f' doing at or near the root — could it be zero or very small?" whenever
  convergence is assumed unconditionally.
- Ask "is that rate below 1, or is it actually diverging?" whenever a student dismisses a
  convergent-but-linear method as not useful.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly derives and applies the Newton iteration to a simple
  root.
- **Rung 2 (application)**: learner correctly identifies a failure mode (zero derivative, bad
  start, multiple root) from a given scenario and proposes a recovery (bracketing, modified
  Newton).
- **Rung 3 (transfer)**: learner correctly applies Newton's method to optimization ($f=g'$),
  identifying when it converges to a maximum or saddle point instead of a minimum.

## Tutor Recovery Strategy
- If MC-1 recurs, re-present the $x^{1/3}$ divergence, tracing it to $f'(0)=0$.
- If MC-2 recurs, re-present the $x^3-x$ 2-cycle and the bracket-then-refine strategy.
- If MC-3 recurs, re-present the double-root linear-versus-quadratic digit-count comparison.

## Memory Hooks
- "Newton's iterate is where the current tangent line crosses zero."
- "A zero derivative, a bad start, or a multiple root can each break convergence — never assumed
  automatic."
- "Linear convergence is slower, never useless — the rate matters more than the order label."

## Transfer Connections
- `math.num.root-finding` (already authored, this campaign, Batch 194): supplies the general
  root-finding framing and bracketing methods used as Newton's recommended fallback/complement.
- `math.calc.derivative-definition` (already authored, certified domain): supplies the derivative
  $f'(x_n)$ used directly in every Newton step.
- `math.opt.gradient-methods` (cross-link; already authored, this campaign, Batch 196 context):
  Newton's method applied to $f=g'$ gives the second-order optimization update, contrasted with
  gradient descent's first-order-only update.

## Cross-Subject Connections
- Engineering root-finding (e.g. locating equilibrium points, circuit design): Newton's method is
  the default numerical solver, with its convergence caveats directly determining solver
  reliability in practice.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.newtons-method.md`, reused by reference
  for its four-representation tangent-line derivation, its convergence-and-failure gallery, its
  $x-\tan(x)$ misconception-detector gate, its linear-versus-quadratic rate comparison, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link-mode probe (`math.opt.gradient-methods`) deriving
  the optimization update $x_{n+1}=x_n-g'(x_n)/g''(x_n)$ and identifying failure at a maximum or
  saddle point.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.num.root-finding`/`math.calc.derivative-definition`, unlocks none, cross_links
  `math.opt.gradient-methods`, proficient/apply, mastery_threshold 0.9, estimated_hours 4) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 202): authored. First entry this batch. Companion batch concept:
  `math.num.interpolation`.

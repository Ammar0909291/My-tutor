# math.opt.unconstrained-optimization

## Identity
- **KG id**: `math.opt.unconstrained-optimization`
- **Domain**: math.opt
- **Requires**: `math.calc.critical-points`, `math.calc.concavity`
- **Unlocks**: `math.opt.gradient-methods`, `math.opt.convex-optimization`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Generalize the single-variable critical-point condition $f'(c)=0$ (`math.calc.critical-points`) to
the multivariable STATIONARY-POINT condition $\nabla f(x^*)=0$ — ALL partial derivatives
simultaneously zero — solving the resulting system of equations; generalize the single-variable
second-derivative test ($f''>0$ from `math.calc.concavity`) to the multivariable HESSIAN TEST, applying
the 2-variable discriminant shortcut $D=f_{xx}f_{yy}-f_{xy}^2$ (positive definite iff $D>0$ and
$f_{xx}>0$); and distinguish LOCAL from GLOBAL optima, recognizing that a positive-definite Hessian at
a stationary point guarantees only a local minimum.

## Core Understanding
`math.calc.critical-points` found candidates for extrema of $f:\mathbb{R}\to\mathbb{R}$ by solving
the SINGLE equation $f'(x)=0$. For $f:\mathbb{R}^n\to\mathbb{R}$, the direct generalization uses the
gradient vector $\nabla f=(\partial f/\partial x_1,\ldots,\partial f/\partial x_n)$: a point $x^*$ is
a STATIONARY POINT exactly when $\nabla f(x^*)=0$ — meaning EVERY partial derivative vanishes
simultaneously at $x^*$, not just one of them. This is genuinely a SYSTEM of $n$ equations that must
ALL hold at once, reusing `math.calc.critical-points`' own "candidates, not guarantees" caution
directly: a stationary point is never automatically an extremum.

`math.calc.concavity` confirmed a local min at a 1D critical point by checking a single sign,
$f''(c)>0$. The direct multivariable analog replaces the single number $f''(c)$ with the HESSIAN
MATRIX $\nabla^2f(x^*)$ — the matrix of all second partial derivatives — and replaces "positive" with
POSITIVE DEFINITE (informally: the function curves upward in EVERY direction from $x^*$, not just
along the coordinate axes). For a function of two variables, this reduces to a computable
DISCRIMINANT TEST: with $D=f_{xx}f_{yy}-f_{xy}^2$ evaluated at $x^*$, the Hessian is positive definite
(confirming a local min) exactly when $D>0$ AND $f_{xx}>0$; if $D<0$, $x^*$ is a SADDLE POINT
(neither a min nor a max), REGARDLESS of the individual signs of $f_{xx}$ and $f_{yy}$ alone.

Exactly as `math.calc.critical-points` warned that a critical point need not be an extremum at all, a
stationary point with a positive-definite Hessian is confirmed only as a LOCAL minimum — the smallest
value of $f$ in some neighborhood, not necessarily the smallest value overall. A function with many
local minima (a bumpy landscape with several separate valleys) may have a GLOBAL minimum at only one
of them; distinguishing "the local min I found" from "the true global min" generally requires
comparing across all stationary points, or dedicated GLOBAL OPTIMIZATION methods that go beyond
checking $\nabla f=0$ and the Hessian at a single point — a separate, more advanced problem this
concept only names, not solves.

## Mental Models
- **"One equation became a system: $\nabla f(x^*)=0$ means EVERY partial, not just one."**
- **"One sign became a matrix: the discriminant $D=f_{xx}f_{yy}-f_{xy}^2$ replaces $f''(c)>0$."**
- **"Stationary tells you WHERE to look; the Hessian tells you WHAT you find there."**

## Why Students Fail

### MC-1: STATIONARY-POINT-ASSUMED-TO-BE-EXTREMUM
- **Surface form**: believes $\nabla f(x^*)=0$ alone guarantees a local minimum (or maximum), without
  checking the Hessian.
- **Birth type**: Type 1, overgeneralization (independently classified — the Blueprint gives
  Description and Severity but not birth type). This is the direct multivariable analog of
  overgeneralizing that every 1D critical point is automatically an extremum, carried over unchanged
  from the single-variable case to the multivariable one.
- **Repair**: re-walk the matched saddle-point-vs-local-min pair — identical stationary-point
  structure, opposite Hessian outcomes — re-anchoring on "stationary tells you where; the Hessian
  tells you what."

### MC-2: SINGLE-PARTIAL-DERIVATIVE-CHECKED-ALONE
- **Surface form**: treats a point as stationary because ONE partial derivative vanishes there,
  without checking that ALL partial derivatives vanish simultaneously.
- **Birth type**: Type 1, overgeneralization (independently classified). The single-variable habit of
  "set the derivative to zero, solve, done" is overgeneralized into the multivariable case as
  "set one partial to zero, solve, done" — missing that stationarity is a joint condition on ALL
  partials, not a per-partial one.
- **Repair**: re-verify every partial derivative at the specific candidate point in question, showing
  a point where one partial vanishes but another does not is NOT stationary.

### MC-3: HESSIAN-TEST-REDUCED-TO-INDIVIDUAL-SECOND-PARTIALS
- **Surface form**: checks only the individual signs of $f_{xx}$ and $f_{yy}$ (as if each were an
  independent 1D concavity check) instead of the full discriminant $D=f_{xx}f_{yy}-f_{xy}^2$, missing
  that a positive $f_{xx}$ alone does not rule out a saddle point.
- **Birth type**: Type 1, overgeneralization (independently classified). Treating the two-variable
  case as two separate one-variable concavity checks is a direct, but invalid, overgeneralization of
  `math.calc.concavity`'s own single-sign test into a setting where the CROSS term $f_{xy}$ carries
  genuine information the individual second partials alone cannot supply.
- **Repair**: re-compute the FULL discriminant for the specific case in question, showing $f_{xx}>0$
  alone can coexist with $D<0$ (a saddle point).

## Misconceptions

### MC-1: STATIONARY-POINT-ASSUMED-TO-BE-EXTREMUM
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SINGLE-PARTIAL-DERIVATIVE-CHECKED-ALONE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: HESSIAN-TEST-REDUCED-TO-INDIVIDUAL-SECOND-PARTIALS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A ball resting at a stationary point could be sitting in a bowl (local min), on a hilltop (local
  max), or balanced on a saddle-shaped ridge (neither) — the fact that it's not rolling tells you
  it's stationary, not which of the three you're looking at."**
- **Anti-analogy**: a positive-definite Hessian is NOT a promise that the function has no smaller
  value anywhere else — it only promises the smallest value nearby, never globally.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: for $f(x,y)=x^2+y^2-4x-6y+13$, check the candidate point
  $(2,0)$ — $\partial f/\partial x=0$ there, but $\partial f/\partial y=-6\neq0$ — NOT stationary,
  despite one partial vanishing.
- **Demonstration 2 (targets MC-1, MC-3)**: solve $\nabla f=0$ for the same function, finding
  $(2,3)$; compute $D=(2)(2)-0^2=4>0$ with $f_{xx}=2>0$ — confirmed local min.
- **Demonstration 3 (targets MC-1, MC-3)**: for $g(x,y)=x^2-y^2$, find the stationary point $(0,0)$
  — structurally identical to Demonstration 2's $(2,3)$ — but compute $D=(2)(-2)-0^2=-4<0$: a saddle
  point, not a min, despite the identical-looking stationary condition.

## Discovery Questions
1. "If $\partial f/\partial x=0$ at some point, is that point automatically a stationary point?"
2. "If $\nabla f(x^*)=0$, is $x^*$ automatically a local minimum?"
3. "If $f_{xx}>0$ and $f_{yy}>0$ at a stationary point, is that point automatically a local minimum?"

## Teaching Sequence
1. **Anchor**: connect to `math.calc.critical-points`' own single-equation condition, framing
   $\nabla f(x^*)=0$ as its direct multivariable generalization into a system.
2. **Conflict evidence**: the matched saddle-point-vs-local-min pair with identical stationary
   structure but opposite discriminant sign, breaking MC-1 directly.
3. **Contrast pair**: the $(2,0)$ non-stationary-point check against the genuine $(2,3)$ stationary
   point, isolating MC-2.
4. **Mastery gate**: require a correct system solve for stationary points, a correct discriminant
   computation and classification, and a correct local-vs-global argument, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept a candidate as "stationary" without every partial derivative verified zero at that
  exact point.
- When a local minimum is confirmed via the Hessian test, require the learner to state explicitly
  that this guarantees only a LOCAL result, not a global one.

## Voice Teaching Notes
- Say "did you check every partial, or just this one?" whenever a stationary-point claim rests on a
  single partial derivative.
- When a discriminant is computed, ask "does a positive $f_{xx}$ alone already tell you this is a
  min, or do you still need the full discriminant?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly solves $\nabla f=0$ as a system to find all stationary
  points.
- **Rung 2 (application)**: learner correctly computes the discriminant $D$ and classifies a
  stationary point as local min, local max, or saddle.
- **Rung 3 (transfer)**: learner correctly applies both tests in a novel context (e.g. a cost-
  minimization scenario) and explains why confirming a local minimum does not automatically rule out
  a cheaper point elsewhere.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the matched saddle-vs-min pair for the specific case in question.
- If MC-2 recurs, re-verify every partial derivative for the specific candidate point in question.
- If MC-3 recurs, re-compute the full discriminant for the specific case in question.

## Memory Hooks
- "Stationary = every partial vanishes, together."
- "Discriminant $D=f_{xx}f_{yy}-f_{xy}^2$: positive with $f_{xx}>0$ means min; negative means saddle."
- "Local minimum confirmed — global minimum still an open question."

## Transfer Connections
- `math.calc.critical-points` (already authored, this campaign): supplies the 1D stationary-point
  condition and the "candidates, not guarantees" caution this concept generalizes directly.
- `math.calc.concavity` (already authored, this campaign): supplies the 1D second-derivative sign
  test this concept generalizes to the Hessian discriminant test.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.unconstrained-optimization.md`, reused by
  reference for its representation-shift stationary-point and Hessian-test demonstrations, its
  matched-pair conflict-evidence saddle-point contrast, and its three-misconception registry (birth
  types independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a cost-minimization
  scenario applying both the stationary-point and discriminant tests, plus the local-vs-global
  argument).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.calc.critical-
  points`+`math.calc.concavity`, unlocks `math.opt.gradient-methods`+`math.opt.convex-optimization`,
  cross_links none, proficient/apply, mastery_threshold 0.85, estimated_hours 4) was directly verified
  against the live KG and matches exactly. The Blueprint's own P76_mode (independence, since
  cross_links is empty in the KG) is correctly declared and required no correction.

## Version History
- 2026-09-14 (Batch 80): authored. Third entry in the newly-opened `math.opt` domain (unblocked by
  the already-authored `math.calc.critical-points`+`math.calc.concavity`). Companion batch concepts:
  `math.linalg.rank`, `math.opt.convex-set`, `math.opt.convex-function`. `math.opt` moves toward
  **4/16** this batch — closing this batch's math.opt selection (`dynamic-programming` deliberately
  deferred, as a distinct expert-level topic not directly connected to the convex-optimization chain
  the other three concepts share).

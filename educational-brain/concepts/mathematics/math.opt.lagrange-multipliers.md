# math.opt.lagrange-multipliers

## Identity
- **KG id**: `math.opt.lagrange-multipliers`
- **Domain**: math.opt
- **Requires**: `math.calc.partial-derivatives`, `math.opt.unconstrained-optimization`
- **Unlocks**: `math.opt.kkt`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Recognize that `math.opt.unconstrained-optimization`'s own condition $\nabla f(x^*)=0$ is the
SPECIAL CASE of this concept's condition $\nabla f=\lambda\nabla g$ when there is no genuine
constraint; derive the PARALLEL-GRADIENT condition geometrically (at a constrained optimum,
$\nabla f$ can have no component tangent to the constraint curve $g=0$) and solve the system
$\nabla f=\lambda\nabla g,\ g(x)=0$; and apply the method to a genuine applied problem, correctly
interpreting the solved $\lambda$ as the constraint's SHADOW PRICE.

## Core Understanding
`math.opt.unconstrained-optimization` already establishes that, WITHOUT any constraint, a local
optimum requires $\nabla f(x^*)=0$ — the gradient vanishes entirely, since no direction is
restricted. With a constraint $g(x)=0$, movement is restricted to ALONG the constraint curve or
surface, so the optimality condition weakens: $\nabla f$ no longer needs to vanish entirely, only
its component TANGENT to the constraint must vanish. This is exactly captured by
$\nabla f=\lambda\nabla g$: $\nabla f$ is forced to be PARALLEL to $\nabla g$ (the constraint's
normal direction), meaning $\nabla f$ has no tangential component left over. When there is no
constraint (or $\lambda=0$), this reduces directly to `math.opt.unconstrained-optimization`'s own
$\nabla f=0$.

GEOMETRIC DERIVATION: parametrize the constraint curve locally by a tangent direction $\mathbf t$.
Moving a small amount along $\mathbf t$ changes $f$ by approximately $\nabla f\cdot\mathbf t$ (the
directional derivative). If $\nabla f\cdot\mathbf t\ne0$ for SOME tangent direction, moving along
(or against) $\mathbf t$ would strictly IMPROVE $f$ while staying on the constraint — contradicting
optimality. So $\nabla f\cdot\mathbf t=0$ for EVERY tangent direction, meaning $\nabla f$ points
purely in the NORMAL direction — and since $\nabla g$ itself is the constraint's normal direction,
$\nabla f$ must be a scalar multiple of $\nabla g$: $\nabla f=\lambda\nabla g$. Together with
$g(x)=0$ itself, this gives $n+1$ equations for the $n+1$ unknowns $(x_1,\ldots,x_n,\lambda)$.

$\lambda$ carries a genuine interpretation: the constraint's SHADOW PRICE. It measures the RATE OF
CHANGE of the optimal objective value $f(x^*)$ with respect to a small RELAXATION of the
constraint (replacing $g(x)=0$ with $g(x)=c$ for small $c$) — a genuinely useful economic/physical
interpretation, e.g. in a cost-minimization problem subject to a resource constraint, $\lambda$
measures how much the minimum cost would change per unit change in the available resource.

## Mental Models
- **"No constraint: gradient vanishes entirely. With a constraint: gradient is only forbidden from
  pointing along the allowed directions — it can still point along the forbidden (normal) one."**
- **"At the optimum, the objective's level curve is tangent to the constraint curve — you can SEE
  the parallel-gradient condition geometrically."**
- **"$\lambda$ isn't scratch work — it's the price of relaxing the constraint by one unit."**

## Why Students Fail

### MC-1: LAGRANGE-CONDITION-ASSUMED-UNRELATED-TO-UNCONSTRAINED
- **Surface form**: believes the constrained optimality condition $\nabla f=\lambda\nabla g$ is
  completely unrelated to `math.opt.unconstrained-optimization`'s own $\nabla f=0$ condition,
  missing the direct generalization relationship.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity, here
  independently attributed as a failure to recognize a genuine special-case reduction — a new
  method is assumed unrelated to the prior one purely because it looks different on the page). A
  new symbol, $\lambda$, and a visibly different equation are taken as evidence of an entirely
  separate idea, rather than examined for the reduction that occurs when the constraint gradient
  vanishes.
- **Repair**: re-walk the degenerate-constraint reduction explicitly, showing $\nabla f=\lambda
  \nabla g$ collapses to $\nabla f=0$ when $\nabla g=0$.

### MC-2: PARALLEL-GRADIENT-CONDITION-ASSUMED-ARBITRARY
- **Surface form**: believes the parallel-gradient condition is an arbitrary algebraic recipe with
  no deeper geometric meaning, missing its direct tangency interpretation.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared High severity). The
  condition is often taught as "set $\nabla f=\lambda\nabla g$ and solve" without the geometric
  tangency argument being walked explicitly, leaving the equation feeling like a memorized
  procedure rather than a visible geometric fact.
- **Repair**: re-verify the specific solved point geometrically, confirming the level curve of $f$
  is tangent to the constraint curve there.

### MC-3: LAMBDA-ASSUMED-DISPOSABLE
- **Surface form**: believes the solved value of $\lambda$ is a disposable intermediate algebraic
  quantity, missing its genuine shadow-price interpretation.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity).
  $\lambda$ is introduced as a means to an end — solving for $x$ — and once $x$ is found, its own
  further meaning is easy to leave unaddressed, since nothing in the solving PROCESS forces its
  interpretation to be examined.
- **Repair**: re-use the specific solved $\lambda$ to predict the objective change from a small
  constraint relaxation, without re-solving the problem from scratch.

## Misconceptions

### MC-1: LAGRANGE-CONDITION-ASSUMED-UNRELATED-TO-UNCONSTRAINED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: PARALLEL-GRADIENT-CONDITION-ASSUMED-ARBITRARY
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: LAMBDA-ASSUMED-DISPOSABLE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Walking along a fence line looking for the lowest point of the ground beneath you: you're not
  free to walk downhill in every direction — only along the fence — so you stop exactly where the
  ground's own downhill direction points straight through the fence, neither along it nor
  against it."**
- **Anti-analogy**: the parallel-gradient condition is NOT "set the gradient to zero, but with a
  constraint bolted on" — the gradient at a constrained optimum is generally NONZERO; it is only
  required to have no tangential component.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: minimize $f(x,y)=x^2+y^2$ with a trivial constraint
  $g(x,y)=0\cdot x+0\cdot y=0$ (satisfied everywhere); $\nabla f=\lambda(0,0)=(0,0)$ for any
  $\lambda$, forcing $\nabla f=0$ directly — the unconstrained condition recovered exactly.
- **Demonstration 2 (targets MC-2)**: minimize $f(x,y)=x^2+y^2$ subject to $x+y-4=0$; solve
  $2x=\lambda,2y=\lambda\Rightarrow x=y=2,\lambda=4$; verify geometrically that the circle
  $x^2+y^2=8$ is tangent to the line $x+y=4$ at $(2,2)$.
- **Demonstration 3 (targets MC-3)**: minimize cost $f(x,y)=2x^2+3y^2$ subject to $x+y-10=0$;
  solve $\lambda=24,x=6,y=4$, minimum cost $120$; predict that relaxing the constraint to $10.1$
  increases cost by approximately $\lambda\times0.1=2.4$, without re-solving.

## Discovery Questions
1. "Is the constrained optimality condition $\nabla f=\lambda\nabla g$ a completely separate,
   unrelated idea from `math.opt.unconstrained-optimization`'s own $\nabla f=0$ condition, or a
   direct generalization of it?"
2. "Does the parallel-gradient condition have a genuine geometric meaning, or is it simply an
   algebraic recipe with no deeper interpretation?"
3. "Once you've solved for the optimal $(x,y)$, does the specific numerical value of $\lambda$
   carry any further useful meaning, or can it be discarded?"

## Teaching Sequence
1. **Anchor**: connect to `math.opt.unconstrained-optimization`'s own $\nabla f=0$ condition,
   framing the parallel-gradient condition as its direct generalization under a constraint.
2. **Conflict evidence**: the directly-verified geometric tangency at the solved point, breaking
   MC-2 directly.
3. **Contrast pair**: treating $\lambda$ as disposable scratch work against using it to predict a
   cost change, isolating MC-3.
4. **Mastery gate**: require a correct system setup and solve, a correct geometric tangency
   verification, and a correct shadow-price interpretation, at the Blueprint's own stated MAMR of
   5/5.

## Tutor Actions
- Never accept "just set $\nabla f=0$" as the constrained optimality condition — require the
  constraint's own gradient to be incorporated via $\nabla f=\lambda\nabla g$.
- When $\lambda$ is solved for, require the learner to state what it means before moving on.

## Voice Teaching Notes
- Say "is that condition related to the unconstrained one you already know, or something entirely
  new?" whenever the Lagrange condition is treated as unrelated to $\nabla f=0$.
- When $\lambda$ is solved, ask "what does that number actually tell you about the constraint?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly sets up the system $\nabla f=\lambda\nabla g,\
  g(x)=0$ for a given constrained problem.
- **Rung 2 (application)**: learner correctly solves the system for $(x,\lambda)$ and verifies the
  geometric tangency of the result.
- **Rung 3 (transfer)**: learner correctly applies the method to a novel applied problem and
  correctly interprets the solved $\lambda$'s shadow-price meaning.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the specific degenerate-constraint reduction for the case in question.
- If MC-2 recurs, re-verify the specific geometric tangency for the case in question.
- If MC-3 recurs, re-use the specific solved $\lambda$ to predict a constraint-relaxation effect
  for the case in question.

## Memory Hooks
- "No constraint: gradient is zero. With a constraint: gradient is parallel to the constraint's
  own gradient."
- "The level curve is tangent to the constraint at the optimum — you can see it."
- "$\lambda$ is the shadow price: what one more unit of the constraint is worth."

## Transfer Connections
- `math.opt.unconstrained-optimization` (already authored, this campaign): supplies the
  $\nabla f(x^*)=0$ condition this concept's own condition directly generalizes.
- `math.calc.partial-derivatives`: NOT authored as an Educational Brain entry within mathematics's
  own tree at the time of authoring — the gradient-as-vector-of-partials fact is reused
  conceptually per the Blueprint's own citation.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.lagrange-multipliers.md`, reused by
  reference for its representation-shift degenerate-constraint reduction, its conflict-evidence
  geometric-tangency verification, its contrast-pair shadow-price demonstration, and its three-
  misconception registry (birth types independently attributed from the Blueprint's own severity
  and mechanism descriptions, since this Blueprint states severity but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a farmer
  minimizing fencing perimeter subject to a fixed-area constraint, applying the full method and
  interpreting $\lambda$).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.calc.partial-derivatives`+`math.opt.unconstrained-optimization`, unlocks `math.opt.kkt`,
  cross_links none, proficient/apply, mastery_threshold 0.85, estimated_hours 5) was directly
  verified against the live KG and matches exactly. The Blueprint's own correctly-declared
  independence P76 mode (no cross-link target listed in the KG) required no correction.

## Version History
- 2026-09-14 (Batch 81): authored. Third entry this batch, closing the entire batch-start math.opt
  frontier alongside `dynamic-programming`, `gradient-methods`, `convex-optimization`. `math.opt`
  moves toward **7/16** this batch.

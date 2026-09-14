# math.opt.duality

## Identity
- **KG id**: `math.opt.duality`
- **Domain**: math.opt
- **Requires**: `math.opt.convex-optimization`
- **Unlocks**: `math.opt.kkt`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 6

## Learning Objective
Given a primal problem (P): $\min f(x)$ s.t. $g_i(x)\le0,\ h_j(x)=0$, form the LAGRANGIAN
$L(x,\lambda,\nu)=f(x)+\sum\lambda_ig_i(x)+\sum\nu_jh_j(x)$, define the DUAL FUNCTION
$g(\lambda,\nu)=\inf_xL(x,\lambda,\nu)$, establish the WEAK DUALITY inequality
$g(\lambda,\nu)\le p^*$ for all $\lambda\ge0$, identify conditions under which STRONG DUALITY
holds (Slater's condition for convex problems), and interpret the DUALITY GAP.

## Core Understanding
The LAGRANGIAN $L(x,\lambda,\nu)=f(x)+\sum\lambda_ig_i(x)+\sum\nu_jh_j(x)$ relaxes each constraint
into the objective via a MULTIPLIER — $\lambda_i\ge0$ for inequality constraints, $\nu_j$ free for
equality constraints. Taking the infimum over $x$ (with $\lambda,\nu$ fixed) gives the DUAL
FUNCTION $g(\lambda,\nu)$, which is ALWAYS CONCAVE in $(\lambda,\nu)$, regardless of whether the
original primal problem is convex — this is what makes the DUAL PROBLEM, $\max g(\lambda,\nu)$
s.t. $\lambda\ge0$, a genuinely tractable concave maximization even when the primal is not convex.

WEAK DUALITY holds UNIVERSALLY, for ANY problem: $g(\lambda,\nu)\le p^*$ (the primal optimum), for
every $\lambda\ge0$. The proof is direct: for any feasible $x$, $\lambda_ig_i(x)\le0$ (since
$\lambda_i\ge0,g_i(x)\le0$) and $\nu_jh_j(x)=0$, so $L(x,\lambda,\nu)\le f(x)$ — taking the
infimum over $x$ and then over feasible $x$ gives $g(\lambda,\nu)\le p^*$. STRONG DUALITY
($p^*=d^*$, the primal and dual optima coincide) is NOT universal — it requires the primal problem
to be CONVEX (reusing `math.opt.convex-optimization`'s own convexity framework) PLUS SLATER'S
CONDITION: the existence of a STRICTLY feasible point $\tilde x$ where every inequality constraint
holds strictly ($g_i(\tilde x)<0$). Slater's condition concerns ONLY the inequality constraints —
it says nothing about equality constraints or any broader notion of an "interior" feasible region.

The DUALITY GAP $p^*-d^*$ is always $\ge0$ (by weak duality) and equals ZERO exactly under strong
duality. The dual variables $\lambda_i^*$ carry a genuine SHADOW-PRICE interpretation: at strong
duality, $\partial p^*/\partial b_i=-\lambda_i^*$, so $\lambda_i^*$ measures how much the optimal
objective value would improve per unit RELAXATION of constraint $i$. COMPLEMENTARY SLACKNESS links
this to constraint activity: $\lambda_i^*g_i(x^*)=0$ always holds at optimality — an INACTIVE
constraint ($g_i(x^*)<0$, slack) forces $\lambda_i^*=0$ (relaxing it further changes nothing), while
an ACTIVE constraint ($g_i(x^*)=0$, binding) can carry a genuinely positive shadow price.

## Mental Models
- **"Relax the constraints into the objective via multipliers; take the infimum over $x$; maximize
  over the multipliers."**
- **"Weak duality always holds — it's a floor. Strong duality (convex + Slater) makes the floor
  touch the ceiling."**
- **"An inactive constraint has zero shadow price; a binding one can have a genuinely positive
  one."**

## Why Students Fail

### MC-1: DUAL-ALWAYS-EQUALS-PRIMAL-NONCONVEX
- **Surface form**: assumes strong duality holds for any optimization problem, applying it to
  non-convex problems and getting incorrect bounds.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type). Strong
  duality is emphasized heavily for LPs (where it always holds), and the genuine convexity
  requirement for general problems is easy to leave implicit or under-stressed.
- **Repair**: re-derive weak duality's universal validity against strong duality's genuine
  convexity+Slater requirement for the specific non-convex case in question, showing a nonzero
  duality gap can occur.

### MC-2: DUAL-VARIABLES-ARE-JUST-MULTIPLIERS
- **Surface form**: treats Lagrange multipliers as a computation device, not as prices/shadow
  prices; cannot interpret $\lambda_i$ as the rate of change of optimal value with respect to
  constraint tightening.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type). Lagrange
  multipliers are typically introduced first as a SOLVING technique (set up the system, solve for
  $x$), and the further sensitivity-analysis meaning of the solved multiplier value is easy to
  leave unaddressed once $x$ is found.
- **Repair**: re-derive the specific shadow-price interpretation for the case in question by
  perturbing the constraint and confirming the predicted change matches $\lambda_i^*$.

### MC-3: SLATER-MEANS-INTERIOR-POINT-EXISTS
- **Surface form**: believes Slater's condition requires a strictly interior point of the ENTIRE
  feasible set, confusing it with non-degeneracy of the optimal solution.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared birth type). "Interior
  point" sounds like a broad geometric claim about the whole feasible region, when Slater's
  condition genuinely concerns only the INEQUALITY constraints, and can hold even when equality
  constraints pin the feasible set down to a single point.
- **Repair**: re-examine the specific case where an equality constraint forces a single feasible
  point, confirming Slater's condition (checked only against the inequality constraints) can still
  hold there.

## Misconceptions

### MC-1: DUAL-ALWAYS-EQUALS-PRIMAL-NONCONVEX
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: DUAL-VARIABLES-ARE-JUST-MULTIPLIERS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: SLATER-MEANS-INTERIOR-POINT-EXISTS
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The dual problem is a price negotiation: relaxing a constraint by one unit is worth exactly
  $\lambda_i^*$ dollars — some constraints (binding ones) have a real price; others (slack ones)
  are worth nothing more, because you already have more than you need."**
- **Anti-analogy**: weak duality is NOT a promise the dual EQUALS the primal — it is only a
  one-directional bound, $g(\lambda,\nu)\le p^*$, that holds regardless of convexity.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for a non-convex problem, compute a dual lower bound of 3
  against a true primal optimum of 5 — a duality gap of 2, showing strong duality genuinely fails
  without convexity.
- **Demonstration 2 (targets MC-2)**: for $\min x_1+2x_2$ s.t. $x_1+x_2\ge3$, the primal optimum
  is $(3,0)$ with $\lambda_1^*=1$; relaxing to $x_1+x_2\ge2$ moves the optimum to $(2,0)$, a
  decrease of exactly $1=\lambda_1^*$.
- **Demonstration 3 (targets MC-3)**: for $\min f(x)$ s.t. $x\le1,x=-1$, Slater's condition needs
  only $\tilde x<1$ — $\tilde x=-1$ satisfies this — even though $x=-1$ is the ONLY feasible point
  (forced by the equality constraint).

## Discovery Questions
1. "Does strong duality hold for any optimization problem, or only under specific conditions?"
2. "Once you've solved for the dual variable $\lambda_i^*$, does its numerical value carry any
   further meaning about the original problem?"
3. "Does Slater's condition require a strictly interior point of the entire feasible set?"

## Teaching Sequence
1. **Anchor**: connect to `math.opt.convex-optimization`'s own convexity framework, framing
   strong duality's requirement as convexity plus one additional condition (Slater's).
2. **Conflict evidence**: the non-convex duality-gap counterexample, breaking MC-1 directly.
3. **Contrast pair**: an inactive constraint's zero shadow price against an active constraint's
   positive one, isolating the complementary-slackness structure and supporting MC-2's repair.
4. **Mastery gate**: require a correct Lagrangian/dual-function derivation, a correct
   weak/strong-duality distinction, and a correct shadow-price interpretation, at the Blueprint's
   own stated MAMR of 4/5.

## Tutor Actions
- Never accept "strong duality holds" as a default assumption — require convexity AND Slater's
  condition to be checked explicitly.
- When a dual variable is solved, require the learner to state its shadow-price meaning before
  moving on.

## Voice Teaching Notes
- Say "is this problem convex, and does a strictly feasible point exist?" whenever strong duality
  is invoked without justification.
- When a constraint is inactive at the optimum, ask "what does that tell you about its shadow
  price?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly forms the Lagrangian and dual function for a given
  primal problem.
- **Rung 2 (application)**: learner correctly distinguishes weak from strong duality and checks
  Slater's condition for a specific problem.
- **Rung 3 (transfer)**: learner correctly applies Lagrangian duality to a novel structured
  problem (e.g. the soft-margin SVM), deriving the dual and interpreting the dual variables'
  sparsity meaning via complementary slackness.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the weak-vs-strong duality distinction for the specific problem in
  question.
- If MC-2 recurs, re-derive the specific shadow-price interpretation for the case in question.
- If MC-3 recurs, re-examine the specific equality-constrained case in question.

## Memory Hooks
- "Weak duality: always a floor. Strong duality: floor touches ceiling, needs convexity + Slater."
- "Dual variables are prices, not just solving scratch work."
- "Slater's condition is about the inequality constraints only."

## Transfer Connections
- `math.opt.convex-optimization` (already authored, this campaign): supplies the convexity
  framework strong duality's own requirement directly builds on.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.duality.md`, reused by reference for its
  representation-shift Lagrangian/dual-function gallery, its misconception-detector weak/strong
  duality proof, its contrast-pair shadow-price demonstration, and its three-misconception
  registry (birth types EXPLICITLY given by this Blueprint, adopted directly).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (soft-margin SVM
  duality, deriving the dual QP over support-vector weights and interpreting sparsity via
  complementary slackness).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.opt.convex-optimization`, unlocks `math.opt.kkt`, cross_links none, expert/analyze,
  mastery_threshold 0.75, estimated_hours 6) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-14 (Batch 82): authored. First entry this batch, alongside `linear-programming` and
  `newton-optimization` — the entire batch-start math.opt frontier. `math.opt` moves toward
  **10/16** this batch.

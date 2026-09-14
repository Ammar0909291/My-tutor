# math.opt.kkt

## Identity
- **KG id**: `math.opt.kkt`
- **Domain**: math.opt
- **Requires**: `math.opt.duality`, `math.opt.lagrange-multipliers`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Given a constrained optimization problem $\min f(x)$ s.t. $g_i(x)\le0,\ h_j(x)=0$, write all FOUR
KKT CONDITIONS (stationarity, primal feasibility, dual feasibility, complementary slackness —
reusing `math.opt.lagrange-multipliers`' own Lagrangian directly), explain why they are NECESSARY
for any smooth optimum under LICQ but SUFFICIENT only for convex problems (reusing `math.opt.
duality`'s own convexity/Slater framing), apply them to solve a small QP by hand, and identify
which training points in a hard-margin SVM are support vectors using complementary slackness.

## Core Understanding
The KKT CONDITIONS extend `math.opt.lagrange-multipliers`' own equality-constrained parallel-
gradient condition to handle INEQUALITY constraints as well, via four simultaneous requirements at
a candidate point $x^*$: (1) STATIONARITY — $\nabla_xL(x^*,\lambda,\nu)=0$, the Lagrangian's own
gradient vanishes; (2) PRIMAL FEASIBILITY — $g_i(x^*)\le0,\ h_j(x^*)=0$, the point genuinely
satisfies every constraint; (3) DUAL FEASIBILITY — $\lambda_i\ge0$, reusing `math.opt.duality`'s
own sign convention for inequality multipliers directly; (4) COMPLEMENTARY SLACKNESS —
$\lambda_ig_i(x^*)=0$ for every $i$. When there are NO inequality constraints, these reduce
exactly to `math.opt.lagrange-multipliers`' own condition $\nabla f(x^*)+\sum\nu_j\nabla
h_j(x^*)=0$; with no constraints at all, they reduce to `math.opt.unconstrained-optimization`'s
own $\nabla f(x^*)=0$.

KKT conditions are NECESSARY for a local optimum under a CONSTRAINT QUALIFICATION (LICQ: the
active constraint gradients are linearly independent) — but they are NOT automatically SUFFICIENT.
A point satisfying all four conditions could be a local minimum, a local MAXIMUM, or a SADDLE
POINT, exactly as `math.opt.unconstrained-optimization`'s own stationary-point condition alone
never distinguished these cases. KKT is sufficient for GLOBAL optimality ONLY when the problem is
CONVEX — $f$ convex, every $g_i$ convex, every $h_j$ affine — reusing `math.opt.convex-
optimization`'s own convexity requirement directly. Without convexity, EVERY KKT point must be
enumerated and compared, since satisfying the conditions alone does not certify optimality.

COMPLEMENTARY SLACKNESS carries a specific CAUSAL DIRECTION, not a symmetric either-or choice:
$\lambda_ig_i(x^*)=0$ means that if $g_i(x^*)<0$ (the constraint is INACTIVE, with slack), then
$\lambda_i$ MUST equal zero — relaxing an already-slack constraint cannot help, reusing `math.opt.
duality`'s own shadow-price interpretation directly (a zero shadow price for an inactive
constraint). Conversely, if $\lambda_i>0$, the constraint MUST be active ($g_i(x^*)=0$) — the
reverse never holds (an active constraint's multiplier CAN still legitimately be zero in
degenerate cases). In a hard-margin SVM, this identifies SUPPORT VECTORS precisely: training
points with $\alpha_i>0$ sit exactly on the margin and DETERMINE the decision boundary; points
with $\alpha_i=0$ are strictly inside the margin and are IRRELEVANT to the solution — removing them
changes nothing.

## Mental Models
- **"Four conditions, not two — stationarity and feasibility alone are not enough; dual
  feasibility and complementary slackness complete the picture."**
- **"KKT is necessary everywhere (under LICQ); it's sufficient only when the problem is convex."**
- **"An inactive constraint forces its multiplier to zero — the reverse implication never holds."**

## Why Students Fail

### MC-1: KKT-SUFFICIENT-ALWAYS
- **Surface form**: believes the KKT conditions are both necessary AND sufficient for optimality
  for any problem, applying them to non-convex problems and trusting the result as a global
  minimum.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type). KKT is
  frequently introduced simply as "the optimality conditions," with the genuine convexity caveat
  for sufficiency added only later — and easy to miss once the four conditions themselves are
  learned.
- **Repair**: re-examine the specific non-convex case in question, showing a KKT-satisfying point
  that is a local maximum or saddle point, not the global minimum.

### MC-2: COMPLEMENTARY-SLACKNESS-CONFUSION
- **Surface form**: reads $\lambda_ig_i(x^*)=0$ as a symmetric choice — either factor can be zero
  by preference — without seeing the causal direction: an inactive constraint FORCES $\lambda_i=0$,
  and $\lambda_i>0$ FORCES the constraint active.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type). A product
  equaling zero is generally treated as "either factor could be the reason," and that symmetric
  reading is overgeneralized here, missing that the constraint's own status (active or inactive)
  is what determines the multiplier, not the reverse.
- **Repair**: re-verify both directions explicitly for the specific case in question — that an
  inactive constraint's multiplier is genuinely zero, and that a positive multiplier's constraint
  is genuinely active.

### MC-3: DUAL-FEASIBILITY-OPTIONAL
- **Surface form**: omits the dual feasibility condition $\lambda_i\ge0$ when writing KKT,
  thinking KKT is just stationarity plus primal feasibility, not understanding why a negative
  multiplier on an inequality constraint would be geometrically wrong.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type). "Lagrange
  multiplier" is sign-free in the equality-constrained setting (any sign is valid), and that
  sign-freedom is carried over incorrectly to inequality constraints, where the sign requirement
  $\lambda_i\ge0$ is a genuinely new, easy-to-omit condition.
- **Repair**: re-derive the specific geometric contradiction for the case in question — a negative
  $\lambda_i$ would mean the gradient points into infeasibility, not away from it.

## Misconceptions

### MC-1: KKT-SUFFICIENT-ALWAYS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: COMPLEMENTARY-SLACKNESS-CONFUSION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: DUAL-FEASIBILITY-OPTIONAL
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Passing all four KKT checks is like passing a background check for a job — it means nothing
  disqualifying was found, not that you're automatically hired for a role that doesn't exist. Only
  when the 'job' (the problem) is convex does passing the check guarantee you ARE the answer."**
- **Anti-analogy**: complementary slackness is NOT "either the multiplier or the constraint gets
  to be zero, your choice" — the constraint's own active/inactive status determines the
  multiplier's value, never the other way around as a free choice.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: for $\min\frac12x_1^2+\frac12x_2^2-x_1$ s.t. $x_1+x_2\le2$,
  writing all four conditions and testing $\lambda=-\frac12$ (the active-constraint case) shows
  dual feasibility fails; only $\lambda=0$ (inactive) satisfies all four, giving $x^*=(1,0)$.
- **Demonstration 2 (targets MC-1)**: for $f(x)=x^4-2x^2$ (no constraints), stationarity gives
  $x\in\{0,\pm1\}$; $x=0$ satisfies KKT (stationarity) but is a LOCAL MAXIMUM ($f(0)=0>f(\pm1)=-1$)
  — KKT alone does not distinguish it from the genuine minima.
- **Demonstration 3 (targets MC-2)**: in a hard-margin SVM, $\alpha_i>0$ training points satisfy
  $y_i(w^Tx_i+b)=1$ exactly (on the margin, determining $w,b$); $\alpha_i=0$ points satisfy
  $y_i(w^Tx_i+b)\ge1$ strictly (inside the margin, removable without changing the solution).

## Discovery Questions
1. "If a point satisfies all four KKT conditions, is it automatically the global minimum?"
2. "In $\lambda_ig_i(x^*)=0$, can either $\lambda_i$ or $g_i(x^*)$ be zero by free choice, or does
   one force the other?"
3. "Is the dual feasibility condition $\lambda_i\ge0$ optional, or a required part of KKT for
   every inequality constraint?"

## Teaching Sequence
1. **Anchor**: connect to `math.opt.lagrange-multipliers`' own Lagrangian and parallel-gradient
   condition, framing the four KKT conditions as its extension to inequality constraints.
2. **Conflict evidence**: the local-maximum-satisfying-KKT counterexample, breaking MC-1 directly.
3. **Contrast pair**: the equality-multiplier's sign-freedom against the inequality-multiplier's
   required non-negativity, isolating MC-3.
4. **Mastery gate**: require all four conditions written correctly for a novel problem, a correct
   necessity-vs-sufficiency judgment with convexity check, and a correct complementary-slackness-
   based support-vector identification, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept "stationarity plus feasibility" as the complete KKT system — require dual
  feasibility and complementary slackness to be stated explicitly.
- When a KKT point is found for a non-convex problem, require the learner to check convexity
  before claiming global optimality.

## Voice Teaching Notes
- Say "is this problem convex — does satisfying KKT here actually guarantee a global minimum?"
  whenever KKT is treated as automatically sufficient.
- When complementary slackness is applied, ask "does the constraint's status force the multiplier,
  or the multiplier force the constraint's status — which direction is it?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly writes all four KKT conditions for a given
  constrained problem.
- **Rung 2 (application)**: learner correctly solves a small QP by case analysis on complementary
  slackness, verifying all four conditions at the solution.
- **Rung 3 (transfer)**: learner correctly applies complementary slackness to identify support
  vectors in a novel hard-margin SVM setup, and correctly judges whether a found KKT point is
  provably globally optimal based on the problem's convexity.

## Tutor Recovery Strategy
- If MC-1 recurs, re-examine the specific non-convex counterexample for the case in question.
- If MC-2 recurs, re-verify both causal directions of complementary slackness for the case in
  question.
- If MC-3 recurs, re-derive the specific geometric contradiction of a negative multiplier for the
  case in question.

## Memory Hooks
- "Four conditions: stationarity, primal feasibility, dual feasibility, complementary slackness."
- "Necessary under LICQ, always. Sufficient only under convexity."
- "Inactive forces zero multiplier — never the free choice it looks like."

## Transfer Connections
- `math.opt.lagrange-multipliers` (already authored, this campaign): supplies the Lagrangian and
  equality-constrained parallel-gradient condition this concept's four conditions directly extend.
- `math.opt.duality` (already authored, this campaign): supplies the convexity/Slater sufficiency
  framing and the shadow-price interpretation this concept's complementary-slackness discussion
  directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.kkt.md`, reused by reference for its
  representation-shift four-conditions gallery with equality/inequality worked examples, its
  misconception-detector necessity-vs-sufficiency gate, its contrast-pair SVM-support-vector and
  multiplier-sign demonstration, and its three-misconception registry (birth types EXPLICITLY
  given by this Blueprint, adopted directly).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (Fritz John
  conditions generalizing KKT without LICQ, deriving standard KKT as the LICQ special case).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.opt.duality`+
  `math.opt.lagrange-multipliers`, unlocks none, cross_links none, expert/apply, mastery_threshold
  0.8, estimated_hours 5) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-14 (Batch 83): authored. Second and final entry this batch, alongside
  `integer-programming` — closing the ENTIRE batch-start math.opt frontier with none deferred.
  `math.opt` moves from 10/16 to **12/16** this batch.

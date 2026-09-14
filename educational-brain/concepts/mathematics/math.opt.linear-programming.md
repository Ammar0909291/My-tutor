# math.opt.linear-programming

## Identity
- **KG id**: `math.opt.linear-programming`
- **Domain**: math.opt
- **Requires**: `math.opt.convex-optimization`, `math.linalg.linear-system`
- **Unlocks**: `math.opt.duality`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 7

## Learning Objective
Given a linear program in standard form ($\min c^Tx$ s.t. $Ax=b,\ x\ge0$), identify the FEASIBLE
POLYTOPE, state that the optimal solution occurs at a VERTEX (basic feasible solution), execute
two iterations of the SIMPLEX METHOD (pivot selection and basis update, reusing `math.linalg.
linear-system`'s own system-solving machinery at each pivot), formulate the DUAL LP and apply LP
duality (weak and strong duality, complementary slackness), and select between simplex and
interior-point methods by problem structure.

## Core Understanding
An LP's objective is LINEAR — it has no curvature — so moving in the direction $-c$ from an
INTERIOR point of the feasible polytope always decreases the objective while remaining feasible
(for a small enough step). This means the interior can NEVER be optimal: the EXTREME POINT
THEOREM guarantees that if a finite optimum exists, at least one optimal solution occurs at a
VERTEX of the feasible polytope (a basic feasible solution — $n-m$ variables at zero, $m$
non-zero). This directly extends `math.opt.convex-optimization`'s own convex-feasible-set
framework to the special linear case, where optimality concentrates at the polytope's corners
rather than anywhere along its boundary.

The SIMPLEX METHOD walks vertex-to-vertex along the polytope's edges, reusing `math.linalg.
linear-system`'s own linear-system-solving machinery at every pivot: starting from an initial
basic feasible solution, it selects an ENTERING variable (the most negative reduced cost),
performs a MINIMUM RATIO TEST to find the LEAVING variable (the tightest constraint, preventing
any basic variable from going negative), and pivots to a new basis — repeating until no reduced
cost is negative, confirming optimality.

LP DUALITY specializes `math.opt.convex-optimization`'s own general optimality framework: for
primal (P) $\min c^Tx$ s.t. $Ax\ge b,x\ge0$, the dual (D) is $\max b^Ty$ s.t. $A^Ty\le c,y\ge0$.
WEAK DUALITY ($c^Tx\ge b^Ty$ for any feasible pair) always holds; STRONG DUALITY (equal optimal
values) holds WHENEVER the primal has a finite optimum — unlike the general convex case, LP
strong duality needs no additional Slater-type condition. COMPLEMENTARY SLACKNESS certifies
optimality: $x^*,y^*$ are optimal iff every constraint-variable pair has at least one member zero.

SIMPLEX has EXPONENTIAL worst-case complexity (the Klee-Minty construction), but this is a
pathological case, not typical behavior — empirically simplex runs in roughly $O(m)$ to $O(2m)$
pivots for $m$ constraints. INTERIOR-POINT methods have polynomial worst-case complexity
($O(n^{3.5})$) and traverse the polytope's interior rather than its edges, but cannot warm-start
from a previous solution the way simplex can — the choice between them depends on problem
structure (sparse/warm-started favors simplex; large dense favors interior-point).

## Mental Models
- **"A linear objective has no curvature — the interior can never be the answer; the answer
  always sits at a corner."**
- **"Simplex walks corner to corner. Interior-point cuts through the middle."**
- **"Worst-case is not typical case — simplex's exponential worst case is pathological, not
  practical."**

## Why Students Fail

### MC-1: OPTIMAL-INTERIOR-LP
- **Surface form**: believes the LP optimum can occur in the interior of the feasible polytope,
  not knowing the extreme-point (vertex) theorem.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared birth type). Smooth
  (curved) optimization problems genuinely can have interior optima, and that visual expectation
  carries over to LPs, which superficially look similar (a feasible region, an objective to
  minimize) despite the objective's linearity ruling out an interior optimum entirely.
- **Repair**: re-verify the specific candidate interior point can always be improved by moving in
  direction $-c$ while staying feasible, confirming it cannot be optimal.

### MC-2: DUAL-ALWAYS-EQUALS-PRIMAL
- **Surface form**: applies strong duality unconditionally, without checking whether both primal
  and dual are feasible (strong duality fails if the primal is infeasible or unbounded).
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type). "LP duality"
  is often taught as simply "strong duality holds," with the feasibility caveats for infeasible or
  unbounded cases introduced only later, if at all.
- **Repair**: re-examine the specific infeasible or unbounded case in question, confirming strong
  duality's equal-optimal-values claim does not apply when one side lacks a finite optimum.

### MC-3: SIMPLEX-EXPONENTIAL-IN-PRACTICE
- **Surface form**: dismisses simplex as exponential-time and therefore impractical, not knowing
  that simplex runs in polynomial expected time and dominates interior-point for sparse/warm-
  started problems.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type). "Worst-case
  exponential" and "typical exponential" are conflated because courses emphasize the theoretical
  worst case (the Klee-Minty pathological construction) far more than simplex's genuine practical
  performance.
- **Repair**: re-examine the specific pivot count for the case in question against the worst-case
  bound, confirming the actual number of pivots is far smaller.

## Misconceptions

### MC-1: OPTIMAL-INTERIOR-LP
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

### MC-2: DUAL-ALWAYS-EQUALS-PRIMAL
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: SIMPLEX-EXPONENTIAL-IN-PRACTICE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Sliding a straightedge (the objective's contour line) across a polygon (the feasible region)
  from outside: it always touches down FIRST at a corner, never somewhere along a flat interior —
  because a straight line has nowhere to 'curve into.'"**
- **Anti-analogy**: LP duality is NOT unconditional — strong duality needs BOTH sides to have a
  finite optimum; an infeasible or unbounded primal breaks the equal-optimal-values guarantee.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for the 2D polytope with vertices $(0,0),(3,0),(3,1),(1,3),
  (0,3)$ and objective $-x_1-2x_2$, evaluate all 5 vertices — the optimum $(1,3)$, value $-7$,
  occurs at a vertex, never at an interior point.
- **Demonstration 2 (targets MC-2)**: two full simplex iterations on the same 2D LP — iteration 1
  pivots $x_2$ into the basis (objective $0\to-6$); iteration 2 pivots $x_1$ in (objective
  $-6\to-7$); all reduced costs $\ge0$, confirming optimality.
- **Demonstration 3 (targets MC-3)**: at the solved optimum $(1,3)$, verify complementary
  slackness against the dual solution, confirming primal value $=$ dual value $=7$ (sign
  convention noted).

## Discovery Questions
1. "Can the optimal solution of an LP occur strictly inside the feasible polytope, not on its
   boundary?"
2. "If a primal LP is unbounded below, does its dual automatically have an equal, finite optimal
   value?"
3. "Is simplex's exponential worst-case complexity typical of its actual performance in practice?"

## Teaching Sequence
1. **Anchor**: connect to `math.opt.convex-optimization`'s own convex-feasible-set framework and
   `math.linalg.linear-system`'s own system-solving machinery, framing simplex's pivots as
   repeated system solves.
2. **Conflict evidence**: the ratio-test-prevents-infeasibility demonstration and the infeasible/
   unbounded duality caveat, breaking MC-2 directly.
3. **Contrast pair**: simplex versus interior-point methods, isolating when each is preferred and
   supporting MC-3's repair.
4. **Mastery gate**: require a correct standard-form conversion and simplex pivot execution, a
   correct dual formulation with complementary-slackness verification, and a correct algorithm-
   choice justification, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept an "optimal" claim for an interior point — require the vertex to be identified
  explicitly.
- When strong duality is invoked, require the learner to confirm both the primal and dual are
  feasible with a finite optimum first.

## Voice Teaching Notes
- Say "is that point a vertex of the polytope, or somewhere in the interior?" whenever an interior
  point is claimed optimal.
- When simplex's complexity comes up, ask "is that the worst case, or what actually happens on
  this problem?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the vertices of a given feasible polytope
  and evaluates the objective at each.
- **Rung 2 (application)**: learner correctly executes simplex pivots (entering variable, minimum
  ratio test, leaving variable) to reach the optimal vertex.
- **Rung 3 (transfer)**: learner correctly writes the dual of a novel structured LP (e.g. a
  network-flow max-flow LP) and applies strong duality to prove a combinatorial theorem (max-flow
  min-cut).

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the specific interior point can be improved for the case in question.
- If MC-2 recurs, re-examine the specific infeasible/unbounded case in question.
- If MC-3 recurs, re-count the specific pivot sequence's actual length against the worst-case
  bound for the problem in question.

## Memory Hooks
- "Linear objective, no curvature — the answer is always at a corner."
- "Strong duality for LPs needs a finite optimum on both sides, not just convexity."
- "Worst-case exponential is pathological, not typical."

## Transfer Connections
- `math.opt.convex-optimization` (already authored, this campaign): supplies the convex-feasible-
  set framework the extreme-point theorem specializes for the linear case.
- `math.linalg.linear-system`: NOT authored as an Educational Brain entry within mathematics's own
  tree at the time of authoring — the system-solving machinery each simplex pivot reuses is
  referenced conceptually per the Blueprint's own citation.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.linear-programming.md`, reused by
  reference for its representation-shift standard-form/extreme-point-theorem gallery, its
  pattern-induction two-iteration simplex walkthrough, its contrast-pair duality demonstration,
  its second representation-shift simplex-vs-interior-point comparison, and its three-
  misconception registry (birth types EXPLICITLY given by this Blueprint, adopted directly).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (the max-flow
  LP's dual, proving the max-flow min-cut theorem via LP duality).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG `unlocks` discrepancy found**: the Blueprint's Component 0 states
  "unlocks: math.opt.quadratic-programming, math.opt.integer-programming" — but the live KG lists
  only `unlocks: ['math.opt.duality']`. Resolved toward the KG per standing policy, not fixed in
  the KG or Blueprint file. Recorded as a standing forward note: the Blueprint's own algorithm-
  comparison content (Component 5, A04) genuinely anticipates `math.opt.quadratic-programming` and
  `math.opt.integer-programming` as forward relationships, but the KG's own `unlocks` field does
  not currently reflect this.
- All other metadata fields (requires `math.opt.convex-optimization`+`math.linalg.linear-system`,
  cross_links none, expert/apply, mastery_threshold 0.8, estimated_hours 7) verified against the
  live KG and match exactly.

## Version History
- 2026-09-14 (Batch 82): authored. Second entry this batch, alongside `duality` and
  `newton-optimization` — the entire batch-start math.opt frontier. `math.opt` moves toward
  **10/16** this batch.

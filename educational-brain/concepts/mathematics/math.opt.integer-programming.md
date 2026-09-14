# math.opt.integer-programming

## Identity
- **KG id**: `math.opt.integer-programming`
- **Domain**: math.opt
- **Requires**: `math.opt.linear-programming`
- **Unlocks**: none
- **Cross-links**: `math.disc.complexity-classes`
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 7

## Learning Objective
Given an integer program $\min c^Tx$ s.t. $Ax\le b,\ x\in\mathbb Z^n$, distinguish ILP/MIP/BIP,
explain why integrality DESTROYS CONVEXITY (a discrete feasible set), solve a 2-variable ILP via
LP RELAXATION followed by BRANCH-AND-BOUND (reusing `math.opt.linear-programming`'s own simplex
machinery at every node), explain the INTEGRALITY GAP and when it is zero (total unimodularity),
and situate ILP's NP-hardness within `math.disc.complexity-classes`' own framework via the 3-SAT
reduction.

## Core Understanding
An INTEGER PROGRAM adds the requirement $x\in\mathbb Z^n$ to an otherwise ordinary linear program.
This single addition DESTROYS CONVEXITY: the feasible set becomes a discrete lattice of points
rather than a continuous polytope, so `math.opt.linear-programming`'s own extreme-point theorem no
longer directly applies. The LP RELAXATION (dropping the integrality requirement) gives a BOUND on
the true IP optimum, not the IP solution itself — ROUNDING the LP-relaxation solution to the
nearest integer can violate constraints entirely, or produce a feasible point arbitrarily far from
optimal; it is never a valid substitute for exact optimization.

BRANCH-AND-BOUND (B&B) solves the ILP exactly by building a tree of LP relaxations: at each node,
solve the LP relaxation (reusing `math.opt.linear-programming`'s own simplex machinery directly);
if the solution is already integer, it is a candidate; if fractional on some variable $x_j=f$,
BRANCH into two children ($x_j\le\lfloor f\rfloor$ and $x_j\ge\lceil f\rceil$). Critically, B&B is
NOT brute-force enumeration of $2^n$ points: the LP bound at each node PRUNES entire subtrees
whenever that bound cannot beat the current best integer solution (the incumbent) — a node need
not even be fully solved once pruned. Worst-case complexity IS exponential (confirming ILP's
NP-hardness), but typical performance on structured problems explores far fewer nodes.

The INTEGRALITY GAP (LP optimum minus IP optimum) is ZERO exactly when the constraint matrix $A$
is TOTALLY UNIMODULAR (TU — every square submatrix has determinant in $\{-1,0,1\}$): network-flow
and bipartite-matching problems have this property structurally, so their LP relaxation always
already gives the integer answer. General ILPs (knapsack, TSP, 0/1 programs) have NO such
structural shortcut, and the gap can be large. ILP is NP-HARD in general — the 3-SAT REDUCTION
(reusing `math.disc.complexity-classes`' own NP-completeness framework directly) encodes each
clause as a linear inequality over binary variables, proving 0/1 ILP is NP-complete. This
worst-case theoretical result COEXISTS with practical solvability: modern solvers combine
branch-and-bound with CUTTING PLANES (valid inequalities that tighten the LP relaxation without
removing any integer-feasible point) into BRANCH-AND-CUT, routinely solving million-variable
instances despite the theoretical worst case.

## Mental Models
- **"Integrality turns a smooth polytope into a discrete lattice — convexity, and the vertex
  theorem, break."**
- **"B&B isn't brute force — the LP bound prunes whole subtrees before they're even explored."**
- **"Zero integrality gap is the EXCEPTION (total unimodularity), not the rule."**

## Why Students Fail

### MC-1: IP-IS-JUST-LP-WITH-ROUNDING
- **Surface form**: solves the LP relaxation and rounds the fractional solution to the nearest
  integer, believing this gives an optimal or near-optimal IP solution, not knowing rounding can
  violate constraints or give solutions arbitrarily far from optimal.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type). Rounding
  genuinely works for some special cases (e.g. network flows, where TU already gives an integer
  LP solution), and that special-case success is overgeneralized to every ILP.
- **Repair**: re-run the specific rounding failure for the case in question, showing either a
  violated constraint or a solution far below the true IP optimum.

### MC-2: BRANCH-AND-BOUND-IS-BRUTE-FORCE
- **Surface form**: equates branch-and-bound with exhaustive enumeration of all integer points,
  not seeing that LP relaxation bounds prune large subtrees, making B&B far more efficient than
  $2^n$ enumeration in practice.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type). "Branch"
  sounds like branching over all possibilities exhaustively, and the "bound" half of the name — the
  part that actually does the pruning — is easy to miss entirely.
- **Repair**: re-verify the specific pruned node in question was discarded WITHOUT being fully
  solved, because its LP bound alone already ruled it out.

### MC-3: LP-RELAXATION-ALWAYS-TIGHT
- **Surface form**: assumes the LP relaxation optimal value equals the IP optimal value, or that
  the LP optimal solution is always integer or near-integer, not knowing the integrality gap can
  be arbitrarily large.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type). Network-flow
  LPs are frequently introduced early and always have integer optima due to total unimodularity,
  and that special structural property is over-generalized to all IPs without the TU check being
  carried along.
- **Repair**: re-verify total unimodularity (or its absence) for the specific constraint matrix in
  question, connecting the TU check directly to whether a nonzero gap should be expected.

## Misconceptions

### MC-1: IP-IS-JUST-LP-WITH-ROUNDING
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: BRANCH-AND-BOUND-IS-BRUTE-FORCE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: LP-RELAXATION-ALWAYS-TIGHT
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A continuous polytope is a smooth countryside; an integer lattice is a grid of houses on it —
  the smooth optimum can land in an empty field between houses, and the nearest house isn't
  necessarily a good substitute."**
- **Anti-analogy**: branch-and-bound is NOT "check every possible combination" — a bound computed
  at a single node can eliminate an entire unexplored subtree in one step.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $\max x_1+x_2$ s.t. $2x_1+2x_2\le3,\ x_1,x_2\in\mathbb
  Z_{\ge0}$, the LP relaxation gives $x_1=x_2=3/4$ (obj 1.5); rounding up $(1,1)$ is infeasible
  ($2+2=4>3$); rounding down $(0,0)$ gives obj 0, while the true IP optimum is 1 at $(1,0)$ or
  $(0,1)$.
- **Demonstration 2 (targets MC-2)**: for $\max x_1+x_2$ s.t. $x_1+x_2\le3.7,x_1\le2.5,x_2\le2.5$,
  the branch-and-bound tree explores exactly 5 nodes to reach the optimum 3, with one branch
  pruned immediately as infeasible without solving a fresh LP.
- **Demonstration 3 (targets MC-3)**: for $\max x_1+x_2$ s.t. $x_1+x_2\le1.5,x_1\le1,x_2\le1,x_1,
  x_2\in\mathbb Z$, the LP optimum is 1.5 but the IP optimum is 1 — an integrality gap of 0.5,
  since the constraint matrix here is not TU.

## Discovery Questions
1. "If you solve the LP relaxation and round the answer to the nearest integer, is that guaranteed
   to give the optimal (or even a feasible) integer solution?"
2. "Does branch-and-bound examine every one of the $2^n$ possible integer combinations?"
3. "Is the LP relaxation's optimal value always equal to — or very close to — the true integer
   program's optimal value?"

## Teaching Sequence
1. **Anchor**: connect to `math.opt.linear-programming`'s own simplex and extreme-point framework,
   framing the LP relaxation as reusing that machinery directly at every branch-and-bound node.
2. **Conflict evidence**: the rounding-fails counterexample, breaking MC-1 directly.
3. **Contrast pair**: total-unimodular (zero-gap) problem classes against general ILPs with no
   structural shortcut, isolating MC-3.
4. **Mastery gate**: require a correct branch-and-bound tree execution, a correct integrality-gap
   computation with a TU justification, and a correct 3-SAT-reduction argument for NP-hardness, at
   the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a rounded LP solution as the IP answer without verifying feasibility and comparing
  against the true IP optimum.
- When a branch-and-bound node is pruned, require the learner to state the specific bound
  comparison that justified skipping it.

## Voice Teaching Notes
- Say "does rounding that solution actually stay feasible?" whenever a rounded LP answer is
  proposed as the IP solution.
- When a B&B node is discarded, ask "was that node fully solved, or pruned by its bound alone?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies why a rounded LP-relaxation solution can
  be infeasible or far from optimal for a given ILP.
- **Rung 2 (application)**: learner correctly executes a branch-and-bound tree (branching,
  pruning, incumbent tracking) to solve a small ILP exactly.
- **Rung 3 (transfer)**: learner correctly constructs the 3-SAT-to-0/1-ILP reduction, using
  `math.disc.complexity-classes`' own NP-completeness framework, and reconciles the worst-case
  NP-hardness result with the practical tractability of modern branch-and-cut solvers.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the specific rounding failure for the problem in question.
- If MC-2 recurs, re-verify the specific pruned node's bound-based justification for the problem
  in question.
- If MC-3 recurs, re-check total unimodularity for the specific constraint matrix in question.

## Memory Hooks
- "Rounding is a heuristic, never a substitute for solving the ILP."
- "The bound prunes the tree — B&B isn't brute force."
- "Zero gap needs total unimodularity — it's the exception, not the rule."

## Transfer Connections
- `math.opt.linear-programming` (already authored, this campaign): supplies the simplex machinery
  and extreme-point framework the LP relaxation at every branch-and-bound node reuses directly.
- `math.disc.complexity-classes` (already authored, standalone campaign): supplies the NP/NP-
  complete framework and the polynomial-time-verifier concept this concept's 3-SAT reduction
  argument directly applies.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.integer-programming.md`, reused by
  reference for its representation-shift ILP/MIP/BIP gallery and rounding counterexample, its
  pattern-induction total-unimodularity/integrality-gap gallery, its misconception-detector
  branch-and-bound worked tree, its contrast-pair branch-and-bound-vs-cutting-planes comparison,
  and its three-misconception registry (birth types EXPLICITLY given by this Blueprint, adopted
  directly).
- Transfer probe cited by reference: the Blueprint's own cross-link-mode probe against
  `math.disc.complexity-classes` (confirmed genuinely authored via `ls`), constructing the 3-SAT-
  to-0/1-ILP reduction and reconciling NP-hardness with practical solvability.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.opt.linear-
  programming`, unlocks none, cross_links `math.disc.complexity-classes`, expert/analyze,
  mastery_threshold 0.7, estimated_hours 7) was directly verified against the live KG and matches
  exactly. The Blueprint's own cross-link P76 mode against `math.disc.complexity-classes` is
  confirmed genuinely valid — that concept IS authored (Batch 70 of this campaign) — required no
  correction.

## Version History
- 2026-09-14 (Batch 83): authored. First entry this batch, alongside `kkt` — the entire
  batch-start math.opt frontier. `math.opt` moves toward **12/16** this batch.

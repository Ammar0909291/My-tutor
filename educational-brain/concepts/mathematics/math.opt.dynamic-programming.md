# math.opt.dynamic-programming

## Identity
- **KG id**: `math.opt.dynamic-programming`
- **Domain**: math.opt
- **Requires**: `math.disc.recurrence-relation`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 6

## Learning Objective
Given an optimization problem, identify whether it has OVERLAPPING SUBPROBLEMS and OPTIMAL
SUBSTRUCTURE, formulate a BELLMAN RECURRENCE (reusing `math.disc.recurrence-relation`'s own
recurrence framework directly), select a top-down (memoization) or bottom-up (tabulation)
implementation strategy, and apply the method to canonical problems (longest common subsequence,
0/1 knapsack, shortest path with stages).

## Core Understanding
Dynamic programming (DP) converts an EXPONENTIAL naive recursion into a POLYNOMIAL-time algorithm
by exploiting two properties simultaneously: OVERLAPPING SUBPROBLEMS (the same smaller subproblem
recurs many times across the recursion tree) and OPTIMAL SUBSTRUCTURE (an optimal solution to the
whole problem is built from optimal solutions to its subproblems). DP is NOT a separate technique
from recursion — it is recursion PLUS CACHING: a naive recursive solution recomputes the same
subproblem exponentially many times; adding a cache (MEMOIZATION, top-down) or filling a table in
dependency order (TABULATION, bottom-up) computes each distinct subproblem exactly ONCE.

GREEDY heuristics, by contrast, commit irrevocably to a locally-best choice at each step. Greedy
gives the OPTIMAL answer only for problems where a locally best choice can never be improved upon
later (e.g. fractional knapsack, activity selection) — it FAILS when subproblems genuinely
overlap and an early commitment can foreclose a better later combination (e.g. 0/1 knapsack, where
taking an item now changes what fits later).

Every DP table has a DEPENDENCY DAG: cell $X$ depends on specific other cells $Y_1,Y_2,\ldots$
that must be computed BEFORE $X$. The fill order must respect a TOPOLOGICAL ORDER of this DAG —
row-by-row happens to work for problems like Longest Common Subsequence (LCS), where each cell
depends only on its immediate up/left/diagonal neighbors, but is NOT a universal rule; problems
like Matrix Chain Multiplication require filling by increasing CHAIN LENGTH instead, since the
dependency structure is genuinely different.

## Mental Models
- **"DP = recursion + a cache. The exponential blowup disappears once each subproblem is computed
  exactly once."**
- **"Greedy commits and never looks back. DP tries every combination implicitly, via the table."**
- **"Every cell in the table has a dependency DAG — fill order must respect it, not just habit."**

## Why Students Fail

### MC-1: DP-IS-JUST-RECURSION
- **Surface form**: implements a naive recursive solution without memoization and calls it DP;
  confuses the technique with the pattern of plain recursion.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type). DP genuinely
  IS recursion plus memory, but plain recursion is typically presented and practiced first, and the
  caching step — the part that actually makes it DP — is easy to treat as optional or cosmetic
  rather than the defining mechanism.
- **Repair**: re-trace the naive-recursion call count explicitly, showing exponential
  recomputation, then re-trace the identical recursion WITH a cache, showing each subproblem
  computed exactly once.

### MC-2: GREEDY-ALWAYS-WORKS
- **Surface form**: applies a greedy heuristic to problems with overlapping subproblems (e.g.
  fractional-knapsack-style ratio logic applied to 0/1 knapsack) and gets a wrong answer.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type). Greedy
  genuinely IS correct for fractional knapsack and activity selection, and that correctness is
  overgeneralized to every superficially similar optimization problem, missing that 0/1 knapsack's
  discrete (take-it-or-leave-it) choices genuinely break the greedy guarantee.
- **Repair**: re-run the specific 0/1 knapsack counterexample, showing greedy's locally-best
  choices produce a strictly worse total than DP's table-based search.

### MC-3: SUBPROBLEM-ORDER-ARBITRARY
- **Surface form**: fills the DP table in an incorrect order (e.g. computing cell $(i,j)$ before
  $(i-1,j)$ or $(i,j-1)$ are available), not respecting the dependency DAG.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared birth type). A table
  visually looks like a uniform grid, and filling it in some visually natural order (e.g.
  column-by-column) feels equally valid to row-by-row — but the actual dependency structure varies
  by problem and must be checked, not assumed from the table's shape.
- **Repair**: re-draw the specific table's dependency arrows explicitly, identifying which cells
  must be filled before the cell in question, and re-verify the chosen fill order respects them.

## Misconceptions

### MC-1: DP-IS-JUST-RECURSION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: GREEDY-ALWAYS-WORKS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: SUBPROBLEM-ORDER-ARBITRARY
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A student solving the same homework problem over and over from scratch every time it appears
  in a later problem, versus writing the answer down once and looking it up — same correct
  answers, vastly different amounts of work."**
- **Anti-analogy**: DP is NOT "try the greedy choice and hope it works out" — it is a systematic
  search over ALL combinations, implicitly performed by filling the table, never a single
  committed path.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: trace naive recursive Fibonacci $F(5)$, counting that $F(2)$
  is recomputed 3 times and $F(1)$ 5 times; re-trace with a cache, showing each $F(k)$ computed
  exactly once.
- **Demonstration 2 (targets MC-2)**: for the 0/1 knapsack instance with capacity $W=5$ and items
  $(w{=}3,v{=}4),(w{=}2,v{=}3),(w{=}2,v{=}3)$, compute greedy's answer (value 6) against the DP
  table's answer (value 7, items 1+3) — greedy is strictly worse.
- **Demonstration 3 (targets MC-3)**: fill the 4×4 LCS table for "ABCB" vs. "BCAB" column-by-column
  starting at column 1, showing cell $(1,1)$ needs $(0,1)$ which is not yet available — the fill
  order fails; re-fill row-by-row, showing every dependency is satisfied in time.

## Discovery Questions
1. "Is dynamic programming the same thing as recursion, or does it add something recursion alone
   doesn't have?"
2. "If a greedy heuristic works for fractional knapsack, will it also give the correct answer for
   0/1 knapsack?"
3. "Can a DP table be filled in any order, as long as every cell eventually gets a value?"

## Teaching Sequence
1. **Anchor**: connect to `math.disc.recurrence-relation`'s own recurrence framework, framing the
   Bellman recurrence as a direct application with an added optimization objective.
2. **Conflict evidence**: the greedy-vs-DP 0/1 knapsack counterexample, breaking MC-2 directly.
3. **Contrast pair**: memoization (top-down, lazy) against tabulation (bottom-up, full table),
   isolating the fill-order requirement and breaking MC-3.
4. **Mastery gate**: require a correct Bellman recurrence formulation, a correct overlapping-
   subproblems/optimal-substructure justification, and a correct dependency-respecting fill order
   in a novel problem, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a recursive solution as "DP" without an explicit cache or table — require the
  caching mechanism to be named and shown.
- When a greedy approach is proposed for an optimization problem, require the learner to verify
  whether choices can be revised later before accepting the greedy answer as correct.

## Voice Teaching Notes
- Say "is that solution caching anything, or just recursing?" whenever a recursive solution is
  labeled DP without a visible cache.
- When a DP table is being filled, ask "which cells does this one depend on — are they filled
  yet?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies whether a given problem has overlapping
  subproblems and optimal substructure.
- **Rung 2 (application)**: learner correctly formulates a Bellman recurrence and fills a DP table
  in a dependency-respecting order for a canonical problem (LCS, 0/1 knapsack).
- **Rung 3 (transfer)**: learner correctly designs a novel Bellman recurrence and identifies the
  correct (non-row-by-row) fill order for a problem with a different dependency structure (e.g.
  Matrix Chain Multiplication).

## Tutor Recovery Strategy
- If MC-1 recurs, re-trace the specific recursive call count with and without caching for the case
  in question.
- If MC-2 recurs, re-run the specific greedy-vs-DP counterexample for the case in question.
- If MC-3 recurs, re-draw the specific table's dependency arrows for the case in question.

## Memory Hooks
- "DP = recursion + memory."
- "Greedy commits; DP tries everything, via the table."
- "Check the dependency DAG before choosing a fill order."

## Transfer Connections
- `math.disc.recurrence-relation` (already authored, standalone campaign): supplies the recurrence
  framework the Bellman recurrence directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.dynamic-programming.md`, reused by
  reference for its representation-shift memoization/tabulation gallery, its diagnostic
  greedy-vs-DP contrast, its contrast-pair top-down/bottom-up comparison, and its three-
  misconception registry (birth types EXPLICITLY given by this Blueprint, adopted directly).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (the Matrix Chain
  Multiplication problem, requiring a non-row-by-row, chain-length-based fill order).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.disc.recurrence-relation`, unlocks none, cross_links none, expert/apply, mastery_threshold
  0.8, estimated_hours 6) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-14 (Batch 81): authored. First entry in this batch, closing the entire batch-start
  math.opt frontier alongside `convex-optimization`, `gradient-methods`, `lagrange-multipliers`.
  `math.opt` moves toward **7/16** this batch.

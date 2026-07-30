# Blueprint: math.opt.dynamic-programming

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.dynamic-programming |
| name | Dynamic Programming |
| Domain | math.opt |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 6 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.disc.recurrence-relation |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given an optimization problem, the student identifies whether it has overlapping subproblems and optimal substructure, formulates a Bellman recurrence, selects a top-down (memoization) or bottom-up (tabulation) implementation strategy, and applies the method to canonical problems (longest common subsequence, 0/1 knapsack, shortest path with stages).

## Component 2 — CPA Entry Stage
**C — Concrete** (tables of subproblem values; explicit dag of subproblem dependencies; trace through small instances)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | DP-IS-JUST-RECURSION | Student implements a naive recursive solution without memoization and calls it DP; confuses the technique with the pattern of recursion | Type 5 — instruction-induced (DP IS recursion + memory, but recursion alone is presented first) |
| MC-2 | GREEDY-ALWAYS-WORKS | Student applies a greedy heuristic to problems with overlapping subproblems (e.g., fractional-knapsack logic to 0/1 knapsack) and gets wrong answers | Type 1 — overgeneralization (greedy works for activity selection and fractional knapsack; overapplied) |
| MC-3 | SUBPROBLEM-ORDER-ARBITRARY | Student fills the DP table in an incorrect order (computing cell (i,j) before (i−1,j) or (i,j−1) are available); does not respect dependency DAG | Type 2 — perceptual intuition (table looks like a grid; row-by-row seems natural but dependencies vary) |

## Component 4 — Session TA Cap
**Cap = 8** (hrs = 6 → cap 8)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of dynamic programming:**

| Representation | Fibonacci instance |
|---|---|
| Naive recursion (exponential) | F(n)=F(n−1)+F(n−2); recomputes F(2) exponentially many times |
| Memoization (top-down) | Compute F(n) recursively; cache F(k) on first evaluation; O(n) time |
| Tabulation (bottom-up) | Fill array F[0..n] left-to-right; F[k]=F[k−1]+F[k−2]; O(n) |
| Recurrence + optimal substructure | OPT(n)=OPT(n−1)+OPT(n−2); solution to sub-problem of size n depends only on optimal solutions to size n−1 and n−2 |

**Concrete subproblem table for LCS ("ABCB" vs "BCAB"):**

|   |   | B | C | A | B |
|---|---|---|---|---|---|
|   | 0 | 0 | 0 | 0 | 0 |
| A | 0 | 0 | 0 | 1 | 1 |
| B | 0 | 1 | 1 | 1 | 2 |
| C | 0 | 1 | 2 | 2 | 2 |
| B | 0 | 1 | 2 | 2 | 3 |

Fill order: row by row, left-to-right. Each cell L[i][j] = max(L[i−1][j], L[i][j−1]) if chars differ; L[i−1][j−1]+1 if match.

**P49 checkpoint:**
- CORRECT → "Memoization caches; tabulation fills bottom-up. Both convert exponential recursion to polynomial time." → A02
- PARTIAL (knows recursion, doesn't see the caching distinction) → "Trace F(5) naive: how many times is F(2) computed? Now trace with memoization." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Compute L[2][3] in the LCS table above, using the recurrence." → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**DP vs. Greedy — diagnostic contrast (0/1 Knapsack):**

Capacity W=5; items: (weight=3, value=4), (weight=2, value=3), (weight=2, value=3).

**Greedy by value/weight ratio:** ratios = 4/3≈1.33, 3/2=1.5, 3/2=1.5. Pick item 2 (w=2,v=3), item 3 (w=2,v=3), total weight=4≤5 ✓, value=6.

**DP solution:**

| j\w | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| item1 (w=3,v=4) | 0 | 0 | 0 | 4 | 4 | 4 |
| item2 (w=2,v=3) | 0 | 0 | 3 | 4 | 4 | 7 |
| item3 (w=2,v=3) | 0 | 0 | 3 | 4 | 6 | 7 |

Optimal = 7 (items 1+3: w=5, v=7) > greedy's 6. **Greedy gives wrong answer.**

**Gate question (MC-2):** "Why can't greedy find the optimal 0/1 knapsack solution in general?" Because greedy commits to an item without checking whether leaving space for a better combination would yield higher total value. The subproblems OVERLAP (same capacity budget appears in multiple sub-decisions) and the greedy choice at step k can foreclose the optimal choice at step k+1.

**P49 checkpoint:**
- CORRECT → "DP is required when greedy commits irrevocably and misses better combinations." → A03
- PARTIAL (knows greedy fails, can't explain why) → "After greedy picks item 2 and 3, can it pick item 1? What's the total weight?" → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "What is the maximum value achievable with the DP table at W=5?" → TB-R02 → A03

### A03 — P06 CONTRAST PAIR
**Top-down (memoization) vs. Bottom-up (tabulation):**

| Feature | Memoization | Tabulation |
|---|---|---|
| Direction | Compute on demand, cache | Fill all subproblems in DAG order |
| Only needed cells? | Yes (lazy) | No (fills entire table) |
| Stack overflow risk | Yes (deep recursion) | No |
| Easier to implement? | Usually (natural recursion) | Sometimes harder (need topological order) |
| When to prefer | Sparse subproblem DAGs | Dense subproblems; iterative environments |

**Subproblem ordering failure example:** Fill LCS table column-by-column (j-first): cell (1,1) needs (0,0),(0,1),(1,0) — (0,1) not yet filled if we go column-by-column starting column 1. Result: wrong. Row-by-row fills dependencies correctly.

**P49 checkpoint:**
- CORRECT → "Top-down is lazy and natural; bottom-up requires knowing the dependency order (topological sort of subproblem DAG) but avoids stack issues." → Gate (P91)
- PARTIAL (knows the names, can't identify when each fails) → "In the LCS table, which cells does L[2][3] depend on? Can you fill (2,3) before (1,3)?" → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Look at L[i][j]=max(L[i−1][j], L[i][j−1]). What two cells do you need before computing L[2][3]?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 DP-IS-JUST-RECURSION):**
Step 1 — "Naive recursion recomputes. Count F(5) naive calls: F(5)→F(4)+F(3)→F(3)+F(2)+F(2)+F(1)→… F(2) is computed 3 times, F(1) 5 times. Total calls = O(2ⁿ)." Step 2 — "Memoization adds one line: before computing F(k), check cache. If cached, return. Add result to cache after computing. Every F(k) computed exactly once → O(n)." Step 3 — Re-trace F(5) with a cache table showing each value filled exactly once. Re-probe the distinction.

**TB-R02 (MC-2 GREEDY-ALWAYS-WORKS):**
Step 1 — "Greedy works when: each locally best choice leads to a globally best solution. This is true for fractional knapsack (you can take fractions) and activity selection (no value interaction between choices). It FAILS for 0/1 knapsack because taking an item now changes what fits next." Step 2 — Trace the knapsack example showing greedy commits to items 2+3 (weight 4) leaving only W=1 remaining, blocking item 1 (weight 3). Step 3 — "DP tries ALL combinations implicitly by filling the table. Greedy picks one path greedily." Re-probe with W=5 table.

**TB-R03 (MC-3 SUBPROBLEM-ORDER-ARBITRARY):**
Step 1 — "Every DP table has a dependency DAG: cell X depends on cells Y₁,Y₂,… You must compute Y₁ and Y₂ BEFORE X. Topological order of the DAG gives a valid fill order." Step 2 — Draw the 4×4 LCS table; draw arrows from each cell to its dependencies. Show the DAG: (i,j) depends on (i−1,j), (i,j−1), (i−1,j−1). A valid fill order: all (i−1,j−1), (i−1,j), (i,j−1) before (i,j) — row-by-row achieves this. Step 3 — Show that column-by-column fails: (1,1) needs (0,1) not yet available in first column pass.

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Write the Bellman recurrence for the Edit Distance problem (minimum insertions/deletions/substitutions to transform string A into string B). Fill a 3×4 table for A="cat", B="cuts".
2. In the 0/1 knapsack with capacity W=6 and items (w=1,v=1),(w=2,v=6),(w=3,v=10),(w=5,v=16), build the DP table and identify the optimal item selection.
3. Explain why the coin change problem (minimum coins to make amount n using denominations d₁,…,dₖ) has optimal substructure and overlapping subproblems.
4. Give an example of a problem that has optimal substructure but no overlapping subproblems (so DP would be wasteful — use a simpler method instead).

**P55 — Reflect & Consolidate:** "DP requires: overlapping subproblems (caching helps) AND optimal substructure (sub-optimal subproblem solutions can't be part of an optimal overall solution). When both hold, DP turns exponential brute force into polynomial time."

**P76 — Transfer Probe (Independence mode):**
The Matrix Chain Multiplication problem: given matrices A₁,A₂,…,Aₙ with dimensions p₀×p₁, p₁×p₂,…, p_{n−1}×pₙ, find the parenthesization minimizing total scalar multiplications. The subproblem is M[i][j] = minimum cost to multiply Aᵢ through Aⱼ. Write the Bellman recurrence for M[i][j] in terms of M[i][k] and M[k+1][j] for all splits k, with base case M[i][i]=0. Identify the correct fill order (not row-by-row; why?).

**P55 — Reflect & Consolidate:** "Matrix chain shows the fill order must match the subproblem DAG, which here is chain length: fill all length-1 chains, then length-2, etc., not row by row."

**P75 — Mastery Assessment:**
"The Longest Increasing Subsequence (LIS) problem: given array A[1..n], find the length of the longest strictly increasing subsequence. (a) Define the subproblem L[i] = length of LIS ending at index i. (b) Write the Bellman recurrence. (c) Give the fill order. (d) Compute LIS for A=[3,1,4,1,5,9,2,6]."

**P55 — Reflect & Consolidate:** "LIS is a classic DP where the subproblem index is the 'position of the last element chosen' — a common DP design pattern for sequence problems."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.opt.dynamic-programming complete
- Score 3/5 → REVIEW Bellman recurrence formulation; replay A01
- Score ≤ 2/5 → PREREQUISITE GAP in math.disc.recurrence-relation; reassign

**P78 — Completion:** Dynamic programming certified. Student can identify DP applicability, formulate Bellman recurrences, and implement both memoization and tabulation strategies.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Matrix Chain Multiplication — non-row-by-row fill order; chain-length-based topological order
Skill tested: Design a new Bellman recurrence; identify the correct dependency order for a 2D DP table with non-standard structure

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

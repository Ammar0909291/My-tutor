# math.linalg.linear-system

## Identity
- **KG id**: `math.linalg.linear-system`
- **Domain**: math.linalg
- **Requires**: `math.linalg.matrix`, `math.alg.system-linear-equations`
- **Unlocks**: `math.linalg.row-echelon`, `math.linalg.matrix-inverse`
- **Cross-links**: `math.alg.system-linear-equations`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 5

## Learning Objective
Translate a system of linear equations into matrix form $Ax=b$, reusing `math.linalg.matrix`'s own
grid structure; correctly classify a system's outcome (unique solution, no solution, or infinitely
many solutions) by comparing $\text{rank}(A)$ to $\text{rank}([A|b])$ and to the number of unknowns
$n$; and correctly read a terminal row-reduced row $[0\ 0\ \cdots\ 0\ |\ c]$, distinguishing $c=0$
(a free variable, toward infinitely many solutions) from $c\ne0$ (a contradiction, no solution).

## Core Understanding
A system of $m$ linear equations in $n$ unknowns can be written $Ax=b$ — reusing
`math.linalg.matrix`'s own grid structure directly, this restates `math.alg.system-linear-
equations`'s own elimination-based content in matrix form. For $Ax=b$, let $r=\text{rank}(A)$ and
$r'=\text{rank}([A|b])$ (the augmented matrix). Always $r\le r'$ (adding a column cannot decrease
rank, but can increase it by at most 1). Three cases classify the outcome completely:
- $r<r'$: NO SOLUTION (inconsistent — some row becomes $0=c$, $c\ne0$).
- $r=r'=n$: UNIQUE SOLUTION (as many independent constraints as unknowns).
- $r=r'<n$: INFINITELY MANY SOLUTIONS ($n-r$ free variables).

Equation COUNT ($m$) never appears in this rule directly — only the RANKS do, which measure the
number of genuinely INDEPENDENT constraints, regardless of how many equations were originally
written down. A system can have as many equations as unknowns and STILL fail to have a unique
solution, if some equations are redundant (dependent on others) or contradictory.

Reading a terminal row-reduced row $[0\ 0\ \cdots\ 0\ |\ c]$ is the single most diagnostic step:
if $c=0$, the row reads "$0=0$" — always true, contributing no new constraint, toward a FREE
variable and infinitely many solutions (provided nothing else contradicts). If $c\ne0$, the row
reads "$0=c$" — always FALSE, a CONTRADICTION that makes the ENTIRE system unsolvable, overriding
every other equation regardless of how consistent they otherwise are.

## Mental Models
- **"$Ax=b$ — the same system `math.alg.system-linear-equations` solves by elimination, restated
  as matrix multiplication."**
- **"Rank, not equation count, decides the outcome — redundant or contradictory equations change
  rank without changing how many were written down."**
- **"$[0\cdots0|c]$: if $c=0$, free variable; if $c\ne0$, contradiction — the two look almost
  identical but mean opposite things."**

## Why Students Fail

### MC-1: EQUATION-COUNT-DETERMINES-OUTCOME
- **Surface form**: assumes "$n$ equations, $n$ unknowns" guarantees a unique solution, ignoring the
  possibility of redundant or contradictory equations that change the effective rank.
- **Birth type**: Type 1, overgeneralization. The common case (independent equations, matching
  count) does give uniqueness, and this typical pattern is generalized past the cases where
  equations are secretly dependent or contradictory.
- **Repair**: row-reduce a specific "square" system (same equation and unknown count) that turns
  out to be secretly dependent, showing the actual rank — not the raw count — determines the
  outcome.

### MC-2: ZERO-ROW-ALWAYS-MEANS-INFINITE-SOLUTIONS
- **Surface form**: sees any all-coefficient-zero row in row-reduced form and concludes "infinitely
  many solutions," without checking whether the augmented column entry is also zero.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared FOUNDATIONAL severity — the
  single most common row-reduction reading error). A zero coefficient row LOOKS superficially
  identical whether or not the augmented entry is zero, yet the two cases have OPPOSITE
  consequences.
- **Repair**: contrast $[0\ 0\ 0|0]$ (free variable) against $[0\ 0\ 0|c\ne0]$ (contradiction) side
  by side, establishing the habit of always checking the augmented entry explicitly.

### MC-3: RANK-LESS-THAN-N-MEANS-NO-SOLUTION
- **Surface form**: assumes $\text{rank}(A)<n$ (fewer independent equations than unknowns)
  automatically means the system is inconsistent, rather than recognizing this signals infinitely
  many solutions WHEN the system is otherwise consistent.
- **Birth type**: Type 1, overgeneralization. "Not enough equations to pin down a single answer" is
  correctly sensed, but conflated with "no answer exists at all," rather than "possibly many valid
  answers."
- **Repair**: present a genuinely underdetermined but consistent system, showing it has infinitely
  many solutions (via free variables), never zero solutions, unless an actual contradiction is
  found.

## Misconceptions

### MC-1: EQUATION-COUNT-DETERMINES-OUTCOME
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: ZERO-ROW-ALWAYS-MEANS-INFINITE-SOLUTIONS
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: RANK-LESS-THAN-N-MEANS-NO-SOLUTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Counting genuinely distinct votes, not ballots cast: redundant or contradictory equations are
  like duplicate or spoiled ballots — only the RANK (genuinely independent constraints) determines
  the outcome, not the raw equation count."**
- **Anti-analogy**: this is NOT "just relabel `math.alg.system-linear-equations`'s elimination
  answer in matrix language" — the rank framework genuinely scales to systems too large to inspect
  by eye, which elimination-by-hand cannot.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: row-reduce a 3-equation, 3-unknown system where one equation
  is a scalar multiple of another, showing rank $2<n=3$ despite the matching count — infinitely
  many solutions, not unique.
- **Demonstration 2 (targets MC-2)**: contrast $[0\ 0\ 0|0]$ (a genuinely redundant equation) against
  $[0\ 0\ 0|5]$ (a genuine contradiction) for two otherwise-identical systems.
- **Demonstration 3 (targets MC-3)**: row-reduce a 2-equation, 3-unknown system that is consistent,
  showing infinitely many solutions (2 free variables), never "no solution" merely from having
  fewer equations.

## Discovery Questions
1. "If a system has as many equations as unknowns, does that guarantee a unique solution?"
2. "Do $[0\ 0\ 0|0]$ and $[0\ 0\ 0|5]$ mean the same thing, or opposite things?"
3. "Does having fewer independent equations than unknowns ever mean 'no solution,' or does it mean
   something else?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.matrix`'s own grid structure and `math.alg.system-linear-
   equations`'s own elimination method, framing $Ax=b$ as the matrix restatement of already-known
   content.
2. **Conflict evidence**: the secretly-dependent "square" system, breaking MC-1 directly.
3. **Contrast pair**: $[0\ 0\ 0|0]$ against $[0\ 0\ 0|c\ne0]$, isolating MC-2 via direct side-by-side
   comparison.
4. **Mastery gate**: require a rank-based classification, a correct terminal-row reading, and a
   consistent-underdetermined-system judgment under transfer, at the Blueprint's own stated MAMR
   of 5/5.

## Tutor Actions
- Never accept a solution-count claim based on equation count alone — require rank comparison.
- When an all-coefficient-zero row appears, require the learner to state the augmented entry's
  value explicitly before classifying the outcome.

## Voice Teaching Notes
- Say "what's the actual rank, not just the equation count?" whenever an outcome is claimed from
  raw counting.
- When a zero-coefficient row appears, ask "what does the augmented entry say?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly translates a system into matrix form and row-reduces
  it.
- **Rung 2 (application)**: learner correctly classifies the outcome via rank comparison, including
  correctly reading a terminal zero-coefficient row.
- **Rung 3 (transfer)**: learner correctly reconciles elimination's informal redundancy/
  contradiction language with the formal rank framework, and explains what the matrix framework
  adds at scale.

## Tutor Recovery Strategy
- If MC-1 recurs, re-row-reduce the specific "square-but-dependent" system in question.
- If MC-2 recurs, re-contrast the specific $c=0$ vs. $c\ne0$ rows in question.
- If MC-3 recurs, re-verify consistency for the specific underdetermined system in question.

## Memory Hooks
- "Rank decides it, not equation count."
- "$[0\cdots0|0]$ is free; $[0\cdots0|c\ne0]$ is fatal."
- "Fewer independent equations means possibly many solutions, never automatically none."

## Transfer Connections
- `math.linalg.matrix` (already authored, this campaign): supplies the grid structure $Ax=b$ is
  built directly on.
- `math.alg.system-linear-equations` (Tier-1 cross-link, already authored, CERTIFIED domain):
  genuinely incorporated — the elimination method and three-outcome vocabulary this concept
  restates via rank, with the transfer probe explicitly reconciling the two approaches.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.linear-system.md`, reused by
  reference for its three-outcome representation shift, its equation-count/zero-row/rank-vs-n
  contrast pairs, and its three-misconception registry (birth types independently classified,
  since this Blueprint states triggers but not birth type).
- Transfer probe cited by reference: the Blueprint's own cross-link-probe-mode probe, reconciling
  elimination-based reasoning with the rank framework and arguing for the matrix framework's
  scalability advantage.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `matrix`/`system-linear-equations`, unlocks `row-echelon`/`matrix-inverse`, cross_links
  `system-linear-equations`, proficient/apply, mastery_threshold 0.9, estimated_hours 5) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 76): authored. Unblocked by `math.linalg.matrix` (Batch 72). Companion batch
  concepts: `math.graph.algebraic-graph-theory`, `math.linalg.matrix-inverse`,
  `math.linalg.angle-vectors`. `math.linalg` moves toward **19/61** this batch. Unlocks
  `math.linalg.row-echelon`/`math.linalg.matrix-inverse` directly (`matrix-inverse` authored this
  same batch).

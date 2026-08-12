# Teaching Blueprint: Column Space (`math.linalg.column-space`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.column-space` |
| name | Column Space |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.subspace`, `math.linalg.span` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | C(A) = {Ax : x∈ℝⁿ}; the span of the columns of A; a subspace of ℝᵐ. Ax=b is consistent iff b∈C(A). dim(C(A)) = rank(A).

 |

## Component 1 — Learning Objectives

- LO1: Define the column space $C(A)=\{Ax:x\in\mathbb{R}^n\}$ as the SPAN of $A$'s columns, and find a spanning set for it directly from $A$'s columns.
- LO2: Use the column space to determine whether $Ax=b$ is CONSISTENT: a solution exists if and only if $b\in C(A)$.
- LO3: State that $\dim(C(A))=\text{rank}(A)$, connecting column space directly to the already-mastered rank concept.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.subspace` (what a subspace is) and `math.linalg.span` (the spanning-set concept this column space is defined via).

## Component 3 — Core Explanation

The **column space** $C(A)=\{Ax:x\in\mathbb{R}^n\}$ of an $m\times n$ matrix $A$ is the set of ALL possible outputs $Ax$ as $x$ ranges over $\mathbb{R}^n$ — equivalently, it is the SPAN of $A$'s columns (every linear combination of the columns). $C(A)$ is a subspace of $\mathbb{R}^m$ (the output space).

The column space directly determines SOLVABILITY: $Ax=b$ has a solution if and only if $b\in C(A)$ — i.e., $b$ can be written as SOME linear combination of $A$'s columns (with the combination's coefficients giving a valid $x$).

Finally, $\dim(C(A))=\text{rank}(A)$ — the column space's dimension is EXACTLY the rank, connecting this concept directly to `math.linalg.rank`'s already-established pivot-counting computation.

## Component 4 — Worked Examples

**Example 1 (LO1 — column space as a span)**: For $A=\begin{pmatrix}1&2\\3&6\\2&4\end{pmatrix}$, the column space is spanned by its two columns: $\{(1,3,2),(2,6,4)\}$. Note the SECOND column is exactly $2\times$ the first — so these two "spanning vectors" are actually linearly DEPENDENT, and the column space is really just the span of ONE vector (a line through the origin in $\mathbb{R}^3$), not a full 2-dimensional plane, despite $A$ having 2 columns.

**Example 2 (LO2 — using column space to check consistency, breaking MC-1)**: For $A=\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}$ (columns $(1,0,1)$ and $(0,1,1)$), is $Ax=b$ solvable for $b=(2,3,4)$? Check whether $b\in C(A)$: is $(2,3,4)=c_1(1,0,1)+c_2(0,1,1)$ for some $c_1,c_2$? This requires $c_1=2$, $c_2=3$, AND $c_1+c_2=4$ (from the third component) — checking: $2+3=5\ne4$. So $b\notin C(A)$, and $Ax=b$ has NO solution. A common error checks only PART of the required linear-combination system (e.g. confirming the first two components work, without checking the third), incorrectly concluding consistency without verifying ALL components of $b$ are simultaneously achievable.

**Example 3 (LO3 — column space dimension equals rank, breaking MC-2)**: For the matrix from Example 1 ($A=\begin{pmatrix}1&2\\3&6\\2&4\end{pmatrix}$), row-reducing gives rank 1 (since the columns are proportional, only 1 pivot results). So $\dim(C(A))=1$ — matching the observation from Example 1 that the column space is really just a 1-dimensional line, despite $A$ HAVING 2 columns. A common error assumes $\dim(C(A))$ always equals the NUMBER OF COLUMNS of $A$, rather than the RANK specifically — when columns are linearly dependent, the column space's dimension is strictly LESS than the column count.

## Component 5 — Teaching Actions

### Teaching Action A01 — Column Space Is the Span of A's Columns (Primitive P64: Conceptual Shift)

Work Example 1, explicitly identifying $A$'s columns as the spanning set, then checking for linear dependence among them to determine the column space's TRUE dimension.

### Teaching Action A02 — Checking b ∈ C(A) Requires ALL Components to Match Simultaneously (Primitive P06: Contrast Pair)

Work Example 2, explicitly setting up and checking the FULL system of equations (all three components), showing a partial match is insufficient. State the rule: "checking $b\in C(A)$ means finding coefficients that work for EVERY component of $b$ simultaneously — checking only some components can give a false positive."

- **MC-1 hook**: this directly targets MC-1 (checking only part of the required system when verifying $b\in C(A)$).

### Teaching Action A03 — Column Space Dimension Is Rank, Not Column Count (Primitive P06: Contrast Pair, second pairing)

Work Example 3, explicitly connecting the rank computation (1 pivot) to the column space's true dimension (1), contrasting against the flawed assumption that dimension automatically equals the column count (2). State the rule: "the column space's dimension is the RANK — count linearly INDEPENDENT columns, not just the total number of columns present."

- **MC-2 hook**: this directly targets MC-2 (assuming $\dim(C(A))$ always equals the number of columns).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find a spanning set for the column space of $\begin{pmatrix}1&2\\4&5\end{pmatrix}$.
  2. Determine whether $b=(3,7)$ is in the column space of $\begin{pmatrix}1&2\\2&4\end{pmatrix}$, showing the full check.
  3. Given rank$(A)=2$ for a $2\times4$ matrix $A$, state $\dim(C(A))$.
  4. Explain, in one sentence, why the column space's dimension can be less than the number of columns in the matrix.
- **P76 (Transfer Probe, mode = independence)**: "A network flow problem models possible flow patterns as $Ax$ for a matrix $A$ representing pipe connections, with $x$ representing flow rates. An engineer wants to know if a specific target flow vector $b$ is physically achievable given the pipe network's structure. (a) Explain, using this lesson's consistency criterion, why checking whether $b\in C(A)$ is exactly the right mathematical question to answer 'is this target flow achievable?' (b) If the pipe network has 5 pipes ($A$ has 5 columns) but the engineer computes $\text{rank}(A)=3$, explain what this means about the DIMENSION of achievable flow patterns, even though there are 5 individual pipes to control."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COLUMN-SPACE-MEMBERSHIP-CHECKED-PARTIALLY | Verifying only some components of the required linear-combination system when checking whether $b\in C(A)$, rather than confirming all components simultaneously | Foundational |
| MC-2 | COLUMN-SPACE-DIMENSION-ASSUMED-EQUAL-TO-COLUMN-COUNT | Believing $\dim(C(A))$ always equals the number of columns in $A$, rather than the rank (which can be smaller when columns are dependent) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Column Space Membership Checked Partially") → P41 (detect: present Example 2 and check whether all three component equations are verified) → P64 (conceptual shift: re-set up the FULL system of equations explicitly, checking every component together before concluding consistency).
- **B02 (targets MC-2)**: P27 ("Column Space Dimension Assumed Equal to Column Count") → P41 (detect: present Example 3 and check whether $\dim(C(A))=2$ (column count) is assumed rather than the correct rank-based value of 1) → P64 (conceptual shift: re-derive the rank via row reduction explicitly, connecting the pivot count directly to the true column-space dimension).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.subspace`, `math.linalg.span`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.rank` (the dimension-computing theorem this concept directly cites), `math.linalg.kernel-image` (a companion concept for linear transformations more generally).

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that this concept synthesizes span and subspace ideas into a specific, practically important object with a direct connection to rank.
- MC-2 was ranked most severe alongside MC-1 because it reflects an incomplete understanding of what "rank" actually measures (independent directions, not raw column count) — a student holding this misconception would misapply the already-learned rank concept in every column-space context.
- The network-flow transfer probe was deliberately chosen because column space membership genuinely models real achievability questions in flow/circuit-type systems, giving the abstract $b\in C(A)$ criterion concrete engineering meaning.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.subspace`, `math.linalg.span`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

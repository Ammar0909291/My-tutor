# Teaching Blueprint: Matrix Addition (`math.linalg.matrix-addition`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.matrix-addition` |
| name | Matrix Addition |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.linalg.matrix` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — grid overlays before symbolic component addition |
| description (KG) | Component-wise addition of matrices of the same dimensions. Satisfies all vector space axioms — matrices of the same size form a vector space.

 |

## Component 1 — Learning Objectives

- LO1: Add two matrices of the SAME dimensions by adding CORRESPONDING entries (component-wise).
- LO2: Recognize that matrix addition is UNDEFINED for matrices of DIFFERENT dimensions — there is no valid way to add a $2\times3$ matrix to a $3\times2$ matrix, for instance.
- LO3: State that matrices of a fixed size, under addition (and scalar multiplication), satisfy all VECTOR SPACE axioms — matrix addition behaves exactly like vector addition, just with entries arranged in a grid rather than a list.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.matrix` (what a matrix is, and its dimensions) — addition is the first operation defined on this structure.

## Component 3 — Core Explanation

**Matrix addition** combines two matrices of the SAME dimensions by adding CORRESPONDING entries: if $A$ and $B$ are both $m\times n$ matrices, $(A+B)_{ij}=A_{ij}+B_{ij}$ for every position $(i,j)$. This is UNDEFINED for matrices of different dimensions — there is no meaningful way to "line up" entries that don't correspond position-for-position.

Matrices of a FIXED size, under addition (and scalar multiplication), satisfy every VECTOR SPACE axiom (associativity, commutativity, existence of a zero matrix, existence of additive inverses, distributivity, etc.) — this means matrices genuinely ARE vectors in a more general sense, just conventionally arranged in a rectangular grid rather than a single column or row.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic component-wise addition)**: Add $\begin{pmatrix}1&2\\3&4\end{pmatrix}+\begin{pmatrix}5&6\\7&8\end{pmatrix}=\begin{pmatrix}1+5&2+6\\3+7&4+8\end{pmatrix}=\begin{pmatrix}6&8\\10&12\end{pmatrix}$.

**Example 2 (LO2 — dimension mismatch is undefined, breaking MC-1)**: Attempt to add a $2\times3$ matrix $\begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}$ to a $3\times2$ matrix $\begin{pmatrix}1&2\\3&4\\5&6\end{pmatrix}$. This addition is UNDEFINED — the dimensions don't match ($2\times3\ne3\times2$), so there's no valid position-by-position correspondence. A common error attempts to add them anyway by matching up entries in SOME arbitrary order (e.g. reading both matrices left-to-right, top-to-bottom, as if they were flat lists), rather than recognizing the operation simply doesn't apply when dimensions differ.

**Example 3 (LO3 — vector space structure, verifying commutativity)**: Verify matrix addition is commutative for $A=\begin{pmatrix}1&0\\2&3\end{pmatrix}$, $B=\begin{pmatrix}4&5\\1&1\end{pmatrix}$: $A+B=\begin{pmatrix}5&5\\3&4\end{pmatrix}$; $B+A=\begin{pmatrix}5&5\\3&4\end{pmatrix}$ — IDENTICAL, confirming $A+B=B+A$ for this case, consistent with matrix addition satisfying the commutativity vector space axiom (since ordinary real-number addition, applied entry-wise, is itself commutative).

## Component 5 — Teaching Actions

### Teaching Action A01 — Add Corresponding Entries, Position by Position (Primitive P64: Conceptual Shift)

Work Example 1, using a visual grid overlay (physically aligning the two matrices' cells) to reinforce that ONLY matching positions combine.

### Teaching Action A02 — Dimension Mismatch Means the Operation Doesn't Apply (Primitive P06: Contrast Pair)

Work Example 2, showing why forcing an addition between mismatched dimensions has no valid, well-defined meaning — there's no canonical way to align a $2\times3$ grid with a $3\times2$ grid. State the rule: "matrix addition requires IDENTICAL dimensions — if the sizes don't match exactly, the operation is simply undefined, not something to force through some alternative pairing."

- **MC-1 hook**: this directly targets MC-1 (attempting to add matrices of mismatched dimensions via an arbitrary pairing).

### Teaching Action A03 — Matrix Addition Inherits Vector-Space Properties (Primitive P11: Representation Shift)

Work Example 3's commutativity verification, connecting the entry-wise computation back to ordinary real-number addition's own commutativity, grounding why the vector-space axioms hold structurally.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Add $\begin{pmatrix}2&-1\\0&3\end{pmatrix}+\begin{pmatrix}4&5\\-2&1\end{pmatrix}$.
  2. Determine whether $\begin{pmatrix}1&2\end{pmatrix}$ (a $1\times2$ matrix) can be added to $\begin{pmatrix}3\\4\end{pmatrix}$ (a $2\times1$ matrix), and explain why or why not.
  3. Add three matrices of the same $2\times2$ dimensions together, showing the computation is associative regardless of grouping order.
  4. Explain, in one sentence, why matrix addition requires matching dimensions.
- **P76 (Transfer Probe, mode = independence)**: "A spreadsheet tracks monthly sales for 3 products across 2 regions as a $2\times3$ matrix for January and another $2\times3$ matrix for February. (a) Add the two matrices to find total sales per product per region across both months. (b) A colleague accidentally tries to add the January matrix (2 regions × 3 products) to a DIFFERENTLY-structured March report organized as 3 regions × 2 products (a $3\times2$ matrix) — explain, using this lesson's dimension-matching requirement, why this addition cannot be performed directly, and what would need to change first."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MISMATCHED-DIMENSION-MATRICES-ADDED-VIA-ARBITRARY-PAIRING | Attempting to add matrices of different dimensions by forcing some arbitrary entry pairing, rather than recognizing the operation is undefined | Foundational |
| MC-2 | MATRIX-ADDITION-ENTRY-POSITIONS-MISALIGNED | Adding entries from mismatched positions within same-dimension matrices (e.g. transposing one matrix's layout before adding), rather than matching by exact row-column position | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Mismatched Dimension Matrices Added via Arbitrary Pairing") → P41 (detect: present Example 2 and check whether an attempt is made to force the addition anyway) → P64 (conceptual shift: re-state the dimension-matching requirement explicitly, confirming no valid entry correspondence exists between a $2\times3$ and a $3\times2$ matrix).
- **B02 (targets MC-2)**: P27 ("Matrix Addition Entry Positions Misaligned") → P41 (detect: review a submitted addition for entries combined from mismatched row/column positions) → P64 (conceptual shift: re-derive using an explicit position-by-position grid overlay, confirming each entry pairs with its EXACT same-position counterpart).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.matrix`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 1 and mastery_threshold = 0.95 reflect that this is a quick, mechanically simple procedure once dimension-matching is internalized — the genuine content is the dimension REQUIREMENT (LO2), not computational difficulty.
- MC-1 was ranked most severe because it produces a computed "result" that looks like a valid matrix but represents a mathematically meaningless operation — a category error rather than a mere arithmetic slip.
- The spreadsheet transfer probe was deliberately designed with a genuine business-reporting scenario (mismatched regional/product matrix layouts) to give the dimension-matching requirement concrete, relatable stakes beyond an abstract notational rule.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.matrix`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: grid overlays before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

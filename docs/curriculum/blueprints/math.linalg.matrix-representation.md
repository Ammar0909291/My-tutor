# Teaching Blueprint: Matrix Representation of Linear Maps (`math.linalg.matrix-representation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.matrix-representation` |
| name | Matrix Representation of Linear Maps |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.linalg.linear-map`, `math.linalg.basis` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Given ordered bases β of V and γ of W, the matrix [T]_{γβ} has columns [T(bⱼ)]_γ. Matrix multiplication then corresponds to composition of linear maps: [T∘S]=[T][S].

 |

## Component 1 — Learning Objectives

- LO1: Construct the matrix representation $[T]_{\gamma\beta}$ of a linear map $T:V\to W$ relative to ordered bases $\beta$ of $V$ and $\gamma$ of $W$: each COLUMN $j$ is the coordinate vector $[T(b_j)]_\gamma$ of the $j$-th basis vector's image.
- LO2: Use a constructed matrix representation to compute $T(v)$ for a specific vector $v$, by finding $[v]_\beta$ and multiplying by the matrix.
- LO3: Verify that matrix multiplication corresponds to COMPOSITION of linear maps: $[T\circ S]=[T][S]$ — composing two linear maps corresponds to multiplying their matrix representations.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.linear-map` (linear transformations) and `math.linalg.basis` (ordered bases, the reference frames this matrix representation depends on).

## Component 3 — Core Explanation

Given a linear map $T:V\to W$ and ordered bases $\beta=\{b_1,\ldots,b_n\}$ of $V$, $\gamma$ of $W$: the **matrix representation** $[T]_{\gamma\beta}$ has as its $j$-th COLUMN the coordinate vector $[T(b_j)]_\gamma$ — i.e., apply $T$ to EACH basis vector of $\beta$ in turn, express the result in $\gamma$-coordinates, and place that as a column.

Once constructed, this matrix lets you compute $T(v)$ for ANY $v$: find $[v]_\beta$ (coordinates relative to $\beta$), then $[T(v)]_\gamma=[T]_{\gamma\beta}[v]_\beta$ (ordinary matrix-vector multiplication).

A key structural fact: COMPOSITION of linear maps corresponds to MATRIX MULTIPLICATION of their representations — $[T\circ S]=[T][S]$, meaning applying $S$ then $T$ can be computed by multiplying their matrices together (in the corresponding order).

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing the matrix, breaking MC-1)**: For $T(x,y)=(2x+y,x-y)$ (a map $\mathbb{R}^2\to\mathbb{R}^2$), find $[T]$ relative to the standard basis $\beta=\{(1,0),(0,1)\}$ (using standard coordinates for both domain and codomain). $T(1,0)=(2,1)$ — first column. $T(0,1)=(1,-1)$ — second column. So $[T]=\begin{pmatrix}2&1\\1&-1\end{pmatrix}$. A common error applies $T$ to arbitrary or wrong vectors (not specifically each BASIS vector of $\beta$ in order), producing a matrix that doesn't actually represent $T$ correctly relative to the intended basis.

**Example 2 (LO2 — using the matrix to compute T(v))**: Using $[T]=\begin{pmatrix}2&1\\1&-1\end{pmatrix}$ from Example 1, compute $T(3,4)$: since $\beta$ is the standard basis, $[v]_\beta=(3,4)$ directly. $[T]_{\gamma\beta}[v]_\beta=\begin{pmatrix}2&1\\1&-1\end{pmatrix}\begin{pmatrix}3\\4\end{pmatrix}=\begin{pmatrix}2(3)+1(4)\\1(3)-1(4)\end{pmatrix}=\begin{pmatrix}10\\-1\end{pmatrix}$. Verify directly: $T(3,4)=(2(3)+4,3-4)=(10,-1)$ ✓.

**Example 3 (LO3 — composition corresponds to matrix multiplication, breaking MC-2)**: For $T(x,y)=(x+y,x-y)$ and $S(x,y)=(2x,3y)$ (both $\mathbb{R}^2\to\mathbb{R}^2$, standard basis), find $[T]=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ and $[S]=\begin{pmatrix}2&0\\0&3\end{pmatrix}$. Compute $[T\circ S]=[T][S]=\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}2&0\\0&3\end{pmatrix}=\begin{pmatrix}2&3\\2&-3\end{pmatrix}$. Verify directly: $(T\circ S)(x,y)=T(2x,3y)=(2x+3y,2x-3y)$, matching $\begin{pmatrix}2&3\\2&-3\end{pmatrix}$'s action. A common error computes $[S][T]$ instead of $[T][S]$ (reversing the multiplication order) — since matrix multiplication is generally NON-commutative, this produces a DIFFERENT result corresponding to the DIFFERENT composition $S\circ T$, not $T\circ S$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Apply T to Each Basis Vector, Column by Column (Primitive P64: Conceptual Shift)

Work Example 1, explicitly applying $T$ to EACH element of $\beta$ in order, placing each result as the corresponding column, reinforcing the systematic column-by-column construction.

- **MC-1 hook**: check whether the matrix is built from $T$ applied specifically to the basis vectors of $\beta$, in the correct order.

### Teaching Action A02 — Multiply the Matrix by the Coordinate Vector (Primitive P64: Conceptual Shift, second instance)

Work Example 2, connecting the matrix-vector product directly back to the original function definition, verifying both methods agree.

### Teaching Action A03 — Composition Order Matters: [T∘S] = [T][S], Not [S][T] (Primitive P06: Contrast Pair)

Work Example 3, explicitly computing BOTH $[T][S]$ and $[S][T]$ (if time permits) to show they generally differ, reinforcing that the matrix multiplication ORDER must match the composition order exactly. State the rule: "$T\circ S$ means 'apply $S$ first, then $T$' — its matrix is $[T][S]$, with $[T]$ on the LEFT, matching how composition is read right-to-left in application order but left-to-right in the matrix product."

- **MC-2 hook**: this directly targets MC-2 (reversing the matrix multiplication order relative to the composition).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Construct $[T]$ for $T(x,y)=(3x-y,x+2y)$ relative to the standard basis.
  2. Using your matrix from problem 1, compute $T(5,2)$ via matrix-vector multiplication, verifying against the direct function definition.
  3. For $T(x,y)=(x+2y,3x)$ and $S(x,y)=(y,x)$, find $[T\circ S]$ by matrix multiplication.
  4. Explain, in one sentence, why $[T\circ S]=[T][S]$ and not $[S][T]$.
- **P76 (Transfer Probe, mode = independence)**: "A computer graphics pipeline applies two transformations to a 2D shape in sequence: first a rotation $R$, then a scaling $S$ (i.e. the combined effect is $S\circ R$). (a) Given matrix representations $[R]=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ (90° rotation) and $[S]=\begin{pmatrix}2&0\\0&2\end{pmatrix}$ (uniform scaling by 2), find the matrix representing the combined transformation $S\circ R$. (b) A junior developer instead computes $[R][S]$ (the reversed order) — explain, using this lesson's composition-order rule, what transformation THIS actually represents instead, and why the visual result on screen would differ from the intended rotate-then-scale effect."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MATRIX-REPRESENTATION-BUILT-FROM-WRONG-VECTORS | Constructing the matrix from $T$ applied to vectors other than the specific basis vectors of $\beta$, in order | Foundational |
| MC-2 | COMPOSITION-MATRIX-MULTIPLICATION-ORDER-REVERSED | Computing $[S][T]$ instead of $[T][S]$ for the composition $T\circ S$, reversing the required matrix multiplication order | Foundational |
| MC-3 | COORDINATE-VECTOR-NOT-USED-FOR-NON-STANDARD-BASIS | When $\beta$ or $\gamma$ is a NON-STANDARD basis, using the vector's standard components directly rather than its actual coordinates relative to that basis | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Matrix Representation Built from Wrong Vectors") → P41 (detect: review a submitted matrix construction for columns not matching $T(b_j)$ for the actual basis vectors) → P64 (conceptual shift: re-derive by explicitly listing $\beta$'s vectors first, then applying $T$ to each in turn).
- **B02 (targets MC-2)**: P27 ("Composition Matrix Multiplication Order Reversed") → P41 (detect: present Example 3 and check whether $[S][T]$ or the correct $[T][S]$ is computed for $T\circ S$) → P64 (conceptual shift: re-verify against the direct function composition, confirming which matrix product matches the actual computed output).
- **B03 (targets MC-3)**: P27 ("Coordinate Vector Not Used for Non-Standard Basis") → P41 (detect: present a matrix-representation problem using a non-standard basis and check whether standard components are used instead of the correct basis-relative coordinates) → P64 (conceptual shift: re-derive $[v]_\beta$ explicitly per `math.linalg.coordinates`'s method before applying the matrix).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.linear-map`, `math.linalg.basis`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.coordinates` (the basis-relative coordinate vectors this matrix representation's columns and inputs both rely on).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept synthesizes linear maps, bases, and coordinates into a single practical computational tool with a genuinely subtle composition-order rule.
- MC-2 was ranked most severe alongside MC-1 because matrix multiplication's non-commutativity makes the composition-order error silently produce a DIFFERENT (wrong) transformation entirely, not merely an inefficient computation — a serious practical consequence in any application (like graphics) where transformation order matters.
- The graphics-pipeline transfer probe was deliberately chosen because transformation-order errors are a genuine, common source of real bugs in computer graphics code, giving MC-2's correction concrete professional stakes beyond an abstract algebra rule.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.linear-map`, `math.linalg.basis`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

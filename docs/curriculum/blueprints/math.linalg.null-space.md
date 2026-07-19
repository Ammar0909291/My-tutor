# Teaching Blueprint: Null Space (`math.linalg.null-space`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.null-space` |
| name | Null Space |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.linalg.subspace`, `math.linalg.row-echelon` |
| unlocks | `math.linalg.rank-nullity` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — row-reducing a specific homogeneous system and reading off its solution set, before the general subspace theory |
| description (KG) | N(A) = {x : Ax=0}; a subspace of ℝⁿ. Dimension is the nullity of A; its vectors are the solutions to the homogeneous system. Found by row-reducing A and parameterizing free variables. |

## Component 1 — Learning Objectives

- LO1: Define the **null space** $N(A) = \{x : Ax=0\}$ — the set of all vectors $x$ that $A$ sends to the zero vector — and verify it is a genuine **subspace** of $\mathbb{R}^n$ using the already-mastered 3-condition test (`math.linalg.subspace`): contains the zero vector, closed under addition, closed under scalar multiplication.
- LO2: Find $N(A)$ concretely by row-reducing $A$ to RREF and **parameterizing the free variables** — directly reusing `math.linalg.row-echelon`'s own free/basic-variable framework — expressing the general solution as a linear combination of specific basis vectors, one per free variable.
- LO3: Recognize the **nullity** (dimension of $N(A)$) as EXACTLY the number of free variables in $A$'s RREF, and correctly distinguish the **trivial null space** ($N(A)=\{0\}$ only, nullity $0$, occurring when there are NO free variables) from a genuinely **nontrivial null space** (nullity $\ge1$) — directly refuting the misconception that the homogeneous system $Ax=0$ always has nontrivial (nonzero) solutions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.subspace` (a subset $W$ of a vector space is a subspace iff it contains $0$ and is closed under addition and scalar multiplication) and `math.linalg.row-echelon` (RREF, pivot columns as basic variables, non-pivot columns as free variables, and parametrizing the general solution of a system with infinitely many solutions).

## Component 3 — Core Explanation

**The null space, defined and verified as a subspace**: for an $m\times n$ matrix $A$, the null space $N(A) = \{x\in\mathbb{R}^n : Ax=0\}$ is the set of ALL vectors that $A$ maps to zero — exactly the solution set of the HOMOGENEOUS system $Ax=0$. Verifying $N(A)$ is a genuine subspace of $\mathbb{R}^n$ uses the already-known 3-condition test: (1) contains $0$ — $A\cdot0=0$ trivially; (2) closed under addition — if $Ax_1=0$ and $Ax_2=0$, then $A(x_1+x_2)=Ax_1+Ax_2=0+0=0$ (using linearity of matrix multiplication); (3) closed under scalar multiplication — if $Ax=0$, then $A(cx)=c(Ax)=c\cdot0=0$. All three conditions hold directly from the linearity of $A$'s action, confirming $N(A)$ is a subspace.

**Finding N(A): row-reduce and parameterize free variables**: to find $N(A)$ concretely, row-reduce $A$ (or the augmented matrix $[A\,|\,0]$, though the zero column never changes under row operations) to RREF, exactly as `math.linalg.row-echelon` already teaches. Each FREE variable (a non-pivot column) is set equal to an arbitrary parameter; each BASIC variable (a pivot column) is then expressed in terms of the free variable(s) using the RREF equations. The resulting general solution, written as a linear combination of the free-variable parameters times specific vectors, gives $N(A)$ directly as the SPAN of those specific vectors.

**Nullity as the number of free variables, and the trivial case**: the DIMENSION of $N(A)$ (called the **nullity** of $A$) equals EXACTLY the number of free variables found in $A$'s RREF. If $A$'s RREF has a pivot in EVERY column (no free variables at all), then the ONLY solution to $Ax=0$ is $x=0$ itself — the null space is TRIVIAL, $N(A)=\{0\}$, with nullity $0$. This is a genuinely possible, common outcome — the homogeneous system $Ax=0$ does NOT always have nonzero solutions; it depends entirely on whether $A$'s RREF has any free (non-pivot) columns.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the subspace conditions directly)**: For $A=\begin{pmatrix}1&2\\2&4\end{pmatrix}$, check that $x_1=(2,-1)$ satisfies $Ax_1=\begin{pmatrix}1(2)+2(-1)\\2(2)+4(-1)\end{pmatrix}=\begin{pmatrix}0\\0\end{pmatrix}$ ✓ — so $x_1\in N(A)$. Verify closure: $2x_1=(4,-2)$ also satisfies $A(2x_1) = 2(Ax_1)=2(0,0)=(0,0)$ ✓ (scalar multiplication closure, directly from linearity) — confirming the subspace property holds for this specific element without needing to re-derive the general argument each time.

**Example 2 (LO2 — row-reducing and parameterizing free variables)**: Continuing with $A=\begin{pmatrix}1&2\\2&4\end{pmatrix}$: row-reduce: Row2 $\to$ Row2 $-2\times$Row1 gives $\begin{pmatrix}1&2\\0&0\end{pmatrix}$ — already RREF (pivot in column 1, no pivot in column 2). Column 2 (variable $x_2$) is FREE; column 1 (variable $x_1$) is basic. Setting $x_2=t$ (the free parameter): from the RREF equation $x_1+2x_2=0$, $x_1=-2t$. So $N(A) = \{(-2t,t) : t\in\mathbb{R}\} = \text{span}\{(-2,1)\}$ — a one-dimensional subspace (a line through the origin), matching Example 1's specific solution $(2,-1)$ as the case $t=-1$.

**Example 3 (LO3 — the trivial null space, breaking MC-1)**: For $B=\begin{pmatrix}1&0\\0&1\end{pmatrix}$ (the identity matrix): row-reducing gives RREF $\begin{pmatrix}1&0\\0&1\end{pmatrix}$ already — a pivot in EVERY column, no free variables at all. The homogeneous system $Bx=0$ becomes $x_1=0$, $x_2=0$ directly — the ONLY solution is $x=(0,0)$, the zero vector itself. So $N(B) = \{(0,0)\}$ — the TRIVIAL null space, nullity $0$. This proves $Ax=0$ does NOT always have nonzero solutions — whether it does depends entirely on whether $A$'s RREF has any free columns, and here (a full-rank square matrix) it simply doesn't.

## Component 5 — Teaching Actions

### Teaching Action A01 — Verifying N(A) Is a Subspace, Directly From Linearity (Primitive P11: Representation Shift)

State: "every one of the three subspace conditions here follows directly from $A$ being a LINEAR map — that's not a coincidence, it's the entire reason $N(A)$ is automatically a subspace for any matrix $A$ whatsoever." Work Example 1's direct verification.

### Teaching Action A02 — Row-Reduce, Then Parameterize the Free Variables (Primitive P11: Representation Shift)

State: "this is exactly `math.linalg.row-echelon`'s own free-variable technique, now applied specifically to find the FULL null space as a span of specific vectors." Work Example 2's full derivation, from row-reduction through the final span description.

### Teaching Action A03 — Nullity Can Be Zero: The Trivial Null Space (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: a matrix (the identity) whose RREF has a pivot in every column, forcing the ONLY solution of $Bx=0$ to be $x=0$ itself. State: "the homogeneous system doesn't automatically have 'extra' nonzero solutions — if there are no free variables, the null space is exactly the single point $\{0\}$."

- **MC-1 hook**: ask "does the homogeneous system $Ax=0$ always have nonzero solutions, for any matrix $A$?" — a "yes" answer reveals MC-1 (assuming a nontrivial null space is guaranteed, missing that a matrix with no free variables in its RREF has only the trivial solution).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify that $x=(3,-1,1)$ satisfies $Ax=0$ for $A=\begin{pmatrix}1&2&-1\\2&4&-2\end{pmatrix}$ (i.e., confirm $x\in N(A)$).
  2. Find $N(A)$ for the same matrix $A$ from problem 1, by row-reducing and parameterizing the free variables, expressing your answer as a span.
  3. Find $N(C)$ for $C=\begin{pmatrix}2&0\\0&3\end{pmatrix}$, and state whether it is trivial or nontrivial.
  4. Explain, in your own words, why the null space of ANY matrix always contains at least the zero vector, but does not always contain anything else.
- **P76 (Transfer Probe, mode = independence)**: "An engineer analyzes a system of sensors described by a matrix equation $Ax=0$, where $x$ represents a combination of sensor readings that would produce a net signal of exactly zero (a 'blind spot' combination the system cannot detect). (a) Explain what it would mean, physically, if $N(A)$ turned out to be trivial (just $\{0\}$) for this sensor system. (b) Explain what it would mean, physically, if $N(A)$ turned out to be nontrivial (e.g. one-dimensional), in terms of the system having an actual 'blind spot' combination of sensor readings. (c) Describe, in general terms, how the engineer would find this blind-spot combination explicitly, referencing the row-reduction and free-variable procedure from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HOMOGENEOUS-SYSTEM-ASSUMED-TO-ALWAYS-HAVE-NONTRIVIAL-SOLUTIONS | Believing Ax=0 always has nonzero solutions, missing that a matrix with a pivot in every column (no free variables) has only the trivial solution x=0 | Foundational |
| MC-2 | SUBSPACE-VERIFICATION-STEP-SKIPPED-FOR-NULL-SPACE | Assuming N(A) is automatically a subspace without connecting this to the specific 3-condition test and the linearity of A that makes it so | Foundational |
| MC-3 | NULLITY-MISCOUNTED-FROM-RREF | Incorrectly counting the number of free variables (hence the nullity) from a matrix's RREF, often by miscounting pivot columns | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Homogeneous-System-Always-Nontrivial Assumption") → P41 (detect: ask whether $Ax=0$ has any nonzero solutions for the identity matrix) → P64 (conceptual shift: re-walk Example 3's direct RREF computation, showing every column has a pivot, forcing $x=0$ as the only solution, re-anchoring on "free variables are what create nontrivial solutions — no free variables means only the trivial one").
- **B02 (targets MC-2)**: P27 (name it: "Subspace Verification Skipped") → P41 (detect: ask a student why N(A) is a subspace, checking whether they can cite the specific linearity argument rather than just asserting it) → P64 (conceptual shift: re-walk Example 1's explicit three-condition check, tied directly to $A$'s linearity: $A(x_1+x_2)=Ax_1+Ax_2$ and $A(cx)=cAx$).
- **B03 (targets MC-3)**: P27 (name it: "Nullity Miscounted from RREF") → P41 (detect: ask a student to state the nullity of a given matrix's RREF and check for a miscounted pivot/free-column tally) → P64 (conceptual shift: re-walk Example 2's explicit column-by-column pivot identification, re-anchoring on "count non-pivot columns directly — each one is exactly one dimension of the null space").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.subspace` (the 3-condition subspace test this concept applies directly to $N(A)$), `math.linalg.row-echelon` (the RREF and free/basic-variable framework this concept's computation method directly reuses).
- **Unlocks**: `math.linalg.rank-nullity` (the Rank-Nullity Theorem relates the nullity established here directly to the rank of $A$).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (subspace verification), A02 (row-reduce and parameterize), and A03 (the trivial null space) each target a distinct LO, appropriate for a concept directly synthesizing two already-mastered prerequisites (subspace theory, RREF/free-variables) into one new object.
- Example 2 was deliberately built using a matrix whose second row is a multiple of the first (guaranteeing a free variable and a nontrivial null space), while Example 3 deliberately uses the identity matrix (guaranteeing NO free variables) — this direct pairing makes the trivial/nontrivial distinction as stark as possible, targeting MC-1 with maximum contrast.
- This blueprint deliberately reuses `math.linalg.row-echelon`'s own free/basic-variable vocabulary and procedure verbatim, rather than introducing new terminology, since finding a null space is precisely that concept's parametrization technique applied to the SPECIFIC case where the right-hand side is the zero vector.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: row-reducing a specific homogeneous system before the general subspace theory) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

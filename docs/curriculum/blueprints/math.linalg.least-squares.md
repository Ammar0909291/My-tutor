# Teaching Blueprint: Least Squares (`math.linalg.least-squares`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.least-squares` |
| name | Least Squares |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.linalg.projection`, `math.linalg.matrix-transpose` |
| unlocks | none |
| cross_links | `math.stats.linear-regression` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — proficient learner already has orthogonal projection onto a subspace and the transpose; the task is recognizing an inconsistent system's "best" approximate solution as literally a projection problem |
| description (KG) | When $Ax=b$ has no solution, the least squares solution minimizes $\|Ax-b\|^2$. Found by the normal equations $A^TA\hat x=A^Tb$. Solution: $\hat x=(A^TA)^{-1}A^Tb$ when $A^TA$ is invertible. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize that minimizing $\|Ax-b\|^2$ over all $x$ is EXACTLY `math.linalg.projection`'s own problem of finding the closest point in the subspace $W=\operatorname{col}(A)$ (the column space of $A$) to the vector $b$ — the minimizing $Ax$ is literally $\operatorname{proj}_W(b)$, and the least-squares SOLUTION $\hat x$ is whatever coefficient vector produces that specific projection.
- LO2: Derive the normal equations $A^TA\hat x=A^Tb$ directly from `math.linalg.projection`'s own orthogonality characterization ($b-\operatorname{proj}_W(b)\perp W$) — the residual $b-A\hat x$ must be ORTHOGONAL to every column of $A$ (since those columns span $W$), which translates, using `math.linalg.matrix-transpose`'s own $(AB)^T=B^TA^T$ identity, into the single matrix equation $A^T(b-A\hat x)=0$, i.e. $A^TA\hat x=A^Tb$ — and correctly set up and solve the normal equations for a specific inconsistent system.
- LO3: Apply least squares to fit a line (or other simple model) to data points that do NOT lie exactly on any line — correctly setting up the matrix $A$ and vector $b$ from a data-fitting scenario, solving the normal equations, and interpreting the resulting $\hat x$ as the best-fit coefficients minimizing the total squared vertical deviation.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.projection` (the orthogonal projection $\operatorname{proj}_W(v)$ of a vector onto a subspace $W$, characterized by $v-\operatorname{proj}_W(v)\perp W$) and `math.linalg.matrix-transpose` (the transpose $A^T$ and the identity $(AB)^T=B^TA^T$).

## Component 3 — Core Explanation

**Least squares IS `math.linalg.projection`'s own closest-point problem, applied to $b$ and $\operatorname{col}(A)$**: when $Ax=b$ has NO exact solution, $b$ simply does not lie in the column space $W=\operatorname{col}(A)$ (the set of all possible outputs $Ax$). `math.linalg.projection`'s own theory already identifies the CLOSEST point in $W$ to any given vector — namely $\operatorname{proj}_W(b)$, the unique point in $W$ minimizing distance to $b$. Since minimizing $\|Ax-b\|$ over all $x$ is EXACTLY minimizing the distance from $b$ to a point $Ax\in W$, the BEST possible $Ax$ is precisely $\operatorname{proj}_W(b)$ — and the least-squares solution $\hat x$ is simply whichever coefficient vector produces THIS specific point: $A\hat x=\operatorname{proj}_W(b)$.

**The normal equations come directly from `math.linalg.projection`'s own orthogonality characterization**: `math.linalg.projection` characterizes $\operatorname{proj}_W(b)$ by the fact that the RESIDUAL $b-\operatorname{proj}_W(b)$ is ORTHOGONAL to the entire subspace $W$. Here, $W=\operatorname{col}(A)$ is spanned by $A$'s columns, so orthogonality to ALL of $W$ is equivalent to orthogonality to EACH individual column of $A$ — i.e., each column $a_i$ of $A$ satisfies $a_i^T(b-A\hat x)=0$. Stacking all these conditions into a single matrix equation (using `math.linalg.matrix-transpose`'s own $(AB)^T=B^TA^T$ identity to write "every column of $A$ dotted with the residual" compactly as $A^T(b-A\hat x)$): $A^T(b-A\hat x)=0$, i.e. $A^TA\hat x=A^Tb$ — the NORMAL EQUATIONS, derived DIRECTLY from the orthogonality condition already known from `math.linalg.projection`, not introduced as a separate, unmotivated formula.

**Solving for $\hat x$, and its data-fitting interpretation**: when $A^TA$ is invertible (which happens precisely when $A$'s columns are linearly independent), $\hat x=(A^TA)^{-1}A^Tb$ directly. In data-fitting contexts, $A$'s columns encode the MODEL'S functional form (e.g., a column of 1's and a column of $x$-values, for fitting a line $y=c_0+c_1x$) and $b$ encodes the OBSERVED $y$-values — $\hat x$ then gives the best-fit coefficients MINIMIZING the total squared vertical deviation between the model's predictions and the actual observed data, exactly the quantity $\|Ax-b\|^2$ measures.

## Component 4 — Worked Examples

**Example 1 (LO1 — recognizing least squares as a projection problem, breaking MC-1)**: for the inconsistent system $\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}x=\begin{pmatrix}1\\1\\3\end{pmatrix}$ (three equations, two unknowns, generally overdetermined and inconsistent — checking: $x_1=1,x_2=1$ from the first two rows, but then the third row demands $x_1+x_2=2\ne3$, confirming inconsistency): the column space $W=\operatorname{col}(A)=\operatorname{span}\left\{\begin{pmatrix}1\\0\\1\end{pmatrix},\begin{pmatrix}0\\1\\1\end{pmatrix}\right\}$ is a 2-dimensional subspace of $\mathbb{R}^3$, and $b=\begin{pmatrix}1\\1\\3\end{pmatrix}$ does NOT lie in it. The least-squares solution seeks $A\hat x=\operatorname{proj}_W(b)$ — DIRECTLY `math.linalg.projection`'s own closest-point-in-$W$ problem, applied here with $W=\operatorname{col}(A)$, confirming LO1's identification concretely rather than treating least squares as an unrelated new technique.

**Example 2 (LO2 — deriving and solving the normal equations, breaking MC-2)**: continuing Example 1: $A^T=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}$, so $A^TA=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, and $A^Tb=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}\begin{pmatrix}1\\1\\3\end{pmatrix}=\begin{pmatrix}4\\4\end{pmatrix}$. Solving $\begin{pmatrix}2&1\\1&2\end{pmatrix}\hat x=\begin{pmatrix}4\\4\end{pmatrix}$: by symmetry (or direct elimination), $\hat x=\begin{pmatrix}4/3\\4/3\end{pmatrix}$. Verifying the orthogonality characterization directly: residual $b-A\hat x=\begin{pmatrix}1\\1\\3\end{pmatrix}-\begin{pmatrix}4/3\\4/3\\8/3\end{pmatrix}=\begin{pmatrix}-1/3\\-1/3\\1/3\end{pmatrix}$; checking orthogonality to $A$'s first column $(1,0,1)$: $(-1/3)(1)+(-1/3)(0)+(1/3)(1)=0$ ✓ — confirming the normal equations genuinely produce the orthogonality condition `math.linalg.projection`'s own theory requires.

**Example 3 (LO3 — fitting a best-fit line to data, breaking MC-3)**: fitting $y=c_0+c_1x$ to the data points $(0,1),(1,2),(2,2)$ (which do NOT lie on any single exact line): setting up $A=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix}$ (columns: constant term, $x$-values) and $b=\begin{pmatrix}1\\2\\2\end{pmatrix}$ (observed $y$-values). Computing $A^TA=\begin{pmatrix}3&3\\3&5\end{pmatrix}$, $A^Tb=\begin{pmatrix}5\\6\end{pmatrix}$; solving the normal equations gives $\hat x=(c_0,c_1)=(2/3,1/2)$ — so the best-fit line is $y=2/3+x/2$, MINIMIZING the total squared vertical deviation between this line's predictions and the three actual data points, directly instantiating LO3's data-fitting interpretation of the abstract least-squares machinery.

## Component 5 — Teaching Actions

### Teaching Action A01 — Least Squares IS `math.linalg.projection`'s Own Closest-Point Problem (Primitive P11: Representation Shift)

State: "when $Ax=b$ has no solution, you're not inventing a new kind of problem — you're asking `math.linalg.projection`'s own question: what's the closest point in $\operatorname{col}(A)$ to $b$, and which $x$ produces it?" Walk Example 1's direct identification of $W=\operatorname{col}(A)$ as the relevant subspace.

- **MC-1 hook**: ask "is the least-squares problem a genuinely new kind of problem, or is it literally `math.linalg.projection`'s own closest-point-in-a-subspace problem, applied to $b$ and $\operatorname{col}(A)$?" — a "genuinely new problem" answer reveals MC-1 (missing the direct identification with the already-known projection problem).

### Teaching Action A02 — The Normal Equations Come Directly From the Orthogonality Condition, Not From Nowhere (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the solved $\hat x$ verified to satisfy $b-A\hat x\perp$ (each column of $A$) EXACTLY, confirming the normal equations genuinely encode `math.linalg.projection`'s own orthogonality characterization. State: "the formula $A^TA\hat x=A^Tb$ isn't handed down as an unmotivated recipe — it's `math.linalg.projection`'s own orthogonality requirement, written compactly using `math.linalg.matrix-transpose`'s own transpose identity."

- **MC-2 hook**: ask "are the normal equations $A^TA\hat x=A^Tb$ an independent formula to memorize, or do they follow directly from `math.linalg.projection`'s own orthogonality characterization of the closest point?" — an "independent formula" answer reveals MC-2 (missing the direct derivation).

### Teaching Action A03 — Least Squares Fits the BEST Line Through Data That Doesn't Lie on Any Exact Line (Primitive P06: Contrast Pair)

Contrast the impossible goal of finding an EXACT line through Example 3's three non-collinear points against the achievable, well-defined goal of finding the line MINIMIZING total squared deviation. State: "least squares doesn't pretend the data lies on a perfect line — it finds the specific line that comes closest, in the precise squared-distance sense `math.linalg.projection`'s own machinery measures."

- **MC-3 hook**: ask "does the least-squares best-fit line pass through every data point exactly, or does it minimize the total squared deviation while generally missing every point?" — an "passes through exactly" answer reveals MC-3 (missing that least squares produces an approximate, minimizing solution, not an exact fit).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $A=\begin{pmatrix}1&1\\1&2\\1&3\end{pmatrix}$, $b=\begin{pmatrix}2\\3\\5\end{pmatrix}$, identify the column space $W=\operatorname{col}(A)$ and explain why $b\notin W$ (verify inconsistency directly).
  2. Compute $A^TA$ and $A^Tb$ for the system in problem 1, and solve the normal equations for $\hat x$.
  3. Verify your answer to problem 2 by checking the residual $b-A\hat x$ is orthogonal to both columns of $A$.
  4. Fit a best-fit line $y=c_0+c_1x$ to the data points $(0,0),(1,1),(2,3)$, and state the resulting line equation.
- **P76 (Transfer Probe, mode = independence — `math.stats.linear-regression` not yet authored, pending future revision)**: "An engineer has collected 5 noisy sensor measurements that should, in theory, satisfy a known LINEAR relationship $y=mx+c$, but due to measurement noise, no single line passes through all 5 points exactly. (a) Explain why setting up this problem as $Ax=b$ (with $A$'s columns encoding the model structure and $b$ the observed measurements) leads to an inconsistent system in general. (b) Using this lesson's normal-equations method, explain how the engineer obtains a single, well-defined best-fit line despite the inconsistency, rather than having to arbitrarily pick 2 of the 5 points to fit exactly. (c) Explain, citing `math.linalg.projection`'s own orthogonality characterization, why the resulting best-fit line is provably the BEST possible choice (minimizing total squared deviation), not merely a reasonable-looking compromise."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LEAST-SQUARES-ASSUMED-UNRELATED-NEW-PROBLEM | Believing the least-squares problem is a genuinely new kind of problem, missing that it is literally `math.linalg.projection`'s own closest-point-in-a-subspace problem applied to $b$ and $\operatorname{col}(A)$ | Foundational |
| MC-2 | NORMAL-EQUATIONS-ASSUMED-UNMOTIVATED-FORMULA | Believing the normal equations $A^TA\hat x=A^Tb$ are an independent formula to memorize, missing that they follow directly from `math.linalg.projection`'s own orthogonality characterization | High |
| MC-3 | LEAST-SQUARES-LINE-ASSUMED-TO-PASS-THROUGH-ALL-POINTS | Believing the least-squares best-fit line passes through every data point exactly, missing that it minimizes total squared deviation while generally missing every point | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Least Squares Assumed Unrelated New Problem") → P41 (detect: ask whether least squares is a new problem or literally the projection problem) → P64 (conceptual shift: re-walk Example 1's direct identification of $W=\operatorname{col}(A)$).
- **B02 (targets MC-2)**: P27 (name it: "Normal Equations Assumed Unmotivated Formula") → P41 (detect: ask whether the normal equations are an independent formula or follow from orthogonality) → P64 (conceptual shift: re-walk Example 2's direct orthogonality verification).
- **B03 (targets MC-3)**: P27 (name it: "Least Squares Line Assumed to Pass Through All Points") → P41 (detect: ask whether the best-fit line passes through every data point) → P64 (conceptual shift: re-walk Example 3's minimizing, non-exact best-fit line).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.projection` (the orthogonal projection and its orthogonality characterization this concept's entire derivation is built on) and `math.linalg.matrix-transpose` (the transpose and $(AB)^T=B^TA^T$ identity used to compactly derive the normal equations).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.stats.linear-regression`, checked via `ls docs/curriculum/blueprints/` — confirmed NOT YET authored. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's normal-equations machinery directly to that concept's own statistical interpretation of regression coefficients.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 grounding least squares in the already-known projection problem, LO2 given full derivation depth connecting directly to `math.linalg.projection`'s own orthogonality characterization, and LO3 demonstrating the genuine data-fitting application.
- **Division of labor**: `math.linalg.projection` already owns the orthogonal projection and its orthogonality characterization (verified by grep — its own Unlocks section names this concept as the natural next application); `math.linalg.matrix-transpose` already owns the transpose and its product identity. This concept owns the recognition of least squares AS a projection problem, the direct derivation of the normal equations from orthogonality, and the genuine data-fitting application — all building on, not duplicating, the prerequisites.
- Example 2's deliberate verification of the residual's orthogonality (rather than stopping at solving the normal equations) was chosen specifically to make LO2's "the normal equations genuinely encode orthogonality" claim checkable, not merely asserted as a derivation step.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.stats.linear-regression` confirmed NOT authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: proficient learner already has projection and transpose; task is recognizing least squares as a projection instance) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

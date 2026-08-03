# Teaching Blueprint: Gram-Schmidt Process (`math.linalg.gram-schmidt`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.gram-schmidt` |
| name | Gram-Schmidt Process |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.linalg.orthogonal-basis`, `math.linalg.projection` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — arrow diagrams of successive orthogonal subtraction before symbolic iteration |
| description (KG) | Iteratively converts a linearly independent set into an orthonormal basis: subtract projections onto previous vectors, then normalize. Foundation of QR factorization.

 |

## Component 1 — Learning Objectives

- LO1: Apply the Gram-Schmidt process to convert a linearly independent set $\{v_1,\ldots,v_k\}$ into an ORTHOGONAL set, by iteratively subtracting each new vector's PROJECTIONS onto all PREVIOUSLY constructed orthogonal vectors.
- LO2: NORMALIZE the resulting orthogonal set into an ORTHONORMAL basis (each vector's norm scaled to exactly 1).
- LO3: Correctly subtract projections onto ALL previously constructed vectors (not just the immediately preceding one) when processing each new vector — a common structural oversight for the third vector onward.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.orthogonal-basis` (what an orthogonal/orthonormal basis is) and `math.linalg.projection` (the vector-projection operation this process repeatedly applies).

## Component 3 — Core Explanation

The **Gram-Schmidt process** converts a linearly independent set $\{v_1,\ldots,v_k\}$ into an ORTHOGONAL set $\{u_1,\ldots,u_k\}$ (spanning the same space) via: $u_1=v_1$; $u_2=v_2-\text{proj}_{u_1}(v_2)$ (subtract $v_2$'s projection onto $u_1$); $u_3=v_3-\text{proj}_{u_1}(v_3)-\text{proj}_{u_2}(v_3)$ (subtract projections onto BOTH $u_1$ AND $u_2$); and so on — EACH new vector has its projections onto ALL previously constructed orthogonal vectors subtracted.

Once the orthogonal set $\{u_1,\ldots,u_k\}$ is obtained, NORMALIZING each ($\hat u_i=u_i/|u_i|$) produces an ORTHONORMAL basis — orthogonal AND each vector has norm 1.

This process underlies QR FACTORIZATION (decomposing a matrix into an orthogonal matrix $Q$ times an upper-triangular matrix $R$).

## Component 4 — Worked Examples

**Example 1 (LO1 — first two vectors)**: Orthogonalize $v_1=(1,1,0)$, $v_2=(1,0,1)$. $u_1=v_1=(1,1,0)$. $\text{proj}_{u_1}(v_2)=\frac{v_2\cdot u_1}{u_1\cdot u_1}u_1=\frac{1}{2}(1,1,0)=(0.5,0.5,0)$. $u_2=v_2-\text{proj}_{u_1}(v_2)=(1,0,1)-(0.5,0.5,0)=(0.5,-0.5,1)$. Verify orthogonality: $u_1\cdot u_2=1(0.5)+1(-0.5)+0(1)=0$ ✓.

**Example 2 (LO3 — subtracting projections onto ALL previous vectors, breaking MC-1)**: Continue with $v_3=(0,1,1)$. CORRECT: $u_3=v_3-\text{proj}_{u_1}(v_3)-\text{proj}_{u_2}(v_3)$ — subtract projections onto BOTH $u_1$ AND $u_2$. $\text{proj}_{u_1}(v_3)=\frac{v_3\cdot u_1}{u_1\cdot u_1}u_1=\frac{1}{2}(1,1,0)=(0.5,0.5,0)$. $\text{proj}_{u_2}(v_3)=\frac{v_3\cdot u_2}{u_2\cdot u_2}u_2=\frac{0.5}{1.5}(0.5,-0.5,1)=\frac13(0.5,-0.5,1)\approx(0.167,-0.167,0.333)$. $u_3=(0,1,1)-(0.5,0.5,0)-(0.167,-0.167,0.333)=(-0.667,0.667,0.667)$. A common error subtracts the projection onto ONLY the immediately preceding vector ($u_2$ alone), forgetting to ALSO subtract the projection onto $u_1$ — this leaves $u_3$ still NOT orthogonal to $u_1$, since only one of the two required orthogonality conditions was enforced.

**Example 3 (LO2 — normalizing to complete the orthonormal basis)**: Given the orthogonal set $u_1=(1,1,0)$ (norm $\sqrt2$) from Example 1, normalize: $\hat u_1=\frac{1}{\sqrt2}(1,1,0)=(0.707,0.707,0)$. Repeat for each $u_i$ in the set, dividing by its own norm, to complete the orthonormal basis.

## Component 5 — Teaching Actions

### Teaching Action A01 — Subtract the Projection onto the First Constructed Vector (Primitive P64: Conceptual Shift)

Work Example 1 in full, connecting the projection subtraction directly to `math.linalg.projection`'s already-mastered formula, verifying orthogonality via a dot-product check afterward.

### Teaching Action A02 — Every New Vector Subtracts Projections onto ALL Previous Vectors (Primitive P06: Contrast Pair)

Work Example 2's full three-vector case, contrasting the CORRECT (subtract onto both $u_1$ and $u_2$) against the flawed (subtract onto $u_2$ only) approaches, verifying the correct version achieves orthogonality to BOTH prior vectors while the flawed version fails against $u_1$. State the rule: "each new vector must have projections subtracted onto EVERY previously constructed orthogonal vector, not just the most recent one — the process accumulates constraints as it proceeds."

- **MC-1 hook**: this directly targets MC-1 (subtracting the projection onto only the immediately preceding vector).

### Teaching Action A03 — Normalize Last, After All Orthogonalization Is Complete (Primitive P11: Representation Shift)

Work Example 3, explicitly separating the orthogonalization phase (producing $u_i$'s) from the normalization phase (producing $\hat u_i$'s), reinforcing this as a distinct final step.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Orthogonalize $v_1=(1,0,0)$, $v_2=(1,1,0)$, finding $u_1,u_2$.
  2. Continue with $v_3=(1,1,1)$, finding $u_3$ (subtracting projections onto BOTH $u_1$ and $u_2$).
  3. Normalize the orthogonal set $\{(1,0,0),(0,2,0),(0,0,3)\}$ into an orthonormal set.
  4. Explain, in one sentence, why the third vector in a Gram-Schmidt process requires subtracting TWO projections, not just one.
- **P76 (Transfer Probe, mode = independence)**: "A signal-processing engineer needs to find an orthonormal basis for a 3-dimensional signal subspace spanned by three measured signal vectors $v_1,v_2,v_3$ (linearly independent but not orthogonal), so that signal components can be analyzed independently along each basis direction. (a) Outline the Gram-Schmidt steps needed to construct $u_1,u_2,u_3$ from $v_1,v_2,v_3$, being explicit about which projections must be subtracted at each step. (b) Explain, in engineering terms, why an ORTHOGONAL (or orthonormal) basis specifically is valuable here — connecting to the idea that components along orthogonal directions can be analyzed independently, without one direction's signal 'leaking' into another's measurement."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GRAM-SCHMIDT-PROJECTION-SUBTRACTED-ONLY-FROM-IMMEDIATE-PREDECESSOR | Subtracting the projection onto only the most recently constructed orthogonal vector, rather than onto ALL previously constructed vectors | Foundational |
| MC-2 | ORTHOGONALIZATION-AND-NORMALIZATION-STEPS-CONFLATED | Normalizing vectors partway through the orthogonalization process rather than completing all orthogonalization first, potentially corrupting later projection computations | Moderate |
| MC-3 | ORTHOGONALITY-RESULT-NOT-VERIFIED | Not checking the constructed vectors' pairwise dot products equal zero, missing a computational error in the projection subtraction steps | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Gram-Schmidt Projection Subtracted Only from Immediate Predecessor") → P41 (detect: present Example 2 and check whether both $u_1$ and $u_2$ projections are subtracted from $v_3$) → P64 (conceptual shift: re-verify $u_3$'s dot product with BOTH $u_1$ and $u_2$, showing the flawed version fails against $u_1$ specifically).
- **B02 (targets MC-2)**: P27 ("Orthogonalization and Normalization Steps Conflated") → P41 (detect: review a submitted process for premature normalization mid-sequence) → P64 (conceptual shift: re-derive by completing the FULL orthogonal set first, only normalizing as a distinct final pass).
- **B03 (targets MC-3)**: P27 ("Orthogonality Result Not Verified") → P41 (detect: review a submitted Gram-Schmidt result for a missing verification step) → P64 (conceptual shift: re-compute all pairwise dot products among the constructed vectors, confirming each equals zero).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.orthogonal-basis`, `math.linalg.projection`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.qr-factorization` (the direct application this process underlies).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept's iterative, accumulating structure (each step depending on ALL prior results) makes it genuinely more demanding than a single-formula application.
- MC-1 was ranked most severe because it is the single most common procedural error in Gram-Schmidt, growing MORE likely to occur as the vector count increases (easy to forget an earlier vector once several projections have been subtracted) — exactly where the process becomes most valuable and most error-prone simultaneously.
- The signal-processing transfer probe was deliberately chosen because orthogonal bases have genuine, intuitive value in that field (independent, non-interfering signal components), giving Gram-Schmidt's abstract output concrete engineering purpose beyond a pure linear-algebra exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.orthogonal-basis`, `math.linalg.projection`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: arrow diagrams of successive subtraction before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Determinant Properties (`math.linalg.det-properties`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.det-properties` |
| name | Determinant Properties |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.determinant` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Key properties: det(AB)=det(A)det(B), det(Aᵀ)=det(A), det(cA)=cⁿdet(A), det(A⁻¹)=1/det(A). Row operations: swap changes sign, scaling multiplies det by scalar, adding row multiples leaves det unchanged.

 |

## Component 1 — Learning Objectives

- LO1: Apply the multiplicative property $\det(AB)=\det(A)\det(B)$ and the transpose property $\det(A^T)=\det(A)$.
- LO2: Apply the scalar property $\det(cA)=c^n\det(A)$ (for an $n\times n$ matrix) — correctly using the exponent $n$, NOT a plain multiplicative factor of $c$.
- LO3: Track how each ROW OPERATION affects the determinant: a row SWAP flips the sign; SCALING a row by $c$ multiplies the determinant by $c$; ADDING a multiple of one row to another leaves the determinant UNCHANGED.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.determinant` (what a determinant computes) — this concept catalogs how determinants behave under common operations.

## Component 3 — Core Explanation

Key determinant properties: $\det(AB)=\det(A)\det(B)$ (multiplicative over matrix products); $\det(A^T)=\det(A)$ (transposing doesn't change the determinant); $\det(cA)=c^n\det(A)$ for an $n\times n$ matrix (scaling EVERY entry by $c$ scales the determinant by $c^n$, since EVERY row is scaled, and each row-scaling multiplies the determinant by one factor of $c$); $\det(A^{-1})=\frac{1}{\det(A)}$ (a direct consequence of the multiplicative property, since $\det(A)\det(A^{-1})=\det(AA^{-1})=\det(I)=1$).

**Row operations** affect the determinant predictably: SWAPPING two rows FLIPS the sign of the determinant; SCALING a single row by $c$ MULTIPLIES the determinant by $c$ (note: this is different from scaling the WHOLE matrix, which affects EVERY row); ADDING a multiple of one row to another LEAVES the determinant UNCHANGED.

## Component 4 — Worked Examples

**Example 1 (LO2 — scalar property uses cⁿ, breaking MC-1)**: For a $3\times3$ matrix $A$ with $\det(A)=5$, find $\det(2A)$. Using $\det(cA)=c^n\det(A)$ with $n=3$: $\det(2A)=2^3\times5=8\times5=40$. A common error computes $\det(2A)=2\times5=10$ instead, using $c$ directly rather than $c^n$ — since EVERY one of the 3 rows gets scaled by 2, the determinant picks up a factor of 2 THREE times (once per row), not just once.

**Example 2 (LO3 — row operations' distinct effects, breaking MC-2)**: For a matrix with $\det(A)=7$: swapping two rows gives a new determinant of $-7$ (sign flip); scaling ONE row by 3 (not the whole matrix) gives a new determinant of $3\times7=21$ (a SINGLE factor of 3, since only one row was scaled — contrast this with Example 1's whole-matrix scaling, which would use $3^n$); adding $2\times$ row 1 to row 2 leaves the determinant UNCHANGED at $7$. A common error confuses "scaling one row" (multiply determinant by that one factor) with "scaling the whole matrix" (multiply by that factor raised to the power $n$) — these are genuinely different operations with different effects.

**Example 3 (LO1 — multiplicative and transpose properties)**: Given $\det(A)=3$ and $\det(B)=4$: $\det(AB)=3\times4=12$. Given $\det(A)=3$: $\det(A^T)=3$ (unchanged by transposing). Given $\det(A)=5$: $\det(A^{-1})=\frac15$ (the reciprocal, directly following from the multiplicative property applied to $AA^{-1}=I$).

## Component 5 — Teaching Actions

### Teaching Action A01 — Whole-Matrix Scaling Uses the Exponent n (Primitive P06: Contrast Pair)

Work Example 1's correct $2^3\times5=40$ against the flawed $2\times5=10$, explicitly reasoning through why EVERY row (all 3 of them) contributes its own factor of 2. State the rule: "scaling the WHOLE matrix by $c$ scales the determinant by $c^n$ — one factor of $c$ per row, since every row is affected."

- **MC-1 hook**: this directly targets MC-1 (using $c$ instead of $c^n$ for whole-matrix scaling).

### Teaching Action A02 — Single-Row Scaling vs. Whole-Matrix Scaling (Primitive P06: Contrast Pair, second pairing)

Work Example 2, explicitly contrasting single-row scaling (factor of $c$ once) against whole-matrix scaling (factor of $c^n$, from Example 1), showing these are genuinely different operations with different determinant effects. State the rule: "count how many ROWS are actually being scaled — one row scaled means one factor of $c$; the WHOLE matrix scaled means $n$ factors of $c$."

- **MC-2 hook**: this directly targets MC-2 (confusing single-row scaling with whole-matrix scaling).

### Teaching Action A03 — Multiplicative and Transpose Properties (Primitive P64: Conceptual Shift)

Work Example 3, applying each property directly, connecting $\det(A^{-1})=1/\det(A)$ back to the multiplicative property via $AA^{-1}=I$ as a derivation, not an isolated fact.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Given $\det(A)=6$ for a $2\times2$ matrix, find $\det(3A)$.
  2. Given $\det(A)=4$, find the determinant after swapping two rows of $A$, and after scaling just ONE row of $A$ by 5.
  3. Given $\det(A)=2$ and $\det(B)=7$, find $\det(AB)$ and $\det(A^{-1})$.
  4. Explain, in one sentence, why scaling an entire $n\times n$ matrix by $c$ multiplies its determinant by $c^n$ rather than just $c$.
- **P76 (Transfer Probe, mode = independence)**: "An economist models a $3\times3$ input-output matrix $A$ with $\det(A)=8$, representing the sensitivity of an economic system. (a) If every entry in the matrix is doubled (representing all sector interactions scaling up uniformly), find the new determinant. (b) If instead only ONE sector's row is doubled (representing just that sector's outputs doubling, others unchanged), find the new determinant — explain, using this lesson's distinction, why these two scenarios (whole-matrix vs. single-row scaling) give different results despite both involving 'doubling by 2.'"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SCALAR-DETERMINANT-PROPERTY-USES-C-INSTEAD-OF-C-TO-THE-N | Computing $\det(cA)$ as $c\det(A)$ rather than the correct $c^n\det(A)$ for an $n\times n$ matrix | Foundational |
| MC-2 | SINGLE-ROW-SCALING-CONFUSED-WITH-WHOLE-MATRIX-SCALING | Applying the whole-matrix scaling rule ($c^n$) when only a single row was actually scaled (which should use just $c$), or vice versa | Foundational |
| MC-3 | ROW-SWAP-SIGN-CHANGE-FORGOTTEN | Forgetting that swapping two rows flips the determinant's sign, treating a row-swapped matrix as having the same determinant | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Scalar Determinant Property Uses C Instead of C^n") → P41 (detect: present Example 1 and check whether $2^3\times5$ or $2\times5$ is computed) → P64 (conceptual shift: re-derive by tracking each of the 3 rows individually, showing each contributes its own factor of 2, multiplying to $2^3$).
- **B02 (targets MC-2)**: P27 ("Single-Row Scaling Confused with Whole-Matrix Scaling") → P41 (detect: present Example 2 and check whether the single-row-scaling case uses $3^n$ instead of just $3$) → P64 (conceptual shift: re-count exactly how many rows were actually affected by the described scaling operation before applying the corresponding rule).
- **B03 (targets MC-3)**: P27 ("Row Swap Sign Change Forgotten") → P41 (detect: present a row-swap scenario and check whether the sign flip is applied) → P64 (conceptual shift: re-verify via a small concrete 2×2 example, computing the determinant before and after an explicit row swap).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.determinant`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.cofactor-expansion` (a computational method whose results these properties constrain and verify).

## Component 8 — Teaching Notes

- estimated_hours = 3 and mastery_threshold = 0.90 reflect that this is a fact-heavy concept where each property must be applied precisely — errors here (especially MC-1/MC-2) silently propagate wrong scaling factors into later determinant-based computations.
- MC-1 and MC-2 are tied for foundational severity because they represent the SAME underlying confusion (how many rows are actually affected by a scaling operation) manifesting in two related but distinct scenarios.
- The economics transfer probe was deliberately designed to present BOTH scaling scenarios (whole-matrix and single-row) side by side using the same base numbers, directly testing whether the distinction between MC-1 and MC-2's error patterns is genuinely internalized rather than memorized as two separate disconnected facts.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.determinant`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

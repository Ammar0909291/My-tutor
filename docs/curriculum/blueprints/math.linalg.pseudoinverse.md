# Teaching Blueprint: Moore-Penrose Pseudoinverse (`math.linalg.pseudoinverse`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.pseudoinverse` |
| name | Moore-Penrose Pseudoinverse |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.linalg.svd` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A⁺ = VΣ⁺Uᵀ where Σ⁺ inverts each nonzero singular value and leaves zero singular values as zero. Gives the minimum-norm least squares solution x̂=A⁺b for any system Ax=b.

 |

## Component 1 — Learning Objectives

- LO1: Construct the pseudoinverse $A^+=V\Sigma^+U^T$ from a matrix's SVD $A=U\Sigma V^T$, where $\Sigma^+$ INVERTS each NONZERO singular value (i.e., $\sigma_i\to1/\sigma_i$) and leaves ZERO singular values as ZERO (never attempting to invert 0, which would be undefined).
- LO2: Use $\hat{x}=A^+b$ to find the MINIMUM-NORM least-squares solution to $Ax=b$ — for ANY matrix $A$, even ones with no exact solution (overdetermined) or infinitely many solutions (underdetermined) — recognizing this as the pseudoinverse's genuine universal applicability, unlike the ordinary inverse which requires a square, invertible matrix.
- LO3: Recognize that when $A$ IS square and invertible, $A^+=A^{-1}$ EXACTLY — the pseudoinverse generalizes the ordinary inverse rather than replacing it.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.svd` — the pseudoinverse is built directly from a matrix's SVD.

## Component 3 — Core Explanation

The **Moore-Penrose pseudoinverse** $A^+$ generalizes matrix inversion to EVERY matrix, even non-square or non-invertible ones. Given $A$'s SVD $A=U\Sigma V^T$, the pseudoinverse is $A^+=V\Sigma^+U^T$, where $\Sigma^+$ is formed by INVERTING each NONZERO singular value ($\sigma_i\to1/\sigma_i$) and leaving any ZERO singular value UNCHANGED (as 0) — never attempting to divide by zero.

Its central use: for ANY system $Ax=b$ (whether it has no exact solution, exactly one, or infinitely many), $\hat{x}=A^+b$ gives the MINIMUM-NORM least-squares solution — the "best" solution in a precise sense: among all vectors $x$ that minimize $|Ax-b|$ (getting as close to solving the system as possible), $\hat{x}=A^+b$ is the one with the SMALLEST norm itself.

Crucially, when $A$ IS square and genuinely invertible, $A^+=A^{-1}$ EXACTLY — the pseudoinverse is a strict GENERALIZATION of the ordinary inverse, agreeing with it perfectly whenever the ordinary inverse exists, and extending sensibly to cases where it doesn't.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing Σ⁺, breaking MC-1)**: For $\Sigma=\begin{pmatrix}2&0&0\\0&5&0\\0&0&0\end{pmatrix}$ (a $3\times3$ diagonal matrix with singular values 2, 5, and 0), construct $\Sigma^+$. Invert the NONZERO entries: $1/2$ and $1/5$; leave the ZERO entry as 0: $\Sigma^+=\begin{pmatrix}1/2&0&0\\0&1/5&0\\0&0&0\end{pmatrix}$. A common error attempts to invert EVERY entry including the zero (producing an undefined $1/0$, or incorrectly writing some placeholder like "$\infty$" or simply skipping that position) — the zero-singular-value case is meant to be left as EXACTLY 0, by definition, precisely because there's nothing to invert there (that transformation mode has no strength at all).

**Example 2 (LO2 — minimum-norm least-squares solution)**: For an UNDERDETERMINED system $Ax=b$ (more unknowns than equations, so infinitely many exact solutions exist), $\hat{x}=A^+b$ specifically picks out the solution with the SMALLEST norm among all the infinitely many valid solutions — not merely "a" solution, but the uniquely shortest one, useful when a physical or numerical reason favors the most economical/minimal solution.

**Example 3 (LO3 — pseudoinverse reduces to ordinary inverse, breaking MC-2)**: For an invertible $2\times2$ matrix $A$ with SVD $A=U\Sigma V^T$ (all singular values nonzero), compute $A^+=V\Sigma^{-1}U^T$ and verify $A^+=A^{-1}$ directly by checking $A^+A=I$. A common error assumes the pseudoinverse must ALWAYS differ from the ordinary inverse (treating them as fundamentally separate objects, even for square invertible matrices) — but they coincide EXACTLY whenever $A^{-1}$ exists; the pseudoinverse only introduces genuinely new behavior when the ordinary inverse does NOT exist.

## Component 5 — Teaching Actions

### Teaching Action A01 — Σ⁺ Inverts Nonzero Entries, Leaves Zero Entries as Zero (Primitive P64: Conceptual Shift)

Work Example 1, explicitly handling the zero singular value case separately and explaining why it must stay 0.

- **MC-1 hook**: check whether zero singular values are correctly left as 0 (not inverted or treated as undefined/infinite).

### Teaching Action A02 — Minimum-Norm Solution Among Infinitely Many (Primitive P11: Representation Shift)

Work Example 2, contrasting the pseudoinverse's SPECIFIC minimum-norm choice against the broader set of ALL valid solutions to an underdetermined system.

### Teaching Action A03 — Pseudoinverse Equals Ordinary Inverse When It Exists (Primitive P06: Contrast Pair)

Work Example 3, explicitly verifying $A^+A=I$ for an invertible matrix, then contrasting with a non-invertible case (recalling Example 1's zero-singular-value scenario) where they necessarily diverge.

- **MC-2 hook**: this directly targets MC-2 (assuming the pseudoinverse always differs from the ordinary inverse).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given $\Sigma=\text{diag}(4,0,2)$, construct $\Sigma^+$.
  2. Explain, in one sentence, why a zero singular value in $\Sigma^+$ must remain 0 rather than being inverted.
  3. For an invertible $3\times3$ matrix $A$, state the relationship between $A^+$ and $A^{-1}$.
  4. Explain what "minimum-norm" means for the solution $\hat{x}=A^+b$ when $Ax=b$ has infinitely many exact solutions.
- **P76 (Transfer Probe, mode = independence)**: "A robotic arm with more joints (degrees of freedom) than needed for a given task has infinitely many joint-angle configurations $x$ that achieve a desired end-effector position $b$ (an underdetermined system $Ax=b$, where $A$ maps joint angles to position). (a) Explain why using the pseudoinverse's solution $\hat{x}=A^+b$ is a sensible engineering choice among the infinitely many valid joint configurations, connecting to the minimum-norm property. (b) In physical terms, explain what a 'minimum-norm' joint-angle solution might correspond to (e.g., the smallest overall joint movement/effort) and why that's often a desirable criterion in robotics."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ZERO-SINGULAR-VALUES-INCORRECTLY-INVERTED-OR-TREATED-AS-UNDEFINED-IN-SIGMA-PLUS | Attempting to invert zero singular values in Σ⁺ (producing an undefined result) instead of correctly leaving them as exactly 0 | Foundational |
| MC-2 | PSEUDOINVERSE-ASSUMED-ALWAYS-DIFFERENT-FROM-ORDINARY-INVERSE | Believing the pseudoinverse always differs from the ordinary inverse, rather than recognizing they coincide exactly when A is square and invertible | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Zero Singular Values Incorrectly Inverted or Treated as Undefined in Σ⁺") → P41 (detect: present Example 1 and check whether the zero entry is handled correctly) → P64 (conceptual shift: re-state the definition explicitly — invert nonzero entries only, leave zero entries unchanged — and connect to the "no strength to invert" interpretation from `math.linalg.singular-values`).
- **B02 (targets MC-2)**: P27 ("Pseudoinverse Assumed Always Different from Ordinary Inverse") → P41 (detect: present Example 3 and check whether $A^+=A^{-1}$ is (incorrectly) rejected for an invertible matrix) → P64 (conceptual shift: re-verify $A^+A=I$ directly for the invertible case, confirming the generalization relationship).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.svd`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.least-squares` (the pseudoinverse's minimum-norm solution IS the least-squares solution for the underdetermined/overdetermined cases).
- **Parent**: `math.linalg.svd`.

## Component 8 — Teaching Notes

- difficulty = expert and estimated_hours = 5 reflect that this concept requires carefully applying SVD's structure to a genuinely new object with a subtle special-case (zero singular values) requiring care.
- MC-1 was ranked Foundational because mishandling the zero-singular-value case produces an entirely undefined or nonsensical result, while MC-2 was ranked Moderate since it's a conceptual misunderstanding that doesn't corrupt any actual computation, only the broader mental model.
- The robotic-arm transfer probe was deliberately chosen because minimum-norm solutions to underdetermined systems are a genuinely common and intuitive real-world scenario (redundant actuators), giving the abstract minimum-norm property immediate physical meaning.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.svd`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

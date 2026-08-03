# Teaching Blueprint: Linear Recurrence Relations (`math.disc.linear-recurrence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.linear-recurrence` |
| name | Linear Recurrence Relations |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.disc.recurrence-relation`, `math.alg.polynomial-roots` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | aₙ = c₁aₙ₋₁+⋯+cₖaₙ₋ₖ. Characteristic polynomial r^k−c₁r^{k-1}−⋯=0; distinct roots rᵢ → aₙ=∑Aᵢrᵢⁿ. Repeated roots: polynomial multipliers. Nonhomogeneous case: particular + homogeneous solution.

 |

## Component 1 — Learning Objectives

- LO1: Solve a linear homogeneous recurrence with DISTINCT characteristic roots by forming the characteristic polynomial, solving for its roots, and writing the general solution $a_n=\sum A_ir_i^n$.
- LO2: Solve a linear homogeneous recurrence with a REPEATED characteristic root, correctly using polynomial multipliers ($n$, $n^2$, etc.) for the repeated root's additional solution terms.
- LO3: Solve a NONHOMOGENEOUS recurrence by finding a particular solution plus the general homogeneous solution, and correctly apply initial conditions to determine the constants.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.recurrence-relation` (what a recurrence is) and `math.alg.polynomial-roots` (solving the characteristic polynomial this technique reduces to).

## Component 3 — Core Explanation

A **linear recurrence** $a_n=c_1a_{n-1}+c_2a_{n-2}+\cdots+c_ka_{n-k}$ is solved by forming its **characteristic polynomial** $r^k-c_1r^{k-1}-c_2r^{k-2}-\cdots-c_k=0$ and finding its roots. If the roots $r_1,\ldots,r_k$ are all DISTINCT, the general solution is $a_n=\sum_iA_ir_i^n$, with constants $A_i$ determined by the recurrence's initial conditions.

If a root $r$ REPEATS with multiplicity $m$, its contribution to the general solution becomes $(A_1+A_2n+\cdots+A_mn^{m-1})r^n$ — extra POLYNOMIAL multiplier terms, not just a single repeated $A_ir^n$ term (which would be linearly dependent on itself and fail to capture the full solution space).

For a NONHOMOGENEOUS recurrence $a_n=c_1a_{n-1}+\cdots+f(n)$, the general solution is (particular solution matching the $f(n)$ term) $+$ (general homogeneous solution of the associated homogeneous recurrence).

## Component 4 — Worked Examples

**Example 1 (LO1 — distinct roots)**: Solve $a_n=5a_{n-1}-6a_{n-2}$, $a_0=1,a_1=4$. Characteristic equation: $r^2-5r+6=0\Rightarrow(r-2)(r-3)=0\Rightarrow r=2,3$ (distinct). General solution: $a_n=A_1\cdot2^n+A_2\cdot3^n$. Apply initial conditions: $a_0=A_1+A_2=1$; $a_1=2A_1+3A_2=4$. Solving: $A_2=2$, $A_1=-1$. Final: $a_n=-2^n+2\cdot3^n$.

**Example 2 (LO2 — repeated root, breaking MC-1)**: Solve $a_n=4a_{n-1}-4a_{n-2}$, $a_0=1,a_1=6$. Characteristic equation: $r^2-4r+4=0\Rightarrow(r-2)^2=0\Rightarrow r=2$ (repeated, multiplicity 2). CORRECT general solution: $a_n=(A_1+A_2n)2^n$ — NOT simply $a_n=A_1\cdot2^n$ (which is only one solution and cannot fit two independent initial conditions) and NOT $a_n=A_1\cdot2^n+A_2\cdot2^n$ (which collapses to a single constant $A_1+A_2$, also insufficient). Apply initial conditions: $a_0=A_1=1$; $a_1=(A_1+A_2)\cdot2=6\Rightarrow A_1+A_2=3\Rightarrow A_2=2$. Final: $a_n=(1+2n)2^n$.

**Example 3 (LO3 — nonhomogeneous case)**: Solve $a_n=2a_{n-1}+3$, $a_0=1$. Homogeneous part: $a_n=2a_{n-1}$ has solution $A\cdot2^n$. Particular solution: try a constant $a_n=C$: $C=2C+3\Rightarrow C=-3$. General solution: $a_n=A\cdot2^n-3$. Apply $a_0=1$: $A-3=1\Rightarrow A=4$. Final: $a_n=4\cdot2^n-3$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Characteristic Polynomial, Distinct Roots (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly deriving the characteristic polynomial from the recurrence's coefficients, factoring it, and applying initial conditions as a small linear system.

### Teaching Action A02 — Repeated Roots Need Polynomial Multipliers (Primitive P06: Contrast Pair)

Work Example 2, contrasting the CORRECT solution form $(A_1+A_2n)2^n$ against both flawed simplifications (single term, or a collapsed two-constant version), showing neither can satisfy both initial conditions independently. State the rule: "a root with multiplicity $m$ needs $m$ independent solution terms — achieved by multiplying by increasing powers of $n$, not by writing the same exponential term twice."

- **MC-1 hook**: this contrast directly targets MC-1 (using a single un-multiplied term for a repeated root) by showing the resulting system of equations becomes unsolvable/underdetermined.

### Teaching Action A03 — Nonhomogeneous: Particular Plus Homogeneous (Primitive P11: Representation Shift)

Work Example 3, explicitly separating the SOLVE-in-two-parts structure: find one particular solution matching the extra term, then add the general homogeneous solution, THEN apply initial conditions to the COMBINED general solution (not to the particular solution alone).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Solve $a_n=3a_{n-1}+4a_{n-2}$, $a_0=2,a_1=3$ (distinct roots).
  2. Solve $a_n=6a_{n-1}-9a_{n-2}$, $a_0=1,a_1=9$ (repeated root, multiplicity 2).
  3. Solve $a_n=3a_{n-1}+2$, $a_0=1$ (nonhomogeneous, constant forcing term).
  4. Explain, in one sentence, why a repeated root's general solution needs a polynomial multiplier term rather than a second independent exponential term.
- **P76 (Transfer Probe, mode = independence)**: "A population model for a species follows $P_n=4P_{n-1}-4P_{n-2}+100$ (accounting for a constant annual influx of 100 new individuals), with $P_0=50, P_1=250$. (a) Solve the associated homogeneous recurrence's characteristic equation, and identify whether its root is distinct or repeated. (b) Find the particular solution matching the constant forcing term, then combine with the homogeneous solution and apply the given initial conditions to find the full closed-form formula for $P_n$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | REPEATED-ROOT-MISSING-POLYNOMIAL-MULTIPLIER | Writing a repeated root's general solution term without the required polynomial multiplier ($n$, $n^2$, etc.), producing an under-determined or invalid solution | Foundational |
| MC-2 | INITIAL-CONDITIONS-APPLIED-TO-PARTICULAR-SOLUTION-ONLY | In the nonhomogeneous case, applying initial conditions to the particular solution alone rather than to the FULL combined general solution | Foundational |
| MC-3 | CHARACTERISTIC-POLYNOMIAL-COEFFICIENTS-MISDERIVED | Forming the characteristic polynomial with incorrect signs or coefficient placement from the original recurrence | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Repeated Root Missing Polynomial Multiplier") → P41 (detect: present Example 2 and check whether $(A_1+A_2n)2^n$ or a flawed simplified form is used) → P64 (conceptual shift: attempt to solve the initial-condition system using the flawed form, showing it fails to produce a unique/consistent solution, then re-derive with the multiplier).
- **B02 (targets MC-2)**: P27 ("Initial Conditions Applied to Particular Solution Only") → P41 (detect: present Example 3 and check whether $a_0=1$ is applied to $C=-3$ alone or to the full $A\cdot2^n-3$) → P64 (conceptual shift: re-derive by substituting $n=0$ into the FULL combined general solution before solving for $A$).
- **B03 (targets MC-3)**: P27 ("Characteristic Polynomial Coefficients Misderived") → P41 (detect: review a submitted characteristic polynomial for sign or coefficient errors against the original recurrence) → P64 (conceptual shift: re-derive term by term, substituting $a_n=r^n$ into the recurrence and dividing through by the lowest power of $r$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.recurrence-relation`, `math.alg.polynomial-roots`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared; conceptually connects to `math.disc.catalan-numbers` and `math.disc.stirling-numbers` (both defined via their own recurrences elsewhere in the domain).

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept combines three genuinely distinct solution cases (distinct roots, repeated roots, nonhomogeneous) each with its own structural subtlety, rather than a single uniform procedure.
- MC-1 was ranked most severe because it is the single most common error specifically in the repeated-root case, and it is not always immediately obvious to a student WHY the naive (single-term) solution fails until they attempt to actually solve for the constants and find the system inconsistent.
- The population-model transfer probe was deliberately designed to combine a repeated root with a nonhomogeneous forcing term in one problem, requiring genuine synthesis of LO2 and LO3 together rather than testing each solution case in isolation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.recurrence-relation`, `math.alg.polynomial-roots`) |
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

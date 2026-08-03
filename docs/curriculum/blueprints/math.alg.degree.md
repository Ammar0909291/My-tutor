# Teaching Blueprint: Degree of a Polynomial (`math.alg.degree`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.degree` |
| name | Degree of a Polynomial |
| domain | Algebra |
| difficulty | proficient |
| bloom | remember |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.alg.polynomial` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The highest power of the variable in a polynomial; determines the maximum number of roots and the long-run behavior.

 |

## Component 1 — Learning Objectives

- LO1: Identify the degree of a given polynomial (the highest power of the variable present with a nonzero coefficient).
- LO2: Determine the degree of a MULTIVARIABLE term/polynomial by summing the exponents of all variables within each term, then taking the maximum across terms.
- LO3: State the connection between a polynomial's degree and both the MAXIMUM number of roots it can have and its long-run (end) behavior.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.polynomial` (what a polynomial is, its terms and coefficients) — degree is a specific property read off that structure.

## Component 3 — Core Explanation

The **degree** of a polynomial (in one variable) is the HIGHEST power of the variable appearing with a NONZERO coefficient. For a multivariable term, that term's degree is the SUM of all its variables' exponents; a multivariable polynomial's degree is the MAXIMUM degree among all its terms.

Degree governs two key structural facts: a degree-$n$ polynomial has AT MOST $n$ real roots (and, counting complex roots with multiplicity, EXACTLY $n$ roots, by the Fundamental Theorem of Algebra); and a polynomial's LONG-RUN (end) behavior as $x\to\pm\infty$ is entirely determined by its highest-degree term (the "leading term") — all lower-degree terms become negligible at extreme values of $x$.

## Component 4 — Worked Examples

**Example 1 (LO1 — single-variable degree)**: The polynomial $5x^3-2x^2+7x-1$ has degree $3$ — the highest power of $x$ present (with nonzero coefficient 5).

**Example 2 (LO2 — multivariable degree, breaking MC-1)**: The term $3x^2y^3$ has degree $2+3=5$ (SUM of the exponents of $x$ and $y$ within that single term), NOT degree $3$ (the higher of the two individual exponents) and NOT degree $2$ (just the first variable's exponent). For the full polynomial $3x^2y^3+4xy-x^4$, the degrees of its terms are $5$, $1+1=2$, and $4$ respectively — the polynomial's overall degree is the MAXIMUM of these, which is $5$.

**Example 3 (LO3 — degree determines end behavior and max roots, breaking MC-2)**: A degree-4 polynomial can have AT MOST 4 real roots — a common error assumes a polynomial's degree tells you EXACTLY how many real roots it has, when in fact some roots may be complex (non-real) or repeated, so the ACTUAL number of distinct real roots can be less than the degree (e.g. $x^4+1$ has degree 4 but ZERO real roots, since $x^4=-1$ has no real solution — all four roots are complex).

## Component 5 — Teaching Actions

### Teaching Action A01 — Identify the Highest Power with a Nonzero Coefficient (Primitive P64: Conceptual Shift)

Work Example 1, scanning each term to identify its individual power of $x$, then selecting the maximum among those with genuinely nonzero coefficients.

### Teaching Action A02 — Multivariable Terms: Sum the Exponents Within Each Term (Primitive P06: Contrast Pair)

Work Example 2's full derivation, contrasting the correct SUM-of-exponents-within-a-term approach against the flawed "just use the larger individual exponent" guess, showing the discrepancy (5 vs. 3). State the rule: "for a term with multiple variables, ADD their exponents together to get that term's degree — then take the maximum across all terms in the polynomial."

- **MC-1 hook**: this directly targets MC-1 (using the max individual exponent instead of the sum, for a multivariable term).

### Teaching Action A03 — Degree Gives a Maximum Root Count, Not an Exact One (Primitive P06: Contrast Pair, second pairing)

Work Example 3's $x^4+1$ case, showing a degree-4 polynomial can have zero real roots, to directly counter the assumption that degree always equals the exact real-root count. State the rule: "degree $n$ means AT MOST $n$ real roots — the actual count can be smaller, since some roots may be complex or repeated."

- **MC-2 hook**: this directly targets MC-2 (assuming degree exactly equals the real-root count).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. State the degree of $7x^5-3x^2+9$.
  2. State the degree of the term $4x^3y^2$, and the degree of the full polynomial $4x^3y^2+x^5-2y$.
  3. State the maximum possible number of real roots for a degree-6 polynomial.
  4. Explain, in one sentence, why $x^2+1$ (degree 2) has zero real roots despite its degree suggesting up to 2 roots are possible.
- **P76 (Transfer Probe, mode = independence)**: "A physicist models a projectile's height over time with the polynomial $h(t)=-5t^2+20t+2$ (degree 2, giving a parabolic path). (a) State the maximum number of times this height could equal zero (i.e. the projectile hits the ground), based on the polynomial's degree. (b) A colleague models a different, more complex trajectory with a degree-4 polynomial and claims 'this means the object will hit the ground at exactly 4 different times' — explain, using this lesson's max-vs-exact-root-count distinction, why this claim is not necessarily correct."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MULTIVARIABLE-TERM-DEGREE-COMPUTED-AS-MAX-NOT-SUM | Computing a multivariable term's degree as the largest individual variable exponent rather than the sum of all exponents in that term | Foundational |
| MC-2 | DEGREE-ASSUMED-TO-EQUAL-EXACT-REAL-ROOT-COUNT | Believing a polynomial's degree tells you the EXACT number of real roots, rather than only an upper bound | Foundational |
| MC-3 | ZERO-COEFFICIENT-TERM-INCLUDED-IN-DEGREE-DETERMINATION | Including a term whose coefficient is actually zero when determining the polynomial's degree, overstating the true degree | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Multivariable Term Degree Computed as Max Not Sum") → P41 (detect: present Example 2's $3x^2y^3$ term and check whether degree 5 or degree 3 is reported) → P64 (conceptual shift: re-derive by expanding the term's meaning — $x^2y^3=x\cdot x\cdot y\cdot y\cdot y$, five factors total — grounding the sum-of-exponents rule concretely).
- **B02 (targets MC-2)**: P27 ("Degree Assumed to Equal Exact Real Root Count") → P41 (detect: present Example 3's $x^4+1$ case and check whether "exactly 4 real roots" is assumed) → P64 (conceptual shift: attempt to solve $x^4=-1$ directly, showing no real number satisfies it, confirming the degree only bounds the root count from above).
- **B03 (targets MC-3)**: P27 ("Zero Coefficient Term Included in Degree Determination") → P41 (detect: present a polynomial with an explicitly zero-coefficient high-degree term and check whether it's counted) → P64 (conceptual shift: re-scan the polynomial, explicitly excluding any term whose coefficient is genuinely zero before determining the degree).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.polynomial`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 1 and bloom = remember reflect that this concept is a quick, high-precision READING skill off an already-understood polynomial structure.
- mastery_threshold = 0.95 (among the highest in this batch) reflects that degree is referenced constantly throughout later polynomial work (root-counting, end-behavior analysis, factoring strategy selection), so even small errors here compound broadly.
- MC-2 was deliberately given equal foundational weight to MC-1 despite being more conceptual than computational, because the "degree = exact root count" misconception is an unusually persistent and consequential one, directly undermining correct reasoning about the Fundamental Theorem of Algebra encountered in later, more advanced concepts.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.polynomial`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

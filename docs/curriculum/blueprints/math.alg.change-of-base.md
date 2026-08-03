# Teaching Blueprint: Change of Base Formula (`math.alg.change-of-base`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.change-of-base` |
| name | Change of Base Formula |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.alg.logarithm-properties` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | logₐ(x) = log_b(x) / log_b(a) for any valid base b; allows computation using any convenient base (typically 10 or e).

 |

## Component 1 — Learning Objectives

- LO1: Apply the change-of-base formula $\log_a(x)=\frac{\log_b(x)}{\log_b(a)}$ to evaluate a logarithm in a base not directly available on a calculator (typically converting to base 10 or base $e$).
- LO2: Correctly identify which quantity goes in the NUMERATOR (the original argument $x$) versus the DENOMINATOR (the original base $a$) — a common point of reversal.
- LO3: Recognize the formula works for ANY valid new base $b$ (not just 10 or $e$), and that the result is the SAME regardless of which convenient base is chosen.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.logarithm-properties` (the general logarithm laws this formula extends).

## Component 3 — Core Explanation

The **change-of-base formula** $\log_a(x)=\frac{\log_b(x)}{\log_b(a)}$ lets a logarithm in ANY base $a$ be computed using logarithms in a DIFFERENT, more convenient base $b$ — typically base 10 (denoted $\log$) or base $e$ (denoted $\ln$), since these are the bases standard calculators provide directly.

The formula's structure: the ORIGINAL ARGUMENT $x$ goes in the numerator; the ORIGINAL BASE $a$ goes in the denominator — both expressed as logarithms in the SAME new base $b$. This works for genuinely ANY valid choice of $b$ (any positive number $\ne1$), and different choices of $b$ always produce the SAME final numerical result for $\log_a(x)$.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — basic application)**: Evaluate $\log_5(12)$ using base 10: $\log_5(12)=\frac{\log(12)}{\log(5)}\approx\frac{1.079}{0.699}\approx1.544$.

**Example 2 (LO2 — numerator/denominator roles, breaking MC-1)**: Evaluate $\log_3(50)$ using base 10. Correct setup: $\log_3(50)=\frac{\log(50)}{\log(3)}\approx\frac{1.699}{0.477}\approx3.561$. A common error inverts the fraction, computing $\frac{\log(3)}{\log(50)}$ instead — the ORIGINAL BASE (3) must go in the DENOMINATOR and the ORIGINAL ARGUMENT (50) in the NUMERATOR; reversing these gives the RECIPROCAL of the correct answer, a completely different (and generally much smaller, since it inverts a number greater than 1) result.

**Example 3 (LO3 — any base gives the same result)**: Evaluate $\log_2(7)$ using base 10: $\frac{\log(7)}{\log(2)}\approx\frac{0.845}{0.301}\approx2.807$. Evaluate the SAME $\log_2(7)$ using base $e$ (natural log) instead: $\frac{\ln(7)}{\ln(2)}\approx\frac{1.946}{0.693}\approx2.807$ — the SAME result, confirming the choice of new base $b$ doesn't affect the final answer, only the convenience of computation.

## Component 5 — Teaching Actions

### Teaching Action A01 — Argument on Top, Base on Bottom (Primitive P64: Conceptual Shift)

Work Example 1, explicitly labeling which quantity is the original argument (12) and which is the original base (5) BEFORE substituting into the formula, reinforcing correct placement from the start.

### Teaching Action A02 — Reversed Fraction Gives the Reciprocal, Not the Answer (Primitive P06: Contrast Pair)

Work Example 2, contrasting the correct setup against the flipped version, computing BOTH results numerically to show they are genuinely different (reciprocal) values, not just cosmetically different notations. State the rule: "argument goes on TOP, base goes on BOTTOM — flipping this gives you the reciprocal of the correct answer, not an equally-valid alternative."

- **MC-1 hook**: this directly targets MC-1 (inverting the numerator/denominator roles).

### Teaching Action A03 — Any Valid New Base Gives the Same Result (Primitive P11: Representation Shift)

Work Example 3's dual computation (base 10 vs. base $e$), showing both converge to the same numerical answer, reinforcing that the formula's flexibility in choosing $b$ is genuinely a convenience, not a source of ambiguity in the final result.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Evaluate $\log_4(30)$ using base 10, showing the setup explicitly.
  2. Evaluate $\log_7(15)$ using base $e$ (natural log).
  3. Given a computed value $\frac{\log(6)}{\log(9)}$, identify what logarithm expression $\log_a(x)$ this represents (i.e. what are $a$ and $x$).
  4. Explain, in one sentence, why $\log_3(50)$ and its reversed-fraction computation give reciprocal, not equal, results.
- **P76 (Transfer Probe, mode = independence)**: "A sound-engineering formula requires computing $\log_2(1000)$ (relating to a doubling/octave scale) but the available calculator only computes $\log_{10}$ and $\ln$. (a) Use the change-of-base formula with base 10 to evaluate $\log_2(1000)$. (b) Verify your answer by re-computing using base $e$ instead, confirming both methods agree, and explain why an engineer might prefer one base over the other purely for calculator convenience despite both giving identical results."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CHANGE-OF-BASE-NUMERATOR-DENOMINATOR-REVERSED | Placing the original base in the numerator and the original argument in the denominator, inverting the correct formula structure | Foundational |
| MC-2 | DIFFERENT-CHOSEN-BASES-ASSUMED-TO-GIVE-DIFFERENT-ANSWERS | Believing the choice of new base $b$ affects the final numerical result, rather than recognizing it only affects the computation's convenience | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Change of Base Numerator/Denominator Reversed") → P41 (detect: present Example 2 and check whether $\frac{\log50}{\log3}$ or the reversed $\frac{\log3}{\log50}$ is computed) → P64 (conceptual shift: re-derive by explicitly labeling "argument on top, base on bottom" before substituting, and numerically comparing both versions to show they're reciprocals).
- **B02 (targets MC-2)**: P27 ("Different Chosen Bases Assumed to Give Different Answers") → P41 (detect: ask whether $\log_2(7)$ computed via base 10 vs. base $e$ should give the same or different results) → P64 (conceptual shift: re-compute Example 3 with both bases side by side, confirming numerical agreement).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.logarithm-properties`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.logarithmic-equations` (uses this formula when solving equations involving logarithms of uncommon bases).

## Component 8 — Teaching Notes

- estimated_hours = 2 reflects that this concept is a direct, single-formula application, with MC-1's numerator/denominator placement being the primary point of difficulty.
- MC-1 was ranked most severe because it produces the RECIPROCAL of the correct answer — a plausible-looking but numerically very different result, especially misleading since both the correct and flipped answers are legitimate-looking decimal numbers with no obvious red flag.
- The sound-engineering transfer probe was deliberately designed to require the SAME quantity computed via two different bases (part (b)), directly testing MC-2's correction by requiring genuine cross-verification rather than accepting a single computation at face value.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.logarithm-properties`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
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

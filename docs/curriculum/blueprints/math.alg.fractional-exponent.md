# Teaching Blueprint: Fractional Exponents (`math.alg.fractional-exponent`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.fractional-exponent` |
| name | Fractional Exponents |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.alg.exponent-rules`, `math.alg.radicals` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ; bridge between radical and exponential notation, enabling uniform treatment of roots as powers.

 |

## Component 1 — Learning Objectives

- LO1: Convert between fractional-exponent notation $a^{m/n}$ and radical notation $\sqrt[n]{a^m}$ or $(\sqrt[n]{a})^m$.
- LO2: Evaluate a fractional-exponent expression by choosing the MORE CONVENIENT of the two equivalent forms — usually taking the root FIRST (smaller numbers) rather than the power first (potentially much larger numbers).
- LO3: Correctly identify the ROLE of each part of the fraction $m/n$: the DENOMINATOR $n$ is the root's index, the NUMERATOR $m$ is the power — not the reverse.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.exponent-rules` (the general exponent laws this notation must remain consistent with) and `math.alg.radicals` (root notation, the other half of this concept's equivalence).

## Component 3 — Core Explanation

A **fractional exponent** $a^{m/n}$ is defined as $\sqrt[n]{a^m}$, equivalently $(\sqrt[n]{a})^m$ — these two forms are mathematically equivalent (by the exponent rules), giving flexibility in HOW to compute. In this notation: the DENOMINATOR $n$ of the fraction is the ROOT's index (which root to take); the NUMERATOR $m$ is the POWER (what power to raise to).

Since both forms are equivalent, choosing the order WISELY matters for practical computation: taking the root FIRST, then raising to the power (i.e. $(\sqrt[n]{a})^m$) generally keeps the numbers SMALLER and more manageable than raising to the power first and then taking a root of a much larger number.

## Component 4 — Worked Examples

**Example 1 (LO1 — converting notation)**: $8^{2/3}$ can be written as $\sqrt[3]{8^2}=\sqrt[3]{64}$ or as $(\sqrt[3]{8})^2$ — both equal $4$ (verify: $\sqrt[3]{64}=4$, and $(\sqrt[3]{8})^2=2^2=4$).

**Example 2 (LO2 — choosing the more convenient order, breaking MC-1)**: Evaluate $27^{4/3}$. Taking the ROOT first: $(\sqrt[3]{27})^4=3^4=81$ — small, manageable numbers throughout. Taking the POWER first instead: $\sqrt[3]{27^4}=\sqrt[3]{531{,}441}$ — a much larger intermediate number to take a cube root of, though it still equals the same final answer (81) if computed correctly. A common error doesn't consciously choose the more efficient order, defaulting to power-first even when it creates unnecessarily large numbers, increasing the chance of arithmetic error.

**Example 3 (LO3 — which part is the root, which is the power, breaking MC-2)**: Evaluate $16^{3/4}$: here $n=4$ (denominator, the root index) and $m=3$ (numerator, the power). So $16^{3/4}=(\sqrt[4]{16})^3=2^3=8$. A common error swaps these roles, computing $(\sqrt[3]{16})^4$ instead (using the numerator as the root index and the denominator as the power) — a genuinely different (and generally irrational, messier) computation, since $\sqrt[3]{16}$ is not a nice integer.

## Component 5 — Teaching Actions

### Teaching Action A01 — Denominator Is the Root, Numerator Is the Power (Primitive P11: Representation Shift)

Work Example 1, explicitly labeling the fraction $2/3$'s parts — "3 is the root index (bottom), 2 is the power (top)" — before converting to both radical forms, reinforcing correct part-identification from the start.

- **MC-2 hook**: this labeling step directly targets MC-2 (swapping which part of the fraction is the root vs. the power) by requiring explicit identification before any computation.

### Teaching Action A02 — Root First Keeps Numbers Smaller (Primitive P06: Contrast Pair)

Work Example 2's two computation orders side by side, showing both reach the same answer but the root-first approach involves dramatically smaller intermediate numbers. State the rule: "when both orders are valid, take the ROOT first — it almost always keeps the numbers more manageable than raising to the power first."

- **MC-1 hook**: this directly targets MC-1 (not consciously choosing the more efficient computational order).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Convert $9^{3/2}$ to radical notation (both forms) and evaluate.
  2. Evaluate $32^{2/5}$, choosing the more efficient computational order.
  3. Evaluate $81^{3/4}$, correctly identifying which part of the fraction is the root index and which is the power.
  4. Explain, in one sentence, why taking the root first is generally more efficient than raising to the power first when evaluating a fractional exponent by hand.
- **P76 (Transfer Probe, mode = independence)**: "A biology growth-rate formula includes the term $t^{5/2}$ where $t$ is time in some model. (a) Rewrite $t^{5/2}$ in radical notation, correctly identifying which number is the root index and which is the power. (b) For a specific value $t=4$, evaluate $4^{5/2}$ using the more computationally efficient order (root first), showing your work, and explain why this order was preferable to computing $4^5$ first."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POWER-FIRST-COMPUTATION-ORDER-DEFAULTED-TO-INEFFICIENTLY | Computing the power before the root by default, producing unnecessarily large intermediate numbers rather than choosing the more efficient root-first order | Moderate |
| MC-2 | FRACTIONAL-EXPONENT-NUMERATOR-DENOMINATOR-ROLES-SWAPPED | Using the fraction's numerator as the root index and the denominator as the power, reversing the correct roles | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Power-First Computation Order Defaulted To") → P41 (detect: review a submitted evaluation for an unnecessarily large intermediate power-first computation) → P64 (conceptual shift: re-work the same problem root-first, comparing the size of intermediate numbers directly).
- **B02 (targets MC-2)**: P27 ("Fractional Exponent Numerator/Denominator Roles Swapped") → P41 (detect: present Example 3 and check whether $(\sqrt[3]{16})^4$ or the correct $(\sqrt[4]{16})^3$ is computed) → P64 (conceptual shift: re-state the rule explicitly — "denominator is always the root, numerator is always the power" — and re-derive using this labeling before computing).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.exponent-rules`, `math.alg.radicals`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept bridges two previously separate notational systems (exponents and radicals), requiring genuine fluency converting between them in both directions.
- MC-2 was ranked most severe because it represents a genuine structural misreading of the notation itself — swapping numerator/denominator roles produces a completely different (and often much messier) computation, not merely an inefficient path to the right answer.
- The biology growth-rate transfer probe was deliberately chosen to connect this notation to a realistic applied-science context (fractional exponents genuinely appear in growth/decay and allometric scaling formulas), reinforcing that this is not merely an abstract notational exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.exponent-rules`, `math.alg.radicals`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

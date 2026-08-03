# Teaching Blueprint: Limit Laws (`math.calc.limit-laws`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.limit-laws` |
| name | Limit Laws |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.calc.limits` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The sum, difference, product, quotient, and power rules for limits: lim(f±g) = limf ± limg, lim(fg) = (limf)(limg), etc.

 |

## Component 1 — Learning Objectives

- LO1: State and apply the SUM/DIFFERENCE law $\lim(f\pm g)=\lim f\pm\lim g$ and the PRODUCT law $\lim(fg)=(\lim f)(\lim g)$, PROVIDED both individual limits exist.
- LO2: Apply the QUOTIENT law $\lim(f/g)=(\lim f)/(\lim g)$ ONLY when $\lim g\ne0$ — recognizing that a zero denominator limit invalidates the law entirely (requiring a different technique, e.g. factoring or L'Hôpital's rule, not this law).
- LO3: Apply the POWER law $\lim(f^n)=(\lim f)^n$, and recognize that combining several limit laws in sequence (e.g. sum then product) requires each INDIVIDUAL piece's limit to exist first, before combining.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.limits` (the basic definition and evaluation of limits) — these laws formalize how limits combine algebraically.

## Component 3 — Core Explanation

The **Limit Laws** let you compute limits of combined functions from the limits of their pieces, PROVIDED those individual limits exist: $\lim(f\pm g)=\lim f\pm\lim g$ (sum/difference), $\lim(fg)=(\lim f)(\lim g)$ (product), $\lim(f/g)=(\lim f)/(\lim g)$ PROVIDED $\lim g\ne0$ (quotient), and $\lim(f^n)=(\lim f)^n$ (power).

The quotient law's condition ($\lim g\ne0$) is essential: if the denominator's limit is 0, the quotient law simply does NOT APPLY — this doesn't mean the overall limit doesn't exist, only that a DIFFERENT technique (factoring, rationalizing, L'Hôpital's rule) is needed instead of this particular law.

These laws combine: for a more complex expression, apply them piece by piece — e.g. for $\lim(f\cdot g+h)$, first confirm $\lim f$, $\lim g$, $\lim h$ each individually exist, THEN combine via product and sum laws in sequence.

## Component 4 — Worked Examples

**Example 1 (LO1 — sum and product laws)**: Given $\lim_{x\to2}f(x)=3$ and $\lim_{x\to2}g(x)=5$, find $\lim_{x\to2}[f(x)+g(x)]$ and $\lim_{x\to2}[f(x)g(x)]$. Sum: $3+5=8$. Product: $3\times5=15$ — direct application of the sum and product laws.

**Example 2 (LO2 — quotient law's condition, breaking MC-1)**: Given $\lim_{x\to2}f(x)=6$ and $\lim_{x\to2}g(x)=0$, attempt $\lim_{x\to2}[f(x)/g(x)]$. The quotient law does NOT apply here (denominator's limit is 0) — this does NOT mean the limit is automatically 0, undefined-as-"DNE," or equal to $6/0$ treated as some symbolic infinity by rule; it means a DIFFERENT method is needed (e.g. examining the actual functions' behavior near $x=2$, which could yield $+\infty$, $-\infty$, a finite value if there's cancellation, or genuinely not exist). A common error mechanically applies the quotient law anyway, writing "$6/0=$ undefined, so the limit doesn't exist" as if that were a valid application of the LAW itself, rather than recognizing the law's precondition has failed and a separate analysis is required.

**Example 3 (LO3 — combining laws in sequence, breaking MC-2)**: Given $\lim_{x\to1}f(x)=2$, $\lim_{x\to1}g(x)=3$, find $\lim_{x\to1}[f(x)^2\cdot g(x)]$. First confirm both individual limits exist (given), then apply power law: $\lim f^2=2^2=4$; then product law: $4\times3=12$. A common error tries to combine ALL the operations "at once" without verifying each piece exists first — while this usually causes no issue when the pieces are given directly, the LAWS themselves are only valid because each individual piece's limit was confirmed to exist BEFORE combining, a distinction that becomes essential once one piece's limit might NOT exist (as in Example 2).

## Component 5 — Teaching Actions

### Teaching Action A01 — Sum, Product, and Power Laws Combine Piece by Piece (Primitive P64: Conceptual Shift)

Work Example 1 and Example 3, explicitly verifying each individual piece's limit before combining.

- **MC-2 hook**: reinforces checking each piece's limit exists before combining laws in sequence.

### Teaching Action A02 — Quotient Law Requires Nonzero Denominator Limit (Primitive P06: Contrast Pair)

Work Example 2, contrasting the valid quotient-law case (nonzero denominator limit) against the invalid case (zero denominator limit), explicitly stating that a zero-limit denominator means "use a different technique," not "the limit is automatically undefined."

- **MC-1 hook**: this directly targets MC-1 (misapplying the quotient law when its precondition fails).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Given $\lim_{x\to0}f(x)=4$, $\lim_{x\to0}g(x)=-2$, find $\lim_{x\to0}[f(x)-g(x)]$ and $\lim_{x\to0}[f(x)g(x)]$.
  2. Given $\lim_{x\to3}f(x)=10$, $\lim_{x\to3}g(x)=0$, explain why the quotient law cannot be used to evaluate $\lim_{x\to3}[f(x)/g(x)]$, and what should be done instead.
  3. Given $\lim_{x\to5}f(x)=2$, find $\lim_{x\to5}[f(x)^3]$.
  4. Given $\lim_{x\to1}f(x)=3$, $\lim_{x\to1}g(x)=4$, $\lim_{x\to1}h(x)=2$, find $\lim_{x\to1}[f(x)g(x)+h(x)]$, showing which law is applied at each step.
- **P76 (Transfer Probe, mode = independence)**: "An engineer models a signal's total power as $P(x)=A(x)^2+B(x)\cdot C(x)$, where $\lim_{x\to x_0}A(x)=3$, $\lim_{x\to x_0}B(x)=5$, and $\lim_{x\to x_0}C(x)=0$ (the third component's contribution vanishes at $x_0$). (a) Using the limit laws, find $\lim_{x\to x_0}P(x)$, showing each law applied. (b) If instead the engineer needed $\lim_{x\to x_0}[A(x)/C(x)]$, explain why the quotient law cannot be used here, and what this signals about needing a more careful analysis of how $A(x)$ and $C(x)$ behave near $x_0$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | QUOTIENT-LAW-APPLIED-DESPITE-ZERO-DENOMINATOR-LIMIT | Mechanically applying the quotient law even when the denominator's limit is 0, rather than recognizing the law's precondition has failed and a different technique is needed | Foundational |
| MC-2 | LIMIT-LAWS-COMBINED-WITHOUT-VERIFYING-EACH-PIECE-EXISTS-FIRST | Combining several limit laws in sequence without first confirming each individual piece's limit exists | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Quotient Law Applied Despite Zero Denominator Limit") → P41 (detect: present Example 2 and check whether the quotient law is (incorrectly) applied) → P64 (conceptual shift: re-state the law's precondition explicitly, then identify that a different technique — not this law — is required).
- **B02 (targets MC-2)**: P27 ("Limit Laws Combined Without Verifying Each Piece Exists First") → P41 (detect: present Example 3 and check whether pieces are combined without individual verification) → P64 (conceptual shift: re-work the problem verifying each piece's limit explicitly before combining).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.limits`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.calc.limits`.

## Component 8 — Teaching Notes

- estimated_hours = 5 and mastery_threshold = 0.85 reflect that while the laws themselves are simple to state, correctly recognizing WHEN they apply (especially the quotient law's precondition) requires genuine care.
- MC-1 was ranked Foundational because it produces a fundamentally incorrect conclusion (treating a law-inapplicability as evidence the limit doesn't exist) rather than a mere computational slip.
- The signal-power transfer probe was deliberately chosen to make the quotient law's precondition concretely consequential — recognizing when a formula breaks down is a genuinely important engineering-adjacent skill, not just an abstract rule.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.limits`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
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

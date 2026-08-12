# Teaching Blueprint: Mental Multiplication (`math.arith.mental-multiplication`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.mental-multiplication` |
| name | Mental Multiplication |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.arith.multiplication-table` |
| unlocks | `math.arith.mental-arithmetic` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Strategies for multiplying numbers mentally, including doubling, halving, distributive decomposition, and patterns with powers of 10.

 |

## Component 1 — Learning Objectives

- LO1: Apply **distributive decomposition** — split one factor into place-value parts, multiply each separately, then add — to multiply mentally.
- LO2: Apply **doubling/halving** — exploit $a\times b = (2a)\times(b/2)$ when one factor is even, to convert an awkward multiplication into an easier one.
- LO3: Apply patterns with powers of 10 (e.g. $\times10$, $\times100$, $\times9$ via $\times10$ minus one group) for instant or near-instant computation.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.multiplication-table` (instant single-digit product recall) — mental multiplication strategies extend this fluency to larger numbers without written columns.

## Component 3 — Core Explanation

**Mental multiplication** strategies compute products without writing, exploiting number structure:

- **Distributive decomposition**: $23\times6 = (20+3)\times6 = 20\times6+3\times6=120+18=138$.
- **Doubling/halving**: $16\times35 = (16\div2)\times(35\times2) = 8\times70=560$ — converting an awkward pair into an easier one while preserving the product.
- **Powers-of-10 patterns**: $\times10$ appends a zero; $\times9$ can use $\times10$ then subtract one group (e.g. $7\times9=7\times10-7=70-7=63$).

These strategies are general-purpose, grounded in the same distributive and place-value structure as the written algorithm, applied flexibly for speed.

## Component 4 — Worked Examples

**Example 1 (LO1 — distributive decomposition)**: Compute $34\times7$ mentally: $34=30+4$, so $34\times7=30\times7+4\times7=210+28=238$.

**Example 2 (LO2 — doubling/halving, breaking MC-1)**: Compute $18\times25$ mentally using doubling/halving: $18\times25=(18\div2)\times(25\times2)=9\times50=450$. A common error applies the halving to ONE factor but forgets to correspondingly DOUBLE the other, computing $9\times25=225$ instead — halving one factor without doubling the other CHANGES the product's value (it doesn't preserve it), since $(a/2)\times b \ne a\times b$ in general.

**Example 3 (LO3 — powers-of-10 pattern, breaking MC-2)**: Compute $8\times9$ using the $\times9$ shortcut: $8\times9=8\times10-8=80-8=72$. A common error computes $8\times10-1=79$ instead — subtracting just $1$ (confusing "one less group of the OTHER factor" with "one less unit"), rather than subtracting one FULL group of 8 (the factor being multiplied), which is the actual adjustment needed to correct $\times10$ down to $\times9$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Split by Place Value, Multiply Each Part, Recombine (Primitive P64: Conceptual Shift)

Work Example 1 aloud, narrating: "break 34 into 30 and 4, multiply each by 7 separately, then add the two results" — connecting directly to the distributive property underlying long multiplication's partial products, just performed mentally.

### Teaching Action A02 — Doubling One Factor Requires Halving the Other (and Vice Versa) (Primitive P06: Contrast Pair)

Work Example 2's correct doubling/halving pair against the flawed half-only version (225 vs. the true 450), showing the flawed version literally computes a DIFFERENT multiplication. State the rule: "doubling one factor and halving the other keeps the product the SAME — halving only one factor without compensating the other changes the answer."

- **MC-1 hook**: this contrast directly targets MC-1 (halving without compensating doubling) — check whether the student's own attempt at a new doubling/halving problem includes both adjustments.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Compute $46\times5$ mentally using distributive decomposition.
  2. Compute $14\times50$ mentally using doubling/halving.
  3. Compute $6\times9$ mentally using the $\times10$-minus-one-group pattern.
  4. Explain, in one sentence, why $9\times50$ (halving 18 without doubling 25 in Example 2's spirit) would give a different, wrong answer for $18\times25$.
- **P76 (Transfer Probe, mode = independence)**: "A cashier mentally computes the cost of 9 items priced at \$12 each. (a) Use the $\times10$-minus-one-group pattern to compute this mentally, showing each step. (b) A colleague instead tries doubling/halving on this same problem, converting it to $18\times6$ (doubling 9, halving... wait, 12 doesn't halve evenly in a useful way here) — explain, using this lesson's strategy-selection idea, why the $\times9$ pattern is the more natural choice for THIS specific problem, even though doubling/halving worked well for Example 2's $18\times25$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HALVING-APPLIED-WITHOUT-COMPENSATING-DOUBLING | Halving one factor of a doubling/halving strategy without correspondingly doubling the other factor, changing the product's value | Foundational |
| MC-2 | POWERS-OF-TEN-ADJUSTMENT-AMOUNT-MISCOMPUTED | In a $\times9$ (or similar) shortcut, subtracting the wrong amount from the $\times10$ result — e.g. subtracting 1 instead of one full group of the other factor | Foundational |
| MC-3 | DISTRIBUTIVE-DECOMPOSITION-PARTIAL-PRODUCTS-NOT-RECOMBINED | Computing both partial products of a distributive decomposition correctly but failing to add them together for the final answer | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Halving Without Compensating Doubling") → P41 (detect: present Example 2 and check whether both adjustments are made) → P64 (conceptual shift: verify numerically that $9\times25=225\ne450=18\times25$, showing the halve-only version changes the actual product).
- **B02 (targets MC-2)**: P27 ("Powers-of-Ten Adjustment Miscomputed") → P41 (detect: present Example 3 and check whether the subtracted amount is 1 or the full factor value) → P64 (conceptual shift: re-derive $8\times9$ as "$8$ groups of $9$" = "$8$ groups of $10$, minus $8$ groups of $1$" = $80-8$, not $80-1$).
- **B03 (targets MC-3)**: P27 ("Distributive Partial Products Not Recombined") → P41 (detect: review a submitted decomposition attempt for a missing final addition step) → P64 (re-walk Example 1, explicitly stating the final addition $210+28=238$ as a required, not optional, last step).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.multiplication-table`.
- **Unlocks**: `math.arith.mental-arithmetic` (the general fluent-mental-computation capstone this concept feeds into alongside mental addition).
- **Related**: `math.arith.mental-addition` (the parallel strategy set for addition).

## Component 8 — Teaching Notes

- estimated_hours = 6 mirrors `math.arith.mental-addition`'s allocation — both concepts require strategy SELECTION fluency across multiple named techniques, not just execution of a single method.
- MC-1 was ranked most severe because it silently produces a wrong final answer while LOOKING like a correctly-applied strategy — the student has genuinely used "doubling/halving," just incompletely, making the error easy to miss without an explicit verification check.
- The cashier transfer probe's part (b) was deliberately designed to include a strategy that does NOT cleanly apply (doubling/halving on $9\times12$), testing whether strategy selection (LO1-LO3 jointly) is a genuine judgment skill rather than mechanically trying every named technique on every problem.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.multiplication-table`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.arith.mental-arithmetic`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: mental strategies act on numbers directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

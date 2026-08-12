# Teaching Blueprint: Adding Rational Expressions (`math.alg.rational-expressions-addition`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.rational-expressions-addition` |
| name | Adding Rational Expressions |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.alg.rational-expressions` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Adding or subtracting rational expressions requires finding the LCD (least common denominator) — the LCM of the denominators — then combining numerators over the common denominator. |

## Component 1 — Learning Objectives

- LO1: Add or subtract two rational expressions with the SAME denominator by combining numerators directly over the shared denominator.
- LO2: Add or subtract two rational expressions with DIFFERENT denominators by first finding the LEAST COMMON DENOMINATOR (LCD — the LCM of the denominators, factored first if needed), converting each expression, then combining.
- LO3: Simplify the resulting sum/difference, factoring the final numerator and denominator to cancel any common factors, while tracking any EXCLUDED values (denominators that would be zero) throughout.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.rational-expressions` (what a rational expression is, and its domain restrictions) — this concept extends `math.arith.fraction-addition`'s numeric technique to algebraic expressions.

## Component 3 — Core Explanation

Adding/subtracting **rational expressions** parallels adding numeric fractions: SAME denominator, combine numerators directly: $\frac{A}{D}+\frac{B}{D}=\frac{A+B}{D}$. DIFFERENT denominators require first finding the LEAST COMMON DENOMINATOR (LCD) — typically found by FACTORING each denominator and taking the LCM of the factored forms — then rewriting each fraction with that common denominator before combining numerators.

Throughout, the values that make ANY original denominator zero must be tracked as EXCLUDED from the domain — these restrictions persist even if a factor later cancels during simplification, since the ORIGINAL expression was undefined there.

## Component 4 — Worked Examples

**Example 1 (LO1 — same denominator)**: Add $\frac{3x}{x+2}+\frac{5}{x+2}=\frac{3x+5}{x+2}$ (domain restriction: $x\ne-2$).

**Example 2 (LO2 — different denominators via factored LCD, breaking MC-1)**: Add $\frac{1}{x^2-1}+\frac{2}{x+1}$. Factor first: $x^2-1=(x+1)(x-1)$. LCD $=(x+1)(x-1)$ (the SECOND fraction's denominator, $x+1$, is already a FACTOR of the first denominator — the LCD is NOT the product of both unfactored denominators, $(x^2-1)(x+1)$, which would be unnecessarily large). Convert: $\frac{1}{(x+1)(x-1)}+\frac{2(x-1)}{(x+1)(x-1)}=\frac{1+2(x-1)}{(x+1)(x-1)}=\frac{2x-1}{(x+1)(x-1)}$. A common error multiplies the two UNFACTORED denominators together directly ($x^2-1$ times $x+1$) without checking for shared factors first, producing an unnecessarily large (though not technically wrong) common denominator that complicates later simplification.

**Example 3 (LO3 — domain restrictions persist after cancellation, breaking MC-2)**: Simplify $\frac{x^2-4}{x-2}$ (arising as an intermediate or final result of some rational-expression combination). Factoring: $\frac{(x+2)(x-2)}{x-2}=x+2$ — but this simplification is only valid for $x\ne2$ (the original expression is UNDEFINED at $x=2$, even though the simplified form $x+2$ is perfectly well-defined there). A common error drops this restriction after cancellation, treating the simplified expression $x+2$ as equivalent to the original for ALL values of $x$, including $x=2$ — technically, the simplified and original expressions AGREE everywhere except at $x=2$, a subtle but real distinction.

## Component 5 — Teaching Actions

### Teaching Action A01 — Same Denominator: Combine Numerators Directly (Primitive P64: Conceptual Shift)

Work Example 1, connecting directly to `math.arith.fraction-addition`'s already-mastered same-denominator technique, now applied to algebraic numerators.

### Teaching Action A02 — Factor First to Find the Genuine LCD (Primitive P06: Contrast Pair)

Work Example 2, contrasting the efficient factored-LCD approach against the flawed "just multiply both denominators together" shortcut, showing the factored approach yields a smaller, more manageable common denominator. State the rule: "always factor each denominator FIRST — the true LCD often shares factors between denominators, and multiplying unfactored denominators together misses this, creating unnecessary complexity."

- **MC-1 hook**: this directly targets MC-1 (using the product of unfactored denominators instead of the genuine factored LCD).

### Teaching Action A03 — Domain Restrictions Survive Cancellation (Primitive P06: Contrast Pair, second pairing)

Work Example 3, explicitly noting the original expression's undefined point BEFORE simplifying, then confirming this restriction must be carried forward even after the offending factor cancels. State the rule: "an excluded value from the ORIGINAL expression's denominator stays excluded in the simplified form too — cancellation doesn't erase the fact that the original was undefined there."

- **MC-2 hook**: this directly targets MC-2 (dropping domain restrictions after a canceling factor).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Add $\frac{2x}{x-3}+\frac{7}{x-3}$.
  2. Add $\frac{3}{x^2-9}+\frac{1}{x-3}$, factoring first to find the genuine LCD.
  3. Subtract $\frac{5}{x+1}-\frac{2}{x-1}$, finding the LCD (note: no shared factors here, so the LCD is the full product).
  4. Simplify $\frac{x^2-1}{x+1}$, stating the domain restriction that must persist after cancellation.
- **P76 (Transfer Probe, mode = independence)**: "An electronics formula for combined resistance in a parallel circuit involves the expression $\frac{1}{R}=\frac{1}{x}+\frac{1}{x+5}$ (where $x$ and $x+5$ are two component resistances in ohms). (a) Combine the right-hand side into a single rational expression with a common denominator. (b) State the domain restrictions on $x$ implied by the original expression (values that would make either resistance zero or undefined), and explain why these restrictions must be respected even after algebraic simplification, connecting to this lesson's persistence-of-restrictions idea."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LCD-COMPUTED-AS-PRODUCT-OF-UNFACTORED-DENOMINATORS | Multiplying denominators together directly without first factoring to identify and reuse shared factors, producing an unnecessarily large common denominator | Moderate |
| MC-2 | DOMAIN-RESTRICTION-DROPPED-AFTER-CANCELLATION | Losing track of a value excluded by the ORIGINAL expression's denominator once a canceling factor removes it from the simplified form | Foundational |
| MC-3 | NUMERATOR-NOT-RESCALED-WHEN-CONVERTING-TO-COMMON-DENOMINATOR | Changing a fraction's denominator to match the LCD without correspondingly rescaling its numerator by the same factor | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("LCD Computed as Product of Unfactored Denominators") → P41 (detect: present Example 2 and check whether denominators are factored before combining) → P64 (conceptual shift: re-factor each denominator explicitly, identifying the shared factor before forming the genuine LCD).
- **B02 (targets MC-2)**: P27 ("Domain Restriction Dropped After Cancellation") → P41 (detect: present Example 3 and check whether $x\ne2$ is stated alongside the simplified answer) → P64 (conceptual shift: re-examine the ORIGINAL (pre-cancellation) expression's denominator explicitly, confirming the excluded value before any simplification occurs).
- **B03 (targets MC-3)**: P27 ("Numerator Not Rescaled for Common Denominator") → P41 (detect: review a submitted conversion for a numerator left unscaled after the denominator changed) → P64 (conceptual shift: re-derive the equivalent fraction explicitly, multiplying numerator and denominator by the SAME missing factor).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.rational-expressions`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.rational-expressions-multiplication`, `math.alg.rational-equations` (both sibling concepts in this domain's rational-expression cluster).

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects that this concept combines factoring skill, LCD-finding, numerator conversion, and domain-restriction tracking into one multi-step procedure with several distinct failure points.
- MC-2 was ranked most severe because it reflects an incomplete understanding of what algebraic EQUIVALENCE actually means — two expressions that agree everywhere except at one excluded point are not identical functions, a subtlety with real consequences in later work (e.g. removable discontinuities in calculus).
- The parallel-resistance transfer probe was deliberately chosen as a genuine physics/engineering application where the rational-expression combination has direct physical meaning, and where domain restrictions (a resistance of zero being physically nonsensical or undefined) carry real interpretive weight beyond pure algebra.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.rational-expressions`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
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

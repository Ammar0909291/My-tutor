# Teaching Blueprint: Quotient Rule (`math.calc.quotient-rule`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.quotient-rule` |
| name | Quotient Rule |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.calc.product-rule` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | (f/g)' = (f'g − fg')/g²; enables differentiation of quotients; derivable from product rule and chain rule.

 |

## Component 1 — Learning Objectives

- LO1: State and apply the Quotient Rule $\left(\frac{f}{g}\right)'=\frac{f'g-fg'}{g^2}$, correctly identifying which function is $f$ (numerator) and which is $g$ (denominator) BEFORE substituting.
- LO2: Correctly preserve the ORDER of subtraction in the numerator ($f'g-fg'$, NOT $fg'-f'g$) — the quotient rule, unlike the (order-independent) product rule, is order-sensitive because subtraction doesn't commute.
- LO3: Recognize when the PRODUCT rule (rewriting $f/g$ as $f\cdot g^{-1}$ then using chain rule) would work instead, but state why the quotient rule's direct formula is usually more efficient for genuine quotients.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.product-rule` — the quotient rule is derivable from the product rule combined with the chain rule, and shares its "identify the two pieces first" structure.

## Component 3 — Core Explanation

The **Quotient Rule** states: for $h(x)=\frac{f(x)}{g(x)}$, $h'(x)=\frac{f'(x)g(x)-f(x)g'(x)}{[g(x)]^2}$ — abbreviated $\left(\frac{f}{g}\right)'=\frac{f'g-fg'}{g^2}$.

A crucial structural difference from the product rule: the quotient rule's numerator involves SUBTRACTION, and subtraction does NOT commute — so the ORDER matters. It must be $f'g-fg'$ (derivative of the numerator times the denominator, MINUS the numerator times the derivative of the denominator), never the reverse $fg'-f'g$, which would produce the NEGATIVE of the correct answer.

The quotient rule can technically be derived by rewriting $f/g=f\cdot g^{-1}$ and applying the product rule together with the chain rule (since $(g^{-1})'=-g^{-2}g'$) — but for genuine quotients, the quotient rule's direct formula is more efficient, avoiding the extra chain-rule step.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic application, breaking MC-1)**: Differentiate $h(x)=\frac{x^2}{x+1}$. Let $f=x^2$ (so $f'=2x$), $g=x+1$ (so $g'=1$). $h'(x)=\frac{2x(x+1)-x^2(1)}{(x+1)^2}=\frac{2x^2+2x-x^2}{(x+1)^2}=\frac{x^2+2x}{(x+1)^2}$. A common error swaps which function is $f$ and which is $g$ (e.g. treating the denominator as $f$), producing an entirely different — and incorrect — result.

**Example 2 (LO2 — order sensitivity, breaking MC-2)**: Differentiate $h(x)=\frac{\sin x}{x}$. $f=\sin x$ ($f'=\cos x$), $g=x$ ($g'=1$). $h'(x)=\frac{(\cos x)(x)-(\sin x)(1)}{x^2}=\frac{x\cos x-\sin x}{x^2}$. A common error writes the numerator as $(\sin x)(1)-(\cos x)(x)$ — swapping the subtraction order — producing the NEGATIVE of the correct derivative; unlike the product rule (where $f'g+fg'=fg'+f'g$, order-independent due to addition), the quotient rule's SUBTRACTION makes getting the order right essential.

**Example 3 (LO3 — quotient rule vs. product-rule-with-rewriting)**: Differentiate $h(x)=\frac{3}{x^2+1}$ two ways: (a) directly via the quotient rule with $f=3$ ($f'=0$), $g=x^2+1$ ($g'=2x$): $h'(x)=\frac{0\cdot(x^2+1)-3(2x)}{(x^2+1)^2}=\frac{-6x}{(x^2+1)^2}$; (b) by rewriting as $3(x^2+1)^{-1}$ and using the chain rule: $h'(x)=3\cdot(-1)(x^2+1)^{-2}\cdot2x=\frac{-6x}{(x^2+1)^2}$ — SAME answer, but the quotient rule reached it in one direct step, while the rewriting route required an extra chain-rule application.

## Component 5 — Teaching Actions

### Teaching Action A01 — Identify f and g Before Substituting into the Formula (Primitive P64: Conceptual Shift)

Work Example 1, explicitly labeling $f$ and $g$ before writing the formula.

- **MC-1 hook**: check whether $f$ and $g$ are correctly identified as numerator and denominator respectively.

### Teaching Action A02 — Subtraction Order Matters: f'g − fg', Never the Reverse (Primitive P06: Contrast Pair)

Work Example 2, explicitly computing both the correct order and the swapped (incorrect, sign-flipped) order side by side.

- **MC-2 hook**: this directly targets MC-2 (swapping the subtraction order in the numerator).

### Teaching Action A03 — Quotient Rule as the Efficient Shortcut (Primitive P11: Representation Shift)

Work Example 3, comparing the direct quotient-rule route against the product-rule-with-rewriting route, showing both reach the same answer but the quotient rule is more direct.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Differentiate $h(x)=\frac{x^3}{x-2}$.
  2. Differentiate $h(x)=\frac{\cos x}{x^2}$, being careful about the subtraction order.
  3. Differentiate $h(x)=\frac{5}{x+1}$ using the quotient rule.
  4. Explain, in one sentence, why swapping the quotient rule's subtraction order produces the negative of the correct derivative.
- **P76 (Transfer Probe, mode = independence)**: "An economist models the average cost per unit as $\bar{C}(x)=\frac{C(x)}{x}$, where $C(x)$ is the total cost function and $x$ is the number of units produced. (a) Using the quotient rule, derive a general formula for $\bar{C}'(x)$ in terms of $C(x)$, $C'(x)$, and $x$. (b) Explain, being careful about the subtraction order, what would go wrong (in terms of getting the wrong sign) if the numerator's two terms were computed in the reversed order."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NUMERATOR-AND-DENOMINATOR-SWAPPED-AS-F-AND-G | Incorrectly identifying which function is f (numerator) and which is g (denominator) before applying the formula | Foundational |
| MC-2 | QUOTIENT-RULE-SUBTRACTION-ORDER-REVERSED | Reversing the subtraction order in the quotient rule's numerator, producing the negative of the correct derivative | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Numerator and Denominator Swapped as f and g") → P41 (detect: present Example 1 and check whether $f$/$g$ are correctly assigned) → P64 (conceptual shift: re-label explicitly which expression sits on top (numerator, $f$) and bottom (denominator, $g$) before substituting).
- **B02 (targets MC-2)**: P27 ("Quotient Rule Subtraction Order Reversed") → P41 (detect: present Example 2 and check whether the numerator's subtraction order is reversed) → P64 (conceptual shift: re-derive using the mnemonic "derivative of the TOP times the bottom, MINUS the top times the derivative of the BOTTOM" in that fixed order).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.product-rule`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.calc.product-rule` (the quotient rule is derivable from it combined with the chain rule).

## Component 8 — Teaching Notes

- estimated_hours = 3 and mastery_threshold = 0.85 reflect that this is a direct, procedural rule, but one where order-sensitivity is a genuinely common and consequential error source.
- Both misconceptions were ranked Foundational because each produces an entirely wrong (not merely imprecise) derivative — MC-1 a wrong function algebraically, MC-2 a sign-flipped one.
- The average-cost transfer probe was deliberately chosen because marginal-vs-average cost analysis is a genuinely common economics application of the quotient rule, giving the abstract formula concrete interpretive meaning.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.product-rule`) |
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

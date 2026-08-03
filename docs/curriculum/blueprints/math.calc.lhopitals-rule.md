# Teaching Blueprint: L'Hôpital's Rule (`math.calc.lhopitals-rule`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.lhopitals-rule` |
| name | L'Hôpital's Rule |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.calc.derivative-definition`, `math.calc.limits` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | If lim f/g is indeterminate (0/0 or ∞/∞), then lim f/g = lim f'/g' under appropriate conditions; handles indeterminate forms like 0·∞, 1^∞, etc.

 |

## Component 1 — Learning Objectives

- LO1: Apply L'Hôpital's rule — if $\lim\frac{f}{g}$ is INDETERMINATE of the form $\frac{0}{0}$ or $\frac{\infty}{\infty}$, then $\lim\frac{f}{g}=\lim\frac{f'}{g'}$ (under appropriate conditions) — and VERIFY the indeterminate form FIRST, since applying the rule when the form is NOT indeterminate produces a wrong answer.
- LO2: Handle OTHER indeterminate forms ($0\cdot\infty$, $\infty-\infty$, $1^\infty$, $0^0$, $\infty^0$) by first ALGEBRAICALLY REWRITING them into a $0/0$ or $\infty/\infty$ quotient form before applying L'Hôpital's rule directly.
- LO3: Recognize that L'Hôpital's rule may need to be applied MULTIPLE times in succession if, after one application, the resulting limit is STILL indeterminate.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.derivative-definition` (the derivatives $f'$, $g'$ the rule uses) and `math.calc.limits` (the limit being evaluated, and recognizing indeterminate forms).

## Component 3 — Core Explanation

**L'Hôpital's Rule** provides a powerful technique for evaluating limits of the form $\lim\frac{f(x)}{g(x)}$ when direct substitution gives an INDETERMINATE form — specifically $\frac{0}{0}$ or $\frac{\infty}{\infty}$: under appropriate conditions, $\lim\frac{f(x)}{g(x)}=\lim\frac{f'(x)}{g'(x)}$ — take the derivative of the numerator and denominator SEPARATELY (this is NOT the quotient rule), and re-evaluate.

Crucially, the rule applies ONLY to genuinely indeterminate forms — checking $\frac{0}{0}$ or $\frac{\infty}{\infty}$ FIRST is mandatory; applying the rule to a limit that already evaluates to a determinate value (like $\frac{5}{0}$, which is $\pm\infty$, not indeterminate) gives a WRONG result.

Other indeterminate forms — $0\cdot\infty$, $\infty-\infty$, $1^\infty$, $0^0$, $\infty^0$ — aren't directly handled by the rule as stated, but can be ALGEBRAICALLY REWRITTEN into a $0/0$ or $\infty/\infty$ quotient (e.g. rewriting $0\cdot\infty$ as $\frac{0}{1/\infty}=\frac{0}{0}$, or using logarithms for the exponential forms $1^\infty$/$0^0$/$\infty^0$) before applying L'Hôpital's rule.

Sometimes one application of the rule still leaves an indeterminate form — in that case, the rule can be applied AGAIN (and again, as needed) to the new quotient $f'/g'$.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic application, breaking MC-1)**: Evaluate $\lim_{x\to0}\frac{\sin x}{x}$. Direct substitution gives $\frac{0}{0}$ — genuinely indeterminate, so L'Hôpital's rule applies: $\lim_{x\to0}\frac{\cos x}{1}=\cos(0)=1$. Contrast: evaluate $\lim_{x\to0}\frac{x+5}{x}$. Direct substitution gives $\frac{5}{0}$ — NOT indeterminate (this is a determinate infinite limit) — L'Hôpital's rule does NOT apply here. A common error mechanically applies L'Hôpital's rule to ANY limit where the denominator approaches 0, without first checking whether the NUMERATOR also approaches 0 (or the whole expression approaches $\infty/\infty$) — applying the rule to $\frac{5}{0}$-type limits (differentiating both top and bottom) would give $\lim\frac{1}{1}=1$, a WRONG answer, since the true limit is $\pm\infty$ (a vertical asymptote, correctly analyzed via other means, not this rule).

**Example 2 (LO2 — rewriting a 0·∞ form, breaking MC-2)**: Evaluate $\lim_{x\to0^+}x\ln x$ (a $0\cdot(-\infty)$ form). Rewrite as $\lim_{x\to0^+}\frac{\ln x}{1/x}$ (now a genuine $-\infty/\infty$ form) — apply L'Hôpital's rule: $\lim_{x\to0^+}\frac{1/x}{-1/x^2}=\lim_{x\to0^+}(-x)=0$. A common error attempts to apply L'Hôpital's rule DIRECTLY to the original product form $x\ln x$ (which isn't even a quotient, so the rule's hypothesis doesn't apply at all) — the REWRITING step into an actual quotient is mandatory before L'Hôpital's rule can be used.

**Example 3 (LO3 — applying the rule twice)**: Evaluate $\lim_{x\to0}\frac{x-\sin x}{x^3}$. First application (form $0/0$): $\lim_{x\to0}\frac{1-\cos x}{3x^2}$ — STILL $0/0$. Second application: $\lim_{x\to0}\frac{\sin x}{6x}$ — STILL $0/0$. Third application: $\lim_{x\to0}\frac{\cos x}{6}=\frac{1}{6}$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Verify the Indeterminate Form Before Applying the Rule (Primitive P06: Contrast Pair)

Work Example 1's contrast pair ($0/0$ vs. $5/0$), explicitly checking the form BEFORE differentiating.

- **MC-1 hook**: this directly targets MC-1 (applying the rule to a determinate form).

### Teaching Action A02 — Rewrite Other Indeterminate Forms into a Quotient First (Primitive P64: Conceptual Shift)

Work Example 2, explicitly performing the algebraic rewriting step before applying L'Hôpital's rule.

- **MC-2 hook**: this directly targets MC-2 (attempting to apply the rule to a non-quotient form directly).

### Teaching Action A03 — Reapplying the Rule When Still Indeterminate (reused procedure)

Work Example 3, explicitly re-checking the indeterminate form after each application before deciding whether to apply again.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Evaluate $\lim_{x\to0}\frac{e^x-1}{x}$ using L'Hôpital's rule, first verifying the indeterminate form.
  2. Explain why L'Hôpital's rule cannot be applied directly to $\lim_{x\to2}\frac{x+3}{x-2}$, and state what this limit actually is.
  3. Rewrite $\lim_{x\to\infty}x\cdot e^{-x}$ (a $\infty\cdot0$ form) into a quotient suitable for L'Hôpital's rule, then evaluate.
  4. Evaluate $\lim_{x\to0}\frac{x^2}{1-\cos x}$, applying L'Hôpital's rule as many times as needed.
- **P76 (Transfer Probe, mode = independence)**: "A physicist analyzing small-angle oscillations needs $\lim_{\theta\to0}\frac{\sin\theta-\theta}{\theta^3}$ (a term that appears in a higher-order approximation of a pendulum's motion). (a) Verify this is a genuinely indeterminate form before proceeding. (b) Evaluate the limit using L'Hôpital's rule, applying it as many times as necessary, and explain how you knew when to stop applying it further."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LHOPITALS-RULE-APPLIED-TO-A-NON-INDETERMINATE-FORM | Applying L'Hôpital's rule to a limit that isn't genuinely 0/0 or ∞/∞, without checking the form first, producing an incorrect result | Foundational |
| MC-2 | OTHER-INDETERMINATE-FORMS-NOT-REWRITTEN-AS-A-QUOTIENT-FIRST | Attempting to apply L'Hôpital's rule directly to a non-quotient indeterminate form (like 0·∞) without first rewriting it algebraically into a genuine 0/0 or ∞/∞ quotient | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("L'Hôpital's Rule Applied to a Non-Indeterminate Form") → P41 (detect: present Example 1's $5/0$ case and check whether the rule is (incorrectly) applied) → P64 (conceptual shift: re-check the form explicitly by direct substitution before deciding whether the rule applies at all).
- **B02 (targets MC-2)**: P27 ("Other Indeterminate Forms Not Rewritten as a Quotient First") → P41 (detect: present Example 2 and check whether the rewriting step is skipped) → P64 (conceptual shift: re-derive the quotient form explicitly, e.g. rewriting $f\cdot g$ as $f/(1/g)$, before applying the rule).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.derivative-definition`, `math.calc.limits`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that beyond the basic rule, genuinely handling the variety of indeterminate forms (and knowing when NOT to apply the rule) requires real judgment.
- MC-1 was ranked Foundational because it is arguably the single most common error with this rule — over-applying it to any "0 in the denominator" situation regardless of the numerator.
- The pendulum small-angle-approximation transfer probe was deliberately chosen because this exact limit appears in genuine physics derivations, giving repeated L'Hôpital application concrete downstream significance beyond an artificial drill.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.derivative-definition`, `math.calc.limits`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
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

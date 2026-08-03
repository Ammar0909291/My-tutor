# Teaching Blueprint: Logarithmic Differentiation (`math.calc.logarithmic-differentiation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.logarithmic-differentiation` |
| name | Logarithmic Differentiation |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.calc.derivative-ln` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Taking ln of both sides before differentiating; required for variable-base-and-exponent forms like y = xˢⁱⁿˣ.

 |

## Component 1 — Learning Objectives

- LO1: Recognize when logarithmic differentiation is REQUIRED — specifically for VARIABLE-base-AND-variable-exponent forms like $y=x^{\sin x}$ or $y=(\ln x)^x$ — where NEITHER the power rule (needs a constant exponent) NOR the exponential-derivative rule (needs a constant base) applies directly.
- LO2: Execute the full procedure: take $\ln$ of BOTH sides, use log rules to expand the resulting expression (turning the variable exponent into a coefficient via $\ln(u^v)=v\ln u$), differentiate IMPLICITLY (remembering $\frac{d}{dx}\ln y=\frac{1}{y}y'$, since $y$ is itself a function of $x$), then SOLVE for $y'$ and substitute back the ORIGINAL expression for $y$.
- LO3: Recognize the FINAL substitution step (replacing $y$ with the original function of $x$) as essential — leaving the answer in terms of $y$ alone is an INCOMPLETE derivative, since $y'$ should be expressed purely in terms of $x$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.derivative-ln` — logarithmic differentiation directly reuses its LO3 (the technique itself), now practiced as a complete, standalone procedure.

## Component 3 — Core Explanation

**Logarithmic differentiation** is required specifically for VARIABLE-base-AND-variable-exponent expressions like $y=x^{\sin x}$ — here, NEITHER the power rule (which needs a CONSTANT exponent) NOR the derivative-of-exponential rule (which needs a CONSTANT base) applies, since BOTH the base ($x$) and exponent ($\sin x$) are functions of $x$ simultaneously.

The procedure: (1) take $\ln$ of BOTH sides: $\ln y=\ln(x^{\sin x})$; (2) use the log rule $\ln(u^v)=v\ln u$ to expand: $\ln y=\sin x\cdot\ln x$; (3) differentiate IMPLICITLY with respect to $x$ (since $y$ is a function of $x$, $\frac{d}{dx}\ln y=\frac{1}{y}\cdot y'$ by the chain rule): $\frac{1}{y}y'=\cos x\ln x+\sin x\cdot\frac{1}{x}$ (using the product rule on the right side); (4) SOLVE for $y'$: $y'=y\left(\cos x\ln x+\frac{\sin x}{x}\right)$; (5) SUBSTITUTE the original expression back in for $y$: $y'=x^{\sin x}\left(\cos x\ln x+\frac{\sin x}{x}\right)$.

This final substitution step is essential — the derivative $y'$ must be expressed in terms of $x$ ALONE, not left containing the symbol $y$, since $y$ was merely an intermediate label introduced for convenience during the implicit-differentiation step.

## Component 4 — Worked Examples

**Example 1 (LO1 — recognizing when the technique is needed, breaking MC-1)**: Determine whether logarithmic differentiation is needed for $y=x^5$ vs. $y=x^{\ln x}$. For $y=x^5$: the exponent (5) is CONSTANT, so the ordinary POWER RULE applies directly — $y'=5x^4$, no logarithmic differentiation needed. For $y=x^{\ln x}$: BOTH the base ($x$) and exponent ($\ln x$) are functions of $x$ — logarithmic differentiation IS required here. A common error applies logarithmic differentiation UNNECESSARILY to simple cases like $y=x^5$ (where the ordinary power rule is far more direct), failing to first check whether the exponent is genuinely a variable or just a constant in disguise — the technique's power lies specifically in handling variable-exponent cases, not as a universal substitute for simpler rules.

**Example 2 (LO2 — full procedure, breaking MC-2)**: Differentiate $y=x^{\sin x}$ using logarithmic differentiation, following all 5 steps. [Following the Core Explanation's derivation] $y'=x^{\sin x}\left(\cos x\ln x+\frac{\sin x}{x}\right)$. A common error stops at step 4, reporting $y'=y\left(\cos x\ln x+\frac{\sin x}{x}\right)$ WITHOUT substituting $y=x^{\sin x}$ back in — leaving the answer in terms of $y$ is an incomplete derivative, since $y'$ must ultimately be a function of $x$ alone (the whole point of differentiating with respect to $x$).

**Example 3 (LO2 — a genuinely mixed product/quotient case)**: Use logarithmic differentiation on $y=\frac{x^2\sqrt{x+1}}{(x-3)^3}$ (a product/quotient case, not a variable-exponent case, but STILL benefiting from the technique). $\ln y=2\ln x+\frac{1}{2}\ln(x+1)-3\ln(x-3)$ (using log rules to convert the product/quotient/power structure into sums/differences). Differentiate: $\frac{y'}{y}=\frac{2}{x}+\frac{1}{2(x+1)}-\frac{3}{x-3}$. Solve and substitute back: $y'=\frac{x^2\sqrt{x+1}}{(x-3)^3}\left(\frac{2}{x}+\frac{1}{2(x+1)}-\frac{3}{x-3}\right)$ — this confirms the technique's DUAL use: both for variable-exponent forms AND for simplifying complicated products/quotients (as first previewed in `math.calc.derivative-ln`'s LO3).

## Component 5 — Teaching Actions

### Teaching Action A01 — Checking Whether the Exponent Is Genuinely Variable Before Using the Technique (Primitive P06: Contrast Pair)

Work Example 1, contrasting the simple constant-exponent case (power rule suffices) against the genuine variable-exponent case (logarithmic differentiation needed).

- **MC-1 hook**: this directly targets MC-1 (applying logarithmic differentiation unnecessarily to a simple constant-exponent case).

### Teaching Action A02 — Always Substitute the Original Expression Back for y at the End (Primitive P64: Conceptual Shift)

Work Example 2, explicitly performing the final substitution step and explaining why it's mandatory.

- **MC-2 hook**: this directly targets MC-2 (leaving the final answer in terms of $y$ instead of $x$).

### Teaching Action A03 — Logarithmic Differentiation for Complicated Products and Quotients (reused procedure)

Work Example 3, demonstrating the technique's second major use case beyond variable exponents.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Determine whether logarithmic differentiation is needed for $y=x^{\cos x}$, and justify your answer.
  2. Use logarithmic differentiation to differentiate $y=(2x)^{3x}$, completing all steps including the final substitution.
  3. Use logarithmic differentiation to differentiate $y=\frac{(x+2)^4}{\sqrt{x-1}}$.
  4. Explain, in one sentence, why the final step of substituting the original expression back in for y is necessary.
- **P76 (Transfer Probe, mode = independence)**: "A financial model expresses compound growth as $A(t)=P\cdot t^{rt}$ (an unusual growth-rate expression where the exponent itself scales with time $t$, representing an accelerating compounding effect), and an analyst needs $\frac{dA}{dt}$ to find the instantaneous growth rate at a specific time. (a) Explain why neither the power rule nor the ordinary exponential-derivative rule applies directly to this expression, and why logarithmic differentiation is the appropriate technique. (b) Set up (do not fully evaluate) the logarithmic-differentiation procedure for this expression, showing the first two steps (taking the log and expanding)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LOGARITHMIC-DIFFERENTIATION-USED-UNNECESSARILY-FOR-A-CONSTANT-EXPONENT-CASE | Applying logarithmic differentiation to a simple constant-exponent case where the ordinary power rule would suffice directly | Moderate |
| MC-2 | FINAL-SUBSTITUTION-STEP-OMITTED-LEAVING-THE-ANSWER-IN-TERMS-OF-Y | Leaving the final derivative expressed in terms of y instead of substituting the original expression back in, producing an incomplete answer | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Logarithmic Differentiation Used Unnecessarily for a Constant Exponent Case") → P41 (detect: present Example 1 and check whether logarithmic differentiation is (unnecessarily) applied to the constant-exponent case) → P64 (conceptual shift: re-examine the exponent explicitly, confirming whether it depends on $x$ before choosing a technique).
- **B02 (targets MC-2)**: P27 ("Final Substitution Step Omitted Leaving the Answer in Terms of Y") → P41 (detect: present Example 2 and check whether the final substitution is performed) → P64 (conceptual shift: re-identify the original expression for $y$ and substitute it explicitly into the solved-for $y'$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.derivative-ln`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.calc.derivative-ln`.

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that this concept is a focused, procedural application once `math.calc.derivative-ln`'s implicit-differentiation groundwork is solid.
- MC-2 was ranked Foundational because an incomplete final answer (in terms of $y$) fails the basic requirement of a derivative expressed in terms of the independent variable, while MC-1 was ranked Moderate since it typically still produces a correct (if needlessly roundabout) result.
- The financial-model transfer probe was deliberately chosen because a variable-exponent growth model is a genuinely plausible advanced application, making the "neither rule applies directly" recognition concretely motivated rather than an artificial exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.derivative-ln`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

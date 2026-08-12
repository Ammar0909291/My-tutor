# Teaching Blueprint: Derivative of Logarithmic Functions (`math.calc.derivative-ln`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.derivative-ln` |
| name | Derivative of Logarithmic Functions |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.calc.chain-rule`, `math.func.logarithmic-function` |
| unlocks | (none in KG; child `math.calc.logarithmic-differentiation`) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | d/dx(ln x) = 1/x; d/dx(logₐ x) = 1/(x ln a); logarithmic differentiation simplifies products and quotients raised to powers.

 |

## Component 1 — Learning Objectives

- LO1: State $\frac{d}{dx}\ln x=\frac{1}{x}$ (for $x>0$), and the general-base rule $\frac{d}{dx}\log_a x=\frac{1}{x\ln a}$, recognizing $\ln x$ as the special case where $\ln a=\ln e=1$.
- LO2: Apply the CHAIN RULE when the argument of the logarithm is a function: $\frac{d}{dx}\ln(g(x))=\frac{g'(x)}{g(x)}$ — NOT simply $\frac{1}{g(x)}$, which omits the required chain-rule factor.
- LO3: Recognize LOGARITHMIC DIFFERENTIATION as a technique for simplifying products/quotients/powers before differentiating — take $\ln$ of both sides FIRST (turning products into sums, quotients into differences, and powers into products via log rules), then differentiate implicitly.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.chain-rule` (needed whenever the log's argument is a function) and `math.func.logarithmic-function` (the function class being differentiated).

## Component 3 — Core Explanation

The natural logarithm's derivative is $\frac{d}{dx}\ln x=\frac{1}{x}$ (for $x>0$). For a GENERAL base $a$: $\frac{d}{dx}\log_a x=\frac{1}{x\ln a}$ — the natural log is the special case where $a=e$, so $\ln a=\ln e=1$, recovering the simpler $1/x$.

When the logarithm's ARGUMENT is a function of $x$ (not just $x$ itself), the chain rule applies: $\frac{d}{dx}\ln(g(x))=\frac{1}{g(x)}\cdot g'(x)=\frac{g'(x)}{g(x)}$ — the reciprocal of the inside function, multiplied by its derivative.

**Logarithmic differentiation** is a powerful technique for differentiating complicated products, quotients, or expressions raised to variable powers: take $\ln$ of BOTH sides first — since $\ln$ turns products into SUMS ($\ln(uv)=\ln u+\ln v$), quotients into DIFFERENCES ($\ln(u/v)=\ln u-\ln v$), and powers into PRODUCTS ($\ln(u^n)=n\ln u$) — making the resulting expression far easier to differentiate implicitly, before solving back for the original derivative.

## Component 4 — Worked Examples

**Example 1 (LO1 — base e vs. general base, breaking MC-1)**: Differentiate $f(x)=\ln x$ and $g(x)=\log_5x$. $f'(x)=\frac{1}{x}$. $g'(x)=\frac{1}{x\ln5}$. A common error applies the simpler $\frac{1}{x}$ rule to EVERY log base, omitting the $\ln a$ factor for bases other than $e$ — this "no extra factor" simplicity is unique to the NATURAL log specifically, mirroring exactly the same base-$e$ exception seen in `math.calc.derivative-exponential`.

**Example 2 (LO2 — chain rule with a function argument, breaking MC-2)**: Differentiate $h(x)=\ln(x^2+1)$. Let $g(x)=x^2+1$ (so $g'(x)=2x$). $h'(x)=\frac{2x}{x^2+1}$. A common error writes $h'(x)=\frac{1}{x^2+1}$ alone, omitting the chain-rule factor $2x$ — forgetting that whenever the logarithm's argument is anything other than plain $x$, the chain rule's extra multiplication by the argument's derivative is mandatory.

**Example 3 (LO3 — logarithmic differentiation)**: Differentiate $y=x^x$ (a variable base AND a variable exponent — neither the power rule nor the exponential rule applies directly). Take $\ln$ of both sides: $\ln y=\ln(x^x)=x\ln x$ (using the power-to-product log rule). Differentiate implicitly: $\frac{1}{y}\cdot y'=\ln x+x\cdot\frac{1}{x}=\ln x+1$ (product rule on the right side). Solve: $y'=y(\ln x+1)=x^x(\ln x+1)$ — a result unreachable by any single earlier differentiation rule alone, made tractable specifically by taking logs first.

## Component 5 — Teaching Actions

### Teaching Action A01 — Natural Log Is the Unique Exception; General Bases Need ln(a) (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting $\ln x$'s simple $1/x$ rule against $\log_5x$'s extra $\ln5$ factor.

- **MC-1 hook**: this directly targets MC-1 (over-generalizing $\ln x$'s simplicity to every log base).

### Teaching Action A02 — Chain Rule Factor Is Mandatory for a Function Argument (Primitive P64: Conceptual Shift)

Work Example 2, explicitly identifying $g(x)$ and $g'(x)$ before applying the rule.

- **MC-2 hook**: this directly targets MC-2 (omitting the chain-rule factor entirely).

### Teaching Action A03 — Taking Logs First Simplifies Products, Quotients, and Variable Powers (Primitive P11: Representation Shift)

Work Example 3 in full, explicitly showing each log-rule transformation before implicit differentiation.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Differentiate $f(x)=\log_2x$.
  2. Differentiate $f(x)=\ln(3x^2+5)$.
  3. Use logarithmic differentiation to differentiate $y=x^{\sin x}$.
  4. Use logarithmic differentiation to differentiate $y=\frac{(x+1)^3\sqrt{x-2}}{x^4}$.
- **P76 (Transfer Probe, mode = independence)**: "A chemist studies a reaction whose rate constant depends on temperature via a complicated expression $k(T)=\frac{A\cdot T^{3/2}\cdot e^{-E/RT}}{(1+BT)^2}$ (a product and quotient of several factors, with a variable-power term). (a) Explain why logarithmic differentiation — taking $\ln$ of both sides before differentiating — is a more practical strategy here than trying to apply the product and quotient rules directly to this expression. (b) Write the first two log-rule transformations you would apply to $\ln k(T)$ before differentiating (you do not need to complete the full differentiation)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GENERAL-BASE-LOG-DERIVATIVE-MISSING-LN-A-FACTOR | Applying ln(x)'s simple 1/x rule to every log base, omitting the required ln(a) factor for bases other than e | Foundational |
| MC-2 | CHAIN-RULE-FACTOR-OMITTED-FOR-LOG-OF-A-FUNCTION | Omitting the chain-rule factor g'(x) when differentiating ln(g(x)) for a non-trivial argument function g(x) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("General Base Log Derivative Missing ln(a) Factor") → P41 (detect: present Example 1's $\log_5x$ case and check whether $\ln5$ is included) → P64 (conceptual shift: re-derive $\log_ax=\frac{\ln x}{\ln a}$ via the change-of-base formula and differentiate that quotient directly).
- **B02 (targets MC-2)**: P27 ("Chain Rule Factor Omitted for Log of a Function") → P41 (detect: present Example 2 and check whether $g'(x)=2x$ is included) → P64 (conceptual shift: re-identify $g(x)$ explicitly and re-multiply by $g'(x)$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.chain-rule`, `math.func.logarithmic-function`.
- **Unlocks**: none recorded in the KG (child `math.calc.logarithmic-differentiation` builds directly on LO3).
- **Related**: `math.calc.derivative-exponential` (the inverse function's derivative, sharing the identical base-$e$-exception structure).

## Component 8 — Teaching Notes

- estimated_hours = 4 and mastery_threshold = 0.85 reflect that this concept mirrors `math.calc.derivative-exponential`'s base-exception pattern while adding the genuinely new logarithmic-differentiation technique (LO3).
- Both misconceptions were ranked Foundational because each omits a mathematically mandatory factor, directly paralleling the exponential-derivative concept's misconception pattern.
- The reaction-rate-constant transfer probe was deliberately chosen because a genuinely messy product/quotient/power expression is exactly the scenario where logarithmic differentiation's efficiency becomes obviously worthwhile, rather than an artificial exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.chain-rule`, `math.func.logarithmic-function`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none; child noted) |
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

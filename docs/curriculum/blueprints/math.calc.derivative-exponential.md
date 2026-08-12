# Teaching Blueprint: Derivative of Exponential Functions (`math.calc.derivative-exponential`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.derivative-exponential` |
| name | Derivative of Exponential Functions |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.calc.chain-rule`, `math.func.exponential-function` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | d/dx(eˣ) = eˣ (eˣ is its own derivative); d/dx(aˣ) = aˣ ln a; derived via the chain rule and the natural log definition.

 |

## Component 1 — Learning Objectives

- LO1: State the special property $\frac{d}{dx}e^x=e^x$ — $e^x$ is its OWN derivative, unlike every other exponential base.
- LO2: State the general rule $\frac{d}{dx}a^x=a^x\ln a$ for any base $a>0$, and recognize $e^x$ as the special case where $\ln e=1$, making the extra factor disappear ($e^x\cdot1=e^x$).
- LO3: Apply the CHAIN RULE when the exponent is itself a function of $x$: $\frac{d}{dx}e^{g(x)}=e^{g(x)}\cdot g'(x)$ (and similarly $\frac{d}{dx}a^{g(x)}=a^{g(x)}\ln a\cdot g'(x)$) — recognizing that skipping the chain-rule factor $g'(x)$ is a common omission.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.chain-rule` (needed whenever the exponent isn't simply $x$) and `math.func.exponential-function` (the function class being differentiated).

## Component 3 — Core Explanation

The exponential function $e^x$ has a remarkable property: $\frac{d}{dx}e^x=e^x$ — it is its OWN derivative, a uniqueness that defines $e$ itself among all possible exponential bases.

For a GENERAL base $a>0$: $\frac{d}{dx}a^x=a^x\ln a$ — an extra factor of $\ln a$ appears. This makes sense as $e^x$'s special case: since $\ln e=1$, the formula becomes $e^x\cdot1=e^x$, recovering the simpler rule.

When the exponent is a FUNCTION of $x$ (not just $x$ itself), the CHAIN RULE is required: $\frac{d}{dx}e^{g(x)}=e^{g(x)}\cdot g'(x)$ — the exponential function stays the same, multiplied by the derivative of the exponent. Similarly, $\frac{d}{dx}a^{g(x)}=a^{g(x)}\ln a\cdot g'(x)$.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — base e vs. general base, breaking MC-1)**: Differentiate $f(x)=e^x$ and $g(x)=3^x$. $f'(x)=e^x$ (no extra factor). $g'(x)=3^x\ln3$ (an extra $\ln3$ factor IS needed). A common error applies the SAME simple rule ($\frac{d}{dx}a^x=a^x$, with no $\ln a$ factor) to EVERY exponential base, treating $3^x$'s derivative as just $3^x$ — the "no extra factor" simplicity is UNIQUE to base $e$ specifically, because $\ln e=1$; every other base genuinely needs the $\ln a$ multiplier.

**Example 2 (LO3 — chain rule with exponent as a function, breaking MC-2)**: Differentiate $h(x)=e^{3x^2}$. Let $g(x)=3x^2$ (so $g'(x)=6x$). $h'(x)=e^{3x^2}\cdot6x$ — the exponential factor stays the same, multiplied by the exponent's derivative. A common error writes $h'(x)=e^{3x^2}$ alone, OMITTING the chain-rule factor $6x$ entirely — forgetting that whenever the exponent is anything other than plain $x$, the chain rule's extra multiplication is mandatory, not optional.

**Example 3 (LO2, LO3 — general base with a function exponent)**: Differentiate $f(x)=2^{5x}$. Let $g(x)=5x$ (so $g'(x)=5$). $f'(x)=2^{5x}\ln2\cdot5=5\ln2\cdot2^{5x}$ — BOTH the $\ln2$ factor (general base) AND the chain-rule factor (5, from the exponent's derivative) are needed together.

## Component 5 — Teaching Actions

### Teaching Action A01 — Base e Is the Unique Exception; General Bases Need ln(a) (Primitive P06: Contrast Pair)

Work Example 1, contrasting $e^x$'s self-derivative property against $3^x$'s extra $\ln3$ factor, explaining WHY ($\ln e=1$ specifically).

- **MC-1 hook**: this directly targets MC-1 (over-generalizing $e^x$'s simplicity to every base).

### Teaching Action A02 — Chain Rule Factor Is Mandatory Whenever the Exponent Isn't Plain x (Primitive P64: Conceptual Shift)

Work Example 2, explicitly identifying $g(x)$ and $g'(x)$ before applying the rule, showing the chain-rule factor's necessity.

- **MC-2 hook**: this directly targets MC-2 (omitting the chain-rule factor entirely).

### Teaching Action A03 — Combining Both Factors for a General Base with a Function Exponent (reused procedure)

Work Example 3, combining both the $\ln a$ factor and the chain-rule factor in one differentiation.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Differentiate $f(x)=5^x$.
  2. Differentiate $f(x)=e^{7x}$.
  3. Differentiate $f(x)=e^{x^2+1}$.
  4. Differentiate $f(x)=4^{2x}$.
- **P76 (Transfer Probe, mode = independence)**: "A bacterial population grows according to $P(t)=P_0\cdot e^{0.3t}$ (population as a function of time $t$ in hours), while a competing model proposed by a colleague uses $Q(t)=P_0\cdot2^{0.3t}$ instead. (a) Find $P'(t)$ and $Q'(t)$, being careful about which formula needs an extra logarithmic factor. (b) Explain why the two growth-RATE formulas differ even though both models start from the same $P_0$ and use the same exponent $0.3t$ — connecting to the base-$e$-vs-general-base distinction from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GENERAL-BASE-EXPONENTIAL-DERIVATIVE-MISSING-LN-A-FACTOR | Applying e^x's simple self-derivative rule to every exponential base, omitting the required ln(a) factor for bases other than e | Foundational |
| MC-2 | CHAIN-RULE-FACTOR-OMITTED-WHEN-EXPONENT-IS-A-FUNCTION | Omitting the chain-rule factor g'(x) when differentiating e^{g(x)} or a^{g(x)} for a non-trivial exponent function g(x) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("General Base Exponential Derivative Missing ln(a) Factor") → P41 (detect: present Example 1's $3^x$ case and check whether $\ln3$ is included) → P64 (conceptual shift: re-derive $a^x=e^{x\ln a}$ and apply the chain rule to show where $\ln a$ comes from).
- **B02 (targets MC-2)**: P27 ("Chain Rule Factor Omitted When Exponent Is a Function") → P41 (detect: present Example 2 and check whether $g'(x)=6x$ is included) → P64 (conceptual shift: re-identify $g(x)$ explicitly and re-multiply by $g'(x)$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.chain-rule`, `math.func.exponential-function`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.calc.derivative-ln` (the inverse function's derivative, derived via a closely related technique).

## Component 8 — Teaching Notes

- estimated_hours = 3 and mastery_threshold = 0.85 reflect that while $e^x$'s rule is famously simple, the general-base and chain-rule extensions are genuinely easy to over-simplify or under-apply.
- Both misconceptions were ranked Foundational because each omits a factor that is mathematically mandatory, not optional stylistic precision.
- The bacterial-growth-vs-alternative-base transfer probe was deliberately chosen to make the base-$e$-vs-general-base distinction concretely consequential, since real growth models frequently use base-2 (doubling time) or base-10 framings that require the extra logarithmic factor.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.chain-rule`, `math.func.exponential-function`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Derivatives of Hyperbolic Functions (`math.calc.hyperbolic-derivatives`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.hyperbolic-derivatives` |
| name | Derivatives of Hyperbolic Functions |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.trig.hyperbolic-functions`, `math.calc.derivative-exponential` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | d/dx(sinh x) = cosh x; d/dx(cosh x) = sinh x; analogous to trig but without sign changes; derivable directly from exponential definitions.

 |

## Component 1 — Learning Objectives

- LO1: State $\frac{d}{dx}\sinh x=\cosh x$ and $\frac{d}{dx}\cosh x=\sinh x$ — and recognize the CRUCIAL difference from ordinary trig derivatives: NEITHER formula has a NEGATIVE sign, unlike $\frac{d}{dx}\cos x=-\sin x$.
- LO2: DERIVE these formulas directly from the exponential DEFINITIONS $\sinh x=\frac{e^x-e^{-x}}{2}$, $\cosh x=\frac{e^x+e^{-x}}{2}$, using `math.calc.derivative-exponential` — rather than treating them as an independent fact set disconnected from the trig-derivative pattern.
- LO3: Apply the CHAIN RULE when the hyperbolic function's argument is a function of $x$: $\frac{d}{dx}\sinh(g(x))=\cosh(g(x))\cdot g'(x)$ — a common omission is forgetting the chain-rule factor.

## Component 2 — Prerequisite Check

Assumes mastery of `math.trig.hyperbolic-functions` (the functions themselves, defined via exponentials) and `math.calc.derivative-exponential` (the tool used to derive their derivatives).

## Component 3 — Core Explanation

The hyperbolic function derivatives are $\frac{d}{dx}\sinh x=\cosh x$ and $\frac{d}{dx}\cosh x=\sinh x$ — structurally SIMILAR to the trig derivatives $\frac{d}{dx}\sin x=\cos x$ and $\frac{d}{dx}\cos x=-\sin x$, but with a CRUCIAL difference: NEITHER hyperbolic formula has a negative sign, unlike cosine's trig derivative.

These formulas are DERIVED directly from the exponential definitions: $\sinh x=\frac{e^x-e^{-x}}{2}$, so $\frac{d}{dx}\sinh x=\frac{d}{dx}\left(\frac{e^x-e^{-x}}{2}\right)=\frac{e^x-(-e^{-x})}{2}=\frac{e^x+e^{-x}}{2}=\cosh x$ (using `math.calc.derivative-exponential`'s chain rule on $e^{-x}$, where the inner derivative $-1$ flips the sign of that term, ultimately producing a PLUS between the two exponential terms). Similarly, $\frac{d}{dx}\cosh x=\frac{d}{dx}\left(\frac{e^x+e^{-x}}{2}\right)=\frac{e^x-e^{-x}}{2}=\sinh x$ — here the chain-rule sign flip on $e^{-x}$'s derivative produces a MINUS, which combined with the original PLUS in $\cosh x$'s definition gives back $\sinh x$'s definition exactly.

When the argument is a function $g(x)$, the chain rule applies: $\frac{d}{dx}\sinh(g(x))=\cosh(g(x))\cdot g'(x)$.

## Component 4 — Worked Examples

**Example 1 (LO1 — no sign flip, unlike trig, breaking MC-1)**: State $\frac{d}{dx}\cosh x$ and contrast with $\frac{d}{dx}\cos x$. $\frac{d}{dx}\cosh x=\sinh x$ (NO negative sign), while $\frac{d}{dx}\cos x=-\sin x$ (HAS a negative sign) — genuinely different despite the superficially similar function names and notation. A common error, having just learned the ordinary trig derivatives, carries over the NEGATIVE sign by analogy, writing $\frac{d}{dx}\cosh x=-\sinh x$ — incorrectly assuming the hyperbolic functions must mirror the trig sign pattern exactly, when in fact this is the ONE place they genuinely differ.

**Example 2 (LO2 — deriving from exponential definitions)**: Derive $\frac{d}{dx}\sinh x=\cosh x$ starting from $\sinh x=\frac{e^x-e^{-x}}{2}$, showing each differentiation step explicitly (including the chain-rule sign flip on the $e^{-x}$ term), as in the Core Explanation.

**Example 3 (LO3 — chain rule with a hyperbolic function, breaking MC-2)**: Differentiate $h(x)=\cosh(3x^2)$. Let $g(x)=3x^2$ (so $g'(x)=6x$). $h'(x)=\sinh(3x^2)\cdot6x=6x\sinh(3x^2)$. A common error writes $h'(x)=\sinh(3x^2)$ alone, OMITTING the chain-rule factor $6x$ — forgetting that whenever the hyperbolic function's argument is anything other than plain $x$, the chain rule's extra multiplication is mandatory, exactly as with ordinary trig and exponential functions.

## Component 5 — Teaching Actions

### Teaching Action A01 — Hyperbolic Derivatives Have NO Sign Flip, Unlike cos(x) (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting the sign-free hyperbolic derivatives against the sign-flipping ordinary cosine derivative.

- **MC-1 hook**: this directly targets MC-1 (incorrectly carrying over the trig sign-flip pattern to hyperbolic functions).

### Teaching Action A02 — Deriving Hyperbolic Derivatives from Exponential Definitions (Primitive P64: Conceptual Shift)

Work Example 2, explicitly deriving both formulas from the exponential definitions, reinforcing they're not independent facts.

### Teaching Action A03 — Chain Rule Factor Is Mandatory for a Hyperbolic Function of a Function (reused procedure)

Work Example 3, explicitly identifying $g(x)$ and $g'(x)$ before applying the rule.

- **MC-2 hook**: this directly targets MC-2 (omitting the chain-rule factor).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. State $\frac{d}{dx}\sinh x$ and $\frac{d}{dx}\cosh x$, and explain why neither has a negative sign.
  2. Derive $\frac{d}{dx}\cosh x$ starting from its exponential definition.
  3. Differentiate $f(x)=\sinh(4x)$.
  4. Differentiate $f(x)=\cosh(x^2+1)$.
- **P76 (Transfer Probe, mode = independence)**: "An engineer modeling the shape of a hanging cable (a catenary curve) uses $y(x)=a\cosh(x/a)$ (where $a$ is a constant related to the cable's tension and weight), and needs the cable's slope at any point, $\frac{dy}{dx}$. (a) Differentiate $y(x)$ with respect to $x$, applying the chain rule correctly. (b) Explain why, unlike a similar-looking trigonometric model, this derivative introduces NO sign change — connecting to the fundamental difference between hyperbolic and ordinary trig derivatives."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TRIG-SIGN-FLIP-PATTERN-INCORRECTLY-APPLIED-TO-HYPERBOLIC-FUNCTIONS | Incorrectly carrying over the negative-sign pattern from ordinary trig derivatives (e.g. cos) to the corresponding hyperbolic derivative, which has no sign flip | Foundational |
| MC-2 | CHAIN-RULE-FACTOR-OMITTED-FOR-HYPERBOLIC-FUNCTION-OF-A-FUNCTION | Omitting the chain-rule factor g'(x) when differentiating a hyperbolic function of a non-trivial argument g(x) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Trig Sign-Flip Pattern Incorrectly Applied to Hyperbolic Functions") → P41 (detect: present Example 1 and check whether a negative sign is (incorrectly) added to $\cosh x$'s derivative) → P64 (conceptual shift: re-derive from the exponential definition directly, showing no sign flip occurs).
- **B02 (targets MC-2)**: P27 ("Chain Rule Factor Omitted for Hyperbolic Function of a Function") → P41 (detect: present Example 3 and check whether $g'(x)=6x$ is included) → P64 (conceptual shift: re-identify $g(x)$ explicitly and re-multiply by $g'(x)$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.trig.hyperbolic-functions`, `math.calc.derivative-exponential`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- estimated_hours = 3 and mastery_threshold = 0.70 (the lowest in this batch) reflect that once the exponential-derivative groundwork is solid, these formulas follow directly with minimal additional conceptual weight.
- MC-1 was ranked Foundational because the superficial notational similarity to trig functions makes this an extremely natural, common error, directly analogous to how MC-1 in `math.calc.derivative-trig` targeted a related sign-tracking issue.
- The hanging-cable (catenary) transfer probe was deliberately chosen because it is the single most famous real-world application of hyperbolic cosine, giving the sign-free derivative property genuine physical and historical significance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.trig.hyperbolic-functions`, `math.calc.derivative-exponential`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

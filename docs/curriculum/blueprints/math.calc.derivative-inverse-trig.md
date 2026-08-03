# Teaching Blueprint: Derivatives of Inverse Trig Functions (`math.calc.derivative-inverse-trig`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.derivative-inverse-trig` |
| name | Derivatives of Inverse Trig Functions |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.calc.derivative-trig`, `math.trig.inverse-trig`, `math.calc.implicit-differentiation` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | d/dx(arcsin x) = 1/√(1−x²); d/dx(arctan x) = 1/(1+x²); derived via implicit differentiation of the inverse relation.

 |

## Component 1 — Learning Objectives

- LO1: State $\frac{d}{dx}\arcsin x=\frac{1}{\sqrt{1-x^2}}$ and $\frac{d}{dx}\arctan x=\frac{1}{1+x^2}$, and recognize the DOMAIN restriction $-1<x<1$ for arcsin's derivative (since the square root would be undefined or the denominator zero outside this range).
- LO2: DERIVE these formulas via IMPLICIT DIFFERENTIATION of the inverse relation — e.g. for $y=\arcsin x$, rewrite as $\sin y=x$, differentiate implicitly to get $\cos y\cdot y'=1$, solve for $y'=\frac{1}{\cos y}$, then convert back to $x$ using $\cos y=\sqrt{1-\sin^2y}=\sqrt{1-x^2}$ (using the POSITIVE square root, justified by arcsin's restricted range where $\cos y\ge0$).
- LO3: Apply the CHAIN RULE when the inverse trig function's argument is a function of $x$: $\frac{d}{dx}\arcsin(g(x))=\frac{g'(x)}{\sqrt{1-[g(x)]^2}}$ — a common omission is forgetting the chain-rule factor $g'(x)$, or forgetting to substitute $g(x)$ (not just $x$) into the denominator.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.derivative-trig` (the ordinary trig derivatives used in the implicit-differentiation derivation), `math.trig.inverse-trig` (the functions themselves and their restricted domains/ranges), and `math.calc.implicit-differentiation` (the core derivation technique).

## Component 3 — Core Explanation

The inverse trig derivatives are $\frac{d}{dx}\arcsin x=\frac{1}{\sqrt{1-x^2}}$ (valid for $-1<x<1$) and $\frac{d}{dx}\arctan x=\frac{1}{1+x^2}$ (valid for all real $x$). These are DERIVED, not memorized in isolation — via IMPLICIT DIFFERENTIATION of the inverse relationship.

For $y=\arcsin x$: rewrite as $\sin y=x$ (the defining inverse relation). Differentiate BOTH sides with respect to $x$ implicitly: $\cos y\cdot\frac{dy}{dx}=1$ (chain rule on the left, since $y$ is a function of $x$). Solve: $\frac{dy}{dx}=\frac{1}{\cos y}$. Convert back to $x$ using the Pythagorean identity: $\cos y=\sqrt{1-\sin^2y}=\sqrt{1-x^2}$ — taking the POSITIVE square root specifically because arcsin's RANGE is restricted to $[-\pi/2,\pi/2]$, where $\cos y\ge0$ always (this restriction is exactly what makes the square root's sign unambiguous).

The analogous derivation for $\arctan x$: $\tan y=x\Rightarrow\sec^2y\cdot y'=1\Rightarrow y'=\frac{1}{\sec^2y}=\frac{1}{1+\tan^2y}=\frac{1}{1+x^2}$ (using $\sec^2y=1+\tan^2y$).

When the argument is a function $g(x)$, the CHAIN RULE applies: $\frac{d}{dx}\arcsin(g(x))=\frac{g'(x)}{\sqrt{1-[g(x)]^2}}$ — BOTH substituting $g(x)$ into the denominator AND multiplying by $g'(x)$.

## Component 4 — Worked Examples

**Example 1 (LO2 — deriving arcsin's derivative, breaking MC-1)**: Follow the full implicit-differentiation derivation for $\frac{d}{dx}\arcsin x$ as in the Core Explanation, explicitly justifying WHY $\cos y=+\sqrt{1-x^2}$ (not $-\sqrt{1-x^2}$) is used. A common error takes the square root WITHOUT considering the sign, or arbitrarily picks the negative root — the correct justification requires recognizing arcsin's RESTRICTED RANGE ($[-\pi/2,\pi/2]$) forces $\cos y\ge0$ throughout, making the positive root the ONLY valid choice, not an arbitrary convention.

**Example 2 (LO1, LO3 — basic application with domain awareness, breaking MC-2)**: Differentiate $f(x)=\arcsin(2x)$ and state its domain. Let $g(x)=2x$ (so $g'(x)=2$). $f'(x)=\frac{2}{\sqrt{1-(2x)^2}}=\frac{2}{\sqrt{1-4x^2}}$ — requiring $-1<2x<1$, i.e. $-\frac{1}{2}<x<\frac{1}{2}$ (the domain SHRINKS due to the inner function). A common error writes $f'(x)=\frac{2}{\sqrt{1-x^2}}$ — correctly including the chain-rule factor of 2, but FORGETTING to substitute $g(x)=2x$ (not just $x$) into the denominator's square root — both the multiplication AND the substitution are required together.

**Example 3 (LO1, LO3 — arctan with a function argument)**: Differentiate $f(x)=\arctan(x^2)$. Let $g(x)=x^2$ (so $g'(x)=2x$). $f'(x)=\frac{2x}{1+(x^2)^2}=\frac{2x}{1+x^4}$ — correctly substituting $x^2$ (not just $x$) into the denominator and multiplying by the chain-rule factor $2x$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Justifying the Positive Square Root via arcsin's Restricted Range (Primitive P64: Conceptual Shift)

Work Example 1, explicitly connecting the sign choice to arcsin's domain/range restriction (reused from `math.trig.inverse-trig`).

- **MC-1 hook**: check whether the positive-square-root choice is correctly justified via the range restriction, not assumed arbitrarily.

### Teaching Action A02 — Substituting the Inner Function into Both the Numerator (via chain rule) and Denominator (Primitive P11: Representation Shift)

Work Example 2, explicitly checking BOTH required modifications (multiplying by $g'(x)$ AND substituting $g(x)$ into the denominator).

- **MC-2 hook**: this directly targets MC-2 (performing the chain-rule multiplication but forgetting the denominator substitution, or vice versa).

### Teaching Action A03 — Applying the Same Pattern to arctan (reused procedure)

Work Example 3, reinforcing the pattern with the second standard inverse trig derivative.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Differentiate $f(x)=\arcsin(x/2)$ and state its domain.
  2. Differentiate $f(x)=\arctan(3x)$.
  3. Explain, in one sentence, why the positive square root is used (rather than the negative) when deriving arcsin's derivative.
  4. Differentiate $f(x)=\arcsin(x^2-1)$.
- **P76 (Transfer Probe, mode = independence)**: "A surveyor uses $\theta(x)=\arctan\left(\frac{h}{x}\right)$ to find the angle of elevation to a fixed tower of height $h$, as a function of the surveyor's horizontal distance $x$ from the tower's base. (a) Using the chain rule and the inverse trig derivative formula, find $\frac{d\theta}{dx}$ (treating $h$ as a constant). (b) Explain, in physical terms, why $\frac{d\theta}{dx}$ should be NEGATIVE for $x>0$ — connecting to the fact that the angle of elevation decreases as the surveyor moves farther from the tower."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SQUARE-ROOT-SIGN-CHOSEN-ARBITRARILY-WITHOUT-JUSTIFYING-VIA-RESTRICTED-RANGE | Choosing the positive (or negative) square root arbitrarily when deriving arcsin's derivative, without justifying it via arcsin's restricted range | Moderate |
| MC-2 | CHAIN-RULE-MULTIPLICATION-PERFORMED-BUT-DENOMINATOR-SUBSTITUTION-OMITTED-OR-VICE-VERSA | Performing only one of the two required modifications (multiplying by g'(x), or substituting g(x) into the denominator) rather than both together | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Square Root Sign Chosen Arbitrarily Without Justifying via Restricted Range") → P41 (detect: present Example 1 and check whether the sign choice is justified) → P64 (conceptual shift: re-derive by explicitly recalling arcsin's range restriction and confirming $\cos y\ge0$ throughout that range).
- **B02 (targets MC-2)**: P27 ("Chain Rule Multiplication Performed but Denominator Substitution Omitted or Vice Versa") → P41 (detect: present Example 2 and check whether both modifications are present) → P64 (conceptual shift: re-identify $g(x)$ explicitly and re-apply BOTH the substitution and multiplication steps together).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.derivative-trig`, `math.trig.inverse-trig`, `math.calc.implicit-differentiation`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- estimated_hours = 4 and mastery_threshold = 0.80 reflect that this concept requires genuine synthesis of implicit differentiation and inverse-trig domain/range awareness.
- MC-2 was ranked Foundational because omitting either required modification produces a genuinely wrong formula, while MC-1 was ranked Moderate since the correct sign is nearly always intuitively "obvious" in practice (positive), even if the justification is skipped.
- The surveyor transfer probe was deliberately chosen because the sign of the derivative (negative, meaning the angle decreases with distance) has an immediately checkable, intuitive physical meaning, reinforcing correct formula application beyond rote memorization.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.derivative-trig`, `math.trig.inverse-trig`, `math.calc.implicit-differentiation`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO1/LO3, Ex3→LO1/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

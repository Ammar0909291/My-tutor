# Teaching Blueprint: Types of Discontinuity (`math.calc.continuity-types`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.continuity-types` |
| name | Types of Discontinuity |
| domain | Calculus |
| difficulty | advanced |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.calc.continuity`, `math.calc.one-sided-limits` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — graphs of each discontinuity type before classification |
| description (KG) | Removable (hole), jump (left/right limits exist but differ), and infinite (vertical asymptote) discontinuities; classified by one-sided limits.

 |

## Component 1 — Learning Objectives

- LO1: Classify a REMOVABLE discontinuity (a "hole") — where $\lim_{x\to a}f(x)$ EXISTS (both one-sided limits agree) but either $f(a)$ is undefined or $f(a)\ne\lim_{x\to a}f(x)$.
- LO2: Classify a JUMP discontinuity — where the LEFT and RIGHT one-sided limits BOTH exist but are DIFFERENT from each other, so no overall two-sided limit exists.
- LO3: Classify an INFINITE discontinuity — where at least one one-sided limit is $\pm\infty$ (a vertical asymptote), and distinguish this from a jump discontinuity where both one-sided limits are FINITE but merely unequal.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.continuity` (the definition of continuity being violated) and `math.calc.one-sided-limits` (needed to examine left/right behavior separately for classification).

## Component 3 — Core Explanation

A function has a discontinuity at $x=a$ when it fails the continuity conditions there. There are three classifiable types, distinguished by examining the ONE-SIDED limits:

A **removable discontinuity** ("hole") occurs when $\lim_{x\to a}f(x)$ EXISTS (both one-sided limits agree on a common finite value) but $f(a)$ is either undefined or doesn't match that limit value — "removable" because redefining $f(a)$ to equal the limit would fix the discontinuity.

A **jump discontinuity** occurs when BOTH one-sided limits exist (are finite) but are UNEQUAL — the function "jumps" from one value to a different value as $x$ passes through $a$, with no way to patch this by redefining a single point (unlike the removable case).

An **infinite discontinuity** occurs when at least one one-sided limit is $+\infty$ or $-\infty$ — a vertical asymptote. This is fundamentally different from a jump discontinuity: jump discontinuities have both one-sided limits FINITE (just different), while infinite discontinuities have at least one side genuinely unbounded.

## Component 4 — Worked Examples

**Example 1 (LO1 — removable discontinuity, breaking MC-1)**: Classify the discontinuity of $f(x)=\frac{x^2-4}{x-2}$ at $x=2$. Factoring: $f(x)=\frac{(x-2)(x+2)}{x-2}=x+2$ for $x\ne2$, so $\lim_{x\to2}f(x)=4$ EXISTS, but $f(2)$ is undefined (division by zero in the original form) — this is REMOVABLE (redefining $f(2)=4$ would make it continuous). A common error classifies this as a "vertical asymptote" or "infinite discontinuity" simply because the ORIGINAL expression has a zero denominator at $x=2$, without checking whether the factor actually CANCELS (producing a finite limit) — a zero denominator alone does not automatically mean infinite discontinuity; it depends on whether the numerator ALSO vanishes there in a way that cancels.

**Example 2 (LO2 — jump discontinuity, breaking MC-2)**: Classify the discontinuity of the piecewise function $f(x)=x$ for $x<1$, $f(x)=x+2$ for $x\ge1$, at $x=1$. Left limit: $\lim_{x\to1^-}f(x)=1$. Right limit: $\lim_{x\to1^+}f(x)=1+2=3$. Both are FINITE but UNEQUAL ($1\ne3$) — this is a JUMP discontinuity. A common error confuses this with a REMOVABLE discontinuity, assuming that since $f(1)=3$ is DEFINED, the discontinuity must be removable — but removability specifically requires the TWO-SIDED limit to exist (both one-sided limits AGREEING), which fails here since $1\ne3$; no single redefinition of $f(1)$ can fix a genuine jump.

**Example 3 (LO3 — infinite discontinuity, contrasted with jump)**: Classify the discontinuity of $f(x)=1/(x-3)$ at $x=3$. $\lim_{x\to3^-}f(x)=-\infty$, $\lim_{x\to3^+}f(x)=+\infty$ — both one-sided limits are UNBOUNDED (not just unequal finite values as in a jump) — this is an INFINITE discontinuity (a vertical asymptote at $x=3$).

## Component 5 — Teaching Actions

### Teaching Action A01 — Removable Discontinuity Requires the Two-Sided Limit to Exist Despite the Zero Denominator (Primitive P64: Conceptual Shift)

Work Example 1, explicitly factoring to show the limit exists despite the original expression's undefined point.

- **MC-1 hook**: check whether the factor-and-cancel step is performed before concluding the discontinuity type.

### Teaching Action A02 — Jump vs. Removable: Do Both One-Sided Limits Actually Agree? (Primitive P06: Contrast Pair)

Work Example 2 side by side with a genuinely removable case (Example 1), explicitly checking whether both one-sided limits AGREE (removable-eligible) or DISAGREE (jump).

- **MC-2 hook**: this directly targets MC-2 (assuming $f(a)$ being defined implies removability, rather than checking whether the one-sided limits themselves agree).

### Teaching Action A03 — Infinite Discontinuity: At Least One Side Is Unbounded, Not Just Unequal (Primitive P11: Representation Shift)

Work Example 3, contrasting the unbounded one-sided limits here against Example 2's finite-but-unequal jump case.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Classify the discontinuity of $f(x)=\frac{x^2-9}{x-3}$ at $x=3$.
  2. Classify the discontinuity of a piecewise function with left limit 2 and right limit 5 at some point $a$.
  3. Classify the discontinuity of $f(x)=1/x^2$ at $x=0$.
  4. Explain, in one sentence, the key difference between a jump discontinuity and an infinite discontinuity.
- **P76 (Transfer Probe, mode = independence)**: "A shipping company's cost function $C(x)$ (cost as a function of package weight $x$) has a genuine JUMP at $x=5$kg (a flat-rate pricing tier boundary: costs \$10 for anything under 5kg, then jumps to a \$15 flat rate at exactly 5kg and above) — while a SEPARATE mathematical model $f(x)=\frac{x^2-25}{x-5}$ used internally for a cost-estimation formula has a discontinuity at $x=5$ that turns out to be removable after simplification. (a) Explain why the shipping cost's jump at $x=5$kg genuinely cannot be 'patched' by redefining a single value, unlike the cost-estimation formula's discontinuity. (b) Classify $f(x)=\frac{x^2-25}{x-5}$'s discontinuity at $x=5$, showing your work."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ZERO-DENOMINATOR-ASSUMED-TO-ALWAYS-MEAN-INFINITE-DISCONTINUITY | Assuming any zero-denominator point is automatically an infinite discontinuity, without checking whether the numerator cancels to produce a removable case instead | Foundational |
| MC-2 | REMOVABILITY-JUDGED-BY-WHETHER-F-OF-A-IS-DEFINED-RATHER-THAN-WHETHER-ONE-SIDED-LIMITS-AGREE | Classifying a discontinuity as removable based on whether f(a) is defined, rather than checking whether the one-sided limits themselves agree | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Zero Denominator Assumed to Always Mean Infinite Discontinuity") → P41 (detect: present Example 1 and check whether factoring/cancellation is attempted before classifying) → P64 (conceptual shift: re-factor explicitly, showing the limit exists finitely).
- **B02 (targets MC-2)**: P27 ("Removability Judged by Whether f(a) Is Defined Rather Than Whether One-Sided Limits Agree") → P41 (detect: present Example 2 and check whether $f(1)$ being defined is (incorrectly) used to conclude removability) → P64 (conceptual shift: re-check both one-sided limits explicitly, confirming they disagree, hence a jump not a removable case).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.continuity`, `math.calc.one-sided-limits`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.calc.continuity`.

## Component 8 — Teaching Notes

- estimated_hours = 4 and bloom = analyze reflect that this concept requires genuine discrimination between three distinct cases, not just formula application.
- Both misconceptions were ranked Foundational because each leads to a genuinely wrong classification that would misinform any downstream reasoning about the function's behavior.
- The shipping-cost transfer probe was deliberately chosen to contrast a genuinely unfixable real-world jump (a pricing-tier boundary) against a merely apparent, algebraically-removable discontinuity, sharpening the removable-vs-jump distinction with concrete stakes.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.continuity`, `math.calc.one-sided-limits`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: graphs of each type before classification) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Reduction Formulas (`math.calc.reduction-formulas`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.reduction-formulas` |
| name | Reduction Formulas |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.calc.integration-by-parts` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Formulas expressing ∫f^n in terms of ∫f^(n-2) or ∫f^(n-1); used for ∫sinⁿx dx, ∫cosⁿx dx, ∫xⁿeˣdx.

 |

## Component 1 — Learning Objectives

- LO1: State and apply a reduction formula (e.g. $\int\sin^nx\,dx=-\frac{\sin^{n-1}x\cos x}{n}+\frac{n-1}{n}\int\sin^{n-2}x\,dx$) to express $\int f^n$ in terms of a LOWER power's integral ($\int f^{n-2}$ or $\int f^{n-1}$), REPEATING the reduction until reaching a base case that can be integrated directly.
- LO2: Recognize that a reduction formula is DERIVED from integration by parts (choosing $u$ and $dv$ strategically to split off one or two powers of the original function) — it isn't a separate, unrelated technique, but a packaged, reusable RESULT of that same method.
- LO3: Correctly identify the BASE CASE (e.g. $n=0$ or $n=1$) that terminates the reduction, and stop applying the formula once reached — recognizing that continuing to "reduce" past the base case is either impossible or meaningless.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.integration-by-parts` — reduction formulas are derived directly from it, applied repeatedly.

## Component 3 — Core Explanation

**Reduction formulas** express an integral $\int f(x)^n\,dx$ in terms of a LOWER-power integral, $\int f(x)^{n-2}\,dx$ or $\int f(x)^{n-1}\,dx$, allowing REPEATED application to reduce a high power step-by-step down to a manageable BASE CASE. For example, $\int\sin^nx\,dx=-\frac{\sin^{n-1}x\cos x}{n}+\frac{n-1}{n}\int\sin^{n-2}x\,dx$ — applying this once reduces the power by 2; applying it again reduces by 2 more; and so on, until reaching $\int\sin^0x\,dx=\int1\,dx$ or $\int\sin^1x\,dx=-\cos x$ (whichever base case the reduction chain lands on, depending on whether $n$ is even or odd).

These formulas are DERIVED from `math.calc.integration-by-parts` — splitting $\sin^nx=\sin^{n-1}x\cdot\sin x$ and applying integration by parts strategically produces exactly this reduction relationship. Rather than re-deriving it from scratch every time, the reduction formula packages this derivation into a reusable, repeatable tool.

Crucially, the reduction process must STOP at the appropriate BASE CASE — continuing to apply the formula past $n=0$ or $n=1$ (whichever terminates the specific chain) is either mathematically impossible (negative powers would require a DIFFERENT formula) or simply redundant.

## Component 4 — Worked Examples

**Example 1 (LO1 — repeated application to a base case, breaking MC-1)**: Use the reduction formula to evaluate $\int\sin^4x\,dx$. Apply once ($n=4$): $\int\sin^4x\,dx=-\frac{\sin^3x\cos x}{4}+\frac{3}{4}\int\sin^2x\,dx$. Apply again ($n=2$) to the remaining integral: $\int\sin^2x\,dx=-\frac{\sin x\cos x}{2}+\frac{1}{2}\int\sin^0x\,dx=-\frac{\sin x\cos x}{2}+\frac{1}{2}\int1\,dx=-\frac{\sin x\cos x}{2}+\frac{x}{2}$. Substituting back gives the complete answer. A common error applies the reduction formula ONCE and then STOPS, leaving $\int\sin^2x\,dx$ un-evaluated in the final answer, as if the reduction were complete after a single application — the formula must be REPEATED until reaching a genuinely elementary base-case integral (like $\int1\,dx$ or $\int\sin x\,dx$), not just applied once and left as "reduced enough."

**Example 2 (LO2 — connecting to integration by parts)**: Show, using integration by parts with $u=\sin^{n-1}x$ and $dv=\sin x\,dx$, that the reduction formula for $\int\sin^nx\,dx$ emerges naturally — $du=(n-1)\sin^{n-2}x\cos x\,dx$, $v=-\cos x$, giving $\int\sin^nx\,dx=-\sin^{n-1}x\cos x+(n-1)\int\sin^{n-2}x\cos^2x\,dx$, then using $\cos^2x=1-\sin^2x$ and solving algebraically for the original integral recovers exactly the standard reduction formula — confirming it is genuinely a packaged instance of integration by parts, not a separate rule to memorize independently of that method.

**Example 3 (LO3 — recognizing the base case, breaking MC-2)**: Evaluate $\int\sin^1x\,dx$ using the "reduction formula" mindset. This IS itself a base case (not requiring further reduction) — $\int\sin x\,dx=-\cos x+C$ directly, WITHOUT applying the reduction formula at all (since applying it would require referencing $\int\sin^{-1}x\,dx$, which isn't even the same TYPE of integral the formula is designed for). A common error attempts to apply the reduction formula one more time to $\int\sin^1x\,dx$ (treating $n=1$ as still "reducible"), rather than recognizing $n=1$ (or $n=0$) as the natural STOPPING point where direct integration takes over.

## Component 5 — Teaching Actions

### Teaching Action A01 — Repeat the Reduction Until Reaching a True Base Case (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly applying the formula twice in sequence and confirming the final base-case integral is genuinely elementary.

- **MC-1 hook**: check whether the reduction is repeated until fully resolved, not stopped after one application.

### Teaching Action A02 — Reduction Formulas Are Packaged Integration by Parts (Primitive P11: Representation Shift)

Work Example 2, explicitly re-deriving the formula from integration by parts to show its origin.

### Teaching Action A03 — Recognize the Base Case and Stop There (Primitive P06: Contrast Pair)

Work Example 3, contrasting the correct direct-integration stopping point against the incorrect attempt to reduce further.

- **MC-2 hook**: this directly targets MC-2 (continuing to apply the reduction formula past the natural base case).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Use the reduction formula to evaluate $\int\cos^3x\,dx$, applying it until reaching a base case.
  2. Explain, in one sentence, why a reduction formula is applied REPEATEDLY rather than just once.
  3. Explain how a reduction formula for $\int\sin^nx\,dx$ can be derived from integration by parts.
  4. Explain why $\int\sin^0x\,dx$ should be evaluated directly (as $\int1\,dx$) rather than by applying the reduction formula again.
- **P76 (Transfer Probe, mode = independence)**: "A signal-processing engineer needs to compute $\int_0^{2\pi}\cos^6x\,dx$ (appearing in a Fourier-analysis calculation of a filter's average power). (a) Explain why using the reduction formula repeatedly (rather than attempting integration by parts from scratch each time) is the practical approach here. (b) Describe, without fully computing, how many times the reduction formula would need to be applied to reach a base case starting from $n=6$, and what that base case integral would be."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | REDUCTION-FORMULA-APPLIED-ONLY-ONCE-LEAVING-THE-INTEGRAL-UNRESOLVED | Applying the reduction formula a single time and treating the result as final, without repeating until a genuinely elementary base case is reached | Foundational |
| MC-2 | REDUCTION-CONTINUED-PAST-THE-NATURAL-BASE-CASE | Attempting to apply the reduction formula further even after reaching the base case (n=0 or n=1), rather than switching to direct integration | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Reduction Formula Applied Only Once Leaving the Integral Unresolved") → P41 (detect: present Example 1 and check whether the remaining integral is left un-evaluated) → P64 (conceptual shift: re-apply the formula to the remaining integral, repeating until a genuinely elementary result is reached).
- **B02 (targets MC-2)**: P27 ("Reduction Continued Past the Natural Base Case") → P41 (detect: present Example 3 and check whether the formula is (incorrectly) applied to $n=1$ or $n=0$) → P64 (conceptual shift: re-identify the base case explicitly and switch to direct integration there).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.integration-by-parts`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- mastery_threshold = 0.70 (the lowest MAMR-input in this batch) reflects that this is a genuinely procedural, mechanical skill once the underlying idea is grasped, with somewhat lower conceptual stakes than earlier concepts in the domain.
- MC-1 was ranked Foundational because leaving an integral genuinely unresolved (mistaking partial reduction for a complete answer) is a serious and common error; MC-2 was ranked Moderate since it typically produces only a wasted step, not a wrong final answer.
- The Fourier-analysis transfer probe was deliberately chosen because repeated even-power trigonometric integrals are a genuinely common real signal-processing computation, motivating the reduction formula's REPEATED-application efficiency over ad hoc integration-by-parts each time.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.integration-by-parts`) |
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

# Teaching Blueprint: Rolle's Theorem (`math.calc.rolles-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.rolles-theorem` |
| name | Rolle's Theorem |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.calc.mean-value-theorem` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Special case of MVT: if f is continuous on [a,b], differentiable on (a,b), and f(a) = f(b), then there exists c ∈ (a,b) with f'(c) = 0.

 |

## Component 1 — Learning Objectives

- LO1: State Rolle's Theorem's THREE hypotheses precisely: $f$ continuous on $[a,b]$, differentiable on $(a,b)$, AND $f(a)=f(b)$ — and recognize that ALL THREE must hold before the conclusion (existence of $c$ with $f'(c)=0$) is guaranteed.
- LO2: Recognize Rolle's Theorem as the SPECIAL CASE of the Mean Value Theorem where the endpoint values are EQUAL — MVT's conclusion $f'(c)=\frac{f(b)-f(a)}{b-a}$ collapses to $f'(c)=0$ exactly when $f(a)=f(b)$ (making the average rate of change zero).
- LO3: Recognize that when a hypothesis FAILS, the conclusion may still happen to hold by coincidence, but is NOT GUARANTEED — the theorem's power is in the guarantee, not in every individual case.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.mean-value-theorem` — Rolle's theorem is its direct special case.

## Component 3 — Core Explanation

**Rolle's Theorem** states: if $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$, then there exists at least one $c\in(a,b)$ with $f'(c)=0$ — geometrically, if a smooth curve starts and ends at the SAME height, it must have a horizontal tangent SOMEWHERE in between.

Rolle's theorem is exactly the SPECIAL CASE of the **Mean Value Theorem** where $f(a)=f(b)$: MVT guarantees $f'(c)=\frac{f(b)-f(a)}{b-a}$ for some $c$; when $f(a)=f(b)$, the numerator becomes 0, so the guaranteed value becomes $f'(c)=0$ specifically.

All THREE hypotheses are essential — if even one fails (e.g. $f$ isn't differentiable at some interior point, or $f(a)\ne f(b)$), the CONCLUSION is no longer guaranteed. It might still happen to hold in a particular example (by coincidence), but the theorem provides no such assurance in that case.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — basic application, breaking MC-1)**: Verify Rolle's theorem applies to $f(x)=x^2-4x+3$ on $[1,3]$, and find $c$. $f$ is a polynomial (continuous and differentiable everywhere). $f(1)=1-4+3=0$, $f(3)=9-12+3=0$ — EQUAL, so all three hypotheses hold. $f'(x)=2x-4$; setting $f'(c)=0$: $2c-4=0\Rightarrow c=2\in(1,3)$ — confirmed. A common error skips VERIFYING $f(a)=f(b)$ explicitly, jumping straight to solving $f'(c)=0$ without first confirming the hypothesis actually holds — the theorem's guarantee is CONDITIONAL on this equality, so it must be checked, not assumed.

**Example 2 (LO3 — a hypothesis failure, breaking MC-2)**: Consider $f(x)=|x|$ on $[-1,1]$. $f(-1)=1=f(1)$ (endpoints equal), and $f$ is continuous on $[-1,1]$ — but $f$ is NOT differentiable at $x=0\in(-1,1)$ (a corner, from `math.calc.differentiability`). Since the differentiability hypothesis FAILS, Rolle's theorem's conclusion is NOT guaranteed — and indeed, checking directly, $f'(x)=\pm1$ everywhere it's defined, NEVER equal to 0 anywhere in $(-1,1)$; the guaranteed horizontal tangent genuinely does not exist here. A common error assumes that since two of the three hypotheses hold (continuity, equal endpoints), the theorem's conclusion should still approximately apply or "probably" hold — but ANY failed hypothesis fully voids the guarantee; this example shows the conclusion can genuinely FAIL when differentiability breaks down.

**Example 3 (LO2 — connecting to MVT explicitly)**: For $f(x)=x^2$ on $[0,2]$ (where $f(0)=0\ne4=f(2)$, so Rolle's theorem's equal-endpoints hypothesis does NOT hold), apply the more general MVT instead: $f'(c)=\frac{f(2)-f(0)}{2-0}=\frac{4}{2}=2$. Solving $2c=2\Rightarrow c=1$. This shows Rolle's theorem is a NARROWER tool (only for equal endpoints), while MVT applies more broadly.

## Component 5 — Teaching Actions

### Teaching Action A01 — Verify All Three Hypotheses Explicitly Before Applying the Theorem (Primitive P64: Conceptual Shift)

Work Example 1, explicitly checking each of the three hypotheses in turn before solving for $c$.

- **MC-1 hook**: check whether $f(a)=f(b)$ is explicitly verified, not just assumed.

### Teaching Action A02 — A Failed Hypothesis Voids the Guarantee, Even If Others Hold (Primitive P06: Contrast Pair)

Work Example 2, explicitly showing the conclusion genuinely fails when the differentiability hypothesis breaks, despite the other two holding.

- **MC-2 hook**: this directly targets MC-2 (assuming partial hypothesis satisfaction still provides some guarantee).

### Teaching Action A03 — Rolle's Theorem as MVT's Special Case (Primitive P11: Representation Shift)

Work Example 3, explicitly connecting Rolle's theorem's formula to MVT's more general one via the equal-endpoints substitution.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Verify Rolle's theorem applies to $f(x)=x^2-2x$ on $[0,2]$, and find $c$.
  2. Explain why Rolle's theorem does NOT apply to $f(x)=1/x$ on $[-1,1]$ (identify which hypothesis fails).
  3. Explain, in one sentence, why Rolle's theorem is a special case of the Mean Value Theorem.
  4. For $f(x)=\sqrt[3]{x}$ on $[-1,1]$ (where $f(-1)=-1\ne1=f(1)$... note the endpoints actually aren't equal here — instead verify differentiability fails at $x=0$ for the related function $g(x)=|x|^{2/3}$ on the same interval with $g(-1)=g(1)=1$), determine whether Rolle's theorem applies and justify.
- **P76 (Transfer Probe, mode = independence)**: "A ball is thrown straight up and returns to the SAME height 4 seconds later ($h(0)=h(4)$, where $h(t)$ is height as a function of time). (a) Using Rolle's theorem, explain why there must be some instant during the flight when the ball's velocity is EXACTLY zero, and identify what that instant physically represents. (b) Explain why this conclusion depends on the height function being differentiable everywhere during the flight (i.e., no instantaneous, corner-like changes in velocity) — what would have to go wrong physically for this guarantee to fail?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EQUAL-ENDPOINT-HYPOTHESIS-NOT-EXPLICITLY-VERIFIED | Solving for c directly without first explicitly confirming f(a)=f(b) actually holds | Moderate |
| MC-2 | PARTIAL-HYPOTHESIS-SATISFACTION-ASSUMED-TO-STILL-GUARANTEE-THE-CONCLUSION | Assuming the theorem's conclusion still approximately holds when only some (not all) of its three hypotheses are satisfied | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Equal Endpoint Hypothesis Not Explicitly Verified") → P41 (detect: present Example 1 and check whether $f(a)=f(b)$ is verified before solving) → P64 (conceptual shift: re-work the problem, computing and comparing $f(a)$ and $f(b)$ explicitly first).
- **B02 (targets MC-2)**: P27 ("Partial Hypothesis Satisfaction Assumed to Still Guarantee the Conclusion") → P41 (detect: present Example 2 and check whether the conclusion is (incorrectly) assumed to still hold) → P64 (conceptual shift: re-verify each hypothesis individually, confirming that one failure fully voids the theorem's guarantee, then directly checking that $f'(c)=0$ genuinely has no solution here).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.mean-value-theorem`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.calc.mean-value-theorem` (Rolle's theorem is its direct special case).
- **Parent**: `math.calc.mean-value-theorem`.

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that this is a direct special case requiring careful hypothesis-checking rather than extensive new computation.
- MC-2 was ranked Foundational because it reflects a genuine misunderstanding of how mathematical theorems' hypotheses function (all-or-nothing guarantees), a broadly important logical habit beyond this specific theorem.
- The ball-in-flight transfer probe was deliberately chosen because a projectile's identical launch and landing height is an intuitive, physically concrete instance of the equal-endpoints hypothesis, making the "must be a moment of zero velocity" conclusion immediately meaningful (the peak of the trajectory).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.mean-value-theorem`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

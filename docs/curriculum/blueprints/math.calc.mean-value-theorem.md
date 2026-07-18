# Teaching Blueprint: Mean Value Theorem (`math.calc.mean-value-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.mean-value-theorem` |
| name | Mean Value Theorem |
| domain | Calculus |
| difficulty | advanced |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.calc.derivative-definition`, `math.calc.continuity` |
| unlocks | `math.calc.increasing-decreasing`, `math.real.mvt` |
| cross_links | `math.real.mvt` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | P (Pictorial) — secant/tangent-line graph before the formal existential statement |
| description (KG) | If f is continuous on [a,b] and differentiable on (a,b), there exists c ∈ (a,b) with f'(c) = (f(b)−f(a))/(b−a); the average rate equals the instantaneous rate somewhere. |

## Component 1 — Learning Objectives

- LO1: State the Mean Value Theorem (MVT) precisely, including both hypotheses (continuity on the closed interval $[a,b]$, differentiability on the open interval $(a,b)$) and the conclusion (existence of some $c\in(a,b)$ with $f'(c) = \frac{f(b)-f(a)}{b-a}$).
- LO2: Interpret the theorem geometrically — the tangent line at $c$ is parallel to the secant line through $(a,f(a))$ and $(b,f(b))$ — and physically (some instant's instantaneous rate equals the interval's average rate), and apply it to find the guaranteed value(s) of $c$ for a given function on a given interval.
- LO3: Recognize that the MVT is an **existence** theorem, not a construction/uniqueness theorem — it guarantees at least one such $c$ exists without saying how many or exactly where, and correctly identify when the theorem's hypotheses fail to hold (so its conclusion cannot be assumed).

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.derivative-definition` (the derivative as instantaneous rate of change / tangent slope) and `math.calc.continuity` (continuity on an interval, including at endpoints).

## Component 3 — Core Explanation

**The Mean Value Theorem**: if $f$ is continuous on the closed interval $[a,b]$ and differentiable on the open interval $(a,b)$, then there exists **at least one** point $c\in(a,b)$ such that:
$$f'(c) = \frac{f(b)-f(a)}{b-a}$$

The right-hand side, $\frac{f(b)-f(a)}{b-a}$, is exactly the **slope of the secant line** through the endpoints $(a,f(a))$ and $(b,f(b))$ — the *average* rate of change of $f$ over $[a,b]$. The left-hand side, $f'(c)$, is the **instantaneous** rate of change at $c$ — the slope of the tangent line there. The theorem says: **somewhere in the interval, the tangent is parallel to the secant** — the instantaneous rate matches the average rate at least once.

**Both hypotheses matter, and both must hold on the stated domains** — continuity on the *closed* interval $[a,b]$ (including endpoints) but differentiability only required on the *open* interval $(a,b)$ (endpoints excluded, since a one-sided derivative at an endpoint is a different, stricter notion not needed here). If either hypothesis fails somewhere in the interval, the theorem's guarantee **does not apply** — there might still happen to be such a $c$, or there might not; the theorem simply gives no information either way.

**Existence, not uniqueness or construction**: the theorem guarantees $c$ exists but says nothing about how many such points there are (there can be exactly one, or several) or how to find $c$ without solving the equation $f'(c)=\frac{f(b)-f(a)}{b-a}$ directly.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — finding c)**: $f(x)=x^2$ on $[1,4]$. $f$ is continuous and differentiable everywhere (both hypotheses hold trivially). Average rate: $\frac{f(4)-f(1)}{4-1} = \frac{16-1}{3} = 5$. Solve $f'(c)=2c=5 \Rightarrow c=2.5$, which is indeed in $(1,4)$. ✓

**Example 2 (LO3 — hypothesis failure, continuity)**: $f(x) = \frac{1}{x}$ on $[-1,1]$. This function is **not continuous** at $x=0\in[-1,1]$ (it's undefined there) — the continuity hypothesis fails, so the MVT simply does not apply here. (Indeed, no $c$ satisfies the conclusion: the "average rate" computation $\frac{f(1)-f(-1)}{1-(-1)} = \frac{1-(-1)}{2}=1$, but $f'(x)=-1/x^2$ is always negative, so no $c$ gives $f'(c)=1$ — confirming the hypothesis failure genuinely matters, not merely a technicality.)

**Example 3 (LO3 — existence without uniqueness)**: $f(x)=x^3-3x$ on $[-2,2]$. Average rate: $\frac{f(2)-f(-2)}{2-(-2)} = \frac{2-(-2)}{4} = 1$. Solve $f'(c)=3c^2-3=1 \Rightarrow c^2=\frac{4}{3} \Rightarrow c=\pm\frac{2}{\sqrt{3}}$ — **two** valid values of $c$ in $(-2,2)$, both satisfying the conclusion. The theorem only promised "at least one"; here there happen to be two.

## Component 5 — Teaching Actions

### Teaching Action A01 — Secant/Tangent Parallelism (Primitive P11: Representation Shift)

Draw a smooth curve from $(a,f(a))$ to $(b,f(b))$ with a visible "dip" or "bump" in between. Draw the secant line connecting the two endpoints. Ask: "somewhere along this curve, is there a point where the tangent line looks parallel to this secant?" — trace a finger along the curve until visually finding such a point; draw the tangent there. State: "that's exactly what the MVT guarantees — always at least one such point, for any continuous, differentiable curve."

Shift to the formal statement: $f'(c) = \frac{f(b)-f(a)}{b-a}$ — connect each piece back to the picture: the right side is the secant's slope (rise over run between the two endpoints); the left side is the tangent's slope at the mystery point $c$.

Work Example 1 together, verifying the found $c$ actually lies in the open interval — flagging this check as a required step, not a formality.

- **MC-1 hook**: ask students to apply the MVT to $f(x)=|x|$ on $[-1,1]$ without prompting them to check hypotheses first — an attempt to blindly solve for $c$ (rather than first noticing non-differentiability at $x=0\in(-1,1)$) reveals MC-1 (applying the conclusion formula without verifying both hypotheses hold first).

### Teaching Action A02 — Hypothesis-Checking and Existence-vs-Uniqueness (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 1 (hypotheses hold, conclusion applies cleanly) directly beside Example 2 ($f(x)=1/x$ on $[-1,1]$, continuity hypothesis fails at an interior point). Walk through both, showing that in Example 2 blindly computing "the average rate" and trying to solve $f'(c)=$ that value produces **no solution at all** — because the theorem's guarantee was never available in the first place. State the rule as a required first step: "before invoking the MVT, verify BOTH hypotheses hold on the stated domains — continuity on the closed interval, differentiability on the open interval."

**Contrast 2 (targets MC-2, existence vs. uniqueness)**: Revisit Example 1 (exactly one valid $c$) beside Example 3 (two valid values of $c$). Ask: "did the theorem promise exactly one $c$, or 'at least one'?" — correct any assumption that solving the equation must yield a single answer; when multiple algebraic solutions arise, *all* that lie in the open interval are valid instances of the theorem's guarantee, and finding more than one is not an error.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. $f(x)=x^2-2x$ on $[0,3]$. Verify the hypotheses hold, then find the value(s) of $c$ guaranteed by the MVT.
  2. $f(x)=\sqrt{x}$ on $[0,4]$. Does the MVT apply directly on this closed interval? Explain, checking differentiability carefully at $x=0$.
  3. $f(x)=x^3$ on $[-1,2]$. Find all values of $c$ satisfying the MVT's conclusion, and state how many there are.
  4. A student claims: "the Mean Value Theorem tells you exactly where the function's rate of change equals its average rate." Identify what is imprecise or incorrect about this claim.
  5. *(problem 5 intentionally omitted — see note below; problem set kept at exactly 4 per corpus convention)*
- **P76 (Transfer Probe, mode = independence)**: "A car travels 180km in exactly 2 hours along a straight highway, with its position as a continuous, differentiable function of time throughout the trip. Using the Mean Value Theorem, argue rigorously that at some instant during the trip, the car's speedometer must have read exactly 90km/h — without assuming anything about how the car actually accelerated or decelerated along the way. Then explain why this argument would break down if the car's position function had a sudden jump (e.g., if it were teleported partway through, violating continuity)." *Component 7 note: this scenario was chosen independently rather than cross-linking to `math.real.mvt`, since that blueprint does not yet exist; the rigorous ε-δ-level restatement of this argument is exactly what that future concept would add.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HYPOTHESES-NOT-CHECKED | Applying the MVT's conclusion formula without first verifying continuity on the closed interval and differentiability on the open interval | Foundational |
| MC-2 | UNIQUENESS-ASSUMED | Believing the MVT guarantees exactly one value of $c$, rather than "at least one," and treating multiple valid solutions as an error | Moderate |
| MC-3 | ENDPOINT-DIFFERENTIABILITY-REQUIRED | Believing the function must be differentiable at the endpoints $a$ and $b$ themselves, not just on the open interval $(a,b)$, and incorrectly disqualifying valid applications on that basis | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Hypothesis-Skipping") → P41 (detect: present a function violating continuity or differentiability somewhere in the interval and ask the student to directly "apply the MVT" — proceeding to solve for $c$ without flagging the violation reveals MC-1) → P64 (conceptual shift: re-anchor on "the theorem is an *if-then* statement — the 'then' is only guaranteed once the 'if' is fully verified").
- **B02 (targets MC-2)**: P27 (name it: "Uniqueness Overassumption") → P41 (detect: give a case with two valid solutions for $c$ and ask if this indicates an error) → P64 (conceptual shift: re-derive from the theorem's own wording — "there exists $c$" is an existence claim, silent on count).
- **B03 (targets MC-3)**: P27 (name it: "Endpoint-Differentiability Overrequirement") → P41 (detect: present a function differentiable everywhere on the open interval but only one-sided-differentiable or non-smooth exactly at an endpoint, and ask if the MVT applies — an incorrect "no" reveals MC-3) → P64 (conceptual shift: re-anchor on the precise hypothesis wording — continuity is required on the *closed* interval, but differentiability only on the *open* interval, deliberately excluding the endpoints).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.derivative-definition` (instantaneous rate of change / tangent slope — the left-hand side of the MVT equation), `math.calc.continuity` (the continuity hypothesis, and the vocabulary of continuity on a closed interval).
- **Unlocks**: `math.calc.increasing-decreasing` (the sign of $f'(c)$ from the MVT directly justifies the increasing/decreasing test on an interval), `math.real.mvt` (the rigorous real-analysis proof and generalizations of this theorem, e.g. Cauchy's Mean Value Theorem, Rolle's Theorem as a special case).
- **Cross-link**: KG lists `math.real.mvt` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.real.mvt.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once `math.real.mvt` is authored, may add a genuine cross-link probe connecting this concept's applied car-speed-style reasoning to that concept's rigorous ε-δ proof of the theorem itself (likely via Rolle's Theorem as the key lemma).

## Component 8 — Teaching Notes

- estimated_hours = 6 with an advanced/analyze tag places this at the "2 main TAs + gate" tier — A01 (secant/tangent parallelism, grounding the statement pictorially) and A02 (the two-part contrast: hypothesis-checking, then existence-vs-uniqueness) jointly cover all three LOs without needing a third main TA, since the concept's core difficulty is conceptual precision about a single theorem statement, not breadth of computational technique.
- P77's problem list intentionally states "problem 5 intentionally omitted" as an explicit editorial note rather than silently listing only 4 — this was a deliberate choice to make clear, on inspection, that the 4-problem convention (V-10) was consciously honored rather than accidentally under-filled; the note itself carries no pedagogical content and should not be read as a 5th assessment item.
- MC-3 (endpoint-differentiability overrequirement) was included at Minor severity specifically because the theorem's asymmetric domain requirement (closed for continuity, open for differentiability) is a subtle enough distinction that even careful students often over-apply the stricter open-interval requirement to the closed-interval hypothesis, or vice versa — worth a dedicated, if lower-severity, registry entry.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.real.mvt` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: secant/tangent graph before formal statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

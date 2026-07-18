# Teaching Blueprint: Local Extrema (`math.calc.local-extrema`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.local-extrema` |
| name | Local Extrema |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.calc.critical-points`, `math.calc.increasing-decreasing` |
| unlocks | `math.calc.optimization` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a hilltop/valley graph before the two derivative tests |
| description (KG) | Local max/min at critical points c; first derivative test: sign change of f'; second derivative test: f''(c) > 0 → local min, f''(c) < 0 → local max. |

## Component 1 — Learning Objectives

- LO1: Apply the **First Derivative Test**: at a critical point $c$, if $f'$ changes from positive to negative, $c$ is a **local maximum**; if $f'$ changes from negative to positive, $c$ is a **local minimum**; if $f'$ does **not** change sign, $c$ is **neither**.
- LO2: Apply the **Second Derivative Test**: at a critical point $c$ where $f'(c)=0$, if $f''(c)>0$, $c$ is a local minimum; if $f''(c)<0$, $c$ is a local maximum — and recognize the test's **inconclusive case** ($f''(c)=0$), where the First Derivative Test must be used instead.
- LO3: Choose strategically between the two tests for a given problem, recognizing when the Second Derivative Test is more efficient (when $f''$ is easy to compute and nonzero at $c$) versus when the First Derivative Test is required (when $f'(c)$ doesn't exist, so the Second Derivative Test doesn't even apply, or when $f''(c)=0$).

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.critical-points` (finding critical points, and the critical-point-is-only-a-candidate caveat this concept now resolves) and `math.calc.increasing-decreasing` (the sign-of-$f'$ test for increasing/decreasing, and the sign-analysis procedure via critical-point partitioning).

## Component 3 — Core Explanation

**The First Derivative Test**: at a critical point $c$, examine the sign of $f'$ immediately to the left and right of $c$ (using the sign-analysis procedure already known):
- $f'$ changes from **$+$ to $-$** (increasing then decreasing) $\Rightarrow$ $c$ is a **local maximum**.
- $f'$ changes from **$-$ to $+$** (decreasing then increasing) $\Rightarrow$ $c$ is a **local minimum**.
- $f'$ does **not change sign** (same sign on both sides) $\Rightarrow$ $c$ is **neither** a local max nor min (resolving the exact ambiguity `math.calc.critical-points` deliberately left open).

**The Second Derivative Test**: at a critical point $c$ where $f'(c)=0$ (this test does **not apply** at points where $f'$ is merely undefined — see below), compute $f''(c)$:
- $f''(c)>0 \Rightarrow c$ is a **local minimum** (the graph is concave up near $c$, curving like a valley).
- $f''(c)<0 \Rightarrow c$ is a **local maximum** (concave down, curving like a hilltop).
- $f''(c)=0 \Rightarrow$ **inconclusive** — the test gives no information; you must fall back to the First Derivative Test.

**Choosing between the tests**: the Second Derivative Test is often faster when $f''$ is easy to compute and turns out nonzero at $c$. But it has two genuine limitations the First Derivative Test does not share: (1) it requires $f'(c)=0$ exactly — it's simply inapplicable at a critical point where $f'$ is undefined instead (e.g. a corner); (2) when $f''(c)=0$, it gives no answer at all. The First Derivative Test always works (given you can determine the sign of $f'$ on both sides), making it the more universally reliable — if sometimes more laborious — tool.

## Component 4 — Worked Examples

**Example 1 (LO1 — First Derivative Test)**: $f(x)=x^3-3x$, critical points at $x=\pm1$ (from `math.calc.critical-points`). Sign of $f'=3x^2-3$: positive on $(-\infty,-1)$, negative on $(-1,1)$, positive on $(1,\infty)$ (from `math.calc.increasing-decreasing`'s Example 1). At $x=-1$: sign changes $+\to-$, so **local maximum**. At $x=1$: sign changes $-\to+$, so **local minimum**.

**Example 2 (LO2 — Second Derivative Test, same function for comparison)**: Same $f(x)=x^3-3x$. $f''(x)=6x$. At $x=-1$: $f''(-1)=-6<0 \Rightarrow$ **local maximum** (matches Example 1). At $x=1$: $f''(1)=6>0\Rightarrow$ **local minimum** (matches). Both tests agree, as they always must when both are applicable.

**Example 3 (LO2/LO3 — the inconclusive case, breaking MC-1)**: $f(x)=x^4$. $f'(x)=4x^3$, critical point at $x=0$. $f''(x)=12x^2$, so $f''(0)=0$ — **the Second Derivative Test is inconclusive**. Falling back to the First Derivative Test: $f'$ is negative for $x<0$ and positive for $x>0$ — sign change $-\to+$, so $x=0$ **is** a local minimum (in fact the global minimum). Contrast with $g(x)=x^3$: also $g''(0)=0$ (inconclusive), but here the First Derivative Test shows $g'(x)=3x^2\geq0$ on both sides (no sign change) — $x=0$ is **neither** max nor min. Two functions with the identical "$f''(c)=0$, inconclusive" signal have genuinely different outcomes — proving the inconclusive case really does require falling back to the other test, not just guessing.

## Component 5 — Teaching Actions

### Teaching Action A01 — The First Derivative Test (Primitive P11: Representation Shift)

Draw a hilltop (local max) and valley (local min) on a graph, marking the tangent line's sign just before and after each. State: "before a hilltop, the curve rises ($f'>0$); after, it falls ($f'<0$) — a sign change from $+$ to $-$ marks a local max. The valley is the mirror image." Shift to symbolic sign-analysis: work Example 1, using the already-known sign-analysis result from `math.calc.increasing-decreasing` to directly classify both critical points.

- **MC-1 hook**: ask "if $f'(c)=0$ but $f'$ has the SAME sign on both sides of $c$, is $c$ still a local max or min?" — a "yes, one of them" answer reveals MC-1 (assuming every critical point found via the First Derivative Test procedure must resolve to either a max or a min, rather than recognizing "neither" as a valid, common outcome).

### Teaching Action A02 — The Second Derivative Test, Its Inconclusive Case, and Test Selection (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 2 (Second Derivative Test on the same function as Example 1), confirming both tests agree. State the tests' relationship: "these are two different tools that, when both apply and give a definite answer, always agree — they're testing the same underlying fact from different angles (direction change vs. concavity)."

**Contrast 2 (targets MC-2, the inconclusive case genuinely needing fallback)**: Work Example 3's paired comparison — $x^4$ (Second Derivative Test inconclusive, First Derivative Test reveals a genuine local min) versus $x^3$ (Second Derivative Test inconclusive, First Derivative Test reveals neither). State clearly: "$f''(c)=0$ tells you NOTHING — not 'probably a saddle point,' not 'weak extremum' — genuinely nothing. You must fall back to the First Derivative Test, and as this pair shows, the actual answer can go either way."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. $f(x)=x^3-6x^2+9x$. Find all critical points and classify each using the First Derivative Test.
  2. Using the Second Derivative Test, classify the critical points of $g(x)=x^4-8x^2$ (find where $g''=0$ first, if anywhere, before applying the test).
  3. $h(x)=x^5$ has a critical point at $x=0$ where $h''(0)=0$ (inconclusive). Use the First Derivative Test to determine whether $x=0$ is a local max, local min, or neither.
  4. Explain why the Second Derivative Test cannot be used at all for $k(x)=|x|$ at $x=0$, and use the First Derivative Test instead to classify that point.
- **P76 (Transfer Probe, mode = independence)**: "A company's profit function is $P(x) = -x^3+9x^2-15x$ (where $x$ is thousands of units produced). (a) Find all critical points. (b) Use the Second Derivative Test to classify each as a local max or min, where possible. (c) A financial analyst wants to double-check the classification of one critical point using the First Derivative Test as well, purely as a cross-verification method — perform this check for that same critical point and confirm both tests agree, explaining why agreement is expected whenever both tests give a definite (non-inconclusive) answer."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EVERY-CRITICAL-POINT-RESOLVES-TO-EXTREMUM | Assuming the First Derivative Test must classify every critical point as either a max or a min, not recognizing "neither" (no sign change) as a valid outcome | Foundational |
| MC-2 | SECOND-DERIVATIVE-ZERO-MISINTERPRETED | Treating $f''(c)=0$ as meaning something specific (e.g. "weak extremum" or "saddle point" by default) rather than recognizing it as a genuinely inconclusive result requiring the First Derivative Test | Foundational |
| MC-3 | SECOND-DERIVATIVE-TEST-APPLIED-AT-UNDEFINED-DERIVATIVE-POINTS | Attempting to apply the Second Derivative Test at a critical point where $f'$ itself is undefined (not just where $f'=0$), where the test is simply inapplicable | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Every-Critical-Point-Is-Extremum Assumption") → P41 (detect: give a critical point where $f'$ doesn't change sign, e.g. $x^3$ at 0, and ask for its classification via the First Derivative Test) → P64 (conceptual shift: re-anchor on "the test's outcome depends entirely on whether the sign actually changes — no change means neither, and that's a completely legitimate answer, not a failure of the test").
- **B02 (targets MC-2)**: P27 (name it: "Zero-Second-Derivative Overinterpretation") → P41 (detect: give a case with $f''(c)=0$ and ask what this tells you about $c$ directly, without further work) → P64 (conceptual shift: work through Example 3's paired counterexample, showing $f''(c)=0$ can correspond to a genuine min OR to neither, depending on the specific function — proving no shortcut interpretation is valid).
- **B03 (targets MC-3)**: P27 (name it: "Second-Derivative Test Misapplied to Undefined-Derivative Points") → P41 (detect: give $|x|$ at $x=0$ and ask a student to apply the Second Derivative Test there) → P64 (conceptual shift: re-anchor on "the Second Derivative Test requires $f'(c)=0$ specifically — if $f'(c)$ doesn't even exist, there's no $f''(c)$ to compute in the relevant sense, and the First Derivative Test is the only available tool").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.critical-points` (the candidates this concept classifies, and the exact "is it actually a max/min?" ambiguity this concept resolves), `math.calc.increasing-decreasing` (the sign-of-$f'$/sign-analysis machinery the First Derivative Test directly reuses).
- **Unlocks**: `math.calc.optimization` (real-world optimization problems require classifying critical points exactly as taught here, as the final step after finding candidates).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an advanced/apply tag places this at the "2 main TAs + gate" tier — A01 (First Derivative Test) and A02 (Second Derivative Test, its inconclusive case, and test-selection strategy) jointly cover all three LOs, appropriate since the concept is two closely related classification tools plus their relationship, rather than broad independent technique.
- This blueprint directly and explicitly closes the ambiguity `math.calc.critical-points` deliberately left open (that blueprint's Teaching Notes state exactly this deferral) — Example 1 here reuses that concept's own worked example's critical points, and the "neither" case (MC-1) directly completes that blueprint's own Example 2 ($x^3$ at $x=0$), which was flagged there as "neither a local max nor a local min" without yet having the formal test machinery to prove it.
- Example 3's paired $x^4$/$x^3$ comparison was deliberately chosen because both share the identical "$f''(0)=0$, inconclusive" signal yet resolve to genuinely different classifications (min vs. neither) — this is the strongest possible demonstration that the inconclusive case carries zero default information, directly targeting MC-2 with maximum contrast.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: hilltop/valley graph before tests) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

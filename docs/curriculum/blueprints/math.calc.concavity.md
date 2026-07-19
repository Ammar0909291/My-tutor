# Teaching Blueprint: Concavity and Inflection Points (`math.calc.concavity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.concavity` |
| name | Concavity and Inflection Points |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.calc.higher-order-derivatives` |
| unlocks | `math.calc.curve-sketching` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a cup vs. cap curve shape before the $f''$ sign test |
| description (KG) | f is concave up where f'' > 0 (cup shape) and concave down where f'' < 0 (cap shape); inflection points where concavity changes. |

## Component 1 — Learning Objectives

- LO1: Determine concavity from the sign of $f''$: $f''(x)>0$ on an interval $\Rightarrow$ $f$ is **concave up** (cup shape, tangent lines lie below the curve); $f''(x)<0$ $\Rightarrow$ **concave down** (cap shape, tangent lines lie above the curve).
- LO2: Find **inflection points** — locations where concavity actually **changes** — by finding where $f''(x)=0$ or is undefined, then verifying via a sign change of $f''$ on either side (directly refuting the misconception that $f''(x)=0$ alone guarantees an inflection point).
- LO3: Distinguish concavity from monotonicity: recognize that a function can be increasing while concave up, increasing while concave down, decreasing while concave up, or decreasing while concave down — the two properties (direction and curvature) vary independently.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.higher-order-derivatives` (computing $f''=(f')'$ as the derivative of the derivative) — concavity is the direct geometric interpretation of the sign of that second derivative.

## Component 3 — Core Explanation

**Concave up / concave down**: on an interval where $f''(x)>0$, the slope $f'$ is itself increasing, meaning the curve bends upward like a cup ($\cup$) — tangent lines drawn anywhere on this interval lie **below** the curve. Where $f''(x)<0$, the slope is decreasing, the curve bends downward like a cap ($\cap$), and tangent lines lie **above** the curve.

**Inflection points**: a point $c$ is an inflection point if the concavity of $f$ genuinely **changes** at $c$ — from up to down or down to up. The candidates for inflection points are found where $f''(x)=0$ or where $f''$ is undefined, exactly parallel to how critical points are candidates (not guarantees) for extrema. **Finding $f''(c)=0$ is not enough** — you must check that $f''$ actually changes sign across $c$; if it doesn't, $c$ is merely a point of momentary flatness in curvature, not a true inflection point.

**Concavity is independent of monotonicity**: whether $f$ is increasing or decreasing is governed by the sign of $f'$; whether $f$ is concave up or down is governed by the sign of $f''$ — these are two separate first- and second-derivative sign patterns, and all four combinations (increasing/concave-up, increasing/concave-down, decreasing/concave-up, decreasing/concave-down) genuinely occur. A common intuitive error is to assume "concave up" means "increasing" (like assuming a cup shape only appears while a graph is rising) — but a decreasing function can be concave up too (e.g. its rate of decrease is slowing down).

## Component 4 — Worked Examples

**Example 1 (LO1 — determining concavity from the sign of $f''$)**: $f(x)=x^3-3x^2$. $f'(x)=3x^2-6x$, $f''(x)=6x-6$. $f''(x)>0$ when $x>1$ (concave up there); $f''(x)<0$ when $x<1$ (concave down there).

**Example 2 (LO2 — a genuine inflection point vs. the false-positive case, breaking MC-1)**: Continuing Example 1, $f''(x)=0$ at $x=1$, and since $f''$ changes sign from negative ($x<1$) to positive ($x>1$) across $x=1$, this **is** a genuine inflection point. Contrast with $g(x)=x^4$: $g''(x)=12x^2$, so $g''(0)=0$, but $g''(x)=12x^2\ge0$ for **all** $x$ — no sign change across $x=0$. So despite $g''(0)=0$, $x=0$ is **not** an inflection point for $g(x)=x^4$ (the curve stays concave up throughout, just momentarily flattening at $x=0$). Two functions with the identical "$f''=0$ at a point" signal have genuinely different outcomes (real inflection vs. none), proving $f''(c)=0$ alone never suffices.

**Example 3 (LO3 — concavity independent of monotonicity, breaking MC-2)**: Let $h(x)=-x^2$ on the interval $x<0$. $h'(x)=-2x$, which is positive for $x<0$, so $h$ is **increasing**. $h''(x)=-2<0$, so $h$ is **concave down** throughout — an increasing, concave-down function (like decelerating growth). Now let $k(x)=x^2$ on $x<0$: $k'(x)=2x<0$ for $x<0$, so $k$ is **decreasing**, yet $k''(x)=2>0$, so $k$ is **concave up** — a decreasing, concave-up function (the rate of decrease is slowing as $x\to0^-$). These two examples show all four direction/curvature combinations are genuinely independent, not linked.

## Component 5 — Teaching Actions

### Teaching Action A01 — Concavity from the Sign of f'' (Primitive P11: Representation Shift)

Draw a cup shape and a cap shape side by side, marking a few tangent lines on each — below the curve for the cup, above for the cap. State: "the second derivative tells you which way the curve is bending — positive means bending up like a cup, negative means bending down like a cap." Shift to symbolic sign-analysis via Example 1, computing $f''$ and partitioning the number line exactly as in the already-known first-derivative sign-analysis procedure.

### Teaching Action A02 — Finding True Inflection Points, Not Just f''=0 (Primitive P06: Contrast Pair)

**Contrast** Example 2's paired case: $f(x)=x^3-3x^2$ (genuine inflection at $x=1$, sign change confirmed) versus $g(x)=x^4$ ($g''(0)=0$ but no sign change, no inflection). State clearly: "$f''(c)=0$ only makes $c$ a **candidate** — you must check that the sign of $f''$ actually flips on either side, exactly like checking a critical point is a genuine extremum."

- **MC-1 hook**: ask "if $f''(c)=0$, is $c$ automatically an inflection point?" — a "yes" answer reveals MC-1 (treating $f''(c)=0$ as sufficient for an inflection point, without checking for an actual sign change).

### Teaching Action A03 — Concavity Is Independent of Direction (Primitive P06: Contrast Pair)

Present Example 3's two functions ($h(x)=-x^2$: increasing + concave down; $k(x)=x^2$ on $x<0$: decreasing + concave up) side by side. State: "direction (increasing/decreasing) comes from $f'$; curvature (concave up/down) comes from $f''$ — these are two independent questions, and all four combinations happen in practice."

- **MC-2 hook**: ask "does concave up always mean the function is increasing?" — a "yes" answer reveals MC-2 (conflating concave-up shape with increasing direction, rather than recognizing they're governed by separate derivatives).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. $f(x)=x^3-6x^2+9x$. Find where $f$ is concave up and concave down, and identify any inflection points.
  2. For $g(x)=x^4-4x^3$, find all points where $g''(x)=0$, then determine which (if any) are genuine inflection points by checking for a sign change.
  3. Give an example of a function that is decreasing and concave down on some interval, and justify both properties using $f'$ and $f''$.
  4. A student claims: "since $h''(2)=0$, the graph of $h$ must have an inflection point at $x=2$." Explain what additional check is needed before this claim can be confirmed, and give a counterexample where $h''(2)=0$ but $x=2$ is not an inflection point.
- **P76 (Transfer Probe, mode = independence)**: "A company's cumulative profit over time, $P(t)$, is increasing throughout a certain quarter, but an analyst notices the RATE of profit growth is itself slowing down partway through the quarter, then speeding back up. (a) Describe what this means about the sign of $P'(t)$ throughout the quarter. (b) Describe what it means about the sign of $P''(t)$ before and after the slowdown's low point. (c) Is the point where the growth rate stops slowing and starts speeding up again an inflection point of $P(t)$? Justify using the concavity-change criterion, not just $P''=0$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SECOND-DERIVATIVE-ZERO-ASSUMED-INFLECTION | Treating $f''(c)=0$ as sufficient by itself for $c$ to be an inflection point, without verifying that $f''$ actually changes sign across $c$ | Foundational |
| MC-2 | CONCAVITY-CONFLATED-WITH-MONOTONICITY | Believing concave up implies increasing (or concave down implies decreasing), rather than recognizing direction and curvature are governed independently by $f'$ and $f''$ | Foundational |
| MC-3 | INFLECTION-POINT-SEARCH-IGNORES-UNDEFINED-f-DOUBLE-PRIME | Searching for inflection points only where $f''(x)=0$, overlooking points where $f''$ is undefined but still changes sign there | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Zero-Second-Derivative-Is-Inflection Assumption") → P41 (detect: give $g(x)=x^4$ and ask whether $x=0$ is an inflection point, given $g''(0)=0$) → P64 (conceptual shift: re-walk Example 2's paired contrast, showing $f''=0$ with a sign change (genuine inflection) versus $f''=0$ with no sign change (not an inflection), re-anchoring on "check the sign change, not just the zero").
- **B02 (targets MC-2)**: P27 (name it: "Concavity-Direction Conflation") → P41 (detect: ask "is a decreasing function ever concave up?" and observe if the student says no) → P64 (conceptual shift: re-present Example 3's $k(x)=x^2$ on $x<0$ — decreasing yet concave up — as direct proof the two properties are independent).
- **B03 (targets MC-3)**: P27 (name it: "Undefined-f''-Inflection-Point Overlooked") → P41 (detect: give a function like $f(x)=x^{1/3}$, where $f''$ is undefined at $x=0$ but changes sign there, and ask for all inflection points) → P64 (conceptual shift: re-anchor on "candidates for inflection points come from BOTH $f''=0$ AND $f''$ undefined — parallel exactly to how critical points come from both $f'=0$ and $f'$ undefined").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.higher-order-derivatives` (the second derivative $f''$ this entire concept interprets geometrically).
- **Unlocks**: `math.calc.curve-sketching` (a complete sketch combines monotonicity, extrema, AND concavity/inflection information taught here).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/apply tag places this at a "3 TAs + gate" tier — A01 (sign-of-$f''$ basics), A02 (genuine inflection points vs. the false-positive case), and A03 (concavity's independence from monotonicity) each target a distinct LO, appropriate for a concept with one core technique plus two genuinely separate common-error zones.
- This blueprint deliberately parallels `math.calc.local-extrema`'s "candidate vs. confirmed" structure (critical point vs. confirmed extremum there; $f''=0$ point vs. confirmed inflection point here) — the same underlying "necessary but not sufficient" logical pattern recurs, and Teaching Notes name this explicitly so a student who has completed local-extrema recognizes the structural echo rather than treating this as an unrelated new rule.
- Example 3's paired functions were chosen specifically because they isolate concavity from direction using the simplest possible pieces ($\pm x^2$ split by sign of $x$), keeping the algebra trivial so the conceptual point (independence of the two properties) is the sole cognitive load.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: cup/cap shape before the sign test) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Cumulative Distribution Function (`math.prob.cdf`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.cdf` |
| name | Cumulative Distribution Function |
| domain | Probability |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.prob.random-variable` |
| unlocks | `math.prob.quantile` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a step-graph (discrete) and smooth S-curve (continuous) shown before the symbolic definition |
| description (KG) | F(x) = P(X≤x). Right-continuous, non-decreasing, F(−∞)=0, F(∞)=1. Unified description for discrete and continuous RVs. Connects PMF/PDF via differentiation and summation. |

## Component 1 — Learning Objectives

- LO1: Define the CDF $F(x) = P(X\le x)$ and state its three defining properties: **non-decreasing** ($x_1<x_2 \Rightarrow F(x_1)\le F(x_2)$), **right-continuous**, and the boundary limits $F(-\infty)=0$, $F(\infty)=1$.
- LO2: Compute $F(x)$ for a discrete random variable by **summing** the PMF up to $x$, and for a continuous random variable by **integrating** the PDF up to $x$ — recognizing the CDF as the single unified object connecting both cases.
- LO3: Use the CDF to compute probabilities of intervals, in particular $P(a<X\le b) = F(b)-F(a)$, and correctly handle the strict-vs-non-strict inequality subtlety at endpoints (directly refuting the misconception that $P(X<b)$ and $P(X\le b)$ are always equal).

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.random-variable` (a random variable $X$ as a measurable function $\Omega\to\mathbb{R}$, and the discrete-vs-continuous distinction) — the CDF is the accumulation-based description of that same random variable's distribution.

## Component 3 — Core Explanation

**Definition**: for a random variable $X$, the cumulative distribution function is $F(x) = P(X\le x)$ — the probability that $X$ takes a value **at most** $x$, for every real number $x$.

**Three defining properties**: (1) $F$ is **non-decreasing** — as $x$ grows, the event $\{X\le x\}$ only grows (or stays the same), so its probability cannot decrease; (2) $F$ is **right-continuous** — approaching $x$ from above gives exactly $F(x)$ (a technical consequence of how the underlying probability measure behaves on shrinking events); (3) $F(-\infty)=0$ (the probability $X$ is less than everything is $0$) and $F(\infty)=1$ (the probability $X$ is less than or equal to some arbitrarily large value is certain).

**Discrete vs. continuous, unified**: for a **discrete** random variable with PMF $p(k)=P(X=k)$, the CDF is a **sum**: $F(x) = \sum_{k\le x} p(k)$ — a step function that jumps by $p(k)$ at each value $k$ in the support and is flat between jumps. For a **continuous** random variable with PDF $f(t)$, the CDF is an **integral**: $F(x) = \int_{-\infty}^{x} f(t)\,dt$ — a smooth, continuous curve. The CDF is the one description that applies to **both** cases without modification, which is exactly why it is called "unified": PMF/PDF are recovered from it by differencing (discrete) or differentiating (continuous), $F'(x)=f(x)$ wherever $F$ is differentiable.

**Computing interval probabilities**: since $F(b)=P(X\le b)$ and $F(a)=P(X\le a)$, and $\{X\le a\}\subset\{X\le b\}$ for $a<b$, subtracting gives $P(a<X\le b) = F(b)-F(a)$. Care is needed with the endpoint convention: $F(b)=P(X\le b)$ includes $b$ itself, so $P(X<b)$ (strict) is **not** automatically equal to $F(b)$ — for a **continuous** random variable, $P(X=b)=0$ so $P(X<b)=P(X\le b)=F(b)$ coincide; but for a **discrete** random variable, $P(X=b)$ can be a nonzero jump, so $P(X<b) = F(b)-P(X=b) \ne F(b)$ in general.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — a discrete CDF as a step function)**: Let $X$ be the result of a fair coin flip encoded as $X=0$ (tails, probability $1/2$) or $X=1$ (heads, probability $1/2$). Then $F(x) = 0$ for $x<0$; $F(x) = 1/2$ for $0\le x<1$ (only the $X=0$ outcome contributes); $F(x) = 1$ for $x\ge1$ (both outcomes now included). This confirms non-decreasing (steps up, never down), right-continuity (at $x=0$, $F(0)=1/2$ matches the value just to the right, not the limit from the left which is $0$), and the boundary limits ($0$ and $1$).

**Example 2 (LO2 — a continuous CDF via integration)**: Let $X$ be uniformly distributed on $[0,2]$, with PDF $f(t) = 1/2$ for $0\le t\le2$ (and $0$ elsewhere). Then for $0\le x\le2$: $F(x) = \int_0^x \frac{1}{2}\,dt = \frac{x}{2}$ — a smooth linear ramp from $F(0)=0$ to $F(2)=1$. Computing $P(0.5 < X \le 1.5) = F(1.5)-F(0.5) = 0.75-0.25=0.5$, matching the direct geometric area under the PDF over that interval.

**Example 3 (LO3 — the strict-vs-non-strict endpoint subtlety, breaking MC-1)**: Return to Example 1's coin-flip $X$. Compute $P(X<1)$ (strict) versus $P(X\le1)=F(1)$ (non-strict). $F(1)=1$ (both outcomes included). But $P(X<1)$ excludes $X=1$ (heads), leaving only $X=0$ — so $P(X<1)=1/2\ne F(1)=1$. Contrast with Example 2's continuous $X$: $P(X<1.5)$ and $P(X\le1.5)=F(1.5)=0.75$ **are** equal, since $P(X=1.5)=0$ for a continuous random variable (a single point carries zero probability under integration). This proves the strict/non-strict distinction matters **specifically** when $X$ is discrete (or has an atom) at the point in question, not in general.

## Component 5 — Teaching Actions

### Teaching Action A01 — The CDF as an Accumulated Probability (Primitive P11: Representation Shift)

Draw a step-graph (discrete case) and a smooth S-curve (continuous case) side by side, both starting near $0$ on the left and rising toward $1$ on the right. State: "$F(x)$ answers one question: what's the chance $X$ came out at most $x$? As $x$ sweeps left to right, this accumulated probability can only grow." Shift to the symbolic definition and its three properties via Example 1.

### Teaching Action A02 — Discrete Sum vs. Continuous Integral, Unified by One Formula (Primitive P06: Contrast Pair)

**Contrast** Example 1 (discrete, CDF built by summing PMF values, a step function) against Example 2 (continuous, CDF built by integrating the PDF, a smooth curve). State: "same definition, $F(x)=P(X\le x)$, in both cases — only the machinery used to compute it (sum vs. integral) differs, because that's the same discrete/continuous distinction from `math.prob.random-variable` reappearing here."

- **MC-2 hook (mixed with A02)**: ask "for the coin flip, is the CDF a smooth curve or a step function, and why?" to confirm the step-vs-smooth distinction is correctly tied to discrete vs. continuous, not treated as arbitrary.

### Teaching Action A03 — Interval Probabilities and the Endpoint Subtlety (Primitive P28: Conflict Evidence)

Derive $P(a<X\le b)=F(b)-F(a)$ using Example 2's uniform distribution. Then present Example 3's direct conflict: $P(X<1)=1/2$ but $F(1)=P(X\le1)=1$ for the same discrete $X$ — a case where the strict and non-strict versions genuinely disagree. State: "$F(b)$ always includes the point $b$ itself. Whether that matters depends on whether $X$ can actually land exactly on $b$ with positive probability — which happens for discrete random variables, essentially never for continuous ones."

- **MC-1 hook**: ask "is $P(X<b)$ always equal to $P(X\le b)=F(b)$?" — a blanket "yes" reveals MC-1 (assuming strict and non-strict inequalities always give the same probability, missing the discrete-atom case).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A fair six-sided die roll $X$ has PMF $p(k)=1/6$ for $k=1,\dots,6$. Write $F(3)$ and $F(3.5)$, and explain why they're equal.
  2. $X$ is continuous with PDF $f(t)=2t$ for $0\le t\le1$ (and $0$ elsewhere). Find $F(x)$ for $0\le x\le1$, and use it to compute $P(0.25<X\le0.75)$.
  3. For the die roll in problem 1, compute $P(X<4)$ and $F(4)=P(X\le4)$ separately, and explain why they differ.
  4. Explain, in your own words, why a CDF must always be non-decreasing, using the definition $F(x)=P(X\le x)$ directly (not just citing the property).
- **P76 (Transfer Probe, mode = independence)**: "A ride-sharing app models the wait time $X$ (in minutes) for a driver to arrive as a continuous random variable with CDF $F(x) = 1-e^{-x/5}$ for $x\ge0$ (and $F(x)=0$ for $x<0$). (a) Verify $F(0)=0$ and explain what $\lim_{x\to\infty}F(x)$ should equal, then confirm it from the formula. (b) Compute the probability a rider waits between 3 and 8 minutes, using $F$ directly. (c) A rider asks 'what's the chance I wait less than exactly 5 minutes, versus at most 5 minutes?' — explain why, for this continuous wait-time model, these two probabilities are equal, unlike the discrete die-roll case from the practice set."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | STRICT-AND-NONSTRICT-INEQUALITY-CONFLATED | Assuming $P(X<b)$ always equals $P(X\le b)=F(b)$, missing that they differ whenever $X$ has positive probability of equaling $b$ exactly (the discrete/atom case) | Foundational |
| MC-2 | CDF-COMPUTATION-METHOD-MISMATCHED-TO-RV-TYPE | Attempting to integrate a PMF or sum a PDF, instead of correctly matching summation to discrete random variables and integration to continuous ones | Foundational |
| MC-3 | CDF-ASSUMED-NON-DECREASING-VIOLATION-POSSIBLE | Believing a computed "CDF" that decreases somewhere could still be valid, not recognizing non-decreasing is a hard requirement following directly from the definition | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Strict-vs-Non-Strict Inequality Conflation") → P41 (detect: ask for $P(X<1)$ and $P(X\le1)$ for the coin-flip $X$ and see if the student gives the same value for both) → P64 (conceptual shift: re-walk Example 3's direct computation showing $1/2\ne1$, then re-anchor on "check whether $X$ can land exactly on the boundary with positive probability — if yes, strict and non-strict differ").
- **B02 (targets MC-2)**: P27 (name it: "Sum/Integral Method Mismatch") → P41 (detect: give a continuous PDF and ask the student to compute the CDF, observing whether they attempt a sum instead of an integral, or vice versa for a discrete PMF) → P64 (conceptual shift: re-anchor on the discrete-vs-continuous distinction from `math.prob.random-variable`, re-deriving Example 1 (sum) and Example 2 (integral) side by side as the two matching procedures).
- **B03 (targets MC-3)**: P27 (name it: "Non-Monotonic CDF Accepted as Valid") → P41 (detect: present a decreasing "candidate CDF" and ask if it could be valid) → P64 (conceptual shift: re-derive directly from $F(x)=P(X\le x)$ that $\{X\le x_1\}\subseteq\{X\le x_2\}$ whenever $x_1<x_2$, so probability (a non-negative measure) cannot decrease — a decreasing function is definitionally impossible as a CDF).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.random-variable` (the discrete/continuous distinction and the measurable-function definition of $X$ this concept accumulates probability over).
- **Unlocks**: `math.prob.quantile` (quantiles are defined as the inverse of the CDF, directly building on the accumulation function taught here).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/apply tag places this at a "3 TAs + gate" tier appropriate for a moderately compact concept with one genuinely subtle trap (the strict/non-strict endpoint distinction) alongside its core accumulation-definition content.
- The strict-vs-non-strict distinction (MC-1) was given Foundational severity, not Moderate, because it is a recurring source of off-by-one-style errors throughout probability (event boundary handling reappears in confidence intervals, hypothesis testing p-value boundaries, and quantile definitions downstream) — getting this wrong here compounds in every later concept that reuses $F$.
- Example 3 deliberately reuses Example 1's exact coin-flip setup (rather than introducing a new scenario) so the only variable changing between the two examples is the question asked (interval endpoint strictness), isolating that single subtlety with zero extra cognitive load from a new setup.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: step-graph/S-curve before symbolic definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

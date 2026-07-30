# Blueprint: math.func.step-function

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.step-function |
| name | Step Functions |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.func.piecewise-function |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a real number x, the student evaluates the floor function ⌊x⌋ (greatest integer ≤ x) and ceiling function ⌈x⌉ (least integer ≥ x), identifies their graphs as staircase patterns with the correct open/closed endpoint convention at each jump, recognises that both are piecewise-constant (step) functions with jump discontinuities at every integer, applies them to model real-world rounding and quantization problems, and distinguishes floor from ceiling by tracking which integer boundary is taken.

## Component 2 — CPA Entry Stage
**C — Concrete** (real-world step rules: parking fees rounded up to the next hour, temperature readings truncated to the nearest degree, postal rates for weight brackets — before floor/ceiling notation is introduced)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | FLOOR-CEILING-SWAP | Student applies the ceiling function when the floor is needed and vice versa; interprets ⌊2.3⌋=3 (ceiling) or ⌈2.7⌉=2 (floor) — swapping the direction of rounding | Type 3 — language contamination ("floor" suggests "low/down" correctly, but "ceiling" as "high/up" doesn't map intuitively onto the mathematical definition for all learners; negative numbers exacerbate the confusion because ⌊−2.3⌋=−3 "goes down further" while ⌈−2.3⌉=−2 "goes up toward zero") |
| MC-2 | STEP-FUNCTION-IS-CONTINUOUS | Student treats the floor/ceiling function as continuous ("it just counts up by steps") and does not recognize the jump discontinuities at integers | Type 1 — overgeneralization (the staircase graph looks like a connected sequence of lines; students perceive the graph as "going up" continuously rather than jumping at each integer boundary) |
| MC-3 | CLOSED-DOT-ON-WRONG-SIDE | Student places the filled dot on the wrong side of each step on the graph; for ⌊x⌋, fills in the right endpoint of each interval (the integer value not achieved) rather than the left | Type 5 — instruction-induced (open/closed endpoint notation is confusing in the context of step functions; the closed dot should be on the LEFT for floor and on the RIGHT for ceiling, which feels counterintuitive) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of step functions:**

| Representation | Floor ⌊x⌋ | Ceiling ⌈x⌉ |
|---|---|---|
| Verbal definition | Greatest integer less than or equal to x | Least integer greater than or equal to x |
| Algebraic | ⌊x⌋=n iff n≤x<n+1 (n an integer) | ⌈x⌉=n iff n−1<x≤n (n an integer) |
| Graph | Staircase: closed dot at LEFT of each step, open dot at RIGHT | Staircase: closed dot at RIGHT of each step, open dot at LEFT |
| Table | ⌊2.7⌋=2, ⌊3⌋=3, ⌊−1.2⌋=−2 | ⌈2.3⌉=3, ⌈3⌉=3, ⌈−1.8⌉=−1 |

**Evaluation examples:**

| x | ⌊x⌋ | ⌈x⌉ | ⌊x⌋=⌈x⌉? |
|---|---|---|---|
| 3.7 | 3 | 4 | No |
| −1.5 | −2 | −1 | No |
| 4 | 4 | 4 | Yes (x is integer) |
| −3 | −3 | −3 | Yes (x is integer) |
| 0.99 | 0 | 1 | No |

**Key property:** ⌊x⌋=⌈x⌉ if and only if x is an integer.

**Negative-number check:** ⌊−2.3⌋=−3 (not −2). The floor goes to the next integer LOWER than −2.3, which is −3. Students often write −2 by "chopping off" the decimal — that is truncation, not the floor for negative numbers. Truncation = floor for positive x, but ≠ floor for negative x.

**Piecewise representation of ⌊x⌋:**
⌊x⌋ = ⎧ … ⎨ −2 if −2≤x<−1 ⎨ −1 if −1≤x<0 ⎨ 0 if 0≤x<1 ⎨ 1 if 1≤x<2 ⎨ 2 if 2≤x<3 ⎩ …

This is a piecewise-constant function: constant on every interval [n, n+1) for integer n.

**P49 checkpoint:**
- CORRECT → "⌊x⌋: round DOWN to the nearest integer (even for negative x — more negative). ⌈x⌉: round UP. Both equal x iff x is an integer. Jump discontinuity at every integer." → A02
- PARTIAL (correct for positive x, wrong for negative: writes ⌊−1.5⌋=−1) → "For negative x: 'floor' means LOWER, which is MORE negative. −1.5 is between −2 and −1; the floor goes to −2, the lower (more negative) integer." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "A taxi charges $4 per mile, rounded UP to the nearest mile. For a 2.3-mile trip, what is the charge? Which function (floor or ceiling) models this?" → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-3 gate
**Graph and endpoint convention — gate:**

**Gate question (MC-3):** "On the graph of y=⌊x⌋, at x=2, is the filled dot on the LEFT (at the value 2) or the RIGHT (at the value 3)?"

y=⌊x⌋ on [1,2): y=1. y=⌊x⌋ on [2,3): y=2. The interval [2,3) is closed at x=2 (included) with value y=2, and open at x=3 (excluded). So the filled dot is at (2, 2) on the LEFT end of the step y=2. The open dot is at (3, 2) on the RIGHT end of that same step. The next step, y=3, has its filled dot at (3, 3).

**Graph conventions:**
- ⌊x⌋: Each step on [n, n+1) is closed LEFT at (n, n) and open RIGHT at (n+1, n). The graph "sticks" to the left boundary.
- ⌈x⌉: Each step on (n−1, n] is open LEFT at (n−1, n) and closed RIGHT at (n, n). The graph "sticks" to the right boundary.

**Discontinuity check:** At x=2 for ⌊x⌋:
- lim x→2⁻ ⌊x⌋ = 1.
- lim x→2⁺ ⌊x⌋ = 2.
- ⌊2⌋ = 2.
Left limit ≠ right limit → **jump discontinuity** at x=2. This occurs at EVERY integer. The step function is continuous on each open interval (n, n+1) but discontinuous at all integers.

**P49 checkpoint:**
- CORRECT → "⌊x⌋: filled dot LEFT (at the integer), open dot RIGHT. ⌈x⌉: filled dot RIGHT, open dot LEFT. Jump discontinuity at every integer: the left and right limits differ by 1." → A03
- PARTIAL (correct endpoints but still says function is continuous "in the middle") → "The function IS continuous on each interval (n, n+1). But at x=n, the left limit is n−1 and the right limit is n — they differ. That jump at every integer makes it discontinuous overall." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Evaluate ⌊x⌋ at x=1.99 and x=2.01. Are the values the same or different? What does that tell you about continuity at x=2?" → TB-R02 → A03

### A03 — P04 PATTERN INDUCTION
**Step functions in context — gallery:**

| Real-world scenario | Mathematical model | Notes |
|---|---|---|
| Parking fee: $3 per hour or fraction thereof | 3⌈t⌉ dollars for t hours | Ceiling: rounds UP to next hour |
| Postal weight rate: charge for next full gram | rate·⌈w⌉ for weight w grams | Ceiling on continuous weight |
| Digital temperature display: truncates to whole degrees | ⌊T⌋ for temperature T | Floor = truncation for positive T |
| Elevator floor display | ⌊height / floor_height⌋ | Floor tells you which level you're on |
| Tax bracket at low end: rate changes at whole $1000 increments | bracket = ⌊income/1000⌋ | Step changes at integer thousands |
| Apartment count in a building with n floors | ⌈n/k⌉ apartments per staircase | Ceiling ensures last partial floor is counted |

**Generalized step functions:** f(x)=⌊x/c⌋ for step width c>0. Steps of constant value c units wide. Graph: same staircase shape but with each step spanning c units instead of 1.

Example: f(x)=⌊x/2⌋. Steps on [0,2), [2,4), [4,6), … with values 0, 1, 2, …

**Fractional part function:** {x}=x−⌊x⌋. For x=2.7: {2.7}=2.7−2=0.7. Range: [0,1). Graph: sawtooth pattern, periodic with period 1. Note: {x}=0 iff x is an integer.

**P49 checkpoint:**
- CORRECT → "Step functions (floor/ceiling) are piecewise-constant, jump at integers (or multiples of step width). Real applications: rounding up for billing (ceiling), rounding down for display (floor). Fractional part = x−⌊x⌋." → Gate (P91)
- PARTIAL (applies ceiling to a floor context: fee that ROUNDS DOWN instead of up) → "Parking that 'rounds up to the next hour' means you pay for the FULL hour even for a partial use. That's ceiling — it always goes to the HIGHER integer." → TB-R01 → Gate
- INCORRECT → TB-R01 → Gate
- NO_RESPONSE → "A printer charges for paper by the sheet: any partial sheet counts as a full sheet. For 4.2 sheets used, how many sheets are billed? Floor or ceiling?" → TB-R01 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 FLOOR-CEILING-SWAP):**
Step 1 — "Floor: the integer BELOW (or equal to) x — think of lowering x to land on the integer floor below you. Ceiling: the integer ABOVE (or equal to) x — think of raising x to hit the ceiling above you." Step 2 — Concrete memory aid: ⌊2.7⌋=2 (go DOWN to 2); ⌈2.3⌉=3 (go UP to 3). For negative: ⌊−2.3⌋=−3 (go DOWN to −3 — more negative is lower); ⌈−2.7⌉=−2 (go UP to −2 — less negative is higher). Step 3 — "At the exact integer: ⌊n⌋=⌈n⌉=n. Otherwise: ⌊x⌋=⌈x⌉−1. Quick check: does your answer differ from x by at most 1 and in the right direction?"

**TB-R02 (MC-2 STEP-FUNCTION-IS-CONTINUOUS):**
Step 1 — "Continuous means: no jumps, no holes. For the floor function, compute the left and right limits at x=2. Left limit: as x→2 from below (e.g., x=1.99), ⌊x⌋=1. Right limit: as x→2 from above (e.g., x=2.01), ⌊x⌋=2. Left limit (1) ≠ right limit (2). That IS a jump. The function is NOT continuous at x=2." Step 2 — "The staircase graph literally jumps — it is NOT a connected curve. Each step is a horizontal segment; the step itself is continuous, but the jump between steps is a discontinuity." Step 3 — "Step functions are piecewise-CONSTANT: each piece is a flat horizontal line. Flat lines are individually continuous. But the jumps between them make the overall function discontinuous at every step boundary (every integer)."

**TB-R03 (MC-3 CLOSED-DOT-ON-WRONG-SIDE):**
Step 1 — "For ⌊x⌋: which values of x give ⌊x⌋=2? Answer: x∈[2,3) — the CLOSED bracket is on the LEFT (x=2 included) and the OPEN bracket is on the RIGHT (x=3 excluded). So the FILLED dot is at (2, 2) and the OPEN dot is at (3, 2)." Step 2 — "For ⌈x⌉: which values give ⌈x⌉=3? Answer: x∈(2,3] — OPEN on the LEFT, CLOSED on the RIGHT. Filled dot at (3, 3), open dot at (2, 3)." Step 3 — "Memory: floor = filled on LEFT (interval starts closed); ceiling = filled on RIGHT (interval ends closed). Draw the interval bracket notation [n, n+1) to remind yourself which side is closed."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Evaluate: (a) ⌊4.9⌋; (b) ⌈4.1⌉; (c) ⌊−3.5⌋; (d) ⌈−2.1⌉; (e) ⌊7⌋; (f) ⌈−4⌉.
2. Sketch y=⌊x⌋ for −2≤x≤3. Mark all filled and open endpoints correctly. List all x-values where the function has a jump discontinuity on this interval.
3. A phone plan charges $0.05 per second, always rounded up to the nearest second. Write a formula for the charge C(t) for a call of duration t seconds (t>0). Evaluate C(3.2) and C(5).
4. Prove or disprove: ⌊x+n⌋=⌊x⌋+n for any real x and any integer n.

**P55 — Reflect & Consolidate:** "Floor ⌊x⌋: round down (even for negatives). Ceiling ⌈x⌉: round up. Both equal x at integers. ⌊x⌋=⌈x⌉−1 for non-integer x. Jump discontinuities at all integers. Floor: closed LEFT, open RIGHT. Ceiling: open LEFT, closed RIGHT."

**P76 — Transfer Probe (Independence mode):**
The fractional part function {x}=x−⌊x⌋. (a) Sketch {x} for −1≤x≤3. (b) Show that {x} is periodic with period 1. (c) Compute ⌊{x}⌋ for all x. What is it always? (d) Any real number x can be written as x=⌊x⌋+{x} (integer part + fractional part). Use this to prove that ⌊x+y⌋=⌊x⌋+⌊y⌋ or ⌊x⌋+⌊y⌋+1, depending on whether {x}+{y}<1 or ≥1.

**P55 — Reflect & Consolidate:** "The fractional part {x}=x−⌊x⌋ is the sawtooth function: periodic period 1, range [0,1), zero at all integers. Integer+fractional-part decomposition leads to the floor addition lemma, which appears in number theory (floor sum estimates) and algorithm analysis (integer arithmetic)."

**P75 — Mastery Assessment:**
"f(x)=⌊2x+1⌋. (a) Evaluate f(0), f(0.4), f(0.5), f(1). (b) For which values of x does f(x)=3? Write the answer as an interval. (c) Where are the jump discontinuities of f? (d) Sketch f for 0≤x≤2, marking all open and closed endpoints. (e) How does the step width of f compare to ⌊x⌋? Why?"

**P55 — Reflect & Consolidate:** "Stretching the argument: ⌊bx⌋ has step width 1/|b| instead of 1. f(x)=⌊2x⌋ has steps of width 1/2; f(x)=⌊x/3⌋ has steps of width 3. Jump discontinuities occur where the argument hits an integer: 2x+1=n → x=(n−1)/2. The structure of step functions follows directly from the floor/ceiling definitions and the piecewise-constant nature."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.step-function complete
- Score 3/5 → REVIEW floor vs. ceiling for negative arguments and correct endpoint placement; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.piecewise-function; reassign

**P78 — Completion:** Step functions certified. Student evaluates floor and ceiling correctly including negative arguments, graphs with correct open/closed endpoint convention, identifies jump discontinuities at integers, applies to real-world rounding contexts, and recognises the fractional part function as the canonical sawtooth periodic companion.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Fractional part function as sawtooth; periodicity proof; floor addition lemma via integer+fractional decomposition
Skill tested: Decompose x into integer and fractional parts; apply decomposition to prove an identity; connect to number theory floor sums

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

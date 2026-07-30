# Blueprint: math.func.vertical-asymptote

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.vertical-asymptote |
| name | Vertical Asymptotes |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | analyze |
| Estimated hours | 3 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.func.rational-function |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a rational function f(x)=P(x)/Q(x), the student locates vertical asymptotes by identifying where Q(x)=0 and P(x)≠0, distinguishes vertical asymptotes from removable discontinuities (holes, where both P and Q share a common zero), describes one-sided behavior (f→+∞ or −∞ from each side) using sign analysis, sketches the graph near the asymptote with correct direction arrows, and correctly interprets the vertical asymptote as a line the graph approaches but does not cross.

## Component 2 — CPA Entry Stage
**C — Concrete** (numerical table approaching the asymptote from both sides showing values growing without bound; explicit before graphical analysis)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | NUMERATOR-ZERO-IS-ASYMPTOTE | Student identifies zeros of the numerator P(x)=0 as locations of vertical asymptotes, rather than zeros of the denominator Q(x)=0 | Type 3 — language contamination ("asymptote" is associated with "something going wrong" = "zero"; the zero that makes the function blow up is the denominator's, not the numerator's, but students anchor on the word "zero") |
| MC-2 | GRAPH-CROSSES-ASYMPTOTE | Student draws the graph touching or crossing the vertical asymptote line, treating it as just another value on the graph rather than as a line the function cannot reach | Type 5 — instruction-induced (horizontal asymptotes CAN be crossed, which students learn later; this bleeds back onto vertical asymptotes as "maybe it can cross too") |
| MC-3 | HOLE-IS-AN-ASYMPTOTE | Student identifies a removable discontinuity (hole) — where both numerator and denominator vanish at the same x — as a vertical asymptote, because both seem to involve "division by zero" | Type 5 — instruction-induced (the first encounter with "denominator = 0" in a rational function is often taught as "always gives a vertical asymptote" before the full cancellation check is introduced) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of a vertical asymptote:**

| Representation | Example: f(x)=1/(x−2) |
|---|---|
| Algebraic | x=2 is a vertical asymptote because denominator=0 at x=2 and numerator=1≠0 |
| Limit notation | lim x→2⁺ f(x)=+∞; lim x→2⁻ f(x)=−∞ |
| Graph | Dashed vertical line x=2; graph rises to +∞ on right side, falls to −∞ on left side |
| Numerical table | x=2.01: f≈100; x=2.001: f≈1000; x=1.99: f≈−100; x=1.999: f≈−1000 |

**Identification procedure:**
Step 1: Factor P(x) and Q(x) fully.
Step 2: Cancel any common factors. (Canceled factors become holes, not asymptotes.)
Step 3: After cancellation, set the remaining denominator = 0 and solve for x.
Step 4: Each remaining denominator zero is a vertical asymptote.

**Worked example:** f(x)=(x−1)/((x−2)(x+3)).
- No common factors in numerator and denominator.
- Denominator zeros: x=2 and x=−3.
- Vertical asymptotes: x=2 and x=−3.
- Numerator zeros: x=1. This is a zero of f, not an asymptote.

**One-sided behavior by sign analysis:**
Near x=2: numerator at x≈2 is 2−1=1>0 (positive).
- As x→2⁺: (x−2)→0⁺ and (x+3)→5>0. Denominator→0⁺. f→+∞.
- As x→2⁻: (x−2)→0⁻ and (x+3)→5>0. Denominator→0⁻. f→−∞.

**P49 checkpoint:**
- CORRECT → "Vertical asymptotes: zeros of denominator after canceling common factors with numerator. Numerator zeros are zeros of f, not asymptotes. Approach from each side: sign analysis gives +∞ or −∞." → A02
- PARTIAL (identifies correct x-values but confuses which direction the graph goes) → "Determine the sign of the numerator and each denominator factor near x=2. Their product's sign tells you +∞ or −∞ as you approach." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "For f(x)=1/(x−2): what value of x makes the denominator zero? What happens to f when x is very close to 2?" → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-3 gate
**Vertical asymptote vs. hole — gate:**

**Gate question (MC-3):** "For f(x)=(x²−4)/(x−2), is x=2 a vertical asymptote or a hole?"

Factor: x²−4=(x−2)(x+2). So f(x)=(x−2)(x+2)/(x−2)=x+2 for x≠2.
At x=2: both numerator and denominator vanish. The (x−2) factors cancel.
Simplified: f(x)=x+2 (x≠2). As x→2, f(x)→4. The function APPROACHES a finite value.
Therefore: **x=2 is a hole (removable discontinuity) at the point (2, 4), NOT a vertical asymptote.**

**The test:**
- If (x−a) is a factor of Q but NOT of P after full factoring: **vertical asymptote** at x=a.
- If (x−a) is a factor of BOTH P and Q: **hole** at x=a. (Graph a point after cancellation.)

**Comparison table:**

| Situation | Name | Graph behavior | Limit as x→a |
|---|---|---|---|
| Q(a)=0, P(a)≠0 | Vertical asymptote | Function grows without bound (±∞) | Infinite (doesn't exist finitely) |
| Q(a)=0, P(a)=0, cancel | Hole | Graph has a single missing point | Finite (equals value after cancellation) |
| Q(a)=0, P(a)=0, no cancel | Neither simple case | More analysis needed (e.g., double zeros) | Depends on multiplicities |

**P49 checkpoint:**
- CORRECT → "Always factor fully and cancel before declaring a vertical asymptote. A common zero in both P and Q is a hole, not an asymptote. Vertical asymptote ↔ infinite limit; hole ↔ finite limit." → A03
- PARTIAL (knows cancellation rule, still says x=2 is an asymptote because "the denominator is zero") → "After canceling (x−2)/(x−2), the function is simply x+2 near x=2. What does x+2 approach as x→2? Is that infinite or finite?" → TB-R03 → A03
- INCORRECT → TB-R03 → A03
- NO_RESPONSE → "Evaluate (x²−4)/(x−2) at x=2.1, 2.01, 2.001. Does the function blow up or approach a specific value?" → TB-R03 → A03

### A03 — P06 CONTRAST PAIR
**Multiplicity of zeros and asymptote behavior:**

**Odd-multiplicity denominator zero:** f(x)=1/(x−1). As x→1⁺: f→+∞. As x→1⁻: f→−∞. Graph passes from one side to the other — opposite signs on the two sides. Like a 1/x shape.

**Even-multiplicity denominator zero:** g(x)=1/(x−1)². As x→1⁺: (x−1)²→0⁺, so g→+∞. As x→1⁻: (x−1)²→0⁺, so g→+∞. **Same sign on both sides** — both tails go up. Like a 1/x² shape.

**Rule:** Odd multiplicity of denominator zero → f changes sign at asymptote (one side +∞, other −∞). Even multiplicity → f has the same sign on both sides (both +∞ or both −∞, determined by sign of numerator).

**Contrast — asymptote vs. zero of function:**
f(x)=(x−3)/((x−1)(x+2)).
- Zeros of f: x=3 (numerator=0, denominator≠0). Graph CROSSES x-axis at (3,0).
- Vertical asymptotes: x=1 and x=−2 (denominator=0, not canceled).
- x=3: f is defined, equals 0. x=1, x=−2: f is undefined, blows up.

**P49 checkpoint:**
- CORRECT → "Odd-multiplicity asymptote: graph changes sign (approaches ±∞ from opposite sides). Even-multiplicity: graph has same sign (both ±∞). Vertical asymptotes come from uncanceled denominator zeros; zeros of f come from numerator zeros." → Gate (P91)
- PARTIAL (correct identification, cannot determine one-sided behavior for even-multiplicity) → "For g(x)=1/(x−1)²: compute g(1.1)=1/0.01=100>0 and g(0.9)=1/0.01=100>0. Same sign on both sides because the square is always positive." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "For f(x)=3/((x+2)²): evaluate f(−1.9) and f(−2.1). Are both positive or do they have opposite signs?" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 NUMERATOR-ZERO-IS-ASYMPTOTE):**
Step 1 — "A vertical asymptote occurs where the DENOMINATOR is zero and the numerator is NOT zero. The numerator's zeros are where the function equals zero (x-intercepts). These are two completely different features of the graph." Step 2 — f(x)=(x−3)/(x−1). At x=3: numerator=0, denominator=−2≠0. f(3)=0. This is an x-intercept. At x=1: numerator=2≠0, denominator=0. This is a vertical asymptote. Step 3 — "Memory rule: zeros of f = zeros of NUMERATOR (where the output is zero). Vertical asymptotes = zeros of DENOMINATOR (where the output blows up). Numerator and denominator play opposite roles."

**TB-R02 (MC-2 GRAPH-CROSSES-ASYMPTOTE):**
Step 1 — "A vertical asymptote at x=a means f is UNDEFINED at x=a (denominator=0). The graph cannot have a point on the vertical line x=a — there is no y-value there. The function only approaches the line from the sides; it never touches it." Step 2 — Distinct from horizontal asymptotes: a function can cross its horizontal asymptote (finitely many times, then the tails approach it). Vertical asymptotes are never crossed because the function is undefined there. Step 3 — "When sketching: draw the vertical asymptote as a dashed line, then draw the graph branches on each side. Never draw a curve that appears to pass through the dashed line."

**TB-R03 (MC-3 HOLE-IS-AN-ASYMPTOTE):**
Step 1 — "Both holes and vertical asymptotes involve x-values where the denominator is zero. The difference: if the numerator is ALSO zero at that x, the zero in the numerator cancels the zero in the denominator. After cancellation, the function approaches a finite value — that's a hole, not an asymptote." Step 2 — Analogy: (x−2)(x−3)/(x−2) = x−3 for x≠2. The (x−2) factor removed itself. As x→2: x−3→−1, a finite value. No blowup. Step 3 — "Always factor and cancel FIRST. Then declare asymptotes from what's left in the denominator. What's been canceled becomes a hole — mark it with an open circle on the graph at the finite limit value."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Find all vertical asymptotes and holes of: (a) f(x)=(x+1)/(x²−1); (b) g(x)=(x²−x−6)/(x²−4); (c) h(x)=x/(x³−x).
2. For f(x)=2/((x−3)(x+1)²), determine the one-sided behavior at each vertical asymptote (whether f→+∞ or −∞ from each side) without graphing.
3. A rational function has vertical asymptotes at x=−2 and x=4, a hole at x=1, and crosses the x-axis at x=0. Write a possible formula for f(x). (Hint: numerator has factors for zero and hole; denominator has factors for asymptotes and hole.)
4. True or false, with justification: "If f(a) is undefined, then x=a is a vertical asymptote of f." Provide a counterexample if false.

**P55 — Reflect & Consolidate:** "Vertical asymptotes: uncanceled denominator zeros. Holes: canceled common zeros. Sign analysis gives one-sided direction (±∞). Odd-multiplicity → opposite sides. Even-multiplicity → same side. The graph approaches but never touches a vertical asymptote."

**P76 — Transfer Probe (Independence mode):**
A rational function f(x)=P(x)/Q(x) with deg(Q)=3 has: vertical asymptotes at x=−1 and x=2, a hole at x=3, and lim x→+∞ f(x)=0. (a) Determine Q(x) up to a constant. (b) Determine P(x) up to a constant, given that f has exactly one x-intercept at x=5. (c) Verify: does deg(P)<deg(Q) (consistent with lim→0 at ±∞)? (d) Sketch the graph, marking all key features.

**P55 — Reflect & Consolidate:** "Building a rational function from features: asymptotes → denominator factors; holes → canceled factors in both; intercepts → numerator factors. Degree comparison → end behavior (horizontal asymptote or not). All features are encoded in the polynomial structure."

**P75 — Mastery Assessment:**
"f(x)=(x²−5x+6)/((x²−4)(x−3)). (a) Factor numerator and denominator fully. (b) Identify all holes and vertical asymptotes. (c) Determine the simplified form of f after cancellation. (d) Find all zeros and the y-intercept of the simplified f. (e) Describe the one-sided behavior at each vertical asymptote."

**P55 — Reflect & Consolidate:** "Complete rational function analysis: (1) factor fully; (2) cancel common zeros → holes; (3) remaining denominator zeros → vertical asymptotes; (4) numerator zeros of simplified form → x-intercepts; (5) sign analysis → one-sided ±∞ at each asymptote. This is the full graphing algorithm."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.vertical-asymptote complete
- Score 3/5 → REVIEW hole vs. asymptote distinction and one-sided sign analysis; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.rational-function; reassign

**P78 — Completion:** Vertical asymptotes certified. Student locates vertical asymptotes by factoring and canceling, distinguishes them from holes, determines one-sided behavior via sign analysis, and correctly sketches asymptotic behavior on graphs.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Reconstructing a rational function from its asymptotic and zero features; connecting all four graph features (asymptotes, holes, intercepts, end behavior) to polynomial structure
Skill tested: Build P(x) and Q(x) from description; verify degree comparison; produce a consistent complete sketch

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

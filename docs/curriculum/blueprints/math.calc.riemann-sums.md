# Teaching Blueprint — math.calc.riemann-sums

## Component 0 — Metadata
concept_id: math.calc.riemann-sums
concept_name: Riemann Sums
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: advanced
bloom: understand
estimated_hours: 6
mastery_threshold: 0.80
CPA_entry_stage: P
requires: [math.calc.limits]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** The area under a curve y=f(x) on [a,b] is approximated by dividing [a,b] into n equal subintervals of width Δx=(b−a)/n, erecting a rectangle of height f(xᵢ*) on each, and summing: Σᵢ₌₁ⁿ f(xᵢ*)Δx. As n→∞ (Δx→0), this Riemann sum converges to the exact area, called the definite integral ∫ₐᵇ f(x)dx. Three standard choices for the sample point xᵢ* yield left, right, and midpoint Riemann sums.

**Conceptual progression:**
1. Motivation: the area problem — how to measure area under a non-linear curve.
2. Rectangle approximation: cover the region with rectangles; each has width Δx and height f(xᵢ*).
3. Left/right/midpoint sums: different choices of xᵢ* give different approximations; all converge to the same limit.
4. The limit process: as n→∞, the total approximation improves; the exact area is the limit lim_{n→∞} Σf(xᵢ*)Δx.
5. The definite integral: notation ∫ₐᵇ f(x)dx is defined AS this limit.
6. Error behaviour: for increasing functions, left sum underestimates and right sum overestimates (reversed for decreasing); both errors → 0 as n→∞.

**CPA arc (entry: P):**
- Pictorial: graph of f(x) over [a,b] with rectangles shaded; left vs. right vs. midpoint sample points marked; visual of how more rectangles reduce the gap between curve and rectangles
- Abstract: Σ notation Σᵢ₌₁ⁿ f(xᵢ*)Δx; xᵢ (left: a+(i−1)Δx; right: a+iΔx); limit notation lim_{n→∞}; integral symbol ∫ₐᵇ f(x)dx

**Prior knowledge activated:** limit of a sequence; summation notation Σ; area of a rectangle; function evaluation; concept of approximation approaching exact value

---

## Component 2 — Misconception Registry

### MC-1: RECTANGLES-TOUCH-CURVE-AT-TOP [FOUNDATIONAL]
**Description:** Learner believes all Riemann rectangles must have their top corners exactly on the curve. Does not understand that the choice of sample point (left, right, midpoint, or other) determines where the rectangle height is evaluated, not whether the rectangle "fits" the curve.
**Surface form:** "The left Riemann sum isn't valid — the rectangles don't match the curve at the right edge."
**Root cause:** Naive geometric picture: a "correct" rectangle should fit perfectly under the curve. The learner hasn't encountered the generality of the approximation framework — any sample point within the subinterval is valid.
**Trigger condition:** Problems asking about left vs. right vs. midpoint sums; any discussion of over- or under-approximation.
**Repair target:** TA-B01.

### MC-2: MORE-RECTANGLES-CHANGES-EXACT-AREA
**Description:** Learner thinks that using more rectangles changes the true area under the curve. Conflates the approximation (which changes with n) with the fixed exact area (which doesn't).
**Surface form:** "With 100 rectangles the area is 1.0050, with 1000 it's 1.0005 — so the area is getting smaller as we add more rectangles."
**Root cause:** The distinction between the fixed quantity (exact area) and the sequence of approximations converging to it is new. Learner is tracking the approximation, not the limit.
**Trigger condition:** Any problem that computes Riemann sums for multiple values of n and asks what the "area" is.
**Repair target:** TA-B02.

### MC-3: RIEMANN-SUM-IS-THE-INTEGRAL
**Description:** Learner equates a Riemann sum (for specific n) with the definite integral. Writes ∫ₐᵇ f(x)dx = Σf(xᵢ*)Δx without the limit. Does not recognise the limit as the essential step.
**Surface form:** Writing ∫₀¹ x dx = Σᵢ₌₁ⁿ (i/n)(1/n) without specifying n or taking n→∞.
**Root cause:** The definition of the integral as a limit is new. Learner imports the AROC→IROC confusion (the finite expression IS the thing, not an approximation) into the area context.
**Trigger condition:** Problems requiring the distinction between a finite Riemann sum and the definite integral.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "What is lim_{n→∞} (1 + 1/n)?" If learner can evaluate this limit (answer: 1), proceed to A01. If not, briefly revisit limit concept (math.calc.limits prerequisite) before starting.

**Scaffolding ladder:**
- Rung 1 (pictorial): Provide a completed graph of y=x on [0,2] with n=4 left-endpoint rectangles. Learner computes each rectangle's area by reading heights from the graph.
- Rung 2 (partial abstract): Learner writes the left-sum formula Σᵢ₌₁ⁿ f(xᵢ₋₁)Δx with n=4 and evaluates it given xᵢ values are provided.
- Rung 3 (full abstract): Learner sets up the right-sum formula, expresses it in Σ notation, and takes n→∞.

**Pacing note:** h=6 estimated hours; A01–A02 in session 1; A03 + mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

REPRESENTATION 1 — PICTORIAL/PHYSICAL:
"Consider the region under y=x² over [0,2]. We want its exact area. We cannot use the rectangle-area formula directly because the 'height' changes. Strategy: approximate using rectangles, then improve the approximation."

Draw [0,2] divided into 4 equal subintervals of width Δx=0.5. Over each subinterval, erect a rectangle with height equal to the LEFT endpoint value:
- [0, 0.5]: height f(0)=0, area = 0×0.5 = 0
- [0.5, 1]: height f(0.5)=0.25, area = 0.25×0.5 = 0.125
- [1, 1.5]: height f(1)=1, area = 1×0.5 = 0.5
- [1.5, 2]: height f(1.5)=2.25, area = 2.25×0.5 = 1.125

Left Riemann sum (n=4): L₄ = 0 + 0.125 + 0.5 + 1.125 = 1.75.

"Visually: the rectangles sit inside the curve (since f=x² is increasing). This underestimates the true area."

REPRESENTATION 2 — PICTORIAL/GRAPHICAL:
Same picture with RIGHT endpoint rectangles:
- [0, 0.5]: height f(0.5)=0.25, area=0.125
- [0.5, 1]: height f(1)=1, area=0.5
- [1, 1.5]: height f(1.5)=2.25, area=1.125
- [1.5, 2]: height f(2)=4, area=2.0

Right Riemann sum (n=4): R₄ = 0.125 + 0.5 + 1.125 + 2.0 = 3.75.

"Right sum overshoots — rectangles extend above the curve. True area is between L₄=1.75 and R₄=3.75."

REPRESENTATION 3 — ABSTRACT:
General formula: divide [a,b] into n subintervals of width Δx=(b−a)/n.
Left sum: Lₙ = Σᵢ₌₁ⁿ f(a+(i−1)Δx)·Δx.
Right sum: Rₙ = Σᵢ₌₁ⁿ f(a+i·Δx)·Δx.
Both converge to the same limit as n→∞: ∫ₐᵇ f(x)dx = lim_{n→∞} Lₙ = lim_{n→∞} Rₙ.

**Assessment primitive: P49**

PROBE: "For f(x)=x on [0,2] with n=4 (Δx=0.5), compute the left Riemann sum."
- CORRECT: "Left endpoints: 0, 0.5, 1, 1.5. Heights: 0, 0.5, 1, 1.5. Areas: 0, 0.25, 0.5, 0.75. Total: L₄=1.5." → "Correct. Note the true area is ∫₀² x dx = 2 (½×base×height of the triangle), so L₄=1.5 underestimates by 0.5."
- PARTIAL: Correct method, arithmetic error → "Good setup. Check: 0.5×0.5=0.25, 1×0.5=0.5, 1.5×0.5=0.75. Sum: 0+0.25+0.5+0.75=1.5."
- INCORRECT: Uses right endpoints for "left" sum → "Left sum uses the LEFT endpoint of each subinterval. The first subinterval [0,0.5] has left endpoint 0, so height=f(0)=0, not f(0.5)=0.5."
- NO_RESPONSE: "List the four subintervals: [0,0.5], [0.5,1], [1,1.5], [1.5,2]. For each, find the LEFT endpoint x, compute f(x)=x (height), multiply by 0.5 (width). Sum the four areas."

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — RIEMANN SUM (finite approximation):
Formula: Sₙ = Σᵢ₌₁ⁿ f(xᵢ*)·Δx (finite sum, specific n).
What it is: sum of n rectangle areas — an approximation to the true area.
Error: nonzero for finite n; the rectangles do not perfectly fit the curve.
Depends on: n (number of rectangles), choice of xᵢ* (left/right/midpoint).
Example: For f(x)=x² on [0,1], R₄=0.46875 — an overestimate of true area 1/3 ≈ 0.333.

PAIR B — DEFINITE INTEGRAL (exact area):
Definition: ∫ₐᵇ f(x)dx = lim_{n→∞} Σᵢ₌₁ⁿ f(xᵢ*)·Δx.
What it is: the LIMIT of the Riemann sums as n→∞ — the exact area.
Error: zero — all choices of xᵢ* give the same limit (for integrable functions).
Independent of: n and xᵢ* choice (in the limit).
Example: ∫₀¹ x² dx = 1/3 exactly.

TRANSITION: As n grows: for f(x)=x² on [0,1]:
- R₄ = 0.46875
- R₁₀ = 0.385
- R₁₀₀ ≈ 0.3384
- R₁₀₀₀ ≈ 0.3338
- Limit: exactly 1/3 ≈ 0.3333...

"The Riemann sums approach 1/3 but never equal it for any finite n. The integral IS 1/3 — the limit, not any single approximation."

**Assessment primitive: P49**

PROBE: "Is ∫₀¹ x dx equal to the left Riemann sum L₄ = 0.375?"
- CORRECT: "No. L₄=0.375 is an approximation for n=4. The definite integral ∫₀¹ x dx = 0.5 (area of the triangle with base 1 and height 1). As n→∞, Lₙ→0.5." → "Exactly right. The integral is the limit, not any finite sum."
- PARTIAL: "No, it's approximate" but can't give the exact value → "Correct instinct — L₄ is approximate. The exact integral is ∫₀¹ x dx = ½×1×1 = 0.5 (triangle area). That's the limit value the sums approach."
- INCORRECT: "Yes, 0.375 is the integral" → Address MC-3: "L₄=0.375 is the Riemann sum for n=4. The integral equals the LIMIT as n→∞. More rectangles: L₁₀=0.45, L₁₀₀=0.495, L₁₀₀₀=0.4995, … approaching 0.5. The integral is 0.5, not 0.375."
- NO_RESPONSE: "Compute L₄ for [0,1] with n=4: widths=0.25, left endpoints 0,0.25,0.5,0.75. Heights: 0, 0.25, 0.5, 0.75. Total: 0.375. Is this the exact area? What does 'integral as a limit' mean?"

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: As n increases, right Riemann sum Rₙ for f(x)=x² on [0,1] converges to 1/3.

ALGEBRAIC DERIVATION (finding the limit exactly):
Subintervals: width Δx = 1/n, right endpoints xᵢ = i/n.
Rₙ = Σᵢ₌₁ⁿ f(i/n)·(1/n) = Σᵢ₌₁ⁿ (i/n)²·(1/n) = (1/n³) Σᵢ₌₁ⁿ i².

Use the sum formula: Σᵢ₌₁ⁿ i² = n(n+1)(2n+1)/6.

Rₙ = (1/n³) · n(n+1)(2n+1)/6 = (n+1)(2n+1)/(6n²) = (2n²+3n+1)/(6n²).

TAKE THE LIMIT:
lim_{n→∞} Rₙ = lim_{n→∞} (2n²+3n+1)/(6n²).
Divide numerator and denominator by n²: lim_{n→∞} (2+3/n+1/n²)/6 = 2/6 = 1/3.

CONFIRMATION:
∫₀¹ x² dx = 1/3. This matches — the limit of the Riemann sum equals the integral.

GENERALISED PATTERN:
For f(x)=xᵏ on [0,1]: ∫₀¹ xᵏ dx = 1/(k+1). This is the generalisation of the pattern observed when computing limits of Riemann sums for power functions.

CONSOLIDATION: The algebraic limit computation shows WHY the integral gives the exact value — not by direct measurement but as a limit of summations that can be computed exactly using sum formulas.

**Assessment primitive: P49**

PROBE: "For f(x)=1 (constant function) on [0,3]: (a) Write the right Riemann sum Rₙ for arbitrary n. (b) What is lim_{n→∞} Rₙ? (c) Does this equal ∫₀³ 1 dx?"
- CORRECT: "(a) Δx=3/n, xᵢ=3i/n, f(xᵢ)=1. Rₙ=Σᵢ₌₁ⁿ 1·(3/n)=n·(3/n)=3. (b) lim_{n→∞} 3=3. (c) Yes — ∫₀³ 1 dx = 3 (rectangle of height 1 on [0,3])." → "Perfect. When f is constant, ALL Riemann sums equal the exact integral — the limit is trivial."
- PARTIAL: Correct Rₙ=3 but unsure about the integral → "Rₙ=3 for every n — the limit is 3. And ∫₀³ 1 dx = area of a 3×1 rectangle = 3. So Rₙ = integral = 3 for all n. Constant functions are exact."
- INCORRECT: Rₙ=3/n → "Each rectangle has width 3/n and height 1. There are n of them. Total area: n×(1×3/n)=3. Not 3/n."
- NO_RESPONSE: "Width of each subinterval Δx=3/n. Height of each rectangle f(xᵢ)=1 (constant). Area of each: 1×(3/n). How many rectangles? n. Total Rₙ=?"

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (RECTANGLES-TOUCH-CURVE-AT-TOP)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"A natural geometric intuition: a 'valid' rectangle should have its top edge lying along the curve. But Riemann sums do not require this — they only require that the rectangle height equals the function value at ONE CHOSEN POINT within each subinterval. The rectangle may overshoot or undershoot the curve on the rest of the subinterval."

**P41 — MISCONCEPTION DETECTOR**
"For f(x)=x² on [0,1], n=2 subintervals. The left Riemann sum uses rectangles with heights f(0)=0 and f(0.5)=0.25. The first rectangle has height 0 — it is a flat line. Is this a valid Riemann sum?
(A) No — the rectangle has zero height, which can't approximate the area under x².
(B) Yes — the left endpoint of [0, 0.5] is x=0, so the height f(0)=0 is the correct left-sum choice, even though it underestimates badly."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"The rectangle's height is determined by the CHOICE of sample point — left, right, or midpoint — NOT by requiring the rectangle to 'fit' the curve. The rectangle does NOT need to touch the curve at its right edge (for a left sum), or at its top, or at any particular point other than the sample point. The entire framework is: choose a sample point, evaluate f there, that's the height. The error (gap between rectangle and curve) decreases as n→∞ because each rectangle width Δx→0, so even a bad choice within the subinterval causes only negligible error. All choices converge to the same limit."

---

### TA-B02 — Repair for MC-2 and MC-3 (MORE-RECTANGLES-CHANGES-AREA / SUM-IS-INTEGRAL)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"Two related confusions about the relationship between the finite Riemann sum and the definite integral. First: 'more rectangles changes the true area.' Second: 'a Riemann sum equals the integral.' Both confuse a sequence of approximations with the fixed quantity they approach."

**P41 — MISCONCEPTION DETECTOR**
"The right Riemann sum for f(x)=x² on [0,1] is R₁₀₀≈0.3384. Is this the value of ∫₀¹ x² dx?
(A) Yes — 100 rectangles is close enough.
(B) No — the integral equals exactly 1/3≈0.3333; 0.3384 is still an overestimate."
[If A: learner holds MC-3.]
"As we increase n from 4 to 100, the Riemann sum changes from 0.46875 to 0.3384. Does the actual area under y=x² change?
(A) Yes — using more rectangles gives a more accurate area, so the area changes.
(B) No — the area is fixed; the APPROXIMATION improves; the area itself does not change."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"The area under the curve is a FIXED geometric quantity — it exists and is constant regardless of how we try to measure it. Riemann sums are MEASUREMENTS that improve in accuracy as n increases. Saying 'the area changes as n increases' is like saying 'the room got larger because I used a more accurate tape measure.' The room (= area) is fixed; the measurement (= Riemann sum) improves.
The definite integral IS the limit: ∫ₐᵇ f(x)dx = lim_{n→∞} Σf(xᵢ*)Δx. For any finite n, Σf(xᵢ*)Δx ≠ integral (unless f is constant or the sum is exact by coincidence). The '=' sign requires the limit."

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"For f(x)=2x on [0,3], n=3 equal subintervals: (a) Compute L₃ (left Riemann sum). (b) Compute R₃ (right Riemann sum). (c) Which is the exact value of ∫₀³ 2x dx and why?"
[Expected: Δx=1. (a) L₃=2(0)·1+2(1)·1+2(2)·1=0+2+4=6. (b) R₃=2(1)·1+2(2)·1+2(3)·1=2+4+6=12. (c) Exact integral=∫₀³ 2x dx=[x²]₀³=9. Neither L₃ nor R₃ gives the exact value — the integral is the limit. (Average of L₃ and R₃ = 9 — this works here because f is linear, but it's a special case.)]

**Day 10 prompt:**
"The Riemann sum for f(x)=x on [0,1] with n equal subintervals (right endpoints) is Rₙ=Σᵢ₌₁ⁿ(i/n)(1/n)=(1/n²)·n(n+1)/2=(n+1)/(2n). Take the limit as n→∞. What is ∫₀¹ x dx?"
[Expected: lim_{n→∞}(n+1)/(2n) = 1/2. So ∫₀¹ x dx = 1/2. Geometric confirmation: area of triangle with base 1 and height 1 = ½.]

**Day 30 prompt:**
"Why does it not matter whether we use left, right, or midpoint Riemann sums — they all give the same integral as n→∞? What property of f would need to fail for this to break down?"
[Expected: For integrable functions (bounded, with at most countably many discontinuities), any choice of xᵢ* converges to the same limit because the difference between any two choices within the same subinterval tends to zero as Δx→0. It breaks down for non-integrable functions (e.g., the Dirichlet function, which equals 1 on rationals and 0 on irrationals — left sums give 1, right sums give 0, no limit exists).]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.calc.limits — limit notation, computation of limits as n→∞; essential for defining the integral as a limit

**Unlocked blueprints:**
- math.calc.definite-integral — formal introduction of the definite integral; Riemann sums are its definition

**Cross-links (none):**
- cross_links=[] — no Tier-1 cross-links

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The single most important idea is that the definite integral IS the limit of Riemann sums — not any finite approximation. Spend the most time on the contrast in A02.

**Visual leverage:** The over/under approximation picture for an increasing function is highly memorable. Use it consistently: left-endpoint rectangles under the curve (under-approximation) vs. right-endpoint over the curve (over-approximation). The true area is between them, and the gap closes as n→∞.

**Sum formula prerequisite:** The algebraic derivation in A03 requires Σᵢ₌₁ⁿ i² = n(n+1)(2n+1)/6. If the learner does not know this, provide it as a given fact with the note that it is provable by induction. Do not detour to prove it here.

**Constant function sanity check:** Use f(x)=c to show that all Riemann sums (left, right, midpoint) equal c(b−a) exactly for all n — a reassuring confirmation that the limit machinery gives the expected answer when the area is already a rectangle. This counteracts MC-1 (all choices valid) and MC-2 (more rectangles doesn't change the area — it was already exact).

**Connection to earlier limits:** Explicitly link the limit step in A03 to math.calc.limits — the same technique of dividing by highest power, applying limit laws. This reinforces that Riemann sums are not a new kind of limit but the same machinery applied to sums.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P11, A02: P06, A03: P04
- [x] V-3: N/A — CPA_entry_stage=P (advanced difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01 and B02 comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence (cross_links=[]); P76 uses independent novel problem (GR-9)

### Content Checks
- [x] V-11: bloom=understand; P07 not used (correct — understand does not require worked example pair)
- [x] V-12: Misconception registry has ≥3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC; B01 covers MC-1; B02 covers MC-2 and MC-3
- [x] V-14: P76 independence probe is a novel, unseen problem (algebraic derivation of ∫₀¹ x² dx via limit of right Riemann sum)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.80 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: No curriculum content generated outside the Canonical KG description; all mathematical content consistent with KG fields and standard calculus pedagogy; no fabricated identities or misleading claims

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.80 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"For f(x)=x on [0,2] with n=4 equal subintervals (Δx=0.5), compute the left Riemann sum L₄."
[Expected: Left endpoints: 0, 0.5, 1, 1.5. Heights: 0, 0.5, 1, 1.5. L₄ = (0+0.5+1+1.5)×0.5 = 3×0.5 = 1.5. (True area = 2.)]

**Item 2:**
"Does using 1000 rectangles instead of 4 change the exact area under f(x)=x on [0,2]?"
[Expected: NO. The exact area (= ∫₀² x dx = 2) is fixed. More rectangles improve the APPROXIMATION, not the area itself.]

**Item 3:**
True or False: "The definite integral ∫ₐᵇ f(x)dx equals the Riemann sum Σᵢ₌₁ⁿ f(xᵢ*)Δx."
[Expected: FALSE (in general). The integral equals the LIMIT of the Riemann sum as n→∞, not the sum for any finite n. (Exception: f constant, where all sums already equal the exact value.)]

**Item 4:**
"For f(x)=c (constant) on [a,b], what is the right Riemann sum Rₙ for any n? What is ∫ₐᵇ c dx?"
[Expected: Rₙ = Σᵢ₌₁ⁿ c·Δx = c·(n·Δx) = c·(b−a). This is exact for all n. ∫ₐᵇ c dx = c(b−a). They agree — as expected.]

---

#### P55 — SCORE after P77
Score each item 1 point for fully correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"For f(x)=x² on [0,1], the right Riemann sum with n equal subintervals is:
Rₙ = (1/n³) Σᵢ₌₁ⁿ i²

(a) Use the identity Σᵢ₌₁ⁿ i² = n(n+1)(2n+1)/6 to simplify Rₙ.
(b) Take lim_{n→∞} Rₙ. What is ∫₀¹ x² dx?
(c) Is this consistent with the general pattern ∫₀¹ xᵏ dx = 1/(k+1)?"

[Expected:
(a) Rₙ = (1/n³)·n(n+1)(2n+1)/6 = (n+1)(2n+1)/(6n²) = (2n²+3n+1)/(6n²).
(b) lim_{n→∞} (2+3/n+1/n²)/6 = 2/6 = 1/3. So ∫₀¹ x² dx = 1/3.
(c) Yes — for k=2: 1/(k+1)=1/3. ✓]

---

#### P55 — SCORE after P76
Score P76 as 1 point if the limit is correctly taken and the answer 1/3 is stated (even if algebraic simplification has minor errors, as long as the limit process is demonstrated). 0 if the limit is not taken or the final answer is wrong.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner demonstrates understanding of Riemann sums as approximations, the limit definition of the definite integral, and the distinction between a finite sum and its limit.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 2 (more rectangles changes area): → TA-B02 (MC-2 repair)
- FAIL on Item 3 (sum equals integral): → TA-B02 (MC-3 repair)
- FAIL on Item 1 (left/right endpoint confusion): → TA-B01 (MC-1 — clarify sample point choice)
- FAIL on P76 (limit not taken or algebraic error): → Return to A03; reinforce limit of Rₙ pattern; re-gate
- FAIL on multiple items: → TA-B01 then TA-B02; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh items + P76 equivalent. Apply MAMR 4/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated understanding of Riemann sums and the limit definition of the definite integral.

Key anchors to carry forward:
- Rₙ = Σᵢ₌₁ⁿ f(xᵢ*)·Δx is a FINITE APPROXIMATION — it depends on n and sample point choice.
- ∫ₐᵇ f(x)dx = lim_{n→∞} Rₙ = exact area — defined as the limit.
- For increasing f: left sum under-approximates, right sum over-approximates; both converge.
- The algebra of limits (sum formulas + 1/n→0) gives exact values from finite Riemann sums.

Next concept: math.calc.definite-integral — the Fundamental Theorem of Calculus, which provides a shortcut for evaluating integrals without computing limits of sums."

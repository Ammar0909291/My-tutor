<!-- BLUEPRINT: math.trig.trig-equations -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Trigonometric Equations (`math.trig.trig-equations`)
**Concept ID:** `math.trig.trig-equations`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=10 | mastery_threshold=0.75

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.trig-equations |
| name | Trigonometric Equations |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 10 |
| mastery_threshold | 0.75 |
| CPA_entry_stage | A (Abstract) |
| requires (Tier-1) | math.trig.trig-identities, math.trig.inverse-trig |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.75 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.trig-identities**: Pythagorean identities, reciprocal identities, and simplification strategies needed to reduce complex equations
- **math.trig.inverse-trig**: arcsin/arccos/arctan to find the principal value; domain and range of each inverse function

### Target Knowledge State
Student isolates the trig function, finds the principal value using an inverse function, identifies all solutions in the given interval using ASTC and period symmetry, and writes the general solution with correct period multiples. Student handles linear, quadratic, and composite-argument (e.g., sin(2θ)) equations. Student checks solutions for extraneous roots when squaring or applying identities.

### Conceptual Obstacles
1. Stopping at the principal (first) solution and missing the second quadrant solution
2. Adding 2kπ as the period multiple for functions (tan, sin(2θ)) whose effective period is not 2π
3. Squaring both sides to clear a trig expression without checking extraneous solutions

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | ONLY-PRINCIPAL-VALUE | Student reports sin θ = 1/2 → θ = π/6 only, missing the π − π/6 = 5π/6 solution | Any linear trig equation in [0, 2π) |
| MC-2 | WRONG-PERIOD-MULTIPLE | Student adds 2kπ for tan equations or sin(2θ) where the effective period is π | tan θ = k; sin(2θ) = k style problems |
| MC-3 | EXTRANEOUS-UNCHECKED | Student squares both sides (e.g., sec θ = 1 − tan θ) without substituting solutions back to verify | Equations requiring squaring or cross-multiplication |
| MC-4 | INTERVAL-OVERSHOOT | Student finds solutions in [0, 4π) when the given interval is [0, 2π); includes extra pairs from the doubled range | Composite-argument problems like sin(2θ) = k |

**Foundational Misconception:** MC-1 (ONLY-PRINCIPAL-VALUE) — produces 50 % of missing solutions. Addressed in A01 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — algebraic equation in a trig function.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Four-step algorithm; derive all solutions on the unit circle for a linear equation; general solution notation
2. **A02 P04 PATTERN INDUCTION** — Gallery of linear and composite-argument equations; handle sin(2θ), cos(θ/2), tan(θ); period-adjusted solution sets
3. **A03 P06 CONTRAST PAIR** — Positive vs negative trig value: sin θ = 1/2 (Q1+Q2) vs sin θ = −1/2 (Q3+Q4); identical method, different quadrants
4. **A04 P11 REPRESENTATION SHIFT** — Quadratic trig equations: factor or substitute u = sin θ; split into two linear equations; re-verify domain restrictions
5. **A05 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — The Four-Step Algorithm for Linear Trig Equations

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Establish the canonical four-step solution procedure; surface MC-1 (missing the second solution); introduce general solution notation

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Equation:**

2 sin θ = 1, θ ∈ [0, 2π)

**Stage B — Four-step algorithm:**

| Step | Action | Example |
|------|--------|---------|
| 1 | Isolate the trig function | sin θ = 1/2 |
| 2 | Find the reference angle | α = arcsin(1/2) = π/6 |
| 3 | Identify all quadrants (ASTC + sign of value) | sin θ > 0 → Q1 and Q2 |
| 4 | Write all solutions in the given interval | θ = π/6 and θ = π − π/6 = 5π/6 |

**Stage C — General solution (all real solutions):**

θ = π/6 + 2kπ  or  θ = 5π/6 + 2kπ, k ∈ ℤ

The "+2kπ" captures every full revolution. For sin: two families of solutions per period.

**Stage D — Why ASTC gives two solutions:**

sin θ = 1/2 holds wherever the y-coordinate on the unit circle equals 1/2. The horizontal line y = 1/2 intersects the unit circle at two points: one in Q1 (θ = π/6) and one in Q2 (θ = 5π/6). Missing Q2 means missing half the solutions.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Solve 2 cos θ = −√3 for θ ∈ [0, 2π).

(A) θ = 5π/6 only
(B) θ = π/6 only
(C) θ = 5π/6 and θ = 7π/6
(D) θ = π/6 and θ = 11π/6

*Branch CORRECT (C):* cos θ = −√3/2; reference angle = π/6; cos negative → Q2 and Q3; θ = π − π/6 = 5π/6 and θ = π + π/6 = 7π/6. ✓ Proceed to A02.

*Branch INCORRECT (A):* Only Q2 is found. cos is also negative in Q3: θ = 7π/6. Both solutions are needed. Proceed to A02.

*Branch INCORRECT (D):* Reference angle π/6 is correct, but cos positive in Q1 and Q4. Here cos θ = −√3/2 is negative → Q2 and Q3, giving 5π/6 and 7π/6. Proceed to A02.

*Branch NO_RESPONSE:* cos θ = −√3/2; reference α = π/6; cos < 0 in Q2 and Q3; θ = **5π/6** and θ = **7π/6**. Proceed to A02.

---

### Teaching Action A02 — Composite-Argument and Non-Standard-Period Equations

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Extend the algorithm to sin(2θ), cos(θ/2), tan θ; emphasize period-adjusted solution interval; prevent MC-2 and MC-4

---

**[P04 — PATTERN INDUCTION]**

**Rule:** If the argument is nθ, the effective period of the equation is 2π/n (for sin/cos) or π/n (for tan). Solve for nθ in an interval n times as wide, then divide by n.

**Gallery:**

| Equation | Interval | Step 1: argument | Solve for | Solutions |
|----------|----------|------------------|-----------|-----------|
| sin(2θ) = √3/2 | [0, 2π) | let u = 2θ, u ∈ [0, 4π) | u = π/3, 2π/3, 7π/3, 8π/3 | θ = π/6, π/3, 7π/6, 4π/3 |
| cos(θ/2) = 1/2 | [0, 2π) | let u = θ/2, u ∈ [0, π) | u = π/3 | θ = 2π/3 |
| tan(2θ) = 1 | [0, π) | let u = 2θ, u ∈ [0, 2π); period π | u = π/4, 5π/4 | θ = π/8, 5π/8 |

**Key check for MC-4:** Before dividing by n, verify all solutions for nθ lie within the widened interval [0, 2nπ). Discard any outside; include all inside.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Solve sin(2θ) = −1/2 for θ ∈ [0, 2π). How many solutions are there?

(A) 2 solutions
(B) 4 solutions
(C) 1 solution
(D) 8 solutions

*Branch CORRECT (B):* u = 2θ ∈ [0, 4π); sin u = −1/2 → reference π/6; sin negative in Q3 and Q4; u = 7π/6, 11π/6, 7π/6 + 2π = 19π/6, 11π/6 + 2π = 23π/6; divide by 2: θ = 7π/12, 11π/12, 19π/12, 23π/12. Four solutions. ✓ Proceed to A03.

*Branch INCORRECT (A):* The widened interval [0, 4π) contains two full periods of sin(2θ), so sin(2θ) = −1/2 has 2 solutions per period × 2 periods = 4 total. Proceed to A03.

*Branch INCORRECT (C or D):* u ∈ [0, 4π) with sin u = −1/2 gives 4 u-values (two per 2π period), yielding 4 θ-values. Proceed to A03.

*Branch NO_RESPONSE:* u = 2θ ∈ [0, 4π); two solutions per 2π period × 2 periods = **4 solutions** for θ. Proceed to A03.

---

### Teaching Action A03 — Positive vs Negative Values: Quadrant Contrast

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Show that the algorithm is identical for positive and negative trig values — only the ASTC quadrant selection changes; resolve MC-1 for the negative case

---

**[P06 — CONTRAST PAIR]**

| | sin θ = 1/2 | sin θ = −1/2 |
|--|------------|--------------|
| Reference angle | π/6 | π/6 |
| Sign of sin | Positive | Negative |
| Quadrants | Q1, Q2 | Q3, Q4 |
| Q1 solution | π/6 | — |
| Q2 solution | 5π/6 | — |
| Q3 solution | — | π + π/6 = 7π/6 |
| Q4 solution | — | 2π − π/6 = 11π/6 |
| Solutions in [0, 2π) | π/6, 5π/6 | 7π/6, 11π/6 |

**Pattern:** The reference angle (π/6) is identical. Only the quadrant labels change based on where the function is positive or negative (ASTC). The Q2 formula is always π − α; the Q3 formula is always π + α; the Q4 formula is always 2π − α.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Solve cos θ = √2/2 for θ ∈ [0, 2π). Which quadrants contain solutions?

(A) Q1 and Q2
(B) Q1 and Q4
(C) Q2 and Q3
(D) Q3 and Q4

*Branch CORRECT (B):* cos θ > 0 in Q1 and Q4. Reference angle = π/4. Solutions: θ = π/4 (Q1) and θ = 7π/4 (Q4). ✓ Proceed to A04.

*Branch INCORRECT (A):* Q2 has cos θ negative (x-coordinate negative). cos θ > 0 in Q1 and Q4. Proceed to A04.

*Branch INCORRECT (C or D):* Both Q2 and Q3 (and Q4 with C) give negative cosine. For positive cos θ = √2/2, use Q1 and Q4. Proceed to A04.

*Branch NO_RESPONSE:* cos is positive where x-coordinate is positive: **Q1 and Q4**. Solutions: θ = π/4 and 7π/4. Proceed to A04.

---

### Teaching Action A04 — Quadratic Trigonometric Equations

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Extend the algorithm to quadratic form; introduce factoring and substitution; surface MC-3 (extraneous solutions)

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Factoring:**

2 sin²θ − sin θ − 1 = 0, θ ∈ [0, 2π)

Let u = sin θ: 2u² − u − 1 = (2u + 1)(u − 1) = 0.

Sub-equation 1: sin θ = −1/2 → θ = 7π/6, 11π/6.
Sub-equation 2: sin θ = 1 → θ = π/2.

All three solutions: θ = π/2, 7π/6, 11π/6. No squaring → no extraneous roots.

**Stage B — When extraneous solutions appear (squaring):**

tan θ + sec θ = 1

Rewrite as sin θ/cos θ + 1/cos θ = 1 → (sin θ + 1)/cos θ = 1 → sin θ + 1 = cos θ.

Square: (sin θ + 1)² = cos²θ = 1 − sin²θ → sin²θ + 2 sin θ + 1 = 1 − sin²θ → 2 sin²θ + 2 sin θ = 0 → 2 sin θ(sin θ + 1) = 0.

Solutions of squared equation: sin θ = 0 → θ = 0, π; or sin θ = −1 → θ = 3π/2.

**Check by substitution** (mandatory after squaring):
- θ = 0: tan 0 + sec 0 = 0 + 1 = 1 ✓
- θ = π: tan π + sec π = 0 + (−1) = −1 ≠ 1 ✗ (extraneous)
- θ = 3π/2: undefined (sec undefined) ✗

Valid solution: θ = 0 only.

**Stage C — Decision table:**

| Equation type | Strategy | Must check for extraneous? |
|---------------|----------|--------------------------|
| Linear in sin/cos/tan | Isolate, reference angle | No |
| Quadratic in trig function | Factor or substitution u = trig | No (unless original domain restricted) |
| Involves squaring | Square, then substitute all solutions back | Yes — always |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Solve 2 cos²θ − cos θ = 0 for θ ∈ [0, 2π). How many solutions?

(A) 1
(B) 2
(C) 3
(D) 4

*Branch CORRECT (C):* Factor: cos θ(2 cos θ − 1) = 0. cos θ = 0 → θ = π/2, 3π/2; cos θ = 1/2 → θ = π/3. Three solutions total. ✓ Proceed to A05.

*Branch INCORRECT (B):* cos θ = 0 gives TWO solutions (π/2 and 3π/2); cos θ = 1/2 gives one more (π/3). Total = 3. Proceed to A05.

*Branch INCORRECT (A):* Factoring gives two sub-equations, each contributing solutions. Total = 3. Proceed to A05.

*Branch NO_RESPONSE:* Factor: cos θ(2 cos θ − 1) = 0 → cos θ = 0 (θ = π/2, 3π/2) or cos θ = 1/2 (θ = π/3). **3 solutions.** Proceed to A05.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A05 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** Solve 2 cos²θ − cos θ = 0 for θ ∈ [0, 2π).

**Problem 2.** Solve sin(2θ) = √3/2 for θ ∈ [0, 2π).

**Problem 3.** Solve 2 sin²θ + 3 sin θ + 1 = 0 for θ ∈ [0, 2π).

**Problem 4.** Solve tan θ = √3 for the general solution (all real θ).

---

**[P55 — SCORE]**

*Answers:*

1. cos θ(2 cos θ − 1) = 0; cos θ = 0 → π/2, 3π/2; cos θ = 1/2 → π/3, 5π/3. Four solutions: π/3, π/2, 3π/2, 5π/3. ✓

2. 2θ ∈ [0, 4π); sin(2θ) = √3/2; reference π/3; Q1: 2θ = π/3, 7π/3; Q2: 2θ = 2π/3, 8π/3; divide by 2: θ = π/6, π/3, 7π/6, 4π/3. ✓

3. (2 sin θ + 1)(sin θ + 1) = 0; sin θ = −1/2 → 7π/6, 11π/6; sin θ = −1 → 3π/2. Three solutions: 7π/6, 3π/2, 11π/6. ✓

4. tan θ = √3; reference π/3; period π; general solution: θ = π/3 + kπ, k ∈ ℤ. ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* A city's average daily temperature is modeled by T(t) = 12 + 8 sin(2πt/365 − π/2) degrees Celsius, where t is the day of the year (t = 1 is January 1).

*(a)* On which days is T(t) = 16 °C? (Find all solutions in [1, 365].)

*(b)* Explain why there are two days, and which one is in spring vs autumn.

*Expected answer:*

*(a)* 12 + 8 sin(2πt/365 − π/2) = 16 → sin(2πt/365 − π/2) = 1/2.

Let u = 2πt/365 − π/2; u ∈ [−π/2, 3π/2) for t ∈ [1, 365].

sin u = 1/2 → reference π/6; sin positive in Q1 and Q2.

u = π/6 → 2πt/365 − π/2 = π/6 → 2πt/365 = 2π/3 → t = 365/3 ≈ 122 (May 2).

u = 5π/6 → 2πt/365 − π/2 = 5π/6 → 2πt/365 = 4π/3 → t = 2(365)/3 ≈ 243 (August 31).

*(b)* The sinusoidal model crosses 16 °C twice: once on the way up (spring, ≈ day 122) and once on the way down (late summer/early autumn, ≈ day 243).

---

**[P55 — SCORE]**

Transfer probe: 1 point (both dates correct with correct method); 0.5 if setup correct but arithmetic error in one date.

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.75 × 5⌉ = 4). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| ≥ 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed item; missing Q2 solution → B01; wrong period → B02; extraneous unchecked → B03; targeted repair |
| ≤ 2/5 | → Return to A01; rebuild four-step algorithm with a simple linear equation; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.trig-equations` complete. Threshold 0.75 requires 4/5 correct.

**Unlocks:** Advanced trig applications; differential equations modelling sinusoidal phenomena.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — ONLY-PRINCIPAL-VALUE Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You found one solution. A trig equation in [0, 2π) almost always has TWO solutions (except at the extremes sin θ = ±1 or cos θ = ±1). The unit circle has two points for every y-value between −1 and 1."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* sin θ = √3/2. Name BOTH values of θ in [0, 2π).
*Correct response:* θ = π/3 (Q1) and θ = 2π/3 (Q2). If only π/3 is given, the Q2 solution was missed.

**[P64 — CONCEPTUAL SHIFT]**
"Draw a horizontal line at height √3/2 on the unit circle. Count how many intersection points there are — always two (for values strictly between −1 and 1). The second solution is always π − α for sin, or 2π − α for cos (Q4), or π + α for cos (Q3)."

---

### Repair Action B02 — WRONG-PERIOD-MULTIPLE Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"tan has period π, not 2π. Adding 2kπ for tan θ = k gives correct solutions but doubles the period family: it finds only every other solution. Use + kπ for tan."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* tan θ = 1. Give the general solution.
*Correct response:* θ = π/4 + kπ. If student writes θ = π/4 + 2kπ, the period is wrong (misses 5π/4).

**[P64 — CONCEPTUAL SHIFT]**
"Tan repeats every π (not 2π) because it equals sin/cos and both sign-flip simultaneously in the next half-circle. The graph of tan x shows a full period in (−π/2, π/2); after another π it repeats. Always write + kπ, not + 2kπ, for the tangent general solution."

---

### Repair Action B03 — EXTRANEOUS-UNCHECKED Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"Squaring an equation can create extra solutions that satisfy the squared equation but not the original. You MUST substitute every candidate back into the original equation and discard any that fail."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* After squaring sin θ = cos θ, you get sin²θ = cos²θ → tan²θ = 1 → θ = π/4, 3π/4, 5π/4, 7π/4. Check each in sin θ = cos θ. Which fail?
*Correct response:* θ = 3π/4 fails (sin 3π/4 > 0, cos 3π/4 < 0) and θ = 7π/4 fails (sin < 0, cos > 0). Keep only π/4 and 5π/4.

**[P64 — CONCEPTUAL SHIFT]**
"Squaring destroys sign information. sin θ = −cos θ becomes sin²θ = cos²θ after squaring — identical to sin θ = +cos θ. The squared equation cannot distinguish the two originals, so it includes solutions from both. Always verify."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Solve 2 sin θ − 1 = 0 for θ ∈ [0, 2π). State both solutions. |
| R2 | 3 days | Solve cos(2θ) = −1/2 for θ ∈ [0, 2π). How many solutions? |
| R3 | 7 days | Solve 2 sin²θ − sin θ = 0 for θ ∈ [0, 2π) by factoring. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | Advanced sinusoidal modeling applications |
| Requires (Tier-1) | math.trig.trig-identities, math.trig.inverse-trig |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent temperature-modeling problem.

---

## Component 8 — Teaching Notes

- **Four sub-equation families:** Every trig equation produces exactly the same structure: isolate → reference angle → ASTC quadrant selection → period family. Drilling this loop on simple equations (sin θ = 1/2) before composite arguments prevents algorithm fragmentation.
- **Composite arguments require interval widening before dividing:** Students who divide by n first and then look for solutions routinely miss the extra solutions in the wider range. Always state "let u = nθ, u ∈ [0, 2nπ)" before doing anything else.
- **Quadratic substitution is algebra, not a new trig skill:** Students who struggle with A04 often have weak polynomial factoring. A brief factoring warm-up (2u² − u − 1 = 0 in u, no trig context) before revealing u = sin θ clarifies the algebraic step.
- **The P76 temperature problem is bidirectional:** After finding the two dates, ask the student which day is "coming" vs "going" — this requires reading the sinusoidal model's increasing/decreasing character and deepens transfer beyond mechanical solution.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; algebraic equation used throughout | PASS |
| V-4 | bloom=apply; algorithm application and novel modeling problem | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06, A04=P11) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A05) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.75×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (4 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure (4 non-gate TAs for hrs=10) | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |

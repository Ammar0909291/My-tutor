# Teaching Blueprint — math.trig.trig-functions

## Component 0 — Metadata
concept_id: math.trig.trig-functions
concept_name: Trigonometric Functions
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: understand
estimated_hours: 10
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.trig.unit-circle]
cross_links: [math.func.periodic-function]
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** The trigonometric functions sin(x), cos(x), and tan(x) are defined for all real x (or all x in their natural domain) by extending the unit-circle definitions to the entire real line. Each full revolution of 2π produces identical (x, y) coordinates on the unit circle, making sin and cos periodic with period 2π. tan(x)=sin(x)/cos(x) is undefined when cos(x)=0 and has period π. The domain of sin and cos is all reals; the range of sin and cos is [−1, 1]; tan has domain ℝ∖{π/2+nπ} and range ℝ.

**Conceptual progression:**
1. Domain extension: the unit circle angle θ is allowed to be any real number (positive = counter-clockwise, negative = clockwise, greater than 2π = multiple revolutions).
2. Periodicity: after a full revolution (2π), the point on the unit circle repeats → sin(x+2π)=sin(x), cos(x+2π)=cos(x).
3. Tangent: tan(x)=sin(x)/cos(x)=y/x; undefined when x=0 on the unit circle (x-coordinate=0), i.e., when cos(x)=0; period π because sin and cos reverse sign simultaneously, so their ratio repeats every π.
4. Graphs: sin starts at (0,0), rises to maximum 1 at π/2, returns to 0 at π, minimum −1 at 3π/2, returns at 2π. Cos starts at (0,1); it is a horizontal shift of sin by π/2. Tan has vertical asymptotes at ±π/2, ±3π/2, …
5. Key values: derived from unit-circle angles 0, π/6, π/4, π/3, π/2 (exact values); extended to all quadrants via reference-angle signs.

**CPA arc (entry: P):**
- Pictorial: unit circle with angle sweeping counter-clockwise past 2π; sin/cos graphs as traces of y- and x-coordinate vs. angle; tan graph with asymptotes.
- Abstract: sin(x+2π)=sin(x); cos(x+2π)=cos(x); tan(x+π)=tan(x); domain/range statements.

**Prior knowledge activated:** unit circle (math.trig.unit-circle) — (cos θ, sin θ) coordinates, reference angle method, key angle values in all quadrants; function notation, domain, and range.

---

## Component 2 — Misconception Registry

### MC-1: PERIOD-IS-360-IN-RADIANS [FOUNDATIONAL]
**Description:** Learner states that sin(x) has period 360 when working in radians — treating the degree period (360°) as the radian period. Writes sin(x+360)=sin(x) instead of sin(x+2π)=sin(x).
**Surface form:** "sin(x) repeats every 360 units, so sin(370)=sin(10)."
**Root cause:** Right-triangle and early unit-circle work used degrees throughout. The learner memorised "period=360" without translating to radians: 360°=2π radians. When the variable is in radians, the period is 2π≈6.28, not 360.
**Trigger condition:** Any problem involving the period of sin or cos with real-number (radian) inputs.
**Repair target:** TA-B01.

### MC-2: TAN-PERIOD-IS-2PI
**Description:** Learner claims tan(x) has period 2π, the same as sin and cos. Does not recognise that tan repeats every π because the sign reversal of both sin and cos in opposite quadrants cancels in the ratio.
**Surface form:** "All trig functions have period 2π."
**Root cause:** "Trig functions are periodic; the period is 2π" — a generalisation from sin and cos that ignores the different periodicity of tan. Learners who have not traced through the sign cancellation cannot see why π suffices.
**Trigger condition:** Any period identification problem involving tan.
**Repair target:** TA-B02.

### MC-3: DOMAIN-RESTRICTED-TO-FIRST-QUADRANT
**Description:** Learner believes sin(x), cos(x), and tan(x) are only defined for x in [0°, 90°] (0 to π/2 radians) — the right-triangle domain — and cannot be evaluated for angles beyond the first quadrant or for negative angles.
**Surface form:** "sin(120°) isn't defined because the angle is bigger than 90°. Sine is only for right triangles."
**Root cause:** Right-triangle definitions restrict θ to 0°<θ<90°. The unit-circle extension to all reals was not emphasised or was presented as a separate topic without explicit connection.
**Trigger condition:** Any evaluation of a trig function at an angle outside [0°, 90°] or at a negative angle.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "State the coordinates of the unit-circle point at θ=3π/4." If the learner gives (−√2/2, √2/2) by the reference-angle method (ref=π/4, Q2: cos−, sin+), they are ready for A01. This confirms the unit-circle key-angle fluency needed to derive function values at non-standard angles.

**Scaffolding ladder:**
- Rung 1 (pictorial): animate the angle θ increasing from 0 past 2π; plot the y-coordinate of the unit-circle point vs. θ to produce the sine wave; show the period emerges naturally as the circle completes.
- Rung 2 (structured): table — learner fills in sin(θ), cos(θ), tan(θ) at θ=0, π/6, π/4, π/3, π/2, π, 3π/2, 2π from unit-circle knowledge.
- Rung 3 (full understand): learner identifies period, domain, range, and key features from the graph without referencing the unit circle explicitly.

**Pacing note:** h=10 estimated hours; A01 in sessions 1–2; A02 in sessions 3–4; A03 + mastery gate in sessions 4–5.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

REPRESENTATION 1 — Unit circle (familiar):
Point P on unit circle at angle θ = (cos θ, sin θ). As θ sweeps 0 → 2π counter-clockwise, P traces the full circle.

REPRESENTATION 2 — Graph of sin(x):
Plot y = sin(x) vs. x. As x (= θ) increases: sin(0)=0, sin(π/2)=1, sin(π)=0, sin(3π/2)=−1, sin(2π)=0. Connect smoothly → one full wave. At x=2π the pattern repeats exactly.

REPRESENTATION 3 — Graph of cos(x):
cos(0)=1, cos(π/2)=0, cos(π)=−1, cos(3π/2)=0, cos(2π)=1. Cos is a horizontal shift of sin by π/2 (starts at maximum, not zero).

REPRESENTATION 4 — Graph of tan(x):
tan(x) = sin(x)/cos(x). Undefined when cos(x)=0, i.e., x=π/2+nπ (vertical asymptotes). Between asymptotes: at x=0, tan=0; as x→π/2⁻, tan→+∞; as x→π/2⁺ (next period), tan→−∞. Pattern repeats with period π.

DOMAIN AND RANGE TABLE:
| Function | Domain | Range | Period |
|---|---|---|---|
| sin(x) | All reals ℝ | [−1, 1] | 2π |
| cos(x) | All reals ℝ | [−1, 1] | 2π |
| tan(x) | ℝ∖{π/2+nπ, n∈ℤ} | All reals ℝ | π |

LINKING STATEMENT: "The graph is the unit circle 'unrolled' onto the x-axis. Every 2π, the circle completes a revolution and the graph repeats — that is what period means for a function of a real variable."

**Assessment primitive: P49**

PROBE: "What is the period of cos(x)? What are its maximum and minimum values?"
- CORRECT: "Period=2π; maximum=1 (at x=0, 2π, …); minimum=−1 (at x=π, 3π, …)." → proceed to A02.
- PARTIAL: period correct but range stated as (−1,1) open interval → "Range includes the endpoints: cos(0)=1 and cos(π)=−1 are achieved, so range=[−1,1] (closed interval)."
- INCORRECT: period=360 → Repair with B01 (PERIOD-IS-360-IN-RADIANS). "When the input is in radians (a real number), the period is 2π≈6.28, not 360."
- NO_RESPONSE: "The period is how far x must travel for the graph to repeat. Since cos comes from the unit circle, one full revolution = 2π radians. So period=2π. The y-values span from −1 (at x=π) to 1 (at x=0) — these extremes ARE achieved, so range=[−1,1]."

---

### TA-B01 — Repair for MC-1 (PERIOD-IS-360-IN-RADIANS)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'period of sin(x) is 360.' When x is in radians, the period is 2π. The number 360 is the period in degrees. Radians and degrees are two different units for the same concept."

**P41 — MISCONCEPTION DETECTOR**
"Which is correct when x is measured in radians?
(A) sin(x+360)=sin(x) for all x.
(B) sin(x+2π)=sin(x) for all x."
[If A: learner holds MC-1.]
"Compute sin(0) and sin(2π). Are they equal? Now compute sin(0) and sin(360). Are they equal if x is in radians?"

**P64 — CONCEPTUAL SHIFT**
"One full revolution of the unit circle = 360° = 2π radians. These are the SAME revolution, just measured in different units. 'Period of sin in degrees' = 360°. 'Period of sin in radians' = 2π. When the input x is a real number (radians), use 2π. Only use 360 when the input is explicitly in degrees. Quick test: sin(2π)=sin(0)=0 ✓; sin(360)=sin(360 radians)≈sin(360−57·2π)=sin(360−357.96)=sin(2.04)≈0.896 ≠ 0 ✗. So 360 is WRONG for radian inputs."

→ Return to A01.

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — sin vs cos: same period, different phase:
- sin(0)=0: starts at zero, first maximum at π/2.
- cos(0)=1: starts at maximum, first zero at π/2.
- Relationship: cos(x)=sin(x+π/2); cos is sin shifted LEFT by π/2 (leading by a quarter period).
- Both have range [−1,1], domain ℝ, period 2π.

PAIR B — sin/cos vs tan: different period, domain, range:
- Period: sin/cos period=2π; tan period=π.
- Domain: sin/cos defined for all reals; tan undefined at x=π/2+nπ (vertical asymptotes).
- Range: sin/cos bounded [−1,1]; tan unbounded (all of ℝ).
- Sign pattern: in Q2, sin>0 but cos<0, so tan=sin/cos<0. In Q3, sin<0 and cos<0, so tan>0. Sign reverses every π, not every 2π — hence period=π.

PERIOD OF TAN — why π and not 2π:
tan(x+π) = sin(x+π)/cos(x+π) = (−sin x)/(−cos x) = sin x/cos x = tan x. ✓
Both sin and cos negate simultaneously, so the ratio is unchanged. This is why tan completes a full cycle in half the distance.

CONTRAST TABLE:
| Feature | sin(x) | cos(x) | tan(x) |
|---|---|---|---|
| Period | 2π | 2π | π |
| Domain | ℝ | ℝ | ℝ∖{π/2+nπ} |
| Range | [−1,1] | [−1,1] | ℝ |
| Zeros | nπ | π/2+nπ | nπ |
| At x=0 | 0 | 1 | 0 |
| Even/Odd | Odd | Even | Odd |

**Assessment primitive: P49**

PROBE: "What is the period of tan(x)? Why is it different from the period of sin(x)?"
- CORRECT: "Period of tan=π. Because tan=sin/cos: when x increases by π, sin and cos both negate, so their ratio is unchanged. Sin/cos period=2π because the functions themselves negate after π and only return to original after 2π." → proceed to A03.
- PARTIAL: states period=π correctly but cannot explain why → "Compute tan(x+π): sin(x+π)=−sin x; cos(x+π)=−cos x; ratio (−sin x)/(−cos x)=tan x. Both negatives cancel — that's why π suffices."
- INCORRECT: period=2π for tan → Repair with B02 (TAN-PERIOD-IS-2PI).
- NO_RESPONSE: "Recall tan(x)=sin(x)/cos(x). After moving π: sin(x+π)=−sin x and cos(x+π)=−cos x. So tan(x+π)=−sin x/−cos x=tan x. Period=π."

---

### TA-B02 — Repair for MC-2 (TAN-PERIOD-IS-2PI)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'period of tan is 2π.' The period of tan is π — half that of sin and cos."

**P41 — MISCONCEPTION DETECTOR**
"Compute tan(0) and tan(π). Are they equal?
(A) tan(0)=0; tan(π)=0. Yes — so the period might be π.
(B) They're equal, but I need to check more values; the period could still be 2π."
[If B: learner unsure. Prompt: "Compute tan(π/4) and tan(π/4+π). Are they equal?"]
"tan(π/4)=1; tan(π/4+π)=tan(5π/4)=sin(5π/4)/cos(5π/4)=(−√2/2)/(−√2/2)=1. Equal ✓."

**P64 — CONCEPTUAL SHIFT**
"Algebraic proof: tan(x+π) = sin(x+π)/cos(x+π). Using shift identities: sin(x+π)=−sin(x); cos(x+π)=−cos(x). So tan(x+π)=(−sin x)/(−cos x)=sin(x)/cos(x)=tan(x). QED. Period=π is the SMALLEST positive p such that tan(x+p)=tan(x) for all x. Testing p=π/2: tan(0+π/2)=tan(π/2) is undefined → p=π/2 fails. π is the smallest valid period."

→ Return to A02.

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: Key values of sin, cos, tan from unit-circle reference angles, extended to all four quadrants.

STEP 1 — Q1 base values (exact):
| x (rad) | x (deg) | sin x | cos x | tan x |
|---|---|---|---|---|
| 0 | 0° | 0 | 1 | 0 |
| π/6 | 30° | 1/2 | √3/2 | 1/√3=√3/3 |
| π/4 | 45° | √2/2 | √2/2 | 1 |
| π/3 | 60° | √3/2 | 1/2 | √3 |
| π/2 | 90° | 1 | 0 | undefined |

PATTERN RULE: As x increases from 0 to π/2, sin increases 0→1, cos decreases 1→0, tan increases 0→∞. Symmetry: sin(π/6)=cos(π/3) and sin(π/4)=cos(π/4) — the complementary pair relation sin(π/2−x)=cos(x).

STEP 2 — Extension to all quadrants via reference angle + quadrant sign:
Reference angle r = acute angle to nearest x-axis. Signs from ASTC (All/Sin/Tan/Cos positive in Q1/Q2/Q3/Q4).

Examples:
- sin(2π/3): r=π/3, Q2 (sin+). sin(2π/3)=+√3/2.
- cos(5π/4): r=π/4, Q3 (cos−). cos(5π/4)=−√2/2.
- tan(7π/6): r=π/6, Q3 (tan+). tan(7π/6)=+1/√3=√3/3.

STEP 3 — Negative angles (clockwise rotation):
sin(−x) = −sin(x) (odd function); cos(−x) = cos(x) (even function); tan(−x) = −tan(x) (odd).
Example: sin(−π/3) = −sin(π/3) = −√3/2. cos(−π/4) = cos(π/4) = √2/2.

STEP 4 — Angles greater than 2π (multiple revolutions):
Reduce mod 2π (for sin/cos) or mod π (for tan).
Example: sin(7π/3) = sin(7π/3 − 2π) = sin(π/3) = √3/2.
cos(−5π/6) = cos(−5π/6 + 2π) = cos(7π/6) = −√3/2. Or: cos(−5π/6)=cos(5π/6)=−√3/2 directly via even symmetry.

**Assessment primitive: P49**

PROBE: "Find the exact value of tan(−5π/6)."
- CORRECT: "tan is odd: tan(−5π/6)=−tan(5π/6). Reference angle of 5π/6 is π/6, Q2 (tan−): tan(5π/6)=−1/√3. So tan(−5π/6)=−(−1/√3)=1/√3=√3/3." OR: "−5π/6 is in Q3 (between −π and −π/2). Reference=π/6. Q3: tan+. tan(−5π/6)=+1/√3=√3/3." → proceed to A04.
- PARTIAL: correct reference angle, sign error → "Q3 or using the odd-function rule: tan positive in Q3 AND the negative of a Q2 value which was negative. Double check: two negatives give positive."
- INCORRECT: says undefined → "−5π/6 is not of the form π/2+nπ; tan is defined there. Only undefined at ±π/2, ±3π/2, …"
- NO_RESPONSE: "Method 1 (odd function): tan(−5π/6)=−tan(5π/6). Find tan(5π/6): reference angle π/6, Q2, sin+/cos− → tan<0. tan(5π/6)=−tan(π/6)=−1/√3. So tan(−5π/6)=−(−1/√3)=1/√3=√3/3."

---

### TA-B03 — Repair for MC-3 (DOMAIN-RESTRICTED-TO-FIRST-QUADRANT)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'sin, cos, tan are only defined for angles between 0° and 90°.' The unit-circle definition extends these functions to all real numbers."

**P41 — MISCONCEPTION DETECTOR**
"Can you compute sin(120°)?
(A) No — 120° is greater than 90°, so sin is undefined there.
(B) Yes — using the unit circle, the point at 120° is (−1/2, √3/2), so sin(120°)=√3/2."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"The right-triangle definition requires 0°<θ<90° because the triangle must have positive side lengths. The unit-circle definition replaces this: for any angle θ (positive, negative, beyond 360°), place the angle on the unit circle, read off the coordinates. The coordinate x=cos(θ) and y=sin(θ) are well-defined for any real θ — the circle has no gaps. For θ=120°: the unit-circle point is in Q2; reference angle=60°; sin(120°)=+sin(60°)=+√3/2. The function exists at 120°; right triangles simply cannot represent it."

→ Return to A01 or A03 as appropriate.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (PERIOD-IS-360-IN-RADIANS)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (TAN-PERIOD-IS-2PI)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (DOMAIN-RESTRICTED-TO-FIRST-QUADRANT)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A01 or A03.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Find all x in [0, 2π) such that sin(x) = −√3/2. Give exact answers."
[Expected: sin<0 in Q3 and Q4. Reference angle for √3/2 is π/3. Q3: x=π+π/3=4π/3. Q4: x=2π−π/3=5π/3. Answers: x=4π/3 and x=5π/3.]

**Day 10 prompt:**
"A function f(x)=sin(x) satisfies f(x+T)=f(x) for all x. Prove that T=2π is the smallest such positive T."
[Expected: Need to show no positive T<2π works. f(π/2)=1; if f(π/2+T)=1 then sin(π/2+T)=1 → π/2+T=π/2+2nπ → T=2nπ. Smallest positive T is 2π (n=1). Alternatively: sin is strictly increasing on (−π/2,π/2) so can only repeat values with period ≥ 2π, and 2π achieves it.]

**Day 30 prompt:**
"For what values of x in [−π, π] is tan(x) > sin(x)? Express the answer as a union of intervals."
[Expected: tan x − sin x = sin x/cos x − sin x = sin x(1/cos x − 1) = sin x (1−cos x)/cos x. Since 1−cos x ≥ 0 for all x (equality only at x=0), the sign is determined by sin x / cos x = tan x: positive in Q1 (0,π/2) and Q3 (−π,−π/2). But tan>sin: in (0,π/2): sin>0, cos<1 → 1/cos>1 → tan=sin/cos>sin ✓. In (−π,−π/2): sin<0, cos<0 → tan>0>sin ✓. Combined: tan x > sin x on (0,π/2)∪(−π,−π/2), excluding endpoints where tan is undefined or equal.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.trig.unit-circle — (cos θ, sin θ) coordinates for all angles via reference-angle method; quadrant signs; key angle values at 0,π/6,π/4,π/3,π/2; the unit circle IS the definition being extended to all reals here

**Unlocked blueprints:**
- math.trig.trig-identities — Pythagorean identity sin²x+cos²x=1 and derived identities (tan²x+1=sec²x, etc.); angle-sum formulas; all assume the global definition of sin and cos proved here
- math.trig.inverse-trig — arcsin, arccos, arctan defined as restricted inverses of sin, cos, tan; domain restriction to make them functions requires knowing the full domain and range of the originals

**Cross-links:** math.func.periodic-function — NOT Tier 1; P76 uses independence mode.

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (PERIOD-IS-360-IN-RADIANS) must be resolved before any function evaluation or graphing in radians. The unit/period confusion propagates into all downstream work. The concrete check — compute sin(6.28)≈0 vs sin(360)≈−0.99 — immediately demonstrates the error numerically.

**Odd/Even identification as a tool:** The odd function (sin, tan) and even function (cos) properties reduce half of all evaluations to the other half: any negative angle evaluation follows from sin(−x)=−sin(x) and cos(−x)=cos(x). This should be stated as a computation rule, not a memorisation fact.

**Tangent period derivation:** Show the proof tan(x+π)=tan(x) explicitly; do not assert it. Learners who understand the sign cancellation (sin and cos both flip → ratio unchanged) never confuse the period again.

**Graph as unrolled circle:** The visual connection — tracing the y-coordinate of a rotating unit-circle point onto a horizontal axis — explains why the sine graph looks the way it does. This anchors both periodicity and the wave shape simultaneously.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P11, A02: P06, A03: P04
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_links not Tier 1; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=understand; no P07 (WORKED EXAMPLE PAIR not required); B-category primitives P11, P06, P04 ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (exact value + domain/period reasoning)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All domain/range/period values, exact trig evaluations, odd/even classifications, and the tan period proof are standard; no fabricated identities

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"What is the period of sin(x) when x is in radians?"
[Expected: 2π. sin(x+2π)=sin(x) for all real x.]

**Item 2:**
"What is the domain of tan(x)? State the values where it is undefined."
[Expected: Domain = ℝ∖{π/2+nπ : n∈ℤ}. Undefined at x=±π/2, ±3π/2, ±5π/2, … (where cos x=0).]

**Item 3:**
"Find the exact value of sin(5π/6)."
[Expected: 5π/6 is in Q2; reference angle=π/6. Q2: sin+. sin(5π/6)=+sin(π/6)=1/2.]

**Item 4:**
True or False: "The period of tan(x) is 2π."
[Expected: FALSE. Period of tan is π. Proof: tan(x+π)=sin(x+π)/cos(x+π)=(−sin x)/(−cos x)=tan x.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"For the function f(x) = cos(x):

(a) State the period and range.
(b) Find the exact value of cos(7π/6).
(c) Find the exact value of cos(−π/4).
(d) For which x in [0, 2π) does cos(x) = −1/2? Give exact answers."

[Expected:
(a) Period=2π; range=[−1,1].
(b) 7π/6: Q3, reference angle=π/6, cos−. cos(7π/6)=−cos(π/6)=−√3/2.
(c) cos is even: cos(−π/4)=cos(π/4)=√2/2.
(d) cos=−1/2 in Q2 and Q3. Reference angle for 1/2 is π/3. Q2: x=π−π/3=2π/3. Q3: x=π+π/3=4π/3. Answers: x=2π/3 and x=4π/3.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if all four parts are correct (correct period/range, correct (b), correct (c) using even property, correct (d) giving both solutions); 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner understands periodicity, domain/range, and exact-value computation for sin, cos, tan across all quadrants.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 (period=360): → TA-B01 (PERIOD-IS-360-IN-RADIANS repair), then re-gate
- FAIL on Item 4 (tan period=2π): → TA-B02 (TAN-PERIOD-IS-2PI repair), then re-gate
- FAIL on Item 3 or P76(b,c) (trig value at non-Q1 angle): → TA-B03 if learner claims undefined; else return to A03 to re-drill reference-angle method; re-gate
- FAIL on Item 2 (domain): → return to A02 contrast table; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated understanding of trigonometric functions as globally-defined periodic functions, their domains, ranges, periods, and exact values.

Key anchors to carry forward:
- sin(x) and cos(x): domain=ℝ, range=[−1,1], period=2π. Defined for all real x via unit circle.
- tan(x): domain=ℝ∖{π/2+nπ}, range=ℝ, period=π. Tan repeats after π because the sign cancels in sin/cos.
- Exact values: use reference angle (acute equivalent) + quadrant sign (ASTC rule).
- Symmetry: cos(−x)=cos(x) (even); sin(−x)=−sin(x), tan(−x)=−tan(x) (odd).

Next concepts: math.trig.trig-identities (Pythagorean family, angle-sum formulas), math.trig.inverse-trig (arcsin, arccos, arctan as restricted inverses)."

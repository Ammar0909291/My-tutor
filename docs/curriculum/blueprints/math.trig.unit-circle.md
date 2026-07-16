# Teaching Blueprint — math.trig.unit-circle

## Component 0 — Metadata
concept_id: math.trig.unit-circle
concept_name: Unit Circle
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: understand
estimated_hours: 8
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.trig.right-triangle-trig, math.geom.circle]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** The unit circle (radius 1, centred at the origin) extends the right-triangle definitions of sine and cosine to any angle. For a point (x, y) on the unit circle corresponding to angle θ (measured counter-clockwise from the positive x-axis), x = cos θ and y = sin θ. Because the hypotenuse is 1, the ratio definitions collapse to coordinate values. The identity sin²θ + cos²θ = 1 follows directly from the Pythagorean theorem (x²+y²=1). This framework defines trigonometric values for angles beyond 0°–90°.

**Conceptual progression:**
1. Unit circle definition: place a right triangle inside the circle, hypotenuse = 1. Then cos θ = adj/hyp = adj/1 = x; sin θ = opp/hyp = opp/1 = y.
2. Coordinate pairs: every angle θ maps to a unique point (cos θ, sin θ) on the unit circle.
3. Quadrant sign analysis: the signs of x (= cos θ) and y (= sin θ) in each quadrant.
4. Key angle values: 0°, 30°, 45°, 60°, 90°, 180°, 270°, 360° — corresponding coordinates derived from special-triangle ratios.
5. Reference angle: the acute angle between the terminal side and the x-axis; determines the magnitude; quadrant determines the sign.

**CPA arc (entry: P):**
- Pictorial: right-triangle diagram embedded in unit circle; coordinate grid showing labelled key-angle points; quadrant sign diagram.
- Abstract: sin θ = y, cos θ = x; sin²θ + cos²θ = 1; reference angle rule.

**Prior knowledge activated:** right-triangle trigonometry (math.trig.right-triangle-trig) — ratios sin/cos/tan; special angles 30-60-90 and 45-45-90; circle geometry (math.geom.circle) — radius, unit concept, equation x²+y²=r².

---

## Component 2 — Misconception Registry

### MC-1: UNIT-CIRCLE-CONTRADICTS-RIGHT-TRIANGLE [FOUNDATIONAL]
**Description:** Learner believes the unit circle introduces entirely new, separate definitions of sin and cos that conflict with right-triangle definitions — thinks they are two different things that happen to share notation.
**Surface form:** "But in the right triangle sin θ = opposite/hypotenuse. On the unit circle sin θ = y. These are different formulas — which one is right?"
**Root cause:** The connection that the unit circle embeds the right triangle (with hypotenuse = 1) is never made explicit. The learner sees two formulas in different contexts and treats them as parallel competing systems.
**Trigger condition:** Any problem that asks the learner to move between right-triangle and unit-circle representations.
**Repair target:** TA-B01.

### MC-2: X-IS-SIN-Y-IS-COS
**Description:** Learner swaps the coordinate assignment: believes x = sin θ and y = cos θ (or uses them interchangeably without a fixed rule).
**Surface form:** "cos 90° = 1 because at 90° the x-value is 0 and y-value is 1, and cos is the y-coordinate."
**Root cause:** No memory anchor distinguishing x from cos or y from sin. The notation (x, y) on the grid does not visually cue which trig function is which.
**Trigger condition:** Any coordinate read-off from the unit circle or application of a special angle.
**Repair target:** TA-B02.

### MC-3: ANGLE-INCREASES-CLOCKWISE
**Description:** Learner measures angles clockwise from the positive x-axis, placing 90° in Q4 and 270° in Q2 — the opposite of the standard counter-clockwise convention.
**Surface form:** "At 90° we go right and down, so the point is (something positive, something negative)."
**Root cause:** Clockwise rotation is more common in everyday contexts (clocks, compass bearings). The mathematical convention of counter-clockwise positive angle is not reinforced during right-triangle work and feels arbitrary.
**Trigger condition:** Any problem that requires placing an angle on the unit circle or reading coordinates from a specified angle.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "In a right triangle with hypotenuse 1 and angle θ at the origin, what are the lengths of the opposite and adjacent sides?" If the learner states opposite = sin θ and adjacent = cos θ correctly, proceed to A01. This confirms they can apply right-triangle trig and are ready for the unit circle as an extension.

**Scaffolding ladder:**
- Rung 1 (pictorial): draw a unit circle; draw a right triangle with one vertex at origin, hypotenuse reaching to the circle, angle θ at origin. Label the sides opp = y, adj = x, hyp = 1. Show sin θ = y/1 = y, cos θ = x/1 = x.
- Rung 2 (structured): give a partially completed table of key angles; learner fills in coordinates using the right-triangle result for each special angle.
- Rung 3 (full understand): learner identifies angle position, reads coordinates, determines signs from quadrant, and verifies sin²θ + cos²θ = 1.

**Pacing note:** h=8 estimated hours; A01 in session 1; A02 in sessions 2–3; A03 + mastery gate in sessions 3–4.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

REPRESENTATION 1 — Right-triangle picture (familiar):
Right triangle, hyp = 5, opp = 3, adj = 4, angle θ at origin.
sin θ = opp/hyp = 3/5; cos θ = adj/hyp = 4/5.

REPRESENTATION 2 — Unit-circle diagram (new):
Scale the same triangle so that hyp = 1 (divide all sides by 5).
opp = 3/5, adj = 4/5, hyp = 1.
The tip of the hypotenuse now lies ON the unit circle at coordinate (4/5, 3/5).
sin θ = opp/hyp = (3/5)/1 = y. cos θ = adj/hyp = (4/5)/1 = x.

REPRESENTATION 3 — Algebraic rule (abstract):
For angle θ, the corresponding unit-circle point is (cos θ, sin θ).
Pythagorean theorem on the unit circle: x²+y²=1 → cos²θ+sin²θ=1.

LINKING STATEMENT: "The unit circle does not replace the right-triangle definition. It is the right-triangle definition applied to a triangle whose hypotenuse is exactly 1. The ratio collapses to the coordinate value — sin θ is the y-coordinate because opp/1 = opp. The two definitions are the same definition viewed at different scales."

**Assessment primitive: P49**

PROBE: "A point on the unit circle has x-coordinate 3/5. What is the y-coordinate (in Q1)? What is sin θ for this angle?"
- CORRECT: "x = cos θ = 3/5; x²+y²=1 → (3/5)²+y²=1 → y²=1−9/25=16/25 → y=4/5 (Q1, positive). sin θ = y = 4/5." → proceed to A02.
- PARTIAL: correct x² computation, wrong sign or square root error → "In Q1 both x and y are positive, so y=+4/5 not −4/5. y² = 16/25 → y = √(16/25) = 4/5."
- INCORRECT: answers sin θ = 3/5 (confuses x with sin) → Repair with B02 (X-IS-SIN-Y-IS-COS).
- NO_RESPONSE: "The unit circle has equation x²+y²=1. If x=3/5, substitute: (9/25)+y²=1; y²=16/25; y=4/5 in Q1. The sin θ = y-coordinate = 4/5."

---

### TA-B01 — Repair for MC-1 (UNIT-CIRCLE-CONTRADICTS-RIGHT-TRIANGLE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'unit circle sin/cos definitions are different from right-triangle sin/cos definitions.' This is false. The unit circle IS the right-triangle definition applied when hypotenuse = 1."

**P41 — MISCONCEPTION DETECTOR**
"In a right triangle with hyp = 1 and angle θ at the origin: which side equals sin θ?
(A) The opposite side (= y-coordinate of the tip).
(B) It's a completely different formula on the unit circle."
[If B: learner holds MC-1.]
"Compute sin 30° using a right triangle with hyp = 1. What is the opposite side length?"

**P64 — CONCEPTUAL SHIFT**
"Place any right triangle with hyp = 1 into the standard orientation (angle θ at origin, adjacent along positive x-axis). The opposite side IS the y-coordinate of the hypotenuse's endpoint. The adjacent side IS the x-coordinate. So sin θ = opp/1 = y; cos θ = adj/1 = x. There is one definition; the unit circle makes it visible as a coordinate. The right-triangle formula and the coordinate formula give identical numerical values for every angle in 0°–90°."

→ Return to A01.

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Quadrant sign analysis:
The unit circle is divided into four quadrants by the axes. The signs of cos θ (x) and sin θ (y) depend on which quadrant the angle's terminal side falls in:

| Quadrant | Angle range | cos θ (x) | sin θ (y) |
|---|---|---|---|
| Q1 | 0°–90° | + | + |
| Q2 | 90°–180° | − | + |
| Q3 | 180°–270° | − | − |
| Q4 | 270°–360° | + | − |

Memory anchor: "All Students Take Calculus" — All (Q1), Sin (Q2), Tan (Q3), Cos (Q4) are positive.

PAIR B — Counter-clockwise vs clockwise convention:
Standard mathematical convention: angles increase COUNTER-CLOCKWISE from the positive x-axis.
- 0°: point (1, 0) — positive x-axis
- 90°: point (0, 1) — positive y-axis [counter-clockwise from 0°]
- 180°: point (−1, 0) — negative x-axis
- 270°: point (0, −1) — negative y-axis
- 360°: point (1, 0) — full revolution, back to start

Contrast with CLOCKWISE (incorrect for standard convention): 90° would reach (0, −1), which is actually 270° in standard convention. This is the source of MC-3.

**Assessment primitive: P49**

PROBE: "Give the sign of sin θ and cos θ for (a) θ = 120° and (b) θ = 300°."
- CORRECT: "(a) 120° is in Q2: sin 120° > 0, cos 120° < 0. (b) 300° is in Q4: sin 300° < 0, cos 300° > 0." → proceed to A03.
- PARTIAL: correct quadrant, wrong sign for one function → "In Q2, x is negative (left of y-axis) so cos < 0; y is positive (above x-axis) so sin > 0. In Q4: x is positive, y is negative."
- INCORRECT: reverses 90° direction, places 120° in Q4 → Repair with B03 (ANGLE-INCREASES-CLOCKWISE).
- NO_RESPONSE: "Start at 0° = (1,0) on the positive x-axis. Move counter-clockwise: 90° reaches (0,1); 120° is between 90° and 180° — that is Q2, where x<0 and y>0. For 300°: between 270° and 360° — that is Q4, where x>0 and y<0."

---

### TA-B02 — Repair for MC-2 (X-IS-SIN-Y-IS-COS)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'x = sin θ and y = cos θ.' The correct assignment is x = cos θ and y = sin θ."

**P41 — MISCONCEPTION DETECTOR**
"At θ = 0°, the point on the unit circle is (1, 0). What is cos 0°?
(A) 0 — because x = sin θ and at θ = 0°, sin 0° = 0.
(B) 1 — because x = cos θ and cos 0° = 1."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"Memory anchor: cosine → adjacent → x-axis → horizontal. The letter c links cosine to the x-coordinate: both relate to the horizontal direction. Sine → opposite → vertical. At θ=0°: the terminal side is along the positive x-axis, so the adjacent side has full length 1 and opposite is 0. Therefore cos 0° = 1 and sin 0° = 0 → the point is (cos 0°, sin 0°) = (1, 0). Consistent: x = cos θ gives x = 1 ✓; y = sin θ gives y = 0 ✓. If it were reversed, (sin 0°, cos 0°) = (0, 1), which is the point at θ = 90°, not 0° — contradiction."

→ Return to A01 or A02 as appropriate.

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: Key angle values via special triangles + quadrant signs.

STEP 1 — Q1 base values (from special triangles, hyp = 1):

| θ | cos θ (x) | sin θ (y) |
|---|---|---|
| 0° | 1 | 0 |
| 30° | √3/2 | 1/2 |
| 45° | √2/2 | √2/2 |
| 60° | 1/2 | √3/2 |
| 90° | 0 | 1 |

PATTERN RULE: As θ increases from 0° to 90°, cos θ decreases from 1 to 0 and sin θ increases from 0 to 1. The values at 30° and 60° are symmetric reflections: cos 30° = sin 60° and sin 30° = cos 60°. At 45° they are equal.

STEP 2 — Extension to Q2, Q3, Q4 via reference angles:
Reference angle = acute angle between terminal side and x-axis.
- 150°: reference 30°, Q2 (cos−, sin+) → (−√3/2, 1/2)
- 135°: reference 45°, Q2 → (−√2/2, √2/2)
- 120°: reference 60°, Q2 → (−1/2, √3/2)
- 210°: reference 30°, Q3 → (−√3/2, −1/2)
- 225°: reference 45°, Q3 → (−√2/2, −√2/2)
- 240°: reference 60°, Q3 → (−1/2, −√3/2)
- 330°: reference 30°, Q4 → (√3/2, −1/2)
- 315°: reference 45°, Q4 → (√2/2, −√2/2)
- 300°: reference 60°, Q4 → (1/2, −√3/2)

STEP 3 — Axis values (boundary angles):
- 180°: (−1, 0) — sin 180° = 0, cos 180° = −1
- 270°: (0, −1) — sin 270° = −1, cos 270° = 0
- 360°: (1, 0) — same as 0°

GENERALISED RULE: To find (cos θ, sin θ) for any angle: (1) find the reference angle (acute); (2) read its Q1 values from the table; (3) apply the sign of the target quadrant.

**Assessment primitive: P49**

PROBE: "Find cos 210° and sin 210°."
- CORRECT: "210° is in Q3 (between 180° and 270°). Reference angle = 210°−180° = 30°. Q1 values: cos 30° = √3/2, sin 30° = 1/2. Q3 signs: both negative. So cos 210° = −√3/2, sin 210° = −1/2." → proceed to A04.
- PARTIAL: correct reference angle, wrong quadrant signs → "Q3 is below and to the left of the origin — both x and y are negative there. Apply − to both."
- INCORRECT: uses 180° as reference (says reference = 210°−90° = 120°, non-acute) → "The reference angle is the ACUTE angle between the terminal side and the nearest x-axis. For 210°: the terminal side is 30° past 180°, so the reference is 210°−180° = 30°, not 120°."
- NO_RESPONSE: "Step 1: 210° lies between 180° (negative x-axis) and 270° (negative y-axis) → Q3. Step 2: how far past 180°? 210°−180°=30° → reference angle = 30°. Step 3: cos 30°=√3/2, sin 30°=1/2 in Q1; Q3 makes both negative → (−√3/2, −1/2)."

---

### TA-B03 — Repair for MC-3 (ANGLE-INCREASES-CLOCKWISE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'angles on the unit circle increase clockwise.' The mathematical standard is counter-clockwise. Clockwise produces negative angles in standard notation."

**P41 — MISCONCEPTION DETECTOR**
"On the unit circle, starting at (1, 0) and moving COUNTER-CLOCKWISE by 90°, which point do you reach?
(A) (0, −1) — moving downward (clockwise).
(B) (0, 1) — moving upward (counter-clockwise)."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"The counter-clockwise convention is chosen so that angles measure positive rotation in the standard mathematical plane (x right, y up). At 90° counter-clockwise from (1,0), we arrive at (0,1) — the top of the circle — where y=1 is maximum. This matches sin 90°=1, the maximum of sine. If we moved clockwise, we'd arrive at (0,−1), giving sin 90°=−1 — which contradicts every right-triangle calculation at 90°. So counter-clockwise is NOT arbitrary; it is forced by consistency with right-triangle trigonometry in the standard orientation."

→ Return to A02 or A03 as appropriate.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (UNIT-CIRCLE-CONTRADICTS-RIGHT-TRIANGLE)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (X-IS-SIN-Y-IS-COS)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A01 or A02.

### TA-B03 — Repair for MC-3 (ANGLE-INCREASES-CLOCKWISE)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02 or A03.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Without a calculator, state the coordinates of the unit-circle point at θ = 225°. Then verify sin²225° + cos²225° = 1."
[Expected: reference 45°, Q3. (−√2/2, −√2/2). Verify: (−√2/2)²+(−√2/2)²=1/2+1/2=1 ✓.]

**Day 10 prompt:**
"For which angles θ in [0°, 360°) does sin θ = cos θ? Explain using the unit circle."
[Expected: sin θ = cos θ when y = x, i.e., the line y=x intersects the unit circle. That occurs at θ = 45° (point (√2/2, √2/2)) and θ = 225° (point (−√2/2, −√2/2)). In both cases the x and y coordinates are equal.]

**Day 30 prompt:**
"If cos θ = −1/2 and θ is in Q3, find sin θ and tan θ exactly."
[Expected: cos²θ+sin²θ=1 → 1/4+sin²θ=1 → sin²θ=3/4 → sin θ=−√3/2 (negative in Q3). tan θ = sin θ/cos θ = (−√3/2)/(−1/2) = √3. Confirm: θ = 240°, reference 60° ✓.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.trig.right-triangle-trig — sin/cos/tan ratios, special triangles (30-60-90, 45-45-90), hypotenuse as the scaling denominator; the unit circle reuses these values with hyp=1
- math.geom.circle — circle equation x²+y²=r²; the unit circle is r=1; understanding radius as constant distance from origin

**Unlocked blueprints:**
- math.trig.trig-functions — sin and cos as periodic functions of a continuous angle variable; graphs of sin θ and cos θ built directly from unit-circle coordinates
- math.trig.trig-identities — Pythagorean identity sin²θ+cos²θ=1 and its rearrangements; quotient identity tan θ=sin θ/cos θ; all derived from unit-circle geometry

**Cross-links:** none (cross_links=[]).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (UNIT-CIRCLE-CONTRADICTS-RIGHT-TRIANGLE) is the most damaging: learners who see the unit circle as a separate, contradictory system cannot transfer their right-triangle knowledge and must memorise the key-angle table from scratch. Address it immediately by showing the unit circle as the right triangle with hypotenuse scaled to 1. Once this bridge is established, all key-angle values follow from special-triangle ratios that the learner already knows.

**Coordinate memory strategy:** The mnemonic "cosine is horizontal, sine is vertical" works in the right-triangle picture (adj horizontal, opp vertical) and carries over to the unit circle (x horizontal, y vertical). Reinforce this every time the coordinate pair (cos θ, sin θ) is written.

**Reference angle technique:** Teach reference angles as the core computation strategy — not memorising 16+ unit-circle points, but knowing 5 Q1 values and applying quadrant signs. This reduces the cognitive load to a 2-step algorithm and makes the entire circle accessible from a small anchor set.

**Verification habit:** Always check: does the computed point satisfy x²+y²=1? This catches sign errors and swap errors immediately.

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
- [x] V-10: P76 mode = independence; cross_links=[]; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=understand; no P07 (WORKED EXAMPLE PAIR not required); B-category primitives are P11, P06, P04 ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (θ=315° reference-angle computation with Pythagorean verification)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All unit-circle values (key angles, quadrant signs, reference angle method, Pythagorean identity) consistent with standard trigonometry; no fabricated identities

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"What are the coordinates of the unit-circle point at θ = 90°?"
[Expected: (cos 90°, sin 90°) = (0, 1). At 90° the terminal side points straight up; x = 0, y = 1.]

**Item 2:**
True or False: "On the unit circle, the x-coordinate of the point at angle θ equals sin θ."
[Expected: FALSE. The x-coordinate equals cos θ; the y-coordinate equals sin θ.]

**Item 3:**
"Find sin(180°) and cos(180°)."
[Expected: At 180°, the point is (−1, 0). So cos 180° = −1 and sin 180° = 0.]

**Item 4:**
"Find cos(270°)."
[Expected: At 270°, the point is (0, −1). So cos 270° = 0.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Find the exact coordinates of the unit-circle point at θ = 315°.

(a) Identify the quadrant and the reference angle.
(b) State the Q1 base values for the reference angle.
(c) Apply quadrant signs to find (cos 315°, sin 315°).
(d) Verify: confirm that the point satisfies x²+y²=1."

[Expected:
(a) 315° is between 270° and 360° → Q4. Reference angle = 360°−315° = 45°.
(b) Q1 values for 45°: cos 45° = √2/2, sin 45° = √2/2.
(c) Q4: cos positive, sin negative. So cos 315° = √2/2, sin 315° = −√2/2. Point: (√2/2, −√2/2).
(d) (√2/2)²+(−√2/2)²=1/2+1/2=1 ✓.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (c) gives (√2/2, −√2/2) correctly and (d) confirms x²+y²=1, 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner can identify unit-circle coordinates using the reference-angle method with correct quadrant signs, and verifies using the Pythagorean identity.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 2 (claims x = sin θ): → TA-B02 (X-IS-SIN-Y-IS-COS repair), then re-gate
- FAIL on Item 1 or Item 3 or Item 4 (axis-angle error, wrong sign for 180°/270°): → TA-B03 (ANGLE-INCREASES-CLOCKWISE repair) if signs are reversed; else return to A03 to reinforce axis-angle values
- FAIL on P76 (wrong reference angle or wrong quadrant signs): → return to A03; re-drill reference-angle method; re-gate
- FAIL on multiple items: → B01 if learner treats unit circle as separate system; else B02 + B03 as needed; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated ability to locate points on the unit circle using the reference-angle method, assign correct signs by quadrant, and verify using the Pythagorean identity.

Key anchors to carry forward:
- Unit circle definition: for angle θ, the point on the unit circle is (cos θ, sin θ). x = cos θ (horizontal), y = sin θ (vertical).
- Pythagorean identity: sin²θ + cos²θ = 1 — follows directly from x²+y²=1 with radius 1.
- Reference angle method: find the acute angle to the nearest x-axis; read Q1 value; apply quadrant sign.
- Counter-clockwise is the positive direction; 90° → top (0,1); 180° → left (−1,0); 270° → bottom (0,−1).

Next concepts: math.trig.trig-functions (periodic sine and cosine graphs built from the unit circle), math.trig.trig-identities (Pythagorean family and quotient identities)."

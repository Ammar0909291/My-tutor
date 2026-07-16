# Teaching Blueprint: Angle Measurement

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.geom.angle-measurement |
| KG_ID | math.geom.angle-measurement |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Geometry |
| NAME | Angle Measurement |
| ALIASES | (none) |
| DIFFICULTY | foundational |
| BLOOM | apply |
| MASTERY_THRESHOLD | 0.90 |
| ESTIMATED_HOURS | 3 |
| REQUIRES | math.geom.angle |
| UNLOCKS | math.trig.angle-measure |
| CROSS_LINKS | math.trig.angle-measure |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 5 (TA-A01 through TA-A05) |
| MASTERY_GATE_TA | TA-A05 (P91, terminal) |
| PASS_CRITERION | 6/6 (⌈0.90 × 6⌉ = 6; threshold = 0.90) |
| MAMR | MC-1 PROTRACTOR-WRONG-SCALE is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Cross-link (cross_links = [math.trig.angle-measure]; P76 applies protractor reading and conversion in a compass/navigation context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.geom.angle**: An angle is the rotation between two rays from a common vertex; it can be measured in degrees or radians. Angle measurement operationalizes this: using a protractor to read degrees and applying conversion formulas to switch between degrees and radians.

### Target Understanding
1. A standard protractor measures angles from 0° to 180°. The vertex of the angle is placed at the center hole; one ray aligns along the 0° baseline; the measure is read where the second ray crosses the arc.
2. Two scales on a protractor (inner and outer, both 0–180°) run in opposite directions. The correct scale to read matches the direction the angle opens: angle opening to the right → use the right-to-left scale; opening to the left → use the left-to-right scale.
3. Degree-to-radian: θ_rad = θ_deg × π/180. Radian-to-degree: θ_deg = θ_rad × 180/π.
4. Key benchmarks: 30°=π/6, 45°=π/4, 60°=π/3, 90°=π/2, 120°=2π/3, 135°=3π/4, 150°=5π/6, 180°=π.
5. Reflex angle measurement (>180°): measure the non-reflex portion with the protractor, then reflex angle = 360° − measured angle.
6. 1 radian ≈ 57.3°; π ≈ 3.14159; a full rotation = 360° = 2π rad.

### Cross-Link Activation
- **math.trig.angle-measure**: Protractor-based measurement and degree-radian conversion are the entry point for all trigonometric angle work. P76 applies these skills in a compass-bearing context as a preview of math.trig.angle-measure.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — PROTRACTOR-WRONG-SCALE
- **Trigger**: Reading the wrong scale on the protractor, giving a supplementary reading (θ instead of 180°−θ or vice versa).
- **Root cause**: The protractor has two overlapping number scales running in opposite directions. Without a rule for which to read, learners pick arbitrarily or always read the same scale.
- **Error pattern**: The angle opens to the right from the 0° baseline; learner reads the left-opening scale and gets 130° when the correct measure is 50°; or vice versa.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — CONVERSION-FORMULA-MISSING-PI
- **Trigger**: Converting degrees to radians as θ_rad = θ_deg / 180 (forgetting the π factor).
- **Root cause**: Learner remembers "divide by 180" but drops the π; gets a dimensionless ratio rather than radians.
- **Error pattern**: Converts 90° as "90/180 = 0.5 rad" instead of "90 × π/180 = π/2 rad ≈ 1.571 rad."
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — REFLEX-ANGLE-UNMEASURABLE
- **Trigger**: "You can't measure a reflex angle — the protractor only goes to 180°."
- **Root cause**: Learner takes the protractor's 180° limit as an absolute barrier and doesn't see how to infer the reflex measure.
- **Error pattern**: Gives up when asked to measure an angle of 240°; doesn't use reflex = 360° − (non-reflex portion).
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a physical protractor and pencil-drawn angles (Concrete). Pictorial: labeled protractor diagram showing both scales, center hole, baseline, and measurement arc. Abstract: conversion formula θ_rad = θ_deg × π/180; benchmark table.

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). Route → TA-B01 if triggered later. MC-2 and MC-3 FIFO.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — The Protractor as a Rotation Meter
**Primitives**: P03 → P11 → P49

**P03 (ANALOGY BRIDGE):**
- **Source**: A speedometer in a car. The needle starts at 0 (the car is still), and as speed increases, the needle rotates clockwise to higher numbers. The speedometer measures HOW MUCH the needle has rotated from rest. If you could freeze the needle at some position, the reading tells you the rotation from 0.
- **Target**: A protractor. One ray is "at rest" on the 0° baseline. The second ray is the needle, rotated some amount. The protractor reads HOW MUCH rotation has occurred between the two rays. Aligning the vertex at the center hole places the "axle" exactly at the angle's vertex.

**P11 (REPRESENTATION SHIFT):**
Three representations of angle measurement:
| Representation | Form | Key feature |
|---|---|---|
| Physical | Protractor with two rays | Vertex at center hole; one ray on 0° baseline; read arc crossing of second ray |
| Symbolic | m∠ABC = 65° or m∠ABC = 13π/36 rad | Measurement result with units |
| Formula | θ_rad = θ_deg × π/180 | Exact conversion; both measure the same rotation |

**P49:** "To measure angle ∠ABC with a protractor, where does the vertex B go?"
- **CORRECT**: B goes at the center hole of the protractor (the small hole or dot at the midpoint of the straight edge). → TA-A02.
- **PARTIAL**: "The vertex is the rotation center — it goes at the center hole, which is the protractor's own 'axle'." → TA-A02.
- **INCORRECT/NO_RESPONSE**: "Vertex B is the shared endpoint of the two rays. Place B at the center hole — the protractor revolves around B to measure the rotation." → TA-A02.

---

### TA-A02 — Misconception Gate: PROTRACTOR-WRONG-SCALE (FOUNDATIONAL)
**Primitives**: P41 → P64 → P07 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "A protractor shows two numbers where the second ray crosses the arc: 40 and 140. The angle opens to the RIGHT from the 0° end on the right. Which reading is correct?"
- If learner says "140": proceed to P64.
- If learner correctly says "40": validate and advance.

**P64 (CONCEPTUAL SHIFT):**
"The protractor's two scales run in OPPOSITE DIRECTIONS. One counts 0→180° from right to left; the other counts 0→180° from left to right. The RULE: start from the ray that lies along the 0° end. Read the scale that begins at 0° ON THAT SIDE.
- Angle opens to the RIGHT: the right side of the protractor is 0°. Use the scale that reads 0° on the RIGHT (usually the outer scale). Read where the second ray crosses: that's 40°, not 140°.
- 140° is 180° − 40° — the wrong scale always gives the supplement."

**P07 (WORKED EXAMPLE PAIR):**
Example 1 (angle opening right, correct reading):
- Ray 1 aligned on right-side 0° baseline. Second ray crosses arc at "40" (right scale) and "140" (left scale). Correct reading = 40°.
Example 2 (angle opening left, correct reading):
- Ray 1 aligned on left-side 0° baseline. Second ray crosses arc at "65" (left scale) and "115" (right scale). Correct reading = 65°.

**P49**: "Angle opens to the LEFT. Protractor shows 55 and 125 where the second ray crosses. What is the correct measure?"
- **CORRECT**: 55° — the angle opens to the left, so use the left-side 0° scale. 55 is the reading on that scale. → TA-A03.
- **PARTIAL**: "Opening to the left → read the scale starting at 0° on the left. Left-scale reading = 55°." → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Degree-Radian Benchmarks
**Primitives**: P04 → P49

**P04 (PATTERN INDUCTION):**
Observe the pattern in the benchmark conversion table:

| Degrees | Radians | Fraction of full circle |
|---|---|---|
| 30° | π/6 | 1/12 |
| 45° | π/4 | 1/8 |
| 60° | π/3 | 1/6 |
| 90° | π/2 | 1/4 |
| 120° | 2π/3 | 1/3 |
| 135° | 3π/4 | 3/8 |
| 150° | 5π/6 | 5/12 |
| 180° | π | 1/2 |
| 360° | 2π | 1 |

Pattern 1: Each degree value × π/180 = radian value. Pattern 2: Each radian value ÷ (2π) = fraction of full circle = same as degree ÷ 360. The radian values are just multiples of π with simple denominators for the "nice" angles.

**P49**: "Without a calculator: what is 60° in radians? What is π/4 rad in degrees?"
- **CORRECT**: 60° = π/3 rad; π/4 rad = 45°. → TA-A04.
- **PARTIAL**: "60° × π/180 = 60π/180 = π/3. For π/4: π/4 × 180/π = 180/4 = 45°." → TA-A04.
- **INCORRECT/NO_RESPONSE**: Point to the table row; re-probe 45° and π/6. → TA-A04.

---

### TA-A04 — Reflex Angles and Conversion Practice
**Primitives**: P07 → P49

**P07 (WORKED EXAMPLE PAIR):**
Example 1 (reflex angle):
- An angle ∠ABC looks like it "wraps around" to 250°. Standard protractor reads the non-reflex portion: 360° − 250° = 110°. Measure 110° with the protractor; reflex = 360° − 110° = 250°.

Example 2 (conversion of non-benchmark angle):
- Convert 150° to radians: 150 × π/180 = 150π/180 = 5π/6 rad.
- Convert 5π/4 rad to degrees: 5π/4 × 180/π = 5 × 45 = 225°.

**P49**: "A reflex angle has its non-reflex portion measuring 70°. What is the reflex angle in degrees? Convert the reflex angle to radians."
- **CORRECT**: Reflex = 360° − 70° = 290°. In radians: 290 × π/180 = 29π/18 rad. → TA-A05.
- **PARTIAL**: "Reflex = 360° − 70° = 290°. Convert: 290 × π/180 = 290π/180 = 29π/18." → TA-A05.
- **INCORRECT/NO_RESPONSE**: "Reflex + non-reflex = 360°. So reflex = 360° − 70° = 290°. Then multiply by π/180 to convert." → TA-A05.

---

### TA-A05 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: A protractor shows two scale readings where the second ray crosses: 75 and 105. The angle opens to the RIGHT from the 0° end on the right. What is the correct measure?
Q2: Convert 150° to radians (exact form).
Q3: Convert 2π/3 rad to degrees.
Q4: A reflex angle has its non-reflex portion measured at 45° with a protractor. What is the reflex angle in degrees and radians?
Q5: Which is larger: 1 radian or 45°?

**P55 (SCORE):**
Q1: 75° — the angle opens right, so use the right-side scale, which reads 75 (not 105 = 180°−75°, the wrong scale).
Q2: 150° × π/180 = 5π/6 rad.
Q3: 2π/3 × 180/π = 120°.
Q4: Reflex = 360° − 45° = 315°. In radians: 315 × π/180 = 7π/4 rad.
Q5: 1 radian ≈ 57.3° > 45°, so 1 radian is larger.

**P76 (TRANSFER PROBE — Cross-link: math.trig.angle-measure):**
A navigator uses a compass where North = 0°, angles increase clockwise. The ship's bearing is 120° (measured clockwise from North).
(a) Convert the 120° bearing to radians.
(b) A second ship travels at bearing 210°. What type of angle is 210°?
(c) The navigator measures a turn of 3π/4 rad to the right. How many degrees is this turn?

**Expected**: (a) 120° × π/180 = 2π/3 rad. (b) 210° is a reflex angle (180° < 210° < 360°). (c) 3π/4 × 180/π = 135°.

**P55 (SCORE):** 120° → 2π/3 correct; 210° classified as reflex; 3π/4 → 135° correct.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, Q5, P76 = **6 items**. Pass: **6/6** (⌈0.90×6⌉ = 6).
- PASS → P78.
- FAIL → P74.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong → TA-B01 (PROTRACTOR-WRONG-SCALE; apply MAMR).
- Q2, Q3, or P76(a,c) wrong → TA-B02 (CONVERSION-FORMULA-MISSING-PI).
- Q4 wrong → TA-B03 (REFLEX-ANGLE-UNMEASURABLE).
- Q5 wrong → re-teach benchmark table from TA-A03; re-gate.
- Multiple → MAMR: TA-B01 first; FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.trig.angle-measure.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 PROTRACTOR-WRONG-SCALE
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You read 130° — does that seem right for an angle that looks smaller than a right angle? What does the other scale read?"

**P06 (CONTRAST):**
| | Correct scale (angle opens right) | Wrong scale (supplement) |
|---|---|---|
| Opening direction | Angle opens right → 0° on RIGHT side | — |
| Scale to read | Right-side scale (reads 0° at right) | Left-side scale (reads 0° at left) |
| Reading | e.g., 50° | e.g., 130° (= 180° − 50°) |
| Check | Approximate the angle visually: <90° → expect acute reading | 130° > 90° contradicts the acute appearance |

**P64**: "RULE: Find which end of your baseline is at 0°. Read the scale that starts at 0° on THAT SAME SIDE. The other scale gives the supplementary angle (180° minus the correct reading). Always do a visual sanity check: if the angle looks acute, the reading should be < 90°."

**P49**: "Angle opens to the RIGHT. Protractor shows 35 and 145. What is the correct measure?"
- **CORRECT**: 35° — angle opens right, read the right-side scale (shows 35, not 145). → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Opening right → 0° is on the right → use the right-side scale → 35°. The 145° is 180°−35° from the wrong scale." → return.

---

### TA-B02 — Repair MC-2 CONVERSION-FORMULA-MISSING-PI
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 CONVERSION-FORMULA-MISSING-PI: 'θ_rad = θ_deg / 180.' Missing the π. The correct formula is θ_rad = θ_deg × π/180. The π is essential: it comes from the circumference of a unit circle (2π for a full turn = 360°). Without π, your 'radians' are just fractions — not actual angular measures. A right angle (90°): 90/180 = 0.5 (wrong) vs. 90 × π/180 = π/2 ≈ 1.571 rad (correct)."

**P06 (CONTRAST):**
| | Correct: θ_rad = θ_deg × π/180 | Wrong: θ_rad = θ_deg / 180 |
|---|---|---|
| 90° → | π/2 ≈ 1.571 rad | 0.5 (dimensionless, not radians) |
| 180° → | π ≈ 3.14159 rad | 1 (wrong) |
| Full circle → | 2π ≈ 6.283 rad | 2 (wrong) |

**P49**: "Convert 60° to radians using the correct formula."
- **CORRECT**: 60 × π/180 = π/3 rad. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Formula: θ_rad = θ_deg × π/180. So 60 × π/180 = 60π/180 = π/3 rad. Always keep the π." → return.

---

### TA-B03 — Repair MC-3 REFLEX-ANGLE-UNMEASURABLE
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 REFLEX-ANGLE-UNMEASURABLE: 'Can't measure reflex angles — protractor only goes to 180°.' Wrong. STRATEGY: measure the NON-REFLEX portion of the full 360° rotation, then subtract from 360°. Reflex angle = 360° − (non-reflex portion). The protractor handles the non-reflex part just fine."

**P06 (CONTRAST):**
| | Non-reflex angle | Reflex angle |
|---|---|---|
| Range | 0° – 180° | 180° – 360° |
| Measurable directly? | Yes — protractor reads 0°–180° directly | No — infer: 360° − (non-reflex portion) |
| Example | Direct measure = 80° | Reflex = 360° − 80° = 280° |

**P49**: "A reflex angle has its non-reflex portion measuring 110°. What is the reflex angle?"
- **CORRECT**: 360° − 110° = 250°. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Reflex + non-reflex = 360°. Reflex = 360° − 110° = 250°." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (protractor scale) + Q2 (convert 150°→rad) | 2/2 |
| Day 3 | Q3 (2π/3→degrees) + Q4 (reflex angle) | 2/2 |
| Day 7 | Mixed 3-item: read a described protractor, convert one angle each way, classify reflex or non-reflex | 3/3 |
| Day 21 | Q1, Q2, Q3, Q4, Q5 (5 items) | 5/5 |
| Day 60 | Full 6-item mastery gate | 6/6 |

**Decay**: Failure → reset to Day 1 + TA-B routing.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Angle | math.geom.angle | Definition of angle, degree/radian notation, and the concept that measure = rotation (prerequisite for using a protractor) |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Angle Measure (Trig) | math.trig.angle-measure | Trigonometric angle measure builds directly on protractor skills and radian conversion |

### Cross-Links
- **math.trig.angle-measure**: Protractor use and degree-radian conversion are the entry point for angle measure in trigonometry; P76 previews this through the compass-bearing scenario.

---

## Component 8 — Teaching Notes

1. **Bloom=apply**: This is the only "apply" blueprint encountered so far. The distinction from "understand": learners must correctly EXECUTE the protractor procedure (vertex placement, scale selection, reading) and correctly APPLY the conversion formula — not just explain them. TA-A02's P07 worked examples and TA-A04's P07 application examples directly target the apply level.
2. **Two-scale confusion**: Always emphasize the sanity-check rule: if the angle LOOKS acute (<90°), the reading must be <90°. This is a fast visual filter that catches the wrong-scale error.
3. **π in conversions**: The most common arithmetic error is dropping π. Remind learners that the conversion is a MULTIPLICATION by the fraction π/180 (or 180/π), not a simple division.
4. **Reflex angle measurement**: Physical protractors often have a 360° scale on the outside — if available, this directly reads reflex angles. The 360° − non-reflex approach is for standard 180° protractors.
5. **CPA concrete**: Use a real or printed protractor with rays drawn on paper. Physical manipulation (placing the protractor, aligning a ray) builds the apply skill better than diagrams alone.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.geom.angle-measurement |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (apply) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.90) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (3) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.geom.angle ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=3 ≥ 1h → max 7; used 5) | ✓ 5 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P04, A04:P07 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01, TA-A02, TA-A03, TA-A04 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A05 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1; P64 shifts arbitrary-scale→direction-rule |
| V-15 | GR-6: P91 terminal in TA-A05 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 cross-link probe (compass bearing, trig angle-measure) |
| V-17 | GR-8: cross_links documented | ✓ math.trig.angle-measure — stated in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links=[math.trig.angle-measure] → cross-link probe) | ✓ |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.

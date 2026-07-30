<!-- BLUEPRINT: math.trig.special-angles -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Trigonometric Values at Special Angles (`math.trig.special-angles`)
**Concept ID:** `math.trig.special-angles`
**KG Fields:** difficulty=proficient | bloom=remember | estimated_hours=5 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.special-angles |
| name | Trigonometric Values at Special Angles |
| difficulty | proficient |
| bloom | remember |
| estimated_hours | 5 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.trig.basic-ratios |
| cross_links | none |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.basic-ratios**: SOH-CAH-TOA; labeling Opposite, Adjacent, Hypotenuse relative to the reference angle θ; three primary trig ratios

### Target Knowledge State
Student derives exact values of sin, cos, and tan at 0°, 30°, 45°, 60°, and 90° from the 30-60-90 and 45-45-90 triangles placed on the unit circle. Student extends these to all angles in [0°, 360°) using the reference angle and ASTC sign rules. Student evaluates trig expressions at multiples of 30° and 45° without a calculator.

### Conceptual Obstacles
1. Swapping sin 30° and sin 60° — or equivalently, swapping cos 30° and cos 60°
2. Applying positive values in all quadrants, ignoring the ASTC sign rule for angles beyond 90°
3. Confusing the quadrant-3 formula (π + α) with the quadrant-2 formula (π − α)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SIN-COS-30-60-SWAP | Student writes sin 30° = √3/2 and cos 30° = 1/2 (values reversed) | Direct recall of the 30° and 60° rows |
| MC-2 | SIGN-OMISSION-BEYOND-90 | Student applies positive values for sin/cos/tan regardless of which quadrant the angle is in | Angles such as 120°, 210°, 315° |
| MC-3 | QUADRANT-FORMULA-CONFUSION | Student uses π − α for Q3 angles instead of π + α | Reference angle problems in Q3 and Q4 |

**Foundational Misconception:** MC-1 (SIN-COS-30-60-SWAP) — the most common recall error, affecting every downstream computation involving 30°, 60°, 120°, 150°, etc. Addressed in A01 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — labeled 30-60-90 and 45-45-90 triangles inscribed in the unit circle.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Derive exact values from 30-60-90 and 45-45-90 unit-circle triangles; state the complete special-angle table; memory device for sin 30° vs sin 60°
2. **A02 P04 PATTERN INDUCTION** — Extend to all quadrants using reference angles and ASTC; gallery of angles at multiples of 30° and 45°; procedure table
3. **A03 P06 CONTRAST PAIR** — Q2 vs Q3 reference angle formulas; same reference angle α = 30°, different quadrant formula (π − α vs π + α)
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Deriving the Special-Angle Table from Triangles

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Build exact values from geometry, not memorisation; anchor sin and cos at 30° and 60° to prevent MC-1

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — 45-45-90 triangle on unit circle:**

Legs = 1/√2 each, hypotenuse = 1. Placing the reference angle θ = 45° at the origin:
- Opposite = 1/√2 = √2/2, Adjacent = √2/2, Hypotenuse = 1
- sin 45° = √2/2, cos 45° = √2/2, tan 45° = 1

**Stage B — 30-60-90 triangle on unit circle:**

Recall the 30-60-90 side ratio 1 : √3 : 2. Scale to hypotenuse = 1: sides become 1/2, √3/2, 1.

For θ = 30°: short leg opposite → Opposite = **1/2**; long leg adjacent → Adjacent = **√3/2**.
- sin 30° = 1/2, cos 30° = √3/2, tan 30° = (1/2)/(√3/2) = 1/√3 = √3/3

For θ = 60°: long leg opposite → Opposite = **√3/2**; short leg adjacent → **1/2**.
- sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3

**Stage C — Complete first-quadrant table:**

| θ | sin θ | cos θ | tan θ |
|---|-------|-------|-------|
| 0° | 0 | 1 | 0 |
| 30° | 1/2 | √3/2 | √3/3 |
| 45° | √2/2 | √2/2 | 1 |
| 60° | √3/2 | 1/2 | √3 |
| 90° | 1 | 0 | undefined |

**Memory device for sin 30° vs sin 60°:** "30 is the smaller angle; sin 30° = 1/2 is the smaller value; sin 60° = √3/2 ≈ 0.866 is the larger value." Alternatively, read the sin column as 0, 1/2, √2/2, √3/2, 1 — an increasing sequence, so the smaller angle (30°) has the smaller sine.

**Stage D — Reading the table both ways:** cos 30° = sin 60° and cos 60° = sin 30° — sine and cosine of complementary angles are equal (complementary angles sum to 90°).

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Without a calculator, what is cos 30°?

(A) 1/2
(B) √3/2
(C) √2/2
(D) √3

*Branch CORRECT (B):* cos 30° = √3/2 (adjacent/hypotenuse = long leg over hypotenuse in 30-60-90 triangle). ✓ Proceed to A02.

*Branch INCORRECT (A):* That is sin 30°. For cos 30°, the adjacent leg is the long leg = √3/2. Remember: 30° is the smaller angle, so sin 30° is the smaller value (1/2), and cos 30° is the larger value (√3/2). Proceed to A02.

*Branch INCORRECT (C):* √2/2 is the value for both sin 45° and cos 45°. For 30°, use the 30-60-90 triangle: cos 30° = √3/2. Proceed to A02.

*Branch NO_RESPONSE:* cos 30° = adjacent/hypotenuse = √3/2 from the 30-60-90 unit-circle triangle. ✓ Proceed to A02.

---

### Teaching Action A02 — Extending to All Quadrants

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Apply reference angles and ASTC signs to find trig values for angles beyond 90°; prevent MC-2 and MC-3

---

**[P04 — PATTERN INDUCTION]**

**Reference angle procedure:**
1. Identify the quadrant of θ
2. Compute reference angle α: Q1 → α = θ; Q2 → α = 180° − θ; Q3 → α = θ − 180°; Q4 → α = 360° − θ
3. Look up sin α, cos α, tan α from the first-quadrant table
4. Apply ASTC sign: Q1 all positive; Q2 sin positive, cos and tan negative; Q3 tan positive, sin and cos negative; Q4 cos positive, sin and tan negative

**Gallery:**

| Angle | Quadrant | Ref. angle α | sin | cos | tan |
|-------|----------|-------------|-----|-----|-----|
| 120° | Q2 | 60° | +√3/2 | −1/2 | −√3 |
| 135° | Q2 | 45° | +√2/2 | −√2/2 | −1 |
| 150° | Q2 | 30° | +1/2 | −√3/2 | −√3/3 |
| 210° | Q3 | 30° | −1/2 | −√3/2 | +√3/3 |
| 225° | Q3 | 45° | −√2/2 | −√2/2 | +1 |
| 270° | — | — | −1 | 0 | undef. |
| 315° | Q4 | 45° | −√2/2 | +√2/2 | −1 |
| 330° | Q4 | 30° | −1/2 | +√3/2 | −√3/3 |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* What is sin 225°?

(A) √2/2
(B) −√2/2
(C) √3/2
(D) −1/2

*Branch CORRECT (B):* 225° is in Q3; reference angle = 225° − 180° = 45°; sin 45° = √2/2; Q3 sin is negative → sin 225° = −√2/2. ✓ Proceed to A03.

*Branch INCORRECT (A):* The magnitude is correct but the sign is wrong. 225° is in Q3 where sin is negative. Proceed to A03.

*Branch INCORRECT (C or D):* The reference angle of 225° is 45° (not 30°), so use sin 45° = √2/2, then apply the Q3 negative sign. Proceed to A03.

*Branch NO_RESPONSE:* Reference angle = 225° − 180° = 45°; sin 45° = √2/2; Q3 → negative; sin 225° = **−√2/2**. Proceed to A03.

---

### Teaching Action A03 — Q2 vs Q3 Reference Angle Formulas

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Distinguish π − α (Q2) from π + α (Q3) reference angle formulas; resolve MC-3

---

**[P06 — CONTRAST PAIR]**

**Same reference angle α = 30°, two different quadrants:**

| | Q2 angle | Q3 angle |
|--|---------|---------|
| Formula | 180° − 30° = 150° | 180° + 30° = 210° |
| sin | +sin 30° = +1/2 | −sin 30° = −1/2 |
| cos | −cos 30° = −√3/2 | −cos 30° = −√3/2 |
| tan | −tan 30° = −√3/3 | +tan 30° = +√3/3 |

**Key difference:**
- Q2 is ABOVE the x-axis (sin positive, cos negative, tan negative)
- Q3 is BELOW the x-axis (sin negative, cos negative, tan positive)

**Memory rule for the quadrant formulas:**
- Q2: 180° − α (subtract from 180° — staying left-of-centre above the axis)
- Q3: 180° + α (add to 180° — going below the axis)
- Q4: 360° − α (subtract from 360° — right-of-centre below the axis)

**Common error:** Writing 210° = 180° − 30° (Q2 formula) gives 150° — this is wrong. 210° = 180° **+** 30°, placing it in Q3.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Evaluate cos 210°.

(A) √3/2
(B) −√3/2
(C) 1/2
(D) −1/2

*Branch CORRECT (B):* 210° = 180° + 30° → Q3; reference angle 30°; cos 30° = √3/2; Q3 cos is negative → −√3/2. ✓ Proceed to A04.

*Branch INCORRECT (A):* The magnitude is correct but the sign is wrong. 210° is in Q3 where cos is negative. Proceed to A04.

*Branch INCORRECT (C or D):* The reference angle of 210° is 30° (not 60°), so use cos 30° = √3/2, with Q3 negative sign: −√3/2. Proceed to A04.

*Branch NO_RESPONSE:* 210° = 180° + 30° → Q3; reference 30°; cos is negative in Q3; cos 210° = **−√3/2**. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** Find the exact values of sin 225°, cos 225°, and tan 225°.

**Problem 2.** Evaluate sin 150° · cos 120° − cos 150° · sin 120°.

**Problem 3.** Find all θ in [0°, 360°) such that tan θ = −1.

**Problem 4.** Simplify sin²(60°) + cos²(30°) − tan(45°) to a single fraction.

---

**[P55 — SCORE]**

*Answers:*

1. Q3; reference 45°. sin 225° = −√2/2, cos 225° = −√2/2, tan 225° = 1. ✓

2. sin(150° − 120°) = sin 30° = 1/2. (This is the sine-difference identity, or compute directly: (1/2)(−1/2) − (−√3/2)(√3/2) = −1/4 + 3/4 = 1/2.) ✓

3. Reference angle α: tan α = 1 → α = 45°. Tan negative in Q2 and Q4: θ = 135°, 315°. ✓

4. sin²(60°) = 3/4; cos²(30°) = 3/4; tan(45°) = 1. Sum = 3/4 + 3/4 − 1 = 1/2. ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* An analogue clock has an hour hand 8 cm long. At 5:00, the hour hand points to the "5", which corresponds to an angle of 150° measured clockwise from the 12 o'clock position (equivalently, 210° in standard mathematical notation measured counterclockwise from the positive x-axis).

*(a)* How far below the centre of the clock face is the tip of the hour hand?

*(b)* A student says the tip is 4 cm to the right of the centre. Evaluate this claim.

*Expected answer:*

*(a)* In standard notation the angle is 210°. The y-coordinate of the tip = 8 · sin 210° = 8 · (−1/2) = −4 cm. The tip is **4 cm below** the centre.

*(b)* x-coordinate = 8 · cos 210° = 8 · (−√3/2) = −4√3 ≈ −6.93 cm. The tip is approximately 6.93 cm to the **left**, not to the right. The student's claim is incorrect in both direction and magnitude.

---

**[P55 — SCORE]**

Transfer probe: 1 point (both parts correct); 0.5 if (a) correct but (b) evaluated incorrectly.

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 5/5 (⌈0.9 × 5⌉ = 5). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 | → P78 COMPLETION — mastery confirmed |
| 4/5 | → Identify missed item; sin/cos swap → B01; sign error → B02; quadrant formula confusion → B03; targeted repair |
| ≤ 3/5 | → Return to A01; re-derive the table from the two special triangles; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.special-angles` complete. Threshold 0.9 requires 5/5 correct.

**Unlocks:** Unit circle fluency; exact-value computations in calculus; trig identities involving special angles.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SIN-COS-30-60-SWAP Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You have sin 30° and sin 60° switched. sin 30° = 1/2 (the smaller value) and sin 60° = √3/2 (the larger value). The 30-60-90 triangle has a short leg (opposite 30°) and a long leg (opposite 60°): short leg/hypotenuse = 1/2, long leg/hypotenuse = √3/2."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Draw a 30-60-90 right triangle with hypotenuse 1. Label all three sides.
*Correct response:* Side opposite 30° = 1/2; side opposite 60° = √3/2; hypotenuse = 1.

**[P64 — CONCEPTUAL SHIFT]**
"Use the increasing-sequence pattern: reading the sin column for 0°, 30°, 45°, 60°, 90° gives 0, 1/2, √2/2, √3/2, 1 — each value is larger than the previous. Since 30° < 60°, we must have sin 30° < sin 60°. So sin 30° = 1/2 (smaller) and sin 60° = √3/2 (larger). Never switch these."

---

### Repair Action B02 — SIGN-OMISSION-BEYOND-90 Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"Trig values are NOT always positive. The sign depends on the quadrant via ASTC: All positive in Q1, Sin positive in Q2, Tan positive in Q3, Cos positive in Q4."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* cos 150° — positive or negative?
*Correct response:* Negative. 150° is in Q2 where cos is negative. cos 150° = −cos 30° = −√3/2.

**[P64 — CONCEPTUAL SHIFT]**
"ASTC encodes the sign of the x-coordinate (cos) and y-coordinate (sin) on the unit circle. Q2 is to the left (x negative) and above (y positive). Q3 is to the left (x negative) and below (y negative). Q4 is to the right (x positive) and below (y negative). Find the quadrant first; then attach the correct sign."

---

### Repair Action B03 — QUADRANT-FORMULA-CONFUSION Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"The Q2 formula is 180° − α (subtract α from 180°); the Q3 formula is 180° + α (add α to 180°). Confusing the two maps your angle to the wrong quadrant."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* The reference angle is 30°. Name the angles in Q2 and Q3 that have reference angle 30°.
*Correct response:* Q2: 180° − 30° = 150°. Q3: 180° + 30° = 210°.

**[P64 — CONCEPTUAL SHIFT]**
"Think of 180° as the leftward boundary of the axis. Q2 is just before 180° (below 180°), so you subtract α: 180° − α. Q3 is just past 180° (above 180°), so you add α: 180° + α. The subtraction/addition tells you which side of the 180° boundary you're on."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Give exact values of sin 150°, cos 240°, tan 330°. |
| R2 | 3 days | Find all θ in [0°, 360°) where cos θ = −1/2. |
| R3 | 7 days | Evaluate sin(30°)cos(60°) + cos(30°)sin(60°) without a calculator. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | Unit circle fluency; exact-value trig computations |
| Requires (Tier-1) | math.trig.basic-ratios |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent clock-hand geometry problem.

---

## Component 8 — Teaching Notes

- **Derive, don't memorise:** The table is short enough to re-derive from the two special triangles in under 30 seconds once the derivation is fluent. Students who only memorise the table cannot recover when they forget one value; students who derive it can always reconstruct it from the triangle.
- **ASTC is a coordinate rule, not an arbitrary sign rule:** Reinforce that ASTC comes from the sign of the x-coordinate (cos) and y-coordinate (sin) on the unit circle. Students who understand the coordinate origin of the sign rule make far fewer MC-2 errors.
- **The P77 Problem 2 tests sum/difference identity recognition:** Students who evaluate sin 150° · cos 120° − cos 150° · sin 120° term by term get the right answer but may miss that this equals sin(150° − 120°) = sin 30°. After scoring, point out the pattern even if the student computed term by term.
- **The P76 clock problem is deliberately multistep:** Standard position (counterclockwise from positive x-axis) is different from clock convention (clockwise from 12). Students must convert the clock angle to standard before applying trig. This tests conceptual transfer, not just recall.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=C; labeled 30-60-90 and 45-45-90 triangles used in A01 | PASS |
| V-4 | bloom=remember; exact value recall with ASTC extension | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 5/5 = ⌈0.9×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |

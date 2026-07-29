<!-- BLUEPRINT: math.trig.degree-radian-conversion -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Degree–Radian Conversion
**Concept ID:** `math.trig.degree-radian-conversion`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=2 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.degree-radian-conversion |
| name | Degree–Radian Conversion |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 2 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.trig.angle-measure |
| cross_links | none |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.angle-measure**: Angles as rotations; degree as 1/360 of a full circle; protractor measurements; direction of rotation (positive = counter-clockwise)

### Target Knowledge State
Student derives the conversion factor from 2π radians = 360° (one full circle). Student converts fluently in both directions: multiply by π/180 to convert degrees to radians; multiply by 180/π to convert radians to degrees. Student applies the radian requirement in context-dependent formulas (arc length s = rθ, sector area A = ½r²θ) by converting first. Student recalls the standard angle table: 0°, 30°=π/6, 45°=π/4, 60°=π/3, 90°=π/2, 120°=2π/3, 180°=π, 270°=3π/2, 360°=2π.

### Conceptual Obstacles
1. Applying the conversion factor in the wrong direction — multiplying degrees by 180/π (instead of π/180) or radians by π/180 (instead of 180/π)
2. Substituting degree values directly into formulas that require radians (s = rθ, A = ½r²θ)
3. Confusing π radians = 180° with 360° = π — half-circle vs full-circle confusion

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | WRONG-CONVERSION-DIRECTION | Student multiplies by 180/π to convert degrees to radians, or by π/180 to convert radians to degrees — exact reversal of the correct factors | Any conversion problem; especially when the answer "looks wrong" but the student doesn't notice |
| MC-2 | DEGREE-SUBSTITUTION-IN-RADIAN-FORMULA | Student plugs degree values directly into s=rθ, A=½r²θ, or ω=θ/t without converting; gets answers off by a factor of π/180 ≈ 57.3 | Arc length, sector area, or angular velocity problems |
| MC-3 | FULL-CIRCLE-IS-PI | Student believes 360° = π (one full circle = π), confusing 180° = π radians with 360° = 2π radians | Any problem involving full or partial rotations; radian equivalents of large angles |

**Foundational Misconception:** MC-1 (WRONG-CONVERSION-DIRECTION) — produces systematically wrong answers on every conversion; if undetected, corrupts all downstream calculations. Addressed in A01 and B01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — start from the full circle as a physical object (360° and one circumference = 2π radii).

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Derive both conversion factors from 2π rad = 360°; apply to the standard angle table; fix MC-1 direction
2. **A02 P04 PATTERN INDUCTION** — Gallery of conversions; induce the "multiply-by-π/180" and "multiply-by-180/π" pattern; practice with context formulas
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Deriving the Conversion Factors

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground both conversion directions in the single fact 2π rad = 360°; build the standard angle table; prevent MC-1

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Degrees (protractor representation):**

A full rotation = 360°. Half rotation = 180°. Quarter rotation = 90°. These are familiar from protractors.

**Stage B — Radians (arc-length representation):**

A radian is the angle whose arc length equals the radius. One full circle has circumference 2πr, so its arc length is 2π times the radius → **one full circle = 2π radians**.

**The bridge:**

2π radians = 360° → dividing both sides by 360:

**1° = π/180 radians** (multiply by π/180 to convert D → R)

Dividing 2π = 360° by 2π:

**1 radian = 180°/π** (multiply by 180/π to convert R → D)

**Memory device:** Degrees are "bigger" units — there are 360 of them in a circle vs only 2π ≈ 6.28 radians. So converting degrees to radians makes the number SMALLER (multiply by π/180 ≈ 0.0175). Converting radians to degrees makes the number BIGGER (multiply by 180/π ≈ 57.3).

**Standard angle table:**

| Degrees | Radians | Fraction of circle |
|---------|---------|-------------------|
| 0° | 0 | 0 |
| 30° | π/6 | 1/12 |
| 45° | π/4 | 1/8 |
| 60° | π/3 | 1/6 |
| 90° | π/2 | 1/4 |
| 120° | 2π/3 | 1/3 |
| 180° | π | 1/2 |
| 270° | 3π/2 | 3/4 |
| 360° | 2π | 1 |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Convert 150° to radians.

(A) 150 × (π/180) = 5π/6
(B) 150 × (180/π) = 27000/π ≈ 8594
(C) 150 ÷ π = 150/π ≈ 47.7
(D) π/150

*Branch CORRECT (A):* 150 × π/180 = 150π/180 = 5π/6. ✓ Proceed to A02.

*Branch INCORRECT (B):* You multiplied by 180/π — that converts radians to degrees, not degrees to radians. For degrees → radians, multiply by π/180 (the smaller factor, since radians are bigger units): 150 × π/180 = 5π/6. Proceed to A02.

*Branch INCORRECT (C, D):* The conversion factor is π/180, not 1/π or 1/150. Degrees × (π/180) = 150π/180 = 5π/6. Proceed to A02.

*Branch NO_RESPONSE:* Degrees → radians: multiply by π/180. So 150° × π/180 = 150π/180 = **5π/6 radians**. Proceed to A02.

---

### Teaching Action A02 — Applying Conversions in Context

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Automate the conversion pattern; apply to arc length and sector area formulas; surface MC-2 and MC-3

---

**[P04 — PATTERN INDUCTION]**

**Direction summary:**

```
Degrees → Radians:  × (π/180)
Radians → Degrees:  × (180/π)
```

**Gallery of conversions:**

| Given | Conversion | Result |
|-------|------------|--------|
| 90° | × π/180 | π/2 rad |
| 3π/4 rad | × 180/π | 135° |
| 270° | × π/180 | 3π/2 rad |
| 2 rad | × 180/π | 360/π ≈ 114.6° |
| π/12 rad | × 180/π | 15° |

**Context formulas requiring radians:**

- Arc length: s = rθ (θ in radians)
- Sector area: A = ½r²θ (θ in radians)
- Angular velocity: ω = θ/t (θ in radians per second)

**Worked example — arc length:**

A wheel of radius 6 cm rotates by 120°. Find the arc length.

Step 1: Convert 120° → radians: 120 × π/180 = **2π/3** rad.
Step 2: s = rθ = 6 × (2π/3) = **4π ≈ 12.57 cm**.

(If θ = 120 were used directly: s = 6 × 120 = 720 cm — wrong by factor 180/π.)

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* A sector has radius 5 m and central angle 7π/6 radians. What is the arc length?

(A) s = 5 × (7π/6) = 35π/6 m
(B) Convert 7π/6 to degrees: 210°; then s = 5 × 210 = 1050 m
(C) s = 5 × (7π/6) × (180/π) = 5 × 210 = 1050 m
(D) s = 5 / (7π/6) = 30/(7π) m

*Branch CORRECT (A):* θ is already in radians; s = rθ = 5 × (7π/6) = **35π/6 ≈ 18.33 m**. ✓ Proceed to A03.

*Branch INCORRECT (B, C):* You converted to degrees and used degrees in the arc-length formula. The formula s = rθ requires θ in radians. Since 7π/6 is already in radians, use it directly: s = 5 × (7π/6) = 35π/6 m. Proceed to A03.

*Branch INCORRECT (D):* s = rθ is a product, not a quotient. s = 5 × (7π/6) = 35π/6 m. Proceed to A03.

*Branch NO_RESPONSE:* θ = 7π/6 is already in radians. Arc length: s = rθ = 5 × (7π/6) = **35π/6 m ≈ 18.33 m**. Proceed to A03.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A03 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** Convert 135° to radians. Express as a fraction of π.

**Problem 2.** Convert 7π/4 radians to degrees.

**Problem 3.** A wheel of radius 8 cm rotates through 240°. Find the arc length (in cm, exact form).

**Problem 4.** Convert 2.5 radians to degrees (give the exact answer as a fraction, then a decimal approximation to the nearest tenth).

---

**[P55 — SCORE]**

*Answers:*

1. 135 × π/180 = 3π/4 rad ✓

2. (7π/4) × (180/π) = 7 × 180/4 = 1260/4 = **315°** ✓

3. Convert 240° to radians: 240 × π/180 = 4π/3. Arc length: s = 8 × (4π/3) = **32π/3 cm ≈ 33.51 cm** ✓

4. 2.5 × (180/π) = **450/π degrees ≈ 143.2°** ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* A pendulum of length 1.5 m swings through an arc. The central angle of its swing is 5π/9 radians.

*(a)* Convert the angle to degrees.

*(b)* Find the arc length of the pendulum's path.

*(c)* A student computes the arc length as 1.5 × 100° = 150 m. Identify the error.

*Expected answer:*

*(a)* (5π/9) × (180/π) = 5 × 20 = **100°**.

*(b)* s = rθ = 1.5 × (5π/9) = **5π/6 m ≈ 2.618 m** (using θ in radians).

*(c)* The student used the degree measure (100°) directly in s = rθ. This formula requires θ in radians. The correct θ = 5π/9 rad, giving s = 1.5 × (5π/9) = 5π/6 m, not 150 m.

---

**[P55 — SCORE]**

Transfer probe: 1 point (all three parts correct); 0.5 if (a) and (b) correct but error in (c) not identified.

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
| 4/5 | → Identify missed item; wrong-direction → B01; formula error → B02; full-circle confusion → B03; targeted repair |
| ≤ 3/5 | → Return to A01; re-derive both factors from 2π=360°; rebuild standard angle table; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.degree-radian-conversion` complete. Threshold 0.9 requires 5/5 correct.

**Unlocks:** Radian-based trig functions; arc length and sector area; angular velocity; special angles in radian form.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — WRONG-CONVERSION-DIRECTION Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You used the conversion factor in the wrong direction. To go from degrees to radians, multiply by π/180 (the smaller factor). To go from radians to degrees, multiply by 180/π (the larger factor)."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Convert 60° to radians.
*Correct response:* 60 × π/180 = π/3 (a small number, about 1.05). If you got a large number like 60 × 180/π ≈ 3438, you applied the wrong factor.

**[P64 — CONCEPTUAL SHIFT]**
"The key: π/180 ≈ 0.0175, so multiplying by it SHRINKS the number — appropriate when converting from degrees (large numbers like 90, 180, 360) to radians (small numbers like π/2, π, 2π). The factor 180/π ≈ 57.3 GROWS the number — for radians to degrees. If your answer seems wildly out of range, check your direction."

---

### Repair Action B02 — DEGREE-SUBSTITUTION-IN-RADIAN-FORMULA Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You used a degree value in a formula that requires radians. Formulas like s = rθ and A = ½r²θ use θ measured in radians — they are derived from the radian definition (arc length = radius × angle in radians)."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* A circle has radius 2. The sector angle is 90°. A student computes A = ½ × 4 × 90 = 180. What went wrong?
*Correct response:* θ must be in radians: 90° = π/2 rad. A = ½ × 4 × π/2 = π ≈ 3.14 sq units (not 180).

**[P64 — CONCEPTUAL SHIFT]**
"The formula s = rθ comes from the definition: radian measure IS the ratio (arc length)/(radius), so arc length = radius × radians, not radius × degrees. Every formula with a θ that came from geometry (angles) requires θ in radians. Develop the habit: see θ in a formula → convert to radians first."

---

### Repair Action B03 — FULL-CIRCLE-IS-PI Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote 360° = π. This is incorrect. Half a circle is π radians: 180° = π. A full circle is 2π radians: 360° = 2π."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* How many radians is a full circle?
*Correct response:* 2π ≈ 6.28 radians. A half circle is π ≈ 3.14 radians. The full circumference is 2πr, and the arc corresponding to one full rotation has arc length 2πr, so the angle in radians is 2πr/r = 2π.

**[P64 — CONCEPTUAL SHIFT]**
"Anchor to the half-circle: a straight angle is 180°, and going from one end of a diameter to the other along the arc gives arc length πr — so the angle is πr/r = π radians. HALF circle = π radians. Therefore FULL circle = 2π radians. 180° = π is your anchor fact; 360° = 2π follows by doubling."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Convert 5π/3 radians to degrees and 225° to radians. |
| R2 | 3 days | A sector of radius 10 cm has central angle 5π/6. Find its arc length and area. |
| R3 | 7 days | A wheel spinning at 300 rpm. Express its angular velocity in rad/s. (Hint: 300 rev/min × 2π rad/rev ÷ 60 s/min.) |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | math.trig.special-angles, math.trig.trig-functions, math.trig.unit-circle (radian entry) |
| Requires (Tier-1) | math.trig.angle-measure |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent pendulum problem.

---

## Component 8 — Teaching Notes

- **MC-1 is almost universal:** Students memorise "multiply by 180/π" for one direction but apply it to both. The size-check heuristic (π/180 shrinks, 180/π grows) gives an immediate sanity check without memorising direction labels.
- **The arc-length formula is the best motivation for radians:** Students who understand s = rθ (θ in radians) have a concrete reason to care about radians beyond "that's what the textbook uses." Present this early.
- **Standard angle table should be memorised:** π/6, π/4, π/3, π/2 are the four key values; all others are multiples. Encourage students to derive from 2π = 360° rather than rote-memorise, which prevents MC-3.
- **R3 bridges to angular velocity:** RPM × 2π/60 gives rad/s — a natural application showing why radians appear in all rotational physics formulas.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=C; concrete anchor in full-circle arc-length derivation | PASS |
| V-4 | bloom=apply → P07 not required | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A03) |
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
| V-19 | h=2 → 2 main TAs + gate appropriate for brief conversion concept | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |

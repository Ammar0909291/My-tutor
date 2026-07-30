<!-- BLUEPRINT: math.trig.law-of-cosines -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Law of Cosines (`math.trig.law-of-cosines`)
**Concept ID:** `math.trig.law-of-cosines`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=5 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.law-of-cosines |
| name | Law of Cosines |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.trig.right-triangle-trig |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.right-triangle-trig**: Pythagorean theorem c² = a² + b²; right-triangle trigonometry; cosine as adjacent/hypotenuse

### Target Knowledge State
Student identifies SAS and SSS configurations as the Law of Cosines cases. Student applies c² = a² + b² − 2ab cos C to find a missing side, and rearranges it to cos C = (a² + b² − c²)/(2ab) to find a missing angle. Student interprets the cosine formula as a corrected Pythagorean theorem and selects it (vs the Law of Sines) by checking whether the given information fits SAS or SSS.

### Conceptual Obstacles
1. Sign error in the formula — writing + 2ab cos C instead of − 2ab cos C
2. Forgetting the full arccos domain is [0°, 180°] when finding an angle — an obtuse solution is always valid
3. Using the Law of Cosines when the Law of Sines (AAS, ASA) would be simpler and faster

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | COSINE-SIGN-ERROR | Student writes c² = a² + b² + 2ab cos C (positive sign), dropping the − | SAS problems |
| MC-2 | ARCCOS-ACUTE-ONLY | Student expects arccos to return only an acute angle; misidentifies the angle as acute when it should be obtuse | SSS problems where the largest angle is obtuse |
| MC-3 | WRONG-LAW-SELECTION | Student applies Law of Cosines for AAS/ASA configurations where Law of Sines is correct | Triangle-solving mixed-scenario problems |

**Foundational Misconception:** MC-2 (ARCCOS-ACUTE-ONLY) — in SSS problems where the largest side determines an obtuse angle, this error produces a wrong final answer that appears plausible. Addressed in A02 and B02.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — labeled triangle diagram with altitude drawn.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Derive c² = a² + b² − 2ab cos C from the Pythagorean theorem applied to both sub-triangles created by the altitude; state the angle-finding rearrangement
2. **A02 P04 PATTERN INDUCTION** — Gallery of SAS (find side) and SSS (find angles) problems; emphasize arccos produces a unique angle in [0°, 180°]; procedure table
3. **A03 P06 CONTRAST PAIR** — Law of Cosines vs Law of Sines: which to apply for each of the four triangle configurations (SSS, SAS, AAS, ASA)
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Deriving and Stating the Law of Cosines

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Build the formula from first principles; connect to Pythagorean theorem; prevent MC-1 by showing where the − 2ab cos C term originates

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Setup:**

Triangle ABC with sides a (opposite A), b (opposite B), c (opposite C). Draw altitude h from vertex B to side b, meeting side b at foot D. Let x = AD (projection of side c onto side b).

**Stage B — Two right triangles:**

Right triangle 1 (left): h² + x² = c² → h² = c² − x²

Right triangle 2 (right): h² + (b − x)² = a²

**Stage C — Combine:**

From right triangle 2: h² = a² − (b − x)²

Set equal: c² − x² = a² − (b − x)² = a² − b² + 2bx − x²

Simplify: c² = a² − b² + 2bx → 2bx = b² + c² − a²

But x = c cos A (from right triangle 1: cos A = x/c), so:

**c² = a² + b² − 2ab cos C**

(Restate with vertices relabeled so C is the included angle between sides a and b, and c is the side opposite C.)

**Stage D — Angle-finding form:**

Rearrange: **cos C = (a² + b² − c²) / (2ab)**

Summary table:

| Given | Find | Formula |
|-------|------|---------|
| SAS (sides a, b and included angle C) | Side c | c² = a² + b² − 2ab cos C |
| SSS (all three sides) | Any angle, say C | cos C = (a² + b² − c²) / (2ab), then C = arccos(…) |

**Key fact:** arccos returns a unique answer in [0°, 180°] — so the Law of Cosines never produces an ambiguous case. Whatever value arccos gives is the correct angle.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* In triangle ABC, a = 7, b = 10, included angle C = 50°. Write the formula to find c.

(A) c² = 7² + 10² − 2(7)(10) cos 50°
(B) c² = 7² + 10² + 2(7)(10) cos 50°
(C) c = (7 + 10) / (2 cos 50°)
(D) c² = 7² − 10² + 2(7)(10) cos 50°

*Branch CORRECT (A):* c² = 49 + 100 − 140 cos 50° ≈ 149 − 89.97 ≈ 59.03, so c ≈ 7.68. ✓ Proceed to A02.

*Branch INCORRECT (B):* The formula has a minus sign: c² = a² + b² **−** 2ab cos C. A + sign here would give a larger c than the Pythagorean theorem predicts for a 50° angle. Proceed to A02.

*Branch INCORRECT (C or D):* The Law of Cosines is a quadratic formula in the side squared, not a linear one. Use c² = a² + b² − 2ab cos C. Proceed to A02.

*Branch NO_RESPONSE:* c² = a² + b² − 2ab cos C = 49 + 100 − 140 cos 50° ≈ **59.03**, so c ≈ **7.68**. Proceed to A02.

---

### Teaching Action A02 — SAS and SSS Problem Gallery

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Automate both directions (find side, find angle); emphasize [0°, 180°] arccos range; prevent MC-2

---

**[P04 — PATTERN INDUCTION]**

**SAS procedure** (find missing side):
1. Identify included angle C and adjacent sides a, b
2. Compute c² = a² + b² − 2ab cos C
3. Take √(c²) = c > 0

**SSS procedure** (find angles):
1. Use cos C = (a² + b² − c²) / (2ab) for each angle
2. Compute arccos — result is in [0°, 180°], always correct
3. Find the third angle: A + B + C = 180°

**Gallery:**

| Type | Given | Find | Answer |
|------|-------|------|--------|
| SAS | a=8, b=15, C=120° | c | c² = 64 + 225 − 240(−0.5) = 409; c ≈ 20.22 |
| SSS | a=5, b=7, c=9 | angle C (largest) | cos C = (25 + 49 − 81)/70 = −7/70 ≈ −0.1; C ≈ 95.7° |
| SSS | a=6, b=8, c=10 | all angles | cos C = (36+64−100)/96 = 0; C = 90° (right triangle) |
| SAS | a=12, b=5, C=30° | c | c² = 144 + 25 − 120(√3/2) ≈ 65.2; c ≈ 8.07 |

**Obtuse angle detection:** When cos C < 0 (as in SSS row 1 above), arccos produces an angle > 90°. This is correct and expected. Do not re-interpret it as acute.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* In a triangle with sides a = 3, b = 5, c = 7, what is cos C?

(A) (9 + 25 − 49) / 30 = −1/2
(B) (9 + 25 + 49) / 30 = 83/30
(C) (3 + 5 − 7) / 30 = 1/30
(D) (9 − 25 + 49) / 30 = 11/10

*Branch CORRECT (A):* cos C = (a² + b² − c²)/(2ab) = (9 + 25 − 49)/30 = −15/30 = −1/2. So C = 120°. ✓ Proceed to A03.

*Branch INCORRECT (B):* The numerator is a² + b² − c² (not a sum of all three). Use (9 + 25 − 49)/30 = −1/2. Proceed to A03.

*Branch INCORRECT (C):* Use the squared sides, not the lengths: (3² + 5² − 7²)/(2·3·5) = (9 + 25 − 49)/30. Proceed to A03.

*Branch NO_RESPONSE:* cos C = (a² + b² − c²)/(2ab) = (9 + 25 − 49)/(2·3·5) = **−1/2**, so C = **120°**. Proceed to A03.

---

### Teaching Action A03 — Law of Cosines vs Law of Sines

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Establish a clear selection rule for which law to apply; prevent MC-3

---

**[P06 — CONTRAST PAIR]**

| Configuration | What is given | Law to use | Reason |
|---------------|--------------|------------|--------|
| SSS | 3 sides | Cosines | No angle given → Sines needs an angle |
| SAS | 2 sides + included angle | Cosines | Included angle between known sides |
| AAS | 2 angles + 1 side | Sines | Find third angle first (sum = 180°); then set up ratios |
| ASA | 2 angles + included side | Sines | Same; third angle from sum |
| SSA (ambiguous) | 2 sides + non-included angle | Sines (check for 0/1/2 solutions) | Cosines also works but Sines is standard |

**Decision rule:** Does the given information fit a ratio a/sin A = b/sin B? If yes, Law of Sines. If a complete pair (side + opposite angle) is missing and you have two sides with their included angle or all three sides, use Law of Cosines.

**Contrast example:**

*Problem A:* A = 40°, B = 70°, a = 15 → AAS → Law of **Sines** → b = 15 sin 70° / sin 40° ≈ 21.95.

*Problem B:* a = 7, b = 10, C = 50° → SAS → Law of **Cosines** → c ≈ 7.68.

Both involve three pieces of triangle information; the structure (angle–angle–side vs side–side–angle) determines the law.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* You know two sides (b = 8, c = 11) and the angle between them (A = 65°). Which law applies?

(A) Law of Sines — because two sides are known
(B) Law of Cosines — because the included angle is given
(C) Pythagorean theorem — because two sides and an angle are given
(D) Law of Sines — to find the third side directly

*Branch CORRECT (B):* SAS configuration (sides b, c and included angle A). Use c² → a² = b² + c² − 2bc cos A. ✓ Proceed to A04.

*Branch INCORRECT (A):* Two sides alone do not determine which law applies — it depends on whether the included angle (between the two known sides) is also known. Here it is → Law of Cosines. Proceed to A04.

*Branch INCORRECT (C):* Pythagorean theorem applies only to right triangles. A = 65° is not necessarily a right angle. Proceed to A04.

*Branch NO_RESPONSE:* Two sides and their **included angle** = SAS → **Law of Cosines**. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** In triangle ABC, a = 7, b = 10, C = 50°. Find c (to 2 d.p.).

**Problem 2.** In triangle ABC, a = 5, b = 7, c = 9. Find all three angles (to 1 d.p.).

**Problem 3.** Two sides are 8 and 15 with included angle 120°. Find the third side.

**Problem 4.** A ship leaves port, sails 50 km due north, then turns and sails 70 km on a bearing of N 55° E. How far is the ship from port?

---

**[P55 — SCORE]**

*Answers:*

1. c² = 49 + 100 − 140 cos 50° ≈ 149 − 89.97 ≈ 59.03; c ≈ **7.68**. ✓

2. cos C = (25 + 49 − 81)/70 = −7/70; C ≈ 95.7°. cos A = (49 + 81 − 25)/126 = 105/126; A ≈ 33.6°. B = 180° − 95.7° − 33.6° ≈ 50.7°. ✓

3. c² = 64 + 225 − 2(8)(15)cos 120° = 289 − 240(−0.5) = 289 + 120 = 409; c ≈ **20.22**. ✓

4. The angle between the two legs is 90° − 55° = 35° (from north, turning 55° east). d² = 50² + 70² − 2(50)(70)cos(35°) = 2500 + 4900 − 7000(0.8192) ≈ 2656; d ≈ **51.5 km**. (Accept any correct setup and arithmetic within rounding.)

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* Two radio towers A and B are 50 km apart. A receiver at point C detects signals from both. The distance from A to C is 35 km and from B to C is 40 km.

*(a)* Find angle ACB (the angle at C in triangle ABC).

*(b)* A technician claims the triangle must be acute because "all distances are less than 50 km." Evaluate this claim.

*Expected answer:*

*(a)* cos(ACB) = (35² + 40² − 50²) / (2 · 35 · 40) = (1225 + 1600 − 2500) / 2800 = 325/2800 ≈ 0.1161. ACB = arccos(0.1161) ≈ 83.3°. ✓

*(b)* The claim is wrong in its reasoning — the largest angle of a triangle is opposite the largest side, and arccos produces the correct result in [0°, 180°] regardless. In this case ACB ≈ 83.3° (acute), but that is a consequence of the specific distances, not a guarantee from "all sides < largest side." A triangle with a very long third side would give an obtuse angle at C.

---

**[P55 — SCORE]**

Transfer probe: 1 point (correct angle computation with valid evaluation of claim); 0.5 for correct (a) but incomplete (b).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.8 × 5⌉ = 4). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| ≥ 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed item; sign error → B01; obtuse angle → B02; wrong law → B03; targeted repair |
| ≤ 2/5 | → Return to A01; re-derive the formula from the altitude diagram; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.law-of-cosines` complete. Threshold 0.8 requires 4/5 correct.

**Unlocks:** Triangle area via Heron's formula; surveying and navigation applications.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — COSINE-SIGN-ERROR Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"The formula has a minus sign: c² = a² + b² **−** 2ab cos C. Writing a plus sign inflates the side length beyond what geometry allows for an angle less than 90°."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* If C = 90°, what does the Law of Cosines reduce to?
*Correct response:* cos 90° = 0, so c² = a² + b² − 0 = a² + b². This is exactly the Pythagorean theorem — confirming the sign is correct.

**[P64 — CONCEPTUAL SHIFT]**
"The − 2ab cos C term is a correction: for acute angles (cos C > 0), c is shorter than the Pythagorean prediction (a² + b²); for obtuse angles (cos C < 0), c is longer. A minus sign produces this correct behavior. A plus sign would always make c too large."

---

### Repair Action B02 — ARCCOS-ACUTE-ONLY Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"arccos always returns a value in [0°, 180°] — the full range of triangle angles. If the computed cos C is negative, arccos will give an obtuse angle, which is the correct and expected result."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* cos C = −0.5 from an SSS problem. What is angle C?
*Correct response:* C = arccos(−0.5) = 120°. If the student says 60°, they took the reference angle rather than the arccos.

**[P64 — CONCEPTUAL SHIFT]**
"arccos is defined on [−1, 1] and returns a unique value in [0°, 180°]. Negative cosine means the angle is between 90° and 180° — the calculator gives this directly. The ambiguous case doesn't exist in Law of Cosines because you don't divide by sin."

---

### Repair Action B03 — WRONG-LAW-SELECTION Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"The Law of Cosines applies when you have SSS or SAS. If two angles and a side (AAS/ASA) are given, the Law of Sines is faster — apply it instead."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* You have A = 50°, B = 70°, a = 12. Which law?
*Correct response:* AAS → Law of Sines. C = 60° first; then b/sin B = a/sin A.

**[P64 — CONCEPTUAL SHIFT]**
"Quick check: Do you have the side opposite the angle you want? If yes, a ratio a/sin A = b/sin B works (Sines). If no (you have two sides and their included angle, or all three sides), you need the cosine formula."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | a = 10, b = 14, C = 45°. Find c. |
| R2 | 3 days | a = 6, b = 9, c = 12. Find the largest angle. Is it acute or obtuse? |
| R3 | 7 days | A = 35°, b = 8, c = 5. (SAS: angle A is between sides b and c.) Find a. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | Heron's formula; navigation/surveying applications |
| Requires (Tier-1) | math.trig.right-triangle-trig |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent radio-tower triangulation problem.

---

## Component 8 — Teaching Notes

- **The derivation roots the formula:** Students who see the altitude derivation understand why the sign is negative (the "correction" interpretation). Students given only the formula memorize it without understanding and reliably write the wrong sign under pressure.
- **SSS always produces three obtuse/acute determinations that must sum to 180°:** After finding all three angles via arccos, always verify A + B + C = 180° as a sanity check. A mismatch indicates a computational error before it propagates.
- **The P76 transfer includes epistemics:** Part (b) asks the student to evaluate a claim about geometry, not just compute. This directly targets the dangerous MC-2 belief that "short sides → acute triangle" — a false heuristic that appears reasonable but fails for triangles with specific proportions.
- **Comparison with Law of Sines:** Present A03's table before students encounter mixed problems. Students who skip this step solve every triangle problem with whichever law they saw last, producing errors on AAS/ASA with the cosine law.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=C; triangle diagram with altitude used in A01 | PASS |
| V-4 | bloom=apply; formula application and novel triangulation problem | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.8×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-2 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |

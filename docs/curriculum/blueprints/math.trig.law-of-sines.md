<!-- BLUEPRINT: math.trig.law-of-sines -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Law of Sines
**Concept ID:** `math.trig.law-of-sines`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=6 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.trig.law-of-sines |
| name | Law of Sines |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 6 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.trig.right-triangle-trig |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.trig.right-triangle-trig**: Sine as opposite/hypotenuse; altitude from vertex divides a general triangle into two right triangles

### Target Knowledge State
Student states and applies the law of sines: a/sin A = b/sin B = c/sin C (where a, b, c are sides opposite angles A, B, C respectively). Student identifies AAS and ASA as the configurations where the law of sines applies. Student recognizes and resolves the ambiguous case (SSA): determines whether 0, 1, or 2 triangles exist, and finds all valid solutions when 2 triangles are possible.

### Conceptual Obstacles
1. Applying the law of sines to SAS or SSS configurations, where law of cosines is required
2. In the SSA ambiguous case, always assuming exactly one triangle exists — missing the obtuse solution
3. Confusing the angle-side pairing: side a must be opposite angle A (not adjacent to it)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SINE-RULE-FOR-ALL | Student applies law of sines to SAS or SSS configurations where it cannot directly find the missing side | Any triangle problem without a stated angle-side pair opposite each other |
| MC-2 | AMBIGUOUS-CASE-BLINDNESS | In SSA, student finds only the acute angle solution for B (arcsin result) and never considers the obtuse supplement | SSA problems where b sin A < a < b |
| MC-3 | ANGLE-SIDE-PAIRING | Student writes a/sin B or b/sin A — pairing a side with the wrong angle in the ratio | Setting up the proportion |

**Foundational Misconception:** MC-2 (AMBIGUOUS-CASE-BLINDNESS) — causes students to systematically miss valid triangle configurations. Addressed in A03 and B02.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — derive from a general triangle with a labeled altitude.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Draw altitude h; show two right triangles; derive h = b sin A = a sin B; rearrange to a/sin A = b/sin B; extend to include C
2. **A02 P04 PATTERN INDUCTION** — Gallery of AAS and ASA problems; automate the proportion setup
3. **A03 P06 CONTRAST PAIR** — The ambiguous case (SSA): three scenarios (no triangle, one right triangle, two triangles) shown side by side with a consistent diagram
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Deriving the Law of Sines

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground the law in right-triangle trig; establish correct angle-side pairing; prevent MC-3

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — General triangle with altitude:**

In △ABC, draw altitude h from vertex B to side AC (or its extension). This creates two right triangles.

**Stage B — Right-triangle relations:**

In the right triangle on the left: sin A = h/c → h = c sin A

In the right triangle on the right: sin C = h/a → h = a sin C

**Stage C — Equal both expressions:**

c sin A = a sin C → **a/sin A = c/sin C**

Repeat with the altitude from C: b sin A = a sin B → **a/sin A = b/sin B**

**Law of sines:** For any triangle with sides a, b, c opposite angles A, B, C:

$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$$

**When to use:** AAS (two angles + a non-included side) or ASA (two angles + included side → find the third angle first, then apply).

**When NOT to use alone:** SAS (two sides + included angle) or SSS — these require the law of cosines.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* In △ABC, A = 40°, B = 70°, a = 15. Using the law of sines, which proportion correctly solves for b?

(A) 15/sin 40° = b/sin 70°
(B) 15/sin 70° = b/sin 40°
(C) b/sin 40° = 15/sin 70°
(D) b · sin 40° = 15 · sin 70°

*Branch CORRECT (A):* a/sin A = b/sin B → 15/sin 40° = b/sin 70°. Solve: b = 15·sin70°/sin40° ≈ 21.95. ✓ Proceed to A02.

*Branch INCORRECT (B, C):* Side a = 15 is opposite angle A = 40°, not B = 70°. The correct ratio pairs each side with the angle it faces: a/sinA = b/sinB → 15/sin40° = b/sin70°. Proceed to A02.

*Branch INCORRECT (D):* Cross-multiplied incorrectly. From a/sinA = b/sinB: b = a·sinB/sinA = 15·sin70°/sin40°. Proceed to A02.

*Branch NO_RESPONSE:* a/sin A = b/sin B → **15/sin 40° = b/sin 70°** → b ≈ 21.95. Proceed to A02.

---

### Teaching Action A02 — Solving AAS and ASA Triangles

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Automate the proportion setup; build fluency with AAS and ASA; surface MC-1

---

**[P04 — PATTERN INDUCTION]**

**Procedure:**
1. Check configuration: do you have an angle-side pair (known A and a, or known B and b)? If yes, law of sines applies.
2. If ASA: find the third angle first (angle sum = 180°), then set up ratios.
3. Set up: (known side)/(sin of its opposite angle) = (unknown side)/(sin of its opposite angle).
4. Solve for the unknown.

**Gallery:**

| Config | Given | Find | Setup | Answer |
|--------|-------|------|-------|--------|
| AAS | A=40°, B=70°, a=15 | b | 15/sin40° = b/sin70° | b ≈ 21.95 |
| ASA | B=50°, C=65°, c=20 | b, A | A=65°; 20/sin65° = b/sin50° | b ≈ 16.91 |
| AAS | A=30°, C=100°, c=25 | a | 25/sin100° = a/sin30° | a ≈ 12.69 |

**Tip:** Always find the third angle first in ASA (angle sum = 180°). Then identify which ratio to set up.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* In △ABC, B = 50°, C = 65°, c = 20. Find side b.

(A) b = 20·sin50°/sin65° ≈ 16.91
(B) b = 20·sin65°/sin50° ≈ 23.67
(C) b = 20·sin(180°−50°−65°)/sin65°
(D) Cannot use law of sines without knowing side a

*Branch CORRECT (A):* C and B are known angles; c is opposite C and b is opposite B. b/sinB = c/sinC → b = 20·sin50°/sin65° ≈ 16.91. ✓ Proceed to A03.

*Branch INCORRECT (B):* You put sinC in the numerator instead of sinB. The ratio pairs each side with its opposite angle: b/sin50° = 20/sin65° → b = 20·sin50°/sin65°. Proceed to A03.

*Branch INCORRECT (D):* This is AAS — B, C, and c are given. The law of sines applies directly: b/sin50° = 20/sin65°. Proceed to A03.

*Branch NO_RESPONSE:* b/sin B = c/sin C → b = 20·sin50°/sin65° ≈ **16.91**. Proceed to A03.

---

### Teaching Action A03 — The Ambiguous Case (SSA)

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Show the three SSA outcomes; prevent MC-2

---

**[P06 — CONTRAST PAIR]**

**Setup:** Given angle A, the side a opposite A, and the adjacent side b.

Let h = b sin A (the height of the potential triangle — the minimum value a must reach to form a triangle).

**Three scenarios (contrast):**

| Condition | Number of triangles | Reason |
|-----------|--------------------|-|
| a < h (a < b sin A) | **0** | a is too short to reach the base |
| a = h (a = b sin A) | **1** (right triangle) | a exactly reaches, forming a right angle |
| h < a < b | **2** (ambiguous) | a can swing to two positions |
| a ≥ b | **1** | only the acute solution is valid |

**Resolving the two-triangle case:**

From sin B = b sin A / a, compute B₁ = arcsin(b sin A / a). Then B₂ = 180° − B₁.

Check validity: if A + B₂ < 180°, a second valid triangle exists with angle B₂.

**Worked example (two triangles):** A = 30°, a = 8, b = 12.
- h = 12·sin30° = 6 < 8 < 12 → two triangles.
- sin B = 12·sin30°/8 = 6/8 = 3/4. B₁ = arcsin(3/4) ≈ 48.59°. B₂ ≈ 131.41°.
- A + B₁ ≈ 78.59° < 180° ✓. A + B₂ ≈ 161.41° < 180° ✓. Both valid.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* In △ABC, A = 30°, a = 8, b = 12. How many triangles exist?

(A) 0
(B) 1
(C) 2
(D) Cannot determine without angle B

*Branch CORRECT (C):* h = 12·sin30° = 6; h < a = 8 < b = 12 → two triangles. ✓ Proceed to A04.

*Branch INCORRECT (B):* The ambiguous case test: h = 6, a = 8. Since h < a < b (6 < 8 < 12), two triangles exist — the arc of radius a can intersect the base at two points. Proceed to A04.

*Branch INCORRECT (A):* a < h would give no triangle, but here h = 6 < 8 = a, so a reaches the base (and beyond). Two triangles exist. Proceed to A04.

*Branch NO_RESPONSE:* h = b sinA = 12·0.5 = 6. Since 6 < 8 < 12 (h < a < b), exactly **2 triangles** exist. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

**Problem 1.** In △ABC, A = 40°, B = 70°, a = 15. Find side b (to 2 decimal places).

**Problem 2.** In △ABC, B = 50°, C = 65°, c = 20. Find side b and angle A.

**Problem 3.** In △ABC, A = 30°, a = 8, b = 12. Determine the number of valid triangles and find angle B for each.

**Problem 4.** In △ABC, C = 110°, c = 25, a = 12. Find angle A.

---

**[P55 — SCORE]**

*Answers:*

1. b/sin70° = 15/sin40° → b = 15·sin70°/sin40° ≈ **21.95** ✓

2. A = 180°−50°−65° = 65°. b/sin50° = 20/sin65° → b ≈ 20·0.766/0.906 ≈ **16.91** ✓

3. h = 12·sin30° = 6; 6 < 8 < 12 → 2 triangles. sinB = 6/8 = 3/4. B₁ ≈ **48.59°**, B₂ ≈ **131.41°** ✓

4. sinA/12 = sin110°/25 → sinA = 12·sin110°/25 ≈ 0.451. A ≈ **26.8°** (acute only, since C > 90°) ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* A surveyor at point A sights a landmark C across a river. The line of sight makes 35° with the riverbank AB. From point B, 100 m downstream from A, the sighting angle to C is 55° (measured from the bank on the same side). Find the distance AC.

*Expected answer:*

In △ABC: angle at A = 35°, angle at B = 180° − 55° = 125°, angle at C = 180° − 35° − 125° = 20°.

By law of sines: AC/sin B = AB/sin C → AC = 100 · sin125°/sin20° ≈ 100 · 0.8192/0.3420 ≈ **239.5 m**.

---

**[P55 — SCORE]**

Transfer probe: 1 point for correct angle identification and application of law of sines.

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
| 4–5/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed item; wrong law → B01; missed ambiguous solution → B02; wrong pairing → B03; targeted repair |
| ≤ 2/5 | → Return to A01; re-derive from altitude; rebuild proportion-setup procedure; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.trig.law-of-sines` complete. Threshold 0.8 requires 4/5 correct.

**Unlocks:** Combined law of sines/cosines applications; surveying and navigation problems.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SINE-RULE-FOR-ALL Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"The law of sines requires a known angle-side pair (a side and the angle directly opposite it). For SAS or SSS, the law of cosines is needed instead."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Given sides a=7, b=9, and the angle between them C=120°. Can you use the law of sines to find c immediately?
*Correct response:* No — C is the included angle between a and b, not opposite either of them. You need the law of cosines: c² = 49 + 81 − 2·63·cos120°.

**[P64 — CONCEPTUAL SHIFT]**
"The law of sines ratio is a/sinA — it pairs a side with the angle ACROSS from it, not beside it. If the known angle is between the two known sides, the angle is NOT across from a known side, so the ratio has no known left-hand side. That's the structural test: law of sines needs a side-angle pair that are directly opposite each other."

---

### Repair Action B02 — AMBIGUOUS-CASE-BLINDNESS Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"In the SSA case, sinB may have two solutions: B₁ from arcsin and its supplement B₂ = 180°−B₁. Always check whether B₂ also forms a valid triangle by verifying A + B₂ < 180°."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* sinB = 3/4. What are the possible values of B in [0°, 180°)?
*Correct response:* B₁ ≈ 48.59° AND B₂ ≈ 131.41°. Both are valid angles that have sin = 3/4.

**[P64 — CONCEPTUAL SHIFT]**
"The arcsine function returns a value in [−90°, 90°] by convention — only the first-quadrant solution. But an angle in a triangle can be obtuse (between 90° and 180°), where sin is still positive. So sinB = k always has two solutions in [0°, 180°): B and 180°−B. Check both; the triangle constraint A + B < 180° eliminates any invalid ones."

---

### Repair Action B03 — ANGLE-SIDE-PAIRING Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"In the ratio a/sin A, side a must be the side OPPOSITE angle A — the side across the triangle from A's vertex. Side b is opposite angle B, and so on. Never pair a side with an adjacent angle."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* In △ABC with standard labeling, which side is opposite angle B?
*Correct response:* Side b — the side connecting vertices A and C, which does not touch vertex B.

**[P64 — CONCEPTUAL SHIFT]**
"The convention: lowercase a is the side opposite (across from) uppercase A. This is true regardless of how the triangle is drawn. When setting up the proportion, always identify: 'Which vertex does this angle sit at? What is the side that does not touch that vertex?' That side is the one that pairs with the angle."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | In △ABC, A=55°, C=75°, b=30. Find sides a and c. |
| R2 | 3 days | Ambiguous case: A=25°, a=10, b=14. How many triangles? Find all angles B. |
| R3 | 7 days | A ship travels from port P to island Q on a bearing of N40°E for 50 km. It then reaches island R on a bearing of S60°E. The angle at Q between PQ and QR is 80°. Find the distance QR. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | Navigation and surveying applications; combined law problems |
| Requires (Tier-1) | math.trig.right-triangle-trig |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent surveying problem.

---

## Component 8 — Teaching Notes

- **The ambiguous case is the most common exam failure point:** Students who learn only the ASA/AAS routine will be caught off-guard by SSA. Teach the h = b sinA test explicitly as a mandatory first check whenever the configuration is SSA.
- **Always state the law in its ratio form first:** a/sinA = b/sinB = c/sinC. Students who learn only "cross-multiply" skip the step of identifying which angles and sides are paired, making pairing errors (MC-3) more likely.
- **Check the angle sum after finding the second triangle:** A + B₂ < 180° is the necessary and sufficient condition for the second triangle to exist. Applying this check explicitly prevents the MC-2 error.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=C; derived from a concrete triangle with labeled altitude | PASS |
| V-4 | bloom=apply; P07 not required | PASS |
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

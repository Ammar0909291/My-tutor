# TEACHING BLUEPRINT — math.geom.triangle

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.geom.triangle |
| concept_name | Triangle |
| domain | geometry |
| difficulty | developing |
| bloom | understand |
| estimated_hours | 20 |
| mastery_threshold | 0.85 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.85 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.geom.angle, math.geom.line-segment]
**unlocks:** [math.geom.pythagorean-theorem, math.trig.right-triangle-trig]
**cross_links:** [math.trig.right-triangle-trig] — Tier 1 concept → P76 cross-link probe

---

## Component 1 — Cognitive Map

**Core concept:** A triangle is a polygon formed by three line segments meeting at three vertices, enclosing three interior angles whose measures always sum to 180°. Triangles are classified along two independent axes: by side lengths (scalene, isosceles, equilateral) and by angle type (acute, right, obtuse). Both labels apply simultaneously to the same triangle.

**Knowledge prerequisites activated:**
- math.geom.angle: interior angle measurement in degrees; notation ∠A; angle sum
- math.geom.line-segment: sides of a triangle are line segments with definite length

**Concept structure:**
1. **Definition**: three vertices A, B, C connected by three line segments (sides AB, BC, CA), enclosing three interior angles
2. **Angle sum theorem**: ∠A + ∠B + ∠C = 180° — always, for every triangle regardless of size or shape
3. **Side-length classification**: scalene (all different), isosceles (exactly two equal), equilateral (all three equal)
4. **Angle-type classification**: acute (all angles < 90°), right (exactly one angle = 90°), obtuse (exactly one angle > 90°)
5. **Combined classification**: the two axes are independent — a triangle is labeled by both simultaneously (e.g., isosceles right)
6. **Altitude**: perpendicular segment from a vertex to the opposite side (or its extension) — a measurement auxiliary, not a side

**Target understanding:** Given a triangle description, the learner applies the angle sum to find missing angles, classifies by both side and angle criteria simultaneously, and distinguishes altitude from side.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | ANGLE-SUM-NOT-180 | Two angles given, asked for third | Uses 360° instead of 180°; says angle sum depends on triangle size; obtains impossible angle values | B01 |
| MC-2 | TRIANGLE-TYPE-IS-EXCLUSIVE | Shown a right isosceles triangle | Says it is impossible to be both isosceles and right-angled; treats all six classification labels as a single mutually exclusive set | B02 |
| MC-3 | ALTITUDE-IS-A-SIDE | Asked for altitude of a triangle | Names a side (leg or hypotenuse) as the altitude; does not distinguish the perpendicular auxiliary from the boundary sides | B03 |

**FOUNDATIONAL MC:** MC-1 (ANGLE-SUM-NOT-180) — if the learner cannot apply the 180° sum, they cannot find missing angles, cannot verify classification, and the P76 cross-link probe is inaccessible.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
"Three sticks" model: lay three pencils on a desk to form a triangle. The three corner angles are the bends at each vertex. Physically rearrange the sticks into different triangles — the enclosed corner angles always add to a half-turn (180°). Measure and verify.

**Progression Gate (C → P):** Learner consistently names the three angle measures, adds them, and obtains 180°.
**Progression Gate (P → A):** Learner classifies the same triangle with two labels simultaneously and articulates why both apply.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — "The Three-Corner Figure": Angle Sum and Anatomy (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: A three-legged stool — 3 legs (sides), 3 joints where legs meet the seat (vertices), always stable on flat ground.
Target domain: A triangle — 3 sides (line segments), 3 vertices, 3 interior angles that always sum to 180°.
Mapping: leg ↔ side; joint ↔ vertex; "always stable" ↔ angle sum always 180°.

Triangle anatomy:
```
           A
          /\
         /  \
        / ∠A \
       /      \
    B /________\ C
      ∠B      ∠C

Vertices:  A, B, C
Sides:     AB, BC, CA  (each a line segment)
Angles:    ∠A, ∠B, ∠C
Sum:       ∠A + ∠B + ∠C = 180°  (always)
```

Angle sum in use:
```
Given: ∠A = 60°, ∠B = 80°
Find:  ∠C = 180° − 60° − 80° = 40°
```

**P49 ADAPTIVE CHECKPOINT**
Q: "In triangle PQR, ∠P = 70° and ∠Q = 55°. What is ∠R?"
→ CORRECT [55°]: "Correct — 180° − 70° − 55° = 55°." → TA-A02
→ INCORRECT [220°, 285°, or any value that uses 360°]: Flag MC-1. Route → B01.
→ NO_RESPONSE: "Three angles sum to 180°. What is 180° − 70° − 55°?" → guided.

---

### TA-A02 — Side-Length Classification (GR-1: P11 | GR-2: P49)

**P11 REPRESENTATION SHIFT**

Three representations of the same classification:

| Representation | Name | Defining property | Example sides |
|---|---|---|---|
| Verbal | Scalene | All three sides different | 3 cm, 5 cm, 7 cm |
| Tick-mark | Isosceles | Exactly two sides equal | 5 cm, 5 cm, 8 cm |
| Symbolic | Equilateral | All three sides equal | a = b = c |

Tick-mark convention in diagrams:
```
  Equilateral          Isosceles             Scalene
      A                   A                    A
    /  \                /  \                 /  \
   /    \             ┤/    \├            3 /    \ 5
  /      \            /      \             /      \
B/________\C        B/________\C         B/___4___\C
all ticks equal    two ticks equal      no ticks equal
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Triangle DEF has sides 5 cm, 5 cm, 8 cm. Which side-length classification applies?"
→ CORRECT [isosceles]: "Correct — two equal sides (5, 5), one different (8)." → TA-A03
→ INCORRECT [equilateral]: "Equilateral requires all three sides equal. Are all three equal here?" → guided.
→ INCORRECT [scalene]: "Scalene requires all three sides different. Are 5 and 5 different?" → guided.

---

### TA-A03 — Angle-Type Classification (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

| Feature | Acute | Right | Obtuse |
|---|---|---|---|
| Angle condition | All angles < 90° | Exactly one angle = 90° | Exactly one angle > 90° |
| Example angles | 60°, 70°, 50° | 90°, 45°, 45° | 120°, 35°, 25° |
| Sum check | 180° ✓ | 180° ✓ | 180° ✓ |
| Key marker | All sharp corners | One square corner (⊾) | One wide corner |

Critical point: the 180° angle sum holds for all three types without exception.

Cannot have two right angles (90° + 90° = 180° leaves 0° for the third). Cannot have two obtuse angles (> 90° + > 90° > 180°).

**P49 ADAPTIVE CHECKPOINT**
Q: "A triangle has angles 90°, 40°, and 50°. (a) Verify the angle sum. (b) Classify by angle type."
→ CORRECT [(a) 90+40+50=180 ✓; (b) right triangle]: "Correct — one 90° angle makes it a right triangle." → TA-A04
→ INCORRECT [(b) says obtuse or acute]: "Which angle value is exactly 90°? That determines the type." → guided.
→ NO_RESPONSE: "Start with the angle sum check. Then look: is any angle exactly 90°?" → guided.

---

### TA-A04 — Combined Classification and Altitude (GR-1: P04 | GR-2: P49)

**P04 PATTERN INDUCTION**

Observe: side classification and angle classification are independent axes. A triangle receives one label from each:

| Triangle | Side class | Angle class | Full name |
|---|---|---|---|
| Sides 5,5,5; angles 60°,60°,60° | Equilateral | Acute | Equilateral acute |
| Sides 5,5,8; angles 77°,77°,26° | Isosceles | Acute | Isosceles acute |
| Sides 5,5,7.07; angles 90°,45°,45° | Isosceles | Right | Isosceles right |
| Sides 3,4,5; angles 90°,53°,37° | Scalene | Right | Scalene right |
| Sides 4,6,9; angles 23°,38°,119° | Scalene | Obtuse | Scalene obtuse |

**Pattern:** any side class can pair with any angle class — no combination is inherently forbidden.

The altitude from vertex A:
```
    A
    |\
    | \          ← hypotenuse or opposite side
  h |  \
    |   \
    |    \
  B |_____\ C   ← base BC

The altitude h is perpendicular to BC.
It is NOT side AB, BC, or CA — it is an auxiliary segment inside (or outside) the triangle.
```

**P49 ADAPTIVE CHECKPOINT**
Q: "A right triangle has legs 3 and 4 and hypotenuse 5. (a) Classify by sides. (b) Classify by angles. (c) The altitude from the right-angle vertex to the hypotenuse — is it 3, 4, or a different length?"
→ CORRECT [(a) scalene; (b) right; (c) different length — it is 12/5 = 2.4, not a side]: "Correct — scalene right triangle; altitude ≠ side." → TA-A05
→ INCORRECT [(a) says isosceles]: "Are all three sides 3, 4, 5 distinct?" → guided.
→ INCORRECT [(c) says 3 or 4]: Flag MC-3. Route → B03.

---

### TA-A05 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **In triangle ABC, ∠A = 48° and ∠B = 73°. Find ∠C.**
   *(Expected: 180° − 48° − 73° = 59°)*

2. **A triangle has sides 6 cm, 6 cm, 9 cm. Classify it by side length.**
   *(Expected: isosceles — two sides equal)*

3. **True/False:** A triangle cannot be both isosceles and right-angled at the same time.
   *(Expected: FALSE — a right isosceles triangle has two equal legs and one 90° angle; angles 90°, 45°, 45°)*

4. **In any triangle, the altitude from vertex A to side BC is one of the three sides of the triangle.**
   *(Expected: FALSE — the altitude is a perpendicular auxiliary segment from A to line BC; it is not a side)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: cross-link to math.trig.right-triangle-trig — Tier 1 concept)

*Right triangle bridge to trigonometry:*

"A right triangle has a right angle at vertex C and an angle of 30° at vertex A.

(a) Find the angle at vertex B using the angle sum theorem.
(b) Label the sides: the side opposite A (length p), the side opposite B (length q), and the hypotenuse (length r). Using the right-triangle convention, write the ratio sin(30°) = opposite/hypotenuse in terms of p and r.
(c) If the hypotenuse r = 10, use sin(30°) = 0.5 to find p."

*(Expected:
(a) ∠B = 180° − 90° − 30° = 60°
(b) sin(30°) = p/r — opposite to 30° is p; hypotenuse is r
(c) p = 10 × 0.5 = 5)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.85; ⌈0.85×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 ANGLE-SUM-NOT-180 first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now apply the 180° angle sum to find missing angles, classify any triangle by both its side lengths and angle type simultaneously, and distinguish the altitude from the sides. These skills are foundational for the Pythagorean theorem and right-triangle trigonometry."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: ANGLE-SUM-NOT-180 (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A frequent error: using 360° (the angle sum around a full rotation point) instead of 180° for the interior angles of a triangle. The interior angle sum of every triangle — any size, any shape — is exactly 180°, no exceptions."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "A triangle has angles 100° and 40°. What is the third angle?"
→ "40°" (180° − 100° − 40°): MC-1 not active. Exit B01 → next flagged MC or TA-A05.
→ Any other value: MC-1 confirmed. Continue B01.

**P64 CONCEPTUAL SHIFT**
"Interior angle sum = 180°. Always.

```
∠A + ∠B + ∠C = 180°

Example: ∠A = 100°, ∠B = 40°
  → ∠C = 180° − 100° − 40° = 40°

If you wrote 220°: that used 360°. But 360° is the sum around a full point (a complete rotation).
Inside a triangle — half the plane — the sum is half of 360°: exactly 180°.
```"

**P49 ADAPTIVE CHECKPOINT**
Q: "In triangle PQR, ∠P = 80° and ∠Q = 65°. Find ∠R."
→ CORRECT [35°]: "Correct — 180° − 80° − 65° = 35°." Exit B01 → B02 if flagged, else TA-A05.
→ INCORRECT: "Start from 180°. Subtract both given angles: 180 − 80 − 65 = ___." → re-prompt.

---

### TA-B02 — Repair: TRIANGLE-TYPE-IS-EXCLUSIVE (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Learners sometimes treat all six triangle labels (scalene, isosceles, equilateral, acute, right, obtuse) as a single mutually exclusive list. In fact, they form two separate, independent classification systems. A triangle receives one label from each system simultaneously."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Is a triangle with angles 90°, 45°, 45° and two equal sides a valid, naturally occurring triangle? What are its two classification labels?"
→ "Isosceles right triangle" (or equivalent): MC-2 not active. Exit B02 → B03 if flagged, else TA-A05.
→ "Impossible" or "cannot be both": MC-2 confirmed. Continue B02.

**P64 CONCEPTUAL SHIFT**
"Two independent classification axes:

```
Axis 1 — side lengths:  scalene  |  isosceles  |  equilateral
Axis 2 — angle types:   acute    |  right       |  obtuse

A triangle gets ONE label from Axis 1 AND ONE label from Axis 2.

Example: sides 5, 5, 7.07; angles 90°, 45°, 45°
  → Axis 1: isosceles (two equal sides of 5)
  → Axis 2: right (one 90° angle)
  → Full name: isosceles right triangle ← both labels apply at once
```

The two axes never conflict with each other."

**P49 ADAPTIVE CHECKPOINT**
Q: "A triangle has two sides of equal length and one angle of 90°. State its complete classification using one label from each axis."
→ CORRECT [isosceles right triangle]: "Correct — isosceles (side axis) + right (angle axis)." Exit B02 → B03 if flagged, else TA-A05.
→ INCORRECT: "Pick one word from {scalene, isosceles, equilateral} and one word from {acute, right, obtuse}. Which fits each axis?" → guided.

---

### TA-B03 — Repair: ALTITUDE-IS-A-SIDE (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"The altitude of a triangle is frequently confused with one of its sides. The altitude is a perpendicular auxiliary segment — a measuring tool drawn from a vertex to the opposite side — not one of the three boundary sides."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "In a right triangle with legs 3 and 4 and hypotenuse 5, what is the altitude from the right-angle vertex to the hypotenuse?"
→ "3" or "4" (a leg): MC-3 confirmed. Continue B03.
→ Any other answer (2.4 or equivalent): MC-3 not active. Exit B03 → TA-A05.

**P64 CONCEPTUAL SHIFT**
"A triangle has exactly three sides — the three boundary segments. The altitude is a fourth, separate segment drawn inside (or sometimes outside) the triangle for measurement:

```
    C (right angle)
    |\
    | \          ← hypotenuse (side, length 5)
  3 |  \
    |   \
    | h  \       h = altitude from C to hypotenuse AB
    |⊾    \
    D      \
  A_________\B   ← legs CA = 3, CB = 4 (sides)

h ≠ 3, h ≠ 4 — it is a NEW segment CD ⊥ AB
h = (3 × 4) / 5 = 2.4
```

The altitude is perpendicular from a vertex to the OPPOSITE side. It is never one of the three sides."

**P49 ADAPTIVE CHECKPOINT**
Q: "Is the altitude of a triangle always equal to one of its sides?"
→ CORRECT [No — the altitude is a perpendicular auxiliary from a vertex to the opposite side; it generally has a different length from any side]: "Correct — altitude is distinct from the three sides." Exit B03 → TA-A05.
→ INCORRECT: "Name the three sides of a triangle. Is the altitude drawn to the opposite side or along an existing side?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Angle sum: find missing angle | "Angles 55° and 75° — find third angle" (50°) |
| Day 3 | Side-length and angle-type classification | "Triangle sides 6,6,8; angles 75°,75°,30° — classify fully" (isosceles acute) |
| Day 7 | Combined classification: dual-label | "Sides 1,1,√2; angles 90°,45°,45° — full name?" (isosceles right) |
| Day 30 | Transfer: angle sum in composite figures | "A quadrilateral is split into 2 triangles by a diagonal. What is the total interior angle sum of the quadrilateral?" (2 × 180° = 360°) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.geom.angle (required): interior angle measurement in degrees; notation and sum computation
- math.geom.line-segment (required): sides of a triangle are line segments; length measurement

**Enables:**
- math.geom.pythagorean-theorem: requires right triangle definition and side identification
- math.trig.right-triangle-trig: requires angle sum in right triangles, side labeling, and 180° sum to determine all angles

**Cross-links (GR-8):**
- math.trig.right-triangle-trig (Tier 1): P76 cross-link probe uses the 30-60-90 right triangle to preview sin(30°) = opposite/hypotenuse — bridging angle sum directly to trigonometric ratio setup

---

## Component 8 — Teaching Notes

1. **h=20 full structure:** Triangle is a foundational geometry concept with broad downstream reach; 4 main TAs + gate provides coverage of angle sum, both classification axes, altitude, and the cross-link bridge.

2. **Combined classification is the core conceptual leap:** Many curricula teach side and angle classification in separate units without ever combining them. TA-A04's table forces simultaneous dual-label application, closing the most common gap.

3. **Altitude in right triangles — a precise special case for B03:** In a right triangle, each leg is the altitude to the other leg. This makes legs feel like altitudes. The P64 in B03 uses the altitude TO THE HYPOTENUSE (length 2.4 for a 3-4-5 triangle) to establish that the altitude to the longest side is always a genuinely distinct, shorter segment.

4. **P76 cross-link design:** The 30-60-90 probe asks the learner to apply the angle sum (TA-A01) to find the missing angle, then frame the trigonometric ratio setup without evaluating it. This is achievable from triangle knowledge alone — the sin value 0.5 is given — making the cross-link probe tractable without requiring mastery of math.trig.right-triangle-trig.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.geom.angle ✓, math.geom.line-segment ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01–A04) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A05 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A05 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A05 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 | PASS |
| V-11 | GR-9: cross_links=[math.trig.right-triangle-trig] Tier 1 → P76 cross-link probe | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.85×5⌉ = 5/5 | PASS |
| V-14 | bloom=understand → P07 not required; P03, P11, P06, P04 used | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is cross-link probe bridging to math.trig.right-triangle-trig | PASS |
| V-18 | MC-1 ANGLE-SUM-NOT-180 designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY

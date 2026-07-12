# TEACHING BLUEPRINT — math.geom.right-triangle

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.geom.right-triangle |
| concept_name | Right Triangle |
| domain | geometry |
| difficulty | developing |
| bloom | understand |
| estimated_hours | 5 |
| mastery_threshold | 0.90 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.90 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.geom.triangle, math.geom.perpendicular-lines]
**unlocks:** [math.geom.pythagorean-theorem, math.trig.right-triangle-trig]
**cross_links:** [math.trig.right-triangle-trig] — Tier 1 concept → P76 cross-link probe

---

## Component 1 — Cognitive Map

**Core concept:** A right triangle is a triangle containing exactly one 90° angle (the right angle). The two sides adjacent to the right angle are legs; the side opposite the right angle is the hypotenuse — always the longest side. Because one angle is 90°, the two remaining angles are acute and sum to exactly 90°.

**Knowledge prerequisites activated:**
- math.geom.triangle: a triangle has three sides and three interior angles summing to 180°; angle sum gives the constraint on the acute angles
- math.geom.perpendicular-lines: the two legs of a right triangle meet at a 90° angle — they are perpendicular; this is marked with a small square ⊾

**Concept structure:**
1. **Definition**: triangle with exactly one angle equal to 90°
2. **Right angle marker**: the square symbol ⊾ placed at the vertex of the 90° angle
3. **Parts**: legs (two shorter sides adjacent to the right angle), hypotenuse (side opposite the right angle)
4. **Hypotenuse property**: opposite the right angle; always the longest of the three sides
5. **Acute angle constraint**: ∠A + ∠B = 90° when ∠C = 90°; the two acute angles are complementary

**Target understanding:** Given a right triangle description or diagram, the learner identifies the hypotenuse, finds a missing acute angle, and explains why the hypotenuse is always opposite the right angle.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | HYPOTENUSE-NOT-OPPOSITE-RIGHT-ANGLE | Right triangle shown in non-standard orientation; asked to identify hypotenuse | Identifies the side that looks longest in the diagram or the vertical/horizontal side, rather than specifically the side opposite the 90° angle | B01 |
| MC-2 | ACUTE-ANGLES-SUM-TO-180 | Given one acute angle, asked for the other | Subtracts from 180° rather than 90°; gives e.g. 180° − 35° = 145° instead of 90° − 35° = 55° | B02 |
| MC-3 | TWO-RIGHT-ANGLES-POSSIBLE | Asked whether a triangle can have two right angles | Says "yes" or tries to draw one; does not recognise that 90° + 90° = 180° exhausts the angle sum leaving 0° for the third vertex | B03 |

**FOUNDATIONAL MC:** MC-1 (HYPOTENUSE-NOT-OPPOSITE-RIGHT-ANGLE) — correct hypotenuse identification is prerequisite for the Pythagorean theorem, trigonometric ratios, and the P76 cross-link probe.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
"Corner of a door" model: a right angle is a perfect square corner — the corner of a door, a book, or a tile. A right triangle is formed by cutting that square corner diagonally: the two edges meeting at the corner are the legs; the diagonal cut is the hypotenuse — always the longest piece.

**Progression Gate (C → P):** Learner consistently identifies the right angle vertex (or square marker) and names the side opposite it as the hypotenuse, regardless of how the triangle is rotated in a diagram.
**Progression Gate (P → A):** Learner applies the acute angle sum (90°) to find missing angles and relates the right triangle to perpendicularity.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — "Square Corner" Definition and Parts (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: A door corner — the corner of a door frame is a perfect right angle (90°). If you cut diagonally across the corner, you create three pieces: two short edges (the door frame pieces) and the diagonal cut.
Target domain: Right triangle — the two legs are the short sides meeting at the right angle; the hypotenuse is the diagonal side opposite the right angle.
Mapping: two frame edges ↔ legs; diagonal cut ↔ hypotenuse; perfect square corner ↔ right angle.

Right triangle anatomy:
```
    C (right angle ⊾)
    |\
    | \  hypotenuse c
  a |  \   (opposite the right angle)
    |   \
    |    \
  B |______\ A
       b

Legs:       a = BC, b = AB  (adjacent to the right angle at C)
Hypotenuse: c = CA          (opposite the right angle at C)
Right angle: ∠C = 90°       (marked with ⊾)
Acute angles: ∠A + ∠B = 90° (complementary)
```

The hypotenuse is ALWAYS the side opposite the right angle — not the side that looks longest in a rotated diagram, but the side directly across from the ⊾ symbol.

**P49 ADAPTIVE CHECKPOINT**
Q: "In right triangle PQR with the right angle at Q, which side is the hypotenuse? Which sides are the legs?"
→ CORRECT [hypotenuse = PR (opposite ∠Q = 90°); legs = PQ and QR]: "Correct — the hypotenuse is always the side opposite the right angle." → TA-A02
→ INCORRECT [names PQ or QR as hypotenuse]: Flag MC-1. Route → B01.
→ NO_RESPONSE: "Find the vertex marked with the 90° angle. The side across from it — not touching that vertex — is the hypotenuse." → guided.

---

### TA-A02 — Representation and Acute Angle Sum (GR-1: P11 | GR-2: P49)

**P11 REPRESENTATION SHIFT**

Three representations of the right triangle:

| Representation | Form | Key information |
|---|---|---|
| Geometric | Diagram with ⊾ marker at the right-angle vertex | Identifies the right angle visually; hypotenuse is the side not touching ⊾ |
| Labeling | Sides a, b, c; angles ∠A, ∠B, ∠C = 90° | Hypotenuse = side c; c is opposite ∠C |
| Algebraic | ∠A + ∠B + ∠C = 180°; ∠C = 90° → ∠A + ∠B = 90° | Acute angles are complementary; given one, find the other by subtracting from 90° |

Finding a missing acute angle:
```
Right triangle with ∠C = 90° and ∠A = 38°

From ∠A + ∠B = 90°:
∠B = 90° − 38° = 52°

Check: 90° + 38° + 52° = 180° ✓
```

**P49 ADAPTIVE CHECKPOINT**
Q: "A right triangle has a right angle at vertex R and an angle of 27° at vertex P. (a) Find angle Q. (b) Identify the hypotenuse."
→ CORRECT [(a) ∠Q = 90° − 27° = 63°; (b) hypotenuse = PQ (opposite the right angle at R)]: "Correct." → TA-A03
→ INCORRECT [(a) gives 180° − 27° = 153°]: Flag MC-2. Route → B02.
→ INCORRECT [(b) names a leg]: Flag MC-1. Route → B01.
→ NO_RESPONSE: "The right angle uses up 90° of the 180° total. That leaves 90° for the two acute angles together." → guided.

---

### TA-A03 — Contrast with Other Triangle Types (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

| Feature | Right triangle | Acute triangle | Obtuse triangle |
|---|---|---|---|
| Angle condition | Exactly one angle = 90° | All angles < 90° | Exactly one angle > 90° |
| Example angles | 90°, 45°, 45° | 60°, 70°, 50° | 120°, 35°, 25° |
| Hypotenuse exists? | Yes — opposite the 90° angle | No hypotenuse (no right angle) | No hypotenuse (no right angle) |
| Acute angle sum | ∠A + ∠B = 90° | ∠A + ∠B + ∠C = 180°, all acute | ∠A + ∠B = 180° − obtuse |
| Angle sum check | 180° ✓ | 180° ✓ | 180° ✓ |

Can a right triangle also be obtuse? No — having one angle of 90° already satisfies the "exactly one non-acute angle" criterion; a second non-acute angle would require the angle sum to exceed 180°.

**P49 ADAPTIVE CHECKPOINT**
Q: "A triangle has angles 90°, 35°, and 55°. (a) Name its type. (b) Can this triangle also be obtuse? Explain."
→ CORRECT [(a) right triangle; (b) No — it already has a 90° angle; adding an obtuse angle would push the sum above 180°]: "Correct." → TA-A04
→ INCORRECT [(b) says yes]: Flag MC-3. Route → B03.
→ NO_RESPONSE: "Add all three angles. If one is already 90°, is there room for another angle ≥ 90°?" → guided.

---

### TA-A04 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **In right triangle ABC with ∠C = 90°, if ∠A = 38°, find ∠B.**
   *(Expected: ∠B = 90° − 38° = 52°; the two acute angles are complementary)*

2. **In a right triangle, one angle is 90°. The hypotenuse is the side opposite: the 90° angle, the 38° angle, or the 52° angle?**
   *(Expected: the side opposite the 90° angle — the hypotenuse is always opposite the right angle)*

3. **True/False:** It is possible to draw a triangle with two right angles.
   *(Expected: FALSE — two 90° angles sum to 180°, leaving 0° for the third angle; this cannot form a triangle)*

4. **A right triangle has legs of 6 cm and 8 cm, and a hypotenuse of 10 cm. A student says "the 8 cm side is the hypotenuse because it looks longest in my diagram." Is the student correct?**
   *(Expected: No — the hypotenuse is the 10 cm side because it is opposite the right angle; the visual appearance depends on orientation)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: cross-link to math.trig.right-triangle-trig — Tier 1 concept)

*Bridge to trigonometric ratios:*

"A right triangle has a right angle at vertex C and an angle of 35° at vertex A. The hypotenuse (side c, opposite the right angle) has length 15.

(a) Find angle B using the acute angle sum.
(b) Label the sides relative to ∠A: 'opposite' (the side across from ∠A), 'adjacent' (the leg next to ∠A that is not the hypotenuse), and 'hypotenuse'. Which side of the triangle is each?
(c) Using the trigonometric ratio sin(∠A) = opposite/hypotenuse and sin(35°) ≈ 0.574, find the length of the side opposite ∠A."

*(Expected:
(a) ∠B = 90° − 35° = 55°
(b) Opposite ∠A = side BC (side a); adjacent to ∠A = side AB (side b); hypotenuse = side CA (side c, opposite the right angle at C)
(c) opposite = 15 × 0.574 = 8.61)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.90; ⌈0.90×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 HYPOTENUSE-NOT-OPPOSITE-RIGHT-ANGLE first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now identify the hypotenuse and legs of any right triangle regardless of orientation, find missing acute angles using the complementary sum, and distinguish right triangles from acute and obtuse types. These skills are direct prerequisites for the Pythagorean theorem and right-triangle trigonometry."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: HYPOTENUSE-NOT-OPPOSITE-RIGHT-ANGLE (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A common error: identifying the hypotenuse by visual appearance (the side that looks longest or that is drawn horizontally) rather than by definition. The hypotenuse is the side that is opposite the right angle — this is a positional relationship, not a length comparison, and it holds regardless of how the triangle is rotated or drawn."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "In right triangle PQR with the right angle at P, name the hypotenuse." (Present the triangle rotated so QR does not look like the longest side.)
→ "QR" (the side opposite P): MC-1 not active. Exit B01 → next flagged MC or TA-A04.
→ "PQ" or "PR": MC-1 confirmed. Continue B01.

**P64 CONCEPTUAL SHIFT**
"Hypotenuse identification is a two-step procedure:

```
Step 1: Find the right angle vertex (look for the ⊾ symbol or the given 90° angle).
Step 2: The hypotenuse is the side OPPOSITE that vertex — it is the one side that does not touch the right angle.

Example (triangle rotated 45°):
         P (right angle ⊾)
        / \
       /   \
      /     \
     Q_______R   ← QR is the hypotenuse (opposite P)

QR does not look longest in this rotated view — but it IS the hypotenuse because it is opposite the right angle at P.
```

Never identify the hypotenuse by looking at which side appears longest — always use: opposite the 90° angle."

**P49 ADAPTIVE CHECKPOINT**
Q: "Right triangle with right angle at M. The three vertices are L, M, N. Name the hypotenuse."
→ CORRECT [LN — the side opposite M]: "Correct — LN does not touch vertex M and is therefore the hypotenuse." Exit B01 → B02 if flagged, else TA-A04.
→ INCORRECT: "Which vertex has the right angle? The hypotenuse is the side that does not touch that vertex." → guided.

---

### TA-B02 — Repair: ACUTE-ANGLES-SUM-TO-180 (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"The 180° total is the sum of all three angles together. When one angle is already 90°, the remaining 90° is shared by the two acute angles — so the two acute angles sum to 90°, not 180°."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "A right triangle has angles 90° and 40°. What is the third angle?"
→ "50°" (90° − 40°): MC-2 not active. Exit B02 → B03 if flagged, else TA-A04.
→ "140°" (180° − 40°) or any value > 90°: MC-2 confirmed. Continue B02.

**P64 CONCEPTUAL SHIFT**
"Subtract the right angle first, then distribute what remains:

```
Total angle sum:        ∠A + ∠B + ∠C = 180°
With ∠C = 90°:          ∠A + ∠B + 90° = 180°
Subtract 90° both sides: ∠A + ∠B = 90°

So given ∠A = 40°:
∠B = 90° − 40° = 50°   (NOT 180° − 40° = 140°)

Check: 90° + 40° + 50° = 180° ✓
```

The 90° right angle 'uses up' half the total before the two acute angles share the rest."

**P49 ADAPTIVE CHECKPOINT**
Q: "A right triangle has acute angle ∠P = 67°. Find the other acute angle ∠Q."
→ CORRECT [∠Q = 23°]: "Correct — 90° − 67° = 23°." Exit B02 → B03 if flagged, else TA-A04.
→ INCORRECT: "The two acute angles share 90°. Subtract ∠P from 90°, not from 180°." → re-prompt.

---

### TA-B03 — Repair: TWO-RIGHT-ANGLES-POSSIBLE (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Some learners believe a triangle could have two 90° angles. This is impossible: two right angles would already total 180°, leaving exactly 0° for the third angle. A triangle requires all three angles to be positive and to sum to 180°."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Can a triangle have angles 90°, 90°, and a third angle? What would the third angle be?"
→ "0° — impossible; it cannot be a triangle": MC-3 not active. Exit B03 → TA-A04.
→ Says "0° but it's a flat line" without recognizing impossibility, or says "yes, 0°": MC-3 border — continue B03 to ensure clarity.
→ Says any positive third angle: MC-3 confirmed. Continue B03.

**P64 CONCEPTUAL SHIFT**
"Apply the angle sum theorem:

```
Attempt: triangle with ∠A = 90°, ∠B = 90°
Sum so far: 90° + 90° = 180°
Third angle: ∠C = 180° − 180° = 0°

An angle of 0° means no opening — the 'third side' has zero length.
This is not a triangle; it has collapsed to a line segment.
```

A triangle requires three positive angles summing to 180°. One right angle is the maximum possible; two right angles collapse the figure."

**P49 ADAPTIVE CHECKPOINT**
Q: "Explain in one sentence why a triangle cannot have two right angles."
→ CORRECT [Two 90° angles already sum to 180°, leaving 0° for the third angle, which is not a triangle]: "Correct." Exit B03 → TA-A04.
→ INCORRECT or vague: "Add 90° + 90°. What does that leave for the third angle? Is a triangle with a 0° angle possible?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Hypotenuse identification in rotated diagrams | "Which side is the hypotenuse?" (side opposite the ⊾ marker) |
| Day 3 | Acute angle finding | "Right triangle with 53° acute angle — find the other" (37°) |
| Day 7 | Combined: identify parts and angles | "Right triangle DEF, ∠D=90°, ∠E=62°. Name hypotenuse; find ∠F." (EF; 28°) |
| Day 30 | Transfer to Pythagorean theorem preview | "In right triangle with legs 5 and 12, use a²+b²=c² to find the hypotenuse" (13) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.geom.triangle (required): angle sum theorem (180°) applied to find the acute angle constraint (90°); triangle classification framework
- math.geom.perpendicular-lines (required): the two legs meet at a right angle — the definition of perpendicularity; ⊾ is the perpendicularity marker

**Enables:**
- math.geom.pythagorean-theorem: requires knowing which side is the hypotenuse and which are legs; a² + b² = c² is stated in terms of legs a, b and hypotenuse c
- math.trig.right-triangle-trig: requires side labeling (opposite, adjacent, hypotenuse) relative to a given acute angle; acute angle sum gives all angles from one

**Cross-links (GR-8):**
- math.trig.right-triangle-trig (Tier 1): P76 cross-link probe previews sin(∠A) = opposite/hypotenuse using the right triangle's angle and side structure — learner applies the acute angle sum to find all angles, then applies the ratio using a given sin value

---

## Component 8 — Teaching Notes

1. **h=5 three-TA structure:** Right triangle is a focused definitional concept with direct downstream dependencies; 3 main TAs + gate covers definition (A01), angle arithmetic (A02), and contrast with other types (A03).

2. **Orientation invariance is the key insight for MC-1:** Many textbooks draw right triangles in standard orientation (right angle at lower left) which trains learners to use visual length rather than positional definition. TA-A01 and B01 both explicitly use non-standard orientations to break this visual dependency.

3. **P76 cross-link design:** The probe requires applying only the acute angle sum (from TA-A02) and the hypotenuse identification (from TA-A01), plus using a given sin value. This tests right-triangle mastery while previewing trigonometric ratio setup without requiring independent recall of sin values.

4. **Distinction from math.geom.triangle:** This blueprint assumes familiarity with the 180° angle sum and triangle classification from math.geom.triangle. The new content is the specialisation to the right angle, the hypotenuse naming convention, and the complementary acute angles. Do not re-teach the general triangle angle sum — only invoke it.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.geom.triangle ✓, math.geom.perpendicular-lines ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01–A03) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A04 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A04 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A04 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 | PASS |
| V-11 | GR-9: cross_links=[math.trig.right-triangle-trig] Tier 1 → P76 cross-link probe | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.90×5⌉ = 5/5 | PASS |
| V-14 | bloom=understand → P07 not required; P03, P11, P06 used | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is cross-link probe bridging to math.trig.right-triangle-trig | PASS |
| V-18 | MC-1 HYPOTENUSE-NOT-OPPOSITE-RIGHT-ANGLE designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY

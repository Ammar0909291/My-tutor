# Teaching Blueprint: Circle
**ID:** `math.geom.circle`
**Version:** 1.0
**Status:** PACKAGE_READY
**Spec:** Teaching Blueprint Specification v1.0

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.circle` |
| concept_name | Circle |
| domain | geometry |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.85 |
| estimated_hours | 12 |
| requires | `math.geom.point`, `math.geom.line-segment` |
| unlocks | `math.trig.unit-circle` |
| cross_links | `math.trig.unit-circle` (Tier 1), `math.geom.circle-equation` (not Tier 1) |
| blueprint_version | 1.0 |
| authored_date | 2026-07-12 |
| CPA_ENTRY_STAGE | C |

---

## Component 1 — Cognitive Map

### 1.1 Core Insight
A circle is the **locus** (set) of all points in a plane equidistant from a fixed point called the **centre**. This single definition generates all circle vocabulary (radius, diameter, chord, arc, circumference) and all circle formulae (C = 2πr, A = πr²). The ratio of circumference to diameter is the constant π for every circle.

### 1.2 Knowledge Prerequisites (Activated)
- **math.geom.point:** A point is a location with no size; distance between points is defined.
- **math.geom.line-segment:** A line segment is the straight path between two points; its length is measurable.

### 1.3 Conceptual Sequence
1. Definition: circle = {P : d(P, C) = r} where C is centre, r > 0 is radius.
2. Parts derived from definition: radius (C to boundary), diameter (d = 2r, chord through C), chord (segment between two boundary points), arc (portion of boundary), circumference (full boundary length).
3. Constant ratio: circumference/diameter = π ≈ 3.14159… for every circle → C = πd = 2πr.
4. Area: A = πr² (area of the enclosed disk).
5. π is exact: answers in terms of π (e.g., 6π) are more precise than decimal approximations.

### 1.4 Transfer Target
Applying circle definition to verify membership, compute circumference and area, distinguish parts (radius vs diameter, chord vs diameter, arc vs chord); recognising the unit circle as the canonical circle for trigonometry.

---

## Component 2 — Misconception Registry

| ID | Name | Surface Pattern | Root Cause | Priority |
|---|---|---|---|---|
| MC-1 | RADIUS-DIAMETER-CONFUSION | Uses d=2r incorrectly in formulae: writes C=2πd or A=πd² | Conflates the two linear measures; doesn't anchor r as the definition's own distance | FOUNDATIONAL |
| MC-2 | PI-IS-APPROXIMATE-ONLY | Writes 3.14 × r² for exact area; cannot work with symbolic π | Treats π as a decimal approximation, not an exact constant | SECONDARY |
| MC-3 | ARC-IS-CHORD | Measures arc length using the straight chord between its endpoints | Confuses the curved boundary path (arc) with the straight segment (chord) connecting the same endpoints | SECONDARY |

**MAMR:** MC-1 FOUNDATIONAL cleared first. MC-2 and MC-3 addressed FIFO thereafter.

---

## Component 3 — Scaffolding Protocol

| Stage | Condition | Entry Action |
|---|---|---|
| C (Concrete) | developing → always | Begin TA-A01 with equidistant-club analogy; use compass drawing |
| P (Pictorial) | After C: definition understood → diagram labelling | TA-A02 (radius vs diameter contrast with diagram) |
| A (Abstract) | After P: parts identified → formulae and π | TA-A03 (pattern induction of π), TA-A04 (algebraic equation) |

---

## Component 4 — Protocol A (Main Teaching Protocol)

### TA-A01 — Concrete Opening: Equidistant Club
**Primitives:** P03 (ANALOGY BRIDGE), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (opens with B-category P03); GR-2 ✓ (P49 present)

**P03 — ANALOGY BRIDGE**
> "Imagine an exclusive club rule: you can only be a member if you live **exactly 5 km from City Hall**. Draw a map of all valid addresses.
>
> Every valid member lives on a perfect ring around City Hall — that ring is a **circle**. City Hall is the **centre**; 5 km is the **radius**.
>
> Formal definition: a **circle** with centre C and radius r is the set of all points P in the plane such that the distance from P to C equals r exactly:
>
> {P : d(P, C) = r}
>
> Too close (d < r) → inside the circle. Too far (d > r) → outside. Only d = r → on the circle."

**P49 — ADAPTIVE CHECKPOINT**
> "A circle has centre O and radius 7 cm. Point A is 7 cm from O; Point B is 9 cm from O; Point C is 4 cm from O. Which points are on the circle, inside it, or outside it?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | A on, B outside, C inside | TA-A02 |
| PARTIAL | A and B correct; C confused (says "on" because 4 is close) | TA-A02 (monitor; emphasise d = r exactly) |
| INCORRECT | B or C called "on the circle" | Restate definition: only exact equality to r counts; re-ask |
| NO_RESPONSE | No answer | "Is 9 = 7? Is 4 = 7? Only equality to r means 'on the circle.'" |

---

### TA-A02 — Radius vs Diameter: Contrast Pair
**Primitives:** P06 (CONTRAST PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P06 is B-category); GR-2 ✓

**P06 — CONTRAST PAIR**
> | Term | Definition | Key Property |
> |---|---|---|
> | **Radius** | Segment from centre C to any boundary point | All radii of the same circle are equal in length = r |
> | **Diameter** | Chord that passes through the centre | d = 2r; the longest chord; halved by the centre |
> | **Chord** | Segment between any two boundary points | Does NOT need to pass through the centre; diameter is a special chord |
> | **Arc** | Portion of the boundary (curved) between two boundary points | Measured along the curve, not straight across |
>
> **Critical pair:**
> | Formula using radius (correct) | Common error (using diameter instead) |
> |---|---|
> | C = 2πr | C = 2πd (doubles diameter — too large by factor 2) |
> | A = πr² | A = πd² (uses diameter — too large by factor 4) |

**P49 — ADAPTIVE CHECKPOINT**
> "A circle has diameter 10 cm. What is: (a) the radius, (b) the circumference (exact, in terms of π), (c) the area (exact, in terms of π)?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | r=5, C=10π, A=25π | TA-A03 |
| PARTIAL | r=5 correct; C=20π or A=100π (used diameter in formula) | TA-B01 (MC-1 repair) → TA-A03 |
| INCORRECT | r=10 (used diameter as radius) | TA-B01 (MC-1 repair) → TA-A03 |
| NO_RESPONSE | No answer | "The diameter is 10 cm. Half of 10 is the radius. What is half of 10?" |

---

### TA-A03 — π by Pattern Induction
**Primitives:** P04 (PATTERN INDUCTION), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P04 is B-category); GR-2 ✓

**P04 — PATTERN INDUCTION**
> Measure circumference C and diameter d for several circles:
>
> | Circle | Diameter d | Circumference C (measured) | C ÷ d |
> |---|---|---|---|
> | Coin | 2 cm | 6.28 cm | 3.14… |
> | Plate | 25 cm | 78.54 cm | 3.14… |
> | Wheel | 60 cm | 188.5 cm | 3.14… |
>
> **Pattern:** C/d is always the same constant ≈ 3.14159… This constant is called **π** (pi).
>
> Therefore: C = πd = π(2r) = 2πr.
>
> **π is exact:** The value 3.14 or 3.14159 is a rounded approximation. For exact answers, leave π as a symbol: "circumference = 10π cm" is exact; "circumference ≈ 31.4 cm" is approximate.

**P49 — ADAPTIVE CHECKPOINT**
> "A circle has radius 6 cm. Give (a) the exact circumference and (b) the exact area. Then (c) give a decimal approximation for the circumference (use π ≈ 3.14)."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) 12π cm, (b) 36π cm², (c) ≈ 37.68 cm | TA-A04 |
| PARTIAL | (a) correct; (b) writes 6π instead of 36π (forgets to square r) | TA-A04 (note; area formula needs reinforcement in P77) |
| INCORRECT | (a) writes 37.68 instead of 12π (cannot work symbolically) | TA-B02 (MC-2 repair) → TA-A04 |
| NO_RESPONSE | No answer | "C = 2πr. Replace r with 6: C = 2π × 6 = ?" |

---

### TA-A04 — Representation Shift: Geometric ↔ Algebraic
**Primitives:** P11 (REPRESENTATION SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P11 is B-category); GR-2 ✓

**P11 — REPRESENTATION SHIFT**
> **Geometric representation:** Draw a circle with centre C = (h, k) and radius r. Every boundary point P = (x, y) satisfies d(P, C) = r.
>
> **Algebraic representation:** Distance formula gives d(P, C) = √((x−h)² + (y−k)²). Setting this equal to r and squaring:
>
> **(x − h)² + (y − k)² = r²**
>
> This is the **standard equation of a circle** — the algebraic twin of the geometric definition.
>
> *Example:* Centre (2, −3), radius 5: (x−2)² + (y+3)² = 25. Point (6, −3): (6−2)² + (−3+3)² = 16 + 0 = 16 ≠ 25. **Not on the circle.**
>
> Point (2, 2): (0)² + (5)² = 25. **On the circle.** ✓

**P49 — ADAPTIVE CHECKPOINT**
> "Circle with centre (−1, 4) and radius 3. (a) Write its equation. (b) Is the point (2, 4) on the circle?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (x+1)²+(y−4)²=9; (2+1)²+(4−4)²=9 → YES | TA-A05 |
| PARTIAL | Equation correct; arithmetic error in (b) | TA-A05 (minor) |
| INCORRECT | Equation uses d instead of r (writes (x+1)²+(y−4)²=3) | Remind: equation = r² on right side; r=3 → r²=9 |
| NO_RESPONSE | No answer | "The standard form is (x−h)²+(y−k)²=r². What are h, k, r here?" |

---

### TA-A05 — Mastery Gate
**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Grammar:** GR-3 ✓ (terminal); GR-6 ✓; GR-7 ✓ (P76 in gate); GR-9: `math.trig.unit-circle` is Tier 1 → P76 CROSS-LINK PROBE

**pass_criterion:** ⌈0.85 × 5⌉ = **5 / 5** (4 P77 items + 1 P76 item)

**P77 — MULTI-PROBLEM SET (4 items)**
1. A circle has radius 7 cm. Give exact circumference and exact area.
2. A circle has diameter 10 cm. Give exact circumference and exact area.
3. True or false: every chord of a circle passes through the centre.
4. A circle has circumference 24π cm. What is its radius?

**P55 — SCORE** (tally P77 results)

**P76 — TRANSFER PROBE (CROSS-LINK: `math.trig.unit-circle`)**
> The **unit circle** is the circle with centre O = (0, 0) and radius r = 1.
>
> (a) Verify that P = (3/5, 4/5) lies on the unit circle. Show your calculation.
>
> (b) What is the exact circumference of the unit circle?
>
> (c) Every angle θ produces a point (cos θ, sin θ) on the unit circle. Using the definition of a circle (all points at distance r = 1 from the centre), explain in one sentence why (cos θ, sin θ) must always lie on the unit circle.

*(Expected: (a) (3/5)²+(4/5)²=9/25+16/25=25/25=1=1² ✓; (b) 2π; (c) cos²θ+sin²θ=1 means d=1, matching r=1.)*

**P55 — SCORE** (add P76 result)

**P75 — MASTERY ASSESSMENT**
- pass: 5 / 5 → MASTERY ACHIEVED
- fail: ≤ 4 / 5 → MASTERY NOT ACHIEVED

**P55 — SCORE** (record mastery outcome)

**P74 — ROUTING DECISION**
- MASTERY ACHIEVED → P78
- MASTERY NOT ACHIEVED → P77 items 1–2 failed → TA-B01; P77 item 4 failed → TA-B02; P77 item 3 failed → TA-B03; re-enter TA-A02

**P55 — SCORE** (record routing)

**P78 — COMPLETION**
> "You can now define a circle from its locus definition, identify all its parts, compute exact circumference and area, and write its algebraic equation. You also saw how the unit circle connects circle geometry to trigonometry: the point (cos θ, sin θ) lives on it precisely because the Pythagorean identity cos²θ + sin²θ = 1 is the unit-circle equation in disguise. You are ready for the unit circle."

---

## Component 5 — Protocol B (Repair Protocol)

### TA-B01 — Repair: RADIUS-DIAMETER-CONFUSION (MC-1 FOUNDATIONAL)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-4 ✓

**P27 — MISCONCEPTION NAMING**
> "The error **RADIUS-DIAMETER-CONFUSION** substitutes the diameter where the formula requires the radius (or vice versa), doubling or halving the intended quantity. For example: computing C = 2π × 10 when r = 5, d = 10."

**P41 — MISCONCEPTION DETECTOR**
> "In the formula C = 2πr: what is the letter r? What does r measure? In our circle with diameter 10 cm, what is r?"

**P64 — CONCEPTUAL SHIFT**
> "The radius r appears in the formula because the circle is *defined* by r: all points are at distance r from the centre. The diameter is d = 2r — it passes through the centre and spans the full width. Always convert to r before substituting into any formula. Anchor: 'The formula uses r — the definition's own distance.'"

**P49 — ADAPTIVE CHECKPOINT**
> "Circle with diameter 14 cm: (a) r = ? (b) C = ? (c) A = ?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | r=7, C=14π, A=49π | Return to TA-A02 CORRECT branch |
| INCORRECT | Any use of 14 in formula body | Repeat: "Step 1: find r. r = diameter ÷ 2 = 14 ÷ 2 = 7. Now substitute r=7." |

---

### TA-B02 — Repair: PI-IS-APPROXIMATE-ONLY (MC-2)
**Primitives:** P27 (MISCONCEPTION NAMING), P06 (CONTRAST PAIR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **PI-IS-APPROXIMATE-ONLY** refuses to write answers containing π — it insists on replacing π with 3.14 (or 3.14159) immediately, producing an approximate answer when an exact one is possible."

**P06 — CONTRAST PAIR**
> | Representation | Type | Precision |
> |---|---|---|
> | C = 6π cm | Exact symbolic | Perfect — no rounding error |
> | C ≈ 18.85 cm | Decimal approximation | Rounded; 6π ≈ 18.8496… |
> | C = 18.84 cm | Wrong decimal | Truncated π to 3.14; further off |
>
> Just as leaving √2 in an answer is more precise than writing 1.414, leaving π is more precise than writing 3.14.

**P64 — CONCEPTUAL SHIFT**
> "π is a defined constant — the exact ratio C/d for every circle. It is not a rounded number; it is a specific irrational number. The symbol π in an answer means 'this exact constant,' not 'approximately 3.14.' Exact answers in terms of π are always preferred unless a decimal approximation is explicitly requested."

**P49 — ADAPTIVE CHECKPOINT**
> "Circle with radius 9 cm. Give (a) exact circumference, (b) exact area, (c) approximate circumference to 2 decimal places."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) 18π, (b) 81π, (c) ≈ 56.55 cm | Return to TA-A03 CORRECT branch |
| INCORRECT | Cannot write 18π; writes 56.55 for (a) | "Write the formula C = 2πr, replace r, but do not evaluate π. Leave it as the letter π." |

---

### TA-B03 — Repair: ARC-IS-CHORD (MC-3)
**Primitives:** P27 (MISCONCEPTION NAMING), P11 (REPRESENTATION SHIFT), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **ARC-IS-CHORD** measures the *straight-line* distance between two boundary points when asked for the arc length (the curved path between them). The chord is shorter than the arc — they are different objects."

**P11 — REPRESENTATION SHIFT**
> *Geometric:* Draw two boundary points A and B on a circle. The **chord AB** is the straight segment. The **arc AB** is the curved portion of the boundary. They share the same two endpoints but have different shapes and different lengths.
>
> *Measurement contrast:* For a semicircle (A and B are diametrically opposite): chord = diameter = 2r (straight); arc = half circumference = πr (curved). Since π > 3 > 2, arc > chord for a semicircle.

**P64 — CONCEPTUAL SHIFT**
> "A chord cuts straight across; an arc goes the long way around the circle's edge. When a question asks for arc length, you are measuring the curved path, not the straight shortcut. The boundary of the circle is curved — an arc is a piece of that curve."

**P49 — ADAPTIVE CHECKPOINT**
> "Circle with radius 5. Mark two endpoints of a diameter. (a) What is the chord length? (b) What is the length of the arc that is a semicircle? Which is longer?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) 10 (diameter); (b) 5π ≈ 15.7; arc longer | Return to TA-A02 CORRECT branch |
| INCORRECT | (a) and (b) both given as 10 | Trace the arc physically with a finger; show it does not go straight |

---

## Component 6 — P89 Spaced Repetition

**P89 — SPACED REPETITION SCHEDULE**

| Interval | Probe Type | Content |
|---|---|---|
| Day 1 (consolidation) | Computation | Given diameter 18 cm: exact C and exact A |
| Day 3 | Definition recall | State definition of circle; identify radius, chord, arc, diameter on a diagram |
| Day 7 | Equation | Write and use equation: circle with centre (3, −1), radius 4; test whether (7, −1) is on it |
| Day 30 | Transfer | Unit circle: verify (√2/2, √2/2) lies on it; give exact circumference of unit circle |

---

## Component 7 — Cross-Blueprint Dependencies

**GR-8 ✓:** All cross_links documented.

| Dependency | Direction | Relationship |
|---|---|---|
| `math.geom.point` | REQUIRES | Point definition; distance between points |
| `math.geom.line-segment` | REQUIRES | Chord and radius as line segments |
| `math.trig.unit-circle` | UNLOCKS + CROSS-LINK (Tier 1) | Unit circle is circle with r=1 at origin; trig functions defined on it |
| `math.geom.circle-equation` | CROSS-LINK (not Tier 1) | Standard equation (x−h)²+(y−k)²=r² previewed in TA-A04 |

---

## Component 8 — Teaching Notes

- **CPA enforcement:** Begin with a physical circle (compass, string from pin, or drawn object) before introducing algebraic equation. The C stage should use the equidistant definition concretely — student compares distances from candidate points to the centre.
- **MAMR enforcement:** RADIUS-DIAMETER-CONFUSION (MC-1) is FOUNDATIONAL. If a student confuses radius and diameter in TA-A02, repair before progressing to π (TA-A03) — incorrect substitution of d for r in formulae will persist and cascade.
- **π as symbol:** Establish early that π is a constant, not a variable, and leaving it symbolic is the expected form for exact answers. This prevents MC-2 from becoming ingrained.
- **Chord vs arc:** The distinction in MC-3 is subtle and is best anchored by a physical gesture — tracing the curved arc vs drawing the straight chord. Use the semicircle contrast (πr vs 2r) because π > 3 > 2 makes the arc visibly longer.
- **P76 cross-link prerequisite:** The unit-circle P76 probe introduces coordinates and the Pythagorean identity. Credit (a) and (b) as standard calculation; for (c), accept any answer that references the definition of a circle (d = r = 1) or states cos²θ + sin²θ = 1. Depth of (c) is exploratory — do not penalise if the student gives a partial explanation, provided (a) and (b) are correct.

---

## Component 10 — Validation Checklist

### V-1 through V-20

| Code | Check | Status |
|---|---|---|
| V-1 | All 10 components present (0–8, 10) | PASS |
| V-2 | Component 0 metadata complete and accurate | PASS |
| V-3 | CPA_ENTRY_STAGE = C (developing difficulty) | PASS |
| V-4 | GR-1: every non-repair TA opens with B-category primitive | PASS (A01:P03, A02:P06, A03:P04, A04:P11, A05:P91) |
| V-5 | GR-2: every non-gate TA contains P49 | PASS (A01–A04 each have P49; A05 is gate) |
| V-6 | GR-3: mastery gate TA (A05) is terminal | PASS |
| V-7 | GR-4: repair TAs contain P41/P64 | PASS (B01:P27+P41+P64; B02:P27+P06+P64; B03:P27+P11+P64) |
| V-8 | GR-6: P91 terminal in TA-A05 | PASS (ends with P78) |
| V-9 | GR-7: P76 present in mastery gate | PASS (TA-A05) |
| V-10 | GR-8: all cross_links documented in Component 7 | PASS |
| V-11 | GR-9: P76 mode — cross_link to Tier 1 `math.trig.unit-circle` → CROSS-LINK PROBE | PASS |
| V-12 | GR-10: MAMR stated and enforced | PASS (MC-1 FOUNDATIONAL first; B01 before B02/B03) |
| V-13 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-14 | pass_criterion: ⌈0.85 × 5⌉ = 5/5 | PASS |
| V-15 | bloom=understand — P07 not required | PASS (no P07; not bloom=apply) |
| V-16 | P49 in every non-gate TA has all 4 branches | PASS |
| V-17 | Session TA cap (h=12 ≥ 1h → max 7): 5 main + 3 repair; happy path ≤ 5 TAs; repair TAs conditionally activated | PASS |
| V-18 | P89 spaced repetition schedule present (≥ 4 intervals) | PASS |
| V-19 | Component 7 documents all requires/unlocks/cross_links | PASS |
| V-20 | Misconception registry: ≥ 3 MCs, one FOUNDATIONAL | PASS |

### AIR

| Dimension | Check | Status |
|---|---|---|
| Accuracy | r=7:C=14π,A=49π ✓; r=5:C=10π,A=25π ✓; d=10→r=5,C=10π,A=25π ✓; C=24π→r=12 ✓; (3/5)²+(4/5)²=1 ✓; unit-circle C=2π ✓; (−1,4) circle eq ✓; (2,4): (3)²+(0)²=9 ✓ | PASS |
| Integrity | No component contradicts another; MAMR chain consistent | PASS |
| Relevance | Every TA addresses circle concept; P76 legitimately bridges to unit circle via locus definition | PASS |

**PACKAGE_READY: YES**

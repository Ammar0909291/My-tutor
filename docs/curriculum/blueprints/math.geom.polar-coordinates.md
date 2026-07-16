# Teaching Blueprint — math.geom.polar-coordinates

## Component 0 — Metadata
concept_id: math.geom.polar-coordinates
concept_name: Polar Coordinates
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: advanced
bloom: apply
estimated_hours: 8
mastery_threshold: 0.75
CPA_entry_stage: C
requires: [math.geom.coordinate-plane, math.trig.trig-functions]
cross_links: [math.cx.complex-numbers-analysis]
P76_mode: cross-link-probe

---

## Component 1 — Cognitive Map

**Core concept:** Polar coordinates describe the location of a point using distance r from the origin and angle θ from the positive x-axis (measured counter-clockwise). The Cartesian-polar conversion formulas are: x=r cos θ, y=r sin θ (polar→Cartesian); r=√(x²+y²), θ=arctan(y/x) with quadrant adjustment (Cartesian→polar). Negative r is valid: (−r, θ) denotes the same point as (r, θ+π). Polar representation is non-unique: (r, θ) and (r, θ+2πn) describe the same point; so do (−r, θ+π).

**Conceptual progression:**
1. Polar grid: concentric circles (constant r), rays from origin (constant θ). A point P=(r,θ) lies at distance r on the ray at angle θ.
2. Cartesian conversion: x=r cos θ, y=r sin θ. Inverse: r=√(x²+y²), θ chosen by quadrant (atan2 function).
3. Negative r: reflects through the origin. (−2, π/4) = (2, π/4+π) = (2, 5π/4).
4. Non-uniqueness: infinitely many polar pairs for each point. Standardise: r≥0 and θ∈[0,2π) for a canonical form.
5. Geometric interpretation: circles centred at origin have equation r=c; rays have equation θ=α. Comparing to Cartesian: x²+y²=c² (circle), y=x tan α (ray) — polar is simpler for these.

**CPA arc (entry: C — advanced difficulty):**
- Concrete: navigator/radar analogy — a ship's radar gives bearing (angle) and range (distance), not x/y grid coordinates. Polar coordinates are the natural language of direction and distance.
- Pictorial: polar grid with key points plotted; Cartesian grid with the same points; conversion diagram.
- Abstract: (r,θ) ↔ (r cos θ, r sin θ); r²=x²+y².

**Prior knowledge activated:** coordinate-plane (math.geom.coordinate-plane) — Cartesian system, quadrant location; trig functions (math.trig.trig-functions) — sin, cos, tan as real-valued functions; arc-length of a circle; distance formula.

---

## Component 2 — Misconception Registry

### MC-1: POLAR-POINT-AS-CARTESIAN [FOUNDATIONAL]
**Description:** Learner plots (r,θ) as if it were (x,y) in a Cartesian grid — treats r as the horizontal coordinate and θ as the vertical coordinate. A point (3, π/2) is plotted at Cartesian (3, π/2≈1.57) instead of at Cartesian (0,3).
**Surface form:** "The point (3, π/2) goes 3 units right and π/2 units up."
**Root cause:** Coordinate pair notation (a,b) always meant (x,y) in Cartesian work. The learner does not recognise that in polar notation the same format encodes a completely different location scheme.
**Trigger condition:** Any plotting or interpretation of a polar point.
**Repair target:** TA-B01.

### MC-2: NEGATIVE-R-IS-UNDEFINED
**Description:** Learner rejects negative r values as meaningless or invalid, either skipping them or setting r=|r|, thereby misplotting or misidentifying the point.
**Surface form:** "r can't be negative — distance is always positive. So (−2, π/6) doesn't exist."
**Root cause:** Distance in Cartesian geometry is always non-negative (r=√(x²+y²)≥0). The convention of allowing negative r as "extend backward through the origin" was never introduced.
**Trigger condition:** Any polar point or equation with negative r.
**Repair target:** TA-B02.

### MC-3: UNIQUE-POLAR-REPRESENTATION
**Description:** Learner believes each point has exactly one polar representation, analogous to Cartesian uniqueness. Fails to recognise that adding 2π to θ, or negating r and adding π to θ, gives the same point.
**Surface form:** "The polar form of (0,3) is (3, π/2). It can't also be (3, 5π/2) — that's a different representation."
**Root cause:** In Cartesian coordinates, each point has exactly one ordered pair (x,y). The learner applies this uniqueness assumption to polar coordinates without noticing the angular periodicity and the (−r, θ+π) equivalence.
**Trigger condition:** Any problem asking for all polar representations, or any equation with multiple solution angles.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "A point P is at distance 5 from the origin and at angle 60° from the positive x-axis. What are its Cartesian coordinates?" If the learner applies x=5 cos 60°=5/2 and y=5 sin 60°=5√3/2 correctly, proceed to A01. This confirms conversion formula readiness.

**Scaffolding ladder:**
- Rung 1 (concrete): radar screen with two ships described by (range, bearing) — show that (3, 30°) is not the same as Cartesian point (3, 30).
- Rung 2 (pictorial): polar grid with key points annotated; learner maps each to the Cartesian grid by conversion.
- Rung 3 (full apply): learner converts in both directions and handles negative r and equivalent representations.

**Pacing note:** h=8 estimated hours; A01 in sessions 1–2; A02 in sessions 3–4; A03 + mastery gate in sessions 4–5.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Radar / navigator addressing.
"A ship's radar reports: bearing 060° (measured clockwise from North in navigation), range 12 km. A different ship: bearing 135°, range 8 km. These two numbers — direction and distance — completely identify each ship's position without a grid."

TARGET DOMAIN: Polar coordinates.
"The polar system works the same way: angle θ (counter-clockwise from positive x-axis) + distance r from origin. A point is identified as (r, θ), read as 'r units out along the θ-ray.'
Example: (4, π/3) = 4 units out along the ray at 60° from the x-axis."

CONVERSION BRIDGE:
"To convert to Cartesian — project onto the x and y axes using trigonometry:
x = r cos θ (horizontal component)
y = r sin θ (vertical component)
Example: (4, π/3): x=4·cos(π/3)=4·(1/2)=2; y=4·sin(π/3)=4·(√3/2)=2√3. Cartesian: (2, 2√3). ✓ Check: distance=√(4+12)=√16=4 ✓."

BRIDGE MAPPING:
| Navigation | Polar math |
|---|---|
| Range (distance from radar) | r ≥ 0 (or any real) |
| Bearing (direction angle) | θ (from positive x-axis, CCW) |
| Report format: (range, bearing) | Polar point: (r, θ) |
| Convert to grid: x=range·cos(bearing), y=range·sin(bearing) | x=r cos θ, y=r sin θ |

**Assessment primitive: P49**

PROBE: "Convert the polar point (3, π/2) to Cartesian coordinates."
- CORRECT: "x=3 cos(π/2)=3·0=0; y=3 sin(π/2)=3·1=3. Cartesian: (0,3)." → proceed to A02.
- PARTIAL: correct formula, arithmetic error → "cos(π/2)=0 and sin(π/2)=1. So x=3·0=0; y=3·1=3. Cartesian: (0,3)."
- INCORRECT: plots as Cartesian (3, π/2≈1.57) → Repair with B01 (POLAR-POINT-AS-CARTESIAN). "(r,θ) is not (x,y). Apply the conversion: x=r cos θ, y=r sin θ."
- NO_RESPONSE: "r=3, θ=π/2=90°. x=3·cos 90°=0; y=3·sin 90°=3. The point (3, π/2) in polar is (0,3) in Cartesian — it lies on the positive y-axis."

---

### TA-B01 — Repair for MC-1 (POLAR-POINT-AS-CARTESIAN)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'polar coordinates (r,θ) are plotted the same way as Cartesian (x,y).' They are not. (r,θ) means: go to angle θ, travel r units along that direction. Apply conversion: x=r cos θ, y=r sin θ."

**P41 — MISCONCEPTION DETECTOR**
"Where is the polar point (2, π)?
(A) At Cartesian (2, π≈3.14) — 2 units right, 3.14 units up.
(B) At Cartesian (−2, 0) — on the negative x-axis, because x=2 cos π=−2, y=2 sin π=0."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"The two coordinate systems use the SAME parenthesis notation but encode DIFFERENT information. Cartesian (x,y): go x units right and y units up. Polar (r,θ): face angle θ from the positive x-axis, walk r steps forward. The only way to translate is via x=r cos θ and y=r sin θ. Draw the polar grid alongside the Cartesian grid: the radial lines (fixed θ) and circles (fixed r) are very different from the rectangular grid lines."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Cartesian to polar:
Convert (−3, 3) to polar form.
r = √(x²+y²) = √(9+9) = √18 = 3√2.
θ: tan θ = y/x = 3/(−3) = −1. Basic angle: arctan(1)=π/4.
But (−3,3) is in Q2 (x<0, y>0) → θ = π − π/4 = 3π/4.
Polar form: (3√2, 3π/4). Check: x=3√2·cos(3π/4)=3√2·(−√2/2)=−3 ✓; y=3√2·sin(3π/4)=3√2·(√2/2)=3 ✓.

WORKED EXAMPLE 2 — Negative r:
Plot (−4, π/6) and find the equivalent positive-r form.
"Negative r means: face angle π/6, then walk backward (opposite direction)."
Equivalent: r=+4 at angle π/6+π = 7π/6. Canonical polar form: (4, 7π/6).
Cartesian: x=−4·cos(π/6)=−4·(√3/2)=−2√3; y=−4·sin(π/6)=−4·(1/2)=−2.
Or using canonical: x=4·cos(7π/6)=4·(−√3/2)=−2√3 ✓; y=4·sin(7π/6)=4·(−1/2)=−2 ✓.

CONVERSION ALGORITHM (Cartesian→Polar):
1. Compute r=√(x²+y²).
2. Compute θ=atan2(y,x): arctan(y/x) adjusted by quadrant:
   - Q1: θ=arctan(y/x)
   - Q2: θ=π+arctan(y/x)
   - Q3: θ=π+arctan(y/x)
   - Q4: θ=2π+arctan(y/x)  (or equivalently: θ=arctan(y/x) which is negative)
3. State r and θ; verify by converting back.

**Assessment primitive: P49**

PROBE: "Convert the Cartesian point (−1, −√3) to polar form with r>0 and θ∈[0,2π)."
- CORRECT: "r=√(1+3)=2. tan θ=−√3/−1=√3; basic angle=π/3. Q3 (both negative): θ=π+π/3=4π/3. Polar: (2, 4π/3). Check: x=2 cos(4π/3)=2·(−1/2)=−1 ✓; y=2 sin(4π/3)=2·(−√3/2)=−√3 ✓." → proceed to A03.
- PARTIAL: correct r, wrong quadrant for θ (gives π/3 instead of 4π/3) → "arctan(√3)=π/3 gives the Q1 reference angle. But (−1,−√3) is in Q3 (both negative). Q3: θ=π+π/3=4π/3."
- INCORRECT: converts negative r to positive by r=|r| but keeps wrong θ → Repair with B02 if learner thinks (−r,θ) means r=|r|. "The point (−1,−√3) has r=2 (positive); the issue is θ, not r."
- NO_RESPONSE: "Step 1: r=√(1+3)=2. Step 2: locate the quadrant — x=−1<0 and y=−√3<0 → Q3. Reference angle: arctan(|y|/|x|)=arctan(√3)=π/3. Q3 angle: θ=π+π/3=4π/3."

---

### TA-B02 — Repair for MC-2 (NEGATIVE-R-IS-UNDEFINED)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'r cannot be negative.' In polar coordinates, negative r IS defined: it means travel in the direction opposite to angle θ. (−r, θ) represents the same point as (r, θ+π)."

**P41 — MISCONCEPTION DETECTOR**
"Where is (−3, 0)?
(A) Undefined — r must be non-negative.
(B) At Cartesian (−3, 0) — the point on the negative x-axis, because face θ=0 and walk −3 (backward)."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"The convention: face the direction θ, then move |r| steps. If r>0: move forward. If r<0: move backward (flip direction = add π to angle). (−3, 0): face 0°, walk backward 3 steps → arrive at (−3,0) in Cartesian. Equivalent form: (3, π). Verify: x=3 cos π=−3, y=3 sin π=0. Same point. Negative r is a valid, useful convention that appears naturally in polar equation solutions."

→ Return to A02.

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Cartesian uniqueness vs polar non-uniqueness:
- Cartesian: every point has EXACTLY ONE pair (x,y). Uniqueness is absolute.
- Polar: every point has INFINITELY MANY representations.
  - Adding 2πn to θ: (r, θ) = (r, θ+2πn) for any integer n.
  - Negating r and adding π: (r, θ) = (−r, θ+π).
  - Combining: (r, θ) = (−r, θ+(2n+1)π) for any integer n.

PAIR B — Standard (canonical) polar form:
For unambiguous communication, choose: r≥0 and θ∈[0,2π) (or θ∈(−π,π]).
Under this canonical convention, the point has at most one representation (two representations if r=0, since all (0,θ) are the same point — the origin).

ILLUSTRATIVE TABLE for the point (0,2) [Cartesian]:
| Polar representation | Valid? |
|---|---|
| (2, π/2) | ✓ canonical |
| (2, 5π/2) | ✓ same point, θ=π/2+2π |
| (−2, 3π/2) | ✓ same point, r negative |
| (2, −3π/2) | ✓ same point, θ=π/2−2π |

GEOMETRIC INTUITION: The polar grid has circles (r=const) and rays (θ=const). Moving along the same circle in steps of 2π brings you back to the start. The "backward" direction along the opposite ray is the negative-r convention.

EQUATIONS IN POLAR:
Simple shapes: r=a is a circle (radius a, centred at origin); θ=α is a ray.
Compare Cartesian: x²+y²=a² (circle — harder to read as a unit distance); y=x tan α (ray — requires slope).
Polar is the natural coordinate system for problems involving radial symmetry.

**Assessment primitive: P49**

PROBE: "Give three distinct polar representations of the Cartesian point (2, 0)."
- CORRECT: Any three of: (2, 0), (2, 2π), (2, −2π), (−2, π), (−2, −π), (2, 4π), etc. → proceed to A04.
- PARTIAL: gives two but claims a third is "the same": → "Each of (2,0), (2,2π), and (−2,π) are distinct polar pairs — they look different as ordered pairs — but all correspond to the same Cartesian point (2,0). All three are valid."
- INCORRECT: gives only one and says representation is unique → Repair with B03 (UNIQUE-POLAR-REPRESENTATION).
- NO_RESPONSE: "Start with canonical: r=2, θ=0 → (2,0). Add 2π: (2,2π). Negate r and add π: (−2,π). All three represent (2,0) in Cartesian."

---

### TA-B03 — Repair for MC-3 (UNIQUE-POLAR-REPRESENTATION)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'each point has exactly one polar representation.' Unlike Cartesian coordinates, polar representations are not unique — adding 2π to θ or negating r and adding π to θ gives the same geometric point."

**P41 — MISCONCEPTION DETECTOR**
"Is (3, π/4) the same point as (3, π/4+2π)?
(A) No — they have different θ-values.
(B) Yes — they are the same geometric point because 2π is one full revolution."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"Angle θ and θ+2π describe the same direction — one full revolution brings the ray back to the same position. So (r,θ) and (r,θ+2πn) for any integer n are the same polar point. Additionally, (r,θ) and (−r,θ+π) are the same point — the backward-direction convention. This means every point has infinitely many polar representations. When solving polar equations, you may find multiple valid θ-values for the same geometric solution — all correct. Only a canonical convention (r≥0, θ∈[0,2π)) picks one per point."

→ Return to A03.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (POLAR-POINT-AS-CARTESIAN)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (NEGATIVE-R-IS-UNDEFINED)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (UNIQUE-POLAR-REPRESENTATION)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A03.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Convert the polar equation r=4 sin θ to a Cartesian equation and identify the curve."
[Expected: Multiply both sides by r: r²=4r sin θ. Substitute: x²+y²=4y → x²+y²−4y=0 → x²+(y−2)²=4. A circle centred at (0,2) with radius 2.]

**Day 10 prompt:**
"Find all polar representations of the origin (0,0)."
[Expected: The origin has r=0 for any θ. So (0,θ) for any real θ represents the origin. It has infinitely many polar representations — uniqueness fails most severely at the origin.]

**Day 30 prompt:**
"Show that the polar curve r=cos θ is a circle. Find its Cartesian equation and state the centre and radius."
[Expected: Multiply both sides by r: r²=r cos θ. So x²+y²=x → x²−x+y²=0 → (x−1/2)²+y²=1/4. Circle centred at (1/2, 0) with radius 1/2.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.geom.coordinate-plane — Cartesian system, plotting, distance formula, quadrant identification; polar coordinates extend this system
- math.trig.trig-functions — sin and cos as functions of angle; without these, the conversion x=r cos θ, y=r sin θ cannot be applied

**Unlocked blueprints:**
- math.geom.polar-curves — graphs of polar equations (spirals, roses, limaçons); require fluent polar-Cartesian conversion and non-uniqueness understanding
- math.cx.complex-numbers-analysis — complex polar form r(cos θ+i sin θ); (r,θ) in polar coordinates is exactly the modulus and argument of a complex number

**Cross-links:** math.cx.complex-numbers-analysis (TIER 1) — P76 cross-link probe.

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (POLAR-POINT-AS-CARTESIAN) must be detected and repaired immediately — an uncorrected MC-1 learner will plot every polar point incorrectly. The radar analogy and explicit side-by-side comparison of the two grids is the primary corrective tool.

**Conversion direction as a consistent habit:** Establish a clear direction convention: polar-to-Cartesian uses (x=r cos θ, y=r sin θ); Cartesian-to-polar requires the atan2 quadrant analysis, not just arctan(y/x). The single most common error in Cartesian-to-polar is assigning the wrong quadrant for θ.

**Negative r: normalise the convention, not the avoidance:** Rather than avoiding negative r (MC-2), introduce it as a feature that simplifies certain equations. The key connection: (−r,θ) = (r,θ+π). Show this geometrically and algebraically. It reappears in polar curve sketching and complex number argument calculations.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07, A03: P06
- [x] V-3: CPA_entry_stage=C (advanced difficulty); concrete anchor included in A01 (radar/navigator analogy) ✓
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = cross-link-probe; cross-linked Tier 1 concept is math.cx.complex-numbers-analysis; P76 probe connects polar coordinates to complex polar form (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 cross-link probe connects (r,θ) in polar to (r, arg z) in complex numbers via a novel conversion problem
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.75 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All conversion formulas, canonical form conventions, negative r interpretation, and worked examples verified; atan2 quadrant logic is standard; no fabricated coordinate rules

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.75 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Convert the polar point (6, π/3) to Cartesian coordinates."
[Expected: x=6 cos(π/3)=6·(1/2)=3; y=6 sin(π/3)=6·(√3/2)=3√3. Cartesian: (3, 3√3).]

**Item 2:**
"Convert the Cartesian point (0,−5) to polar form with r>0 and θ∈[0,2π)."
[Expected: r=5; (0,−5) is on the negative y-axis: θ=3π/2. Polar: (5, 3π/2).]

**Item 3:**
"Where is the polar point (−3, π/4)? Give the equivalent positive-r polar form."
[Expected: Negative r: reflect through origin. θ=π/4+π=5π/4. Positive-r form: (3, 5π/4). Cartesian: x=3 cos(5π/4)=3·(−√2/2)=−3√2/2; y=3 sin(5π/4)=−3√2/2.]

**Item 4:**
True or False: "Every point has exactly one polar representation."
[Expected: FALSE. Adding 2πn to θ or using (−r, θ+π) gives alternative valid representations of the same point. Only a canonical convention (r≥0, θ∈[0,2π)) ensures uniqueness.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (cross-link probe: math.cx.complex-numbers-analysis)

"The complex number z = 1+i can be written in polar form r(cos θ + i sin θ), where r is the modulus and θ is the argument.

(a) Find r = |z| and θ = arg(z) for z=1+i.
(b) Write z in polar form.
(c) How does (r, θ) here correspond to the polar coordinate (r, θ) of the point (1, 1) in the Cartesian plane?
(d) Compute z² using the polar form and verify with direct multiplication."

[Expected:
(a) r=|1+i|=√(1²+1²)=√2. θ=arctan(1/1)=π/4 (Q1). arg(z)=π/4.
(b) z=√2(cos(π/4)+i sin(π/4)).
(c) The Cartesian coordinates of z are (Re(z), Im(z))=(1,1). The polar coordinate (r,θ)=(√2, π/4) describes the same point (1,1) in the coordinate plane — the complex number's polar form IS the polar coordinate representation of the point (a,b) when z=a+bi.
(d) z²: r²=2; θ doubled=π/2. z²=2(cos(π/2)+i sin(π/2))=2(0+i)=2i. Verify: (1+i)²=1+2i+i²=1+2i−1=2i ✓.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (a) gives r=√2 and θ=π/4, (b) is correct, (c) correctly identifies the connection between complex polar form and geometric polar coordinates, and (d) gives z²=2i; 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner can convert in both directions, handle negative r, recognise non-uniqueness, and connect polar coordinates to complex polar form.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 (plots as Cartesian): → TA-B01 (POLAR-POINT-AS-CARTESIAN), then re-gate
- FAIL on Item 3 (rejects negative r or mishandles it): → TA-B02 (NEGATIVE-R-IS-UNDEFINED), then re-gate
- FAIL on Item 4 (TRUE): → TA-B03 (UNIQUE-POLAR-REPRESENTATION), then re-gate
- FAIL on Item 2 (wrong θ quadrant): → return to A02; re-drill Cartesian-to-polar quadrant analysis; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 4/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated ability to convert between polar and Cartesian coordinates, handle negative r and non-unique representations, and connect polar coordinates to complex polar form.

Key anchors to carry forward:
- Polar → Cartesian: x=r cos θ, y=r sin θ.
- Cartesian → Polar: r=√(x²+y²); θ from atan2(y,x) with quadrant adjustment.
- Negative r: (−r,θ)=(r,θ+π). Walk backward = flip the direction.
- Non-uniqueness: (r,θ) = (r,θ+2πn) = (−r,θ+(2n+1)π).
- Complex connection: z=a+bi has modulus r=|z| and argument θ=arg(z); polar form z=r(cos θ+i sin θ) exactly mirrors the polar coordinate (r,θ) of the point (a,b).

Next concepts: math.geom.polar-curves (roses, limaçons, spirals), math.cx.complex-numbers-analysis (De Moivre's theorem, complex multiplication in polar form)."

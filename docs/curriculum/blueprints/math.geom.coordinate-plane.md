# Teaching Blueprint: math.geom.coordinate-plane
**Blueprint Specification Version:** 1.0
**Status:** PACKAGE_READY
**Last Validated:** 2026-07-12

---

## Component 0 — Metadata

```yaml
concept_id: math.geom.coordinate-plane
concept_name: Coordinate Plane
domain: geometry
difficulty: developing
bloom_level: understand
mastery_threshold: 0.90
estimated_hours: 6
prerequisites:
  - math.geom.plane
  - math.found.real-numbers
unlocks:
  - math.geom.distance-formula
  - math.geom.midpoint-formula
  - math.geom.slope
  - math.geom.line-equation
cross_links:
  - math.func.graph-of-function
cpa_entry_stage: C
session_ta_cap: 7
mamr_policy: MC-1 FOUNDATIONAL cleared first; MC-2 and MC-3 FIFO after
pass_criterion: "⌈0.90 × 5⌉ = 5 out of 5 (4 P77 items + 1 P76 item)"
```

---

## Component 1 — Cognitive Map

### Core Insight
The Cartesian coordinate plane pairs every point in the plane ℝ² with a unique ordered pair (x, y) by measuring signed horizontal distance (x) and signed vertical distance (y) from a fixed origin. Order matters: (3, −2) and (−2, 3) are different points. Sign matters: (3, 2) and (−3, 2) are reflections across the y-axis.

### Conceptual Hierarchy
```
Level 0 (Concrete): Grid paper with origin marked; plot and read specific points.
Level 1 (Pictorial): Full Cartesian plane with labelled axes, quadrant labels, scale marks.
Level 2 (Abstract): ℝ² as a set of ordered pairs; axes as real number lines; quadrant sign rules.
Level 3 (Transfer): Connect coordinate geometry to distance/slope/line-equation concepts.
```

### Core Definitions
```
Coordinate plane (Cartesian plane): two perpendicular real number lines,
  x-axis (horizontal) and y-axis (vertical), intersecting at the origin O=(0,0).

Ordered pair (x, y):
  x-coordinate (abscissa): signed horizontal distance from origin.
    Positive x → right of y-axis. Negative x → left of y-axis.
  y-coordinate (ordinate): signed vertical distance from origin.
    Positive y → above x-axis. Negative y → below x-axis.

Quadrants (labelled I–IV counter-clockwise from upper right):
  Quadrant I:   x > 0, y > 0   (upper right)
  Quadrant II:  x < 0, y > 0   (upper left)
  Quadrant III: x < 0, y < 0   (lower left)
  Quadrant IV:  x > 0, y < 0   (lower right)

Special positions:
  On x-axis: y = 0 (e.g., (5, 0), (−3, 0))
  On y-axis: x = 0 (e.g., (0, 4), (0, −2))
  Origin:    (0, 0)
```

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL]: AXIS-SWAP
**Belief:** In the ordered pair (x, y), the first number is the vertical (y) distance and the second is the horizontal (x) distance — or equivalently, plot by going up/down first, then left/right.
**Origin:** Some students read "across, then up" as "up, then across" because the word "coordinates" suggests no inherent order, or they confuse the convention.
**Trigger:** Plot (3, −2): student moves 3 units UP then 2 units LEFT, landing at (−2, 3).
**Repair:** Reinforce convention: HORIZONTAL first (x = east/west), then VERTICAL (y = north/south). Mnemonic: x comes before y alphabetically, and left-right comes before up-down when navigating.
**Priority:** FOUNDATIONAL — every coordinate operation (graphing, distance, slope) depends on reading (x, y) correctly.

### MC-2: QUADRANT-SIGN-ERROR
**Belief:** Quadrant II has positive x (upper right is positive), or quadrant signs are not connected to axis signs.
**Origin:** Students memorise quadrant numbers without linking them to the sign rules of the two axes.
**Trigger:** "Which quadrant contains (−4, 2)?" → student says Quadrant IV (confuses negative x with right side).
**Repair:** Re-derive quadrant signs from axes: left of y-axis → x < 0; above x-axis → y > 0; therefore (−4, 2) → (negative, positive) → Quadrant II.

### MC-3: ORIGIN-AS-CORNER
**Belief:** The origin is in the bottom-left corner of the grid, like the corner of a page or a ruler starting at zero; coordinates measure from that corner.
**Origin:** Students who used rulers (starting at 0 on the left end) or page coordinates (starting top-left) import that frame into the coordinate plane.
**Trigger:** "Where is the point (−3, 2)?" → student says there's no such point because "coordinates can't be negative."
**Repair:** The origin is the CENTER of the plane; axes extend in both directions. Negative coordinates indicate positions to the left of or below the origin.

---

## Component 3 — Scaffolding Protocol

### Entry Diagnostic (P41 gate)
```
P41 — MISCONCEPTION DETECTOR
Prompt: "On a standard Cartesian plane, describe where you would find the
point (−3, 4). Which quadrant is it in?"

CORRECT (left of y-axis 3 units; above x-axis 4 units; Quadrant II):
→ No MC-1 or MC-3 detected → proceed to TA-A01 standard opening.

INCORRECT (places point to the right, or says Quadrant I, or says negative not possible):
→ MC-1 or MC-3 active → P64 CONCEPTUAL SHIFT on ordered pair convention and signed axes
→ Activate Protocol B (MC-1 Repair Chain)
```

### Prerequisite Bridge
Student completed math.geom.plane (geometric plane as a flat infinite surface) and math.found.real-numbers (ℝ as the complete ordered number line). The coordinate plane equips the geometric plane with an algebraic address system by laying two copies of ℝ — one horizontal, one vertical — intersecting at zero.

### MAMR Enforcement
MC-1 is FOUNDATIONAL. Axis-swap corrupts all coordinate reading and plotting. Clear it completely before working on quadrant signs (MC-2) or negative-coordinate concepts (MC-3). MC-2 and MC-3 FIFO.

### CPA Progression: C → P → A
- **Concrete (C):** Grid paper; physical plotting by counting grid squares.
- **Pictorial (P):** Full labelled plane with quadrant signs; origin as centre; axes as number lines.
- **Abstract (A):** ℝ² = set of ordered pairs; signed distance definition; algebraic quadrant conditions.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01: Concrete Foundation — The Address System

**Opening (GR-1: B-category primitive)**
```
P03 — ANALOGY BRIDGE
Source domain: GPS navigation
Target domain: Cartesian coordinate system

"GPS locates every point on Earth using two numbers: longitude (east/west)
and latitude (north/south). Longitude 0° is a fixed vertical reference line;
latitude 0° is the equator.

The coordinate plane works the same way:
  x-coordinate = signed distance east (+) or west (−) from the y-axis.
  y-coordinate = signed distance north (+) or south (−) from the x-axis.
  Origin (0,0) = where the two reference lines cross.
  Convention: HORIZONTAL (x) is always stated first, VERTICAL (y) second.
  (x, y) = 'go x steps east/west, then y steps north/south.'"
```

**Concrete Plotting**
```
P06 — CONTRAST PAIR
Left: CORRECT plotting of (3, −2)          Right: INCORRECT (axis-swapped)

Step 1: Start at origin (0,0).              Step 1: Start at origin (0,0).
Step 2: Move 3 units RIGHT (x = +3).        Step 2: Move 2 units DOWN (mis-reads y first).
Step 3: Move 2 units DOWN (y = −2).         Step 3: Move 3 units RIGHT (mis-reads x second).
Result: correctly at (3, −2).               Result: incorrectly at (3, −2) — same point
                                             by coincidence here; but for (3, 5):
                                             correct is (3, 5); swapped is (5, 3) ≠ (3, 5).

KEY RULE: x FIRST (horizontal), y SECOND (vertical). Order is FIXED.
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Plot and label these four points:
  A=(4, 2),  B=(−3, 1),  C=(0, −5),  D=(−2, −4).
For each, state the quadrant (or axis if applicable)."

CORRECT (A: Q1; B: Q2; C: on y-axis; D: Q3):
→ Affirm: "Excellent. C is on the y-axis (x=0) — not in any quadrant.
  D is in Q3: both coordinates negative means lower-left region."
→ Advance to TA-A02.

PARTIAL (A and D correct but B and C swapped — e.g., B at (1,−3)):
→ MC-1 partial. "For B=(−3,1): x=−3 means 3 LEFT. y=1 means 1 UP.
  The first number always tells you LEFT/RIGHT. Re-plot B."
→ Re-attempt; advance.

INCORRECT (systematic axis swap — all points mirrored):
→ MC-1 active. P27: "AXIS-SWAP. In (x,y), x always goes LEFT/RIGHT first.
  y always goes UP/DOWN second. Think: alphabet order — x before y,
  and we read left to right before up-down."
→ Activate B-1 repair.

NO_RESPONSE:
→ "For A=(4,2): start at origin. The first number is 4 — move 4 units to the right.
  The second number is 2 — from there, move 2 units up. Mark that point."
→ Guide through A; student plots B, C, D independently.
```

---

### TA-A02: Quadrant Signs and Reflections

**Opening (GR-1: B-category primitive)**
```
P11 — REPRESENTATION SHIFT
Shift: visual quadrant diagram → sign-rule table → algebraic conditions

Step 1 (visual — the four quadrants):
  
        y
        ↑
   II   |   I
  (−,+) | (+,+)
  ──────┼──────→ x
  (−,−) | (+,−)
  III   |   IV

Step 2 (sign-rule table):
  Quadrant | x sign | y sign | Example
  I        |   +    |   +    | (5, 3)
  II       |   −    |   +    | (−4, 2)
  III      |   −    |   −    | (−1, −7)
  IV       |   +    |   −    | (2, −6)

Step 3 (derive from axes):
  Above x-axis ↔ y > 0.  Below x-axis ↔ y < 0.
  Right of y-axis ↔ x > 0.  Left of y-axis ↔ x < 0.
  Quadrant = intersection of x-half-plane and y-half-plane.
```

**MC-2 and MC-3 Direct Address**
```
P27 — MISCONCEPTION NAMING
"QUADRANT-SIGN-ERROR: memorising quadrant numbers without linking to axes.
FIX: derive the signs from the axis directions.
  Q1 = right + up = x>0 AND y>0.
  Q2 = left + up = x<0 AND y>0.
  Q3 = left + down = x<0 AND y<0.
  Q4 = right + down = x>0 AND y<0.
ORIGIN-AS-CORNER: thinking (−3, 2) is invalid because 'coordinates start at 0.'
FIX: the origin is the CENTER. Axes extend infinitely in BOTH directions.
  Negative x = left of origin; negative y = below origin."
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "For each ordered pair, state the quadrant (or axis/origin):
  (a) (−7, −1)  (b) (0, 5)  (c) (4, −3)  (d) (−6, 0)"

CORRECT ((a) Q3; (b) positive y-axis; (c) Q4; (d) negative x-axis):
→ Affirm: "(b) is on the y-axis — x=0 means the point lies ON the axis, not in any quadrant.
  (d) is on the x-axis with x<0, so it's on the NEGATIVE x-axis."
→ Advance to TA-A03.

PARTIAL (quadrants correct but axis cases wrong — places (0,5) in Q1):
→ "A point is IN a quadrant only if it's strictly inside — not on either axis.
  (0,5) has x=0, so it's ON the y-axis, not left or right of it.
  Points on axes are not in any quadrant."
→ Re-examine; advance.

INCORRECT ((a) answered Q1 or Q4, sign error):
→ MC-2 active. "For (a): x=−7. Is −7 positive or negative? Negative → left of y-axis.
  y=−1. Is −1 positive? No → below x-axis.
  Left AND below → Q3. Re-derive from axis directions, not from memory."
→ Re-attempt; advance.

NO_RESPONSE:
→ "For (a): is −7 positive or negative? [negative] → so the point is to the LEFT.
  Is −1 positive? [no] → below the x-axis. Which quadrant is left-and-below?"
→ Guide; advance.
```

---

### TA-A03: Abstract Layer — ℝ² and Coordinate Reading

**Opening (GR-1: B-category primitive)**
```
P04 — PATTERN INDUCTION
"Let's observe the effect of changing one coordinate at a time:

  Point         Position       Movement from previous
  (3, 2)        Q1             starting point
  (−3, 2)       Q2             reflected across y-axis (x sign flipped)
  (3, −2)       Q4             reflected across x-axis (y sign flipped)
  (−3, −2)      Q3             reflected across both axes (both signs flipped)
  (0, 2)        y-axis         x=0 → on vertical axis
  (3, 0)        x-axis         y=0 → on horizontal axis

Pattern:
  Flipping x sign ↔ reflection across y-axis (left/right mirror).
  Flipping y sign ↔ reflection across x-axis (up/down mirror).
  Both flipped ↔ 180° rotation about origin."
```

**Abstract Formalisation**
```
P11 — REPRESENTATION SHIFT (pictorial → algebraic)
"FORMAL DEFINITION:
  The Cartesian plane is the set ℝ² = {(x,y) : x ∈ ℝ, y ∈ ℝ}.
  Each point P ∈ ℝ² has a unique representation as an ordered pair (x,y).
  The x-coordinate of P is the unique real number such that P lies on the
    vertical line at horizontal distance x from the y-axis.
  The y-coordinate of P is the unique real number such that P lies on the
    horizontal line at vertical distance y from the x-axis.

Uniqueness: each point in the plane corresponds to EXACTLY ONE ordered pair.
Completeness: each ordered pair (x,y) ∈ ℝ² corresponds to EXACTLY ONE point."
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "A point Q is located 5 units to the left of the y-axis and
3 units above the x-axis.
(a) Write Q as an ordered pair.
(b) Which quadrant is Q in?
(c) What are the coordinates of the point obtained by reflecting Q across the x-axis?
(d) What are the coordinates of Q reflected across the y-axis?"

CORRECT ((a) (−5, 3); (b) Q2; (c) (−5, −3); (d) (5, 3)):
→ Affirm: "Perfect. Reflecting across the x-axis flips the y-sign: (−5,3)→(−5,−3).
  Reflecting across the y-axis flips the x-sign: (−5,3)→(5,3)."
→ Advance to TA-A04.

PARTIAL (correct on (a)(b) but gets reflection direction wrong):
→ "Reflecting across the x-axis changes above/below. Q is at y=3 (above).
  Its mirror image is y=−3 (below). x stays the same: x=−5."
→ Re-examine; advance.

INCORRECT ((a) writes (3, −5) — axis swap):
→ MC-1 still active. P64: "Left means negative x. Above means positive y.
  'Left 5' → x=−5 (x is horizontal). 'Up 3' → y=3 (y is vertical).
  Ordered pair: (−5, 3). First number is horizontal."
→ Activate B-1 if not already resolved; re-attempt.

NO_RESPONSE:
→ "5 units LEFT: that's the horizontal direction. What sign is 'left'?
  [negative] So x = −5. 3 units ABOVE: vertical. What sign is 'above'?
  [positive] So y = 3."
→ Guide; advance.
```

---

### TA-A04: Mastery Gate (P91 Terminal)

```
P77 — MULTI-PROBLEM SET (4 problems)

Problem 1:
"Plot and label: A=(−5, 0), B=(2, 7), C=(−3, −6), D=(0, −4).
State the quadrant or axis position of each."

Problem 2:
"Find the coordinates of the point symmetric to P=(4, −3) with respect to:
(a) the x-axis  (b) the y-axis  (c) the origin."

Problem 3:
"A point T lies in Quadrant III and is equidistant (same distance) from both axes.
If |x|=|y|=6, write all possible coordinates of T."
[Only (−6, −6) satisfies Q3 sign conditions.]

Problem 4:
"The points (a, 3) and (a, −5) lie on the same vertical line.
(a) What is the x-coordinate of this line?
(b) For what value of a does this line pass through the y-axis?"
[(a) Both share x-coordinate a, so the line is x=a; (b) a=0 makes x=0, the y-axis.]
```

```
P55 — SCORE (after P77)
Award 1 point per problem.
Running total before P76: __/4.
```

```
P76 — TRANSFER PROBE (P76 independence: math.func.graph-of-function NOT Tier 1)
"Consider the equation y = x² (a parabola).

(a) Complete the table of values:
      x:  −3  −2  −1   0   1   2   3
      y:   ?   ?   ?   ?   ?   ?   ?

(b) Plot the seven points (x, y) from your table on a coordinate plane.

(c) Describe the geometric shape the points suggest.

(d) The point (−3, 9) and (3, 9) both lie on y=x². What do these two points
    have in common geometrically? Use coordinate-plane vocabulary (quadrant, axis, reflection)."

[Expected:
(a) y = 9, 4, 1, 0, 1, 4, 9.
(b) Seven plotted points forming a U-shape opening upward.
(c) A parabola (U-shaped curve) symmetric about the y-axis.
(d) They have the same y-coordinate (both at height 9). They are reflections
    of each other across the y-axis: (−3,9) is in Q2, (3,9) is in Q1.
    Reflection across y-axis flips x-sign: (−3)→(3).]
```

```
P55 — SCORE (after P76)
Award 1 point for P76.
Running total: __/5.
```

```
P75 — MASTERY ASSESSMENT
Pass criterion: 5 out of 5 (⌈0.90 × 5⌉ = 5)
```

```
P55 — SCORE (final)
Record pass/fail status.
```

```
P74 — ROUTING DECISION
Score = 5/5 → MASTERY ACHIEVED → P78 COMPLETION
Score < 5/5 → NEEDS REVIEW → identify lowest-scoring item; activate Protocol B for its misconception
```

```
P55 — SCORE (routing recorded)
```

```
P78 — COMPLETION
"Coordinate plane checkpoint complete. You have established:
  • (x, y): x = horizontal signed distance (right +, left −); y = vertical signed distance (up +, down −).
  • Origin = (0,0) = centre of the plane; axes extend infinitely in both directions.
  • Quadrant I: (+,+); Q2: (−,+); Q3: (−,−); Q4: (+,−); points on axes belong to no quadrant.
  • Reflection rules: flip x-sign → mirror across y-axis; flip y-sign → mirror across x-axis; flip both → 180° rotation.
Next concepts: math.geom.distance-formula, math.geom.slope, math.geom.line-equation."
```

---

## Component 5 — Protocol B (Misconception Repair Chains)

### Repair Chain B-1: AXIS-SWAP (MC-1 FOUNDATIONAL)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: (x, y) — the first number is vertical (up/down), second is horizontal.
 AFTER:  (x, y) — the first number is ALWAYS horizontal (x-axis), second is ALWAYS vertical (y-axis).

Memory tricks:
  (1) Alphabetical: x comes before y. x-direction (horizontal) comes first.
  (2) Navigation: east/west (horizontal) before north/south (vertical), like 'longitude, latitude.'
  (3) On a number line: x is the number line lying FLAT (horizontal); y is the one standing UP."

Repair exercise:
Start from origin (0,0). Follow these steps for (5, −3):
  STEP 1 (horizontal): x=5 → move RIGHT 5 units. Mark the intermediate point (5, 0).
  STEP 2 (vertical): y=−3 → from (5,0), move DOWN 3 units. Mark (5, −3).
Student repeats for (−2, 4): move LEFT 2 (to (−2,0)), then UP 4.

Exit gate: "For (−4, 7): which direction and how many units for EACH step?"
Expected: Step 1: LEFT 4 units; Step 2: UP 7 units.
→ Correct: return to TA-A01 P49 re-attempt.
→ Incorrect: use physical finger-tracing on grid; repeat with two more points.
```

### Repair Chain B-2: QUADRANT-SIGN-ERROR (MC-2)

```
P41 — MISCONCEPTION DETECTOR
Diagnostic: "In which quadrant is (−5, −8)?"
If student says Q1 or Q2 (thinks negative x means Q2 only): MC-2 confirmed.

P27 — MISCONCEPTION NAMING
"QUADRANT-SIGN-ERROR: memorising 'which quadrant is which number' instead of
deriving signs from axis directions.

ALWAYS DERIVE: negative x = left of y-axis; negative y = below x-axis.
  Q1: right and up = x>0, y>0.
  Q2: left and up = x<0, y>0.
  Q3: left and down = x<0, y<0.
  Q4: right and down = x>0, y<0.
(−5,−8): x<0 (left), y<0 (down) → Q3."

Repair exercise: Classify (3,−7), (−1,4), (−6,−2), (8,9) using the derive-from-axes method.
Student shows their reasoning: "x>0 (right), y<0 (down) → Q4" etc.

Exit gate: "Give the quadrant and an example point for 'negative x, positive y.'"
Expected: Q2; e.g., (−2, 5).
→ Correct: return to TA-A02.
```

### Repair Chain B-3: ORIGIN-AS-CORNER (MC-3)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: The origin is the bottom-left corner; coordinates are always ≥ 0.
 AFTER:  The origin is the CENTER; the x-axis and y-axis extend infinitely in BOTH directions.

Picture a ruler: it starts at 0 on ONE end. But the coordinate AXES have no end —
they extend left/right (x-axis) and up/down (y-axis) forever. The origin (0,0)
is where they cross — in the middle, not in a corner.

Negative coordinates are real, valid positions:
  (−3, 2): 3 units LEFT of origin, 2 units ABOVE — in Q2.
  (0, −5): directly BELOW the origin on the y-axis."

Repair exercise: On a coordinate plane (both positive and negative regions shown):
Plot A=(−4, 3), B=(2, −5), C=(−1, −2).
Confirm each point exists in the visible plane.

Exit gate: "Can a point have x = −10? If so, where is it?"
Expected: YES — 10 units to the left of the y-axis.
→ Correct: return to TA-A01.
```

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89 — SPACED REPETITION
Review schedule for math.geom.coordinate-plane:

Interval 1 (1 day after mastery):
  Recall prompt: "Name the four quadrants and their sign rules.
  Plot (−3, 5) and state its quadrant."
  Target: QI(+,+), QII(−,+), QIII(−,−), QIV(+,−); (−3,5) in QII.

Interval 2 (3 days):
  Application: "Point P=(6,−4). State: (a) quadrant; (b) x-axis reflection;
  (c) y-axis reflection; (d) 180° rotation about origin."
  Target: (a) QIV; (b) (6,4); (c) (−6,−4); (d) (−6,4).

Interval 3 (7 days):
  Transfer: "Find all points (x,y) with |x|=3 and |y|=3.
  Plot them. What shape do they form?"
  Target: (3,3),(3,−3),(−3,3),(−3,−3) — a square with side 6.

Interval 4 (21 days):
  Integration: "In math.geom.distance-formula, the distance from (x₁,y₁) to (x₂,y₂)
  is √((x₂−x₁)²+(y₂−y₁)²). Use this formula to find the distance from
  origin (0,0) to point (3,4). Then describe what the distance formula does
  in terms of the coordinate plane."
  Target: √(9+16)=√25=5. Formula measures straight-line distance between points
    identified by their coordinate pairs.
```

---

## Component 7 — Cross-Blueprint Dependencies

### GR-8: Cross-link documentation
```
Incoming prerequisites:
  math.geom.plane → Provides the infinite flat surface; the coordinate plane
    superimposes an algebraic grid onto it.
  math.found.real-numbers → Provides ℝ as the complete ordered line;
    both axes are copies of ℝ, so coordinate values can be any real number.

Outgoing unlocks:
  math.geom.distance-formula → Uses (x₁,y₁),(x₂,y₂) coordinates as inputs.
  math.geom.midpoint-formula → Uses coordinate averages: midpoint = ((x₁+x₂)/2, (y₁+y₂)/2).
  math.geom.slope → Rise/run computed from y- and x-coordinate differences.
  math.geom.line-equation → Lines expressed as ax+by=c using coordinate variables.

Cross-linked (non-prerequisite):
  math.func.graph-of-function (NOT Tier 1) → Function graphs are sets of
    points (x, f(x)) plotted on the coordinate plane; coordinate-plane mastery
    is the visual language for function graphs.
```

### GR-9: P76 Mode Determination
```
cross_links = [math.func.graph-of-function]
math.func.graph-of-function is NOT Tier 1 → P76 INDEPENDENCE
P76 probe: plotting y=x² from a table; geometric description; symmetry about y-axis.
  Self-contained — only uses coordinate plotting skills, no prior function knowledge needed.
```

---

## Component 8 — Teaching Notes

### Pedagogical Rationale
Coordinate plane (bloom=understand) requires students to understand the coordinate system as a complete bidirectional framework, not a ruler-from-corner system. The two key conceptual leaps are: (1) the ordered pair convention (x before y, always), and (2) the origin-as-centre (axes extend in both directions, negative coordinates are valid). Both are undermined by students' prior experience with rulers and page margins.

### Common Session Failure Modes
1. **MC-1 persists under time pressure:** Under timed conditions, students revert to axis-swapping. The GPS analogy (longitude before latitude = x before y) provides a durable anchor.
2. **Students place Q3 in the upper-left:** The counter-clockwise labelling convention (Q1 → Q2 → Q3 → Q4 going counter-clockwise) is less intuitive than clockwise. Deriving Q labels from sign rules (not rote position) prevents this.
3. **Negative coordinates feel "wrong":** Students who have only used positive-axis graphs (e.g., in data science or bar charts) find negative coordinates unfamiliar. Physical examples (temperature below 0°, floors below ground level) help.

### Connections to Broader Curriculum
- **Downstream — math.geom.distance-formula:** Distance = √(Δx²+Δy²) is a direct computation on two coordinate pairs.
- **Downstream — math.geom.slope:** Slope = Δy/Δx requires correctly signed coordinate differences.
- **Cross-domain — math.func.graph-of-function:** Every function graph is a set of points in the coordinate plane; coordinate fluency is the visual language of all function analysis.

### Language Precision
- "x-coordinate" or "abscissa" for the first element; "y-coordinate" or "ordinate" for the second.
- "Ordered pair" — stress the word ordered: (3,−2) ≠ (−2,3).
- "Quadrant" vs. "axis": points on the axes are not in any quadrant.

---

## Component 10 — Validation Checklist

### Structural Validators
- [x] V-1: Blueprint has all 10 components (0–8, 10).
- [x] V-2: Metadata YAML complete with all required fields.
- [x] V-3: concept_id matches filename `math.geom.coordinate-plane`.
- [x] V-4: difficulty=developing, bloom_level=understand, mastery_threshold=0.90.
- [x] V-5: estimated_hours=6, session_ta_cap=7.

### Grammar Rule Validators
- [x] V-6 (GR-1): Every non-repair TA opens with B-category primitive (TA-A01: P03+P06; TA-A02: P11; TA-A03: P04+P11; TA-A04 is mastery gate).
- [x] V-7 (GR-2): Every non-gate TA contains P49 with all 4 branches. TA-A01, TA-A02, TA-A03 each have P49.
- [x] V-8 (GR-3): Mastery gate TA-A04 is terminal (ends with P78).
- [x] V-9 (GR-4): P41 entry diagnostic gates P64 → Protocol B when MC-1 active.
- [x] V-10 (GR-6): P91 compound (P77→P55→P76→P55→P75→P55→P74→P55→P78) complete in TA-A04.
- [x] V-11 (GR-7): P76 present in mastery gate TA-A04.
- [x] V-12 (GR-8): Cross-links documented in Component 7. math.func.graph-of-function named.
- [x] V-13 (GR-9): P76 mode is INDEPENDENCE (math.func.graph-of-function NOT Tier 1). P76 probe: plot y=x², describe shape, explain symmetry. Self-contained.
- [x] V-14 (GR-10): MAMR stated in Component 0 and enforced in Component 3.

### Content Validators
- [x] V-15: Pass criterion = ⌈0.90 × 5⌉ = 5/5. P77 has 4 problems; P76 contributes 1; total n=5. ✓
- [x] V-16: CPA_ENTRY_STAGE = C. developing always starts Concrete. ✓
- [x] V-17: MC-1 is FOUNDATIONAL and cleared first per MAMR. ✓
- [x] V-18: P49 INCORRECT branch activates P27 or P64 with repair pathway in all three non-gate TAs. ✓
- [x] V-19: P76 probe independent of P77 problems (P77: plotting/labelling, reflections, Q3 equidistant, vertical line; P76: y=x² table and symmetry argument — distinct). ✓
- [x] V-20: Spaced repetition intervals are 1, 3, 7, 21 days with distinct prompts. ✓

### Automated Invariant Check (AIR)
- [x] AIR-1: No implementation code present.
- [x] AIR-2: No references to internal system variables.
- [x] AIR-3: All cross-linked concept IDs use canonical prefix format.
- [x] AIR-4: P91 sequence order is P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
- [x] AIR-5: Protocol B repair chains each have explicit exit gate with return instruction. ✓

**VALIDATION RESULT: PASS — PACKAGE_READY**

# Teaching Blueprint — math.geom.vectors-2d

## Component 0 — Metadata
concept_id: math.geom.vectors-2d
concept_name: Vectors in 2D
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 6
mastery_threshold: 0.80
CPA_entry_stage: P
requires: [math.geom.coordinate-plane, math.arith.addition]
cross_links: [math.linalg.vector]
P76_mode: cross-link-probe

---

## Component 1 — Cognitive Map

**Core concept:** A 2D vector is a quantity with both magnitude and direction in the plane, represented as an ordered pair (a, b) or equivalently as a directed line segment from one point to another. Vectors are added head-to-tail, scaled by multiplication, and have magnitude |v|=√(a²+b²). They are distinct from points: the same vector can be placed anywhere in the plane.

**Conceptual progression:**
1. Vector vs. point: a point (3,4) is a location; a vector (3,4) is a displacement — move 3 right, 4 up, from anywhere.
2. Representation: ordered pair (a,b); column form [[a],[b]]; directed arrow from tail to head.
3. Vector addition: (a,b)+(c,d)=(a+c,b+d). Geometric: head-to-tail (triangle law) or parallelogram law.
4. Scalar multiplication: k(a,b)=(ka,kb). Stretches (|k|>1), shrinks (|k|<1), reverses direction (k<0).
5. Magnitude: |(a,b)|=√(a²+b²). Pythagorean theorem applied to the horizontal and vertical components.
6. Unit vector: v̂=v/|v|; has magnitude 1, same direction as v.
7. Zero vector: (0,0) — no direction, magnitude 0; additive identity.

**CPA arc (entry: P):**
- Pictorial: arrows on coordinate grid showing head-to-tail addition, scalar stretch/reversal, magnitude as hypotenuse
- Abstract: ordered pair notation, component-wise arithmetic, |v|=√(a²+b²), unit vector formula

**Prior knowledge activated:** coordinate plane (x-y axes, plotting points); addition and subtraction of integers and fractions; Pythagorean theorem; concept of direction (compass bearings or angles)

---

## Component 2 — Misconception Registry

### MC-1: VECTOR-IS-A-POINT [FOUNDATIONAL]
**Description:** Learner treats a 2D vector as a fixed location in the plane rather than a displacement. Believes the vector (3,4) uniquely refers to the point (3,4) at the origin's upper-right. Cannot understand why two parallel arrows of the same length represent the same vector.
**Surface form:** "Vector (3,4) is the point (3,4). It's fixed — you can't move it around."
**Root cause:** The notation (3,4) is shared between points and vectors. Learner's prior experience is exclusively with points-as-locations on a coordinate plane, not displacement-as-translation.
**Trigger condition:** Any problem involving translation, free vectors, or placing the same vector at different tails.
**Repair target:** TA-B01.

### MC-2: MAGNITUDE-IS-COORDINATE-SUM
**Description:** Learner computes the magnitude of (a,b) as a+b (or |a|+|b|) rather than √(a²+b²). Does not apply the Pythagorean theorem to the component representation.
**Surface form:** "The magnitude of (3,4) is 3+4=7."
**Root cause:** Coordinate sum is simpler and feels natural. The Pythagorean step — recognising (a,b) as the hypotenuse of a right triangle with legs a and b — has not been connected to the arrow representation.
**Trigger condition:** Any problem asking for |v| or the length/magnitude of a vector.
**Repair target:** TA-B02.

### MC-3: NEGATIVE-SCALAR-REVERSES-MAGNITUDE
**Description:** Learner believes multiplying a vector by a negative scalar changes both its direction AND makes its length negative. Does not understand that magnitude is always non-negative.
**Surface form:** "−2(3,4)=(−6,−8), which has magnitude −10."
**Root cause:** Conflates the negative sign of the scalar with a negative magnitude. Does not distinguish between direction (which reverses) and magnitude (which is always positive).
**Trigger condition:** Any problem involving scalar multiplication by a negative number.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Plot the points A=(1,2) and B=(4,6) on a coordinate grid. What is the horizontal distance and the vertical distance from A to B?" If the learner identifies Δx=3 and Δy=4 correctly, the coordinate-plane prerequisite is active. Proceed to A01.

**Scaffolding ladder:**
- Rung 1 (pictorial): Provide a grid with two arrows drawn. Learner identifies head, tail, horizontal component, and vertical component by reading the grid.
- Rung 2 (partial abstract): Learner computes u+v component-wise given numeric values, then draws the result on a grid to verify head-to-tail addition.
- Rung 3 (full abstract): Learner computes |v| and unit vector v̂ independently for a given (a,b).

**Pacing note:** h=6 estimated hours; A01–A02 in session 1; A03 + mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Navigation / Walking directions.
"Starting from your home: walk 3 blocks east and 4 blocks north." This is a DISPLACEMENT — an instruction, not a destination. If you start from the library instead, and follow the same instruction (3 east, 4 north), you arrive at a different destination, but the DISPLACEMENT is the same.

TARGET DOMAIN: The vector v = (3, 4).
- v represents the instruction "move 3 right, 4 up" — regardless of where you start.
- Placing v at the origin: tail at (0,0), head at (3,4).
- Placing v at (1,1): tail at (1,1), head at (4,5).
- Same vector, different locations. The arrow's LENGTH (5 = √(3²+4²)) and DIRECTION (northeast) are identical in both cases.

CONTRAST WITH A POINT:
A POINT (3,4) is a fixed address — one specific location on the map.
A VECTOR (3,4) is a travel instruction — usable from any starting address.
Same notation; fundamentally different meaning.

VECTOR ADDITION (head-to-tail):
Walk (3,4): end up at (3,4) from origin.
Then walk (1,−2): move 1 right, 2 down.
Net displacement: (3+1, 4+(−2)) = (4,2).
GEOMETRIC: the head of the first arrow is the tail of the second; the net vector goes from the first tail to the second head. This is the triangle (head-to-tail) law.

**Assessment primitive: P49**

PROBE: "u=(2,1) and v=(−1,3). Compute u+v. Draw both arrows starting from the origin, then draw the sum using the head-to-tail rule. Do the drawings agree with the calculation?"
- CORRECT: "u+v=(1,4). Drawing: place v's tail at u's head — v starts at (2,1) and ends at (1,4). The net arrow from origin to (1,4) matches (1,4)." → "Correct on both counts. Component-wise addition always matches the geometric head-to-tail law."
- PARTIAL: Correct arithmetic, incorrect drawing → "u+v=(1,4) is right. For the drawing: don't move v to the origin. Place v's TAIL at u's HEAD = (2,1). v goes from (2,1) to (2+(−1), 1+3)=(1,4). The net vector is from origin (0,0) to (1,4)."
- INCORRECT: Computes u+v=(3,4) or similar error → "Component-wise: horizontal: 2+(−1)=1; vertical: 1+3=4. Sum=(1,4). Negative horizontal components mean 'move left': from x=2, move 1 left to x=1."
- NO_RESPONSE: "Add the first components: 2+(−1)=? Add the second components: 1+3=? That gives you u+v."

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Scalar Multiplication and Magnitude:
"Let u=(2,1). Compute 3u, −u, and |u|."

STEP 1 — Scalar multiplication 3u:
3u = (3×2, 3×1) = (6,3).
Geometric: arrow is 3 times longer, same direction. Points from origin to (6,3).

STEP 2 — Scalar multiplication −u:
−u = (−1)(2,1) = (−2,−1).
Geometric: same length as u, OPPOSITE direction. The negative scalar reverses direction.
Magnitude check: |−u| = √((−2)²+(−1)²) = √(4+1) = √5. Same as |u|.

STEP 3 — Magnitude |u|:
|u| = √(2²+1²) = √(4+1) = √5 ≈ 2.236.
GEOMETRIC MEANING: draw u on a grid — it is the hypotenuse of a right triangle with legs 2 (horizontal) and 1 (vertical). By Pythagoras: hypotenuse = √(2²+1²) = √5.

WORKED EXAMPLE 2 — Vector Subtraction and Unit Vectors:
"Let u=(4,3). Compute u−(1,1) and the unit vector û."

STEP 1 — Subtraction:
u−(1,1) = (4−1, 3−1) = (3,2).
Geometric: subtracting v is the same as adding −v.

STEP 2 — Unit vector:
|u| = √(4²+3²) = √(16+9) = √25 = 5.
û = u/|u| = (4/5, 3/5).
Check: |û| = √((4/5)²+(3/5)²) = √(16/25+9/25) = √(25/25) = 1. ✓
û has magnitude 1 and the same direction as u.

**Assessment primitive: P49**

PROBE: "Given v=(−3,4): (a) Find |v|. (b) Find the unit vector v̂. (c) Find 2v and confirm |2v|=2|v|."
- CORRECT: "(a) |v|=√(9+16)=√25=5. (b) v̂=(−3/5,4/5). Check: |(−3/5,4/5)|=√(9/25+16/25)=1 ✓. (c) 2v=(−6,8), |2v|=√(36+64)=√100=10=2×5 ✓." → "Excellent. All three parts correct, including the scaling property of magnitude."
- PARTIAL: Correct |v|=5 but wrong unit vector → "Unit vector: divide EACH COMPONENT by |v|=5. v̂=(−3/5, 4/5). Both components divided by 5 — not just the positive one."
- INCORRECT: |v|=−3+4=1 → Address MC-2: "Magnitude uses the PYTHAGOREAN THEOREM, not component sum. Draw v=(−3,4) on a grid: horizontal leg =3, vertical leg=4 (use absolute values for legs). Hypotenuse=√(3²+4²)=√25=5."
- NO_RESPONSE: "Draw v=(−3,4): start at origin, go 3 left and 4 up. The arrow is the hypotenuse of a right triangle. What are the leg lengths? Apply Pythagoras to find the hypotenuse."

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — SCALAR (number with magnitude only):
Examples: temperature 25°C, mass 5 kg, distance 10 m, speed 60 km/h.
Fully described by: a single number (and unit).
Operations: standard arithmetic (+, ×, …).
Represented by: a point on a number line.

PAIR B — VECTOR (quantity with magnitude AND direction):
Examples: displacement 3 m east, velocity 60 km/h north, force 10 N upward.
Fully described by: a magnitude AND a direction (or equivalently, two components).
Operations: component-wise addition; scalar multiplication; magnitude extraction.
Represented by: a directed arrow in the plane.

THE CRITICAL QUESTION: "Is this a vector or scalar?"
- Temperature change of +5°C: SCALAR — no direction in space.
- Wind velocity (20, 10) km/h: VECTOR — horizontal and vertical components.
- Distance from A to B: SCALAR — just a number.
- Displacement from A to B: VECTOR — number AND direction.

FORCE EXAMPLE (application):
Two forces on an object: F₁=(5,0) N (east) and F₂=(0,3) N (north).
Net force (vector sum): F_net = F₁+F₂ = (5,3) N.
Magnitude of net force: |F_net| = √(25+9) = √34 ≈ 5.83 N.
Direction: θ = arctan(3/5) ≈ 31° north of east.
A SCALAR would only give the magnitude 5.83 N — not the direction of motion.

**Assessment primitive: P49**

PROBE: "A boat moves with velocity (4,3) m/s (relative to water), and the current has velocity (−1,2) m/s. (a) Find the resultant velocity. (b) Find the boat's speed (magnitude). (c) Is speed a scalar or vector?"
- CORRECT: "(a) (4+(−1),3+2)=(3,5) m/s. (b) |(3,5)|=√(9+25)=√34≈5.83 m/s. (c) Speed is a scalar — it's just the magnitude of the velocity vector." → "Perfect. Resultant velocity (vector), speed (scalar magnitude of that vector). The distinction matters for physics and engineering."
- PARTIAL: Correct resultant, calls speed a vector → "Good resultant (3,5). Speed=|(3,5)|=√34 is just a number — no direction. Speed is SCALAR; velocity is VECTOR. Speed is what the speedometer shows; velocity includes direction."
- INCORRECT: Adds magnitudes: speed = √(4²+3²)+√(1²+2²) = 5+√5 → "Don't add magnitudes directly — add the velocity VECTORS first: (4+(−1),3+2)=(3,5). Then find the magnitude of the result: |(3,5)|=√34. The vectors must be combined before taking magnitudes."
- NO_RESPONSE: "Resultant = boat velocity + current velocity. Add component-wise: horizontal 4+(−1)=?, vertical 3+2=?. Then apply Pythagoras to find the magnitude."

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (VECTOR-IS-A-POINT)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"A very common confusion, because vectors and points share the same notation: (3,4) could be either. The difference is conceptual — a point is a location; a vector is a displacement. Learning to see them as distinct objects is essential for all further work in geometry and physics."

**P41 — MISCONCEPTION DETECTOR**
"The vector v=(3,4). If I place this vector with its tail at (1,1), where is its head?
(A) At (3,4) — the vector always ends at (3,4).
(B) At (4,5) — because we add (3,4) to the tail (1,1)."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"A vector is a TRANSLATION — the instruction 'go 3 right, 4 up.' This instruction can be applied from ANY starting point:
- Tail at (0,0) → head at (3,4).
- Tail at (1,1) → head at (4,5).
- Tail at (−2,3) → head at (1,7).
The vector v=(3,4) is the same in all three cases — it is the instruction, not the destination.
Two arrows are EQUAL VECTORS if they have the same length and direction — even if they start at different points. In physics, a 10 N force pointing east is the same force whether it acts on the left or right side of an object."

---

### TA-B02 — Repair for MC-2 and MC-3 (MAGNITUDE-IS-COORDINATE-SUM / NEGATIVE-MAGNITUDE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"Two arithmetic errors about magnitude. First: computing magnitude as a+b instead of √(a²+b²). Second: thinking scalar multiplication by a negative number makes the magnitude negative. Both stem from not seeing the vector as a geometric arrow."

**P41 — MISCONCEPTION DETECTOR**
"What is the magnitude of the vector (3,4)?
(A) 7 (= 3+4).
(B) 5 (= √(3²+4²))."
[If A: learner holds MC-2.]
"What is |−2(3,4)|?
(A) −10 (the scalar is negative, so the magnitude is negative).
(B) 10 (magnitude is always non-negative)."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"MC-2: Draw (3,4) on a coordinate grid. It is a right triangle with legs 3 (horizontal) and 4 (vertical). The arrow IS the hypotenuse. By Pythagoras: length = √(3²+4²) = √25 = 5, not 7. The magnitude is a LENGTH — always found via Pythagoras, never by adding components.
MC-3: Magnitude is always non-negative — it is a length. −2(3,4)=(−6,−8). This arrow points in the opposite direction and is twice as long. Its magnitude: √((−6)²+(−8)²)=√(36+64)=√100=10. The negative sign of the scalar reversed the DIRECTION — it did not make the LENGTH negative. Distances are never negative."

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"u=(5,−12). (a) Find |u|. (b) Find the unit vector û. (c) Find −3u and |−3u|."
[Expected: (a) √(25+144)=√169=13. (b) û=(5/13,−12/13). (c) −3u=(−15,36), |−3u|=√(225+1296)=√1521=39=3×13.]

**Day 10 prompt:**
"Three force vectors act on a particle: F₁=(3,0), F₂=(0,4), F₃=(−1,−2). Find the net force vector and its magnitude. If the particle is in equilibrium, what fourth force F₄ would be needed?"
[Expected: F_net=F₁+F₂+F₃=(2,2). |F_net|=√8=2√2. For equilibrium: F₄=−F_net=(−2,−2).]

**Day 30 prompt:**
"Explain in words why vector addition is commutative (u+v=v+u) using both the algebraic and geometric (head-to-tail) perspectives."
[Expected: Algebraic: (a+c,b+d)=(c+a,d+b) by commutativity of real addition. Geometric: the parallelogram law — u+v and v+u are the two diagonals of the same parallelogram, both representing the same net displacement.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.geom.coordinate-plane — x-y axis, plotting, components as horizontal/vertical displacements
- math.arith.addition — component-wise addition of integers/fractions; scalar multiplication

**Unlocked blueprints:**
- math.geom.vectors-3d — extends to three components
- math.linalg.vector — abstract vector space definition; 2D vectors are the canonical concrete example

**Cross-links (Tier-1 — cross-link probe mode):**
- math.linalg.vector — geometric 2D vectors ARE elements of the vector space ℝ²; the abstract axioms of vector spaces are satisfied by component-wise operations; the Euclidean norm is the standard inner-product-induced norm

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The vector-vs-point distinction (MC-1) is the most important conceptual shift. Invest time in A01's navigation analogy and make explicit that the same notation (a,b) means different things depending on context.

**Pythagorean connection:** The magnitude formula must be derived from the geometric picture (right triangle with legs a and b), not just stated. Learners who see the derivation once remember it; learners who memorise the formula alone forget or misapply it.

**Physical motivation:** Force, velocity, and displacement are all vectors. Grounding abstract vector operations in physical contexts (A03 force example) makes the rules meaningful rather than arbitrary.

**Negative scalar:** Emphasise with a drawing: −1v is the same arrow, pointing the opposite direction. Magnitude is a length — always positive. This resolves MC-3 with a single diagram.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07, A03: P06
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01 and B02 comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: cross_links=[math.linalg.vector] is Tier 1 → P76 cross-link probe mode (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 present in A02 (GR — apply requires worked example pair)
- [x] V-12: Misconception registry has ≥3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC; B01 covers MC-1; B02 covers MC-2 and MC-3
- [x] V-14: P76 cross-link probe connects 2D geometric vectors to abstract vector space ℝ² and Euclidean norm
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.80 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: No curriculum content generated outside the Canonical KG description; all mathematical content consistent with KG fields and standard geometry/linear algebra pedagogy; no fabricated identities or misleading claims

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.80 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"u=(2,−1) and v=(3,4). Compute 2u−v."
[Expected: 2u=(4,−2). 2u−v=(4−3,−2−4)=(1,−6).]

**Item 2:**
"Find the magnitude of the vector w=(−5,12)."
[Expected: |w|=√(25+144)=√169=13.]

**Item 3:**
True or False: "If k<0, then |kv|<0."
[Expected: FALSE. Magnitude is always non-negative. |kv|=|k|·|v|≥0. The negative scalar reverses direction but does not make length negative.]

**Item 4:**
"Find the unit vector in the direction of u=(3,4)."
[Expected: |u|=5. û=(3/5,4/5). Verify: (9/25+16/25)=1 ✓.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (cross-link probe: math.linalg.vector)

"In linear algebra, vectors in ℝ² are the 2D vectors from geometry, viewed as abstract elements of a vector space.

Let u=(1,2) and v=(3,−1).

(a) Compute u+v and 3u−v using geometric (component-wise) vector operations.
(b) A vector space requires: (u+v)+w=u+(v+w), u+v=v+u, and c(u+v)=cu+cv. Verify the last property for c=3, using your answer to (a) or new computations.
(c) Compute |u|. In the abstract vector space ℝ², this is the Euclidean norm ‖u‖. What is the connection between the geometric magnitude and the algebraic norm?"

[Expected:
(a) u+v=(4,1); 3u−v=(3−3,6+1)=(0,7).
(b) 3(u+v)=3(4,1)=(12,3). 3u+3v=(3,6)+(9,−3)=(12,3). Equal ✓.
(c) |u|=√(1+4)=√5. The Euclidean norm ‖u‖=√(u₁²+u₂²)=√5. They are identical — the geometric magnitude of a 2D vector equals the Euclidean norm of the corresponding element of ℝ². Geometry and algebra agree: the arrow's length equals the algebraic norm.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if parts (a) and (c) are correct (the cross-link connection explicitly stated), 0 otherwise. Part (b) supports the reasoning but the binary score anchors on the norm identity in (c).

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner can compute vector operations (addition, subtraction, scalar multiplication, magnitude, unit vector) and connect 2D geometric vectors to the abstract vector space ℝ².
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 2 or Item 4 (magnitude or unit vector): → TA-B02 (MC-2 repair)
- FAIL on Item 3 (negative magnitude): → TA-B02 (MC-3 repair)
- FAIL on Item 1 (component-wise arithmetic): → TA-B01; review A01 vector addition
- FAIL on P76 (abstract norm connection): → Review A03 scalar/vector distinction; re-gate
- FAIL on multiple items: → TA-B01 then TA-B02; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh items + P76 equivalent. Apply MAMR 4/5. Record repair score.

---

#### P78 — COMPLETION

"You have demonstrated ability to work with 2D vectors — computing sums, differences, scalar multiples, magnitudes, and unit vectors — and connected the geometric picture to the abstract vector space ℝ².

Key anchors to carry forward:
- A vector is a displacement (instruction), not a point (location). Same notation, different meaning.
- Addition: (a,b)+(c,d)=(a+c,b+d); geometric: head-to-tail.
- Magnitude: |(a,b)|=√(a²+b²) — Pythagorean theorem; always non-negative.
- Unit vector: û=v/|v|; magnitude 1, same direction.
- Geometric vectors in ℝ² satisfy all vector space axioms: they ARE ℝ².

Next concepts: math.geom.vectors-3d — extends all operations to three components; math.linalg.vector — the abstract vector space framework that unifies 2D vectors, functions, polynomials, and matrices."

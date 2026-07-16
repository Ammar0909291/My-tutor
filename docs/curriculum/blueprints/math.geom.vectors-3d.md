# Teaching Blueprint — math.geom.vectors-3d

## Component 0 — Metadata
concept_id: math.geom.vectors-3d
concept_name: Vectors in 3D
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 6
mastery_threshold: 0.80
CPA_entry_stage: P
requires: [math.geom.vectors-2d]
cross_links: [math.linalg.vector, math.calc.multivariable-intro]
P76_mode: cross-link-probe

---

## Component 1 — Cognitive Map

**Core concept:** Vectors in ℝ³ extend 2D vectors to triples (a,b,c) with a z-component encoding height or depth. All 2D operations generalise: addition, scalar multiplication, and magnitude by Pythagoras in 3D. Two new products emerge: the dot product u·v=a₁a₂+b₁b₂+c₁c₂ (scalar, encodes angle) and the cross product u×v (vector perpendicular to both, encodes area/orientation).

**Conceptual progression:**
1. Extension to 3D: ordered triple (a,b,c); z-axis perpendicular to xy-plane; operations identical to 2D but with three components.
2. Magnitude: |(a,b,c)|=√(a²+b²+c²) — Pythagoras applied in 3D (extend by one more leg).
3. Dot product: u·v=Σuᵢvᵢ; algebraically a scalar; geometrically u·v=|u||v|cos θ → measures angle.
4. Cross product: u×v defined by the determinant formula; a vector perpendicular to both u and v; |u×v|=|u||v|sin θ → magnitude = area of parallelogram; u×v=−v×u (anticommutative).
5. Geometric interpretation: dot product (projection, angle, orthogonality test); cross product (normal to a plane, signed area, right-hand rule).
6. Standard basis: i=(1,0,0), j=(0,1,0), k=(0,0,1). Every 3D vector = aᵢ+bj+ck.

**CPA arc (entry: P):**
- Pictorial: 3D coordinate axes on paper; arrows in space; parallelogram area from cross product; right-hand rule for direction of u×v
- Abstract: component notation (a,b,c); dot product formula u·v=a₁a₂+b₁b₂+c₁c₂; cross product 3×3 determinant formula; angle formula cos θ=u·v/(|u||v|)

**Prior knowledge activated:** 2D vectors (components, addition, scalar multiplication, magnitude); Pythagorean theorem extended; 2×2 and 3×3 determinants (for cross product); concept of angle between vectors

---

## Component 2 — Misconception Registry

### MC-1: Z-AXIS-IS-DECORATIVE [FOUNDATIONAL]
**Description:** Learner can work in 2D comfortably but treats the z-component as an extra label rather than a fully equal third coordinate. Makes errors by ignoring z in computations or treating z-dependence as optional.
**Surface form:** "The magnitude of (2,3,6) is √(4+9)=√13." (Ignores z=6.)
**Root cause:** Most geometric intuition is built in 2D. The z-coordinate is invisible on a flat page and requires deliberate spatial imagination. Until the learner has internalized 3D as a full coordinate system, z may be treated as supplementary.
**Trigger condition:** Any magnitude, dot product, or cross product computation with a nonzero z-component.
**Repair target:** TA-B01.

### MC-2: CROSS-PRODUCT-IS-COMMUTATIVE
**Description:** Learner computes u×v and assumes u×v=v×u, forgetting the anticommutativity u×v=−(v×u).
**Surface form:** "u×v=(2,−1,3), so v×u=(2,−1,3) as well."
**Root cause:** Dot product IS commutative (u·v=v·u), and learner carries this property over to the cross product without testing it. The sign-flip under reversal is a new and non-intuitive property.
**Trigger condition:** Any problem involving both u×v and v×u, or asking about the direction of the cross product.
**Repair target:** TA-B02.

### MC-3: DOT-PRODUCT-IS-A-VECTOR
**Description:** Learner believes the dot product of two vectors is a vector — perhaps in the direction of one of the inputs. Confuses the dot product (scalar) with scalar multiplication or projection.
**Surface form:** "u·v = (3,2,1)·(1,0,2) = (3,0,2)" (component-wise multiplication rather than sum).
**Root cause:** Vector operations in 2D (addition, scaling) all produce vectors. The dot product is the first operation encountered that maps two vectors to a scalar. This breaks the pattern.
**Trigger condition:** Any problem asking for the dot product of two 3D vectors.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Find |(3,4)| and the unit vector in its direction." If the learner answers |u|=5, û=(3/5,4/5), 2D magnitude and unit vectors are solid. Proceed to A01 with the z-extension.

**Scaffolding ladder:**
- Rung 1 (pictorial): 3D coordinate axes diagram. Learner plots three vectors on the diagram, identifying x, y, z components visually.
- Rung 2 (partial abstract): Learner computes dot product for given triples, then interprets the sign (positive/zero/negative → acute/right/obtuse angle).
- Rung 3 (full abstract): Learner sets up and computes cross product using the 3×3 determinant formula independently.

**Pacing note:** h=6 estimated hours; A01–A02 in session 1; A03 + mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Navigation in a multi-storey building.
"2D navigation: go 3 corridors east, 4 corridors north — position is (3,4).
3D navigation: go 3 corridors east, 4 corridors north, then take the elevator 5 floors up — position is (3,4,5)."
The z-component is the floor number — fully independent of x and y, measurable, not decorative.

TARGET DOMAIN: The 3D vector v=(3,4,5).
- x-component 3: horizontal displacement in one direction.
- y-component 4: horizontal displacement in the perpendicular direction.
- z-component 5: vertical displacement.
- Magnitude: |v|=√(3²+4²+5²)=√(9+16+25)=√50=5√2.

EXTENSION FROM 2D: every 2D operation extends naturally to 3D:
- Addition: (a₁,b₁,c₁)+(a₂,b₂,c₂)=(a₁+a₂,b₁+b₂,c₁+c₂).
- Scalar mult: k(a,b,c)=(ka,kb,kc).
- Magnitude: |(a,b,c)|=√(a²+b²+c²). Pythagorean theorem in 3D: hypotenuse of the 3D right triangle with legs a, b, c.

STANDARD BASIS VECTORS:
i=(1,0,0), j=(0,1,0), k=(0,0,1).
Every 3D vector: v=(a,b,c)=aᵢ+bj+ck.
These are the unit vectors along the three axes — the "compass directions" in 3D.

**Assessment primitive: P49**

PROBE: "Given u=(2,−1,3) and v=(−1,4,0): (a) Compute u+v. (b) Compute |u|. (c) Find the unit vector û."
- CORRECT: "(a) u+v=(1,3,3). (b) |u|=√(4+1+9)=√14. (c) û=(2/√14,−1/√14,3/√14)." → "All three correct. The z-component participates equally in magnitude and direction."
- PARTIAL: Correct sum and magnitude, wrong unit vector → "û=u/|u|=(2,−1,3)/√14=(2/√14,−1/√14,3/√14). Divide each component by √14."
- INCORRECT: |u|=√(4+1)=√5 (z ignored) → Address MC-1: "3D magnitude includes ALL THREE components: √(a²+b²+c²). For u=(2,−1,3): √(2²+(−1)²+3²)=√(4+1+9)=√14."
- NO_RESPONSE: "For (b): list the three components of u, square each, add them, take the square root. Do NOT skip the z-component."

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Dot product: scalar, measures angle.
"u=(1,2,2), v=(2,1,−1). Compute u·v and the angle between them."

STEP 1 — Dot product (scalar):
u·v = 1×2 + 2×1 + 2×(−1) = 2+2−2 = 2.

STEP 2 — Magnitudes:
|u| = √(1+4+4) = √9 = 3.
|v| = √(4+1+1) = √6.

STEP 3 — Angle:
cos θ = u·v / (|u||v|) = 2 / (3√6).
θ = arccos(2/(3√6)) ≈ arccos(0.272) ≈ 74.2°.

STEP 4 — Orthogonality check:
u·v > 0 → acute angle (< 90°). If u·v = 0 → perpendicular. If u·v < 0 → obtuse angle (> 90°).

WORKED EXAMPLE 2 — Cross product: vector, measures area.
"u=(1,2,2), v=(2,1,−1). Compute u×v."

STEP 1 — Cross product via 3×3 determinant formula:
u×v = det([[i,j,k],[1,2,2],[2,1,−1]])
= i(2×(−1)−2×1) − j(1×(−1)−2×2) + k(1×1−2×2)
= i(−2−2) − j(−1−4) + k(1−4)
= (−4)i − (−5)j + (−3)k
= (−4, 5, −3).

STEP 2 — Verify perpendicularity:
(u×v)·u = (−4)(1)+(5)(2)+(−3)(2) = −4+10−6 = 0 ✓.
(u×v)·v = (−4)(2)+(5)(1)+(−3)(−1) = −8+5+3 = 0 ✓.
The cross product is perpendicular to BOTH original vectors.

STEP 3 — Magnitude = area:
|u×v| = √(16+25+9) = √50 = 5√2.
This is the area of the parallelogram formed by u and v.

**Assessment primitive: P49**

PROBE: "a=(1,0,0), b=(0,1,0). Compute: (a) a·b. (b) a×b. (c) What is |a×b|, and what geometric shape has this area?"
- CORRECT: "(a) a·b=0 → perpendicular. (b) a×b=det([[i,j,k],[1,0,0],[0,1,0]])=i(0−0)−j(0−0)+k(1−0)=(0,0,1)=k. (c) |a×b|=1. This is the area of the 1×1 unit square in the xy-plane." → "Perfect. The standard basis vectors i and j are perpendicular (dot product 0) and their cross product is k — the upward unit vector normal to the xy-plane."
- PARTIAL: Correct dot product and cross product, wrong interpretation → "a×b=k=(0,0,1) is correct. |k|=1. Geometrically: a=(1,0,0) and b=(0,1,0) span the unit square in the xy-plane. Area=1×1=1=|a×b| ✓."
- INCORRECT: a×b=(1,1,0) → "Use the determinant formula: a×b=det([[i,j,k],[1,0,0],[0,1,0]]). Expand: i(0·0−0·1)−j(1·0−0·0)+k(1·1−0·0)=i(0)−j(0)+k(1)=(0,0,1)."
- NO_RESPONSE: "For (a): dot product = sum of component products: 1×0+0×1+0×0=0. For (b): set up the 3×3 matrix with i,j,k in row 1, a in row 2, b in row 3. Expand along row 1."

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — DOT PRODUCT: scalar, symmetric, measures alignment.
Definition: u·v = a₁a₂+b₁b₂+c₁c₂.
Output: a SCALAR (single number).
Symmetry: u·v = v·u (commutative).
Geometric meaning: u·v = |u||v|cos θ — encodes the ANGLE between u and v.
Key results:
- u·v = 0 ↔ u and v are perpendicular.
- u·v > 0 ↔ angle acute; u·v < 0 ↔ angle obtuse.
- u·u = |u|² — dot product with itself gives magnitude squared.
Application: projection of u onto v: proj_v(u) = (u·v/|v|²)v.

PAIR B — CROSS PRODUCT: vector, anticommutative, measures area/normal.
Definition: u×v = det([[i,j,k],[a₁,b₁,c₁],[a₂,b₂,c₂]]).
Output: a VECTOR (in ℝ³).
Antisymmetry: u×v = −(v×u) (anticommutative — ORDER MATTERS).
Geometric meaning: u×v is perpendicular to both u and v; |u×v|=|u||v|sin θ = area of parallelogram.
Key results:
- u×v = 0 ↔ u and v are parallel (sin θ=0).
- Direction given by RIGHT-HAND RULE: curl fingers from u toward v; thumb points in direction of u×v.
- i×j=k, j×k=i, k×i=j (cyclic); j×i=−k, k×j=−i, i×k=−j.
Application: normal vector to a plane containing u and v.

CRITICAL CONTRASTS:
| Property | Dot product | Cross product |
|---|---|---|
| Output | Scalar | Vector |
| Commutative? | YES (u·v=v·u) | NO (u×v=−v×u) |
| Defined in | Any dimension | Only ℝ³ (and ℝ⁷) |
| = 0 when | Perpendicular | Parallel |
| Measures | Angle | Area |

**Assessment primitive: P49**

PROBE: "u=(3,0,0) and v=(0,2,0). (a) Is u·v a scalar or vector? Compute it. (b) Is u×v a scalar or vector? Compute it. (c) What is v×u?"
- CORRECT: "(a) Scalar: u·v=0+0+0=0 (perpendicular). (b) Vector: u×v=det([[i,j,k],[3,0,0],[0,2,0]])=i(0)−j(0)+k(6)=(0,0,6). (c) v×u=−(u×v)=(0,0,−6)." → "All three correct. Scalar vs. vector output, commutativity vs. anticommutativity — the core contrast is clear."
- PARTIAL: (a) and (b) correct, wrong (c) → "v×u=−(u×v). Since u×v=(0,0,6), we get v×u=(0,0,−6). Reversing the order reverses the direction of the cross product."
- INCORRECT: "(a) is a vector (0,0,0)" → Address MC-3: "The dot product u·v = 3×0 + 0×2 + 0×0 = 0. It is a SCALAR, not a vector. The result 0 is the NUMBER zero, not the zero vector."
- NO_RESPONSE: "(a) dot product: multiply corresponding components and add: 3×0 + 0×2 + 0×0 = ? Is the result a number or a vector? (b) cross product: use the 3×3 determinant. The result is a vector."

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (Z-AXIS-IS-DECORATIVE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The z-component is a full, equal partner in all 3D computations — not an optional add-on. Omitting z gives the wrong answer in every formula: magnitude, dot product, cross product."

**P41 — MISCONCEPTION DETECTOR**
"Find the magnitude of v=(3,4,5).
(A) |v|=√(9+16)=5 (only x and y used).
(B) |v|=√(9+16+25)=√50=5√2 (all three components)."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"The 3D Pythagorean theorem: in a 3D right triangle, the hypotenuse satisfies d²=a²+b²+c². For v=(3,4,5): the 'diagonal in the horizontal plane' has length √(3²+4²)=5, but v also has a vertical component 5. The TRUE length is √(5²+5²)=√50=5√2. Every formula that uses the norm of a 3D vector MUST include c².
Build the habit: whenever you see (a,b,c), include c in EVERY operation. The z-component is never optional."

---

### TA-B02 — Repair for MC-2 and MC-3 (CROSS-PRODUCT-COMMUTATIVE / DOT-PRODUCT-IS-VECTOR)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"Two common errors about 3D products. First: assuming u×v=v×u (the cross product is NOT commutative — it's anticommutative). Second: treating the dot product as producing a vector. Both errors lead to wrong answers in geometry and physics."

**P41 — MISCONCEPTION DETECTOR**
"u=(1,0,0)=i, v=(0,1,0)=j. Compute u×v and v×u.
(A) u×v=v×u=(0,0,1).
(B) u×v=(0,0,1) and v×u=(0,0,−1): they are negatives of each other."
[If A: learner holds MC-2.]
"Is u·v a scalar or a vector?
(A) Vector — the dot of two 3D vectors produces a 3D vector.
(B) Scalar — u·v is a single number."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"MC-2 (anticommutativity): The right-hand rule makes this geometric. Point fingers along i, curl toward j — thumb points in +k direction. Now point fingers along j, curl toward i — thumb points in −k direction. The direction flips when you reverse the order. u×v=−(v×u) is not just a formula; it encodes the geometric fact that orientation reverses when you swap the vectors.
MC-3 (scalar output): u·v = a₁a₂+b₁b₂+c₁c₂ is a SUM of numbers. The result is one number. For u=(1,0,0), v=(0,1,0): u·v=0+0+0=0. The number 0, not the vector (0,0,0). The dot product is a machine that takes two vectors and produces a measurement — an angle-related number."

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"u=(1,−1,2) and v=(3,1,0). (a) Compute u·v. (b) Are u and v perpendicular? (c) Compute u×v and verify it's perpendicular to both."
[Expected: (a) 3−1+0=2. (b) No (u·v≠0). (c) u×v=(−1×0−2×1, 2×3−1×0, 1×1−(−1)×3)=(−2,6,4). Check: (−2,6,4)·(1,−1,2)=−2−6+8=0 ✓; (−2,6,4)·(3,1,0)=−6+6+0=0 ✓.]

**Day 10 prompt:**
"Find all vectors w=(a,b,c) perpendicular to both i=(1,0,0) and j=(0,1,0). What is the geometric meaning of your answer?"
[Expected: w·i=a=0, w·j=b=0. So w=(0,0,c) for any c — all multiples of k=(0,0,1). Geometrically: the only direction perpendicular to both x and y axes is the z-axis. This is i×j=k.]

**Day 30 prompt:**
"A plane contains the vectors u=(1,2,0) and v=(0,1,3). Find a vector normal to the plane and the equation of the plane through the origin."
[Expected: Normal n=u×v=det([[i,j,k],[1,2,0],[0,1,3]])=i(6−0)−j(3−0)+k(1−0)=(6,−3,1). Plane equation: n·r=0 → 6x−3y+z=0.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.geom.vectors-2d — all 2D vector operations (addition, scalar mult, magnitude, unit vector); 3D extends these directly

**Unlocked blueprints:**
- math.linalg.vector — abstract vector space definition; ℝ³ with dot product is the prototypical inner product space
- math.calc.multivariable-intro — gradients, directional derivatives use 3D vectors; dot product for projections

**Cross-links (Tier-1 — cross-link probe mode):**
- math.linalg.vector — 3D geometric vectors ARE elements of ℝ³; the dot product becomes the standard inner product ⟨u,v⟩; the induced norm ‖u‖=√⟨u,u⟩ equals the geometric magnitude |u|
- math.calc.multivariable-intro — 3D vectors appear as gradient vectors ∇f; dot product gives directional derivatives; cross product gives surface normals for line and surface integrals

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The z-component must be internalised as fully equal to x and y — not decorative. Spend time in A01 on the building navigation analogy and the 3D Pythagorean magnitude formula.

**Cross product direction:** The right-hand rule for u×v direction is best taught physically (hold hand out, curl fingers from u toward v, thumb = direction of u×v). Anticommutativity follows immediately: reversing the input vectors reverses the curl direction, hence the thumb direction.

**Dot vs. cross product summary table:** The contrast in A03 between dot product (scalar, commutative, measures angle) and cross product (vector, anticommutative, measures area) is the most common exam topic. Make this table memorable.

**Connection to determinant:** The cross product formula IS a 3×3 determinant expansion. This connects math.linalg.determinant directly to geometry — reinforcing why the determinant measures area/volume.

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
- [x] V-10: cross_links=[math.linalg.vector, math.calc.multivariable-intro] both Tier 1 → P76 cross-link probe mode (GR-9); probe targets math.linalg.vector (dot product = inner product, norm = magnitude)

### Content Checks
- [x] V-11: bloom=apply; P07 present in A02 (GR — apply requires worked example pair)
- [x] V-12: Misconception registry has ≥3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC; B01 covers MC-1; B02 covers MC-2 and MC-3
- [x] V-14: P76 cross-link probe connects 3D geometric dot product to abstract inner product ⟨u,v⟩ on ℝ³ and induced norm
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.80 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: No curriculum content generated outside the Canonical KG description; all mathematical content consistent with KG fields and standard multivariable calculus/linear algebra pedagogy; no fabricated identities or misleading claims

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.80 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Compute |(−2, 3, 6)|."
[Expected: √(4+9+36) = √49 = 7.]

**Item 2:**
"u=(1,2,−1) and v=(3,−1,2). Compute u·v."
[Expected: 1×3 + 2×(−1) + (−1)×2 = 3 − 2 − 2 = −1. Negative → obtuse angle between u and v.]

**Item 3:**
True or False: "u×v = v×u for all 3D vectors u and v."
[Expected: FALSE. The cross product is anticommutative: u×v = −(v×u). Reversing the order reverses the direction of the result.]

**Item 4:**
"Compute i×j, where i=(1,0,0) and j=(0,1,0)."
[Expected: i×j = k = (0,0,1). (Standard basis result; use the cyclic rule i→j→k→i, or compute via 3×3 determinant.)]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (cross-link probe: math.linalg.vector and math.calc.multivariable-intro)

"In the abstract vector space ℝ³ with the standard inner product ⟨u,v⟩ = u₁v₁+u₂v₂+u₃v₃, let u=(1,1,0) and v=(0,1,1).

(a) Compute ⟨u,v⟩ (the inner product of u and v).
(b) Verify that ⟨u,v⟩ = ⟨v,u⟩ (symmetry). What does this say about the geometric dot product?
(c) Compute the induced norm ‖u‖ = √⟨u,u⟩ and compare it to the geometric magnitude |u| = √(u₁²+u₂²+u₃²).
(d) Are u and v orthogonal in the sense of linear algebra (⟨u,v⟩=0)? What is the geometric angle between them?"

[Expected:
(a) ⟨u,v⟩ = 0+1+0 = 1.
(b) ⟨v,u⟩ = 0+1+0 = 1 = ⟨u,v⟩ ✓. The geometric dot product IS commutative — matching the symmetry axiom of inner products.
(c) ‖u‖ = √⟨u,u⟩ = √(1+1+0) = √2. Geometric: |u| = √(1²+1²+0²) = √2. They are identical — the inner product norm equals the geometric magnitude.
(d) ⟨u,v⟩=1≠0 → NOT orthogonal. Angle: cos θ = ⟨u,v⟩/(‖u‖‖v‖) = 1/(√2·√2) = 1/2. θ = 60°.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (a) and (c) are correct (inner product = geometric dot product; induced norm = geometric magnitude identity stated). 0 if these two core points are wrong.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner can compute 3D magnitude, dot product, and cross product, recognise anticommutativity of cross product, and connect geometric dot product to abstract inner product.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 (z ignored in magnitude): → TA-B01 (MC-1 repair)
- FAIL on Item 3 (commutativity assumed): → TA-B02 (MC-2 repair)
- FAIL on Item 2 (dot product is a vector): → TA-B02 (MC-3 repair)
- FAIL on Item 4 (cross product formula): → Review A02 WE2; re-gate
- FAIL on P76 (inner product connection not made): → Review A03 contrast; re-gate
- FAIL on multiple items: → TA-B01 then TA-B02; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh items + P76 equivalent. Apply MAMR 4/5. Record repair score.

---

#### P78 — COMPLETION

"You have demonstrated the ability to work with 3D vectors — magnitude, dot product (scalar), and cross product (vector) — and connected geometric vectors in ℝ³ to the abstract inner product space structure.

Key anchors to carry forward:
- Magnitude: |(a,b,c)|=√(a²+b²+c²) — ALL three components, always.
- Dot product: scalar, symmetric, measures angle. u·v=0 ↔ perpendicular.
- Cross product: vector, anticommutative (u×v=−v×u), perpendicular to both inputs. |u×v|=area.
- ⟨u,v⟩=u·v is the standard inner product on ℝ³ — geometry and abstract algebra agree.

Next concepts: math.linalg.vector (abstract vector spaces); math.calc.multivariable-intro (gradient = 3D vector; directional derivative = dot product)."

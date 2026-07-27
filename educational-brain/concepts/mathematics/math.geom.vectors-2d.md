# math.geom.vectors-2d

## Identity
- **KG ID**: `math.geom.vectors-2d`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.coordinate-plane`, `math.arith.addition`
- **Unlocks**: `math.geom.vectors-3d`, `math.linalg.vector`
- **Cross-links**: `math.linalg.vector` (Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.geom.vectors-2d.md` (reused by reference throughout this entry).

## Learning Objective
The student will distinguish a vector (a displacement — magnitude and direction, placeable anywhere) from a point (a fixed location sharing the same (a,b) notation), add vectors component-wise and geometrically head-to-tail, scale them by scalars (including negative scalars, which reverse direction but never make length negative), and compute magnitude |v| = √(a²+b²) and unit vectors v̂ = v/|v| via the Pythagorean picture.

## Core Understanding
Per the Blueprint's Component 1: a 2D vector is a quantity with both magnitude and direction, written as an ordered pair (a,b) or drawn as a directed arrow — and critically, it is a displacement, not a location. The instruction "3 right, 4 up" can be applied from any starting point; two parallel arrows of equal length are the same vector. Addition is component-wise, (a,b)+(c,d) = (a+c, b+d), matching the geometric head-to-tail (triangle) law exactly. Scalar multiplication k(a,b) = (ka, kb) stretches (|k|>1), shrinks (|k|<1), or reverses direction (k<0). Magnitude is the Pythagorean hypotenuse of the component right triangle, |v| = √(a²+b²) — always non-negative, never a component sum, and |kv| = |k|·|v| even for negative k. The unit vector v̂ = v/|v| has magnitude 1 in v's direction; the zero vector (0,0) is the additive identity with no direction. Geometric 2D vectors under these operations ARE the vector space ℝ², with magnitude as the Euclidean norm.

## Mental Models
1. **The walking-directions model** (Blueprint TA-A01, P03): a vector is a travel instruction — "3 blocks east, 4 north" — usable from home, the library, or anywhere; the destination changes, the displacement doesn't. A point is the address; a vector is the instruction.
2. **The hypotenuse model** (Blueprint TA-A02, P07): the arrow (a,b) IS the hypotenuse of a right triangle with legs |a| and |b| — magnitude falls straight out of Pythagoras, never out of adding components.
3. **The scalar-as-dial model** (Blueprint TA-A02): the scalar k is a stretch dial with a reverse switch — |k| sets the new length, the sign sets whether direction flips; length itself has no sign.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is treating a vector as a fixed point because the two share the (a,b) notation. A second failure computes magnitude as a+b instead of √(a²+b²). A third believes a negative scalar makes the magnitude itself negative.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — VECTOR-IS-A-POINT** (Foundational)
  - **Blueprint description**: treats the vector (3,4) as the fixed location (3,4); cannot understand why two parallel arrows of the same length represent the same vector.
  - **Birth type**: Type 4, notation-induced — the Blueprint's own root-cause line names it: "the notation (3,4) is shared between points and vectors," and the learner's entire prior experience with that notation is points-as-locations.
  - **Repair approach**: Blueprint Repair TA-B01 — the tail-placement probe ("tail at (1,1): where is the head?") followed by the same-instruction-three-tails demonstration ((0,0)→(3,4), (1,1)→(4,5), (−2,3)→(1,7)).

- **MC-2 — MAGNITUDE-IS-COORDINATE-SUM** (High)
  - **Blueprint description**: computes the magnitude of (a,b) as a+b (or |a|+|b|) rather than √(a²+b²).
  - **Birth type**: Type 1, overgeneralization — component-wise addition is the correct rule for every vector operation taught first (addition, subtraction, scaling), and that pattern is over-applied to magnitude, the one place the components must combine through Pythagoras instead.
  - **Repair approach**: Blueprint Repair TA-B02 — drawing (3,4) as the hypotenuse of the 3-4-5 right triangle, re-anchoring "magnitude is a LENGTH, found via Pythagoras, never by adding components."

- **MC-3 — NEGATIVE-SCALAR-REVERSES-MAGNITUDE** (Moderate)
  - **Blueprint description**: believes −2(3,4) = (−6,−8) has magnitude −10 — conflates the scalar's sign with a signed length.
  - **Birth type**: Type 1, overgeneralization — arithmetic's sign-propagation rule ("multiplying by a negative makes the result negative") is over-applied past the components to the magnitude, which as a length is structurally non-negative.
  - **Repair approach**: Blueprint Repair TA-B02 — computing |(−6,−8)| = √(36+64) = 10 directly, re-anchoring "the negative reversed the DIRECTION; it did not make the LENGTH negative — distances are never negative."

## Analogies
- **Walking directions from any doorstep** (Blueprint TA-A01, P03): the displacement instruction vs the destination address — the core vector/point distinction made physical.
- **Speedometer vs velocity** (Blueprint TA-A03): speed is the scalar magnitude the speedometer shows; velocity is the vector including direction — the scalar/vector contrast grounded in a familiar instrument.

## Demonstrations
- The same vector (3,4) placed at three different tails, landing at three different heads while keeping identical length and direction (Blueprint TA-B01's P64), targeting MC-1.
- Head-to-tail addition of u = (2,1) and v = (−1,3), verified against component arithmetic (1,4) by drawing (Blueprint TA-A01), grounding the triangle law.
- The worked pair 3u, −u, |u| for u = (2,1), including the magnitude check |−u| = |u| = √5 (Blueprint TA-A02, P07), targeting MC-3.
- The boat-and-current resultant velocity problem: (4,3)+(−1,2) = (3,5), speed √34, speed-is-a-scalar classification (Blueprint TA-A03), integrating addition, magnitude, and the scalar/vector distinction.

## Discovery Questions
1. "The vector v = (3,4), placed with its tail at (1,1) — where is its head? Is v still the same vector?"
2. "What is the magnitude of (3,4) — 7, or something else? Draw it and check."
3. "Is |−2v| negative? What kind of quantity is a magnitude?"

## Teaching Sequence
Follows the Blueprint's Protocol A exactly: TA-A01 (navigation analogy, vector-vs-point, head-to-tail addition) → TA-A02 (scalar multiplication, magnitude, unit vectors via worked example pair) → TA-A03 (scalar/vector contrast with force and velocity applications) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — the same-vector-three-tails drawing (Blueprint TA-B01), targeting MC-1 before it forms.
- **DO: Worked Example** — the 3u / −u / |u| triple and the unit-vector computation with its |v̂| = 1 verification (Blueprint TA-A02).
- **TEST-THINKING: Matching** — classifying quantities as scalar or vector (temperature change, wind velocity, distance, displacement) per Blueprint TA-A03's critical-question list.
- **TEST-THINKING: Error Analysis** — presenting "|(3,4)| = 7" and having the student locate the missing Pythagorean step, targeting MC-2.

## Voice Teaching Notes
Before accepting any magnitude, ask "did you draw the right triangle, or did you add the components?" — the standing MC-2 check. Per the Blueprint's Component 8, the vector-vs-point distinction is the most important conceptual shift of the entire concept: invest the analogy time in TA-A01 and make the shared-notation ambiguity explicit rather than hoping it resolves itself.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.linalg.vector` per the Blueprint's Component 0 — Tier 1 cross-link)**: reused verbatim from the Blueprint's TA-A04 — computing with u = (1,2), v = (3,−1) as elements of ℝ², verifying the distributive axiom c(u+v) = cu+cv for c = 3, and identifying the geometric magnitude with the Euclidean norm ‖u‖.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (linear combination 2u−v, magnitude of (−5,12), the |kv|<0 true/false, unit vector of (3,4)) plus P76 (TA-A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-1 persists after TA-B01, switch registers to physics: a 10 N eastward force is the same force wherever it is applied on the object — then return to the coordinate picture. If MC-2 recurs, make the drawing mandatory: no magnitude may be stated until the component right triangle is on paper with its legs labeled.

## Memory Hooks
- "A point is an address; a vector is a travel instruction."
- "Magnitude is the hypotenuse — square, sum, square-root, never just add."
- "A negative scalar flips the arrow; it never makes a length negative."
- "Unit vector: divide every component by the magnitude — length 1, direction kept."

## Transfer Connections
- `math.geom.coordinate-plane` and `math.arith.addition` (require) supply the component representation and the component-wise arithmetic every vector operation reduces to.
- `math.geom.vectors-3d` (unlocks) extends every operation here by one component with no structural change.
- `math.linalg.vector` (unlocks, cross-link, Blueprint exists, no EB entry) generalizes 2D vectors into the abstract vector-space framework — 2D vectors ARE ℝ², the canonical concrete example, with magnitude as the Euclidean norm.
- `math.geom.pythagorean-theorem` (already-authored EB sibling) is the engine inside the magnitude formula — the component triangle is a direct application.

## Cross-Subject Connections
- Physics: displacement, velocity, and force are the motivating vector quantities throughout the Blueprint (net force, boat-and-current resultants, equilibrium in the Day-10 spaced probe) — vector addition here is literally how forces combine there.

## Blueprint References
`docs/curriculum/blueprints/math.geom.vectors-2d.md` — all teaching actions, worked examples, repair scripts, the P89 spaced-repetition schedule, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time. (Blueprint metadata matches the KG on difficulty, bloom, hours, threshold, requires, and cross-links; the Blueprint's Component 7 additionally lists both KG `unlocks` targets accurately.)

## Version History
- v1.0 (2026-07-27): Initial authoring, Domain Certification Mode, math.geom Wave 9.

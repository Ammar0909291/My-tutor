# Dot and Cross Products — `phys.meas.vector-products`

## Identity

- **Concept ID**: `phys.meas.vector-products`
- **Curriculum location**: physics / measurement & units
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.vector-addition` — the load-bearing part is components (x and y
    representation of a vector) and the understanding that vectors are geometric
    objects with direction, not just numbers. The learner needs to be comfortable
    multiplying vector components by scalars and summing results; the dot product
    is that operation generalised, and the cross product requires knowing that
    direction is a first-class attribute.
- **Unlocks** (from KG): `phys.mech.torque`, `phys.mech.work` — the two most
  important physics quantities that require these products. Work is F·d·cos θ
  (the dot product of force and displacement); torque is r × F (the cross product
  of position and force). Without these products, the learner can only do
  restricted versions of both concepts (1D work, magnitude-only torque). Every
  advanced mechanics, electromagnetism, and quantum mechanics calculation uses one
  or both products.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80 ·
  **Est. hours**: 4 · **References**: NCERT Physics Class 11 Ch. 4; H.C. Verma Vol. 1

## Learning Objective

After this concept, the learner can:

1. Compute the dot product using the geometric formula (A·B = |A||B|cos θ) and
   the component formula (A·B = AₓBₓ + AᵧBᵧ + A_zB_z), and state the result is
   a scalar.
2. Determine the angle between two vectors using the dot product.
3. Compute the magnitude of the cross product (|A × B| = |A||B|sin θ), find its
   direction by the right-hand rule, and state the result is a vector perpendicular
   to both operands.
4. Identify which product (dot or cross) is appropriate for a given physical
   context (work → dot; torque → cross) and justify the choice.

## Core Understanding

There are two fundamentally different ways to "multiply" two vectors, and physicists use both constantly — but never interchangeably. The type of physical question you're asking determines which one you need.

The dot product (A·B) asks: "how much of A goes in the direction of B?" It extracts alignment. When a force pushes an object sideways while it moves forward, only the forward component of the force does work — the dot product captures exactly that. The result is always a scalar — a single number — because alignment has no direction. When two vectors are perpendicular, their dot product is zero (none of A lies along B). When they point the same way, the dot product is maximum. The formula is A·B = |A||B|cos θ.

The cross product (A × B) asks: "how much rotation do these two vectors generate together?" It extracts perpendicularity. When a wrench handle and the applied force are both in the same plane, their cross product gives the torque: a vector pointing along the bolt's axis — perpendicular to BOTH the handle and the force — whose magnitude tells you how strongly the bolt turns. The result is a vector in a new direction. When two vectors are parallel, the cross product is zero (no rotation). When they're perpendicular, the cross product is maximum. The formula is |A × B| = |A||B|sin θ, with direction given by the right-hand rule.

The non-obvious consequence: these two products are opposite in their sensitivity to angle. Dot product is maximum at 0° (parallel), zero at 90° (perpendicular), negative at 180°. Cross product is zero at 0°, maximum at 90°. They are complementary measurements — the part of A that "goes along" B, and the part that "goes across" B.

## Mental Models

- **Beginner (arriving)**: "multiplying vectors" means multiplying the magnitudes
  (like scalars) — no concept that two different products can exist or that the
  result's type (scalar vs. vector) depends on how you multiply. Alternatively,
  the learner thinks you multiply each component of A with the corresponding
  component of B and get a vector result — a confusion of element-wise multiplication
  with the actual definitions.
- **Intermediate**: the dot product extracts "how much of A goes in the direction
  of B" — it is the cosine-weighted overlap of two vectors, giving a scalar that
  is zero when they're perpendicular and maximum when they're parallel. The cross
  product extracts "how much rotation do A and B create together" — a new vector
  perpendicular to both, with magnitude equal to the area of the parallelogram
  they span, and direction given by the right-hand rule.
- **Advanced**: both products are bilinear, distributive operations on vectors.
  The dot product is commutative (A·B = B·A); the cross product is
  anti-commutative (A × B = −B × A). The cross product is zero when vectors are
  parallel (sin 0 = 0) and maximum when perpendicular (sin 90° = 1) — exactly
  opposite to the dot product. The component form of the cross product follows
  the determinant expansion of a 3×3 matrix; for 2D vectors in the xy-plane,
  the cross product always points along the z-axis.
- **Expert**: both products arise from the inner-product and exterior-product
  structure of vector spaces. The dot product generalises to any inner product
  (including function spaces — Fourier analysis uses this); the cross product
  generalises to the Hodge star operator or exterior product in n dimensions.
  The right-hand rule is a convention tied to our choice of handedness (chirality)
  for the coordinate system.
- **Versioning note**: install the intermediate model here (the physical meaning
  of each product and one formula for each). The component formula for the cross
  product (determinant form) is taught here but deeper understanding of why it
  works is deferred to linear algebra.

## Why Students Fail

The dot product's result being a SCALAR surprises learners — "you multiplied two
vectors and got a number?" They have no mental model for this before it's taught.
The cross product's result being a VECTOR in a NEW direction (perpendicular to both
inputs) is even more surprising. Both failures stem from expecting "vector × vector
→ same kind of result as scalar × scalar." The right-hand rule is the second major
failure: it is a rule about spatial handedness that has no everyday analogy, and
learners often confuse the curl direction, apply it inconsistently, or use the
wrong hand (left vs. right). Distinguishing when to use dot vs. cross is a third
failure — learners apply dot product to torque or cross product to work because
they can't connect the physical meaning to the mathematical tool.

## Misconceptions

**M1 — The dot product produces a vector (element-wise multiplication)**
- *Why*: "multiply two vectors" sounds like "multiply each component" — element-wise
  products produce a vector; the actual dot product doesn't (type 2, generalisation
  from scalar multiplication).
- *Symptom / phrases*: writes A·B = (AxBx, AyBy, AzBz); calls this "the dot product."
- *Detection probe (verbatim)*: "What type of quantity is the dot product of two
  vectors?" Correct: scalar. Wrong: "a vector" or "depends on the vectors."
- *Recovery*: the definition — A·B = |A||B|cos θ — is a product of three scalars
  (|A|, |B|, cos θ), giving one scalar. No direction possible. Then: show the
  component formula as an alternative calculation (AxBx + AyBy — note: you ADD the
  products, don't keep them separate as a vector).
- *Verification*: compute several dot products; confirm each result is a single
  number; verify sign (positive when θ < 90°, zero when θ = 90°, negative when
  θ > 90°).

**M2 — The cross product is commutative (A × B = B × A)**
- *Why*: ordinary multiplication of numbers is commutative; learners expect the
  same here (type 4, overgeneralisation from scalar/dot-product commutativity).
- *Symptom*: writes A × B and B × A interchangeably; ignores the direction change.
- *Detection probe*: "If A × B points out of the page, which direction does B × A
  point?" Correct: into the page (reversed). Wrong: "also out of the page."
- *Recovery*: the right-hand rule applied BOTH ways. Curl fingers from A to B →
  thumb points one way. Curl fingers from B to A (reversing) → thumb points
  opposite. B × A = −(A × B) — the anti-commutative rule is a physical consequence
  of switching the rotation direction.
- *Verification*: three problems requiring B × A given A × B; include a torque
  problem where the direction matters for physical outcome.

**M3 — The right-hand rule: which fingers curl, which way**
- *Why*: the rule involves spatial handedness — a 3D skill many learners lack
  explicit practice with; different textbooks describe it differently (type 5,
  inconsistent instruction).
- *Symptom / phrases*: sometimes gets the right direction, sometimes wrong; uses
  left hand; cannot consistently apply the rule.
- *Detection probe*: given A = î (east) and B = ĵ (north), find A × B. Correct:
  k̂ (out of page). Ask the learner to show their hand position while answering —
  observe which hand, which direction of curl.
- *Recovery*: ONE canonical method, repeated until automatic. Point the fingers of
  the RIGHT HAND in the direction of the FIRST vector (A). Curl them toward the
  SECOND vector (B). The thumb points in the direction of A × B. Practise with
  the unit vectors: î × ĵ = k̂; ĵ × k̂ = î; k̂ × î = ĵ. Memorise the cycle
  (not the formula — the hand motion).
- *Verification*: 10 cross-product direction problems using unit vectors and
  standard 3D scenarios; learner must state direction AND show hand position.

**M4 — Use cross product for work, dot product for torque (swapped)**
- *Why*: learners don't connect the formula to the physical reason; they memorise
  which formula goes with which name without understanding why (type 5,
  rote without meaning; inverts under pressure).
- *Symptom*: calculates torque as r·F (dot product) or work as F × d.
- *Detection probe*: "Why is work calculated with the dot product and torque with
  the cross product?" A learner with M4 cannot answer; they just know which formula
  to use (or don't).
- *Recovery*: the physical reason. Work = "how much force goes in the direction
  of motion?" → the component of F along d → cos θ → dot product. Torque = "how
  much rotation does this force create around this axis?" → the force perpendicular
  to the position vector creates rotation → sin θ → and the rotation axis is
  perpendicular to both r and F → cross product. Physical meaning dictates formula.
- *Verification*: three novel physical scenarios — learner identifies which product
  applies and states the reason, not just the formula.

## Analogies

- **Best analogy (dot product)**: the shadow analogy. The dot product is like
  the shadow of vector A on vector B. If they point the same way, full shadow
  (maximum dot product). If they're perpendicular, no shadow (zero). If they
  point opposite ways, a "negative shadow" (negative dot product). The shadow
  length times |B| is the dot product.
  *Breaking point*: a shadow is a physical projection of one vector onto another;
  the dot product is symmetric (A·B = B·A), but the shadow of A on B has the same
  LENGTH as the shadow of B on A only when |A| = |B|. Don't extend the asymmetric
  shadow picture too far.
- **Best analogy (cross product)**: the wrench. The torque you exert on a bolt
  depends on how perpendicular your force is to the wrench handle AND which direction
  you turn it. Forcing the wrench parallel to the bolt achieves nothing (sin 0 = 0);
  forcing it perpendicular maximises torque. The direction of the torque (along the
  bolt's axis) is exactly what the cross product gives.
  *Breaking point*: the wrench analogy is concrete for torque but less intuitive
  for other cross-product contexts (e.g. magnetic force on a moving charge).
- **Anti-analogy to avoid**: "the dot product and cross product are just two ways
  of multiplying numbers with direction." This implies they are interchangeable or
  differ only in formula, not in what physical information they extract. They are
  NOT interchangeable — the choice of which to use is always dictated by the
  physics of the situation.

## Demonstrations

- **Home, no equipment**: hold a book in one hand as a door. Pull the book with
  one finger at various positions and angles. Notice: pulling perpendicular to the
  spine (far from the spine) creates the most rotation — this is maximum cross
  product (force × position arm perpendicular). Pulling along the spine creates
  no rotation (sin 0 = 0 — cross product zero). Pulling close to the spine
  (small r) creates less rotation even with the same force (small |r| → small
  cross product).
- **Teacher demo**: two force vectors on a whiteboard. Compute the angle between
  them using the dot product and arccos. Verify with a protractor. Show that the
  dot-product method finds the angle without measuring it — this IS a use case for
  the dot product.
- **Interactive**: PhET "Masses and Springs" or any simulation that shows angular
  motion — observe that the rotation axis is perpendicular to the plane of r and F.
- **Prediction**: given î × ĵ, ask the learner to predict the result using the
  right-hand rule before computing. This forces application before confirmation.

## Discovery Questions

**Direct instruction with motivated examples** is the right form here — both
products are definitions (chosen because they are useful), not facts discoverable
from first principles. The NEED for the products, however, can be discovered:

**Structure** (need-then-tell):
1. *Need*: "How do you find the work done by a force that isn't in the same
   direction as the motion?" Lead learner to recognise they need "the component of
   force along displacement" — motivate the dot product from the physics.
2. *Tell*: define the dot product. Give both the geometric and component formulas.
   Multiple examples.
3. *Need*: "How do you describe the tendency to rotate — if force is at different
   angles to the lever arm?" Lead to recognising they need a formula for the
   effective perpendicular force. Motivate the cross product.
4. *Tell*: define the cross product magnitude. Introduce the right-hand rule for
   direction. Teach the component formula.
5. *Discrimination*: work out one work problem (dot) and one torque problem (cross)
   side by side. Name the physical reason for each choice.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Direct instruction with need-creation** (primary): motivated as above.
2. **Worked examples** (high fit): three to four for each product, increasing
   in context from pure math to physics application.
3. **Discrimination training** (high fit): alternating dot-and-cross problems
   without labelling which to use — the learner must identify from context.
4. **Error exposure**: show the cross product computed with left hand vs. right
   hand — different result. Show why anti-commutativity matters in torque.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — one dot-product trace and one cross-product trace side by side:
   Dot: A = (3, 4, 0), B = (1, 2, 0); A·B = 3×1 + 4×2 + 0 = 11 (scalar — no direction)
   Cross: A × B = (0×0−0×2, 0×1−3×0, 3×2−4×1) = (0, 0, 2) (vector — has direction)
   State the result type BEFORE computing: "dot gives a number; cross gives a vector
   perpendicular to both." State again AFTER: "number (11) vs. vector pointing out of
   the page (0, 0, 2)." The type distinction must frame every calculation.

2. **DISCRIMINATION-TRAINING** — five physics scenarios, learner identifies which
   product to use BEFORE computing: (a) work done by a force on a displacement;
   (b) torque of a force about a pivot; (c) projection of velocity onto a surface normal;
   (d) magnetic force on a moving charge; (e) power delivered by a force.
   The selection skill is separate from the computation skill — drill both.

3. **ERROR-ANALYSIS** — present: student computes A × B using left-hand rule.
   Show the sign error in the direction. Ask: "what did the right-hand rule
   predict?" Reinforce: anti-commutativity (A × B = −B × A) as verification
   tool — if you get the same result both ways, you made an error.

4. **RETRIEVAL-SCHEDULE-PROMPT** — three session openers:
   "What type of quantity does each product return?" → "In torque τ = r × F, which
   direction does τ point if r is east and F is north?" → "When would you use
   the dot product vs. the cross product in a new physics problem?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor always says "SCALAR result" when
describing the dot product and "VECTOR perpendicular to both" when describing
the cross product; the physical meaning is stated before the formula every time;
the right-hand rule is demonstrated with an actual hand.

*Load-bearing sentence to slow down on*: "The dot product and cross product are
not interchangeable — you use the DOT product when the physics cares about parallel
alignment (work, power, projection), and the CROSS product when the physics cares
about perpendicular rotation (torque, angular momentum, magnetic force)." Slow.

*What to listen for*: "the dot product gives a vector" → M1; "A × B and B × A
are the same" → M2; wrong hand or wrong curl direction → M3; learner swaps which
product to use for work vs. torque → M4.

## Assessment Signals

**Diagnostic — golden probe**: "Vectors A = 3î + 4ĵ and B = 4î − 3ĵ. Find A·B
and |A × B|." This requires: dot product = (3)(4) + (4)(−3) = 12 − 12 = 0 (they
are perpendicular). |A × B| = |A||B|sin 90° = 5 × 5 × 1 = 25 (maximum, since
perpendicular). A learner who gets A·B ≠ 0 or gives a vector for A·B has M1;
one who gets |A × B| ≠ 25 without working needs to revisit sin θ.

**Distractor-mapped items**:
- "The dot product of two perpendicular vectors is: (A) maximum, (B) zero, (C) their
  magnitudes multiplied, (D) negative." Answer: B. Distractor A (maximum) reflects
  confusion with cross product; C targets M1.
- "A × B = 6k̂. What is B × A?" Options: 6k̂, −6k̂, 0, 6î + 6ĵ. Answer: −6k̂.
  Targets M2.

**Guided practice → independent practice fading ladder**:
1. Compute dot products of given vector pairs using component formula (scaffolded).
2. Find angle between two vectors using dot product (arccos).
3. Compute cross product magnitude for given vector pairs.
4. Apply right-hand rule to find cross product direction for 5 problems.
5. Choose dot or cross for 6 physics scenarios (work, torque, magnetic force,
   projection) and compute.
6. (Delayed, 1 week): compute work done by a force at an angle; compute torque
   for a perpendicular and non-perpendicular force.

**Mastery gate set** (per assessment/05):
- *Production*: given two 3D vectors, compute their dot and cross products, state
  each result's type, and use dot product to find the angle between them.
- *New surface*: apply cross product to magnetic force: F = qv × B.
- *Mixed*: interleaved dot-product and cross-product problems, some pure math,
  some physics-context.
- *Delayed*: torque calculation requiring cross product and right-hand rule.

**Calibration note**: learners frequently feel confused about which formula to
use in which context. True mastery = explaining WHY (physics of parallel vs.
perpendicular), not just knowing WHICH. Calibration probe: "why is torque a
cross product and not a dot product?" — written justification required.

## Tutor Recovery Strategy

*Likeliest utterance*: "I don't know which rule to use" (M4); "the right-hand
rule always confuses me" (M3); "I got a vector for the dot product" (M1).

*Concept-specific smaller question for M4*: "For work — do you want the full
force, or just the part going in the direction of motion?" (Just the part in the
direction.) "Does that give you a number or a new vector?" (A number.) "That
number is the dot product." For torque — analogous path, ending with a rotation
axis (a direction) as the result → cross product.

*M3 recovery*: drill the unit-vector cycle: î × ĵ = k̂; ĵ × k̂ = î; k̂ × î = ĵ
— learn the pattern, not the formula. Reversals give negatives. Practice hand
position with every problem until the hand motion is automatic.

## Memory Hooks

- **Concept type**: procedure (two formulas) + concept (physical meaning of each).
- **Review form** (per Delivery 2 §8): spaced physical-context retrieval — "in
  which physical situations does work appear? What product gives work?" Monthly
  re-visit across the curriculum whenever work or torque appears.
- **Automaticity target**: choosing the right product for a given physics context
  should be automatic (not deliberated) before the learner reaches electromagnetism
  (magnetic force requires the cross product; electric potential uses dot product).
- **Interleaving partners**: `phys.mech.work` (immediate dot-product application);
  `phys.mech.torque` (immediate cross-product application); `phys.em.magnetic-force`
  (cross product reappears with new physical meaning).

## Transfer Connections

- *Near*: `phys.mech.work` (W = F·d·cos θ); `phys.mech.torque` (τ = r × F).
- *Far*: `phys.em.magnetic-force` (F = qv × B); `phys.mech.angular-momentum`
  (L = r × p); wave power flux (Poynting vector S = E × H).
- *Cross-subject*: maths linear algebra (inner product, exterior product); computer
  graphics (surface normals via cross product); machine learning (dot product as
  the fundamental operation in neural networks).
- *Real-world*: torque in a wrench or engine; power delivered at an angle; magnetic
  force deflecting charged particles in a cyclotron.
- *Expert transfer*: generalised inner products in Hilbert spaces (quantum
  mechanics — the overlap integral ⟨ψ|φ⟩ is a dot product in function space).

## Cross-Subject Connections

- **Mathematics**: dot product defines the Euclidean inner product; cross product is the
  exterior product in 3D — it generalises to wedge products in differential geometry.
  Determinant of a 3×3 matrix equals the scalar triple product a·(b×c).
- **Electromagnetism**: F = qv × B (magnetic force) is a cross product. Torque τ = r × F
  is a cross product. Magnetic flux Φ = B·A is a dot product. These are among the most
  important vector products in physics.
- **Engineering (structural mechanics)**: torque τ = r × F appears in lever analysis,
  gear systems, and moment calculations. Work W = F·d (dot product) determines energy
  transferred.
- **Computer Graphics**: surface normals are computed via cross product of edge vectors —
  essential for lighting calculations. The dot product of the normal with the light
  direction gives diffuse shading (Lambertian reflectance).
- **Quantum Mechanics / Chemistry**: orbital angular momentum L = r × p is a cross
  product. Molecular interaction energies involve dot products of dipole vectors.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.meas.vector-products.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: multiple grade-band variants (MIDDLE / HIGH / ADULT) including core_explanation, worked_example, and misconception_repair kinds
- **Probe assets**: MCQ and misconception_probe variants, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database required

## Curriculum Feedback

The KG lists torque and work as unlocks — correct. The difficulty rating "proficient"
is appropriate (higher than other measurement concepts, as this requires applying
3D spatial reasoning and two new formulas). The `estimated_hours: 4` is correct for
initial mastery; the right-hand rule in particular requires multiple sessions of
practice before it is reliable. No missing prerequisite edges observed.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-07-29): Initial full-standard entry. Migrated from pre-standard format to EDUCATIONAL_BRAIN_STANDARD.md v1.0 21-section structure. All sections verified against Quality Gates 1–8.

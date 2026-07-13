# Vector Addition and Resolution — `phys.meas.vector-addition`

## Identity

- **Concept ID**: `phys.meas.vector-addition`
- **Curriculum location**: physics / measurement & units
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.scalars-vectors` — the load-bearing part is understanding that
    vectors have DIRECTION and that direction cannot be ignored when combining
    vectors. A learner who hasn't internalised this will simply add magnitudes
    in all cases. They also need to know what it MEANS for two vectors to "add"
    (they combine their physical effects — two forces both acting on an object,
    two displacement steps taken in sequence).
- **Unlocks** (from KG): `phys.meas.vector-products`, `phys.mech.kinematics-2d` —
  and functionally every multi-dimensional physics problem in the curriculum.
  A learner who cannot resolve vectors into components and add them cannot solve
  projectile motion, circular motion, force balance in 2D, wave superposition,
  or field problems. This is the first major procedural tool in physics.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.80 ·
  **Est. hours**: 3 · **References**: NCERT Physics Class 11 Ch. 4
- **Learning objectives** — the learner can:
  1. Find the resultant of two vectors at any angle using the triangle law or
     parallelogram law, with correct magnitude (by Pythagoras or the cosine rule)
     and direction (by trigonometry).
  2. Resolve any vector into perpendicular (x and y) components using sine and
     cosine.
  3. Add multiple vectors by resolving all into components, summing components
     separately, and reconstructing the resultant.
  4. Verify a vector addition result by checking both the magnitude and the
     direction of the resultant.

## Mental models

- **Beginner (arriving)**: vectors add like numbers — 3 N + 4 N = 7 N, regardless
  of direction. Even learners who know vectors "have direction" will add magnitudes
  when not prompted to think about direction. The direction attribute is
  acknowledged but not operationally used.
- **Intermediate**: vectors add geometrically — place them head-to-tail; the
  resultant is the closing vector from the tail of the first to the head of the
  last. For perpendicular vectors, Pythagoras gives the magnitude and arctan gives
  the angle. For non-perpendicular, the cosine rule applies. Alternatively,
  components can always be used: split every vector into x and y parts, add the
  x-parts together, add the y-parts together, then reconstruct.
- **Advanced**: vector addition is a linear operation on a vector space: it obeys
  commutativity and associativity. The component method is not an alternative to
  geometry — it IS geometry, in coordinate form. Resolving into components is the
  change from geometric vectors to their algebraic representation. The resultant
  angle is measured from a chosen reference direction (typically the +x axis) and
  is a full angle, not just the acute angle returned by arctan.
- **Expert**: vector addition generalises to n dimensions; the component method
  trivially extends. In rotating coordinate systems (non-inertial frames), the
  components themselves change with time, requiring the concept of rotating vectors
  and the distinction between time-derivative of a vector in fixed vs. rotating
  frames. The resultant's direction ambiguity (arctan has two solutions per 2π
  range) is resolved by checking the sign of each component.
- **Versioning note**: install the intermediate model here. Signal the advanced
  model: "the component method we're learning now is the same method used in
  3D — just add a z-component. That's all it takes to extend to three dimensions."

## Why beginners fail here

The dominant failure is using the Pythagorean theorem when the vectors are NOT
perpendicular — applying √(a² + b²) without checking if 90° is given. This
comes from over-practicing the right-angle case without enough non-perpendicular
cases. The component method failure is separate: learners who resolve correctly
often then add the components wrong (adding x-component of A to y-component of B)
or forget to reconstruct the resultant from its components. The third failure:
direction is treated as approximate or optional — the learner computes the
magnitude but gives no direction for the resultant, or gives only the angle
without specifying the reference direction.

## Misconception library

**M1 — Vector magnitudes always add arithmetically (3 + 4 = 7, always)**
- *Why*: arithmetic addition is the default for "combining numbers"; the geometric
  rule is not obvious from the definition of vector (type 2, prior learning
  interference from arithmetic).
- *Symptom / phrases*: "the resultant of 3 N and 4 N is 7 N"; "3 km east + 4 km
  north = 7 km in some direction."
- *Detection probe (verbatim)*: "A person walks 3 km east and then 4 km north.
  How far are they from the start?" Wrong: 7 km. Correct: 5 km (by Pythagoras, at
  an angle). The learner's surprise at 5 km (not 7 km) is the productive collision.
- *Recovery*: draw the walk on a grid. Place start; go 3 right; go 4 up. Measure
  the straight-line distance from start to end (use a ruler or Pythagoras). It is
  5, not 7. "7 km is the total distance walked; 5 km is the resultant displacement.
  These are always different unless the two displacements point the same way."
- *Verification*: three problems with angles of 0°, 90°, 180° between the vectors —
  the 0° case (same direction, magnitudes add), 90° case (Pythagoras), 180° case
  (magnitudes subtract). Learner must use different methods for each.

**M2 — The component method uses sin for the x-component and cos for the y-component
(swapped from the correct assignment)**
- *Why*: confusion about which angle is referenced (the angle from the +x axis
  means: x = A·cos θ, y = A·sin θ; but learners sometimes use the complementary
  angle or place θ near the y-axis) (type 5, instructional angle-reference omission).
- *Symptom*: consistently uses sin for x and cos for y; gets wrong answers on
  component calculations when angle is not 45°.
- *Detection probe*: "A 10 N force acts at 30° above the horizontal (positive
  x-axis). Find the x and y components." Correct: x = 10 cos 30° = 8.66 N,
  y = 10 sin 30° = 5 N. Wrong (swapped): x = 5, y = 8.66.
- *Recovery*: anchor to the angle definition. The angle θ is ALWAYS measured from
  the +x axis. The adjacent side (next to θ) is x; adjacent/hypotenuse = cos θ,
  so x = A cos θ. The opposite side (across from θ) is y; opposite/hypotenuse =
  sin θ, so y = A sin θ. Draw the right triangle every time, label the angle at
  the origin, and identify adjacent (x) and opposite (y).
- *Verification*: component calculations with angles of 30°, 45°, 60°, and 120°
  (the 120° case requires recognising cos 120° < 0 — the x-component is negative).

**M3 — After resolving into components, add x-components of A with y-components of B**
- *Why*: the rule "add components" is remembered but not the constraint "add
  LIKE components" — x with x, y with y (type 5, imprecise instruction).
- *Symptom*: writes Rx = Ax + By instead of Rx = Ax + Bx.
- *Detection probe*: ask learner to write out the component addition step explicitly
  before calculating.
- *Recovery*: the dimensional argument — Ax is a force pointing east; By is a
  force pointing north. You cannot add an eastward force to a northward force —
  they are in different directions. Like the apples-and-oranges analogy from
  dimensions: x-components combine only with x-components.
- *Verification*: a three-vector addition where the learner must write out all
  six component terms (Ax, Ay, Bx, By, Cx, Cy) before adding.

**M4 — The resultant angle is whatever arctan gives (ignoring quadrant)**
- *Why*: calculators always return arctan in [−90°, 90°]; learners accept this
  without checking whether the resultant should be in the second or third quadrant
  (type 2, tool-output acceptance without verification).
- *Symptom*: resultant in the second quadrant (Rx < 0, Ry > 0) is reported as
  a first-quadrant angle.
- *Detection probe*: give a problem where Rx = −3, Ry = 4. Correct angle: 180° −
  arctan(4/3) = 180° − 53° = 127° from positive x-axis. Wrong: 53° (calculator
  arctan without sign check).
- *Recovery*: the quadrant check. After computing arctan(Ry/Rx), check the sign of
  BOTH components. If Rx < 0, the angle is in Q2 or Q3; add or subtract from 180°.
  Draw the resultant on a coordinate grid every time until the check is automatic.
- *Verification*: four problems — one per quadrant — where the correct angle
  requires quadrant checking.

## Explanation library

- **Age 13–15 (story)**: "You need to walk to the park: 3 km east and then 4 km
  north. How far is the park FROM WHERE YOU STARTED, ignoring the path? This is
  the key question — not how far you walked, but how far the park is. You cannot
  answer '3 + 4 = 7 km' because you changed direction halfway. You draw it on
  paper, use Pythagoras, and get 5 km — that's the straight-line result. All vector
  addition is this: the geometric straight-line result of combining two directed
  quantities."
- **Age 15+**: "Vectors combine by the triangle law: place the tail of the second
  at the head of the first; the resultant runs from the original tail to the final
  head. For perpendicular vectors, Pythagoras gives the resultant magnitude.
  For arbitrary angles, the cosine rule gives it. For three or more vectors,
  the component method is more practical: resolve each vector into x and y parts,
  sum the x-parts and the y-parts separately, then reconstruct the resultant using
  Pythagoras and arctan. The component method works for any number of vectors at
  any angles."
- **Adult returning learner**: "In two or three dimensions, you can't just add the
  numbers — you have to respect the directions. The cleanest way: break every vector
  into horizontal and vertical parts (components), add all the horizontal parts,
  add all the vertical parts, then combine those two sums back into a single
  resultant. This is the method you'll use for every 2D problem in physics for
  the rest of the course."

## Analogy library

- **Best analogy**: rowing across a river with a current. You row north with a
  certain speed; the river pushes you east. Your actual path is the diagonal
  resultant — not your rowing speed alone, not the current alone. Your arrival
  point is determined by the vector sum. This is exactly the physics of relative
  velocity, but the arithmetic is the same as any vector addition.
  *Breaking point*: the river analogy is good for two perpendicular vectors; for
  general angles, a different scenario is needed (forces on a block, multiple ropes).
- **Alternative**: two ropes pulling an object from different angles. Each rope
  exerts a force along its length. The object doesn't move in either rope's
  direction alone — it moves in the resultant direction. This directly maps to
  the parallelogram law (both forces drawn from the same point; the diagonal is
  the resultant).
  *Breaking point*: this parallelogram picture implies both forces act simultaneously
  at the same point (true for forces, but not the right picture for displacement
  steps taken in sequence — which use the triangle law).
- **Anti-analogy to avoid**: "add the lengths and the directions separately"
  (e.g. 3 N at 30° + 4 N at 60° = 7 N at 90°). This installs M1 for magnitude
  AND invents a wrong direction rule. Never suggest that direction adds like an
  angle.

## Demonstration library

- **Home, no equipment**: open a book on a flat table. Push it 10 cm east, then
  10 cm north. Measure straight-line distance from start: ~14.1 cm (10√2 by
  Pythagoras). Prediction first: "is it 20 cm? More? Less?" This surprise is the
  productive collision with M1 for the 90° case.
- **Teacher demo**: hang a weight from two spring scales at different angles.
  Show: the two scale readings do NOT add to give the weight. Resolve the forces
  from the spring scales into vertical components; the vertical components sum to
  the weight. This demonstrates both the failure of arithmetic addition AND the
  success of the component method.
- **Digital**: PhET "Vector Addition" simulation — add vectors at arbitrary angles,
  observe resultant, rotate vectors to verify the parallelogram construction.
  Prediction before manipulation: "if I point both vectors at 45° to each other,
  is the resultant longer or shorter than the sum of magnitudes?"
- **Learner activity (component method)**: each learner draws a vector at a random
  angle (from a set of printed protractors and scales), resolves it into components,
  and adds their components to a running class total. The class resultant is
  computed collectively. This builds the component method as a collaborative
  operation before independent application.

## Discovery lesson

**Guided discovery** is appropriate here — the learner can discover that arithmetic
addition fails for vectors by constructing a counterexample, and can then be guided
to find the geometric rule.

**Discovery sequence**:
1. *Need*: "3 N + 4 N = ?" — ask before any instruction. Learners say 7 N. Present:
   two forces at 90° to each other, both acting on an object. Measure the resultant
   with a force table (or equivalent). It is 5 N. "Why is the resultant 5, not 7?"
   This collision is the entry point.
2. *Playground*: the 3–4–5 triangle drawn on graph paper. The walk scenario.
   Discover: the resultant is the hypotenuse. Pythagoras gives it.
3. *Invention*: the learner states the rule for perpendicular vectors. Tutor
   introduces the general case: "what if they're not at 90°?" Leads into the
   cosine rule or parallelogram law.
4. *Collision*: the component method — the learner is shown that ANY vector can be
   expressed as the sum of two perpendicular components. Resolution into components
   is introduced as a tool.
5. *Formalization*: two methods stated formally — geometric (triangle law) and
   algebraic (component method). Both give the same answer; component method
   scales to many vectors.
6. *Compression*: worked example of three-vector addition by components.

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Guided discovery** (high fit for the need and geometric rule): see above.
2. **Worked examples** (high fit for component method): three to five fully traced
   examples increasing in complexity (2 perpendicular → 2 at angle → 3 vectors).
3. **Physical manipulation** (high fit): force tables, walks on grid paper, PhET —
   the abstract becomes concrete.
4. **Error exposure** (high fit): M1 (arithmetic sum) should be explicitly collided
   with on the first day; M4 (arctan quadrant error) after component method is taught.

Actions that DON'T fit:
- **Flashcard retrieval**: the skill here is procedural (apply a method), not
  factual recall. Practice problems, not flashcards.

## Voice teaching

*How it sounds when taught well*: the tutor draws EVERY vector — never just
writes magnitudes; the direction arrow is on every drawn vector; the tutor asks
"what is the direction of the resultant?" after every magnitude calculation.

*Load-bearing sentence to slow down on*: "The component method works for any number
of vectors at any angles — resolve each into x and y, sum x's, sum y's, reconstruct.
That's it. Every 2D vector problem reduces to this one method." Say slowly. Repeat.

*What to listen for*: learner reports magnitude only → direction is missing, ask
immediately; learner uses sin for x-component → M2 active; learner says arctan gives
the angle directly → M4 risk; learner adds arithmetic magnitudes → M1.

## Assessment

**Diagnostic — golden probe**: "Force A = 5 N at 0° (east) and force B = 5 N at
90° (north) act on an object. What is the resultant force: magnitude and direction?"
Correct: magnitude = 5√2 ≈ 7.07 N, direction = 45° north of east (NE). This
tests the Pythagorean case and requires a stated direction — magnitude only is wrong.

**Distractor-mapped items**:
- "Force A = 6 N east, force B = 8 N north. Resultant magnitude?" — options: 14 N,
  10 N, 7 N, 2 N. Answer: 10 N. Distractor 14 N targets M1.
- "A 10 N force acts at 60° above +x axis. The x-component is:" — options:
  10 sin 60° = 8.66, 10 cos 60° = 5, 10 tan 60° = 17.3, 5. Answer: 5 (10 cos 60°).
  Distractor 8.66 targets M2.

**Guided practice → independent practice fading ladder**:
1. Resultant of two perpendicular vectors (magnitude and direction, scaffolded
   with diagram).
2. Resultant of two vectors at a given non-90° angle (cosine rule, scaffolded).
3. Resolve one vector into components (scaffold: angle reference stated).
4. Add two vectors by components (one of them not axis-aligned).
5. Add three vectors by components (no scaffold).
6. (Delayed, 1 week): two novel vectors — add by component method, state resultant
   as (magnitude, direction from +x axis).

**Mastery gate set** (per assessment/05):
- *Production*: add three given vectors by component method; state resultant
   magnitude and direction.
- *New surface*: given the resultant and one vector, find the other (vector
  subtraction as the inverse operation).
- *Mixed*: 6 problems — 2 geometric (perpendicular), 2 component-method, 2 with
  signs (resultant in second or third quadrant).
- *Delayed*: one-week component-method problem, novel angles.

**Calibration note**: learners often feel confident after two worked examples
(familiar numbers, 3-4-5 triangle). True mastery requires: angles other than 30°/45°/60°,
more than two vectors, vectors in Q2/Q3 (negative components). The mastery
gate includes all three. Calibration check: "how confident are you that this
method would work for 5 vectors at arbitrary angles?" — learner should be able
to say yes and explain why.

## Recovery notes

*Likeliest utterance*: "I just add the numbers and get [wrong magnitude]" (M1);
"I got the x-components switched up" (M2); "I get an angle but I'm not sure which
direction it is" (M4).

*Concept-specific smaller question for M1*: "Draw 3 km east and 4 km north on
this grid, and connect start to finish with a straight line. Is the straight line
7 km?" (Measure it — it's not.) Build geometric intuition before formula.

*M4 recovery*: "After computing arctan, draw the resultant on a coordinate grid.
Can you see which quadrant it's in from the signs of Rx and Ry? Does your arctan
angle match that quadrant?" Walk through the check step-by-step until it becomes
a habit.

## Memory & review

- **Concept type**: procedure (component method) — high-frequency, cross-domain.
- **Review form** (per Delivery 2 §8): spaced procedural practice — one
  vector-addition problem interspersed with every subsequent domain's problem sets
  (kinematics-2D, projectile, force, field). The skill must not go dormant.
- **Automaticity target**: resolving a vector into components should be a reflexive
  first step in any 2D problem, not something the learner stops to decide whether
  to do. This automaticity is typically achieved after 20–30 problem encounters
  across the curriculum.
- **Interleaving partners**: `phys.mech.kinematics-2d` (first major application);
  `phys.mech.force` (force components in 2D problems); `phys.wave.transverse-waves`
  (wave direction and component resolution); `phys.em.electric-field` (field
  superposition using component method).

## Transfer map

- *Near*: `phys.meas.vector-products` — dot and cross products build on component
  notation.
- *Near*: `phys.mech.kinematics-2d` — every 2D kinematics problem uses component
  decomposition.
- *Far*: `phys.mech.force` (net force in 2D), `phys.wave.wave-properties`
  (superposition), `phys.em.electric-field` (field addition).
- *Cross-subject*: maths (linear algebra — vector addition in ℝ²); engineering
  (structural truss analysis — every member force resolved into components).
- *Real-world*: aviation (crosswind component for takeoff); sailing (tacking
  into the wind); GPS navigation (combining north-south and east-west
  displacements); structural engineering (force components on beams).
- *Expert transfer*: vector spaces in abstract algebra — the same algebraic rules
  (associativity, commutativity, distributivity) hold for function spaces,
  polynomial spaces, quantum state spaces. The learner who deeply understands
  R² vector addition is prepared for this generalisation.

## Curriculum feedback

The KG `unlocks` correctly identifies `phys.meas.vector-products` and
`phys.mech.kinematics-2d` as immediate unlocks. Missing from the unlock list:
`phys.mech.force` (force resolution in 2D requires vector addition). The
`mastery_threshold: 0.80` is the highest in the measurement domain — appropriate,
as this is both procedural and required for every subsequent 2D problem. The
`estimated_hours: 3` is correct for initial mastery; automaticity requires
significantly more distributed practice across subsequent domains.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

# Scalar and Vector Quantities — `phys.meas.scalars-vectors`

## Identity

- **Concept ID**: `phys.meas.scalars-vectors`
- **Curriculum location**: physics / measurement & units
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.units` — the load-bearing part is unit symbols and what physical
    quantities ARE (things you can measure). A learner who does not know that
    velocity has a unit and temperature has a unit cannot meaningfully distinguish
    which of these also have direction.
- **Unlocks** (from KG): `phys.meas.vector-addition`, `phys.mech.force` — and
  indirectly the entire classical mechanics domain. A learner who cannot reliably
  assign direction to vector quantities will silently drop minus signs, treating
  "−5 m/s" (leftward motion) as equivalent to "+5 m/s" (rightward). Every
  Newton's law calculation, every momentum problem, every wave direction argument
  depends on this distinction being automatic.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery threshold**: 0.70 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Ch. 4
- **Learning objectives** — the learner can:
  1. Define scalar and vector, using the direction criterion — not just a
     memorised list of examples.
  2. Classify a novel physical quantity (one not previously seen in instruction)
     as scalar or vector by reasoning, not recall.
  3. Explain why two identical scalar values (e.g. 40 km/h north and 40 km/h
     south) are NOT the same vector quantity.
  4. State that direction must be specified to fully describe a vector, and give
     a direction reference system (compass, angle, sign convention) for at least
     one example.

## Mental models

- **Beginner (arriving)**: scalars and vectors are two lists — you memorise which
  words go in which list. "Speed is scalar, velocity is vector" is a fact to be
  stored, not a distinction to be understood. Numbers with units are scalars; some
  special ones are vectors, and you put an arrow on them.
- **Intermediate**: scalars have magnitude only; vectors have magnitude AND direction.
  The learner can apply this criterion to familiar quantities. The arrow is not just
  notation — it represents actual directional information that changes how the
  quantity behaves (adding opposite vectors cancels, adding opposite scalars does
  not simply cancel).
- **Advanced**: direction is not cosmetic — it changes the mathematical behaviour of
  the quantity. Addition of vectors requires the angle between them; subtraction is
  adding the negative (reversed) vector. Scalars add as numbers; vectors add as
  geometric objects. The learner recognises that the sign of a scalar result can
  sometimes carry directional information (displacement along a line) without the
  vector framework, and knows why that works for 1D only.
- **Expert**: vectors as geometric objects that transform in a specific way under
  coordinate rotation (contrast with tensors, pseudovectors). The scalar/vector
  distinction is the first level of a hierarchy (scalar = rank-0 tensor, vector =
  rank-1 tensor). Dot product (scalar from two vectors) and cross product (vector
  from two vectors) are natural — they reduce to a scalar or produce a new vector
  depending on how the directional information is consumed. Useful shelf-life
  boundary: 1D problems can always use signed scalars; 2D+ requires genuine vectors.
- **Versioning note**: install the intermediate model here (magnitude + direction
  criterion). Signal the existence of the advanced model explicitly: "in your next
  unit you'll see what happens when you add two vectors pointing in different
  directions — the rule you'll learn is different from adding two numbers. This is
  why the distinction matters." Do not install the advanced model here — it requires
  vector addition (`phys.meas.vector-addition`) to make it concrete.

## Why beginners fail here

The failure is treating this as classification-by-list rather than
reasoning-by-criterion. When a learner memorises "velocity is vector, speed is
scalar" as a paired fact, they cannot classify power, impulse, or flux when those
appear later — the generating rule ("does it have direction?") was never learned.
A second failure: the learner accepts that velocity is a vector but then ignores
the direction in calculations — they find |v₁| + |v₂| instead of using the sign
convention. The concept is "learned" at the vocabulary level but not operative at
the reasoning level. The teaching problem is getting the learner to USE the
direction attribute, not just acknowledge it.

## Misconception library

**M1 — Scalar/vector is a fixed list to memorise, not a criterion to apply**
- *Why*: instruction typically introduces the concept via lists before giving the
  rule; list comes first and sticks (type 5, instructional ordering).
- *Symptom / phrases*: "is angular momentum scalar or vector? I don't remember if
  that was on the list." Cannot classify novel quantities.
- *Detection probe (verbatim)*: "Is gravitational potential energy scalar or vector?
  You haven't seen this specifically — reason it out." If the learner cannot
  respond without recalling a list (freezes, or asks "is that on the syllabus?"),
  M1 is active.
- *Recovery*: return to the criterion — "does it have direction?" Ask about
  gravitational potential energy: "can you say it points somewhere? Can you give
  it a compass direction?" (No.) → scalar. Do this with five or six novel
  quantities until the criterion operates automatically.
- *Verification*: a list of twelve novel quantities (not on the standard syllabus
  list) — learner must classify each and explain the criterion used.

**M2 — Velocity and speed are interchangeable names for the same thing**
- *Why*: everyday language ("what's your velocity?" → "60 km/h") does not
  distinguish them; only physics instruction creates the distinction (type 4,
  overgeneralisation of daily usage).
- *Symptom / phrases*: "its velocity is 60 km/h" (no direction stated); uses speed
  and velocity interchangeably in problems.
- *Detection probe*: "A car has a velocity of 60 km/h. Is that a complete
  description?" Correct: no — direction is missing. Common wrong: "yes, you know
  how fast it is."
- *Recovery*: the car-turning scenario — a car on a circular track at constant
  60 km/h: "does its speed change?" (No.) "Does its velocity change?" (Yes —
  direction changes.) "If speed and velocity were the same, how could one change
  while the other doesn't?" This produces the contradiction the learner must
  resolve.
- *Verification*: problems where the car changes direction without changing speed —
  is the velocity changing?; displacement vs distance items.

**M3 — Vectors point "forward" in the direction of motion (direction is absolute, not
signed)**
- *Why*: the arrow on a vector in diagrams is always drawn on the tip, suggesting
  "forward" orientation; signed negative values are counterintuitive for physical
  speed (type 2, perceptual).
- *Symptom / phrases*: treats −5 m/s as "5 m/s going backward" (correct intuition
  in 1D) but resists the negative sign in vector equations, always taking absolute
  values; in 2D draws vectors only in the first quadrant.
- *Detection probe*: "A ball moves 3 m east, then 5 m west. What is its
  displacement?" If they answer 2 m without sign or direction (or "8 m because
  you add distances"), probe direction: "2 m in which direction?" If they cannot
  answer or omit direction, M3 is active.
- *Recovery*: the number line — place zero at centre; east = positive, west =
  negative. 3 + (−5) = −2, which means 2 m west. The negative IS the direction
  in 1D. Then show why 2D requires the full arrow (a separate angle, not just a
  sign).
- *Verification*: signed displacement problems; then 2D displacement problems
  where the direction is an angle.

**M4 — Magnitude is the "real" value; direction is an annotation**
- *Why*: magnitude is what instruments usually display (speedometer shows speed,
  not velocity); direction requires a separate choice of reference frame (type 2).
- *Symptom*: correctly notes that a quantity is a vector, but then uses only its
  magnitude in calculations.
- *Detection probe*: "Two forces of 5 N act on an object — one east, one west.
  What is the net force?" Common wrong: "10 N." Correct: "0 N (they cancel)."
- *Recovery*: show two examples — two identical forces in the SAME direction
  (doubles the effect) vs. opposite directions (cancels). The number 5 N is the
  same; the direction makes all the difference. Magnitude without direction is
  insufficient for prediction.
- *Verification*: net-force items where forces oppose; emphasise that correct
  magnitude requires correct direction tracking throughout.

## Explanation library

- **Age 10–12 (story)**: "Imagine I say 'walk 5 km.' Can you do it? No — which way?
  Some things in physics are like 'walk 5 km' — you need a direction to make sense
  of them. Others are like 'the temperature is 25 degrees' — no direction needed,
  it's just a number with a unit. We call the first type VECTORS and the second
  type SCALARS. A vector without a direction is an incomplete sentence."
- **Age 14+**: "Scalars are fully described by magnitude and unit alone: 5 kg,
  300 K, 100 J. Vectors require magnitude, unit, AND direction: 30 m/s north,
  500 N downward, 3 m at 45°. The reason is physical: two 30 m/s velocities in
  opposite directions do NOT produce the same state of motion. Direction is
  load-bearing information, not decoration."
- **Returning adult**: "You already use this distinction. If someone says 'it's
  20 km away,' you ask 'which way?' That's because distance (scalar) isn't enough
  to get there — you need displacement (vector). In physics, half the quantities
  are like temperature (no meaningful direction) and half are like displacement
  (direction matters for every calculation)."
- **Visual frame**: a table: quantity / value / can you give it direction? / type.
  Build it with the learner, one row at a time, before the formal definition.

## Analogy library

- **Best analogy**: a phone number vs. a GPS pin. A phone number is just a number —
  no direction, no location (scalar). A GPS pin is coordinates AND a point on a
  map — direction to it matters (vector-like). The information type determines how
  you USE it.
  *Breaking point*: a GPS pin is technically two numbers (lat/lon), not a magnitude
  + direction pair. Don't extend the analogy past "some quantities need direction
  to be useful."
- **Alternative — temperature vs. wind**: temperature is "30 degrees" — no
  direction needed (scalar). Wind is "30 km/h from the northwest" — direction is
  essential (vector). A weather forecast without wind direction would be almost
  useless. This is concrete and immediately relatable.
  *Breaking point*: wind speed (30 km/h) is still a scalar; wind VELOCITY
  (30 km/h northwest) is the vector. Careful to use the full phrase "wind
  velocity" not "wind speed" — or the analogy accidentally installs M2.
- **Anti-analogy to avoid**: "scalars are small, vectors are big" — has been
  observed in learner free-writing, probably a confusion with the word "magnitude."
  Pre-empt by noting: a scalar can be enormous (1 billion km is still a scalar
  distance) and a vector can be tiny (0.001 m east is still a vector displacement).

## Demonstration library

- **Home, no equipment**: walk to any room. Ask: "what is the distance from the
  front door to where you're standing? What is the displacement?" Distance: the
  path length walked (scalar). Displacement: straight-line from door to current
  position, with direction (vector). For a non-straight path, these are different.
- **Teacher demo**: pull two students in opposite directions with identical forces
  (spring scales showing 5 N each). Ask: "does the student move?" (No — the forces
  cancel.) "But the total MAGNITUDE of force is 10 N — why doesn't the student
  accelerate?" Forces as vectors, not scalars — you cannot just add the numbers.
- **Digital**: PhET "Vector Addition" simulation — add two vectors, rotate one 180°,
  observe the resultant go to zero. Prediction first: "if I flip this vector, what
  will happen to the total?"
- **Learner activity**: three-step walk. Step 1: walk 3 m north. Step 2: walk 4 m
  east. Question before step 3: "how far from the start are you?" (Not 7 m — it's 5 m,
  by Pythagoras.) The surprise IS the lesson: vectors don't add like scalars.

## Discovery lesson

**Guided discovery is appropriate here** — the criterion "does it need direction?"
is something learners can genuinely derive from contrasting examples, rather than
being told as a definition.

**Discovery sequence**:
1. *Need*: Present two scenarios — "the temperature in this room is 25°C" and "I
   threw the ball at 20 m/s." Ask: "is there anything missing from either of
   these descriptions?" (Expect: no for temperature; yes for the ball.)
2. *Playground*: give eight physical quantities (temperature, force, displacement,
   mass, velocity, energy, weight, time). Learner marks each: "needs direction /
   doesn't need direction." No instruction yet.
3. *Invention*: learner presents their classification and the criterion they used.
   Introduce the names scalar/vector as the established terms for their criterion.
4. *Collision*: the collision case — present a situation where ignoring direction
   gives a wrong answer (two forces cancelling). "Here, treating forces as scalars
   gives the wrong prediction. Why?"
5. *Formalization*: state the definitions. Learner writes them in their own words.
6. *Compression*: one sentence each, spoken aloud.

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Guided discovery** (highest fit): see Discovery lesson — the criterion can be
   reached by learner reasoning.
2. **Concrete-then-abstract** (high fit): start with walk-and-distance demo before
   any formal definition.
3. **Contrast cases** (high fit): scalar example paired with vector example at each
   stage — temperature/velocity, distance/displacement, speed/force.
4. **Error exposure** (medium fit): two equal forces in opposite directions
   cancelling — why the scalar sum is wrong.

Actions that DON'T fit:
- **Retrieval practice** (low fit as primary): the goal is applying a criterion, not
  recalling a list; heavy retrieval practice on the list will deepen M1. Retrieval
  practice is appropriate only for the definitions, not for the classification task.

## Voice teaching

*How it sounds when taught well*: the word "direction" appears in every third
sentence; the teacher demonstrates the incompleteness of a vector without direction
by intentionally saying "the force is 10 newtons" and then pausing: "which way?"
— every time, until the learner starts asking it unprompted.

*Load-bearing sentence to slow down on*: "A vector is not fully described without
its direction — 10 N east and 10 N west are NOT the same vector, even though the
number is the same." Say this at normal speed, then repeat slowly.

*What to listen for*: learner says "velocity is 10 m/s" without direction → M2
or M4 active; learner says "I'll just check if it's on the list" when given a
novel quantity → M1 active; learner adds opposite vectors algebraically as if they
were scalars → M4 active (the direction attribute is not being used operationally).

## Assessment

**Diagnostic — golden probe**: "Is force scalar or vector? How do you know — use
the definition, not a list." This separates criterion-use from list-recall. Correct:
"vector, because force has a direction — pushing north is different from pushing south."

**Distractor-mapped items**:
- "What is the net force when two 5 N forces act in opposite directions?" — options:
  10 N, 5 N, 0 N, 25 N — targets M4 (magnitude-only thinking → picks 10 N).
- "Which of these is a vector quantity?" — options: temperature, mass, electric
  charge, displacement — targets M1 (only "displacement" is correct; all others
  are scalars that learners often misclassify).

**Guided practice → independent practice fading ladder**:
1. Given table of 8 quantities (familiar), classify each as scalar or vector and
   state why (criterion applied, not list recalled).
2. Given 8 unfamiliar quantities (electric potential, angular velocity, pressure,
   magnetic flux, momentum, temperature gradient, area, force), classify using
   the criterion.
3. Solve: a car travels 60 km north, then 60 km south. What is the total distance?
   Total displacement? (Distance: 120 km; displacement: 0.)
4. Net-force problem: 3 N east + 5 N west, find net force with direction.
5. (Delayed, 1 week): classify 6 novel quantities; explain direction criterion.

**Mastery gate set** (per assessment/05):
- *Production*: define scalar and vector in own words using the direction criterion;
  classify 8 novel quantities with justification.
- *New surface*: given the formula for work W = F·d·cos(θ), explain why work is a
  scalar even though force and displacement are vectors. (The dot product extracts
  a scalar — this is a preview, not required for full mastery here.)
- *Mixed*: 10 quantities — 5 scalar, 5 vector, interleaved with familiar and novel
  entries.
- *Delayed*: one-week retention; novel quantity classification (criterion not list).

**Calibration note**: learners typically feel very confident here after the first
lesson — the concept feels simple. Calibration check: can they classify 8 novel
quantities without hesitation? Can they explain why opposite vectors of equal
magnitude cancel? Confidence on familiar items does not predict transfer.

## Recovery notes

*Likeliest utterance here*: "I thought it was about which quantities point" (correct
but imprecise) or "isn't velocity just speed with a fancy name?" (M2 active).

*Concept-specific smaller question*: if the learner cannot state the criterion,
shrink to: "Can temperature point north?" (No.) "Can force point north?" (Yes.)
"What's the difference?" — let the criterion emerge from contrast.

*M2 recovery trigger*: "Give me the velocity of a car going 60 km/h — can you
describe it completely?" If they give only the speed: "I don't know which way the
car is going — is that a problem?" Build the gap between speed and velocity as an
information gap.

## Memory & review

- **Concept type**: concept (the scalar/vector distinction is a generative
  classification principle, not a fact-set).
- **Review form** (per Delivery 2 §8): classification practice on novel quantities
  (generative elaboration), not flashcard retrieval. Periodic presentation of "new
  quantity — scalar or vector?" items throughout the domain and into mechanics.
- **Automaticity target**: classifying physical quantities as scalar/vector should
  be automatic before `phys.mech.force` is taught. If the learner must stop to
  think about whether force is a vector in the middle of a Newton's-law problem,
  the classification is not yet automatic.
- **Interleaving partners**: `phys.meas.vector-addition` (the operational consequence
  of vectors); `phys.mech.displacement` (first applied distinction between
  distance/displacement); `phys.mech.velocity` (speed vs. velocity in context).

## Transfer map

- *Near*: `phys.meas.vector-addition` — vector addition MAKES NO SENSE without the
  direction attribute; this concept is the prerequisite understanding.
- *Near*: `phys.mech.force` — force is the first major vector quantity where the
  direction determines the physical outcome (balanced forces cancel).
- *Far*: every vector quantity in the curriculum — velocity, acceleration, momentum,
  electric field, magnetic field, angular momentum. The criterion is used hundreds
  of times.
- *Cross-subject*: maths vectors (geometry and linear algebra) — the same concept,
  different notation. Connection: a physics velocity vector and a maths position
  vector obey identical addition rules.
- *Real-world*: GPS navigation (displacement, not distance, to the destination);
  weather forecasting (wind velocity, not just wind speed); aviation (bearing and
  speed both required for navigation).
- *Expert transfer*: pseudovectors (angular velocity, magnetic field) — quantities
  that look like vectors but transform differently under reflection. Understanding
  this requires the learner to have first deeply internalised what a "true" vector
  IS.

## Curriculum feedback

The KG `requires` list correctly identifies `phys.meas.units` as the only
prerequisite — the learner needs units to name the magnitudes of scalar and vector
quantities. The `unlocks` list correctly prioritises `phys.meas.vector-addition` and
`phys.mech.force` as the immediate downstream concepts. No missing prerequisite
edges observed during authoring. The `difficulty: foundational` rating is accurate —
the concept itself is simple; the teaching challenge is getting the direction
attribute to become operational.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

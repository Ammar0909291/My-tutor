# Acceleration — `phys.mech.acceleration`

## Identity

- **Concept ID**: `phys.mech.acceleration`
- **Curriculum location**: physics / classical mechanics
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mech.velocity` — the load-bearing part is velocity as a SIGNED vector
    quantity (or signed scalar in 1D) and the idea that velocity can change —
    in magnitude (the object speeds up or slows down) or direction (the object
    turns). Acceleration is defined as change in velocity over time; without a
    firm model of velocity as changeable (and signed), acceleration is just
    "how fast you speed up," missing the deceleration and direction-change cases.
- **Unlocks** (from KG): `phys.mech.kinematics-1d` — and via that, the entire
  kinematic and dynamic chain. Acceleration is the bridge between kinematics
  (description of motion) and dynamics (causes of motion — Newton's laws). A
  learner who cannot work with signed acceleration cannot solve problems involving
  deceleration, upward/downward acceleration, or circular motion.
- **Difficulty**: developing · **Bloom**: understand · **Mastery threshold**: 0.75 ·
  **Est. hours**: 3 · **References**: NCERT Physics Class 9 Ch. 8
- **Learning objectives** — the learner can:
  1. Define acceleration as the rate of change of velocity (Δv/Δt), and correctly
     compute it including sign.
  2. Distinguish between speeding up, slowing down (deceleration), and direction
     change as three distinct manifestations of non-zero acceleration.
  3. Identify the sign of acceleration from a described scenario (positive means
     accelerating in the positive direction; negative means decelerating or
     accelerating in the negative direction).
  4. Explain why an object moving at constant speed can still be accelerating
     (if direction is changing — e.g. circular motion).

## Mental models

- **Beginner (arriving)**: acceleration = speeding up. Deceleration is the
  opposite of acceleration (a different phenomenon). An object moving at constant
  speed in a circle "has no acceleration" because its speed is constant.
  Acceleration is a positive quantity.
- **Intermediate**: acceleration = change in velocity / time. Velocity can change
  in magnitude (speeding up or slowing down) or in direction (turning). Both are
  accelerations. "Deceleration" is just a negative acceleration (or acceleration
  opposing motion) — not a separate quantity. Sign of acceleration: positive if
  velocity is increasing (in the chosen positive direction), negative if decreasing.
  A car braking has positive velocity and negative acceleration (in the direction
  of motion).
- **Advanced**: acceleration = dv/dt in 1D; a⃗ = dv⃗/dt in 3D. On a velocity-time
  graph, acceleration is the slope. Average acceleration = Δv⃗/Δt (the change in
  the velocity VECTOR, so direction changes count). A car turning at constant speed
  has a centripetal acceleration (directed toward the centre of the turn) even
  though |v| is constant. Zero acceleration ↔ constant velocity (Newton's first law).
- **Expert**: acceleration as a second-order tensor transformation in non-inertial
  frames (fictitious forces appear — Coriolis, centrifugal). Proper acceleration
  vs. coordinate acceleration in special relativity. Curvature of spacetime is
  interpreted as acceleration in general relativity (the equivalence principle).
- **Versioning note**: install the intermediate model here (signed acceleration,
  deceleration as negative acceleration, direction change as acceleration). Signal
  the advanced model: "you'll see the direction-change acceleration concretely
  when we study circular motion — a car turning at constant speed is accelerating
  toward the centre of the curve."

## Why beginners fail here

The deepest failure is the "acceleration = speeding up" model, which is both
extremely robust (built from years of everyday usage) and strategically
incorrect. This misconception causes the learner to:
1. Say "no acceleration" when a car moves at constant velocity in a circle
   (wrong — there's centripetal acceleration).
2. Say "no acceleration" when an object is falling at terminal velocity (wrong —
   at terminal velocity, acceleration IS zero, but the learner says it from the
   wrong model: "constant speed → no acceleration," which happens to give the
   right answer here but for the wrong reason, creating a fragile belief).
3. Refuse negative acceleration as meaningful (the learner either drops the sign
   or says "the deceleration is 5 m/s²" instead of "the acceleration is −5 m/s²").
The resolution requires explicitly installing the "velocity-change" definition
before the "speeding-up" shortcut is allowed.

## Misconception library

**M1 — Acceleration means speeding up (not slowing down, not direction change)**
- *Why*: "accelerate" in everyday English means to go faster (cars, economies);
  "decelerating" is explicitly named differently (type 2, language transfer,
  and a very strong one — reinforced daily).
- *Symptom / phrases*: "the car decelerated — that's the opposite of acceleration";
  "constant-speed circular motion has no acceleration"; treats "deceleration" as
  a separate phenomenon.
- *Detection probe (verbatim)*: "A car brakes from 20 m/s to 0 in 4 s. What is
  its acceleration?" Wrong answer: "I need to compute deceleration" or (5 m/s²
  with no sign). Correct: a = (0 − 20)/4 = −5 m/s² (negative — opposing motion).
- *Recovery*: the definition — acceleration = Δv/Δt — ALWAYS. Walk through the
  braking calculation step by step: Δv = v_f − v_i = 0 − 20 = −20 m/s; a =
  −20/4 = −5 m/s². "The SIGN tells you the direction. There is no separate quantity
  called deceleration — it is just negative acceleration."
- *Verification*: three problems — one speeding up (positive a), one braking
  (negative a in the direction of motion), one reversing (negative a, then positive
  a as object returns). Learner must give sign in all cases.

**M2 — Objects at constant speed cannot be accelerating**
- *Why*: "acceleration causes speed change" is the learner's operative rule;
  this is FALSE for direction changes (type 4, applying the speed-change-only
  model).
- *Symptom*: says "the roller coaster on the loop has no acceleration at the
  top" (wrong — centripetal acceleration exists); says "the satellite orbiting
  at constant speed has no acceleration" (wrong — gravitational acceleration
  toward Earth).
- *Detection probe*: "A ball swings in a horizontal circle at constant speed.
  Is it accelerating?" Wrong: "no — speed is constant." Correct: "yes — its
  direction is changing, so its velocity vector is changing, so there is an
  acceleration toward the centre."
- *Recovery*: the velocity-change definition. Draw the velocity arrow at two
  nearby moments on a circle — same length (same speed) but different direction.
  Δv⃗ = v⃗_2 − v⃗_1 ≠ 0⃗ even when |v⃗_1| = |v⃗_2|. "Acceleration = Δv⃗/Δt — and
  Δv⃗ is nonzero. So there is acceleration, even though speed is constant." This
  is a preview of centripetal acceleration; the full calculation comes later.
- *Verification*: three scenarios at "constant speed" — one truly constant
  velocity (zero acceleration, straight line), one circular (acceleration exists),
  one object at terminal velocity (genuinely zero acceleration — distinguish this
  from circular motion).

**M3 — Negative acceleration always means slowing down**
- *Why*: "negative acceleration" DOES mean slowing down in the context of positive
  velocity — and this is the only context the learner initially sees; overgeneralised
  to all cases (type 4).
- *Symptom*: says a car with v = −10 m/s and a = −2 m/s² is slowing down (wrong —
  it is speeding up in the negative direction).
- *Detection probe*: "A car moves at −10 m/s (leftward) with acceleration −2 m/s².
  Is it speeding up or slowing down?" Wrong: "slowing down (negative acceleration
  means deceleration)." Correct: speeding up (velocity and acceleration have the same
  sign — both negative — so the magnitude of velocity is increasing).
- *Recovery*: the rule — speeding up when velocity and acceleration have the SAME
  sign; slowing down when they have OPPOSITE signs. Not about the sign of acceleration
  alone.
  Draw four cases: (+v, +a) → speeding up; (+v, −a) → slowing down; (−v, +a) →
  slowing down; (−v, −a) → speeding up. The sign of acceleration tells direction
  of acceleration, not whether the object is speeding up.
- *Verification*: all four sign combinations, one problem each.

**M4 — Uniform acceleration means constant velocity**
- *Why*: "uniform" in everyday English means "same" → same velocity; physics
  redefines it as "same rate of change of velocity" (type 5, vocabulary collision).
- *Symptom*: equates "uniform acceleration" with "constant velocity"; confuses
  the two for kinematic calculations.
- *Detection probe*: "An object has uniform acceleration of 3 m/s². Is its
  velocity constant?" Wrong: "yes." Correct: "no — uniform acceleration means the
  RATE of velocity change is constant; the velocity itself is increasing at 3 m/s
  per second."
- *Recovery*: the distinction in one sentence: "uniform acceleration = constant
  acceleration (constant RATE of change); uniform velocity = constant velocity
  (zero acceleration). These are almost opposite ideas." Then: "under uniform
  acceleration, velocity changes by the SAME AMOUNT each second — it is not
  constant, it is changing uniformly."
- *Verification*: two problems — one with uniform velocity (a = 0), one with
  uniform acceleration (constant a ≠ 0). Learner must state both velocity and
  acceleration for each.

## Explanation library

- **Age 12–14 (narrative)**: "Acceleration is how quickly your velocity is
  changing — not just how quickly you're going faster. If your velocity goes from
  10 m/s east to 20 m/s east in 5 s, the acceleration is 2 m/s east every second —
  you're gaining 2 m/s of eastward velocity every second. If your velocity goes
  from 20 m/s east to 10 m/s east in 5 s, the acceleration is −2 m/s every second
  — you're losing 2 m/s of eastward velocity every second. 'Deceleration' is just
  this: negative acceleration in the direction of travel."
- **Age 15+**: "Acceleration = Δv/Δt — the rate of change of velocity. This has
  a direction (it's a vector). In 1D, positive means velocity is increasing in the
  positive direction; negative means velocity is decreasing or increasing in the
  negative direction. A car braking at 5 m/s² has a = −5 m/s² (negative because
  opposing the positive direction of travel). The sign of a relative to the sign
  of v tells you whether the car is speeding up (same sign) or slowing down
  (opposite signs)."
- **Adult returning learner**: "You knew acceleration as 'how fast you're speeding
  up.' Physics defines it as 'how fast your velocity is changing' — which includes
  direction changes, not just speed changes. The sign matters. A car at v = −15 m/s
  with a = −3 m/s² is going faster (both negative → magnitudes growing); a car at
  v = +15 m/s with a = −3 m/s² is slowing down (opposite signs → magnitude shrinking).
  You need the full sign picture for every kinematics and dynamics problem."

## Analogy library

- **Best analogy**: the elevator. Going up (positive v): the elevator starting
  to move has upward acceleration (positive a, same sign as v → speeding up).
  The elevator slowing to stop has downward acceleration (negative a, opposite
  to v → slowing down). Same elevator, two phases, two signs of acceleration.
  *Breaking point*: in an elevator, you FEEL the acceleration as a sensation of
  heaviness or lightness — this is a gravitational force analogy that goes beyond
  pure kinematics. Keep the analogy to the motion description, not the force feeling.
- **Alternative**: a number line with a moving point. The point's POSITION changes
  over time (velocity). The rate at which the velocity itself changes is acceleration.
  Positive acceleration moves the velocity marker to the right (toward larger values);
  negative acceleration moves it left (toward smaller values, including through zero
  and into negative velocity territory).
  *Breaking point*: the number-line analogy works well for 1D; it doesn't extend
  to 2D or 3D direction-change acceleration.
- **Anti-analogy to avoid**: "acceleration and deceleration are opposites." This
  treats them as two separate phenomena and prevents the sign convention from taking
  root. Always: "deceleration = negative acceleration in the direction of motion."

## Demonstration library

- **Home, no equipment**: hold a ball and let it fall (positive acceleration
  downward = 9.8 m/s²). Throw it gently upward (negative acceleration relative
  to the upward motion — it slows, stops, then falls). Ask before throwing: "when
  the ball is moving UP and slowing down, what is the direction of its acceleration?"
  Learners often say "upward, then changes to downward" (M1). Correct: always
  downward (gravity), regardless of whether the ball is moving up or down.
- **Teacher demo**: a cart on an inclined track. Push it up the slope; it decelerates
  (a negative, v positive → slowing). It reaches the top, momentarily stops (v = 0,
  a still non-zero). Then rolls back down (v negative, a negative → speeding up).
  All phases, all sign combinations, in one continuous motion.
- **Interactive**: motion sensor showing velocity-time graph in real time. Have a
  learner walk away slowly, then walk away fast, then walk back. The slope of the
  velocity-time graph IS the acceleration — observe positive slope (speeding up),
  negative slope (slowing down or reversing), zero slope (constant velocity).
- **Prediction before**: before running the velocity-time demo, draw the scenario
  on the board and ask the learner to PREDICT the shape of the v-t graph. The
  prediction is the diagnostic.

## Discovery lesson

**Guided discovery** is appropriate for the core concept (velocity can change in
both magnitude and direction; the rate of that change is acceleration). The sign
convention requires direct instruction after the concept is built.

**Discovery sequence**:
1. *Need*: "You're in a car. The car is going 20 m/s. It brakes to a stop in 4 s.
   We defined velocity = displacement/time. What do we call the rate of change of
   velocity?" → discover the need for the word "acceleration."
2. *Playground*: compute Δv/Δt for three scenarios: speeding up, slowing down,
   changing direction. What do all three have in common? (Δv ≠ 0.)
3. *Invention*: define acceleration. Discover: braking gives negative Δv → negative
   acceleration. "Deceleration" is this — not a separate thing.
4. *Collision*: constant-speed turning. Velocity arrow changes direction at constant
   length → Δv⃗ ≠ 0 → acceleration exists. "This confuses most people — it confused
   physicists until Newton."
5. *Formalization*: the definition, the sign convention, the speeding-up/slowing-down
   rule from sign comparison.
6. *Compression*: "acceleration = Δv/Δt, always; same-sign = speeding up;
   opposite-sign = slowing down."

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Guided discovery** (high fit): see above.
2. **Sign-convention drill** (high fit): the four sign-combination cases must be
   drilled until automatic.
3. **Graph interpretation** (high fit): velocity-time graph; slope = acceleration.
   Install alongside the algebraic definition.
4. **Error exposure**: the "deceleration is separate" misconception (M1) must be
   explicitly confronted; the "constant speed = no acceleration" misconception (M2)
   must be confronted with the turning example.

## Voice teaching

*How it sounds when taught well*: the tutor always says "acceleration is the rate
of change of VELOCITY" (never "rate of change of speed"); every answer is given
with sign ("negative 5 metres per second squared"); the sign is compared to the
velocity sign before drawing a conclusion about speeding up/slowing down.

*Load-bearing sentence to slow down on*: "The direction of acceleration and the
direction of velocity are independent quantities. The RELATIONSHIP between them
— same sign or opposite sign — tells you whether the object speeds up or slows down."

*What to listen for*: "that's deceleration not acceleration" → M1; "constant speed,
so no acceleration" → M2 (especially in circular motion previews); "negative
acceleration means slowing down" in a context with negative velocity → M3;
"uniform acceleration means constant velocity" → M4.

## Assessment

**Diagnostic — golden probe**: "A car moves at +15 m/s. It brakes to rest in 3 s.
(a) What is the acceleration? (b) Is it speeding up or slowing down?" Correct:
(a) a = (0 − 15)/3 = −5 m/s²; (b) slowing down (v positive, a negative → opposite
signs). This tests sign calculation (M1) and the speeding-up/slowing-down rule.

**Distractor-mapped items**:
- "An object moves at −10 m/s. Its acceleration is −3 m/s². It is:
  (A) slowing down, (B) speeding up, (C) turning, (D) at rest." Answer: B.
  Distractor A targets M3.
- "A satellite orbits Earth at constant speed. Its acceleration is:
  (A) zero, (B) directed toward Earth, (C) directed away from Earth, (D) equal
  to g = 9.8 m/s²." Answer: B (centripetal). Distractor A targets M2.

**Guided practice → independent practice fading ladder**:
1. Compute acceleration for 4 scenarios (2 speeding up, 2 braking) — state sign.
2. Determine speeding up vs. slowing down from sign pairs — 4 problems.
3. Describe the acceleration for 3 constant-speed scenarios (one straight → a=0,
   one turning → a≠0, one terminal velocity → a=0).
4. Interpret velocity-time graph: identify positive acceleration, negative, zero
   regions by slope.
5. (Delayed, 1 week): a ball thrown upward — sign of acceleration at three moments
   (moving up, at peak, moving down).

**Mastery gate set** (per assessment/05):
- *Production*: compute acceleration with sign for 4 scenarios; state speeding-up/
  slowing-down from sign comparison.
- *New surface*: a ball thrown upward: at the peak (v = 0), is acceleration zero?
  (No — gravitational acceleration is still −9.8 m/s².) This is the classic M1
  test.
- *Mixed*: 8 acceleration problems interleaved — positive/negative a, same/opposite
  sign as v, straight-line/turning.
- *Delayed*: one-week — ball-thrown-upward scenario + one circular-motion-at-constant-
  speed scenario (acceleration present or not?).

**Calibration note**: M1 is often apparently "fixed" after one lesson and reappears
under time pressure. The delayed test for "ball at the peak — is acceleration zero?"
is the most sensitive detection probe for M1 persistence. Include it.

## Recovery notes

*Likeliest utterance*: "at the top of the throw, the velocity is zero so the
acceleration is zero" (M1 in disguise — velocity-as-indicator-of-acceleration
error); "deceleration is when you slow down; this isn't acceleration" (M1 direct).

*Concept-specific smaller question for M1*: "What is the FORCE acting on the ball
when it's at the top of its throw?" (Gravity, downward.) "Does a force cause
acceleration?" (Yes, Newton's second law.) "So is there acceleration?" Build from
force rather than from motion description, to bypass the vocabulary habit.

*M3 recovery*: draw the four-quadrant diagram (+ velocity / − velocity on the
y-axis, + acceleration / − acceleration on the x-axis). "Speeding up is top-right
OR bottom-left — same sign. Slowing down is top-left OR bottom-right — opposite
signs." Have the learner classify their problem on this diagram.

## Memory & review

- **Concept type**: concept (rate-of-change-of-velocity) + procedure (computing
  and classifying acceleration by sign).
- **Review form** (per Delivery 2 §8): concept → spaced elaborative questioning
  ("ball at peak of throw — is acceleration zero? Why?"); procedure → sign-pair
  classification problems distributed throughout kinematics.
- **Automaticity target**: classifying speeding up/slowing down from sign pairs
  must be automatic before dynamics (Newton's second law) is taught. F = ma will
  be misapplied if the sign convention for acceleration isn't automatic.
- **Interleaving partners**: `phys.mech.velocity` (sign conventions inherited);
  `phys.mech.kinematics-1d` (acceleration as the key variable in kinematic
  equations); `phys.mech.circular-motion` (direction-change acceleration reappears).

## Transfer map

- *Near*: `phys.mech.kinematics-1d` — all kinematic equations involve acceleration.
- *Near*: `phys.mech.newtons-second-law` — F = ma; acceleration links kinematics
  to dynamics.
- *Far*: `phys.mech.circular-motion` — centripetal acceleration (direction change
  at constant speed); `phys.mech.angular-kinematics` — angular acceleration.
- *Cross-subject*: maths (second derivative — acceleration is d²x/dt²); economics
  (inflation as acceleration in prices — a metaphorical analogy, not physics).
- *Real-world*: g-forces in aviation and amusement parks; car safety ratings
  (crash deceleration); measurement by accelerometers in smartphones.
- *Expert transfer*: proper acceleration in special relativity (an observer in
  free fall is accelerating in Newtonian mechanics but not in general relativity —
  the equivalence principle); non-inertial frame forces (fictitious forces appear
  when the frame itself accelerates).

## Curriculum feedback

The KG `requires` correctly lists `phys.mech.velocity`. The `difficulty: developing`
and `mastery_threshold: 0.75` are appropriate — the sign convention and the
constant-speed/acceleration distinction are genuinely harder than the basic
definition. One potential missing prerequisite: the circular-motion preview
(M2 recovery) uses the vector nature of velocity, which is properly in
`phys.meas.scalars-vectors`. The implicit dependency on that concept would be
made explicit by adding it to the `requires` chain for the mechanics domain.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

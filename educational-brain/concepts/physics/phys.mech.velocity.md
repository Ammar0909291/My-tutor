# Speed and Velocity — `phys.mech.velocity`

## Identity

- **Concept ID**: `phys.mech.velocity`
- **Curriculum location**: physics / classical mechanics
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mech.displacement` — the load-bearing part is the distinction between
    displacement (vector; depends only on start and end) and distance (scalar;
    path-dependent). Velocity is defined as displacement/time — without this
    distinction, the learner cannot understand why speed (distance/time) and
    velocity (displacement/time) are different quantities. The sign convention
    for displacement is directly inherited by velocity.
- **Unlocks** (from KG): `phys.mech.acceleration` — and via the kinematic chain,
  every subsequent mechanics concept. Velocity is the "state" of a moving object;
  acceleration is its rate of change. A learner who conflates speed and velocity
  will produce sign errors in every dynamics problem and cannot correctly analyse
  deceleration (negative acceleration with the direction of motion).
- **Difficulty**: foundational · **Bloom**: understand · **Mastery threshold**: 0.70 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 9 Ch. 8
- **Learning objectives** — the learner can:
  1. Define average speed as total distance/total time and average velocity as
     total displacement/total time, and explain why they differ when direction
     changes.
  2. Compute average speed and average velocity from a described motion.
  3. Explain what instantaneous velocity means (rate of change of position at a
     single instant) and how it differs from average velocity over a time interval.
  4. Use the sign of velocity to indicate direction in a chosen coordinate system.

## Mental models

- **Beginner (arriving)**: speed and velocity are the same thing — how fast
  something is moving. "60 km/h" is both the speed and the velocity. Direction
  is a separate piece of information, not part of velocity itself.
- **Intermediate**: speed = distance/time (scalar, always positive); velocity =
  displacement/time (vector, can be negative in 1D). These are the same number
  only for straight-line, non-reversing motion. Average velocity for a round
  trip is zero (displacement zero); average speed for a round trip is positive
  (distance positive). Velocity's sign tells you the direction of motion in the
  chosen positive direction.
- **Advanced**: average velocity = Δx/Δt is a chord slope on a position-time
  graph. Instantaneous velocity = dx/dt is the tangent slope at a point. The
  speedometer shows instantaneous speed (the magnitude of instantaneous velocity).
  A particle can slow down (acceleration opposing velocity), speed up (acceleration
  with velocity), or change direction (velocity crosses zero and changes sign).
- **Expert**: velocity is the time-derivative of the position vector (v⃗ = dr⃗/dt),
  transforming as a rank-1 tensor under coordinate change. In special relativity,
  it becomes the four-velocity (with the time component), and the formula for
  composing velocities is no longer additive. In Hamiltonian mechanics, velocity
  and momentum are related but distinct (v = ∂H/∂p, not p/m in general).
- **Versioning note**: install the intermediate model here (speed/velocity as
  scalar/vector counterpart pair, sign convention for 1D velocity). Signal the
  advanced model: "average velocity is the slope of the position-time graph — you'll
  see this connection when we study motion graphs."

## Why beginners fail here

The speed/velocity conflation is as deep as the distance/displacement one — everyday
language uses "speed" and "velocity" interchangeably. The hardest failure: a learner
who says "velocity is 60 km/h" without direction is not wrong by everyday standards,
only by physics conventions. The second failure: understanding that average velocity
can be zero for a round trip (displacement = 0) while average speed is positive
(distance > 0) — this result feels absurd ("I was clearly moving!") until the
learner has completely internalised the distance/displacement distinction from
the previous concept.

## Misconception library

**M1 — Speed and velocity are synonyms**
- *Why*: everyday language conflation (type 2, same as the distance/displacement
  conflation — they appear together as a pair of concepts).
- *Symptom / phrases*: "its velocity is 60 km/h" (no direction); uses speed and
  velocity interchangeably in problem setup.
- *Detection probe (verbatim)*: "A car travels at 60 km/h. Is that a complete
  description of its velocity?" Correct: no — direction missing. Wrong: yes.
- *Recovery*: the turning car scenario (from `phys.meas.scalars-vectors` misconception
  library M2). At a constant 60 km/h, the speed is constant. Turning changes the
  direction, so the velocity changes. If speed and velocity were the same, this
  would be a contradiction — they're not the same.
- *Verification*: problems where speed is constant but velocity changes (circular
  motion, change of direction); the learner must identify whether speed or velocity
  or both changed.

**M2 — Velocity can only be positive (the same as displacement M2)**
- *Why*: "velocity is how fast" sounds like a non-negative quantity (type 2,
  linguistic inference). Also, speed (the everyday word) IS always non-negative.
- *Symptom*: drops negative signs from velocity calculations; says "velocity is
  5 m/s" when the object moves in the negative direction.
- *Detection probe*: "A ball moves at 5 m/s to the left (negative x direction).
  What is its velocity?" Wrong: 5 m/s. Correct: −5 m/s.
- *Recovery*: connect to displacement. Displacement is signed (rightward positive,
  leftward negative). Velocity = displacement/time. If displacement is negative,
  velocity is negative. "Negative velocity just means moving in the negative
  direction — nothing strange about it."
- *Verification*: three 1D velocity problems with motion in the negative direction.

**M3 — Average velocity = (v_initial + v_final)/2 always**
- *Why*: this formula IS correct for uniform acceleration — and it is the first
  case of average velocity the learner sees; overgeneralised to non-uniform cases
  (type 4).
- *Symptom*: for non-uniform acceleration (varying acceleration), uses
  (v₁ + v₂)/2 instead of total-displacement/total-time.
- *Detection probe*: "A car accelerates from 0 to 10 m/s in 2 s, then stays
  at 10 m/s for 3 s. What is the average velocity over 5 s?" Total displacement:
  (0+10)/2 × 2 + 10 × 3 = 10 + 30 = 40 m. Average velocity: 40/5 = 8 m/s.
  Using (v₁ + v₂)/2 = (0+10)/2 = 5 m/s — wrong.
- *Recovery*: the definition — average velocity = total displacement / total time.
  The (v₁ + v₂)/2 formula is a shortcut valid ONLY for constant acceleration.
  Every time average velocity is asked for, go back to the definition.
- *Verification*: two problems — one uniform acceleration (both methods agree),
  one non-uniform (only definition method is correct). Learner must identify which
  formula applies.

**M4 — Instantaneous velocity is just a very small average velocity**
- *Why*: "instantaneous" sounds like "average over a tiny interval" — which is
  the informal explanation that doesn't capture the limit (type 5, imprecise
  instruction).
- *Symptom / phrases*: "at t=0.001 s, the velocity is approximately ___" (treating
  a very small interval as the instantaneous value, without acknowledging that
  the true limit is needed).
- *Detection probe*: "What does a speedometer measure?" Correct: instantaneous
  speed (the rate of change of position AT that moment, not over a small interval).
  "How would you compute it from position data?" A learner with M4 says "measure
  the position at two very close times and divide" — partially correct but misses
  the nature of the limit.
- *Recovery*: the tangent line picture — draw a position-time curve. The average
  velocity between two points is the slope of the chord. As the two points get
  closer, the chord approaches the tangent. The instantaneous velocity IS the
  tangent slope. The "very small interval" approach IS correct in the limit —
  the issue is whether the learner understands that the limit must be taken.
- *Verification*: interpret velocity from a position-time graph by drawing tangents
  (requires no calculus — just the geometric picture).

## Explanation library

- **Age 12–14**: "Speed tells you HOW FAST. Velocity tells you HOW FAST and in
  WHICH DIRECTION. 'The car goes 60 km/h' — that's speed. 'The car goes 60 km/h
  northbound' — that's velocity. The number is the same; the direction is what's
  new. The reason we need both: if the car is going 60 km/h northbound and you
  ask 'where will it be in one hour?' you NEED the direction. Speed alone isn't enough."
- **Age 14+**: "Velocity = displacement / time. Speed = distance / time. For
  straight-line motion in one direction, they give the same number. The moment you
  change direction, they diverge. Average velocity for a round trip = 0 / total time
  = 0 (displacement is zero). Average speed for a round trip = total distance / time
  > 0. So 'average velocity = 0' doesn't mean the object was stationary — it means
  the net displacement was zero over that interval."
- **Adult returning learner**: "The speedometer gives speed (always positive,
  magnitude of velocity). A velocity must include direction. In 1D (along a line),
  direction is captured by the sign: + is forward, − is backward. A car in reverse
  has negative velocity. Acceleration and velocity are both signed in 1D, and the
  relationship between their signs tells you whether the car is speeding up or slowing
  down — a key skill for kinematics problems."

## Analogy library

- **Best analogy**: the weather forecast. "Winds at 20 km/h" (speed — no direction).
  "Winds from the northwest at 20 km/h" (velocity — direction included). You
  cannot plan where to sail without the direction; speed alone is insufficient.
  *Breaking point*: wind from a direction means the wind blows IN THAT DIRECTION
  (not to it) — a common confusion in wind descriptions. Clarify the direction
  convention before using this analogy.
- **Alternative**: a train timetable. The train's speed is 100 km/h. Its velocity
  is 100 km/h southbound on the morning run and −100 km/h (northbound) on the
  return run. Same speed, opposite velocities. The velocity tells you which end
  of the line the train is heading for.
  *Breaking point*: train schedules typically give times at stations, not velocities —
  the analogy requires the learner to translate station spacing into speed.
- **Anti-analogy to avoid**: "velocity is just speed with a plus or minus sign."
  This is correct for 1D but breaks entirely for 2D (velocity is a vector with two
  or three components, not just a sign). Use this shorthand only explicitly for 1D;
  flag it as 1D-only if you use it at all.

## Demonstration library

- **Home, no equipment**: walk 10 steps east, then 10 steps west. Time the whole
  walk. Distance = 20 steps; displacement = 0. Average speed = 20 steps / time.
  Average velocity = 0 steps / time = 0. "Did you move? Yes. Average velocity zero?
  Yes. These are not contradictions — they measure different things."
- **Teacher demo**: motion sensor pointing at a learner who walks away then returns.
  Plot position-time graph live. Show: average velocity for the round trip = 0;
  instantaneous velocity at the turnaround point = 0 (the tangent is flat).
- **Interactive**: a simulation of a car trip with waypoints and times. Compute
  average speed (total distance/time) and average velocity (net displacement/time)
  for the same trip. See them agree for one-way trips and diverge for trips
  with direction changes.
- **Prediction before**: give a round-trip scenario. "What will the average velocity
  be?" Most predict a positive nonzero number (using speed instead). Reveal 0.
  The surprise is the teaching moment.

## Discovery lesson

**Guided discovery** is appropriate for the speed/velocity distinction — it can
emerge from the round-trip collision with M1.

**Discovery sequence**:
1. *Need*: "You jog around a 400 m track in 100 s. What is your average speed?
   What is your average velocity?" Expect most learners to give the same answer
   for both. Set up the contradiction.
2. *Playground*: compute displacement for the round trip (= 0). Compute average
   velocity = 0/100 = 0. Compare to average speed = 400/100 = 4 m/s.
3. *Invention*: "why are they different?" Lead to: speed uses distance; velocity
   uses displacement. "So we need two words because the two quantities ARE different."
4. *Collision*: 1D with sign. Rightward positive → leftward motion has negative
   velocity. "Does negative velocity make sense?" Build the sign convention from
   the displacement convention.
5. *Formalization*: definitions of average speed and average velocity; direction
   convention.
6. *Compression*: draw a two-column table: speed vs velocity, for each row
   (definition, scalar/vector, sign, formula, example).

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Guided discovery** (high fit): round-trip collision reveals the distinction.
2. **Contrast cases** (high fit): always present speed and velocity as a pair for
   every example.
3. **Error exposure** (high fit): the round-trip (average velocity = 0) is the
   primary collision with M1 and must be taught first, not as an aside.
4. **Graph interpretation** (high fit): position-time graph, slope = velocity —
   install the graph interpretation alongside the formula.

## Voice teaching

*How it sounds when taught well*: the tutor always says the direction when giving
a velocity ("2 m/s east," "−3 m/s"); "velocity" and "speed" are NEVER used
interchangeably; the sign is spoken ("negative 5 m/s") not hedged.

*Load-bearing sentence to slow down on*: "Average velocity for a round trip is
zero — because displacement is zero. The car was moving, but it came back where
it started, so the NET change in position is zero." Pause. Let this land.

*What to listen for*: learner gives velocity without direction → M1; learner drops
negative sign from velocity → M2; learner uses (v₁ + v₂)/2 in a non-uniform
acceleration context → M3.

## Assessment

**Diagnostic — golden probe**: "A runner completes one lap of a 400 m track in
80 s. What is their average speed? What is their average velocity?" Correct:
speed = 5 m/s; velocity = 0 m/s. A learner who gets 5 m/s for both has M1.

**Distractor-mapped items**:
- "A car drives 60 km east in 1 h, then 60 km west in 1 h. Average velocity:"
  Options: 60 km/h, 0 km/h, 120 km/h, 30 km/h. Answer: 0 km/h. Distractor
  60 km/h targets M1 (uses average speed instead).
- "A ball rolls 5 m/s to the left (negative direction). Its velocity is:" Options:
  5 m/s, −5 m/s, 0 m/s, 5 m/s west. Answer: −5 m/s (signed) or "5 m/s to
  the left" (with explicit direction). Distractor "5 m/s" targets M2.

**Guided practice → independent practice fading ladder**:
1. Calculate average speed and average velocity for 4 scenarios (1D, no reversal,
   scaffolded with start/end/distance/displacement columns).
2. Same, with direction reversal (displacement ≠ distance).
3. One round-trip problem; compute both.
4. Interpret velocity sign in 3 scenarios (positive = right, negative = left).
5. (Delayed, 1 week): one non-uniform motion scenario — compute average velocity
   from total displacement/time, not (v₁+v₂)/2.

**Mastery gate set** (per assessment/05):
- *Production*: calculate average speed and average velocity for a multi-leg
  journey with direction change; state the sign convention.
- *New surface*: interpret a position-time graph — where is velocity positive?
  Where is it negative? Where is it zero?
- *Mixed*: interleaved speed and velocity items; some requiring sign; one
  round-trip.
- *Delayed*: one-week — average velocity for a non-uniform scenario.

## Recovery notes

*Likeliest utterance*: "but isn't velocity just 60 km/h?" (M1); "how can
velocity be zero if I was moving?" (surprise at round-trip result).

*Concept-specific smaller question for M1*: "If velocity and speed were the same,
why would a car going north at 60 km/h and a car going south at 60 km/h behave
differently?" (They approach each other; they'd collide.) "So direction matters
for what the car DOES next — that's why velocity has direction." Build the
distinction from consequence, not definition.

*Handling the round-trip surprise*: "Average velocity = 0 sounds wrong — but it
just means your net position didn't change. You moved the whole time, but you
ended where you started. Average SPEED is still nonzero. The two are measuring
different aspects of the same trip."

## Memory & review

- **Concept type**: concept (speed/velocity distinction) + procedure (computing
  each).
- **Review form** (per Delivery 2 §8): contrast-case review — every kinematics
  problem involves velocity; periodically ask "what is the speed? what is the
  velocity?" as additional questions to maintain the distinction.
- **Automaticity target**: stating a velocity ALWAYS with direction (or sign in 1D)
  should be automatic before kinematics-1D is taught. Every bare magnitude without
  a direction in a velocity answer must be flagged.
- **Interleaving partners**: `phys.mech.acceleration` (next kinematic quantity,
  directly analogous); `phys.mech.kinematics-1d` (both speed and velocity appear
  in kinematic equations with different roles).

## Transfer map

- *Near*: `phys.mech.acceleration` — acceleration = change in velocity / time;
  the signed character of velocity transfers directly.
- *Near*: `phys.mech.kinematics-1d` — all kinematic equations use velocity
  (signed); speed appears only in specific contexts (kinetic energy).
- *Far*: `phys.mech.circular-motion` — uniform circular motion has constant speed
  but continuously changing velocity (direction changes → acceleration exists even
  with constant speed).
- *Cross-subject*: maths (gradient/derivative — velocity as dx/dt); geography
  (wind speed vs. wind velocity in navigation).
- *Real-world*: aircraft navigation (airspeed vs. ground velocity, accounting for
  wind); satellite speed vs. orbital velocity; a car's speedometer (shows speed,
  not velocity — no direction shown).
- *Expert transfer*: in special relativity, velocity composition requires the
  Lorentz transformation, not simple addition. Understanding why Newtonian velocity
  (additive) fails at high speeds is grounded in having a precise definition of
  velocity as displacement/time in a given reference frame.

## Curriculum feedback

The KG `requires` correctly lists `phys.mech.displacement`. A missing conceptual
link: `phys.meas.scalars-vectors` is the source of the scalar/vector distinction
that defines the speed/velocity difference — its absence from the prerequisite
chain means a learner could reach velocity without the scalar/vector framework.
Recommend adding `phys.meas.scalars-vectors` to the `requires` list of
`phys.mech.velocity` (or of `phys.mech.displacement` — either propagates it).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

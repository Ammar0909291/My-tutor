# Displacement and Distance — `phys.mech.displacement`

## Identity

- **Concept ID**: `phys.mech.displacement`
- **Curriculum location**: physics / classical mechanics
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.units` — the load-bearing part is that length is a measurable
    quantity with units (metres), and that a number alone is not a complete
    measurement. Without units, displacement is just a number; with units,
    it is a measured change in position. The learner also needs the idea that
    direction is a possible attribute of a physical quantity (from
    `phys.meas.scalars-vectors`, though not listed explicitly in the KG — see
    Curriculum feedback).
- **Unlocks** (from KG): `phys.mech.velocity` — and via velocity, the entire
  kinematic chain. Displacement is the foundational kinematic variable; every
  subsequent kinematic quantity (velocity, acceleration) is defined as a
  rate of change of displacement or velocity. A learner who conflates
  distance with displacement will produce systematic errors in every kinematics
  problem involving direction changes.
- **Difficulty**: foundational · **Bloom**: remember · **Mastery threshold**: 0.70 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 9 Ch. 8
- **Learning objectives** — the learner can:
  1. Define displacement as the straight-line vector from initial to final position
     (including direction), and distance as the total scalar path length.
  2. Correctly compute both displacement and distance for a described motion path.
  3. Identify scenarios where displacement and distance are equal (straight-line
     motion in one direction) and where they differ (any change of direction).
  4. State that displacement can be zero even when distance is not (return to start).

## Mental models

- **Beginner (arriving)**: distance and displacement are synonyms — both mean
  "how far something moved." The word "displacement" is a more formal, technical
  term for the same thing as "distance." Any difference is cosmetic.
- **Intermediate**: displacement is the straight-line ("as the crow flies") gap
  between start and end, with a direction attached. Distance is the full path
  length walked, regardless of direction. They are equal only when the motion is
  straight-line and one-directional. When there is any change of direction, they
  differ. The key discriminator: displacement depends only on start and end
  positions; distance depends on the entire path taken.
- **Advanced**: displacement is a vector quantity (in 1D, its sign encodes
  direction; in 2D/3D, it has full vector character). Distance is a scalar —
  always non-negative, path-dependent. In calculus terms, distance = ∫|v|dt;
  displacement = ∫v⃗ dt (the vector integral). For one-directional motion,
  these are equal because |v| = v everywhere; for motion with direction reversals,
  they diverge.
- **Expert**: displacement is the position vector difference Δr⃗ = r⃗_final − r⃗_initial,
  independent of path. It is a rank-1 tensor in Euclidean space. In
  generalised coordinates, displacement is the tangent vector to the path at a
  point; in special relativity, it becomes the spacetime interval.
- **Versioning note**: install the intermediate model here — start/end distinction
  vs. path-following distinction. Signal: "displacement will be the fundamental
  variable when we get to velocity and acceleration — those are defined as rates
  of change of displacement, not of distance."

## Why beginners fail here

The words "distance" and "displacement" are not distinguished in everyday
language — people ask "what distance did you travel?" or "what displacement
did you make?" interchangeably, both meaning "how far?" The physics distinction
(path vs. straight line; scalar vs. vector) is a technical refinement that
conflicts with deep verbal habit. Even learners who learn the distinction in
class revert to using "distance" for displacement when working quickly, causing
sign errors (treating displacement as always positive when it can be negative
for reverse motion) and magnitude errors (treating the path length as the
displacement when direction changes have occurred).

## Misconception library

**M1 — Displacement and distance are the same quantity**
- *Why*: everyday language uses them interchangeably (type 2, language transfer).
- *Symptom / phrases*: "displacement is just the distance travelled"; uses distance
  and displacement interchangeably in problem setup; equates the two numerically.
- *Detection probe (verbatim)*: "A person walks 4 km east, then 3 km north. What
  is their (a) distance? (b) displacement?" Wrong: (a) 7 km, (b) 7 km.
  Correct: (a) 7 km, (b) 5 km northeast. If the learner gives 7 km for both,
  M1 is active.
- *Recovery*: the walk-and-measure demo (from demonstrations below) — measure the
  path walked vs. the straight-line gap. The gap is shorter. "That gap is the
  displacement."
- *Verification*: a round trip (person walks 5 km east, then 5 km west back to
  start). Distance = 10 km; displacement = 0. If the learner says "displacement
  = 10 km," M1 persists.

**M2 — Displacement is always positive (it is a "how far" quantity, not a
signed quantity)**
- *Why*: distance (the everyday equivalent) is always non-negative; learners carry
  this constraint to displacement (type 4, overgeneralisation of distance property).
- *Symptom / phrases*: "displacement can't be negative — you can't travel a
  negative distance"; drops the negative sign in displacement calculations.
- *Detection probe*: "A ball rolls 3 m to the right (positive direction), then
  5 m to the left. What is the displacement?" Correct: −2 m (net leftward). Wrong:
  2 m (the magnitude, dropping the sign).
- *Recovery*: the number-line analogy. Start at 0. Move to +3. Move to −2.
  "Where are you?" (At −2.) "How far from start?" (2 m.) "Which direction?" (Left.)
  "Displacement = −2 m" — the negative IS the direction in 1D. Displacement
  encodes direction; distance doesn't.
- *Verification*: three 1D problems with direction reversals — displacement must
  include sign.

**M3 — "Net distance" = displacement (displacement is just the arithmetic sum
of signed distances)**
- *Why*: learners who understand that displacement is signed sometimes confuse
  it with the algebraic sum of individual path segments rather than the
  straight-line vector gap (type 5, partial understanding).
- *Symptom*: for a 2D path (4 km east + 3 km north), calculates displacement as
  4 + 3 = 7 km (algebraic sum) rather than 5 km (geometric resultant).
- *Detection probe*: "A particle moves 4 m east, then 3 m north. Displacement?"
  Wrong: 7 m east-north (simple sum). Correct: 5 m at 37° north of east
  (Pythagorean resultant).
- *Recovery*: draw the path. Mark start and end. Connect them with a straight
  arrow. "That arrow is the displacement — it's the vector from start to end,
  NOT the total of all steps." In 1D, the arithmetic-sum and straight-line methods
  give the same answer — which is WHY the confusion exists. In 2D, they diverge.
- *Verification*: 2D displacement problems where the path changes direction by
  a non-180° angle.

**M4 — Displacement is always less than distance (displacement < distance always)**
- *Why*: all given examples in early instruction have path-wandering; the edge
  case (straight-line motion, distance = displacement) is not practised (type 5,
  instructional incompleteness).
- *Symptom*: says "displacement is always less than distance" as a rule; cannot
  identify when they are equal.
- *Detection probe*: "When is displacement equal to distance?" Common wrong:
  "never" or "when you go in a straight line for a bit." Correct: when the entire
  motion is straight-line, in one direction, without reversal.
- *Recovery*: the edge case directly. "Drive 100 km due north on a straight road.
  Distance = 100 km. Displacement = 100 km north. They are equal. The inequality
  only appears when the direction changes."
- *Verification*: five scenarios — two where displacement = distance, two where
  displacement < distance, one where displacement = 0 but distance > 0.

## Explanation library

- **Age 12–14 (story)**: "You're in a maze. You walk through every corridor —
  total path: 300 metres. But the entrance and exit are only 20 metres apart
  (straight through the wall). Distance = 300 m (every step you took). Displacement
  = 20 m (straight from start to finish). Displacement doesn't care about the
  journey — only the result."
- **Age 14+**: "Distance is the odometer reading — it adds up every centimetre you
  travel, regardless of direction. Displacement is the GPS instruction: 'you are
  5 km northeast of your starting point.' One is path-dependent; the other is
  not. If you walk in a straight line, they agree. The moment you change direction,
  they diverge. For a full round trip returning to the start: distance = the whole
  round trip; displacement = 0, because you ended where you started."
- **Adult returning learner**: "You've used both of these in real life without
  naming them. When you say 'I ran 10 km today,' you mean distance — total path
  length. When your phone says 'you're 3.2 km from home,' it means displacement —
  straight-line from where you are to home. Physics uses both, so it needs two
  names to keep them distinct."

## Analogy library

- **Best analogy**: the odometer vs. the GPS crow-flies distance. The car's
  odometer counts every metre of road, regardless of turns (distance). The GPS's
  "distance to destination" is the straight-line gap (displacement-like).
  *Breaking point*: GPS "distance to destination" is also path-dependent in
  route-following mode; only the "straight-line" mode is equivalent to displacement.
  Be explicit: "the straight-line distance on GPS, not the driving directions
  distance."
- **Alternative**: the crow-flies analogy. "As the crow flies" is a common
  phrase meaning straight-line distance, which is displacement's magnitude.
  The actual road path is the distance.
  *Breaking point*: "as the crow flies" gives only magnitude — it omits direction,
  making it a scalar. Displacement has direction. The analogy works for
  magnitude only.
- **Anti-analogy to avoid**: "displacement is always shorter than distance."
  This installs M4 and prevents the learner from recognising the equal case.
  The correct statement is "displacement is ≤ distance, with equality when
  the motion is straight-line and non-reversing."

## Demonstration library

- **Home, no equipment**: walk from one room to another by two different paths
  (the direct way and the longer way around). Both have the same displacement
  (same start and end). The distances are different. Measure both with a measuring
  tape.
- **Teacher demo**: draw a map on the board. Mark start and end. Draw three
  different paths between them. All have the same displacement (same Δr vector);
  all have different distances. Ask: "which matters for finding velocity?" →
  displacement (rate of change of position, not path length).
- **Interactive**: a motion-sensor logger (or a simulation) — have a learner
  walk back and forth. The sensor plots position vs. time. Compute the net
  displacement (final − initial position) and compare with total distance walked
  (sum of all segment lengths). See them differ when direction reversed.
- **Prediction before demo**: "I walk 5 m east, then 5 m west. What is my
  displacement?" Collect predictions (some say 10 m, some say 0). Reveal 0 m.
  The surprise — zero displacement after real walking — is the productive collision.

## Discovery lesson

**Guided discovery** is appropriate — the distinction can be reached by the
learner from the walk scenario.

**Discovery sequence**:
1. *Need*: pose the round-trip problem. "A runner runs 400 m around a track and
   returns to the start. The track is a perfect circle of circumference 400 m.
   How far did the runner travel? How far is the runner from the start?" Collect
   answers — expect disagreement between "400 m" and "0 m."
2. *Playground*: use a grid map. Walk two routes between the same two points.
   Measure path length and the straight-line gap. Note: gap is the same for
   both routes; path is different.
3. *Invention*: learner names the distinction. "We need TWO words for these two
   different things." Introduce distance and displacement as the established names.
4. *Collision*: 1D signed case — displacement can be negative; distance never is.
   "Runner goes 3 m east, then 5 m west. Displacement = −2 m. Distance = 8 m."
5. *Formalization*: definitions. Displacement = vector from initial to final
   position. Distance = total path length (always positive).
6. *Compression*: one sentence for each, in learner's own words.

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Guided discovery** (high fit): the distinction can be reached by learner
   reasoning from the round-trip problem.
2. **Contrast cases** (high fit): parallel presentation of distance and displacement
   for the same journey is the primary teaching tool.
3. **Error exposure** (high fit): the round-trip (displacement = 0) is the key
   collision with M1.

## Voice teaching

*How it sounds when taught well*: the tutor ALWAYS states both distance and
displacement for every example — they always appear as a pair; direction is stated
for every displacement ("2 m eastward" not "2 m"); the round-trip scenario is
used as the go-to example.

*Load-bearing sentence to slow down on*: "Displacement depends ONLY on your
starting point and ending point — not on the path you took to get there. Distance
depends on every step of the path." Say slowly, then give the round-trip as an
immediate example.

*What to listen for*: learner says "displacement is 10 km" for a round-trip →
M1; learner gives a positive number for leftward motion → M2; learner adds the
two distances geometrically wrong for 2D → M3.

## Assessment

**Diagnostic — golden probe**: "A car drives 60 km east, then 60 km west, returning
to the start. State: (a) total distance, (b) displacement." Correct: (a) 120 km,
(b) 0. A learner who gives 120 km for both has M1; a learner who gives 0 for both
has confused displacement and distance the other way.

**Distractor-mapped items**:
- "A particle moves 3 m north and 4 m east. Its displacement is:" Options: 7 m,
  5 m, 5 m NE, 1 m. Correct: 5 m NE (Pythagoras + direction). Distractor 7 m
  targets M3 (arithmetic sum). Answer "5 m" without direction is incomplete.
- "Which of the following is true? (A) Displacement is always ≤ distance.
  (B) Displacement is always shorter than distance. (C) Displacement and distance
  are always equal. (D) Displacement can be greater than distance." Correct: A.
  Distractor B installs M4.

**Guided practice → independent practice fading ladder**:
1. Three 1D motion scenarios — compute distance and displacement (scaffolded
   number line provided).
2. Three 1D signed problems including direction reversal — state sign of displacement.
3. Two 2D problems — compute displacement by Pythagoras, state direction.
4. One round-trip problem — displacement = 0, distance = path length.
5. (Delayed, 1 week): "A person walks 3 km east, 4 km north, 3 km west. Distance?
   Displacement?" (Distance: 10 km; displacement: 4 km north.)

**Mastery gate set** (per assessment/05):
- *Production*: compute distance and displacement for three different scenarios
  (1D, 2D, round-trip) with directions stated.
- *New surface*: given a speed-time graph, identify which area gives distance and
  which gives displacement (preview of kinematics integration).
- *Mixed*: interleaved distance-only and displacement problems; some 1D with sign,
  some 2D.
- *Delayed*: one-week — round-trip and 2D displacement.

**Calibration note**: learners often feel confident after the 1D case (feels
obvious once explained). Miscalibration is revealed by 2D cases (they revert to
arithmetic sum) and by the round-trip (they say displacement ≠ 0). Include both
in the mastery gate before confirming.

## Recovery notes

*Likeliest utterance*: "displacement and distance are the same thing, aren't they?"
(M1); "but I thought displacement was always positive" (M2).

*Concept-specific smaller question*: "You're standing in your room. You take one
step east. What is your displacement?" (1 step east.) "Now you take one step back
(west). What is your displacement NOW from where you started?" (0 — back to start.)
"What is the total distance you walked?" (2 steps.) Build displacement-as-zero-for-
round-trip from something the learner just did, not from an abstract description.

*M2 recovery*: "If you're 3 m to the LEFT of where you started, how would you
write that as a number?" (−3 m.) "So displacement CAN be negative — the negative
just means you ended up on the other side of the start."

## Memory & review

- **Concept type**: concept (the distinction) + procedure (computing each).
- **Review form** (per Delivery 2 §8): elaborative questioning — "why can
  displacement be zero when distance isn't?" — and contrast-case problems
  interleaved with kinematics problems where sign of displacement matters.
- **Automaticity target**: distinguishing displacement from distance should be
  automatic before kinematics-1D is taught, because displacement's sign is the
  foundation of signed velocity and signed acceleration. A learner who pauses on
  this distinction in a kinematics problem is carrying excess load.
- **Interleaving partners**: `phys.mech.velocity` (velocity = displacement/time,
  so velocity inherits displacement's signed character); `phys.mech.kinematics-1d`
  (displacement as the fundamental position change variable).

## Transfer map

- *Near*: `phys.mech.velocity` — velocity = displacement/time; if displacement
  is signed, so is velocity.
- *Near*: `phys.mech.kinematics-1d` — all kinematic equations use displacement (Δx
  or s), not distance. Plugging in distance causes wrong answers for reversing motion.
- *Far*: `phys.mech.work` — work uses displacement, not distance (W = F·Δx;
  friction over a path = F×distance, but spring work = F×displacement).
- *Cross-subject*: maths (vectors in geometry; the position vector r⃗ and its
  change Δr⃗); geography (displacement vs. route length in navigation).
- *Real-world*: GPS navigation ("you are 2.3 km from your destination" = displacement
  magnitude); running apps (total distance run ≠ displacement from start of run
  if the route is a loop).
- *Expert transfer*: in general relativity, the displacement concept generalises
  to the metric tensor and the geodesic deviation; the straight-line distance
  becomes the spacetime interval.

## Curriculum feedback

The KG `requires` lists only `phys.meas.units` — this underrepresents the
dependency on `phys.meas.scalars-vectors`. Displacement is a vector quantity;
without the scalar/vector distinction, the learner cannot properly understand
why displacement has direction and distance does not. A missing prerequisite edge
to record as feedback to the Pipeline: add `phys.meas.scalars-vectors` to the
`requires` list of `phys.mech.displacement`. The `difficulty: foundational` is
appropriate but the teaching challenge (breaking the distance/displacement
synonym habit) is higher than the concept's intrinsic complexity suggests.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

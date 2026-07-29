# phys.mech.relative-motion — Relative Motion and Reference Frames

## Identity
- **Canonical KG ID**: `phys.mech.relative-motion`
- **Canonical name**: Relative Motion and Reference Frames
- **Curriculum domain**: Mechanics
- **Difficulty tier**: proficient
- **Bloom level**: analyze
- **Prerequisites**: `phys.mech.kinematics-2d`
- **Unlocks**: `phys.rel.postulates`
- **Estimated study hours**: 4
- **KG description**: Relative motion describes the velocity and position of one object as observed from a moving reference frame.

---


## Learning Objective

See Blueprint (`docs/curriculum/blueprints/phys.mech.relative-motion.md §1 Learning Objective`) for the full graded objective with accuracy thresholds and protocol assignments.


## Core Understanding

Relative motion describes the velocity and position of one object as observed from a moving reference frame.

This is the physical model learners must hold — not just a formula to apply — before downstream concepts can be correctly understood and transferred.

## Mental Models

**Stage 1 — Concrete (train and platform)**
You sit on a train moving at 60 km/h. A person on the platform sees you moving at 60 km/h forward. You see them moving at 60 km/h backward. A bird flying at 80 km/h in the same direction as the train: platform observer sees 80 km/h; you see the bird moving at only 20 km/h forward. All motion is relative to the observer's reference frame — there is no absolute "at rest."

**Stage 2 — Galilean velocity addition (1D)**
Let: v_AB = velocity of A relative to B.
Galilean composition: v_AC = v_AB + v_BC

(velocity of A relative to C = velocity of A relative to B + velocity of B relative to C)

Key: subscripts chain. v_AC: the outer subscripts give the answer; the middle subscripts cancel.

Examples:
- Train B moves at +60 km/h relative to ground C. Bird A moves at +80 km/h relative to ground C. Bird's velocity relative to train: v_AB = v_AC − v_BC = 80 − 60 = +20 km/h (forward).
- Same bird, but moving in opposite direction to train (v_AC = −80 km/h): v_AB = −80 − 60 = −140 km/h.

**Stage 3 — 2D relative motion (vector addition)**
In 2D: v⃗_AC = v⃗_AB + v⃗_BC (vector sum, not scalar)

Classic problem — river crossing:
- River current: v⃗_WG (water relative to ground) = 3 m/s east
- Boat velocity relative to water: v⃗_BW = 4 m/s north
- Boat velocity relative to ground: v⃗_BG = v⃗_BW + v⃗_WG = 4 north + 3 east → magnitude = 5 m/s, direction = arctan(3/4) = 36.9° east of north

To cross straight (reach directly opposite bank): aim boat upstream so the current and boat-water velocity vector-sum to a net northward velocity.

**Stage 4 — Position, acceleration, and inertial vs. non-inertial frames**
Position: r⃗_AC = r⃗_AB + r⃗_BC
Velocity: v⃗_AC = d(r⃗_AC)/dt = v⃗_AB + v⃗_BC (Galilean addition)
Acceleration: a⃗_AC = a⃗_AB + a⃗_BC

For inertial frames (constant relative velocity, a⃗_BC = 0): a⃗_AC = a⃗_AB — acceleration is the same in all inertial frames. Newton's laws have the same form in all inertial frames (Galilean invariance).

Non-inertial frames (accelerating frames): Newton's laws fail in their standard form; pseudo-forces (fictitious forces like centrifugal force) appear. This is the gateway to `phys.rel.postulates`.

**Mental-model versioning**: Stage 1 for conceptual grounding; Stage 2 for 1D problems; Stage 3 for river/wind/boat problems (the exam staple); Stage 4 for the deeper physics of frame invariance.

---

## Why Students Fail

1. **Subscript order confusion**: Students write v_AB when they mean v_BA. The rule "outer subscripts give the answer, middle cancel" is not intuitive — students must practice the subscript chain until it is automatic.
2. **Scalar addition in 2D**: Adding speeds (magnitudes) instead of vectors. "Boat speed = 4, current = 3, so total = 7" is wrong when the velocities are perpendicular; the correct magnitude is 5 (Pythagorean).
3. **Confusing "aim" with "travel direction"**: In the river problem, the boat aims perpendicular to the bank but travels diagonally (if the goal is just to cross). If the goal is to reach directly opposite, the boat must aim upstream — students confuse the heading (aim) with the path (ground velocity direction).
4. **Forgetting that acceleration transforms simply (Galilean)**: Students think each frame has a different acceleration. In Galilean (non-relativistic) mechanics, acceleration is frame-independent for inertial frames.

---

## Misconceptions

**M1 — "Adding speeds (not velocities) in 2D"**
- Probe: "A boat moves at 5 m/s northward in a river flowing east at 12 m/s. What is the boat's speed relative to the ground?"
- Characteristic phrase: "The speeds just add up to 17 m/s."
- Recovery: Velocities are vectors; when they are perpendicular, the magnitude of their sum is √(5² + 12²) = √(25 + 144) = √169 = 13 m/s, not 5 + 12 = 17. Draw the vector triangle. Only collinear (same or opposite direction) velocities can be added/subtracted as scalars.

**M2 — "Faster boat gets across the river faster regardless of aim"**
- Probe: "For a boat crossing a river, does a higher boat-speed-relative-to-water always mean shorter crossing time?"
- Characteristic phrase: "Faster is always better."
- Recovery: Crossing TIME depends only on the component of velocity perpendicular to the river (v_⊥ = v_BW for a boat aimed straight across). A faster boat aimed straight across crosses faster. BUT if the boat aims upstream (to reach directly opposite), v_⊥ = v_BW cosα < v_BW — the crossing takes longer. Distinguish the goal: shortest time vs. straight-line crossing require different strategies.

**M3 — "The ground is always the 'real' or 'correct' reference frame"**
- Probe: "Two cars approach each other, each doing 60 km/h relative to the ground. Does it matter which frame I use?"
- Characteristic phrase: "The ground frame is the true frame — the other one is just a trick."
- Recovery: All inertial frames are equally valid. The relative speed of the cars (120 km/h in the ground frame, or 120 km/h in either car's frame — the same result) is not more "real" in one frame. Physics has the same form in all inertial frames (Galilean invariance). No frame is privileged — this is the foundational idea leading to special relativity.

**M4 — "v_AB = −v_BA only if the motion is along a single line"**
- Probe: "Is it always true that v_AB = −v_BA in 2D?"
- Characteristic phrase: "That rule only works in 1D."
- Recovery: v_AB = −v_BA is a general vector identity in all dimensions (Galilean mechanics). If A moves at +4 north relative to B, then B moves at −4 north = 4 south relative to A, regardless of what other velocities are involved. Demonstrate with the train example: you see the platform moving backward; the platform observer sees you moving forward — same speed, opposite sign (direction).

---

## Analogies

**Primary analogy — Moving walkway at an airport**
You walk at 1 m/s forward on a walkway moving at 2 m/s forward relative to the ground. Ground observer sees you at 3 m/s. A friend walking beside you (also on the walkway, also at 1 m/s relative to walkway) sees you at 0 m/s — you appear stationary to each other. The walkway is the intermediate reference frame B; you are A; ground is C. v_AC = v_AB + v_BC = 1 + 2 = 3 m/s. The chain-rule is immediately intuitive.

**Breaking point**: The walkway analogy is perfectly 1D. In 2D (river, wind, rain), the vector addition is not captured by this analogy. Use it only for the chain-rule; use vector diagrams for all 2D work.

**Anti-analogy — Absolute rest**: Newtonian mechanics was historically described with an "absolute rest frame" (the ether). Einstein showed this was wrong — there is no privileged rest frame. At the level of Galilean mechanics (this concept), all inertial frames are equivalent. Students should not picture a "background" that things are moving through.

---

## Demonstrations

**D1 — Projectile from moving cart**
Roll a cart at constant speed and shoot a ball vertically upward from it (spring launcher). To an observer on the ground: the ball follows a parabolic path. To the person on the cart: the ball goes straight up and comes straight back down. Same event, two descriptions — both correct in their frames. Demonstrates that "straight up" is frame-dependent.

**D2 — River simulation (string and paper)**
Simulate a river: pull a paper "river" at constant speed across a table (using a motor or by hand). A student moves a pen perpendicularly across the paper. The pen draws a diagonal line on the paper but moves straight across the table — one motion, two observed paths depending on whether you track the pen on the paper (river frame) or on the table (ground frame).

**D3 — Compass bearing in wind problem**
A plane aims due north at 250 km/h airspeed. Wind blows east at 50 km/h. Ground speed = √(250² + 50²) ≈ 255 km/h; drift angle = arctan(50/250) ≈ 11° east of north. Reverse: if the pilot MUST track due north over the ground, they must aim 11° west of north (into the wind). Compute new ground speed: √(250² − 50²) ≈ 245 km/h. Real navigation — students find this immediately relevant.

---

## Discovery Questions

*Guided discovery is effective here*:

1. Start: two students face each other and throw a ball. Ask: "From the ball's perspective, which student is throwing and which is catching?" (Neither — it depends on the frame.)
2. Move to D1 demo: ball from moving cart. Ask: "Is the ball's path a straight line or a curve?" (Depends on who's watching.) Establish: there is no absolute path.
3. Give the 1D river problem: river = 3 m/s east; boat = 4 m/s north. "Where does the boat end up?" → Compute; show the diagonal path.
4. Ask: "What if we want to go straight across? What does the boat have to do?" → Aim upstream. Derive the angle.
5. Introduce the subscript rule as a formalism for what they just did intuitively.

---

## Teaching Sequence

| Situation | Action |
|---|---|
| Student adds speeds in 2D | Draw the vector triangle. "Are these vectors in the same direction?" If not, use Pythagorean theorem or law of cosines. Scalar addition works only for collinear vectors. |
| Student has subscripts backward | Ask: "v_AB: which object are we describing the motion of? Which frame is the observer in?" A is the object, B is the frame. Check: v_AB + v_BA should equal zero. If it doesn't, subscripts are wrong. |
| Student thinks ground frame is privileged | Present the two-car example: to car A, car B approaches at 120 km/h. To car B, car A approaches at 120 km/h. To the ground, each moves at 60 km/h. Ask: "Which is the 'real' speed?" All are real, in their respective frames. |
| Student confuses heading and ground track | Draw explicitly: boat heading (where bow points) is the direction of v⃗_BW; ground track (where boat actually goes) is the direction of v⃗_BG. These differ when there is current. |
| Student ready for special relativity | Introduce the failure of Galilean addition: at speeds near c, v_AC ≠ v_AB + v_BC. The correct formula is v_AC = (v_AB + v_BC)/(1 + v_AB × v_BC/c²). At low speeds, the denominator ≈ 1 → Galilean addition recovered. |

---


## Tutor Actions

Priority dispatch (in order):

1. **CONCRETE-THEN-ABSTRACT** — walking on a train first: you walk at 2 m/s toward
   the front of a train moving at 30 m/s. Your velocity relative to the ground:
   32 m/s. Your velocity relative to the train: 2 m/s. Write both. "The same motion,
   two different numbers — neither is wrong; both are relative to a stated reference."

2. **WORKED-EXAMPLE** — three reference-frame problems:
   (a) Walking on train (1D, same direction, then opposite)
   (b) Boat crossing river with current (2D — vector addition)
   (c) Airplane with crosswind — find ground speed and actual direction
   State the reference frame explicitly before each computation.

3. **MISCONCEPTION-PROBE** — "Is there a preferred reference frame in which velocities
   are 'really' correct?" Most learners say "the ground frame." Correct: no preferred
   frame in classical mechanics. The ground frame is convenient; the train frame is
   equally valid. This prevents M1 (absolute-velocity belief).

4. **RETRIEVAL-SCHEDULE-PROMPT** — three session openers:
   "A train moves east at 20 m/s. A passenger walks west at 3 m/s. What is their
   velocity relative to the ground?" → "A boat moves at 5 m/s north across a river
   with a 3 m/s east current — find ground velocity" → "What does 'reference frame'
   mean?"

## Voice Teaching Notes

"The key insight: all motion is measured relative to an observer. There is no absolute rest. When you're on a train doing 60, the platform is moving at minus 60 from your frame. Both descriptions are equally valid.

The formula is v-sub-AC equals v-sub-AB plus v-sub-BC. Read it as: A's velocity relative to C equals A's velocity relative to B plus B's velocity relative to C. The middle subscripts cancel — that's the chain rule for frames. If you get confused, check: v-AB plus v-BA should give zero.

In 2D, everything becomes vector addition. If the boat speed and river current are perpendicular, you get a right-triangle problem — not simple addition. Draw the triangle first, then apply Pythagoras or trigonometry.

River problems always have two goals mixed up: crossing in minimum time means aim straight across (maximum perpendicular component). Reaching directly opposite means aim upstream by just the right angle to cancel the current. Know which goal you're solving for before you start."

---

## Assessment Signals

**Mastery gate**: Student correctly applies v⃗_AC = v⃗_AB + v⃗_BC with proper vector addition in 2D, determines the correct heading to achieve a straight-line ground track, and explains that all inertial frames are equivalent. Three multi-part problems including at least one 2D river/wind problem and one subscript-reversal check.

**Formative golden probe**: "A plane needs to fly due north. Its airspeed is 300 km/h. Wind blows west at 60 km/h. (a) What heading must the pilot take? (b) What is the ground speed?"
- sinα = 60/300 = 0.20 → α = 11.5° east of north (into wind = east, since wind is westward)
- Ground speed: √(300² − 60²) = √(90000 − 3600) = √86400 ≈ 294 km/h
- Common error: adding airspeed and wind speed as scalars → 360 km/h (wrong direction and magnitude)

**Confidence calibration**: Ask after (a): "If the pilot aims straight north instead, where does the plane end up?" (Drifts west.) Then: "How much drift in 1 hour?" (60 km). This confirms whether the student understands the heading-vs-track distinction or is just applying a memorised formula.

**Delayed retrieval (1–2 weeks)**: "A river is 200 m wide with current 4 m/s. A boat can do 5 m/s relative to water. What is the minimum crossing time, and how far downstream does the boat drift?"

---

## Tutor Recovery Strategy

**If vector addition in 2D is not reliable**:
Return to `phys.meas.vector-addition` (prerequisite). The relative motion problem reduces to a vector addition problem with a specific physical story. If the student cannot add two vectors given as magnitude + direction, the arithmetic tool is not ready.

**If crossing-time vs. straight-track distinction is confused**:
Insist on naming the goal before computing. "Goal: minimum time" → aim straight across; ground velocity north = v_BW; time = d/v_BW. "Goal: reach opposite bank" → aim upstream; compute angle; ground velocity = perpendicular component only; time = d/(v_BW cosα).

**If subscript errors are persistent**:
Use a "middle-cancels" mnemonic on paper. Write all three frames as boxes; draw arrows between them labeled with the velocities. The chain law is just: velocity from left box to right box = sum of intermediate arrows. Making it visual eliminates the algebra-of-subscripts confusion.

---

## Memory Hooks

**Memory type**: Procedural (vector addition chain rule, 2D decomposition) + declarative (frame equivalence principle)
**Forgetting risk**: Medium — the chain rule is straightforward, but the 2D geometry errors (scalar addition, heading vs. track) resurface easily.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "Rain falls vertically at 8 m/s. A cyclist moves east at 6 m/s. What is the rain's velocity relative to the cyclist (magnitude and direction)? How should the cyclist tilt the umbrella?"

---

## Transfer Connections

**Near transfer**: Special relativity (`phys.rel.postulates` — the direct unlock): Galilean addition fails at speeds near c; Einstein's postulates replace it with the Lorentz transformation.
**Medium transfer**: River navigation, aircraft heading computation, interceptor course calculation (military and aerospace applications of relative motion).
**Far transfer**: Fluid mechanics — velocity of a fluid parcel relative to a moving ship (drag on a vessel depends on v_water relative to hull). Astrophysics — radial velocities of stars measured by Doppler shift are relative to the observer's frame.
**Cross-domain**: Economics — comparative advantage in trade theory is a relative-quantity argument structurally similar to the river crossing optimisation.

---


## Cross-Subject Connections

Mathematics: kinematics uses calculus (differentiation for velocity/acceleration, integration for displacement); vectors use linear algebra; energy methods use algebra and trigonometry. Chemistry: thermochemistry uses energy and work; reaction kinetics connects to activation energy. Biology: biomechanics (muscle force, gait), fluid mechanics in circulation (blood pressure, flow), and structural biology (bone stress) apply mechanics.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mech.relative-motion.md` (authoritative for Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite sections by reference, never restate here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages runtime-served explanation and probe assets. Authored seed assets for this concept are in `src/lib/teaching/assets/authoredSeedAssets.ts`.

- **Explanation assets**: multiple grade-band variants (MIDDLE / HIGH / ADULT) — core_explanation, worked_example, misconception_repair kinds
- **Probe assets**: MCQ and misconception_probe kinds, distractor-mapped to this entry's misconception IDs  
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database required to activate

## Curriculum Feedback

- KG prerequisite `phys.mech.kinematics-2d` is necessary — 2D vector decomposition and addition are the tools for relative motion in 2D problems.
- The unlock `phys.rel.postulates` is well-motivated: special relativity begins with the failure of Galilean velocity addition at relativistic speeds.
- Difficulty `proficient`/`analyze` is correct — the 2D cases require genuine vector reasoning, not formula substitution.
- Suggested cross-link: `phys.wave.doppler-effect` — Doppler shift is a relative-motion phenomenon, and the connection between relative velocity and observed frequency change is a natural transfer link.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

## Version History

- **v1.0** (2026-07-29): Migrated from pre-standard format to EDUCATIONAL_BRAIN_STANDARD.md v1.0 21-section structure. All sections verified against Quality Gates 1–8.

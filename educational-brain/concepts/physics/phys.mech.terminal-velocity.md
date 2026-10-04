# Drag and Terminal Velocity — `phys.mech.terminal-velocity`

## Identity

- **Concept ID**: `phys.mech.terminal-velocity`
- **Curriculum location**: physics / mechanics (fluids)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mech.viscosity` — the load-bearing part is that a fluid resists motion
    through it with a drag force that grows with speed, and Stokes' law
    F = 6πηrv for a small sphere. Through viscosity's own chain the learner also
    has Newton's second law and upthrust, which the force balance needs.
- **Unlocks** (from KG): none listed. Terminal velocity is the standard method for
  measuring viscosity, and its reasoning (net force zero ≠ no force; acceleration
  direction ≠ motion direction) recurs in every dynamics topic.
- **Difficulty**: proficient · **Bloom**: analyze · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Ch. 10 (Mechanical Properties of Fluids)

## Learning Objective

After this concept, the learner can:

1. Explain with free-body diagrams why a body falling through a fluid reaches a
     constant terminal velocity.
2. Derive and use v_t = 2r²(ρ − σ)g/(9η) for a small sphere, including the r²
     scaling.
3. Read and sketch a skydiver's velocity–time graph, including the effect of
     opening a parachute.
4. Distinguish "net force zero" from "no forces" and "acceleration upward" from
     "moving upward".

## Core Understanding

Drop a steel ball into a tall tube of glycerine. For a moment it speeds up, then it settles to a steady speed and covers every 10 cm in the same time. Three forces act: its weight, pulling down; the upthrust of the liquid, pushing up; and drag, pushing up against the motion. Weight and upthrust do not change, but drag grows with speed. At release drag is zero and the ball accelerates hard; as it speeds up, drag grows, the net force shrinks and so does the acceleration. When weight = upthrust + drag, the net force is zero, the acceleration is zero, and the speed stays constant — the terminal velocity. The forces have not vanished; they balance.

For a small sphere in slow, smooth flow, drag follows Stokes' law, F = 6πηrv. Setting weight (4/3)πr³ρg equal to upthrust (4/3)πr³σg plus drag 6πηrv_t gives v_t = 2r²(ρ − σ)g / (9η). A steel ball of radius 1 mm (ρ = 7800 kg/m³) in glycerine (σ = 1260 kg/m³, η = 1.5 Pa·s) settles at about 9.5 mm/s. Because weight grows as r³ but drag only as r, v_t grows as r²: double the radius and the ball falls four times as fast. If the ball's density equals the liquid's, v_t is zero — it simply stays put. The same balance, run backwards, measures a liquid's viscosity.

A skydiver shows the whole story in air. Leaving the plane she accelerates at about g; drag grows until, at roughly 55 m/s belly-down, it equals her weight — the first terminal velocity. Opening the parachute suddenly makes drag much larger than her weight. The net force is now upward, so her acceleration is upward: she slows down, still moving downward. As she slows, drag falls, until it again equals her weight at a new terminal velocity of a few metres per second. She never moves upward — films that suggest so are shot by a camera operator who is still falling fast.

## Mental Models

- **Beginner (arriving)**: falling things speed up forever (or fall at a fixed
  speed set by their weight); constant speed means nothing is pushing.
- **Intermediate**: drag grows with speed; terminal velocity is where forces
  balance and the acceleration is zero; the parachute gives an upward
  acceleration, not upward motion.
- **Advanced**: Stokes' law gives v_t ∝ r²(ρ − σ)/η for slow flow (Reynolds
  number ≪ 1); for a skydiver drag ∝ v² instead, so v_t ∝ √(weight/area); the v–t
  curve approaches v_t exponentially (Stokes) or as tanh (quadratic drag).
- **Expert**: the drag law changes with Reynolds number; Millikan's oil-drop
  experiment used Stokes terminal velocity to size the drops and measure the
  electron's charge.
- **Versioning note**: install the intermediate model and the Stokes result; name
  the v² drag of a skydiver as a different regime without deriving it.

## Why Students Fail

Constant velocity is read as "no forces", a direct carry-over of the pre-Newtonian
idea that motion needs a force and its absence needs none. The parachute case
fuses the direction of the net force with the direction of motion. And the r²
scaling is lost because learners expect "twice as big, twice as fast" or reason
only from weight (×8).

## Misconceptions

**M1 — At terminal velocity no forces act**
- *Why*: "constant speed" is heard as "nothing happening" (type 3, pre-Newtonian
  intuition).
- *Symptom / phrases*: "gravity stops at terminal velocity"; draws no arrows.
- *Detection probe (verbatim)*: "A skydiver falls at a steady 55 m/s. Draw the
  forces on her. What is the net force?"
- *Recovery*: her mass and the Earth have not changed, so her weight is still
  there; the air pushes up just as hard — balanced, net zero.
- *Verification*: free-body diagrams at three stages of a fall.

**M2 — Opening the parachute makes the skydiver go up**
- *Why*: acceleration direction taken as motion direction; films from a falling
  camera (type 1, perceptual / type 3).
- *Symptom*: "the chute yanks her upward".
- *Detection probe*: "She opens her parachute. Which way does she move just after,
  and which way does she accelerate?"
- *Recovery*: like braking a car — moving forward, accelerating backward. She moves
  down, slowing.
- *Verification*: four motion/acceleration direction pairs.

**M3 — Terminal velocity scales with size like weight (×8) or linearly (×2)**
- *Why*: one factor is tracked, not the ratio of two (type 5, partial reasoning).
- *Symptom*: doubles radius → v_t × 8 or × 2.
- *Detection probe*: "Double the radius of a steel ball in glycerine. What happens
  to its terminal velocity?"
- *Recovery*: weight ∝ r³, drag ∝ r v: balance needs v ∝ r².
- *Verification*: three scaling items (radius, density difference, viscosity).

## Analogies

- **Best analogy**: walking into a crowd that pushes back harder the faster you
  walk — you end up at the speed where your push matches theirs.
  *Breaking point*: people push back by choice; drag is automatic.
- **Alternative (parachute)**: braking a car — moving forward, slowing down,
  acceleration backward.
  *Breaking point*: brakes can stop a car completely; a parachute only lowers v_t.
- **Anti-analogy to avoid**: "the ball runs out of acceleration." It hides the
  growing drag force.

## Demonstrations

- **Home**: drop a coin and a paper muffin case; then several muffin cases nested
  together (more weight, same shape) — they fall faster.
- **Teacher demo**: steel balls of two sizes in a tall cylinder of glycerine with
  marks and a stopwatch; compare times per 10 cm.
- **Graph**: a skydiver's v–t graph from real jump data.
- **Prediction before demo**: "double the ball's radius — how much faster?"

## Discovery Questions

**Structure**:
1. *Need*: "Why doesn't a raindrop falling 2 km hit you at 200 m/s?"
2. *Discovery*: time a ball in glycerine; its speed stops changing. "Gravity is
   still pulling — what balances it?"
3. *Direct instruction*: Stokes' law and v_t.
4. *Apply*: the skydiver and the parachute.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the ball in glycerine.
2. **Worked examples** (high fit): v_t for the steel ball; ×4 for double radius.
3. **Error exposure** (high fit for M1/M2): the still-present weight; the braking car.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Forces at release, mid-fall, terminal: drag 0 → growing → W − U.
   (b) v_t = 2 × (10⁻³)² × 6540 × 9.8 / (9 × 1.5) ≈ 9.5 × 10⁻³ m/s.
   (c) Skydiver graph: a ≈ g at t = 0; a = 0 at 55 m/s; upward a after the chute
       opens; a = 0 again at about 5 m/s.

2. **ERROR-ANALYSIS** — a student writes "at terminal velocity, weight = 0". Ask
   whether her mass changed.

3. **PREDICTION-BEFORE-DEMO** — before dropping the larger ball, ask for the ratio.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "forces at terminal velocity" → "double radius → v_t?" → "skydiver v–t graph".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "balanced, not absent"; always
asks "which way is she MOVING, and which way is she ACCELERATING?" as two
questions; names all three forces every time.

*Load-bearing sentence to slow down on*: "At terminal velocity the forces have not
disappeared — they balance, so the net force and the acceleration are zero."

*What to listen for*: "no forces" → M1; "she goes up" → M2; "twice as fast" or
"eight times" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "A skydiver falls at a steady 55 m/s. Draw the forces
on her. What is the net force?" Correct: weight down, air resistance up, equal;
net force zero.

**Distractor-mapped items**:
- "At terminal velocity?" Options: no forces act; forces balance, net zero; only
  gravity acts; drag exceeds weight. Answer: forces balance. "No forces" targets M1.
- "Just after the chute opens?" Options: moves up; moves down, slowing; stops
  instantly; moves down, speeding up. Answer: down, slowing. "Moves up" targets M2.

**Guided practice → independent practice fading ladder**:
1. Free-body diagrams at three stages (scaffolded).
2. v_t from Stokes (2 problems).
3. Scaling items (3).
4. v–t graph reading (2 graphs).
5. (Unscaffolded) design a viscosity measurement.

**Mastery gate set** (per assessment/05):
- *Production*: one v_t calculation and one graph.
- *New surface*: a rising bubble.
- *Mixed*: direction-of-motion vs direction-of-acceleration items.
- *Delayed*: one-week check — the parachute.

**Calibration note**: the formula is mechanical; the check that reveals
miscalibration is "net force zero or no forces?" — many who compute v_t correctly
still answer "no forces".

## Tutor Recovery Strategy

*Likeliest utterance*: "if it's not speeding up, nothing is pushing it" (M1).

*Concept-specific smaller question*: "Is the Earth still pulling on the ball? Then
what must the liquid be doing?"

*M2 recovery*: "When you brake on a bicycle, which way are you moving? Which way is
your acceleration?"

## Memory Hooks

- **Concept type**: principle (force balance) + model (Stokes v_t).
- **Review form** (per Delivery 2 §8): free-body diagrams as retrieval; the
  skydiver graph as a spaced prompt.
- **Automaticity target**: "constant velocity ⇔ net force zero" before circular
  motion and momentum.
- **Interleaving partners**: `phys.mech.viscosity`, `phys.mech.newtons-second-law`,
  `phys.mech.buoyancy`.

## Transfer Connections

- *Near*: `phys.mech.viscosity` — the falling-ball viscometer.
- *Near*: `phys.mech.newtons-first-law` — constant velocity with balanced forces.
- *Far*: Millikan's oil-drop experiment (`phys.em` electric charge) used terminal
  velocity to size the drops.
- *Real-world*: raindrops, parachutes, settling of silt in rivers, centrifuges.
- *Expert transfer*: drag regimes and the Reynolds number; sedimentation rates.

## Cross-Subject Connections

- **Biology**: sedimentation of cells and the centrifuge; how plankton and pollen
  stay suspended.
- **Chemistry**: settling of precipitates; particle sizing by sedimentation.
- **Mathematics**: a differential equation dv/dt = g' − kv approaching a limit
  exponentially; limits and asymptotes.
- **Geography**: river sediment transport — fine silt settles slowly, sand quickly.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mech.terminal-velocity.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 10). Terminal velocity had
zero mentions in `phys.mech.viscosity`. The audit's second prerequisite,
`phys.mech.newtons-second-law`, is implied through viscosity's own chain and is
omitted by transitive reduction (KGCS P2).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

# Non-inertial Frames and Pseudo Forces — `phys.mech.non-inertial-frames`

## Identity

- **Concept ID**: `phys.mech.non-inertial-frames`
- **Curriculum location**: physics / classical mechanics (Newton's laws)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mech.relative-motion` — the load-bearing part is that motion is described
    relative to a chosen frame, and that one event looks different from two frames.
  - `phys.mech.circular-motion` — the load-bearing part is the centripetal
    acceleration v²/r and the inward resultant force it requires (Newton's second law
    is in its chain).
- **Unlocks** (from KG): none listed. Leads to rotating frames (Coriolis effect),
  the equivalence principle and general relativity.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Ch. 5; HC Verma Ch. 5

## Learning Objective

After this concept, the learner can:

1. Distinguish inertial from non-inertial frames.
2. Add the pseudo force −ma in an accelerating frame and solve problems from it.
3. Compute apparent weight in an accelerating lift and the tilt of a hanging mass.
4. Explain centrifugal force as a rotating-frame pseudo force, absent from the
   ground-frame free-body diagram.

## Core Understanding

Newton's laws hold as they stand only in inertial frames — frames that are not accelerating. When a bus brakes, a standing passenger lurches forward although nothing pushed them: seen from the roadside, the bus slowed and the passenger simply kept moving, as Newton's first law says. Seen from inside the bus, the passenger accelerated forward with no force acting, which breaks the first law — because the bus is a non-inertial frame. We can still use Newton's laws inside an accelerating frame if we give every body of mass m an extra pseudo force −ma, where a is the frame's acceleration. A pseudo force has no physical agent and no Newton's-third-law partner; it is the bookkeeping that the frame's acceleration requires. In a bus braking at 3 m/s², a 50 kg passenger "feels" 150 N forward.

Bathroom scales read the normal force, not gravity. In a lift accelerating upward at 2 m/s², a 60 kg person's scales read N = m(g + a) = 60 × 11.8 = 708 N; accelerating downward at 2 m/s² they read 468 N; moving at steady speed either way they read 588 N, the same as at rest; in free fall they read zero, though gravity still acts — which is why astronauts in an orbiting station, falling around the Earth with it, feel weightless. A pendulum hanging in a car accelerating at 3 m/s² tilts backward by tan⁻¹(a/g) ≈ 17°: from the road, the tilted string supplies the forward force; from the car, the backward pseudo force balances.

A rotating frame is accelerating too. In a car taking a 50 m bend at 15 m/s, a 60 kg passenger feels pushed outward with m v²/r = 270 N. That outward push is the centrifugal pseudo force of the car's frame. From the road there is no outward force at all: the passenger tends to keep going straight, and the seat or door pushes them inward — the centripetal force that bends their path. A ball whirled on a string, released, flies off along the tangent, not outward along the radius, which only makes sense if no outward force was acting.

## Mental Models

- **Beginner (arriving)**: a "force" throws you forward or outward; scales show your
  weight.
- **Intermediate**: inertial vs non-inertial frames; pseudo force −ma; apparent
  weight m(g ± a); centrifugal force only in the rotating frame.
- **Advanced**: Coriolis force −2m ω × v in rotating frames; weather systems and
  Foucault's pendulum; Earth's rotation reduces effective g at the equator.
- **Expert**: equivalence of gravity and acceleration (Einstein's lift) leading to
  general relativity.
- **Versioning note**: install the intermediate model; mention the Coriolis effect
  as the next rotating-frame term.

## Why Students Fail

The felt push is vivid and the absence of a force is not, so learners draw the felt
force as real in every frame. "Weight" is identified with the scale reading. And
frames are rarely named, so forces from two frames end up in one diagram.

## Misconceptions

**M1 — A real outward centrifugal force acts on a body moving in a circle**
- *Why*: the felt push taken as a force in every frame (type 2).
- *Symptom / phrases*: "the centrifugal force throws you outward".
- *Detection probe (verbatim)*: "A car goes round a bend at steady speed. Seen from
  the road, which horizontal force acts on a passenger?"
- *Recovery*: the released ball flies off along the tangent; name the agent.
- *Verification*: draw ground-frame and car-frame diagrams for two scenarios.

**M2 — Bathroom scales always show your weight mg**
- *Why*: reading identified with gravity (type 4).
- *Symptom*: the same reading in an accelerating lift.
- *Detection probe*: "A 60 kg person stands on scales in a lift accelerating upward
  at 2 m/s². What do the scales read?"
- *Recovery*: the free-falling lift reads zero; scales measure N.
- *Verification*: four lift readings (up, down, steady, free fall).

**M3 — A pseudo force has a reaction partner like any other force**
- *Why*: Newton's third law applied mechanically (type 5).
- *Symptom*: names "the passenger pushes the bus backward" as its reaction.
- *Detection probe*: "What exerts the pseudo force on a passenger in a braking bus?"
- *Recovery*: no object — it comes from the frame's acceleration.
- *Verification*: classify forces as real or pseudo in three situations.

## Analogies

- **Best analogy**: a coffee cup on a dashboard sliding forward when you brake — from
  the road it simply carries on; from inside it seems pushed.
  *Breaking point*: friction complicates the cup; use a frictionless puck for the
  clean case.
- **Alternative**: a ball released from a spinning roundabout rolls off along a
  straight line seen from above, but curves away seen by a rider.
  *Breaking point*: the curved rider's view also includes the Coriolis effect.
- **Anti-analogy to avoid**: "centrifugal force pulls things outward like a magnet."
  It installs M1.

## Demonstrations

- **Home**: stand on bathroom scales in a lift; watch the reading as it starts and
  stops. Hang a key on a thread in a car (as a passenger) while it accelerates.
- **Teacher demo**: a bucket of water swung in a vertical circle; a ball rolling off
  a rotating turntable filmed from above.
- **Prediction before demo**: "when the lift starts up, will the reading rise or
  fall?"

## Discovery Questions

**Structure**:
1. *Need*: "What pushes you forward when a bus brakes?"
2. *Discovery*: the same event drawn from the road and from the bus.
3. *Direct instruction*: inertial frames, pseudo force −ma, apparent weight,
   centrifugal force.
4. *Apply*: lifts, accelerating cars, bends, orbiting astronauts.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the braking bus.
2. **Worked examples** (high fit): lift 708/468/588/0 N; pendulum 17°; bend 270 N.
3. **Error exposure** (high fit for M1/M2): the released ball; the falling lift.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Lift up at 2 m/s²: N = 60 × (9.8 + 2) = 708 N; down: 468 N.
   (b) Car at 3 m/s²: tan θ = 3/9.8, θ ≈ 17° backward.
   (c) Bend r = 50 m, v = 15 m/s: m v²/r = 270 N outward in the car's frame; inward
       270 N from the seat in the road's frame.

2. **ERROR-ANALYSIS** — a student draws a centrifugal force from the ground. Ask what
   object exerts it.

3. **PREDICTION-BEFORE-DEMO** — before the lift moves, ask what the scales will do.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "what is a pseudo force?" → "lift accelerating down at 1.8 m/s²" → "centrifugal
   force from the road?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor names the frame before drawing any force;
says "pseudo" every time; reminds that scales read the push of the floor.

*Load-bearing sentence to slow down on*: "From the road, nothing pushes you outward —
you keep going straight and the car turns under you."

*What to listen for*: "the centrifugal force throws it" (ground frame) → M1; "the
scales still say 588" → M2; "its reaction is…" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Car on a bend. From the road, which horizontal force
acts on the passenger?" Correct: an inward force from the seat or door.

**Distractor-mapped items**:
- "60 kg, lift accelerating up at 2 m/s²: reading?" Options: 708 N, 588 N, 468 N,
  120 N. Answer: 708 N. "588 N" targets M2.
- "From the road, horizontal force on the passenger?" Options: inward from the
  seat/door; outward centrifugal; none at all; forward. Answer: inward. "Outward"
  targets M1.

**Guided practice → independent practice fading ladder**:
1. Frame classification (3 items).
2. Pseudo force size and direction (3 items).
3. Lift readings (4 items).
4. Rotating-frame scenarios (2 items).
5. (Unscaffolded) build an accelerometer from a hanging mass.

**Mastery gate set** (per assessment/05):
- *Production*: one lift and one tilt calculation.
- *New surface*: astronauts in orbit.
- *Mixed*: ground-frame and car-frame diagrams interleaved.
- *Delayed*: one-week check — centrifugal force from the road.

**Calibration note**: learners can compute m(g + a); the check that reveals
miscalibration is the ground-frame centrifugal question.

## Tutor Recovery Strategy

*Likeliest utterance*: "the centrifugal force pushes you out" (M1).

*Concept-specific smaller question*: "When the string breaks, which way does the ball
go — outward or along the tangent?"

*M2 recovery*: "If the lift were falling freely, would your feet press on the scales?"

## Memory Hooks

- **Concept type**: principle (frame dependence) + procedure (pseudo-force method).
- **Review form** (per Delivery 2 §8): the lift readings as spaced retrieval; frame
  diagrams as distributed practice.
- **Automaticity target**: "name the frame first; pseudo force −ma only in the
  accelerating frame".
- **Interleaving partners**: `phys.mech.relative-motion`, `phys.mech.circular-motion`,
  `phys.mech.free-body-diagram`.

## Transfer Connections

- *Near*: `phys.mech.circular-motion` — the inward force seen from outside.
- *Near*: `phys.mech.variation-of-g` — weightlessness in orbit.
- *Far*: Coriolis effect in weather and ocean currents.
- *Real-world*: lifts, spin dryers, centrifuges, banked roads, theme-park rides.
- *Expert transfer*: the equivalence principle.

## Cross-Subject Connections

- **Geography**: Coriolis effect, cyclone rotation.
- **Biology**: centrifuges separating blood components.
- **Engineering**: accelerometers in phones and cars.
- **Mathematics**: vectors and changes of reference frame.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mech.non-inertial-frames.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 7). The audit listed
`phys.mech.relative-motion` and `phys.mech.newtons-second-law`; this node teaches the
centrifugal pseudo force, which needs the centripetal acceleration v²/r, so it requires
`phys.mech.circular-motion` (which itself requires `phys.mech.newtons-second-law`, now
reached transitively — KGCS P1/P2). It is placed after `phys.mech.inclined-plane` so it
follows the Newton's-law applications in lesson order. Pseudo forces were previously
named only as a gateway.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

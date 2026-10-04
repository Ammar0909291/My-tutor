# Variation of g and Weightlessness — `phys.mech.variation-of-g`

## Identity

- **Concept ID**: `phys.mech.variation-of-g`
- **Curriculum location**: physics / mechanics (gravitation)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mech.gravitational-field` — the load-bearing part is g = GM/r², the
    field strength at distance r from a body's centre. Height variation is that
    formula evaluated at r = R + h; depth variation is what changes when only part
    of the mass lies inside r.
- **Unlocks** (from KG): none listed. Orbits, satellites and escape velocity use
  g's 1/r² fall-off; the free-fall view of weightlessness underpins the
  equivalence principle in relativity.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Ch. 7 (Gravitation)

## Learning Objective

After this concept, the learner can:

1. Compute g at a height h: g_h = g (R/(R + h))², and use g(1 − 2h/R) for h ≪ R.
2. Explain and compute g at a depth d inside a uniform Earth: g_d = g(1 − d/R),
     zero at the centre.
3. Explain apparent weightlessness in orbit as free fall, not absence of gravity.
4. Compute apparent weight in an accelerating lift: N = m(g + a), a upward positive.

## Core Understanding

The 9.8 m/s² we use is g at the Earth's surface, not a universal constant. Gravity's field strength is g = GM/r², where r is the distance from the Earth's centre, so it falls off with height: g_h = g (R/(R + h))². For small heights the approximation g_h ≈ g(1 − 2h/R) shows the size of the effect — at 32 km up, g is only 1 % less. The space station orbits about 400 km up, where g = 9.8 × (6371/6771)² ≈ 8.7 m/s², nearly 90 % of the surface value. g also varies slightly over the surface: the Earth's spin and its bulge make g about 9.78 m/s² at the equator and 9.83 m/s² at the poles.

Going down is different. Inside a uniform Earth, the shell of rock above you pulls equally in all directions and cancels out; only the ball of mass below your radius r pulls. That mass shrinks as r³ while the 1/r² factor grows, so g ∝ r: g_d = g(1 − d/R), falling steadily to zero at the centre. g is therefore largest at the surface — it falls going up and falls going down. (The real Earth is denser near its core, so in its upper layers g actually changes little with depth; the uniform model is the textbook idealisation.)

Astronauts in orbit float although gravity at their height is almost 90 % of yours. They are not outside gravity — gravity is exactly what keeps bending the station's path round the Earth. The station is in free fall, and so is everything inside it; falling together, nothing presses on anything. A scale reads the normal force N, not gravity: in a lift accelerating upward N = m(g + a), accelerating downward N = m(g − a), and in free fall a = g, so N = 0. That is weightlessness: apparent weight zero, gravity still acting.

## Mental Models

- **Beginner (arriving)**: g = 9.8 everywhere; space has no gravity; deeper means
  closer to the centre, so stronger.
- **Intermediate**: g = GM/r² outside, so it falls with height; inside a uniform
  Earth only the mass below pulls, so g ∝ r; weightlessness is free fall.
- **Advanced**: the shell theorem (a uniform shell exerts no net force inside
  it); effective g including rotation, g_eff = g − ω²R cos²λ; apparent weight as
  the normal force in a non-inertial frame.
- **Expert**: the real Earth's density profile (PREM) makes g nearly constant, even
  slightly rising, through the mantle before falling in the core; the
  equivalence of free fall and the absence of gravity locally is Einstein's
  equivalence principle.
- **Versioning note**: install the intermediate model; flag the uniform-density
  assumption explicitly whenever depth is discussed.

## Why Students Fail

Floating astronauts are almost always explained by "no gravity in space", and
television images reinforce it. The depth result contradicts the inverse-square
intuition ("closer is stronger"), which learners apply with the whole Earth's
mass even when they are inside it. And apparent weight is confused with weight,
so lift problems feel paradoxical.

## Misconceptions

**M1 — There is no gravity in orbit**
- *Why*: images of floating astronauts; "zero-g" in popular language (type 2,
  everyday language).
- *Symptom / phrases*: "they float because there's no gravity up there".
- *Detection probe (verbatim)*: "The space station orbits about 400 km up. Roughly
  how strong is gravity there compared with the surface, and why do astronauts
  float?"
- *Recovery*: compute g at 400 km (8.7 m/s²); ask what would happen to the station
  with no gravity (a straight line away). Floating is free fall together.
- *Verification*: three items — orbit, a falling lift, deep space far from bodies.

**M2 — g increases with depth**
- *Why*: inverse-square intuition applied with the whole mass (type 4,
  overgeneralisation).
- *Symptom*: "g is greatest at the centre".
- *Detection probe*: "Going down a deep mine, does g increase, decrease or stay the
  same?"
- *Recovery*: at the centre the pulls cancel; only the mass below you pulls.
- *Verification*: g at three depths for a uniform Earth; a sketch of g against r.

**M3 — A scale measures weight (gravity) directly**
- *Why*: everyday scales are only used standing still (type 1, perceptual).
- *Symptom*: says the reading in an accelerating lift is still mg; or that it
  changes in a lift moving at constant speed.
- *Detection probe*: "A lift moving DOWN at constant speed — scale reading for
  60 kg?"
- *Recovery*: the scale reads the normal force; N = m(g + a). Constant speed means
  a = 0, so N = mg.
- *Verification*: four lift cases (up/down, accelerating/constant).

## Analogies

- **Best analogy**: a cannonball fired so fast that the ground curves away as fast
  as it falls (Newton's cannon) — it falls forever without landing. Everything
  inside a falling capsule floats.
  *Breaking point*: real orbits start from rockets, not cannons; keep it to the idea.
- **Alternative (depth)**: standing inside a hollow ball of evenly spread people
  all pulling on you — they cancel. Only the ones in a smaller ball below you count.
  *Breaking point*: gravity, unlike people, is always attractive and automatic.
- **Anti-analogy to avoid**: "space is too far away for gravity to reach." It
  installs M1.

## Demonstrations

- **Home**: a plastic bottle with holes near the bottom, full of water — water
  spurts out; drop the bottle and the spurts stop during the fall.
- **Teacher demo**: a mass on a spring balance in a moving lift (or bounced up and
  down by hand) — the reading rises and falls with acceleration.
- **Calculation demo**: g at r = R, 1.06R, 2R, 60R (the Moon's distance).
- **Prediction before demo**: "lift cable snaps — what does the scale read?"

## Discovery Questions

**Structure**:
1. *Need*: "The station is only 400 km up — why do astronauts float?"
2. *Discovery*: compute g there; it is 8.7 m/s². "So gravity is there. What else
   could make them float?"
3. *Direct instruction*: apparent weight is the normal force; free fall.
4. *Depth*: "at the centre, which way would you be pulled?"

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Worked examples** (primary): g at 400 km; g at 64 km depth; the lift.
2. **Error exposure** (high fit for M1/M2): the computed 8.7 m/s²; the centre.
3. **Prediction** (high fit for M3): lift cases.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) g at 400 km: 9.8 × (6371/6771)² ≈ 8.7 m/s².
   (b) g at 64 km depth (R = 6400 km): 9.8 × (1 − 0.01) ≈ 9.70 m/s².
   (c) Lift: 60 kg, a = +2 m/s² → N = 60 × 11.8 = 708 N.

2. **ERROR-ANALYSIS** — a student writes "g = 0 at 400 km". Ask what holds the
   station in orbit.

3. **PREDICTION-BEFORE-DEMO** — before the falling bottle, ask whether the water
   keeps spurting.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "g at r = 3R" → "why do astronauts float?" → "lift accelerating down at 1.8 m/s²".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "falling together", never "no
gravity"; always says "for a uniform Earth" with depth results; distinguishes
"weight" (mg) from "what the scale reads" (N).

*Load-bearing sentence to slow down on*: "In orbit, gravity is almost as strong as
here — astronauts float because they and their station are falling together."

*What to listen for*: "no gravity in space" → M1; "stronger at the centre" → M2;
"the scale always shows mg" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "The space station orbits about 400 km up. Roughly
how strong is gravity there, and why do astronauts float?" Correct: about 8.7 m/s²
(~90 %); free fall together.

**Distractor-mapped items**:
- "g at 400 km?" Options: about 0, about 4.9, about 8.7, about 9.8 m/s².
  Answer: about 8.7. Distractor "about 0" targets M1.
- "g at the Earth's centre (uniform Earth)?" Options: 0, 9.8, maximum, infinite.
  Answer: 0. "Maximum" targets M2.

**Guided practice → independent practice fading ladder**:
1. g at r = 2R, 3R, 4R (3 items).
2. g at real heights with the exact and approximate forms (3 items).
3. g at depths (2 items).
4. Lift readings (4 items).
5. (Unscaffolded) explain floating in orbit.

**Mastery gate set** (per assessment/05):
- *Production*: one height, one depth, one lift computation.
- *New surface*: g on the Moon's surface vs at its centre.
- *Mixed*: interleaved height/depth/lift items.
- *Delayed*: one-week check — the snapped cable.

**Calibration note**: the height formula feels easy; the check that reveals
miscalibration is orbit — many who compute 8.7 m/s² still explain floating by
"no gravity" a minute later.

## Tutor Recovery Strategy

*Likeliest utterance*: "but they float — so there must be no gravity" (M1).

*Concept-specific smaller question*: "If gravity switched off, would the station
keep circling the Earth?" (No — straight line.) "So gravity is acting. What are
the station and astronaut both doing?"

*M2 recovery*: "At the very centre, the Earth is all around you. Which way would it
pull?"

## Memory Hooks

- **Concept type**: principle (g = GM/r², shell theorem) + application (orbit, lifts).
- **Review form** (per Delivery 2 §8): the g-against-r sketch as a retrieval prompt;
  lift cases as distributed practice.
- **Automaticity target**: "weightless = free fall" before orbital motion.
- **Interleaving partners**: `phys.mech.gravitational-field`,
  `phys.mech.mass-and-weight`, `phys.mech.circular-motion`.

## Transfer Connections

- *Near*: `phys.mech.mass-and-weight` — weight W = mg with a g that now varies.
- *Near*: orbital motion — the station's free fall is circular motion with gravity
  as the centripetal force.
- *Far*: tides — the difference in g across the Earth's diameter.
- *Real-world*: gravimetry for finding ore and oil; satellite orbits; lift design.
- *Expert transfer*: the equivalence principle; tidal forces near black holes.

## Cross-Subject Connections

- **Geography / Earth science**: gravity surveys map density variations in the
  crust; g varies with latitude and altitude.
- **Biology**: muscle and bone loss in prolonged free fall on the station.
- **Mathematics**: the binomial approximation (1 + x)⁻² ≈ 1 − 2x; piecewise
  functions (g ∝ r inside, ∝ 1/r² outside).
- **Engineering**: lift and roller-coaster design around apparent weight.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mech.variation-of-g.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 8). Variation of g and
weightlessness were mentioned once in the gravitation nodes and never taught.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

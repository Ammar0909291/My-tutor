# Density and Relative Density — `phys.meas.density`

## Identity

- **Concept ID**: `phys.meas.density`
- **Curriculum location**: physics / measurement & units
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.units` — the load-bearing part is that mass and volume are two
    different measured quantities with their own units (kg, m³; g, cm³). Density
    is a ratio of the two; a learner who cannot treat volume as a measured
    quantity has nothing to divide by.
- **Unlocks** (from KG): `phys.mech.pressure-fluids` — pressure in a liquid,
  P = rho g h, is written in terms of the liquid's density, and buoyancy follows
  from it. Density is also used throughout thermal physics (specific heat per
  unit mass), waves (wave speed on a string, sound speed in a medium) and
  astrophysics (stellar density).
- **Difficulty**: foundational · **Bloom**: apply · **Mastery threshold**: 0.70 ·
  **Est. hours**: 2 · **References**: NCERT Science Class 8 & 9; Halliday Resnick Ch. 14

## Learning Objective

After this concept, the learner can:

1. Compute density from mass and volume, rho = m/V, with units, and rearrange it
     to find a mass (m = rho V) or a volume (V = m/rho).
2. Explain that density is a property of the material: any piece of the same pure
     material, of any size, has the same density.
3. Use relative density (rho_substance / rho_water, no unit) to predict whether a
     solid sinks or floats in water.
4. Convert between g/cm³ and kg/m³ (1 g/cm³ = 1000 kg/m³).

## Core Understanding

Density answers one question: how much mass is packed into each unit of volume? A 10 cm³ cube of wood has a mass of about 6 g; a 10 cm³ cube of aluminium has a mass of 27 g. Same size, different mass — so aluminium packs 2.7 g into every cubic centimetre and wood only 0.6 g. That is the whole definition: rho = m/V, in g/cm³ or kg/m³.

Density belongs to the material, not to the object. Cut a block of aluminium in half: the mass halves and the volume halves, so the ratio is unchanged. A huge aluminium beam and a tiny aluminium spoon have the same density. This is why density is used to identify materials, and why "heavy" and "dense" are different ideas: a heavy log can be much less dense than a light iron nail.

Density decides floating. An object floats in a liquid when its density is less than the liquid's, and sinks when its density is greater. Relative density compares a substance with water: rho_substance / rho_water. Because it is a ratio of two densities it has no unit, and it gives the answer at once — relative density below 1 floats in water, above 1 sinks. Water's density is 1 g/cm³ = 1000 kg/m³, so one cubic metre of water has a mass of one tonne. For a hollow object such as a steel ship, what counts is its average density — the total mass divided by the total volume enclosed, air included.

## Mental Models

- **Beginner (arriving)**: "dense" means "heavy". A bigger or heavier object is
  denser. Floating is about being light. The learner has no way to compare two
  objects of different sizes.
- **Intermediate**: density is mass per unit volume — the mass of one cubic
  centimetre of the stuff. It is found by division, and it is the same for any
  piece of the same material. Things less dense than water float.
- **Advanced**: density is an intensive property (independent of amount), unlike
  mass and volume, which are extensive. Relative density gives a unit-free
  comparison. A composite or hollow object behaves according to its average
  density, which is why a steel ship floats and a submarine can change depth by
  taking in water.
- **Expert**: density appears inside other laws as the per-volume version of
  mass — pressure P = rho g h, buoyant force rho_fluid V g, momentum density in
  fluids, mass density in the continuity equation. Density depends weakly on
  temperature and pressure (water is densest near 4 °C), which drives convection.
- **Versioning note**: install the intermediate model (mass per cm³, a property of
  the material). Name the floating rule and relative density. Signal the
  pressure connection: "the rho in P = rho g h is this density."

## Why Students Fail

The dominant failure is treating density as heaviness. Everyday language says
"iron is heavier than wood", which is true only per unit volume; learners carry
it over as "the heavier object is denser" and then cannot explain a floating log
or a sinking nail. The second failure is treating density like mass — something
that grows with the amount of material — so a half block is "half as dense". The
third is unit trouble: mixing g/cm³ and kg/m³ gives answers wrong by a factor of
1000.

## Misconceptions

**M1 — A heavier object is a denser object**
- *Why*: everyday language ("iron is heavy") compresses "heavy for its size" to
  "heavy" (type 2, everyday language).
- *Symptom / phrases*: "1 kg of wood and 1 kg of iron are equally dense"; "the
  log is heavier, so it is denser than the pebble".
- *Detection probe (verbatim)*: "A 1 kg block of wood and a 1 kg block of iron.
  Which is denser, and how can you tell without weighing them?"
- *Recovery*: the log and the nail — the 2 kg log floats, the 5 g nail sinks.
  If heavier meant denser, the log would sink. Then compute: the log's mass is
  spread through a large volume, the nail's packed into a tiny one.
- *Verification*: three pairs where the heavier object is the less dense one;
  the learner ranks them by m/V.

**M2 — Cutting an object changes its density**
- *Why*: mass and volume both change with amount, and the learner assumes their
  ratio does too (type 4, overgeneralisation).
- *Symptom*: "half the block has half the density"; "a big piece of copper is
  denser than a small one".
- *Detection probe*: "A 540 g, 200 cm³ block is cut in half. What is the density
  of one half?"
- *Recovery*: compute both halves: 270 g / 100 cm³ = 2.7 g/cm³ — the same as the
  whole block. Both numbers halved, so their ratio did not change.
- *Verification*: two items with a cut, broken or stretched sample of the same
  material, plus one where a different material is substituted.

**M3 — Big objects float, small objects sink**
- *Why*: everyday sightings — ships and logs float, coins and stones sink — are
  generalised by size (type 1, perceptual).
- *Symptom*: "a ship floats because it is big"; "a tiny piece of wood would sink".
- *Detection probe*: "A wood shaving and a whole tree trunk — which floats?"
- *Recovery*: floating depends on density, not size: any piece of wood, however
  small, floats because wood is less dense than water. A ship floats because its
  average density (steel plus the air inside the hull) is less than water's.
- *Verification*: predict sink/float for objects of very different sizes made of
  the same material.

**M4 — Relative density has units, or g/cm³ and kg/m³ are the same number**
- *Why*: units are copied from the formula without being tracked (type 5,
  instructional omission).
- *Symptom*: writes "relative density = 2.7 g/cm³"; writes water as 1 kg/m³.
- *Detection probe*: "Water is 1 g/cm³. What is it in kg/m³?"
- *Recovery*: 1 g/cm³ = 10⁻³ kg / 10⁻⁶ m³ = 1000 kg/m³ — one cubic metre of water
  is one tonne. Relative density is a density divided by a density, so the units
  cancel.
- *Verification*: two conversions in each direction and one relative-density
  calculation stated without a unit.

## Analogies

- **Best analogy**: a crowded room. Two rooms the same size: one has 60 people,
  the other 270. The second room is more crowded — more people per square metre.
  Density is "crowdedness" for mass. Halve the room and send half the people
  away: it is exactly as crowded as before.
  *Breaking point*: people move around; the mass in a solid does not. Don't
  extend it to "density changes when things move about" for solids.
- **Alternative**: a box of feathers and a box of books of the same size. The
  books pack more mass into the same space.
  *Breaking point*: a box has empty space inside; it really illustrates average
  density, which is useful for the ship but not for a pure solid.
- **Anti-analogy to avoid**: "density is how heavy something is." This directly
  installs M1.

## Demonstrations

- **Home, no equipment**: drop a large carrot chunk and a small coin into water,
  then a small cut of the same carrot. The large and small carrot pieces behave
  the same — size did not decide it.
- **Teacher demo**: two equal cubes (wood and aluminium) on a balance. Same size,
  very different mass. Then cut a block in half and weigh and measure each half.
- **Displacement method**: find the volume of an irregular stone from the rise of
  water in a measuring cylinder, weigh it, and compute rho = m/V.
- **Prediction before demo**: "an ice cube in water — sink or float?" then
  "ice is 0.92 g/cm³; how much of the cube is under water?" (about 92%).

## Discovery Questions

Guided discovery fits well here — the definition can be generated from the
same-size-blocks observation.

**Structure**:
1. *Need*: "Two blocks the same size, very different masses. How do we describe
   the difference in one number?"
2. *Discovery*: "What is the mass of ONE cubic centimetre of each?" → divide.
3. *Generalise*: "Cut a block in half. Does that number change?" → no; it belongs
   to the material.
4. *Apply*: "Water is 1 g/cm³. Which of these blocks float?"

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): same-size blocks of different materials.
2. **Worked examples** (high fit): rho = m/V, m = rho V, V = m/rho — one each.
3. **Error exposure** (high fit for M1/M2): the floating log vs the sinking nail;
   the cut block.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Density: 540 g in 200 cm³ → rho = 540/200 = 2.7 g/cm³ (aluminium).
   (b) Mass: gold ring 0.5 cm³, rho = 19.3 g/cm³ → m = 19.3 × 0.5 = 9.65 g.
   (c) Volume: 500 g of a material with relative density 2.5 → rho = 2.5 g/cm³,
       V = 500/2.5 = 200 cm³.

2. **ERROR-ANALYSIS** — a student writes "the 2 kg log is denser than the 5 g nail
   because it weighs more". Ask the learner to find the error using the fact that
   the log floats and the nail sinks.

3. **PREDICTION-BEFORE-DEMO** — before cutting the block, ask what the density of
   one half will be. Many predict half; the computation shows it is unchanged.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "Density of 54 g in 20 cm³ — float or sink?" → "2.7 g/cm³ in kg/m³" →
   "Why does a steel ship float?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "mass in each cubic centimetre"
alongside every "density" until the learner uses the phrase; always asks
"per what?"; never says "density is how heavy something is".

*Load-bearing sentence to slow down on*: "Density is not how much mass an object
has — it is how much mass is packed into each cubic centimetre of it."

*What to listen for*: "heavier so denser" → M1; "half the density" → M2; "it
floats because it's big" → M3; a unit attached to relative density → M4.

## Assessment Signals

**Diagnostic — golden probe**: "A 1 kg block of wood and a 1 kg block of iron.
Which is denser, and how can you tell without weighing them?" Correct: iron —
the iron block is far smaller for the same mass, so more mass per cm³.

**Distractor-mapped items**:
- "A 540 g, 200 cm³ block is cut in half. Density of one half?" Options:
  1.35 g/cm³, 2.7 g/cm³, 5.4 g/cm³, 270 g/cm³. Answer: 2.7 g/cm³. Distractor
  1.35 targets M2.
- "Water: 1 g/cm³ in kg/m³?" Options: 1, 100, 1000, 0.001. Answer: 1000.
  Distractor 1 targets M4.

**Guided practice → independent practice fading ladder**:
1. rho = m/V with whole numbers (3 problems).
2. m = rho V and V = m/rho (3 problems).
3. Sink/float from density or relative density (4 items).
4. Unit conversion g/cm³ ↔ kg/m³ (3 items).
5. (Unscaffolded) the displacement method for an irregular object.

**Mastery gate set** (per assessment/05):
- *Production*: 4 calculations (two of rho, one of m, one of V).
- *New surface*: identify an unknown metal from its mass and displaced volume.
- *Mixed*: sink/float predictions interleaved with calculations.
- *Delayed*: one-week check — the steel ship.

**Calibration note**: the formula is easy, so learners feel done after the first
calculation. The check that reveals miscalibration is the heavy-but-less-dense
pair: if the learner still ranks by total mass, the concept is not installed.

## Tutor Recovery Strategy

*Likeliest utterance*: "isn't the heavier one denser?" (M1); "I don't know which
number to divide by which" (formula without meaning).

*Concept-specific smaller question*: "Forget the formula. How many grams are in
ONE cubic centimetre of this block?" Once the learner says "540 grams spread over
200 cubes", they divide without prompting.

*M2 recovery*: "Tell me the mass of each half. Now the volume of each half. Now
the grams in one cubic centimetre of a half." The learner computes the unchanged
value themselves.

## Memory Hooks

- **Concept type**: concept (density as an intensive property) + procedure
  (rho = m/V and its rearrangements).
- **Review form** (per Delivery 2 §8): concept → contrast pairs (heavy vs dense);
  procedure → distributed practice inside pressure and buoyancy problems.
- **Automaticity target**: water = 1 g/cm³ = 1000 kg/m³ should be instant before
  `phys.mech.pressure-fluids`.
- **Interleaving partners**: `phys.meas.unit-conversion` (g/cm³ ↔ kg/m³),
  `phys.mech.pressure-fluids`, `phys.mech.buoyancy`.

## Transfer Connections

- *Near*: `phys.mech.pressure-fluids` — P = rho g h.
- *Near*: `phys.mech.buoyancy` — the buoyant force is the weight of displaced
  fluid, rho_fluid V g.
- *Far*: convection in `phys.therm.heat-transfer` — warm fluid is less dense and
  rises.
- *Real-world*: checking purity of gold by density; why oil floats on water; hot
  air balloons; ships and submarines.
- *Expert transfer*: mass density in the continuity equation and in stellar
  structure.

## Cross-Subject Connections

- **Chemistry**: density identifies substances; molar volume and molar mass give
  density of gases; concentration (g/L) is a mass-per-volume ratio of the same
  shape.
- **Biology**: fish swim bladders adjust average density; bone density; density
  gradient centrifugation separates cell parts.
- **Mathematics**: density is a ratio and a rate — the same "per unit" reasoning
  as speed (distance per time) and unit price.
- **Geography / Earth science**: denser oceanic crust sinks beneath continental
  crust; cold salty water sinks and drives ocean circulation.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.meas.density.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 1). Before this node,
`phys.mech.pressure-fluids` and `phys.mech.buoyancy` used rho without any node
teaching it; `phys.mech.pressure-fluids` now requires this concept.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

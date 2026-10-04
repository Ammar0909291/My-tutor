# Equivalence Principle and Curved Spacetime — `phys.rel.general-relativity-intro`

## Identity

- **Concept ID**: `phys.rel.general-relativity-intro`
- **Curriculum location**: physics / relativity (general relativity)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.rel.spacetime` — the load-bearing part is spacetime as a single geometry with
    worldlines, from special relativity.
  - `phys.mech.universal-gravitation` — the load-bearing part is Newtonian gravity,
    F = GMm/r², and that all masses fall with the same acceleration.
  - `phys.mech.non-inertial-frames` — the load-bearing part is apparent weight and pseudo
    forces in an accelerating lift, which the equivalence principle equates with gravity.
- **Unlocks** (from KG): none listed. Leads to black holes, gravitational waves and
  cosmology in their relativistic form.
- **Difficulty**: expert · **Bloom**: understand · **Mastery threshold**: 0.75 ·
  **Est. hours**: 3 · **References**: Halliday Resnick Ch. 37; Hartle, Gravity Ch. 1–2

## Learning Objective

After this concept, the learner can:

1. State the equivalence principle and why no local experiment distinguishes gravity
   from acceleration.
2. Derive qualitatively that gravity bends light and slows clocks lower down.
3. Compute gravitational time-dilation sizes (gh/c², GPS) and Schwarzschild radii.
4. Describe gravity as the curvature of spacetime.

## Core Understanding

Imagine waking in a closed, windowless room and feeling your normal weight. You could be at rest on Earth — or in a rocket in deep space accelerating at 9.8 m/s². Drop two balls of different mass: on Earth they fall together because all objects fall at the same rate; in the rocket the floor rushes up to meet both at once. Weigh yourself: the floor pushes with the same force in both. Every mechanical experiment gives the same result. Einstein raised this to a principle covering all of physics — the equivalence principle: in a small enough laboratory, uniform gravity and acceleration are indistinguishable. Equally, a freely falling laboratory is locally indistinguishable from one floating in empty space, which is why astronauts in orbit feel weightless.

The principle predicts new effects. Shine a beam of light straight across an accelerating lift: while the light crosses, the lift moves up, so the beam strikes the far wall slightly lower — inside, its path curves. By equivalence, gravity must bend light too, although light has no mass. General relativity gives the size: starlight grazing the Sun is deflected by 1.75 arcseconds, as Eddington's 1919 eclipse expedition confirmed. Similarly, light sent up an accelerating lift arrives redshifted; by equivalence, light climbing out of gravity loses energy, which means clocks lower in a gravitational field run slow compared with clocks higher up. Near Earth's surface the fractional difference is gh/c²: about 2.5 × 10⁻¹⁵ over the 22.5 m tower used by Pound and Rebka in 1959. GPS satellites, 20 000 km up, feel weaker gravity and their clocks gain about 45.7 μs per day; their orbital speed (special relativity) costs about 7.2 μs per day; the net +38.5 μs per day must be corrected, or positions would drift by about 11 km every day.

General relativity explains these results with a new picture of gravity. Mass and energy curve spacetime, and freely moving objects — planets, apples, light — follow the straightest possible paths through that curved spacetime. As John Wheeler put it, "matter tells spacetime how to curve; spacetime tells matter how to move". The Moon orbits Earth not because a force tugs it but because that orbit is its straightest path in the spacetime Earth curves. If a mass is squeezed inside its Schwarzschild radius, r_s = 2GM/c² — 2.95 km for the Sun's mass, 8.9 mm for Earth's — spacetime curves so much that not even light can escape: a black hole.

## Mental Models

- **Beginner (arriving)**: gravity is a force between masses; light ignores it; time is
  the same everywhere.
- **Intermediate**: equivalence principle; light bending and gravitational time
  dilation as consequences; GPS corrections; gravity as curved spacetime; r_s.
- **Advanced**: geodesics; the metric; tidal forces as the true signature of
  curvature; perihelion precession of Mercury.
- **Expert**: Einstein's field equations; gravitational waves; cosmological solutions.
- **Versioning note**: install the intermediate model; mention tidal effects as why
  equivalence is only local.

## Why Students Fail

Gravity is learned firmly as a force, so "curved spacetime" sounds like metaphor.
Light's masslessness seems to forbid any gravitational effect. And time is assumed to
be universal, so clock rates depending on height seem absurd.

## Misconceptions

**M1 — Some experiment inside a closed lab could tell gravity from acceleration**
- *Why*: hidden-difference intuition (type 5).
- *Symptom / phrases*: "I'd drop something and see".
- *Detection probe (verbatim)*: "You wake up in a windowless room and feel your normal
  weight. Could you be in a rocket accelerating at 9.8 m/s² in deep space instead of on
  Earth?"
- *Recovery*: run every proposed experiment in both lifts.
- *Verification*: explain why equivalence is local only.

**M2 — Light cannot be bent by gravity because it has no mass**
- *Why*: Newtonian F = GMm/r² with m = 0 (type 5).
- *Symptom*: "gravity only pulls on mass".
- *Detection probe*: "Can gravity bend a beam of light, given that light has no mass?"
- *Recovery*: the beam crossing an accelerating lift; Eddington 1919; Einstein rings.
- *Verification*: explain lensing in terms of curved spacetime.

**M3 — Time passes at the same rate everywhere**
- *Why*: Newtonian absolute time (type 2).
- *Symptom*: "clocks are clocks".
- *Detection probe*: "Do clocks on a mountaintop and at sea level tick at exactly the
  same rate?"
- *Recovery*: Pound–Rebka; GPS corrections; atomic clocks raised by 33 cm.
- *Verification*: compute gh/c² for two heights.

## Analogies

- **Best analogy**: a heavy ball on a stretched rubber sheet — smaller balls roll along
  curved paths around it.
  *Breaking point*: the sheet uses gravity to explain gravity, and curves only space,
  not time; use it only to picture "paths follow curvature".
- **Alternative**: two people walking due north from the equator on straight paths, yet
  meeting at the pole — straight lines on a curved surface converge.
  *Breaking point*: Earth's surface is 2-D space; spacetime curvature includes time.
- **Anti-analogy to avoid**: "gravity is a pull carried by invisible strings." It hides
  the geometric picture.

## Demonstrations

- **Home**: drop a cup of water with holes in it — while falling, water stops leaking
  (free fall cancels apparent gravity).
- **Teacher demo**: a stretched Lycra sheet with masses; videos of Einstein rings and the
  1919 eclipse plates.
- **Prediction before demo**: "while the cup falls, will water still come out of the
  holes?"

## Discovery Questions

**Structure**:
1. *Need*: "Why do all objects fall at the same rate?"
2. *Discovery*: Einstein's lift; the light beam crossing it.
3. *Direct instruction*: equivalence principle, light bending, gh/c², curved spacetime.
4. *Apply*: GPS, lensing, black holes.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the windowless lift.
2. **Worked examples** (high fit): 2.5 × 10⁻¹⁵; +45.7 − 7.2 = +38.5 μs/day; r_s = 2.95 km.
3. **Error exposure** (high fit for M1/M2): every experiment failing; the bending beam.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) gh/c² = 9.81 × 22.5 / (3.0 × 10⁸)² ≈ 2.5 × 10⁻¹⁵.
   (b) GPS: +45.7 μs (GR) − 7.2 μs (SR) = +38.5 μs per day; × c ≈ 11.5 km per day.
   (c) r_s(Sun) = 2 × 6.67 × 10⁻¹¹ × 2.0 × 10³⁰ / (3.0 × 10⁸)² ≈ 2.95 km.

2. **ERROR-ANALYSIS** — a student proposes an experiment to tell the lifts apart. Run it
   in both.

3. **PREDICTION-BEFORE-DEMO** — before dropping the leaky cup, ask what the water does.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "state the equivalence principle" → "gh/c² for a 100 m tower" → "why light bends".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor derives each effect from the lift before
naming curved spacetime; uses "locally" with the principle; gives GPS as everyday
evidence.

*Load-bearing sentence to slow down on*: "If gravity and acceleration can't be told
apart, then anything acceleration does to light and clocks, gravity must do too."

*What to listen for*: "I'd drop a ball to check" → M1; "light has no mass" → M2; "time
is the same everywhere" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Windowless room, normal weight — could you be in an
accelerating rocket?" Correct: yes; no local experiment can tell.

**Distractor-mapped items**:
- "GPS net clock drift?" Options: ≈ +38 μs/day; ≈ −7 μs/day; ≈ +46 μs/day; none.
  Answer: ≈ +38 μs/day.
- "Can gravity bend light?" Options: yes — light follows curved spacetime; no — light
  has no mass; only through glass. Answer: yes. "No" targets M2.

**Guided practice → independent practice fading ladder**:
1. Equivalence scenarios (3 items).
2. Light bending and redshift reasoning (2 items).
3. gh/c² and GPS calculations (3 items).
4. Schwarzschild radii (2 items).
5. (Unscaffolded) design a test of gravitational time dilation.

**Mastery gate set** (per assessment/05):
- *Production*: one gh/c² and one r_s calculation.
- *New surface*: gravitational lensing.
- *Mixed*: equivalence items interleaved with calculations.
- *Delayed*: one-week check — why light bends.

**Calibration note**: learners can say "spacetime is curved"; the check that reveals
miscalibration is "could an experiment inside the lift tell?"

## Tutor Recovery Strategy

*Likeliest utterance*: "drop two balls and you'd know" (M1).

*Concept-specific smaller question*: "In the rocket, why do two dropped balls hit the
floor together?"

*M2 recovery*: "Inside an accelerating lift, does a light beam's path look straight?"

## Memory Hooks

- **Concept type**: principle (equivalence) + model (curved spacetime).
- **Review form** (per Delivery 2 §8): the lift arguments as spaced retrieval;
  calculations as distributed practice.
- **Automaticity target**: "gravity ≡ acceleration locally → light bends, low clocks run
  slow; mass curves spacetime; r_s = 2GM/c²".
- **Interleaving partners**: `phys.mech.non-inertial-frames`, `phys.rel.spacetime`,
  `phys.astro.black-holes`.

## Transfer Connections

- *Near*: `phys.astro.black-holes` — extreme curvature.
- *Near*: `phys.astro.gravitational-waves` — ripples in spacetime.
- *Far*: cosmology and the expanding universe.
- *Real-world*: GPS, satellite clocks, gravitational lensing surveys.
- *Expert transfer*: LIGO detections; tests of GR with pulsars.

## Cross-Subject Connections

- **Mathematics**: geometry of curved surfaces; geodesics.
- **Technology**: satellite navigation timing.
- **Astronomy**: lensing maps of dark matter.
- **History of science**: Einstein 1915; Eddington 1919; Pound–Rebka 1959.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.rel.general-relativity-intro.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 47). The audit listed
`phys.rel.spacetime` and `phys.mech.universal-gravitation`; `phys.mech.non-inertial-frames`
is added because the equivalence principle equates gravity with an accelerating frame, and
that node is in neither chain (KGCS P1). General relativity had zero hits in the corpus
before this node; `phys.astro.black-holes` is left unchanged (it could later require this
node — an owner decision).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).

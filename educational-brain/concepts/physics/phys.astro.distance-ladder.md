# Parallax, Standard Candles and Hubble's Law — `phys.astro.distance-ladder`

## Identity

- **Concept ID**: `phys.astro.distance-ladder`
- **Curriculum location**: physics / astrophysics (distances)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.astro.stellar-properties` — the load-bearing part is apparent brightness
    b = L/(4πd²) and the magnitude scale (absolute magnitude at 10 pc).
  - `phys.wave.doppler-effect` — the load-bearing part is that a receding source's
    waves are stretched to longer wavelength, by an amount set by its speed.
- **Unlocks** (from KG): none listed. Leads to cosmology (`phys.astro.cosmology`) and
  the age and expansion of the universe.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: IB Physics Option D; Halliday Resnick Ch. 44

## Learning Objective

After this concept, the learner can:

1. Use parallax, d (pc) = 1/p (″), for nearby stars.
2. Use standard candles (Cepheids, type Ia supernovae) with the inverse-square law or
   the distance modulus.
3. Use redshift and Hubble's law, v = H₀d, for distant galaxies.
4. Explain why the methods form a ladder and why expansion has no centre.

## Core Understanding

No single method measures every astronomical distance, so astronomers build a ladder. The first rung is parallax. As Earth moves around the Sun, a nearby star appears to shift against much more distant stars, just as your thumb jumps when you blink one eye and then the other. The parallax angle p is half of that yearly shift. A star whose parallax is exactly 1 arcsecond is defined to be 1 parsec away (3.086 × 10¹⁶ m, or 3.26 light-years), and in general d (pc) = 1/p (″). Proxima Centauri, the nearest star, has p = 0.768″, so it is 1.30 pc (4.2 light-years) away. A smaller parallax means a farther star; beyond a few thousand parsecs the angle is too small to measure even from space.

The next rung uses standard candles — objects whose luminosity is known. Cepheid variable stars pulsate with a period that reveals their luminosity; type Ia supernovae all reach nearly the same peak luminosity. Comparing known luminosity with measured brightness gives distance by the inverse-square law, b = L/(4πd²), or in magnitudes by the distance modulus m − M = 5 log₁₀(d / 10 pc). A Cepheid with absolute magnitude −4 seen at apparent magnitude 21 is at d = 10^((21 + 4 + 5)/5) pc = 10⁶ pc = 1 Mpc. The standard candles are calibrated on nearby examples whose distances come from parallax — each rung rests on the one below.

For the most distant galaxies, Hubble's law takes over. Their spectral lines are redshifted: z = Δλ/λ ≈ v/c for speeds well below light's. Hubble found that recession speed grows in proportion to distance, v = H₀d, with H₀ ≈ 70 km/s per megaparsec. A galaxy whose hydrogen line (656.3 nm in the laboratory) arrives at 669.4 nm has z ≈ 0.020, so v ≈ 6000 km/s and d ≈ 6000/70 ≈ 86 Mpc. This does not put us at a centre: in a uniform expansion, like dots on an inflating balloon, every galaxy sees all the others receding with speed proportional to distance. Running the expansion backwards, 1/H₀ ≈ 14 billion years estimates the age of the universe.

## Mental Models

- **Beginner (arriving)**: distances "measured somehow"; bigger angle, farther; we are
  at the centre of the expansion.
- **Intermediate**: d = 1/p; standard candles and inverse square; z ≈ v/c; v = H₀d;
  each rung calibrates the next; expansion has no centre.
- **Advanced**: cosmological redshift as stretching of space (1 + z = a_now/a_then);
  the Hubble tension between measurement methods.
- **Expert**: the full distance ladder with its systematic errors; baryon acoustic
  oscillations as a standard ruler.
- **Versioning note**: install the intermediate model; mention that redshift is really
  space stretching, not ordinary motion, at the advanced step.

## Why Students Fail

A larger angle is intuitively "more distance". The logarithm in the distance modulus
hides the inverse-square idea. And "everything is moving away from us" sounds like we
are at the centre.

## Misconceptions

**M1 — A larger parallax means a farther star**
- *Why*: angle treated as proportional to distance (type 5).
- *Symptom / phrases*: "0.5 arcseconds is farther than 0.1".
- *Detection probe (verbatim)*: "Star A has a parallax of 0.5″ and star B of 0.1″.
  Which is farther away, and by how much?"
- *Recovery*: the thumb test; d = 1/p.
- *Verification*: three parallax distances.

**M2 — Galaxies receding from us shows we are at the centre of the universe**
- *Why*: explosion picture of the Big Bang (type 2).
- *Symptom*: "everything flies away from us".
- *Detection probe*: "Almost every galaxy is moving away from us. Does that mean we
  are at the centre of the universe?"
- *Recovery*: the inflating balloon with dots.
- *Verification*: show that v ∝ d holds from any dot.

**M3 — Standard candles measure distance without any calibration**
- *Why*: the ladder structure not seen (type 5).
- *Symptom*: "Cepheids just tell you the distance".
- *Detection probe*: "How do we know how luminous a Cepheid is?"
- *Recovery*: nearby Cepheids with parallax distances fix the period–luminosity law.
- *Verification*: order the rungs and say what each calibrates.

## Analogies

- **Best analogy**: the thumb blink — nearer things shift more against the background.
  *Breaking point*: our eyes are 6 cm apart; Earth's orbit is 300 million km across.
- **Alternative**: an inflating balloon with dots for galaxies.
  *Breaking point*: the balloon has a centre in 3-D space; the universe's surface
  analogy has none.
- **Anti-analogy to avoid**: "the Big Bang was an explosion from a point we're near."
  It installs M2.

## Demonstrations

- **Home**: the thumb blink; measure a thumb's shift at two distances.
- **Teacher demo**: parallax of a pole across a playground from two ends of a
  baseline; a balloon with marked dots inflated while measuring separations.
- **Prediction before demo**: "will the near pole or the far one shift more?"

## Discovery Questions

**Structure**:
1. *Need*: "How do we know a galaxy is 86 million parsecs away?"
2. *Discovery*: parallax by eye; brightness and distance.
3. *Direct instruction*: d = 1/p, standard candles, Hubble's law.
4. *Apply*: age of the universe.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the thumb trick.
2. **Worked examples** (high fit): Proxima 1.30 pc; Cepheid 1 Mpc; galaxy 86 Mpc.
3. **Error exposure** (high fit for M1/M2): the thumb test; the balloon.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) p = 0.768″ → d = 1.30 pc = 4.2 ly.
   (b) m − M = 25 → d = 10^(30/5) pc = 10⁶ pc.
   (c) z = (669.4 − 656.3)/656.3 ≈ 0.020 → v ≈ 6000 km/s → d ≈ 86 Mpc.

2. **ERROR-ANALYSIS** — a student says 0.5″ is farther. Do the thumb test.

3. **PREDICTION-BEFORE-DEMO** — before the playground parallax, ask which pole shifts
   more.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "d for p = 0.25″" → "what is a standard candle?" → "z = 0.01: v and d".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "smaller angle, farther star";
names the rung being used; insists "no centre" whenever expansion comes up.

*Load-bearing sentence to slow down on*: "Each rung of the ladder is calibrated by the
one below it."

*What to listen for*: "bigger angle, farther" → M1; "we're at the centre" → M2;
"Cepheids just know" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "0.5″ vs 0.1″: which is farther?" Correct: 0.1″ —
10 pc against 2 pc.

**Distractor-mapped items**:
- "Farther star?" Options: 0.1″ (10 pc); 0.5″ (5 pc); 0.5″ (2 pc); equal. Answer:
  0.1″. Larger-angle answers target M1.
- "Does recession put us at the centre?" Options: no — every galaxy sees the same;
  yes; only for nearby galaxies. Answer: no. "Yes" targets M2.

**Guided practice → independent practice fading ladder**:
1. Parallax distances (3 items).
2. Inverse-square / distance-modulus distances (3 items).
3. Redshift and Hubble's law (3 items).
4. Ladder reasoning (2 items).
5. (Unscaffolded) plan a distance measurement for a given object.

**Mastery gate set** (per assessment/05):
- *Production*: one parallax and one Hubble-law calculation.
- *New surface*: age of the universe from H₀.
- *Mixed*: rung selection interleaved with calculations.
- *Delayed*: one-week check — parallax and distance.

**Calibration note**: learners can apply d = 1/p; the check that reveals
miscalibration is the "are we at the centre?" question.

## Tutor Recovery Strategy

*Likeliest utterance*: "the bigger angle is the farther star" (M1).

*Concept-specific smaller question*: "Thumb near your face or at arm's length — which
jumps more?"

*M2 recovery*: "On a balloon with dots, which dot is the centre of the expansion?"

## Memory Hooks

- **Concept type**: method (measurement ladder) + law (Hubble).
- **Review form** (per Delivery 2 §8): the three rungs as spaced retrieval;
  calculations as distributed practice.
- **Automaticity target**: "d = 1/p; b = L/4πd²; v = H₀d".
- **Interleaving partners**: `phys.astro.stellar-properties`,
  `phys.wave.doppler-effect`, `phys.astro.cosmology`.

## Transfer Connections

- *Near*: `phys.astro.cosmology` — expansion and the age of the universe.
- *Near*: `phys.wave.doppler-effect` — redshift.
- *Far*: surveying by triangulation.
- *Real-world*: the Gaia mission's parallax catalogue; the Hubble constant debate.
- *Expert transfer*: gravitational-wave "standard sirens".

## Cross-Subject Connections

- **Mathematics**: small angles, logarithms, inverse proportion.
- **Geography**: triangulation in surveying.
- **History of science**: Henrietta Leavitt's period–luminosity law; Hubble's
  discovery.
- **Philosophy**: the Copernican principle — we are not at a special place.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.astro.distance-ladder.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 46). The audit listed
`phys.astro.stellar-properties`; `phys.wave.doppler-effect` is added because redshift
and Hubble's law need it (KGCS P1). Parallax had zero hits in the corpus before this
node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).

# Blackbody Radiation: Stefan–Boltzmann and Wien — `phys.therm.blackbody-radiation`

## Identity

- **Concept ID**: `phys.therm.blackbody-radiation`
- **Curriculum location**: physics / thermal physics
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.therm.heat-transfer` — the load-bearing part is radiation as the mode of
    heat transfer that needs no medium, and the qualitative fact that hotter
    bodies radiate more. This concept makes the dependence on temperature exact
    and adds the spectrum.
- **Unlocks** (from KG): none listed. Blackbody spectra are the starting point of
  `phys.mod.photoelectric-effect`-era quantum physics (Planck), stellar
  temperatures in `phys.astro`, and the radiative limit of
  `phys.therm.newtons-law-of-cooling`.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Ch. 11 (Thermal Properties of Matter)

## Learning Objective

After this concept, the learner can:

1. Define a blackbody as a perfect absorber and therefore the best emitter, with a
     spectrum fixed by its temperature.
2. Apply Wien's law λ_max T ≈ 2.9 × 10⁻³ m·K with T in kelvin.
3. Apply the Stefan–Boltzmann law P = εσAT⁴ and the net form εσA(T⁴ − T_s⁴).
4. Explain why kelvin must be used and why doubling T gives 16 times the power.

## Core Understanding

Heat an iron bar in a furnace and its glow changes from dull red near 900 K to orange near 1300 K to yellow-white near 1800 K. The colour of the brightest part of the glow tells the temperature. The cleanest case is a blackbody: a body that absorbs every wavelength falling on it. Good absorbers are good emitters, so a perfect absorber is also the best possible emitter, and its spectrum depends on nothing but its temperature. "Black" describes absorption, not appearance: a small hole in a closed box looks pitch black when cold, because light that enters never gets out, but heat the box and the hole glows more brightly than any other surface at that temperature. The Sun and a glowing coal are good approximations to blackbodies.

Two laws describe the spectrum. Wien's displacement law: the wavelength of peak emission is inversely proportional to the absolute temperature, λ_max T = b ≈ 2.9 × 10⁻³ m·K. The Sun's spectrum peaks near 500 nm, so its surface is about 5800 K; a human body at 310 K peaks near 9.4 μm, in the infrared — which is what a thermal camera sees. The Stefan–Boltzmann law: the total power radiated is P = εσAT⁴, with σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴ and emissivity ε = 1 for a blackbody. Because everything also absorbs from its surroundings, the net loss is εσA(T⁴ − T_s⁴): skin at 310 K in a 293 K room loses about 106 W per square metre.

Both laws need the kelvin temperature, because radiation depends on absolute temperature — a body at 0 K would emit nothing. And the fourth power is steep. Double the kelvin temperature and the radiated power rises 2⁴ = 16 times while the peak wavelength halves. Warming from 27 °C to 54 °C is not "doubling": it is 300 K to 327 K, a power increase of only about 41 %.

## Mental Models

- **Beginner (arriving)**: hot things give off "heat rays"; black things are just
  dark; hotter means a bit more radiation.
- **Intermediate**: a blackbody's spectrum is set by T; the peak moves to shorter
  wavelengths as T rises (Wien), and total power grows as T⁴ (Stefan–Boltzmann);
  use kelvin.
- **Advanced**: emissivity and Kirchhoff's law (absorptivity = emissivity at each
  wavelength); net exchange; stellar luminosity L = 4πR²σT⁴ links size and
  temperature.
- **Expert**: Planck's law, from quantised oscillators, gives the whole curve and
  derives both Wien's law and σ — the failure of classical physics here (the
  ultraviolet catastrophe) is where quantum theory began.
- **Versioning note**: install the intermediate model; signal Planck as the reason
  the curves have their shape, without the formula.

## Why Students Fail

Learners use Celsius out of habit, which wrecks every T⁴ calculation, and they
assume a linear dependence ("twice as hot, twice the power"). They take
"blackbody" literally and reject the Sun as an example. And they think only very
hot things radiate, missing that their own bodies glow in the infrared.

## Misconceptions

**M1 — Radiated power is proportional to temperature (or Celsius can be used)**
- *Why*: linear relations dominate school physics; Celsius is the everyday scale
  (type 4, overgeneralisation).
- *Symptom / phrases*: "twice the temperature, twice the power"; 100 °C in T⁴.
- *Detection probe (verbatim)*: "A star's surface temperature doubles. By what
  factor does the power it radiates per square metre change?"
- *Recovery*: 2⁴ = 16; and 27 °C → 54 °C is not a doubling (300 → 327 K).
- *Verification*: three ratio problems with mixed Celsius/kelvin data.

**M2 — A blackbody must look black**
- *Why*: the name is read literally (type 2, everyday language).
- *Symptom*: "the Sun can't be a blackbody — it's bright".
- *Detection probe*: "Is the Sun closer to a blackbody or to a mirror?"
- *Recovery*: the hole in a heated box — black when cold, brightest glow when hot.
- *Verification*: classify four bodies by absorption, not appearance.

**M3 — Only very hot objects radiate**
- *Why*: radiation is noticed only when it is visible (type 1, perceptual).
- *Symptom*: "a person doesn't give off radiation".
- *Detection probe*: "Does your body radiate? At what wavelength does it peak?"
- *Recovery*: Wien at 310 K gives about 9.4 μm, infrared — thermal cameras image it.
- *Verification*: peak wavelength for three everyday temperatures.

## Analogies

- **Best analogy**: a cavity like a dark cave entrance — light goes in and bounces
  around until it is absorbed, so the entrance looks black. Heat the cave and the
  entrance glows with the cave's temperature.
  *Breaking point*: real caves are not in thermal equilibrium; use for the
  absorption idea only.
- **Alternative (T⁴)**: compound growth — a small rise in T is magnified four times
  in percentage terms (1 % hotter → about 4 % more power).
  *Breaking point*: only valid for small changes; use exact ratios otherwise.
- **Anti-analogy to avoid**: "a blackbody is just a black-painted object." It
  installs M2 and loses the definition.

## Demonstrations

- **Home**: a dimmer on an incandescent bulb (or a toaster element) — as it
  brightens, its colour shifts from red to yellow-white.
- **Teacher demo**: Leslie's cube — matt black and shiny faces at the same
  temperature; the black face radiates far more.
- **Thermal camera**: a phone thermal attachment showing people and a cup of tea.
- **Prediction before demo**: "red or blue — which star is hotter?"

## Discovery Questions

**Structure**:
1. *Need*: "How do astronomers know a star's temperature without going there?"
2. *Discovery*: compare blackbody curves at three temperatures — what happens to
   the peak position and the area under the curve?
3. *Direct instruction*: Wien's and Stefan–Boltzmann's laws, kelvin.
4. *Apply*: the Sun, a filament, the human body.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the heated iron bar.
2. **Worked examples** (high fit): Sun's temperature from 500 nm; ×16 for doubled T;
   net loss from skin.
3. **Error exposure** (high fit for M1/M2): 27 °C → 54 °C; the glowing hole.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Wien: T = 2.9 × 10⁻³ / 500 × 10⁻⁹ ≈ 5800 K.
   (b) Stefan: 1000 K → 2000 K, power × 16.
   (c) Net: σ(310⁴ − 293⁴) ≈ 106 W per m².

2. **ERROR-ANALYSIS** — a student writes "27 °C to 327 °C is 12 times hotter, so
   12⁴ ≈ 20,000 times the power". Ask for the kelvin values.

3. **PREDICTION-BEFORE-DEMO** — before the dimmer, ask which way the colour shifts.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "Wien and the Sun" → "kelvin doubles — power?" → "why kelvin?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor converts to kelvin aloud every time;
says "absorbs everything" whenever "blackbody" is said; says "two to the fourth"
rather than "four times more".

*Load-bearing sentence to slow down on*: "Double the kelvin temperature and the
power goes up sixteen times — the fourth power is steep."

*What to listen for*: "twice the power" or Celsius → M1; "it isn't black" → M2;
"people don't radiate" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "A star's surface temperature doubles. By what factor
does the power it radiates per square metre change?" Correct: 16.

**Distractor-mapped items**:
- "Kelvin temperature doubles — power?" Options: ×2, ×4, ×16, ×8. Answer: ×16. "×2"
  targets M1.
- "The Sun — blackbody?" Options: no, it isn't black; yes, near-perfect absorber
  and emitter; no, it reflects light; only at night. Answer: yes. "It isn't black"
  targets M2.

**Guided practice → independent practice fading ladder**:
1. Kelvin conversions inside ratio problems (3 items).
2. Wien estimates (3 items).
3. Stefan ratios and absolute powers (3 items).
4. Net exchange (2 items).
5. (Unscaffolded) a stellar temperature and luminosity comparison.

**Mastery gate set** (per assessment/05):
- *Production*: one Wien and one Stefan calculation.
- *New surface*: a thermal-camera or furnace-colour question.
- *Mixed*: ratio items with Celsius data interleaved.
- *Delayed*: one-week check — red vs blue star.

**Calibration note**: learners memorise σT⁴ quickly; the check that reveals
miscalibration is any item with Celsius data.

## Tutor Recovery Strategy

*Likeliest utterance*: "it got twice as hot, so twice the power" (M1).

*Concept-specific smaller question*: "Convert both temperatures to kelvin first.
What is their ratio? Now raise it to the fourth power."

*M2 recovery*: "If the hole in the box looks black when cold, what does 'black'
tell you about light falling on it?"

## Memory Hooks

- **Concept type**: laws (Wien, Stefan–Boltzmann) + model (ideal emitter).
- **Review form** (per Delivery 2 §8): ratio problems as distributed practice;
  "kelvin, then fourth power" as a spaced prompt.
- **Automaticity target**: P ∝ T⁴ and λ_max ∝ 1/T in kelvin before stellar physics
  and quantum origins.
- **Interleaving partners**: `phys.therm.heat-transfer`,
  `phys.therm.newtons-law-of-cooling`, `phys.em.electromagnetic-waves`.

## Transfer Connections

- *Near*: `phys.therm.newtons-law-of-cooling` — radiation explains where that law
  fails.
- *Near*: stellar colour and temperature in astrophysics.
- *Far*: the start of quantum physics (Planck's quanta) in modern physics.
- *Real-world*: thermal imaging, infrared thermometers, pyrometers for furnaces,
  the greenhouse effect (Earth radiates in the infrared).
- *Expert transfer*: the cosmic microwave background — a 2.7 K blackbody.

## Cross-Subject Connections

- **Geography / Climate**: the Earth absorbs visible sunlight and re-radiates
  infrared; greenhouse gases absorb that infrared.
- **Chemistry**: flame and emission colours are line spectra — contrast with the
  continuous blackbody spectrum.
- **Biology**: pit vipers sense infrared from warm-blooded prey.
- **Mathematics**: power laws and percentage change (a 1 % rise in T gives about
  4 % more power).

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.therm.blackbody-radiation.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 12). Wien's law and the term
"blackbody" had zero hits in the physics corpus before this node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

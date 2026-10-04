# Stellar Luminosity, Colour and the HR Diagram — `phys.astro.stellar-properties`

## Identity

- **Concept ID**: `phys.astro.stellar-properties`
- **Curriculum location**: physics / astrophysics (stars)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.therm.blackbody-radiation` — the load-bearing part is the Stefan–Boltzmann
    law (power per area σT⁴) and Wien's law (λ_max T = constant).
- **Unlocks** (from KG): `phys.astro.distance-ladder`.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: Halliday Resnick Ch. 44; IB Physics Option D (Astrophysics)

## Learning Objective

After this concept, the learner can:

1. Distinguish luminosity from apparent brightness, b = L/(4πd²).
2. Apply L = 4πR²σT⁴ to compare stars and infer radii.
3. Read surface temperature from colour with Wien's law.
4. Use the magnitude scale and read the HR diagram.

## Core Understanding

A star's luminosity L is the total power it radiates; its apparent brightness b is the power per square metre that reaches us, b = L/(4πd²). Because stars lie at very different distances, a star that looks bright may simply be near: Sirius looks brightest in our sky largely because it is only 2.6 parsecs away. Stars radiate roughly as blackbodies, so the Stefan–Boltzmann law gives L = 4πR²σT⁴. The Sun, with R = 6.96 × 10⁸ m and T = 5772 K, has L ≈ 3.8 × 10²⁶ W. A star the Sun's size but twice as hot is 16 times as luminous; a star of 3500 K that is 100 times as luminous as the Sun must have a radius about 10 × (5772/3500)² ≈ 27 times the Sun's — a red giant.

A star's colour reveals its surface temperature through Wien's law, λ_max = 2.898 × 10⁻³ m·K / T. Betelgeuse (about 3500 K) peaks near 830 nm, in the near infrared, and looks orange-red; the Sun peaks near 500 nm; Rigel (about 12 000 K) peaks near 240 nm in the ultraviolet and looks blue-white. Red stars are the coolest and blue stars the hottest — the reverse of the red-hot/blue-cold labels on taps, but the same as a heated poker going from red to white.

Astronomers measure brightness in magnitudes, a scale that runs backwards: smaller numbers are brighter, and a difference of 5 magnitudes is exactly a factor of 100 in brightness (each magnitude about 2.512 times). Absolute magnitude is the apparent magnitude a star would have at 10 parsecs, so it measures luminosity. The Hertzsprung–Russell (HR) diagram plots luminosity (or absolute magnitude) upward against surface temperature, which by tradition increases to the LEFT. About 90% of stars lie on the main sequence, a band from hot, luminous blue stars at top left to cool, faint red dwarfs at bottom right. Stars at the top right are cool yet very luminous, so by L = 4πR²σT⁴ they must be enormous — giants and supergiants. Stars at the bottom left are hot yet faint, so they must be tiny — white dwarfs, about the size of Earth.

## Mental Models

- **Beginner (arriving)**: brighter-looking = more powerful; red = hot.
- **Intermediate**: L vs b; L = 4πR²σT⁴; colour ↔ temperature (Wien); magnitudes;
  HR regions and what they imply about size.
- **Advanced**: spectral classes OBAFGKM; mass–luminosity relation on the main
  sequence (L ∝ M^3.5); bolometric corrections.
- **Expert**: stellar atmospheres and spectral line widths; evolutionary tracks across
  the HR diagram.
- **Versioning note**: install the intermediate model; mention OBAFGKM as the
  temperature labels on the HR diagram's axis.

## Why Students Fail

Brightness in the sky is the only thing we see, so it is mistaken for power. Everyday
colour codes put red at hot. The magnitude scale is inverted and logarithmic. And the
HR diagram's temperature axis runs backwards.

## Misconceptions

**M1 — A star that looks brighter must emit more light**
- *Why*: apparent brightness taken as intrinsic (type 4).
- *Symptom / phrases*: "the brightest star is the most powerful".
- *Detection probe (verbatim)*: "Two stars look equally bright in the sky. Must they
  give out the same amount of light?"
- *Recovery*: headlights far away vs a torch in hand; b = L/(4πd²).
- *Verification*: two inverse-square comparisons.

**M2 — Red stars are the hottest**
- *Why*: red-hot/blue-cold conventions (type 4).
- *Symptom*: ranks Betelgeuse hotter than Rigel.
- *Detection probe*: "Betelgeuse is red; Rigel is blue-white. Which has the hotter
  surface?"
- *Recovery*: the heated poker; Wien's law.
- *Verification*: order five star colours by temperature.

**M3 — A bigger magnitude means a brighter star**
- *Why*: numbers usually grow with quantity (type 5).
- *Symptom*: magnitude 6 called brighter than magnitude 1.
- *Detection probe*: "Magnitude 1 or magnitude 6 — which is brighter, and by how
  much?"
- *Recovery*: the scale runs backwards; 5 magnitudes = ×100.
- *Verification*: three magnitude comparisons.

## Analogies

- **Best analogy**: car headlights at night — a distant pair can look as faint as a
  nearby torch.
  *Breaking point*: headlights are beamed; stars radiate in all directions.
- **Alternative**: a heated poker going red → orange → white as it gets hotter.
  *Breaking point*: pokers are not perfect blackbodies; illustrative only.
- **Anti-analogy to avoid**: "red tap hot, blue tap cold" applied to stars. It installs
  M2.

## Demonstrations

- **Home**: a dimmer switch on an incandescent bulb — orange when dim (cooler), white
  when bright (hotter).
- **Teacher demo**: a spectrometer pointed at bulbs of different temperatures;
  plotting the brightest 20 stars on an HR diagram from catalogue data.
- **Prediction before demo**: "will the dimmed bulb look redder or bluer?"

## Discovery Questions

**Structure**:
1. *Need*: "How can we tell a star's size from Earth?"
2. *Discovery*: colour and brightness of Orion's stars.
3. *Direct instruction*: b = L/(4πd²), L = 4πR²σT⁴, Wien, magnitudes, HR diagram.
4. *Apply*: giants and white dwarfs.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): Betelgeuse and Rigel.
2. **Worked examples** (high fit): L☉ ≈ 3.8 × 10²⁶ W; 16 L☉; 27 R☉.
3. **Error exposure** (high fit for M1/M2): the headlights; the poker.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) L☉ = 4π(6.96 × 10⁸)² × 5.67 × 10⁻⁸ × 5772⁴ ≈ 3.8 × 10²⁶ W.
   (b) λ_max: 3500 K → 828 nm; 5772 K → 502 nm; 12 000 K → 242 nm.
   (c) R/R☉ = √(L/L☉) × (T☉/T)² = 10 × (5772/3500)² ≈ 27.

2. **ERROR-ANALYSIS** — a student says the reddest star is hottest. Show the poker.

3. **PREDICTION-BEFORE-DEMO** — before dimming the bulb, ask redder or bluer.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "L vs b" → "peak wavelength of a 6000 K star" → "HR regions".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor separates "how much it gives out" from
"how bright it looks"; says "red is cool for stars"; reminds that the HR temperature
axis runs right to left.

*Load-bearing sentence to slow down on*: "A cool star can still be very luminous —
if it is enormous."

*What to listen for*: "looks brightest so emits most" → M1; "red is hottest" → M2;
"magnitude 6 is brighter" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Betelgeuse (red) or Rigel (blue-white): which is
hotter?" Correct: Rigel.

**Distractor-mapped items**:
- "Hotter surface?" Options: Rigel; Betelgeuse; equal; can't tell from colour.
  Answer: Rigel. "Betelgeuse" targets M2.
- "Equally bright stars — same luminosity?" Options: not necessarily — distances may
  differ; yes, always; only if the same colour. Answer: the first. "Yes, always"
  targets M1.

**Guided practice → independent practice fading ladder**:
1. L vs b and inverse square (3 items).
2. Stefan–Boltzmann comparisons (3 items).
3. Wien's law (2 items).
4. Magnitudes and HR regions (3 items).
5. (Unscaffolded) infer the size of a star from its HR position.

**Mastery gate set** (per assessment/05):
- *Production*: one L or R calculation and one Wien calculation.
- *New surface*: white dwarfs.
- *Mixed*: magnitude items interleaved with L/b items.
- *Delayed*: one-week check — red vs blue temperature.

**Calibration note**: learners can apply Wien's law; the check that reveals
miscalibration is ranking a red and a blue star without numbers.

## Tutor Recovery Strategy

*Likeliest utterance*: "the brightest star must be the biggest" (M1).

*Concept-specific smaller question*: "Could a powerful star look faint? How?"

*M2 recovery*: "As you heat a poker, what colour comes first?"

## Memory Hooks

- **Concept type**: law (Stefan–Boltzmann, Wien) + representation (HR diagram).
- **Review form** (per Delivery 2 §8): L/b and colour rules as spaced retrieval; HR
  placements as distributed practice.
- **Automaticity target**: "L = 4πR²σT⁴; red = cool; small magnitude = bright".
- **Interleaving partners**: `phys.therm.blackbody-radiation`,
  `phys.astro.stellar-evolution`, `phys.astro.distance-ladder`.

## Transfer Connections

- *Near*: `phys.astro.distance-ladder` — standard candles use known luminosity.
- *Near*: `phys.astro.stellar-evolution` — stars move across the HR diagram.
- *Far*: exoplanet habitable zones from stellar luminosity.
- *Real-world*: star charts, colour temperature of lights, thermal cameras.
- *Expert transfer*: stellar population synthesis.

## Cross-Subject Connections

- **Chemistry**: spectral lines identify stellar composition.
- **Mathematics**: logarithmic scales (magnitudes); power laws.
- **Technology**: LED colour temperature ratings (K).
- **History of science**: Hertzsprung and Russell's diagram.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.astro.stellar-properties.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 45). The HR diagram had one
mention in the corpus before this node. No existing node's prerequisites were changed
(`phys.astro.stellar-evolution` could later require this node; left to the owner).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).

# Thin-film Interference — `phys.opt.thin-film-interference`

## Identity

- **Concept ID**: `phys.opt.thin-film-interference`
- **Curriculum location**: physics / optics (wave optics)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.opt.youngs-experiment` — the load-bearing part is two-beam interference:
    coherent waves reinforce when their path difference is a whole number of
    wavelengths and cancel at half-integers.
  - `phys.opt.refraction` — the load-bearing part is the refractive index n: inside
    the film light travels more slowly and its wavelength is λ/n, so the optical
    path difference is 2nt, not 2t.
- **Unlocks** (from KG): none listed. Thin films lead to anti-reflection coatings,
  dielectric mirrors and interference filters, and to structural colour in nature.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 10 (Wave Optics); Halliday Resnick Ch. 35

## Learning Objective

After this concept, the learner can:

1. Identify the two interfering reflections from a thin film and their optical path
     difference 2nt.
2. Include the half-wave phase change on reflection from a higher-index medium.
3. Apply the bright and dark conditions for a soap film and for a coated surface.
4. Design an anti-reflection coating, t = λ/(4n).

## Core Understanding

A soap film or an oil slick acts like two mirrors very close together. Light reflects partly from the top surface; the rest enters the film, reflects from the bottom surface and comes back out, travelling extra distance about twice the thickness, 2t. Inside the film light has a shorter wavelength, λ/n, so what matters is the optical path difference 2nt. The two reflections then interfere: some wavelengths are reinforced and others cancelled, and because which ones depends on the thickness, a film of varying thickness shows bands of colour. This is interference, not dispersion — a prism's colours come from refraction depending on wavelength, and would fade, not change, if the prism were made thinner.

There is one more ingredient. When light reflects off a medium of higher refractive index, the reflected wave is flipped — a phase change of half a wavelength — just as a pulse on a rope comes back upside down from a fixed end. Reflection off a lower-index medium causes no flip. For a soap film in air, the top reflection (air → soap) flips and the bottom one (soap → air) does not. So the conditions are: bright when 2nt = (m + ½)λ, dark when 2nt = mλ. As a film drains and becomes much thinner than a wavelength, 2nt → 0 and the two reflections cancel — which is why a soap film turns black at the top just before it bursts. For soap of n = 1.33, the thinnest film that strongly reflects 600 nm light has 2nt = λ/2, so t = 600/(4 × 1.33) ≈ 113 nm.

Lens coatings use the effect to cancel reflection. A layer of magnesium fluoride (n = 1.38) on glass (n = 1.5) gives BOTH reflections a phase flip (air → MgF₂ and MgF₂ → glass are both into higher index), so they cancel when 2nt = λ/2: t = λ/(4n). For 550 nm, the middle of the visible spectrum, t ≈ 100 nm. Green reflection disappears while the red and blue ends are only partly cancelled, which is why coated camera lenses look faintly purple.

## Mental Models

- **Beginner (arriving)**: soap bubbles are colourful because of the soap, or
  because they act like prisms.
- **Intermediate**: two reflections interfere; optical path difference 2nt; count the
  phase flips to choose the condition; coatings use t = λ/(4n).
- **Advanced**: at oblique incidence the path difference is 2nt cos r; multilayer
  stacks build very high reflectivity (dielectric mirrors) or narrow-band filters.
- **Expert**: the full treatment uses Fresnel amplitudes; structural colour in
  butterflies and opals; thin-film thickness measurement in semiconductor fabrication.
- **Versioning note**: install the intermediate model at normal incidence; mention
  cos r as the oblique correction.

## Why Students Fail

The reflection phase change is not part of the two-slit picture, so learners carry
over "zero path difference = bright" and get every thin-film condition upside down.
They forget the refractive index, using 2t. And the colours are attributed to
dispersion because rainbow colours are associated with prisms.

## Misconceptions

**M1 — Reflection never changes the phase of light**
- *Why*: two-slit interference has no reflections (type 5, transfer gap).
- *Symptom / phrases*: "a very thin film should be bright".
- *Detection probe (verbatim)*: "A soap film is drained until it is far thinner than a
  wavelength of light. Does it look bright or dark in reflected light? Why?"
- *Recovery*: the black top of a draining film; the rope pulse inverting at a fixed
  end.
- *Verification*: count phase flips for three film arrangements.

**M2 — Thin-film colours come from dispersion, as in a prism**
- *Why*: rainbow colours associated with prisms (type 4, surface feature).
- *Symptom*: "the film splits the light into colours".
- *Detection probe*: "What produces the colours of a soap film?"
- *Recovery*: colours change with thickness in bands; a thinner prism would just fade.
- *Verification*: classify four colour phenomena as interference or dispersion.

**M3 — The path difference is 2t**
- *Why*: geometry without the wavelength change inside the medium (type 5).
- *Symptom*: coating thickness λ/4 instead of λ/(4n).
- *Detection probe*: "Why must the path difference be 2nt rather than 2t?"
- *Recovery*: inside the film the wavelength is λ/n, so 2t holds 2nt/λ wavelengths.
- *Verification*: two thickness calculations with different n.

## Analogies

- **Best analogy**: two echoes from a thin wall's front and back faces arriving
  slightly out of step — whether they add or cancel depends on the wall's thickness.
  *Breaking point*: sound reflection phase rules differ; use only for the two-echo
  idea.
- **Alternative (phase flip)**: a rope pulse reflecting from a wall comes back upside
  down; from a free end it comes back upright.
  *Breaking point*: ropes are 1-D; light has polarisation, ignored here.
- **Anti-analogy to avoid**: "the bubble is a tiny prism." It installs M2.

## Demonstrations

- **Home**: blow soap bubbles or make a soap film in a wire loop held vertically —
  watch horizontal colour bands move down and the top turn black.
- **Teacher demo**: Newton's rings with a lens on a flat glass plate under sodium
  light; or an oil drop on water.
- **Prediction before demo**: "what colour will the top of the film be just before
  it bursts?"

## Discovery Questions

**Structure**:
1. *Need*: "Why does a colourless soap solution make coloured bubbles?"
2. *Discovery*: watch the bands follow the film's thickness; the black top.
3. *Direct instruction*: 2nt and the phase flip.
4. *Apply*: coatings and oil films.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the draining soap film.
2. **Worked examples** (high fit): t ≈ 113 nm for a soap film; t ≈ 100 nm coating.
3. **Error exposure** (high fit for M1/M2): the black film; the thinner-prism contrast.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Soap film: one flip; bright 2nt = λ/2 → t = 600/(4 × 1.33) ≈ 113 nm.
   (b) Coating: two flips; dark 2nt = λ/2 → t = 550/(4 × 1.38) ≈ 100 nm.
   (c) Oil on water: air→oil flips, oil→water doesn't — one flip.

2. **ERROR-ANALYSIS** — a student predicts the draining film's top is bright. Ask
   what it actually looks like.

3. **PREDICTION-BEFORE-DEMO** — before the film thins, ask what colour the top turns.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "why black at the top?" → "thinnest bright soap film" → "coating thickness".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor counts phase flips aloud before choosing
a condition; says "optical path, 2nt"; contrasts "interference" with "dispersion"
explicitly.

*Load-bearing sentence to slow down on*: "Reflection off a denser surface flips the
wave by half a wavelength — count the flips before you decide which thickness is
bright."

*What to listen for*: "zero thickness, bright" → M1; "like a prism" → M2; 2t
without n → M3.

## Assessment Signals

**Diagnostic — golden probe**: "A soap film is drained until it is far thinner than a
wavelength. Bright or dark in reflected light? Why?" Correct: dark — one reflection is
flipped by half a wavelength and the path difference is nearly zero.

**Distractor-mapped items**:
- "Very thin soap film?" Options: dark, bright, coloured, transparent white. Answer:
  dark. "Bright" targets M1.
- "Cause of soap-film colours?" Options: interference, dispersion, pigment,
  absorption. Answer: interference. "Dispersion" targets M2.

**Guided practice → independent practice fading ladder**:
1. Phase-flip counting (4 arrangements).
2. Bright/dark conditions for soap films (3 items).
3. Coating thicknesses (3 items).
4. Interference vs dispersion classification (3 items).
5. (Unscaffolded) design a coating for a given glass and wavelength.

**Mastery gate set** (per assessment/05):
- *Production*: one soap-film and one coating calculation.
- *New surface*: oil on water.
- *Mixed*: flip-counting items interleaved with calculations.
- *Delayed*: one-week check — "why black at the top?"

**Calibration note**: learners memorise 2nt = mλ; the check that reveals
miscalibration is any arrangement with a different number of phase flips.

## Tutor Recovery Strategy

*Likeliest utterance*: "no path difference means bright" (M1).

*Concept-specific smaller question*: "Which reflection is off a denser material? Does
that one flip? Does the other?"

*M2 recovery*: "If you made a prism thinner and thinner, would its colours change, or
just fade?"

## Memory Hooks

- **Concept type**: principle (two-beam interference with phase flips) + application
  (coatings).
- **Review form** (per Delivery 2 §8): flip counting as spaced retrieval; coating
  design as distributed practice.
- **Automaticity target**: "count the flips, then use 2nt" before diffraction
  gratings and multilayers.
- **Interleaving partners**: `phys.opt.youngs-experiment`, `phys.opt.refraction`,
  `phys.opt.diffraction-grating`.

## Transfer Connections

- *Near*: `phys.opt.youngs-experiment` — the same reinforcement and cancellation.
- *Near*: `phys.opt.diffraction-grating` — many-beam interference.
- *Far*: dielectric mirrors in lasers; interference filters.
- *Real-world*: lens coatings, spectacle coatings, soap bubbles, oil on roads,
  structural colours in butterflies and beetles.
- *Expert transfer*: ellipsometry and thin-film thickness measurement in chip making.

## Cross-Subject Connections

- **Biology**: structural colour — morpho butterflies, peacock feathers, beetle shells.
- **Chemistry**: soap film thinning; surfactant layers a few molecules thick.
- **Technology**: anti-glare and anti-reflection coatings on screens and glasses.
- **Mathematics**: periodic conditions (m + ½)λ; solving for thickness.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.opt.thin-film-interference.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 19). Thin-film interference was
not taught by any node before this one.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

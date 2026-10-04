# Diffraction Grating and Spectra — `phys.opt.diffraction-grating`

## Identity

- **Concept ID**: `phys.opt.diffraction-grating`
- **Curriculum location**: physics / optics (wave optics)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.opt.diffraction` — the load-bearing part is that light spreads from narrow
    openings and that waves from neighbouring openings separated by d reinforce
    when d sinθ is a whole number of wavelengths (from `phys.opt.youngs-experiment`
    in its chain). A grating is the many-slit version.
- **Unlocks** (from KG): none listed. Grating spectroscopy underlies atomic spectra
  (`phys.mod` hydrogen spectrum), astrophysics and X-ray crystallography.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: Halliday Resnick Ch. 36; NCERT Physics Class 12 Ch. 10

## Learning Objective

After this concept, the learner can:

1. Apply d sinθ = mλ with d = 1/N.
2. Find the highest visible order from sinθ ≤ 1.
3. Predict how lines per mm and wavelength change the pattern.
4. Explain sharp grating maxima and the order of colours in a grating spectrum.

## Core Understanding

A diffraction grating is a plate ruled with thousands of equally spaced slits — typically hundreds per millimetre. Light from neighbouring slits, a distance d apart, travels paths that differ by d sinθ at angle θ. When that difference is a whole number of wavelengths, the waves from ALL the slits arrive in step and add to a bright maximum: d sinθ = mλ, with m = 0, 1, 2… The spacing comes from the line density: 500 lines per mm means d = 1/500 mm = 2.0 μm. For 600 nm light the first order is at sinθ = 0.6/2.0 = 0.3, θ ≈ 17.5°. Because sinθ cannot exceed 1, the highest order is the largest whole number not above d/λ — here 3.33, so orders up to 3 each side.

With only two slits, being slightly away from the exact angle still leaves the two waves largely in step, so two-slit fringes are broad. With thousands of slits, even a tiny departure puts the waves from distant slits out of step and they cancel, so a grating's maxima are very sharp and bright — ideal for measuring wavelengths precisely. A finer grating has more lines per mm and a SMALLER d, so it spreads the orders to LARGER angles: at 1000 lines per mm, d = 1.0 μm and the first order of 600 nm light is at sinθ = 0.6, θ ≈ 37°, with no second order at all.

In white light each order becomes a spectrum. Since sinθ = mλ/d, longer wavelengths go to larger angles: violet lies nearest the centre and red furthest out. That is the reverse of a prism, which separates colours by refractive index — larger for violet — and bends violet most. Higher-order spectra overlap: second-order red (2 × 700 = 1400 nm) lands beyond third-order violet (3 × 400 = 1200 nm). Spectrometers use gratings to measure the wavelengths of spectral lines, which identify the elements in a flame, a gas lamp or a star.

## Mental Models

- **Beginner (arriving)**: a grating is a fancy prism; finer means tighter patterns.
- **Intermediate**: d sinθ = mλ; d = 1/N; finer grating → larger angles; red
  diffracted most; many slits → sharp maxima.
- **Advanced**: resolving power R = λ/Δλ = mN (number of illuminated slits);
  dispersion dθ/dλ = m/(d cosθ); reflection gratings and blazing.
- **Expert**: crystals as 3-D gratings for X-rays (Bragg); echelle gratings in
  astronomical spectrographs.
- **Versioning note**: install the intermediate model; mention R = mN as why more
  slits separate close lines.

## Why Students Fail

The relation between "lines per mm" and d is inverted mentally, so finer gratings
are expected to compress the pattern. Prism experience transfers the wrong colour
order. And the sinθ ≤ 1 limit is overlooked, so impossible orders are reported.

## Misconceptions

**M1 — More lines per mm squeeze the orders closer together**
- *Why*: "more lines" sounds like "more crowded" (type 4).
- *Symptom / phrases*: "the finer grating gives a tighter pattern".
- *Detection probe (verbatim)*: "A grating with 500 lines per mm is replaced by one
  with 1000 lines per mm. Do the bright orders move closer to the centre or further
  out?"
- *Recovery*: compute both: sinθ₁ = 0.3 vs 0.6.
- *Verification*: two trend predictions and one design item.

**M2 — A grating, like a prism, bends red the least**
- *Why*: prism spectra learned first (type 4, transfer).
- *Symptom*: red placed nearest the centre.
- *Detection probe*: "White light through a grating: in the first-order spectrum,
  which colour is closest to the centre?"
- *Recovery*: sinθ = mλ/d — longer λ, larger angle.
- *Verification*: order the colours for a grating and a prism side by side.

**M3 — Any order can be seen if you look far enough out**
- *Why*: the sine limit is not applied (type 5).
- *Symptom*: reports a 4th order for 600 nm on a 2 μm grating.
- *Detection probe*: "1000 lines per mm, 600 nm. Highest order?"
- *Recovery*: sinθ = mλ/d ≤ 1 → m ≤ 1.67 → only order 1.
- *Verification*: three maximum-order items.

## Analogies

- **Best analogy**: a stadium crowd doing a wave — when thousands of people are
  exactly in time the wave is sharp and strong; a little out of time and it falls
  apart. Two people alone barely show it.
  *Breaking point*: the crowd chooses; the grating's phases are set by geometry.
- **Alternative**: tyre tracks or a picket fence seen at an angle — regular spacing
  produces regular patterns.
  *Breaking point*: illustrative only.
- **Anti-analogy to avoid**: "a grating is a prism with lines." It installs M2.

## Demonstrations

- **Home**: look at a lamp's reflection on a CD or DVD; or through a cheap grating
  slide at a street light (sodium lamps show a yellow line).
- **Teacher demo**: a laser through gratings of 100, 300 and 600 lines/mm — the dots
  spread further with finer gratings; then a white source showing spectra.
- **Prediction before demo**: "with the finer grating, will the dots move out or in?"

## Discovery Questions

**Structure**:
1. *Need*: "How do we measure the wavelength of light precisely?"
2. *Discovery*: compare the laser patterns for three gratings.
3. *Direct instruction*: d sinθ = mλ, d = 1/N, sine limit.
4. *Apply*: spectra, overlap, element identification.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): laser through gratings.
2. **Worked examples** (high fit): θ₁ ≈ 17.5°; m_max = 3; 1000 lines/mm → 37°.
3. **Error exposure** (high fit for M1/M2): the two computed sines; colour ordering.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) 500 lines/mm: d = 2.0 μm; sinθ₁ = 0.3 → 17.5°.
   (b) m_max = floor(2.0/0.6) = 3.
   (c) 1000 lines/mm: sinθ₁ = 0.6 → 36.9°; m_max = 1.

2. **ERROR-ANALYSIS** — a student says the finer grating compresses the pattern. Ask
   for d in each case.

3. **PREDICTION-BEFORE-DEMO** — before switching gratings, ask in or out.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "d for 600 lines/mm" → "θ₁ for 550 nm at 400 lines/mm" → "highest order".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor converts lines per mm into d aloud
first; says "longer wavelength, bigger angle"; checks sinθ ≤ 1 before listing orders.

*Load-bearing sentence to slow down on*: "More lines per millimetre means the slits
are closer together, so the orders spread further out."

*What to listen for*: "finer means tighter" → M1; "red nearest the centre" → M2;
orders with sinθ > 1 → M3.

## Assessment Signals

**Diagnostic — golden probe**: "500 lines per mm replaced by 1000 lines per mm — orders
closer or further out?" Correct: further out (smaller d).

**Distractor-mapped items**:
- "θ₁ for 600 nm, 500 lines/mm?" Options: 17.5°, 1.7°, 36.9°, 0.3°. Answer: 17.5°.
- "Nearest colour to the centre, first order?" Options: violet, red, green, all
  together. Answer: violet. "Red" targets M2.

**Guided practice → independent practice fading ladder**:
1. d from lines per mm (3 items).
2. Angles of orders (3 items).
3. Maximum orders (3 items).
4. Spectra and overlap (2 items).
5. (Unscaffolded) design a grating for a given angle.

**Mastery gate set** (per assessment/05):
- *Production*: one angle and one maximum-order calculation.
- *New surface*: a stellar spectrum question.
- *Mixed*: grating vs prism ordering interleaved with calculations.
- *Delayed*: one-week check — the finer-grating trend.

**Calibration note**: the equation is easy to use; the check that reveals
miscalibration is the trend question before any calculation.

## Tutor Recovery Strategy

*Likeliest utterance*: "more lines, so the dots are closer" (M1).

*Concept-specific smaller question*: "500 lines in a millimetre — how far apart are
they? And 1000?"

*M2 recovery*: "Which has the longer wavelength, red or violet? Which gets the bigger
sinθ?"

## Memory Hooks

- **Concept type**: law (grating equation) + application (spectroscopy).
- **Review form** (per Delivery 2 §8): trend predictions as spaced retrieval;
  calculations as distributed practice.
- **Automaticity target**: "d = 1/N; finer → wider" before atomic spectra.
- **Interleaving partners**: `phys.opt.diffraction`, `phys.opt.youngs-experiment`,
  `phys.opt.dispersion`.

## Transfer Connections

- *Near*: `phys.opt.dispersion` — contrast with prism spectra.
- *Near*: `phys.opt.resolving-power` — how finely lines can be separated.
- *Far*: X-ray diffraction by crystals (3-D gratings).
- *Real-world*: spectrometers, CDs and DVDs, holographic security labels.
- *Expert transfer*: astronomical spectrographs and exoplanet radial velocities.

## Cross-Subject Connections

- **Chemistry**: emission and absorption spectra identify elements; flame tests.
- **Astronomy**: stellar composition and redshift from spectral lines.
- **Biology**: X-ray diffraction revealed DNA's double helix.
- **Mathematics**: sine function limits and inverse trigonometry.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.opt.diffraction-grating.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 20). "Grating" had zero hits in
the physics corpus before this node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

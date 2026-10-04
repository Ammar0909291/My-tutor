# Resolving Power of Optical Instruments — `phys.opt.resolving-power`

## Identity

- **Concept ID**: `phys.opt.resolving-power`
- **Curriculum location**: physics / optics (wave optics)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.opt.diffraction` — the load-bearing part is that light passing through an
    opening spreads, and spreads MORE the narrower the opening compared with the
    wavelength.
  - `phys.opt.optical-instruments` — the load-bearing part is what a telescope's
    objective and a microscope's objective do (collect light, form an image), and
    what magnification means.
- **Unlocks** (from KG): none listed. Leads to telescope and microscope design,
  electron microscopy and the diffraction limit in imaging.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 10 (Wave Optics); Halliday Resnick Ch. 36

## Learning Objective

After this concept, the learner can:

1. Explain why diffraction turns every point of an object into a small disc of light.
2. Apply Rayleigh's criterion, θ_min ≈ 1.22 λ/D.
3. Predict how aperture and wavelength change the finest resolvable detail.
4. Distinguish resolution from magnification ("empty magnification").

## Core Understanding

Even a perfect lens cannot form a perfect point image. Light entering a circular opening of diameter D diffracts, so a distant star appears as a small bright disc surrounded by faint rings — the Airy pattern — whose angular radius is about 1.22 λ/D. Two close stars give two such discs. If the discs overlap too much they merge into one blob and the instrument cannot tell the stars apart. Rayleigh's criterion fixes the limit: two points are just resolved when the centre of one disc falls on the first dark ring of the other, which happens at an angular separation θ_min ≈ 1.22 λ/D (in radians).

The formula says what improves resolution. A LARGER aperture D gives smaller discs and finer detail: a telescope of aperture 10 cm at 550 nm has θ_min = 1.22 × 550 × 10⁻⁹ / 0.10 ≈ 6.7 × 10⁻⁶ rad, while the eye, with a 3 mm pupil, has about 2.2 × 10⁻⁴ rad — some 33 times coarser. That is why astronomers build telescopes with mirrors metres across. The eye's limit means two car headlights 1.5 m apart can just be separated from about 1.5 / 2.2 × 10⁻⁴ ≈ 7 km away; further off, they merge. A SHORTER wavelength also helps: blue light resolves finer detail than red, and electron microscopes, whose electrons have wavelengths thousands of times shorter than light's, resolve detail thousands of times finer. Oil-immersion microscopes help by filling the gap with a medium of higher refractive index, which shortens the wavelength there and lets the objective accept a wider cone of light.

Resolution is not the same as magnification. Magnification makes the image bigger; resolution decides how much detail is in it. Once the diffraction discs are large enough for the eye to see them, magnifying further only enlarges the blur — "empty magnification". A blurry photo enlarged three times shows the same blur, three times bigger. Likewise a smaller aperture does not sharpen fine detail: a pinhole sharpens a geometric shadow only until diffraction takes over, and for separating close points a narrower opening spreads each disc wider.

## Mental Models

- **Beginner (arriving)**: instruments are magnifiers; more magnification shows more.
- **Intermediate**: each point becomes a diffraction disc; θ_min ≈ 1.22 λ/D; larger D
  and shorter λ resolve more; magnification adds no detail beyond this.
- **Advanced**: microscope limit d_min ≈ 0.61 λ / (n sin α) (numerical aperture);
  atmospheric seeing limits ground telescopes; interferometers combine apertures.
- **Expert**: super-resolution microscopy beats the classical limit with
  fluorescence tricks; adaptive optics; very-long-baseline radio interferometry.
- **Versioning note**: install the intermediate model; mention numerical aperture as
  the microscope form.

## Why Students Fail

Instruments are first met as magnifiers, so "more magnification = more detail" is the
default. The pinhole camera teaches that a smaller hole is sharper, which carries over
wrongly. And the formula is small-angle and in radians, so unit errors (mm, nm) hide
the physics.

## Misconceptions

**M1 — More magnification always reveals more detail**
- *Why*: instruments learned as magnifiers (type 4, surface feature).
- *Symptom / phrases*: "just use a stronger eyepiece"; "zoom in more".
- *Detection probe (verbatim)*: "A microscope image looks blurry at 1000×. Will a
  stronger eyepiece giving 3000× reveal finer details?"
- *Recovery*: enlarge a blurry photo — the blur grows with it.
- *Verification*: two "bigger objective vs stronger eyepiece" comparisons.

**M2 — A smaller aperture gives a sharper image**
- *Why*: pinhole-camera intuition (type 4, transfer).
- *Symptom*: predicts a narrowed telescope separates close stars better.
- *Detection probe*: "If a telescope's aperture were made smaller, would two close
  stars be easier or harder to separate?"
- *Recovery*: narrower slit, wider spread; θ ≈ 1.22 λ/D grows as D shrinks.
- *Verification*: compare θ_min for 3 mm and 10 cm.

**M3 — Rayleigh's criterion uses degrees and any units**
- *Why*: formula used without units discipline (type 5).
- *Symptom*: mixes mm and nm; reports degrees.
- *Detection probe*: "Eye: D = 3 mm, λ = 550 nm. θ_min in radians?"
- *Recovery*: convert both to metres first; the result is in radians.
- *Verification*: three calculations.

## Analogies

- **Best analogy**: two torches seen through fog or a frosted window — each blurs into
  a patch, and close torches merge into one.
  *Breaking point*: fog scatters randomly; diffraction gives a definite, predictable
  disc size.
- **Alternative**: pixels on a screen — detail smaller than a pixel cannot be shown
  however much you zoom.
  *Breaking point*: pixels are square and fixed by the screen; diffraction discs are
  set by D and λ.
- **Anti-analogy to avoid**: "a telescope is just a stronger magnifying glass." It
  installs M1.

## Demonstrations

- **Home**: look at a distant pair of lights through a pinhole in card, then without
  it — the pinhole blurs them together.
- **Teacher demo**: two laser spots or two small LEDs viewed through circular
  apertures of decreasing size; the spots merge.
- **Prediction before demo**: "with the smaller hole, will the two spots look more
  separate or less?"

## Discovery Questions

**Structure**:
1. *Need*: "Why do the two headlights of a far-away car look like one?"
2. *Discovery*: apertures of different sizes in front of two light points.
3. *Direct instruction*: Airy disc and θ_min ≈ 1.22 λ/D.
4. *Apply*: telescopes, the eye, microscopes, electron microscopes.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): headlights at increasing distance.
2. **Worked examples** (high fit): eye 2.2 × 10⁻⁴ rad; telescope 6.7 × 10⁻⁶ rad;
   headlights ~7 km.
3. **Error exposure** (high fit for M1/M2): the enlarged blurry photo; the pinhole.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Eye: 1.22 × 550e-9 / 3e-3 ≈ 2.2 × 10⁻⁴ rad.
   (b) Telescope: 1.22 × 550e-9 / 0.10 ≈ 6.7 × 10⁻⁶ rad — about 33 times finer.
   (c) Headlights 1.5 m apart: 1.5 / 2.2e-4 ≈ 7 km.

2. **ERROR-ANALYSIS** — a student says "zoom in more". Show the enlarged blur.

3. **PREDICTION-BEFORE-DEMO** — before shrinking the aperture, ask more or less
   separate.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "state Rayleigh's criterion" → "θ_min for a 5 cm lens at 600 nm" → "why big
   telescopes?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "every point becomes a little disc"
before any formula; converts to metres aloud; keeps "resolution" and "magnification"
as separate words.

*Load-bearing sentence to slow down on*: "Detail is set by the aperture and the
wavelength — magnifying afterwards only makes the blur bigger."

*What to listen for*: "magnify more" → M1; "smaller hole, sharper" → M2; mm and nm
mixed → M3.

## Assessment Signals

**Diagnostic — golden probe**: "A microscope image is blurry at 1000×. Will 3000× show
finer detail?" Correct: no — the detail is limited by diffraction at the objective.

**Distractor-mapped items**:
- "θ_min for a 10 cm telescope at 550 nm?" Options: 6.7 × 10⁻⁶ rad,
  6.7 × 10⁻³ rad, 2.2 × 10⁻⁴ rad, 5.5 × 10⁻⁶ rad. Answer: 6.7 × 10⁻⁶ rad.
- "Smaller aperture — close stars easier or harder?" Options: harder, easier, no
  change, depends on magnification. Answer: harder. "Easier" targets M2.

**Guided practice → independent practice fading ladder**:
1. θ_min calculations (3 items).
2. Trend predictions for D and λ (3 items).
3. Distance at which two points merge (2 items).
4. Resolution vs magnification classification (3 items).
5. (Unscaffolded) choose an aperture for a required resolution.

**Mastery gate set** (per assessment/05):
- *Production*: one θ_min and one aperture-design calculation.
- *New surface*: why a light microscope cannot show a virus.
- *Mixed*: magnification vs resolution items interleaved with calculations.
- *Delayed*: one-week check — "why big telescopes?"

**Calibration note**: learners compute θ_min correctly yet still say "magnify more";
the check that reveals miscalibration is the 1000× → 3000× question.

## Tutor Recovery Strategy

*Likeliest utterance*: "a stronger eyepiece would show it" (M1).

*Concept-specific smaller question*: "If you enlarge a blurry photo, do new details
appear?"

*M2 recovery*: "A narrower slit — does the light spread more or less?"

## Memory Hooks

- **Concept type**: principle (diffraction limit) + application (instrument design).
- **Review form** (per Delivery 2 §8): the D and λ trends as spaced retrieval;
  calculations as distributed practice.
- **Automaticity target**: "θ_min ≈ 1.22 λ/D; bigger D, shorter λ, finer detail".
- **Interleaving partners**: `phys.opt.diffraction`, `phys.opt.optical-instruments`,
  `phys.opt.diffraction-grating`.

## Transfer Connections

- *Near*: `phys.opt.diffraction` — the single-opening spread.
- *Near*: `phys.opt.optical-instruments` — telescopes and microscopes.
- *Far*: electron microscopes and the de Broglie wavelength.
- *Real-world*: large telescopes, camera lenses, phone-camera "digital zoom",
  satellite imaging.
- *Expert transfer*: interferometric telescopes (Event Horizon Telescope).

## Cross-Subject Connections

- **Biology**: light microscopes cannot resolve viruses; electron microscopy of cells.
- **Astronomy**: telescope aperture and separating double stars.
- **Technology**: optical lithography limits in chip making.
- **Mathematics**: small-angle approximation; radians.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.opt.resolving-power.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 21). The diffraction limit of
instruments was not taught by any node before this one.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

# The Human Eye and Defects of Vision — `phys.opt.human-eye`

## Identity

- **Concept ID**: `phys.opt.human-eye`
- **Curriculum location**: physics / optics
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.opt.lens-power` — the load-bearing part is P = 1/f (dioptres, f in
    metres) with its sign convention — positive for converging, negative for
    diverging — and, through `phys.opt.lenses`, the thin-lens formula used to
    compute corrective lenses.
- **Unlocks** (from KG): none listed. The eye is the final element of every
  optical instrument (`phys.opt.optical-instruments`), and its near point sets the
  magnification of a simple magnifier.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Science Class 10 (The Human Eye and the Colourful World)

## Learning Objective

After this concept, the learner can:

1. Explain image formation on the retina and accommodation by change of lens shape.
2. Diagnose myopia and hypermetropia from where the image falls.
3. Compute the focal length and power of corrective lenses.
4. Explain presbyopia and bifocals.

## Core Understanding

The eye is a converging lens system: the cornea does most of the bending of light, and the eye lens fine-tunes it, so that light from an object forms a real, inverted image on the retina. The distance from lens to retina is fixed, so to focus on objects at different distances the eye changes its focal length instead. This is accommodation: the ciliary muscles squeeze the lens fatter (more curved, shorter focal length, more power) to focus on near objects and let it relax thinner for distant ones. The lens does not move back and forth as a camera lens does. A normal eye sees clearly from its near point, about 25 cm, to its far point at infinity.

In myopia (short sight), the eye has too much power for distant light: rays from a distant object meet in front of the retina, and the far point is closer than infinity. The correction removes power with a diverging (concave) lens that makes distant objects appear to be at the far point, so its focal length equals minus the far-point distance: a far point of 2 m needs f = −2 m, a power of −0.5 D. In hypermetropia (long sight), the eye has too little power for near light: rays from a near object would meet behind the retina, and the near point is farther than 25 cm. The correction adds power with a converging (convex) lens that takes an object at 25 cm and forms its virtual image at the person's near point. For a near point of 100 cm, 1/f = 1/v − 1/u with u = −25 cm and v = −100 cm gives 1/f = 1/25 − 1/100 = 3/100 per cm, so f ≈ 33 cm and the power is +3 D.

With age the lens stiffens and the ciliary muscles weaken, so accommodation shrinks and the near point recedes — presbyopia. A person may then need a converging lens for reading but none, or a diverging lens, for distance; bifocal lenses combine both, with the reading zone at the bottom.

## Mental Models

- **Beginner (arriving)**: the eye is a camera; glasses "make your eyes stronger".
- **Intermediate**: the eye focuses by changing lens shape; myopia = too much
  power (image in front), corrected by diverging lenses; hypermetropia = too
  little power (image behind), corrected by converging lenses.
- **Advanced**: corrective lens + eye form a combined system whose powers add;
  the correction maps the problem object distance onto the eye's working range
  (far point or near point).
- **Expert**: the cornea provides about two-thirds of the eye's roughly 60 D;
  astigmatism (unequal curvature) needs cylindrical lenses; refractive surgery
  reshapes the cornea instead.
- **Versioning note**: install the intermediate model with the two correction
  calculations; mention astigmatism only by name.

## Why Students Fail

Learners reason that glasses "strengthen" weak eyes, so they reach for a
converging lens for every defect. The camera analogy, taught early, suggests the
lens moves to focus. And the sign convention for virtual images makes the
hypermetropia calculation error-prone.

## Misconceptions

**M1 — Short sight needs a converging (magnifying) lens**
- *Why*: glasses are pictured as boosters (type 2, everyday language).
- *Symptom / phrases*: "a stronger lens to help the weak eye".
- *Detection probe (verbatim)*: "A short-sighted person cannot see distant objects
  clearly. Which lens corrects this — converging or diverging — and why?"
- *Recovery*: the myopic focus is already in front of the retina; a converging
  lens moves it further forward. Remove power instead.
- *Verification*: lens type and sign for four described eyes.

**M2 — The eye focuses by moving its lens, like a camera**
- *Why*: the camera analogy (type 5, instructional analogy over-extended).
- *Symptom*: "the lens moves forward for near things".
- *Detection probe*: "How does your eye switch focus from a far tree to a book in
  your hand?"
- *Recovery*: the lens is held in place; the ciliary muscles change its shape and
  focal length.
- *Verification*: explain accommodation and why it fails in presbyopia.

**M3 — A negative power means a weaker eye, a positive power a stronger one**
- *Why*: signs read as quality (type 4, surface feature).
- *Symptom*: "−2 D means the eye is weak".
- *Detection probe*: "A prescription reads −1.5 D. Short or long sight?"
- *Recovery*: negative power = diverging lens = correcting an eye that has TOO MUCH
  power for distant light (myopia).
- *Verification*: classify four prescriptions.

## Analogies

- **Best analogy**: a projector that can only change its lens's strength, not its
  distance from the screen — to sharpen near or far slides, it must change focal
  length.
  *Breaking point*: projectors usually move the lens; use for the constraint, not
  the mechanism.
- **Alternative**: myopia as an over-steep throw and hypermetropia as a too-flat
  throw at a target — glasses adjust the throw.
  *Breaking point*: throws curve under gravity; rays are straight between surfaces.
- **Anti-analogy to avoid**: "glasses magnify for weak eyes." It installs M1.

## Demonstrations

- **Home**: hold a finger close and focus on it, then on a far object — feel the
  change. Look through a parent's reading glasses and a short-sighted friend's
  glasses at print: one magnifies, one shrinks.
- **Teacher demo**: an eye model with a water-filled (variable) lens or swappable
  lenses and a curved screen as retina; add corrective lenses.
- **Prediction before demo**: "which lens sharpens the far object for this myopic
  model?"

## Discovery Questions

**Structure**:
1. *Need*: "Why do some people need glasses only for distance, others only for
   reading?"
2. *Discovery*: on the eye model, find where the image falls for each defect, then
   test which lens moves it onto the retina.
3. *Direct instruction*: the correction formulas and dioptres.
4. *Apply*: real prescriptions.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the eye model and ray diagrams.
2. **Worked examples** (high fit): far point 2 m → −0.5 D; near point 100 cm → +3 D.
3. **Error exposure** (high fit for M1/M2): a converging lens on a myopic eye; the
   fixed lens position.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Myopia: far point 2 m → f = −2 m → −0.5 D.
   (b) Hypermetropia: near point 100 cm → 1/f = 1/25 − 1/100 → f ≈ 33 cm → +3 D.
   (c) Prescription reading: −1.5 D → diverging → myopia.

2. **ERROR-ANALYSIS** — a student prescribes +2 D for short sight. Ask where the
   focus moves.

3. **PREDICTION-BEFORE-DEMO** — before adding a lens to the eye model, ask which
   way the image will move.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "myopia: image and lens" → "far point 1 m" → "near point 50 cm".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor asks "is the eye too strong or too weak
for this light?" before naming a lens; says "changes shape", never "moves"; reads
every prescription sign aloud as converging or diverging.

*Load-bearing sentence to slow down on*: "Short sight means the eye has too much
power for distant light, so the glasses must take some away — a diverging lens."

*What to listen for*: converging for myopia → M1; "the lens moves" → M2; "negative
means weak" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "A short-sighted person cannot see distant objects
clearly. Which lens corrects this — converging or diverging — and why?" Correct:
diverging — distant light focuses in front of the retina, so power must be removed.

**Distractor-mapped items**:
- "Far point 2 m — correcting lens?" Options: +0.5 D, −0.5 D, −2 D, +2 D. Answer:
  −0.5 D. "+0.5 D" targets M1.
- "Accommodation is…" Options: the lens moving; the lens changing shape; the pupil
  widening; the retina moving. Answer: the lens changing shape. "Moving" targets M2.

**Guided practice → independent practice fading ladder**:
1. Locate the image for normal, myopic and hypermetropic eyes (3 drawings).
2. Choose lens type and sign (4 items).
3. Myopia powers (3 problems).
4. Hypermetropia powers (3 problems).
5. (Unscaffolded) read and explain a real prescription.

**Mastery gate set** (per assessment/05):
- *Production*: one myopia and one hypermetropia calculation.
- *New surface*: presbyopia with bifocals.
- *Mixed*: lens-type items interleaved with calculations.
- *Delayed*: one-week check — "why can a myopic person read without glasses?"

**Calibration note**: lens-type rules are memorised quickly; the check that reveals
miscalibration is the reason — "too much power, take some away".

## Tutor Recovery Strategy

*Likeliest utterance*: "glasses make the eye stronger, so a convex lens" (M1).

*Concept-specific smaller question*: "In this eye, does the light focus too early
or too late? Then should the glasses add or remove bending?"

*M2 recovery*: "Can the lens move inside a 2.5 cm eyeball held by fibres all round?"

## Memory Hooks

- **Concept type**: model (eye as variable-focus lens) + procedure (corrections).
- **Review form** (per Delivery 2 §8): prescription classification as spaced
  retrieval; correction calculations as distributed practice.
- **Automaticity target**: "myopia → diverging → negative; hypermetropia →
  converging → positive" before optical instruments.
- **Interleaving partners**: `phys.opt.lenses`, `phys.opt.lens-power`,
  `phys.opt.optical-instruments`.

## Transfer Connections

- *Near*: `phys.opt.optical-instruments` — the eye is the last lens in every
  microscope and telescope.
- *Near*: `phys.opt.lens-power` — powers of lenses in contact add.
- *Far*: camera autofocus and variable-focus liquid lenses.
- *Real-world*: eye tests, prescriptions, contact lenses, laser eye surgery.
- *Expert transfer*: wavefront aberrometry and adaptive optics.

## Cross-Subject Connections

- **Biology**: eye anatomy — cornea, iris, lens, ciliary body, retina, rods and cones.
- **Mathematics**: reciprocal relations (1/f = 1/v − 1/u) and sign conventions.
- **Health**: vision screening, screen time and myopia rates in children.
- **Art**: perspective and how the eye perceives depth.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.opt.human-eye.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 17). The eye appeared only
partially inside `phys.opt.optical-instruments` (near point and hypermetropia had
zero hits). The audit listed `phys.opt.lenses` as a second prerequisite; it is
implied by `phys.opt.lens-power` and omitted (KGCS P2).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

# Lasers: Stimulated Emission and Population Inversion — `phys.mod.lasers`

## Identity

- **Concept ID**: `phys.mod.lasers`
- **Curriculum location**: physics / modern physics (atoms and light)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mod.atomic-spectra` — the load-bearing part is that atoms have discrete energy
    levels and emit or absorb photons of energy E = hf = ΔE when they jump between them;
    its chain includes `phys.mod.photons`.
- **Unlocks** (from KG): none listed. Leads to optical fibres and communication,
  holography, spectroscopy and laser cooling.
- **Difficulty**: advanced · **Bloom**: understand · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 12; Halliday Resnick Ch. 40

## Learning Objective

After this concept, the learner can:

1. Distinguish absorption, spontaneous emission and stimulated emission.
2. Explain why amplification needs a population inversion and how a metastable level
   and a pump create one.
3. Explain the roles of the gain medium, pump and mirrors.
4. Explain and compute properties of laser light (photon energy, photon rate).

## Core Understanding

Light and atoms exchange energy in three ways. In absorption, a photon whose energy matches the gap between two levels lifts an atom to the upper level. In spontaneous emission, an excited atom drops back by itself and emits a photon in a random direction and with a random phase — this is how ordinary lamps glow. In stimulated emission, a passing photon of exactly the right energy makes an excited atom drop and emit a second photon identical to the first — same energy, same direction, same phase — while the first photon carries on. One photon becomes two, and each of those can make more: light is amplified. "Laser" stands for Light Amplification by Stimulated Emission of Radiation.

Amplification has a catch. A photon meeting an atom in the lower level is absorbed; meeting one in the upper level, it stimulates emission. Light grows only if upper-level atoms outnumber lower-level ones — a population inversion. In thermal equilibrium this never happens: at room temperature the fraction of atoms 1.96 eV above the ground state is about e^(−1.96/0.0257) ≈ 10⁻³³, and heating only makes the upper level less empty, never fuller than the lower one. Lasers therefore use a pump — a flash of light or an electric discharge — to drive atoms into a metastable level, one where they stay unusually long (milliseconds rather than nanoseconds), so the inversion can build up. Mirrors at both ends of the medium bounce the light back and forth many times, so it passes through the inverted atoms again and again; one mirror lets out a small fraction as the beam.

Because every photon is a copy, laser light is monochromatic (a helium–neon laser emits a single line at 632.8 nm, photon energy 1.96 eV), coherent (the waves are in step) and highly directional (divergence about a milliradian, so the spot at 10 m is about 1 cm across). A 1 mW He–Ne laser emits about 10⁻³ / 3.14 × 10⁻¹⁹ ≈ 3.2 × 10¹⁵ photons per second. A torch a thousand times more powerful cannot match its spot, because torch light comes from countless atoms emitting spontaneously and no lens can line up their random phases and colours.

## Mental Models

- **Beginner (arriving)**: a laser is very bright, focused light.
- **Intermediate**: three processes; stimulated photons are identical; population
  inversion via a pumped metastable level; mirrors for feedback; monochromatic,
  coherent, directional.
- **Advanced**: three- and four-level schemes (ruby vs Nd:YAG); gain and threshold;
  longitudinal cavity modes; semiconductor lasers.
- **Expert**: Einstein A and B coefficients; mode-locking and femtosecond pulses; laser
  cooling.
- **Versioning note**: install the intermediate model; name the four-level scheme as
  why most lasers run continuously.

## Why Students Fail

Lasers are met as bright, dangerous beams, so "brightness" is the only property noticed.
Stimulated emission is unlike anything in everyday experience. And the idea that
equilibrium always favours the lower level — so inversion is unnatural — is rarely
stated.

## Misconceptions

**M1 — A laser is just very bright light focused into a beam**
- *Why*: intensity is the salient property (type 4).
- *Symptom / phrases*: "a powerful torch with a good lens".
- *Detection probe (verbatim)*: "Could you make a laser by putting a very bright torch
  behind a strong lens?"
- *Recovery*: 1 mW laser vs 1 W torch at 10 m; spectra side by side.
- *Verification*: list the three properties and their origin.

**M2 — Heating a material enough will make it lase**
- *Why*: thermal excitation pictured as filling upper levels (type 5).
- *Symptom*: "just heat the gas until most atoms are excited".
- *Detection probe*: "If you heat a gas very hot, will most of its atoms be in the
  upper level so that it lases?"
- *Recovery*: the Boltzmann fraction; inversion only by pumping a metastable level.
- *Verification*: explain the metastable level's role.

**M3 — In stimulated emission the incoming photon is absorbed**
- *Why*: absorption is the familiar interaction (type 5).
- *Symptom*: "one photon in, one photon out".
- *Detection probe*: "In stimulated emission, what happens to the incoming photon?"
- *Recovery*: one in, two identical out — that is the amplification.
- *Verification*: count photons through three stimulated emissions.

## Analogies

- **Best analogy**: a photocopier — each passing photon makes an exact copy of itself
  from an excited atom.
  *Breaking point*: a copier needs blank paper; the excited atoms are the "paper", and
  without an inversion the photons are swallowed instead.
- **Alternative**: soldiers marching in step vs a crowd milling about (coherent vs
  ordinary light).
  *Breaking point*: illustrative only.
- **Anti-analogy to avoid**: "a laser is a super-torch." It installs M1.

## Demonstrations

- **Home**: compare a laser pointer and a torch on a far wall (never look into a laser).
- **Teacher demo**: a He–Ne laser through a diffraction grating (one line) vs a white
  lamp (a full spectrum); laser speckle on a matt surface showing coherence.
- **Prediction before demo**: "how many colours will the laser's spectrum show?"

## Discovery Questions

**Structure**:
1. *Need*: "How can 1 mW outshine 1 W?"
2. *Discovery*: the two spectra; the narrow beam.
3. *Direct instruction*: stimulated emission, inversion, pump, mirrors.
4. *Apply*: photon rates, laser uses.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): spot vs blur.
2. **Worked examples** (high fit): 1.96 eV; 3.2 × 10¹⁵ photons/s; 10⁻³³.
3. **Error exposure** (high fit for M1/M2): the lens can't make torch light coherent;
   heating can't invert.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) E = hc/λ = 6.63 × 10⁻³⁴ × 3 × 10⁸ / 632.8 × 10⁻⁹ ≈ 3.14 × 10⁻¹⁹ J = 1.96 eV.
   (b) Photon rate = 10⁻³ / 3.14 × 10⁻¹⁹ ≈ 3.2 × 10¹⁵ s⁻¹.
   (c) Boltzmann fraction e^(−1.96/0.0257) ≈ 10⁻³³ at room temperature.

2. **ERROR-ANALYSIS** — a student calls a laser a bright torch. Show the spectra.

3. **PREDICTION-BEFORE-DEMO** — before the grating demo, ask how many colours.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "three processes" → "photon energy of a 532 nm laser" → "why an inversion?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "one photon in, two identical photons
out"; always mentions the mirrors and the pump together with the inversion.

*Load-bearing sentence to slow down on*: "Light grows only when excited atoms
outnumber unexcited ones — and nature never arranges that by itself."

*What to listen for*: "just bright light" → M1; "heat it up" → M2; "the photon is
absorbed" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Bright torch + strong lens = laser?" Correct: no —
laser light comes from stimulated emission.

**Distractor-mapped items**:
- "He–Ne photon energy at 632.8 nm?" Options: 1.96 eV; 0.51 eV; 3.14 eV; 19.6 eV.
  Answer: 1.96 eV.
- "Heat a gas to make it lase?" Options: no — equilibrium never gives an inversion;
  yes, if hot enough; yes, at any temperature. Answer: no. The others target M2.

**Guided practice → independent practice fading ladder**:
1. Process identification (3 items).
2. Photon energy and rate (3 items).
3. Inversion reasoning (2 items).
4. Laser parts and properties (3 items).
5. (Unscaffolded) explain a laser to a classmate.

**Mastery gate set** (per assessment/05):
- *Production*: one photon-rate calculation.
- *New surface*: why a laser beam stays narrow.
- *Mixed*: process items interleaved with inversion items.
- *Delayed*: one-week check — why heating can't make a laser.

**Calibration note**: learners recite "stimulated emission"; the check that reveals
miscalibration is the heating question.

## Tutor Recovery Strategy

*Likeliest utterance*: "it's just a really bright light" (M1).

*Concept-specific smaller question*: "Can a lens make light from many atoms march in
step?"

*M2 recovery*: "In thermal equilibrium, which level always holds more atoms?"

## Memory Hooks

- **Concept type**: process (stimulated emission) + device (laser).
- **Review form** (per Delivery 2 §8): the three processes and the inversion as spaced
  retrieval; photon calculations as distributed practice.
- **Automaticity target**: "1 in → 2 identical out; need inversion; pump + metastable +
  mirrors".
- **Interleaving partners**: `phys.mod.atomic-spectra`, `phys.mod.photons`,
  `phys.opt.diffraction-grating`.

## Transfer Connections

- *Near*: `phys.mod.atomic-spectra` — energy levels.
- *Near*: `phys.em.communication-systems` — fibre-optic links use lasers.
- *Far*: laser cooling and atomic clocks.
- *Real-world*: barcode scanners, eye surgery, fibre internet, laser cutting.
- *Expert transfer*: gravitational-wave interferometers (LIGO).

## Cross-Subject Connections

- **Medicine**: LASIK, dermatology, surgery.
- **Chemistry**: laser spectroscopy.
- **Engineering**: manufacturing, lidar.
- **History of science**: Einstein's 1917 prediction of stimulated emission.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mod.lasers.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 36). The audit listed
`phys.mod.atomic-spectra` and `phys.mod.photons`; only `phys.mod.atomic-spectra` is kept
because it already reaches `phys.mod.photons` through `phys.mod.bohr-model` (KGCS P2).
"Stimulated" had zero hits in the corpus before this node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).

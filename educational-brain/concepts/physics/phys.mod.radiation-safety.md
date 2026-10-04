# Radiation Dose, Biological Effects and Safety — `phys.mod.radiation-safety`

## Identity

- **Concept ID**: `phys.mod.radiation-safety`
- **Curriculum location**: physics / modern physics (nuclear radiation)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mod.radioactivity` — the load-bearing part is the three kinds of radiation
    (alpha, beta, gamma), their ionising power and what stops each.
- **Unlocks** (from KG): none listed. Leads to medical physics (imaging, radiotherapy)
  and nuclear power safety.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 13; IB Physics

## Learning Objective

After this concept, the learner can:

1. Compute absorbed dose (Gy) and equivalent dose (Sv).
2. Explain the biological effects of ionising radiation and why alpha emitters are
   dangerous inside the body.
3. Apply time, distance (inverse square) and shielding to reduce exposure.
4. Distinguish irradiation from contamination.

## Core Understanding

Ionising radiation harms living tissue by knocking electrons off atoms, breaking chemical bonds and damaging DNA. How much harm depends on how much energy is deposited and how concentrated it is. The absorbed dose is the energy absorbed per kilogram of tissue, measured in grays: 1 Gy = 1 J/kg. A 70 kg person who absorbs 0.014 J of gamma radiation receives 0.014/70 = 0.2 mGy. Different radiations do different damage for the same energy: alpha particles deposit their energy in a very short, dense track and are about 20 times more damaging than gamma rays, X-rays or beta particles. The equivalent dose multiplies the absorbed dose by a radiation weighting factor — 20 for alpha, 1 for beta, gamma and X-rays — and is measured in sieverts. So 0.2 mGy of gamma is 0.2 mSv, while 0.1 mGy of alpha in lung tissue is 2 mSv. For scale, natural background radiation (rocks, radon, food, cosmic rays) gives most people about 2–3 mSv a year; a chest X-ray about 0.02 mSv; a CT scan several mSv. Very large doses (several Sv in a short time) cause radiation sickness; small doses raise the long-term risk of cancer roughly in proportion to dose.

Alpha particles are stopped by a sheet of paper or the dead outer layer of skin, so an alpha source outside the body is low risk. Inside the body it is the opposite: inhaled radon or swallowed polonium deposits all its energy in a few living cells, which is why alpha has the highest weighting factor and why radon in homes is a health concern.

Three rules reduce exposure. Time: dose is proportional to exposure time. Distance: radiation from a small source spreads out, so the dose rate falls as 1/r² — doubling the distance quarters it (40 μSv/h at 1 m becomes 10 μSv/h at 2 m and 2.5 μSv/h at 4 m). Shielding: paper stops alpha, a few millimetres of aluminium stop beta, and gamma is reduced by thick lead or concrete. Finally, being exposed to radiation — irradiation — does not make an object radioactive: gamma-sterilised syringes and irradiated strawberries emit nothing afterwards, just as a room does not glow after a lamp is switched off. Contamination is different: radioactive material itself on or in something keeps emitting until it is removed or decays.

## Mental Models

- **Beginner (arriving)**: radiation is one vague danger; anything exposed becomes
  radioactive; alpha is harmless because it is weak.
- **Intermediate**: Gy vs Sv with weighting factors; background scale; time, distance,
  shielding; irradiation vs contamination; alpha dangerous inside the body.
- **Advanced**: tissue weighting factors and effective dose; deterministic vs
  stochastic effects; the linear no-threshold model and its debate.
- **Expert**: dosimetry in radiotherapy; ALARA in practice; biological repair
  mechanisms.
- **Versioning note**: install the intermediate model; mention effective dose as the
  whole-body version of the sievert.

## Why Students Fail

News stories present radiation as a single invisible threat. "Contamination" and
"irradiation" are used loosely. And penetration is confused with harm.

## Misconceptions

**M1 — Anything exposed to radiation becomes radioactive**
- *Why*: contagion picture of radiation (type 2).
- *Symptom / phrases*: "irradiated food is radioactive".
- *Detection probe (verbatim)*: "Strawberries are treated with gamma rays to kill
  bacteria. Are they radioactive afterwards?"
- *Recovery*: after a chest X-ray you are not radioactive; the lamp-and-room analogy.
- *Verification*: classify four scenarios as irradiation or contamination.

**M2 — Alpha radiation is harmless because it can't get through skin**
- *Why*: penetration equated with danger (type 4).
- *Symptom*: "alpha is the safest".
- *Detection probe*: "Alpha particles are stopped by a sheet of paper. Is an alpha
  emitter safe to swallow?"
- *Recovery*: all the energy goes into a few living cells; radon.
- *Verification*: rank risks inside vs outside the body.

**M3 — Doubling the distance halves the dose rate**
- *Why*: linear thinking (type 5).
- *Symptom*: "3 m away is a third of the dose".
- *Detection probe*: "You move from 1 m to 3 m from a small gamma source. By what factor
  does your dose rate fall?"
- *Recovery*: radiation spreads over 4πr².
- *Verification*: three inverse-square items.

## Analogies

- **Best analogy**: a lamp lighting a room — the room is lit while the lamp is on, but
  does not glow afterwards (irradiation, not contamination).
  *Breaking point*: very high-energy neutrons can make materials radioactive
  (activation); not the case for X-rays and the gamma rays used in food irradiation.
- **Alternative**: alpha as a bowling ball (stops quickly, smashes everything in a short
  path) vs gamma as a bullet passing through.
  *Breaking point*: illustrative only.
- **Anti-analogy to avoid**: "radiation is like a germ that spreads." It installs M1.

## Demonstrations

- **Home**: compare dose numbers: a flight, a banana, a chest X-ray, a year of
  background.
- **Teacher demo**: a Geiger counter with a sealed source at 10, 20 and 40 cm (counts
  fall by about 4 each doubling, after background); paper, aluminium and lead
  absorbers.
- **Prediction before demo**: "doubling the distance — how much will the count drop?"

## Discovery Questions

**Structure**:
1. *Need*: "Why does the radiographer stand behind a screen?"
2. *Discovery*: counts vs distance and absorber.
3. *Direct instruction*: Gy, Sv, weighting factors, the three protections.
4. *Apply*: radon, food irradiation, medical imaging.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the lead screen and the strawberries.
2. **Worked examples** (high fit): 0.2 mGy = 0.2 mSv; 2 mSv alpha; 40 → 10 → 2.5 μSv/h.
3. **Error exposure** (high fit for M1/M2): the X-ray patient; radon.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) D = 0.014 J / 70 kg = 0.2 mGy; H = 0.2 mSv (gamma, w_R = 1).
   (b) Alpha: 0.1 mGy × 20 = 2 mSv.
   (c) Inverse square: 40 μSv/h at 1 m → 10 at 2 m → 2.5 at 4 m.

2. **ERROR-ANALYSIS** — a student says irradiated food is radioactive. Ask about X-ray
   patients.

3. **PREDICTION-BEFORE-DEMO** — before the distance demo, ask the factor.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "Gy vs Sv" → "alpha mGy to mSv" → "irradiation vs contamination".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor gives a number for scale whenever a dose is
mentioned; says "irradiated is not radioactive"; separates "how far it goes" from "how
much harm it does".

*Load-bearing sentence to slow down on*: "Alpha can't get through your skin — which is
exactly why it's so dangerous once it's inside you."

*What to listen for*: "it becomes radioactive" → M1; "alpha is harmless" → M2; "twice
as far, half the dose" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Irradiated strawberries — radioactive?" Correct: no.

**Distractor-mapped items**:
- "0.1 mGy of alpha: equivalent dose?" Options: 2 mSv; 0.1 mSv; 0.005 mSv; 20 mSv.
  Answer: 2 mSv.
- "Dose rate at 2 m if 40 μSv/h at 1 m?" Options: 10; 20; 40; 80 μSv/h. Answer: 10.
  "20" targets M3.

**Guided practice → independent practice fading ladder**:
1. Gy and Sv (3 items).
2. Inverse-square dose rates (3 items).
3. Shielding choices (2 items).
4. Irradiation vs contamination (3 items).
5. (Unscaffolded) a safety plan for a source.

**Mastery gate set** (per assessment/05):
- *Production*: one dose and one inverse-square calculation.
- *New surface*: radon in homes.
- *Mixed*: unit items interleaved with scenario items.
- *Delayed*: one-week check — irradiation vs contamination.

**Calibration note**: learners can define the gray; the check that reveals
miscalibration is the swallowed-alpha question.

## Tutor Recovery Strategy

*Likeliest utterance*: "irradiated food must be radioactive" (M1).

*Concept-specific smaller question*: "After a chest X-ray, would you set off a Geiger
counter?"

*M2 recovery*: "Where does an alpha particle deposit its energy when it stops?"

## Memory Hooks

- **Concept type**: quantities (Gy, Sv) + procedure (protection).
- **Review form** (per Delivery 2 §8): definitions and the three protections as spaced
  retrieval; calculations as distributed practice.
- **Automaticity target**: "Sv = Gy × w_R (alpha 20); time, distance², shielding;
  irradiated ≠ radioactive".
- **Interleaving partners**: `phys.mod.radioactivity`, `phys.mod.radioactive-decay`,
  `phys.mod.x-rays`.

## Transfer Connections

- *Near*: `phys.mod.radioactive-decay` — activity falls with half-life.
- *Near*: `phys.mod.x-rays` — medical imaging doses.
- *Far*: nuclear power plant safety; space radiation for astronauts.
- *Real-world*: food irradiation, sterilisation, radon testing, airport scanners.
- *Expert transfer*: radiotherapy dose planning.

## Cross-Subject Connections

- **Biology**: DNA damage and repair; cancer.
- **Chemistry**: ionisation; radon as a noble gas from uranium decay.
- **Medicine**: imaging and radiotherapy.
- **Mathematics**: inverse-square law.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mod.radiation-safety.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 37; proficient difficulty). Dose and
radiation safety had zero hits in the corpus before this node. Placed after
`phys.mod.radioactive-decay` in lesson order; no existing edges changed.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).

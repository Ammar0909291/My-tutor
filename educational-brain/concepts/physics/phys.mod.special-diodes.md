# Special-Purpose Diodes: Zener, LED, Photodiode, Solar Cell — `phys.mod.special-diodes`

## Identity

- **Concept ID**: `phys.mod.special-diodes`
- **Curriculum location**: physics / modern physics (semiconductor devices)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mod.diode-rectification` — the load-bearing part is the diode I–V
    characteristic: forward conduction above a knee, reverse blocking until breakdown.
  - `phys.em.ohms-law` — the load-bearing part is I = V/R, used for the Zener regulator's
    series resistor and an LED's current-limiting resistor.
- **Unlocks** (from KG): none listed.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 3 · **References**: NCERT Physics Class 12 Ch.14; OpenStax University
  Physics Vol.3 Ch.9

## Learning Objective

After this concept, the learner can:

1. Explain how a Zener diode regulates voltage and compute the resistor, load and Zener
   currents.
2. Explain why an LED's colour is set by its band gap and compute λ ≈ 1240/E_g nm and a
   current-limiting resistor.
3. Distinguish the photodiode (reverse-biased light sensor) from the solar cell (unbiased
   generator) and find a photodiode's cutoff wavelength.

## Core Understanding

An ordinary diode lets current through one way and blocks it the other. Special-purpose diodes put the same p-n junction to other jobs. A Zener diode is heavily doped so that in reverse bias it breaks down sharply at a fixed voltage V_Z. Breakdown itself does no harm — only too much current and heat does — so a series resistor limits the current, and the Zener then holds the voltage across it almost constant. Connect a 6.2 V Zener across a 620 Ω load, with a 100 Ω resistor from a 12 V supply. The resistor drops 12 − 6.2 = 5.8 V, so 58 mA flows through it. The load takes 6.2/620 = 10 mA; the Zener takes the other 48 mA. If the supply rises to 14 V, the resistor current becomes 78 mA and the Zener simply takes 68 mA; the load stays at 6.2 V. If the supply falls below V_Z, the Zener stops conducting and regulation is lost.

A light-emitting diode (LED) is forward-biased. Electrons and holes meet at the junction, and an electron falling across the band gap gives out a photon of energy close to E_g. So the colour is set by the semiconductor: λ ≈ 1240/E_g nm, giving about 653 nm (red) for 1.9 eV and about 459 nm (blue) for 2.7 eV. The case colour does not matter — clear-cased LEDs glow red, green or blue. An LED needs a series resistor too: from a 5 V supply, a red LED dropping 2.0 V at 20 mA needs (5 − 2.0)/0.020 = 150 Ω.

Light can also go the other way. A photodiode is reverse-biased: photons with energy above E_g create electron–hole pairs, giving a reverse current proportional to the light — a light meter. Silicon (E_g = 1.12 eV) stops responding beyond 1240/1.12 ≈ 1107 nm. A solar cell has no bias at all: the junction's own built-in field separates the light-made pairs, giving a voltage (about 0.6 V for silicon) and delivering power to a load. At 20 % efficiency, full sunlight of 1000 W/m² gives 200 W/m².

## Mental Models

- **Beginner (arriving)**: a diode is a one-way valve; breakdown means destruction.
- **Intermediate**: four devices from one junction: Zener (reverse, voltage holder), LED
  (forward, light out), photodiode (reverse, light in), solar cell (no bias, power out).
- **Advanced**: direct vs indirect band gaps; avalanche vs Zener breakdown; the solar
  cell I–V curve in the fourth quadrant.
- **Expert**: quantum efficiency, white LEDs with phosphors, maximum power point.
- **Versioning note**: install the intermediate model; mention indirect gaps only to
  explain why silicon makes no light.

## Why Students Fail

Rectifier lessons warn that breakdown destroys diodes, so a device designed for breakdown
sounds contradictory. LED colour is attributed to visible plastic. Photodiode and solar
cell look alike and are confused.

## Misconceptions

**M1 — Reverse breakdown always destroys a diode**
- *Why*: overgeneralised rectifier warning (type 5).
- *Symptom / phrases*: "breakdown burns it out".
- *Detection probe (verbatim)*: "Can a diode be used deliberately in reverse breakdown?"
- *Recovery*: current, not breakdown, is the damage; the series resistor limits it.
- *Verification*: compute the Zener current at 12 V and 14 V.

**M2 — An LED's colour comes from its plastic case**
- *Why*: visible-surface attribution (type 2).
- *Symptom*: "take the case off and it's white".
- *Detection probe*: "Take the red case off a red LED. What colour is its light?"
- *Recovery*: clear-cased LEDs of three colours; λ = 1240/E_g.
- *Verification*: band gap for green at 540 nm (≈ 2.3 eV).

## Analogies

- **Best analogy**: a Zener as an overflow pipe in a water tank — the level can't rise
  above the pipe, extra water just goes down it.
  *Breaking point*: the Zener also stops conducting when the "level" (supply) falls
  below V_Z.
- **Alternative**: an LED as a staircase with one big step — each electron's fall down
  the step gives a photon of that step's size.
  *Breaking point*: bands are not single steps; the spectrum has a small width.
- **Anti-analogy to avoid**: "a solar cell is a battery that sunlight recharges." It
  stores nothing.

## Demonstrations

- **Home**: clear-cased LEDs of different colours; a solar garden light covered and
  uncovered.
- **Teacher demo**: Zener regulator on a breadboard with a variable supply and two
  meters; LED colour vs forward voltage.
- **Prediction before demo**: "Raise the supply from 10 V to 14 V: what happens to the
  load voltage?"

## Discovery Questions

**Structure**:
1. *Need*: "How does a phone charger keep its output steady?"
2. *Discovery*: the I–V curve's sharp reverse breakdown.
3. *Direct instruction*: Zener regulator, LED, photodiode, solar cell.
4. *Apply*: currents, wavelengths, cutoff.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the I–V curve and the four devices.
2. **Worked examples** (high fit): regulator currents; λ from E_g; 150 Ω resistor.
3. **Error exposure** (high fit for M1/M2): steady regulator output; clear LEDs.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) I_R = (12 − 6.2)/100 = 58 mA; I_L = 6.2/620 = 10 mA; I_Z = 48 mA.
   (b) λ = 1240/1.9 ≈ 653 nm; 1240/2.7 ≈ 459 nm.
   (c) R = (5 − 2.0)/0.020 = 150 Ω.

2. **ERROR-ANALYSIS** — a student says the Zener burns out in breakdown. Find the current
   and compare it with the rating.

3. **PREDICTION-BEFORE-DEMO** — before raising the supply, ask what the load voltage does.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "what sets an LED's colour" → "Zener currents" → "photodiode vs solar cell".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor starts from the familiar I–V curve, gives
each device one job and one bias, and computes before naming.

*Load-bearing sentence to slow down on*: "Breakdown doesn't destroy a diode — too much
current does. Limit the current and the breakdown voltage becomes a reference."

*What to listen for*: "breakdown burns it out" → M1; "the plastic is red" → M2.

## Assessment Signals

**Diagnostic — golden probe**: "Can a diode be used deliberately in reverse breakdown?"
Correct: yes — a Zener, with a series resistor limiting its current.

**Distractor-mapped items**:
- "12 V, 100 Ω, 6.2 V Zener, 620 Ω load: Zener current?" Options: 48 mA; 58 mA; 10 mA;
  120 mA. Answer: 48 mA.
- "Red case off a red LED?" Options: still red; white; no light. Answer: still red.
  "White" targets M2.

**Guided practice → independent practice fading ladder**:
1. Device ↔ bias ↔ job matching (3 items).
2. Zener regulator currents (3 items).
3. LED wavelength and resistor (2 items).
4. Photodiode cutoff (2 items).
5. (Unscaffolded) design a regulator for a given load.

**Mastery gate set** (per assessment/05):
- *Production*: one regulator design.
- *New surface*: a white LED or a light meter.
- *Mixed*: device items interleaved with calculations.
- *Delayed*: one-week check — what sets an LED's colour.

**Calibration note**: learners can name the four devices; the check that reveals
miscalibration is "what bias does each use, and why?"

## Tutor Recovery Strategy

*Likeliest utterance*: "breakdown destroys the diode" (M1).

*Concept-specific smaller question*: "What current flows through the Zener at 12 V — and
is that enough to overheat it?"

*M2 recovery*: "What colour does a clear-cased LED glow?"

## Memory Hooks

- **Concept type**: device family (applications of one principle).
- **Review form** (per Delivery 2 §8): device-bias-job table as spaced retrieval;
  calculations as distributed practice.
- **Automaticity target**: "Zener: reverse, holds V_Z · LED: forward, λ ≈ 1240/E_g ·
  photodiode: reverse, light → current · solar cell: no bias, power out".
- **Interleaving partners**: `phys.mod.diode-rectification`, `phys.mod.energy-bands`,
  `phys.mod.photoelectric-effect`.

## Transfer Connections

- *Near*: `phys.mod.diode-rectification` — the same I–V curve.
- *Near*: `phys.mod.photoelectric-effect` — photon energy thresholds.
- *Far*: renewable energy systems.
- *Real-world*: chargers, displays, remote controls, light meters, solar panels.
- *Expert transfer*: blue LED (2014 Nobel), solar cell efficiency limits.

## Cross-Subject Connections

- **Chemistry**: semiconductor materials (GaAs, GaN, Si).
- **Technology**: power supplies and displays.
- **Environmental science**: solar energy.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mod.special-diodes.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 32). The audit listed
`phys.mod.pn-junction`; the node requires `phys.mod.diode-rectification` instead, because
the I–V characteristic (forward knee, reverse breakdown) is load-bearing and pn-junction is
its own prerequisite (KGCS P2). `phys.em.ohms-law` is added because the regulator and LED
resistor calculations need it and it is in neither chain (KGCS P1). Transistors and logic
gates (§B items 33–34) stay excluded by owner rule.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).

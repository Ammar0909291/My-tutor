# Galvanometer, Ammeter and Voltmeter Conversion — `phys.em.moving-coil-galvanometer`

## Identity

- **Concept ID**: `phys.em.moving-coil-galvanometer`
- **Curriculum location**: physics / electricity and magnetism (magnetic effects of current)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.magnetic-force` — the load-bearing part is the force on a current in
    a magnetic field, F = BIL for a wire across the field, which acts on the
    coil's sides.
  - `phys.mech.torque` — the load-bearing part is the torque of a couple: two
    equal, opposite forces a distance b apart give τ = F b, so the coil's torque is
    NIAB; and the restoring torque of a spring, kφ.
- **Unlocks** (from KG): none listed. Every analogue meter, and the measurement
  practice in `phys.em.dc-circuits`, `phys.em.wheatstone-bridge` and
  `phys.em.potentiometer`, depends on understanding meter resistance.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 4 (Moving Charges and Magnetism)

## Learning Objective

After this concept, the learner can:

1. Explain the moving-coil galvanometer: τ = NIAB in a radial field, balanced by
     kφ, giving φ ∝ I.
2. Convert a galvanometer into an ammeter with a small parallel shunt,
     S = I_g G/(I − I_g).
3. Convert it into a voltmeter with a large series resistance, R = V/I_g − G.
4. Explain why ammeters need low and voltmeters high resistance.

## Core Understanding

A moving-coil galvanometer is a small rectangular coil of N turns, free to rotate between the concave poles of a magnet with a soft-iron core in the middle. When a current I flows, the two sides of the coil that lie across the field feel equal and opposite forces, NBIl each, a distance b apart — a couple, with torque τ = NBIl·b = NIAB, where A is the coil's area. The curved poles and core make the field radial, so the plane of the coil always lies along the field lines and the torque stays NIAB whatever the angle. A spiral spring twists back with a torque kφ proportional to the deflection. At balance NIAB = kφ, so φ = (NAB/k) I: the deflection is proportional to the current and the scale is evenly spaced. The current sensitivity, φ/I = NAB/k, is raised by more turns, a larger coil, a stronger field or a weaker spring.

On its own the instrument is delicate: a typical galvanometer has resistance G = 50 Ω and reaches full scale at only I_g = 2 mA, so it can only handle 0.1 V. To measure up to 1 A, connect a small resistance — a shunt — in PARALLEL with the coil. At full scale 2 mA goes through the coil and the other 0.998 A through the shunt; both share the same voltage, so I_g G = (I − I_g) S and S = 0.002 × 50 / 0.998 ≈ 0.1 Ω. The ammeter as a whole then has a very low resistance, which is what an instrument connected in series needs: it must not change the current it measures.

To measure up to 10 V, connect a large resistance in SERIES with the coil, so that 10 V drives exactly the full-scale 2 mA: R = V/I_g − G = 10/0.002 − 50 = 4950 Ω. The voltmeter as a whole has a high resistance, which is what an instrument connected in parallel needs: it must draw almost no current, or it would change the voltage it measures. An ideal ammeter has zero resistance and an ideal voltmeter infinite resistance.

## Mental Models

- **Beginner (arriving)**: an ammeter and a voltmeter are different gadgets that
  "measure electricity".
- **Intermediate**: both are the same galvanometer; an ammeter adds a small parallel
  shunt, a voltmeter a large series multiplier; the radial field gives a linear scale.
- **Advanced**: meter loading — a real voltmeter of finite resistance lowers the
  voltage it measures; a real ammeter adds resistance to the circuit; sensitivity
  trades off against robustness.
- **Expert**: digital meters measure voltage across a precision resistor with very
  high input impedance (10 MΩ), but the same loading logic applies; ballistic
  galvanometers measure charge.
- **Versioning note**: install the intermediate model and the two conversion
  formulas; name loading as the reason behind "low R / high R".

## Why Students Fail

The shunt's purpose (a bypass) is not visualised, so it is put in series or made
large. The voltmeter is imagined as needing current "to work", so its resistance is
made low. And the radial field is treated as a detail, so the linear scale has no
explanation.

## Misconceptions

**M1 — The ammeter's extra resistor goes in series (or should be large)**
- *Why*: "adding a resistor" defaults to series (type 4, overgeneralisation).
- *Symptom / phrases*: draws the shunt in series; "a big shunt to protect the coil".
- *Detection probe (verbatim)*: "A galvanometer reads full scale at 2 mA. To measure
  currents up to 1 A, how must the extra resistor be connected, and should it be
  large or small?"
- *Recovery*: in series all 1 A goes through the coil — 500 times full scale. The
  shunt must bypass the coil: parallel, and small.
- *Verification*: two shunt calculations with diagrams.

**M2 — A voltmeter should have low resistance so current can flow through it**
- *Why*: "a meter needs current to read" (type 3, causal intuition).
- *Symptom*: chooses a small multiplier; says voltmeters should conduct easily.
- *Detection probe*: "Should a voltmeter have a high or a low resistance? Why?"
- *Recovery*: a 100 Ω voltmeter across a 10 kΩ resistor would take most of the
  current and change the voltage it measures.
- *Verification*: two multiplier calculations and one loading question.

**M3 — The scale is linear because current and deflection are "just proportional"**
- *Why*: the radial field is skipped (type 5, instructional omission).
- *Symptom*: cannot say what happens if the field were uniform instead.
- *Detection probe*: "Why is the scale of a moving-coil meter evenly spaced?"
- *Recovery*: in a radial field the coil's plane always lies along B, so τ = NIAB at
  every angle; with a uniform field the torque would fall as the coil turned.
- *Verification*: explain the role of the curved poles and iron core.

## Analogies

- **Best analogy**: a narrow footpath beside a wide road — the shunt is the road;
  almost all the traffic (current) takes it, and only a measured trickle uses the
  footpath (the coil).
  *Breaking point*: traffic chooses; current divides by resistance automatically.
- **Alternative (voltmeter)**: a pressure gauge on a water pipe — tapped in at the
  side with a tiny bore, so it measures pressure without drawing flow.
  *Breaking point*: gauges measure pressure at a point; voltmeters a difference.
- **Anti-analogy to avoid**: "the voltmeter lets the electricity through to measure
  it." It installs M2.

## Demonstrations

- **Teacher demo**: a demonstration galvanometer converted live into an ammeter
  (with a shunt) and a voltmeter (with a multiplier), each checked against a
  commercial meter.
- **Home/virtual**: a circuit simulator — put an ammeter in parallel with a lamp and
  watch the current spike.
- **Prediction before demo**: "where will the shunt go?"

## Discovery Questions

**Structure**:
1. *Need*: "The galvanometer maxes out at 2 mA. How can it measure 1 A?"
2. *Discovery*: sketch the current split at the junction; choose which path should
   be easy.
3. *Direct instruction*: S and R formulas; the radial field and linear scale.
4. *Apply*: design meters with given ranges.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Worked examples** (primary): S ≈ 0.1 Ω; R = 4950 Ω.
2. **Error exposure** (high fit for M1/M2): the series shunt; the 100 Ω voltmeter.
3. **Concrete model** (high fit): the coil, poles and spring.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) τ = NIAB = kφ → φ = (NAB/k) I.
   (b) Ammeter 0–1 A: S = 0.002 × 50 / 0.998 ≈ 0.1 Ω, parallel.
   (c) Voltmeter 0–10 V: R = 10/0.002 − 50 = 4950 Ω, series.

2. **ERROR-ANALYSIS** — a student puts the 0.1 Ω shunt in series. Ask what current
   the coil then carries.

3. **PREDICTION-BEFORE-DEMO** — before the simulator, ask what an ammeter in
   parallel with a lamp will do.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "shunt value" → "multiplier value" → "why a linear scale?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "bypass" for the shunt and
"current limiter" for the multiplier; always states where the meter goes (series or
parallel) before its resistance.

*Load-bearing sentence to slow down on*: "An ammeter sits in series, so it must have
almost no resistance; a voltmeter sits in parallel, so it must have a very high one."

*What to listen for*: shunt in series → M1; "voltmeter needs low resistance" → M2;
no mention of the radial field → M3.

## Assessment Signals

**Diagnostic — golden probe**: "A galvanometer reads full scale at 2 mA. To measure
up to 1 A, how must the extra resistor be connected, and large or small?" Correct:
a small resistor in parallel (≈ 0.1 Ω for G = 50 Ω).

**Distractor-mapped items**:
- "Shunt for 50 Ω, 2 mA, 0–1 A?" Options: 0.1 Ω parallel, 0.1 Ω series, 450 Ω
  series, 4950 Ω parallel. Answer: 0.1 Ω parallel. "0.1 Ω series" targets M1.
- "Voltmeter resistance should be…" Options: high, low, zero, equal to the circuit's.
  Answer: high. "Low" targets M2.

**Guided practice → independent practice fading ladder**:
1. Torque and sensitivity (2 items).
2. Shunt calculations (3 items).
3. Multiplier calculations (3 items).
4. Placement and loading reasoning (3 items).
5. (Unscaffolded) design a multi-range meter.

**Mastery gate set** (per assessment/05):
- *Production*: one ammeter and one voltmeter design.
- *New surface*: a different galvanometer (100 Ω, 1 mA).
- *Mixed*: placement items interleaved with calculations.
- *Delayed*: one-week check — "why a linear scale?"

**Calibration note**: the formulas are short; the check that reveals
miscalibration is drawing where the shunt goes.

## Tutor Recovery Strategy

*Likeliest utterance*: "the resistor protects the coil, so put it in series" (M1).

*Concept-specific smaller question*: "At the junction, 1 A arrives. How much may go
through the coil? Where must the rest go?"

*M2 recovery*: "If the voltmeter took most of the current, would the resistor's
voltage stay the same?"

## Memory Hooks

- **Concept type**: device model (galvanometer) + procedure (conversions).
- **Review form** (per Delivery 2 §8): the two conversion formulas as spaced
  retrieval; placement as contrast pairs.
- **Automaticity target**: "ammeter: small, parallel shunt; voltmeter: large, series
  multiplier" before Wheatstone bridge and potentiometer practicals.
- **Interleaving partners**: `phys.em.magnetic-force`, `phys.em.dc-circuits`,
  `phys.em.ohms-law`.

## Transfer Connections

- *Near*: `phys.em.dc-circuits` — meter placement and loading in real circuits.
- *Near*: `phys.em.motors-and-generators` — the same torque on a coil, but free to
  spin.
- *Far*: `phys.em.wheatstone-bridge` and `phys.em.potentiometer` — null methods that
  avoid loading altogether.
- *Real-world*: multimeters, analogue fuel and temperature gauges, loudspeakers.
- *Expert transfer*: input impedance in electronic instruments.

## Cross-Subject Connections

- **Mathematics**: current division and ratios; solving for S and R.
- **Engineering**: instrument design and the loading effect.
- **Chemistry**: measuring cell emf requires a high-resistance voltmeter (or a
  potentiometer) so the cell is not loaded.
- **Biology**: microelectrodes for nerve potentials need extremely high input
  resistance.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.moving-coil-galvanometer.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 25). "Galvanometer" and "shunt"
had zero hits in the physics corpus before this node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

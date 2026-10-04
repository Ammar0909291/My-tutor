# Potential Energy of a System of Charges — `phys.em.electrostatic-potential-energy`

## Identity

- **Concept ID**: `phys.em.electrostatic-potential-energy`
- **Curriculum location**: physics / electricity and magnetism (electrostatics)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.electric-potential` — the load-bearing part is V = kQ/r as the work
    per unit charge needed to bring a test charge from infinity. The work to bring
    a charge q to a point at potential V is qV; the energy of a system is that
    work summed over the steps of assembling it.
- **Unlocks** (from KG): none listed. System energy underlies capacitor energy
  (`phys.em.energy-capacitor`), binding energy in the atom (`phys.mod.bohr-model`),
  and lattice energies in chemistry.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 2 (Electrostatic Potential and Capacitance)

## Learning Objective

After this concept, the learner can:

1. Define the potential energy of a system of charges as the work needed to
     assemble it from infinity.
2. Compute U = kq₁q₂/r for a pair and sum over distinct pairs for several charges.
3. Interpret the sign of U (like charges positive, unlike negative; bound systems).
4. Compute the work to rearrange charges as a change in U.

## Core Understanding

Pushing two like charges toward each other takes work, and that work is stored. Where? Not in either charge, but in the arrangement — the system. The electrostatic potential energy of a system is defined as the work an external agent must do to assemble it slowly from charges that start infinitely far apart. Bring in the first charge: there is no field yet, so it costs nothing. Bring the second, q₂, to distance r from q₁: it must be moved to a point where q₁ makes potential kq₁/r, costing q₂ × kq₁/r. So a pair stores U = kq₁q₂/r. For +2 μC and +3 μC, 0.3 m apart, U = 9 × 10⁹ × 6 × 10⁻¹² / 0.3 = 0.18 J.

With three or more charges, keep assembling one at a time. The third charge is pushed against both of the first two, so its step costs U₁₃ + U₂₃. The total is a sum over every distinct pair, each counted exactly once: for three equal charges at the corners of an equilateral triangle of side a, U = 3kq²/a, not 6kq²/a. In general n charges have n(n − 1)/2 pairs. Summing "each charge's energy with every other charge" counts every pair twice.

The sign matters. For like charges q₁q₂ > 0, so U > 0: work had to be done to push them together, and if released they fly apart, turning that stored energy into kinetic energy. For unlike charges U < 0: they pull together on their own, and an external agent must supply |U| to pull them apart — the system is bound. The electron and proton in a hydrogen atom, about 5.3 × 10⁻¹¹ m apart, have negative potential energy, which is why the atom holds together. Moving charges changes U, and the external work needed is the change: bringing the +2 μC and +3 μC from 0.3 m to 0.1 m apart takes 0.54 − 0.18 = 0.36 J.

## Mental Models

- **Beginner (arriving)**: energy belongs to a charge, like the energy of a ball
  on a shelf; energy is always positive.
- **Intermediate**: U belongs to the system; it is the assembly work; sum over
  pairs once each; the sign tells whether the system flies apart or is bound.
- **Advanced**: U = ½ Σ qᵢVᵢ (the ½ undoes the double count); the energy can be
  located in the field, u = ½ε₀E²; interaction energy of a charge in an external
  field is qV.
- **Expert**: self-energy of point charges diverges; real systems use the
  interaction energy only; lattice (Madelung) sums and nuclear binding energies
  follow the same pair logic.
- **Versioning note**: install the intermediate model; name the ½ Σ qV form as the
  formal reason for counting pairs once.

## Why Students Fail

The everyday picture of potential energy (a ball on a shelf) attaches energy to one
object, which leads to summing per charge and counting each pair twice. Signs are
dropped because "energy" sounds positive, and then attraction and repulsion look
the same. And V (per unit charge) is confused with U (energy).

## Misconceptions

**M1 — Add up every charge's energy with every other charge**
- *Why*: energy pictured as belonging to each object (type 4, transfer from
  gravitational PE of a single body).
- *Symptom / phrases*: "each charge interacts with two others, so 6kq²/a".
- *Detection probe (verbatim)*: "Three equal charges q sit at the corners of an
  equilateral triangle of side a. What is the electrostatic potential energy of
  the system?"
- *Recovery*: assemble one charge at a time — 0, kq²/a, 2kq²/a — total 3kq²/a.
- *Verification*: pair counts for three, four and five charges.

**M2 — Electrostatic potential energy is always positive**
- *Why*: "energy" sounds positive; magnitudes are habitual (type 2/5).
- *Symptom*: adds magnitudes; U > 0 for an attracting pair.
- *Detection probe*: "A +q and a −q are held 1 cm apart. Is U positive or negative,
  and what happens when they are released?"
- *Recovery*: as they rush together their kinetic energy rises, so U must fall —
  from a negative value to a more negative one.
- *Verification*: sign and behaviour for four pairs.

**M3 — Potential and potential energy are the same thing**
- *Why*: similar names (type 4, surface feature).
- *Symptom*: gives volts for U or joules for V.
- *Detection probe*: "A point is at 100 V. What is the potential energy of a 2 μC
  charge there?"
- *Recovery*: V is energy per unit charge; U = qV = 2 × 10⁻⁴ J.
- *Verification*: three unit-checked items.

## Analogies

- **Best analogy**: compressing springs between pairs of people — every pair joined
  by a spring stores energy once; to find the total, count the springs, not the
  people.
  *Breaking point*: springs store only positive energy; unlike charges are like
  stretched rubber bands that pull together (negative U relative to infinity).
- **Alternative**: gravitational binding of the Earth–Moon pair — negative energy
  means bound.
  *Breaking point*: gravity never repels.
- **Anti-analogy to avoid**: "each charge has its own potential energy, like each
  ball on a shelf." It installs M1.

## Demonstrations

- **Home**: two ring magnets on a pencil — the upper one floats; pushing it down
  takes work that it returns on release.
- **Teacher demo**: a simulation assembling charges one by one with a running
  work counter.
- **Prediction before demo**: "how much does the first charge cost?"

## Discovery Questions

**Structure**:
1. *Need*: "Pushing two like charges together costs work. Where does it go?"
2. *Discovery*: assemble two, then three charges step by step; tally the work.
3. *Direct instruction*: U = kq₁q₂/r and pair summation.
4. *Apply*: signs, bound systems, rearrangement work.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Worked examples** (primary): the pair (0.18 J); the triangle (3kq²/a); the
   rearrangement (0.36 J).
2. **Error exposure** (high fit for M1/M2): step-by-step assembly; the releasing
   opposite charges.
3. **Practice** (high fit): squares, lines and mixed-sign arrangements.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Pair: 9 × 10⁹ × 6 × 10⁻¹² / 0.3 = 0.18 J.
   (b) Triangle: 0 + kq²/a + 2kq²/a = 3kq²/a.
   (c) Rearrangement: 0.54 − 0.18 = 0.36 J.

2. **ERROR-ANALYSIS** — a student writes 6kq²/a for the triangle. Ask them to
   assemble it one charge at a time.

3. **PREDICTION-BEFORE-DEMO** — before releasing opposite charges in the
   simulation, ask whether U rises or falls.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "U for a pair" → "pairs for five charges" → "sign for hydrogen".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "the energy of the system" and
"each pair once"; always keeps the sign when substituting; distinguishes "volts" (V)
from "joules" (U) aloud.

*Load-bearing sentence to slow down on*: "The energy belongs to the arrangement, and
each pair of charges is paid for exactly once."

*What to listen for*: per-charge summing → M1; magnitudes only → M2; V and U
swapped → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Three equal charges q at the corners of an
equilateral triangle of side a. U?" Correct: 3kq²/a.

**Distractor-mapped items**:
- "Triangle U?" Options: kq²/a, 3kq²/a, 6kq²/a, 9kq²/a. Answer: 3kq²/a. "6kq²/a"
  targets M1.
- "+q and −q — sign of U?" Options: positive, negative, zero, depends on which is
  moved. Answer: negative. "Positive" targets M2.

**Guided practice → independent practice fading ladder**:
1. Pair energies (3 items).
2. Pair counting (3 items).
3. Three- and four-charge sums with signs (3 items).
4. Rearrangement work (2 items).
5. (Unscaffolded) an arrangement with zero total U.

**Mastery gate set** (per assessment/05):
- *Production*: one pair and one three-charge calculation.
- *New surface*: the hydrogen atom.
- *Mixed*: sign items interleaved with calculations.
- *Delayed*: one-week check — "where is the energy stored?"

**Calibration note**: the pair formula is easy; the check that reveals
miscalibration is the three-charge sum.

## Tutor Recovery Strategy

*Likeliest utterance*: "each charge has two neighbours, so six terms" (M1).

*Concept-specific smaller question*: "Bring the charges in one at a time. How much
work for the first? The second? The third?"

*M2 recovery*: "If U were positive for opposite charges, which way would they move
when released?"

## Memory Hooks

- **Concept type**: definition (assembly work) + procedure (pair sum).
- **Review form** (per Delivery 2 §8): pair-counting drills as spaced retrieval;
  sign interpretation as contrast pairs.
- **Automaticity target**: "sum over pairs, keep signs" before capacitor energy and
  atomic models.
- **Interleaving partners**: `phys.em.electric-potential`, `phys.em.coulombs-law`,
  `phys.em.energy-capacitor`.

## Transfer Connections

- *Near*: `phys.em.energy-capacitor` — energy stored in separated charges.
- *Near*: `phys.mod.bohr-model` — negative potential energy of the bound electron.
- *Far*: nuclear binding energy — the same bookkeeping for nucleons.
- *Real-world*: why lightning releases energy; electrostatic precipitators.
- *Expert transfer*: lattice energy (Madelung sums), molecular dynamics force fields.

## Cross-Subject Connections

- **Chemistry**: lattice energy of ionic crystals; bond energies; why ions attract.
- **Mathematics**: combinations — n(n − 1)/2 pairs; summation notation.
- **Biology**: electrostatic interactions in protein folding and DNA base pairing.
- **Engineering**: insulation breakdown and stored energy in charged systems.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.electrostatic-potential-energy.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 22). The potential energy of
a system of charges had zero hits in the physics corpus before this node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

# Cp, Cv, Mayer's Relation and Gamma — `phys.therm.specific-heats-of-gases`

## Identity

- **Concept ID**: `phys.therm.specific-heats-of-gases`
- **Curriculum location**: physics / thermodynamics (gases)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.therm.first-law` — the load-bearing part is Q = ΔU + W and the work done by
    an expanding gas, W = pΔV; its chain (`phys.therm.internal-energy`,
    `phys.therm.kinetic-theory`) supplies U as a function of temperature only and the
    equipartition of energy among degrees of freedom.
- **Unlocks** (from KG): none listed. Leads to adiabatic processes (pV^γ = constant),
  the speed of sound in gases and engine cycles.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Ch. 12–13 (Thermodynamics; Kinetic Theory)

## Learning Objective

After this concept, the learner can:

1. Define the molar heat capacities Cv and Cp.
2. Derive Mayer's relation Cp − Cv = R from the first law.
3. Predict Cv, Cp and γ for monatomic and diatomic gases from equipartition.
4. Compute the heat needed at constant volume and at constant pressure.

## Core Understanding

The heat needed to warm a gas depends on what it is allowed to do while it warms. The molar heat capacity at constant volume, Cv, is the heat per mole per kelvin when the gas is sealed in a rigid container. Nothing moves, so no work is done, and by the first law all the heat goes into internal energy: Q = nCvΔT = ΔU. The molar heat capacity at constant pressure, Cp, is the heat per mole per kelvin when the gas pushes a free piston and expands. The internal energy of an ideal gas depends only on its temperature, so it rises by the same nCvΔT — but the gas also does work W = pΔV, which for an ideal gas at constant pressure is nRΔT. So nCpΔT = nCvΔT + nRΔT, and Cp − Cv = R (Mayer's relation). Gases therefore have two heat capacities, and Cp is always larger by exactly R ≈ 8.31 J mol⁻¹ K⁻¹. For solids and liquids the expansion is tiny, which is why a single "specific heat" serves for them.

Kinetic theory predicts Cv. Each degree of freedom — each independent way a molecule can hold energy — carries on average ½kT, or ½RT per mole. A monatomic gas such as helium or argon can only move in three directions: U = (3/2)RT per mole, so Cv = 1.5R ≈ 12.5 J mol⁻¹ K⁻¹ and Cp = 2.5R ≈ 20.8. A diatomic molecule such as nitrogen or oxygen can also rotate about two axes, giving five degrees of freedom near room temperature: Cv = 2.5R ≈ 20.8 and Cp = 3.5R ≈ 29.1 J mol⁻¹ K⁻¹. The ratio γ = Cp/Cv = 1 + 2/f is therefore 5/3 ≈ 1.67 for monatomic gases and 7/5 = 1.40 for diatomic ones, including air — the value often memorised is not universal.

For example, warming 2 mol of nitrogen by 10 K needs 2 × 20.8 × 10 ≈ 416 J at constant volume but 2 × 29.1 × 10 ≈ 582 J at constant pressure. The extra 166 J is exactly nRΔT, the work the gas does pushing the piston back. γ matters wherever a gas is compressed or expanded quickly: it sets how much the gas heats in an adiabatic compression and how fast sound travels through it.

## Mental Models

- **Beginner (arriving)**: a substance has one specific heat; γ = 1.4.
- **Intermediate**: Cv (no work) and Cp = Cv + R (with expansion work); Cv = (f/2)R;
  γ = 1 + 2/f: 5/3 monatomic, 7/5 diatomic.
- **Advanced**: vibrational modes switch on at high temperature, raising Cv of
  diatomic gases towards 3.5R; adiabatic pV^γ = constant.
- **Expert**: quantum freezing of degrees of freedom; heat capacities of solids
  (Dulong–Petit, Einstein, Debye).
- **Versioning note**: install the intermediate model at room temperature; mention
  that vibration adds degrees of freedom when hot.

## Why Students Fail

"Specific heat" is learned as a single property of a substance, so the dependence on
conditions is surprising. Mayer's relation is memorised without the work term that
produces it. And γ = 1.4 for air is generalised to all gases.

## Misconceptions

**M1 — A gas has a single heat capacity whatever the conditions**
- *Why*: specific heat of solids and liquids transferred (type 4).
- *Symptom / phrases*: "it takes the same heat either way".
- *Detection probe (verbatim)*: "Does it take the same heat to warm a gas by 10 K in
  a sealed rigid can as in a cylinder with a freely moving piston?"
- *Recovery*: the piston lifts a weight — that energy must come from the heat.
- *Verification*: two heat calculations at constant V and constant p.

**M2 — γ is the same (1.4) for every gas**
- *Why*: the value for air memorised (type 5).
- *Symptom*: uses 1.4 for helium.
- *Detection probe*: "Is γ = Cp/Cv the same for helium and for nitrogen?"
- *Recovery*: count degrees of freedom; γ = 1 + 2/f.
- *Verification*: a table of f, Cv, Cp and γ for three gases.

**M3 — Cp − Cv = R holds for solids and liquids too**
- *Why*: the relation applied outside its ideal-gas derivation (type 5).
- *Symptom*: expects water's Cp and Cv to differ by 8.3 J mol⁻¹ K⁻¹.
- *Detection probe*: "For a solid or liquid, why is Cp ≈ Cv?"
- *Recovery*: pΔV = nRΔT is an ideal-gas result; solids barely expand.
- *Verification*: classify where Mayer's relation applies.

## Analogies

- **Best analogy**: a budget — at constant volume every joule of heat is "saved" as
  internal energy; at constant pressure part is "spent" on pushing the piston, so you
  need a bigger income for the same savings.
  *Breaking point*: energy is conserved, not spent; the work goes to the
  surroundings.
- **Alternative**: more pockets to fill — a diatomic molecule has more places (degrees
  of freedom) to put energy, so it needs more heat per kelvin.
  *Breaking point*: degrees of freedom are not literal containers.
- **Anti-analogy to avoid**: "heat capacity is like density — a fixed property of the
  material." It installs M1.

## Demonstrations

- **Home**: feel a bicycle pump get warm when you compress air quickly (adiabatic
  heating, governed by γ).
- **Teacher demo**: heat equal amounts of air in a sealed flask with a pressure gauge
  and in a syringe with a free plunger; compare temperature rises for the same heater
  time.
- **Prediction before demo**: "which will get hotter for the same heat?"

## Discovery Questions

**Structure**:
1. *Need*: "Why does the same heat warm a sealed gas more than a free one?"
2. *Discovery*: the two energy-flow diagrams.
3. *Direct instruction*: Cv, Cp, Mayer's relation, equipartition and γ.
4. *Apply*: heat calculations, γ for different gases.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the can and the piston.
2. **Worked examples** (high fit): 2 mol N₂, +10 K: 416 J vs 582 J; γ = 5/3 and 7/5.
3. **Error exposure** (high fit for M1/M2): the lifted weight; helium vs nitrogen.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Constant V: Q = 2 × 2.5R × 10 ≈ 416 J.
   (b) Constant p: Q = 2 × 3.5R × 10 ≈ 582 J; difference nRΔT ≈ 166 J.
   (c) Helium: Cv = 1.5R, Cp = 2.5R, γ = 5/3.

2. **ERROR-ANALYSIS** — a student says the heat is the same either way. Ask who did
   the work of lifting the piston.

3. **PREDICTION-BEFORE-DEMO** — before the flask-and-syringe demo, ask which gets
   hotter.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "state Mayer's relation" → "Cv, Cp, γ for argon" → "heat for 1 mol O₂ +20 K at
   constant p".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor asks "is the gas allowed to expand?" before
choosing C; derives the R from pΔV aloud; counts degrees of freedom on fingers.

*Load-bearing sentence to slow down on*: "At constant pressure the gas warms AND does
work, so it needs more heat — exactly R more per mole per kelvin."

*What to listen for*: "same heat either way" → M1; "γ is 1.4" for helium → M2;
Mayer for liquids → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Same heat to warm a gas by 10 K in a sealed can and
with a free piston?" Correct: more with the piston.

**Distractor-mapped items**:
- "Heat for 2 mol N₂, +10 K at constant p?" Options: ≈ 582 J, ≈ 416 J, ≈ 166 J,
  ≈ 249 J. Answer: ≈ 582 J. "≈ 416 J" targets M1.
- "γ for helium?" Options: 1.67, 1.40, 1.33, 1.00. Answer: 1.67. "1.40" targets M2.

**Guided practice → independent practice fading ladder**:
1. Cv/Cp definitions (2 items).
2. Mayer's relation (3 items).
3. Degrees of freedom and γ (3 items).
4. Heat at constant V vs p (3 items).
5. (Unscaffolded) design a measurement showing Cp ≠ Cv.

**Mastery gate set** (per assessment/05):
- *Production*: one constant-V and one constant-p heat calculation.
- *New surface*: speed of sound in helium.
- *Mixed*: γ items interleaved with Mayer items.
- *Delayed*: one-week check — "why is Cp > Cv?"

**Calibration note**: learners recite Cp − Cv = R; the check that reveals
miscalibration is "where does the R come from?"

## Tutor Recovery Strategy

*Likeliest utterance*: "it takes the same heat either way" (M1).

*Concept-specific smaller question*: "When the piston rises and lifts a weight, where
does that energy come from?"

*M2 recovery*: "Can a helium atom store energy by rotating? Can nitrogen?"

## Memory Hooks

- **Concept type**: law (Mayer) + model (equipartition).
- **Review form** (per Delivery 2 §8): Mayer and γ values as spaced retrieval; heat
  calculations as distributed practice.
- **Automaticity target**: "Cp = Cv + R; Cv = (f/2)R; γ = 1 + 2/f".
- **Interleaving partners**: `phys.therm.first-law`, `phys.therm.kinetic-theory`,
  `phys.therm.thermodynamic-processes`.

## Transfer Connections

- *Near*: `phys.therm.thermodynamic-processes` — adiabatic pV^γ = constant.
- *Near*: `phys.therm.kinetic-theory` — equipartition.
- *Far*: speed of sound in gases, v = √(γRT/M).
- *Real-world*: diesel-engine compression ignition, bicycle pumps warming, weather
  (adiabatic lapse rate).
- *Expert transfer*: quantum freezing of degrees of freedom.

## Cross-Subject Connections

- **Chemistry**: molar heat capacities, enthalpy at constant pressure.
- **Meteorology**: adiabatic cooling of rising air.
- **Engineering**: engine compression ratios.
- **Mathematics**: ratios and fractions; linear relations.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.therm.specific-heats-of-gases.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 13). The audit listed
`phys.therm.first-law` and `phys.therm.kinetic-theory`; only `phys.therm.first-law` is
kept, because it already reaches `phys.therm.kinetic-theory` through
`phys.therm.internal-energy` (KGCS P2, transitive reduction). It is placed after
`phys.therm.thermodynamic-processes` in lesson order. Cp, Cv and Mayer's relation had zero
hits in the physics corpus before this node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

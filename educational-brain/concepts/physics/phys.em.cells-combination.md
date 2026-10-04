# Cells in Series and Parallel — `phys.em.cells-combination`

## Identity

- **Concept ID**: `phys.em.cells-combination`
- **Curriculum location**: physics / electricity and magnetism (DC circuits)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.emf` — the load-bearing part is a real cell as an ideal emf E in
    series with an internal resistance r, so that I = E/(R + r) and the terminal
    voltage is E − Ir. Combining cells means combining emfs and internal
    resistances; without internal resistance the series/parallel choice is
    meaningless.
- **Unlocks** (from KG): none listed. Battery packs, power banks, solar panel
  strings and car batteries all use these rules.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 3 (Current Electricity)

## Learning Objective

After this concept, the learner can:

1. Combine identical cells in series (nE, nr) and in parallel (E, r/m).
2. Compute the current through a load for each arrangement.
3. Choose the arrangement by comparing the load R with the internal resistance r.
4. Explain why parallel cells share current and last longer.

## Core Understanding

A real cell behaves like an ideal emf E with a small internal resistance r inside it. Connect n identical cells in series — positive to negative, end to end — and both add: the emf is nE and the internal resistance nr, so through a load R the current is I = nE / (R + nr). Four 1.5 V cells with r = 0.5 Ω each give 6 V and 2 Ω; with a 10 Ω lamp the current is 6 / 12 = 0.50 A.

Connect m identical cells in parallel — all positive terminals joined, all negative terminals joined — and the emf does NOT add. The two wires are each connected to every cell, so the potential difference between them is that of any one cell: E. What changes is the internal resistance: m equal paths in parallel give r/m. The same four cells in parallel give 1.5 V and 0.125 Ω, so the 10 Ω lamp gets 1.5 / 10.125 ≈ 0.15 A — but each cell supplies only a quarter of it, about 0.037 A, so a parallel pack lasts longer.

Which arrangement gives the bigger current depends on the load. With the 10 Ω lamp, R is much larger than the internal resistances, so the extra emf of series wins (0.50 A vs 0.15 A). With a 0.1 Ω load, the internal resistance is most of the circuit: series gives 6 / 2.1 ≈ 2.9 A while parallel gives 1.5 / 0.225 ≈ 6.7 A. The rule: series when R ≫ r, parallel when R ≪ r. Cells in parallel must be matched and the same way round; a reversed cell drives a large current round the loop between the cells, wasting energy as heat.

## Mental Models

- **Beginner (arriving)**: more cells = more voltage, however they are wired.
- **Intermediate**: series adds emf and internal resistance; parallel keeps emf and
  divides internal resistance; the load decides which gives more current.
- **Advanced**: mixed groupings (rows of series cells in parallel); maximum current
  when external R equals the internal resistance of the arrangement; maximum power
  transfer at R = r_total.
- **Expert**: real battery packs balance cells to avoid circulating currents;
  internal resistance rises as cells age and in the cold, which is why a weak car
  battery fails on a winter morning.
- **Versioning note**: install the intermediate model; mention mixed groupings only
  as an extension.

## Why Students Fail

"More cells, more volts" is overgeneralised from torches, where cells are in
series. Internal resistance is treated as a correction to ignore, so series always
looks better. And the parallel wiring is not traced terminal by terminal, so the
"same potential difference" argument is never seen.

## Misconceptions

**M1 — Cells in parallel add their emfs**
- *Why*: series experience generalised (type 4, overgeneralisation).
- *Symptom / phrases*: "four 1.5 V cells in parallel make 6 V".
- *Detection probe (verbatim)*: "Four identical 1.5 V cells are connected in
  parallel. What is the emf of the combination?"
- *Recovery*: a voltmeter across the two common wires measures across any one cell
  — 1.5 V.
- *Verification*: emf and internal resistance for three groupings.

**M2 — Series always gives the bigger current**
- *Why*: emf considered alone (type 5, internal resistance treated as negligible).
- *Symptom*: chooses series for a 0.1 Ω load.
- *Detection probe*: "For a load of only 0.1 Ω, which gives more current: four cells
  (r = 0.5 Ω each) in series or in parallel?"
- *Recovery*: compute both: 2.9 A vs 6.7 A.
- *Verification*: two loads, both arrangements, and the R vs r rule.

**M3 — Parallel cells each push the full current**
- *Why*: "each cell drives the circuit" (type 4).
- *Symptom*: says each parallel cell supplies 0.15 A.
- *Detection probe*: "Four cells in parallel deliver 0.15 A to a lamp. How much does
  each cell supply?"
- *Recovery*: by symmetry the current divides equally: about 0.037 A each — why
  parallel packs last longer.
- *Verification*: one sharing item and one lifetime comparison.

## Analogies

- **Best analogy**: water pumps — pumps in series stack their pressure (emf adds) but
  each pump's narrow pipe adds resistance; pumps side by side give the pressure of
  one but many pipes in parallel (lower resistance, more flow when the outside pipe
  is wide).
  *Breaking point*: real pumps have flow-dependent pressure; keep to the qualitative
  trade.
- **Alternative**: rowers in a line (series: speed adds) versus rowers side by side
  each with their own oar (parallel: share the load).
  *Breaking point*: rowers' effort isn't a fixed "emf".
- **Anti-analogy to avoid**: "every cell adds 1.5 V to the circuit." It installs M1.

## Demonstrations

- **Home**: read the voltage on a battery pack and count its cells; look at how a
  remote's cells are arranged.
- **Teacher demo**: four cells, a voltmeter and an ammeter — measure emf in series
  and parallel; then drive a 10 Ω resistor and a thick short wire (briefly) each way.
- **Prediction before demo**: "what will the voltmeter read across four cells in
  parallel?"

## Discovery Questions

**Structure**:
1. *Need*: "Why does a power bank list many cells but only 3.7 V?"
2. *Discovery*: trace the parallel wiring terminal by terminal; measure.
3. *Direct instruction*: the combination formulas.
4. *Apply*: choose packs for different loads.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Worked examples** (primary): 10 Ω and 0.1 Ω loads, both arrangements.
2. **Error exposure** (high fit for M1/M2): the voltmeter across parallel cells; the
   0.1 Ω comparison.
3. **Practice** (high fit): pack design problems.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Series, 10 Ω: 6 / (10 + 2) = 0.50 A.
   (b) Parallel, 10 Ω: 1.5 / 10.125 ≈ 0.15 A (≈ 0.037 A per cell).
   (c) 0.1 Ω load: series ≈ 2.9 A, parallel ≈ 6.7 A.

2. **ERROR-ANALYSIS** — a student writes "parallel: 6 V / (10 + 0.125) Ω". Ask what
   the voltmeter across the common wires reads.

3. **PREDICTION-BEFORE-DEMO** — before connecting the thick wire, ask which
   arrangement drives more current.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "emf and r for three cells each way" → "10 Ω currents" → "when does parallel win?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor always states two things per
arrangement — emf and internal resistance; asks "is R much bigger or much smaller
than r?" before choosing.

*Load-bearing sentence to slow down on*: "In parallel the emf stays that of one
cell — what changes is the internal resistance."

*What to listen for*: "parallel gives 6 V" → M1; "series is always better" → M2;
"each cell gives the full current" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Four identical 1.5 V cells are connected in parallel.
What is the emf of the combination?" Correct: 1.5 V.

**Distractor-mapped items**:
- "Parallel emf?" Options: 1.5 V, 6 V, 0.375 V, 3 V. Answer: 1.5 V. "6 V" targets M1.
- "0.1 Ω load — which gives more current?" Options: series, parallel, equal, neither.
  Answer: parallel. "Series" targets M2.

**Guided practice → independent practice fading ladder**:
1. Combined emf and internal resistance (4 items).
2. Currents for series (3 items).
3. Currents for parallel (3 items).
4. Choice by R vs r (3 items).
5. (Unscaffolded) design packs for two loads.

**Mastery gate set** (per assessment/05):
- *Production*: both currents for two loads.
- *New surface*: a car battery or a power bank.
- *Mixed*: emf items interleaved with current items.
- *Delayed*: one-week check — the R vs r rule.

**Calibration note**: series formulas feel easy; the check that reveals
miscalibration is the parallel emf.

## Tutor Recovery Strategy

*Likeliest utterance*: "more cells, more volts" (M1).

*Concept-specific smaller question*: "In parallel, which two points does the
voltmeter connect? Is that across one cell or across four?"

*M2 recovery*: "With a 0.1 Ω load, what fraction of the total resistance is inside
the cells in series?"

## Memory Hooks

- **Concept type**: procedure (combination rules) + principle (internal resistance
  decides).
- **Review form** (per Delivery 2 §8): combination drills as spaced retrieval; the
  two-load table as a contrast pair.
- **Automaticity target**: "series: nE, nr; parallel: E, r/m" before power-transfer
  problems.
- **Interleaving partners**: `phys.em.emf`, `phys.em.dc-circuits`,
  `phys.em.kirchhoffs-laws`.

## Transfer Connections

- *Near*: `phys.em.kirchhoffs-laws` — unequal cells in parallel need Kirchhoff's
  loop rule.
- *Near*: `phys.em.electrical-power` — power delivered and wasted inside the cells.
- *Far*: solar panels wired in strings (series) and arrays (parallel).
- *Real-world*: torches, remotes, power banks, car and inverter batteries.
- *Expert transfer*: battery management systems in electric vehicles.

## Cross-Subject Connections

- **Chemistry**: each cell's emf comes from its electrode reactions (electrochemical
  series); internal resistance from the electrolyte.
- **Engineering**: designing battery packs for voltage and capacity.
- **Mathematics**: harmonic sums for parallel resistances.
- **Environment**: battery recycling and lifetime.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.cells-combination.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 24). Cell combinations had
zero hits in the physics corpus. The audit's second prerequisite,
`phys.em.dc-circuits`, is implied by `phys.em.emf` and omitted (KGCS P2).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

# Power in AC Circuits, Power Factor and Wattless Current — `phys.em.ac-power`

## Identity

- **Concept ID**: `phys.em.ac-power`
- **Curriculum location**: physics / electricity and magnetism (alternating current)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.lcr-circuits` — the load-bearing part is the phase angle φ between current
    and supply voltage and the impedance triangle, which gives cos φ = R/Z.
- **Unlocks** (from KG): none listed. Leads to power distribution, power-factor
  correction and transformer efficiency.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 7 (Alternating Current)

## Learning Objective

After this concept, the learner can:

1. Explain why average AC power depends on the phase angle.
2. Compute P = V_rms I_rms cos φ and the power factor cos φ = R/Z.
3. Distinguish real power (W) from apparent power (VA).
4. Explain wattless current and why a low power factor wastes transmission capacity.

## Core Understanding

In a resistor, current and voltage rise and fall together, so the power p = vi is positive all the time and its average is V_rms I_rms. When the current is out of step with the voltage by an angle φ, the product vi turns negative for part of every cycle: during those moments the circuit hands energy BACK to the supply, as an inductor's magnetic field or a capacitor's electric field gives up what it stored. Averaged over a cycle, the power actually taken is P = V_rms I_rms cos φ. The factor cos φ is the power factor; from the impedance triangle cos φ = R/Z. Only the resistance dissipates energy, so equivalently P = I_rms² R.

For the series circuit with R = 40 Ω, Z = 50 Ω on 200 V rms, the current is 4 A, the power factor is 40/50 = 0.8 and the power is 200 × 4 × 0.8 = 640 W — the same as 4² × 40. The product V_rms I_rms = 800 VA is the apparent power: what the wires and generator must carry, larger than what is used. At series resonance Z = R, so cos φ = 1 and all of the apparent power is real power.

In a pure inductor or a pure capacitor, φ = 90° and cos φ = 0: a current flows — 2.5 A through an 80 Ω inductor on 200 V — but the average power is zero. Such a current is called wattless. It is not "no current": it really flows through the supply cables and heats them (I²R in the wires), while delivering nothing on average to the load. That is why a poor power factor is costly. A motor needing 640 W at 200 V draws 4 A at power factor 0.8 but only 3.2 A at power factor 1; the cable losses, proportional to I², are about 1.56 times larger at 0.8. Factories with many inductive motors therefore add capacitors, whose reactance cancels part of the motors' inductive reactance and pulls the power factor towards 1 — power-factor correction.

## Mental Models

- **Beginner (arriving)**: P = VI always; a current that does no work is no current.
- **Intermediate**: P = V_rms I_rms cos φ = I²R; cos φ = R/Z; apparent vs real power;
  wattless current is real current with zero average power.
- **Advanced**: reactive power Q = V_rms I_rms sin φ (var); the power triangle
  (S² = P² + Q²); three-phase power.
- **Expert**: grid-level reactive-power compensation; harmonics and distortion power
  factor in switch-mode loads.
- **Versioning note**: install the intermediate model; name reactive power only as
  the third side of the power triangle.

## Why Students Fail

Learners carry P = VI from DC. "Wattless" is read literally as "no current". And the
negative parts of the power curve are unfamiliar, so energy flowing back to the
supply sounds impossible.

## Misconceptions

**M1 — AC power is always V_rms × I_rms**
- *Why*: the DC formula transferred (type 4).
- *Symptom / phrases*: "200 V × 4 A = 800 W".
- *Detection probe (verbatim)*: "An AC circuit carries 4 A rms at 200 V rms, with the
  current lagging the voltage by 37° (cos φ = 0.8). What average power does it take?"
- *Recovery*: the cold inductor carrying 2.5 A.
- *Verification*: three power calculations with different power factors.

**M2 — A wattless current is no current at all**
- *Why*: the name taken literally (type 1, vocabulary).
- *Symptom*: "no current flows through a pure inductor on AC".
- *Detection probe*: "A pure inductor connected to 200 V AC carries 2.5 A. Is current
  flowing? What average power does it take?"
- *Recovery*: the ammeter reading; the cables heating.
- *Verification*: explain power-factor penalties.

**M3 — Reactive components dissipate energy like resistors**
- *Why*: every component in a circuit assumed to "use up" energy (type 2).
- *Symptom*: computes I²X_L as a heat loss.
- *Detection probe*: "Which component in an LCR circuit turns electrical energy into
  heat?"
- *Recovery*: L and C store and return energy each cycle.
- *Verification*: P = I²R check on two circuits.

## Analogies

- **Best analogy**: a beer glass — the beer is the real power you drink, the foam is
  the reactive part; you pay to carry the whole glass (apparent power).
  *Breaking point*: foam is not returned to the bar; reactive energy IS returned to
  the supply each cycle.
- **Alternative**: pushing a swing out of rhythm — some pushes help, some fight it;
  on average little work goes in.
  *Breaking point*: qualitative only.
- **Anti-analogy to avoid**: "wattless means currentless." It installs M2.

## Demonstrations

- **Home**: look at the label on a fluorescent fitting or motor — power factor or
  "cos φ" is often printed.
- **Teacher demo**: wattmeter and ammeter on a lamp vs an inductor; the inductor draws
  current but the wattmeter barely moves; add a capacitor and the current falls while
  the power stays.
- **Prediction before demo**: "with the capacitor added, will the current go up or
  down?"

## Discovery Questions

**Structure**:
1. *Need*: "Why are factories charged for a poor power factor?"
2. *Discovery*: the v, i and p curves; the wattmeter vs ammeter.
3. *Direct instruction*: P = V I cos φ, cos φ = R/Z, wattless current.
4. *Apply*: transmission losses and correction.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the power-factor penalty.
2. **Worked examples** (high fit): 640 W from 800 VA; 4 A vs 3.2 A.
3. **Error exposure** (high fit for M1/M2): the cold inductor; the ammeter reading.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) R = 40, Z = 50, 200 V: I = 4 A, cos φ = 0.8, P = 640 W = 4² × 40.
   (b) Pure inductor X_L = 80 Ω: I = 2.5 A, P = 0.
   (c) 640 W at 200 V: 4 A at cos φ = 0.8 vs 3.2 A at cos φ = 1; losses ×1.56.

2. **ERROR-ANALYSIS** — a student answers 800 W. Ask for the inductor's temperature.

3. **PREDICTION-BEFORE-DEMO** — before adding the capacitor, ask current up or down.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "AC power formula" → "230 V, 5 A, cos φ = 0.6" → "what is a wattless current?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "real power" and "apparent power"
separately; insists the wattless current really flows; links cos φ back to R/Z.

*Load-bearing sentence to slow down on*: "For part of each cycle the circuit hands
energy back to the supply — that is why the average is V I cos φ."

*What to listen for*: "V times I" → M1; "no current" → M2; I²X_L as heat → M3.

## Assessment Signals

**Diagnostic — golden probe**: "200 V rms, 4 A rms, cos φ = 0.8. Average power?"
Correct: 640 W.

**Distractor-mapped items**:
- "Average power?" Options: 640 W, 800 W, 480 W, 0 W. Answer: 640 W. "800 W" targets
  M1.
- "Pure inductor, 2.5 A on 200 V: is current flowing?" Options: yes, 2.5 A, with zero
  average power; no current flows; 500 W is dissipated. Answer: the first. "No
  current" targets M2; "500 W" targets M1.

**Guided practice → independent practice fading ladder**:
1. Power factor from R/Z (3 items).
2. Average power (3 items).
3. Wattless-current scenarios (2 items).
4. Line current for a given power at two power factors (2 items).
5. (Unscaffolded) propose a power-factor correction.

**Mastery gate set** (per assessment/05):
- *Production*: one power and one current-at-power-factor calculation.
- *New surface*: a factory bill.
- *Mixed*: real vs apparent power items interleaved.
- *Delayed*: one-week check — wattless current.

**Calibration note**: learners can apply V I cos φ; the check that reveals
miscalibration is the wattless-current question.

## Tutor Recovery Strategy

*Likeliest utterance*: "200 times 4, so 800 watts" (M1).

*Concept-specific smaller question*: "Does a pure inductor get hot?"

*M2 recovery*: "What does the ammeter in series with the inductor read?"

## Memory Hooks

- **Concept type**: principle (phase in power) + application (power-factor
  correction).
- **Review form** (per Delivery 2 §8): P = V I cos φ as spaced retrieval; scenarios
  as distributed practice.
- **Automaticity target**: "only R dissipates; cos φ = R/Z".
- **Interleaving partners**: `phys.em.lcr-circuits`, `phys.em.electrical-power`,
  `phys.em.domestic-electricity`.

## Transfer Connections

- *Near*: `phys.em.lcr-circuits` — the impedance triangle.
- *Near*: `phys.em.electrical-power` — P = I²R.
- *Far*: power-grid reactive compensation.
- *Real-world*: electricity tariffs, motor capacitors, fluorescent-lamp ballasts.
- *Expert transfer*: harmonic distortion in modern electronic loads.

## Cross-Subject Connections

- **Mathematics**: averaging sinusoids; cos of a phase angle.
- **Economics**: electricity tariffs and penalties.
- **Engineering**: grid design and transmission losses.
- **Technology**: power supplies with active power-factor correction.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.ac-power.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 27). AC power with a power factor
was not taught by any node before this one.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

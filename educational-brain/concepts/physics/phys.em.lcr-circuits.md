# Series LCR Circuit: Impedance, Resonance and Q Factor — `phys.em.lcr-circuits`

## Identity

- **Concept ID**: `phys.em.lcr-circuits`
- **Curriculum location**: physics / electricity and magnetism (alternating current)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.lc-circuits` — the load-bearing part is the natural frequency
    ω₀ = 1/√(LC) and the energy swing between inductor and capacitor; its own
    prerequisites (`phys.em.ac-basics`, `phys.em.self-inductance`,
    `phys.em.capacitance`) supply rms values, back-emf and charge storage.
- **Unlocks** (from KG): `phys.em.ac-power`.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 3 · **References**: NCERT Physics Class 12 Ch. 7 (Alternating Current); Halliday Resnick Ch. 31

## Learning Objective

After this concept, the learner can:

1. Compute the reactances X_L = ωL and X_C = 1/(ωC).
2. Explain the phase relations (V_L leads, V_C lags, V_R in phase) and add voltages as
   phasors.
3. Compute the impedance Z = √(R² + (X_L − X_C)²), the current and the phase angle.
4. Find the resonant frequency, explain why the current peaks there, and relate the
   sharpness to Q.

## Core Understanding

In a series AC circuit the same current flows through the resistor, the inductor and the capacitor, but their voltages do not rise and fall together. An inductor opposes changes of current, so its opposition grows with frequency: its reactance is X_L = ωL, and its voltage leads the current by a quarter cycle (90°). A capacitor passes AC more easily the faster it alternates: X_C = 1/(ωC), and its voltage lags the current by 90°. The resistor's voltage is in step with the current. Because V_L and V_C point in opposite directions on a phasor diagram and both are at right angles to V_R, the voltages add like the sides of a right triangle, not as plain numbers: V = √(V_R² + (V_L − V_C)²). Dividing by the current gives the impedance Z = √(R² + (X_L − X_C)²).

Take R = 40 Ω, L = 0.2 H and C = 50 μF at ω = 400 rad/s: X_L = 80 Ω, X_C = 50 Ω, and Z = √(40² + 30²) = 50 Ω — not 170 Ω. With 200 V rms the current is 4 A, and because X_L > X_C the circuit is inductive and the current lags the supply by φ = tan⁻¹(30/40) ≈ 37°. The meters across R, L and C read 160 V, 320 V and 200 V — adding to far more than the 200 V supply, which is only possible because they peak at different moments.

At one frequency X_L and X_C are equal: ω₀L = 1/(ω₀C), so ω₀ = 1/√(LC) — here about 316 rad/s. Their effects cancel, Z = R is as SMALL as it can be, the current is as LARGE as it can be (200/40 = 5 A) and it is in phase with the supply. This is series resonance. How sharp the peak is depends on the quality factor Q = ω₀L/R = (1/R)√(L/C): about 1.6 here, but 6.3 if R is cut to 10 Ω, giving a peak four times taller and much narrower. A radio's tuning circuit uses this: turning the knob changes C, moving ω₀ to the station you want, and a high Q keeps neighbouring stations out.

## Mental Models

- **Beginner (arriving)**: ohms add; AC is DC that wiggles.
- **Intermediate**: reactances with phase; phasor addition; Z = √(R² + (X_L − X_C)²);
  resonance minimises Z and maximises I; Q sets sharpness.
- **Advanced**: complex impedance Z = R + j(X_L − X_C); bandwidth Δω = ω₀/Q; voltage
  magnification across L and C at resonance; parallel resonance (maximum impedance).
- **Expert**: transfer functions and filters; driven damped oscillator analogy
  (L ↔ mass, C ↔ 1/stiffness, R ↔ damping).
- **Versioning note**: install the intermediate model; mention the mechanical analogy
  with `phys.wave.forced-oscillations`.

## Why Students Fail

Resistors in series taught "ohms add", which is false once phase enters. Phasors are
unfamiliar, so the square root looks arbitrary. And "resonance" is associated with
"something becomes maximal" without asking which quantity, so the impedance is
expected to peak.

## Misconceptions

**M1 — Resistance and reactances add like resistors in series**
- *Why*: DC series rule transferred (type 4).
- *Symptom / phrases*: "Z = 40 + 80 + 50 = 170 Ω".
- *Detection probe (verbatim)*: "In a series circuit R = 40 Ω, X_L = 80 Ω and X_C =
  50 Ω. What is the impedance?"
- *Recovery*: voltages 160, 320, 200 V vs a 200 V supply.
- *Verification*: three impedance calculations.

**M2 — At resonance the impedance is largest and the current smallest**
- *Why*: "resonance = maximum" without identifying the quantity (type 5).
- *Symptom*: predicts a current dip at ω₀.
- *Detection probe*: "At the resonant frequency of a series LCR circuit, is the
  current largest or smallest?"
- *Recovery*: X_L − X_C = 0 → Z = R, its minimum.
- *Verification*: sketch I against ω for two values of R.

**M3 — Inductors and capacitors behave the same way at all frequencies**
- *Why*: components learned only in DC (type 5).
- *Symptom*: X_C computed as ωC.
- *Detection probe*: "Doubling the frequency: what happens to X_L and to X_C?"
- *Recovery*: X_L doubles, X_C halves.
- *Verification*: classify circuits above and below resonance.

## Analogies

- **Best analogy**: pushing a child on a swing — push at the swing's own rhythm and
  the amplitude grows hugely; less friction (smaller R) makes the response sharper.
  *Breaking point*: a swing is a mechanical oscillator; use it for resonance only.
- **Alternative**: walking diagonally across a field — 40 m east and 30 m north take
  you 50 m, not 70 m; perpendicular contributions add as a right triangle.
  *Breaking point*: phasors rotate in time; the field walk is static.
- **Anti-analogy to avoid**: "reactance is just resistance for AC." It installs M1.

## Demonstrations

- **Home**: tune an AM/FM radio and notice one station rising out of the noise.
- **Teacher demo**: a signal generator, a lamp and a series LCR circuit; sweep the
  frequency — the lamp is brightest at one setting; swap in a larger R and the peak
  flattens.
- **Prediction before demo**: "at which frequency will the lamp be brightest?"

## Discovery Questions

**Structure**:
1. *Need*: "How does a radio choose one station?"
2. *Discovery*: sweep the frequency; read the three meters.
3. *Direct instruction*: reactances, phasors, Z, resonance, Q.
4. *Apply*: tuning circuits, filters.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the radio tuner.
2. **Worked examples** (high fit): X_L = 80, X_C = 50 → Z = 50 Ω; I = 4 A; ω₀ ≈ 316
   rad/s; Q ≈ 1.6 vs 6.3.
3. **Error exposure** (high fit for M1/M2): the 680 V vs 200 V meter readings; Z = R
   at resonance.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) ω = 400 rad/s: X_L = 0.2 × 400 = 80 Ω; X_C = 1/(400 × 5 × 10⁻⁵) = 50 Ω.
   (b) Z = √(40² + 30²) = 50 Ω; I = 200/50 = 4 A; φ = tan⁻¹(30/40) ≈ 37°, lagging.
   (c) ω₀ = 1/√(0.2 × 5 × 10⁻⁵) ≈ 316 rad/s; I_max = 200/40 = 5 A; Q ≈ 1.6.

2. **ERROR-ANALYSIS** — a student writes Z = 170 Ω. Show the meter readings.

3. **PREDICTION-BEFORE-DEMO** — before the sweep, ask where the lamp is brightest.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "write X_L, X_C, Z" → "Z for R = 30, X_L = 70, X_C = 30 Ω" → "what is maximal at
   series resonance?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "same current, different timing";
draws the right triangle before the formula; names the quantity that peaks at
resonance — the current.

*Load-bearing sentence to slow down on*: "The inductor's and capacitor's voltages
point opposite ways and both sit at right angles to the resistor's — that is why
they don't simply add."

*What to listen for*: "add the ohms" → M1; "impedance peaks at resonance" → M2;
X_C growing with frequency → M3.

## Assessment Signals

**Diagnostic — golden probe**: "R = 40 Ω, X_L = 80 Ω, X_C = 50 Ω in series.
Impedance?" Correct: 50 Ω.

**Distractor-mapped items**:
- "Impedance?" Options: 50 Ω, 170 Ω, 70 Ω, 10 Ω. Answer: 50 Ω. "170 Ω" and "70 Ω"
  target M1.
- "Current at resonance?" Options: largest, smallest, zero, the same as off
  resonance. Answer: largest. "Smallest" targets M2.

**Guided practice → independent practice fading ladder**:
1. Reactances (3 items).
2. Phasor voltage sums (2 items).
3. Impedance, current and phase (3 items).
4. Resonance and Q (3 items).
5. (Unscaffolded) choose C for a given resonant frequency.

**Mastery gate set** (per assessment/05):
- *Production*: one full Z/I/φ calculation and one resonance design.
- *New surface*: a radio tuner.
- *Mixed*: inductive/capacitive classification interleaved with calculations.
- *Delayed*: one-week check — what peaks at resonance.

**Calibration note**: learners can plug into the Z formula; the check that reveals
miscalibration is the three-meter voltage puzzle.

## Tutor Recovery Strategy

*Likeliest utterance*: "the total impedance is 170 ohms" (M1).

*Concept-specific smaller question*: "Do the voltages across L and C peak at the same
moment?"

*M2 recovery*: "At resonance X_L = X_C. What is X_L − X_C then?"

## Memory Hooks

- **Concept type**: principle (phasor addition) + application (tuning).
- **Review form** (per Delivery 2 §8): the Z triangle as spaced retrieval;
  calculations as distributed practice.
- **Automaticity target**: "X_L up with ω, X_C down with ω; series resonance: Z = R,
  I max".
- **Interleaving partners**: `phys.em.lc-circuits`, `phys.em.ac-basics`,
  `phys.wave.forced-oscillations`.

## Transfer Connections

- *Near*: `phys.em.ac-power` — power factor cos φ = R/Z.
- *Near*: `phys.wave.forced-oscillations` — the mechanical twin.
- *Far*: filters and signal processing.
- *Real-world*: radio and TV tuners, metal detectors, induction heating.
- *Expert transfer*: complex impedance in circuit analysis; MRI coil tuning.

## Cross-Subject Connections

- **Mathematics**: right-triangle geometry, trigonometry, complex numbers.
- **Engineering**: filter design, power electronics.
- **Music**: resonance in instruments.
- **Technology**: wireless charging tuned coils.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.lcr-circuits.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 26). The audit listed
`phys.em.ac-basics`, `phys.em.self-inductance` and `phys.em.capacitance` as
prerequisites; those are exactly the prerequisites of `phys.em.lc-circuits`, which
also supplies the load-bearing resonant frequency ω₀ = 1/√(LC), so this node requires
`phys.em.lc-circuits` alone (KGCS P2, transitive reduction). Impedance appeared only
as an expert aside before this node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

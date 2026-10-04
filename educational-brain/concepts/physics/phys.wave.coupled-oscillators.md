# Coupled Oscillators and Normal Modes — `phys.wave.coupled-oscillators`

## Identity

- **Concept ID**: `phys.wave.coupled-oscillators`
- **Curriculum location**: physics / waves and oscillations
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.wave.shm` — the load-bearing part is ω = √(k/m) for a single oscillator and
    sinusoidal motion at one frequency.
  - `phys.wave.standing-waves` — the load-bearing part is that a string has discrete
    harmonics f_n = n f₁, which turn out to be its normal modes.
- **Unlocks** (from KG): none listed. Leads to molecular vibrations, phonons, and
  structural resonance in engineering.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: French, Vibrations and Waves Ch. 5; Halliday Resnick Ch. 15

## Learning Objective

After this concept, the learner can:

1. Identify and compute the normal modes of two coupled oscillators.
2. Explain general motion as a superposition of modes.
3. Explain and compute energy exchange between weakly coupled oscillators.
4. Connect normal modes to the standing waves of a string.

## Core Understanding

When oscillators are linked so that each pushes or pulls on the other, they no longer move independently — but there are special patterns, called normal modes, in which every part oscillates sinusoidally at one shared frequency and the pattern repeats forever. A system has as many normal modes as it has degrees of freedom. Take two equal masses m between three equal springs k, wall–m–m–wall. If both masses move together, in phase, the middle spring is never stretched, so each mass feels only its outer spring: ω₁ = √(k/m). If they move in opposite directions, the middle spring is stretched by twice each displacement and adds to the restoring force: ω₂ = √(3k/m). With k = 10 N/m and m = 0.1 kg these are 10 rad/s and 17.3 rad/s. The out-of-phase mode is always the faster one.

Any motion of such a linear system is a superposition — a sum — of its normal modes, each oscillating at its own frequency. That is what makes the motion predictable: split the starting state into modes, let each mode run, and add them back. Start one of two weakly coupled pendulums alone and you have excited both modes equally. Their frequencies are slightly different — for two 1 m pendulums with a weak spring, ω₁ = 3.130 rad/s and ω₂ = 3.286 rad/s — so they drift in and out of step like beats. As they do, the swinging passes completely from the first pendulum to the second and back again; a full swap takes π/(ω₂ − ω₁) ≈ 20 s. Weaker coupling brings the two frequencies closer and makes the swap slower; with no coupling at all there is no swap.

Add more masses and you get more modes: N masses, N modes. A stretched string is a chain of an enormous number of tiny masses joined by tension, so it has a huge number of modes — and those modes are exactly its standing waves, with frequencies f₁, 2f₁, 3f₁, … The vibrations of molecules (which is why CO₂ absorbs infrared only at particular frequencies), the swaying of tall buildings and the tones of a drum are all normal modes.

## Mental Models

- **Beginner (arriving)**: each oscillator has its own frequency and keeps its energy.
- **Intermediate**: normal modes with shared frequencies; modes = degrees of freedom;
  superposition; energy exchange at the beat frequency; string modes = standing waves.
- **Advanced**: matrix formulation (eigenvalue problem); normal coordinates; dispersion
  relation for a chain of masses.
- **Expert**: phonons in crystals; coupled-mode theory in optics and quantum systems.
- **Versioning note**: install the intermediate model; mention the eigenvalue form as
  how larger systems are solved.

## Why Students Fail

Single oscillators are all that has been met, so one frequency per system is assumed.
Energy is pictured as staying where it was put. And the algebra of two coupled equations
hides the simple physical pictures of the two modes.

## Misconceptions

**M1 — A coupled system has one natural frequency**
- *Why*: single-oscillator result generalised (type 5).
- *Symptom / phrases*: "the system vibrates at its natural frequency".
- *Detection probe (verbatim)*: "Two masses m between three springs k (wall–m–m–wall).
  At how many different frequencies can the system oscillate in a pure, repeating
  pattern?"
- *Recovery*: does the middle spring stretch in each pattern?
- *Verification*: find both modes for two different systems.

**M2 — The oscillator that is struck keeps the energy**
- *Why*: local thinking (type 2).
- *Symptom*: "the second pendulum just twitches".
- *Detection probe*: "Two identical pendulums hang from a slack string. You set one
  swinging and hold the other still, then let go. What happens over the next minute?"
- *Recovery*: watch the full swap; modes drifting out of step.
- *Verification*: compute the swap time for two cases.

**M3 — A string has a single vibration frequency**
- *Why*: the fundamental is the obvious tone (type 5).
- *Symptom*: "a guitar string vibrates at one frequency".
- *Detection probe*: "How many normal modes does a guitar string have?"
- *Recovery*: string = many coupled masses; harmonics.
- *Verification*: list the first four mode frequencies for a given string.

## Analogies

- **Best analogy**: two children on swings holding a loose rope between them — swinging
  together, the rope stays slack; swinging opposite, the rope tugs and they swing faster.
  *Breaking point*: children can push; the model has no driving.
- **Alternative**: two tuning forks slightly out of tune beating — the swap is a beat.
  *Breaking point*: forks are not coupled; only the beat arithmetic carries over.
- **Anti-analogy to avoid**: "each pendulum has its own rhythm." It installs M1/M2.

## Demonstrations

- **Home**: two pendulums (washers on threads) hung from a slack horizontal string;
  start one and watch.
- **Teacher demo**: two gliders on an air track joined by springs; excite each mode
  separately, then one glider alone.
- **Prediction before demo**: "start one glider alone — will the other ever move as much?"

## Discovery Questions

**Structure**:
1. *Need*: "Why does energy move between coupled pendulums?"
2. *Discovery*: the two special starting patterns.
3. *Direct instruction*: modes, superposition, beat-frequency exchange.
4. *Apply*: strings, molecules, buildings.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): two pendulums on a string.
2. **Worked examples** (high fit): 10 and 17.3 rad/s; 20 s swap; harmonics.
3. **Error exposure** (high fit for M1/M2): the middle spring; the full swap.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) ω₁ = √(10/0.1) = 10 rad/s; ω₂ = √(30/0.1) ≈ 17.3 rad/s.
   (b) Swap time = π/(3.286 − 3.130) ≈ 20 s.
   (c) String f₁ = 110 Hz → modes 110, 220, 330 Hz.

2. **ERROR-ANALYSIS** — a student says the struck pendulum keeps the energy. Run the
   simulation for a minute.

3. **PREDICTION-BEFORE-DEMO** — before releasing one glider, ask about the other.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "what is a normal mode?" → "both mode frequencies for k = 40 N/m" → "why do coupled
   pendulums swap energy?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor always asks "what does the coupling spring
do in this pattern?"; describes the swap as two modes drifting out of step.

*Load-bearing sentence to slow down on*: "In a normal mode every part moves at the same
frequency — and any motion is just a mix of modes."

*What to listen for*: "one natural frequency" → M1; "it keeps its energy" → M2; "one
frequency per string" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Two masses between three springs — how many mode
frequencies?" Correct: two, √(k/m) and √(3k/m).

**Distractor-mapped items**:
- "Mode frequencies for k = 10 N/m, m = 0.1 kg?" Options: 10 and 17.3 rad/s; 10 rad/s
  only; 10 and 20 rad/s; 5 and 10 rad/s. Answer: the first. "10 rad/s only" targets M1.
- "One pendulum started alone — after ~20 s?" Options: the other is swinging and the
  first is nearly still; the first still has all the energy; both stop. Answer: the
  first. "Still has all the energy" targets M2.

**Guided practice → independent practice fading ladder**:
1. Identify mode patterns (3 items).
2. Mode frequencies (3 items).
3. Swap times (2 items).
4. String modes (2 items).
5. (Unscaffolded) analyse a new coupled system.

**Mastery gate set** (per assessment/05):
- *Production*: one mode-frequency and one swap-time calculation.
- *New surface*: CO₂ vibrations.
- *Mixed*: mode items interleaved with string items.
- *Delayed*: one-week check — why energy swaps.

**Calibration note**: learners can quote √(3k/m); the check that reveals
miscalibration is predicting what happens when one pendulum alone is started.

## Tutor Recovery Strategy

*Likeliest utterance*: "the one you push keeps swinging" (M2).

*Concept-specific smaller question*: "Starting one alone — how much of each mode is
that?"

*M1 recovery*: "Does the middle spring stretch when both move together?"

## Memory Hooks

- **Concept type**: principle (normal modes, superposition) + application (exchange,
  strings).
- **Review form** (per Delivery 2 §8): the two-mode pictures as spaced retrieval;
  frequency and swap calculations as distributed practice.
- **Automaticity target**: "modes = degrees of freedom; out-of-phase is faster; swap
  every π/Δω".
- **Interleaving partners**: `phys.wave.shm`, `phys.wave.standing-waves`,
  `phys.wave.forced-oscillations`.

## Transfer Connections

- *Near*: `phys.wave.standing-waves` — continuous-system modes.
- *Near*: `phys.wave.forced-oscillations` — driving a mode at resonance.
- *Far*: phonons and heat capacity of solids.
- *Real-world*: tuned mass dampers in skyscrapers, musical instruments, molecular
  spectroscopy.
- *Expert transfer*: coupled qubits and avoided crossings.

## Cross-Subject Connections

- **Chemistry**: vibrational modes and infrared spectra.
- **Engineering**: structural dynamics, earthquake resistance.
- **Music**: overtones of instruments.
- **Mathematics**: eigenvalues and eigenvectors.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.wave.coupled-oscillators.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 42). Normal modes had no node
before this one; both audit prerequisites are kept (neither reaches the other).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).

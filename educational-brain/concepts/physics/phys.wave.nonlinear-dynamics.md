# Nonlinear Dynamics and Period Doubling — `phys.wave.nonlinear-dynamics`

## Identity

- **Concept ID**: `phys.wave.nonlinear-dynamics`
- **Curriculum location**: physics / waves and oscillations (beyond SHM)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.wave.forced-oscillations` — the load-bearing part is the driven, damped
    oscillator (and, in its chain, SHM with a restoring force proportional to
    displacement), whose linear behaviour this node goes beyond.
- **Unlocks** (from KG): none listed. Leads to chaos in fluids, weather, population
  biology and orbital dynamics.
- **Difficulty**: expert · **Bloom**: understand · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: Strogatz, Nonlinear Dynamics and Period Doubling; Taylor, Classical Mechanics Ch. 12

## Learning Objective

After this concept, the learner can:

1. Explain what makes a system nonlinear and why SHM results are only approximations.
2. Describe fixed points, period doubling and chaos in the logistic map.
3. Explain chaos as deterministic with sensitive dependence on initial conditions.
4. Explain why chaotic systems cannot be predicted in the long term.

## Core Understanding

Simple harmonic motion depends on a restoring force exactly proportional to displacement. Real forces rarely are. A pendulum's restoring force is proportional to sin θ, which matches θ only for small swings; at larger amplitudes the period grows — at a 90° amplitude it is about 18% longer than the small-swing period. Systems whose forces or rules are not proportional are nonlinear. In them, adding two solutions no longer gives a solution, and entirely new behaviour can appear.

A very simple example shows the range. The logistic map takes a number x between 0 and 1 and produces the next one by x_{n+1} = r x_n (1 − x_n). At r = 2.8, any starting value settles to a fixed point, x = 1 − 1/r ≈ 0.643, which maps to itself. At r = 3.2 the values settle into flipping between two numbers, about 0.513 and 0.799 — the period has doubled. Increase r further and the period doubles again and again, until at about r = 3.57 and beyond, for example at r = 3.9, the values never settle into any repeating pattern at all. This is chaos.

Chaos is not randomness. The rule contains no chance: run it twice from exactly the same start and you get exactly the same sequence, digit for digit. What makes it chaotic is sensitive dependence on initial conditions. At r = 3.9, starts of 0.200000 and 0.200001 stay close for a while, but their difference grows roughly exponentially, and after about 20 steps the two sequences are completely unrelated. Because real initial conditions are never known exactly, long-term prediction is impossible in practice: measuring ten times more precisely buys only a few more predictable steps. The same thing happens in a driven, damped pendulum pushed hard enough, in a double pendulum, in dripping taps, and in the atmosphere, which is why detailed weather forecasts fail beyond about two weeks however good the instruments become.

## Mental Models

- **Beginner (arriving)**: all oscillators behave like SHM; chaos means random.
- **Intermediate**: nonlinearity breaks proportionality and superposition; fixed point →
  period doubling → chaos; deterministic but sensitive; prediction horizon.
- **Advanced**: Lyapunov exponents; bifurcation diagrams; strange attractors; phase
  space.
- **Expert**: Feigenbaum universality (δ ≈ 4.669); KAM theory; ergodicity.
- **Versioning note**: install the intermediate model; mention the Lyapunov exponent as
  the rate at which errors grow.

## Why Students Fail

The everyday meaning of "chaotic" is "random and disordered". SHM is presented as the
universal oscillator. And the idea that small errors can grow without limit contradicts
the linear intuition built by most of school physics.

## Misconceptions

**M1 — Chaotic systems behave randomly**
- *Why*: everyday meaning of the word (type 1, vocabulary).
- *Symptom / phrases*: "chaos is random".
- *Detection probe (verbatim)*: "The logistic map x_{n+1} = 3.9 x_n (1 − x_n) is run
  twice from exactly 0.2. Will the two sequences be the same?"
- *Recovery*: two identical computer runs.
- *Verification*: explain "deterministic but unpredictable".

**M2 — A tiny error in the start gives only a tiny error later**
- *Why*: linear intuition (type 5).
- *Symptom*: "measure more carefully and the forecast is fine".
- *Detection probe*: "Two runs start at 0.200000 and 0.200001. After 30 steps, will they
  still differ only by about 0.000001?"
- *Recovery*: the difference table; exponential growth.
- *Verification*: contrast r = 2.8 (errors shrink) with r = 3.9 (errors grow).

**M3 — A pendulum's period never depends on amplitude**
- *Why*: SHM result over-generalised (type 5).
- *Symptom*: "the period is always 2π√(L/g)".
- *Detection probe*: "Is a pendulum's period exactly the same for a 5° and a 60°
  swing?"
- *Recovery*: sin θ ≈ θ only for small angles; ~18% longer at 90°.
- *Verification*: identify when the small-angle formula is safe.

## Analogies

- **Best analogy**: kneading dough — two raisins that start almost touching end up far
  apart after a few folds, though every fold follows a fixed rule.
  *Breaking point*: dough is continuous; the logistic map is a single number.
- **Alternative**: a pinball bouncing among bumpers — tiny differences in angle give
  completely different paths.
  *Breaking point*: illustrative only.
- **Anti-analogy to avoid**: "chaos is like rolling dice." It installs M1.

## Demonstrations

- **Home**: run the logistic map in a spreadsheet for r = 2.8, 3.2 and 3.9; change the
  start in the sixth decimal place.
- **Teacher demo**: a double pendulum released repeatedly; a magnetic pendulum over
  three magnets.
- **Prediction before demo**: "released from the same spot again, will it trace the
  same path?"

## Discovery Questions

**Structure**:
1. *Need*: "If physics is deterministic, why can't we predict the weather a month
   ahead?"
2. *Discovery*: the logistic map at three values of r.
3. *Direct instruction*: nonlinearity, period doubling, sensitive dependence.
4. *Apply*: weather, pendulums, populations.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): two releases of a double pendulum.
2. **Worked examples** (high fit): 0.643; 0.513/0.799; divergence by step ~20.
3. **Error exposure** (high fit for M1/M2): identical reruns; the difference table.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) r = 2.8: fixed point 1 − 1/2.8 ≈ 0.643.
   (b) r = 3.2: cycle between 0.513 and 0.799.
   (c) r = 3.9: 0.200000 vs 0.200001 differ by > 0.1 after about 22 steps.

2. **ERROR-ANALYSIS** — a student says chaos is random. Rerun from the same start.

3. **PREDICTION-BEFORE-DEMO** — before the second release, ask whether the paths match.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "what makes a system nonlinear?" → "fixed point at r = 2.5" → "is chaos random?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "deterministic but unpredictable"
every time; distinguishes the rule (exact) from the knowledge of the start (imperfect).

*Load-bearing sentence to slow down on*: "Same start, same future — but no real start
is ever known exactly."

*What to listen for*: "random" → M1; "just measure better" → M2; "period never
changes" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Run r = 3.9 twice from exactly 0.2 — same sequence?"
Correct: yes, identical.

**Distractor-mapped items**:
- "Fixed point at r = 2.8?" Options: 0.643; 0.357; 2.8; none. Answer: 0.643.
- "Starts 10⁻⁶ apart at r = 3.9, after 30 steps?" Options: completely different; still
  10⁻⁶ apart; exactly equal. Answer: completely different. "Still 10⁻⁶ apart" targets
  M2.

**Guided practice → independent practice fading ladder**:
1. Linear vs nonlinear identification (3 items).
2. Fixed points and cycles (3 items).
3. Determinism vs predictability (2 items).
4. Real-world chaos (2 items).
5. (Unscaffolded) design a sensitivity experiment.

**Mastery gate set** (per assessment/05):
- *Production*: one fixed-point calculation.
- *New surface*: weather forecasting.
- *Mixed*: r-regime classification interleaved with concept items.
- *Delayed*: one-week check — "is chaos random?"

**Calibration note**: learners quote "butterfly effect"; the check that reveals
miscalibration is the identical-rerun question.

## Tutor Recovery Strategy

*Likeliest utterance*: "chaos means it's random" (M1).

*Concept-specific smaller question*: "Does the rule x → 3.9x(1 − x) contain any dice?"

*M2 recovery*: "After 20 steps, how far apart are runs that began a millionth apart?"

## Memory Hooks

- **Concept type**: phenomenon (chaos) + principle (sensitive dependence).
- **Review form** (per Delivery 2 §8): the three regimes as spaced retrieval;
  determinism vs predictability as distributed discussion.
- **Automaticity target**: "nonlinear → period doubling → chaos; deterministic +
  sensitive = unpredictable".
- **Interleaving partners**: `phys.wave.forced-oscillations`, `phys.wave.shm`,
  `phys.wave.coupled-oscillators`.

## Transfer Connections

- *Near*: `phys.wave.forced-oscillations` — the driven pendulum's route to chaos.
- *Near*: `phys.wave.shm` — the small-amplitude limit.
- *Far*: turbulence; orbital chaos in the asteroid belt.
- *Real-world*: weather forecasting, population cycles, heart rhythms.
- *Expert transfer*: quantum chaos.

## Cross-Subject Connections

- **Biology**: population dynamics (the logistic map's origin).
- **Geography**: weather and climate modelling.
- **Mathematics**: iterated maps, exponential growth, bifurcations.
- **Computer science**: numerical precision and simulation.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.wave.nonlinear-dynamics.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 43). The audit proposed the id
`phys.mech.nonlinear-dynamics`; it is `phys.wave.nonlinear-dynamics` here because lesson
order groups concepts by the domain in their id, and a `mech` id would place this
lesson before SHM and forced oscillations, its own prerequisites. Its name avoids the word "chaos" and its aliases avoid the mathematics node's aliases, because both captured the mathematics request "what is chaos?" (owned by `math.de.chaos`); the content still teaches chaos fully.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).

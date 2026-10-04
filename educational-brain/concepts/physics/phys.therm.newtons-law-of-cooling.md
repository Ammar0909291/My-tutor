# Newton's Law of Cooling — `phys.therm.newtons-law-of-cooling`

## Identity

- **Concept ID**: `phys.therm.newtons-law-of-cooling`
- **Curriculum location**: physics / thermal physics
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.therm.heat-transfer` — the load-bearing part is that heat flows from a
    hotter body to a colder one, and only while there is a temperature
    difference. Newton's law makes that quantitative: the flow, and so the rate
    of cooling, is proportional to the difference.
- **Unlocks** (from KG): none listed. The same "rate ∝ how far from equilibrium"
  shape reappears in RC discharge, radioactive decay and damped motion.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Ch. 11 (Thermal Properties of Matter)

## Learning Objective

After this concept, the learner can:

1. State that the rate of cooling is proportional to the excess temperature
     over the surroundings, for small differences.
2. Sketch and explain a cooling curve that flattens toward room temperature.
3. Use equal-fraction (exponential) reasoning and the average-rate form to solve
     cooling-time problems.
4. Say when the law fails (large differences, where radiation dominates).

## Core Understanding

A hot drink does not cool steadily. Tea at 80 °C in a 20 °C room reads 60 °C after 10 minutes, then about 47, 38 and 32 °C at 20, 30 and 40 minutes: it loses 20 °C in the first ten minutes but only 6 °C in the fourth. Heat flows out because the tea is hotter than the room, and the rate of that flow depends on how MUCH hotter: at 80 °C it is 60 °C above the room, at 32 °C only 12 °C. Newton's law of cooling states it: for small temperature differences, the rate of cooling is proportional to the excess temperature, dT/dt = −k(T − T_s). A body at room temperature does not cool at all, and a 50 °C cup cools five times faster at first in a 0 °C room (excess 50 °C) than in a 40 °C room (excess 10 °C).

Because the rate shrinks with the excess, the excess falls by the same FRACTION in each equal time. For the tea, the excess goes 60 → 40 → 27 → 18 → 12 °C: multiplied by 2/3 every ten minutes. That is exponential decay, T − T_s = (T₀ − T_s)e^(−kt). The temperature approaches the room's but never crosses it, and each degree takes longer than the last. For exam problems over a short interval, the average-rate form is used: (T₁ − T₂)/t = k[(T₁ + T₂)/2 − T_s]. From 80 → 60 °C in 10 min, 2 = k(70 − 20), so k = 0.04 per minute; then 60 → 40 °C takes 20/(0.04 × 30) ≈ 16.7 min (the exact exponential gives 17.1 min).

The law is an approximation for modest temperature differences, where cooling is mainly by convection. A red-hot iron bar cools much faster than it predicts, because radiation grows as the fourth power of absolute temperature and dominates at high temperatures (`phys.therm.blackbody-radiation`).

## Mental Models

- **Beginner (arriving)**: things cool at a steady rate until they are "cold".
- **Intermediate**: the excess over room temperature drives heat flow; less excess,
  slower cooling; the curve flattens toward room temperature.
- **Advanced**: dT/dt = −k(T − T_s) gives exponential decay of the excess with a
  time constant 1/k; equal times give equal fractions; k depends on surface area,
  heat capacity and the surroundings (still air, wind, water).
- **Expert**: the law linearises convective and radiative transfer for small ΔT;
  the radiative term 4εσT_s³ΔT is itself a Newton-type coefficient for small ΔT;
  the same first-order equation governs RC circuits and decay.
- **Versioning note**: install the intermediate model and the average-rate
  method; present the exponential as "equal fractions in equal times".

## Why Students Fail

Learners assume a steady rate because they rarely watch a whole cooling curve, and
because many school problems use constant rates. They also attach the rate to the
body's own temperature, so the surroundings drop out of their reasoning. The
average-rate form then gets set up with T instead of T − T_s.

## Misconceptions

**M1 — A hot body cools at a steady rate**
- *Why*: steady-rate problems elsewhere; a single interval looks linear (type 4,
  overgeneralisation).
- *Symptom / phrases*: "20 °C in 10 min, so 60 → 40 also takes 10 min".
- *Detection probe (verbatim)*: "Tea cools from 80 °C to 60 °C in 10 minutes in a
  20 °C room. Will it take more, less or the same time to cool from 60 °C to
  40 °C? Why?"
- *Recovery*: continue the steady rate — the tea would reach −40 °C in an hour.
  Heat flow needs a temperature difference, which shrinks.
- *Verification*: two time predictions and one curve sketch.

**M2 — The cooling rate depends only on how hot the body is**
- *Why*: "hotter cools faster" stated without the surroundings (type 5,
  instructional compression).
- *Symptom*: a 50 °C cup "cools the same in any room".
- *Detection probe*: "Two identical cups at 50 °C, one in a 40 °C room and one in a
  0 °C room. Which cools faster at first?"
- *Recovery*: a 50 °C cup in a 50 °C room does not cool at all — so the room must
  matter.
- *Verification*: rank four cup/room pairs by initial cooling rate.

**M3 — The body eventually cools below room temperature (or to 0 °C)**
- *Why*: "cooling" is heard as "becoming cold" (type 2, everyday language).
- *Symptom*: curves that cross the room-temperature line or end at 0 °C.
- *Detection probe*: "Does the tea ever reach exactly 20 °C, or go below it?"
- *Recovery*: below room temperature, heat would flow INTO the tea, warming it.
- *Verification*: one sketch with the asymptote labelled.

## Analogies

- **Best analogy**: water draining from a tank through a hole in the bottom — the
  fuller the tank (the bigger the excess), the faster it drains; it slows as it
  empties and never goes below empty.
  *Breaking point*: Torricelli drainage goes as √height, not linearly; use for the
  qualitative shape only.
- **Alternative**: a debt shrinking by a fixed percentage each month — the same
  fraction, not the same amount, each step.
  *Breaking point*: debts can reach zero; the excess only approaches it.
- **Anti-analogy to avoid**: "it loses heat at a set speed, like a car at constant
  speed." It installs M1.

## Demonstrations

- **Home**: a thermometer in a mug of hot water; read it every 2 minutes for 20
  minutes and plot.
- **Teacher demo**: a data logger with two beakers of hot water, one in a cold
  water bath and one in room air.
- **Prediction before demo**: "same time for every 10 °C?"

## Discovery Questions

**Structure**:
1. *Need*: "Why does tea go from too hot to drinkable quickly, but then stay warm
   for ages?"
2. *Discovery*: from the table, compute the drop each 10 minutes and the excess
   each 10 minutes; look for a pattern (the excess × 2/3).
3. *Direct instruction*: the rate law and the average-rate form.
4. *Apply*: time-to-cool problems and the forensic example.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the tea table and curve.
2. **Worked examples** (high fit): the average-rate problem; equal fractions.
3. **Error exposure** (high fit for M1/M2): the −40 °C contradiction; the cup in a
   50 °C room.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Excess sequence 60, 40, 27, 18, 12 °C — ×2/3 each 10 min.
   (b) Average form: k = 2/50 = 0.04 per min; 60 → 40 °C in 20/(0.04 × 30) ≈ 16.7 min.
   (c) Equal fractions: excess 40 → 20 °C in 8 min, so 20 → 10 °C also takes 8 min.

2. **ERROR-ANALYSIS** — a student writes "60 → 40 °C takes 10 minutes like
   80 → 60". Ask where a steady 2 °C/min would leave the tea after an hour.

3. **PREDICTION-BEFORE-DEMO** — before the data logger, ask which beaker cools
   faster.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "state the law" → "the 80/60/40 problem" → "why blow on soup?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "how much hotter than the room"
rather than "how hot"; reads cooling curves as "excess" tables; always names the
surroundings' temperature.

*Load-bearing sentence to slow down on*: "The rate of cooling depends on how much
hotter the body is than its surroundings — so it slows as it gets closer to room
temperature."

*What to listen for*: "the same 10 minutes" → M1; "it doesn't matter what the room
is" → M2; "it cools down to cold/zero" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Tea cools from 80 °C to 60 °C in 10 minutes in a
20 °C room. More, less or the same time from 60 °C to 40 °C?" Correct: more — the
excess is smaller, so heat flows out more slowly.

**Distractor-mapped items**:
- "Time for 60 → 40 °C (average form)?" Options: 10 min, about 17 min, 5 min,
  20 min. Answer: about 17 min. "10 min" targets M1.
- "50 °C cups, 0 °C vs 40 °C rooms?" Options: the same; 0 °C room, 5× faster;
  40 °C room faster; 0 °C room, 50× faster. Answer: 0 °C room, 5×. "The same"
  targets M2.

**Guided practice → independent practice fading ladder**:
1. Rank cooling rates by excess (4 items).
2. Equal-fraction time problems (3 items).
3. Average-rate problems (3 items).
4. Curve sketches with different surroundings (2 items).
5. (Unscaffolded) the forensic time-of-death reasoning.

**Mastery gate set** (per assessment/05):
- *Production*: one average-rate problem, one equal-fraction problem.
- *New surface*: cooling in a water bath vs in air.
- *Mixed*: ranking items interleaved with calculations.
- *Delayed*: one-week check — why the law fails for red-hot iron.

**Calibration note**: the average-rate formula is learned quickly; the check that
reveals miscalibration is the "same time?" prediction before any calculation.

## Tutor Recovery Strategy

*Likeliest utterance*: "it lost 20 degrees in 10 minutes, so another 20 takes 10
more" (M1).

*Concept-specific smaller question*: "What makes heat flow out of the tea at all?"
(It is hotter than the room.) "Is it more or less hotter at 60 °C than at 80 °C?"

*M2 recovery*: "A cup at 50 °C in a room at 50 °C — does it cool?"

## Memory Hooks

- **Concept type**: law (rate ∝ excess) + model (exponential approach).
- **Review form** (per Delivery 2 §8): the excess table as a retrieval prompt;
  average-rate problems as distributed practice.
- **Automaticity target**: "rate ∝ (T − T_s)" before thermodynamics and RC circuits.
- **Interleaving partners**: `phys.therm.heat-transfer`, `phys.therm.specific-heat`,
  `phys.therm.blackbody-radiation`.

## Transfer Connections

- *Near*: `phys.therm.heat-transfer` — convection and conduction made quantitative.
- *Near*: `phys.therm.blackbody-radiation` — why the law fails at high temperature.
- *Far*: RC circuits and radioactive decay — the same first-order decay.
- *Real-world*: forensic time-of-death estimates, food safety cooling rules,
  cooling of engines and electronics.
- *Expert transfer*: lumped-capacitance heat-transfer models in engineering.

## Cross-Subject Connections

- **Mathematics**: first-order differential equations; exponential functions and
  half-lives.
- **Biology**: thermoregulation; small animals lose heat faster (larger
  surface-to-volume ratio, larger k).
- **Chemistry**: reaction rates proportional to concentration (first-order
  kinetics) follow the same law.
- **Home science**: why food must be cooled quickly through the danger zone.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.therm.newtons-law-of-cooling.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 11). Newton's law of
cooling had a one-line mention in `phys.therm.heat-transfer` and was not taught.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

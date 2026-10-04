# Linearisation and Uncertainty Propagation — `phys.meas.linearisation-and-uncertainty`

## Identity

- **Concept ID**: `phys.meas.linearisation-and-uncertainty`
- **Curriculum location**: physics / measurement & units
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.significant-figures` — the load-bearing part is that every measured
    value carries an uncertainty that limits the digits it can be quoted to, and
    (through `phys.meas.errors`) the distinction between random and systematic
    error. Propagation is how those uncertainties travel into a derived quantity;
    a best-fit line is how random error is averaged out.
- **Unlocks** (from KG): none listed. Every practical that determines a constant —
  g from a pendulum, k from a spring, R from Ohm's-law data, the focal length of a
  lens — uses a linearised graph and a propagated uncertainty.
- **Difficulty**: proficient · **Bloom**: analyze · **Mastery threshold**: 0.75 ·
  **Est. hours**: 3 · **References**: NCERT Physics Class 11 Ch. 2 and Lab Manual; IB/A-level practical skills

## Learning Objective

After this concept, the learner can:

1. Choose axes that turn a physical law into a straight line, y = mx + c, and say
     what the gradient and intercept mean physically.
2. Draw a best-fit line through scattered data and take its gradient from a large
     triangle on the line.
3. Propagate uncertainties: absolute uncertainties add for sums and differences;
     fractional uncertainties add for products and quotients; a power n multiplies
     the fractional uncertainty by n.
4. Quote a derived result with its uncertainty to a consistent number of digits.

## Core Understanding

A curve can be fitted by many laws; a straight line cannot hide. So to test a law, rearrange it until it reads y = mx + c and plot those y and x. A pendulum obeys T = 2π√(L/g). T against L is a curve. Square both sides: T² = (4π²/g) L. Now T² against L should be a straight line through the origin with gradient 4π²/g, so g = 4π²/gradient. Real pendulum data — L from 0.2 to 1.0 m, T from 0.90 to 2.01 s — give T² values that fall on a line of gradient about 4.02 s²/m, so g ≈ 39.5/4.02 ≈ 9.8 m/s². If the best-fit line crosses the axis away from zero, the intercept is information: a systematic error, such as length measured to the top of the bob rather than its centre.

Each point carries random error, so the graph gets ONE best-fit straight line with points scattered on both sides, never a join-the-dots zigzag. Its gradient comes from a large triangle drawn on the line, not from a single data point — a single point's y/x is the gradient only if the line passes through the origin.

Uncertainties propagate by two rules. When quantities are added or subtracted, their absolute uncertainties add: 12.3 ± 0.1 cm minus 4.1 ± 0.1 cm is 8.2 ± 0.2 cm — a difference is no more certain than a sum. When quantities are multiplied or divided, their fractional uncertainties add, and a power n multiplies a fractional uncertainty by n. For g = 4π²L/T² with L = 1.00 ± 0.01 m (1 %) and T = 2.00 ± 0.02 s (1 %, but squared, so 2 %), the fractional uncertainty in g is 1 % + 2 % = 3 %: g = 9.9 ± 0.3 m/s². The squared quantity dominates, which tells you which measurement to improve first — time many swings rather than one.

## Mental Models

- **Beginner (arriving)**: a graph is a picture of the data; draw it and join the
  points. Uncertainty is an extra number added at the end.
- **Intermediate**: rearrange the law into y = mx + c; the gradient carries the
  constant. Uncertainties combine by rule — absolutes for sums, fractions for
  products, times n for powers.
- **Advanced**: the graph is a test — scatter about the line is random error, a
  systematic offset shows in the intercept. Worst-fit lines through the error bars
  give the uncertainty of the gradient. Propagation tells you which measurement
  limits the result.
- **Expert**: propagation is first-order calculus (Δf ≈ Σ |∂f/∂xᵢ| Δxᵢ); for
  independent random errors, uncertainties add in quadrature rather than linearly.
  Least-squares regression formalises the best-fit line. Log–log plots linearise
  any power law, the gradient giving the exponent.
- **Versioning note**: install the intermediate model with the linear (worst-case)
  addition rules used in school practicals; name quadrature as the expert refinement.

## Why Students Fail

Learners carry over "add the errors" from sums to products, adding uncertainties
with different units. They treat T² as if it had T's fractional uncertainty. And
they read graphs as pictures, joining the dots and reading a gradient from one
point, which hides the very scatter and intercept that make a graph informative.

## Misconceptions

**M1 — Uncertainties always add as absolute values**
- *Why*: the sum rule is learned first and generalised (type 4,
  overgeneralisation).
- *Symptom / phrases*: "Δg = ΔL + ΔT = 0.03"; adds metres and seconds.
- *Detection probe (verbatim)*: "L = 1.00 ± 0.01 m, T = 2.00 ± 0.02 s. What is the
  fractional uncertainty in g = 4π²L/T²?"
- *Recovery*: ask what unit "0.03" carries — none makes sense. Compare each
  uncertainty as a fraction of its own reading; for products and quotients those
  fractions add.
- *Verification*: two products, two quotients and one difference, mixed.

**M2 — A squared quantity contributes its uncertainty once**
- *Why*: the power in the formula is not connected to the uncertainty (type 5,
  instructional omission).
- *Symptom*: fractional uncertainty of T² given as ΔT/T.
- *Detection probe*: "T = 2.00 ± 0.02 s. What is the fractional uncertainty of T²?"
- *Recovery*: square 2.02: 4.08, 2 % above 4.00 although T was only 1 % high.
- *Verification*: a cube's volume, a square root, and T² — three powers.

**M3 — Join the dots; take the gradient from one point**
- *Why*: graphs in lower school are drawn to show data exactly (type 2, prior
  schooling).
- *Symptom*: zigzag lines; gradient = y/x of one data point despite an intercept.
- *Detection probe*: "A best-fit line has intercept 0.1 s². A student takes the
  gradient as T²/L of the last point. What is wrong?"
- *Recovery*: each point has scatter; the best-fit line averages it. Gradient from
  a large triangle on the line; y/x of a point equals the gradient only for a line
  through the origin.
- *Verification*: draw a best-fit line and take a gradient from a dataset with an
  offset.

## Analogies

- **Best analogy**: a straight edge laid on scattered pins. You don't bend the
  edge to touch every pin; you lay it where it balances them.
  *Breaking point*: a straight edge can't tell you if the law is curved — choose
  the axes first.
- **Alternative (fractional uncertainty)**: a 1 % error on a price and a 1 % error
  on a quantity give about a 2 % error on the bill, whatever the currency.
  *Breaking point*: for sums of prices, the absolute amounts add.
- **Anti-analogy to avoid**: "errors pile up, so just add them all." This installs M1.

## Demonstrations

- **Home**: time 1, 5 and 20 swings of a pendulum on a string; divide to get T and
  compare the spreads — timing many swings shrinks ΔT/T.
- **Teacher demo**: plot the same pendulum data as T–L (curve) and T²–L (line)
  side by side.
- **Largest/smallest check**: compute g with L high and T low, then L low and T
  high; the spread is about ± 3 %, matching the propagation rule.
- **Prediction before demo**: "which measurement limits g, L or T?"

## Discovery Questions

Guided discovery for linearisation; direct instruction for the propagation rules,
checked by the largest/smallest computation.

**Structure**:
1. *Need*: "This curve might be √L or L^0.6 — how can we tell?"
2. *Discovery*: "Square both sides of T = 2π√(L/g). What would be a straight line?"
3. *Direct instruction*: the propagation rules.
4. *Check*: largest and smallest possible g from the extreme readings.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Worked examples** (primary): pendulum linearisation and g with its uncertainty.
2. **Error exposure** (high fit for M1/M2): the unit-mismatched sum; 2.02² = 4.08.
3. **Practice** (high fit): new laws to linearise (s = ½ g t², T = 2π√(m/k), V = IR).

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Linearise T = 2π√(L/g) → T² = (4π²/g) L; gradient 4.02 s²/m → g ≈ 9.8 m/s².
   (b) Δ of a difference: 12.3 ± 0.1 − 4.1 ± 0.1 = 8.2 ± 0.2 cm.
   (c) Δ of g: 1 % + 2 × 1 % = 3 % → g = 9.9 ± 0.3 m/s².

2. **ERROR-ANALYSIS** — a student writes Δg = ΔL + ΔT = 0.03. Ask for the unit.

3. **PREDICTION-BEFORE-DEMO** — before computing Δg, ask which measurement
   dominates.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "Linearise T = 2π√(L/g)" → "volume of a cube known to 1 %" → "difference of
   250 ± 1 g and 100 ± 1 g".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "as a fraction of its reading"
every time a product is propagated; says "best-fit", never "line through the
points"; asks "what would make this a straight line?" before plotting.

*Load-bearing sentence to slow down on*: "For sums and differences, absolute
uncertainties add; for products and quotients, fractional uncertainties add —
and a power multiplies its fractional uncertainty."

*What to listen for*: "add the errors" for a product → M1; T² with ΔT/T → M2;
"join the points" or y/x of one point → M3.

## Assessment Signals

**Diagnostic — golden probe**: "L = 1.00 ± 0.01 m, T = 2.00 ± 0.02 s. What is the
fractional uncertainty in g = 4π²L/T²?" Correct: 0.03 (3 %).

**Distractor-mapped items**:
- "Fractional uncertainty of g?" Options: 0.02, 0.03, 0.03 m/s² (ΔL + ΔT),
  0.01. Answer: 0.03. Distractor 0.02 targets M2; the absolute sum targets M1.
- "Square of side 5.0 ± 0.1 cm: area fractional uncertainty?" Options: 0.02,
  0.04, 0.1 cm², 0.01. Answer: 0.04. Distractor 0.02 targets M2.

**Guided practice → independent practice fading ladder**:
1. Linearise three laws (scaffolded).
2. Gradient and intercept from a best-fit line (2 datasets).
3. Sums/differences (3 items).
4. Products/quotients/powers (4 items).
5. (Unscaffolded) a full practical: graph, constant, uncertainty.

**Mastery gate set** (per assessment/05):
- *Production*: one full pendulum analysis.
- *New surface*: a law not seen in instruction (T = 2π√(m/k)).
- *Mixed*: propagation items interleaved with graph items.
- *Delayed*: one-week check — the free-fall graph.

**Calibration note**: learners who have done practicals feel fluent; the check that
reveals miscalibration is the squared quantity — the 2 % vs 1 % item.

## Tutor Recovery Strategy

*Likeliest utterance*: "don't I just add the errors?" (M1); "what do I plot?"

*Concept-specific smaller question*: "What is 0.01 m as a percentage of 1.00 m?
And 0.02 s of 2.00 s?" Once both are percentages they can be combined.

*M2 recovery*: "Square 2.02 on your calculator. How many percent above 4.00 is it?"

## Memory Hooks

- **Concept type**: procedure (linearise, fit, propagate) + principle (a straight
  line tests a law).
- **Review form** (per Delivery 2 §8): one complete practical analysis per review
  cycle; the three propagation rules as spaced retrieval.
- **Automaticity target**: "fractional uncertainties add for products; times n for
  powers" should be instant before any practical write-up.
- **Interleaving partners**: `phys.meas.errors`, `phys.meas.significant-figures`,
  `phys.meas.measuring-instruments`, `phys.wave.pendulum`.

## Transfer Connections

- *Near*: `phys.wave.pendulum` — the pendulum practical itself.
- *Near*: `phys.em.ohms-law` — V against I, gradient R.
- *Far*: `phys.mech.hookes-law` — F against x, gradient k.
- *Real-world*: engineering tolerances, medical dose calculations, any scientific
  result stated as value ± uncertainty.
- *Expert transfer*: least-squares fitting, quadrature, log–log plots for power laws.

## Cross-Subject Connections

- **Mathematics**: y = mx + c, gradients, and logarithms for power laws; error
  propagation is a first-order Taylor expansion.
- **Chemistry**: rate constants from linearised rate laws (ln[A] against t for
  first-order kinetics); titration uncertainty.
- **Biology**: dose–response and growth curves; Lineweaver–Burk plots linearise
  enzyme kinetics the same way.
- **Economics/data science**: regression and confidence intervals.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.meas.linearisation-and-uncertainty.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 3). Graph-based analysis and
uncertainty propagation were not taught by any node; `phys.meas.errors` stops at
single-measurement error.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

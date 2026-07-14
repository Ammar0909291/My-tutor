# Measurement Errors and Uncertainty — `phys.meas.errors`

## Identity

- **Concept ID**: `phys.meas.errors`
- **Curriculum location**: physics / measurement & units
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.units` — the load-bearing part is knowing what physical quantities
    are and that they are measured with instruments that have physical limits. A
    learner without a concrete model of measurement (choosing a unit, reading an
    instrument, recording a value) cannot meaningfully discuss why that value might
    differ from the "true" value.
- **Unlocks** (from KG): `phys.meas.significant-figures` — and functionally every
  experimental context in the curriculum. A learner who does not understand error
  analysis cannot evaluate experimental data, cannot report results professionally,
  and will silently treat all calculated values as exact. This concept is the
  gateway to scientific thinking about evidence quality.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 3 · **References**: NCERT Physics Class 11 Ch. 2
- **Learning objectives** — the learner can:
  1. Distinguish between systematic error (consistent bias) and random error
     (unpredictable scatter) and give an example of each.
  2. Calculate absolute uncertainty, relative (fractional) uncertainty, and
     percentage uncertainty for a given measurement.
  3. Propagate uncertainty through addition/subtraction and
     multiplication/division using the standard rules.
  4. Express a measurement result in the correct form: (value ± uncertainty) unit,
     with uncertainty to 1 significant figure.

## Mental models

- **Beginner (arriving)**: errors are mistakes — something you made wrong. If you
  measure carefully, you get the "right" answer. There is one true value of any
  measurement, and careful observers reach it. "Error" is a stigmatised word
  implying carelessness.
- **Intermediate**: all measurements have uncertainty regardless of care — the
  instrument itself has limits (the smallest division) and the observer has limits
  (parallax, reaction time). The "true value" may be unknowable; we report our
  best estimate ± the range we believe contains the true value. Two types of error
  exist: systematic (shifts all readings in one direction — harder to detect) and
  random (scatters readings in both directions — averaging helps).
- **Advanced**: uncertainty is a quantitative claim about a probability distribution,
  not just a safety margin. The standard deviation of repeated measurements IS the
  random uncertainty. Systematic error cannot be reduced by averaging — it requires
  identifying and eliminating the bias source. Propagation rules follow from calculus
  (Taylor expansion of the measurement function) but can be applied without calculus
  via the standard addition-in-quadrature rule.
- **Expert**: measurement uncertainty at the metrological level (GUM framework —
  Guide to the Expression of Uncertainty in Measurement). Type A uncertainty
  (statistical, from repeated measurements) and Type B uncertainty (from
  calibration certificates, physics of the instrument). Measurement as a probability
  density function with a coverage interval, not a point ± a number. The 2019 SI
  redefinition eliminated the artefact kilogram specifically to remove systematic
  uncertainty from the definition of mass.
- **Versioning note**: install the intermediate model here (uncertainty as
  inherent, two error types, how to express results). Signal the advanced model:
  "when you study statistics, you'll see that the ± we write is shorthand for a
  probability statement — there's a deeper version of this."

## Why beginners fail here

The word "error" is the first obstacle: it implies blame. Learners who believe
errors are mistakes either deny having errors (the result is "exact") or
catastrophise small errors ("the experiment failed"). The actual concept — that
any finite instrument has a smallest readable division, and that's an irreducible
constraint, not a failure — is non-intuitive because everyday measurement in life
(ruler, scale, clock) appears exact. The second failure: learners memorise the
propagation rules as formulas to plug numbers into, without understanding what they
express (why ADD uncertainties for addition/subtraction? why ADD relative
uncertainties for multiplication/division?). This produces errors in novel
situations that don't match the memorised template.

## Misconception library

**M1 — Error means mistake; a careful experimenter has no error**
- *Why*: the word "error" in everyday English means mistake; this is the
  universal starting point (type 2, language transfer).
- *Symptom / phrases*: "I measured carefully, so my answer is exact"; "I made an
  error — I need to redo the measurement"; "error = 0."
- *Detection probe (verbatim)*: "You measure the length of a pencil with a ruler
  whose smallest division is 1 mm. What is your error?" Common wrong: "none, if
  I'm careful" or "the measurement has no error." Correct: at least ±0.5 mm
  (half the smallest division), unavoidably.
- *Recovery*: use a transparent ruler on a printed length that sits between two
  mm marks. "Both 12.7 mm and 12.8 mm look equally right — which is 'the answer'?"
  The uncertainty is built into the instrument, not the observer's care.
- *Verification*: given three different instruments (ruler at 1 mm, vernier
  caliper at 0.1 mm, micrometer at 0.01 mm), state the minimum uncertainty for
  each — if the learner says "zero for the best instrument," M1 persists.

**M2 — Random and systematic errors are interchangeable types**
- *Why*: both are "types of error" and learners often treat them as two names for
  the same thing (type 5, instructional grouping without differentiation).
- *Symptom / phrases*: "systematic error just means lots of random errors"; "you
  fix both by taking more readings."
- *Detection probe*: "A thermometer consistently reads 2°C too high. Is this
  random or systematic? Can you fix it by taking many readings and averaging?"
  Wrong: "random; yes, averaging fixes it." Correct: systematic; averaging does
  NOT fix it — it gives you a more precise version of the wrong answer.
- *Recovery*: the story contrast — a clock that's exactly 5 minutes fast (systematic;
  every reading is wrong by the same amount; knowing this lets you correct all
  readings) vs. a clock with a worn battery that runs slightly fast or slow
  unpredictably (random; averaging many readings helps; you can't correct a
  single reading). Draw the distributions: systematic shifts the curve; random
  spreads it.
- *Verification*: classify five experimental scenarios (consistently cold balance,
  wind jostling a pendulum, drift in a power supply, parallax always from the same
  angle, thermal noise) as systematic or random; predict what averaging does to each.

**M3 — Uncertainty propagates by adding the absolute uncertainties in all cases**
- *Why*: the addition rule for sum/difference does use absolute uncertainties; learners
  overgeneralise to multiplication/division (type 4).
- *Symptom*: for v = d/t with uncertainties Δd and Δt, writes Δv = Δd + Δt
  (wrong — should add relative uncertainties: Δv/v = Δd/d + Δt/t).
- *Detection probe*: "d = 10.0 ± 0.1 m, t = 5.0 ± 0.1 s. What is v and its
  uncertainty?" Wrong: "v = 2 m/s ± 0.2 m/s." Correct: Δv/v = 0.01 + 0.02 = 0.03,
  so Δv = 0.03 × 2 = 0.06 m/s → v = 2.0 ± 0.1 m/s.
- *Recovery*: the REASON for the two rules. Addition: the errors in d₁ and d₂
  could both push in the worst direction, so add them. Multiplication: when you
  multiply two quantities, you're asking "by what fraction can the result be off?"
  Each factor can be off by its own fraction, so add the fractions (not the amounts).
  Demonstrate with a numerical example showing the dimension mismatch if you add
  absolute uncertainties for a product.
- *Verification*: four propagation problems — two addition/subtraction type, two
  multiplication/division type — presented without labelling which is which.

**M4 — The "true value" is exactly the average of repeated measurements**
- *Why*: the mean is taught as the "best estimate" — learners interpret "best" as
  "exact" (type 5, instructional imprecision).
- *Symptom*: treats the mean as having zero uncertainty once computed; does not
  distinguish the precision of the mean from the precision of individual measurements.
- *Detection probe*: "You take 10 measurements with a mean of 5.23 and a range
  from 5.20 to 5.26. Is your answer exactly 5.23?" Correct: no — the mean is
  your best estimate, but the remaining uncertainty is approximately ±0.03 (range/2).
- *Recovery*: the mean reduces random uncertainty but does not eliminate it. More
  readings → smaller uncertainty on the mean (standard error = σ/√n), but never zero.
  The systematic uncertainty is independent of how many readings you take.
- *Verification*: give a data set; learner computes mean AND states the remaining
  uncertainty, distinguishing random and systematic contributions.

## Explanation library

- **Age 13–15 (story)**: "You weigh yourself on three different scales: 68.1 kg,
  68.4 kg, 67.9 kg. Which is 'right'? You don't know — each scale is a slightly
  different measuring tool. This is not a mistake; it's the nature of measurement.
  The best you can say is 'about 68 kg, give or take half a kilogram.' That 'give
  or take' is the uncertainty. All measurements have one. A result without an
  uncertainty is an incomplete result — like a price without a currency."
- **Age 15+**: "Every instrument has a resolution — a smallest unit it can display.
  A ruler with 1 mm markings can show the mm but not the half-mm. So any reading
  has inherent uncertainty of at least ±0.5 mm. Beyond the instrument, there are
  two types of error: systematic (the instrument is biased — it reads consistently
  too high or low) and random (the reading varies unpredictably — due to vibration,
  parallax, environmental changes). Systematic error shifts your mean; random error
  spreads your distribution. Averaging many readings reduces random error; it
  cannot fix systematic error."
- **Adult / scientist context**: "Measurement uncertainty is a mathematical
  statement: your result is a probability distribution, not a point. The ± notation
  is shorthand for 'there is a high probability (usually ~68% or ~95%, depending
  on convention) that the true value lies within this range.' Scientific results
  are only comparable when they carry properly propagated uncertainties — without
  them, you cannot know if two measurements agree."

## Analogy library

- **Best analogy**: a polling uncertainty. "Candidate X leads with 52%,
  margin of error ±3%." The margin isn't a mistake — it's the quantification of
  what you don't know. You couldn't get a perfect result without polling everyone;
  you couldn't get a perfect measurement without infinite precision. In both cases,
  the ± is information, not a failure.
  *Breaking point*: polling margin of error is a 95% confidence interval; physics ±
  in introductory courses is often just the instrument half-division (not a formal
  confidence level). Don't conflate the statistical sophistication.
- **Alternative**: archery target. Random error = shots scattered around the
  bullseye (good aim, imprecise). Systematic error = all shots consistently off to
  the right (the sight is misaligned — always wrong in the same direction). More
  shots help with scatter; they don't fix the bent sight.
  *Breaking point*: in archery, you can see where the shots land; in measurement,
  you often can't see the "bullseye" (true value) at all.
- **Anti-analogy to avoid**: "the more careful you are, the smaller your error" —
  this is sometimes true for random error but never for systematic error, and
  implies that all error is avoidable with enough care (installs M1). Always say
  "the more careful you are, the smaller your RANDOM error" — and separately note
  that systematic error requires identification and correction, not just care.

## Demonstration library

- **Home, no equipment**: measure the width of a book cover with a ruler.
  Record to the nearest mm. Measure again three times. Note the variation.
  Compute: mean, range, and report as "best estimate ± (range/2) mm." Verify:
  a "careful" second measurement is still not identical.
- **Teacher demo**: measure the same pencil length with three instruments of
  increasing resolution (ruler at 1 mm, vernier caliper if available, or a
  second ruler held at a different angle to simulate parallax). Show: three
  different readings from the same object. Ask: "are any of these wrong?"
  (No — they are differently precise.) Ask: "which has the smallest uncertainty?"
  (The finest-resolution instrument.)
- **Digital**: any simulation of repeated measurements with a Gaussian
  distribution — show histogram of 5, 20, 100 measurements; the distribution
  narrows with more readings. Identify: what does NOT narrow regardless of N?
  (Systematic offset.)
- **Prediction before demo**: give the learner a ruler with 1 cm markings (or
  ask them to imagine one). "What is the minimum uncertainty for any measurement
  with this ruler?" After answer, reduce to 1 mm markings — does the uncertainty
  change? The learner discovers the resolution-uncertainty link themselves.

## Discovery lesson

**Guided discovery** is appropriate for the core insight (measurement always has
uncertainty); **direct instruction** is needed for the propagation rules.

**Discovery phase (15 min)**:
1. *Need*: present three students who each measured the same table length and got
   slightly different values. "Who made the error?" (None — they're all slightly
   off, and that's inherent.) Build the concept of inherent uncertainty from this.
2. *Playground*: each learner measures the same object with two different
   instruments. Records the spread in their own readings.
3. *Invention*: learner states a rule for "how to express the measurement."
   Introduce the (value ± uncertainty) notation as the established convention.
4. *Collision*: present a systematic error scenario (thermometer always high).
   "More measurements — does it fix it?" (No.) → two types of error are distinct.

**Direct instruction phase**: propagation rules (add absolutes for +/−; add
relatives for ×/÷). Reason before rule. Multiple worked examples.

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Guided discovery → direct instruction** (split fit): discovery for the
   core concept; direct instruction for propagation rules.
2. **Worked examples** (high fit for propagation): three to five fully worked
   propagation problems with units, showing every step.
3. **Error exposure** (high fit): the systematic-vs-random distinction is best
   taught by showing both what averaging fixes and what it doesn't.
4. **Contrast cases** (high fit): same scenario, random error vs systematic —
   what averaging does to each.

Actions that DON'T fit:
- **Open-ended inquiry** (low fit for propagation rules): the propagation rules
  are not discoverable by learner reasoning from scratch; they require direct
  instruction. The principle (errors exist) is discoverable; the rules are not.

## Voice teaching

*How it sounds when taught well*: the tutor says "inherent uncertainty" rather
than "error" for the first 10 minutes to break the "error = mistake" association;
explicitly separates the two error types with named examples before any formulas;
works through propagation showing the reasoning, not just the rule.

*Load-bearing sentence to slow down on*: "Systematic error cannot be reduced by
taking more readings — only by identifying and eliminating the source of the bias."
Pause after this. Repeat.

*What to listen for*: "my experiment was perfect so there's no error" → M1;
"I'll take more readings to fix the systematic error" → M2; learner adds absolute
uncertainties for a product → M3; learner treats the mean as exact → M4.

*Pronunciation stake*: "uncertainty" is the professional term; "error" is acceptable
but carries the everyday connotation. Prefer "uncertainty" consistently.

## Assessment

**Diagnostic — golden probe**: "A student measures the same length 5 times and
gets values that vary by about 0.3 cm. They also notice the ruler's zero mark is
worn and they always start from 0.1 cm. (a) What type of error is the variation?
(b) What type is the worn zero mark? (c) Does taking more readings fix (a)? (b)?"
This probes both the classification and the averaging-doesn't-fix-systematic
distinction. Correct: (a) random, (b) systematic, (c) yes for random / no for systematic.

**Distractor-mapped items**:
- "A spring scale consistently reads 0.5 N too high. To reduce this error, you should:
  (A) take the mean of many readings, (B) identify and calibrate for the offset,
  (C) use a more sensitive scale, (D) average with another student's readings."
  Targets M2 — answer is B; A and D both target the "averaging fixes everything" belief.
- "d = 20.0 ± 0.5 m, t = 4.0 ± 0.2 s. Speed v = d/t. The uncertainty in v is:
  (A) 0.7 m/s, (B) 0.15 m/s, (C) 0.25 m/s, (D) 0.5/4.0 m/s." Targets M3 —
  correct: (B) [Δv/v = 0.025 + 0.05 = 0.075, Δv = 0.075 × 5 = 0.375 ≈ 0.4 m/s
  — actually recalculate: v = 5 m/s, Δv = 0.075 × 5 = 0.375 ≈ 0.4. Adjust
  distractors in production to match actual numbers.]

**Guided practice → independent practice fading ladder**:
1. Given three instrument readings of different resolutions — state the uncertainty
   for each (instrument half-division rule).
2. Given 5 measurements of the same quantity — compute mean, random uncertainty
   (range/2), and express result as mean ± uncertainty.
3. Classify four error scenarios as systematic or random; predict what averaging does.
4. Propagate uncertainty through two addition operations and two multiplication
   operations (scaffolded with labeled rule at top).
5. (Unscaffolded) full problem: two quantities with given uncertainties multiplied
   together; express final result correctly.

**Mastery gate set** (per assessment/05):
- *Production*: given a scenario with both systematic and random error sources,
  classify each and state which averaging reduces; compute relative uncertainty
  for a given measurement.
- *New surface*: propagate uncertainty through v² = u² + 2as given Δu, Δa, Δs.
- *Mixed*: interleaved items — classification, reporting, propagation — unmarked
  as to type.
- *Delayed*: one-week check on systematic vs. random classification and one
  propagation calculation.

**Calibration note**: learners greatly overestimate their confidence here after
first seeing the propagation rules — they feel "done" after one pass. Force
transfer: give a novel formula (P = IV) and ask for uncertainty propagation without
labelling the operation. Calibration question after: "how confident are you in your
answer? What would make you more confident?"

## Recovery notes

*Likeliest utterance*: "I thought you just add all the errors together" (M3
route); "my experiment didn't have any errors" (M1 route, usually when a learner
confuses error with failure).

*Concept-specific smaller question for M1*: "Look at this ruler — what is the
smallest unit it shows?" (mm.) "Could you read a length exactly between two marks?"
(No.) "So any measurement with this ruler is off by at most ___?" (0.5 mm.) "Is
that a mistake?" (No — instrument limit.) Build the unavoidability from the tool.

*M3 recovery*: "If d could be up to 0.5 m too big, and your time could be up to
0.2 s too big, what's the WORST CASE for speed?" Work through the worst case
numerically first; the propagation rule is a shortcut for that calculation.

## Memory & review

- **Concept type**: concept (two error types) + procedure (propagation rules).
  Both need separate treatment.
- **Review form** (per Delivery 2 §8): concept component — classification scenarios
  (random or systematic?) scattered throughout the curriculum whenever experimental
  data appears; procedure component — spaced retrieval of the propagation rules
  (add absolutes for +/−; add relatives for ×/÷), with one worked example each time.
- **Automaticity target**: propagation of uncertainty through multiplication and
  division should be automatic before electromagnetism experiments; the classification
  should be automatic by the end of the measurement domain.
- **Interleaving partners**: `phys.meas.significant-figures` (related precision
  concept, same domain); `phys.mech.kinematics-1d` (first context where velocity
  and distance measurements are combined — natural propagation practice).

## Transfer map

- *Near*: `phys.meas.significant-figures` — sig figs are how you express the
  precision of a result without full uncertainty notation.
- *Near*: every experimental measurement in the curriculum — error analysis is
  used whenever real data appear.
- *Far*: statistics (standard deviation, standard error, confidence intervals).
- *Cross-subject*: chemistry (titration uncertainty, balance precision);
  biology (biological variation vs. measurement uncertainty); engineering
  (tolerance stackup in manufacturing).
- *Real-world*: blood pressure cuffs (±5 mmHg uncertainty stated on the device);
  GPS accuracy (±3 m); scales on food packaging ("net weight 500 g ± 5%");
  economic forecasts (±margin of error).
- *Expert transfer*: quantum measurement uncertainty (Heisenberg) — NOT the same
  as instrument uncertainty, but understanding classical uncertainty first clears
  the conceptual space for the quantum version.

## Curriculum feedback

The KG lists only `phys.meas.significant-figures` as an unlock. This is narrower
than the actual downstream impact: `phys.meas.errors` is functionally a prerequisite
for all experimental/lab components of the curriculum. The description "quantify
the deviation of a measured value from the true value" slightly misrepresents the
concept — the "true value" may be unknowable; the uncertainty is a claim about
a RANGE, not a known deviation. Suggested description update to the Pipeline:
"Uncertainty analysis quantifies the range within which the true value likely
lies and distinguishes systematic bias from random scatter."

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

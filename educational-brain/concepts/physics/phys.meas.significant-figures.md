# Significant Figures and Precision — `phys.meas.significant-figures`

## Identity

- **Concept ID**: `phys.meas.significant-figures`
- **Curriculum location**: physics / measurement & units
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.errors` — the load-bearing part is the concept that measurements
    have inherent uncertainty and that expressing a result requires communicating
    the PRECISION of that result, not just the value. Without understanding that
    measurements are approximate, significant figures are a set of arbitrary rules
    to follow rather than a meaningful convention for communicating precision.
- **Unlocks** (from KG): none listed directly — but significant figures is a
  cross-cutting convention used whenever a numerical result is reported. Every
  calculated quantity in the curriculum should be expressed to appropriate
  significant figures; this concept is the licence to do so.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Ch. 2
- **Learning objectives** — the learner can:
  1. Count the number of significant figures in a given measured value, including
     cases with leading, trailing, and embedded zeros.
  2. Round a calculated result to the correct number of significant figures for
     addition/subtraction and multiplication/division.
  3. Explain WHY the number of significant figures in a result cannot exceed the
     precision of the least precise measurement used.
  4. Express a number in scientific notation to clarify ambiguous significant
     figures (trailing zeros in large numbers).

## Mental models

- **Beginner (arriving)**: significant figures are a counting rule about zeros —
  a set of arbitrary distinctions (leading zeros don't count; trailing zeros do
  sometimes; "0.007" has one but "1700" is ambiguous). The rules feel arbitrary
  because the underlying reason (communicating measurement precision) has not been
  connected to them.
- **Intermediate**: each digit in a measured value encodes information about the
  precision of the instrument. Leading zeros are not information — they just locate
  the decimal point. Trailing zeros after a decimal point ARE information — they
  say "this digit was actually measured, not just empty." The rule for operations
  (use the least precise operand to determine result precision) reflects that the
  calculation cannot produce more information than its inputs contained.
- **Advanced**: significant figures are a shorthand for uncertainty notation.
  "3.45 cm" implies an uncertainty of about ±0.005 cm (half a unit in the last
  place). The significant-figure rules are approximations of the proper uncertainty
  propagation rules: for multiplication/division, adding relative uncertainties
  is roughly equivalent to using the fewest significant figures; for addition/
  subtraction, the absolute uncertainty of the result is dominated by the largest
  absolute uncertainty, matching the "decimal place" rule.
- **Expert**: significant figures are a useful convention but they are NOT a
  substitute for full uncertainty analysis. They have known failure modes: a
  subtraction of nearly equal numbers can dramatically reduce sig figs (catastrophic
  cancellation); they cannot represent asymmetric uncertainties; they give no
  information about confidence levels. Professional science uses full ± notation
  for this reason; significant figures are an introductory tool.
- **Versioning note**: install the intermediate model here (digits as precision
  information; the operation rules as precision-preserving). The expert limitations
  are stated briefly but not dwelt upon — this concept is the introductory tool.

## Why beginners fail here

There are two distinct failure modes. First, the rules-without-reason failure:
the learner memorises "leading zeros don't count" but cannot explain WHY, and
so the rule is fragile under novel cases (what about "1.00300"?). Second, the
calculation-rule failure: after an operation, the learner rounds the final answer
but not the intermediates correctly, OR they apply the multiplication rule to an
addition and the addition rule to a multiplication. The root of both: learning
the rules as arbitrary conventions rather than as consequences of how measurement
precision works.

## Misconception library

**M1 — Trailing zeros never count as significant figures**
- *Why*: "zeros don't count" is the first rule taught and learners overgeneralise
  it to ALL zeros (type 4, overgeneralisation from leading-zero rule).
- *Symptom / phrases*: says "1300" has 2 significant figures; says "4.50" has 2
  significant figures; cannot distinguish ambiguous from unambiguous trailing zeros.
- *Detection probe (verbatim)*: "How many significant figures are in 4.50?"
  Correct: 3 (the trailing zero after the decimal IS significant — it was measured).
  Wrong: 2 ("the zero doesn't count").
- *Recovery*: the decimal point signals intent. "4.5" means the last measured
  digit is the 5 (we didn't measure further). "4.50" means the last measured
  digit is the second zero — we measured to the hundredths place and got zero.
  The zero IS information here; removing it would claim less precision than exists.
- *Verification*: a mix of cases — 0.0030, 1.300, 4500, 4500., 4.500 — learner
  counts sig figs and explains the zero decisions.

**M2 — More decimal places = more significant figures = more precision**
- *Why*: calculators always display 8+ digits regardless of input precision;
  learners equate "more digits on screen" with "more accurate" (type 2, perceptual
  from calculator output).
- *Symptom*: reports 9.81 × 2.3 = 22.563 (6 sig figs from a calculator) without
  rounding to 23 (2 sig figs from the least precise operand).
- *Detection probe*: "Your calculator says the answer is 18.4736. The least
  precise measurement had 3 significant figures. What should you report?"
  Correct: 18.5. Wrong: 18.4736 ("the calculator is more precise than I am").
- *Recovery*: the calculator does not know the precision of the inputs — it treats
  all numbers as exact. YOU are responsible for not claiming more precision than
  your measurements justify. Reporting 22.563 when you only measured to 2 sig figs
  is a false claim of precision — more deceptive than useful.
- *Verification*: given a product with inputs of different sig-fig counts, round
  correctly and explain why the extra digits are dropped.

**M3 — Use the same rule (least sig figs) for addition and subtraction as for
multiplication and division**
- *Why*: "use the least" is remembered but the rule type (sig figs vs. decimal
  places) is forgotten (type 5, instructional conflation).
- *Symptom*: for 100.3 + 0.002, uses sig-fig count instead of decimal-place count;
  gives result to 4 sig figs (the minimum) instead of 1 decimal place (the
  precision of 100.3).
- *Detection probe*: "Compute 12.56 + 0.3 and express to correct precision."
  Correct: 12.9 (decimal place rule — the least precise has 1 decimal place).
  Wrong: 12.6 or 13 (sig-fig rule applied incorrectly).
- *Recovery*: the underlying reason for the two rules. Addition/subtraction: errors
  are ABSOLUTE; the largest absolute uncertainty governs. Multiplication/division:
  errors are RELATIVE; the largest relative uncertainty (fewest sig figs) governs.
  Two operations → two rules → same reason (preserve precision without inflating it).
- *Verification*: a mixed problem set with both operation types, unlabelled.

**M4 — "1700" has 4 significant figures because all non-zero digits count**
- *Why*: the rule "non-zero digits always count" is learned first; trailing zeros
  in large integers are an exception that requires a separate lesson (type 5,
  incomplete instruction).
- *Symptom*: says 1700 has 4 sig figs without knowing how the value was measured.
- *Detection probe*: "How many significant figures does 1700 have?" Correct: "it's
  ambiguous — could be 2, 3, or 4; scientific notation resolves it." Wrong: "4"
  (treats trailing zeros as significant without the decimal/notation context).
- *Recovery*: "1700" without context could mean "measured to the nearest 100, 10,
  or 1." The only way to be unambiguous: write 1.7 × 10³ (2), 1.70 × 10³ (3),
  or 1.700 × 10³ (4). This is WHY scientific notation exists for large numbers.
- *Verification*: convert ambiguous trailing-zero numbers to scientific notation,
  choosing a sig-fig count.

## Explanation library

- **Age 13–15 (story)**: "You weigh 68 kg on a bathroom scale. Your friend is a
  biochemist and weighs 68.3124 kg on a precision lab scale. If I ask 'what do the
  two of you weigh together?', and you add 68 + 68.3124, the calculator says
  136.3124 kg. But you only know your weight to the nearest kilogram. Claiming
  136.3124 is a false claim — you're pretending you know your weight to the
  nearest 0.0001 kg. The honest answer is 136 kg. Significant figures prevent this
  false precision."
- **Age 15+**: "Significant figures are a shorthand for communicating measurement
  precision. Each significant digit represents a measured quantity; non-significant
  zeros are either placeholders (leading zeros) or ambiguous (trailing zeros in
  integers). Operations cannot create precision: multiplying 3.5 (2 sig figs) ×
  2.1 (2 sig figs) = 7.35 (calculator) → 7.4 (2 sig figs, rounded). The rule
  reflects that the result is only as precise as the least precise input."
- **Adult returning learner**: "Your calculator doesn't know what your ruler can
  measure. Every number you type into a calculator carries hidden context: how many
  of these digits came from an actual measurement, vs. how many are placeholders or
  calculator artefacts? Significant figures are the convention for keeping that
  context attached to the number as you calculate."

## Analogy library

- **Best analogy**: a team relay race score. Your team's average time is only
  as accurate as the worst stopwatch used. If one timer is accurate to 0.1 s and
  another to 1 s, the combined result is only meaningful to 1 s — the imprecise
  timer sets the limit. Adding more precise timers for the other legs doesn't
  fix the imprecise one.
  *Breaking point*: in a relay, you might discard the bad timer; in measurement,
  you can't always discard the imprecise measurement.
- **Alternative**: a chain is as strong as its weakest link. In a series of
  multiplied measurements, the precision of the result is limited by the least
  precise measurement — the "weakest link" in the precision chain.
  *Breaking point*: this captures the multiplication rule but not the addition rule
  (which uses decimal places, not the weakest-link metaphor).
- **Anti-analogy to avoid**: "more significant figures is always better." This
  installs M2 directly. Pre-empt: "more significant figures is better ONLY if they
  come from real measurements. Invented precision is worse than acknowledged
  imprecision."

## Demonstration library

- **Home, no equipment**: measure the length of a piece of paper with a ruler
  (to 1 mm), then compute the perimeter. Show: the perimeter calculation on a
  calculator; then round to appropriate sig figs. Notice: the answer doesn't change
  physically — you just stopped lying about precision.
- **Teacher demo**: compute the density of a block (mass/volume) with mass measured
  on a scale (3 sig figs) and volume from length × width × height (each to 2 sig figs).
  Calculator answer: e.g. 2.7143 g/cm³. Correct answer: 2.7 g/cm³ (2 sig figs).
  Ask: "is the calculator wrong?" (No — but it doesn't know the input precision.)
- **Interactive**: a significant-figures game where learners identify the sig figs
  in a set of numbers, race to classify correctly. Quick, low-stakes, high
  repetition.
- **Prediction before activity**: show "0.0050" on the board. "How many significant
  figures? Write your answer before I explain." Collect predictions, show the
  spread, then teach. The disagreement motivates the rule.

## Discovery lesson

**Direct instruction** is warranted for the counting rules — the conventions for
leading/trailing zeros are genuinely arbitrary human choices, not discoverable
from first principles. The underlying REASON (don't claim more precision than your
measurements justify) can be discovered; the specific rules are then taught as
the agreed-upon implementation of that reason.

**Structure** (two-phase):
1. *Discovery phase*: "what information is lost when you round 12.46 to 12.5?
   To 12? To 10?" Learner sees that each rounding discards precision. Build the
   concept: expressing precision = choosing how many digits to keep. Then the
   question: is there a principled way to decide? → this motivates the rules.
2. *Direct instruction phase*: introduce the rules as the physicists' convention
   for implementing that principled choice. Rules: leading zeros (placeholders,
   not measurement), trailing zeros (context-dependent), embedded zeros (always
   significant). Then the operation rules with the WHY stated before the HOW.

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Direct instruction** (primary for rules): after the motivating reason is built
   via short discovery.
2. **Worked examples** (high fit): the operation rules need multiple worked traces
   before independent application. Show both addition and multiplication cases,
   in alternation.
3. **Discrimination training** (high fit): interleaving zero-type classification
   (leading / trailing-after-decimal / trailing-before-decimal) builds the rule
   discrimination needed to avoid M1 and M4.

Actions that DON'T fit:
- **Debate / argumentation**: no productive controversy at this level; the rules
  are conventions.
- **Open-ended inquiry for the rules themselves**: see Discovery lesson — reason
  is discoverable, rules are not.

## Voice teaching

*How it sounds when taught well*: when demonstrating the counting rules, the tutor
says WHY each zero is or isn't significant; the word "false precision" is used
when a learner reports too many digits; the link back to uncertainty is made
explicit ("significant figures are a shorthand for ± notation").

*Load-bearing sentence to slow down on*: "Reporting more digits than your
measurements justify is a false claim of precision — it's not neutral, it's
misleading." Pause. Then: "significant figures are how physicists stop this."

*What to listen for*: "trailing zeros don't count" without caveat → M1; learner
transcribes calculator output without rounding → M2; applies sig-fig rule to
addition → M3; says 1700 has exactly 4 sig figs → M4.

## Assessment

**Diagnostic — golden probe**: "You measure d = 1.30 cm and t = 0.5 s. Compute
v = d/t and express it to the correct number of significant figures." This requires:
knowing 1.30 has 3 sig figs (trailing zero after decimal), 0.5 has 1 sig fig;
v = 2.6 cm/s → 3 sig figs? No — the limiting factor is 0.5 with 1 sig fig →
report v = 3 cm/s. This catches M1 (trailing zero), M2 (calculator output), and M3
(multiplication rule).

**Distractor-mapped items**:
- "How many significant figures in 0.0700?" — options: 1, 3, 4, 7. Answer: 3.
  Distractor 1 targets M1 (only the 7 counts). Distractor 4 targets the "count all
  non-zero digits plus these specific zeros" confusion.
- "12.1 + 0.053 = ?" — options: 12.153, 12.2, 12.15, 12. Answer: 12.2 (1 decimal
  place limit from 12.1). Distractor 12.153 targets M2 (calculator output). Distractor
  12.15 targets M3 (uses 3 sig figs from 0.053 instead of decimal-place rule).

**Guided practice → independent practice fading ladder**:
1. Count sig figs in 12 numbers including all zero types (scaffolded: rule given
   at top).
2. Round 8 calculation results to correct sig figs after operation — 4 addition,
   4 multiplication (scaffolded: rules at top).
3. Same as 2, unscaffolded.
4. Full problem: given two measurements, compute an area; report correctly;
   explain why.
5. (Delayed) classify sig figs in 6 ambiguous cases; express in scientific notation
   to remove ambiguity.

**Mastery gate set** (per assessment/05):
- *Production*: count sig figs in 10 given values (including all zero types) with
  justification; round 6 calculated results correctly (3 add/sub, 3 mult/div).
- *New surface*: given a novel quantity (e.g. period of oscillation computed from
  multiple measurements), express correctly with appropriate sig figs.
- *Mixed*: interleaved counting + rounding + operation-type identification.
- *Delayed*: one-week — 6 rounding problems (unlabelled add/sub vs mult/div).

**Calibration note**: learners feel most confident after the counting rules (feel
simple). True mastery check: unscaffolded mix of add-sub and mult-div rounding
with ambiguous zeros in inputs. Miscalibration is common here — probe with novel
cases before confirming mastery.

## Recovery notes

*Likeliest utterance*: "so I just round to 3?" (correct answer but by rote,
not by understanding rule type); "the zero doesn't count" (M1); "the calculator
said 18.5437 so I wrote 18.5437" (M2).

*Concept-specific smaller question*: if the learner is paralysed by zero-counting,
shrink to: "Is this zero just holding the place of a digit, or did someone actually
measure it?" For 0.0070 — "does the 0 in the thousandths place tell us something
was measured? Yes — the zero was read from the instrument, not just placed there."

*M3 recovery*: "For 12.1 + 0.053 — what is the absolute uncertainty of 12.1?"
(±0.05, one decimal place.) "What is the absolute uncertainty of 0.053?" (±0.0005,
three decimal places.) "Which dominates the SUM?" (12.1's uncertainty, because it's
bigger.) "So your result can only be trusted to ___?" (one decimal place.)
This walks through the WHY; the rule follows from it.

## Memory & review

- **Concept type**: procedure (rules for counting and rounding), with an underlying
  concept (precision communication).
- **Review form** (per Delivery 2 §8): procedure → spaced retrieval via classification
  and rounding problems. The underlying concept is cemented by asking "why did you
  round to that many digits?" — requiring a spoken justification, not just a number.
- **Automaticity target**: applying the rounding rules to a calculated result should
  be automatic before leaving the measurement domain — an unreflective habit applied
  to every numerical result in subsequent domains.
- **Interleaving partners**: `phys.meas.errors` (related concept, same domain —
  sig figs as shorthand for ±); any calculation-heavy concept in the curriculum
  (kinematics, energy, forces) where results must be expressed correctly.

## Transfer map

- *Near*: any calculation in the physics curriculum — the sig-fig habit must
  be sustained throughout.
- *Near*: `phys.meas.errors` — sig figs as an approximation to proper ± notation.
- *Far*: chemistry (stoichiometry calculations with significant figures);
  engineering (tolerance specification); statistics (reporting means and
  standard deviations to appropriate precision).
- *Real-world*: drug dosage (3.5 mg not 3.4999 mg); engineering specifications
  (0.250 mm tolerance in machined parts); financial reporting (to two decimal places
  by convention, not by measurement precision).
- *Expert transfer*: arbitrary precision arithmetic in computing — contrast
  with floating-point representation and the different ways "precision" manifests
  in numerical computation vs. physical measurement.

## Curriculum feedback

The KG lists no unlocks — this is an underrepresentation. Significant figures
affects the EXPRESSION of every result in the curriculum. A suitable structural
note to the Pipeline: this concept's downstream reach should be represented as
a cross-cutting dependency (like units), not an isolated terminal node. The
`estimated_hours: 2` is accurate for the concept itself; significant figures
become automatic only through practice across many subsequent topics.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

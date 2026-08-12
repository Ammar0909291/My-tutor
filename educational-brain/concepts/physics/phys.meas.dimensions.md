# Dimensional Analysis — `phys.meas.dimensions`

## Identity

- **Concept ID**: `phys.meas.dimensions`
- **Curriculum location**: physics / measurement & units
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.units` — the load-bearing part is knowing that physical quantities
    have units made of base units, and that those base units have specific
    identities (metre for length, kilogram for mass, second for time, etc.). A
    learner who cannot name the base units cannot write dimensional formulae.
- **Unlocks** (from KG): no direct `unlocks` in the KG, but functionally this
  concept is a self-checking tool used throughout the entire physics curriculum.
  Every equation-verification, unit-derivation, and formula-reconstruction task
  in all downstream domains uses dimensional analysis implicitly or explicitly.
  The KG underrepresents this concept's connectivity — dimensional analysis is a
  cross-cutting tool, not a terminal concept.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 3 · **References**: NCERT Physics Class 11 Ch. 2


## Learning Objective

After this concept, the learner can:

1. Write the dimensional formula of a given physical quantity using the symbols
   M (mass), L (length), T (time), A (current), Θ (temperature), N (amount),
   J (luminous intensity).
2. Verify whether a given physical equation is dimensionally consistent
   (both sides have the same dimensional formula).
3. Derive the SI unit of a physical quantity from its dimensional formula.
4. Identify the limitations of dimensional analysis: it cannot determine
   dimensionless constants and cannot distinguish between multiple
   dimensionally consistent forms of a formula.


## Core Understanding

You just saw a formula. Is it right? You could run an experiment — but that takes time, equipment, and trust. There is a faster, cheaper check: dimensional analysis. It asks one question: *is the left side the same TYPE of physical quantity as the right side?*

Every physical quantity has a dimension — a TYPE label — that is independent of the unit system. Length is L whether you measure in metres, feet, or light-years. Time is T whether in seconds or centuries. When you write an equation, you are claiming the two sides are equal. Dimensional analysis checks whether they are even the same type. Metres cannot equal seconds. Mass cannot equal energy. A failed check is a mathematical proof that the formula is wrong — no experiment needed.

This is a necessary-but-not-sufficient check: it catches type-errors, but it cannot catch coefficient errors. "F = ma" and "F = 2ma" are BOTH dimensionally [MLT⁻²]. Experiments distinguish them; dimensions cannot. Knowing this limitation is as important as knowing how to use the tool — every learner who says "I checked by dimensions so it's correct" has learned half of the lesson.

## Mental Models

- **Beginner (arriving)**: dimensional analysis is a formula or recipe — "write
  M, L, T, A, Θ for each quantity and substitute." It is a procedure to execute,
  not a principle to understand. The learner does not see WHY consistent dimensions
  imply a valid equation.
- **Intermediate**: dimensions are the TYPE of physical quantity, independent of
  the unit system. Length is always L — whether you measure in metres or feet,
  it's still L. A dimensionally consistent equation makes the same physical claim
  on both sides; an inconsistent one is necessarily wrong, regardless of numbers.
  The learner can apply the method but cannot yet explain why it works.
- **Advanced**: dimensions are a conserved label that propagates through algebraic
  operations. Multiplying L × T⁻¹ gives "length per time" = velocity — the
  dimension encodes the physical meaning. Adding L + T is like adding 5 apples
  to 5 oranges: numerically possible, physically meaningless. The learner grasps
  that dimensions are a shadow of physical meaning that algebra preserves.
- **Expert**: dimensional analysis is a theorem — Buckingham's π theorem — that
  constrains the form of physical laws by counting independent dimensionless
  parameters. Given the physical quantities involved in a phenomenon, you can
  determine the STRUCTURE of the governing equation up to dimensionless constants.
  This is how physicists guess formulas they cannot yet derive from first principles
  (pendulum period, terminal velocity, etc.).
- **Versioning note**: install intermediate here (type-checking principle, not
  formula recipe). Note the expert model at the end: "you'll use this tool to
  derive equations you haven't seen yet — that's dimensional analysis at the
  advanced level." Do not attempt to teach the π theorem.

## Why Students Fail

The dominant failure is executing the procedure without understanding the principle:
learners write M, L, T mechanically (often from a memorised table) but cannot
explain why "force = mass × velocity" would be dimensionally wrong. They also
fail to see that dimensional consistency is a NECESSARY but NOT SUFFICIENT
condition — [MLT⁻²] = [MLT⁻²] confirms the dimension type is right but does not
confirm the numerical coefficient. The most pernicious failure: using a
dimensionally correct "check" as proof that the formula is right, then defending
the wrong formula on that basis.

## Misconceptions

**M1 — Dimensional consistency proves a formula is correct**
- *Why*: the check is taught before its limitations are stated; learners see it
  succeed on all the examples given and overgeneralise (type 5, instructional
  incompleteness).
- *Symptom / phrases*: "I checked it by dimensions and it's fine, so the formula
  must be right"; uses dimensional analysis as proof rather than as a necessary
  condition.
- *Detection probe (verbatim)*: "Is F = ½mv² dimensionally consistent?" Yes
  ([MLT⁻²] both sides if you're careful). "Does that mean it's the correct
  formula for force?" (No — the correct formula is F = ma; ½mv² is kinetic
  energy.) If the learner says yes to both, M1 is active.
- *Recovery*: present two distinct formulas that are both dimensionally consistent
  but only one of which is physically correct (F = ma vs. F = 2ma; both have
  dimensions MLT⁻², but only one is right). The dimension check cannot distinguish
  them — it cannot determine numerical coefficients.
- *Verification*: "can this formula be correct?" items where the answer is "it
  passes the dimension test but is still wrong" — measure whether learner accepts
  this; delayed check to see if M1 has reverted.

**M2 — You add dimensions like numbers (L + L = 2L, not just L)**
- *Why*: algebraic habit of adding like terms (type 4, overgeneralisation from
  arithmetic); L + L feels like it should give 2L by analogy to 2x + 3x = 5x.
- *Symptom*: writes "[L] + [L] = [2L]" when checking an equation with two length
  terms.
- *Detection probe*: "What is the dimension of x + y if x and y are both lengths?"
  Correct: [L]. Common wrong: "[2L]."
- *Recovery*: the orange analogy — 5 oranges + 3 oranges = 8 oranges, not "8
  pairs of oranges." The unit doesn't double when you add; only the NUMBER changes.
  5 m + 3 m = 8 m, still [L]. Dimensions track TYPE, not quantity.
- *Verification*: dimension-of-sum items; mixed with dimension-of-product items.

**M3 — Dimensions are the same as units**
- *Why*: the two concepts are introduced close together and confusion is easy; some
  texts use "units" and "dimensions" interchangeably (type 5, instructional
  conflation).
- *Symptom / phrases*: writes "the dimension of force is newtons" or "the dimension
  of length is metres."
- *Detection probe*: "What is the dimension of velocity?" Correct: [LT⁻¹]. Common
  wrong: "metres per second."
- *Recovery*: the distinction in one sentence: "units are specific choices (metres,
  feet, AU — all measure length); dimensions are the TYPE (L — always the same
  regardless of unit choice). Two quantities in different unit systems can have the
  same dimension." Follow with: dimension of velocity in SI (LT⁻¹) and in Imperial
  (still LT⁻¹) — the unit changed, the dimension didn't.
- *Verification*: "give the dimension and the SI unit" items — two separate answers
  required.

**M4 — Dimensionless quantities have "no dimensions" in the sense of being
dimensionally wrong**
- *Why*: "dimensionless" sounds like "incomplete" to learners unfamiliar with the
  concept (type 2, linguistic ambiguity).
- *Symptom / phrases*: "angles can't be in an equation with force because they
  don't have dimensions"; rejects cos(θ) in equations because it "has no unit."
- *Detection probe*: "What are the dimensions of the ratio distance/radius?" Correct:
  [L/L] = [1] (dimensionless). If learner says "it's undefined" or "you can't do
  that," M4 is active.
- *Recovery*: a ratio of same-dimension quantities is pure number (dimensionless) —
  like 50% or π or e. It has dimensions [M⁰L⁰T⁰] = [1]. These are valid in any
  equation. Angles in radians (arc length/radius) are naturally dimensionless.
- *Verification*: items that require recognising dimensionless ratios; equations
  involving trigonometric functions (no units issue).

**M5 — A derived quantity takes the dimension of the quantity it is "about"
(speed is L, because speed is about distance)**
- *Why*: type 1, overgeneralisation, with a type 4 (notation-induced) accelerant.
  The learner has just correctly learned "the dimension of distance is L" and
  extends it by association: speed is *described using* distance, so speed *is*
  L. The notation reinforces it — speed is written as a fraction, and a beginner
  reads the top line as "the thing" and the bottom line as an afterthought about
  how it was obtained. The divisor is dropped, not disbelieved. This is the
  gateway error for every derived quantity: the same move gives density = M,
  pressure = M, and acceleration = L.
- *Symptom / phrases*: "so speed is L then? because it is distance"; "speed is
  just how far you go, so it's length"; names only the numerator when asked for
  a derived dimension; agrees that speed is measured in metres per second while
  still writing its dimension as [L].
- *Detection probe (verbatim)*: "Two cars each travel 100 metres. One takes 5
  seconds, the other takes 50 seconds. Did they travel the same distance? Do they
  have the same speed?" (Same distance; different speed.) Then: "So if the
  distance is identical and the speed is not, can speed be the same kind of thing
  as distance?" A learner holding M5 says yes to the first, hesitates on the
  second, and cannot say what changed.
- *Recovery*: do not begin with the formula. Begin with the counter-case above —
  the learner must SEE two situations with identical length and different speed
  before any symbol appears, because that is the observation the misconception
  cannot survive. Then name it: speed is not a length, it is a length *per*
  something, and the "per" is not decoration — it is half the quantity. Only then
  the notation: distance ÷ time, so L ÷ T, written [LT⁻¹]. Close by generalising
  it once, so the repair transfers instead of being memorised for speed alone:
  "any time you see the word 'per', two dimensions are involved, not one."
- *Verification*: ask for the dimension of a DIFFERENT derived quantity the
  learner has not been walked through (density, pressure) — if only the numerator
  comes back, M5 is still active and only the speed case was patched. Delayed
  re-check one session later, since this one reverts under load.
- *Provenance*: authored 2026-08-12 from a measured production failure. A real
  learner wrote exactly "so speed is L then? because it is distance" and the turn
  neither answered nor corrected it. None of M1–M4, and neither Blueprint
  register entry (MC-1 units-vs-dimensions, MC-2 adding unlike terms), covers it.

## Analogies

- **Best analogy**: type-checking in a programming language. In typed languages,
  you cannot add an integer to a string — it fails at compile time, not run time.
  Dimensional analysis is physics' type system: it catches type-mismatches
  (adding length to time) before you substitute numbers. Numbers don't carry their
  type; dimensions do.
  *Breaking point*: type-checking in code is exact (any error fails); dimensional
  analysis has gaps (dimensionless constants, multiple valid structures). Don't
  extend to "dimensional analysis catches all errors."
- **Alternative**: recipe scaling. If a cake recipe has ingredients in grams and
  millilitres, scaling by 2× gives 2× grams and 2× millilitres — the unit
  relationships are preserved. But you cannot add grams to millilitres: they are
  different types of ingredient. Dimensional analysis says the same for physical
  quantities.
  *Breaking point*: in cooking, you sometimes can convert between volume and mass
  (density of water = 1 g/mL). This does not hold as a general physical principle.
- **Anti-analogy to avoid**: "dimensions and units are the same thing, so
  dimensional analysis is just checking your units match." This installs M3.
  Always keep the dimension/unit distinction explicit.

## Demonstrations

- **Home, no equipment**: write v = √(2as) on paper. Check dimensions: v is [LT⁻¹],
  a is [LT⁻²], s is [L]. So 2as is [L²T⁻²]. √([L²T⁻²]) = [LT⁻¹]. Both sides
  [LT⁻¹]. ✓ Note: the "2" is dimensionless — it contributes nothing to the
  dimensional check. This shows dimensionless constants are invisible to the tool.
- **Teacher demo**: write three "formulas" on the board, one correct, one wrong
  (adding length to velocity), one dimensionally consistent but physically wrong
  (wrong coefficient). Run the dimension check on all three. Show: check fails on
  one (wrong type), passes on two — including the wrong one. Demonstrates both
  the power and the limitation.
- **Interactive**: use a dimension-analysis worksheet where the learner derives
  the unit of kinetic energy (kg·m²/s² = joule) from [½mv²] → [M(LT⁻¹)²] =
  [ML²T⁻²]. Predicting the unit from dimensions.
- **Prediction before demo**: before checking v = at + ½at², ask: "do you think
  this formula has the same type on both sides?" Learners often say "I can't tell
  without trying." After trying — the check catches a forced dimensional error if
  you write it as v = at + ½at (missing a factor) — show what a failed check
  looks like concretely.

## Discovery Questions

**Guided discovery is the right form here** — the idea that physical equations
must have the same "type" on both sides can be reached by the learner from a
clear set of contrasting examples.

**Discovery sequence**:
1. *Need*: write on the board: "5 apples + 3 oranges = 8 ___?" Ask: "is this
   a valid statement?" (No — you can't add apples and oranges.) "What about
   5 metres + 3 metres?" (Valid — same type.) "What about 5 metres + 3 seconds?"
   (Invalid — different types.) "So we can only add quantities of the SAME type."
2. *Playground*: give five physics equations (real and fictitious). Learner marks
   each quantity's "type" (mass, length, time) informally, then checks whether
   both sides are the same type.
3. *Invention*: formalise the "type" as dimensional formula. Introduce M, L, T
   notation as the shorthand for the types they already identified.
4. *Collision*: show a dimensionally consistent but numerically wrong formula.
   "It passes the type check — does that mean it's right?" (No.) This limits
   the concept before it is overgeneralised (prevents M1).
5. *Formalization*: state the principle and the limitations together.
6. *Compression*: "Dimensions check TYPE. They catch type-errors. They can't
   catch coefficient errors."

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Guided discovery** (highest fit): see Discovery lesson — the type-checking
   principle can be reached by learner reasoning from contrast cases.
2. **Worked examples** (high fit): dimensional analysis is a procedural skill
   after the principle is understood; multiple worked traces are needed before
   independent application.
3. **Error exposure** (high fit): showing both the pass-case and the limitation
   case (dimensionally correct but wrong formula) is essential for preventing M1.

Actions that DON'T fit:
- **Retrieval practice on dimensional formulae** (medium fit ONLY): learning the
  dimensional formula of 20 quantities by rote is possible but misses the point
  — the skill is deriving the formula from what the quantity IS, not recalling a list.
  Some formulae do need memorisation (M, L, T for mass/length/time); others should
  be derived each time.


## Tutor Actions

Priority dispatch (in order):

1. **GUIDED-DISCOVERY** — run the apples/oranges/metres/seconds sequence
   (Discovery Questions step 1) before introducing dimensional symbols. The
   learner must arrive at "you can only add same-type quantities" by reasoning,
   not by hearing it stated.

2. **WORKED-EXAMPLE** — three traces at increasing difficulty:
   (a) [½mv²] → [M·(LT⁻¹)²] = [ML²T⁻²] (energy)
   (b) [F = ma] → [M·LT⁻²] = [MLT⁻²] ✓ (verification of equation)
   (c) [P = F/A] → [MLT⁻²/L²] = [ML⁻¹T⁻²] → SI unit: Pa (derivation of unit)
   Show the ½ in (a) as dimensionless — it disappears in the check.

3. **ERROR-ANALYSIS** — present F = ½mv² and F = ma side by side, both dimensionally
   [MLT⁻²]. Ask: "which is correct?" The dimension check cannot tell you.
   This is the M1 inoculation — must happen during first teaching, not later.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three session openers:
   "What are the dimensions of kinetic energy?" → "What is the dimensional formula
   of pressure?" → "Can a dimensionally correct formula still be wrong — give an example?"

## Voice Teaching Notes

*How it sounds when taught well*: the word "type" is used before "dimension" is
introduced; the tutor says "same type on both sides?" out loud when checking every
example; limitations are stated the first time, not after mastery.

*Load-bearing sentence to slow down on*: "Dimensional consistency is a necessary
condition for a formula to be correct — but it is NOT sufficient. A formula can
pass the dimension check and still be wrong." Say this clearly, then demonstrate.

*What to listen for*: learner says "dimensions are the same as units" → M3 active;
learner says "I checked by dimensions so it's correct" → M1 active; learner writes
"[2L]" when adding two lengths → M2 active; learner says "cos(θ) has no unit so
it breaks the equation" → M4 active.

## Assessment Signals

**Diagnostic — golden probe**: "What are the dimensions of kinetic energy (½mv²)?
Show your working." This requires: knowing m is [M] and v is [LT⁻¹]; computing
v² = [L²T⁻²]; multiplying M·L²T⁻² = [ML²T⁻²]. The ½ is dimensionless. Learner
who writes [ML²T⁻²] with shown steps has the intermediate model operational.

**Distractor-mapped items**:
- "Is the equation v = u + at dimensionally consistent?" — [LT⁻¹] = [LT⁻¹] +
  [LT⁻²·T] = [LT⁻¹] + [LT⁻¹] → yes. Option "no" targets M2 (adds dimensions
  instead of checking same type).
- "A formula passes the dimension test. This means: (A) it is definitely correct,
  (B) it might be correct — the coefficient still needs checking, (C) it has the
  right units but might have wrong powers." — targets M1 (answer is B).

**Guided practice → independent practice fading ladder**:
1. Fill in dimensional formulae for 8 quantities (mass, velocity, acceleration,
   force, energy, pressure, frequency, electric current) — first 4 scaffolded.
2. Verify 5 equations for dimensional consistency (one incorrect, four correct).
3. Derive the SI unit of pressure from its dimensional formula [ML⁻¹T⁻²].
4. Identify the limitation: two equations are given, both dimensionally consistent;
   learner must state that only experiment or derivation can determine which is right.
5. (Challenging): use dimensions to reconstruct the form of the pendulum period
   given it depends on L and g.

**Mastery gate set** (per assessment/05):
- *Production*: write dimensional formulae for 6 quantities (including 2 novel
  ones not previously seen); verify 3 equations for consistency.
- *New surface*: derive the SI unit of electric resistance from its dimensional
  formula (Ω = ML²T⁻³A⁻²); interpret the result.
- *Mixed*: interleaved verification and formula items, some with deliberate
  dimensional errors.
- *Delayed*: one-week check — from-memory formula for kinetic energy, pressure, force.

**Transfer items**:
- *Near*: reconstructing forgotten formula structure using dimensions.
- *Far*: checking a formula from a textbook in a new topic for dimensional
  consistency before using it.
- *Real-world*: a speed limit sign says "100 km/h." Analyse its dimensions;
  express it in SI base units (m/s).
- *Cross-subject*: maths (ratio of same quantities is dimensionless — confirming
  that sin(θ) and ln(x) require dimensionless arguments).

**Calibration note**: learners significantly overestimate their mastery after
the first successful dimensional check. Standard problem: they check v = u + at
correctly and feel done. Probe with the limitation question (M1 risk) and with
a derivation from dimensions task (novel surface). Both should be in the mastery
gate before logging this concept as complete.

## Tutor Recovery Strategy

*Likeliest utterance*: "I don't know the formula for ___'s dimension" — this is
a working-memory gap, not a conceptual failure. The recovery is: "what IS ___?
What does it measure? What base quantities?" Walk backwards from the definition.

*Concept-specific smaller question*: if the learner cannot start, shrink to:
"What are the dimensions of SPEED?" (They usually know speed = distance/time →
[L/T] = [LT⁻¹].) "Now what are the dimensions of ACCELERATION?" (Change in speed
per time → [LT⁻²].) Build from what they know by definition.

*M1 recovery*: when a learner claims a formula is proven correct by dimensions,
immediately present a counterexample: "Here's a formula that's dimensionally
correct but physically wrong. Which experiment would distinguish it from the
right one?" Shift focus to what dimensions CANNOT tell you.

## Memory Hooks

- **Concept type**: concept + procedure. The principle (type-checking) is a
  concept; writing dimensional formulae is a procedure. Both need different review
  forms.
- **Review form** (per Delivery 2 §8): procedure component → spaced retrieval
  (dimensional formula of specific quantities); concept component → elaborative
  questioning ("why can you only add same-dimension quantities?").
- **Automaticity target**: deriving the dimensional formula of a new quantity from
  its definition should be fluent by the end of the measurement domain. Dimensional
  checking should be a habit invoked automatically when a new formula is encountered,
  not a separate step to be remembered.
- **Interleaving partners**: `phys.meas.units` (base units are the building blocks);
  `phys.mech.force` (first test case: [MLT⁻²]); `phys.therm.ideal-gas-law`
  (dimensional check of PV = nRT is a good reinforcement later).

## Transfer Connections

- *Near*: verifying equations in all domains — every physics formula can be checked.
- *Near*: deriving units of new quantities from their dimensional formula.
- *Far*: Buckingham's π theorem (expert level) — formal dimensionless parameter
  counting.
- *Cross-subject*: maths (confirming logarithm and trig function arguments are
  dimensionless); chemistry (molar concentrations and unit consistency in rate laws).
- *Real-world*: engineering unit conversions and equation verification; checking
  whether a physical formula a student found online could possibly be right before
  relying on it.
- *Expert transfer*: natural units (setting c=1, ℏ=1) are the extreme case of
  dimensional analysis — understanding them requires first deeply understanding
  what dimensions ARE.


## Cross-Subject Connections

- **Mathematics**: dimensional analysis is applied algebraic type-checking. The rule
  "you can only add quantities of the same type" mirrors the algebraic rule that
  you can only add like terms. Ratio of same-dimension quantities is dimensionless
  — exactly the condition required for logarithm and trig function arguments.
- **Chemistry**: rate laws (mol·L⁻¹·s⁻¹) and equilibrium constants require
  dimensional consistency. The ideal gas law PV = nRT can be verified dimensionally
  using [ML⁻¹T⁻²][L³] = [N][ML²T⁻²K⁻¹N⁻¹][K].
- **Engineering**: dimensional analysis is the foundation of the method of similitude
  — building scale models of bridges, aircraft, and ships that behave the same as
  the real thing when Reynolds numbers and other dimensionless groups are matched.
- **Computer Science**: dimensional types in physical simulation code — languages like
  F# and Haskell have unit-of-measure type systems that catch dimensional errors at
  compile time, exactly the programming analogue of this concept.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.meas.dimensions.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: multiple grade-band variants (MIDDLE / HIGH / ADULT) including core_explanation, worked_example, and misconception_repair kinds
- **Probe assets**: MCQ and misconception_probe variants, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database required

## Curriculum Feedback

The KG shows `unlocks: []` for this concept — this underrepresents its role as
a cross-cutting tool. A curriculum feedback note to the Pipeline: `phys.meas.dimensions`
functionally unlocks `phys.mech.kinematics-1d` (where dimensional checking is first
practically needed) and many derived-unit encounters throughout the curriculum.
Adding those edges would make the graph more accurately reflect the dependency.
The `difficulty: developing` and `mastery_threshold: 0.75` are appropriate —
the skill requires genuine understanding, not just memory.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-07-29): Initial full-standard entry. Migrated from pre-standard format to EDUCATIONAL_BRAIN_STANDARD.md v1.0 21-section structure. All sections verified against Quality Gates 1–8.
- **v1.1** (2026-07-29): Teaching quality upgrade. Core Understanding rewritten — replaced textbook sentence with visceral "faster check than experiment" framing, type vs. coefficient distinction, and the necessary-but-not-sufficient limitation stated as part of the core insight rather than deferred.

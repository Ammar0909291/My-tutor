# SI Units and Measurement — `phys.meas.units`

## Identity

- **Concept ID**: `phys.meas.units`
- **Curriculum location**: physics / measurement & units
- **Prerequisites**: none (this is the root entry-point concept for physics)
- **Unlocks** (from KG): `phys.meas.scalars-vectors`, `phys.meas.dimensions`,
  `phys.meas.errors`, `phys.meas.unit-conversion`, `phys.mech.displacement`,
  `phys.therm.temperature`, `phys.wave.wave-properties`, `phys.em.electric-charge` —
  every downstream physics concept is ultimately grounded here. A learner without
  correct SI anchors will carry unit errors silently through years of study.
- **Difficulty**: foundational · **Bloom**: remember · **Mastery threshold**: 0.70 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Ch. 2; Halliday &
  Resnick Ch. 1
- **Learning objectives** — the learner can:
  1. Name all seven SI base quantities and their units, including the unit symbol.
  2. Classify a given physical quantity as a base or derived quantity and state which
     base quantities it is built from.
  3. Write the correct unit symbol for a given measurement, respecting capitalisation
     conventions (N not n, Pa not pa, s not S).
  4. Explain WHY a universal measurement system is necessary and what it replaced.

## Mental models

- **Beginner (arriving)**: units are labels teachers put on numbers, interchangeable
  names, no deep structure. "5 km/h" and "5 m/s" mean the same kind of thing —
  both are "speed" — the number just changes when you switch labels. There is no
  sense that the quantity itself is being re-expressed in a different count-of-unit.
- **Intermediate**: units are specific, not interchangeable, and you have to be
  consistent in one system. The seven base units are a set to memorise. Derived
  units "come from" the base units somehow, but the derivation feels like a
  definition, not a logical consequence.
- **Advanced**: every physical quantity is a ratio — "how many of this reference
  object fits into the thing I'm measuring." The SI system chose seven independent
  dimensions; every other unit in physics is one algebraic combination of them.
  Converting is multiplying by 1 (in a clever form), never altering the physical
  quantity itself.
- **Expert**: the seven base dimensions reflect the structure of physical law (mass,
  length, time, current, temperature, amount, luminous intensity). This particular
  choice is a deliberate minimisation — fewer independent dimensions would either
  lose expressive power or force constants to carry units (which they still sometimes
  do, flagging where our theory has arbitrary choices). The 2019 SI redefinition
  (fixing h, e, k, N_A to exact values) shows that units are ultimately defined by
  physical constants, not artefacts.
- **Versioning notes**: the intermediate model — "units as labels to memorise" — is
  entirely correct for this concept's required Bloom level (remember/understand).
  The advanced model is earned over the whole first measurement domain; install the
  beginner→intermediate transition here. Explicitly say at the intermediate stage:
  "this model will evolve — there's a deeper idea we'll reach once you've practised
  with more quantities."

## Why beginners fail here

The root failure is treating units as decorative rather than constitutive: the number
is the real thing, the unit is an annotation. This is reinforced by years of school
maths where numbers appear bare. Learners therefore strip units during calculation,
reattach them at the end ("because the answer should be in metres"), and cannot detect
unit errors. A second failure mode is capitalisation blindness — "s" for seconds and
"S" for siemens are visually close; "K" (kelvin) and "k" (kilo) are the same letter
in different cases. This is not pedantry: it marks whether the learner has actually
internalised the symbol as a distinct identity or merely a letter.

## Misconception library

**M1 — Units are interchangeable labels on the same number**
- *Why*: experience with informal measurement ("about 5 big steps"); school maths
  uses bare numbers (type 2, perceptual intuition from bare-number practice).
- *Symptom / phrases*: drops units during multi-step calculation; writes "= 5 metres"
  by appending unit at the end rather than tracking it; says "the answer is 5 no
  matter what unit you use."
- *Detection probe (verbatim)*: "A car travels 72 kilometres per hour. How many
  metres does it travel in one second?" — watch whether they convert coherently or
  guess "72 metres."
- *Recovery*: show a unit error with dramatic consequence (the Mars Climate Orbiter —
  one team in lb·f·s, one in N·s, $327M lost). Then do a live conversion by
  multiplying-by-one: 72 km/h × (1000 m / 1 km) × (1 h / 3600 s). The unit chain
  cancels visibly. Assign: "carry units through every line of every problem this week."
- *Verification*: a multi-step problem requiring two unit conversions; watch for the
  units appearing at every step, not just the answer. Delayed: same structure,
  one month later.

**M2 — The kilogram is a unit of weight, not mass**
- *Why*: everyday use of "weight" and "mass" interchangeably (type 2, language
  transfer; also type 4, overgeneralisation of "weighs 5 kg").
- *Symptom / phrases*: "I weigh 60 kilograms"; uses kg and N interchangeably in
  force problems.
- *Detection probe*: "On the Moon, an astronaut who 'weighs' 60 kg on Earth —
  what is their mass on the Moon?" Correct: 60 kg. Common wrong: "10 kg" (divides
  by 6 again).
- *Recovery*: mass-as-resistance-to-change framing — "mass is how stubbornly the
  object resists being pushed; that doesn't change on the Moon, only the pull does."
  Introduce weight as a force (in newtons) only after the distinction is secure.
- *Verification*: comparison items — mass in kg, weight in N, explicitly labelled;
  Moon/space scenario items.

**M3 — Capitalisation and symbols are optional style choices**
- *Why*: informal handwriting culture; spell-checkers don't apply to physics symbols
  (type 5, instruction omission).
- *Symptom / phrases*: writes "n" for newton, "k" for kelvin, mixes "sec" and "s".
- *Detection probe (verbatim)*: "Write the unit of electric current with its symbol."
  Correct: ampere, A. Common wrong: "Ampere, a."
- *Recovery*: show ambiguous symbols in context — "k" means kilo (×10³); "K" means
  kelvin. One letter change, two very different meanings in the same equation.
  Create a reference card with correct capitalisation; require exact symbol matching
  in marking for two weeks.
- *Verification*: a symbol-identification table (case matters); a short equation
  where wrong capitalisation changes the meaning, asking learner to identify the error.

**M4 — The SI has more than seven base units (or fewer)**
- *Why*: instruction often lists the "important" units without being explicit that
  the total is seven (type 5, curriculum omission); or learners collapse pairs
  (confuse kelvin with Celsius as separate units).
- *Symptom*: lists five or six, or lists eight (including Celsius, or including
  the radian as a base unit).
- *Detection probe*: "List all seven SI base units. Stop at seven." — count them;
  note which is missing or spuriously added.
- *Recovery*: the mnemonic "My Kindly Teacher Approves My Little Claim" (mass /
  kelvin / time / ampere / mole / luminous intensity / candela — mnemonic with
  initials m, K, t, A, mol, cd, lm — adjust for local mnemonic tradition). Pin
  "seven" explicitly: this is a design decision of the system.
- *Verification*: from-memory list (all seven, no extras, correct names + symbols
  + quantities measured).

## Explanation library

- **Age 10–12 (story)**: "Before the metre, France had feet — but a Paris foot was
  different from a Lyon foot, and both were different from an English foot. Merchants
  kept getting cheated and bridges kept collapsing because builders didn't agree on
  what a 'foot' was. In 1799, France said: we'll define ONE metre for the whole
  world, based on the Earth itself, so no one owns it. That's SI: one system that
  belongs to everyone, so that a measurement made in Tokyo means the same thing in
  Nairobi. Seven base units, and everything else builds from those seven."
- **Age 14+ (structural)**: "Physics measures the universe. To measure, you need
  references — physical standards everyone agrees on. The SI chooses seven
  independent quantities (mass, length, time, electric current, temperature, amount
  of substance, luminous intensity) as its foundation. Every other quantity —
  velocity, force, energy — is built by multiplying and dividing those seven. The
  genius of the system: if you know the seven units, you can derive every other unit
  in physics by understanding what the quantity is."
- **Adult returning learner**: "You've used metres, kilograms, and seconds for
  years without thinking about it. The SI is the formal agreement behind those
  habits: seven chosen base quantities, each with a unit and a symbol with a
  specific capitalisation. The rest of the system — newtons, joules, watts — are
  just names for specific combinations of those seven. Nothing to memorise beyond
  the seven names, their symbols, and which quantity each measures."
- **Visual frame**: a periodic-table-style card for the seven base units:
  quantity / unit name / symbol / typical everyday scale example. Referred back to
  throughout the domain.

## Analogy library

- **Best analogy**: the seven base units are like the three primary colours — you
  can mix them to get every other colour (derived unit), but you cannot reduce them
  further. Just as "orange = red + yellow" is a derivation, not a definition,
  "newton = kg·m/s²" is a derivation: the newton is what a kilogram-metre-per-
  second-squared IS.
  *Breaking point*: the colour analogy suggests only three primaries; SI has seven.
  Don't extend the colour mixing metaphor past the "primaries → everything else" idea.
- **Alternative**: the alphabet analogy — 26 letters combine to form every English
  word; 7 base units combine to form every physics unit.
  *Breaking point*: letter combinations are arbitrary convention; unit combinations
  are forced by the definitions of the physical quantities. The analogy works for
  "small set → large vocabulary" but not for "why these seven specifically."
- **Anti-analogy to avoid**: "units are just different names for the same thing,
  like Celsius and Fahrenheit." This installs the M1 misconception actively — both
  scales measure temperature but they are NOT the same scale and DO NOT name the
  same numbers. Avoid entirely.

## Demonstration library

- **Home, no equipment**: find three measuring tools at home (ruler in cm, scale
  in kg, stopwatch on phone). Name the SI quantity for each, the unit, the symbol.
  Predict: if you flew to the USA, would the ruler's markings change? (Inches vs cm
  — the physical length is the same; the number changes.)
- **Teacher demo**: Mars Climate Orbiter slide or printout. $327M satellite lost
  because one team used pound-force-seconds, the other newton-seconds. The unit
  discrepancy was present in software for months, caught by nobody. Elicit: "what
  would have caught it?" → unit analysis.
- **Interactive**: use a unit converter (phone app or website) to convert one
  measurement six ways (e.g. 1 m to miles, feet, inches, cm, mm, nm). Observe:
  the quantity is the same; only the COUNT changes. This concretises M1 recovery.
- **Prediction before demo**: before showing the Mars Orbiter story, ask: "can
  units cause a crash?" Usual answer: "not really, you'd notice." Show the story
  AFTER this prediction is stated, so the contradiction is personal.

## Discovery lesson

**Direct instruction is warranted here**, with a clear argument: SI units are
a historical and social convention (the 1875 Metre Convention), not a logical
necessity. There is no "why this metre" to discover — the metre is defined to be
what it is. The discovery model works for concepts where the learner's reasoning
can arrive at the idea from evidence; conventions and definitions must be told,
then used, then internalised by practice.

**Structure** (direct instruction variant): need-creation (the Mars Orbiter story
or the medieval foot chaos) → here-is-the-solution (the seven base units as a
card) → guided practice (classify 12 quantities as base or derived; write symbols
correctly) → consolidation (from-memory list, timed).

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Tell → show → apply** (highest fit): this is definitional/conventional content.
   Tell: the seven base units and their symbols. Show: how derived units are built.
   Apply: classify quantities, write symbols in equations.
2. **Error exposure** (high fit): the Mars Orbiter demonstration drives home WHY
   the convention matters. Exposure to real-world unit failures is the best
   motivator for taking symbols seriously.
3. **Retrieval practice** (high fit): flash-card style — given quantity, produce
   unit name + symbol; given symbol, produce quantity + name. The Bloom level is
   "remember" — retrieval is exactly the right practice form.

Actions that DON'T fit:
- **Guided discovery**: see Discovery section — conventions cannot be discovered,
  only told and then practised.
- **Debate / argumentation**: no productive controversy exists here at this level.
  Reserve argumentation for concepts with genuine physical debates.

## Voice teaching

*How it sounds when taught well*: slow and deliberate when listing the seven base
units; the SYMBOL is always spoken directly after the name ("ampere — capital A");
the concept is embedded in the Mars Orbiter story before any list is produced, so
learners are curious rather than passive.

*Load-bearing sentence to slow down on*: "Every other unit in physics — newtons,
joules, watts, pascals — is just a name for a specific combination of these seven.
If you know the seven, you can derive every other unit." Read this once, pause, then
ask: "what does that mean for energy units? For pressure units?"

*What to listen for*: the learner says "kilogram of force" or "kg of weight" → M2
active; the learner drops the unit mid-sentence ("velocity is 5") → M1 active; the
learner writes "sec" or "amp" instead of "s" and "A" → M3 active.

*Capitalisation stakes*: "k" (kilo) vs "K" (kelvin) will create errors in
thermodynamics; "m" (milli OR metre) vs "M" (mega) — context-dependent ambiguity
that only explicit teaching removes.

## Assessment

**Diagnostic — golden probe**: "Name the SI unit of electric current, its symbol,
and the base quantity it measures." This probes all three layers: the name
(ampere), the capitalised symbol (A), the base quantity (electric current). A
learner who says "amp" for symbol, or "electricity" for quantity, has an M3 or
understanding gap that needs addressing before the domain continues.

**Distractor-mapped items** (for M1 / M2 / M3):
- "Which is the SI unit of force?" — options: kg, N, kg·m, m/s — distractor
  "kg" targets M2 (mass-as-weight conflation).
- "What does the symbol 'K' represent in SI?" — options: kilo, kelvin, kilometres,
  kinetic — distractor "kilo" targets M3.

**Guided practice → independent practice fading ladder**:
1. Complete the table: quantity / unit / symbol — seven rows given, one column blank.
2. Given five units (m, kg, s, A, K, mol, cd), label the quantity each measures.
3. From memory: list all seven base units with correct name, symbol, and quantity.
4. Classify twelve quantities (velocity, energy, density, temperature, charge,
   resistance...) as base or derived; for the derived ones, write the combination
   of base units.
5. (Delayed, 1 week): same from-memory test, unannounced.

**Mastery gate set** (per assessment/05):
- *Production*: list all seven base units with name + symbol + quantity, no errors,
  no help — correct capitalisation required.
- *New surface*: given a novel derived unit (e.g. the tesla, T = kg/(A·s²)), identify
  which base units compose it and what it might measure.
- *Mixed*: interleaved items — SI base units mixed with non-SI and derived units;
  learner must sort.
- *Delayed*: one-week retention check on from-memory list (tests consolidation, not
  just working-memory recitation).

**Transfer items**:
- *Near*: fill a unit-conversion table using SI prefixes (micro to mega).
- *Far*: given a physics formula (e.g. E = mc²), use unit analysis to determine
  the unit of energy (joule = kg·m²/s²).
- *Real-world*: read a nutrition label: 2000 kJ of energy. What is that in SI base
  units? What does that tell you about the kilogram-metre-second relationship?

**Calibration note**: learners very often feel confident after one pass through the
seven units (low stakes, memorise-and-recall). Build calibration items that test
transfer — if a learner scores 100% on rote recall and 40% on new-surface items,
their confidence is miscalibrated and the metacognitive gap needs naming.

## Recovery notes

*Likeliest utterance here*: "I don't understand what you're asking" (concept is
unfamiliar, no anchor) or "I thought I knew this" after getting a symbol wrong
(false-floor confidence, M3 or M4 route).

*Concept-specific smaller question to shrink to*: if the learner cannot name any
base unit, shrink to: "What is the unit we use every day for length? Just the
name." (metre) — then, "and the short symbol?" (m). Build from the one they know.
Do NOT start by asking for all seven.

*M1 recovery trigger*: when a learner drops units, write the equation with units
explicitly carried at every line and ask them to say what cancels. Do not announce
the error; ask "check your units at this step — what do you get?" Reference
Delivery 1 Recovery Engine for the universal recovery ladder.

## Memory & review

- **Concept type**: fact-set + convention. The seven units are a discrete
  enumerable set with exact symbols — this is the retrieval-practice-dominant type.
- **Review form** (per Delivery 2 §8): flash-card retrieval (quantity → symbol;
  symbol → quantity + name). Frequent early exposure (3×/week for week 1), then
  spaced intervals. No elaborative interrogation needed — the content is
  definitional.
- **Automaticity target**: after two weeks of retrieval practice, the learner
  should name and write all seven symbols without hesitation. Unit-symbol
  recognition should reach automaticity before the domain ends (slow symbol lookup
  is cognitive load in every downstream calculation).
- **Interleaving partners**: `phys.meas.unit-conversion` (same domain, share
  symbols); `phys.meas.dimensions` (builds directly on base-unit structure);
  `phys.mech.force` (first major derived unit encounter). Interleave symbol
  retrieval with conversion practice to build discrimination.

## Transfer map

- *Near*: SI prefixes and unit conversion (`phys.meas.unit-conversion`) — same
  symbols, scaling layer.
- *Near*: dimensional analysis (`phys.meas.dimensions`) — uses base-unit structure
  to check equations.
- *Far*: every derived unit in the physics curriculum — newton, joule, pascal,
  watt, coulomb, volt, ohm — unpacks as base-unit combinations. Transfer to a new
  derived unit means asking "what base units compose this?"
- *Cross-subject*: chemistry SI units (mole, mol); biology energy units (kJ/mol);
  computing data units (byte, bit — NOT SI, the contrast is instructive).
- *Real-world*: weather reports (temperature in K vs °C); nutrition labels (kJ);
  engineering specs (Pa, MPa); medical dosing (mg/kg); speedometer (km/h → m/s).
- *Expert transfer*: natural units (c=1, ℏ=1) in particle physics — understanding
  why SI units are a CHOICE reveals that any self-consistent set works; SI is
  chosen for human-scale convenience.

## Curriculum feedback

None from this authoring. The KG node's Bloom level (remember) is appropriate —
this is a definitional concept best consolidated by retrieval practice. The
`estimated_hours: 2` matches a single well-structured lesson plus one retrieval
session. The breadth of unlocks (8 downstream concepts) correctly reflects SI
units as the root of the entire physics measurement domain.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

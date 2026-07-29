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


## Learning Objective

After this concept, the learner can:

1. Name all seven SI base quantities and their units, including the unit symbol.
2. Classify a given physical quantity as a base or derived quantity and state which
   base quantities it is built from.
3. Write the correct unit symbol for a given measurement, respecting capitalisation
   conventions (N not n, Pa not pa, s not S).
4. Explain WHY a universal measurement system is necessary and what it replaced.


## Core Understanding

A unit is a chosen reference object. When you say "5 metres", you mean "this distance is 5 times longer than the object we agreed to call 1 metre." That's it. Every measurement in physics is a count of how many reference objects fit into what you're measuring. Change the reference object, and the COUNT must change — but the physical reality doesn't.

The SI system answers one question: *what reference objects should the whole world use?* It chose seven — one for each independent dimension of physical reality (length, mass, time, electric current, temperature, amount of substance, luminous intensity). Every other unit in physics — newtons, joules, volts, pascals — is one algebraic combination of these seven. You can always unpack any unit back to its seven ingredients. This unpacking is called dimensional analysis, and it is one of physics's most powerful self-checks.

The stakes are real: in 1999, NASA's Mars Climate Orbiter crashed because one team measured thrust in pound-force-seconds and another team expected newton-seconds. Same numbers. Different reference objects. $327 million gone. Unit literacy is not a bureaucratic formality.

## Mental Models

- **Beginner (arriving)**: units are labels teachers put on numbers — interchangeable
  names that only affect the number superficially. "5 km/h" and "5 m/s" both mean
  "speed" — the student doesn't sense that the number MUST change when the unit
  changes, or that the two numbers represent the same physical reality. Units feel
  like optional annotation, not constitutive of the measurement.
- **Intermediate (target for this concept)**: a unit is a chosen reference object.
  "60 km/h" means "this speed is 60 times the speed of something that travels one
  kilometre in one hour." Change the reference object (to m/s), and the count must
  change (to 16.7) — but the physical speed is identical. The seven SI base units
  are seven agreed reference objects, one for each independent dimension of reality.
  Derived units are combinations: newton = kg·m/s² (mass × length / time²). This
  isn't memorisation — it's algebra.
- **Advanced**: every physical quantity is a ratio of "how many of this reference
  object fits into what I'm measuring." Conversion is multiplying by 1 in a clever
  form — (1000 m / 1 km) equals exactly 1, so multiplying by it changes the count
  without altering the physical quantity. Dimensional analysis (tracking units as
  algebra) becomes a self-checking tool: if the units don't work out, the physics
  doesn't either.
- **Expert**: the seven base dimensions reflect the structure of physical law. The
  choice is a deliberate minimisation — fewer would lose expressive power; more
  would introduce redundancy. The 2019 SI redefinition (fixing h, e, k, Nₐ to exact
  values) shows that units are ultimately defined by physical constants, not
  artefacts — the kilogram now is what it is because Planck's constant is exactly
  what it is.
- **Versioning note**: install the beginner→intermediate transition here. Explicitly
  flag at the intermediate stage: "this model will deepen — once you've practised
  with more quantities, you'll see why 'multiplying by 1' is the most powerful
  idea in measurement."

## Why Students Fail

The root failure is treating units as decorative rather than constitutive: the number
is the real thing, the unit is an annotation. This is reinforced by years of school
maths where numbers appear bare. Learners therefore strip units during calculation,
reattach them at the end ("because the answer should be in metres"), and cannot detect
unit errors. A second failure mode is capitalisation blindness — "s" for seconds and
"S" for siemens are visually close; "K" (kelvin) and "k" (kilo) are the same letter
in different cases. This is not pedantry: it marks whether the learner has actually
internalised the symbol as a distinct identity or merely a letter.

## Misconceptions

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
- *Recovery*: group by physical domain — this is more memorable than a mnemonic.
  Three mechanical base units (the MKS trio, familiar from everyday science):
  metre (m) for length, kilogram (kg) for mass, second (s) for time.
  Plus four specialist additions: ampere (A) for electric current, kelvin (K) for
  temperature, mole (mol) for amount of substance, candela (cd) for luminous
  intensity. Remember it as "3 mechanical + 4 specialist = 7 total." If a phrase
  helps: "**M**any **K**ind **S**cientists **A**re **K**een on **M**easuring
  **C**arefully" — metre, kilogram, second, ampere, kelvin, mole, candela. Note
  that K appears twice (kilogram and kelvin) and M appears twice (metre and mole) —
  this is deliberate: those pairs are the ones students most often confuse.
- *Pin "seven" explicitly*: this is a deliberate design decision, not a natural
  constant. There are exactly seven because physicists chose the minimum set of
  independent dimensions needed to describe all physical law. Memorise the number,
  not just the list.
- *Verification*: from-memory list (all seven, no extras, correct names + symbols
  + quantities measured).

## Analogies

- **Best analogy (currency — use this first)**: £5 and approximately $6.30 are the
  same amount of purchasing power — different numbers, different units, same
  underlying reality. Nobody thinks £5 "becomes" $6.30 when you cross the Channel;
  the money is the same, only the counting unit changed. Unit conversion works
  identically: 20 m/s and 72 km/h are the same speed. The physical reality is
  identical; the counting unit changed. Converting is not calculating a new answer —
  it is RE-EXPRESSING the same answer.
  *Breaking point*: exchange rates fluctuate; unit conversion factors are exact,
  fixed constants. Use the analogy for grasping "same reality, different count" but
  not for implying conversion is approximate.
- **Secondary analogy (primary colours)**: the seven base units are like three
  primary colours — you mix them to get every other colour (derived unit), but you
  cannot reduce them further. "Orange = red + yellow" is a derivation; "newton =
  kg·m/s²" is a derivation: the newton is what a kilogram-metre-per-second-squared
  IS.
  *Breaking point*: colours have three primaries; SI has seven. Don't extend past
  "small set → everything else."
- **Tertiary (alphabet)**: 26 letters combine to form every English word; 7 base
  units combine to form every physics unit.
  *Breaking point*: letter combinations are arbitrary; unit combinations are forced
  by the physical definitions. Works for "small set → large vocabulary" only.
- **Anti-analogy to avoid**: "units are just different names for the same thing, like
  Celsius and Fahrenheit." This actively installs M1 — Celsius and Fahrenheit are NOT
  the same scale, do NOT name the same numbers, and are NOT related by simple
  multiplication (unlike SI unit conversions). Avoid entirely.

## Demonstrations

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

## Discovery Questions

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

## Teaching Sequence

From the dispatch library (Delivery 2 §6):

**Step 0 — Create the need (before listing a single unit)**
Ask: "NASA spent $327 million on a Mars probe. It crashed on arrival. Why?"
Let the learner guess freely. After they answer, reveal: "Both software teams were
calculating correctly — but one team measured thrust in pound-force-seconds and the
other expected newton-seconds. Same numbers. Different units. Spacecraft destroyed."
Then ask: "What would have caught this?" Wait. The answer is unit analysis. Now the
learner has just discovered WHY a universal unit system exists — before you have said
the word "SI." The content that follows is the SOLUTION to a problem they now own.

**Step 1 — Tell → show → apply** (definitional/conventional content):
Tell: the seven base units, grouped as "3 mechanical (MKS) + 4 specialist." Show:
how derived units unpack — newton = kg·m/s² (what does each piece mean?); joule =
kg·m²/s². Apply: classify 10 physical quantities as base or derived; write all
symbols with correct capitalisation.

**Step 2 — Error exposure / worked conversion**:
Show the 72 km/h → m/s conversion with every unit tracked at every line:
72 km/h × (1000 m / 1 km) × (1 h / 3600 s) = 20 m/s.
Ask: "What did I multiply by?" Answer: 1 (twice — each conversion factor equals
exactly 1). The physical quantity didn't change; the counting unit did. This is the
deepest insight of measurement: converting is always multiplying by 1.

**Step 3 — Retrieval practice**:
From session 2 onward: quantity → unit name + symbol; symbol → quantity + name.
Rotate through all seven across weeks 1–2. Stop when the learner produces all seven
without hesitation. This is the Bloom "remember" target — retrieval is the
correct practice form.

Actions that DON'T fit:
- **Guided discovery**: conventions cannot be discovered — the metre is defined, not
  derived from first principles. See Discovery Questions section.
- **Debate**: no productive controversy exists at this level.


## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — open with a single unit-conversion chain, written step-by-step
   with units tracked through every line. Canonical example: 72 km/h → m/s:
   `72 km/h × (1000 m / 1 km) × (1 h / 3600 s) = 20 m/s`. The learner watches
   units cancel like algebra, not arithmetic. Prerequisite for M1 to shift.

2. **ERROR-ANALYSIS** — show the Mars Climate Orbiter failure as a real worked error.
   Ask "what went wrong?" before explaining. Learners must identify the unit mismatch
   themselves. This is the motivational anchor for why symbols matter.

3. **RETRIEVAL-SCHEDULE-PROMPT** — at every session opening: one unit from memory
   (name + symbol + quantity measured). Rotate through all seven across the first two
   weeks. Stop when the learner names all seven without hesitation.

4. **MATCHING** — table completion (base quantity ↔ unit name ↔ symbol). Bidirectional:
   given "ampere", produce "electric current" + "A"; given "A", produce "ampere" +
   "electric current". One-way fluency is not mastery.

Actions that do NOT fit this concept: GUIDED-DISCOVERY (conventions cannot be
discovered, see Discovery Questions section), DEBATE (no genuine controversy at
foundational level).

## Voice Teaching Notes

*How it sounds when taught well*: the Mars Orbiter story comes FIRST — before the
word "SI" is spoken. The teacher is curious, not declarative. The list of seven units
arrives as the punchline to a problem the student now cares about. Symbols are always
spoken aloud immediately after the name ("ampere — capital A, not lowercase a").
Pace slows to a stop on the unit-conversion insight.

*Scripted opening move (verbatim)*: "Before I tell you what SI units are — a
question. NASA spent $327 million on a Mars probe. It was supposed to orbit Mars.
Instead it crashed. Why? I'll give you thirty seconds." [Wait.] "Here's what
actually happened..." [Mars Orbiter story.] "So. What would have caught this?" [Wait
for "units".] "Exactly. Let me show you the system that exists precisely so this
never happens again."

*Load-bearing sentence to slow down on*: "Every other unit in physics — newtons,
joules, watts, pascals — is just a name for a specific combination of these seven.
If you know the seven, you can derive every other unit." Pause. Then: "What does
that mean for energy? For pressure? Let's check." Then unpack joule = kg·m²/s²
together.

*The multiplying-by-one moment*: after writing the 72 km/h conversion, ask: "What
did I actually multiply the original number by?" Most learners say "1000, then
divided by 3600." Rewrite it: "(1000 m / 1 km) is exactly equal to 1. So is
(1 h / 3600 s). I multiplied by 1, twice. The SPEED didn't change. Only the
measuring stick changed." Let this land before moving on.

*What to listen for*: "kilogram of force" or "kg of weight" → M2 active; dropping
the unit mid-sentence ("velocity is 5") → M1 active; writing "sec", "amp", or
"n" instead of "s", "A", "N" → M3 active; listing six or eight units → M4 active.

*Capitalisation stakes*: "k" (kilo, ×10³) vs "K" (kelvin) — one letter apart, two
completely different meanings. "m" (milli OR metre) vs "M" (mega) — context-
dependent ambiguity. These must be explicitly taught, not assumed.

## Assessment Signals

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

## Tutor Recovery Strategy

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

## Memory Hooks

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

## Transfer Connections

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


## Cross-Subject Connections

- **Mathematics**: dimensional analysis is algebraic unit-tracking — same rules as
  fraction cancellation. Scientific notation and significant figures use the same
  precision language. Vector components use trigonometry; unit vectors are
  dimensionless.
- **Chemistry**: all laboratory measurements use SI units. Moles (mol) are an SI base
  unit shared with physics. Concentration (mol/L = mol·m⁻³) is a derived SI unit.
  Temperature in kelvin is non-negotiable in thermodynamic equations.
- **Biology**: cell dimensions use micrometres (μm); metabolic rates use kJ/mol;
  both require the same SI prefix fluency. Dimensional analysis applies to enzyme
  kinetics and pharmacokinetics (mg/kg dosing).
- **Computing**: bytes and bits are NOT SI units — an instructive contrast. Data
  rates (MB/s, Gbps) mix SI prefixes with non-SI base units. "kilo" in computing
  historically meant 1024, now standardised as 1000 for SI compatibility (IEC 80000).
- **Real world**: nutrition labels (kJ), weather (°C ↔ K), medical dosing (mg/kg),
  engineering specs (MPa), speedometers (km/h ↔ m/s) — all tested by unit literacy.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.meas.units.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: multiple grade-band variants (MIDDLE / HIGH / ADULT) including core_explanation, worked_example, and misconception_repair kinds
- **Probe assets**: MCQ and misconception_probe variants, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database required

## Curriculum Feedback

None from this authoring. The KG node's Bloom level (remember) is appropriate —
this is a definitional concept best consolidated by retrieval practice. The
`estimated_hours: 2` matches a single well-structured lesson plus one retrieval
session. The breadth of unlocks (8 downstream concepts) correctly reflects SI
units as the root of the entire physics measurement domain.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-07-29): Initial full-standard entry. Migrated from pre-standard format to EDUCATIONAL_BRAIN_STANDARD.md v1.0 21-section structure. All sections verified against Quality Gates 1–8.
- **v1.1** (2026-07-29): Teaching quality upgrade. Core Understanding rewritten from Wikipedia-bland to visceral insight (unit = chosen reference object; Mars Orbiter stakes). Mental Models beginner/intermediate levels clarified with "counting reference objects" framing. Analogies: currency added as best first analogy; primary-colours demoted to secondary. M4 recovery: broken mnemonic ("My Kindly Teacher…", wrong initials, wrong terminal unit) replaced with 3-mechanical+4-specialist grouping + correct "MKS/AKMC" phrase. Teaching Sequence: Step 0 (need-creation via Mars Orbiter question-first) inserted before content. Voice Teaching Notes: scripted opening move added; multiplying-by-one moment scripted explicitly.

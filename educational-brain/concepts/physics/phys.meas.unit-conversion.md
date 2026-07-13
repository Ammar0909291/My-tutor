# Unit Conversion and Prefixes — `phys.meas.unit-conversion`

## Identity

- **Concept ID**: `phys.meas.unit-conversion`
- **Curriculum location**: physics / measurement & units
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.units` — the load-bearing part is the identity and symbol of the
    SI base units and the concept that a unit is a reference quantity. Without
    knowing what a metre IS and what a kilogram IS, "convert metres to centimetres"
    is a rule to memorise rather than a logical operation.
- **Unlocks** (from KG): none listed — but unit conversion is a cross-cutting
  computational skill used in every subsequent domain. Any problem involving
  quantities in non-SI or mixed units requires conversion before the physics can
  be done. This concept is the last piece of the measurement toolkit that a learner
  must have before moving into mechanics.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery threshold**: 0.70 ·
  **Est. hours**: 1 · **References**: NCERT Physics Class 11 Ch. 2
- **Learning objectives** — the learner can:
  1. Convert a measurement between SI and common non-SI units using the
     "multiply by 1" (fraction method) approach, showing all unit cancellations.
  2. Apply the SI prefix table (pico through tera) to express a quantity with
     a convenient prefix.
  3. Convert a compound unit (e.g. km/h to m/s) by applying the conversion
     to each component unit separately.
  4. Verify a conversion is correct by checking the direction of the conversion
     (smaller unit → larger number; larger unit → smaller number).

## Mental models

- **Beginner (arriving)**: unit conversion is a set of rules — "to go from km
  to m, multiply by 1000." The rule is a fact to recall, not a derivation.
  Conversion factors are arbitrary numbers associated with unit pairs. The learner
  cannot handle a unit pair they haven't seen before because there is no generating
  rule, only a list.
- **Intermediate**: conversion is multiplying by 1 in a clever form. "1 km = 1000 m"
  means the fraction 1000 m / 1 km = 1 (exactly). Multiplying any quantity by this
  fraction keeps the value the same but changes the expressed unit. The old unit
  cancels (like a fraction) and the new unit appears. This works for any unit pair
  for which a conversion factor is known or derivable.
- **Advanced**: the "multiply by 1" technique chains: km/h → m/s requires two
  factors (km→m: ×1000; h→s: ÷3600). Compound unit conversion is just applying
  the method to each component separately. SI prefixes are systematic: kilo = 10³,
  mega = 10⁶ — so km = 10³ m, nm = 10⁻⁹ m. Any SI prefix conversion follows
  the same format.
- **Expert**: dimensional analysis (the concept from `phys.meas.dimensions`) is
  the formal generalisation of unit conversion. Every conversion factor is a
  physical law or definition expressed as a ratio (1 inch = 2.54 cm is a
  definition; 1 eV = 1.602 × 10⁻¹⁹ J is a physical equivalence). At the expert
  level, changing unit systems (SI to Gaussian to natural units) requires
  understanding what each unit system chooses as its base references.
- **Versioning note**: install the intermediate model here (multiplying by 1).
  The advanced model (chaining, prefixes) is the goal of this lesson. Signal
  the dimensional-analysis connection: "the unit cancellation you're doing here
  is dimensional analysis applied to a single step."

## Why beginners fail here

The dominant failure is direction errors — dividing when they should multiply
and vice versa. This happens because learners memorise "km to m: multiply by
1000" without the generating principle; when asked "m to km," they are uncertain
whether to multiply or divide by 1000. The fix is the "multiply by 1" method:
the direction is always determined by writing the fraction so that the old unit
cancels. The second failure is compound units — treating km/h as a single
symbolic unit rather than as a ratio of km and h, so the learner doesn't know
how to convert it (they can convert km alone and h alone but not their ratio).

## Misconception library

**M1 — Conversion direction must be memorised for each pair (no generating rule)**
- *Why*: conversion tables are taught before the "multiply by 1" method; the
  table becomes the rule (type 5, instructional ordering).
- *Symptom / phrases*: "do I multiply or divide here? I always get confused";
  gives one direction confidently, fails the inverse.
- *Detection probe (verbatim)*: "Convert 5.0 m to centimetres. Now convert
  500 cm back to metres." Learner who correctly does m→cm (×100) but then
  multiplies again for cm→m (×100 instead of ÷100) is using a memorised rule
  without a generating principle.
- *Recovery*: write the conversion as a fraction. 5.0 m × (100 cm / 1 m) =
  500 cm. The metre cancels because it appears in both numerator and denominator.
  For the reverse: 500 cm × (1 m / 100 cm) = 5.0 m. The fraction flips; the
  direction is automatic from which unit you need to cancel.
- *Verification*: six conversion problems, half in each direction, including
  two the learner has never seen (ensuring the generating rule is being used,
  not a memorised table).

**M2 — A smaller unit means a smaller number (the direction confusion)**
- *Why*: "smaller unit → you need more of them → bigger number" is the correct
  logic, but it is counterintuitive because everyday language says "centimetres
  are smaller than metres" and the learner expects the NUMBER to follow the unit
  in size (type 2, intuitive but inverted logic).
- *Symptom*: converts 5 km to metres and gets 0.005 m ("kilometres are bigger
  so the number should be smaller").
- *Detection probe*: "1 kilometre = how many metres? Is the NUMBER bigger or
  smaller?" — then "so when you convert 5 km to metres, do you get a bigger or
  smaller number?" Follow with the calculation.
- *Recovery*: the concrete check — "a road is 5 km long. If you laid metre sticks
  end to end along it, would you need more or fewer than 5?" (More — 5000.) "So
  when you express the same road in metres, the NUMBER is bigger." The bigger
  number always goes with the smaller unit.
- *Verification*: conversion prediction items before calculation — "is the
  number bigger or smaller?" must be answered before computing.

**M3 — Compound unit conversion: convert the number but not the unit's structure**
- *Why*: learners see km/h as a label, not a ratio — they convert the number
  but don't address the hour→second part (type 5, instructional omission).
- *Symptom*: converts 72 km/h to m/s by dividing by 1000 (to convert km to m)
  but doesn't divide by 3600 (to convert h to s); reports 0.072 m/s instead of 20 m/s.
- *Detection probe*: "Convert 72 km/h to m/s. Show every step." Watch for whether
  the hour unit is handled.
- *Recovery*: write the unit explicitly as a fraction: 72 km/h = 72 km per 1 h.
  Now apply two conversion factors:
  72 km/h × (1000 m / 1 km) × (1 h / 3600 s) = 72 × 1000/3600 m/s = 20 m/s.
  Both units in the compound unit must be converted; it is two "multiply by 1"
  steps chained.
- *Verification*: four compound-unit conversions (km/h → m/s, g/cm³ → kg/m³,
  kPa → Pa, kW·h → J).

**M4 — SI prefix meaning must be memorised case by case**
- *Why*: prefixes are taught as a table to memorise; learners don't use the
  pattern (each prefix is 10^n, regular spacing) (type 5, rote instruction).
- *Symptom*: knows kilo and milli from everyday use; cannot recall micro or nano;
  cannot interpolate unfamiliar prefixes.
- *Detection probe*: "What is 5 gigahertz in hertz? What is 3 nanometres in metres?"
  Learner who cannot recall giga (10⁹) or nano (10⁻⁹) has M4.
- *Recovery*: anchor the prefix ladder to concrete scale: nano (atoms), micro
  (bacteria), milli (raindrop), — (human), kilo (city block), mega (country),
  giga (Earth radius). The power-of-10 spacing is regular: each step up is ×1000.
  Teach the seven most useful prefixes with a mnemonic and a concrete scale anchor,
  not just a table.
- *Verification*: given quantities in non-SI orders of magnitude (atomic radius
  in metres → nanometres; visible light wavelength → nanometres; CPU frequency →
  GHz), convert using prefix table.

## Explanation library

- **Age 12–14 (story)**: "You want to bake a cake. The recipe says 0.5 kg of
  flour but your scale only reads grams. How many grams? You know 1 kg = 1000 g,
  so 0.5 kg = 500 g. You just multiplied by 1 — specifically, by 1000 g / 1 kg,
  which equals 1 exactly (because the numerator and denominator are the same
  thing expressed differently). Unit conversion is always just this: find the
  conversion factor, write it as a fraction with the old unit on the bottom, and
  multiply."
- **Age 15+**: "A conversion factor is a ratio whose numerator and denominator
  are equal quantities expressed in different units. '1 m = 100 cm' gives two
  conversion factors: 100 cm / 1 m = 1 (use this when you want cm in the answer)
  and 1 m / 100 cm = 1 (use this when you want m). Multiplying by 1 doesn't
  change the value — only the unit. The old unit cancels algebraically, and the
  new unit remains. Chain this for compound units: each unit component is
  converted separately with its own factor."
- **Adult returning learner**: "The method is called 'unit factor' or 'multiply
  by 1.' Write the old value. Write the conversion factor as a fraction, with the
  old unit in the denominator so it cancels. Multiply. The algebra of unit
  cancellation is the same as cancelling a variable in a fraction — (m × cm/m)
  = cm. The only skill is choosing which way to orient the fraction."

## Analogy library

- **Best analogy**: currency exchange. £20 × (1.25 USD / £1) = $25. The pound
  "cancels" and dollars appear. You always put the old currency in the denominator
  of the exchange rate so it cancels — the direction of the fraction determines
  the direction of conversion.
  *Breaking point*: exchange rates vary; unit conversion factors are exact and
  fixed. Don't extend the analogy to "conversion rates fluctuate."
- **Alternative**: recipe scaling. "The recipe serves 4, I want to serve 12. Scale
  factor: 12/4 = 3." Unit conversion is similar: the "scale factor" is the
  conversion factor, applied to match the unit you want.
  *Breaking point*: recipe scaling is just multiplication; unit conversion also
  involves unit cancellation, which the recipe analogy doesn't illustrate.
- **Anti-analogy to avoid**: "larger unit = larger number." This directly installs
  M2. Always use "larger unit → you need fewer of them → smaller number" framing.

## Demonstration library

- **Home, no equipment**: fill a water glass. Estimate its volume in mL (say, ~250 mL).
  Convert to L: 250 mL × (1 L / 1000 mL) = 0.25 L. Convert to cm³: 250 mL × (1 cm³/1 mL)
  = 250 cm³. Same amount of water, three different numbers — same physical quantity.
  This concretises "same quantity, different expression."
- **Teacher demo**: a speedometer showing km/h. Convert to m/s live: 100 km/h =
  100 × 1000/3600 m/s = 27.8 m/s. Ask: "is 27.8 m/s fast? About 100 km/h on a
  motorway — recognisably car speed." Connects the converted unit to intuition.
- **Interactive**: an online unit-conversion checker (WolframAlpha or similar) —
  learner predicts the result BEFORE submitting. Correct predictions reinforce
  the method; wrong predictions reveal misconceptions.
- **Prediction before conversion**: "5 km expressed in millimetres — is it a bigger
  or smaller number?" Collect predictions; reveal 5,000,000 mm. The large number
  surprises learners who have M2.

## Discovery lesson

**Direct instruction** is correct here — conversion factors are definitions (1 km
= 1000 m is a stipulated definition, not a fact to discover). The "multiply by 1"
method IS discoverable from the principle, however:

**Structure**:
1. *Need*: present a problem requiring conversion (recipe in grams, scale in kg).
   Ask: "how do you get from kg to g without changing the amount of flour?"
2. *Discovery*: "what multiplied by 1 g / 1000 would give 1 kg?" → 1000 g.
   So 1000 g / 1 kg = 1 exactly. "Can we multiply by 1 without changing the
   quantity?" (Yes.) "What happens to the kg?" (Cancels.) → discover the method.
3. *Direct instruction*: the prefix table — taught directly as a system (not list).
4. *Practice*: compound unit conversion taught by extending the single-step method.

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Direct instruction** (primary for prefix table and systematic method).
2. **Worked examples** (high fit): three to four conversion traces, one for each
   type (single unit, prefix, compound unit, inverse direction).
3. **Error exposure** (high fit for M2/M3): demonstrate the wrong direction (M2)
   and the missing denominator unit (M3) as counterexamples before independent practice.

## Voice teaching

*How it sounds when taught well*: tutor always writes the fraction explicitly
("1000 m / 1 km") rather than saying "multiply by 1000"; the word "cancels"
is spoken as the old unit disappears; direction check ("smaller unit → bigger number")
is asked out loud before computing.

*Load-bearing sentence to slow down on*: "Write the conversion factor as a
fraction with the unit you want to REMOVE in the denominator — that unit cancels,
and the new unit appears." Say at normal speed; repeat with an example.

*What to listen for*: "should I multiply or divide?" without trying to write the
fraction → M1; "converting to a smaller unit should give a smaller number" → M2;
learner converts km but not h in km/h → M3.

## Assessment

**Diagnostic — golden probe**: "Convert 72 km/h to m/s. Show all conversion
factors as fractions." This catches M1 (wrong direction), M2 (wrong prediction),
and M3 (forgetting the hour). Correct answer: 72 × (1000/3600) = 20 m/s, with
both fractions visible.

**Distractor-mapped items**:
- "5 km = ___ m?" Options: 0.005, 5000, 500, 0.05. Answer: 5000. Distractor 0.005
  targets M2.
- "Convert 90 km/h to m/s." Options: 90 000 m/s, 25 m/s, 0.025 m/s, 90 m/s.
  Answer: 25 m/s. Distractor 90 m/s targets M3 (only km was converted, not h).

**Guided practice → independent practice fading ladder**:
1. Single-unit conversions (m to cm, kg to g, s to ms) — fraction method required,
   4 problems scaffolded.
2. Inverse conversions (cm to m, g to kg) — 4 problems.
3. Prefix conversions (MHz, nm, kPa) — 4 problems.
4. Compound unit conversions (km/h to m/s, g/cm³ to kg/m³) — 3 problems.
5. (Unscaffolded) give a quantity in a novel unit combination; convert to SI.

**Mastery gate set** (per assessment/05):
- *Production*: 6 conversions (2 single, 2 prefix, 2 compound) — fraction method
  required for credit.
- *New surface*: convert a unit pair not seen in instruction, given only the
  conversion factor.
- *Mixed*: 8 problems interleaved, some requiring direction prediction first.
- *Delayed*: one-week check — two compound unit conversions.

**Calibration note**: this concept feels easy (short, foundational). Learners
often reach the gate quickly and feel fully confident. The mastery check that
reveals miscalibration: a novel compound unit (e.g. J/s to kW — requires
understanding J = kg·m²/s² and chaining factors). If the learner cannot do this
unscaffolded, the "multiply by 1" method is not yet generating.

## Recovery notes

*Likeliest utterance*: "I always get confused about which way to go" (M1);
"I just multiply by 1000 everywhere" (procedure without direction discrimination).

*Concept-specific smaller question*: "Is a centimetre bigger or smaller than a
metre?" (Smaller.) "If I express a length in centimetres instead of metres, will
the number be bigger or smaller?" (Bigger — need more centimetres.) "So which
way does the number go?" → generate direction from size reasoning.

*M3 recovery*: "Write km/h as a fraction: km on top, h on bottom. Now tell me:
what fraction do you need to convert km? What fraction to convert h?" Lead the
learner to write both fractions explicitly before any arithmetic.

## Memory & review

- **Concept type**: procedure (the fraction method) + fact-set (prefix table).
- **Review form** (per Delivery 2 §8): procedure → distributed practice (one
  conversion embedded in every problem set across the curriculum); prefix table →
  spaced retrieval (seven most common prefixes, tested monthly).
- **Automaticity target**: converting km/h to m/s and common SI prefix conversions
  should be instant (not effortful) before the kinematics domain begins. Students
  who pause to think about km/h → m/s in the middle of a projectile problem are
  carrying excess cognitive load.
- **Interleaving partners**: every subsequent domain (kinematics, energy, EM) —
  non-SI values appear throughout; conversion is woven into every problem set.

## Transfer map

- *Near*: every numerical problem in the curriculum — conversions appear constantly.
- *Near*: `phys.meas.dimensions` — unit cancellation is dimensional analysis in
  miniature.
- *Far*: chemistry (molar mass conversions, molarity); biology (converting cell
  sizes to nm, μm); engineering (tolerances in mm, machine loads in kN).
- *Real-world*: fuel efficiency (mpg → L/100km); medicine (dosing in mg/kg → mg
  for a specific patient); cooking (US cups → metric ml).
- *Expert transfer*: natural units — setting physical constants to 1 is the
  physicist's ultimate unit conversion. Understanding why requires deep comfort
  with the "multiply by 1" framework and the idea that any self-consistent unit
  system works.

## Curriculum feedback

The KG lists no unlocks — this underrepresents its functional reach. Unit
conversion is a prerequisite skill for using numerical values in any domain;
its downstream impact is as broad as any concept in the curriculum. The
`estimated_hours: 1` is appropriate for the core concept; full automaticity
(particularly for compound units) requires distributed practice over weeks.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

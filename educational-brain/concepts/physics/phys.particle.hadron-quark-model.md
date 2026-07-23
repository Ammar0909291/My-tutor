# Quark Model of Hadrons: Baryons and Mesons — `phys.particle.hadron-quark-model`

## Identity

- **Concept ID**: `phys.particle.hadron-quark-model` (canonical physics
  KG)
- **Curriculum location**: physics / particle physics — dependency
  level 19.
- **Prerequisites**: `phys.particle.quarks` (quark charges and flavors
  are combined into hadrons here).
- **Unlocks** (from KG): `phys.particle.weak-interaction`,
  `phys.particle.conservation-laws`, `phys.particle.standard-model`.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**:
  0.80 · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly classify a hadron as a baryon (three
quarks) or meson (quark-antiquark pair) and compute its charge as the sum
of constituent quark charges; (2) correctly explain that a hadron's mass
is dominated by strong-force binding energy, not the sum of constituent
quark rest masses — for the proton, bare quark masses account for only
about 1% of the measured mass, with the remaining ~99% coming from the
gluon field's binding energy via E=mc²; (3) correctly compute baryon
number as a completely separate sum from electric charge (quark count
alone, regardless of flavor, versus flavor-dependent charge), never
conflating the two even when they coincidentally match (as for the
proton).

## Core Understanding

Hadrons combine quarks in exactly two allowed patterns — baryons (three
quarks) and mesons (a quark-antiquark pair) — and the quark model
predicts the charge, approximate mass, and existence of every known
hadron from its quark content alone. A first persistent error assumes a
hadron's mass simply equals the sum of its constituent quark rest
masses, applying everyday additive intuition (a car's mass is the sum of
its parts) to hadrons — but summing the proton's bare quark masses
(~2+2+5=9 MeV/c²) accounts for only about 1% of its measured mass (938
MeV/c²), with the overwhelming remainder coming from the strong-force
binding energy (the gluon field's stored energy, converted to mass via
E=mc²). A second error assumes any combination of quarks (two, four, any
number) should form a valid ordinary hadron, missing that color
neutrality (fully developed in the next concept) restricts stable,
ordinary hadrons to exactly two recipes — three quarks or a
quark-antiquark pair — with rare exotic tetraquark/pentaquark states
confirmed only recently as genuine but unusual exceptions. A third error
conflates baryon number with electric charge because the proton happens
to have both equal to +1, missing that the neutron (charge 0, baryon
number +1) and the Ω⁻ baryon (charge −1, baryon number +1) both clearly
show these are two entirely separate bookkeeping sums — charge from
each quark's flavor-dependent charge, baryon number from quark count
alone regardless of flavor.

## Mental Models

**Beginner**: "A proton's mass should just be the sum of its quark
masses; any number of quarks should combine into some kind of hadron;
baryon number and charge are basically the same number." Upgrade
trigger: computing the proton's bare-quark-mass sum (9 MeV/c²) against
its measured mass (938 MeV/c²) directly confronts the additive-mass
assumption; being told only 3-quark and quark-antiquark combinations
form ordinary hadrons, with the full color-neutrality reason deferred to
the next concept, directly confronts the any-combination assumption;
computing the neutron's charge (0) and baryon number (+1) side by side
directly confronts the conflation.

**Intermediate**: "Hadron mass is dominated by strong-force binding
energy, not bare quark mass; only 3-quark and quark-antiquark
combinations are ordinary hadrons, per color neutrality; charge and
baryon number are two completely independent sums." This model correctly
captures the core computational and conceptual distinctions but may
still need practice applying the two-recipe charge/baryon-number
computation to less familiar hadrons (kaons, sigma baryons).

**Advanced**: always compute charge and baryon number as two entirely
separate sums (never assume they match), and always attribute the bulk
of a light-quark hadron's mass to binding energy, not bare quark mass.

**Expert**: the connection to Gell-Mann's 1962 Ω⁻ prediction (from a gap
in the baryon decuplet pattern, confirmed in 1964 with matching mass and
charge — a genuine Mendeleev-style predictive triumph) and the modern
discovery of tetraquark/pentaquark exotic states at the LHCb experiment
— not required for mastery, natural bridge to
`phys.particle.standard-model`.

## Why Students Fail

The dominant failure is assuming hadron mass is simply additive over
constituent quark masses, missing that binding energy dominates
overwhelmingly for light-quark hadrons; a closely related failure
assumes any quark count forms a valid hadron, missing the
color-neutrality constraint restricting ordinary hadrons to exactly two
recipes; a further failure conflates charge and baryon number as the
same quantity because they coincide for the proton, missing that they
are computed by entirely different rules and frequently disagree.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.particle.hadron-quark-
model.md`, Section 4 Misconception Library) documents three; reused by
reference with birth-type added.

- **MC-1 (a hadron's mass is the sum of its quark masses)**: believing
  "the proton's mass should just be the sum of its quark masses." **Birth
  type**: overgeneralization (Type 1) — everyday additive intuition from
  composite objects (a car's mass sums its parts) is applied without
  modification to hadrons, missing that binding energy, not bare quark
  mass, dominates. Probe: "The proton's mass is about 938 MeV/c². Its
  three quarks have masses of roughly 2, 2, and 5 MeV/c². Do these
  numbers add up?"
- **MC-2 (any quark combination should form a valid hadron)**: believing
  "if three quarks make a baryon, two quarks should make something too,
  and four quarks should make something bigger." **Birth type**:
  overgeneralization (Type 1) — the pattern "quarks combine to form
  hadrons" is extended to "any number of quarks combines," missing the
  color-neutrality constraint restricting ordinary hadrons to exactly two
  recipes. Probe: "Could two quarks alone combine to form a stable
  hadron?"
- **MC-3 (baryon number and electric charge are the same quantity)**:
  believing "baryon number and charge are basically the same thing, just
  under different names." **Birth type**: overgeneralization (Type 1) —
  the coincidence that the proton (the most familiar hadron) has both
  charge +1 and baryon number +1 is generalized to "these always match,"
  missing that they are computed by entirely independent rules. Probe:
  "A proton has charge +1 and baryon number +1. Does that mean charge
  and baryon number are always the same number for any hadron?"

## Analogies

**Best**: Mendeleev's periodic table gap — Gell-Mann's 1962 Ω⁻
prediction from a gap in a symmetric baryon pattern, confirmed in 1964
with matching mass and charge, directly parallels Mendeleev predicting
undiscovered elements' properties from gaps in his periodic table;
directly illustrates how a good classification scheme becomes a
genuinely predictive theory the moment it successfully predicts something
not yet observed, reinforcing that the quark model is not merely
retroactive bookkeeping.

**Anti-analogy**: do NOT say "a hadron's mass is like a car's mass —
just add up the parts" — this directly reinforces MC-1; the
binding-energy-dominates-mass point is the single most important and
counter-intuitive fact in this concept and must not be softened by an
additive analogy.

## Demonstrations

Worked-example: sum the proton's bare quark masses (2+2+5=9 MeV/c²) and
compare directly against its measured mass (938 MeV/c²), visually
highlighting the enormous discrepancy — directly targets MC-1 by making
the ~99%-from-binding-energy conclusion a computed, checkable fact
rather than an assertion. Worked-example: build a charge-and-baryon-
number table live for five hadrons (proton, neutron, π⁺, π⁻, Ω⁻),
computing both quantities independently for each — directly targets
MC-3 by making the two separate computations concrete and checkable
side by side.

## Discovery Questions

Discovery-style: "A proton has charge +1. I'm going to tell you it's
built from three pieces, each with a fractional charge. How can three
fractions add up to a clean whole number? Guess what fractions might
work." — learner discovers (through guided trial) the +⅔e/−⅓e charge
values that make the arithmetic work, directly reinforcing the
charge-summation procedure this concept builds on.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (5 actions,
session_cap 5: two-recipes explanation with the charge/baryon-number
table directly probing MC-3 → mass-arithmetic-mismatch challenge
directly confronting MC-1 → MC-2 preview flagging the full
color-neutrality explanation as deferred → Ω⁻-prediction demonstration
consolidating predictive power → rapid-fire classification round priming
assessment). MC-3 is addressed first via the charge/baryon-number table,
before MC-1 via the mass-arithmetic mismatch, before MC-2 via the
explicit preview of the next concept's color-neutrality explanation.

## Tutor Actions

WORKED-EXAMPLE (charge and baryon-number table built live for five
hadrons); WORKED-EXAMPLE (proton bare-quark-mass sum compared against
measured mass, quantifying the binding-energy discrepancy);
THOUGHT-EXPERIMENT (Gell-Mann's 1962 Ω⁻ prediction from a decuplet
pattern gap, confirmed in 1964); ANALOGY (Mendeleev's periodic-table gap
prediction).

## Voice Teaching Notes

Listen for "the proton's mass should just be the sum of its quark
masses" or "baryon number and charge are the same thing" — the two most
frequent misconception tells. Load-bearing sentence: "every ordinary
hadron follows exactly one of two recipes — three quarks or a
quark-antiquark pair — and while charge comes from summing each quark's
flavor-dependent charge, baryon number comes from just counting quarks
regardless of flavor, so they're two completely separate sums that only
sometimes happen to match; and almost all of a proton's mass is actually
the energy of the force holding its quarks together, not the quarks'
own weight." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner expecting hadron mass to equal the sum of quark masses signals
MC-1 (full repair via the proton mass-arithmetic-mismatch worked
example). A learner assuming any quark count forms a valid hadron
signals MC-2 (full repair via the explicit preview of color neutrality
in the next concept). A learner conflating baryon number with charge
signals MC-3 (full repair via the charge/baryon-number table built
side by side for the neutron). Mastery trigger: correctly classifying a
hadron as baryon or meson and computing its charge, correctly explaining
why binding energy dominates hadron mass, and correctly computing charge
and baryon number as two independent sums. Blueprint's Section 11
Assessment (FA-1 through FA-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "if a stretched spring stores extra energy just from
being stretched, and that stored energy adds to the system's total
energy beyond the sum of its parts' weight, could a 'stretched' field
between quarks do something similar — and how extreme could that effect
get?" (isolating the stored-field-energy-adds-to-mass pattern before
reapplying it specifically to why the proton's mass so vastly exceeds
its bare quark masses). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (two recipes: baryon=3 quarks, meson=quark+antiquark; hadron
mass dominated by binding energy, not bare quark mass; charge and
baryon number are independent sums) bound to procedure (computing charge
from quark flavors; computing baryon number from quark/antiquark count;
comparing bare-quark-mass sums to measured hadron masses). Interleave
with `phys.particle.quarks`, `phys.particle.strong-interaction`, and
`phys.particle.conservation-laws`.

## Transfer Connections

Near: classifying and computing charge/baryon number for newly
encountered hadrons (kaons, sigma baryons, exotic tetraquarks) using the
same two-recipe method. Far: the general scientific principle of
predictive classification (Mendeleev's periodic table, the quark model's
baryon decuplet) — a classification scheme's ultimate test is whether it
predicts something not yet observed, not merely organizes what's already
known. Real-world: modern collider discoveries of tetraquark and
pentaquark exotic states (LHCb experiment) extend, rather than
contradict, the basic quark-combination rules taught here. Expert: the
general principle that a bound system's mass can be dominated by binding
energy rather than constituent rest mass, echoed (in reduced form) by
nuclear binding energy.

## Cross-Subject Connections

KG `cross_links` empty. No cross-subject connection currently
identified beyond the general predictive-classification pattern already
covered under Transfer Connections — recorded honestly as a null
finding for KG-level cross-links specifically, not fixed (no KG file
modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.particle.hadron-
quark-model.md`, numbered-Section format). Reuses: Section 4
Misconception Library by reference. Not restated: Section 0 Concept
Metadata, Section 1 Concept Spine full formula derivations, Section 5
Explanation Library, Section 7 Demonstration Library full walkthroughs,
Section 8 Discovery Lesson full sequence, Section 11 Assessment full
item text, Section 12 Recovery Notes, Section 13 Memory and Review
schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisites, unlocks, and difficulty
calibration are internally consistent with this concept's role unlocking
three parallel successor concepts (weak interaction, conservation laws,
Standard Model) that each independently build on the baryon/meson
framework established here.

## Version History

- 2026-07-23 (physics EB Wave 19): initial authoring.

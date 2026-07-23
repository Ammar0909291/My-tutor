# EMF, Internal Resistance, and Terminal Voltage — `phys.em.emf`

## Identity

- **Concept ID**: `phys.em.emf` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 8.
- **Prerequisites**: `phys.em.dc-circuits` — modeling a real battery as an
  ideal EMF source in series with internal resistance directly applies
  already-secure series-circuit voltage-division reasoning to the
  battery's own internal structure.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly state EMF (ε) is ENERGY per unit charge
(measured in volts = joules/coulomb), NOT a mechanical force — despite
its historical name "electromotive force" — and correctly explain the
unit mismatch (force is in Newtons, EMF is in volts) that proves this;
(2) correctly state V_terminal = ε - Ir and correctly explain that
terminal voltage equals EMF ONLY in the open-circuit case (I=0) — under
any actual load, terminal voltage is always LESS than EMF, due to the
internal resistance's own voltage drop.

## Core Understanding

EMF (electromotive force, ε) is a genuinely misleading historical name —
despite containing the word "force," EMF is actually ENERGY supplied
PER UNIT CHARGE by a source (ε = W/q), measured in volts (joules per
coulomb), an entirely different physical quantity from mechanical force
(measured in Newtons) — the unit mismatch alone proves EMF cannot be a
force in the Newtonian sense; it is better understood as a source's
"energy rating," analogous to a water pump's rating (how much energy the
pump gives each liter of water, not how hard it mechanically pushes). A
real battery is modeled as an ideal EMF source ε in series with its own
internal resistance r — when NO current flows (open circuit), no voltage
is dropped across r, so the measured terminal voltage exactly equals ε;
but the MOMENT current flows under an actual load, V_terminal = ε - Ir,
meaning terminal voltage is ALWAYS less than the EMF for a discharging
battery — the internal resistance "eats into" the available voltage in
proportion to how much current is drawn, which is why a battery's
measured voltage under heavy load is noticeably lower than its
open-circuit (nameplate) rating.

## Mental Models

**Beginner**: "EMF is the force pushing electrons through the circuit; a
battery's terminal voltage always equals its EMF (e.g. a '9V battery'
always measures 9V)." Upgrade trigger: checking EMF's actual units
(volts = J/C, not Newtons) directly confronts the force assumption;
measuring the same battery's voltage in open circuit (≈9V) versus under a
significant load (noticeably less) directly confronts the
always-equal-EMF assumption.

**Intermediate**: "EMF is energy per unit charge (a source rating, not a
force); V_terminal = ε - Ir, so terminal voltage drops below EMF once
current flows." This model correctly captures both distinctions, but
sometimes still conflates the two terms loosely in casual speech ("the
battery's voltage") without specifying open-circuit vs. under-load.

**Advanced**: "Always distinguish EMF (the source's fixed energy rating,
ε) from terminal voltage (what's actually measurable across the
battery's terminals, V_terminal = ε - Ir) — the two coincide only at
I=0, and the gap between them grows with the current drawn."

**Expert**: EMF as a path integral of the non-electrostatic force per
unit charge driving current around a circuit (e.g. the chemical or
motional force in a battery/generator) — a natural, more rigorous
definition, not required for mastery.

## Why Students Fail

The dominant failure is taking the historical name "electromotive
force" literally, treating EMF as a genuine mechanical force rather than
an energy-per-charge quantity; a second, distinct failure is assuming a
battery's terminal voltage always equals its rated EMF, without
accounting for the internal-resistance voltage drop that appears under
load.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.emf.md`, Misconception
Engine) documents two; reused by reference with birth-type added.

- **MC-EMF-IS-A-FORCE**: describing a battery as "pushing electrons with
  a force of 12 volts," treating EMF as a Newtonian force. **Birth
  type**: language contamination (Type 3) — the historical name
  "electromotive FORCE" is taken literally, despite EMF being measured
  in units (volts, J/C) entirely distinct from force's units (Newtons).
  Probe: "What are the units of force? What are the units of EMF? Are
  they the same physical quantity?"
- **MC-TERMINAL-VOLTAGE-EQUALS-EMF**: assuming V_terminal = ε always,
  measuring a battery's voltage under load and calling it EMF without
  checking load conditions. **Birth type**: overgeneralization (Type 1)
  — the open-circuit case (where V_terminal genuinely does equal ε) is
  treated as the general case, extended incorrectly to any load
  condition where internal resistance's voltage drop actually matters.
  Probe: "A 9V battery reads 9.0V with nothing connected. Connected to a
  1Ω load, does it still read exactly 9.0V?"

## Analogies

**Best**: a water pump's energy rating — the rating tells you how much
energy the pump adds to each liter of water passing through, not how
hard it mechanically shoves the water — directly targets MC-EMF-IS-A-FORCE
by reframing EMF as an energy-per-unit quantity rather than a
push/force.

**Anti-analogy**: do NOT say "the battery's voltage is 9 volts" without
specifying whether this means EMF (open-circuit rating) or terminal
voltage (under-load, actual measured value) — this ambiguous phrasing
directly invites MC-TERMINAL-VOLTAGE-EQUALS-EMF.

## Demonstrations

Physical/conceptual: unit-check EMF (volts = J/C) against force
(Newtons = kg·m/s²), showing they cannot be the same quantity — directly
targets MC-EMF-IS-A-FORCE. Physical: measure the same battery's voltage
in open circuit (≈9.0V) and under a real load (e.g. ≈8.0V with a 1Ω
resistor), showing the measurable drop — directly targets
MC-TERMINAL-VOLTAGE-EQUALS-EMF.

## Discovery Questions

Discovery-style: "does a battery's voltage reading change depending on
whether something is actually drawing current from it?" — learner
predicts, then the open-circuit-vs-loaded measurement resolves it,
directly confronting MC-TERMINAL-VOLTAGE-EQUALS-EMF.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-EMF-IS-A-FORCE is
addressed first (establishing EMF as an energy-per-charge quantity, not a
force), before MC-TERMINAL-VOLTAGE-EQUALS-EMF, since correctly
understanding EMF as the source's fixed energy rating is the prerequisite
for then distinguishing it from the load-dependent terminal voltage.

## Tutor Actions

WORKED-EXAMPLE (unit check for EMF vs. force; V_terminal=ε-Ir computed at
several current values); DEMONSTRATION (battery voltage measured
open-circuit vs. under load); ANALOGY (the water-pump energy-rating
analogy).

## Voice Teaching Notes

Listen for EMF described as a "push" or "force," or a battery's rated
voltage assumed to hold exactly under any load — the two direct
misconception tells. Load-bearing sentence: "EMF is energy per charge,
not a force — and the moment current flows, internal resistance eats
into the voltage you actually get." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing EMF in force-like terms (pushing, shoving) signals
MC-EMF-IS-A-FORCE (MISCONCEIVING, full repair via the unit check). A
learner assuming terminal voltage always equals EMF under any load
signals MC-TERMINAL-VOLTAGE-EQUALS-EMF (full repair via the
open-circuit-vs-loaded measurement). Mastery trigger: correctly stating
EMF's units and physical meaning as energy per charge, AND correctly
computing V_terminal=ε-Ir for a given current. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the battery for a second — what are the
actual UNITS of force, and what are the units of EMF (volts)? Are they
the same?" (isolating the unit mismatch before discussing the physical
meaning). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (EMF as energy-per-charge; terminal-voltage load-dependence)
bound to procedure (V_terminal=ε-Ir calculation). Interleave with
`phys.em.dc-circuits` and `phys.em.kirchhoffs-laws` (sibling concept at
this same dependency level, since EMF sources appear directly in KVL
loop equations).

## Transfer Connections

Near: any battery-with-internal-resistance circuit problem, including
device power-supply design. Far: electric vehicle battery engineering
(internal resistance directly determining maximum safe discharge current
and heat generation) and power-plant generator design (EMF generation via
electromagnetic induction, with internal resistance limiting delivered
power). Real-world: understanding why a car battery's headlights dim
noticeably while cranking the starter motor (heavy current draw increases
the Ir voltage drop, lowering terminal voltage). Expert: EMF as a path
integral of the non-electrostatic driving force per unit charge.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
assessment component by reference. Not restated: Concept Identity &
Metadata, Concept Explanation Multi-Tier, Worked Examples, Lesson
Composition Grammar, Retrieval Spacing Schedule, Prerequisite & Unlock
Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 8): initial authoring.

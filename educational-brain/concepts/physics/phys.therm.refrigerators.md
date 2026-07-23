# Refrigerators and Heat Pumps — `phys.therm.refrigerators`

## Identity

- **Concept ID**: `phys.therm.refrigerators` (canonical physics KG)
- **Curriculum location**: physics / thermodynamics — dependency level 12.
- **Prerequisites**: `phys.therm.carnot-cycle` — refrigerators are heat
  engines run in reverse, directly applying the already-secure Carnot
  cycle framework to heat-MOVING rather than heat-to-work-converting
  devices.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that a refrigerator does NOT
"create cold" or "make cold air" — cold is simply the ABSENCE of thermal
energy, not a substance; the refrigerator's interior gets colder because
thermal energy is MOVED OUT of it (to the warmer kitchen), not because
"coldness" is produced or added; (2) correctly explain that a
refrigerator's coefficient of performance, COP=Q_C/W, is NOT bounded by
1 the way heat-engine efficiency is — COP CAN and routinely DOES exceed
1 (typical refrigerators: COP=3-5) WITHOUT violating any thermodynamic
law, since COP measures HEAT MOVED per unit work input (a transport
process), fundamentally different from heat-engine efficiency (a
heat-to-work CONVERSION process bounded by η≤1).

## Core Understanding

A refrigerator does NOT "create cold" or "make cold air" — cold is
simply the ABSENCE of thermal energy, not a substance that can be
manufactured or added; the interior molecules of a fridge at 5°C are the
IDENTICAL molecules that were at 25°C before cooling — they have not
been replaced with special "cold molecules." What actually changed is
ENERGY: the refrigeration cycle physically MOVES thermal energy OUT of
the interior (to the warmer kitchen air), and the interior's temperature
drops specifically because it has LOST thermal energy, not because
"cold" was introduced from somewhere. A second, equally important and
often confusing point concerns the refrigerator's efficiency measure:
the Coefficient of Performance, COP_R=Q_C/W (heat removed from the cold
interior divided by work input), is NOT bounded by 1 the way ordinary
heat-engine efficiency (η=W_out/Q_H≤1) is — COP CAN exceed 1, and
typical household refrigerators routinely achieve COP=3-5, WITHOUT
violating any law of thermodynamics. This is not a contradiction because
COP measures a fundamentally DIFFERENT kind of process than heat-engine
efficiency: a heat engine CONVERTS heat into work (bounded, since you
cannot get more work out than heat in, W_out≤Q_H); a refrigerator instead
MOVES heat using work as an input (a transport process, not a
conversion) — the refrigerator moves Q_C AND additionally deposits the
work energy W into the hot reservoir as well (Q_H=Q_C+W>W), so
COP=Q_C/W can genuinely be much greater than 1, since you're comparing
the heat MOVED to the (smaller) work SPENT to move it, not comparing an
output to an input in a conversion sense — the second law still sets a
maximum (Carnot) COP ceiling, but that ceiling is often well above 1,
unlike heat-engine efficiency's hard ceiling at exactly 1.

## Mental Models

**Beginner**: "The refrigerator makes cold air or creates coldness; a
COP greater than 1 must violate thermodynamics, since efficiency can't
exceed 100%." Upgrade trigger: comparing the identical molecules inside
a fridge before and after cooling (same molecules, less thermal energy,
not "cold molecules" added) directly confronts the creates-cold
assumption; computing Q_H=Q_C+W explicitly for a real refrigerator
(showing COP=Q_C/W can genuinely exceed 1) directly confronts the
COP-cannot-exceed-1 assumption.

**Intermediate**: "Cold is the absence of thermal energy; refrigerators
move heat, they don't create cold; COP=Q_C/W measures heat MOVED per
work spent, genuinely exceeding 1 for real refrigerators without
violating any law." This model correctly captures both core results, but
sometimes still conflates COP with heat-engine efficiency out of habit,
expecting an analogous ≤1 bound.

**Advanced**: "Always distinguish CONVERSION processes (heat engines,
bounded efficiency ≤1) from TRANSPORT processes (refrigerators/heat
pumps, COP potentially >>1) — the second law's Carnot ceiling still
applies to COP, just at a value that can be well above 1, not at 1
itself."

**Expert**: the reverse-Carnot-cycle derivation giving the maximum
theoretical COP_Carnot=T_C/(T_H-T_C) for a refrigerator (or
T_H/(T_H-T_C) for a heat pump), directly extending the already-secure
Carnot cycle framework to this reversed application — a natural
consolidation, not required for mastery.

## Why Students Fail

The dominant failure is thinking of "cold" as a substance a refrigerator
manufactures or adds, rather than the absence of thermal energy moved
away; a second, distinct failure is assuming COP must be bounded by 1
like heat-engine efficiency, missing the fundamental distinction between
heat-conversion (bounded) and heat-transport (potentially far exceeding
1) processes.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.therm.refrigerators.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-REFRIGERATOR-CREATES-COLD**: believing "the refrigerator makes
  cold air" or "creates coldness," as though the fridge produces a
  substance called "cold." **Birth type**: language contamination (Type
  3) — everyday language treats "cold" as a thing that can be produced
  or added, obscuring the underlying physics of cold as merely the
  absence (relatively) of thermal energy. Probe: "Does a refrigerator's
  interior contain special 'cold molecules,' or the same molecules that
  were there before, just with less thermal energy?"
- **MC-COP-CANNOT-EXCEED-ONE**: believing "efficiency can't be more than
  100%," confused that COP>1 is possible, thinking it violates
  thermodynamics. **Birth type**: overgeneralization (Type 1) — the
  correct bound on heat-ENGINE efficiency (η≤1, a conversion process) is
  incorrectly extended to refrigerator COP, a fundamentally different
  transport-process measure with no such bound. Probe: "A typical
  refrigerator has COP=3-5. Does this violate the laws of
  thermodynamics, since it seems to exceed '100% efficiency'?"

## Analogies

**Best**: a water pump moving water uphill using electrical energy — the
pump doesn't "create" water, it MOVES existing water using energy input,
and the amount of water moved can be much larger than some simple
measure of the energy spent — directly targets both
MC-REFRIGERATOR-CREATES-COLD (moving, not creating) and
MC-COP-CANNOT-EXCEED-ONE (transport, not conversion, so no 1-bound
applies).

**Anti-analogy**: do NOT say "the refrigerator's efficiency is COP" as an
unqualified statement using "efficiency" language — this directly
invites MC-COP-CANNOT-EXCEED-ONE by implying the same ≤1 bound that
applies to heat-engine efficiency specifically.

## Demonstrations

Conceptual: trace the refrigeration cycle explicitly, showing thermal
energy physically moving from the cold interior to the warm exterior,
with no new "cold" substance appearing anywhere — directly targets
MC-REFRIGERATOR-CREATES-COLD. Worked-example: compute Q_H=Q_C+W for a
real refrigerator with COP=4, verifying Q_H>W and no law is violated —
directly targets MC-COP-CANNOT-EXCEED-ONE.

## Discovery Questions

Discovery-style: "if a refrigerator has COP=4, does this mean it's
'400% efficient,' breaking some law of physics, or is COP measuring
something fundamentally different from efficiency?" — learner reasons
through the transport-vs-conversion distinction, directly confronting
MC-COP-CANNOT-EXCEED-ONE.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-REFRIGERATOR-CREATES-COLD is addressed first (establishing cold as
absence-of-energy, refrigeration as heat transport), before
MC-COP-CANNOT-EXCEED-ONE, since correctly framing refrigeration as a
TRANSPORT (not conversion) process is the prerequisite for then correctly
reasoning about why its performance measure (COP) isn't bounded the same
way heat-engine efficiency is.

## Tutor Actions

WORKED-EXAMPLE (refrigeration-cycle energy trace; Q_H=Q_C+W computed
for COP=4); ANALOGY (water pump moving, not creating, water uphill).

## Voice Teaching Notes

Listen for "the fridge makes cold" or confusion about COP exceeding 1 —
the two direct misconception tells. Load-bearing sentence: "cold isn't a
thing you make, it's just less thermal energy — the fridge MOVES heat
out; and COP isn't the same kind of 'efficiency' as an engine's, so it
can be well above 1." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing the fridge as "creating cold" signals
MC-REFRIGERATOR-CREATES-COLD (MISCONCEIVING, full repair via the
cycle-tracing demonstration). A learner treating COP>1 as a violation of
thermodynamics signals MC-COP-CANNOT-EXCEED-ONE (full repair via the
Q_H=Q_C+W computation). Mastery trigger: correctly explaining cooling as
heat removal (not cold creation), AND correctly computing COP>1 without
treating it as a violation. Blueprint's assessment component cited for
the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the fridge for a second — if you have a
water pump moving water uphill, does the pump CREATE water, or just
MOVE it?" (isolating the moving-not-creating framework before applying
it to heat and cold). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (cold as absence of energy, not substance; COP as a transport
measure unbounded by 1) bound to procedure (COP=Q_C/W and Q_H=Q_C+W
calculation). Interleave with `phys.therm.carnot-cycle`.

## Transfer Connections

Near: any refrigerator/heat-pump COP calculation problem. Far:
HVAC engineering (heat pump systems for home heating/cooling, exploiting
high COP for energy-efficient climate control) and industrial
refrigeration (large-scale cold-storage and cryogenic systems). Real-
world: understanding why heat pumps are more energy-efficient than
resistive electric heaters for home heating — they MOVE heat (COP>1)
rather than converting electrical energy directly to heat (effectively
COP=1). Expert: the reverse-Carnot-cycle derivation of maximum
theoretical COP.

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

- 2026-07-23 (physics EB Wave 12): initial authoring.

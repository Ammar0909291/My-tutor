# Potential Energy — `phys.mech.potential-energy`

## Identity

- **Concept ID**: `phys.mech.potential-energy` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.work` — potential energy is defined as
  stored capacity to do work, directly built on the already-secure work
  concept.
- **Unlocks** (from KG): `phys.mech.conservation-of-energy`,
  `phys.mech.gravitational-potential`.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly compute gravitational potential energy,
GPE = mgh, and correctly explain that h is measured relative to an
ARBITRARILY CHOSEN reference level, making GPE's absolute value physically
meaningless — only CHANGES in GPE (ΔGPE) have physical significance;
(2) correctly identify that "height" in GPE refers to VERTICAL height
change, not the total path length traveled, correctly computing GPE
change for a non-vertical path using only its vertical displacement
component; (3) correctly explain why different reference-level choices for
the same physical scenario always agree on ΔGPE even when they disagree on
the absolute GPE value.

## Core Understanding

Gravitational potential energy, GPE = mgh, represents energy stored due to
an object's position in a gravitational field relative to some chosen
reference level (h = 0) — critically, this reference level is an arbitrary
choice (the floor, the table, sea level, the center of the Earth all work),
meaning the ABSOLUTE value of GPE has no physical meaning on its own; only
the CHANGE in GPE between two states (ΔGPE) is physically meaningful and
independent of which reference level was chosen, since a shifted reference
level shifts both the initial and final GPE by the identical amount,
leaving their difference unchanged. Additionally, "height" in this formula
specifically means vertical displacement — an object moved along a curved
or slanted path gains GPE only according to its net VERTICAL rise, not the
total distance traveled along the path, since gravity (and therefore the
work done against/by it) only cares about vertical displacement.

## Mental Models

**Beginner**: "GPE = mgh gives the object's stored energy" (treated as an
absolute, meaningful number on its own). Upgrade trigger: asking two
students to compute GPE for the identical scenario using different
reference levels (floor vs. tabletop) and getting different "answers" that
nonetheless agree on the CHANGE directly confronts the absolute-value
assumption.

**Intermediate**: "GPE's absolute value is reference-level-dependent and
physically meaningless; only ΔGPE matters, and it is reference-independent."
This model is correct but sometimes still computes h as total path length
rather than net vertical displacement on non-vertical paths.

**Advanced**: "h is always vertical displacement specifically — on an
incline or curved path, project onto the vertical to find the relevant h,
regardless of the path's actual length or shape," generalizing the
height-is-vertical rule to any path geometry.

**Expert**: potential energy as (minus) the work done by a conservative
force field, itself defined only up to an additive constant (the gauge
freedom directly explaining why absolute values are meaningless) — not
required for mastery.

## Why Students Fail

The dominant failure is absolute-value literalism: students compute
GPE = mgh and treat the resulting number as a meaningful, fixed physical
quantity (the way mass or kinetic energy are), missing that the "0" point
was an arbitrary choice with no physical significance of its own.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.potential-energy.md`,
Misconception Engine, Priority 1-2) documents two; reused by reference
with birth-type added.

- **MC-GPE-ABSOLUTE** (Priority 1): treating GPE's absolute value as
  physically meaningful, independent of reference-level choice. **Birth
  type**: overgeneralization (Type 1) — other energy forms (kinetic
  energy, for instance) DO have meaningful absolute values, and this
  expectation is incorrectly extended to GPE, which is defined only up to
  an arbitrary additive constant. Probe: "Two students compute the GPE of
  a ball on a table — one measuring height from the floor, one from the
  tabletop. Do they get the same number? Does that mean one of them is
  wrong?"
- **MC-HEIGHT-VERTICAL-ONLY** (Priority 2): computing "h" as total path
  length traveled rather than net vertical displacement, on a non-vertical
  path. **Birth type**: overgeneralization (Type 1) — "distance traveled"
  is the more commonly practiced everyday notion of "how far," incorrectly
  substituted for the specifically vertical component gravity cares about.
  Probe: "A ball rolls up a long, gently sloped ramp, rising 2 meters
  vertically over a 10-meter path length. What height do you use to
  compute its GPE gain?"

## Analogies

**Best**: measuring temperature in Celsius vs. Fahrenheit — the absolute
number differs depending on the scale (reference point) chosen, but a
TEMPERATURE CHANGE (say, a 10-degree rise) is describable consistently in
either scale once converted — directly targets MC-GPE-ABSOLUTE by
illustrating a familiar "absolute value is scale-dependent, but change is
meaningful" pattern. **Breaking point**: Celsius/Fahrenheit conversion
involves a scaling factor as well as an offset; GPE reference shifts are
pure offset (additive constant) only.

**Anti-analogy**: do NOT say "GPE tells you how much energy an object
has" without immediately qualifying "relative to a reference point you
choose" — unqualified, this framing directly installs MC-GPE-ABSOLUTE.

## Demonstrations

Physical: have two groups compute the same ball's GPE using different
reference levels (floor vs. table), then compute ΔGPE as the ball moves
from one point to another — showing both groups agree on ΔGPE despite
disagreeing on the absolute value. For MC-HEIGHT-VERTICAL-ONLY: an
inclined ramp with a marked vertical rise, having students identify which
measurement (ramp length vs. vertical rise) belongs in the GPE formula.

## Discovery Questions

Discovery-style: "if two people measure a ball's height from different
starting points, do they get the same GPE?" — learner predicts, then the
two-reference-level demonstration resolves it, directly confronting
MC-GPE-ABSOLUTE with a concrete numeric mismatch that nonetheless
resolves via ΔGPE agreement.

## Teaching Sequence

Blueprint's Teaching Action Sequence cited by reference. MC-GPE-ABSOLUTE
repaired first via the dual-reference-level demonstration, before
MC-HEIGHT-VERTICAL-ONLY, since understanding GPE as fundamentally about
CHANGE (not absolute value) makes the vertical-displacement-only rule for
h easier to accept as a natural consequence (only the vertical component
contributes to the height CHANGE that matters).

## Tutor Actions

WORKED-EXAMPLE (computing ΔGPE from two different reference levels,
verifying agreement); DEMONSTRATION (inclined ramp vertical-rise
measurement); ERROR-ANALYSIS (a solution using ramp length instead of
vertical rise).

## Voice Teaching Notes

Listen for a learner treating a computed GPE number as fixed/final without
qualifying its reference point — the MC-GPE-ABSOLUTE tell. Load-bearing
sentence: "GPE's number depends on where you measure from — only the
CHANGE in GPE actually matters physically." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner asserting one reference-level choice is "wrong" because it gives
a different absolute number signals MC-GPE-ABSOLUTE (MISCONCEIVING, full
repair via dual-reference demonstration). Mastery trigger: correctly
computing ΔGPE consistently across two different reference-level choices,
AND correctly using vertical rise (not path length) on an inclined-path
problem. Blueprint's Mastery Probe Bank cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the starting point for a second — how much did
the height CHANGE?" (isolating ΔGPE from the absolute-value confusion).
See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (reference-dependence, vertical-only height) bound to procedure
(GPE/ΔGPE calculation). Interleave with `phys.mech.work` and, once
authored, `phys.mech.conservation-of-energy` and
`phys.mech.gravitational-potential`.

## Transfer Connections

Near: any height-change energy problem, including roller coasters and
pendulums. Far: hydroelectric dam engineering (potential energy of stored
water, computed relative to the turbine's height, not sea level
necessarily) and orbital mechanics (gravitational potential energy with
its own conventional reference at infinite separation). Real-world:
understanding why "how much energy does this object have" is an
ill-posed question without specifying relative to what. Expert: potential
energy as defined up to a gauge-freedom additive constant, a pattern
recurring in electric potential and beyond.

## Cross-Subject Connections

KG `cross_links` empty. A genuine connection exists to mathematics
(reference frames / relative coordinate systems) not currently captured as
a cross_link — recorded as Curriculum Feedback.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine,
Teaching Action Sequence, Mastery Probe Bank, by reference. Not restated:
Concept Metadata, Concept Spine, Prerequisite Dependency Map, Formative
Assessment Strategy, Anxiety & Confidence Protocols, Spaced Retrieval &
Interleaving Plan, V-Check Trace.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

KG `cross_links` empty despite a genuine connection to mathematics'
reference-frame content. Flagged for the Curriculum Production Pipeline's
backlog, not fixed here.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.

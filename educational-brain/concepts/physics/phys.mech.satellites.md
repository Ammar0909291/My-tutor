# Artificial Satellites and Geostationary Orbits — `phys.mech.satellites`

## Identity

- **Concept ID**: `phys.mech.satellites` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 10.
- **Prerequisites**: `phys.mech.orbital-mechanics` — geostationary orbit
  calculations and weightlessness explanations directly apply the
  already-secure orbital speed/period relationships.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that a geostationary orbit is NOT
a free design choice of altitude and speed — the T=24-hour requirement
combined with T²∝r³ fixes the geostationary radius UNIQUELY at
≈42,157 km from Earth's center (altitude ≈35,786 km); no other altitude
can be compensated for with a different speed to achieve the same
period; (2) correctly explain that astronauts' weightlessness in orbit
is NOT due to an absence of gravity — gravity at typical orbital
altitudes (e.g. ISS, ≈400 km) is still ≈88% of surface gravity; the
weightless SENSATION arises because the spacecraft and everything in it
are in continuous FREE FALL, eliminating the normal (support) force that
produces the sensation of weight.

## Core Understanding

A geostationary orbit's altitude is NOT a free design parameter that can
be chosen and then compensated for with an adjusted speed — it is a
uniquely DETERMINED physical consequence of requiring the orbital period
T to exactly match Earth's rotation period (24 hours, 86,400 seconds):
from T²=4π²r³/(GM_E), there is EXACTLY ONE solution radius,
r≈42,157 km from Earth's center (altitude≈35,786 km) — a satellite at a
lower altitude necessarily has a SHORTER period (not 24 hours), and one
at a higher altitude has a LONGER period; you cannot pick an arbitrary
altitude and simply fly faster or slower to force a 24-hour period,
since orbital mechanics fixes the speed-radius-period relationship
rigidly. A second, deeply important and widely misunderstood concept:
astronauts experience apparent weightlessness NOT because gravity is
somehow absent in orbit — at a typical orbital altitude like the ISS
(≈400 km), gravity is g=GM/r²≈8.67 m/s², fully 88% of surface gravity,
very much present and substantial. The weightless SENSATION arises
because the entire spacecraft (and everything inside it, including the
astronauts) is in continuous FREE FALL — accelerating downward at
exactly g, with the orbital velocity meaning it perpetually "misses"
Earth rather than hitting it — and since everything falls together at
the identical rate, there is NO relative acceleration between an
astronaut and their surroundings, hence NO normal (support) force,
which is precisely what produces the everyday sensation of weight; this
is the identical physical mechanism (absence of a support force during
free fall) as the brief weightless feeling at the top of a roller
coaster drop, just sustained continuously.

## Mental Models

**Beginner**: "A geostationary satellite can be placed at any altitude
as long as it moves at the right speed; astronauts are weightless
because there's no gravity in space." Upgrade trigger: solving
T²=4π²r³/(GM_E) explicitly for T=24 hours, finding exactly ONE valid
radius, directly confronts the any-altitude assumption; computing actual
gravity at ISS altitude (≈8.67 m/s², 88% of surface value) directly
confronts the no-gravity assumption.

**Intermediate**: "Geostationary altitude is uniquely fixed by the
T=24-hour requirement via T²∝r³; weightlessness comes from continuous
free fall (no support force), not from absent gravity." This model
correctly captures both core results, but sometimes still loosely uses
"zero gravity" as an informal shorthand for the orbital environment,
even while understanding the underlying free-fall mechanism.

**Advanced**: "Always distinguish the PRESENCE of gravitational force
(which orbital mechanics absolutely requires to provide centripetal
acceleration) from the ABSENCE of a support/normal force (which produces
the weightless sensation) — these are two entirely different physical
facts, and orbital weightlessness involves the first being fully present
while the second is genuinely zero."

**Expert**: the geostationary orbit as a specific, uniquely-determined
solution of the general orbital period-radius relationship, and
weightlessness as the general principle underlying the equivalence
principle's local formulation (a freely falling frame is locally
indistinguishable from a gravity-free frame) — a natural consolidation,
not required for mastery.

## Why Students Fail

The dominant failure is treating geostationary altitude as a design
choice adjustable via speed, missing that the 24-hour period requirement
uniquely fixes the radius through orbital mechanics; a second, distinct
failure is attributing astronaut weightlessness to an absence of
gravity, rather than the correct free-fall/no-support-force mechanism.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.satellites.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-GEO-ANYWHERE**: believing a geostationary satellite can be placed
  at any altitude as long as it moves at the right speed. **Birth type**:
  overgeneralization (Type 1) — general orbital flexibility (many
  different altitude/speed combinations produce valid, stable orbits) is
  incorrectly extended to the geostationary case specifically, which has
  an ADDITIONAL, rigid constraint (T=24h exactly) uniquely fixing the
  radius. Probe: "Could a satellite be placed at half the standard
  geostationary altitude and still remain geostationary if it simply
  moved faster?"
- **MC-WEIGHTLESS-NO-GRAVITY**: believing astronauts are weightless
  because there is no gravity in orbit, or that gravity is zero in
  space. **Birth type**: language contamination (Type 3) — the everyday
  phrase "zero gravity," commonly used to describe the orbital
  environment, is taken literally as describing an actual absence of
  gravitational force, rather than the correct free-fall mechanism.
  Probe: "Is the gravitational force at the ISS's orbital altitude
  actually close to zero, or is it still substantial?"

## Analogies

**Best**: the brief weightless feeling at the top of a roller coaster
drop, or in a falling elevator — the identical physical mechanism
(free fall, no support force) as orbital weightlessness, just sustained
continuously rather than momentarily — directly targets
MC-WEIGHTLESS-NO-GRAVITY by connecting to an already-familiar
brief-free-fall experience.

**Anti-analogy**: do NOT say "there's no gravity in space" as an
unqualified description of the orbital environment — this directly
installs MC-WEIGHTLESS-NO-GRAVITY.

## Demonstrations

Worked-example: solve T²=4π²r³/(GM_E) for T=24 hours, showing exactly one
valid radius (≈42,157 km) — directly targets MC-GEO-ANYWHERE.
Worked-example: compute g=GM/r² at ISS altitude (≈400 km), finding
≈8.67 m/s², 88% of surface gravity — directly targets
MC-WEIGHTLESS-NO-GRAVITY.

## Discovery Questions

Discovery-style: "if you dropped a satellite at half the standard
geostationary altitude and gave it whatever speed you wanted, could you
make its orbital period exactly 24 hours?" — learner works through the
T²∝r³ constraint, directly confronting MC-GEO-ANYWHERE.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-GEO-ANYWHERE is addressed first (establishing the rigid, uniquely-
determined geostationary radius), before
MC-WEIGHTLESS-NO-GRAVITY, since both misconceptions share the underlying
theme of correctly applying orbital mechanics rather than assuming
free/arbitrary parameters — resolving the geostationary case first
establishes this discipline before tackling the free-fall explanation.

## Tutor Actions

WORKED-EXAMPLE (T²=4π²r³/(GM_E) solved for the unique geostationary
radius; g computed at ISS altitude); ANALOGY (roller-coaster-drop or
falling-elevator weightlessness mapped onto orbital free fall).

## Voice Teaching Notes

Listen for "any altitude works for geostationary" or "no gravity in
space" — the two direct misconception tells. Load-bearing sentence: "the
24-hour requirement fixes geostationary altitude to exactly one value —
and astronauts are weightless because they're falling continuously, not
because gravity disappeared." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming geostationary orbit can be achieved at any altitude
signals MC-GEO-ANYWHERE (MISCONCEIVING, full repair via the T²∝r³
worked example). A learner attributing weightlessness to absent gravity
signals MC-WEIGHTLESS-NO-GRAVITY (full repair via the g-at-altitude
calculation). Mastery trigger: correctly computing the unique
geostationary radius, AND correctly explaining weightlessness via free
fall, not absent gravity. Blueprint's assessment component cited for the
full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget speed for a second — does the equation
T²∝r³ allow for more than one radius giving T=24 hours?" (isolating the
uniqueness of the solution before discussing speed compensation). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (uniquely-fixed geostationary radius; free-fall weightlessness)
bound to procedure (T²=4π²r³/(GM_E) solved for r; g computed at orbital
altitude). Interleave with `phys.mech.orbital-mechanics` and
`phys.mech.keplers-laws` (sibling concept at this same dependency
level).

## Transfer Connections

Near: any geostationary-orbit or orbital-weightlessness problem. Far:
telecommunications engineering (geostationary satellites for continuous
regional coverage, relying on the unique fixed altitude) and space
medicine (studying astronaut physiological effects of sustained free
fall, distinct from any actual absence of gravity). Real-world:
understanding why all geostationary satellites share the same altitude
ring, distinguished only by longitude. Expert: orbital weightlessness as
a local instance of the equivalence principle.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
discrimination-pairs component by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 10): initial authoring.

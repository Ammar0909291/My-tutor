# Circular Orbital Mechanics — `phys.mech.orbital-mechanics`

## Identity

- **Concept ID**: `phys.mech.orbital-mechanics` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 9.
- **Prerequisites**: `phys.mech.gravitational-potential`,
  `phys.mech.circular-motion` — orbital mechanics directly combines the
  already-secure gravitational PE framework with circular motion's
  centripetal-force requirement, applied to gravity as the centripetal
  force.
- **Unlocks** (from KG): `phys.mech.keplers-laws`, `phys.mech.satellites`
  — a genuine hub concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly state that a HIGHER circular orbit
corresponds to a SLOWER orbital speed (v=√(GM/r), decreasing with r) —
NOT faster, despite higher orbits having more total energy; correctly
distinguish total energy (increasing, less negative, with altitude) from
orbital speed (decreasing with altitude); (2) correctly explain that
orbital speed does NOT depend on the satellite's own mass — v=√(GM/r)
contains only the central body's mass M and orbital radius r, since the
satellite's mass cancels exactly (mirroring Galileo's mass-independent
free-fall result), meaning a 1kg probe and a 10,000kg space station orbit
at identical speed at the same radius.

## Core Understanding

A satellite in a HIGHER circular orbit moves SLOWER, not faster — a
genuinely counterintuitive result, since higher orbits do have MORE
total mechanical energy (E=-GMm/2r, less negative as r increases). The
resolution lies in correctly separating total energy from orbital speed:
climbing to a higher orbit requires energy input (increasing PE), but the
orbital speed needed to maintain a stable circular path at that larger
radius is actually LESS (v=√(GM/r), decreasing as r increases) — total
energy increasing and orbital speed decreasing are BOTH true
simultaneously, since energy and speed are fundamentally different
quantities (KE=GMm/2r actually DECREASES with altitude, even as total
energy E increases due to PE's larger increase). A second, independent
and equally counterintuitive subtlety: orbital speed does NOT depend on
the orbiting satellite's OWN mass at all — deriving the orbital
condition from GMm/r²=mv²/r shows the satellite mass m cancels exactly
from both sides, leaving v²=GM/r, which contains only the CENTRAL
body's mass M and the orbital radius r; this directly mirrors Galileo's
free-fall result (all objects accelerate identically regardless of mass)
since a circular orbit is simply continuous free-fall that perpetually
"misses" the central body due to sideways motion — a 1kg probe and a
10,000kg space station genuinely orbit at the identical speed at the
same radius, though the station requires far more total energy overall.

## Mental Models

**Beginner**: "A satellite in a higher orbit moves faster, since it has
more energy; a heavier satellite needs more speed to stay in orbit."
Upgrade trigger: computing v=√(GM/r) explicitly at two different radii
(finding the higher-orbit satellite moves at HALF the speed for a 4×
larger radius) directly confronts the faster-at-altitude assumption;
deriving the orbital condition GMm/r²=mv²/r and watching m cancel
directly confronts the mass-dependence assumption.

**Intermediate**: "Higher orbit means more total energy but SLOWER speed
(v∝1/√r); orbital speed depends only on the central body's mass and
radius, not the satellite's own mass." This model correctly captures both
core results, but sometimes still conflates "more energy" with "faster"
out of a general, unexamined association between the two.

**Advanced**: "Energy and speed are independent quantities in orbital
mechanics — always compute each separately from its own formula
(E=-GMm/2r for energy, v=√(GM/r) for speed) rather than assuming one
tracks the other."

**Expert**: the virial theorem's application to gravitational orbits
(⟨KE⟩=-½⟨PE⟩ for an inverse-square-law-bound system), explaining why
total energy and kinetic energy move in genuinely opposite directions
with orbital radius — a natural consolidation, not required for mastery.

## Why Students Fail

The dominant failure is conflating "more total energy" with "faster
speed," expecting a higher (higher-energy) orbit to also mean higher
speed, when orbital speed actually decreases with altitude; a second,
distinct failure is including the satellite's own mass in the orbital
speed formula, not recognizing the exact cancellation that makes orbital
speed mass-independent.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.orbital-mechanics.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-HIGHER-ORBIT-FASTER**: believing a satellite in a higher orbit
  moves faster because it has more energy, confusing total energy with
  speed. **Birth type**: overgeneralization (Type 1) — "more energy"
  generically suggests "faster" in many everyday contexts, incorrectly
  extended to orbital mechanics, where energy and speed move in OPPOSITE
  directions with altitude. Probe: "Satellite A orbits at Earth's
  surface radius; satellite B orbits at 4 times that radius. Which
  satellite moves faster?"
- **MC-ORBITAL-SPEED-DEPENDS-ON-MASS**: including the satellite mass m in
  the orbital speed formula, or claiming a heavier satellite needs more
  speed to stay in orbit. **Birth type**: overgeneralization (Type 1) —
  everyday intuition that heavier objects need "more effort" (often
  translated to more speed) to move or stay in motion is incorrectly
  extended to orbital speed, where mass cancels exactly. Probe: "A 1kg
  probe and a 10,000kg space station orbit at the same radius around
  Earth. Do they need different speeds to maintain their orbits?"

## Analogies

**Best**: Galileo's mass-independent free-fall result (all objects
accelerate at g regardless of mass) — orbital motion is continuous
free-fall that perpetually misses the central body, so mass cancels for
exactly the same reason it cancels in ordinary free-fall — directly
targets MC-ORBITAL-SPEED-DEPENDS-ON-MASS by connecting to an
already-familiar mass-independence precedent.

**Anti-analogy**: do NOT say "a higher orbit has more energy, so it's a
'bigger,' more energetic orbit" without specifying that SPEED actually
decreases — this vague phrasing directly invites
MC-HIGHER-ORBIT-FASTER.

## Demonstrations

Worked-example: compute v=√(GM/r) explicitly for two orbits at r and 4r,
showing the second satellite moves at exactly half the speed despite
higher total energy — directly targets MC-HIGHER-ORBIT-FASTER. Worked-example:
derive the orbital condition GMm/r²=mv²/r, showing m cancels from both
sides, for both a 1kg probe and a 10,000kg station at the same radius —
directly targets MC-ORBITAL-SPEED-DEPENDS-ON-MASS.

## Discovery Questions

Discovery-style: "if you gave a satellite MORE energy to boost it to a
higher orbit, would you expect it to end up moving FASTER once it settles
into its new, higher circular orbit?" — learner computes v at both radii,
directly confronting MC-HIGHER-ORBIT-FASTER.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-ORBITAL-SPEED-DEPENDS-ON-MASS is addressed first (establishing the
clean v=√(GM/r) formula via mass cancellation), before
MC-HIGHER-ORBIT-FASTER, since having the correct, mass-independent speed
formula in hand is the prerequisite for then correctly computing (and
being surprised by) how that speed changes with orbital radius.

## Tutor Actions

WORKED-EXAMPLE (v=√(GM/r) derived showing mass cancellation; v computed
at two different radii showing the counterintuitive decrease);
ANALOGY (Galileo's free-fall mass-independence connected explicitly to
orbital mass-independence).

## Voice Teaching Notes

Listen for "higher orbit, faster satellite" reasoning, or satellite mass
included in speed calculations — the two direct misconception tells.
Load-bearing sentence: "higher orbits have MORE energy but move SLOWER —
and mass cancels out of the speed formula completely, just like in
free-fall." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming a higher orbit means faster speed signals
MC-HIGHER-ORBIT-FASTER (MISCONCEIVING, full repair via the two-radius
speed computation). A learner including satellite mass in the speed
formula signals MC-ORBITAL-SPEED-DEPENDS-ON-MASS (full repair via the
mass-cancellation derivation). Mastery trigger: correctly computing
v=√(GM/r) showing decrease with altitude, AND correctly stating orbital
speed is mass-independent. Blueprint's assessment component cited for
the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the altitude for a second — in the orbital
force equation GMm/r²=mv²/r, does the satellite's own mass m actually
survive on both sides, or does it cancel?" (isolating the
mass-cancellation fact before discussing altitude dependence). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (energy-vs-speed independence; mass-independent orbital speed)
bound to procedure (v=√(GM/r) calculation). Interleave with
`phys.mech.gravitational-potential`, `phys.mech.circular-motion`, and,
once authored, `phys.mech.keplers-laws`/`phys.mech.satellites` (the
direct KG unlocks).

## Transfer Connections

Near: any circular-orbit speed or energy calculation, including
satellite altitude planning. Far: astronomy (planetary and stellar
orbital dynamics using the same v∝1/√r relationship) and space mission
design (choosing orbital altitude as a trade-off between speed, energy
cost, and mission requirements). Real-world: understanding why
geostationary satellites orbit much higher (and slower) than the ISS, yet
matching Earth's rotation period by design. Expert: the virial theorem's
explanation of the opposite energy/speed trends with orbital radius.

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

- 2026-07-23 (physics EB Wave 9): initial authoring.

# Gravitational Potential Energy — `phys.mech.gravitational-potential`

## Identity

- **Concept ID**: `phys.mech.gravitational-potential` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 8.
- **Prerequisites**: `phys.mech.gravitational-field`,
  `phys.mech.potential-energy` — the general (non-uniform-field) form of
  gravitational PE, U = -GMm/r, generalizes the already-secure U = mgh
  local approximation using the already-secure field concept.
- **Unlocks** (from KG): `phys.mech.escape-velocity`,
  `phys.mech.orbital-mechanics` — a genuine hub concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly explain that U = mgh is only a LOCAL
approximation valid near a planet's surface (h ≪ planetary radius), while
U = -GMm/r is the universal, exact formula valid at any distance, and
correctly identify when U = mgh breaks down (large distances from the
surface); (2) correctly explain why U = -GMm/r is NEGATIVE, with zero
defined at r = infinity — reflecting that gravity does positive work as
objects fall inward, so potential energy must decrease from zero as r
decreases, becoming increasingly negative.

## Core Understanding

Gravitational potential energy has two related but distinct formulas:
U = mgh, a LOCAL approximation valid only near a planet's surface (where
g is essentially constant, requiring height h to be much smaller than
the planetary radius), and U = -GMm/r, the UNIVERSAL, exact formula valid
at any distance from the source mass, built on a genuinely different
assumption (g varies with distance, following the inverse-square law,
rather than being treated as constant). Applying U = mgh at large
distances (comparable to or exceeding the planetary radius) produces
answers with the wrong magnitude and even the wrong SIGN compared to the
correct U = -GMm/r, since the two formulas rest on fundamentally
different assumptions about how g behaves with distance. The universal
formula's NEGATIVE sign is not arbitrary: with the reference point chosen
at r = infinity (where U = 0 by convention), gravity does positive work
on any mass falling INWARD (decreasing r), so potential energy must
decrease FROM zero as the mass approaches the source — becoming
increasingly negative the closer it gets, reflecting a gravitationally
BOUND state (energy would need to be added to return the object to
r = infinity, where U = 0).

## Mental Models

**Beginner**: "Gravitational PE is always U = mgh, everywhere; PE should
be positive, so the negative sign in U = -GMm/r must be a mistake."
Upgrade trigger: computing U with both formulas at a distance comparable
to the planet's radius, finding wildly different (even opposite-sign)
answers, directly confronts the universal-mgh assumption; discussing why
the reference point is chosen at infinity directly confronts the
expected-positive assumption.

**Intermediate**: "U = mgh is a local approximation (h ≪ R); U = -GMm/r
is universal, negative because zero is defined at infinity and gravity
pulls objects toward more negative energy as they approach." This model
correctly captures both distinctions, but sometimes still defaults to
U=mgh out of habit even in scenarios explicitly involving large
distances (satellites, escape velocity).

**Advanced**: "U=mgh is recoverable from U=-GMm/r as a first-order
approximation near the surface (adding a constant reference shift) —
the two formulas are compatible, differing only in reference level and
domain of validity, not fundamentally contradictory."

**Expert**: the gravitational potential well as a specific instance of a
central-force conservative potential, with orbital total energy
E = KE + U determining bound (E<0) vs. unbound (E≥0) trajectories — a
natural extension toward `phys.mech.escape-velocity` and
`phys.mech.orbital-mechanics`, not required for mastery.

## Why Students Fail

The dominant failure is applying U = mgh universally, without checking
whether the height/distance involved is actually small compared to the
planetary radius; a second, distinct failure is expecting gravitational
PE to be positive, treating the negative sign in U = -GMm/r as an error
rather than a consequence of the infinity reference point.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.gravitational-potential.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-MGHZERO**: applying U = mgh at large distances from a planet's
  surface, or confusing the two gravitational PE formulas. **Birth
  type**: overgeneralization (Type 1) — U = mgh is introduced first (the
  simpler, more familiar formula from everyday near-surface contexts) and
  incorrectly extended to distances where the constant-g assumption no
  longer holds. Probe: "A satellite orbits at a distance of twice Earth's
  radius from Earth's center. Can you use U = mgh to find its
  gravitational PE, or do you need a different formula?"
- **MC-POSITIVE-POTENTIAL**: expecting gravitational PE to be positive,
  confused by the negative sign in U = -GMm/r. **Birth type**: language
  contamination (Type 3) — "potential energy" in most everyday contexts
  (a raised weight, a compressed spring) is experienced as a positive
  quantity, and this expectation is carried over without registering that
  the SIGN depends entirely on the chosen reference point (here, zero at
  infinity). Probe: "Why is gravitational potential energy, U = -GMm/r,
  always negative for any finite distance r? Is this a sign error?"

## Analogies

**Best**: a well dug into the ground, with "ground level" (r=infinity)
defined as zero — any point below ground level (any finite r) is
NEGATIVE relative to that zero, and the deeper you go (smaller r), the
more negative — directly targets MC-POSITIVE-POTENTIAL by giving a
concrete image of a below-zero reference frame.

**Anti-analogy**: do NOT say "gravitational PE = mgh" as an unqualified,
universal statement — omitting the near-surface validity condition
directly invites MC-MGHZERO when applied to large-distance scenarios.

## Demonstrations

Physical/conceptual: compute U at r = 3×Earth's radius using both U=mgh
(with h measured from the surface) and U=-GMm/r, showing the two
formulas disagree dramatically (even in sign) — directly targets
MC-MGHZERO. Conceptual: trace an object falling from r=infinity (U=0)
toward Earth, showing U becomes progressively more negative as gravity
does positive work — directly targets MC-POSITIVE-POTENTIAL.

## Discovery Questions

Discovery-style: "if gravitational PE is zero at infinite distance, and
gravity pulls objects INWARD (doing positive work as they fall), what
must happen to PE as an object gets closer to Earth?" — learner reasons
through the well-digging logic, directly confronting
MC-POSITIVE-POTENTIAL.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-MGHZERO is
addressed first (establishing U=-GMm/r as the universal formula and
U=mgh as its near-surface approximation), before MC-POSITIVE-POTENTIAL,
since correctly adopting U=-GMm/r as the working formula is the
prerequisite for then confronting why that specific formula carries a
negative sign.

## Tutor Actions

WORKED-EXAMPLE (U computed via both formulas at a large distance,
showing dramatic disagreement); THOUGHT-EXPERIMENT (object falling from
infinity, tracing PE becoming more negative); ANALOGY (the potential
well with ground level at infinity).

## Voice Teaching Notes

Listen for U=mgh applied at large distances, or confusion/rejection of
the negative sign in U=-GMm/r — the two direct misconception tells.
Load-bearing sentence: "mgh only works close to the surface — far away,
you need the universal formula, and it's negative because zero is set at
infinity, not at the surface." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner applying U=mgh at a large distance signals MC-MGHZERO
(MISCONCEIVING, full repair via the dual-formula comparison). A learner
questioning or rejecting the negative sign in U=-GMm/r signals
MC-POSITIVE-POTENTIAL (full repair via the falling-from-infinity thought
experiment). Mastery trigger: correctly identifying which formula
applies based on distance scale, AND correctly explaining the negative
sign's origin in the infinity reference point. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — is the height/
distance in this problem small compared to the planet's radius, or
comparable to/larger than it?" (isolating the scale check before
choosing a formula). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (local approximation vs. universal formula; infinity reference
point) bound to procedure (U=-GMm/r calculation). Interleave with
`phys.mech.gravitational-field`, `phys.mech.potential-energy`, and, once
authored, `phys.mech.escape-velocity`/`phys.mech.orbital-mechanics` (the
direct KG unlocks).

## Transfer Connections

Near: any large-distance gravitational PE problem, including satellite
and planetary motion. Far: astrophysics (binding energy of stars and
galaxies using the same negative-potential-well framework) and spacecraft
trajectory design (escape velocity and orbital energy calculations).
Real-world: understanding why launching a satellite requires overcoming
a genuinely negative energy well, not simply "lifting" it as U=mgh would
suggest. Expert: the gravitational potential well as a central-force
conservative potential determining bound vs. unbound trajectories via
total energy E = KE + U.

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

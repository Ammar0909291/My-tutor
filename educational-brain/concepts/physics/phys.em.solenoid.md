# Magnetic Field of a Solenoid and Toroid — `phys.em.solenoid`

## Identity

- **Concept ID**: `phys.em.solenoid` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 7.
- **Prerequisites**: `phys.em.amperes-law` — the load-bearing part is the
  already-secure symmetry-driven Amperian-loop method, applied here to a
  solenoid's specific rectangular-loop geometry (already previewed as a
  worked example in the prerequisite concept).
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly state that an ideal (long, tightly-wound)
solenoid's magnetic field is B = μ₀nI (n = turns per unit length) INSIDE
the solenoid, uniform and parallel to the axis, and correctly explain
that this field depends on turn DENSITY (turns per length), not on the
solenoid's radius/cross-sectional area; (2) correctly explain that the
field OUTSIDE an ideal (infinitely long) solenoid is exactly zero, and
correctly explain WHY this is only exactly true in the idealized long-
solenoid limit, with real, finite solenoids having a small but nonzero
external field, especially near the ends; (3) correctly explain a
toroid's field pattern (confined entirely within the toroid's core, zero
both inside the central hole and outside the outer edge) using the same
Ampere's-law reasoning.

## Core Understanding

An ideal (infinitely long, tightly-wound) solenoid produces a magnetic
field B = μ₀nI inside its core, uniform in magnitude and direction
(parallel to the solenoid's axis) — this result, derived directly from
Ampere's law using a rectangular Amperian loop (one side inside the
solenoid, one side far outside), depends specifically on n, the number of
turns PER UNIT LENGTH (turn density), not on the solenoid's radius or
cross-sectional area at all — a thicker solenoid with the same turn
density and current produces the identical field strength as a thinner
one. In the idealized long-solenoid limit, the field OUTSIDE the solenoid
is EXACTLY zero (a direct consequence of the Amperian-loop derivation) —
this exact-zero result is a genuine idealization, holding precisely only
in the infinite-length limit; any REAL, finite-length solenoid has a
small but measurably nonzero external field, most noticeable near its
ends where the idealization (an effectively infinite, uniform winding) is
poorest. A toroid (a solenoid bent into a closed loop) confines its
magnetic field entirely within its own donut-shaped core — by the
identical Ampere's-law reasoning, the field is zero in the central hole
and zero outside the toroid's outer surface, since an Amperian loop drawn
in either region encloses zero net current.

## Mental Models

**Beginner**: "A wider/thicker solenoid produces a stronger field, since
it has more room for current." Upgrade trigger: comparing two solenoids
with identical turn density and current but different radii (identical
field, per B = μ₀nI, with no radius term at all) directly confronts this.

**Intermediate**: "B = μ₀nI inside, depends on turn density not radius;
zero outside, in the ideal long-solenoid limit." This model correctly
captures the core result, but sometimes treats the exactly-zero external
field as a universal, always-exactly-true fact rather than an
idealization specific to the infinite-length limit.

**Advanced**: "The exactly-zero external field is a mathematical
idealization of the infinite-length case — any real, finite solenoid has
a small but genuinely nonzero external field, especially near its ends,
where the winding's finite extent breaks the symmetry the ideal
derivation depends on."

**Expert**: solenoid field uniformity and the toroid's complete field
confinement as specific instances of exploiting translational/rotational
symmetry in Ampere's law — directly connecting back to the general
symmetry-selection reasoning already established for Ampere's law itself
— not required for mastery but a natural consolidation.

## Why Students Fail

The dominant failure is radius-dependence assumption, expecting a
thicker/wider solenoid to produce a stronger field (by loose analogy to
"more room, more effect"), when in fact B = μ₀nI has no radius term at
all; a second, distinct failure treats the idealized zero-external-field
result as an absolute, unconditional truth rather than an approximation
specific to the (unrealizable) infinite-length limit.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.solenoid.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS**: belief a solenoid's internal
  field strength depends on its radius/cross-sectional area, with a
  thicker solenoid producing a stronger field. **Birth type**:
  overgeneralization (Type 1) — "more physical size/room" is loosely
  associated with "more effect" in many other contexts, incorrectly
  extended here, where B = μ₀nI contains no radius term at all. Probe:
  "Two solenoids have the identical turn density (turns per meter) and
  carry the identical current, but one has twice the radius of the other.
  Do they produce the same internal field strength, or does the wider one
  produce a stronger field?"
- **MC-SOLENOID-FIELD-IS-ZERO-OUTSIDE-EXACTLY**: treating the
  zero-external-field result as an exact, unconditional truth for any
  real solenoid, rather than an idealization specific to the infinite-length
  limit. **Birth type**: overgeneralization (Type 1) — the clean,
  memorable "exactly zero outside" result from the idealized derivation is
  overextended to all real, finite solenoids without registering the
  idealization's specific length-dependent validity condition. Probe: "Is
  the magnetic field OUTSIDE a real, finite-length solenoid EXACTLY zero
  everywhere, or just very small, especially away from the ends?"

## Analogies

**Best**: a tightly-packed line of people all shouting the same word at
the same rate — the "loudness" (analogous to B = μ�0nI) depends on how
closely packed the people are (turn density) and how loud each shouts
(current), not on how WIDE the line of people is (radius) — directly
targets MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS by isolating density as the
determining factor, independent of overall size.

**Anti-analogy**: do NOT say "the field is always exactly zero outside a
solenoid" without the infinite-length qualifier — directly installs
MC-SOLENOID-FIELD-IS-ZERO-OUTSIDE-EXACTLY as an unconditional rule rather
than a specific idealization's consequence.

## Demonstrations

Physical/conceptual: compare the B = μ₀nI formula for two hypothetical
solenoids of different radius but identical n and I, computing identical
field values — directly targets MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS via
direct calculation contrast. Conceptual: examine real magnetic field
maps/simulations of a genuinely finite-length solenoid, showing small but
nonzero external field lines especially near the ends — directly targets
MC-SOLENOID-FIELD-IS-ZERO-OUTSIDE-EXACTLY.

## Discovery Questions

Discovery-style: "does making a solenoid wider (bigger radius), while
keeping the same turn density and current, make its internal field
stronger?" — learner predicts (often incorrectly, expecting yes), then the
B = μ₀nI calculation (no radius term) resolves it, directly confronting
MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS.

## Teaching Sequence

Blueprint's visualisation-specification and assessment components cited
by reference. MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS is addressed first
(establishing B = μ₀nI's actual variable dependence), before
MC-SOLENOID-FIELD-IS-ZERO-OUTSIDE-EXACTLY, since correctly understanding
the DERIVATION (an idealized, infinite-length Amperian-loop argument)
naturally motivates asking "and what happens when the solenoid ISN'T
infinite?" as the next, immediate question.

## Tutor Actions

WORKED-EXAMPLE (B = μ₀nI computed for varying radius, showing no change);
DEMONSTRATION (finite-solenoid field-line simulation showing small
external leakage); THOUGHT-EXPERIMENT (why the ideal derivation
specifically requires infinite length).

## Voice Teaching Notes

Listen for "wider solenoid, stronger field" reasoning — the direct
MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS tell. Load-bearing sentence: "the
field depends on how DENSELY packed the turns are, not how wide the
solenoid is." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner predicting a stronger field for a wider-radius solenoid (same n,
I) signals MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS (MISCONCEIVING, full repair
via direct calculation). Mastery trigger: correctly computing B = μ₀nI
independent of radius, AND correctly stating the zero-external-field
result is an idealization specific to the infinite-length limit, with real
solenoids having small nonzero external fields. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the radius for a second — how closely packed
are the turns, and how much current flows through each?" (isolating n and
I as the actual determining variables). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (turn-density dependence; idealization vs. real finite solenoid)
bound to procedure (B = μ₀nI application). Interleave with
`phys.em.amperes-law` (the derivation method) and, once authored,
`phys.em.mutual-inductance` (sibling concept at this same dependency
level, often analyzed using solenoid geometry).

## Transfer Connections

Near: any solenoid or toroid field-calculation problem, including
electromagnet design. Far: MRI machine and particle accelerator magnet
engineering (both rely on precisely wound solenoid/toroid coils for
predictable, uniform fields) and inductor manufacturing (solenoid
geometry directly determines inductance). Real-world: understanding why
electromagnets are wound as tightly-packed coils rather than sparse,
single loops, to maximize turn density n. Expert: solenoid/toroid field
confinement as specific instances of symmetry-exploitation in Ampere's
law.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
visualisation-specification/assessment components by reference. Not
restated: Concept Identity, Concept Explanation Blocks, Worked Examples,
Retrieval & Spacing Schedule, Session Flow Script, Adaptive Branching,
Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.

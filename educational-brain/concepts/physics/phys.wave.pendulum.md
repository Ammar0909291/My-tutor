# Simple Pendulum — `phys.wave.pendulum`

## Identity

- **Concept ID**: `phys.wave.pendulum` (canonical physics KG)
- **Curriculum location**: physics / waves — dependency level 8.
- **Prerequisites**: `phys.wave.shm` — the simple pendulum is a specific
  physical realization of already-secure SHM, with restoring force
  provided by gravity's tangential component rather than a spring.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 3

## Learning Objective

The learner can: (1) state T = 2π√(L/g) and correctly explain WHY mass
does not appear in the formula — because both the restoring force
(∝ mass) and inertia (∝ mass) contain mass identically, so it cancels
exactly in Newton's second law, a genuine instance of the equivalence of
inertial and gravitational mass; (2) correctly explain that the period is
independent of amplitude ONLY for small oscillations (θ₀ ≲ 15°, where
sinθ≈θ holds to good accuracy) — not universally, and correctly identify
that large-amplitude swings do show a period increase.

## Core Understanding

A simple pendulum's period, T = 2π√(L/g), contains no mass term at
all — a genuinely non-obvious result, since both the restoring force
(F = -mg sinθ ≈ -mgθ for small angles) and the inertial response
(Newton's second law, ma) scale with mass identically, so mass cancels
completely when solving for angular frequency (ω = √(g/L)): a heavier
bob experiences a proportionally larger restoring force AND a
proportionally larger inertia, and these two effects exactly balance —
directly demonstrating the equivalence of inertial and gravitational mass
(the same physical fact Galileo's Leaning Tower experiment illustrated).
The period is also independent of AMPLITUDE — but this "isochronous"
property (constant period regardless of swing size) holds only for SMALL
oscillations (θ₀ ≲ 15°, where the small-angle approximation sinθ≈θ is
accurate to within about 1%); this is why pendulum clocks work reliably
even as their swing amplitude naturally decreases slightly over time
between windings. For LARGE amplitudes (θ₀ > 15°), the small-angle
approximation breaks down and the period genuinely DOES increase with
amplitude — the isochronous property is a small-angle regime result, not
a universal law of pendulum motion.

## Mental Models

**Beginner**: "A heavier pendulum bob swings more slowly (or faster);
a pendulum pulled back farther takes longer to complete a swing." Upgrade
trigger: comparing two different-mass bobs on identical-length strings,
finding identical periods (mass cancels in the derivation), directly
confronts the mass-dependence assumption; comparing a small-amplitude and
still-small-but-larger-amplitude swing (both under 15°), finding
identical periods, directly confronts the amplitude-dependence
assumption.

**Intermediate**: "T = 2π√(L/g), no mass dependence (mass cancels via
equivalence of inertial/gravitational mass); period is amplitude-
independent for SMALL oscillations only." This model correctly captures
both core results, but sometimes forgets the small-angle qualifier,
expecting isochronism to hold at any amplitude.

**Advanced**: "The small-angle approximation (sinθ≈θ) is the specific
condition enabling both the T=2π√(L/g) formula and its
amplitude-independence — for large swings (θ₀>15°), the true restoring
force deviates from -mgθ, and period genuinely increases with
amplitude by a calculable correction."

**Expert**: the pendulum as an experimental demonstration of the
equivalence principle (inertial mass = gravitational mass), directly
connecting to general relativity's foundational assumption — not
required for mastery, a natural conceptual extension.

## Why Students Fail

The dominant failure is expecting a heavier bob to swing faster or
slower, not registering that the same mass factor appears in both the
restoring force and the inertial response and hence cancels; a second,
distinct failure is expecting the isochronous (amplitude-independent)
property to hold universally, rather than recognizing it as a
small-angle-approximation result that breaks down for large swings.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.wave.pendulum.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-PENDULUM-PERIOD-DEPENDS-ON-MASS**: believing a heavier pendulum
  bob swings more slowly (or faster) than a lighter one. **Birth type**:
  overgeneralization (Type 1) — heavier objects are commonly associated
  with "slower" or "more sluggish" motion in many everyday contexts
  (pushing a heavy cart), incorrectly extended to pendulum motion, where
  the mass-dependence in force and inertia cancel exactly. Probe: "A gold
  bob and a ping-pong ball are hung on identical-length strings and
  released from the same angle simultaneously. Do they swing in
  synchrony, or does one swing faster?"
- **MC-PENDULUM-AMPLITUDE-CHANGES-PERIOD**: believing a pendulum pulled
  back farther (larger amplitude) takes longer to complete each swing, at
  any amplitude. **Birth type**: overgeneralization (Type 1) — "farther
  to travel" intuitively suggests "takes longer," a reasonable guess that
  is correct only for LARGE amplitudes (where the small-angle
  approximation fails) and incorrectly extended to the small-amplitude
  regime where period genuinely is amplitude-independent. Probe: "A
  pendulum clock's swing amplitude gradually decreases as its mainspring
  slowly unwinds. Does the clock's timekeeping accuracy suffer as a
  result?"

## Analogies

**Best**: Galileo's (apocryphal but illustrative) Leaning Tower of Pisa
demonstration — a heavy and a light ball dropped simultaneously hit the
ground together, since gravitational acceleration doesn't depend on
mass — directly targets MC-PENDULUM-PERIOD-DEPENDS-ON-MASS by giving a
historically resonant, concrete precedent for mass-independence in
gravity-driven motion.

**Anti-analogy**: do NOT say "a bigger swing takes longer" as an
unqualified rule — true only for LARGE amplitudes, directly inviting
MC-PENDULUM-AMPLITUDE-CHANGES-PERIOD when applied to the small-amplitude
regime where pendulum clocks actually operate.

## Demonstrations

Physical: swing a gold-weight bob and a ping-pong-ball bob on
identical-length strings simultaneously, showing perfect synchrony —
directly targets MC-PENDULUM-PERIOD-DEPENDS-ON-MASS. Conceptual: compare
period at θ₀=5° and θ₀=10° (both small, showing negligible difference)
versus θ₀=60° (showing a measurable increase) — directly targets
MC-PENDULUM-AMPLITUDE-CHANGES-PERIOD by isolating where the
approximation actually breaks down.

## Discovery Questions

Discovery-style: "if you hang a bowling ball and a tennis ball on
identical-length strings and release them from the same angle together,
will one lag behind the other?" — learner predicts, then the
synchronized-swing demonstration resolves it, directly confronting
MC-PENDULUM-PERIOD-DEPENDS-ON-MASS.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-PENDULUM-PERIOD-DEPENDS-ON-MASS is addressed first (establishing mass
cancellation via the T=2π√(L/g) derivation), before
MC-PENDULUM-AMPLITUDE-CHANGES-PERIOD, since trusting the clean,
mass-independent formula is the prerequisite for then correctly scoping
its OTHER key property (amplitude-independence) to the small-angle regime
specifically.

## Tutor Actions

WORKED-EXAMPLE (T=2π√(L/g) derivation showing mass cancellation);
DEMONSTRATION (synchronized swing of different-mass bobs;
small-vs-large-amplitude period comparison); THOUGHT-EXPERIMENT (why
pendulum clocks stay accurate as swing amplitude naturally decreases).

## Voice Teaching Notes

Listen for "heavier bob swings slower/faster" or "bigger swing always
takes longer" — the two direct misconception tells. Load-bearing
sentence: "mass cancels out completely — a heavier bob has more force
pulling it back AND more inertia resisting, and those exactly balance;
and the swing size doesn't matter either, as long as it's a small swing."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner predicting different periods for different-mass bobs signals
MC-PENDULUM-PERIOD-DEPENDS-ON-MASS (MISCONCEIVING, full repair via the
synchronized-swing demonstration). A learner expecting period to change
with amplitude at any swing size signals
MC-PENDULUM-AMPLITUDE-CHANGES-PERIOD (full repair via the
small-vs-large-amplitude comparison). Mastery trigger: correctly stating
T=2π√(L/g) has no mass dependence, AND correctly scoping
amplitude-independence to the small-angle regime. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the period formula for a second — does a
heavier bob feel a BIGGER restoring force pulling it back? Does it also
have MORE inertia resisting that pull?" (isolating the two competing
mass-dependent effects before showing they cancel). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (mass cancellation; small-angle-scoped isochronism) bound to
procedure (T=2π√(L/g) calculation). Interleave with `phys.wave.shm` and
`phys.wave.spring-mass` (sibling concept at this same dependency level,
a direct contrast case where the constant IS mass/spring-constant
dependent).

## Transfer Connections

Near: any simple-pendulum period calculation, including grandfather
clocks. Far: geophysics (pendulum-based measurement of local
gravitational acceleration g, exploiting the exact T=2π√(L/g)
relationship) and seismometer design (pendulum principles applied to
detecting ground motion). Real-world: understanding why old pendulum
clocks needed careful length adjustment (not weight adjustment) to keep
accurate time. Expert: the pendulum as an experimental demonstration of
the equivalence principle.

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

- 2026-07-23 (physics EB Wave 8): initial authoring.

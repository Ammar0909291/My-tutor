# Simple Harmonic Motion — `phys.wave.shm`

## Identity

- **Concept ID**: `phys.wave.shm` (canonical physics KG)
- **Curriculum location**: physics / waves — dependency level 7.
- **Prerequisites**: `phys.mech.hookes-law` (the load-bearing part: SHM
  is precisely what happens when a Hooke's-law restoring force is
  combined with F = ma) and `phys.mech.newtons-second-law` (the F = ma
  framework SHM's differential equation is derived from).
- **Unlocks** (from KG): `phys.wave.pendulum`, `phys.wave.shm-energy`,
  `phys.wave.spring-mass` — a genuine hub concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that simple harmonic motion arises
whenever a restoring force is directly proportional to displacement
(F = −kx, Hooke's law) combined with F = ma, and correctly identify SHM
in novel physical systems by checking for this proportionality;
(2) correctly explain that the PERIOD of SHM is independent of amplitude
— a mass-spring system oscillates at the same frequency whether displaced
a little or a lot — and correctly distinguish this from the (false)
expectation that a larger swing takes longer; (3) correctly explain the
phase relationship between displacement, velocity, and acceleration in
SHM (maximum displacement ↔ zero velocity, maximum acceleration; zero
displacement ↔ maximum velocity, zero acceleration) using the fact that
velocity is NOT constant throughout the motion.

## Core Understanding

Simple harmonic motion occurs whenever an object experiences a restoring
force directly proportional to its displacement from equilibrium
(F = −kx), which, combined with Newton's second law, produces a specific,
predictable oscillatory motion described by x(t) = A cos(ωt + φ), where
ω = √(k/m) is the angular frequency. A defining, often counter-intuitive
feature of SHM is that its PERIOD (and frequency) is entirely independent
of amplitude — a mass on a spring pulled back a little or a lot takes the
EXACT SAME time to complete one full oscillation, because a larger
displacement means both a larger restoring force (faster acceleration) AND
a longer distance to travel, and these two effects exactly cancel for a
linear (Hooke's-law) restoring force specifically. Throughout the motion,
velocity is continuously changing (NOT constant) — maximum at the
equilibrium position (where displacement, and therefore restoring force
and acceleration, are zero) and zero at the extremes of motion (where
displacement and restoring force, and therefore acceleration, are
maximum) — this displacement/velocity/acceleration phase relationship is
the key to correctly reasoning about SHM at any specific moment, not just
its endpoints.

## Mental Models

**Beginner**: "A bigger swing/oscillation takes longer to complete."
Upgrade trigger: timing a mass-spring system's oscillation period at two
very different (small vs. large) amplitudes, finding IDENTICAL periods,
directly confronts the bigger-takes-longer assumption.

**Intermediate**: "SHM's period is independent of amplitude — the
restoring force scales with displacement, so larger swings have
proportionally larger force AND longer distance, cancelling exactly."
This model correctly captures amplitude-independence, but sometimes still
assumes constant velocity throughout the motion (analogous to uniform
circular motion misconceptions).

**Advanced**: "Velocity is maximum at equilibrium (zero restoring force,
zero acceleration at that instant, but maximum speed from having
accelerated the whole approach) and zero at the extremes (maximum
restoring force, about to reverse direction) — displacement, velocity, and
acceleration are all continuously varying and precisely out of phase with
each other throughout the motion."

**Expert**: SHM as the projection of uniform circular motion onto one
axis, and its direct mathematical connection to any system whose potential
energy is well-approximated by a parabola near a stable equilibrium (the
quantum harmonic oscillator's classical analog) — not required for
mastery.

## Why Students Fail

The dominant failure is the bigger-swing-takes-longer intuition (an
everyday pendulum-watching heuristic that happens to be exactly true for
PENDULUMS at small angle for a different reason — same period regardless
of amplitude — but is often reasoned about incorrectly as "smaller
swings must be faster" rather than "period doesn't depend on amplitude at
all"); a second, distinct failure assumes constant speed throughout the
oscillation.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.wave.shm.md`, Misconception
Engine) documents two; reused by reference with birth-type added.

- **MC-SHM-CONSTANT-VELOCITY**: belief an object in SHM moves at constant
  speed throughout its oscillation. **Birth type**: overgeneralization
  (Type 1) — uniform circular motion (already studied, with constant
  SPEED though changing direction) is incorrectly extended to SHM, which
  has genuinely varying speed. Probe: "A mass oscillates on a spring. Is
  its speed the same at the equilibrium position as it is near the
  extreme of its swing?"
- **MC-PERIOD-DEPENDS-ON-AMPLITUDE**: belief SHM's period changes with
  amplitude (larger swings take longer, or shorter). **Birth type**:
  overgeneralization (Type 1) — many everyday oscillation-like phenomena
  (a person walking faster covers more ground per step) create an
  intuitive expectation that "bigger" implies "different timing," which
  does not hold for the specific linear (Hooke's-law) restoring force
  case. Probe: "A mass-spring system is pulled back 2 cm and released,
  completing one oscillation in 1 second. If instead pulled back 4 cm and
  released, does it take longer, shorter, or the same 1 second to
  complete one oscillation?"

## Analogies

**Best**: a car braking and accelerating — fastest in the middle of a
open stretch, momentarily stopped at a red light before reversing
direction (analogous to SHM's equilibrium-max-speed, extreme-zero-speed
pattern) — directly targets MC-SHM-CONSTANT-VELOCITY by anchoring varying
speed in a familiar experience.

**Alternative**: a bigger pendulum swing has farther to travel but also a
proportionally stronger restoring pull at each point, so the two effects
cancel and the timing stays the same — directly targets
MC-PERIOD-DEPENDS-ON-AMPLITUDE.

**Anti-analogy**: do NOT describe SHM as moving "back and forth at a
steady pace" — directly installs MC-SHM-CONSTANT-VELOCITY by suggesting
uniform speed throughout.

## Demonstrations

Physical: time a mass-spring (or pendulum) system's oscillation period at
two clearly different amplitudes side by side, showing identical timing —
directly, numerically targets MC-PERIOD-DEPENDS-ON-AMPLITUDE. Track a
mass's visible speed at the equilibrium point vs. near an extreme (slow
motion video, or a simple visual/marked-position timing exercise) — targets
MC-SHM-CONSTANT-VELOCITY.

## Discovery Questions

Discovery-style: "does pulling a spring back further make it oscillate
slower, because it has farther to travel?" — learner predicts, then the
same-period-different-amplitude demonstration resolves it, directly
confronting MC-PERIOD-DEPENDS-ON-AMPLITUDE with a genuinely surprising
result.

## Teaching Sequence

Blueprint's session-flow component cited by reference.
MC-SHM-CONSTANT-VELOCITY repaired first (establishing the varying-speed,
phase-relationship intuition), before MC-PERIOD-DEPENDS-ON-AMPLITUDE,
since understanding that restoring force AND distance both scale with
displacement (already partly visible once velocity's variation is
understood) sets up the "these two effects cancel" argument for
amplitude-independence more naturally.

## Tutor Actions

DEMONSTRATION (same-period-different-amplitude timing; speed-at-different-points
observation); WORKED-EXAMPLE (x(t), v(t), a(t) computed at several
specific phase points); ERROR-ANALYSIS (a solution assuming larger
amplitude means longer period).

## Voice Teaching Notes

Listen for "it should take longer" reasoning applied to a larger-amplitude
SHM scenario — the MC-PERIOD-DEPENDS-ON-AMPLITUDE tell. Load-bearing
sentence: "period doesn't depend on amplitude at all — a bigger swing has
both farther to go AND a stronger pull, and those cancel exactly."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner predicting a longer period for a larger-amplitude oscillation
signals MC-PERIOD-DEPENDS-ON-AMPLITUDE (MISCONCEIVING, full repair via the
timing demonstration). Mastery trigger: correctly predicting identical
periods across different amplitudes AND correctly identifying the
displacement/velocity/acceleration phase relationship at specific points
in the motion. Blueprint's assessment component cited for the full item
bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the whole oscillation for a second — right at
the very middle (equilibrium), is the mass moving fast or slow?" (isolating
one phase point before reintroducing the full cycle). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (amplitude-independence; phase relationships) bound to procedure
(x(t)/v(t)/a(t) computation). Interleave with `phys.mech.hookes-law` and
`phys.mech.newtons-second-law`, and, once authored, `phys.wave.pendulum`,
`phys.wave.shm-energy`, `phys.wave.spring-mass`.

## Transfer Connections

Near: any oscillating-system problem, including pendulums (small-angle
approximation) and vibrating molecular bonds. Far: clock and timekeeping
mechanism design (historically, pendulum clocks exploited exact
amplitude-independence for accurate timekeeping) and seismology
(earthquake-resistant building design tunes structural oscillation
periods). Real-world: why a playground swing's timing doesn't noticeably
change whether pushed gently or vigorously (within the small-angle
approximation). Expert: SHM as the classical analog of the quantum
harmonic oscillator, and its connection to any parabolic potential energy
well.

## Cross-Subject Connections

KG `cross_links` empty. A genuine connection exists to mathematics
(trigonometric functions and differential equations, the exact mathematical
machinery describing x(t) = A cos(ωt + φ)) not currently captured as a
cross_link — recorded as Curriculum Feedback.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
session-flow/assessment components by reference. Not restated: Concept
Identity, Narrative Spine, Worked Examples, Socratic Thread,
Differentiation Variants, Retrieval Schedule, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

KG `cross_links` empty despite a genuine connection to mathematics'
trigonometric-function and differential-equation content. Flagged for the
Curriculum Production Pipeline's backlog, not fixed here.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.

# Spring-Mass System — `phys.wave.spring-mass`

## Identity

- **Concept ID**: `phys.wave.spring-mass` (canonical physics KG)
- **Curriculum location**: physics / waves — dependency level 8.
- **Prerequisites**: `phys.wave.shm` — the spring-mass system is the
  canonical physical realization of already-secure SHM, with the spring's
  restoring force F=-kx directly producing the SHM equation of motion.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 3

## Learning Objective

The learner can: (1) state T = 2π√(m/k) and correctly explain that a
VERTICAL spring-mass system has the IDENTICAL period as a horizontal one
— gravity shifts the equilibrium position (by δ=mg/k) but does not enter
the period formula at all, since the net restoring force about the new
(shifted) equilibrium is still simply -ky, exactly as in the horizontal
case; (2) correctly distinguish the STATIC equilibrium stretch
(δ=mg/k, already "invested" energy from hanging the mass) from the
DYNAMIC oscillation amplitude (A, measured from equilibrium) — oscillation
energy is ½kA², using only the amplitude from equilibrium, never
combining it with the static stretch.

## Core Understanding

A vertical spring-mass system's period, T = 2π√(m/k), is EXACTLY the
same as a horizontal spring-mass system's — a genuinely non-obvious
result, since gravity clearly plays a role in setting up the vertical
system (stretching the spring by δ=mg/k at equilibrium) but, once the
system oscillates ABOUT that shifted equilibrium, the net restoring force
is still purely -ky (y measured from the new equilibrium): gravity (mg)
and the spring's extra stretch-force at equilibrium (kδ=mg) cancel
exactly, leaving only the same -ky restoring force structure as the
horizontal case, so ω=√(k/m) and T are unaffected by gravity entirely —
gravity shifts WHERE the system oscillates, not HOW FAST. A second,
independent subtlety: the spring's STATIC equilibrium stretch (δ=mg/k,
representing potential energy ½kδ² already stored when the mass was
first hung) is entirely separate from the DYNAMIC oscillation amplitude
A (the additional displacement from equilibrium when the mass is pulled
and released) — oscillation energy is ½kA² using ONLY this
amplitude-from-equilibrium, never adding the static stretch energy to it,
since the two represent genuinely different physical processes (initial
setup vs. ongoing oscillation).

## Mental Models

**Beginner**: "A vertical spring-mass oscillates differently from a
horizontal one because gravity changes things; the spring being
stretched further (due to hanging) gives the mass extra kinetic energy
during oscillation." Upgrade trigger: deriving the vertical case's
equation of motion explicitly (showing mg and kδ cancel, leaving -ky)
directly confronts the different-period assumption; carefully separating
static stretch energy from oscillation energy directly confronts the
extra-KE assumption.

**Intermediate**: "T=2π√(m/k) for both vertical and horizontal cases —
gravity only shifts equilibrium, not period; oscillation energy is
½kA² using amplitude from equilibrium, separate from the static stretch
energy ½kδ²." This model correctly captures both distinctions, but
sometimes still measures displacement from the spring's NATURAL
(unstretched) length rather than from the true equilibrium position,
producing confused energy calculations.

**Advanced**: "Always measure displacement from the equilibrium position
(not the natural length) for both period and oscillation-energy
calculations — the static stretch δ=mg/k is a separate, already-settled
quantity that doesn't participate in the oscillation dynamics at all."

**Expert**: the exact cancellation of mg and kδ at equilibrium as a
specific instance of linearizing a system about a stable equilibrium
point — a technique generalizing to any oscillator with a constant
"offset" force, not required for mastery.

## Why Students Fail

The dominant failure is expecting gravity to enter the vertical
spring-mass period formula (since gravity is visibly involved in setting
up the system), rather than recognizing it only shifts the equilibrium
position; a second, distinct failure is conflating the static equilibrium
stretch's stored energy with the oscillation's kinetic/potential energy
budget, incorrectly combining the two.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.wave.spring-mass.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-VERTICAL-SPRING-DIFFERENT-PERIOD**: believing a vertical
  spring-mass oscillates differently from a horizontal one because
  gravity changes the equilibrium, including g in the period formula.
  **Birth type**: overgeneralization (Type 1) — gravity's visible role in
  stretching the spring at setup is incorrectly extended to the ONGOING
  oscillation dynamics, where the net restoring force is unaffected by
  gravity once measured from the shifted equilibrium. Probe: "Does a
  mass on a vertical spring oscillate with the same period as an
  identical mass on an identical horizontal spring, or a different one?"
- **MC-STRETCHING-SPRING-ADDS-KE**: believing the spring's static
  stretch (from hanging the mass) gives the mass extra kinetic energy
  during oscillation, because it's stretched further than the natural
  length. **Birth type**: instruction-induced (Type 5) — measuring
  displacement from the spring's NATURAL length (rather than the true
  equilibrium) conflates the static stretch's stored energy with the
  oscillation's own energy budget. Probe: "A mass hangs at rest on a
  vertical spring, stretching it by δ=mg/k from its natural length. If
  you then pull the mass down an additional distance A and release it,
  what determines the oscillation's total mechanical energy — A alone,
  or A combined with δ?"

## Analogies

**Best**: a ball resting in a valley that has been tilted (gravity) —
the ball still oscillates back and forth within the valley exactly as it
would in a level (untilted) valley of the same shape, just centered at a
different point — directly targets MC-VERTICAL-SPRING-DIFFERENT-PERIOD
by giving a concrete image of "shifted center, same dynamics."

**Anti-analogy**: do NOT say "the spring is stretched more, so it has
more energy to give" as an unqualified statement about oscillation
energy — this conflates static stretch energy with oscillation energy,
directly inviting MC-STRETCHING-SPRING-ADDS-KE.

## Demonstrations

Physical/conceptual: derive the vertical spring-mass equation of motion
explicitly, showing mg and kδ cancel algebraically, leaving the same -ky
restoring force as the horizontal case — directly targets
MC-VERTICAL-SPRING-DIFFERENT-PERIOD. Worked-example: compute static
stretch energy (½kδ²) and oscillation energy (½kA²) separately for a
specific vertical spring-mass setup, showing they do NOT combine —
directly targets MC-STRETCHING-SPRING-ADDS-KE.

## Discovery Questions

Discovery-style: "if you replace a horizontal spring-mass system with an
identical vertical one, does the oscillation speed up, slow down, or stay
exactly the same?" — learner reasons through the equilibrium-shift
derivation, directly confronting MC-VERTICAL-SPRING-DIFFERENT-PERIOD.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-VERTICAL-SPRING-DIFFERENT-PERIOD is addressed first (establishing the
equilibrium-shift-only effect of gravity), before
MC-STRETCHING-SPRING-ADDS-KE, since correctly identifying the TRUE
equilibrium position (accounting for gravity's shift) is the prerequisite
for then correctly measuring oscillation amplitude FROM that equilibrium,
separate from the static stretch.

## Tutor Actions

WORKED-EXAMPLE (vertical spring-mass equation-of-motion derivation
showing mg/kδ cancellation; static vs. oscillation energy computed
separately); COMPARE-CONTRAST (horizontal vs. vertical spring-mass,
identical period).

## Voice Teaching Notes

Listen for gravity/g appearing in a vertical spring-mass period
calculation, or static stretch energy being added to oscillation energy —
the two direct misconception tells. Load-bearing sentence: "gravity just
moves WHERE the mass rests, not how fast it bounces — and always measure
the swing size from THAT resting point, not from the spring's original
length." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner including g in a vertical spring-mass period formula signals
MC-VERTICAL-SPRING-DIFFERENT-PERIOD (MISCONCEIVING, full repair via the
equation-of-motion derivation). A learner combining static stretch energy
with oscillation energy signals MC-STRETCHING-SPRING-ADDS-KE (full repair
via the separated-energy worked example). Mastery trigger: correctly
stating T=2π√(m/k) is unaffected by orientation, AND correctly computing
oscillation energy using only the amplitude from equilibrium. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the period for a second — once the mass is
hanging at rest (its NEW equilibrium), does gravity still need to be
part of the force equation, or has it already been accounted for?"
(isolating the cancellation before discussing period). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (equilibrium-shift-only effect of gravity; static vs. dynamic
energy) bound to procedure (T=2π√(m/k), oscillation-energy calculation
from equilibrium). Interleave with `phys.wave.shm` and
`phys.wave.pendulum` (sibling concept at this same dependency level, a
direct contrast case where mass genuinely doesn't affect period at all).

## Transfer Connections

Near: any vertical or horizontal spring-mass period/energy problem. Far:
mechanical suspension design (vehicle suspension springs analyzed with
the same equilibrium-shift reasoning) and vibration isolation engineering
(spring-mass systems damping unwanted oscillations). Real-world:
understanding why a bathroom scale (a spring system) reads the same
"stiffness" response regardless of whether it's used flat on the floor or
tilted. Expert: the mg/kδ cancellation as an instance of linearizing an
oscillator about a shifted stable equilibrium.

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

# Damped Oscillations — `phys.wave.damped-oscillations`

## Identity

- **Concept ID**: `phys.wave.damped-oscillations` (canonical physics KG)
- **Curriculum location**: physics / waves — dependency level 9.
- **Prerequisites**: `phys.wave.shm-energy` — damped oscillations extend
  the already-secure ideal-SHM energy framework by adding a genuine,
  ongoing energy-loss mechanism (resistance/friction), applied on top of
  the SHM baseline.
- **Unlocks** (from KG): `phys.wave.forced-oscillations` — a genuine hub
  concept.
- **Difficulty**: advanced · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly state that light damping shifts the
oscillation frequency only NEGLIGIBLY (ω_d=√(ω₀²-γ²)≈ω₀ when γ≪ω₀) — NOT
a significant slowdown, despite damping clearly reducing AMPLITUDE over
time; correctly identify that frequency shift only becomes appreciable
for HEAVY damping approaching the critical value; (2) correctly compute
that energy decays as the SQUARE of amplitude (E=½kA²) — if amplitude
halves, energy drops to ONE-QUARTER, not one-half, since energy depends
on A².

## Core Understanding

Damping (energy loss from friction, air resistance, or another
dissipative mechanism) causes a genuinely SMALL shift in oscillation
frequency for LIGHTLY damped systems — the damped frequency,
ω_d=√(ω₀²-γ²) (γ=damping parameter, ω₀=undamped natural frequency), is
only meaningfully different from ω₀ when γ approaches ω₀ (heavy
damping, near the critical-damping threshold); for typical, lightly
damped systems (γ≪ω₀, the regime in which we actually OBSERVE
oscillation, since heavily damped systems barely oscillate at all), the
frequency shift is genuinely negligible (often well under 1% for
realistic damping values) — damping's DOMINANT, clearly visible effect
is on AMPLITUDE (which decays exponentially), not frequency. A second,
independent and easily-miscalculated subtlety: because oscillation energy
scales as the SQUARE of amplitude (E=½kA²), a decrease in amplitude does
NOT translate linearly to energy — if amplitude decreases to HALF its
original value, energy decreases to (1/2)²=1/4 of its original value, not
1/2; this quadratic relationship means energy decays TWICE as fast
(in a relative sense) as amplitude does.

## Mental Models

**Beginner**: "Damping slows the oscillation down — it noticeably reduces
the frequency; if amplitude halves, energy also halves." Upgrade
trigger: computing ω_d for a specific lightly-damped system, finding it
essentially identical to ω₀ (e.g. 15.78 vs. 15.81 rad/s, a 0.2%
difference, unmeasurable in an ordinary lab setting) directly confronts
the frequency-slowdown assumption; computing E=½k(A₀/2)² explicitly,
finding it equals E₀/4 (not E₀/2), directly confronts the linear-energy-
decay assumption.

**Intermediate**: "Damping barely shifts frequency for light damping
(ω_d≈ω₀); energy decays as A², so halved amplitude means quartered
energy, not halved." This model correctly captures both core results,
but sometimes still conflates the two decay rates (amplitude vs. energy)
loosely when reasoning quickly.

**Advanced**: "Always distinguish AMPLITUDE decay (exponential in time,
directly observable) from ENERGY decay (proportional to amplitude
SQUARED, decaying twice as fast in a logarithmic sense) — and reserve
'frequency shift' concerns for genuinely heavy damping, not typical
lightly-damped systems."

**Expert**: the full damped-oscillator differential equation and its
three regimes (underdamped, critically damped, overdamped), with ω_d's
formula emerging directly from the underdamped solution — a natural
mathematical consolidation, not required for mastery.

## Why Students Fail

The dominant failure is assuming damping's visible amplitude reduction
also implies a proportionally large frequency reduction, rather than
recognizing frequency shift is genuinely negligible for light damping;
a second, distinct failure is assuming energy decays at the same rate as
amplitude (linearly), rather than recognizing energy's quadratic
dependence on amplitude.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.wave.damped-oscillations.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-DAMPING-CHANGES-FREQUENCY**: stating "damping slows the
  oscillation down — it reduces the frequency" as a significant effect.
  **Birth type**: overgeneralization (Type 1) — damping's clearly
  visible amplitude reduction is intuitively (but incorrectly) assumed to
  imply a comparably significant frequency reduction, when the actual
  formula ω_d=√(ω₀²-γ²) shows the shift is negligible for light damping.
  Probe: "A lightly damped system has ω₀=15.81 rad/s and (after
  computing with damping included) ω_d=15.78 rad/s. Would you consider
  this a noticeable slowdown in a normal lab measurement?"
- **MC-ENERGY-DECAYS-SAME-RATE-AS-AMPLITUDE**: believing that if
  amplitude halves after some time, energy also halves after that same
  time. **Birth type**: overgeneralization (Type 1) — a simple, linear
  "halved input, halved output" intuition is incorrectly applied to
  energy, which actually depends on amplitude SQUARED, not amplitude
  itself. Probe: "If a damped oscillator's amplitude decreases to half
  its original value, what fraction of its original energy remains —
  half, or something else?"

## Analogies

**Best**: doubling a square's side length quadruples its area (not
doubles it) — energy's dependence on amplitude squared behaves
identically, so halving amplitude quarters energy, exactly paralleling
how halving a square's side quarters its area — directly targets
MC-ENERGY-DECAYS-SAME-RATE-AS-AMPLITUDE by grounding the squared
relationship in a familiar geometric precedent.

**Anti-analogy**: do NOT say "damping slows things down" as an
unqualified description — this vague phrasing, without specifying
amplitude vs. frequency, directly invites
MC-DAMPING-CHANGES-FREQUENCY.

## Demonstrations

Worked-example: compute ω_d=√(ω₀²-γ²) for a specific lightly-damped
system, finding the numeric shift from ω₀ is under 1% — directly targets
MC-DAMPING-CHANGES-FREQUENCY. Worked-example: compute
E=½k(A₀/2)²=¼(½kA₀²)=E₀/4 explicitly, showing the quarter (not half)
result — directly targets
MC-ENERGY-DECAYS-SAME-RATE-AS-AMPLITUDE.

## Discovery Questions

Discovery-style: "if a damped oscillator's amplitude has decreased to
exactly half its starting value, has its energy also decreased to
half, or to some other fraction?" — learner computes E=½kA² directly,
directly confronting
MC-ENERGY-DECAYS-SAME-RATE-AS-AMPLITUDE.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-DAMPING-CHANGES-FREQUENCY is addressed first (establishing that
amplitude, not frequency, is damping's dominant visible effect for light
damping), before
MC-ENERGY-DECAYS-SAME-RATE-AS-AMPLITUDE, since correctly identifying
amplitude decay as the primary observable effect sets up the natural
follow-up question of exactly HOW energy relates to that decaying
amplitude.

## Tutor Actions

WORKED-EXAMPLE (ω_d computed numerically for light damping, showing
negligible shift; E=½kA² computed for halved amplitude, showing the
quarter result); ANALOGY (square-area-quadrupling mapped onto
energy-quadrupling).

## Voice Teaching Notes

Listen for "damping slows the frequency down" or an assumption that
halved amplitude means halved energy — the two direct misconception
tells. Load-bearing sentence: "damping mostly shrinks the SIZE of the
swing, barely the SPEED of it — and energy shrinks even faster than
amplitude, because it depends on amplitude SQUARED." Channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming a noticeable frequency slowdown from light damping
signals MC-DAMPING-CHANGES-FREQUENCY (MISCONCEIVING, full repair via the
numeric ω_d computation). A learner claiming halved amplitude means
halved energy signals
MC-ENERGY-DECAYS-SAME-RATE-AS-AMPLITUDE (full repair via the E=½kA²
computation). Mastery trigger: correctly stating light damping's
frequency shift is negligible, AND correctly computing energy's
quadratic dependence on amplitude. Blueprint's assessment component
cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget frequency for a second — energy formula is
E=½kA². If A becomes A/2, what does (A/2)² actually equal, compared to
A²?" (isolating the squared relationship before discussing decay rates
over time). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (negligible frequency shift for light damping; quadratic
energy-amplitude relationship) bound to procedure (ω_d and E=½kA²
calculation). Interleave with `phys.wave.shm-energy` and, once authored,
`phys.wave.forced-oscillations` (the direct KG unlock).

## Transfer Connections

Near: any damped-oscillator frequency or energy-decay problem, including
shock absorbers and pendulum clocks. Far: mechanical engineering
(vibration damping design in vehicles and structures, deliberately
tuning damping ratios) and electrical engineering (RLC circuit damping,
directly analogous mathematics). Real-world: understanding why a
lightly-damped guitar string still rings at essentially its original
pitch even as its loudness (amplitude, and energy even faster) fades.
Expert: the full three-regime damped-oscillator differential equation
(underdamped, critically damped, overdamped).

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

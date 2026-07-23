# Forced Oscillations and Resonance — `phys.wave.forced-oscillations`

## Identity

- **Concept ID**: `phys.wave.forced-oscillations` (canonical physics KG)
- **Curriculum location**: physics / waves — dependency level 10.
- **Prerequisites**: `phys.wave.damped-oscillations` — forced oscillation
  adds an external periodic driving force on top of the already-secure
  damped-oscillator framework, producing steady-state behavior dependent
  on both damping and driving frequency.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that resonance is NOT an
all-or-nothing phenomenon requiring EXACT frequency matching — driving a
system even slightly off its natural frequency ω₀ still produces a
LARGE (though not maximal) amplitude response, since the amplitude curve
is a smooth peak, not a sharp spike; a driving frequency just 5% off
resonance can still produce amplitude within 85% of the peak value;
(2) correctly explain that adding damping does NOT always reduce
amplitude — this is true NEAR resonance (where damping strongly limits
the peak), but FAR from resonance (driving frequency well below ω₀),
steady-state amplitude approaches A≈F₀/k, essentially INDEPENDENT of
damping, so adding damping barely changes the response in that regime.

## Core Understanding

Resonance in a forced (driven) oscillator is NOT a sharp, all-or-nothing
phenomenon requiring the driving frequency to EXACTLY match the natural
frequency ω₀ — the actual amplitude-versus-driving-frequency curve is a
smooth PEAK, not an infinitely narrow spike, meaning a driving frequency
even moderately off ω₀ still produces a substantial response: for a
specific example with ω₀=20, γ=2, driving at ω_d=21 (just 5% off
resonance) still yields amplitude ≈85% of the peak resonance value — far
from negligible. A second, equally important and easily over-generalized
claim: damping does NOT always reduce a forced oscillator's steady-state
amplitude — this is true specifically NEAR resonance, where damping
directly limits how large the peak amplitude can grow, but FAR below
resonance (driving frequency ω_d much less than ω₀), the steady-state
amplitude approaches A≈F₀/k, a value determined essentially by the
spring constant and driving force alone, with damping's effect on this
low-frequency amplitude being comparatively negligible — damping
reshapes the resonance PEAK dramatically, but barely touches the
off-resonance, low-frequency response.

## Mental Models

**Beginner**: "Resonance only happens when the driving frequency exactly
equals ω₀ — any slight mismatch means no resonance at all; adding
damping to a forced oscillator always decreases its amplitude, no matter
the driving frequency." Upgrade trigger: computing the actual amplitude
at a driving frequency 5% off resonance (finding it's still ≈85% of the
peak) directly confronts the exact-match-only assumption; computing
steady-state amplitude far below resonance with different damping
values (finding it barely changes) directly confronts the
damping-always-reduces assumption.

**Intermediate**: "The amplitude-vs-frequency curve is a smooth peak,
with substantial response even somewhat off resonance; damping strongly
affects amplitude near resonance but has little effect far from it."
This model correctly captures both core results, but sometimes still
treats "damping reduces amplitude" as a universal rule when reasoning
quickly about an unfamiliar driving-frequency regime.

**Advanced**: "Before predicting damping's effect on amplitude, first
identify whether the driving frequency is near or far from resonance —
the two regimes behave qualitatively differently, and no single rule
('damping always reduces amplitude') applies universally across both."

**Expert**: the full steady-state amplitude formula,
A(ω_d)=F₀/√[(mω₀²-mω_d²)²+(γω_d)²] (or an equivalent form), from which
both the smooth-peak shape and the damping-regime-dependence emerge
directly — a natural mathematical consolidation, not required for
mastery.

## Why Students Fail

The dominant failure is treating resonance as an all-or-nothing,
exact-frequency-match phenomenon, missing that the amplitude response is
a smooth, broad peak; a second, distinct failure is overgeneralizing
"damping reduces amplitude" (true near resonance) to ALL driving
frequencies, missing that far from resonance the response becomes nearly
damping-independent.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.wave.forced-oscillations.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-RESONANCE-ONLY-AT-EXACT-NATURAL-FREQUENCY**: believing resonance
  only happens when the driving frequency exactly equals ω₀, with any
  slight mismatch meaning no resonance. **Birth type**: overgeneralization
  (Type 1) — the idealized, mathematically exact resonance PEAK
  (occurring precisely at ω_d=ω₀) is incorrectly assumed to be the ONLY
  frequency at which significant amplitude occurs, rather than the peak
  of a smooth, broader curve. Probe: "A driven oscillator has ω₀=20 and
  is driven at ω_d=21 (slightly off resonance). Is the resulting
  amplitude close to zero, or still substantial?"
- **MC-MORE-DAMPING-ALWAYS-SMALLER-AMPLITUDE**: believing that adding
  damping to a forced oscillator always decreases its amplitude. **Birth
  type**: overgeneralization (Type 1) — damping's clear, strong
  amplitude-limiting effect NEAR resonance is incorrectly extended to
  ALL driving frequencies, including the far-below-resonance regime where
  amplitude is nearly damping-independent. Probe: "A forced oscillator is
  driven at a frequency much LOWER than its natural frequency ω₀. Does
  adding more damping significantly reduce its steady-state amplitude in
  this regime?"

## Analogies

**Best**: pushing a swing slightly off its natural rhythm — you don't
need to hit the EXACT timing to get the swing moving substantially;
even a somewhat mistimed push still transfers significant energy,
producing a large (if not maximal) swing — directly targets
MC-RESONANCE-ONLY-AT-EXACT-NATURAL-FREQUENCY by giving a familiar,
embodied precedent for the smooth-peak (not spike) response.

**Anti-analogy**: do NOT say "damping always calms down an oscillator's
amplitude" as an unqualified rule — this directly invites
MC-MORE-DAMPING-ALWAYS-SMALLER-AMPLITUDE by omitting the crucial
near-vs-far-from-resonance distinction.

## Demonstrations

Worked-example: compute the amplitude formula's value at ω_d=21 for
ω₀=20, γ=2 explicitly, finding ≈85% of the peak resonance amplitude —
directly targets MC-RESONANCE-ONLY-AT-EXACT-NATURAL-FREQUENCY.
Worked-example: compute steady-state amplitude at a driving frequency
well below ω₀ for two different damping values, showing the amplitude
barely changes (A≈F₀/k in both cases) — directly targets
MC-MORE-DAMPING-ALWAYS-SMALLER-AMPLITUDE.

## Discovery Questions

Discovery-style: "if you drive an oscillator at a frequency slightly off
its natural frequency, does the amplitude drop to nearly zero, or does
it stay substantial?" — learner computes the actual amplitude value,
directly confronting MC-RESONANCE-ONLY-AT-EXACT-NATURAL-FREQUENCY.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-RESONANCE-ONLY-AT-EXACT-NATURAL-FREQUENCY is addressed first
(establishing the smooth-peak shape of the amplitude-vs-frequency
response), before MC-MORE-DAMPING-ALWAYS-SMALLER-AMPLITUDE, since
correctly picturing the full amplitude curve (not just its peak) is the
prerequisite for then correctly reasoning about how damping reshapes
different PARTS of that curve differently.

## Tutor Actions

WORKED-EXAMPLE (amplitude computed at and slightly off resonance;
amplitude computed far below resonance for varying damping);
ANALOGY (swing-pushing-slightly-off-rhythm mapped onto the smooth
resonance peak).

## Voice Teaching Notes

Listen for resonance treated as exact-frequency-only, or "damping always
reduces amplitude" stated without a frequency-regime qualifier — the two
direct misconception tells. Load-bearing sentence: "resonance is a
smooth hill, not a narrow spike — being a little off still gets you most
of the way up; and damping mostly matters right AT that hill's peak, not
far away from it." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming near-zero amplitude for a slightly-off-resonance
driving frequency signals
MC-RESONANCE-ONLY-AT-EXACT-NATURAL-FREQUENCY (MISCONCEIVING, full repair
via the numeric amplitude computation). A learner claiming damping
always reduces amplitude regardless of driving frequency signals
MC-MORE-DAMPING-ALWAYS-SMALLER-AMPLITUDE (full repair via the
far-below-resonance comparison). Mastery trigger: correctly computing
substantial amplitude moderately off resonance, AND correctly
identifying the frequency regime where damping's effect becomes
negligible. Blueprint's assessment component cited for the full item
bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the exact frequency for a second — is the
amplitude-vs-frequency graph a razor-thin spike, or a smoother, wider
hill shape?" (isolating the curve's actual shape before discussing
specific frequency values). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (smooth resonance peak, not a spike; damping's regime-dependent
effect) bound to procedure (amplitude formula evaluation at various
driving frequencies and damping values). Interleave with
`phys.wave.damped-oscillations`.

## Transfer Connections

Near: any forced-oscillator amplitude or resonance-frequency problem,
including tuning circuits and mechanical vibration. Far: structural
engineering (bridge and building resonance avoidance, requiring
understanding the broad, not spike-like, resonance response) and
musical instrument design (resonance and damping tuning in instrument
bodies). Real-world: understanding why the Tacoma Narrows Bridge
collapse involved a broad range of near-resonant wind frequencies, not
one exact match. Expert: the full steady-state amplitude formula from
which both key results emerge directly.

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

- 2026-07-23 (physics EB Wave 10): initial authoring.

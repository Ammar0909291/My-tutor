# Single-Slit Diffraction — `phys.opt.single-slit`

## Identity

- **Concept ID**: `phys.opt.single-slit` (canonical physics KG)
- **Curriculum location**: physics / optics — dependency level 8.
- **Prerequisites**: `phys.opt.diffraction` — single-slit diffraction is
  the quantitative worked application of the already-secure general
  diffraction (single-source, many-secondary-points interference)
  mechanism to one specific, canonical aperture geometry.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly state the central maximum is TWICE as wide
as any secondary maximum (angular width 2λ/a vs. λ/a) — not the same
width, despite Young's double-slit pattern having uniform fringe spacing;
(2) correctly interpret a sinθ = mλ as the DARK-FRINGE condition (m=0
excluded, since θ=0 is the bright central maximum, not a dark fringe) —
the OPPOSITE physical meaning from Young's structurally similar-looking
d sinθ = mλ (a BRIGHT-fringe condition); (3) correctly state secondary
maxima decrease in brightness (following a sinc² envelope), not equal
brightness.

## Core Understanding

Single-slit diffraction produces a pattern with several genuinely
non-obvious features that differ sharply from the already-familiar
Young's double-slit pattern. First, the CENTRAL maximum is exactly TWICE
as wide (angular width 2λ/a) as any SECONDARY maximum (angular width
λ/a) — not uniform fringe spacing as in Young's — because the central
maximum is bounded by dark fringes at m=±1 on both sides simultaneously,
while each secondary maximum is bounded by two dark fringes only one m
apart. Second, the governing formula a sinθ = mλ gives DARK fringe
positions, with m=0 specifically EXCLUDED (θ=0 is the bright central
maximum, since zero path difference across the slit means no
cancellation, hence maximum brightness — not a dark fringe as the m=0
label might suggest by loose analogy to other formulas). Third, this
formula LOOKS structurally identical to Young's bright-fringe condition
d sinθ = mλ, but means the OPPOSITE thing physically: in Young's, integer
m path difference means the two discrete sources arrive in phase (bright);
in single-slit diffraction, integer m path difference across the
CONTINUOUS aperture means the top and bottom halves of the slit
completely cancel each other (dark) — the same-looking formula encodes
constructive interference in one case and destructive interference in
the other, depending on the physical setup it describes. Fourth,
secondary maxima decrease monotonically in brightness following a sinc²
envelope (each roughly 20-60× dimmer than the previous), not equal
brightness as in Young's uniform fringes.

## Mental Models

**Beginner**: "The central maximum and secondary maxima are all the same
width and brightness, like Young's double-slit fringes; a sinθ=mλ works
just like Young's formula, giving bright fringes at integer m." Upgrade
trigger: measuring/computing the actual angular widths (central=2λ/a,
secondary=λ/a) and intensities (rapidly decreasing) directly confronts
the uniform-pattern assumption; interpreting a sinθ=mλ as a
cancellation (not constructive) condition directly confronts the
same-as-Young's assumption.

**Intermediate**: "Central maximum is twice as wide as any secondary
maximum; a sinθ=mλ (m≠0) gives DARK fringes, the opposite meaning from
Young's d sinθ=mλ; secondary maxima decrease in brightness." This model
correctly captures all three distinctions, but sometimes still applies
Young's formula-reading habit by reflex when the two look visually
similar on the page.

**Advanced**: "Before applying either formula, explicitly identify
whether the setup is single-slit (continuous aperture, dark-fringe
condition) or double-slit (two discrete sources, bright-fringe
condition) — the surface similarity of a sinθ=mλ and d sinθ=mλ is a
trap, not a shortcut."

**Expert**: the sinc² intensity envelope derived from integrating the
continuous aperture's phasor contributions — a natural mathematical
consolidation directly connecting to the general diffraction mechanism,
not required for mastery.

## Why Students Fail

The dominant failure is analogy overextension from Young's double-slit
pattern (uniform fringe width/brightness, bright-fringe formula reading)
to single-slit diffraction, which has structurally different (non-uniform
width/brightness) behavior and an opposite-meaning formula, despite the
superficially similar mathematical form.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.opt.single-slit.md`,
Misconception Engine, MC-1 through MC-4) documents four; reused by
reference with birth-type added.

- **MC-1 (MC-CENTRAL-MAX-SAME-WIDTH-AS-SECONDARIES)**: expecting the
  central maximum and secondary maxima to be the same width, by analogy
  to Young's uniform fringe spacing. **Birth type**: analogy
  overextension (Type 6) — Young's uniform-fringe-spacing pattern is
  incorrectly extended to single-slit diffraction, where the central
  maximum is genuinely twice as wide. Probe: "In a single-slit pattern,
  compare the width of the central maximum to the width of the first
  secondary maximum. Are they equal?"
- **MC-2 (MC-M=0-IS-DARK)**: reading m=0 in a sinθ=mλ as a dark fringe
  (misreading the formula, forgetting it gives dark-fringe positions and
  that m=0 is the excluded, bright central maximum). **Birth type**:
  language contamination (Type 3) — the "m=0 means no path difference"
  reasoning correctly applies to bright-fringe formulas but is
  incorrectly imported into this dark-fringe formula. Probe: "Using
  a sinθ=mλ, what is the fringe at m=0? Is it bright or dark?"
- **MC-3 (MC-SECONDARIES-EQUAL-BRIGHTNESS)**: believing all secondary
  maxima have equal brightness, by analogy to Young's equal-intensity
  fringes. **Birth type**: analogy overextension (Type 6) — Young's
  equal-amplitude-per-slit assumption is incorrectly extended to
  single-slit diffraction, where amplitude genuinely varies with angle
  across the continuous aperture. Probe: "After the central maximum, do
  all secondary maxima have the same brightness?"
- **MC-4 (MC-SINGLE-SLIT-FORMULA-SAME-AS-YOUNGS)**: assuming integer m in
  a sinθ=mλ gives bright fringes, by surface similarity to Young's
  d sinθ=mλ. **Birth type**: analogy overextension (Type 6) — the two
  formulas' visual/structural similarity directly invites reading them as
  meaning the same thing, when they encode opposite physical conditions.
  Probe: "In Young's double-slit, d sinθ=mλ gives bright fringes at
  integer m. In single-slit, a sinθ=mλ — does integer m give bright or
  dark fringes?"

## Analogies

**Best**: a tug-of-war between the top half and bottom half of the
slit's wavefront — at a sinθ=mλ (integer m), every point in the top half
finds an exactly-canceling partner in the bottom half, producing
complete darkness — directly targets MC-2/MC-4 by making the
cancellation mechanism (not construction) concrete.

**Anti-analogy**: do NOT say "the diffraction formula works just like
Young's formula" as a bridging simplification — this directly installs
MC-4 by suggesting equivalent physical meaning where none exists.

## Demonstrations

Physical/conceptual: measure or compute angular widths of the central and
first secondary maxima (2λ/a vs. λ/a), directly targeting MC-1. Conceptual:
side-by-side table of Young's d sinθ=mλ (bright, m=0 included) vs.
single-slit a sinθ=mλ (dark, m=0 excluded), directly targeting MC-2 and
MC-4 together. Intensity-profile measurement/simulation showing secondary
maxima's rapid, monotonic brightness decrease — directly targets MC-3.

## Discovery Questions

Discovery-style: "the single-slit and double-slit formulas look almost
identical — does that mean integer m gives the same kind of fringe
(bright or dark) in both cases?" — learner investigates the underlying
mechanism (discrete sources vs. continuous aperture cancellation),
directly confronting MC-4.

## Teaching Sequence

Blueprint's TA-2 through TA-5 components cited by reference. MC-4
(formula-meaning confusion) is addressed first via the side-by-side
Young's/single-slit table, since correctly establishing this formula as a
DARK-fringe condition is the prerequisite for correctly resolving MC-2
(the m=0 special case) immediately after. MC-1 (width) and MC-3
(brightness) are addressed via direct measurement/simulation, in either
order, once the formula's correct interpretation is secure.

## Tutor Actions

WORKED-EXAMPLE (angular widths and dark-fringe positions computed);
DEMONSTRATION (intensity profile scan or simulation); COMPARE-CONTRAST
(Young's bright-fringe formula vs. single-slit dark-fringe formula,
side by side).

## Voice Teaching Notes

Listen for the single-slit formula read as a bright-fringe condition, or
uniform width/brightness assumed across the pattern — the direct
misconception tells. Load-bearing sentence: "this formula tells you where
it's DARK, not bright — and the middle bright band is twice as wide as
any of the others." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner reading a sinθ=mλ as giving bright fringes signals MC-4
(MISCONCEIVING, full repair via the side-by-side formula table). A
learner calling m=0 a dark fringe signals MC-2 (same repair). A learner
expecting uniform width/brightness signals MC-1/MC-3 (full repair via
direct measurement). Mastery trigger: correctly computing both maxima's
angular widths, AND correctly interpreting the dark-fringe formula with
m=0 excluded. Blueprint's assessment component cited for the full item
bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — at θ=0, is there
ANY path difference across the slit at all? What does zero path
difference usually mean for brightness?" (isolating the central-maximum
special case before applying the general formula). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (dark-fringe vs. bright-fringe formula meaning; non-uniform
pattern) bound to procedure (angular-width and dark-fringe-position
calculation). Interleave with `phys.opt.diffraction` and cross-reference
explicitly against Young's double-slit formula (`phys.opt.youngs-experiment`,
already authored) for the deliberate side-by-side contrast.

## Transfer Connections

Near: any single-slit diffraction pattern calculation, including
spectrometer slit design. Far: optical instrument resolution limits
(telescope/microscope aperture diffraction directly limiting resolving
power) and antenna radiation pattern design (analogous diffraction
mathematics for electromagnetic aperture radiation). Real-world:
understanding why camera lens aperture size affects image sharpness at
very small apertures (diffraction-limited resolution). Expert: the sinc²
intensity envelope derived from integrating continuous-aperture phasor
contributions.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine
(Component 4, MC-1 through MC-4) by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Library, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 8): initial authoring.

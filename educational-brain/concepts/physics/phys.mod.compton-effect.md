# Compton Scattering — `phys.mod.compton-effect`

## Identity

- **Concept ID**: `phys.mod.compton-effect` (canonical physics KG)
- **Curriculum location**: physics / modern physics — dependency level 11.
- **Prerequisites**: `phys.mod.photons` — Compton scattering directly
  applies the already-secure photon momentum concept (p=h/λ) to an
  elastic photon-electron collision, providing further, independent
  confirmation of the photon's particle-like behavior.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly state the Compton wavelength shift,
Δλ=λ_C(1-cosθ), depends ONLY on the scattering angle θ — NOT on the
initial wavelength — while the FRACTIONAL shift, Δλ/λ, does depend on
initial wavelength, which is precisely why Compton used short-wavelength
X-rays (where the fixed absolute shift is a large fraction of λ) rather
than visible light; (2) correctly explain the classical WAVE model
CANNOT explain the observed wavelength shift at all — it predicts
scattered radiation at the SAME frequency/wavelength as the incident
radiation (Thomson scattering), fundamentally unable to produce any
shift, unlike the photon-particle model; (3) correctly explain Compton
scattering is a single ELASTIC COLLISION, NOT absorption followed by
re-emission — the same photon (with reduced energy/increased
wavelength) scatters directly, conserving energy and momentum in one
interaction; (4) correctly compute that the wavelength shift is ZERO at
θ=0° (forward scattering, cosθ=1) and MAXIMUM at θ=180° (backward
scattering, cosθ=-1) — NOT maximum at θ=0° as a naive "straight through"
intuition might suggest.

## Core Understanding

The Compton wavelength shift formula, Δλ=λ_C(1-cosθ) (λ_C=Compton
wavelength, a fixed constant), contains NO dependence on the incident
photon's initial wavelength λ at all — the ABSOLUTE shift is identical
for any initial wavelength at a given scattering angle. However, the
FRACTIONAL shift, Δλ/λ, genuinely DOES depend on the initial wavelength
(since dividing a fixed Δλ by a smaller λ gives a larger fraction) —
this is precisely why Compton specifically used short-wavelength X-rays
rather than visible light: X-rays' short wavelength makes the fixed
absolute shift a substantial, measurable FRACTION of the total
wavelength, while for visible light's much longer wavelength, the
identical absolute shift would be a negligible, unmeasurable fraction. A
second, foundational point: the CLASSICAL WAVE model of light cannot
explain the Compton shift at all, even in principle — in that model, an
incident electromagnetic wave simply oscillates a free electron, which
then re-radiates at the IDENTICAL frequency (Thomson scattering) —
there is no mechanism within the wave picture for the scattered
radiation's wavelength to shift; the observed shift specifically requires
treating the photon as a genuine particle carrying definite momentum
and energy, exchanged in a discrete collision. A third, easily-confused
point: Compton scattering is a single ELASTIC COLLISION event, NOT an
absorption-then-re-emission process (unlike, say, fluorescence) — the
SAME photon (now with reduced energy and correspondingly longer
wavelength) emerges directly from the interaction, with energy and
momentum conserved throughout a single event, never truly "absorbed" at
any point. Finally, the wavelength shift's angular dependence is
specifically OPPOSITE to a naive intuition: Δλ=λ_C(1-cosθ) gives EXACTLY
ZERO shift at θ=0° (forward scattering, straight through, cosθ=1,
making 1-cosθ=0) and MAXIMUM shift at θ=180° (direct backward
scattering, cosθ=-1, making 1-cosθ=2) — the shift is zero specifically
when the photon barely interacts (forward scattering, minimal momentum
transfer) and maximum when the photon reverses direction entirely
(maximum possible momentum transfer to the electron).

## Mental Models

**Beginner**: "The wavelength shift should be bigger for a shorter
initial wavelength; the classical wave model should somehow be able to
explain this too; the electron absorbs the photon and re-emits a new
one; the shift should be maximum for forward scattering, since the
photon goes straight through with the most energy." Upgrade trigger:
examining that Δλ=λ_C(1-cosθ) contains no λ term at all directly
confronts the shift-depends-on-wavelength assumption; tracing through
Thomson scattering's same-frequency prediction directly confronts the
wave-model-can-explain-it assumption; recognizing the outgoing photon as
the SAME photon (not a new one) directly confronts the absorption-
reemission assumption; computing Δλ at θ=0° (exactly zero) and θ=180°
(maximum) directly confronts the forward-scattering-maximum assumption.

**Intermediate**: "Absolute shift depends only on angle, not initial
wavelength (though fractional shift does); the wave model predicts zero
shift, requiring the photon model; it's a single elastic collision, same
photon throughout; shift is zero at 0° and maximum at 180°." This model
correctly captures all four results, but sometimes still reasons about
Compton scattering using classical-wave or absorption-reemission
intuitions by default.

**Advanced**: "Always derive Compton results directly from relativistic
energy-momentum conservation applied to a single photon-electron
collision — never reach for wave-model or absorption-emission
analogies, which fundamentally cannot produce this phenomenon."

**Expert**: the full relativistic derivation of Δλ=λ_C(1-cosθ) from
four-momentum conservation, and Compton scattering's historical role
(alongside the photoelectric effect) in establishing the photon's
particle nature — a natural consolidation, not required for mastery.

## Why Students Fail

The dominant failure is expecting the wavelength shift to depend on
initial wavelength (confusing absolute and fractional shift); secondary
failures include assuming the classical wave model could somehow explain
the shift, picturing the process as absorption-then-re-emission rather
than a single elastic collision, and reasoning backward about the
angular dependence (expecting maximum shift at forward scattering).

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.compton-effect.md`,
Misconception Engine, MC-1 through MC-4) documents four; reused by
reference with birth-type added.

- **MC-1 (MC-COMPTON-SHIFT-DEPENDS-ON-INITIAL-WAVELENGTH)**: believing
  "shorter wavelength = bigger [absolute] shift," confusing absolute
  shift Δλ with fractional shift Δλ/λ. **Birth type**: notation-induced
  (Type 4) — the formula's angle-only dependence is easy to overlook
  when reasoning informally about "bigger" vs. "smaller" wavelengths.
  Probe: "Does the Compton wavelength shift depend on the initial
  wavelength of the X-ray? Why did Compton use X-rays rather than
  visible light?"
- **MC-2 (MC-WAVE-MODEL-PREDICTS-SAME-RESULT)**: believing "the wave
  model can also explain the shift somehow." **Birth type**:
  overgeneralization (Type 1) — the classical wave model's general
  flexibility in explaining other optical phenomena is incorrectly
  assumed to extend to this genuinely non-classical result. Probe: "What
  does the classical wave model predict for the wavelength of X-rays
  scattered by electrons?"
- **MC-3 (MC-COMPTON-IS-ABSORPTION-AND-REEMISSION)**: believing "the
  electron absorbs and re-emits a new photon." **Birth type**: analogy
  overextension (Type 6) — the photoelectric effect's absorption
  mechanism, or fluorescence's absorb-reemit pattern, is incorrectly
  extended to Compton scattering, which is a single elastic collision
  with no absorption step. Probe: "In Compton scattering, is the exiting
  photon the same as the entering one, or a new photon?"
- **MC-4 (MC-COMPTON-SHIFT-ZERO-AT-θ=0)**: believing "at θ=0 the shift
  is maximum because the photon is going straight through." **Birth
  type**: perceptual intuition (Type 2) — "going straight through"
  intuitively suggests maximum interaction/effect, the opposite of the
  actual minimal-momentum-transfer result at forward scattering. Probe:
  "What is the Compton wavelength shift when the photon is scattered at
  θ=0° (forward)? At θ=180°?"

## Analogies

**Best**: a billiard-ball collision where the cue ball barely grazes the
target ball (near-forward scattering, minimal momentum transfer) versus
a head-on collision (backward scattering, maximum momentum transfer) —
directly targets MC-4 by mapping the angular dependence onto a familiar
collision-physics intuition.

**Anti-analogy**: do NOT say "the photon gets absorbed and a new one
comes out" as a simplifying description — this directly installs MC-3.

## Demonstrations

Worked-example: compute Δλ at θ=0°, 90°, 180° explicitly, showing zero,
intermediate, and maximum shift respectively — directly targets MC-4.
Conceptual: trace the classical Thomson-scattering prediction (same
frequency in, same frequency out) alongside the actual observed shift —
directly targets MC-2.

## Discovery Questions

Discovery-style: "if a photon scatters almost straight through an
electron (barely deflected), does it transfer a lot of momentum, or very
little?" — learner reasons through the collision geometry, directly
confronting MC-4.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-2 (wave-model
failure) is addressed first (establishing why the photon/particle model
is NEEDED at all), then MC-3 (single elastic collision, not absorption-
reemission, clarifying the mechanism), then MC-1 (absolute vs. fractional
shift) and MC-4 (angular dependence), building from the conceptual
foundation toward the specific quantitative details.

## Tutor Actions

WORKED-EXAMPLE (Δλ computed at multiple angles); COMPARE-CONTRAST
(classical wave prediction vs. actual observed shift); THOUGHT-EXPERIMENT
(billiard-ball collision geometry mapped onto momentum transfer).

## Voice Teaching Notes

Listen for shift-depends-on-wavelength claims, wave-model defenses,
absorption-reemission language, or forward-scattering-maximum claims —
the four direct misconception tells. Load-bearing sentence: "the shift
only depends on the angle, not the wavelength — and it's zero straight
through, maximum bouncing straight back." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner expecting the absolute shift to vary with initial wavelength
signals MC-1 (MISCONCEIVING). A learner defending the wave model's
ability to explain the shift signals MC-2. A learner describing
absorption-reemission signals MC-3. A learner expecting maximum shift at
forward scattering signals MC-4. Each fully repaired via its
corresponding worked example/demonstration above. Mastery trigger:
correctly computing Δλ at various angles, AND correctly explaining why
only the photon model (not the wave model) predicts any shift at all.
Blueprint's assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — in a head-on
collision, does more or less momentum get transferred than in a
glancing one?" (isolating the collision-geometry intuition before the
angular formula). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (angle-only absolute shift dependence; single elastic collision,
not absorption-reemission) bound to procedure (Δλ=λ_C(1-cosθ)
calculation). Interleave with `phys.mod.photons`.

## Transfer Connections

Near: any Compton-shift calculation problem. Far: medical imaging
(Compton scattering as a significant interaction mechanism in X-ray/
gamma-ray imaging and radiation therapy) and astrophysics (Compton
scattering of photons by high-energy electrons in astrophysical plasmas).
Real-world: understanding why Compton scattering contributes to image
degradation in medical X-ray imaging. Expert: the full relativistic
derivation from four-momentum conservation.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine
(MC-1 through MC-4) and its assessment component by reference. Not
restated: Concept Identity & Metadata, Concept Explanation Library,
Worked Examples, Lesson Composition Grammar, Retrieval Spacing Schedule,
Prerequisite & Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 11): initial authoring.

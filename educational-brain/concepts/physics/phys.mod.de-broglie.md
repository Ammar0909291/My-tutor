# de Broglie Hypothesis — Matter Waves — `phys.mod.de-broglie`

## Identity

- **Concept ID**: `phys.mod.de-broglie` (canonical physics KG)
- **Curriculum location**: physics / modern physics — dependency level 11.
- **Prerequisites**: `phys.mod.photons` — de Broglie's hypothesis
  extends the already-secure photon momentum relationship (p=h/λ) in
  reverse, proposing that ALL matter, not just light, has an associated
  wavelength.
- **Unlocks** (from KG): `phys.mod.wave-particle-duality` — a genuine
  hub concept.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly state that de Broglie's hypothesis was
NOT merely theoretical speculation — it was experimentally CONFIRMED by
Davisson and Germer (1927), who measured electron diffraction maxima
from a nickel crystal at exactly the angles predicted by λ=h/(mv),
independently confirmed by George Thomson; (2) correctly explain that a
baseball DOES have a de Broglie wavelength (λ=h/(mv)) — it is simply
astronomically small (≈10⁻³⁴ m, smaller than a quark), making wave
effects utterly unobservable at that scale, NOT that macroscopic objects
lack wave properties entirely; (3) correctly explain that a particle's
de Broglie wavelength does NOT represent its physical SIZE — a 1 nm
electron wavelength does not mean the electron itself is 1 nm across
(the electron's classical radius is vastly smaller, ≈2.8 fm);
(4) correctly explain that for MATTER (unlike photons), a FASTER
particle has a SHORTER wavelength (λ=h/(mv), inversely proportional to
momentum) — NOT a longer one; the "faster=more energetic=longer
wavelength" pattern that holds for PHOTONS (where higher energy
corresponds to shorter λ actually, via E=hc/λ) doesn't map onto matter
particles the same way, and reasoning by loose analogy produces the
wrong direction.

## Core Understanding

De Broglie's hypothesis — that all matter has an associated wavelength,
λ=h/(mv) — was NOT left as untested theoretical speculation; it was
experimentally CONFIRMED in 1927 by Davisson and Germer, who measured
the angular distribution of electrons scattered from a nickel crystal
and found diffraction maxima occurring at EXACTLY the angles predicted
by Bragg's law using λ=h/(mv) — George Thomson independently confirmed
this with a different experimental setup, making matter-wave behavior a
directly, repeatedly verified experimental fact, not a hypothesis
awaiting confirmation. A common but mistaken conclusion from de
Broglie's formula is that macroscopic objects (like a baseball) lack
wave properties entirely — but λ=h/(mv) applies UNIVERSALLY; a 0.145 kg
baseball moving at 40 m/s genuinely HAS a de Broglie wavelength, just an
astronomically tiny one (λ≈1.14×10⁻³⁴ m, smaller even than a quark) —
far too small for ANY conceivable experiment to detect wave effects at
that scale, which is why baseballs never visibly diffract or interfere,
despite technically possessing a (utterly negligible) wavelength. A
second, distinct and easily-confused point: the de Broglie wavelength
does NOT represent a particle's physical SIZE — an electron with a
de Broglie wavelength of 1 nm is not itself 1 nm across; the wavelength
describes the spatial periodicity of the associated wave function, a
fundamentally different concept from physical extent (the electron's
classical radius, ≈2.8 femtometers, is roughly six orders of magnitude
smaller than a 1 nm wavelength, with no direct relationship between the
two quantities). Finally, a genuinely easy-to-reverse direction: for
photons, higher ENERGY corresponds to SHORTER wavelength (E=hc/λ,
inversely related) — but for MATTER particles, a FASTER particle
(higher momentum p=mv) corresponds to a SHORTER de Broglie wavelength
(λ=h/p, also inversely related to momentum, NOT energy directly) — the
superficially similar "faster/more energetic" framing from photon
intuition (where, e.g., radio waves are longer than X-rays, and one
might loosely associate "more energetic" with different directions
depending on which relationship is invoked) can mislead students into
guessing the wrong direction for matter waves specifically if the
p=mv→λ=h/p chain isn't traced through directly.

## Mental Models

**Beginner**: "de Broglie's hypothesis is just a theoretical assumption,
never actually tested; macroscopic objects like baseballs don't have
wave properties; an electron's de Broglie wavelength tells you its
physical size; a faster-moving electron should have a longer wavelength,
like a more energetic photon does." Upgrade trigger: examining the
Davisson-Germer experimental confirmation directly confronts the
theoretical-only assumption; computing a baseball's actual (tiny but
nonzero) de Broglie wavelength directly confronts the no-wave-properties
assumption; comparing the electron's classical radius to its de Broglie
wavelength directly confronts the wavelength-is-size assumption;
deriving λ=h/(mv) directly (showing higher v means shorter λ) directly
confronts the faster-means-longer-wavelength assumption.

**Intermediate**: "de Broglie's hypothesis is experimentally confirmed
(Davisson-Germer, Thomson); ALL matter has a de Broglie wavelength,
however tiny for macroscopic objects; wavelength ≠ physical size; faster
matter particles have SHORTER wavelengths." This model correctly
captures all four results, but sometimes still reaches for photon-based
intuitions by reflex when reasoning about matter-wave direction.

**Advanced**: "Always derive matter-wave behavior directly from
λ=h/(mv) rather than analogizing from photon behavior (E=hc/λ) — the
two relationships, while both involving Planck's constant, connect
different physical quantities (momentum vs. energy) and can give
opposite-seeming directional intuitions if conflated."

**Expert**: the full wave-particle duality framework unifying photon and
matter-wave behavior under a single quantum-mechanical description — a
natural consolidation directly connecting to the KG unlock
`phys.mod.wave-particle-duality`, not required for mastery.

## Why Students Fail

The dominant failure is treating de Broglie's hypothesis as untested
speculation rather than a confirmed experimental fact; secondary
failures include denying macroscopic objects any wave nature, conflating
wavelength with physical size, and incorrectly reasoning by photon
analogy that faster particles have longer wavelengths.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.de-broglie.md`,
Misconception Engine, MC-1 through MC-4) documents four; reused by
reference with birth-type added.

- **MC-1 (MC-MATTER-WAVES-ONLY-THEORETICAL)**: believing "it's just a
  theoretical assumption," unaware of the Davisson-Germer/Thomson
  experimental confirmations. **Birth type**: instruction-induced (Type
  5) — the hypothesis is sometimes introduced without its experimental
  history, leaving it framed as speculative. Probe: "Was de Broglie's
  hypothesis ever experimentally verified? When and how?"
- **MC-2 (MC-BASEBALL-HAS-NO-WAVE-NATURE)**: believing "macroscopic
  objects don't have wave properties," reasoning from λ's extreme
  smallness to its absence. **Birth type**: overgeneralization (Type 1)
  — "too small to observe" is incorrectly conflated with "doesn't
  exist." Probe: "Does a baseball have a de Broglie wavelength? If yes,
  why don't we observe baseball waves?"
- **MC-3 (MC-DE-BROGLIE-WAVELENGTH-IS-PARTICLE-SIZE)**: believing "the
  wavelength tells you how big the particle is," confusing wave-function
  spatial periodicity with physical extent. **Birth type**: language
  contamination (Type 3) — "wavelength" carries an everyday spatial-
  extent connotation that doesn't map onto a particle's actual size.
  Probe: "If an electron has a de Broglie wavelength of 1 nm, does that
  mean the electron is 1 nm in size?"
- **MC-4 (MC-FASTER-PARTICLE-LONGER-WAVELENGTH)**: believing "faster =
  more energetic = longer wavelength," incorrectly analogizing from
  photon behavior. **Birth type**: analogy overextension (Type 6) —
  photon energy-wavelength intuitions (themselves specifically E=hc/λ,
  inverse) are incorrectly mapped onto matter, where λ=h/(mv) is
  inversely related to MOMENTUM, giving the SAME inverse direction but
  easily miscalculated if the reasoning chain isn't traced carefully.
  Probe: "An electron is accelerated to a higher speed. What happens to
  its de Broglie wavelength?"

## Analogies

**Best**: a fingerprint's ridge spacing (a spatial pattern with its own
characteristic scale) is entirely unrelated to the size of the finger
itself — directly targets MC-3 by separating a wave-like periodicity
concept from physical extent.

**Anti-analogy**: do NOT say "de Broglie's hypothesis is a nice idea
about matter waves" without mentioning the Davisson-Germer confirmation
— this omission directly invites MC-1.

## Demonstrations

Data-based: examine the Davisson-Germer diffraction-angle data matching
λ=h/(mv) predictions exactly — directly targets MC-1. Worked-example:
compute a baseball's actual de Broglie wavelength (≈10⁻³⁴ m) — directly
targets MC-2. Worked-example: compare an electron's de Broglie
wavelength (1 nm) to its classical radius (2.8 fm) — directly targets
MC-3. Worked-example: compute λ=h/(mv) for an electron at two different
speeds, showing higher speed gives shorter λ — directly targets MC-4.

## Discovery Questions

Discovery-style: "if a baseball technically has a de Broglie wavelength,
why do we never see it diffract like light does through a slit?" —
learner computes the actual tiny wavelength, directly confronting MC-2.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-1
(experimental confirmation) is addressed first (establishing matter
waves as a verified fact), then MC-2 (universality despite scale), then
MC-3 (wavelength vs. size distinction), then MC-4 (directional
dependence on speed) — building from the historical/experimental
foundation toward increasingly specific quantitative distinctions.

## Tutor Actions

WORKED-EXAMPLE (baseball wavelength computed; electron wavelength vs.
classical radius compared; λ computed at two speeds); DATA-ANALYSIS
(Davisson-Germer diffraction angles).

## Voice Teaching Notes

Listen for "just theoretical," "baseballs don't have waves," "wavelength
means size," or "faster means longer wavelength" — the four direct
misconception tells. Load-bearing sentence: "de Broglie waves are real
and confirmed — every object has one, just usually far too small to
see — and faster particles have SHORTER wavelengths, not longer."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner treating de Broglie's hypothesis as untested signals MC-1
(MISCONCEIVING). A learner denying macroscopic wave nature signals
MC-2. A learner conflating wavelength with size signals MC-3. A learner
predicting longer wavelength at higher speed signals MC-4. Each fully
repaired via its corresponding worked example/data above. Mastery
trigger: correctly citing the experimental confirmation, AND correctly
computing λ=h/(mv) showing the inverse speed dependence. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the size question for a second — in
λ=h/(mv), if v goes up, does λ go up or down?" (isolating the direct
inverse relationship before discussing energy analogies). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (experimentally confirmed universal matter waves; wavelength
distinct from size; inverse speed-wavelength relationship) bound to
procedure (λ=h/(mv) calculation). Interleave with `phys.mod.photons` and,
once authored, `phys.mod.wave-particle-duality` (the direct KG unlock).

## Transfer Connections

Near: any de Broglie wavelength calculation problem. Far: electron
microscopy (exploiting electrons' short de Broglie wavelengths for
nanometer-scale imaging resolution, far beyond visible light's limit)
and quantum tunneling technologies. Real-world: understanding why
electron microscopes can resolve details far smaller than optical
microscopes, directly due to electrons' much shorter de Broglie
wavelengths at typical operating speeds. Expert: the full wave-particle
duality framework.

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

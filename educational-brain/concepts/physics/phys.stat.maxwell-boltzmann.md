# Maxwell-Boltzmann Speed Distribution — `phys.stat.maxwell-boltzmann`

## Identity

- **Concept ID**: `phys.stat.maxwell-boltzmann` (canonical physics KG)
- **Curriculum location**: physics / statistical mechanics — dependency
  level 13.
- **Prerequisites**: `phys.stat.boltzmann-factor` — the Maxwell-Boltzmann
  distribution directly applies the already-secure Boltzmann factor to
  the specific case of molecular speeds in an ideal gas.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly explain that the most probable speed v_p,
mean speed ⟨v⟩, and RMS speed v_rms are three genuinely DIFFERENT
quantities (v_p<⟨v⟩<v_rms always), not interchangeable approximations of
"the" molecular speed, since the distribution is right-skewed and each
statistic characterizes a different aspect of it; (2) correctly explain
that the speed distribution f(v)∝v²e^(−mv²/2k_BT) REQUIRES the v² factor
— without it, f(0) would be nonzero, but the correct distribution has
f(0)=0, since the v² factor (a geometric "density of states" from
integrating over all directions in 3D) vanishes at v=0; (3) correctly
explain that the high-speed TAIL of the distribution, while
exponentially small, is NEVER negligible in a macroscopic sample — with
Avogadro's number of molecules, even a tiny tail fraction represents
billions of molecules, driving real physical processes like atmospheric
escape and chemical reaction rates; (4) correctly explain that DOUBLING
the temperature does NOT double the characteristic speeds — since
kinetic energy ∝v²∝T, speed itself scales as v∝√T, so doubling T only
increases speed by a factor of √2, not 2.

## Core Understanding

The most probable speed v_p, the mean speed ⟨v⟩, and the root-mean-square
speed v_rms are three genuinely DIFFERENT quantities for the
Maxwell-Boltzmann distribution — NOT three equivalent ways of stating
"the" typical molecular speed. Because the distribution is right-skewed
(it has a long high-speed tail), these three statistics are ordered
v_p<⟨v⟩<v_rms, with ratios v_p:⟨v⟩:v_rms=√2:√(8/π):√3≈1:1.13:1.22 — for
nitrogen at 300K, this works out to v_p≈422 m/s, ⟨v⟩≈476 m/s,
v_rms≈517 m/s, an approximately 10-20% spread, not identical values. A
second, frequently overlooked point concerns the DISTRIBUTION FORMULA
itself: f(v)∝v²e^(−mv²/2k_BT) REQUIRES the v² factor — omitting it and
using only the Boltzmann factor e^(−mv²/2k_BT) alone would incorrectly
give f(0)≠0 (a nonzero probability density for speed exactly zero); the
CORRECT distribution has f(0)=0 exactly, because the v² factor represents
a genuine geometric effect: in 3D, the number of velocity VECTORS with a
given speed v is proportional to the surface area of a sphere of radius v
(4πv²), so there is only ONE way to have exactly zero speed (all velocity
components zero) but progressively MORE directional possibilities as
speed increases — this "density of states" factor creates the
characteristic peaked (not monotonically decreasing) shape of the speed
distribution, in contrast to the 1D velocity-component distribution
(which DOES peak at zero, correctly, since that's a genuinely different
quantity). A third point concerns the distribution's HIGH-SPEED TAIL:
though the fraction of molecules above, say, 3×v_rms is small
(approximately 10⁻⁵), this is NOT physically negligible — in a
macroscopic sample (a mole contains ~6×10²³ molecules), that tiny
fraction still represents roughly 6×10¹⁸ actual molecules, an enormous
number. This tail is not a mathematical curiosity to be ignored; it
DRIVES real physical processes — atmospheric escape of light gases
(hydrogen preferentially escapes Earth's gravity because a larger
fraction of its distribution's tail exceeds escape velocity than for
heavier gases like nitrogen), and especially chemical reaction rates,
which depend exponentially on the fraction of molecules in the
high-energy tail exceeding an activation energy. A fourth point addresses
temperature scaling: DOUBLING the absolute temperature does NOT double
the characteristic speeds — since average kinetic energy is directly
proportional to temperature (½mv_rms²=3/2 k_BT, so KE∝T), and kinetic
energy itself is proportional to v² (not v), it follows that
v²∝T→v∝√T — doubling T from 300K to 600K increases v_rms by a factor of
√2≈1.41, NOT by a factor of 2; to actually DOUBLE the speed would require
QUADRUPLING the absolute temperature.

## Mental Models

**Beginner**: "The most probable speed, mean speed, and RMS speed are all
basically the same (roughly 400-500 m/s for nitrogen); the speed
distribution is just the Boltzmann factor e^(−mv²/2k_BT); the high-speed
tail is essentially zero — no molecules move that fast; doubling the
temperature doubles the molecular speed." Upgrade trigger: computing all
three characteristic speeds explicitly for nitrogen at 300K (finding a
genuine 10-20% spread, not identical values) directly confronts the
same-speed assumption; computing f(0) with and without the v² factor
(finding the correct distribution requires f(0)=0) directly confronts the
missing-v²-factor assumption.

**Intermediate**: "v_p<⟨v⟩<v_rms always, due to the distribution's
right-skew; the v² geometric factor is essential for the correct
distribution shape, giving f(0)=0; the high-speed tail, while
exponentially small, represents billions of real molecules in any
macroscopic sample; speed scales as √T, not T, so doubling T only
increases speed by √2." This model correctly captures all four results,
but sometimes still needs to explicitly recompute the three
characteristic speeds' exact ratios when working an unfamiliar gas or
temperature.

**Advanced**: "Always distinguish which characteristic speed a problem is
asking for (v_p, ⟨v⟩, or v_rms) rather than treating them as
interchangeable; always account for the finite (if exponentially small)
tail fraction when reasoning about rare high-energy events in a
macroscopic sample; always apply v∝√T explicitly rather than assuming
linear temperature-speed scaling."

**Expert**: the full derivation of f(v) from the 3D velocity-space
Gaussian distribution via integration over spherical shells, and the
connection to reaction-rate theory (the Arrhenius equation's exponential
dependence on activation energy, directly built on this tail-fraction
reasoning) — a natural consolidation, not required for mastery.

## Why Students Fail

The dominant failure is treating v_p, ⟨v⟩, and v_rms as interchangeable,
missing that the distribution's right-skew orders them distinctly;
closely related failures include omitting the essential v² geometric
factor from the speed distribution (mistaking it for the raw Boltzmann
factor alone), dismissing the high-speed tail as physically negligible
despite the enormous molecule counts in real samples, and assuming speed
scales linearly with temperature rather than as its square root.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.stat.maxwell-boltzmann.md`,
Misconception Engine) documents four; reused by reference with birth-type
added.

- **MC-1 (the most probable speed, mean speed, and RMS speed are the
  same)**: believing "they're all about 400 m/s for nitrogen," treating
  the three characteristic speeds as identical. **Birth type**:
  perceptual intuition (Type 2) — since all three are computed from
  similar formulas involving √(k_BT/m) and give numerically similar
  values, students perceive them as the same quantity, missing the
  genuine ~10-20% spread caused by the distribution's right-skew. Probe:
  "For nitrogen at 300K, rank v_p, ⟨v⟩, v_rms from smallest to largest."
- **MC-2 (the speed distribution is missing the v² factor)**: believing
  "f(v) is just the Boltzmann factor e^(−mv²/2k_BT)," omitting the
  geometric density-of-states term. **Birth type**: instruction-induced
  (Type 5) — the Boltzmann factor is introduced first and applied
  directly to speed without considering the phase-space/geometric
  factor, since introductory treatments sometimes present the Boltzmann
  factor alone before the full speed distribution. Probe: "What is f(0)
  for the Maxwell-Boltzmann distribution? Should it be zero or
  positive?"
- **MC-3 (the high-speed tail is negligible)**: believing "essentially
  zero molecules move faster than [some threshold]," dismissing the tail
  as physically unimportant. **Birth type**: overgeneralization (Type 1)
  — the exponential decay of f(v) at high speed is correctly perceived as
  making the tail FRACTION small, but this is incorrectly generalized to
  the tail being physically negligible, missing that Avogadro's number
  of molecules makes even a tiny fraction represent billions of actual
  particles. Probe: "What fraction of N₂ molecules at 300K have speed
  greater than 3v_rms≈1550 m/s — and how many actual molecules does that
  fraction represent in a mole of gas?"
- **MC-4 (doubling the temperature doubles the mean speed)**: believing
  "hotter gas has twice the speed — temperature and speed are
  proportional." **Birth type**: overgeneralization (Type 1) — the
  correct proportionality between temperature and KINETIC ENERGY
  (KE∝T) is incorrectly extended to speed itself, missing that
  KE∝v² means v∝√T, not v∝T. Probe: "The temperature of a gas doubles
  from 300K to 600K. By what factor does v_rms change?"

## Analogies

**Best**: a lottery where buying an expensive ticket (high speed = high
kinetic energy) is exponentially more costly (the Boltzmann penalty), but
there are more TYPES of expensive tickets available (the v² geometric
density-of-states factor) — the distribution's peak is where these two
competing effects balance — directly targets MC-2 by giving a concrete
image of why the distribution isn't simply monotonically decreasing like
the bare Boltzmann factor.

**Anti-analogy**: do NOT say "molecules travel at speed v_rms — that's
the most common speed" — this directly installs MC-1 by conflating
v_rms (used for kinetic energy calculations) with v_p (the actual peak/
most-probable speed of the distribution).

## Demonstrations

Worked-example: compute v_p, ⟨v⟩, and v_rms explicitly for nitrogen at
300K, verifying the ordering v_p<⟨v⟩<v_rms numerically — directly
targets MC-1. Worked-example: compute v_rms at T=300K, 600K, and 1200K,
verifying √(600/300)=√2≈1.41 and √(1200/300)=2 — directly targets MC-4.

## Discovery Questions

Discovery-style: "if the fraction of molecules above 3×v_rms is only
about 1 in 100,000, but a mole of gas has 6×10²³ molecules, how many
actual molecules does that 'negligible' fraction represent?" — learner
computes the real molecule count, directly confronting MC-3.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-2 is addressed
first (establishing the correct distribution formula and its v² factor),
before MC-1 (the three characteristic speeds computed from that correct
distribution), before MC-4 (temperature-speed scaling), before MC-3 (the
physical significance of the tail) — this order builds from the correct
underlying formula to its derived statistics and physical consequences.

## Tutor Actions

WORKED-EXAMPLE (v_p, ⟨v⟩, v_rms computed and ranked for nitrogen at
300K); WORKED-EXAMPLE (v_rms computed at three temperatures verifying
√T scaling); ANALOGY (lottery ticket cost vs. availability balancing to
produce the distribution's peak).

## Voice Teaching Notes

Listen for treating the three characteristic speeds as identical, or
omitting the v² factor, or dismissing the high-speed tail as negligible,
or expecting linear temperature-speed scaling — the four direct
misconception tells. Load-bearing sentence: "the most probable, mean,
and RMS speeds are genuinely different — v_rms is highest — and speed
only grows as the SQUARE ROOT of temperature, so doubling temperature
only multiplies speed by about 1.4, not 2." Channel-reality caveats
owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner treating v_p, ⟨v⟩, v_rms as identical signals MC-1
(MISCONCEIVING, full repair via the explicit ranking worked example). A
learner omitting the v² factor signals MC-2 (full repair via the f(0)
computation). A learner dismissing the tail as negligible signals MC-3
(full repair via the molecule-count discovery question). A learner
expecting linear temperature-speed scaling signals MC-4 (full repair via
the three-temperature worked example). Mastery trigger: correctly
ranking the three characteristic speeds, AND correctly deriving/using the
v² factor, AND correctly reasoning about the tail's physical
significance, AND correctly applying v∝√T. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the full distribution for a second — if
kinetic energy is ½mv², and energy is proportional to T, what power of T
should v itself be proportional to?" (isolating the √T scaling before
computing full characteristic speeds). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (three distinct characteristic speeds ordered by skew; v²
geometric factor; tail significance despite exponential smallness; √T
scaling) bound to procedure (computing v_p, ⟨v⟩, v_rms and their
temperature dependence). Interleave with `phys.stat.boltzmann-factor`.

## Transfer Connections

Near: any molecular-speed or kinetic-theory-of-gases problem. Far:
chemistry (the Arrhenius equation's rate dependence on the high-energy
tail fraction, directly built on this distribution) and astrophysics
(atmospheric escape calculations comparing planets' escape velocities to
their atmospheric gases' speed distributions). Real-world: understanding
why Earth retains nitrogen and oxygen but has lost nearly all its
primordial hydrogen and helium to space, directly traceable to the
tail-fraction differences between light and heavy molecules. Expert: the
full 3D derivation via spherical-shell integration and the connection to
reaction-rate theory.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
chemistry (reaction rate theory, the Arrhenius equation) — recorded
honestly as a Curriculum Feedback item, not fixed (no KG file modified).

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

A real, if not KG-encoded, cross-subject connection exists to chemistry
(reaction rate theory) — recorded honestly, not fixed (no KG or
Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 13): initial authoring.

# Atomic Spectra and Energy Levels — `phys.mod.atomic-spectra`

## Identity

- **Concept ID**: `phys.mod.atomic-spectra` (canonical physics KG)
- **Curriculum location**: physics / modern physics — dependency level 12.
- **Prerequisites**: `phys.mod.bohr-model` — atomic spectra directly apply
  the already-secure quantized-energy-level structure of the Bohr model to
  explain observed emission and absorption lines.
- **Unlocks** (from KG): `phys.mod.radioactivity`, `phys.mod.energy-bands`
  — a genuine hub concept feeding both nuclear and solid-state physics.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly explain that absorption and emission
spectra from the SAME element show lines at the SAME wavelengths (per
Kirchhoff's laws), not different wavelengths — the two spectra are
complementary in APPEARANCE (bright lines on dark background for
emission, dark lines on bright continuous background for absorption) but
correspond to the identical set of allowed transition energies;
(2) correctly explain that the Balmer series does NOT include ALL of
hydrogen's spectral lines — it specifically covers only transitions
ending at n=2 (largely visible light); the Lyman series (ending at n=1,
ultraviolet) and Paschen series (ending at n=3, infrared) are separate,
equally real series covering different wavelength ranges; (3) correctly
explain that HIGHER principal quantum number n corresponds to HIGHER
(less negative) energy, even though the energy formula E_n=-13.6 eV/n²
produces more NEGATIVE numbers for smaller n — the ground state (n=1,
E₁=-13.6 eV) is the LOWEST energy state, and energy increases (becomes
less negative) as n increases, approaching E=0 eV at n=∞ (ionization);
(4) correctly explain that atomic emission does NOT require the atom to
be "very hot" — fluorescence, phosphorescence, and bioluminescence all
produce atomic/molecular emission at or near room temperature, via
excitation mechanisms other than thermal heating.

## Core Understanding

For any given element, the absorption spectrum and the emission spectrum
occur at the SAME set of wavelengths — this is Kirchhoff's law of
spectral analysis, and it follows directly from the SAME set of allowed
energy-level transitions being responsible for both: emission occurs when
an electron drops from a higher energy level to a lower one, releasing a
photon of the exact energy difference; absorption occurs when an electron
absorbs a photon of that SAME exact energy difference to jump from the
lower level to the higher one. The two spectra look complementary in
APPEARANCE — emission produces bright lines against a dark background,
while absorption produces dark lines against an otherwise continuous
bright background — but the WAVELENGTHS of the lines are identical for a
given element, not different. A second point concerns the naming and
scope of hydrogen's spectral series: the Balmer series (visible light)
covers ONLY transitions that end at the n=2 level — it is not synonymous
with "all of hydrogen's spectrum." Hydrogen has multiple other series:
the Lyman series (transitions ending at n=1, in the ultraviolet, higher
energy) and the Paschen series (transitions ending at n=3, in the
infrared, lower energy), among further series at higher n. Each series is
equally real and equally part of hydrogen's full spectrum; Balmer is
simply the historically first-discovered and only visible-light one. A
third, frequently inverted point involves the SIGN of the energy formula:
for hydrogen, E_n=-13.6 eV/n². Because of the negative sign, smaller n
values produce MORE NEGATIVE (numerically larger-magnitude but
algebraically smaller) energies — E₁=-13.6 eV is the LOWEST energy value
(most negative), representing the ground state, the most tightly bound
and lowest-energy configuretion. As n increases, E_n becomes LESS NEGATIVE
(e.g. E₂=-3.4 eV, E₃=-1.51 eV), meaning the energy is genuinely
INCREASING toward zero as n grows, reaching E=0 eV in the limit n→∞
(the ionization/free-electron limit, the HIGHEST energy state in this
scheme). Confusing "the number n=1 is small" with "the energy is small"
leads to the exact opposite (wrong) ordering. A fourth point: atomic
emission does not require an atom to be heated to a "very hot"
temperature — thermal excitation (as in a hot filament or the sun's
surface) is only ONE mechanism for populating excited states; ATOMIC/
MOLECULAR emission also occurs via fluorescence (absorbing higher-energy
light and re-emitting lower-energy light, often at room temperature),
phosphorescence (delayed emission after excitation, e.g. in glow-in-the-
dark materials), and bioluminescence (chemical-reaction-driven excitation
in living organisms, e.g. fireflies) — none of which require the emitting
material to be hot in the everyday thermal sense.

## Mental Models

**Beginner**: "Absorption and emission spectra for an element occur at
different wavelengths; the Balmer series is basically hydrogen's whole
spectrum; a smaller quantum number n means less energy since the energy
formula gives a smaller (more negative) number; atoms only emit light
when very hot." Upgrade trigger: comparing an element's measured
absorption-line wavelengths directly against its emission-line
wavelengths (finding them identical) directly confronts the different-
wavelengths assumption; computing E_n=-13.6/n² for n=1,2,3 and explicitly
ranking them from lowest to highest energy directly confronts the
sign-confusion assumption.

**Intermediate**: "Absorption and emission occur at the same wavelengths
for a given element, differing only in appearance; Balmer is one of
several hydrogen series (Lyman, Paschen, etc.), each covering different
transitions; energy increases (becomes less negative) as n increases,
with n=1 the lowest/ground state; emission can occur via non-thermal
mechanisms like fluorescence." This model correctly captures all four
results, but sometimes still needs to explicitly recompute E_n's sign
convention when first ranking energy levels in a new problem.

**Advanced**: "Always verify spectral wavelength correspondence via
Kirchhoff's law rather than assuming absorption/emission differ; always
explicitly rank E_n values by their actual sign and magnitude (not by n's
numerical size alone) before answering energy-ordering questions."

**Expert**: the full Rydberg formula 1/λ=R(1/n_f²-1/n_i²) unifying all of
hydrogen's series (Lyman, Balmer, Paschen, Brackett, Pfund) as different
choices of the final level n_f, directly connecting to the KG unlocks
`phys.mod.radioactivity` (nuclear energy-level transitions follow an
analogous, much-higher-energy quantized structure) and
`phys.mod.energy-bands` (solid-state extension of discrete levels into
continuous bands) — a natural consolidation, not required for mastery.

## Why Students Fail

The dominant failure is the sign-confusion around E_n=-13.6 eV/n²,
inverting the actual energy ordering by focusing on n's numerical size
rather than the algebraic sign and magnitude of E_n itself; closely
related failures include assuming absorption and emission spectra differ
in wavelength, treating the Balmer series as hydrogen's complete
spectrum, and assuming atomic emission universally requires high
temperature.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.atomic-spectra.md`,
Misconception Engine) documents four; reused by reference with birth-type
added.

- **MC-1 (absorption and emission spectra have different wavelengths)**:
  believing "the absorption spectrum and emission spectrum of an element
  occur at different wavelengths." **Birth type**: perceptual intuition
  (Type 2) — the visually different APPEARANCE of the two spectra (bright
  lines vs. dark lines) is mistaken for a difference in the actual
  wavelengths involved, rather than recognizing Kirchhoff's law that both
  correspond to the identical set of transition energies. Probe: "For a
  given element, do its absorption lines and emission lines occur at the
  same wavelengths, or different wavelengths?"
- **MC-2 (Balmer series includes all hydrogen lines)**: believing "the
  Balmer series is hydrogen's entire spectrum." **Birth type**:
  overgeneralization (Type 1) — the Balmer series' historical prominence
  (first discovered, visible light) is incorrectly extended to cover the
  full spectrum, missing the Lyman (UV) and Paschen (IR) series that also
  exist. Probe: "Does hydrogen only emit visible light (the Balmer
  series), or does it also emit in other regions like ultraviolet or
  infrared?"
- **MC-3 (higher energy means higher quantum number always, via a
  sign-confused reading)**: believing "n=3 is lower energy than n=1
  because -13.6/9 is a smaller number than -13.6/1" without correctly
  accounting for the negative sign — students sometimes state "n=3 is
  lower energy because the number is smaller," inverting the true
  ordering. **Birth type**: notation-induced (Type 4) — the negative sign
  in E_n=-13.6 eV/n² is easy to drop or misread when comparing magnitudes,
  causing the direction of the energy ordering to invert. Probe:
  "Between n=1 (E₁=-13.6 eV) and n=3 (E₃≈-1.51 eV), which state has the
  HIGHER energy?"
- **MC-4 (emission only occurs when an atom is very hot)**: believing
  "atoms only emit light if heated to a high temperature." **Birth type**:
  overgeneralization (Type 1) — the common thermal-emission example (a hot
  filament, the sun) is incorrectly generalized to ALL atomic emission,
  missing non-thermal mechanisms like fluorescence, phosphorescence, and
  bioluminescence that occur at or near room temperature. Probe: "Does a
  glow-in-the-dark object, or a firefly's light, require the material to
  be heated to a high temperature to emit light?"

## Analogies

**Best**: a staircase where each step has a specific height above the
ground (analogous to E_n), with the BOTTOM step (n=1) being the LOWEST
point (ground state, most negative/lowest energy) and each step UP (n
increasing) being HIGHER (less negative, more energy), approaching
ground level (E=0) only if you could somehow reach the "top" (n→∞,
ionization) — directly targets MC-3 by giving a concrete image of energy
increasing with n despite the confusing negative-number formula.

**Anti-analogy**: do NOT say "the Balmer lines are hydrogen's spectrum"
as an unqualified simplification — this directly installs MC-2 by
implying Balmer is the complete picture rather than one of several
series.

## Demonstrations

Conceptual: compare a hypothetical element's measured absorption-line
wavelengths side by side with its emission-line wavelengths, showing they
match exactly — directly targets MC-1. Worked-example: compute E₁, E₂,
E₃ explicitly from E_n=-13.6/n² and rank them from lowest to highest
energy — directly targets MC-3.

## Discovery Questions

Discovery-style: "if E_n=-13.6 eV/n² gives a MORE negative number for
n=1 than for n=3, which state actually has the lower energy — the one
with the bigger negative number, or the smaller one?" — learner reasons
through signed-number comparison, directly confronting MC-3.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-3 (the energy-
ordering sign confusion) is addressed first, since correctly ranking
energy levels is foundational to everything else in this concept, before
MC-1 (same-wavelength absorption/emission), before MC-2 (Balmer as only
one of several series), before MC-4 (non-thermal emission mechanisms) —
this order establishes the core quantitative framework before its
qualitative extensions and exceptions.

## Tutor Actions

WORKED-EXAMPLE (E₁, E₂, E₃ computed and ranked explicitly);
COMPARE-CONTRAST (absorption vs. emission spectra wavelength-by-
wavelength); ANALOGY (staircase with bottom step as lowest/ground state).

## Voice Teaching Notes

Listen for "n=3 is lower energy because the number is smaller" or
"absorption and emission have different wavelengths" or "Balmer is
hydrogen's whole spectrum" or "atoms only glow when hot" — the four
direct misconception tells. Load-bearing sentence: "the bigger negative
number is actually the LOWER energy — n=1 is the ground state, the
lowest rung on the ladder, and energy goes UP as n goes up." Channel-
reality caveats owned by `../foundations/03-voice-first-learning-model.md
§7`.

## Assessment Signals

A learner inverting the energy ordering by n's numerical size signals
MC-3 (MISCONCEIVING, full repair via the explicit E₁/E₂/E₃ ranking
worked example). A learner claiming different wavelengths for absorption
vs. emission signals MC-1. A learner treating Balmer as hydrogen's
complete spectrum signals MC-2. A learner requiring high temperature for
all emission signals MC-4. Mastery trigger: correctly ranking energy
levels by sign/magnitude, AND correctly identifying same-wavelength
absorption/emission, AND correctly distinguishing hydrogen's multiple
series, AND correctly citing non-thermal emission mechanisms. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — is -1 a bigger or
smaller number than -10?" (isolating basic signed-number comparison
before applying it to energy levels). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (energy increases with n despite the negative-sign formula;
Kirchhoff's same-wavelength law; multiple hydrogen series; non-thermal
emission mechanisms) bound to procedure (computing and ranking E_n
values). Interleave with `phys.mod.bohr-model`.

## Transfer Connections

Near: any hydrogen-spectrum or energy-level-transition problem. Far:
astrophysics (stellar absorption-line spectroscopy for determining
chemical composition of stars) and nuclear physics (quantized nuclear
energy levels, an analogous but much-higher-energy structure, feeding
directly into the KG unlock `phys.mod.radioactivity`). Real-world:
understanding how neon signs, fluorescent lighting, and glow-in-the-dark
materials all produce light without requiring high temperatures. Expert:
the full Rydberg formula unifying all hydrogen series.

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

- 2026-07-23 (physics EB Wave 12): initial authoring.

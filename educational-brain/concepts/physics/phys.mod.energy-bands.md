# Energy Bands in Solids — `phys.mod.energy-bands`

## Identity

- **Concept ID**: `phys.mod.energy-bands` (canonical physics KG)
- **Curriculum location**: physics / modern physics (semiconductor
  physics extension) — dependency level 19.
- **Prerequisites**: `phys.mod.atomic-spectra` (the isolated-atom
  discrete energy levels this concept builds beyond), `phys.stat.fermi-
  dirac` (the occupation-probability framework needed to distinguish
  band existence from band occupation).
- **Unlocks** (from KG): `phys.mod.semiconductor-classification`.
- **Difficulty**: advanced · **Bloom**: understand · **Mastery
  threshold**: 0.75 · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that bringing N atoms together
into a crystal forces each originally-sharp atomic energy level to split
into N closely-spaced sub-levels via the Pauli exclusion principle — for
a macroscopic crystal (~10²³ atoms), this splitting is dense enough to
form an effectively continuous band, a genuine physical consequence, not
merely isolated atoms sitting side by side unchanged; (2) correctly
distinguish band existence (which energies are structurally allowed)
from band occupation (which allowed states actually contain electrons,
governed separately by Fermi-Dirac statistics) — a band can be fully
occupied, empty, or partially filled, and partial filling is exactly
what makes metals conduct; (3) correctly explain that the band gap
represents genuinely forbidden energy — no electron state exists there
at all, under any circumstance — which is a fundamentally stronger claim
than "currently unoccupied," the way an allowed-but-empty state within a
band would be.

## Core Understanding

In a crystalline solid, the discrete energy levels of isolated atoms
broaden into continuous bands of allowed electron energy, separated by
band gaps of forbidden energy, and it is the size of these band gaps
(and how filled the resulting bands are) that ultimately determines
whether a material conducts electricity. A first persistent error
assumes atoms in a solid keep their own separate, unchanged discrete
energy levels, carrying forward isolated-atom intuition (Bohr model,
atomic spectra) without recognizing that combining atoms into one shared
quantum system forces the Pauli exclusion principle to split each
originally-identical level into N closely-spaced sub-levels — directly
observable in solid-state spectroscopy as continuous bands, not the
sharp lines of isolated atoms. A second error assumes a "band" is either
uniformly, fully occupied or that occupation doesn't meaningfully apply
within it, missing that band existence (a structural fact) and
occupation (a statistical fact governed by Fermi-Dirac statistics) are
two entirely separate questions — a metal's partially-filled band is
precisely what allows its electrons to move into nearby empty states and
conduct electricity easily. A third error treats the band gap as merely
"empty space" or "currently unoccupied," missing that it represents
energies that are structurally forbidden — no electron state exists
there at all under any circumstance, a fundamentally stronger and
different claim than an allowed-but-unoccupied state within a band, and
the reason band gap size (E_g) is the single most important number for
classifying a material's conductivity.

## Mental Models

**Beginner**: "Atoms in a solid keep their own separate, unchanged
energy levels; a band is either completely full or completely empty,
with no in-between; the band gap is just an empty region with nothing
special about it." Upgrade trigger: the coupled-pendulum demonstration
(one isolated pendulum's sharp frequency splitting into a spread of
coupled normal-mode frequencies the moment pendulums are connected)
directly confronts the unchanged-levels assumption; recalling that a
metal's conduction band is only partially filled at low temperature,
governed by Fermi-Dirac statistics, directly confronts the
all-or-nothing-occupation assumption; contrasting an empty-but-allowed
state within a band against a band-gap energy (where no state exists at
all) directly confronts the merely-empty-space assumption.

**Intermediate**: "Atomic levels split into N closely-spaced sub-levels
via Pauli exclusion when N atoms combine, forming bands for macroscopic
crystals; band existence and band occupation are separate questions,
connected via Fermi-Dirac statistics; the band gap is structurally
forbidden energy, not merely unoccupied energy." This model correctly
captures the three core distinctions but may still need practice
connecting band-gap size quantitatively to material classification
(conductor, insulator, semiconductor), which is the very next concept's
subject.

**Advanced**: always distinguish "no electron currently occupies this
state" (an allowed-but-empty state within a band) from "no electron
state exists at this energy at all" (the band gap), and always recall
Fermi-Dirac statistics explicitly when discussing which states within an
existing band are actually occupied.

**Expert**: the connection between band structure and a solid's optical
properties (a photon can only be absorbed by promoting an electron
across the band gap if the photon's energy is at least E_g, directly
explaining transparency versus opacity/color) and the emergent-behavior
pattern this exemplifies (an enormous collection of identical quantum
systems producing qualitatively new collective behavior) — not required
for mastery, natural bridge to `phys.mod.semiconductor-classification`.

## Why Students Fail

The dominant failure is assuming atoms in a solid retain their
isolated, unchanged discrete energy levels, missing that combining
atoms into one shared quantum system forces Pauli-exclusion-driven
level-splitting into bands; a closely related failure treats bands as
uniformly all-occupied-or-all-empty, missing that occupation is a
separate, Fermi-Dirac-governed question from band existence, and that
partial filling is exactly what enables metallic conduction; a further
failure treats the band gap as merely empty or unoccupied space, missing
that it represents a structurally forbidden energy range fundamentally
different from an allowed-but-empty state.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.energy-bands.md`,
Section 4 Misconception Library) documents three; reused by reference
with birth-type added.

- **MC-1 (atoms in a solid keep their own independent, unchanged
  levels)**: believing "each atom in the solid still has its own
  separate, unchanged energy levels." **Birth type**: overgeneralization
  (Type 1) — prior learning about isolated atomic energy levels is
  carried forward unchanged into the solid-state context, missing that
  combining atoms fundamentally alters the shared electron energy
  structure via Pauli exclusion. Probe: "When millions of identical
  atoms come together to form a solid crystal, do each of their
  electrons still occupy the exact same sharp, isolated-atom energy
  levels as before?"
- **MC-2 (a band is uniformly fully occupied, or occupation doesn't
  apply)**: believing "a band is just a range of energy — occupation
  isn't really something that varies within it." **Birth type**:
  notation-induced (Type 4) — introducing "band" as a purely structural,
  energy-range concept without immediately connecting it to the separate
  statistical question of occupation creates the impression that
  occupation is not a meaningful, varying property within a band. Probe:
  "Is a band always either completely full of electrons or completely
  empty, with no in-between possibility?"
- **MC-3 (the band gap is just empty, unoccupied space)**: believing
  "the band gap is just an empty region — nothing special about it
  structurally." **Birth type**: language contamination (Type 3) — "no
  electrons present" (which could describe an unoccupied but allowed
  state within a band) is conflated with "no electron states exist at
  all" (the actual, structural nature of the band gap). Probe: "Is the
  band gap simply a region where no electrons currently happen to be, the
  same way part of an allowed band might be temporarily unoccupied?"

## Analogies

**Best**: an orchestra tuning around one note — a single musician
playing a note produces one pure, sharp frequency (an isolated atom's
discrete level), while an enormous orchestra with every musician
attempting that exact same note, each with an infinitesimally different
tiny imperfection, produces a dense, continuous "smear" of extremely
closely related frequencies (a band); directly targets MC-1 by
grounding the level-splitting-into-a-band story in a physical,
non-mathematical-trick analog.

**Anti-analogy**: do NOT say "a band gap is just an energy range where
electrons happen not to be found right now" — this directly reinforces
MC-3; the band gap must always be described as structurally forbidden,
never merely currently unoccupied.

## Demonstrations

Worked-example: the one-atom → two-atom → many-atom level-splitting
progression, showing each originally-sharp atomic level splitting into
N sub-levels for N atoms, merging into an effectively continuous band
for a macroscopic crystal (~10²³ atoms) — directly targets MC-1 by
deriving band formation as a concrete, step-by-step consequence rather
than an asserted fact. Worked-example: a band diagram with occupation
shading — a valence band shaded to represent electron occupation, a
band gap left completely blank (no shading possible, representing genuine
forbiddenness), and a conduction band shaded lightly or not at all —
directly targets both MC-2 and MC-3 by making the allowed-occupied,
allowed-unoccupied, and forbidden three-way distinction visually
explicit.

## Discovery Questions

Discovery-style: "A single isolated atom of a given element always
produces the exact same sharp spectral lines. But bring 10²³ of those
atoms together into a solid crystal. What do you think happens to those
once-sharp energy levels?" — learner discovers (through the coupled-
pendulum progression) that levels split into bands as a direct
consequence of combining atoms, directly confronting MC-1 by deriving
the conclusion from a physical mechanism rather than being told the
fact.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (4 actions,
session_cap 4: level-splitting progression with the coupled-pendulum
demonstration directly probing MC-1 → band diagram with occupation
shading directly probing MC-2 and MC-3 → valence/conduction band
terminology explicitly connected to the Fermi-Dirac prerequisite →
photon-absorption-threshold transfer previewing the optical-property
application). MC-1 is addressed first via the level-splitting
progression, before MC-2 and MC-3 together via the band diagram with
occupation shading.

## Tutor Actions

WORKED-EXAMPLE (one-atom-to-many-atom level-splitting progression
building a band step by step); WORKED-EXAMPLE (band diagram with
occupation shading distinguishing valence band, band gap, and conduction
band); DEMONSTRATE (coupled-pendulum frequency-splitting physical
progression); THOUGHT-EXPERIMENT (photon-absorption threshold — only
photons with energy ≥E_g promote an electron across the gap, explaining
material transparency/opacity).

## Voice Teaching Notes

Listen for "each atom keeps its own separate levels" or "a band is
either totally full or totally empty" or "the band gap is just empty
space" — the three most frequent misconception tells. Load-bearing
sentence: "combining atoms into a solid isn't like placing separate,
independent atoms side by side — Pauli exclusion forces each originally
identical level to split into a spread of closely-packed sub-levels, a
band; whether states within that band are actually occupied is a
completely separate question, governed by Fermi-Dirac statistics; and
the band gap isn't 'currently empty but could be filled' — it's
structurally forbidden, meaning no electron state exists there at all,
under any circumstance." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming atoms in a solid keep unchanged, independent energy
levels signals MC-1 (full repair via the coupled-pendulum level-
splitting progression). A learner treating a band as strictly
all-or-nothing in occupation signals MC-2 (full repair via the band
diagram with occupation shading and the Fermi-Dirac recall). A learner
describing the band gap as merely unoccupied space signals MC-3 (full
repair via the allowed-empty-versus-forbidden side-by-side contrast).
Mastery trigger: correctly explaining why atomic levels split into bands
via Pauli exclusion, correctly distinguishing band occupation from band
existence, and correctly explaining why the band gap is genuinely
forbidden rather than merely unoccupied. Blueprint's Section 11
Assessment (FA-1 through FA-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "if a parking garage's total number of spaces is one
fact, and how many of those spaces currently have cars parked in them is
a completely separate fact, could a garage be built with a permanent
concrete median where no parking space could ever exist at all — and how
is that median different from an empty space?" (isolating the
allowed-existing/occupied, allowed-existing/empty, and
forbidden-nonexistent three-way distinction before reapplying it
specifically to band structure). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (Pauli exclusion forces level-splitting into bands for N
combined atoms; band existence and occupation are separate questions
connected via Fermi-Dirac statistics; band gap is structurally
forbidden, not merely unoccupied) bound to procedure (tracing the
one-atom-to-many-atom splitting progression; reading a band diagram's
shading to distinguish occupied, unoccupied-but-allowed, and forbidden
regions). Interleave with `phys.mod.atomic-spectra`, `phys.stat.fermi-
dirac`, and `phys.mod.semiconductor-classification`.

## Transfer Connections

Near: material classification (conductor, insulator, semiconductor)
using band gap size as the key parameter, developed fully in the very
next concept. Far: materials science and solar cell design (band-gap
engineering for optimal light absorption) and optical physics (why
materials have specific colors or transparency, directly tied to band
gap size relative to visible-photon energies). Real-world: every
semiconductor device (diodes, transistors, LEDs, solar cells) operates by
engineering specific band-gap properties built on this foundation.
Expert: the general emergent-behavior principle that combining an
enormous number of identical quantum systems produces qualitatively new
collective phenomena, recurring throughout condensed matter physics
(superconductivity, magnetism).

## Cross-Subject Connections

KG `cross_links` empty. No cross-subject connection currently
identified beyond the general emergent-collective-behavior pattern
already covered under Transfer Connections — recorded honestly as a null
finding for KG-level cross-links specifically, not fixed (no KG file
modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.mod.energy-
bands.md`, numbered-Section format). Reuses: Section 4 Misconception
Library by reference. Not restated: Section 0 Concept Metadata, Section
1 Concept Spine full formula derivations, Section 5 Explanation Library,
Section 7 Demonstration Library full walkthroughs, Section 8 Discovery
Lesson full sequence, Section 11 Assessment full item text, Section 12
Recovery Notes, Section 13 Memory and Review schedule, Section 14
Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisites, unlocks, and difficulty
calibration are internally consistent with this concept's role as the
entry point for the six-concept semiconductor-physics extension of the
Modern Physics domain.

## Version History

- 2026-07-23 (physics EB Wave 19): initial authoring.

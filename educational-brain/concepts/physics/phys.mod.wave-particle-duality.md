# Wave-Particle Duality — `phys.mod.wave-particle-duality`

## Identity

- **Concept ID**: `phys.mod.wave-particle-duality` (canonical physics KG)
- **Curriculum location**: physics / modern physics — dependency level 12.
- **Prerequisites**: `phys.mod.de-broglie` — duality directly generalizes
  the already-secure de Broglie relation (matter has a wavelength) into
  the full principle that BOTH light and matter exhibit wave AND particle
  behavior depending on the experiment.
- **Unlocks** (from KG): `phys.qm.wave-function` — a genuine bridge
  concept into full quantum mechanics.
- **Difficulty**: proficient · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly explain that a single electron passing
through a double slit does NOT physically "split" into two pieces that
recombine — single-electron-at-a-time experiments (e.g. the Hitachi 1989
video) show each electron arrives as ONE localized dot on the screen, and
only the accumulated PATTERN of many such dots builds up an interference
pattern; the wave behavior governs the PROBABILITY of where a whole,
unsplit electron lands; (2) correctly explain that placing a which-slit
detector does NOT destroy the interference pattern by mechanically
"bumping" or disturbing the electron — quantum eraser experiments show
the destruction is fundamentally about the availability of
WHICH-PATH INFORMATION, not mechanical disturbance; (3) correctly explain
that "wave-particle duality" does NOT mean light or matter "alternates"
between being a wave and being a particle — both wave-like and
particle-like properties are simultaneously present in the underlying
quantum description, with which one is OBSERVED depending on what the
experiment measures; (4) correctly explain that the de Broglie wavelength
λ=h/p is NOT the physical SIZE of the electron — an electron's classical
radius (~10⁻¹⁵ m or smaller, effectively pointlike) is unrelated to its de
Broglie wavelength, which depends on momentum and can be macroscopically
large or small independent of any physical extent of the particle.

## Core Understanding

In the famous double-slit experiment performed with electrons sent through
ONE AT A TIME, each single electron does NOT physically split at the two
slits and recombine on the other side — direct experimental evidence (the
1989 Hitachi single-electron video being the canonical example) shows each
electron arrives at the screen as a SINGLE, localized dot, exactly like a
particle hitting one point — there is no evidence of the electron dividing
into two lesser pieces. What IS wave-like is the STATISTICAL PATTERN built
up from many such single-particle detection events: as thousands of
individual electrons accumulate dot by dot, the overall distribution forms
the interference fringes predicted by wave theory — the wave describes
the PROBABILITY of where any one, entirely unsplit electron will land, not
a physical splitting of that electron's substance. A second, closely
related point: when physicists insert a which-slit detector to determine
which slit each electron actually passed through, the interference
pattern is destroyed — but NOT because the detector mechanically "bumps"
or physically disturbs the electron's trajectory. Quantum eraser
experiments (which can, after the fact, erase the which-path information
without any additional mechanical interaction) show that interference is
destroyed or restored based on the AVAILABILITY of which-path information
in principle, not on any specific mechanical jostling — this is a deeper,
information-theoretic feature of quantum mechanics, not a classical
disturbance story. A third point: the phrase "wave-particle duality" does
NOT mean a photon or electron "alternates" between being a wave sometimes
and a particle other times, as though switching identity — the correct
modern understanding is that the full quantum description (the wave
function) always carries BOTH wave-like properties (interference,
diffraction) and particle-like properties (discrete, localized detection
events) simultaneously — which properties an experiment reveals depends
on what that experiment is set up to measure, not on the object itself
alternating between two different "modes of being." Finally, the de
Broglie wavelength λ=h/p, while a genuine wavelength governing
interference behavior, is NOT the physical SIZE of the particle — an
electron's classical radius is vanishingly small (order 10⁻¹⁵ m or
effectively pointlike in all current experiments) regardless of its
speed, while its de Broglie wavelength depends entirely on its momentum
and can be large or small independent of that physical extent; confusing
"wavelength" with "size" conflates two entirely unrelated quantities.

## Mental Models

**Beginner**: "The electron must physically split into two halves at the
slits, one going through each, then recombining; the which-slit detector
destroys the pattern by bumping the electron; wave-particle duality means
the electron alternates between being a wave and a particle; the de
Broglie wavelength is the electron's actual size." Upgrade trigger:
watching the single-electron-accumulation video (each electron arriving
as one dot, pattern building over many electrons) directly confronts the
splitting assumption; learning about the quantum eraser (interference
destroyed/restored without any change in mechanical disturbance, purely
based on which-path information availability) directly confronts the
bumping assumption.

**Intermediate**: "Each electron arrives as a whole, undivided particle;
the interference pattern is a statistical/probabilistic result of many
such arrivals; destroying interference is about which-path information,
not mechanical disturbance; wave and particle properties are both present
simultaneously, not alternating; wavelength and physical size are
unrelated quantities." This model correctly captures all four results,
but sometimes still reaches for a "splitting" mental image when first
encountering the double-slit experiment.

**Advanced**: "Always distinguish the single-event outcome (one
localized detection) from the ensemble statistical pattern (interference)
when discussing quantum wave-particle behavior; always frame which-path
destruction of interference in terms of information availability, never
mechanical disturbance."

**Expert**: the full quantum-mechanical wave function formalism
(complex-valued, satisfying the Schrödinger equation, |ψ|² giving
detection probability) as the unified mathematical object underlying both
the wave-like interference and the particle-like discrete detection
events — a natural consolidation directly connecting to the KG unlock
`phys.qm.wave-function`, not required for mastery at this level.

## Why Students Fail

The dominant failure is imagining the electron physically splitting and
recombining at the double slit, rather than recognizing each electron
arrives whole and undivided, with the wave pattern emerging only
statistically from many such events; closely related failures include
attributing interference destruction to mechanical disturbance rather
than which-path information availability, imagining the particle
"alternates" between wave and particle identities rather than always
carrying both properties, and confusing the de Broglie wavelength with
the particle's physical size.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.wave-particle-duality.md`,
Misconception Engine) documents four; reused by reference with birth-type
added.

- **MC-1 (electron physically splits at the double slit)**: believing "the
  electron splits into two pieces at the slits, one going through each,
  then recombining on the other side." **Birth type**: analogy
  overextension (Type 6) — the water-wave analogy for interference (where
  a wave genuinely does split and recombine) is incorrectly extended to
  the electron itself as a physical object, rather than recognizing the
  electron as a single, undivided detection event with only its
  PROBABILITY governed by wave mathematics. Probe: "In a single-electron
  double-slit experiment, does the electron detected on the screen arrive
  as one dot, or as a smeared/split pattern from one electron alone?"
- **MC-2 (measuring which slit destroys the wave by mechanically bumping
  it)**: believing "the which-slit detector destroys interference because
  it physically disturbs/bumps the electron off course." **Birth type**:
  perceptual intuition (Type 2) — everyday intuition assumes any
  measurement must involve physical contact/disturbance, missing the
  deeper information-theoretic mechanism revealed by quantum eraser
  experiments. Probe: "Quantum eraser experiments can restore interference
  after the fact, without changing any mechanical interaction with the
  particle. Does this suggest interference loss is about mechanical
  disturbance, or about information availability?"
- **MC-3 (wave-particle duality means light/matter alternates)**:
  believing "the electron sometimes IS a wave and sometimes IS a
  particle, switching between two identities." **Birth type**: language
  contamination (Type 3) — the everyday meaning of "duality" (switching
  between two states) is incorrectly mapped onto the technical meaning,
  which is that BOTH properties are always present in the underlying
  description; which is OBSERVED depends on the experiment. Probe: "Does
  an electron switch back and forth between 'being a wave' and 'being a
  particle,' or does it always have both kinds of properties, with the
  experiment determining which one is revealed?"
- **MC-4 (de Broglie wavelength is the size of the electron)**: believing
  "the de Broglie wavelength λ=h/p tells you how physically big the
  electron is." **Birth type**: language contamination (Type 3) — the word
  "wavelength" carries an everyday connotation of spatial extent, which is
  incorrectly mapped onto the electron's physical size, rather than
  correctly understood as a quantity governing interference/diffraction
  behavior, unrelated to the electron's (effectively pointlike, ~10⁻¹⁵ m)
  classical radius. Probe: "If an electron's de Broglie wavelength is
  1 nanometer, does that mean the electron itself is about 1 nanometer
  across?"

## Analogies

**Best**: a chalk dust cloud settling grain by grain, where each single
grain lands at one discrete point (like a whole, undivided electron
detection event), but the ACCUMULATED PATTERN of thousands of grains
traces out a shape determined by air currents (analogous to the
probability wave) — directly targets MC-1 by separating the discrete,
whole nature of each individual event from the statistical, wave-governed
pattern of many events.

**Anti-analogy**: do NOT say "the electron is like a water wave splitting
at the slits" without immediately clarifying that this describes only the
PROBABILITY, not the electron's physical substance — this directly
installs MC-1 by implying literal physical splitting.

## Demonstrations

Conceptual: walk through the single-electron double-slit accumulation
sequence (dot by dot, pattern emerging only after many electrons) —
directly targets MC-1. Conceptual: describe the quantum eraser setup
(which-path information can be erased after detection, restoring
interference, with no change to any mechanical interaction) — directly
targets MC-2.

## Discovery Questions

Discovery-style: "if a single electron always arrives as one dot, never
as a smear or a fraction of a dot, what does the interference PATTERN
built from many electrons actually represent?" — learner reasons through
the probability-vs-substance distinction, directly confronting MC-1.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-1 is addressed
first (establishing single-electron wholeness and the statistical nature
of the interference pattern), before MC-2 (which-path information vs.
mechanical disturbance), before MC-3 (duality as simultaneous properties,
not alternation), before MC-4 (wavelength vs. physical size) — this order
builds from the most concrete experimental observation to the most
abstract conceptual distinctions.

## Tutor Actions

WORKED-EXAMPLE (single-electron accumulation sequence, dot by dot);
THOUGHT-EXPERIMENT (quantum eraser, which-path information availability);
ANALOGY (chalk dust cloud settling grain by grain).

## Voice Teaching Notes

Listen for "the electron splits" or "the detector bumps the electron" or
"it switches between wave and particle" or "the wavelength is its size" —
the four direct misconception tells. Load-bearing sentence: "every
electron arrives as one whole dot — the wave only describes the odds of
where that one dot lands, and duality means both properties are always
there, not that it switches between them." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing physical splitting/recombination signals MC-1
(MISCONCEIVING, full repair via the single-electron accumulation
demonstration). A learner attributing interference loss to mechanical
bumping signals MC-2 (full repair via the quantum eraser thought
experiment). A learner describing alternation between wave/particle
identity signals MC-3. A learner equating wavelength with physical size
signals MC-4. Mastery trigger: correctly describing single-electron
wholeness, information-based which-path destruction, simultaneous
wave/particle properties, and the wavelength/size distinction. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the pattern for a second — when ONE electron
hits the screen, does it make one dot, or a blurry smear?" (isolating the
single-event wholeness before discussing the accumulated pattern). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (single-event wholeness vs. statistical wave pattern;
information-based which-path destruction; simultaneous properties, not
alternation; wavelength ≠ size) bound to procedure (interpreting
double-slit accumulation sequences). Interleave with `phys.mod.de-broglie`
and, once authored, `phys.qm.wave-function`.

## Transfer Connections

Near: any double-slit or which-path interference problem. Far: quantum
computing (superposition and measurement-induced collapse directly
generalizing the which-path information principle) and electron
microscopy (exploiting the wave nature of electrons for imaging at scales
far below optical wavelengths). Real-world: understanding why electron
microscopes can resolve much finer detail than light microscopes, tracing
directly to the de Broglie wavelength being much shorter than visible
light's. Expert: the full wave-function formalism unifying both wave and
particle behavior mathematically.

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

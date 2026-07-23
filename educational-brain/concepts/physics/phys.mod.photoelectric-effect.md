# Photoelectric Effect — `phys.mod.photoelectric-effect`

## Identity

- **Concept ID**: `phys.mod.photoelectric-effect` (canonical physics KG)
- **Curriculum location**: physics / modern physics — dependency level 9.
  First Modern Physics domain concept authored in this program; entry
  point reached via the classical electromagnetism capstone.
- **Prerequisites**: `phys.em.electromagnetic-waves` — the photoelectric
  effect is the historical phenomenon that FORCED physics beyond the
  already-secure classical wave picture of light, requiring the photon
  (particle) model instead.
- **Unlocks** (from KG): `phys.mod.photons` — a genuine hub concept, the
  entry into quantized-light reasoning.
- **Difficulty**: proficient · **Bloom**: analyze · **Mastery threshold**: 0.85
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly state that increasing light INTENSITY
increases the NUMBER of photoelectrons emitted per second, but does NOT
increase their maximum kinetic energy — which depends only on frequency,
directly contradicting the classical wave-model expectation that "more
light energy" should mean "faster electrons"; (2) correctly state that
below the threshold frequency, NO electrons are ever emitted, REGARDLESS
of intensity or exposure time — a genuinely different, non-classical
prediction, since classically one would expect energy to slowly
accumulate until eventually sufficient; (3) correctly apply the stopping
potential's sign convention correctly (it DECELERATES/retards emitted
electrons, it does not accelerate them); (4) correctly state that the
work function φ varies by MATERIAL — it is not a universal constant, and
different metals have genuinely different threshold frequencies.

## Core Understanding

The photoelectric effect delivers several experimental results that
directly CONTRADICT the classical (wave) model of light and require the
photon (quantized-energy) model instead. First: increasing light
INTENSITY increases the NUMBER of photoelectrons emitted per second
(more photons arriving means more electron-ejection events), but does
NOT increase their maximum kinetic energy at all — maximum KE depends
ONLY on the light's FREQUENCY (via KE_max=hf-φ), a result the classical
wave model cannot explain (classically, more intense light carries more
energy, which "should" produce more energetic electrons). Second, and
even more strikingly non-classical: below a material-specific THRESHOLD
frequency, absolutely NO electrons are ever emitted, no matter how
intense the light or how long it shines — classically, one would expect
sufficient exposure time to eventually accumulate enough energy for
emission, but experimentally this simply never happens below threshold,
regardless of intensity or duration. Third, a specific and easily-reversed
sign-convention error: the STOPPING potential in a photoelectric
experiment is applied specifically to RETARD (decelerate) the emitted
electrons, not accelerate them — a positive stopping potential applied
to the collector opposes the electrons' motion, stopping progressively
more of them as its magnitude increases, the OPPOSITE of the everyday
vacuum-tube intuition that positive voltage attracts/accelerates
electrons toward it. Fourth: the work function φ (minimum energy needed
to eject an electron) is a genuinely MATERIAL-SPECIFIC property, NOT a
universal constant — sodium's work function (≈2.3 eV, visible-green
threshold) differs dramatically from platinum's (≈5.7 eV, deep-UV
threshold), meaning the identical light source can eject electrons from
one metal but not another.

## Mental Models

**Beginner**: "Brighter light should give faster (more energetic)
electrons, since it carries more energy; leaving dim below-threshold
light on long enough should eventually eject electrons; positive
stopping voltage should accelerate electrons toward the collector; the
threshold frequency should be the same for any metal." Upgrade trigger:
examining the actual experimental data (intensity affects only electron
COUNT, not their max KE) directly confronts the brighter-faster
assumption; considering that below-threshold light NEVER ejects
electrons regardless of exposure time directly confronts the
accumulation assumption; carefully tracing the stopping-potential's
actual retarding role directly confronts the accelerates-electrons
assumption; comparing sodium's and platinum's genuinely different work
functions directly confronts the universal-threshold assumption.

**Intermediate**: "Intensity → electron count; frequency → electron
energy (KE_max=hf-φ); below threshold, nothing happens no matter how
long you wait; stopping potential retards, doesn't accelerate; work
function is material-specific." This model correctly captures all four
results, but sometimes still reaches for "more energy, more effect"
wave-model reasoning by default when first encountering a new
photoelectric scenario.

**Advanced**: "Every photoelectric prediction should be checked against
the photon (particle) model specifically — each photon carries a fixed
energy hf, delivered as an indivisible packet; more photons (higher
intensity) means more emission EVENTS, never a bigger energy PACKET per
event."

**Expert**: Einstein's full photoelectric equation, KE_max=hf-φ, as the
direct historical foundation establishing the photon concept, later
generalized into the full quantum-mechanical treatment of
light-matter interaction — a natural consolidation directly connecting to
the KG unlock `phys.mod.photons`, not required for mastery.

## Why Students Fail

The dominant failure is applying classical wave-model reasoning ("more
light energy, more energetic electrons" and "enough time, enough
accumulated energy") to a phenomenon that specifically refutes that
model; secondary failures include a reversed sign convention for the
stopping potential and an assumption that the work function is a
universal rather than material-specific constant.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.photoelectric-effect.md`,
Misconception Engine, MC-1 through MC-4) documents four; reused by
reference with birth-type added.

- **MC-1 (MC-BRIGHTER-LIGHT-FASTER-ELECTRONS)**: believing brighter light
  gives faster electrons. **Birth type**: overgeneralization (Type 1) —
  the wave-model intuition "more light = more energy = more energetic
  electrons," correct for many other energy-transfer contexts, is
  incorrectly extended to the photoelectric effect, where intensity
  affects only electron count. Probe: "You double the intensity of light
  above threshold frequency. What happens to the number of electrons
  emitted, and to their maximum kinetic energy?"
- **MC-2 (MC-ANY-FREQUENCY-WORKS-WITH-ENOUGH-INTENSITY)**: believing
  leaving below-threshold light on long enough should eventually eject
  electrons. **Birth type**: overgeneralization (Type 1) — classical
  energy-accumulation reasoning (correct for many other physical
  processes) is incorrectly extended to the photoelectric effect, where
  no accumulation occurs at all below threshold. Probe: "Will an
  extremely bright, below-threshold-frequency lamp eventually eject
  electrons if left on for an hour?"
- **MC-3 (MC-STOPPING-POTENTIAL-ACCELERATES-ELECTRONS)**: believing
  positive stopping potential accelerates electrons toward the
  collector. **Birth type**: analogy overextension (Type 6) — the
  correct vacuum-tube intuition that positive voltage attracts/
  accelerates electrons is incorrectly extended to the stopping-potential
  setup, which is specifically designed to retard electrons. Probe: "A
  +2V stopping potential is applied to the collector. Does this
  accelerate or decelerate the emitted electrons?"
- **MC-4 (MC-WORK-FUNCTION-IS-FIXED-FOR-ALL-METALS)**: treating the work
  function as a universal constant, the same for any metal. **Birth
  type**: overgeneralization (Type 1) — other universal physical
  constants (like Planck's constant or the speed of light) are correctly
  understood as fixed, and this expectation is incorrectly extended to
  the work function, which is genuinely material-dependent. Probe: "Do
  sodium and platinum have the same threshold frequency when illuminated
  by the same UV source?"

## Analogies

**Best**: a vending machine requiring an exact minimum coin value to
dispense an item — feeding it many small coins (high intensity of
below-threshold-energy photons) never triggers dispensing no matter how
many you insert, but a single sufficient coin (one above-threshold
photon) works immediately — directly targets MC-2 by making the
all-or-nothing, per-photon nature of the interaction concrete.

**Anti-analogy**: do NOT say "more light means more energy delivered,
so electrons should come out faster" as a bridging simplification — this
directly installs MC-1 by reinforcing the refuted wave-model
expectation.

## Demonstrations

Data-based: examine actual photoelectric current-vs-intensity and
KE_max-vs-frequency graphs, showing intensity affects only current
(electron count), never KE_max — directly targets MC-1. Conceptual:
trace what happens (nothing) when below-threshold light of arbitrary
intensity/duration is applied — directly targets MC-2. Worked-example:
trace the stopping-potential circuit, showing the collector's positive
potential specifically opposes/retards electron arrival — directly
targets MC-3. Data comparison: compare sodium's (≈2.3 eV) and
platinum's (≈5.7 eV) work functions directly — targets MC-4.

## Discovery Questions

Discovery-style: "if you shine an extremely bright but below-threshold-
frequency lamp on a metal for a full hour, will electrons eventually be
emitted?" — learner reasons through the photon (not accumulated-energy)
model, directly confronting MC-2.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-1 and MC-2 are
addressed together first (establishing the core photon-model departure
from classical wave predictions — intensity affects count, not energy;
threshold is absolute, not accumulation-based), before MC-3 (a narrower
sign-convention detail) and MC-4 (a material-property clarification),
since the core conceptual break from classical physics should be secured
before addressing these more specific procedural/factual points.

## Tutor Actions

WORKED-EXAMPLE (KE_max=hf-φ applied across varying intensity and
frequency; stopping-potential circuit analysis); DATA-ANALYSIS
(intensity-vs-current and frequency-vs-KE_max graphs); COMPARE-CONTRAST
(sodium vs. platinum work functions).

## Voice Teaching Notes

Listen for "brighter light, faster electrons" or "eventually it'll work"
reasoning about below-threshold light — the clearest wave-model-holdover
tells. Load-bearing sentence: "intensity is about HOW MANY photons
arrive, not how much energy each one carries — and below threshold,
no amount of waiting helps at all." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner predicting faster electrons from brighter light signals MC-1
(MISCONCEIVING, full repair via the intensity-vs-frequency data
comparison). A learner expecting eventual emission below threshold
signals MC-2 (full repair via the vending-machine analogy). A learner
reversing the stopping-potential sign convention signals MC-3 (full
repair via the circuit analysis). A learner treating work function as
universal signals MC-4 (full repair via the sodium/platinum comparison).
Mastery trigger: correctly applying KE_max=hf-φ, AND correctly
predicting zero emission below threshold regardless of intensity/time.
Blueprint's assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget intensity for a second — according to the
photon model, does EACH photon carry a FIXED amount of energy (hf), or
does that energy depend on how bright the overall beam is?" (isolating
the per-photon energy fact before discussing aggregate intensity
effects). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (photon model's departure from classical wave predictions;
material-specific work function) bound to procedure (KE_max=hf-φ
calculation). Interleave with `phys.em.electromagnetic-waves` and, once
authored, `phys.mod.photons` (the direct KG unlock).

## Transfer Connections

Near: any photoelectric-effect calculation problem, including threshold
frequency determination. Far: solar panel engineering (photovoltaic
cells directly exploiting photon-electron interactions) and quantum
technology (photodetectors and photomultiplier tubes relying on this
exact mechanism). Real-world: understanding why certain solar panel
materials respond only to specific light frequencies, not simply
"brighter is always better." Expert: Einstein's photoelectric equation
as the historical foundation of the photon concept and quantum theory of
light.

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

- 2026-07-23 (physics EB Wave 9): initial authoring.

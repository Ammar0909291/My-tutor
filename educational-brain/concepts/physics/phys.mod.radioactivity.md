# Radioactivity: Alpha, Beta, Gamma Decay — `phys.mod.radioactivity`

## Identity

- **Concept ID**: `phys.mod.radioactivity` (canonical physics KG)
- **Curriculum location**: physics / modern physics — dependency level 13.
- **Prerequisites**: `phys.mod.atomic-spectra` — radioactivity is
  distinguished from the already-secure atomic-spectra transitions by
  scale and location: nuclear rather than electronic processes.
- **Unlocks** (from KG): `phys.mod.radioactive-decay` — a direct
  continuation into decay kinetics (half-life, decay law).
- **Difficulty**: proficient · **Bloom**: understand · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that radioactivity is a NUCLEAR
process, NOT an electron process — the alpha/beta particles and gamma
photons emitted come from rearrangements INSIDE the nucleus (energy scale
~MeV), fundamentally different from and a million times more energetic
than the electron-shell transitions that produce atomic spectra (energy
scale ~eV); (2) correctly explain that beta-minus decay REQUIRES an
antineutrino, n→p+e⁻+ν̄ₑ, NOT simply n→p+e⁻ — the observed CONTINUOUS
beta energy spectrum (rather than a single fixed energy) is direct
experimental proof that a third particle shares the energy and momentum;
(3) correctly explain that danger from radiation depends on BOTH type
AND exposure route — alpha is LOW-penetration/HIGH-ionizing (dangerous
if ingested, harmless externally), gamma is HIGH-penetration/LOW-ionizing
(dangerous externally) — "more energetic" does NOT simply mean "more
dangerous" without specifying the exposure context; (4) correctly
distinguish beta-plus decay (which changes the ELEMENT, Z decreases by 1)
from gamma decay (which does NOT change the element, same Z, only
nuclear energy state changes) — both leave mass number A unchanged, but
only beta-plus changes which element is present.

## Core Understanding

Radioactivity is fundamentally a NUCLEAR phenomenon, NOT an electron
phenomenon — this distinction matters because students who have just
learned that atomic spectra arise from ELECTRON transitions between
shells (energy scale ~1-10 eV) often generalize incorrectly to
radioactivity, assuming "electrons jump and release radiation." In
reality, an alpha particle is ⁴₂He — two protons and two neutrons, purely
NUCLEAR constituents; radium-226's nucleus (88 protons, 138 neutrons)
loses 2 protons and 2 neutrons in alpha decay, becoming radon-222 (86
protons, 136 neutrons) — a change in the NUCLEUS, with electron shells
merely rearranging afterward as a secondary consequence, never the
source. The energy scale confirms this: radioactive decay releases ~MeV
per event, roughly a MILLION times the ~eV energy scale of atomic
spectral transitions — a difference of scale that reflects a difference
of location (nucleus vs. electron shell). A second critical point
concerns beta-minus decay: the naive equation n→p+e⁻ is INCOMPLETE — it
must include an antineutrino, n→p+e⁻+ν̄ₑ. The historical evidence for
this is the observed BETA ENERGY SPECTRUM, which is CONTINUOUS
(a distribution of electron kinetic energies), not a single fixed value
as energy-momentum conservation would require for a simple two-body
decay (n→p+e⁻ alone). Pauli proposed the neutrino in 1930 specifically to
explain this continuous spectrum — a third particle sharing the released
energy resolves what looked like a violation of energy conservation. A
third point addresses radiation danger: "alpha is more energetic per
particle, therefore more dangerous" is an incomplete and often WRONG
generalization — danger depends on BOTH the radiation's ionizing/
penetrating properties AND the exposure route. Externally, alpha
particles are stopped by dead skin (harmless), while gamma rays penetrate
to internal organs (dangerous) — so for EXTERNAL exposure, gamma is more
dangerous. But if INGESTED, alpha deposits all its energy in a tiny
tissue volume (extremely high local ionization density, RBE≈20 vs. ≈1 for
gamma) — making internal alpha exposure far MORE dangerous than internal
gamma. A fourth point distinguishes two decay types that both leave mass
number A unchanged but differ critically in whether the ELEMENT changes:
gamma decay (ᴬZX*→ᴬZX+γ) leaves the nucleus's proton number Z unchanged —
same element, only the nuclear energy state drops; beta-plus decay
(ᴬZX→ᴬZ₋₁Y+e⁺+νₑ) DECREASES Z by 1 — a genuinely NEW element is formed
(e.g. sodium-22 becomes neon-22). Confusing these — because both keep A
the same — misses that only beta-plus actually transmutes the element.

## Mental Models

**Beginner**: "Radioactivity comes from electrons jumping, like atomic
spectra; beta decay is just n→p+e⁻, no third particle needed; alpha is
the most dangerous radiation since it's the most energetic; beta-plus
decay doesn't change the nucleus since Z 'doesn't change' the same way
gamma decay doesn't." Upgrade trigger: computing radioactive decay's ~MeV
energy scale against atomic spectra's ~eV scale (a million-fold
difference) directly confronts the electron-jump assumption; examining
the observed continuous beta spectrum (impossible for a simple two-body
decay) directly confronts the no-neutrino assumption.

**Intermediate**: "Radioactivity is a nuclear process (~MeV), distinct
from electron transitions (~eV); beta-minus decay requires n→p+e⁻+ν̄ₑ to
explain the continuous energy spectrum; radiation danger depends on both
ionizing power and exposure route, not energy alone; beta-plus decay
changes the element (Z decreases by 1) while gamma decay does not." This
model correctly captures all four results, but sometimes still needs to
explicitly write out full decay equations with Z values to verify which
decays change the element.

**Advanced**: "Always classify a radioactive process by its ENERGY SCALE
and LOCATION (nucleus vs. electron shell) before reasoning about
mechanism; always check both radiation type and exposure route (internal
vs. external) before assessing danger; always verify Z on both sides of
a decay equation to determine if the element has changed."

**Expert**: the full nuclear stability landscape (binding energy per
nucleon, the valley of stability, why heavy/light nuclei favor different
decay modes) directly connecting to the KG unlock
`phys.mod.radioactive-decay`'s half-life and decay-law framework, not
required for mastery.

## Why Students Fail

The dominant failure is generalizing from atomic-spectra electron
transitions to radioactivity, missing that radioactive decay is a purely
nuclear process at a vastly different energy scale; closely related
failures include omitting the antineutrino from beta-minus decay (missing
the continuous-spectrum evidence), conflating "more energetic" with "more
dangerous" without considering exposure route, and confusing beta-plus
decay (which transmutes the element) with gamma decay (which does not).

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.radioactivity.md`,
Misconception Engine) documents four; reused by reference with birth-type
added.

- **MC-1 (radioactivity comes from electrons in the atom)**: believing
  "the electrons jump and release radiation," generalizing from atomic
  spectra. **Birth type**: overgeneralization (Type 1) — the recently
  learned electron-transition mechanism for atomic spectra is incorrectly
  extended to radioactivity, missing the vastly different energy scale
  and nuclear (not electronic) location. Probe: "When radium decays by
  alpha emission, what part of the atom does the alpha particle come
  from?"
- **MC-2 (neutrinos don't need to be included in beta decay)**: believing
  "beta decay: neutron → proton + electron," omitting the antineutrino.
  **Birth type**: instruction-induced (Type 5) — introductory
  presentations often state beta-minus decay without mentioning the
  antineutrino (since neutrinos are hard to detect), leaving students
  with an incomplete equation. Probe: "Balance the beta-minus decay of
  ¹⁴C. Is lepton number conserved without the antineutrino?"
- **MC-3 (alpha particles are more dangerous than gamma rays because they
  carry more energy)**: believing "alpha is the most energetic, so it's
  the most harmful," without considering exposure route. **Birth type**:
  overgeneralization (Type 1) — a general "more energy = more danger"
  heuristic is applied without the necessary qualification of internal
  vs. external exposure, where the correct answer inverts depending on
  route. Probe: "A gamma source and an alpha source with equal activity —
  which is more dangerous to hold in your hand, and which to
  accidentally ingest?"
- **MC-4 (beta-plus decay is the same as gamma decay because Z doesn't
  change)**: believing "positron emission doesn't change the nucleus,"
  confusing beta-plus with gamma decay. **Birth type**: language
  contamination (Type 3) — the vague phrase "nucleus emits a particle"
  fails to specify that beta-plus decay changes Z (a new element) while
  gamma decay does not, causing the two processes' shared feature
  (unchanged A) to be mistaken for a shared feature in Z as well. Probe:
  "In beta-plus decay of ²²Na, does the atomic number change? Compare to
  gamma decay of ⁶⁰Co*."

## Analogies

**Best**: an overstuffed backpack that reaches stability either by
removing a heavy subgroup of items (alpha decay), swapping an item for a
different one (beta decay, neutron converts to proton), or simply
settling its contents without removing anything (gamma decay, energy
released without composition change) — directly targets MC-1 by
grounding all three decay types as nuclear (composition/energy)
rearrangements, not electron transitions.

**Anti-analogy**: do NOT say "radioactivity is like burning — the
nucleus is on fire" — burning is a chemical, electron-scale process
(~eV), while radioactivity is nuclear (~MeV, six orders of magnitude more
energetic) — this directly installs MC-1 by conflating the two
mechanisms and scales.

## Demonstrations

Conceptual: write the decay equation ²²⁶Ra→²²²Rn+⁴He explicitly, showing
Z decreases by 2 (a nuclear/proton-count change, not an electron
change) — directly targets MC-1. Conceptual: compare the discrete alpha
energy spectrum (two-body decay) to the continuous beta energy spectrum
(three-body decay including the antineutrino) — directly targets MC-2.

## Discovery Questions

Discovery-style: "a gamma source and an alpha source with equal activity
— which is more dangerous to hold in your bare hand, and which is more
dangerous to accidentally swallow?" — learner reasons through
penetration vs. ionizing power by exposure route, directly confronting
MC-3.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-1 is addressed
first (establishing radioactivity as nuclear, not electronic), before
MC-2 (the antineutrino's necessity), before MC-3 (danger depends on
route, not just energy), before MC-4 (beta-plus vs. gamma distinction) —
this order builds from the most foundational scale/location distinction
to progressively more specific decay-type distinctions.

## Tutor Actions

WORKED-EXAMPLE (²²⁶Ra→²²²Rn+⁴He decay equation with Z tracked);
COMPARE-CONTRAST (discrete alpha spectrum vs. continuous beta spectrum;
beta-plus vs. gamma decay equations with Z values); DEMONSTRATION
(penetration experiment: paper/Al/Pb shielding layers).

## Voice Teaching Notes

Listen for "electrons cause radioactivity" or omitting the antineutrino
from beta decay, or "alpha is always most dangerous," or confusing
beta-plus with gamma decay — the four direct misconception tells.
Load-bearing sentence: "radioactivity happens in the nucleus, not the
electron shells — a million times more energy — and beta decay needs
that invisible third particle, the antineutrino, to make the numbers
balance." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner attributing radioactivity to electron transitions signals MC-1
(MISCONCEIVING, full repair via the decay-equation Z-tracking
demonstration). A learner omitting the antineutrino signals MC-2 (full
repair via the discrete-vs-continuous spectrum comparison). A learner
treating alpha as universally more dangerous signals MC-3 (full repair
via the exposure-route discovery question). A learner conflating
beta-plus with gamma decay signals MC-4. Mastery trigger: correctly
identifying radioactivity as nuclear, AND correctly including the
antineutrino in beta-minus decay, AND correctly reasoning about danger by
exposure route, AND correctly distinguishing beta-plus from gamma decay
by element change. Blueprint's assessment component cited for the full
item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the equation for a second — is an alpha
particle (two protons, two neutrons) an electron, or a nuclear
fragment?" (isolating the nuclear-vs-electronic distinction before
discussing energy scales). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (nuclear vs. electronic scale/location; antineutrino necessity;
route-dependent danger; beta-plus transmutes the element, gamma does
not) bound to procedure (writing and balancing decay equations with A
and Z tracked). Interleave with `phys.mod.atomic-spectra` and, once
authored, `phys.mod.radioactive-decay`.

## Transfer Connections

Near: any nuclear decay equation-balancing problem. Far: nuclear medicine
(selecting isotopes emitting penetrating radiation, e.g. gamma or
positron-annihilation photons, for external detection in imaging) and
radiation protection engineering (different shielding/handling strategies
for alpha vs. gamma sources). Real-world: understanding why radon gas
(an alpha emitter) is a serious indoor health hazard specifically because
it can be INHALED (internal exposure), unlike its harmlessness as an
external source. Expert: the nuclear stability landscape and half-life
decay-law framework.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists: nuclear
medicine and radiation biology (chemistry/biology) directly depend on
this concept's decay-type/danger distinctions — recorded honestly as a
Curriculum Feedback item, not fixed (no KG file modified).

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

A real, if not KG-encoded, cross-subject connection exists to
chemistry/biology (nuclear medicine, radiation biology) — recorded
honestly, not fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 13): initial authoring.

# Bohr Model of the Hydrogen Atom — `phys.mod.bohr-model`

## Identity

- **Concept ID**: `phys.mod.bohr-model` (canonical physics KG)
- **Curriculum location**: physics / modern physics — dependency level 11.
- **Prerequisites**: `phys.em.coulombs-law`, `phys.mod.photons` — the
  Bohr model directly combines the already-secure Coulomb attraction
  (providing centripetal force) with the already-secure photon concept
  (governing discrete emission/absorption) into a quantized-orbit atomic
  model.
- **Unlocks** (from KG): `phys.mod.atomic-spectra` — a genuine hub
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly state that n=1 (the ground state) has the
LOWEST energy (most negative, since E_n=-13.6/n² eV), NOT the highest —
despite being the innermost, most tightly-bound orbit; "more tightly
held" correctly corresponds to LOWER (more negative) energy, and
confusion arises specifically around this sign/magnitude relationship,
not the underlying physics; (2) correctly distinguish EMISSION spectra
(from thermally-excited atoms in hot gas, dropping from high to low
energy states, releasing photons) from ABSORPTION spectra (from atoms
absorbing specific photon energies from a continuous background,
jumping from low to high energy states) — both show the SAME
wavelengths (same energy differences) but represent physically DIFFERENT
processes; (3) correctly explain that E_n=-13.6/n² eV applies SPECIFICALLY
to hydrogen (a single-electron system) — NOT to multi-electron atoms
like helium, where inter-electron repulsion (absent from the simple
Bohr derivation) makes the formula's naive application (even with Z=2)
give a significantly wrong energy; (4) correctly explain that the Balmer
series (visible-range hydrogen spectral lines) is NOT the complete
hydrogen spectrum — the Lyman series (ultraviolet, transitions to n=1)
and Paschen/Brackett/Pfund series (infrared, transitions to n≥3) also
exist, spanning a far broader wavelength range than the visible Balmer
lines alone.

## Core Understanding

In the Bohr model, E_n=-13.6/n² eV, the n=1 GROUND state has the LOWEST
(most negative) energy, NOT the highest — this is fully consistent with
"closer to the nucleus = more tightly bound," but the specific
confusion arises around whether "lower n" corresponds to "lower energy"
in the signed sense: since -13.6/1²=-13.6 eV is MORE NEGATIVE (lower)
than -13.6/3²≈-1.51 eV, n=1 is indeed the lowest-energy state, exactly
as expected for the most tightly bound configuration — the innermost
orbit's tight binding IS the low-energy state; no genuine physics
contradiction exists here, only a bookkeeping/sign confusion to resolve
carefully. A second, genuinely important distinction: EMISSION spectra
and ABSORPTION spectra show the IDENTICAL set of wavelengths (since both
reflect the same set of possible energy-level differences), but
represent PHYSICALLY DIFFERENT processes — emission occurs when
thermally-excited atoms (in hot gas) have electrons DROP from high-energy
to low-energy states, RELEASING photons at those specific energies;
absorption occurs when atoms exposed to a continuous background light
source have electrons ABSORB photons of specific matching energies,
JUMPING from low to high energy states, leaving dark absorption lines in
the transmitted continuous spectrum — same wavelengths, opposite
direction of electron transition and opposite direction of photon flow.
A third, easily over-generalized point: the simple Bohr formula,
E_n=-13.6/n² eV, was derived SPECIFICALLY for hydrogen (a single
electron orbiting a single proton) — it does NOT extend correctly to
multi-electron atoms like helium; naively substituting Z=2 for helium's
nuclear charge gives E≈-54.4/n² eV per electron, but this completely
IGNORES the significant inter-electron repulsion between helium's two
electrons, an interaction entirely absent from the single-electron Bohr
derivation, making the naive formula's prediction measurably wrong for
any atom beyond hydrogen. Finally, the Balmer series (the specific set of
hydrogen transitions ending at n_f=2, which happen to fall in the
VISIBLE range and were historically the first observed) is commonly but
mistakenly treated as "the" hydrogen spectrum — hydrogen has SEVERAL
distinct series beyond Balmer: the Lyman series (transitions to n_f=1,
in the ultraviolet) and the Paschen, Brackett, and Pfund series
(transitions to n_f=3, 4, 5, in the infrared) — together spanning a
vastly wider range of the electromagnetic spectrum than the visible
Balmer lines alone.

## Mental Models

**Beginner**: "n=1 is the highest energy state because it's the
innermost orbit; emission and absorption spectra are basically the same
thing — the atom emits and absorbs the same colors, so they're
identical processes; the same formula (E_n=-13.6/n² eV) works for all
atoms; the hydrogen spectrum is the Balmer series." Upgrade trigger:
computing E_1 and E_3 explicitly (finding E_1 is MORE negative, hence
lower) directly confronts the n=1-is-highest assumption; tracing the
DIFFERENT physical processes behind emission (high→low, hot gas) and
absorption (low→high, continuous background) directly confronts the
same-process assumption; attempting the Bohr formula on helium
(finding a wrong result due to missing electron-electron repulsion)
directly confronts the applies-to-all-atoms assumption; examining Lyman
and Paschen series wavelengths (UV and IR, not visible) directly
confronts the Balmer-is-everything assumption.

**Intermediate**: "n=1 has the lowest (most negative) energy, correctly
consistent with tightest binding; emission (high→low, releasing photons)
and absorption (low→high, absorbing photons) are distinct processes
sharing the same wavelength set; the Bohr formula is hydrogen-specific,
failing for multi-electron atoms; Balmer is only one of several
hydrogen series (Lyman UV, Paschen/Brackett/Pfund IR)." This model
correctly captures all four results, but sometimes still needs careful
sign-tracking when comparing E_n values across different n.

**Advanced**: "Always explicitly compute and compare signed E_n values
rather than reasoning qualitatively about 'higher' or 'lower' energy;
always check whether a Bohr-style calculation applies to a genuinely
single-electron system before trusting its numerical result; always
consider the FULL hydrogen spectrum (all series) rather than defaulting
to Balmer alone."

**Expert**: the full quantum-mechanical treatment of the hydrogen atom
(solving the Schrödinger equation) as the rigorous replacement for the
semi-classical Bohr model, and perturbation theory's role in
approximating multi-electron atoms — a natural consolidation directly
connecting to the KG unlock `phys.mod.atomic-spectra`, not required for
mastery.

## Why Students Fail

The dominant failure is a sign/magnitude confusion around which energy
level is "highest" vs. "lowest"; secondary failures include conflating
emission and absorption as identical processes, overextending the
single-electron Bohr formula to multi-electron atoms, and treating the
visible-range Balmer series as the complete hydrogen spectrum.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.bohr-model.md`,
Misconception Engine, MC-1 through MC-4) documents four; reused by
reference with birth-type added.

- **MC-1 (MC-HIGHER-N-IS-LOWER-ENERGY)**: stating "n=1 is the highest
  energy because it's the innermost orbit," confusing binding tightness
  with energy sign/magnitude. **Birth type**: language contamination
  (Type 3) — "tightly held" is loosely associated with "high energy" in
  some everyday framings, when it actually corresponds to LOW (more
  negative) energy here. Probe: "Which state has higher energy: n=1
  (ground state) or n=3? By how many eV?"
- **MC-2 (MC-EMISSION-AND-ABSORPTION-SAME-PROCESS)**: believing "they're
  the same — the atom emits and absorbs the same colours," missing the
  distinct physical mechanisms. **Birth type**: overgeneralization (Type
  1) — correctly noting the same wavelengths appear in both is
  incorrectly extended to "same process." Probe: "Explain the difference
  between an emission spectrum and an absorption spectrum of hydrogen.
  Why do both show the same wavelengths?"
- **MC-3 (MC-BOHR-MODEL-APPLIES-TO-ALL-ATOMS)**: believing "the same
  formula works for all atoms," overgeneralizing the hydrogen-specific
  derivation. **Birth type**: overgeneralization (Type 1) — a
  successful, elegant formula is assumed to generalize beyond its
  actual derivation scope (single-electron systems). Probe: "Can you use
  E_n=-13.6/n² eV to calculate the energy levels of helium?"
- **MC-4 (MC-BALMER-SERIES-IS-ALL-OF-HYDROGEN-SPECTRUM)**: believing
  "hydrogen spectrum = Balmer series," missing the Lyman/Paschen/
  Brackett/Pfund series. **Birth type**: instruction-induced (Type 5) —
  most textbooks introduce hydrogen spectra via the visible, easily
  observed Balmer series, and this pedagogical entry point is mistaken
  for the complete picture. Probe: "The Balmer series for hydrogen is in
  the visible range. Are there hydrogen spectral lines in the
  ultraviolet? The infrared?"

## Analogies

**Best**: a debt ledger where "more negative balance" means "deeper in
debt" (more tightly bound to the obligation) — n=1's very negative
energy is analogous to being "deepest in debt" (most tightly bound),
which is correctly the LOWEST value on the number line — directly
targets MC-1 by grounding the sign convention in a familiar negative-
number context.

**Anti-analogy**: do NOT say "the Bohr formula gives atomic energy
levels" without specifying "for hydrogen specifically" — this omission
directly invites MC-3.

## Demonstrations

Worked-example: compute E_1=-13.6 eV and E_3≈-1.51 eV explicitly,
comparing their signed values — directly targets MC-1. Conceptual: trace
the emission (hot gas, high→low) and absorption (continuous background,
low→high) processes side by side — directly targets MC-2.
Worked-example: attempt the naive helium calculation (Z=2) and compare to
the actual (repulsion-corrected) value — directly targets MC-3. Data-based:
list all five hydrogen series (Lyman, Balmer, Paschen, Brackett, Pfund)
with their wavelength ranges — directly targets MC-4.

## Discovery Questions

Discovery-style: "using E_n=-13.6/n², is E_1 or E_3 actually the larger
(less negative) number?" — learner computes directly, confronting MC-1.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-1 (sign
convention) is addressed first (establishing the correct energy-level
ordering), then MC-4 (full spectrum scope), then MC-2 (emission vs.
absorption), then MC-3 (hydrogen-specific scope) — moving from the most
foundational numerical convention toward increasingly specific
conceptual boundaries.

## Tutor Actions

WORKED-EXAMPLE (E_n computed and compared across n values; naive vs.
correct helium calculation); COMPARE-CONTRAST (emission vs. absorption
process); DATA-ANALYSIS (all five hydrogen spectral series).

## Voice Teaching Notes

Listen for "n=1 has the highest energy," "emission and absorption are
the same," "the formula works for helium too," or "Balmer is the whole
spectrum" — the four direct misconception tells. Load-bearing sentence:
"n=1 is the LOWEST (most negative) energy — tightly bound means low
energy; and the Bohr formula is hydrogen-only." Channel-reality caveats
owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming n=1 has higher energy than n=3 signals MC-1
(MISCONCEIVING). A learner conflating emission and absorption signals
MC-2. A learner applying the Bohr formula to helium without correction
signals MC-3. A learner treating Balmer as the complete spectrum signals
MC-4. Each fully repaired via its corresponding worked example/data
above. Mastery trigger: correctly ordering energy levels by sign/
magnitude, AND correctly scoping the Bohr formula to hydrogen alone.
Blueprint's assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget 'high' and 'low' for a second — is -13.6 a
bigger or smaller NUMBER than -1.51?" (isolating basic signed-number
comparison before discussing energy-level language). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (signed energy-level ordering; hydrogen-specific scope; full
multi-series spectrum) bound to procedure (E_n=-13.6/n² calculation and
comparison). Interleave with `phys.em.coulombs-law`, `phys.mod.photons`,
and, once authored, `phys.mod.atomic-spectra` (the direct KG unlock).

## Transfer Connections

Near: any hydrogen energy-level or spectral-line calculation problem.
Far: astronomy (stellar spectroscopy identifying elements via their
characteristic spectral lines) and chemistry (atomic emission
spectroscopy as an analytical technique). Real-world: understanding how
astronomers determine the chemical composition of distant stars purely
from their absorption/emission spectral lines. Expert: the full quantum-
mechanical hydrogen-atom solution and perturbation theory for
multi-electron atoms.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified,
though atomic emission spectroscopy is a genuine, identifiable chemistry
application; honest "weak but real" assessment at the formal cross-link
level.

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

Genuine cross-subject connection to chemistry (atomic emission
spectroscopy) identified but not reflected in KG `cross_links`; recorded
honestly, not fixed (no KG file modified).

## Version History

- 2026-07-23 (physics EB Wave 11): initial authoring.

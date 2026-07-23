# Atomic Spectra — `chem.atomic.atomic-spectra`

## Identity

- **KG ID**: chem.atomic.atomic-spectra
- **Subject**: Chemistry
- **Domain**: Atomic Structure (chem.atomic)
- **Difficulty**: developing
- **Bloom level**: analyze
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.atomic.electromagnetic-radiation, chem.atomic.subatomic-particles
- **Unlocks**: chem.atomic.bohr-model
- **Cross-links**: none

## Learning Objective

Students can distinguish continuous spectra from line spectra and explain why atomic emission spectra are discrete (line) spectra; identify the hydrogen spectrum series (Lyman, Balmer, Paschen) by the spectral region of each; apply the Rydberg equation to calculate the wavelength or frequency of spectral lines of the hydrogen atom; and interpret an atomic spectrum as evidence for quantised energy levels in atoms.

## Core Understanding

When atoms are excited (by heat, electrical discharge, or light absorption) they absorb energy and electrons move to higher energy levels. When electrons return to lower energy levels, they emit photons with energy exactly equal to the energy difference between the two levels: ΔE = hν = hc/λ.

Because atomic energy levels are **quantised** (discrete, specific values — not a continuous range), only specific photon frequencies are emitted. This produces a **line spectrum** — a series of discrete bright lines at specific wavelengths — rather than the continuous rainbow of colours from a heated solid.

The hydrogen spectrum is the simplest system. Its series are defined by the final (lower) energy level: **Lyman series** (n_f = 1, UV), **Balmer series** (n_f = 2, visible), **Paschen series** (n_f = 3, near-IR). The Rydberg equation gives the wavenumber of each line:

1/λ = R_H(1/n_f² − 1/n_i²)

where R_H = 1.097 × 10⁷ m⁻¹ is the Rydberg constant, and n_i > n_f.

The existence of line spectra was a crisis for classical physics (which predicted a continuous spectrum) and was the experimental motivation for Bohr's quantum model.

## Mental Models

**The energy staircase**: Atomic energy levels are like fixed steps on a staircase — you can stand on a step but not between steps. An excited electron jumps up (absorbs exactly the right amount of energy for that gap) and falls back down (emits exactly the right amount of energy). Each step-gap corresponds to one specific spectral line.

**Line spectrum as a fingerprint**: Each element has a unique set of energy levels → unique set of spectral lines. This is the atomic fingerprint used in spectroscopic identification. No two elements have the same line spectrum.

**Emission vs. absorption as complementary**: Shine white light through cool hydrogen gas → the same specific wavelengths that would be emitted are now absorbed → dark lines appear in the transmitted spectrum (absorption spectrum) at exactly the same positions as the bright lines in the emission spectrum.

## Why Students Fail

1. **Confusing series by spectral region**: Students mix up which series is in which part of the spectrum; the physical reason (final energy level determines photon energy range) clarifies the hierarchy.
2. **Rydberg equation direction error**: Students set n_i < n_f or confuse the sign convention, getting negative wavelengths.
3. **Continuous vs. line spectrum confusion**: Students believe all light sources emit line spectra; solids and liquids at high temperature emit continuous spectra (blackbody radiation), while gases of isolated atoms emit line spectra.
4. **Why quantised levels exist**: Students accept that they do but cannot explain why — this is resolved by the Bohr model (next concept) and quantum mechanics (later). For now, the observation motivates the theory.

## Misconceptions

**MC-1 — Continuous and line spectra come from the same source type** (Type 5, instruction-induced)
- *Diagnostic probe*: "A hot tungsten filament in a light bulb and a neon sign both give off light. Why does the filament give a continuous spectrum while the neon sign gives a line spectrum?"
- *Characteristic phrase*: "Both give the same kind of spectrum — they both glow."
- *Repair*: Tungsten = hot solid → electrons in a continuous band of energies → continuous blackbody spectrum. Neon gas = isolated atoms → discrete energy levels → line spectrum. The key is whether the source is a solid/liquid (continuous) or an isolated gas-phase atom (discrete).

**MC-2 — Rydberg equation: which n is larger** (Type 4, notation-induced)
- *Diagnostic probe*: "For a transition from n=4 to n=2 in the Balmer series: which is n_i and which is n_f? What sign should 1/n_f² − 1/n_i² have?"
- *Characteristic phrase*: "n_i = 2 because it's the initial level before the electron moves."
- *Repair*: n_i = the higher energy level (where the electron starts, BEFORE emitting). n_f = the lower level (where it ends up, AFTER emitting). For emission: n_i > n_f, so 1/n_f² > 1/n_i², and the expression (1/n_f² − 1/n_i²) is positive → positive wavelength.

**MC-3 — Emission and absorption spectra are different fingerprints** (Type 5, instruction-induced)
- *Mechanism*: Students see emission (bright lines on dark background) and absorption (dark lines on continuous background) as separate phenomena rather than the same energy transition in opposite directions.
- *Diagnostic probe*: "If hydrogen's Balmer series has a red line at 656 nm in emission, would you expect to see a dark line at 656 nm in the absorption spectrum of cool hydrogen? Why?"
- *Repair*: Yes — the same energy gap (n=2 ↔ n=3) absorbs exactly 656 nm photons. Emission = electron falls from n=3 to n=2, emitting 656 nm. Absorption = photon with exactly 656 nm energy excites electron from n=2 to n=3.

## Analogies

**The piano string model (anti-analogy worth mentioning)**: A piano string can vibrate at specific harmonics — not all frequencies. This is the same kind of quantisation. HOWEVER, classical wave mechanics could predict continuous spectra for electrons orbiting a nucleus (the crisis). Quantised energy levels require quantum mechanics, not classical physics. Mention the analogy but flag that the mechanism is not classical waves.

## Demonstrations

**Demonstration 1 — Spectroscopic observation of hydrogen lamp**
- Use a hydrogen discharge tube and a diffraction grating spectroscope. Students observe the four visible Balmer lines: red (656 nm, H-α), blue-green (486 nm, H-β), blue (434 nm, H-γ), violet (410 nm, H-δ). Identify each and calculate the transitions using the Rydberg equation (4→2, 5→2, 6→2, 7→2).

**Demonstration 2 — Flame tests for elements**
- Flame tests for NaCl (yellow = Na, 589 nm, D-line), KCl (violet = K), LiCl (red = Li), BaCl₂ (green = Ba). Each colour is the strongest line in each element's visible emission spectrum. These are qualitative demonstrations of the fingerprint principle.

## Discovery Questions

1. "Calculate the wavelength of the Hα line (n=3 to n=2 transition) using the Rydberg equation. In what region of the spectrum is it?" (Targets: 1/λ = 1.097×10⁷(1/4 − 1/9) = 1.097×10⁷ × 5/36 = 1.524×10⁶ m⁻¹; λ = 656 nm; red visible.)
2. "The series limit of the Balmer series is when n_i → ∞. What wavelength does this correspond to, and what does it mean physically?" (Targets: 1/λ = R_H × 1/4; λ = 4/R_H = 364.6 nm; this is the series limit = the energy required to ionize H from n=2; beyond this wavelength, ionization occurs.)
3. "Astronomers identify hydrogen in distant stars by observing absorption lines in the stellar spectrum. Why do all hydrogen atoms in the universe have the same line spectrum?" (Targets: energy levels of hydrogen are determined by the laws of quantum mechanics, which are universal; every H atom has identical quantised energy levels regardless of where it is.)

## Teaching Sequence

1. Review from chem.atomic.electromagnetic-radiation: photon energy E = hν; energy and frequency relationship.
2. Present the crisis: classical physics predicts continuous emission from an orbiting electron (Rutherford model fails to explain line spectra). What did experiment actually show?
3. Display or describe the hydrogen emission spectrum: four visible lines of specific wavelengths (Balmer series). Connect each line to a specific photon energy = specific electronic transition.
4. Introduce the energy-level diagram for hydrogen. Label n=1,2,3,4,5 levels. Draw arrows for each Balmer transition.
5. Introduce series names: Lyman (UV), Balmer (visible), Paschen (near-IR). Explain that the final level determines the series and the energy range.
6. Introduce the Rydberg equation. Apply to calculate the Hα wavelength (Demonstration 1 if available).
7. Distinguish emission from absorption spectra as complementary (MC-3 repair built in).
8. Address MC-1: continuous vs. line spectrum by source type.

## Tutor Actions

- If student confuses which series is in which spectral region → link to final level: n=1 (high energy → UV), n=2 (visible), n=3 (IR).
- If student gets negative wavelengths from Rydberg → MC-2 repair: confirm n_i > n_f for emission.
- If student treats emission and absorption as separate → MC-3 repair: draw the same energy gap with arrows in both directions.
- Advance when student can calculate wavelength using Rydberg and interpret a spectral line as evidence for a specific n_i → n_f transition.

## Voice Teaching Notes

The energy-level diagram is the primary teaching tool — draw it before the Rydberg equation. Students who understand the energy levels understand why the equation has the form it does (difference of 1/n² terms). Those who only memorise the equation often get MC-2 errors.

When calculating Rydberg equation results: always check the sign of the parenthetical expression first. If n_i > n_f then (1/n_f² − 1/n_i²) > 0 → positive → physical. If negative → swap n_i and n_f.

## Assessment Signals

**Mastery gate**:
1. Student correctly calculates the wavelength of a specified transition (n_i → n_f) using the Rydberg equation.
2. Student correctly identifies the series (Lyman, Balmer, Paschen) from the final quantum number n_f.
3. Student correctly explains that line spectra arise from quantised energy levels, while continuous spectra arise from solids.
4. Student correctly predicts that the absorption spectrum of an element will show dark lines at the same wavelengths as its emission lines.

**FRAGILE signal**: student calculates wavelengths correctly but cannot interpret what the spectral line represents (a specific electronic transition between two energy levels).

**MISCONCEIVING signal**: student sets n_i < n_f in the Rydberg equation. Immediate MC-2 repair before any further Rydberg work.

## Tutor Recovery Strategy

If stuck:
1. For series confusion: draw the energy-level ladder and mark the three "landing levels" for each series (n=1 for Lyman, n=2 for Balmer, n=3 for Paschen). Draw arrows from all higher levels to each landing. The arrows' lengths are proportional to photon energy.
2. For Rydberg equation direction: require the student to identify n_i and n_f from a description before touching the formula. "Which level does the electron START on? Which level does it END on?" n_i = start, n_f = end.
3. For continuous vs. line: return to the physical source: "Is the emitter an isolated atom or a solid?" Isolated → line. Solid → continuous. If uncertain about a source, ask "is it a solid, liquid, or a gas of isolated atoms?"

## Memory Hooks

- **Series by final level**: "Lyman = 1 (UV). Balmer = 2 (visible). Paschen = 3 (IR)." Three numbers, three series, three regions.
- **Rydberg mnemonic**: "1/λ = R_H (1/n_f² − 1/n_i²). Final on top, initial subtracted. n_i must be bigger."

## Transfer Connections

- **chem.atomic.bohr-model**: atomic spectra are the experimental foundation that Bohr's model explains — the next concept derives the energy levels that produce the Rydberg equation from first principles (quantised angular momentum).
- **chem.org.spectroscopy**: UV-visible absorption spectroscopy of organic molecules is an extension of this concept — molecules have energy levels analogous to atoms.
- **chem.anal.spectroscopy**: atomic emission spectroscopy (AES) and atomic absorption spectroscopy (AAS) are analytical techniques that apply the line spectrum concept to quantitative elemental analysis.

## Cross-Subject Connections

- **Physics (phys.mod.atomic-spectra)**: atomic spectra are covered identically in physics; in chemistry the emphasis is on the quantum-number interpretation and series classification.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.atomic.atomic-spectra`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.atomic.atomic-spectra` as of 2026-07-23.

## Curriculum Feedback

None. The bloom level (analyze) is correctly elevated above the foundational concepts — understanding why line spectra require quantised energy levels is analytical, not just recall.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

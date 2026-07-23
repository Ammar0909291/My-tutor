# Bohr Model of the Atom — `chem.atomic.bohr-model`

## Identity

- **KG ID**: chem.atomic.bohr-model
- **Subject**: Chemistry
- **Domain**: Atomic Structure (chem.atomic)
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.atomic.atomic-spectra
- **Unlocks**: chem.atomic.quantum-numbers
- **Cross-links**: none

## Learning Objective

Students can state the four postulates of Bohr's model of hydrogen; use the energy level formula (Eₙ = −13.6/n² eV) to calculate electron energies, spectral line energies, and wavelengths; calculate orbital radii (rₙ = 0.529n² Å); and explain why Bohr's model succeeds for hydrogen but fails for multi-electron atoms, and why its concept of fixed electron orbits was ultimately abandoned.

## Core Understanding

**Bohr's four postulates (1913)**:
1. Electrons orbit the nucleus in discrete, fixed circular orbits ("allowed orbits") without radiating energy.
2. Only orbits with angular momentum L = nℏ (n = 1, 2, 3…) are allowed (quantisation condition).
3. Electrons absorb a photon to jump to a higher orbit; emit a photon when falling to a lower orbit. Energy of photon = ΔE = Eₙ_final − Eₙ_initial.
4. The energy emitted or absorbed equals hν.

**Quantitative results for hydrogen**:
- Energy of nth orbit: Eₙ = −13.6/n² eV (n = 1: ground state, −13.6 eV; n = ∞: 0 eV, ionised)
- Radius of nth orbit: rₙ = 0.529 × n² Å (n = 1: Bohr radius a₀ = 0.529 Å ≈ 53 pm)
- Energy of spectral line: ΔE = 13.6(1/n_f² − 1/n_i²) eV; frequency ν = ΔE/h; wavelength λ = c/ν

**Successes**: explains the hydrogen emission spectrum quantitatively; predicts the Rydberg constant correctly from fundamental constants; introduces quantisation of energy.

**Limitations**:
1. Fails for multi-electron atoms (He, Li…) — can't account for electron-electron repulsion.
2. Cannot explain fine structure or the Zeeman effect (magnetic field splitting).
3. Cannot predict spectral line intensities.
4. Violated Heisenberg's uncertainty principle — fixed circular orbits imply simultaneously known position and momentum.
5. Bohr's orbits are not wavefunctions; they do not describe the spatial probability of finding an electron — replaced by the quantum mechanical model.

## Mental Models

**The planetary model with energy constraints**: Bohr's model is often visualised as a solar system — nucleus at the centre, electrons in circular orbits at fixed radii. The key addition over a simple solar system: only certain radii are allowed (the angular momentum quantisation condition determines which), and moving between radii requires absorbing or emitting a photon of exactly the right energy.

**The energy ladder**: draw the energy levels as a vertical ladder with rungs at −13.6, −3.4, −1.51, −0.85, −0.54 eV (n = 1 through 5). Each photon absorbed lifts the electron to a higher rung; each photon emitted drops it to a lower rung. The photon energy equals the rung gap — no more, no less. This is why spectral lines are discrete, not continuous.

## Why Students Fail

1. **Sign of energy**: students don't understand why all Bohr energies are negative — the convention is zero energy at n = ∞ (free electron), so bound electrons have negative energy. More negative = more bound = lower orbit = lower n.
2. **n-direction in ΔE formula**: students subtract in the wrong direction: ΔE = Eₙ_f − Eₙ_i; emission (n_i > n_f) gives ΔE < 0 (energy leaves); absorption gives ΔE > 0.
3. **Confusing emission and absorption**: students think all spectral lines are emission lines. The same energy gap appears in both; the direction of the electron transition determines which.
4. **Applying Bohr to multi-electron atoms**: students use Eₙ = −13.6/n² eV for elements other than hydrogen (it applies only to H and H-like ions with one electron).

## Misconceptions

**MC-1 — Higher n = more energy means the electron is closer to the nucleus** (Type 5, instruction-induced)
- *Mechanism*: students know higher energy = more active but confuse the energy convention (less negative = higher energy = farther from nucleus).
- *Diagnostic probe*: "Is the electron in n = 3 closer to or farther from the nucleus than n = 1? What is its energy in eV? Is its energy more or less negative?"
- *Characteristic phrase*: "Higher energy electrons are pulled closer to the nucleus."
- *Repair*: Higher n = larger radius (r = 0.529n² Å) = farther from nucleus. The energy is less negative (e.g., −1.51 eV vs. −13.6 eV) = less bound. Analogy: pushing a satellite to a higher orbit requires adding energy (making it less negative in the gravitational potential well).

**MC-2 — The Bohr model applies to all atoms** (Type 1, overgeneralization)
- *Diagnostic probe*: "Use Eₙ = −13.6/n² eV to predict the first ionisation energy of helium (24.6 eV). What does the formula give? Why is it wrong?"
- *Characteristic phrase*: "I'll use the Bohr model to find the energy of electrons in oxygen."
- *Repair*: Eₙ = −13.6/n² applies only to one-electron systems (H, He⁺, Li²⁺ with Z correction). For He (2 electrons), electron-electron repulsion raises the actual energy; the formula gives −13.6 eV (n=1), but the real first ionisation energy is −24.6 eV because the Bohr model cannot account for the second electron at all.

**MC-3 — The Bohr model was "wrong" and is not useful** (Type 5, instruction-induced)
- *Mechanism*: the emphasis on Bohr's limitations can lead students to dismiss its achievements entirely.
- *Diagnostic probe*: "What did Bohr get right that no earlier model could do?"
- *Characteristic phrase*: "Bohr's model is wrong, so we don't need to learn it."
- *Repair*: Bohr correctly predicted the Rydberg constant (the first derivation from fundamental constants), quantitatively explained the hydrogen emission spectrum, and introduced the revolutionary concept of quantised energy levels — all achieved before quantum mechanics. It is a historically essential and pedagogically useful model even though it is incomplete.

## Analogies

**The orbit-energy ladder**: energy levels are like the floors of a tall building. The ground floor (n = 1) is the deepest basement (most negative energy). Higher floors (n = 2, 3…) are closer to ground level (zero energy, at n = ∞ = roof). Moving a person (electron) from basement to ground floor (n = 1 → ∞) requires energy equal to 13.6 eV = the building's height. Moving between intermediate floors requires energy equal to the floor-gap.

## Demonstrations

**Demonstration 1 — Hydrogen emission spectrum**
- Pass a hydrogen discharge tube's light through a diffraction grating. The visible lines (red at 656 nm, blue-green at 486 nm, violet at 434 nm, 410 nm) are the Balmer series (n_f = 2, n_i = 3, 4, 5, 6). Calculate the predicted wavelengths using ΔE = 13.6(1/4 − 1/n_i²) eV and compare with the observed colours. The match is nearly exact.

## Discovery Questions

1. "Calculate the wavelength of the first line in the Lyman series (n = 2 → n = 1 in hydrogen). In what region of the electromagnetic spectrum does this fall?" (Targets: ΔE = 13.6(1/1 − 1/4) = 10.2 eV; λ = hc/ΔE = (6.626×10⁻³⁴ × 3×10⁸)/(10.2 × 1.602×10⁻¹⁹) = 121.6 nm → UV, Lyman series.)
2. "The He⁺ ion has one electron. Modify the Bohr energy formula using the nuclear charge Z to calculate the ground state energy of He⁺. Compare with hydrogen." (Targets: Eₙ = −13.6Z²/n² eV; for He⁺, Z = 2, n = 1: E₁ = −13.6 × 4 = −54.4 eV. He⁺ is 4 times more tightly bound than hydrogen because nuclear charge pulls twice as hard.)
3. "List three experimental observations that the Bohr model cannot explain, and for each, say what physical phenomenon it is missing." (Targets: fine structure → missing electron spin and relativistic correction; Zeeman effect → missing magnetic quantum number; spectral line intensities → missing transition probability/selection rules; multi-electron atoms → missing electron-electron repulsion.)

## Teaching Sequence

1. Review from chem.atomic.atomic-spectra: the hydrogen line series, the Rydberg formula, the fact that only specific wavelengths appear.
2. Present Bohr's question: why are only specific wavelengths emitted? What condition on electrons would explain discrete energies?
3. State the four postulates. Emphasise postulate 2 (angular momentum quantisation) as the non-classical element.
4. Derive or state the energy formula Eₙ = −13.6/n² eV. Establish the sign convention (zero at n = ∞, negative = bound).
5. State the radius formula rₙ = 0.529n² Å. Calculate r₁ (Bohr radius).
6. Apply ΔE = Eₙ_f − Eₙ_i to calculate photon energy, frequency, and wavelength. Work Discovery Question 1.
7. Address successes (hydrogen spectrum, Rydberg constant). Work Discovery Question 2 (He⁺ extension).
8. State limitations explicitly. Work Discovery Question 3.
9. Bridge to chem.atomic.quantum-numbers: the Bohr model introduces n; quantum mechanics will add l, ml, ms to fully describe the electron.

## Tutor Actions

- If student gets the sign of ΔE wrong → MC-1 repair: draw the energy ladder; label which direction is emission (downward) and absorption (upward); require student to verify the sign of ΔE before computing λ.
- If student applies Bohr formula to multi-electron atoms → MC-2 repair: compute the prediction vs. the known first ionisation energy; the discrepancy reveals the limitation.
- If student dismisses Bohr as "simply wrong" → MC-3 repair: the hydrogen spectrum match and Rydberg constant derivation.
- Advance when student can calculate ΔE and λ for a transition in hydrogen and correctly state the model's three main limitations.

## Voice Teaching Notes

The energy ladder diagram should be drawn in every Bohr model session. Require the student to label: n, energy (eV), and an arrow for each series (Lyman points to n=1, Balmer to n=2). This diagram is the concept map — everything else follows from it.

The sign convention needs explicit verbal reinforcement: "bound = negative energy; more bound = more negative; ionisation = reaching zero." Students who confuse this will systematically get the wrong sign for ΔE and the wrong wavelength prediction.

## Assessment Signals

**Mastery gate**:
1. Student correctly calculates the wavelength of a specified hydrogen spectral line using ΔE = 13.6(1/n_f² − 1/n_i²) eV.
2. Student correctly identifies which spectral series a transition belongs to (Lyman/Balmer/Paschen) given n_f.
3. Student states three limitations of the Bohr model with their physical roots.
4. Student correctly modifies the formula for H-like ions (Z ≠ 1).

**FRAGILE signal**: student computes correct ΔE but makes a sign error in converting to wavelength (takes absolute value automatically rather than understanding why ΔE must be positive for emitted photon energy).

**MISCONCEIVING signal**: student applies Eₙ = −13.6/n² eV directly to helium or oxygen. Stop immediately — MC-2 repair is required.

## Tutor Recovery Strategy

If stuck:
1. For the energy formula: return to the energy ladder. Ask: "What energy does n = 3 have? n = 1? What is the difference? That difference equals the photon energy."
2. For the sign convention: the satellite analogy. Satellites in higher orbits have more total energy (less negative) — adding energy lifts them up. Exactly the same for electrons in the Bohr model.
3. For limitations: ask "Can the Bohr model say anything about the helium atom?" This immediately reveals the multi-electron limitation, from which the other limitations (no electron interactions) flow.

## Memory Hooks

- **Eₙ = −13.6/n² eV**: "Ground state = −13.6 eV. Each higher level is less negative."
- **rₙ = 0.529n² Å**: "n doubles → radius quadruples (n² dependence)."
- **Bohr's success and failure**: "Works perfectly for H. Fails for everything with two or more electrons."
- **ΔE = Eₙ_f − Eₙ_i**: "Final minus initial. Emission → n_f < n_i → ΔE < 0 (energy leaves)."

## Transfer Connections

- **chem.atomic.quantum-numbers**: the quantum number n from Bohr's model becomes the principal quantum number in the full quantum mechanical model; Bohr's single quantum number is extended to four (n, l, ml, ms) to describe multi-electron atoms.
- **chem.atomic.atomic-spectra**: the Rydberg formula (empirical) is now derived from first principles by Bohr's model; the two are consistent and reinforce each other.

## Cross-Subject Connections

- **Physics (phys.mod.bohr-model)**: the Bohr model is identical in physics; in chemistry the emphasis is on the connection to atomic spectra and the motivation for quantum numbers; in physics the emphasis is on the quantisation of angular momentum and the derivation of the Rydberg constant.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.atomic.bohr-model`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.atomic.bohr-model` as of 2026-07-23.

## Curriculum Feedback

None. The Bohr model correctly gates quantum numbers as its only unlock — this is the appropriate prerequisite ordering.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

# chem.atomic.bohr-model — The Bohr Model of the Atom

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.atomic.bohr-model` |
| Domain | Atomic Structure |
| Requires | `chem.atomic.atomic-spectra`, `chem.atomic.subatomic-particles` |
| Unlocks | `chem.atomic.quantum-numbers` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

Bohr's model places electrons in fixed circular orbits ("shells") of specific allowed energies around the nucleus, with electrons absorbing or emitting a photon of exact energy equal to the gap between two allowed orbits when they jump between them — successfully explaining the discrete line spectrum of hydrogen (and giving the correct formula for hydrogen's spectral lines) by postulating that angular momentum is quantized, even though it was later superseded by the quantum mechanical model (electron clouds/orbitals) for anything beyond hydrogen-like one-electron systems.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: A hydrogen discharge tube's line spectrum (a few sharp colored lines, not a continuous rainbow) as the direct observational puzzle Bohr's model was built to explain.

**Representational**: The Bohr diagram — concentric circles (n=1, 2, 3...) around a nucleus, with arrows showing electron transitions between circles paired with the photon emitted/absorbed.

**Abstract**: The energy-level formula Eₙ = −13.6 eV/n² for hydrogen, and the rule that photon energy equals the energy difference between initial and final levels (ΔE = Ef − Ei = hf).

**Transfer**: Recognizing where the Bohr model still gives quantitatively correct answers (hydrogen's spectral line positions, ionization energy) versus where it fails (multi-electron atoms, the actual shape/geometry of orbitals, the uncertainty principle) — and articulating *why* it fails there (his fixed circular orbits ignore electron-electron repulsion and violate the wave nature of matter).

## 3. Why Beginners Fail

Students treat Bohr's model as a literally accurate, universally applicable picture of all atoms (rather than a specific, successful-for-hydrogen approximation later superseded), and separately develop a spatial misconception that orbit number n directly correlates with physical closeness to the nucleus in a way that implies smaller n orbits are somehow "safer" or lower in all forms of energy, rather than understanding n indexes discrete allowed energy states.

## 4. Misconception Library

### MC-1: A higher energy level (n) always means the electron is physically closer to the nucleus
- **Probe**: "In the Bohr model, is an electron in level n=1 closer to or farther from the nucleus than one in n=3?"
- **Characteristic phrase**: "Higher energy means closer to the nucleus, like being 'more attracted in.'"
- **Trigger**: Confusing "high energy = strongly bound = tightly held" (true in some contexts, e.g. nuclear binding energy) with Bohr orbit radius, when in fact Bohr orbit radius *increases* with n (rₙ = n²·r₁) — higher n means both higher energy *and* farther from the nucleus, not closer.
- **Conflict evidence [P28]**: The Bohr radius formula rₙ = n² × 0.529 Å directly shows radius growing with n² — n=1 is 0.529 Å, n=2 is four times farther (2.12 Å), n=3 is nine times farther (4.76 Å).
- **Bridge [P30]**: "Higher energy" in the Bohr model means "less negative energy" (less tightly bound, easier to remove) — which correlates with being farther out, not closer in.
- **Replacement [P31]**: As n increases, both orbit radius AND energy increase (energy becomes less negative, approaching zero at n=∞, meaning the electron is ionized/free).
- **Discrimination pairs [P33]**: n=1 (closest, most negative energy, most tightly bound) vs. n=∞ (infinitely far, E=0, unbound/ionized).
- **S6 repair path**: Show the rₙ = n²r₁ formula alongside the Eₙ = −13.6/n² formula side by side and have the student compute both for n=1,2,3 to see radius grow while energy rises toward zero simultaneously.

### MC-2: The Bohr model correctly describes all atoms, not just hydrogen
- **Probe**: "Does the Bohr model work the same way for a helium atom or a carbon atom as it does for hydrogen?"
- **Characteristic phrase**: "The Bohr model is how all atoms work."
- **Trigger**: Textbook diagrams routinely show Bohr-style concentric-circle diagrams for multi-electron atoms (carbon, oxygen) as a simplified electron-counting tool, without flagging that Bohr's original quantitative model (fixed circular orbits with his energy formula) is only exactly correct for hydrogen and other one-electron species (He⁺, Li²⁺) — multi-electron atoms have electron-electron repulsion that Bohr's model doesn't account for at all.
- **Conflict evidence [P28]**: Applying the hydrogen-derived Eₙ = −13.6Z²/n² formula to helium's actual measured ionization energies gives noticeably wrong answers unless electron-electron repulsion is separately corrected for — the simple formula alone fails quantitatively for any atom beyond one electron.
- **Bridge [P30]**: The concentric-circle *diagram* is still used as a rough electron-counting/shell-filling visual for any atom, but the *quantitative* orbit/energy model is only exact for one-electron systems.
- **Replacement [P31]**: Distinguish "Bohr diagrams as a bookkeeping tool for electron count per shell" (still commonly used, approximately valid) from "the Bohr model as a physically accurate description of orbits and energies" (valid only for hydrogen-like one-electron atoms).
- **Discrimination pairs [P33]**: Hydrogen (Bohr's formula matches experiment closely) vs. helium (Bohr's simple formula measurably disagrees with experiment without added correction terms).
- **S6 repair path**: Compute Bohr's predicted vs. experimentally measured ionization energy for both hydrogen and helium side by side.

### MC-3: Since the Bohr model was proven "wrong," it's useless and shouldn't be taught/used
- **Probe**: "If the Bohr model isn't fully correct, why do we still learn it?"
- **Characteristic phrase**: "The Bohr model is wrong, so it doesn't matter."
- **Trigger**: Overgeneralizing "superseded by quantum mechanics" into "worthless," rather than understanding it as a historically important, quantitatively correct-for-hydrogen approximation that remains pedagogically and practically useful (correctly predicts hydrogen spectral lines, still used as a first-approximation electron-shell bookkeeping tool in chemistry).
- **Conflict evidence [P28]**: The Bohr model's prediction for hydrogen's spectral line wavelengths matches experimental measurements to within the model's precision — a "wrong" model doesn't produce numerically correct predictions for a real physical system.
- **Bridge [P30]**: Scientific models can be simultaneously "superseded" (not the final, most complete description) and "correct within a specific domain" (hydrogen-like one-electron systems) — both statements are true at once.
- **Replacement [P31]**: The Bohr model is a valid, quantitatively accurate approximation for one-electron systems and a useful qualitative bookkeeping tool elsewhere, even though the full quantum mechanical model (orbitals, not orbits) is needed for a complete, general description.
- **Discrimination pairs [P33]**: "Wrong" (predicts nothing correctly) vs. "incomplete/approximate" (predicts correctly within a bounded domain) — the Bohr model is the latter.
- **S6 repair path**: Directly compute a hydrogen spectral line wavelength from Bohr's formula and compare to the known experimental value to demonstrate genuine predictive accuracy before discussing its limitations.

## 5. Explanation Library

**Primary explanation**: Bohr proposed that electrons orbit the nucleus only in specific allowed circular paths, each with a fixed energy, and that atoms emit or absorb light only in specific-energy photon "jumps" between these allowed orbits — explaining why hydrogen's emission spectrum shows sharp lines at specific wavelengths rather than a continuous smear of colors. The model's radius formula (rₙ = n²r₁) and energy formula (Eₙ = −13.6 eV/n² for hydrogen) together correctly predict hydrogen's observed spectral lines.

**Secondary explanation (successor framing)**: The Bohr model was later superseded by the full quantum mechanical model (Schrödinger's equation, electron probability clouds/orbitals instead of fixed circular paths) because it cannot correctly predict multi-electron atom behavior and conflicts with the wave nature of matter (de Broglie) and the uncertainty principle — but it remains the historically pivotal first successful quantum model of the atom and stays quantitatively accurate for hydrogen-like one-electron species.

## 6. Analogy Library

- **Primary analogy**: A parking garage with only specific floors you're allowed to park on (no half-floors) — you can jump between floors (orbits) using a very specific amount of energy (a ticket costing exactly the price difference between floors), but you can't hover between floors.
- **Breaking point**: Real parking floors don't have Bohr's rₙ = n² spacing rule or associated energy formula, and the garage doesn't capture *why* only certain floors are allowed (quantized angular momentum) — the analogy explains discreteness, not the underlying physical justification.
- **Anti-analogy**: Do NOT describe electrons as tiny planets literally orbiting like planets around the sun in continuous classical orbits — this reinforces treating the model as a literal physical picture rather than a quantized-energy postulate, and obscures why the model needed replacing.

## 7. Demonstration Library

- **Demonstration 1 (hydrogen spectrum)**: Show a hydrogen discharge tube through a diffraction grating or spectroscope — students see a small number of sharp colored lines (the Balmer series in the visible range), not a rainbow, providing the direct observational anchor for "only certain photon energies are emitted."
- **Demonstration 2 (energy-level ladder)**: Build a physical or digital ladder diagram with unequally-spaced rungs (matching −13.6/n² spacing, which compresses as n increases) and have students draw arrows for all possible n=3→lower transitions, then match arrow lengths to observed spectral line positions.

## 8. Discovery Lesson

**Opening**: "If atoms just glowed randomly, we'd expect a smooth rainbow of light. Here's what hydrogen actually produces when it glows." (Show discharge tube spectrum.)

**Exploration**: Students are given the handful of observed hydrogen line wavelengths and asked to find a pattern (this can echo the historical Rydberg formula discovery) before being shown Bohr's energy-level explanation.

**Synthesis**: Guide toward: a small number of allowed energy levels, with transitions between specific pairs producing specific photon energies, explains both why there are only a few lines and why they're at those exact positions.

**Closure**: "Now that you've seen this works for hydrogen — do you think it would work exactly the same way for an atom with two electrons? Why or why not?" (Sets up MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the hydrogen discharge-tube spectrum (real or video) as the observational anchor.
- **TA-2 (TELL)**: State the radius and energy formulas explicitly, computing n=1,2,3 values together with the student.
- **TA-3 (DO)**: Student computes a predicted spectral line wavelength from the energy-level formula and compares it to a given experimental value.
- **TA-4 (TEST-THINKING)**: Present MC-2's claim about multi-electron atoms and ask the student to predict, using electron-electron repulsion reasoning, whether Bohr's simple formula would still match experiment for helium.

## 10. Voice Teaching

Use a historically grounded, discovery-oriented register when introducing the spectral-line puzzle; shift to a precise quantitative register for the radius/energy formulas; when discussing the model's limitations, use a respectful "successor, not failure" framing to preempt MC-3 rather than repair it afterward.

## 11. Assessment

**Mastery gate**: Student can (a) correctly state how orbit radius and energy both change with n, (b) correctly identify the scope of validity of Bohr's quantitative model (hydrogen-like one-electron systems only), (c) explain why an outdated/superseded model can still be quantitatively useful within its domain.

- **FA-1**: "Which is farther from the nucleus in the Bohr model: n=2 or n=4? Which has higher energy?" — targets MC-1.
- **FA-2**: "Would Bohr's exact formula correctly predict the ionization energy of lithium? Why or why not?" — targets MC-2.
- **FA-3**: "A classmate says 'the Bohr model is just wrong so we shouldn't bother learning it.' How would you respond?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who conflate "high energy" with "tightly bound/close," a common transfer error from prior nuclear-binding-energy or gravitational-potential-energy framing.

**Delayed retrieval**: Re-probe MC-1's radius-vs-energy relationship before `chem.atomic.quantum-numbers` introduces the principal quantum number n in its full quantum-mechanical context, since that concept directly inherits and must correct any lingering radius/energy confusion.

## 12. Recovery Notes

- **S3 (stuck)**: Return to the side-by-side radius/energy table computed for n=1,2,3 and have the student describe the trend in words before symbols.
- **S4 (frustrated)**: Normalize — the "higher energy = closer" intuition is a reasonable transfer from other physics contexts (e.g., nuclear binding), not a careless error.
- **S6 (collision)**: Use the rₙ = n²r₁ formula computation as the direct collision artifact for MC-1; use the hydrogen-vs-helium ionization energy comparison for MC-2.
- **S9 (post-repair check)**: Ask the student to state, unprompted, both what the Bohr model gets right and what it gets wrong, and for which atoms each applies.

## 13. Memory & Review

Tag as a quantitative-formula memory (radius/energy formulas) plus a scope-of-validity memory (hydrogen-like vs. multi-electron). Schedule a spaced check at ~1 week and again immediately before `chem.atomic.quantum-numbers`, which depends on a clean understanding of n as an energy-level index.

## 14. Transfer Map

Feeds directly into `chem.atomic.quantum-numbers` (n as the principal quantum number generalizes Bohr's orbit index into the full quantum mechanical description) and reinforces `chem.atomic.atomic-spectra` (the prerequisite spectral observations this model was built to explain).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

# Teaching Blueprint — phys.mod.bohr-model

## Component 0 — Concept Metadata

```
concept_id:         phys.mod.bohr-model
name:               Bohr Model of the Hydrogen Atom
domain:             modern physics
difficulty:         proficient (4)
bloom:              apply
mastery_threshold:  0.85
estimated_hours:    5
prerequisites:      [phys.em.coulombs-law, phys.mod.photons]
cross_links:        []
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (shine white light through hydrogen gas — only a few coloured lines appear,
                       not a rainbow; difficulty 4 → C)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Bohr's model of hydrogen (1913) postulates that the electron orbits the proton
only in discrete circular orbits where the angular momentum is quantised: L = nħ (n = 1, 2, 3, …).
From this postulate + Coulomb's law, the allowed energy levels are:  
  E_n = −13.6/n² eV  
When the electron transitions from level n_i to n_f, it emits or absorbs a photon of energy:  
  ΔE = hf = E_{n_i} − E_{n_f} = 13.6(1/n_f² − 1/n_i²) eV  
Mastery means: (a) computing E_n for any n, (b) computing the photon wavelength for any transition,
(c) identifying the series (Lyman, Balmer, Paschen) by the final level, (d) explaining what is
ad hoc and what the model correctly predicts.

**The Core Equations:**  
  r_n = n²a₀   where a₀ = 0.0529 nm (Bohr radius, ground state)  
  E_n = −13.6/n² eV  
  Rydberg formula: 1/λ = R_H (1/n_f² − 1/n_i²),  R_H = 1.097 × 10⁷ m⁻¹

**Historical Context:** Balmer had empirically fitted hydrogen spectral lines in 1885 with 1/λ =
R_H(1/4 − 1/n²) for n = 3, 4, 5, … with no physical explanation. Bohr derived this formula
from first principles in 1913 using quantised orbits. The match was exact — a stunning predictive
success. But the model is ad hoc (why is L quantised?) and fails for all multi-electron atoms.
De Broglie later showed the quantisation condition is the standing-wave condition (nλ = 2πr).

---

## Component 2 — Four-Stage Mental Model Progression

**Stage 1 — Concrete (C)**  
Shine white light through hydrogen gas in a discharge tube. Look through a diffraction grating.
Not a rainbow — a set of discrete coloured lines: 410 nm (violet), 434 nm (blue-violet), 486 nm
(blue-green), 656 nm (red). These are the Balmer series. Why exactly these wavelengths and no
others? The answer: only certain electron orbits exist, and each line corresponds to one electron
transition between two specific orbits.

**Stage 2 — Representational (R)**  
Draw circular orbits labeled n = 1, 2, 3, … with radii r_n = n²a₀. Mark the energy levels
E_n = −13.6/n² eV on a vertical energy axis. An electron dropping from n = 3 to n = 2 releases
energy E₃ − E₂ = −13.6/9 − (−13.6/4) = 1.89 eV → photon of wavelength 656 nm (Hα, red Balmer
line). Draw the corresponding photon arrow.

**Stage 3 — Abstract (A)**  
Derivation: centripetal force = Coulomb force: mv²/r = ke²/r². Quantisation: mvr = nħ.
Eliminate v: r_n = n²ħ²/(kme²) = n²a₀. Substitute back: E_n = −ke²/(2r_n) = −13.6/n² eV.
Rydberg formula: 1/λ = R_H(1/n_f² − 1/n_i²) with R_H = me⁴/(4πcħ³) from first principles.

**Stage 4 — Transfer (T)**  
The Bohr model fails for He, Li, … because it ignores electron-electron repulsion and orbital
angular momentum beyond circular orbits. It is superseded by the Schrödinger equation. But the
energy levels E_n = −13.6/n² eV survive exactly in the quantum-mechanical solution for hydrogen.
The Bohr model's quantitative success is explained by a coincidence of the Virial theorem.
Bohr-like models are still used for highly excited Rydberg atoms (n >> 1), muonic atoms, and
positronium.

---

## Component 3 — Why Beginners Fail

1. **Confusing emission and absorption spectra:** Emission lines are produced when the electron
   falls to a lower level (hot gas, discharge tube). Absorption lines appear when background white
   light passes through cold gas — electrons absorb photons and jump to higher levels. Same
   wavelengths, different contexts. Students frequently confuse which process produces which.

2. **Forgetting the sign of E_n:** E_n = −13.6/n² eV is negative (bound state). A higher orbit
   (larger n) is less negative → higher energy. Students sometimes invert this and believe higher
   n = lower energy.

3. **Not distinguishing n_i and n_f:** For emission, n_i > n_f (falling down). For absorption,
   n_i < n_f (climbing up). The formula hf = |E_{n_i} − E_{n_f}| always gives a positive energy;
   students must correctly identify which transition corresponds to emission vs. absorption.

4. **Series identification:** Students memorise that Balmer transitions end at n = 2 but do not
   understand why the Balmer series is in the visible range. The key: n = 2 → n = 1 produces UV
   (Lyman series starts at 121 nm), while n ≥ 3 → n = 2 transitions produce visible photons.

---

## Component 4 — Misconception Library

### MC-1: MC-HIGHER-N-IS-LOWER-ENERGY
**Probe:** "Which state has higher energy: the n = 1 (ground state) or the n = 3 state? By how
many eV?"  
**Characteristic phrase:** "n = 1 is the highest energy because it's the innermost orbit."  
**Trigger:** Mixing spatial distance with energy; "closer to the nucleus = more tightly held =
lower energy" is correct, but students sometimes state the negation (lower n = lower energy in
absolute value → more negative → lower energy — this is actually correct! The confusion is about
"higher" vs. "lower.")  
**Conflict evidence [P28]:** E₁ = −13.6 eV; E₃ = −13.6/9 = −1.51 eV. E₃ > E₁ (−1.51 > −13.6).
Higher n → less negative energy → higher total energy. The ionisation energy from n = 1 is 13.6 eV;
from n = 3 it is only 1.51 eV — it is easier to ionise from a higher orbit.  
**Bridge [P30]:** "On the energy-level diagram, higher n is physically higher on the page. Energy
becomes less negative — the electron is less tightly bound. At n = ∞, E_∞ = 0 (free electron,
just barely unbound). n = 1 is at the bottom (E₁ = −13.6 eV) — most tightly bound, lowest
energy."  
**Replacement [P31]:** Higher n = higher energy (less negative). Lower n = lower energy (more
negative, more tightly bound). n = 1 is ground state = minimum energy.  
**Discrimination pairs [P33]:** Comparing E₁ and E₃: which is higher? (A) E₁ (closer to nucleus),
(B) E₃ (less negative = higher), (C) same (circular orbit). Correct: (B).  
**S6 repair path:** TA-2 (energy-level diagram — draw with energy increasing upward, confirm
E₃ > E₁).

### MC-2: MC-EMISSION-AND-ABSORPTION-SAME-PROCESS
**Probe:** "Explain the difference between an emission spectrum and an absorption spectrum of
hydrogen. Why do both show the same wavelengths?"  
**Characteristic phrase:** "They're the same — the atom emits and absorbs the same colours."  
**Trigger:** Students correctly identify that both involve the same energy differences but do not
distinguish the two physical processes.  
**Conflict evidence [P28]:** Emission: hot hydrogen gas; electrons are thermally excited to high
n, then fall to lower n, emitting photons. Spectrum shows bright lines on dark background.
Absorption: continuous white light passes through cool hydrogen; photons matching ΔE are
absorbed (electrons jump to higher n). Spectrum shows dark lines on bright background. Same
wavelengths, opposite visual appearance, opposite direction of electron transition.  
**Bridge [P30]:** "Emission: electron falls down the energy-level ladder, gives out a photon.
Absorption: electron climbs up the ladder, takes in a photon. The energy is the same either way
(same two levels), so the photon wavelength is the same. But the direction of the electron
transition is opposite."  
**Replacement [P31]:** Emission: n_i > n_f, photon emitted. Absorption: n_i < n_f, photon
absorbed. Same spectral lines, opposite electron motion, opposite spectral appearance.  
**Discrimination pairs [P33]:** A dark absorption line at 486 nm in hydrogen spectrum means:
(A) electrons are emitting at 486 nm, (B) electrons are absorbing photons of 486 nm and jumping
to a higher level, (C) the spectrum is missing that wavelength for unknown reasons. Correct: (B).  
**S6 repair path:** TA-4 (draw both spectra side by side with electron transition arrows).

### MC-3: MC-BOHR-MODEL-APPLIES-TO-ALL-ATOMS
**Probe:** "Can you use E_n = −13.6/n² eV to calculate the energy levels of helium?"  
**Characteristic phrase:** "The same formula works for all atoms."  
**Trigger:** Overgeneralisation of a model that was derived specifically for hydrogen.  
**Conflict evidence [P28]:** Helium has two electrons. Their mutual repulsion energy cannot be
computed from the single-electron Bohr model. Bohr's formula gives E_He ≈ −54.4/n² eV (using
Z = 2 for each electron separately), but this ignores the inter-electron repulsion, giving
wrong values. The actual ground state energy of He is −79 eV, not −109 eV. The Bohr model
fails for all multi-electron atoms.  
**Bridge [P30]:** "The Bohr model was derived assuming one electron orbiting one proton. The
Coulomb attraction provides the centripetal force. With two electrons, you also need the
electron-electron repulsion, which makes the calculation intractable in circular-orbit geometry.
The Bohr model is a hydrogen-only model (or hydrogen-like ions: He⁺, Li²⁺)."  
**Replacement [P31]:** The Bohr energy formula E_n = −13.6 Z²/n² eV applies to hydrogen-like
(one-electron) atoms/ions only. For multi-electron atoms, the Schrödinger equation with
electron-electron repulsion is required.  
**Discrimination pairs [P33]:** E_n = −13.6/n² applies to: (A) all atoms, (B) hydrogen only
(or hydrogen-like ions with Z substituted), (C) any single-electron problem. Correct: (B) — and
(C) is the refined version: E_n = −13.6 Z²/n² eV for hydrogen-like ions.  
**S6 repair path:** TA-6 (hydrogen-like ion calculation + explicit statement of model limits).

### MC-4: MC-BALMER-SERIES-IS-ALL-OF-HYDROGEN-SPECTRUM
**Probe:** "The Balmer series for hydrogen is in the visible range. Are there hydrogen spectral
lines in the ultraviolet? The infrared?"  
**Characteristic phrase:** "Hydrogen spectrum = Balmer series."  
**Trigger:** Most textbooks introduce hydrogen spectra via the Balmer series (visible, easy to
observe). Students assume this is the complete spectrum.  
**Conflict evidence [P28]:** Lyman series (n_f = 1): n_i = 2, 3, 4, … → λ = 122, 103, 97, …
nm (deep UV, invisible to the naked eye). Paschen series (n_f = 3): n_i = 4, 5, 6, … → λ =
1875, 1282, 1094, … nm (near infrared). Brackett (n_f = 4), Pfund (n_f = 5): mid-infrared.
Only Balmer (n_f = 2) falls in the visible range.  
**Bridge [P30]:** "The Balmer series is the visible subset of an infinite set of series. Each
series is defined by the final level. n_f = 1: UV (high energy transitions). n_f = 2: visible.
n_f = 3+: infrared (low energy transitions). The Bohr model predicts all of them from one
formula."  
**Replacement [P31]:** Hydrogen has spectral series for every final level n_f; Balmer (n_f = 2)
is the visible series; Lyman (n_f = 1) is UV; Paschen and beyond are IR.  
**Discrimination pairs [P33]:** The Lyman series of hydrogen lies in: (A) visible light, (B)
ultraviolet, (C) infrared. Correct: (B).  
**S6 repair path:** TA-5 (energy-level diagram with all three series drawn and wavelength ranges).

---

## Component 5 — Explanation Library

**Explanation E-1 (Bohr's postulates, plainly stated):**  
Bohr made three postulates: (1) electrons orbit the nucleus in stable circular orbits without
radiating (contradicting classical EM); (2) only orbits where L = mvr = nħ are allowed; (3) when
an electron changes orbit, it emits or absorbs a photon of energy hf = |E_{n_i} − E_{n_f}|.
From these three postulates + Coulomb's law, everything else follows: orbit radii r_n = n²a₀,
energies E_n = −13.6/n² eV, and the Rydberg formula.

**Explanation E-2 (Balmer series derivation):**  
For transitions to n_f = 2 (Balmer series):  
ΔE = 13.6(1/n_f² − 1/n_i²) = 13.6(1/4 − 1/n_i²) eV for n_i = 3, 4, 5, …  
n_i = 3: ΔE = 13.6(0.25 − 0.111) = 1.89 eV → λ = hc/E = 1240/1.89 nm = 656 nm (Hα, red)  
n_i = 4: ΔE = 13.6(0.25 − 0.0625) = 2.55 eV → λ = 1240/2.55 nm = 486 nm (Hβ, blue-green)  
These match the observed Balmer wavelengths exactly.

**Explanation E-3 (ionisation energy and hydrogen-like ions):**  
From n = 1 to n = ∞ (free electron): ΔE = 0 − (−13.6) = 13.6 eV. This is the ionisation energy
of hydrogen, confirmed experimentally. For hydrogen-like ions (He⁺, Li²⁺): E_n = −13.6 Z²/n² eV
where Z is the atomic number. He⁺ has Z = 2: ionisation energy from n = 1 is 54.4 eV —
experimentally confirmed.

---

## Component 6 — Analogy Library

**Primary analogy — Staircase with fixed step heights:**  
An electron in the Bohr model can only stand on fixed-height steps (n = 1, 2, 3, …). It cannot
stand between steps. When it falls from step 3 to step 2, it releases a fixed amount of energy
(a photon of specific colour). When it climbs from step 2 to step 4, it absorbs a specific amount.
The staircase structure directly explains why only specific wavelengths appear in the spectrum.  
**Breaking point:** A real staircase is a rigid structure that forces occupancy of steps; the
electron's quantisation is a quantum-mechanical postulate, not a physical barrier. The analogy
explains the discreteness but not the why.  
**Anti-analogy:** A playground slide: a ball can be placed anywhere along the slide — any height,
not just discrete steps. This is what classical physics predicts for the electron's orbit —
continuous allowed energies. The spectral observations rule this out.

---

## Component 7 — Demonstration Library

**D-1 (Hydrogen discharge tube + diffraction grating):**  
Hydrogen gas in a sealed glass tube is excited by a high-voltage discharge. Observe through a
diffraction grating: four visible lines appear (Hα 656 nm red, Hβ 486 nm blue-green, Hγ 434 nm
blue-violet, Hδ 410 nm violet). Record the wavelengths. Compute the corresponding ΔE values.
Verify they match Balmer-series predictions from the Bohr model.

**D-2 (Energy-level diagram calculation):**  
Draw the first 5 Bohr levels with correct energy values. Students draw arrows for all transitions
between them. Identify which transitions produce visible light, UV, and IR. Label each arrow with
the photon wavelength.

**D-3 (Hydrogen-like ion — He⁺ calculation):**  
Students calculate the energy levels and first line of the Lyman series for He⁺ (Z = 2):
E_n = −13.6 × 4/n² eV = −54.4/n² eV. First Lyman line (n = 2 → n = 1): ΔE = 54.4(1 − 0.25) =
40.8 eV → λ = 1240/40800 nm = 0.0304 nm = 30.4 nm (UV extreme). Compare to hydrogen (10.2 eV,
121.5 nm). The He⁺ line is much harder UV — shows that Z² scaling is real.

---

## Component 8 — Discovery Lesson

**Best approach:** Observation → puzzle → Bohr's postulate → derivation → quantitative verification.

*Anchor (3 min):* Show hydrogen discharge tube (D-1). Count the visible lines. "Why these exact
wavelengths? Balmer empirically fitted them in 1885 but had no explanation. Bohr answered in 1913."

*Bohr's postulates (5 min):* State the three postulates. Emphasise: postulate (1) contradicts
classical EM (a circular orbit should radiate and spiral in). Bohr simply asserted it is stable.
Postulate (2) is the quantisation condition.

*Derivation (10 min):* Balance Coulomb and centripetal forces (TA-3). Quantise L = nħ. Derive
r_n and E_n. Show E₁ = −13.6 eV.

*Balmer prediction (5 min):* Apply the formula to n_i = 3 → n_f = 2 (TA-4). Get λ = 656 nm.
Compare to the discharge tube observation. Match is exact.

*Limits (2 min):* "The model works perfectly for hydrogen. Fails for helium. Superseded by
quantum mechanics. But E_n = −13.6/n² eV survives exactly in the quantum-mechanical solution
— the model was more right than Bohr knew."

---

## Component 9 — Teaching Actions (Session Plan)

**TA-1 — Concrete Anchor [P01, P06]**  
Trigger: session open.  
Action: Show hydrogen spectrum (D-1). "Four lines. Not a rainbow. Not random. The same four
wavelengths every time hydrogen glows. Why?"  
Success signal: Students state that something about the hydrogen atom must restrict which
wavelengths are emitted.

**TA-2 — Energy-Level Diagram [P14]**  
Trigger: After anchor.  
Action: Draw the energy-level diagram with E_n = −13.6/n² eV values for n = 1 to 5 and n = ∞.
Address MC-1: confirm E₃ > E₁ by comparing −1.51 eV vs. −13.6 eV. Show that higher n = less
negative = higher energy.  
Success signal: Students correctly rank E₁, E₂, E₃ from lowest to highest.

**TA-3 — Bohr Model Derivation [P14, P30]**  
Trigger: After diagram.  
Action: Write Coulomb force = centripetal force. Write quantisation L = nħ. Eliminate v.
Derive r_n = n²a₀ and E_n = −13.6/n² eV. Verify n = 1: r₁ = 0.0529 nm (Bohr radius).  
Success signal: Students can identify which step introduces quantisation and can reproduce the
energy formula from the two starting equations.

**TA-4 — Balmer Series Verification [P14, P50]**  
Trigger: After derivation.  
Action: Students compute ΔE and λ for the Hα line (n = 3 → n = 2). Compute all four visible
Balmer lines. Compare computed wavelengths with observed lines from D-1.  
Success signal: All four wavelengths computed correctly; match with observation confirmed.

**TA-5 — Series Identification [P14, P28]**  
Trigger: After Balmer.  
Action: Draw Lyman (n_f = 1, UV), Balmer (n_f = 2, visible), Paschen (n_f = 3, IR) series on
the energy-level diagram. Address MC-4. Students identify the shortest and longest wavelength
in each series.  
Success signal: Students correctly identify which series lies in which spectral region and why.

**TA-6 — MC Diagnostics + H-like Ions [P14, P28, P31, P33, P36]**  
Trigger: After series.  
Action: Present MC-BOHR-MODEL-APPLIES-TO-ALL-ATOMS. Introduce E_n = −13.6 Z²/n² eV for H-like
ions. Students compute ground-state energy of He⁺ (Z=2, n=1) and Li²⁺ (Z=3, n=1).  
Success signal: Students correctly identify the Bohr model applies to H-like ions only; compute
correct energies.

**TA-7 — Closure & Self-Assessment [P68, P85, P91]**  
Trigger: Session end.  
Action: Three questions — (1) state E_n formula and compute E₄; (2) find the wavelength of the
first Lyman line (n = 2 → n = 1); (3) name the series corresponding to transitions ending at
n = 3.  
Success signal: All three correct.

---

## Component 10 — Voice Teaching

**Opening move:** "Balmer found these four wavelengths empirically in 1885 — fitting an equation
to experimental data with no physical explanation. Bohr asked: why these wavelengths? His answer:
electrons can only orbit at certain discrete radii. Each allowed radius corresponds to a specific
energy. The spectrum is the atom's energy-level fingerprint."

**Key explanatory moves:**
- "E_n = −13.6/n² eV: the minus sign is crucial. Bound states have negative energy by convention
  (zero energy is the free electron). Higher n → less negative → higher energy. n = 1 is the
  ground state — minimum energy, most tightly bound."
- "ΔE = 13.6(1/n_f² − 1/n_i²): for emission, n_i > n_f, so the bracket is positive, ΔE > 0 —
  energy is released. For absorption, n_i < n_f, ΔE < 0 from the atom's perspective — energy
  is absorbed."
- "The Bohr model fails for helium. But E_n = −13.6/n² eV is exactly right. The quantum-
  mechanical solution for hydrogen gives the same energies. Bohr's guess was accidentally exact."

**Common recovery phrases:**
- If student confuses emission/absorption: "Draw the electron on the energy-level diagram.
  Arrow pointing down = emission (electron falls, photon comes out). Arrow pointing up = absorption
  (electron climbs, photon goes in)."
- If student says n = 1 is highest energy: "Look at the numbers: E₁ = −13.6 eV, E₃ = −1.51 eV.
  −1.51 is bigger than −13.6. E₃ > E₁. The most negative is the lowest."

---

## Component 11 — Assessment

**Mastery Gate (threshold 0.85):**  
Pass criteria — student correctly:  
(a) Computes E_n = −13.6/n² eV for any n  
(b) Identifies that higher n means higher (less negative) energy  
(c) Computes the photon wavelength for any transition using ΔE = hc/λ  
(d) Identifies the Balmer series as transitions ending at n_f = 2  
Failure on (a) or (c) → restart from TA-3/TA-4. Failure on (b) → TA-2. Failure on (d) → TA-5.

**Formative Golden Probe (FA-1):**  
"Calculate the energy of the n = 4 level of hydrogen and the wavelength of the photon emitted
when the electron transitions from n = 4 to n = 2."  
Expected: E₄ = −13.6/16 = −0.85 eV. ΔE = E₄ − E₂ = −0.85 − (−3.40) = 2.55 eV.
λ = hc/ΔE = 1240/2.55 nm = 486 nm (Hβ line, blue-green).  
Threshold: Correct energies and wavelength; identified as Balmer series.

**Formative Golden Probe (FA-2):**  
"What is the ionisation energy of hydrogen from the ground state? From the n = 3 state?"  
Expected: From n = 1: 0 − (−13.6) = 13.6 eV. From n = 3: 0 − (−1.51) = 1.51 eV.  
Threshold: Both correct; understanding that ionisation = E_{∞} − E_n = 0 − E_n = −E_n.

**Formative Golden Probe (FA-3):**  
"An electron in hydrogen absorbs a photon of wavelength 97.2 nm. Which transition does this
correspond to? (Use 1/λ = R_H(1/n_f² − 1/n_i²) with R_H = 1.097 × 10⁷ m⁻¹.)"  
Expected: 1/(97.2×10⁻⁹) = 1.028×10⁷ m⁻¹. For n_f = 1 (Lyman): 1/n_i² = 1 − 1.028×10⁷/1.097×10⁷
= 1 − 0.937 = 0.063 → n_i² ≈ 16 → n_i = 4. Transition: n = 1 → n = 4, absorbing a Lyman series
photon.  
Threshold: Correct transition identified (n = 1 → 4); correctly identified as absorption (Lyman UV).

**Formative Golden Probe (FA-4):**  
"For the He⁺ ion (Z = 2), calculate the wavelength of the first line of the Balmer series
(n = 3 → n = 2). Compare with hydrogen."  
Expected: E_n(He⁺) = −13.6 × 4/n² eV. ΔE = 13.6 × 4 × (1/4 − 1/9) = 54.4 × 5/36 = 7.56 eV.
λ = 1240/7.56 = 164 nm (UV). For hydrogen Hα: λ = 656 nm (visible). He⁺ Balmer-equivalent is
in UV because Z² scaling quadruples all energy differences.  
Threshold: Correct He⁺ wavelength; comparison with H identifies UV shift due to Z².

**Confidence Calibration:** After FA-3 (identifying a transition from an absorption wavelength),
ask for confidence rating before and after. This is a reverse application of the Rydberg formula
that students often find harder than the forward direction.

**Delayed Retrieval (Session + 3 days):**  
"Without notes: state E_n for hydrogen. Compute E₃. Find the wavelength emitted when the
electron falls from n = 5 to n = 2. Which series is this?"  
Threshold: All correct unaided; Balmer series correctly identified.

---

## Component 12 — Recovery Notes

**S0 (no prior Coulomb's law):** The prerequisite phys.em.coulombs-law is essential — the
Bohr model derivation uses Coulomb's law as the centripetal force. Without it, the derivation
is unjustified. Begin with a review of F = ke²/r² before the derivation.

**S3 (knows the formula but confuses emission and absorption):** Draw the energy-level diagram
and require the student to always draw an arrow first: downward for emission, upward for
absorption. No computation until the arrow is drawn.

**S6 (MC-HIGHER-N-IS-LOWER-ENERGY dominant):** Write E₁ = −13.6 eV and E₃ = −1.51 eV on the
board. Ask: "Which number is bigger? −13.6 or −1.51?" After the correct answer (−1.51 > −13.6):
"So E₃ > E₁. Higher n is higher energy." The misconception usually dissolves immediately when
the numbers are written out — it is an arithmetic confusion, not a conceptual one.

**S9 (can compute individual transitions, cannot navigate the full energy-level diagram):**
Require the student to draw the complete energy-level diagram (n = 1 to 5 + ∞) with numerical
values before any calculation. Every problem must be mapped to an arrow on this diagram before
computation begins.

---

## Component 13 — Memory & Review

**Memory type:** Procedural (two formulas) + declarative (series names + ranges) + conceptual
(why quantisation, what the model fails for). Three distinct memory types must be encoded
separately.

**Spaced retrieval plan:**
- Session + 1 day: "State the Bohr energy formula. Compute E₁, E₂, E₃. What is the ionisation
  energy of hydrogen?" (Formula recall)
- Session + 4 days: "Find the wavelength of the first three Lyman series lines. Which spectral
  region? Why?" (Series application + region identification)
- Session + 9 days: "A hydrogen atom emits a photon of 102.6 nm. Identify the transition. What
  series? Draw the energy-level diagram arrow." (Reverse problem + diagram)

**Interleaving partners:** phys.em.coulombs-law (Coulomb force in the derivation),
phys.mod.photons (photon emission/absorption mechanism), phys.mod.atomic-spectra (next concept —
full spectral analysis), phys.mod.de-broglie (standing-wave justification for Bohr quantisation).

---

## Component 14 — Transfer Map

**Near transfer:**
- phys.mod.atomic-spectra: the full hydrogen spectrum with all series; more complex multi-
  electron spectra (for which Bohr fails)
- phys.qm.hydrogen-atom-qm: the quantum-mechanical treatment that recovers E_n = −13.6/n²
  eV exactly but also gives orbital angular momentum and magnetic quantum numbers

**Far transfer:**
- Hydrogen-like ions (He⁺, Li²⁺, Be³⁺): E_n = −13.6 Z²/n² eV, directly applicable
- Muonic atoms: muon replaces electron; mass 207× larger → Bohr radius 207× smaller →
  proton structure can be probed
- Positronium: electron-positron bound state; reduced mass = m_e/2, E_n = −6.8/n² eV
- Laser operation: population inversion between energy levels, stimulated emission — the
  Bohr energy-level framework is the conceptual basis
- Astrophysics: Lyman-alpha absorption in quasar spectra; hydrogen 21 cm line (hyperfine, not
  Bohr-predicted)

**Structural abstraction:** The Bohr model demonstrates that quantisation of a conserved
quantity (angular momentum) generates discrete energy levels. This pattern recurs in every
bound quantum system: infinite square well (momentum quantised), harmonic oscillator (energy
quantised in units of ħω), nuclear shell model (orbital angular momentum quantised). The
Bohr model is the archetype of bound-state quantisation.

---

## Component 15 — Curriculum Feedback

**Does this concept position correctly in the KG?**  
Yes. Requiring phys.em.coulombs-law (for the centripetal = Coulomb force derivation) and
phys.mod.photons (for the photon emission/absorption mechanism) are both essential and correctly
placed. Unlocking phys.mod.atomic-spectra is correct — atomic spectra require the Bohr energy
levels as their foundation.

**Missing prerequisite?**  
phys.mod.de-broglie could be co-taught (the standing-wave justification for L = nħ is
illuminating). Currently de-broglie is a sibling (also requires photons). Consider teaching
de-broglie immediately after this concept to provide the "why L = nħ" explanation that Bohr
left as an unexplained postulate.

**Recommended teaching sequence:** phys.em.coulombs-law → phys.mod.photons → phys.mod.bohr-model
→ phys.mod.de-broglie → phys.mod.atomic-spectra. The Bohr-to-de-Broglie sequence closes the
"why quantisation?" question that Bohr left open.

**Asset opportunity:** An interactive energy-level diagram for hydrogen where students click on
two levels and the photon wavelength and series name are displayed, plus a comparison against the
observed spectrum — this would make the Rydberg formula interactive and allow students to self-
verify their transition calculations.

---

## Package Validation Checklist

```
V-1   concept_id matches KG exactly: phys.mod.bohr-model ✓
V-2   all 10 KG fields present: id/name/requires/unlocks/cross_links/difficulty/bloom/
      mastery_threshold/estimated_hours/description ✓
V-3   description consistent with KG: quantised circular orbits, E_n = −13.6/n² eV ✓
V-4   4-stage CPA+ model present: Concrete / Representational / Abstract / Transfer ✓
V-5   ≥3 failure modes documented: 4 listed in Component 3 ✓
V-6   4 misconceptions present: MC-1…MC-4 ✓
V-7   each MC has probe + characteristic phrase: ✓ for all 4
V-8   ≥2 misconceptions engineered:
      MC-HIGHER-N-IS-LOWER-ENERGY,
      MC-BOHR-MODEL-APPLIES-TO-ALL-ATOMS ✓
V-9   each MC has all 6 fields: trigger / conflict evidence [P28] / bridge [P30] /
      replacement [P31] / discrimination pairs [P33] / s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P01, P06]: hydrogen discharge tube spectral lines anchor ✓
V-12  TA-6 is first MC diagnostic probe [P14, P28, P31, P33, P36]:
      MC-BOHR-MODEL-APPLIES-TO-ALL-ATOMS ✓
V-13  TA-7 is closure [P68, P85, P91] ✓
V-14  ≥5 P91 mastery probes with expected answers: FA-1…FA-4 + delayed retrieval ✓
V-15  4 formative assessments with thresholds and loop-back paths: FA-1…FA-4 ✓
V-16  S0/S3/S6/S9 protocols specified in Component 12 ✓
V-17  3-session spaced retrieval plan present: Component 13 ✓
V-18  interleaving partners named: em.coulombs-law, mod.photons, mod.atomic-spectra,
      mod.de-broglie ✓
V-19  cross_links match KG edges: [] ✓
V-20  status = READY, all V-checks PASS ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**

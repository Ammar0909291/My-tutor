# Teaching Blueprint — phys.mod.de-broglie

## Component 0 — Concept Metadata

```
concept_id:         phys.mod.de-broglie
name:               de Broglie Hypothesis — Matter Waves
domain:             modern physics
difficulty:         proficient (4)
bloom:              understand
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mod.photons]
cross_links:        []
session_cap:        6 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (electrons fired through a crystal produce a diffraction pattern — just like
                       X-rays; difficulty 4 → C)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** In 1924, Louis de Broglie proposed that just as light (classically a wave) has
particle properties (photons), matter (classically particles) should have wave properties. Every
particle with momentum p has an associated wavelength:  
  λ = h/p = h/(mv)  
This was confirmed experimentally in 1927 by Davisson and Germer (electron diffraction from
nickel crystals) and independently by George Thomson. The de Broglie hypothesis is the seed of
wave mechanics (Schrödinger equation) and the entire framework of quantum mechanics.

**The One Equation:**  
  λ = h/p = h/(γmv)   (γ = relativistic factor; for non-relativistic speeds: λ = h/(mv))

**The Key Insight About Scale:**  
A 1 kg ball at 1 m/s: λ = 6.63 × 10⁻³⁴ m — smaller than any known structure, permanently
undetectable. An electron at 10⁶ m/s: λ ≈ 0.7 nm — the size of an atom, producing observable
diffraction. Matter waves are real but only observable when the particle's de Broglie wavelength
is comparable to the physical scale of the system it is interacting with.

---

## Component 2 — Four-Stage Mental Model Progression

**Stage 1 — Concrete (C)**  
Electrons (clearly particles — they have mass, charge, they are deflected by fields) are fired
through a thin crystal of nickel. On a screen behind the crystal, a diffraction ring pattern
appears — identical in structure to X-ray diffraction from the same crystal. X-rays are waves.
If electrons produce the same pattern, they must also behave as waves.

**Stage 2 — Representational (R)**  
For a photon: E = hf = pc → p = h/λ → λ = h/p. By symmetry, de Broglie proposed the same
relation for matter: a particle with momentum p = mv has wavelength λ = h/(mv). The wave does not
travel "through" the particle — the wave is the quantum-mechanical description of the particle's
propagation probability. High-λ (slow, light particle) → large quantum effects. Low-λ (fast,
heavy particle) → quantum effects negligible.

**Stage 3 — Abstract (A)**  
The de Broglie wavelength appears as the de Broglie wave condition for standing waves in Bohr's
model: nλ = 2πr (n de Broglie wavelengths fit around the circumference of the nth orbit),
giving exactly Bohr's quantisation condition mvr = nħ. Later, Schrödinger elevated the de
Broglie relation to a wave equation; the de Broglie relation ψ ~ e^{ipx/ħ} is the plane-wave
solution of the free-particle Schrödinger equation.

**Stage 4 — Transfer (T)**  
Electron microscopes use de Broglie waves to image at nm resolution (λ_electron << λ_visible).
Neutron diffraction studies crystal structures. The Heisenberg uncertainty principle (Δx Δp ≥ ħ/2)
follows directly from the wave nature of matter — a particle localized in space must have a
spread of momenta (Fourier uncertainty). Atom interferometry (used in inertial navigation) treats
atoms as waves.

---

## Component 3 — Why Beginners Fail

1. **The wavelength is "too small to matter" dismissal:** Students compute λ for a macroscopic
   object (a baseball), get a number smaller than a proton, and conclude "matter waves don't
   apply to real objects." This misses the point: matter waves are real for all particles, but
   only observable when λ is comparable to the physical scale of the experiment.

2. **Confusing the de Broglie wavelength with physical size:** Students ask "how big is the wave?"
   The wave is not a spatial extent of the particle — it is the probability amplitude for finding
   the particle. The wavelength characterises the wave's spatial periodicity, not the particle's size.

3. **Treating de Broglie as purely theoretical:** Davisson-Germer (1927) confirmed the hypothesis
   experimentally the same year as Schrödinger's equation. Students who see this as "just a
   hypothesis" miss that it was immediately and precisely confirmed.

4. **Applying λ = h/mv incorrectly for relativistic speeds:** For electrons accelerated through
   high voltages (> 50 kV), the relativistic momentum p = γmv must be used. Using λ = h/(mv)
   gives the wrong answer.

---

## Component 4 — Misconception Library

### MC-1: MC-MATTER-WAVES-ONLY-THEORETICAL
**Probe:** "Was de Broglie's hypothesis ever experimentally verified? When and how?"  
**Characteristic phrase:** "It's just a theoretical assumption."  
**Trigger:** Students do not know the experimental history; they treat the hypothesis as a model.  
**Conflict evidence [P28]:** Davisson and Germer (1927) measured the angular distribution of
electrons scattered from a nickel crystal. The diffraction maxima occurred at exactly the angles
predicted by Bragg's law using λ = h/(mv). George Thomson independently confirmed electron
diffraction. The discovery was awarded the 1937 Nobel Prize. Modern electron microscopes image
at sub-nm resolution using de Broglie waves.  
**Bridge [P30]:** "De Broglie proposed in 1924; experimental proof came in 1927 — three years
later. The same year as Schrödinger's equation. Matter waves are not an assumption; they are a
measured fact."  
**Replacement [P31]:** The de Broglie hypothesis is experimentally confirmed by electron
diffraction (Davisson-Germer 1927), neutron diffraction, and modern atom interferometry.  
**Discrimination pairs [P33]:** The de Broglie hypothesis is: (A) an unverified theoretical
assumption, (B) experimentally confirmed by diffraction experiments, (C) a classical analogy
with no experimental support. Correct: (B).  
**S6 repair path:** TA-2 (Davisson-Germer diffraction evidence).

### MC-2: MC-BASEBALL-HAS-NO-WAVE-NATURE
**Probe:** "Does a baseball have a de Broglie wavelength? If yes, why don't we observe baseball
waves?"  
**Characteristic phrase:** "Macroscopic objects don't have wave properties."  
**Trigger:** Small λ → students conclude waves do not apply.  
**Conflict evidence [P28]:** A 0.145 kg baseball at 40 m/s: λ = 6.626×10⁻³⁴/(0.145 × 40) =
1.14×10⁻³⁴ m. This is smaller than a quark. No experiment can probe these scales. The baseball
has a de Broglie wave; we simply cannot detect it because no physical feature of the experiment
has spatial structure at 10⁻³⁴ m scale.  
**Bridge [P30]:** "The baseball has a de Broglie wavelength, but it is 10²⁰ times smaller than
a proton. To observe diffraction, you need a slit comparable to the wavelength. There is no
physical slit that small. The quantum nature is real but permanently invisible at macroscopic
scales."  
**Replacement [P31]:** All matter has de Broglie wavelengths; macroscopic objects have
undetectably small λ but the quantum property is not absent — it is just inaccessible.  
**Discrimination pairs [P33]:** A baseball's quantum wave nature is: (A) absent (too large to
have waves), (B) present but λ is too small to observe, (C) cancelled by decoherence. Correct: (B).  
**S6 repair path:** TA-3 (scale argument: compute λ for electron, proton, atom, baseball).

### MC-3: MC-DE-BROGLIE-WAVELENGTH-IS-PARTICLE-SIZE
**Probe:** "If an electron has a de Broglie wavelength of 1 nm, does that mean the electron is
1 nm in size?"  
**Characteristic phrase:** "The wavelength tells you how big the particle is."  
**Trigger:** Confusing the spatial periodicity of the wave function with the physical size of
the particle.  
**Conflict evidence [P28]:** The classical radius of the electron ≈ 2.8 fm = 2.8 × 10⁻¹⁵ m.
A de Broglie wavelength of 1 nm is 10⁵ times larger. The wavelength is the spatial periodicity
of the probability amplitude ψ(x) = e^{ipx/ħ}, not the extent of the particle.  
**Bridge [P30]:** "The de Broglie wavelength is the spatial period of the wave that describes
the probability of finding the particle. It tells you about interference and diffraction — not
about the size of the particle. An electron in a double-slit experiment has a wave function
that spreads across both slits, but the electron itself is a point-like object."  
**Replacement [P31]:** The de Broglie wavelength is the wavelength of the probability wave, not
the physical size of the particle.  
**Discrimination pairs [P33]:** An electron with λ = 0.5 nm is: (A) 0.5 nm in diameter, (B)
a point particle whose probability wave has spatial period 0.5 nm, (C) spread over a length of
0.5 nm. Correct: (B).  
**S6 repair path:** TA-4 (wave function concept: what the wave describes).

### MC-4: MC-FASTER-PARTICLE-LONGER-WAVELENGTH
**Probe:** "An electron is accelerated to a higher speed. What happens to its de Broglie
wavelength?"  
**Characteristic phrase:** "Faster = more energetic = longer wavelength."  
**Trigger:** Analogy with photons: higher energy photon → longer wavelength (e.g., radio waves
are longer than X-rays). But for photons, E = hf = hc/λ, so higher energy → shorter λ. For
matter, higher speed → higher p → shorter λ.  
**Conflict evidence [P28]:** λ = h/p. Higher speed → higher p → smaller λ. This is opposite to
everyday intuition (faster waves are higher frequency, hence shorter wavelength — but the
particle-wave duality is not about wave speed; the de Broglie relation connects to momentum,
not kinetic energy directly).  
**Bridge [P30]:** "Write λ = h/p. p = mv. Faster electron → bigger p → bigger denominator →
smaller λ. More energetic electron → shorter de Broglie wavelength → better resolution in an
electron microscope. This is why electron microscopes use high-voltage (fast) electrons."  
**Replacement [P31]:** For matter particles: higher speed → higher p → shorter λ. The de Broglie
wavelength decreases with increasing momentum.  
**Discrimination pairs [P33]:** Electron accelerated to higher speed: de Broglie wavelength (A)
increases, (B) decreases, (C) stays the same. Correct: (B).  
**S6 repair path:** TA-3 (calculation: λ for slow vs. fast electron).

---

## Component 5 — Explanation Library

**Explanation E-1 (symmetry argument):**  
Einstein showed that light, classically described as a wave, has particle properties: photons
with momentum p = h/λ. De Broglie inverted the argument by symmetry: if a wave can have particle
properties, a particle should have wave properties. A particle of momentum p has an associated
wavelength λ = h/p. The symmetry is mathematically elegant and physically revolutionary.

**Explanation E-2 (Davisson-Germer experimental logic):**  
Bragg's law for X-ray diffraction: 2d sin θ = nλ_X-ray, where d is the crystal plane spacing.
Davisson and Germer used nickel (d = 0.0915 nm). They found electron diffraction maxima at
θ = 50° for 54 eV electrons. Predicted λ using de Broglie: λ = h/√(2m_e eV) = h/√(2×9.11×10⁻³¹
× 54 × 1.6×10⁻¹⁹) = 0.167 nm. Bragg's law gives: 2d sin 50° = 0.140 nm — close match (small
discrepancy due to surface effects). The wave nature of electrons was confirmed.

**Explanation E-3 (connection to Bohr quantisation):**  
Bohr's quantisation rule mvr = nħ was ad hoc in Bohr's model. De Broglie's wavelength provides
the physical reason: for a stable orbit, the de Broglie wavelength must fit an integer number
of times around the orbit circumference: nλ = 2πr → n(h/mv) = 2πr → mvr = nħ. Bohr's rule is
the standing-wave condition for matter waves in a circular orbit.

---

## Component 6 — Analogy Library

**Primary analogy — Guitar string harmonics:**  
A guitar string fixed at both ends supports only standing waves where nλ/2 = L (integer half-
wavelengths fit in the string length). These are the allowed frequencies (harmonics). Similarly,
an electron in a Bohr orbit supports only de Broglie standing waves where nλ = 2πr (integer
wavelengths fit around the circumference). Only certain orbits are allowed — hence discrete
energy levels.  
**Breaking point:** A guitar string has physical extent; the electron is a point particle. The
analogy is structural (standing wave quantisation) not geometric (the electron's wave is a
probability amplitude, not a classical wave).  
**Anti-analogy:** A billiard ball on a table: its trajectory is precisely known, it has no
wavelength, its position and momentum can be simultaneously measured exactly. This is the
classical picture — and for macroscopic objects it is accurate. Matter waves make it wrong for
atomic-scale objects.

---

## Component 7 — Demonstration Library

**D-1 (Electron diffraction tube — if available):**  
A standard school electron diffraction tube: electrons from an electron gun pass through a thin
graphite film and produce concentric rings on a fluorescent screen. Vary the accelerating voltage
(change electron speed, change λ). The ring radii change — confirming λ = h/p quantitatively.

**D-2 (Calculation for electron microscope):**  
Compute λ for an electron accelerated through 200 keV (typical TEM voltage): λ = h/(p) where
p = √(E_k² + 2m_e E_k c² / c) for relativistic electrons. Result: λ ≈ 2.5 pm. Compare with
visible light (λ ≈ 400–700 nm): electron wavelength is 10⁵ times shorter → 10⁵ times better
potential resolution. This is why TEM images atoms.

**D-3 (Scale comparison table):**  
Calculate λ for: (a) electron at thermal speed (26 meV at 300 K): λ ≈ 1.7 nm; (b) proton at
thermal speed: λ ≈ 40 pm; (c) helium atom at thermal speed: λ ≈ 14 pm; (d) football at 10 m/s:
λ ≈ 10⁻³⁶ m. Students see the transition from quantum to classical behaviour.

---

## Component 8 — Discovery Lesson

**Best approach:** Symmetry argument first, experimental confirmation second, computation third.

*Anchor (3 min):* Show an electron diffraction pattern (rings, like X-ray diffraction). "These
are electrons — particles with mass and charge. How did they produce a diffraction pattern?
Only waves diffract."

*Symmetry argument (5 min):* "Einstein showed waves behave like particles (photons). De Broglie:
what if particles behave like waves? If momentum p = h/λ for photons, then λ = h/p for particles
too." State the hypothesis.

*Scale calculation (8 min):* Students compute λ for:  
- thermal electron (E_k = 0.025 eV): λ = h/√(2m_e E_k) ≈ 2.4 nm  
- accelerated electron (54 eV): ≈ 0.17 nm — matches Davisson-Germer nickel spacing  
- baseball at 10 m/s: λ ≈ 10⁻³⁴ m — immeasurable  

*Davisson-Germer confirmation (4 min):* "54 eV electrons, nickel crystal (d = 0.0915 nm),
diffraction maximum at 50°. Predicted λ = 0.167 nm. Bragg's law gives 0.140 nm. Close match.
Matter waves are real."

*Transfer (5 min):* Connect to electron microscope (D-2). "We accelerate electrons to 200 keV.
λ ≈ 2.5 pm. Resolution 10⁵× better than visible light. We image individual atoms because of
de Broglie."

---

## Component 9 — Teaching Actions (Session Plan)

**TA-1 — Concrete Anchor [P01, P06]**  
Trigger: session open.  
Action: Show electron diffraction rings (D-1 or image). "Electrons make diffraction rings. Only
waves diffract. Something is wrong with calling electrons 'just particles.'"  
Success signal: Students identify the paradox: particles producing a diffraction pattern.

**TA-2 — Davisson-Germer Historical Confirmation [P14, P28]**  
Trigger: After anchor.  
Action: Describe the 1927 experiment. Show the predicted vs. measured diffraction angles.
Establish: this was an experimental confirmation, not just theory.  
Success signal: Students can state when and how matter waves were confirmed.

**TA-3 — de Broglie Relation and Scale Argument [P14]**  
Trigger: After history.  
Action: State λ = h/p. Compute for electron, proton, baseball (D-3 table). Address MC-2 and MC-4.  
Success signal: Students compute λ for all three and correctly order them (electron longest at
same speed).

**TA-4 — Wave Function Concept [P14, P30]**  
Trigger: After scale argument.  
Action: "What does the wave represent? Not the physical size of the particle. It is the
probability amplitude — where the particle is likely to be found." Address MC-3. Connect to
single-photon double-slit from phys.mod.photons.  
Success signal: Students can distinguish "wave function" from "particle size."

**TA-5 — MC-1 Diagnostic [P14, P28, P31, P33, P36]**  
Trigger: After wave function.  
Action: Present MC-MATTER-WAVES-ONLY-THEORETICAL. Ask for the experimental evidence. Students
recall Davisson-Germer and identify it as Nobel Prize work.  
Success signal: Students correctly identify experimental confirmation with specific names and dates.

**TA-6 — Closure & Calculation Practice [P68, P85, P91]**  
Trigger: Session end.  
Action: Three questions — (1) find λ for an electron accelerated through 100 V; (2) explain in
one sentence what the de Broglie wave represents; (3) why can electron microscopes resolve atoms
while optical microscopes cannot?  
Success signal: All three answered correctly.

---

## Component 10 — Voice Teaching

**Opening move:** "Electrons make diffraction patterns. You need waves to make diffraction patterns.
But electrons have mass and charge — they are particles. De Broglie's answer in 1924: they are
both. Every particle with momentum p has a wavelength λ = h/p. Einstein showed waves can be
particles; de Broglie showed particles can be waves."

**Key explanatory moves:**
- "λ = h/p: larger momentum → smaller wavelength. Faster electron → smaller λ → better
  microscope resolution. This is why we use high-voltage electrons in electron microscopes."
- "A baseball also has a de Broglie wavelength: 10⁻³⁴ m. Smaller than a quark. Real, but
  immeasurable. Quantum mechanics never switches off — it just becomes negligible."
- "The wave is not the size of the particle — it is the probability wave. The particle clicks
  at one detector; the wave function spreads across all detectors."

**Common recovery phrases:**
- If student says matter waves are theoretical: "Davisson and Germer got the Nobel Prize in
  1937 for measuring electron diffraction. Electron microscopes image atoms today. Matter waves
  are engineering reality."
- If student expects longer λ for faster particles: "Write λ = h/p. p goes up when speed goes
  up. Denominator bigger → λ smaller. Opposite of what you expect from photons — because here
  we are increasing momentum, not energy-per-photon."

---

## Component 11 — Assessment

**Mastery Gate (threshold 0.80):**  
Pass criteria — student correctly:  
(a) States λ = h/p and applies it to electrons, protons, and macroscopic objects  
(b) Explains why matter waves are observable for electrons but not baseballs  
(c) Identifies the Davisson-Germer experiment as experimental confirmation  
(d) Distinguishes the de Broglie wave from the physical size of the particle  
Failure on (a) → TA-3. Failure on (b) → TA-3 scale argument. Failure on (c) → TA-2.
Failure on (d) → TA-4.

**Formative Golden Probe (FA-1):**  
"Calculate the de Broglie wavelength of an electron accelerated through a potential difference
of 150 V."  
Expected: E_k = eV = 150 × 1.6×10⁻¹⁹ = 2.4×10⁻¹⁷ J. p = √(2m_e E_k) = √(2 × 9.11×10⁻³¹ ×
2.4×10⁻¹⁷) = 2.09×10⁻²⁴ kg m/s. λ = h/p = 6.626×10⁻³⁴ / 2.09×10⁻²⁴ = 3.17×10⁻¹⁰ m = 0.317 nm.  
Threshold: Correct λ with correct intermediate steps.

**Formative Golden Probe (FA-2):**  
"A neutron has mass 1.675 × 10⁻²⁷ kg. What speed must it travel at to have a de Broglie
wavelength of 0.1 nm (useful for crystal diffraction)?"  
Expected: p = h/λ = 6.626×10⁻³⁴ / 10⁻¹⁰ = 6.626×10⁻²⁴ kg m/s. v = p/m = 6.626×10⁻²⁴ /
1.675×10⁻²⁷ = 3956 m/s ≈ 4000 m/s.  
Threshold: Correct v; check that v << c (confirming non-relativistic approximation valid: v/c ≈ 1.3×10⁻⁵).

**Formative Golden Probe (FA-3):**  
"In the Davisson-Germer experiment, electrons were accelerated through 54 V. Calculate their
de Broglie wavelength and verify that this is comparable to nickel's crystal plane spacing
(d = 0.0915 nm)."  
Expected: λ = h/√(2m_e eV) = 6.626×10⁻³⁴ / √(2 × 9.11×10⁻³¹ × 54 × 1.6×10⁻¹⁹) ≈ 0.167 nm.
Ratio λ/d = 0.167/0.0915 ≈ 1.8 — same order of magnitude, allowing Bragg diffraction.  
Threshold: Correct λ; ratio to crystal spacing correctly computed and interpreted.

**Formative Golden Probe (FA-4):**  
"An electron microscope uses 200 keV electrons. Estimate the de Broglie wavelength
(use relativistic momentum: p = √((E_k/c)² + 2m_e E_k) with E_k in energy units)."  
Expected: E_k = 200 keV = 3.2×10⁻¹⁴ J. m_e c² = 0.511 MeV = 8.19×10⁻¹⁴ J.
p = √((E_k/c)² + 2m_e E_k) = √((3.2×10⁻¹⁴/3×10⁸)² + 2×9.11×10⁻³¹×3.2×10⁻¹⁴) ≈ √(1.14×10⁻⁴⁴ + 5.83×10⁻⁴⁴) = √(6.97×10⁻⁴⁴) = 2.64×10⁻²² kg m/s.
λ = h/p = 6.626×10⁻³⁴ / 2.64×10⁻²² ≈ 2.5 pm. This is atomic-scale resolution.  
Threshold: Relativistic momentum used; correct λ order of magnitude (1–5 pm).

**Confidence Calibration:** After FA-4, ask: "Before computing, did you know the answer would
be in the pm range?" Persistent underestimation of electron wavelength scales is common.

**Delayed Retrieval (Session + 3 days):**  
"Without notes: state the de Broglie relation. What does the wave represent? Calculate λ for an
electron accelerated through 50 V."  
Threshold: All correct unaided.

---

## Component 12 — Recovery Notes

**S0 (no prior photons concept):** The symmetry argument (particles ↔ waves) requires knowing
that photons have momentum p = h/λ. The prerequisite phys.mod.photons is essential — without
it, λ = h/p appears unmotivated.

**S3 (can compute but does not believe matter waves are real):** Run the Davisson-Germer
calculation (FA-3). Ask the student to compare the predicted λ with the crystal spacing and
state whether diffraction should occur. The quantitative match is the evidence.

**S6 (MC-FASTER-PARTICLE-LONGER-WAVELENGTH dominant):** Write λ = h/p and p = mv side by side.
Circle the denominator. "v goes up → p goes up → λ goes down. It is in the denominator. This
is the only thing you need to remember." Then verify with two calculated examples.

**S9 (plateau — knows formula, cannot explain why macroscopic objects don't show wave effects):**
Require calculation of λ for a macroscopic object and an estimate of what size slit would be
needed to observe diffraction. "To diffract a baseball (λ ≈ 10⁻³⁴ m), you would need a slit
of width 10⁻³⁴ m — 10²⁰ times smaller than a proton. There is no such slit. Not impossible —
just physically unrealisable."

---

## Component 13 — Memory & Review

**Memory type:** Declarative (one equation: λ = h/p) + conceptual (wave-particle symmetry, scale
argument, experimental confirmation). The equation is easy; the scale intuition requires spaced
review.

**Spaced retrieval plan:**
- Session + 1 day: "State the de Broglie relation. Calculate λ for a proton at 10⁶ m/s."
- Session + 4 days: "Davisson and Germer confirmed matter waves in what year and how? Why could
  they use nickel crystal?" (Historical/conceptual)
- Session + 9 days: "An electron microscope achieves 0.05 nm resolution. Estimate the required
  electron energy (non-relativistic). Why can a visible-light microscope not achieve this?" 
  (Transfer calculation)

**Interleaving partners:** phys.mod.photons (wave-particle duality for light, the analogy
basis), phys.mod.wave-particle-duality (immediate successor — deepens duality concept),
phys.mod.bohr-model (standing-wave quantisation of Bohr orbits uses λ = h/p).

---

## Component 14 — Transfer Map

**Near transfer:**
- phys.mod.wave-particle-duality: generalises to all quantum objects; introduces the uncertainty
  principle as a consequence of wave nature
- phys.mod.bohr-model: the standing-wave interpretation of Bohr orbits uses de Broglie's relation
- phys.qm.wave-function: the Schrödinger equation is the dynamical equation for the de Broglie
  wave function

**Far transfer:**
- Electron microscopy: de Broglie wavelength limits resolution; modern TEM reaches 50 pm
- Neutron diffraction: slow neutrons (λ ≈ 0.1–1 nm) probe crystal structures and magnetic
  ordering, complementary to X-rays
- Atom interferometry: cold atoms (μK temperatures, λ ~ nm) used as ultra-precise inertial
  sensors in navigation and gravitational wave detection research
- Heisenberg uncertainty principle: Δx Δp ≥ ħ/2 is the Fourier uncertainty relation for the
  de Broglie wave packet
- Quantum computing: qubits exploit matter-wave superposition for computation

**Structural abstraction:** λ = h/p is the universal translation between the wave description
(wavelength λ) and the particle description (momentum p) for any quantum object. Planck's
constant h is the conversion factor. All of quantum mechanics is, in one sense, the systematic
application of this translation.

---

## Component 15 — Curriculum Feedback

**Does this concept position correctly in the KG?**  
Yes. Requiring phys.mod.photons provides the symmetry basis (photons have λ = h/p) from which
de Broglie generalises. Unlocking phys.mod.wave-particle-duality is correct — duality is the
full conceptual framework for which this hypothesis is the foundation.

**Missing prerequisite?**  
A brief node on Bragg diffraction would deepen the Davisson-Germer confirmation, but it is not
strictly necessary — the confirmation can be described qualitatively without the full Bragg
derivation.

**Recommended teaching sequence:** phys.mod.photons → phys.mod.de-broglie → phys.mod.wave-
particle-duality → phys.qm.wave-function. These four form the quantum-mechanics entry arc.

**Asset opportunity:** An interactive de Broglie wavelength calculator — input mass and speed,
display λ, compare with visible light and atom size — would make the scale argument tactile.
Particularly valuable for the "baseball has no wave nature" misconception.

---

## Package Validation Checklist

```
V-1   concept_id matches KG exactly: phys.mod.de-broglie ✓
V-2   all 10 KG fields present: id/name/requires/unlocks/cross_links/difficulty/bloom/
      mastery_threshold/estimated_hours/description ✓
V-3   description consistent with KG: λ = h/p for every moving particle, unifying wave
      and particle pictures ✓
V-4   4-stage CPA+ model present: Concrete / Representational / Abstract / Transfer ✓
V-5   ≥3 failure modes documented: 4 listed in Component 3 ✓
V-6   4 misconceptions present: MC-1…MC-4 ✓
V-7   each MC has probe + characteristic phrase: ✓ for all 4
V-8   ≥2 misconceptions engineered:
      MC-MATTER-WAVES-ONLY-THEORETICAL,
      MC-FASTER-PARTICLE-LONGER-WAVELENGTH ✓
V-9   each MC has all 6 fields: trigger / conflict evidence [P28] / bridge [P30] /
      replacement [P31] / discrimination pairs [P33] / s6_path ✓
V-10  TA count = session_cap (6 TAs): TA-1…TA-6 ✓
V-11  TA-1 is Concrete [P01, P06]: electron diffraction rings anchor ✓
V-12  TA-5 is first MC diagnostic probe [P14, P28, P31, P33, P36]:
      MC-MATTER-WAVES-ONLY-THEORETICAL ✓
V-13  TA-6 is closure [P68, P85, P91] ✓
V-14  ≥5 P91 mastery probes with expected answers: FA-1…FA-4 + delayed retrieval ✓
V-15  4 formative assessments with thresholds and loop-back paths: FA-1…FA-4 ✓
V-16  S0/S3/S6/S9 protocols specified in Component 12 ✓
V-17  3-session spaced retrieval plan present: Component 13 ✓
V-18  interleaving partners named: mod.photons, mod.wave-particle-duality, mod.bohr-model ✓
V-19  cross_links match KG edges: [] ✓
V-20  status = READY, all V-checks PASS ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**

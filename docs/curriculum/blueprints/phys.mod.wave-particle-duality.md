# Teaching Blueprint: Wave-Particle Duality

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | phys.mod.wave-particle-duality |
| **Name** | Wave-Particle Duality |
| **Domain** | Modern Physics |
| **Difficulty** | Proficient |
| **Bloom Level** | Analyze |
| **Estimated Hours** | 4 |
| **Mastery Threshold** | 0.80 |
| **Prerequisites** | phys.mod.de-broglie |
| **Unlocks** | phys.qm.wave-function |

---

## 1. Concept Spine

**One-sentence definition:** Wave-particle duality is the principle that quantum objects exhibit both wave and particle properties, with which aspect manifests depending entirely on the experimental measurement performed.

**The core insight:** Light and matter do not have a fixed "nature." The double-slit experiment with single electrons shows each electron goes through both slits (wave) yet lands at a single point (particle). The measurement context determines which property appears — neither description is complete alone.

**Conceptual chain:**
1. Classical physics assigns objects a fixed nature: waves spread, particles are localized.
2. Photoelectric effect → light has particle properties (photons with E = hf).
3. de Broglie hypothesis → matter has wave properties (λ = h/p).
4. Double-slit experiment with electrons → interference fringes build up one particle at a time.
5. Which-path measurement destroys the interference pattern — the act of measuring collapses the wave.
6. Bohr's complementarity principle: wave and particle are complementary descriptions, never simultaneously observable.
7. This is not ignorance — quantum objects genuinely do not have definite position and momentum simultaneously.

**Central equations:**
- de Broglie wavelength: λ = h/p = h/mv
- Photon energy-frequency: E = hf
- Complementarity: Δx · Δp ≥ ℏ/2 (Heisenberg — consequence of duality)

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- Drop a stone in a pond: ripples (wave) spread outward.
- Throw a ball at a wall with two holes: ball goes through exactly one hole, lands at one spot.
- Now do the electron double-slit experiment: electrons go through both holes (wave), yet each electron produces a single dot on the screen (particle). The interference pattern accumulates dot by dot.
- Physical manipulative: laser pointer through a diffraction grating (wave behavior of light); photoelectric effect apparatus (particle behavior of light) — same light, two behaviors, two experiments.

### Representational (Iconic)
- Draw the double-slit interference pattern building up from single dots: first random dots, then density peaks emerge at bright fringes.
- Side-by-side diagram: left = wave model (sinusoidal, spread), right = particle model (localized dot). Arrow connecting them: "same electron — depends on measurement."
- Wavefunction amplitude |ψ|² plot: probability density wave, but measurement collapses it to a point.
- Complementarity table: Row 1 = wave features (interference, diffraction, wavelength), Row 2 = particle features (discrete energy, momentum, localization) — mark which experiments reveal each.

### Abstract (Symbolic)
- λ = h/p — same formula unifies electron and photon.
- Which-path measurement: if path information is available, fringe visibility V → 0. If no path information, V → 1. Mathematical trade-off: V² + D² ≤ 1 (D = which-path distinguishability).
- Heisenberg uncertainty: Δx · Δp ≥ ℏ/2 arises from the wave nature (bandwidth theorem from Fourier analysis).
- Dirac notation preview: |ψ⟩ is the quantum state — both slits contribute amplitudes that add before squaring.

### Transfer (+)
- MRI and electron microscopy both use wave behavior of particles.
- Quantum cryptography: which-path measurement disturbs the system — fundamental basis for BB84 protocol.
- Transistors, semiconductors: band theory requires wave nature of electrons in a crystal lattice.

---

## 3. Why Beginners Fail

**Mode 1 — Ontological confusion:** Students believe electrons physically "split" into two pieces at the double slit. They cannot accept that the electron has no definite trajectory between emission and detection. Correct: the electron's wavefunction spreads through both slits; only on detection does it localize.

**Mode 2 — Classical superposition confusion:** Students confuse quantum superposition (state is genuinely indeterminate) with classical ignorance ("we don't know which slit it went through, but it did go through one"). The which-path experiment disproves classical ignorance — detecting which slit destroys the pattern even when the electron is not disturbed mechanically.

**Mode 3 — Wave-particle as toggle:** Students think light "is a wave sometimes and a particle other times" as if it switches identity. Bohr's complementarity says these are two complementary aspects of one entity — neither alone is complete.

**Mode 4 — Frequency confusion:** Students conflate photon frequency f (determines energy E = hf) with de Broglie frequency (matter waves). For matter, λ = h/p is the spatial wavelength; the "frequency" is less physical than for light. Keep the λ = h/p formula central for matter.

---

## 4. Misconception Library

### MC-1: "The electron physically splits at the double slit"
- **Probe:** "If the electron goes through both slits, does it have half its mass in each slit?"
- **Characteristic phrase:** "Half the electron goes through each slit."
- **Trigger:** The phrase "wave behavior" suggests physical splitting to students who think waves require a medium.
- **Conflict evidence [P28]:** A single electron always produces exactly one dot on the screen — never two half-dots. The mass and charge are never divided. Yet the interference pattern only appears when no which-path information exists.
- **Bridge [P30]:** "The electron's wavefunction — its probability amplitude — spreads through both slits, but the electron itself is always detected as a whole unit at a single point."
- **Replacement [P31]:** The wavefunction is a probability wave, not a physical wave of matter. The electron is whole; only its probability distribution is spread.
- **Discrimination pairs [P33]:** A water wave genuinely splits and can have half its energy in each half. An electron never arrives as a half-particle — the interference is in the probability, not the object.
- **S6 repair path:** Show the single-electron double-slit video (Hitachi 1989): 10 electrons → random dots; 1000 electrons → fringes emerge. Each dot is a whole electron.

### MC-2: "Measuring which slit destroys the electron's wave by bumping it"
- **Probe:** "If we use a very gentle light to detect the electron, can we get which-path info and still see fringes?"
- **Characteristic phrase:** "The measurement disturbs the electron mechanically and washes out the fringes."
- **Trigger:** Heisenberg's microscope thought experiment is often introduced as a mechanical disturbance argument.
- **Conflict evidence [P28]:** The disturbance interpretation fails when complementary experiments control disturbance independently — the loss of fringes is tied to information availability, not mechanical kick.
- **Bridge [P30]:** "When any record of which path exists anywhere in the universe — even if we never look at it — the interference disappears. It's about information, not mechanical disturbance."
- **Replacement [P31]:** Complementarity is about information and measurement, not mechanical bumping. The quantum eraser experiment (erasing the which-path information) restores fringes.
- **Discrimination pairs [P33]:** Classical: bumping a wave with a billiard ball disturbs it mechanically. Quantum: turning a which-path detector on and off (with zero recoil change) still toggles the interference pattern.
- **S6 repair path:** Describe the quantum eraser: restoring path information from the environment restores fringes — shows it is information, not mechanics.

### MC-3: "Wave-particle duality means light alternates between being a wave and a particle"
- **Probe:** "Is light a wave on Mondays and a particle on Tuesdays?"
- **Characteristic phrase:** "Sometimes it acts like a wave, sometimes like a particle."
- **Trigger:** Textbook phrasing "light acts as a wave in diffraction and a particle in the photoelectric effect" implies alternation.
- **Conflict evidence [P28]:** Both properties are present simultaneously in the quantum formalism. The wavefunction is always a wave; detection always gives a particle outcome. The "act" depends on what you measure, not on what light "is" at a given moment.
- **Bridge [P30]:** "A quantum object is described by a wavefunction at all times. The experiment you design determines which classical language — wave or particle — partially captures what you see."
- **Replacement [P31]:** Complementarity: wave and particle are complementary descriptions, both partially true, neither complete. The quantum object transcends both classical concepts.
- **Discrimination pairs [P33]:** A coin is not "heads on even days." Measuring it (flipping) forces an outcome. Quantum complementarity is about measurement, not alternation.
- **S6 repair path:** Present both behaviors of the same photon in a modern experiment (parametric down-conversion) — it interferes and produces a coincidence click in the same apparatus.

### MC-4: "de Broglie wavelength is the size of the electron"
- **Probe:** "A slow electron has a larger λ. Does it become physically larger?"
- **Characteristic phrase:** "The electron gets bigger at lower speeds."
- **Trigger:** The word "wavelength" in classical physics refers to the spatial extent of a wave, leading students to equate λ with physical size.
- **Conflict evidence [P28]:** Electron scattering experiments consistently find the electron's classical radius ≈ 10⁻¹⁵ m regardless of speed. The de Broglie wavelength of a slow electron can be centimeters, while its physical interaction cross-section stays constant.
- **Bridge [P30]:** "λ = h/p describes the spatial periodicity of the electron's probability wave — how frequently the wavefunction oscillates in space. This is not the electron's physical size."
- **Replacement [P31]:** The de Broglie wavelength characterizes the wavefunction's spatial frequency, not the object's physical extent.
- **Discrimination pairs [P33]:** A radio wave with λ = 1 m is not 1 m in physical size; its source antenna can be smaller. Similarly, an electron's λ and its physical size are independent.
- **S6 repair path:** Show electron diffraction through a crystal: λ ~ 0.1 nm matches atomic spacing → diffraction occurs. The electron is not 0.1 nm in radius — it fits between atoms and is diffracted by the periodic potential.

---

## 5. Explanation Library

**Explanation A — The Double-Slit Story (narrative, proficient):**
"In 1801, Young showed light creates interference fringes through two slits — a wave phenomenon. In 1905, Einstein showed light comes in discrete photon packets — particle behavior. Which is it? In 1927, Davisson and Germer fired electrons at a crystal and found diffraction rings — wave behavior of matter. Then Jönsson in 1961 performed the double-slit experiment with electrons, one at a time. Each electron hits the screen at a single point — particle behavior. But over thousands of electrons, a fringe pattern builds up — wave behavior. The conclusion: each electron interferes with itself. Its wavefunction passes through both slits simultaneously. Only on detection does it 'choose' a location, with probability given by |ψ|². The experiment that extracts which-path information — even gently — destroys the fringes. Wave and particle are not contradictory. They are complementary faces of quantum reality."

**Explanation B — The Formalism Link (abstract, advanced):**
"Wave-particle duality is encoded in the structure of quantum mechanics. A quantum state |ψ⟩ evolves as a wave via the Schrödinger equation: iℏ ∂ψ/∂t = Ĥψ. This gives probability amplitudes ψ(x,t) that interfere. But measurement is represented by an operator with discrete eigenvalues — yielding particle-like discrete outcomes. The transition from wave (Schrödinger evolution) to particle (Born rule measurement) is the quantum measurement problem. Wave-particle duality is thus not a curiosity — it is the core tension between unitary evolution and measurement collapse at the heart of quantum mechanics."

**Explanation C — Fourier/Bandwidth analogy (mathematical, intuition-builder):**
"A pure sine wave extends infinitely in space — it has perfectly defined λ (and therefore p = h/λ) but is completely delocalized (Δx = ∞). A perfectly localized pulse has Δx → 0 but requires a superposition of infinitely many frequencies — Δp → ∞. This is the Fourier bandwidth theorem: Δx · Δk ≥ 1/2. Since p = ℏk, we get Δx · Δp ≥ ℏ/2. Wave-particle duality is Fourier analysis applied to quantum wavefunctions — you cannot simultaneously know both position and momentum because localizing a wave requires many wavelengths."

---

## 6. Analogy Library

**Primary analogy — The Ocean Wave vs. the Raindrop:**
An ocean wave spreads across the entire Pacific; it is delocalized and interferes with itself around islands. But when that wave energy reaches shore and breaks, it deposits sand grains in discrete locations — localized events. The electron's wavefunction is like the ocean wave (spreads, interferes), but each detection event is like a sand grain impact (discrete, localized). The wave determines where grains are likely to accumulate; each grain is whole.

**Breaking point:** The ocean wave is a classical wave — it can be subdivided. The electron's wavefunction is a probability amplitude, not a physical substance. The wave-to-particle transition for water is a continuous energy transfer; for electrons, it is an irreversible quantum measurement event.

**Anti-analogy:** Do NOT use the analogy "an electron switches between being a wave and a particle like water becoming ice." This implies the electron has a fixed identity that transforms, whereas wave-particle duality is about measurement context, not a phase transition.

---

## 7. Demonstration Library

**Demo 1 — Single-photon double slit (video-based):**
Show the Hitachi single-electron double-slit experiment video. Narrate: "Each dot is one electron. After 100 electrons: random scatter. After 10,000: fringes emerge." Pause and ask: "How does each electron 'know' where to land to build the pattern?"

**Demo 2 — Which-path detector (thought experiment):**
Describe placing a photon detector near one slit. When the detector is OFF: fringes appear. When the detector is ON (even if we never read it): fringes vanish. Emphasize: the physical setup is identical; only the availability of information changes.

**Demo 3 — de Broglie wavelength calculation:**
Calculate λ for: (a) a baseball (mass 0.145 kg, speed 40 m/s): λ ≈ 10⁻³⁴ m — undetectably small. (b) an electron (9.1 × 10⁻³¹ kg, speed 10⁶ m/s): λ ≈ 0.7 nm — comparable to atomic spacing, hence diffraction occurs. This explains why we don't see wave behavior in everyday objects.

---

## 8. Discovery Lesson

**Opening hook (5 min):** Show two images: (1) Young's double-slit bright/dark fringes for light. (2) Electron double-slit fringe pattern from Jönsson's experiment. Ask: "These look identical. One is light, one is electrons. What does this tell you?"

**Guided inquiry (15 min):**
- Step 1: Students predict: "If we send one electron at a time through the double slit, will we see (a) random dots, (b) two bands behind the slits, or (c) an interference pattern building up slowly?" Take votes. Show video.
- Step 2: "Each electron goes through both slits. But we detect it at one point. If we put a detector to find which slit it went through, what happens?" Students predict. Show the result (fringes disappear).
- Step 3: "We erased the which-path information. Predict what happens." Show quantum eraser result (fringes return).

**Synthesis (10 min):**
- Students write: "Wave-particle duality means ___. The double-slit experiment shows ___ because ___. The which-path experiment shows ___ because ___."
- Class shares. Instructor formalizes: complementarity principle, wavefunction as probability amplitude.

**Closure:** "This is not a failure of understanding. This is what nature actually does. Quantum mechanics is the most precisely tested theory in physics. This weirdness is the right answer."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [EXPLAIN]:** Deliver Explanation A (Double-Slit Story) with real experimental dates and names — grounds the concept in physical reality, not just mathematics.

**TA-2 [DEMONSTRATE]:** Run Demo 1 (single-electron video) and Demo 2 (which-path thought experiment). After each: "What does this force us to conclude?"

**TA-3 [PROBE]:** Use MC-1 probe ("Does the electron have half its mass in each slit?") and MC-2 probe ("Can a gentle detector preserve fringes?"). Address revealed misconceptions using S6 repair paths.

**TA-4 [TRANSFER]:** Calculate de Broglie wavelengths for a baseball and an electron (Demo 3). Ask: "Why don't we see baseball interference patterns?" Then ask: "What technology exploits electron wave behavior?" (Electron microscopy, crystal diffraction.)

---

## 10. Voice Teaching

**Opening script:**
"I want to start with a fact that took the greatest physicists of the 20th century decades to accept: an electron is neither a wave nor a particle. It's something new — something our language, designed for everyday objects, cannot fully capture. Let me show you why."

**At the interference pattern:**
"Look at this pattern. Each dot is one whole electron. There's no half-electron, no split electron. And yet the pattern that emerges is unmistakably an interference pattern — the kind you only get from waves going through two openings and adding up. How is that possible? The answer is that the electron's wavefunction — its probability amplitude — went through both slits. The electron itself was detected whole, at one point, but its probability wave had explored both paths."

**At the which-path detector:**
"Now watch what happens when we turn on the detector. We're not physically blocking the electron. We're just checking which slit it used. And the interference pattern vanishes — instantly, completely. This is not about bumping the electron. It's about information. The moment the universe has a record of which path the electron took — even if we never read that record — the wave behavior disappears."

**Closing reframe:**
"Wave-particle duality is not a paradox that physics hasn't solved yet. It's the answer. Nature is not classical. Quantum mechanics — with its wavefunctions and probability amplitudes and complementarity — is the correct description of reality at this scale. The 'strangeness' you feel is your classical intuition meeting its limits. That's good. It means you're seeing something genuinely new."

---

## 11. Assessment

**Mastery gate:** Student must correctly explain the double-slit result and the which-path result, and correctly apply λ = h/p to a calculation. Score ≥ 80%.

**FA-1 — Conceptual (MC-1 target):**
*Q: An electron passes through a double slit and produces an interference pattern. A student says "the electron split in two." What evidence directly refutes this?*
Expected: Each electron always produces exactly one dot on the detector — it is never detected as two simultaneous half-impacts. The interference pattern is statistical (many whole electrons), not from each electron being half.
Threshold: Must mention "one dot per electron" and "whole particle always."

**FA-2 — Which-path (MC-2 target):**
*Q: A which-path detector is placed at one slit. The detector never fires — no electrons are detected at the slit. Yet the interference pattern disappears. Explain.*
Expected: The interference pattern depends on path information being unavailable, not on the electron being mechanically disturbed. Even a non-firing detector that in principle could have detected the electron is sufficient to destroy coherence.
Threshold: Must distinguish "mechanical disturbance" from "information availability."

**FA-3 — Calculation:**
*Q: An electron has kinetic energy 1.5 eV. Calculate its de Broglie wavelength. (m_e = 9.11 × 10⁻³¹ kg, h = 6.63 × 10⁻³⁴ J·s, 1 eV = 1.6 × 10⁻¹⁹ J)*
Expected: KE = p²/2m → p = √(2mKE) = √(2 × 9.11×10⁻³¹ × 2.4×10⁻¹⁹) ≈ 6.6×10⁻²⁵ kg·m/s; λ = h/p ≈ 1.0 nm.
Threshold: Correct setup and order of magnitude (0.8–1.2 nm accepted).

**FA-4 — Complementarity:**
*Q: The quantum eraser experiment restores interference fringes by erasing which-path information. What does this imply about the nature of measurement in quantum mechanics?*
Expected: Measurement in quantum mechanics is not a passive readout — it creates physical reality. What matters is whether path information exists anywhere in the universe. Erasing it retroactively (quantum eraser) restores wave behavior, showing measurement is about information, not mechanics.
Threshold: Must invoke "information" and note that erasing information changes the physical outcome.

**Confidence calibration:** After FA-3 calculation, ask "How confident are you (0–100%)?" Compare to actual accuracy. Students with high confidence and wrong answers receive explicit feedback on the gap; students with low confidence and correct answers receive targeted encouragement.

**Delayed retrieval (session + 3):** "Name the experiment that first demonstrated wave behavior of electrons. State the equation relating wavelength to momentum. Explain what happens to the double-slit pattern when which-path information is available."

---

## 12. Recovery Notes

**S0 (no prior knowledge):** Start with the photoelectric effect as a prerequisite — student must accept photons as real before wave-particle duality makes sense. Build from phys.mod.photons and phys.mod.de-broglie. Do not introduce interference until E = hf and λ = h/p are secure.

**S3 (partial understanding):** Student likely has the calculation right (λ = h/p) but has classical ontological view (electron is a tiny ball that sometimes wiggles). Run the which-path thought experiment and quantum eraser discussion. Ask: "If the electron is a tiny ball with a definite path, why does knowing the path destroy the fringes?"

**S6 (systematic error):** Student consistently applies "wave OR particle" thinking (mode 3 misconception). Use Explanation B (formalism) — show that the Schrödinger equation always gives wave evolution; measurement always gives particle outcome. Both happen to every quantum object at every moment.

**S9 (mastery extension):** Introduce the V² + D² ≤ 1 complementarity inequality. Challenge: "Design an experiment that achieves V = 0.6, D = 0.8." (Impossible: 0.36 + 0.64 = 1.00 — at the limit.) Introduce Bell's theorem as the next frontier.

---

## 13. Memory & Review

**Memory type:** Conceptual schema (dual representation + measurement context) + procedural (λ = h/p calculation).

**Spaced retrieval schedule:**
- Session + 1: "What experiment proved electrons have wave behavior? State the result in one sentence."
- Session + 3: "A student says the electron 'splits' at the double slit. What's wrong? What does happen?"
- Session + 7: "Calculate the de Broglie wavelength of a proton (mass = 1.67 × 10⁻²⁷ kg) moving at 2 × 10⁶ m/s."

**Interleaving partners:** phys.mod.de-broglie (prerequisite — λ = h/p), phys.qm.wave-function (successor — formalizes the wavefunction concept introduced here), phys.mod.photoelectric-effect (complementary wave/particle evidence for light).

---

## 14. Transfer Map

**Near transfer:** Electron microscopy — use λ = h/p to explain why electrons can resolve atomic structures (λ ~ 0.1 nm vs. light's λ ~ 500 nm).

**Far transfer:** Quantum cryptography (BB84): wave-particle duality ensures that measuring a quantum state disturbs it irreversibly — the physical basis for quantum key distribution security.

**Structural abstraction:** "Measurement changes the system." This principle transfers to quantum computing (no-cloning theorem), quantum biology (debates about coherence in photosynthesis), and philosophy of science (the observer's role in defining experimental outcomes).

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** phys.mod.de-broglie is necessary and sufficient as a formal prerequisite. Strongly recommend phys.mod.photoelectric-effect is also covered before this concept.
- **Unlock readiness:** phys.qm.wave-function can be introduced after this concept — students need wave-particle duality to accept the wavefunction as a probability amplitude rather than a physical wave.
- **Difficulty calibration:** Proficient/analyze is appropriate. The conceptual demands (complementarity, information-based measurement) are high, but the mathematics (λ = h/p) is low. Assessment items FA-2 and FA-4 reliably distinguish surface from deep understanding.
- **Suggested lab:** Single-photon interference experiment (affordable classroom versions available) or simulated electron double-slit with PhET simulation. The Hitachi video is freely available online and should be shown in every cohort.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

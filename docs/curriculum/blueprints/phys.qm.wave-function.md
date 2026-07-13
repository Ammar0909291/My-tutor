# Teaching Blueprint: Wave Function and Probability Interpretation

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | phys.qm.wave-function |
| **Name** | Wave Function and Probability Interpretation |
| **Domain** | Quantum Mechanics |
| **Difficulty** | Advanced |
| **Bloom Level** | Understand |
| **Estimated Hours** | 6 |
| **Mastery Threshold** | 0.80 |
| **Prerequisites** | phys.mod.wave-particle-duality |
| **Unlocks** | phys.qm.schrodinger-equation, phys.qm.uncertainty-principle |

---

## 1. Concept Spine

**One-sentence definition:** The wave function ψ(x,t) is a complex-valued amplitude whose squared modulus |ψ(x,t)|² gives the probability density of finding a particle at position x at time t.

**The core insight:** The wave function is not a physical wave of matter — it is an amplitude for probability. Just as the amplitude of a classical wave determines the wave's intensity, the amplitude of ψ determines the probability density |ψ|². The key departure from classical physics is that ψ can be complex, it superposes (can be in multiple states simultaneously), and measurement collapses it to a single outcome.

**Conceptual chain:**
1. Wave-particle duality: an electron has wavefunction ψ that spreads through space like a wave.
2. Probability interpretation (Born rule, 1926): |ψ(x,t)|² dx = probability of finding the particle between x and x+dx.
3. Normalization: ∫|ψ|² dx = 1 (particle must be found somewhere).
4. Wavefunction is complex: ψ = A e^(i(kx−ωt)) for a free particle. |ψ|² = |A|² — constant, meaning the particle is equally likely anywhere. This represents a pure momentum state.
5. Superposition: if ψ₁ and ψ₂ are solutions, so is ψ₁ + ψ₂. This creates interference in |ψ₁ + ψ₂|².
6. Collapse: measuring position gives a definite outcome (one point x₀). After measurement, ψ collapses to a state sharply peaked at x₀.
7. Expectation values: ⟨x⟩ = ∫ x |ψ|² dx — the average position over many measurements.
8. Uncertainty principle connection: a state with definite position (narrow ψ) has broad momentum spread, and vice versa.

**Central equations:**
- Born rule: P(a ≤ x ≤ b) = ∫_a^b |ψ(x,t)|² dx
- Normalization: ∫_{−∞}^{∞} |ψ(x,t)|² dx = 1
- Free particle: ψ(x,t) = A e^(i(kx−ωt)), |ψ|² = |A|²
- Expectation value: ⟨x⟩ = ∫ x |ψ(x,t)|² dx
- Gaussian wave packet (localized state): ψ(x) ∝ e^(−x²/4σ²) → |ψ|² ∝ e^(−x²/2σ²) (Gaussian probability density, width σ)

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- Analogy: water wave height → intensity of light. But here: ψ (complex amplitude) → |ψ|² (probability density). The wavefunction is to quantum probability what amplitude is to classical wave intensity.
- Double-slit experiment: the interference pattern builds up from many single-electron impacts. The pattern is |ψ₁ + ψ₂|² — the wavefunctions from both slits add before squaring. This gives interference fringes (cross terms) that would be absent if we squared first.
- Position measurement: imagine ψ spread across a room. One measurement gives one click — a specific location. Repeat with identical ψ many times → the histogram of click positions converges to |ψ|².

### Representational (Iconic)
- Plot of |ψ(x)|² vs. x: a probability density curve (like a bell curve for a Gaussian wave packet). Shade regions to show P(a ≤ x ≤ b) = area under curve.
- Contrast classical trajectory (a single path) with quantum |ψ(x)|² (spread-out cloud).
- Wave packet animation: show ψ = Re part (oscillating wave inside an envelope), |ψ|² = smooth probability density envelope.
- Complex plane diagram: ψ at each point x is a complex number (arrow in the complex plane). |ψ|² = squared magnitude = length² of the arrow.

### Abstract (Symbolic)
- Born rule: if ψ(x) = (1/a)^(1/2) for 0 ≤ x ≤ a, 0 elsewhere (particle in a box ground state approximation): |ψ|² = 1/a = constant → uniform probability. P(0 ≤ x ≤ a/2) = ½.
- Normalization check: ∫_{−∞}^∞ |A|² e^(−x²/2σ²) dx = |A|² σ√(2π) = 1 → A = (2πσ²)^(−1/4).
- Superposition: ψ = ψ₁ + ψ₂ → |ψ|² = |ψ₁|² + |ψ₂|² + 2 Re(ψ₁* ψ₂). The cross term 2 Re(ψ₁* ψ₂) is the interference term — positive in bright fringes, negative in dark fringes. This term is zero if ψ₁ and ψ₂ have definite, different phases (which-path information destroys it).
- Expectation value for Gaussian: ⟨x⟩ = 0 (by symmetry), ⟨x²⟩ = σ², Δx = σ.

### Transfer (+)
- Electron microscopy: the electron's wavefunction diffracts through the sample, creating an interference pattern that reveals atomic structure.
- Quantum chemistry: molecular orbitals are wavefunctions |ψ|² — the electron density cloud visualized in chemistry textbooks.
- MRI: nuclear spin wavefunctions precess in a magnetic field — the Larmor precession is a quantum mechanical amplitude evolution.

---

## 3. Why Beginners Fail

**Mode 1 — "ψ is a physical wave (like a water wave)":** Students think ψ represents a physical oscillation of something material. This leads to confusion when ψ is complex (what physical quantity oscillates as a complex number?). Correct: ψ is an abstract mathematical amplitude; only |ψ|² has direct physical meaning as probability density.

**Mode 2 — "Probability density is the same as probability":** Students conflate P(x) = |ψ(x)|² (probability density, units of m⁻¹ in 1D) with probability (dimensionless). Probability of finding the particle between x and x+dx is |ψ(x)|² dx (probability density × interval width).

**Mode 3 — "Measurement reveals the pre-existing position":** Students think measurement "discovers" where the particle already was — as if it had a definite location that we didn't know. Quantum mechanics says: before measurement, the particle has no definite position (in a superposition state). Measurement creates the outcome, not just reveals it.

**Mode 4 — "Superposition means 50% in state A and 50% in state B":** Students interpret ψ = ψ₁ + ψ₂ as "half the particle is in ψ₁ and half is in ψ₂." The correct interpretation: the particle is in both states simultaneously with amplitude 1 from each — and the cross terms (interference) prove it's not just a classical mixture.

---

## 4. Misconception Library

### MC-1: "The wavefunction is a physical wave in real space"
- **Probe:** "What physical quantity oscillates in a quantum wavefunction?"
- **Characteristic phrase:** "ψ is like a water wave — it's the electron vibrating."
- **Trigger:** The term "wave function" and the analogy to de Broglie waves suggest a physical oscillation.
- **Conflict evidence [P28]:** ψ is complex-valued: ψ = A e^(i(kx−ωt)} = A(cos(kx−ωt) + i sin(kx−ωt)). No physical observable is complex — complex numbers require two real quantities. ψ itself is not directly observable. Only |ψ|² (which is real and non-negative) corresponds to the probability density observed in experiment.
- **Bridge [P30]:** "The wavefunction is a probability amplitude — a mathematical tool for computing probabilities. It's defined in the space of possible configurations (configuration space), not physical 3D space for multi-particle systems. It's not a vibration of matter; it's a prescription for what probabilities to assign to measurement outcomes."
- **Replacement [P31]:** ψ is an abstract complex amplitude. |ψ|² is the physical probability density. Think of ψ as analogous to the 'probability amplitude' in probability theory — real quantities squared give probabilities.
- **Discrimination pairs [P33]:** Classical wave: amplitude A is real; intensity ∝ A². Quantum wavefunction: amplitude ψ is complex; probability density = |ψ|². The analogy is structural, not physical.
- **S6 repair path:** Write ψ for a free particle: ψ = e^(i(kx−ωt)). Ask: "What is |ψ|²?" = e^(−i(kx−ωt)) × e^(i(kx−ωt)} = 1. "What does this tell you about where the particle is?" — equally likely anywhere. "Is this a 'vibration' of matter?" — No; the particle has no classical position; ψ = 1 everywhere is a statement about our uncertainty of its location.

### MC-2: "P(x) = |ψ(x)|² is the probability of finding the particle at x"
- **Probe:** "If |ψ(0)|² = 0.5 nm⁻¹, what is the probability of finding the particle exactly at x = 0?"
- **Characteristic phrase:** "The probability at x is |ψ(x)|²."
- **Trigger:** Students read "probability interpretation" and conclude |ψ(x)|² is a probability, not a density.
- **Conflict evidence [P28]:** The probability of finding a particle at exactly one point x₀ (a set of measure zero) is always zero in a continuous distribution. P(x = x₀ exactly) = 0. The measurable quantity is P(a ≤ x ≤ b) = ∫_a^b |ψ|² dx. |ψ(x)|² has units of m⁻¹ (in 1D) — it is a density, not a dimensionless probability.
- **Bridge [P30]:** "Probability density is to probability as mass density is to mass. A density of 5 kg/m³ doesn't mean there are 5 kg at one point — it means a 2 m³ volume contains 10 kg. Similarly, |ψ(x)|² = 0.5 nm⁻¹ means a 2 nm interval near x contains ~1 total probability (P ≈ 1). To get probability, you must integrate over an interval."
- **Replacement [P31]:** |ψ(x)|² is a probability density (units m⁻¹ in 1D). P(a ≤ x ≤ b) = ∫_a^b |ψ(x)|² dx. P(x = x₀) = 0 for any single point.
- **Discrimination pairs [P33]:** Water flow rate (liters/second) vs. total flow (liters). Rain rate (mm/hour) vs. total rainfall (mm). A rate/density must be multiplied by an interval/volume to give the total quantity.
- **S6 repair path:** Give a worked example with a uniform ψ on [0, L]: |ψ|² = 1/L. P(0 ≤ x ≤ L/4) = ∫₀^{L/4} (1/L) dx = 1/4. Emphasize: the density is 1/L throughout, not 1/4.

### MC-3: "Measurement reveals the particle's pre-existing position"
- **Probe:** "Before measuring a particle in a superposition of position eigenstates, did it have a definite position?"
- **Characteristic phrase:** "The particle was at x₀ all along; measuring just tells us where it was."
- **Trigger:** Classical intuition: measurement = discovery of pre-existing fact. This is the "hidden variable" intuition.
- **Conflict evidence [P28]:** Bell's theorem (1964) and subsequent experiments (Aspect, 1982) ruled out local hidden variable theories. The interference pattern in the double-slit experiment is incompatible with the particle having a definite which-path before measurement. If the electron had a definite path through slit 1 or slit 2, the pattern would be the sum of two single-slit patterns (no interference). Instead, interference fringes appear — proving the particle genuinely went through both slits simultaneously.
- **Bridge [P30]:** "Quantum mechanics is not just classical physics with unknown positions. The interference experiment provides direct experimental proof that the electron did not have a definite path before measurement. Measurement does not merely reveal — it creates the definite outcome from a genuinely indefinite superposition."
- **Replacement [P31]:** Before measurement (in a superposition), observables like position have no definite value. Measurement is a physical interaction that collapses the wavefunction — it creates the outcome. The double-slit experiment proves this: interference means both paths were simultaneously real.
- **Discrimination pairs [P33]:** Classical: a marble is in box A or B — we don't know which, but it is in one. Quantum: an electron's wavefunction spans both boxes — it is genuinely in both until measured. The interference of wavefunctions (observable experiment) proves the difference.
- **S6 repair path:** Show the quantum eraser result: erasing which-path information (even after the detection) restores the interference pattern. If the particle had a definite path, erasing our record of it couldn't change the physical outcome. But it does — proving the particle's path was genuinely indeterminate.

### MC-4: "ψ = ψ₁ + ψ₂ means 50% chance of being in ψ₁ and 50% in ψ₂"
- **Probe:** "A particle is in the state ψ = ψ₁ + ψ₂. If we measure in the {ψ₁, ψ₂} basis, what probability do we get for each outcome? Now compare: could a classical mixture of 50% ψ₁ and 50% ψ₂ produce interference?"
- **Characteristic phrase:** "The superposition means the particle is half in state 1 and half in state 2."
- **Trigger:** The word "superposition" suggests something is layered or blended, like mixing paint — classical mixture.
- **Conflict evidence [P28]:** A classical mixture (50% chance of being in ψ₁, 50% in ψ₂) has probability density: P_classical = (1/2)|ψ₁|² + (1/2)|ψ₂|² — no interference term. A quantum superposition has |ψ₁ + ψ₂|² = |ψ₁|² + |ψ₂|² + 2Re(ψ₁*ψ₂) — the cross term creates interference fringes. The experiment sees fringes → it's a quantum superposition, not a classical mixture.
- **Bridge [P30]:** "In a classical mixture, we're ignorant of which state the particle is in. In quantum superposition, the particle is in both states simultaneously — and this is revealed by the interference term 2Re(ψ₁*ψ₂), which is absent in a classical mixture. The difference between quantum superposition and classical mixture is experimentally observable."
- **Replacement [P31]:** ψ = ψ₁ + ψ₂ is a quantum superposition — the particle is in both states simultaneously. |ψ|² = |ψ₁|² + |ψ₂|² + 2Re(ψ₁*ψ₂). The last term (interference) is the experimental signature of quantum superposition, not classical mixture.
- **Discrimination pairs [P33]:** Add paints: color mixture = classical mixture (colors average). Add sound waves: interference = quantum-like superposition (amplitudes add before squaring → beats, constructive/destructive interference). The key: do you add intensities (classical mixture) or amplitudes (quantum superposition)?
- **S6 repair path:** Compute |ψ₁ + ψ₂|² at a dark fringe: suppose ψ₁ = A and ψ₂ = −A at some point. Then |ψ₁ + ψ₂|² = 0 — destructive interference, zero probability. But (1/2)|ψ₁|² + (1/2)|ψ₂|² = A² ≠ 0. The classical mixture always gives nonzero probability there; the quantum superposition gives zero. The dark fringe proves it's superposition.

---

## 5. Explanation Library

**Explanation A — The probability amplitude framework (narrative):**
"In classical physics, to predict where a particle goes, you solve Newton's laws and get a trajectory — a definite path. In quantum mechanics, you solve the Schrödinger equation and get a wavefunction ψ — a complex-valued field in space. ψ doesn't tell you where the particle is. It tells you the amplitude for each possible position. The probability of finding the particle near x is |ψ(x)|². Many experiments with identical wavefunctions build up the histogram of outcomes — that histogram is |ψ|². The wavefunction is quantum mechanics's most complete description of a particle's state — more complete than position and momentum together (which don't simultaneously exist with definite values)."

**Explanation B — Born's rule derivation (conceptual):**
"Max Born (1926) noticed that de Broglie waves satisfied the equations for probability amplitudes. He proposed: the intensity of the quantum wave — not the amplitude itself — gives the probability density. Just as in electromagnetism where intensity ∝ |E|², Born proposed P(x) ∝ |ψ(x)|². Normalize so ∫|ψ|² dx = 1 (certainty of finding the particle somewhere). This is the Born rule — the fundamental interpretive axiom of quantum mechanics. It is not derived from deeper principles; it is the postulate that connects the mathematical formalism to physical measurement."

**Explanation C — Interference and the cross term (mathematical):**
"Superpose two wavefunctions: ψ = ψ₁ + ψ₂. |ψ|² = |ψ₁ + ψ₂|² = ψ₁ψ₁* + ψ₂ψ₂* + ψ₁ψ₂* + ψ₂ψ₁* = |ψ₁|² + |ψ₂|² + 2Re(ψ₁*ψ₂). The first two terms give the classical sum. The third term — 2Re(ψ₁*ψ₂) — is the interference term. It is positive where the wavefunctions are in phase (constructive interference → bright fringe) and negative where out of phase (destructive interference → dark fringe). Without ψ being complex — without phases — there is no interference. The complex nature of ψ is essential."

---

## 6. Analogy Library

**Primary analogy — The weather forecast probability:**
A weather forecast gives a 70% chance of rain — not because the forecaster doesn't know what will happen, but because the atmosphere is in a genuinely uncertain state. The wavefunction is like the probability amplitude encoding the "quantum weather" of a particle. The probability density |ψ|² is like the probability map of rain at each location. When it rains, a definite outcome occurs (rainfall at a specific place); before it rains, only probabilities exist. But quantum mechanics adds: until a measurement is made, the particle genuinely has no definite position — not just uncertain, but genuinely indeterminate.

**Breaking point:** Weather probabilities are epistemic (we don't know, but Nature does). Quantum probabilities are ontic (Nature itself doesn't "know" before measurement — there is no deeper fact). The double-slit experiment and Bell's theorem show quantum indeterminacy is not epistemic ignorance.

**Anti-analogy:** Do NOT use "ψ is like the ripple of water carrying the electron." Water waves are real physical oscillations; ψ is an abstract probability amplitude. The electron is not spread out in space like water; it is a point particle detected as a whole. The wavefunction describes probability, not a physical substance.

---

## 7. Demonstration Library

**Demo 1 — Single-electron interference simulation:**
Show the single-electron double-slit experiment building up (Hitachi video). Narrate: "Each dot is one electron. The pattern of dots that emerges is the probability distribution |ψ|². The wavefunction's interference determines where electrons are likely to land."

**Demo 2 — Normalization calculation:**
Given ψ(x) = A e^(−|x|/a) (a simple decaying wavefunction). Compute: ∫_{−∞}^∞ |A|² e^(−2|x|/a) dx = 2|A|² × a/2 = |A|² a = 1 → A = 1/√a. Then compute P(−a ≤ x ≤ a) = ∫_{-a}^{a} (1/a) e^(−2|x|/a} dx = 1 − e^(−2) ≈ 86.5%. Students practice: normalization → probability calculation.

**Demo 3 — Classical vs. quantum probability density:**
Side by side: (Left) Classical particle in a box bouncing back and forth — it spends equal time everywhere → uniform probability density ρ(x) = 1/L. (Right) Quantum particle in a box ground state: ψ₁(x) = √(2/L) sin(πx/L) → |ψ₁|² = (2/L) sin²(πx/L) — peaked in the middle, zero at the walls. At high quantum numbers (large n): |ψₙ|² → uniform, recovering the classical result (Bohr correspondence principle).

---

## 8. Discovery Lesson

**Opening (5 min):** "You know electrons produce interference patterns in double-slit experiments. What does the pattern actually tell us? What is the mathematical object that determines where each electron is likely to land?"

**Guided inquiry (20 min):**
- Step 1: Students observe that the double-slit intensity pattern is I ∝ cos²(πd sinθ/λ) — like classical wave intensity. For electrons, this intensity becomes the probability density.
- Step 2: Students are given ψ(x) = A cos(πx/L) for −L/2 ≤ x ≤ L/2. Task: (a) Find A from normalization. (b) Find P(0 ≤ x ≤ L/4).
- Step 3: Students compute: ∫_{−L/2}^{L/2} |A|² cos²(πx/L) dx = |A|² L/2 = 1 → A = √(2/L). P(0 ≤ x ≤ L/4) = ∫₀^{L/4} (2/L) cos²(πx/L) dx — evaluated using cos²θ = (1 + cos 2θ)/2.
- Step 4: Students sketch |ψ|² = (2/L) cos²(πx/L). What does this say about where the particle is most likely to be found? (Peaked at center x = 0, zero at x = ±L/2.)

**Synthesis (10 min):**
- Formalize Born rule: |ψ(x,t)|² dx = probability of finding the particle in [x, x+dx].
- Normalization: ∫|ψ|² dx = 1 (total probability = 1).
- Expectation value: ⟨x⟩ = ∫ x |ψ|² dx — average position over many measurements.
- Collapse: after measuring position and finding x₀, ψ immediately becomes sharply peaked at x₀.

**Closure:** "The wavefunction is the most complete possible description of a quantum particle. It is not ignorance about a pre-existing definite state — it is the full story. And that story is probabilistic at its core. Einstein famously resisted this: 'God does not play dice.' But every experiment since has confirmed Born's rule and the probabilistic interpretation. The universe plays dice."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [EXPLAIN]:** Explanation A (probability amplitude framework) + Born rule as a postulate. Emphasize: ψ is complex, |ψ|² is real and non-negative, |ψ|² is a density not a probability.

**TA-2 [DEMONSTRATE]:** Demo 1 (single-electron double-slit video) — connect the pattern to |ψ|². Demo 3 (classical vs. quantum probability density for particle in a box).

**TA-3 [PROBE]:** MC-2 probe ("If |ψ(0)|² = 0.5 nm⁻¹, what is the probability of finding the particle exactly at x=0?") and MC-4 probe ("If ψ = ψ₁ + ψ₂, what is |ψ|²? Does it have an extra cross term?"). Resolve both with the distinction: density vs. probability, superposition vs. mixture.

**TA-4 [PRACTICE]:** Demo 2 (normalization and probability calculation). Students work through a complete problem: given ψ(x) = Ae^(−x²/2σ²), (a) find A, (b) find P(−σ ≤ x ≤ σ), (c) find ⟨x⟩.

---

## 10. Voice Teaching

**Opening:**
"In 1926, Erwin Schrödinger wrote down his wave equation. He thought ψ represented a physical wave — the electron was literally smeared out in space. Max Born immediately disagreed. Born's insight: |ψ|² is the probability density. The electron is not smeared out. The electron is a particle — detected at one definite point in every experiment. But you cannot predict in advance exactly where. |ψ|² tells you the probability distribution over many measurements. This interpretation — Born's rule — is one of the foundational postulates of quantum mechanics. It cannot be derived from something deeper. It is what quantum mechanics tells us about reality."

**At the complex amplitude:**
"Why is ψ complex? Because complex numbers have magnitude and phase. The magnitude squared |ψ|² gives the probability density. The phase — the angle in the complex plane — determines interference. When two wavefunctions interfere, their phases determine whether the amplitudes add (constructive interference) or cancel (destructive interference). Without the phase, there is no interference. Without interference, there is no quantum mechanics. The complex nature of ψ is not a mathematical trick — it's essential for describing quantum reality."

**At wavefunction collapse:**
"Before measurement: ψ is spread out, representing a superposition of possible positions. During measurement: a photon bounces off the electron, or a detector clicks. After measurement: ψ collapses to a sharply peaked state at the detected position x₀. This collapse is instantaneous — and it's not described by the Schrödinger equation (which evolves ψ smoothly). The collapse is the mysterious step — it's where the quantum world meets the classical world of measurement. After collapse, if you measure again immediately, you get x₀ again — the collapse is real."

---

## 11. Assessment

**Mastery gate:** Student correctly applies Born rule to calculate probabilities from a given ψ, correctly normalizes ψ, correctly computes ⟨x⟩, and correctly distinguishes probability from probability density. Score ≥ 80%.

**FA-1 — Born rule:**
*Q: ψ(x) = A for 0 ≤ x ≤ L, ψ = 0 elsewhere (particle in a box, infinite square well ground state approximation). (a) Find A. (b) P(0 ≤ x ≤ L/4). (c) P(x = L/2) exactly.*
Expected: (a) ∫₀^L |A|² dx = |A|²L = 1 → A = 1/√L. (b) P = ∫₀^{L/4} (1/L) dx = 1/4. (c) P(x = L/2) = 0 — probability density at one point gives zero probability.
Threshold: Correct A, correct P in (b), must state P = 0 in (c) with reason.

**FA-2 — Normalization of a Gaussian:**
*Q: ψ(x) = A e^(−x²/2a²). Find A. (Use ∫_{−∞}^∞ e^(−u²) du = √π.)*
Expected: ∫_{−∞}^∞ |A|² e^(−x²/a²} dx = |A|² a√π = 1 → A = (πa²)^(−1/4).
Threshold: Correct Gaussian integral application and correct A.

**FA-3 — Expectation value:**
*Q: For the Gaussian ψ(x) = (πa²)^(−1/4) e^(−x²/2a²}, compute ⟨x⟩. (Hint: the integrand is an odd function.)*
Expected: ⟨x⟩ = ∫ x |ψ|² dx = ∫ x × (1/a√π) e^(−x²/a²} dx = 0 (odd × even = odd integrand → integral over symmetric limits = 0).
Threshold: Correct identification of the integrand as odd and ⟨x⟩ = 0.

**FA-4 — Superposition interference:**
*Q: Two wavefunctions ψ₁ = A (real, constant A) and ψ₂ = A e^(iπ) = −A on the same domain. What is |ψ₁ + ψ₂|²? What is |ψ₁|² + |ψ₂|²? Compare.*
Expected: ψ₁ + ψ₂ = A − A = 0 → |ψ₁ + ψ₂|² = 0. But |ψ₁|² + |ψ₂|² = A² + A² = 2A². Conclusion: quantum superposition with opposite phase gives complete destructive interference (zero probability at that point), which is impossible for a classical mixture (which gives 2A²). This is the experimental signature of quantum superposition.
Threshold: Correct computation of both quantities and correct conclusion about destructive interference.

**Confidence calibration:** After FA-1(c), students who answer "probability = |ψ(L/2)|² = 1/L" (the density, not the probability) and are confident receive targeted feedback on the density vs. probability distinction, with explicit re-derivation.

**Delayed retrieval (session + 3):** "State Born's rule. What is the difference between |ψ(x)|² and P(a ≤ x ≤ b)? What happens to ψ after a position measurement?"

---

## 12. Recovery Notes

**S0:** Student needs phys.mod.wave-particle-duality — the wavefunction concept is unmotivated without first understanding that particles exhibit wave behavior. Students must accept the double-slit experiment before ψ makes sense.

**S3:** Student understands ψ qualitatively but cannot compute probabilities or normalization. Drill FA-1 type problems: uniform ψ → simple rectangular probability distribution. Then Gaussian ψ → Gaussian integrals.

**S6:** Student systematically sets |ψ(x₀)|² = P(x = x₀) (density = probability error). Run through FA-1(c) with explicit dimensional analysis: |ψ|² has units m⁻¹ in 1D — cannot be dimensionless probability. Must multiply by Δx to get P.

**S9:** Introduce the complex probability amplitude in full: |ψ⟩ in Dirac notation. Transition amplitudes ⟨φ|ψ⟩ and their interpretation. Preview: the Schrödinger equation iℏ ∂ψ/∂t = Ĥψ evolves ψ deterministically between measurements. Measurement is the non-deterministic step. The measurement problem: what constitutes a measurement? Different interpretations of quantum mechanics (Copenhagen, Many-Worlds, Bohmian).

---

## 13. Memory & Review

**Memory type:** Conceptual (Born rule interpretation, density vs. probability, superposition vs. mixture) + procedural (normalization, probability calculation, expectation value).

**Spaced retrieval schedule:**
- Session + 1: "State Born's rule. What is |ψ(x)|²? How do you calculate P(a ≤ x ≤ b)?"
- Session + 3: "Normalize ψ(x) = Ae^(−|x|/a). Find P(−a ≤ x ≤ a)."
- Session + 7: "What is the difference between a quantum superposition and a classical mixture? How can you tell them apart experimentally?"

**Interleaving partners:** phys.mod.wave-particle-duality (prerequisite — motivates ψ); phys.qm.schrodinger-equation (successor — equation of motion for ψ); phys.qm.uncertainty-principle (successor — consequence of ψ being a wave: narrow ψ = broad momentum distribution).

---

## 14. Transfer Map

**Near transfer:** Quantum chemistry — molecular orbitals ψ(r⃗) → electron density |ψ|² → bond structure. Visualizing an s or p orbital is the same as plotting |ψ|² for an atomic state.

**Far transfer:** Quantum computing — qubits are in superpositions ψ = α|0⟩ + β|1⟩ with |α|² + |β|² = 1. Measurement collapses to |0⟩ with probability |α|² or |1⟩ with probability |β|². The Born rule is the core of quantum computing measurement theory.

**Structural abstraction:** "Probability amplitude → Born rule → probability." This structure appears in quantum electrodynamics (Feynman path integrals: amplitude for each path → |total amplitude|² = probability), quantum field theory, and quantum information theory.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** phys.mod.wave-particle-duality is necessary — students must accept wave behavior of particles before the wavefunction concept is meaningful. Students who are shaky on the double-slit experiment should revisit phys.mod.wave-particle-duality before this concept.
- **Unlock readiness:** Both unlocks (phys.qm.schrodinger-equation, phys.qm.uncertainty-principle) are well-prepared by this concept. The Schrödinger equation is the equation of motion for ψ (natural next step). The uncertainty principle is the consequence of ψ being a Fourier wave packet (natural extension).
- **Difficulty calibration:** Advanced/understand is correct. The mathematics (complex numbers, normalization integrals) is not heavy, but the conceptual content (Born rule as a postulate, collapse, superposition vs. mixture) requires sustained abstract reasoning.
- **Suggested problem set:** (1) Normalize three different wavefunctions (uniform, Gaussian, exponential). (2) Compute P(a ≤ x ≤ b) for each. (3) Compare |ψ₁ + ψ₂|² with |ψ₁|² + |ψ₂|² for two specific cases (in-phase, out-of-phase). (4) Compute ⟨x⟩ and ⟨x²⟩ for the Gaussian. (5) Interpretation question: explain in two sentences why the particle's position before measurement is genuinely indeterminate, not merely unknown.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

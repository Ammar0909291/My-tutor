# Teaching Blueprint: Quantum Tunneling

## 0. Concept Metadata
- **Concept ID**: phys.qm.quantum-tunneling
- **Name**: Quantum Tunneling
- **Domain**: Quantum Mechanics
- **Difficulty**: expert
- **Bloom Level**: analyze
- **Estimated Hours**: 8
- **Prerequisites**: phys.qm.schrodinger-equation
- **Unlocks**: (none — leaf node)
- **Description**: Quantum tunneling is the penetration of a particle through a potential barrier even when its energy is less than the barrier height.

---

## 1. Concept Spine

### Core Idea
When a quantum particle encounters a potential barrier V₀ > E (classically forbidden), the wave function decays exponentially inside the barrier (evanescent wave) rather than stopping abruptly. If the barrier is thin enough, the wave function emerges on the other side with reduced amplitude — the particle has tunneled through. The transmission probability T depends exponentially on barrier width d and height (V₀ − E): T ≈ e^(−2κd) where κ = √(2m(V₀−E))/ℏ.

### Conceptual Ladder
1. **Recall**: TISE solutions are oscillatory (sin/cos) where E > V and evanescent (e^(±κx)) where E < V.
2. **Understand**: Evanescent wave is non-zero in the barrier → some probability leaks to the right of the barrier.
3. **Apply**: Calculate transmission coefficient T for a rectangular barrier; estimate T for given barrier parameters.
4. **Analyze**: Explain exponential sensitivity to barrier parameters; connect to alpha decay half-lives, STM resolution, tunnel diode operation.

### Key Formula Set
- **Evanescent wave in barrier**: ψ_II = Ce^(−κx) + De^(κx), κ = √(2m(V₀−E))/ℏ
- **Transmission probability** (rectangular barrier, κd >> 1 approximation):
  T ≈ 16(E/V₀)(1−E/V₀) e^(−2κd) ≈ e^(−2κd) for thick barrier
- **Exact result**: T = [1 + (V₀²sinh²(κd))/(4E(V₀−E))]⁻¹
- **Gamow factor** (alpha decay): Γ ≈ e^(−2G) where G = (1/ℏ)∫√(2m(V(r)−E))dr (integral over classically forbidden region)
- **Reflection coefficient**: R = 1 − T (probability is conserved: R + T = 1)
- **Key scaling**: T is exponentially sensitive to κ = √(2m(V₀−E))/ℏ and barrier width d; small changes in d cause large changes in T.

### Canonical Examples
- **Alpha decay (Gamow)**: ²³⁸U decays by alpha emission through a Coulomb barrier; the exponential dependence of T on barrier width (which changes with energy E_α) explains the enormous range of half-lives (10⁻⁷ s to 10¹⁰ years) observed across alpha emitters — Geiger-Nuttall law.
- **STM (scanning tunneling microscope)**: Tunneling current I ∝ T ∝ e^(−2κd) between tip and surface. Reducing gap by 0.1 nm changes T (and current) by factor ~10 — gives sub-angstrom vertical resolution.
- **Tunnel diode**: Quantum tunneling through a thin p-n junction gives negative differential resistance at low bias — exploited in high-frequency oscillators.
- **Fusion in stars**: Proton-proton fusion in the sun occurs at T ≈ 10⁷ K; classical barrier is too high, but tunneling through the Coulomb barrier enables fusion at stellar temperatures.

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Physical Experience)
Imagine pushing a ball at a hill. Classically: not enough energy to reach the top → ball rolls back. Quantum mechanically: the ball's matter wave extends up into and through the hill. If the hill is thin, part of the wave emerges on the other side. This is NOT the ball going over the top — it genuinely appears on the other side without ever having enough energy to be at the top. The probability of tunneling decreases exponentially as the hill gets wider or taller.

Another image: dip your finger into a pool of water and hold it near a second pool. No water flows. Now connect the pools with a very thin membrane — some water (probability amplitude) can leak through by quantum tunneling, even though the membrane blocks classical transfer.

### Representational (Diagrams and Symbols)
- **Wave function diagram**: Three regions: (I) x < 0, oscillatory ψ₁ (incident + reflected wave); (II) 0 < x < d, evanescent ψ₂ decaying in barrier; (III) x > d, oscillatory ψ₃ (transmitted wave, smaller amplitude). The key: ψ₂ ≠ 0 inside the barrier.
- **Potential energy diagram**: Step-function potential with E below V₀. Draw the classically forbidden region (hatched). Mark the evanescent decay inside and the transmitted wave outside.
- **T vs. d graph**: Plot T ≈ e^(−2κd) on semilog scale — straight line (exponential in linear scale). Show sensitivity: doubling d squares T's exponent.
- **STM image**: Real STM image showing individual atoms — explain that the corrugation reflects T exponential sensitivity to tip-sample gap.

### Abstract (Equation Manipulation)
Students must practice:
1. Write solutions in each region (oscillatory/evanescent) using κ and k.
2. Apply matching conditions at both boundaries: continuity of ψ and dψ/dx.
3. Solve for transmission amplitude; compute T = |transmitted amplitude|²/|incident amplitude|².
4. Apply T ≈ e^(−2κd) for thick barriers; estimate T for specific parameters.
5. Use Gamow factor integral (WKB approximation) for non-rectangular barriers.

### Transfer (Novel Contexts)
- **Josephson junction**: Superconducting tunneling of Cooper pairs through a thin insulator; exact same mathematics with the wave function replaced by the superconducting order parameter.
- **Quantum computing (qubits)**: Tunnel junctions in transmon qubits are the nonlinear element that makes Josephson junctions nonlinear oscillators — the operational basis of most superconducting quantum computers.
- **Enzyme catalysis**: Proton tunneling in enzyme-catalyzed reactions (e.g., alcohol dehydrogenase) contributes to rates above classical predictions — active area of biophysics research.

---

## 3. Why Beginners Fail

### Failure Mode 1: "The particle has enough energy in the barrier"
Students think the particle temporarily "borrows" energy from the uncertainty principle to cross the barrier. This is the quantum mythology of "energy borrowing." The correct picture: the particle doesn't have enough energy — but its wave function extends into the barrier exponentially, and if the barrier is thin, the amplitude re-emerges on the other side. No energy conservation violation occurs; the transmitted particle has the same energy as the incident particle (T is calculated at the same E).

### Failure Mode 2: Forgetting κ depends on (V₀−E), not V₀ alone
Students write κ = √(2mV₀)/ℏ. The correct form is κ = √(2m(V₀−E))/ℏ. If E = 0, κ = √(2mV₀)/ℏ — but for a particle with E = V₀/2, κ = √(2m×V₀/2)/ℏ = √(mV₀)/ℏ — different.

### Failure Mode 3: T + R ≠ 1
Students compute T and think they're done. They must verify R = 1 − T (probability is conserved). Alternatively, they forget to account for the reflected wave in region I and compute incorrect transmission.

### Failure Mode 4: Applying the thick-barrier approximation T ≈ e^(−2κd) when κd is not >> 1
The approximation is excellent for κd >> 1 but gives wrong answers for thin barriers or resonance conditions (where T can approach 1 even for V₀ > E — resonant tunneling).

---

## 4. Misconception Library

### MC-1: "The particle goes over the barrier using borrowed energy"
- **Probe**: "How does a particle tunnel? Does it temporarily have enough energy to reach the top?"
- **Characteristic phrase**: "The uncertainty principle lets it borrow energy ΔE for time Δt."
- **Trigger**: Pop-science descriptions of tunneling; energy-time uncertainty misapplication.
- **Conflict evidence**: The transmitted particle has exactly the same energy as the incident particle (energy is conserved throughout). The transmitted particle's energy equals E_incident — not V₀. The wave function inside the barrier is evanescent (decaying), not oscillatory — the particle is NOT at the classical turning point with extra energy.
- **Bridge**: Think of the evanescent wave: it decays smoothly inside the barrier. No energy spike needed — the amplitude just leaks through, like light leaking through a thin metal film (optical tunneling = frustrated total internal reflection).
- **Replacement**: Tunneling occurs because ψ ≠ 0 inside the barrier — the wave function has a non-zero tail. The particle never "goes over" the top; it appears on the other side with the same energy as before.
- **Discrimination pairs**: "Transmitted particle energy = incident particle energy" ✓ vs. "Particle borrows energy ΔE = V₀−E for time Δt" ✗
- **S6 repair path**: Compute the energy of the transmitted particle (same E as incident); show κ is real in the barrier (evanescent, not oscillatory) — no "real" particle can be at position x inside the barrier during classical analysis.

### MC-2: "Tunneling violates energy conservation"
- **Probe**: "If a particle with E = 1 eV tunnels through a barrier of V₀ = 5 eV, where does it get the energy to be inside the barrier?"
- **Characteristic phrase**: "Energy conservation says this shouldn't happen."
- **Trigger**: Classical intuition: inside the barrier KE = E − V₀ < 0 — impossible.
- **Conflict evidence**: Quantum mechanically, we cannot ask "what is the particle's KE at x inside the barrier" because position and energy cannot simultaneously be definite. The particle doesn't "have" a KE at a specific position inside the barrier — only probabilities are defined. Energy is conserved in the sense that the total energy E is the same before, during, and after.
- **Bridge**: The question "what is the particle's energy at position x inside the barrier?" is ill-posed in quantum mechanics. The energy eigenstate has energy E everywhere; the classically forbidden region is forbidden only classically, not quantum mechanically.
- **Replacement**: Energy is conserved: transmitted particle has energy E = incident particle energy. The "forbidden region" is forbidden for classical trajectories; quantum mechanics has no trajectories.
- **Discrimination pairs**: "Energy conserved: E_transmitted = E_incident" ✓ vs. "Tunneling violates energy conservation" ✗
- **S6 repair path**: Compute T for V₀ = 5E barrier; verify the transmission formula gives T > 0 even at the same E — no energy is added.

### MC-3: "T depends linearly on barrier thickness"
- **Probe**: "If I double the barrier thickness, how does T change?"
- **Characteristic phrase**: "T decreases proportionally with thickness."
- **Trigger**: Intuition from classical barrier penetration (linear attenuation of classical waves like sound in walls).
- **Conflict evidence**: T ≈ e^(−2κd). Doubling d gives T ≈ e^(−4κd) = (e^(−2κd))² = T²_original — T is squared. For T = 10⁻³, doubling d gives T ≈ 10⁻⁶. This is the exponential sensitivity exploited in STM.
- **Bridge**: Classical waves attenuate exponentially too (Lambert-Beer law for light, sound in dense media). Quantum tunneling is the same mathematics but applied to probability amplitude.
- **Replacement**: T ≈ e^(−2κd): exponential in d. Each added thickness d reduces T by the same factor e^(−2κd) — multiplicative, not additive.
- **Discrimination pairs**: "T ≈ e^(−2κd): exponential in d (STM exploits this)" ✓ vs. "T decreases linearly with d" ✗
- **S6 repair path**: Compute T for d = 0.1 nm, 0.2 nm, 0.3 nm with κ = 10 nm⁻¹ typical of STM. Show e^(−2), e^(−4), e^(−6) ratios.

### MC-4: "Tunneling is only relevant for electrons (not larger particles)"
- **Probe**: "Can a proton tunnel? What about a carbon atom?"
- **Characteristic phrase**: "Only electrons are small enough to tunnel."
- **Trigger**: Students associate quantum effects with electrons only.
- **Conflict evidence**: Alpha particles (mass ~7300m_e) tunnel through nuclear Coulomb barriers in alpha decay. Protons tunnel in enzyme reactions and in stellar fusion. Even whole hydrogen atoms can tunnel in surface chemistry (H diffusion on metals).
- **Bridge**: κ = √(2m(V₀−E))/ℏ — heavier particles have larger κ → smaller T. Tunneling decreases with mass but is never zero. For macroscopic objects, T is so small it's unmeasurable; for light particles (electrons, protons), it's significant.
- **Replacement**: All particles tunnel; T decreases exponentially with √m × d. Electrons tunnel most easily; protons and alpha particles can tunnel through thin/short barriers with significant probability.
- **Discrimination pairs**: "All particles tunnel; T ∝ e^(−2d√(2m(V₀−E))/ℏ) — decreases with mass" ✓ vs. "Only electrons tunnel" ✗
- **S6 repair path**: Compute T for electron vs. proton through same barrier (V₀−E = 1 eV, d = 0.5 nm). T_electron = e^(−2×0.51×0.5) ≈ e^(−5.1) ≈ 6×10⁻³; T_proton = e^(−2×9.38×0.5) ≈ e^(−93.8) ≈ 10⁻⁴¹. Enormous difference — but T_proton is still > 0.

---

## 5. Explanation Library

### Explanation A — Schrödinger equation (for rigorous learners)
In region II (barrier, 0 < x < d), TISE with E < V₀: ℏ²/2m d²ψ/dx² = (V₀−E)ψ → d²ψ/dx² = κ²ψ. Solution: ψ_II = Ce^(−κx) + De^(κx). This is real and decaying — evanescent. At x = d, if C e^(−κd) ≠ 0 (thin enough barrier), the wave function connects to an oscillatory wave in region III. Matching conditions (continuity of ψ and ψ') at both boundaries determine T. The mathematics is identical to calculating the transmittance of light through a thin lossy medium.

### Explanation B — Analogy (for intuitive learners)
Frustrated total internal reflection (optics): light traveling in glass hits a glass-air interface at more than the critical angle — classically totally reflected. But if a second piece of glass is placed very close (nanometers), light appears in the second piece. This is optical tunneling: the evanescent electromagnetic wave in the air gap (classically forbidden region) connects to the propagating wave in the second glass. Same mathematics, photons instead of electrons, electric field instead of ψ.

### Explanation C — Qualitative and applications (for applied learners)
Three key quantities: (1) κ = √(2m(V₀−E))/ℏ — "decay constant" in the barrier, larger for higher/wider barrier; (2) barrier width d; (3) T ≈ e^(−2κd). For STM: d = 1 nm, κ ≈ 10 nm⁻¹ → T ≈ e^(−20) ≈ 10⁻⁹. Changing d by 0.1 nm changes T by e^(±2) ≈ 7.4× — gives sub-angstrom height resolution. For alpha decay: Gamow factor G = ∫κ(r)dr integrated over the Coulomb barrier; different E_α values give wildly different G values → half-lives from microseconds to 10¹⁰ years.

---

## 6. Analogy Library

### Primary Analogy
**Optical frustrated total internal reflection (FTIR)**: Two glass prisms separated by a narrow air gap. Light undergoes total internal reflection at the glass-air interface — the electric field decays exponentially in the air gap (evanescent wave). If the gap is thin enough, the light "tunnels" through and appears in the second prism with reduced intensity. Engineers use this in beam-splitters. Quantum tunneling is exactly this phenomenon, applied to matter waves.

### Breaking Point
The FTIR analogy is excellent mathematically — identical differential equation (Helmholtz vs. Schrödinger) and identical evanescent structure. It breaks only for the probabilistic interpretation: individual photons tunnel with probability T, but FTIR is typically described classically as partial transmission of intensity. For particles, each individual particle either tunnels (probability T) or reflects (probability R = 1−T) — the probabilistic nature is quantum, not classical.

### Anti-Analogy
"The particle slips through a crack in the barrier" — this suggests the barrier has a hole. It doesn't. The tunneling occurs uniformly across the full barrier; it's the wave-like nature of the particle that allows penetration, not a structural defect.

---

## 7. Demonstration Library

### Demo 1: T vs. d Computation (STM)
Materials: Calculator.
κ_typical = √(2×9.11×10⁻³¹ × 4.5eV × 1.6×10⁻¹⁹) / (1.055×10⁻³⁴) = 1.08×10¹⁰ m⁻¹ = 10.8 nm⁻¹.
For d = 0.5, 1.0, 1.5 nm: T ≈ e^(−10.8), e^(−21.6), e^(−32.4) ≈ 2×10⁻⁵, 4×10⁻¹⁰, 8×10⁻¹⁵.
Each 0.5 nm increase: factor of e^(−10.8) ≈ 2×10⁻⁵ reduction in current. Students understand why STM can resolve individual atoms.

### Demo 2: Geiger-Nuttall Law
Materials: Table of alpha emitter half-lives and alpha particle energies.
For ²¹²Po (E_α = 8.78 MeV, t₁/₂ = 299 ns) vs. ²³²Th (E_α = 4.08 MeV, t₁/₂ = 1.4×10¹⁰ yr): two orders of magnitude in energy → 24 orders of magnitude in half-life. Students see that the Gamow factor is extremely sensitive to E_α, because G ∝ (V₀−E)^(1/2) integrated over the Coulomb barrier — small E_α → larger barrier → much smaller T → much longer half-life.

### Demo 3: Frustrated TIR with Laser
Materials: Two glass prisms, green laser pointer.
Set up: laser in first prism at critical angle → total internal reflection. Bring second prism within 1 mm → nothing. Bring within ~0.5 μm (using tape as spacer) → light appears in second prism. Students see FTIR — the optical analog of quantum tunneling.
(If lab setup not available: show video from optics laboratory.)

---

## 8. Discovery Lesson

**Title**: "Why Does Uranium-238 Last 4.5 Billion Years but Polonium-212 Lasts 0.3 μs?"

**Hook**: "Both are alpha emitters. Both emit an alpha particle through a Coulomb barrier. Yet their half-lives differ by 24 orders of magnitude. What could cause this?"

**Exploration**:
1. Show Coulomb barrier V(r) = Z₁Z₂e²/(4πε₀r) for r > R_nucleus, and nuclear potential V = −V₀ for r < R_nucleus.
2. Alpha particle has energy E < V_Coulomb at the nuclear surface — classically cannot escape.
3. T ≈ exp(−2G) where G = ∫_{r₁}^{r₂} √(2m(V(r)−E)) dr / ℏ.
4. Show that ²³⁸U has E_α = 4.27 MeV (lower) while ²¹²Po has E_α = 8.78 MeV (higher).
5. Compute G roughly: G ∝ Z/√E_α (Gamow's result). Ratio G(²³⁸U)/G(²¹²Po) ≈ 92/√4.27 / (84/√8.78) ≈ 44.5/28.4 ≈ 1.57. So T(²³⁸U)/T(²¹²Po) ≈ e^(−2×44.5)/e^(−2×28.4) = e^(−32) ≈ 10⁻¹⁴.
6. Half-life ∝ 1/T → explains the 10¹⁴ to 10²⁴ range (additional nuclear frequency factors contribute).

**Conclusion**: A small difference in barrier height (tunneling energy) creates an enormous difference in tunneling probability via the exponential — that's why alpha decay half-lives span 24 orders of magnitude.

---

## 9. Teaching Actions

**session_cap**: 7

1. **Classical forbidden region**: Show V₀ > E diagram; discuss classical prediction (reflection). Ask: "Is the wave function really zero inside the barrier in QM?"
2. **TISE in barrier region**: Solve d²ψ/dx² = κ²ψ → evanescent solution. Show ψ ≠ 0 inside.
3. **Three-region matching**: Write solutions in I, II, III; state continuity conditions at both boundaries.
4. **Transmission coefficient**: Derive T for thick barrier approximation: T ≈ e^(−2κd). Discuss physical meaning.
5. **Exponential sensitivity**: Compute T for d = 0.5, 1.0, 1.5 nm (STM context). Students feel the exponential sensitivity.
6. **Gamow factor**: Qualitative discussion; show how different α-particle energies give different T → Geiger-Nuttall law.
7. **Applications**: STM, alpha decay, stellar fusion, tunnel diode — connect each to T ≈ e^(−2κd) or its generalization.

---

## 10. Voice Teaching

**Opening move**: "Classical physics says: not enough energy → can't cross the barrier. Let me show you why quantum mechanics disagrees — and why that disagreement powers the STM that reads individual atoms."

**Core explanation**: "Inside the barrier, V > E, so the TISE gives d²ψ/dx² = κ²ψ. The solution is not oscillatory — it's exponential: e^(−κx). That's evanescent. It doesn't go to zero instantly — it decays. If the barrier is thin, some amplitude survives to the other side. Squaring that amplitude gives the tunneling probability T ≈ e^(−2κd)."

**Common error interception**: "κ depends on V₀ − E, not V₀ alone. Write κ = √(2m(V₀−E))/ℏ every single time. If you leave out E, your κ is wrong."

**Checkpoint question**: "If I increase the barrier height by 4× (with the same E), how does κ change? How does T change?" (κ → 2κ; T ≈ e^(−4κd) instead of e^(−2κd) → T² of original value — T decreases dramatically.)

**Closing move**: "The STM that scanned the first atom was built entirely on quantum tunneling. The nuclear reaction that powers the sun works because of quantum tunneling. The principle — T ≈ e^(−2κd) — is one of the most consequential equations in applied physics."

---

## 11. Assessment

### Mastery Gate
Student can: (1) write evanescent wave function in the barrier, (2) state T ≈ e^(−2κd) and compute T for given parameters, (3) explain why T is exponentially sensitive to d, (4) connect to at least two physical applications (alpha decay, STM, stellar fusion).

### Formative Assessment 1 — Evanescent wave
**Prompt**: "An electron (m = 9.11×10⁻³¹ kg) faces a barrier V₀ = 2 eV with E = 1 eV. Compute κ and the decay constant inside the barrier."
**Expected answer**: V₀ − E = 1 eV = 1.6×10⁻¹⁹ J. κ = √(2×9.11×10⁻³¹×1.6×10⁻¹⁹)/(1.055×10⁻³⁴) = 5.12×10⁹ m⁻¹ ≈ 5.1 nm⁻¹.
**Threshold**: Within 5%.

### Formative Assessment 2 — Transmission probability
**Prompt**: "Using κ = 5.1 nm⁻¹ from FA1, compute T for barrier widths d = 0.5 nm and d = 1.0 nm. What is the ratio T(0.5 nm)/T(1.0 nm)?"
**Expected answer**: T(0.5) ≈ e^(−2×5.1×0.5) = e^(−5.1) ≈ 6.1×10⁻³. T(1.0) ≈ e^(−10.2) ≈ 3.7×10⁻⁵. Ratio ≈ 165. Check: e^(5.1) ≈ 165 ✓ (doubling d squares the exponent → ratio = e^(5.1)).
**Threshold**: T values within factor of 2; ratio to the right order of magnitude.

### Formative Assessment 3 — STM application
**Prompt**: "An STM has a tip-sample gap of 0.6 nm and a tunneling current I ∝ T ≈ e^(−2κd) with κ = 10 nm⁻¹. If the gap increases by 0.05 nm (half an angstrom), by what factor does the current decrease?"
**Expected answer**: ΔT = T'/T = e^(−2×10×0.65)/e^(−2×10×0.6) = e^(−2×10×0.05) = e^(−1) ≈ 0.37. Current decreases to 37% of original — a 63% decrease for a 0.05 nm gap change. This is the basis of sub-angstrom vertical resolution.
**Threshold**: Factor e^(−1) ≈ 0.37 within 10%.

### Formative Assessment 4 — Alpha decay
**Prompt**: "Alpha particle A has E = 5 MeV and alpha particle B has E = 6 MeV. Both face the same Coulomb barrier V₀ = 10 MeV. Estimate the ratio of their Gamow factors κ_A/κ_B and predict which nucleus has a longer half-life."
**Expected answer**: κ_A = √(2m_α×(10−5)MeV)/ℏ = √(2m_α×5MeV)/ℏ; κ_B = √(2m_α×4MeV)/ℏ. Ratio κ_A/κ_B = √(5/4) = √1.25 ≈ 1.118. T_A/T_B ≈ e^(−2κ_A d)/e^(−2κ_B d) = e^(−2d(κ_A − κ_B)) << 1 (A tunnels less). Nucleus A has longer half-life.
**Threshold**: Correct ratio κ_A/κ_B; correct conclusion about half-life.

### Confidence Calibration
After FA1: "How confident are you (0–100%) that your κ is in the right range? Quick check: for a 1 eV barrier excess, κ ≈ 5 nm⁻¹ is typical for electrons. Does your answer match this ballpark?"

### Delayed Retrieval
Two weeks later: Without notes, state the formula for T in the thick-barrier limit; explain in one paragraph why STM achieves sub-angstrom resolution using this formula; draw a sketch of ψ(x) across a rectangular barrier.

---

## 12. Recovery Notes

### S0 — Block: "I don't understand why the wave function doesn't just stop at the wall"
Return to TISE: inside the barrier, d²ψ/dx² = κ²ψ with κ² > 0. A function satisfying d²f/dx² = κ²f doesn't go to zero — it either grows (e^(+κx)) or decays (e^(−κx)) exponentially. It can't abruptly stop. The only way ψ = 0 identically inside a finite region is if κ = ∞ (infinite barrier) — that's the infinite well case. For finite barriers, ψ must be continuous (TISE is a second-order ODE with smooth solutions).

### S3 — Can write evanescent solution but cannot compute T
The matching conditions at x = 0 and x = d are the source of difficulty. Drill: (1) write ψ_I, ψ_II, ψ_III with correct general forms; (2) write 4 equations (continuity of ψ and ψ' at x = 0 and x = d); (3) use the thick-barrier approximation (D ≈ 0 in ψ_II to simplify). For assessment purposes, the thick-barrier formula T ≈ e^(−2κd) is usually sufficient without the full 4-equation system.

### S6 — Understands T but misses applications
Give three applications where T controls something measurable: (1) STM current vs. gap; (2) alpha decay half-life vs. E_α; (3) tunnel diode I-V curve. For each, identify d, κ, T in the context. Students should be able to explain qualitatively why an STM can see individual atoms without deriving T from scratch.

### S9 — Cannot connect exponential sensitivity to practical significance
Numerical demonstration: compute T for d = 1.0, 1.1, 1.2, 1.3 nm with κ = 10 nm⁻¹. Values: e^(−20), e^(−22), e^(−24), e^(−26). Ratio per 0.1 nm: e^(−2) ≈ 0.135. Students see: 13.5% decrease per 0.1 nm → 86.5% of current drops per angstrom of tip retraction. That's why STM works — it reads the surface topography in current changes.

---

## 13. Memory and Review

### Memory Type
Conceptual (wave function in classically forbidden region ≠ 0) + procedural (κ calculation, T ≈ e^(−2κd) application) + declarative (applications: STM, alpha decay, stellar fusion).

### Spaced Retrieval Schedule
- Day 1: Write evanescent solution; compute κ for V₀−E = 2 eV electron.
- Day 3: Compute T for d = 0.8 nm with κ from Day 1.
- Day 7: Explain in 3 sentences why STM has sub-angstrom vertical resolution.
- Day 14: Explain qualitatively why ²³⁸U has much longer half-life than ²¹²Po.
- Day 30: Write T ≈ e^(−2κd) from memory; list 3 physical systems where quantum tunneling is essential.

### Interleaving Partners
- phys.qm.schrodinger-equation (evanescent solution is the TISE solution for E < V)
- phys.mod.radioactivity (alpha decay is the first application encountered)
- phys.mod.nuclear-reactions (alpha decay Q-value and Gamow factor)

---

## 14. Transfer Map

### Near Transfer
- Compute T for a rectangular barrier with any given V₀, E, d, m.
- Estimate the effect of barrier parameter changes on T.
- Apply WKB/Gamow factor for non-rectangular barriers (qualitative).

### Far Transfer
- **Josephson effect**: Tunneling of Cooper pairs through thin insulating layers — fundamental to superconducting quantum computers and SQUID magnetometers.
- **Enzyme kinetics**: Hydrogen/proton tunneling contributes to enzyme reaction rates significantly below classical predictions.
- **Solar energy**: Proton-proton fusion in stellar cores powered by Gamow tunneling at T ~ 10⁷ K.

### Structural Abstraction
Quantum tunneling is the general phenomenon of wave penetration into classically forbidden regions. The exponential decay T ∝ e^(−2∫κ(x)dx} is universal for any wave equation in a region where the squared wave number becomes negative (k² < 0). This appears in: quantum mechanics (particle tunneling), optics (FTIR, evanescent waves), acoustics (sound tunneling through thin barriers), and condensed matter (electron tunneling in semiconductors). The mathematics is identical; only the physical context changes.

---

## 15. Curriculum Feedback

### Prerequisite Adequacy
phys.qm.schrodinger-equation is the only prerequisite — students need to know how to solve the TISE in oscillatory and evanescent regions. The matching condition mathematics is new but follows directly from the ODE framework already established. Prerequisite is necessary and sufficient.

### Unlock Readiness
Leaf node — no direct KG unlocks. However, quantum tunneling is referenced in nuclear physics (alpha decay), solid-state physics (tunnel junctions), and quantum chemistry (proton transfer). The concept should be flagged as cross-domain.

### Suggested Flag
Connect explicitly to phys.mod.radioactivity (alpha decay) during teaching. Students who have already studied alpha decay phenomenologically will find that the Gamow factor explanation "closes the loop" on a mystery they already encountered — a powerful pedagogical moment.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

# Teaching Blueprint: Fermi-Dirac Statistics

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | phys.stat.fermi-dirac |
| **Name** | Fermi-Dirac Statistics |
| **Domain** | Statistical Physics |
| **Difficulty** | Expert |
| **Bloom Level** | Apply |
| **Estimated Hours** | 10 |
| **Mastery Threshold** | 0.80 |
| **Prerequisites** | phys.stat.partition-function |
| **Unlocks** | (none directly listed) |

---

## 1. Concept Spine

**One-sentence definition:** Fermi-Dirac statistics describe the thermal occupation of quantum states by fermions (particles with half-integer spin) subject to the Pauli exclusion principle: the mean occupation number of state i is f(Eᵢ) = 1/(e^((Eᵢ−μ)/k_BT) + 1).

**The core insight:** The +1 in the denominator (vs. −1 for bosons, 0 for classical) enforces the Pauli exclusion principle: no quantum state can be occupied by more than one fermion. At T = 0, fermions fill all states up to the Fermi energy E_F and leave all states above E_F empty — the sharpest possible occupation distribution. At finite T, only states within ~k_BT of E_F are affected. This makes fermion systems (electrons in metals, electrons in white dwarfs) very different from classical gases.

**Conceptual chain:**
1. Fermions: particles with half-integer spin (electrons, protons, neutrons, quarks). Obey Pauli exclusion: at most one particle per quantum state.
2. Grand canonical ensemble: particle number N fluctuates; chemical potential μ is fixed. Z = Π_i (1 + e^(−β(Eᵢ−μ)}) (for one fermion per state: either occupied or empty).
3. Mean occupation: f(E) = ⟨n⟩ = 1/(e^(β(E−μ)) + 1). This is the Fermi-Dirac distribution.
4. At T = 0: f(E) = 1 for E < μ = E_F and f(E) = 0 for E > E_F (step function). E_F = Fermi energy.
5. At T > 0: smooth sigmoid around E_F over energy range ~k_BT.
6. Chemical potential μ: E_F at T=0; decreases slightly with T for electrons in metals (μ ≈ E_F at room temperature since k_BT << E_F for metals).
7. Fermi energy for a 3D electron gas: E_F = (ℏ²/2m)(3π²n)^(2/3) where n = N/V.
8. Electronic heat capacity: C_V = (π²/2)Nk_B × (k_BT/E_F) << Nk_B. Much smaller than classical (3/2)Nk_B because only electrons near E_F are thermally active.
9. Degeneracy pressure: even at T = 0, electrons have kinetic energy and exert pressure (Pauli pressure). Supports white dwarf stars against gravitational collapse.

**Central equations:**
- Fermi-Dirac distribution: f(E) = 1/(e^((E−μ)/k_BT) + 1)
- At T = 0: f(E) = θ(E_F − E) (step function)
- Fermi energy (3D free electron gas): E_F = (ℏ²/2m)(3π²n)^(2/3)
- Electronic heat capacity: C_V = (π²/3)k_B²T D(E_F) = (π²/2)Nk_B(k_BT/E_F)
- Fermi temperature: T_F = E_F/k_B (room temperature << T_F for metals)

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- Parking garage analogy: cars (fermions) fill the lowest available floors (energy states). At T = 0, all floors below E_F are completely full; all above E_F are empty. At T > 0, a few cars on the top occupied floor can "jump" to the lowest empty floor — only those near E_F are thermally mobile.
- Staircase filling: draw energy states as steps. Fermions fill from the bottom up (T=0), one per step. This is analogous to filling atomic orbitals with the aufbau principle.
- White dwarf star: even at T = 0 K (hypothetically), electron degeneracy pressure would prevent collapse. The pressure is not thermal — it is purely quantum mechanical, arising from the exclusion principle forcing electrons into high-energy states.

### Representational (Iconic)
- Fermi-Dirac distribution plot: f(E) vs. E for T = 0 (step function), T = 1000 K, T = 10,000 K. Show the softening around E_F ≈ 5 eV (typical metal).
- Density of states × distribution: n(E) = g(E) f(E). The occupied states form a filled band from 0 to ~E_F.
- Comparison to Maxwell-Boltzmann: at E >> μ, Fermi-Dirac → Maxwell-Boltzmann. At E ~ μ, they diverge dramatically.
- Temperature scale: T_F = E_F/k_B ~ 50,000 K for typical metals. Room temperature ~ 0.6% of T_F. Electrons are almost completely degenerate at room temperature.

### Abstract (Symbolic)
- Grand partition function derivation: for one state with energy E, allowed occupations are n = 0 or n = 1 (Pauli). Z_state = 1 + e^(−β(E−μ)). ⟨n⟩ = ∂(ln Z_state)/∂(βμ) = e^(−β(E−μ))/(1 + e^(−β(E−μ)}) = 1/(e^(β(E−μ)) + 1).
- Fermi energy derivation: N = ∫₀^{E_F} g(E) dE where g(E) = (V/2π²)(2m/ℏ²)^(3/2) √E. Integral → N = (V/3π²)(2mE_F/ℏ²)^(3/2) → E_F = (ℏ²/2m)(3π²N/V)^(2/3).
- Electronic heat capacity (Sommerfeld): C_V = (π²/2)Nk_B(k_BT/E_F). The factor (k_BT/E_F) << 1 at room temperature explains why electronic heat capacity of metals is small (historically puzzling in the classical model, which predicted C_V = 3Nk_B/2).

### Transfer (+)
- Semiconductors: valence band (full at T=0) and conduction band (empty at T=0) separated by band gap E_g. Fermi level sits in the gap. Thermal excitation across the gap (n ∝ e^(−E_g/2k_BT)) determines conductivity.
- White dwarf stars: electron degeneracy pressure P = (ℏ²/5m)(3π²)^(2/3)(N/V)^(5/3) — independent of temperature. Chandrasekhar limit (1.4 M_sun): beyond this mass, degeneracy pressure can no longer support the star → collapse to neutron star or black hole.
- Metals: Ohm's law, electrical and thermal conductivity all derive from the Sommerfeld free electron model with Fermi-Dirac statistics.

---

## 3. Why Beginners Fail

**Mode 1 — Treating fermions as classical particles:** Students apply Maxwell-Boltzmann statistics to electrons. This fails at energies near and below E_F — the classical distribution gives occupation > 1 (impossible for fermions) and underpredicts the average kinetic energy.

**Mode 2 — Confusing f(E) with the number of electrons at energy E:** f(E) is the mean occupation of a state at energy E — a number between 0 and 1. The number of electrons in energy range [E, E+dE] is g(E) f(E) dE, where g(E) is the density of states. Students often omit g(E).

**Mode 3 — Thinking μ = E_F always:** The chemical potential μ = E_F exactly only at T = 0. At finite T, μ decreases slightly. For metals at room temperature, μ ≈ E_F is an excellent approximation (since k_BT << E_F), but in semiconductors or at high T, μ can be far from E_F.

**Mode 4 — Confusing Fermi-Dirac with classical Boltzmann limit:** At E − μ >> k_BT (high energy tail), f(E) ≈ e^(−(E−μ)/k_BT) — the Maxwell-Boltzmann form. Students apply this approximation everywhere, including at E < μ where f → 1, not 0.

---

## 4. Misconception Library

### MC-1: "The Fermi-Dirac distribution can be approximated by Maxwell-Boltzmann for electrons in metals at room temperature"
- **Probe:** "At what energy does the Fermi-Dirac distribution differ significantly from Maxwell-Boltzmann for electrons in copper (E_F ≈ 7 eV) at T = 300 K?"
- **Characteristic phrase:** "Room temperature is low, so Maxwell-Boltzmann is fine."
- **Trigger:** Classical statistics give correct results for ideal gases at room temperature. Students overgeneralize.
- **Conflict evidence [P28]:** k_BT at 300 K ≈ 0.026 eV. E_F for copper ≈ 7 eV. k_BT/E_F ≈ 0.4%. The Maxwell-Boltzmann distribution predicts f(E) ≈ e^(−E/k_BT) → f(7 eV) ≈ e^(−7/0.026) ≈ e^(−269) ≈ 10⁻¹¹⁷. The Fermi-Dirac distribution gives f(E_F) = 1/2. The two differ by 117 orders of magnitude at the Fermi energy. The electron gas in copper is deeply degenerate, not classical.
- **Bridge [P30]:** "Maxwell-Boltzmann is valid when average occupation << 1 (i.e., many more states than particles). For electrons in metals, states are densely packed — the Fermi temperature T_F = E_F/k_B ~ 80,000 K for copper. At T = 300 K << T_F, the quantum effect (Pauli exclusion) dominates. Use Maxwell-Boltzmann only when T >> T_F."
- **Replacement [P31]:** The Fermi-Dirac distribution is required for electrons in metals at all reasonable temperatures (T << T_F ≈ tens of thousands of K). Maxwell-Boltzmann applies only for T >> T_F — i.e., at temperatures where the metal would be vaporized.
- **Discrimination pairs [P33]:** A dilute gas of He atoms at room temperature is classical (T >> T_F because T_F is millikelvin for He at atmospheric density). Electrons in Cu are highly quantum (T_F ≈ 80,000 K >> 300 K).
- **S6 repair path:** Compute T_F for copper: E_F = 7 eV → T_F = 7 eV / (8.62×10⁻⁵ eV/K) ≈ 81,000 K. Room temperature is 300/81,000 ≈ 0.4% of T_F. The system is almost as quantum as it would be at T = 0.

### MC-2: "f(E_F) = 1 at T = 0"
- **Probe:** "What is f(E) for E slightly above E_F at T = 0? For E slightly below E_F?"
- **Characteristic phrase:** "f(E_F) = 1 because E_F is the highest occupied state."
- **Trigger:** E_F is often called "the highest occupied energy level," leading students to think f(E_F) = 1 for all T.
- **Conflict evidence [P28]:** At T = 0: f(E) = 1 for E < E_F and f(E) = 0 for E > E_F. At T = 0, f(E_F) is undefined (the step function has a discontinuity there). At any finite T: f(E_F) = 1/(e^0 + 1) = 1/2 — always exactly ½ at E = μ.
- **Bridge [P30]:** "The Fermi-Dirac distribution at E = μ gives f = 1/2 regardless of temperature. At T = 0, the step function has a discontinuity exactly at E_F = μ. The general statement is: f(μ) = 1/2 for all T > 0. As T → 0, the distribution sharpens into a step function with f = 1 below μ and f = 0 above μ."
- **Replacement [P31]:** f(μ) = 1/2 for all T > 0. At T = 0, f is a step function: f = 1 for E < E_F, f = 0 for E > E_F. E_F is the T = 0 chemical potential.
- **Discrimination pairs [P33]:** At T = 0: "fully occupied" means f = 1 for all states below E_F. At T > 0: the highest occupied states have f < 1 and some states above E_F have f > 0. f(E_F) = 1/2 is a clean symmetry point.
- **S6 repair path:** Plot f(E) vs. E for T = 0 and T > 0. Label f(E_F) = 1/2 at T > 0. Show how the step sharpens as T → 0, with f(E_F) remaining 1/2 throughout.

### MC-3: "Electronic heat capacity of metals should be C_V = 3/2 Nk_B per electron (classical prediction)"
- **Probe:** "A metal has N free electrons. What is the classical prediction for the electronic heat capacity? What does Fermi-Dirac statistics give?"
- **Characteristic phrase:** "Each electron contributes 3/2 k_B to heat capacity (equipartition)."
- **Trigger:** Classical equipartition theorem: each degree of freedom contributes k_B/2 per particle. Three translational degrees of freedom → 3/2 k_B per particle.
- **Conflict evidence [P28]:** Classical: C_V^(electronic) = 3/2 Nk_B. Measured for metals: C_V^(electronic) is about 100× smaller at room temperature. Fermi-Dirac prediction: C_V = (π²/2)Nk_B(k_BT/E_F) ≈ (π²/2) × 0.004 × Nk_B ≈ 0.02 Nk_B for copper at 300 K — about 75× smaller than classical. The Fermi-Dirac result matches experiment; the classical result fails dramatically.
- **Bridge [P30]:** "Only electrons within ~k_BT of E_F can be thermally excited (there are empty states just above E_F for them to jump to). All electrons deep below E_F have no empty states to jump to (Pauli exclusion) and cannot absorb thermal energy. The fraction of active electrons is ~k_BT/E_F << 1. Hence C_V is proportional to (k_BT/E_F) × Nk_B — much smaller than classical."
- **Replacement [P31]:** Electronic heat capacity: C_V = (π²/2)(k_BT/E_F)Nk_B << 3/2 Nk_B. Only the electrons near E_F contribute. This is one of the early triumphs of Fermi-Dirac statistics (Sommerfeld, 1927).
- **Discrimination pairs [P33]:** Classical gas (low n, high T): all molecules contribute to C_V → 3/2 Nk_B. Electron gas in metal (high n, T << T_F): only electrons near E_F contribute → C_V << 3/2 Nk_B.
- **S6 repair path:** Compute (k_BT/E_F) for copper at 300 K: 0.026/7 ≈ 0.004. C_V^(FD) ≈ (π²/2) × 0.004 Nk_B ≈ 0.02 Nk_B. Compare to 1.5 Nk_B classical. Show the experimental value (linear C_V vs. T at low T in metals) matches the Fermi-Dirac prediction.

### MC-4: "Fermi energy is the energy of the most energetic electron in the system"
- **Probe:** "Is the Fermi energy always equal to the energy of the fastest electron in the system?"
- **Characteristic phrase:** "E_F is the maximum electron energy."
- **Trigger:** At T = 0, E_F is the top of the filled states — the most energetic occupied state. Students generalize this to all temperatures and all fermion systems.
- **Conflict evidence [P28]:** At T > 0, some electrons are thermally excited above E_F. The "maximum electron energy" is no longer E_F — it's the energy of the tail of the Fermi-Dirac distribution (which extends to infinity in principle). E_F is the chemical potential μ at T = 0, but at T > 0, it is μ (the chemical potential), which depends on T. In semiconductors, E_F may lie in the band gap — no electrons have that energy, yet E_F is still well-defined.
- **Bridge [P30]:** "E_F is the chemical potential of the electron gas at T = 0. It is defined by N = ∫₀^{E_F} g(E) dE — the energy at which all states are filled when T = 0. At T > 0, the chemical potential μ ≈ E_F (for metals) and f(E_F) = 1/2. But some electrons have E > E_F at finite T."
- **Replacement [P31]:** E_F = μ at T = 0, defined so that N = ∫₀^{E_F} g(E) dE. At T > 0, μ ≈ E_F (metals), f(E_F) = 1/2. The "maximum electron energy" (highest occupied state) is above E_F at T > 0.
- **Discrimination pairs [P33]:** The median income in a country (like E_F, 50% above and 50% below) is not the maximum income. The maximum income can be much higher. E_F is the "median energy" (f = 1/2 there), not the maximum.
- **S6 repair path:** Plot the Fermi-Dirac distribution at T = 1000 K for copper. Show f(E) > 0 for energies above E_F = 7 eV (thermally excited electrons). These electrons have E > E_F — the Fermi energy is not the maximum electron energy at finite T.

---

## 5. Explanation Library

**Explanation A — Why the Pauli principle forces high energy states (narrative):**
"Put 10²³ electrons in a box. Without the Pauli exclusion principle, all electrons would crowd into the lowest energy state (as bosons do). But electrons are fermions — at most one per quantum state. So they must fill states one by one from the bottom. The ground state gets one, the next state gets one, and so on, all the way up to the Fermi energy E_F. Even at absolute zero, the top electron has energy E_F ~ 7 eV (for copper) — much larger than k_BT at room temperature (0.026 eV). The electron gas is highly compressed in energy — this quantum pressure is what prevents white dwarfs from collapsing."

**Explanation B — Deriving f(E) from the grand partition function (formal):**
"A single quantum state at energy E can hold at most one fermion (Pauli). The state is either empty (occupation n = 0, energy 0, particle number 0) or occupied (n = 1, energy E, particle number 1). Grand partition function for this state: z = 1 + e^(−β(E−μ)). Mean occupation: ⟨n⟩ = (0 × 1 + 1 × e^(−β(E−μ)))/z = e^(−β(E−μ))/(1 + e^(−β(E−μ)}) = 1/(e^(β(E−μ)) + 1) ≡ f(E). This is the Fermi-Dirac distribution. The +1 in the denominator comes from the restriction n ≤ 1 (Pauli exclusion)."

**Explanation C — Fermi energy and degeneracy pressure (applied):**
"At T = 0, N electrons fill all states up to E_F. Total energy: U₀ = ∫₀^{E_F} E g(E) dE = (3/5)N E_F. This zero-point energy is purely quantum (would be zero classically). Degeneracy pressure: P = −∂U₀/∂V = (2/3)(U₀/V) = (2/5)n E_F. For white dwarf stars (n ~ 10³⁶ m⁻³, m = electron mass): E_F ~ 0.2 MeV, P ~ 10²² Pa — vastly larger than the thermal pressure. This quantum pressure supports white dwarfs."

---

## 6. Analogy Library

**Primary analogy — The parking garage:**
A parking garage has fixed spaces (quantum states). Fermions are cars: one car per space (Pauli). At T = 0, all spaces from ground floor to E_F are full; above E_F is empty. At room temperature, a few cars on the topmost floors (near E_F) can move to the next-higher empty floor — but cars deep in the garage are blocked by other cars above them and cannot move. Only the cars on the top floor (~k_BT "height" range) are mobile. This explains why electronic heat capacity is small: only a fraction k_BT/E_F of electrons are free to absorb thermal energy.

**Breaking point:** Cars in a garage can be rearranged by the driver's will; fermions fill energy states according to quantum statistics. Also, in a parking garage, all cars are accessible from the outside; in a metal, the "parking garage" is inside the crystal and electrons don't escape unless given enough energy to exceed the work function (photoelectric effect).

**Anti-analogy:** Do NOT say "Fermi-Dirac is just like Maxwell-Boltzmann but with a cutoff at E_F." The Fermi-Dirac distribution has a smooth sigmoid shape at finite T — it's not a sharp cutoff. The smoothing region has width ~k_BT. At T = 0 it's a step function, but at any finite T, the tail extends above E_F.

---

## 7. Demonstration Library

**Demo 1 — Fermi-Dirac distribution plot:**
Plot f(E) vs. E for T = 0, 300 K, 3000 K, 30,000 K with E_F = 7 eV (copper). Show:
- T = 0: perfect step function.
- 300 K: nearly indistinguishable from T = 0 (k_BT = 0.026 eV << 7 eV).
- 3000 K: slightly smeared around E_F.
- 30,000 K: significantly smeared (k_BT ≈ 2.6 eV ~ E_F/3) — but Cu melts at 1357 K; this temperature is unphysical for copper.

**Demo 2 — Fermi energy calculation:**
Copper: n = N/V = 8.5 × 10²⁸ m⁻³ (one free electron per Cu atom).
E_F = (ℏ²/2m)(3π²n)^(2/3) = (1.055×10⁻³⁴)²/(2×9.11×10⁻³¹) × (3π² × 8.5×10²⁸)^(2/3).
Compute: (3π² × 8.5×10²⁸)^(2/3) ≈ (2.52×10³⁰)^(2/3) ≈ 1.84×10²⁰ m⁻².
E_F ≈ 6.08×10⁻³⁹ / (1.82×10⁻³⁰) × 1.84×10²⁰ ≈ 1.13×10⁻¹⁸ J ≈ 7.04 eV. ✓

**Demo 3 — Sommerfeld electronic heat capacity:**
Classical prediction: C_V = (3/2)Nk_B per electron.
Fermi-Dirac: C_V = (π²/2)(k_BT/E_F)Nk_B = (π²/2)(0.026/7) Nk_B ≈ 0.018 Nk_B.
Classical/Fermi-Dirac ratio ≈ 1.5/0.018 ≈ 83. The Fermi-Dirac prediction is ~80× smaller.
Experimental C_V for copper at 4 K: measured γ (linear coefficient in C_V = γT) gives γ = 0.695 mJ/mol/K². Sommerfeld model predicts γ_theor = π²k_B²/2E_F × N_A ≈ 0.503 mJ/mol/K². Agreement to within a factor of 1.4 (remaining discrepancy: electron effective mass m* ≈ 1.38m_e due to band structure).

---

## 8. Discovery Lesson

**Opening (5 min):** "A metal contains ~ 10²⁸ free electrons per cubic meter. Classical theory predicts these electrons should contribute 3/2 Nk_B to the heat capacity — but measurements show an electronic heat capacity 100× smaller. For 50 years, nobody knew why. Today you'll see the answer."

**Guided inquiry (20 min):**
- Step 1: Students review Maxwell-Boltzmann: average energy per particle = 3/2 k_BT. This gives C_V = 3/2 Nk_B — the classical result.
- Step 2: Students derive f(E) for a single fermion state (Explanation B, grand partition function). Verify f(μ) = 1/2.
- Step 3: Students plot f(E) at T = 300 K for E_F = 7 eV. Observation: the distribution barely changes from T = 0 over the entire accessible energy range.
- Step 4: "Which electrons can absorb thermal energy?" — Only those within ~k_BT = 0.026 eV of E_F. Fraction: ~k_BT/E_F ≈ 0.4% of all electrons.
- Step 5: Estimate C_V: only 0.4% of electrons are active, each contributing ~k_B. C_V ≈ 0.004 Nk_B × (some numerical factor). Compare to Demo 3 (Sommerfeld formula gives 0.018 Nk_B — same order of magnitude).

**Synthesis (10 min):**
- State Fermi energy formula E_F = (ℏ²/2m)(3π²n)^(2/3) and its derivation from N = ∫₀^{E_F} g(E) dE.
- State: T_F = E_F/k_B for Cu ≈ 80,000 K >> 300 K → deeply degenerate regime.
- Applications: conductors, semiconductors, white dwarfs.

**Closure:** "Fermi-Dirac statistics solved one of the major puzzles of solid-state physics: why metals have tiny electronic heat capacities. The answer is Pauli exclusion: most electrons can't move because all nearby states are occupied. This is quantum mechanics protecting itself from classical equipartition."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [DERIVE]:** Explanation B (grand partition function derivation of f(E)). This is the foundation — students see where the +1 comes from and why it enforces Pauli exclusion.

**TA-2 [CALCULATE]:** Demo 2 (Fermi energy for copper). Demo 3 (electronic heat capacity comparison: classical vs. Fermi-Dirac vs. experiment).

**TA-3 [PROBE]:** MC-1 probe ("Can I use Maxwell-Boltzmann for electrons in copper?") — quantify the failure by computing T_F. MC-3 probe ("What is the classical prediction for electronic heat capacity?") — show the 80× discrepancy and resolve with the "only k_BT/E_F fraction is active" argument.

**TA-4 [TRANSFER]:** Apply to: (a) semiconductors — Fermi level in band gap, conductivity ∝ e^(−E_g/2k_BT). (b) White dwarf degeneracy pressure. (c) Pauli paramagnetism — only electrons near E_F can flip spin → magnetic susceptibility ∝ D(E_F) × μ_B² (much smaller than classical Curie paramagnetism).

---

## 10. Voice Teaching

**Opening:**
"By 1920, physicists knew metals conducted electricity because electrons were free to move. They tried to compute the heat capacity of metals using classical statistics. Every classical calculation gave C_V = 3/2 Nk_B per free electron — an enormous contribution. But experiments showed the electronic heat capacity of metals was about 100 times smaller. Nobody could explain why. Then in 1927, Arnold Sommerfeld applied Fermi-Dirac statistics — just introduced by Fermi and Dirac — and the mystery dissolved. The answer was Pauli exclusion."

**At the distribution derivation:**
"Each quantum state can hold 0 or 1 electron — that's Pauli exclusion. So for each state at energy E, the grand partition function is just two terms: empty (weight 1) and occupied (weight e^(−β(E−μ))). The mean occupation is: occupied weight / total weight = e^(−β(E−μ))/(1 + e^(−β(E−μ)}) = 1/(e^(β(E−μ)) + 1). That's it. That's the Fermi-Dirac distribution. The +1 in the denominator comes from counting only two occupancy states: 0 and 1. If electrons could pile up without restriction (bosons), the denominator would have a −1 — we'll see that with Bose-Einstein statistics."

**At the heat capacity resolution:**
"At T = 300 K, k_BT ≈ 0.026 eV. E_F ≈ 7 eV for copper. Think about what this means: thermal energy k_BT is only 0.4% of E_F. Which electrons can absorb this thermal energy? An electron at energy E can jump to energy E + k_BT only if that state is empty. But below E_F, all states are occupied. An electron 1 eV below E_F cannot jump up 0.026 eV — the nearby state is already full. Only electrons within ~k_BT of E_F have access to empty states just above them. That's 0.4% of all electrons. So only 0.4% contribute to the heat capacity. C_V ≈ 0.004 × (3/2 Nk_B) — about 80× smaller than classical. That's why electronic heat capacity of metals is small."

---

## 11. Assessment

**Mastery gate:** Student derives f(E) from the grand partition function, correctly evaluates f(E) at T = 0 and finite T, correctly computes E_F and electronic C_V using the Sommerfeld model, and correctly identifies the physical reason for the small electronic heat capacity. Score ≥ 80%.

**FA-1 — f(E) at key points:**
*Q: For an electron gas with μ = 5 eV at T = 1000 K (k_BT ≈ 0.086 eV), compute f(E) at E = 5 eV, E = 5.5 eV, E = 4.5 eV.*
Expected: f(5 eV) = 1/2 (E = μ). f(5.5 eV) = 1/(e^(0.5/0.086) + 1) = 1/(e^{5.8} + 1) ≈ 1/(330 + 1) ≈ 0.003. f(4.5 eV) = 1/(e^{−5.8} + 1) ≈ 1/(0.003 + 1) ≈ 0.997.
Threshold: f(μ) = 1/2; correct computation at ±0.5 eV; correct observation that f quickly approaches 0 above μ and 1 below μ.

**FA-2 — Fermi energy calculation:**
*Q: An electron gas has number density n = 6.0 × 10²⁸ m⁻³. Calculate E_F in eV. (ℏ = 1.055×10⁻³⁴ J·s, m = 9.11×10⁻³¹ kg)*
Expected: E_F = (ℏ²/2m)(3π²n)^(2/3). (3π²×6×10²⁸)^(2/3) ≈ (1.78×10³⁰)^(2/3) ≈ 1.48×10²⁰ m⁻². E_F ≈ (1.055×10⁻³⁴)²/(2×9.11×10⁻³¹) × 1.48×10²⁰ ≈ 8.9×10⁻¹⁹ J ≈ 5.6 eV.
Threshold: Correct formula application and result within ±0.3 eV.

**FA-3 — Electronic heat capacity:**
*Q: For the electron gas in FA-2 (E_F = 5.6 eV), compare the Sommerfeld electronic heat capacity at T = 300 K to the classical prediction (per electron, in units of k_B).*
Expected: Classical: 3/2 k_B. Fermi-Dirac: (π²/2)(k_BT/E_F)k_B = (π²/2)(0.026/5.6)k_B ≈ 0.023k_B. Ratio: 1.5/0.023 ≈ 65 — the Fermi-Dirac prediction is ~65× smaller.
Threshold: Correct Sommerfeld formula, correct ratio.

**FA-4 — Physical explanation:**
*Q: Explain in 3 sentences why the electronic heat capacity of a metal is much smaller than the classical equipartition value.*
Expected: (1) At T = 300 K, k_BT ≈ 0.026 eV << E_F ≈ 7 eV for typical metals. (2) Only electrons within ~k_BT of E_F have access to unoccupied states just above them (Pauli exclusion prevents electrons deeper in the Fermi sea from absorbing thermal energy — all states above them are occupied). (3) This "active fraction" is ~k_BT/E_F ≈ 0.4% of all electrons, reducing C_V by the same factor relative to the classical value.
Threshold: Must correctly invoke Pauli exclusion and the fraction k_BT/E_F.

**Confidence calibration:** After FA-3, students who compute the wrong ratio (e.g., compute C_V for the whole gas and compare to 3Nk_B/2 rather than per-electron quantities) receive targeted feedback on unit consistency.

**Delayed retrieval (session + 3):** "State the Fermi-Dirac distribution. What is f(E_F) at any T > 0? Why is the electronic heat capacity much smaller than 3/2 Nk_B for metals?"

---

## 12. Recovery Notes

**S0:** Student needs phys.stat.partition-function — the Fermi-Dirac distribution is derived from the grand partition function for a single state. Without knowing what a partition function is and how to compute mean occupation from it, the derivation is unmotivated.

**S3:** Student can state f(E) but cannot derive it or compute E_F. Run the single-state grand partition function derivation (Explanation B) step by step. Then compute E_F for copper using Demo 2.

**S6:** Student uses Maxwell-Boltzmann for electron calculations. Run MC-1 repair: compute T_F for copper (80,000 K). Since T << T_F, the system is deeply quantum — Maxwell-Boltzmann fails by orders of magnitude.

**S9:** Introduce the density of states g(E) for a 3D free electron gas: g(E) = (V/2π²)(2m/ℏ²)^(3/2) √E. Show that N = ∫₀^{E_F} g(E) dE gives the Fermi energy formula. Introduce the concept of effective mass m*: in a crystal, g(E) has the same form but with m* replacing m — accounts for band structure effects and explains the discrepancy between calculated and measured γ.

---

## 13. Memory & Review

**Memory type:** Procedural (f(E) formula, E_F formula, Sommerfeld C_V formula) + conceptual (Pauli exclusion → step function at T=0, small C_V, degeneracy pressure).

**Spaced retrieval schedule:**
- Session + 1: "Write the Fermi-Dirac distribution. What is f(E_F)? What is f(E) at T=0 for E < E_F and E > E_F?"
- Session + 3: "Why is the electronic heat capacity of metals ~100× smaller than the classical prediction? Give the Sommerfeld formula."
- Session + 7: "An electron gas has E_F = 4 eV. At T = 500 K, what fraction of electrons have energy within k_BT of E_F?"

**Interleaving partners:** phys.stat.partition-function (prerequisite — grand partition function derivation); phys.stat.bose-einstein (counterpart — bosons, no Pauli exclusion, −1 in denominator instead of +1); phys.stat.entropy-statistical (counterpart — Ω counting with Pauli constraints gives Fermi-Dirac).

---

## 14. Transfer Map

**Near transfer:** Semiconductors: p-n junction, transistors, band gap engineering — all rely on Fermi-Dirac statistics with μ in the band gap. n-type vs. p-type doping shifts μ toward conduction or valence band.

**Far transfer:** Neutron stars: neutron degeneracy pressure (same Fermi-Dirac statistics, but for neutrons with m_n >> m_e → much higher density needed to reach degeneracy). The Tolman-Oppenheimer-Volkoff limit: maximum neutron star mass ~3 M_sun before collapse to a black hole.

**Structural abstraction:** "Exclusion principle → filling from the bottom up → quantum zero-point energy and pressure." This structure appears in nuclear shell model (nucleons fill nuclear energy levels → magic numbers), atomic structure (electrons fill atomic orbitals → Aufbau principle, Hund's rules), and astrophysics (white dwarfs, neutron stars). The physical principle is the same in all cases.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** phys.stat.partition-function is necessary. phys.stat.entropy-statistical (counting microstates with Pauli constraints) provides conceptual grounding for why Ω is counted differently for fermions. Both should be covered before this concept.
- **Unlock readiness:** No formal unlocks listed, but this concept is prerequisite for any discussion of solid-state physics, semiconductors, and astrophysical degeneracy. It is a natural prerequisite for quantum mechanics-based chemistry and device physics.
- **Difficulty calibration:** Expert/apply is appropriate. The derivation of f(E) is accessible (simple grand partition function), but the calculation of E_F and C_V requires integration of g(E) and use of density-of-states concepts that are new at this level.
- **Suggested problem set:** (1) Derive f(E) from the grand partition function for fermions. (2) Compute E_F for aluminum (n = 1.81 × 10²⁹ m⁻³, 3 free electrons per atom). (3) Compare Sommerfeld C_V to classical C_V for Al at 300 K and 77 K. (4) Show that for E − μ >> k_BT, f(E) → e^(−(E−μ)/k_BT) (Maxwell-Boltzmann limit). (5) Estimate the degeneracy pressure of a white dwarf electron gas (n ~ 10³⁶ m⁻³, electrons relativistic — note this requires relativistic generalization).

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

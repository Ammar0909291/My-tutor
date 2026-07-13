# Teaching Blueprint: Helmholtz and Gibbs Free Energy

## 0. Concept Metadata
- **Concept ID**: phys.stat.free-energy
- **Name**: Helmholtz and Gibbs Free Energy
- **Domain**: Statistical Mechanics / Thermodynamics
- **Difficulty**: expert
- **Bloom Level**: apply
- **Estimated Hours**: 8
- **Prerequisites**: phys.stat.partition-function
- **Unlocks**: (none — leaf node)
- **Description**: Helmholtz free energy F = U − TS and Gibbs free energy G = H − TS are thermodynamic potentials that determine equilibrium under different constraints.

---

## 1. Concept Spine

### Core Idea
Free energy is the amount of work a thermodynamic system can do beyond what it must give to the environment as heat. Two forms exist: Helmholtz free energy F = U − TS (relevant at constant T, V) and Gibbs free energy G = H − TS = U + PV − TS (relevant at constant T, P). Systems at constant T minimize F (or G), not energy U alone. A process is spontaneous if ΔF < 0 (constant T, V) or ΔG < 0 (constant T, P).

### Conceptual Ladder
1. **Recall**: Entropy S = k_B ln Ω from statistical mechanics; partition function Z = Σe^(−βEᵢ); F = −k_BT ln Z.
2. **Understand**: Why equilibrium is not simply minimum U — entropy also drives systems toward disordered states. Free energy balances the two: F = U − TS.
3. **Apply**: Derive thermodynamic properties from F: P = −(∂F/∂V)_T, S = −(∂F/∂T)_V, U = F + TS.
4. **Extend**: Use Gibbs free energy G for phase equilibria, chemical equilibria, electrochemistry.

### Key Formula Set
- **Helmholtz free energy**: F = U − TS
  - From partition function: F = −k_BT ln Z
  - Differential: dF = −SdT − PdV (natural variables T, V)
  - Derivatives: S = −(∂F/∂T)_V, P = −(∂F/∂V)_T, U = F + TS = F − T(∂F/∂T)_V
- **Gibbs free energy**: G = H − TS = U + PV − TS = F + PV
  - Differential: dG = −SdT + VdP (natural variables T, P)
  - Derivatives: S = −(∂G/∂T)_P, V = (∂G/∂P)_T
  - Chemical potential: μ = (∂G/∂N)_{T,P} — G per particle at constant T, P
- **Spontaneity criteria**:
  - Constant T, V: ΔF ≤ 0 (spontaneous); ΔF = 0 (equilibrium)
  - Constant T, P: ΔG ≤ 0 (spontaneous); ΔG = 0 (equilibrium)
- **Phase equilibrium**: G_liquid = G_gas at phase boundary (coexistence)
- **Maxwell relation** (from dF): (∂S/∂V)_T = (∂P/∂T)_V

### Canonical Example
**Ideal gas Helmholtz free energy**:
Z = (V/λ³)^N/N! where λ = h/√(2πmk_BT) is the thermal de Broglie wavelength.
F = −k_BT ln Z = −Nk_BT [ln(V/Nλ³) + 1]
Then: P = −(∂F/∂V)_T = Nk_BT/V ✓ (ideal gas law recovered)
S = −(∂F/∂T)_V = Nk_B[ln(V/Nλ³) + 5/2] (Sackur-Tetrode equation)
U = F + TS = (3/2)Nk_BT ✓

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Physical Experience)
Imagine trying to inflate a balloon in a room. You must do two kinds of work: (1) push air into the balloon against atmospheric pressure (useful work), and (2) create the elastic tension of the balloon skin (stored energy). But the environment also "helps" if the temperature is high — thermal fluctuations assist in disordering the arrangement. Free energy = (energy available) − (energy the environment claims as heat). What's left is what you can actually use.

A charged battery has Gibbs free energy stored in its chemical potential difference — that free energy drives electrons through your circuit. When the battery is dead, ΔG = 0 — no more free energy available to do electrical work even though the battery still has internal energy (just disordered heat).

### Representational (Diagrams and Symbols)
- **Thermodynamic square**: A mnemonic for Maxwell relations. Corners: U, H, F, G. Sides label natural variables; arrows give signs. Students read off dF = −SdT − PdV directly.
- **F vs. T plot**: As T increases, F = U − TS decreases if ΔS > 0. Show that the solid→liquid transition occurs where ΔF_solid→liquid = 0 (i.e., where F_liquid = F_solid).
- **G landscape**: Gibbs free energy as a landscape in composition or reaction coordinate; the equilibrium state is the minimum of G.
- **Phase diagram connection**: On a P-T diagram, each phase boundary is where G₁ = G₂.

### Abstract (Equation Manipulation)
Students must practice:
1. Starting from F = −k_BT ln Z, derive P, S, U from derivatives.
2. Starting from dG = −SdT + VdP, derive Clausius-Clapeyron: dP/dT = ΔS/ΔV = L/TΔV (slope of phase boundary).
3. Maxwell relation: (∂S/∂V)_T = (∂P/∂T)_V — use to find entropy change of a non-ideal gas.
4. Chemical potential μ = (∂G/∂N)_{T,P}: use to find equilibrium condition for two phases or a reaction.

### Transfer (Novel Contexts)
- **Chemical equilibrium**: ΔG = ΔG° + RT ln Q; at equilibrium, ΔG = 0 → ΔG° = −RT ln K (equilibrium constant).
- **Electrochemistry**: ΔG = −nFE (cell voltage); spontaneous reaction has ΔG < 0 → E > 0.
- **Protein folding**: ΔG_fold = ΔH_fold − TΔS_fold; the "hydrophobic effect" is an entropy-driven contribution to protein stability.
- **Semiconductor devices**: Fermi level μ in a semiconductor is the Gibbs free energy per electron — band engineering is free-energy engineering.

---

## 3. Why Beginners Fail

### Failure Mode 1: Thinking equilibrium = minimum energy
Students from mechanics expect equilibrium at minimum potential energy. In thermodynamics, the entropy term TS opposes this: a disordered high-S state can be favored even if its energy U is higher, if T is high enough. Equilibrium is minimum F (or G), not minimum U.

### Failure Mode 2: Confusing F and G, and their conditions of validity
F is relevant at constant T and V. G is relevant at constant T and P. Students apply G to a rigid container (constant V) — wrong. The natural variables must match the physical constraints.

### Failure Mode 3: Sign convention for spontaneity
ΔG < 0 means spontaneous (G decreases). Students sometimes think "negative G means bad" because they associated negative with something missing. Drill: ΔG < 0 = spontaneous = the system would proceed without external help.

### Failure Mode 4: Forgetting that F = −k_BT ln Z
This direct link between statistical mechanics (Z) and thermodynamics (F) is the bridge concept of statistical thermodynamics. Students who haven't internalized it cannot use the partition function to derive any thermodynamic property.

---

## 4. Misconception Library

### MC-1: "Systems always evolve to minimize energy"
- **Probe**: "At 100°C, water evaporates spontaneously, yet water vapor has higher energy than liquid water (ΔH_vap > 0). How is this possible?"
- **Characteristic phrase**: "Systems go to lower energy — so the liquid should be favored."
- **Trigger**: Newtonian/mechanical intuition about potential energy minimization.
- **Conflict evidence**: At 100°C and 1 atm, ΔG_vap = ΔH_vap − TΔS_vap = 0 — exactly at equilibrium. Above 100°C, TΔS_vap > ΔH_vap → ΔG_vap < 0 → evaporation spontaneous. Entropy drives the transition despite energy cost.
- **Bridge**: Two competing effects: energy (wants low U) and entropy (wants high S, i.e., high disorder). Free energy F = U − TS is their trade-off. At high T, entropy wins.
- **Replacement**: Equilibrium = minimum free energy (F or G), not minimum U. Entropy can drive endothermic processes spontaneous at high temperature.
- **Discrimination pairs**: "ΔG < 0 → spontaneous (combines ΔH and ΔS)" ✓ vs. "ΔH < 0 → spontaneous (energy only)" ✗
- **S6 repair path**: Compute ΔG = ΔH − TΔS for water evaporation at T = 80°C, 100°C, 120°C. Show sign change at 100°C.

### MC-2: "Helmholtz free energy F is the maximum work the system can do"
- **Probe**: "What does 'free energy' mean — is it the total energy that's free for use?"
- **Characteristic phrase**: "Free energy is the energy available to do work."
- **Trigger**: The name "free energy" suggests it's freely available energy.
- **Conflict evidence**: At constant T, V: ΔF = ΔU − TΔS = −W_max (maximum work done BY the system, not including PdV boundary work). So F is the maximum non-expansion work available. At constant T, P: G is the maximum non-PdV work.
- **Bridge**: "Free" means "available to do useful work above the minimum heat exchanged with the environment." The environment takes its TΔS_env share; the rest is free.
- **Replacement**: F = maximum total work at constant T, V. G = maximum non-PdV work at constant T, P. Both are the extractable useful work, not the total internal energy.
- **Discrimination pairs**: "F = maximum work at constant T,V" ✓ vs. "F = total available energy" ✗
- **S6 repair path**: Work through a Carnot cycle: W_max = Q_H(1 − T_C/T_H) = Q_H − T_C·ΔS. Connect to ΔF = ΔU − T_C·ΔS = −W_max.

### MC-3: "The partition function Z and free energy F are unrelated"
- **Probe**: "How do you get pressure from the partition function?"
- **Characteristic phrase**: "I use the equations of state separately; Z is just for entropy."
- **Trigger**: Students learned Z for entropy/heat capacity calculations and never saw the F = −k_BT ln Z bridge.
- **Conflict evidence**: F = −k_BT ln Z; P = −(∂F/∂V)_T = k_BT(∂ ln Z/∂V)_T. All thermodynamic properties (S, U, P, CV) follow from a single derivative of ln Z.
- **Bridge**: F is the "thermodynamic generating function" — all macroscopic properties are encoded as derivatives of F, just as the Lagrangian generates equations of motion in mechanics.
- **Replacement**: F = −k_BT ln Z is the master link: once you have Z, you have everything. Every thermodynamic property is a derivative of F (or equivalently, of ln Z).
- **Discrimination pairs**: "F = −k_BT ln Z → all properties from derivatives" ✓ vs. "Z for entropy only; use separate equations for P, U" ✗
- **S6 repair path**: Derive P = Nk_BT/V for ideal gas from F = −k_BT ln Z step by step.

### MC-4: "ΔG < 0 means the reaction proceeds to completion"
- **Probe**: "If ΔG° = −20 kJ/mol for a reaction, will it go to completion?"
- **Characteristic phrase**: "Negative ΔG means the reaction goes all the way to products."
- **Trigger**: Confusing standard Gibbs energy ΔG° with the actual ΔG during the reaction.
- **Conflict evidence**: ΔG = ΔG° + RT ln Q. As the reaction proceeds, Q increases → ΔG increases. Equilibrium is reached when ΔG = 0 (not when all reactants are consumed). The equilibrium constant K = exp(−ΔG°/RT); for ΔG° = −20 kJ/mol at 298K, K ≈ 3300 — favors products, but small amounts of reactants remain.
- **Bridge**: ΔG = 0 is the equilibrium condition; ΔG° determines how far the equilibrium lies toward products, not whether the reaction goes to completion.
- **Replacement**: ΔG < 0 means spontaneous in the forward direction at current conditions; equilibrium is reached at ΔG = 0. ΔG° < 0 means equilibrium favors products (K > 1) but doesn't mean 100% conversion.
- **Discrimination pairs**: "ΔG = 0 at equilibrium; ΔG° determines K" ✓ vs. "ΔG° < 0 → complete conversion" ✗
- **S6 repair path**: Calculate K for ΔG° = −5, −10, −20, −50 kJ/mol. Show even −20 kJ/mol gives K = 3300 (not infinite).

---

## 5. Explanation Library

### Explanation A — Statistical derivation (for rigorous learners)
In a canonical ensemble (constant T, V, N), the equilibrium distribution is p_i = e^(−βEᵢ)/Z. The Helmholtz free energy F = −k_BT ln Z emerges from the statistical mechanics of this distribution: F = U − TS where U = Σpᵢ Eᵢ and S = −k_B Σpᵢ ln pᵢ (Gibbs entropy). Substituting pᵢ = e^(−βEᵢ)/Z: S = −k_B Σ(e^(−βEᵢ)/Z)(−βEᵢ − ln Z) = k_B(βU + ln Z) → TS = U + k_BT ln Z. Therefore F = U − TS = −k_BT ln Z. This derivation shows F is the natural thermodynamic potential for the canonical ensemble.

### Explanation B — Intuitive competition (for conceptual learners)
Imagine two competing "desires" in any thermodynamic system: (1) the system wants to lower its energy U (like a ball rolling downhill) and (2) the system wants to increase its entropy S (like gas expanding into empty space). These desires conflict. At low T, energy wins (ordered crystals form). At high T, entropy wins (gases form). The free energy F = U − TS is the referee: the system evolves to minimize F, which automatically balances these two tendencies. The coefficient of S is T — temperature decides how much the entropy term matters.

### Explanation C — Practical (for engineering learners)
Use G = H − TS for chemical and biological processes (constant T, P):
- If ΔH < 0 and ΔS > 0: always spontaneous (ΔG < 0 for all T).
- If ΔH > 0 and ΔS < 0: never spontaneous (ΔG > 0 for all T).
- If ΔH < 0 and ΔS < 0: spontaneous at low T (enthalpy dominated).
- If ΔH > 0 and ΔS > 0: spontaneous at high T (entropy dominated, like melting ice).

---

## 6. Analogy Library

### Primary Analogy
**Budget with a mandatory tax**: Your total budget is U (internal energy). But the government (environment at temperature T) takes a mandatory "entropy tax" = TΔS for any process you run. What's left — your "disposable income" — is the free energy F = U − TS. Equilibrium is when you can't reduce your tax burden any further by rearranging your budget.

### Breaking Point
Taxes are not fundamental physics — they don't grow with temperature in the physical way. The analogy breaks for processes where temperature changes (the "tax rate" changes). Also, taxes are paid to a government (external), while entropy increase is an internal accounting of disorder.

### Anti-Analogy
"Free energy = total internal energy available" — misleading. Not all internal energy is available for work; some must be paid to the environment as heat (TΔS_env). Free energy is only the extractable portion.

---

## 7. Demonstration Library

### Demo 1: Phase Transition via ΔG
Materials: Calculator, tabulated ΔH_vap and ΔS_vap for water.
ΔH_vap = 40.7 kJ/mol; ΔS_vap = 109 J/(mol·K).
Compute ΔG_vap = ΔH − TΔS at T = 90°C (363 K), 100°C (373 K), 110°C (383 K).
Students find ΔG > 0 at 90°C (condensation favored), ΔG = 0 at 100°C (equilibrium), ΔG < 0 at 110°C (evaporation favored). The boiling point emerges from ΔG = 0.

### Demo 2: Ideal Gas F from Z
Materials: Derivation on whiteboard.
Write Z for monatomic ideal gas: Z = (V/λ³)^N/N!. Take ln Z = N ln(V/Nλ³) + N.
F = −Nk_BT[ln(V/Nλ³) + 1]. Differentiate: P = −∂F/∂V = Nk_BT/V → PV = Nk_BT ✓.
Students see that the ideal gas law can be derived entirely from the partition function via F.

### Demo 3: Maxwell Relation Application
Materials: Derivation on whiteboard.
From dF = −SdT − PdV: (∂S/∂V)_T = (∂P/∂T)_V.
For a van der Waals gas: P = Nk_BT/(V−Nb) − aN²/V².
(∂P/∂T)_V = Nk_B/(V−Nb).
Therefore (∂S/∂V)_T = Nk_B/(V−Nb). Integrate to find entropy change when gas expands from V₁ to V₂ at constant T. No calorimetry needed — all from the equation of state!

---

## 8. Discovery Lesson

**Title**: "Why Does Ice Melt at 0°C and Not at −10°C?"

**Hook**: "Ice and water can coexist — but only at exactly 0°C and 1 atm. At −1°C, water freezes. At +1°C, ice melts. What makes 0°C the magic temperature?"

**Exploration**:
1. Write G = H − TS for solid (ice) and liquid (water) phases.
2. ΔG_melt = G_liq − G_ice = ΔH_melt − TΔS_melt.
3. ΔH_melt = 6.01 kJ/mol (heat absorbed melting ice). ΔS_melt = ΔH_melt/T_melt = 6010/273 = 22.0 J/(mol·K).
4. At T = 273 K: ΔG_melt = 6010 − 273 × 22.0 = 6010 − 6006 = 4 ≈ 0. Equilibrium!
5. At T = 263 K (−10°C): ΔG_melt = 6010 − 263 × 22.0 = 6010 − 5786 = 224 J/mol > 0. Melting not spontaneous → water freezes.
6. At T = 283 K (+10°C): ΔG_melt = 6010 − 283 × 22.0 = 6010 − 6226 = −216 J/mol < 0. Melting spontaneous → ice melts.

**Conclusion**: The phase transition temperature is exactly where ΔG = 0 — where the two free energies are equal. This is determined by ΔH and ΔS together, not by either alone.

---

## 9. Teaching Actions

**session_cap**: 7

1. **Motivation**: Present the energy-entropy competition. Ask: "If the environment is very hot (large T), which matters more for equilibrium — energy or entropy? Why?"
2. **Define F and G**: Write F = U − TS, G = H − TS. Identify natural variables. Conditions of validity.
3. **Derive from partition function**: F = −k_BT ln Z. Derive P and S from F for ideal gas.
4. **Maxwell relations**: From dF = −SdT − PdV, derive one Maxwell relation. Apply to find entropy from equation of state.
5. **Gibbs and spontaneity**: ΔG criteria for spontaneity at constant T, P. Classify 4 reaction types (ΔH, ΔS signs).
6. **Phase equilibrium**: At a phase boundary, G_1 = G_2 → derive Clausius-Clapeyron from dG.
7. **Chemical equilibrium**: ΔG = ΔG° + RT ln Q → at equilibrium ΔG = 0 → K = exp(−ΔG°/RT).

---

## 10. Voice Teaching

**Opening move**: "Energy alone doesn't determine which way a system goes. At high temperature, disorder wins. Free energy is what balances both — and it's what you minimize to find equilibrium."

**Core explanation**: "F = U − TS. Two terms pulling in opposite directions. High U is bad (energy wants to be low). High S is good (entropy wants to be high). Temperature T decides the trade-off. At low T, the U term wins. At high T, the TS term wins. Equilibrium is the minimum of F."

**Common error interception**: "When you apply ΔG for spontaneity, check your conditions: is T and P constant? That's Gibbs. Is T and V constant? That's Helmholtz. Wrong choice = wrong prediction."

**Checkpoint question**: "A reaction has ΔH = +10 kJ/mol and ΔS = +50 J/(mol·K). Is it spontaneous at 100°C? At 400°C?" (At 100°C: ΔG = 10000 − 373 × 50 = 10000 − 18650 = −8650 J < 0 ✓ spontaneous. At 400°C: even more so.)

**Closing move**: "Free energy is the master concept of chemical and biological thermodynamics. Every equilibrium — phase transitions, chemical reactions, protein folding, battery charging — is a free energy minimum. You now have the tool to quantify all of them."

---

## 11. Assessment

### Mastery Gate
Student can: (1) derive thermodynamic properties from F using partial derivatives, (2) state spontaneity criteria using ΔF and ΔG, (3) connect F to the partition function via F = −k_BT ln Z, (4) derive phase equilibrium conditions from G, (5) apply ΔG = ΔG° + RT ln Q.

### Formative Assessment 1 — Derivative chain
**Prompt**: "Given that for a monatomic ideal gas, F = −Nk_BT[ln(V/Nλ³) + 1], derive expressions for (a) pressure P and (b) entropy S."
**Expected answer**: P = −(∂F/∂V)_T = Nk_BT/V (ideal gas law). S = −(∂F/∂T)_V = Nk_B[ln(V/Nλ³) + 5/2] (Sackur-Tetrode). Student must perform the derivatives correctly, noting λ ∝ T^(−1/2) for the entropy derivative.
**Threshold**: Both derivatives correct.

### Formative Assessment 2 — Spontaneity classification
**Prompt**: "Classify the following reaction at T = 500 K: ΔH = −80 kJ/mol, ΔS = −120 J/(mol·K). Is it spontaneous? At what temperature does it become non-spontaneous?"
**Expected answer**: ΔG = −80000 − 500×(−120) = −80000 + 60000 = −20000 J/mol < 0 → spontaneous at 500 K. ΔG = 0 when T = ΔH/ΔS = −80000/−120 = 667 K. For T > 667 K, ΔG > 0 → not spontaneous.
**Threshold**: Correct ΔG and transition temperature.

### Formative Assessment 3 — Phase boundary
**Prompt**: "Using ΔG = 0 at phase equilibrium, derive the Clausius-Clapeyron equation dP/dT = L/TΔV for a first-order phase transition."
**Expected answer**: At coexistence, G₁ = G₂ → dG₁ = dG₂. Using dG = −SdT + VdP: (V₁−V₂)dP = (S₁−S₂)dT → dP/dT = ΔS/ΔV = L/TΔV (using ΔS = L/T at phase transition temperature T).
**Threshold**: Must use dG equation for both phases; arrive at L/(TΔV) correctly.

### Formative Assessment 4 — Chemical equilibrium
**Prompt**: "At 25°C, the standard Gibbs energy for A → B is ΔG° = −15 kJ/mol. Find the equilibrium constant K and state the ratio [B]/[A] at equilibrium."
**Expected answer**: K = exp(−ΔG°/RT) = exp(15000/(8.314 × 298)) = exp(6.053) ≈ 426. At equilibrium, [B]/[A] = K = 426 (approximately — assuming activity = concentration for ideal solution).
**Threshold**: K within a factor of 2 (acceptable given rounding of RT = 2.479 kJ/mol).

### Confidence Calibration
After FA1: "How confident are you (0–100%) that your entropy expression is correct? What's the quick check?" (Dimensionally: S should be in J/K; k_B × dimensionless = J/K ✓. Verify the sign: as T increases, λ decreases, ln(V/Nλ³) increases, S increases — physical ✓.)

### Delayed Retrieval
Two weeks later: Starting from F = −k_BT ln Z (without the specific Z for ideal gas), derive the general formula for the average energy ⟨E⟩ = −∂(ln Z)/∂β. Show it's consistent with U = F + TS using β = 1/k_BT.

---

## 12. Recovery Notes

### S0 — Block: "I don't understand why we minimize F, not U"
Run the thought experiment: two blocks at different temperatures in thermal contact (isolated system). Energy is conserved (constant U); entropy must increase. The entropy increase drives heat flow until equilibrium. Now add a heat bath (constant T): U can change via heat exchange; total entropy of universe must increase. This leads to minimizing F = U − TS_system (equivalent to maximizing entropy of universe). The F minimum is the condition for maximum total entropy at fixed T.

### S3 — Can define F but cannot derive properties from it
Drill the chain rule: given F(T,V), students practice computing P = −(∂F/∂V)_T and S = −(∂F/∂T)_V for a specific F. Use F = −Nk_BT ln(V/λ³) as a simple case. Step by step: hold T constant, differentiate with respect to V, negate. Hold V constant, differentiate with respect to T (careful: λ depends on T), negate.

### S6 — Confuses F and G conditions
Drill the matching: laboratory chemistry is typically constant T and P (open beaker, atmospheric pressure) → use G. A sealed rigid container at constant T → use F. Write the differential for each (dF = −SdT − PdV; dG = −SdT + VdP) and identify which variables are constant in each experiment.

### S9 — Cannot connect to real phenomena
List 5 familiar processes: (1) ice melts at 0°C — ΔG_melt = 0 at 273 K; (2) batteries die — ΔG of cell reaction → 0; (3) proteins fold — ΔG_fold < 0 in water at physiological T; (4) iron rusts — ΔG_oxidation < 0 in air; (5) gas expands into vacuum — ΔF < 0 (constant T, V). For each, identify which free energy applies and whether ΔF/ΔG is negative (spontaneous).

---

## 13. Memory and Review

### Memory Type
Conceptual (energy-entropy competition, free energy as the balance) + procedural (derivatives from F, spontaneity criteria, Clausius-Clapeyron) + structural (connection to partition function and statistical mechanics).

### Spaced Retrieval Schedule
- Day 1: Write F = U − TS and G = H − TS; state which applies at constant T,V vs. T,P.
- Day 3: Derive P and S from the ideal gas F expression.
- Day 7: Classify 4 reactions by ΔH and ΔS signs; predict spontaneity at low vs. high T.
- Day 14: Derive the Clausius-Clapeyron equation from G = G₁ at phase coexistence.
- Day 30: Given ΔG° for a reaction, compute K and predict equilibrium composition.

### Interleaving Partners
- phys.stat.partition-function (F = −k_BT ln Z bridge)
- phys.stat.entropy-statistical (S = k_B ln Ω → the TS term in F)
- phys.stat.boltzmann-factor (canonical distribution as the microscopic foundation)

---

## 14. Transfer Map

### Near Transfer
- Derive any thermodynamic property from F or G using partial derivatives.
- Apply spontaneity criteria ΔF ≤ 0 or ΔG ≤ 0 to classify processes.
- Derive phase boundaries using G₁ = G₂.

### Far Transfer
- **Chemistry**: ΔG = ΔG° + RT ln Q → equilibrium constants, Le Chatelier's principle.
- **Biophysics**: Free energy of protein folding, membrane formation, DNA hybridization — all governed by ΔG.
- **Electrochemistry**: ΔG = −nFE links thermodynamics to electrochemical cell voltage.
- **Materials science**: Phase diagram construction from G calculations (CALPHAD method).

### Structural Abstraction
Free energy is the thermodynamic generating function: all equilibrium properties derive from its derivatives with respect to natural variables. This structure — a potential function whose minimization gives equilibrium — appears universally: mechanical equilibrium minimizes potential energy, thermodynamic equilibrium minimizes free energy, quantum mechanical ground state minimizes expectation of Ĥ, and in field theory, the vacuum minimizes an effective potential. The mathematical form changes; the variational principle is universal.

---

## 15. Curriculum Feedback

### Prerequisite Adequacy
phys.stat.partition-function provides F = −k_BT ln Z, Z = Σe^(−βEᵢ), and ⟨E⟩ = −∂ ln Z/∂β. This is the exact foundation needed here. Students who completed the partition function blueprint can immediately use F = −k_BT ln Z to derive all thermodynamic properties. Prerequisite is necessary and sufficient.

### Unlock Readiness
This is a leaf node — it unlocks no further concepts in the physics KG. However, Helmholtz and Gibbs free energies are central tools for chemistry, biology, and materials science. Students completing this blueprint are equipped for cross-domain transfer.

### Suggested Flag
Consider explicitly connecting this blueprint to chemistry concepts (ΔG°, K, electrochemistry) even though those fall under a different subject domain. The cross-link is valuable for students taking both physics and chemistry.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

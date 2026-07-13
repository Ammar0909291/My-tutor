# phys.therm.internal-energy — Internal Energy of a System

## 1. Identity

| Field | Value |
|---|---|
| **Concept ID** | `phys.therm.internal-energy` |
| **Display name** | Internal Energy of a System |
| **KG requires** | `phys.therm.kinetic-theory` |
| **KG unlocks** | `phys.therm.first-law` |
| **Difficulty** | proficient |
| **Bloom level** | understand |
| **Mastery threshold** | 0.80 |
| **Estimated hours** | 4 |
| **KG description** | Internal energy is the total kinetic and potential energy of all molecules in a thermodynamic system. |

---

## 2. Mental Models

### Stage 1 — Intuitive (no formalism)

Every substance is made of molecules that are constantly moving and interacting. The internal energy U is the total energy stored in all this molecular motion and interaction — kinetic energy of random motion, plus potential energy from intermolecular attractions and repulsions. It does NOT include the bulk kinetic energy of the object moving as a whole, or its gravitational potential energy in an external field — those are macroscopic energies. U is purely the microscopic, molecular-scale energy.

### Stage 2 — Quantitative entry

For an **ideal gas** (where intermolecular forces are neglected):

**U = (f/2)nRT = (f/2)NkT**

where f = number of degrees of freedom per molecule:
- Monatomic ideal gas (He, Ar): f = 3 (translation only) → U = (3/2)nRT
- Diatomic gas at moderate T (N₂, O₂): f = 5 (3 translational + 2 rotational) → U = (5/2)nRT
- Diatomic gas at high T (vibration active): f = 7 → U = (7/2)nRT

Key result: for an ideal gas, U depends **only on temperature** (and amount n), not on pressure or volume.

**Change in internal energy**: ΔU = (f/2)nRΔT

For a monatomic ideal gas: ΔU = (3/2)nRΔT = nC_VΔT, where C_V = (3/2)R is the molar heat capacity at constant volume.

### Stage 3 — Real gases and phase contributions

For real gases and condensed phases, U has two contributions:
1. **Kinetic part** (U_K): random translational, rotational, vibrational KE of molecules. Proportional to T.
2. **Potential part** (U_P): energy stored in intermolecular bonds and interactions (van der Waals, hydrogen bonds, covalent bonds). Depends on intermolecular separations, NOT on T.

At a **phase transition** (e.g., melting), T stays constant while U increases (latent heat goes into U_P — breaking the intermolecular bonds that hold the solid together — not into U_K). This is why kinetic theory alone (U ∝ T) fails to account for phase transitions: U_P is non-zero and temperature-independent during the transition.

### Stage 4 — U as a state function

Internal energy U is a **state function**: its value depends only on the current thermodynamic state (T, V, n for an ideal gas), not on the path taken to reach that state. This is the foundation of the First Law (ΔU = Q − W): the same ΔU can be achieved by heating, by doing work, or by any combination — the path doesn't matter, only the initial and final states. This contrasts with Q (heat) and W (work), which are path functions and depend on how the change occurs.

---

## 3. Why Beginners Fail

1. **U = total energy of the object** — learners include gravitational PE or bulk KE in U. "If I lift a gas container, its internal energy increases." Wrong — U is molecular-level energy only; lifting adds macroscopic gravitational PE, not U.
2. **Temperature and U are the same thing** — learners say "U is just temperature." For an ideal gas U ∝ T, so they are proportional. But for a substance undergoing a phase change, T is constant while U increases — which breaks the T=U equivalence decisively.
3. **U depends on how it was heated** — learners think that if you heat a gas quickly vs. slowly, it ends up with different U. Since U is a state function, only the final T determines U for an ideal gas — the rate of heating is irrelevant.
4. **Monatomic and diatomic gases have the same U at the same T** — learners ignore degrees of freedom. A mole of N₂ at 300 K has U = (5/2)RT ≈ 6240 J; a mole of Ar at 300 K has U = (3/2)RT ≈ 3740 J. Same T, different U — because diatomic molecules store energy in rotation.

---

## 4. Misconception Library

### M1 — "Internal energy includes the kinetic energy of the container moving"

**Probe**: "A gas cylinder at 300 K is thrown across the room. Does the internal energy of the gas increase?"  
**Characteristic phrase**: "Yes — the gas is moving now, so its energy is higher."  
**What's wrong**: The bulk kinetic energy of the cylinder and its contents is macroscopic — it is the KE of the centre of mass, not the random molecular motion. U is the energy of molecular motion *in the reference frame of the centre of mass*. Throwing the cylinder adds bulk KE, not U.  
**Recovery**: Define U precisely: the total energy of random molecular motion and interactions, measured in the rest frame of the gas. Ask: "When the cylinder stops against a wall, some of that bulk KE becomes heat — molecular vibration increases. Now U has increased."

### M2 — "U and temperature are the same quantity"

**Probe**: "1 kg of ice at 0 °C and 1 kg of water at 0 °C — which has more internal energy?"  
**Characteristic phrase**: "Same — same temperature, same internal energy."  
**What's wrong**: Water at 0 °C has more U than ice at 0 °C. The latent heat of fusion (334 kJ/kg) was added to break the intermolecular bonds (increase U_P) while T remained at 0 °C. Same T, very different U.  
**Recovery**: Draw an energy diagram of the melting process: at 0 °C, U increases while T stays flat (latent heat absorbed into U_P). The T-vs-U proportionality holds only within a single phase, not across a phase transition.

### M3 — "Heating a gas quickly vs. slowly gives different U at the same final T"

**Probe**: "Gas A is heated from 300 K to 400 K quickly; Gas B is heated the same amount slowly. Which has more internal energy?"  
**Characteristic phrase**: "A — it got more heat dumped into it faster."  
**What's wrong**: U is a state function. For an ideal gas, U depends only on T (and n, and degrees of freedom). At the same final T = 400 K, both gases have the same U. The path (fast or slow) doesn't matter.  
**Recovery**: State the state-function property. Compute U = (3/2)nRT for both cases: same n, same T → same U. Q (heat added) may differ depending on path (e.g., heating at constant pressure vs. constant volume), but ΔU is the same.

### M4 — "All gases at the same temperature have the same internal energy (per mole)"

**Probe**: "One mole of Ar and one mole of N₂ are both at 300 K. Which has more internal energy?"  
**Characteristic phrase**: "Same — same temperature, same energy per molecule."  
**What's wrong**: Ar is monatomic (f = 3): U = (3/2)RT. N₂ is diatomic at 300 K (f = 5): U = (5/2)RT. N₂ has 5/3 ≈ 1.67× more U per mole at the same T, because it stores energy in two rotational modes that Ar lacks.  
**Recovery**: Count degrees of freedom. Monatomic: only 3 translational modes. Diatomic: 3 translational + 2 rotational. Each mode contributes (1/2)RT per mole → different totals at the same T.

---

## 5. Explanation Library

### Explanation A — U for an ideal gas: the equipartition derivation

From kinetic theory, each translational degree of freedom stores (1/2)kT of energy per molecule. For a monatomic ideal gas (3 translational DOF only): U per molecule = (3/2)kT. For N molecules: U = (3/2)NkT = (3/2)nRT.

For a diatomic gas: two rotational DOF add (1/2)kT each → U per molecule = (5/2)kT → U = (5/2)nRT.

This is the *average* U; fluctuations around the mean are small (∝1/√N for large N) and negligible for macroscopic systems.

### Explanation B — U as a state function and the implication for C_V

Since U depends only on T (for an ideal gas), the rate of change of U with T is the same regardless of the process:

C_V ≡ (1/n)(dU/dT) = f/2 × R

This is defined at constant volume, where all heat goes into U with no work done (W = PΔV = 0 when ΔV = 0). At constant pressure, some heat does work of expansion, so C_P = C_V + R (Mayer's relation). Both C_V and C_P are derived from U.

### Explanation C — U in a real substance (sketch)

Solid → liquid → gas:  
- Solid: molecules vibrate around fixed positions. U_K (vibrational KE) and U_P (bonds at equilibrium distance) both present. C_V ≈ 3R per mole (Dulong-Petit law for most simple solids at room T).  
- At melting: T stays constant; U increases by mL_f per unit mass (latent heat of fusion goes into breaking bonds → increasing U_P).  
- Liquid → gas: similarly, T stays constant at boiling; U increases by mL_v.  
- Plot of U vs. T: straight lines within each phase (slope = C_V or C_P for that phase), with vertical jumps at phase transitions (latent heat).

---

## 6. Analogy Library

### Primary analogy — The thermal bank account

Internal energy is like a bank account that stores energy at the molecular level. You can add to the account by heating the substance (Q) or by doing work on it (W). You can withdraw by releasing heat or having the substance do work. The *balance* (U) depends only on the current state (temperature for an ideal gas) — not on the history of deposits and withdrawals. Two different paths to the same T give the same U, just as two different saving strategies can end up at the same account balance.

**Breaking point**: A bank account balance is a single number; internal energy in a real substance also depends on volume (through U_P, the potential energy of molecular interactions, which changes with intermolecular separation). For an ideal gas U depends only on T, but for a real gas or a solid, U = U(T, V). The analogy also doesn't naturally express the distinction between kinetic and potential contributions to U.

### Anti-analogy — "Temperature IS internal energy"

In colloquial use, "hotter = more energy." This is true within a phase for an ideal gas, but it fails at phase transitions (same T, different U) and across molecular types (same T, different U per mole). Never allow the equivalence T ↔ U — they are related but distinct: T measures average molecular KE per translational DOF; U sums all molecular energy across all modes and molecules.

---

## 7. Demonstration Library

### Demo A — Ice-water temperature plateau (U ≠ T)

**Setup**: Heat a beaker of ice from −20 °C using a hot plate. Record temperature every 30 seconds with a thermometer or datalogger.  
**Observation**: Temperature rises from −20 to 0 °C (ice warms). Then stays flat at 0 °C for several minutes (ice melts). Then rises again from 0 to 100 °C (water warms). Then flat again at 100 °C (water boils). Then rises (steam).  
**Teaching target**: During the flat sections, heat is still being added (Q > 0), so U is increasing — but T is not. This directly shows U ≠ T and that latent heat goes into U_P (breaking molecular bonds), not U_K (molecular speed).

### Demo B — Gas in a sealed container: U unchanged at constant T

**Setup**: A thermally insulated rigid container of ideal gas (e.g., a pressure vessel with a pressure gauge). The gas is at equilibrium at temperature T.  
**Concept check**: Double the pressure by pumping in more gas at the same T. U doubles (more molecules, same T per molecule). Now hold n constant but double the volume isothermally (slowly, maintaining T). For an ideal gas: U unchanged (T unchanged, n unchanged). The pressure gauge reading halved, but U stayed the same.  
**Teaching target**: U depends on T and n, not on P or V separately (for ideal gas). This is the ideal-gas internal-energy rule.

### Demo C — Two gases at same T, different DOF (thought experiment)

**Setup**: Compare two identical pressure vessels: one with 1 mol Ar, one with 1 mol N₂, both at 300 K. Each has the same PV (= nRT) — but different internal energies.  
**Demonstrate**: Add equal heat Q to each. Measure ΔT. Ar: ΔT = Q/(nC_V) = Q/(1.5R). N₂: ΔT = Q/(nC_V) = Q/(2.5R). Ar heats up more than N₂ for the same Q.  
**Teaching target**: Different degrees of freedom → different C_V → different U per mole at same T. The extra energy in N₂ goes into rotation, which does not raise T but does raise U.

---

## 8. Discovery Lesson

### Stance: Argue the inductive case — *observe the temperature plateau, then account for the missing energy*

**Why inductive here**: The temperature plateau during melting (Demo A) is the decisive empirical fact that forces U and T to be distinguished. Telling learners "U is not the same as T" before they have seen the contradiction is less effective than having them confront the data and ask "where did the energy go during the flat section?"

**Opening question**: "I am heating a block of ice on a hot plate. Energy is flowing in the whole time. Predict: does temperature increase the whole time?"

**Sequence**:
1. Students predict "yes — continuous heating means continuous T rise."
2. Demo A: show the plateau. "Energy in; temperature flat. Where is the energy going?"
3. Introduce U = U_K + U_P. During melting: heat increases U_P (breaking bonds), not U_K (speed). Temperature measures U_K per DOF, not total U.
4. Quantify: latent heat = 334 kJ/kg for ice. At 0 °C, how much U increases per kg? Exactly that much.
5. Return to ideal gas: U = (3/2)nRT — no U_P term because ideal gas has no intermolecular interactions. Within a single phase of a real gas, U_P is approximately constant and only U_K changes with T.
6. Closure: "U is the total molecular energy — kinetic and potential. Temperature is proportional only to the kinetic part. They are proportional within a phase; they diverge at a phase transition."

---

## 9. Teaching Actions

| Prior state | Action |
|---|---|
| Learner includes bulk KE in U | Define precisely: "U = molecular energy in the rest frame of the object's centre of mass." Bulk KE is macroscopic, separate. |
| Learner equates U and T | Demo A. "During melting, T is constant. Is Q = 0? No — heat is going in. Where? Into U. So U increased while T did not. They are not the same." |
| Learner thinks U depends on path to reach a state | State the state-function property: U = U(T, n, V). Compute for two paths to the same (T, n, V): same U both times. The state, not the path, determines U. |
| Learner ignores degrees of freedom | Compute U for 1 mol Ar and 1 mol N₂ at the same T. Show the numerical difference. Link to C_V: C_V = f/2 × R; different f → different C_V → different ΔT per joule. |
| Learner asks "what about solids?" | C_V ≈ 3R per mole (Dulong-Petit: 6 DOF — 3 KE + 3 PE vibrational, each (1/2)kT). At very low T, quantum effects reduce C_V toward 0 (Einstein/Debye models). |

---

## 10. Voice Teaching

### Opening
"When you heat a block of ice, you add energy. The temperature rises — until you reach 0 °C. Then it stops rising, even though heat keeps flowing in. The temperature is flat for several minutes while the ice melts. Where is the energy going? Not into molecular speed — into breaking the bonds that hold the ice together. That is internal energy: the sum of molecular kinetic energy AND potential energy."

### Core
"For an ideal gas, we ignore intermolecular forces, so U is purely kinetic: U = (3/2)nRT for monatomic, (5/2)nRT for diatomic. It depends only on temperature and amount. Same temperature, same amount → same U, regardless of how you got there. That is what 'state function' means."

### Degrees of freedom
"A helium atom bounces around — three directions of motion, three degrees of freedom, (3/2)kT of average energy. A nitrogen molecule bounces and rotates about two axes — five degrees of freedom, (5/2)kT. At the same temperature, N₂ stores more energy per molecule. That is why N₂ needs more heat per kelvin to warm up — it has more modes to fill."

### Misconception interrupt
"Do not confuse temperature with internal energy. Temperature is the average translational kinetic energy per molecule — one part of U. U is everything: all translational, all rotational, all vibrational KE, plus all intermolecular potential energy. They are proportional only if everything else is constant."

---

## 11. Assessment

### Mastery gate

The learner can:
1. Define U as the sum of molecular kinetic and potential energy (excluding macroscopic KE and PE).
2. Calculate U for a monatomic and diatomic ideal gas given n, T, and the degrees of freedom.
3. Explain why U is a state function and what that implies for ΔU across different paths.
4. Describe how U changes during a phase transition (T constant, U_P increases).
5. Compute C_V from f using C_V = (f/2)R and relate it to ΔU via ΔU = nC_VΔT.

### Formative golden probe

> "2 mol of O₂ (diatomic, f=5 at room temperature) are heated from 200 K to 400 K at constant volume. (a) By how much does U change? (b) How much heat was added? (c) How much work was done by the gas?"

*Solution*:  
(a) ΔU = nC_VΔT = 2 × (5/2 × 8.314) × 200 = 2 × 20.79 × 200 = 8314 J ≈ 8.31 kJ.  
(b) Constant volume: W = PΔV = 0 → Q = ΔU = 8.31 kJ (First Law preview: ΔU = Q − W).  
(c) W = 0 (constant volume, no expansion).  
*Likely errors*: Using f = 3 (monatomic) for O₂; forgetting to use n = 2 mol; applying C_P instead of C_V (the gas doesn't expand at constant volume).

### Confidence calibration

After the probe, ask: "If the same process was at constant pressure instead of constant volume, would ΔU change?" (No — U is a state function; same n, same ΔT → same ΔU. But Q would be larger because the gas also does expansion work.) Students who say "ΔU increases at constant pressure because more heat was added" confuse Q with ΔU. Correct: ΔU = nC_VΔT regardless of process (for ideal gas).

### Delayed retrieval check (next session opener)

"Why does internal energy increase during melting even though temperature stays constant?"  
Expected: Latent heat increases U_P (intermolecular potential energy, breaking bonds), not U_K (kinetic energy / temperature). If the learner says "it doesn't increase" or "because the molecules speed up": reteach via Demo A data.

---

## 12. Recovery Notes

**Recovery for U = T confusion**:
1. Draw the T vs. Q graph for a substance being heated from solid to vapour (Demo A trace).
2. Mark the slope changes (different C_V in each phase) and the flat sections (phase transitions).
3. "Every point on this graph has a unique U. But many points have the same T — namely all points along the flat sections. Same T, different U. They are not the same."

**Recovery for degrees-of-freedom confusion**:
1. Model the molecules physically: ball (monatomic) can only translate. Dumbbell (diatomic) can translate AND rotate about two axes perpendicular to the bond.
2. Count: 3 translational + 2 rotational = 5 modes. Each stores (1/2)kT → (5/2)kT total per molecule.
3. Verify against measured C_V data: Ar ≈ 12.5 J/(mol·K) = (3/2)R; N₂ ≈ 20.8 J/(mol·K) = (5/2)R. Theory matches measurement.

---

## 13. Memory & Review

**Memory type**: Conceptual definition + formula network (U, C_V, f) + state-function property

**Encoding hooks**:
- U = (f/2)nRT — f is the number of molecular energy modes
- Monatomic: f = 3; diatomic (room T): f = 5; diatomic (high T): f = 7
- State function: U depends on (T, n) only (ideal gas) — path irrelevant
- Phase transition: T flat, U rises (latent heat → U_P, not U_K)

**Spaced retrieval schedule**:
- Session +1: "Compute U for 3 mol of He at 500 K. Then for 3 mol of O₂ at 500 K."
- Week 1: "A gas is taken from state A to state B via two different paths. Is ΔU the same for both paths? Explain."
- Week 3: "Draw the T vs. Q graph for 1 kg of water heated from −20 °C to 120 °C. Label each segment and identify where U_P increases."
- Month 2: "Why is C_P = C_V + R for an ideal gas? Derive it using ΔU = nC_VΔT and PΔV = nRΔT."

**Interleave with**: `phys.therm.kinetic-theory` (prerequisite — equipartition theorem, degrees of freedom), `phys.therm.first-law` (the direct downstream — ΔU = Q − W uses U as the central quantity)

---

## 14. Transfer Map

| Target concept | Bridge |
|---|---|
| `phys.therm.first-law` | ΔU = Q − W: U is the central accounting variable; Q and W are the two ways to change it |
| `phys.therm.phase-transitions` | Latent heat L increases U_P at constant T; calorimetry heat balance must include mL terms alongside mcΔT |
| Chemistry — bond energies | Bond enthalpy = energy stored in U_P per mole of bonds; combustion reactions convert U_P (chemical) into Q |
| Astrophysics — stellar structure | A star's internal energy is the sum of kinetic (thermal) and gravitational potential energies of its gas; the virial theorem relates them |
| Engineering — thermodynamic cycles | Efficiency of heat engines, refrigerators, and heat pumps all computed from ΔU, Q, and W at each step |
| Atmospheric science — moist air thermodynamics | Latent heat of condensation is the U_P released when water vapour condenses; drives thunderstorm energy |

---

## 15. Curriculum Feedback

**KG note**: `phys.therm.kinetic-theory` is the necessary prerequisite — equipartition and degrees of freedom must be established before U = (f/2)nRT is meaningful. `phys.therm.first-law` is correctly gated on this concept: you cannot teach ΔU = Q − W until U is defined and its state-function property is established.

**Authoring note**: The ice-melting plateau demonstration (Demo A) is the most important teaching moment in this concept — it is the single clearest empirical refutation of "U = T" and should be central to every first lesson on internal energy. Never skip it.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

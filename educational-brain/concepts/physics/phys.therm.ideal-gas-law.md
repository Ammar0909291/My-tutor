# Ideal Gas Law — `phys.therm.ideal-gas-law`

## Identity

- **Concept ID**: `phys.therm.ideal-gas-law`
- **Display name**: Ideal Gas Law
- **Domain**: thermodynamics
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4
- **Requires**: `phys.therm.zeroth-law`, `phys.therm.temperature`
- **Unlocks**: `phys.therm.kinetic-theory`
- **Load-bearing prerequisite content**:
  - From `phys.therm.temperature`: T must be in Kelvin — absolute zero is physically meaningful for the ideal gas law because PV = 0 at T = 0 K (a gas contracts to zero volume); Celsius zero is arbitrary. Every substitution into PV = nRT requires T in Kelvin.
  - From `phys.therm.zeroth-law`: the T in PV = nRT is the equilibrium temperature; using a non-equilibrium temperature (during rapid compression before the gas has equilibrated) violates the law's assumptions.

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Gases have three quantities that change together — pressure (how hard the gas pushes on the container walls), volume (how much space the gas occupies), and temperature (how hot the gas is). When you heat a gas in a sealed container, the pressure goes up. When you compress a gas, the pressure goes up. These three quantities are related.

**Stage 2 — Intermediate**: The ideal gas law PV = nRT combines three experimentally discovered gas laws: Boyle's law (PV = constant at fixed T, n), Charles's law (V/T = constant at fixed P, n), and Gay-Lussac's law (P/T = constant at fixed V, n). Here: P = pressure (Pa), V = volume (m³), n = amount of gas (moles), R = 8.314 J/(mol·K) (universal gas constant), T = temperature in Kelvin. For a fixed amount of gas, the combined law P₁V₁/T₁ = P₂V₂/T₂ relates initial and final states. An ideal gas is one whose particles have no volume and no intermolecular forces — a good approximation for most real gases at low pressure and high temperature.

**Stage 3 — Advanced**: PV = nRT can be rewritten as PV = NkT, where N is the number of molecules and k = R/Nₐ = 1.38 × 10⁻²³ J/K is the Boltzmann constant (Nₐ = 6.022 × 10²³ is Avogadro's number). Molar mass M relates n and total mass m: n = m/M. Real gases deviate from ideal behaviour at high pressure (particle volumes matter: molecules take up space) and low temperature (intermolecular attraction is significant, reducing pressure compared to the ideal). The van der Waals equation (P + a/V²)(V − b) = nRT corrects for both.

**Stage 4 — Expert / University**: The ideal gas law is derived from statistical mechanics: each translational degree of freedom contributes (1/2)kT of average kinetic energy; with three translational degrees, KE = (3/2)kT per molecule, and PV = NkT follows from the equipartition theorem and the definition of pressure as force per area (from molecular collision momentum transfer). The second virial coefficient quantifies the leading correction for real gas behaviour.

**Model versioning**: Stage 2 is the operative model for all secondary-level gas problems. Stage 3 is needed for problems involving number of molecules (N) and the Boltzmann constant. Stage 4 is university statistical mechanics.

---

## Why beginners fail

The dominant root cause is **Celsius substitution**: learners substitute temperature in Celsius into PV = nRT and get wrong answers. The failure is reinforced by the fact that Celsius works perfectly for thermal expansion (ΔT is the same in both scales) but fails catastrophically here because the ideal gas law uses absolute temperature, not temperature difference.

The secondary root cause is **variable isolation errors**: learners use PV = nRT for problems where only two of P, V, T change (n fixed) but fail to identify which two are changing and which is held constant. They substitute all variables without structure. The three subsidiary laws (Boyle's, Charles's, Gay-Lussac's) must be derived as special cases of the combined law so learners can select the right simplification.

---

## Misconception library

**M1 — "Temperature can be in Celsius in PV = nRT"**
- Characteristic phrase: "Room temperature is 25 °C, so T = 25."
- Probe: "A gas at 100 °C and 1 atm is heated to 200 °C at constant pressure. By what factor does the volume change?"
- Expected wrong answer: "V doubles, because temperature doubled."
- Recovery: 100 °C = 373 K; 200 °C = 473 K. V₂/V₁ = T₂/T₁ = 473/373 ≈ 1.27. The volume increases by only 27%, not 100%. Doubling applies only in Kelvin. Convert FIRST, every time: T(K) = T(°C) + 273.

**M2 — "PV = nRT is four independent variables — any three can be held constant"**
- Characteristic phrase: "I'll hold P, V, and n constant, and find T from the equation."
- Probe: "Which variables in PV = nRT are actually independent for a fixed amount of gas in a sealed rigid container?"
- Expected wrong answer: "All four can be chosen independently."
- Recovery: for a fixed amount of gas (n constant) in a sealed container (V fixed), changing T necessarily changes P — they are not independent. The gas law constrains them: with n and V fixed, P = nRT/V means P and T are linearly related. Independently choosing P, V, T, and n simultaneously over-specifies the system; only three can be freely set for an ideal gas (the fourth is then determined).

**M3 — "The ideal gas law doesn't apply to liquids and solids — it's only for gases"**
- Characteristic phrase: "Water in a sealed container — I can't use the gas law."
- Probe: "Is this a correct statement: 'PV = nRT describes only gases, never liquids or solids'?"
- Expected answer: "True — PV = nRT is specifically for gases." (This is actually correct — the error to guard against is the inverse: learners who try to apply PV = nRT to liquids or solids.)
- Teaching note: M3 in the other direction (applying the ideal gas law to non-gases) is less common but must be explicitly excluded. A sealed container of liquid water does NOT obey PV = nRT for the liquid — only if the water vapour above it is treated as an ideal gas. Enforce: "Is this substance in the gas phase?" before applying PV = nRT.

**M4 — "Higher pressure means the gas is hotter"**
- Characteristic phrase: "You can tell a gas is hot because its pressure is high."
- Probe: "A large container of cold gas and a small container of warm gas both have the same pressure. Which has more particles?"
- Expected wrong answer: "The cold one is bigger so it has more, and... actually I can't tell."
- Recovery: from PV = nRT → n = PV/(RT). Same P: n ∝ V/T. The large cold container might have more molecules (large V, low T) or fewer (small V, high T) — P alone doesn't determine temperature or particle count. All three of P, V, T must be known (or two, given the third via the gas law) to determine any property of the gas.

---

## Explanation library

**E1 — PV = nRT as a synthesis of three laws**
"Boyle (1662): at fixed T and n, PV = constant — compress a gas, pressure rises. Charles (1787): at fixed P and n, V/T = constant — heat a gas, it expands. Gay-Lussac (1802): at fixed V and n, P/T = constant — heat a sealed container, pressure rises. PV = nRT unifies all three: it reduces to each when the appropriate variable is held constant. You only need to know one law."

**E2 — The Kelvin requirement explained from the law itself**
"At absolute zero (T = 0 K), PV = nR × 0 = 0. This says: at 0 K, either pressure = 0 or volume = 0 — the gas has collapsed. This makes physical sense: at absolute zero, particles have no kinetic energy to push on walls. If you use Celsius, 0 °C gives PV = nR × 0 in Celsius terms — which incorrectly predicts zero pressure/volume at the freezing point of water. The law only works when zero means zero kinetic energy, which is 0 K, not 0 °C."

**E3 — The combined law for two-state problems**
"For a fixed amount of gas (n constant), P₁V₁/T₁ = P₂V₂/T₂. Write the initial state with subscript 1, final state with subscript 2. Identify which variable is constant (P, V, or T, or some combination). Cross-cancel the constant, solve for the unknown. Always convert T to Kelvin before substituting."

---

## Analogy library

**Primary analogy — The gas as a room full of bouncing balls**
Imagine a room (the container) full of rubber balls (gas molecules) bouncing off the walls. Temperature = how fast the balls move (average speed). Pressure = how hard the balls collectively hit the walls per unit area. Volume = the size of the room. If you heat the balls (more T), they move faster and hit harder → pressure increases. If you compress the room (less V), the balls hit the walls more often → pressure increases. PV = nRT formalises these relationships.

**Breaking point**: Rubber balls in a real room have gravity pulling them down; molecules in a real gas also have gravity but at atmospheric conditions it is negligible. Real gas molecules also have finite size and interact with each other; the "ideal" in ideal gas law means these effects are zero.

**Anti-analogy — "Pressure and temperature are the same thing"**
A compressed gas (high pressure) is not necessarily hot. You can have cold compressed gas (high P, low T, for the same n and appropriate V). PV = nRT shows P and T are independently variable. Do NOT say "high pressure = high temperature" — this is only true if volume is also constrained.

---

## Demonstration library

**D1 — Heating a balloon**
Inflate a balloon at room temperature. Place it in hot water: it expands (V increases at roughly constant P and fixed n, consistent with Charles's law: V ∝ T). Place it in ice water: it contracts. This demonstrates Charles's law as a special case of PV = nRT.

**D2 — Sealed syringe + hot/cold water**
Seal a syringe (no plunger movement possible → V ≈ constant). Put it in hot water: you feel the increased pressure as the plunger is pushed outward (pressure increased). This demonstrates Gay-Lussac's law. Allow the plunger to move freely: volume increases instead.

**D3 — Pressure vs. volume: Boyle's law syringe**
Block the tip of a syringe and push the plunger in (decrease V). The increasing resistance of the plunger shows increased pressure. Release: it springs back. This demonstrates Boyle's law at roughly constant temperature (fast compression ≈ isothermal for small changes).

---

## Discovery lesson

**Argue for direct instruction + guided synthesis**:

The three gas laws (Boyle's, Charles's, Gay-Lussac's) should each be motivated by a demonstration (D1, D2, D3) and articulated as a proportionality. Then: "We have three laws. Can they be combined into one?" Guide the learner to multiply them: (PV = const_T) × (V/T = const_P) × (P/T = const_V). Algebraic manipulation of the three proportionalities yields PV/T = constant → PV/T = nR → PV = nRT. The synthesis is discoverable from the three laws and is more memorable for being derived than memorised.

---

## Teaching actions

**TA1 — Kelvin conversion as step 0**: Before writing PV = nRT or P₁V₁/T₁ = P₂V₂/T₂, require the learner to write "T₁ = ___ + 273 = ___ K" as the very first step. No substitution until T is in Kelvin. This prevents M1 at the procedural level.

**TA2 — Variable inventory**: Before solving, require: "What is fixed? What changes? What is unknown?" List all four variables, mark each as "fixed," "changes (initial → final)," or "unknown." This prevents the over-specification error of M2 and guides equation selection.

**TA3 — Ideal gas check**: Before applying PV = nRT, require: "Is the substance in the gas phase? Is the pressure low and temperature high enough for the ideal gas approximation?" This builds the habit of checking model validity before applying it.

**TA4 — Units audit**: Require P in Pa (not atm or bar), V in m³ (not L), T in K, n in mol, and R = 8.314 J/(mol·K) as a standard before every substitution. If different units are given, require conversion before substitution.

---

## Voice teaching

> "PV = nRT. Before anything else — T is in Kelvin. Always. The gas law uses absolute temperature because the 'zero' in the law means no kinetic energy; Celsius zero is just the freezing point of water, which has nothing to do with it. Convert first, calculate second. Every single time."

> "The gas law is really three laws in one. Boyle: fix T, compress the gas, pressure goes up (PV = constant). Charles: fix P, heat the gas, volume goes up (V/T = constant). Gay-Lussac: fix V, heat a sealed container, pressure goes up (P/T = constant). PV = nRT contains all three — each is a special case where one or two variables are constant."

> "A higher-pressure gas is not necessarily hotter. A bicycle tyre has high pressure but it's at room temperature. The pressure is high because of the volume of the tyre and the amount of air pumped in. Don't conflate pressure and temperature. The gas law gives you the relationship between all four: P, V, n, T. Change any one without changing the others and the law tells you what happens."

---

## Assessment

**Mastery gate**: The learner can (1) state PV = nRT and identify each symbol; (2) convert temperature to Kelvin as the first step in every calculation; (3) apply P₁V₁/T₁ = P₂V₂/T₂ to two-state problems; (4) identify which subsidiary law (Boyle's, Charles's, Gay-Lussac's) applies for a given constraint.

**Formative golden probe**
> "A gas is enclosed in a cylinder with a movable piston. Initial state: P₁ = 2.0 × 10⁵ Pa, V₁ = 3.0 L, T₁ = 27 °C. (a) Convert T₁ to Kelvin. (b) The gas is heated at constant pressure to 127 °C. What is the new volume V₂? (c) Instead, the gas is compressed isothermally (at 27 °C) until V₂ = 1.0 L. What is the new pressure? (d) Which gas law corresponds to each scenario (b) and (c)?"

- (a): T₁ = 300 K — tests M1 directly
- (b): Charles's law: V₂ = V₁ × T₂/T₁ = 3.0 × 400/300 = 4.0 L
- (c): Boyle's law: P₂ = P₁V₁/V₂ = 2.0×10⁵ × 3.0/1.0 = 6.0×10⁵ Pa
- (d): (b) = Charles's (P constant), (c) = Boyle's (T constant)

**Confidence calibration question**
After (a): "How confident are you that 27 °C = 300 K?" (1–5). Consistent errors after high confidence → M1 deeply embedded; requires explicit Kelvin-motivation explanation (E2).

**Delayed retrieval check (48 h / 7 days)**
"A sealed container holds gas at 300 K and 1.0 × 10⁵ Pa. It is heated until the pressure is 1.5 × 10⁵ Pa. What is the new temperature?" (Gay-Lussac's law: T₂ = 300 × 1.5/1.0 = 450 K = 177 °C — tests ability to select the right special case and convert back to Celsius for the answer.)

---

## Recovery notes

**Failure mode A — Celsius substitution persists (M1)**
Run the motivating calculation: "At 0 °C, what does the gas law predict for V if T = 0 (Celsius)?" The law gives V = 0 — zero volume at the freezing point of water, which is absurd. "At 0 K, V = 0 makes physical sense: no kinetic energy, gas collapses. Celsius zero is irrelevant to the gas law. Always Kelvin." This argument from the physical absurdity of the Celsius result is more memorable than "it's a rule."

**Failure mode B — Incorrect variable holding (M2)**
Use TA2 (variable inventory) explicitly. Write a table: P | V | n | T, mark each as fixed/changing/unknown for the specific problem. Only then write the equation. If all four are marked as "unknown," the problem is under-constrained and the learner must re-read the question.

**Failure mode C — Constant confusion (uses wrong R value or units)**
Require TA4 (units audit) before every problem. Write R = 8.314 J/(mol·K) = 8.314 Pa·m³/(mol·K) at the top of every gas law problem. If L and atm units appear, convert: 1 L = 10⁻³ m³, 1 atm = 1.013 × 10⁵ Pa.

---

## Memory & review

**Memory type**: Formula (PV = nRT) + constant (R = 8.314 J/(mol·K)) + conversion rule (T in Kelvin) + three special-case names (Boyle's/Charles's/Gay-Lussac's).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "State the ideal gas law. What does each symbol represent and what is its unit?"
- "What temperature scale must be used in PV = nRT? Why?"
- "State Boyle's law, Charles's law, and Gay-Lussac's law — which variable is constant in each?"
- "A gas at 0 °C and 1 atm is heated to 273 °C at constant pressure. What happens to its volume?"

**Interleaving**: After mastery, mix ideal gas law problems with thermal expansion problems — learners must decide whether the substance is a solid/liquid (ΔL = αL₀ΔT) or a gas (PV = nRT) before selecting the right equation.

---

## Transfer map

**Immediate transfers**:
- `phys.therm.kinetic-theory`: KE_avg = (3/2)kT connects PV = nRT at the molecular level — the macroscopic gas law is derived from the microscopic kinetic theory

**Downstream transfers**:
- Thermodynamic processes: isothermal (PV = const), isobaric (V/T = const), isochoric (P/T = const), adiabatic (PV^γ = const) — all extensions of the ideal gas framework
- First law of thermodynamics: ΔU = Q − W for an ideal gas, U = (3/2)nRT

**Cross-subject transfers**:
- `chem` — stoichiometry using gases: molar volume at STP (22.4 L/mol), gas collection over water, partial pressures (Dalton's law: P_total = ΣP_i)
- Atmospheric science: altitude vs. pressure and temperature relationships; weather balloon volume vs. altitude calculations

---

## Curriculum feedback

The KG correctly identifies PV = nRT and requires both zeroth-law and temperature as prerequisites. The single unlock (kinetic-theory) is appropriate — kinetic theory derives the gas law from molecular mechanics.

One gap: the KG description does not specify that T must be in Kelvin. Given that M1 (Celsius substitution) is the single most common error with this equation, the KG description should explicitly state "T in absolute temperature (Kelvin)."

A second gap: the KG does not mention the three special-case gas laws (Boyle's, Charles's, Gay-Lussac's). These are standard secondary-level content and are often tested in their named form. They should be listed as learning outcomes or the KG description should note that the ideal gas law subsumes them.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

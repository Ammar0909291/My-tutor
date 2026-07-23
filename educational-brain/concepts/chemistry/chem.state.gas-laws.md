# Gas Laws — `chem.state.gas-laws`

## Identity

- **KG ID**: chem.state.gas-laws
- **Subject**: Chemistry
- **Domain**: States of Matter (chem.state)
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.state.kinetic-theory, chem.found.measurement
- **Unlocks**: chem.sol.solubility, chem.state.molar-mass-gas, chem.state.real-gases
- **Cross-links**: none

## Learning Objective

Students can state Boyle's, Charles's, Gay-Lussac's, and Avogadro's laws with their variables held constant; apply the combined gas law for problems involving changes in P, V, and T; use the ideal gas law PV = nRT in all four variable forms; convert between standard temperature and pressure (STP) and standard ambient conditions; and calculate molar volume at STP.

## Core Understanding

The four individual gas laws each describe the relationship between two variables when all others are held constant:
- **Boyle's law** (constant T, n): P₁V₁ = P₂V₂ — pressure and volume are inversely proportional.
- **Charles's law** (constant P, n): V₁/T₁ = V₂/T₂ — volume and Kelvin temperature are directly proportional.
- **Gay-Lussac's law** (constant V, n): P₁/T₁ = P₂/T₂ — pressure and Kelvin temperature are directly proportional.
- **Avogadro's law** (constant T, P): V₁/n₁ = V₂/n₂ — volume is directly proportional to moles.

These four combine into the **ideal gas law**: PV = nRT, where R = 8.314 J·mol⁻¹·K⁻¹ (or 0.08206 L·atm·mol⁻¹·K⁻¹). At STP (0 °C, 1 bar), 1 mol of ideal gas occupies 22.4 L (standard molar volume).

All four laws, and the ideal gas law, assume an ideal gas (point particles, no intermolecular forces) — the approximation that KMT postulates. Real gases deviate at high P and low T (addressed in chem.state.real-gases).

## Mental Models

**The KMT linkage**: Every gas law is derivable from KMT postulates (already encountered). Compress a gas at constant T → same average KE → same collisions → more collisions per unit area (smaller volume) → higher pressure. This derivability makes gas laws understandable rather than just memorisable.

**The combined law as one equation with frozen variables**: P₁V₁/T₁ = P₂V₂/T₂. Freeze T (Boyle): P₁V₁ = P₂V₂. Freeze P (Charles): V₁/T₁ = V₂/T₂. Freeze V (Gay-Lussac): P₁/T₁ = P₂/T₂. Students who memorise only PV/T = constant can derive all three directly.

**Ideal gas as the limiting case**: Real gases approach ideal behaviour as pressure → 0 and temperature → ∞ (particles far apart, negligible forces). The ideal gas law is exact only in this limit but is an excellent approximation under most laboratory conditions.

## Why Students Fail

1. **Celsius instead of Kelvin**: Students use Celsius in Charles's, Gay-Lussac's, or the ideal gas law — the single most common gas law error. Required conversion: T(K) = T(°C) + 273.15.
2. **Inconsistent pressure units**: Mixing atm, Pa, bar, mmHg without converting — especially in PV = nRT where R's units must match P and V's units.
3. **Not identifying the held-constant variable**: Students treat a combined gas law problem as needing the ideal gas law (or vice versa), introducing unnecessary algebra.
4. **Molar volume at STP**: Students use 22.4 L/mol without checking whether the question uses IUPAC STP (0 °C, 1 bar, giving 22.7 L/mol) or the older STP (0 °C, 1 atm, giving 22.4 L/mol). The difference is small but error-prone.

## Misconceptions

**MC-1 — Temperature in Celsius gives correct results** (Type 5, instruction-induced; critical)
- *Diagnostic probe*: "A gas at 25 °C is heated to 50 °C at constant pressure. By what factor does its volume increase? (Show with both Celsius and Kelvin and compare.)"
- *Characteristic phrase*: "The volume doubles because the temperature doubled from 25 to 50."
- *Repair*: Celsius gives V₂/V₁ = 50/25 = 2 (wrong). Kelvin: T₁ = 298 K, T₂ = 323 K; V₂/V₁ = 323/298 = 1.084 (correct — 8.4% increase, not 100% increase). The error from using Celsius can be a factor of 20 in this example.

**MC-2 — Boyle's law: pressure and volume are directly proportional** (Type 5, instruction-induced)
- *Mechanism*: Students confuse "directly proportional" and "inversely proportional."
- *Diagnostic probe*: "If you double the pressure on a gas at constant temperature, what happens to its volume? By what factor?"
- *Characteristic phrase*: "Volume doubles when pressure doubles."
- *Repair*: P₁V₁ = P₂V₂; if P doubles, V must halve (inverse relationship). The molecular explanation: compression squeezes particles into a smaller space, increasing collision frequency → higher pressure with the same particles. Halving V doubles P.

**MC-3 — R has one set of units** (Type 4, notation-induced)
- *Mechanism*: Students learn R = 8.314 J/(mol·K) and apply it with pressure in atm and volume in L — unit mismatch.
- *Diagnostic probe*: "PV = nRT. P = 2.0 atm, V = 5.0 L, n = 0.50 mol, T = 300 K. Calculate R from this data. What units does it have?"
- *Repair*: R = PV/nT = (2.0 atm)(5.0 L)/(0.50 mol × 300 K) = 0.0667 L·atm/(mol·K) ≈ 0.0821 L·atm/(mol·K). If using SI units (Pa and m³): R = 8.314 J/(mol·K). Choose R's value to match the units of P and V.

## Analogies

**Boyle's law — the syringe model**: Cover the tip of a syringe and compress the piston. Smaller volume → particles collide with walls more frequently → higher pressure. Release → volume increases, pressure decreases. Directly observable, directly tied to KMT.

**Charles's law — the balloon in cold/hot water**: A balloon shrinks in ice water (lower T → lower average KE → less outward pressure → smaller volume at same external pressure) and expands in warm water. Direct application of Charles's law.

## Demonstrations

**Demonstration 1 — Boyle's law: syringe at constant T**
- Vary pressure on a sealed syringe; record P and V; plot P vs. 1/V. The straight line confirms P ∝ 1/V.

**Demonstration 2 — Charles's law: balloon in hot water**
- Submerge a balloon in hot and cold water. Measure circumference (or estimate volume) at each temperature. Plot V vs. T(K); verify linearity.

## Discovery Questions

1. "A diver's air tank contains gas at 200 atm and 20 °C. If the diver uses 2.0 L of air per minute at 1.0 atm and 37 °C (body temperature), how many minutes can the diver breathe from a 10 L tank?" (Targets: use combined gas law to find volume at new conditions; divide by usage rate. P₁V₁/T₁ = P₂V₂/T₂ gives V₂ = (200)(10)(310)/(293)(1.0) ≈ 2116 L at 37°C/1 atm; time = 2116/2.0 ≈ 1058 min = ~17.6 h.)
2. "What mass of CO₂ is in a 2.50 L container at 1.25 atm and 45 °C?" (Targets: PV = nRT; n = PV/RT = (1.25)(2.50)/((0.08206)(318)) = 0.1198 mol; m = 0.1198 × 44.01 = 5.27 g.)
3. "At what temperature would 0.500 mol of N₂ occupy 15.0 L at 1.50 atm?" (Targets: T = PV/nR = (1.50)(15.0)/((0.500)(0.08206)) = 548 K = 275 °C.)

## Teaching Sequence

1. Review from chem.state.kinetic-theory: pressure as molecular collisions; T as average KE in Kelvin.
2. Introduce Boyle's law: demonstration with syringe or graph. Derive from KMT qualitatively. Solve two Boyle's law calculations.
3. Introduce Charles's law: demonstration with balloon or graph. Emphasise Kelvin conversion. Solve two Charles's law calculations.
4. Introduce Gay-Lussac's law: V constant, P/T = constant. Solve one calculation.
5. Introduce the combined gas law: P₁V₁/T₁ = P₂V₂/T₂. Solve the diver problem (Discovery Question 1).
6. Introduce Avogadro's law: equal volumes at same T and P contain equal numbers of molecules. → ideal gas law PV = nRT.
7. Address MC-3: show that R = 0.08206 L·atm/(mol·K) and R = 8.314 J/(mol·K) are the same constant in different unit systems. Always match R to problem units.
8. STP and molar volume. Practice: Discovery Questions 2 and 3.

## Tutor Actions

- If student uses Celsius → MC-1 probe: compare calculation with Celsius to Kelvin; show the factor-of-error.
- If student says P and V are directly proportional → MC-2 repair: the syringe thought experiment.
- If student mixes pressure units → MC-3 repair: require explicit unit-checking as the first step of every PV = nRT problem.
- Advance when student correctly solves a combined gas law problem and a PV = nRT problem, including the Kelvin conversion.

## Voice Teaching Notes

"Temperature in Kelvin — always, every time, without exception." Repeat this at the start and end of every gas law lesson. The habit must be formed before the error is made, not after.

The combined gas law (P₁V₁/T₁ = P₂V₂/T₂) is the single most useful memory anchor — it subsumes all three individual laws. Teach the individual laws first for conceptual understanding, then show the combined law as the unifying formula.

## Assessment Signals

**Mastery gate**:
1. Student correctly converts temperature to Kelvin in 3 of 3 problems.
2. Student correctly identifies which variables are held constant and selects the appropriate law.
3. Student correctly solves a combined gas law problem (involving a change in P, V, and T).
4. Student correctly solves an ideal gas law problem (finding n or m from PVT data).

**FRAGILE signal**: student selects the correct law but makes arithmetic errors in unit conversion (L→m³, atm→Pa, or vice versa).

**MISCONCEIVING signal**: student uses Celsius in a Charles's law calculation and accepts the result without checking. Requires the side-by-side Celsius-vs-Kelvin comparison to make the error visible.

## Tutor Recovery Strategy

If stuck:
1. For Kelvin conversion: drill T(K) = T(°C) + 273.15 as a standalone exercise — convert 10 temperatures in 2 minutes. The conversion must be automatic.
2. For unit confusion: build a unit-conversion table at the start of each problem: 1 atm = 101,325 Pa = 760 mmHg = 1.01325 bar. Require the student to fill it in before calculating.
3. For law selection confusion: the "frozen variable" protocol — identify which of P, V, T, n is constant; that frozen variable removes one variable from the combined law and leaves the appropriate individual law.

## Memory Hooks

- **"Boyle: P and V inverse (P ↑, V ↓). Charles: V and T direct (V ↑, T ↑). Gay-Lussac: P and T direct (P ↑, T ↑)."** Three laws, three relationships, one sentence each.
- **"PV = nRT — the workhorse equation. R = 0.0821 L·atm/(mol·K) or 8.314 J/(mol·K). Match the units."**
- **"Kelvin always. Never Celsius in gas laws."**

## Transfer Connections

- **chem.state.molar-mass-gas**: molar mass of an unknown gas can be determined from PV = nRT; the ideal gas law connects PVT data to moles → to mass → to molar mass.
- **chem.state.real-gases**: the ideal gas law is the baseline; real gas deviations (van der Waals equation) are corrections to it.
- **chem.sol.solubility**: Henry's law for gas solubility in liquids depends on partial pressure — a gas law concept applied to solutions.

## Cross-Subject Connections

- **Physics (phys.therm.ideal-gas-law)**: PV = nRT is shared with physics; in physics the form PV = NkBT (N = number of molecules, kB = Boltzmann constant) is also used.
- **Biology (bio.resp)**: gas exchange in lungs and tissues follows partial-pressure principles derived from the ideal gas law.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.state.gas-laws`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.state.gas-laws` as of 2026-07-23.

## Curriculum Feedback

None. The node correctly unlocks molar-mass-gas, real-gases, and solubility — all are genuine next-level applications of gas law concepts.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

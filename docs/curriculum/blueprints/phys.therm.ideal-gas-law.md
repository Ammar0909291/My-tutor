# Teaching Blueprint — phys.therm.ideal-gas-law

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.ideal-gas-law
name: Ideal Gas Law
domain: thermodynamics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.therm.zeroth-law
  - phys.therm.temperature
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.therm.kinetic-theory
  - phys.therm.thermodynamic-processes
  - phys.therm.internal-energy
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Why does a balloon expand when you heat it? Why does a bicycle tyre feel firmer on a hot day? Why can a sealed syringe resist being compressed? Three separate 17th-century experiments — Boyle's, Charles's, and Gay-Lussac's — each found a two-variable relationship. The ideal gas law combines all three into one equation: PV = nRT.

**Conceptual arc:**
1. Boyle's law (isothermal, T = const): PV = constant → P₁V₁ = P₂V₂.
2. Charles's law (isobaric, P = const): V/T = constant → V₁/T₁ = V₂/T₂ (T in Kelvin).
3. Gay-Lussac's law (isochoric, V = const): P/T = constant → P₁/T₁ = P₂/T₂ (T in Kelvin).
4. Combined gas law: PV/T = constant (for fixed amount of gas).
5. Avogadro's law: at the same T and P, equal volumes of all ideal gases contain the same number of moles.
6. Ideal gas law: PV = nRT. n = number of moles; R = 8.314 J/(mol·K) = universal gas constant.
7. Alternative form: PV = Nk_BT. N = number of molecules; k_B = R/N_A = 1.381 × 10⁻²³ J/K.
8. Standard conditions: STP (Standard Temperature and Pressure): T = 273.15 K = 0°C, P = 10⁵ Pa = 100 kPa. At STP, 1 mol ideal gas occupies V = RT/P = 8.314 × 273.15 / 10⁵ = 22.71 L (previously 22.4 L at old STP).
9. Ideal gas assumptions: point-like molecules, no intermolecular forces, elastic collisions. Real gases deviate at high P (van der Waals corrections).
10. Partial pressures (Dalton's law): in a gas mixture, P_total = P₁ + P₂ + … where P_i = n_i RT/V is the partial pressure of component i.

**Closing synthesis:** PV = nRT is a limit law — real gases obey it in the limit of low pressure and high temperature (few molecular interactions). Within this limit, it is extraordinarily precise and covers everything from bicycle tyres to atmosphere to stellar interiors. The critical skill is using absolute temperature (T in Kelvin) — using Celsius gives systematically wrong answers for every ratio or multiplicative calculation.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — tyre pressure)

**Scenario:** A car tyre has gauge pressure 2.20 atm at 15°C. After driving, tyre temperature rises to 45°C. Find the new gauge pressure. (1 atm = 101 325 Pa; atmospheric pressure P_atm = 1 atm)

**Step 1 — Absolute pressures.**
P₁ = (2.20 + 1.00) atm = 3.20 atm. (Gauge pressure + atmospheric = absolute.)

**Step 2 — Convert temperatures to Kelvin.**
T₁ = 15 + 273 = 288 K; T₂ = 45 + 273 = 318 K.

**Step 3 — Gay-Lussac's law (constant volume tyre).**
P₁/T₁ = P₂/T₂ → P₂ = P₁ × T₂/T₁ = 3.20 × 318/288 = 3.20 × 1.104 = 3.53 atm.

**Step 4 — New gauge pressure.**
P_gauge,2 = 3.53 − 1.00 = 2.53 atm.

**Answer:** Gauge pressure rises from 2.20 atm to 2.53 atm — a 15% increase. This is why tyres should be inflated when cold.

---

### WE-2 (Bridging — moles and density)

**Scenario:** A sealed container of volume 10.0 L holds nitrogen gas (N₂, M = 28 g/mol) at 300 K and 2.00 × 10⁵ Pa. Find: (a) number of moles, (b) mass of gas, (c) density.

**(a) Moles:**
PV = nRT → n = PV/(RT) = (2.00 × 10⁵ × 10.0 × 10⁻³) / (8.314 × 300) = 2000 / 2494.2 = 0.802 mol.

**(b) Mass:**
m = n × M = 0.802 × 28 = 22.5 g.

**(c) Density:**
ρ = m/V = 22.5 g / 10.0 L = 2.25 g/L = 2.25 kg/m³.

**Comparison:** At STP (0°C, 10⁵ Pa), ρ_N₂ = (28 g/mol)/(22.71 L/mol) = 1.23 g/L. Higher T and P both affect density; the doubling of pressure (×2) partially countered by T increase (×1.1) gives roughly ×1.8 density relative to STP.

**Answer:** n = 0.802 mol; m = 22.5 g; ρ = 2.25 g/L.

---

### WE-3 (Abstract — Dalton's law + partial pressures)

**Scenario:** A 5.0 L container holds a gas mixture at 25°C: 0.30 mol N₂ and 0.20 mol O₂. Find: (a) partial pressures, (b) total pressure, (c) mole fraction of each gas.

**(a) Partial pressures:**
P_N₂ = n_N₂RT/V = (0.30 × 8.314 × 298) / (5.0 × 10⁻³) = 743.4 / 0.005 = 148 680 Pa ≈ 1.49 × 10⁵ Pa.
P_O₂ = (0.20 × 8.314 × 298) / 0.005 = 99 120 Pa ≈ 0.99 × 10⁵ Pa.

**(b) Total pressure (Dalton's law):**
P_total = P_N₂ + P_O₂ = 1.49 + 0.99 = 2.48 × 10⁵ Pa.

**(c) Mole fractions:**
χ_N₂ = n_N₂ / n_total = 0.30/0.50 = 0.60; χ_O₂ = 0.20/0.50 = 0.40.
Note: P_i = χ_i × P_total. P_N₂ = 0.60 × 2.48 × 10⁵ = 1.49 × 10⁵ Pa ✓.

**Answer:** P_N₂ = 1.49 × 10⁵ Pa; P_O₂ = 0.99 × 10⁵ Pa; P_total = 2.48 × 10⁵ Pa; χ_N₂ = 0.60; χ_O₂ = 0.40.

---

## Component 3 — Misconception Engine

### MC-CELSIUS-IN-GAS-LAW

**Trigger signal:** Student uses T in Celsius in PV = nRT or in the ratio P₁/T₁ = P₂/T₂.

**Conflict evidence [P28]:** "Apply Charles's law in Celsius: a gas at 0°C doubles in temperature to 0°C → wait, that's the same. In Celsius, 0°C 'doubled' is 0°C — meaningless. In Kelvin: 273 K → 546 K (doubled). What is the new volume?"

*In Celsius: no change? In Kelvin: V doubles. The error is catastrophic for the 0°C starting point.*

**Bridge text [P30]:** "Charles's law says V/T = constant — this only makes sense if T = 0 corresponds to zero volume, which occurs at absolute zero (0 K = −273.15°C), not at 0°C. The Kelvin scale's zero is physically meaningful for this purpose. Celsius zero is just the freezing point of water — arbitrary."

**Replacement text [P31]:** "Rule: in any gas law involving T as a multiplicative quantity or ratio (PV = nRT, P₁/T₁ = P₂/T₂, V₁/T₁ = V₂/T₂), always convert T to Kelvin first. T[K] = T[°C] + 273. Failure to do this produces errors that range from minor (at high temperatures) to catastrophic (near 0°C)."

**Discrimination pairs [P33]:**
- "A gas at 27°C is heated to 54°C. By what factor does volume change at constant pressure?" → In Kelvin: 300 K → 327 K. V₂/V₁ = 327/300 = 1.09 — 9% increase. In Celsius: 54/27 = 2 — completely wrong.
- "At 0°C and 10⁵ Pa, PV = nRT: what is R × T?" → R × T = 8.314 × 273.15 = 2271 J/mol. If T = 0 (Celsius error): R × T = 0 → implies no pressure at all. Physically absurd.

**s6_path:** "T in gas laws is always Kelvin. There is no exception."

---

### MC-GAUGE-PRESSURE-IN-GAS-LAW

**Trigger signal:** Student plugs gauge pressure directly into PV = nRT without adding atmospheric pressure.

**Conflict evidence [P28]:** "A tyre at 'zero gauge pressure' is flat — atmospheric pressure, not vacuum. If you use P_gauge = 0 in PV = nRT, you get n = 0 moles of gas in the tyre. But there IS gas — at 1 atm absolute. What went wrong?"

**Bridge text [P30]:** "Gauge pressure is the pressure above atmospheric: P_gauge = P_absolute − P_atm. The gas law requires absolute pressure — the actual force per unit area exerted by the gas on the container walls. A 'flat' tyre still has gas at 1 atm absolute (0 gauge); an inflated tyre at 2 atm gauge has 3 atm absolute."

**Replacement text [P31]:** "Always convert gauge pressure to absolute pressure: P_abs = P_gauge + P_atm. In SI: P_atm = 101 325 Pa ≈ 10⁵ Pa = 1 bar ≈ 1 atm. Then use P_abs in PV = nRT. At the end, if the answer is required in gauge pressure, subtract P_atm again."

**Discrimination pairs [P33]:**
- "A cylinder is at 5.0 atm gauge. How many moles in 10 L at 300 K?" → P_abs = 6.0 atm = 6.08 × 10⁵ Pa. n = PV/RT = (6.08 × 10⁵ × 0.010)/(8.314 × 300) = 2.44 mol. If gauge used: P = 5 × 10⁵ → n = 2.00 mol — 20% error.
- "What does P_gauge = 0 mean physically?" → Tyre pressure equals atmospheric — not deflated to vacuum. Gas is still there at 1 atm absolute.

**s6_path:** "Gauge pressure = pressure above atmosphere. Gas law needs pressure exerted by the gas — always absolute."

---

## Component 4 — Diagnostic Probe Set

**P4-a (Kelvin conversion):** A gas is at 27°C. What is T in Kelvin?
*T = 27 + 273 = 300 K.*

**P4-b (Boyle's law):** A gas occupies 4.0 L at 2.0 atm. At constant T, pressure is reduced to 0.5 atm. Find new volume.
*P₁V₁ = P₂V₂ → V₂ = P₁V₁/P₂ = (2.0 × 4.0)/0.5 = 16 L.*

**P4-c (ideal gas law — find n):** A 2.0 L container holds gas at 150 kPa and 27°C. Find n.
*n = PV/RT = (1.5 × 10⁵ × 2.0 × 10⁻³)/(8.314 × 300) = 300/2494 = 0.1203 mol.*

**P4-d (combined gas law):** A balloon (V = 3.0 L, T = 300 K, P = 10⁵ Pa) rises to altitude where P = 0.4 × 10⁵ Pa and T = 250 K. Find new volume.
*P₁V₁/T₁ = P₂V₂/T₂ → V₂ = V₁ × (P₁/P₂) × (T₂/T₁) = 3.0 × (10⁵/0.4×10⁵) × (250/300) = 3.0 × 2.5 × 0.833 = 6.25 L.*

**P4-e (Dalton's law):** A 3.0 L vessel at 300 K contains 0.10 mol He and 0.15 mol Ar. Find total pressure.
*P_total = (n_He + n_Ar)RT/V = 0.25 × 8.314 × 300 / 0.003 = 623.55/0.003 = 207 850 Pa ≈ 2.08 × 10⁵ Pa.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "A sealed syringe is compressed to half its volume at constant temperature. What happens to the pressure?"

*Pressure doubles — Boyle's law.*

**Turn 2 [P06 concrete anchor]:** "Boyle, Charles, Gay-Lussac each found a two-variable relationship. What is the single equation that unifies all three?"

*PV = nRT — the unified ideal gas law.*

**Turn 3 [P28 conflict — MC-CELSIUS-IN-GAS-LAW]:** "A gas at 0°C is heated at constant pressure until temperature 'doubles.' Does volume double? Calculate in both Celsius and Kelvin."

*Celsius: 0 → 0 (nonsense). Kelvin: 273 → 546 K → volume doubles. Must use Kelvin.*

**Turn 4 [P30 bridge]:** "Kelvin zero = absolute zero = V → 0 for ideal gas. This makes T in gas laws physically meaningful as an absolute reference. Celsius zero is arbitrary (water's ice point)."

**Turn 5 [P51 check-in]:** "P_gauge vs P_absolute — what is the physical difference? Which goes into PV = nRT?"

*Absolute pressure — the actual pressure exerted by gas on container. P_abs = P_gauge + P_atm.*

**Turn 6 [P28 conflict — MC-GAUGE-PRESSURE]:** "Tyre at 0 gauge pressure: how many moles inside? Use PV = nRT with P_gauge = 0 vs. P_abs = 1 atm."

*P_gauge = 0 → n = 0 (absurd — tyre still has air). P_abs = 1 atm → n = PV/RT > 0. Must use absolute.*

**Turn 7 [P52 narrow]:** "List the four variables in PV = nRT. If three are known, you can always find the fourth. What are the units of R?"

*R = 8.314 J/(mol·K) = Pa·m³/(mol·K).*

**Turn 8 [P62 retrieval seed]:** "P4-d from memory: balloon at 3.0 L, 300 K, 10⁵ Pa rises to P = 0.4×10⁵ Pa, T = 250 K. New volume?"

*V₂ = 3.0 × (10⁵/0.4×10⁵) × (250/300) = 6.25 L.*

**Turn 9 [P36 mastery probe]:** "A scuba tank: V = 12 L, P_gauge = 200 atm, T = 20°C. Diver uses air at P_abs = 3 atm (at 20 m depth). If T stays constant, what volume of air (at 3 atm) can the tank provide?"

*P_abs_tank = 201 atm. Using Boyle's law (T constant): V_dive = P_tank × V_tank / P_dive = 201 × 12 / 3 = 804 L at 3 atm.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: syringe compression] → [P06 anchor: Boyle/Charles/Gay-Lussac → PV=nRT]
→ [MC-CELSIUS-IN-GAS-LAW: P28 conflict (0°C doubled) → P30 bridge → P31 replacement → P33 pairs]
→ [WE-1: tyre pressure temperature change]
→ [P51 check-in: gauge vs absolute pressure]
→ [MC-GAUGE-PRESSURE: P28 conflict (0 gauge tyre) → P30 → P31 → P33]
→ [WE-2: moles + density from P, V, T]
→ [P52 narrow: R units; four variables]
→ [WE-3: Dalton's law + partial pressures + mole fractions]
→ [P62 retrieval seed: P4-d balloon at altitude]
→ [P36 mastery probe: scuba tank Boyle's law]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with P₁V₁ = P₂V₂ (Boyle only), build intuition for inverse proportionality, then extend to temperature (Charles), then combine. Defer Dalton's law (WE-3) to a second session.

**S1 (knows PV=nRT, no unit discipline):** Force unit analysis on WE-2: what are the units of PV? Of nRT? Show they must match. Reveal gauge/absolute distinction as the "gotcha" that defeats students who just substitute.

**S4 (prereq gap — temperature/Kelvin weak):** Return to phys.therm.temperature. The Celsius-in-gas-law error (MC-CELSIUS-IN-GAS-LAW) is fatal here. P4-a (Kelvin conversion) diagnoses this.

**S6 (math anxiety):** Provide PV = nRT as the master formula. Use ratio form (P₁V₁/T₁ = P₂V₂/T₂) for simpler problems — it avoids computing n and R. Calculator throughout.

**S7 (overconfident):** Lead with the scuba tank mastery probe — requires both gauge→absolute conversion AND Boyle's law. Then WE-3 (Dalton's law — most S7 students know PV=nRT but not partial pressures).

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (Kelvin conversion) + P4-b (Boyle's law)
  - offset_days: 4
    format: P4-c (find n) + P4-d (combined gas law — balloon at altitude)
  - offset_days: 14
    format: P4-e (Dalton's law) + "tyre at 32°C gauge 2.5 atm; cooled to −10°C: find new gauge pressure"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.ideal-gas-law ✓
V-2  prerequisites listed in KG: phys.therm.zeroth-law, phys.therm.temperature ✓
V-3  bloom verb matches level (apply): "apply … find … calculate … derive" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 4: "C (anchor; difficulty 4 → C with accelerated P track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: kinetic-theory, thermodynamic-processes, internal-energy ✓
V-17 difficulty number 4 consistent with bloom=apply and estimated_hours=4 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```

# Teaching Blueprint — phys.therm.thermodynamic-processes

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.thermodynamic-processes
name: Thermodynamic Processes
domain: thermodynamics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.therm.first-law
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.therm.heat-engines
  - phys.therm.second-law
  - phys.therm.entropy
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** A gas in a cylinder can be compressed slowly and gently, or quickly and violently. It can be allowed to expand freely into a vacuum or against a piston. It can be heated by a flame or cooled by contact with ice. Each path produces a different final state and a different amount of work — yet the same starting and ending temperatures. Thermodynamic processes are the precise vocabulary for describing which path a system takes.

**Conceptual arc:**
1. Quasi-static process: infinitely slow, system always in equilibrium — an idealisation that allows P-V diagrams to be drawn as curves. Real processes approximate this limit when slow relative to the system's relaxation time.
2. The four standard processes on a P-V diagram:
   - **Isothermal** (T = const): hyperbola PV = const. W_by = nRT ln(V₂/V₁). ΔU = 0. Q = W_by.
   - **Isochoric** (V = const): vertical line. W = 0. ΔU = Q = nC_vΔT.
   - **Isobaric** (P = const): horizontal line. W_by = PΔV = nRΔT. Q = nC_pΔT. ΔU = nC_vΔT.
   - **Adiabatic** (Q = 0): steeper than isothermal (slope −γP/V vs −P/V for isothermal). PV^γ = const. W_by = (P₁V₁ − P₂V₂)/(γ−1) = nC_v(T₁ − T₂). ΔU = −W_by = nC_vΔT.
3. Comparing isothermal and adiabatic: for the same expansion from V₁ to V₂, T stays fixed for isothermal (external heat supplied) but drops for adiabatic (no heat, internal energy used). Adiabatic curve is steeper; pressure falls more for same volume increase.
4. Reversible vs. irreversible: reversible = quasi-static + no friction (ideal limit). Irreversible = real processes (sudden expansion, friction, heat across finite ΔT). Irreversible processes generate entropy.
5. Free expansion: gas expands into vacuum — no external pressure, so W_by = 0. If adiabatic (insulated), Q = 0, so ΔU = 0 (first law). For ideal gas: T unchanged. Irreversible — cannot be shown on P-V diagram as a curve.
6. Throttling: gas pushed through constriction — related to Joule-Thomson, effectively irreversible, isenthalpic (H = U + PV = constant).
7. Efficiency and work: the area enclosed by a cycle on P-V diagram equals the net work done per cycle. Shape of cycle determines efficiency ceiling (second law).

**Closing synthesis:** Thermodynamic processes are the grammar of engine design. By choosing which processes make up a cycle — and in what order — engineers control how much work is extracted per unit of heat absorbed. The four idealised processes provide exact, calculable cases; real processes approach these limits. The critical insight is that work = area under the P-V curve — so a process running along a higher pressure extracts more work for the same volume change.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — isothermal vs. adiabatic expansion comparison)

**Scenario:** 1.0 mol monatomic ideal gas (γ = 5/3) expands from V₁ = 2.0 L to V₂ = 6.0 L. T₁ = 300 K, P₁ = nRT₁/V₁ = (1)(8.314)(300)/(2 × 10⁻³) = 1.247 × 10⁶ Pa. Compare W_by for isothermal vs adiabatic expansion.

**Isothermal (T = 300 K = const):**
W_by = nRT ln(V₂/V₁) = 1 × 8.314 × 300 × ln(3) = 2494 × 1.0986 = 2740 J.
P₂_iso = nRT/V₂ = (1)(8.314)(300)/(6 × 10⁻³) = 4.16 × 10⁵ Pa.

**Adiabatic (Q = 0):**
PV^γ = const → P₂ = P₁(V₁/V₂)^γ = 1.247 × 10⁶ × (1/3)^(5/3) = 1.247 × 10⁶ × (0.333)^1.667.
(0.333)^1.667 = e^(1.667 × ln(0.333)) = e^(1.667 × (−1.099)) = e^(−1.832) = 0.1604.
P₂_ad = 1.247 × 10⁶ × 0.1604 = 2.00 × 10⁵ Pa.

T₂_ad = P₂V₂/(nR) = (2.00 × 10⁵ × 6 × 10⁻³)/(1 × 8.314) = 1200/8.314 = 144.3 K.
W_by_ad = nC_v(T₁ − T₂) = 1 × (3/2)(8.314) × (300 − 144.3) = 12.47 × 155.7 = 1942 J.

**Comparison:** Isothermal: W_by = 2740 J; Adiabatic: W_by = 1942 J. Isothermal extracts 41% more work — because heat input (from external reservoir) supplements the gas's own internal energy.

---

### WE-2 (Bridging — adiabatic formula derivation)

**Derive PV^γ = constant for a quasi-static adiabatic process.**

**Start:** First law for adiabatic: dU = −PdV (no Q).
For ideal gas: dU = nC_vdT.
Therefore: nC_vdT = −PdV.

**Using ideal gas law:** P = nRT/V → dP = nR(dT/V − TdV/V²).
Dividing nC_vdT = −PdV by the ideal gas law P:
C_v × (dT/T) = −(nR/n) × (dV/V) = −R × (dV/V).
dT/T = −(R/C_v)(dV/V) = −(γ−1)(dV/V).

**Integrate:**
ln T = −(γ−1) ln V + const → T × V^(γ−1) = const.
Using T = PV/(nR): (PV/nR) × V^(γ−1) = const → PV^γ = const. ✓

**Result:** Three adiabatic relations: PV^γ = const; TV^(γ−1) = const; T^γP^(1−γ) = const.

---

### WE-3 (Abstract — free expansion irreversibility)

**Scenario:** 1.0 mol ideal gas at 300 K expands freely (into vacuum) from V = 1.0 L to V = 3.0 L. (a) Find Q, W_by, ΔU, ΔT. (b) Compare to isothermal expansion over the same volume change.

**(a) Free expansion:**
No external pressure → W_by = 0. Insulated container → Q = 0. First law: ΔU = 0. Ideal gas: ΔU = nC_vΔT → ΔT = 0 → T_f = 300 K.

**(b) Comparison to isothermal (WE-1 type):**
Isothermal expansion 1 → 3 L at 300 K: W_by = nRT ln(3) = 1 × 8.314 × 300 × 1.099 = 2742 J; Q = 2742 J (heat absorbed).
Free expansion: W_by = 0, Q = 0.

**Same initial and final states (P, V, T all same for ideal gas at same T and V).**
Yet Q and W are completely different. This proves Q and W are path functions, not state functions.

**Irreversibility:** The free expansion cannot be run backward without external energy input — it is irreversible. Even though ΔU = 0 for both processes, the free expansion generates entropy (the gas spreads into larger volume spontaneously; it cannot spontaneously reconcentrate).

---

## Component 3 — Misconception Engine

### MC-ADIABATIC-STEEPER-OR-SHALLOWER

**Trigger signal:** Student draws the adiabatic curve flatter than or equal to the isothermal on a P-V diagram.

**Conflict evidence [P28]:** "For the same gas, expand isothermal and adiabatic from V₁ = 2 L. At V₂ = 6 L: isothermal P = P₁/3; adiabatic P = P₁ × (2/6)^(5/3) = P₁ × (1/3)^1.667. Which is lower pressure? Which curve dropped more?"

*Adiabatic: P₂ = P₁ × 0.1604; Isothermal: P₂ = P₁/3 = P₁ × 0.333. Adiabatic drops lower. Adiabatic curve is STEEPER (falls more rapidly).*

**Bridge text [P30]:** "Adiabatic is steeper because the gas cools as it expands (no heat input to maintain T), so pressure falls faster than along the constant-T isotherm. Slope of adiabatic on P-V: −γP/V = −(5/3)P/V. Slope of isothermal: −P/V. Since γ > 1, adiabatic is steeper by factor γ."

**Replacement text [P31]:** "On a P-V diagram: isothermal curve = hyperbola (PV = const); adiabatic = steeper hyperbola (PV^γ = const, γ > 1). For any expansion from the same starting point, the adiabatic curve lies BELOW the isothermal — same final V but lower final P and lower final T. Enclosing an engine cycle that includes both: isothermal runs near the top (high P) and adiabatic runs near the bottom (steeper drop)."

**Discrimination pairs [P33]:**
- "Which enclosed area is larger: a cycle bounded above by isothermal or by adiabatic?" → Bounded above by isothermal (higher P at every V) → larger area → more work.
- "Why do Carnot cycles use isothermal + adiabatic segments, not all-isothermal?" → All-isothermal: no cycle (single path). Adiabatic segments connect the two isothermal temperatures without heat exchange, completing the cycle efficiently.

**s6_path:** "Remember: adiabatic = steeper. Gas cools in adiabatic expansion, pressure drops faster."

---

### MC-FREE-EXPANSION-COOLS-GAS

**Trigger signal:** Student says "when gas expands freely into vacuum it cools down — expansion always cools."

**Conflict evidence [P28]:** "Apply first law to free expansion: no external pressure → W_by = ? Insulated → Q = ? What does ΔU = Q + W give for T?"

*W_by = 0 (no force); Q = 0 (insulated). ΔU = 0. For ideal gas: ΔU = nC_vΔT → ΔT = 0. Temperature unchanged.*

**Bridge text [P30]:** "Expansion cools gas when the gas does work against external pressure (W_by > 0 → ΔU decreases → T decreases). In free expansion into vacuum, no work is done (nothing to push against) and no heat is exchanged, so ΔU = 0 and T is unchanged for an ideal gas."

**Replacement text [P31]:** "Rule: expansion against external pressure → gas does positive work → T falls (adiabatic). Free expansion into vacuum → W_by = 0, Q = 0 → ΔU = 0 → T unchanged (ideal gas). Real gases: free expansion can warm or cool depending on intermolecular forces (Joule-Thomson above/below inversion temperature). Adiabatic expansion against a piston always cools."

**Discrimination pairs [P33]:**
- "Piston compressed adiabatically: does gas heat or cool?" → Heats — work done ON gas (W_on > 0, Q = 0) → ΔU > 0 → T rises.
- "Ideal gas pushed quickly through a small hole into a vacuum (free expansion): temperature after?" → Same as before. No work, no heat, ΔU = 0.

**s6_path:** "Expansion cools when there's something to push against. Into vacuum: nothing to push → no work done → T unchanged."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: first law):** For an adiabatic process, write the first law simplified. What is Q?
*Q = 0. First law: ΔU = W_on = −W_by.*

**P4-b (isothermal work):** 2.0 mol ideal gas expands isothermally at 400 K from 5 L to 10 L. Find W_by.
*W_by = nRT ln(V₂/V₁) = 2.0 × 8.314 × 400 × ln(2) = 6651 × 0.693 = 4609 J.*

**P4-c (adiabatic temperature):** Ideal gas (γ = 1.4) expands adiabatically from V₁ = 2 L, T₁ = 500 K to V₂ = 5 L. Find T₂.
*TV^(γ−1) = const → T₂ = T₁(V₁/V₂)^(γ−1) = 500 × (2/5)^0.4 = 500 × (0.4)^0.4. (0.4)^0.4 = e^(0.4 × ln0.4) = e^(0.4 × (−0.916)) = e^(−0.366) = 0.694. T₂ = 500 × 0.694 = 347 K.*

**P4-d (process identification):** A gas is compressed and its temperature rises without any heat being added. What process is this?
*Adiabatic compression (Q = 0, W_on > 0 → ΔU > 0 → T rises).*

**P4-e (free expansion):** 3.0 mol ideal gas expands freely from 2 L to 8 L in an insulated container. Find Q, W_by, ΔU, ΔT.
*Q = 0; W_by = 0; ΔU = 0; ΔT = 0.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "Name the four standard thermodynamic processes. For each, state which quantity is held constant."

*Isothermal (T); isochoric (V); isobaric (P); adiabatic (Q=0, not a simple state variable constant).*

**Turn 2 [P06 concrete anchor]:** "On a P-V diagram, draw a horizontal line, a vertical line, and a hyperbola. Match each to the appropriate process."

*Horizontal = isobaric. Vertical = isochoric. Hyperbola (PV=const) = isothermal. Adiabatic: steeper hyperbola.*

**Turn 3 [P28 conflict — MC-ADIABATIC-STEEPER-SHALLOWER]:** "Draw adiabatic starting at the same point as the isothermal. Which drops lower at V₂ = 3V₁?"

*Adiabatic drops lower (steeper). Compute P₂ for both from WE-1 numbers.*

**Turn 4 [P30 bridge]:** "Why does adiabatic pressure drop more? The gas cools without heat input; cold gas exerts less pressure at same volume than warm gas."

**Turn 5 [P51 check-in]:** "For isothermal expansion: what happens to ΔU? What happens to Q? Why must the gas absorb heat to expand isothermally?"

*ΔU = 0. Gas does work → needs Q to compensate.*

**Turn 6 [P28 conflict — MC-FREE-EXPANSION-COOLS]:** "Free expansion into vacuum: apply first law. Does gas cool?"

*No — W_by = 0 (no pressure to push against), Q = 0 → ΔU = 0 → T unchanged.*

**Turn 7 [P52 narrow]:** "Adiabatic expansion cools gas; free expansion doesn't change T. What is the difference physically?"

*Adiabatic expansion against piston: gas does work (W_by > 0) → ΔU < 0 → T drops. Free expansion: no work done.*

**Turn 8 [P62 retrieval seed]:** "P4-b: isothermal W_by for 2 mol, 400 K, 5→10 L. Two steps: formula then calculate."

*W_by = nRT ln(V₂/V₁) = 2 × 8.314 × 400 × ln2 = 4609 J.*

**Turn 9 [P36 mastery probe]:** "P4-c: 1.4-γ gas, adiabatic, V₁=2, T₁=500 → V₂=5 L. Find T₂. Then find ΔU if n = 1.5 mol, C_v = (5/2)R."

*T₂ = 347 K. ΔU = nC_vΔT = 1.5 × (5/2)(8.314) × (347−500) = 1.5 × 20.785 × (−153) = −4770 J. Gas lost internal energy doing work.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: four processes and their constants] → [P06 anchor: P-V diagram sketch matching]
→ [MC-ADIABATIC-STEEPER-SHALLOWER: P28 conflict → P30 bridge → P31 → P33]
→ [WE-1: isothermal vs adiabatic expansion comparison]
→ [P51 check-in: isothermal ΔU=0, Q=W_by reasoning]
→ [WE-2: adiabatic PV^γ = const derivation]
→ [MC-FREE-EXPANSION-COOLS: P28 conflict → P30 bridge → P31 → P33]
→ [P52 narrow: adiabatic vs. free expansion physical distinction]
→ [P62 retrieval seed: P4-b isothermal W_by]
→ [WE-3: free expansion vs. isothermal — state function proof]
→ [P36 mastery probe: adiabatic T₂ + ΔU]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Focus on the four processes as a vocabulary lesson with P-V diagram sketches. Emphasise which variables are zero in each case. Skip WE-2 derivation. WE-1 (comparison) gives intuition without full derivation.

**S1 (knows formulas, no conceptual ordering):** Ask: "Which process does more work for the same ΔV — adiabatic or isothermal? Predict before computing." Forces physical reasoning before formula application.

**S4 (prereq gap — first law weak):** Return to phys.therm.first-law. The simplification of first law for each process (Q=0 for adiabatic, W=0 for isochoric, ΔU=0 for isothermal) requires the first law to be secure.

**S6 (math anxiety):** Provide process table (constraint, simplified equations, P-V curve shape). Focus on P4-a, P4-d (process identification — no calculation needed). P4-e (free expansion — zero everything) is accessible without complex math.

**S7 (overconfident):** Lead with WE-2 (derivation of PV^γ = const from first principles). Most S7 students know the formula but not the derivation. Then WE-3 (free expansion path-function proof — subtle reasoning).

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (adiabatic first law) + P4-d (process identification from description)
  - offset_days: 4
    format: P4-b (isothermal W_by) + P4-e (free expansion — all zeros)
  - offset_days: 14
    format: P4-c (adiabatic T₂) + "which enclosed P-V cycle produces more work: rectangular or Carnot-shaped? Justify from area argument"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.thermodynamic-processes ✓
V-2  prerequisites listed in KG: phys.therm.first-law ✓
V-3  bloom verb matches level (apply): "apply … draw … compare … derive" ✓
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
V-16 cross_links pedagogically justified: heat-engines, second-law, entropy ✓
V-17 difficulty number 4 consistent with bloom=apply and estimated_hours=5 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```

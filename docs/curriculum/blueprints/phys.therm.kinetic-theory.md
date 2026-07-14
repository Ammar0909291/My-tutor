# Teaching Blueprint — phys.therm.kinetic-theory

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.kinetic-theory
name: Kinetic Theory of Gases
domain: thermodynamics
difficulty:
  label: proficient
  number: 4
bloom: analyze
prerequisites:
  - phys.therm.ideal-gas-law
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.therm.internal-energy
  - phys.therm.entropy
  - phys.stat.maxwell-boltzmann
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** PV = nRT is a perfectly accurate description of ideal gas behaviour, but it tells us nothing about WHY. Why does pressure increase with temperature? What exactly is temperature, at the molecular level? Kinetic theory answers these questions by deriving the macroscopic gas law from the microscopic motion of molecules — one of the great triumphs of 19th-century physics.

**Conceptual arc:**
1. Kinetic theory assumptions: N identical point molecules in a box, no intermolecular forces, perfectly elastic collisions with walls, random isotropic velocities.
2. Pressure derivation: a molecule with velocity v_x collides elastically with a wall → momentum change 2mv_x → force → pressure. Averaging over all molecules:
   P = (1/3)(N/V)m⟨v²⟩ = (1/3)ρ⟨v²⟩.
3. Connecting to ideal gas law: PV = Nk_BT and P = (1/3)(N/V)m⟨v²⟩ → (1/2)m⟨v²⟩ = (3/2)k_BT.
4. Temperature = average translational kinetic energy per molecule: KE_avg = (3/2)k_BT.
5. Root mean square speed: v_rms = √(3k_BT/m) = √(3RT/M). Typical values at 300 K: N₂ ≈ 515 m/s; H₂ ≈ 1930 m/s.
6. Equipartition theorem: each quadratic degree of freedom contributes (1/2)k_BT to average energy. Monatomic: 3 translational → U = (3/2)Nk_BT. Diatomic: +2 rotational → (5/2)k_BT. Polyatomic: +3 rotational → (3)k_BT.
7. Maxwell-Boltzmann speed distribution: f(v) ∝ v² exp(−mv²/(2k_BT)). Three characteristic speeds: v_mp (most probable) = √(2k_BT/m); v_avg = √(8k_BT/πm); v_rms = √(3k_BT/m). v_mp < v_avg < v_rms.
8. Mean free path: λ = 1/(√2 πd²n), where d = molecular diameter, n = number density. At STP: λ_N₂ ≈ 66 nm — molecule travels 66 nm on average between collisions.
9. Internal energy of ideal gas: U = f × (1/2)Nk_BT where f = degrees of freedom. For monatomic ideal gas: U = (3/2)nRT — depends only on T, not V.

**Closing synthesis:** Kinetic theory reveals temperature as the average kinetic energy of random molecular motion — one of the most beautiful results in physics. It explains WHY PV = nRT works (the derivation produces it from Newton's laws + statistics), and predicts new phenomena (equipartition, Maxwell distribution, mean free path) that the gas law alone cannot. The bridge between the microscopic (individual molecules) and the macroscopic (T, P, V) is statistical mechanics.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — v_rms calculation)

**Scenario:** Find v_rms for N₂ (M = 28 × 10⁻³ kg/mol) at 300 K and at 1200 K.

**Formula:** v_rms = √(3RT/M).

**At 300 K:**
v_rms = √(3 × 8.314 × 300 / 0.028) = √(7482.6/0.028) = √(267 236) ≈ 517 m/s.

**At 1200 K:**
v_rms = √(3 × 8.314 × 1200 / 0.028) = √(1 068 943) ≈ 1034 m/s.

**Ratio:** v_rms(1200)/v_rms(300) = √(1200/300) = √4 = 2. ✓ (v_rms ∝ √T — doubling is from T increasing 4×.)

**Context:** Sound speed in air at 300 K ≈ 343 m/s. N₂ molecules travel at 517 m/s — faster than sound, as expected (sound speed ≈ v_rms/√(γ) for an ideal gas).

---

### WE-2 (Bridging — equipartition and molar heat capacity)

**Derive:** Using equipartition, find C_v (molar heat capacity at constant volume) for:
(a) monatomic ideal gas (Ar, He), (b) diatomic ideal gas (N₂, O₂).

**(a) Monatomic gas:**
f = 3 (translational only — atoms have no rotation). U = (3/2)nRT.
C_v = (1/n)(dU/dT) = (3/2)R = 3/2 × 8.314 = 12.47 J/(mol·K).

**Measured:** He: C_v = 12.47 J/(mol·K); Ar: 12.47 J/(mol·K). ✓ Perfect agreement.

**(b) Diatomic gas (rigid rotor, above ~200 K):**
f = 5 (3 translational + 2 rotational; vibrational frozen out at room temperature).
U = (5/2)nRT → C_v = (5/2)R = 20.8 J/(mol·K).

**Measured:** N₂: C_v = 20.8 J/(mol·K); O₂: 20.9 J/(mol·K). ✓

**Note:** γ = C_p/C_v = (C_v + R)/C_v = (5/2 + 1)/(5/2) = 7/5 = 1.40 for diatomic — the value used in adiabatic gas calculations.

---

### WE-3 (Abstract — mean free path)

**Derive and calculate:** Find the mean free path for N₂ at STP (T = 273 K, P = 10⁵ Pa). Molecular diameter d = 3.7 × 10⁻¹⁰ m.

**Number density:**
n = N/V = P/(k_BT) = 10⁵ / (1.381 × 10⁻²³ × 273) = 10⁵ / (3.770 × 10⁻²¹) = 2.651 × 10²⁵ m⁻³.

**Mean free path:**
λ = 1/(√2 πd²n).
d² = (3.7 × 10⁻¹⁰)² = 1.369 × 10⁻¹⁹ m².
√2 π d² n = 1.414 × 3.1416 × 1.369 × 10⁻¹⁹ × 2.651 × 10²⁵
= 1.414 × 3.1416 × 3.628 × 10⁶ = 1.414 × 1.140 × 10⁷ = 1.612 × 10⁷.
λ = 1 / (1.612 × 10⁷) = 6.20 × 10⁻⁸ m = 62 nm.

**Answer:** λ ≈ 62 nm at STP — a molecule collides about every 62 nm of travel, which at 517 m/s means ~10⁹ collisions per second.

---

## Component 3 — Misconception Engine

### MC-TEMPERATURE-IS-TOTAL-ENERGY

**Trigger signal:** Student says "hotter gas has more total energy" as if this were the definition of temperature, or confuses average energy per molecule with total energy.

**Conflict evidence [P28]:** "Two containers: 1 mol monatomic gas at 400 K, and 2 mol of the same gas at 200 K. Which has higher temperature? Which has more total internal energy? Calculate U = (3/2)nRT for each."

*U₁ = (3/2)(1)(8.314)(400) = 4988 J. U₂ = (3/2)(2)(8.314)(200) = 4988 J. Equal total energy, but T₁ = 2T₂.*

**Bridge text [P30]:** "Temperature measures average kinetic energy per molecule: KE_avg = (3/2)k_BT. Total energy is U = N × (3/2)k_BT = (3/2)nRT — it depends on both T and n. Two systems can have the same total energy at different temperatures (if one has more molecules) or the same temperature at different total energies (different n)."

**Replacement text [P31]:** "T = (2/3) × KE_avg/k_B — temperature is the per-molecule average, not the total. The total internal energy is U = (3/2)nRT — it scales with both T and n. This is why a large cool system can have more total thermal energy than a small hot one (ocean vs. spark)."

**Discrimination pairs [P33]:**
- "5 mol of gas at 300 K vs. 1 mol at 1500 K: same T? Same U?" → 1 mol at 1500 K has T = 1500 K; 5 mol at 300 K has T = 300 K. But U₁ = (3/2)(1)(8.314)(1500) = 18 707 J; U₂ = (3/2)(5)(8.314)(300) = 18 707 J. Same U, different T.
- "Increasing n at constant T: does U increase?" → Yes — more molecules, same average energy per molecule → more total energy.

**s6_path:** "Temperature = per-molecule average. Total energy = per-molecule average × number of molecules."

---

### MC-ALL-MOLECULES-SAME-SPEED

**Trigger signal:** Student treats v_rms as the speed of every molecule, or ignores the Maxwell-Boltzmann distribution.

**Conflict evidence [P28]:** "If all molecules in a gas at 300 K had exactly v_rms = 517 m/s, what would happen to a gas sample over time — would it remain in equilibrium? Why might some molecules escape a liquid surface to become vapour even at T below boiling point?"

*Evaporation occurs at any temperature because some molecules in the distribution have enough energy to overcome intermolecular forces. If all had the same speed, evaporation would only occur at exactly the boiling point.*

**Bridge text [P30]:** "The Maxwell-Boltzmann distribution shows that speeds range from 0 to ∞ (continuous distribution). At any temperature, some molecules are very slow (near 0) and some very fast (far tail). The 'most probable' speed v_mp, 'average' speed v_avg, and 'root-mean-square' speed v_rms are all different. The tail of the distribution enables evaporation, reactions, and diffusion at any temperature."

**Replacement text [P31]:** "v_rms is the square root of the average of v². It is NOT the speed of any particular molecule. The distribution: v_mp < v_avg < v_rms (ratio approximately 1 : 1.128 : 1.225). The high-speed tail is physically crucial — it determines reaction rates (Arrhenius), evaporation rates, and stellar nucleosynthesis (protons tunnel through coulomb barrier in the fast tail)."

**Discrimination pairs [P33]:**
- "At 300 K, can any N₂ molecule have speed 5000 m/s (much greater than v_rms = 517 m/s)?" → Yes — the Maxwell-Boltzmann tail extends to any speed, though the probability is extremely small (∝ exp(−mv²/2k_BT)).
- "Why does doubling T increase reaction rates far more than doubling v_rms?" → Reaction rates depend on the high-speed tail (Boltzmann factor e^(−E_a/k_BT)); doubling T shifts the whole distribution, dramatically increasing the fraction in the fast tail.

**s6_path:** "v_rms is the statistical average — the distribution has a full spread. The fast tail does most of the interesting physical chemistry."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: ideal gas law):** What is k_B in terms of R and N_A? Evaluate k_B.
*k_B = R/N_A = 8.314 / (6.022 × 10²³) = 1.381 × 10⁻²³ J/K.*

**P4-b (KE and temperature):** What is the average translational kinetic energy of a single N₂ molecule at 300 K?
*KE = (3/2)k_BT = (3/2)(1.381 × 10⁻²³)(300) = 6.21 × 10⁻²¹ J.*

**P4-c (v_rms):** Find v_rms for He (M = 4.0 × 10⁻³ kg/mol) at 300 K. Compare to N₂.
*v_rms(He) = √(3 × 8.314 × 300 / 0.004) = √(1 869 150) ≈ 1368 m/s. v_rms(N₂) ≈ 517 m/s. He moves ~2.65× faster — lighter molecules move faster at same T.*

**P4-d (equipartition):** A diatomic gas has 5 degrees of freedom at room temperature. Find U per mole at 400 K.
*U/n = (5/2)RT = (5/2)(8.314)(400) = 8314 J/mol.*

**P4-e (Maxwell-Boltzmann):** Which of v_mp, v_avg, v_rms is largest? Give the ratio v_rms/v_mp.
*v_rms is largest. v_mp = √(2k_BT/m); v_rms = √(3k_BT/m). Ratio = √(3/2) ≈ 1.225.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "PV = nRT accurately describes ideal gas behaviour. But what IS temperature, at the molecular level? What makes a hot gas different from a cold gas of the same density?"

*Expected: molecules move faster. Probe: faster on average, or all of them faster?*

**Turn 2 [P06 concrete anchor]:** "A single molecule bouncing off a wall: it changes momentum by 2mv_x. If there are N molecules, all bouncing off a wall of area A, relate this to pressure."

*P = force/A = (N × 2mv_x) / (A × Δt) → leads to P = (1/3)(N/V)m⟨v²⟩.*

**Turn 3 [P30 bridge]:** "Match P = (1/3)(N/V)m⟨v²⟩ to PV = Nk_BT. What does ½m⟨v²⟩ equal?"

*(1/2)m⟨v²⟩ = (3/2)k_BT. Temperature IS average translational KE per molecule.*

**Turn 4 [P28 conflict — MC-TEMPERATURE-IS-TOTAL-ENERGY]:** "1 mol at 400 K vs. 2 mol at 200 K: which has higher temperature? Which has more total internal energy? Calculate U for each."

*Same U, different T. Temperature is per-molecule; U is total.*

**Turn 5 [P51 check-in]:** "Equipartition: each quadratic degree of freedom contributes (1/2)k_BT. How many degrees of freedom for a monatomic gas? For a diatomic at room temperature?"

*Monatomic: 3 (translational). Diatomic: 5 (3 trans + 2 rot).*

**Turn 6 [P28 conflict — MC-ALL-MOLECULES-SAME-SPEED]:** "If all molecules moved at exactly v_rms, could evaporation occur below the boiling point? Why does it in reality?"

*Evaporation needs high-speed molecules in the tail. Distribution, not single speed, enables it.*

**Turn 7 [P52 narrow]:** "Three characteristic speeds: v_mp < v_avg < v_rms. Which one do most molecules NOT move at, even though it's called 'most probable'?"

*v_mp is the mode of the distribution — the peak — but most molecules are not exactly at that speed. The distribution has a spread.*

**Turn 8 [P62 retrieval seed]:** "P4-c: v_rms for He vs N₂ at 300 K. Why is He faster?"

*v_rms ∝ 1/√M. He: M = 4; N₂: M = 28. v_He/v_N₂ = √(28/4) = √7 ≈ 2.65.*

**Turn 9 [P36 mastery probe]:** "A sample of Ar gas (M = 40 × 10⁻³ kg/mol) is at 500 K. Find: (a) v_rms, (b) average KE per molecule, (c) U per mole using equipartition."

*(a) v_rms = √(3 × 8.314 × 500 / 0.040) = √(311 775) ≈ 558 m/s. (b) KE = (3/2)k_BT = (3/2)(1.381×10⁻²³)(500) = 1.035 × 10⁻²⁰ J. (c) Monatomic: U/mol = (3/2)RT = (3/2)(8.314)(500) = 6235 J/mol.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: molecular-level meaning of temperature] → [P06 anchor: pressure derivation from molecule-wall collision]
→ [P30 bridge: ½m⟨v²⟩ = (3/2)k_BT — temperature as KE]
→ [MC-TEMPERATURE-IS-TOTAL-ENERGY: P28 conflict → P31 replacement → P33 pairs]
→ [WE-1: v_rms for N₂ at 300 K and 1200 K]
→ [P51 check-in: degrees of freedom — monatomic vs diatomic]
→ [WE-2: equipartition → C_v derivation for monatomic and diatomic]
→ [MC-ALL-MOLECULES-SAME-SPEED: P28 conflict (evaporation below boiling) → P30 bridge → P31 → P33]
→ [P52 narrow: three characteristic speeds and their ordering]
→ [P62 retrieval seed: v_rms ratio He vs N₂]
→ [WE-3: mean free path derivation and calculation]
→ [P36 mastery probe: Ar gas at 500 K — v_rms, KE, U per mole]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with the physical picture: hot = faster molecules. Establish KE = (3/2)k_BT as the result of the derivation (don't derive — state it). Focus on WE-1 (v_rms calculation) and P4-b/P4-c. Skip WE-3 (mean free path) and equipartition derivation.

**S1 (knows formula, no derivation awareness):** Ask: "PV = nRT was empirically measured. How do we KNOW the molecular kinetic energy formula (3/2)k_BT is correct and not just a fitting parameter?" Drives appreciation for the derivation as validation.

**S4 (prereq gap — ideal gas law weak):** Return to phys.therm.ideal-gas-law. The link PV = Nk_BT is essential; if k_B and its relation to R are not secure, P4-a fails and the derivation in the arc is inaccessible.

**S6 (math anxiety):** Focus on v_rms = √(3RT/M) as a useable formula. Provide M in kg/mol. Calculator throughout. Skip WE-3 (mean free path derivation). P4-b and P4-c are the core assessable skills.

**S7 (overconfident):** Lead with WE-3 (mean free path — non-standard, requires number density derivation). Then demand the full equipartition derivation for a linear triatomic molecule (CO₂: 7 degrees of freedom at high T → C_v = (7/2)R).

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (k_B definition) + P4-b (average KE at 300 K)
  - offset_days: 4
    format: P4-c (v_rms for He — requires M in correct units) + P4-d (equipartition U per mole)
  - offset_days: 14
    format: P4-e (three speeds ordering + ratio) + "derive C_v for diatomic gas from equipartition, then compute γ = C_p/C_v"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.kinetic-theory ✓
V-2  prerequisites listed in KG: phys.therm.ideal-gas-law ✓
V-3  bloom verb matches level (analyze): "derive … analyze … compare … explain" ✓
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
V-16 cross_links pedagogically justified: internal-energy, entropy, Maxwell-Boltzmann ✓
V-17 difficulty number 4 consistent with bloom=analyze and estimated_hours=5 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```

# Teaching Blueprint — phys.em.energy-capacitor

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.energy-capacitor
name: Energy Stored in a Capacitor
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.capacitance
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.em.dielectrics
  - phys.em.rc-circuits
  - phys.em.lc-circuits
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

A capacitor stores energy in the electric field between its plates — like a compressed spring stores mechanical energy. Charge it up, disconnect it from the source, and that energy stays there until you need it. Camera flashes use capacitors because they can dump a lot of energy very quickly — far faster than a battery alone. The energy stored is U = ½CV² — twice the voltage means four times the energy (it squares).

### Tier 2 — Conceptual / Mechanistic (S1)

**Three equivalent energy formulas:**
$$U = \frac{1}{2}CV^2 = \frac{Q^2}{2C} = \frac{1}{2}QV$$

**Derivation:** Charging a capacitor from 0 to final charge Q requires work. At intermediate charge q, the voltage is v = q/C. Adding a small extra charge dq requires work dW = v dq = q dq/C.
$$U = \int_0^Q \frac{q}{C}\, dq = \frac{Q^2}{2C} = \frac{1}{2}CV^2$$

**Energy density in the electric field:**
$$u_E = \frac{1}{2}\varepsilon_0 E^2 \quad [\text{J/m}^3]$$

For a parallel plate capacitor: U = u_E × Volume = ½ε₀E²(Ad).
Substitute E = V/d: U = ½ε₀(V/d)²(Ad) = ½ε₀V²A/d = ½CV² ✓

This field-energy-density perspective is powerful: energy is not stored on the plates, but in the electric field filling all space. This extends to all electromagnetic fields.

**Energy in LC oscillation:** Capacitor energy (electric) oscillates with inductor energy (magnetic) in LC circuits — the total is conserved (phys.em.lc-circuits).

**Practical capacitor energy:**
- Supercapacitor (1 F, 2.7 V): U = ½×1×2.7² = 3.6 J — small!
- 100 μF, 400 V (camera flash): U = ½×10⁻⁴×400² = 8.0 J — bright flash!
- Power grid capacitor bank: megajoules for reactive power compensation.

### Tier 3 — Formal

**Energy in terms of field (general):**
$$U_E = \frac{\varepsilon_0}{2}\int_\text{all space} E^2\, dV$$

This is the field energy — it accounts for all energy stored in the electric field everywhere in space, not just between the plates. For practical purposes (where E ≈ 0 outside the capacitor), this reduces to u_E × plate volume.

**Energy in dielectric medium:**
$$u_E = \frac{1}{2}\varepsilon E^2 = \frac{1}{2}\kappa\varepsilon_0 E^2 = \frac{D^2}{2\varepsilon} = \frac{1}{2}\vec{D}\cdot\vec{E}$$

**Energy released when capacitors share charge:** When two capacitors at different voltages are connected, charge redistributes until V₁ = V₂. The final energy is always less than the initial sum — the difference is dissipated in the resistance of the connecting wires (even if R → 0, energy loss is ΔU = ½C_eq(V₁−V₂)²/2 — finite and irreversible).

---

## Component 2 — Worked Examples

### WE-1 (Three forms of U)

**Problem:** A 40 μF capacitor is charged to 150 V. Find U using all three formulas.

**Worked solution:**

Form 1: U = ½CV² = ½(40×10⁻⁶)(150)² = ½(40×10⁻⁶)(22500) = **0.45 J**

Q = CV = (40×10⁻⁶)(150) = 6000 μC = 6×10⁻³ C

Form 2: U = Q²/(2C) = (6×10⁻³)²/(2×40×10⁻⁶) = 36×10⁻⁶/8×10⁻⁵ = **0.45 J** ✓

Form 3: U = ½QV = ½(6×10⁻³)(150) = **0.45 J** ✓

**Answer:** U = 0.45 J (all three forms give the same answer).

---

### WE-2 (Field energy density)

**Problem:** A parallel-plate capacitor has plates of area 50 cm² separated by 2.0 mm, with V = 800 V. Find: (a) E between plates, (b) energy density u_E, (c) total energy U from density, (d) verify with ½CV².

**Worked solution:**

*(a)* E = V/d = 800/(2×10⁻³) = **4×10⁵ V/m**

*(b)* u_E = ½ε₀E² = ½(8.854×10⁻¹²)(4×10⁵)² = ½(8.854×10⁻¹²)(1.6×10¹¹) = **0.708 J/m³**

*(c)* Volume = Ad = (50×10⁻⁴)(2×10⁻³) = 10⁻⁵ m³
U = u_E × V = (0.708)(10⁻⁵) = **7.08 × 10⁻⁶ J = 7.08 μJ**

*(d)* C = ε₀A/d = (8.854×10⁻¹²)(50×10⁻⁴)/(2×10⁻³) = **22.1 pF**
U = ½CV² = ½(22.1×10⁻¹²)(800)² = ½(22.1×10⁻¹²)(640000) = **7.07 μJ** ✓

**Answer:** E = 4×10⁵ V/m; u_E = 0.708 J/m³; U = 7.08 μJ

---

### WE-3 (Energy loss — two capacitors)

**Problem:** A charged 60 μF capacitor (V₀ = 200 V) is connected to an uncharged 40 μF capacitor. Find the final voltage and the fraction of energy lost.

**Worked solution:**

*Step 1 — Charge conservation:*
Q_initial = C₁V₀ = (60×10⁻⁶)(200) = 12×10⁻³ C
Final: Q_total = 12 mC; C_total = 60 + 40 = 100 μF
V_f = Q_total/C_total = 12×10⁻³/100×10⁻⁶ = **120 V**

*Step 2 — Initial and final energy:*
U_i = ½C₁V₀² = ½(60×10⁻⁶)(200)² = ½(60×10⁻⁶)(40000) = **1.20 J**
U_f = ½C_total V_f² = ½(100×10⁻⁶)(120)² = ½(100×10⁻⁶)(14400) = **0.72 J**

Energy lost: ΔU = 1.20 − 0.72 = 0.48 J

Fraction lost = 0.48/1.20 = **40%**

*Step 3 — Interpret:*
The lost energy is dissipated as heat in the connecting wires and as electromagnetic radiation (even with superconducting wires, charge redistribution is irreversible for this topology).

**Answer:** V_f = 120 V; 40% of initial energy dissipated.

---

## Component 3 — Misconception Profiles

### MC-ENERGY-STORED-ON-THE-PLATES

**Trigger signal:** Student says "energy is stored as charge on the plates" or "more charge = more energy stored, regardless of voltage."

**Conflict evidence [P28]:** "Same charge Q = 10 μC on two capacitors: C₁ = 10 μF (V = 1 V, U = 5×10⁻⁶ J), C₂ = 1 μF (V = 10 V, U = 5×10⁻⁵ J). Same Q, but C₂ stores 10× more energy. The energy is in the electric field (u_E = ½ε₀E²) — larger V → larger E → more energy per unit volume between the plates. Energy is distributed through the field, not sitting on the plates."

**Bridge text [P30]:** "Think of it like a compressed spring: the energy is in the deformation (the field), not in the mass of the spring (the charge). The charge on the plates is like the amount you've compressed the spring — but the energy depends on how hard it's compressed (the voltage, which scales with field strength)."

**Replacement text [P31]:** "Energy in a capacitor is stored in the electric field between the plates, with energy density u_E = ½ε₀E². The total energy U = ½CV² = Q²/(2C) — it depends on both Q and V (or equivalently, on E and volume between plates). The same charge Q stores different amounts of energy depending on the capacitance (and hence the field strength). The plates merely establish the boundary conditions for the field."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Energy stored in E field: U = ½CV² (depends on V²)" | "Energy stored in charge: U ∝ Q" |
| "Double Q, double V → U quadruples (U = ½QV)" | "Double Q → double U at fixed C" |
| "u_E = ½ε₀E² (field energy density)" | "Energy sitting on the plates as charge" |

**s6_path:** Compare: two capacitors with same Q but different C. Calculate U for each. Show that higher V (=Q/C, smaller C) gives much more energy even with the same Q.

---

### MC-CAPACITOR-DISCHARGES-INSTANTLY

**Trigger signal:** Student treats a capacitor as always having its full voltage or assumes it discharges and recharges instantaneously when connected to a circuit.

**Conflict evidence [P28]:** "Connect a 1000 μF capacitor charged to 10 V through a 10 kΩ resistor — an oscilloscope shows the voltage decays exponentially: V(t) = 10e^(−t/τ) with τ = RC = 10. After 10 s, V = 3.7 V; after 50 s, V ≈ 0.007 V. The capacitor does NOT discharge instantly — it follows the RC time constant τ = RC. For τ = 10 s, it takes about 5τ = 50 s to nearly fully discharge."

**Bridge text [P30]:** "A capacitor is like a bucket draining through a tap (resistor). A bigger bucket (larger C) takes longer to drain; a smaller tap opening (larger R) also takes longer. The time constant τ = RC determines how fast energy is released. Only in a short circuit (R = 0) does discharge approach instantaneous — and the energy is all dissipated in a spark."

**Replacement text [P31]:** "Capacitors charge and discharge over a characteristic time τ = RC. The voltage during discharge: V(t) = V₀e^(−t/RC). For large R or large C, discharge is slow; for small R (or short circuit), it's fast. Energy is released gradually, not instantaneously, in any circuit with finite resistance. Only in LC circuits does energy oscillate; in RC circuits it's gradually dissipated."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "V(t) = V₀e^(−t/RC): exponential decay" | "Capacitor discharges instantly" |
| "τ = RC: larger R or C → slower discharge" | "Resistance doesn't affect discharge speed" |
| "Energy dissipated over time as P = V²/R = CV²/2τ" | "All energy released in first instant" |

**s6_path:** Compute τ = RC for a given example. Show the exponential curve — "95% discharged" means t = 3τ, not t = 0⁺.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Write all three formulas for energy stored in a capacitor. When is each most convenient to use?

**Answer key:**
U = ½CV² — when V and C are given.
U = Q²/(2C) — when Q and C are given, no V.
U = ½QV — when both Q and V are known (avoids computing C separately).

---

### P4-b (Basic calculation)
A 100 μF capacitor is charged to 24 V. Find U.

**Answer key:** U = ½CV² = ½(100×10⁻⁶)(24)² = ½(10⁻⁴)(576) = **0.0288 J = 28.8 mJ**

---

### P4-c (Field energy density)
A parallel-plate capacitor (A = 0.01 m², d = 0.5 mm) has E = 2×10⁵ V/m between the plates. Find u_E and total U.

**Answer key:**
u_E = ½ε₀E² = ½(8.854×10⁻¹²)(4×10¹⁰) = **0.177 J/m³**
Volume = 0.01 × 5×10⁻⁴ = 5×10⁻⁶ m³
U = 0.177 × 5×10⁻⁶ = **8.85 × 10⁻⁷ J = 0.885 μJ**

---

### P4-d (Voltage change)
A capacitor has U = 0.50 J at 100 V. The voltage is doubled to 200 V. Find new U.

**Answer key:** U ∝ V² → U_new = U₀(200/100)² = 0.50 × 4 = **2.0 J** (quadruples)

---

### P4-e (Energy loss on connecting)
C₁ = 20 μF charged to 300 V; C₂ = 30 μF uncharged. They are connected in parallel. Find V_f and % energy lost.

**Answer key:**
Q_total = (20×10⁻⁶)(300) = 6×10⁻³ C
C_total = 50 μF; V_f = 6×10⁻³/50×10⁻⁶ = **120 V**
U_i = ½(20×10⁻⁶)(300)² = 0.9 J
U_f = ½(50×10⁻⁶)(120)² = 0.36 J
Loss = 0.54 J → **60% lost**

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "C = Q/V; where does energy in a capacitor come from? What happens when you charge a capacitor?"
  → [P06: concrete-anchor] — "Camera flash: capacitor charged slowly over seconds, discharged in milliseconds. Energy U = ½CV² — quadruples when V doubles."
  → [P41: diagnostic] — check if student knows energy is in the field, not just on the plates
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-ENERGY-STORED-ON-THE-PLATES, MC-CAPACITOR-DISCHARGES-INSTANTLY)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (all three energy formulas — same answer)
  → [P06: concrete-anchor] — WE-2 (field energy density: u_E = ½ε₀E²)
  → [P52: narrow] — "In WE-2: why is energy in the field, not on the plates?"
  → [P06: concrete-anchor] — WE-3 (energy loss when two capacitors connected)

[P36: mastery-probe] — P4-d (voltage change → energy) + P4-e (energy loss)
  → if < 80%: re-address U ∝ V² and charge conservation
  → if ≥ 80%: advance

[P51: check-in]
[P91: mastery-gate] — threshold 0.80
[P85: regulation-tail]
[P89: retrieval-schedule] — spacing: +1 day, +3 days, +7 days, +21 days
[P68: close]
```

---

## Component 6 — Assessment Items (Mastery Probes)

### AP-1 (Bloom: Remember)
State the energy density formula for the electric field and give its units.

**Answer:** u_E = ½ε₀E²; units J/m³. This applies to any electric field, not just between capacitor plates.

---

### AP-2 (Bloom: Understand)
If the plate separation of a capacitor is doubled (at fixed charge Q), what happens to C, V, E, and U?

**Answer:**
C = ε₀A/d → d doubles → C halves.
V = Q/C → V doubles.
E = V/d = Q/(ε₀A) → E is unchanged (E depends only on σ = Q/A, not d).
U = Q²/(2C) → C halves → U doubles.
The extra energy comes from the work done pulling the plates apart against the attractive electrostatic force.

---

### AP-3 (Bloom: Apply)
A defibrillator capacitor stores 200 J at 2500 V. Find C.

**Answer:** U = ½CV² → C = 2U/V² = 2×200/(2500)² = 400/6.25×10⁶ = **6.4 × 10⁻⁵ F = 64 μF**

---

### AP-4 (Bloom: Analyze)
A 10 μF capacitor (V₀ = 500 V) is connected in parallel to a 40 μF capacitor (V₀ = 100 V). Find V_f and total energy lost.

**Answer:**
Q₁ = (10×10⁻⁶)(500) = 5×10⁻³ C; Q₂ = (40×10⁻⁶)(100) = 4×10⁻³ C
Q_total = 9×10⁻³ C; C_total = 50 μF; V_f = 9×10⁻³/50×10⁻⁶ = **180 V**
U_i = ½(10⁻⁵)(500)² + ½(4×10⁻⁵)(100)² = 1.25 + 0.20 = 1.45 J
U_f = ½(5×10⁻⁵)(180)² = ½(5×10⁻⁵)(32400) = **0.81 J**
Energy lost = 1.45 − 0.81 = **0.64 J** (44% of initial energy)

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | U = ½CV²: compute U from given C and V |
| +3 days | Q²/(2C) and ½QV: use when V is not directly given |
| +7 days | u_E = ½ε₀E²: find total energy from field and geometry |
| +21 days | Two-capacitor energy loss: find V_f, U_f, % lost |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.capacitance` — C = Q/V = ε₀A/d; charging process

**Unlocked by this concept:**
- `phys.em.dielectrics` — energy changes when dielectric inserted (at fixed Q vs. fixed V)
- `phys.em.lc-circuits` — energy oscillates between capacitor (U_C) and inductor (U_L)

**Cross-domain links:**
- `phys.em.rc-circuits` — energy dissipated during charging/discharging
- `phys.mech.energy` — analogy with spring potential energy ½kx²

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 4, bloom = apply | PASS |
| V-4 | prerequisites in KG | PASS |
| V-5 | mastery_threshold = 0.80 | PASS |
| V-6 | estimated_hours = 3 | PASS |
| V-7 | cpa_entry_stage correct | PASS |
| V-8 | session_cap set | PASS |
| V-9 | Three tiers present | PASS |
| V-10 | ≥ 2 worked examples | PASS |
| V-11 | Exactly 2 MCs | PASS |
| V-12 | All 6 MC fields | PASS |
| V-13 | ≥ 5 practice items | PASS |
| V-14 | Valid Primitive codes | PASS |
| V-15 | ≥ 4 assessment items | PASS |
| V-16 | Retrieval schedule present | PASS |
| V-17 | Prereq/unlock map consistent | PASS |
| V-18 | No implementation changes | PASS |
| V-19 | No framework modifications | PASS |
| V-20 | status = READY | PASS |

**Blueprint status: PACKAGE_READY — all V-1..V-20 PASS**

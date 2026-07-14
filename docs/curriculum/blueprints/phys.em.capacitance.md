# Teaching Blueprint — phys.em.capacitance

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.capacitance
name: Capacitance
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.electric-potential
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.em.energy-capacitor
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

A capacitor is like a tiny rechargeable bucket for electric charge — it can store charge and release it quickly. Two metal plates facing each other, separated by a small gap: charge one plate positive, the other negative, and energy is stored in the electric field between them. **Capacitance** is how much charge you can store per volt of potential difference: C = Q/V. A large capacitance means you can store a lot of charge at a low voltage. Capacitors smooth voltage fluctuations in power supplies, store energy for camera flashes, and filter signals in circuits.

### Tier 2 — Conceptual / Mechanistic (S1)

**Definition:**
$$C = \frac{Q}{V}$$

where Q is the charge on one plate and V is the potential difference between the plates. Units: farad (F) = C/V. 1 farad is enormous — typical capacitors are μF, nF, or pF.

**Parallel-plate capacitor:**
$$C = \frac{\varepsilon_0 A}{d}$$

where A is the plate area, d is the plate separation. Increasing A or decreasing d increases C.

**Derivation:** E = σ/ε₀ = Q/(ε₀A) (from Gauss's Law); V = Ed = Qd/(ε₀A); C = Q/V = ε₀A/d. ✓

**Capacitors in combination:**
- Parallel: C_eq = C₁ + C₂ + ... (same V; charges add)
- Series: 1/C_eq = 1/C₁ + 1/C₂ + ... (same Q; voltages add)

**Charging and energy:**
When a capacitor is charged to voltage V, charge Q = CV is stored and energy U = ½CV² = ½QV = Q²/(2C) is stored in the electric field between the plates.

**Field energy density:**
$$u_E = \frac{1}{2}\varepsilon_0 E^2$$

Total energy: U = u_E × Volume = ½ε₀E² × (A·d) = ½ε₀(V/d)²(Ad) = ½ε₀V²A/d = ½CV² ✓

**Other geometries:**
- Spherical capacitor (inner radius a, outer b): C = 4πε₀ab/(b−a)
- Cylindrical capacitor (length L, radii a, b): C = 2πε₀L/ln(b/a)
- Isolated sphere of radius R: C = 4πε₀R (V = kQ/R → C = R/k = 4πε₀R)

### Tier 3 — Formal

**Capacitance from Poisson's equation:** For a known geometry, solve ∇²V = 0 between conductors with boundary conditions V₁ on one plate and V₂ on the other. Then C = Q/ΔV where Q = ε₀∮E·dA.

**Time constant:** When connected to a resistance R, capacitor charges with τ = RC (see phys.em.rc-circuits).

**Displacement current:** In a capacitor with changing V(t), the field between plates changes: ∂E/∂t ≠ 0. Maxwell added displacement current I_D = ε₀ d(EA)/dt = C dV/dt to Ampere's Law to maintain ∇·J + ∂ρ/∂t = 0. This predicts electromagnetic waves (Maxwell's equations → phys.em.electromagnetic-waves).

**Capacitance and conformal mapping:** 2D capacitor geometries solved analytically via complex potential methods — important in microelectronics design.

---

## Component 2 — Worked Examples

### WE-1 (Parallel plate — basic)

**Problem:** A parallel-plate capacitor has plates of area 0.04 m² separated by 2.0 mm. (a) Find C. (b) If connected to a 12 V battery, find Q and E between plates.

**Worked solution:**

*(a) Capacitance:*
$$C = \frac{\varepsilon_0 A}{d} = \frac{(8.854\times10^{-12})(0.04)}{2.0\times10^{-3}} = \frac{3.542\times10^{-13}}{2.0\times10^{-3}} = 1.77\times10^{-10}\text{ F} = 177\text{ pF}$$

*(b) Charge and field:*
$$Q = CV = (1.77\times10^{-10})(12) = 2.12\times10^{-9}\text{ C} = 2.12\text{ nC}$$
$$E = \frac{V}{d} = \frac{12}{2.0\times10^{-3}} = 6000\text{ V/m} = 6.0\text{ kV/m}$$

**Answer:** C = 177 pF; Q = 2.12 nC; E = 6.0 kV/m

---

### WE-2 (Combination — series and parallel)

**Problem:** Three capacitors: C₁ = 4 μF, C₂ = 6 μF, C₃ = 3 μF. C₁ and C₂ are in parallel; this combination is in series with C₃. Find C_eq and total charge stored if V = 24 V.

**Worked solution:**

*Step 1 — Parallel combination of C₁ and C₂:*
C₁₂ = C₁ + C₂ = 4 + 6 = 10 μF

*Step 2 — Series with C₃:*
$$\frac{1}{C_\text{eq}} = \frac{1}{C_{12}} + \frac{1}{C_3} = \frac{1}{10} + \frac{1}{3} = \frac{3+10}{30} = \frac{13}{30}$$
$$C_\text{eq} = \frac{30}{13} \approx 2.31\text{ μF}$$

*Step 3 — Total charge:*
Q = C_eq × V = (2.31×10⁻⁶)(24) = **55.4 μC**

**Answer:** C_eq = 2.31 μF; Q = 55.4 μC

---

### WE-3 (Energy stored)

**Problem:** A 50 μF capacitor is charged to 200 V. (a) Find stored energy. (b) The capacitor is disconnected from the battery and connected to an uncharged 50 μF capacitor. Find the final voltage and energy, and explain the energy discrepancy.

**Worked solution:**

*(a) Initial energy:*
$$U_i = \frac{1}{2}CV^2 = \frac{1}{2}(50\times10^{-6})(200)^2 = \frac{1}{2}(50\times10^{-6})(40000) = 1.0\text{ J}$$

*(b) After connecting to second capacitor:*
Charge is conserved: Q_i = CV = (50×10⁻⁶)(200) = 0.01 C
New C_eq = 50 + 50 = 100 μF (parallel)
New V_f = Q_i/C_eq = 0.01/(100×10⁻⁶) = 100 V

Final energy: U_f = ½C_eq V_f² = ½(100×10⁻⁶)(100)² = ½(10⁻⁴)(10⁴) = 0.5 J

Energy lost: ΔU = 1.0 − 0.5 = 0.5 J (50% lost!)

Energy is dissipated as heat (and some as electromagnetic radiation) in the connecting wire — even a zero-resistance wire loses energy because charge redistribution is irreversible when two capacitors at different voltages are connected directly.

**Answer:** V_f = 100 V; U_f = 0.5 J; 0.5 J dissipated in resistive/radiative losses.

---

## Component 3 — Misconception Profiles

### MC-SERIES-CAPACITORS-ADD-DIRECTLY

**Trigger signal:** Student applies C_eq = C₁ + C₂ for capacitors in series (confusing with resistors in parallel or capacitors in parallel).

**Conflict evidence [P28]:** "For two 4 μF capacitors in series: incorrect formula gives C_eq = 8 μF. Correct: 1/C_eq = 1/4 + 1/4 = 1/2 → C_eq = 2 μF. The series combination is always smaller than either capacitor. Physical reason: in series, the same charge Q must appear on each capacitor, but the voltage splits — more total voltage needed for the same charge, so effective C = Q/V_total is smaller."

**Bridge text [P30]:** "Series capacitors add like parallel resistors (reciprocals add). The mnemonic: capacitors combine opposite to resistors. Series capacitors → reciprocals add; parallel capacitors → values add directly. Physical reason: series → voltage splits (same Q), so the combined system requires more voltage → lower C. Parallel → charge adds (same V), so the combined system stores more charge → higher C."

**Replacement text [P31]:** "Capacitors in series: 1/C_eq = 1/C₁ + 1/C₂ + ... (reciprocals add; C_eq is smaller than each). Capacitors in parallel: C_eq = C₁ + C₂ + ... (values add; C_eq is larger than each). Series: same Q on each, voltages split. Parallel: same V across each, charges add. Remember: capacitors combine opposite to resistors."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Capacitors in series: 1/C_eq = 1/C₁ + 1/C₂" | "Capacitors in series: C_eq = C₁ + C₂" |
| "Series C_eq < each individual C" | "Series C_eq > each individual C" |
| "Capacitors in parallel: C_eq = C₁ + C₂" | "Capacitors in parallel: 1/C_eq = 1/C₁ + 1/C₂" |

**s6_path:** Draw the series circuit and emphasize: the same charge Q must flow onto each plate — so voltage adds V = V₁ + V₂, and C = Q/(V₁+V₂) is less than Q/V₁.

---

### MC-LARGER-PLATE-SEPARATION-INCREASES-CAPACITANCE

**Trigger signal:** Student reasons "more space between plates → more room for charge → higher capacitance."

**Conflict evidence [P28]:** "C = ε₀A/d — C is inversely proportional to d. Double the separation → C halves. Physical reason: larger d means the field E = V/d for the same V is weaker, so less charge accumulates on the plates (Q = CV = ε₀AV/d decreases). Or: for the same charge Q, the voltage V = Qd/(ε₀A) is larger — a lower C = Q/V. Larger d = harder to maintain the field = less charge stored per volt."

**Bridge text [P30]:** "Closer plates → stronger electric field for the same voltage → more charge held per volt → higher capacitance. Farther plates → field is weaker for the same V → less charge → lower capacitance. Think of it as the plates attracting each other: closer → stronger attraction → more charge can be held."

**Replacement text [P31]:** "Capacitance C = ε₀A/d decreases when plate separation d increases. Closer plates: same voltage creates a stronger field → more charge stored → higher C. Farther plates: same voltage creates weaker field → less charge → lower C. Increasing A increases C (more plate area for charge); increasing d decreases C."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "C = ε₀A/d → C decreases as d increases" | "Larger gap → more room → higher capacitance" |
| "Closer plates → stronger field for same V → more charge → higher C" | "Farther plates store more charge" |
| "C proportional to A, inversely proportional to d" | "C proportional to d" |

**s6_path:** Compute C for d = 1 mm and d = 2 mm with same A. Show C halves when d doubles.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Write: (a) the definition of capacitance, (b) the formula for a parallel-plate capacitor, (c) the energy stored in a capacitor.

**Answer key:**
(a) C = Q/V
(b) C = ε₀A/d
(c) U = ½CV² = ½QV = Q²/(2C)

---

### P4-b (Basic calculation)
A capacitor stores 60 μC at 300 V. Find C.

**Answer key:** C = Q/V = 60×10⁻⁶/300 = **0.20 μF = 200 nF**

---

### P4-c (Series and parallel)
Three 6 μF capacitors are connected: (a) all in parallel, (b) all in series. Find C_eq in each case.

**Answer key:**
(a) C_eq = 6 + 6 + 6 = **18 μF**
(b) 1/C_eq = 1/6 + 1/6 + 1/6 = 3/6 = 1/2 → C_eq = **2 μF**

---

### P4-d (Design — plate geometry)
A parallel-plate capacitor must have C = 10 nF and plate separation 0.5 mm. What plate area is needed?

**Answer key:** A = Cd/ε₀ = (10×10⁻⁹)(0.5×10⁻³)/(8.854×10⁻¹²) = 5×10⁻¹²/8.854×10⁻¹² = **0.565 m²** (quite large — why real capacitors use dielectrics to reduce size)

---

### P4-e (Energy)
A 200 μF capacitor charged to 50 V is discharged through a resistor. (a) Initial energy? (b) Final energy? (c) Where does the energy go?

**Answer key:**
(a) U_i = ½CV² = ½(200×10⁻⁶)(50)² = ½(200×10⁻⁶)(2500) = **0.25 J**
(b) U_f = 0 (fully discharged)
(c) Energy is dissipated as heat in the resistor (Joule heating, P = I²R, integrated over discharge time).

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What is electric potential? What does C = Q/V mean physically?"
  → [P06: concrete-anchor] — "Parallel plates: big area, small gap → stores more charge per volt. Camera flash: capacitor dumps charge in milliseconds — too fast for a battery."
  → [P41: diagnostic] — check if student knows series vs. parallel rules
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-SERIES-CAPACITORS-ADD-DIRECTLY, MC-LARGER-PLATE-SEPARATION-INCREASES-CAPACITANCE)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (parallel-plate: C, Q, E calculation)
  → [P06: concrete-anchor] — WE-2 (combination: series-parallel network)
  → [P52: narrow] — "In WE-2: which rule applies at each step? Series or parallel? How do you tell?"
  → [P06: concrete-anchor] — WE-3 (energy: ½CV²; energy loss when capacitors share charge)

[P36: mastery-probe] — P4-c (series and parallel) + P4-d (plate area design)
  → if < 80%: re-address C = ε₀A/d and series/parallel rules
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
State the combination rules for capacitors in series and parallel. How do they differ from resistors?

**Answer:** Series: 1/C_eq = Σ1/Cᵢ (C_eq less than smallest). Parallel: C_eq = ΣCᵢ (adds directly). This is opposite to resistors: series resistors add (R_eq = ΣRᵢ); parallel resistors use reciprocals (1/R_eq = Σ1/Rᵢ). Capacitors combine opposite to resistors.

---

### AP-2 (Bloom: Understand)
A charged capacitor is disconnected from a battery, and then the plates are pulled farther apart. What happens to V, Q, E, and U?

**Answer:** Q is conserved (no charge path). C = ε₀A/d → d increases → C decreases. V = Q/C → V increases. E = V/d: V increases but d increases too — E = Q/(ε₀A) = constant (E depends on surface charge density σ = Q/A, unchanged). U = Q²/(2C) → d increases → C decreases → U increases. The extra energy comes from the work done pulling the plates apart against the attractive electrostatic force.

---

### AP-3 (Bloom: Apply)
A 4 μF and an 8 μF capacitor are connected in series across a 120 V supply. Find: (a) C_eq, (b) total charge, (c) voltage across each capacitor.

**Answer:**
(a) 1/C_eq = 1/4 + 1/8 = 3/8 → C_eq = 8/3 ≈ **2.67 μF**
(b) Q = C_eq × V = (8/3×10⁻⁶)(120) = **320 μC**
(c) V₁ = Q/C₁ = 320×10⁻⁶/4×10⁻⁶ = **80 V**; V₂ = Q/C₂ = 320×10⁻⁶/8×10⁻⁶ = **40 V**; Check: 80+40 = 120 V ✓

---

### AP-4 (Bloom: Analyze)
Two capacitors C₁ = 3 μF (charged to 60 V) and C₂ = 6 μF (uncharged) are connected in parallel. Find the final voltage and the fraction of energy lost.

**Answer:**
Initial charge: Q₁ = (3×10⁻⁶)(60) = 180 μC; Q₂ = 0. Total Q = 180 μC.
C_eq = 3 + 6 = 9 μF. V_f = 180×10⁻⁶/9×10⁻⁶ = **20 V**
U_i = ½(3×10⁻⁶)(60)² = ½(3×10⁻⁶)(3600) = 5.4×10⁻³ J
U_f = ½(9×10⁻⁶)(20)² = ½(9×10⁻⁶)(400) = 1.8×10⁻³ J
Fraction lost = (5.4−1.8)/5.4 = 3.6/5.4 = **0.667 = 66.7%** dissipated.

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | C = Q/V and C = ε₀A/d: find C, Q, or V given the others |
| +3 days | Series and parallel combinations: find C_eq for mixed networks |
| +7 days | Energy U = ½CV²: find initial/final energy; explain losses |
| +21 days | Plate geometry: how changing A and d affects C, V, E, U |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.electric-potential` — V definition; E between plates; W = qΔV

**Unlocked by this concept:**
- `phys.em.energy-capacitor` — detailed energy analysis
- `phys.em.dielectrics` — effect of dielectric on C, E, V
- `phys.em.rc-circuits` — requires capacitance + Kirchhoff's laws

**Cross-domain links:**
- `phys.em.lc-circuits` — oscillations using L and C
- `phys.em.maxwells-equations` — displacement current through capacitor

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 4, bloom = apply | PASS |
| V-4 | prerequisites in KG | PASS |
| V-5 | mastery_threshold = 0.80 | PASS |
| V-6 | estimated_hours = 4 | PASS |
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

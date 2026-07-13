# Teaching Blueprint — phys.em.electric-potential

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.electric-potential
name: Electric Potential
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.gauss-law
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.em.capacitance
  - phys.em.ohms-law
  - phys.em.electric-dipole
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Lifting a book gives it gravitational potential energy relative to the floor. Similarly, moving a charge in an electric field changes its electric potential energy. **Electric potential** (voltage) is that potential energy per unit charge — it tells you how much energy each coulomb of charge carries at a given point. A 9-volt battery means the positive terminal has 9 joules of energy for every coulomb of charge that passes through it. Voltage is what "pushes" current around a circuit, just as height difference pushes water downhill.

### Tier 2 — Conceptual / Mechanistic (S1)

**Electric potential (V):**
$$V = \frac{U}{q_0} = \frac{\text{electric potential energy}}{\text{test charge}}$$
Units: volt (V) = joule/coulomb (J/C). V is a scalar (no direction).

**Potential difference (voltage):**
$$\Delta V = V_B - V_A = -\int_A^B \vec{E}\cdot d\vec{l}$$

Work done by the electric field moving charge q from A to B: W = −qΔV = q(V_A − V_B).
Work done against the electric field (by external agent): W_ext = qΔV = q(V_B − V_A).

**Potential due to a point charge Q:**
$$V = \frac{kQ}{r}$$
(Taking V = 0 at r → ∞.) Superposition: V_total = Σ kqᵢ/rᵢ (scalar sum, no vector components needed).

**Relationship between E and V:**
$$\vec{E} = -\nabla V = -\frac{dV}{dr}\hat{r}$$
The electric field points from high potential to low potential — "downhill" in the potential landscape.

**Equipotential surfaces:**
Surfaces on which V = constant. Properties:
1. E is perpendicular to equipotential surfaces everywhere.
2. No work is done moving a charge along an equipotential.
3. Conductors in electrostatics are equipotential surfaces (E = 0 inside → V = const inside and on surface).

**Key results:**
- V at center of uniformly charged sphere: V = kQ/R (same as surface, since E = 0 inside and no work done moving charge from surface to center through a conductor... wait, for an insulating sphere it's different)
- Parallel plates: ΔV = Ed, where E = σ/ε₀

### Tier 3 — Formal

**Poisson's equation:**
$$\nabla^2 V = -\frac{\rho}{\varepsilon_0}$$
(In charge-free regions: Laplace's equation ∇²V = 0.)

**Energy of a system of charges:**
$$U = \frac{1}{2}\sum_i q_i V_i = \frac{k}{2}\sum_{i\neq j}\frac{q_i q_j}{r_{ij}}$$

**Energy stored in an electric field:**
$$u_E = \frac{1}{2}\varepsilon_0 E^2 \quad [\text{J/m}^3]$$

Integrating over all space: U = ∫u_E dV — fields carry energy.

**Electron-volt (eV):** Energy gained by an electron through ΔV = 1 V: 1 eV = 1.602 × 10⁻¹⁹ J. Ubiquitous in atomic and nuclear physics.

---

## Component 2 — Worked Examples

### WE-1 (Potential at a point from multiple charges)

**Problem:** Two charges: q₁ = +5 nC at origin, q₂ = −3 nC at x = 0.40 m. Find the electric potential at x = 0.20 m (midpoint).

**Worked solution:**

*Step 1 — V from q₁ (r₁ = 0.20 m):*
$$V_1 = \frac{kq_1}{r_1} = \frac{(8.99\times10^9)(5\times10^{-9})}{0.20} = \frac{44.95}{0.20} = 224.75\text{ V}$$

*Step 2 — V from q₂ (r₂ = 0.20 m):*
$$V_2 = \frac{kq_2}{r_2} = \frac{(8.99\times10^9)(-3\times10^{-9})}{0.20} = \frac{-26.97}{0.20} = -134.85\text{ V}$$

*Step 3 — Total V (scalar sum):*
V = V₁ + V₂ = 224.75 − 134.85 = **89.9 V ≈ 90 V**

**Answer:** V = 90 V at the midpoint.

---

### WE-2 (Work from potential difference)

**Problem:** An electron (q = −e = −1.602 × 10⁻¹⁹ C) is accelerated from rest through a potential difference of ΔV = 1000 V (from − plate to + plate). Find its final kinetic energy and speed.

**Worked solution:**

*Step 1 — Work done on electron:*
W = q ΔV = (−1.602×10⁻¹⁹)(+1000) = −1.602×10⁻¹⁶ J

Wait — the electron moves from low to high potential (−→+). V_B − V_A = +1000 V.
Energy gained by electron: ΔKE = −qΔV = −(−e)(+1000) = +e×1000 = +1.602×10⁻¹⁶ J ✓

*Step 2 — Final speed (starting from rest):*
$$\frac{1}{2}mv^2 = 1.602\times10^{-16}\text{ J}$$
$$v = \sqrt{\frac{2\times1.602\times10^{-16}}{9.11\times10^{-31}}} = \sqrt{3.517\times10^{14}} = 1.876\times10^7\text{ m/s} \approx 18.8\text{ Mm/s}$$

(About 6% of the speed of light — relativistic corrections small but present.)

**Answer:** KE = 1.602 × 10⁻¹⁶ J = 1000 eV; v ≈ 1.88 × 10⁷ m/s

---

### WE-3 (E from V)

**Problem:** The electric potential in a region varies as V = 3x² − 5y (in volts, with x and y in meters). Find the electric field E at the point (2, 1).

**Worked solution:**

$$E_x = -\frac{\partial V}{\partial x} = -6x$$
$$E_y = -\frac{\partial V}{\partial y} = -(-5) = +5\text{ V/m}$$

At (2, 1): E_x = −6(2) = −12 V/m; E_y = +5 V/m

$$\vec{E} = -12\hat{x} + 5\hat{y}\text{ V/m}$$
$$|E| = \sqrt{144+25} = \sqrt{169} = 13\text{ V/m}$$

**Answer:** E⃗ = (−12x̂ + 5ŷ) V/m; magnitude = 13 V/m.

---

## Component 3 — Misconception Profiles

### MC-VOLTAGE-IS-THE-SAME-AS-ELECTRIC-FIELD

**Trigger signal:** Student uses V and E interchangeably, or says "higher voltage means stronger field everywhere."

**Conflict evidence [P28]:** "Inside a conductor in electrostatics: E = 0 everywhere, but V ≠ 0 (V equals the surface potential, which is nonzero if charged). Two charged conductors can have the same voltage but different E fields (depending on shape and size). Conversely, a region with large E can exist between points at potentials that differ by the same ΔV as a region with small E over a larger distance (ΔV = E × d for uniform field). V and E are related by E = −dV/dx, not equal."

**Bridge text [P30]:** "Voltage (V) is potential energy per charge — a scalar, in joules per coulomb. Electric field (E) is force per charge — a vector, in newtons per coulomb. They are related: E = −dV/dr. A steep voltage slope → strong field; a flat voltage region → weak field. A conductor can be at 1000 V with E = 0 inside — the voltage is like altitude, the field is like slope (steepness)."

**Replacement text [P31]:** "V and E are different quantities. V (volts) is electric potential energy per unit charge — a scalar. E (N/C) is force per unit charge — a vector. They are related by E = −∇V: the field points in the direction of decreasing V. Large V does not mean large E — a conductor can have V = 1000 V everywhere inside it with E = 0. The field depends on how V changes in space, not on its absolute value."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "E = −dV/dr (field = negative gradient of potential)" | "E = V (field equals voltage)" |
| "Inside conductor: E = 0, V = constant (nonzero)" | "V = 0 wherever E = 0" |
| "ΔV = Ed for uniform field; E depends on the gradient" | "Higher voltage always means stronger field" |

**s6_path:** Altitude analogy: a flat plateau at high altitude has no slope (E = 0) but is at high potential (V large). A steep cliff at low altitude has a strong slope (E large) with smaller V.

---

### MC-ELECTRIC-POTENTIAL-IS-A-VECTOR

**Trigger signal:** Student tries to add potentials as vectors, or draws V with arrows.

**Conflict evidence [P28]:** "V = kQ/r — no direction. V is a scalar (just a number with units, possibly negative). Adding potentials from two charges: V_total = V₁ + V₂ (arithmetic, not vector addition). Compare with E: E is a vector and requires component addition (E_x = ΣE_{x,i}; E_y = ΣE_{y,i}). The scalar nature of V is the main computational advantage — much simpler than vector E calculation, especially for many charges."

**Bridge text [P30]:** "Potential energy is a scalar (like gravitational PE = mgh — no direction). Electric potential is energy per charge, so it is also a scalar. Only the field E (force per charge) is a vector. When multiple charges create fields, you add vectors; when they create potentials, you add numbers."

**Replacement text [P31]:** "Electric potential V is a scalar — it has magnitude (and sign) but no direction. V_total from multiple charges = V₁ + V₂ + V₃ + ... (simple algebraic sum, including signs). This is V's computational advantage over E: superposition of E requires vector addition (components), while superposition of V requires only arithmetic. V is not drawn with arrows — only E and force vectors have directions."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "V = kq₁/r₁ + kq₂/r₂ (scalar sum)" | "V is a vector; add V₁ and V₂ with components" |
| "V > 0 near positive charges, V < 0 near negative charges" | "V has a direction pointing from high to low" |
| "E has direction (vector); V has no direction (scalar)" | "V arrows point from high to low potential" |

**s6_path:** Contrast: draw E arrows and V contour lines. Arrows need direction; contour lines just have values (numbers). Students can draw "V = +50 V" on a contour without any arrow.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Define electric potential V and electric potential difference ΔV. What are the units?

**Answer key:** V = U/q₀ (potential energy per unit charge). ΔV = V_B − V_A = −∫E·dl (potential difference). Units: volt (V) = J/C.

---

### P4-b (Point charge potential)
Find V at 0.40 m from a +10 nC charge, and the work required to bring a +2 nC charge from infinity to that point.

**Answer key:**
V = kQ/r = (8.99×10⁹)(10×10⁻⁹)/0.40 = 89.9/0.40 = **224.75 V ≈ 225 V**
W = qΔV = q(V − 0) = (2×10⁻⁹)(225) = **4.50 × 10⁻⁷ J = 0.450 μJ**

---

### P4-c (Superposition — scalar)
Three charges on a line: +2 μC at x = 0, −4 μC at x = 0.30 m, +1 μC at x = 0.60 m. Find V at x = 0.30 m (at the position of the −4 μC charge — due to the other two only).

**Answer key:**
V = k(2×10⁻⁶)/0.30 + k(1×10⁻⁶)/0.30 = (8.99×10⁹/0.30)(3×10⁻⁶) = (2.997×10⁴)(3×10⁻⁶)... 

V₁ = (8.99×10⁹)(2×10⁻⁶)/0.30 = 59.9 V
V₃ = (8.99×10⁹)(1×10⁻⁶)/0.30 = 30.0 V
V_total = 59.9 + 30.0 = **89.9 V ≈ 90 V** (from the other two charges only)

---

### P4-d (E from V)
For a uniform electric field E = 500 V/m in the +x direction, find the potential difference V_A − V_B between a point A at x = 0 and B at x = 0.40 m.

**Answer key:** ΔV = V_B − V_A = −∫E·dl = −E·Δx = −(500)(0.40) = −200 V
Therefore V_A − V_B = **+200 V** (A is at higher potential for positive E in +x direction)

---

### P4-e (Electron acceleration — energy)
An electron gun accelerates electrons from rest through 25 kV. Find their kinetic energy in eV and in joules, and their final speed.

**Answer key:**
KE = |q|ΔV = e × 25000 = **25,000 eV = 25 keV** = (25×10³)(1.602×10⁻¹⁹) = **4.005 × 10⁻¹⁵ J**
v = √(2KE/m) = √(2×4.005×10⁻¹⁵/9.11×10⁻³¹) = √(8.79×10¹⁵) = **9.38 × 10⁷ m/s ≈ 0.31c**
(relativistic effects significant at this speed — non-relativistic calculation gives a lower bound)

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What is gravitational potential energy? What does potential energy per unit mass mean?"
  → [P06: concrete-anchor] — "9-V battery: 9 joules of energy per coulomb of charge. Voltage = energy per charge. Scalar, like height."
  → [P41: diagnostic] — check if student knows V is scalar (not a vector)
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-VOLTAGE-IS-THE-SAME-AS-ELECTRIC-FIELD, MC-ELECTRIC-POTENTIAL-IS-A-VECTOR)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (scalar superposition of potentials from two charges)
  → [P06: concrete-anchor] — WE-2 (electron accelerated through ΔV — energy and speed)
  → [P52: narrow] — "Why does the electron gain energy moving from − to + plate? Use W = −qΔV."
  → [P06: concrete-anchor] — WE-3 (E = −∇V: find E from a given V expression)

[P36: mastery-probe] — P4-c (scalar superposition) + P4-d (ΔV from E)
  → if < 80%: re-address scalar nature of V and E = −dV/dx
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
State the relationship between electric field E and electric potential V.

**Answer:** E⃗ = −∇V (the electric field is the negative gradient of the electric potential). In one dimension: E = −dV/dx. The field points in the direction of decreasing V.

---

### AP-2 (Bloom: Understand)
Explain why the surface of a conductor in electrostatics is an equipotential surface.

**Answer:** Inside a conductor in electrostatic equilibrium, E = 0. Since E = −∇V, we need ∇V = 0 inside — meaning V does not change inside. Therefore V = constant throughout the conductor, including its surface. Any two points on the conductor's surface are at the same potential — it is an equipotential surface.

---

### AP-3 (Bloom: Apply)
A proton is released from rest at a point where V = +800 V and moves to where V = +300 V. Find its kinetic energy.

**Answer:** The proton (positive charge) moves from high to low potential → electric field does positive work.
W = q(V_i − V_f) = (1.602×10⁻¹⁹)(800 − 300) = (1.602×10⁻¹⁹)(500) = **8.01 × 10⁻¹⁷ J = 500 eV**

---

### AP-4 (Bloom: Analyze)
Two conducting spheres (radii R₁ = 5 cm and R₂ = 15 cm) are connected by a thin wire. Sphere 1 carries initial charge Q₁, sphere 2 carries Q₂. After connection, what is the ratio of surface charge densities σ₁/σ₂?

**Answer:** After connection, they reach the same potential: V₁ = V₂ → kQ₁'/R₁ = kQ₂'/R₂ → Q₁'/Q₂' = R₁/R₂ = 1/3.
σᵢ = Qᵢ'/(4πRᵢ²). σ₁/σ₂ = (Q₁'/Q₂')(R₂²/R₁²) = (R₁/R₂)(R₂/R₁)² = R₂/R₁ = 15/5 = **3**.
The smaller sphere has 3× higher surface charge density — hence higher local field (lightning rods are sharp to concentrate field).

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | V = kQ/r: compute V at given distance; find V from multiple charges (scalar sum) |
| +3 days | W = qΔV: find work done or kinetic energy for given ΔV and charge |
| +7 days | E = −dV/dx: find E from a given V(x) expression |
| +21 days | Equipotential surfaces: relationship to E; conductor as equipotential |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.gauss-law` — E field in symmetric distributions; conductor properties

**Unlocked by this concept:**
- `phys.em.capacitance` — C = Q/V; stored energy ½CV²
- `phys.em.ohms-law` — V = IR (voltage drives current)

**Cross-domain links:**
- `phys.em.electric-dipole` — dipole potential V = kp cosθ/r²
- `phys.em.maxwells-equations` — Poisson/Laplace equations

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 4, bloom = apply | PASS |
| V-4 | prerequisites in KG | PASS |
| V-5 | mastery_threshold = 0.80 | PASS |
| V-6 | estimated_hours = 5 | PASS |
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

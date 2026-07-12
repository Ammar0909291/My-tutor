# Teaching Blueprint — phys.em.electric-dipole

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.electric-dipole
name: Electric Dipole
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.electric-field
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.em.electric-potential
  - phys.em.dielectrics
  - phys.em.magnetic-dipole
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

A water molecule (H₂O) is not electrically neutral in a simple sense — the oxygen pulls electrons closer, making one end slightly negative and the other slightly positive. This is an **electric dipole**: two charges of equal magnitude but opposite sign, separated by a small distance. Dipoles are everywhere: water molecules, polar bonds in chemistry, antennas, the way molecules interact with each other. When you put a dipole in an electric field, it experiences a twisting force (torque) that tries to align it with the field — like a compass needle in Earth's magnetic field.

### Tier 2 — Conceptual / Mechanistic (S1)

**Dipole moment:**
$$\vec{p} = q\vec{d}$$

where q is the magnitude of each charge and d is the displacement vector from the negative to the positive charge. Units: C·m (SI) or debye (D): 1 D = 3.336 × 10⁻³⁰ C·m.

**Electric field of a dipole:**

Along the dipole axis (at distance r >> d):
$$E_\text{axial} = \frac{2kp}{r^3}$$

Along the perpendicular bisector (equatorial):
$$E_\text{equat} = \frac{kp}{r^3}$$

Both fall off as 1/r³ (faster than point charge 1/r²) — at large distances, the two charges nearly cancel.

**Torque on a dipole in a uniform field E:**
$$\vec{\tau} = \vec{p} \times \vec{E}$$
$$\tau = pE\sin\theta$$

where θ is the angle between p and E. Torque aligns p with E (stable equilibrium at θ = 0).

**Potential energy:**
$$U = -\vec{p}\cdot\vec{E} = -pE\cos\theta$$

Minimum U (most stable) when p ∥ E (aligned); maximum when p antiparallel to E.

**Force in a non-uniform field:**
$$\vec{F} = \nabla(\vec{p}\cdot\vec{E})$$

A dipole in a non-uniform field is attracted toward regions of stronger field. This explains why polar molecules are attracted to charged objects.

### Tier 3 — Formal

**Exact field of two point charges at arbitrary point:**
Use superposition: E = E₊ + E₋ = kq/r₊² r̂₊ − kq/r₋² r̂₋, then expand for r >> d (far-field multipole expansion). Leading term is the dipole term (1/r³); monopole (1/r²) vanishes because total charge = 0.

**Dipole radiation:**
An oscillating electric dipole (p = p₀ cos(ωt)) radiates electromagnetic waves with power:
$$P = \frac{\omega^4 p_0^2}{12\pi\varepsilon_0 c^3}$$
(Larmor formula for dipole radiation — basis for antenna theory and Rayleigh scattering.)

**Molecular dipole moments:** Water: p = 6.2 × 10⁻³⁰ C·m = 1.85 D. HCl: 1.08 D. CO₂: 0 D (symmetric, quadrupole, not dipole). The Stark effect: applied electric field splits atomic spectral lines by perturbing the dipole interaction.

---

## Component 2 — Worked Examples

### WE-1 (Dipole moment and field)

**Problem:** A dipole consists of +2 nC and −2 nC separated by 5.0 cm. (a) Find the dipole moment. (b) Find E on the axial line at 30 cm from the center.

**Worked solution:**

*Step 1 — Dipole moment:*
p = qd = (2×10⁻⁹)(5×10⁻²) = 1.0×10⁻¹⁰ C·m

*Step 2 — Axial field (r = 0.30 m >> d = 0.05 m: far-field OK):*
$$E_\text{axial} = \frac{2kp}{r^3} = \frac{2(8.99\times10^9)(1.0\times10^{-10})}{(0.30)^3} = \frac{1.798}{0.027} = 66.6\text{ N/C}$$

Direction: along the dipole axis, in the direction of p (from − to + charge, then continuing outward).

**Answer:** p = 1.0 × 10⁻¹⁰ C·m; E_axial = 66.6 N/C

---

### WE-2 (Torque on a dipole)

**Problem:** A dipole with p = 3.0 × 10⁻¹⁰ C·m is placed in a uniform electric field E = 5000 N/C. The dipole makes an angle of 30° with the field. Find the torque.

**Worked solution:**

$$\tau = pE\sin\theta = (3.0\times10^{-10})(5000)\sin30° = (1.5\times10^{-6})(0.5) = 7.5\times10^{-7}\text{ N·m}$$

Direction: the torque tends to rotate the dipole to align with E (reduce θ toward 0).

**Answer:** τ = 7.5 × 10⁻⁷ N·m (rotating dipole toward alignment)

---

### WE-3 (Potential energy change)

**Problem:** A dipole p = 2.0 × 10⁻¹⁰ C·m in field E = 3000 N/C is initially perpendicular to E (θ = 90°). It rotates to align with E (θ = 0°). Find the change in potential energy.

**Worked solution:**

*U = −pEcos θ*

U_initial = −pE cos(90°) = 0
U_final = −pE cos(0°) = −pE = −(2.0×10⁻¹⁰)(3000) = −6.0×10⁻⁷ J

ΔU = U_f − U_i = −6.0×10⁻⁷ − 0 = **−6.0 × 10⁻⁷ J**

The system loses potential energy (energy released as kinetic or to surroundings) as the dipole aligns — the aligned configuration is stable.

**Answer:** ΔU = −6.0 × 10⁻⁷ J (potential energy decreases; dipole aligns spontaneously if free to rotate)

---

## Component 3 — Misconception Profiles

### MC-DIPOLE-FIELD-FALLS-OFF-AS-INVERSE-SQUARE

**Trigger signal:** Student uses E ∝ 1/r² for dipole field, or expects dipole field to be as strong as a net charge at large distances.

**Conflict evidence [P28]:** "For a single charge Q, E = kQ/r² — the field falls off as 1/r². For a dipole (net charge = 0), the far-field formula gives E ∝ kp/r³ — one extra power of r in the denominator. At r = 10× the dipole size, the dipole field is 10× weaker than the 1/r² formula would predict. This extra falloff happens because the two opposite charges partially cancel at large distances."

**Bridge text [P30]:** "A dipole's positive and negative ends nearly cancel each other at large distances, because the field from one partially cancels the other. The surviving field is proportional to p/r³ — the farther you go, the more complete the cancellation. This is why the electric field outside a neutral polar molecule is much weaker at large distances than if the charges weren't paired."

**Replacement text [P31]:** "The far-field of an electric dipole falls off as 1/r³, not 1/r². For a monopole (net charge Q): E ∝ Q/r². For a dipole (net charge = 0, moment p = qd): E ∝ p/r³ (axial) and kp/r³ (equatorial). The stronger falloff reflects partial cancellation of the two opposite charges at large distances."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Dipole E ∝ 1/r³ (far field)" | "Dipole E ∝ 1/r² (same as point charge)" |
| "Axial: 2kp/r³; equatorial: kp/r³" | "E = kQ_net/r² = 0 for dipole (wrong)" |
| "Dipole field vanishes faster at large r than single charge" | "Dipole field is same as net charge at large r" |

**s6_path:** Calculate numerically: at r = 10 cm, compare E from a +2 nC charge vs. a dipole with p = 2nC × 5cm = 10⁻¹⁰ C·m. Show the huge difference.

---

### MC-TORQUE-ALIGNS-DIPOLE-INSTANTANEOUSLY

**Trigger signal:** Student says the dipole immediately snaps to alignment with E as soon as the field is applied, or doesn't account for oscillation.

**Conflict evidence [P28]:** "Torque τ = pE sinθ decreases as θ → 0 but never becomes negative until θ < 0 — there's no damping. In the absence of friction or damping, a dipole released at θ = 90° will oscillate through θ = 0 and beyond, like a pendulum — it doesn't stop at alignment. Only with damping (viscosity in a fluid, or radiation) does the dipole eventually settle at θ = 0."

**Bridge text [P30]:** "Torque provides angular acceleration, not instantaneous alignment. If the dipole is released from rest at θ = 90°, it speeds up as θ decreases, overshoots θ = 0, decelerates as torque reverses sign, and oscillates. This is exactly like a pendulum. Thermal environments provide damping — that's why molecular dipoles in a liquid partially align with applied fields, subject to thermal agitation."

**Replacement text [P31]:** "A dipole in a uniform field oscillates about the equilibrium direction (θ = 0) if released from rest at θ ≠ 0, much like a pendulum. Without damping, it never stops at θ = 0. With damping (friction, viscosity, radiation), it spirals toward the aligned position. The torque provides restoring angular acceleration, not instantaneous alignment."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Torque → angular acceleration → oscillation without damping" | "Dipole snaps to alignment as soon as field is applied" |
| "Equilibrium at θ = 0 (stable) and θ = 180° (unstable)" | "Any torque instantly aligns the dipole" |
| "Thermal energy competes with alignment in real molecules" | "Applied field fully aligns all molecular dipoles" |

**s6_path:** Pendulum analogy: pendulum displaced from vertical oscillates; dipole displaced from E direction oscillates. Damping is needed to settle.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Define: (a) electric dipole moment p, (b) its SI unit, (c) which direction p points.

**Answer key:** (a) p = qd, where q = charge magnitude, d = separation; (b) C·m; (c) from − to + charge (by convention).

---

### P4-b (Field calculation)
A dipole p = 5.0 × 10⁻¹¹ C·m. Find E at a point on the equatorial (perpendicular bisector) line at r = 0.20 m.

**Answer key:** E = kp/r³ = (8.99×10⁹)(5×10⁻¹¹)/(0.20)³ = (0.4495)/(0.008) = **56.2 N/C** (directed opposite to p on equatorial line)

---

### P4-c (Torque)
A water molecule has p = 6.2 × 10⁻³⁰ C·m. In field E = 1.0 × 10⁵ N/C at angle 60°, find the torque.

**Answer key:** τ = pE sinθ = (6.2×10⁻³⁰)(1.0×10⁵)sin60° = (6.2×10⁻²⁵)(0.866) = **5.37 × 10⁻²⁵ N·m**

---

### P4-d (Potential energy)
For the dipole in P4-c, find U at θ = 60° and at θ = 0°.

**Answer key:**
U(60°) = −pE cos60° = −(6.2×10⁻³⁰)(1.0×10⁵)(0.5) = **−3.1 × 10⁻²⁵ J**
U(0°) = −pE cos0° = −6.2×10⁻²⁵ = **−6.2 × 10⁻²⁵ J** (more negative = more stable)

---

### P4-e (Analysis — field comparison)
At what distance on the axial line does the dipole field (p = 2.0 × 10⁻¹⁰ C·m) equal 100 N/C?

**Answer key:** E = 2kp/r³ → r³ = 2kp/E = 2(8.99×10⁹)(2×10⁻¹⁰)/100 = 0.03596/100 = 3.596×10⁻⁴ → r = (3.596×10⁻⁴)^(1/3) = **0.0711 m ≈ 7.1 cm**

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What does the field of a single +Q charge look like? How does it change at large r?"
  → [P06: concrete-anchor] — "Water molecule: O pulls electrons → one end −, one end +. Put it in a field → it feels torque, tries to align. This is a dipole."
  → [P41: diagnostic] — check if student correctly expects 1/r² decay for a point charge
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-DIPOLE-FIELD-FALLS-OFF-AS-INVERSE-SQUARE, MC-TORQUE-ALIGNS-DIPOLE-INSTANTANEOUSLY)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (dipole moment and axial field)
  → [P06: concrete-anchor] — WE-2 (torque calculation)
  → [P52: narrow] — "Why does τ = 0 when θ = 0? What about θ = 180°?"
  → [P06: concrete-anchor] — WE-3 (potential energy change during alignment)

[P36: mastery-probe] — P4-b (equatorial field) + P4-d (potential energy)
  → if < 80%: re-address 1/r³ scaling and U = −pE cosθ
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
Write the formula for torque on a dipole in a uniform electric field. When is the torque zero?

**Answer:** τ = pE sinθ. Torque is zero when θ = 0 (stable equilibrium, aligned) or θ = 180° (unstable equilibrium, anti-aligned).

---

### AP-2 (Bloom: Understand)
Why does the dipole field fall off as 1/r³ rather than 1/r² at large distances?

**Answer:** At large distances, the fields from the + and − charges (each ∝ 1/r²) nearly cancel because they point in nearly opposite directions and the charges are nearly equidistant from the observation point. The residual (uncanceled) field is proportional to the separation d — the dipole moment p = qd — divided by an extra r, giving an overall 1/r³ dependence. The net charge is zero, so the leading monopole term vanishes; the dipole term (1/r³) dominates.

---

### AP-3 (Bloom: Apply)
A dipole p = 4.0 × 10⁻¹⁰ C·m is oriented at 45° to a field E = 2.0 × 10⁴ N/C. Find: (a) torque, (b) potential energy.

**Answer:**
(a) τ = pE sin45° = (4.0×10⁻¹⁰)(2.0×10⁴)(0.707) = **5.66 × 10⁻⁶ N·m**
(b) U = −pE cos45° = −(4.0×10⁻¹⁰)(2.0×10⁴)(0.707) = **−5.66 × 10⁻⁶ J**

---

### AP-4 (Bloom: Analyze)
Compare the electric field at distance r on the axial vs. equatorial line for the same dipole. If r = 0.10 m and p = 1.0 × 10⁻¹⁰ C·m, find both and state which is larger and why.

**Answer:**
E_axial = 2kp/r³ = 2(8.99×10⁹)(10⁻¹⁰)/(10⁻¹)³ = 1.798/10⁻³ = **1798 N/C**
E_equat = kp/r³ = 899/10⁻³ = **899 N/C**
Axial is exactly twice the equatorial. On the axis, both charges contribute fields that partially add (they're in the same direction at axial points); on the equatorial line, their fields partially cancel (components along the equatorial direction cancel, only perpendicular components add, giving half).

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | p = qd: compute dipole moment; E_axial = 2kp/r³ |
| +3 days | Torque τ = pE sinθ: find angle for max torque; find torque at 30° |
| +7 days | Potential energy U = −pE cosθ: stable/unstable equilibrium positions |
| +21 days | Compare dipole vs. monopole field at given r; explain 1/r³ falloff physically |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.electric-field` — superposition, E = F/q₀, direction rules

**Unlocked by this concept:**
- `phys.em.dielectrics` — polarisation of materials = many aligned dipoles
- `phys.em.magnetic-dipole` — analogous structure in magnetism

**Cross-domain links:**
- `phys.em.electric-potential` — potential of a dipole V = kp cosθ/r²
- `chem.polar-bonds` — molecular dipole moments in chemistry

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

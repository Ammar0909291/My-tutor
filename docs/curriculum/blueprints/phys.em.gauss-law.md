# Teaching Blueprint — phys.em.gauss-law

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.gauss-law
name: Gauss's Law
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.electric-field
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.em.electric-potential
  - phys.em.capacitance
  - phys.em.maxwells-equations
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Imagine you are inside a room, and outside the room is a source of light. You count how many light rays pass through the walls — no matter how oddly shaped the room is, the total number of rays escaping through the walls depends only on how much light the source emits, not on the shape of the room. Gauss's Law works the same way for electric field lines: **the total electric flux through any closed surface equals the total charge enclosed divided by ε₀**, regardless of the surface's shape. This lets you calculate electric fields for symmetric charge distributions without summing forces on each tiny patch.

### Tier 2 — Conceptual / Mechanistic (S1)

**Electric flux:**
$$\Phi_E = \int_S \vec{E}\cdot d\vec{A} = \int_S E\cos\theta\, dA$$

Flux is the "amount of electric field passing through a surface." Units: N·m²/C = V·m.

**Gauss's Law:**
$$\oint_S \vec{E}\cdot d\vec{A} = \frac{Q_\text{enc}}{\varepsilon_0}$$

The surface integral of E over any closed surface (Gaussian surface) equals the total enclosed charge divided by ε₀ = 8.854 × 10⁻¹² C²/(N·m²).

**Strategy for high-symmetry problems:**
1. Identify the symmetry (spherical, cylindrical, planar).
2. Choose a Gaussian surface matching that symmetry so E is uniform and parallel to dA everywhere.
3. Pull E out of the integral: Φ = E × A_surface.
4. Set equal to Q_enc/ε₀ and solve for E.

**Standard results from Gauss's Law:**

| Geometry | E (outside) | E (inside) |
|---|---|---|
| Point charge Q | kQ/r² | — |
| Uniformly charged sphere (Q, R) | kQ/r² (r > R) | kQr/R³ (r < R, if volume charge) |
| Conducting sphere | kQ/r² (r > R) | 0 |
| Infinite line (λ C/m) | λ/(2πε₀r) | — |
| Infinite plane (σ C/m²) | σ/(2ε₀) | — |
| Parallel plates | σ/ε₀ (between) | 0 (outside) |
| Conductor surface | σ/ε₀ (just outside) | 0 |

**Key insight — conductors in electrostatics:**
- Excess charge on a conductor resides entirely on its outer surface.
- E = 0 inside any conductor in electrostatic equilibrium (choose Gaussian surface just inside surface: Q_enc = 0, so E = 0).
- The field just outside a conductor surface is E = σ/ε₀ perpendicular to the surface.

### Tier 3 — Formal (Differential Form)

Gauss's Law in differential form (Maxwell's first equation):
$$\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}$$

where ρ is the volume charge density. This is exact and local — it relates the divergence of E at a point to the charge density at that point. The integral form follows from the divergence theorem (Gauss's theorem in vector calculus):
$$\oint_S \vec{E}\cdot d\vec{A} = \int_V (\nabla\cdot\vec{E})\, dV = \int_V \frac{\rho}{\varepsilon_0}\, dV = \frac{Q_\text{enc}}{\varepsilon_0}$$

**Why can't we solve for E directly?** Gauss's Law alone (∇·E = ρ/ε₀) does not uniquely determine E — we also need ∇×E = 0 (electrostatics) to remove the curl-freedom. Together with appropriate boundary conditions, the field is fully determined (uniqueness theorem).

---

## Component 2 — Worked Examples

### WE-1 (Spherical shell)

**Problem:** A thin spherical shell of radius R = 0.15 m carries total charge Q = +8 nC. Find E at: (a) r = 0.25 m (outside), (b) r = 0.08 m (inside).

**Worked solution:**

*Step 1 — Choose Gaussian surface: concentric sphere of radius r.*

*(a) Outside (r = 0.25 m):*
Spherical symmetry → E uniform and radially outward over the Gaussian sphere.
Φ = E(4πr²) = Q_enc/ε₀ = Q/ε₀

$$E = \frac{Q}{4\pi\varepsilon_0 r^2} = \frac{kQ}{r^2} = \frac{(8.99\times10^9)(8\times10^{-9})}{(0.25)^2} = \frac{71.9}{0.0625} = 1150\text{ N/C}$$

Direction: radially outward.

*(b) Inside (r = 0.08 m):*
Q_enc = 0 (all charge is on the shell at r = R, which is outside the Gaussian sphere at r < R).
Φ = E(4πr²) = 0 → **E = 0**

**Answer:** (a) E = 1150 N/C outward; (b) E = 0

---

### WE-2 (Infinite line charge)

**Problem:** An infinite straight wire carries linear charge density λ = +4 nC/m. Find E at r = 0.05 m from the wire.

**Worked solution:**

*Step 1 — Choose Gaussian surface: coaxial cylinder of radius r, length L.*

*Step 2 — Analyze flux:*
- Curved surface: E ∥ dA (by symmetry) → contributes E(2πrL)
- End caps: E ⊥ dA → no flux from end caps

*Step 3 — Q_enc = λL*

*Step 4 — Gauss's Law:*
$$E(2\pi r L) = \frac{\lambda L}{\varepsilon_0}$$
$$E = \frac{\lambda}{2\pi\varepsilon_0 r} = \frac{(4\times10^{-9})}{2\pi(8.854\times10^{-12})(0.05)} = \frac{4\times10^{-9}}{2.785\times10^{-12}} = 1436\text{ N/C}$$

**Answer:** E = 1436 N/C radially outward from the wire

---

### WE-3 (Conducting sphere)

**Problem:** A solid conducting sphere of radius R = 0.10 m carries charge Q = +6 nC. Find E at: (a) r = 0.20 m, (b) r = 0.05 m (inside the conductor).

**Worked solution:**

*(a) Outside (r = 0.20 m) — identical to point charge:*
$$E = \frac{kQ}{r^2} = \frac{(8.99\times10^9)(6\times10^{-9})}{(0.20)^2} = \frac{53.9}{0.04} = 1348\text{ N/C}$$

*(b) Inside conductor:*
In electrostatic equilibrium, all charge resides on surface → Q_enc (Gaussian surface inside conductor) = 0.
**E = 0** inside the conductor.

**Answer:** (a) E = 1348 N/C outward; (b) E = 0

---

## Component 3 — Misconception Profiles

### MC-GAUSS-LAW-ONLY-WORKS-FOR-SPHERES

**Trigger signal:** Student says Gauss's Law only applies to spherical charge distributions, or thinks they must have a spherical Gaussian surface.

**Conflict evidence [P28]:** "Gauss's Law ∮E·dA = Q_enc/ε₀ holds for any closed surface, with any shape of charge distribution — it is an exact law of electrostatics. However, it is only useful for calculation (allowing E to be pulled out of the integral) when the problem has sufficient symmetry so that E is uniform and perpendicular to the surface. For arbitrary charge distributions, Gauss's Law is still valid but not useful for finding E directly."

**Bridge text [P30]:** "Gauss's Law is always true — it is a fundamental law like conservation of energy. Its practical power for calculation appears only when the symmetry makes E constant and perpendicular on the chosen Gaussian surface. Three symmetries work: spherical (use sphere), cylindrical (use cylinder), planar (use pillbox). For irregular distributions, use superposition instead."

**Replacement text [P31]:** "Gauss's Law is universal — it holds for any closed surface and any charge distribution. The Gaussian surface can be any shape you choose; it is a mathematical tool. The practical limitation is that E must be constant in magnitude and direction on parts of the surface to pull it out of the integral. This is guaranteed only for spherical, cylindrical, or planar symmetry."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Gauss's Law holds for any closed surface" | "Gauss's Law only applies to spherical distributions" |
| "Choose Gaussian surface to match charge symmetry" | "Gaussian surface must always be a sphere" |
| "For an irregular charge: Gauss's Law is true but not useful for finding E" | "Gauss's Law fails for non-spherical distributions" |

**s6_path:** Use the light-source analogy: no matter how oddly shaped the room, total rays out = total emitted. Shape of room (surface) doesn't matter for the count; it matters for the calculation strategy.

---

### MC-E-FIELD-INSIDE-CONDUCTOR-IS-NOT-ZERO

**Trigger signal:** Student says "the field inside a conductor is weak but not zero" or applies E = kQ/r² inside a charged sphere.

**Conflict evidence [P28]:** "If E ≠ 0 inside a conductor, free electrons would experience a force and move — but we assumed electrostatic equilibrium (charges at rest). Moving charges contradict the assumption. Therefore, in electrostatic equilibrium, E must be exactly zero everywhere inside a conductor. Experiment confirms: a Faraday cage blocks external fields; electric field inside a hollow conductor is zero even when the outside is highly charged."

**Bridge text [P30]:** "The Faraday cage works because any external field drives electrons to rearrange on the surface until their field exactly cancels the external field inside. This self-adjustment is instantaneous (on a microsecond timescale for metals) and always achieves E = 0 inside. Michael Faraday demonstrated this by sitting in a metal cage during lightning storms."

**Replacement text [P31]:** "In electrostatic equilibrium, the electric field inside any conductor is exactly zero. Proof: a non-zero E would exert forces on free electrons, causing them to move — violating the static assumption. The electrons redistribute on the surface until the internal field is exactly cancelled. E = 0 inside a conductor in electrostatics is exact, not approximate."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "E = 0 exactly inside a conductor in electrostatic equilibrium" | "E is reduced but not zero inside a conductor" |
| "Gauss's Law: Gaussian surface inside conductor → Q_enc = 0 → E = 0" | "E = kQ/r² applies inside a conducting sphere" |
| "Faraday cage: external fields don't penetrate the conductor" | "A Faraday cage only blocks most of the field" |

**s6_path:** Gauss's Law proof: draw Gaussian surface just inside the conductor surface; Q_enc = 0 (all charge on outside surface); therefore E = 0 by Gauss's Law.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
State Gauss's Law in integral form and define every symbol.

**Answer key:** ∮E·dA = Q_enc/ε₀; E = electric field (N/C); dA = outward area element (m²); Q_enc = charge enclosed by the closed surface (C); ε₀ = 8.854×10⁻¹² C²/(N·m²).

---

### P4-b (Spherical shell)
A thin shell of radius 20 cm carries +5 nC. Find E at r = 10 cm and r = 30 cm.

**Answer key:**
r = 10 cm (inside): Q_enc = 0 → E = **0**
r = 30 cm (outside): E = kQ/r² = (8.99×10⁹)(5×10⁻⁹)/(0.30)² = 44.95/0.09 = **499 N/C** outward

---

### P4-c (Infinite plane)
An infinite plane has surface charge density σ = 3.0 μC/m². Find E on either side.

**Answer key:** E = σ/(2ε₀) = (3.0×10⁻⁶)/(2×8.854×10⁻¹²) = 3.0×10⁻⁶/1.771×10⁻¹¹ = **1.69 × 10⁵ N/C**, directed away from the plane on each side.

---

### P4-d (Solid sphere — inside field)
A uniformly charged solid sphere of radius R = 0.20 m has total charge Q = +10 nC. Find E at r = 0.10 m (inside).

**Answer key:** For uniform volume charge: Q_enc at r = Q(r/R)³ = 10×10⁻⁹×(0.10/0.20)³ = 10×10⁻⁹×0.125 = 1.25×10⁻⁹ C
E = kQ_enc/r² = (8.99×10⁹)(1.25×10⁻⁹)/(0.10)² = 11.24/0.01 = **1124 N/C** outward.
(Equivalently: E = kQr/R³ = (8.99×10⁹)(10⁻⁸)(0.10)/(0.20)³ = 89.9×0.10/0.008 = 1124 N/C ✓)

---

### P4-e (Conductor)
A hollow conducting shell (inner radius 5 cm, outer radius 8 cm) encloses a point charge +3 nC at its center. Find E at: (a) r = 3 cm, (b) r = 6 cm (inside conductor), (c) r = 15 cm.

**Answer key:**
(a) Inside hollow, outside point charge: Gaussian sphere at r = 3 cm: Q_enc = +3 nC → E = kQ/r² = (8.99×10⁹)(3×10⁻⁹)/(0.03)² = 26.97/0.0009 = **29,967 ≈ 3.0 × 10⁴ N/C**
(b) Inside conductor (5 < r < 8 cm): E = **0** (electrostatic equilibrium)
(c) Outside shell: inner surface has induced −3 nC, outer surface has +3 nC (total shell charge = 0 if uncharged). Total enclosed at r = 15 cm: Q_enc = +3 nC + (−3 nC + 3 nC) = +3 nC → E = kQ/r² = (8.99×10⁹)(3×10⁻⁹)/(0.15)² = 26.97/0.0225 = **1198 N/C ≈ 1.2 × 10³ N/C**

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What is electric flux? How many field lines pass through a closed surface if no charge is enclosed?"
  → [P06: concrete-anchor] — "Light source in a room: rays out = total emitted. Shape of room doesn't matter. Same for electric field lines and Gauss's Law."
  → [P41: diagnostic] — check if student understands that Q_enc determines flux, not charge outside the surface
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-GAUSS-LAW-ONLY-WORKS-FOR-SPHERES, MC-E-FIELD-INSIDE-CONDUCTOR-IS-NOT-ZERO)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (spherical shell — inside and outside)
  → [P06: concrete-anchor] — WE-2 (line charge — cylindrical Gaussian surface)
  → [P52: narrow] — "In WE-2, why does the end-cap flux vanish? What symmetry ensures E is tangential there?"
  → [P06: concrete-anchor] — WE-3 (conducting sphere — inside = 0, outside = point charge)

[P36: mastery-probe] — P4-d (inside solid sphere) + P4-e (conductor with enclosed charge)
  → if < 80%: re-address Gaussian surface strategy and Q_enc calculation
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
State Gauss's Law and explain what Q_enc means.

**Answer:** ∮E·dA = Q_enc/ε₀. Q_enc is the total electric charge enclosed within the closed Gaussian surface — charges outside the surface contribute zero net flux through the surface.

---

### AP-2 (Bloom: Understand)
Explain why excess charge on a conductor in electrostatic equilibrium resides only on the outer surface (not in the interior).

**Answer:** If charge existed in the interior, a Gaussian surface just inside the conductor (but surrounding the interior charge) would give Q_enc ≠ 0, requiring E ≠ 0 inside — which contradicts electrostatic equilibrium (E = 0 inside). The only consistent solution is Q_enc = 0 for all Gaussian surfaces inside the conductor → no charge in the interior → all charge on the outer surface.

---

### AP-3 (Bloom: Apply)
An infinite sheet of charge has σ = −6.0 μC/m². Find the magnitude and direction of E on both sides.

**Answer:** E = |σ|/(2ε₀) = (6.0×10⁻⁶)/(2×8.854×10⁻¹²) = **3.39 × 10⁵ N/C**. Direction: toward the sheet on both sides (negative σ → field points into the sheet).

---

### AP-4 (Bloom: Analyze)
A uniformly charged solid sphere (Q total, radius R) has E = kQr/R³ inside. At what internal radius r is E maximum and equal to the external field just at the surface?

**Answer:** At r = R: E_inside = kQR/R³ = kQ/R² = E_outside (at r = R). So the field is continuous at the surface. Inside, E increases linearly with r (maximum at surface); outside, E decreases as 1/r². The maximum E is at r = R: E_max = kQ/R².

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | State Gauss's Law; apply to spherical shell (inside and outside) |
| +3 days | Line charge: choose Gaussian cylinder, apply Gauss's Law |
| +7 days | E inside conductor = 0: proof from Gauss's Law + equilibrium |
| +21 days | Multi-region problem (conductor with enclosed charge): find E in each region |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.electric-field` — E field definition, superposition, field lines

**Unlocked by this concept:**
- `phys.em.electric-potential` — V related to E; conductor equipotentials
- `phys.em.maxwells-equations` — Gauss's Law is Maxwell's first equation

**Cross-domain links:**
- `phys.em.capacitance` — parallel-plate E field from Gauss's Law
- `phys.em.dielectrics` — displacement field D = ε₀E + P generalises Gauss's Law

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

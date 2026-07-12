# Teaching Blueprint — phys.em.coulombs-law

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.coulombs-law
name: Coulomb's Law
domain: electromagnetism
difficulty:
  label: developing
  number: 3
bloom: apply
prerequisites:
  - phys.em.electric-charge
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.em.electric-field
  - phys.mech.newtons-laws
  - phys.mech.gravity
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 3 → C with full CPA track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Two charged objects attract or repel each other. Coulomb's Law tells us exactly how strong that force is. It works just like gravity: **the force gets four times weaker** when you double the distance (inverse-square law). It gets **stronger with more charge** on either object. Unlike gravity, the force can either push (like charges) or pull (opposite charges). The constant of proportionality, k ≈ 9 × 10⁹ N·m²/C², is enormous — electric forces between elementary charges are fantastically stronger than gravity.

### Tier 2 — Conceptual / Mechanistic (S1)

**Coulomb's Law (scalar form):**
$$F = k\frac{|q_1||q_2|}{r^2}$$

where k = 8.988 × 10⁹ N·m²/C² = 1/(4πε₀), ε₀ = 8.854 × 10⁻¹² C²/(N·m²) is the permittivity of free space.

**Direction:** repulsive if charges have the same sign; attractive if opposite.

**Vector form:**
$$\vec{F}_{12} = k\frac{q_1 q_2}{r^2}\hat{r}_{12}$$

where F̂₁₂ points from charge 2 toward charge 1 (force on charge 1 due to charge 2).

**Superposition principle:** The total force on a charge q due to n other charges is the vector sum of the individual Coulomb forces:
$$\vec{F}_\text{total} = \sum_{i=1}^n \vec{F}_i$$

**Comparison with gravity:**
| Property | Coulomb | Gravity |
|---|---|---|
| Form | k q₁q₂/r² | G m₁m₂/r² |
| Sign | + or − | always − (attractive) |
| Constant | k = 8.99×10⁹ | G = 6.67×10⁻¹¹ |
| Range | infinite | infinite |

For two electrons: F_E/F_G ≈ 4.2 × 10⁴² — electric force is 10⁴² times gravity between electrons.

**Conditions for Coulomb's Law:**
1. Point charges (or spherically symmetric charge distributions, by shell theorem)
2. Static charges (electrostatics; moving charges require Biot-Savart / magnetic corrections)
3. Charges in vacuum (in medium: replace ε₀ → ε = ε_r ε₀, i.e., k → k/ε_r)

### Tier 3 — Formal

**Shell theorem (Gauss → Coulomb):** A uniformly charged spherical shell exerts zero force on an interior charge and behaves like a point charge at its center for exterior charges. This is why the Coulomb form applies to macroscopic charged spheres.

**Energy stored in two charges:**
$$U = k\frac{q_1 q_2}{r}$$
(U → 0 as r → ∞ by convention; negative U = bound state for opposite charges.)

**Coulomb's torsion balance (1785):** Coulomb measured the inverse-square law by observing the twist of a fiber when charged spheres were placed at known distances. Modern Cavendish-style measurements confirm the exponent is 2 to within 10⁻¹⁶.

---

## Component 2 — Worked Examples

### WE-1 (Direct calculation)

**Problem:** Two point charges q₁ = +3 μC and q₂ = −5 μC are separated by r = 0.20 m. Find the magnitude and direction of the force on q₁.

**Worked solution:**

*Step 1 — Magnitude:*
$$F = k\frac{|q_1||q_2|}{r^2} = (8.99\times10^9)\frac{(3\times10^{-6})(5\times10^{-6})}{(0.20)^2}$$
$$F = (8.99\times10^9)\frac{15\times10^{-12}}{0.04} = (8.99\times10^9)(3.75\times10^{-10}) = 3.37\text{ N}$$

*Step 2 — Direction:*
q₁ is positive, q₂ is negative → opposite signs → attractive force.
Force on q₁ is directed toward q₂.

**Answer:** F = 3.37 N, attractive (toward q₂)

---

### WE-2 (Superposition — three charges)

**Problem:** Three charges are collinear: q₁ = +2 μC at x = 0, q₂ = −3 μC at x = 0.30 m, q₃ = +1 μC at x = 0.60 m. Find the net force on q₂.

**Worked solution:**

*Step 1 — Force on q₂ due to q₁ (F₁₂):*
r₁₂ = 0.30 m; opposite signs → attractive → F₁₂ points toward q₁ (−x direction)
$$F_{12} = (8.99\times10^9)\frac{(2\times10^{-6})(3\times10^{-6})}{(0.30)^2} = (8.99\times10^9)\frac{6\times10^{-12}}{0.09} = 0.599\text{ N}$$
Direction: −x (toward q₁). F₁₂ = −0.599 N x̂

*Step 2 — Force on q₂ due to q₃ (F₃₂):*
r₂₃ = 0.30 m; opposite signs → attractive → F₃₂ points toward q₃ (+x direction)
$$F_{32} = (8.99\times10^9)\frac{(3\times10^{-6})(1\times10^{-6})}{(0.30)^2} = (8.99\times10^9)\frac{3\times10^{-12}}{0.09} = 0.300\text{ N}$$
Direction: +x (toward q₃). F₃₂ = +0.300 N x̂

*Step 3 — Net force:*
F_net = −0.599 + 0.300 = −0.299 N x̂

**Answer:** F_net = 0.299 N in the −x direction (toward q₁)

---

### WE-3 (Inverse-square reasoning)

**Problem:** Two charges separated by 0.40 m experience a force of 6.0 N. (a) What force do they experience at 0.20 m? (b) At 1.60 m?

**Worked solution:**

*Using inverse-square scaling: F ∝ 1/r²*

(a) r → 0.40/0.20 = 2× closer → F → 6.0 × 2² = **24 N**

(b) r → 1.60/0.40 = 4× farther → F → 6.0 / 4² = 6.0/16 = **0.375 N**

**Answer:** 24 N at 0.20 m; 0.375 N at 1.60 m

---

## Component 3 — Misconception Profiles

### MC-COULOMBS-LAW-USES-SIGNED-CHARGES-FOR-MAGNITUDE

**Trigger signal:** Student substitutes signed charges into the scalar formula and gets a negative force magnitude, or confuses sign of the force with the sign of the charge product.

**Conflict evidence [P28]:** "F = k|q₁||q₂|/r² gives the magnitude — always positive. The sign of the force (attractive or repulsive) comes from comparing the signs of q₁ and q₂ separately: same sign → repulsive, opposite sign → attractive. If you substitute signed values, q₁q₂ < 0 gives a 'negative' force magnitude — that's meaningless. Use absolute values for magnitude; reason about attraction/repulsion from charge signs."

**Bridge text [P30]:** "Think of the formula as a recipe in two parts: (1) the magnitude is always k|q₁||q₂|/r² (positive number), (2) the direction is determined by the sign rule: opposite charges attract, like charges repel. In vector form, the signs are handled automatically by including q₁q₂ with the unit vector."

**Replacement text [P31]:** "In the scalar form F = k|q₁||q₂|/r², always use absolute values of the charges. The magnitude of the force is always positive. Determine direction (attractive or repulsive) separately from the signs of q₁ and q₂. In vector form, F⃗ = kq₁q₂/r² r̂₁₂ automatically encodes direction via the sign of q₁q₂."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "F = k|q₁||q₂|/r² = positive magnitude" | "F = kq₁q₂/r² can be negative (attractive)" |
| "Opposite charges → attractive (pull toward)" | "F < 0 means the force is attractive" |
| "Vector form handles signs via q₁q₂ product in r̂" | "Negative force magnitude means attraction" |

**s6_path:** Clarify that "negative force" has meaning only in vector form (component along an axis), not as a standalone magnitude.

---

### MC-DOUBLING-BOTH-CHARGES-DOUBLES-FORCE

**Trigger signal:** Student says "if both charges double, the force doubles" — misapplying linear thinking to a product.

**Conflict evidence [P28]:** "F = k(2q₁)(2q₂)/r² = k·4q₁q₂/r² = 4F. The force quadruples when both charges double, because the force depends on the product q₁×q₂, not the sum. Each charge independently multiplies the force — so doubling both multiplies by 2×2 = 4, not 2."

**Bridge text [P30]:** "The force is proportional to each charge separately — if you double one charge, force doubles; if you double both, force doubles twice — that's a factor of four. This is why the formula has q₁ × q₂ (a product), not q₁ + q₂ (a sum)."

**Replacement text [P31]:** "F ∝ q₁q₂ — it is proportional to the product of both charges. Doubling q₁ alone: F → 2F. Doubling q₂ alone: F → 2F. Doubling both: F → 4F. Tripling one and halving the other: F → (3 × 0.5)F = 1.5F. Always multiply the scale factors for each charge."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Both charges doubled → F × 4" | "Both charges doubled → F × 2" |
| "q₁ tripled, q₂ unchanged → F × 3" | "q₁ + q₂ determines force magnitude" |
| "F ∝ q₁q₂ (product)" | "F ∝ q₁ + q₂ (sum)" |

**s6_path:** Practice with a table: vary q₁ and q₂ independently, observe the multiplicative effect.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Write Coulomb's Law and identify every symbol and its SI unit.

**Answer key:** F = k|q₁||q₂|/r²; F in N, k = 8.99×10⁹ N·m²/C², q₁, q₂ in C, r in m.

---

### P4-b (Direct calculation)
Two charges, +4 μC and +4 μC, are 0.50 m apart. Find the force between them.

**Answer key:** F = (8.99×10⁹)(4×10⁻⁶)(4×10⁻⁶)/(0.50)² = (8.99×10⁹)(16×10⁻¹²)/0.25 = **0.575 N**, repulsive.

---

### P4-c (Inverse-square scaling)
Two protons separated by 1.0 nm experience force F₀. Find the force when they are: (a) 2.0 nm apart, (b) 0.5 nm apart.

**Answer key:**
(a) r doubles → F = F₀/4
(b) r halves → F = 4F₀

---

### P4-d (Superposition)
q₁ = +5 μC at origin, q₂ = +2 μC at x = 0.40 m. Find the force on q₂.

**Answer key:** Like charges → repulsive. F = (8.99×10⁹)(5×10⁻⁶)(2×10⁻⁶)/(0.40)² = (8.99×10⁹)(10×10⁻¹²)/0.16 = **0.562 N** in the +x direction (away from q₁).

---

### P4-e (Analysis — equilibrium)
Three charges on a line: +q at x = 0, −q at x = d, +q at x = 2d. Find the net force on the middle charge −q.

**Answer key:**
Force on −q from +q at 0: attractive, toward +x, F = kq²/d²
Force on −q from +q at 2d: attractive, toward −x, F = kq²/d²
Net force: +kq²/d² + (−kq²/d²) = **0** (the middle charge is in equilibrium by symmetry)

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What are the two types of charge? How does the gravitational force law look?"
  → [P06: concrete-anchor] — "Two charged spheres: same sign repel (push apart), opposite attract (pull together). Force ∝ 1/r². Doubling distance → force/4."
  → [P41: diagnostic] — check if student can identify inverse-square scaling correctly
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (direct calculation, attraction)
  → [P06: concrete-anchor] — WE-2 (superposition — three collinear charges)
  → [P52: narrow] — "In WE-2: draw a force diagram for q₂. Label direction of each force before computing."
  → [P06: concrete-anchor] — WE-3 (inverse-square scaling — ratio method)

[P36: mastery-probe] — P4-d + P4-e
  → if < 80%: re-address superposition direction logic
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
State Coulomb's Law in words and write the mathematical formula.

**Answer:** The electrostatic force between two point charges is directly proportional to the product of the magnitudes of the charges and inversely proportional to the square of the distance between them. F = k|q₁||q₂|/r², where k = 8.99×10⁹ N·m²/C².

---

### AP-2 (Bloom: Understand)
Compare Coulomb's Law with Newton's Law of Gravitation: state two similarities and two differences.

**Answer:** Similarities: (1) both are inverse-square laws (F ∝ 1/r²); (2) both have infinite range. Differences: (1) Coulomb force can be attractive or repulsive; gravity is always attractive; (2) the Coulomb constant k ≈ 10⁹ is far larger than G ≈ 10⁻¹¹ — electric forces between subatomic particles are ≈10⁴² times stronger than gravitational forces.

---

### AP-3 (Bloom: Apply)
A +6 nC charge and a −4 nC charge are 0.30 m apart. Find: (a) the force magnitude, (b) the direction.

**Answer:**
(a) F = (8.99×10⁹)(6×10⁻⁹)(4×10⁻⁹)/(0.30)² = (8.99×10⁹)(24×10⁻¹⁸)/0.09 = **2.40 × 10⁻⁶ N = 2.40 μN**
(b) Attractive (opposite charges) — charges pull toward each other.

---

### AP-4 (Bloom: Analyze)
If the force between two charges is 12 N when separated by 0.30 m, what separation gives a force of 3 N?

**Answer:** F ∝ 1/r². F₂/F₁ = r₁²/r₂² → 3/12 = (0.30)²/r₂² → r₂² = (0.30)²×4 → r₂ = 0.30×2 = **0.60 m**

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | Write Coulomb formula; compute F for given q₁, q₂, r |
| +3 days | Inverse-square scaling problems (no computation, just ratios) |
| +7 days | Superposition: 3 charges on a line, find net force on middle |
| +21 days | Compare with gravity; explain why atoms don't collapse gravitationally |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.electric-charge` — types, conservation, quantisation

**Unlocked by this concept:**
- `phys.em.electric-field` — field = force per unit test charge

**Cross-domain links:**
- `phys.mech.newtons-laws` — Coulomb force → acceleration; Newton's third law: F₁₂ = −F₂₁
- `phys.mech.gravity` — same mathematical form, different sign rule

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 3, bloom = apply | PASS |
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

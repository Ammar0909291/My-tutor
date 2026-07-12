# Teaching Blueprint — phys.em.electric-field

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.electric-field
name: Electric Field
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.em.coulombs-law
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.em.electric-dipole
  - phys.em.gauss-law
  - phys.em.electric-potential
  - phys.em.magnetic-force
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Imagine putting a small positive "test charge" at some point in space. It will feel a force — pushed away from nearby positive charges and pulled toward negative ones. The **electric field** at that point is defined as the force per unit charge: E = F/q. This means the field exists independently of whether any test charge is actually there — it is a property of space created by source charges. Electric field lines point away from positive charges and toward negative charges, and their density shows how strong the field is.

### Tier 2 — Conceptual / Mechanistic (S1)

**Definition:**
$$\vec{E} = \frac{\vec{F}}{q_0}$$

where q₀ is a small positive test charge and F is the force on it. Units: N/C = V/m.

**Field due to a point charge:**
$$\vec{E} = k\frac{Q}{r^2}\hat{r}$$

Points away from Q if Q > 0; toward Q if Q < 0.

**Superposition:** The total electric field due to multiple charges is the vector sum of each individual field:
$$\vec{E}_\text{total} = \sum_i \vec{E}_i = k\sum_i \frac{q_i}{r_i^2}\hat{r}_i$$

**Field lines:**
1. Start on positive charges, end on negative charges (or extend to infinity).
2. Never cross (field is single-valued at each point).
3. Density proportional to field strength.
4. Perpendicular to equipotential surfaces.
5. For a single positive point charge: radiate outward uniformly.

**Special cases:**
- Uniform field between parallel plates: E = σ/ε₀ (away from edges)
- Outside a uniformly charged sphere (radius R): E = kQ/r² for r > R (same as point charge)
- Inside a uniformly charged conducting sphere: E = 0 (Gauss's law result)

**Force on charge in field:** F = qE (direction depends on sign of q)

### Tier 3 — Formal / Vector

**Field of a continuous charge distribution:**
$$\vec{E}(\vec{r}) = k\int \frac{dq}{|\vec{r}-\vec{r}'|^2}\hat{r}_{r-r'}$$

where dq = ρ dV (volume), σ dA (surface), or λ dl (line).

**Uniform ring of charge (on axis):**
$$E_x = \frac{kQx}{(x^2+R^2)^{3/2}}$$
Maximum at x = R/√2; vanishes at center and at infinity.

**Infinite line charge (λ C/m):**
$$E = \frac{\lambda}{2\pi\varepsilon_0 r}$$

**Infinite plane (σ C/m²):**
$$E = \frac{\sigma}{2\varepsilon_0}$$
(independent of distance from the plane)

**Electric field and potential:**
$$\vec{E} = -\nabla V$$
(Field points from high to low potential — "downhill.")

---

## Component 2 — Worked Examples

### WE-1 (Single point charge)

**Problem:** A charge Q = +5 nC is at the origin. Find the electric field magnitude and direction at a point P located 0.30 m away along the x-axis.

**Worked solution:**

*Step 1 — Magnitude:*
$$E = k\frac{|Q|}{r^2} = (8.99\times10^9)\frac{5\times10^{-9}}{(0.30)^2} = (8.99\times10^9)\frac{5\times10^{-9}}{0.09}$$
$$E = \frac{4.495\times10^1}{0.09} = 499\text{ N/C} \approx 500\text{ N/C}$$

*Step 2 — Direction:*
Q is positive → field points away from Q → in +x direction at P.

**Answer:** E = 500 N/C in the +x direction.

---

### WE-2 (Superposition — two charges)

**Problem:** q₁ = +3 μC at x = 0 and q₂ = −3 μC at x = 0.40 m (an electric dipole). Find the electric field at the midpoint (x = 0.20 m).

**Worked solution:**

*Step 1 — Field from q₁ at midpoint (r = 0.20 m):*
$$E_1 = k\frac{3\times10^{-6}}{(0.20)^2} = (8.99\times10^9)\frac{3\times10^{-6}}{0.04} = 6.74\times10^5\text{ N/C}$$
Direction: +x (away from positive q₁)

*Step 2 — Field from q₂ at midpoint (r = 0.20 m):*
$$E_2 = k\frac{3\times10^{-6}}{(0.20)^2} = 6.74\times10^5\text{ N/C}$$
Direction: q₂ is negative, midpoint is to its left → field points toward q₂ → +x direction.

*Step 3 — Total field:*
Both fields point in +x direction (from + charge toward − charge):
E_total = 6.74×10⁵ + 6.74×10⁵ = **1.35 × 10⁶ N/C** in +x direction.

**Answer:** E = 1.35 × 10⁶ N/C in the +x direction (from + toward −, along the dipole axis).

---

### WE-3 (Field → force)

**Problem:** An electron (charge = −1.602 × 10⁻¹⁹ C, mass = 9.11 × 10⁻³¹ kg) is placed in a uniform electric field E = 500 N/C pointing in the +x direction. Find the force and acceleration on the electron.

**Worked solution:**

*Step 1 — Force:*
$$\vec{F} = q\vec{E} = (-1.602\times10^{-19})(500\hat{x}) = -8.01\times10^{-17}\text{ N}\hat{x}$$
(negative sign: force is in −x direction — opposite to E, since electron is negative)

*Step 2 — Acceleration:*
$$\vec{a} = \frac{\vec{F}}{m} = \frac{-8.01\times10^{-17}}{9.11\times10^{-31}}\hat{x} = -8.79\times10^{13}\text{ m/s}^2\hat{x}$$

**Answer:** Force = 8.01 × 10⁻¹⁷ N in −x direction; a = 8.79 × 10¹³ m/s² in −x direction.

---

## Component 3 — Misconception Profiles

### MC-ELECTRIC-FIELD-REQUIRES-A-TEST-CHARGE

**Trigger signal:** Student says "there's no electric field unless a charge is present to feel it" or "the field only exists when you put a charge there."

**Conflict evidence [P28]:** "Consider a parallel-plate capacitor with no test charge between the plates. Remove the battery — the charge on the plates remains, and with it the field. Now insert a tiny test charge: it feels the force that was already there. The test charge reveals the field; it doesn't create it. The field pre-existed, even in 'empty' space. Modern quantum electrodynamics confirms: fields are real — they carry energy and momentum (light is a propagating electric field)."

**Bridge text [P30]:** "The test charge is a measuring tool, not a prerequisite for the field's existence. E = F/q_0 is a definition of field in terms of a measurable force, not a statement that the field needs q₀. The source charge Q creates the field; q₀ just probes it."

**Replacement text [P31]:** "The electric field exists in space independently of any test charge. Source charges create the field; a test charge is used to measure the field but is not required for it to exist. E = F/q₀ is the definition (measurement procedure), not the existence condition. Fields carry energy — the field exists even between the plates of a capacitor with nothing in between."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Source charge Q creates the field; test charge q₀ measures it" | "The field only exists when a test charge is present" |
| "E = kQ/r² at every point in space around Q" | "E = F/q₀ means E needs q₀ to exist" |
| "Electric field lines map the field in empty space" | "Field lines show where forces will be — not where field is" |

**s6_path:** Use gravitational analogy: Earth's gravitational field exists even in space with no objects present. Drop a test ball to measure it, but the field was there before.

---

### MC-FIELD-LINES-SHOW-PARTICLE-PATH

**Trigger signal:** Student says "a positive charge will travel along the field line" or sketches a particle trajectory following a curved field line.

**Conflict evidence [P28]:** "A field line shows the direction of force at each instant — not the path of motion. For a charged particle released from rest at a point on a curved field line, the force at that instant is along the field line, but the particle's inertia means it overshoots. The trajectory curves away from the field line. Only for a straight, uniform field does a particle (from rest) follow the field line (rectilinear motion)."

**Bridge text [P30]:** "Field lines show the direction of force, not the trajectory. A moving particle at any instant feels a force along the field line, but the subsequent path depends on its velocity vector and all future forces. For a particle moving perpendicular to a uniform field (like a horizontal projectile), the trajectory is parabolic — the field lines are straight, the trajectory curves."

**Replacement text [P31]:** "Electric field lines show the direction of force on a positive test charge at each point in space. They do NOT trace the actual path of a charged particle. A particle's trajectory depends on its initial velocity and the cumulative effect of forces — only a particle released from rest along a straight field line would follow that field line. In curved fields or with non-zero initial velocity, the trajectory diverges from the field lines."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Field lines show force direction at each point" | "A positive charge travels along field lines" |
| "Trajectory ≠ field line (depends on initial velocity)" | "Field lines are the paths charged particles take" |
| "Field lines are perpendicular to equipotentials" | "Field lines show equal-energy paths" |

**s6_path:** Draw a uniform field between plates; show an electron entering horizontally — it follows a parabolic path, not along the field lines.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Define electric field. Write its formula in terms of force and test charge, and give units.

**Answer key:** E = F/q₀ (force per unit positive test charge). Units: N/C (equivalently, V/m). Direction: direction of force on a positive test charge.

---

### P4-b (Point charge field)
Find E at a distance 0.50 m from a −8 nC point charge. State the direction.

**Answer key:** E = (8.99×10⁹)(8×10⁻⁹)/(0.50)² = (8.99×10⁹)(8×10⁻⁹)/0.25 = **0.288 N/C** directed toward the charge (negative source).

---

### P4-c (Superposition)
Two +5 μC charges are placed 0.60 m apart. Find E at the midpoint between them.

**Answer key:** Each charge contributes E = k(5×10⁻⁶)/(0.30)² = (8.99×10⁹)(5×10⁻⁶)/0.09 = 4.99×10⁵ N/C. At the midpoint, both fields point away from their respective charges — in **opposite** directions. They cancel exactly. E_total = **0** (by symmetry for identical charges).

---

### P4-d (Force from field)
A proton (charge +e = 1.602 × 10⁻¹⁹ C, mass = 1.673 × 10⁻²⁷ kg) is in an electric field E = 2000 N/C. Find its acceleration.

**Answer key:** F = qE = (1.602×10⁻¹⁹)(2000) = 3.20×10⁻¹⁶ N; a = F/m = 3.20×10⁻¹⁶/1.673×10⁻²⁷ = **1.91 × 10¹¹ m/s²**

---

### P4-e (Analysis — field line rules)
Sketch the electric field lines for: (a) a single isolated +Q charge, (b) two equal and opposite charges (+Q and −Q) 20 cm apart. State three rules that field lines obey.

**Answer key:**
(a) Straight radial lines pointing outward uniformly from +Q.
(b) Lines leave +Q, curve through space, and terminate on −Q. Lines are denser between the charges (stronger field there). No lines cross.
Rules: (1) start on +, end on −; (2) never cross; (3) density ∝ field strength; (4) perpendicular to conductors; (5) perpendicular to equipotentials.

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What is Coulomb's force law? What is a force per unit charge called?"
  → [P06: concrete-anchor] — "Imagine a tiny positive test charge at a point. The electric field at that point = the force it feels divided by its charge."
  → [P41: diagnostic] — check if student understands field as a property of space, not requiring a test charge
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-ELECTRIC-FIELD-REQUIRES-A-TEST-CHARGE, MC-FIELD-LINES-SHOW-PARTICLE-PATH)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (single point charge: calculate E, direction)
  → [P06: concrete-anchor] — WE-2 (superposition: dipole midpoint)
  → [P52: narrow] — "In WE-2, why do both fields point in the same direction at the midpoint?"
  → [P06: concrete-anchor] — WE-3 (F = qE: electron in uniform field, note direction reversal)

[P36: mastery-probe] — P4-c (superposition cancellation) + P4-d (force/acceleration)
  → if < 80%: re-address direction rules for + vs. − source charges
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
What is the electric field due to a point charge Q at distance r? State the formula and the direction.

**Answer:** E = kQ/r² in magnitude; direction is away from Q if Q > 0, toward Q if Q < 0. (Vector: E = kQ/r² r̂ where r̂ points away from Q.)

---

### AP-2 (Bloom: Understand)
Why must the test charge q₀ in the definition E = F/q₀ be small? What happens if q₀ is large?

**Answer:** A large test charge would alter the distribution of the source charges (by attracting or repelling them), changing the very field it is meant to measure. The test charge must be small enough that it does not disturb the source charges — it is a probe, not a perturbation. Mathematically, E = lim(q₀→0) F/q₀.

---

### AP-3 (Bloom: Apply)
At what distance from a +10 nC charge does the electric field equal 400 N/C?

**Answer:** E = kQ/r² → r² = kQ/E = (8.99×10⁹)(10×10⁻⁹)/400 = 0.0899/400 = 2.25×10⁻⁴ → r = **0.015 m = 1.5 cm**

---

### AP-4 (Bloom: Analyze)
Two charges +2Q and −Q are separated by distance d. At what point along the line connecting them (outside the two charges) is the net electric field zero?

**Answer:** The zero point must be on the side of the weaker charge (−Q), at distance r from −Q:
Field from +2Q: k(2Q)/(d+r)² = pointing toward −Q (positive source, field toward −)
Field from −Q: kQ/r² = pointing toward −Q (negative source, field toward −)
Wait — at a point outside −Q (beyond −Q, away from +2Q):
Field from +2Q: magnitude k(2Q)/(d+r)², direction: toward −Q (rightward if +2Q is left, −Q is right)
Field from −Q: magnitude kQ/r², direction: toward −Q (leftward — toward −Q means leftward from this point)
For zero: they must point in opposite directions. At a point to the right of −Q:
Field from +2Q: rightward (away from +2Q) = +
Field from −Q: leftward (toward −Q) = −
Set magnitudes equal: k(2Q)/(d+r)² = kQ/r² → 2/( d+r)² = 1/r² → √2·r = d+r → r(√2−1) = d → r = d/(√2−1) = d(√2+1) ≈ **2.41d** from the −Q charge (on the far side from +2Q).

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | E = kQ/r²: compute field from a point charge at given distance |
| +3 days | Superposition: two charges, find field at a third point |
| +7 days | Field line sketching rules; direction for +/− source charges |
| +21 days | F = qE: force and acceleration on a test charge in a known field |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.coulombs-law` — force between charges, inverse-square law

**Unlocked by this concept:**
- `phys.em.electric-dipole` — dipole field = superposition of two charges
- `phys.em.gauss-law` — integral of E over a closed surface
- `phys.em.magnetic-force` — requires both E and B field concepts

**Cross-domain links:**
- `phys.em.electric-potential` — V related to E by E = −∇V
- `phys.em.capacitance` — uniform field between parallel plates

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 4, bloom = understand | PASS |
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

# Teaching Blueprint — phys.em.magnetic-field

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.magnetic-field
name: Magnetic Field
domain: electromagnetism
difficulty:
  label: developing
  number: 3
bloom: understand
prerequisites:
  - phys.em.electric-current
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.em.magnetic-force
  - phys.em.biot-savart
  - phys.em.magnetic-flux
  - phys.em.magnetic-materials
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 3 → C with full CPA track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Hold a compass near a wire carrying current — the needle deflects. Move a magnet near a wire — a current appears. These phenomena reveal the **magnetic field**: a region of space where magnetic forces act on moving charges and current-carrying conductors. The magnetic field B is a vector — it has both magnitude and direction. Field lines form closed loops (unlike electric field lines, they have no beginning or end), circling around currents and running from north to south pole outside a bar magnet. The SI unit is the tesla (T): 1 T = 1 N/(A·m).

### Tier 2 — Conceptual / Mechanistic (S1)

**Sources of magnetic fields:**
1. Moving electric charges (current → magnetic field, discovered by Ørsted 1820)
2. Permanent magnets (microscopic magnetic moments of electrons)
3. Changing electric fields (Maxwell's addition — displacement current)

**Field of a long straight wire (distance r from wire, current I):**
$$B = \frac{\mu_0 I}{2\pi r}$$

where μ₀ = 4π × 10⁻⁷ T·m/A is the permeability of free space. Direction: right-hand rule — curl fingers in direction of B when thumb points in current direction.

**Right-hand rules:**
- Wire: wrap right hand around wire with thumb in current direction → fingers point in B direction (circumferential circles)
- Solenoid: curl right-hand fingers in coil current direction → thumb points in B direction (inside, along axis)

**Magnetic field properties:**
1. **No magnetic monopoles:** B field lines are always closed loops (∮B·dA = 0, Gauss's law for magnetism).
2. **Superposition:** B_total = sum of B from each source.
3. **Direction:** perpendicular to both current direction and radius vector (from Biot-Savart).

**Bar magnet field lines:**
- Outside: from N pole to S pole (convention)
- Inside: from S to N (completing closed loops)
- Field is strongest at the poles.

**Comparison with electric field:**
| Property | Electric field E | Magnetic field B |
|---|---|---|
| Source | Charges | Moving charges / currents |
| Lines | Start/end on charges | Always closed loops |
| Force on | Stationary + moving charges | Only moving charges |
| Unit | N/C = V/m | T = N/(A·m) = Wb/m² |

### Tier 3 — Formal

**Gauss's Law for magnetism:**
$$\oint \vec{B}\cdot d\vec{A} = 0$$

(No magnetic monopoles — all B field lines are closed; this is Maxwell's second equation.)

**Biot-Savart Law (field element from current element):**
$$d\vec{B} = \frac{\mu_0}{4\pi}\frac{Id\vec{l}\times\hat{r}}{r^2}$$

Integration gives the field of any current configuration. For a long straight wire: recovers B = μ₀I/(2πr).

**Magnetic dipole moment:** For a current loop of area A carrying current I:
m = IA (ampere-square-meters, A·m²)

Torque on a magnetic dipole in field B: τ = m × B (analogous to electric dipole τ = p × E).

**Terrestrial field:** Earth's surface field ≈ 25–65 μT (0.25–0.65 Gauss). Compass needles align with the horizontal component.

---

## Component 2 — Worked Examples

### WE-1 (Field of a straight wire)

**Problem:** A long straight wire carries a current of 8.0 A. Find the magnetic field at a point 5.0 cm from the wire.

**Worked solution:**

$$B = \frac{\mu_0 I}{2\pi r} = \frac{(4\pi\times10^{-7})(8.0)}{2\pi(0.05)}$$
$$B = \frac{4\pi\times10^{-7}\times8.0}{2\pi\times0.05} = \frac{4\times8.0\times10^{-7}}{2\times0.05} = \frac{32\times10^{-7}}{0.10} = 3.2\times10^{-5}\text{ T} = 32\text{ μT}$$

Direction: Use right-hand rule — if current goes up (+y), B at a point to the right of the wire points out of the page (+z direction by right-hand rule).

**Answer:** B = 32 μT, directed using right-hand rule around the wire.

---

### WE-2 (Direction — right-hand rule)

**Problem:** Two parallel wires, A and B, are 10 cm apart. Wire A carries 5 A upward; wire B carries 3 A downward. At the midpoint between them, what is the direction of B from each wire and which way does the net B point?

**Worked solution:**

*Step 1 — B from wire A at midpoint (5 cm to the right of A, current upward):*
Right-hand rule: thumb up → fingers curl → at point to the right of A, B points out of page.

*Step 2 — B from wire B at midpoint (5 cm to the left of B, current downward):*
Right-hand rule: thumb down → fingers curl other way → at point to the left of B (the midpoint), B also points out of page.

*Step 3 — Net B:*
Both contributions point out of page → they add.
B_A = μ₀(5)/(2π×0.05) = 20 μT; B_B = μ₀(3)/(2π×0.05) = 12 μT
B_net = 20 + 12 = **32 μT out of page**

**Answer:** B_net = 32 μT directed out of the page.

---

### WE-3 (Field lines — bar magnet conceptual)

**Problem:** Describe the magnetic field line pattern for a bar magnet and explain why the field lines never cross and must form closed loops.

**Worked solution:**

*Field lines outside:*
Emerge from N pole, arc through space, enter S pole. Denser near the poles (stronger field).

*Field lines inside the magnet:*
Continue from S pole to N pole through the material, completing closed loops.

*No crossing:*
Field lines can't cross because B at each point has a unique direction — a crossing would imply two different directions at one point, which is physically impossible.

*Closed loops:*
∮B·dA = 0 (Gauss's law for magnetism): no magnetic monopoles, so field lines have no beginning or end — they always close on themselves.

*Comparison with E:*
Electric field lines start on + charges and end on − charges. Magnetic field lines have no sources or sinks — they form complete closed loops.

**Answer:** Closed loops: N→S outside, S→N inside; no crossing (unique B at each point); no monopoles (divergence = 0).

---

## Component 3 — Misconception Profiles

### MC-MAGNETIC-FIELD-LINES-COME-FROM-NORTH-POLE

**Trigger signal:** Student thinks field lines "start" at the north pole and "end" at the south pole, treating poles like positive/negative charges.

**Conflict evidence [P28]:** "Electric field lines truly start at positive charges and end at negative charges (∮E·dA = Q_enc/ε₀ ≠ 0). But Gauss's law for magnetism states ∮B·dA = 0 — no magnetic monopoles exist. A magnetic field line that 'starts' at the north pole must continue inside the magnet, emerge from the south pole, continue outside, and return — it's a closed loop. Cut a bar magnet in half: you don't separate the poles; you get two complete magnets, each with N and S poles."

**Bridge text [P30]:** "The convention that B field lines emerge from N poles is about direction, not about starting or ending. The lines emerge from N, arc to S, and then continue through the magnet interior back to N — a complete loop. There are no magnetic monopoles to serve as sources or sinks."

**Replacement text [P31]:** "Magnetic field lines form closed loops. By convention, they emerge from the N pole and enter the S pole externally, then continue through the magnet material from S to N. This completes the loop. Because ∮B·dA = 0, there are no magnetic 'charges' (monopoles) where lines start or end. Cutting a magnet always produces two complete magnets — isolated monopoles have never been observed."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "B field lines form closed loops (∮B·dA = 0)" | "B field lines start at N pole (monopole source)" |
| "Cutting a magnet gives two complete magnets, not isolated poles" | "Cutting a magnet separates N and S poles" |
| "B direction convention: N→S outside, S→N inside" | "B lines start on N, end on S, like E lines on charges" |

**s6_path:** Draw the complete loop: N→space→S→inside magnet→N. Show that it's closed. Ask student to predict what happens when a magnet is cut.

---

### MC-MAGNETIC-FORCE-EXISTS-ON-STATIONARY-CHARGES

**Trigger signal:** Student says a magnetic field exerts force on a stationary charge, or doesn't realize motion is required.

**Conflict evidence [P28]:** "The magnetic force on a charge is F = qv×B. For a stationary charge: v = 0 → F = q(0)×B = 0. No force. Place a proton at rest between strong magnets — it feels no force from the magnets. Move it perpendicular to B — it curves. This is verified in particle accelerators: magnetic fields deflect particle beams (moving charges) but do no work on them (F ⊥ v). A static magnetic field cannot accelerate a stationary charge."

**Bridge text [P30]:** "The key distinction: electric forces act on all charges (moving or stationary); magnetic forces act only on moving charges. This is why magnets don't attract pieces of neutral wire carrying no current, but do attract wires carrying current (moving electrons experience F = qv×B)."

**Replacement text [P31]:** "The magnetic force on a charge is F = qv×B — velocity v is required. A stationary charge (v = 0) feels zero magnetic force, regardless of how strong the field B is. The electric force F = qE acts on stationary charges; the magnetic force F = qv×B acts only on charges in motion. A magnetic field alone cannot do work on a charge (F ⊥ v always), but it can change the direction of motion."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Magnetic force requires charge to be moving (F = qv×B)" | "Magnetic field exerts force on stationary charges" |
| "Static B does no work (F ⊥ v → P = F·v = 0)" | "Magnetic force can accelerate a stationary particle" |
| "Electric force acts on stationary charges; magnetic does not" | "B field is needed to accelerate a charge from rest" |

**s6_path:** Worked experiment: place a charge at rest near a magnet — no force. Move the charge — it feels a force. This is the defining property of the magnetic interaction.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
State: (a) the SI unit of magnetic field, (b) the formula for B near a long straight wire, (c) the right-hand rule for wire field direction.

**Answer key:**
(a) Tesla (T)
(b) B = μ₀I/(2πr)
(c) Point right thumb in current direction; curved fingers show B direction (counterclockwise circles around wire when current is toward you)

---

### P4-b (Calculation)
A wire carries 12 A. Find B at: (a) 2.0 cm, (b) 8.0 cm from the wire.

**Answer key:**
(a) B = μ₀I/(2πr) = (4π×10⁻⁷×12)/(2π×0.02) = (4.8π×10⁻⁶)/(2π×0.02) = 4.8×10⁻⁶/0.04 = **1.20 × 10⁻⁴ T = 120 μT**
(b) B = (4π×10⁻⁷×12)/(2π×0.08) = 1.20×10⁻⁴×(2/8) = **30 μT**
(Note: B ∝ 1/r — doubling r halves B.)

---

### P4-c (Direction)
A wire carries current in the +x direction. What is the direction of B at a point: (a) above the wire (+y), (b) below the wire (−y)?

**Answer key:**
Right-hand rule: current in +x, at +y point: B in +z (out of page).
At −y point: B in −z (into page).

---

### P4-d (Field lines)
Sketch the magnetic field lines for two parallel wires carrying currents: (a) in the same direction, (b) in opposite directions. Describe what happens between the wires in each case.

**Answer key:**
(a) Same direction: between the wires, fields from each wire cancel (both point into page between them for the standard setup). Wires attract each other (by force on current in field of other wire).
(b) Opposite directions: between the wires, fields from each wire add (both point in same direction between them). Wires repel each other.

---

### P4-e (Analysis — force on stationary vs. moving charge)
A proton is placed at rest 10 cm from a long wire carrying 50 A. (a) What magnetic force acts on it? (b) What if the proton moves at 10⁶ m/s parallel to the wire?

**Answer key:**
(a) F = qv×B; v = 0 → F = **0** (no magnetic force on stationary charge)
(b) B at 10 cm from wire = μ₀I/(2πr) = (4π×10⁻⁷)(50)/(2π×0.10) = 10⁻⁴ T
F = qvB sinθ; v parallel to wire → θ = 0° (v ∥ I) → v ∥ B direction or perpendicular to B?
B circles around the wire, perpendicular to v (since v is along wire and B is circumferential). θ between v and B = 90°.
F = (1.602×10⁻¹⁹)(10⁶)(10⁻⁴)(sin90°) = **1.602 × 10⁻¹⁷ N**, directed radially (toward or away from wire depending on charge and current directions).

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What is a current? What happens when you place a compass near a current-carrying wire?"
  → [P06: concrete-anchor] — "Ørsted 1820: current deflects compass. Current creates magnetic field. Right-hand rule: wrap fingers around wire → thumb in current direction → fingers show B direction."
  → [P41: diagnostic] — check if student knows B acts only on moving charges (not stationary)
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-MAGNETIC-FIELD-LINES-COME-FROM-NORTH-POLE, MC-MAGNETIC-FORCE-EXISTS-ON-STATIONARY-CHARGES)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (B near straight wire — formula and calculation)
  → [P06: concrete-anchor] — WE-2 (two wires — direction analysis)
  → [P52: narrow] — "In WE-2, both wires contribute B in the same direction at the midpoint — why?"
  → [P06: concrete-anchor] — WE-3 (bar magnet field lines — closed loops, ∮B·dA = 0)

[P36: mastery-probe] — P4-b (calculation at two distances) + P4-e (stationary vs. moving charge)
  → if < 80%: re-address B = μ₀I/(2πr) and right-hand rule
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
What is the SI unit of magnetic field and what does 1 T represent physically?

**Answer:** Tesla (T). 1 T = 1 N/(A·m) — a 1 T field exerts a force of 1 N on a 1 m segment of wire carrying 1 A, oriented perpendicularly to the field. Equivalently: 1 T = 1 Wb/m² (weber per square meter).

---

### AP-2 (Bloom: Understand)
Why can a magnetic field never do work on a moving charged particle?

**Answer:** The magnetic force F = qv×B is always perpendicular to the velocity v (by the cross product). Power = F·v = 0 when F ⊥ v. Therefore, the magnetic force never does work — it can change the direction of motion but never the speed or kinetic energy of the particle.

---

### AP-3 (Bloom: Apply)
At what distance from a wire carrying 20 A is the magnetic field equal to Earth's surface field (50 μT)?

**Answer:** B = μ₀I/(2πr) → r = μ₀I/(2πB) = (4π×10⁻⁷×20)/(2π×50×10⁻⁶) = (8π×10⁻⁶)/(10⁻⁴π) = 8×10⁻⁶/10⁻⁴ = **0.08 m = 8 cm**

---

### AP-4 (Bloom: Analyze)
Two long parallel wires 20 cm apart carry 10 A each. Wire 1 is at x = 0, Wire 2 at x = 0.20 m. Find B at x = −0.10 m (left of Wire 1) if both currents are in the +y direction.

**Answer:**
B₁ at x = −0.10 m (10 cm left of Wire 1):
Right-hand rule: current in +y, point is to the left → B points in −z (into page) ... wait.
Curl right hand: thumb up (+y), at a point to the left of the wire (−x direction from wire), fingers point: at −x from wire, B is in −z direction (into page? Let me verify: at +x from wire, B is in −z (into page); at −x from wire, B is in +z (out of page)).
Correct: at −x from Wire 1, B₁ in +z (out of page).
B₁ = μ₀I/(2πr₁) = μ₀(10)/(2π×0.10) = 20 μT out of page.

B₂ from Wire 2 at x = 0.20 m (point is 0.30 m to its left, i.e. at −x from Wire 2):
At −x from Wire 2, B₂ in +z (out of page).
B₂ = μ₀(10)/(2π×0.30) = 6.67 μT out of page.

Net: B = 20 + 6.67 = **26.7 μT out of page** (both contributions add, same direction).

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | B = μ₀I/(2πr): compute B at two distances; state right-hand rule |
| +3 days | Direction problems: two wires, find B direction at a third point |
| +7 days | Why magnetic force requires motion; why B field does no work |
| +21 days | Compare E and B: sources, force, line topology, units |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.electric-current` — current as moving charge; I definition

**Unlocked by this concept:**
- `phys.em.magnetic-force` — F = qv×B (requires B concept)
- `phys.em.magnetic-materials` — dia/para/ferromagnetic response
- `phys.em.magnetic-flux` — Φ = ∫B·dA

**Cross-domain links:**
- `phys.em.biot-savart` — general formula for B from current element
- `phys.em.amperes-law` — ∮B·dl = μ₀I_enc (uses B field concept)

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 3, bloom = understand | PASS |
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

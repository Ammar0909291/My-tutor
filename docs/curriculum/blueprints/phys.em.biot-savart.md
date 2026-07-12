# Teaching Blueprint — phys.em.biot-savart

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.biot-savart
name: Biot-Savart Law
domain: electromagnetism
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.em.magnetic-force
mastery_threshold: 0.80
estimated_hours: 6
cross_links:
  - phys.em.amperes-law
  - phys.em.magnetic-dipole
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — The Law and Its Structure
The **Biot-Savart law** gives the magnetic field dB produced by an infinitesimal current element I d**l** at a field point P a distance r away:

> **dB = (μ₀/4π) × (I d**l** × r̂) / r²**

Magnitude: **dB = (μ₀/4π) × (I dl sinθ) / r²**

Where:
- μ₀ = 4π×10⁻⁷ T·m/A (permeability of free space)
- d**l**: vector along current direction, magnitude = element length
- r̂: unit vector from element to field point
- θ: angle between d**l** and r̂
- The total B field: **B = ∫ dB** (superposition over all current elements)

Structural analogy with Coulomb's law:
| | Coulomb | Biot-Savart |
|--|---------|-------------|
| Source | dq | I dl |
| Field | dE = (1/4πε₀)(dq/r²)r̂ | dB = (μ₀/4π)(I dl × r̂)/r² |
| Fall-off | 1/r² | 1/r² |
| Key difference | scalar (charge) | vector (cross product) |

### Block 1-B — Standard Results: Long Wire and Circular Loop

**Infinite straight wire** at perpendicular distance R:
> **B = μ₀I/(2πR)**, direction: circles around wire (right-hand rule)

Derived by integrating dB along the wire from −∞ to +∞:
∫ dB = (μ₀I/4π) ∫_{-∞}^{∞} [dl sinθ / (R² + l²)] = μ₀I/(2πR)

**Circular loop of radius R, field at centre**:
> **B = μ₀I/(2R)**, direction: along axis (right-hand rule for current direction)

**Circular loop, field on axis** at distance x from centre:
> **B = μ₀IR²/ [2(R² + x²)^{3/2}]**

At centre (x = 0): B = μ₀I/(2R) ✓  
Far from loop (x >> R): B ≈ μ₀IR²/(2x³) = μ₀(Iπr²)/(2πx³) = μ₀m/(2πx³) — dipole field

### Block 1-C — Direction: Right-Hand Rule for Biot-Savart
Direction of dB:
1. Point fingers of right hand along d**l** (current direction)
2. Curl toward r̂ (toward the field point)
3. Thumb points in direction of dB

Equivalently: dB is perpendicular to the plane containing d**l** and r̂.

For a long straight wire:
- Current flowing right → B circles counterclockwise (viewed from the right)
- Use right-hand rule: thumb along current, fingers curl in direction of B

### Block 1-D — Superposition and Practical Calculation Strategy
For complex geometries, break the current distribution into elements, compute dB for each (using the cross product), then integrate. Steps:
1. Choose coordinate system; identify symmetry to simplify integration
2. Write r (distance from element to field point) in terms of integration variable
3. Write sinθ or use the cross product directly
4. Identify which components of dB cancel by symmetry (e.g., perpendicular components cancel for a loop on-axis)
5. Integrate along the current path

---

## Component 2 — Worked Examples

### WE-1 — Field from a Long Straight Wire
**Problem:** Two parallel wires, each carrying I = 10 A in opposite directions, are 20 cm apart. Find B midway between them.

**Solution:**
Distance from each wire to midpoint: R = 0.10 m

B from wire 1: B₁ = μ₀I/(2πR) = (4π×10⁻⁷ × 10)/(2π × 0.10) = **2.0×10⁻⁵ T**  
Direction (wire 1 current right, midpoint above wire 1): B₁ points upward (out of page for this geometry — use right-hand rule).

B from wire 2 (current left, midpoint below wire 2): same magnitude, also points out of page by right-hand rule.

Both fields point the same direction (both out of page) — antiparallel currents cause fields to add between the wires:
**B_total = B₁ + B₂ = 4.0×10⁻⁵ T** (out of page)

---

### WE-2 — Field at Centre of Circular Loop
**Problem:** A circular coil of 40 turns, radius 5.0 cm, carries I = 3.0 A. Find B at the centre.

**Solution:**
B = N × μ₀I/(2R) = 40 × (4π×10⁻⁷ × 3.0)/(2 × 0.050)  
= 40 × (12π×10⁻⁷)/(0.10)  
= 40 × 120π×10⁻⁷ × 10  
= 40 × 3.77×10⁻⁵  
**B = 1.51×10⁻³ T = 1.51 mT**

Direction: along the axis, determined by right-hand rule (curl fingers in direction of current → thumb points in B direction).

---

### WE-3 — On-Axis Field of a Loop
**Problem:** A circular loop (R = 8.0 cm, I = 5.0 A). Find B on the axis at x = 6.0 cm from centre. Compare with the centre field.

**Solution:**
B = μ₀IR² / [2(R² + x²)^{3/2}]  
= (4π×10⁻⁷ × 5.0 × (0.08)²) / [2((0.08)² + (0.06)²)^{3/2}]  
= (4π×10⁻⁷ × 5.0 × 6.4×10⁻³) / [2(6.4×10⁻³ + 3.6×10⁻³)^{3/2}]  
= (4π×10⁻⁷ × 3.2×10⁻²) / [2(10⁻²)^{3/2}]  
= (4.02×10⁻⁸) / [2 × 10⁻³]  
= **2.01×10⁻⁵ T**

At centre: B₀ = μ₀I/(2R) = (4π×10⁻⁷ × 5.0)/(2 × 0.08) = **3.93×10⁻⁵ T**

Ratio: B(at x)/B₀ = 2.01/3.93 = 0.51 (field drops to ~51% at x=R×0.75)

---

## Component 3 — Misconception Engine

### MC-BIOT-SAVART-GIVES-FIELD-FROM-A-SINGLE-MOVING-CHARGE
- **trigger_signal:** Student says "I use dB = μ₀qv×r̂/(4πr²) for any single proton moving through space."
- **conflict_evidence [P28]:** "The Biot-Savart law strictly applies to steady currents in conductors, not to isolated moving charges. For a single moving charge q, the field is B = (μ₀/4π)(qv×r̂/r²), which looks the same — but this is derived from the Biot-Savart law by treating q as a current element (I dl = q v). The law itself is about steady current distributions; the single-charge form is a specialisation valid only in the static regime."
- **bridge_text [P30]:** "Think of the Biot-Savart law as a tool for continuous current distributions — like how Coulomb's law in integral form gives E from a charge distribution. For a single charge, you get the Biot-Savart result as a special case, but the foundational statement requires a current — a flow of many charges in a conductor."
- **replacement_text [P31]:** "Biot-Savart law: dB = (μ₀/4π)(I dl × r̂)/r² for a current element in a conductor. For a single moving charge: B = (μ₀/4π)(qv × r̂)/r² — this is the B field of a moving charge, derived from Biot-Savart but requiring careful interpretation (valid only for v << c and steady motion)."
- **discrimination_pairs [P33]:**
  - Steady current in wire: Biot-Savart gives exact static B field
  - Single moving charge: Biot-Savart form valid for v<<c; full treatment needs special relativity
  - Accelerating charge: emits radiation — neither Biot-Savart nor static B applies
- **s6_path:** If student needs single-charge field, use B = (μ₀/4π)(qv×r̂/r²) with explicit note on validity regime.

---

### MC-B-FALLS-OFF-AS-1/R-SQUARED-FOR-ALL-GEOMETRIES
- **trigger_signal:** Student applies 1/r² for all current configurations (wire, loop, solenoid).
- **conflict_evidence [P28]:** "1/r² is the fall-off for the field element dB from a single current element. But integrating many elements changes the overall dependence. For an infinite wire: all contributions add constructively → B = μ₀I/(2πR) ∝ 1/R (not 1/R²). For a current loop on-axis far away: B ∝ 1/x³ (dipole). For a solenoid: uniform B inside, 0 outside. Different geometries give completely different distance dependences."
- **bridge_text [P30]:** "Compare with Coulomb's law: a point charge gives E ∝ 1/r². An infinite line of charge gives E ∝ 1/r. An infinite plane gives E = constant (no r dependence). Same 1/r² element law, completely different integral results. The geometry of the source determines the fall-off."
- **replacement_text [P31]:** "Fall-off of B depends on geometry: point source (current element): dB ∝ 1/r². Infinite wire: B ∝ 1/r. Far from current loop (magnetic dipole): B ∝ 1/r³. Solenoid interior: B = μ₀nI (constant, no r dependence). Always integrate; never assume 1/r²."
- **discrimination_pairs [P33]:**
  - Single current element: dB ∝ 1/r²
  - Infinite straight wire: B = μ₀I/(2πR) ∝ 1/R
  - Magnetic dipole (far field): B ∝ 1/r³
  - Solenoid interior: B = μ₀nI (uniform)
- **s6_path:** Walk through the infinite wire integration to show explicitly how 1/r² integrates to 1/r.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** For an infinite straight wire carrying current I, the magnetic field at distance R is:
(a) μ₀I/(4πR²) **(b) μ₀I/(2πR)** (c) μ₀IR/(2π) (d) μ₀I/(2R)

**A2 (Short answer):** What is the direction of the magnetic field at the centre of a circular current loop?
[Along the axis of the loop; direction given by right-hand rule: curl fingers in direction of current, thumb points along B]

**A3 (Fill-in):** The SI constant μ₀ is called _______ and equals _______ T·m/A.
[Permeability of free space; 4π×10⁻⁷]

---

### Probe Set B — Conceptual Transfer
**B1:** Two long parallel wires carry currents of 5 A (both in the same direction) and are 10 cm apart. Find B at a point 5 cm from each wire (midpoint). What if the currents are in opposite directions?
[Same direction: B₁ = B₂ = μ₀×5/(2π×0.05) = 2×10⁻⁵ T; fields point opposite directions at midpoint → B_total = 0. Opposite directions: fields add → B_total = 4×10⁻⁵ T]

**B2:** A circular loop of radius R carries current I. How does the field at the centre change if (a) I doubles, (b) R doubles, (c) the loop is replaced by 3 turns?
[(a) B doubles (∝I); (b) B halves (∝1/R); (c) B triples (∝N)]

**B3:** What is the direction of dB due to a horizontal current element pointing east, at a field point directly above the element?
[d**l** = east (+x̂); r̂ from element to point above = +ẑ (up); d**l** × r̂ = x̂ × ẑ = −ŷ (south). dB points south.]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** A square loop of side a = 10 cm carries I = 2.0 A. Find B at the centre. [Hint: each side contributes equally by symmetry; for a finite wire of length a at perpendicular distance a/2, B_wire = (μ₀I/4π) × (2/a) × sin45° × 2 = μ₀I√2/(2πa).]
[Each side: B_side = μ₀I sinθ / (4π × R) integrated; for finite wire of length L at distance d: B = (μ₀I/4πd)(sinθ₁ + sinθ₂); for a side of square: d = a/2, θ₁=θ₂=45°: B_side = (μ₀I/4π)(1/(a/2))(2×sin45°) = (μ₀I/4π)(2/a)(√2) = μ₀I√2/(4πa). Four sides: B_total = 4 × μ₀I√2/(4πa) = μ₀I√2/(πa) = 4π×10⁻⁷×2×1.414/(π×0.10) = **1.13×10⁻⁵ × 2/0.1** ... = 4√2 × μ₀I/(4πa) ... Let me compute directly: B = 4×(4π×10⁻⁷×2/(4π×0.05))×sin45° = 4×(10⁻⁷×2/0.05)×0.707 = 4×4×10⁻⁶×0.707 = 1.13×10⁻⁵ T]

**C2 (Synthesis):** Explain why Ampere's law is more useful than Biot-Savart for calculating the field of an infinite solenoid, but Biot-Savart is necessary for a short solenoid.
[Infinite solenoid has translational symmetry: B is uniform inside, zero outside, tangential component = 0. Ampere's law ∮B·dl = μ₀I_enc with rectangular loop gives B = μ₀nI in one step. Short solenoid: no perfect symmetry; the field bulges at the ends; B varies along axis. Must integrate Biot-Savart for each current element; Ampere's law alone cannot handle this geometry without the symmetry assumption.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: write the Biot-Savart law, give B for an infinite wire and for the centre of a circular loop. State why 1/r² is not the fall-off for a wire."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "Two wires: I₁=8A (east), I₂=6A (west), 12 cm apart. Find B at midpoint. Find B at a point 4 cm from wire 1 and 8 cm from wire 2."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Compare Coulomb's law (E from charge) and Biot-Savart (B from current): structure, fall-off, direction rule, superposition. What is analogous? What is different?"
  - offset: "+10 days"
    type: application [P91]
    prompt: "A 200-turn circular coil (radius 4cm, I=0.5A) sits inside a long straight wire (I=20A). Find B at the coil's centre due to (a) the coil alone, (b) the wire alone, (c) both combined."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Today we learn to calculate the magnetic field produced by any current — the fundamental law that underpins MRI machines, electrical motors, and particle physics detectors."

[P41 — Diagnostic]
"You know a long wire creates a magnetic field. Can you write the formula for B at distance R from a wire carrying current I?"
→ Correct (B = μ₀I/(2πR)): "Good — today we derive this from first principles."
→ Incorrect: "Let's build it element by element."

[P06 — Concrete anchor]
"Every tiny piece of wire acts like a tiny magnet. Biot-Savart law tells us how strong each piece's contribution is and in which direction. Then we add all contributions up — like vector gravity from many masses."

[TA-1 — The law and its structure: Block 1-A]
"dB = (μ₀/4π)(I dl sinθ)/r². Analogy with Coulomb. Cross product gives direction."

[P28 — Conflict evidence for MC-B-FALLS-OFF-AS-1/R-SQUARED-FOR-ALL-GEOMETRIES]
"WE-1 result: B = μ₀I/(2πR) ∝ 1/R for an infinite wire — NOT 1/R². That 1/r² from a single element integrated over an infinite line gives 1/r. The geometry of the source completely changes the fall-off."

[P51 — Check-in]
"For a point source: dB ∝ ? For an infinite wire: B ∝ ? For a magnetic dipole far away: B ∝ ?"
[1/r²; 1/r; 1/r³]

[TA-2 — Standard results: Block 1-B, WE-1]
"Infinite wire: B = μ₀I/(2πR). Two-wire calculation with fields adding or cancelling."

[TA-3 — Circular loop results: Block 1-B, WE-2, WE-3]
"Centre: B = μ₀I/(2R). On-axis: B = μ₀IR²/[2(R²+x²)^{3/2}]. Far field → dipole ∝ 1/x³."

[P52 — Narrow]
"Three formulas to memorise: Biot-Savart element; B_wire = μ₀I/(2πR); B_loop_centre = μ₀I/(2R)."

[P28 — Conflict evidence for MC-BIOT-SAVART-GIVES-FIELD-FROM-A-SINGLE-MOVING-CHARGE]
"Strictly for steady currents. Single moving charge: B = (μ₀/4π)qv×r̂/r² is valid for v<<c — a useful formula, but derived from and secondary to the fundamental law for currents."

[TA-4 — Direction and right-hand rule: Block 1-C, Probe B3]

[P62 — Retrieval seed]
"Write from memory: Biot-Savart formula, B for infinite wire, B at loop centre, and why 1/r² is not universal."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Biot-Savart: dB = (μ₀/4π)(I dl × r̂)/r². Integrating over a wire geometry gives different r-dependences. Two key results: B=μ₀I/(2πR) for wire; B=μ₀I/(2R) at loop centre. Next: Ampere's law — a shortcut when symmetry is high."

[P85 — Regulation tail]
"Shakiest part: the cross-product direction rule, the integration to get 1/r for a wire, or the on-axis loop formula?"

[P89 — Retrieval schedule]
"Return in 1 day for the two-wire probe."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks 1/r²) | Deploy MC-B-FALLS-OFF-AS-1/R-SQUARED; show integration from −∞ to +∞ step by step |
| Probe B3 wrong direction | Redo right-hand rule with explicit coordinate axes; compute x̂×ẑ = −ŷ symbolically |
| Probe B1 wrong (same-direction cancellation) | Draw both wire fields at midpoint; show they point in opposite directions → cancel |
| Probe C1 square loop | Decompose into 4 finite wires; use finite-wire formula for each side |
| Student asks how Ampere's law relates | Preview: Ampere's law ∮B·dl = μ₀I_enc is a macroscopic consequence of Biot-Savart; exact same physics, different calculation strategy |

---

## Component 8 — Visualisation Specification

**Primary visual:** Biot-Savart element diagram — current element I dl on a wire; field point P; distance vector r; angle θ; dB arrow perpendicular to the plane of dl and r; right-hand rule arrows showing cross product direction. Annotated formula dB = (μ₀/4π)(I dl sinθ)/r².

**Secondary visual:** Fall-off comparison chart — three curves on same log-log plot: single element dB ∝ 1/r² (steepest); infinite wire B ∝ 1/r (middle); magnetic dipole B ∝ 1/r³ (steepest of geometric results). Caption: "same dB element law → different B fall-off depending on source geometry."

**Tertiary visual:** On-axis loop field diagram — circular loop in xy-plane; axis z; field vector at three positions: centre (maximum, along z), midpoint (smaller), far away (tiny, along z). Plot B(x) vs. x showing central maximum and decay toward 1/x³ at large x.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.biot-savart)                  PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (advanced → 5)                        PASS
V-4  bloom verb matches level (apply → calculate/derive)                   PASS
V-5  prerequisites listed in KG (phys.em.magnetic-force)                   PASS
V-6  mastery_threshold = 0.80                                              PASS
V-7  session_cap rule applied (≥1h → PA-3)                                PASS
V-8  cpa_entry_stage matches difficulty 5 formula                          PASS
V-9  status = READY                                                        PASS
V-10 ≥2 misconceptions with all 6 MC fields                               PASS
V-11 ≥3 worked examples with full solution                                 PASS
V-12 Probe sets A (recall), B (transfer), C (mastery gate) present        PASS
V-13 Retrieval schedule has ≥4 events with offsets                        PASS
V-14 Session flow uses P-codes from Primitive Library                      PASS
V-15 Adaptive branching table present                                      PASS
V-16 Visualisation spec present with ≥2 visuals                           PASS
V-17 No framework/runtime/route modifications                              PASS
V-18 No mathematics content authored                                       PASS
V-19 All formulas dimensionally consistent                                 PASS
V-20 Cross-links reference valid KG concept IDs                            PASS
```

**Overall status: READY**

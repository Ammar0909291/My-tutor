# Teaching Blueprint — phys.em.amperes-law

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.amperes-law
name: Ampere's Law
domain: electromagnetism
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.em.biot-savart
mastery_threshold: 0.80
estimated_hours: 6
cross_links:
  - phys.em.solenoid
  - phys.em.maxwells-equations
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — The Law
**Ampere's law** (magnetostatic form): the line integral of **B** around any closed path (Amperian loop) equals μ₀ times the total current passing through any surface bounded by that path:

> **∮ B · dl = μ₀ I_enc**

Where I_enc = net current through the Amperian loop (positive if current passes in the direction determined by the right-hand rule relative to the chosen circulation direction).

Relationship to Biot-Savart: Ampere's law and the Biot-Savart law contain the same physics — they are equivalent for magnetostatics. Ampere's law is the integral form; Biot-Savart is the differential-element form. The difference is strategic: Ampere's law requires sufficient **symmetry** to extract B from inside the integral; Biot-Savart works for any geometry by direct integration.

When to use Ampere's law (symmetry conditions):
- **Cylindrical symmetry**: infinite wire, coaxial cable, cylindrical conductor
- **Planar symmetry**: infinite current sheet
- **Toroidal symmetry**: toroid
- **Solenoid**: use rectangular Amperian loop

### Block 1-B — Standard Applications

**Infinite straight wire** (radius a, total current I):

*Outside* (r > a): ∮B·dl = B(2πr) = μ₀I → **B = μ₀I/(2πr)** ✓ (same as Biot-Savart)

*Inside a solid conductor* (r < a, uniform current density J = I/πa²):  
I_enc = J × πr² = I(r²/a²)  
B(2πr) = μ₀I(r²/a²) → **B = μ₀Ir/(2πa²)** (increases linearly with r inside)

**Infinite solenoid** (n turns/m, current I):
Rectangular Amperian loop: one side inside (B = B_in, parallel to axis), opposite side outside (B_out = 0 by symmetry and argument), two sides perpendicular (B ⊥ dl → no contribution):
∮B·dl = B_in × L = μ₀ × (nL) × I → **B = μ₀nI**

**Toroid** (N turns, mean radius R):
Circular Amperian loop of radius r (inside toroid): ∮B·dl = B(2πr) = μ₀NI → **B = μ₀NI/(2πr)**  
Outside toroid: I_enc = 0 (currents cancel) → **B = 0**

### Block 1-C — Displacement Current and the Ampere-Maxwell Law
Ampere's original law fails for a capacitor being charged: choose a flat surface through the wire (I_enc = I) vs. a bulging surface through the gap (I_enc = 0). Same loop, different answers — contradiction.

Maxwell fixed this by adding the **displacement current**:
> **I_d = ε₀ dΦ_E/dt**

Modified Ampere-Maxwell law (one of Maxwell's equations):
> **∮ B · dl = μ₀(I_enc + I_d) = μ₀I_enc + μ₀ε₀ dΦ_E/dt**

A changing electric field creates a circulating magnetic field — even with no real current. This symmetry with Faraday's law (changing B → E) leads to self-sustaining electromagnetic waves.

### Block 1-D — Sign Convention and Direction
1. Choose an Amperian loop and a circulation direction (clockwise or counterclockwise)
2. Right-hand rule: curl right hand in circulation direction → thumb gives positive current direction
3. Count I_enc with signs: positive if through surface in thumb direction, negative if opposite
4. Evaluate ∮B·dl: if B is parallel to dl everywhere with magnitude B, integral = B × (loop perimeter)

---

## Component 2 — Worked Examples

### WE-1 — Field Inside and Outside a Wire
**Problem:** A solid copper wire of radius a = 2.0 mm carries I = 10 A (uniform current density). Find B at: (a) r = 1.0 mm (inside), (b) r = 2.0 mm (surface), (c) r = 5.0 mm (outside).

**Solution:**
(a) r = 1.0 mm < a: B = μ₀Ir/(2πa²) = (4π×10⁻⁷ × 10 × 1.0×10⁻³) / (2π × (2.0×10⁻³)²)  
= (4π×10⁻⁶) / (2π × 4×10⁻⁶) = **0.50×10⁻³ T = 0.50 mT**

(b) r = a = 2.0 mm: B = μ₀I/(2πa) = (4π×10⁻⁷ × 10)/(2π × 2.0×10⁻³) = **1.00 mT** (same from both formulas at boundary ✓)

(c) r = 5.0 mm > a: B = μ₀I/(2πr) = (4π×10⁻⁷ × 10)/(2π × 5.0×10⁻³) = **0.40 mT**  
(B decreases for r > a, as expected: further from wire → weaker field)

---

### WE-2 — Solenoid Field
**Problem:** A solenoid has 800 turns, length 40 cm, radius 2 cm, I = 3.0 A. Find B inside and verify the end field is B/2.

**Solution:**
n = 800/0.40 = 2000 turns/m  
B_inside = μ₀nI = 4π×10⁻⁷ × 2000 × 3.0 = 4π×10⁻⁷ × 6000 = **7.54×10⁻³ T = 7.54 mT**

At the end of a finite solenoid (half-infinite): by symmetry, only half the field of the infinite case leaks out:  
B_end = ½B_inside = **3.77 mT** (result from Biot-Savart integration of semi-infinite solenoid)

---

### WE-3 — Displacement Current in Capacitor
**Problem:** A parallel-plate capacitor (A = 100 cm², d = 1.0 mm) is connected to a source giving dV/dt = 10⁶ V/s. Find: (a) displacement current I_d, (b) B between the plates at r = 3.0 cm from the axis.

**Solution:**
C = ε₀A/d = 8.85×10⁻¹² × 100×10⁻⁴ / 1.0×10⁻³ = **88.5 pF**

(a) I_d = C × dV/dt = 88.5×10⁻¹² × 10⁶ = **88.5 μA**  
Or: I_d = ε₀ dΦ_E/dt = ε₀ A × d(E)/dt = ε₀ × A × (1/d) × dV/dt = C × dV/dt ✓

(b) Treat displacement current like a real current (uniformly distributed over area A = 100 cm²):  
At r = 3.0 cm: check if r < radius of plates (radius ≈ √(A/π) = √(10⁻²/π) = 5.6 cm), so r = 3.0 cm is inside.  
Fraction of displacement current enclosed: I_d_enc = I_d × (πr²/A) = 88.5×10⁻⁶ × π(0.03)²/10⁻² = 88.5×10⁻⁶ × 0.2827 = 25.0 μA  
B = μ₀I_d_enc/(2πr) = (4π×10⁻⁷ × 25.0×10⁻⁶)/(2π × 0.03) = **1.67×10⁻¹⁰ T** (extremely small, as expected for a capacitor)

---

## Component 3 — Misconception Engine

### MC-AMPERES-LAW-GIVES-B-FROM-ENCLOSED-CURRENT-ONLY
- **trigger_signal:** Student says "B on the Amperian loop is only due to the current inside the loop; outside currents don't matter."
- **conflict_evidence [P28]:** "Ampere's law ∮B·dl = μ₀I_enc is exact — but B in the integrand is the total field from ALL currents, not just enclosed ones. Outside currents contribute to B at every point on the loop. However, because of their geometry, their contributions to the line integral ∮B·dl cancel out around the closed path. The left side (total B integrated) equals the right side (μ₀ × enclosed current only) — but B itself includes all contributions."
- **bridge_text [P30]:** "Gauss's law analogy: ∮E·dA = Q_enc/ε₀. The E field at every point on the Gaussian surface is from ALL charges (inside and outside). But the surface integral evaluates to only the enclosed charge — outside charges' contributions to the integral cancel by symmetry of a closed surface. Same logic for Ampere: B is total, but ∮B·dl = μ₀I_enc."
- **replacement_text [P31]:** "B on the Amperian loop = total field from all currents. ∮B·dl = μ₀I_enc because outside currents' contributions to the line integral cancel around a closed loop. Never say 'B is only from enclosed current' — say 'the line integral equals μ₀I_enc.'"
- **discrimination_pairs [P33]:**
  - Wrong: "B at the loop = μ₀I_enc/(2πr)" (only valid for infinite wire where B is purely from that wire by symmetry)
  - Correct: "B at the loop = total B; but ∮B·dl = μ₀I_enc"
  - When multiple currents are present: B is superposition; only I_enc contributes to the integral
- **s6_path:** Work through a two-wire problem: place the Amperian loop enclosing only wire 1; B is from both wires, but compute ∮B·dl = μ₀I₁ exactly.

---

### MC-AMPERES-LAW-WORKS-FOR-ALL-GEOMETRIES
- **trigger_signal:** Student tries to use Ampere's law for a short wire, a bent wire, or a single turn of wire, expecting it to give B easily.
- **conflict_evidence [P28]:** "For Ampere's law to give B without a full vector integral, B must be constant in magnitude and parallel to dl around the chosen loop — this requires high symmetry. For a short wire, B is not constant around any loop and is not parallel to any simple closed path. Ampere's law is still true but gives ∮B·dl = μ₀I_enc — an equation for the integral, not B itself. You'd need to evaluate B first (from Biot-Savart) to find the integral. Ampere's law only makes B easy to find when symmetry pins B's direction and magnitude on the loop."
- **bridge_text [P30]:** "Gauss's law for electricity: always true, but only makes calculating E easy for spherical, cylindrical, or planar symmetry. For an asymmetric charge, ∮E·dA = Q/ε₀ is correct but useless for finding E. Ampere's law is the magnetic analogue: always correct, only computationally powerful with symmetry."
- **replacement_text [P31]:** "Ampere's law ∮B·dl = μ₀I_enc is always true. It makes finding B easy ONLY when B is constant in magnitude and parallel to dl around the Amperian loop — achieved with cylindrical, planar, or toroidal symmetry. Otherwise, use Biot-Savart."
- **discrimination_pairs [P33]:**
  - Infinite straight wire: perfect cylindrical symmetry → Ampere's law gives B in one step
  - Infinite solenoid: translational + cylindrical symmetry → Ampere's law easy
  - Short wire segment: no symmetry → Ampere's law correct but useless; use Biot-Savart
  - Single circular loop: no useful symmetry for Ampere → use Biot-Savart result
- **s6_path:** Ask student to try Ampere's law for a circular loop at an off-axis point — show why no Amperian loop can extract B.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** Inside a long solenoid (n turns/m, current I), B equals:
**(a) μ₀nI** (b) μ₀NI/(2πR) (c) μ₀I/(2πR) (d) μ₀I/(2R)

**A2 (Short answer):** State Ampere's law and identify when it is most useful for calculating B.
[∮B·dl = μ₀I_enc; most useful when B is constant and parallel to dl around the Amperian loop — requires high symmetry]

**A3 (Fill-in):** For a solid cylindrical wire of radius a carrying current I, B inside (r < a) is proportional to ______.
[r (B = μ₀Ir/(2πa²)); linear in r]

---

### Probe Set B — Conceptual Transfer
**B1:** A coaxial cable: inner wire (radius a, current I into page) and outer cylindrical shell (radius b, current I out of page). Find B at: (i) r < a, (ii) a < r < b, (iii) r > b.
[(i) B = μ₀Ir/(2πa²) (inside inner conductor, I_enc = Ir²/a²). (ii) B = μ₀I/(2πr) (only inner wire enclosed). (iii) I_enc = I−I = 0 → B = 0. This is why coaxial cables have no external magnetic field — they shield their own magnetic field.]

**B2:** A toroid has N = 400 turns, inner radius r₁ = 5 cm, outer radius r₂ = 8 cm, I = 2.0 A. Find B at r = 6.5 cm (midpoint) and outside.
[Inside: B = μ₀NI/(2πr) = 4π×10⁻⁷×400×2.0/(2π×0.065) = 3.2×10⁻⁴/0.408 = 2.46×10⁻³ T. Outside: B = 0 (I_enc = 0).]

**B3:** Explain why the displacement current resolves the paradox of choosing different surfaces for the same Amperian loop around a charging capacitor wire.
[Flat surface: I_enc = I (conduction current). Bulging surface through gap: I_enc = 0 (no charges cross) but I_d = ε₀dΦ_E/dt = I (since capacitor voltage rises at dV/dt = I/C → dE/dt = I/(ε₀A)). Both surfaces give I_enc + I_d = I. Modified law is self-consistent.]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** A long solid cylindrical conductor (radius R = 5 mm) carries a non-uniform current density J = J₀(r/R) A/m² (increases toward the surface). Total current I = 10 A. (a) Find J₀. (b) Find B at r = R/2. (c) Find B at r = 2R.
[(a) I = ∫₀ᴿ J(2πr)dr = ∫₀ᴿ J₀(r/R)2πr dr = 2πJ₀/R × R²/2 × ... = 2πJ₀∫₀ᴿ r²/R dr = 2πJ₀R²/3. So J₀ = 3I/(2πR²) = 3×10/(2π×25×10⁻⁶) = 1.91×10⁵ A/m². (b) I_enc(r=R/2) = 2πJ₀∫₀^{R/2} r²/R dr = 2πJ₀/(3R) × (R/2)³ = 2πJ₀R²/24. I_enc = I/8 = 1.25 A (since I_enc ∝ r³). B = μ₀I_enc/(2πr) = 4π×10⁻⁷×1.25/(2π×0.0025) = 10⁻⁴ T = 0.10 mT. (c) r = 2R: I_enc = I = 10A. B = μ₀I/(2π×2R) = 4π×10⁻⁷×10/(2π×0.01) = 2.0×10⁻⁴ T = 0.20 mT.]

**C2 (Synthesis):** Why was Maxwell's addition of displacement current crucial for the prediction of electromagnetic waves? Explain the self-sustaining cycle.
[Without I_d, ∮B·dl = μ₀I only — no current in vacuum → B cannot change in vacuum → no waves. With I_d = ε₀dΦ_E/dt: a changing E creates B (Ampere-Maxwell). Faraday's law: a changing B creates E. Combined: changing E → changing B → changing E → ... self-sustaining wave. Wave speed c = 1/√(μ₀ε₀) = 3×10⁸ m/s — Maxwell immediately recognised this as light.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: state Ampere's law, give B inside and outside an infinite solenoid, and explain when Ampere's law is useful vs. when to use Biot-Savart."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "A solid wire (radius 3mm, I=15A uniform). Find B at r=1mm, r=3mm, r=6mm. Sketch B vs. r showing both regimes."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Ampere's law vs. Biot-Savart: same physics, different tools. For each geometry — (a) infinite wire, (b) short wire, (c) solenoid, (d) toroid — state which law to use and why."
  - offset: "+10 days"
    type: application [P91]
    prompt: "Coaxial cable design: inner wire (radius a=1mm, current 5A out). Outer shell (radius b=4mm, current 5A in). Find B at r=0.5mm, r=2mm, r=6mm. What makes this a good design for signal cables?"
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Ampere's law is the magnetic analogue of Gauss's law — a powerful shortcut that turns hard integrals into simple algebra, but only when the geometry is symmetric enough. Today we'll learn when to use it and derive the key results that power solenoids and toroidal transformers."

[P41 — Diagnostic]
"You know B = μ₀I/(2πR) for an infinite wire. Can you derive this from first principles without Biot-Savart? What symmetry would you exploit?"
→ Correct (circular symmetry, B constant around a circle): "Exactly — let's formalise that."
→ Incorrect: "That intuition about circular symmetry is the key. Let's develop it."

[P06 — Concrete anchor]
"Gauss's law for electricity: ∮E·dA = Q_enc/ε₀. The surface integral of E gives enclosed charge. Ampere's law: ∮B·dl = μ₀I_enc. The line integral of B gives enclosed current. Same logic, same power, same limitation: only useful when the integrand is forced to be constant by symmetry."

[TA-1 — The law and when to use it: Block 1-A]
"∮B·dl = μ₀I_enc. Symmetry requirement. Compare with Biot-Savart."

[P28 — Conflict evidence for MC-AMPERES-LAW-WORKS-FOR-ALL-GEOMETRIES]
"A bent wire or a short wire segment: no circular, planar, or toroidal symmetry. Ampere's law is true (∮B·dl = μ₀I_enc) but useless — you can't extract B because it's not constant around any simple loop. Use Biot-Savart for those. Ampere's law shines only for infinite/long straight wires, solenoids, and toroids."

[P51 — Check-in]
"Name three geometries where Ampere's law makes B easy to find. What property makes each usable?"

[TA-2 — Wire inside and outside: Block 1-B, WE-1]
"Inside solid wire: B ∝ r (linear). Outside: B ∝ 1/r. Peak at surface."

[TA-3 — Solenoid and toroid: Block 1-B, WE-2]
"Solenoid: B = μ₀nI inside; 0 outside. Walk Amperian loop through solenoid to show why."

[P28 — Conflict evidence for MC-AMPERES-LAW-GIVES-B-FROM-ENCLOSED-CURRENT-ONLY]
"B on the loop is from ALL currents. The integral ∮B·dl = μ₀I_enc — outside currents contribute to B everywhere on the loop, but their net contribution to the line integral cancels. Never confuse 'B is from enclosed current' with 'the integral equals μ₀I_enc.'"

[TA-4 — Displacement current: Block 1-C, WE-3]
"∮B·dl = μ₀(I + ε₀dΦ_E/dt). Resolves capacitor paradox. Enables EM waves."

[P52 — Narrow]
"Three key results: B_wire = μ₀I/(2πr) (outside); B_solenoid = μ₀nI; B_toroid = μ₀NI/(2πr). Displacement current: I_d = ε₀dΦ_E/dt."

[P62 — Retrieval seed]
"Write from memory: Ampere's law, B inside/outside wire, B solenoid, B toroid, displacement current formula."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Ampere's law ∮B·dl = μ₀I_enc: powerful with symmetry (wire, solenoid, toroid), useless without it. Inside a solid wire: B ∝ r. Outside: B ∝ 1/r. Displacement current completes Maxwell's equations and predicts EM waves."

[P85 — Regulation tail]
"Shakiest: choosing the Amperian loop, the displacement current argument, or the inside-wire result?"

[P89 — Retrieval schedule]
"Return tomorrow for the solid-wire retrieval quiz."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks toroid formula) | Clarify: solenoid = μ₀nI; toroid = μ₀NI/(2πr); both use Ampere's law but different loops |
| Probe B1 wrong (r > b region) | Show: Amperian circle encloses I_in + I_out = I − I = 0 → B = 0; this is coaxial cable's advantage |
| Probe B3 incomplete | Walk through: I_d = C × dV/dt = I (at constant current charging); both surfaces give same ∮B·dl |
| Probe C1 wrong (non-uniform J) | Integrate J(r) = J₀r/R over circle of radius r: I_enc = ∫₀ʳ J(r')2πr' dr' = 2πJ₀/R × r³/3 |
| Student asks about magnetic shielding | Coaxial cable: B = 0 outside → no external field; use for high-frequency signal cables, RF equipment |

---

## Component 8 — Visualisation Specification

**Primary visual:** B vs. r graph for solid cylindrical conductor — linear rise (∝r) inside the wire from r=0 to r=a (peak B at surface); hyperbolic fall (∝1/r) outside from r=a onward. Label: B_max at r=a, both formulas annotated on each region. Also show the Amperian loop for each region as inset circles.

**Secondary visual:** Solenoid Amperian loop diagram — cross-section of infinite solenoid; rectangular Amperian loop straddling one wall; label four sides: (1) inside, parallel to axis, length L, B·dl = BL; (2) and (4) perpendicular to axis, B·dl = 0; (3) outside, B = 0, contribution = 0. Equation: BL = μ₀(nL)I → B = μ₀nI.

**Tertiary visual:** Displacement current paradox — capacitor with flat and bulging surfaces for the same Amperian loop (wire encircling circuit); flat: I_enc = I; bulging through gap: I_enc = 0 but I_d = ε₀dΦ_E/dt = I; both give same ∮B·dl = μ₀I. Caption: "Maxwell's fix: add displacement current."

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.amperes-law)                  PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (advanced → 5)                        PASS
V-4  bloom verb matches level (apply → calculate/derive)                   PASS
V-5  prerequisites listed in KG (phys.em.biot-savart)                     PASS
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

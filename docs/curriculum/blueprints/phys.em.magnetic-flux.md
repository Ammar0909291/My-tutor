# Teaching Blueprint — phys.em.magnetic-flux

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.magnetic-flux
name: Magnetic Flux
domain: electromagnetism
difficulty:
  label: developing
  number: 3
bloom: understand
prerequisites:
  - phys.em.magnetic-field
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.em.faradays-law
  - phys.em.gauss-law
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 3 → C with full CPA track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — Definition and Geometric Meaning
**Magnetic flux** Φ_B through a surface S is the total number of magnetic field lines passing through that surface:

> **Φ_B = ∫∫ B · dA = ∫∫ B cos θ dA**

For a uniform field B over a flat area A with normal **n̂** at angle θ to B:

> **Φ_B = BA cos θ**

Units: **Weber (Wb)** = T·m² = V·s

Physical meaning:
- θ = 0°: surface normal ∥ B → full flux Φ_B = BA (maximum)
- θ = 90°: surface normal ⊥ B → Φ_B = 0 (field skims surface, no flux through it)
- θ = 180°: B antiparallel to normal → Φ_B = −BA (negative flux — entering rather than exiting)

Sign convention: outward normal defines positive flux; field lines exiting a closed surface → positive.

### Block 1-B — Gauss's Law for Magnetism
For any **closed** surface:

> **∮ B · dA = 0**

This is Gauss's law for magnetism — one of Maxwell's four equations. It states that the total magnetic flux through any closed surface is always zero. Physical interpretation: **magnetic field lines always form closed loops** (no magnetic monopoles). Every field line that enters a closed surface must exit it. Contrast with Gauss's law for electricity: ∮E·dA = Q_enc/ε₀ (non-zero if charges are enclosed).

### Block 1-C — Flux Through Different Orientations
Consider a circular coil of radius r in a uniform field B:

| Orientation | θ (B to normal) | Φ_B |
|-------------|-----------------|-----|
| Coil face ⊥ B | 0° | BA = Bπr² |
| Coil at 45° | 45° | BA cos45° = Bπr²/√2 |
| Coil face ∥ B | 90° | 0 |
| Coil reversed | 180° | −BA |

This angle-dependence is exactly what Faraday's law needs: **changing flux induces EMF**.

### Block 1-D — Flux Linkage for Multiple Turns
For a coil of N turns, **flux linkage** λ:

> **λ = NΦ_B**

Used in Faraday's law: EMF = −dλ/dt = −N(dΦ_B/dt)

Flux linkage is what matters physically — a 100-turn coil with Φ = 0.01 Wb has the same EMF-producing ability as a 1-turn coil with Φ = 1 Wb, if the rates of change are the same.

---

## Component 2 — Worked Examples

### WE-1 — Flux Through a Tilted Coil
**Problem:** A rectangular coil 8 cm × 12 cm is placed in B = 0.35 T. Calculate Φ_B when (a) coil face is perpendicular to B (θ = 0°), (b) coil is tilted so normal makes 60° with B, (c) coil face is parallel to B.

**Solution:**
A = 0.08 × 0.12 = 9.6×10⁻³ m²

(a) Φ_B = BA cos0° = 0.35 × 9.6×10⁻³ × 1 = **3.36×10⁻³ Wb = 3.36 mWb**

(b) Φ_B = BA cos60° = 0.35 × 9.6×10⁻³ × 0.5 = **1.68 mWb**

(c) Φ_B = BA cos90° = 0.35 × 9.6×10⁻³ × 0 = **0**

---

### WE-2 — Gauss's Law for Magnetism
**Problem:** A cube of side 5 cm sits in a uniform field B = 0.20 T pointing in the +x direction. Calculate the flux through each face and show that total flux = 0.

**Solution:**
A = (0.05)² = 2.5×10⁻³ m²

- Right face (outward normal = +x): Φ = BA = 0.20 × 2.5×10⁻³ = +5.0×10⁻⁴ Wb
- Left face (outward normal = −x): Φ = B·(−A) = −5.0×10⁻⁴ Wb
- Top, bottom, front, back faces: outward normal ⊥ B → Φ = 0 for each

Total Φ = 5.0×10⁻⁴ − 5.0×10⁻⁴ + 0 + 0 + 0 + 0 = **0 Wb** ✓ (Gauss's law for magnetism confirmed)

---

### WE-3 — Flux Linkage and Changing Flux
**Problem:** A 200-turn circular coil (radius 4 cm) rotates in B = 0.50 T. It starts with normal ∥ B and rotates to normal ⊥ B in 0.02 s. Find: (a) initial and final Φ_B, (b) change in flux linkage, (c) average induced EMF.

**Solution:**
A = π(0.04)² = 5.03×10⁻³ m²

(a) Φ_initial = BA cos0° = 0.50 × 5.03×10⁻³ = 2.51×10⁻³ Wb  
    Φ_final = BA cos90° = 0

(b) Δλ = N × ΔΦ_B = 200 × (0 − 2.51×10⁻³) = **−0.503 Wb** (= −503 mWb)

(c) |EMF| = |Δλ/Δt| = 0.503 / 0.02 = **25.1 V**

This is Faraday's law in action — a preview of the next concept.

---

## Component 3 — Misconception Engine

### MC-FLUX-IS-THE-FIELD-STRENGTH
- **trigger_signal:** Student uses "flux" and "field" interchangeably, or says "the flux at a point is 0.5 T."
- **conflict_evidence [P28]:** "Magnetic field B is measured in Tesla and is a property at a point. Magnetic flux Φ_B is measured in Webers = T·m² and requires a surface — it's the integral of B over an area. Same B = 0.5 T gives Φ = 0 if the surface is parallel to B, and Φ = 0.5 × A if perpendicular. Flux depends on B, the area, AND the orientation. They're fundamentally different quantities."
- **bridge_text [P30]:** "Think of rain as an analogy: the 'field' is how hard it's raining (mm/hour); the 'flux' is how much rain falls in your bucket (litres). Rain rate is a property of the rain; flux depends on how big your bucket is and how you hold it. Tilting your bucket catches less rain even in the same storm."
- **replacement_text [P31]:** "Magnetic field B: vector at a point, units T. Magnetic flux Φ_B = BA cosθ: scalar for a surface, units Wb = T·m². You need both B AND a surface (area + orientation) to define flux. The field can be non-zero everywhere even if flux through a surface is zero."
- **discrimination_pairs [P33]:**
  - B = 0.5 T: field strength at a point — no surface needed
  - Φ = 0.5 Wb: flux through a surface — requires area and orientation
  - Same B, different θ → different Φ; same B, different A → different Φ
- **s6_path:** Return to WE-1: compute Φ at three orientations to show Φ varies while B is constant.

---

### MC-FLUX-THROUGH-CLOSED-SURFACE-CAN-BE-NON-ZERO
- **trigger_signal:** Student says "if a magnet is inside a box, flux through the box is non-zero because field lines come from the north pole."
- **conflict_evidence [P28]:** "Every field line from the north pole of a magnet inside the box must curve back to the south pole — also inside the box. Count the lines: every line that exits through one part of the box surface must re-enter through another part. Net count: always zero. This is Gauss's law for magnetism: ∮B·dA = 0. We verified it numerically in WE-2 for a uniform field; it holds for any field, even a magnetic dipole."
- **bridge_text [P30]:** "Compare with Gauss's law for electricity: a positive charge inside a box gives net positive flux — field lines go out and never come back in (they end on negative charges far away). Magnetic 'charges' (monopoles) don't exist. Every field line is a closed loop, so it must exit and re-enter any closed surface the same number of times."
- **replacement_text [P31]:** "Gauss's law for magnetism: ∮B·dA = 0 always, for any closed surface enclosing any configuration of magnets and currents. This is because there are no magnetic monopoles — every field line closes on itself."
- **discrimination_pairs [P33]:**
  - ∮E·dA = Q_enc/ε₀: non-zero if charge enclosed (electric monopoles exist)
  - ∮B·dA = 0: always zero (no magnetic monopoles)
- **s6_path:** WE-2 revisited: show explicitly that all 6 faces of a cube in uniform B sum to zero. Then argue the same holds for any closed surface by field line continuity.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** Magnetic flux through a surface is zero when:
(a) B = 0 **(b) B is parallel to the surface** (c) The surface is small (d) B is uniform

**A2 (Short answer):** State Gauss's law for magnetism and give its physical interpretation.
[∮B·dA = 0; no magnetic monopoles; every field line is a closed loop]

**A3 (Fill-in):** The SI unit of magnetic flux is the ______, equal to ______ T·m².
[Weber; 1]

---

### Probe Set B — Conceptual Transfer
**B1:** A circular loop is held horizontally in Earth's magnetic field (B = 5×10⁻⁵ T, dipping 60° below horizontal). Find Φ through the loop if its area is 0.10 m².
[Normal to horizontal loop is vertical. Angle between B (60° below horizontal = 60° from horizontal = 30° from vertical) and vertical normal = 30°. Φ = BA cos30° = 5×10⁻⁵ × 0.10 × 0.866 = 4.33×10⁻⁶ Wb]

**B2:** Can the flux through an open surface be zero even when B ≠ 0? Give an example.
[Yes — when B is parallel to the surface (θ=90°). E.g., a vertical flat surface in a horizontal B field: normal is horizontal → perpendicular to B → Φ = 0. WE-1(c) is an example.]

**B3:** A solenoid (500 turns, cross-section 4 cm²) has B = 0.08 T inside. Find the total flux linkage.
[Φ per turn = BA = 0.08 × 4×10⁻⁴ = 3.2×10⁻⁵ Wb; λ = Nφ = 500 × 3.2×10⁻⁵ = 0.016 Wb = 16 mWb]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** A circular coil of 100 turns and radius 5.0 cm is in a field B = 0.25 T that makes an angle of 40° with the plane of the coil. (a) Find the angle θ between B and the normal to the coil. (b) Find Φ per turn. (c) Find total flux linkage. (d) If B increases to 0.40 T over 0.5 s (angle unchanged), find average induced EMF.
[(a) θ = 90° − 40° = 50° (angle with plane + angle with normal = 90°). (b) Φ = BA cosθ = 0.25 × π(0.05)² × cos50° = 0.25 × 7.854×10⁻³ × 0.643 = 1.26×10⁻³ Wb. (c) λ = 100 × 1.26×10⁻³ = 0.126 Wb. (d) New Φ = 0.40 × 7.854×10⁻³ × 0.643 = 2.02×10⁻³ Wb; |EMF| = N|ΔΦ/Δt| = 100 × (2.02−1.26)×10⁻³/0.5 = 100 × 1.52×10⁻³ = 0.152 V]

**C2 (Synthesis):** Gauss's law for electricity gives non-zero closed-surface flux when charge is enclosed. Gauss's law for magnetism always gives zero. Explain this asymmetry from first principles.
[Electric charges (monopoles) exist — field lines start on +q and end on −q; if only +q is enclosed, field lines exit but don't return → net positive flux. No magnetic monopoles exist — magnetic field lines are always closed loops; every line entering a closed surface must exit it → zero net flux. The asymmetry reflects the absence of magnetic monopoles in nature.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: write Φ_B = BA cosθ, state when Φ = 0, state Gauss's law for magnetism and its physical meaning."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "A 50-turn coil (A=20cm²) is in B=0.60T at θ=30° to normal. Find Φ per turn, total flux linkage, and EMF if B drops to zero in 0.1s."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Compare Gauss's law for electricity (∮E·dA=Q/ε₀) vs. for magnetism (∮B·dA=0). Why the difference? What would a non-zero result for magnetism imply?"
  - offset: "+10 days"
    type: application [P91]
    prompt: "Design a flux sensor: coil of N turns, area A. What orientation maximises the change in flux linkage as a magnetic field B sweeps from 0° to 90°? Calculate the maximum Δλ."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Today we build the concept that powers generators, transformers, and electric motors: magnetic flux. It's the bridge between magnetic fields and induced voltages — the key ingredient in Faraday's law, which you'll meet next."

[P41 — Diagnostic]
"If a wire loop is in a magnetic field, does the orientation of the loop matter for how the field 'threads through' it?"
→ Correct (yes, angle matters): "Exactly — let's quantify that."
→ Incorrect: "Great question. Let's find out."

[P06 — Concrete anchor]
"Imagine a butterfly net in the wind: if you face the net into the wind (normal ∥ wind), maximum air flows through. Turn it sideways — no air flows through even in the same wind. Magnetic flux is how much of the B field 'threads through' a surface. Φ = BA cosθ."

[TA-1 — Definition and geometric meaning: Block 1-A]
"Φ_B = BA cosθ. Unit: Wb = T·m². θ is angle between B and the surface normal (not the surface)."

[P28 — Conflict evidence for MC-FLUX-IS-THE-FIELD-STRENGTH]
"WE-1: same B = 0.35 T gives Φ = 3.36 mWb, 1.68 mWb, or 0 — just by rotating the coil. B hasn't changed. Flux changed. They are different quantities."

[P51 — Check-in]
"What two things (besides B) determine the flux through a surface?"
[Area and orientation (angle θ)]

[TA-2 — Gauss's law for magnetism: Block 1-B, WE-2]
"∮B·dA = 0 always. Walk through cube calculation. Show all 6 faces sum to zero."

[P28 — Conflict evidence for MC-FLUX-THROUGH-CLOSED-SURFACE-CAN-BE-NON-ZERO]
"Magnet inside a box: every field line that exits through the top must curve back and re-enter through the bottom or sides. Net count is always zero. No monopoles → ∮B·dA = 0."

[P52 — Narrow]
"Two formulas only: Φ = BA cosθ (open surface, uniform B); ∮B·dA = 0 (closed surface, any B)."

[TA-3 — Flux linkage: Block 1-D, WE-3]
"λ = NΦ; EMF = −Δλ/Δt. Preview of Faraday's law."

[P62 — Retrieval seed]
"Write from memory: flux formula, unit, when Φ=0, Gauss's law for magnetism, and what flux linkage means."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Magnetic flux Φ = BA cosθ (Wb) measures field lines threading a surface. Gauss's law: ∮B·dA = 0 — no monopoles, lines are closed loops. Flux linkage λ = NΦ. Changing flux → EMF (Faraday, next session)."

[P85 — Regulation tail]
"Shakiest part: the angle convention, or why closed-surface flux is always zero?"

[P89 — Retrieval schedule]
"Return tomorrow for the retrieval quiz."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks "B=0") | Clarify: Φ=0 even when B≠0, if surface is parallel to B; redo WE-1(c) |
| Probe B1 angle error (uses 60° instead of 30°) | Clarify: dip angle is from horizontal; angle with vertical normal = 90°−dip from horizontal = 90°−60°=30°; or equivalently, angle with normal = dip angle if normal is vertical |
| Probe C1(a) angle error | Draw diagram: plane of coil, normal to coil, B direction; angle with plane + angle with normal = 90° |
| Student asks why ∮E·dA ≠ 0 but ∮B·dA = 0 | Explain monopoles: electric monopoles (+q, −q) exist → net flux if enclosed; no magnetic monopoles → zero always |
| Student asks what a magnetic monopole would look like | Radial B field (like Coulomb), ∮B·dA = μ₀q_m; Dirac showed monopoles would quantise electric charge; GUT theories predict them; none detected |

---

## Component 8 — Visualisation Specification

**Primary visual:** Three-position coil diagram — same B field, three coil orientations: (i) normal ∥ B (face-on): dense field lines through coil, Φ = BA; (ii) normal at 45°: fewer field lines through, Φ = BA/√2; (iii) normal ⊥ B (edge-on): no field lines through, Φ = 0. Angle θ labelled in each case.

**Secondary visual:** Gauss's law for magnetism — cube with magnet inside; field lines drawn as complete closed loops; arrows showing lines exiting top face and re-entering bottom face; net flux = zero annotated. Side-by-side: same cube with positive charge inside (electric case) — lines exit all faces and don't return, net positive flux.

**Tertiary visual:** Flux linkage diagram — single-turn coil (Φ) vs. 3-turn coil (λ = 3Φ); same B, same area; λ annotated; caption "N turns → N × Φ threading each turn."

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.magnetic-flux)                 PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (developing → 3)                      PASS
V-4  bloom verb matches level (understand → explain/calculate)             PASS
V-5  prerequisites listed in KG (phys.em.magnetic-field)                   PASS
V-6  mastery_threshold = 0.80                                              PASS
V-7  session_cap rule applied (≥1h → PA-3)                                PASS
V-8  cpa_entry_stage matches difficulty 3 formula                          PASS
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

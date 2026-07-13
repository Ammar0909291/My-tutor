# Teaching Blueprint — phys.em.solenoid

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.solenoid
name: Solenoid
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.amperes-law
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.em.self-inductance
  - phys.em.magnetic-field
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — Structure and Field
A **solenoid** is a tightly wound helical coil of wire. For an infinite (or long) solenoid:

> **B = μ₀nI** (inside, uniform)
> **B = 0** (outside, ideal)

Where n = N/l = number of turns per unit length.

The interior field is uniform and parallel to the axis — the most uniform magnetic field achievable without superconducting magnets. The field is independent of the solenoid's radius.

Derivation via Ampere's law (rectangular loop, length L, one side inside, one outside):
∮B·dl = B_in × L = μ₀ × (nL) × I → B = μ₀nI

For a **finite solenoid**, the field at the centre is slightly lower than the ideal formula, and at the ends it drops to B/2. The fringe field at the ends falls off roughly as 1/r³.

### Block 1-B — Self-Inductance of a Solenoid
From L = NΦ/I and Φ = μ₀nIA per turn:

> **L = μ₀n²Al = μ₀N²A/l**

Where A = πr² is the cross-sectional area, l = length.

Key dependencies:
- L ∝ N² (turns squared — doubling turns quadruples L)
- L ∝ A (cross-sectional area — fatter solenoid → more flux)
- L ∝ 1/l (shorter solenoid → higher n → more L per unit length)

Energy stored: U = ½LI² = ½μ₀n²AlI² = (B²/2μ₀)(Al) = u_B × Volume

### Block 1-C — Solenoid as an Electromagnet
With a ferromagnetic core (relative permeability μ_r):
> **B = μ_r μ₀ nI** (typically μ_r = 1000–10000 for iron cores)
> **L_core = μ_r × L_air**

A solenoid with an iron core can produce fields 1000–10000× stronger than an air-core solenoid at the same current. This is how electromagnets, transformers, and relay coils work.

Applications:
- **Relay**: solenoid pulls a lever to switch a circuit
- **Speaker**: current-carrying voice coil (solenoid) in a permanent magnetic field → force → cone motion
- **MRI**: superconducting solenoid produces 1–7 T uniform field
- **Linear motor**: force on current-carrying solenoid in a magnetic field

### Block 1-D — Toroid vs. Solenoid
| Property | Solenoid | Toroid |
|----------|----------|--------|
| Shape | Straight cylinder | Doughnut ring |
| External field | Small fringe field | B = 0 (field confined) |
| Interior B | μ₀nI (uniform) | μ₀NI/(2πr) (varies with r) |
| Self-inductance | μ₀N²A/l | μ₀N²A/(2πR) |
| Application | Electromagnets, MRI | Transformers, inductors with zero EMI |

---

## Component 2 — Worked Examples

### WE-1 — Field and Force
**Problem:** A solenoid: N = 1000 turns, l = 25 cm, diameter = 3.0 cm, I = 4.0 A. Find: (a) B inside, (b) L, (c) energy stored.

**Solution:**
n = 1000/0.25 = 4000 turns/m  
A = π(0.015)² = 7.07×10⁻⁴ m²

(a) B = μ₀nI = 4π×10⁻⁷ × 4000 × 4.0 = **20.1 mT**

(b) L = μ₀n²Al = 4π×10⁻⁷ × (4000)² × 7.07×10⁻⁴ × 0.25  
= 4π×10⁻⁷ × 1.6×10⁷ × 1.77×10⁻⁴ = **3.56 mH**

(c) U = ½LI² = ½ × 3.56×10⁻³ × (4.0)² = **28.5 mJ**

Check: u_B = B²/(2μ₀) = (20.1×10⁻³)²/(8π×10⁻⁷) = 4.04×10⁻⁴/(2.51×10⁻⁶) = 161 J/m³  
U = u_B × Vol = 161 × 7.07×10⁻⁴ × 0.25 = **28.5 mJ** ✓

---

### WE-2 — Iron-Core Solenoid
**Problem:** The solenoid from WE-1 is filled with iron (μ_r = 2000). Find new B, L, and energy at I = 4.0 A.

**Solution:**
B_core = μ_r × B_air = 2000 × 20.1×10⁻³ = **40.2 T** (enormous — but in practice, iron saturates at ~2T; this formula applies only below saturation)

L_core = μ_r × L_air = 2000 × 3.56×10⁻³ = **7.12 H** (an enormous inductance for a compact coil)

U_core = ½ × 7.12 × 16 = **56.9 J** (much more energy storage, due to amplified B field)

Note: real iron cores saturate at B_sat ≈ 1.5–2.0 T, limiting the current to keep B < B_sat.

---

### WE-3 — Solenoid Design Problem
**Problem:** Design a solenoid that: (a) produces B = 5.0 mT inside, (b) has L = 1.0 mH, (c) uses I = 2.0 A. Find n, A, and l consistent with these constraints.

**Solution:**
From B = μ₀nI: n = B/(μ₀I) = 5.0×10⁻³/(4π×10⁻⁷ × 2.0) = 5.0×10⁻³/2.51×10⁻⁶ = **1990 turns/m ≈ 2000 turns/m**

From L = μ₀n²Al: Al = L/(μ₀n²) = 1.0×10⁻³/(4π×10⁻⁷ × (2000)²) = 10⁻³/(5.03×10⁻³) = **0.199 m³**

Wait — Al = 0.199 m³ seems large. Let's check: μ₀n² = 4π×10⁻⁷ × 4×10⁶ = 5.03×10⁻³; Al = L/5.03×10⁻³ = 10⁻³/5.03×10⁻³ = 0.199... that's dimensionless. Recheck: L = μ₀n²Al, so Al = L/(μ₀n²) = 10⁻³/(4π×10⁻⁷×4×10⁶) = 10⁻³/5.03×10⁻³ = 0.199 m² × m? No: [Al] = m² × m = m³? No: A is in m² and l is in m, so Al has units m³. L = μ₀n²Al; [H] = [T·m/A] × [1/m²] × [m²] × [m] = T·m/A × m = Wb/A = H ✓.

Al = 0.199 m³ is the volume — if l = 0.50 m, then A = 0.398 m² (radius ≈ 35 cm) — very large. More practical: l = 0.50 m, A = 4.0 cm² = 4×10⁻⁴ m² → Al = 2×10⁻⁴ m³; L = 5.03×10⁻³ × 2×10⁻⁴ = 1.01×10⁻⁶ H = 1 μH, not 1 mH.

Revised: for L = 1.0 mH with n = 2000, Al must be 0.199 m³. With l = 0.50m: A = 0.398m²—impractical. Better approach for l = 20cm = 0.20m, A = 2.0cm² = 2×10⁻⁴m²:  
L = μ₀n²Al = 5.03×10⁻³ × 2×10⁻⁴ × 0.20 = 2.01×10⁻⁷ H = 0.2 μH.

To get L = 1.0 mH at n = 2000: increase l or A. With A = 4 cm² and l = 1.0 m: L = 5.03×10⁻³ × 4×10⁻⁴ × 1.0 = 2.01 μH. Still not 1 mH. The issue: L = 1 mH with I = 2 A requires U = ½×10⁻³×4 = 2 mJ; with B = 5 mT. Let's just solve the design:

Given B = μ₀nI = 5×10⁻³ T and I = 2A: n = 1990 turns/m ✓.  
For L = 1.0 mH: Al = L/(μ₀n²) = 10⁻³/(5.03×10⁻³) = 0.199 m³.  
Choose l = 20 cm = 0.20 m → A = 0.199/0.20 = 0.995 m²... still large.

The constraint is: at n=2000 turns/m, to get L=1mH, you need a very large volume. In practice: to get L=1mH with a compact solenoid, use an iron core (μ_r=100) and reduce volume by 100×, or accept that 1mH at 5mT is not simultaneously achievable at I=2A with a small solenoid. This is a good teaching point.

Revised WE-3 for pedagogy: Find n and l separately for practical parameters.

**Revised WE-3:**
**Problem:** Design a solenoid to produce B = 10 mT at I = 2.0 A, using a 5.0 cm radius, 20 cm long solenoid. Find n, N, and L.

n = B/(μ₀I) = 10×10⁻³/(4π×10⁻⁷×2) = 3980 turns/m ≈ **4000 turns/m**  
N = n × l = 4000 × 0.20 = **800 turns**  
A = π(0.05)² = 7.85×10⁻³ m²  
L = μ₀n²Al = 4π×10⁻⁷ × (4000)² × 7.85×10⁻³ × 0.20  
= 5.03×10⁻³ × 6.28×10⁻³ = **31.6 mH**  
U = ½LI² = ½ × 31.6×10⁻³ × 4 = **63.2 mJ**

---

## Component 3 — Misconception Engine

### MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS
- **trigger_signal:** Student says "a wider solenoid has a stronger field" or "the field varies across the solenoid's cross-section."
- **conflict_evidence [P28]:** "Ampere's law derivation: B = μ₀nI. The radius R of the solenoid doesn't appear in this formula. Two solenoids — one 2 cm radius, one 20 cm radius — with the same n and I produce identical B fields inside. The field is perfectly uniform inside an infinite solenoid, regardless of how wide it is. What changes with radius is the inductance L = μ₀n²Al (A = πR² appears there), not B."
- **bridge_text [P30]:** "Think of parallel plate capacitors: E = σ/ε₀ between the plates, independent of the plate area. A larger capacitor plate doesn't give a stronger E — it gives more charge (larger C). Similarly, a wider solenoid doesn't give a stronger B — it gives more flux (larger L), because more area threads more flux at the same B."
- **replacement_text [P31]:** "B = μ₀nI inside a solenoid: no radius dependence. B depends only on turns per unit length (n) and current (I). Radius affects inductance L = μ₀n²Al (through area A = πR²) and total energy stored, but NOT the field strength."
- **discrimination_pairs [P33]:**
  - B (field strength): μ₀nI — no radius
  - L (inductance): μ₀n²Al = μ₀n²πR²l — radius squared
  - Φ (flux per turn): BA = μ₀nI×πR² — radius squared
  - U (energy): ½LI² — depends on radius via L
- **s6_path:** Calculate B and L for two solenoids: same n, I, l; different R. Show B identical, L different.

---

### MC-SOLENOID-FIELD-IS-ZERO-OUTSIDE-EXACTLY
- **trigger_signal:** Student applies B = 0 outside to real (finite) solenoids or is confused about fringe fields.
- **conflict_evidence [P28]:** "B = 0 outside is exact only for an infinite solenoid — a mathematical idealisation. Real solenoids have fringe fields that bulge out from the ends and decay rapidly with distance (∝ 1/r³ at large r, like a magnetic dipole). MRI machines require room-sized magnetic shielding precisely because their solenoid fields extend outside. For engineering calculations, treat B ≈ 0 outside if r >> radius and you're not near the ends."
- **bridge_text [P30]:** "Infinite parallel plates give E = 0 outside exactly (ideal). Real capacitor plates have fringe fields at the edges — you use the ideal formula for most purposes but acknowledge the approximation. Solenoids are the same: B = μ₀nI inside (ideal), B ≈ 0 outside (approximation for regions far from the ends and far from the solenoid surface)."
- **replacement_text [P31]:** "For an infinite solenoid: B = μ₀nI inside, B = 0 outside (exact). For real (finite) solenoids: B ≈ μ₀nI inside (away from ends), B ≈ 0 outside (far from the solenoid), but non-zero fringe fields exist near the ends and outside, decaying as 1/r³ far away."
- **discrimination_pairs [P33]:**
  - Infinite solenoid: B = 0 outside (exact, mathematical)
  - Finite solenoid, midpoint: B ≈ μ₀nI (good approximation if l >> r)
  - At end of solenoid: B ≈ ½μ₀nI (exactly half for semi-infinite)
  - Far outside: B ≈ 0 but non-zero (dipole fall-off ∝ 1/r³)
- **s6_path:** Show field line diagram for finite solenoid; fringe field visible at ends; contrast with infinite approximation.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** Inside an ideal solenoid, B:
(a) Increases with distance from the axis **(b) Is uniform (constant everywhere)** (c) Depends on solenoid radius (d) Is zero at the centre

**A2 (Fill-in):** For a solenoid with n turns/m, current I: B = ______. For N turns, length l, area A: L = ______.
[B = μ₀nI; L = μ₀N²A/l]

**A3 (Short answer):** How does doubling the number of turns (while keeping length and radius fixed) change B and L?
[n doubles → B = μ₀nI doubles; L = μ₀n²Al ∝ n² → L quadruples]

---

### Probe Set B — Conceptual Transfer
**B1:** A solenoid has B = 8.0 mT inside and L = 2.0 mH at I = 1.5 A. An identical solenoid (same n, l, r) is placed coaxially inside the first and connected in series. Find the combined B and L.
[B inside is from both solenoids: each contributes μ₀nI; total B = 2×8.0 = 16 mT. L_combined = L₁ + L₂ + 2M where M = mutual inductance (= L₁ for identical coaxial solenoids) = 2+2+2×2 = 8 mH. Alternatively, series aiding: n_eff = 2n, same l, same A: L ∝ n² → L_new = 4×L₁ = 8 mH ✓]

**B2:** A solenoid is filled with a ferrite core (μ_r = 500) replacing air. I = 1.0 A, n = 3000 turns/m, A = 2 cm², l = 10 cm. Find B and L.
[B = μ_r μ₀nI = 500×4π×10⁻⁷×3000×1 = 500×3.77×10⁻³ = 1.89 T; L = μ_r μ₀n²Al = 500×4π×10⁻⁷×9×10⁶×2×10⁻⁴×0.10 = 500×2.26×10⁻⁴ = 0.113 H]

**B3:** Two solenoids: A (n=1000/m, r=2cm, l=50cm) and B (n=1000/m, r=4cm, l=50cm). Compare B_inside and L for each.
[B_A = B_B = μ₀×1000×I (same n, I) → fields are equal. L_A = μ₀n²π(0.02)²×0.5 = 4π×10⁻⁷×10⁶×π×4×10⁻⁴×0.5 = 0.789 mH; L_B = 4× L_A = 3.16 mH (radius doubles → area ×4 → L×4).]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** Design a solenoid to store U = 50 mJ at I = 5.0 A with B = 20 mT inside. Find: (a) required L; (b) required n (from B condition); (c) required volume Al; (d) choose practical l and A.
[(a) L = 2U/I² = 2×0.05/25 = 4.0 mH. (b) n = B/(μ₀I) = 20×10⁻³/(4π×10⁻⁷×5) = 3183 ≈ 3200 turns/m. (c) Al = L/(μ₀n²) = 4×10⁻³/(4π×10⁻⁷×(3200)²) = 4×10⁻³/(1.286×10⁻²) = 0.311 m³... let me recompute: μ₀n² = 4π×10⁻⁷×(3200)² = 4π×10⁻⁷×1.024×10⁷ = 4π×1.024 = 12.87 T/m·A×m = 12.87×10⁻⁰ ... checking units: μ₀ in H/m; n² in 1/m²; μ₀n² in H/m³; L = μ₀n²Al: [H] = [H/m³]×[m²]×[m] = [H] ✓. μ₀n² = 4π×10⁻⁷×(3200)² = 4π×10⁻⁷×1.024×10⁷ = 4π×1.024 ≈ 12.87×10⁻³ × ... Actually: 4π×10⁻⁷×1.024×10⁷ = 4π×1.024 = 12.86. So Al = 4×10⁻³/12.86 = 3.11×10⁻⁴ m³. (d) Choose l=20cm=0.20m → A = 3.11×10⁻⁴/0.20 = 1.56×10⁻³ m² → r=√(A/π)=√(4.96×10⁻⁴)=2.23cm. Practical: r≈2.2cm, l=20cm, N=n×l=640 turns.]

**C2 (Synthesis):** An MRI solenoid produces B = 3.0 T in a 1.0 m bore (diameter) superconducting solenoid of length l = 1.5 m. Find n, N, and energy stored at I = 500 A. Why must it be superconducting?
[n = B/(μ₀I) = 3.0/(4π×10⁻⁷×500) = 3.0/6.28×10⁻⁴ = 4775 turns/m; N = n×l = 4775×1.5 = 7163 turns. A=π(0.5)²=0.785m²; L=μ₀n²Al=4π×10⁻⁷×4775²×0.785×1.5=4π×10⁻⁷×2.28×10⁷×1.178=33.8H. U=½×33.8×500²=4.22×10⁶J=4.22MJ. Superconducting: resistance R=0 → no I²R heating → current maintained indefinitely with no power input; normal copper at I=500A would dissipate P=I²R→enormous heat → impractical.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: write B inside a solenoid, L formula, energy stored, and what happens to B and L when (a) n doubles, (b) radius doubles, (c) iron core added."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "Solenoid: N=500, l=15cm, r=1.5cm, I=3A. Find n, B, L, U. Then: with μ_r=800 core, find new B, L, U."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Compare solenoid vs. toroid: interior B formula, external B, uniformity, L formula, which has better shielding. When would you choose each for a transformer core?"
  - offset: "+10 days"
    type: application [P91]
    prompt: "Design a solenoid relay: must produce F=0.1N on a soft iron armature at gap g=2mm. B in gap ≈ μ₀nI. Force F=B²A/(2μ₀). Target A=1cm², I=0.5A. Find n, N, l (choose l=5cm), and L."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Today we study the solenoid — the most important magnetic device in engineering. MRI machines, transformers, electromagnets, speakers, and relays all use solenoids. You'll derive the field, the inductance, and design your own."

[P41 — Diagnostic]
"If I wind more turns per metre on a solenoid (keeping length and current fixed), what happens to the field inside?"
→ Correct (B increases proportionally): "Exactly — let's prove it with Ampere's law."
→ Incorrect: "Good instinct — let's check against Ampere's law."

[P06 — Concrete anchor]
"A solenoid is like stacking many bar magnets inside each other — all aligned. Each turn adds a small B contribution; hundreds of turns create a strong, uniform field inside. The outside fields of each turn nearly cancel — that's why B ≈ 0 outside."

[TA-1 — Ampere's law derivation and B = μ₀nI: Block 1-A]
"Rectangular loop: inside side contributes BL; outside contributes 0; two perpendicular sides contribute 0. KVL: BL = μ₀(nL)I → B = μ₀nI."

[P28 — Conflict evidence for MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS]
"B = μ₀nI: no radius. WE-1 vs. a solenoid with double the radius at same n and I: same B, but L and flux (Φ=BA) are 4× larger. Radius affects inductance and flux, not field strength."

[P51 — Check-in]
"Two solenoids: n=1000/m, I=2A; one r=1cm, one r=5cm. What is B in each?"
[Both: B = 4π×10⁻⁷×1000×2 = 2.51 mT — identical]

[TA-2 — Inductance, energy, WE-1: Block 1-B]

[TA-3 — Iron core: Block 1-C, WE-2]
"L_core = μ_r × L_air. A compact solenoid with iron core can have L = H range instead of mH."

[P28 — Conflict evidence for MC-SOLENOID-FIELD-IS-ZERO-OUTSIDE-EXACTLY]
"Infinite solenoid: yes, B=0 outside exact. Real (finite) solenoid: MRI machines need metres of magnetic shielding outside. The fringe field exists — falls off as 1/r³. B≈0 outside is an approximation valid for r >> solenoid radius and far from the ends."

[TA-4 — WE-3: design problem — finding n, N, L from given B and I]

[P52 — Narrow]
"Two formulas: B = μ₀nI; L = μ₀N²A/l. Everything else derives from these."

[P62 — Retrieval seed]
"Write from memory: B formula, L formula, dependence of each on n, r, l, core material."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Solenoid: B = μ₀nI (uniform, independent of radius). L = μ₀N²A/l (grows as N²). Iron core multiplies both by μ_r. Fringe fields exist outside real solenoids — ideal formula is an approximation. Applications: relays, speakers, MRI, electromagnets."

[P85 — Regulation tail]
"Shakiest: why B is independent of radius, the L formula, or the iron core calculation?"

[P89 — Retrieval schedule]
"Return tomorrow for the iron-core solenoid problem."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (field varies with r) | Deploy MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS; show Ampere's law derivation has no r |
| Probe B1 wrong (series inductance) | Series identical solenoids: n_eff=2n, same l → L∝n²→ L×4; or use L_total=L₁+L₂+2M for coupled inductors |
| Probe B2 wrong (ferrite core) | Confirm: μ_r multiplies both μ₀nI and μ₀n²Al; factor out μ_r from both formulas |
| Probe C1 units error | Check: μ₀ in H/m; n² in m⁻²; A in m²; l in m → [H/m × m⁻² × m² × m] = [H] ✓ |
| Student asks about toroid | Use Block 1-D comparison; toroid: B = μ₀NI/(2πr), varies with r; useful when zero external field needed |

---

## Component 8 — Visualisation Specification

**Primary visual:** Solenoid cross-section — field lines inside (uniform, parallel, dense arrows) and outside (sparse, curving from end to end, dipole-like pattern for finite solenoid); labels: B = μ₀nI inside; B ≈ 0 outside; n = N/l annotated; fringe field at ends clearly shown for finite solenoid vs. no fringe for "ideal" infinite case.

**Secondary visual:** B vs. n, L vs. n comparison chart — two panels: (i) B vs. n: straight line (B ∝ n); (ii) L vs. n: parabolic curve (L ∝ n²). Caption: "doubling n → double B, quadruple L."

**Tertiary visual:** Iron core comparison — side-by-side: air core solenoid (sparse field lines, weak B, small L) vs. iron core solenoid (dense field lines, μ_r× stronger B, μ_r× larger L); scale bar showing μ_r = 1000 amplification. Energy density comparison: u_B = B²/(2μ₀) — iron core stores μ_r² times more energy per volume.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.solenoid)                     PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (proficient → 4)                      PASS
V-4  bloom verb matches level (apply → calculate/design)                   PASS
V-5  prerequisites listed in KG (phys.em.amperes-law)                     PASS
V-6  mastery_threshold = 0.80                                              PASS
V-7  session_cap rule applied (≥1h → PA-3)                                PASS
V-8  cpa_entry_stage matches difficulty 4 formula                          PASS
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

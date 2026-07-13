# Teaching Blueprint — phys.em.magnetic-dipole

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.magnetic-dipole
name: Magnetic Dipole
domain: electromagnetism
difficulty:
  label: advanced
  number: 5
bloom: understand
prerequisites:
  - phys.em.magnetic-materials
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.em.biot-savart
  - phys.em.magnetic-force
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — What Is a Magnetic Dipole?
A **magnetic dipole** is the fundamental unit of magnetism — a current loop (or spinning charge) with a magnetic dipole moment:

> **m = NIA n̂**

Where N = number of turns, I = current, A = loop area, **n̂** = normal to loop (right-hand rule).

Units: A·m²

Magnetic dipoles arise from:
1. **Current loops**: any closed current path (coil, solenoid)
2. **Electron spin**: intrinsic quantum property (spin magnetic moment)
3. **Orbital motion**: electron orbiting nucleus
4. **Atomic nuclei**: nuclear magnetic moments (basis of NMR/MRI)

Unlike electric dipoles (separable +q and −q), magnetic dipoles cannot be separated into monopoles — cutting a bar magnet always gives two dipoles.

### Block 1-B — Field of a Magnetic Dipole
Far from a magnetic dipole (r >> loop radius), the field has the same mathematical form as an electric dipole field:

**On the axis** (z-axis, along m):
> **B_axial = (μ₀/4π)(2m/r³)** = (μ₀/2π)(m/r³)

**On the equatorial plane** (perpendicular to m):
> **B_equat = −(μ₀/4π)(m/r³)**

The equatorial field is antiparallel to **m** and half the magnitude of the axial field at the same distance.

General formula (analogous to electric dipole):
> **B = (μ₀/4π)(1/r³)[3(m·r̂)r̂ − m]**

Key feature: B ∝ 1/r³ (faster fall-off than monopole 1/r²).

### Block 1-C — Energy and Torque in External Field
In an external field **B_ext**, a magnetic dipole has:

**Torque**: τ = **m × B** = mB sinθ (tends to align m with B)

**Potential energy**: U = −**m · B** = −mB cosθ

| θ | U | Equilibrium |
|---|---|-------------|
| 0° | −mB | Stable (minimum energy) |
| 90° | 0 | Maximum torque |
| 180° | +mB | Unstable (maximum energy) |

**Force on dipole in non-uniform field**:
> F = ∇(m · B) = m (dB/dz) (for m ∥ z-axis)

Stern-Gerlach experiment: inhomogeneous field → force on atomic magnetic moments → measures quantisation of angular momentum.

### Block 1-D — Earth as a Magnetic Dipole
Earth's magnetic field approximates a tilted dipole:
- Dipole moment: m ≈ 8×10²² A·m²
- Magnetic north pole (where field lines enter) is near geographic south pole (geographic and magnetic north differ by ~11°)
- Surface field: ~25–65 μT
- Dipole field at equator: B ≈ μ₀m/(4πR_E³) ≈ 30 μT (consistent with observation)

Applications: compass navigation, aurora borealis (charged particles spiral along dipole field lines), magnetosphere shielding from solar wind.

---

## Component 2 — Worked Examples

### WE-1 — Dipole Moment and Field on Axis
**Problem:** A circular coil: 30 turns, radius 4.0 cm, I = 2.0 A. Find: (a) dipole moment m; (b) B on the axis at r = 20 cm from the centre.

**Solution:**
(a) m = NIA = 30 × 2.0 × π(0.04)² = 30 × 2.0 × 5.03×10⁻³ = **0.302 A·m²**

(b) r = 0.20 m >> R = 0.04 m → dipole approximation valid  
B_axial = (μ₀/2π)(m/r³) = (4π×10⁻⁷/(2π)) × (0.302/(0.20)³)  
= 2×10⁻⁷ × (0.302/8×10⁻³)  
= 2×10⁻⁷ × 37.75  
= **7.55×10⁻⁶ T = 7.55 μT**

Check with exact formula: B = μ₀IR²N/[2(R²+x²)^{3/2}] at x=20cm.  
(R²+x²) = 0.0016+0.04 = 0.0416 m²; (0.0416)^{3/2} = 0.00849 m³  
B = 4π×10⁻⁷×2×(0.04)²×30/[2×0.00849] = 4π×10⁻⁷×2×0.0016×30/0.01698  
= 4π×10⁻⁷×0.096/0.01698 = 4π×10⁻⁷×5.653 = **7.12 μT** (dipole approx overestimates by ~6% since r=5R, not r>>R)

---

### WE-2 — Torque and Energy in External Field
**Problem:** A magnetic dipole m = 0.50 A·m² is in B = 0.20 T. Find: (a) maximum torque, (b) U at θ = 0° and θ = 180°, (c) energy required to flip from stable to unstable equilibrium.

**Solution:**
(a) τ_max = mB = 0.50 × 0.20 = **0.10 N·m** (at θ = 90°)

(b) U(0°) = −mB cos0° = −0.50 × 0.20 × 1 = **−0.10 J** (stable)  
    U(180°) = −mB cos180° = −0.50 × 0.20 × (−1) = **+0.10 J** (unstable)

(c) ΔU = U(180°) − U(0°) = 0.10 − (−0.10) = **0.20 J**

---

### WE-3 — Earth's Dipole Field
**Problem:** Estimate B at Earth's equator using dipole approximation: m = 8.0×10²² A·m², R_E = 6.4×10⁶ m.

**Solution:**
At equatorial point, r = R_E, and dipole moment is perpendicular to equatorial plane → equatorial field formula:  
B_equat = (μ₀/4π)(m/r³) = 10⁻⁷ × (8.0×10²²)/(6.4×10⁶)³  
= 10⁻⁷ × (8.0×10²²)/(2.62×10²⁰)  
= 10⁻⁷ × 305.3  
= **3.05×10⁻⁵ T = 30.5 μT**

Observed equatorial field ≈ 25–35 μT → dipole model gives good estimate ✓

---

## Component 3 — Misconception Engine

### MC-MAGNETIC-DIPOLE-HAS-SEPARATE-POLES
- **trigger_signal:** Student draws a magnetic dipole as two separate "magnetic charges" N and S, or asks "where is the positive magnetic charge?"
- **conflict_evidence [P28]:** "Electric dipoles have two separable charges (+q, −q) that can be physically moved apart. Magnetic dipoles cannot. Cut a bar magnet in half: two smaller dipoles, not a monopole. Cut again: still dipoles. Every current loop has both a 'north face' (field exits) and 'south face' (field enters) as inseparable consequences of the same circulating current. Gauss's law for magnetism ∮B·dA = 0 proves no isolated pole can ever be enclosed."
- **bridge_text [P30]:** "The electric dipole model (two point charges) works because charges are real, separable things. The magnetic dipole model (current loop) works because magnetism comes from circulating currents — the two 'poles' are just the two faces of the same loop. North and south are not things; they are directions of the same field."
- **replacement_text [P31]:** "A magnetic dipole is a current loop with moment m = NIA n̂. There are no separate magnetic charges. The 'north pole' is the face where B exits (thumb of right-hand rule); 'south' is where B enters. These are descriptions of field geometry, not separate physical objects."
- **discrimination_pairs [P33]:**
  - Electric dipole: +q and −q can be separated; E field diverges from charges
  - Magnetic dipole: current loop; cannot be separated; B field forms closed loops; ∮B·dA = 0
- **s6_path:** Cut-magnet thought experiment; Gauss's law for magnetism derivation; link to Block 1-A.

---

### MC-DIPOLE-FIELD-FALLS-OFF-AS-1/R-SQUARED
- **trigger_signal:** Student applies 1/r² for the far field of a dipole, confusing with Coulomb/Biot-Savart element.
- **conflict_evidence [P28]:** "WE-1: B_axial = (μ₀/2π)(m/r³) ∝ 1/r³. At r = 20 cm: B = 7.55 μT. If it were 1/r²: B ∝ 1/0.04 = 25 — a factor of 5 different. The dipole falls off faster than a monopole because positive and negative contributions from the two 'poles' partially cancel, leaving a 1/r³ residual. Double the distance: field drops by a factor of 8 (not 4)."
- **bridge_text [P30]:** "The dipole field is the cancellation residual of two nearly equal and opposite monopole fields. As you move far from the dipole, the two contributions look more and more similar, so their difference shrinks faster than either alone. This is why 1/r³ instead of 1/r²: the cancellation adds one extra power of 1/r to the fall-off."
- **replacement_text [P31]:** "Magnetic dipole far field: B ∝ 1/r³ (both axial and equatorial). Compare: point charge (monopole) E ∝ 1/r²; dipole E ∝ 1/r³; quadrupole ∝ 1/r⁴. Each higher-order multipole falls off one power faster due to cancellation between opposite-sign components."
- **discrimination_pairs [P33]:**
  - Single current element dB ∝ 1/r² (Biot-Savart)
  - Infinite wire B ∝ 1/r (integrated monopole)
  - Magnetic dipole B ∝ 1/r³ (integrated dipole — faster fall-off)
- **s6_path:** Compute B at r and 2r using WE-1 formula; show 8× reduction for 2× distance (1/r³ confirmed).

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** A magnetic dipole's far field falls off as:
(a) 1/r **(b) 1/r³** (c) 1/r² (d) 1/r⁴

**A2 (Short answer):** Define magnetic dipole moment m. What are its SI units?
[m = NIA n̂ (for a coil), where N = turns, I = current, A = area; units: A·m²]

**A3 (True/False):** A magnetic dipole can be split into isolated north and south poles.
[FALSE — ∮B·dA = 0; cutting a dipole gives two smaller dipoles]

---

### Probe Set B — Conceptual Transfer
**B1:** A proton (nuclear magnetic moment μ_p = 1.41×10⁻²⁶ A·m²) is in a 3.0 T MRI field. Find the energy difference between spin-parallel and spin-antiparallel states (ΔU = 2μ_p B). This energy corresponds to what photon frequency? (ΔE = hf, h = 6.63×10⁻³⁴ J·s)
[ΔU = 2 × 1.41×10⁻²⁶ × 3.0 = 8.46×10⁻²⁶ J; f = ΔE/h = 8.46×10⁻²⁶/6.63×10⁻³⁴ = 1.28×10⁸ Hz = 128 MHz (radio wave — that's the MRI resonance frequency at 3 T) ✓]

**B2:** At what distance r from a magnetic dipole (m = 0.20 A·m²) does the axial field equal 1.0 μT?
[B = (μ₀/2π)(m/r³); r³ = (μ₀/2π)(m/B) = (2×10⁻⁷ × 0.20)/(1×10⁻⁶) = 0.04 m³; r = (0.04)^{1/3} = 0.342 m]

**B3:** A current loop (m = 2.0 A·m²) is at θ = 60° to B = 0.15 T. Find torque and U. In which direction does the torque rotate m?
[τ = mB sin60° = 2.0×0.15×0.866 = 0.26 N·m; U = −mB cos60° = −2.0×0.15×0.5 = −0.15 J; torque rotates m toward B (decreasing θ toward 0° — stable equilibrium)]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** Estimate Earth's surface field at the magnetic pole (on axis, r = R_E, m = 8×10²² A·m²). Compare with equatorial estimate from WE-3.
[B_axial = (μ₀/2π)(m/R_E³) = 2×10⁻⁷ × 8×10²²/(6.4×10⁶)³ = 2×10⁻⁷ × 8×10²²/2.62×10²⁰ = 2×10⁻⁷ × 305.3 = 6.1×10⁻⁵ T = 61 μT. Compare equatorial (WE-3): 30.5 μT. Ratio: 61/30.5 = 2 — axial field is exactly twice equatorial field for a dipole (B_axial = 2B_equat at same r) ✓. Observed polar field ≈ 60–70 μT ✓]

**C2 (Synthesis):** Explain why MRI machines use a strong B field. How does the dipole model of nuclear magnetic moments explain the NMR signal?
[Proton nuclear moment m_p is a magnetic dipole. In external B: two energy states (m parallel or antiparallel to B); ΔE = 2m_p B. Stronger B → larger ΔE → higher resonance frequency f = ΔE/h (radio frequency, 128 MHz at 3 T). More protons in lower state → larger population difference → stronger signal. Also, stronger B → better spatial resolution (gradient encoding). The dipole precesses around B at the Larmor frequency ω = γB (gyromagnetic ratio γ), giving the NMR signal when tipped by a radiofrequency pulse.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: define m for a current loop, write B_axial for a dipole, state the fall-off law, and say why dipoles can't be split."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "A 10-turn loop (radius 2cm, I=3A): find m. Then find B on-axis at r=10cm. Verify that r/R=5 justifies the dipole approximation."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Compare electric dipole (p=qd) and magnetic dipole (m=IA): far field fall-off, torque formula, energy in external field, ability to separate poles."
  - offset: "+10 days"
    type: application [P91]
    prompt: "Earth's dipole m=8×10²² A·m². Find B at r=3R_E on the axis (magnetosphere). Then find the force on a proton (m_p=1.41×10⁻²⁶ A·m²) in the field gradient dB/dr at that location."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Today we'll see what the most fundamental magnetic object looks like — the building block of all magnets from bar magnets to MRI machines to Earth itself."

[P41 — Diagnostic]
"What is a bar magnet at the atomic level — what creates its magnetism?"
→ Correct (electron spin/orbital magnetic moments): "Exactly — and each electron is a magnetic dipole."
→ Incorrect: "Good question. Let's trace magnetism to its source."

[P06 — Concrete anchor]
"Hold a compass in Earth's field: it aligns. The compass needle is a magnetic dipole; Earth's field is a gigantic dipole field. Today we'll calculate both."

[TA-1 — Dipole moment definition: Block 1-A]
"m = NIA n̂. Units A·m². Sources: current loops, electron spin, orbital motion."

[P28 — Conflict evidence for MC-MAGNETIC-DIPOLE-HAS-SEPARATE-POLES]
"∮B·dA = 0 — no monopoles. Cut a magnet: two dipoles. Cut again: still dipoles. The 'poles' are not separate objects; they're two faces of one circulating current."

[P51 — Check-in]
"Why can't we isolate a north magnetic pole? What law prevents it?"
[Gauss's law for magnetism; ∮B·dA = 0]

[TA-2 — Dipole field: Block 1-B, WE-1]
"B_axial = (μ₀/2π)m/r³ ∝ 1/r³. At 5R from loop, dipole formula valid within ~6%."

[P28 — Conflict evidence for MC-DIPOLE-FIELD-FALLS-OFF-AS-1/R-SQUARED]
"Compare: dB ∝ 1/r² (single element); B_wire ∝ 1/r (integrated wire); B_dipole ∝ 1/r³ (two partial-cancelling contributions). Double the distance: dipole drops 8×. Not 4×."

[TA-3 — Torque, energy, Stern-Gerlach: Block 1-C, WE-2]

[TA-4 — Earth as dipole: Block 1-D, WE-3]

[P52 — Narrow]
"Two formulas: m = NIA n̂; B_axial = (μ₀/2π)m/r³; B_equat = half that. U = −m·B. τ = m×B."

[P62 — Retrieval seed]
"Write from memory: dipole moment formula, axial and equatorial fields, energy expression, why 1/r³."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Magnetic dipole: m = NIA n̂; B ∝ 1/r³ (faster than monopole). No isolated poles. Torque aligns with external field. Earth, atomic nuclei, electrons — all magnetic dipoles. MRI exploits nuclear dipole precession in a strong field."

[P85 — Regulation tail]
"Shakiest: the 1/r³ derivation, the energy formula, or the no-monopoles argument?"

[P89 — Retrieval schedule]
"Return tomorrow for the retrieval quiz."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks 1/r²) | Deploy MC-DIPOLE-FIELD-FALLS-OFF-AS-1/R-SQUARED; compute B at r and 2r; show 8× factor |
| Probe A3 wrong (says poles can be separated) | Deploy MC-MAGNETIC-DIPOLE-HAS-SEPARATE-POLES; Gauss's law; cut-magnet argument |
| Probe B1 wrong (MRI energy) | Walk through: ΔE = 2m_p B; f = ΔE/h; check units carefully |
| Probe C2 incomplete (misses precession) | Introduce Larmor precession: torque = m×B; analogous to gyroscope; ω = γB |
| Student asks about spin angular momentum | Link: m = γL (gyromagnetic ratio); Bohr magneton μ_B = eℏ/(2m_e) = 9.27×10⁻²⁴ A·m²; electron spin = ½ → m_s = ±μ_B |

---

## Component 8 — Visualisation Specification

**Primary visual:** Dipole field map — current loop with field lines forming closed loops: dense near the loop (strong field), sparse far away; axis (z) and equatorial plane labelled; B_axial (pointing along z) and B_equat (pointing antiparallel to m) vectors shown at representative points; fall-off ∝1/r³ annotation.

**Secondary visual:** Energy landscape — U(θ) = −mB cosθ plotted as a function of angle θ from 0° to 360°; U curve; marked: stable minimum at θ=0° (U=−mB), maximum torque at θ=90° (U=0), unstable maximum at θ=180° (U=+mB). Annotation: "energy to flip = 2mB."

**Tertiary visual:** Earth dipole schematic — Earth's sphere with dipole field lines; geographic and magnetic poles marked; equatorial and polar field values annotated (30 μT equatorial, 60 μT polar); field lines entering at magnetic north (geographic south) and exiting at magnetic south (geographic north); Van Allen belt sketch showing charged particle spiral paths along field lines.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.magnetic-dipole)               PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (advanced → 5)                        PASS
V-4  bloom verb matches level (understand → explain/predict)               PASS
V-5  prerequisites listed in KG (phys.em.magnetic-materials)               PASS
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

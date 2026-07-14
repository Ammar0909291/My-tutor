# Teaching Blueprint — phys.em.dielectrics

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.dielectrics
name: Dielectrics
domain: electromagnetism
difficulty:
  label: advanced
  number: 5
bloom: understand
prerequisites:
  - phys.em.capacitance
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.em.electric-dipole
  - phys.em.gauss-law
  - phys.em.energy-capacitor
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Insert a rubber eraser between the plates of a capacitor — the capacitance goes up. Why? The rubber molecules, though neutral overall, develop tiny electric dipoles when the external field pushes positive and negative charges slightly apart. These aligned dipoles create an opposing field inside the material, which reduces the net field between the plates. With a weaker field for the same charge, the voltage drops — and since C = Q/V, the capacitance increases. All non-conducting materials (insulators) inserted between capacitor plates are called **dielectrics** and increase C by a factor κ (kappa), the dielectric constant.

### Tier 2 — Conceptual / Mechanistic (S1)

**Dielectric constant κ (relative permittivity):**
$$C = \kappa C_0 = \frac{\kappa\varepsilon_0 A}{d} = \frac{\varepsilon A}{d}$$

where ε = κε₀ is the permittivity of the medium. For vacuum/air: κ = 1. Typical values: polyester κ ≈ 3.2, glass κ ≈ 7, water κ ≈ 80.

**What changes when dielectric is inserted (at fixed charge Q):**
- C: increases by factor κ (C = κC₀)
- V = Q/C: decreases by factor κ (V = V₀/κ)
- E = V/d: decreases by factor κ (E = E₀/κ)
- U = Q²/(2C): decreases by factor κ (U = U₀/κ)

**What changes at fixed voltage V (connected to battery):**
- C: increases by factor κ
- Q = CV: increases by factor κ
- E = V/d: unchanged (E = V/d, same V, same d)
- U = ½CV²: increases by factor κ

**Polarisation mechanisms:**
1. **Electronic polarisation:** applied field displaces electron cloud relative to nucleus (occurs in all materials).
2. **Ionic polarisation:** field shifts positive and negative ions in ionic crystals (NaCl).
3. **Orientational polarisation:** permanent dipoles (water) partially align with field, fighting thermal agitation.

**Polarisation vector P:** P = n·p_molecule = ε₀(κ−1)E, where χ_e = κ−1 is electric susceptibility.

**Bound charges:**
The aligned dipoles produce surface bound charge density σ_b = P·n̂ and volume bound charge ρ_b = −∇·P. These bound charges, together with free charges, determine the total field.

**Dielectric strength (breakdown field E_b):** Maximum field a material can sustain before breakdown (ionisation, spark). Air: E_b ≈ 3×10⁶ V/m; Teflon: 60×10⁶ V/m. High κ AND high E_b are needed for capacitor design.

**Displacement field D:**
$$\vec{D} = \varepsilon_0\vec{E} + \vec{P} = \varepsilon\vec{E} = \kappa\varepsilon_0\vec{E}$$

Gauss's Law in dielectrics: ∮D·dA = Q_free (D responds only to free charges).

### Tier 3 — Formal

**Gauss's Law in dielectric media:**
$$\nabla\cdot\vec{D} = \rho_\text{free}, \quad \nabla\cdot\vec{E} = \frac{\rho_\text{free}+\rho_\text{bound}}{\varepsilon_0}$$

**Boundary conditions at dielectric interface:**
- Normal D: D₁n = D₂n (if no free surface charge)
- Tangential E: E₁t = E₂t (E_tangential continuous)
- Normal E: ε₁E₁n = ε₂E₂n

**Clausius-Mossotti relation:**
$$\frac{\kappa-1}{\kappa+2} = \frac{n\alpha}{3\varepsilon_0}$$

where n = molecular number density, α = molecular polarisability.

**Frequency dependence (dispersion):** κ is not constant across frequencies. At optical frequencies, the slow orientational and ionic polarisations can't keep up → κ_optical < κ_static. This dispersion gives rise to colour in glass and rainbows.

---

## Component 2 — Worked Examples

### WE-1 (Effect of dielectric — fixed charge)

**Problem:** A parallel-plate capacitor (A = 0.02 m², d = 1.0 mm, no dielectric) is charged to Q = 4.0 μC and then disconnected from the battery. A dielectric with κ = 3.5 is inserted. Find the new V, E, and U, and compare with the original values.

**Worked solution:**

*Step 1 — Original C₀:*
C₀ = ε₀A/d = (8.854×10⁻¹²)(0.02)/(10⁻³) = 1.771×10⁻¹⁰ F = 177.1 pF

*Step 2 — Original V₀, E₀, U₀:*
V₀ = Q/C₀ = 4×10⁻⁶/1.771×10⁻¹⁰ = 22,588 V ≈ 22.6 kV
E₀ = V₀/d = 22,588/10⁻³ = 2.259×10⁷ V/m
U₀ = Q²/(2C₀) = (4×10⁻⁶)²/(2×1.771×10⁻¹⁰) = 16×10⁻¹²/3.542×10⁻¹⁰ = 0.0452 J

*Step 3 — After dielectric (Q fixed):*
C = κC₀ = 3.5 × 177.1 = 619.9 pF
V = V₀/κ = 22,588/3.5 = 6454 V ≈ 6.45 kV
E = E₀/κ = 2.259×10⁷/3.5 = 6.45×10⁶ V/m
U = U₀/κ = 0.0452/3.5 = 0.0129 J

*Step 4 — Interpret:*
Q is fixed; C triples (+); V, E, U all drop to 1/κ of original. Energy released = 0.0452 − 0.0129 = 0.0323 J, which is done by the electric field pulling the dielectric into the gap (the dielectric slab is attracted by the fringing field).

**Answer:** V = 6.45 kV; E = 6.45 MV/m; U = 0.0129 J (all reduced by factor κ = 3.5 from original)

---

### WE-2 (Effect of dielectric — fixed voltage)

**Problem:** The capacitor of WE-1 (C₀ = 177.1 pF) is kept connected to a 500 V battery while the κ = 3.5 dielectric is inserted. Find the change in Q and U.

**Worked solution:**

*Step 1 — New C:*
C = κC₀ = 3.5 × 177.1 = 619.9 pF

*Step 2 — Charge (V = 500 V fixed):*
Q₀ = C₀V = (177.1×10⁻¹²)(500) = 88.6 nC
Q = CV = (619.9×10⁻¹²)(500) = 310 nC

ΔQ = 310 − 88.6 = **221.4 nC** drawn from the battery.

*Step 3 — Energy:*
U₀ = ½C₀V² = ½(177.1×10⁻¹²)(500)² = ½(177.1×10⁻¹²)(250000) = 22.1 μJ
U = ½CV² = ½(619.9×10⁻¹²)(250000) = 77.5 μJ

ΔU = 77.5 − 22.1 = **55.4 μJ** increase.

*Step 4 — Energy budget:*
Battery delivered Q·V_battery = 221.4×10⁻⁹ × 500 = 110.7 μJ.
Capacitor stored 55.4 μJ. Remaining 55.3 μJ ≈ work done pulling dielectric into field.

**Answer:** Q increases from 88.6 nC to 310 nC; U increases from 22.1 to 77.5 μJ.

---

## Component 3 — Misconception Profiles

### MC-DIELECTRIC-INCREASES-ELECTRIC-FIELD

**Trigger signal:** Student says "the dielectric has charges so it adds to the field" or expects E to increase when a dielectric is inserted.

**Conflict evidence [P28]:** "When a dielectric is inserted between charged plates (fixed Q), the bound surface charges of the dielectric oppose the free charges on the plates. If free charge is +σ on the top plate, the dielectric develops −σ_b on its top surface and +σ_b on its bottom surface. The bound charges partially cancel the free charges. Net E = (σ − σ_b)/ε₀ < σ/ε₀ = E₀. The dielectric reduces E, not increases it. This is why V = Ed drops → C = Q/V increases."

**Bridge text [P30]:** "The dielectric's bound charges act like a partial shield — they oppose the external field. Imagine the external field tries to align all the molecular dipoles; each aligned dipole produces its own tiny opposing field. The sum of these opposing fields reduces the net E inside the dielectric. The more polarisable the material (larger κ), the more the field is reduced."

**Replacement text [P31]:** "Inserting a dielectric between capacitor plates (at fixed charge) reduces the electric field E by a factor of κ. The dielectric polarises in response to the external field, producing bound charges that oppose the free charges. The net field inside the dielectric is E = E₀/κ. The reduced field means reduced voltage (V = Ed), which means increased capacitance (C = Q/V = κC₀)."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Dielectric reduces E (at fixed Q) by factor 1/κ" | "Dielectric adds to E (more charges present)" |
| "Bound charges oppose free charges → net σ_eff = σ − σ_b" | "Dielectric strengthens the field inside" |
| "C increases because V decreases at same Q" | "C increases because E increases" |

**s6_path:** Draw the diagram: plates with +σ and −σ; dielectric with −σ_b on top, +σ_b on bottom. Show opposing fields. Net E < original.

---

### MC-DIELECTRIC-CONSTANT-IS-THE-SAME-AT-ALL-FREQUENCIES

**Trigger signal:** Student uses the same κ value for DC and for optical light, or is surprised that glass has different κ at different frequencies.

**Conflict evidence [P28]:** "Water: κ_static = 80 (dipoles fully align, even slowly rotating dipoles contribute). But water is transparent — at optical frequencies (10¹⁴ Hz), the refractive index n ≈ 1.33, which means κ_optical = n² ≈ 1.77. The slow orientational polarisation of water molecules can't follow 10¹⁴ Hz oscillations. So κ drops from 80 to 1.77 between DC and light frequencies."

**Bridge text [P30]:** "Different polarisation mechanisms respond at different timescales. At low frequencies (DC), all mechanisms contribute: electronic, ionic, and orientational. At microwave frequencies (GHz), molecular orientations can partially follow → microwave heating of food uses the orientational polarisation of water. At optical frequencies, only electronic polarisation is fast enough."

**Replacement text [P31]:** "The dielectric constant κ (relative permittivity) is frequency-dependent. The static κ (DC, measured with no oscillating field) is the largest. As frequency increases, slower polarisation mechanisms drop out: ionic polarisation fails at ≈10¹² Hz, orientational at ≈10⁹ Hz. At optical frequencies, only electronic polarisation survives: κ_optical = n², where n is the optical refractive index. This frequency dependence (dispersion) is responsible for how glass separates colors (prism/rainbow)."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "κ_static ≠ κ_optical (e.g., water: 80 vs 1.77)" | "κ is the same at all frequencies" |
| "Orientational polarisation fails at GHz frequencies" | "Molecular dipoles follow fields at any frequency" |
| "κ_optical = n² (refractive index squared)" | "Static κ applies to light propagation through glass" |

**s6_path:** Show the frequency-response curve of κ: flat at low f, drops at resonance frequencies for each mechanism, settling to κ_optical at high f.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Define: (a) dielectric constant κ, (b) how C changes when dielectric is inserted, (c) how E changes at fixed Q.

**Answer key:**
(a) κ = C/C₀ (ratio of capacitance with dielectric to without); also = relative permittivity ε/ε₀; always ≥ 1.
(b) C = κC₀ (increases by factor κ)
(c) E = E₀/κ (decreases by factor κ, since Q fixed → V = Q/C reduces → E = V/d reduces)

---

### P4-b (Basic — C with dielectric)
A 100 pF air capacitor has a κ = 4 dielectric inserted. Find new C and new V if Q = 2 nC.

**Answer key:**
C = κC₀ = 4 × 100 = **400 pF**
V = Q/C = 2×10⁻⁹/400×10⁻¹² = **5 V** (original V₀ = Q/C₀ = 2×10⁻⁹/100×10⁻¹² = 20 V; reduced by factor 4 ✓)

---

### P4-c (Fixed voltage)
A 200 pF capacitor charged to 50 V (battery connected) has a κ = 2.5 dielectric inserted. Find: new Q, new U.

**Answer key:**
C = κ × 200 = 500 pF
Q = CV = (500×10⁻¹²)(50) = **25 nC** (original: 200×10⁻¹²×50 = 10 nC → increased by κ ✓)
U = ½CV² = ½(500×10⁻¹²)(50)² = ½(500×10⁻¹²)(2500) = **625 nJ** (original: ½×200×10⁻¹²×2500 = 250 nJ; U increased by κ ✓)

---

### P4-d (Dielectric strength)
A parallel-plate capacitor (d = 2.0 mm, dielectric with κ = 6, E_b = 20 MV/m) is charged. What is the maximum voltage before breakdown?

**Answer key:** V_max = E_b × d = (20×10⁶)(2.0×10⁻³) = **40,000 V = 40 kV**

---

### P4-e (Analysis — energy comparison)
A capacitor stores energy U₀ with no dielectric. When dielectric κ = 3 is inserted at fixed Q, what fraction of U₀ is released?

**Answer key:** U = U₀/κ = U₀/3. Released: U₀ − U₀/3 = 2U₀/3. Fraction released = **2/3 ≈ 66.7%**. This energy goes into pulling the dielectric slab into the field (work done by the electric force).

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What is capacitance? How does C = ε₀A/d relate to the physics between the plates?"
  → [P06: concrete-anchor] — "Insert rubber between plates: dipoles align, opposing field, V drops for same Q → C increases. That's a dielectric."
  → [P41: diagnostic] — check if student knows E decreases (not increases) when dielectric inserted at fixed Q
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-DIELECTRIC-INCREASES-ELECTRIC-FIELD, MC-DIELECTRIC-CONSTANT-IS-THE-SAME-AT-ALL-FREQUENCIES)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (insert dielectric at fixed Q: all quantities change by 1/κ)
  → [P06: concrete-anchor] — WE-2 (insert dielectric at fixed V: Q and U increase by κ)
  → [P52: narrow] — "WE-1 vs. WE-2: why does U decrease in one case but increase in the other?"
  → [P36: mastery-probe] — P4-b + P4-e (fixed Q energy release)

[P51: check-in]
[P91: mastery-gate] — threshold 0.80
[P85: regulation-tail]
[P89: retrieval-schedule] — spacing: +1 day, +3 days, +7 days, +21 days
[P68: close]
```

---

## Component 6 — Assessment Items (Mastery Probes)

### AP-1 (Bloom: Remember)
What is the dielectric constant κ? What value does it take for vacuum?

**Answer:** κ = C/C₀ = ε/ε₀ (relative permittivity). For vacuum: κ = 1 exactly. For any other material: κ > 1.

---

### AP-2 (Bloom: Understand)
A capacitor is charged and disconnected from the battery. A dielectric is inserted. Explain why the system's energy decreases, and where the lost energy goes.

**Answer:** At fixed Q, inserting a dielectric reduces E by factor 1/κ (bound charges oppose field), reducing V = Ed, and U = Q²/(2C) = Q²/(2κC₀) < U₀. The missing energy is not lost — it is converted to kinetic energy as the dielectric slab is attracted into the gap by fringing field forces. The electric force pulls the polarisable dielectric into the region of higher field, doing work on the slab.

---

### AP-3 (Bloom: Apply)
A 50 pF air capacitor is charged to 200 V. The battery is disconnected. Dielectric κ = 4 is inserted. Find new V, E (d = 1.0 mm), and U.

**Answer:**
Q = C₀V₀ = (50×10⁻¹²)(200) = 10 nC (fixed)
C = 4×50 = 200 pF
V = Q/C = 10×10⁻⁹/200×10⁻¹² = **50 V** (reduced by 4)
E = V/d = 50/10⁻³ = **50,000 V/m** (original: 200,000 V/m, reduced by 4)
U = Q²/(2C) = (10⁻⁸)²/(2×200×10⁻¹²) = 10⁻¹⁶/4×10⁻¹⁰ = **2.5×10⁻⁷ J = 0.25 μJ** (original: 1 μJ, reduced by 4)

---

### AP-4 (Bloom: Analyze)
Explain why microwave ovens heat food but not the ceramic plate underneath.

**Answer:** Water in food has a large orientational polarisation: its dipoles follow the oscillating microwave field (2.45 GHz), absorbing energy as the dipoles rotate against friction — this is dielectric heating. Ceramic plates have very few freely-rotating dipoles and very low dielectric loss at 2.45 GHz; they absorb negligible energy from the microwave field and stay cool. This is a direct consequence of the frequency dependence of κ and dielectric loss (Im(κ)).

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | C = κC₀: calculate new C, V, E at fixed Q |
| +3 days | Fixed V scenario: new Q and U when dielectric inserted |
| +7 days | Dielectric strength: max V before breakdown |
| +21 days | Explain why U changes differently at fixed Q vs. fixed V |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.capacitance` — C = Q/V = ε₀A/d; energy U = ½CV²

**Unlocked by this concept (conceptual, not direct KG unlock):**
- `phys.em.energy-capacitor` — deeper energy analysis, field energy density ½κε₀E²

**Cross-domain links:**
- `phys.em.electric-dipole` — molecular dipoles create polarisation
- `phys.em.gauss-law` — in dielectrics: D = ε₀E + P; ∮D·dA = Q_free

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 5, bloom = understand | PASS |
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

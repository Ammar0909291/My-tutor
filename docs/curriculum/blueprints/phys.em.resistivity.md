# Teaching Blueprint — phys.em.resistivity

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.resistivity
name: Resistivity
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.em.ohms-law
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.em.electric-current
  - phys.em.electrical-power
  - phys.em.magnetic-materials
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Different materials resist electric current differently: copper wire conducts electricity easily; rubber blocks it almost completely. This material property is called **resistivity** (ρ). A wire's total resistance depends on resistivity, length (longer → harder to push current through), and cross-section (thicker → easier). The formula R = ρL/A connects the microscopic material property (ρ) to the macroscopic circuit parameter (R). Resistivity also changes with temperature — metals get more resistive when hot; semiconductors get less resistive.

### Tier 2 — Conceptual / Mechanistic (S1)

**Resistance from resistivity:**
$$R = \frac{\rho L}{A}$$

where ρ = resistivity [Ω·m], L = length [m], A = cross-sectional area [m²].

**Units of ρ:** Ω·m (ohm-metres). For copper: ρ ≈ 1.7 × 10⁻⁸ Ω·m. For silicon: ρ ≈ 640 Ω·m. For glass: ρ ≈ 10¹⁰–10¹⁴ Ω·m.

**Conductivity σ:** σ = 1/ρ [S/m = Ω⁻¹m⁻¹]. Ohm's Law in local form: J = σE.

**Classification by resistivity:**
- Conductors: ρ < 10⁻⁶ Ω·m (metals, graphite)
- Semiconductors: 10⁻⁶ < ρ < 10⁶ Ω·m (silicon, germanium)
- Insulators: ρ > 10⁶ Ω·m (rubber, glass, Teflon)
- Superconductors: ρ = 0 below critical temperature T_c

**Temperature dependence:**
For metals (positive temperature coefficient):
$$R(T) = R_0[1 + \alpha(T - T_0)]$$

where α is the temperature coefficient of resistance (typically 3–5 × 10⁻³ °C⁻¹ for metals).

For semiconductors: ρ decreases with increasing T (more carriers thermally excited across the band gap — negative temperature coefficient).

**Drude model microscopic basis:**
ρ = m/(ne²τ), where m = electron mass, n = carrier density, e = charge, τ = mean collision time. Higher T → shorter τ (more lattice vibrations) → higher ρ for metals.

**Wire resistance scaling:**
If wire length is doubled: R → 2R (proportional).
If wire radius is doubled: A = πr² → 4A → R → R/4 (inverse with area).
If both doubled: R → 2R/4 = R/2.

### Tier 3 — Formal

**Resistivity tensor (anisotropic materials):**
In crystals with different conductivity along different axes: J = σ̄E (tensorial J = σE fails; must use matrix σᵢⱼ). Graphite has very different ρ along vs. perpendicular to basal planes.

**Matthiessen's rule:**
$$\rho_\text{total} = \rho_\text{phonon}(T) + \rho_\text{impurity}$$

The total resistivity of a metal at temperature T has contributions from lattice vibrations (phonons, T-dependent) and impurities (T-independent). This sum is independent of the scattering mechanism — a powerful simplification.

**Superconductivity:** Below T_c (e.g., 9.2 K for niobium), certain materials develop zero DC resistance and expel magnetic fields (Meissner effect). Explained by BCS theory (Cooper pairs of electrons form a coherent quantum state). Applications: MRI magnets, maglev trains.

---

## Component 2 — Worked Examples

### WE-1 (R from ρ, L, A)

**Problem:** A copper wire (ρ = 1.7 × 10⁻⁸ Ω·m) has length 100 m and diameter 2.0 mm. Find its resistance.

**Worked solution:**

*Step 1 — Cross-sectional area:*
r = 1.0 × 10⁻³ m; A = πr² = π(10⁻³)² = 3.14 × 10⁻⁶ m²

*Step 2 — R = ρL/A:*
$$R = \frac{(1.7\times10^{-8})(100)}{3.14\times10^{-6}} = \frac{1.7\times10^{-6}}{3.14\times10^{-6}} = 0.541\text{ Ω}$$

**Answer:** R = 0.54 Ω (very low — copper is an excellent conductor)

---

### WE-2 (Temperature dependence)

**Problem:** A tungsten filament has R₀ = 10 Ω at 20°C. When lit, it reaches 1520°C. If α = 4.5 × 10⁻³ °C⁻¹, find R at operating temperature. Is the bulb ohmic?

**Worked solution:**

*Step 1 — Temperature rise:*
ΔT = 1520 − 20 = 1500°C

*Step 2 — R at operating temperature:*
R = R₀[1 + α ΔT] = 10[1 + (4.5×10⁻³)(1500)] = 10[1 + 6.75] = 10 × 7.75 = **77.5 Ω**

*Step 3 — Ohmic?*
R = 10 Ω cold, 77.5 Ω hot — R varies significantly with temperature → **non-ohmic** (over the full operating range). At any fixed temperature it obeys Ohm's Law (R constant), but temperature changes with current.

**Answer:** R = 77.5 Ω at 1520°C; non-ohmic over its operating range (R varies with T).

---

### WE-3 (Wire comparison)

**Problem:** Wire A (copper, ρ_Cu = 1.7 × 10⁻⁸ Ω·m, diameter 2 mm, length 100 m) and Wire B (nichrome, ρ_Ni = 1.0 × 10⁻⁶ Ω·m, diameter 0.5 mm, length 1 m) are compared. Find R_A and R_B.

**Worked solution:**

*Wire A:* A_A = π(10⁻³)² = 3.14×10⁻⁶ m²
R_A = (1.7×10⁻⁸ × 100)/(3.14×10⁻⁶) = 0.541 Ω

*Wire B:* A_B = π(0.25×10⁻³)² = π(6.25×10⁻⁸) = 1.96×10⁻⁷ m²
R_B = (1.0×10⁻⁶ × 1)/(1.96×10⁻⁷) = 1.0×10⁻⁶/1.96×10⁻⁷ = **5.1 Ω**

Wire B (nichrome, 1 m long!) is more resistive than Wire A (copper, 100 m long). This is why heating elements use nichrome — high ρ means practical resistance with short lengths.

**Answer:** R_A = 0.54 Ω; R_B = 5.1 Ω

---

## Component 3 — Misconception Profiles

### MC-LONGER-WIRE-HAS-LOWER-RESISTANCE

**Trigger signal:** Student says "more wire gives more path for electrons — easier to conduct" or inverts the length dependence.

**Conflict evidence [P28]:** "Calculate: 1 m copper wire R₁ = ρ/A; 2 m copper wire R₂ = 2ρ/A = 2R₁. Longer wire — twice the resistance. Physical reason: electrons must travel further, suffering more collisions. Each collision transfers momentum to the lattice — more collisions per unit charge → more resistance. Connecting two equal resistors in series doubles the total resistance."

**Bridge text [P30]:** "Think of a pipe carrying water: a longer pipe has more friction — harder to maintain the same flow rate (current) for the same pressure difference (voltage). Resistance is proportional to length: R = ρL/A. Short, fat wire → low R. Long, thin wire → high R."

**Replacement text [P31]:** "Resistance R = ρL/A increases with length (directly proportional) and decreases with cross-sectional area. Longer wire → more electron collisions along the path → higher resistance. Thicker wire → more parallel paths for electrons → lower resistance. This is why extension cords use thicker wire for higher power devices."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "R ∝ L: doubling length doubles R" | "Longer wire → more path → lower R" |
| "R ∝ 1/A: thicker wire → lower R" | "Thicker wire resists more (more material)" |
| "Nichrome heater: short length, high ρ → practical high R" | "Long wire always has lower resistance than short wire" |

**s6_path:** Compute R for 1 m and 2 m of the same wire. Show R doubles. The misconception likely comes from confusing "path length" with "parallel paths" — more path length is a series connection, not a parallel one.

---

### MC-SEMICONDUCTOR-RESISTANCE-INCREASES-WITH-TEMPERATURE

**Trigger signal:** Student applies the metal formula R = R₀[1 + αΔT] with positive α to semiconductors, or says "all materials get more resistive when heated."

**Conflict evidence [P28]:** "Silicon at 20°C: ρ ≈ 640 Ω·m. At 100°C: ρ drops to ≈ 4 Ω·m — more than 100× decrease. This is the thermistor effect: as T rises, more electrons are thermally excited across the semiconductor's band gap into the conduction band. More carriers n → lower ρ = m/(ne²τ). For metals: n is fixed; τ decreases with T → ρ increases. For semiconductors: n increases exponentially with T; this dominates → ρ decreases."

**Bridge text [P30]:** "Metals: fixed number of electrons, but lattice vibrations increase (shorter τ) → more resistance at higher T. Semiconductors: very few free electrons at low T; heating liberates more → exponentially more carriers → dramatically lower resistance. The effect dominates: ρ_semiconductor ∝ e^(+E_g/2kT) — drops exponentially as T rises."

**Replacement text [P31]:** "The temperature coefficient of resistance α is positive for metals (R increases with T) and negative for semiconductors and insulators (R decreases with T). For semiconductors: thermal energy excites electrons across the band gap, dramatically increasing carrier density and dramatically decreasing resistance. This is the basis of thermistors (temperature sensors). Do not apply the metal formula R = R₀[1 + αΔT] to semiconductors."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Metals: R increases with T (positive α)" | "All materials: R increases with T" |
| "Semiconductors: R decreases with T (negative α)" | "α is always positive for any material" |
| "Thermistors use semiconductor's negative α for temperature sensing" | "Metal formula R = R₀(1+αΔT) applies to semiconductors" |

**s6_path:** Show the NTC (Negative Temperature Coefficient) thermistor datasheet — R drops rapidly with T. Contrast with PTC (Positive Temperature Coefficient) thermistor (uses PTCR ceramic) for safety circuits.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Write R = ρL/A and state what ρ is called and its SI unit.

**Answer key:** R = ρL/A; ρ = resistivity; SI unit: Ω·m (ohm-metres).

---

### P4-b (Basic calculation)
An aluminium wire (ρ = 2.65 × 10⁻⁸ Ω·m) is 50 m long and has cross-section 5.0 × 10⁻⁶ m². Find R.

**Answer key:** R = (2.65×10⁻⁸ × 50)/(5.0×10⁻⁶) = 1.325×10⁻⁶/5.0×10⁻⁶ = **0.265 Ω**

---

### P4-c (Scaling)
A wire has resistance 5 Ω. What is its resistance if: (a) its length is tripled, (b) its diameter is doubled, (c) both length is doubled and diameter is halved?

**Answer key:**
(a) R → 3 × 5 = **15 Ω**
(b) A → (2r)² × π/r²π × A = 4A → R → 5/4 = **1.25 Ω**
(c) L doubled → R × 2; diameter halved → A → (r/2)²/(r)² × A = A/4 → R × 4; total: R → 5 × 2 × 4 = **40 Ω**

---

### P4-d (Temperature coefficient)
A platinum wire (R₀ = 10.0 Ω at 0°C, α = 3.9 × 10⁻³ °C⁻¹) is used as a temperature sensor. If R = 11.56 Ω, what is the temperature?

**Answer key:** R = R₀(1 + αT) → 11.56 = 10.0(1 + 3.9×10⁻³×T) → 1.156 = 1 + 3.9×10⁻³×T → T = 0.156/(3.9×10⁻³) = **40°C**

---

### P4-e (Analysis — material selection)
A heating element must have R = 25 Ω and be made of nichrome (ρ = 1.0 × 10⁻⁶ Ω·m). If the wire radius is 0.3 mm, how long must it be?

**Answer key:** L = RA/ρ = R × πr²/ρ = 25 × π(3×10⁻⁴)²/(10⁻⁶) = 25 × π × 9×10⁻⁸/10⁻⁶ = 25 × π × 0.09 = 25 × 0.2827 = **7.07 m**

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What is resistance? What does it mean physically? How does it relate to the wire's material?"
  → [P06: concrete-anchor] — "Copper vs. nichrome: same geometry, very different R. R = ρL/A — resistivity is the material's intrinsic resistance per unit geometry."
  → [P41: diagnostic] — check if student knows R increases with length and decreases with area
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-LONGER-WIRE-HAS-LOWER-RESISTANCE, MC-SEMICONDUCTOR-RESISTANCE-INCREASES-WITH-TEMPERATURE)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (copper wire: R = ρL/A numerical)
  → [P06: concrete-anchor] — WE-2 (tungsten filament: T-dependent R, non-ohmic)
  → [P52: narrow] — "In WE-2: why does R increase 7.75× but the bulb is non-ohmic only overall?"
  → [P06: concrete-anchor] — WE-3 (nichrome vs. copper comparison — different ρ)

[P36: mastery-probe] — P4-c (scaling) + P4-d (thermometer)
  → if < 80%: re-address R ∝ L and R ∝ 1/A and R = R₀(1+αT)
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
State the formula relating resistance R to resistivity ρ, length L, and cross-sectional area A.

**Answer:** R = ρL/A. R increases with L (proportional), decreases with A (inversely proportional), and depends on the material through ρ.

---

### AP-2 (Bloom: Understand)
Explain why the resistivity of metals increases with temperature while the resistivity of semiconductors decreases.

**Answer:** In metals, the number of free electrons n is approximately constant (fixed by the atomic structure). As T increases, lattice vibrations (phonons) increase, reducing the mean collision time τ — electrons collide more frequently. Since ρ = m/(ne²τ), reduced τ → higher ρ. In semiconductors, n increases exponentially with T as electrons are thermally excited across the energy gap. This exponential increase in n dominates the modest decrease in τ, so ρ ∝ 1/n decreases dramatically with T.

---

### AP-3 (Bloom: Apply)
A resistor is made from a wire of resistivity 5 × 10⁻⁷ Ω·m, cross-section 0.10 mm² and length 2.0 m. Find R. If the wire is redesigned with half the length and double the cross-section, find new R.

**Answer:**
Original: R = (5×10⁻⁷ × 2.0)/(0.10×10⁻⁶) = 10⁻⁶/10⁻⁷ = **10 Ω**
New: L → 1.0 m, A → 0.20 mm² = 0.20×10⁻⁶ m²
R_new = (5×10⁻⁷ × 1.0)/(0.20×10⁻⁶) = 5×10⁻⁷/2×10⁻⁷ = **2.5 Ω** (4× reduction: L halved = ÷2, A doubled = ÷2 → total ÷4)

---

### AP-4 (Bloom: Analyze)
The resistivity of a semiconductor thermistor decreases by a factor of 10 for every 30°C rise in temperature. Starting from R = 100 kΩ at 20°C, find R at 80°C and explain the practical consequence for circuit design.

**Answer:** Temperature rise = 80 − 20 = 60°C = 2 × 30°C intervals. Factor of 10 decrease each interval → R_80 = 100 kΩ / (10 × 10) = **1 kΩ** (100× decrease in resistance). Consequence: the current through the thermistor increases 100× over this temperature range. Circuits using such thermistors must either be designed for this current range or include current-limiting resistors in series to protect the circuit and maintain linearity of the readout.

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | R = ρL/A: compute R from given material and geometry |
| +3 days | Scaling: if L doubles, if d doubles, if both change |
| +7 days | Temperature: R = R₀(1+αT) for metals; contrast with semiconductors |
| +21 days | Material selection: design a wire with target R from ρ, L, A |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.ohms-law` — R = V/I; resistance as circuit parameter

**Unlocked by this concept:**
- No direct KG unlock (leaf in chain)

**Cross-domain links:**
- `phys.em.electric-current` — Drude model connects ρ to drift velocity and carrier density
- `phys.em.electrical-power` — P = I²R: Joule heating depends on R (and thus ρ, L, A)

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 4, bloom = understand | PASS |
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

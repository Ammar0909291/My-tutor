# Teaching Blueprint — phys.em.electromagnetic-waves

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.electromagnetic-waves
name: "Electromagnetic Waves and the EM Spectrum"
domain: electromagnetism
difficulty:
  label: advanced
  number: 5
bloom: understand
prerequisites:
  - phys.em.maxwells-equations
mastery_threshold: 0.80
estimated_hours: 5
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "P (perceptual bridge entry; concrete optional)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

Drop a pebble in a still pond. Ripples spread outward — but what's waving? The water surface. Now imagine electric and magnetic fields as an invisible "medium" that can wave, except they need no physical medium at all. An EM wave is a coupled ripple in E and B fields: a changing E creates a B (Ampere-Maxwell), that changing B creates an E (Faraday), and so on — the ripple sustains itself indefinitely through empty space at c = 3×10⁸ m/s. Visible light, radio signals, microwaves, X-rays — all are the same phenomenon at different frequencies.

### Level 2 — Developing Understanding

**Structure of an EM wave (plane wave propagating along +x axis):**
- E oscillates along y: E_y = E₀sin(kx − ωt)
- B oscillates along z: B_z = B₀sin(kx − ωt)
- E ⊥ B ⊥ direction of propagation (transverse wave)
- E and B are in phase (both maxima at same time and place)
- Amplitude relation: **E₀ = cB₀** (or equivalently E₀/B₀ = c)

**Key parameters:**
- Wave speed in vacuum: c = λf = 1/√(μ₀ε₀) ≈ 3×10⁸ m/s
- Wave speed in medium: v = c/n, where n = √(ε_r μ_r) (refractive index)
- Wavenumber: k = 2π/λ
- Angular frequency: ω = 2πf

**Energy in EM waves:**
- Energy density: u = ε₀E² = B²/μ₀ (both equal; total u = ε₀E²)
- Poynting vector (energy flux): **S = (1/μ₀)(E×B)** [W/m²]
- Intensity (average power per area): **I = ½ε₀cE₀² = cε₀E_rms² = P/A**
- Radiation pressure:
  - Absorption: P_rad = I/c
  - Reflection: P_rad = 2I/c

**The EM spectrum (frequency increasing →):**

| Type | Frequency range | Wavelength range | Source / application |
|------|----------------|------------------|---------------------|
| Radio | 3 Hz – 3 GHz | >0.1 m | Communication, MRI |
| Microwave | 3 GHz – 300 GHz | 1 mm – 0.1 m | Radar, cooking, WiFi |
| Infrared (IR) | 300 GHz – 400 THz | 740 nm – 1 mm | Heat, remote sensing |
| Visible | 400 THz – 700 THz | 400 – 740 nm | Human vision |
| Ultraviolet (UV) | 700 THz – 30 PHz | 10 – 400 nm | Sterilization, sunburn |
| X-ray | 30 PHz – 30 EHz | 0.01 – 10 nm | Medical imaging, crystallography |
| Gamma (γ) | >30 EHz | <0.01 nm | Nuclear decay, cancer treatment |

All travel at c = 3×10⁸ m/s in vacuum, differ only in frequency/wavelength.

### Level 3 — Proficient Synthesis

**Deriving intensity from the Poynting vector:**

S = (E×B)/μ₀ in a plane wave → |S| = EB/μ₀ = E(E/c)/μ₀ = E²/(cμ₀) = ε₀cE²

Time-average (sin² averages to ½): **⟨S⟩ = I = ½ε₀cE₀²**

**Radiation pressure derivation:**

Momentum density of EM wave: g = S/c² = u/c

Pressure = force/area = momentum delivered per area per time = u (energy density) × c / c = u

For absorption (momentum absorbed): P = I/c
For reflection (momentum reversed): P = 2I/c

**Polarization:**
- Linear polarization: E oscillates in one fixed plane (e.g., always along y)
- Malus's Law (transmitted intensity through polarizer at angle θ): I = I₀cos²θ
- Natural light is unpolarized → first polarizer reduces intensity to I₀/2
- Brewster's angle for polarization by reflection: tan(θ_B) = n₂/n₁

**EM waves in matter:**
- Attenuation: amplitude decreases as E = E₀e^{−αx} (absorption)
- Dispersion: different frequencies travel at different speeds (n depends on f) → white light splits in glass

---

## Component 2 — Worked Examples

### WE-1: E₀/B₀ Relation and Intensity

**Problem:** An EM wave traveling in vacuum has electric field amplitude E₀ = 300 V/m.
(a) Find the magnetic field amplitude B₀.
(b) Find the intensity of the wave.
(c) Find the radiation pressure on a surface that completely absorbs the wave.

**Solution:**

**(a) Magnetic amplitude:**
E₀ = cB₀
B₀ = E₀/c = 300 / (3×10⁸)
**B₀ = 1×10⁻⁶ T = 1 μT**

**(b) Intensity:**
I = ½ε₀cE₀²
= ½ × (8.85×10⁻¹²) × (3×10⁸) × (300)²
= ½ × 8.85×10⁻¹² × 3×10⁸ × 9×10⁴
= ½ × 8.85 × 3 × 9 × 10⁰
= ½ × 238.95
**I ≈ 119 W/m²**

**(c) Radiation pressure (absorption):**
P_rad = I/c = 119 / (3×10⁸)
**P_rad ≈ 3.97×10⁻⁷ Pa ≈ 4×10⁻⁷ Pa**

Note: This is extremely small — radiation pressure is significant only in high-intensity laser beams or in space (solar sails).

---

### WE-2: Speed and Frequency in a Medium

**Problem:** An EM wave with frequency f = 5×10¹⁴ Hz (green light) enters glass with ε_r = 2.25 (μ_r ≈ 1 for glass). Find:
(a) The wave speed in glass.
(b) The wavelength in glass.
(c) The wavelength in vacuum.

**Solution:**

**(a) Speed in glass:**
n = √(ε_r × μ_r) = √(2.25 × 1) = √2.25 = 1.50
v = c/n = (3×10⁸) / 1.50
**v = 2×10⁸ m/s**

**(b) Wavelength in glass:**
λ_glass = v/f = (2×10⁸) / (5×10¹⁴)
**λ_glass = 4×10⁻⁷ m = 400 nm**

**(c) Wavelength in vacuum:**
λ₀ = c/f = (3×10⁸) / (5×10¹⁴)
**λ₀ = 6×10⁻⁷ m = 600 nm**

Note: Frequency does NOT change as the wave enters a medium — only speed and wavelength change. The photon energy (E = hf) depends on f, not λ, so energy is conserved. λ_glass = λ₀/n = 600/1.5 = 400 nm ✓

---

### WE-3: Radiation Pressure — Solar Sail

**Problem:** A solar sail of area 1000 m² is placed in space at Earth's distance from the Sun, where the solar intensity is I = 1360 W/m². The sail is a perfect reflector.
(a) Find the radiation force on the sail.
(b) If the spacecraft mass is 500 kg, find the resulting acceleration.
(c) Compare this to Earth's gravitational field (g = 9.8 m/s²).

**Solution:**

**(a) Radiation pressure (perfect reflection):**
P_rad = 2I/c = 2 × 1360 / (3×10⁸)
= 2720 / (3×10⁸)
= 9.07×10⁻⁶ Pa

Force: F = P_rad × A = 9.07×10⁻⁶ × 1000
**F ≈ 9.07×10⁻³ N ≈ 9.1 mN**

**(b) Acceleration:**
a = F/m = 9.07×10⁻³ / 500
**a ≈ 1.81×10⁻⁵ m/s² ≈ 18 μm/s²**

**(c) Comparison to g:**
a/g = 1.81×10⁻⁵ / 9.8 ≈ 1.85×10⁻⁶

**Solar radiation pressure gives acceleration ≈ 1.85 millionths of g.** Despite being tiny, it accumulates over months in frictionless space — solar sails are a genuine proposed propulsion method for deep-space missions. In 2010, Japan's IKAROS spacecraft was the first to demonstrate solar-sail propulsion in interplanetary space.

---

## Component 3 — Misconception Engine

### MC-1: MC-EM-WAVES-REQUIRE-A-MEDIUM

**trigger_signal:** Student states "EM waves travel through the aether," asks "what vibrates in an EM wave," or claims "radio waves can't reach satellites because there's no air in space."

**conflict_evidence [P28]:** The Michelson-Morley experiment (1887) searched for the luminiferous aether — the medium thought to carry light — by measuring whether light's speed differed along Earth's direction of motion. It found no difference. If light required a medium, the medium's wind would change c measurably. Maxwell's derivation shows why: the wave equation ∇²E = μ₀ε₀∂²E/∂t² contains only field properties (μ₀, ε₀), no medium properties. What "waves" in an EM wave is the electric and magnetic field themselves — they are the medium and the wave simultaneously. GPS satellites, deep-space probes, and the Hubble Space Telescope all demonstrate EM wave propagation in near-perfect vacuum daily.

**bridge_text [P30]:** In a mechanical wave (sound, water), the medium stores energy by being displaced. In an EM wave, energy is stored in the E and B fields themselves (u = ε₀E²). There is no material that needs to be present to store or transmit this energy — the fields carry it. The fields can exist in vacuum; vacuum is not empty of fields, just empty of matter.

**replacement_text [P31]:** EM waves are self-sustaining field oscillations — no material medium required. A changing E field generates B (Ampere-Maxwell), that changing B generates E (Faraday), and the cycle propagates through vacuum at c = 3×10⁸ m/s. The "medium" is the electromagnetic field itself, which permeates all space, including absolute vacuum.

**discrimination_pairs [P33]:**
- "Light cannot travel through the vacuum of interplanetary space" → FALSE: all astronomical observations depend on light propagating 10⁸ to 10²⁶ meters of vacuum.
- "Sound and light both travel by displacing something" → FALSE: sound displaces matter (requires medium); light oscillates self-sustaining field values requiring no material substrate.

**s6_path:** If student scores < 0.60 on "what is the medium for EM waves" probe → show Michelson-Morley result and Maxwell equation vacuum derivation before mastery gate.

---

### MC-2: MC-E-AND-B-FIELDS-OUT-OF-PHASE

**trigger_signal:** Student draws E at maximum when B is zero (or vice versa), states "E and B alternate so when one is up the other is down," or confuses phase relationship with polarization direction.

**conflict_evidence [P28]:** The plane-wave solutions of Maxwell's equations in vacuum are E_y = E₀sin(kx−ωt) and B_z = B₀sin(kx−ωt). Both contain the same sin(kx−ωt) factor — they are in phase. When E is at its maximum, B is at its maximum simultaneously, at the same location. If they were 90° out of phase (like the E-field and current in a capacitor), the Poynting vector S = E×B/μ₀ would time-average to zero — the wave would carry no net energy flow, which contradicts the fact that sunlight warms your skin.

**bridge_text [P30]:** The confusion often comes from comparing EM waves to AC circuits: in a capacitor circuit, E and I are 90° out of phase. But in an EM wave, E and B play the role of two voltages in a resonant LC circuit at natural frequency — at resonance, energy sloshes between them with zero phase lag. The amplitude relationship E₀ = cB₀ holds at every point and instant.

**replacement_text [P31]:** In a plane EM wave, E and B are always in phase (zero phase difference). Both reach their maxima and cross zero at the same time and place. They oscillate in perpendicular planes — E along y, B along z, propagation along x — but their peaks and zeros coincide. E₀ = cB₀ is not just an average relation; it holds instantaneously.

**discrimination_pairs [P33]:**
- "When the electric field in an EM wave is maximum, the magnetic field is zero" → FALSE: both are maximum simultaneously; E_y = E₀sin(kx−ωt) and B_z = B₀sin(kx−ωt) have the same phase.
- "E and B are perpendicular in an EM wave, so they must be out of phase" → FALSE: perpendicular refers to their spatial directions (planes of oscillation), not their phase; same phase, different planes.

**s6_path:** If student fails phase-relationship probe → assign E-B phase animation (synchronized oscillation display) + numerical check I = ½ε₀cE₀² > 0 proof.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | Knows light is a wave but thinks it needs a medium; treats spectrum as isolated phenomena | Cannot connect EM spectrum entries to Maxwell's equations |
| S3 | Knows c = 3×10⁸ m/s, can name spectrum regions, confused about E-B phase and amplitude relation | States E₀/B₀ = some unclear factor; cannot compute radiation pressure |
| S6 | Understands transverse wave structure, knows E₀ = cB₀, can compute intensity; uncertain about radiation pressure and Poynting vector direction | Computes I correctly but cannot derive P_rad; confuses absorption vs. reflection pressure |
| S9 | Can derive E₀/B₀ = c from Maxwell's equations; computes intensity, radiation pressure, and discusses polarization; places spectrum types in correct frequency order | Correctly applies Malus's Law; explains why frequency doesn't change at medium boundary |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: P (perceptual bridge; difficulty 5, bloom=understand).

**TA-1 [P01 — Session Open]**
"A radio signal left the Voyager 1 spacecraft 23 billion km away and arrived at NASA's antenna 21 hours later. Nothing but vacuum in between. What is traveling? What carries the energy? Today we examine the physical structure of electromagnetic waves — the coupled field oscillations that Maxwell's equations demand. Start with: in an EM wave, what exactly is oscillating?"
[Diagnose S0 vs. S3 by response to "what oscillates"]

**TA-2 [P06 — Pictorial Anchor: transverse wave diagram]**
"[Display: 3D diagram of E along y, B along z, propagation along x. Both sinusoidal with identical phase.] Notice three things: E ⊥ B ⊥ propagation direction. Both fields oscillate in phase — same peaks, same zeros. And the amplitude ratio is fixed: E₀/B₀ = c. These are not arbitrary conventions — they come directly from Maxwell's equations. Let's establish the numbers concretely." [→ WE-1]

**TA-3 [P28 — Conflict Evidence: MC-1]**
"Let's address the medium question directly. [Display: Michelson-Morley experimental result — flat null.] In 1887 Michelson and Morley searched for the medium (aether) that light supposedly needs. They found none. Maxwell's equation derivation tells us why: the wave equation contains only μ₀ and ε₀ — field properties of vacuum, not properties of any material. GPS, radio telescopes, and solar panels all depend on EM waves crossing the vacuum of space. No medium is required or present."

**TA-4 [P31 — Replacement: MC-2]**
"Now the phase question. [Display: synchronized animation of E and B sinusoids with same phase.] Many students expect E and B to alternate like E and I in an RC circuit. But this is an EM wave at vacuum, not a circuit. The plane-wave solutions: E_y = E₀sin(kx−ωt) and B_z = B₀sin(kx−ωt) — identical argument inside the sine. When E is maximum, B is maximum. If they were 90° out of phase, the Poynting vector S = E×B/μ₀ would time-average to zero — the wave would carry no energy. But sunlight carries 1360 W/m². [→ MC-2 discrimination pairs]"

**TA-5 [P52 — Narrow: EM spectrum and medium effects]**
"The EM spectrum is one wave phenomenon at different frequencies. [Display: spectrum table from radio to gamma.] All travel at c in vacuum. In matter: v = c/n, wavelength shortens, frequency unchanged. Calculate: green light (600 nm in vacuum) enters glass (n=1.5). What is λ in glass?" [→ WE-2; confirms n and medium effects at S6]

**TA-6 [P41 — Diagnostic: radiation pressure]**
"Radiation pressure: does light exert a force? Quick calculation setup: a 1 kW laser beam (I = 10⁶ W/m² for a tight beam) aimed at a black target. P_rad = I/c. Find F if the beam area is 1 mm². [A = 10⁻⁶ m². F = I×A/c = 10⁶×10⁻⁶/(3×10⁸) = 10⁰/(3×10⁸) ≈ 3.3 nN.] Tiny — but real. What happens for a mirror (perfect reflector)?" [→ WE-3 for engineering-scale example]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) An EM wave has E₀ = 120 V/m. Find B₀, intensity, and radiation pressure on an absorbing surface. (2) Light enters a medium with n = 1.33 (water). Find the speed and wavelength if f = 6×10¹⁴ Hz. (3) In what order do radio waves, X-rays, and visible light appear in the EM spectrum from lowest to highest frequency?

Closing thought: Every technology that communicates wirelessly — your phone, GPS, WiFi, satellite TV — operates because Maxwell's equations predicted that E and B could sustain each other through empty space. That prediction was made in 1865, seventeen years before Hertz demonstrated radio waves experimentally.

Spaced retrieval: +1 day (E₀ = cB₀ derivation origin), +4 days (intensity formula and spectrum order), +2 weeks (radiation pressure for absorber vs. reflector)."

[P91 gate: threshold 0.80. If not reached → review E-B phase diagram and spectrum ordering exercise.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** An EM wave in vacuum has wavelength λ = 3 m. Find its frequency and identify what region of the EM spectrum it belongs to. Explain why it can travel through the vacuum of space without a medium.

**P-2 (Developing — identifies S6):** An EM wave has magnetic field amplitude B₀ = 2×10⁻⁷ T.
(a) Find E₀.
(b) Find the intensity.
(c) If this wave strikes a perfectly reflecting mirror of area 0.5 m², find the radiation force.

**P-3 (Proficient — identifies S9):** A polarized light beam of intensity 80 W/m² passes through a polarizing filter whose transmission axis makes 30° with the beam's polarization direction. (a) Find the transmitted intensity. (b) If this transmitted beam then passes through a second filter at 60° to the first, find the final intensity. (c) Why does the intensity not drop to zero even at large angles?

**P-4 (Mastery gate — confirms S9):** Explain, in terms of Maxwell's equations, why:
(a) the E and B fields of an EM wave must be in phase,
(b) the amplitude ratio must be E₀/B₀ = c,
(c) EM waves can propagate in vacuum.
Then calculate: a radio station broadcasts at 100 MHz with radiated power P = 50 kW. At distance r = 10 km from the antenna (assume isotropic radiation), find E₀, B₀, and radiation pressure on an absorbing antenna of area 1 cm². Required: 4/4 at ≥0.80 accuracy to pass mastery gate.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** 3D interactive EM wave model. Plane wave propagating along x-axis. E oscillates along y (red), B oscillates along z (blue). Sliders: frequency (radio to gamma), medium refractive index. Displays: λ, f, c/n, E₀, B₀ with E₀ = cB₀ constraint enforced. Both sinusoids shown in phase. Arrow at each point shows Poynting vector direction (always along x).

**VIS-2:** EM spectrum strip map. Full spectrum from radio to gamma laid out horizontally (log frequency scale). Frequency and wavelength labeled at boundaries. Each region color-coded. Hovering over a region shows: typical source, application, energy per photon (E=hf). Visible spectrum shown with actual colors (400–700 nm).

**VIS-3:** Radiation pressure simulation. A photon beam hitting a surface. Two modes: absorber (photons stop, one momentum arrow absorbed) vs. reflector (photons bounce, two momentum arrows — incident + reflected). Force meter updates. Demonstrates why P_reflect = 2I/c. Slider for intensity and surface area.

**VIS-4:** Polarization and Malus's Law interactive. Unpolarized beam enters first polarizer (set to 0°). Second polarizer angle is adjustable (0°–90°). Graph shows transmitted intensity vs. angle: I = I₀cos²θ. Key points highlighted: θ=0° → full transmission; θ=90° → zero transmission; θ=45° → I₀/2.

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.em.maxwells-equations | Maxwell's equations are the theoretical basis for EM wave existence and properties | prerequisite |
| phys.mod.photoelectric-effect | Photon model of light (E=hf) builds on EM wave framework; wave-particle duality arises from EM spectrum | unlocks |
| phys.rel.postulates | Speed of light c in Maxwell's equations is the constant that motivated special relativity (c is frame-independent) | unlocks |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.em.electromagnetic-waves ✓ |
| V-2 | name matches KG exactly | PASS — "Electromagnetic Waves and the EM Spectrum" ✓ |
| V-3 | domain derived from prefix phys.em → electromagnetism | PASS ✓ |
| V-4 | difficulty label+number consistent (advanced=5) | PASS ✓ |
| V-5 | bloom matches KG (understand) | PASS ✓ |
| V-6 | All prerequisites present in KG requires list | PASS — maxwells-equations ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (5) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage set and consistent with rules | PASS — P (difficulty 5, bloom=understand) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1 (no medium), MC-2 (E-B phase), each with all 6 fields ✓ |
| V-12 | ≥3 worked examples with complete numeric solutions | PASS — WE-1 (E₀,B₀,I,P_rad), WE-2 (medium speed/wavelength), WE-3 (solar sail force/acceleration) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap and uses correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P31/P52/P41/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 (foundational), P-2 (developing), P-3 (proficient), P-4 (mastery gate) ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-4 ✓ |
| V-17 | Cross-links table present | PASS — 3 entries ✓ |
| V-18 | No implementation code, no route/schema changes | PASS ✓ |
| V-19 | No curriculum authoring for other subjects | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**

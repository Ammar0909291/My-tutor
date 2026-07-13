# Teaching Blueprint: Gravitational Waves
**ID:** phys.astro.gravitational-waves
**Version:** 1.0 | **Status:** PACKAGE_READY

---

## Section 0 — Concept Metadata
| Field | Value |
|---|---|
| Concept ID | phys.astro.gravitational-waves |
| Name | Gravitational Waves |
| Domain | Astrophysics |
| Difficulty | Expert |
| Bloom Level | Analyze |
| Estimated Hours | 8 |
| Prerequisites | phys.astro.black-holes |
| Unlocks | (none) |

---

## Section 1 — Concept Spine

**Core Claim:** Gravitational waves are ripples in spacetime curvature produced by accelerating masses, propagating at speed c; their amplitude (strain h = ΔL/L ~ 10⁻²¹) is detected by interferometers measuring differential arm-length changes; GW150914 (LIGO, 2015) confirmed their existence by detecting the merger of two black holes (~30 M_sun each, 1.3 Gly away), inaugurating multi-messenger gravitational wave astronomy.

**Why It Matters:** Gravitational waves provide a fundamentally new window on the universe — they pass through all matter without scattering (unlike light), carry information from the moment of emission (including from inside supernova cores), and probe extreme gravity: black hole mergers, neutron star mergers (r-process nucleosynthesis), and the very early universe.

**Threshold Concept:** Gravitational waves are not gravity waves (ocean-like waves in a fluid) — they are oscillations in the fabric of spacetime itself, stretching and squeezing distances between free masses in perpendicular directions as they pass. The strain h = ΔL/L ~ 10⁻²¹ means LIGO detects a length change of 10⁻¹⁸ m (1/1000 of a proton diameter) in a 4-km arm.

**Prerequisite Knowledge Check:**
- Black holes, Schwarzschild metric, spacetime curvature (phys.astro.black-holes)
- Spacetime interval and four-vectors (phys.rel.spacetime)
- Electromagnetic waves as an analogy (phys.em.electromagnetic-waves)

---

## Section 2 — Four-Stage CPA+ Mental Model

**Concrete:** Two neutron stars orbiting each other, spiraling inward. As they orbit, they shake spacetime like two balls spinning on a rubber sheet, sending ripples outward at the speed of light. These ripples expand spherically; by the time they reach Earth (1 billion light-years away), they are minuscule but detectable.

**Representational:**
- Plus (+) and cross (×) polarization: a ring of free test masses alternately squashed and stretched in perpendicular directions — the two independent GW polarizations (h₊, h×)
- Strain: h = ΔL/L; typical binary merger at 1 Gpc: h ~ 10⁻²¹
- Chirp signal: frequency and amplitude of GW increase as binary inspirals — "chirp" ends at merger with peak GW emission
- LIGO: 4-km Fabry-Pérot arms, laser interferometry, sensitivity to ΔL ~ 10⁻¹⁸ m

**Abstract:**
- Linearized GR: g_μν = η_μν + h_μν where h_μν ≪ 1 (perturbation to flat spacetime)
- Wave equation: □h_μν = −16πG/c⁴ T_μν (T_μν = stress-energy source)
- Quadrupole formula: power radiated P = −G/5c⁵ × d³Q_ij/dt³ × d³Q^ij/dt³ where Q_ij = ∫ρ(3x_ix_j − r²δ_ij)d³x is the mass quadrupole moment
- Why no monopole/dipole: monopole = mass conservation, dipole = momentum conservation (no GW monopole or dipole radiation)
- Binary inspiral: f_GW = 2f_orbital; chirp mass M_c = (m₁m₂)^(3/5)/(m₁+m₂)^(1/5); f̊ = (96/5)π^(8/3)(GM_c/c³)^(5/3) f^(11/3)
- Amplitude: h ~ 4G/(c⁴r) × (GM_c/c²) × (πf_GW GM_c/c³)^(2/3)
- Merger timescale: τ ~ 12c⁵a₀⁴/(85G³m₁m₂(m₁+m₂)) (Peters formula)

**Transfer:** GW170817 (2017): NS-NS merger observed in GW + gamma-ray burst + kilonova — multi-messenger astronomy confirming r-process nucleosynthesis of gold/platinum. Pulsar timing arrays (PTAs): sensitivity to nHz GW background from supermassive BH binaries — evidence announced 2023. Space-based LISA (2034): mHz band, supermassive BH mergers, galactic compact binaries.

---

## Section 3 — Why Beginners Fail

1. **Confusing gravitational waves with gravity waves:** "Gravity waves" are waves in fluids driven by gravity (ocean swells, atmospheric waves). Gravitational waves are spacetime ripples — entirely different physics. The naming confusion is widespread even in popular science.
2. **LIGO measures displacement, not strain:** Learners think the detector directly measures "the space stretching." LIGO measures differential arm length changes δL; the strain h = δL/L is derived. The 10⁻¹⁸ m change in a 4 km arm gives h = 10⁻¹⁸/4000 = 2.5×10⁻²² — consistent with GW150914's h ~ 10⁻²¹.
3. **Why no GW dipole radiation:** In electrodynamics, accelerating charges radiate dipole waves. In GR, there is no GW dipole because momentum is conserved (the mass dipole d⃗ = Σm_i r⃗_i → d²d⃗/dt² = 0 by Newton's second law). The lowest non-zero multipole is quadrupole.
4. **Thinking LIGO directly images the source:** LIGO is not a telescope — it detects the time-varying strain h(t) at one point. The source location is determined by comparing arrival times at multiple detectors and matching the waveform template to a theoretical model.

---

## Section 4 — Misconception Library

### MC-1: Gravitational waves travel through space like ocean waves through water
- **Probe:** "What medium do gravitational waves travel through?"
- **Characteristic phrase:** "They travel through space like waves in water."
- **Trigger:** "Waves" naturally suggests a medium; confusion with seismic or ocean waves.
- **Conflict evidence [P28]:** Electromagnetic waves travel through vacuum — no medium. Gravitational waves also require no medium; they are perturbations of spacetime geometry itself. They travel through absolute vacuum. GW150914 traveled 1.3 billion light-years through intergalactic space — no medium whatsoever.
- **Bridge [P30]:** In GR, spacetime is a dynamical field (not a fixed background). GW are ripples in this field — analogous to photons being excitations of the EM field, but GWs are excitations of the gravitational field (the metric).
- **Replacement [P31]:** GWs travel through spacetime itself (no medium needed) at c. They are transverse perturbations of the metric h_μν: space between free masses oscillates as the wave passes. The oscillation is in the fabric of space, not in any material medium.
- **Discrimination pairs [P33]:** Sound waves: require air/medium (pressure waves). EM waves: no medium (oscillating E and B fields). GW: no medium (oscillating spacetime curvature). GWs pass through Earth with negligible absorption.
- **S6 repair path:** Explain how GW150914's signal was detected simultaneously (within 7 ms) at LIGO Hanford and Livingston — no medium absorption, only travel time difference for source angle.

### MC-2: GW detection measures the speed of the waves, not their strain
- **Probe:** "What exactly does LIGO measure?"
- **Characteristic phrase:** "It measures the speed of the gravitational waves."
- **Trigger:** "Detecting" often means measuring a speed or frequency.
- **Conflict evidence [P28]:** LIGO measures h(t) = ΔL/L(t), the time-varying differential arm length change. GW speed was confirmed = c by comparing GW170817 arrival with gamma-ray burst (Δt < 1.7 s over ~1.8 billion light-years → |v_GW/c − 1| < 10⁻¹⁵).
- **Bridge [P30]:** LIGO arms are 4 km Fabry-Pérot cavities. A GW passing in the plane of the detector stretches one arm and compresses the other by ΔL, changing the optical path difference and causing a laser power change at the photodetector proportional to h.
- **Replacement [P31]:** LIGO measures h(t) = ΔL(t)/L where L = 4 km. For GW150914: peak h ~ 10⁻²¹, ΔL ~ 4×10⁻¹⁸ m. GW speed is inferred from inter-detector timing (c confirmed to 15 significant figures from GW170817).
- **Discrimination pairs [P33]:** Measuring GW speed: time-of-flight between detectors (Δt ~ 10 ms, consistent with c). Measuring GW strain: optical interferometry of arm length changes (ΔL ~ 10⁻¹⁸ m).
- **S6 repair path:** Walk through the LIGO detection principle: laser beam split, travel different arms, recombine — any arm length difference → phase shift → power change at photodetector.

### MC-3: Gravitational waves lose intensity because gravity weakens
- **Probe:** "Why does the GW strain decrease with distance?"
- **Characteristic phrase:** "Gravity gets weaker with distance, so GWs do too."
- **Trigger:** Confusing static gravitational force (∝ 1/r²) with radiation intensity.
- **Conflict evidence [P28]:** GW strain h ∝ 1/r (not 1/r²). Intensity (power per area) I ∝ h² ∝ 1/r² (as expected for any wave). The 1/r dependence of h is the same as for EM wave amplitude — energy is conserved as it spreads over a sphere of area 4πr². If h ∝ 1/r², amplitude would fall too fast to explain observed GW signals from billion-light-year distances.
- **Bridge [P30]:** GWs are radiation, not the static Newtonian field. Radiation amplitude falls as 1/r (energy conservation: I∝h²∝1/r²→total power through a sphere is constant). Static field falls as 1/r².
- **Replacement [P31]:** h ∝ 1/r (radiation field). Static gravitational potential ∝ 1/r. Static force ∝ 1/r². The radiative 1/r fall-off is why LIGO can detect sources 1 Gpc away — if it were 1/r², the signal would be 10²¹ times smaller.
- **Discrimination pairs [P33]:** GW amplitude: h ∝ 1/r. EM wave amplitude: E ∝ 1/r. Coulomb field: E ∝ 1/r². Newtonian gravity: g ∝ 1/r².
- **S6 repair path:** Energy conservation argument: power P spreads over 4πr² → I = P/(4πr²) ∝ 1/r² → I ∝ h² → h ∝ 1/r.

### MC-4: Any accelerating mass produces detectable gravitational waves
- **Probe:** "Can I produce gravitational waves by waving my arms?"
- **Characteristic phrase:** "Yes — any acceleration produces GWs."
- **Trigger:** Correct in principle; misleading about detectability.
- **Conflict evidence [P28]:** The quadrupole formula: P = G/(5c⁵)|d³Q/dt³|². For a person (m~70 kg) waving arms (a~10 m/s², r~0.5 m): Q ~ mr² ~ 17 kg·m², d³Q/dt³ ~ ma²r ~ 350 kg·m²/s³. P ~ 6.67×10⁻¹¹ / (5×(3×10⁸)⁵) × 350² ~ 10⁻⁵⁰ W. For reference, a single microwave photon carries ~10⁻²⁴ J. Utterly undetectable.
- **Bridge [P30]:** GW emission scales as G/c⁵ ~ 10⁻⁵³ W·s³/kg²·m² — an incredibly small constant. Detecting human-scale GWs would require sensitivity 10⁵⁰× beyond LIGO.
- **Replacement [P31]:** GWs are produced by any non-spherical accelerating mass. But detectable GWs require: compact massive objects (BH, NS) at high velocities (~0.1–1c) with large mass quadrupole moment changes. GW150914: total emitted power ~10⁴⁹ W at merger (10× the luminosity of all visible stars in the observable universe, for ~0.1 s).
- **Discrimination pairs [P33]:** Human arm waving: P ~ 10⁻⁵⁰ W. Binary black hole merger: P ~ 10⁴⁹ W. A ratio of 10⁹⁹ — gravitational wave astronomy requires extreme astrophysical sources.
- **S6 repair path:** Calculate P for a binary neutron star system and compare to a human; shows why astrophysical sources are needed.

---

## Section 5 — Explanation Library

### Explanation A — Quadrupole Radiation and Why No Dipole
Why does GW radiation require a changing quadrupole moment, not dipole? Electrodynamics has E&M dipole radiation because charge can be separated — positive and negative charges move independently. Gravity has only positive "charge" (mass), and the total momentum Σm_i v_i is conserved (no net force in isolation). So the mass dipole d_i = Σm_i r_i has d²d_i/dt² = Σm_i a_i = F_total = 0. No GW dipole. The next non-vanishing multipole: quadrupole Q_ij = ∫ρ(3x_ix_j − r²δ_ij)d³x. Its third time derivative gives GW emission power via the quadrupole formula. This is why orbiting bodies (with changing quadrupole geometry) are the dominant GW sources.

### Explanation B — The Chirp and Inspiral
Two orbiting masses lose energy to GW radiation → orbit shrinks → orbital frequency increases → GW frequency (twice orbital) increases → more power radiated → spiral accelerates. This runaway inspiral produces a "chirp" — frequency rising from ~20 Hz (LIGO band entry) to ~150 Hz (merger) over ~0.2 s for GW150914. From the chirp pattern, we extract: chirp mass M_c = (m₁m₂)^(3/5)/(m₁+m₂)^(1/5) ~ 28.3 M_sun (for 35.6 + 30.6 M_sun); distance r ~ 440 Mpc (from amplitude h); sky position (from timing between LIGO Hanford and Livingston, 10 ms arrival difference). After merger: ringdown at quasinormal mode frequency of the final BH.

### Explanation C — Multi-Messenger Astronomy and GW170817
On August 17, 2017, LIGO + Virgo detected a 100-s inspiral chirp from a binary neutron star merger (GW170817). 1.7 seconds later, Fermi GBM detected a short gamma-ray burst (GRB 170817A) from the same sky position. Electromagnetic follow-up across the spectrum (UV, optical, IR, X-ray, radio) revealed a kilonova — optical transient powered by radioactive r-process elements (gold, platinum, lanthanides) synthesized in the merger. GW170817 confirmed: (1) short GRBs are produced by NS-NS mergers; (2) r-process elements are forged in NS mergers; (3) v_GW = v_light to 15 significant figures. This event launched multi-messenger astrophysics.

---

## Section 6 — Analogy Library

**Primary Analogy:** A stone dropped in a still pond creates ripples. Two orbiting black holes "drop" their gravitational energy into spacetime, creating curvature ripples that expand at c. The stone analogy breaks: pond ripples are in water (a medium); GW are in spacetime itself. And pond ripples are scalar; GW are tensor (two independent polarizations, + and ×).

**Breaking Point:** Pond ripples: transverse displacement of water molecules. GW: no medium — the oscillation is in the geometry (distances between free masses). Also: pond ripples carry negligible energy compared to their source; GW150914 radiated ~3 M_sun of rest-mass energy (E = Mc² = 5×10⁴⁷ J) in 0.2 s — the most energetic event ever observed.

**Anti-Analogy:** Gravitational waves vs. Newtonian "instantaneous" gravity. Newton's gravity is instantaneous — changing the Sun's position instantaneously changes Earth's gravitational field everywhere. GR: no action-at-a-distance; gravitational influence propagates at c. GW are the radiative component of this propagation, analogous to EM radiation from accelerating charges.

---

## Section 7 — Demonstration Library

**Demo 1 — GW150914 Chirp Signal**
Show the actual LIGO strain h(t) for GW150914 in both Hanford and Livingston detectors. Identify: (1) noise before merger; (2) chirp from ~0.35 s to 0 s (merger); (3) ringdown after merger. Note the 7 ms time difference between detectors (light travel time consistent with source direction). Compute: peak strain h ~ 10⁻²¹, peak frequency ~150 Hz at merger.

**Demo 2 — Strain Calculation**
LIGO arm length L = 4 km = 4000 m. GW150914 peak strain h ~ 10⁻²¹. Calculate ΔL = h × L = 10⁻²¹ × 4000 = 4×10⁻¹⁸ m. Compare: proton radius ~10⁻¹⁵ m → LIGO detects 1/1000 of a proton diameter. Show that this requires: (1) laser wavelength stability to 10⁻¹¹ of wavelength, (2) seismic isolation to 10⁻¹² m, (3) quantum noise (shot noise) reduction via squeezed light.

**Demo 3 — Peters Timescale Formula**
Binary pulsar B1913+16 (Hulse-Taylor, Nobel 1993): m₁ = m₂ = 1.4 M_sun, orbital period P = 7.75 h, eccentricity e = 0.617. Peters formula predicts orbital decay of ~3.5 mm/orbit due to GW emission. Observed: confirmed to 0.2% over 40 years of pulsar timing — first indirect GW detection, Nobel Prize 1993.

---

## Section 8 — Discovery Lesson

**Setup:** Show learners the GW150914 strain data (time vs. h) and the theoretical template for a 36+29 M_sun binary BH merger.

**Task 1:** "At what time did the merger occur? What was the GW frequency at merger?" (Peak of strain amplitude; f ~ 150 Hz at merger.)

**Task 2:** "If the signal arrived at Hanford 7 ms before Livingston (speed of light, 3000 km apart), at what angle was the source above the detector baseline?" (~40° from the baseline — approximate sky localization.)

**Task 3:** "Given h_peak ~ 10⁻²¹ and r ~ 440 Mpc (from waveform template), and using h ~ 4G/(rc⁴)(d²Q/dt²), estimate the chirp mass." (Requires working backward — advanced, but illustrates how M_c is extracted from h and r.)

**Resolution:** The three measurables — frequency evolution (chirp mass), amplitude (distance × chirp mass), and arrival time difference (sky position) — completely characterize the binary system. GW detection is matched filtering: multiply the data by templates computed from GR, find the template that maximizes signal-to-noise.

---

## Section 9 — Teaching Actions

**Session cap:** 3 actions per session.

| Priority | Action | Trigger |
|---|---|---|
| 1 | Calculate ΔL = h × L for GW150914; compare to proton diameter | Learner thinks LIGO measures something macroscopic |
| 2 | Explain quadrupole formula and why no dipole GW radiation | Learner thinks any mass acceleration produces detectable GWs |
| 3 | Show chirp signal from GW150914 and identify inspiral, merger, ringdown phases | Learner unclear what LIGO detected |

---

## Section 10 — Voice Teaching

**Opening hook:** "On September 14, 2015 at 5:51 AM Eastern time, two detectors separated by 3,000 km simultaneously felt spacetime vibrate by less than one-thousandth of a proton's diameter. In that moment, 1.3 billion light-years away, two black holes 60 times the Sun's mass had merged. We detected it. Einstein predicted gravitational waves 100 years earlier. He didn't believe they'd ever be detectable."

**Pacing:** Lead with GW150914 — the actual data, the actual numbers. The physics comes after: what is spacetime doing, why do BH mergers produce GWs, why is h ~ 10⁻²¹ instead of 0.

**Common impasse language:** "How does LIGO detect 10⁻¹⁸ m? Laser light has wavelength ~1 μm = 10⁻⁶ m — much larger than the signal. The trick: light bounces back and forth 300 times in the arm (effective length 1200 km); then we use interference to measure phase shifts to 10⁻¹¹ of a wavelength; then we average over millions of cycles. Signal extraction from noise is all matched filtering with GR templates."

**Closing consolidation:** "Gravitational wave astronomy is less than 10 years old. We have detected ~90 events so far: black hole mergers, neutron star mergers, and possibly neutron star-black hole mergers. Future detectors (Cosmic Explorer, Einstein Telescope, LISA) will detect thousands per year, mapping the black hole and neutron star population of the universe. We've opened a new sense for astronomy — not just seeing the universe, but feeling it."

---

## Section 11 — Assessment

**Mastery gate:** Explain GW origin; compute strain for given ΔL/L; explain why quadrupole (not dipole) radiation; interpret chirp signal.

**FA-1:** "LIGO's 4-km arm detects a strain h = 5×10⁻²¹. What is the arm length change ΔL?"
*Expected:* ΔL = h × L = 5×10⁻²¹ × 4000 = 2×10⁻¹⁷ m. Compare to proton radius 10⁻¹⁵ m → 1/50 of a proton diameter.
*Threshold:* Correct formula h = ΔL/L; correct calculation; comparison to a physical scale.

**FA-2:** "Why don't gravitational waves have a dipole component? Why is quadrupole the lowest order?"
*Expected:* GW monopole = zero (mass conservation: M constant). GW dipole = zero (momentum conservation: Σm_i a_i = F_total = 0 in isolated system → d²(mass dipole)/dt² = 0). First non-vanishing multipole: quadrupole Q_ij, which requires asymmetric mass distribution changing with time. For a circular orbit: Q changes as the binary orbits, giving GW radiation.
*Threshold:* States conservation laws; identifies quadrupole as lowest order; explains why for isolated systems.

**FA-3:** "GW170817 detected a neutron star merger in GW. Why was it also detected in gamma rays 1.7 seconds later?"
*Expected:* NS-NS merger produces a short gamma-ray burst (relativistic jet launched from the merger remnant/black hole formed). GW travel at c (no absorption); GRB jet is launched ~1.7 s after merger (jet formation delay). Both arrive at Earth from the same source, GRB 1.7 s later. This confirms: (1) v_GW = c to very high precision; (2) short GRBs originate from NS mergers.
*Threshold:* Explains GW travel at c; gives physical reason for 1.7 s delay (jet formation); states both confirmations.

**FA-4:** "What does the 'chirp' in a GW chirp signal represent physically?"
*Expected:* As two compact objects inspiral, they lose orbital energy to GW radiation → orbit shrinks → orbital frequency f_orb increases → f_GW = 2f_orb increases. More energy lost per orbit as objects closer → acceleration increases → amplitude h increases. The chirp (rising frequency and amplitude) traces the inspiral dynamics. It ends at merger (peak frequency and amplitude) followed by ringdown (decaying oscillation of the final BH's quasinormal modes).
*Threshold:* Connects energy loss to frequency increase; identifies merger as signal peak; mentions ringdown.

**Confidence calibration:** After FA-1, ask: "If a detector were 10× longer (40 km), how would ΔL change for the same GW? How would sensitivity change?" Probes whether the learner understands h = ΔL/L and why longer arms help.

**Delayed retrieval:** Return at day 7: "Name the three things GW150914 directly confirmed about general relativity. Name the two things GW170817 confirmed about astrophysics."

---

## Section 12 — Recovery Notes

**S0 — Below floor:** Learner doesn't understand spacetime curvature or the event horizon. Return to phys.astro.black-holes before this blueprint.

**S3 — Partial understanding:** Knows GWs exist and were detected but cannot explain strain, polarization, or quadrupole formula. Intervention: Demo 2 (strain calculation) and Demo 1 (chirp signal identification) as structured exercises.

**S6 — Misconception detected:** MC-3 (h ∝ 1/r²). Intervention: energy conservation argument → I ∝ 1/r² → I ∝ h² → h ∝ 1/r.

**S9 — Near mastery:** Understands GW physics but not multi-messenger connections (GW170817). Intervention: walk through the complete GW170817 event: GW arrival, GRB 1.7 s later, kilonova over days-weeks, radio afterglow months later — the full multi-messenger picture.

---

## Section 13 — Memory & Review

**Memory type:** Event-based (GW150914, GW170817 numbers and what they confirmed) + conceptual (quadrupole radiation, chirp signal, LIGO operating principle) + formula (h = ΔL/L, h ∝ 1/r, quadrupole power formula).

**Spaced retrieval schedule:** Day 1 (definition of strain; h = ΔL/L calculation; what GW150914 detected), Day 3 (why no GW dipole; quadrupole formula; chirp signal phases), Day 7 (GW170817 multi-messenger summary; LISA target band; future detectors), Day 21 (connect to cosmology: stochastic GW background from early universe; PTA results 2023).

**Interleaving partners:** phys.astro.black-holes (BH mergers are the primary GW source; Schwarzschild geometry describes the final BH ringdown), phys.rel.spacetime (GWs are perturbations of the flat spacetime metric η_μν → h_μν), phys.em.electromagnetic-waves (EM radiation analogy: same 1/r fall-off for amplitude, same transverse waves, same speed c — but GW are quadrupole and tensor).

---

## Section 14 — Transfer Map

**Near transfer:** Binary pulsar orbital decay (indirect GW detection, Nobel 1993); LIGO detector noise budget; sky localization from multiple detectors.

**Far transfer:** Primordial gravitational waves from inflation — if detected by CMB B-mode polarization, would confirm the inflationary epoch. Stochastic GW background from first-order phase transitions in the early universe (LISA target). Pulsar timing arrays (nanohertz GW from supermassive BH binary population — announced 2023 by NANOGrav and others).

**Structural abstraction:** Gravitational waves are the radiation field of gravity, exactly analogous to electromagnetic radiation being the radiation field of electromagnetism. The structural parallel: monopole (static field ∝ 1/r²) + dipole radiation (EM has it, GW doesn't — different symmetry) + quadrupole radiation (both have it). This pattern — radiation from the lowest non-vanishing multipole — is universal in wave physics, from EM to GW to phonons in crystals.

---

## Section 15 — Curriculum Feedback

**Dependency check:** phys.astro.black-holes is the immediate prerequisite (BH mergers are the detection paradigm; Schwarzschild geometry underpins BH ring-down). phys.rel.spacetime provides the metric perturbation framework h_μν.

**Common pacing error:** Jumping to the LIGO detection numbers without establishing what strain means (h = ΔL/L). Learners who don't know what LIGO measured cannot appreciate why the sensitivity is remarkable or what it means scientifically.

**Assessment gap:** Most curricula discuss GW150914 qualitatively but rarely ask learners to: (1) compute ΔL from h; (2) explain why there is no GW dipole radiation; (3) describe the three phases of a BH merger chirp signal.

**Suggested pairing:** This is the final blueprint in the physics knowledge graph. Pair with a capstone review connecting: general relativity (phys.rel.spacetime) → black holes (phys.astro.black-holes) → gravitational waves (this blueprint) → multi-messenger astronomy (GW170817 + EM) → cosmology (phys.astro.cosmology) to show the arc from spacetime geometry to the observable universe.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

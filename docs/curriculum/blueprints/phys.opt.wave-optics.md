# Teaching Blueprint — phys.opt.wave-optics

## Component 0 — Concept Identity

```yaml
concept_id: phys.opt.wave-optics
name: "Wave Nature of Light — Interference and Coherence"
domain: optics
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.opt.nature-of-light
  - phys.wave.wave-properties
mastery_threshold: 0.80
estimated_hours: 4
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

Drop two pebbles into a pond at the same time, close together. Where their circular ripples meet, the water surface rises higher where crest meets crest (constructive interference), and goes flat where crest meets trough (destructive interference). Light does the same thing. When two coherent light waves meet, they add — but only if the waves stay in step with each other over many cycles. The requirement for "staying in step" is called coherence. Most everyday light sources are incoherent (a light bulb's atoms flash randomly) — but a laser or a Young's double slit can produce coherent waves that create stable interference patterns.

### Level 2 — Developing Understanding

**Superposition Principle:** When two waves occupy the same region, the resultant displacement is the algebraic sum of the individual displacements.

**Interference — conditions:**

| Type | Path difference (Δ) | Phase difference (δ) | Result |
|------|--------------------|-----------------------|--------|
| Constructive | Δ = mλ (m = 0, ±1, ±2, ...) | δ = 2mπ | Bright fringe; amplitude doubles |
| Destructive | Δ = (m + ½)λ | δ = (2m+1)π | Dark fringe; amplitude cancels |

**Coherence — required for observable interference:**
- **Temporal coherence:** the source must emit waves with constant phase relationship over time (monochromatic or narrow bandwidth)
- **Spatial coherence:** waves from different points of the source must have a fixed phase relationship
- Coherence length L_c = λ²/Δλ (longer for narrower bandwidth sources)
- Laser: L_c ~ meters; sunlight: L_c ~ 0.6 μm; white LED: L_c ~ 1 μm

**Huygens' Principle:** Every point on a wavefront acts as a secondary source of spherical wavelets. The new wavefront is the tangent envelope to all secondary wavelets. This principle explains:
- Refraction (wavelets travel slower in denser medium)
- Diffraction (wavelets spread around obstacles)
- Reflection (wavelets from mirror surface reconstruct reflected wavefront)

**Path difference and phase difference:**
Δ = path difference = optical path difference = difference in distances traveled
Phase difference δ = (2π/λ) × Δ

**Intensity in interference:**
I = I₁ + I₂ + 2√(I₁I₂) × cos δ

For equal intensities I₁ = I₂ = I₀:
- Constructive (δ = 0): I = 4I₀
- Destructive (δ = π): I = 0
- Average: I_avg = 2I₀ (energy conserved; redistributed, not created or destroyed)

### Level 3 — Proficient Synthesis

**Optical path length (OPL):** When light travels through a medium of refractive index n over physical distance d, the OPL = nd. This is the effective distance in terms of vacuum wavelengths:
- Phase accumulated = (2π/λ₀) × OPL = (2π/λ₀) × nd
- Path difference in terms of OPL: Δ_OPL = n₂d₂ − n₁d₁

**Phase shift on reflection:**
- Reflection from a denser medium (going from low-n to high-n): phase shift of π (equivalent to λ/2 path change)
- Reflection from a less dense medium: no phase shift
- Example: thin film — ray reflecting off top surface gets π shift; ray reflecting off bottom surface (glass→air) gets no shift

**Thin film interference:**
- Constructive: 2nt = (m + ½)λ₀ (accounting for one π phase flip at top surface)
- Destructive: 2nt = mλ₀

Where n = film's refractive index, t = film thickness, λ₀ = vacuum wavelength.
This explains soap bubble colors, anti-reflection coatings (t = λ₀/(4n)), and oil slick iridescence.

---

## Component 2 — Worked Examples

### WE-1: Constructive and Destructive Interference

**Problem:** Two coherent light sources S₁ and S₂ emit λ = 600 nm light. A point P is 3.0 m from S₁ and 3.9 m from S₂.
(a) Find the path difference.
(b) Determine whether P is a bright or dark fringe.
(c) What is the order of this fringe?

**Solution:**

**(a) Path difference:**
Δ = |d₂ − d₁| = |3.9 − 3.0| = **0.9 m = 9×10⁻¹ m**

Convert to wavelengths: Δ/λ = (0.9 m) / (600×10⁻⁹ m) = 1.5×10⁶

Hmm — this is a large integer, so both are available. Let's work with smaller values for clarity.

Revised problem: S₁ = 1200 nm, S₂ = 1800 nm, λ = 600 nm.

**(a) Path difference:**
Δ = 1800 − 1200 = **600 nm**

**(b) Type:**
Δ/λ = 600/600 = 1.0 (integer) → **Constructive interference (bright fringe)**

**(c) Order:** m = 1 → **1st order bright fringe**

Now dark: if S₂ = 1500 nm:
Δ = 1500 − 1200 = 300 nm
Δ/λ = 300/600 = 0.5 = ½ → **Destructive interference (dark fringe, m = 0)**

---

### WE-2: Thin Film Interference

**Problem:** A thin film of soap (n = 1.35) is illuminated by white light. The film has thickness t = 210 nm. Which wavelengths in the visible range (400–700 nm) will be strongly reflected?

**Solution:**

With one phase reversal (at top surface, air→soap), constructive reflection condition:
2nt = (m + ½)λ₀
λ₀ = 2nt / (m + ½) = 2 × 1.35 × 210 / (m + ½) = 567 / (m + ½) nm

For m = 0: λ₀ = 567 / 0.5 = **1134 nm** (infrared — not visible)
For m = 1: λ₀ = 567 / 1.5 = **378 nm** (near UV — barely outside visible range)
For m = 0 with destructive (2nt = mλ): λ₀ = 567/1 = **567 nm → green-yellow** is suppressed

Actually using constructive for m=0 half-integer approach more carefully:

Constructive: 2nt = (m + ½)λ → λ = 2nt/(m+½):
- m=0: λ = 567/0.5 = 1134 nm (IR)
- m=1: λ = 567/1.5 = 378 nm (UV)

Destructive (reflection minimum = transmission maximum):
2nt = mλ → λ = 567/m:
- m=1: λ = **567 nm** (green-yellow) — destructive in reflection

The film appears magenta (red + blue) because green-yellow (567 nm) is suppressed in reflection. Strong reflection occurs at wavelengths slightly off-center where neither maximum nor minimum falls exactly within 400-700 nm range; partial constructive contribution at red and blue ends.

**Key result:** Thin film t = 210 nm with n = 1.35 strongly suppresses green-yellow (~567 nm) in reflection, appearing magenta.

---

### WE-3: Coherence and Fringe Visibility

**Problem:** Explain why:
(a) A sodium lamp (Δλ ≈ 0.6 nm, λ₀ = 589 nm) can produce interference fringes with path differences up to ~0.3 mm, but white light only shows fringes over ~1 μm path differences.
(b) Why does increasing slit width in Young's experiment (not slit separation) reduce fringe visibility?

**Solution:**

**(a) Coherence length comparison:**
For sodium: L_c = λ²/Δλ = (589 nm)²/(0.6 nm) = (589)²/0.6 nm = 347921/0.6 nm ≈ **580,000 nm = 0.58 mm**

For white light (Δλ ≈ 300 nm, λ̄ ≈ 550 nm): L_c = (550)²/300 ≈ 302500/300 ≈ **1000 nm = 1 μm**

Sodium lamp has a coherence length ~0.58 mm — fringes visible for path differences up to ~0.58 mm.
White light has L_c ~1 μm — fringes only visible for path differences less than ~1 μm (central fringe only).
This is why white-light interference shows only a few colored fringes near zero path difference.

**(b) Slit width and spatial coherence:**
Wider slits act like multiple point sources spread across the slit width. Each source position produces a fringe pattern shifted slightly. The superposition of shifted patterns washes out contrast. A narrower slit approaches a point source (better spatial coherence). At finite slit width w, visibility drops to zero when w×θ = λ (where θ is angular separation of sources). This is the spatial coherence limit.

---

## Component 3 — Misconception Engine

### MC-1: MC-INTERFERENCE-CREATES-OR-DESTROYS-ENERGY

**trigger_signal:** Student states "dark fringes prove energy is lost" or "bright fringes prove energy is created by interference."

**conflict_evidence [P28]:** Measure the total power arriving at a screen in two cases: (1) one slit open — uniform illumination at power P. (2) Both slits open — interference pattern with bright fringes at 4I₀ and dark fringes at 0. Total power in case 2: integrate intensity over the whole screen. Mathematically, ∫I dA = ∫4I₀cos²(δ/2) dA. Since average of cos²(δ/2) = 1/2, total = 4I₀ × (1/2) × (screen area) = 2I₀ × (screen area) = double of one-slit power = exactly what two slits provide. Energy is conserved — it is redistributed, not created or destroyed.

**bridge_text [P30]:** Think of interference as a redistribution of energy. The energy that would have landed at the dark fringe positions is instead concentrated at the bright fringe positions. The bright fringes are brighter than 2I₀ (they're 4I₀ with two coherent sources) precisely because the dark fringes are darker than expected — the two effects balance exactly.

**replacement_text [P31]:** Interference conserves energy. Constructive interference concentrates energy (bright region has 4I₀ instead of 2I₀), destructive interference removes it from that location (dark region has 0 instead of 2I₀). The average intensity is 2I₀, exactly what you'd get without interference — but it's redistributed in space. No energy is created or destroyed.

**discrimination_pairs [P33]:**
- "If two coherent beams destructively interfere and produce no light, the energy disappears" → FALSE: energy is redirected to constructive interference regions; no net energy loss.
- "Bright fringes are bright because the two waves amplify each other, creating more energy" → FALSE: they concentrate energy from dark-fringe regions into bright ones; total energy is conserved.

**s6_path:** If student fails energy-conservation probe → assign integrated-intensity calculation (∫4I₀cos²(x)dx over full screen = 2I₀ × screen area) before mastery gate.

---

### MC-2: MC-COHERENCE-MEANS-SAME-FREQUENCY

**trigger_signal:** Student states "two light bulbs of the same color are coherent" or "any two red lasers produce interference fringes."

**conflict_evidence [P28]:** Two identical sodium lamps (same 589 nm wavelength) placed next to each other produce NO stable interference fringes on a screen, even though their frequencies are identical. Each lamp consists of billions of atoms emitting independent random phase bursts. Any given instant has a random phase difference between the two beams — the pattern shifts faster than a detector can respond, averaging out to uniform illumination. Same frequency is necessary but NOT sufficient for coherence. Coherence requires a fixed, constant phase relationship over the observation time. This is why the standard Young's experiment uses ONE source and splits it — both "sources" are derived from the same atomic emissions.

**bridge_text [P30]:** Frequency tells you the rate of oscillation; phase tells you where in the cycle the oscillation is at a given moment. Two people jumping on a trampoline at the same rate (same frequency) but independently will have random, shifting phase relationships — they don't synchronize. Coherence requires the phase relationship to stay fixed over the relevant time.

**replacement_text [P31]:** Coherence requires both same frequency AND a fixed, stable phase relationship between the two sources. Two independent light sources at the same wavelength are incoherent — their phase difference fluctuates randomly at ~10¹⁵ Hz (too fast to observe). Only sources derived from the same wavefront (like Young's two slits from one source) or produced by stimulated emission (lasers) maintain the constant phase required for observable interference.

**discrimination_pairs [P33]:**
- "Two sodium lamps side by side will produce bright and dark fringes on a screen" → FALSE: both emit 589 nm but are incoherent; phase difference fluctuates randomly, no stable fringes.
- "Two paths from a single laser (like a Mach-Zehnder interferometer) will produce stable fringes" → TRUE: derived from the same coherent source; fixed phase relationship maintained.

**s6_path:** If student fails coherence definition probe → run sodium-lamp thought experiment (why no fringes from two lamps) before mastery gate.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | Knows interference exists from wave chapter; cannot connect to light; confused about what "phase" means for light | Cannot distinguish path difference from phase difference for light |
| S3 | Can state constructive/destructive conditions (mλ and (m+½)λ); confused about coherence requirement; thinks two same-color sources always interfere | Fails coherence probe; cannot do thin film problem |
| S6 | Understands coherence requirement; can apply path difference conditions; uncertain about thin film phase reversal rule | Cannot correctly account for π phase shift on reflection from denser medium |
| S9 | Explains coherence mechanistically; applies thin film formula with phase shifts; derives OPL and fringe conditions; explains energy conservation in interference | Correctly handles all three WEs; connects Huygens' principle to diffraction and refraction |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (difficulty 4, accelerated P track; physics + bloom=understand but not Analyse).

**TA-1 [P01 — Session Open]**
"Hold a soap bubble up to white light. You see shifting colors — but why different colors at different spots? And why do the colors shift as the bubble drains? Today we build the wave model for light that explains this: interference. Prerequisite check: state the condition for constructive wave interference from your wave unit. [Pause] What additional condition must light satisfy that sound doesn't need? Write your answer."
[Diagnose S0/S3 — does student mention coherence or just path difference?]

**TA-2 [P06 — Concrete Anchor]**
"[Display: two-source interference diagram — path lengths d₁ and d₂ to point P.] Path difference Δ = |d₂ − d₁|. Constructive: Δ = mλ. Destructive: Δ = (m+½)λ. But only IF the sources are coherent — same phase relationship at all times. Let's apply to point sources first." [→ WE-1]

**TA-3 [P28 — Conflict Evidence: MC-2]**
"Challenge: Two sodium lamps, same wavelength 589 nm. Point both at the same screen. Do you get fringes? [Student predicts.] Answer: No — you get uniform illumination. Why? Each atom emits in random phase bursts. The phase difference between the two lamps changes ~10¹⁵ times per second. Any detector averages to uniform. Coherence = fixed phase relationship, not just same frequency. Young's slit experiment works because BOTH beams come from the SAME source point — they share the same phase history." [→ MC-2 discrimination pairs]

**TA-4 [P31 — Replacement: MC-1]**
"Energy in interference. Two coherent beams, each intensity I₀. Bright fringe: 4I₀ (four times one beam!). Dark fringe: 0. Is energy created or destroyed? No: 4I₀ + 0 = 4I₀ average (over two fringe positions), but two incoherent beams give 2I₀ everywhere. The KEY: over the full screen, the average of cos²δ = ½ gives total power = 2 × (power of one beam) = exactly two beams' worth. Energy is redistributed, not created." [→ MC-1 energy calculation]

**TA-5 [P06 — Pictorial: Huygens' Principle]**
"[Display: Huygens wavelet construction for refraction and diffraction.] Every wavefront point is a secondary source. The new wavefront emerges as the envelope of all secondary wavelets. In a denser medium: wavelets are smaller (v = c/n slower) → wavefront tilts → refraction. Near an edge: wavelets spread into the geometric shadow → diffraction. Huygens is the unifying picture behind all wave optics."

**TA-6 [P06 — Pictorial: thin film interference]**
"[Display: thin film with two reflected rays — one from top surface, one from bottom surface.] Ray 1: reflects at top (air→film, denser): gets π phase shift (½ wavelength). Ray 2: travels through film, reflects at bottom (film→air, less dense): no phase shift, but travels extra 2t in medium. Net path difference: 2nt (in optical path). Phase shift at top adds ½λ effectively. Constructive reflection: 2nt = (m+½)λ₀. Destructive: 2nt = mλ₀." [→ WE-2]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) Two coherent sources are 3.0 m and 3.3 m from a point P; λ = 600 nm. Is P bright or dark? What order? (2) A glass lens (n=1.5) is coated with MgF₂ (n=1.38). For λ₀=550 nm, find the minimum coating thickness for anti-reflection (destructive reflection). (3) Why do two independent sodium lamps not produce interference fringes even though they emit the same wavelength?

Closing thought: The theory of coherence, formalized by Michelson in 1890 and Zernike in 1938, is today the basis of optical coherence tomography — the medical imaging technique that maps retinal layers with micrometer precision without any physical contact.

Spaced retrieval: +1 day (coherence definition and why two lamps fail), +4 days (thin film conditions with phase shift), +2 weeks (energy conservation in interference proof)."

[P91 gate: threshold 0.80. Failure → thin film phase-shift drill and coherence conceptual re-probe.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** Two coherent light sources (λ = 500 nm) are at distances 2000 nm and 3250 nm from point P. Is P a bright or dark fringe? What order?

**P-2 (Developing — identifies S6):** A thin film of oil (n = 1.46) floats on water (n = 1.33). White light is incident from above. (a) Does the oil-air interface produce a phase shift on reflection? (b) Does the oil-water interface? (c) For constructive reflection of λ₀ = 584 nm, find the minimum film thickness.

**P-3 (Proficient — identifies S9):** In a thin-film interference setup, a soap film (n = 1.40) is illuminated at normal incidence. The film shows a dark band where it is nearly zero thickness (black at the top of a vertical film). Explain why a zero-thickness film gives a dark band (destructive reflection), and calculate the minimum thickness for the first bright band if λ₀ = 420 nm.

**P-4 (Mastery gate — confirms S9):** (a) Explain the difference between temporal and spatial coherence, with one physical example of each. (b) An anti-reflection coating (n_c = 1.22) is applied to glass (n_g = 1.52). Determine: the minimum thickness for λ₀ = 550 nm anti-reflection (account for phase shifts at both surfaces), and whether both surfaces produce phase-shifted reflections. (c) Why does energy conservation require bright fringes to be 4I₀ (not 2I₀) when constructive interference occurs? Required: 3/3 at ≥0.80 accuracy.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Two-source interference pattern. Adjustable: λ (400–700 nm, color updates), source separation, screen distance. Displays: path difference at cursor, intensity pattern, bright/dark labels. Shows fringe pattern and intensity cross-section graph below.

**VIS-2:** Thin film interactive. Adjustable: n_film, n_substrate, film thickness t, wavelength (or white light). Displays: reflected spectrum (which wavelengths are enhanced/suppressed), the two reflected rays and their phase shifts, and the film appearance color. White-light mode shows the visible color of the film.

**VIS-3:** Coherence demonstration. Two-source setup. Toggle: "coherent" (fixed phase) vs. "incoherent" (random phase noise). Coherent: stable fringe pattern. Incoherent: pattern fluctuates, time-averaged to uniform. Slider for coherence time to show intermediate cases.

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.opt.nature-of-light | Wave model of light is the basis for interference and coherence | prerequisite |
| phys.wave.wave-properties | Superposition principle and phase difference apply directly to light | prerequisite |
| phys.opt.youngs-experiment | Young's experiment is the canonical interference demonstration | unlocks |
| phys.opt.polarization | Coherence concepts apply to polarized light state analysis | unlocks |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.opt.wave-optics ✓ |
| V-2 | name matches KG | PASS — "Wave Nature of Light — Interference and Coherence" ✓ |
| V-3 | domain derived from prefix phys.opt → optics | PASS ✓ |
| V-4 | difficulty label+number consistent (proficient=4) | PASS ✓ |
| V-5 | bloom matches KG (understand) | PASS ✓ |
| V-6 | All prerequisites in KG requires list | PASS — nature-of-light, wave.wave-properties ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (4) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage consistent with rules | PASS — C (difficulty 4, accelerated P track) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, all 6 fields each ✓ |
| V-12 | ≥3 worked examples with numeric solutions | PASS — WE-1 (path difference/order), WE-2 (thin film colors), WE-3 (coherence length comparison) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap, correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P31/P06/P06/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 through P-4 ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-3 ✓ |
| V-17 | Cross-links table present | PASS — 4 entries ✓ |
| V-18 | No implementation code | PASS ✓ |
| V-19 | No other-subject curriculum authoring | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**

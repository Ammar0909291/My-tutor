# Teaching Blueprint — phys.opt.nature-of-light

## Component 0 — Concept Identity

```yaml
concept_id: phys.opt.nature-of-light
name: "Nature of Light: Ray and Wave Models"
domain: optics
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.wave.wave-properties
mastery_threshold: 0.80
estimated_hours: 3
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "P (perceptual bridge entry; concrete optional)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

Drop a pebble in a pond and ripples spread outward in all directions — that is wave behavior. Fire a bullet and it travels in a straight line, hits a target, and transfers all its energy in one point — that is particle behavior. For three centuries, scientists debated which of these pictures describes light. The astonishing answer, arrived at through experiments in the 19th and 20th centuries, is: light is **both**, depending on which experiment you run.

When light passes through two narrow slits and creates alternating bright and dark bands on a screen, it is behaving as a wave — the two paths interfere. When light strikes a metal surface and ejects electrons only if its frequency is above a sharp threshold (regardless of how bright it is), it is behaving as a stream of particles called **photons**. This is the **dual nature of light** — one of the deepest and most non-intuitive discoveries in physics.

### Level 2 — Developing Understanding

**Wave properties of light in vacuum:**
- Speed: c = 3×10⁸ m/s (exact: 299,792,458 m/s)
- Wave relationship: c = f × λ → f = c/λ
- Visible spectrum: λ ≈ 400 nm (violet) to 700 nm (red)
- Corresponding frequency range: f ≈ 4.3×10¹⁴ Hz (red) to 7.5×10¹⁴ Hz (violet)

**Photon (particle) properties:**
- Each photon carries energy: E = hf = hc/λ
- Planck's constant: h = 6.626×10⁻³⁴ J·s
- Higher frequency (shorter wavelength) → more energy per photon
- Intensity = (energy per photon) × (photon flux) = hf × (n/A) — increasing brightness increases photon count, not photon energy

**Speed of light in a medium:**
- v = c/n, where n ≥ 1 is the refractive index of the medium
- n = 1 for vacuum; n ≈ 1.0003 for air; n ≈ 1.5 for glass; n ≈ 1.33 for water
- Entering a medium: speed decreases, wavelength shortens (λ_medium = λ₀/n), frequency unchanged
- Frequency is invariant because the source sets it; wave crests cannot pile up at a boundary

**Historical models timeline:**

| Period | Model | Key figure | Core idea | Key evidence |
|--------|-------|------------|-----------|--------------|
| 1670s | Corpuscular | Newton | Light = stream of particles traveling in straight lines | Explains sharp shadows, reflection geometrically |
| 1678 | Wave (mechanical) | Huygens | Light = waves in a mechanical aether; wavefronts propagate | Explains refraction via Huygens' principle |
| 1865 | Electromagnetic | Maxwell | Light = coupled E and B field oscillations; c = 1/√(μ₀ε₀) | Unified electricity, magnetism, and optics |
| 1905 | Photon (quantum) | Einstein | Light = discrete quanta of energy E = hf | Explains photoelectric effect threshold |

### Level 3 — Proficient Synthesis

**Wave evidence — Young's Double-Slit Experiment (1801):**

Thomas Young directed coherent light through two narrow slits separated by distance d. On a screen at distance L, an interference pattern appeared: equally-spaced bright fringes (constructive interference, path difference = mλ) alternating with dark fringes (destructive interference, path difference = (m + ½)λ). Fringe spacing: Δy = λL/d.

A particle model cannot produce this pattern — particles would form exactly two bright spots, not many fringes. The interference pattern requires that light from the two slits can reinforce or cancel, which is only possible if light has a wavelength and phase. This experiment is definitive wave evidence.

**Particle evidence — Photoelectric Effect (1887/1905):**

When light strikes a metal surface, electrons can be ejected. Classical wave theory predictions (all contradicted by experiment):
- Any frequency, if bright enough, should eventually eject electrons → WRONG: below threshold frequency f₀, NO electrons at all
- Brighter waves → faster electrons → WRONG: intensity affects electron count, not kinetic energy
- Low intensity should cause a time delay before ejection → WRONG: electrons appear immediately above f₀

Observed facts:
- Threshold frequency f₀ is metal-specific (depends on work function φ = hf₀)
- Below f₀: zero electrons regardless of intensity
- Above f₀: electrons ejected immediately; KE_max = hf − φ
- Above f₀: more intensity → more electrons, but each electron's KE_max is unchanged

Einstein's 1905 explanation: light arrives as individual photons of energy E = hf. One photon ejects one electron. If hf < φ, the photon lacks the energy to free the electron — no matter how many such photons arrive. Above threshold, the excess energy appears as kinetic energy: KE_max = hf − φ.

**Dual nature synthesis:**

Neither wave nor particle is the complete description. Light exhibits wave behavior in experiments probing its spatial coherence over many wavelengths (interference, diffraction, polarization). Light exhibits particle behavior in experiments probing individual energy-exchange events (photoelectric effect, Compton scattering). Both descriptions are simultaneously valid; which appears depends on the experimental setup. This complementarity is a fundamental feature of quantum physics, not a gap in understanding.

---

## Component 2 — Worked Examples

### WE-1: Photon Energy for Red and Blue Light

**Problem:** Calculate the photon energy for:
(a) Red light: λ = 700 nm
(b) Blue light: λ = 400 nm
(c) Show which color has more energy per photon and explain the ratio.

**Solution:**

Given: h = 6.626×10⁻³⁴ J·s, c = 3.00×10⁸ m/s, 1 eV = 1.6×10⁻¹⁹ J

**(a) Red light (λ = 700 nm = 7.00×10⁻⁷ m):**

E_red = hc/λ = (6.626×10⁻³⁴ × 3.00×10⁸) / (7.00×10⁻⁷)

= (1.988×10⁻²⁵) / (7.00×10⁻⁷)

= **2.84×10⁻¹⁹ J**

In eV: 2.84×10⁻¹⁹ / 1.6×10⁻¹⁹ = **1.77 eV**

**(b) Blue light (λ = 400 nm = 4.00×10⁻⁷ m):**

E_blue = hc/λ = (6.626×10⁻³⁴ × 3.00×10⁸) / (4.00×10⁻⁷)

= (1.988×10⁻²⁵) / (4.00×10⁻⁷)

= **4.97×10⁻¹⁹ J**

In eV: 4.97×10⁻¹⁹ / 1.6×10⁻¹⁹ = **3.11 eV**

**(c) Comparison:**

E_blue / E_red = λ_red / λ_blue = 700 / 400 = **1.75**

Blue photons carry 75% more energy than red photons. Since E = hc/λ, energy is inversely proportional to wavelength (equivalently, directly proportional to frequency). Shorter wavelength → higher frequency → higher energy per photon. This is why UV light (shorter λ than blue) causes sunburn by breaking chemical bonds, while infrared (longer λ than red) does not.

---

### WE-2: Wavelength from Photon Energy in eV

**Problem:** A photon has energy E = 3.1 eV. Find its wavelength and identify the region of the EM spectrum.

**Solution:**

**Step 1 — Convert energy to joules:**

E = 3.1 eV × 1.6×10⁻¹⁹ J/eV = 4.96×10⁻¹⁹ J

**Step 2 — Apply E = hc/λ → λ = hc/E:**

λ = (6.626×10⁻³⁴ × 3.00×10⁸) / (4.96×10⁻¹⁹)

= (1.988×10⁻²⁵) / (4.96×10⁻¹⁹)

= **4.00×10⁻⁷ m = 400 nm**

**Spectrum identification:** λ = 400 nm lies at the violet end of the visible spectrum (visible range: 400–700 nm). This photon sits at the boundary between visible violet and near-ultraviolet.

**Cross-check using frequency:**

f = E/h = (4.96×10⁻¹⁹) / (6.626×10⁻³⁴) = 7.49×10¹⁴ Hz

λ = c/f = (3.00×10⁸) / (7.49×10¹⁴) = 4.01×10⁻⁷ m ≈ 400 nm ✓

---

### WE-3: Light Entering Glass — Frequency Invariance

**Problem:** Yellow light (λ₀ = 589 nm in vacuum) enters a glass block with refractive index n = 1.50.
(a) Find the speed of light in glass.
(b) Find the wavelength in glass.
(c) Find the frequency in vacuum and in glass.
(d) Explain physically why frequency is invariant but wavelength is not.

**Solution:**

**(a) Speed in glass:**

v = c/n = (3.00×10⁸) / 1.50 = **2.00×10⁸ m/s**

Light slows to two-thirds of its vacuum speed inside the glass.

**(b) Wavelength in glass:**

λ_glass = λ₀/n = 589 / 1.50 = **393 nm**

Alternatively: λ_glass = v/f = v × (λ₀/c) = λ₀ × (v/c) = λ₀/n ✓

**(c) Frequency:**

In vacuum: f = c/λ₀ = (3.00×10⁸) / (589×10⁻⁹) = **5.09×10¹⁴ Hz**

In glass: f = v/λ_glass = (2.00×10⁸) / (393×10⁻⁹) = 5.09×10¹⁴ Hz

**Frequency is identical in both media.** ✓

**(d) Physical explanation:**

Frequency is determined by the source (the oscillating atoms emitting the light) and cannot change at a boundary. Wave crests arrive at the vacuum–glass interface at a fixed rate set by the source; they must leave at the same rate — if they did not, crests would accumulate at the boundary, which is physically impossible. Since f is fixed and v = c/n decreases inside the glass, wavelength must decrease by the same factor n to keep v = fλ consistent: λ_glass = v/f = (c/n)/f = λ₀/n. The photon energy E = hf also remains unchanged across the boundary (energy is conserved at each refraction event).

---

## Component 3 — Misconception Engine

### MC-1: MC-LIGHT-IS-PURELY-A-WAVE

**trigger_signal:** Student states "light is just an EM wave" or holds that the wave model fully explains all light phenomena; cannot explain why below the threshold frequency no electrons are ejected regardless of light intensity.

**conflict_evidence [P28]:** Classical wave theory makes a clear prediction: any frequency of light, given sufficient intensity, should eventually deliver enough energy to eject electrons from a metal surface — because a brighter wave carries more energy per unit area per second. Test this prediction directly: shine intense red light (λ = 700 nm, I = 1000 W/m²) on sodium metal (work function φ ≈ 2.3 eV). Zero electrons. Not slow ones, not delayed ones — none, even after minutes. Now switch to dim ultraviolet light (λ = 200 nm) at a tiny fraction of that intensity: electrons appear immediately and copiously. The energy per unit area per second (intensity) is irrelevant. What matters is the frequency of each individual quantum. Classical wave theory has no mechanism to explain a sharp frequency threshold — it predicts that enough brightness always wins. The observation proves it wrong.

**bridge_text [P30]:** Wave-particle duality is not physics failing to decide what light is. It is the fundamental quantum nature of the entity: which behavior appears depends on what the experiment measures. Interference and diffraction probe spatial coherence across many cycles — wave behavior appears. The photoelectric effect probes the transfer of energy from a single quantum to a single electron — particle behavior appears. Both descriptions are simultaneously true. Neither is the "real" one.

**replacement_text [P31]:** Light exhibits wave behavior in experiments that probe its spatial extent over many wavelengths (double-slit interference, diffraction, polarization). Light exhibits particle behavior in experiments that probe individual energy-exchange events (photoelectric effect, Compton scattering). The complete description — wave-particle duality — requires both. Either model alone is incomplete.

**discrimination_pairs [P33]:**
- "Light passes through two slits and creates an interference pattern → it is a wave" → TRUE but incomplete: this shows wave behavior; particle model cannot explain fringe spacing
- "Light below threshold frequency never ejects electrons regardless of intensity → it must consist of discrete energy quanta" → TRUE: this is the defining particle evidence
- "Shine very bright red light on zinc long enough → eventually electrons will be ejected" → FALSE: photon energy E = hf_red is fixed and below zinc's work function; more photons cannot change individual photon energy
- "Blue light ejects electrons from a metal more energetically than red light of equal intensity" → TRUE: E_blue = hf_blue > E_red = hf_red; each blue photon has more energy to share with the electron

**s6_path:** If student is anxious at quantum duality → do NOT begin with the conflict. Instead pose a pure observation: "Here is what happens in the lab — shine UV on zinc and an ammeter deflects. Shine bright red, no deflection. Describe only what you see. What could explain why frequency matters but brightness does not?" Build the threshold observation before naming duality; the student arrives at the particle picture through curiosity rather than confrontation.

---

### MC-2: MC-PHOTON-ENERGY-DEPENDS-ON-INTENSITY

**trigger_signal:** Student says "brighter light = higher energy photons," claims increasing brightness increases the energy of individual photons, or uses intensity as a proxy for photon energy in threshold calculations.

**conflict_evidence [P28]:** Consider two light sources: Source A emits 10⁶ photons per second of red light (λ = 700 nm, f = 4.3×10¹⁴ Hz); Source B emits 1 photon per second of ultraviolet light (λ = 200 nm, f = 1.5×10¹⁵ Hz). Source A is one million times more intense, yet each of its photons carries E_A = hf_red = 2.84×10⁻¹⁹ J ≈ 1.77 eV, while Source B's single photon carries E_B = hf_UV = 9.93×10⁻¹⁹ J ≈ 6.21 eV. Shine Source A on zinc (φ = 3.5 eV): no electrons — each individual photon is too weak. Shine Source B: one electron ejected per second with KE_max = 6.21 − 3.5 = 2.71 eV. Intensity (brightness) is irrelevant to what each photon can do; only frequency matters.

**bridge_text [P30]:** Intensity and photon energy are two entirely independent quantities. Intensity (W/m²) = (energy per photon) × (photon flux per unit area) = hf × (n/A). A beam can be intense because it has many low-energy photons (high n/A, low f), or it can be dim but carry high-energy photons (low n/A, high f). These properties do not constrain each other.

**replacement_text [P31]:** Photon energy E = hf depends ONLY on frequency (equivalently, on color or wavelength: E = hc/λ). Changing the brightness of a source changes the number of photons emitted per second — it does not change the energy of each individual photon. To change photon energy, change the frequency: use a different color, or a source operating at a different frequency.

**discrimination_pairs [P33]:**
- "Double the brightness of a green laser → each photon now has twice the energy" → FALSE: doubling brightness doubles photon count; each photon still has E = hf_green, unchanged
- "Switch from red to blue light at the same total power → each photon has more energy, but fewer photons are emitted per second" → TRUE: E_blue > E_red; if total power P = N × hf is constant, more energy per photon means fewer photons
- "A bright red beam can eject electrons from copper (φ = 4.7 eV) if it is intense enough" → FALSE: E_red ≈ 1.77 eV < 4.7 eV; no individual photon can overcome the work function regardless of how many are present
- "A dim UV beam (few photons/second) ejects fewer electrons than a bright red beam, but each ejected electron has more kinetic energy" → TRUE: fewer events above threshold (dim UV) but each event imparts KE_max = hf_UV − φ > 0

**s6_path:** If student is anxious at the photon-count distinction → use a simple analogy before formulas: "A cinema full of children cannot lift a 200 kg barbell — their combined weight is irrelevant because no single child can lift it. One Olympic weightlifter can. The number in the room (intensity) doesn't help if no individual is strong enough (photon energy below threshold)." Then map: children = low-energy photons, weightlifter = high-energy photon, barbell = work function.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | No physical model of light; knows light "lets us see" and "travels fast" but cannot relate wave or photon concepts; may believe light is like a flashlight beam of undefined nature | Cannot complete f = c/λ; cannot explain why shadows are sharp or why prisms split light |
| S3 | Knows the wave model (c, f, λ relationships); can calculate f = c/λ; treats light as purely electromagnetic wave; has not encountered photon model; cannot explain photoelectric threshold | States "light is just an EM wave"; computes frequency correctly; applies no particle reasoning; confused by threshold frequency observation |
| S6 | Understands wave model and has heard of photons; anxious at the "both at once" framing; freezes when wave and particle descriptions conflict; may accept duality verbally but cannot apply it to a threshold problem | Says "I thought waves and particles were completely different — how can light be both?"; hesitates before photoelectric calculations; needs confirmation before proceeding |
| S9 | Fully applies dual-nature framing; computes E = hf and v = c/n fluently; selects the correct model (wave or photon) based on the experimental context; explains the threshold condition using E = hf vs. φ; knows historical sequence | Correctly applies KE_max = hf − φ; computes λ_medium = λ₀/n with frequency invariance; names Young's and photoelectric experiments as wave and particle evidence respectively |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: P (perceptual bridge; difficulty 4, bloom=understand).

**TA-1 [P01 — Session Open]**

"You flip a light switch and your room fills instantly — light traveled at 3×10⁸ m/s from the bulb to your eyes. But what IS that light, physically? Newton said: tiny particles streaming outward. Huygens said: waves, like ripples on a pond. Maxwell unified electricity and magnetism and proved light is an electromagnetic wave in 1865. Then in 1905, Einstein showed Maxwell was incomplete. Today we examine all the evidence, follow the historical argument, and arrive at the modern picture — which is stranger and more beautiful than any of the earlier models. Before we start: when you see a clean sharp shadow cast by a lamp, does that suggest wave or particle behavior to you?"

[Elicit response; diagnose S0 if student cannot engage with wave/particle distinction; S3 if student immediately invokes wave model; S6 if student hesitates or expresses uncertainty about the question itself.]

**TA-2 [P06 — Pictorial Anchor: EM spectrum and wave-model relationships]**

"[Display: EM spectrum with frequency axis running radio → microwave → IR → visible (400–700 nm color-coded) → UV → X-ray → gamma. Below: wavelength scale. Above: photon energy bar (E = hf) increasing left to right.]

All electromagnetic waves travel at c = 3×10⁸ m/s in vacuum and obey c = f × λ. Visible light is a narrow slice: 400 nm (violet) to 700 nm (red). Let's put numbers on the wave model before we challenge it.

Quick calculation: What is the frequency of red light at λ = 700 nm?
f = c/λ = (3×10⁸) / (700×10⁻⁹) = 4.29×10¹⁴ Hz.
And violet at 400 nm? f = 7.50×10¹⁴ Hz.
Notice: shorter wavelength → higher frequency. The photon energy bar above the spectrum runs in the same direction — we will use it shortly."

[S3 students complete this immediately. S0 students need to establish f = c/λ before moving on — spend one additional example here if needed.]

**TA-3 [P28 — Conflict Evidence: MC-1 gate]**

"[Display: photoelectric effect schematic — light source, metal plate, ammeter, voltage supply.]

Here is the experiment that broke the wave model. Shine light on a metal surface. If light is purely a wave delivering energy continuously, any frequency with enough brightness should eventually eject electrons. Let's test it.

Intense red light on sodium metal — no electrons. None. Increase brightness tenfold — still none. Now switch to dim ultraviolet — electrons appear immediately, at any intensity above zero.

The threshold is absolute: below a critical frequency f₀ (determined by the metal), no electrons are ejected regardless of brightness. Above f₀, electrons appear the instant light hits the surface.

This observation is impossible in a pure wave picture. Einstein's 1905 solution: light arrives as individual packets — photons — each carrying E = hf. A single photon must have enough energy (hf ≥ φ, the work function) to eject one electron. More photons per second (brighter light) means more electrons, but each photon's energy is fixed by its frequency. Below threshold, each photon is individually too weak — and no number of weak photons can do what one strong photon can."

[For S3 students, this is the primary challenge. For S6 students, deliver this slowly and invite questions after each observation; delay naming "photon" until the observation is fully established.]

**TA-4 [P51 — Check + P36 — Probe: photon energy and intensity decoupled]**

"Quick check before we calculate: I increase the brightness of a red laser from 1 mW to 1 kW. Does the energy of each individual photon change? [Elicit prediction. Correct answer: no — only the photon count changes.]

Now let's compute. For red light (λ = 700 nm):
E = hc/λ = (6.626×10⁻³⁴ × 3×10⁸) / (700×10⁻⁹) = 2.84×10⁻¹⁹ J = 1.77 eV

For blue light (λ = 400 nm):
E = hc/λ = (6.626×10⁻³⁴ × 3×10⁸) / (400×10⁻⁹) = 4.97×10⁻¹⁹ J = 3.11 eV

[→ WE-1 full walkthrough]

Probe: A zinc surface has work function φ = 3.5 eV. Will red light (1.77 eV) eject electrons? Will blue light (3.11 eV)? Will very bright red light? [Elicit. Correct: red — no regardless of brightness; blue — yes.]"

[P85 regulation_tail: "This is the central result: color determines photon energy; brightness determines photon count. Write down E = hf in your notes with the label 'color ↔ energy.' This is load-bearing for everything that follows."]

**TA-5 [P06 — Diagram: speed in medium and frequency invariance]**

"[Display: wavefront diagram split at a vacuum–glass interface. Left (vacuum): wavelength λ₀ = 589 nm, speed c, frequency f labeled. Right (glass, n = 1.5): wavefronts compressed, wavelength λ_glass = 393 nm, speed c/1.5 = 2×10⁸ m/s, same frequency f.]

When light crosses from vacuum into a medium: speed decreases by factor n, wavelength shortens by the same factor n, frequency stays constant.

Why? The source sets the frequency — the rate at which crests are emitted. When a crest enters the glass, another must leave the boundary at that same rate; otherwise crests would pile up at the interface, which cannot happen. So f is locked by the source. Since v = fλ and v drops by n, λ must drop by n too.

[→ WE-3 full solution: yellow light entering glass, n = 1.50.]

Probe: In glass, what is the photon energy compared to vacuum? [Elicit. Correct: unchanged — E = hf, frequency is the same, so energy is the same. Energy is conserved at the boundary.]"

**TA-6 [P36 — Probe; student-solved formative: WE-2]**

"Now a student problem. Work through it independently, then we will compare.

A photon has energy E = 3.1 eV. Find its wavelength and identify the spectrum region.

[Allow 3–4 minutes. → WE-2 solution walkthrough as needed.]

Follow-up probes:
(1) This photon hits a sodium surface (φ = 2.3 eV). Does it eject an electron? If so, what is KE_max? [Correct: yes; KE_max = 3.1 − 2.3 = 0.8 eV]
(2) Which experimental evidence tells us this photon has particle character? Which tells us light at this frequency also behaves as a wave? [Correct: photoelectric effect for particle; double-slit interference at the same λ for wave]"

[P85 regulation_tail: "You have now used E = hf from two directions — wavelength to energy, and energy to wavelength. Both directions appear in problems and on assessments. Notice you are applying the photon model in the same sentence as identifying a visible wavelength — that is the dual-nature framing in action."]

**TA-7 [P68 — Mastery gate + P85 + P91]**

"Final session gate (0.80 required across all four parts):

(1) Red light (λ = 620 nm) and green light (λ = 500 nm) both illuminate a copper surface (work function φ = 4.7 eV). Does either cause the photoelectric effect? Calculate E for each and justify.

(2) Yellow light (λ₀ = 589 nm) enters water (n = 1.33). Find the speed, wavelength, and frequency in water.

(3) In Young's double-slit experiment with λ = 500 nm, slit separation d = 0.10 mm, screen distance L = 1.5 m, find the fringe spacing Δy = λL/d.

(4) Explain in two sentences why the photoelectric threshold frequency is sharp (not gradual) — and why this rules out a pure wave model.

Closing thought: Maxwell predicted in 1865 that light is an electromagnetic wave. Einstein proved in 1905 that light also behaves as particles. Neither was wrong. Together they revealed that quantum objects do not fit into the classical categories of wave OR particle — they are something deeper that exhibits both behaviors depending on how we look. Quantum electrodynamics eventually unified the two descriptions, but the dual nature of light remains one of the most profound results in all of physics.

Spaced retrieval: +2 days (f = c/λ and E = hf calculation), +5 days (photoelectric threshold reasoning and work function), +2 weeks (v = c/n and frequency invariance in medium)."

[P91 gate: threshold 0.80. If not reached → review photoelectric threshold diagram (TA-3) and frequency-invariance argument (TA-5) before rescheduling the mastery gate.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S0/S3):** Violet light has wavelength λ = 420 nm in vacuum.
(a) Calculate its frequency.
(b) Calculate its energy in joules and convert to eV.
(c) Is this photon more or less energetic than a red photon at λ = 650 nm? Explain using E = hc/λ.

*Expected: f = 7.14×10¹⁴ Hz; E = 4.73×10⁻¹⁹ J = 2.96 eV; more energetic than red (E_red ≈ 1.91 eV) because shorter wavelength → higher frequency → higher E per photon.*

**P-2 (Developing — identifies S3/S6):** Monochromatic light (λ₀ = 540 nm in vacuum) enters crown glass (n = 1.52).
(a) Find the speed in the glass.
(b) Find the wavelength in the glass.
(c) Find the frequency in the glass.
(d) Explain in one sentence why frequency is invariant across the boundary.

*Expected: (a) v = 1.97×10⁸ m/s; (b) λ_glass = 355 nm; (c) f = 5.56×10¹⁴ Hz (same as in vacuum); (d) frequency is set by the source — crests arrive and depart the boundary at the same rate, so frequency cannot change.*

**P-3 (Proficient — identifies S6/S9):** Ultraviolet light of frequency f = 1.5×10¹⁵ Hz shines on a metal with work function φ = 4.0 eV.
(a) Find the photon energy in eV.
(b) State whether the photoelectric effect occurs.
(c) If it does, calculate KE_max of the emitted electrons.
(d) Would doubling the UV intensity double KE_max? Explain.

*Expected: (a) E = hf = (6.626×10⁻³⁴)(1.5×10¹⁵) = 9.94×10⁻¹⁹ J = 6.21 eV; (b) yes, 6.21 eV > 4.0 eV; (c) KE_max = 6.21 − 4.0 = 2.21 eV; (d) no — doubling intensity doubles the number of ejected electrons per second but each electron's KE_max = hf − φ depends only on frequency, not intensity.*

**P-4 (Mastery gate — confirms S9; ≥0.80 across all four parts required):**
(a) Explain why the photoelectric effect cannot be explained by the wave model of light, using specifically the threshold frequency observation.
(b) A student claims: "If I shine a very bright red laser (λ = 660 nm) on tungsten (φ = 4.5 eV), the surface will eventually emit electrons." Calculate E_red in eV, identify the error, and correct it.
(c) Light has wavelength 310 nm in vacuum and 207 nm in a liquid. Calculate the refractive index of the liquid.
(d) Name one experiment that provides wave evidence for light and one that provides particle evidence. For each, state what the experiment demonstrates and why the other model cannot explain it.

*Expected: (a) wave model predicts any frequency + enough intensity ejects electrons — the sharp frequency threshold with zero emission below it (regardless of intensity) falsifies this; (b) E_red = hc/λ = (6.626×10⁻³⁴ × 3×10⁸)/(660×10⁻⁹) = 3.01×10⁻¹⁹ J = 1.88 eV; 1.88 eV < 4.5 eV so no electrons regardless of brightness; error is assuming intensity compensates for photon energy; (c) n = λ₀/λ_liquid = 310/207 = 1.50; (d) Young's double-slit → interference fringes prove wave nature (particles cannot interfere); photoelectric threshold → sharp cutoff frequency proves photon/particle nature (continuous waves cannot explain it).*

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Wave vs. particle evidence side-by-side comparison panel. Left panel: double-slit interference pattern on a screen (alternating bright/dark fringes); wave explanation overlay shows path-difference diagram (constructive: Δpath = mλ; destructive: Δpath = (m+½)λ). Right panel: photoelectric effect schematic — monochromatic light source, metal plate, ammeter; one graph shows current vs. frequency (threshold f₀ marked, zero current below), another shows KE_max vs. frequency (straight line above f₀ with slope h). Toggle: "Wave model fails here" annotation appears on the photoelectric side; "Particle model fails here" annotation appears on the interference side. Purpose: establish that no single classical model covers both observations.

**VIS-2:** EM spectrum strip with dual axis and photon energy bar. Horizontal axis: frequency on log scale (10⁴ Hz to 10²⁴ Hz). Strip regions color-coded: radio, microwave, IR, visible (color-rendered 400–700 nm), UV, X-ray, gamma. Below strip: wavelength scale (m, mm, μm, nm). Above strip: photon energy bar in eV (increases left to right, labeled with E = hf). Hover over any region: displays λ range, f range, E range in eV, and typical source/application. Visible sub-band highlighted with named colors (violet, blue, green, yellow, orange, red). Key annotation: "Energy follows frequency — short λ = high f = high E per photon."

**VIS-3:** Speed and wavelength change at medium boundary — interactive wavefront diagram. Left region (vacuum): parallel wavefronts, λ₀ labeled, v = c. Right region (medium): wavefronts compressed, v = c/n, λ_medium = λ₀/n. Slider for refractive index n (1.0 to 2.5): wavefronts compress/expand in real time as n changes. Live display shows v, λ, and f in both regions simultaneously — f highlighted as constant. Boundary transition animated (incoming and transmitted wavefronts synchronized in frequency). Key annotation: "Frequency is invariant — the source sets it. Only v and λ change at the boundary."

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.wave.wave-properties | Wave relationship v = fλ, concepts of frequency, wavelength, wave speed, and phase are direct prerequisites; all wave-model analysis of light builds on these | prerequisite |
| phys.opt.reflection | Geometric (ray) model of light — introduced here — underpins the law of reflection; the ray concept is the particle/geometric-optics approximation of the wave model | unlocks |
| phys.opt.refraction | Snell's law (n₁sinθ₁ = n₂sinθ₂) depends on wave-speed change at boundaries (v = c/n) first established here; refractive index concept originates here | unlocks |
| phys.opt.wave-optics | Young's double-slit and Huygens' principle require the wave model of light and the λ relationships established here as direct input | unlocks |
| phys.mod.photoelectric-effect | The photoelectric effect is the primary particle evidence for light introduced here; the photon energy formula E = hf and threshold condition KE_max = hf − φ are the conceptual seeds | unlocks |
| phys.em.electromagnetic-waves | Maxwell's EM wave theory (c = 1/√(μ₀ε₀), E⊥B, transverse structure, E₀ = cB₀) provides the theoretical foundation and derivation for the wave model discussed at Level 2/3 here | foundational context |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.opt.nature-of-light ✓ |
| V-2 | name matches KG exactly | PASS — "Nature of Light: Ray and Wave Models" ✓ |
| V-3 | domain derived from prefix phys.opt → optics | PASS ✓ |
| V-4 | difficulty label+number consistent (proficient=4) | PASS ✓ |
| V-5 | bloom matches KG (understand) | PASS ✓ |
| V-6 | All prerequisites present in KG requires list | PASS — phys.wave.wave-properties ✓ |
| V-7 | mastery_threshold = 0.80 (teaching standard; overrides KG value of 0.75) | PASS ✓ |
| V-8 | estimated_hours matches KG (3) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage set and consistent with rules | PASS — P (difficulty=4, bloom=understand; not Analyse/Evaluate; concrete optional) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields each | PASS — MC-1 (wave-only model), MC-2 (intensity-energy confusion), each with trigger_signal, conflict_evidence, bridge_text, replacement_text, discrimination_pairs, s6_path ✓ |
| V-12 | ≥3 worked examples with complete numeric solutions | PASS — WE-1 (photon energy red/blue, eV conversion), WE-2 (eV to wavelength, spectrum ID), WE-3 (speed/wavelength/frequency in glass, frequency invariance) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS — all four states with description and entry signal ✓ |
| V-14 | Session script ≤ session_cap and uses correct Primitive codes | PASS — 7 TAs, codes P01/P06/P28/P31/P51/P36/P68/P85/P91 used as specified ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 (foundational), P-2 (developing), P-3 (proficient), P-4 (mastery gate at 0.80) ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 (wave/particle evidence comparison), VIS-2 (EM spectrum + photon energy bar), VIS-3 (speed/wavelength in medium, interactive) ✓ |
| V-17 | Cross-links table present with prerequisite, unlocked, and foundational context entries | PASS — 6 entries: 1 prerequisite, 4 unlocked, 1 foundational context ✓ |
| V-18 | No implementation code, no route/schema changes | PASS ✓ |
| V-19 | No curriculum authoring for other subjects | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**

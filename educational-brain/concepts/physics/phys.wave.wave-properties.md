# Wave Properties — `phys.wave.wave-properties`

## Identity

- **Concept ID**: `phys.wave.wave-properties`
- **Display name**: Wave Properties
- **Domain**: waves
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 3
- **Requires**: `phys.meas.units`
- **Unlocks**: `phys.opt.nature-of-light`, `phys.opt.wave-optics`, `phys.wave.longitudinal-waves`, `phys.wave.sound-waves`, `phys.wave.transverse-waves`
- **Load-bearing prerequisite content**:
  - From `phys.meas.units`: the concept of a derived unit (Hz = s⁻¹, m/s) and the discipline of checking units in equations; the relationship v = fλ is the central equation and its unit analysis (m/s = Hz × m) must be immediately checkable

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: A wave is a disturbance that moves through a medium (like water or air) or through space. The wave moves but the medium itself does not travel along — the water in an ocean wave goes up and down, not forward to shore. Waves carry energy without carrying the material they move through.

**Stage 2 — Intermediate**: A wave is characterised by five measurable quantities: amplitude (A, maximum displacement from equilibrium; determines energy), wavelength (λ, spatial distance between successive identical points, e.g., crest to crest; unit: m), period (T, time for one complete oscillation; unit: s), frequency (f, number of complete oscillations per second; unit: Hz = s⁻¹), and phase (position within a cycle, useful for comparing two waves). The fundamental relation v = fλ links wave speed, frequency, and wavelength. Frequency and period are reciprocals: f = 1/T. The medium determines the wave speed; frequency is determined by the source.

**Stage 3 — Advanced**: Waves are solutions to wave equations — differential equations relating spatial and temporal second derivatives. The wave function y(x, t) = A sin(kx − ωt + φ) encodes all five parameters: amplitude A, wave number k = 2π/λ, angular frequency ω = 2πf, and phase constant φ. Wave speed v = ω/k = fλ. Intensity (energy per unit area per second) is proportional to A². Superposition: two waves occupying the same space add algebraically, producing interference (constructive when in phase, destructive when out of phase).

**Stage 4 — Expert / University**: Waves are eigenfunctions of linear operators; the wave equation □ψ = 0 (d'Alembertian) generalises to curved spacetime. Dispersion relations ω(k) encode how speed varies with frequency in a medium. Group velocity (energy propagation) v_g = dω/dk differs from phase velocity v_p = ω/k in dispersive media. Quantum mechanics describes particles as wave packets, with amplitude related to probability density.

**Model versioning**: Stage 2 is the operative model for all secondary-level wave problems. Stage 3 is needed before wave optics and standing waves. Stage 4 is university physics.

---

## Why beginners fail

The dominant root cause is **wave speed confusion**: learners conflate the speed of the wave (how fast the disturbance moves through the medium) with the speed of the particles in the medium (how fast individual particles oscillate). These are completely different — a sound wave travels at ~340 m/s through air, but individual air molecules oscillate at tiny amplitudes and their oscillation speed depends on amplitude and frequency, not on the wave's propagation speed.

The secondary root cause is **frequency–wavelength direction confusion**: learners cannot reliably predict whether increasing frequency increases or decreases wavelength when speed is constant. The equation v = fλ is known, but the causal direction is reversed: learners think "higher frequency means longer wavelength" because both come from "more energetic" waves. The fix is enforcing that wave speed is set by the medium, not by the source: if v is fixed, then f and λ are inversely proportional.

---

## Misconception library

**M1 — "The medium moves with the wave"**
- Characteristic phrase: "The water rushes toward shore when a wave comes" or "Sound pushes the air forward."
- Probe: "When a wave moves across the surface of a pond, in what direction does a floating leaf move?"
- Expected wrong answer: "It moves in the direction the wave travels."
- Recovery: a floating leaf bobs up and down (for a transverse wave on water). It does not drift with the wave. Draw the wave profile; mark a single particle's vertical oscillation. The wave pattern moves horizontally; the particle moves vertically. A video of a buoy in open water (no current) demonstrates this directly.

**M2 — "Faster wave = higher frequency"**
- Characteristic phrase: "Sound in water is faster than in air, so it must have a higher frequency."
- Probe: "A musical note at 440 Hz travels from air into water, where the speed of sound is about 4 times faster. What is the frequency in water? What is the wavelength in water?"
- Expected wrong answer: "Frequency is 4 × 440 = 1760 Hz in water."
- Recovery: frequency is determined by the source (the vibrating string/speaker), not the medium. The wave speed changes at the interface; the frequency stays the same. Wavelength changes: λ = v/f. In water, λ is 4 times larger, but f is unchanged.

**M3 — "Amplitude determines speed"**
- Characteristic phrase: "A louder sound travels faster because it has more energy."
- Probe: "Does a louder sound (larger amplitude) travel faster than a quieter sound at the same frequency in the same medium?"
- Expected wrong answer: "Yes, more energy means faster."
- Recovery: wave speed in a given medium depends on the medium's properties (density, elasticity), not on amplitude. All sounds in air at the same temperature travel at the same speed, regardless of loudness. Amplitude affects energy and intensity, not speed.

**M4 — "Period and frequency are the same quantity"**
- Characteristic phrase: "The frequency is 0.5, so the period is also 0.5."
- Probe: "A wave has a frequency of 0.5 Hz. What is its period?"
- Expected wrong answer: "0.5 s."
- Recovery: f = 1/T, so T = 1/f = 1/0.5 = 2 s. A wave with frequency 0.5 Hz completes half a cycle per second; it takes 2 seconds to complete one full cycle. Draw the wave over time and count: one full cycle takes 2 s.

---

## Explanation library

**E1 — The rope wave (introductory)**
Hold one end of a long rope and flick your wrist up and down once. A single pulse travels along the rope away from you. You can see: (1) the pulse moves along the rope; (2) each piece of the rope moves up and then back to its original position — it does not travel with the pulse. This is the clearest physical demonstration that energy travels without matter transport.

**E2 — v = fλ from first principles**
"In one period T, the wave travels exactly one wavelength λ (by definition — a wavelength is the spatial length of one full cycle). So the wave speed is: v = distance/time = λ/T = λf. This gives v = fλ. The speed is set by the medium. If v is fixed, then f and λ must multiply to give that fixed value — double f, halve λ."

**E3 — The five parameters with units (systematic)**
Draw a snapshot of a sinusoidal wave and annotate: amplitude A (m) — height from equilibrium to peak; wavelength λ (m) — crest to next crest. Then draw the wave over time at a fixed point: period T (s) — time from peak to next peak; frequency f = 1/T (Hz). The wave speed v = fλ = λ/T (m/s).

---

## Analogy library

**Primary analogy — Stadium wave (Mexican wave)**
Imagine thousands of fans in a football stadium doing the Mexican wave. Each fan stands up and sits down (oscillates vertically); the wave pattern travels around the stadium. No fan moves around the stadium — they stay in their seat. Energy (the "wave") travels; the "medium" (the fans) stays. Frequency = how often each fan stands up per second; wavelength = the arc-length of the stadium covered by one complete wave at any instant; wave speed = how fast the wave travels around the stadium.

**Breaking point**: In a stadium wave, the wave speed can vary because humans choose when to respond. In a physical wave, speed is determined by the medium's properties, not by the source. The analogy also cannot capture transverse vs. longitudinal wave types without modification.

**Anti-analogy — "Sound waves are like water waves"**
Water surface waves are transverse; sound waves are longitudinal. Although both are waves obeying v = fλ, teaching that sound waves "look like" water waves (particles moving up and down) is incorrect. Sound particles (air molecules) move back and forth (parallel to the wave direction) in compressions and rarefactions, not perpendicular. Only introduce this distinction after the general wave-properties concept is stable.

---

## Demonstration library

**D1 — Rope pulse**
Stretch a long rope along the floor. Flick one end. Observe the pulse travel. Observe that once the pulse passes any marked point, that point returns to rest. This directly addresses M1.

**D2 — Slinky waves**
Use a slinky to demonstrate both transverse (shake end side-to-side) and longitudinal (push-pull end along the axis) waves. Show that the slinky coils do not travel with the wave — they oscillate in place. Measure wavelength (distance between compressions or crests) and frequency (flicks per second) and confirm that wave speed is approximately their product.

**D3 — Frequency–wavelength trade-off**
Connect a signal generator to a speaker in water (or use a ripple tank). Fix the wave speed (same medium). Change the frequency: observe that higher frequency → shorter wavelength, lower frequency → longer wavelength. This makes M2 directly testable.

---

## Discovery lesson

**Argue for guided discovery** (appropriate because the key relationship v = fλ can be derived from the operational definitions of the quantities):

Present a snapshot of a sinusoidal wave with λ = 2 m, and a time series showing f = 5 Hz. Ask: "In one second, how many complete cycles does this wave produce? How far does one cycle extend in space? So how far does the pattern travel in one second?" The learner should compute 5 × 2 m = 10 m/s. The discovery is that wave speed = frequency × wavelength. After the learner derives this, introduce the symbol v = fλ.

For the "medium determines speed" principle, present: same source (same f) in two media. Show that speed changes, wavelength changes, but frequency stays the same. Ask: "What determined the frequency? What determined the speed?" This creates the conceptual separation between source (frequency) and medium (speed).

---

## Teaching actions

**TA1 — Particle motion vs. wave motion distinction**: For every wave problem introduced, ask first: "What direction does the wave travel? What direction do the particles in the medium oscillate?" This forces the M1 check at every encounter.

**TA2 — Fixed-speed drill**: Before applying v = fλ, always ask: "What determines the wave speed here?" Answer: the medium. "Is the speed changing?" If not, f and λ are in an inverse relationship — write that out explicitly before substituting.

**TA3 — Unit analysis of v = fλ**: Require the learner to write Hz × m = s⁻¹ × m = m/s as a unit check before any numerical substitution. This makes M4 (period–frequency confusion) immediately visible when the units do not balance.

**TA4 — Period–frequency reciprocal drill**: Whenever f or T appears, require the learner to compute the other one before proceeding. "f = 200 Hz, so T = ?"

---

## Voice teaching

> "A wave is a moving pattern, not a moving thing. The medium doesn't travel; the disturbance does. Think of the Mexican wave in a stadium — the fans don't run around the stadium, but the wave of standing-and-sitting does. Same here: air molecules don't rush from a speaker to your ear; a pattern of compressions and rarefactions does, and each molecule mostly just vibrates back and forth in place."

> "The big equation is v = fλ. But before you ever use it, tell me: what determines the wave speed? The medium — the density and elasticity of whatever the wave is passing through. The source determines the frequency. So if the wave moves into a different medium, the speed changes, the wavelength changes, but the frequency stays exactly what the source set it to be."

> "Period and frequency are not the same number — they're reciprocals. If a wave completes 4 cycles per second, the frequency is 4 Hz. How long does one cycle take? Quarter of a second. T = 1/4 s. Always: T = 1/f. These are not interchangeable."

---

## Assessment

**Mastery gate**: The learner can define all five wave parameters, state v = fλ, apply it to find any one of v, f, or λ given the other two, predict the direction of wavelength change when frequency changes in the same medium, and identify what determines wave speed.

**Formative golden probe**
> "A wave in a rope has a wavelength of 0.5 m and a frequency of 8 Hz. (a) What is the wave speed? (b) What is the period? (c) The same source is connected to a stiffer rope in which waves travel at 6 m/s. What is the new wavelength? (d) What is the new frequency? (e) If the amplitude is doubled, what happens to the wave speed?"

- (a)–(b): basic application of v = fλ and T = 1/f
- (c)–(d): targets M2 (frequency stays the same; only λ changes)
- (e): targets M3 (wave speed unchanged; amplitude affects energy, not speed)

**Confidence calibration question**
After (d): "How confident are you that the frequency doesn't change when the wave enters a different medium?" (1–5). Watch for low confidence after a correct answer (procedure not internalised) and high confidence after "frequency changes" (M2 embedded).

**Delayed retrieval check (48 h / 7 days)**
"Sound at 1000 Hz travels from air (340 m/s) into water (1500 m/s). What is the wavelength in water? What is the wavelength in air?" (Tests source-determines-frequency, medium-determines-speed, and v = fλ in a realistic context.)

---

## Recovery notes

**Failure mode A — M1 persists (medium travels with wave)**
Use D1 (rope pulse) or a video of a buoy in open water. The perceptual experience of watching a single marked point oscillate without drifting is more effective than diagrams. Ask the learner to trace the path of one piece of the rope during the wave; they should draw a vertical oscillation, not a horizontal translation.

**Failure mode B — M2 persists (higher speed = higher frequency)**
Return to D3 (ripple tank or signal generator). Change the frequency; observe the speed stays constant (same medium) and the wavelength changes. Then change the medium (different depth of water changes speed); observe the frequency stays the same. These two separate operations make the causal structure explicit.

**Failure mode C — Period–frequency reciprocal error**
Use a concrete time-series diagram: draw a sinusoidal wave over time, mark one full cycle, measure its duration. "This is the period — the time for one full cycle." Count how many fit in one second: that's the frequency. Compute T × f = 1 cycle × (cycles/s) = 1. Then require the algebraic reciprocal.

---

## Memory & review

**Memory type**: Concept + formula schema (the five parameters must be recalled by name and unit; v = fλ and T = 1/f must be automatic).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "Name the five wave parameters and state the unit of each."
- "State v = fλ. What does each symbol represent and what is its unit?"
- "A wave has f = 50 Hz. What is T?"
- "If a wave enters a medium where it travels twice as fast, and the source frequency doesn't change, what happens to the wavelength?"

**Interleaving**: After mastery, mix wave problems with kinematics problems — some involving v = fλ and some involving v = d/t — to ensure the learner picks the correct speed equation for the context.

---

## Transfer map

**Immediate transfers**:
- `phys.wave.transverse-waves` and `phys.wave.longitudinal-waves`: the five parameters apply to both; classification by particle-oscillation direction is the new content
- `phys.wave.sound-waves`: application of v = fλ with v ≈ 340 m/s in air; audible frequency range (20 Hz–20 kHz) gives wavelength range
- `phys.opt.nature-of-light`: electromagnetic waves obey v = fλ with v = c = 3 × 10⁸ m/s; the visible spectrum is a frequency/wavelength range

**Downstream transfers**:
- `phys.wave.wave-speed`: the dependence of wave speed on medium properties (tension + linear density for strings; bulk modulus + density for sound)
- `phys.opt.wave-optics`: interference and diffraction are direct applications of superposition (Stage 3 model)
- `phys.em.electromagnetic-waves`: all EM radiation obeys v = c = fλ

**Cross-subject transfers**:
- `math` — trigonometric functions and sinusoidal models: y = A sin(2πft) is the mathematical form of a wave; wave problems are applications of sinusoidal function analysis
- Music — pitch = frequency, volume = amplitude, timbre = harmonic content; the wave-properties framework underpins acoustics

---

## Curriculum feedback

The KG correctly places `phys.wave.wave-properties` as the root concept for the entire waves domain. All five unlocks are correctly positioned downstream.

The KG does not list `phys.wave.wave-speed` as unlocked by this concept, but in teaching sequence it is the natural next step after v = fλ (deriving v from medium properties rather than treating it as given). Consider adding `phys.wave.wave-speed` as a direct unlock.

The description "Waves are characterised by amplitude, wavelength, period, frequency, and phase, related by v = fλ" is accurate. One suggested addition: make explicit that phase is needed for interference (wave-optics), so learners understand why a five-parameter list is needed rather than four. Currently the KG description positions phase without explaining its downstream role.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

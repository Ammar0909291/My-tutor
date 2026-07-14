# Wave Speed — `phys.wave.wave-speed`

## Identity

- **Concept ID**: `phys.wave.wave-speed`
- **Display name**: Wave Speed
- **Domain**: waves
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 4
- **Requires**: `phys.wave.transverse-waves`, `phys.wave.longitudinal-waves`
- **Unlocks**: `phys.wave.superposition`
- **Load-bearing prerequisite content**:
  - From `phys.wave.transverse-waves`: the restoring force for transverse waves is shear — in a string, this is tension T; the wave is sustained by the balance between inertia (mass) and restoring force (tension)
  - From `phys.wave.longitudinal-waves`: the restoring force for longitudinal waves is compression — bulk modulus B for fluids; the wave is sustained by the balance between inertia (density) and restoring force (bulk modulus)
  - From `phys.wave.wave-properties` (transitive): v = fλ — wave speed links frequency and wavelength; the new content is what DETERMINES v in each medium

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Wave speed depends on the medium — not on the wave's frequency or amplitude. A ripple in water travels at a fixed speed set by the water's properties (depth, surface tension), not by how often you wiggle your hand.

**Stage 2 — Intermediate**: For different wave types, different medium properties control speed:
- **String/rope (transverse)**: v = √(T/μ), where T is tension (N) and μ is linear mass density (kg/m). Higher tension → faster wave; denser rope → slower wave.
- **Sound in a fluid (longitudinal)**: v = √(B/ρ), where B is the bulk modulus (Pa) and ρ is density (kg/m³). Stiffer fluid → faster sound; denser fluid → slower sound.
- **Sound in air**: v ≈ 331√(T/273) m/s (T in Kelvin), or v ≈ 331 + 0.6T_C for T_C in Celsius.
- **Sound in a solid rod (longitudinal)**: v = √(E/ρ), where E is Young's modulus.
- All these formulas share the same structure: v = √(restoring-force property / inertia property).

**Stage 3 — Advanced**: The wave speed formula v = √(elastic property / inertia property) is universal — it follows from the wave equation ∂²y/∂t² = (elastic/inertia) ∂²y/∂x². For an EM wave in vacuum: v = c = 1/√(ε₀μ₀) (electric permittivity and magnetic permeability replace elastic and inertia). In a dispersive medium, wave speed depends on frequency — different frequencies travel at different speeds, causing a wave packet to spread out (dispersion). The group velocity v_g = dω/dk is the speed at which the energy (the envelope of the packet) travels.

**Stage 4 — Expert / University**: The phase velocity v_p = ω/k and group velocity v_g = dω/dk are equal only in a non-dispersive medium. Dispersion relations ω(k) encode the medium's response to waves of different wavelengths. For electromagnetic waves in a plasma: ω² = ω_p² + c²k² (ω_p = plasma frequency), giving v_p > c but v_g < c (no violation of special relativity since energy and information travel at v_g).

**Model versioning**: Stage 2 is the operative model for all secondary-level problems. Stage 3 introduces the wave equation and dispersion. Stage 4 is university wave physics.

---

## Why beginners fail

The dominant root cause is **density-speed intuition reversal**: learners expect denser materials to carry waves faster ("denser = stronger = faster"), but for most wave types, higher density SLOWS the wave (more inertia). The correct intuition is: stiffness (restoring force) makes the wave faster; density (inertia) makes it slower. This is the opposite of the "heavy = strong" intuition from everyday experience.

The secondary root cause is **confusing medium speed with wave speed change at boundaries**: when a wave crosses from one medium to another, v changes. Learners sometimes conclude that the frequency also changes. From wave-properties, frequency is set by the source — only v and λ change at the boundary.

---

## Misconception library

**M1 — "A denser medium means faster waves"**
- Characteristic phrase: "Sound travels faster in water than in air because water is denser."
- Probe: "Why does sound travel faster in water than in air? Is it because water is denser?"
- Expected wrong answer: "Yes, denser medium → faster sound."
- Recovery: sound in water (≈ 1500 m/s) IS faster than in air (≈ 340 m/s), but NOT because of density alone. Water's bulk modulus is ~2.2 GPa; air's is ~0.14 MPa — water is about 16,000 times stiffer. Water is also ~800 times denser. Net effect: v = √(B/ρ) → stiffness wins. If density were the dominant factor, denser mediums would be slower. The formula v = √(B/ρ) is the correct guide: stiffness increases v, density decreases v.

**M2 — "Increasing tension increases wave speed but also increases frequency"**
- Characteristic phrase: "Pull the string tighter — the waves travel faster and you get a higher note."
- Probe: "A guitar string is tightened (more tension). What happens to the wave speed? What happens to the frequency?"
- Expected wrong answer: "Both increase — faster waves, higher frequency."
- Recovery: increasing tension increases wave speed (v = √(T/μ)). For a string of fixed length, the resonant frequency of the standing wave is f = v/(2L) — so higher v DOES give higher frequency for the same string length. But this is indirect: frequency changes because v changes, not as an independent effect. If the string length could be continuously adjusted to maintain a constant standing-wave frequency, the wavelength would also adjust. v and f are not the same thing.

**M3 — "At a medium boundary, frequency changes along with speed"**
- Characteristic phrase: "The wave slows down when it enters the glass — so the frequency drops too."
- Probe: "A light wave enters glass (refractive index n = 1.5). Speed in glass = c/n = c/1.5. What is the frequency in glass compared to in air?"
- Expected wrong answer: "Frequency decreases by factor 1.5."
- Recovery: frequency is determined by the source (the light's atomic origin). The source oscillates at a fixed frequency and the wave carries that frequency through any medium. Only v and λ change at the boundary: v_glass = c/1.5, f_glass = f_air, λ_glass = λ_air/1.5. This is the same principle from wave-properties (frequency is source-determined).

**M4 — "Amplitude affects wave speed"**
- Characteristic phrase: "A louder sound (larger amplitude) travels faster."
- Probe: "Does increasing the amplitude of a wave on a string change the wave speed?"
- Expected wrong answer: "Yes — more energy means faster propagation."
- Recovery: wave speed is a property of the medium (v = √(T/μ)), not of the wave's amplitude. Amplitude affects the energy transported by the wave (proportional to A²), not the speed of propagation. A thunderclap and a whisper in the same air both travel at the same speed.

---

## Explanation library

**E1 — The structure of all wave speed formulas**
"Every mechanical wave speed formula has the structure v = √(stiffness/inertia). For a rope: T (tension = the stiffness trying to restore the string) and μ (mass per unit length = the inertia resisting acceleration). For sound in air: B (bulk modulus = the air's stiffness against compression) and ρ (density = the air's inertia). Higher stiffness → faster wave (restores disturbance more quickly). Higher inertia → slower wave (responds to restoring force more slowly)."

**E2 — Guitar string derivation**
"A guitar string: tighten it (more T → higher v = √(T/μ) → higher frequency for same length). Use thicker string (higher μ → lower v → lower frequency). Both effects are used in guitar design: high strings are thin (low μ) and high-tension; low strings are thick (high μ) and lower-tension. The wave speed formula explains the engineering."

**E3 — Temperature dependence of sound speed**
"Sound in air: v = √(γRT/M) where T is in Kelvin. Warmer air = faster molecules = faster impulse transmission. At 0 °C (273 K): v ≈ 331 m/s. At 20 °C (293 K): v ≈ 343 m/s. The approximation v ≈ 331 + 0.6T_C works well for everyday temperatures. This is why concert pitch drifts as orchestras warm up — the speed of sound in the air (and the resonant frequencies of wind instruments) changes with air temperature."

---

## Analogy library

**Primary analogy — The taut vs. slack rope**
Hold a slack rope between two people. Flick one end: the wave travels slowly, wiggles loosely. Now pull the rope taut (increase tension). Flick: the wave snaps across quickly. The restoring force (tension) made the wave faster. Now imagine the same taut rope but made of lead (very high μ). The wave would travel more slowly despite the same tension, because the high inertia of each lead segment resists acceleration. Stiffness speeds up; inertia slows down.

**Breaking point**: This analogy doesn't extend directly to longitudinal waves or to EM waves. The structure "restoring/inertia" is universal, but the physical quantities change for each wave type.

**Anti-analogy — "Faster waves are louder"**
Amplitude (loudness for sound) and wave speed are completely independent. A wave can be loud (large A) and slow, or quiet (small A) and fast. The medium alone determines speed; the source energy determines amplitude. Do not link "more energetic" with "faster."

---

## Demonstration library

**D1 — Slinky speed vs. tension**
Stretch a slinky between two people at two different tensions (loose vs. taut). Send a transverse pulse. The more stretched (more tension) slinky carries the pulse faster. This demonstrates v ∝ √T qualitatively.

**D2 — Guitar string tuning**
Tune a guitar string to different frequencies by tightening (higher f) or loosening (lower f) the peg. For the same string (same μ, same L), tightening increases tension → higher v → higher resonant frequency. This connects the formula to immediate musical experience.

**D3 — Thunder timing**
(Revisit from sound-waves): count seconds between lightning and thunder, estimate distance. At 20 °C, sound travels ~343 m/s (wave speed in air). Contrast: at 0 °C, it travels ~331 m/s. In winter, the thunder from the same storm seems to "arrive later" per unit distance — because wave speed depends on temperature.

---

## Discovery lesson

**Argue for guided inquiry with dimensional analysis**:

"Wave speed on a string depends on the medium. The medium has two relevant properties: tension T (with units N = kg·m/s²) and linear density μ (with units kg/m). The wave speed has units m/s. Combine T and μ to produce m/s using only square roots and ratios. What combination gives m/s?" The dimensional analysis: √(T/μ) = √(kg·m·s⁻²/kg·m⁻¹) = √(m²/s²) = m/s. This is the derivation by dimensional analysis — the formula v = √(T/μ) falls out of the units. Then test: does increasing T increase or decrease v? Does the formula predict the correct direction?

---

## Teaching actions

**TA1 — Stiffness-over-inertia mantra**: For every wave speed question, require the learner to state "stiffness in numerator, inertia in denominator" before writing the specific formula. This encodes the universal structure (M1 prevention).

**TA2 — Boundary problem protocol**: At any medium boundary, require the learner to write: (1) frequency is unchanged (set by source); (2) speed changes (v = formula for new medium); (3) wavelength changes: λ = v/f. Never allow "speed changes → frequency changes."

**TA3 — Amplitude independence declaration**: For every problem, after the wave speed is calculated, ask: "What would happen to the wave speed if the amplitude were doubled?" Expected answer: "Nothing — wave speed depends on the medium, not the amplitude."

**TA4 — Direction of change prediction**: Before any calculation, require the learner to predict: "If T doubles, v increases/decreases by factor ___?" (v = √(2T/μ) = √2 × v₀ — increases by factor √2). This builds ratio intuition alongside formula fluency.

---

## Voice teaching

> "Wave speed comes from two competing properties of the medium: the stiffness trying to restore the wave, and the inertia resisting that restoration. Stiffer → faster. Denser (more inertia) → slower. The formula is always v = √(stiffness/inertia). For a string: √(T/μ). For sound in a fluid: √(B/ρ). For sound in air: √(γP/ρ) ≈ 331 + 0.6T_C. The structure is the same; only the physical quantities differ."

> "Denser does NOT mean faster. Water is 800 times denser than air — but sound travels faster in water because water is 16,000 times stiffer. The stiffness effect wins. If density alone determined speed, sound in lead would be faster than in air; it's not — steel is stiffer than lead, so sound in steel (5100 m/s) beats sound in lead (~1200 m/s) even though lead is denser."

> "At a medium boundary: the frequency doesn't change. The source set the frequency; crossing a boundary doesn't reset it. The speed changes — that's what happens at the boundary. The wavelength changes to maintain fλ = v_new. Write those three statements for every boundary problem before you touch the numbers."

---

## Assessment

**Mastery gate**: The learner can (1) state v = √(T/μ) and v = √(B/ρ), (2) predict qualitatively what happens to v when T, μ, B, or ρ change, (3) apply v = fλ at a medium boundary (keeping f fixed), and (4) calculate v for string and sound problems numerically.

**Formative golden probe**
> "A guitar string has linear density μ = 5 × 10⁻³ kg/m and tension T = 80 N. (a) What is the wave speed? (b) If the tension is increased to 320 N (four times), what is the new wave speed? (c) A 200 Hz wave travels along this string. What is its wavelength? (d) The wave enters a heavier string (μ = 2 × 10⁻² kg/m) at the same tension. What is the new wave speed? (e) What is the frequency in the heavier string? What is the new wavelength?"

- (a): v = √(80/(5×10⁻³)) = √16000 = 126.5 m/s
- (b): v = √(320/(5×10⁻³)) = √64000 = 253 m/s = 2v₀ (T × 4 → v × √4 = 2)
- (c): λ = 126.5/200 ≈ 0.63 m
- (d): v = √(80/(2×10⁻²)) = √4000 = 63.2 m/s (slower — higher inertia)
- (e): f = 200 Hz (unchanged); λ = 63.2/200 ≈ 0.32 m

**Confidence calibration question**
After (e): "How confident are you that the frequency stays at 200 Hz in the heavier string?" (1–5). Low confidence after correct answer → frequency invariance not yet internalised.

**Delayed retrieval check (48 h / 7 days)**
"Sound travels at 340 m/s in air at 20 °C and at 1500 m/s in water. (a) Is water stiffer or more dense relative to air? (b) A 440 Hz sound enters water. What are the wavelengths in air and water?" (Tests stiffness-vs-density reasoning and boundary frequency invariance.)

---

## Recovery notes

**Failure mode A — Density-speed confusion persists (M1)**
Calculate the bulk modulus and density of water vs. air explicitly:
- B_water ≈ 2.2 × 10⁹ Pa; B_air ≈ 1.4 × 10⁵ Pa → B_water/B_air ≈ 16,000
- ρ_water ≈ 1000 kg/m³; ρ_air ≈ 1.2 kg/m³ → ρ_water/ρ_air ≈ 833
- Speed ratio = √(16000/833) ≈ √19.2 ≈ 4.4 → v_water/v_air ≈ 4.4 ✓ (matches 1500/340)
The stiffness increase (16,000×) overwhelms the density increase (833×). This numerical argument is more compelling than the qualitative statement.

**Failure mode B — Frequency changes at boundary (M3)**
Ask: "Who set the frequency?" The source. "Has the source changed?" No. "So the frequency changes because...?" There is no reason. Frequency is a property of the source, not the medium. Pair this with the analogous argument from wave-properties (the teacher asking "does a tuning fork change its frequency when you put it in water?").

**Failure mode C — Amplitude-speed conflation (M4)**
Ask: "Show me in the formula v = √(T/μ) where the amplitude appears." It doesn't. The formula has no amplitude term. Therefore amplitude cannot affect v within this model. Then ask: "What does amplitude affect?" (Energy transported, loudness of the wave, intensity.)

---

## Memory & review

**Memory type**: Two formulas (v = √(T/μ) and v = √(B/ρ)) + universal structure (stiffness/inertia) + boundary rule (f fixed, v and λ change).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "State the wave speed formula for a transverse wave on a string. What does each symbol mean?"
- "If you double the tension on a string, what happens to the wave speed?"
- "Sound crosses from air into glass (faster in glass). What happens to frequency? Wavelength? Speed?"
- "Why does sound travel faster in solids than in gases?"

**Interleaving**: After mastery, mix wave-speed problems with v = fλ applications — learners must decide whether they are finding v from medium properties or from f and λ.

---

## Transfer map

**Immediate transfers**:
- `phys.wave.superposition`: interference and standing waves use wave speed to calculate resonant frequencies (f = v/2L for strings, f = v/4L for closed pipes)
- Standing waves in musical instruments: the resonant frequencies (harmonics) depend directly on v = √(T/μ) for strings and v = √(B/ρ) for air columns

**Downstream transfers**:
- Refraction: when a wave enters a medium where v changes, its direction bends (Snell's law follows from v change)
- `phys.opt.refraction`: n = c/v (refractive index is the ratio of c to the wave speed in the medium) — refraction is wave-speed-change applied to light

**Cross-subject transfers**:
- Music acoustics: all of string, wind, and percussion instrument physics involves v = √(stiffness/inertia) applied to different geometries and wave types
- Seismology: P-wave and S-wave speeds in Earth's layers are computed from elastic moduli and densities of the rock — wave-speed measurement is the primary tool for inferring Earth's interior structure

---

## Curriculum feedback

The KG description "wave speed is determined by the medium's properties; the wave equation relates displacement to position and time" is correct but understated. The two key formulas (v = √(T/μ) for transverse, v = √(B/ρ) for longitudinal) should be explicitly listed as learning outcomes — they are the primary calculational content of this concept.

The unlock (wave-superposition) is appropriate — superposition and interference require knowing wave speed to predict standing wave resonances.

One gap: the KG does not mention the temperature dependence of sound speed in air, which is quantitatively important and commonly tested. This should be a learning outcome (v ≈ 331 + 0.6T_C in m/s).

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

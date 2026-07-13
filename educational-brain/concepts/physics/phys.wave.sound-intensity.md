# Sound Intensity and the Decibel Scale — `phys.wave.sound-intensity`

## Identity

- **Concept ID**: `phys.wave.sound-intensity`
- **Display name**: Sound Intensity and the Decibel Scale
- **Domain**: waves
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 3
- **Requires**: `phys.wave.sound-waves`
- **Unlocks**: (none in this KG)
- **Load-bearing prerequisite content**:
  - From `phys.wave.sound-waves`: sound is a longitudinal pressure wave; loudness is the subjective perception of sound amplitude; amplitude determines the energy carried by the wave; a sound wave radiates outward from a point source in expanding spherical wavefronts.
  - The intensity concept quantifies the physical power carried by the wave per unit area at any given point — the objective correlate of subjective loudness. The decibel scale is needed because the human ear responds to intensity ratios, not differences.

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Sound intensity is how much energy per second passes through a unit area — it's the "power" of the sound at a given place. The decibel (dB) is the unit used to measure loudness levels on a scale that matches how the human ear actually perceives sound. Doubling the energy doesn't double the perceived loudness — you need ten times the energy to sound twice as loud. The decibel scale is logarithmic for this reason.

**Stage 2 — Intermediate**: Intensity I = P/A (power per unit area, SI unit: W/m²). For a point source in free space, sound spreads over a sphere: A = 4πr² → I = P/(4πr²). The inverse-square law: doubling the distance → intensity drops by a factor of 4. The decibel scale: β = 10 log₁₀(I/I₀), where I₀ = 10⁻¹² W/m² (the threshold of human hearing). Key benchmarks: 0 dB (threshold of hearing), 30 dB (quiet room), 60 dB (conversation), 90 dB (lawn mower, hearing damage threshold for prolonged exposure), 120 dB (threshold of pain). A 10 dB increase corresponds to a tenfold increase in intensity; a 3 dB increase corresponds to approximately doubling the intensity (10^0.3 ≈ 2).

**Stage 3 — Advanced**: The intensity of a sound wave is related to its pressure amplitude: I = p²/(2ρv), where p is the pressure amplitude, ρ is the medium density, and v is the wave speed. This shows that intensity scales as the square of pressure amplitude. Loudness (in phons) is a psychoacoustic quantity that accounts for the ear's frequency-dependent sensitivity — the equal-loudness contours (Fletcher-Munson curves) show that the ear is most sensitive around 3–4 kHz and less sensitive at low and very high frequencies. A 20 Hz tone and a 1000 Hz tone at the same dB level are perceived as having very different loudness.

**Stage 4 — Expert / University**: The full acoustic wave equation gives: p(x,t) = p₀ cos(kx − ωt); intensity I = p₀²/(2ρv). In complex media (absorbing materials, scattering), the intensity decay is exponential: I = I₀ e^(−αx), where α is the absorption coefficient. For architectural acoustics, the decibel levels add logarithmically: two sources of equal intensity each contributing β dB give a combined level of β + 10 log(2) ≈ β + 3 dB — not 2β. Room acoustics involves the reverberation time T₆₀ (time for intensity to drop by 60 dB after the source stops), governed by the Sabine equation T₆₀ = 0.161 V/(Aᾱ), where V is the room volume and Aᾱ is the total absorption.

**Model versioning**: Stage 2 is the operative model for all secondary-level problems (dB calculations, inverse-square law, intensity ratios). Stage 3 is needed for pressure-amplitude connections. Stage 4 is university acoustics.

---

## Why beginners fail

The dominant root cause is **treating decibels as linear (additive) rather than logarithmic**: learners add decibel values directly. "60 dB + 60 dB = 120 dB." The actual answer is about 63 dB — combining two equal sources adds 3 dB (doubles the intensity), not 100%. This error is intuitive (why wouldn't numbers add?) but physically wrong. The logarithmic nature of the decibel is not just a convention — it reflects the logarithmic response of the human ear.

The secondary root cause is **confusing intensity and loudness (or decibels and watts)**: learners treat "100 dB" as meaning "100 W/m²" or treat loudness as a direct measure of intensity. In fact, dB is a ratio (log of I/I₀) and loudness (phon) also depends on frequency. A 100 dB sound at 100 Hz is perceived as less loud than a 100 dB sound at 1000 Hz, because the ear is less sensitive at low frequencies.

---

## Misconception library

**M1 — "Decibels add linearly: two sources at X dB give 2X dB"**
- Characteristic phrase: "Two 60 dB speakers together give 120 dB."
- Probe: "Two identical loudspeakers each produce 60 dB at a point P. When both play simultaneously (coherently incoherent, so intensities add), what is the combined sound level at P?"
- Expected wrong answer: "120 dB — 60 + 60."
- Recovery: decibels measure log(I/I₀). Two equal sources double the intensity: I_combined = 2I. β_combined = 10 log(2I/I₀) = 10 log(2) + 10 log(I/I₀) ≈ 3 + 60 = 63 dB. Adding two equal sources adds 3 dB, not doubles the dB value. "Two 60 dB sources → 63 dB" is the correct answer. General rule: n equal sources add 10 log(n) dB. (This is very different from 10 log(2×60) = 10 log(120) ≈ 20.8 dB above reference — a meaningless calculation.)

**M2 — "Decibels measure absolute power in watts"**
- Characteristic phrase: "A 90 dB sound has 90 watts of power."
- Probe: "What is the intensity in W/m² of a 60 dB sound?"
- Expected wrong answer: "60 W/m²."
- Recovery: β = 10 log(I/I₀) → I = I₀ × 10^(β/10) = 10⁻¹² × 10^(60/10) = 10⁻¹² × 10⁶ = 10⁻⁶ W/m². A 60 dB sound has intensity 10⁻⁶ W/m² — about one millionth of a watt per square metre. The decibel scale ranges from 0 dB (10⁻¹² W/m²) to ~194 dB (the loudest sound possible in air before the wave becomes a shock wave). The numbers are convenient log-compressed representations of an enormous range — not direct watt readings.

**M3 — "Doubling the distance halves the sound level (intensity drops by half)"**
- Characteristic phrase: "I move from 1 m to 2 m — the sound level drops by half, so by 50 dB."
- Probe: "A point source produces 80 dB at 1 m. What is the level at 2 m?"
- Expected wrong answer: "40 dB — half the distance means half the intensity means half the dB."
- Recovery: at 2 m, the intensity drops by the inverse-square law: I₂ = I₁ × (1/2)² = I₁/4. In decibels, this is a drop of 10 log(4) ≈ 6 dB. The new level is 80 − 6 = 74 dB. Doubling the distance drops the level by 6 dB (factor of 4 in intensity), not by half the dB value. "Halving the intensity" would drop by only 3 dB. The inverse-square law drops intensity by 4× per distance doubling → 6 dB drop.

**M4 — "Louder always means higher intensity at the source"**
- Characteristic phrase: "The ambulance siren at 90 dB must be producing more power than the whisper at 30 dB at any distance."
- Probe: "A 10 W whistle at 0.1 m from your ear, vs. a 1000 W loudspeaker at 1 km away. Which produces higher intensity at your ear?"
- Expected wrong answer: "The loudspeaker — it's producing more power."
- Recovery: intensity = P/(4πr²). Whistle: I = 10/(4π × 0.01) ≈ 80 W/m². Loudspeaker: I = 1000/(4π × 10⁶) ≈ 8×10⁻⁵ W/m². The whistle produces far higher intensity at your ear despite lower total power, because you are much closer. Intensity (at the receiver) depends on both source power and distance — a nearby weaker source can produce higher intensity than a distant stronger source.

---

## Explanation library

**E1 — Why the logarithmic scale (psychoacoustics)**
"The human ear responds to intensity ratios, not intensity differences. A sound that is 10× more intense than another sounds about twice as loud — not 10 times as loud. To go from 'just audible' (0 dB, I = 10⁻¹² W/m²) to 'painfully loud' (120 dB), the intensity increases by 10¹²  — a factor of one trillion. If we used a linear scale, we'd need to say '1,000,000,000,000 units of intensity.' The decibel scale compresses this enormous range into 0–120 — a 120-unit range instead of a 10¹²-unit range. This works because the ear's response is approximately logarithmic — equal dB steps feel like equal loudness steps."

**E2 — Inverse-square law for intensity**
"A point source radiates sound uniformly in all directions. At distance r, the sound is spread over a sphere of area 4πr². All the power P passes through this sphere: I = P/(4πr²). If you move from r to 2r, the area becomes 4π(2r)² = 4 × 4πr² — four times larger. The same power P now spreads over four times the area → intensity drops by factor of 4. In dB: 10 log(1/4) = 10 × (−0.602) ≈ −6 dB. Every doubling of distance drops the intensity by 6 dB."

**E3 — Converting between I, β, and I₀**
"β = 10 log₁₀(I/I₀). To go from dB to intensity: I = I₀ × 10^(β/10). Example: 80 dB: I = 10⁻¹² × 10^8 = 10⁻⁴ W/m². Example: 110 dB: I = 10⁻¹² × 10^11 = 10⁻¹ = 0.1 W/m². Each 10 dB step multiplies I by 10. Each 3 dB step approximately doubles I (since 10^0.3 ≈ 2). Memo: +3 dB ≈ ×2 intensity; +6 dB ≈ ×4 intensity; +10 dB ≈ ×10 intensity; +20 dB ≈ ×100 intensity."

---

## Analogy library

**Primary analogy — The Richter scale for earthquakes**
The Richter scale for earthquake magnitude is also logarithmic: a magnitude 7 earthquake releases roughly 31 times more energy than a magnitude 6 (one unit up = 31× energy). Most people misread the Richter scale as linear — the same error as misreading decibels. The decibel scale is the acoustic Richter scale. Both exist because the phenomena range over many orders of magnitude and human perception is roughly logarithmic. "A 10 dB increase is to the ear what a 1-magnitude increase is to earthquake energy."

**Breaking point**: (1) The Richter scale base is 31× per unit; the decibel scale is 10× per 10 dB (or ~2× per 3 dB) — the bases differ. (2) The Richter scale measures source energy; the decibel scale measures received intensity at the observer (depends on distance). (3) Earthquake energy is radiated through 3D rock — not the same as acoustic waves in air, which have the clean inverse-square law.

**Anti-analogy — "Decibels are like temperature — adding them is like adding temperatures"**
Temperature can be added meaningfully (in some contexts) and is an absolute linear scale (in Kelvin). Decibels cannot be added directly — they are logarithms of ratios. "40 dB + 40 dB" is physically meaningless without converting back to intensity first. Unlike temperature, the decibel value is not a property of the sound alone — it depends on the reference level I₀. This is why "a sound of 80 dB" means a specific intensity ratio (I/I₀ = 10⁸), not a raw power.

---

## Demonstration library

**D1 — Smartphone decibel meter (quantitative)**
Use a free sound level meter app on a smartphone. Measure: (a) ambient noise in the classroom; (b) a whisper at 1 m; (c) a clap at 1 m; (d) a shout at 1 m. Record the dB values. Discuss: "If we use two phones clapping simultaneously, what do you predict the level will be?" (Most predict double — expose M1.) Measure: the combined level is about 3 dB higher. Then discuss M3: move the phone from 1 m to 2 m while someone speaks at a constant level — measure the ~6 dB drop per doubling.

**D2 — Inverse-square law with a buzzer and tape measure**
Place a buzzer or speaker at one end of a long corridor. Measure the dB level at 1 m, 2 m, 4 m, 8 m. Plot β vs. log(r). The graph should be linear with slope −20 dB/decade (i.e., every factor of 10 in r drops β by 20 dB, equivalent to 6 dB per doubling of distance). This gives a quantitative verification of the inverse-square law on the log scale.

**D3 — Frequency-dependent loudness (qualitative)**
Play a sine wave through a speaker at fixed amplitude, sweeping from 20 Hz to 20,000 Hz. The perceived loudness changes dramatically — quiet at low frequencies, loudest around 3–4 kHz, quieter again at very high frequencies. This demonstrates that dB (a physical measure) and loudness (a perceptual measure) are not the same — the ear's sensitivity varies with frequency (Fletcher-Munson curves). A fixed dB at 100 Hz sounds softer than the same dB at 3000 Hz.

---

## Discovery lesson

**Argue for data-first guided discovery**:

The logarithmic nature of the dB scale is best earned from data, not told from a formula. Present this sequence of intensities (W/m²): 10⁻¹², 10⁻¹¹, 10⁻¹⁰, ..., 10⁰ (1 W/m²), corresponding to threshold of hearing to near-pain. Ask: "If we used a linear scale with tick marks at equal intensity intervals of 10⁻¹² W/m², how many tick marks would we need to reach 1 W/m²?" (10¹² = one trillion marks — physically impossible to represent.)

"What mathematical operation converts 10⁻¹², 10⁻¹¹, ..., 10⁰ into 0, 1, 2, ..., 12?" (Take log₁₀.) "So the scale compresses exponential growth into equal steps — the decibel step is 10 times the log₁₀ of the intensity ratio. Why multiply by 10?" (Historical: one bel = log₁₀(I/I₀); one decibel = 0.1 bel → multiply by 10 to avoid decimals in everyday use.)

The discovery sequence: enormous range problem → linear scale fails → logarithm as solution → decibel definition → calibrate with benchmarks.

---

## Teaching actions

**TA1 — Convert to intensity first, then add**: For any problem combining multiple sources, require the learner to: (1) convert each dB value to intensity (I = I₀ × 10^(β/10)), (2) add the intensities numerically, (3) convert back to dB. Never add dB values directly. State: "Decibels do not add — intensities add."

**TA2 — Inverse-square law check**: For every distance-change problem, require: "Did the distance double? Then intensity drops by factor of 4 → level drops by 6 dB." Triple the distance → factor of 9 → drop of 10 log(9) ≈ 9.5 dB. The 6 dB/doubling rule is the most commonly tested relationship.

**TA3 — 10 dB / 3 dB quick conversions**: Require learners to memorise: +10 dB = ×10 intensity; +3 dB ≈ ×2 intensity; −3 dB ≈ ÷2 intensity. These are the working rules for fast estimation without a calculator. State explicitly: "+3 dB is barely noticeable to a listener; +10 dB sounds about twice as loud."

**TA4 — Power vs. intensity distinction**: For every problem, ask: "Are we given total power P (in watts) or intensity I (in W/m²)? If P, what distance is needed to get I?" I = P/(4πr²). Learners who skip this step use total power as intensity and produce answers that are off by factors of thousands.

---

## Voice teaching

> "Intensity is power per unit area. As sound spreads from a point source, the same power covers an ever-expanding sphere: I = P/(4πr²). Double the distance → four times the area → one-quarter the intensity → 6 dB drop. That's the inverse-square law in dB: every doubling of distance costs 6 dB. Not half the dB number — subtract 6."

> "Decibels are logarithmic. β = 10 log(I/I₀). Adding dB values is physically wrong — you must convert to intensity, add, then convert back. Two 60 dB sources together: 63 dB, not 120. Three sources? 60 + 10 log(3) ≈ 60 + 4.8 ≈ 65 dB. Four? 60 + 6 = 66 dB. Doubling the number of sources adds only 3 dB — barely perceptible."

> "The reference level I₀ = 10⁻¹² W/m² is the threshold of human hearing — the faintest sound a young person with perfect hearing can detect in a quiet room. A conversational voice at 1 m is 60 dB: that's 10⁶ times this threshold. Loud music at 100 dB is 10¹⁰ times the threshold. The range of human hearing spans 12 orders of magnitude — which is why the logarithmic scale was invented."

---

## Assessment

**Mastery gate**: The learner can (1) calculate intensity I from power P and distance r; (2) convert between intensity I and sound level β using β = 10 log(I/I₀); (3) apply the inverse-square law (doubling r → 6 dB drop); (4) correctly combine two sources by adding intensities, not decibel values.

**Formative golden probe**
> "A point source emits 50 W of acoustic power. (a) What is the intensity at 5 m? (b) What is the sound level in dB? (c) What is the intensity and sound level at 10 m? (d) Two identical such sources are operated simultaneously at the same location. What is the combined sound level at 5 m?"

- (a): I = 50/(4π × 25) = 50/314 ≈ 0.159 W/m²
- (b): β = 10 log(0.159/10⁻¹²) = 10 log(1.59×10¹¹) ≈ 10 × 11.2 = 112 dB
- (c): at 10 m: I = 50/(4π × 100) ≈ 0.0398 W/m²; β = 10 log(3.98×10¹⁰) ≈ 106 dB (drop of ~6 dB as expected)
- (d): combined I = 2 × 0.159 = 0.318 W/m²; β = 10 log(0.318/10⁻¹²) ≈ 115 dB (original 112 dB + 3 dB = 115 dB — confirms the "two sources → +3 dB" rule)

**Confidence calibration question**
After (d): "Did you predict that two identical sources would give 115 dB rather than 224 dB?" (1–5 confidence). Low confidence → M1 still active; require TA1.

**Delayed retrieval check (48 h / 7 days)**
"A chainsaw at 3 m produces 105 dB. (a) What is the intensity? (b) At what distance would it produce 90 dB? (c) Hearing damage occurs at prolonged exposure to 85 dB. How many times more intense is 90 dB than 85 dB?" (a) I = 10⁻¹² × 10^10.5 = 3.16×10⁻² W/m²; (b) 90 dB is 15 dB below 105 dB → intensity drops by 10^1.5 ≈ 31.6× → distance increases by √31.6 ≈ 5.6 → r = 3 × 5.6 ≈ 17 m; (c) Δβ = 5 dB → ΔI = 10^0.5 ≈ 3.16× more intense at 90 dB than 85 dB.)

---

## Recovery notes

**Failure mode A — M1 (adding decibels)**
Run the calculation from first principles: "What is the intensity at P from source 1?" (I₁.) "What is the intensity from source 2?" (I₂ = I₁.) "What is the total intensity when both play?" (I₁ + I₂ = 2I₁.) "Now convert 2I₁ to dB: β = 10 log(2I₁/I₀) = 10 log(2) + 10 log(I₁/I₀) = 3 + β₁. The answer is β₁ + 3, not 2β₁." Then ask: "What would 2β₁ mean physically?" (β = 10 log(I/I₀) → 2β₁ = 10 log(I/I₀) × 2 → I = I₀ × 10^(2β₁/10) = I₁² / I₀ — which has units of W²/m⁴·(W/m²)⁻¹ = W/m² only if I₀ = 1 — nonsensical. The arithmetic contradiction exposes the error.)

**Failure mode B — M3 (halving intensity drops by half in dB)**
"Intensity drops by factor of 4 at double the distance. In dB: 10 log(I₂/I₁) = 10 log(1/4) = 10 × (−log 4) = 10 × (−0.602) = −6.02 ≈ −6 dB. That's a drop of 6 dB, not half the dB level. If you had 80 dB at 1 m, you don't get 40 dB at 2 m — you get 74 dB. Halving of the dB level would require I₂/I₁ = 10^(−β₁/10) = tiny if β₁ is large — that would require extreme distance, not just double."

**Failure mode C — M2 (dB as absolute watts)**
"β = 10 log(I/I₀). What is I₀?" (10⁻¹² W/m².) "So dB measures I relative to I₀, not I itself. 0 dB does not mean 0 W/m² — it means I = I₀ = 10⁻¹² W/m² (ratio = 1, log = 0). 60 dB means the ratio is 10⁶, so I = 10⁶ × 10⁻¹² = 10⁻⁶ W/m². The dB number is not a power in watts — it is a dimensionless log ratio."

---

## Memory & review

**Memory type**: Formula (β = 10 log(I/I₀), I₀ = 10⁻¹² W/m²) + inverse-square law (6 dB per distance doubling) + quick conversions (+3 dB = ×2 intensity, +10 dB = ×10 intensity) + combination rule (add intensities, not dB values).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "A sound has intensity 10⁻⁸ W/m². What is the sound level in dB?"
- "A source produces 70 dB at 4 m. What level at 8 m?"
- "Two identical machines each produce 80 dB. When both run, what is the combined level?"
- "What intensity in W/m² corresponds to 100 dB?"

**Interleaving**: After mastery, mix sound intensity problems with wave-speed problems (v = fλ) and Doppler problems. Learners must distinguish: intensity (amplitude² effect) from frequency (oscillation rate). Also interleave with optics intensity problems — the inverse-square law and the formula I = P/(4πr²) apply equally to light sources (illuminance problems).

---

## Transfer map

**Immediate transfers**:
- `phys.wave.doppler-effect` (related, same prerequisite): Doppler changes frequency; intensity changes with distance — two independent properties of a sound wave that learners should learn to analyse separately

**Downstream transfers**:
- Engineering acoustics: room reverberation (T₆₀ = 0.161V/Aᾱ), noise control (attenuation materials), speaker placement (inverse-square law guides)
- Signal processing: the dB scale is universal in electronics (amplifier gain, signal-to-noise ratio, filter attenuation) — exactly the same formula as acoustic dB

**Cross-subject transfers**:
- Biology — auditory system: the human ear's basilar membrane responds differently to frequencies (cochleotopic map); the frequency-dependent sensitivity (Fletcher-Munson curves) is the physiological basis for why the A-weighting filter (dBA) is used for noise regulation — it de-emphasises low and very high frequencies to match the ear's actual response
- Environmental science — noise pollution standards: WHO guidelines use dBA; the logarithmic nature means that reducing traffic noise from 80 dBA to 70 dBA is not a "10 unit" improvement but a tenfold intensity reduction (and about twice as loud subjectively) — critical for policy interpretation

---

## Curriculum feedback

The KG description "sound intensity is power per unit area; the decibel scale logarithmically measures intensity relative to a reference level" is accurate and complete in scope.

One gap: the KG description does not state the reference level I₀ = 10⁻¹² W/m². Without this, the formula β = 10 log(I/I₀) cannot be applied. The reference level is the single numerical fact that anchors the entire scale and should be an explicit learning outcome.

A second gap: the KG description does not mention the inverse-square law for a point source (I = P/4πr²). This is the primary application of intensity in wave physics problems — the relationship between source power, distance, and received intensity. It should appear in the learning outcomes alongside the dB formula.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

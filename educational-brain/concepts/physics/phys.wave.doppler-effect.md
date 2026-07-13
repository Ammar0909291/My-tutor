# Doppler Effect — `phys.wave.doppler-effect`

## Identity

- **Concept ID**: `phys.wave.doppler-effect`
- **Display name**: Doppler Effect
- **Domain**: waves
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 4
- **Requires**: `phys.wave.sound-waves`
- **Unlocks**: (none in this KG — but provides the conceptual foundation for spectroscopy, radar, medical ultrasound, and cosmological redshift)
- **Load-bearing prerequisite content**:
  - From `phys.wave.sound-waves`: sound is a longitudinal pressure wave with frequency f (pitch), wavelength λ, and speed v = fλ; frequency is the number of complete cycles per second; pitch (perceived) is determined by the frequency arriving at the ear; the speed of sound in air is ~343 m/s at 20 °C and does NOT depend on the frequency.
  - The Doppler effect is a change in the number of wavefronts arriving per second at the observer — not a change in the speed of sound. The distinction between speed (medium property, fixed) and frequency (observer's reception rate, changed by motion) is the key conceptual load from the prerequisite.

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: When an ambulance with its siren on comes toward you, the pitch sounds higher than when it passes and moves away. This is the Doppler effect — the apparent frequency of a wave changes when the source or observer is moving. The siren itself hasn't changed; it's your position relative to the moving source that changes what you hear.

**Stage 2 — Intermediate**: The observed frequency f' depends on the speed of the source (v_s) and observer (v_o) relative to the speed of sound (v):

f' = f × (v ± v_o) / (v ∓ v_s)

Sign convention: upper signs (+ numerator, − denominator) when the observer/source moves toward each other (increasing frequency); lower signs when moving apart (decreasing frequency). Physical explanation: a moving source compresses the wavefronts ahead of it (shorter λ, higher f') and stretches them behind (longer λ, lower f'). A moving observer intercepts more (or fewer) wavefronts per second depending on direction. The speed of sound in the medium is unchanged by the motion of source or observer.

**Stage 3 — Advanced**: The Doppler formula above is for sound (waves in a medium). For electromagnetic waves (light, radio) there is no preferred medium; only the relative velocity v_rel between source and observer matters. The relativistic Doppler formula: f' = f × √((1 − β)/(1 + β)) for recession (β = v_rel/c) — applies to all speeds, including relativistic ones. At low speeds (v_rel << c): f' ≈ f × (1 − v_rel/c) (recession) — the approximation matching the classical sound formula. Redshift z = Δλ/λ = (f − f')/ f' (for recession). Cosmological redshift: z of 1 means the universe has expanded by a factor of 2 since the light was emitted (not exactly a Doppler shift but a metric expansion, though the formulas are related at low z).

**Stage 4 — Expert / University**: The covariant 4-vector treatment: the 4-momentum of a photon is (E/c, **p**) = (hf/c)(1, n̂). Under a Lorentz boost along the n̂ direction: f' = f γ(1 − β cosθ), where θ is the angle between the photon direction and the boost. At θ = 90°: transverse Doppler effect f' = f/γ (time dilation — no classical analogue). This is pure time dilation: a moving clock runs slow, so a moving source emits photons at a lower rate in the rest frame. Observable with atomic clocks on fast jets (confirmed experimentally). Radar Doppler: reflected signal has double the Doppler shift (both transmission and reception are shifted) — used in weather radar, police speed guns, and blood-flow measurement.

**Model versioning**: Stage 2 (the acoustic Doppler formula) is the operative model for all secondary-level problems. Stage 3 (relativistic/EM Doppler, redshift) is needed for astronomy and cosmology. Stage 4 is university special relativity.

---

## Why beginners fail

The dominant root cause is **"moving source changes the speed of sound"**: learners think the Doppler effect occurs because the source "pushes" the waves faster in the forward direction — that the wavefronts travel faster ahead of a moving ambulance than behind it. This is wrong: the speed of sound is determined by the medium (air properties), not by the source motion. What actually changes is the wavelength (wavefronts are compressed ahead, stretched behind), and because v = fλ with v fixed, the frequency changes. Learners who believe speed changes cannot correctly apply the Doppler formula and produce systematic errors.

The secondary root cause is **sign confusion in the Doppler formula**: the formula f' = f(v ± v_o)/(v ∓ v_s) has signs that reverse for numerator and denominator, and learners memorize the signs without understanding them. When the source approaches (v_s in denominator: subtract to make denominator smaller → f' increases), and when observer approaches (v_o in numerator: add to make numerator larger → f' increases). Without this physical grounding, any problem with an unusual geometry (source moving away, observer moving toward) produces sign errors.

---

## Misconception library

**M1 — "The moving source makes the sound travel faster in front of it"**
- Characteristic phrase: "The ambulance is moving forward, so the sound in front of it moves at 343 + v_s m/s."
- Probe: "An ambulance (v_s = 30 m/s) moves toward you. What is the speed of the sound reaching you?"
- Expected wrong answer: "343 + 30 = 373 m/s — the ambulance pushes the sound forward."
- Recovery: the speed of sound in air is ~343 m/s regardless of source motion. Sound speed is determined by the air temperature and pressure — not by the source. What changes when the ambulance moves forward: the wavefronts it emits are compressed ahead (shorter λ in front). Since v = fλ and v is fixed, shorter λ means higher f' — higher pitch heard by the observer ahead. The ambulance moves into the space where the previous wavefront was emitted, reducing the distance between successive wavefronts. This is a wavelength compression, not a speed increase.

**M2 — "The Doppler effect only occurs when the source is moving (not when the observer moves)"**
- Characteristic phrase: "If the ambulance is stationary and I run toward it, the pitch doesn't change — I'm not moving the sound."
- Probe: "A stationary siren emits 440 Hz. You run toward it at 10 m/s (speed of sound = 343 m/s). What frequency do you hear?"
- Expected wrong answer: "440 Hz — the source isn't moving, so no Doppler shift."
- Recovery: the Doppler effect occurs for both source motion and observer motion. When you run toward a stationary source, you intercept more wavefronts per second than if you were stationary — the wavefronts aren't compressed (λ unchanged), but you're sweeping through them faster. f' = f × (v + v_o)/v = 440 × (343 + 10)/343 = 440 × 353/343 ≈ 453 Hz. The effect is real and asymmetric: equal source speed and equal observer speed produce slightly different f' values (because source motion changes λ while observer motion changes the rate of interception).

**M3 — "The pitch changes continuously as the source moves (not just at the moment of passing)"**
- Characteristic phrase: "As the ambulance approaches, the pitch gets continuously higher and higher until it passes."
- Probe: "An ambulance moves toward you at constant speed with its siren on. As it approaches, does the pitch: (A) gradually increase, (B) stay constant until it passes, or (C) suddenly drop when it passes?"
- Expected wrong answer: "(A) gradually increases as the ambulance gets closer."
- Recovery: the pitch is constant (at a high value f') as long as the ambulance approaches at constant speed. The pitch does NOT gradually increase — the Doppler shift depends only on the speed of the source, not on the distance. When the ambulance is far away, the wavefronts arrive at the same f' as when it is close — the compression is the same throughout constant-velocity approach. The pitch suddenly drops when the ambulance passes (switching from approach to recession) — not a gradual change.

**M4 — "Doppler effect applies only to sound, not to light or other waves"**
- Characteristic phrase: "Doppler is for sound — light doesn't do that, it always travels at c."
- Probe: "Police radar bounces radio waves off your car. How does the radar gun measure your speed?"
- Expected wrong answer: "Radar measures time, not frequency — Doppler doesn't apply to light or radio."
- Recovery: the Doppler effect applies to all waves — sound, light, radio, ultrasound. For electromagnetic waves, the relativistic formula applies, but at everyday speeds (v << c) the classical approximation f' ≈ f(1 ± v/c) is accurate. Police radar sends radio waves at a fixed frequency; the moving car reflects them at a Doppler-shifted frequency; the gun measures the frequency difference Δf = 2v_car × f/c (double shift: both transmission and reception are shifted). Astronomical redshift (galaxies moving away → light redshifted → z = Δλ/λ) is the EM Doppler effect at cosmic scales.

---

## Explanation library

**E1 — Why the wavelength compresses ahead (physical picture)**
"Imagine a stationary source emitting one wavefront per second. Each wavefront expands as a sphere — adjacent wavefronts are 1 wavelength apart. Now the source moves forward. When the next wavefront is emitted, the source has moved into the space where the previous wavefront was. The new wavefront starts closer to the previous one in the forward direction — the wavelength in front is compressed. Behind, the source has moved away from where the previous wavefront was emitted — the wavelength behind is stretched. Speed of sound: unchanged (air doesn't know the source is moving). Compressed λ + fixed v → higher f (f = v/λ). Stretched λ + fixed v → lower f. No speed change; only wavelength and therefore frequency change."

**E2 — Deriving the Doppler formula from wavelength compression**
"Source moving at v_s toward stationary observer. In time T (one period), the source emits one wavefront and moves forward by v_s T. The wavefront travels forward by vT. The gap between this wavefront and the previous one is λ' = vT − v_s T = (v − v_s)T = (v − v_s)/f. Since f' = v/λ' = v/((v − v_s)/f) = f × v/(v − v_s). With observer also moving: multiply numerator by (v + v_o). Full formula: f' = f(v + v_o)/(v − v_s) for approach. Sign rules: approach → top sign (both); recession → bottom sign (both)."

**E3 — The bat/SONAR application**
"A bat emits ultrasound at 40,000 Hz. An insect flies toward the bat at 3 m/s; the bat flies toward the insect at 5 m/s. Speed of sound: 343 m/s. What frequency echo does the bat hear? Step 1: frequency of the bat's call reaching the insect: the bat (source) moves toward the insect (observer): f₁ = 40,000 × (343 + 3)/(343 − 5) = 40,000 × 346/338 ≈ 40,946 Hz. Step 2: the insect reflects f₁ as a 'source'; the bat is now the 'observer': f₂ = 40,946 × (343 + 5)/(343 − 3) = 40,946 × 348/340 ≈ 41,910 Hz. The bat's auditory system computes the ratio f₂/f_emitted and extracts the target's closing speed."

---

## Analogy library

**Primary analogy — Boat in water producing bow waves**
A stationary boat emits water waves equally in all directions — circular ripples, equally spaced. A moving boat piles up the wave crests ahead of it (closer together — shorter wavelength) and leaves them stretched out behind (longer wavelength). The wave speed in water doesn't change — only the spacing (wavelength) changes, because the source is moving into the space where the previous wave was generated. Light and sound do exactly the same — just in three dimensions with non-visible wavefronts.

**Breaking point**: (1) A fast-enough boat exceeds the wave speed → a shock wave (bow wave) forms. The sonic equivalent is a sonic boom (Mach cone). The Doppler formula breaks down at v_s = v (denominator = 0, infinite frequency ahead — actually a shock wave forms instead). (2) Water waves are mechanical; the speed of water waves depends on the medium; the Doppler formula for water and sound is the same classical formula, but for light (no medium), the relativistic formula must be used. (3) The boat analogy helps with "source moving, stationary medium" intuition but doesn't directly address the "observer moving, stationary source" case.

**Anti-analogy — "Doppler is a sound-volume effect (louder when close)"**
Volume (intensity) does change with distance — an approaching ambulance gets louder — but that's a separate effect from pitch (frequency change). The Doppler effect is purely about frequency, not amplitude. A source moving at constant speed toward a stationary observer: the frequency f' is constant throughout the approach (same compressed wavelength all along) but the loudness increases as 1/r² (inverse-square law for intensity). A learner who conflates Doppler with loudness confuses two independent effects: Doppler is about counting wavefronts per second (frequency); loudness is about the energy per unit area (intensity).

---

## Demonstration library

**D1 — Whirling buzzer (qualitative)**
Tie a small buzzer (or phone playing a steady tone) to a string and whirl it in a circle around your head. Students listening hear a periodic pitch change — high as it approaches, low as it recedes. The pitch is not gradually changing; it is approximately constant during each approach phase and drops as the source passes closest. This directly verifies M3: the pitch is constant for constant speed, not increasing throughout approach.

**D2 — Moving speaker and microphone + oscilloscope**
Move a speaker emitting a fixed-frequency tone (e.g., 440 Hz) toward a stationary microphone. Display the received signal on an oscilloscope or spectrum analyzer. The observed frequency is higher than 440 Hz while approaching, drops suddenly as the speaker passes, and is lower while receding. Measure the frequency difference; compute v_s from f' = f × v/(v − v_s). Compare computed v_s to the actual speed (measured with a ruler and timer).

**D3 — Doppler ultrasound (video)**
Show a clip of medical Doppler ultrasound measuring blood flow velocity in an artery. The ultrasound transducer emits a fixed frequency; the returning signal is Doppler-shifted by the moving blood cells. The frequency shift Δf = 2v_blood cosθ × f/c (where θ is the angle between the beam and blood flow direction). The device displays blood velocity as a colour or velocity-time graph. This shows the EM/ultrasound Doppler effect in a direct medical application and links to M4's resolution.

---

## Discovery lesson

**Argue for phenomenon-first, equation-second**:

Begin with D1 (whirling buzzer) or a recording of an ambulance passing. Ask: "Describe what you heard. Did the pitch change? How?" (Yes — high approaching, drops as it passes, lower receding.) "Did the siren's frequency change?" (No — same siren throughout.) "So what changed?"

Guide to the key question: "Imagine being the air. The ambulance is emitting wavefronts. As it moves toward you, where does each successive wavefront start — in the same place or closer to you?" (Closer — the ambulance has moved forward.) "So what happens to the spacing between wavefronts ahead of the ambulance?" (Compressed.) "And the number of wavefronts per second reaching your ear?" (More — higher frequency.)

The physical picture (wavefront compression) is the discovery. The formula is then the quantification of the picture: f' = f × v/(v − v_s) for approach (smaller denominator → larger f').

---

## Teaching actions

**TA1 — Speed-of-sound invariance check**: Before any Doppler calculation, ask: "Is the speed of sound changed by the motion of the source or observer?" (No — always ~343 m/s in still air, determined by medium properties.) This pre-empts M1 systematically.

**TA2 — Physical-picture narrative before formula**: For every Doppler problem, require the learner to first describe: "Who is the source? Who is the observer? Are they approaching or receding? What happens to the wavefront spacing ahead of the source?" Then write the formula with the correct signs. This prevents rote sign-plugging errors.

**TA3 — Sign rule from physical picture**: Approaching source: wavefronts compressed → smaller λ → higher f'. Denominator must be SMALLER than v → subtract v_s. Receding source: stretched wavefronts → larger λ → lower f'. Denominator must be LARGER → add v_s. The sign choice follows from the physical outcome (higher/lower f') — not from memorizing which sign goes where.

**TA4 — Constant-speed pitch constancy check**: For every problem where the source moves at constant speed, verify: "Does the pitch gradually change during approach?" (No — constant throughout approach at f'_approach, then constant throughout recession at f'_recession. It only changes at the moment of passing.)

---

## Voice teaching

> "The Doppler effect: moving source or observer changes the apparent frequency, not the wave speed. The ambulance's sound always travels at 343 m/s through the air. What changes: the spacing between wavefronts. Ahead of the moving ambulance, each new wavefront starts closer to the previous one — compressed wavelength, same wave speed, higher frequency. Behind: stretched wavelength, lower frequency. f' = f × v/(v − v_s) for approach."

> "The pitch doesn't gradually rise as the ambulance approaches — it's constant during the approach phase (constant speed → constant compression). It drops suddenly as the ambulance passes. That drop is the Doppler shift from approach-frequency to recession-frequency — one discrete step, not a gradual slide."

> "The Doppler effect works for all waves. Police radar, medical ultrasound, astronomical redshift — all use the same principle: motion between source and observer changes the received frequency. For light at everyday speeds, the shift is tiny (v << c), but measurable. The universe's expansion was discovered because galaxy light is redshifted — the galaxies are moving away, stretching the light wavelengths."

---

## Assessment

**Mastery gate**: The learner can (1) explain qualitatively why a moving source compresses or stretches wavefronts (without appealing to a speed change); (2) correctly apply f' = f(v ± v_o)/(v ∓ v_s) with the correct sign choice from the physical picture; (3) state that the wave speed is determined by the medium, not the source motion; (4) state that the Doppler effect applies to all wave types (sound, EM).

**Formative golden probe**
> "A train moving at 25 m/s approaches a stationary observer. The train's whistle emits 800 Hz. Speed of sound = 343 m/s. (a) What frequency does the observer hear? (b) After the train passes, what frequency does the observer hear? (c) A second scenario: the train is stationary and the observer runs toward the train at 25 m/s. What frequency is heard? (d) Compare (a) and (c) — are they the same? Why or why not?"

- (a): f' = 800 × 343/(343 − 25) = 800 × 343/318 ≈ 863 Hz (source approaching)
- (b): f' = 800 × 343/(343 + 25) = 800 × 343/368 ≈ 745 Hz (source receding)
- (c): f' = 800 × (343 + 25)/343 = 800 × 368/343 ≈ 858 Hz (observer approaching stationary source)
- (d): Not the same: 863 Hz (a) vs. 858 Hz (c). Source motion compresses wavelengths; observer motion increases interception rate — different physical mechanisms producing slightly different results. (At low speeds relative to v, the approximation gives f' ≈ f(1 ± u/v) for both, so they are approximately equal — but not exactly.)

**Confidence calibration question**
After (d): "Did it surprise you that (a) and (c) are different, even though the relative speed is the same?" (1–5). If surprised → the asymmetry between source and observer motion (medium-referenced frame for sound) is worth explicitly revisiting.

**Delayed retrieval check (48 h / 7 days)**
"Why does the light from distant galaxies appear redshifted? What does this tell us about the universe?" (Galaxies recede → light wavelengths stretched → redshifted; the more distant the galaxy, the greater the recession speed and redshift → universe is expanding. Hubble's law: z ≈ v_recession/c = H₀ d/c.)

---

## Recovery notes

**Failure mode A — M1 persists (sound travels faster from moving source)**
Draw two scenarios side by side: (A) source stationary — sound emitted at 343 m/s in all directions; (B) source moving forward at v_s — sound emitted at 343 m/s in all directions from the new position. "In both cases, what is the speed of the newly emitted sound?" (343 m/s in both.) "Then what is different in scenario B?" The position of the new emission point has moved — the wavefront was emitted closer to the previous wavefront in the forward direction. The wavelength (spacing) changes; the speed does not. Draw the compressed wavefronts in front and stretched ones behind — the picture makes the mechanism visible.

**Failure mode B — Sign confusion in formula**
Abandon formula memorization. Return to the physical picture: "Approaching source: frequency goes up or down?" (Up.) "So the formula must give f' > f. For this to happen with f' = f × v/(v − v_s), what sign makes the denominator smaller?" (Minus.) "Receding: frequency down. Denominator must be bigger." (Plus.) The sign follows from the expected direction of the effect — the formula is the quantification of the physics, not a symbol to memorize.

**Failure mode C — M3 (pitch gradually increases during approach)**
Play or simulate D1 (whirling buzzer). Ask: "During the half-cycle when the source approaches at constant speed — does the pitch rise, fall, or stay constant?" Have the learner listen carefully. The pitch is constant (not rising) during constant-speed approach. "Now — the formula f' = fv/(v − v_s): is v_s changing during constant-speed approach?" No. "Is v changing?" No. "Is f changing?" No. "Then is f' changing?" No. The formula predicts constant pitch, consistent with the observation.

---

## Memory & review

**Memory type**: Physical mechanism (wavefront compression/stretching) + formula (f' = f(v ± v_o)/(v ∓ v_s)) + sign rule from physical outcome + speed-invariance principle + applications (radar, ultrasound, redshift).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "Why does a moving ambulance sound higher-pitched as it approaches? Answer without using the formula."
- "Write the Doppler formula. Which sign gives a higher frequency? Which lower?"
- "Does a moving source change the speed of sound in front of it? Explain."
- "A source moves toward you at 20 m/s emitting 500 Hz. Speed of sound = 340 m/s. What do you hear?"

**Interleaving**: After mastery, interleave Doppler problems with wave-speed problems (v = fλ). Learners must distinguish: v changes when medium changes (wave speed problem); v does NOT change in Doppler problems (medium unchanged). Also interleave with redshift problems to practise the EM Doppler approximation (Δf/f ≈ v_rec/c).

---

## Transfer map

**Immediate transfers**:
- `phys.wave.sound-waves` (prerequisite, reinforced): f = v/λ and v = fλ — the Doppler effect is the quantitative consequence of λ compression with fixed v
- Speed-of-sound: v_sound = √(γRT/M) — confirms that v is a property of the medium (temperature and gas type), not the source

**Downstream transfers**:
- Sonar and echolocation: bat/dolphin sonar uses double Doppler shift (emitted frequency shifted by prey motion, reflected frequency shifted again by bat/dolphin motion); the frequency difference encodes target speed
- Radar (police, weather, air traffic control): EM Doppler shift Δf = 2v cosθ × f/c; weather Doppler radar images wind velocity from frequency shifts
- Medical Doppler ultrasound: blood flow velocity from frequency shift — non-invasive, real-time

**Cross-subject transfers**:
- Astronomy — stellar spectroscopy: Doppler broadening of spectral lines in hot stars (atoms moving at thermal speeds → each atom Doppler shifts the line slightly → the ensemble produces a broadened line; width gives temperature)
- Cosmology — Hubble's law: recession velocity from redshift z ≈ v/c → Hubble constant H₀; the age of the universe estimated from 1/H₀; the Doppler effect is the observational foundation of modern cosmology

---

## Curriculum feedback

The KG description "the Doppler effect is the change in observed frequency due to relative motion between source and observer" is correct.

One gap: the KG description says "relative motion" — but for sound (a wave in a medium), it is NOT just the relative motion that matters; the formula is asymmetric (source motion and observer motion at the same speed give different f' values because the medium provides a preferred reference frame). The distinction between sound Doppler (medium reference, asymmetric) and EM Doppler (relative motion only, symmetric) is important and should be acknowledged.

A second gap: the KG description does not mention the key principle that wave speed is unchanged by source/observer motion. This principle is the most common failure point (M1) and should be stated explicitly: the Doppler effect changes the observed frequency and wavelength; it does not change the wave speed.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

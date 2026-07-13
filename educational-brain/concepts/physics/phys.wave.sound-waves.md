# Sound Waves — `phys.wave.sound-waves`

## Identity

- **Concept ID**: `phys.wave.sound-waves`
- **Display name**: Sound Waves
- **Domain**: waves
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 3
- **Requires**: `phys.wave.wave-properties`
- **Unlocks**: `phys.wave.doppler-effect`, `phys.wave.sound-intensity`
- **Load-bearing prerequisite content**:
  - From `phys.wave.wave-properties`: v = fλ and all five wave parameters; that the medium determines wave speed; that frequency is set by the source
  - Teaching note: `phys.wave.longitudinal-waves` (if taught first) gives the physical framework for compressions and rarefactions; if sound is the learner's FIRST longitudinal wave, the compression/rarefaction picture must be built from scratch here

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Sound is produced by a vibrating object (a speaker, a guitar string, vocal cords). The vibration pushes air molecules, which push the next set, creating a disturbance that travels outward. Your ears detect the disturbance and your brain interprets it as sound. No air → no sound (space is silent).

**Stage 2 — Intermediate**: Sound is a longitudinal mechanical wave: particle displacement is parallel to the direction of propagation. The wave travels as alternating compressions (high pressure) and rarefactions (low pressure) through a medium. Pitch corresponds to frequency; loudness corresponds to amplitude (and intensity). Speed in air at 20 °C is approximately 343 m/s; it increases with temperature (~0.6 m/s per °C) and varies with medium (faster in liquids and solids). Audible range: 20 Hz – 20 kHz for humans. Infrasound < 20 Hz; ultrasound > 20 kHz.

**Stage 3 — Advanced**: Speed of sound in an ideal gas: v = √(γRT/M), where γ is the adiabatic index, R is the gas constant, T is absolute temperature (Kelvin), M is molar mass. In fluids generally: v = √(B/ρ). Speed depends on temperature (not pressure at constant density). Intensity (power per unit area): I = P/(4πr²) for a point source in 3D (inverse square law). Decibel scale: β = 10 log₁₀(I/I₀), with I₀ = 10⁻¹² W/m² (threshold of hearing). Resonance in pipes: standing waves form at specific frequencies depending on pipe length and open/closed ends.

**Stage 4 — Expert / University**: The acoustic wave equation: ∇²p = (1/c²) ∂²p/∂t². Acoustic impedance Z = ρc; reflection coefficient at a boundary R = (Z₂ − Z₁)²/(Z₂ + Z₁)². Nonlinear acoustics (shock waves, sonic booms) arise when wave amplitude is comparable to the medium's equilibrium state. The phonon is the quantum of sound in condensed matter.

**Model versioning**: Stage 2 is the operative model for secondary-level problems. Stage 3 is needed before the Doppler effect, intensity, and resonance. Stage 4 is university acoustics.

---

## Why beginners fail

The dominant root cause is **sound-as-particles misconception**: learners think sound "carries" air molecules from the source to the receiver. They imagine a puff of air leaving the speaker and entering the ear. This model predicts that sound would push you backward (it does not, significantly), that sound in a closed room would deplete the air (it does not), and that you could see wind from a loudspeaker (you cannot, for ordinary sound). The molecules oscillate in place; only the disturbance travels.

The secondary root cause is **pitch-loudness conflation at the wave level**: learners know that high notes are different from loud notes in everyday experience, but cannot link this to frequency vs. amplitude at the wave level. They sometimes claim "high-pitched sounds travel faster."

---

## Misconception library

**M1 — "Sound carries air from the source to the listener"**
- Characteristic phrase: "You hear it because the speaker pushes air into your ear."
- Probe: "If you speak in a closed room, does the air gradually thin out as your words travel to the listener?"
- Expected wrong answer: "Yes, some air must travel to the listener for them to hear."
- Recovery: air molecules oscillate in place. The disturbance (pattern of compressions and rarefactions) travels. A molecule near the speaker moves forward a tiny bit, compressing the next molecule, then returns to its equilibrium position. No net transport of air molecules occurs; only the compression pattern travels. Demonstration: burning incense in a closed room — the smoke drifts by convection (not by sound), and the fragrance spreads independently of where the sound is.

**M2 — "High-pitched sounds travel faster than low-pitched sounds"**
- Characteristic phrase: "High notes reach you sooner than low notes because they vibrate faster."
- Probe: "A concert has instruments playing both 200 Hz and 2000 Hz tones simultaneously. Which arrives at the back of the hall first?"
- Expected wrong answer: "The 2000 Hz tone, because it vibrates faster."
- Recovery: in a given medium at a given temperature, all sound travels at the same speed regardless of frequency. Both 200 Hz and 2000 Hz arrive simultaneously (in the absence of dispersion). Speed is set by the medium (density and elasticity), not by frequency. Higher frequency means shorter wavelength (v = fλ with v fixed) but not higher speed.

**M3 — "Sound cannot travel through solids"**
- Characteristic phrase: "Sound travels through air; it's blocked by walls and doors."
- Probe: "Press your ear against a door. Can you hear sound better or worse than with your ear away from the door?"
- Expected wrong answer: "You'd hear less — the solid blocks sound."
- Recovery: sound (a longitudinal wave) travels through solids — often better than through air, because solids have higher bulk modulus and transmit sound faster. You DO hear better through the door than around it. Walls and doors attenuate sound (reduce amplitude/intensity) but do not block it categorically. True acoustic isolation requires mass and damping, not just a solid layer.

**M4 — "Ultrasound and infrasound are not 'real' sound"**
- Characteristic phrase: "Ultrasound is a different kind of wave — it's not really sound."
- Probe: "A dog whistle produces ultrasound at 25,000 Hz. Is this a sound wave? Does it obey v = fλ?"
- Expected wrong answer: "Ultrasound is different; it's not a sound wave in the normal sense."
- Recovery: ultrasound (> 20 kHz) and infrasound (< 20 Hz) are sound waves — longitudinal pressure waves in a medium — at frequencies outside the human audible range. They obey all the same wave equations. The distinction is perceptual (humans can't hear them), not physical. Ultrasound is used in medical imaging; infrasound is produced by earthquakes and detected by animals.

---

## Explanation library

**E1 — The compression-rarefaction propagation story**
"A speaker diaphragm vibrates 440 times per second (A note). Each forward push compresses nearby air molecules (a compression). The compression passes that energy to the next layer of molecules, then the next — the compression zone travels forward. Each backward pull of the diaphragm creates a rarefaction (low-pressure zone) that follows. This alternating pattern of high-pressure and low-pressure zones travels at 343 m/s through air. When it reaches your eardrum, the eardrum vibrates 440 times per second in response — you hear the A note."

**E2 — Speed of sound temperature dependence (practical)**
"Speed of sound in air ≈ 331 + 0.6 T_C m/s, where T_C is temperature in Celsius. At 20 °C: v ≈ 343 m/s. At 0 °C: v ≈ 331 m/s. Warmer air = faster sound. This is because warmer molecules move faster and transmit collisions more quickly. At constant density, temperature controls v — pressure alone does not (at constant T, higher pressure compresses the gas but also increases density proportionally, and the two effects cancel)."

**E3 — The audible frequency range and its extremes**
"Human ears respond to ~20 Hz – 20 kHz. Middle A (440 Hz) has wavelength λ = 343/440 ≈ 0.78 m. A 20 Hz bass note: λ = 343/20 = 17.15 m (longer than a bus). A 20 kHz whistle: λ = 343/20000 ≈ 0.017 m (17 mm, about the diameter of a 1 cent coin). Low pitch = long wavelength; high pitch = short wavelength. Ultrasound medical probes at 10 MHz give λ ≈ 0.15 mm in tissue — small enough to image fine anatomical structures."

---

## Analogy library

**Primary analogy — The Newton's cradle**
In Newton's cradle, a ball strikes one end; the impulse travels through the stationary balls and kicks the ball at the other end. No ball travels from one end to the other — only the disturbance does. Sound is the same: the air molecule near the speaker gets hit, passes the impulse to the next, and returns to rest. The sound "message" travels; the air molecules stay put.

**Breaking point**: Newton's cradle involves contact collisions of macroscopic balls; sound propagation involves molecular-level compressions in a continuous medium. The balls in Newton's cradle oscillate only twice (once each direction) per strike; in a sound wave, molecules oscillate continuously at the source frequency. The analogy is useful only for the "disturbance travels, medium stays" principle.

**Anti-analogy — "Sound is like throwing something"**
Sound is not like throwing a ball or puffing air at someone. A thrown ball travels from source to receiver; air molecules in sound do not. Framing sound as "sending" air molecules leads directly to M1 and all downstream errors about sound in space, in closed rooms, and directional behaviour.

---

## Demonstration library

**D1 — Bell jar vacuum demonstration**
Place a ringing electric bell (or buzzing phone) inside a jar connected to a vacuum pump. Pump out the air; the sound fades and eventually (near-vacuum) becomes inaudible even though the bell is still vibrating visibly. Restore the air: the sound returns. This directly demonstrates that sound requires a medium — it is not an electromagnetic wave that travels through vacuum.

**D2 — Tuning fork and water surface**
Strike a tuning fork and touch its tine to the surface of water in a cup: the water is sprayed (tine vibrates rapidly). Now hold the tuning fork near your ear: you hear the note. This shows that the same mechanical vibration that disturbs water also disturbs air, producing sound — the sound is the vibrational disturbance propagating through the medium.

**D3 — Thunder-lightning timing**
A lightning strike produces both light and sound simultaneously. Light arrives nearly instantaneously (3 × 10⁸ m/s); sound takes ~3 seconds per km. Count seconds between flash and thunder; divide by 3 to estimate distance in km. This makes the finite speed of sound tangible and memorable, and connects v = fλ to a real-world measurement.

**D4 — Frequency and pitch: variable frequency generator**
Connect a speaker to a signal generator. Sweep from 20 Hz to 20 kHz. Learners observe: (a) below 20 Hz — they feel the vibration but don't hear a pitch; (b) 20–20,000 Hz — audible range; (c) above 20 kHz — inaudible. Then change only the amplitude at a fixed frequency: pitch unchanged, loudness changes. This cleanly separates frequency (pitch) from amplitude (loudness).

---

## Discovery lesson

**Argue for guided discovery on the core structure, direct instruction on speed formula**:

Present the question: "What is sound — a substance that leaves the speaker, or a pattern that travels through the air?" Place a lit candle near a speaker playing a bass note. If sound were air moving, the candle would flicker strongly. (It does flicker slightly for very loud bass — but far less than you'd expect for "air moving at 343 m/s.") This challenges M1 as a direct empirical test. Follow with Newton's-cradle analogy.

For v = √(γRT/M): this is not discoverable from everyday experience. Present it as a theoretical result, derive the temperature dependence qualitatively (warmer molecules = faster impulse transfer), and confirm with the D3 measurement.

---

## Teaching actions

**TA1 — "No medium, no sound" gate**: For any sound problem, ask first: "What is the medium?" If "vacuum" — no sound propagates. This prevents the common error of applying sound equations to situations in space.

**TA2 — Pitch vs. loudness two-arrow diagram**: For every sound description, require two labels: "frequency = ___ Hz (determines pitch)" and "amplitude = ___ Pa or m (determines loudness)." Never let a learner conflate the two.

**TA3 — Speed invariance confirmation**: Before any calculation involving two simultaneous sounds, confirm: "Both travel at the same speed in the same medium. The higher-frequency one has a shorter wavelength, not a higher speed."

**TA4 — Frequency range check**: Whenever a frequency is given for sound, require: "Is this in the audible range? If not, is it ultrasound or infrasound?" This builds the frequency-range intuition and addresses M4.

---

## Voice teaching

> "Sound is a longitudinal mechanical wave — the air molecules don't travel from the speaker to your ear. The disturbance does. Think of Newton's cradle: the ball at one end gets hit, the impulse travels across the stationary balls, and the ball at the other end swings. No ball travelled from end to end. Sound is exactly that: each air molecule nudges the next, and the nudge — the pattern of compressions and rarefactions — travels at 343 m/s. The air molecules stay in roughly the same place."

> "Higher pitch means higher frequency — more compressions per second reaching your eardrum. Louder sound means larger amplitude — more extreme pressure variations. These are completely independent: you can have high-pitched and quiet, or low-pitched and loud. And critically: all pitches travel at the same speed in the same medium. High-frequency sounds do not travel faster."

> "Sound in space: there is no sound in space because there is no medium. The explosions in space movies are false — in a vacuum, mechanical waves have no medium to propagate through. Only electromagnetic waves (light, radio) can travel through space. This is why you can see distant galaxies but not 'hear' them."

---

## Assessment

**Mastery gate**: The learner can (1) describe sound as a longitudinal pressure wave, (2) correctly link frequency to pitch and amplitude to loudness, (3) apply v = fλ to find any third variable given two, (4) explain why sound requires a medium, and (5) state why all frequencies travel at the same speed in the same medium.

**Formative golden probe**
> "A 440 Hz musical note travels through air at 343 m/s. (a) What is its wavelength? (b) Is this wave transverse or longitudinal? (c) What determines the pitch of this note? What determines its loudness? (d) A 880 Hz note plays at the same time in the same room. Which arrives at the listener first? (e) Could this sound wave travel from Earth to the Moon (through the vacuum of space)?"

- (a): λ = 343/440 ≈ 0.78 m
- (b): longitudinal
- (c): pitch = frequency; loudness = amplitude
- (d): same time — targets M2
- (e): no — targets M1/background model about medium requirement

**Confidence calibration question**
After (d): "How confident are you that both frequencies travel at the same speed?" (1–5).

**Delayed retrieval check (48 h / 7 days)**
"Thunder is heard 6 seconds after the lightning flash. Estimate the distance to the storm in km." (v_sound = 343 m/s: 6 × 343 = 2058 m ≈ 2 km. Tests practical application and v = d/t reasoning alongside wave-properties.)

---

## Recovery notes

**Failure mode A — M1 persists (sound carries air)**
Ask: "If sound carried air, what would happen in a completely sealed room after an hour of loud music? Would all the air pile up near the listeners?" The learner should recognise this is absurd. Then demonstrate with incense smoke: the smoke drifts by convection current (temperature differences), not by sound. The sound propagates through the still air without moving it in bulk.

**Failure mode B — M2 persists (higher pitch = faster)**
Demonstrate D4: simultaneously play two tones at different frequencies and ask the learner to identify which arrives first at a distant microphone. Both register simultaneously. Then use the formula: λ = v/f — changing f changes λ, not v. The speed is a property of the medium, set by density and elasticity.

**Failure mode C — Vacuum confusion (M1 variant: "sound travels through vacuum slowly")**
Run D1 (bell jar). As the pump removes air, the sound fades — not just gets quieter, but becomes completely inaudible. This is not "slower sound" — it is absent sound. Mechanical waves require a medium. No medium = no wave. This should permanently resolve the "sound in space" error.

---

## Memory & review

**Memory type**: Concept (longitudinal pressure wave) + medium-requirement rule + pitch/loudness mapping + speed invariance principle.

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "What type of wave is sound? What does this mean for how air molecules move?"
- "At 20 °C, what is the approximate speed of sound in air?"
- "Name one situation where sound cannot propagate and explain why."
- "What property of a sound wave determines pitch? What determines loudness?"

**Interleaving**: After mastery, mix sound wave problems with light wave problems — key contrast: light travels through vacuum, sound cannot; light is transverse, sound is longitudinal; their speeds differ by 6 orders of magnitude.

---

## Transfer map

**Immediate transfers**:
- `phys.wave.doppler-effect`: requires a moving source or observer in a medium — sound is the canonical Doppler case (approaching ambulance)
- `phys.wave.sound-intensity`: I = P/(4πr²) and the decibel scale apply to sound as a longitudinal wave

**Downstream transfers**:
- Resonance in pipes: standing longitudinal waves in open and closed pipes produce the notes of wind instruments
- Acoustics engineering: concert hall design, noise-cancellation headphones, architectural acoustics
- Medical ultrasound: high-frequency longitudinal waves (1–20 MHz) in tissue; wavelength mm-scale for tissue resolution

**Cross-subject transfers**:
- `chem` — speed of sound in gases depends on molar mass (heavier gas = slower sound; helium gas makes voice high — not by changing frequency but by changing the resonant cavity's geometry... actually, by changing wave speed in the vocal tract, which shifts the resonant frequencies)
- Biology — bat echolocation (ultrasound ~40–100 kHz); whale communication (infrasound across ocean basins); the physics of the human ear (ear canal resonance ~3–4 kHz)

---

## Curriculum feedback

The KG correctly identifies sound as a longitudinal mechanical wave propagating through pressure fluctuations, and the two unlocks (Doppler effect, sound intensity) are directly built on this foundation.

Two gaps: (1) The KG does not mention the audible frequency range (20 Hz–20 kHz) or the distinction between sound, ultrasound, and infrasound. These are curriculum-critical facts that appear in every secondary examination and should be in the KG description or learning outcomes. (2) The KG does not flag the temperature dependence of sound speed. The approximation v ≈ 331 + 0.6T_C is tested explicitly in many curricula and should be noted as a learning outcome for this concept.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

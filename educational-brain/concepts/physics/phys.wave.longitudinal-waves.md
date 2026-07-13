# Longitudinal Waves — `phys.wave.longitudinal-waves`

## Identity

- **Concept ID**: `phys.wave.longitudinal-waves`
- **Display name**: Longitudinal Waves
- **Domain**: waves
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.80
- **Estimated hours**: 3
- **Requires**: `phys.wave.wave-properties`
- **Unlocks**: `phys.wave.wave-speed`
- **Load-bearing prerequisite content**:
  - From `phys.wave.wave-properties`: the five wave parameters and v = fλ; the particle-doesn't-travel principle; the concept of periodic disturbance. The contrast with transverse waves is best learned if `phys.wave.transverse-waves` is taught immediately before this concept — the two are defined in relation to each other.

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: A longitudinal wave is one where the particles of the medium move back and forth in the same direction as the wave travels. Sound is the most important example: air molecules push forward, then pull back, while the sound wave moves forward. This creates regions of compressed air (compressions) and stretched-out air (rarefactions) that travel through the medium.

**Stage 2 — Intermediate**: In a longitudinal wave, particle displacement is parallel (or anti-parallel) to the direction of wave propagation — a 0° or 180° angle, not 90°. The wave manifests as alternating compressions (higher density, higher pressure) and rarefactions (lower density, lower pressure). Wavelength is the distance between successive compressions (or successive rarefactions). Amplitude is the maximum displacement of a particle from its equilibrium position along the propagation axis. Longitudinal waves can propagate through solids, liquids, and gases (all three support compressional forces). They cannot be polarised (only one oscillation direction is possible — along the propagation axis).

**Stage 3 — Advanced**: The longitudinal wave equation for sound in a fluid: ∂²ξ/∂t² = (B/ρ) ∂²ξ/∂x², where ξ is particle displacement along x, B is the bulk modulus, and ρ is density. Wave speed v = √(B/ρ). For an ideal gas: B = γP (where γ is the adiabatic index and P is pressure), giving Newton-Laplace speed v = √(γP/ρ) = √(γRT/M). Pressure and displacement are 90° out of phase: when displacement is maximum, pressure variation is zero, and when displacement is zero, pressure variation is maximum.

**Stage 4 — Expert / University**: The full acoustic wave equation in three dimensions: ∇²p − (1/c²) ∂²p/∂t² = 0. Acoustic impedance Z = ρv governs reflection and transmission at boundaries (analogous to electrical impedance). In seismology, P-waves (primary waves) are longitudinal and travel through all of Earth's layers (solid mantle, liquid outer core, solid inner core), arriving first at seismographs.

**Model versioning**: Stage 2 is the operative model for all secondary-level sound and longitudinal wave problems. Stage 3 is needed for wave-speed derivation. Stage 4 is university acoustics and seismology.

---

## Why beginners fail

The dominant root cause is **mental picture failure**: learners cannot visualise a longitudinal wave. Transverse waves have an obvious shape (the sine-curve rope); longitudinal waves don't look like their standard diagram. When they see a sinusoidal curve labelled "pressure variation vs. position," they treat it as a transverse wave diagram and draw particles moving up and down — which is wrong. The compression-rarefaction picture must be developed through explicit demonstration before the standard diagram is introduced.

The secondary root cause is **wavelength identification error in the compression diagram**: learners can identify the distance between two compressions as "one wavelength" on a diagram labelled with crests, but struggle to identify it on a spatial diagram of particle positions (where both a compression AND a rarefaction together span one wavelength, not just compression-to-compression).

---

## Misconception library

**M1 — "Longitudinal wave particles move up and down"**
- Characteristic phrase: "Sound waves look like this [draws transverse sine curve with vertical particle arrows]."
- Probe: "In a sound wave traveling from left to right through air, in what direction do the air molecules oscillate?"
- Expected wrong answer: "Up and down" or "In a sine-wave shape."
- Recovery: in a longitudinal wave, particles oscillate LEFT and RIGHT — parallel to the wave propagation direction. They do not move up and down. The sinusoidal curve drawn for sound represents pressure or density variation — it is NOT showing particle displacement in the up-down direction. Each air molecule merely jiggles back and forth along the direction of sound travel.

**M2 — "Compressions and rarefactions are separate from each other"**
- Characteristic phrase: "The compression travels first, then the rarefaction travels after it" (implying they are independent objects).
- Probe: "How many compressions and rarefactions are there in one wavelength of a longitudinal wave?"
- Expected wrong answer: "Two — one compression and one rarefaction, and they travel separately."
- Recovery: one wavelength contains exactly one compression and one rarefaction together. They are coupled — the compression occurs because particles are pushed together, while the rarefaction immediately behind/ahead is where those same particles came from and where the next batch will go. They are not separate objects; they are two aspects of the same single-cycle oscillation.

**M3 — "Longitudinal waves can't be described by frequency and wavelength"**
- Characteristic phrase: "You can't really measure the wavelength of sound — it's just a pressure thing."
- Probe: "A sound wave has a frequency of 500 Hz traveling at 340 m/s. What is its wavelength?"
- Expected wrong answer: "Sound doesn't have a wavelength — that's for light" or incorrect application.
- Recovery: all waves — transverse or longitudinal — have frequency, wavelength, period, amplitude, and wave speed, and they are related by v = fλ. For sound at 500 Hz and 340 m/s: λ = 340/500 = 0.68 m. The wavelength is the distance between successive compressions (or successive rarefactions).

**M4 — "Longitudinal waves cannot travel through solids"**
- Characteristic phrase: "Sound can't go through solid objects as well as it goes through air."
- Probe: "Can a longitudinal wave travel through steel? Compare the speed to sound in air."
- Expected wrong answer: "No, longitudinal waves need air" or "It travels much slower in steel."
- Recovery: longitudinal waves travel through any elastic medium — solid, liquid, or gas. In fact, sound travels faster through solids than through gases: v_steel ≈ 5100 m/s vs. v_air ≈ 340 m/s. This is because steel has a higher bulk modulus (harder to compress) relative to its density than air. Pressing your ear to a wooden table and tapping the table demonstrates this: you hear the tap earlier through the wood than through the air.

---

## Explanation library

**E1 — The compression-rarefaction picture (primary explanation)**
"Imagine a row of air molecules side by side: ○ ○ ○ ○ ○ ○ ○. A speaker diaphragm pushes right → it pushes the first molecule right, which pushes the next, which pushes the next: ○○○○ ○ ○ ○ (a compression forms). Then the diaphragm pulls back → the first molecule follows, pulling a gap: ○○○○  ○○○ (a rarefaction follows the compression). The diaphragm oscillates, creating alternating compressions and rarefactions that travel to the right while each individual molecule oscillates left and right in place."

**E2 — The slinky demonstration explained**
"Push the end of a slinky forward → a compression (coils bunched together) travels down the slinky. Pull it back → a rarefaction (coils spread out) follows. The coils oscillate back and forth; the compression/rarefaction pattern travels along the slinky. The coil motion (parallel to slinky axis) is parallel to the wave motion (also along the slinky axis). That parallel relationship is the definition of longitudinal."

**E3 — Why all three media support longitudinal waves**
"Compressions require a restoring force — the medium resists being compressed (bulk modulus). Every state of matter — solid, liquid, gas — resists compression. So every state of matter can support longitudinal waves. Shear (transverse) requires resistance to sideways deformation, which only solids have. So transverse waves work only in solids (and EM in vacuum); longitudinal waves work everywhere."

---

## Analogy library

**Primary analogy — Spring queue**
Imagine a queue of people holding coil springs connecting each person to the next (front-to-back). When the person at the front steps forward, they compress the spring to the next person, who then steps forward, compressing the next spring — a compression travels down the queue. When the front person steps back, a rarefaction (stretched spring) travels similarly. Each person steps forward and backward (parallel to the queue direction) while the compression/rarefaction pattern travels forward down the queue. This is a longitudinal wave.

**Breaking point**: People in a queue decide when to move; molecules respond to restoring forces. The analogy cannot capture the elastic restoring force (bulk modulus) that drives the oscillation, or the relationship between compression speed and medium properties.

**Anti-analogy — Transverse wave diagram for sound**
Do NOT present a transverse sine-curve diagram as the "shape" of sound. If a sinusoidal diagram is used for sound, label the y-axis clearly as "pressure variation (Pa)" or "density variation (kg/m³)" — not as displacement in a perpendicular direction. The curve represents the longitudinal compression/rarefaction cycle as a pressure plot, which is a mathematical representation, not a picture of particle motion.

---

## Demonstration library

**D1 — Slinky longitudinal wave**
Stretch a slinky along the floor. Push one end forward (along the slinky axis) and release. A compression pulse travels down the slinky. Pull and release: a rarefaction pulse. Oscillate continuously: a series of compressions and rarefactions travel while each coil oscillates parallel to the slinky axis. Label clearly: "The coil moves THIS way [along slinky]; the wave travels THIS way [also along slinky]. They're the same direction → longitudinal."

**D2 — Ear-on-the-desk demonstration**
Tap one end of a wooden table or desk. Listen with your ear pressed to the table: you hear the tap very clearly and earlier than you would through the air. This demonstrates that longitudinal waves travel through solids faster than through air. Addresses M4.

**D3 — Speaking into a tube**
Speak or hum into one end of a long tube (or the cardboard core of a paper towel roll). The sound travels through air longitudinally. Light a match near the far end: the sound (pressure variation) makes the flame flicker. This demonstrates that sound is a pressure wave — the longitudinal compression changes the air pressure at the other end.

---

## Discovery lesson

**Argue for guided discovery through contrast with transverse waves**:

After the rope transverse wave demonstration, show the slinky demo (D1). Ask: "What direction is the slinky wave traveling?" Along the slinky. "What direction are the coils moving?" Also along the slinky. "What is the angle between the two?" Zero degrees — parallel. "What was the angle for the rope wave?" 90° — perpendicular. "So we have two categories: waves where the particle motion is perpendicular to propagation (transverse) and waves where it's parallel to propagation (longitudinal). Which category does sound fit into?" Guide to longitudinal, from the slinky analogy.

---

## Teaching actions

**TA1 — 0° check (contrast with 90°)**: For every longitudinal wave problem, require the two-arrow diagram (wave direction, particle direction) and confirm they are parallel. If learner draws perpendicular arrows, they are thinking transversely.

**TA2 — Compression/rarefaction labelling**: On any longitudinal wave diagram (whether showing particle positions or pressure variation), require the learner to label at least one compression (C) and one rarefaction (R) before any calculation. This builds the conceptual picture alongside the formula.

**TA3 — v = fλ applies here too**: Explicitly state and require that all five wave parameters and v = fλ apply to longitudinal waves. Do not allow a learner to apply these only to transverse waves and treat longitudinal as a different mathematical class.

**TA4 — Medium flexibility check**: For any medium — ask: "Is this a solid, liquid, or gas?" All three: longitudinal waves can propagate. Only solid (or EM in vacuum): transverse waves also possible.

---

## Voice teaching

> "Longitudinal waves are harder to visualise than transverse waves because the particles move in the same direction as the wave, not across it. For sound in air: the air molecules jiggle left and right — the same direction as the sound is traveling. The wave is not a visible hump; it's an invisible pattern of high-pressure and low-pressure regions moving through the air. A slinky demonstrates it best: push the end, watch the compression travel — coils move the same direction as the compression pattern."

> "Sound goes faster in steel than in air, and faster in water than in air. This surprises people who think solids block sound. They don't — they transmit it faster, because steel resists compression strongly (high bulk modulus) while being dense, but the stiffness wins. Press your ear to a table and tap it — you'll hear it before the sound through the air arrives. Both are longitudinal waves; the medium determines the speed."

> "The sine-curve diagram of sound is plotting pressure, not the physical up-and-down position of air molecules. The molecules go left and right. The curve is a graph of how pressure varies from place to place at one instant. Don't read the sine curve as a picture of transverse displacement."

---

## Assessment

**Mastery gate**: The learner can (1) state the defining 0°/parallel relationship, (2) draw and label compressions and rarefactions in a longitudinal wave, (3) apply v = fλ to a longitudinal wave, and (4) explain why longitudinal waves propagate through all three states of matter.

**Formative golden probe**
> "A longitudinal wave travels in the +x direction through a solid rod. (a) In what direction do the particles of the rod oscillate? (b) Sketch the wave as a series of compressions and rarefactions. Mark one wavelength, one compression, and one rarefaction. (c) The wave has a frequency of 1 kHz and travels at 5000 m/s in the rod. What is the wavelength? (d) Could this wave travel through a liquid? Through a gas? (e) Could it be polarised?"

- (a): parallel to x — targets M1
- (b): compression/rarefaction diagram — targets M2
- (c): v = fλ → λ = 5 m
- (d): yes to both (all media support longitudinal) — targets M4
- (e): no (longitudinal waves cannot be polarised) — consolidates transverse/longitudinal contrast

**Confidence calibration question**
After (a): "How confident are you about the oscillation direction?" (1–5).

**Delayed retrieval check (48 h / 7 days)**
"Seismic P-waves are longitudinal. They arrive at seismographs before S-waves (transverse). One reason is that P-waves travel through Earth's liquid outer core; S-waves do not. Explain why, using what you know about longitudinal and transverse waves." (Synthesis test connecting wave type, medium, and Earth structure.)

---

## Recovery notes

**Failure mode A — M1 persists (particles move up-down)**
Run D1 (slinky). Tie a ribbon to one coil of the slinky. Push the slinky end: watch where the ribbon goes. It moves left-right along the slinky axis — not up-down. Ask: "Which direction is the ribbon moving? Which direction is the compression moving?" Both along the slinky axis. That's longitudinal.

**Failure mode B — Can't identify compressions and rarefactions**
Return to E1 (row of dots). Draw the row of air molecules. Push the left-most one right. Show the cluster forming (compression), then the gap (rarefaction). Then label: "compression = molecules closer together = higher pressure." "Rarefaction = molecules further apart = lower pressure." Only after this diagram is understood should the sinusoidal pressure-vs-position graph be introduced.

**Failure mode C — Applies v = fλ incorrectly to longitudinal waves**
Recall from the prerequisite (wave-properties) that v = fλ is universal for all periodic waves. Apply it explicitly: λ = v/f. Check units. The formula is not wave-type-specific.

---

## Memory & review

**Memory type**: Definition (parallel oscillation) + two physical phenomena (compressions/rarefactions, propagates in all media) + contrast with transverse (cannot be polarised).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "What is the defining relationship between particle motion and wave propagation in a longitudinal wave?"
- "Name two examples of longitudinal waves."
- "Why can longitudinal waves travel through liquids but transverse mechanical waves cannot?"
- "A sound wave has frequency 440 Hz in air (v = 340 m/s). What is its wavelength?"

**Interleaving**: Mix transverse and longitudinal classification questions — learners must name the type before any formula is applied.

---

## Transfer map

**Immediate transfers**:
- `phys.wave.wave-speed`: v = √(B/ρ) for longitudinal waves in fluids — the bulk modulus and density of the medium determine speed
- `phys.wave.sound-waves`: sound is the primary physical application of longitudinal waves; the concepts learned here are directly applied

**Downstream transfers**:
- `phys.wave.doppler-effect`: the Doppler effect applies to any wave; longitudinal waves (sound) are the standard teaching case
- `phys.wave.sound-intensity`: intensity (power per area) applies to longitudinal sound waves; I ∝ A²

**Cross-subject transfers**:
- Seismology: P-waves (primary, longitudinal) vs. S-waves (secondary, transverse) are used to infer Earth's internal structure
- Ultrasound medicine: longitudinal pressure waves in tissue are used for imaging (frequencies 1–20 MHz, wavelengths mm–cm scale)
- Music acoustics: standing longitudinal waves in organ pipes and wind instruments produce musical notes

---

## Curriculum feedback

The KG description "particle displacement is parallel to the direction of wave propagation, forming compressions and rarefactions" is correct and complete. `phys.wave.wave-speed` as the unlock is appropriate.

One note: the KG places both `phys.wave.transverse-waves` and `phys.wave.longitudinal-waves` as independent prerequisites for `phys.wave.wave-speed`. This is correct — wave-speed derivation requires knowing whether the wave is transverse (restoring force = shear) or longitudinal (restoring force = compression) to select the correct medium-property formula. The two types should therefore be taught before wave-speed, and this topological order is satisfied by the KG.

The KG does not explicitly flag the inability of longitudinal waves to be polarised as content. This polarisation contrast is the standard examination test for distinguishing wave types and should appear in the concept description or learning outcomes.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

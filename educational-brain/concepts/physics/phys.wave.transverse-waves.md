# Transverse Waves — `phys.wave.transverse-waves`

## Identity

- **Concept ID**: `phys.wave.transverse-waves`
- **Display name**: Transverse Waves
- **Domain**: waves
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.80
- **Estimated hours**: 3
- **Requires**: `phys.wave.wave-properties`
- **Unlocks**: `phys.wave.wave-speed`
- **Load-bearing prerequisite content**:
  - From `phys.wave.wave-properties`: the five wave parameters (amplitude, wavelength, period, frequency, phase), the relation v = fλ, and the core principle that the medium's particles do not travel with the wave — this last point is the conceptual foundation of the transverse/longitudinal distinction

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: A transverse wave is one where the particles of the medium move up and down (or side to side) while the wave moves forward. Like wiggling a rope side-to-side: your wrist moves up and down, and a travelling hump moves along the rope.

**Stage 2 — Intermediate**: In a transverse wave, particle displacement is perpendicular to the direction of wave propagation. This 90° relationship defines the wave type. Examples: waves on a string, water surface waves (approximately), electromagnetic waves (EM fields oscillate perpendicular to propagation direction). Transverse waves can be polarised: if the displacement is restricted to a single plane (e.g., always vertical), the wave is plane-polarised. Transverse waves cannot propagate through fluids (liquids and gases) because fluids cannot sustain the shear stress that drives the restoring force — only solids (and electromagnetic fields in vacuum) support them.

**Stage 3 — Advanced**: The transverse wave equation follows from Newton's second law applied to an infinitesimal segment of a taut string: ∂²y/∂t² = (T/μ) ∂²y/∂x², where T is tension and μ is linear mass density. Wave speed v = √(T/μ). The general solution is any function of (x ± vt): y(x,t) = A sin(kx − ωt + φ). Polarisation states: linear, circular, and elliptical polarisation arise from superposition of two perpendicular transverse components.

**Stage 4 — Expert / University**: Transverse waves are a manifestation of shear modes in elastic media. In seismology, S-waves (secondary waves) are transverse and cannot pass through Earth's liquid outer core — providing evidence for the liquid core's existence. Gravitational waves are transverse, quadrupolar distortions of spacetime. Electromagnetic waves are transverse in the sense that **E** and **B** are both perpendicular to the propagation vector **k**.

**Model versioning**: Stage 2 is the operative model for secondary physics. Stage 3 is needed for wave-speed derivation from medium properties. Stage 4 is university physics.

---

## Why beginners fail

The dominant root cause is **direction confusion in a 2D diagram**: learners see a sinusoidal wave drawn on a page (horizontal axis = position or time, vertical axis = displacement) and cannot identify which direction is the wave direction and which is the particle displacement. They read the diagram as a snapshot of a curvy rope and assume the rope curves forward — which conflates the wave shape with the particle trajectory.

The secondary root cause is **"transverse means on the surface"**: learners associate "transverse" with water waves moving on a surface and assume all surface-level phenomena are transverse. Sound, which travels through air as a longitudinal wave, is sometimes drawn on a transverse wave diagram (for visualisation), reinforcing the confusion.

---

## Misconception library

**M1 — "Particles in a transverse wave move along the wave's path"**
- Characteristic phrase: "A piece of the rope would travel forward as the wave does."
- Probe: "A transverse wave travels along a horizontal rope in the x-direction. In what direction does a single knot tied to the rope move?"
- Expected wrong answer: "Forward, in the x-direction" or "In a wave shape."
- Recovery: the knot moves only up and down (y-direction). It does not travel in x. The wave pattern moves in x; individual particles oscillate in y. Mark the knot before the wave arrives; mark it after; it is in the same x-position but may be at a different y-position.

**M2 — "The amplitude of a wave decreases as it travels because energy is used up"**
- Characteristic phrase: "The wave gets smaller as it travels further because it loses energy."
- Probe: "An ideal transverse wave on a string (no damping, no resistance). Does the amplitude decrease as the wave travels?"
- Expected wrong answer: "Yes, it fades out."
- Recovery: in an ideal (undamped) medium, amplitude does not decrease — the wave transports energy without loss. In a real medium, amplitude decreases due to damping (friction, viscosity) or geometric spreading (the energy is distributed over a larger area). The decrease is a property of the medium's imperfection, not of waves in general. Distinguish ideal vs. real cases explicitly.

**M3 — "Transverse waves can travel through all materials"**
- Characteristic phrase: "Sound is a transverse wave because it goes through air in all directions."
- Probe: "Can transverse waves travel through liquids and gases?"
- Expected wrong answer: "Yes, waves can travel through anything."
- Recovery: transverse waves require a restoring force perpendicular to the propagation direction (shear restoring force). Solids resist shear deformation — they support transverse waves. Liquids and gases do not resist shear — they flow sideways and provide no restoring force for transverse motion. This is why sound (longitudinal) travels through air but light (transverse EM) doesn't need a medium at all. Seismic S-waves don't pass through Earth's liquid outer core — evidence of its liquid state.

**M4 — "A transverse wave diagram shows the actual shape of the medium"**
- Characteristic phrase: "The rope looks like a sine curve at all times."
- Probe: "At time t = 0 a transverse wave snapshot shows a sine curve. What does the rope look like at t = T/4 (one quarter-period later)?"
- Expected wrong answer: "Still the same sine curve — it just moved forward a bit" (but learner draws it at the same phase, not shifted).
- Recovery: the snapshot at t = T/4 IS a sine curve, but shifted: y(x, T/4) = A sin(kx − ωT/4 + φ). The entire pattern has moved forward by λ/4. The shape of the rope is a snapshot of the wave function, not a fixed property of the rope. Draw two snapshots side by side to show the translation.

---

## Explanation library

**E1 — The perpendicular motion definition**
"Transverse: from Latin 'transversus' — across. In a transverse wave, the oscillation is ACROSS the propagation direction — perpendicular to it. Draw the wave moving right (+x). Now draw an arrow for how a single particle moves. The particle's arrow must be perpendicular: up-down (+y or −y). Those two arrows must be at 90°. If they're at 90°, it's transverse."

**E2 — The rope demonstration explained**
"Hold one end of a rope attached to a wall. Flick your wrist upward, then downward. A transverse pulse travels along the rope. Your hand moved in y; the pulse moved in x. At any point along the rope, you can watch a small section move up and then back down as the pulse passes. That section never moves in x — only in y. The pulse moved in x; the material moved in y. That is a transverse wave."

**E3 — Why fluids can't support transverse waves**
"Imagine pushing a layer of water sideways (shear). The water simply flows — it doesn't spring back. A solid pushed sideways does spring back (it has shear stiffness). The transverse wave needs that spring-back to drive the restoring force. Without it, there's no oscillation — just flow. Liquids and gases have no shear stiffness, so they can't support the restoring force that makes a transverse wave oscillate."

---

## Analogy library

**Primary analogy — The Mexican wave (revisited)**
The stadium Mexican wave was introduced in `phys.wave.wave-properties`. Now identify it explicitly as transverse: each fan moves UP and DOWN (vertical) while the wave travels SIDEWAYS (horizontal) around the stadium. The fans' motion (vertical) is perpendicular to the wave's motion (horizontal). This is the defining geometry of a transverse wave.

**Breaking point**: In a stadium wave, fans choose when to act; in a physical transverse wave, the restoring force (tension in a rope, elasticity in a solid) determines the timing. The analogy cannot capture why solids support transverse waves but fluids do not.

**Anti-analogy — Sound on a transverse-wave diagram**
Sound is often drawn as a sinusoidal curve for visualisation purposes — but sound is LONGITUDINAL, not transverse. The sinusoidal diagram for sound represents pressure vs. position, not displacement perpendicular to propagation. Do not let learners conclude that any sinusoidal diagram represents a transverse wave. The diagram shape (sinusoidal) is common to both types; the direction of the quantity being plotted differs.

---

## Demonstration library

**D1 — Rope flick (transverse wave generation)**
Attach a rope to a wall. Hold the free end. Flick up-and-down continuously to create a sinusoidal wave. Observe: (a) wave travels horizontally, (b) rope segments move vertically, (c) a piece of tape attached to the rope bobs vertically without drifting horizontally. This directly demonstrates Stage 2 and resolves M1.

**D2 — Slinky transverse vs. longitudinal**
(Preview of next concept.) With a slinky: shake the end side-to-side → transverse wave (displacement ⊥ propagation). Push-pull the end along the slinky axis → longitudinal wave (displacement ∥ propagation). Comparing both in sequence creates a vivid contrast.

**D3 — Polarisation with two rope polarisers**
Stretch a rope through two slotted boards (acting as polarisers). When the slots are aligned (both vertical), the transverse wave passes. Rotate one slot to horizontal: the wave is blocked. This demonstrates polarisation — a uniquely transverse-wave property. Longitudinal waves cannot be polarised.

---

## Discovery lesson

**Argue for guided discovery** (learners already know that particles don't travel with the wave, from the prerequisite):

Ask: "You already know that in any wave, the medium's particles don't travel forward with the wave. In what direction DO the particles in a rope wave move?" Let learners observe the rope demo (D1) and describe: up and down. "What direction is the wave traveling?" Right. "What is the angle between 'up and down' and 'right'?" 90°. "A wave where the particle motion is perpendicular to the propagation direction is called transverse. Now: what would it mean if the particle motion were parallel to the propagation direction?" This sets up the next concept (longitudinal waves) as a natural extension.

---

## Teaching actions

**TA1 — 90° check**: For every scenario, require the learner to draw two arrows: one for wave propagation direction, one for particle displacement direction. Measure (or confirm) the angle. If 90°: transverse. If 0° or 180°: longitudinal.

**TA2 — Medium test for transverse waves**: Before claiming a transverse wave, ask: "What is the medium? Can it support shear?" Solid or vacuum (EM waves): yes. Fluid: no. This prevents M3.

**TA3 — Snapshot vs. time-series distinction**: Every time a sinusoidal diagram appears, ask: "Is this a snapshot (y vs. x at fixed t) or a time-series (y vs. t at fixed x)?" The shape looks the same; the interpretation differs. A snapshot shows the wave pattern in space; a time-series shows one particle's oscillation over time.

---

## Voice teaching

> "Transverse means the particle moves across — perpendicular to — the direction the wave travels. Rope wave going right: the rope goes up and down. That's 90°. Two arrows, perpendicular. That's all the definition is. The wave moves in x; the particles move in y."

> "Here's the surprising one: transverse waves can't go through liquids or gases. The reason is that fluids don't spring back when you push them sideways — they just flow. A transverse wave needs that sideways spring-back to oscillate. Solids have it; fluids don't. This is why seismic S-waves stop at Earth's liquid outer core — direct evidence that the outer core is liquid."

> "That sine curve you see on a diagram — it doesn't mean the wave is transverse. Sound waves are drawn as sine curves too, but they're longitudinal. The sine curve is just a convenient shape for plotting any periodic quantity vs. distance or time. The direction of the oscillation is what tells you transverse vs. longitudinal."

---

## Assessment

**Mastery gate**: The learner can (1) state the defining 90° relationship, (2) identify transverse waves from scenarios and diagrams, (3) explain why fluids don't support transverse waves, (4) demonstrate that polarisation is a transverse-wave-only phenomenon.

**Formative golden probe**
> "A wave travels along a horizontal string in the +x direction. (a) In what direction do the string particles oscillate? (b) Is this wave transverse or longitudinal? (c) Can this wave be polarised? (d) Could the same type of wave travel through a pool of water? Explain. (e) Sketch a transverse wave snapshot (y vs. x) and mark: the amplitude, one wavelength, the direction of wave travel, and the direction of particle motion."

- (a)–(c): definition and polarisation
- (d): M3 — fluid cannot support transverse waves
- (e): diagram interpretation with all five labels

**Confidence calibration question**
After (d): "How confident are you that a transverse wave cannot travel through a pool of water?" (1–5).

**Delayed retrieval check (48 h / 7 days)**
"Seismic S-waves are transverse; P-waves are longitudinal. Scientists observe that S-waves from earthquakes do not reach seismographs on the opposite side of Earth along certain paths. What does this tell us about Earth's interior?" (Synthesis question linking wave type to physical consequence.)

---

## Recovery notes

**Failure mode A — M1 persists (particles move forward)**
Tie a coloured ribbon to the rope at a fixed position. Run the rope demo (D1). The ribbon moves up and down and returns to its original x-position when the wave passes. The learner sees the ribbon's path: vertical, not horizontal. Ask: "Did the ribbon move forward?" No. "So which direction did it move?" Vertical. That is the particle direction.

**Failure mode B — M3 persists (transverse waves in fluids)**
Describe the shear test: "Push a block of jelly sideways and release — it springs back (solid). Push a cup of water sideways — it flows, doesn't spring back (fluid). The spring-back is the restoring force for transverse waves. Without it, no transverse wave." Then connect to seismology: S-waves prove this in Earth's interior.

**Failure mode C — Sinusoidal diagram confusion (M4)**
Show two sinusoidal diagrams side by side: one labelled "Displacement (m) vs. Position (m)" for a rope wave, one labelled "Pressure (Pa) vs. Position (m)" for a sound wave. Both look the same. "The shape tells you nothing about transverse vs. longitudinal. The label tells you everything. The rope wave's y-axis is displacement perpendicular to x — transverse. The sound wave's y-axis is pressure variation — longitudinal."

---

## Memory & review

**Memory type**: Definition (90° relationship) + constraint (solids/EM only, not fluids) + unique property (polarisable).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "What is the defining geometric relationship of a transverse wave?"
- "Name two examples of transverse waves and one example of a longitudinal wave."
- "Why can't transverse waves travel through gases?"
- "What property of waves is unique to transverse waves?"

**Interleaving**: After mastery, mix transverse and longitudinal wave scenarios — the learner must classify each before applying any formula.

---

## Transfer map

**Immediate transfers**:
- `phys.wave.wave-speed`: for a string, v = √(T/μ) — derivable from the transverse wave model
- `phys.wave.longitudinal-waves`: the conceptual contrast defines longitudinal waves by exclusion — what transverse waves are NOT

**Downstream transfers**:
- `phys.opt.nature-of-light`: light is a transverse EM wave; polarisation of light (sunglasses, LCD screens, photography) is directly this concept in application
- `phys.wave.wave-superposition` / wave optics: interference and diffraction work the same for transverse and longitudinal, but polarisation effects (Malus's law, Brewster's angle) are transverse-only

**Cross-subject transfers**:
- Seismology: S-waves (transverse) vs. P-waves (longitudinal); the liquid outer core detection
- Optics engineering: polaroid filters, LCD displays, anti-glare lenses, 3D cinema glasses — all exploit the transverse nature of light

---

## Curriculum feedback

The KG correctly identifies the perpendicular displacement as the defining property and lists `phys.wave.wave-speed` as the unlock — wave-speed for a string is derived from the transverse wave model (tension and linear density).

The KG does not list polarisation as content for this concept. Polarisation is the unique identifying feature of transverse waves and should be explicitly included in the concept's scope — even at secondary level, the "can transverse waves be polarised?" test is the standard diagnostic for distinguishing wave types. Consider adding polarisation to the KG description for this concept.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

# Teaching Blueprint — phys.wave.wave-properties

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.wave-properties
name: Wave Properties
domain: waves
difficulty:
  label: developing
  number: 3
bloom: understand
prerequisites:
  - phys.meas.units
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.wave.transverse-waves
  - phys.wave.longitudinal-waves
  - phys.opt.nature-of-light
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 3 → C with full CPA track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-WAVE-CARRIES-MATTER
- **Trigger signal:** Student says "waves carry water from one place to another" or thinks the medium itself travels with the wave.
- **Conflict evidence [P28]:** "Watch a duck floating on a pond when a wave passes — it bobs up and down but stays in essentially the same spot. The water molecules oscillate locally; they do not travel with the wave. The wave is a pattern of disturbance that propagates, carrying energy but not matter. A surfer paddling out from shore must fight incoming waves — if waves carried water, a wall of water would knock them back; instead, the surfer mostly bobs. Tsunami waves travel across the Pacific as a pattern of displacement, not a moving mass of water."
- **Bridge text [P30]:** "The wave speed v = fλ is the speed of the pattern (the disturbance), not the speed of individual medium particles. Individual particles oscillate with amplitude A at their fixed positions. Energy is passed from particle to particle along the wave direction."
- **Replacement text [P31]:** "A wave is a self-propagating disturbance that transfers energy without net transfer of matter. Medium particles oscillate about their equilibrium positions. The wave pattern moves at speed v = fλ; individual particles move at much slower oscillation speeds."
- **Discrimination pairs [P33]:**
  - Wave front: moves at speed v = fλ in the direction of propagation ✓
  - Medium particle: oscillates back-and-forth (transverse) or back-and-forth along (longitudinal) at the same position ✓
- **s6_path:** "Imagine a stadium wave: each person only stands and sits at their seat — nobody runs around the stadium — but the wave pattern travels all the way around."

---

### MC-HIGHER-FREQUENCY-FASTER
- **Trigger signal:** Student says "doubling the frequency makes the wave travel twice as fast" or equates frequency with wave speed.
- **Conflict evidence [P28]:** "Wave speed in a given medium depends on the medium's properties — the tension and density of a string, the bulk modulus and density of air, the rigidity of a crystal — not on the wave's frequency. In a string: v = √(T/μ). Doubling the frequency at the same speed halves the wavelength (v = fλ → λ = v/f). Middle C (262 Hz) and the note an octave higher (524 Hz) travel at the same speed of sound (~343 m/s) through the same air. Radio waves (MHz) and gamma rays (10²² Hz) both travel at c = 3×10⁸ m/s in vacuum."
- **Bridge text [P30]:** "v = fλ is a relationship between the three wave quantities. In a given medium, v is fixed by the medium. So f and λ are inversely proportional to each other — increase one, the other must decrease. Only changing the medium (e.g. from air to water) or the restoring force changes v."
- **Replacement text [P31]:** "Wave speed v depends on the medium, not on f or λ. v = fλ means that in a fixed medium: higher f → shorter λ; lower f → longer λ. Speed is set by the medium."
- **Discrimination pairs [P33]:**
  - Sound at 200 Hz in air (20°C): v = 343 m/s, λ = 1.72 m ✓
  - Sound at 2000 Hz in same air: v = 343 m/s, λ = 0.172 m (same v, shorter λ) ✓
- **s6_path:** "Speed is how fast the wave travels. Frequency is how many crests pass per second. They're completely different things — speed is the medium's decision, frequency is the source's decision."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Units and ratios**
Prompt: "A wave has frequency 50 Hz. What does that mean in terms of events per second? If the wave travels at 300 m/s, how far does it travel in one complete cycle?"
- Pass: 50 cycles per second; distance per cycle = v/f = 300/50 = 6 m = wavelength.
- Fail → [P52]: "Frequency = events per second (Hz = 1/s). Speed = distance per time. Distance per cycle = v × (1/f) = v/f. That's the wavelength. Let's make sure units are secure before describing wave properties." Brief review.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the slinky and the ripple tank**

> Stretch a slinky across the floor. Give one end a single sideways flick — watch a pulse travel the length of the slinky to the far end. Now flick repeatedly — a wave pattern appears. You can see: the disturbance moving toward the far end; individual coils only moving sideways (not travelling forward); the wave carrying energy (the far end eventually moves). This is the essence of all wave phenomena.

Second anchor: drop a pebble into still water. Concentric rings spread outward. Floating a leaf shows it bobs in place as the rings pass — it does not travel outward with the wave. Measure ring spacing (wavelength) and count rings per second at a fixed point (frequency). Multiply: ring spacing × rings per second = ring speed.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Wave Vocabulary [C]**

| Term | Symbol | Definition | Unit |
|---|---|---|---|
| Wavelength | λ | Distance between two adjacent crests (or troughs, or any two adjacent points in phase) | m |
| Frequency | f | Number of complete oscillations per second | Hz = s⁻¹ |
| Period | T | Time for one complete oscillation; T = 1/f | s |
| Amplitude | A | Maximum displacement from equilibrium | m |
| Wave speed | v | Speed of propagation of the wave pattern | m/s |

Fundamental relation:
```
v = fλ = λ/T
```

**TA-2 — What Waves Transfer [C→P]**

Waves transfer energy, not matter. Energy carried by a wave is proportional to amplitude squared: E ∝ A².

Wave intensity: power per unit area (W/m²). For a point source spreading in 3D: I = P/(4πr²) → intensity decreases with inverse square of distance. For a plane wave (parallel rays): intensity is constant along propagation direction.

Phase: two points oscillate "in phase" if their displacements are identical at all times. Two points separated by exactly one wavelength λ are always in phase. Two points separated by λ/2 are always in antiphase (exactly opposite).

**TA-3 — Wave Types Overview [C→P]**

Classification by oscillation direction:
- **Transverse**: particles oscillate perpendicular to wave propagation direction. Examples: waves on a string, electromagnetic waves.
- **Longitudinal**: particles oscillate parallel to wave propagation direction (compressions and rarefactions). Examples: sound waves, seismic P-waves.

Classification by need for medium:
- **Mechanical**: require a medium (sound, water waves, seismic waves).
- **Electromagnetic**: propagate through vacuum (light, radio, X-rays, microwaves). Speed in vacuum: c = 3×10⁸ m/s.

**TA-4 — Wavefronts and Rays [P]**

A wavefront is a surface on which all particles are in phase (in 2D: a curve; in 3D: a surface).

- Point source in a uniform medium → circular (2D) or spherical (3D) wavefronts.
- Plane source → plane wavefronts (parallel lines in 2D).

Rays: lines perpendicular to wavefronts, showing the direction of energy propagation.

Huygens' principle: every point on a wavefront acts as a secondary source of wavelets; the new wavefront is the envelope of all wavelets. (Qualitative — used in reflection, refraction, diffraction.)

---

## Component 5 — Worked Examples

**WE-1 (Foundational — v = fλ)**

> A wave on a string has frequency 120 Hz and wavelength 0.25 m. (a) Find the wave speed. (b) Find the period.

```
(a) v = fλ = 120 × 0.25 = 30 m/s

(b) T = 1/f = 1/120 = 8.33 × 10⁻³ s ≈ 8.3 ms
```

**WE-2 (Intermediate — finding λ from v and f)**

> Middle C has frequency 262 Hz. Speed of sound in air = 340 m/s. Find the wavelength of middle C in air.

```
λ = v/f = 340/262 = 1.30 m
```

**WE-3 (Advanced — energy and intensity)**

> A point source emits sound power P = 5 W uniformly in all directions. (a) Find the intensity at r = 2 m. (b) At what distance is the intensity reduced to 1/4 of its value at 2 m?

```
(a) I = P/(4πr²) = 5/(4π × 4) = 5/50.27 = 0.0995 W/m² ≈ 0.1 W/m²

(b) I ∝ 1/r² → I/4 requires r doubled → r = 4 m
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Vocabulary identification**
"A water wave has a crest-to-crest distance of 3 m and passes a fixed buoy at a rate of 4 crests per second. Calculate: (a) wavelength, (b) frequency, (c) period, (d) wave speed."

*Target:* λ = 3 m; f = 4 Hz; T = 0.25 s; v = fλ = 4×3 = 12 m/s.

**MP-2 [P36] — Medium vs. frequency**
"A guitar string vibrating at 440 Hz produces a sound that travels at 343 m/s in air and 1480 m/s in water. (a) Find the wavelength in air and in water. (b) Does the frequency change when sound enters water?"

*Target:* λ_air = 343/440 = 0.780 m; λ_water = 1480/440 = 3.36 m. Frequency stays at 440 Hz — determined by the source, not the medium. Only wavelength changes when speed changes.

**MP-3 [P36] — Transverse vs. longitudinal identification**
"Classify each as transverse, longitudinal, or both: (a) sound in air, (b) earthquake S-waves (shear), (c) earthquake P-waves (pressure), (d) light, (e) ripples on a water surface."

*Target:* (a) longitudinal; (b) transverse; (c) longitudinal; (d) transverse; (e) both (water ripples have transverse + longitudinal components — particles move in circles).

**MP-4 [P36] — In-phase and antiphase**
"A wave has wavelength 0.8 m. Two points P and Q are 0.6 m apart along the direction of travel. (a) What is the path difference P to Q in terms of λ? (b) Are P and Q in phase, antiphase, or neither?"

*Target:* 0.6/0.8 = 0.75λ = ¾λ. Not in phase (not nλ) and not exactly antiphase (not (n+½)λ). Phase difference = 0.75 × 360° = 270° (or equivalently −90°). They are neither in phase nor in antiphase.

**MP-5 [P36] — Synthesis: inverse square**
"An alarm emits 0.5 W of sound. The threshold of pain is 1 W/m². (a) At what distance from the alarm does the sound intensity equal the pain threshold? (b) If the alarm's power doubles, by what factor does this 'safe distance' change?"

*Target:* (a) I = P/(4πr²) → r = √(P/(4πI)) = √(0.5/(4π×1)) = √(0.0398) = 0.199 m ≈ 0.2 m. (b) P doubles → r increases by √2 ≈ 1.41× (safe distance grows by only 41%, not 100%, because of the r² relation).

---

## Component 7 — Session Architecture

```
[P01] Session open — slinky wave demo; dropping pebble in still water
  ↓
[P41] PD-1 (units: Hz, m/s; ratio of v/f)
  ↓ PASS
[P06] Anchor: slinky pulse; ripple tank leaf bobbing in place
  ↓
TA-1: Vocabulary — λ, f, T, A, v; v=fλ [C]
  ↓
[P28] Conflict: "waves carry matter" → MC-WAVE-CARRIES-MATTER
  ↓
WE-1: v = fλ; period calculation
  ↓
[P51] Check-in MP-1 (all four wave quantities from wave description)
  ↓ monitor
TA-2: Energy transfer; E ∝ A²; intensity I ∝ 1/r²; phase [C→P]
  ↓
[P28] Conflict: "higher frequency → faster wave" → MC-HIGHER-FREQUENCY-FASTER
  ↓
WE-2 → WE-3 (wavelength of middle C; inverse square law)
  ↓
TA-3: Transverse vs. longitudinal; mechanical vs. electromagnetic [C→P]
  ↓
TA-4: Wavefronts and rays; Huygens' principle [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "A wave has frequency 200 Hz and speed 340 m/s. What is the wavelength?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — slinky and ripple tank before any formula; S1: knows v=fλ but thinks waves carry matter → MC-WAVE-CARRIES-MATTER; S4: PD-1 fail → phys.meas.units; S6: [F] — "One formula: v = fλ. Everything else is naming parts of the pattern"; S7: open with MP-5 (inverse square synthesis — surprises students who think doubling power doubles the safe distance).

---

## Component 8 — Adaptive Flags

- **Period vs. frequency**: T = 1/f is a definition, not a derived result. Students confuse T and f. Use units as the check: f in Hz (s⁻¹), T in s (s). "Frequency is how many; period is how long one takes."
- **Amplitude and energy**: E ∝ A² (not A). Doubling amplitude quadruples energy. This becomes critical in sound intensity, seismology, and light intensity later.
- **Electromagnetic waves**: mention that EM waves do not require a medium and travel at c in vacuum. Don't derive Maxwell's equations here — just establish the category distinction.
- **Huygens' principle**: qualitative only at this level. Do not attempt derivation. It is used later in phys.opt.diffraction and phys.wave.interference to explain why waves bend around obstacles.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.wave-properties |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.meas.units ✓ |
| V-3 | difficulty label matches KG | PASS — developing (3) |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-WAVE-CARRIES-MATTER, MC-HIGHER-FREQUENCY-FASTER |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (units; Hz; ratio) |
| V-10 | Concrete anchor present [P06] | PASS — slinky pulse; pebble in still water + floating leaf |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with full CPA track (difficulty 3) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — T vs. f confusion, E ∝ A², EM wave category, Huygens scope |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |

# Teaching Blueprint — phys.wave.longitudinal-waves

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.longitudinal-waves
name: Longitudinal Waves
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.wave.wave-properties
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.wave.transverse-waves
  - phys.wave.sound-waves
  - phys.wave.wave-speed
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-LONGITUDINAL-NO-WAVELENGTH
- **Trigger signal:** Student says "longitudinal waves don't have a wavelength because you can't see crests and troughs" or cannot identify λ in a compression wave.
- **Conflict evidence [P28]:** "Longitudinal waves do have a wavelength — it is the distance between two adjacent compressions (or two adjacent rarefactions). On a longitudinal wave diagram showing compressions (dense regions) and rarefactions (sparse regions): λ = compression-to-compression distance. For sound in air at 440 Hz: λ = 343/440 = 0.78 m. This is a perfectly well-defined wavelength. The displacement–position graph for a longitudinal wave is still sinusoidal — just the displacement is in the direction of propagation rather than perpendicular to it. Every property (λ, f, T, A, v) applies identically to longitudinal and transverse waves."
- **Bridge text [P30]:** "Wavelength is a property of any periodic wave — the repeat distance. For a longitudinal wave: one compression + one rarefaction = one full cycle = one wavelength. Compression (maximum rightward displacement of particles) corresponds to a 'crest'; rarefaction (maximum leftward displacement) corresponds to a 'trough'. Same mathematics, different geometry."
- **Replacement text [P31]:** "Longitudinal wave: λ = distance between adjacent compressions (or adjacent rarefactions). Compressions ↔ crests; rarefactions ↔ troughs. All wave properties (λ, f, T, A, v = fλ) apply equally to longitudinal waves."
- **Discrimination pairs [P33]:**
  - Longitudinal wave snapshot: compressions at x = 0.3 m and x = 1.1 m → λ = 0.8 m ✓
  - Same wave: v = 340 m/s, f = 340/0.8 = 425 Hz ✓
- **s6_path:** "Sound is a longitudinal wave — yet we routinely say 'middle C has wavelength 1.3 m.' Of course longitudinal waves have wavelengths."

---

### MC-LONGITUDINAL-PARTICLES-MOVE-WITH-WAVE
- **Trigger signal:** Student says the air "blows" from the speaker to your ear when you hear sound.
- **Conflict evidence [P28]:** "When sound travels from a speaker to your ear, air molecules oscillate back and forth locally — they do not stream from speaker to ear. A single air molecule near the speaker vibrates only a fraction of a millimetre (the acoustic amplitude). Sound in air at normal volumes has particle displacement amplitudes of order 10–100 nm. The energy of the sound travels at ~340 m/s as a pattern of compressions; individual molecules oscillate at the sound frequency but stay essentially in place. If air molecules streamed at 340 m/s, you would feel a powerful wind every time someone spoke — you don't."
- **Bridge text [P30]:** "Longitudinal waves transfer energy through the medium by particle-to-particle coupling: a compressed region pushes neighbouring air, which then compresses, propagating the pattern. Each particle only moves a tiny distance (amplitude A) in the direction of wave travel — then returns. The wave pattern propagates; matter stays behind."
- **Replacement text [P31]:** "In a longitudinal wave, particles oscillate with amplitude A along the propagation direction — but stay near their equilibrium positions (net displacement ≈ 0). The energy (compression pattern) propagates at v = fλ. Particles do not travel with the wave."
- **Discrimination pairs [P33]:**
  - Sound particle: oscillates back and forth ~10–100 nm at audio frequency; net displacement ≈ 0 ✓
  - Sound wave front: travels at ~340 m/s from source to listener ✓
- **s6_path:** "Dominoes falling: each domino only tips over (stays on the floor). The 'wave' of falling travels across the table fast. No domino migrates from one end to the other."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Transverse wave vocabulary**
Prompt: "For a transverse wave with A = 3 cm and λ = 0.6 m travelling at 12 m/s: (a) find f; (b) which direction do particles move relative to the wave?"
- Pass: f = 12/0.6 = 20 Hz; particles move perpendicular to wave direction.
- Fail → [P52]: "The concept of amplitude, wavelength, and direction of particle motion in a transverse wave is needed before extending to longitudinal. Review phys.wave.wave-properties and phys.wave.transverse-waves." Route to transverse-waves.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the longitudinal slinky and the compression pulse**

> Lay a slinky along a table (or floor). Push one end sharply forward and pull it back. Watch a compression (a dense region) travel to the far end, then a rarefaction (a sparse region) follows. The coils only move left and right — along the slinky's length. The compression pattern travels to the far end; no coil permanently moves from one end to the other.

Second anchor: clap your hands sharply near a candle flame. The flame briefly deflects — the compression of air from the clap reaches the flame, displacing air locally. The flame returns immediately. Only the pressure pulse, not air mass, reached the flame.

Third anchor: ruler on table edge — press it down and release. It vibrates up and down, pushing compressions and rarefactions into the air on either side. These are the longitudinal sound waves you hear.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Definition and Geometry [C]**

Longitudinal wave: particle displacement is parallel to (along) the direction of wave propagation.

The wave produces alternating regions:
- **Compression**: particles pushed closer together; local pressure above ambient; particle displacement in the +x direction on the leading half, −x on the trailing half
- **Rarefaction**: particles spread apart; local pressure below ambient; particle displacement opposite to the compression case

Wavelength λ: distance between adjacent compressions (or adjacent rarefactions).
Amplitude A: maximum particle displacement from equilibrium (measured along propagation direction).

All wave relations still apply: v = fλ, T = 1/f.

**TA-2 — Displacement and Pressure Graphs [C→P]**

Two ways to represent a longitudinal wave at one instant:

**Displacement graph**: y (particle displacement, rightward positive) vs. x (position). Sinusoidal — looks identical to a transverse wave snapshot. BUT: y is in the same direction as x (both horizontal). Compressions occur where displacement changes from + to − (particles converging from both sides).

**Pressure graph**: ΔP vs. x. Also sinusoidal, but 90° out of phase with the displacement graph. Pressure maximum (compression) occurs where displacement = 0 and particles are converging. At a compression: ΔP = +maximum; at a rarefaction: ΔP = −maximum.

Key phase relationship: pressure maximum at displacement = 0; displacement maximum where pressure = 0. (They are 90° out of phase.)

**TA-3 — Speed of Longitudinal Waves [C→P]**

Wave speed depends on the medium's restoring-force-to-inertia ratio:

In a fluid (gas or liquid):
```
v = √(B/ρ)      where B = bulk modulus (Pa), ρ = density (kg/m³)
```

In air at 20°C: B ≈ 1.42 × 10⁵ Pa, ρ = 1.20 kg/m³ → v = √(1.42×10⁵/1.20) ≈ 344 m/s.

Temperature dependence (gases): v ∝ √T (absolute temperature). Approximation: v_air ≈ 331 + 0.6θ (m/s) where θ is temperature in °C.

Speed in different media: gases (~300–400 m/s) < liquids (~1000–1500 m/s) < solids (~2000–6000 m/s). Denser media are not necessarily slower — it's the ratio B/ρ that matters. Steel: B_steel/ρ_steel → v ≈ 5100 m/s despite very high density.

**TA-4 — Applications: Seismology and Ultrasonics [P]**

**Seismic waves**: earthquakes generate both P-waves (longitudinal, primary, fastest, travel through solids and liquids) and S-waves (transverse, secondary, slower, only through solids). Using arrival time difference of P and S waves: distance to earthquake epicentre = Δt × v_P × v_S / (v_P − v_S).

**Ultrasonics**: frequencies > 20 kHz. Medical ultrasound (1–20 MHz): short λ enables fine resolution (resolution ≈ λ/2). Sonar: submarine range = v_water × t_echo / 2. Non-destructive testing: detect cracks by echo timing.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — compression spacing)**

> A loudspeaker produces sound at 680 Hz. Speed of sound = 340 m/s. Find: (a) λ, (b) the spacing between adjacent compressions, (c) the distance between a compression and the adjacent rarefaction.

```
(a) λ = v/f = 340/680 = 0.5 m

(b) Compression-to-compression = λ = 0.5 m

(c) Compression to adjacent rarefaction = λ/2 = 0.25 m
```

**WE-2 (Intermediate — temperature and speed)**

> Estimate the speed of sound at: (a) 0°C, (b) 20°C, (c) 100°C. How does the wavelength of a 440 Hz note change between 0°C and 100°C?

```
(a) v = 331 + 0.6×0 = 331 m/s
(b) v = 331 + 0.6×20 = 343 m/s
(c) v = 331 + 0.6×100 = 391 m/s

λ at 0°C: 331/440 = 0.752 m
λ at 100°C: 391/440 = 0.889 m
18% increase in wavelength — same frequency, faster propagation.
```

**WE-3 (Advanced — seismic arrival time)**

> P-waves travel at 8 km/s and S-waves at 4.5 km/s through Earth's crust. A seismometer records P and S waves arriving 35 s apart. How far is the earthquake?

```
Let distance = d.
Arrival time P: t_P = d/8000
Arrival time S: t_S = d/4500
Δt = d/4500 − d/8000 = d × (1/4500 − 1/8000) = d × (8000 − 4500)/(4500×8000)
35 = d × 3500/36 000 000
d = 35 × 36 000 000/3500 = 360 000 m = 360 km
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Compression and rarefaction identification**
"A longitudinal wave snapshot shows compressions at x = 0.2 m, 0.9 m, 1.6 m and rarefactions at x = 0.55 m, 1.25 m. Find λ, f (if v = 280 m/s), and the compression-to-rarefaction spacing."

*Target:* λ = 0.9−0.2 = 0.7 m; f = 280/0.7 = 400 Hz; compression-to-rarefaction = λ/2 = 0.35 m. Check: 0.2+0.35 = 0.55 ✓

**MP-2 [P36] — Displacement vs. pressure graph**
"At a compression: (a) is particle displacement maximum, zero, or minimum? (b) Is pressure above or below ambient? (c) Where on a displacement-time graph is a particle that is at a compression centre?"

*Target:* (a) Zero (particles are converging — they're passing through equilibrium). (b) Above ambient (maximum positive ΔP). (c) At the equilibrium crossing, moving in the direction of propagation (maximum speed in that direction). Pressure and displacement are 90° out of phase.

**MP-3 [P36] — Speed in different media**
"Sound travels at 343 m/s in air and 1480 m/s in water. A 500 Hz note passes from air into water. (a) Does the frequency change? (b) Find λ in each medium. (c) By what factor does the wavelength change?"

*Target:* (a) No — frequency is set by the source. (b) λ_air = 343/500 = 0.686 m; λ_water = 1480/500 = 2.96 m. (c) Factor = 1480/343 ≈ 4.31. Same factor as speed ratio — confirms v = fλ with f constant.

**MP-4 [P36] — Ultrasound resolution**
"A medical ultrasound probe uses 5 MHz in tissue (v_tissue = 1540 m/s). (a) Find λ. (b) A tumour 3 mm across — can this ultrasound resolve it? (Resolution ≈ λ/2.)"

*Target:* λ = 1540/(5×10⁶) = 3.08×10⁻⁴ m = 0.308 mm. Resolution ≈ 0.154 mm. Tumour 3 mm > 0.154 mm → resolvable ✓. (In practice, higher frequencies give better resolution but are absorbed more quickly — a clinical trade-off.)

**MP-5 [P36] — Synthesis: sonar**
"A submarine emits a 20 kHz sonar pulse. The echo returns 0.6 s later. Speed of sound in seawater = 1520 m/s. Find: (a) the distance to the target, (b) the wavelength of the sonar pulse, (c) the size of the smallest object that can be resolved."

*Target:* (a) d = v × t/2 = 1520 × 0.3 = 456 m. (b) λ = 1520/(20×10³) = 0.076 m = 7.6 cm. (c) Resolution ≈ λ/2 = 3.8 cm.

---

## Component 7 — Session Architecture

```
[P01] Session open — slinky compression pulse demonstration
  ↓
[P41] PD-1 (transverse wave vocabulary; particle direction perpendicular to wave)
  ↓ PASS
[P06] Anchor: slinky longitudinal wave; candle flame and hand clap
  ↓
TA-1: Definition; compressions and rarefactions; λ in longitudinal wave [C]
  ↓
[P28] Conflict: "no wavelength in longitudinal waves" → MC-LONGITUDINAL-NO-WAVELENGTH
  ↓
WE-1: Compression spacing → λ, f, λ/2 for compression-to-rarefaction
  ↓
[P51] Check-in MP-1 (identify λ and f from compression/rarefaction positions)
  ↓ monitor
TA-2: Displacement vs. pressure graphs; 90° phase offset [C→P]
  ↓
[P28] Conflict: "air blows from speaker to ear" → MC-LONGITUDINAL-PARTICLES-MOVE-WITH-WAVE
  ↓
TA-3: Speed formula v=√(B/ρ); temperature dependence; speed in media [C→P]
  ↓
WE-2 → WE-3 (speed vs. temperature; seismic arrival time)
  ↓
TA-4: Seismology; ultrasonics; sonar [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Sound at 500 Hz in air (v=340 m/s). Compression spacing? Compression-to-rarefaction?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — slinky and candle before any diagram; S1: understands compressions but denies λ exists → MC-LONGITUDINAL-NO-WAVELENGTH; S4: PD-1 fail → wave-properties + transverse-waves; S6: [F] — "Same wave, different geometry: particle motion is along (not across) the wave direction. Everything else: v=fλ, still applies"; S7: open with MP-2 (displacement vs. pressure phase offset — tests whether they can reason about 90° offset without a diagram given).

---

## Component 8 — Adaptive Flags

- **Displacement vs. pressure phase offset**: this is the subtlest concept here. Compression = maximum pressure = zero displacement (particles at equilibrium, converging). Students consistently confuse maximum pressure with maximum displacement. Use the analogy of a spring: maximum force (pressure) when coils are closest (maximum compression); maximum velocity when passing through natural length (displacement = 0).
- **Speed in solids vs. gases**: students expect denser materials to carry waves slower (more mass to move). But liquids and solids have much higher bulk moduli than gases — the extra restoring force more than compensates the extra density. Steel (~5100 m/s) is far faster than air (340 m/s) despite being ~7000× denser. Emphasise the B/ρ ratio.
- **Seismic P vs. S waves**: an excellent cross-domain example. P-waves (longitudinal) can travel through Earth's liquid outer core; S-waves (transverse) cannot. The "shadow zone" for S-waves first suggested Earth has a liquid outer core — beautiful physics detective story.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.longitudinal-waves |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.wave.wave-properties ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-LONGITUDINAL-NO-WAVELENGTH, MC-LONGITUDINAL-PARTICLES-MOVE-WITH-WAVE |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (transverse wave vocabulary) |
| V-10 | Concrete anchor present [P06] | PASS — slinky; candle and hand clap; ruler vibration |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — displacement vs. pressure phase, speed in solids, seismic shadow zone |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |

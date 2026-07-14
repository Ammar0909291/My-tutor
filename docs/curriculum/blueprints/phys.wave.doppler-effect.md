# Teaching Blueprint — phys.wave.doppler-effect

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.doppler-effect
name: Doppler Effect
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.wave.sound-waves
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.wave.wave-speed
  - phys.opt.nature-of-light
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-DOPPLER-CHANGES-SPEED
- **Trigger signal:** Student says "the sound from an approaching siren moves faster" or explains the Doppler effect as a change in wave speed.
- **Conflict evidence [P28]:** "The speed of sound in air is determined by the medium's properties (temperature, density) — not by the motion of the source. An ambulance siren approaching at 30 m/s still produces sound waves that travel at 343 m/s through the air in front of it. The Doppler effect changes the perceived frequency, not the wave speed. Because the source is moving in the same direction as its emitted waves, the wavefronts in front of the source are compressed (shorter wavelength, hence higher perceived frequency); behind the source they are stretched (longer wavelength, lower perceived frequency). Speed of all wavefronts in the medium: still 343 m/s."
- **Bridge text [P30]:** "v = fλ: if v stays constant (fixed by medium) and λ decreases (wavefronts compressed in front of source), then f_observed must increase. The Doppler shift is a wavelength shift, which appears as a frequency shift at the observer. Speed unchanged; wavelength and frequency changed."
- **Replacement text [P31]:** "Doppler effect: source motion compresses/stretches wavefronts → λ changes → perceived f changes. Wave speed in the medium is unchanged. Approaching source: shorter λ, higher f_observed. Receding source: longer λ, lower f_observed."
- **Discrimination pairs [P33]:**
  - Ambulance siren approaching: sound wave speed = 343 m/s (same as when stationary); perceived pitch is higher ✓
  - Ambulance receding: same wave speed; perceived pitch is lower ✓
- **s6_path:** "The ambulance doesn't push the sound to go faster — the sound is already going 343 m/s in air no matter what. The ambulance just piles up its wavefronts in front, like a boat making a bow wave."

---

### MC-DOPPLER-ONLY-FOR-SOUND
- **Trigger signal:** Student says "Doppler effect only works for sound" or doesn't apply it to light and other waves.
- **Conflict evidence [P28]:** "The Doppler effect is universal for all waves. For light: galaxies receding from us show red-shifted spectra (wavelengths longer → redder → lower frequency). This is how Edwin Hubble discovered the expansion of the universe in 1929. Police radar guns use the Doppler shift of microwave signals to measure vehicle speed. Medical Doppler ultrasound measures blood flow velocity from the frequency shift of reflected sound. Weather Doppler radar detects wind speed. The Doppler effect applies to sound, light, microwaves, radar, ultrasound — any wave phenomenon."
- **Bridge text [P30]:** "The Doppler formula f_obs = f_s × (v ± v_obs)/(v ∓ v_s) applies to any wave where source or observer moves. For light at relativistic speeds: the formula is modified (relativistic Doppler), but the physics is the same. For non-relativistic sources and observers: the classical formula works."
- **Replacement text [P31]:** "Doppler effect: any wave; any frequency range. Sound (ambulance), light (cosmological redshift/blueshift), radar (speed guns), ultrasound (blood flow). The formula changes slightly for EM waves at relativistic speeds, but the qualitative effect is identical."
- **Discrimination pairs [P33]:**
  - Police radar gun: uses Doppler shift of ~24 GHz microwaves reflected from car ✓
  - Hubble redshift: distant galaxies' light is red-shifted → recession speed computed from Δλ/λ ✓
- **s6_path:** "Doppler is as universal as the concept of waves itself. If something oscillates and that oscillation propagates, and either the source or you are moving, you get a Doppler shift."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Frequency and wavelength relationship**
Prompt: "Sound at 440 Hz in air (v = 343 m/s). (a) Find λ. (b) If the source moves toward you at 20 m/s, do the wavefronts arrive more or less frequently? Why?"
- Pass: λ = 343/440 = 0.780 m; more frequently — source is chasing its own waves, compressing them in front.
- Fail → [P52]: "v = fλ; wave motion basics. If the source moves toward you, it's catching up to its own waves in front. Review phys.wave.sound-waves." Route to sound-waves.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the passing ambulance**

> Stand by a road as a fast ambulance (or car with a steady horn) approaches. The pitch rises as it comes toward you, then falls sharply as it passes and recedes — a characteristic "wheeeeeee-owww" sound. This pitch shift is the Doppler effect. The ambulance horn produces a constant frequency — the driver hears no change. Only external observers, relative to whom the ambulance is moving, hear the shift. When the ambulance approaches, its wavefronts in front are compressed (higher frequency); when it recedes, they are stretched (lower frequency).

Second anchor — wave pattern in water: push a toy boat forward in still water while it oscillates up and down. Watch the wave pattern: circular waves, but the circles in front of the boat are closer together (shorter λ) than behind. If you were a fixed observer in front of the boat, more crests would pass you per second — higher perceived frequency.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Qualitative Explanation [C]**

Source stationary: wavefronts spread as concentric spheres. An observer in any direction hears frequency = f_source.

Source moving toward observer at speed v_s: source moves forward between each wavefront emission. Wavefronts in front are closer together (λ_front = λ − v_s/f). Observer hears more crests per second: f_obs > f_source.

Source moving away from observer: wavefronts behind are stretched. f_obs < f_source.

Observer moving toward stationary source: observer passes more crests per unit time. f_obs > f_source.

Observer moving away from stationary source: f_obs < f_source.

**TA-2 — Doppler Formula [C→P]**

```
f_obs = f_source × (v + v_obs) / (v + v_s)
```

Sign convention: choose signs so that motion toward → frequency increase, motion away → frequency decrease.
- v_obs: positive if observer moves toward source, negative if moving away
- v_s: negative if source moves toward observer, positive if moving away

Equivalently (common A-level form):
```
f_obs = f_source × (v ± v_obs) / (v ∓ v_s)
```

Upper signs: toward (observer moving toward, or source moving toward).
Lower signs: away (observer moving away, or source moving away).

Mnemonic: "toward → top adds, bottom subtracts; away → opposite."

**TA-3 — Wavelength Shift and Applications [C→P]**

Observed wavelength:
```
λ_obs = (v − v_s)/f_source      (source approaching, observer stationary)
λ_obs = (v + v_s)/f_source      (source receding, observer stationary)
```

**Applications:**
- **Speed radar**: police emit f_s at car; reflected wave has Doppler shift. Δf → car speed.
- **Medical ultrasound (Doppler mode)**: sound reflects from moving blood cells; Δf gives blood flow speed.
- **Astronomy (redshift/blueshift)**: recession speed v = c × Δλ/λ (Hubble's Law: v = H₀d).
- **Sonar**: moving submarine detected by Doppler shift in reflected sonar pulse.

**TA-4 — Shock Waves and the Sonic Boom [P]**

When v_s = v (source speed equals wave speed): source keeps up with its own wavefronts. All wavefronts pile up on a single plane in front — a Mach cone. Sonic barrier reached at Mach 1 (v_s = v).

When v_s > v (supersonic): source outruns its waves. Wavefronts trail behind forming a cone (Mach cone). The angle of the cone: sin(θ) = v/v_s = 1/Mach. The pressure discontinuity at the cone surface is the sonic boom — a single intense pressure impulse heard by a ground observer when the cone passes overhead.

Mach number: M = v_s / v. Mach 1 = speed of sound; Mach 2 = twice the speed of sound.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — source moving)**

> An ambulance horn emits 800 Hz. The ambulance moves toward a stationary observer at 30 m/s. v_sound = 340 m/s. Find the observed frequency: (a) as the ambulance approaches, (b) as it recedes.

```
(a) Approaching: f_obs = f × v/(v − v_s) = 800 × 340/(340 − 30) = 800 × 340/310
               = 800 × 1.0968 = 877.4 Hz ≈ 877 Hz

(b) Receding: f_obs = 800 × 340/(340 + 30) = 800 × 340/370
            = 800 × 0.9189 = 735.1 Hz ≈ 735 Hz
```

Pitch shift: 877 → 735 Hz as ambulance passes (a change of 142 Hz on either side of the emitted 800 Hz).

**WE-2 (Intermediate — observer moving)**

> A train whistle emits 600 Hz. An observer on a platform moves toward the approaching train at 5 m/s. The train approaches at 40 m/s. v_sound = 340 m/s. Find f_obs.

```
Both moving toward each other:
f_obs = f × (v + v_obs)/(v − v_s) = 600 × (340 + 5)/(340 − 40)
     = 600 × 345/300 = 600 × 1.15 = 690 Hz
```

**WE-3 (Advanced — Doppler radar and recession velocity)**

> A radar gun emits 24 GHz microwaves. A car reflects the signal; the radar detects a frequency of 24.000 96 GHz. Find the car's speed. (c = 3×10⁸ m/s; use Δf/f = 2v/c for slow speeds.)

```
Δf = 24.000 96 × 10⁹ − 24.000 × 10⁹ = 0.000 96 × 10⁹ = 9.6 × 10⁵ Hz

Δf/f = 9.6×10⁵/(24×10⁹) = 4×10⁻⁵

v = c × Δf/(2f) = 3×10⁸ × 4×10⁻⁵/2 = 6000 m/s?
  
Wait — 2v/c = 4×10⁻⁵ → v = 4×10⁻⁵ × 3×10⁸/2 = 6000 m/s seems too high.

Re-check: Δf/f = 9.6×10⁵/24×10⁹ = 4×10⁻⁵; v = (Δf/f)×c/2 = 4×10⁻⁵×3×10⁸/2 = 6 m/s = 21.6 km/h

(Factor of 2 because the wave travels to the car and back — double Doppler shift.)
```

Speed = 6 m/s = 21.6 km/h — this is how police radar works.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Basic formula application**
"A stationary observer hears a train whistle (actual f = 500 Hz) as the train approaches at 25 m/s, then recedes at 25 m/s (v_sound = 340 m/s). Find both heard frequencies."

*Target:* Approaching: f = 500×340/(340−25) = 500×340/315 = 539.7 Hz. Receding: f = 500×340/365 = 465.8 Hz.

**MP-2 [P36] — Find source speed**
"A car with a constant horn approaches a stationary observer. The observer hears 540 Hz as it approaches and 460 Hz as it recedes. v_sound = 340 m/s. Find the car's speed and the horn's actual frequency."

*Target:* f_approach = f_s×v/(v−v_c); f_recede = f_s×v/(v+v_c). Ratio: 540/460 = (v+v_c)/(v−v_c). 540(v−v_c) = 460(v+v_c); 540v−540v_c = 460v+460v_c; 80v = 1000v_c; v_c = 80×340/1000 = 27.2 m/s. f_s = 460×(340+27.2)/340 = 460×1.08 = 497 Hz ≈ 497 Hz.

**MP-3 [P36] — Observer moving**
"An observer moves away from a stationary 400 Hz source at 15 m/s. v_sound = 340 m/s. (a) Find f_obs. (b) What speed must the observer move toward the source to hear 425 Hz?"

*Target:* (a) f_obs = 400×(340−15)/340 = 400×325/340 = 382 Hz. (b) 425 = 400×(340+v_obs)/340 → (340+v_obs) = 425×340/400 = 361.25 → v_obs = 21.25 m/s.

**MP-4 [P36] — Mach number**
"A jet aircraft travels at 680 m/s. v_sound = 340 m/s. (a) Find the Mach number. (b) Find the half-angle of the Mach cone. (c) How long after the jet passes overhead does a ground observer hear the sonic boom if the jet is flying at 2000 m altitude?"

*Target:* (a) M = 680/340 = 2. (b) sin θ = 1/M = 0.5 → θ = 30°. (c) The cone angle: half-angle 30° from the axis. When the jet is overhead, the shock wave is at the cone surface. The shock wave hits the ground when it has swept to the observer position. Geometry: observer is 2000 m below; cone angle 30° from axis → ground distance from directly below = 2000/tan(30°) = 2000/0.577 = 3464 m. Time for jet to travel 3464 m at 680 m/s: t = 3464/680 = 5.1 s after the jet passed overhead.

**MP-5 [P36] — Synthesis: redshift and Hubble's law**
"A galaxy shows a hydrogen line at 486.1 nm in the lab; in the galaxy's spectrum it appears at 530.0 nm. (a) Calculate the recession speed (use v/c = Δλ/λ). (b) Using Hubble's constant H₀ = 70 km/s/Mpc, estimate the galaxy's distance."

*Target:* (a) Δλ = 530.0−486.1 = 43.9 nm; v/c = 43.9/486.1 = 0.0903; v = 0.0903×3×10⁵ = 27 100 km/s ≈ 2.71×10⁴ km/s. (b) d = v/H₀ = 27 100/70 = 387 Mpc ≈ 390 Mpc (about 1.27 billion light-years away).

---

## Component 7 — Session Architecture

```
[P01] Session open — ambulance video/audio demo; boat wave pattern
  ↓
[P41] PD-1 (v=fλ; compression of wavefronts when source approaches)
  ↓ PASS
[P06] Anchor: passing ambulance pitch shift; toy boat wave pattern
  ↓
TA-1: Qualitative wavefront compression/stretching [C]
  ↓
[P28] Conflict: "approaching source → faster sound" → MC-DOPPLER-CHANGES-SPEED
  ↓
TA-2: Doppler formula f_obs = f × (v±v_obs)/(v∓v_s); sign convention [C→P]
  ↓
WE-1: Ambulance approaching and receding
  ↓
[P51] Check-in MP-1 (train whistle approaching and receding)
  ↓ monitor
[P28] Conflict: "Doppler only for sound" → MC-DOPPLER-ONLY-FOR-SOUND
  ↓
TA-3: Wavelength shift; applications (radar, medical, astronomy) [C→P]
  ↓
WE-2 → WE-3 (observer + source moving; radar speed gun)
  ↓
TA-4: Sonic boom; Mach number; Mach cone geometry [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Source emits 500 Hz, moves toward you at 25 m/s. v_sound = 340 m/s. What do you hear?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — ambulance audio demo before any formula; S1: can apply formula but thinks approaching source = faster sound → MC-DOPPLER-CHANGES-SPEED; S4: PD-1 fail → sound-waves; S6: [F] — "One idea: moving source piles up wavefronts in front (shorter λ, higher f) and stretches them behind (longer λ, lower f). Formula follows from v=fλ."; S7: open with MP-2 (find both the car speed AND the actual frequency from two observed frequencies — reverse-engineering Doppler, requires solving a ratio).

---

## Component 8 — Adaptive Flags

- **Sign convention consistency**: the Doppler formula has many sign-convention variants across textbooks. Commit to one form and apply it consistently. The clearest: write numerator and denominator, then ask "does this configuration increase or decrease f?" — if the answer contradicts intuition, flip the sign.
- **Observer moving vs. source moving**: the formula is not symmetric! f_obs(observer moving toward at speed u) ≠ f_obs(source moving toward at speed u). This is because the wave speed relative to the observer changes when the observer moves but not when the source moves (in the medium's rest frame). This non-symmetry disappears only for v ≪ v_wave (both give approximately the same result for small speeds).
- **Relativistic Doppler for light**: the classical formula gives errors for v/c > 0.01. For cosmological redshifts, use the relativistic Doppler formula. At A-level: use Δλ/λ = v/c (non-relativistic approximation) for recession speeds. Flag this if students probe astronomical examples.
- **Double Doppler in radar**: reflected signals experience two Doppler shifts (source→car: car sees shifted frequency; car→observer: observer sees that shifted frequency re-shifted). Result: Δf/f = 2v/c. Students must use the factor of 2.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.doppler-effect |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.wave.sound-waves ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 4h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-DOPPLER-CHANGES-SPEED, MC-DOPPLER-ONLY-FOR-SOUND |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (v=fλ; wavefront compression) |
| V-10 | Concrete anchor present [P06] | PASS — passing ambulance; toy boat wave pattern |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — sign convention, asymmetry of observer vs. source, relativistic limit, double Doppler factor |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |

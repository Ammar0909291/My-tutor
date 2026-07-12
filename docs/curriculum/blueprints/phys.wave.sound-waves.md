# Teaching Blueprint — phys.wave.sound-waves

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.sound-waves
name: Sound Waves
domain: waves
difficulty:
  label: developing
  number: 3
bloom: understand
prerequisites:
  - phys.wave.wave-properties
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.wave.longitudinal-waves
  - phys.wave.sound-intensity
  - phys.wave.doppler-effect
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 3 → C with full CPA track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-SOUND-TRAVELS-IN-VACUUM
- **Trigger signal:** Student says "sound travels through space" or is surprised that the Moon landing broadcasts required radio (not sound), or cannot explain the "silent space" of movies.
- **Conflict evidence [P28]:** "Sound is a mechanical wave — it requires a medium (matter) to propagate. In vacuum, there are no particles to compress and rarefy. The famous 'bell jar' experiment: an electric bell ringing inside a sealed jar becomes inaudible as air is pumped out. Stars explode in complete silence if you are far enough away in vacuum. The NASA Apollo astronauts could hear each other inside the pressurised cabin (air medium) but could not hear sounds outside without radio — there is no sound in the vacuum of space. Movie space battles with sound are physically incorrect."
- **Bridge text [P30]:** "Sound is a longitudinal pressure wave in a medium. The medium's bulk modulus B and density ρ determine speed: v = √(B/ρ). Vacuum has no B and no ρ — the formula gives 0/0, which has no physical meaning. No medium → no sound."
- **Replacement text [P31]:** "Sound requires a material medium: gas, liquid, or solid. Speed depends on medium properties: v_air ≈ 343 m/s; v_water ≈ 1480 m/s; v_steel ≈ 5100 m/s. In vacuum: no sound."
- **Discrimination pairs [P33]:**
  - Bell in sealed jar with air: audible ✓
  - Same bell with air pumped out: silent ✓
  - Astronauts in pressurised cabin: can talk to each other ✓
  - Outside on lunar surface: must use radio — no sound in lunar vacuum ✓
- **s6_path:** "The most famous physics demonstration: watch the bell-jar video. The bell keeps ringing — you see the hammer striking — but the sound fades to nothing as the air is removed. No medium, no sound."

---

### MC-PITCH-IS-LOUDNESS
- **Trigger signal:** Student confuses pitch (frequency) and loudness (amplitude/intensity), or says "the higher the note, the louder it is."
- **Conflict evidence [P28]:** "Pitch (what we perceive as high or low) corresponds to frequency. Loudness (soft or loud) corresponds to amplitude (and hence intensity). A trumpet playing softly at A4 (440 Hz) and a whisper at A4 (440 Hz) have the same pitch — same frequency — but very different loudness (different amplitude). A bass drum produces a low pitch (low frequency, ~50–100 Hz) at very high loudness (large amplitude). A dog whistle is high pitch (high frequency, >20 kHz) at relatively low loudness. Pitch and loudness are independently controlled by frequency and amplitude."
- **Bridge text [P30]:** "Frequency → pitch; amplitude → loudness. They are controlled by different physical parameters of the wave. A singer can hold the same note (frequency unchanged = pitch unchanged) while getting louder (amplitude increases = louder). These are the two knobs on a wave: frequency knob changes pitch; amplitude knob changes loudness."
- **Replacement text [P31]:** "Pitch ↔ frequency f. Loudness ↔ amplitude A (and intensity I ∝ A²). They are independent. A high-pitched sound can be quiet or loud; a low-pitched sound can be quiet or loud."
- **Discrimination pairs [P33]:**
  - A high note at low volume: high f, small A ✓
  - A low note at high volume: low f, large A ✓
- **s6_path:** "Two independent dials on the wave: frequency (pitch) and amplitude (volume). Turning one doesn't turn the other."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Wave basics**
Prompt: "A sound of frequency 440 Hz and speed 340 m/s. What is its wavelength? What kind of wave motion (transverse or longitudinal) is it?"
- Pass: λ = 340/440 = 0.773 m; longitudinal.
- Fail → [P52]: "Frequency and speed → wavelength via v=fλ; sound is longitudinal. Review phys.wave.wave-properties before examining sound specifically." Route to wave-properties.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the tuning fork and the ripple in air**

> Strike a tuning fork and hold it near your ear. Hear the pure tone. Touch the vibrating prongs to a bowl of water — concentric ripples spread outward (the fork's vibration transmits into the water). Now hold the fork near a lit candle — the flame flickers rhythmically at the fork's frequency. Press the fork against a table — the table vibrates, amplifying the sound (soundboard effect). Sound is a mechanical vibration of matter — you can feel, see, and hear its propagation through different media.

Second anchor: hold a balloon to your throat while speaking — feel the vibrations. The vocal cord vibrations compress and rarefy air in the throat and mouth; this longitudinal pressure wave travels to your listener's eardrum, which vibrates at the same frequency.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Nature of Sound [C]**

Sound: a longitudinal mechanical wave of pressure variations in a medium.

Human hearing range: ~20 Hz to 20 kHz.
- Infrasound: < 20 Hz (earthquakes, elephant communication, atmospheric waves)
- Audible: 20 Hz – 20 kHz
- Ultrasound: > 20 kHz (dog hearing to ~65 kHz; bat echolocation ~20–200 kHz; medical imaging ~1–20 MHz)

Speed of sound (approximate values):
| Medium | Speed (m/s) |
|---|---|
| Air (20°C) | 343 |
| Air (0°C) | 331 |
| Water (20°C) | 1480 |
| Seawater | 1520 |
| Steel | 5100 |
| Glass | 5600 |

Temperature effect in air: v ≈ 331 + 0.6θ (m/s), where θ = temperature in °C.

**TA-2 — Pitch, Loudness, and Timbre [C→P]**

Pitch: perceived highness or lowness of a note → determined by frequency f.
- Low pitch (bass): low f (e.g., bass guitar 40–300 Hz)
- High pitch (treble): high f (e.g., piccolo 500–5000 Hz)

Loudness: perceived volume → determined by amplitude A and intensity I ∝ A².
- Threshold of hearing: I₀ = 10⁻¹² W/m²
- Threshold of pain: ~1 W/m²

Timbre (tone quality): what distinguishes a violin from a piano playing the same note → determined by the harmonic content (mixture of frequencies in the sound). A pure sine wave has a single frequency; real instruments produce a fundamental plus overtones.

**TA-3 — Sound Production and Reception [C→P]**

**Production**: any vibrating object compresses and rarefies the surrounding medium. Examples: vibrating strings (guitar, piano), vibrating air columns (organ pipes, flutes), vibrating membranes (drums, loudspeakers, vocal cords).

**Reception**: the human ear — outer ear (collects and focuses), eardrum (converts pressure waves to mechanical vibration), ossicles (amplify ~22×), cochlea (frequency analysis via basilar membrane — different regions respond to different frequencies), auditory nerve (electrical signals to brain).

**Acoustic resonance**: objects have natural frequencies at which they vibrate most easily. Forced vibration at a resonant frequency causes maximum amplitude (resonance). Example: singing at the resonant frequency of a wine glass — the glass vibrates with large amplitude and can shatter.

**TA-4 — Echo, Reverberation, and Acoustic Applications [P]**

Echo: reflection of sound from a surface. Time to hear echo: t = 2d/v, where d = distance to reflecting surface. Minimum echo detection: ear needs ~0.1 s between direct and reflected sound → minimum distance = 343 × 0.05 = 17 m.

Reverberation: multiple reflections create sustained sound after source stops. Reverberation time T₆₀: time for sound level to drop 60 dB. Concert halls: T₆₀ ≈ 1.5–2 s (music); lecture halls: T₆₀ ≈ 0.6–1 s (speech clarity). Sabine's equation: T₆₀ = 0.161V/A, where V = room volume (m³), A = total acoustic absorption (m²).

SONAR (Sound Navigation And Ranging): d = v × t_echo / 2. Used by submarines, bats, dolphins, medical ultrasound.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — echo timing)**

> A person claps their hands 20 m from a cliff wall. How long before they hear the echo? (v_sound = 343 m/s)

```
t = 2d/v = 2 × 20 / 343 = 40/343 = 0.117 s
```

**WE-2 (Intermediate — frequency and human hearing)**

> A dog whistle emits 25 kHz. A bat uses 150 kHz. Speed of sound = 343 m/s. (a) Find the wavelengths. (b) Which can humans hear? Which can dogs hear (dog range: 40 Hz–65 kHz)? (c) Why do bats use ultrasound?

```
(a) λ_dog = 343/(25×10³) = 0.0137 m = 13.7 mm
    λ_bat = 343/(150×10³) = 2.29×10⁻³ m = 2.3 mm

(b) Humans: neither (both > 20 kHz). Dogs: dog whistle yes (25 kHz < 65 kHz); bat no (150 kHz > 65 kHz).

(c) Smaller λ → better spatial resolution. λ_bat = 2.3 mm → can detect objects ~1 mm.
    Low frequency has large λ → poor resolution; bats need to detect insects (cm scale).
```

**WE-3 (Advanced — reverberation and room design)**

> A concert hall has volume V = 15 000 m³. Current total absorption A = 1500 m² (sabine units). (a) Find T₆₀. (b) For speech (target T₆₀ = 0.8 s), what absorption is needed?

```
(a) T₆₀ = 0.161 × 15000/1500 = 0.161 × 10 = 1.61 s  (good for music)

(b) 0.8 = 0.161 × 15000/A_needed
    A_needed = 0.161 × 15000/0.8 = 3019 m²  (double the current absorption)
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Frequency and perception**
"A tuning fork produces A4 = 440 Hz. (a) What is the wavelength in air at 20°C? (b) Is this audible to humans? (c) If a musician plays more softly, what changes — the pitch, the loudness, or both?"

*Target:* (a) λ = 343/440 = 0.780 m. (b) 440 Hz is within 20 Hz–20 kHz → audible ✓. (c) Only loudness changes (amplitude decreases); pitch (frequency) stays at 440 Hz — the musician is playing the same note, just quieter.

**MP-2 [P36] — Vacuum and medium**
"An astronaut on the Moon bangs two rocks together. (a) Can another astronaut 2 m away hear it through the Moon's vacuum? (b) Can the astronaut feel it through their spacesuit boots (direct rock-solid contact)? Explain."

*Target:* (a) No — sound requires a medium; the Moon has essentially no atmosphere. (b) Yes — vibrations travel through the solid rocks to the boots to the astronaut's body (solid medium). This is why astronauts can sometimes detect moonquakes through their suits even in silence.

**MP-3 [P36] — Speed in media**
"Thunder is heard 4.5 s after a lightning flash. (a) How far away was the lightning? (b) Repeat for a stormy day at 35°C."

*Target:* (a) 20°C: v = 343 m/s → d = 343×4.5 = 1544 m ≈ 1.5 km. (b) 35°C: v = 331+0.6×35 = 352 m/s → d = 352×4.5 = 1584 m ≈ 1.6 km. The rule of thumb "5 seconds per mile" assumes ~340 m/s.

**MP-4 [P36] — Bat echolocation**
"A bat emits a 100 kHz pulse and hears the echo after 5 ms. (a) How far is the insect? (b) What is the minimum insect size detectable? (v_sound = 343 m/s)"

*Target:* (a) d = 343×0.005/2 = 0.858 m ≈ 86 cm. (b) λ = 343/(100×10³) = 3.43 mm; resolution ≈ λ/2 = 1.7 mm. Insects around 2 mm can just be detected.

**MP-5 [P36] — Synthesis: pitch and loudness independence**
"A violinist plays concert A (440 Hz) at pianissimo (very quiet) while a tuba plays concert A (440 Hz) at fortissimo (very loud). (a) Do they have the same pitch? (b) Whose sound wave has larger amplitude? (c) Whose sound wave has higher frequency? (d) What makes them sound different despite the same note?"

*Target:* (a) Yes — same frequency = same pitch. (b) Tuba — fortissimo means much higher amplitude. (c) Same — both 440 Hz. (d) Timbre: the harmonic content (overtone spectrum) of a tuba and violin differ dramatically — the violin has many high-frequency overtones; the tuba is richer in lower overtones. Same fundamental frequency, same pitch, but completely different timbre.

---

## Component 7 — Session Architecture

```
[P01] Session open — tuning fork demonstration (hearing, water ripples, candle flame)
  ↓
[P41] PD-1 (v=fλ; longitudinal wave definition)
  ↓ PASS
[P06] Anchor: tuning fork in water; candle flame; feel throat while speaking
  ↓
TA-1: Nature of sound; audible range; speed in different media [C]
  ↓
[P28] Conflict: "sound travels in vacuum" → MC-SOUND-TRAVELS-IN-VACUUM
  ↓
WE-1: Echo timing calculation
  ↓
[P51] Check-in MP-1 (pitch vs. loudness — same note, quieter; what changes?)
  ↓ monitor
TA-2: Pitch (f), loudness (A, I), timbre (harmonic content) [C→P]
  ↓
[P28] Conflict: "pitch = loudness" → MC-PITCH-IS-LOUDNESS
  ↓
TA-3: Production (vibrating objects); reception (ear anatomy); resonance [C→P]
  ↓
WE-2 → WE-3 (dog whistle/bat ultrasound; reverberation time)
  ↓
TA-4: Echo; reverberation; SONAR; T₆₀ formula [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "What determines pitch? What determines loudness? What determines timbre?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — tuning fork demos before any vocabulary; S1: knows f=pitch, A=loudness but says sound can travel in vacuum → MC-SOUND-TRAVELS-IN-VACUUM; S4: PD-1 fail → wave-properties; S6: [F] — "Two knobs: frequency (pitch) and amplitude (loudness). Sound needs a medium."; S7: open with MP-5 (violinist vs. tuba — same note, vastly different sound; why? Forces timbre reasoning).

---

## Component 8 — Adaptive Flags

- **Timbre at this level**: mention only as "harmonic content" — don't introduce Fourier analysis. State that real instruments are not pure sine waves; their distinctive sound comes from which overtones are present. Full treatment requires wave superposition.
- **Threshold of hearing and pain**: introduce the numbers (I₀ = 10⁻¹² W/m²; pain ≈ 1 W/m²) as a range. Full decibel scale (dB) treatment belongs in phys.wave.sound-intensity.
- **Ear anatomy**: keep brief and functional. Ossicles amplify (~22×) and cochlea does frequency analysis. The full mechano-electrical transduction is biology, not physics.
- **Resonance**: introduce the concept here (vibrating at natural frequency → maximum amplitude). Full treatment (resonance curves, Q-factor, driven oscillations) belongs in phys.wave.forced-oscillations.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.sound-waves |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.wave.wave-properties ✓ |
| V-3 | difficulty label matches KG | PASS — developing (3) |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-SOUND-TRAVELS-IN-VACUUM, MC-PITCH-IS-LOUDNESS |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (v=fλ; longitudinal wave) |
| V-10 | Concrete anchor present [P06] | PASS — tuning fork in water/candle/ear; throat vibration |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with full CPA track (difficulty 3) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — timbre scope, dB deferred, ear anatomy scope, resonance scope |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |

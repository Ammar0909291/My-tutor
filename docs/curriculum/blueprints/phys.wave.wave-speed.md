# Teaching Blueprint — phys.wave.wave-speed

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.wave-speed
name: Wave Speed
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.wave.transverse-waves
  - phys.wave.longitudinal-waves
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.wave.superposition
  - phys.opt.nature-of-light
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-SPEED-DEPENDS-ON-AMPLITUDE
- **Trigger signal:** Student says "a louder sound travels faster" or "a bigger wave moves quicker."
- **Conflict evidence [P28]:** "Wave speed in a given medium is determined by the medium's properties alone — not by amplitude. Sound at 120 dB (pain threshold) and sound at 40 dB (quiet office) both travel at ~343 m/s through the same air. A large ocean swell and a tiny ripple travel at the same phase speed (for the same wavelength in deep water). The medium's elasticity (restoring force per unit displacement) and density (inertia) set the speed: v = √(elastic modulus/density). Amplitude does not appear in this formula. If amplitude affected speed, loud thunder would arrive before quiet thunder — it doesn't."
- **Bridge text [P30]:** "v = √(T/μ) for a string or v = √(B/ρ) for a fluid — neither contains A. Amplitude only affects energy and intensity (I ∝ A²), not wave speed. Speed and amplitude are independent properties of the wave in a given medium."
- **Replacement text [P31]:** "Wave speed depends on medium properties (tension, density, bulk modulus, Young's modulus). Amplitude affects energy, NOT speed. In a given medium: v = constant regardless of A."
- **Discrimination pairs [P33]:**
  - Loud sound (large A) vs. quiet sound (small A) in air: same v = 343 m/s ✓
  - Same sound in warm air vs. cold air: different v (medium property changes) ✓
- **s6_path:** "The medium sets the speed. The source sets the amplitude and frequency. These are two completely separate decisions."

---

### MC-WAVE-SPEED-CHANGES-WITH-FREQUENCY
- **Trigger signal:** Student says "high-frequency waves travel faster" — or says all high notes arrive before low notes.
- **Conflict evidence [P28]:** "In most simple media (non-dispersive), all frequencies of a wave travel at the same speed. Sound in air: the clap of thunder (broadband, all frequencies) arrives coherent — you hear the crack, not a drawn-out rainbow of frequencies. Light in vacuum: radio waves (MHz), visible light (10¹⁴ Hz), and gamma rays (10²² Hz) all travel at exactly c = 3×10⁸ m/s. In a non-dispersive medium: v is the same for all f → v = fλ with different f just means different λ. In a dispersive medium (glass for light, deep water for waves): v does vary with f — but this is the exception, not the rule, and requires specific treatment (dispersion relation)."
- **Bridge text [P30]:** "v = fλ is always true: it's the definition of how a periodic wave propagates. In a non-dispersive medium, v is fixed, so f and λ trade off. In a dispersive medium, v = v(f) — a more complex relationship. At this level, assume non-dispersive unless told otherwise."
- **Replacement text [P31]:** "Non-dispersive medium (most simple cases): wave speed v is constant, independent of frequency. v = fλ → different f means different λ, not different v. Dispersive medium (glass, deep water, plasma): v varies with f — explicitly stated in problems."
- **Discrimination pairs [P33]:**
  - Thunder: 20 Hz bass and 2000 Hz treble both arrive together (non-dispersive air) ✓
  - Light in vacuum: all frequencies travel at c = 3×10⁸ m/s ✓
  - Light in glass: different colours travel at slightly different speeds (dispersion) — wavelength-dependent ✓
- **s6_path:** "In air and in vacuum: all frequencies, same speed. If they travelled at different speeds, thunder would arrive as a musical scale — it doesn't. That's your proof."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Transverse and longitudinal wave properties**
Prompt: "A transverse wave has λ = 0.5 m and f = 60 Hz. A longitudinal wave has λ = 2 m and T = 0.01 s. Find the speed of each."
- Pass: v_transverse = 60×0.5 = 30 m/s; v_longitudinal = λ/T = 2/0.01 = 200 m/s.
- Fail → [P52]: "Speed = fλ = λ/T for both wave types. Review transverse and longitudinal waves to confirm these relationships." Route to transverse-waves.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the guitar string: tension changes speed**

> Pluck a guitar string loosely mounted with low tension — a slow, low-frequency wave with long wavelength. Tighten the string (increase tension) — the wave speed increases, making the note higher. Same string length, same boundary conditions, but higher tension → higher v → higher f (the string resonates at f = v/(2L)). The medium (the string) has changed — its tension is higher — and speed has changed accordingly.

Second anchor: sound arriving late. A starting pistol fired across a running track 100 m away — the puff of smoke (light, nearly instant) arrives before the bang (sound at 343 m/s, taking 0.29 s). Loud starters and quiet starters experience the same delay — amplitude doesn't affect the travel time.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Speed Formulae for Different Media [C]**

Wave speed is set by the medium's elastic and inertial properties:

**Transverse wave on a string:**
```
v = √(T/μ)      T = tension (N), μ = linear mass density (kg/m)
```

**Longitudinal wave in a fluid:**
```
v = √(B/ρ)      B = bulk modulus (Pa), ρ = density (kg/m³)
```

**Longitudinal wave in a solid (thin rod):**
```
v = √(E/ρ)      E = Young's modulus (Pa)
```

**Electromagnetic waves in vacuum:**
```
v = c = 1/√(ε₀μ₀) = 3 × 10⁸ m/s
```

Key pattern: v = √(restoring force per unit displacement / inertia per unit volume). Higher restoring force → faster; higher inertia → slower.

**TA-2 — Factors Affecting Speed [C→P]**

For a string: increasing tension T increases v; increasing μ (thicker string) decreases v.

For sound in air: v increases with temperature (v ≈ 331 + 0.6θ m/s). Higher temperature → faster molecular motion → larger bulk modulus → higher v.

Speed is NOT affected by:
- Amplitude A
- Frequency f (in non-dispersive medium)
- The source's motion (in the rest frame of the medium — Doppler effect changes perceived f, not v in the medium)

**TA-3 — The v = fλ Relationship Revisited [C→P]**

In a non-dispersive medium (v fixed by medium):
```
v = fλ → increasing f forces λ to decrease proportionally
```

Graphical interpretation:
- v vs. f graph: horizontal line at constant v (not a function of f)
- λ vs. f graph: hyperbola λ = v/f (λ decreases as f increases)
- f vs. λ graph: hyperbola f = v/λ

Practical application: if you know the medium (gives v) and the source (gives f), you can always find λ = v/f.

**TA-4 — Dispersion (Qualitative Introduction) [P]**

In dispersive media, wave speed depends on frequency: v = v(f). This causes:

- **Pulse spreading**: a short pulse (which contains many frequencies by Fourier analysis) spreads out as different frequency components travel at different speeds.
- **Optical dispersion**: white light entering glass separates into colours because different wavelengths travel at different speeds → prism effect, rainbow.
- **Deep water waves**: v = √(gλ/2π) — longer wavelength waves travel faster than short ones. Ocean swell (long λ) arrives before choppy short-wavelength waves from the same distant storm.

Dispersion index: phase velocity v_phase = fλ; group velocity v_group = dω/dk. (Introduce concept only; derivation in advanced treatment.)

---

## Component 5 — Worked Examples

**WE-1 (Foundational — string speed)**

> A guitar string (μ = 3 × 10⁻³ kg/m) is under tension T = 75 N. Find the wave speed and the frequency of the fundamental note if the string length is 0.65 m.

```
v = √(T/μ) = √(75/3×10⁻³) = √25000 = 158.1 m/s

Fundamental: λ = 2L = 1.30 m (half wavelength fits in string length)
f = v/λ = 158.1/1.30 = 121.6 Hz ≈ 122 Hz  (B2 in musical notation)
```

**WE-2 (Intermediate — changing tension)**

> The same guitar string must be tuned to 196 Hz (G3). What tension is required? (μ = 3×10⁻³ kg/m, L = 0.65 m)

```
f = v/(2L) → v = 2Lf = 2 × 0.65 × 196 = 254.8 m/s

v = √(T/μ) → T = μv² = 3×10⁻³ × (254.8)² = 3×10⁻³ × 64 923 = 194.8 N ≈ 195 N
```

**WE-3 (Advanced — dispersion: deep water waves)**

> Ocean waves in deep water have phase speed v = √(gλ/(2π)). A storm 800 km away generates waves. (a) Which arrives first: 200 m wavelength swells or 10 m choppy waves? (b) Find the travel time difference.

```
(a) v_200 = √(9.8×200/(2π)) = √(311.7) = 17.65 m/s
    v_10  = √(9.8×10/(2π)) = √(15.59) = 3.95 m/s
    200 m swells travel faster → arrive first.

(b) t_200 = 800000/17.65 = 45 326 s ≈ 12.6 h
    t_10  = 800000/3.95  = 202 532 s ≈ 56.3 h
    Difference ≈ 43.7 h ≈ 1.8 days
```

Surfers know: the first gentle swells arriving signal a storm far away; choppy seas come much later.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — String speed and tension**
"A string with μ = 5 × 10⁻³ kg/m under tension 80 N. Find v. If tension is doubled, by what factor does v change?"

*Target:* v = √(80/0.005) = √16000 = 126.5 m/s. Doubling T: v_new = √(2T/μ) = √2 × v_old → v increases by factor √2 ≈ 1.41.

**MP-2 [P36] — Speed and medium change**
"Sound at 500 Hz travels from air (v = 343 m/s) into water (v = 1480 m/s). (a) Does frequency change? (b) What is λ in each? (c) Does wave speed depend on amplitude?"

*Target:* (a) No — frequency is set by the source. (b) λ_air = 343/500 = 0.686 m; λ_water = 1480/500 = 2.96 m. (c) No — v depends only on medium properties (B, ρ), not on A.

**MP-3 [P36] — v = fλ reasoning**
"A wave in a medium where v = 300 m/s. Source A emits f = 100 Hz; Source B emits f = 600 Hz. Find λ for each. Draw a schematic of both waves to the same scale."

*Target:* λ_A = 300/100 = 3 m; λ_B = 300/600 = 0.5 m. Schematic: both wave trains travel at the same speed; B has 6× more oscillations per metre. Same wave-front speed; different crowding of crests.

**MP-4 [P36] — Guitar tuning**
"A guitar player tunes the bottom E string (82 Hz) by ear. They tighten the string until the frequency doubles to 164 Hz. By what factor has the tension changed?"

*Target:* f = v/(2L) ∝ √T (since v ∝ √T, L fixed). Doubling f → v doubles → T must quadruple. Tension increases by factor 4.

**MP-5 [P36] — Synthesis: thunder and lightning**
"During a storm, thunder arrives 3.5 s after the lightning flash. Temperature = 25°C. (a) Find the distance. (b) The next lightning bolt produces a much louder crack — does the sound arrive at the same time (for the same distance) or faster?"

*Target:* (a) v = 331+0.6×25 = 346 m/s; d = 346×3.5 = 1211 m ≈ 1.2 km. (b) Same time — amplitude does not affect wave speed. Loud and quiet thunder from the same distance arrive simultaneously (v depends on medium temperature, not amplitude).

---

## Component 7 — Session Architecture

```
[P01] Session open — guitar string tension demo; starting pistol delay demo
  ↓
[P41] PD-1 (v=fλ for both wave types; f and T relationship)
  ↓ PASS
[P06] Anchor: guitar string: tighten → higher pitch; starting pistol delay
  ↓
TA-1: Speed formulae — string, fluid, solid, EM waves [C]
  ↓
[P28] Conflict: "louder = faster" → MC-SPEED-DEPENDS-ON-AMPLITUDE
  ↓
WE-1: Guitar string speed and fundamental frequency
  ↓
[P51] Check-in MP-1 (string speed; tension doubled → v factor)
  ↓ monitor
TA-2: Factors affecting v — medium properties only; what DOESN'T affect v [C→P]
  ↓
[P28] Conflict: "high frequency = faster" → MC-WAVE-SPEED-CHANGES-WITH-FREQUENCY
  ↓
TA-3: v = fλ revisited; λ–f hyperbola in fixed medium [C→P]
  ↓
WE-2 → WE-3 (retuning guitar — new tension; deep water dispersion)
  ↓
TA-4: Dispersion qualitative — prism, ocean swells, pulse spreading [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "A string has μ = 4 g/m and tension 100 N. What is the wave speed?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — guitar demo and starting-pistol story before any formula; S1: knows v = √(T/μ) but thinks amplitude affects speed → MC-SPEED-DEPENDS-ON-AMPLITUDE; S4: PD-1 fail → transverse-waves; S6: [F] — "v comes from the medium. Two quantities in the medium (elastic/inertial). Amplitude and frequency set by source — different box entirely"; S7: open with MP-5 (thunder synthesis — catches overconfident students who conflate loudness with speed).

---

## Component 8 — Adaptive Flags

- **√2 factor for doubled tension**: when T doubles, v → √2 × v and hence f → √2 × f (for fixed L). Students must not double the frequency — it goes up by only √2. Guitar tuning requires quadrupling tension to double frequency — a useful reality check.
- **Dispersion scope**: the deep-water wave example (WE-3) is the most accessible illustration of dispersion. Do not introduce k, ω, or group velocity formally at A-level — qualitative understanding is the target. Only introduce dispersive media as a named exception to the non-dispersive assumption.
- **Electromagnetic speed in vacuum**: c = 3×10⁸ m/s is exact by definition in SI (since 1983). In glass or water: v = c/n where n = refractive index. This connects to phys.opt.refraction.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.wave-speed |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.wave.transverse-waves ✓, phys.wave.longitudinal-waves ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 4h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-SPEED-DEPENDS-ON-AMPLITUDE, MC-WAVE-SPEED-CHANGES-WITH-FREQUENCY |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (v=fλ for transverse and longitudinal) |
| V-10 | Concrete anchor present [P06] | PASS — guitar string tension; starting pistol delay |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — √2 factor for tension, dispersion scope, c definition |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |

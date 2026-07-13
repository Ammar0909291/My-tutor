# Teaching Blueprint — phys.wave.sound-intensity

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.sound-intensity
name: Sound Intensity
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.wave.sound-waves
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.wave.wave-properties
  - phys.wave.doppler-effect
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-DECIBELS-LINEAR
- **Trigger signal:** Student says "20 dB is twice as loud as 10 dB" or "60 dB is three times 20 dB."
- **Conflict evidence [P28]:** "The decibel scale is logarithmic. 10 dB represents a 10× increase in intensity, NOT a 2× increase. So 20 dB = 10² = 100× the threshold intensity; 30 dB = 10³ = 1000×; 60 dB = 10⁶ = 1 000 000× the threshold intensity. A 60 dB office is not '3 times louder' than a 20 dB library — it is 10⁴ = 10 000 times more intense. Each 10 dB step multiplies intensity by 10. The logarithm compresses the enormous range of human hearing (10⁻¹² to 1 W/m²) into a 0–120 dB scale."
- **Bridge text [P30]:** "β = 10 log₁₀(I/I₀). A change of +10 dB means log₁₀ increases by 1, so I increases by 10¹ = 10. A change of +20 dB means I increases by 10² = 100. Each +10 dB is a ×10 in intensity. Each +3 dB is approximately ×2 in intensity."
- **Replacement text [P31]:** "β (dB) = 10 log₁₀(I/I₀). +10 dB → ×10 intensity; +20 dB → ×100; +3 dB ≈ ×2. Never add dB values linearly for intensity ratios — convert to intensity first."
- **Discrimination pairs [P33]:**
  - 0 dB: I = 10⁻¹² W/m² (threshold of hearing) ✓
  - 10 dB: I = 10⁻¹¹ W/m² (10× more intense) ✓
  - 60 dB: I = 10⁻⁶ W/m² (10⁶× threshold, not 60× threshold) ✓
- **s6_path:** "The logarithm exists precisely because human hearing spans a factor of a trillion in intensity (10⁰ to 10¹²). Without logs, you'd be writing 'this sound has intensity 10⁻⁶ W/m²' for everything. Decibels pack that range into 0–120."

---

### MC-INTENSITY-SAME-AS-LOUDNESS
- **Trigger signal:** Student equates intensity (a physical, objective quantity in W/m²) with loudness (a subjective perceptual quality).
- **Conflict evidence [P28]:** "Intensity is a physical measurement: power per unit area (W/m²), measured with a calibrated microphone. Loudness (or 'perceived loudness') is a subjective human perception that depends on frequency as well as intensity. A 1000 Hz tone at 60 dB is perceived as louder than an 80 Hz tone at the same 60 dB intensity — because the human ear is less sensitive at low frequencies (the Fletcher-Munson equal-loudness contours show this). The phon scale and sone scale attempt to quantify perceived loudness, but they are not the same as dB. A sound can be intense but not very loud (if it's outside the hearing range), or a quieter sound at a preferred frequency can be perceived as louder."
- **Bridge text [P30]:** "Intensity (W/m²) → decibels (dB): objective physical scale. Loudness (phon): subjective perceptual scale corrected for human hearing frequency sensitivity. At 1000 Hz: 1 phon = 1 dB by definition. At 100 Hz: a sound that is perceived as 40 phon requires about 50 dB of intensity level."
- **Replacement text [P31]:** "Intensity (W/m²) and dB: objective. Loudness/phon: subjective, frequency-dependent. For physics problems: use intensity and dB. Note that perceived loudness also depends on frequency — this is why hi-fi systems have bass and treble controls."
- **Discrimination pairs [P33]:**
  - Dog whistle at 60 dB (inaudible to humans at 25 kHz): high intensity, near-zero perceived loudness for humans ✓
  - Soft piano note at 1000 Hz at 40 dB: moderate intensity, quite audible (human ear most sensitive at ~1000–4000 Hz) ✓
- **s6_path:** "A bat call at 100 kHz might have high intensity — you won't hear it. Intensity is physics; loudness is psychology."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Inverse square law for intensity**
Prompt: "A point source emits 4 W of sound equally in all directions. What is the intensity 2 m from the source? 4 m?"
- Pass: I = P/(4πr²): at 2 m: I = 4/(4π×4) = 0.0796 W/m²; at 4 m: I = 4/(4π×16) = 0.0199 W/m² (1/4 of the value at 2 m).
- Fail → [P52]: "Intensity = power / area. For a point source, area = 4πr² (surface of sphere). I ∝ 1/r² (inverse square). Review wave intensity basics from phys.wave.wave-properties." Brief review, proceed.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the rock concert vs. the library**

> A library is about 40 dB. A normal conversation: 60 dB. A lawnmower at 1 m: 90 dB. A rock concert: 110 dB. The threshold of pain: 120 dB. Each step of 10 dB represents a 10× increase in intensity. The library and the rock concert differ by 70 dB — that's 10⁷ = 10 000 000 times difference in intensity. The human ear handles this astonishing range using a logarithmic response. The dB scale is the mathematical expression of that fact.

Second anchor: step back from a speaker by 2×. Intensity drops by (2)² = 4 times. Step back by 10×: intensity drops by 100×, or 20 dB. This is the inverse square law experienced directly.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Intensity Definition [C]**

Sound intensity I: power P crossing a surface of area A perpendicularly:
```
I = P/A     (W/m²)
```

For a point source radiating isotropically (equally in all directions) at distance r:
```
I = P/(4πr²)      (inverse square law)
```

Intensity doubles when amplitude doubles? No — intensity ∝ (amplitude)². Doubling A → I × 4.

**TA-2 — The Decibel Scale [C→P]**

The range of audible intensity: 10⁻¹² W/m² (threshold of hearing, I₀) to ~1 W/m² (threshold of pain).

Intensity level in decibels:
```
β = 10 log₁₀(I/I₀)     where I₀ = 10⁻¹² W/m²
```

Inverse: I = I₀ × 10^(β/10)

Key reference points:
| Level (dB) | Intensity (W/m²) | Example |
|---|---|---|
| 0 | 10⁻¹² | Threshold of hearing |
| 20 | 10⁻¹⁰ | Whisper |
| 40 | 10⁻⁸ | Library |
| 60 | 10⁻⁶ | Conversation |
| 80 | 10⁻⁴ | Heavy traffic |
| 90 | 10⁻³ | Lawnmower |
| 110 | 10⁻¹ | Rock concert |
| 120 | 1 | Threshold of pain |

**TA-3 — Adding dB Levels [C→P]**

When combining two independent sound sources of equal intensity:
- Intensity doubles: I_total = 2I
- dB increase: Δβ = 10 log₁₀(2) ≈ 3 dB

So two identical sources raise the level by only 3 dB, not double the dB.

General: β₁ and β₂ → I₁ = I₀×10^(β₁/10); I₂ = I₀×10^(β₂/10); I_total = I₁ + I₂; β_total = 10 log₁₀(I_total/I₀).

Distance and level: if distance increases by factor n, intensity decreases by n²:
```
Δβ = −10 log₁₀(n²) = −20 log₁₀(n)
```

Doubling distance (n=2): Δβ = −20 log₁₀(2) ≈ −6 dB.

**TA-4 — Hearing, Noise Exposure, and Health [P]**

Safe exposure limits (OSHA / WHO):
- 85 dB: 8-hour exposure limit
- 90 dB: 2-hour limit
- 100 dB: 15-minute limit
- For every 5 dB increase: safe exposure time halves

Noise-induced hearing loss (NIHL): sustained exposure to > 85 dB causes permanent damage to hair cells in the cochlea. Hair cells do not regenerate. Tinnitus (ringing ears) is often the first warning sign.

Active noise cancellation (ANC): microphone measures incoming sound; electronics generate an equal-amplitude, opposite-phase (antiphase) sound; superposition reduces net sound. Used in headphones and aircraft cabin noise reduction.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — dB conversion)**

> A sound has intensity 3 × 10⁻⁵ W/m². Find its intensity level in dB. (I₀ = 10⁻¹² W/m²)

```
β = 10 log₁₀(3×10⁻⁵/10⁻¹²) = 10 log₁₀(3×10⁷) = 10[log₁₀(3) + 7]
  = 10[0.477 + 7] = 10 × 7.477 = 74.8 dB ≈ 75 dB
```

**WE-2 (Intermediate — distance and level)**

> A speaker at 1 m produces 85 dB. (a) What level at 4 m? (b) What level at 10 m? (c) What intensity at 10 m?

```
(a) Distance factor 4: Δβ = −20 log₁₀(4) = −20×0.602 = −12 dB → 85−12 = 73 dB

(b) Distance factor 10: Δβ = −20 log₁₀(10) = −20 dB → 85−20 = 65 dB

(c) I = I₀ × 10^(65/10) = 10⁻¹² × 10⁶·⁵ = 10⁻⁵·⁵ = 3.16×10⁻⁶ W/m²
```

**WE-3 (Advanced — combining sources)**

> Two machines, each producing 75 dB, operate simultaneously in a room. (a) What is the combined level? (b) A third identical machine is added. What is the new level?

```
(a) I per machine = I₀×10^(75/10) = 10⁻¹² × 10^7.5 = 10^(-4.5) = 3.162×10⁻⁵ W/m²
    Two machines: I_total = 2 × 3.162×10⁻⁵ = 6.324×10⁻⁵ W/m²
    β = 10 log₁₀(6.324×10⁻⁵/10⁻¹²) = 10 log₁₀(6.324×10⁷) = 10[7+0.801] = 78.0 dB

(b) Three machines: I_total = 3 × 3.162×10⁻⁵ = 9.487×10⁻⁵ W/m²
    β = 10 log₁₀(9.487×10⁷) = 10[7+0.977] = 79.8 dB ≈ 80 dB
```

Three machines ≈ 5 dB more than one machine (not 3×75 = 225 dB!).

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — dB to intensity**
"Convert to intensity: (a) 50 dB, (b) 120 dB, (c) 37 dB."

*Target:* (a) I = 10⁻¹²×10⁵ = 10⁻⁷ W/m². (b) I = 10⁻¹²×10¹² = 1 W/m². (c) I = 10⁻¹²×10^3.7 = 10⁻¹²×5012 = 5.01×10⁻⁹ W/m².

**MP-2 [P36] — Inverse square law**
"At 5 m from a speaker, the level is 80 dB. Find: (a) the level at 20 m; (b) the distance at which the level drops to 60 dB."

*Target:* (a) Distance ×4: Δβ = −20log(4) = −12 dB → 68 dB. (b) From 80 to 60 dB is −20 dB → distance ×10 → 50 m.

**MP-3 [P36] — Source power**
"A loudspeaker radiates 2 W of acoustic power uniformly. (a) Find the intensity at 3 m. (b) Find the dB level at 3 m."

*Target:* (a) I = 2/(4π×9) = 2/113.1 = 0.01769 W/m². (b) β = 10log(0.01769/10⁻¹²) = 10log(1.769×10¹⁰) = 10×10.248 = 102.5 dB.

**MP-4 [P36] — Double machine problem**
"A single machine produces 70 dB. (a) What level do 4 identical machines produce? (b) How many identical machines are needed to raise the level from 70 dB to 80 dB?"

*Target:* (a) 4 machines: I×4; β = 70+10log(4) = 70+6 = 76 dB. (b) +10 dB requires I×10 → 10 machines needed.

**MP-5 [P36] — Synthesis: noise exposure**
"A worker is exposed to 88 dB for 4 hours. For the remaining 4 hours they move to a quieter area at 82 dB. (a) Find the intensity during each period. (b) What is the average intensity over 8 hours? (c) Comment on hearing safety (85 dB is the 8-hour limit)."

*Target:* (a) I₈₈ = 10⁻¹²×10^8.8 = 6.31×10⁻⁴ W/m²; I₈₂ = 10⁻¹²×10^8.2 = 1.585×10⁻⁴ W/m². (b) Avg = (4×6.31 + 4×1.585)/(8) × 10⁻⁴ = (25.24+6.34)/8 × 10⁻⁴ = 3.948×10⁻⁴ W/m². (c) β_avg = 10log(3.948×10⁻⁴/10⁻¹²) = 10log(3.948×10⁸) = 85.96 dB. This exceeds the 85 dB 8-hour limit — the worker needs hearing protection or shorter exposure at 88 dB.

---

## Component 7 — Session Architecture

```
[P01] Session open — rock concert vs. library — dB table
  ↓
[P41] PD-1 (inverse square law; point source intensity = P/(4πr²))
  ↓ PASS
[P06] Anchor: decibel table; step back from speaker by ×2 → −6 dB
  ↓
TA-1: Intensity I = P/A; inverse square I ∝ 1/r² [C]
  ↓
TA-2: Decibel scale β = 10 log(I/I₀); reference points table [C→P]
  ↓
[P28] Conflict: "dB scale is linear" → MC-DECIBELS-LINEAR
  ↓
WE-1: dB from intensity; WE-2: level vs. distance
  ↓
[P51] Check-in MP-1 (three dB-to-intensity conversions)
  ↓ monitor
TA-3: Adding dB levels; +3 dB per doubling of sources; distance formula [C→P]
  ↓
[P28] Conflict: "intensity = loudness" → MC-INTENSITY-SAME-AS-LOUDNESS
  ↓
WE-3: Combining two and three machines
  ↓
TA-4: Safe exposure limits; NIHL; active noise cancellation [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Intensity doubles → dB increases by how much? Distance doubles → dB changes by how much?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — dB table and "step back from speaker" demo before formulas; S1: can use β=10log(I/I₀) but thinks dB is linear → MC-DECIBELS-LINEAR; S4: PD-1 fail → wave-properties (intensity section); S6: [F] — "+10 dB = ×10 intensity; +3 dB = ×2 intensity. That's the whole scale."; S7: open with MP-5 (noise exposure time-weighted average — requires converting between dB and W/m² and back, plus health reasoning).

---

## Component 8 — Adaptive Flags

- **log₁₀ not ln**: the decibel formula uses log base 10 (common log), not natural log. Many students default to ln on calculators. Always check: log₁₀(10) = 1, not 2.303.
- **I ∝ A²**: when students ask "what happens to dB if amplitude doubles?" — I quadruples (×4), so β increases by 10log(4) ≈ 6 dB. Connect: doubling A → +6 dB, not +3 dB.
- **Adding dB for simultaneous sources**: two sources at the same dB give +3 dB, not double the dB. This surprises students every time. Drive it home with WE-3.
- **Perceived loudness scope**: the Fletcher-Munson curves and phon/sone scales are for enrichment only. A-level physics focuses on the objective intensity and dB level; perceptual loudness is a psychoacoustics topic.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.sound-intensity |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.wave.sound-waves ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-DECIBELS-LINEAR, MC-INTENSITY-SAME-AS-LOUDNESS |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (inverse square law) |
| V-10 | Concrete anchor present [P06] | PASS — dB table; step back from speaker demo |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — log₁₀ vs. ln, I∝A², two-source +3dB, perceptual loudness scope |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |

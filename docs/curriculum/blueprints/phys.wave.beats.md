# Teaching Blueprint — phys.wave.beats

## Component 0 — Concept Identity

```yaml
concept_id: phys.wave.beats
name: Beats
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.wave.interference
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.wave.standing-waves
  - phys.wave.doppler-effect
  - phys.wave.sound-intensity
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Strike two guitar strings that are almost in tune — you hear a slow, rhythmic throbbing in the sound. Strike two tuning forks at 440 Hz and 443 Hz simultaneously — you hear three pulses of loudness per second. This is beats: the temporal interference pattern that appears when two waves of nearly identical frequency overlap at one point in space.

**Conceptual arc:**
1. Revisit superposition for two cosine waves at nearly the same frequency:
   y₁ = A cos(2πf₁t), y₂ = A cos(2πf₂t).
2. Sum-to-product identity:
   y = y₁ + y₂ = 2A cos(2π × (f₁−f₂)/2 × t) × cos(2π × (f₁+f₂)/2 × t).
3. Interpretation: a carrier wave at the average frequency f_avg = (f₁+f₂)/2, amplitude-modulated by a slow envelope at frequency (f₁−f₂)/2.
4. Beat frequency: the envelope oscillates at (f₁−f₂)/2, but the loudness (intensity ∝ amplitude²) peaks twice per envelope cycle — therefore f_beat = |f₁ − f₂|.
5. Why |Δf|, not Δf/2: intensity is proportional to amplitude squared; the cos² function has two maxima per full period, so the beat rate equals the full frequency difference.
6. Tuning application: when beats disappear (f_beat = 0), the two sources are in tune.
7. Detection limit: human ears detect beats up to about 7-15 Hz; above this, the beating merges into a rough roughness percept (dissonance).
8. Practical uses: instrument tuning, heterodyne detection in radio (mixing two frequencies to get a low beat frequency), laser interferometry (optical beats).

**Closing synthesis:** Beats are temporal interference — the time-domain analogue of the spatial fringe patterns in phys.wave.interference. Just as spatial path difference controls whether a point is bright or dark, temporal frequency difference controls whether the amplitude envelope is at a maximum or minimum at each moment. Both are consequences of the same superposition principle.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — beat frequency and tuning)

**Scenario:** A piano tuner hears 4 beats per second when playing a 440 Hz reference fork alongside one piano string. The string is slightly flat. After tightening (raising frequency), the beats increase to 6 per second. Find the string's original frequency.

**Step 1 — Interpret direction.**
If the string is flat (f_string < f_ref), beats = f_ref − f_string = 4 Hz → f_string = 436 Hz.

**Step 2 — Verify with tightening.**
Tightening raises f_string. Original: 436 Hz. After tightening, beats go to 6: f_string_new − 440 = 6 → f_string_new = 446 Hz. The tuner went past 440 Hz — must now loosen slightly.

**Step 3 — Tuning procedure.**
Loosen until beats decrease toward zero. At f_string = 440 Hz exactly, beats = 0.

**Answer:** Original string frequency = 436 Hz. Tightening overshot; beats confirmed direction of detuning.

---

### WE-2 (Bridging — derivation from superposition)

**Derive the beat pattern mathematically and identify beat frequency.**

y₁ = A cos(2πf₁t); y₂ = A cos(2πf₂t), with f₁ = 442 Hz, f₂ = 438 Hz.

**Apply sum-to-product:**
cos P + cos Q = 2 cos((P−Q)/2) cos((P+Q)/2).

P = 2πf₁t; Q = 2πf₂t.
(P−Q)/2 = 2π(f₁−f₂)/2 × t = 2π × 2t (slow envelope).
(P+Q)/2 = 2π(f₁+f₂)/2 × t = 2π × 440t (carrier).

y = 2A cos(2π × 2t) × cos(2π × 440t).

**Amplitude function:** |2A cos(2π × 2t)| — maximises at 2 Hz intervals (half of 4 Hz modulation).

**Beat frequency:** The amplitude envelope has period T_env = 1/2 s; but peaks appear twice per period (|cos| has two maxima per cycle) → f_beat = 2 × 2 = 4 Hz = |f₁ − f₂|. ✓

**Answer:** Beat frequency = 4 Hz. Carrier frequency = 440 Hz (the tone heard).

---

### WE-3 (Abstract — heterodyne detection)

**Application:** A radio receiver uses heterodyne detection. An incoming signal at f_signal = 1010 kHz is mixed with a local oscillator at f_LO = 1000 kHz. What beat frequency is produced, and why is this useful?

**Beat (difference) frequency:** f_beat = |f_signal − f_LO| = 10 kHz — the intermediate frequency (IF).

**Why useful:** The IF (10 kHz) is much lower than the original RF (1010 kHz). Amplifiers and filters designed for a fixed IF are far easier to build and optimise than ones that must work over the entire RF band. The same IF circuitry handles all stations — only the local oscillator frequency is tuned.

**Extension:** For optical heterodyne in laser interferometry, two laser beams of slightly different frequency interfere on a photodetector, producing a beat current in the MHz range. Measuring phase shifts of this beat signal allows nanometre-scale distance measurement — the principle behind LIGO's length measurement.

**Answer:** IF = 10 kHz; allows fixed-frequency signal processing regardless of the received station frequency.

---

## Component 3 — Misconception Engine

### MC-BEATS-FREQUENCY-IS-AVERAGE

**Trigger signal:** Student reports the beat frequency as (f₁+f₂)/2 instead of |f₁−f₂|.

**Conflict evidence [P28]:** "Two tuning forks at 440 Hz and 442 Hz: you hear one beat per second, not one beat every 441 seconds. If beat frequency were the average, you'd hear nothing perceptibly slow. When you strike them simultaneously, count the beats in 5 seconds and divide by 5 — what do you get?"

*They should get ~2 beats/sec = |442 − 440| = 2 Hz.*

**Bridge text [P30]:** "The sum-to-product formula gives two frequencies: the average (f₁+f₂)/2 — which is the perceived pitch (carrier) — and the difference (f₁−f₂)/2, which is the envelope rate. But you hear the amplitude peak twice per envelope period (once going up, once coming back down), so the heard beat rate is 2 × (f₁−f₂)/2 = |f₁−f₂|."

**Replacement text [P31]:** "Beat frequency = |f₁ − f₂|. The average frequency (f₁+f₂)/2 is the pitch you hear; the difference frequency is the throbbing rate. These are two distinct things. Musicians exploiting beats to tune always compare the throbbing rate to zero — not to the average."

**Discrimination pairs [P33]:**
- "440 Hz + 442 Hz: what is the pitch heard? What is the beat rate?" → Pitch ≈ 441 Hz; beat rate = 2 Hz.
- "Two sources at 500 Hz and 502 Hz produce beats. How many beats are heard in 10 seconds?" → 2 Hz × 10 s = 20 beats.

**s6_path:** "Two answers from the formula: the average is the pitch, the difference is the beat. Keep them separate."

---

### MC-BEATS-NEED-SAME-AMPLITUDE

**Trigger signal:** Student claims "beats only occur when both sources have equal volume."

**Conflict evidence [P28]:** "Play a 440 Hz tone at 80 dB and a 442 Hz tone at 60 dB simultaneously. Is there a beat pattern? Consider: is the amplitude of the resultant actually zero at the destructive moments?"

**Bridge text [P30]:** "The sum-to-product result for unequal amplitudes is: y = (A₁ + A₂) × [weighted superposition]. When A₁ ≠ A₂, the amplitude doesn't drop to zero at the 'trough' — it drops to |A₁ − A₂| > 0. So the beats are still there, just with reduced contrast (like fringes with unequal sources). You still hear the throbbing."

**Replacement text [P31]:** "Beats require only that two frequencies be close — not that amplitudes be equal. With equal amplitudes, the amplitude troughs reach zero (maximum contrast). With unequal amplitudes, troughs don't reach zero but the loudness still fluctuates rhythmically. Unequal-amplitude beats are common in real musical instruments."

**Discrimination pairs [P33]:**
- "One fork at 10 Pa amplitude, another at 2 Pa, frequencies differ by 3 Hz. Is there a beat pattern?" → Yes — amplitude varies between 12 Pa (max) and 8 Pa (min) at 3 Hz, clearly audible.
- "Can you tune a string to a reference fork even if the string is twice as loud?" → Yes — listen for the throbbing rate going to zero, regardless of relative loudness.

**s6_path:** "Beats are about frequency difference, not amplitude matching. Amplitude affects only the depth of the fluctuation, not its rate."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq check):** What is the superposition principle?
*y_total = y₁ + y₂ at every point and instant — waves add algebraically.*

**P4-b (beat frequency):** Two tuning forks give 5 beats per second. One is at 440 Hz. What are the two possible frequencies of the other fork?
*435 Hz or 445 Hz.*

**P4-c (calculation):** f₁ = 512 Hz, f₂ = 508 Hz. Find beat frequency and describe what you hear.
*f_beat = 4 Hz — four pulses of loudness per second.*

**P4-d (tuning by beats):** A violinist hears 3 beats/s between an open string (standard 196 Hz) and a reference fork. She tightens the string and beats go to 5/s. What was the original string frequency?
*If originally sharp: 199 Hz; tightening to 201 Hz makes beats 5 Hz. If originally flat: 193 Hz; tightening to 201 Hz makes beats 5 Hz. Both scenarios: she went past the reference → must loosen. Original most likely 193 Hz (flat, as stated in the direction of tuning).*

**P4-e (heterodyne):** Two laser beams of wavelengths 632.8 nm and 633.0 nm are combined on a photodetector. Find the beat frequency (c = 3 × 10⁸ m/s).
*f₁ = c/λ₁ = 3×10⁸ / 632.8×10⁻⁹ = 4.742 × 10¹⁴ Hz; f₂ = 3×10⁸ / 633.0×10⁻⁹ = 4.740 × 10¹⁴ Hz. f_beat = |f₁−f₂| ≈ 2 × 10¹¹ Hz = 200 GHz.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "You hear a slow pulsing when two near-identical strings are played together. What causes the pulsing — the strings are at different pitches, but the pulsing rate is much slower than either pitch."

*Expected: some kind of beating or interference. Don't confirm — probe further.*

**Turn 2 [P06 concrete anchor]:** "Two tuning forks, 440 Hz and 441 Hz. In 1 second, how many complete oscillations does the 440 Hz fork complete? The 441 Hz fork? At what moments are both forks in phase (crest + crest)?"

*440 and 441 oscillations respectively. In phase 1 time per second — when the faster fork gains a full cycle on the slower one.*

**Turn 3 [P30 bridge]:** "That 'one full cycle gained per second' is the beat — the two waves go from constructive (loud) to destructive (quiet) and back to constructive once per second. What beat frequency would you get for 440 Hz and 443 Hz?"

*f_beat = 3 Hz.*

**Turn 4 [P28 conflict — MC-BEATS-FREQUENCY-IS-AVERAGE]:** "What frequency do you actually HEAR (the pitch)? Is it 440, 443, or something else? What does the sum-to-product formula tell you?"

*Pitch ≈ 441.5 Hz (average). Beat rate = 3 Hz (difference). Two different things.*

**Turn 5 [P51 check-in]:** "So we have two outputs: pitch = average frequency, beat rate = frequency difference. Which one do piano tuners care about?"

*Beat rate — they tune until f_beat → 0.*

**Turn 6 [P52 narrow]:** "Derive: if I start with f_beat = 4 Hz and I raise one frequency, what happens to f_beat — does it always decrease?"

*Not necessarily — if the raised frequency overshoots the other, f_beat increases again. Tuners listen to which direction changes beats.*

**Turn 7 [P33 discrimination — MC-BEATS-NEED-SAME-AMPLITUDE]:** "If one fork is 10× louder, can you still hear beats?" 

*Yes — contrast is reduced (trough ≠ zero) but the rhythmic pulsing is still present and audible.*

**Turn 8 [P62 retrieval seed]:** "Apply sum-to-product to y₁ = 3 cos(2π×500t) + y₂ = 3 cos(2π×504t). What are the carrier and envelope frequencies? What is the beat frequency?"

*Envelope frequency = 2 Hz; carrier = 502 Hz; f_beat = 4 Hz.*

**Turn 9 [P36 mastery probe]:** "A tuner hears 6 beats/s with a 330 Hz reference. She loosens the string and beats drop to 2/s. Was the string originally sharp or flat? What is its original frequency? After loosening, what is its frequency?"

*Loosening lowers frequency. If originally sharp: f_string > 330 Hz. Loosening (lowering) moves toward 330 — beats decrease. Original f_string = 336 Hz; after loosening: f_string = 332 Hz.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: cause of pulsing from near-unison strings] → [P06 anchor: 440/441 Hz phase analysis]
→ [P30 bridge: one-beat-per-second reasoning]
→ [MC-BEATS-FREQUENCY-IS-AVERAGE: P28 conflict → P31 replacement → P33 pairs]
→ [WE-1: piano tuner scenario — beat-guided direction of tuning]
→ [P51 check-in]
→ [WE-2: sum-to-product derivation]
→ [P52 narrow: carrier vs. beat frequency distinction]
→ [MC-BEATS-NEED-SAME-AMPLITUDE: P28 → P30 → P31 → P33]
→ [WE-3: heterodyne detection application]
→ [P62 retrieval seed: sum-to-product for 500/504 Hz]
→ [P36 mastery probe: tuner direction problem]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with only the physical picture — two forks at 440 and 441 Hz, count beats in real time. Introduce formula only after the student can predict f_beat = 3 for 440/443. Skip WE-3 (heterodyne).

**S1 (knows formula, no physical intuition):** Ask: "Without the formula, predict what happens to the beat rate if one frequency is doubled but the other is not." Forces reasoning about difference vs. ratio before formula reinforcement.

**S4 (prereq gap — interference weak):** Return to phys.wave.interference. Beats are the temporal analogue of spatial interference — if spatial path difference is not secure, the temporal analogy won't land. Secure P4-a (superposition) before proceeding.

**S6 (math anxiety):** Emphasize only f_beat = |f₁−f₂|. Provide sum-to-product as a given result, don't derive. WE-1 (tuning) and P4-b/P4-c are the core assessable content.

**S7 (overconfident):** Lead with P4-e (laser heterodyne — requires computing f from λ). Most S7 students can do the beat formula but haven't thought about optical beats. The enormous frequency (10¹⁴ Hz) and the 200 GHz beat frequency surprise them and open deeper discussion.

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-b (two possible frequencies) + P4-c (beat rate and description)
  - offset_days: 4
    format: P4-d (tuning direction problem) — tests understanding that beats don't tell direction, only magnitude
  - offset_days: 14
    format: P4-e (optical beats) + "derive beat frequency from sum-to-product for f₁ = 200 Hz and f₂ = 203 Hz"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.wave.beats ✓
V-2  prerequisites listed in KG: phys.wave.interference ✓
V-3  bloom verb matches level (apply): "apply … calculate … derive" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 4: "C (anchor; difficulty 4 → C with accelerated P track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: standing-waves, doppler-effect, sound-intensity ✓
V-17 difficulty number 4 consistent with bloom=apply and estimated_hours=3 ✓
V-18 domain "waves" matches concept_id prefix phys.wave ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```

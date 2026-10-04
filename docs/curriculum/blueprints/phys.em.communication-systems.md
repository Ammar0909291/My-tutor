# Teaching Blueprint: phys.em.communication-systems

## 0. Concept Profile
concept_id: phys.em.communication-systems
name: Modulation and Signal Propagation
domain: Electricity & Magnetism (Physics)
difficulty: proficient (3)
bloom: understand
prerequisites: [phys.em.electromagnetic-waves]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a car radio picking up AM stations from far away at night but FM only nearby, before any equation; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains why sound is not broadcast directly: radio waves are electromagnetic, not sound, and an efficient antenna must be comparable to the wavelength (about λ/4 or λ/2) — a 1 kHz audio signal has λ = 300 km, while a 100 MHz carrier has λ = 3 m, so a 0.75 m quarter-wave antenna works. The audio is therefore impressed on a high-frequency carrier by modulation.
2. Distinguishes amplitude modulation (AM: the carrier's amplitude follows the signal) from frequency modulation (FM: the carrier's frequency follows the signal), knows that an AM channel occupies a bandwidth of twice the highest audio frequency (5 kHz audio → 10 kHz), and that FM resists noise better because most interference changes amplitude, not frequency.
3. Explains propagation by frequency: low and medium frequencies follow the ground (ground waves); 3–30 MHz short waves are reflected by the ionosphere (sky waves), reaching beyond the horizon, especially at night; VHF and above pass through the ionosphere and travel line of sight (space waves), so a transmitter on a tower of height h reaches about d = √(2Rh) — about 36 km for h = 100 m — which is why FM and TV need tall masts or satellites.

A student who thinks radio waves are sound waves, or that audio could simply be transmitted without a carrier, has **NOT** achieved mastery — those ideas misread every broadcast and phone link.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Radio as "sound through the air" | Cannot say what an antenna sends | Protocol A (Concrete) |
| S1 | AM/FM named | Cannot say why a carrier is needed | Protocol B (Counterexample-first) |
| S2-RADIO-IS-SOUND | Same name, same thing | "Radio waves are sound waves that travel far" | Misconception Engine → then Protocol C |
| S2-NO-CARRIER-NEEDED | Direct transmission | "Just send the audio signal straight from the antenna" | Misconception Engine → then Protocol C |
| S3 | Partial — modulation fine | Cannot explain sky waves or the horizon range | Protocol C (Guided Questioning) |
| S6 | Anxiety on waveforms | Avoids graphs of modulated waves | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What kind of wave travels from a radio station to your radio?"
  "Sound" → SIGNAL:MISCONCEPTION:MC-RADIO-IS-SOUND. Enter Misconception Engine.
  "Electromagnetic (radio) waves" → DB-2.
  No idea → S0. Enter Protocol A (Concrete).

DB-2 (representation / misconception test):
"Why don't stations transmit the audio signal (say 1 kHz) directly as an electromagnetic wave?"
  "Its wavelength would be 300 km — antennas must be comparable to λ — so a high-frequency carrier is modulated instead" → S3. Enter Protocol C.
  "They use a carrier" (no reason) → S1. Enter Protocol B.
  "They could — the carrier is unnecessary" → SIGNAL:MISCONCEPTION:MC-NO-CARRIER-NEEDED. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (propagation check — overlays):
"Why can you hear distant AM stations at night but FM only from nearby?"
  "Short/medium waves reflect off the ionosphere; FM's VHF waves go straight through and travel line of sight" → no flag.
  "FM is weaker" → note; repair at TA-5.
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.electromagnetic-waves`):
"What is the wavelength of a 100 MHz electromagnetic wave, and what speed do all EM waves travel at in vacuum?"
  Cannot say "3 m; c = 3 × 10⁸ m/s" → flag PREREQ-GAP-EM-WAVES.
  In-session minimum repair: one P06 (the EM spectrum with radio at the long end) + one P34 ("1 MHz: wavelength?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: radio as sound.
Success exit: explains carriers, AM vs FM, bandwidth and the three propagation modes (P91 all 5 probes CORRECT).
Failure exit: on RADIO-IS-SOUND → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: AM at Night]
P01
→ P04[content: "At night a car radio can pick up AM stations hundreds of kilometres away, but FM stations fade within about 50 km."]
→ P06[content: a map with an AM station's sky wave bouncing off the ionosphere and an FM mast's line-of-sight range]
→ P14[predict: "What could make AM travel further at night?"] → P55
→ success_path → P49 → P05[curiosity: "And what exactly is being sent?"]

[TA-2: Why a Carrier]
P02
→ P41[diagnostic: "Is the wave from the station a sound wave?"] → P55
→ [if electromagnetic] → P49
→ [if sound] → SIGNAL:MISCONCEPTION:MC-RADIO-IS-SOUND → misconception_repair_chain[MC-RADIO-IS-SOUND]
→ P13[think-aloud: "An antenna radiates well only if it is a sizeable fraction of a wavelength. 1 kHz audio: λ = c/f = 300 km. 100 MHz: λ = 3 m, quarter-wave 0.75 m. So we put the audio onto a high-frequency carrier."]
→ P34[question: "Wavelength and quarter-wave antenna length at 100 MHz?"] → P55
→ success_path[3 m; 0.75 m] → P49

[TA-3: AM and FM]
P02
→ P41[diagnostic: "Could the station skip the carrier?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-NO-CARRIER-NEEDED → misconception_repair_chain[MC-NO-CARRIER-NEEDED]
→ P13[think-aloud: "AM: the carrier's amplitude rises and falls with the audio. FM: its frequency rises and falls instead, constant amplitude. Most electrical noise changes amplitude, so FM sounds cleaner."]
→ P08[notation: "AM bandwidth = 2 × highest audio frequency"]
// GR-3 satisfied: P06 (TA-1) and P13 preceded P08 (V-8 PASS)
→ P34[question: "Audio up to 5 kHz on AM: bandwidth?"] → P55
→ success_path[10 kHz] → P49

[TA-4: Ground, Sky and Space Waves]
P02
→ P13[think-aloud: "Low and medium frequencies hug the ground. 3–30 MHz short waves are bent back by the ionosphere — sky waves — reaching beyond the horizon, best at night when the lower absorbing layer fades. Above ~30 MHz the waves go straight through: line of sight only."]
→ P34[question: "Which mode carries: a 1 MHz AM station by day, a 15 MHz short-wave station, a 100 MHz FM station?"] → P55
→ success_path[ground wave; sky wave; space (line of sight) wave] → P49

[TA-5: The Horizon]
P02
→ P34[question: "An FM mast 100 m tall: range to the horizon (R = 6.4 × 10⁶ m)?"] → P55
→ success_path[d = √(2Rh) ≈ 36 km] → P49
→ failure_path → P50 → P51[diagnose: units] → P52[narrow: "2 × 6.4 × 10⁶ × 100 = 1.28 × 10⁹ m²"] → re-elicit P34 → P55

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Quadruple the mast height. Range?"] → P55
    → P49 → P51[check: doubles]
    → P35[open: "Explain why satellites are used for TV across a whole country."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Choose a frequency band to reach a ship 2000 km away without satellites, and explain."] → P55 → CORRECT
    → P76[transfer: "Why do phone masts need to be so close together?"] → P55 → CORRECT
    → P75[boundary: "A 100 MHz signal aimed at the ionosphere: reflected or not?"] → P55 → CORRECT
    → P74[classify: "Which varies: AM — amplitude or frequency? FM?"] → P55 → CORRECT
    → P78[explain: "Why must the carrier frequency be much higher than the audio?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: names without reasons.
Success exit: explains the carrier with antenna size.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["To send 1 kHz audio directly, how long would a quarter-wave antenna be?"] → P54 (novel) → P55; then TA-3 and TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: modulation fine; propagation not.
Success exit: propagation modes and horizon range.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: carrier idea and the three modes stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); words and maps instead of waveforms; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "radio waves are sound".
Success exit: revises after the vacuum contrast.
Failure exit: Misconception Engine.
Key deltas: open with radio messages from astronauts on the Moon crossing 384 000 km of vacuum; let it sit (P55).

## 6. Misconception Engine

### MC-RADIO-IS-SOUND: "Radio waves are sound waves that travel a long way"
trigger_signal: student identifies the broadcast wave as sound, because a radio produces sound.
conflict_evidence [P28]: "Sound cannot travel through a vacuum, yet radio messages reach us from astronauts on the Moon and from spacecraft beyond Pluto. What kind of wave crosses empty space?"
bridge_text [P30]: "Only electromagnetic waves. A radio station sends electromagnetic waves — radio waves, travelling at 3 × 10⁸ m/s. The receiver decodes them and drives a loudspeaker, which makes the sound you hear. Sound exists only at the two ends: the microphone and the speaker."
replacement_text [P31]: "Broadcast radio waves are electromagnetic; sound is converted to an electrical signal, carried on an EM carrier, and turned back into sound by the receiver."
discrimination_pairs [P33]: ["sound: pressure wave in air, 340 m/s, needs a medium", "radio wave: electromagnetic, 3 × 10⁸ m/s, crosses vacuum"]
s6_path: skip P28; trace the chain microphone → transmitter → radio wave → receiver → speaker.

### MC-NO-CARRIER-NEEDED: "The audio signal could be broadcast directly without a carrier"
trigger_signal: student thinks modulation is an unnecessary complication and audio-frequency signals could be radiated directly.
conflict_evidence [P28]: "A 1 kHz signal has a wavelength of 300 km. An efficient antenna is about a quarter of a wavelength. How long would it be? And if every station broadcast at audio frequencies, how would your radio separate them?"
bridge_text [P30]: "75 km — impossible. And all stations would overlap in the same 20 Hz–20 kHz range. Putting each station's audio on its own high-frequency carrier solves both: a 100 MHz carrier needs only a 0.75 m antenna, and each station occupies its own slot, so a receiver tunes to one carrier and recovers its audio."
replacement_text [P31]: "Modulation puts low-frequency information onto a high-frequency carrier: practical antennas and separate channels."
discrimination_pairs [P33]: ["1 kHz direct: λ = 300 km, quarter-wave antenna 75 km", "100 MHz carrier: λ = 3 m, antenna 0.75 m"]
s6_path: skip P28; the antenna-length comparison alone.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "AM varies… FM varies…" | CORRECT = amplitude; frequency |
| P74 (classify) | "Ground, sky, space wave for 1 MHz / 15 MHz / 100 MHz" | CORRECT = ground; sky; space |
| P75 (boundary) | "100 MHz at the ionosphere" | CORRECT = passes through |
| P76 (transfer) | "Phone masts close together" | CORRECT = high frequencies, line of sight, limited range and capacity per cell |
| P77 (generate) | "Ship 2000 km away" | CORRECT = short wave 3–30 MHz via sky waves |
| P78 (explain) | "Carrier ≫ audio" | CORRECT = antenna size ~λ and channel separation |
| P79 (predict) | "4× mast height" | CORRECT = range doubles |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Choose a frequency band to reach a ship 2000 km away without satellites, and explain." → expected: CORRECT
P76: "Why do phone masts need to be so close together?" → expected: CORRECT
P75: "A 100 MHz signal aimed at the ionosphere: reflected or not?" → expected: CORRECT
P74: "Which varies: AM — amplitude or frequency? FM?" → expected: CORRECT
P78: "Why must the carrier frequency be much higher than the audio?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Why is a carrier needed?"
Interval 2 (3 days): "AM vs FM?"
Interval 3 (7 days): "Range of a 64 m mast?"
Interval 4 (21 days): "What are sky waves?"
Interval 5 (60 days): "Why is FM less noisy?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3) ✓ · V-9 Schema Repair entered only via P41 gate (TA-2, TA-3) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

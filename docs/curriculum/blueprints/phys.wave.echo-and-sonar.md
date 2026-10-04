# Teaching Blueprint: phys.wave.echo-and-sonar

## 0. Concept Profile
concept_id: phys.wave.echo-and-sonar
name: Echo, SONAR and Uses of Ultrasound
domain: Waves & Oscillations (Physics)
difficulty: developing (2)
bloom: apply
prerequisites: [phys.wave.sound-waves]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (a clap in front of a far wall, timed, before d = vt/2; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains an echo as sound reflected from a surface, and finds the distance to the surface from the echo time using d = v t / 2 — the sound travels there AND back.
2. Explains why a distinct echo needs the reflector at least about 17 m away in air: the ear separates two sounds only if they arrive about 0.1 s apart, so 2d ≥ 344 m/s × 0.1 s.
3. Defines ultrasound as sound above about 20 kHz — too high in pitch for humans to hear, not louder — and explains how SONAR uses its echoes to measure depth (v ≈ 1500 m/s in sea water: an echo after 0.8 s means 600 m), plus medical scanning and bat echolocation.

A student who uses d = v t for an echo, or who describes ultrasound as "very loud sound", has **NOT** achieved mastery — the round-trip error doubles every SONAR and radar distance, and the loudness error confuses frequency with amplitude throughout acoustics.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Knows echoes exist, no quantities | Cannot say what an echo time measures | Protocol A (Concrete) |
| S1 | Formula without the round trip | Writes d = vt/2 by rote, cannot explain the 2 | Protocol B (Counterexample-first) |
| S2-FORGET-ROUND-TRIP | Uses d = v t | Gets 1200 m for a 0.8 s SONAR echo | Misconception Engine → then Protocol C |
| S2-ULTRASOUND-IS-LOUD | High frequency read as high amplitude | "Ultrasound is too loud to hear" | Misconception Engine → then Protocol C |
| S3 | Partial — echo distance fine, minimum distance or uses not | Correct depth, no idea why small rooms give no echo | Protocol C (Guided Questioning) |
| S6 | Anxiety on rearranging formulas | Avoids v = d/t variants | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you heard an echo — in a valley, a well, or a large empty hall?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A ship sends a sound pulse down and hears the echo from the sea bed 0.8 s later. Sound travels at 1500 m/s in sea water. How deep is the sea?"
  "600 m — the pulse goes down and back, so half of 1200 m" → S3. Enter Protocol C.
  "600 m" (no reason) → S1. Enter Protocol B.
  "1200 m" → SIGNAL:MISCONCEPTION:MC-FORGET-ROUND-TRIP. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (ultrasound check — overlays):
"Why can't we hear the ultrasound a bat makes?"
  "Its frequency is above about 20 kHz, too high for our ears" → no flag.
  "It is too loud / too quiet" → add SIGNAL:MISCONCEPTION:MC-ULTRASOUND-IS-LOUD (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.wave.sound-waves`):
"What is sound, and roughly how fast does it travel in air?"
  Cannot describe sound as a travelling vibration (pressure wave) with a finite speed of about 340 m/s → flag PREREQ-GAP-SOUND.
  In-session minimum repair: one P06 (seeing distant fireworks before hearing them) + one P34 ("why is there a delay?") then resume. If sound as a wave with a speed is absent, schedule a `phys.wave.sound-waves` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no quantitative echo picture.
Success exit: computes echo distances with the round trip, explains the minimum distance, and describes ultrasound uses correctly (P91 all 5 probes CORRECT).
Failure exit: on FORGET-ROUND-TRIP → Misconception Engine, resume at TA-3. On formula anxiety → Protocol F.
Duration: ~50–60 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Clap and the Wall]
P01
→ P04[content: "An echo is a sound that comes back. Its delay is a measuring tape."]
→ P06[content: a student claps 85 m in front of a large wall; the echo returns 0.5 s later]
→ P14[predict: "In that 0.5 s, how far did the sound travel?"] → P55
→ success_path[170 m — to the wall and back] → P49 → P05[curiosity: "So how far away is the wall?"]

[TA-2: There and Back]
P02
→ P13[think-aloud: "In 0.5 s at 340 m/s sound covers 170 m — but that is the trip to the wall AND back. The wall is half of that: 85 m."]
→ P08[notation: "2d = v t, so d = v t / 2"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Echo from a cliff after 2 s in air (v = 340 m/s). Distance to the cliff?"] → P55
→ success_path[340 m] → P49
→ failure_path → P50 → P51[diagnose: forgot the factor 2 (→MC) or arithmetic] → P52[narrow: "In 2 s, the sound went where and came back?"] → re-elicit P34 → P55

[TA-3: SONAR]
P02
→ P06[content: a ship's SONAR — pulse down, echo up from the sea bed; v = 1500 m/s in sea water]
→ P41[diagnostic: "Echo after 0.8 s. Depth?"] → P55
→ [if 600 m] → P49
→ [if 1200 m] → SIGNAL:MISCONCEPTION:MC-FORGET-ROUND-TRIP → misconception_repair_chain[MC-FORGET-ROUND-TRIP]

[TA-4: Why Small Rooms Have No Echo]
P02
→ P13[think-aloud: "Our ears blend two sounds less than about 0.1 s apart. For the echo to arrive 0.1 s after the clap, the sound must travel 344 × 0.1 = 34.4 m there and back, so the wall must be at least about 17 m away."]
→ P34[question: "In a classroom 8 m long, do you hear a separate echo? What do you hear instead?"] → P55
→ success_path[no — the reflections blend into the original sound, prolonging it (reverberation)] → P49

[TA-5: Ultrasound]
P02
→ P17[contrast: "A whistle can be loud or quiet at the same pitch. Ultrasound is sound above 20 kHz. Is that about loudness or about pitch?"] → P55
→ success_path[pitch — frequency] → P49
→ P13[think-aloud: "Ultrasound has short wavelengths, so it reflects well from small objects and travels as a narrow beam. That is why bats, SONAR and medical scanners use it."]
→ P34[question: "Why is ultrasound, not X-rays, used to scan an unborn baby?"] → P55
→ success_path[it is not ionising — safe for tissue] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A bat hears an echo 0.02 s after its call. Before calculating — closer or further than 5 m?"] → P55
    → P49 → P51[check: 340 × 0.02 / 2 = 3.4 m?]
    → P35[open: "Explain why the echo time is divided by two."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a measurement of the speed of sound using echoes from a distant wall."] → P55 → CORRECT
    → P76[transfer: "A fishing boat's SONAR hears echoes from a fish shoal after 0.2 s and the sea bed after 1.0 s. Depths?"] → P55 → CORRECT
    → P75[boundary: "A wall 10 m away in air. Can you hear a distinct echo?"] → P55 → CORRECT
    → P74[classify: "A 30 kHz sound: ultrasound or infrasound? Audible?"] → P55 → CORRECT
    → P78[explain: "Why is ultrasound called 'ultra'?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula without the reason.
Success exit: explains the factor 2.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Echo after 0.5 s; you stand 85 m from the wall. Check d = vt: 340 × 0.5 = 170 m. Where is the mistake?"] → P54 (novel) → P55; then TA-2.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: distance fine; minimum distance or uses not.
Success exit: all parts correct.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4 or TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: one echo distance computed calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); draw the there-and-back path as two arrows before any formula; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident d = vt.
Success exit: revises after the 85 m contradiction.
Failure exit: Misconception Engine.
Key deltas: open with Protocol B's 85 m wall; let the mismatch sit (P55).

## 6. Misconception Engine

### MC-FORGET-ROUND-TRIP: "The echo distance is speed × echo time"
trigger_signal: student uses d = v t for an echo, giving twice the true distance.
conflict_evidence [P28]: "You stand 85 m from a wall; the echo comes back after 0.5 s. Speed × time = 340 × 0.5 = 170 m. But the wall is at 85 m. What did the sound do in those 0.5 s?"
bridge_text [P30]: "It went to the wall AND came back. The 170 m is the whole round trip; the wall is at half that distance."
replacement_text [P31]: "For any echo — sound, SONAR, radar — total path = 2 × distance, so d = v t / 2."
discrimination_pairs [P33]: ["echo from a cliff, 2 s (d = 340 m, round trip 680 m) vs thunder heard 2 s after lightning (one way: 680 m)", "SONAR 0.8 s (600 m deep) vs a one-way signal in 0.8 s (1200 m)"]
s6_path: skip P28; walk the path on paper — one arrow to the wall, one arrow back — and add their lengths.

### MC-ULTRASOUND-IS-LOUD: "Ultrasound is very loud (or very quiet) sound"
trigger_signal: student explains inaudibility of ultrasound by loudness, or calls ultrasound dangerous because it is loud.
conflict_evidence [P28]: "A dog whistle can be blown softly or hard. Either way you hear nothing, but the dog does. If loudness were the reason, blowing harder would let you hear it. Does it?"
bridge_text [P30]: "No — loudness depends on the amplitude of the wave; whether we can hear it at all depends on its frequency. Our ears respond from about 20 Hz to 20 kHz. Ultrasound is above 20 kHz: too high in PITCH, not too loud."
replacement_text [P31]: "Ultrasound: frequency above about 20 kHz; infrasound: below about 20 Hz. Either can be strong or weak."
discrimination_pairs [P33]: ["a loud 1 kHz siren (audible, high amplitude) vs a faint 40 kHz bat call (inaudible to us, high frequency)", "pitch ↔ frequency vs loudness ↔ amplitude"]
s6_path: skip P28; play a tone sweep rising past 15–18 kHz and notice it fades from hearing at the same volume setting.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "30 kHz: ultrasound or infrasound? Audible?" | CORRECT = ultrasound; not audible to humans |
| P74 (classify) | "Echo after 2 s in air — distance?" | CORRECT = 340 m |
| P75 (boundary) | "Wall 10 m away — distinct echo?" | CORRECT = no; delay 0.06 s < 0.1 s |
| P76 (transfer) | "Shoal 0.2 s, bed 1.0 s at 1500 m/s" | CORRECT = 150 m and 750 m |
| P77 (generate) | "Speed of sound by echoes" | CORRECT = measure distance, time many echoes, v = 2d/t |
| P78 (explain) | "Why 'ultra'?" | CORRECT = beyond (above) the audible frequency range |
| P79 (predict) | "Bat echo after 0.02 s — closer than 5 m?" | CORRECT = yes, 3.4 m |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a measurement of the speed of sound using echoes from a distant wall." → expected: CORRECT
P76: "A fishing boat's SONAR hears echoes from a fish shoal after 0.2 s and the sea bed after 1.0 s. Depths?" → expected: CORRECT
P75: "A wall 10 m away in air. Can you hear a distinct echo?" → expected: CORRECT
P74: "A 30 kHz sound: ultrasound or infrasound? Audible?" → expected: CORRECT
P78: "Why is ultrasound called 'ultra'?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Echo after 1.5 s from a cliff — distance?"
Interval 2 (3 days): "Why is the echo time divided by 2?"
Interval 3 (7 days): "Minimum distance for a distinct echo in air, and why?"
Interval 4 (21 days): "Name three uses of ultrasound."
Interval 5 (60 days): "How does a bat tell how far away a moth is?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

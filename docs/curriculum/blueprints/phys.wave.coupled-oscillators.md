# Teaching Blueprint: phys.wave.coupled-oscillators

## 0. Concept Profile
concept_id: phys.wave.coupled-oscillators
name: Coupled Oscillators and Normal Modes
domain: Waves & Oscillations (Physics)
difficulty: expert (5)
bloom: apply
prerequisites: [phys.wave.shm, phys.wave.standing-waves]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (two pendulums hanging from a slack string, one set swinging, before any equation; difficulty 5)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains normal modes: when oscillators are coupled, there are special patterns of motion — normal modes — in which every part oscillates sinusoidally at the SAME frequency, and a system has as many modes as it has degrees of freedom. For two equal masses m between three equal springs k (wall–m–m–wall), the in-phase mode has ω₁ = √(k/m) (the middle spring never stretches) and the out-of-phase mode ω₂ = √(3k/m): with k = 10 N/m and m = 0.1 kg, 10 rad/s and 17.3 rad/s.
2. Explains that any motion of a linear coupled system is a superposition of its normal modes, so starting one oscillator alone excites both modes; for weakly coupled pendulums (ω₁ = 3.130 rad/s, ω₂ = 3.286 rad/s) the two modes drift in and out of step and the energy passes completely from one pendulum to the other and back, a full swap every π/(ω₂ − ω₁) ≈ 20 s.
3. Connects modes to standing waves: a stretched string is a chain of infinitely many coupled oscillators, and its normal modes are exactly its standing-wave harmonics, f_n = n f₁.

A student who thinks a coupled system has just one natural frequency, or that the energy stays in the oscillator that was struck, has **NOT** achieved mastery — those ideas misread molecules, bridges and musical instruments alike.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Only single oscillators known | Cannot predict what coupling does | Protocol A (Concrete) |
| S1 | "Normal mode" recited | Cannot find the modes of a simple system | Protocol B (Counterexample-first) |
| S2-ONE-FREQUENCY-PER-SYSTEM | Single-oscillator habit | "The coupled system has one natural frequency" | Misconception Engine → then Protocol C |
| S2-ENERGY-STAYS-PUT | Local thinking | "The pendulum you push keeps swinging; the other barely moves" | Misconception Engine → then Protocol C |
| S3 | Partial — modes fine | Cannot link modes to standing waves | Protocol C (Guided Questioning) |
| S6 | Anxiety on simultaneous equations | Avoids two-variable algebra | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Two identical pendulums hang from a slack string. You set one swinging and hold the other still, then let go. What happens over the next minute?"
  "The second starts swinging as the first slows, then they swap back" → DB-2.
  "The first keeps swinging; the second just twitches" → SIGNAL:MISCONCEPTION:MC-ENERGY-STAYS-PUT. Enter Misconception Engine.
  No idea → S0. Enter Protocol A (Concrete).

DB-2 (representation / misconception test):
"Two masses m between three springs k (wall–m–m–wall). At how many different frequencies can the system oscillate in a pure, repeating pattern?"
  "Two — in phase at √(k/m) and out of phase at √(3k/m)" → S3. Enter Protocol C.
  "Two" (no values) → S1. Enter Protocol B.
  "One — like any oscillator" → SIGNAL:MISCONCEPTION:MC-ONE-FREQUENCY-PER-SYSTEM. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (string check — overlays):
"How many normal modes does a guitar string have?"
  "Infinitely many — its harmonics" → no flag.
  "One" → note; repair at TA-5.
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.wave.shm` and `phys.wave.standing-waves`):
"What is the angular frequency of a mass m on a spring k? What are the allowed frequencies of a string fixed at both ends?"
  Cannot say "ω = √(k/m); f_n = n f₁" → flag PREREQ-GAP-SHM-STANDING.
  In-session minimum repair: one P06 (a mass on a spring; a string's first three harmonics) + one P34 ("k = 40 N/m, m = 0.1 kg: ω?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: only single oscillators known.
Success exit: finds the two modes, explains energy exchange, links modes to standing waves (P91 all 5 probes CORRECT).
Failure exit: on ENERGY-STAYS-PUT → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Two Pendulums on a String]
P01
→ P04[content: "Two pendulums hang from a slack string. Start one swinging and watch for a minute."]
→ P06[content: a video or simulation: the first pendulum's swing dies away as the second's grows, then they swap back]
→ P14[predict: "Is there a way to start them so that they never swap?"] → P55
→ success_path → P49 → P05[curiosity: "What are those special starting patterns?"]

[TA-2: Normal Modes]
P02
→ P13[think-aloud: "Start both pendulums swinging together, in phase: the string between them never pulls, so each swings at its own frequency forever. Start them in opposite directions: the coupling pulls both back harder, so they swing faster — and also forever. These two patterns are the normal modes: every part at one shared frequency."]
→ P13[think-aloud: "Two masses between three springs: in phase, the middle spring never stretches, ω₁ = √(k/m). Out of phase, each mass feels its outer spring plus the middle spring stretched twice as much: ω₂ = √(3k/m)."]
→ P08[notation: "ω₁ = √(k/m),  ω₂ = √(3k/m);  number of modes = degrees of freedom"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P41[diagnostic: "How many mode frequencies?"] → P55
→ [if two] → P49
→ [if one] → SIGNAL:MISCONCEPTION:MC-ONE-FREQUENCY-PER-SYSTEM → misconception_repair_chain[MC-ONE-FREQUENCY-PER-SYSTEM]
→ P34[question: "k = 10 N/m, m = 0.1 kg: ω₁ and ω₂?"] → P55
→ success_path[10 rad/s; 17.3 rad/s] → P49

[TA-3: Energy Exchange]
P02
→ P41[diagnostic: "Start one pendulum alone. Does its energy stay with it?"] → P55
→ [if no — it swaps] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-ENERGY-STAYS-PUT → misconception_repair_chain[MC-ENERGY-STAYS-PUT]
→ P13[think-aloud: "Starting one alone is half in-phase mode plus half out-of-phase mode. Their frequencies differ slightly, so they drift out of step and back — like beats. The energy swaps fully every π/(ω₂ − ω₁)."]
→ P34[question: "ω₁ = 3.130, ω₂ = 3.286 rad/s: time for a full swap?"] → P55
→ success_path[π/0.156 ≈ 20 s] → P49
→ failure_path → P50 → P51[diagnose: beat formula] → P52[narrow: "Swap time = half the beat period 2π/(ω₂ − ω₁)"] → re-elicit P34 → P55

[TA-4: Superposition]
P02
→ P34[question: "Any starting position can be written as a mix of the two modes. Why does that make the motion predictable?"] → P55
→ success_path[each mode just oscillates at its own frequency; add them up at any time] → P49

[TA-5: From Two to Many — Standing Waves]
P02
→ P13[think-aloud: "Add more masses: three masses, three modes; N masses, N modes. A string is a chain of countless tiny masses — so it has countless modes, and they are exactly its standing waves: f₁, 2f₁, 3f₁…"]
→ P34[question: "A string's fundamental is 110 Hz. Frequencies of its next two modes?"] → P55
→ success_path[220 Hz, 330 Hz] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Stiffen the coupling spring. Does the energy swap faster or slower?"] → P55
    → P49 → P51[check: faster — the mode frequencies move further apart]
    → P35[open: "Explain why striking one pendulum ends up moving both."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a starting condition that excites only the out-of-phase mode."] → P55 → CORRECT
    → P76[transfer: "Why does a CO₂ molecule absorb infrared only at certain frequencies?"] → P55 → CORRECT
    → P75[boundary: "With zero coupling, how often do the pendulums swap energy?"] → P55 → CORRECT
    → P74[classify: "Three masses on springs: how many normal modes?"] → P55 → CORRECT
    → P78[explain: "Why is the out-of-phase mode faster?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: C
Entry condition: term without method.
Success exit: finds both modes with reasons.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["In the in-phase pattern, does the middle spring ever stretch? So what frequency is that?"] → P54 (novel) → P55; then TA-3 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: modes fine; string link not.
Success exit: modes ↔ standing waves explained.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run TA-5 and the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: the two modes described in words and the swap observed.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); words and demonstrations, frequencies given; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: C
Entry condition: confident "energy stays put".
Success exit: revises after watching the full swap.
Failure exit: Misconception Engine.
Key deltas: open with the simulation running for a minute; let it sit (P55).

## 6. Misconception Engine

### MC-ONE-FREQUENCY-PER-SYSTEM: "A coupled system has one natural frequency"
trigger_signal: student assigns a single natural frequency to a system of coupled oscillators, carrying over the single mass-on-spring result.
conflict_evidence [P28]: "Move both masses the same way: does the middle spring stretch? Now move them opposite ways: what does the middle spring do? Can both patterns have the same restoring force?"
bridge_text [P30]: "In phase, the middle spring is never stretched, so each mass feels just one spring: ω₁ = √(k/m). Out of phase, the middle spring is stretched by twice each displacement and pulls back extra hard: ω₂ = √(3k/m). Two different patterns, two different frequencies — one for each degree of freedom."
replacement_text [P31]: "A coupled system has one normal-mode frequency per degree of freedom; general motion is a mix of modes."
discrimination_pairs [P33]: ["single mass on a spring: one frequency √(k/m)", "two coupled masses: √(k/m) and √(3k/m)"]
s6_path: skip P28; act out the two patterns with two people holding a stretchy band.

### MC-ENERGY-STAYS-PUT: "The oscillator that is struck keeps the energy"
trigger_signal: student predicts that only the initially displaced oscillator keeps moving while its coupled partner barely responds.
conflict_evidence [P28]: "Watch two coupled pendulums for a full minute after starting only one. Where is the energy after 20 seconds?"
bridge_text [P30]: "In the other pendulum. Starting one alone is a mix of the in-phase and out-of-phase modes with slightly different frequencies; as they drift apart in phase, the motion moves to the second pendulum, then drifts back. The swap takes π/(ω₂ − ω₁) — about 20 s here — however weak the coupling; weak coupling only makes it slower."
replacement_text [P31]: "Energy passes back and forth between coupled oscillators at the beat frequency of their normal modes."
discrimination_pairs [P33]: ["t = 0: first pendulum swinging, second still", "t ≈ 20 s: first still, second swinging"]
s6_path: skip P28; watch the simulation alone.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Three masses: modes?" | CORRECT = three |
| P74 (classify) | "Which mode is faster?" | CORRECT = out-of-phase |
| P75 (boundary) | "Zero coupling" | CORRECT = never swap (identical frequencies) |
| P76 (transfer) | "CO₂ infrared" | CORRECT = molecular vibrations are normal modes at fixed frequencies |
| P77 (generate) | "Excite only the out-of-phase mode" | CORRECT = equal and opposite initial displacements |
| P78 (explain) | "Out-of-phase faster" | CORRECT = the coupling spring adds restoring force |
| P79 (predict) | "Stiffer coupling" | CORRECT = faster swap |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a starting condition that excites only the out-of-phase mode." → expected: CORRECT
P76: "Why does a CO₂ molecule absorb infrared only at certain frequencies?" → expected: CORRECT
P75: "With zero coupling, how often do the pendulums swap energy?" → expected: CORRECT
P74: "Three masses on springs: how many normal modes?" → expected: CORRECT
P78: "Why is the out-of-phase mode faster?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "What is a normal mode?"
Interval 2 (3 days): "k = 40 N/m, m = 0.1 kg: both mode frequencies?"
Interval 3 (7 days): "Why do coupled pendulums swap energy?"
Interval 4 (21 days): "Swap time for ω₁ = 6.0, ω₂ = 6.3 rad/s?"
Interval 5 (60 days): "How are standing waves normal modes?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-2, TA-3) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

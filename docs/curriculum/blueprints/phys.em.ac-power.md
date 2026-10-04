# Teaching Blueprint: phys.em.ac-power

## 0. Concept Profile
concept_id: phys.em.ac-power
name: Power in AC Circuits, Power Factor and Wattless Current
domain: Electricity & Magnetism (Physics)
difficulty: advanced (4)
bloom: apply
prerequisites: [phys.em.lcr-circuits]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a factory's electricity bill penalising "poor power factor", before any formula; difficulty 4)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains that when current and voltage are out of step by φ, part of each cycle the circuit returns energy to the supply, so the average power is P = V_rms I_rms cos φ, where cos φ = R/Z is the power factor — and that only the resistance dissipates energy (P = I_rms² R).
2. Computes it — the series circuit with R = 40 Ω, Z = 50 Ω on 200 V rms carries 4 A, has cos φ = 0.8, and takes 200 × 4 × 0.8 = 640 W, the same as 4² × 40; the apparent power V_rms I_rms = 800 VA is larger.
3. Explains wattless current — a pure inductor or capacitor (φ = 90°, cos φ = 0) carries current but takes no average power — and why a low power factor is costly: the same useful power needs more current, so more heating in the transmission lines; adding a capacitor to an inductive load raises the power factor.

A student who thinks AC power is always V_rms × I_rms, or that a wattless current is no current at all, has **NOT** achieved mastery — those ideas misread every power bill and power-factor correction.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Only P = VI known | Has never met phase in power | Protocol A (Concrete) |
| S1 | Formula recited | Writes cos φ but cannot say what it means | Protocol B (Counterexample-first) |
| S2-POWER-IS-VI | DC habit | "P = V_rms I_rms, always" | Misconception Engine → then Protocol C |
| S2-WATTLESS-NO-CURRENT | Word taken literally | "Wattless current means no current flows" | Misconception Engine → then Protocol C |
| S3 | Partial — formula fine, consequences not | Cannot explain power-factor correction | Protocol C (Guided Questioning) |
| S6 | Anxiety on phase | Avoids trigonometry | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Why might an electricity company charge a factory extra for a 'poor power factor'?"
  No idea → S0. Enter Protocol A (Concrete).
  "The factory draws more current than the power it uses needs" → DB-2.

DB-2 (representation / misconception test):
"An AC circuit carries 4 A rms at 200 V rms, with the current lagging the voltage by 37° (cos φ = 0.8). What average power does it take?"
  "640 W — V I cos φ, because for part of each cycle energy flows back to the supply" → S3. Enter Protocol C.
  "640 W" (no reason) → S1. Enter Protocol B.
  "800 W — P = VI" → SIGNAL:MISCONCEPTION:MC-POWER-IS-VI. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (wattless check — overlays):
"A pure inductor connected to 200 V AC carries 2.5 A. Is current flowing? What average power does it take?"
  "Yes, 2.5 A flows, but the average power is zero" → no flag.
  "No current really flows — it is wattless" → add SIGNAL:MISCONCEPTION:MC-WATTLESS-NO-CURRENT (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.lcr-circuits`):
"R = 40 Ω, X_L = 80 Ω, X_C = 50 Ω in series. Impedance, and does the current lead or lag?"
  Cannot say "50 Ω, lags" → flag PREREQ-GAP-LCR.
  In-session minimum repair: one P06 (the impedance triangle) + one P34 ("Z for R = 30, X = 40 Ω?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: only P = VI known.
Success exit: computes average power and power factor, explains wattless current and correction (P91 all 5 probes CORRECT).
Failure exit: on POWER-IS-VI → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Power-Factor Penalty]
P01
→ P04[content: "Factories with large motors get charged extra for a poor power factor. Their meters show current flowing that does no useful work."]
→ P06[content: a graph of v, i and their product p = vi over two cycles, current lagging — p dips below zero twice a cycle]
→ P14[predict: "What does it mean when the power curve goes below zero?"] → P55
→ success_path → P49 → P05[curiosity: "How much power does the circuit take on average?"]

[TA-2: Average Power]
P02
→ P13[think-aloud: "When current and voltage are out of step, for part of each cycle the circuit hands energy back to the supply. The average works out to P = V_rms I_rms cos φ. cos φ is the power factor, and from the impedance triangle cos φ = R/Z."]
→ P08[notation: "P = V_rms I_rms cos φ;  cos φ = R/Z;  P = I_rms² R"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "R = 40 Ω, Z = 50 Ω, 200 V rms. Current, power factor, power?"] → P55
→ success_path[4 A, 0.8, 640 W — check: 4² × 40 = 640 W] → P49
→ failure_path → P50 → P51[diagnose: cos φ] → P52[narrow: "R/Z = 40/50"] → re-elicit P34 → P55

[TA-3: Not Simply VI]
P02
→ P41[diagnostic: "200 V, 4 A, cos φ = 0.8. Average power?"] → P55
→ [if 640 W] → P49
→ [if 800 W] → SIGNAL:MISCONCEPTION:MC-POWER-IS-VI → misconception_repair_chain[MC-POWER-IS-VI]
→ P13[think-aloud: "V_rms I_rms = 800 VA is the apparent power — what the wires must carry. Only 640 W is actually used."]

[TA-4: Wattless Current]
P02
→ P41[diagnostic: "Pure inductor, X_L = 80 Ω, 200 V. Current? Average power?"] → P55
→ [if 2.5 A and zero] → P49
→ [if 'no current'] → SIGNAL:MISCONCEPTION:MC-WATTLESS-NO-CURRENT → misconception_repair_chain[MC-WATTLESS-NO-CURRENT]

[TA-5: Why Power Factor Matters]
P02
→ P34[question: "A motor needs 640 W at 200 V. How much current at power factor 0.8? At 1.0? Which heats the supply cables more?"] → P55
→ success_path[4 A vs 3.2 A; heating ∝ I², so 1.56 times more at 0.8] → P49
→ P13[think-aloud: "Motors are inductive. Adding a capacitor cancels some of the inductive reactance, bringing the power factor towards 1 — power-factor correction."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "At resonance in a series LCR circuit, what is the power factor?"] → P55
    → P49 → P51[check: Z = R, so cos φ = 1]
    → P35[open: "Explain why a pure capacitor takes no average power even though current flows."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Suggest how a factory with many motors could reduce its power-factor penalty."] → P55 → CORRECT
    → P76[transfer: "Why do power companies prefer loads with power factor near 1?"] → P55 → CORRECT
    → P75[boundary: "φ = 90°: power?"] → P55 → CORRECT
    → P74[classify: "Which component dissipates energy in an LCR circuit?"] → P55 → CORRECT
    → P78[explain: "Why is AC power V_rms I_rms cos φ and not V_rms I_rms?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula without meaning.
Success exit: explains the negative parts of the power curve.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["A pure inductor carries 2.5 A at 200 V. Its temperature never rises. Where did VI = 500 W go?"] → P54 (novel) → P55; then TA-3 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: formula fine; consequences not.
Success exit: explains correction and transmission losses.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: power factor computed as R/Z and one power found calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use cos φ = R/Z only (no angles); P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "P = VI".
Success exit: revises after the cold-inductor contrast.
Failure exit: Misconception Engine.
Key deltas: open with the pure inductor that carries current yet stays cold; let it sit (P55).

## 6. Misconception Engine

### MC-POWER-IS-VI: "AC power is always V_rms × I_rms"
trigger_signal: student computes the average power of a reactive AC circuit as V_rms I_rms, ignoring the phase difference.
conflict_evidence [P28]: "A pure inductor on 200 V carries 2.5 A. If P = VI, it would take 500 W and get hot. It stays cold. Where is the 500 W?"
bridge_text [P30]: "There is no 500 W. With current and voltage a quarter cycle apart, the inductor stores energy in its field for half of each cycle and gives it all back for the other half. Averaged over a cycle, nothing is used. In general only the in-phase part of the current does work: P = V_rms I_rms cos φ."
replacement_text [P31]: "Average AC power = V_rms I_rms cos φ = I_rms² R; V_rms I_rms is the apparent power (VA), larger whenever cos φ < 1."
discrimination_pairs [P33]: ["resistor: φ = 0, P = V_rms I_rms", "the 40 Ω / 50 Ω circuit: 800 VA apparent, 640 W real"]
s6_path: skip P28; compare the warm resistor and the cold inductor carrying equal currents.

### MC-WATTLESS-NO-CURRENT: "A wattless current is no current at all"
trigger_signal: student treats "wattless current" as meaning no current flows, or as harmless to the supply.
conflict_evidence [P28]: "An ammeter in series with a pure inductor on 200 V reads 2.5 A. Is current flowing? Do the supply cables carry it?"
bridge_text [P30]: "A real 2.5 A flows back and forth, and the cables carry it — and heat up because of it (I²R in the wires). It is 'wattless' only because the inductor itself takes no AVERAGE power. That is exactly why low power factors waste transmission capacity."
replacement_text [P31]: "Wattless current: real current, 90° out of phase with the voltage, giving zero average power in the reactive component but real losses in the supply wires."
discrimination_pairs [P33]: ["inductor: 2.5 A flows, 0 W average", "the supply cable carrying it: I²R heating, not zero"]
s6_path: skip P28; read the ammeter in the inductor circuit.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Which component dissipates energy?" | CORRECT = only the resistor |
| P74 (classify) | "Power factor at resonance" | CORRECT = 1 |
| P75 (boundary) | "φ = 90°" | CORRECT = zero average power |
| P76 (transfer) | "Why companies prefer cos φ ≈ 1" | CORRECT = less current for the same power, smaller line losses |
| P77 (generate) | "Reduce the penalty" | CORRECT = add capacitors to cancel the motors' inductive reactance |
| P78 (explain) | "Why cos φ" | CORRECT = energy returned to the supply part of each cycle |
| P79 (predict) | "Series resonance power factor" | CORRECT = 1 |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Suggest how a factory with many motors could reduce its power-factor penalty." → expected: CORRECT
P76: "Why do power companies prefer loads with power factor near 1?" → expected: CORRECT
P75: "φ = 90°: power?" → expected: CORRECT
P74: "Which component dissipates energy in an LCR circuit?" → expected: CORRECT
P78: "Why is AC power V_rms I_rms cos φ and not V_rms I_rms?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Write the AC power formula."
Interval 2 (3 days): "230 V, 5 A, cos φ = 0.6: power?"
Interval 3 (7 days): "What is a wattless current?"
Interval 4 (21 days): "Why does a capacitor improve a motor's power factor?"
Interval 5 (60 days): "Why do bills penalise poor power factors?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

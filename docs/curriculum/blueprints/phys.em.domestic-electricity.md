# Teaching Blueprint: phys.em.domestic-electricity

## 0. Concept Profile
concept_id: phys.em.domestic-electricity
name: Household Circuits, Fuses, Earthing and Safety
domain: Electricity & Magnetism (Physics)
difficulty: developing (2)
bloom: apply
prerequisites: [phys.em.electrical-power]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (a three-pin plug and a household wiring diagram before current ratings; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Describes household wiring: live, neutral and earth wires (in India, a 220 V, 50 Hz supply); appliances connected in PARALLEL so each gets the full voltage and can be switched independently; switches and fuses or MCBs placed in the LIVE wire.
2. Chooses a fuse or MCB rating from the appliance's current, I = P/V, picking the next standard rating just above it — e.g. a 2 kW kettle on 220 V draws about 9.1 A, so a 10 A (not 5 A, not 30 A) protection is right — and explains overloading (too many appliances on one circuit) and short circuits (live touching neutral) as causes of dangerously large currents.
3. Explains earthing: the metal body of an appliance is connected to earth, so if the live wire touches the casing a large current flows to earth through the low-resistance earth wire and blows the fuse or trips the MCB, instead of passing through a person.

A student who puts the fuse in the neutral wire, chooses a 30 A fuse "to be safe", or says the earth wire carries current all the time, has **NOT** achieved mastery — each of these can leave a live, dangerous appliance in a real home.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Plugs and switches as black boxes | Cannot name the three wires | Protocol A (Concrete) |
| S1 | Names without reasons | Names live/neutral/earth but cannot say why the fuse is in the live | Protocol B (Counterexample-first) |
| S2-FUSE-ANYWHERE | Fuse position irrelevant | "The fuse can go in neutral; current is the same" | Misconception Engine → then Protocol C |
| S2-BIGGER-FUSE-SAFER | Rating reasoning inverted | "A 30 A fuse is safer because it won't blow" | Misconception Engine → then Protocol C |
| S3 | Partial — wiring fine, rating or earthing not | Correct diagram, wrong fuse choice | Protocol C (Guided Questioning) |
| S6 | Anxiety on P = VI | Avoids the rating calculation | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Can you name the three wires in a household plug and the colour of each?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"Why must the fuse or MCB be in the live wire rather than the neutral?"
  "If it were in the neutral, a blown fuse would still leave the appliance connected to the live — still dangerous to touch" → S3. Enter Protocol C.
  "Because it's the rule" (no reason) → S1. Enter Protocol B.
  "It doesn't matter — the same current flows in both" → SIGNAL:MISCONCEPTION:MC-FUSE-ANYWHERE. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (rating check — overlays):
"A 2 kW kettle on 220 V. Which fuse: 5 A, 10 A or 30 A?"
  "10 A — the kettle draws about 9 A" → no flag.
  "30 A — a bigger fuse is safer" → add SIGNAL:MISCONCEPTION:MC-BIGGER-FUSE-SAFER (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.electrical-power`):
"A heater rated 1100 W runs on 220 V. What current does it draw?"
  Cannot give I = P/V = 5 A → flag PREREQ-GAP-POWER.
  In-session minimum repair: one P06 (an appliance rating plate) + one P34 ("power = voltage × current; rearrange") then resume. If P = VI is absent, schedule a `phys.em.electrical-power` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: cannot name the wires.
Success exit: explains wiring, chooses a fuse rating, and explains earthing (P91 all 5 probes CORRECT).
Failure exit: on FUSE-ANYWHERE → Misconception Engine, resume at TA-3. On calculation anxiety → Protocol F.
Duration: ~50–60 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Three Wires]
P01
→ P04[content: "Every socket has three connections, and each has one job. Knowing them can save your life."]
→ P06[content: a three-pin plug — live (red or brown), neutral (black or blue), earth (green or green-yellow); the household supply 220 V, 50 Hz AC]
→ P14[predict: "Which wire is at high voltage, and which ones stay near zero?"] → P55
→ success_path[live at 220 V (AC); neutral near 0 V; earth at 0 V] → P49 → P05[curiosity: "So why have three wires at all?"]

[TA-2: Parallel Wiring]
P02
→ P07[modality: a household circuit — mains, MCB, and several appliances each across live and neutral, each with its own switch in the live]
→ P13[think-aloud: "Appliances are in parallel: each gets the full 220 V and works independently. In series, switching one off would switch them all off, and each would get only part of the voltage."]
→ P34[question: "Why are switches put in the live wire?"] → P55
→ success_path[so that 'off' disconnects the appliance from the high voltage] → P49

[TA-3: Fuses and MCBs]
P02
→ P13[think-aloud: "A fuse is a thin wire that melts when the current exceeds its rating; an MCB trips. Either one must be in the live wire, so that when it breaks, the appliance is cut off from the 220 V."]
→ P41[diagnostic: "A fuse in the NEUTRAL blows. Is the appliance safe to touch?"] → P55
→ [if no — still connected to the live] → P49
→ [if "yes, current has stopped"] → SIGNAL:MISCONCEPTION:MC-FUSE-ANYWHERE → misconception_repair_chain[MC-FUSE-ANYWHERE]

[TA-4: Choosing a Rating]
P02
→ P08[notation: "I = P / V ; choose the standard rating just above I (common: 3, 5, 10, 13, 15 A)"]
// GR-3 satisfied: P06/P07 and P13 preceded P08 (V-8 PASS)
→ P41[diagnostic: "2 kW kettle on 220 V. Which fuse — 5, 10 or 30 A?"] → P55
→ [if 10 A (I ≈ 9.1 A)] → P49
→ [if 30 A] → SIGNAL:MISCONCEPTION:MC-BIGGER-FUSE-SAFER → misconception_repair_chain[MC-BIGGER-FUSE-SAFER]
→ P34[question: "Why would a 5 A fuse be wrong?"] → P55
→ success_path[it would blow every time the kettle is used] → P49

[TA-5: Overload, Short Circuit, Earthing]
P02
→ P13[think-aloud: "Overload: too many appliances on one circuit; the total current exceeds the wiring's safe limit. Short circuit: live touches neutral directly; resistance near zero, current huge. Earthing: the metal case is wired to earth; if the live touches it, a large current rushes to earth and blows the fuse at once."]
→ P34[question: "If the live wire touches the metal case of an earthed washing machine, what happens, and why are you safe?"] → P55
→ success_path[large current to earth, fuse blows / MCB trips, case is cut off; current takes the low-resistance earth path, not you] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A 1 kW iron, a 2 kW heater and a 1.5 kW kettle all run on one 15 A circuit at 220 V. Before computing — safe?"] → P55
    → P49 → P51[check: 4.5 kW / 220 V ≈ 20.5 A > 15 A — overload]
    → P35[open: "Explain how earthing protects a person touching a faulty appliance."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "List the appliances you could safely run together on a 10 A circuit at 220 V, with your calculation."] → P55 → CORRECT
    → P76[transfer: "A plastic-bodied hair dryer has only two wires. Why is it allowed to have no earth?"] → P55 → CORRECT
    → P75[boundary: "A fuse is rated exactly equal to the appliance's normal current. Good choice?"] → P55 → CORRECT
    → P74[classify: "Overload or short circuit: (a) live touches neutral, (b) too many heaters on one socket?"] → P55 → CORRECT
    → P78[explain: "Why must the fuse be in the live wire?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: names without reasons.
Success exit: reasons for live-wire fuse and earthing.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Fuse in the neutral, fuse blows. Touch the appliance's internal wire. What voltage is it at?"] → P54 (novel) → P55; then TA-3.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: wiring fine; rating or earthing not.
Success exit: all parts.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4 or TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: three wires and one fuse choice made calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use 1100 W and 2200 W appliances first (5 A, 10 A); P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident wrong fuse choice or position.
Success exit: revises after the counterexample.
Failure exit: Misconception Engine.
Key deltas: open with the 30 A fuse on a frayed 1 kW lamp cable that overheats at 12 A without the fuse blowing; let it sit (P55).

## 6. Misconception Engine

### MC-FUSE-ANYWHERE: "The fuse can go in the live or the neutral — the same current flows in both"
trigger_signal: student says fuse or switch position does not matter.
conflict_evidence [P28]: "Put the fuse in the neutral. A fault makes it blow. The appliance's wiring is still joined to the live wire at 220 V. Is it safe to touch now?"
bridge_text [P30]: "No — the current has stopped, but the appliance is still connected to 220 V. A person who touches it completes a path to earth through their body. With the fuse in the live, a blown fuse cuts the appliance off from the high voltage altogether."
replacement_text [P31]: "Fuses, MCBs and switches always go in the live wire, so that breaking the circuit removes the high voltage from the appliance."
discrimination_pairs [P33]: ["fuse in live blows → appliance at 0 V (safe)", "fuse in neutral blows → appliance still at 220 V (dangerous)"]
s6_path: skip P28; trace the live wire's path into the appliance on a diagram and mark where 220 V still reaches when each fuse position is broken.

### MC-BIGGER-FUSE-SAFER: "A higher-rated fuse is safer because it doesn't blow"
trigger_signal: student picks the largest available rating, or treats a blown fuse as the danger.
conflict_evidence [P28]: "A thin lamp cable is safe up to 5 A. It is protected by a 30 A fuse. A fault draws 12 A. What happens to the cable, and to the fuse?"
bridge_text [P30]: "The cable overheats and can start a fire, while the 30 A fuse stays intact. A fuse is meant to blow — that is the protection. It must blow just above the normal current, before wiring or the appliance is damaged."
replacement_text [P31]: "Choose the standard rating just ABOVE the appliance's normal current I = P/V: a 2 kW kettle at 220 V (≈ 9.1 A) gets 10 A."
discrimination_pairs [P33]: ["10 A fuse on a 9.1 A kettle: blows on a fault, not in normal use", "5 A fuse on the same kettle: blows every time it is used; 30 A: never blows until too late"]
s6_path: skip P28; compute the kettle's current together and line it up against 5, 10 and 30 A on a number line.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "(a) live touches neutral, (b) too many heaters" | CORRECT = short circuit; overload |
| P74 (classify) | "Appliances in series or parallel at home?" | CORRECT = parallel |
| P75 (boundary) | "Fuse rated exactly at normal current?" | CORRECT = poor — it may blow in normal use (switch-on surges); pick just above |
| P76 (transfer) | "Two-wire plastic hair dryer" | CORRECT = double insulated; no exposed metal to become live |
| P77 (generate) | "Appliances on a 10 A circuit" | CORRECT = total P ≤ 2200 W at 220 V |
| P78 (explain) | "Fuse in the live — why?" | CORRECT = a blown fuse then disconnects the appliance from 220 V |
| P79 (predict) | "4.5 kW on a 15 A circuit" | CORRECT = ≈ 20.5 A — overload |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "List the appliances you could safely run together on a 10 A circuit at 220 V, with your calculation." → expected: CORRECT
P76: "A plastic-bodied hair dryer has only two wires. Why is it allowed to have no earth?" → expected: CORRECT
P75: "A fuse is rated exactly equal to the appliance's normal current. Good choice?" → expected: CORRECT
P74: "Overload or short circuit: (a) live touches neutral, (b) too many heaters on one socket?" → expected: CORRECT
P78: "Why must the fuse be in the live wire?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Name the three wires, their colours and their jobs."
Interval 2 (3 days): "Fuse for a 1.5 kW microwave on 220 V?"
Interval 3 (7 days): "Why are household appliances wired in parallel?"
Interval 4 (21 days): "How does earthing protect you?"
Interval 5 (60 days): "Why does an MCB trip when you plug too many heaters into one board?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-4) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

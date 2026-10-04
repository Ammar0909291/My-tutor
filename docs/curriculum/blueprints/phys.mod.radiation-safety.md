# Teaching Blueprint: phys.mod.radiation-safety

## 0. Concept Profile
concept_id: phys.mod.radiation-safety
name: Radiation Dose, Biological Effects and Safety
domain: Modern Physics (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.mod.radioactivity]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a radiographer stepping behind a lead screen during an X-ray, and irradiated strawberries on a shop shelf, before any unit; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Uses the dose quantities: absorbed dose D = energy absorbed / mass, in grays (1 Gy = 1 J/kg); equivalent dose H = D × w_R, in sieverts, where the radiation weighting factor w_R is 1 for beta, gamma and X-rays and 20 for alpha particles. A 70 kg person absorbing 0.014 J of gamma radiation receives 0.2 mGy, i.e. 0.2 mSv; 0.1 mGy of alpha in lung tissue is 2 mSv. Typical natural background is about 2–3 mSv per year.
2. Explains biological effects — ionising radiation damages DNA; large doses cause radiation sickness, while low doses raise long-term cancer risk roughly in proportion to dose — and why alpha emitters are harmless outside the body (stopped by skin) but very dangerous if inhaled or swallowed (all their energy deposited in a few cells).
3. Applies the three protections — time (dose ∝ exposure time), distance (from a point source, dose rate ∝ 1/r², so doubling the distance quarters it) and shielding (paper stops alpha, a few mm of aluminium stops beta, gamma is reduced by lead or concrete) — and distinguishes irradiation (exposure to radiation, which does not make an object radioactive) from contamination (radioactive material on or in it).

A student who thinks irradiated food becomes radioactive, or that alpha radiation is harmless because it can't get through skin, has **NOT** achieved mastery — those ideas misjudge every real radiation risk.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Radiation as one vague danger | Cannot say what a sievert measures | Protocol A (Concrete) |
| S1 | Units recited | Cannot convert Gy to Sv for alpha | Protocol B (Counterexample-first) |
| S2-IRRADIATED-BECOMES-RADIOACTIVE | Contagion picture | "Irradiated food is radioactive" | Misconception Engine → then Protocol C |
| S2-ALPHA-ALWAYS-HARMLESS | Penetration = danger | "Alpha can't get through skin, so it's harmless" | Misconception Engine → then Protocol C |
| S3 | Partial — units fine | Cannot apply the inverse-square law to dose | Protocol C (Guided Questioning) |
| S6 | Anxiety on the topic | Treats radiation as frightening and unknowable | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Strawberries are treated with gamma rays to kill bacteria. Are they radioactive afterwards?"
  "No — irradiation doesn't make them radioactive" → DB-2.
  "Yes" → SIGNAL:MISCONCEPTION:MC-IRRADIATED-BECOMES-RADIOACTIVE. Enter Misconception Engine.
  No idea → S0. Enter Protocol A (Concrete).

DB-2 (representation / misconception test):
"Alpha particles are stopped by a sheet of paper. Is an alpha emitter safe to swallow?"
  "No — inside the body all its energy goes into nearby cells, and alpha is weighted 20 times" → S3. Enter Protocol C.
  "No" (no reason) → S1. Enter Protocol B.
  "Yes — alpha can't do harm" → SIGNAL:MISCONCEPTION:MC-ALPHA-ALWAYS-HARMLESS. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F (calm, factual) otherwise Protocol A.

DB-3 (distance check — overlays):
"You move from 1 m to 3 m from a small gamma source. By what factor does your dose rate fall?"
  "9 times" → no flag.
  "3 times" → note; repair at TA-5.
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mod.radioactivity`):
"Name the three kinds of nuclear radiation and what stops each."
  Cannot say "alpha — paper; beta — aluminium; gamma — reduced by lead" → flag PREREQ-GAP-RADIOACTIVITY.
  In-session minimum repair: one P06 (penetration chart) + one P34 ("which is most ionising?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: radiation as one vague danger.
Success exit: computes Gy and Sv, explains effects, applies time/distance/shielding, separates irradiation from contamination (P91 all 5 probes CORRECT).
Failure exit: on IRRADIATED-BECOMES-RADIOACTIVE → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Lead Screen and the Strawberries]
P01
→ P04[content: "A radiographer steps behind a lead screen for every X-ray. Strawberries treated with gamma rays sit safely on shop shelves. Both make sense once dose and contamination are clear."]
→ P06[content: the radiographer's screen; a dose scale from background (~2.4 mSv/year) to CT scans to radiation sickness]
→ P14[predict: "Are the strawberries radioactive?"] → P55
→ success_path → P49 → P05[curiosity: "How do we measure how much radiation someone gets?"]

[TA-2: Gray and Sievert]
P02
→ P13[think-aloud: "Absorbed dose: joules per kilogram — the gray. But alpha particles do about 20 times more biological damage per joule, so equivalent dose multiplies by w_R: 20 for alpha, 1 for beta, gamma and X-rays. That's the sievert."]
→ P08[notation: "D = E/m (Gy);  H = D × w_R (Sv)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "70 kg absorbs 0.014 J of gamma. D and H? And 0.1 mGy of alpha?"] → P55
→ success_path[0.2 mGy = 0.2 mSv; 2 mSv] → P49

[TA-3: Irradiation vs Contamination]
P02
→ P41[diagnostic: "Irradiated strawberries — radioactive?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-IRRADIATED-BECOMES-RADIOACTIVE → misconception_repair_chain[MC-IRRADIATED-BECOMES-RADIOACTIVE]

[TA-4: Alpha Inside and Outside]
P02
→ P41[diagnostic: "Swallowing an alpha emitter — safe?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-ALPHA-ALWAYS-HARMLESS → misconception_repair_chain[MC-ALPHA-ALWAYS-HARMLESS]

[TA-5: Time, Distance, Shielding]
P02
→ P34[question: "Dose rate 40 μSv/h at 1 m from a small source. At 2 m? At 4 m? Total in 30 min at 2 m?"] → P55
→ success_path[10 μSv/h; 2.5 μSv/h; 5 μSv] → P49
→ failure_path → P50 → P51[diagnose: linear vs inverse square] → P52[narrow: "Double the distance — the same radiation spreads over 4 times the area"] → re-elicit P34 → P55

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Which needs the thickest shielding: alpha, beta or gamma?"] → P55
    → P49 → P51[check: gamma]
    → P35[open: "Explain why radon gas in homes is a health concern although it is an alpha emitter."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Plan how to work safely with a sealed gamma source in a school lab."] → P55 → CORRECT
    → P76[transfer: "Why does a dentist leave the room when taking an X-ray but the patient stays?"] → P55 → CORRECT
    → P75[boundary: "Is a contaminated object the same as an irradiated one?"] → P55 → CORRECT
    → P74[classify: "Gray or sievert: which accounts for radiation type?"] → P55 → CORRECT
    → P78[explain: "Why is alpha weighted 20 times?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: units without use.
Success exit: Gy → Sv with weighting; inverse square applied.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["1 mGy of alpha and 1 mGy of gamma — the same energy per kg. Same harm?"] → P54 (novel) → P55; then TA-3 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: units fine; protections not.
Success exit: time/distance/shielding applied.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag (anxiety about radiation) confirmed.
Success exit: background dose and the three protections stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); start from everyday background dose (food, rocks, flights) to set scale; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "irradiated = radioactive".
Success exit: revises after the X-ray contrast.
Failure exit: Misconception Engine.
Key deltas: open with "after a chest X-ray, are you radioactive?"; let it sit (P55).

## 6. Misconception Engine

### MC-IRRADIATED-BECOMES-RADIOACTIVE: "Anything exposed to radiation becomes radioactive"
trigger_signal: student believes irradiated food, medical equipment or patients become radioactive, confusing irradiation with contamination.
conflict_evidence [P28]: "After a chest X-ray, do you set off a radiation detector? A light bulb lights a room — does the room glow after you switch it off?"
bridge_text [P30]: "No. Gamma rays and X-rays deposit energy and then are gone; they do not leave radioactive atoms behind (the energies used are far too low to change nuclei). Irradiated strawberries are no more radioactive than before. What does spread radioactivity is contamination: radioactive material itself landing on or getting into something, which keeps emitting."
replacement_text [P31]: "Irradiation = exposure to radiation (no lasting radioactivity); contamination = radioactive material present on or in an object (it keeps emitting)."
discrimination_pairs [P33]: ["gamma-sterilised syringes: irradiated, not radioactive", "radioactive dust on clothes: contaminated, emitting until removed"]
s6_path: skip P28; the light-bulb analogy alone.

### MC-ALPHA-ALWAYS-HARMLESS: "Alpha radiation is harmless because it can't get through skin"
trigger_signal: student judges alpha emitters safe in all circumstances because alpha particles are stopped by paper or the outer layer of skin.
conflict_evidence [P28]: "Alpha particles are stopped by a few centimetres of air or the dead outer layer of your skin. Where do they dump all their energy when they stop? What if the source is inside your lungs?"
bridge_text [P30]: "They dump it all in a very short track — which is why they are so ionising. Outside the body that energy goes into dead skin cells and does no harm. Inside the body — inhaled radon, swallowed polonium — it all goes into a few living cells, causing intense damage. That is why alpha's weighting factor is 20."
replacement_text [P31]: "Alpha emitters are low risk outside the body but highly dangerous if inhaled or ingested; penetration and ionising damage are different things."
discrimination_pairs [P33]: ["alpha source on the bench: stopped by skin — low risk", "alpha emitter in the lungs (radon): high dose to nearby cells"]
s6_path: skip P28; state the radon example plainly.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Gray or sievert for radiation type" | CORRECT = sievert |
| P74 (classify) | "Most shielding needed" | CORRECT = gamma |
| P75 (boundary) | "Contaminated vs irradiated" | CORRECT = different — contaminated still emits |
| P76 (transfer) | "Dentist leaves the room" | CORRECT = repeated exposures add up for staff; patient gets one small dose |
| P77 (generate) | "Safe lab plan" | CORRECT = minimise time, maximise distance (tongs), shielding, store in lead |
| P78 (explain) | "Alpha × 20" | CORRECT = dense ionisation, more biological damage per joule |
| P79 (predict) | "Thickest shielding" | CORRECT = gamma |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Plan how to work safely with a sealed gamma source in a school lab." → expected: CORRECT
P76: "Why does a dentist leave the room when taking an X-ray but the patient stays?" → expected: CORRECT
P75: "Is a contaminated object the same as an irradiated one?" → expected: CORRECT
P74: "Gray or sievert: which accounts for radiation type?" → expected: CORRECT
P78: "Why is alpha weighted 20 times?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Define gray and sievert."
Interval 2 (3 days): "0.5 mGy of alpha in tissue: mSv?"
Interval 3 (7 days): "Dose rate at 3 m if 90 μSv/h at 1 m?"
Interval 4 (21 days): "Irradiation vs contamination?"
Interval 5 (60 days): "Why is radon dangerous?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

# Teaching Blueprint: phys.em.cells-combination

## 0. Concept Profile
concept_id: phys.em.cells-combination
name: Cells in Series and Parallel
domain: Electricity & Magnetism (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.em.emf]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (four 1.5 V cells wired two ways to the same lamp before the formulas; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Combines n identical cells (emf E, internal resistance r) in series: emf nE, internal resistance nr, current I = nE / (R + nr); and m identical cells in parallel: emf E (NOT mE), internal resistance r/m, current I = E / (R + r/m).
2. Computes both arrangements for a given load — e.g. four 1.5 V cells, r = 0.5 Ω each, with R = 10 Ω: series 6 / (10 + 2) = 0.50 A; parallel 1.5 / (10 + 0.125) ≈ 0.15 A; with R = 0.1 Ω: series 6 / 2.1 ≈ 2.9 A; parallel 1.5 / 0.225 ≈ 6.7 A.
3. Chooses the arrangement from the load: series when R ≫ r (the extra emf wins), parallel when R ≪ r (the lower internal resistance wins), and explains that parallel cells also share the current, so each lasts longer.

A student who says "four 1.5 V cells in parallel give 6 V", or that "series always gives the bigger current", has **NOT** achieved mastery — both ignore internal resistance and break every battery-pack and power-supply problem.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Single cells only | Cannot say what wiring cells side by side does | Protocol A (Concrete) |
| S1 | Formulas without choice | Computes both currents but cannot say which suits a load | Protocol B (Counterexample-first) |
| S2-PARALLEL-ADDS-EMF | Every combination adds voltage | "Parallel cells give 6 V" | Misconception Engine → then Protocol C |
| S2-SERIES-ALWAYS-BETTER | Internal resistance ignored | "Series always gives more current" | Misconception Engine → then Protocol C |
| S3 | Partial — series fine, parallel not | Correct nE/(R + nr), wrong parallel internal resistance | Protocol C (Guided Questioning) |
| S6 | Anxiety on fractions of resistance | Freezes at r/m | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you seen how cells are put into a torch or a remote — end to end, or side by side?"
  No idea → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"Four identical 1.5 V cells are connected in parallel. What is the emf of the combination?"
  "1.5 V — parallel cells keep the emf of one; only the internal resistance changes" → S3. Enter Protocol C.
  "1.5 V" (no reason) → S1. Enter Protocol B.
  "6 V" → SIGNAL:MISCONCEPTION:MC-PARALLEL-ADDS-EMF. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (choice check — overlays):
"For a load of only 0.1 Ω, which gives more current: four cells (r = 0.5 Ω each) in series or in parallel?"
  "Parallel — the internal resistance dominates" → no flag.
  "Series — more volts, more current" → add SIGNAL:MISCONCEPTION:MC-SERIES-ALWAYS-BETTER (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.emf`, and through it DC circuits):
"A cell has emf 1.5 V and internal resistance 0.5 Ω. What current flows through a 10 Ω resistor, and what is the terminal voltage?"
  Cannot give I = E/(R + r) ≈ 0.14 A and V = E − Ir → flag PREREQ-GAP-EMF.
  In-session minimum repair: one P07 (a cell drawn as an ideal emf plus a small resistor) + one P34 ("total resistance in the loop?") then resume. If emf and internal resistance are absent, schedule a `phys.em.emf` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: single-cell picture only.
Success exit: computes series and parallel currents and chooses correctly for two loads (P91 all 5 probes CORRECT).
Failure exit: on PARALLEL-ADDS-EMF → Misconception Engine, resume at TA-3. On fraction anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Two Ways to Wire Four Cells]
P01
→ P04[content: "The same four cells can drive very different currents depending on how they are wired — and on what they are driving."]
→ P07[modality: four cells end to end (series) and four side by side (parallel), each driving the same 10 Ω lamp]
→ P14[predict: "Which lamp glows brighter?"] → P55
→ success_path → P49 → P05[curiosity: "Would the answer change if the load were a thick 0.1 Ω wire?"]

[TA-2: Series]
P02
→ P13[think-aloud: "In series the emfs add — 4 × 1.5 = 6 V — but so do the internal resistances — 4 × 0.5 = 2 Ω. Current I = 6 / (10 + 2) = 0.50 A."]
→ P08[notation: "series: E_total = nE, r_total = nr, I = nE / (R + nr)"]
// GR-3 satisfied: P07 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Three cells, 2 V and 1 Ω each, in series with 9 Ω. Current?"] → P55
→ success_path[6 / 12 = 0.5 A] → P49

[TA-3: Parallel]
P02
→ P41[diagnostic: "Four 1.5 V cells in parallel. Emf of the combination?"] → P55
→ [if 1.5 V] → P49
→ [if 6 V] → SIGNAL:MISCONCEPTION:MC-PARALLEL-ADDS-EMF → misconception_repair_chain[MC-PARALLEL-ADDS-EMF]
→ P13[think-aloud: "Side by side, all positive terminals are joined and all negative terminals are joined, so the potential difference across the group is that of one cell. What changes is the internal resistance: four 0.5 Ω paths in parallel make 0.125 Ω."]
→ P08[notation: "parallel (identical cells): E_total = E, r_total = r/m, I = E / (R + r/m)"]
→ P34[question: "Same four cells in parallel with the 10 Ω lamp. Current?"] → P55
→ success_path[1.5 / 10.125 ≈ 0.15 A] → P49

[TA-4: Choosing by the Load]
P02
→ P41[diagnostic: "Now the load is 0.1 Ω. Series current? Parallel current?"] → P55
→ [if series ≈ 2.9 A, parallel ≈ 6.7 A — parallel wins] → P49
→ [if "series always wins"] → SIGNAL:MISCONCEPTION:MC-SERIES-ALWAYS-BETTER → misconception_repair_chain[MC-SERIES-ALWAYS-BETTER]
→ P13[think-aloud: "When R ≫ r, internal resistance hardly matters and the extra emf of series wins. When R ≪ r, internal resistance dominates and parallel's smaller r wins."]

[TA-5: Sharing the Load]
P02
→ P34[question: "In the parallel arrangement with the 10 Ω lamp, how much current does each cell supply? Why does a parallel pack last longer?"] → P55
→ success_path[≈ 0.037 A each — a quarter of the total; each cell is drained more slowly] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Two cells in parallel, one connected the wrong way round. What happens?"] → P55
    → P49 → P51[check: the cells drive current round their own loop — wasteful and heating; emfs oppose]
    → P35[open: "Explain why parallel cells do not add their emfs."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "You have six 1.5 V cells (r = 0.3 Ω). Design a pack for a 0.2 Ω motor and one for a 20 Ω lamp."] → P55 → CORRECT
    → P76[transfer: "A car battery is six 2 V cells in series. Emf? Why are they in series?"] → P55 → CORRECT
    → P75[boundary: "With ideal cells (r = 0), does parallel ever give more current than series?"] → P55 → CORRECT
    → P74[classify: "Four 1.5 V cells in parallel: 1.5 V or 6 V?"] → P55 → CORRECT
    → P78[explain: "Why does series win for large loads and parallel for small ones?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formulas without choosing.
Success exit: chooses correctly by comparing R with r.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Compute both arrangements for 10 Ω and 0.1 Ω loads. Which wins each time?"] → P54 (novel) → P55; then TA-4's reasoning.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: series fine, parallel not.
Success exit: both arrangements and the choice rule.
Failure exit: escalate to Protocol A TA-3.
Key deltas: enter at TA-3; run TA-4 and the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: both emfs stated correctly and one current computed calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); two cells before four; r/2 before r/4; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "series always better" or "parallel adds emf".
Success exit: revises after computing the 0.1 Ω case or measuring the parallel emf.
Failure exit: Misconception Engine.
Key deltas: open with the 0.1 Ω computation; let the result (parallel ≈ 6.7 A > series ≈ 2.9 A) sit (P55).

## 6. Misconception Engine

### MC-PARALLEL-ADDS-EMF: "Cells in parallel add their emfs"
trigger_signal: student gives nE for cells in parallel.
conflict_evidence [P28]: "In parallel, all four positive terminals are joined by one wire and all four negative terminals by another. A voltmeter across those two wires — what does it measure the potential difference between?"
bridge_text [P30]: "Between the positive and negative terminal of ANY one cell — they are all connected to the same two wires. So the combination's emf is that of one cell, 1.5 V. What parallel changes is the internal resistance: four paths, r/4."
replacement_text [P31]: "Series: emfs add, internal resistances add. Parallel (identical cells): emf stays E, internal resistance becomes r/m."
discrimination_pairs [P33]: ["four 1.5 V cells in series: 6 V, 2 Ω vs in parallel: 1.5 V, 0.125 Ω", "a torch (cells in series for voltage) vs a power bank (cells in parallel for capacity)"]
s6_path: skip P28; measure two real cells side by side with a voltmeter — 1.5 V, the same as one.

### MC-SERIES-ALWAYS-BETTER: "Series always gives the bigger current"
trigger_signal: student picks series for every load, reasoning only from total emf.
conflict_evidence [P28]: "Load 0.1 Ω. Series: 6 V / (0.1 + 2) Ω ≈ 2.9 A. Parallel: 1.5 V / (0.1 + 0.125) Ω ≈ 6.7 A. Which is bigger?"
bridge_text [P30]: "Parallel — because with such a small load, the cells' own internal resistance is most of the circuit. Series adds four lots of internal resistance; parallel divides it by four."
replacement_text [P31]: "Compare R with r: R ≫ r → series (extra emf wins); R ≪ r → parallel (lower internal resistance wins)."
discrimination_pairs [P33]: ["10 Ω lamp: series 0.50 A > parallel 0.15 A", "0.1 Ω wire: parallel 6.7 A > series 2.9 A"]
s6_path: skip P28; tabulate both currents for the two loads together and circle the larger one in each row.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Four 1.5 V cells in parallel — emf?" | CORRECT = 1.5 V |
| P74 (classify) | "Series or parallel for R ≪ r?" | CORRECT = parallel |
| P75 (boundary) | "Ideal cells (r = 0) — parallel ever better?" | CORRECT = no; series always gives more current, parallel only shares it |
| P76 (transfer) | "Six 2 V cells in series" | CORRECT = 12 V; a car starter needs high voltage |
| P77 (generate) | "Packs for a 0.2 Ω motor and a 20 Ω lamp" | CORRECT = parallel (or mixed) for the motor, series for the lamp, with currents |
| P78 (explain) | "Why series for large loads, parallel for small?" | CORRECT = which of emf or internal resistance dominates |
| P79 (predict) | "One cell reversed in parallel" | CORRECT = circulating current between the cells, wasted energy |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "You have six 1.5 V cells (r = 0.3 Ω). Design a pack for a 0.2 Ω motor and one for a 20 Ω lamp." → expected: CORRECT
P76: "A car battery is six 2 V cells in series. Emf? Why are they in series?" → expected: CORRECT
P75: "With ideal cells (r = 0), does parallel ever give more current than series?" → expected: CORRECT
P74: "Four 1.5 V cells in parallel: 1.5 V or 6 V?" → expected: CORRECT
P78: "Why does series win for large loads and parallel for small ones?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Emf and internal resistance of three 2 V, 1 Ω cells in series? In parallel?"
Interval 2 (3 days): "Four cells (1.5 V, 0.5 Ω) on a 10 Ω load — series and parallel currents?"
Interval 3 (7 days): "When does parallel beat series?"
Interval 4 (21 days): "Why does a parallel pack last longer?"
Interval 5 (60 days): "Design a 6 V pack that can deliver a large current from 1.5 V cells."

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

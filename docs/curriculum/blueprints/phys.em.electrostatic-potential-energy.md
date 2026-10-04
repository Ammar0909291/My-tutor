# Teaching Blueprint: phys.em.electrostatic-potential-energy

## 0. Concept Profile
concept_id: phys.em.electrostatic-potential-energy
name: Potential Energy of a System of Charges
domain: Electricity & Magnetism (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.em.electric-potential]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (assembling two, then three charges from far away, counting the work for each step; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Defines the electrostatic potential energy of a system as the work an external agent does to assemble it, slowly, from charges infinitely far apart, and computes it for a pair: U = k q₁q₂ / r — e.g. +2 μC and +3 μC, 0.3 m apart: U = 9 × 10⁹ × 6 × 10⁻¹² / 0.3 = 0.18 J.
2. Computes U for three or more charges as the sum over every distinct PAIR, each counted once (three charges → three pairs; n charges → n(n − 1)/2 pairs), keeping the signs of the charges.
3. Interprets the sign: U > 0 for like charges (work had to be done to push them together; they fly apart if released), U < 0 for unlike charges (they pull together; work is needed to separate them). Relates it to potential: bringing q to a point at potential V takes work qV.

A student who counts each pair twice, drops the signs and adds magnitudes, or says "the energy belongs to the charge that was moved", has **NOT** achieved mastery — those errors break binding energy in atoms and nuclei, capacitor energy, and the energy of ionic crystals.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Potential known, system energy not | Cannot say what "energy of a system" means | Protocol A (Concrete) |
| S1 | Pair formula without assembly picture | Writes kq₁q₂/r but cannot handle three charges | Protocol B (Counterexample-first) |
| S2-DOUBLE-COUNT | Energy per charge, not per pair | Adds each charge's "energy with every other" — every pair twice | Misconception Engine → then Protocol C |
| S2-SIGN-IGNORED | Magnitudes only | U always positive; cannot say whether released charges fly apart | Misconception Engine → then Protocol C |
| S3 | Partial — pairs fine, sign meaning not (or reverse) | Correct sum, wrong physical interpretation | Protocol C (Guided Questioning) |
| S6 | Anxiety on powers of ten | Freezes at μC and 10⁹ | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"How much work does it take to bring a charge q from very far away to a point where the potential is V?"
  No idea → S0. Enter Protocol A (Concrete).
  "qV" → DB-2.

DB-2 (representation / misconception test):
"Three equal charges q sit at the corners of an equilateral triangle of side a. What is the electrostatic potential energy of the system?"
  "3kq²/a — three pairs" → S3. Enter Protocol C.
  "3kq²/a" (no reasoning) → S1. Enter Protocol B.
  "6kq²/a — each charge interacts with two others" → SIGNAL:MISCONCEPTION:MC-DOUBLE-COUNT. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (sign check — overlays):
"A +q and a −q are held 1 cm apart. Is U positive or negative, and what happens when they are released?"
  "Negative — they attract and pull together; work is needed to separate them" → no flag.
  "Positive — energy is always positive" → add SIGNAL:MISCONCEPTION:MC-SIGN-IGNORED (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.electric-potential`):
"What is the potential at distance r from a point charge Q, and what does it mean?"
  Cannot give V = kQ/r as work per unit charge from infinity → flag PREREQ-GAP-POTENTIAL.
  In-session minimum repair: one P07 (potential falling off around a point charge) + one P34 ("work to bring +1 C from infinity to r?") then resume. If potential is absent, schedule a `phys.em.electric-potential` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: no system-energy picture.
Success exit: computes U for two and three charges with signs and interprets them (P91 all 5 probes CORRECT).
Failure exit: on DOUBLE-COUNT → Misconception Engine, resume at TA-3. On powers-of-ten anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Building a System Costs Work]
P01
→ P04[content: "Pushing two like charges together takes work. That work is stored — in the arrangement, not in either charge."]
→ P06[content: two charges far apart; bring q₁ in (no field yet, no work), then bring q₂ to distance r from q₁]
→ P14[predict: "Which step costs work — the first charge, the second, or both?"] → P55
→ success_path[only the second — the first moves through no field] → P49 → P05[curiosity: "How much work does the second step cost?"]

[TA-2: The Pair Formula]
P02
→ P13[think-aloud: "Bringing q₂ to a point where q₁ makes potential kq₁/r costs q₂ × kq₁/r. So the system stores U = kq₁q₂/r."]
→ P08[notation: "U = k q₁ q₂ / r ; k = 9 × 10⁹ N m² C⁻²"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "+2 μC and +3 μC, 0.3 m apart. U?"] → P55
→ success_path[0.18 J] → P49
→ failure_path → P50 → P51[diagnose: powers of ten or used r²] → P52[narrow: "Potential goes as 1/r, not 1/r². Recompute."] → re-elicit P34 → P55

[TA-3: Three Charges — Count Pairs]
P02
→ P13[think-aloud: "Bring the charges in one at a time. The third charge does work against BOTH of the first two. Total work = U₁₂ + U₁₃ + U₂₃ — each pair once."]
→ P41[diagnostic: "Three equal charges q at the corners of an equilateral triangle of side a. U?"] → P55
→ [if 3kq²/a] → P49
→ [if 6kq²/a] → SIGNAL:MISCONCEPTION:MC-DOUBLE-COUNT → misconception_repair_chain[MC-DOUBLE-COUNT]
→ P34[question: "How many pairs for four charges? For n?"] → P55
→ success_path[6; n(n − 1)/2] → P49

[TA-4: What the Sign Means]
P02
→ P41[diagnostic: "+q and −q, 1 cm apart. Sign of U, and what happens on release?"] → P55
→ [if negative; they pull together; work needed to separate] → P49
→ [if positive] → SIGNAL:MISCONCEPTION:MC-SIGN-IGNORED → misconception_repair_chain[MC-SIGN-IGNORED]
→ P13[think-aloud: "Like charges: you push them together, U > 0, released they fly apart turning U into kinetic energy. Unlike charges: they pull together, U < 0 — the system is bound, and you must supply |U| to pull it apart."]

[TA-5: Work to Rearrange]
P02
→ P34[question: "+2 μC and +3 μC are moved from 0.3 m apart to 0.1 m apart. Work done by the external agent?"] → P55
→ success_path[ΔU = 0.54 − 0.18 = 0.36 J] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Square of side a: +q, −q, +q, −q at the corners in order. Before computing — U positive or negative?"] → P55
    → P49 → P51[check: four adjacent unlike pairs dominate two diagonal like pairs?]
    → P35[open: "Explain why each pair is counted only once."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Arrange three charges so that the total U is zero. Show the pairs."] → P55 → CORRECT
    → P76[transfer: "In a hydrogen atom, the electron and proton are 5.3 × 10⁻¹¹ m apart. Is U positive or negative, and what does it tell you about the atom?"] → P55 → CORRECT
    → P75[boundary: "Two charges very far apart. U?"] → P55 → CORRECT
    → P74[classify: "Three charges: 3kq²/a or 6kq²/a?"] → P55 → CORRECT
    → P78[explain: "Where is the energy of a system of charges stored — in one charge or in the arrangement?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: pair formula without the assembly picture.
Success exit: correct three-charge sum with reasoning.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Assemble three charges one at a time. Write the work for each step."] → P54 (novel) → P55; then TA-3.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: sums or signs correct, not both.
Success exit: both.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-3 or TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: one pair and one three-charge sum done calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); symbols (kq²/a) before numbers; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident double count.
Success exit: revises after the one-at-a-time assembly.
Failure exit: Misconception Engine.
Key deltas: open by assembling the triangle step by step (0, then kq²/a, then 2kq²/a): total 3kq²/a; let the mismatch with 6kq²/a sit (P55).

## 6. Misconception Engine

### MC-DOUBLE-COUNT: "Add up every charge's energy with every other charge"
trigger_signal: student computes each charge's interaction with all the others and sums over charges, counting every pair twice (6kq²/a for the equilateral triangle).
conflict_evidence [P28]: "Build the triangle one charge at a time. The first costs nothing. The second costs kq²/a. The third costs 2kq²/a — it is pushed against both. What is the total work?"
bridge_text [P30]: "3kq²/a. The work to assemble the system is the energy it stores, and each interaction was paid for exactly once — when the second of the two charges arrived. Summing 'each charge with every other' pays every pair twice."
replacement_text [P31]: "U = sum over distinct pairs of k qᵢqⱼ / rᵢⱼ. Three charges: three pairs; n charges: n(n − 1)/2 pairs."
discrimination_pairs [P33]: ["three charges: 3 pairs (correct) vs 6 terms (double count)", "four charges at a square's corners: 4 sides + 2 diagonals = 6 pairs"]
s6_path: skip P28; draw the triangle and draw a line for each pair — count the lines.

### MC-SIGN-IGNORED: "Electrostatic potential energy is always positive"
trigger_signal: student adds magnitudes, or reports U > 0 for an attracting pair.
conflict_evidence [P28]: "A +q and a −q are held apart and then let go. They rush together and speed up. Where did their kinetic energy come from, if their potential energy was positive and keeps... what does it do?"
bridge_text [P30]: "As they rush together, U must fall while kinetic energy rises. With U = kq₁q₂/r and q₁q₂ negative, U is negative and becomes MORE negative as r shrinks — exactly what releases the kinetic energy. The sign carries the physics."
replacement_text [P31]: "Keep the signs of the charges. U > 0: like charges, the system tends to fly apart. U < 0: unlike charges, the system is bound; you must supply |U| to separate it."
discrimination_pairs [P33]: ["+q, +q: U > 0, released they fly apart", "+q, −q: U < 0, released they pull together; hydrogen atom bound"]
s6_path: skip P28; use two magnets — like poles push apart when released, unlike poles snap together — and attach the sign to each case.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Three charges: 3kq²/a or 6kq²/a?" | CORRECT = 3kq²/a |
| P74 (classify) | "+q and −q: sign of U?" | CORRECT = negative |
| P75 (boundary) | "Charges infinitely far apart — U?" | CORRECT = zero (reference) |
| P76 (transfer) | "Hydrogen atom — sign of U?" | CORRECT = negative; the atom is bound |
| P77 (generate) | "Three charges with U = 0" | CORRECT = e.g. +q and +q a distance d apart with −q/4 at the midpoint: kq²/d − 2 × kq²/(2d) = 0 |
| P78 (explain) | "Where is the energy stored?" | CORRECT = in the arrangement (the field), not in one charge |
| P79 (predict) | "Alternating square — sign?" | CORRECT = negative |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Arrange three charges so that the total U is zero. Show the pairs." → expected: CORRECT
P76: "In a hydrogen atom, the electron and proton are 5.3 × 10⁻¹¹ m apart. Is U positive or negative, and what does it tell you about the atom?" → expected: CORRECT
P75: "Two charges very far apart. U?" → expected: CORRECT
P74: "Three charges: 3kq²/a or 6kq²/a?" → expected: CORRECT
P78: "Where is the energy of a system of charges stored — in one charge or in the arrangement?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "U for +1 μC and +4 μC, 0.2 m apart?"
Interval 2 (3 days): "How many pairs for five charges?"
Interval 3 (7 days): "Why is U negative for a proton and an electron?"
Interval 4 (21 days): "Work to bring two like charges from 0.3 m to 0.1 m apart?"
Interval 5 (60 days): "Why does a crystal of NaCl hold together, in terms of electrostatic potential energy?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

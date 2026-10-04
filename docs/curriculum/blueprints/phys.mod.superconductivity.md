# Teaching Blueprint: phys.mod.superconductivity

## 0. Concept Profile
concept_id: phys.mod.superconductivity
name: Superconductivity
domain: Modern Physics (Physics)
difficulty: expert (5)
bloom: understand
prerequisites: [phys.em.resistivity, phys.em.magnetic-materials, phys.mod.energy-bands]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a magnet floating above a cooled ceramic disc, before any theory; difficulty 5)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Describes the two defining properties: below a critical temperature T_c a superconductor's DC resistance falls to exactly zero — not merely very low — so a current set up in a ring flows for years without a battery (mercury, T_c = 4.2 K, discovered by Kamerlingh Onnes in 1911; YBCO, T_c ≈ 92 K, above the 77 K of liquid nitrogen); and it expels magnetic fields from its interior (the Meissner effect, a perfect diamagnet), which is why a magnet floats above it.
2. Explains why the Meissner effect shows superconductivity is more than perfect conductivity: a merely perfect conductor would TRAP whatever field it held when it lost its resistance, whereas a superconductor pushes the field out on cooling, whatever its history — and that superconductivity is destroyed above a critical field, B_c(T) ≈ B_c(0)[1 − (T/T_c)²] (lead: B_c(0) = 0.080 T, T_c = 7.2 K, so B_c ≈ 0.053 T at 4.2 K), or above a critical current.
3. Explains the microscopic picture qualitatively: in conventional superconductors electrons form Cooper pairs (bound weakly through vibrations of the lattice), all pairs share one quantum state separated from excited states by an energy gap, so small scatterings cannot slow them and there is no resistance; and names uses — MRI magnets (niobium–titanium wire at 4.2 K), maglev, SQUID magnetometers, and lossless power cables.

A student who thinks a superconductor is just an extremely good conductor, or that it stays superconducting in any magnetic field, has **NOT** achieved mastery — those ideas miss what makes the state a distinct phase.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Superconductors as "very cold wires" | Cannot name the Meissner effect | Protocol A (Concrete) |
| S1 | "Zero resistance" recited | Cannot explain levitation | Protocol B (Counterexample-first) |
| S2-JUST-A-VERY-GOOD-CONDUCTOR | Continuum picture | "It's like copper, only much better" | Misconception Engine → then Protocol C |
| S2-ANY-FIELD-ALLOWED | No limits pictured | "Once superconducting, it handles any field or current" | Misconception Engine → then Protocol C |
| S3 | Partial — properties fine | Cannot give the Cooper-pair picture | Protocol C (Guided Questioning) |
| S6 | Anxiety on quantum ideas | Avoids the microscopic explanation | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What happens to a superconductor's resistance below its critical temperature?"
  No idea → S0. Enter Protocol A (Concrete).
  "It becomes exactly zero" → DB-2.
  "It becomes very small" → note; probe at DB-2.

DB-2 (representation / misconception test):
"Why does a magnet float above a superconductor but not above an extremely good conductor like ultra-pure copper?"
  "The superconductor expels magnetic fields (Meissner effect); a mere perfect conductor would just trap the field it had" → S3. Enter Protocol C.
  "Because it's superconducting" (no mechanism) → S1. Enter Protocol B.
  "A superconductor is just a better conductor — copper would float the magnet too if it were cold and pure enough" → SIGNAL:MISCONCEPTION:MC-JUST-A-VERY-GOOD-CONDUCTOR. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (limits check — overlays):
"An MRI's superconducting coil is pushed to a much higher current and field. Does it stay superconducting?"
  "Not necessarily — above a critical field or current it reverts to normal (a quench)" → no flag.
  "Yes, always" → add SIGNAL:MISCONCEPTION:MC-ANY-FIELD-ALLOWED (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.resistivity`, `phys.em.magnetic-materials`, `phys.mod.energy-bands`):
"What causes resistance in a metal? What is a diamagnet? What is a band gap?"
  Cannot say "electrons scattering off vibrating ions and defects; a material weakly repelled by fields; a forbidden energy range" → flag PREREQ-GAP-SOLIDS.
  In-session minimum repair: one P06 (resistivity of a metal falling with temperature) + one P34 ("why does copper's resistance drop when cooled?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: superconductors as very cold wires.
Success exit: zero resistance, Meissner effect, critical limits and the Cooper-pair picture explained (P91 all 5 probes CORRECT).
Failure exit: on JUST-A-VERY-GOOD-CONDUCTOR → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Floating Magnet]
P01
→ P04[content: "Cool a ceramic disc in liquid nitrogen and a small magnet floats above it, steady, as if on an invisible cushion."]
→ P06[content: the levitating magnet; a graph of resistance against temperature dropping abruptly to zero at T_c]
→ P14[predict: "Would a very pure, very cold copper disc do the same?"] → P55
→ success_path → P49 → P05[curiosity: "What is special about this state?"]

[TA-2: Zero Resistance]
P02
→ P13[think-aloud: "As a normal metal cools, its resistance falls smoothly but levels off at a small value from impurities. A superconductor's resistance drops abruptly to exactly zero at T_c — mercury at 4.2 K, YBCO at about 92 K. A current started in a superconducting ring keeps flowing for years."]
→ P08[notation: "T < T_c: R = 0 exactly; B inside = 0 (Meissner)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Why is YBCO's T_c of 92 K so useful?"] → P55
→ success_path[it can be cooled with cheap liquid nitrogen (77 K) instead of liquid helium] → P49

[TA-3: More Than a Perfect Conductor]
P02
→ P41[diagnostic: "Would a perfect conductor float a magnet the same way?"] → P55
→ [if no — Meissner effect is extra] → P49
→ [if yes, just a good conductor] → SIGNAL:MISCONCEPTION:MC-JUST-A-VERY-GOOD-CONDUCTOR → misconception_repair_chain[MC-JUST-A-VERY-GOOD-CONDUCTOR]

[TA-4: Cooper Pairs]
P02
→ P13[think-aloud: "In ordinary metals, electrons scatter off vibrating ions — resistance. In a superconductor, an electron slightly distorts the lattice, attracting another electron: a Cooper pair. All pairs settle into one shared quantum state, separated from excited states by an energy gap. A small scattering can't knock a pair out — it would need at least the gap energy — so the current flows unopposed."]
→ P34[question: "Why does heating above T_c destroy superconductivity?"] → P55
→ success_path[thermal energy breaks the pairs (exceeds the gap)] → P49

[TA-5: Critical Field and Current]
P02
→ P41[diagnostic: "Does a superconductor survive any magnetic field?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-ANY-FIELD-ALLOWED → misconception_repair_chain[MC-ANY-FIELD-ALLOWED]
→ P34[question: "Lead: B_c(0) = 0.080 T, T_c = 7.2 K. Critical field at 4.2 K?"] → P55
→ success_path[0.080(1 − (4.2/7.2)²) ≈ 0.053 T] → P49
→ failure_path → P50 → P51[diagnose: the square] → P52[narrow: "(4.2/7.2)² = 0.34"] → re-elicit P34 → P55

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A superconductor is cooled below T_c while sitting in a weak magnetic field. What happens to the field inside?"] → P55
    → P49 → P51[check: it is expelled (Meissner effect)]
    → P35[open: "Explain why MRI scanners use superconducting coils."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a demonstration that shows a material is a superconductor and not just a perfect conductor."] → P55 → CORRECT
    → P76[transfer: "Why is an MRI magnet 'quench' dangerous?"] → P55 → CORRECT
    → P75[boundary: "At exactly T = T_c, what is the critical field?"] → P55 → CORRECT
    → P74[classify: "Zero resistance, field expulsion, Cooper pairs — which are observations and which is explanation?"] → P55 → CORRECT
    → P78[explain: "Why can't small scatterings slow a supercurrent?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: zero resistance without the Meissner effect.
Success exit: explains why levitation needs field expulsion.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["A perfect conductor cooled in a field would trap that field. A superconductor expels it. Which would a magnet float above?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: properties fine; mechanism not.
Success exit: Cooper pairs and the gap explained.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: zero resistance and field expulsion described calmly with the floating magnet.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); observations first, Cooper pairs only as "electrons pairing up"; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "just a better conductor".
Success exit: revises after the cooled-in-field contrast.
Failure exit: Misconception Engine.
Key deltas: open with a disc cooled while a magnet sits on it — the magnet rises as T_c is passed; let it sit (P55).

## 6. Misconception Engine

### MC-JUST-A-VERY-GOOD-CONDUCTOR: "A superconductor is just an extremely good conductor"
trigger_signal: student treats superconductivity as the far end of ordinary conduction (very low resistance) rather than a distinct state with zero resistance and field expulsion.
conflict_evidence [P28]: "Cool a disc below T_c while a magnet already rests on it. A perfect conductor would keep the field it already had inside — the magnet would stay put. What do we see?"
bridge_text [P30]: "The magnet is pushed up: the disc actively expels the field as it becomes superconducting — the Meissner effect. A perfect conductor can't do that; it can only resist CHANGES in field. And a normal metal's resistance levels off at a small value as it cools, while a superconductor's drops abruptly to exactly zero at T_c. It is a different phase of matter, like ice versus very cold water."
replacement_text [P31]: "Superconductivity is a distinct phase: exactly zero resistance plus field expulsion (Meissner effect), below T_c."
discrimination_pairs [P33]: ["ultra-pure copper at 4 K: small but nonzero resistance; no field expulsion", "lead at 4 K: zero resistance; expels fields below B_c"]
s6_path: skip P28; show the resistance graph with its sudden drop.

### MC-ANY-FIELD-ALLOWED: "A superconductor stays superconducting in any field or current"
trigger_signal: student assumes superconductivity, once reached, survives arbitrarily strong magnetic fields or currents.
conflict_evidence [P28]: "Expelling a field costs energy, and the bigger the field, the more it costs. Is there a field strong enough that it's cheaper for the material to go normal?"
bridge_text [P30]: "Yes — the critical field B_c. Above it the material reverts to normal and lets the field in. B_c is largest near absolute zero and falls to zero at T_c: B_c(T) ≈ B_c(0)[1 − (T/T_c)²]; for lead, about 0.053 T at 4.2 K. A large current makes its own field, so there is also a critical current. When an MRI coil exceeds either, it 'quenches': resistance returns and the stored energy turns to heat."
replacement_text [P31]: "Superconductivity exists only below T_c AND below a critical field and current."
discrimination_pairs [P33]: ["lead at 4.2 K in 0.04 T: superconducting", "lead at 4.2 K in 0.06 T: normal"]
s6_path: skip P28; plot B_c against T as a dome-shaped boundary.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Observations vs explanation" | CORRECT = zero R and Meissner observed; Cooper pairs explain |
| P74 (classify) | "Superconductor or perfect conductor: expels field?" | CORRECT = superconductor |
| P75 (boundary) | "B_c at T_c" | CORRECT = zero |
| P76 (transfer) | "MRI quench" | CORRECT = coil goes normal; huge stored energy turns to heat, helium boils off |
| P77 (generate) | "Prove superconductor" | CORRECT = cool in a field and show the field is expelled (magnet lifts) |
| P78 (explain) | "No slowing" | CORRECT = scattering would need at least the gap energy to break a pair |
| P79 (predict) | "Cooled in a field" | CORRECT = field expelled |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a demonstration that shows a material is a superconductor and not just a perfect conductor." → expected: CORRECT
P76: "Why is an MRI magnet 'quench' dangerous?" → expected: CORRECT
P75: "At exactly T = T_c, what is the critical field?" → expected: CORRECT
P74: "Zero resistance, field expulsion, Cooper pairs — which are observations and which is explanation?" → expected: CORRECT
P78: "Why can't small scatterings slow a supercurrent?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Two defining properties of a superconductor?"
Interval 2 (3 days): "What is the Meissner effect?"
Interval 3 (7 days): "B_c of lead at 6 K?"
Interval 4 (21 days): "What are Cooper pairs?"
Interval 5 (60 days): "Why does liquid-nitrogen superconductivity matter?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

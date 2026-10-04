# Teaching Blueprint: phys.mech.fluid-flow

## 0. Concept Profile
concept_id: phys.mech.fluid-flow
name: Equation of Continuity, Streamline and Turbulent Flow
domain: Classical Mechanics (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.mech.pressure-fluids]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (putting a thumb over the end of a garden hose, before any equation; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains that in steady flow of an incompressible fluid no fluid piles up or disappears, so the same volume passes every cross-section each second: the volume flow rate Q = Av is constant, A₁v₁ = A₂v₂ — the equation of continuity.
2. Applies it — water flowing at 1.5 m/s through a 4 cm² pipe (0.6 L/s) speeds up to 6 m/s where the pipe narrows to 1 cm²; a thumb over a hose makes the water leave faster; a falling stream of tap water narrows because it speeds up.
3. Distinguishes streamline flow (smooth layers, each particle following the path of the one ahead — streamlines never cross) from turbulent flow (irregular eddies), and states that flow becomes turbulent above a critical speed, judged by the Reynolds number Re = ρvD/η — roughly streamline below 2000 in a pipe, so water in a 2 cm pipe becomes turbulent above about 0.1 m/s.

A student who thinks a fluid slows down where a pipe narrows, or that the flow rate falls along a pipe as fluid is "used up", has **NOT** achieved mastery — those ideas block Bernoulli's principle and every pipe, artery and river problem.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No model of flow | Cannot say why a hose squirts further when squeezed | Protocol A (Concrete) |
| S1 | A₁v₁ = A₂v₂ recited | Cannot say why it must hold | Protocol B (Counterexample-first) |
| S2-NARROWER-SLOWER | Squeezing = slowing | "Water slows down in the narrow part — it's harder to get through" | Misconception Engine → then Protocol C |
| S2-FLOW-RATE-CHANGES | Fluid consumed | "Less water flows out at the far end of the pipe" | Misconception Engine → then Protocol C |
| S3 | Partial — continuity fine, flow types not | Cannot explain turbulence | Protocol C (Guided Questioning) |
| S6 | Anxiety on unit conversions | Avoids cm² to m² | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Why does water squirt further when you put your thumb over the end of a hose?"
  No idea, or "more pressure from the thumb" → S0. Enter Protocol A (Concrete).
  "The opening is smaller, so the water must come out faster" → DB-2.

DB-2 (representation / misconception test):
"Water flows at 1.5 m/s through a pipe of cross-section 4 cm², which then narrows to 1 cm². How fast does it flow in the narrow part?"
  "6 m/s — the same volume per second must pass, so A × v stays 6 cm²·m/s" → S3. Enter Protocol C.
  "6 m/s" (no reason) → S1. Enter Protocol B.
  "Slower — about 0.4 m/s, it's squeezed" → SIGNAL:MISCONCEPTION:MC-NARROWER-SLOWER. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (flow-rate check — overlays):
"In a long horizontal pipe with steady flow and no leaks, is the volume of water leaving each second less than the volume entering?"
  "No — the same; water can't pile up or vanish" → no flag.
  "Yes — some is used up along the way" → add SIGNAL:MISCONCEPTION:MC-FLOW-RATE-CHANGES (repair at TA-3).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mech.pressure-fluids`):
"What is pressure, and how does it act in a fluid?"
  Cannot say "force per area, acting in all directions" → flag PREREQ-GAP-PRESSURE.
  In-session minimum repair: one P06 (water jets from holes at different depths) + one P34 ("100 N on 0.02 m²: pressure?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no model of flow.
Success exit: applies continuity and distinguishes streamline from turbulent flow (P91 all 5 probes CORRECT).
Failure exit: on NARROWER-SLOWER → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Hose and the Thumb]
P01
→ P04[content: "Cover part of a hose's end and the water leaves much faster. Watch a falling tap stream get thinner."]
→ P06[content: a pipe narrowing, with equal-volume 'slugs' of water — long and slow in the wide part, short and fast in the narrow part]
→ P14[predict: "In the narrow part, is the water faster or slower?"] → P55
→ success_path → P49 → P05[curiosity: "By exactly how much?"]

[TA-2: The Equation of Continuity]
P02
→ P13[think-aloud: "Water hardly compresses, and in steady flow it can't pile up anywhere. So each second the same volume must cross every section of the pipe. That volume is area × speed: Q = Av. So A₁v₁ = A₂v₂."]
→ P08[notation: "Q = A v (m³/s);  A₁v₁ = A₂v₂"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "4 cm² at 1.5 m/s narrowing to 1 cm². Speed? Flow rate in litres per second?"] → P55
→ success_path[6 m/s; 4 × 10⁻⁴ × 1.5 = 6 × 10⁻⁴ m³/s = 0.6 L/s] → P49
→ failure_path → P50 → P51[diagnose: area units] → P52[narrow: "1 cm² = 10⁻⁴ m²"] → re-elicit P34 → P55

[TA-3: Faster, Not Slower]
P02
→ P41[diagnostic: "In the narrow section: faster or slower?"] → P55
→ [if faster] → P49
→ [if slower] → SIGNAL:MISCONCEPTION:MC-NARROWER-SLOWER → misconception_repair_chain[MC-NARROWER-SLOWER]
→ P41[diagnostic: "Does the flow rate leaving equal that entering?"] → P55
→ [if equal] → P49
→ [if less] → SIGNAL:MISCONCEPTION:MC-FLOW-RATE-CHANGES → misconception_repair_chain[MC-FLOW-RATE-CHANGES]

[TA-4: Rivers and Arteries]
P02
→ P34[question: "A river flows slowly where it is wide and deep. What happens where it passes through a narrow gorge?"] → P55
→ success_path[it speeds up — same volume per second through a smaller cross-section] → P49
→ P13[think-aloud: "In the body the aorta splits into billions of capillaries. Their TOTAL cross-section is far larger, so blood slows right down there — giving time for exchange."]

[TA-5: Streamline and Turbulent Flow]
P02
→ P13[think-aloud: "At low speed fluid moves in smooth layers; each particle follows the one ahead along a streamline, and streamlines never cross. Above a critical speed the flow breaks into eddies — turbulence. The Reynolds number Re = ρvD/η decides: in a pipe, below about 2000 it is streamline."]
→ P34[question: "Water (η = 10⁻³ Pa·s) in a 2 cm pipe: speed at which Re = 2000?"] → P55
→ success_path[≈ 0.1 m/s] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A pipe's diameter halves. By what factor does the speed change?"] → P55
    → P49 → P51[check: area quarters, speed ×4]
    → P35[open: "Explain why a falling stream of tap water gets thinner."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a nozzle that makes water leave a 2 cm² hose at 3 times its speed."] → P55 → CORRECT
    → P76[transfer: "Why does blood flow slowly in capillaries even though each is tiny?"] → P55 → CORRECT
    → P75[boundary: "Can streamlines cross? Why not?"] → P55 → CORRECT
    → P74[classify: "Smoke rising smoothly then breaking into swirls — which part is turbulent?"] → P55 → CORRECT
    → P78[explain: "Why must A × v be the same everywhere along a pipe?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: C
Entry condition: formula without reason.
Success exit: derives continuity from "no piling up".
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["If the water slowed in the narrow part, what would happen to the water arriving behind it each second?"] → P54 (novel) → P55; then TA-3 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: continuity fine; flow types not.
Success exit: streamline/turbulent distinction and Re estimate.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run TA-5 and the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: area-ratio predictions made calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use ratios only ("a quarter of the area, four times the speed"); P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: C
Entry condition: confident "narrower = slower".
Success exit: revises after the hose-and-thumb observation.
Failure exit: Misconception Engine.
Key deltas: open with the thumb over the hose — the jet visibly speeds up; let it sit (P55).

## 6. Misconception Engine

### MC-NARROWER-SLOWER: "A fluid slows down where a pipe narrows"
trigger_signal: student predicts a lower speed in a constriction, reasoning that the fluid is "squeezed" or finds it "harder to get through".
conflict_evidence [P28]: "If water slowed in the narrow part, less water would cross it each second than arrives from the wide part. Where would the extra water go, in a full, rigid pipe?"
bridge_text [P30]: "Nowhere — water hardly compresses and the pipe cannot bulge, so it cannot pile up. The only way the same volume can get through a smaller opening each second is to move faster. That is why your thumb over the hose makes the jet faster, and a river races through a gorge."
replacement_text [P31]: "A₁v₁ = A₂v₂: speed is inversely proportional to cross-sectional area — a quarter of the area, four times the speed."
discrimination_pairs [P33]: ["wide section, 4 cm²: 1.5 m/s", "narrow section, 1 cm²: 6 m/s — same 0.6 L/s"]
s6_path: skip P28; watch the hose jet with and without a thumb.

### MC-FLOW-RATE-CHANGES: "The flow rate falls along a pipe as fluid is used up"
trigger_signal: student expects less fluid per second to leave a leak-free pipe than enters it, as though flowing consumes fluid.
conflict_evidence [P28]: "Fill a pipe completely with water. If 0.6 L entered each second but only 0.5 L left, where would the other 0.1 L go each second?"
bridge_text [P30]: "It would have to pile up inside — impossible in a full, rigid pipe — or leak out. In steady flow the pipe neither gains nor loses water, so exactly as much leaves each second as enters. Friction can reduce the pressure along a pipe, but not the volume flowing per second."
replacement_text [P31]: "In steady incompressible flow, Q = Av is the same at every section; only the speed changes where the area changes."
discrimination_pairs [P33]: ["flow rate Q: the same everywhere along the pipe", "speed v: changes with area"]
s6_path: skip P28; fill a jug from both ends of the same hose in turn — same time.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Smooth smoke vs swirls" | CORRECT = swirls are turbulent |
| P74 (classify) | "Narrow section: faster or slower?" | CORRECT = faster |
| P75 (boundary) | "Can streamlines cross?" | CORRECT = no — a particle can't have two velocities at one point |
| P76 (transfer) | "Capillaries slow" | CORRECT = their total area is much larger than the aorta's |
| P77 (generate) | "Nozzle for 3× speed" | CORRECT = exit area 2/3 cm² |
| P78 (explain) | "Why Av constant" | CORRECT = incompressible, no piling up, same volume per second |
| P79 (predict) | "Diameter halves" | CORRECT = speed ×4 |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a nozzle that makes water leave a 2 cm² hose at 3 times its speed." → expected: CORRECT
P76: "Why does blood flow slowly in capillaries even though each is tiny?" → expected: CORRECT
P75: "Can streamlines cross? Why not?" → expected: CORRECT
P74: "Smoke rising smoothly then breaking into swirls — which part is turbulent?" → expected: CORRECT
P78: "Why must A × v be the same everywhere along a pipe?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "State the equation of continuity."
Interval 2 (3 days): "10 cm² at 2 m/s into 2.5 cm²: speed?"
Interval 3 (7 days): "Streamline vs turbulent?"
Interval 4 (21 days): "Why does a tap stream narrow?"
Interval 5 (60 days): "Why is blood slow in capillaries?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

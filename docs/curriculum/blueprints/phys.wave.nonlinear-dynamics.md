# Teaching Blueprint: phys.wave.nonlinear-dynamics

## 0. Concept Profile
concept_id: phys.wave.nonlinear-dynamics
name: Nonlinear Dynamics and Period Doubling
domain: Waves & Oscillations (Physics)
difficulty: expert (5)
bloom: understand
prerequisites: [phys.wave.forced-oscillations]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a double pendulum released twice from what looks like the same position, tracing completely different paths, before any equation; difficulty 5)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains what makes a system nonlinear — a restoring force (or rule) not proportional to displacement — and its first consequences: superposition no longer holds, and a pendulum's period grows with amplitude (at 90° amplitude it is about 18% longer than the small-swing period), so the simple-harmonic results are only small-amplitude approximations.
2. Follows the route to chaos in the logistic map x_{n+1} = r x_n (1 − x_n): at r = 2.8 every start settles to the fixed point 1 − 1/r ≈ 0.643; at r = 3.2 the values alternate between about 0.513 and 0.799 (period doubling); at r = 3.9 they never settle — chaos.
3. Explains chaos precisely: deterministic (the rule has no randomness — the same start always gives the same sequence) yet with sensitive dependence on initial conditions, so a difference of one part in a million (0.200000 vs 0.200001 at r = 3.9) grows to a completely different sequence within about 20 steps. Long-term prediction is impossible in practice because initial conditions are never known exactly — the reason weather forecasts fail beyond about two weeks, and why driven damped pendulums can swing chaotically.

A student who thinks chaotic means random, or that a tiny error in the starting point always leaves only a tiny error in the prediction, has **NOT** achieved mastery — those ideas miss what chaos theory actually discovered.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Only linear (SHM) systems met | Assumes all oscillators behave like SHM | Protocol A (Concrete) |
| S1 | "Butterfly effect" recited | Cannot say what is deterministic about chaos | Protocol B (Counterexample-first) |
| S2-CHAOS-MEANS-RANDOM | Everyday meaning | "Chaotic systems behave randomly" | Misconception Engine → then Protocol C |
| S2-SMALL-ERROR-SMALL-EFFECT | Linear intuition | "Measure the start a bit better and the prediction is just a bit off" | Misconception Engine → then Protocol C |
| S3 | Partial — chaos idea fine | Cannot describe period doubling or nonlinearity | Protocol C (Guided Questioning) |
| S6 | Anxiety on iteration | Avoids repeated calculation | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"A double pendulum is released twice from what looks like exactly the same position. Will it follow the same path both times?"
  "Yes, if the start is the same" → DB-2.
  "No — tiny differences grow" → DB-2.
  No idea → S0. Enter Protocol A (Concrete).

DB-2 (representation / misconception test):
"The logistic map x_{n+1} = 3.9 x_n (1 − x_n) is run twice from exactly 0.2. Will the two sequences be the same?"
  "Yes — the rule is deterministic; only a different start, however slight, diverges" → S3. Enter Protocol C.
  "Yes" (no reason) → S1. Enter Protocol B.
  "No — chaos is random" → SIGNAL:MISCONCEPTION:MC-CHAOS-MEANS-RANDOM. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (sensitivity check — overlays):
"Two runs start at 0.200000 and 0.200001. After 30 steps, will they still differ only by about 0.000001?"
  "No — the difference grows until the sequences are unrelated" → no flag.
  "Yes" → add SIGNAL:MISCONCEPTION:MC-SMALL-ERROR-SMALL-EFFECT (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.wave.forced-oscillations`):
"What does a driving force do to a damped oscillator, and when is the response largest?"
  Cannot say "it settles to oscillate at the driving frequency; largest near the natural frequency (resonance)" → flag PREREQ-GAP-FORCED.
  In-session minimum repair: one P06 (a resonance curve) + one P34 ("driving far from resonance: big or small amplitude?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: only linear systems met.
Success exit: explains nonlinearity, period doubling and chaos as deterministic with sensitive dependence (P91 all 5 probes CORRECT).
Failure exit: on CHAOS-MEANS-RANDOM → Misconception Engine, resume at TA-4. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Two Releases]
P01
→ P04[content: "Release a double pendulum twice from what looks like the same spot. After a few seconds the paths are completely different."]
→ P06[content: the two traced paths overlaid — identical at first, then wildly different]
→ P14[predict: "Is the pendulum doing something random?"] → P55
→ success_path → P49 → P05[curiosity: "If not random, why can't we predict it?"]

[TA-2: Nonlinear Means Not Proportional]
P02
→ P13[think-aloud: "SHM needs a restoring force proportional to displacement. A pendulum's is proportional to sin θ, which is close to θ only for small swings. At big swings the period grows — about 18% longer at 90°. Once forces aren't proportional, adding two solutions no longer gives a solution, and new behaviour appears."]
→ P34[question: "Is a pendulum's period exactly the same for a 5° and a 60° swing?"] → P55
→ success_path[no — longer at 60°] → P49

[TA-3: The Logistic Map]
P02
→ P13[think-aloud: "A simple rule: x_{n+1} = r x_n (1 − x_n). At r = 2.8 every start settles to 1 − 1/r ≈ 0.643. At r = 3.2 the values flip between 0.513 and 0.799 — period doubling. At r = 3.9 they never settle."]
→ P08[notation: "x_{n+1} = r x_n (1 − x_n);  fixed point 1 − 1/r"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Fixed point for r = 2.8? Check it maps to itself."] → P55
→ success_path[0.643; 2.8 × 0.643 × 0.357 ≈ 0.643] → P49
→ failure_path → P50 → P51[diagnose: algebra of x = r x (1 − x)] → P52[narrow: "Divide by x: 1 = r(1 − x)"] → re-elicit P34 → P55

[TA-4: Deterministic, Not Random]
P02
→ P41[diagnostic: "Run r = 3.9 twice from exactly 0.2. Same sequence?"] → P55
→ [if same] → P49
→ [if different/random] → SIGNAL:MISCONCEPTION:MC-CHAOS-MEANS-RANDOM → misconception_repair_chain[MC-CHAOS-MEANS-RANDOM]

[TA-5: Sensitive Dependence]
P02
→ P41[diagnostic: "0.200000 vs 0.200001: still close after 30 steps?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-SMALL-ERROR-SMALL-EFFECT → misconception_repair_chain[MC-SMALL-ERROR-SMALL-EFFECT]
→ P13[think-aloud: "The difference roughly doubles each step or so; after about 20 steps a millionth has grown to the size of x itself. Measuring ten times better buys only a few more steps. That is why weather can't be forecast weeks ahead."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "At r = 2.8, do two starts 0.2 and 0.3 end up together or apart?"] → P55
    → P49 → P51[check: together — both settle to 0.643; not chaotic]
    → P35[open: "Explain how a system can be fully deterministic yet unpredictable."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a computer experiment that shows sensitive dependence in the logistic map."] → P55 → CORRECT
    → P76[transfer: "Why do weather forecasts lose accuracy after about two weeks?"] → P55 → CORRECT
    → P75[boundary: "Is a small-amplitude pendulum chaotic?"] → P55 → CORRECT
    → P74[classify: "r = 2.8, 3.2, 3.9 — fixed point, period 2, or chaos?"] → P55 → CORRECT
    → P78[explain: "Why doesn't a better measurement fix long-term prediction?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: slogan without meaning.
Success exit: separates determinism from predictability.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["A computer runs the same rule from the same start twice. Can the results differ?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: chaos idea fine; nonlinearity and period doubling not.
Success exit: route to chaos described.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-2 then TA-3; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: "deterministic but unpredictable" stated calmly with the double pendulum.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); show iterations in a prepared table rather than computing; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "chaos is random".
Success exit: revises after the repeat-run demonstration.
Failure exit: Misconception Engine.
Key deltas: open with two identical computer runs producing identical sequences; let it sit (P55).

## 6. Misconception Engine

### MC-CHAOS-MEANS-RANDOM: "Chaotic systems behave randomly"
trigger_signal: student equates chaos with randomness or chance, ignoring that chaotic systems follow exact deterministic rules.
conflict_evidence [P28]: "Run x_{n+1} = 3.9 x_n (1 − x_n) from exactly 0.2 on a computer, twice. Compare the sequences digit by digit. Does any randomness enter the rule?"
bridge_text [P30]: "The two runs are identical — every digit. Nothing in the rule is random; given the start, the whole future is fixed. What makes it chaotic is that any difference in the start, however small, grows rapidly, so the sequence LOOKS irregular and cannot be predicted far ahead in practice. Chaos is deterministic unpredictability, not chance."
replacement_text [P31]: "Chaos = deterministic rules + sensitive dependence on initial conditions; same start, same future; slightly different start, very different future."
discrimination_pairs [P33]: ["dice roll: genuinely random outcome", "logistic map at r = 3.9: exact rule, irregular-looking but repeatable sequence"]
s6_path: skip P28; show the two identical printouts.

### MC-SMALL-ERROR-SMALL-EFFECT: "A tiny error in the start gives only a tiny error later"
trigger_signal: student assumes prediction errors stay proportional to initial measurement errors, so better measurement always allows proportionally better long-term prediction.
conflict_evidence [P28]: "Start two runs at 0.200000 and 0.200001 with r = 3.9. Look at the difference after 5, 10, 20 steps."
bridge_text [P30]: "It grows roughly exponentially — by about step 20 the two runs are as different as two random numbers. In a linear system a small error stays small; in a chaotic one it explodes. Measuring the start ten times more precisely only adds a few more predictable steps, which is why weather forecasts fail beyond about two weeks however good the instruments."
replacement_text [P31]: "In chaotic systems initial errors grow exponentially, limiting long-term prediction no matter how good the measurement."
discrimination_pairs [P33]: ["r = 2.8: starts 0.2 and 0.3 both settle to 0.643 — errors shrink", "r = 3.9: starts 10⁻⁶ apart diverge completely by ~step 20"]
s6_path: skip P28; show the prepared difference table.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "r = 2.8, 3.2, 3.9" | CORRECT = fixed point, period 2, chaos |
| P74 (classify) | "Random or deterministic?" | CORRECT = deterministic |
| P75 (boundary) | "Small-amplitude pendulum" | CORRECT = not chaotic — nearly linear SHM |
| P76 (transfer) | "Weather beyond two weeks" | CORRECT = sensitive dependence on initial conditions |
| P77 (generate) | "Computer experiment" | CORRECT = two runs from starts differing by 10⁻⁶; plot the difference |
| P78 (explain) | "Better measurement" | CORRECT = errors grow exponentially; each 10× improvement adds only a few steps |
| P79 (predict) | "r = 2.8, starts 0.2 and 0.3" | CORRECT = converge to 0.643 |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a computer experiment that shows sensitive dependence in the logistic map." → expected: CORRECT
P76: "Why do weather forecasts lose accuracy after about two weeks?" → expected: CORRECT
P75: "Is a small-amplitude pendulum chaotic?" → expected: CORRECT
P74: "r = 2.8, 3.2, 3.9 — fixed point, period 2, or chaos?" → expected: CORRECT
P78: "Why doesn't a better measurement fix long-term prediction?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "What makes a system nonlinear?"
Interval 2 (3 days): "Fixed point of the logistic map at r = 2.5?"
Interval 3 (7 days): "Is chaos random?"
Interval 4 (21 days): "What is period doubling?"
Interval 5 (60 days): "Why is long-term weather prediction impossible?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3) ✓ · V-9 Schema Repair entered only via P41 gate (TA-4, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

# Teaching Blueprint: phys.meas.linearisation-and-uncertainty

## 0. Concept Profile
concept_id: phys.meas.linearisation-and-uncertainty
name: Linearisation and Uncertainty Propagation
domain: Measurement & Units (Physics)
difficulty: proficient (3)
bloom: analyze
prerequisites: [phys.meas.significant-figures]
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a real pendulum data table before any propagation rule; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Linearises a relation so that a straight-line graph tests it and its gradient gives the wanted constant — e.g. for a pendulum T = 2π√(L/g), plots T² against L, a straight line through the origin of gradient 4π²/g, so g = 4π²/gradient.
2. Draws a best-fit line (not a join-the-dots line) and takes its gradient from a large triangle, reading the intercept as physically meaningful (a systematic error if it should be zero).
3. Propagates uncertainty: absolute uncertainties add for sums and differences; fractional (relative) uncertainties add for products and quotients; a power multiplies the fractional uncertainty by the exponent — e.g. L = 1.00 ± 0.01 m and T = 2.00 ± 0.02 s give g = 4π²L/T² = 9.9 m/s² with fractional uncertainty 0.01 + 2 × 0.01 = 0.03, so g = 9.9 ± 0.3 m/s².

A student who plots T against L and calls the curve "a straight-ish line", or who adds the absolute uncertainties of L and T to get the uncertainty of g, has **NOT** achieved mastery — those errors make every derived constant in the practical curriculum either untested or wrongly stated.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Has only plotted raw data | Plots T against L and stops; no idea what a gradient would mean | Protocol A (Concrete) |
| S1 | Rules recited, not used | States "fractional errors add" but adds absolute ones in a product | Protocol B (Counterexample-first) |
| S2-ABSOLUTE-ADD | Adds absolute uncertainties everywhere | ΔL + ΔT given as the uncertainty in g | Misconception Engine → then Protocol C |
| S2-POWER-IGNORED | Treats T² like T | Fractional uncertainty of T² taken as ΔT/T | Misconception Engine → then Protocol C |
| S3 | Partial — linearisation fine, propagation not (or reverse) | Correct T²–L graph, wrong Δg | Protocol C (Guided Questioning) |
| S6 | Anxiety on algebra with uncertainties | Freezes at "±" | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you drawn a graph from experimental data and used its gradient to find a constant?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"T = 2π√(L/g). What would you plot to get a straight line, and what does its gradient tell you?"
  "T² against L; gradient 4π²/g" → DB-2b.
  "T against L" → S0. Enter Protocol A.
  Pause / "I don't know" → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-2b (propagation test):
"L = 1.00 ± 0.01 m, T = 2.00 ± 0.02 s. What is the fractional uncertainty in g = 4π²L/T²?"
  "0.03" (0.01 + 2 × 0.01) → S3 if any hesitation, else straight to TA-6 gate preparation via Protocol C.
  "0.02" (0.01 + 0.01) → SIGNAL:MISCONCEPTION:MC-POWER-IGNORED. Enter Misconception Engine.
  "0.03 m/s²" from ΔL + ΔT, or any absolute sum → SIGNAL:MISCONCEPTION:MC-ABSOLUTE-ADD. Enter Misconception Engine.

DB-3 (confidence calibration):
"How confident are you with error propagation — 1 to 5?"
  1–2 → add S6 flag.
  4–5 + DB-2b wrong → add S7 flag. Override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.significant-figures` and, through it, `phys.meas.errors`):
"A length is 2.36 ± 0.01 cm. What is its fractional uncertainty, and how many significant figures should the length be quoted to?"
  Cannot form Δx/x or cannot tie the quoted digits to the uncertainty → flag PREREQ-GAP-SIGFIGS.
  In-session minimum repair: one P06 (a ruler reading with its ± half-division) + one P34 ("what fraction of the reading is the uncertainty?") then resume. If the learner has no notion of a measurement uncertainty at all, schedule a `phys.meas.errors` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: DB-2 shows no linearisation.
Success exit: linearises an unfamiliar relation, extracts a constant from the gradient, and states it with a propagated uncertainty (P91 all 5 probes CORRECT).
Failure exit: on ABSOLUTE-ADD or POWER-IGNORED → Misconception Engine, resume at TA-5. On algebra anxiety → Protocol F.
Duration: ~70–80 min (spans 2 sessions; session_cap 7 TAs).

[TA-1: A Curve Hides the Law]
P01
→ P04[content: "A curve can look like many laws. A straight line can only be one. We'll make the data tell us which law it obeys."]
→ P06[content: a pendulum table — L = 0.20, 0.40, 0.60, 0.80, 1.00 m; T = 0.90, 1.27, 1.55, 1.79, 2.01 s — plotted as T against L]
→ P14[predict: "Is this a straight line? Could you read g from it?"] → P55
→ success_path → P49 → P05[curiosity: "What could we plot instead so that T = 2π√(L/g) becomes a straight line?"]

[TA-2: Linearise]
P02
→ P13[think-aloud: "Square both sides: T² = (4π²/g) L. That is y = m x with y = T², x = L, and gradient m = 4π²/g."]
→ P06[content: the same data as T² = 0.81, 1.61, 2.40, 3.20, 4.04 s² against L — a straight line through the origin]
→ P08[notation: "y = m x + c ; choose y and x so the law is linear; constant from the gradient m"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Gradient ≈ 4.02 s²/m. What is g?"] → P55
→ success_path[g = 4π²/4.02 ≈ 9.8 m/s²] → P49
→ failure_path → P50 → P51[diagnose: inverted the gradient relation or arithmetic] → P52[narrow: "Gradient = 4π²/g. Solve for g."] → re-elicit P34 → P55

[TA-3: Best Fit, Not Join the Dots]
P02
→ P17[contrast: "Two students: one joins the dots with a zigzag, one draws a single straight line with points on both sides. Which line uses all the data?"] → P55
→ success_path
→ P13[think-aloud: "Each point has random error. The best-fit line averages it out. Take the gradient from a big triangle on the line, not from a single data point."]
→ P34[question: "The best-fit line crosses the T² axis at +0.1 s², not at 0. What might that mean?"] → P55
→ success_path[a systematic error, e.g. L measured to the wrong point of the bob] → P49

[TA-4: Sums and Differences]
P02
→ P06[content: two lengths, 12.3 ± 0.1 cm and 4.1 ± 0.1 cm]
→ P34[question: "Their difference is 8.2 cm. What is its uncertainty?"] → P55
→ success_path[± 0.2 cm — absolute uncertainties add, even for a difference] → P49

[TA-5: Products, Quotients and Powers]
P02
→ P13[think-aloud: "For g = 4π²L/T², what matters is each quantity's FRACTIONAL uncertainty. L: 0.01/1.00 = 0.01. T: 0.02/2.00 = 0.01, but T is squared, so it counts twice: 0.02."]
→ P08[notation: "Δg/g = ΔL/L + 2 ΔT/T = 0.01 + 0.02 = 0.03 ; Δg = 0.03 × 9.9 ≈ 0.3 m/s²"]
→ P41[diagnostic: "A student writes Δg = ΔL + ΔT = 0.03. What is wrong?"] → P55
→ [if names the unit mismatch / the need for fractional uncertainties] → P49
→ [if accepts it] → SIGNAL:MISCONCEPTION:MC-ABSOLUTE-ADD → misconception_repair_chain[MC-ABSOLUTE-ADD]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Which measurement dominates the uncertainty in g — L or T? Before computing."] → P55
    → P49 → P51[check: weighted T by its power 2?]
    → P35[open: "Explain why a squared quantity contributes twice its fractional uncertainty."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Free fall: s = ½ g t². Choose a graph whose gradient gives g, and say what the gradient equals."] → P55 → CORRECT
    → P76[transfer: "R = V/I with V = 6.0 ± 0.1 V and I = 2.0 ± 0.1 A. State R with its uncertainty."] → P55 → CORRECT
    → P75[boundary: "The best-fit T²–L line misses the origin by 0.1 s². Does this change the value of g from the gradient?"] → P55 → CORRECT
    → P74[classify: "Area of a square of side 5.0 ± 0.1 cm — fractional uncertainty 0.02 or 0.04?"] → P55 → CORRECT
    → P78[explain: "Why plot T² against L rather than T against L?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: rules recited, misapplied.
Success exit: propagates correctly through a product with a power.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Δ of a product: lengths 2.0 ± 0.1 m and 3.0 ± 0.1 m — the area's uncertainty by adding absolutes gives 0.2 m. Check it by computing the largest and smallest possible areas."] → P54 (novel) → P55; then TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: one half correct (graphs or propagation).
Success exit: both halves correct on a new relation.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at the missing half (TA-2/3 or TA-4/5), then the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: one linearised graph and one propagated uncertainty, done calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); every uncertainty first as a percentage ("1 % of the length"); P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: DB-3 confident with a wrong DB-2b.
Success exit: revises the rule after the largest/smallest-value check.
Failure exit: Misconception Engine.
Key deltas: open with the largest/smallest computation for g (L high, T low; L low, T high), which shows a spread of about ±3 %, not ±0.03 m/s²; let the mismatch sit (P55).

## 6. Misconception Engine

### MC-ABSOLUTE-ADD: "Uncertainties always add as absolute values"
trigger_signal: student adds absolute uncertainties of quantities that are multiplied or divided (ΔL + ΔT for g = 4π²L/T²), often mixing units.
conflict_evidence [P28]: "ΔL is 0.01 m and ΔT is 0.02 s. You added them to get 0.03. 0.03 what — metres? seconds? metres per second squared?"
bridge_text [P30]: "Quantities with different units cannot be added. What can be compared is how big each uncertainty is as a FRACTION of its own reading: 0.01 m of 1.00 m is 1 %; 0.02 s of 2.00 s is 1 %. For products and quotients those fractions add."
replacement_text [P31]: "Sums and differences: absolute uncertainties add. Products and quotients: fractional uncertainties add. Powers: multiply the fractional uncertainty by the power."
discrimination_pairs [P33]: ["difference of two lengths 12.3 ± 0.1 and 4.1 ± 0.1 cm (absolute: ± 0.2 cm) vs area of 2.0 ± 0.1 m by 3.0 ± 0.1 m (fractional: 5 % + 3.3 %)", "speed = distance/time (fractional) vs total length of two rods (absolute)"]
s6_path: skip P28; compute the largest and smallest possible g from the extreme readings and look at the spread together.

### MC-POWER-IGNORED: "A squared quantity contributes its uncertainty once"
trigger_signal: student uses ΔT/T rather than 2ΔT/T for T², or ignores the square root's ½.
conflict_evidence [P28]: "T = 2.00 ± 0.02 s, so T could be 2.02 s. Square 2.02. How far is that from 2.00² = 4.00, as a fraction?"
bridge_text [P30]: "2.02² = 4.08 — 2 % above 4.00, although T was only 1 % high. Squaring doubles the fractional uncertainty; a square root halves it."
replacement_text [P31]: "For xⁿ, the fractional uncertainty is n × (Δx/x)."
discrimination_pairs [P33]: ["T² (2 × 1 % = 2 %) vs T (1 %)", "√L (½ × 1 % = 0.5 %) vs L (1 %)"]
s6_path: skip P28; square 2.02 together on a calculator and read off the percentage.

### MC-JOIN-THE-DOTS: "Connect every data point; take the gradient from one point"
trigger_signal: student draws a zigzag through every point, or computes the gradient as y/x of a single data point.
conflict_evidence [P28]: "Repeat the experiment and every point moves a little. Would your zigzag line, and your gradient, change every time?"
bridge_text [P30]: "Each point carries random error; the law is the trend underneath. A single best-fit straight line, with points scattered on both sides, averages the scatter out."
replacement_text [P31]: "Draw one best-fit line; take its gradient from a large triangle on the line, not from data points; read the intercept as information."
discrimination_pairs [P33]: ["best-fit line through scattered points vs zigzag through each point", "gradient from a large triangle on the line vs y/x of one data point (wrong when the intercept is not zero)"]
s6_path: skip P28; draw the best-fit line together with a transparent ruler, counting points above and below.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Square of side 5.0 ± 0.1 cm: area fractional uncertainty?" | CORRECT = 0.04 (2 × 0.02) |
| P74 (classify) | "Difference of 12.3 ± 0.1 and 4.1 ± 0.1 cm: uncertainty?" | CORRECT = ± 0.2 cm |
| P75 (boundary) | "Best-fit line misses the origin by 0.1 s² — g from the gradient?" | CORRECT = gradient unchanged; the intercept signals a systematic error |
| P76 (transfer) | "R = V/I, V = 6.0 ± 0.1 V, I = 2.0 ± 0.1 A" | CORRECT = 3.0 ± 0.2 Ω (1.7 % + 5 % ≈ 6.7 %) |
| P77 (generate) | "s = ½ g t² — which graph?" | CORRECT = s against t², gradient g/2 |
| P78 (explain) | "Why T² against L?" | CORRECT = makes the law linear; gradient 4π²/g |
| P79 (predict) | "L or T dominates Δg?" | CORRECT = T (its 1 % counts twice) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Free fall: s = ½ g t². Choose a graph whose gradient gives g, and say what the gradient equals." → expected: CORRECT
P76: "R = V/I with V = 6.0 ± 0.1 V and I = 2.0 ± 0.1 A. State R with its uncertainty." → expected: CORRECT
P75: "The best-fit T²–L line misses the origin by 0.1 s². Does this change the value of g from the gradient?" → expected: CORRECT
P74: "Area of a square of side 5.0 ± 0.1 cm — fractional uncertainty 0.02 or 0.04?" → expected: CORRECT
P78: "Why plot T² against L rather than T against L?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "What graph linearises T = 2π√(L/g), and what is its gradient?"
Interval 2 (3 days): "Fractional uncertainty of a cube's volume if the side is known to 1 %?"
Interval 3 (7 days): "Two masses 250 ± 1 g and 100 ± 1 g: uncertainty of their difference?"
Interval 4 (21 days): "Ohm's law data: what do you plot to find R, and how do you use worst-fit lines?"
Interval 5 (60 days): "A spring: T = 2π√(m/k). Design the graph, and state which measurement you would improve first."

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

# Teaching Blueprint: phys.opt.diffraction-grating

## 0. Concept Profile
concept_id: phys.opt.diffraction-grating
name: Diffraction Grating and Spectra
domain: Optics (Physics)
difficulty: advanced (4)
bloom: apply
prerequisites: [phys.opt.diffraction]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a laser through a grating giving sharp, widely spaced dots, before d sinθ = mλ; difficulty 4)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Uses the grating equation d sinθ = mλ, with slit spacing d = 1/N for N lines per metre — e.g. 500 lines per mm gives d = 2.0 μm; 600 nm light then has its first order at sinθ = 0.3, θ ≈ 17.5°.
2. Finds the highest visible order from sinθ ≤ 1: m_max = the largest whole number ≤ d/λ (3 for the example above), and predicts that MORE lines per mm (smaller d) spread the orders to LARGER angles.
3. Explains why a grating gives much sharper, brighter maxima than two slits (many slits must all be in step), and that in white light each order is a spectrum with violet nearest the centre and red deviated most — the reverse of a prism.

A student who thinks more lines per mm squeeze the pattern together, or that a grating bends red least as a prism does, has **NOT** achieved mastery — grating spectroscopy, the way stars and gases are analysed, depends on both.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Two-slit only | Cannot connect lines per mm to d | Protocol A (Concrete) |
| S1 | Equation without meaning | Plugs into d sinθ = mλ, cannot predict trends | Protocol B (Counterexample-first) |
| S2-MORE-LINES-SMALLER-ANGLE | Trend inverted | "Finer grating, pattern closer together" | Misconception Engine → then Protocol C |
| S2-RED-LEAST-DEVIATED | Prism ordering transferred | "Red is bent least, like in a prism" | Misconception Engine → then Protocol C |
| S3 | Partial — angles right, maximum order or spectrum wrong | Correct θ₁, cannot find m_max | Protocol C (Guided Questioning) |
| S6 | Anxiety on sines and micrometres | Freezes at d = 1/N | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you seen the rainbow on a CD or DVD surface?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A grating with 500 lines per mm is replaced by one with 1000 lines per mm. Do the bright orders move closer to the centre or further out?"
  "Further out — the slits are closer together, d is smaller, so sinθ = mλ/d is larger" → S3. Enter Protocol C.
  "Further out" (no reason) → S1. Enter Protocol B.
  "Closer — more lines squeeze the pattern" → SIGNAL:MISCONCEPTION:MC-MORE-LINES-SMALLER-ANGLE. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (spectrum check — overlays):
"White light through a grating: in the first-order spectrum, which colour is closest to the centre?"
  "Violet — shortest wavelength, smallest angle" → no flag.
  "Red — as in a prism" → add SIGNAL:MISCONCEPTION:MC-RED-LEAST-DEVIATED (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.opt.diffraction`, and through it Young's experiment):
"Two slits 0.1 mm apart, 600 nm light. Is the first bright fringe at a large or small angle? What equation gives it?"
  Cannot give d sinθ = λ and "small" → flag PREREQ-GAP-DIFFRACTION.
  In-session minimum repair: one P07 (two-slit path difference d sinθ) + one P34 ("path difference for the first bright fringe?") then resume. If interference and diffraction are absent, schedule a `phys.opt.diffraction` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: two-slit picture only.
Success exit: computes angles and maximum order, predicts trends, and orders a spectrum correctly (P91 all 5 probes CORRECT).
Failure exit: on MORE-LINES-SMALLER-ANGLE → Misconception Engine, resume at TA-3. On trigonometry anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Many Slits]
P01
→ P04[content: "A grating is thousands of slits in a row. That makes its bright spots sharp, bright and far apart."]
→ P06[content: a red laser through a grating of 500 lines per mm — a central dot and sharp dots at about 17° either side, then more further out]
→ P14[predict: "Compared with two slits, are these spots wider or narrower, brighter or dimmer?"] → P55
→ success_path[narrower and brighter] → P49 → P05[curiosity: "Why does adding more slits sharpen the spots?"]

[TA-2: The Grating Equation]
P02
→ P13[think-aloud: "Neighbouring slits are d apart. Light from each travels d sinθ further than its neighbour. When that is a whole number of wavelengths, every slit's wave arrives in step — a bright maximum. With thousands of slits, being even slightly off that angle makes them cancel, so the maxima are sharp."]
→ P08[notation: "d sinθ = mλ ; d = 1/N (N lines per metre)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "500 lines per mm, λ = 600 nm. d and θ₁?"] → P55
→ success_path[d = 2.0 μm, sinθ₁ = 0.3, θ₁ ≈ 17.5°] → P49
→ failure_path → P50 → P51[diagnose: d not converted, or N used as d] → P52[narrow: "500 lines in 1 mm — spacing between lines?"] → re-elicit P34 → P55

[TA-3: Finer Gratings Spread Further]
P02
→ P41[diagnostic: "Now 1000 lines per mm. Orders closer to the centre or further out?"] → P55
→ [if further out] → P49
→ [if closer] → SIGNAL:MISCONCEPTION:MC-MORE-LINES-SMALLER-ANGLE → misconception_repair_chain[MC-MORE-LINES-SMALLER-ANGLE]

[TA-4: How Many Orders?]
P02
→ P13[think-aloud: "sinθ can't exceed 1, so m ≤ d/λ. With d = 2.0 μm and λ = 0.6 μm, d/λ = 3.33 — orders 0, 1, 2, 3 each side."]
→ P34[question: "1000 lines per mm, 600 nm. Highest order?"] → P55
→ success_path[d = 1.0 μm, d/λ = 1.67 → m_max = 1] → P49

[TA-5: Spectra]
P02
→ P41[diagnostic: "White light: in the first order, which end of the spectrum is nearer the centre?"] → P55
→ [if violet] → P49
→ [if red] → SIGNAL:MISCONCEPTION:MC-RED-LEAST-DEVIATED → misconception_repair_chain[MC-RED-LEAST-DEVIATED]
→ P13[think-aloud: "sinθ = mλ/d — longer wavelength, larger angle. Red is spread furthest from the centre: the reverse of a prism, where violet is bent most."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Could the second-order red (700 nm) overlap the third-order violet (400 nm)? Compare 2 × 700 with 3 × 400."] → P55
    → P49 → P51[check: 1400 nm > 1200 nm — yes, orders 2 and 3 overlap]
    → P35[open: "Explain why a grating's maxima are so much sharper than two slits'."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Choose a grating (lines per mm) whose first order for 500 nm light lies at 30°."] → P55 → CORRECT
    → P76[transfer: "How does an astronomer use a grating to find what a star is made of?"] → P55 → CORRECT
    → P75[boundary: "λ larger than d. Which orders appear?"] → P55 → CORRECT
    → P74[classify: "More lines per mm: larger or smaller angles?"] → P55 → CORRECT
    → P78[explain: "Why is red deviated most by a grating but least by a prism?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: equation without trends.
Success exit: predicts trends with d and λ.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Compute θ₁ for 500 and 1000 lines per mm (600 nm). Which is larger?"] → P54 (novel) → P55; then TA-3 to TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: angles right; maximum order or spectrum wrong.
Success exit: all parts.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4 or TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: d from lines per mm and one angle computed calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use sinθ values (0.3, 0.6) before converting to degrees; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident inverted trend.
Success exit: revises after computing both gratings.
Failure exit: Misconception Engine.
Key deltas: open with Protocol B's two computations; let the result sit (P55).

## 6. Misconception Engine

### MC-MORE-LINES-SMALLER-ANGLE: "More lines per mm squeeze the orders closer together"
trigger_signal: student predicts smaller angles for a grating with more lines per millimetre.
conflict_evidence [P28]: "500 lines per mm: d = 2.0 μm, sinθ₁ = 0.6/2.0 = 0.3. 1000 lines per mm: d = 1.0 μm, sinθ₁ = 0.6/1.0 = 0.6. Which angle is bigger?"
bridge_text [P30]: "The finer grating — sinθ = mλ/d, and more lines per mm means a SMALLER spacing d, so a larger angle. A finer grating spreads the orders further apart, and fits fewer of them before sinθ reaches 1."
replacement_text [P31]: "d = 1/N; θ grows as d shrinks. More lines per mm → wider spacing of orders → fewer orders visible."
discrimination_pairs [P33]: ["500 lines/mm: θ₁ ≈ 17.5°, orders up to 3 (600 nm)", "1000 lines/mm: θ₁ ≈ 36.9°, only order 1"]
s6_path: skip P28; compute both sines together and compare them on a number line before any angles.

### MC-RED-LEAST-DEVIATED: "A grating, like a prism, bends red the least"
trigger_signal: student places red nearest the centre of a grating spectrum.
conflict_evidence [P28]: "sinθ = mλ/d. Red light (700 nm) or violet (400 nm) — which has the larger λ, and so the larger sinθ?"
bridge_text [P30]: "Red has the longer wavelength, so it lands at the larger angle. A grating separates colours by wavelength directly; a prism separates them by refractive index, which is larger for violet — so the two orders are reversed."
replacement_text [P31]: "Grating: violet nearest the centre, red furthest (θ grows with λ). Prism: red least deviated, violet most (n grows as λ falls)."
discrimination_pairs [P33]: ["grating spectrum: violet inside, red outside", "prism spectrum: red deviated least, violet most"]
s6_path: skip P28; look at a CD under a lamp — note which colour is nearest the bright centre reflection.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "More lines per mm: larger or smaller angles?" | CORRECT = larger |
| P74 (classify) | "First-order spectrum: colour nearest the centre?" | CORRECT = violet |
| P75 (boundary) | "λ > d — orders?" | CORRECT = only the central maximum (m = 0) |
| P76 (transfer) | "Star composition" | CORRECT = spectral lines at measured angles give wavelengths, matched to elements |
| P77 (generate) | "First order at 30° for 500 nm" | CORRECT = d = 1.0 μm → 1000 lines per mm |
| P78 (explain) | "Red most for grating, least for prism" | CORRECT = θ ∝ λ for a grating; n larger for violet in a prism |
| P79 (predict) | "Second-order red overlaps third-order violet?" | CORRECT = yes (1400 > 1200 nm) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Choose a grating (lines per mm) whose first order for 500 nm light lies at 30°." → expected: CORRECT
P76: "How does an astronomer use a grating to find what a star is made of?" → expected: CORRECT
P75: "λ larger than d. Which orders appear?" → expected: CORRECT
P74: "More lines per mm: larger or smaller angles?" → expected: CORRECT
P78: "Why is red deviated most by a grating but least by a prism?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "d for 600 lines per mm?"
Interval 2 (3 days): "θ₁ for 550 nm on a 400 lines per mm grating?"
Interval 3 (7 days): "Highest order for 500 nm on 800 lines per mm?"
Interval 4 (21 days): "Why does a grating give sharper maxima than two slits?"
Interval 5 (60 days): "Why do grating spectra of different orders overlap?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

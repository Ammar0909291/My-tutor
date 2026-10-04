# Teaching Blueprint: phys.astro.stellar-properties

## 0. Concept Profile
concept_id: phys.astro.stellar-properties
name: Stellar Luminosity, Colour and the HR Diagram
domain: Astrophysics (Physics)
difficulty: advanced (4)
bloom: apply
prerequisites: [phys.therm.blackbody-radiation]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (Orion's red Betelgeuse and blue Rigel side by side, before any formula; difficulty 4)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Distinguishes luminosity L (the total power a star emits) from apparent brightness b = L/(4πd²) (the power per square metre reaching us), and uses the Stefan–Boltzmann law L = 4πR²σT⁴: the Sun (R = 6.96 × 10⁸ m, T = 5772 K) has L ≈ 3.8 × 10²⁶ W; a star of the same radius but twice the temperature is 16 times as luminous; a red giant of 3500 K and 100 L☉ must be about 27 times the Sun's radius.
2. Reads a star's colour as its surface temperature through Wien's law λ_max = 2.898 × 10⁻³ m·K / T: Betelgeuse (≈3500 K) peaks near 830 nm and looks red; the Sun (5772 K) near 500 nm; Rigel (≈12 000 K) near 240 nm and looks blue-white — red stars are the COOLEST.
3. Uses the magnitude scale (smaller numbers are brighter; 5 magnitudes = a factor of 100 in brightness; absolute magnitude is the apparent magnitude at 10 parsecs) and reads the Hertzsprung–Russell diagram — luminosity against temperature, with temperature increasing to the LEFT — locating the main sequence, the giants (cool but luminous, so large) and the white dwarfs (hot but faint, so small).

A student who thinks a brighter-looking star must emit more power, or that red stars are hotter than blue ones, has **NOT** achieved mastery — those ideas misread every star chart and HR diagram.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Stars as identical points | Cannot say what makes one star brighter | Protocol A (Concrete) |
| S1 | Formulas recited | Writes L = 4πR²σT⁴ but cannot use it to compare stars | Protocol B (Counterexample-first) |
| S2-APPARENT-IS-LUMINOSITY | Looks brighter = more powerful | "Sirius looks brightest, so it emits the most" | Misconception Engine → then Protocol C |
| S2-RED-STARS-HOTTER | Red = hot | "Red stars are the hottest — red means hot" | Misconception Engine → then Protocol C |
| S3 | Partial — L and colour fine | Cannot read the HR diagram's regions | Protocol C (Guided Questioning) |
| S6 | Anxiety on powers of ten | Avoids T⁴ and logarithms | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Two stars look equally bright in the sky. Must they give out the same amount of light?"
  "Yes" → SIGNAL:MISCONCEPTION:MC-APPARENT-IS-LUMINOSITY. Enter Misconception Engine.
  "No — one could be nearer" → DB-2.
  No idea → S0. Enter Protocol A (Concrete).

DB-2 (representation / misconception test):
"Betelgeuse is red; Rigel is blue-white. Which has the hotter surface?"
  "Rigel — hotter bodies peak at shorter wavelengths (Wien's law)" → S3. Enter Protocol C.
  "Rigel" (no reason) → S1. Enter Protocol B.
  "Betelgeuse — red means hot" → SIGNAL:MISCONCEPTION:MC-RED-STARS-HOTTER. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (magnitude check — overlays):
"A star of magnitude 1 and one of magnitude 6: which is brighter, and by how much?"
  "Magnitude 1, by a factor of 100" → no flag.
  "Magnitude 6 — bigger number" → note; repair at TA-5.
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.therm.blackbody-radiation`):
"How do a hot body's total radiated power and its peak wavelength change as it gets hotter?"
  Cannot say "power ∝ T⁴; peak shifts to shorter wavelength" → flag PREREQ-GAP-BLACKBODY.
  In-session minimum repair: one P06 (blackbody curves at three temperatures) + one P34 ("T doubles: power?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: stars as identical points.
Success exit: separates L from b, reads temperature from colour, reads the HR diagram (P91 all 5 probes CORRECT).
Failure exit: on APPARENT-IS-LUMINOSITY → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Two Stars in Orion]
P01
→ P04[content: "In Orion, Betelgeuse glows orange-red and Rigel blue-white. Their colours, and how bright they look, tell us a great deal — if we read them correctly."]
→ P06[content: Orion photographed in colour; blackbody curves for 3500 K, 5772 K and 12 000 K]
→ P14[predict: "Which star is hotter?"] → P55
→ success_path → P49 → P05[curiosity: "And which is bigger?"]

[TA-2: Colour Is Temperature]
P02
→ P13[think-aloud: "Stars radiate roughly as blackbodies. Wien's law: λ_max = 2.898 × 10⁻³ / T. A 3500 K star peaks in the infrared near 830 nm and looks red; the Sun at 5772 K peaks near 500 nm; a 12 000 K star peaks in the ultraviolet and looks blue-white."]
→ P08[notation: "λ_max T = 2.898 × 10⁻³ m·K;  L = 4πR²σT⁴;  b = L/(4πd²)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P41[diagnostic: "Red or blue: which star is hotter?"] → P55
→ [if blue] → P49
→ [if red] → SIGNAL:MISCONCEPTION:MC-RED-STARS-HOTTER → misconception_repair_chain[MC-RED-STARS-HOTTER]

[TA-3: Luminosity vs Brightness]
P02
→ P41[diagnostic: "Two stars look equally bright. Same luminosity?"] → P55
→ [if not necessarily] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-APPARENT-IS-LUMINOSITY → misconception_repair_chain[MC-APPARENT-IS-LUMINOSITY]
→ P34[question: "Star A is as luminous as star B but twice as far. How bright does it look compared with B?"] → P55
→ success_path[a quarter as bright] → P49

[TA-4: Size from L and T]
P02
→ P34[question: "Same radius as the Sun, twice the temperature: luminosity? A 3500 K star of 100 L☉: radius?"] → P55
→ success_path[16 L☉; R = 10 × (5772/3500)² ≈ 27 R☉ — a red giant] → P49
→ failure_path → P50 → P51[diagnose: T⁴ handling] → P52[narrow: "Write L/L☉ = (R/R☉)²(T/T☉)⁴"] → re-elicit P34 → P55

[TA-5: Magnitudes and the HR Diagram]
P02
→ P13[think-aloud: "Magnitudes run backwards: smaller is brighter, and 5 magnitudes is exactly a factor of 100. Absolute magnitude is how bright a star would look from 10 parsecs. On the HR diagram, luminosity goes up and temperature increases to the LEFT. Most stars lie on the main sequence. Top right: cool but very luminous — they must be huge: giants. Bottom left: hot but faint — they must be tiny: white dwarfs."]
→ P34[question: "Where on the HR diagram is a 3500 K, 100 L☉ star? A 10 000 K, 0.01 L☉ star?"] → P55
→ success_path[top right — giant; bottom left — white dwarf] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A white dwarf is hotter than the Sun but far fainter. What must be true of its size?"] → P55
    → P49 → P51[check: much smaller — L ∝ R²T⁴]
    → P35[open: "Explain why the brightest-looking star need not be the most luminous."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Two stars have the same luminosity; one is 4 times as hot. How do their radii compare?"] → P55 → CORRECT
    → P76[transfer: "Why does a red-hot poker look red while a hotter one looks white?"] → P55 → CORRECT
    → P75[boundary: "Magnitude −1.5 or 0.0: which is brighter?"] → P55 → CORRECT
    → P74[classify: "Hot and faint; cool and luminous; Sun-like — which HR region?"] → P55 → CORRECT
    → P78[explain: "Why can a cool star be very luminous?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formulas without comparisons.
Success exit: compares two stars with L = 4πR²σT⁴.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Betelgeuse is cooler than the Sun yet about 100 000 times as luminous. How?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: L and colour fine; HR diagram not.
Success exit: HR regions read and explained.
Failure exit: escalate to Protocol A TA-3.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: colour–temperature and near/far reasoning stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); ratios instead of powers of ten; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "red = hot".
Success exit: revises after the poker contrast.
Failure exit: Misconception Engine.
Key deltas: open with a heated poker: dull red, then orange, then white as it gets hotter; let it sit (P55).

## 6. Misconception Engine

### MC-APPARENT-IS-LUMINOSITY: "A star that looks brighter must emit more light"
trigger_signal: student equates apparent brightness with luminosity, ignoring distance.
conflict_evidence [P28]: "A car's headlights a kilometre away look fainter than a torch in your hand. Does the torch give out more light?"
bridge_text [P30]: "No — the headlights emit far more, but their light is spread over a sphere of radius 1 km. Apparent brightness falls as 1/d²: b = L/(4πd²). Stars are at hugely different distances, so how bright one looks tells you little about its luminosity until you know its distance. Sirius looks brightest of all because it is near (2.6 pc), not because it is the most luminous."
replacement_text [P31]: "Luminosity L is a star's total power; apparent brightness b = L/(4πd²) depends on distance too."
discrimination_pairs [P33]: ["luminosity: watts emitted, a property of the star", "apparent brightness: watts per m² arriving, depends on L and d"]
s6_path: skip P28; compare a phone torch at arm's length and across a room.

### MC-RED-STARS-HOTTER: "Red stars are the hottest"
trigger_signal: student ranks red stars as hotter than blue ones, carrying over 'red = hot, blue = cold' colour conventions.
conflict_evidence [P28]: "Heat a poker: first it glows dull red, then orange, then yellow-white. Which glow means hotter?"
bridge_text [P30]: "White-hot is hotter than red-hot. A hotter body radiates more at shorter wavelengths — Wien's law, λ_max ∝ 1/T. A 3500 K star peaks in the red and infrared; a 12 000 K star peaks in the blue and ultraviolet. Taps label hot red and cold blue by convention, but for glowing bodies it is the other way round."
replacement_text [P31]: "Star colour runs red (coolest, ~3000 K) → orange → yellow → white → blue (hottest, >10 000 K)."
discrimination_pairs [P33]: ["Betelgeuse, red: ~3500 K, peak ~830 nm", "Rigel, blue-white: ~12 000 K, peak ~240 nm"]
s6_path: skip P28; look at a dimmed bulb (orange) and a bright one (white).

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "HR regions" | CORRECT = white dwarf bottom left, giant top right, Sun on main sequence |
| P74 (classify) | "Red vs blue — hotter?" | CORRECT = blue |
| P75 (boundary) | "Magnitude −1.5 vs 0.0" | CORRECT = −1.5 brighter |
| P76 (transfer) | "Poker colours" | CORRECT = hotter → shorter peak wavelength → whiter |
| P77 (generate) | "Same L, 4× T" | CORRECT = radius 1/16 |
| P78 (explain) | "Cool but luminous" | CORRECT = very large radius |
| P79 (predict) | "White dwarf size" | CORRECT = tiny |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Two stars have the same luminosity; one is 4 times as hot. How do their radii compare?" → expected: CORRECT
P76: "Why does a red-hot poker look red while a hotter one looks white?" → expected: CORRECT
P75: "Magnitude −1.5 or 0.0: which is brighter?" → expected: CORRECT
P74: "Hot and faint; cool and luminous; Sun-like — which HR region?" → expected: CORRECT
P78: "Why can a cool star be very luminous?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Luminosity vs apparent brightness?"
Interval 2 (3 days): "Peak wavelength of a 6000 K star?"
Interval 3 (7 days): "Same T, 3× R: luminosity?"
Interval 4 (21 days): "5 magnitudes = ?"
Interval 5 (60 days): "Sketch the HR diagram's three main groups."

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-2, TA-3) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

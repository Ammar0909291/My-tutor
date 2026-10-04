# Teaching Blueprint: phys.therm.blackbody-radiation

## 0. Concept Profile
concept_id: phys.therm.blackbody-radiation
name: Blackbody Radiation: Stefan–Boltzmann and Wien
domain: Thermal Physics (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.therm.heat-transfer]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a heated iron bar going dull red, orange, yellow-white before the laws; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Describes a blackbody as a perfect absorber and therefore the best possible emitter at every wavelength, and recognises that its spectrum depends only on its temperature — the Sun and a glowing coal are good approximations, whatever their colour looks like.
2. Uses Wien's displacement law, λ_max T = b ≈ 2.9 × 10⁻³ m·K, with T in kelvin — the Sun (about 5800 K) peaks near 500 nm, a human body (310 K) near 9.4 μm in the infrared.
3. Uses the Stefan–Boltzmann law, P = εσAT⁴ (σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴), and the net exchange P = εσA(T⁴ − T_s⁴): doubling the absolute temperature multiplies the radiated power by 16.

A student who uses Celsius in T⁴, who expects twice the temperature to give twice the power, or who says "a blackbody looks black so it cannot be the Sun", has **NOT** achieved mastery — those errors break stellar temperatures, thermal imaging and the photon picture in modern physics.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Radiation known only as "heat rays" | No link between temperature and colour | Protocol A (Concrete) |
| S1 | Laws recited without use | Writes σT⁴ but cannot predict the effect of doubling T | Protocol B (Counterexample-first) |
| S2-LINEAR-IN-T | Power ∝ T, or Celsius used | "Twice as hot, twice the power"; plugs in 100 °C | Misconception Engine → then Protocol C |
| S2-BLACKBODY-LOOKS-BLACK | Taken literally | "A blackbody must look black; the Sun can't be one" | Misconception Engine → then Protocol C |
| S3 | Partial — Wien fine, Stefan not (or reverse) | Correct λ_max, wrong power ratio | Protocol C (Guided Questioning) |
| S6 | Anxiety on powers of ten | Freezes at 10⁻³ and T⁴ | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"As an iron bar is heated in a furnace, how does its glow change?"
  No idea → S0. Enter Protocol A (Concrete).
  "Red, then orange, then white" → DB-2.

DB-2 (representation / misconception test):
"A star's surface temperature doubles. By what factor does the power it radiates per square metre change?"
  "16 — power goes as T⁴" → S3. Enter Protocol C.
  "16" (no reason) → S1. Enter Protocol B.
  "2" / computes with Celsius → SIGNAL:MISCONCEPTION:MC-LINEAR-IN-T. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (name check — overlays):
"Is the Sun closer to a blackbody or to a mirror?"
  "A blackbody — it absorbs almost everything that falls on it and emits a temperature spectrum" → no flag.
  "A mirror / neither — it isn't black" → add SIGNAL:MISCONCEPTION:MC-BLACKBODY-LOOKS-BLACK (repair at TA-2).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.therm.heat-transfer`):
"Name the three ways heat moves, and which one works through a vacuum."
  Cannot name radiation as the vacuum-crossing mode → flag PREREQ-GAP-HEAT-TRANSFER.
  In-session minimum repair: one P06 (feeling the warmth of a fire across a gap, or sunlight through space) + one P34 ("how does the Sun's heat reach us?") then resume. If the three modes are absent, schedule a `phys.therm.heat-transfer` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: no temperature–colour link.
Success exit: applies Wien and Stefan–Boltzmann with kelvin and explains why the Sun is a near-blackbody (P91 all 5 probes CORRECT).
Failure exit: on LINEAR-IN-T → Misconception Engine, resume at TA-4. On powers-of-ten anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Colour Tells Temperature]
P01
→ P04[content: "You can read the temperature of a glowing object from its colour — even a star you can never touch."]
→ P06[content: an iron bar in a furnace — dull red at about 900 K, orange near 1300 K, yellow-white near 1800 K]
→ P14[predict: "As it gets hotter, does the colour of its brightest glow move toward red or toward blue?"] → P55
→ success_path[toward blue — shorter wavelengths] → P49 → P05[curiosity: "Is there a rule linking the peak wavelength and the temperature?"]

[TA-2: The Ideal Emitter]
P02
→ P13[think-aloud: "A perfect absorber takes in every wavelength that hits it. A body that absorbs well also emits well, so a perfect absorber is the best emitter — a blackbody. Its glow depends only on its temperature."]
→ P17[contrast: "A small hole in a closed box looks perfectly black from outside — light that enters never comes out. Heat the box until it glows. What colour is the hole now?"] → P55
→ success_path[it glows with the box's temperature colour — the best possible emitter] → P49
→ P41[diagnostic: "So can the Sun, which is dazzlingly bright, be a near-blackbody?"] → P55
→ [if yes — black describes absorption, not appearance] → P49
→ [if no] → SIGNAL:MISCONCEPTION:MC-BLACKBODY-LOOKS-BLACK → misconception_repair_chain[MC-BLACKBODY-LOOKS-BLACK]

[TA-3: Wien's Law]
P02
→ P07[modality: three blackbody curves (3000 K, 4500 K, 6000 K) — intensity against wavelength; peaks shift left and grow]
→ P08[notation: "λ_max T = b ≈ 2.9 × 10⁻³ m·K (T in kelvin)"]
// GR-3 satisfied: P06/P07 and P13 preceded P08 (V-8 PASS)
→ P34[question: "The Sun's spectrum peaks near 500 nm. Its surface temperature?"] → P55
→ success_path[≈ 5800 K] → P49

[TA-4: Stefan–Boltzmann]
P02
→ P13[think-aloud: "The total power radiated is P = εσAT⁴ — ε is the emissivity, 1 for a blackbody. The fourth power is steep: twice the kelvin temperature, 2⁴ = 16 times the power."]
→ P08[notation: "P = ε σ A T⁴ ; net P = ε σ A (T⁴ − T_s⁴)"]
→ P34[question: "A filament is heated from 1000 K to 2000 K. Power ratio?"] → P55
→ success_path[16] → P49
→ failure_path → P50 → P51[diagnose: linear thinking (→MC) or Celsius] → P52[narrow: "What is 2 to the fourth power?"] → re-elicit P34 → P55

[TA-5: Net Exchange and You]
P02
→ P34[question: "Your skin is at 310 K in a 293 K room. Using ε ≈ 1, roughly how much does each square metre radiate away NET?"] → P55
→ success_path[σ(310⁴ − 293⁴) ≈ 106 W] → P49
→ P13[think-aloud: "Your body glows too — in the infrared, peaking near 9.4 μm, which is what thermal cameras see."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A red star and a blue star of the same size. Which radiates more power?"] → P55
    → P49 → P51[check: blue = hotter, T⁴?]
    → P35[open: "Explain why kelvin, not Celsius, must be used in both laws."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Pick a temperature at which a blackbody would peak in the infrared at 10 μm."] → P55 → CORRECT
    → P76[transfer: "Why does a thermal camera see people in the dark?"] → P55 → CORRECT
    → P75[boundary: "A body at the same temperature as its surroundings. Net radiated power?"] → P55 → CORRECT
    → P74[classify: "Temperature rises from 27 °C to 327 °C. Power ratio: 12, 16 or 4?"] → P55 → CORRECT
    → P78[explain: "Why is a small hole in a closed box a near-perfect blackbody?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: laws recited, not applied.
Success exit: correct ratio and peak wavelength with kelvin.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["27 °C to 54 °C: has the temperature doubled? Has the power?"] → P54 (novel) → P55; then TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: one law correct.
Success exit: both laws with kelvin.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-3 or TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: one Wien estimate and one T⁴ ratio done calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); ratios (2⁴ = 16) before σ; round b to 3 × 10⁻³ m·K first; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "×2".
Success exit: revises after computing 2⁴.
Failure exit: Misconception Engine.
Key deltas: open with the 27 °C → 327 °C ratio (kelvin 300 → 600, ×16; Celsius gives the absurd 12⁴ ≈ 20,000); let the mismatch sit (P55).

## 6. Misconception Engine

### MC-LINEAR-IN-T: "Radiated power is proportional to temperature (or Celsius can be used)"
trigger_signal: student expects doubling T to double the power, or substitutes Celsius into T⁴ or λ_max T.
conflict_evidence [P28]: "Heat a body from 27 °C to 54 °C. In Celsius it 'doubled'. In kelvin it went from 300 K to 327 K — 9 % hotter. Which one does the atom feel?"
bridge_text [P30]: "Radiation depends on absolute temperature: at 0 K nothing radiates, so the scale must start there — kelvin. And the dependence is steep: P ∝ T⁴, so 300 K → 600 K multiplies the power by 2⁴ = 16."
replacement_text [P31]: "Always convert to kelvin. Power ratio = (T₂/T₁)⁴; peak wavelength ratio = T₁/T₂."
discrimination_pairs [P33]: ["300 K → 600 K: power ×16, peak wavelength ×½", "27 °C → 54 °C: only 300 → 327 K, power ×1.41"]
s6_path: skip P28; compute 2 × 2 × 2 × 2 together, then convert one Celsius value to kelvin.

### MC-BLACKBODY-LOOKS-BLACK: "A blackbody must look black"
trigger_signal: student refuses to treat the Sun, a furnace opening or a glowing coal as near-blackbodies because they are bright.
conflict_evidence [P28]: "A small hole in a closed box looks pitch black — no light that goes in comes out. Heat the box to 1500 K. Is the hole black now?"
bridge_text [P30]: "No — it glows brighter than any other surface at that temperature. 'Black' means it absorbs everything that falls on it. Because good absorbers are good emitters, it also emits the most possible, with a spectrum set only by its temperature."
replacement_text [P31]: "A blackbody is defined by perfect absorption, not by colour. Cold, it looks black; hot, it glows according to Wien and Stefan–Boltzmann. The Sun is close to one."
discrimination_pairs [P33]: ["a cold blackbody (looks black) vs a hot one (glows white-yellow, like the Sun)", "a polished silver surface (poor absorber, poor emitter) vs a matt black surface (good absorber, good emitter)"]
s6_path: skip P28; compare a black and a shiny can of hot water cooling — the black one cools faster.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "27 °C → 327 °C: power ratio?" | CORRECT = 16 (300 → 600 K) |
| P74 (classify) | "Red star or blue star hotter?" | CORRECT = blue |
| P75 (boundary) | "Body at the same T as surroundings — net power?" | CORRECT = zero (emits and absorbs equally) |
| P76 (transfer) | "Thermal camera in the dark" | CORRECT = bodies at 310 K emit infrared peaking near 9 μm |
| P77 (generate) | "Temperature to peak at 10 μm" | CORRECT = ≈ 290 K |
| P78 (explain) | "Why is a hole in a box a blackbody?" | CORRECT = light entering is absorbed after many reflections |
| P79 (predict) | "Red vs blue star, same size — more power?" | CORRECT = blue (higher T, T⁴) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Pick a temperature at which a blackbody would peak in the infrared at 10 μm." → expected: CORRECT
P76: "Why does a thermal camera see people in the dark?" → expected: CORRECT
P75: "A body at the same temperature as its surroundings. Net radiated power?" → expected: CORRECT
P74: "Temperature rises from 27 °C to 327 °C. Power ratio: 12, 16 or 4?" → expected: CORRECT
P78: "Why is a small hole in a closed box a near-perfect blackbody?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "State Wien's law and the Sun's peak wavelength."
Interval 2 (3 days): "Kelvin temperature doubles — power ratio?"
Interval 3 (7 days): "Why must T be in kelvin?"
Interval 4 (21 days): "Why does a glowing coal look orange but the Sun look white?"
Interval 5 (60 days): "Estimate the net radiation from your body (area 1.8 m², skin 306 K, room 293 K)."

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3, TA-4) ✓ · V-9 Schema Repair entered only via P41 gate (TA-2) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

# Teaching Blueprint: phys.meas.density

## 0. Concept Profile
concept_id: phys.meas.density
name: Density and Relative Density
domain: Measurement & Units (Physics)
difficulty: foundational (1)
bloom: apply
prerequisites: [phys.meas.units]
mastery_threshold: 0.7
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (two same-size blocks of different material before rho = m/V; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Computes density from mass and volume (rho = m/V) with units, and rearranges it to find a mass (m = rho V) or a volume (V = m/rho) — e.g. 540 g of aluminium filling 200 cm³ has rho = 2.7 g/cm³.
2. States that density is a property of the **material**, not of the object: cutting a block in half halves its mass and its volume and leaves its density unchanged.
3. Uses relative density (rho_substance / rho_water, no unit) to decide whether a solid sinks or floats in water — and converts between g/cm³ and kg/m³ (1 g/cm³ = 1000 kg/m³).

A student who can plug numbers into rho = m/V but says "a big log is denser than a small pebble because it is heavier", or "the half block is half as dense", has **NOT** achieved mastery — confusing density with mass or weight breaks every floating, pressure (P = rho g h) and buoyancy problem downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No exposure to density | Cannot say what "denser" means beyond "heavier" | Protocol A (Concrete) |
| S1 | Formula without meaning | Computes m/V correctly but cannot predict sink/float or explain "same material, same density" | Protocol B (Counterexample-first) |
| S2-HEAVY-IS-DENSE | Density = heaviness | Says the heavier object is denser regardless of size; a ship "should sink because it is heavy" | Misconception Engine → then Protocol C |
| S2-SIZE-CHANGES-DENSITY | Density scales with amount | Says a half block has half the density | Misconception Engine → then Protocol C |
| S3 | Partial — m/V fine; fails units or relative density | Mixes g/cm³ and kg/m³; cannot use relative density | Protocol C (Guided Questioning) |
| S6 | Anxiety on division with units | Freezes at "find the density"; avoids the formula | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check — routes S0 before content is tested):
"Have you met the word 'density' before — for example, why some things float and others sink?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A 1 kg block of wood and a 1 kg block of iron. Which is denser, and how can you tell without weighing them?"
  "Iron — the iron block is much smaller for the same mass" → S3. Enter Protocol C.
  "Iron" (no reason / "iron is heavy") → S1. Enter Protocol B.
  "Same — they are both 1 kg" → SIGNAL:MISCONCEPTION:MC-HEAVY-IS-DENSE. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag. Ask: "Are you comfortable dividing one number by another?"
      No → S6. Enter Protocol F.
      Yes → S0. Enter Protocol A.

DB-3 (confidence calibration — overlays S6/S7):
"How confident are you with density — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations to the selected protocol.
  4–5 + DB-2 showed HEAVY-IS-DENSE → add S7 flag. Override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.units`):
"What are the SI units of mass and of volume?"
  Cannot name kg and m³ (or g and cm³) → flag PREREQ-GAP-UNITS.
  In-session minimum repair: one P06 anchor (a 1 cm cube = 1 cm³ = 1 mL of water) + one P34 ("how many 1 cm cubes fill a 2 × 3 × 4 cm box?") then resume. If the learner cannot treat volume as a measured quantity at all, suspend and schedule a `phys.meas.units` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no prior exposure (DB-1 = No).
Success exit: computes density for a new material, predicts sink/float from it, and states that cutting the object does not change its density (P91 all 5 probes CORRECT).
Failure exit: on repeated HEAVY-IS-DENSE signal → Misconception Engine[MC-HEAVY-IS-DENSE], then resume at TA-3. On division collapse → Protocol F.
Duration: ~50–60 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Same Size, Different Mass]
P01
→ P04[content: "Two blocks the same size can have very different masses. We're going to give that difference a name."]
→ P06[content: two equal cubes, 10 cm³ each — one wood (6 g), one aluminium (27 g)]
→ P14[predict: "Same size. Which one packs more mass into each cubic centimetre?"] → P55
→ success_path → P49 → P05[curiosity: "How much mass is packed into ONE cubic centimetre of each?"]

[TA-2: Mass per Unit Volume]
P02
→ P06[content: divide the cubes into ten 1 cm³ pieces — each wood piece 0.6 g, each aluminium piece 2.7 g]
→ P13[think-aloud: "Density is the mass in each unit of volume. Wood: 0.6 g in every cm³. Aluminium: 2.7 g in every cm³."]
→ P08[notation: "density rho = mass / volume = m/V ; unit g/cm³ or kg/m³"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "A 200 cm³ block has mass 540 g. What is its density?"] → P55
→ success_path[2.7 g/cm³] → P49
→ failure_path → P50 → P51[diagnose: divided the wrong way (V/m) or mis-arithmetic?] → P52[narrow: "Density is mass in EACH cm³ — so which number goes on top?"] → re-elicit P34 → P55

[TA-3: Density Belongs to the Material]
P02
→ P06[content: cut the 200 cm³ aluminium block in half — 100 cm³, 270 g]
→ P17[contrast: "Half the mass and half the volume. What is the density of the half block?"] → P55
→ success_path[still 2.7 g/cm³]
→ P13[think-aloud: "Mass and volume both halved, so the ratio did not change. Density is a property of aluminium, not of this particular lump."]
→ P34[question: "A huge aluminium beam and a small aluminium spoon — which is denser?"] → P55
→ success_path[same] → P49

[TA-4: Sink or Float, and Relative Density]
P02
→ P07[modality: table — water 1.0, ice 0.92, wood 0.6, aluminium 2.7, iron 7.9 g/cm³]
→ P16[compare: "Which of these float in water and which sink? What decides it?"] → P55
→ success_path → P21[generalise: "An object floats if its density is less than the liquid's, sinks if greater."] → P55
→ P08[notation: "relative density = rho_substance / rho_water — no unit; iron 7.9, wood 0.6"]
→ P41[diagnostic: "A steel ship floats. Steel's relative density is 7.9. How can that be?"] → P55
→ [if cites the air inside lowering the AVERAGE density of the hull] → P49
→ [if "ships are light" / "big things float"] → SIGNAL:MISCONCEPTION:MC-HEAVY-IS-DENSE → misconception_repair_chain[MC-HEAVY-IS-DENSE]

[TA-5: Units — g/cm³ and kg/m³]
P02
→ P13[think-aloud: "1 g/cm³: 1 cm³ is 10⁻⁶ m³ and 1 g is 10⁻³ kg, so 1 g/cm³ = 10⁻³ kg / 10⁻⁶ m³ = 1000 kg/m³."]
→ P34[question: "Water is 1.0 g/cm³. What is that in kg/m³? How much mass is 1 m³ of water?"] → P55
→ success_path[1000 kg/m³; one tonne] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A 50 cm³ stone has mass 150 g. Before computing — will it float in water?"] → P55
    → P49 → P51[check: computed 3 g/cm³ and compared with water, or guessed from weight?]
    → P35[open: "Explain why a small pebble sinks while a huge log floats."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Give a mass and volume for an object that would just float in water, and say why."] → P55 → CORRECT
    → P76[transfer: "A gold ring has volume 0.5 cm³ and gold is 19.3 g/cm³. What is its mass?"] → P55 → CORRECT
    → P75[boundary: "A block of relative density 1.0 is placed in water. What happens?"] → P55 → CORRECT
    → P74[classify: "Cutting a cork in half: does its density double, halve or stay the same?"] → P55 → CORRECT
    → P78[explain: "In your own words, what is the difference between a heavy object and a dense one?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1 (formula without meaning)
CPA entry: P
Entry condition: computes m/V but cannot predict sink/float or say why size does not matter.
Success exit: predicts sink/float from density for an object they have not seen, and justifies "same material, same density".
Failure exit: if the counterexample triggers HEAVY-IS-DENSE or SIZE-CHANGES-DENSITY → Misconception Engine, then Protocol C.
Key deltas from A: skip TA-1; open with P02 → P41["A 2 kg log floats and a 5 g iron nail sinks — the heavier one floats. Explain."] → P54 (novel) → P55; on the stall run TA-3 (cut the block) then TA-4.

### Protocol C — Guided Questioning
Serves: S3 (partial schema), S2 (post-repair)
CPA entry: P
Entry condition: m/V correct; fails units or relative density.
Success exit: converts g/cm³ ↔ kg/m³ and uses relative density to predict sink/float.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; P35/P36 probes surface the partial rule; run TA-5 and the P90/P91 gate.

### Protocol F — Low Pressure (S6)
Serves: S6 (anxiety)
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: one density computed calmly and one sink/float prediction made.
Failure exit: shorten session, bank one success, reschedule.
Key deltas: NO P28 anywhere (V-10 / GR-5); replace any conflict step with P30 bridge directly; use whole-number data only (10 cm³, 27 g); P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7 (overconfident + HEAVY-IS-DENSE in DB-2)
CPA entry: P
Entry condition: DB-3 confidence 4–5 with a wrong DB-2.
Success exit: student revises "heavy means dense" after the contradiction.
Failure exit: Misconception Engine[MC-HEAVY-IS-DENSE].
Key deltas: open with P41 (the floating log vs the sinking nail), let the mismatch sit (P55, wait), then P17 contrast.

## 6. Misconception Engine

### MC-HEAVY-IS-DENSE: "A heavier object is a denser object"
trigger_signal: student ranks density by total mass or weight — "the iron block and the wood block are both 1 kg so they are equally dense", "the log is heavier so it is denser than the pebble".
conflict_evidence [P28]: "A 2 kg log floats. A 5 g iron nail sinks. If heavier meant denser, the log should sink and the nail should float. What else is different between them?"
bridge_text [P30]: "Density is not how much mass an object has in total — it is how much mass is packed into each cubic centimetre. The log has lots of mass spread through a huge volume; the nail has a little mass packed into a tiny volume."
replacement_text [P31]: "To compare density, compare mass PER unit volume: rho = m/V. Total mass alone tells you nothing about density."
discrimination_pairs [P33]: ["1 kg of wood (big block) vs 1 kg of iron (small block): same mass, iron far denser", "a large aluminium beam vs a small aluminium spoon: very different masses, same density"]
s6_path: skip P28; use two equal-size cubes on a balance and go directly to the bridge text as a shared observation.

### MC-SIZE-CHANGES-DENSITY: "Cutting an object changes its density"
trigger_signal: student says half a block has half the density, or that a bigger piece of the same material is denser.
conflict_evidence [P28]: "Cut a 200 cm³, 540 g aluminium block in half. Each half is 100 cm³ and 270 g. Work out the density of one half."
bridge_text [P30]: "Cutting halves the mass AND halves the volume, so mass divided by volume is unchanged: 270/100 = 540/200 = 2.7 g/cm³."
replacement_text [P31]: "Density is a property of the material. Any piece of pure aluminium, any size, has density 2.7 g/cm³."
discrimination_pairs [P33]: ["half a block of aluminium (same density) vs a block of a different metal (different density)", "a cut cork (same density) vs a cork with a nail pushed in (average density changed)"]
s6_path: skip P28; present the two halves side by side and compute both densities together.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Cutting a cork in half — does its density change?" | CORRECT = no; mass and volume both halve |
| P74 (classify) | "Relative density 0.6 — sinks or floats in water?" | CORRECT = floats (less than 1) |
| P75 (boundary) | "Relative density exactly 1.0 in water?" | CORRECT = neither rises nor sinks; stays where placed (fully submerged) |
| P76 (transfer) | "Gold is 19.3 g/cm³. Mass of a 0.5 cm³ ring?" | CORRECT = 9.65 g (m = rho V) |
| P77 (generate) | "Give a mass and volume for an object that floats in water." | CORRECT = m/V < 1 g/cm³ |
| P78 (explain) | "What is the difference between a heavy object and a dense one?" | CORRECT = total mass vs mass per unit volume |
| P79 (predict) | "50 cm³, 150 g stone — float or sink?" | CORRECT = sinks (3 g/cm³ > 1 g/cm³) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Give a mass and volume for an object that would just float in water, and say why." → expected: CORRECT
P76: "A gold ring has volume 0.5 cm³; gold is 19.3 g/cm³. What is its mass?" → expected: CORRECT
P75: "A block of relative density 1.0 is placed in water. What happens?" → expected: CORRECT
P74: "Cutting a cork in half: does its density double, halve or stay the same?" → expected: CORRECT
P78: "In your own words, what is the difference between a heavy object and a dense one?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "A 20 cm³ block has mass 54 g. Find its density and say whether it floats in water."
Interval 2 (3 days): "Convert 2.7 g/cm³ to kg/m³."
Interval 3 (7 days): "Ice is 0.92 g/cm³. Why does an ice cube float, and roughly what fraction of it is under water?"
Interval 4 (21 days): "A 500 g object has relative density 2.5. What is its volume?"
Interval 5 (60 days): "Why does a steel ship float when a steel bolt sinks?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2, TA-4) ✓ · V-9 Schema Repair entered only via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

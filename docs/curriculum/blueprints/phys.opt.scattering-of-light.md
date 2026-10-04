# Teaching Blueprint: phys.opt.scattering-of-light

## 0. Concept Profile
concept_id: phys.opt.scattering-of-light
name: Scattering of Light: Blue Sky, Red Sunset, Tyndall Effect
domain: Optics (Physics)
difficulty: developing (2)
bloom: understand
prerequisites: [phys.opt.nature-of-light]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (a torch beam through clear water, then milky water, before the 1/λ⁴ rule; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains scattering as light being redirected in all directions by particles, and states that particles much smaller than the wavelength (air molecules) scatter short wavelengths far more strongly — intensity ∝ 1/λ⁴ (Rayleigh) — so blue light (about 450 nm) is scattered about (700/450)⁴ ≈ 6 times more than red (about 700 nm).
2. Uses this to explain the blue sky, the reddish Sun at sunrise and sunset (sunlight crosses far more air, so most blue is scattered OUT of the direct beam and red remains), the black sky seen from the Moon (no atmosphere), and the use of red for danger signals (least scattered, seen farthest).
3. Explains why clouds and milk look white (droplets larger than the wavelength scatter all colours about equally) and the Tyndall effect (a beam becomes visible in a colloid or dusty air because the particles scatter light toward the observer).

A student who says "the sky is blue because it reflects the sea", or "the setting Sun gives out more red light", has **NOT** achieved mastery — both replace scattering, the mechanism, with a story that cannot explain the other observations.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No scattering idea | "The sky is just blue" | Protocol A (Concrete) |
| S1 | Name without mechanism | Says "Rayleigh scattering" but cannot explain sunsets | Protocol B (Counterexample-first) |
| S2-SKY-REFLECTS-SEA | Reflection story | "The sky is blue because of the ocean" | Misconception Engine → then Protocol C |
| S2-SUNSET-ADDS-RED | Source story | "The Sun emits more red in the evening" | Misconception Engine → then Protocol C |
| S3 | Partial — sky fine, clouds or Tyndall not | Explains blue sky, not white clouds | Protocol C (Guided Questioning) |
| S6 | Anxiety on the λ⁴ ratio | Avoids the calculation | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Why do you think the sky is blue on a clear day?"
  No idea → S0. Enter Protocol A (Concrete).
  Any answer → DB-2.

DB-2 (representation / misconception test):
"Why is the Sun reddish at sunset but yellow-white at noon?"
  "At sunset its light crosses much more air, so more of the blue is scattered out of the beam before it reaches us" → S3. Enter Protocol C.
  "Because of scattering" (no detail) → S1. Enter Protocol B.
  "The Sun gives off more red light in the evening" → SIGNAL:MISCONCEPTION:MC-SUNSET-ADDS-RED. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (sky check — overlays):
"Is the sky blue above a desert, far from any sea?"
  "Yes" → no flag.
  "No / less — the blue comes from the ocean" → add SIGNAL:MISCONCEPTION:MC-SKY-REFLECTS-SEA (repair at TA-3).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.opt.nature-of-light`):
"White light is a mixture. What property tells red and blue light apart?"
  Cannot name wavelength (or frequency) → flag PREREQ-GAP-WAVE-MODEL.
  In-session minimum repair: one P06 (a prism spectrum with approximate wavelengths, red ~700 nm, blue ~450 nm) + one P34 ("which has the shorter wavelength?") then resume. If the wave model of light is absent, schedule a `phys.opt.nature-of-light` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no scattering idea.
Success exit: explains blue sky, red sunset, white clouds and the Tyndall effect from one mechanism (P91 all 5 probes CORRECT).
Failure exit: on SUNSET-ADDS-RED → Misconception Engine, resume at TA-4. On ratio anxiety → Protocol F.
Duration: ~50–60 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Making a Beam Visible]
P01
→ P04[content: "You only see a beam of light from the side if something sends some of it toward you."]
→ P06[content: a torch beam through a tank of clear water (invisible from the side), then with a few drops of milk added (the beam glows bluish from the side and the light coming out the end looks orange)]
→ P14[predict: "Why can you suddenly see the beam from the side?"] → P55
→ success_path[particles redirect some light sideways — scattering] → P49 → P05[curiosity: "Why bluish from the side and orange at the end?"]

[TA-2: Short Wavelengths Scatter More]
P02
→ P13[think-aloud: "Particles much smaller than the wavelength scatter short wavelengths far more: intensity ∝ 1/λ⁴. Blue at 450 nm vs red at 700 nm: (700/450)⁴ ≈ 6 — blue is scattered about six times more."]
→ P08[notation: "Rayleigh scattering: I ∝ 1/λ⁴ (for particles ≪ λ)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Light at 400 nm vs 800 nm — how many times more strongly is the 400 nm light scattered?"] → P55
→ success_path[2⁴ = 16] → P49

[TA-3: The Blue Sky]
P02
→ P13[think-aloud: "Air molecules scatter sunlight's blue far more than its red, in every direction. Look at any part of the sky away from the Sun and you see that scattered light — mostly blue."]
→ P41[diagnostic: "Is the sky blue over a desert, a thousand km from the sea?"] → P55
→ [if yes] → P49
→ [if "less blue — no sea to reflect"] → SIGNAL:MISCONCEPTION:MC-SKY-REFLECTS-SEA → misconception_repair_chain[MC-SKY-REFLECTS-SEA]
→ P34[question: "What colour is the sky seen from the Moon's surface, and why?"] → P55
→ success_path[black — no atmosphere to scatter] → P49

[TA-4: Red Sunsets]
P02
→ P07[modality: Sun overhead (short path through air) vs Sun at the horizon (path tens of times longer)]
→ P41[diagnostic: "At sunset, where has the blue gone?"] → P55
→ [if scattered out of the long direct path] → P49
→ [if "the Sun emits more red"] → SIGNAL:MISCONCEPTION:MC-SUNSET-ADDS-RED → misconception_repair_chain[MC-SUNSET-ADDS-RED]

[TA-5: White Clouds and the Tyndall Effect]
P02
→ P17[contrast: "Cloud droplets are much LARGER than the wavelength of light. Do they prefer blue?"] → P55
→ success_path[no — large particles scatter all colours about equally, so clouds look white] → P49
→ P34[question: "A beam of sunlight through a dusty room or a forest canopy shows as visible rays. Name the effect and explain it."] → P55
→ success_path[Tyndall effect — particles scatter light toward the eye] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Why are danger and stop signals red?"] → P55
    → P49 → P51[check: least scattered, so they carry farthest through fog and haze?]
    → P35[open: "Explain the blue sky and the red sunset with one idea."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Predict the colour of the sky on a planet with a thick atmosphere of very small molecules, seen at noon and at sunset."] → P55 → CORRECT
    → P76[transfer: "Why does distant smoke from a fire look bluish against a dark background but reddish against the sky?"] → P55 → CORRECT
    → P75[boundary: "Why is the sky not violet, though violet is scattered even more than blue?"] → P55 → CORRECT
    → P74[classify: "White clouds: Rayleigh scattering, or scattering by large droplets?"] → P55 → CORRECT
    → P78[explain: "Why does the Sun look red at sunset?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: names Rayleigh, cannot use it.
Success exit: explains the sunset from path length.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["If scattering makes the sky blue, why isn't the Sun itself blue? And why does it redden at sunset?"] → P54 (novel) → P55; then TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: blue sky correct; clouds or Tyndall not.
Success exit: all phenomena from one mechanism.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4 or TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: blue sky and red sunset explained calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); "short waves are scattered much more" stated in words before the 1/λ⁴ ratio; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident source or reflection story.
Success exit: revises after the counter-observation.
Failure exit: Misconception Engine.
Key deltas: open with "the sky over the Sahara is just as blue" or "the Sun's light measured from space is the same colour at every hour"; let it sit (P55).

## 6. Misconception Engine

### MC-SKY-REFLECTS-SEA: "The sky is blue because it reflects the sea"
trigger_signal: student attributes the sky's colour to reflection from oceans or water.
conflict_evidence [P28]: "The sky over the Sahara desert, more than a thousand kilometres from any sea, is just as deep a blue. Where would that blue come from?"
bridge_text [P30]: "From the air itself. Air molecules scatter sunlight in every direction, and they scatter short (blue) wavelengths about six times more strongly than red. The light reaching you from the sky away from the Sun is that scattered light — mostly blue. In fact it is largely the other way round: the sea looks blue partly because it reflects the sky."
replacement_text [P31]: "Blue sky = Rayleigh scattering by air molecules (∝ 1/λ⁴). No atmosphere, no blue: the Moon's sky is black."
discrimination_pairs [P33]: ["blue sky over a desert (scattering) vs no blue sky on the Moon (no air)", "sea reflecting the sky (reflection) vs sky scattering sunlight (scattering)"]
s6_path: skip P28; repeat the milky-water tank — a blue glow with no sea anywhere.

### MC-SUNSET-ADDS-RED: "At sunset the Sun gives out more red light"
trigger_signal: student explains red sunsets by a change in the Sun, or by the air "adding" red.
conflict_evidence [P28]: "Satellites above the atmosphere measure the Sun's colour all day long. It doesn't change at sunset. So what is different about the light that reaches you then?"
bridge_text [P30]: "Its path. At sunset sunlight crosses tens of times more air than at noon. Along that long path most of the blue is scattered sideways OUT of the direct beam, so what remains to reach your eye is mostly red and orange. Nothing is added — blue is removed."
replacement_text [P31]: "Red sunset = the direct beam after a long path, with its blue scattered away. Blue sky and red sunset are the same scattering seen from two directions: scattered light (blue) and transmitted light (red)."
discrimination_pairs [P33]: ["light looked at sideways in the milky tank (blue, scattered) vs light coming out the end (orange, transmitted)", "Sun overhead (short path, white-yellow) vs Sun at the horizon (long path, red)"]
s6_path: skip P28; look at the end of the milky-water tank — the beam comes out orange although the torch is white.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "White clouds: Rayleigh or large droplets?" | CORRECT = large droplets scatter all colours equally |
| P74 (classify) | "400 nm vs 800 nm — scattering ratio?" | CORRECT = 16 |
| P75 (boundary) | "Why not a violet sky?" | CORRECT = less violet in sunlight, some absorbed high up, eyes less sensitive to violet |
| P76 (transfer) | "Smoke bluish against dark, reddish against bright sky" | CORRECT = scattered light (blue) vs transmitted light (red) |
| P77 (generate) | "Planet with very small molecules — noon and sunset" | CORRECT = blue-ish sky, reddened sunset (same mechanism) |
| P78 (explain) | "Red Sun at sunset" | CORRECT = long path, blue scattered out of the beam |
| P79 (predict) | "Why red danger lights?" | CORRECT = least scattered, carry farthest |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Predict the colour of the sky on a planet with a thick atmosphere of very small molecules, seen at noon and at sunset." → expected: CORRECT
P76: "Why does distant smoke from a fire look bluish against a dark background but reddish against the sky?" → expected: CORRECT
P75: "Why is the sky not violet, though violet is scattered even more than blue?" → expected: CORRECT
P74: "White clouds: Rayleigh scattering, or scattering by large droplets?" → expected: CORRECT
P78: "Why does the Sun look red at sunset?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Why is the sky blue?"
Interval 2 (3 days): "Blue (450 nm) vs red (700 nm): how many times more scattered?"
Interval 3 (7 days): "Why is the sky black on the Moon?"
Interval 4 (21 days): "What is the Tyndall effect? Give an example."
Interval 5 (60 days): "Why do clouds look white but rain clouds look grey?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

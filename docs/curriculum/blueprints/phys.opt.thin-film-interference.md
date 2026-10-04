# Teaching Blueprint: phys.opt.thin-film-interference

## 0. Concept Profile
concept_id: phys.opt.thin-film-interference
name: Thin-film Interference
domain: Optics (Physics)
difficulty: advanced (4)
bloom: apply
prerequisites: [phys.opt.youngs-experiment, phys.opt.refraction]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a soap film in a wire loop changing colour, then going black at the top, before any condition; difficulty 4)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains thin-film colours as interference between light reflected from the top and bottom surfaces of a film; at near-normal incidence the extra path of the second ray is 2nt, where n is the film's refractive index and t its thickness.
2. Includes the half-wavelength phase change on reflection from a medium of HIGHER refractive index: a soap film in air (one such reflection) reflects strongly when 2nt = (m + ½)λ and is dark when 2nt = mλ — so a film much thinner than a wavelength looks black, which is why a soap film goes black at the top just before it bursts.
3. Designs an anti-reflection coating: a layer of index between air and glass, with BOTH reflections phase-shifted, cancels reflection when 2nt = λ/2, i.e. t = λ/(4n) — magnesium fluoride (n = 1.38) for 550 nm light needs t ≈ 100 nm.

A student who forgets the phase change on reflection, uses 2t instead of 2nt, or says the colours come from dispersion like a prism, has **NOT** achieved mastery — those errors flip bright and dark and make coating design impossible.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Interference known only for two slits | Cannot say where the two interfering beams come from | Protocol A (Concrete) |
| S1 | Formula recited | Writes 2nt = mλ for every film | Protocol B (Counterexample-first) |
| S2-NO-PHASE-SHIFT | Reflection phase ignored | Predicts a very thin soap film looks bright | Misconception Engine → then Protocol C |
| S2-COLOURS-BY-DISPERSION | Colours attributed to refraction | "The film splits white light like a prism" | Misconception Engine → then Protocol C |
| S3 | Partial — conditions right, index or coating wrong | Uses 2t; cannot design a coating | Protocol C (Guided Questioning) |
| S6 | Anxiety on phase reasoning | Avoids "half a wavelength" | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Where have you seen rainbow colours on a soap bubble or an oil film on a wet road?"
  Never thought about it → S0. Enter Protocol A (Concrete).
  Has → DB-2.

DB-2 (representation / misconception test):
"A soap film is drained until it is far thinner than a wavelength of light. Does it look bright or dark in reflected light? Why?"
  "Dark — the path difference is almost zero, but one reflection has a half-wave phase change, so the two reflections cancel" → S3. Enter Protocol C.
  "Dark" (no reason) → S1. Enter Protocol B.
  "Bright — zero path difference means constructive interference" → SIGNAL:MISCONCEPTION:MC-NO-PHASE-SHIFT. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (cause check — overlays):
"What produces the colours of a soap film?"
  "Interference: different wavelengths are reinforced at different thicknesses" → no flag.
  "Refraction/dispersion, like a prism" → add SIGNAL:MISCONCEPTION:MC-COLOURS-BY-DISPERSION (repair at TA-2).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.opt.youngs-experiment` and `phys.opt.refraction`):
"Two coherent waves with a path difference of λ/2 — bright or dark? And what is the wavelength of 600 nm light inside water of refractive index 1.33?"
  Cannot say "dark" and "λ/n ≈ 451 nm" → flag PREREQ-GAP-INTERFERENCE.
  In-session minimum repair: one P07 (two waves in and out of step) + one P34 ("light slows in water — wavelength shorter or longer?") then resume. If interference or refractive index is absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: no thin-film picture.
Success exit: explains the colours, applies the conditions with the phase change and 2nt, and designs a coating (P91 all 5 probes CORRECT).
Failure exit: on NO-PHASE-SHIFT → Misconception Engine, resume at TA-3. On phase anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Two Reflections]
P01
→ P04[content: "A soap film is two mirrors very close together. The colours come from the light that bounces off both."]
→ P07[modality: a ray hitting a thin film; part reflects from the top surface, part refracts in, reflects from the bottom, and comes out parallel to the first]
→ P14[predict: "Which reflected ray has travelled further, and by roughly how much?"] → P55
→ success_path[the one from the bottom, by about twice the thickness] → P49 → P05[curiosity: "But inside the film light has a shorter wavelength. Does that matter?"]

[TA-2: Path Difference 2nt]
P02
→ P13[think-aloud: "Inside the film, light's wavelength is λ/n. So the extra 2t inside the film is worth 2t ÷ (λ/n) = 2nt/λ wavelengths — the optical path difference is 2nt. Whether a colour is reinforced depends on t, so different thicknesses show different colours."]
→ P34[question: "Why does the colour change across the film, and why not by refraction like a prism?"] → P55
→ success_path[different t → different wavelengths reinforced; interference, not dispersion] → P49
→ failure_path → SIGNAL:MISCONCEPTION:MC-COLOURS-BY-DISPERSION → misconception_repair_chain[MC-COLOURS-BY-DISPERSION]

[TA-3: The Half-Wave Phase Change]
P02
→ P41[diagnostic: "The film drains until it is far thinner than a wavelength. Bright or dark?"] → P55
→ [if dark, with the phase change] → P49
→ [if bright] → SIGNAL:MISCONCEPTION:MC-NO-PHASE-SHIFT → misconception_repair_chain[MC-NO-PHASE-SHIFT]
→ P13[think-aloud: "Reflection off a denser medium flips the wave — a half-wavelength phase change. The top reflection (air → soap) flips; the bottom one (soap → air) does not. So for a soap film: bright when 2nt = (m + ½)λ, dark when 2nt = mλ."]
→ P08[notation: "one phase flip: bright 2nt = (m + ½)λ, dark 2nt = mλ ; two or zero flips: bright 2nt = mλ, dark 2nt = (m + ½)λ"]
// GR-3 satisfied: P07 and P13 preceded P08 (V-8 PASS)

[TA-4: Thinnest Bright Film]
P02
→ P34[question: "Soap (n = 1.33) in air, λ = 600 nm. Thinnest film that reflects this colour strongly?"] → P55
→ success_path[2nt = λ/2 → t = 600/(4 × 1.33) ≈ 113 nm] → P49

[TA-5: Anti-Reflection Coatings]
P02
→ P17[contrast: "A MgF₂ layer (n = 1.38) on glass (n = 1.5). How many reflections now have a phase flip?"] → P55
→ success_path[both — air→MgF₂ and MgF₂→glass] → P49
→ P34[question: "Thickness that cancels reflected 550 nm light?"] → P55
→ success_path[2nt = λ/2 → t = λ/(4n) ≈ 100 nm] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A camera lens coated for 550 nm looks faintly purple in reflection. Why?"] → P55
    → P49 → P51[check: green cancelled; red and blue ends partly reflected]
    → P35[open: "Explain why a soap film goes black just before it bursts."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a coating (choose n and t) that cancels reflected 500 nm light on glass of n = 1.5."] → P55 → CORRECT
    → P76[transfer: "An oil film (n = 1.45) floats on water (n = 1.33). How many phase flips, and which condition gives bright reflection?"] → P55 → CORRECT
    → P75[boundary: "A film exactly half a wavelength thick in optical path (2nt = λ) with one phase flip. Bright or dark?"] → P55 → CORRECT
    → P74[classify: "Soap film colours: interference or dispersion?"] → P55 → CORRECT
    → P78[explain: "Why must the path difference be 2nt rather than 2t?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: one formula for all films.
Success exit: picks the right condition by counting phase flips.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Your formula says a film of zero thickness reflects brightly. Why does the top of a draining soap film look black?"] → P54 (novel) → P55; then TA-3.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: conditions right; index or coating wrong.
Success exit: 2nt used and a coating designed.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4 or TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: the two reflections and the black-film reason explained calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); a rope pulse reflecting from a fixed end (flipped) before any optics; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "zero thickness → bright".
Success exit: revises after the black-film observation.
Failure exit: Misconception Engine.
Key deltas: open with a photo of a draining soap film, black at the top; let the mismatch sit (P55).

## 6. Misconception Engine

### MC-NO-PHASE-SHIFT: "Reflection never changes the phase of light"
trigger_signal: student applies 2nt = mλ for bright reflection in a soap film, or predicts that a vanishingly thin film is bright.
conflict_evidence [P28]: "A soap film drains and gets thinner at the top. Just before it bursts, the top looks black. If zero path difference meant bright, it would be the brightest part. Why is it black?"
bridge_text [P30]: "Because the two reflections are out of step even with no path difference: light reflecting off a denser medium (air → soap) is flipped by half a wavelength, while the reflection inside (soap → air) is not. With nothing else to separate them, they cancel."
replacement_text [P31]: "Count the phase flips. One flip (soap film in air): bright 2nt = (m + ½)λ, dark 2nt = mλ. Zero or two flips (coating on glass): bright 2nt = mλ, dark 2nt = (m + ½)λ."
discrimination_pairs [P33]: ["soap film in air: one flip — very thin film dark", "MgF₂ on glass: two flips — 2nt = λ/2 gives cancellation"]
s6_path: skip P28; a rope tied to a wall — a pulse sent along it comes back upside down; light does the same at a denser surface.

### MC-COLOURS-BY-DISPERSION: "Thin-film colours come from refraction splitting white light, as in a prism"
trigger_signal: student attributes soap-bubble or oil-film colours to dispersion.
conflict_evidence [P28]: "A prism needs thick glass and a large angle to spread colours. A soap film is less than a micrometre thick and the colours change with its THICKNESS, in bands. What would a prism's colours do if you made the prism thinner?"
bridge_text [P30]: "They would fade, not change colour. Thin-film colours come from interference: at each thickness, some wavelengths satisfy the bright condition and others the dark one, so the reflected light is missing some colours and rich in others."
replacement_text [P31]: "Thin-film colour = interference between the two reflections; it is set by the optical thickness 2nt and the phase flips."
discrimination_pairs [P33]: ["prism: dispersion — colours from wavelength-dependent refraction", "soap film: interference — colours from thickness"]
s6_path: skip P28; tilt a soap film and watch the colour bands move as the thickness the light crosses changes.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Soap-film colours: interference or dispersion?" | CORRECT = interference |
| P74 (classify) | "Phase flips for soap in air; MgF₂ on glass?" | CORRECT = one; two |
| P75 (boundary) | "2nt = λ with one flip" | CORRECT = dark |
| P76 (transfer) | "Oil (1.45) on water (1.33)" | CORRECT = one flip (top only); bright 2nt = (m + ½)λ |
| P77 (generate) | "Coating for 500 nm on n = 1.5 glass" | CORRECT = n between 1 and 1.5 (ideally √1.5 ≈ 1.22), t = 500/(4n) |
| P78 (explain) | "Why 2nt?" | CORRECT = wavelength inside is λ/n |
| P79 (predict) | "Coated lens looks purple" | CORRECT = mid-spectrum cancelled, ends partly reflected |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a coating (choose n and t) that cancels reflected 500 nm light on glass of n = 1.5." → expected: CORRECT
P76: "An oil film (n = 1.45) floats on water (n = 1.33). How many phase flips, and which condition gives bright reflection?" → expected: CORRECT
P75: "A film with 2nt = λ and one phase flip. Bright or dark?" → expected: CORRECT
P74: "Soap film colours: interference or dispersion?" → expected: CORRECT
P78: "Why must the path difference be 2nt rather than 2t?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Why does a soap film go black at the top?"
Interval 2 (3 days): "Thinnest soap film (n = 1.33) reflecting 600 nm strongly?"
Interval 3 (7 days): "Anti-reflection coating thickness for MgF₂ at 550 nm?"
Interval 4 (21 days): "Oil on water: count the phase flips."
Interval 5 (60 days): "Why do peacock feathers and some beetles shimmer?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

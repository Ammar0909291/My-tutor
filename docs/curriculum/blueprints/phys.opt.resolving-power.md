# Teaching Blueprint: phys.opt.resolving-power

## 0. Concept Profile
concept_id: phys.opt.resolving-power
name: Resolving Power of Optical Instruments
domain: Optics (Physics)
difficulty: advanced (4)
bloom: apply
prerequisites: [phys.opt.diffraction, phys.opt.optical-instruments]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (two car headlights at increasing distance merging into one, before the Rayleigh criterion; difficulty 4)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains that a lens or mirror of aperture D turns each point of an object into a small diffraction pattern (an Airy disc), and that two points can be told apart only if their patterns do not overlap too much — Rayleigh's criterion: the smallest resolvable angle is θ_min ≈ 1.22 λ/D.
2. Computes it — a telescope of aperture 10 cm at 550 nm resolves θ ≈ 6.7 × 10⁻⁶ rad; the eye, with a 3 mm pupil, about 2.2 × 10⁻⁴ rad, so it can just separate two headlights about 1.5 m apart from roughly 7 km away.
3. Explains how resolution is improved — a larger aperture (big telescope mirrors), a shorter wavelength (blue light, electron microscopes), or a higher-index medium (oil-immersion microscopes) — and that extra magnification beyond this limit only enlarges the blur.

A student who thinks more magnification always reveals more detail, or that a smaller aperture gives a sharper image, has **NOT** achieved mastery — those ideas misread every telescope and microscope design choice.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Instruments seen as magnifiers only | Cannot say why a bigger telescope is better | Protocol A (Concrete) |
| S1 | Formula recited | Writes 1.22λ/D but cannot predict the effect of D or λ | Protocol B (Counterexample-first) |
| S2-MAGNIFICATION-IS-RESOLUTION | Detail from magnification | "Just magnify more to see finer detail" | Misconception Engine → then Protocol C |
| S2-SMALLER-APERTURE-SHARPER | Pinhole intuition | "A smaller opening makes a sharper image" | Misconception Engine → then Protocol C |
| S3 | Partial — telescopes fine, microscopes not | Cannot explain oil immersion or electron microscopes | Protocol C (Guided Questioning) |
| S6 | Anxiety on small angles | Avoids radians and powers of ten | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Why do astronomers build telescopes with mirrors many metres across?"
  "To magnify more" or no idea → S0. Enter Protocol A (Concrete).
  "To collect more light / see finer detail" → DB-2.

DB-2 (representation / misconception test):
"A microscope image looks blurry at 1000×. Will a stronger eyepiece giving 3000× reveal finer details?"
  "No — the detail is limited by diffraction at the objective; more magnification just enlarges the blur" → S3. Enter Protocol C.
  "No" (no reason) → S1. Enter Protocol B.
  "Yes — more magnification shows more detail" → SIGNAL:MISCONCEPTION:MC-MAGNIFICATION-IS-RESOLUTION. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (aperture check — overlays):
"If a telescope's aperture were made smaller, would two close stars be easier or harder to separate?"
  "Harder — a smaller aperture spreads each star into a bigger diffraction disc" → no flag.
  "Easier — a smaller hole gives a sharper image" → add SIGNAL:MISCONCEPTION:MC-SMALLER-APERTURE-SHARPER (repair at TA-3).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.opt.diffraction` and `phys.opt.optical-instruments`):
"How does the spread of light through a slit change if the slit is made narrower? And what does a telescope's objective do?"
  Cannot say "it spreads more" and "collects light and forms an image" → flag PREREQ-GAP-DIFFRACTION-INSTRUMENTS.
  In-session minimum repair: one P06 (a laser through slits of two widths) + one P34 ("narrower slit: wider or narrower central spot?") then resume. If either is absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: instruments seen as magnifiers.
Success exit: applies Rayleigh's criterion, explains the role of D and λ, and separates magnification from resolution (P91 all 5 probes CORRECT).
Failure exit: on MAGNIFICATION-IS-RESOLUTION → Misconception Engine, resume at TA-4. On small-angle anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Headlights in the Distance]
P01
→ P04[content: "Far enough away, two headlights look like one. Every eye and every telescope has a limit like that — set by diffraction."]
→ P06[content: photos of two headlights at 100 m, 2 km and 10 km: two, two just touching, one]
→ P14[predict: "Why do they merge — is the eye not magnifying enough, or something else?"] → P55
→ success_path → P49 → P05[curiosity: "If each light were a perfect point, would they ever merge?"]

[TA-2: Every Point Becomes a Disc]
P02
→ P13[think-aloud: "Light through a circular opening of diameter D spreads into a bright central disc with faint rings — the Airy pattern. Its angular radius is about 1.22 λ/D. Even a perfect lens turns a point into this little disc."]
→ P08[notation: "Rayleigh criterion: θ_min ≈ 1.22 λ / D (radians)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Eye: D = 3 mm, λ = 550 nm. θ_min?"] → P55
→ success_path[≈ 2.2 × 10⁻⁴ rad] → P49
→ failure_path → P50 → P51[diagnose: units (mm, nm)] → P52[narrow: "Write both in metres first."] → re-elicit P34 → P55

[TA-3: Bigger Aperture, Finer Detail]
P02
→ P41[diagnostic: "Shrink a telescope's aperture. Two close stars: easier or harder to separate?"] → P55
→ [if harder] → P49
→ [if easier] → SIGNAL:MISCONCEPTION:MC-SMALLER-APERTURE-SHARPER → misconception_repair_chain[MC-SMALLER-APERTURE-SHARPER]
→ P34[question: "Telescope, D = 10 cm, 550 nm. θ_min? How much better than the eye?"] → P55
→ success_path[≈ 6.7 × 10⁻⁶ rad, about 33 times better] → P49

[TA-4: Magnification Is Not Resolution]
P02
→ P41[diagnostic: "The microscope image is blurry at 1000×. Will 3000× show finer detail?"] → P55
→ [if no — empty magnification] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-MAGNIFICATION-IS-RESOLUTION → misconception_repair_chain[MC-MAGNIFICATION-IS-RESOLUTION]

[TA-5: Improving Microscopes]
P02
→ P34[question: "Name three ways to resolve finer detail in a microscope."] → P55
→ success_path[shorter λ (blue light, UV, electrons), oil immersion (higher index, larger effective aperture), wider-angle objective] → P49
→ P13[think-aloud: "An electron microscope uses electrons whose wavelength is thousands of times shorter than light's, so its diffraction limit is thousands of times finer."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Two headlights 1.5 m apart. Roughly how far away can your eye still tell them apart?"] → P55
    → P49 → P51[check: distance ≈ 1.5 / 2.2 × 10⁻⁴ ≈ 7 km]
    → P35[open: "Explain why a large telescope mirror reveals detail a small one cannot, however much you magnify."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a telescope that can just separate two stars 1 × 10⁻⁶ rad apart at 500 nm. What aperture?"] → P55 → CORRECT
    → P76[transfer: "Why can't an ordinary light microscope show a virus about 100 nm across?"] → P55 → CORRECT
    → P75[boundary: "Two points separated by exactly θ_min. Just resolved, or not?"] → P55 → CORRECT
    → P74[classify: "Blue or red light for finer resolution?"] → P55 → CORRECT
    → P78[explain: "Why doesn't extra magnification beat the diffraction limit?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula without predictions.
Success exit: predicts the effects of D, λ and magnification.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Compute θ_min for a 3 mm pupil and a 10 cm telescope. Then: would magnifying the eye's image help?"] → P54 (novel) → P55; then TA-3 and TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: telescopes fine; microscopes not.
Success exit: microscope improvements explained.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: the D and λ trends stated, one θ_min computed calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); ratios first ("twice the diameter, half the angle"); P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "more magnification".
Success exit: revises after the empty-magnification contrast.
Failure exit: Misconception Engine.
Key deltas: open with a blurred image enlarged 3× — the blur grows with it; let it sit (P55).

## 6. Misconception Engine

### MC-MAGNIFICATION-IS-RESOLUTION: "More magnification always reveals more detail"
trigger_signal: student expects a stronger eyepiece or digital zoom to reveal detail beyond the instrument's resolution limit.
conflict_evidence [P28]: "Take a blurry photo and enlarge it three times. Do new details appear, or does the blur just get bigger?"
bridge_text [P30]: "The blur gets bigger. An instrument's detail is fixed by how finely its objective can separate points — each point is already a diffraction disc of size 1.22 λ/D. Magnifying afterwards enlarges the discs along with everything else."
replacement_text [P31]: "Resolution is set by aperture and wavelength (θ_min ≈ 1.22 λ/D). Magnification beyond what makes that detail visible to the eye is 'empty magnification'."
discrimination_pairs [P33]: ["bigger objective aperture: finer detail (more resolution)", "stronger eyepiece on the same objective: bigger image, same detail"]
s6_path: skip P28; zoom a phone photo until pixels show — the zoom adds size, not information.

### MC-SMALLER-APERTURE-SHARPER: "A smaller opening gives a sharper image"
trigger_signal: student expects reducing a telescope's or camera's aperture to improve the separation of fine detail, carrying over pinhole-camera intuition.
conflict_evidence [P28]: "Light through a narrower slit spreads MORE. If a telescope's aperture shrinks, does each star's diffraction disc get smaller or larger?"
bridge_text [P30]: "Larger — θ ≈ 1.22 λ/D grows as D shrinks. The discs of two close stars overlap more and merge. A pinhole sharpens a geometric image only until diffraction takes over; for resolving fine detail, a bigger aperture is better."
replacement_text [P31]: "Resolution improves with LARGER aperture and SHORTER wavelength."
discrimination_pairs [P33]: ["10 cm telescope: 6.7 × 10⁻⁶ rad", "3 mm pupil: 2.2 × 10⁻⁴ rad — about 33 times coarser"]
s6_path: skip P28; look at a distant lamp through a tiny pinhole in card — it blurs into a fuzzy disc.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Blue or red for finer resolution?" | CORRECT = blue (shorter λ) |
| P74 (classify) | "Bigger aperture: finer or coarser detail?" | CORRECT = finer |
| P75 (boundary) | "Separation exactly θ_min" | CORRECT = just resolved (Rayleigh limit) |
| P76 (transfer) | "Virus with a light microscope" | CORRECT = ~100 nm is below the ~λ/2 limit for visible light; needs electrons |
| P77 (generate) | "Aperture for 1 × 10⁻⁶ rad at 500 nm" | CORRECT = D ≈ 1.22 × 500e-9 / 1e-6 ≈ 0.61 m |
| P78 (explain) | "Why magnification doesn't help" | CORRECT = blur discs are enlarged too |
| P79 (predict) | "Headlights 1.5 m apart" | CORRECT = ~7 km |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a telescope that can just separate two stars 1 × 10⁻⁶ rad apart at 500 nm. What aperture?" → expected: CORRECT
P76: "Why can't an ordinary light microscope show a virus about 100 nm across?" → expected: CORRECT
P75: "Two points separated by exactly θ_min. Just resolved, or not?" → expected: CORRECT
P74: "Blue or red light for finer resolution?" → expected: CORRECT
P78: "Why doesn't extra magnification beat the diffraction limit?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "State Rayleigh's criterion."
Interval 2 (3 days): "θ_min for a 5 cm lens at 600 nm?"
Interval 3 (7 days): "Why are big telescopes built?"
Interval 4 (21 days): "How do electron microscopes beat light microscopes?"
Interval 5 (60 days): "Why does digital zoom on a phone camera not add detail?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

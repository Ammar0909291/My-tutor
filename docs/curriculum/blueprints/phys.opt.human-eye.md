# Teaching Blueprint: phys.opt.human-eye

## 0. Concept Profile
concept_id: phys.opt.human-eye
name: The Human Eye and Defects of Vision
domain: Optics (Physics)
difficulty: developing (2)
bloom: apply
prerequisites: [phys.opt.lens-power]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (an eye diagram with the image falling in front of, on, and behind the retina before any lens formula; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains how the eye forms a real, inverted image on the retina and focuses on near and far objects by accommodation — the ciliary muscles change the SHAPE (and so the focal length) of the eye lens; the lens does not move back and forth. A normal eye sees clearly from its near point (about 25 cm) to its far point (infinity).
2. Diagnoses myopia (far point closer than infinity; the image of a distant object forms in front of the retina) and corrects it with a concave (diverging) lens of focal length equal to minus the far-point distance — e.g. far point 2 m: f = −2 m, power −0.5 D.
3. Diagnoses hypermetropia (near point farther than 25 cm; the image of a near object forms behind the retina) and corrects it with a convex (converging) lens that makes an object at 25 cm appear at the near point — e.g. near point 100 cm: 1/f = 1/25 − 1/100 = 3/100 per cm, f ≈ 33 cm, power +3 D. Recognises presbyopia (lost accommodation with age) and bifocal lenses.

A student who corrects short sight with a converging lens, or who says the eye focuses by moving its lens like a camera, has **NOT** achieved mastery — the eye is the everyday test of whether lens power and sign conventions are understood.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Eye known only as a "camera" | Cannot place the image or name accommodation | Protocol A (Concrete) |
| S1 | Labels without the optics | Names myopia/hypermetropia but cannot choose the lens | Protocol B (Counterexample-first) |
| S2-WRONG-LENS-TYPE | Lens chosen by "strengthening" | "Short sight needs a stronger, magnifying lens" | Misconception Engine → then Protocol C |
| S2-FOCUS-BY-MOVING | Camera analogy taken literally | "The lens moves forward to focus on near things" | Misconception Engine → then Protocol C |
| S3 | Partial — lens type right, power wrong | Correct concave lens, wrong focal length | Protocol C (Guided Questioning) |
| S6 | Anxiety on sign conventions | Freezes at negative focal lengths | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Do you know anyone who wears glasses only for reading, or only for distance?"
  No idea what the glasses do → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A short-sighted person cannot see distant objects clearly. Which lens corrects this — converging or diverging — and why?"
  "Diverging — the eye focuses distant light in front of the retina, so the light must be spread out a little first" → S3. Enter Protocol C.
  "Diverging" (no reason) → S1. Enter Protocol B.
  "Converging — to make the eye stronger / magnify" → SIGNAL:MISCONCEPTION:MC-WRONG-LENS-TYPE. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (accommodation check — overlays):
"How does your eye switch focus from a far tree to a book in your hand?"
  "The ciliary muscles make the lens fatter (shorter focal length)" → no flag.
  "The lens moves forward" → add SIGNAL:MISCONCEPTION:MC-FOCUS-BY-MOVING (repair at TA-2).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.opt.lens-power`, and through it `phys.opt.lenses`):
"What is the power of a lens with focal length −50 cm, and what kind of lens is it?"
  Cannot give P = 1/f = −2 D and "diverging" → flag PREREQ-GAP-LENS-POWER.
  In-session minimum repair: one P07 (converging and diverging lens ray diagrams) + one P34 ("P = 1/f in metres — which sign for each?") then resume. If the lens formula and power are absent, schedule a `phys.opt.lens-power` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no optical model of the eye.
Success exit: explains accommodation, diagnoses both defects and computes both corrections (P91 all 5 probes CORRECT).
Failure exit: on WRONG-LENS-TYPE → Misconception Engine, resume at TA-4. On sign anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Eye as an Optical System]
P01
→ P04[content: "Your eye is a converging lens system that must land every image exactly on the retina."]
→ P07[modality: eye cross-section — cornea, iris/pupil, lens, ciliary muscles, retina; rays from a distant tree converging to a small inverted image on the retina]
→ P14[predict: "Is the image on your retina upright or upside down?"] → P55
→ success_path[inverted, real; the brain interprets it] → P49 → P05[curiosity: "The eye-to-retina distance is fixed. How can it focus on near AND far things?"]

[TA-2: Accommodation]
P02
→ P13[think-aloud: "A camera moves its lens. The eye cannot — instead the ciliary muscles squeeze the lens fatter for near objects (shorter focal length, more power) and let it relax thinner for far ones."]
→ P41[diagnostic: "So, focusing from a tree to a book: does the lens move, or change shape?"] → P55
→ [if change shape] → P49
→ [if move] → SIGNAL:MISCONCEPTION:MC-FOCUS-BY-MOVING → misconception_repair_chain[MC-FOCUS-BY-MOVING]
→ P34[question: "The normal near point is about 25 cm. What happens if you hold a page at 10 cm?"] → P55
→ success_path[blurred — beyond the lens's maximum power] → P49

[TA-3: Myopia]
P02
→ P07[modality: myopic eye — rays from a distant object meet in front of the retina; far point at 2 m]
→ P13[think-aloud: "The eye is too powerful for distant light. A diverging lens spreads the rays first, so that a distant object seems to be at the far point, 2 m away. That needs f = −2 m."]
→ P08[notation: "myopia: f = −(far-point distance); P = 1/f = −0.5 D for a 2 m far point"]
// GR-3 satisfied: P07 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Far point 50 cm. Focal length and power of the correcting lens?"] → P55
→ success_path[f = −50 cm, P = −2 D] → P49

[TA-4: Hypermetropia]
P02
→ P07[modality: hypermetropic eye — rays from a near object would meet behind the retina; near point at 100 cm]
→ P41[diagnostic: "Which lens type corrects this, and why?"] → P55
→ [if converging — adds power so near light focuses sooner] → P49
→ [if diverging] → SIGNAL:MISCONCEPTION:MC-WRONG-LENS-TYPE → misconception_repair_chain[MC-WRONG-LENS-TYPE]
→ P13[think-aloud: "The lens must take an object at 25 cm and form a virtual image at the near point, 100 cm: 1/f = 1/v − 1/u with u = −25 cm, v = −100 cm: 1/f = −1/100 + 1/25 = 3/100, f ≈ 33 cm, P = +3 D."]
→ P34[question: "Near point 50 cm. Power of the correcting lens?"] → P55
→ success_path[1/f = 1/25 − 1/50 = 1/50 per cm → f = 50 cm, +2 D] → P49

[TA-5: Presbyopia and Bifocals]
P02
→ P17[contrast: "At 60, a person needs glasses for reading but not for distance. Which defect is this, and what lens?"] → P55
→ success_path[presbyopia — lens stiffens, accommodation lost; converging reading lens, or bifocals] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A prescription reads −1.5 D. Before thinking about formulas — short or long sight?"] → P55
    → P49 → P51[check: negative power ⇒ diverging ⇒ myopia?]
    → P35[open: "Explain why a diverging lens helps a short-sighted eye see far objects."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent a far point and write the prescription that corrects it."] → P55 → CORRECT
    → P76[transfer: "A person's near point is 75 cm. What power of reading glasses lets them read at 25 cm?"] → P55 → CORRECT
    → P75[boundary: "A myopic person removes their glasses to read a book. Why can they often read well without them?"] → P55 → CORRECT
    → P74[classify: "+2.5 D and −2.5 D: which corrects which defect?"] → P55 → CORRECT
    → P78[explain: "How does the eye focus on near objects without moving its lens?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: names defects, cannot choose lenses.
Success exit: correct lens type with reason for both defects.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["A myopic eye already brings distant light to a focus too early. What would a converging lens do to that focus?"] → P54 (novel) → P55; then TA-3.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: lens type right, power wrong (or one defect only).
Success exit: both powers computed.
Failure exit: escalate to Protocol A TA-3.
Key deltas: enter at TA-3 or TA-4 numerics; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: lens type chosen for both defects with ray sketches.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); ray diagrams before numbers; the myopia rule f = −far point before any lens formula; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident wrong lens type.
Success exit: revises after tracing rays through their chosen lens.
Failure exit: Misconception Engine.
Key deltas: open by tracing rays through a converging lens in front of a myopic eye — the focus moves further forward; let the mismatch sit (P55).

## 6. Misconception Engine

### MC-WRONG-LENS-TYPE: "Short sight needs a converging (magnifying) lens"
trigger_signal: student corrects myopia with a converging lens, or hypermetropia with a diverging lens, usually reasoning that glasses "make the eye stronger".
conflict_evidence [P28]: "In a short-sighted eye, light from a distant tree already meets in FRONT of the retina — the eye is too strong. If you add a converging lens, where does the meeting point go?"
bridge_text [P30]: "Even further forward — the image gets worse. A myopic eye has too much power for distant light, so the correction must REMOVE power: a diverging lens spreads the rays a little before they enter the eye. A long-sighted eye has too little power for near light, so it needs a converging lens to add power."
replacement_text [P31]: "Myopia (image in front of the retina): diverging lens, negative power, f = −far point. Hypermetropia (image behind the retina): converging lens, positive power."
discrimination_pairs [P33]: ["myopia, far point 2 m: −0.5 D vs hypermetropia, near point 100 cm: +3 D", "image in front of the retina (remove power) vs image behind it (add power)"]
s6_path: skip P28; draw both eyes with their focus points and ask, for each, "should the lens move the focus back or forward?"

### MC-FOCUS-BY-MOVING: "The eye focuses by moving its lens, like a camera"
trigger_signal: student says the eye lens moves forward or backward to focus.
conflict_evidence [P28]: "Your eyeball is about 2.5 cm long and the lens is held in place by fibres all round it. Where could it move to?"
bridge_text [P30]: "It doesn't move. The ciliary muscles change the lens's SHAPE: squeezed fatter it is more curved, with a shorter focal length and more power, for near objects; relaxed and thinner, it has a longer focal length for distant ones."
replacement_text [P31]: "Accommodation: the lens-to-retina distance is fixed; the focal length changes. Its range sets the near point (about 25 cm) and far point (infinity) of a normal eye."
discrimination_pairs [P33]: ["camera: fixed lens shape, lens moves", "eye: fixed lens position, lens shape changes"]
s6_path: skip P28; look from a far window to a finger held close and notice the brief strain — that is the ciliary muscles working.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "+2.5 D and −2.5 D — which defect each?" | CORRECT = +2.5 hypermetropia/presbyopia; −2.5 myopia |
| P74 (classify) | "Image of a distant object falls in front of the retina — defect?" | CORRECT = myopia |
| P75 (boundary) | "Myopic person reads without glasses — why?" | CORRECT = near objects lie within their (closer) range of clear vision |
| P76 (transfer) | "Near point 75 cm — reading glasses power?" | CORRECT = 1/25 − 1/75 = 2/75 per cm → f = 37.5 cm, ≈ +2.7 D |
| P77 (generate) | "Far point and prescription" | CORRECT = f = −far point, P = 1/f |
| P78 (explain) | "Focus without moving the lens" | CORRECT = ciliary muscles change the lens shape and focal length |
| P79 (predict) | "−1.5 D — short or long sight?" | CORRECT = short sight (diverging) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Invent a far point and write the prescription that corrects it." → expected: CORRECT
P76: "A person's near point is 75 cm. What power of reading glasses lets them read at 25 cm?" → expected: CORRECT
P75: "A myopic person removes their glasses to read a book. Why can they often read well without them?" → expected: CORRECT
P74: "+2.5 D and −2.5 D: which corrects which defect?" → expected: CORRECT
P78: "How does the eye focus on near objects without moving its lens?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Myopia: where does the image form, and which lens corrects it?"
Interval 2 (3 days): "Far point 1 m — power of the correcting lens?"
Interval 3 (7 days): "Near point 50 cm — power for reading at 25 cm?"
Interval 4 (21 days): "What is accommodation, and why does it fail with age?"
Interval 5 (60 days): "Why do bifocal glasses have two different lens zones?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3) ✓ · V-9 Schema Repair entered only via P41 gate (TA-2, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

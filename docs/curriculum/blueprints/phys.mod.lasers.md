# Teaching Blueprint: phys.mod.lasers

## 0. Concept Profile
concept_id: phys.mod.lasers
name: Lasers: Stimulated Emission and Population Inversion
domain: Modern Physics (Physics)
difficulty: advanced (4)
bloom: understand
prerequisites: [phys.mod.atomic-spectra]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a laser pointer's tiny spot on a far wall next to a torch's wide blur, before any energy level; difficulty 4)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Distinguishes the three photon–atom processes: absorption (a photon raises an atom to a higher level), spontaneous emission (an excited atom drops down by itself, emitting a photon in a random direction and phase) and stimulated emission (an incoming photon of exactly the right energy makes an excited atom emit a second photon identical to it — same energy, direction and phase — while the first photon carries on).
2. Explains why amplification needs a population inversion — more atoms in the upper level than the lower one — and why this never happens in thermal equilibrium (at room temperature the fraction of atoms 1.96 eV up is about e^(−1.96/0.0257) ≈ 10⁻³³); a pump (light or electric discharge) fills a long-lived metastable level faster than it empties, and mirrors at both ends make the light pass many times through the medium, one mirror letting a small fraction out as the beam.
3. Explains what makes laser light different — monochromatic (one wavelength, e.g. He–Ne at 632.8 nm, photon energy 1.96 eV), coherent (photons in step) and highly directional (divergence ~1 mrad, so the spot at 10 m is about 1 cm) — and computes photon rates: a 1 mW He–Ne laser emits about 3.2 × 10¹⁵ photons per second.

A student who thinks a laser is just very bright light focused by a lens, or that heating a material enough makes it lase, has **NOT** achieved mastery — those ideas miss the physics that makes lasers possible.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Lasers as magic beams | Cannot say how a laser differs from a torch | Protocol A (Concrete) |
| S1 | "Stimulated emission" recited | Cannot say why an inversion is needed | Protocol B (Counterexample-first) |
| S2-LASER-IS-JUST-BRIGHT-LIGHT | Intensity picture | "A laser is a very bright, focused torch" | Misconception Engine → then Protocol C |
| S2-INVERSION-NOT-NEEDED | Thermal picture | "Heat it up enough and most atoms are excited" | Misconception Engine → then Protocol C |
| S3 | Partial — processes fine | Cannot explain the metastable level or mirrors | Protocol C (Guided Questioning) |
| S6 | Anxiety on energy-level diagrams | Avoids eV and levels | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"How is a laser pointer's light different from a torch's?"
  "Brighter" or no idea → DB-2 to probe further.
  "One colour, in step, and in a narrow beam" → DB-2.

DB-2 (representation / misconception test):
"Could you make a laser by putting a very bright torch behind a strong lens?"
  "No — a laser's light is produced by stimulated emission, so the photons are identical and in step; a lens cannot make torch light coherent or monochromatic" → S3. Enter Protocol C.
  "No" (no reason) → S1. Enter Protocol B.
  "Yes — a laser is just very bright, focused light" → SIGNAL:MISCONCEPTION:MC-LASER-IS-JUST-BRIGHT-LIGHT. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (inversion check — overlays):
"If you heat a gas very hot, will most of its atoms be in the upper level so that it lases?"
  "No — in thermal equilibrium the upper level always holds fewer atoms" → no flag.
  "Yes" → add SIGNAL:MISCONCEPTION:MC-INVERSION-NOT-NEEDED (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mod.atomic-spectra`):
"An atom drops from a level 1.96 eV above the ground state. What wavelength does it emit?"
  Cannot say "E = hc/λ → about 633 nm" → flag PREREQ-GAP-SPECTRA.
  In-session minimum repair: one P06 (an energy-level diagram with an emission arrow) + one P34 ("3.0 eV drop: wavelength?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: lasers as magic beams.
Success exit: explains the three processes, the inversion and the beam's properties (P91 all 5 probes CORRECT).
Failure exit: on LASER-IS-JUST-BRIGHT-LIGHT → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Spot vs Blur]
P01
→ P04[content: "Shine a 1 mW laser pointer and a 1 W torch at a wall 10 m away. The torch is a thousand times more powerful, yet the laser spot looks far brighter."]
→ P06[content: the two beams side by side; a spectrum of each — broad for the torch, one sharp line for the laser]
→ P14[predict: "How can a weaker source make a brighter spot?"] → P55
→ success_path → P49 → P05[curiosity: "What makes laser light so different?"]

[TA-2: Three Processes]
P02
→ P13[think-aloud: "Absorption: a photon lifts an atom up. Spontaneous emission: an excited atom drops by itself, photon in a random direction. Stimulated emission: a photon of exactly the right energy passes an excited atom and triggers a second photon — identical in energy, direction and phase. Now there are two."]
→ P08[notation: "absorption · spontaneous emission · stimulated emission (photon in → 2 identical photons out)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "In stimulated emission, what happens to the incoming photon?"] → P55
→ success_path[it carries on, joined by an identical one] → P49

[TA-3: Not Just Bright Light]
P02
→ P41[diagnostic: "Bright torch + strong lens = laser?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-LASER-IS-JUST-BRIGHT-LIGHT → misconception_repair_chain[MC-LASER-IS-JUST-BRIGHT-LIGHT]

[TA-4: Population Inversion]
P02
→ P41[diagnostic: "Heat the gas enough and it lases?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-INVERSION-NOT-NEEDED → misconception_repair_chain[MC-INVERSION-NOT-NEEDED]
→ P13[think-aloud: "A photon meeting a ground-state atom is absorbed; meeting an excited atom, it stimulates emission. To amplify, excited atoms must outnumber lower ones. A pump fills a metastable level that lasts long enough to build up the inversion. Mirrors send the light back and forth; one lets a little out."]

[TA-5: Numbers]
P02
→ P34[question: "He–Ne at 632.8 nm: photon energy? Photons per second from 1 mW?"] → P55
→ success_path[1.96 eV (3.14 × 10⁻¹⁹ J); ≈ 3.2 × 10¹⁵ per second] → P49
→ failure_path → P50 → P51[diagnose: E = hc/λ] → P52[narrow: "hc ≈ 1240 eV·nm"] → re-elicit P34 → P55

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Why can't a two-level system ever reach a steady population inversion by optical pumping?"] → P55
    → P49 → P51[check: pumping light stimulates emission as fast as absorption once the levels equalise]
    → P35[open: "Explain why laser light is coherent."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design the essential parts of a laser and say what each does."] → P55 → CORRECT
    → P76[transfer: "Why does a laser beam stay narrow over long distances?"] → P55 → CORRECT
    → P75[boundary: "Equal numbers of atoms in upper and lower levels: amplification?"] → P55 → CORRECT
    → P74[classify: "Torch, LED, laser — which emit by stimulated emission?"] → P55 → CORRECT
    → P78[explain: "What does the metastable level do?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: term without mechanism.
Success exit: explains why inversion is needed.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["A photon passes a ground-state atom and an excited atom. What happens at each? Which must outnumber the other for the light to grow?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: processes fine; inversion and cavity not.
Success exit: pump, metastable level and mirrors explained.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: stimulated emission and the beam properties stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); the "photon copier" picture before levels; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "just bright light".
Success exit: revises after the 1 mW vs 1 W contrast.
Failure exit: Misconception Engine.
Key deltas: open with the two spectra — broad vs one line; let it sit (P55).

## 6. Misconception Engine

### MC-LASER-IS-JUST-BRIGHT-LIGHT: "A laser is just very bright light focused into a beam"
trigger_signal: student describes a laser as ordinary light made intense or focused by lenses, without stimulated emission or coherence.
conflict_evidence [P28]: "A 1 W torch with the best lens still spreads into a wide, multicoloured patch at 10 m, while a 1 mW laser makes a tiny, single-colour spot. If a laser were just bright light, how could a thousand times less power win?"
bridge_text [P30]: "Torch light comes from countless atoms emitting spontaneously — random directions, phases and colours — and no lens can line those up. In a laser, stimulated emission produces photons that are copies of each other: one wavelength, in step, travelling the same way. That coherence keeps the beam narrow and the colour pure."
replacement_text [P31]: "Laser light is monochromatic, coherent and directional because it is produced by stimulated emission, not because it is brighter."
discrimination_pairs [P33]: ["torch: spontaneous emission, broad spectrum, random phase, wide beam", "laser: stimulated emission, one line (632.8 nm), in phase, ~1 mrad beam"]
s6_path: skip P28; compare the two spots on a far wall.

### MC-INVERSION-NOT-NEEDED: "Heating a material enough will make it lase"
trigger_signal: student expects high temperature (thermal excitation) to put most atoms in the upper level, or omits the need for a population inversion.
conflict_evidence [P28]: "At any temperature, in thermal equilibrium, are there more atoms in a higher level or a lower one? At room temperature, what fraction sits 1.96 eV up?"
bridge_text [P30]: "Always more in the lower level — at room temperature the fraction 1.96 eV up is about 10⁻³³, and even very hot gases keep the upper level less full. A photon is then more likely to be absorbed than to stimulate emission, so the light dies away. Amplification needs a population inversion, made by pumping atoms into a long-lived metastable level faster than they leave — a deliberately non-equilibrium state."
replacement_text [P31]: "Lasing needs a population inversion (more atoms in the upper level), created by pumping into a metastable level; heating never produces one."
discrimination_pairs [P33]: ["thermal equilibrium: lower level always fuller — light absorbed", "pumped metastable level: upper fuller — light amplified"]
s6_path: skip P28; picture more "loaded" atoms than "empty" ones needed to copy photons faster than they are swallowed.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Torch, LED, laser" | CORRECT = only the laser relies on stimulated emission |
| P74 (classify) | "Incoming photon in stimulated emission" | CORRECT = continues, joined by an identical photon |
| P75 (boundary) | "Equal populations" | CORRECT = no net amplification |
| P76 (transfer) | "Narrow beam over distance" | CORRECT = coherent, photons all travelling the same way |
| P77 (generate) | "Essential parts" | CORRECT = gain medium, pump, mirrors (one partly transmitting) |
| P78 (explain) | "Metastable level" | CORRECT = holds atoms long enough to build the inversion |
| P79 (predict) | "Two-level system" | CORRECT = can't exceed equal populations by pumping |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design the essential parts of a laser and say what each does." → expected: CORRECT
P76: "Why does a laser beam stay narrow over long distances?" → expected: CORRECT
P75: "Equal numbers of atoms in upper and lower levels: amplification?" → expected: CORRECT
P74: "Torch, LED, laser — which emit by stimulated emission?" → expected: CORRECT
P78: "What does the metastable level do?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Three photon–atom processes?"
Interval 2 (3 days): "Photon energy of a 532 nm laser?"
Interval 3 (7 days): "Why is an inversion needed?"
Interval 4 (21 days): "Three properties of laser light?"
Interval 5 (60 days): "Why can't heating make a laser?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

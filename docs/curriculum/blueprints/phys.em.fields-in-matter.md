# Teaching Blueprint: phys.em.fields-in-matter

## 0. Concept Profile
concept_id: phys.em.fields-in-matter
name: Fields in Matter: D, H and Boundary Conditions
domain: Electricity & Magnetism (Physics)
difficulty: expert (5)
bloom: apply
prerequisites: [phys.em.dielectrics, phys.em.magnetic-materials, phys.em.amperes-law]
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a capacitor whose voltage drops when a glass slab slides in, and a coil whose field jumps when an iron rod slides in, before any symbol; difficulty 5)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains that a dielectric in a field becomes polarised — its molecules' charges shift slightly, leaving bound surface charge that opposes the applied field — described by the polarisation P (dipole moment per volume); the electric displacement D = ε₀E + P obeys Gauss's law with FREE charge only, ∮D·dA = Q_free, and in a linear dielectric D = ε_rε₀E. For a parallel-plate capacitor with free charge density 1.0 × 10⁻⁶ C/m² and ε_r = 4: D = 1.0 × 10⁻⁶ C/m², E = D/(ε_rε₀) ≈ 2.8 × 10⁴ V/m — a quarter of the 1.13 × 10⁵ V/m without the slab — and P = D − ε₀E = 7.5 × 10⁻⁷ C/m² of bound charge per area.
2. Explains the magnetic counterpart: magnetised matter carries bound currents described by the magnetisation M; the magnetising field H = B/μ₀ − M obeys Ampère's law with FREE current only, ∮H·dl = I_free, and in a linear material B = μ_rμ₀H. In a long solenoid with 1000 turns per metre carrying 2 A, H = nI = 2000 A/m whether or not there is a core; with an iron core of μ_r = 500, B = μ_rμ₀H ≈ 1.26 T instead of about 2.5 mT without it.
3. States and uses the boundary conditions at an interface with no free surface charge or current: the normal components of D and B are continuous, and the tangential components of E and H are continuous — so field lines bend at a boundary (like refraction) and the normal E jumps by the ratio of permittivities.

A student who thinks inserting a dielectric strengthens the electric field between fixed charges, or treats H and B as the same field with different letters, has **NOT** achieved mastery — those ideas break capacitor and electromagnet design.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Only vacuum fields known | Cannot say what a dielectric does inside | Protocol A (Concrete) |
| S1 | D = ε₀E + P recited | Cannot say why D depends only on free charge | Protocol B (Counterexample-first) |
| S2-DIELECTRIC-STRENGTHENS-E | "More stuff, more field" | "The glass slab makes the field stronger" | Misconception Engine → then Protocol C |
| S2-H-SAME-AS-B | Letters interchangeable | "H is just B in different units" | Misconception Engine → then Protocol C |
| S3 | Partial — D and H fine | Cannot apply boundary conditions | Protocol C (Guided Questioning) |
| S6 | Anxiety on vector fields | Avoids flux and circulation integrals | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"A charged, isolated capacitor has a glass slab slid between its plates. What happens to the voltage between the plates?"
  "It falls — the field inside is reduced" → DB-2.
  "It rises" or no idea → S0. Enter Protocol A (Concrete).

DB-2 (representation / misconception test):
"With the same free charge on the plates, is the electric field inside the glass bigger or smaller than it was in vacuum?"
  "Smaller, by ε_r — bound surface charges on the glass oppose it" → S3. Enter Protocol C.
  "Smaller" (no reason) → S1. Enter Protocol B.
  "Bigger — the glass adds its own charges" → SIGNAL:MISCONCEPTION:MC-DIELECTRIC-STRENGTHENS-E. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (H check — overlays):
"A solenoid's current is unchanged but an iron core is inserted. Which changes a lot: H or B?"
  "B — H = nI depends only on the free current" → no flag.
  "Both by the same factor — H and B are the same thing" → add SIGNAL:MISCONCEPTION:MC-H-SAME-AS-B (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.dielectrics`, `phys.em.magnetic-materials`, `phys.em.amperes-law`):
"What does a dielectric do to a capacitor's capacitance? What is μ_r? State Ampère's law."
  Cannot say "raises it by ε_r; relative permeability; ∮B·dl = μ₀I" → flag PREREQ-GAP-MATTER-FIELDS.
  In-session minimum repair: one P06 (molecules aligning in a dielectric) + one P34 ("ε_r = 3: new capacitance?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: only vacuum fields known.
Success exit: computes D, E, P and H, B, applies boundary conditions (P91 all 5 probes CORRECT).
Failure exit: on DIELECTRIC-STRENGTHENS-E → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~70–80 min (spans 2 sessions; session_cap 7 TAs).

[TA-1: Glass and Iron]
P01
→ P04[content: "Slide glass into a charged capacitor and its voltage drops. Slide iron into a coil and its field leaps. Matter responds to fields — and changes them."]
→ P06[content: a dielectric slab between plates with bound − and + charges on its faces; an iron core with aligned domains]
→ P14[predict: "Why might the glass reduce the field?"] → P55
→ success_path → P49 → P05[curiosity: "How do we keep track of fields when matter joins in?"]

[TA-2: Polarisation and D]
P02
→ P13[think-aloud: "The applied field pulls each molecule's charges slightly apart. Inside, the shifts cancel; at the surfaces, a layer of bound charge remains — negative next to the positive plate. That bound charge makes a field opposing the applied one. P is dipole moment per volume; its surface value is the bound charge per area."]
→ P13[think-aloud: "Define D = ε₀E + P. Then Gauss's law for D involves only the free charge we put on the plates: ∮D·dA = Q_free. For a linear dielectric, D = ε_rε₀E."]
→ P08[notation: "D = ε₀E + P = ε_rε₀E;  ∮D·dA = Q_free"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "σ_free = 1.0 × 10⁻⁶ C/m², ε_r = 4. D, E, P?"] → P55
→ success_path[D = 1.0 × 10⁻⁶ C/m²; E ≈ 2.8 × 10⁴ V/m; P = 7.5 × 10⁻⁷ C/m²] → P49
→ failure_path → P50 → P51[diagnose: D vs E] → P52[narrow: "D comes from free charge alone; then divide by ε_rε₀"] → re-elicit P34 → P55

[TA-3: Weaker, Not Stronger]
P02
→ P41[diagnostic: "Same free charge: field in the glass bigger or smaller than in vacuum?"] → P55
→ [if smaller] → P49
→ [if bigger] → SIGNAL:MISCONCEPTION:MC-DIELECTRIC-STRENGTHENS-E → misconception_repair_chain[MC-DIELECTRIC-STRENGTHENS-E]

[TA-4: Magnetisation and H]
P02
→ P13[think-aloud: "In iron, atomic magnetic moments line up and act like bound surface currents. M is magnetic moment per volume. Define H = B/μ₀ − M. Ampère's law for H involves only free current: ∮H·dl = I_free. In a linear material, B = μ_rμ₀H."]
→ P41[diagnostic: "Insert an iron core at fixed current: does H change?"] → P55
→ [if no — H = nI] → P49
→ [if yes, same as B] → SIGNAL:MISCONCEPTION:MC-H-SAME-AS-B → misconception_repair_chain[MC-H-SAME-AS-B]
→ P34[question: "n = 1000 m⁻¹, I = 2 A, μ_r = 500: H and B? Without the core?"] → P55
→ success_path[H = 2000 A/m both times; B ≈ 1.26 T vs 2.5 mT] → P49

[TA-5: Boundary Conditions]
P02
→ P13[think-aloud: "At a boundary with no free surface charge, a flat Gauss pillbox shows normal D is continuous; a thin Ampère loop shows tangential E is continuous. Likewise normal B and tangential H are continuous when there is no free surface current. So field lines bend at the boundary."]
→ P34[question: "E normal to a vacuum–glass (ε_r = 4) boundary is 1.0 × 10⁵ V/m in vacuum. Normal E inside the glass?"] → P55
→ success_path[D normal continuous → E_glass = 2.5 × 10⁴ V/m] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A field line hits a vacuum–glass boundary at an angle. Does it bend towards or away from the normal inside the glass?"] → P55
    → P49 → P51[check: away — tangential E same, normal E smaller, so the line tilts towards the surface]
    → P35[open: "Explain why D, not E, is fixed by the free charge on a capacitor's plates."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a capacitor that stores more charge at the same voltage, and explain using D and E."] → P55 → CORRECT
    → P76[transfer: "Why do transformers and electromagnets use iron cores?"] → P55 → CORRECT
    → P75[boundary: "Is normal E continuous across a vacuum–glass boundary?"] → P55 → CORRECT
    → P74[classify: "Which field obeys Ampère's law with free current only: B or H?"] → P55 → CORRECT
    → P78[explain: "Why does a dielectric reduce E for fixed free charge?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: definitions without meaning.
Success exit: explains why D and H see only free sources.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Bound charge on the glass changes E. Which combination of E and P would NOT change when the glass goes in?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: D and H fine; boundaries not.
Success exit: boundary conditions applied.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: "free sources set D and H; matter changes E and B" stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use the parallel-plate and solenoid formulas only, no integrals; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "glass strengthens the field".
Success exit: revises after the falling-voltmeter observation.
Failure exit: Misconception Engine.
Key deltas: open with an electrometer reading dropping as the slab slides in; let it sit (P55).

## 6. Misconception Engine

### MC-DIELECTRIC-STRENGTHENS-E: "Inserting a dielectric strengthens the electric field"
trigger_signal: student predicts that a dielectric slab between fixed free charges increases the electric field, reasoning that the material "adds charge".
conflict_evidence [P28]: "An isolated charged capacitor's voltage drops when glass slides in. V = Ed. What must have happened to E?"
bridge_text [P30]: "E fell. The glass polarises: next to the positive plate a layer of negative bound charge appears, next to the negative plate a positive one. Those bound charges produce a field opposing the plates' field, so the total E inside drops by the factor ε_r. The free charge — and so D — is unchanged."
replacement_text [P31]: "For fixed free charge, a dielectric reduces E by ε_r (D unchanged); for fixed voltage, it lets the plates hold ε_r times more charge."
discrimination_pairs [P33]: ["vacuum: σ_f = 10⁻⁶ C/m² gives E ≈ 1.13 × 10⁵ V/m", "glass, ε_r = 4: same σ_f gives E ≈ 2.8 × 10⁴ V/m"]
s6_path: skip P28; show the bound-charge diagram and the voltmeter reading.

### MC-H-SAME-AS-B: "H and B are the same field in different units"
trigger_signal: student treats H and B as interchangeable, expecting both to change by the same factor when a magnetic material is inserted.
conflict_evidence [P28]: "A solenoid with 2000 ampere-turns per metre gets an iron core; the current is unchanged. Ampère's law for H counts only free current. Has the free current changed? So has H? What about B?"
bridge_text [P30]: "The free current is unchanged, so H = nI = 2000 A/m stays the same. But the iron's aligned atomic moments add bound currents, so B = μ_rμ₀H jumps from about 2.5 mT to about 1.26 T. H tracks the free currents we control; B is the total field, including the material's response. They are different quantities: B = μ₀(H + M)."
replacement_text [P31]: "H is set by free currents (∮H·dl = I_free); B = μ₀(H + M) includes the material's magnetisation."
discrimination_pairs [P33]: ["air-core solenoid: H = 2000 A/m, B ≈ 2.5 mT", "iron core (μ_r = 500): H = 2000 A/m, B ≈ 1.26 T"]
s6_path: skip P28; compare the two numbers side by side.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Free current only: B or H?" | CORRECT = H |
| P74 (classify) | "Free charge only: E or D?" | CORRECT = D |
| P75 (boundary) | "Normal E across vacuum–glass" | CORRECT = not continuous (normal D is) |
| P76 (transfer) | "Iron cores" | CORRECT = large μ_r multiplies B for the same current |
| P77 (generate) | "More charge at same V" | CORRECT = high-ε_r dielectric; D = ε_rε₀V/d larger |
| P78 (explain) | "Dielectric reduces E" | CORRECT = bound surface charge opposes the free charge's field |
| P79 (predict) | "Field line bending" | CORRECT = away from the normal in the higher-ε_r medium |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a capacitor that stores more charge at the same voltage, and explain using D and E." → expected: CORRECT
P76: "Why do transformers and electromagnets use iron cores?" → expected: CORRECT
P75: "Is normal E continuous across a vacuum–glass boundary?" → expected: CORRECT
P74: "Which field obeys Ampère's law with free current only: B or H?" → expected: CORRECT
P78: "Why does a dielectric reduce E for fixed free charge?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Define D and H."
Interval 2 (3 days): "σ_f = 2 × 10⁻⁶ C/m², ε_r = 5: E?"
Interval 3 (7 days): "n = 500 m⁻¹, I = 3 A, μ_r = 800: H and B?"
Interval 4 (21 days): "Boundary conditions for D, E, B, H?"
Interval 5 (60 days): "Why does glass lower a capacitor's voltage?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

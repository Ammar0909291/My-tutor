# Teaching Blueprint: phys.em.conductors-electrostatics

## 0. Concept Profile
concept_id: phys.em.conductors-electrostatics
name: Conductors, Shielding and Van de Graaff
domain: Electricity & Magnetism (Physics)
difficulty: advanced (4)
bloom: apply
prerequisites: [phys.em.electric-potential]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a car struck by lightning with the passengers unharmed, before any field argument; difficulty 4)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains that in a conductor in electrostatic equilibrium the field inside the metal is zero — any field would push the free electrons until their rearrangement cancels it — so the whole conductor is at one potential and any excess charge sits on its outer surface.
2. States that the field just outside is perpendicular to the surface with magnitude E = σ/ε₀, and that charge crowds at sharp points, where the field is strongest — the basis of lightning conductors and corona discharge.
3. Applies these to shielding — a closed conducting shell keeps the field out of the space it encloses (a Faraday cage: a car in a thunderstorm, a lift losing phone signal) — and to the Van de Graaff generator, which keeps carrying charge into a hollow dome because charge delivered inside moves to the outer surface.

A student who thinks the field inside a charged metal is strong, or that charge spreads evenly over any shaped conductor, has **NOT** achieved mastery — those ideas misread shielding, lightning conductors and every electrostatic machine.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Conductors seen only in circuits | Has never thought about static charge on metal | Protocol A (Concrete) |
| S1 | Rules recited | Says "E = 0 inside" but cannot say why | Protocol B (Counterexample-first) |
| S2-FIELD-INSIDE-CONDUCTOR | Charge = field everywhere | "A charged metal sphere has a strong field inside it" | Misconception Engine → then Protocol C |
| S2-CHARGE-UNIFORM-ON-SURFACE | Symmetry overgeneralised | "Charge spreads evenly over any conductor" | Misconception Engine → then Protocol C |
| S3 | Partial — E = 0 fine, shapes not | Cannot explain lightning conductors | Protocol C (Guided Questioning) |
| S6 | Anxiety on field arguments | Avoids reasoning about where charges go | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Why are people inside a car usually safe when lightning strikes it?"
  "Rubber tyres" or no idea → S0. Enter Protocol A (Concrete).
  "The charge stays on the metal outside" → DB-2.

DB-2 (representation / misconception test):
"A hollow metal sphere is given a large positive charge. What is the electric field at a point inside the metal or inside the hollow?"
  "Zero — free electrons rearrange until the field inside is cancelled; the charge sits on the outside" → S3. Enter Protocol C.
  "Zero" (no reason) → S1. Enter Protocol B.
  "Strong — it is full of charge" → SIGNAL:MISCONCEPTION:MC-FIELD-INSIDE-CONDUCTOR. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (shape check — overlays):
"A pear-shaped metal object is charged. Is the charge spread evenly, or concentrated somewhere?"
  "Concentrated at the pointed end" → no flag.
  "Evenly over the surface" → add SIGNAL:MISCONCEPTION:MC-CHARGE-UNIFORM-ON-SURFACE (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.electric-potential`):
"Which way does a free positive charge move in an electric field, and what is the potential difference between two points with no field between them?"
  Cannot say "along the field" and "zero" → flag PREREQ-GAP-POTENTIAL.
  In-session minimum repair: one P06 (field lines and equipotentials around a point charge) + one P34 ("no field along a path — any potential change?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: no picture of static charge on conductors.
Success exit: explains E = 0 inside, surface charge, sharp points and shielding (P91 all 5 probes CORRECT).
Failure exit: on FIELD-INSIDE-CONDUCTOR → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Lightning and the Car]
P01
→ P04[content: "Lightning hits a car; the people inside are fine. It is not the tyres — it is the metal body."]
→ P06[content: a car in a lightning strike; a Van de Graaff dome with a person's hair standing up]
→ P14[predict: "Where on the car does the lightning's charge travel?"] → P55
→ success_path → P49 → P05[curiosity: "Why doesn't any of it come inside?"]

[TA-2: Electrons Rearrange Until the Field Is Gone]
P02
→ P13[think-aloud: "A metal has free electrons. If there were a field inside, they would move. They keep moving until their new arrangement cancels the field. In equilibrium, E inside the metal = 0, and so every point of the conductor is at the same potential."]
→ P08[notation: "Inside a conductor in equilibrium: E = 0; V = constant throughout"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "A charged metal sphere: what is the potential difference between its centre and its surface?"] → P55
→ success_path[zero — no field inside] → P49
→ failure_path → P50 → P51[diagnose: field–potential link] → P52[narrow: "No field along the path — does V change?"] → re-elicit P34 → P55

[TA-3: Where the Charge Goes]
P02
→ P41[diagnostic: "A hollow metal sphere is charged. Field inside the hollow?"] → P55
→ [if zero] → P49
→ [if strong] → SIGNAL:MISCONCEPTION:MC-FIELD-INSIDE-CONDUCTOR → misconception_repair_chain[MC-FIELD-INSIDE-CONDUCTOR]
→ P13[think-aloud: "Excess charges repel and spread as far apart as they can — to the outer surface. Just outside, the field is perpendicular to the surface with E = σ/ε₀ (σ = charge per unit area)."]
→ P34[question: "σ = 2.0 × 10⁻⁶ C/m². E just outside?"] → P55
→ success_path[≈ 2.3 × 10⁵ V/m] → P49

[TA-4: Sharp Points]
P02
→ P41[diagnostic: "Pear-shaped conductor: charge even, or concentrated?"] → P55
→ [if concentrated at the point] → P49
→ [if even] → SIGNAL:MISCONCEPTION:MC-CHARGE-UNIFORM-ON-SURFACE → misconception_repair_chain[MC-CHARGE-UNIFORM-ON-SURFACE]
→ P34[question: "Why is a lightning conductor pointed?"] → P55
→ success_path[charge crowds at the point; strong field ionises air; charge leaks away gradually or the strike is drawn safely to earth] → P49

[TA-5: Shielding and the Van de Graaff]
P02
→ P34[question: "Why does a phone lose signal in a metal lift? Why can a Van de Graaff keep adding charge to its dome?"] → P55
→ success_path[closed metal shell: field inside zero (Faraday cage); charge brought inside the dome moves to the outer surface, so the inside stays free to receive more] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A charged small sphere is touched to the INSIDE of a hollow conductor. What happens to its charge?"] → P55
    → P49 → P51[check: all of it moves to the outer surface of the hollow conductor]
    → P35[open: "Explain why the field inside a conductor in equilibrium must be zero."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a way to protect sensitive equipment from external electric fields."] → P55 → CORRECT
    → P76[transfer: "Why are people advised to stay inside a car during a thunderstorm?"] → P55 → CORRECT
    → P75[boundary: "Just inside vs just outside a charged conductor's surface: field?"] → P55 → CORRECT
    → P74[classify: "Sharp tip or flat face — where is the field stronger?"] → P55 → CORRECT
    → P78[explain: "Why does excess charge sit on the outer surface?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: rules without reasons.
Success exit: derives E = 0 from free electrons.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Suppose there WERE a field inside the metal. What would its free electrons do? When would they stop?"] → P54 (novel) → P55; then TA-3 and TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: E = 0 understood; shapes and shielding not.
Success exit: sharp points and shielding explained.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run TA-5 and the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: E = 0 inside and the car example explained calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); start from the car; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "strong field inside".
Success exit: revises after the free-electron argument.
Failure exit: Misconception Engine.
Key deltas: open with a radio placed inside a closed metal box — it goes silent; let it sit (P55).

## 6. Misconception Engine

### MC-FIELD-INSIDE-CONDUCTOR: "A charged conductor has a strong field inside it"
trigger_signal: student places a nonzero electric field inside the metal (or the enclosed hollow) of a charged conductor in electrostatic equilibrium.
conflict_evidence [P28]: "Suppose there were a field inside the metal. The metal is full of free electrons. What would they do — and could the situation be 'equilibrium' while they move?"
bridge_text [P30]: "They would drift until their rearrangement produced an opposing field. They stop only when the total field inside is zero. That is what equilibrium means for a conductor, so the excess charge ends up on the outer surface and the inside is field-free."
replacement_text [P31]: "In electrostatic equilibrium: E = 0 inside a conductor, the conductor is an equipotential, and excess charge lies on the outer surface."
discrimination_pairs [P33]: ["inside the metal or its enclosed hollow: E = 0", "just outside the surface: E = σ/ε₀, perpendicular to the surface"]
s6_path: skip P28; a radio or phone inside a closed metal tin loses its signal.

### MC-CHARGE-UNIFORM-ON-SURFACE: "Charge spreads evenly over any conductor"
trigger_signal: student assumes equal surface charge density everywhere on a non-spherical conductor, ignoring curvature.
conflict_evidence [P28]: "If charge were spread evenly over a pear-shaped conductor, would its surface still be at one potential? Why are lightning conductors made pointed?"
bridge_text [P30]: "Keeping the whole surface at one potential needs MORE charge per area where the surface curves sharply. So charge crowds at points, the field there is strongest, and air near a point can break down — the corona glow and the lightning conductor's action."
replacement_text [P31]: "Surface charge density is greatest where the curvature is greatest; only an isolated sphere has uniform σ."
discrimination_pairs [P33]: ["isolated sphere: uniform σ", "pear shape: σ largest at the pointed end"]
s6_path: skip P28; a Van de Graaff sparks most readily from sharp edges.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Sharp tip or flat face — stronger field?" | CORRECT = sharp tip |
| P74 (classify) | "Field inside a charged hollow metal sphere" | CORRECT = zero |
| P75 (boundary) | "Just inside vs just outside" | CORRECT = 0 inside; σ/ε₀ outside, perpendicular |
| P76 (transfer) | "Car in a thunderstorm" | CORRECT = Faraday cage; charge stays on the outer metal |
| P77 (generate) | "Shield equipment" | CORRECT = enclose it in a closed, earthed metal box or mesh |
| P78 (explain) | "Why charge sits outside" | CORRECT = charges repel to maximise separation; E = 0 inside forces it |
| P79 (predict) | "Charged sphere touched inside a hollow conductor" | CORRECT = all its charge moves to the outer surface |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a way to protect sensitive equipment from external electric fields." → expected: CORRECT
P76: "Why are people advised to stay inside a car during a thunderstorm?" → expected: CORRECT
P75: "Just inside vs just outside a charged conductor's surface: field?" → expected: CORRECT
P74: "Sharp tip or flat face — where is the field stronger?" → expected: CORRECT
P78: "Why does excess charge sit on the outer surface?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Field inside a charged conductor?"
Interval 2 (3 days): "E just outside for σ = 4 × 10⁻⁶ C/m²?"
Interval 3 (7 days): "Why are lightning conductors pointed?"
Interval 4 (21 days): "How does a Van de Graaff keep building charge?"
Interval 5 (60 days): "Why do lifts block phone signals?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

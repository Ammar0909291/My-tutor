# Teaching Blueprint: phys.mod.nucleus-size-and-force

## 0. Concept Profile
concept_id: phys.mod.nucleus-size-and-force
name: Nuclear Composition, Size, Density and Nuclear Force
domain: Modern Physics (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.mod.atomic-models]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a teaspoon of nuclear matter weighing as much as a mountain, before any formula; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Describes a nucleus by its atomic number Z (protons) and mass number A (protons + neutrons), with N = A − Z neutrons; isotopes share Z but differ in N — ³⁵Cl and ³⁷Cl both have 17 protons, with 18 and 20 neutrons.
2. Uses R = R₀ A^(1/3), R₀ ≈ 1.2 fm (1 fm = 10⁻¹⁵ m), to find nuclear sizes — about 4.6 fm for iron-56 and 7.4 fm for uranium-238 — and explains why the nuclear density is the same for every nucleus: volume ∝ R³ ∝ A, and mass ∝ A, so ρ ≈ 2.3 × 10¹⁷ kg/m³ whatever the nucleus — about 10¹⁴ times the density of water.
3. Explains the nuclear force — protons repel electrically, gravity is about 10³⁶ times weaker than that repulsion, so a different force must hold the nucleus together: strongly attractive between any two nucleons (protons or neutrons) at about 1–2 fm, negligible beyond a few femtometres, and repulsive at very short range.

A student who thinks heavier nuclei are denser, or that gravity or the electrons hold the nucleus together, has **NOT** achieved mastery — those ideas block binding energy, radioactivity and fission.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Nucleus as a dot | Cannot name its parts | Protocol A (Concrete) |
| S1 | Formula recited | Writes R = R₀A^(1/3) but cannot say why density is constant | Protocol B (Counterexample-first) |
| S2-HEAVY-NUCLEI-DENSER | Heavier = denser | "Uranium nuclei are much denser than hydrogen nuclei" | Misconception Engine → then Protocol C |
| S2-GRAVITY-HOLDS-NUCLEUS | Familiar forces only | "Gravity (or the electrons) holds the nucleus together" | Misconception Engine → then Protocol C |
| S3 | Partial — composition fine | Cannot explain why the force must be short-range | Protocol C (Guided Questioning) |
| S6 | Anxiety on cube roots and powers | Avoids the calculation | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What is a nucleus made of?"
  No idea → S0. Enter Protocol A (Concrete).
  "Protons and neutrons" → DB-2.

DB-2 (representation / misconception test):
"A uranium-238 nucleus has 238 nucleons; a hydrogen nucleus has 1. Is the uranium nucleus denser?"
  "No — its volume grows in proportion to A as well, so the density is about the same" → S3. Enter Protocol C.
  "No" (no reason) → S1. Enter Protocol B.
  "Yes — much denser, it's heavier" → SIGNAL:MISCONCEPTION:MC-HEAVY-NUCLEI-DENSER. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (force check — overlays):
"Protons repel each other strongly. What holds a nucleus together?"
  "A short-range attractive nuclear force between nucleons" → no flag.
  "Gravity" or "the electrons pull it together" → add SIGNAL:MISCONCEPTION:MC-GRAVITY-HOLDS-NUCLEUS (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mod.atomic-models`):
"What did alpha scattering show about where an atom's mass and positive charge are?"
  Cannot say "concentrated in a tiny nucleus" → flag PREREQ-GAP-NUCLEAR-ATOM.
  In-session minimum repair: one P06 (the scattering result) + one P34 ("atom ~10⁻¹⁰ m; nucleus?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: nucleus seen as a dot.
Success exit: composition, radius, constant density and the nuclear force (P91 all 5 probes CORRECT).
Failure exit: on HEAVY-NUCLEI-DENSER → Misconception Engine, resume at TA-4. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: A Teaspoon of Nucleus]
P01
→ P04[content: "If you could fill a teaspoon with nuclear matter, it would weigh about a billion tonnes."]
→ P06[content: a nucleus drawn as a cluster of protons and neutrons]
→ P14[predict: "Is a uranium nucleus denser than a hydrogen nucleus?"] → P55
→ success_path → P49 → P05[curiosity: "And what keeps the protons from flying apart?"]

[TA-2: Z, A and N]
P02
→ P13[think-aloud: "Z counts protons and fixes the element. A counts all nucleons. N = A − Z neutrons. Isotopes: same Z, different N — chlorine-35 and chlorine-37 both have 17 protons."]
→ P08[notation: "ᴬ_Z X;  N = A − Z"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "²³⁸₉₂U: protons, neutrons?"] → P55
→ success_path[92, 146] → P49

[TA-3: Size]
P02
→ P13[think-aloud: "Nucleons pack like marbles in a bag, each taking the same volume. So the volume grows in proportion to A, and the radius as A^(1/3): R = R₀A^(1/3), R₀ ≈ 1.2 fm."]
→ P34[question: "Radius of iron-56? Of uranium-238?"] → P55
→ success_path[≈ 4.6 fm; ≈ 7.4 fm] → P49
→ failure_path → P50 → P51[diagnose: cube root] → P52[narrow: "56^(1/3) ≈ 3.83"] → re-elicit P34 → P55

[TA-4: Same Density for Every Nucleus]
P02
→ P41[diagnostic: "Uranium-238 vs hydrogen: which nucleus is denser?"] → P55
→ [if same] → P49
→ [if uranium] → SIGNAL:MISCONCEPTION:MC-HEAVY-NUCLEI-DENSER → misconception_repair_chain[MC-HEAVY-NUCLEI-DENSER]
→ P34[question: "Compute the density: mass A × 1.66 × 10⁻²⁷ kg, volume (4/3)πR₀³A."] → P55
→ success_path[≈ 2.3 × 10¹⁷ kg/m³; A cancels] → P49

[TA-5: The Nuclear Force]
P02
→ P41[diagnostic: "What holds a nucleus together?"] → P55
→ [if nuclear force] → P49
→ [if gravity/electrons] → SIGNAL:MISCONCEPTION:MC-GRAVITY-HOLDS-NUCLEUS → misconception_repair_chain[MC-GRAVITY-HOLDS-NUCLEUS]
→ P13[think-aloud: "The nuclear force attracts proton–proton, proton–neutron and neutron–neutron alike, much more strongly than the electric repulsion at 1–2 fm, but fades to nothing within a few femtometres — which is why it doesn't pull nuclei of neighbouring atoms together."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A nucleus with 8 times the mass number of another: how many times its radius?"] → P55
    → P49 → P51[check: 8^(1/3) = 2]
    → P35[open: "Explain why every nucleus has about the same density."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Estimate the radius of a nucleus with A = 125."] → P55 → CORRECT
    → P76[transfer: "Why are neutron stars, made of nuclear matter, so incredibly dense?"] → P55 → CORRECT
    → P75[boundary: "Two protons 10 fm apart: does the nuclear force or the electric force dominate?"] → P55 → CORRECT
    → P74[classify: "Same element, different mass numbers — what are they?"] → P55 → CORRECT
    → P78[explain: "Why can't gravity hold a nucleus together?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula without meaning.
Success exit: derives the constant density.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Uranium has 238 times hydrogen's nucleons. Its radius is only 6.2 times larger. Volume ratio? Density ratio?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: composition fine; force not.
Success exit: short range explained.
Failure exit: escalate to Protocol A TA-3.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: composition and the marbles-in-a-bag density argument stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); marbles-in-a-bag before formulas; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "heavier nuclei are denser".
Success exit: revises after the volume-ratio contrast.
Failure exit: Misconception Engine.
Key deltas: open with the radii 1.2 fm and 7.4 fm — volume ratio 238; let it sit (P55).

## 6. Misconception Engine

### MC-HEAVY-NUCLEI-DENSER: "Heavier nuclei are denser"
trigger_signal: student expects nuclear density to increase with mass number, treating "heavier" as "denser".
conflict_evidence [P28]: "Uranium-238 has 238 times the mass of a hydrogen nucleus. Its radius is 238^(1/3) ≈ 6.2 times larger. How many times larger is its volume?"
bridge_text [P30]: "6.2³ ≈ 238 — exactly as many times larger as its mass. Mass and volume both grow in proportion to A, so A cancels: every nucleus has about the same density, 2.3 × 10¹⁷ kg/m³. Nucleons pack like marbles in a bag — more marbles, a bigger bag, the same packing."
replacement_text [P31]: "R = R₀A^(1/3) ⇒ V ∝ A ⇒ nuclear density ≈ 2.3 × 10¹⁷ kg/m³ for all nuclei."
discrimination_pairs [P33]: ["hydrogen: R ≈ 1.2 fm, ρ ≈ 2.3 × 10¹⁷ kg/m³", "uranium-238: R ≈ 7.4 fm, ρ ≈ 2.3 × 10¹⁷ kg/m³"]
s6_path: skip P28; a bag of 10 marbles vs a bag of 1000 — same marbles, same packing.

### MC-GRAVITY-HOLDS-NUCLEUS: "Gravity (or the electrons) holds the nucleus together"
trigger_signal: student attributes the stability of the nucleus to gravity between nucleons or to attraction by the orbiting electrons.
conflict_evidence [P28]: "Compare the electric repulsion and the gravitational attraction between two protons — both fall off as 1/r². Which is bigger, and by how much?"
bridge_text [P30]: "The electric repulsion is about 10³⁶ times the gravitational attraction, at any distance. The electrons are far outside the nucleus and pull on the protons, not push them together. Something else — the nuclear force — must be strongly attractive between nucleons at 1–2 fm, and it must die away within a few femtometres, or it would drag neighbouring nuclei together too."
replacement_text [P31]: "The nuclear force: strongly attractive between any two nucleons at ~1–2 fm, negligible beyond a few fm, repulsive at very short range; independent of charge."
discrimination_pairs [P33]: ["two protons 1 fm apart: nuclear attraction wins", "two protons 10 fm apart: only the electric repulsion remains"]
s6_path: skip P28; state the 10³⁶ ratio and the short range plainly.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Same Z, different A" | CORRECT = isotopes |
| P74 (classify) | "U-238 vs H: denser?" | CORRECT = about the same |
| P75 (boundary) | "Protons 10 fm apart" | CORRECT = electric force dominates; nuclear force negligible |
| P76 (transfer) | "Neutron stars" | CORRECT = nuclear density, ~10¹⁷ kg/m³ |
| P77 (generate) | "Radius for A = 125" | CORRECT = 1.2 × 5 = 6.0 fm |
| P78 (explain) | "Why not gravity" | CORRECT = 10³⁶ times weaker than the repulsion |
| P79 (predict) | "8 × A → radius?" | CORRECT = doubles |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Estimate the radius of a nucleus with A = 125." → expected: CORRECT
P76: "Why are neutron stars, made of nuclear matter, so incredibly dense?" → expected: CORRECT
P75: "Two protons 10 fm apart: does the nuclear force or the electric force dominate?" → expected: CORRECT
P74: "Same element, different mass numbers — what are they?" → expected: CORRECT
P78: "Why can't gravity hold a nucleus together?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Protons and neutrons in ¹⁴₆C?"
Interval 2 (3 days): "Radius of A = 27?"
Interval 3 (7 days): "Why is nuclear density the same for all nuclei?"
Interval 4 (21 days): "Properties of the nuclear force?"
Interval 5 (60 days): "Why don't nuclei of neighbouring atoms stick together?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-4, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

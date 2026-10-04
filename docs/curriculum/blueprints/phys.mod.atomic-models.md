# Teaching Blueprint: phys.mod.atomic-models

## 0. Concept Profile
concept_id: phys.mod.atomic-models
name: Nuclear Model of the Atom and Alpha Scattering
domain: Modern Physics (Physics)
difficulty: proficient (3)
bloom: understand
prerequisites: [phys.em.coulombs-law]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (firing marbles at a hidden object under a board and mapping it from the bounces, before any atom; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Describes the alpha-scattering experiment and its result — when alpha particles are fired at gold foil a few hundred atoms thick, almost all pass straight through or are deflected slightly, but about 1 in several thousand is turned through more than 90°, some straight back.
2. Explains why this rules out Thomson's model (positive charge spread through the atom, with electrons embedded: its weak, spread-out field could only nudge a fast alpha particle) and leads to Rutherford's nuclear model — all the positive charge and nearly all the mass in a tiny nucleus, about 1/10 000 to 1/100 000 of the atom's diameter, with electrons outside and mostly empty space between.
3. Uses energy conservation with Coulomb's law to find the distance of closest approach for a head-on collision, r₀ = k(2e)(Ze)/K — about 3 × 10⁻¹⁴ m for a 7.7 MeV alpha on gold (Z = 79) — an upper limit on the nuclear radius.

A student who thinks most alpha particles bounced back, or that the nucleus fills most of the atom, has **NOT** achieved mastery — those ideas invert the experiment's evidence.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Atom as a tiny solid ball | Has no picture of atomic structure | Protocol A (Concrete) |
| S1 | Result recited | Says "nucleus discovered" but cannot connect it to the scattering data | Protocol B (Counterexample-first) |
| S2-MOST-ALPHAS-DEFLECT | Story distorted | "Most alpha particles bounced back off the nucleus" | Misconception Engine → then Protocol C |
| S2-NUCLEUS-FILLS-ATOM | Textbook diagrams | "The nucleus takes up a good part of the atom" | Misconception Engine → then Protocol C |
| S3 | Partial — qualitative fine | Cannot compute the closest approach | Protocol C (Guided Questioning) |
| S6 | Anxiety on large/small numbers | Avoids powers of ten | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What is inside an atom, and how do we know?"
  No idea, or "a solid ball" → S0. Enter Protocol A (Concrete).
  "A nucleus with electrons around it" → DB-2.

DB-2 (representation / misconception test):
"In Rutherford's experiment, what happened to MOST of the alpha particles fired at the gold foil?"
  "They went straight through, because the atom is mostly empty space; only a very few bounced back" → S3. Enter Protocol C.
  "Went straight through" (no reason) → S1. Enter Protocol B.
  "Most bounced back off the nuclei" → SIGNAL:MISCONCEPTION:MC-MOST-ALPHAS-DEFLECT. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (scale check — overlays):
"If an atom were the size of a football stadium, how big would its nucleus be?"
  "About the size of a pea or a marble at the centre" → no flag.
  "About the size of the pitch" or "half the stadium" → add SIGNAL:MISCONCEPTION:MC-NUCLEUS-FILLS-ATOM (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.coulombs-law`):
"How does the repulsion between two positive charges change if their separation halves?"
  Cannot say "four times larger" → flag PREREQ-GAP-COULOMB.
  In-session minimum repair: one P06 (two like charges with force arrows at two separations) + one P34 ("distance tripled: force?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no picture of atomic structure.
Success exit: describes the result, rejects Thomson's model, explains the nuclear model and computes a closest approach (P91 all 5 probes CORRECT).
Failure exit: on MOST-ALPHAS-DEFLECT → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Mapping the Unseen]
P01
→ P04[content: "Roll marbles under a board hiding an object. From how they bounce, you can tell its size and shape. Rutherford did this with atoms."]
→ P06[content: a beam of alpha particles striking gold foil, a zinc-sulfide screen all around]
→ P14[predict: "If atoms were solid balls packed together, what would happen to the alpha particles?"] → P55
→ success_path → P49 → P05[curiosity: "And if atoms were mostly empty?"]

[TA-2: Thomson's Model]
P02
→ P13[think-aloud: "Thomson pictured the atom as a sphere of positive charge with electrons embedded — a 'plum pudding'. Its positive charge is spread over the whole atom, so its electric field is weak everywhere. A fast alpha particle would be nudged by at most a tiny angle."]
→ P34[question: "On Thomson's model, should any alpha particle bounce straight back?"] → P55
→ success_path[no — the spread-out charge is far too weak] → P49

[TA-3: The Result]
P02
→ P41[diagnostic: "What happened to most of the alpha particles?"] → P55
→ [if straight through] → P49
→ [if most bounced back] → SIGNAL:MISCONCEPTION:MC-MOST-ALPHAS-DEFLECT → misconception_repair_chain[MC-MOST-ALPHAS-DEFLECT]
→ P06[content: the observed counts: nearly all at small angles; about 1 in 8000 beyond 90°]
→ P13[think-aloud: "Rutherford: 'as if you fired a 15-inch shell at tissue paper and it came back.' Only a tiny, massive, concentrated positive charge could push that hard."]

[TA-4: How Small Is the Nucleus?]
P02
→ P41[diagnostic: "Atom the size of a stadium — nucleus?"] → P55
→ [if pea/marble] → P49
→ [if large] → SIGNAL:MISCONCEPTION:MC-NUCLEUS-FILLS-ATOM → misconception_repair_chain[MC-NUCLEUS-FILLS-ATOM]
→ P08[notation: "atom ~ 10⁻¹⁰ m; nucleus ~ 10⁻¹⁵ to 10⁻¹⁴ m"]
// GR-3 satisfied: P06 (TA-3) and P13 preceded P08 (V-8 PASS)

[TA-5: Distance of Closest Approach]
P02
→ P13[think-aloud: "A head-on alpha particle slows as it climbs the Coulomb 'hill', stops where all its kinetic energy has become electric potential energy, and turns back: K = k(2e)(Ze)/r₀."]
→ P34[question: "7.7 MeV alpha, gold Z = 79. r₀?"] → P55
→ success_path[≈ 3.0 × 10⁻¹⁴ m — so the gold nucleus is smaller than that] → P49
→ failure_path → P50 → P51[diagnose: MeV to J] → P52[narrow: "1 MeV = 1.6 × 10⁻¹³ J"] → re-elicit P34 → P55

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "With a more energetic alpha particle, does the closest approach increase or decrease?"] → P55
    → P49 → P51[check: decreases, r₀ ∝ 1/K]
    → P35[open: "Explain why a few large-angle deflections disproved the plum-pudding model."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a way to test whether a material's atoms have small nuclei."] → P55 → CORRECT
    → P76[transfer: "Why does the nuclear model leave a puzzle about why electrons don't spiral into the nucleus?"] → P55 → CORRECT
    → P75[boundary: "What does the closest-approach distance tell us — the nuclear radius exactly, or a limit?"] → P55 → CORRECT
    → P74[classify: "Which observation needs a nucleus: most pass through, or a few bounce back?"] → P55 → CORRECT
    → P78[explain: "Why did most alpha particles pass straight through?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: C
Entry condition: result recited without evidence.
Success exit: links each observation to a feature of the model.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Thomson's atom predicts at most tiny deflections. 1 in 8000 came back. What must be true?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: qualitative fine; numbers not.
Success exit: closest approach computed and interpreted.
Failure exit: escalate to Protocol A TA-3.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: the result and the stadium scale stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use the stadium-and-marble scale before powers of ten; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: C
Entry condition: confident "most bounced back".
Success exit: revises after the counts.
Failure exit: Misconception Engine.
Key deltas: open with the actual counts — thousands straight through for each one reflected; let it sit (P55).

## 6. Misconception Engine

### MC-MOST-ALPHAS-DEFLECT: "Most alpha particles bounced back off the nuclei"
trigger_signal: student reports that most or many alpha particles were strongly deflected or reflected, inverting the experiment's result.
conflict_evidence [P28]: "If most alpha particles bounced back, what would that say about how much of the foil is filled by nuclei? Could the atom then be mostly empty space?"
bridge_text [P30]: "The counts show the opposite: almost all went straight through or were barely deflected, and only about 1 in 8000 turned through more than 90°. Most passing through says the atom is mostly empty; the rare bounce-back says that, when an alpha does get close, it meets something tiny, massive and highly charged. Both observations are needed."
replacement_text [P31]: "Most alpha particles pass straight through (mostly empty space); a very few are scattered through large angles (a tiny, dense, positive nucleus)."
discrimination_pairs [P33]: ["most pass through → atom mostly empty", "a rare few bounce back → tiny concentrated nucleus"]
s6_path: skip P28; show the tally: thousands through, one back.

### MC-NUCLEUS-FILLS-ATOM: "The nucleus takes up a large part of the atom"
trigger_signal: student pictures the nucleus as a sizeable fraction of the atom's size, as in textbook diagrams drawn far from scale.
conflict_evidence [P28]: "If the nucleus filled a large part of the atom, how often would an alpha particle hit one? Would almost all pass through?"
bridge_text [P30]: "They would hit nuclei constantly. Since only 1 in thousands is strongly deflected, the nucleus must present a tiny target: about 10⁻¹⁴ m across in an atom about 10⁻¹⁰ m across — a marble at the centre of a stadium. Diagrams draw it big only so it can be seen."
replacement_text [P31]: "The nucleus is about 1/10 000 to 1/100 000 of the atom's diameter yet holds nearly all its mass."
discrimination_pairs [P33]: ["atom: ~10⁻¹⁰ m", "nucleus: ~10⁻¹⁵–10⁻¹⁴ m"]
s6_path: skip P28; the stadium-and-marble picture alone.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Which observation needs a nucleus?" | CORRECT = the rare large-angle scattering |
| P74 (classify) | "Thomson or Rutherford: charge spread out?" | CORRECT = Thomson |
| P75 (boundary) | "Closest approach: radius or limit?" | CORRECT = an upper limit on the nuclear radius |
| P76 (transfer) | "Electron spiral puzzle" | CORRECT = an orbiting charge should radiate and lose energy — leads to Bohr |
| P77 (generate) | "Test for small nuclei" | CORRECT = scattering experiment counting large-angle deflections |
| P78 (explain) | "Why most passed through" | CORRECT = atom mostly empty space |
| P79 (predict) | "More energetic alpha" | CORRECT = closer approach (r₀ ∝ 1/K) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a way to test whether a material's atoms have small nuclei." → expected: CORRECT
P76: "Why does the nuclear model leave a puzzle about why electrons don't spiral into the nucleus?" → expected: CORRECT
P75: "What does the closest-approach distance tell us — the nuclear radius exactly, or a limit?" → expected: CORRECT
P74: "Which observation needs a nucleus: most pass through, or a few bounce back?" → expected: CORRECT
P78: "Why did most alpha particles pass straight through?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "What did most alpha particles do?"
Interval 2 (3 days): "Why did Thomson's model fail?"
Interval 3 (7 days): "Closest approach of a 5 MeV alpha to gold?"
Interval 4 (21 days): "Atom vs nucleus size?"
Interval 5 (60 days): "What puzzle did the nuclear model leave for Bohr?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-4) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY

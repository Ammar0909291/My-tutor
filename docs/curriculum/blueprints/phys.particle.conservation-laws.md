# Teaching Blueprint: Conservation Laws in Particle Interactions

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | phys.particle.conservation-laws |
| **Name** | Conservation Laws in Particle Interactions |
| **Domain** | Particle Physics |
| **Difficulty** | Proficient |
| **Bloom Level** | Apply |
| **Estimated Hours** | 5 |
| **Mastery Threshold** | 0.80 |
| **Prerequisites** | phys.particle.hadron-quark-model, phys.particle.leptons |
| **Unlocks** | phys.particle.feynman-diagrams, phys.particle.accelerators-detectors, phys.particle.standard-model |

---

## 1. Concept Spine

**One-sentence definition:** Baryon number and lepton number are strictly conserved in every known particle interaction; a proposed reaction is forbidden if it violates either conservation law, regardless of how much energy is available to power it.

**The core insight:** Energy availability alone does not determine whether a particle reaction can occur — a reaction that conserves energy and momentum perfectly can still be completely forbidden if it violates baryon number or lepton number conservation. This gives particle physicists (and students) a powerful, purely bookkeeping-based tool: before ever calculating probabilities or cross-sections, simply check whether the proposed reaction's quantum number totals match on both sides of the equation.

**Conceptual chain:**
1. Baryon number: +1 for every baryon, −1 for every antibaryon, 0 for every meson and lepton; total baryon number is conserved in every known interaction.
2. Lepton number: +1 for every lepton, −1 for every antilepton, 0 for every hadron; in the simplest treatment, lepton number is conserved separately for each of the three lepton generations (electron-type, muon-type, tau-type).
3. These conservation laws apply in addition to the more familiar conservation of energy, momentum, and electric charge — a proposed reaction must satisfy ALL of these simultaneously to be allowed.
4. A reaction that conserves energy and charge perfectly, but not baryon number or lepton number, is strictly forbidden — no amount of available energy makes it possible.
5. These conservation laws are experimentally supported by an extremely strong absence of evidence: proton decay (which would violate baryon number) has been searched for extensively and never observed, placing an extraordinarily long lower bound on the proton's lifetime (if it decays at all) — among the strongest empirical support for any conservation law in physics.
6. Conservation laws function as a fast, purely arithmetic pre-check: before any detailed calculation, verify baryon number, lepton number (per generation), charge, energy, and momentum all balance — if any fails, the reaction is impossible regardless of energy.

**Central relations:**
- Baryon number: ΣB(initial) = ΣB(final) in every known interaction.
- Lepton number: ΣL(initial) = ΣL(final), separately per generation, in every known interaction.
- Both apply alongside charge, energy, and momentum conservation — all must hold simultaneously.
- Proton decay searches (baryon-number-violating) have found no confirmed events, strongly supporting baryon number conservation (though some Grand Unified Theories predict extremely rare violation).

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- A "bookkeeping ledger" exercise: physically write each particle's baryon number and lepton number on index cards, and for a proposed reaction, sum the cards on each side of an arrow — if the sums don't match, the reaction is rejected, no further calculation needed.
- Physical analogy: a bank's double-entry ledger where every transaction must balance to zero net change — no transaction, however profitable it looks superficially, is permitted if the books don't balance.

### Representational (Iconic)
- A worked-reaction table: proposed reaction, baryon number sum (initial vs. final), lepton number sum (initial vs. final, per generation), charge sum, verdict (allowed/forbidden).
- A "forbidden reaction gallery": several plausible-looking but actually forbidden reactions, each annotated with exactly which conservation law it violates.

### Abstract (Symbolic)
- Baryon number check: B(p) = +1, B(n) = +1, B(e⁻) = 0, B(ν) = 0 — a reaction like p → e⁺ + π⁰ (proposed proton decay) has B(initial) = +1, B(final) = 0 + 0 = 0, violating baryon number conservation and therefore forbidden.
- Lepton number check (per generation): L_e(e⁻) = +1, L_e(νₑ) = +1, L_e(e⁺) = −1, L_e(ν̄ₑ) = −1; a reaction like μ⁻ → e⁻ + γ (a hypothetical, never-observed muon decay) fails lepton-number-per-generation conservation (L_μ changes from +1 to 0; L_e changes from 0 to +1) and is therefore forbidden, despite conserving charge and energy easily.

### Transfer (+)
- Grand Unified Theories (previewed in phys.particle.electroweak-unification's broader unification context) predict baryon number is only approximately conserved, with proton decay occurring at an extraordinarily slow rate — dedicated, decades-long experiments (e.g., Super-Kamiokande) continue searching for this predicted, extremely rare violation as a test of GUT proposals.
- Nuclear physics: every allowed and forbidden nuclear decay and reaction channel can be quickly screened using these same conservation checks before any detailed calculation.
- Particle accelerator design and analysis: physicists use baryon/lepton number conservation as a first-pass filter when interpreting collision data, rapidly ruling out impossible interpretations of detected particle tracks.

---

## 3. Why Beginners Fail

**Mode 1 — Believing any reaction with enough available energy is automatically allowed:** Correct: energy availability is necessary but never sufficient — a reaction must simultaneously conserve baryon number, lepton number (per generation), charge, momentum, and energy; failing any single one of these makes the reaction impossible regardless of energy.

**Mode 2 — Treating lepton number as a single, undifferentiated total rather than three separate per-generation quantities:** Correct: in the simplest treatment (accurate for the vast majority of observed processes), lepton number is conserved separately for each of the three generations (electron-type, muon-type, tau-type) — a reaction that conserves total lepton number but mixes generations incorrectly (e.g., converting an electron-type lepton into a muon-type lepton with no compensating change) is still forbidden.

**Mode 3 — Assuming proton decay has been experimentally observed, given how much searching has gone into finding it:** Correct: despite decades of extremely sensitive searches (some running continuously in enormous underground detectors), proton decay has never been confirmed; this absence of evidence is itself powerful, positive support for baryon number conservation as understood in the Standard Model, even though some theoretical extensions (GUTs) predict it should occur, extremely rarely.

**Mode 4 — Confusing baryon number conservation with electric charge conservation, treating them as the same rule applied twice:** Correct: these are two entirely independent conservation laws with different counting rules (charge sums quark/particle electric charges; baryon number counts quarks/antiquarks regardless of flavor or charge) — a reaction can satisfy one while violating the other.

---

## 4. Misconception Library

### MC-1: "If a reaction has enough available energy, it should be allowed to happen"
- **Probe:** "A proposed reaction conserves energy and momentum perfectly, and plenty of energy is available. Is that enough to guarantee the reaction can actually happen?"
- **Characteristic phrase:** "As long as there's enough energy, the reaction should be possible."
- **Trigger:** Most introductory mechanics and even basic nuclear physics treatments emphasize energy conservation almost exclusively, without introducing baryon/lepton number as additional, independent requirements.
- **Conflict evidence [P28]:** Proton decay (e.g., p → e⁺ + π⁰) conserves energy, momentum, and even electric charge perfectly — and would release a huge amount of energy (the proton's entire rest mass) — yet it has never been observed despite decades of extraordinarily sensitive searches, precisely because it violates baryon number conservation (B: +1 → 0). Energy availability alone clearly does not make this reaction happen.
- **Bridge [P30]:** "A reaction must satisfy every conservation law simultaneously — energy, momentum, charge, baryon number, and lepton number (per generation). Having enough energy is necessary but nowhere near sufficient. Failing even one of these checks makes the reaction strictly forbidden, no matter how much energy is available."
- **Replacement [P31]:** Reaction feasibility requires simultaneous satisfaction of all conservation laws; energy sufficiency is only one of several independent necessary conditions.
- **Discrimination pairs [P33]:** Having enough money to buy a house (energy) doesn't matter if the house isn't legally for sale (a different, independent requirement) — a reaction needs both "enough energy" AND "conserves every quantum number," just as a purchase needs both "enough money" and "a willing, legal seller."
- **S6 repair path:** Walk through the proton decay example explicitly, computing that energy/momentum/charge are all fine, then revealing the baryon-number failure as the sole reason it's forbidden.

### MC-2: "Lepton number is one single conserved total, not three separate per-generation totals"
- **Probe:** "Is a reaction that converts an electron directly into a muon (with nothing else changing) allowed, since both are leptons with lepton number +1?"
- **Characteristic phrase:** "As long as the total lepton count matches, the reaction should be fine — a lepton is a lepton."
- **Trigger:** Baryon number is a single, undifferentiated quantity (no baryon "generations" distinction needed at this level), leading students to assume lepton number works identically, without the per-generation split.
- **Conflict evidence [P28]:** No experiment has ever observed a bare electron converting directly into a bare muon (e⁻ → μ⁻ with nothing else emitted) — despite this reaction conserving total lepton number (both sides sum to +1), it violates lepton number conservation when checked separately per generation (electron-type lepton number would go from +1 to 0; muon-type lepton number would go from 0 to +1) — a violation, even though the crude "total" count matches.
- **Bridge [P30]:** "In the simplest treatment, lepton number must be conserved separately per generation, not just as one grand total. A reaction that shuffles lepton number between generations, even while keeping the overall count the same, is still forbidden. This is different from baryon number, which (at this level) is tracked as a single quantity without a generation split."
- **Replacement [P31]:** Check lepton number conservation separately for each of the three generations (electron-type, muon-type, tau-type), not as a single combined total.
- **Discrimination pairs [P33]:** A company's total employee count staying the same doesn't mean it's fine to secretly replace every accountant with an engineer — department-by-department totals (per-generation lepton number) matter, not just the grand total.
- **S6 repair path:** Do the per-generation bookkeeping explicitly for the forbidden e⁻ → μ⁻ example, showing the total matches but the per-generation split fails.

### MC-3: "Proton decay has already been observed, given how extensively it's been searched for"
- **Probe:** "After decades of dedicated searching in enormous detectors, has proton decay actually been directly observed?"
- **Characteristic phrase:** "With that much searching, they must have found it by now."
- **Trigger:** Students assume the sheer scale and duration of proton-decay search experiments implies a positive result must have eventually emerged.
- **Conflict evidence [P28]:** Massive, long-running detectors (such as Super-Kamiokande, with tens of thousands of tons of ultra-pure water continuously monitored for decades) have searched extensively for proton decay signatures and found none, placing an extraordinarily long lower bound on the proton's lifetime (if it decays at all) — well beyond 10³⁴ years, vastly longer than the current age of the universe (~1.4×10¹⁰ years). This absence of evidence is itself a strong, positive experimental result supporting baryon number conservation, not an inconclusive null result.
- **Bridge [P30]:** "The extensive search for proton decay has not found it — and that absence, given the extraordinary sensitivity and duration of the search, is itself powerful evidence that baryon number conservation holds extremely well, if not perfectly. Some Grand Unified Theories predict proton decay should occur, but at a rate far too slow to have been detected yet by any experiment so far."
- **Replacement [P31]:** Proton decay remains unobserved despite extensive, sensitive, decades-long searches; this is strong, positive support for baryon number conservation, not evidence of an incomplete or inconclusive search.
- **Discrimination pairs [P33]:** A rigorous, decades-long, well-funded search for a specific rare mineral that consistently finds nothing is strong evidence the mineral (if it exists at all in accessible form) is exceedingly rare or absent — not evidence the search method was flawed.
- **S6 repair path:** Present the specific lower-bound number (proton lifetime > 10³⁴ years, if it decays at all) alongside the age of the universe (~1.4×10¹⁰ years) to make the extraordinary strength of this null result concrete.

---

## 5. Explanation Library

**Explanation A — The conservation-law checklist (procedural):**
"Before doing any detailed calculation, screen any proposed particle reaction against a simple checklist: does it conserve electric charge? Does it conserve energy and momentum? Does it conserve baryon number (sum of +1 per baryon, −1 per antibaryon, 0 otherwise)? Does it conserve lepton number, checked separately for each of the three generations? If any single check fails, the reaction is forbidden — full stop, no further calculation needed, regardless of how much energy might be available."

**Explanation B — Proton decay: the search that keeps coming up empty (historical/discovery/conceptual):**
"If baryon number is not exactly conserved (as some Grand Unified Theories predict, though at an extraordinarily slow rate), protons should occasionally decay into lighter particles like a positron and a neutral pion. Since the 1980s, physicists have built enormous, extraordinarily sensitive detectors — tens of thousands of tons of ultra-pure water, watched continuously by thousands of light sensors — specifically to catch even a single such decay event. None has ever been confirmed. This null result places the proton's lifetime (if finite at all) at well beyond 10³⁴ years — a number so large it dwarfs the age of the universe itself, and stands as one of the strongest pieces of experimental evidence for any conservation law in physics."

**Explanation C — Why lepton number needs a per-generation split (conceptual):**
"Baryon number is tracked as one simple, undifferentiated total. Lepton number, in the simplest and most widely used treatment, must be tracked separately for each of the three lepton generations — because no experiment has ever observed a reaction that mixes generations while keeping only the crude overall total constant (like a bare electron converting directly into a bare muon). This per-generation bookkeeping is an extra layer of precision beyond baryon number's simpler rule, and skipping it produces false-positive 'allowed' verdicts for reactions that are, in fact, forbidden."

---

## 6. Analogy Library

**Primary analogy — A bank's double-entry ledger:**
Every particle reaction must "balance its books" across several separate ledgers simultaneously: an energy ledger, a momentum ledger, a charge ledger, a baryon-number ledger, and three separate lepton-number ledgers (one per generation). A transaction (reaction) that balances every ledger except one is still rejected outright — banks don't approve a transaction just because most of the accounts check out; every relevant ledger must balance.

**Breaking point:** A bank's ledger-balancing is an administrative rule that could, in principle, be changed by policy; conservation laws in particle physics are (as far as every experiment has ever shown) genuine, unbreakable features of nature itself, not an administrative convention that could be waived.

**Anti-analogy:** Do NOT say "conservation laws are just particle physics' version of accounting rules, so they're somewhat arbitrary" — this undersells their status; unlike accounting conventions, these conservation laws are experimentally tested foundational features of physical law (baryon number conservation, in particular, is tested to the extraordinary precision described in Explanation B).

---

## 7. Demonstration Library

**Demo 1 — Reaction bookkeeping worksheet:**
Present five proposed reactions (some allowed, some forbidden for various reasons) and have students apply the full checklist (charge, energy, baryon number, lepton number per generation) to each, identifying which conservation law (if any) is violated.

**Demo 2 — Proton decay search timeline and scale:**
Present the Super-Kamiokande detector's scale (tens of thousands of tons, decades of continuous operation) alongside the resulting lifetime lower bound (>10³⁴ years) and the age of the universe, for direct numerical comparison.

**Demo 3 — Per-generation lepton number ledger:**
Build the three-column lepton-number ledger (electron-type, muon-type, tau-type) for several real reactions (muon decay, beta decay) and one hypothetical forbidden reaction (e⁻ → μ⁻), verifying per-generation balance explicitly.

---

## 8. Discovery Lesson

**Opening (5 min):** "Here's a reaction that has plenty of available energy, conserves electric charge perfectly, and conserves momentum and energy exactly: a proton turning into a positron and a neutral pion. Physicists have searched for this exact reaction for over forty years, in some of the most sensitive detectors ever built. They've never found it. Why not, if the energy books all balance?"

**Exploration (15 min):**
- Introduce baryon number and lepton number as additional, independent conservation laws using Demo 1 (reaction bookkeeping worksheet).
- Reveal that the opening reaction fails the baryon-number check, directly resolving the opening puzzle and targeting MC-1.

**Synthesis (10 min):**
- Run Demo 3 (per-generation lepton ledger), directly targeting MC-2 with the e⁻ → μ⁻ counter-example.
- Present Demo 2 (proton decay search scale) in full, directly targeting MC-3.

**Closure:** "Conservation laws aren't a formality layered on top of energy conservation — they're independent, equally binding requirements. A reaction that looks perfectly fine from an energy standpoint can still be absolutely forbidden, and the search for exceptions to these rules (like proton decay) is one of the longest-running, most sensitive experimental efforts in all of physics."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [EXPLAIN + CHALLENGE]:** Deliver Explanation A (the conservation-law checklist) using the proton-decay opening hook, directly confronting MC-1 (energy availability is sufficient).

**TA-2 [DEMONSTRATE]:** Demo 1 (reaction bookkeeping worksheet), giving students hands-on practice applying the full checklist to multiple reactions.

**TA-3 [CHALLENGE]:** Demo 3 (per-generation lepton ledger), directly confronting MC-2 (lepton number as a single undifferentiated total).

**TA-4 [DEMONSTRATE + TRANSFER]:** Demo 2 (proton decay search scale) alongside Explanation B, directly confronting MC-3 (proton decay has already been observed).

---

## 10. Voice Teaching

**Opening:**
"Here's a reaction: a proton turns into a positron and a neutral pion. Check the energy — balances. Check the momentum — balances. Check the electric charge — balances. By every rule you've learned so far, this should be a perfectly fine reaction. Physicists have searched for exactly this reaction, in some of the most sensitive detectors ever built, for over forty years. They have never found it. Not once. Why not?"

**At the conservation-law reveal:**
"The answer is that energy, momentum, and charge aren't the only things that have to balance. There's another ledger: baryon number. A proton has baryon number plus one. A positron and a pion together have baryon number zero. That ledger doesn't balance — and that single failure is enough to forbid the entire reaction, no matter how much energy is sitting around ready to power it."

**At the lepton-generation subtlety:**
"Here's a subtler trap. Could an electron just directly turn into a muon — nothing else involved? Total lepton count stays the same, one lepton in, one lepton out. Should be fine, right? [Wait.] No — and this has never once been observed. Lepton number isn't tracked as one big combined total. It's tracked separately, generation by generation — electron-type, muon-type, tau-type. An electron becoming a muon shuffles a unit from one generation's ledger to another's, and that shuffle, even though the grand total looks unchanged, is still forbidden."

---

## 11. Assessment

**Mastery gate:** Student correctly applies the full conservation-law checklist (baryon number, lepton number per generation, charge) to determine whether a proposed reaction is allowed, and correctly explains why energy availability alone is insufficient. Score ≥ 80%.

**FA-1 — Baryon number check:**
*Q: Is the reaction p + p → p + p + p + p̄ (proton-proton collision producing two extra protons and an antiproton) allowed by baryon number conservation? Show your work.*
Expected: Initial: B = 1+1 = 2. Final: B = 1+1+1+(−1) = 2. Baryon number is conserved (allowed by this check; other checks would also need to pass for the full reaction to be genuinely allowed).
Threshold: Correct sum on both sides and correct conclusion.

**FA-2 — Lepton number per generation:**
*Q: Is the reaction μ⁻ → e⁻ + γ (a muon decaying directly into an electron and a photon, with no neutrinos) allowed by lepton number conservation? Explain, checking per generation.*
Expected: No — muon-type lepton number goes from +1 (initial) to 0 (final); electron-type lepton number goes from 0 (initial) to +1 (final). Neither generation's lepton number is conserved, so the reaction is forbidden (and indeed, has never been observed).
Threshold: Must check both generations separately and correctly conclude "forbidden."

**FA-3 — Energy sufficiency is not sufficient:**
*Q: A proposed reaction has ample available energy and conserves momentum and charge perfectly. Is it therefore guaranteed to be a physically allowed reaction? Explain, using proton decay as an example.*
Expected: No — energy/momentum/charge conservation are necessary but not sufficient; the reaction must also conserve baryon number and lepton number (per generation). Proton decay is the classic example: energy, momentum, and charge are all fine, but it violates baryon number, so it remains forbidden (and unobserved) despite ample available energy.
Threshold: Must correctly say "not guaranteed" and cite proton decay (or an equivalent example) with the baryon-number violation as the reason.

**FA-4 — Experimental status of proton decay:**
*Q: Has proton decay been directly observed? What does the search's result imply about baryon number conservation?*
Expected: No, it has never been confirmed despite decades of extremely sensitive searches; this places an extraordinarily long lower bound on the proton's lifetime (well beyond 10³⁴ years) and provides strong experimental support for baryon number conservation.
Threshold: Must correctly say "not observed" and correctly interpret the null result as positive support, not as an inconclusive search.

**Confidence calibration:** After FA-2, students rate confidence before revealing the answer; students confident but wrong are walked through the per-generation ledger (Demo 3) again explicitly before re-attempting a parallel item.

**Delayed retrieval (session + 3):** "List the full checklist of conservation laws a proposed particle reaction must satisfy. Why is proton decay's non-observation considered strong evidence, rather than an inconclusive null result?" Expected: charge, energy, momentum, baryon number, lepton number (per generation); the extraordinarily long lifetime lower bound from extensive, sensitive searches is itself positive evidence.

---

## 12. Recovery Notes

**S0:** Student has the baryon/lepton definitions (from hadron-quark-model and leptons concepts) but hasn't yet applied them as a reaction-screening tool. Begin entirely with Demo 1 (reaction bookkeeping worksheet) using only very simple, already-familiar reactions (beta decay, muon decay) before introducing the proton-decay hook.

**S3:** Student can check baryon number correctly but treats lepton number as one undifferentiated total (MC-2). Run Demo 3 (per-generation ledger) repeatedly with new example reactions until the per-generation habit becomes automatic.

**S6:** Student is anxious about the abstractness of "conservation laws beyond energy." Ground entirely in the bank-ledger analogy (Section 6) with concrete, familiar reactions before introducing the proton-decay search story, which involves larger, less familiar numbers.

**S9:** Extend into Grand Unified Theory predictions of extremely rare baryon-number violation as an enrichment topic — "some theories predict protons DO decay, just at a rate so slow it hasn't been caught yet — what would it mean for physics if it finally were?"

---

## 13. Memory & Review

**Memory type:** Procedural (applying the multi-law conservation checklist to a proposed reaction) plus conceptual (understanding why a null experimental result can be strong positive evidence) — retrieval practice should test both the checklist application skill and the proton-decay evidentiary reasoning.

**Spaced retrieval schedule:**
- Session + 1: "Apply the full conservation-law checklist to a given proposed reaction."
- Session + 3: "Explain why lepton number must be checked per generation, not as a single total."
- Session + 7: "What does the non-observation of proton decay imply about baryon number conservation?"

**Interleaving partners:** phys.particle.hadron-quark-model (prerequisite — baryon number definition), phys.particle.leptons (prerequisite — lepton number and generation structure), phys.particle.feynman-diagrams, phys.particle.accelerators-detectors, and phys.particle.standard-model (successors — all rely on conservation-law screening as a working tool).

---

## 14. Transfer Map

**Near transfer:** Screening any newly encountered proposed particle reaction (in Feynman diagram exercises, or in accelerator/detector data interpretation) using the same multi-law checklist before attempting any detailed calculation.

**Far transfer:** Chemistry (mass and charge balance in chemical equations is a direct, simpler analog of this same bookkeeping discipline), general scientific reasoning about necessary-vs-sufficient conditions (a proposed hypothesis satisfying some criteria is not automatically confirmed if it fails even one independent, necessary test), and experimental design (the proton-decay search as a case study in how a rigorous null result can constitute powerful positive evidence, a reasoning pattern relevant across all of experimental science).

**Structural abstraction:** "Multiple independent conservation laws must all hold simultaneously; failing even one is sufficient to forbid an outcome, regardless of how favorable the others are." This "all gates must open" reasoning pattern recurs throughout science and engineering — a bridge design that satisfies every safety check but one is still unsafe; a chemical reaction that balances mass but not charge is still wrong.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** phys.particle.hadron-quark-model (baryon number) and phys.particle.leptons (lepton number, generation structure) are both necessary and sufficient.
- **Unlock readiness:** phys.particle.feynman-diagrams, phys.particle.accelerators-detectors, and phys.particle.standard-model all rely on conservation-law screening as a working, applied tool; sequencing as three parallel unlocks is well-motivated given each depends on this concept independently.
- **Difficulty calibration:** Proficient/Apply is appropriate — the checklist application is a genuine applied skill (Apply level), while the proton-decay evidentiary reasoning (MC-3) pushes slightly toward Analyze-level thinking, justifying the full estimated hours (5) relative to more purely declarative concepts.
- **No open issues:** description, prerequisites, and unlocks are internally consistent with the Physics KG's Particle Physics domain design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

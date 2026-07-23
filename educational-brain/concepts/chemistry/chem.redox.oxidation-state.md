# Oxidation States — `chem.redox.oxidation-state`

## Identity
- **KG ID**: chem.redox.oxidation-state
- **Subject**: chemistry
- **Domain**: chem.redox
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.period.valency
- **Unlocks**: chem.redox.balancing

## Learning Objective
Assign oxidation states to every element in any compound or ion using the priority-ordered rule set, identify which species is oxidised (increasing OS) and which is reduced (decreasing OS) in a reaction, and correctly name the oxidising agent and reducing agent.

## Core Understanding
Oxidation state (OS) — also called oxidation number — is a bookkeeping convention for tracking electron redistribution in reactions. It does NOT represent an actual charge or the real number of electrons on an atom; it is a formal tool for identifying and balancing redox processes.

**The OS rule set (priority order — apply earlier rules before later ones)**:

1. **Free elements**: OS = 0. This includes any elemental form: Na(s), O₂(g), Cl₂(g), S₈(s), P₄(s), all allotropes.
2. **Monoatomic ions**: OS = ionic charge. Na⁺ = +1; Ca²⁺ = +2; Cl⁻ = −1; Fe³⁺ = +3.
3. **Fluorine**: OS = −1 always (highest electronegativity; never shares electrons to give a positive OS). No exceptions.
4. **Oxygen**: OS = −2 usually. Exceptions (in priority order):
   - Peroxides (O–O bond, e.g., H₂O₂, Na₂O₂): OS(O) = −1
   - Superoxides (KO₂): OS(O) = −½ (formally)
   - OF₂ (O bonded to F, Rule 3 forces F = −1): OS(O) = +2
5. **Hydrogen**: OS = +1 usually. Exception: metal hydrides (NaH, CaH₂, LiH, AlH₄⁻): OS(H) = −1.
6. **Group 1 metals in compounds**: OS = +1.
7. **Group 2 metals in compounds**: OS = +2.
8. **Sum rule**: sum of all oxidation states in a neutral species = 0; sum in a polyatomic ion = the ion's charge.

**Algorithm for assigning OS**: apply rules 1–7 in order; any unknown OS is solved using the sum rule.

**Example — Cr₂O₇²⁻**: O is −2 (not a peroxide; no F present; Rule 4 default). Sum rule: 2×OS(Cr) + 7×(−2) = −2 → 2×OS(Cr) = +12 → OS(Cr) = +6.

**Example — S in Na₂S₂O₃**: Na = +1 (Rule 6); O = −2 (Rule 4). Sum: 2(+1) + 2×OS(S) + 3(−2) = 0 → OS(S) = +2. (Note: in thiosulfate the two S atoms are formally equivalent; the average OS is assigned, though in reality the two S have different environments — the average is a bookkeeping result, not a physical measurement.)

**Defining redox in terms of OS**:
- Oxidation = increase in OS (loss of electrons: LEO — Loss of Electrons is Oxidation).
- Reduction = decrease in OS (gain of electrons: GER — Gain of Electrons is Reduction).
- Oxidising agent: the species that is reduced (its OS decreases; it causes oxidation in the other species).
- Reducing agent: the species that is oxidised (its OS increases; it causes reduction in the other species).

Mnemonic: OIL RIG — Oxidation Is Loss, Reduction Is Gain (of electrons). Combined: LEO the GER lion.

**Identifying redox reactions**: if any element changes its OS from reactants to products, the reaction is redox. If no OS changes, it is a non-redox (acid-base, precipitation, complexation) reaction.

**Disproportionation**: one species simultaneously oxidised and reduced. Example: Cl₂ + 2NaOH → NaCl + NaOCl + H₂O; Cl₂ (OS = 0) → Cl⁻ (OS = −1, reduction) + OCl⁻ (OS = +1, oxidation). Both products come from the same reactant.

## Mental Models
**The OS as an accounting ledger model**: OS is not real — it is like accounting profit (a useful number derived from rules, not a physical quantity). Just as profit doesn't tell you where the cash is, OS doesn't tell you where the electrons are. But both enable systematic tracking of what changed.

**The priority cascade model**: OS rules are a priority list, not a menu. When applying them, work from the top: if fluorine is present, assign F = −1 first; only then assign oxygen; only then hydrogen; only then use the sum rule for the unknown. Skipping or reordering causes errors.

**The ownership assignment model**: OS tells you who "owns" the electrons on paper. In NaCl, Na is assigned +1 (it "gave away" one electron on paper) and Cl is assigned −1 (it "received" one electron on paper). In a covalent molecule, the more electronegative atom gets notional ownership of shared electrons.

## Why Students Fail
Students apply rules in the wrong order: they assign OS(O) = −2 first, then try to apply it even in OF₂ where F should have been assigned −1 first.

Students confuse OS with ionic charge. They assign OS(S) = 2 to SO₄²⁻ because "there's no charge on S" — ignoring that OS is a calculated number, not the observed charge.

Students mix up oxidising agent / reducing agent with the direction of OS change. They identify the species being oxidised and then call it "the oxidising agent" — which is the direct opposite of the definition.

Students forget that a substance can be both oxidised and reduced (disproportionation); they assume one species must be the oxidant and a different species the reductant in every redox reaction.

## Misconceptions
- **MC-1 (Type 4 — notation-induced)**: "Oxidation state is the same as ion charge." Probe: "What is the OS of Mn in KMnO₄?" Characteristic phrase: "Mn has no charge, so OS = 0." Intervention: OS is a calculated number using the sum rule; Mn in KMnO₄ has OS = +7 (K = +1, O = −2, so +1 + OS(Mn) + 4(−2) = 0 → OS(Mn) = +7) — entirely different from any observable charge on Mn.
- **MC-2 (Type 1 — overgeneralization)**: "Oxygen is always −2." Probe: "What is the OS of O in H₂O₂?" Characteristic phrase: "oxygen is always minus two." Intervention: in H₂O₂ there is an O–O bond (peroxide); applying Rule 4 peroxide exception: OS(O) = −1; this is confirmed by the sum rule (2×+1 + 2×OS(O) = 0 → OS(O) = −1).
- **MC-3 (Type 3 — language contamination)**: "The oxidising agent gets oxidised." Probe: "In 2H₂ + O₂ → 2H₂O, which is the oxidising agent?" Characteristic phrase: "the oxidising agent does the oxidising so it must get oxidised." Intervention: the oxidising agent CAUSES oxidation in something ELSE while itself being REDUCED. In 2H₂ + O₂ → 2H₂O: H₂ goes from OS 0 to +1 (oxidised — H₂ IS the reducing agent); O₂ goes from OS 0 to −2 (reduced — O₂ IS the oxidising agent).
- **MC-4 (Type 5 — instruction-induced)**: "Hydrogen is always +1." Probe: "What is the OS of H in NaH?" Characteristic phrase: "H is always +1." Intervention: in metal hydrides (NaH, CaH₂, LiAlH₄), Na/Ca/Li are more electropositive than H; H is the more electronegative species and receives formal electron ownership → OS(H) = −1. Rule 5 states the exception explicitly; metal hydrides (where H reduces metals, burns in water) are evidence: NaH + H₂O → NaOH + H₂ (H goes from −1 to 0 in H₂: it is being oxidised).

## Analogies
**Valid**: OS assignment is like assigning tax liability in a joint income — you decide who legally "owns" the income (electrons) by applying a set of rules (electronegativity = rules about who gets priority), not by tracking physical ownership.

**Valid**: The priority cascade is like triage — assign the most critical cases first (fluorine always −1: highest priority); then oxygen exceptions; then hydrogen exceptions; remaining unknowns solved by arithmetic.

**Anti-analogy**: Do NOT say "oxidation means losing electrons to oxygen." Oxidation means increasing OS regardless of which element causes it; many oxidising agents (MnO₄⁻, Cr₂O₇²⁻, H₂O₂) contain oxygen, but the mechanism is OS change, not direct oxygen transfer.

## Demonstrations
**OS change tracking table**: for the reaction MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺ (acidic solution), set up a table: element, OS in reactant, OS in product, Δ OS, direction (oxidised/reduced), role. Students fill in all five columns for both Mn and Fe. The table enforces systematic thinking.

**Disproportionation example**: show Cl₂ reacting with NaOH; assign OS to Cl in all three chlorine-containing species (Cl₂ = 0, Cl⁻ = −1, OCl⁻ = +1). Both Cl products came from the same Cl₂ reactant — "Cl₂ reacted with itself" — demonstrating disproportionation.

**H₂O₂ as both oxidant and reductant**: test H₂O₂ against KMnO₄ (acidic, Mn purple/+7 to colourless Mn²⁺/+2 — H₂O₂ is the reductant; OS(O) goes from −1 to 0) and against KI solution (H₂O₂ oxidises I⁻ to I₂; OS(O) goes from −1 to −2). Same compound, different roles depending on partner — connects to the sblock.hydrogen entry's "both oxidant and reductant" note.

## Discovery Questions
1. "Assign OS to each atom in SO₄²⁻, S₂O₃²⁻, and S₄O₆²⁻. What pattern do you notice about the OS of S as the S:O ratio changes?"
2. "In the reaction 2SO₂ + O₂ → 2SO₃, is this a redox reaction? Assign OS to S and O in each species and verify your answer."
3. "The reaction between concentrated H₂SO₄ and Cu metal produces CuSO₄, SO₂, and H₂O. Identify the oxidising and reducing agents using OS changes."

## Teaching Sequence
1. **Establish OS as a bookkeeping convention**: clarify it is NOT ionic charge; compare OS(S) in Na₂S (−2), SO₂ (+4), SO₃ (+6), SO₄²⁻ (+6) to show a range — impossible if OS were a real charge.
2. **Teach the rule set in priority order**: assign OS step by step for five practice compounds (NaCl, H₂O, H₂O₂, OF₂, NaH) — each selected to exercise a different rule or exception.
3. **Sum rule practice**: solve for unknown OS in Cr₂O₇²⁻, KMnO₄, Na₂S₂O₃, Fe₃O₄ (mixed-OS compound, OS(Fe) = +8/3 average).
4. **Define redox from OS change**: introduce OIL RIG; assign oxidation/reduction to both participants in three reactions.
5. **Oxidising agent and reducing agent identification**: emphasise the inversion — the oxidising agent is the species that IS REDUCED; practice with 5 reactions including at least one disproportionation.
6. **Disproportionation**: present Cl₂/NaOH and H₂O₂/MnO₄⁻ examples; confirm same species can be both simultaneously.

## Tutor Actions
- **If student assigns O = −2 in OF₂**: ask "which rule applies when F is present?" — Rule 3 (F always −1) must be applied before Rule 4 (O default −2); rerun the calculation with F first.
- **If student calls the oxidised species "the oxidising agent"**: trace back to definitions — "what does the oxidising agent DO?" (it oxidises something else, i.e., causes OS increase in the partner) → "so what happens to the oxidising agent's own OS?" (it decreases: it is REDUCED). The direction of the agent's own change is OPPOSITE to what it causes.
- **If student cannot solve for S in SO₄²⁻**: walk through the sum rule arithmetically; sum = charge of ion = −2; O = −2 × 4 = −8; so OS(S) = −2 − (−8) = +6.
- **FRAGILE sign**: assigns all OS correctly in straightforward compounds but misidentifies oxidising/reducing agent (the inversion is the conceptual hurdle, not the arithmetic).

## Voice Teaching Notes
"Oxidising agent" and "reducing agent" reliably cause hesitation — the inversion (oxidising agent is reduced) is counter-intuitive; give at least 10 seconds wait time when asking which is which.

The priority-cascade rule is best taught as a spoken procedure: "First, is there fluorine? Assign −1. Then, is there oxygen? Assign −2 unless it's a peroxide or OF₂. Then, is there hydrogen? Assign +1 unless it's a metal hydride. Then sum to zero." Repeating this aloud fixes the order.

For learners who are also studying electrochemistry: bridge to reduction potential notation (the more positive E°, the stronger the oxidising agent) to reinforce the definition from a different angle.

## Assessment Signals
- **Green**: correctly assigns OS in all four compound classes (containing F, O, H, metals) using the priority cascade; correctly identifies oxidising and reducing agents with OS evidence; handles at least one disproportionation example.
- **Amber**: correct OS assignment but reversed oxidising/reducing agent identification; or correct OS in simple molecules but fails peroxide/OF₂/metal hydride exceptions.
- **Red**: equates OS with ionic charge; always assigns O = −2 regardless of context; calls the oxidised species the oxidising agent.
- **Probe**: "In the reaction Cl₂ + 2KBr → 2KCl + Br₂: (a) assign OS to Cl and Br in all four species; (b) which species is oxidised? (c) which is the oxidising agent? (d) is this disproportionation?"

## Tutor Recovery Strategy
If the student confuses OS with ionic charge: use Na₂SO₄ as a diagnostic — ask "what is the charge on S in Na₂SO₄?" (students may say "+2" or "no charge"). Confirm: the ionic charge on SO₄²⁻ is −2, but OS(S) = +6. The SO₄²⁻ ion carries a −2 charge as a whole unit; the OS(S) is +6 by the sum rule within that ion. The ion charge and the OS of an atom within the ion are different quantities. Do not proceed with redox identification until this distinction is secure.

## Memory Hooks
- **OIL RIG**: Oxidation Is Loss (of electrons); Reduction Is Gain (of electrons).
- **LEO the GER lion**: Loss of Electrons = Oxidation; Gain of Electrons = Reduction.
- **OS rule priority**: "Free elements zero. F always minus one. O minus two (watch peroxides). H plus one (watch metal hydrides). Group 1 = +1, Group 2 = +2. Sum to charge."
- **Agent inversion**: "The oxidising agent gets reduced (it causes oxidation, it suffers reduction). The reducing agent gets oxidised (it causes reduction, it suffers oxidation)."

## Transfer Connections
- **chem.redox.balancing**: OS assignment is the required first step for balancing redox equations by the half-reaction method; every balanced redox equation starts with correctly assigned OS to identify which atoms are oxidised and which are reduced.
- **chem.elect.electrochemistry**: electrode reactions are explicitly redox; OS change at each electrode (cathode: reduction; anode: oxidation) maps directly onto the definitions established here.

## Cross-Subject Connections
- **Biology (cellular respiration and photosynthesis)**: glucose oxidation (C goes from OS ≈ 0 in glucose to +4 in CO₂) and CO₂ reduction (−4 in CH₂O after photosynthesis) are the biochemical redox reactions that power life; OIL RIG applies to every step of the electron transport chain.
- **Environmental chemistry (corrosion, bleaching)**: Fe rusting (Fe → Fe²⁺/Fe³⁺; OS increases: oxidation); chlorine bleaching (Cl₂ → OCl⁻, disproportionation identical to the demonstration example above).

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.redox.oxidation-state`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.redox.oxidation-state` as of 2026-07-23.

## Curriculum Feedback
None. The prerequisite (chem.period.valency) is appropriate — OS assignment relies on knowing group-based electron counts and variable valency in transition metals, both established by the valency node.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

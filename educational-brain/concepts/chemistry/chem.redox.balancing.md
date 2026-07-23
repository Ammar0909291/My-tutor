# Balancing Redox Equations — `chem.redox.balancing`

## Identity
- **KG ID**: chem.redox.balancing
- **Subject**: chemistry
- **Domain**: chem.redox
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.redox.oxidation-state
- **Unlocks**: chem.redox.activity-series, chem.redox.disproportionation, chem.redox.titrations

## Learning Objective
Balance redox equations in both acidic and basic aqueous solution using the half-reaction (ion-electron) method, apply the method to disproportionation reactions, and verify atom and charge balance.

## Core Understanding
Redox equations cannot be balanced by inspection alone because electron transfer must be made explicit. The **half-reaction method** (ion-electron method) is the systematic procedure.

**Half-reaction method — acidic solution (6 steps)**:
1. **Assign OS** to all atoms; identify which species is oxidised and which is reduced (from OS changes).
2. **Write unbalanced half-reactions**: one for oxidation, one for reduction, each showing only the species that change OS.
3. **Balance atoms other than O and H** in each half-reaction (if needed — often already balanced for the central atom).
4. **Balance O** by adding H₂O molecules to the side short of oxygen.
5. **Balance H** by adding H⁺ ions to the side short of hydrogen.
6. **Balance charge** by adding electrons (e⁻) to the MORE POSITIVE side of each half-reaction. (Electrons appear on the right in the oxidation half-reaction; on the left in the reduction half-reaction.)
7. **Equalise electrons**: multiply each half-reaction by the smallest integer that makes the electron count equal in both.
8. **Add the half-reactions**: cancel e⁻ exactly; cancel H₂O and H⁺ that appear on both sides.
9. **Verify**: count atoms and net charges on each side — must match.

**Basic solution — additional step**: complete steps 1–9 in acidic medium, then neutralise H⁺ ions by adding the same number of OH⁻ ions to BOTH sides. H⁺ + OH⁻ → H₂O cancels on one side; net result replaces H⁺ with H₂O and adds OH⁻ to the other side.

**Worked example (acidic): MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺**
- Reduction: MnO₄⁻ → Mn²⁺ (Mn: +7 → +2, gain 5e⁻)
  - Balance O: MnO₄⁻ → Mn²⁺ + 4H₂O
  - Balance H: MnO₄⁻ + 8H⁺ → Mn²⁺ + 4H₂O
  - Balance charge: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (left: −1+8−5=+2; right: +2 ✓)
- Oxidation: Fe²⁺ → Fe³⁺ + e⁻ (already balanced for charge)
- Equalise electrons: multiply oxidation ×5: 5Fe²⁺ → 5Fe³⁺ + 5e⁻
- Add: MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺ ✓

**Worked example (basic): Cl₂ → Cl⁻ + ClO₃⁻ (disproportionation)**
- Reduction half: Cl₂ + 2e⁻ → 2Cl⁻ (Cl: 0 → −1, gain 2e⁻)
- Oxidation half: Cl₂ → 2ClO₃⁻ (Cl: 0 → +5, lose 5e⁻ per Cl atom, lose 10e⁻ per Cl₂)
  - Balance O: Cl₂ + 6H₂O → 2ClO₃⁻
  - Balance H: Cl₂ + 6H₂O → 2ClO₃⁻ + 12H⁺
  - Balance charge: Cl₂ + 6H₂O → 2ClO₃⁻ + 12H⁺ + 10e⁻ (left: 0; right: −2+12−10=0 ✓)
- Equalise electrons: multiply reduction ×5: 5Cl₂ + 10e⁻ → 10Cl⁻
- Add: 6Cl₂ + 6H₂O → 10Cl⁻ + 2ClO₃⁻ + 12H⁺ → convert to basic (add 12OH⁻ both sides):
  - 6Cl₂ + 6H₂O + 12OH⁻ → 10Cl⁻ + 2ClO₃⁻ + 12H₂O → simplify: 6Cl₂ + 12OH⁻ → 10Cl⁻ + 2ClO₃⁻ + 6H₂O (divide by 2) → **3Cl₂ + 6OH⁻ → 5Cl⁻ + ClO₃⁻ + 3H₂O** ✓

**Verification checklist** (always mandatory):
- Cl: 6 left, 5+1=6 right ✓
- O: 6 left, 3+3=6 right ✓
- H: 6 left, 6 right ✓
- Charge: 3(0)+6(−1)=−6 left; 5(−1)+(−1)+3(0)=−6 right ✓

**Key rule mnemonics**:
- "Electrons on the more positive side" — in reduction, the reactant side is more positive (it receives electrons); in oxidation, the product side is more positive.
- "OAR: Oxidation Adding Right (electrons appear on the right of the oxidation half-reaction)."
- "H₂O for O, H⁺ for H" — in acidic medium, these are the only two 'balancing agents' allowed.

## Mental Models
**The electron accountant**: every electron that leaves the reducing agent must arrive at the oxidising agent. The half-reaction method forces this accounting explicitly: once both half-reactions show the same number of electrons (by multiplying), adding them makes the electrons cancel — the electron ledger is closed.

**The two-lane road**: redox in solution is like two lanes of a motorway running in opposite directions simultaneously. One lane carries electrons away (oxidation half-reaction, going right); the other carries electrons toward the destination (reduction half-reaction, going left). The method simply writes each lane separately, balances each independently, then merges.

## Why Students Fail
Students try to balance redox equations by inspection (as they balance non-redox equations), leading to balanced atoms but unbalanced charges, or balanced charges but wrong stoichiometry. The half-reaction method is not optional — it is the only reliable procedure.

Students forget to balance charge after balancing atoms, or add electrons to the wrong side (reducing half-reaction gets electrons on the right by confusion with the oxidation half-reaction).

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Add H₂O to balance O and H⁺ to balance H — always in that order, and always on the same side as the deficit." Probe: "Balance the half-reaction: NO₃⁻ → NO in acidic solution. Where does H₂O go, and where does H⁺ go?" Intervention: H₂O goes to the side that is SHORT of oxygen (step 4); H⁺ goes to the side SHORT of hydrogen (step 5) — but the 'deficit' side changes depending on the molecule. Students who memorise "add to the right" fail when the product has more O than the reactant. The method must be applied from first principles each time.
- **MC-2 (Type 4 — notation-induced)**: "Electrons go on the left of every half-reaction because they are 'consumed.'" Probe: "Write the oxidation half-reaction for Fe²⁺ → Fe³⁺. Where are the electrons?" Characteristic phrase: "electrons are reactants so they go on the left." Intervention: electrons appear on the LEFT only in REDUCTION half-reactions (they are consumed — the oxidant gains electrons). In OXIDATION half-reactions electrons appear on the RIGHT (they are produced — the reductant loses electrons). The mnemonic OAR (Oxidation Adding Right) covers this.
- **MC-3 (Type 1 — overgeneralization)**: "For basic solution, just replace all H⁺ with OH⁻." Probe: "In basic solution, does H₂O in the half-reaction also change?" Characteristic phrase: "swap H⁺ for OH⁻." Intervention: the correct procedure is (1) balance in ACID fully, (2) then add OH⁻ to BOTH sides equal to the number of H⁺ present; (3) H⁺ + OH⁻ → H₂O eliminates the H⁺, but H₂O molecules may remain on either side and must be simplified by cancelling. Simply replacing H⁺ → OH⁻ skips the H₂O adjustment and gives the wrong product side.

## Analogies
**Valid**: Balancing a redox equation is like reconciling two separate bank accounts that must together net to zero: the oxidation account shows money leaving (electrons on the right), the reduction account shows money arriving (electrons on the left). The transaction only settles when both sides show the same amount transferred. Multiplying each half-reaction is like adjusting the transaction size — you can only close the books when the debit equals the credit.

## Demonstrations
**MnO₄⁻ colour change as a visual audit**: titration of Fe²⁺ with KMnO₄ (deep purple) — the endpoint is the first permanent pale pink colour. Before the endpoint, purple disappears instantly (all Mn(VII) reduced to Mn²⁺, colourless); after the endpoint, excess MnO₄⁻ is not consumed. The balanced equation (5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O) gives the 5:1 stoichiometry directly from the half-reaction method — a live audit of whether the balance is correct.

## Discovery Questions
1. "Balance the reaction of dichromate ion (Cr₂O₇²⁻) with sulfite ion (SO₃²⁻) in acid solution. Cr₂O₇²⁻ is reduced to Cr³⁺; SO₃²⁻ is oxidised to SO₄²⁻. Check your answer by verifying atom and charge balance."
2. "In basic solution, hydrogen peroxide can act as both an oxidising agent and a reducing agent. Write the two half-reactions for H₂O₂ → H₂O (reduction) and H₂O₂ → O₂ (oxidation), balance them, and show that the sum is a disproportionation equation."

## Teaching Sequence
1. Recap OS rules and OIL RIG/LEO GER from chem.redox.oxidation-state.
2. Introduce the half-reaction concept: separate one reaction into two electron-transfer events.
3. Teach the 6-step acidic procedure on a simple example (Fe²⁺/MnO₄⁻).
4. Add the basic-solution step: neutralise H⁺ with OH⁻, simplify H₂O.
5. Apply to disproportionation (same element in both half-reactions).
6. Verification checklist: always check atoms AND charge.

## Tutor Actions
- **If student adds electrons to wrong side**: ask "Is this half-reaction an oxidation or a reduction?" (reduces = gains electrons, electrons are consumed on LEFT); "OAR — Oxidation Adds electrons on the Right" — use the mnemonic every time until automatic.
- **If student forgets to add H₂O or H⁺**: ask "Is oxygen balanced in this half-reaction?" → count O on each side → add H₂O to short side; "Is hydrogen balanced?" → count H → add H⁺. Force counting before each step.
- **FRAGILE sign**: gets the correct final equation but cannot reproduce the half-reactions separately; verification step skipped or done mentally rather than explicitly.

## Voice Teaching Notes
The most common student failure in exams is setting up the half-reactions correctly but putting electrons on the wrong side of the oxidation half-reaction. Drill this with OAR at the start of every practice problem. In voice teaching, say "electrons on the right for oxidation — OAR, like rowing away from the electrons."

For basic solution, always say out loud: "Acid first, then neutralise." Students who try to work directly in base invariably confuse themselves.

## Assessment Signals
- **Green**: produces correctly balanced equations (both atoms and charge) for strong oxidant + simple metal ion in acid AND in basic solution; can balance a disproportionation reaction.
- **Amber**: correct half-reactions but incorrect equalisation (multiplication step); or correct atoms but wrong charge.
- **Red**: tries to balance by inspection; electrons on wrong side; forgets charge-balance step.
- **Probe**: "Balance in ACIDIC solution: Cr₂O₇²⁻ + C₂O₄²⁻ → Cr³⁺ + CO₂. Show both half-reactions, show the multiplication step, write the full equation, verify."

## Tutor Recovery Strategy
If student cannot start: return to a simple non-redox equation (HCl + NaOH → NaCl + H₂O) to establish the principle of 'balancing by rule'; contrast with redox by noting charge is also a conserved quantity. Then: "The half-reaction method is just applying conservation of charge the same way we apply conservation of atoms." Write the two OS changes; hand the student the first half-reaction and ask them to balance ONLY atoms first (without worrying about charge or electrons) — small incremental steps until the procedure feels concrete.

## Memory Hooks
- **Step order (acidic)**: "Atoms (non-H/O) → O (add H₂O) → H (add H⁺) → Charge (add e⁻) → Equalise → Add → Verify."
- **Which side gets electrons**: "OAR — Oxidation Adds electrons on the Right. Reduction gets electrons on the Left (to be consumed)."
- **Basic solution**: "Acid first. Then neutralise H⁺ with OH⁻. Add OH⁻ to BOTH sides. Simplify."
- **Verification must-do**: "Count atoms AND charge — every single time."

## Transfer Connections
- **chem.redox.titrations**: the stoichiometry derived from balanced redox equations is the basis for all redox titration calculations; the MnO₄⁻/Fe²⁺ 5:1 ratio is the canonical worked example.
- **chem.redox.disproportionation**: balancing disproportionation reactions is a direct application — same element appears in both half-reactions.

## Cross-Subject Connections
- **Biology**: the electron transport chain is a sequence of redox half-reactions in mitochondria; NADH/FADH₂ donate electrons (oxidation half-reactions), O₂ accepts electrons (reduction half-reaction: O₂ + 4H⁺ + 4e⁻ → 2H₂O) — cellular respiration is a biological redox process.
- **Environmental science**: the nitrogen cycle involves multiple redox steps (nitrification: NH₄⁺ → NO₂⁻ → NO₃⁻; denitrification: NO₃⁻ → N₂), each balanced by the half-reaction method in environmental engineering.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.redox.balancing`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.redox.balancing` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

# Disproportionation and Comproportionation — `chem.redox.disproportionation`

## Identity
- **KG ID**: chem.redox.disproportionation
- **Subject**: chemistry
- **Domain**: chem.redox
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Estimated hours**: 2
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.redox.balancing
- **Unlocks**: (none — terminal node)

## Learning Objective
Identify disproportionation reactions by recognising that a single element is simultaneously oxidised and reduced; write balanced equations for disproportionation and comproportionation reactions; use standard electrode potentials to determine whether disproportionation is thermodynamically spontaneous.

## Core Understanding
**Disproportionation**: a reaction in which the SAME ELEMENT in ONE OXIDATION STATE is SIMULTANEOUSLY oxidised to a higher OS and reduced to a lower OS. No external oxidising or reducing agent is involved — the element reacts with itself.

**Key examples**:
- Cu⁺ disproportionation: 2Cu⁺(aq) → Cu(s) + Cu²⁺(aq). Cu⁺ is simultaneously reduced to Cu(0) and oxidised to Cu(+2). This is why Cu⁺ is unstable in aqueous solution and Cu(I) ionic compounds dissolve by disproportionating.
- Cl₂ in alkali: Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O. Cl(0) in Cl₂ is reduced to Cl⁻ (OS −1) and oxidised to ClO⁻ (OS +1). Used in the manufacture of bleach (NaClO).
- Cl₂ in hot concentrated alkali: 3Cl₂ + 6OH⁻ → 5Cl⁻ + ClO₃⁻ + 3H₂O. Cl(0) is reduced to Cl⁻ (−1) and oxidised to ClO₃⁻ (+5). The product distribution depends on temperature.
- H₂O₂ decomposition: 2H₂O₂ → 2H₂O + O₂. O(−1) in H₂O₂ is reduced to O(−2) in H₂O and oxidised to O(0) in O₂. Catalysed by MnO₂, blood (catalase), or KI.
- P₄ in hot alkali: P₄ + 3OH⁻ → PH₃ + H₂PO₂⁻. P(0) is reduced to P(−3) in PH₃ and oxidised to P(+1) in H₂PO₂⁻.

**Identification technique**: assign OS to the element in question before and after the reaction; if the same starting OS splits into a lower and a higher value in the products, the reaction is disproportionation.

**Comproportionation (conproportionation)**: the reverse of disproportionation — two different oxidation states of the same element react to give a SINGLE intermediate oxidation state. Example: Cu(s) + Cu²⁺(aq) → 2Cu⁺(aq) is comproportionation (Cu(0) + Cu(+2) → Cu(+1)). In practice, for Cu⁺ in water, the disproportionation is spontaneous (E°cell > 0), so comproportionation is non-spontaneous (E°cell < 0).

**E° criterion for spontaneous disproportionation**: write the two half-cells:
- Cu²⁺ + e⁻ → Cu⁺, E° = +0.15 V (reduction of Cu²⁺ to Cu⁺)
- Cu⁺ + e⁻ → Cu, E° = +0.52 V (reduction of Cu⁺ to Cu)
For 2Cu⁺ → Cu + Cu²⁺: the cathode is Cu⁺/Cu (+0.52 V); the anode is Cu²⁺/Cu⁺ (+0.15 V, which runs in REVERSE as Cu⁺ → Cu²⁺). E°cell = +0.52 − (+0.15) = +0.37 V > 0 → disproportionation of Cu⁺ is spontaneous.
General rule: disproportionation is spontaneous when E°(lower couple) > E°(upper couple) — the middle state can fall "downhill" in both directions simultaneously.

## Mental Models
**The energy valley and energy hill**: an oxidation state is either an energy valley (stable, cannot simultaneously fall to lower and higher states — comproportionation product) or an energy hill (unstable — if E° conditions allow falling both ways, it disproportionates). Cu⁺ sits on an energy hill between Cu(0) and Cu(2+); its instability in water is the direct consequence.

**The "splitting arrow" diagram**: draw three horizontal levels for the three OS involved (low, middle, high). From the middle level, draw one arrow going down (reduction) and one arrow going up (oxidation). If both arrows release free energy (E°cell > 0 for each descent), the middle state is thermodynamically unstable.

## Why Students Fail
Students confuse disproportionation (one element, one starting state) with an ordinary redox reaction (two different elements exchanging electrons). The test is strict: the SAME element, the SAME initial OS, must appear as BOTH the oxidised product AND the reduced product. If a second element is involved as the oxidant or reductant, it is not disproportionation.

Students also fail to recognise that the E° criterion requires comparing TWO half-cells involving the SAME element at different OS — specifically identifying which half-cell runs as cathode (the one with more positive E°) and which runs as anode.

## Misconceptions
- **MC-1 (Type 1 — overgeneralization)**: "Cl₂ always disproportionates in water/alkali because Cl₂ is reactive." Probe: "Cl₂ reacts with cold dilute NaOH to give Cl⁻ and ClO⁻. Is Cl₂ disproportionating here? What about Cl₂ reacting with Fe²⁺?" Characteristic phrase: "Cl₂ is reactive, so it always disproportionates." Intervention: with NaOH → YES, disproportionation (Cl(0) → Cl⁻ and ClO⁻). With Fe²⁺ → NO: Cl₂ + 2Fe²⁺ → 2Cl⁻ + 2Fe³⁺. Here only Cl is reduced (0→−1) and Fe is oxidised (+2→+3). Cl does NOT split into two states — only reduction. This is ordinary redox, NOT disproportionation. The test: does Cl SIMULTANEOUSLY increase and decrease in OS?
- **MC-2 (Type 5 — instruction-induced)**: "Cu⁺ in solid copper(I) compounds is stable, so Cu⁺ in water should also be stable." Probe: "CuCl is a stable crystalline solid. Why does Cu⁺ disproportionate when CuCl dissolves in water?" Characteristic phrase: "Cu⁺ exists in CuCl, so Cu⁺ ions must be stable in solution." Intervention: stability is THERMODYNAMIC and medium-dependent. In the solid CuCl lattice, the Madelung energy stabilises Cu⁺. In aqueous solution, the difference in hydration enthalpies of Cu²⁺ vs. Cu⁺ (Cu²⁺ has far greater charge density → much larger hydration enthalpy) makes the Cu + Cu²⁺ combination energetically lower than 2Cu⁺(aq). E°cell = +0.37 V confirms spontaneous disproportionation in water.
- **MC-3 (Type 4 — notation-induced)**: "In 2Cu⁺ → Cu + Cu²⁺, the OS numbers don't balance because one Cu goes from +1 to 0 (gains 1e) and one goes from +1 to +2 (loses 1e), but there should be 2 electrons transferred." Probe: "Write the half-equations for 2Cu⁺ → Cu + Cu²⁺ and count electrons." Characteristic phrase: "the electron transfer doesn't balance." Intervention: each Cu⁺ undergoes a ONE-ELECTRON change. One Cu⁺ gains 1 electron (Cu⁺ + e⁻ → Cu); one Cu⁺ loses 1 electron (Cu⁺ → Cu²⁺ + e⁻). The 1 electron gained by the first equals the 1 electron lost by the second — the electrons balance perfectly (both 1e). Total: 2Cu⁺ → Cu + Cu²⁺. OS balances: two atoms each at +1 on left; one at 0 and one at +2 on right → sum is +2 on both sides. ✓

## Analogies
**Valid**: disproportionation as a crowd at the middle of a seesaw. If the seesaw can tip in both directions with equal ease (both motions are downhill energetically), some people slide left and some right — the middle empties. Cu⁺ is the crowded middle state; Cu(0) and Cu²⁺ are the lower energy ends the crowd disperses toward.

## Demonstrations
**Cu⁺ disproportionation made visible**: dissolve copper(I) chloride (CuCl) in concentrated HCl to stabilise Cu⁺ as [CuCl₂]⁻ (colourless solution); then pour into excess water — the solution immediately turns blue (Cu²⁺ from disproportionation) and a reddish copper deposit forms simultaneously. Students observe both products appearing at once.

**H₂O₂ decomposition**: pour H₂O₂ over MnO₂ (catalyst) → vigorous O₂ evolution (glowing splint rekindles). Identify this as disproportionation: O(−1) in H₂O₂ → O(−2) in H₂O and O(0) in O₂.

## Discovery Questions
1. "Assign OS to each chlorine atom in: 2ClO₂⁻ → ClO₃⁻ + Cl⁻. Is this disproportionation? Write the two half-equations and calculate E°cell using E°(ClO₃⁻/ClO₂⁻) = +0.36 V and E°(ClO₂⁻/Cl⁻) = +0.67 V. Comment on spontaneity."
2. "Given that Fe³⁺/Fe²⁺ has E° = +0.77 V and Fe²⁺/Fe has E° = −0.44 V, determine whether Fe²⁺ will disproportionate in acid solution to give Fe and Fe³⁺. Explain what this tells you about the relative stability of Fe²⁺."

## Teaching Sequence
1. Define disproportionation: same element, same OS, simultaneously oxidised and reduced. Contrast with ordinary redox.
2. OS assignment: practise assigning OS to Cl in Cl₂, ClO⁻, ClO₃⁻, Cl⁻; to O in H₂O₂, H₂O, O₂; to Cu in CuCl, CuSO₄, Cu.
3. Worked examples: Cu⁺ disproportionation; Cl₂ in cold alkali; H₂O₂ decomposition.
4. E° criterion: identify the two half-cells from E° tables; calculate E°cell; test spontaneity.
5. Comproportionation: the reverse; when is it spontaneous instead?
6. Diagnostic practice: given a reaction, classify as disproportionation / comproportionation / neither.

## Tutor Actions
- **If student classifies ordinary redox as disproportionation**: ask "how many elements change OS?" (two); "disproportionation requires ONE element changing in BOTH directions simultaneously."
- **If student is confused about which half-cell is cathode in Cu⁺ disproportionation**: write both half-cells as reductions; the one with more positive E° (+0.52 V for Cu⁺/Cu) is cathode; then E°cell = +0.52 − (+0.15) = +0.37 V.
- **FRAGILE sign**: can identify a reaction as disproportionation from description but cannot use E° values to confirm spontaneity.

## Voice Teaching Notes
The key conceptual step — "same element, same starting OS, splits into two different OS" — is worth verbalising as a strict test. For voice teaching, give a short equation and ask the student to name the element, state its starting OS, state its two product OS values, and classify. Only after three successful classifications should E° application be introduced.

## Assessment Signals
- **Green**: identifies disproportionation correctly using OS analysis; writes balanced half-equations; uses E° values to determine spontaneity; correctly identifies comproportionation; distinguishes from ordinary redox.
- **Amber**: correct identification of disproportionation but cannot use E° to confirm spontaneity; or confuses which half-cell is cathode.
- **Red**: cannot distinguish disproportionation from ordinary redox; believes Cu⁺ is stable in water; cannot assign OS to identify the splitting.
- **Probe**: "Fe²⁺ in water: E°(Fe³⁺/Fe²⁺) = +0.77 V; E°(Fe²⁺/Fe) = −0.44 V. Does Fe²⁺ disproportionate? Calculate E°cell and justify."

## Tutor Recovery Strategy
If student cannot identify disproportionation: use OS-colouring — write the equation and colour all atoms of the element under investigation; assign OS to each; look for same-coloured atoms with different OS in the products. The visual colour pattern makes the simultaneous oxidation/reduction concrete before any algebraic analysis.

## Memory Hooks
- **Definition**: "Disproportionation: ONE element, ONE starting OS, simultaneously goes UP and DOWN."
- **Cu⁺ instability**: "Cu⁺ in water always disproportionates: 2Cu⁺ → Cu + Cu²⁺. Cu⁺ salts in solid are fine; dissolved Cu⁺ is unstable."
- **E° test**: "Middle state disproportionates when E°(lower couple) > E°(upper couple). The middle is thermodynamically unstable."
- **Comproportionation mnemonic**: "Com-PRO = PRO-duces ONE intermediate state from TWO extreme states."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for redox chemistry.

## Cross-Subject Connections
- **Industrial chemistry**: the Cl₂/alkali disproportionation underlies the industrial production of sodium hypochlorite (NaClO, household bleach) and sodium chlorate (NaClO₃, used in weed killers and paper production) — the product ratio is temperature-controlled.
- **Biochemistry**: H₂O₂ disproportionation is exploited in living cells: catalase (an enzyme) catalyses 2H₂O₂ → 2H₂O + O₂ at enormous rates (~10⁷ s⁻¹ per active site) to detoxify reactive H₂O₂ produced by oxidative metabolism.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.redox.disproportionation`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.redox.disproportionation` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

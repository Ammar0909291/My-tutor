# chem.redox.disproportionation — Disproportionation

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.redox.disproportionation` |
| Domain | Redox Reactions |
| Requires | `chem.redox.balancing` |
| Unlocks | (none) |
| Difficulty | proficient |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

Disproportionation requires the SAME element to SIMULTANEOUSLY increase AND decrease in oxidation state within one reaction — Cl₂ genuinely disproportionates with NaOH (Cl: 0→−1 and 0→+1 simultaneously), but does NOT disproportionate when reacting with Fe²⁺ (Cl only decreases, 0→−1; only ordinary redox, since Fe is oxidized instead), so "Cl₂ is reactive, therefore always disproportionates" is false — the diagnostic test is whether the SAME element splits into two different oxidation states; a species' stability is THERMODYNAMIC and MEDIUM-DEPENDENT — Cu⁺ is genuinely stable in solid CuCl (stabilized by lattice/Madelung energy) but spontaneously disproportionates in aqueous solution (because Cu²⁺'s much greater hydration enthalpy, from its higher charge density, makes 2Cu⁺(aq) energetically less favorable than Cu+Cu²⁺), so stability in one medium does NOT guarantee stability in another; and in the disproportionation 2Cu⁺→Cu+Cu²⁺, the electron transfer genuinely DOES balance — each Cu⁺ undergoes a ONE-electron change (one gains 1e⁻ to become Cu⁰, one loses 1e⁻ to become Cu²⁺), and the 1 electron gained by one exactly equals the 1 electron lost by the other, with overall oxidation-state sums balancing on both sides (+2 total).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing Cl₂+NaOH (Cl splits into two oxidation states, genuine disproportionation) against Cl₂+Fe²⁺ (Cl only decreases in oxidation state, ordinary redox, not disproportionation) side by side, applying the same-element-splits-in-two-directions test explicitly.

**Representational**: An oxidation-state bookkeeping table for 2Cu⁺→Cu+Cu²⁺, showing each Cu⁺'s individual electron change (+1e⁻ gained, −1e⁻ lost) and confirming the totals balance.

**Abstract**: The general diagnostic test for disproportionation (does the same element simultaneously increase and decrease in oxidation state?); the general principle that chemical stability is medium-dependent (solid-state lattice stabilization vs. aqueous hydration-enthalpy differences), never an absolute, universal property; the general principle that electron balance in disproportionation is verified per half-reaction, not by superficially "expecting" a mismatch.

**Transfer**: Given an unfamiliar reaction, correctly applying the same-element-splits-test to determine whether disproportionation is occurring; given an unfamiliar species stable in one medium, correctly assessing whether that stability transfers to a different medium (e.g., solid vs. aqueous); given an unfamiliar disproportionation equation, correctly verifying electron balance via per-atom oxidation-state bookkeeping.

## 3. Why Beginners Fail

Students observe that a reactive element like Cl₂ disproportionates in one well-known context (with NaOH) and generalize this to "Cl₂ is reactive, so it always disproportionates" regardless of reaction partner, missing that disproportionation is a SPECIFIC structural feature of a reaction (the same element simultaneously increasing and decreasing in oxidation state), not a general property of reactive elements — Cl₂ reacting with Fe²⁺ undergoes ordinary redox (Cl only reduced, Fe oxidized), not disproportionation; students see a species like Cu⁺ existing stably in a solid compound (CuCl) and assume this stability is an intrinsic, medium-independent property of the Cu⁺ ion itself, missing that stability is fundamentally THERMODYNAMIC and depends on the specific medium — solid CuCl's stability comes from lattice (Madelung) energy specific to the crystal structure, while in aqueous solution, the vastly different hydration-enthalpy relationship between Cu⁺ and Cu²⁺ makes disproportionation spontaneous instead; and students, when examining a disproportionation equation like 2Cu⁺→Cu+Cu²⁺, notice that one copper atom's oxidation state decreases by 1 while another's increases by 1, and mistakenly conclude the electron transfer numbers must therefore be mismatched (expecting some larger imbalance), missing that each Cu⁺ genuinely undergoes only a ONE-electron change, and the electrons gained by the reduced copper atom exactly equal those lost by the oxidized one — the equation is correctly balanced as written.

## 4. Misconception Library

### MC-1: Cl₂ always disproportionates in water/alkali because Cl₂ is reactive
- **Probe**: "Cl₂ reacts with cold dilute NaOH to give Cl⁻ and ClO⁻. Is Cl₂ disproportionating here? What about Cl₂ reacting with Fe²⁺?"
- **Characteristic phrase**: "Cl₂ is reactive, so it always disproportionates."
- **Trigger (Type 1, overgeneralization)**: Students generalize from a single well-known disproportionation example to conclude reactive elements disproportionate universally, rather than checking the reaction's specific structural feature.
- **Conflict evidence [P28]**: With NaOH → YES, disproportionation (Cl(0)→Cl⁻ and ClO⁻). With Fe²⁺ → NO: Cl₂+2Fe²⁺→2Cl⁻+2Fe³⁺. Here only Cl is reduced (0→−1) and Fe is oxidised (+2→+3). Cl does NOT split into two states — only reduction. This is ordinary redox, NOT disproportionation. The test: does Cl SIMULTANEOUSLY increase and decrease in OS?
- **Bridge [P30]**: Disproportionation is defined by a specific structural signature — the SAME element ending up in TWO DIFFERENT oxidation states as products of a single reaction — not merely by an element's general reactivity or its capacity to undergo redox at all; whether a given reaction is a disproportionation depends entirely on the SPECIFIC reaction partner and conditions, and must be checked case by case using the same-element-splits-test, never assumed from the element's identity alone.
- **Replacement [P31]**: Always apply the specific test — does the same element simultaneously increase AND decrease in oxidation state among the products? — before classifying a reaction as disproportionation; never infer it from general reactivity.
- **Discrimination pairs [P33]**: Cl₂+NaOH (Cl splits into Cl⁻ and ClO⁻, genuine disproportionation) vs. Cl₂+Fe²⁺ (Cl only reduced to Cl⁻, ordinary redox, not disproportionation) — same reactive element, different reaction partner, different classification.
- **S6 repair path**: Present both reactions side by side, applying the explicit same-element-splits-test to each, deriving the differing classification.

### MC-2: Cu⁺ in solid copper(I) compounds is stable, so Cu⁺ in water should also be stable
- **Probe**: "CuCl is a stable crystalline solid. Why does Cu⁺ disproportionate when CuCl dissolves in water?"
- **Characteristic phrase**: "Cu⁺ exists in CuCl, so Cu⁺ ions must be stable in solution."
- **Trigger (Type 5, instruction-induced)**: Students see Cu⁺ existing in a familiar stable solid and assume this stability is an intrinsic property of the ion, transferable across contexts.
- **Conflict evidence [P28]**: Stability is THERMODYNAMIC and medium-dependent. In the solid CuCl lattice, the Madelung energy stabilises Cu⁺. In aqueous solution, the difference in hydration enthalpies of Cu²⁺ vs. Cu⁺ (Cu²⁺ has far greater charge density→much larger hydration enthalpy) makes the Cu+Cu²⁺ combination energetically lower than 2Cu⁺(aq). E°cell=+0.37V confirms spontaneous disproportionation in water.
- **Bridge [P30]**: A species' thermodynamic stability is always the result of a specific balance of energetic contributions relevant to its ACTUAL environment — solid CuCl's stability comes from lattice (Madelung) energy, a factor entirely specific to the ordered crystal structure and absent for isolated aqueous ions, while aqueous Cu⁺'s fate instead depends on hydration-enthalpy differences, a completely different energetic factor; stability conferred by one mechanism in one medium provides no guarantee of stability under a different mechanism in a different medium.
- **Replacement [P31]**: Always assess stability specifically for the relevant medium (solid-state lattice energy vs. aqueous hydration enthalpy are different mechanisms) — never assume stability in one context transfers to another.
- **Discrimination pairs [P33]**: Solid CuCl (Cu⁺ stabilized by lattice/Madelung energy) vs. aqueous Cu⁺ (destabilized relative to Cu+Cu²⁺ by hydration-enthalpy differences, spontaneously disproportionates, E°cell=+0.37V).
- **S6 repair path**: Present the explicit energetic comparison (lattice energy vs. hydration enthalpy) for the two media, deriving the differing stability outcomes.

### MC-3: In 2Cu⁺ → Cu + Cu²⁺, the OS numbers don't balance because one Cu goes from +1 to 0 (gains 1e) and one goes from +1 to +2 (loses 1e), but there should be 2 electrons transferred
- **Probe**: "Write the half-equations for 2Cu⁺ → Cu + Cu²⁺ and count electrons."
- **Characteristic phrase**: "the electron transfer doesn't balance."
- **Trigger (Type 4, notation-induced)**: Students may expect a larger or mismatched electron count when seeing two different Cu products, without explicitly counting each half-reaction's electrons.
- **Conflict evidence [P28]**: Each Cu⁺ undergoes a ONE-ELECTRON change. One Cu⁺ gains 1 electron (Cu⁺+e⁻→Cu); one Cu⁺ loses 1 electron (Cu⁺→Cu²⁺+e⁻). The 1 electron gained by the first equals the 1 electron lost by the second — the electrons balance perfectly (both 1e). Total: 2Cu⁺→Cu+Cu²⁺. OS balances: two atoms each at +1 on left; one at 0 and one at +2 on right→sum is +2 on both sides. ✓
- **Bridge [P30]**: Perceiving two different products (Cu⁰ and Cu²⁺) as automatically implying a mismatched or larger electron transfer overlooks that each individual Cu⁺ atom undergoes its OWN separate, single-electron change — the overall reaction's electron balance is simply the sum of these two individually-balanced half-reactions, and explicitly writing out and counting each half-reaction's electrons (rather than intuiting from the overall equation's appearance) reveals the balance directly.
- **Replacement [P31]**: Always write out and count electrons in each individual half-reaction separately before judging overall balance — a disproportionation with two different products doesn't imply a mismatched electron count; verify via explicit half-reaction bookkeeping.
- **Discrimination pairs [P33]**: Half-reaction 1 (Cu⁺+e⁻→Cu, 1 electron gained) + half-reaction 2 (Cu⁺→Cu²⁺+e⁻, 1 electron lost) — both individually 1-electron changes, summing to a balanced overall equation.
- **S6 repair path**: Present the explicit two half-reactions side by side with electron counts labeled, confirming the balance directly.

## 5. Explanation Library

**Primary explanation**: Disproportionation is defined by a specific structural signature — the same element simultaneously appearing at two different oxidation states among the products of a single reaction — and must be verified case by case via this specific test, never inferred from an element's general reactivity, since the same element (Cl₂) can disproportionate with one reaction partner (NaOH) while undergoing ordinary redox with another (Fe²⁺).

**Secondary explanation (medium-dependent stability and electron-balance verification)**: A species' thermodynamic stability depends on the specific energetic factors relevant to its actual medium — solid-state lattice energy and aqueous hydration enthalpy are entirely different mechanisms, so stability in one medium (Cu⁺ in solid CuCl) provides no guarantee of stability in another (Cu⁺ in aqueous solution, where it spontaneously disproportionates). Electron balance in a disproportionation reaction should always be verified by writing out and counting each individual half-reaction's electrons, rather than intuiting from the overall equation's appearance.

## 6. Analogy Library

- **Primary analogy**: A single crowd of identical people (one element) being SPLIT into two genuinely different destinations (two different oxidation states) in one event — this is disproportionation; a crowd all moving to just ONE new destination (one oxidation-state change) while a DIFFERENT crowd moves the opposite way is ordinary redox, not disproportionation.
- **Breaking point**: The crowd-splitting analogy conveys the same-element-two-directions signature well but doesn't naturally capture the medium-dependent stability argument (MC-2) or the per-half-reaction electron-balance verification (MC-3) — those need the explicit energetic comparison and the half-reaction bookkeeping.
- **Anti-analogy**: Do NOT say "reactive elements always disproportionate with reactive partners" — this directly reinforces MC-1 by substituting a general-reactivity heuristic for the specific same-element-splits test.

## 7. Demonstration Library

- **Demonstration 1 (side-by-side Cl₂+NaOH vs. Cl₂+Fe²⁺ same-element-splits test)**: Apply the explicit oxidation-state test to both reactions, deriving the differing classification.
- **Demonstration 2 (lattice-energy-vs-hydration-enthalpy comparison for Cu⁺ stability)**: Present the explicit energetic comparison for solid CuCl vs. aqueous Cu⁺, deriving the differing stability outcome.
- **Demonstration 3 (per-half-reaction electron-balance verification for 2Cu⁺→Cu+Cu²⁺)**: Write out both half-reactions explicitly with electron counts, confirming the overall balance.

## 8. Discovery Lesson

**Opening**: "Cl₂ disproportionates with NaOH. Does it also disproportionate with Fe²⁺, just because it's a reactive element?"

**Exploration**: Students apply the same-element-splits test to both reactions, discovering Cl₂+Fe²⁺ is ordinary redox, not disproportionation.

**Synthesis**: Guide toward: disproportionation is a specific structural signature, not a general property of reactive elements — always test case by case.

**Closure**: "If Cu⁺ is stable in solid CuCl, is it also stable in aqueous solution?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit side-by-side same-element-splits test for Cl₂+NaOH and Cl₂+Fe²⁺.
- **TA-2 (TELL)**: State the medium-dependent stability principle explicitly, anchored to the lattice-energy-vs-hydration-enthalpy comparison.
- **TA-3 (DO)**: Student applies the same-element-splits test to an unfamiliar reaction to classify it as disproportionation or ordinary redox.
- **TA-4 (TEST-THINKING)**: Present the 2Cu⁺→Cu+Cu²⁺ electron-balance probe and ask the student to verify balance via explicit half-reactions.

## 10. Voice Teaching

Whenever disproportionation is assessed, narrate "check if the same element splits into two different oxidation states — never assume from reactivity alone." Whenever species stability is discussed across media, state "check the specific medium's energetics — stability doesn't automatically transfer" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly apply the same-element-splits test to classify a reaction as disproportionation or ordinary redox, (b) correctly explain medium-dependent stability differences, (c) correctly verify electron balance in a disproportionation via half-reactions.

- **FA-1**: "Cl₂ reacts with cold dilute NaOH to give Cl⁻ and ClO⁻. Is Cl₂ disproportionating here? What about Cl₂ reacting with Fe²⁺?" — targets MC-1.
- **FA-2**: "CuCl is a stable crystalline solid. Why does Cu⁺ disproportionate when CuCl dissolves in water?" — targets MC-2.
- **FA-3**: "Write the half-equations for 2Cu⁺ → Cu + Cu²⁺ and count electrons." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only encountered one disproportionation example (Cl₂+NaOH) without a contrasting ordinary-redox case.

**Delayed retrieval**: Re-probe MC-1's same-element-splits test and MC-2's medium-dependent stability principle as foundational knowledge for subsequent inorganic and electrochemistry applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the disproportionation-classification confusion, have the student explicitly write out oxidation states for every atom in both reactants and products before classifying.
- **S4 (frustrated)**: Normalize — inferring disproportionation from general reactivity is genuinely common on first exposure, since the concept is often introduced via a single memorable example.
- **S6 (collision)**: Use the explicit lattice-energy-vs-hydration-enthalpy comparison for MC-2; use the per-half-reaction electron count for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why Cl₂+Fe²⁺ is not disproportionation despite Cl₂ being a reactive element.

## 13. Memory & Review

Tag as one procedural memory (same-element-splits diagnostic test) plus two conceptual-correction memories (medium-dependent thermodynamic stability; per-half-reaction electron-balance verification). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates redox-balancing reasoning built across `chem.redox.balancing`, forming a capstone application to inorganic chemistry and electrochemical-stability contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

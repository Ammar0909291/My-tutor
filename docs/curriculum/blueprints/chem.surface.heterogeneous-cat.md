# chem.surface.heterogeneous-cat — Mechanism of Heterogeneous Catalysis

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.surface.heterogeneous-cat` |
| Domain | Surface Chemistry |
| Requires | `chem.surface.adsorption`, `chem.kinet.mechanism` |
| Unlocks | (none) |
| Difficulty | advanced |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

A catalyst does NOT provide energy to reactants — it provides an ALTERNATIVE REACTION PATHWAY with a LOWER activation energy (e.g., the Fe catalyst in the Haber process lets N₂ adsorb onto its surface, where the Fe–N bond partially breaks the N≡N triple bond, starting bond-breaking at a lower-energy surface-mediated route) — the catalyst changes the ROUTE (makes the energy "mountain" smaller), never supplies energy to help molecules over the original barrier; the Haber process uses an Fe (iron) catalyst (activating N≡N via surface adsorption) while the Contact process uses V₂O₅ (vanadium pentoxide, via Mars-van Krevelen redox cycling between V⁵⁺ and V⁴⁺) — these are NOT interchangeable, and confusing them (assigning V₂O₅ to Haber) is a common but incorrect swap; and catalyst poisoning does NOT necessarily destroy ALL catalytic activity — the actual activity loss depends on WHICH sites are poisoned (if the most reactive/active sites are selectively poisoned first, as is often physically the case, activity loss can exceed the raw percentage of sites blocked; but if 90% of sites remain clean, substantial activity persists) — "poison" does not mean "total, complete deactivation" by definition.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Tracing the explicit Fe-surface mechanism for N₂ activation in the Haber process — N₂ adsorbing, Fe–N bond partially breaking N≡N — as the specific alternative pathway that lowers Ea, rather than any energy being "given" to the reactants.

**Representational**: A side-by-side energy diagram comparing the uncatalyzed (high-Ea, direct gas-phase collision) and catalyzed (lower-Ea, surface-mediated) pathways for the same reaction, with identical starting/ending energy levels (same ΔH) but a genuinely different, lower "mountain" for the catalyzed route.

**Abstract**: The general principle that catalysts provide alternative, lower-Ea pathways, never energy input, to accelerate reactions; the general principle that specific industrial catalysts (Fe for Haber, V₂O₅ for Contact) are tied to specific mechanisms, not interchangeable; the general principle that poisoning's effect on activity depends on which specific sites are blocked, not simply the raw percentage.

**Transfer**: Given an unfamiliar catalyzed reaction, correctly explaining the catalyst's role as providing an alternative pathway, never energy; given an unfamiliar industrial process, correctly identifying the specific catalyst used from its mechanistic role; given an unfamiliar poisoning scenario, correctly assessing activity loss from which specific sites are affected, not merely the percentage poisoned.

## 3. Why Beginners Fail

Students hear casual framing like "the catalyst helps the reaction" and interpret "helps" as implying the catalyst somehow supplies additional energy to the reactant molecules, missing that the catalyst's actual mechanism is to provide a genuinely DIFFERENT reaction pathway (often via surface adsorption and partial bond-breaking, as in Fe's role in Haber) with a LOWER activation energy — the catalyst changes the route taken, never adds energy to help molecules surmount the original, unchanged barrier; students, having studied the Haber process and Contact process together in the same unit without a memorable distinguishing mnemonic, swap which catalyst belongs to which process, missing that Fe (iron) is specifically tied to the Haber process's N≡N-activation mechanism, while V₂O₅ (vanadium pentoxide) is specifically tied to the Contact process's Mars-van Krevelen redox mechanism — these are chemically distinct catalysts with distinct mechanisms, not interchangeable labels; and students interpret the word "poison" as implying total, complete deactivation (an everyday sense of "poison = death = full incapacitation"), missing that catalyst poisoning's actual severity depends on WHICH specific active sites are blocked — since a catalyst may have multiple types of active sites with varying reactivity, poisoning even a modest fraction of sites can produce disproportionately large activity loss if those happen to be the MOST active sites, while poisoning could also leave substantial activity intact if less-critical sites are affected.

## 4. Misconception Library

### MC-1: The catalyst provides energy to the reactants
- **Probe**: "Explain HOW the Fe catalyst in the Haber process makes the reaction go faster."
- **Characteristic phrase**: "The Fe catalyst gives the N₂ and H₂ molecules more energy so they can overcome the activation barrier."
- **Trigger (Type 5, instruction-induced)**: "Helps" language suggests energy input. Students conflate "lowering Ea" (what the catalyst does) with "providing activation energy" (what a heat source does).
- **Conflict evidence [P28]**: The Fe catalyst provides an alternative reaction pathway — one where N₂ adsorbs onto the Fe surface, and the Fe–N bond partially breaks the N≡N bond (starting the triple bond breaking at the surface). This surface pathway has a lower Ea than the gas-phase direct collision. The catalyst does not supply energy; it changes the route, making the mountain smaller. The same final products and the same ΔH are reached.
- **Bridge [P30]**: Two entirely different mechanisms could, in principle, help reactant molecules overcome an activation barrier — supplying MORE ENERGY (raising the molecules' energy level to clear the SAME fixed barrier, as heating does) or providing a genuinely DIFFERENT PATHWAY with a LOWER barrier (leaving the molecules' energy unchanged but requiring less energy to cross) — a catalyst specifically does the latter, and the casual "helps the reaction" phrasing, while colloquially accurate about the outcome (faster reaction), doesn't specify which of these two very different mechanisms is actually responsible.
- **Replacement [P31]**: A catalyst provides an alternative reaction pathway with lower activation energy — it never supplies energy to reactant molecules; the reaction proceeds faster because the barrier itself is lower, not because molecules have more energy to clear an unchanged barrier.
- **Discrimination pairs [P33]**: Heating (raises reactant energy to clear the SAME barrier) vs. catalysis (provides a genuinely DIFFERENT, lower barrier, reactant energy unchanged) — both speed up reactions, via entirely different mechanisms.
- **S6 repair path**: Present the explicit side-by-side energy diagram for catalyzed vs. uncatalyzed pathways, showing the same start/end energy levels but a genuinely lower barrier for the catalyzed route.

### MC-2: Haber process uses V₂O₅ catalyst; Contact process uses Fe
- **Probe**: "Which catalyst is used in the industrial production of ammonia? Which is used in sulfuric acid manufacture?"
- **Characteristic phrase**: "V₂O₅ is used in the Haber process for ammonia."
- **Trigger (Type 5, instruction-induced)**: Both high-profile processes studied back to back; the catalyst names are not tied to any memorable chemical logic, inviting a swap.
- **Conflict evidence [P28]**: Haber=Fe (iron, for N₂ dissociation — needs a transition metal that activates the N≡N triple bond). Contact=V₂O₅ (vanadium pentoxide — works via Mars-van Krevelen redox cycling between V⁵⁺ and V⁴⁺). Memory anchor: Haber=Fe (H is the first letter; F is the next heavy consonant); Contact=V₂O₅ — V for vanadium, V for variable oxidation state of vanadium.
- **Bridge [P30]**: The two catalysts are tied to genuinely different chemical MECHANISMS specific to each process's reaction requirements — Fe's particular d-electron configuration is what makes it effective at activating and partially breaking the exceptionally strong N≡N triple bond in the Haber process, while V₂O₅'s ability to cycle between V⁵⁺ and V⁴⁺ oxidation states is what enables the specific redox mechanism (Mars-van Krevelen) required for the Contact process's SO₂-to-SO₃ oxidation — the catalysts are not arbitrary labels but mechanistically essential to their respective specific reactions.
- **Replacement [P31]**: Always tie each catalyst to its specific mechanistic role (Fe activates N≡N in Haber; V₂O₅ cycles oxidation states via Mars-van Krevelen in Contact) — never treat the two catalyst assignments as interchangeable or arbitrary.
- **Discrimination pairs [P33]**: Haber process (Fe catalyst, N≡N activation via surface adsorption) vs. Contact process (V₂O₅ catalyst, Mars-van Krevelen redox cycling) — genuinely different mechanisms requiring genuinely different catalyst chemistries.
- **S6 repair path**: Present the explicit mechanistic role of each catalyst (Fe's d-electron N≡N activation; V₂O₅'s V⁵⁺/V⁴⁺ redox cycling), grounding the correct assignment in chemical necessity rather than memorization alone.

### MC-3: Catalyst poisoning always destroys all catalytic activity
- **Probe**: "A heterogeneous catalyst is poisoned by 10% coverage of its active sites by sulfur compounds. Does it lose 10% of its activity, more than 10%, or all activity?"
- **Characteristic phrase**: "Catalyst poisoning means the catalyst is completely deactivated."
- **Trigger (Type 1, overgeneralization)**: The word "poison" implies total killing. In reality, catalysts may have multiple types of active sites; some may be selectively blocked while others remain active.
- **Conflict evidence [P28]**: The effect depends on whether the poisoned sites are randomly distributed or selectively the most active sites. If the 10% of sites poisoned are the most active ones (often true — the most reactive sites bind poisons most readily), activity loss may be >10%. But if 90% of sites remain clean, the catalyst retains substantial activity. Complete deactivation requires either all sites being poisoned or the catalyst's structural integrity being destroyed.
- **Bridge [P30]**: The everyday word "poison" (implying total incapacitation, as with a poisoned organism) does not map directly onto the technical, quantitative concept of partial ACTIVE-SITE coverage — a heterogeneous catalyst's surface typically contains many individual active sites, and "poisoning" specifically means some FRACTION of these sites becoming permanently blocked, with the overall activity consequence depending on both the fraction blocked AND whether those specific sites happen to be disproportionately more or less reactive than average.
- **Replacement [P31]**: Catalyst poisoning's activity-loss consequence depends on the specific fraction and reactivity-ranking of the sites blocked — never assume any degree of poisoning implies total deactivation, and recognize that poisoning the MOST active sites can cause disproportionately large activity loss relative to the raw percentage blocked.
- **Discrimination pairs [P33]**: 10% random-site poisoning (roughly proportional ~10% activity loss expected) vs. 10% most-active-site poisoning (disproportionately larger activity loss, since the most reactive sites contribute more than their numerical share to overall activity).
- **S6 repair path**: Present the explicit distinction between random and selective site-poisoning scenarios, deriving the differing activity-loss consequences for each.

## 5. Explanation Library

**Primary explanation**: A catalyst accelerates a reaction by providing an alternative reaction pathway with genuinely lower activation energy (e.g., Fe's surface-mediated N≡N activation in the Haber process) — it never supplies energy to reactant molecules, and the reaction reaches the same products via the same overall ΔH, just via a lower-barrier route. Industrial catalysts are tied to specific mechanistic roles — Fe for Haber's N≡N activation, V₂O₅ for Contact's Mars-van Krevelen redox cycling — never interchangeable.

**Secondary explanation (poisoning's activity-loss depends on site specificity)**: Catalyst poisoning's actual effect on overall activity depends on the specific fraction and reactivity of the active sites blocked, not merely the raw percentage — poisoning the most reactive sites first (often the physically realistic case) can cause disproportionately large activity loss, while poisoning less-critical sites can leave substantial activity intact, contradicting a blanket "poisoned=totally deactivated" assumption.

## 6. Analogy Library

- **Primary analogy**: A mountain tunnel (catalyst's lower-Ea pathway) carved through a mountain (the original high-Ea barrier) — travelers (reactant molecules) still need the same amount of "climbing effort" per unit distance, but the total distance/height to traverse is genuinely shorter via the tunnel, never because travelers were given extra energy.
- **Breaking point**: The mountain-tunnel analogy conveys the alternative-pathway concept well but doesn't naturally capture the catalyst-specificity distinction (MC-2) or the site-dependent poisoning severity (MC-3) — those need the explicit mechanistic-role explanation and the random-vs-selective poisoning comparison.
- **Anti-analogy**: Do NOT say "the catalyst gives the molecules a boost of energy" — this directly reinforces MC-1 by implying energy supply rather than pathway alteration.

## 7. Demonstration Library

- **Demonstration 1 (side-by-side catalyzed/uncatalyzed energy diagram)**: Present both energy diagrams explicitly, showing identical start/end levels but a genuinely lower barrier for the catalyzed pathway.
- **Demonstration 2 (Fe/V₂O₅ mechanistic-role comparison)**: Present the explicit mechanistic role of each catalyst, grounding the Haber/Contact assignment in chemical necessity.
- **Demonstration 3 (random-vs-selective site-poisoning comparison)**: Present both poisoning scenarios explicitly, deriving the differing activity-loss consequences.

## 8. Discovery Lesson

**Opening**: "Does the Fe catalyst in the Haber process give N₂ and H₂ molecules more energy?"

**Exploration**: Students trace the explicit surface-adsorption mechanism, discovering the catalyst provides a lower-energy pathway, not extra energy.

**Synthesis**: Guide toward: catalysts change the route (lower Ea), never supply energy to reactants.

**Closure**: "If 10% of a catalyst's active sites are poisoned, does it lose exactly 10% of its activity?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit side-by-side catalyzed/uncatalyzed energy diagram.
- **TA-2 (TELL)**: State the Fe/V₂O₅ specific mechanistic roles explicitly, anchored to the Haber/Contact process distinction.
- **TA-3 (DO)**: Student assesses activity loss for an unfamiliar poisoning scenario, considering site specificity.
- **TA-4 (TEST-THINKING)**: Present the "10% poisoning" probe and ask the student to justify why activity loss might exceed 10%.

## 10. Voice Teaching

Whenever a catalyst's role is explained, narrate "alternative pathway, lower Ea — never extra energy for the reactants." Whenever industrial catalysts are named, state "Fe for Haber, V₂O₅ for Contact — tied to specific mechanisms, never interchangeable" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly explain a catalyst's role as providing a lower-Ea pathway, never energy, (b) correctly identify Fe for Haber and V₂O₅ for Contact from their specific mechanisms, (c) correctly assess poisoning's activity-loss consequence from site specificity.

- **FA-1**: "Explain HOW the Fe catalyst in the Haber process makes the reaction go faster." — targets MC-1.
- **FA-2**: "Which catalyst is used in the industrial production of ammonia? Which is used in sulfuric acid manufacture?" — targets MC-2.
- **FA-3**: "A heterogeneous catalyst is poisoned by 10% coverage of its active sites. Does it lose exactly 10% of its activity?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-2 among students who have studied Haber and Contact processes in immediate succession without a distinguishing mechanistic anchor.

**Delayed retrieval**: Re-probe MC-1's alternative-pathway mechanism and MC-2's catalyst-specificity distinction as foundational knowledge for subsequent industrial-chemistry and catalysis-design applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the energy-supply confusion, have the student explicitly draw the energy diagram before describing the catalyst's role in words.
- **S4 (frustrated)**: Normalize — casual "helps the reaction" language genuinely invites the energy-supply misconception on first exposure.
- **S6 (collision)**: Use the explicit mechanistic-role comparison for MC-2; use the random-vs-selective poisoning comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why poisoning the most active sites causes disproportionate activity loss.

## 13. Memory & Review

Tag as one conceptual-correction memory (alternative-pathway, not energy-supply, catalyst mechanism) plus two conceptual-correction memories (catalyst-specific mechanistic roles; site-dependent poisoning severity). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates adsorption and reaction-mechanism reasoning built across `chem.surface.adsorption` and `chem.kinet.mechanism`, forming a capstone application to industrial catalysis and process-chemistry contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

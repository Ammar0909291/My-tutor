# chem.dblock.organometallics — Organometallic Chemistry

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.dblock.organometallics` |
| Domain | D-Block Elements |
| Requires | `chem.coord.cft`, `chem.dblock.general` |
| Unlocks | (none) |
| Difficulty | expert |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

The 18-electron count for a complex like Cr(CO)₆ is NOT simply the ligand-donated electrons alone (6×2=12≠18) — the metal's OWN d electrons must be counted FIRST (Cr(0) is d⁶, contributing 6 electrons FROM THE METAL), and the ligand-donated electrons (6 CO×2e=12) are ADDED to this metal count, giving the correct total 6+12=18 — omitting the metal's own d-electron contribution is a common but fundamental counting error; ferrocene's stability does NOT come from simple ionic Fe²⁺/Cp⁻ electrostatic attraction — ferrocene is volatile (sublimes), soluble in non-polar solvents, and undergoes electrophilic aromatic substitution, all properties of a genuinely COVALENTLY bonded molecule (substantial Fe-d-orbital/Cp-π-system overlap, π-sandwich MO bonding) — the "Fe²⁺+2Cp⁻" formulation is a useful electron-counting FORMALISM only, never an accurate description of the actual bonding; and a catalyst that changes oxidation state during a mechanism (e.g., Rh(I)→Rh(III) upon oxidative addition) is NOT thereby "consumed" or "used up" — the catalytic cycle's defining feature is that reductive elimination RESTORES the original oxidation state (Rh(III)→Rh(I)) by the cycle's end, with the NET change over one complete cycle being exactly zero — oxidation-state changes mid-cycle do not imply consumption.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Computing Cr(CO)₆'s 18-electron count explicitly step by step — Cr(0)=d⁶ (6 electrons from metal) + 6CO×2e (12 electrons donated) = 18 total — making the two-part addition concrete.

**Representational**: A side-by-side property comparison table for ferrocene (volatile, non-polar-soluble, undergoes EAS — covalent-molecule properties) against a genuine ionic salt (non-volatile, water-soluble, no EAS), isolating which property set ferrocene actually matches.

**Abstract**: The general principle that electron counting in organometallic complexes requires summing BOTH the metal's own d electrons AND the ligand-donated electrons, never ligand donation alone; the general principle that a bonding "formalism" (useful for electron counting) can be entirely distinct from the actual physical bonding description; the general principle that a catalyst's mid-cycle oxidation-state changes are consistent with (and expected of) catalytic function, never evidence of consumption, as long as the cycle returns to its starting state.

**Transfer**: Given an unfamiliar organometallic complex, correctly computing the total electron count by summing metal d electrons and ligand donation; given an unfamiliar metal-cyclopentadienyl or similar "ionic-formula" complex, correctly assessing actual bonding character from physical properties, not the formal ionic notation; given an unfamiliar catalytic cycle, correctly tracking oxidation-state changes through a full cycle to confirm net-zero consumption.

## 3. Why Beginners Fail

Students, when counting a complex's total valence electrons, focus exclusively on the ligand-donated electrons (multiplying ligand count by donor number) and forget to separately add the metal's own d electrons, missing that the correct total requires FIRST determining the metal's formal oxidation state and resulting d-electron count, THEN adding the ligand contribution — omitting the metal's own electrons produces a systematically undercounted total (e.g., 12 instead of the correct 18 for Cr(CO)₆); students, seeing ferrocene commonly WRITTEN or formally described using an ionic notation (Fe²⁺+2Cp⁻, a convenient electron-counting shorthand), assume this notation accurately describes the ACTUAL physical bonding in the molecule, missing that ferrocene's real, observed physical and chemical properties (volatility, non-polar solubility, electrophilic aromatic substitution reactivity) are all diagnostic of genuine COVALENT bonding (substantial orbital overlap in a π-sandwich structure), directly contradicting what a truly ionic compound would exhibit; and students, observing that a catalyst like Wilkinson's undergoes a genuine oxidation-state change partway through its catalytic cycle (Rh(I)→Rh(III)), reason that "changing" implies "being consumed" or "used up" (an everyday intuition that a transformed substance is no longer the original), missing that the catalytic cycle's defining, essential feature is that a LATER step (reductive elimination) restores the ORIGINAL oxidation state, so the NET change over one complete cycle is exactly zero — this cyclical restoration, not the absence of any intermediate change, is what makes something a genuine catalyst.

## 4. Misconception Library

### MC-1: CO is a 2-electron donor so Cr(CO)₆ has 2 + 6 = 8 electrons
- **Probe**: "What is the d electron count for Cr in Cr(CO)₆ BEFORE counting the CO donation?"
- **Characteristic phrase**: "6 CO × 2e = 12 electrons total."
- **Trigger (Type 4, notation-induced)**: Focusing exclusively on the ligand-donation arithmetic (which is itself correct as far as it goes) leads to omitting the separate metal-electron-count step entirely.
- **Conflict evidence [P28]**: In the ionic counting method, you FIRST determine the metal's formal oxidation state and d electron count. Cr in Cr(CO)₆ is Cr(0)→d⁶→6 electrons FROM THE METAL. Then add: 6 CO×2e=12e donated. Total=6+12=18. The metal's own electrons are NOT zero — they are the d electrons. The ligands ADD to the metal's own count.
- **Bridge [P30]**: The complete electron count around a metal center in an organometallic complex is a SUM of two genuinely separate contributions — the metal's own retained d electrons (determined from its formal oxidation state) AND the electrons donated by each coordinated ligand — omitting either contribution (most commonly the metal's own electrons, since ligand-donation arithmetic is more procedurally memorable) produces a systematically incomplete, undercounted total that will not correctly predict the complex's stability via the 18-electron rule.
- **Replacement [P31]**: Always compute the total electron count as (metal's own d electrons, from its formal oxidation state) PLUS (total electrons donated by all ligands) — never omit the metal's own contribution.
- **Discrimination pairs [P33]**: Correct total for Cr(CO)₆ (6 metal d electrons+12 ligand-donated electrons=18) vs. incomplete total (only 12 ligand-donated electrons, omitting the metal's own d⁶ contribution).
- **S6 repair path**: Present the explicit two-step computation (metal d-electron count, then ligand donation, then sum), reinforcing that both contributions are required.

### MC-2: Ferrocene is stable because iron forms ionic bonds with the cyclopentadienyl anion
- **Probe**: "What evidence would distinguish an ionic compound from a covalently bonded organometallic?"
- **Characteristic phrase**: "Fe²⁺ and two Cp⁻ are just attracted by charges."
- **Trigger (Type 5, instruction-induced)**: The convenient "Fe²⁺+2Cp⁻" formalism used for electron counting is mistaken for an accurate description of the actual physical bonding.
- **Conflict evidence [P28]**: Ferrocene does NOT behave like an ionic compound — it is volatile (sublimes), soluble in non-polar solvents, and undergoes electrophilic aromatic substitution on the Cp rings. These are properties of a COVALENTLY bonded molecule, not an ionic salt. The bonding involves substantial overlap of Fe d orbitals with the Cp π system (π-sandwich bonding via MO theory). The ionic formulation (Fe²⁺+2Cp⁻) is a FORMALISM for electron counting only, not a description of the actual bonding.
- **Bridge [P30]**: The "Fe²⁺+2Cp⁻" notation is specifically a bookkeeping CONVENTION useful for systematically counting electrons (assigning formal charges to simplify the arithmetic), but this convention does not claim to describe the actual quantum-mechanical bonding — the observed macroscopic properties of a substance (volatility, solubility, characteristic reactivity patterns) are the genuine, empirical evidence for its actual bonding character, and ferrocene's properties are unambiguously those of a covalently-bonded molecule, not an ionic salt.
- **Replacement [P31]**: The "Fe²⁺+2Cp⁻" ionic formulation is an electron-counting formalism only — ferrocene's actual bonding is covalent (substantial Fe-d/Cp-π orbital overlap), as confirmed by its volatility, non-polar solubility, and electrophilic aromatic substitution reactivity.
- **Discrimination pairs [P33]**: Genuine ionic salt (non-volatile, water-soluble, no aromatic substitution chemistry) vs. ferrocene (volatile, non-polar-soluble, genuine electrophilic aromatic substitution) — ferrocene's actual properties match covalent, not ionic, bonding.
- **S6 repair path**: Present the explicit property comparison table, having the student match ferrocene's observed properties against genuine ionic vs. covalent bonding expectations.

### MC-3: Wilkinson's catalyst is consumed in the reaction because Rh(I) becomes Rh(III) after H₂ addition — so it must be reduced back
- **Probe**: "After reductive elimination of the alkane, what is the oxidation state and electron count of rhodium?"
- **Characteristic phrase**: "it changes oxidation state so it must be used up."
- **Trigger (Type 2, perceptual intuition)**: An everyday intuition that any substance undergoing a chemical "change" (oxidation state change) is thereby transformed/consumed, rather than potentially cycling back.
- **Conflict evidence [P28]**: Reductive elimination reverses the oxidative addition — Rh(III)→Rh(I) is restored as the alkane is expelled. The catalyst cycles: Rh(I)→Rh(III)→Rh(I). The NET change over a complete catalytic cycle is zero: catalyst ends in the same state it started. This is the definition of a catalyst.
- **Bridge [P30]**: A catalyst's defining feature is not the ABSENCE of any chemical change during the reaction mechanism — a genuine catalyst can and typically does undergo real, intermediate transformations (like oxidation-state changes) at various steps — but rather that the COMPLETE CYCLE of these transformations returns the catalyst to its exact original state by the cycle's end, meaning the catalyst is available to repeat the cycle indefinitely, never net-consumed despite genuinely changing partway through.
- **Replacement [P31]**: A catalyst undergoing an intermediate oxidation-state change is not thereby consumed — check whether the COMPLETE cycle restores the original state (as it does for Wilkinson's catalyst, Rh(I)→Rh(III)→Rh(I)), confirming zero net consumption.
- **Discrimination pairs [P33]**: Mid-cycle Rh(III) intermediate (a genuine, real oxidation-state change, but not the catalyst's final state) vs. the complete cycle's net result (Rh returns to Rh(I), zero net consumption) — the intermediate change does not imply consumption.
- **S6 repair path**: Present the explicit full catalytic cycle diagram with arrows, tracing Rh's oxidation state through every step and confirming it returns to its starting value.

## 5. Explanation Library

**Primary explanation**: An organometallic complex's total electron count requires summing BOTH the metal's own retained d electrons (from its formal oxidation state) AND the total electrons donated by all coordinated ligands — omitting the metal's own contribution produces a systematic undercount. The formal "ionic" notation sometimes used for electron-counting purposes (like Fe²⁺+2Cp⁻ for ferrocene) is a bookkeeping convention only, never an accurate description of the actual bonding — ferrocene's genuine physical properties (volatility, non-polar solubility, electrophilic aromatic substitution) confirm it is covalently, not ionically, bonded.

**Secondary explanation (catalytic cycles and net-zero consumption)**: A catalyst can genuinely undergo real, intermediate oxidation-state changes during its mechanism (like Rh(I)→Rh(III) upon oxidative addition) without being consumed — the defining feature of a catalytic cycle is that later steps (like reductive elimination) restore the catalyst to its exact original state, making the net change over one complete cycle exactly zero.

## 6. Analogy Library

- **Primary analogy**: A delivery truck (the catalyst) that genuinely changes its cargo load (oxidation state) mid-route but returns to its depot completely empty and ready for the next delivery (restored to its original state) — the mid-route change doesn't mean the truck itself is "used up."
- **Breaking point**: The delivery-truck analogy conveys the cyclical-restoration concept for catalysts well but doesn't naturally capture the two-part electron-counting requirement (MC-1) or the formalism-vs-actual-bonding distinction for ferrocene (MC-2) — those need the explicit two-step electron count and the property-comparison table.
- **Anti-analogy**: Do NOT say "Fe²⁺ and Cp⁻ are just held together by simple charge attraction, like table salt" — this directly reinforces MC-2 by treating the electron-counting formalism as an accurate bonding description.

## 7. Demonstration Library

- **Demonstration 1 (two-step electron-count computation for Cr(CO)₆)**: Present the explicit metal-d-electron-count step followed by the ligand-donation step, summing to the correct total.
- **Demonstration 2 (ferrocene property-comparison table vs. genuine ionic salt)**: Present both property sets explicitly, matching ferrocene's actual properties to covalent, not ionic, bonding.
- **Demonstration 3 (full Wilkinson's-catalyst cycle diagram)**: Present the explicit cycle with oxidation states labeled at each step, confirming the net-zero restoration.

## 8. Discovery Lesson

**Opening**: "If CO donates 2 electrons and Cr(CO)₆ has 6 CO ligands, is the total electron count just 12?"

**Exploration**: Students compute Cr's own d-electron count separately, discovering the correct total requires adding both contributions.

**Synthesis**: Guide toward: electron counting requires summing the metal's own electrons AND ligand donation, never ligand donation alone.

**Closure**: "Is ferrocene's Fe-Cp bonding really just ionic attraction, like a salt?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit two-step electron-count computation for Cr(CO)₆.
- **TA-2 (TELL)**: State the formalism-vs-actual-bonding distinction for ferrocene explicitly, anchored to the property-comparison table.
- **TA-3 (DO)**: Student traces an unfamiliar catalytic cycle's oxidation-state changes to confirm net-zero consumption.
- **TA-4 (TEST-THINKING)**: Present the Wilkinson's-catalyst probe and ask the student to justify why the mid-cycle oxidation-state change doesn't imply consumption.

## 10. Voice Teaching

Whenever electron counting is performed, narrate "metal's own d electrons first, then add ligand donation — never skip the metal's contribution." Whenever a catalyst's mechanism is traced, state "check the complete cycle for net-zero restoration, never assume mid-cycle change means consumption" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly compute total electron count by summing metal d electrons and ligand donation, (b) correctly distinguish ferrocene's actual covalent bonding from the ionic electron-counting formalism, (c) correctly confirm a catalyst's net-zero consumption from its complete cycle.

- **FA-1**: "What is the d electron count for Cr in Cr(CO)₆ BEFORE counting the CO donation?" — targets MC-1.
- **FA-2**: "What evidence would distinguish an ionic compound from a covalently bonded organometallic?" — targets MC-2.
- **FA-3**: "After reductive elimination of the alkane, what is the oxidation state and electron count of rhodium?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only practiced ligand-donation arithmetic without the separate metal-electron-count step.

**Delayed retrieval**: Re-probe MC-1's two-part electron-counting requirement and MC-3's cyclical-restoration principle as foundational knowledge for subsequent advanced organometallic and industrial-catalysis applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the electron-counting confusion, have the student explicitly compute the metal's own d-electron count as a separate first step before adding ligand donation.
- **S4 (frustrated)**: Normalize — omitting the metal's own electron contribution is genuinely common on first exposure, since ligand-donation arithmetic is more procedurally salient.
- **S6 (collision)**: Use the explicit property-comparison table for MC-2; use the full catalytic-cycle diagram for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why Wilkinson's catalyst isn't consumed despite Rh changing oxidation state mid-cycle.

## 13. Memory & Review

Tag as one procedural memory (two-part electron-counting method) plus two conceptual-correction memories (formalism-vs-actual-bonding distinction for ferrocene; cyclical net-zero catalyst consumption). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates crystal-field-theory and general d-block reasoning built across `chem.coord.cft` and `chem.dblock.general`, forming a capstone application to industrial catalysis (Ziegler-Natta, Wilkinson) contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

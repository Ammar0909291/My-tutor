# chem.org.pericyclic — Pericyclic Reactions

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.org.pericyclic` |
| Domain | Organic Chemistry |
| Requires | `chem.org.mechanisms` |
| Unlocks | (none) |
| Difficulty | expert |
| Bloom Level | evaluate |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

[2+2] cycloadditions are NOT thermally allowed simply because "both molecules have π-electrons" — the Woodward-Hoffmann rule is [4n+2] thermal=allowed, [4n] thermal=forbidden, and [2+2]'s total 4 electrons in the cyclic transition state IS 4n (n=1), making it thermally FORBIDDEN — direct thermal cyclobutane formation from two ethene molecules does NOT occur; the [2+2] reaction CAN proceed photochemically instead (opposite selection rule under light); the Diels-Alder reaction genuinely DOES have a stereochemical requirement on the diene — the diene must adopt the S-CIS conformation (terminal carbons ~2.3Å apart, reachable by the dienophile), while the S-TRANS conformer's terminal carbons (~4.5Å apart) are physically too far to bond — cyclopentadiene, LOCKED in s-cis by its ring, is extremely reactive, while (E,E)-hexa-2,4-diene (which can access s-trans) reacts far less readily; and the endo Diels-Alder product is NOT thermodynamically more stable despite forming as the major (kinetic) product — endo actually has MORE steric strain (the EWG positioned syn to the remaining double bond) than exo, so endo is kinetically favored (via secondary orbital interactions accelerating its formation) while exo is thermodynamically favored — this is a classic kinetic-vs-thermodynamic-control distinction, never "major product=more stable."

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Applying the [4n+2]/[4n] Woodward-Hoffmann electron-counting rule explicitly to both the Diels-Alder ([4+2]=6=4n+2, thermally allowed) and hypothetical thermal [2+2] (4=4n, thermally forbidden), deriving opposite thermal accessibility from the same rule.

**Representational**: A side-by-side s-cis/s-trans diene conformer diagram with explicit terminal-carbon distances labeled (2.3Å reachable vs. 4.5Å unreachable), directly explaining why only s-cis participates in Diels-Alder.

**Abstract**: The general Woodward-Hoffmann [4n+2]/[4n] selection rule for thermal pericyclic reactions; the general conformational-accessibility requirement (s-cis) for diene reactivity, derivable from simple geometric distance reasoning; the general kinetic-vs-thermodynamic-control distinction, with "major product" never automatically implying "more stable product."

**Transfer**: Given an unfamiliar cycloaddition, correctly applying the [4n+2]/[4n] rule to predict thermal (dis)allowedness; given an unfamiliar diene, correctly assessing s-cis accessibility to predict Diels-Alder reactivity; given an unfamiliar Diels-Alder product mixture, correctly distinguishing the kinetically-favored (major, endo) from the thermodynamically-favored (more stable, exo) product.

## 3. Why Beginners Fail

Students, knowing the Diels-Alder reaction ([4+2], thermally allowed) proceeds readily between a diene and an alkene, generalize this to "any combination of alkene plus alkene should similarly react," missing that the specific TOTAL ELECTRON COUNT in the cyclic transition state (not merely "having π-bonds") determines thermal allowedness via the Woodward-Hoffmann [4n+2]/[4n] rule — [2+2]'s total of 4 electrons genuinely falls into the FORBIDDEN 4n category, the opposite of Diels-Alder's allowed 4n+2 count; students, having learned that Diels-Alder "requires a conjugated diene" without a mechanically clear explanation of WHY conformation matters, accept this requirement as a vague rule without registering the actual GEOMETRIC constraint — the diene's terminal carbons must be close enough (s-cis conformation, ~2.3Å) to physically reach and bond with the dienophile, a distance the s-trans conformation (~4.5Å) simply cannot achieve; and students, associating the everyday connotations of "endo" (internal, enclosed) with "more stable" (perhaps by loose analogy to enclosed/protected structures being sturdier), conflate the OBSERVED major product (formed fastest, i.e., under kinetic control) with the THERMODYNAMICALLY more stable product, missing that these are two genuinely independent properties — the endo product's kinetic preference (from secondary orbital interactions accelerating its formation) coexists with it actually having MORE steric strain (hence being LESS thermodynamically stable) than the exo alternative.

## 4. Misconception Library

### MC-1: [2+2] cycloadditions are thermally allowed because both molecules have 2 π-electrons
- **Probe**: "Can you heat two ethene molecules together to form cyclobutane directly? Why or why not?"
- **Characteristic phrase**: "it should work because both have π-bonds" / "2+2 = 4 electrons, should be fine."
- **Trigger (Type 1, overgeneralization)**: Overgeneralization from the Diels-Alder being allowed because it is [4+2]; students think any reaction with alkene+alkene should work; but [2+2] total=4 electrons in the cyclic TS, and 4n with n=1 is thermally FORBIDDEN.
- **Conflict evidence [P28]**: The rule is [4n+2] thermal=allowed; [4n] thermal=forbidden. 2+2=4=4n (n=1)→forbidden thermally. The reaction requires photochemical initiation or a different mechanism (it CAN occur photochemically when one alkene is excited to the S₁ state).
- **Bridge [P30]**: The Woodward-Hoffmann selection rule is specific about the exact TOTAL electron count in the cyclic transition state ([4n+2] vs. [4n]), a quantitative distinction that "both molecules have π-bonds" fails to capture — having reactive π-electrons is a NECESSARY but not SUFFICIENT condition for thermal allowedness; the SPECIFIC total count must fall into the 4n+2 category, and [2+2]'s total of exactly 4 electrons falls squarely into the forbidden 4n category instead.
- **Replacement [P31]**: Always apply the specific [4n+2] (thermally allowed) vs. [4n] (thermally forbidden) electron-counting rule — never assume "having π-electrons" alone guarantees thermal allowedness.
- **Discrimination pairs [P33]**: Diels-Alder [4+2]=6 electrons=4n+2 (thermally allowed) vs. [2+2]=4 electrons=4n (thermally forbidden, requires photochemical initiation instead).
- **S6 repair path**: Present the explicit electron-counting computation for both [4+2] and [2+2], deriving opposite thermal allowedness from the Woodward-Hoffmann rule.

### MC-2: The Diels-Alder reaction does not have a stereochemical requirement on the diene
- **Probe**: "Would (E,E)-hexa-2,4-diene react in a Diels-Alder reaction as readily as cyclopentadiene? Why?"
- **Characteristic phrase**: "any conjugated diene works" / "conformation doesn't matter for the reaction."
- **Trigger (Type 5, instruction-induced)**: The requirement for s-cis conformation is often stated but not made mechanically clear; students accept "you need a diene" without specifying which conformation.
- **Conflict evidence [P28]**: Drawing the s-trans conformer of hexa-2,4-diene; C1 and C4 (the reacting terminal carbons) are ~4.5Å apart in s-trans — too far to bond to the dienophile (reacting distance~2.0Å); in s-cis they are ~2.3Å apart. The s-trans conformer physically cannot reach the dienophile. Cyclopentadiene is LOCKED in s-cis by the ring→extremely reactive.
- **Bridge [P30]**: The Diels-Alder mechanism requires the diene's two terminal carbons to simultaneously bond to the dienophile in a single concerted step, which is only geometrically possible when those terminal carbons are close enough together — this is a purely GEOMETRIC/DISTANCE constraint (not an electronic one), meaning a diene must actually adopt (or be locked into) the specific s-cis conformation for the reaction to proceed at a useful rate, while s-trans conformers, despite being equally "conjugated" in an electronic sense, are simply too far apart spatially to react.
- **Replacement [P31]**: The Diels-Alder reaction requires the diene in s-cis conformation (terminal carbons ~2.3Å apart, reachable by the dienophile) — a diene locked or strongly biased toward s-trans reacts far more slowly, regardless of its electronic conjugation.
- **Discrimination pairs [P33]**: Cyclopentadiene (locked s-cis, extremely reactive) vs. a diene that can access s-trans (like hexa-2,4-diene, reacting more slowly due to the competing, unreactive s-trans population).
- **S6 repair path**: Present the explicit s-cis/s-trans terminal-carbon-distance diagram, deriving the geometric reactivity requirement directly from the numbers.

### MC-3: The endo product has less steric strain, so it is thermodynamically more stable
- **Probe**: "In the Diels-Alder reaction of cyclopentadiene with maleic anhydride, is the endo or exo product the major product at room temperature? Is this the thermodynamically more stable product?"
- **Characteristic phrase**: "endo is more stable because it's the major product" (confusing kinetic with thermodynamic control).
- **Trigger (Type 2, perceptual intuition)**: Students associate "endo" with "internal" and "enclosed" with "more stable"; but endo means the EWG is positioned syn to the remaining double bond of the product, creating MORE steric strain than exo — so endo is kinetically preferred but thermodynamically less stable.
- **Conflict evidence [P28]**: Endo is the kinetic product (formed faster due to secondary orbital interactions) but is NOT the thermodynamically more stable product — exo has less steric strain. This is a classic example of kinetic vs. thermodynamic control of a reaction.
- **Bridge [P30]**: "Major product" and "thermodynamically more stable product" are two genuinely independent properties that happen to coincide only when a reaction is under thermodynamic (equilibrium) control — under KINETIC control (typically the case for Diels-Alder at moderate temperatures), the major product is instead determined by which transition state has the LOWER activation energy, and secondary orbital interactions specifically lower the endo transition state's energy even though the resulting endo PRODUCT itself has greater steric strain (higher product-state energy) than exo.
- **Replacement [P31]**: The endo Diels-Alder product is the kinetically-favored major product (via secondary orbital interactions lowering its transition-state energy) but is thermodynamically LESS stable than exo (which has less steric strain) — never assume "major product" implies "more stable product."
- **Discrimination pairs [P33]**: Endo product (kinetically favored, major at room temperature, MORE steric strain, less thermodynamically stable) vs. exo product (kinetically disfavored, minor at room temperature, LESS steric strain, more thermodynamically stable).
- **S6 repair path**: Present the explicit kinetic-vs-thermodynamic-control distinction, isolating transition-state energy (kinetics) from product-state energy (thermodynamics) as separate considerations.

## 5. Explanation Library

**Primary explanation**: Thermal pericyclic reaction allowedness is governed by the specific Woodward-Hoffmann [4n+2] (allowed) vs. [4n] (forbidden) electron-counting rule — "having π-electrons" alone is insufficient; the EXACT total count in the cyclic transition state determines allowedness, explaining why [2+2] is thermally forbidden despite superficially resembling the allowed [4+2] Diels-Alder. The Diels-Alder reaction additionally requires the diene to adopt s-cis conformation (a purely geometric constraint on terminal-carbon distance), explaining cyclopentadiene's exceptional reactivity (locked s-cis) versus dienes that can access the unreactive s-trans form.

**Secondary explanation (kinetic vs. thermodynamic control in endo/exo selectivity)**: The endo Diels-Alder product's status as the major product (kinetic control, via secondary-orbital-interaction-lowered transition-state energy) is independent of its thermodynamic stability (which is actually LOWER than exo, due to greater steric strain) — "major product" and "more stable product" are separate properties that need not coincide.

## 6. Analogy Library

- **Primary analogy**: A strict headcount bouncer at a club door (the [4n+2]/[4n] electron-counting rule) who admits groups of exactly the right total size (4n+2) but turns away groups of the "wrong" size (4n), regardless of how enthusiastic (reactive) each individual guest (π-bond) might be.
- **Breaking point**: The headcount-bouncer analogy conveys the electron-counting-rule concept well but doesn't naturally capture the s-cis geometric-distance requirement (MC-2) or the kinetic-vs-thermodynamic endo/exo distinction (MC-3) — those need the explicit distance diagram and the transition-state/product-state energy comparison.
- **Anti-analogy**: Do NOT say "any two alkenes with π-bonds should combine thermally, just like Diels-Alder" — this directly reinforces MC-1 by ignoring the specific electron-count requirement.

## 7. Demonstration Library

- **Demonstration 1 (electron-counting computation for [4+2] vs. [2+2])**: Present both computations explicitly, deriving opposite thermal allowedness from the [4n+2]/[4n] rule.
- **Demonstration 2 (s-cis/s-trans terminal-carbon-distance diagram)**: Present the explicit distance diagram, deriving the geometric reactivity requirement for Diels-Alder.
- **Demonstration 3 (endo/exo kinetic-vs-thermodynamic energy diagram)**: Present the explicit transition-state and product-state energy comparison for endo and exo pathways.

## 8. Discovery Lesson

**Opening**: "Diels-Alder ([4+2]) works thermally. Should [2+2] cycloaddition also work thermally, since both involve π-bonds?"

**Exploration**: Students apply the [4n+2]/[4n] electron-counting rule to both cases, discovering [2+2] is forbidden despite superficial similarity.

**Synthesis**: Guide toward: thermal pericyclic allowedness depends on the SPECIFIC total electron count, not merely the presence of π-bonds.

**Closure**: "Is the endo Diels-Alder product the thermodynamically more stable one, since it's the major product?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit electron-counting computation for [4+2] vs. [2+2].
- **TA-2 (TELL)**: State the s-cis geometric requirement for Diels-Alder explicitly, anchored to the terminal-carbon-distance diagram.
- **TA-3 (DO)**: Student predicts endo/exo product ratios for an unfamiliar Diels-Alder reaction under kinetic vs. thermodynamic control.
- **TA-4 (TEST-THINKING)**: Present the endo-stability probe and ask the student to justify why the major product isn't necessarily the more stable one.

## 10. Voice Teaching

Whenever thermal pericyclic allowedness is assessed, narrate "count the total electrons — [4n+2] allowed, [4n] forbidden, never assume from π-bond presence alone." Whenever Diels-Alder selectivity is discussed, state "major product and more stable product are separate questions — check kinetic vs. thermodynamic control" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly apply the [4n+2]/[4n] rule to predict thermal pericyclic allowedness, (b) correctly assess diene reactivity from s-cis conformational accessibility, (c) correctly distinguish kinetically-favored from thermodynamically-favored Diels-Alder products.

- **FA-1**: "Can you heat two ethene molecules together to form cyclobutane directly? Why or why not?" — targets MC-1.
- **FA-2**: "Would (E,E)-hexa-2,4-diene react in a Diels-Alder reaction as readily as cyclopentadiene? Why?" — targets MC-2.
- **FA-3**: "Is the endo product of cyclopentadiene+maleic anhydride the thermodynamically more stable product?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only encountered the allowed Diels-Alder case without exposure to the forbidden [2+2] counterexample.

**Delayed retrieval**: Re-probe MC-1's electron-counting rule and MC-3's kinetic-vs-thermodynamic distinction as foundational knowledge for subsequent advanced synthesis and photochemistry applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the [2+2]-allowedness confusion, have the student explicitly count total electrons in the cyclic transition state before judging thermal allowedness.
- **S4 (frustrated)**: Normalize — overgeneralizing from Diels-Alder's allowedness to all similar-looking cycloadditions is genuinely common on first exposure, since the Woodward-Hoffmann rule's specificity isn't obvious from surface pattern-matching.
- **S6 (collision)**: Use the explicit terminal-carbon-distance diagram for MC-2; use the transition-state/product-state energy comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why the endo product forms faster despite being less stable.

## 13. Memory & Review

Tag as two procedural memories ([4n+2]/[4n] electron-counting rule; s-cis conformational reactivity assessment) plus one conceptual-correction memory (kinetic-vs-thermodynamic endo/exo distinction). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates mechanism reasoning built across `chem.org.mechanisms`, forming the capstone application of concerted-mechanism and selection-rule reasoning to advanced synthesis contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

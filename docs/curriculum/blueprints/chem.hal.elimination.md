# chem.hal.elimination — Elimination Reactions

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.hal.elimination` |
| Domain | Haloalkanes |
| Requires | `chem.hal.sn1`, `chem.hal.sn2` |
| Unlocks | (none) |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

E2 elimination cannot remove just ANY β-hydrogen — it requires the leaving group and the β-hydrogen to be ANTI-PERIPLANAR (180° dihedral angle), a genuine geometric constraint that can make certain stereoisomers (e.g., a cis-disubstituted cyclohexane) structurally unable to achieve the required conformation for a given elimination product; Zaitsev's rule (most-substituted alkene favored) is NOT universal — with a BULKY base (e.g., KOtBu), steric hindrance prevents the base from easily approaching the more hindered internal β-hydrogens, so it preferentially removes the more accessible terminal β-hydrogen, giving the LESS substituted (Hofmann) product instead; and a strong, bulky BASE reacting with a hindered (especially tertiary) alkyl halide does NOT default to substitution — SN2 is often sterically blocked entirely at a tertiary carbon, and a bulky, poor nucleophile/strong base preferentially abstracts a β-hydrogen (E2) rather than attacking carbon, so "strong base" does not automatically imply "substitution."

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing trans- and cis-1-bromo-2-methylcyclohexane explicitly in chair conformations, identifying which isomer can achieve the anti-periplanar Br/β-H arrangement required for a specific E2 product and which cannot.

**Representational**: A two-column product-selectivity table contrasting a small base (Zaitsev, most-substituted alkene) against a bulky base like KOtBu (Hofmann, least-substituted alkene) for the same substrate.

**Abstract**: The general anti-periplanar geometric requirement for E2 elimination; the general principle that base bulk (steric accessibility), not just base strength, determines Zaitsev-vs-Hofmann selectivity; the general principle that base bulk and nucleophilicity (not just "strength") determine substitution-vs-elimination competition.

**Transfer**: Given an unfamiliar substrate/base combination, correctly assessing whether the required anti-periplanar geometry is achievable, correctly predicting Zaitsev vs. Hofmann product from base bulk, and correctly predicting elimination (not substitution) dominance for bulky bases with hindered substrates.

## 3. Why Beginners Fail

Students apply the structural definition of a β-hydrogen (any hydrogen on a carbon adjacent to the leaving group) without also applying the geometric anti-periplanar constraint, assuming any β-H is removable in E2, missing that the leaving group and the departing β-hydrogen must actually be positioned 180° apart in the reacting conformation — some stereoisomers structurally cannot achieve this arrangement for certain products; students learn Zaitsev's rule prominently and first, with the Hofmann exception (bulky bases) often introduced later or given less emphasis, leading them to apply Zaitsev universally, missing that a sufficiently bulky base cannot easily approach the more hindered, more substituted β-hydrogens and instead preferentially removes the more accessible, less hindered terminal hydrogen, reversing the expected product; and students conflate "nucleophile" and "base" as functionally equivalent concepts (both attack/react with a substrate), applying "nucleophiles attack C–X bonds" onto all strong reactive species, missing that a bulky strong BASE specifically promotes elimination (proton abstraction) over substitution (carbon attack), especially when the substrate's steric bulk (e.g., a tertiary carbon) makes SN2 backside attack essentially impossible anyway.

## 4. Misconception Library

### MC-1: E2 elimination can remove any β-hydrogen on the molecule
- **Probe**: "In the E2 reaction of trans-1-bromo-2-methylcyclohexane with KOH, what is the product? Can the cis isomer give the same product?"
- **Characteristic phrase**: "it removes the nearest H" / "any H on the adjacent carbon."
- **Trigger (Type 1, overgeneralization)**: Students overgeneralize from the structural definition of β-H; they do not apply the anti-periplanar geometric constraint, assuming any β-H is removable.
- **Conflict evidence [P28]**: Drawing the Newman projection or chair for both isomers shows that trans requires the Br to be axial; the β-Hs on the adjacent ring carbons must also be checked for anti relationship; only the conformation that places BOTH X and β-H axial allows E2. The cis isomer cannot achieve the required anti-periplanar arrangement for some products.
- **Bridge [P30]**: E2 is a CONCERTED, single-step mechanism requiring simultaneous C–H and C–X bond breaking with proper orbital alignment — this alignment is only achieved when the leaving group and the departing hydrogen are anti-periplanar (180° apart), a genuine geometric/conformational requirement, not merely a matter of "adjacency"; a β-H that is structurally present but geometrically unable to achieve this arrangement (due to ring constraints or conformational locking) simply cannot participate in E2 for that particular product.
- **Replacement [P31]**: Always check the anti-periplanar geometric requirement (via Newman projection or chair conformation) before predicting which β-H is eliminated in E2 — never assume any structurally adjacent H is automatically removable.
- **Discrimination pairs [P33]**: Trans isomer (can achieve diaxial Br/β-H, E2 proceeds to the specific product) vs. cis isomer (cannot achieve the same anti-periplanar arrangement for that product, blocked or gives a different product).
- **S6 repair path**: Draw the explicit chair/Newman conformations for both isomers, having the student identify which β-H is genuinely anti-periplanar to the leaving group.

### MC-2: Zaitsev's rule always applies to elimination reactions
- **Probe**: "What is the major product of treating 2-bromo-2-methylbutane with KOtBu?"
- **Characteristic phrase**: "always gives the most substituted alkene" / "Zaitsev is the rule, no exceptions."
- **Trigger (Type 5, instruction-induced)**: Zaitsev is taught first and most prominently; the Hofmann exception with bulky bases is often introduced later or not at all; students apply Zaitsev universally.
- **Conflict evidence [P28]**: KOtBu is a bulky base; it cannot approach the more hindered internal β-Hs easily; it preferentially removes the terminal (less hindered) β-H → gives the LESS substituted alkene (1-methylbut-1-ene vs. 2-methylbut-2-ene). This is the Hofmann product.
- **Bridge [P30]**: Zaitsev's rule (most-substituted, most-stable alkene favored) reflects a THERMODYNAMIC preference under conditions where the base can freely access any β-hydrogen — but a sufficiently bulky base introduces a genuine STERIC constraint that overrides this thermodynamic preference, since the base simply cannot physically reach the more hindered internal hydrogens as easily as the more exposed terminal ones, shifting the kinetically-favored product toward the less-substituted (Hofmann) alkene.
- **Replacement [P31]**: Check base bulk before applying Zaitsev's rule — small, unhindered bases favor the Zaitsev (most-substituted) product, while bulky bases like KOtBu favor the Hofmann (least-substituted) product via steric accessibility.
- **Discrimination pairs [P33]**: Small base like KOH (Zaitsev product, most-substituted alkene) vs. bulky base like KOtBu (Hofmann product, least-substituted alkene) — same substrate, opposite major product depending on base bulk.
- **S6 repair path**: Present the explicit steric-accessibility argument, comparing a small and bulky base's ability to approach internal vs. terminal β-hydrogens.

### MC-3: Strong base + alkyl halide always gives substitution
- **Probe**: "What happens when tert-butyl bromide reacts with KOtBu in ethanol?"
- **Characteristic phrase**: "the base acts as a nucleophile and attacks the carbon" / "substitution product forms."
- **Trigger (Type 3, language contamination)**: "Nucleophile" and "base" overlap as concepts; students who know "nucleophiles attack C–X bonds" map this onto all "strong species" without recognising that a bulky strong BASE promotes elimination, not substitution.
- **Conflict evidence [P28]**: KOtBu is bulky — SN2 backside attack on a 3° carbon is already sterically impossible; additionally the base is non-nucleophilic (prefers to abstract H). Only E2 can occur → 2-methylpropene (isobutylene) is the product, plus KBr and tBuOH.
- **Bridge [P30]**: A species being a "strong base" does not automatically make it a good NUCLEOPHILE toward carbon — basicity (proton affinity) and nucleophilicity (carbon-attack rate) are distinct properties, and a bulky base's steric bulk specifically hinders its ability to perform backside SN2 attack while leaving its ability to abstract a more sterically accessible proton (E2) largely unaffected, making elimination the dominant pathway for such reagents with hindered substrates.
- **Replacement [P31]**: A bulky, strong base (poor nucleophile) reacting with a hindered (especially tertiary) substrate favors elimination (E2), not substitution — never assume "strong base" implies substitution by default.
- **Discrimination pairs [P33]**: tert-butyl bromide+KOtBu (bulky base, SN2 sterically blocked, E2 dominates, isobutylene product) vs. a small unhindered nucleophile with a primary substrate (SN2 dominates instead).
- **S6 repair path**: Present the explicit steric-blockage argument for SN2 at a tertiary carbon, contrasted with the base's continued ability to abstract a proton for E2.

## 5. Explanation Library

**Primary explanation**: E2 elimination is a concerted mechanism requiring the leaving group and the departing β-hydrogen to be anti-periplanar — a genuine geometric constraint that can make certain β-hydrogens (or entire stereoisomers) unable to participate in a given elimination, regardless of simple structural adjacency. Zaitsev's rule (most-substituted product favored) holds only when the base can freely access all β-hydrogens; a sufficiently bulky base like KOtBu is sterically blocked from the more hindered internal hydrogens and instead gives the Hofmann (least-substituted) product.

**Secondary explanation (base bulk determines substitution-vs-elimination competition)**: Basicity and nucleophilicity are distinct properties — a bulky, strong base can be simultaneously a poor nucleophile (unable to perform SN2 backside attack, especially at hindered carbons) and an effective proton abstractor, making elimination (E2) the dominant pathway with hindered substrates, contrary to a blanket "strong base implies substitution" assumption.

## 6. Analogy Library

- **Primary analogy**: A key that must be inserted at exactly the right angle (anti-periplanar alignment) to turn a lock (E2 mechanism) — simply having a key-shaped object nearby (a structurally adjacent β-H) is not sufficient if the angle is wrong.
- **Breaking point**: The key-angle analogy conveys the anti-periplanar geometric requirement well but doesn't naturally capture the Zaitsev-vs-Hofmann base-bulk selectivity (MC-2) or the basicity-vs-nucleophilicity distinction (MC-3) — those need the explicit steric-accessibility comparison and the SN2-blockage argument.
- **Anti-analogy**: Do NOT say "E2 just needs an H on the next carbon over" — this directly reinforces MC-1 by omitting the anti-periplanar geometric requirement.

## 7. Demonstration Library

- **Demonstration 1 (chair/Newman anti-periplanar analysis)**: Draw the explicit chair conformations for trans- and cis-1-bromo-2-methylcyclohexane, identifying which β-H is genuinely anti-periplanar to Br.
- **Demonstration 2 (Zaitsev-vs-Hofmann base-bulk comparison)**: Present the same substrate reacting with a small base (Zaitsev product) and a bulky base (Hofmann product) side by side.
- **Demonstration 3 (SN2-blockage-vs-E2-accessibility argument)**: Draw the explicit steric blockage of SN2 backside attack at a tertiary carbon, contrasted with the base's continued access to a proton for E2.

## 8. Discovery Lesson

**Opening**: "In E2 elimination, can the base remove any hydrogen on the carbon next to the leaving group?"

**Exploration**: Students examine the chair conformations of a cyclohexane substrate, discovering only an anti-periplanar β-H can actually be eliminated.

**Synthesis**: Guide toward: E2 requires a specific geometric alignment (anti-periplanar), not just structural adjacency.

**Closure**: "Does KOtBu always give the most-substituted alkene, like KOH does?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit chair-conformation anti-periplanar analysis for trans- and cis-1-bromo-2-methylcyclohexane.
- **TA-2 (TELL)**: State the Zaitsev-vs-Hofmann base-bulk rule explicitly, anchored to the steric-accessibility argument.
- **TA-3 (DO)**: Student predicts the major elimination product for an unfamiliar substrate/base combination.
- **TA-4 (TEST-THINKING)**: Present the tert-butyl bromide+KOtBu probe and ask the student to justify E2 dominance from steric SN2 blockage.

## 10. Voice Teaching

Whenever E2 elimination is discussed, narrate "check anti-periplanar alignment first — not just adjacency." Whenever base bulk is relevant, state "bulky base means check for Hofmann, and check for E2-over-substitution" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly identify anti-periplanar β-hydrogens for E2 from conformational analysis, (b) correctly predict Zaitsev vs. Hofmann product from base bulk, (c) correctly predict elimination dominance for bulky bases with hindered substrates.

- **FA-1**: "In the E2 reaction of trans-1-bromo-2-methylcyclohexane with KOH, what is the product?" — targets MC-1.
- **FA-2**: "What is the major product of treating 2-bromo-2-methylbutane with KOtBu?" — targets MC-2.
- **FA-3**: "What happens when tert-butyl bromide reacts with KOtBu in ethanol?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-2 among students who have only encountered Zaitsev's rule without exposure to a bulky-base counterexample.

**Delayed retrieval**: Re-probe MC-1's anti-periplanar requirement and MC-2's base-bulk selectivity as foundational knowledge for subsequent synthesis-design reasoning involving substitution/elimination competition.

## 12. Recovery Notes

- **S3 (stuck)**: For the anti-periplanar confusion, have the student draw the explicit conformation before predicting any E2 product, never relying on structural adjacency alone.
- **S4 (frustrated)**: Normalize — overgeneralizing Zaitsev's rule and the anti-periplanar requirement are both genuinely common on first exposure to elimination mechanisms.
- **S6 (collision)**: Use the explicit steric-accessibility comparison for MC-2; use the SN2-blockage argument for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why KOtBu gives the Hofmann rather than the Zaitsev product.

## 13. Memory & Review

Tag as one procedural memory (anti-periplanar conformational analysis for E2) plus two conceptual-correction memories (base-bulk-dependent Zaitsev/Hofmann selectivity; basicity-vs-nucleophilicity determining substitution/elimination competition). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates the SN1/SN2/E1/E2 mechanistic reasoning built across `chem.hal.sn1` and `chem.hal.sn2`, forming the capstone competition-reasoning skill for haloalkane reactivity.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

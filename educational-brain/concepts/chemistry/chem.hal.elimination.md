# Elimination Reactions — `chem.hal.elimination`

## Identity
- **KG ID**: chem.hal.elimination
- **Subject**: Chemistry
- **Domain**: Halogenoalkanes (chem.hal)
- **Prerequisites**: chem.hal.sn1, chem.hal.sn2
- **Difficulty**: advanced
- **Bloom level**: analyse
- **Estimated hours**: 2.5

## Learning Objective
Distinguish E1 and E2 elimination mechanisms, predict the major alkene product using Zaitsev's rule, explain the stereochemical requirement of E2 (anti-periplanar), and predict whether a substrate will undergo substitution or elimination under a given set of conditions.

## Core Understanding
**What elimination is**: a β-hydrogen and the leaving group (X) are removed from adjacent carbons to form an alkene (C=C). The carbon bearing the leaving group is α; the one losing H is β. **E2 mechanism**: concerted, one step; the base (B:) abstracts the β-H at the same time as the C–X bond breaks and the C=C forms; rate = k[RX][base]; **strict requirement: the β-H and the leaving group must be anti-periplanar (180° dihedral angle)** in the transition state; this is a geometric requirement from orbital overlap (the C–H and C–X σ* bonds must align with the π-system being formed); consequence: in cyclohexane systems, only a β-H that is AXIAL and anti to an axial leaving group satisfies the requirement (chair conformation analysis is mandatory). Reagents: strong, bulky base (KOH/ethanol, NaOEt, KOtBu). **E1 mechanism**: two steps; step 1 = ionisation of the C–X bond (same RDS as SN1); step 2 = loss of β-H from the carbocation by base; rate = k[RX] (unimolecular); substrate requirement = 3° or 2° (must stabilise carbocation); minor base requirement (the carbocation is already so reactive any base can remove H); competing with SN1 (both go through the same carbocation intermediate). **Zaitsev's rule**: the major elimination product is the MORE SUBSTITUTED alkene (more stable thermodynamic product); applies to both E1 and E2 unless a bulky base is used; exception — Hofmann's rule: bulky bases (KOtBu) give the LESS substituted alkene (steric reasons — the bulky base cannot approach the more hindered β-H adjacent to the larger groups). **Substitution vs. elimination**: the competition is governed by: (a) substrate degree — 3° substrate heavily favours elimination (crowded, difficult for backside SN2 attack; carbocation well-stabilised for E1); 1° substrate favours SN2 (SN1 and E1 require stable carbocation); 2° is intermediate. (b) Base/nucleophile strength and size — strong bulky base → elimination (KOtBu, KOH/EtOH); weak nucleophile at low temperature → SN1 if 3°; strong nucleophile with polar aprotic solvent → SN2 for 1°/2°. (c) Temperature — higher temperature generally favours elimination (the reaction with the more positive ΔS — forming two molecules from one — is thermodynamically favoured at high T). **Regioselectivity summary**: both E1 and E2 follow Zaitsev unless base is bulky; E2 additionally has the anti-periplanar stereochemical constraint.

## Mental Models
- **E2 = the anti rule**: draw a Newman projection; if β-H and X are anti (180°), E2 can proceed; if they are gauche (60°), they cannot in that conformation (the molecule must rotate first). In cyclohexane, both β-H and leaving group must be AXIAL to be anti-periplanar — checking whether they can both be axial simultaneously is the key step.
- **Competition decision tree**: (1) Is the base bulky and strong? → elimination likely. (2) Is the substrate 3°? → elimination over SN2 (SN2 blocked by steric crowding); choose E1 or E2 depending on base concentration/strength. (3) Is the base/nucleophile strong and non-bulky? Substrate 1° or 2°? → SN2. (4) Temperature high? → more elimination.

## Why Students Fail
- Neglecting the anti-periplanar requirement for E2; students draw any β-H being removed without checking geometry.
- Confusing Zaitsev (more substituted product from small base) with Hofmann (less substituted product from bulky base); students apply Zaitsev universally.
- In substitution vs. elimination competition, defaulting to substitution when the question says "strong base" — not recognising that strong bases promote elimination, especially with 3° substrates.

## Misconceptions
1. **"E2 elimination can remove any β-hydrogen on the molecule"** (Type 1 — overgeneralization from the structural definition of β-H; students do not apply the anti-periplanar geometric constraint, assuming any β-H is removable).
   - Probe: "In the E2 reaction of trans-1-bromo-2-methylcyclohexane with KOH, what is the product? Can the cis isomer give the same product?"
   - Characteristic phrase: "it removes the nearest H" / "any H on the adjacent carbon"
   - Intervention: draw Newman projection or chair for both isomers; show that trans requires the Br to be axial; the β-Hs on the adjacent ring carbons must also be checked for anti relationship; only the conformation that places BOTH X and β-H axial allows E2. The cis isomer cannot achieve the required anti-periplanar arrangement for some products.

2. **"Zaitsev's rule always applies to elimination reactions"** (Type 5 — instruction-induced: Zaitsev is taught first and most prominently; the Hofmann exception with bulky bases is often introduced later or not at all; students apply Zaitsev universally).
   - Probe: "What is the major product of treating 2-bromo-2-methylbutane with KOtBu?"
   - Characteristic phrase: "always gives the most substituted alkene" / "Zaitsev is the rule, no exceptions"
   - Intervention: KOtBu is a bulky base; it cannot approach the more hindered internal β-Hs easily; it preferentially removes the terminal (less hindered) β-H → gives the LESS substituted alkene (1-methylbut-1-ene vs. 2-methylbut-2-ene). This is the Hofmann product.

3. **"Strong base + alkyl halide always gives substitution"** (Type 3 — language contamination: "nucleophile" and "base" overlap as concepts; students who know "nucleophiles attack C–X bonds" map this onto all "strong species" without recognising that a bulky strong BASE promotes elimination, not substitution).
   - Probe: "What happens when tert-butyl bromide reacts with KOtBu in ethanol?"
   - Characteristic phrase: "the base acts as a nucleophile and attacks the carbon" / "substitution product forms"
   - Intervention: note that KOtBu is bulky — SN2 backside attack on a 3° carbon is already sterically impossible; additionally the base is non-nucleophilic (prefers to abstract H). Only E2 can occur → 2-methylpropene (isobutylene) is the product, plus KBr and tBuOH.

## Analogies
- **Good**: E2 anti-periplanar requirement is like a lock and key — the key (base) can only open the lock if the β-H and the leaving group are positioned with the exact 180° alignment; a misaligned key (gauche conformation) does nothing, no matter how strong you push.
- **Anti-analogy**: Do NOT say "elimination is just substitution gone wrong" — elimination is a competing pathway with its own distinct mechanism, orbital requirements, and selectivity rules. It is not a failed substitution; it is a mechanistically independent pathway.

## Demonstrations
- **Cyclohexane chair conformational control**: use molecular models (Dreiding or Molymod); show trans-1-bromo-4-tert-butylcyclohexane (Br axial, tBu equatorial in the stable conformer); confirm all possible β-H/X anti-periplanar pairs; predict only one E2 product (no ring flip possible with tBu group — locked conformation).
- **Alcohol dehydration as E1**: heat 2-methylpropan-2-ol with H₂SO₄ at 170°C; collect and identify the gaseous 2-methylpropene product; explain the E1 mechanism via tertiary carbocation.

## Discovery Questions
1. Draw Newman projections for both conformers of 2-bromobutane (gauche and anti for the C2–C3 bond). Which conformer can undergo E2 elimination? What alkene does each conformation give?
2. Compare 1-bromopropane reacting with NaOH vs. KOtBu. What is the major product in each case and why?
3. A compound with molecular formula C₄H₉Br undergoes elimination with KOH/EtOH to give ONLY one alkene product. Which structural isomer is it? (Hint: which isomer has all β-Hs equivalent?)
4. Why does raising the temperature favour elimination over substitution?

## Teaching Sequence
1. **Define elimination** structurally: show β-H and X on adjacent carbons; draw the product alkene; name α and β carbons.
2. **E2 mechanism**: concerted; curved arrows (base → β-H, C–H bond → C=C, C–X bond → X⁻ departs); rate law; anti-periplanar requirement; show orbital picture.
3. **Anti-periplanar in practice**: Newman projections for acyclic; chair conformations for cyclic; work one cyclohexane example end-to-end.
4. **E1 mechanism**: two-step; same RDS as SN1; loss of β-H from carbocation in step 2; rate law; compare with SN1.
5. **Zaitsev vs. Hofmann**: Zaitsev (small base, more substituted product); Hofmann (bulky base, less substituted product); one worked example of each.
6. **Substitution vs. elimination decision guide**: table of conditions (base strength, base size, substrate degree, temperature) → predicted mechanism.
7. **Practice problems**: predict product for 3–4 substrates with varying conditions.

## Tutor Actions
- **If student neglects anti-periplanar**: immediately ask "what is the dihedral angle between X and β-H in this conformation?" — if it's not 180°, E2 cannot proceed in that conformation.
- **If Zaitsev/Hofmann confusion**: ask "what is the size of the base?" — small = Zaitsev; large = Hofmann; this is the diagnostic.
- **If student cannot decide substitution vs. elimination**: apply the decision tree step-by-step; substrate degree first (3° rules out SN2); then base character (bulky/strong → elimination).

## Voice Teaching Notes
- State the anti-periplanar rule every time E2 comes up: "E2 requires anti-periplanar — β-H and leaving group must be 180° apart."
- For the Zaitsev/Hofmann distinction: "Small base, BIG product (more substituted alkene). Big base, SMALL product (less substituted alkene)." — the inverse relationship is the hook.
- For substitution vs. elimination with 3° substrate: "3° = no SN2 (too hindered); 3° with strong base = elimination." Repeat until automatic.

## Assessment Signals
- **Green**: applies E2 anti-periplanar criterion to a cyclohexane system; correctly applies Zaitsev for a small base and Hofmann for KOtBu; predicts outcome of substitution vs. elimination competition from a given set of conditions.
- **Amber**: knows Zaitsev but not Hofmann; draws E2 arrows correctly but ignores anti-periplanar requirement; knows 3° favours elimination without being able to explain why.
- **Red**: removes any β-H in E2 without geometric analysis; always applies Zaitsev; cannot distinguish when elimination dominates over substitution.

## Tutor Recovery Strategy
- Anti-periplanar failures: require student to draw a Newman projection first for every E2 problem; only then ask "are H and X anti?" — make the geometric step non-negotiable.
- Zaitsev/Hofmann confusion: give two examples side by side (NaOEt vs. KOtBu on the same substrate) and ask the student to predict both; compare and discuss.
- Substitution/elimination decision: run the decision tree as a written checklist together until the student internalises the hierarchy.

## Memory Hooks
- **E2 = anti, concerted, bimolecular** — three words for E2.
- **E1 = ionise first, then lose H** — same intermediate as SN1.
- **Zaitsev = more substituted; Hofmann = less substituted (bulky base)** — name pair + outcome pair.
- **3° substrate + strong base → elimination** (SN2 blocked; E2 preferred) — the trump card in all competition questions.

## Transfer Connections
- **Alcohol dehydration**: this IS E1 elimination (with H₂SO₄ protonating OH → H₂O leaves as in SN1; then β-H removed by HSO₄⁻ or water as a weak base); same Zaitsev outcome.
- **E2 in synthesis**: the anti-periplanar constraint makes E2 stereospecific — the geometry of the starting material directly determines which alkene stereoisomer (Z or E) is produced; this is a powerful tool in stereocontrolled synthesis.
- **Dehalogenation (vicinal dihalide → alkene)**: reacting a vicinal dibromide with Zn or NaI/acetone is an E2-type process; same anti requirement and same alkene product.
- **Elimination in biochemistry**: β-elimination of water from 2-phosphoglycerate to form phosphoenolpyruvate (PEP) by enolase is a biological E1cb-type elimination (enzyme-catalysed, base extracts β-H first then OH leaves).

## Cross-Subject Connections
- **Biology**: enzyme-catalysed eliminations (fumarase, enolase, aconitase, dehydratases) are widespread in metabolism; the geometric specificity of E2 (anti) and E1cb (syn) in biological systems is why enzymes bind substrate in specific conformations.
- **Physics**: the orbital-overlap argument for anti-periplanar geometry (the σ*(C–X) orbital must overlap with the π-bond being formed) is an application of molecular orbital theory to predict reaction geometry.
- **Environmental**: E2 elimination is used in the degradation of halogenated environmental contaminants (dehalogenation by reductive elimination in subsurface environments).

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.hal.elimination`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.hal.elimination` as of 2026-07-23.

## Curriculum Feedback
- This concept has a strong geometric component that text-based instruction struggles to convey; a 3D molecular model (Dreiding or interactive viewer) is almost essential for the anti-periplanar and cyclohexane chair analysis. The platform's visualization engine (ADR 12) should prioritise a Newman-projection / chair-flip interactive for this concept.
- The Hofmann rule (less-substituted product with bulky base) deserves explicit mention in the KG node description; it is currently absent from most KG node descriptions and students consistently miss it.

## Version History
- v1.0.0 — 2026-07-24 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

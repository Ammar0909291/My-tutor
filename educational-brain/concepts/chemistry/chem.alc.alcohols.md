# Alcohols — `chem.alc.alcohols`

## Identity
- **KG ID**: chem.alc.alcohols
- **Subject**: Chemistry
- **Domain**: Alcohols and Ethers (chem.alc)
- **Prerequisites**: chem.hal.sn1, chem.hal.sn2, chem.org.mechanisms
- **Difficulty**: advanced
- **Bloom level**: apply
- **Estimated hours**: 3

## Learning Objective
Classify alcohols by substitution pattern, explain the physical properties arising from hydrogen bonding, predict the products of substitution, elimination, and oxidation reactions, and connect alcohol reactivity to the nucleophilicity of the hydroxyl oxygen and the lability of the C–OH bond.

## Core Understanding
**Classification**: primary (1°, –CH₂OH), secondary (2°, –CHOH–), tertiary (3°, –COH–); phenol is a special class (aryl OH). **Physical properties**: the O–H bond (electronegativity difference 1.4) gives a strong permanent dipole; hydroxyl groups form intermolecular H-bonds (O–H···O); boiling points are far higher than analogous alkanes or ethers (ethanol bp 78°C vs. diethyl ether 35°C vs. butane −1°C); lower alcohols are miscible with water (H-bond donor and acceptor). **Reactions**: (1) **Acid–base**: the O–H is weakly acidic (pKₐ ~16–18 for aliphatic; phenol ~10 due to resonance stabilisation of phenoxide); react with Na metal (H₂ evolved), NaOH for phenols (but NOT for ordinary alcohols — they are not acidic enough to react with NaOH), and with strong base (NaH, NaNH₂). (2) **Substitution of OH → Halide**: OH is a poor leaving group (HO⁻ is a strong base); must be protonated first (conc. HX, H₂SO₄/NaX) or converted to a tosylate/mesylate; then SN1 (3°) or SN2 (1°) operates with retention of rate/stereochemistry rules. Lucas test: ZnCl₂/HCl — 3° reacts immediately (turbid), 2° reacts in ~5 min, 1° requires heating (diagnostic for degree). (3) **Dehydration (elimination)**: H₂SO₄, 170°C (or 140°C if the alcohol is the substrate and product is ether); follows Zaitsev's rule (more substituted alkene preferred); E1 mechanism via carbocation for 2° and 3°; 1° requires E2 or harsh conditions; competing reactions: 1° can also form ethers (140°C, bimolecular dehydration). Alcohol dehydration is always acid-catalysed; the acid protonates the OH converting it to a better leaving group (H₂O). (4) **Oxidation**: oxidation state of carbon in 1° → aldehyde (RCHO) → carboxylic acid (RCOOH); 2° → ketone (RCOR'); 3° → no reaction (no H on the carbinol carbon to remove). Reagents: PCC (pyridinium chlorochromate, CrO₃·HCl·pyridine) stops at aldehyde from 1°; Jones reagent (CrO₃/H₂SO₄, aqueous) gives acid from 1°; both oxidise 2° to ketone; KMnO₄ also oxidises 1° fully; MnO₂ selectively oxidises allylic/benzylic alcohols. (5) **Esterification**: alcohol + carboxylic acid ⇌ ester + H₂O (Fischer esterification, acid-catalysed, reversible; drive by removing water or excess alcohol). (6) **Reaction with PCl₅ / SOCl₂**: replaces OH with Cl; SOCl₂ gives inversion for 1° (SN2 mechanism via chlorosulfite); PCl₅ can give inversion or retention depending on mechanism.

## Mental Models
- **OH is a poor leaving group — it must be disguised**: the entire reactivity pattern for substitution of alcohols is about converting the OH (or protonated OH = H₂O) into a leaving group by protonation, tosylation, or thionyl chloride treatment. Every substitution reagent with an alcohol is a "disguise job."
- **Oxidation stops where there is no C–H bond left at the carbinol carbon**: 1° has 2 H → can be oxidised to aldehyde (1 H on CHO) and then to acid (0 H on COOH); 2° has 1 H → can be oxidised to ketone (0 H on C=O, no further oxidation possible without C–C cleavage); 3° has 0 H → NO oxidation. The rule is mechanical: check the H count on the carbon bearing OH.
- **Temperature controls dehydration product type**: 140°C with 1° alcohols → ether (bimolecular, SN2-like on protonated alcohol); 170°C → alkene (elimination predominates). One substrate, two products controlled by temperature.

## Why Students Fail
- Predicting that alcohols react with NaOH (they don't; only phenols do — the extra resonance stabilisation of the phenoxide ion makes phenol acidic enough).
- Forgetting that OH is a poor leaving group — trying to apply SN2 directly to R–OH with a nucleophile without acid activation.
- Confusing PCC (stops at aldehyde) with Jones/KMnO₄ (goes to acid) — the oxidation endpoint matters enormously in synthesis.

## Misconceptions
1. **"Alcohols react with NaOH because OH is acidic"** (Type 1 — overgeneralization from the acid–base chapter, where "acids react with bases"; students apply this without checking whether the alcohol pKₐ ~16–18 is below or above NaOH's conjugate acid pKₐ ~15.7 for water — the equilibrium does NOT strongly favour product for ordinary alcohols; only phenol, pKₐ ~10, reacts appreciably with NaOH).
   - Probe: "Does ethanol (pKₐ 16) react with NaOH (conjugate acid water, pKₐ 15.7)?"
   - Characteristic phrase: "alcohols are acids so they react with all bases" / "OH group reacts with NaOH"
   - Intervention: compare pKₐ of ethanol (16) and water (15.7); equilibrium: EtOH + NaOH ⇌ EtO⁻Na⁺ + H₂O; K = 10^(15.7−16) ≈ 0.5 — not strongly favoured. Then compare phenol (pKₐ 10): K = 10^(15.7−10) ≈ 10⁵ — strongly favoured. Only phenol reacts visibly with NaOH.

2. **"PCC and KMnO₄ give the same product from a primary alcohol"** (Type 5 — instruction-induced: both are listed as "oxidising agents for alcohols" in many textbooks without clearly distinguishing endpoint; students treat "oxidises" as synonymous).
   - Probe: "You want to convert 1-butanol to butanal (the aldehyde). Do you use PCC or KMnO₄? What does the other reagent give?"
   - Characteristic phrase: "both give the oxidised product" / "any oxidising agent does the job"
   - Intervention: PCC is a mild, anhydrous, non-aqueous oxidant; the aldehyde product cannot be further oxidised (anhydrous conditions prevent hydration of aldehyde to gem-diol, the substrate for further oxidation). KMnO₄ in aqueous base is a strong oxidant that oxidises the intermediate aldehyde all the way to the carboxylic acid.

3. **"Tertiary alcohols can be oxidised to ketones"** (Type 2 — perceptual intuition: students count the carbons around the OH-bearing carbon and see "it's carbon-heavy, surely something can be oxidised"; but there is no C–H bond at the carbinol carbon to cleave for oxidation under mild conditions).
   - Probe: "Draw the product of oxidising 2-methyl-2-propanol (t-butanol) with Jones reagent."
   - Characteristic phrase: "three carbon groups oxidised to give something" / "it must react somehow"
   - Intervention: write the carbon's bond situation for t-BuOH: C(CH₃)₃–OH; the central carbon has no H — oxidation of an alcohol requires removing the H from the C–OH bond (the α-hydrogen); without it, no mild oxidation can proceed. Harsh conditions (conc. H₂SO₄ at high temperature) would cause C–C cleavage, not simple oxidation.

## Analogies
- **Good**: Activating an alcohol for substitution is like getting a non-cooperative guest (OH⁻) to leave by offering them a taxi voucher (H⁺ to form H₂O, a willing leaver). The door can only open once they've accepted the voucher.
- **Anti-analogy**: Do NOT say "alcohols are like water with one H replaced by R" as a reactivity guide — while the structural analogy is accurate, it misleads students into thinking ROH will react wherever H₂O reacts (e.g., in esterification, hydration reactions, etc. — the analogy breaks at every mechanistic detail).

## Demonstrations
- **Lucas test**: set up three tubes with 1°, 2°, 3° alcohols in Lucas reagent (ZnCl₂/HCl); observe time for turbidity (3° = instant, 2° = ~5 min, 1° = no reaction at room temperature) — a simple visual diagnostic for degree.
- **Oxidation contrast**: oxidise 1-propanol with PCC (gives propanal, confirmed by Tollens' silver mirror test) vs. with Jones reagent (gives propanoic acid, confirmed by reaction with Na₂CO₃ and CO₂ evolution) — same substrate, same oxidation, different endpoint = different reagent.
- **Sodium metal test**: add small pieces of Na to ethanol and then to water; compare rate of H₂ evolution; note that alcohol reacts more slowly (weaker acid, less H⁺ available) — qualitative acidity comparison.

## Discovery Questions
1. Ethanol has bp 78°C; diethyl ether has bp 35°C; butane has bp −1°C. All have similar molecular weights. What structural feature of ethanol explains its high boiling point?
2. Treating 2-butanol with H₂SO₄ at 170°C gives a mixture of two alkenes. What are they, and which is the major product? (Zaitsev — more substituted alkene.)
3. You need to make pentanal from 1-pentanol without going all the way to pentanoic acid. Which oxidising agent would you choose?
4. Lucas test: 2-methylpropan-2-ol reacts immediately; 2-methylpropan-1-ol does not react at room temperature. Explain the difference in terms of mechanism.

## Teaching Sequence
1. **Structure and classification**: draw 1°, 2°, 3° examples; establish the carbinol carbon concept.
2. **Physical properties**: predict bp trend from H-bonding; confirm with data; contrast with ether.
3. **Acidity**: rank alcohols < water < phenol (pKₐ 16–18, 15.7, 10); explain Na reaction (produces alkoxide + H₂).
4. **Substitution — the leaving-group problem**: explain why OH can't leave; show protonation → H₂O as leaving group; introduce Lucas test.
5. **Dehydration**: acid-catalysed; Zaitsev's rule for major alkene; temperature-control of ether vs. alkene.
6. **Oxidation**: PCC vs. Jones/KMnO₄ distinction; connect 1°/2°/3° substrate to product; the "no H on carbinol C → no oxidation" rule.
7. **Synthesis connections**: esterification; Williamson ether synthesis via alkoxide + alkyl halide (link to SN2 from chem.hal.sn2).

## Tutor Actions
- **If student predicts alcohol + NaOH reaction**: ask "what is the pKₐ of ethanol?" and "what is the pKₐ of water?"; show that K < 1 for ethanol + NaOH; contrast with phenol.
- **If student confuses PCC and KMnO₄**: draw the oxidation chain (1° → aldehyde → acid) and ask "at which step does each reagent stop?"
- **If student tries to oxidise a tertiary alcohol**: ask "draw the carbinol carbon with all its bonds — how many H atoms are attached to it directly?"

## Voice Teaching Notes
- The phrase "OH is a poor leaving group — you must activate it first" is the master key to this entire concept; say it before any substitution problem involving an alcohol.
- For oxidation, the mnemonic "check H on the carbinol carbon" gives an immediate answer without memorising lists of reagents first.
- Lucas test timing is a useful verbal anchor: "3° = instant; 2° = wait; 1° = heat needed" — rehearse this as a jingle until it is automatic.

## Assessment Signals
- **Green**: predicts dehydration product (Zaitsev) and names the required conditions; selects PCC for aldehyde synthesis from primary alcohol; explains why 3° alcohol is not oxidised; explains why phenol (not ethanol) reacts with NaOH.
- **Amber**: knows the reactions exist but confuses reagent endpoints (PCC vs. KMnO₄); applies Zaitsev without explaining why.
- **Red**: predicts alcohol + NaOH reaction; tries to directly substitute OH without protonation; says 3° alcohol gives a ketone on oxidation.

## Tutor Recovery Strategy
- NaOH confusion: compare pKₐ numerically; draw the equilibrium arrow and show that for ethanol it barely favours product.
- PCC/KMnO₄ confusion: the keyword is "anhydrous" for PCC — without water, aldehyde hydration to gem-diol cannot occur, so further oxidation is blocked.
- 3° oxidation error: draw the mechanism of chromate oxidation (requires a C–H bond α to the OH to form a chromate ester, then elimination of Cr(IV)); if no H is on the carbinol C, the ester cannot form.

## Memory Hooks
- **1° → aldehyde (PCC) or acid (Jones); 2° → ketone; 3° → nothing** — the three-row oxidation table.
- **Lucas test timing: 3° = instant, 2° = minutes, 1° = needs heat** — diagnoses degree of substitution.
- **Dehydration temperature: 140°C = ether, 170°C = alkene** — temperature is the control dial.
- **Phenol + NaOH ✓; Ethanol + NaOH ✗** — pKₐ comparison determines which "wins."

## Transfer Connections
- **Grignard synthesis (chem.hal.grignard)**: Grignard reagents (RMgX) add to aldehydes and ketones to give alcohols — connecting this and the next topic in the production chain.
- **Elimination (chem.hal.elimination)**: alcohol dehydration IS an elimination reaction (E1 for 3°, acid-catalysed); the two concepts are parallel and share the Zaitsev rule.
- **Ester chemistry**: esterification product (ester) is the entry point to hydrolysis, saponification, Claisen condensation — alcohol chemistry is the gateway.
- **Biochemistry**: alcohol dehydrogenase oxidises ethanol to acetaldehyde (ethanal) — same chemistry as the laboratory PCC oxidation, using NAD⁺ as the oxidant (a biological hydride acceptor).

## Cross-Subject Connections
- **Biology**: glycerol (propane-1,2,3-triol) is the backbone of triglycerides; serine and threonine are amino acids with hydroxyl groups that are phosphorylated (a substitution reaction) in signalling; fermentation of glucose → ethanol + CO₂ is a core metabolic pathway.
- **Environmental**: methanol poisoning (oxidation by alcohol dehydrogenase gives formaldehyde and formic acid — the toxic products); ethanol metabolism; biofuels (ethanol fermentation from sugars).
- **Forensic science**: breathalyser uses Cr(VI) (dichromate, orange → Cr(III), green) to oxidise ethanol — a macroscopic colour-change version of the Jones/chromate oxidation.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.alc.alcohols`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.alc.alcohols` as of 2026-07-23.

## Curriculum Feedback
- The domain `chem.alc` (alcohols and ethers) presumably contains both alcohols and ethers. If ethers are a separate KG node, it should be flagged as a sibling concept at approximately the same topological level, since Williamson ether synthesis requires the alkoxide (derived from alcohol + base).
- The Lucas test as a diagnostic tool deserves explicit mention in any associated assessment-design resources; it is one of the rare simple wet-chemistry tests that probes mechanism, not just functional group presence.

## Version History
- v1.0.0 — 2026-07-24 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

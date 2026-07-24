# SN1 Mechanism — `chem.hal.sn1`

## Identity
- **KG ID**: chem.hal.sn1
- **Subject**: chemistry
- **Domain**: chem.hal
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.org.reactive-intermediates, chem.hal.introduction
- **Unlocks**: (none — terminal node)

## Learning Objective
Describe the SN1 mechanism including the rate-determining step and the carbocation intermediate; explain the stereochemical outcome (racemisation); predict the factors that favour SN1 over SN2 (substrate, solvent, leaving group, nucleophile); describe rearrangements in SN1; and compare SN1 with SN2 reaction characteristics.

## Core Understanding
**SN1 mechanism — stepwise ionisation**:
SN1 = Substitution, Nucleophilic, Unimolecular. The reaction proceeds in TWO distinct steps:

**Step 1 (slow, rate-determining)**: Ionisation — the C–X bond breaks HETEROLYTICALLY; the leaving group departs with both electrons → CARBOCATION intermediate (R₃C⁺) formed. This step is UNIMOLECULAR (involves only the substrate) → rate = k[R–X], NOT dependent on nucleophile concentration.

**Step 2 (fast)**: Nucleophilic attack — the nucleophile attacks the PLANAR carbocation intermediate. Because the carbocation is sp² hybridised and PLANAR, the nucleophile can attack from EITHER FACE with EQUAL probability → gives a RACEMIC MIXTURE (50% inversion + 50% retention) if the substrate was chiral. (In practice, slight excess of inversion is common due to ion-pairing — the leaving group partially shields one face — but racemisation is the theoretical expectation.)

**Energy profile**: two-step with an energy maximum at each transition state and a MINIMUM (the carbocation) between them. The first TS (ionisation) is higher in energy than the second TS (nucleophilic attack) → Step 1 is rate-determining.

**Factors favouring SN1**:

1. **Substrate structure — tertiary > secondary >> primary (SN1 essentially never occurs at methyl)**:
   - SN1 requires a carbocation. Tertiary carbocations are stabilised by hyperconjugation and +I of three alkyl groups. Secondary carbocations are less stable. Primary carbocations are too unstable to form under SN1 conditions (they rearrange or proceed via SN2 instead).
   - Allylic and benzylic substrates also favour SN1 (allylic/benzylic carbocations stabilised by resonance).

2. **Leaving group ability**: same as SN2 — better leaving group (weaker conjugate base: I⁻ > Br⁻ > Cl⁻ > F⁻; TsO⁻, TfO⁻ are excellent) favours SN1. A better leaving group lowers the activation energy for Step 1.

3. **Solvent — polar PROTIC solvents strongly favour SN1**:
   - Polar protic solvents (H₂O, ROH, RCOOH, HCONH₂) stabilise BOTH the carbocation (by ion-dipole interaction and electrostatic stabilisation of the cation) AND the leaving group anion (by hydrogen bonding) → stabilise the transition state for Step 1 → lower activation energy → favour ionisation → SN1.
   - Polar aprotic solvents (DMSO, acetone, DMF, CH₃CN) do NOT hydrogen-bond to X⁻ → less stabilisation of the ion pair → SN1 rate drops; these solvents favour SN2 instead.

4. **Nucleophile — SN1 rate is INDEPENDENT of nucleophile identity and concentration**:
   - Rate law: rate = k[substrate] (first-order, unimolecular).
   - Since Step 2 is fast, even weak nucleophiles (H₂O, ROH) can react once the carbocation forms. This means SN1 reactions can proceed in water (a weak nucleophile by organic chemistry standards) as the solvent.
   - Strong nucleophiles push toward SN2 (they can compete in Step 1 before ionisation completes).

5. **Temperature**: SN1 is typically associated with higher temperatures (greater activation energy for ionisation); SN2 is faster at lower temperatures for primary substrates.

**Stereochemical outcome — racemisation**:
When the carbon centre is a STEREOCENTRE (chiral carbon), SN1 gives a RACEMIC PRODUCT (approximately equal amounts of R and S enantiomers). Mechanistic reason: the carbocation intermediate is sp² hybridised → PLANAR → the nucleophile attacks both faces equally (no face preference) → equal R and S product.

In reality, due to **ion pairing** (the leaving group remains close to one face of the carbocation, partially blocking nucleophilic attack from that face), there is often slight EXCESS OF INVERSION over retention. But the theoretical and simplest description is racemisation.

**Carbocation rearrangements in SN1**:
Because SN1 goes through a carbocation intermediate (with a finite lifetime), 1,2-hydride shifts and 1,2-alkyl shifts (Wagner–Meerwein) can occur BEFORE nucleophilic attack if they lead to a MORE STABLE carbocation:

- 3,3-dimethyl-2-butyl system → initial 2° carbocation → 1,2-methyl shift → 3° carbocation → nucleophile attacks at new position → rearranged product.
- Rearrangements are diagnostic for SN1: if a rearranged product is observed, the reaction cannot be SN2 (which has no intermediate).

**SN1 vs. SN2 comparison**:
| Feature | SN1 | SN2 |
|---|---|---|
| Steps | 2 (ionisation + attack) | 1 (concerted) |
| Rate law | Rate = k[R–X] | Rate = k[R–X][Nu] |
| Intermediate | Carbocation | None (TS only) |
| Stereochemistry | Racemisation (mixture R+S) | Complete inversion (Walden inversion) |
| Substrate preference | 3° > 2° >> 1° > Me | Me > 1° > 2° >> 3° (opposite) |
| Solvent preference | Polar PROTIC | Polar APROTIC |
| Nucleophile effect | None (rate independent) | Strong Nu → faster |
| Rearrangements | YES (carbocation) | NO |

**Special case: solvolysis**:
When the solvent itself is the nucleophile (water → hydrolysis; ethanol → ethanolysis), the reaction is called SOLVOLYSIS. It is always SN1 (the solvent is a weak nucleophile and is present in vast excess → concentration effects not meaningful → SN1 conditions).

## Mental Models
**SN1 as a two-stage relay race**: in SN1, the substrate first runs alone to the handoff point (ionisation — rate-determining, only the substrate in the TS). Once the carbocation is formed (the baton passed), the nucleophile enters the race and picks up the baton (fast Step 2). The race's speed depends only on how fast the first runner (substrate) reaches the handoff — the nucleophile doesn't matter until then. In SN2, both runners are in the TS simultaneously and the speed depends on both.

**Planar carbocation as a bull's-eye target**: the sp² carbocation is flat, like a bull's-eye target — equally visible from above and below. The nucleophile dart can hit from either side with equal probability → 50% from each side → racemic mixture. If there were a shield on one side (the ion pair with the leaving group), slightly more hits from the other side → slight excess of inversion.

## Why Students Fail
Students write the SN1 rate law as rate = k[R–X][Nu] (confusing with SN2). They draw SN1 on primary substrates (too unstable a carbocation). They say SN1 gives pure inversion (confusing with SN2's Walden inversion). They forget that rearrangements are diagnostic of SN1 (no rearrangement is possible in SN2).

## Misconceptions
- **MC-1 (Type 1 — overgeneralization)**: "SN1 reactions always give complete racemisation, with exactly 50% R and 50% S product." Probe: "In practice, SN1 reactions on chiral tertiary substrates often show slight predominance of one enantiomer. What could cause this departure from perfect 50:50?" Characteristic phrase: "SN1 = always exactly racemic." Intervention: THEORETICAL SN1 gives racemisation because the planar carbocation is attacked from both faces with equal probability. In practice, ion pairing between the carbocation and the departing X⁻ means X⁻ partially occupies one face of the carbocation, reducing access for the nucleophile from that side → SLIGHT EXCESS OF INVERSION over retention. Perfect 50:50 racemisation is the SIMPLEST MODEL and remains the exam-level answer, but real systems show slight inversion excess. The degree of ion pairing depends on solvent polarity (more ion pairing in less polar solvents → more inversion) and on the lifetime of the carbocation (longer-lived → more time for the ion pair to separate → more racemisation). Students should know the mechanism predicts racemisation AND that slight inversion excess is observed in practice.
- **MC-2 (Type 4 — notation-induced)**: "The rate equation for SN1 is rate = k[R–X][Nu], the same format as SN2 but with different k values." Probe: "In SN1, which step is rate-determining? Does that step involve the nucleophile?" Characteristic phrase: "SN1 and SN2 both depend on the nucleophile concentration." Intervention: SN1 rate = k[R–X] ONLY. The rate-determining step is IONISATION (Step 1), which involves ONLY the substrate (R–X breaking apart) — the nucleophile does NOT participate in this step. The nucleophile enters only in Step 2 (fast, after the carbocation forms) → the nucleophile has no effect on the overall rate. This is what "Unimolecular" means in SN1 — the rate-determining step is first-order in ONE species (the substrate). Doubling the nucleophile concentration has NO EFFECT on SN1 rate. Contrast with SN2 (bimolecular): rate = k[R–X][Nu] — both substrate and nucleophile are in the rate-determining (and only) step.
- **MC-3 (Type 5 — instruction-induced)**: "SN1 is always better than SN2 because it's a simpler, single-step ionisation." Probe: "Would SN1 occur with methyliodide (CH₃I) in a polar protic solvent? What intermediate would form, and is it stable?" Characteristic phrase: "SN1 is simpler so it's always preferred." Intervention: SN1 requires a STABLE CARBOCATION INTERMEDIATE. A methyl (CH₃⁺) or primary (RCH₂⁺) carbocation is EXTREMELY UNSTABLE (virtually no stabilisation, very high energy). SN1 is ONLY preferred for substrates that can form STABLE (tertiary, allylic, benzylic) carbocations. For methyl and primary alkyl halides, the carbocation is too unstable to form → SN1 does NOT occur → SN2 is the only viable pathway. "Simpler" does not mean "always preferred" — the carbocation stability gate must be met. SN1 is not a shortcut available to every substrate; it is only accessible to tertiary (and sometimes secondary) substrates or those with resonance-stabilised carbocations.

## Analogies
**Valid**: tertiary vs. primary SN1 is like the difference between a well-lit city junction (3° carbocation — surrounded by stabilising alkyl "neighbours", easy to form, many paths forward) and a lone lamppost in the middle of nowhere (methyl or 1° carbocation — no stabilising neighbours, high energy, not viable). A traveller can stop at the city junction and be helped quickly; stopping in the middle of nowhere is too costly to even attempt.

## Demonstrations
**SN1 vs. SN2 selectivity by substrate and solvent**: prepare two test tube sets: tert-butyl bromide and n-butyl bromide. Add AgNO₃/ethanol to each. The tertiary substrate (t-BuBr) gives an immediate AgBr precipitate (SN1, fast ionisation in polar protic ethanol, Ag⁺ helps pull out Br⁻). n-BuBr gives a much slower, or negligible, precipitate without strong nucleophile (SN2 requires nucleophile; SN1 is inaccessible for primary). Direct visualisation of substrate-controlled mechanism selection.

**Rearrangement product demonstration**: react neopentyl bromide ((CH₃)₃CCH₂Br, primary — but rearranges to tertiary carbocation via 1,2-methyl shift) with AgNO₃/water — observe rearranged alcohol product (2-methylbutan-2-ol rather than neopentyl alcohol). GC-MS or NMR identification of rearranged product distinguishes SN1 (rearrangement) from SN2 (no rearrangement expected).

## Discovery Questions
1. "2-bromo-2-methylbutane reacts with water/ethanol at 50°C to give two products: 2-methylbutan-2-ol (major, >90%) and 2-methylbut-2-ene (minor). (a) Propose a mechanism for each product, including the rate-determining step and the carbocation intermediate. (b) How would changing the solvent to DMSO with NaOH affect the product distribution?"
2. "3,3-dimethyl-1-butanol reacts with HBr to give 2-bromo-2-methylbutane as the major product, not 1-bromo-3,3-dimethylbutane. Explain this observation in terms of the SN1 mechanism, specifying the rearrangement step."

## Teaching Sequence
1. Rate law and name: SN1, unimolecular, rate = k[R–X]. Contrast with SN2 (bimolecular).
2. Mechanism, Step 1: ionisation, C–X heterolytic cleavage, carbocation formed. Rate-determining step. Energy diagram with two maxima and one minimum (carbocation well).
3. Mechanism, Step 2: nucleophilic attack on planar carbocation, from either face equally. Fast step.
4. Stereochemistry: carbocation is sp², planar → attack from both faces → racemisation. Ion pairing → slight inversion excess in practice.
5. Factors favouring SN1: substrate (3° > 2°; allylic/benzylic); leaving group (better LG → faster Step 1); polar protic solvent (stabilises cation and anion); weak nucleophile (strong nucleophile → SN2 competes).
6. Carbocation rearrangements: 1,2-hydride and 1,2-alkyl shifts; diagnostic for SN1.
7. SN1 vs. SN2 comparison table (complete).

## Tutor Actions
- **If student includes nucleophile in rate law**: ask "Which step is rate-determining?" (Step 1 — ionisation.) "Does Step 1 include the nucleophile?" (No — only R–X ionises.) "So which species appears in the rate law?" (Only R–X.) "Rate = k[R–X]."
- **If student says SN1 gives pure inversion**: ask "Why does SN2 give inversion?" (Backside attack — nucleophile attacks from opposite face.) "In SN1, the carbocation is flat — how many faces does it have?" (Two.) "Does the nucleophile prefer one face?" (No — equal probability.) "So the product is..." (Racemic mix of R and S.)
- **FRAGILE sign**: student can state that SN1 gives racemisation and is first-order but cannot explain mechanistically why racemisation occurs (flat carbocation, attack from both faces) or why the rate law excludes the nucleophile.

## Voice Teaching Notes
The mechanistic two-step narrative is essential in voice. First establish what "unimolecular rate-determining step" means before naming the mechanism: "Imagine you're trying to enter a club. In SN1, the bouncer (the C–X bond) lets you leave first — the leaving group walks out alone, forming the carbocation. THEN the nucleophile can come in. The rate at which people leave depends only on how quickly the bouncer lets them go — NOT on how many people are outside waiting (nucleophile concentration doesn't matter)." Then contrast immediately with SN2: "In SN2, the incoming and outgoing people have to squeeze past each other at the same time — BOTH are in the rate-determining step." This contrast locks in the rate law distinction.

## Assessment Signals
- **Green**: writes rate = k[R–X] for SN1 (NOT rate = k[R–X][Nu]); draws two-step mechanism correctly (ionisation → carbocation → nucleophilic attack); states that SN1 gives racemisation and explains WHY (planar carbocation, attack from both faces); correctly ranks substrates 3° > 2° >> 1° (and explains why methyl/primary do NOT do SN1); states polar protic solvents favour SN1; identifies rearrangements as diagnostic for SN1.
- **Amber**: correct mechanism but says rate = k[R–X][Nu]; or correct rate law but draws inversion instead of racemisation.
- **Red**: says SN1 gives complete inversion; says rate depends on nucleophile; draws SN1 on methyl substrate; says rearrangements can occur in SN2.
- **Probe**: "Would (CH₃)₃CCl undergo SN1 or SN2 in 80% water/20% acetone? Justify from rate law, substrate, and solvent. What is the stereochemical outcome?"

## Tutor Recovery Strategy
If student confuses SN1 and SN2 stereochemistry: the clearest fix is to contrast the physical picture. "In SN2: nucleophile attacks from the BACK, leaving group leaves from the FRONT — like an umbrella inverting in the wind. Both happen at ONCE. Result: only inversion." "In SN1: the leaving group leaves FIRST, leaving a flat carbocation. Now the nucleophile sees a flat target — no preference for either face. It attacks from both sides equally." Draw a carbocation with an arrow pointing from above and another from below, both labelled "Nu attack — 50%". The visual of equal-probability attack on a flat intermediate locks in racemisation.

## Memory Hooks
- **Rate law**: "SN1: rate = k[substrate]. ONE species in rate law. Nucleophile doesn't matter for rate."
- **Mechanism**: "Step 1 (slow): R–X → R⁺ + X⁻ (ionisation). Step 2 (fast): R⁺ + Nu → R–Nu."
- **Stereochemistry**: "Planar carbocation → attack from BOTH faces → RACEMISATION (not inversion)."
- **SN1 vs. SN2 quick guide**: "SN1: 3°, polar protic, weak Nu, rearrangements possible, racemisation. SN2: 1°/Me, polar aprotic, strong Nu, no rearrangements, inversion."
- **Rearrangements**: "Rearrangement = diagnostic for SN1 (carbocation lifetime allows 1,2-shift). Never in SN2."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for SN1 substitution chemistry.

## Cross-Subject Connections
- **Biochemistry**: biological nucleophilic substitutions (enzymatic) are almost exclusively SN2 in character (chiral centres; enzymes provide precise backside attack geometry; retention or inversion as mechanistic probes). However, some enzymatic reactions proceed through carbocation-like transition states (e.g., the mechanism of glycoside hydrolysis by lysozyme involves an oxocarbenium ion — a cyclic carbocation stabilised by an adjacent oxygen, chemically analogous to an allylic/benzylic carbocation). The SN1/SN2 distinction is also diagnostic in enzyme mechanism studies: inversion of configuration at the substrate carbon = SN2-like (one active-site nucleophile); retention = either double-SN2 (two inversions) or SN1-like (with strict facial selectivity imposed by the enzyme active site).
- **Pharmaceutical chemistry**: the SN1 mechanism underlies the mustard gas chemical warfare agent mechanism and nitrogen mustard chemotherapy agents (chlorambucil, cyclophosphamide): bifunctional alkylating agents form an aziridinyl cation (cyclic carbocation equivalent) via intramolecular SN1-type ionisation, then alkylate two guanine bases in DNA (cross-linking the double helix → apoptosis → anti-tumour activity). Understanding the SN1/carbocation pathway is essential for designing both the drugs and their antidotes.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.hal.sn1`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.hal.sn1` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

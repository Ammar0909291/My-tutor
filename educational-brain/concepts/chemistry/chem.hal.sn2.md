# SN2 Mechanism — `chem.hal.sn2`

## Identity
- **KG ID**: chem.hal.sn2
- **Subject**: chemistry
- **Domain**: chem.hal
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.org.reactive-intermediates, chem.hal.introduction
- **Unlocks**: (none — terminal node)

## Learning Objective
Describe the SN2 mechanism including the transition state, the backside attack trajectory, and Walden inversion; predict stereochemical outcomes for chiral substrates; explain the factors that favour SN2 (substrate, nucleophile strength, solvent, leaving group); and compare SN2 with SN1 reaction characteristics.

## Core Understanding
**SN2 mechanism — concerted displacement**:
SN2 = Substitution, Nucleophilic, Bimolecular. The reaction is CONCERTED: bond formation (Nu→C) and bond breaking (C→X) happen SIMULTANEOUSLY in a single step, with no intermediate. The reaction passes through a single TRANSITION STATE.

**The SN2 transition state**:
At the transition state, the nucleophile approaches from directly BEHIND the leaving group (180° from the C–X bond direction = backside attack). The transition state has a TRIGONAL BIPYRAMIDAL geometry: the five groups involved are:
- Nucleophile (partially bonded, partially negative)
- Carbon centre (central — switching from sp³ to the TS geometry and back to sp³)
- The three substituents (in an equatorial plane, perpendicular to the Nu–C–X axis)
- Leaving group (partially bonded, partially negative)

The three substituents on the sp³ carbon invert through the TS like an umbrella inverting in a strong wind — the nucleophile pushes from one side and the leaving group is ejected from the opposite side.

**Walden inversion (stereochemical outcome)**:
In SN2, COMPLETE INVERSION of configuration at the chiral carbon occurs:
- (R) substrate → (S) product (or (S) → (R)).
- The inversion is STEREOSPECIFIC: it occurs with 100% selectivity at the carbon centre.
- This is the "Walden inversion" — named for Paul Walden who discovered it in 1896.
- Evidence for inversion: SN2 on (R)-2-bromobutane with NaOH gives (S)-2-butanol — the optical rotation inverts. The retention product is never formed in SN2.

**Rate law — second-order**:
Rate = k[R–X][Nu]
Both the substrate AND the nucleophile appear in the rate law (bimolecular, both in the one-step transition state). Doubling [Nu] doubles the rate. Doubling [R–X] doubles the rate.

**Factors favouring SN2**:

1. **Substrate structure — methyl > primary > secondary >> tertiary (SN2 essentially never occurs at tertiary)**:
   - Steric hindrance at the carbon centre is the dominant factor. A bulky substrate (tertiary carbon) blocks access of the nucleophile to the backside of the C–X bond — the three alkyl groups sterically shield the carbon, raising the energy of the TS. Methyl has no steric shielding → fastest SN2. Tertiary has three alkyl groups → essentially impossible SN2.
   - Neopentyl ((CH₃)₃CCH₂–X) is PRIMARY but reacts extremely slowly in SN2 — the three methyl groups on the adjacent carbon create severe β-branching steric hindrance.

2. **Nucleophile — strong, unhindered nucleophiles strongly favour SN2**:
   - Strong nucleophiles (I⁻, CN⁻, RS⁻, N₃⁻, RO⁻, OH⁻, NH₃, Br⁻) are present in the transition state → higher [Nu] or stronger Nu → faster rate.
   - Steric bulk of the nucleophile also matters: bulky nucleophiles (e.g., t-BuO⁻) react slowly by SN2 even with primary substrates due to steric clash in the TS.
   - Note: nucleophilicity ≠ basicity. In polar protic solvents, nucleophilicity order for halogens is I⁻ > Br⁻ > Cl⁻ > F⁻ (REVERSE of basicity — the strong solvation of F⁻ by H-bonding makes it a poor nucleophile despite being the strongest base of the four). In polar aprotic solvents (DMSO, DMF), the anions are "naked" (no solvation) → nucleophilicity follows basicity: F⁻ > Cl⁻ > Br⁻ > I⁻.

3. **Solvent — polar APROTIC solvents strongly favour SN2**:
   - Polar aprotic solvents (DMSO, DMF, acetone, CH₃CN, HMPA): have high dielectric constants (dissolve ionic reagents) but CANNOT donate H-bonds. Anionic nucleophiles are not solvated (not sheathed in an H-bond shell) → the nucleophile is "naked" and highly reactive. Dramatically increases SN2 rate compared to protic solvents.
   - Polar protic solvents (H₂O, ROH): H-bond the anionic nucleophile strongly → nucleophile is stabilised (solvated) → less reactive → lower SN2 rate. Protic solvents also stabilise the carbocation intermediate in SN1 → push toward SN1.

4. **Leaving group**: same trend for SN1 and SN2 — better leaving groups favour BOTH. Good leaving groups: I⁻ > Br⁻ > Cl⁻ >> F⁻; TsO⁻, TfO⁻ (excellent). OH⁻ and NH₂⁻ are very poor leaving groups (strong bases → hard to displace). OH is activated as OTs or OMs before SN2.

5. **Temperature**: lower temperatures can slightly favour SN2 (lower ΔS‡ penalty relative to SN1 which has looser TS for ionisation). However, both reactions occur efficiently at room temperature for suitable substrates.

**SN2 in synthesis — useful reactions**:
- **Williamson ether synthesis**: R–O⁻ + R'–X → R–O–R' + X⁻ (SN2, primary R'–X preferred; tertiary R'–X → elimination instead).
- **Gabriel synthesis**: phthalimide anion + RX → N-alkyl phthalimide → hydrolysis → primary amine (avoids polyalkylation problem of ammonolysis).
- **Finkelstein reaction**: halide exchange in acetone. R–Cl + NaI (acetone) → R–I + NaCl (NaCl precipitates from acetone, driving equilibrium; NaBr gives R–Br).
- **Alkylation of malonate, acetoacetate**: stabilised carbanions (enolates) as nucleophiles in SN2 on primary alkyl halides — key step in malonic ester synthesis of substituted acetic acids.

**Comparison table with SN1**:
| Feature | SN2 | SN1 |
|---|---|---|
| Steps | 1 (concerted) | 2 (ionisation + attack) |
| Rate law | Rate = k[R–X][Nu] | Rate = k[R–X] |
| Intermediate | None (single TS) | Carbocation |
| Stereochemistry | Complete INVERSION | Racemisation |
| Substrate | Me > 1° > 2° >> 3° | 3° > 2° >> 1° > Me |
| Solvent | Polar APROTIC | Polar PROTIC |
| Nucleophile | Strong → faster | No effect on rate |
| Rearrangements | NO | YES |

## Mental Models
**SN2 backside attack as a billiard shot**: a billiard ball (nucleophile) strikes another ball (substrate carbon) from directly behind, sending the third ball (leaving group) forward off the opposite side. The collision is simultaneous — there is no intermediate state where the middle ball "waits." The trajectory is perfectly in line (180°) and the middle ball instantaneously passes through the transition state, inverting its face (like the balls' contact face flips).

**The umbrella inversion**: a simple mental picture of the three substituents on the carbon going from pointing "away from the nucleophile" to pointing "toward where the nucleophile came from" as the nucleophile attacks and the LG departs. The carbon inverts like an umbrella turning inside out — a complete reversal of spatial arrangement.

## Why Students Fail
Students draw SN2 as two steps (similar to SN1). They say the product retains configuration (confusing with some enzymatic mechanisms). They apply SN2 to tertiary substrates without recognising the steric problem. They confuse nucleophilicity with basicity (especially when the question specifies solvent type).

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "SN2 on a secondary substrate in water always gives the inversion product cleanly." Probe: "If you run SN2 on a secondary substrate in water (polar protic), might SN1 compete? What would that do to the stereochemical outcome?" Characteristic phrase: "SN2 always gives inversion." Intervention: PURE SN2 gives complete inversion. BUT secondary substrates can undergo COMPETING SN1, especially in polar protic solvents. If SN1 operates alongside SN2, the product will show: inversion (from SN2) + racemisation (from SN1) → partially inverted product (excess inversion, but not 100%). The cleanest inversion results come from: PRIMARY substrates (only SN2 possible) + strong nucleophile + polar APROTIC solvent (suppress SN1 + enhance SN2 rate). Saying "SN2 always gives clean inversion" is true for PURE SN2 — but secondary substrates under protic conditions can give mixed outcomes due to SN1 contamination.
- **MC-2 (Type 2 — perceptual intuition)**: "A stronger base is always a better nucleophile in SN2." Probe: "I⁻ is a weaker base than F⁻ (pKa HI ≈ −10, pKa HF ≈ 3.2). But in methanol (polar protic), I⁻ is a BETTER nucleophile toward CH₃Br than F⁻. How?" Characteristic phrase: "basicity = nucleophilicity." Intervention: nucleophilicity and basicity measure DIFFERENT things. Basicity measures thermodynamic affinity for a PROTON (H⁺). Nucleophilicity measures kinetic rate of attack on a CARBON electrophile. In polar PROTIC solvents, anions are solvated by H-bonds from the solvent. SMALL, HARD anions (F⁻, OH⁻) are heavily solvated (H-bond strongly to solvent) → large, stabilising H-bond shell → nucleophile must "shed" its solvation shell before attacking C → high activation energy → slow SN2. LARGE, SOFT anions (I⁻) are weakly solvated (poor H-bond acceptors due to large, diffuse electron cloud) → easy to desolvate → fast SN2. In polar aprotic solvents: no H-bonding possible → all anions are naked → nucleophilicity tracks basicity (F⁻ > Cl⁻ > Br⁻ > I⁻). Solvent context is essential for predicting nucleophilicity.
- **MC-3 (Type 4 — notation-induced)**: "The energy diagram for SN2 shows two transition states with a dip in between, similar to SN1." Probe: "How many steps does SN2 have? What does each step imply for the energy profile?" Characteristic phrase: "SN2 has the nucleophile attacking and then the leaving group leaving — two steps, two peaks." Intervention: SN2 is a ONE-STEP CONCERTED mechanism. Bond formation (Nu–C) and bond breaking (C–X) happen SIMULTANEOUSLY. The energy profile has ONLY ONE MAXIMUM (one transition state, one hump) and NO MINIMUM between. There is no intermediate. The Meisenheimer complex (anionic σ complex) is an SN1 analogue only for SNAr — not for SN2. SN1 has TWO maxima and ONE minimum (the carbocation well). Drawing an SN2 energy profile with two humps is a category error — it implies an intermediate exists, which it does not for concerted SN2.

## Analogies
**Valid**: SN2 is like threading a needle — you (the nucleophile) must approach from exactly the right angle (180°, backside) to pass through the eye (the TS) and come out the other side. The thread must be thin (unhindered nucleophile) and the needle eye large (unhindered substrate — primary > methyl). A thick thread (bulky nucleophile) or a tiny eye (tertiary substrate, surrounded by alkyl groups) makes threading impossible or very slow. No waiting — it's a single smooth pass or nothing.

## Demonstrations
**Stereochemical proof of inversion**: react (R)-2-bromobutane (or a chiral haloalkane whose optical rotation is known) with NaOH (polar aprotic if possible; otherwise protic with correction) and measure optical rotation of the product. Observe sign change (inversion confirmed). This is the most direct experimental evidence for the SN2 backside attack mechanism.

**Rate dependence on nucleophile (SN2 vs. SN1)**: measure the rate of reaction of n-butyl bromide (primary, SN2) with varying concentrations of NaI in acetone (Finkelstein conditions). Show rate doubles when [NaI] doubles (first-order in nucleophile). Contrast with t-BuBr in aqueous acetone — rate independent of NaI concentration (SN1). Live demonstration of the rate law difference.

## Discovery Questions
1. "(R)-2-chloropentane reacts with NaCN in DMSO. Predict the mechanism, the rate law, and the stereochemistry of the product. Would the answer change if the solvent were water? Explain."
2. "Neopentyl bromide ((CH₃)₃CCH₂Br) is a primary alkyl halide but reacts very slowly by SN2. It also does not readily undergo SN1. Yet it does react with strong bases at elevated temperatures to give alkenes. Explain the SN2 slowness (with a structural argument) and propose an alternative mechanism for the product formed."

## Teaching Sequence
1. Rate law and name: SN2, bimolecular, rate = k[R–X][Nu]. Contrast: SN1 = k[R–X].
2. Mechanism: single step, concerted; backside attack at 180°; trigonal bipyramidal transition state; bonds forming and breaking simultaneously; no intermediate.
3. Stereochemistry: the Walden inversion — carbon inverts like umbrella; (R) → (S) or (S) → (R); complete (100%) inversion; evidence from optical rotation.
4. Energy profile: one maximum (one TS), no minimum — contrast with SN1's two TS and one minimum.
5. Factors favouring SN2: substrate (steric argument: Me > 1° > 2° >> 3°); nucleophile strength (rate depends on [Nu] and nucleophilicity); solvent (polar aprotic = "naked" nucleophile = SN2 favoured); leaving group (same trend as SN1).
6. Nucleophilicity vs. basicity: protic vs. aprotic solvent distinction; I⁻ is best nucleophile in protic, F⁻ in aprotic.
7. Synthetic applications: Williamson ether synthesis; Finkelstein reaction; Gabriel synthesis outline.
8. SN1 vs. SN2 comparison table.

## Tutor Actions
- **If student says SN2 mechanism is two steps**: draw the reaction coordinate. "Where is the intermediate in SN2?" (There is none.) "How many peaks on the energy diagram?" (One.) "What happens to the Nu–C bond and the C–X bond in that one TS?" (Both are changing simultaneously.) "This is concerted — one step."
- **If student confuses nucleophilicity and basicity in protic solvents**: ask "Why is F⁻ a stronger base than I⁻?" (Smaller, higher charge density, more electronegative.) "Why is F⁻ more solvated in water?" (It forms stronger H-bonds with water.) "If F⁻ is wrapped in water molecules, can it easily attack a carbon electrophile?" (No — must shed solvation first.) "So in water, which is the better nucleophile: well-solvated F⁻ or poorly-solvated I⁻?" (I⁻ — less solvation penalty.)
- **FRAGILE sign**: can state "SN2 gives inversion" and "rate = k[R–X][Nu]" from memory but cannot draw the trigonal bipyramidal TS with correct bond orientations, or cannot explain WHY tertiary substrates resist SN2 (steric argument).

## Voice Teaching Notes
The single most important visual in SN2 is the backside attack trajectory — make this explicit early in voice: "Imagine the C–Cl bond as a gun barrel. The nucleophile attacks from the OPPOSITE end of the barrel — directly behind. The Cl⁻ is shot out the front as the nucleophile enters from the back." Then give the stereochemical consequence immediately: "As the nucleophile pushes in from the back and the Cl exits from the front, the three other substituents on the carbon — like the panels of an umbrella — must swing from pointing toward the Cl side to pointing toward the Nu side. The whole carbon centre INVERTS." This narration of the physical motion makes Walden inversion vivid and memorable without drawing.

## Assessment Signals
- **Green**: writes rate = k[R–X][Nu] correctly; draws the SN2 transition state (trigonal bipyramidal, 180° Nu–C–LG) with partial bonds; states complete inversion (Walden) and explains WHY (backside attack — only one face available); correctly ranks substrate reactivity Me > 1° > 2° >> 3° and gives steric explanation; states polar APROTIC solvents favour SN2 (naked nucleophile); distinguishes nucleophilicity from basicity in protic vs. aprotic solvents; names at least one synthetic application (Williamson, Finkelstein, or Gabriel).
- **Amber**: correct mechanism and rate law but wrong stereochemistry (says retention or partial racemisation); or correct substrate ranking but cannot explain steric argument.
- **Red**: draws SN2 as two steps with a carbocation intermediate; says SN2 gives retention; says tertiary substrates undergo SN2.
- **Probe**: "(S)-2-bromobutane reacts with NaN₃ in DMF. (a) Write the rate law. (b) Draw the TS. (c) Give the stereochemistry of the product. (d) Would this reaction be faster in water or in DMF?"

## Tutor Recovery Strategy
If student cannot explain steric argument for substrate preference: use a physical analogy. "Imagine you want to reach a coffee cup (the carbon) from the back (backside attack). In a methyl cup (no substituents), the back is completely open — you can reach in easily. In a primary cup (one substituent), there's one arm on the side — a bit harder, but manageable. In a secondary cup (two arms), you're trying to reach through two arms — much more difficult. In a tertiary cup (three arms surrounding the back), the back is completely blocked — your hand (nucleophile) can't get in. Steric hindrance around the carbon is what blocks SN2 for tertiary substrates."

## Memory Hooks
- **Rate law**: "SN2: rate = k[R–X][Nu]. BOTH species in rate law."
- **Mechanism**: "ONE step. Concerted. Backside attack (180°). Trigonal bipyramidal TS. No intermediate."
- **Stereochemistry**: "COMPLETE INVERSION — Walden inversion. (R) → (S). Never retention in SN2."
- **Substrate**: "SN2 loves SMALL substrates: Me > 1° > 2° >> 3°. Steric hindrance blocks backside attack."
- **Solvent**: "Polar APROTIC (DMSO, DMF, acetone) → naked nucleophile → SN2 fast. Polar PROTIC → solvated Nu → SN2 slow (SN1 wins)."
- **Nucleophilicity in protic**: "I⁻ > Br⁻ > Cl⁻ > F⁻ in H₂O (solvation effect reverses basicity order). In DMSO: F⁻ > Cl⁻ > Br⁻ > I⁻ (tracks basicity)."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for SN2 substitution chemistry.

## Cross-Subject Connections
- **Biochemistry**: the SN2 mechanism is the operating mechanism for many enzyme-catalysed methyl transfer reactions (methyltransferases: S-adenosylmethionine [SAM] as the methyl donor — an activated methyl group that is transferred by SN2 backside attack by the nucleophilic substrate to give complete inversion at the methyl carbon). The SN2 mechanism is also used by DNA repair enzymes (O⁶-methylguanine methyltransferase: Cys residue acts as a nucleophile in SN2 on the methylated guanine, accepting the methyl group to give S-methylcysteine). Inversion at the carbon is the mechanistic signature of SN2 in enzyme chemistry — detected by using chiral methyl (deuterium/tritium-labelled) donors.
- **Green chemistry**: the shift from polar protic to polar aprotic solvents (DMSO, DMF, NMP) in pharmaceutical synthesis to enhance SN2 rate and selectivity is now tempered by the high toxicity/environmental persistence of polar aprotic solvents. Green chemistry research focuses on finding less toxic alternatives (DMSO is relatively benign; DMF and NMP are reproductive toxins) — 2-methyltetrahydrofuran (2-MeTHF), cyclopentyl methyl ether (CPME), and Cyrene (dihydrolevoglucosenone) are bio-derived alternative polar aprotic solvents. The SN2 solvent optimisation challenge is thus directly entangled with solvent sustainability.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.hal.sn2`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.hal.sn2` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

# Qualitative Organic Analysis — `chem.org.qualitative-analysis`

## Identity
- **KG ID**: chem.org.qualitative-analysis
- **Subject**: chemistry
- **Domain**: chem.org
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.org.purification
- **Unlocks**: (none — terminal node)

## Learning Objective
Apply classical wet chemical tests to identify functional groups in organic compounds; interpret positive and negative results correctly; select the appropriate test for a given unknown; and avoid common procedural errors (wrong reagent, wrong conditions, false positives).

## Core Understanding
**Principle of qualitative organic analysis**: a test reagent produces a characteristic observable change (colour, precipitate, gas, pH change) in the presence of a specific functional group. A POSITIVE result confirms the functional group is present; a NEGATIVE result (properly controlled) excludes it. A result is only meaningful if the appropriate control (blank, known positive, known negative) has been run.

**Alcohols**:
- **Lucas test** (ZnCl₂ in concentrated HCl): classifies primary (1°), secondary (2°), and tertiary (3°) alcohols by the rate of formation of an ALKYL CHLORIDE (insoluble → solution turns cloudy/turbid).
  - 3° alcohol: IMMEDIATE turbidity at room temperature (forms stable 3° carbocation rapidly).
  - 2° alcohol: turbidity after 5–10 minutes at room temperature.
  - 1° alcohol (≤6C): NO turbidity at room temperature; requires heating or no reaction.
  - Limitation: only works for alcohols with ≤6 carbons (larger alcohols are already insoluble — turbidity is not diagnostic).
- **Jones oxidation** (acidic K₂Cr₂O₇ or CrO₃ in H₂SO₄/acetone, orange → green/blue-green Cr³⁺):
  - 1° alcohol: POSITIVE (orange → green) — oxidised to aldehyde then carboxylic acid.
  - 2° alcohol: POSITIVE (orange → green) — oxidised to ketone.
  - 3° alcohol: NEGATIVE — cannot be oxidised under mild conditions (no H on the carbon bearing OH); solution remains orange.
  - Distinction: both 1° and 2° are positive; use along with Tollens' test or Lucas to distinguish.

**Aldehydes and ketones**:
- **Tollens' test** (ammoniacal silver nitrate, Ag[(NH₃)₂]⁺): SILVER MIRROR or grey/black silver precipitate with aldehydes (oxidised to carboxylate; Ag⁺ → Ag metal).
  - POSITIVE: aldehydes (RCHO). Silver mirror forms on clean glass.
  - NEGATIVE: ketones (do not reduce Tollens' reagent under mild conditions). Also negative for carboxylic acids, alcohols.
  - Limitation: formic acid (HCOOH) gives a positive Tollens' (it has an aldehyde-like H). Must be freshly prepared (old Tollens' reagent produces explosive silver azide).
- **Fehling's/Benedict's test** (copper(II) complex in alkaline solution → brick-red Cu₂O precipitate):
  - POSITIVE: ALIPHATIC aldehydes (RCHO) and reducing sugars (glucose, maltose, etc.). Cu²⁺ (blue) → Cu₂O (brick-red precipitate).
  - NEGATIVE: aromatic aldehydes (benzaldehyde — too weakly reducing under these conditions); ketones; non-reducing sugars (sucrose).
  - Distinction from Tollens': Fehling's distinguishes aliphatic from aromatic aldehydes.

**Methyl ketones and CH₃CHOH groups — Iodoform test**:
- **Iodoform test** (I₂/NaOH): yellow crystalline precipitate of CHI₃ (iodoform, distinctive antiseptic smell) if compound has CH₃CO– (methyl ketone) or CH₃CH(OH)– (secondary alcohol with CH₃ adjacent).
  - POSITIVE: acetone, methyl ethyl ketone, ethanol (CH₃CH₂OH, because it is oxidised to acetaldehyde first); acetaldehyde; any CH₃CHOR or CH₃CHO compound.
  - NEGATIVE: most other ketones, most other aldehydes, primary and tertiary alcohols (unless they happen to have CH₃CO structure).
  - KEY: the yellow precipitate is CHI₃ (iodoform), NOT iodine. The reaction iodine colour disappears as iodoform precipitates.

**Alkenes and alkynes**:
- **Baeyer's test** (dilute, cold KMnO₄, purple → brown/colourless; also known as the permanganate decolourisation test):
  - POSITIVE: alkenes, alkynes, aldehydes. KMnO₄ (purple) is decolourised and MnO₂ (brown) precipitates (or the solution becomes colourless in some conditions).
  - NEGATIVE: alkanes, benzene (under mild conditions), ketones, alcohols.
  - Limitation: aldehydes are also positive (MnO₄⁻ oxidises them), so Baeyer's test is NOT specific for C=C alone — Tollens' or Fehling's must be run to check for aldehyde if alkene vs. aldehyde distinction is needed.
  - Also used: bromine water (Br₂ in CCl₄ or H₂O): decolourised immediately with alkenes/alkynes (addition); not decolourised with aromatic rings (under mild conditions) unless a Lewis acid catalyst is present.

**Carboxylic acids**:
- Acidic pH (universal indicator/pH paper, litmus). Add to Na₂CO₃ solution → CO₂ effervescence. Distinguish from phenols (also acidic but weaker — phenols do not react with Na₂CO₃ cold to give CO₂, but do react with NaOH).
- FeCl₃ test for phenols: iron(III) chloride gives violet/purple colouration with phenols (phenolate complex), but NOT with carboxylic acids.

**Amines**:
- Basic pH, distinctivl fishy smell.
- Primary aromatic amines: diazotisation with NaNO₂/HCl at 0–5°C → diazonium salt → coupling with 2-naphthol → bright orange-red AZO DYE (positive for ArNH₂).
- Carbylamine test (isocyanide test): primary amines + CHCl₃ + KOH → isocyanide (R–NC), foul smell. Distinguishes 1° from 2° and 3° amines.
- Hinsberg's test: distinguish 1°, 2°, 3° amines using benzenesulfonyl chloride in alkali — 1° gives soluble sulfonamide in NaOH; 2° gives insoluble sulfonamide; 3° does not react.

**Selecting the right test (decision workflow)**:
1. Acidic or basic? → pH test: distinguish acids (H⁺, react with Na₂CO₃) and amines (OH⁻ in water).
2. Unsaturation? → Baeyer's (KMnO₄) or Br₂ water.
3. Aldehyde? → Tollens' (all aldehydes positive); Fehling's (aliphatic only).
4. Ketone vs. aldehyde? → Tollens' (ketone negative); Jones (both positive for oxidation).
5. Alcohol class? → Lucas test (rate of turbidity); Jones (1°/2° positive, 3° negative).
6. Methyl ketone/methyl secondary alcohol? → iodoform.
7. Phenol? → FeCl₃ (violet colour).

## Mental Models
**Tests as chemical locks and keys**: each functional group is a "lock" (has a specific chemical reactivity); the test reagent is a "key" that opens that lock and produces a visible signal. An incorrect functional group (wrong lock) does not open the key → negative test. The visible signal is the diagnostic output.

**The decision flowchart as elimination**: qualitative analysis is a systematic ELIMINATION process. Start with broadest distinction (acid/base); narrow to compound class (carbonyl/alcohol/alkene); then to specific type (aldehyde vs. ketone; 1°/2°/3° alcohol). Each test eliminates possibilities, not just confirms one.

## Why Students Fail
Students confuse Tollens' (all aldehydes, no ketones) with Fehling's (aliphatic aldehydes and reducing sugars, not aromatic aldehydes). They confuse Baeyer's test positivity (alkenes AND aldehydes — NOT specific for alkenes) with Br₂ water (addition to C=C specifically). They also confuse iodoform precipitate (CHI₃, yellow) with iodine colour (brown/orange) — stopping the test before the yellow precipitate forms.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "A positive Baeyer's test proves the compound contains a C=C double bond." Probe: "Acetaldehyde (CH₃CHO) decolourises KMnO₄ solution. Does this prove it has an alkene?" Characteristic phrase: "KMnO₄ decolouration = alkene." Intervention: KMnO₄ is a strong OXIDISING AGENT — it reacts with any OXIDISABLE organic species: alkenes (syn-dihydroxylation), alkynes, aldehydes (oxidised to carboxylic acid/CO₂), terminal alkynes. A positive Baeyer's test means "oxidisable organic functionality present" — it does NOT specifically mean alkene. To confirm alkene: run Baeyer's AND confirm the compound is not an aldehyde (negative Tollens' test) AND not an alkyne (check with AgNO₃/NH₃ for terminal alkyne → white AgC≡CR precipitate).
- **MC-2 (Type 3 — language contamination)**: "Fehling's test is the same as Tollens' test — both detect aldehydes." Probe: "Would benzaldehyde (PhCHO, an aromatic aldehyde) give a positive Fehling's test?" Characteristic phrase: "all aldehydes are positive for both tests." Intervention: TOLLENS' detects ALL aldehydes (aliphatic and aromatic) because Ag⁺ is a strong enough oxidising agent. FEHLING'S detects only ALIPHATIC aldehydes and reducing sugars — benzaldehyde gives a NEGATIVE Fehling's test (it is not easily oxidised under the mild alkaline/Cu²⁺ conditions). The key distinction: Tollens' uses Ag⁺ (stronger oxidant); Fehling's uses Cu²⁺ (weaker oxidant). This allows differentiation: positive Tollens' + negative Fehling's = aromatic aldehyde.
- **MC-3 (Type 2 — perceptual intuition)**: "Iodoform test is positive for iodine-containing compounds because it uses iodine." Probe: "What is the yellow precipitate formed in the iodoform test? Is it iodine?" Characteristic phrase: "the yellow colour is iodine." Intervention: the iodoform test USES iodine (I₂/NaOH) as a REAGENT, but the PRODUCT is CHI₃ (iodoform, triiodomethane), a pale yellow CRYSTALLINE SOLID with a distinctive antiseptic smell. Iodine itself is orange-brown in solution. A positive iodoform test is identified by the pale yellow crystalline precipitate (and the smell), NOT by the orange colour of excess iodine. If the solution just turns orange, that may be residual iodine or a negative test.

## Analogies
**Valid**: qualitative organic analysis is like a multi-step airport security scan — each detector (test) is sensitive to one type of "contraband" (functional group); passengers who pass all checks are progressively narrowed down. No single test is conclusive alone (a false positive can arise); running a series of tests gives confident identification.

## Demonstrations
**Silver mirror Tollens' test**: clean a glass test tube with NaOH; add freshly prepared Tollens' reagent and a few drops of glucose solution (or formaldehyde); gently warm in a water bath — a bright silver mirror deposits on the inside of the tube. Contrast with a ketone (acetone) — no mirror forms. The visual impact is dramatic and memorable.

**Iodoform formation**: add a small volume of ethanol to I₂/NaOH; gentle warming → pale yellow CHI₃ precipitate appears. Students observe (and smell) the product. Contrast with propan-1-ol (primary alcohol, no adjacent CH₃ → negative iodoform test but positive Lucas, positive Jones).

## Discovery Questions
1. "An unknown compound X is a liquid with a fruity smell. It: (a) turns blue litmus red; (b) gives no silver mirror with Tollens' reagent; (c) gives CO₂ with Na₂CO₃ solution; (d) gives no precipitate with iodoform test. What functional group does X contain? Suggest a structural class for X."
2. "Compound Y gives: positive Tollens' (silver mirror), negative Fehling's, positive Baeyer's (KMnO₄ decolourisation). What structural conclusions can you draw about Y? Name a compound consistent with all three results."

## Teaching Sequence
1. Overview of qualitative analysis strategy: what makes a good diagnostic test (specificity, sensitivity, clear positive, false positive awareness).
2. Lucas test: alcohol classification by carbocation stability; rate trend 3° > 2° > 1°.
3. Jones oxidation: oxidisable (1°, 2°) vs. non-oxidisable (3°) alcohols; colour change Cr(VI) → Cr(III).
4. Tollens' test: all aldehydes; silver mirror formation; mechanism (aldehyde oxidised, Ag⁺ reduced).
5. Fehling's/Benedict's: aliphatic aldehydes and reducing sugars; Cu²⁺ → Cu₂O brick-red.
6. Iodoform test: CH₃CO– or CH₃CH(OH)– groups; yellow CHI₃ precipitate.
7. Baeyer's test: KMnO₄ decolourisation; alkenes, alkynes, aldehydes; bromine water as alternative.
8. Carboxylic acids: pH, Na₂CO₃ effervescence, FeCl₃ for phenols.
9. Putting it together: decision flowchart; worked identification of an unknown.

## Tutor Actions
- **If student says Baeyer's confirms alkene**: "Is an aldehyde also oxidised by KMnO₄?" Yes. "So the test is not specific for alkenes — what else do you need to run?" (Tollens' to exclude aldehyde; Br₂ water as a better C=C specific test).
- **If student confuses Tollens'/Fehling's**: "What is the oxidant in each test?" (Ag⁺ vs. Cu²⁺). "Which is stronger?" (Ag⁺). "So which can oxidise a harder-to-oxidise substrate like an aromatic aldehyde?" (Ag⁺ = Tollens').
- **FRAGILE sign**: can recall test names and positive results but cannot choose the right test for an unknown or explain WHY a specific test is positive/negative for a given functional group.

## Voice Teaching Notes
In voice, anchor each test to ONE visual observation: Tollens' = silver mirror; Fehling's = brick-red precipitate; iodoform = pale yellow crystals (NOT the orange of iodine); Baeyer's = purple → brown/colourless; Lucas = turbidity (cloudiness). Naming the specific observable output first prevents the common error of confusing "positive" tests across reagents.

## Assessment Signals
- **Green**: selects the correct test(s) for any given functional group; correctly identifies positive vs. negative results; distinguishes Tollens' from Fehling's; knows iodoform is CHI₃ not I₂; knows Baeyer's is not specific for alkenes; interprets an unknown's test results to identify its functional group.
- **Amber**: knows the positive results for common tests but cannot use them to distinguish between two functional groups that give similar results (e.g. aromatic vs. aliphatic aldehyde); or confuses the iodoform product with iodine.
- **Red**: says all aldehydes are positive for Fehling's; says Baeyer's is specific for alkenes; says iodoform test detects all iodine-containing compounds.
- **Probe**: "Compound Z gives: (a) positive Jones oxidation (orange → green); (b) negative Tollens'; (c) positive iodoform test; (d) negative Lucas at room temperature (no turbidity). What is the functional group and structural type of Z? Name a specific compound that fits all four results."

## Tutor Recovery Strategy
If student cannot use test results to identify a functional group: build a decision table (test × functional group matrix, showing + or − for each combination). Work through one row at a time — "Lucas gives 3°: immediate, 2°: slow, 1°: no reaction. We observed immediate — therefore 3° alcohol." The table makes implicit knowledge explicit and provides a working reference that students can use during the identification process.

## Memory Hooks
- **Lucas rates**: "3° = IMMEDIATE. 2° = 5–10 min. 1° = no reaction (at room temperature)."
- **Jones**: "1° and 2° alcohols → positive (orange→green). 3° → negative."
- **Tollens'**: "All aldehydes → silver mirror. Ketones → negative."
- **Fehling's**: "Aliphatic aldehydes + reducing sugars → brick red Cu₂O. Aromatic aldehydes → negative."
- **Iodoform**: "CH₃CO– or CH₃CH(OH)– → yellow CHI₃ crystals (NOT orange iodine)."
- **Baeyer's**: "KMnO₄ decolourised by alkenes, alkynes, AND aldehydes (NOT specific for alkenes)."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for organic qualitative analysis.

## Cross-Subject Connections
- **Forensic chemistry**: colour tests (spot tests) for drug identification use the same functional group chemistry — Marquis reagent (H₂SO₄/formaldehyde) for opioids and amphetamines, Mandelin reagent (NH₄VO₃/H₂SO₄) for ketones and alkaloids. The forensic application is systematised qualitative organic analysis at trace levels.
- **Biochemistry**: Benedict's test is used clinically to detect reducing sugars in urine (glucosuria as a diabetes screen). The brick-red Cu₂O precipitate from glucose in urine is one of the earliest (pre-spectrophotometer) diagnostic tests, directly applying Fehling's chemistry.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.org.qualitative-analysis`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.org.qualitative-analysis` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

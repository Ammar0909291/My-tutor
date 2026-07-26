# chem.hyd.alkynes — Alkynes

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.hyd.alkynes` |
| Domain | Hydrocarbons |
| Requires | `chem.hyd.alkenes` |
| Unlocks | (none) |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Lindlar's catalyst (syn addition, both H atoms delivered from the same catalyst surface) gives the CIS-alkene, while Na/liquid NH₃ (anti addition, dissolving-metal mechanism via a vinyl radical) gives the TRANS-alkene — this is the OPPOSITE pairing from a common inversion error; Markovnikov hydration of a terminal alkyne (H₂SO₄/HgSO₄ catalyst) gives a KETONE (methyl ketone), never an aldehyde — OH adds to the MORE substituted carbon, and the resulting enol tautomerizes to the ketone; only anti-Markovnikov hydroboration (9-BBN or disiamylborane, then H₂O₂/NaOH) gives the aldehyde from a terminal alkyne; and terminal alkynes ARE genuinely acidic (pKₐ≈25 for the sp C–H), despite C–H bonds not commonly being thought of as acidic — this pKₐ is low enough that strong, non-basic-oxygen bases like NaNH₂ (conjugate acid NH₃, pKₐ≈38) readily deprotonate them (ΔpKₐ=13, K≈10¹³), though weaker bases like NaOH (conjugate acid water, pKₐ=15.7, weaker than the alkyne itself) cannot.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing Lindlar's syn-addition mechanism (cis product) against Na/NH₃'s anti-addition mechanism (trans product) explicitly for but-2-yne, using the "Lindlar=syn=cis" memory hook grounded in mechanism.

**Representational**: A side-by-side hydration-product diagram: terminal alkyne+H₂SO₄/HgSO₄ (OH at more-substituted C, → methyl ketone) vs. terminal alkyne+hydroboration/H₂O₂ (OH at less-substituted C, → aldehyde).

**Abstract**: The general principle that syn/anti addition mechanism determines cis/trans alkene stereochemistry in partial alkyne reduction; the general Markovnikov-vs-anti-Markovnikov regiochemistry split for alkyne hydration methods; the general pKₐ-based acid-base reasoning for terminal alkyne deprotonation.

**Transfer**: Given an unfamiliar alkyne reduction or hydration scenario, correctly predicting cis-vs-trans alkene product from the reagent's addition mechanism, correctly predicting ketone-vs-aldehyde product from the hydration method's regiochemistry, and correctly assessing whether a given base is strong enough to deprotonate a terminal alkyne from pKₐ comparison.

## 3. Why Beginners Fail

Students mix up the pairing between the two partial-hydrogenation methods and their stereochemical outcomes, perhaps because "Lindlar" sounds like an unfamiliar, foreign-sounding reagent while Na/NH₃ sounds more dramatic/memorable, leading some to invert the pairing, missing that Lindlar's mechanism (both H delivered simultaneously from the catalyst surface, syn addition) genuinely gives the cis product, while Na/NH₃'s mechanism (stepwise, anti addition via a vinyl radical intermediate) genuinely gives the trans product; students overgeneralize from anti-Markovnikov hydroboration (which does give an aldehyde from a terminal alkyne) and confuse it with Markovnikov hydration, predicting an aldehyde from both methods, missing that H₂SO₄/HgSO₄-catalyzed hydration follows MARKOVNIKOV regiochemistry (OH at the more substituted carbon), which after tautomerization gives a KETONE, not an aldehyde — only the anti-Markovnikov hydroboration route gives the aldehyde; and students mentally pair "acidic" exclusively with O–H and N–H bonds (a strong, well-reinforced pattern from earlier acid-base study), treating C–H bonds as categorically non-acidic by default, missing that a terminal alkyne's sp-hybridized C–H bond has a pKₐ (~25) low enough to be deprotonated by sufficiently strong bases (like NaNH₂), a genuinely useful and testable acid-base equilibrium, even though it is far less acidic than O–H/N–H bonds.

## 4. Misconception Library

### MC-1: Lindlar catalyst gives the trans-alkene and Na/NH₃ gives the cis-alkene
- **Probe**: "What is the product of treating but-2-yne with Lindlar's catalyst + H₂?"
- **Characteristic phrase**: "Lindlar gives trans-but-2-ene because it blocks the second addition."
- **Trigger (Type 5, instruction-induced)**: Students mix up the two partial hydrogenation methods, perhaps because "Lindlar" sounds like a foreign/unfamiliar reagent while Na/NH₃ is the more dramatic-sounding reagent — some students invert the pairing.
- **Conflict evidence [P28]**: Lindlar=partial Pd catalyst (quinoline poisoned) on CaCO₃; both H atoms are delivered from the catalyst SURFACE simultaneously (syn addition) → cis product (both H on same face). Na/liq. NH₃: dissolving metal→radical anion→proton from NH₃→vinyl radical→proton→trans (anti addition, the second H approaches from the opposite face of the first). Memory hook: Lindlar=syn=cis.
- **Bridge [P30]**: The stereochemical outcome (cis vs. trans) is a direct MECHANISTIC consequence of HOW each reagent delivers hydrogen — Lindlar's heterogeneous catalyst surface delivers both hydrogens from the SAME face simultaneously (syn), while Na/NH₃'s stepwise radical mechanism allows the intermediate to adopt a more stable configuration before the second protonation (anti) — the pairing is not arbitrary and can be derived from mechanism rather than memorized independently.
- **Replacement [P31]**: Lindlar's catalyst gives syn addition (cis product); Na/liquid NH₃ gives anti addition (trans product) — use the "Lindlar=syn=cis" hook, but always be able to derive it from the underlying mechanism if memory fails.
- **Discrimination pairs [P33]**: But-2-yne+Lindlar/H₂ (cis-but-2-ene, syn addition) vs. but-2-yne+Na/NH₃ (trans-but-2-ene, anti addition) — opposite stereochemical outcomes from the two methods.
- **S6 repair path**: Walk through both mechanisms explicitly (concerted syn on catalyst surface vs. stepwise anti via vinyl radical), deriving the stereochemical outcome from each.

### MC-2: Hydration of a terminal alkyne gives an aldehyde
- **Probe**: "What is the product of reacting hex-1-yne with dilute H₂SO₄ and HgSO₄ catalyst?"
- **Characteristic phrase**: "the OH goes to the terminal C → hexanal" / "hydration always gives an aldehyde."
- **Trigger (Type 1, overgeneralization)**: Students overgeneralize from anti-Markovnikov hydroboration giving an aldehyde; they confuse the two hydration methods and predict aldehyde from both Markovnikov and anti-Markovnikov routes.
- **Conflict evidence [P28]**: H₂SO₄/HgSO₄ gives MARKOVNIKOV addition; the OH goes to the MORE SUBSTITUTED carbon (C-2 for a terminal alkyne); the enol tautomerises to the KETONE (hexan-2-one, a methyl ketone), not an aldehyde. To get an aldehyde from a terminal alkyne, use HYDROBORATION (9-BBN or disiamylborane) followed by H₂O₂/NaOH → anti-Markovnikov → terminal alcohol equivalent → aldehyde.
- **Bridge [P30]**: "Hydration of an alkyne" is not a single, uniform transformation with one guaranteed product — the specific regiochemistry (which carbon gets the OH) depends entirely on the reagent/mechanism used, exactly as with alkenes: Markovnikov (H₂SO₄/HgSO₄, mercurinium-ion-like mechanism) directs OH to the more substituted carbon, while anti-Markovnikov (hydroboration) directs OH to the less substituted (terminal) carbon — the two methods give genuinely different carbonyl products (ketone vs. aldehyde).
- **Replacement [P31]**: Markovnikov hydration (H₂SO₄/HgSO₄) of a terminal alkyne gives a methyl KETONE (OH at the more substituted carbon, then tautomerization); only anti-Markovnikov hydroboration gives the ALDEHYDE — always check which hydration method is specified before predicting the carbonyl product.
- **Discrimination pairs [P33]**: Hex-1-yne+H₂SO₄/HgSO₄ (Markovnikov, → hexan-2-one, a ketone) vs. hex-1-yne+hydroboration/H₂O₂ (anti-Markovnikov, → hexanal, an aldehyde) — same starting alkyne, opposite carbonyl product from opposite regiochemistry.
- **S6 repair path**: Present both hydration methods side by side for the same terminal alkyne, deriving the differing regiochemistry and resulting carbonyl product for each.

### MC-3: Terminal alkynes are not acidic because carbon-hydrogen bonds are not acidic
- **Probe**: "Can NaNH₂ deprotonate a terminal alkyne? Write the equation."
- **Characteristic phrase**: "NaNH₂ is a base but C–H bonds can't be deprotonated" / "only O–H and N–H bonds are acidic."
- **Trigger (Type 3, language contamination)**: "Acidic" is mentally paired with O–H and N–H bonds; C–H is considered a non-acidic bond by default; students do not recognise the pKₐ≈25 significance for sp carbon.
- **Conflict evidence [P28]**: RC≡CH has pKₐ≈25; NH₃ has pKₐ≈38 → the equilibrium favours deprotonation (ΔpKₐ=13, K≈10¹³). The alkynide ion RC≡C⁻ forms readily. Compare: n-BuLi (pKₐ butane≈50) can deprotonate terminal alkynes; NaOH (pKₐ water=15.7) cannot (pKₐ of alkyne>pKₐ of water→NaOH too weak).
- **Bridge [P30]**: "Acidic" is not a binary category reserved exclusively for O–H/N–H bonds — it is a matter of DEGREE, quantified by pKₐ, and while terminal-alkyne C–H bonds (pKₐ≈25) are far less acidic than O–H/N–H bonds (pKₐ~0–17), they are still substantially more acidic than most other C–H bonds (e.g., alkane C–H, pKₐ~50) due to the high s-character of the sp-hybridized carbon, making them deprotonatable by sufficiently strong bases even though weaker bases (like hydroxide) cannot manage it.
- **Replacement [P31]**: Terminal alkyne C–H bonds are genuinely acidic (pKₐ≈25, due to sp-hybridization) — deprotonatable by strong bases like NaNH₂ or n-BuLi, but not by weaker bases like NaOH; never treat all C–H bonds as categorically non-acidic.
- **Discrimination pairs [P33]**: NaNH₂ (conjugate acid pKₐ≈38, strong enough to deprotonate the alkyne, K≈10¹³) vs. NaOH (conjugate acid pKₐ=15.7, too weak, unfavorable equilibrium).
- **S6 repair path**: Present the explicit pKₐ comparison and K computation for both NaNH₂ and NaOH reacting with a terminal alkyne, deriving which base succeeds.

## 5. Explanation Library

**Primary explanation**: Alkyne partial-hydrogenation stereochemistry follows directly from mechanism — Lindlar's catalyst delivers both hydrogens simultaneously from the same catalyst face (syn addition, cis product), while Na/liquid NH₃'s stepwise radical mechanism gives anti addition (trans product). Alkyne hydration regiochemistry likewise depends on method — Markovnikov hydration (H₂SO₄/HgSO₄) places OH at the more substituted carbon, giving a ketone after tautomerization, while anti-Markovnikov hydroboration gives the aldehyde instead.

**Secondary explanation (terminal alkyne acidity)**: Acidity is a matter of degree, quantified by pKₐ, not a binary property reserved for O–H/N–H bonds — a terminal alkyne's sp-hybridized C–H bond (pKₐ≈25) is substantially more acidic than typical alkane C–H bonds due to high s-character, making it deprotonatable by sufficiently strong bases (NaNH₂, n-BuLi) though not by weaker bases like hydroxide.

## 6. Analogy Library

- **Primary analogy**: Two chefs plating a dish from the same side of the counter simultaneously (Lindlar, syn, cis) vs. two chefs plating from opposite sides at different times (Na/NH₃, anti, trans) — the delivery mechanism directly determines the final arrangement.
- **Breaking point**: The chef-plating analogy conveys the syn-vs-anti mechanism distinction well but doesn't naturally capture the Markovnikov-vs-anti-Markovnikov hydration regiochemistry (MC-2) or the pKₐ-based acidity reasoning (MC-3) — those need the explicit side-by-side hydration comparison and the pKₐ/K computation.
- **Anti-analogy**: Do NOT say "Lindlar is the fancy one so it must give the more complex trans product" — this directly reinforces MC-1 by pairing perceived complexity with stereochemical outcome rather than deriving it from mechanism.

## 7. Demonstration Library

- **Demonstration 1 (Lindlar-vs-Na/NH₃ mechanism comparison)**: Draw both partial-hydrogenation mechanisms explicitly for but-2-yne, deriving cis/trans outcome from syn/anti addition.
- **Demonstration 2 (Markovnikov-vs-anti-Markovnikov hydration comparison)**: Present both hydration methods for the same terminal alkyne side by side, deriving ketone vs. aldehyde product from regiochemistry.
- **Demonstration 3 (pKₐ/K computation for terminal alkyne deprotonation)**: Compute the explicit K value for NaNH₂ and NaOH reacting with a terminal alkyne, determining which base succeeds.

## 8. Discovery Lesson

**Opening**: "Does Lindlar's catalyst give the same alkene stereochemistry as Na/NH₃?"

**Exploration**: Students trace both mechanisms explicitly, discovering the syn-vs-anti addition distinction determines cis-vs-trans product.

**Synthesis**: Guide toward: stereochemical outcome follows directly from HOW hydrogen is delivered (mechanism), not from reagent "familiarity" or complexity.

**Closure**: "Can NaNH₂ deprotonate a terminal alkyne, even though it's a C–H bond?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit Lindlar-vs-Na/NH₃ mechanism comparison for but-2-yne.
- **TA-2 (TELL)**: State the Markovnikov-vs-anti-Markovnikov hydration regiochemistry rule explicitly, anchored to the side-by-side product comparison.
- **TA-3 (DO)**: Student computes the K value for a base+terminal-alkyne deprotonation and predicts whether it succeeds.
- **TA-4 (TEST-THINKING)**: Present the hex-1-yne hydration probe and ask the student to justify the ketone (not aldehyde) product from Markovnikov regiochemistry.

## 10. Voice Teaching

Whenever alkyne partial hydrogenation is discussed, narrate "Lindlar=syn=cis; Na/NH₃=anti=trans — derive it from mechanism if you forget." Whenever alkyne hydration is discussed, state "check Markovnikov vs. anti-Markovnikov before predicting ketone or aldehyde" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly predict cis/trans alkene product from Lindlar vs. Na/NH₃ mechanism, (b) correctly predict ketone/aldehyde product from Markovnikov vs. anti-Markovnikov hydration, (c) correctly assess whether a given base can deprotonate a terminal alkyne from pKₐ comparison.

- **FA-1**: "What is the product of treating but-2-yne with Lindlar's catalyst + H₂?" — targets MC-1.
- **FA-2**: "What is the product of reacting hex-1-yne with dilute H₂SO₄ and HgSO₄ catalyst?" — targets MC-2.
- **FA-3**: "Can NaNH₂ deprotonate a terminal alkyne? Write the equation and justify with pKₐ." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only encountered one of the two partial-hydrogenation methods in depth.

**Delayed retrieval**: Re-probe MC-1's mechanism-derived stereochemistry and MC-2's hydration regiochemistry as foundational knowledge for subsequent multi-step synthesis reasoning involving alkynes.

## 12. Recovery Notes

- **S3 (stuck)**: For the Lindlar/Na-NH₃ confusion, have the student draw the explicit mechanism before predicting stereochemistry, never relying on memorized pairing alone.
- **S4 (frustrated)**: Normalize — mixing up the two partial-hydrogenation methods is genuinely common on first exposure, since both reagent names are unfamiliar.
- **S6 (collision)**: Use the explicit side-by-side hydration comparison for MC-2; use the pKₐ/K computation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why terminal alkynes are more acidic than typical alkane C–H bonds.

## 13. Memory & Review

Tag as two procedural memories (Lindlar/Na-NH₃ mechanism-derived stereochemistry; Markovnikov/anti-Markovnikov hydration regiochemistry) plus one conceptual-correction memory (terminal alkyne C–H acidity via pKₐ). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates addition-mechanism and acid-base reasoning built across `chem.hyd.alkenes`, `chem.hal.sn1`/`chem.hal.sn2`, forming a capstone application of stereochemistry and regiochemistry reasoning to triple-bond systems.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

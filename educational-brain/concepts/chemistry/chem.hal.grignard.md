# Grignard and Organolithium Reagents — `chem.hal.grignard`

## Identity
- **KG ID**: chem.hal.grignard
- **Subject**: Chemistry
- **Domain**: Halogenoalkanes (chem.hal)
- **Prerequisites**: chem.hal.sn1, chem.hal.sn2
- **Difficulty**: advanced
- **Bloom level**: apply
- **Estimated hours**: 2

## Learning Objective
Describe the preparation and polarity of Grignard reagents (RMgX), predict the product of a Grignard addition to a carbonyl compound (aldehyde, ketone, ester, CO₂), explain why anhydrous conditions are essential, and compare Grignard with organolithium reagents in terms of reactivity.

## Core Understanding
**Preparation**: Grignard reagents (RMgX, organomagnesium halides) are prepared by reacting an alkyl or aryl halide with magnesium metal in dry ether (diethyl ether or THF). The mechanism involves radical initiation at the magnesium surface; the product is a C–Mg bond where the carbon is effectively carbanion-like (δ−). The order of reactivity for Mg insertion: RI > RBr > RCl >> RF (similar to nucleophilicity pattern). **Polarity inversion (Umpolung)**: the C–X bond in a halide is C(δ+)–X(δ−) (carbon is electrophilic); the C–Mg bond in the Grignard is C(δ−)–Mg(δ+) (carbon is nucleophilic). This polarity inversion is the key synthetic power — a Grignard converts a formerly electrophilic carbon into a nucleophilic carbon. **Reactions**: (1) **Addition to aldehydes and ketones**: the Grignard's carbanion carbon attacks the carbonyl carbon (electrophilic); the alkoxide intermediate is protonated on workup (NH₄Cl/H₂O) to give an alcohol; RCHO + R'MgX → R–CHOH–R' (secondary alcohol); RCOR'' + R'MgX → R–C(OH)(R')(R'') (tertiary alcohol); methanal (HCHO) + RMgX → primary alcohol (RCH₂OH). (2) **Addition to CO₂**: forms a carboxylate; after workup, gives a carboxylic acid RCOOH — a one-carbon extension. (3) **Addition to esters**: two equivalents of RMgX add (the first gives a ketone intermediate which immediately reacts with the second equivalent); product is a tertiary alcohol with two identical R groups: RCOOR' + 2 R''MgX → R–C(OH)(R'')₂. (4) **Proton abstraction**: Grignard reagents are destroyed by any proton source (water, alcohols, amines, carboxylic acids, terminal alkynes — pKₐ < ~45); this is WHY anhydrous conditions are essential — even traces of moisture destroy the reagent. (5) Organolithium reagents (RLi, prepared from RX + 2Li): analogous but MORE reactive (more ionic, more carbanion-like C–Li bond) — useful when the Grignard fails to add (e.g., with hindered ketones or epoxides). **Synthetic planning**: Grignard synthesis is a key tool for building complexity — any combination of alkyl/aryl group (from the halide) and carbonyl compound (aldehyde, ketone, ester, CO₂) gives a predictable alcohol or acid; this enables retrosynthetic disconnection of a C–C bond adjacent to an OH.

## Mental Models
- **Polarity flip card**: draw the C–X bond with charges (C+/X−); then "flip the card" for the C–Mg bond (C−/Mg+). The Grignard converts a carbon from electrophile to nucleophile. This flip is the entire synthetic value — it lets you BUILD carbon skeletons at will.
- **Anhydrous conditions = no water, no alcohol, no anything with an N–H or O–H**: Grignard reagent is the conjugate base of an acid with pKₐ ~50 (alkane); anything with a pKₐ below ~50 protonates and destroys it instantly. The reagent "smells" any proton source and dies. Treat it like it is violently water-sensitive (because it is).
- **Two equivalents for ester addition**: the ester's product (a ketone at the tetrahedral intermediate stage) is MORE reactive than the starting ester; the second Grignard attacks immediately. You cannot stop at the ketone stage with Grignard reagents — only with a less reactive hydride (LiAlH₄ can be controlled).

## Why Students Fail
- Forgetting the anhydrous requirement — students write water in the reaction or use alcoholic solvents; the Grignard would immediately protonate and no addition would occur.
- Confusing the direction of nucleophilic attack — the Grignard's carbon (δ−) attacks the CARBONYL CARBON (δ+), not the oxygen; students sometimes draw the oxygen as the site of attack.
- For ester additions, predicting the ketone as the final product rather than the tertiary alcohol (two equivalents react).

## Misconceptions
1. **"Grignard reagents can be stored in water or diluted with aqueous acid before workup"** (Type 5 — instruction-induced: students see "workup with NH₄Cl/H₂O" in the product-isolation step and assume the Grignard itself is water-stable; they do not distinguish the REACTION stage (anhydrous) from the WORKUP stage (aqueous)).
   - Probe: "You accidentally add one drop of water to your Grignard solution before adding the carbonyl compound. What happens?"
   - Characteristic phrase: "it's okay, I'll just add water at the end anyway" / "water is just a solvent"
   - Intervention: the Grignard (pKₐ of RH ~50) deprotonates water (pKₐ 15.7) INSTANTLY and completely (K = 10^(50−15.7) ≈ 10³⁴). The product is RH (alkane) + Mg(OH)X. The Grignard is completely destroyed. Workup with aqueous NH₄Cl happens AFTER the addition is complete, to protonate the alkoxide intermediate — the Grignard itself is gone by then.

2. **"The Grignard adds to the oxygen of the carbonyl"** (Type 2 — perceptual intuition: oxygen carries the δ− charge in C=O; students see "negative attacks negative oxygen attacks negative Grignard carbon" — this is wrong; the nucleophilic carbon of the Grignard attacks the ELECTROPHILIC CARBON of C=O).
   - Probe: "In the reaction of CH₃MgBr with acetone, which atom does the methyl carbanion attack?"
   - Characteristic phrase: "attacks the oxygen because it's negative" / "the oxygen is the electrophile"
   - Intervention: in a carbonyl, the oxygen bears δ− and the CARBON bears δ+; a nucleophile always attacks the ELECTROPHILIC atom (the carbon). Draw the charge distribution: C(δ+)=O(δ−); the Grignard's carbanion carbon attacks C(δ+). The oxygen ends up as an alkoxide after the addition.

3. **"Adding one equivalent of Grignard to an ester gives a ketone as the final product"** (Type 1 — overgeneralization from the Grignard + ketone experience; students assume one equivalent = one addition product, not recognising that the ketone intermediate is more reactive than the ester starting material toward Grignard addition).
   - Probe: "What is the product of treating methyl benzoate with 2 equivalents of CH₃MgBr?"
   - Characteristic phrase: "first you get a ketone and then you stop" / "one equivalent gives one addition"
   - Intervention: the tetrahedral intermediate from the first addition collapses, expelling methoxide (–OCH₃) as a leaving group, regenerating a carbonyl — now a ketone (PhCOCH₃); this ketone is MORE reactive than the ester was; the second equivalent of CH₃MgBr adds immediately; the final product (after workup) is Ph–C(OH)(CH₃)₂ (a tertiary alcohol). You cannot isolate the ketone under Grignard conditions.

## Analogies
- **Good**: The Grignard reagent is a "carbon nucleophile with a magnesia helmet" — the Mg keeps the carbanion calm enough to handle, but the carbon is still strongly nucleophilic. When it finds a carbonyl carbon (electrophile), it attacks immediately.
- **Anti-analogy**: Do NOT compare RMgX to NaOH or NaOEt — those react with C=O differently (base, not nucleophile at carbon). The Grignard specifically ADDS TO the carbonyl carbon; it does not abstract an α-proton in this context.

## Demonstrations
- **Grignard preparation and CO₂ addition**: add Mg turnings in dry ether; add bromomethane (or phenyl bromide); observe exothermic reaction and solution forming; bubble dry CO₂ through; workup with dilute HCl; isolate acetic acid (or benzoic acid) — a classic carbon-extension demonstration.
- **Water sensitivity**: carefully add a small drop of water to a sample of Grignard solution; observe quenching (gas evolution if RLi) and colour change; confirm with a proton-source test (orange-juice pH paper turns neutral in the workup — the Grignard is gone).

## Discovery Questions
1. You want to make 2-phenyl-2-propanol (PhC(OH)(CH₃)₂). Name two different Grignard synthesis routes to this compound. (Either PhMgBr + acetone, or CH₃MgBr + acetophenone, or CH₃MgBr (2 eq) + methyl benzoate.)
2. Explain why you cannot make a Grignard reagent from 4-hydroxybromobenzene (4-bromophenol) by the usual method.
3. What product would you obtain by treating acetaldehyde with CH₃MgI followed by aqueous workup?
4. Compare the expected reactivity of CH₃MgBr vs. CH₃Li toward a hindered ketone. Which is more reactive and why?

## Teaching Sequence
1. **Prepare the Grignard**: RX + Mg → RMgX (show reaction equation; note anhydrous ether; note ionic character C−Mg+).
2. **Establish polarity inversion**: contrast C–X (C+) vs. C–Mg (C−); connect to the concept of a carbon nucleophile.
3. **Mechanism of carbonyl addition**: draw the curved arrow from the carbanion C (not the Mg) to the carbonyl C; show the tetrahedral alkoxide intermediate; show aqueous workup to give alcohol.
4. **Product classification by carbonyl type**: methanal → 1° alcohol; aldehyde → 2° alcohol; ketone → 3° alcohol; CO₂ → acid.
5. **Ester special case**: two equivalents, ketone intermediate too reactive to isolate → 3° alcohol with two identical R groups.
6. **Anhydrous requirement**: explain pKₐ argument; list what destroys Grignard (H₂O, ROH, NH, RCOOH, RC≡CH — anything with a proton of pKₐ < ~50).
7. **Organolithium comparison**: RLi is more reactive (more ionic); used for hindered substrates.

## Tutor Actions
- **If student includes water**: ask "what is the pKₐ of water? What happens when the Grignard (pKₐ ~50) meets it?" — proton transfer destroys the reagent instantly.
- **If student draws attack at oxygen**: point to the charge distribution in the carbonyl (C δ+); ask "nucleophiles attack positive centres — which atom is positive?"
- **If student predicts ketone from ester**: ask "what happens to the tetrahedral intermediate after the first Grignard adds to an ester?" — it collapses to a ketone; "what is the ketone's reactivity vs. the ester?" — more electrophilic; "does the second equivalent of Grignard see it?" — yes, immediately.

## Voice Teaching Notes
- Say explicitly before any Grignard problem: "Step one: anhydrous. Step two: add carbonyl. Step three: aqueous workup." The three-step procedure as a mantra prevents the most common procedural errors.
- For polarity inversion: "The Grignard FLIPS the carbon — from electrophile (C+) to nucleophile (C−). That flip is why it's useful."
- For ester addition: "Two in, two add — you can't stop at the ketone. The ketone is hungrier than the ester."

## Assessment Signals
- **Green**: predicts the correct alcohol product from Grignard + aldehyde/ketone/ester/CO₂; explains why anhydrous conditions are required (pKₐ argument); recognises that Grignard with ester gives tertiary alcohol via two additions.
- **Amber**: predicts correct product type (secondary, tertiary) but forgets the two-equivalent rule for esters; knows anhydrous but cannot explain why.
- **Red**: draws attack at oxygen; includes water in the Grignard addition step; predicts ketone as final product from ester.

## Tutor Recovery Strategy
- Oxygen-attack error: use the electrostatics model — draw the C=O with charges, circle the δ+ carbon, and state "nucleophiles attack positive centres; the positive centre in C=O is the CARBON."
- Anhydrous confusion: draw the proton-transfer reaction between RMgBr and H₂O (pKₐ difference: 50 − 15.7 = 34 log units; K = 10³⁴); this is not a trace side reaction — it is instantaneous and complete.
- Ester addition: draw it stepwise; first addition → tetrahedral intermediate → collapses to ketone; ask student to identify the new carbonyl's electrophilicity; then show the second addition.

## Memory Hooks
- **RMgX = C nucleophile, C−, attacks C+ of carbonyl**.
- **Anhydrous = no OH, no NH anywhere** — any proton source kills it.
- **HCHO → 1°; RCHO → 2°; R₂C=O → 3°; CO₂ → acid** — the four carbonyl targets.
- **Ester + 2 RMgX → 3° alcohol with two R groups** — the two-equivalent rule.
- **RLi > RMgX in reactivity** (more ionic, less solvated).

## Transfer Connections
- **Retrosynthesis**: any C–C bond adjacent to OH can be disconnected as a Grignard addition; this is one of the most useful retrosynthetic disconnections in undergraduate synthesis.
- **Organometallics in industry**: Ziegler-Natta catalysts (from organolithium + TiCl₄), Wilkinson's catalyst (organophosphine Rh complex) — both use the carbon–metal bond principle; Grignard is the conceptual gateway.
- **Reformatsky reaction**: Zn instead of Mg; ester substrate instead of simple ketone; product = β-hydroxy ester — a variant with its own synthetic utility.
- **Metalated alkynes**: terminal alkynes + RMgX (or NaNH₂) → alkynyl Grignard (or acetylide), which adds to carbonyls — extends the scope to alkyne-bearing alcohols.

## Cross-Subject Connections
- **Biochemistry**: organolithium and Grignard chemistry is the basis of many pharmaceutical syntheses; thalidomide, ibuprofen, and many antidepressants use Grignard steps in their industrial production.
- **Materials science**: organometallic reactions are the entry point to polymer catalysis (Ziegler-Natta, metallocene catalysts) and OLED material synthesis.
- **Environmental chemistry**: organomercury, organolead, and organotin compounds (toxic environmental contaminants) are organometallic species where the carbon–metal polarity inversion (or radical character) explains their toxicity and persistence.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.hal.grignard`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.hal.grignard` as of 2026-07-23.

## Curriculum Feedback
- The concept of retrosynthetic analysis (disconnecting a C–C bond to reveal a Grignard precursor) is implicit here but deserves a dedicated KG node; Grignard is one of the canonical examples used to introduce retrosynthesis.
- The two-equivalent ester addition is a commonly misunderstood point; if the platform's assessment probes test "product of Grignard + ester," student analytics will likely reveal a misconception hotspot here.

## Version History
- v1.0.0 — 2026-07-24 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

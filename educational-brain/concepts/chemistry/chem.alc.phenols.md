# Phenols — `chem.alc.phenols`

## Identity
- **KG ID**: chem.alc.phenols
- **Subject**: Chemistry
- **Domain**: Alcohols (chem.alc)
- **Prerequisites**: chem.hyd.arenes, chem.alc.alcohols
- **Difficulty**: advanced
- **Bloom level**: analyse
- **Estimated hours**: 2

## Learning Objective
Explain why phenol is substantially more acidic than aliphatic alcohols using resonance stabilisation of the phenoxide ion, predict the enhanced EAS reactivity and ortho/para directing effect of the OH group on benzene, describe the synthesis of phenol from cumene and via the diazonium route, and predict products of phenol's key reactions (esterification, ether formation, Kolbe, Reimer-Tiemann).

## Core Understanding
**Structure**: phenol is hydroxybenzene (C₆H₅OH); the OH is directly attached to an aromatic ring carbon; the lone pair on O is partially delocalized into the ring's π-system. **Acidity**: pKₐ of phenol ≈ 10; pKₐ of cyclohexanol ≈ 16; pKₐ of water = 15.7. Phenol is ~10⁶ times more acidic than a typical alcohol. The reason: the phenoxide ion (C₆H₅O⁻) is resonance-stabilised — the negative charge is delocalized into the ring (ortho and para positions carry partial negative charge via resonance); the alkoxide ion (RO⁻) has no such delocalization. Because the conjugate base is MORE STABLE (resonance-stabilised), the equilibrium lies further toward ionisation → lower pKₐ → stronger acid. Practical consequence: phenol reacts with NaOH (pKₐ water = 15.7, but NaOH provides OH⁻ which is a sufficiently strong base), generating sodium phenoxide. Aliphatic alcohols do NOT react with NaOH. **Effect on ring reactivity**: the OH group has lone pairs that donate electrons INTO the ring (mesomeric donation, positive mesomeric effect +M); this raises electron density particularly at ortho and para positions; benzene ring of phenol is MORE reactive than benzene toward electrophilic aromatic substitution (EAS) — nitration occurs even with dilute HNO₃ (vs. conc. for benzene); bromination occurs in water without AlBr₃ catalyst (gives 2,4,6-tribromophenol). The OH is an ORTHO/PARA DIRECTOR and ACTIVATING substituent. **Synthesis of phenol**: (1) **Cumene process** (industrial): benzene + propene → cumene (isopropylbenzene, Friedel-Crafts alkylation); cumene + O₂ → cumene hydroperoxide; hydroperoxide + H₂SO₄ → phenol + acetone (both commercially valuable co-products); (2) **Diazonium route** (laboratory): ArNH₂ + NaNO₂/HCl → ArN₂⁺Cl⁻ (diazonium salt) + H₂O → phenol (warmed — diazonium → phenol directly); see chem.nitro.amines for full diazonium chemistry. **Reactions of phenol**: (1) Esterification: phenol + acyl chloride (RCOCl) or acid anhydride → phenyl ester (faster than with carboxylic acid alone; esterification with RCOOH requires DCC or strong acid catalyst because phenol is a poor nucleophile); (2) Ether formation: phenol + alkyl halide + NaOH → phenyl ether (Williamson, but nucleophile is phenoxide not phenol; alkyl must be primary); (3) **Kolbe synthesis** (Kolbe–Schmitt): sodium phenoxide + CO₂ under pressure at ~125°C → sodium 2-hydroxybenzoate (sodium salicylate); acidify → salicylic acid; this is the industrial route to aspirin precursor; (4) **Reimer-Tiemann reaction**: phenol + CHCl₃/NaOH → 2-hydroxybenzaldehyde (salicylaldehyde, primarily ortho) via dichlorocarbene (:CCl₂) as electrophile — the electrophile is a carbene; (5) Electrophilic bromination in water (cold) → 2,4,6-tribromophenol (fast, no catalyst needed due to ring activation).

## Mental Models
- **Phenoxide stability = resonance delocalization of the negative charge**: draw 5 resonance structures of phenoxide (O carries full −, then delocalization at ortho−, para−, and ortho− positions); the alkoxide has only one structure with all charge on O. MORE resonance structures = more stability = weaker base = conjugate acid is stronger.
- **OH as an electron-pump for the ring**: the oxygen lone pair is delocalized INTO the ring, making phenol's ring more electron-rich than benzene at ortho and para positions — electrophiles attack the richest sites. Think of the oxygen as a mini-electron-injection pump for the ring.
- **Acidity hierarchy**: RC≡C–H (~25) < ArOH (~10) < H₂O (15.7) < ROH (~16–18); the terminal alkyne > water > monoalcohol > phenol order of acidity (remember pKₐ: LOWER pKₐ = STRONGER ACID; so phenol at 10 is more acidic than water at 15.7 which is more acidic than alcohols at 16–18).

## Why Students Fail
- Saying phenol is less acidic than water because "alcohol OH bonds are weaker than water O–H bonds" — confusing bond dissociation energy with pKₐ; the base-stability argument is the correct framework.
- Forgetting that the OH group in phenol is both an activating group AND an acid — students treat it purely as an EAS director and forget that phenol can be deprotonated to phenoxide, which is an even better electron donor (full negative charge delocalised).
- Drawing Kolbe synthesis products at para rather than ortho — the carboxylate group goes ortho to OH (chelation assistance from the meta Na+ coordination in the transition state).

## Misconceptions
1. **"Phenol is less acidic than water because R–OH bonds are weaker acids than H₂O"** (Type 3 — language contamination: "alcohol" and "acidic" co-occur in everyday language as "acid" meaning corrosive, not pKₐ; students map corrosiveness of strong acids to strength, and assume phenol being weaker than HCl means it's weaker than water).
   - Probe: "Compare the pKₐ of phenol, water, and ethanol. Which is the strongest acid?"
   - Characteristic phrase: "they're all roughly the same since none is a real acid" / "ethanol is more acidic than water"
   - Intervention: phenol pKₐ ≈ 10 (strongest acid here); water pKₐ = 15.7; ethanol pKₐ ≈ 16 (weakest acid here). The scale: strong mineral acids pKₐ < 0; phenol 10; acetic acid 4.7; carbonic acid 6.4; water 15.7; alcohols 16–18. Draw the phenoxide with its 5 resonance structures; the single-structure alkoxide; and ask "which anion is more stable?"

2. **"The OH group in phenol is meta-directing because it is electron-withdrawing"** (Type 5 — instruction-induced confusion between phenol and nitrobenzene; students who just learned EWGs are meta-directors overgeneralize this to OH, possibly confusing OH with C=O).
   - Probe: "Where does Br₂ add to phenol in water? Draw the major product."
   - Characteristic phrase: "OH is weakly withdrawing so it directs meta"
   - Intervention: OH lone pairs are delocalized INTO the ring (+M effect dominates any −I inductive effect); electron density increases at ortho and para. Proof: bromination of phenol in water (no Lewis acid needed) gives 2,4,6-tribromophenol in seconds — impossible with a deactivating meta-director. The three Br atoms are ALL at ortho and para positions.

3. **"Kolbe synthesis puts the carboxyl group at the para position"** (Type 2 — perceptual intuition: para is usually the more accessible and dominant position in EAS, and students default to para without knowing the Kolbe transition state).
   - Probe: "What is the major product of the Kolbe synthesis from phenol?"
   - Characteristic phrase: "para-hydroxybenzoic acid (PHBA)" / "the CO₂ goes to the para position"
   - Intervention: in the Kolbe–Schmitt reaction, the sodium cation coordinates the phenoxide oxygen and the CO₂ at the ortho position, forming a tight 6-membered transition state (chelation control); the major product is 2-hydroxybenzoic acid (salicylic acid). Para product is minor and temperature-dependent (potassium salt → para at higher T).

## Analogies
- **Good**: Phenoxide is like a communal savings account — the negative charge is shared among multiple accounts (resonance structures at O, ortho-C, para-C), so the "loss" (deprotonation) is spread and the system is stable. Alkoxide is a personal savings account — all the negative charge stays with one atom (O), which is less stable (higher energy).
- **Anti-analogy**: Do NOT say "phenol is just benzene with an alcohol group — it behaves like ethanol attached to a ring" — phenol's properties are fundamentally different from aliphatic alcohols; it reacts with NaOH (ethanol does not), reacts with weak EAS conditions (activated ring, not a typical alcohol property), and its acidity is in an entirely different regime (pKₐ 10 vs. 16).

## Demonstrations
- **Phenol + NaOH → sodium phenoxide**: dissolve phenol in water (limited solubility); add NaOH solution; clear dissolution occurs as sodium phenoxide (soluble, ionic) forms; acidify with dilute HCl → phenol reprecipitates (pKₐ argument: strong base converts phenol to phenoxide; strong acid reconverts).
- **Bromination of phenol vs. benzene in water**: add Br₂ water to phenol solution → immediate decolorisation + white precipitate of 2,4,6-tribromophenol; the same Br₂ water + benzene → no reaction in cold (benzene requires Lewis acid catalyst and conc. conditions). This single comparison shows phenol's dramatic ring activation.

## Discovery Questions
1. Explain why phenol dissolves in NaOH but not in NaHCO₃ (pKₐ H₂CO₃ = 6.4). What does this tell you about phenol's pKₐ?
2. 2-nitrophenol has pKₐ 7.2 while 4-nitrophenol has pKₐ 7.1, both more acidic than phenol (pKₐ 10). Explain this in terms of resonance and induction.
3. Predict the product(s) of nitrating phenol with dilute HNO₃ at 0°C. Which position predominates?
4. Aspirin (acetylsalicylic acid) is made from salicylic acid. Trace the synthesis from phenol to aspirin, naming the reaction types.

## Teaching Sequence
1. **Structure of phenol**: draw sp² hybridised O, lone pair in p-orbital, delocalization into ring.
2. **Acidity comparison**: pKₐ values of phenol, water, ethanol; resonance stabilisation of phenoxide; 5 resonance structures.
3. **Reaction with NaOH vs. aliphatic alcohols**: phenol → sodium phenoxide; ethanol does not react; acid-base reasoning.
4. **EAS reactivity**: OH as activating, ortho/para director; bromination in water vs. benzene; why OH activates (electron donation into ring at o/p).
5. **Synthesis routes**: cumene process (industrial); diazonium hydrolysis (laboratory).
6. **Reactions of phenol**: esterification, Williamson ether formation (via phenoxide), Kolbe synthesis (product = salicylic acid, ortho), Reimer-Tiemann (product = salicylaldehyde, ortho), tribromination.
7. **Applications**: aspirin, antiseptics (Dettol), nylon-6,6 precursor (use of phenol derivatives).

## Tutor Actions
- **If student says phenol is meta-directing**: draw the two resonance forms of phenol showing lone pair into ring; ask "where is the extra electron density?" → ortho and para.
- **If phenol acidity is underestimated**: ask student to draw phenoxide's resonance structures vs. alkoxide's; count structures; ask "which is more stable?"
- **If Kolbe product is para**: introduce the chelation argument (Na⁺ coordinates O and ortho CO₂ simultaneously); draw the 6-membered cyclic transition state.

## Voice Teaching Notes
- "Phenol is an acid — reacts with NaOH. Ethanol is NOT an acid — does not react with NaOH. That is the single most important difference."
- "The OH on phenol is an activating, ortho/para-directing group — exactly like NH₂ in aniline. Both lone pairs pump electrons INTO the ring."
- "Kolbe → ortho product (salicylic acid). Aspirin is salicylic acid's ester. This is a chain worth memorising for synthesis."

## Assessment Signals
- **Green**: correctly ranks pKₐ of phenol, water, and ethanol; explains phenoxide resonance stabilisation; predicts ortho/para EAS on phenol; correctly identifies Kolbe product as ortho (salicylic acid).
- **Amber**: correct EAS direction but wrong pKₐ comparison; knows phenol reacts with NaOH but cannot explain why.
- **Red**: says phenol is meta-directing; says phenol is less acidic than ethanol; cannot draw phenoxide resonance structures.

## Tutor Recovery Strategy
- Meta-direction error: draw the resonance donation mechanism first (lone pair into ring, negative charge builds at ortho and para); confirm with tribromophenol as the observed product.
- Acidity confusion: use the conjugate-base argument systematically: draw RO⁻ (one structure); draw PhO⁻ (5 structures); ask "which is more stable?" This is the same logic as carboxylate vs. alkoxide stability.
- Kolbe product: ask "in the Kolbe reaction, what holds the CO₂ near the ring?" — the Na⁺ bridges O and CO₂; draw the 6-membered TS; ortho product drops out naturally.

## Memory Hooks
- **pKₐ: phenol 10 < water 15.7 < alcohols 16–18** (lower pKₐ = stronger acid; phenol is the winner)
- **Phenoxide = 5 resonance structures = stable conjugate base = strong acid**
- **OH on ring = activating, ortho/para directing** (same family as NH₂)
- **Kolbe = ortho-COOH (salicylic acid); Reimer-Tiemann = ortho-CHO (salicylaldehyde)**
- **Cumene process = benzene + propene → phenol + acetone (two products)**

## Transfer Connections
- **Arene chemistry** (chem.hyd.arenes): phenol is a powerful activating, ortho/para director; this is the same EAS framework applied with the understanding of lone-pair donation vs. inductive withdrawal.
- **Amines** (chem.nitro.amines): NH₂ and OH are both lone-pair donors; aniline and phenol show closely parallel EAS activation; comparing their pKₐ and EAS reactivity is an important synthesis skill (phenol pKₐ 10; anilinium pKₐ 4.6 → aniline is a weaker base than expected from alkylamines, and phenol is a stronger acid than expected from alcohols — same resonance argument).
- **Diazonium chemistry** (chem.nitro.amines): the diazonium → phenol conversion is a key route to substituted phenols in synthesis; students should connect the ArNH₂ → ArN₂⁺ → ArOH pathway.
- **Aspirin synthesis**: salicylic acid (Kolbe product) is acetylated with acetic anhydride to give aspirin — a classic multi-step synthesis connecting phenol, Kolbe reaction, and esterification.

## Cross-Subject Connections
- **Biology**: tyrosine (an amino acid) has a phenolic OH; its pKₐ ≈ 10 means it is partly ionised at physiological pH; phenolic OHs in enzyme active sites can act as proton donors/acceptors in catalysis; tannins in tea are polyphenols.
- **Medicine**: phenol (Lister's carbolic acid) was the first surgical antiseptic; chlorhexidine, triclosan (now restricted), and many topical antiseptics are chlorinated phenols; thymol (a methylisopropylphenol) is in Listerine.
- **Polymer chemistry**: bakelite (phenol-formaldehyde resin, the first fully synthetic plastic) is produced by condensation of phenol and formaldehyde; epoxy resins start from bisphenol-A (two phenol units); phenolic resins remain major industrial materials.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.alc.phenols`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.alc.phenols` as of 2026-07-23.

## Curriculum Feedback
- The Kolbe and Reimer-Tiemann reactions (both give ortho-substituted products) are important named reactions with industrial relevance; they deserve a specific assessment probe testing ortho vs. para product prediction, since this is the most common error.
- The synthesis route from phenol to aspirin (Kolbe → esterification) is one of the most pedagogically powerful multi-step synthesis chains in undergraduate organic chemistry — the KG might benefit from a cross-link or a dedicated synthesis-planning node that connects chem.alc.phenols to chem.carb.esters.

## Version History
- v1.0.0 — 2026-07-24 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

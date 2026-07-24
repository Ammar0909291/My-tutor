# Organic Reaction Mechanisms — `chem.org.mechanisms`

## Identity
- **KG ID**: chem.org.mechanisms
- **Subject**: Chemistry
- **Domain**: Organic chemistry foundations (chem.org)
- **Prerequisites**: chem.org.reactive-intermediates
- **Difficulty**: advanced
- **Bloom level**: analyse
- **Estimated hours**: 3

## Learning Objective
Classify any organic reaction as nucleophilic, electrophilic, radical, or pericyclic; apply curved-arrow notation correctly to show electron-pair movement; identify the mechanism type from substrate and conditions; and distinguish homolytic from heterolytic bond cleavage.

## Core Understanding
**Bond cleavage types determine mechanism class**: Heterolytic cleavage — both electrons of the bond go to one atom, producing ions (carbocation or carbanion); the mechanism is ionic (nucleophilic or electrophilic). Homolytic cleavage — one electron goes to each atom, producing radicals; the mechanism is radical. **Four mechanism classes**: (1) **Nucleophilic**: electron-rich species (nucleophile, Nu:) attacks an electron-poor carbon (electrophile); the Nu: donates both electrons to form the new bond; subdivided into SN1, SN2 (substitution) and addition to C=O (addition–elimination for acyl derivatives); the curved arrow originates at the lone pair or π-bond and points TO the electrophilic centre. (2) **Electrophilic**: electron-poor species (electrophile, E⁺) attacks an electron-rich centre (alkene π-bond, aromatic ring); the π-electrons initiate the arrow — arrow FROM the π-bond TO the electrophile; subdivided into electrophilic addition (alkenes) and EAS (arenes). (3) **Radical**: initiated by homolysis (heat or light), propagated by chain steps (abstraction, addition); each step shows a SINGLE-HEADED (fish-hook) arrow for ONE electron; three stages: initiation, propagation (×n), termination. (4) **Pericyclic**: concerted rearrangement of electrons in a cyclic transition state; no intermediates; no ions or radicals; arrow-pushing traces a ring of electron flow (Diels-Alder [4+2], electrocyclic reactions, sigmatropic shifts); stereospecific (determined by orbital symmetry, Woodward–Hoffmann rules). **Curved arrow conventions**: an arrow represents the movement of an ELECTRON PAIR (two electrons); tail = where the electrons come from (lone pair, π-bond, σ-bond); head = where they go (atom gaining electrons); never draw an arrow backward; arrows must be chainable (each arrow's head becomes the next arrow's tail if multiple arrows are in sequence). **Identifying mechanism from conditions**: polar aprotic solvent + strong nucleophile → SN2; polar protic + weak nucleophile + 3° substrate → SN1; peroxide/hv/ROOR → radical; Lewis acid (AlCl₃, FeBr₃) + electrophile + arene → EAS; diene + dienophile + heat → Diels-Alder pericyclic.

## Mental Models
- **Curved arrows as money transfers**: an arrow shows who gives electrons (tail) and who receives (head); in every transaction, the donor's electron count goes down and the acceptor's goes up; every atom's formal charge changes accordingly; track the account balance.
- **Mechanism decision tree**: (a) Is there a radical initiator or UV light? → radical. (b) Is there a diene + dienophile or ring-forming concerted step? → pericyclic. (c) Is the incoming species electron-rich? → nucleophilic. (d) Is the incoming species electron-poor? → electrophilic. Apply in this order; (a) and (b) exclude (c) and (d).
- **Single-headed vs. double-headed arrows**: double-headed (the standard fish, →) moves an electron pair; single-headed (fish-hook, ⇀) moves one electron. Never mix them in the same step.

## Why Students Fail
- Drawing arrows from atom to atom rather than from electrons (lone pair or bond) to the next position; the tail must originate at the electron source, not at a nucleus.
- Applying double-headed arrows in radical mechanisms; radical steps involve single-electron movement and require fish-hook arrows.
- Guessing mechanism type without first checking conditions; many students default to "nucleophilic" for any organic reaction involving two reactants.

## Misconceptions
1. **"The curved arrow shows where the atom moves"** (Type 3 — language contamination: "arrow" in everyday language means direction of movement of an object; here it means direction of electron-pair movement, which is often opposite to the atom's apparent movement).
   - Probe: "In the reaction of Br⁻ with CH₃Br, draw the curved arrows. Where does the Br⁻ arrow start?"
   - Characteristic phrase: "I draw the arrow from the carbon to the bromine because the bromide leaves" / "the arrow shows where the molecule goes"
   - Intervention: state explicitly: arrows show ELECTRONS moving, not atoms. In SN2, the arrow starts at the lone pair of the incoming nucleophile (Br⁻) and goes TO the carbon. The leaving group's arrow goes FROM the C–Br bond TO the Br (the electrons follow the leaving group OUT).

2. **"Radical mechanisms use the same double-headed arrows as ionic mechanisms"** (Type 5 — instruction-induced: students learn curved arrows in ionic context first; when radicals appear, they apply the same notation without adjusting for single-electron steps).
   - Probe: "Draw the propagation step of chlorine radical abstracting H from methane."
   - Characteristic phrase: student draws a normal double-headed arrow from H to Cl•
   - Intervention: show the fish-hook arrow explicitly; explain that a radical has ONE unpaired electron; it can only move ONE electron at a time, so only a fish-hook arrow is valid.

3. **"Pericyclic reactions must have a catalyst or ionic intermediate"** (Type 1 — overgeneralization from the student's experience of reactions needing initiation; pericyclic reactions are concerted and need neither catalyst nor ionic intermediate — they violate this expected pattern).
   - Probe: "What ionic intermediate forms in the Diels-Alder reaction?"
   - Characteristic phrase: "there must be a carbocation somewhere" / "it needs a Lewis acid"
   - Intervention: draw the Diels-Alder transition state as a six-membered cyclic electron loop; point out that ALL bonds break and form SIMULTANEOUSLY; there is no point at which you have an ion or radical; the driving force is orbital overlap (HOMO of diene with LUMO of dienophile).

## Analogies
- **Good**: Curved arrows in a mechanism are like directions in a relay race — each runner (electron pair) hands the baton (electron density) to the next; you must show every handoff in sequence; you can't skip a step and you can't run backwards.
- **Anti-analogy**: Do NOT say "the arrow shows which bond forms" — it shows which electrons move; the bond-forming/breaking is a consequence, not the thing the arrow represents.

## Demonstrations
- **Compare SN2 and radical bromination**: show CH₄ + Br₂ in darkness (no reaction) vs. under UV light (radical chain, HBr produced); vs. CH₃OH + HBr (SN2, heterolytic, no light needed). Same two elements (C–Br bond formed), entirely different conditions and arrows.
- **Arrow-pushing live practice**: give students a nucleophilic addition to acetaldehyde (CH₃CHO + NaCN); ask them to draw the curved arrow showing the CN⁻ lone pair attacking the carbonyl carbon and the π-electrons of C=O shifting to oxygen; confirm by checking formal charges before and after.
- **Diels-Alder tactile model**: use a rope loop with six participants — four in a row (diene, s-cis) and two in a line (dienophile); each person simultaneously passes the rope to their neighbour in one direction around the ring; nobody stops, nobody lets go — this is concerted.

## Discovery Questions
1. Methane reacts with Cl₂ in sunlight to give CH₃Cl. The same reagents in the dark give no reaction. What does this tell you about the bond cleavage type and the mechanism?
2. In an SN2 reaction, where does the curved arrow for the nucleophile start? Where does it end? What happens to the leaving group?
3. You are given a reaction between an alkene and HBr. Is the mechanism nucleophilic or electrophilic? Who attacks whom?
4. A Diels-Alder reaction proceeds without any catalyst. How is it possible to form two new bonds simultaneously without any ions or radicals?

## Teaching Sequence
1. **Bond cleavage**: draw CH₃–Cl and ask "if this bond breaks, where can the electrons go?" — two options, heterolytic (→ ions) vs. homolytic (→ radicals); establish this as the first fork in every mechanism decision.
2. **Curved arrow conventions**: teach on a simple proton transfer (CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O) — every arrow must start at a lone pair or bond; trace electrons through every step; check formal charges.
3. **Nucleophilic mechanisms**: revisit SN2 (already covered in chem.hal.sn2) as the canonical example of nucleophilic ionic mechanism; generalise to nucleophilic addition (C=O).
4. **Electrophilic mechanisms**: use HBr addition to ethene — the π-electrons attack H⁺ (the electrophile), forming the carbocation; then Br⁻ attacks the carbocation (this IS a nucleophile attacking in step 2 — clarify that a reaction can have both E and N steps, but the FIRST ATTACK classifies the mechanism).
5. **Radical mechanisms**: chlorination of methane; show the fish-hook arrows; emphasise propagation chain.
6. **Pericyclic**: Diels-Alder as the prototype; draw the six-electron cyclic flow; note no intermediate, no ionic step, no radicals.
7. **Mechanism identification drill**: give 5 reactions with conditions; students classify; verify step-by-step.

## Tutor Actions
- **If student draws atom-to-atom arrows**: stop immediately; ask "where are the electrons coming from?" — redirect them to the lone pair or bond, not the nucleus.
- **If student uses double-headed arrows in a radical step**: say "radicals have one electron — how many electrons can each arrow represent?" — redirect to fish-hook notation.
- **If student cannot identify mechanism type**: use the decision tree (radical initiator? → concerted cycle? → electron-rich attacker? → electron-poor attacker?) as a guided checklist rather than asking them to guess.
- **After teaching each mechanism type**: demand a one-sentence definition ("nucleophilic means...") before proceeding; do not assume fluency from nodding.

## Voice Teaching Notes
- The phrase "arrows show electrons, not atoms" must be stated at the start of every curved-arrow session and repeated whenever a student draws incorrectly.
- Distinguish orally: "This is an IONIC mechanism — we'll use normal arrows. Now here's a RADICAL step — watch the arrow shape change" — make the switch visible and verbal.
- For pericyclic: "No stop signs — every bond breaks and forms at the same instant." Rehearse this phrase so it becomes instinctive.
- Allow silence after "where does the arrow start?" — this is a retrieval question, not a rhetorical one; wait for the answer.

## Assessment Signals
- **Green**: independently draws correct arrows for a new SN2, an electrophilic addition, and a radical step; correctly identifies pericyclic from the concerted + cyclic description; states that arrows represent electron pairs.
- **Amber**: arrow tails and heads reversed in some steps; correct mechanism identification but arrow errors; uses double-headed arrows throughout including radical steps.
- **Red**: draws arrows from nucleus to nucleus; cannot distinguish ionic from radical; does not know what curved arrows represent.

## Tutor Recovery Strategy
- Persistent arrow-direction errors: give the student only the product and the reactant; ask them to identify the bond that formed and ask "what was the electron source for that new bond?" — this builds arrow direction from first principles.
- Radical/ionic confusion: show the two types of bond cleavage side by side (heterolytic: both electrons to one atom; homolytic: one each); map directly to arrow type.
- Mechanism classification failure: give the student the decision tree as a written card; work through 3–4 examples together using ONLY the tree; then remove the tree and repeat.

## Memory Hooks
- **NERP**: Nucleophilic, Electrophilic, Radical, Pericyclic — the four families of organic mechanism.
- **Arrows = Electrons** — not atoms; a one-phrase rule worth repeating every session.
- **Fish-hook = one electron** (it hooks only one fish); normal arrow = two electrons.
- **Pericyclic = concerted ring** — no intermediates, no ions, no radicals; the ring of arrows is the whole mechanism.

## Transfer Connections
- **All subsequent organic chemistry**: every named reaction (SN1, SN2, EAS, aldol, Michael, Claisen, Diels-Alder, Wittig) is an instance of one of the four mechanism classes; fluency here reduces all future reaction learning to "classify + apply."
- **Reaction rate and conditions**: understanding mechanism predicts which conditions accelerate (SN2 speeds with stronger Nu and polar aprotic solvent; radical speeds with more initiator or higher light intensity).
- **Stereochemistry**: mechanism directly predicts stereochemical outcome (SN2 = Walden inversion; SN1 = racemisation; Diels-Alder = syn addition, endo/exo selectivity — all traceable to the mechanism arrows).

## Cross-Subject Connections
- **Biology/biochemistry**: enzyme catalysis is overwhelmingly nucleophilic (serine proteases, cysteine proteases, phosphatases all use nucleophilic residues attacking electrophilic carbonyl/phosphate centres); classifying enzymatic steps uses the same framework.
- **Physics/spectroscopy**: photochemically induced reactions (radical and pericyclic photoreactions, e.g., [2+2] under UV) are governed by orbital symmetry; the Woodward–Hoffmann rules connect orbital symmetry (quantum physics) to mechanism outcome.
- **Mathematics**: the mechanism decision tree is a binary decision tree structure — a direct bridge to formal computer-science / logic instruction.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.org.mechanisms`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.org.mechanisms` as of 2026-07-23.

## Curriculum Feedback
- The KG lists `chem.org.reactive-intermediates` as the sole prerequisite. However, `chem.org.mechanisms` is referenced implicitly by most downstream organic nodes (SN1, SN2, EAS, elimination). It may be worth adding it as a co-prerequisite alongside `chem.org.reactive-intermediates` for all reaction mechanism nodes to make the dependency explicit.
- Pericyclic reactions (Diels-Alder, electrocyclic) appear here but may not have their own dedicated KG node; if the curriculum covers them at all, a dedicated node at a higher level would better track student progress through pericyclic chemistry.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

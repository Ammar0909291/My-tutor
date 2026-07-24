# Pericyclic Reactions — `chem.org.pericyclic`

## Identity
- **KG ID**: chem.org.pericyclic
- **Subject**: Chemistry
- **Domain**: Organic chemistry foundations (chem.org)
- **Prerequisites**: chem.org.mechanisms
- **Difficulty**: advanced
- **Bloom level**: analyse
- **Estimated hours**: 2.5

## Learning Objective
Classify a pericyclic reaction as electrocyclic, cycloaddition, or sigmatropic; apply the Woodward–Hoffmann orbital symmetry rules to predict whether a given thermal or photochemical pericyclic process is allowed or forbidden; predict the stereochemistry of Diels-Alder reactions including endo/exo selectivity.

## Core Understanding
**Definition**: a pericyclic reaction is a concerted (no intermediate), intramolecular (bond-breaking and bond-forming occur simultaneously in a cyclic TS), thermally or photochemically allowed (depending on orbital symmetry). No ions, no radicals. **Three families**: (1) **Cycloadditions**: two separate π-systems react to form a ring by forming two new σ-bonds; classified by the number of π-electrons in each component: [4+2] Diels-Alder (diene + dienophile); [2+2] (two alkenes, thermally forbidden but photochemically allowed). (2) **Electrocyclic reactions**: a conjugated polyene ring-closes (or the reverse, ring-opening); a single σ-bond forms or breaks; the terminal carbons rotate as the ring closes or opens; conrotatory (both ends rotate the same direction) or disrotatory (opposite directions). (3) **Sigmatropic rearrangements**: a σ-bond migrates across a π-system; classified by [i,j] notation (the bond migrates from position 1 to position i on one component and to position j on the other); [1,3]H, [1,5]H, [3,3] (Cope, Claisen). **Woodward–Hoffmann rules**: the thermal/photochemical allowedness is determined by whether the reaction preserves orbital symmetry. Quick summary table:
- Cycloadditions: [4n+2] thermal = allowed; [4n] thermal = forbidden (allowed photochemically).
- Electrocyclic: 4n electrons → conrotatory (thermal), disrotatory (photochemical); 4n+2 electrons → disrotatory (thermal), conrotatory (photochemical).
- Sigmatropic: [1,5]H → thermal allowed (suprafacial); [1,3]H → thermal forbidden (suprafacial); [3,3] → thermal allowed.
**Diels-Alder in depth**: the most important pericyclic reaction in synthesis. Requirements: (a) diene must be in the s-cis conformation (s-trans is unreactive — the terminal carbons are too far apart); (b) electron-rich diene + electron-poor dienophile (EWG on dienophile activates it via frontier orbital lowering of LUMO); (c) the reaction is STEREOSPECIFIC: syn addition to both the diene (cis/trans relationships of the diene are preserved in the product) and the dienophile (substituents on the dienophile retain their cis/trans relationship in the product). **Endo/exo selectivity**: in a cyclic product with two stereocentres, the ENDO product places the large substituent (EWG of dienophile) on the same face as the diene's π-system in the TS; the EXO product places it on the opposite face. Kinetic product is usually ENDO (due to secondary orbital interactions — the EWG's orbitals overlap with the diene's p-orbitals even though they don't form bonds). Thermodynamic product is EXO (less steric strain). Under standard conditions: endo product is kinetically preferred.

## Mental Models
- **The pericyclic ring**: every pericyclic reaction can be drawn as a cyclic TS where electron pairs flow in a continuous ring — no start, no end, no intermediate. Counting the electron pairs in the ring identifies the reaction type and allows application of the W–H rule.
- **The W–H traffic light**: [4n+2] thermal (including all Diels-Alder reactions) = GREEN LIGHT (allowed). [4n] thermal (e.g., [2+2]) = RED LIGHT (forbidden). Photochemistry reverses the lights. This one-sentence summary correctly classifies the most common cases.
- **Endo rule = "reach underneath"**: the endo approach brings the dienophile's EWG underneath the diene — like reaching your hand underneath a bridge to grab something. The endo product is kinetically preferred because of secondary orbital interactions ("the hand reaches an extra inch to grab something extra").

## Why Students Fail
- Confusing thermal and photochemical conditions — students apply the "thermal allowed" rule and then swap it when "photochemical" is mentioned without understanding why the rule reverses.
- Forgetting the s-cis conformation requirement for the diene in the Diels-Alder — cyclopentadiene (locked in s-cis) is very reactive; (E,E)-hexadiene (prefers s-trans) is unreactive.
- Endo/exo stereochemistry: students frequently invert endo and exo or draw the product without specifying the stereochemistry.

## Misconceptions
1. **"[2+2] cycloadditions are thermally allowed because both molecules have 2 π-electrons"** (Type 1 — overgeneralization from the Diels-Alder being allowed because it is [4+2]; students think any reaction with alkene + alkene should work; but [2+2] total = 4 electrons in the cyclic TS, and 4n with n=1 is thermally FORBIDDEN).
   - Probe: "Can you heat two ethene molecules together to form cyclobutane directly? Why or why not?"
   - Characteristic phrase: "it should work because both have π-bonds" / "2+2 = 4 electrons, should be fine"
   - Intervention: the rule is [4n+2] thermal = allowed; [4n] thermal = forbidden. 2+2 = 4 = 4n (n=1) → forbidden thermally. The reaction requires photochemical initiation or a different mechanism (it CAN occur photochemically when one alkene is excited to the S₁ state).

2. **"The Diels-Alder reaction does not have a stereochemical requirement on the diene"** (Type 5 — instruction-induced: the requirement for s-cis conformation is often stated but not made mechanically clear; students accept "you need a diene" without specifying which conformation).
   - Probe: "Would (E,E)-hexa-2,4-diene react in a Diels-Alder reaction as readily as cyclopentadiene? Why?"
   - Characteristic phrase: "any conjugated diene works" / "conformation doesn't matter for the reaction"
   - Intervention: draw the s-trans conformer of hexa-2,4-diene; note that C1 and C4 (the reacting terminal carbons) are ~4.5 Å apart in s-trans — too far to bond to the dienophile (reacting distance ~2.0 Å); in s-cis they are ~2.3 Å apart. The s-trans conformer physically cannot reach the dienophile. Cyclopentadiene is LOCKED in s-cis by the ring → extremely reactive.

3. **"The endo product has less steric strain, so it is thermodynamically more stable"** (Type 2 — perceptual intuition: students associate "endo" with "internal" and "enclosed" with "more stable"; but endo means the EWG is positioned syn to the remaining double bond of the product, creating MORE steric strain than exo — so endo is kinetically preferred but thermodynamically less stable).
   - Probe: "In the Diels-Alder reaction of cyclopentadiene with maleic anhydride, is the endo or exo product the major product at room temperature? Is this the thermodynamically more stable product?"
   - Characteristic phrase: "endo is more stable because it's the major product" (confusing kinetic with thermodynamic control)
   - Intervention: endo is the kinetic product (formed faster due to secondary orbital interactions) but is NOT the thermodynamically more stable product — exo has less steric strain. This is a classic example of kinetic vs. thermodynamic control of a reaction.

## Analogies
- **Good**: A Diels-Alder reaction is like a molecular "snap-fit" — the diene must curve into an s-cis shape to form the right-shaped bracket, and the dienophile slides in to complete the snap. Forcing the diene to stay open (s-trans) is like trying to snap a bracket that's bent the wrong way — it never fits.
- **Anti-analogy**: Do NOT say "pericyclic reactions are just concerted SN2 reactions in disguise" — they are fundamentally different; there is no nucleophile/electrophile; the driving force is orbital symmetry matching, not charge attraction.

## Demonstrations
- **Diels-Alder synthesis**: mix cyclopentadiene + maleic anhydride in toluene at room temperature (or warm gently); the [4+2] cycloaddition occurs readily; isolate the norbornene-2,3-dicarboxylic anhydride as crystals; identify endo product by melting point comparison with known exo isomer.
- **[2+2] under UV**: irradiate cinnamate esters with UV light; form the cyclobutane dimer — thermal [2+2] does not occur but photochemical does; demonstrate that the reaction requires specific wavelength (not just heat).

## Discovery Questions
1. Draw the Diels-Alder product of (E)-but-1,3-diene + ethene. Now try with (E,E)-hexa-2,4-diene. Which is more reactive? Why?
2. Can 1,3-butadiene undergo a [2+2] cycloaddition thermally? What about photochemically?
3. The Diels-Alder product of cyclopentadiene and maleic anhydride has endo and exo stereoisomers. Which is the kinetically preferred product, and why?
4. A [1,5] sigmatropic shift of hydrogen in (Z)-penta-1,3-diene is thermally allowed. A [1,3] shift is thermally forbidden. How does the Woodward–Hoffmann rule explain this?

## Teaching Sequence
1. **Introduce pericyclic reactions**: define "concerted, no intermediate, cyclic TS"; contrast with ionic (SN, EAS) and radical mechanisms.
2. **Three families**: cycloaddition, electrocyclic, sigmatropic — one sentence and one example for each.
3. **Woodward–Hoffmann quick rule**: [4n+2] thermal = allowed; [4n] thermal = forbidden; photochemistry reverses. Apply to [4+2] (allowed) and [2+2] (forbidden thermally).
4. **Diels-Alder in depth**: s-cis diene requirement; electron-rich diene + electron-poor dienophile; draw the TS; identify stereocentres formed.
5. **Diels-Alder stereochemistry**: syn addition to both components; draw a product showing preserved cis/trans relationships.
6. **Endo/exo**: draw both TS for endo and exo; identify secondary orbital interactions for endo; state that endo = kinetic, exo = thermodynamic.
7. **Sigmatropic examples**: [1,5]H shift (thermal allowed, suprafacial); [3,3] Cope/Claisen (thermal allowed).

## Tutor Actions
- **If student calls [2+2] thermal allowed**: "Count the electrons in the cyclic TS: 2 + 2 = 4; is 4 equal to 4n or 4n+2?" (4n, n=1) → forbidden thermally.
- **If s-cis requirement missed**: draw the s-trans conformer; measure the terminal carbon distance; show it cannot reach the dienophile.
- **If endo/exo inverted**: ask "which product has more steric strain?" (endo, because the EWG points into the ring); "is more strained kinetic or thermodynamic product?" (kinetic); confirm endo = kinetic = major under standard conditions.

## Voice Teaching Notes
- "Thermal [4+2] allowed; thermal [2+2] forbidden; photo reverses everything" — say this as a jingle before any W–H question.
- For s-cis: "The diene must curve — like cupped hands ready to catch the dienophile." s-trans diene cannot form a ring.
- Endo: "EWG points into the molecule (endo = inside); exo = outside. Endo = faster (kinetic). Exo = more stable (thermodynamic)."

## Assessment Signals
- **Green**: correctly classifies a pericyclic reaction; applies W–H rule to predict thermal/photochemical allowedness; draws the Diels-Alder product with correct regio- and stereochemistry; states endo is kinetically preferred.
- **Amber**: knows Diels-Alder regiochemistry but misses stereochemistry; confuses endo/exo; knows the W–H rule exists but cannot apply it.
- **Red**: classifies [2+2] as thermally allowed; ignores s-cis requirement; cannot identify pericyclic reaction type.

## Tutor Recovery Strategy
- [2+2] thermal error: count electrons in the TS ring together; apply the 4n vs 4n+2 test.
- s-cis failure: draw the diene in both conformations; measure C1-C4 distance visually; the geometry makes the requirement undeniable.
- Endo/exo: start with definitions ("endo = bulky group pointing INTO the ring framework") before any reaction; then apply to the TS.

## Memory Hooks
- **[4+2] = thermally allowed (Diels-Alder)** — the most important pericyclic fact.
- **[2+2] = thermally forbidden, photochemically allowed** — the complementary fact.
- **Diene must be s-cis** — the geometric prerequisite for Diels-Alder.
- **Endo = kinetic (faster); Exo = thermodynamic (more stable)** — the control pair.
- **Woodward–Hoffmann: [4n+2] thermal ✓; [4n] thermal ✗; photo reverses** — the W–H traffic light.

## Transfer Connections
- **Synthesis**: Diels-Alder is one of the most powerful C–C bond-forming reactions in synthesis — it builds a 6-membered ring with up to four stereocentres in one step; steroids, terpenes, alkaloids, and many natural products are synthesised using Diels-Alder.
- **Photochemistry**: [2+2] cycloadditions under UV are the basis of thymine-dimer formation (DNA photodamage by UV light — a direct health consequence) and are used in photolithography.
- **Retrosynthesis**: the retro-Diels-Alder disconnection is one of the canonical retrosynthetic strategies; a six-membered ring with an alkene is always a candidate for retro-DA analysis.
- **Sigmatropic shifts in biochemistry**: the Claisen rearrangement is the mechanism for the enzyme chorismate mutase (shikimate pathway for aromatic amino acid biosynthesis) — a [3,3] sigmatropic rearrangement catalysed by an enzyme active site.

## Cross-Subject Connections
- **Physics/quantum mechanics**: W–H rules are derived from conservation of orbital symmetry (the HOMO/LUMO symmetry matching of the interacting orbitals); understanding them requires basic MO theory.
- **Materials science**: [4+2] and [2+2] cycloadditions are used in the synthesis of functional materials — ladder polymers, fullerene adducts, and photoresponsive materials (azobenzene [2+2] analogues) all rely on pericyclic concepts.
- **Biology**: vitamin D₃ synthesis in skin via UV-driven electrocyclic ring-opening of provitamin D (7-dehydrocholesterol) followed by a thermal [1,7] sigmatropic shift — a real-world cascade of pericyclic reactions triggered by sunlight.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.org.pericyclic`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.org.pericyclic` as of 2026-07-23.

## Curriculum Feedback
- The W–H rules require frontier orbital theory (HOMO/LUMO matching) for a full mechanistic understanding; if a dedicated KG node for frontier molecular orbital theory (FMO) exists, this concept should reference it as upstream knowledge.
- The endo/exo distinction generates significant confusion and is one of the highest-frequency misconception sites in advanced organic chemistry; a dedicated assessment probe (draw and label the endo and exo TS for cyclopentadiene + acrylonitrile) should be a standard assessment gate for this concept.

## Version History
- v1.0.0 — 2026-07-24 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

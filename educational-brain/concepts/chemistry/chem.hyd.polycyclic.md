# Polycyclic and Heterocyclic Aromatic Systems — `chem.hyd.polycyclic`

## Identity
- **KG ID**: chem.hyd.polycyclic
- **Subject**: Chemistry
- **Domain**: Hydrocarbons (chem.hyd)
- **Prerequisites**: chem.hyd.arenes, chem.org.aromaticity
- **Difficulty**: advanced
- **Bloom level**: analyse
- **Estimated hours**: 3

## Learning Objective
Explain the aromaticity and EAS reactivity of polycyclic aromatics (naphthalene, anthracene, phenanthrene) and heterocyclic aromatics (pyridine, pyrrole, furan, thiophene, imidazole, purine, pyrimidine), predicting site selectivity from electron density and ring-fusion geometry.

## Core Understanding
Fusing benzene rings or replacing ring carbons with heteroatoms preserves the 4n+2 π-electron aromaticity rule but redistributes electron density in predictable ways. **Polycyclics**: naphthalene (10 π-e, two fused benzene rings; α-positions C1/C2/C5/C6 are more electron-rich → preferred EAS site; β at C2 gives more stable Wheland intermediate); anthracene (14 π-e, three linear rings; EAS at C9/C10 meso positions); phenanthrene (14 π-e, angular fusion; EAS at C9 preferentially; C9-C10 bond has high π-bond order and shows olefinic reactivity). **N-heterocyclics with lone pair in ring (pyridine-type)**: nitrogen lone pair is IN the ring (part of aromatic sextet? NO—it occupies an sp² orbital perpendicular to the ring, not contributing to π system; ring has 6 π-e from 5C + 1N-p_z; nitrogen is electron-withdrawing by induction + resonance → ring is π-deficient → EAS strongly inhibited; reacts like nitrobenzene; nucleophilic aromatic substitution instead at C2/C4). **N-heterocyclics with lone pair outside ring (pyrrole-type)**: pyrrole, furan, thiophene each donate 2 lone-pair electrons into the ring (without them the ring has only 4 π-e, anti-aromatic); these rings are π-excess; EAS very fast (faster than benzene); preferred at C2 (α-position). Furan: least aromatic of the three (oxygen more electronegative, reluctant donor; resonance energy ~67 kJ/mol vs benzene ~150); most reactive in EAS and Diels-Alder. Thiophene: most aromatic of the three (sulfur's diffuse 3p lone pair donates more evenly; resonance energy ~122 kJ/mol); closest to benzene reactivity. **Purines and pyrimidines**: bicyclic purine (adenine, guanine DNA bases) contains pyrimidine ring fused to imidazole ring; pyrimidine alone is N-type (π-deficient); biological importance hinges on H-bonding patterns of exocyclic groups, not ring EAS.

## Mental Models
- **Traffic metaphor for lone pair location**: lone pair IN the ring (pyridine-like) is like a car parked in the road—blocks through-traffic; lone pair OUTSIDE the ring (pyrrole-like) donates to the highway itself, increasing flow. The "in vs. out" distinction predicts everything about reactivity.
- **α vs. β selectivity in naphthalene**: draw the Wheland intermediate for α-attack (C1): you can draw a cationic structure that keeps the OTHER ring fully aromatic; for β-attack (C2): you cannot. The intermediate stabilised by retaining an intact aromatic ring wins.
- **Aromaticity spectrum for five-membered rings**: thiophene ≈ benzene > pyrrole >> furan. Reactivity in EAS is the inverse of aromaticity—furan reacts fastest precisely because it has least to lose.

## Why Students Fail
- Confusing lone-pair location in N-heterocycles: students write pyridine as electron-rich because "nitrogen donates"—but which lone pair? The in-ring lone pair of pyrrole donates to π-system; pyridine's lone pair is in an sp² orbital perpendicular to p_z and cannot conjugate into the ring.
- Assuming polycyclics react identically to benzene: naphthalene's α vs. β selectivity, anthracene's C9 selectivity, and phenanthrene's olefinic C9-C10 bond all require understanding that ring fusion creates unequal electron density.
- Forgetting that furan behaves as a diene in Diels-Alder reactions—its "aromatic reluctance" is overridden by enhanced electrophile reactivity; students expect it to behave purely as a benzene analogue.

## Misconceptions
1. **"Pyridine is electron-rich because nitrogen donates lone pairs"** (Type 3 — language contamination: "nitrogen donates" is correct for pyrrole but wrong here; the word "donates" is borrowed without checking which lone pair).
   - Probe: "Draw the resonance structures that show pyridine's nitrogen donating its lone pair into the ring." (Student will try; the correct answer is that it cannot—the sp² lone pair is in the plane, orthogonal to the π-system.)
   - Characteristic phrase: "nitrogen is always electron-donating"
   - Intervention: explicitly contrast pyridine (lone pair in sp² orbital, in-plane, perpendicular to p_z—CANNOT conjugate) vs. pyrrole (lone pair in p_z orbital, PARALLEL to ring π-system—CAN conjugate). Draw the orbital picture, not just the Lewis structure.

2. **"Both α and β positions in naphthalene are equally activated"** (Type 1 — overgeneralization from benzene, where all positions are equivalent).
   - Probe: "Why does naphthalene brominate preferentially at C1 rather than C2?"
   - Characteristic phrase: "it's symmetric so it doesn't matter" / "both are on the ring"
   - Intervention: draw both Wheland intermediates and count how many structures keep the second ring fully aromatic. C1 attack preserves the intact aromatic ring in the intermediate (3 resonance structures with aromatic ring intact); C2 attack disrupts both rings.

3. **"Furan is less reactive than benzene because it's less aromatic"** (Type 5 — instruction-induced reversal; students learn 'aromatic = stable = less reactive' and apply it monotonically, but EAS reactivity is about the RING's π-electron density, not its thermodynamic aromaticity).
   - Probe: "Rank benzene, furan, and thiophene in order of EAS reactivity."
   - Characteristic phrase: "less aromatic means harder to react" / "furan doesn't want to react"
   - Intervention: separate thermodynamic aromaticity (stability of starting material) from kinetic EAS reactivity (electron density available to donate to electrophile). Furan donates its lone pair more completely per electron density available, making the ring very electron-rich per π-electron, even though the overall resonance energy is lower.

## Analogies
- **Good**: Naphthalene's α-position is like the window seat on a shared bus—closer to the passenger (electrophile) access point; the other ring can still remain "settled" while the α-carbon deals with the visitor.
- **Anti-analogy**: Do NOT say "pyridine is like aniline but with nitrogen in the ring"—aniline's nitrogen is exocyclic and donates INTO the ring; pyridine's nitrogen is IN the ring and withdraws FROM it via induction. The spatial relationship is completely different.

## Demonstrations
- **Naphthalene bromination**: demonstrate that naphthalene brominates readily (unlike benzene, which needs a Lewis acid catalyst) due to higher electron density; product is 1-bromonaphthalene (α) — can show by NMR or TLC.
- **Furan Diels-Alder**: show furan reacting with maleic anhydride at room temperature to give an endo-oxanorbornene adduct—this demonstrates furan's diene reactivity that benzene cannot mimic.
- **Molecular model overlay**: place pyridine and pyrrole models side by side; show that in pyridine the nitrogen lone pair points OUTWARD in the plane (lone pair available for Lewis base reactions, e.g., forms salts with HCl), while in pyrrole the lone pair is IN the π-cloud (pyrrole is a far weaker base; pKₐH ~−3 vs. pyridine ~5).

## Discovery Questions
1. Benzene has six equivalent carbons; does naphthalene have ten equivalent carbons? (No—α and β are distinct.) What experiment would you design to count how many types of positions naphthalene has?
2. If you replace one CH in benzene with N, how does the ring's electron density change and why? What if you replace one CH with NH instead?
3. Furan reacts with dienophiles in Diels-Alder reactions. What feature of furan enables this that benzene does not have?
4. Purines and pyrimidines are essential components of DNA. What type of heterocycle is pyrimidine (π-rich or π-deficient), and how does this affect its reactivity compared to benzene?

## Teaching Sequence
1. **Review Hückel's rule and benzene** as the prototype 6 π-e aromatic; ask "what changes if we fuse two benzene rings?"
2. **Naphthalene**: draw the full π-system; show α vs. β positions; work through the Wheland intermediate argument for α-selectivity; compare resonance energy of naphthalene to 2 × benzene (less than additive — fusion cost).
3. **Anthracene and phenanthrene**: show C9/C10 selectivity; point out phenanthrene's C9-C10 bond behaving like a double bond (adds Br₂, oxidised to 9,10-phenanthrenedione).
4. **Pyridine vs. pyrrole orbital picture**: draw both molecules' orbital diagrams explicitly; count π-electrons; ask students to predict π-excess or π-deficient.
5. **EAS predictions**: let students predict which is faster — pyrrole + Br₂/FeBr₃ or benzene + Br₂/FeBr₃ — and at which position; confirm furan > pyrrole > thiophene > benzene.
6. **Heterocyclic quintet**: briefly map each common heterocycle (furan, thiophene, pyrrole, pyridine, imidazole) onto the lone-pair-in or lone-pair-out framework.
7. **Biological heterocycles**: introduce purine/pyrimidine as fused or lone N-type rings; note that DNA base-pairing uses exocyclic groups, not ring EAS.

## Tutor Actions
- **If student says "pyridine is like pyrrole but with a different nitrogen position"**: draw orbitals rather than Lewis structures; the difference is not position but orbital type (sp² in-plane vs. p_z in ring).
- **If student cannot predict naphthalene selectivity**: draw BOTH Wheland intermediates and ask "which one has an intact aromatic ring in the intermediate?"
- **If student confuses Diels-Alder diene with EAS aromatic**: clarify that furan participates in Diels-Alder as a 4π diene; this is distinct from its EAS reactivity; benzene cannot act as a Diels-Alder diene (too stable).
- **After each heterocycle**: explicitly ask "lone pair in ring or outside?" as a two-second checkpoint before predicting reactivity.

## Voice Teaching Notes
- The phrase "lone pair in or out of the ring" is the single most important phrase in this concept — say it explicitly before every reactivity prediction.
- When contrasting pyridine and pyrrole verbally: "Pyridine's nitrogen is like a bouncer who keeps its lone pair to itself and guards the door — the ring gets poorer. Pyrrole's nitrogen GIVES its lone pair to the ring — the ring gets richer."
- Naphthalene α vs. β: "α wins because the OTHER ring can sit out the fight" — rehearse this phrase until it is instinctive.
- For the aromatic/reactivity inversion (furan most reactive, most aromatic is thiophene): say explicitly "more aromatic does NOT mean more EAS-reactive here — reactivity is about electron donation, not thermodynamic stability."

## Assessment Signals
- **Green**: draws correct Wheland intermediates for α vs. β naphthalene with the intact aromatic ring clearly marked; correctly ranks EAS reactivity of five-membered heterocycles; identifies pyridine as π-deficient without prompting.
- **Amber**: gives correct answer for selectivity but cannot explain the intermediate; knows thiophene > pyrrole > furan for aromaticity but inverts the EAS reactivity order.
- **Red**: calls pyridine electron-rich; says naphthalene reacts identically at all positions; does not distinguish lone-pair orbital types.

## Tutor Recovery Strategy
- If student conflates pyridine and pyrrole reactivity: go back to orbital diagrams (not Lewis structures). Ask "what orbital is the nitrogen lone pair in for pyridine?" — sp². "Can an sp² orbital overlap with the p_z orbitals of the π-system?" — no, they are perpendicular. This is the diagnostic conversation.
- If naphthalene selectivity is guesswork: have student draw the two Wheland intermediates fully and count the number of structures in which the second ring retains its aromatic configuration.
- If furan/thiophene reactivity is inverted: use a two-column table: aromaticity (resonance energy) vs. EAS rate. Fill it together. Show the inversion is real and has a mechanism.

## Memory Hooks
- **Pyridine IN, Pyrrole OUT** — the lone pair's relationship to the ring π-system (IN the plane for pyridine, OUT into the π-cloud for pyrrole — hence pyrrole donates, pyridine does not).
- **α beats β because the OTHER ring stays aromatic** — naphthalene mnemonic.
- **Furan fastest, thiophene most aromatic** — two separate awards for the five-membered trio; not the same.
- **Purines = fused (two rings), Pyrimidines = single** — biological shorthand.

## Transfer Connections
- **Acid-base**: pyridine is a Lewis/Brønsted base (lone pair in sp² orbital, not used in aromaticity, available for protonation); pyrrole is an extremely weak base (lone pair needed for aromaticity; protonating it destroys the aromatic sextet, pKₐH ≈ −3.8).
- **Electrophilic addition vs. EAS selectivity**: phenanthrene's C9-C10 behaves like an alkene (adds Br₂, undergoes epoxidation) — bridge between Chapter Alkenes and Chapter Arenes.
- **Drug discovery**: most pharmaceuticals contain heterocyclic rings; knowing reactivity helps predict metabolic oxidation sites (cytochrome P450 often attacks positions predicted by heterocyclic electron density maps).
- **DNA base pairing**: adenine (purine)/thymine (pyrimidine) pair via 2 H-bonds; guanine (purine)/cytosine (pyrimidine) via 3 H-bonds — H-bond donors/acceptors are exocyclic groups, not ring EAS products.

## Cross-Subject Connections
- **Biology**: DNA/RNA bases are purines and pyrimidines; nucleotide structure; mutagenic PAH (polycyclic aromatic hydrocarbon) intercalation and base alkylation in carcinogenesis.
- **Physics**: spectroscopy — polycyclic aromatics absorb in UV-vis due to extended conjugation; naphthalene's absorption at ~310 nm vs. benzene at ~254 nm illustrates how ring fusion red-shifts absorption.
- **Environmental chemistry**: PAH carcinogens (benzo[a]pyrene from incomplete combustion); heterocyclic compounds in food chemistry (browning reactions produce pyrazines); pyridine derivatives in pesticides.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.hyd.polycyclic`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.hyd.polycyclic` as of 2026-07-23.

## Curriculum Feedback
- The KG lists `chem.org.aromaticity` as a prerequisite. That concept should explicitly cover the lone-pair orbital argument (sp² vs. p_z) to avoid duplicating that explanation here; currently it is unclear how much of the orbital basis is covered upstream.
- Purine and pyrimidine (DNA bases) appear here only as application context. Consider whether a separate KG node for nucleotide/nucleoside chemistry should exist at a higher topological level, rather than embedding biological heterocycles in the hydrocarbon domain.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

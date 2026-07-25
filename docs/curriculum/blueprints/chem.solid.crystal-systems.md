# chem.solid.crystal-systems — Crystal Systems and Unit Cells

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.solid.crystal-systems` |
| Domain | Solid State |
| Requires | `chem.bond.metallic-bonding`, `chem.bond.ionic-bonding` |
| Unlocks | `chem.solid.amorphous`, `chem.solid.defects`, `chem.solid.packing` |
| Difficulty | proficient |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Crystal structures are described by seven crystal systems and their associated Bravais lattices, built from unit cells whose atom count must account for SHARING between adjacent cells (corner atoms contribute 1/8 each, face atoms 1/2 each, edge atoms 1/4 each, body-center atoms fully, giving FCC's 4 atoms/cell from 8×1/8 + 6×1/2); structure type is determined by which SPECIES occupy which lattice positions, not merely the topological pattern (CsCl's body-centered-looking arrangement is a genuinely different structure from true BCC, because BCC requires all lattice positions to hold the SAME atomic species, while CsCl alternates two different ions); and coordination number in an ionic crystal (like NaCl's 6:6) describes nearest-neighbor electrostatic contacts, not covalent bond count or bond order, since ionic crystals contain no discrete covalent bonds at all.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Counting the atoms actually "belonging to" one FCC unit cell by tracking how corner and face atoms are shared with neighboring cells, rather than simply counting every visible atom in the drawing.

**Representational**: A side-by-side comparison of BCC iron (single species at corners and body center) versus CsCl's structure (two distinct ionic species at the same topological positions), visually similar but structurally distinct.

**Abstract**: The general sharing-fraction rule (corner=1/8, face=1/2, edge=1/4, body-center=1) applied to compute atoms-per-unit-cell for any structure; the distinction between topological position pattern and actual chemical/structural identity.

**Transfer**: Given an unfamiliar unit cell diagram, correctly computing the number of atoms per unit cell using sharing fractions, and correctly determining whether a body-centered-looking arrangement is genuinely BCC or a distinct two-species structure type.

## 3. Why Beginners Fail

Students see a body-centered-looking atomic arrangement (like CsCl) and label it "BCC" purely from the visual/topological position pattern, missing that true BCC specifically requires all lattice positions to be occupied by the SAME atomic species; they count every atom visibly drawn in a unit cell diagram as a whole atom belonging entirely to that cell, missing that atoms at corners, faces, and edges are shared between multiple adjacent unit cells and must be counted using fractional contributions; and they interpret a high coordination number (like NaCl's 6:6) as meaning 6 discrete covalent bonds, missing that ionic crystals have no covalent bonds at all — the coordination number describes electrostatic nearest-neighbor contacts instead.

## 4. Misconception Library

### MC-1: CsCl has a BCC structure because there's an atom at the body centre
- **Probe**: "Is the atom at the body centre of CsCl the same type as the corner atoms?"
- **Characteristic phrase**: "CsCl is like iron — BCC."
- **Trigger (Type 6, analogy overextension)**: Students see the same topological position pattern (corners plus a body-center atom) in both CsCl and true BCC metals like iron, and overextend the surface-level positional similarity into a claim of structural identity.
- **Conflict evidence [P28]**: True BCC means ALL atoms occupying the lattice (both corners and body center) are IDENTICAL — one single atomic species; CsCl instead has Cs⁺ at the body center and Cl⁻ at the corners, two genuinely DIFFERENT ionic species — this is formally its own distinct structure type (the "CsCl structure"), not BCC, even though the topological positions look the same.
- **Bridge [P30]**: The positional/topological pattern (where atoms sit relative to the unit cell) and the chemical identity of what occupies those positions are two separate pieces of information — matching positions doesn't guarantee matching structure type when the occupying species differ.
- **Replacement [P31]**: A structure is genuinely BCC only if a single atomic species occupies both corner and body-center positions; when two different species occupy those positions (as in CsCl), it's a distinct structure type, despite the superficially identical geometric arrangement.
- **Discrimination pairs [P33]**: Iron (single Fe species at corners and body center, true BCC) vs. CsCl (Cs⁺ at body center, Cl⁻ at corners, two species, the distinct "CsCl structure").
- **S6 repair path**: Ask directly, "is the atom at the body center the same chemical species as the corner atoms?" — the answer (no, for CsCl) immediately breaks the BCC classification.

### MC-2: 4 atoms per FCC unit cell means 4 individual atoms can be seen in the corner+face drawing
- **Probe**: "How many atoms does the FCC unit cell picture show at corners and faces? What is the contribution of each?"
- **Characteristic phrase**: "I count 14 atoms in the diagram."
- **Trigger (Type 4, notation-induced)**: Students count every visually depicted atom position in the unit cell diagram (8 corners + 6 faces = 14 positions) as if each contributed a whole atom to that single cell, without accounting for sharing with neighboring cells.
- **Conflict evidence [P28]**: Atoms at unit cell boundaries are SHARED between multiple adjacent unit cells — a corner atom is shared among 8 unit cells (contributing only 1/8 to any single cell), and a face atom is shared between 2 unit cells (contributing 1/2); the correct calculation for FCC is 8 corners × 1/8 + 6 faces × 1/2 = 1 + 3 = 4 atoms genuinely belonging to one unit cell, not the 14 raw positions visible in the drawing.
- **Bridge [P30]**: The unit cell diagram shows atom POSITIONS, many of which are simultaneously part of several neighboring unit cells in the full extended crystal — counting "atoms per unit cell" means counting how much of each shared position genuinely belongs to just one cell, not counting every visible position as a whole atom.
- **Replacement [P31]**: Compute atoms per unit cell using sharing fractions — corner=1/8, edge=1/4, face=1/2, body-center=1 (fully contained) — summed across all occupied positions.
- **Discrimination pairs [P33]**: 14 raw visible positions (naive, incorrect count) vs. 4 atoms genuinely belonging to the unit cell (correct, sharing-fraction-based count).
- **S6 repair path**: Walk through the explicit sharing-fraction calculation for FCC step by step: 8×(1/8) + 6×(1/2) = 4.

### MC-3: NaCl coordination 6:6 means every sodium is bonded to 6 chlorides because it forms 6 bonds
- **Probe**: "Is the Na–Cl interaction in NaCl a covalent bond?"
- **Characteristic phrase**: "6 bonds means 6 covalent bonds."
- **Trigger (Type 1, overgeneralization)**: Students transfer the language of "bonding" from covalent-bond contexts (where a specific bond count genuinely means discrete, countable covalent bonds) onto the coordination number in an ionic crystal, assuming the same meaning applies.
- **Conflict evidence [P28]**: Ionic crystals contain NO discrete covalent bonds at all — each Na⁺ ion is surrounded by 6 nearest-neighbor Cl⁻ ions through electrostatic (ionic) attraction spread across the entire lattice, not through 6 separate, localized covalent bond pairs; the coordination number describes a nearest-neighbor COUNT, entirely different in kind from a covalent bond order or count.
- **Bridge [P30]**: "Bonding" in an ionic crystal is fundamentally non-directional electrostatic attraction distributed across the whole lattice (as established in `chem.bond.ionic-bonding`), while covalent "bonding" involves specific, directional, localized electron-pair sharing between exactly two atoms — the word "coordination" for ionic crystals borrows numerical language from bonding contexts without implying the same physical mechanism.
- **Replacement [P31]**: Coordination number counts nearest-neighbor ions held by electrostatic attraction in an ionic lattice — it is not equivalent to a covalent bond count, and no discrete covalent bonds exist in a purely ionic crystal.
- **Discrimination pairs [P33]**: A covalent molecule's bond count (discrete, directional, localized electron-pair bonds) vs. NaCl's coordination number (electrostatic nearest-neighbor count, non-directional, delocalized across the lattice).
- **S6 repair path**: Return directly to `chem.bond.ionic-bonding`'s established distinction — electrostatic attraction across a whole lattice, not discrete pairwise bonds — and apply it explicitly to the coordination-number question.

## 5. Explanation Library

**Primary explanation**: Crystal structures are classified by seven crystal systems and their Bravais lattices, built from repeating unit cells. Because unit cells tile together to fill space, atoms sitting at cell boundaries (corners, edges, faces) are shared among multiple adjacent cells — computing the true number of atoms belonging to a single unit cell requires summing fractional contributions (1/8 per corner, 1/4 per edge, 1/2 per face, 1 per body-center atom), not simply counting every visible atom position.

**Secondary explanation (structure-type vs. topology framing)**: Two structures can share the same topological atom-position pattern (like CsCl's arrangement resembling BCC) while being genuinely different structure types, because structural classification depends on WHICH chemical species occupies each position, not merely the geometric pattern itself — and in ionic crystals specifically, the "coordination number" describes electrostatic nearest-neighbor contacts distributed across the lattice, fundamentally different from a discrete covalent bond count.

## 6. Analogy Library

- **Primary analogy**: A shared apartment building where residents at shared walls (corners, edges, faces of a unit cell) only "belong" fractionally to any one apartment (unit cell) — a resident whose room touches 8 different apartments' shared corner only counts as 1/8 toward any single apartment's occupancy count.
- **Breaking point**: The shared-apartment analogy conveys the fractional-sharing counting rule well but doesn't naturally distinguish topological position from chemical species identity (the CsCl-vs-BCC distinction) — that needs the explicit same-species-vs-different-species argument.
- **Anti-analogy**: Do NOT say "if it looks body-centered, it's BCC" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (FCC atom-counting walkthrough)**: Work through the explicit 8×1/8 + 6×1/2 = 4 calculation for FCC step by step, having students verify each fractional contribution against a diagram.
- **Demonstration 2 (CsCl vs. BCC species comparison)**: Present both structures side by side, with atoms explicitly labeled by chemical species, having students identify the same-species-vs-different-species distinction directly.

## 8. Discovery Lesson

**Opening**: "If a unit cell diagram shows 14 atom positions, does that mean 14 atoms belong entirely to that one cell?"

**Exploration**: Students work through the sharing-fraction calculation for FCC, discovering the true count (4) is far fewer than the raw visible position count (14).

**Synthesis**: Guide toward: atoms at cell boundaries are shared with neighboring cells, so only fractional contributions belong to any single unit cell.

**Closure**: "Given that CsCl looks body-centered, does that automatically make it a BCC structure like iron?" (Directly resolves MC-1.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit FCC sharing-fraction calculation step by step.
- **TA-2 (TELL)**: State the same-species requirement for true BCC explicitly, immediately contrasted with CsCl's two-species structure.
- **TA-3 (DO)**: Student computes atoms-per-unit-cell for a new, previously-unseen unit cell using sharing fractions.
- **TA-4 (TEST-THINKING)**: Present MC-3's probe and ask the student to explain why NaCl's coordination number isn't a covalent bond count, using the established ionic-bonding framework.

## 10. Voice Teaching

Whenever atoms-per-unit-cell is discussed, narrate the sharing-fraction calculation explicitly and slowly, never stating the final number without showing the fractional-contribution breakdown. Whenever a body-centered-looking structure is classified, ask "same species or different species at each position?" as the very first diagnostic question.

## 11. Assessment

**Mastery gate**: Student can (a) correctly distinguish true BCC from a same-topology, different-species structure like CsCl, (b) correctly compute atoms-per-unit-cell using sharing fractions, (c) correctly explain why ionic coordination number isn't a covalent bond count.

- **FA-1**: "Is the atom at the body centre of CsCl the same type as the corner atoms?" — targets MC-1.
- **FA-2**: "How many atoms does the FCC unit cell contain, accounting for sharing?" — targets MC-2.
- **FA-3**: "Is the Na–Cl interaction in NaCl a covalent bond?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students encountering unit-cell sharing fractions for the first time, since the naive visible-count approach feels intuitive.

**Delayed retrieval**: Re-probe MC-2's sharing-fraction procedure before `chem.solid.packing` formally develops packing efficiency calculations, which depend entirely on correct atoms-per-unit-cell counting.

## 12. Recovery Notes

- **S3 (stuck)**: For the sharing-fraction confusion, isolate one position type at a time — first just corners, verify the 1/8 rule, then add faces separately.
- **S4 (frustrated)**: Normalize — the naive "count what you see" approach is a reasonable, common first instinct when encountering unit cell diagrams for the first time.
- **S6 (collision)**: Use the explicit species-labeling comparison for MC-1; use the return to established ionic-bonding framework for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why CsCl and BCC iron aren't the same structure type despite looking topologically identical.

## 13. Memory & Review

Tag as a procedural-computational memory (sharing-fraction atom counting) plus a conceptual-correction memory (topology vs. species identity; coordination number vs. covalent bonding). Schedule a spaced check at ~1 week and again before `chem.solid.packing`.

## 14. Transfer Map

Feeds directly into `chem.solid.amorphous` (contrasts crystalline order with amorphous disorder), `chem.solid.defects` (crystal imperfections are defined relative to the ideal lattice established here), and `chem.solid.packing` (packing efficiency calculations depend directly on correct atoms-per-unit-cell counting).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

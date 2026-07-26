# chem.solid.packing — Close Packing of Spheres

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.solid.packing` |
| Domain | Solid State |
| Requires | `chem.solid.crystal-systems` |
| Unlocks | `chem.solid.ionic-solids` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

HCP and CCP are IDENTICAL in coordination number (12 in each) AND packing efficiency (74.05% in each) — the ONLY difference is stacking sequence (ABAB for HCP versus ABCABC for CCP), producing different overall symmetry (hexagonal vs. cubic) despite identical local density and neighbor count; in the fluorite (CaF₂) structure, Ca²⁺ occupies CCP positions while F⁻ fills ALL TETRAHEDRAL holes (not octahedral) — the 1:2 stoichiometry arises because CCP genuinely has TWICE as many tetrahedral holes as atoms (2 per Ca²⁺), giving 2 F⁻ per Ca²⁺ naturally, not because octahedral holes are somehow linked to a 1:2 ratio; and simple cubic packing, despite its visually "neat," grid-like appearance, is genuinely LESS efficient (52.4% packing efficiency) than close-packed structures like CCP/FCC (74%) — the apparent visual "neatness" of a square grid is not a quantitative measure of packing density.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing HCP and CCP structures directly, counting each sphere's nearest neighbors (12 in both) and computing packing efficiency (74.05% in both), discovering the only genuine difference is the stacking pattern.

**Representational**: A structural diagram of the fluorite unit cell showing Ca²⁺ in CCP positions with F⁻ explicitly filling all tetrahedral holes (2 per Ca²⁺), visually connecting the hole-count ratio to the 1:2 stoichiometry.

**Abstract**: The general principle that "different stacking sequence" doesn't imply "different density/coordination" — HCP and CCP achieve identical packing efficiency via different but equally-optimal 3D arrangements; the general rule that stoichiometric ratios in ionic solids derive from actual hole-count-per-atom relationships (tetrahedral: 2 per atom; octahedral: 1 per atom), not from arbitrary hole-type-to-ratio assumptions.

**Transfer**: Given an unfamiliar close-packed structure or ionic solid, correctly computing coordination number and packing efficiency (recognizing HCP/CCP equivalence), correctly determining which hole type is filled based on the compound's actual stoichiometry, and correctly computing packing efficiency quantitatively rather than relying on visual "neatness" impressions.

## 3. Why Beginners Fail

Students assume HCP and CCP, having visually different stacking patterns (ABAB vs. ABCABC) and different overall crystal symmetry (hexagonal vs. cubic), must therefore differ in every measurable property, missing that both structures achieve IDENTICAL coordination number (12) and packing efficiency (74.05%) — the stacking sequence is the only genuine difference; they assume a compound's stoichiometric ratio directly indicates which type of hole (octahedral vs. tetrahedral) is filled, based on a superficial numeric-matching intuition, missing that the actual hole-to-atom count ratio (tetrahedral holes: 2 per atom in a close-packed structure; octahedral holes: 1 per atom) is what determines the resulting stoichiometry, not an assumed direct correspondence between ratio numbers and hole "commonness"; and they assume simple cubic packing, due to its visually regular, grid-like appearance, must be denser than close-packed structures, missing that quantitative packing-efficiency calculation shows simple cubic (52.4%) is actually significantly LESS efficient than close packing (74%).

## 4. Misconception Library

### MC-1: HCP and CCP are different in every respect
- **Probe**: "Compare the coordination number and packing efficiency of HCP and CCP."
- **Characteristic phrase**: "HCP and CCP are completely different types of packing."
- **Trigger (Type 5, instruction-induced)**: The visibly different stacking sequences (ABAB vs. ABCABC) and different resulting crystal symmetries (hexagonal vs. cubic) lead students to assume every measurable property must differ between the two structures.
- **Conflict evidence [P28]**: HCP and CCP are genuinely IDENTICAL in BOTH coordination number (12 nearest neighbors in each) AND packing efficiency (74.05% in each) — the local environment of any single sphere (touching exactly 12 neighbors, in the same overall spatial density) is the same in both structures; the ONLY genuine difference is the STACKING SEQUENCE itself (HCP: layers alternate ABAB, with a slight rotational offset between top and bottom layers of 6 neighbors; CCP: layers follow ABCABC, without that offset), which changes the overall crystal SYMMETRY (hexagonal vs. cubic) without changing local density or coordination at all.
- **Bridge [P30]**: Two structures can be built from IDENTICAL local packing arrangements (same coordination, same density) while differing in how those local units are stacked into the larger 3D repeating pattern — the larger-scale symmetry difference doesn't imply any difference in the fundamental local packing efficiency or neighbor count.
- **Replacement [P31]**: HCP and CCP share identical coordination number (12) and packing efficiency (74.05%) — their only genuine difference is stacking sequence (ABAB vs. ABCABC), producing different crystal symmetry without changing local density.
- **Discrimination pairs [P33]**: HCP (ABAB stacking, hexagonal symmetry) vs. CCP (ABCABC stacking, cubic symmetry) — different symmetry, but identical coordination number and packing efficiency.
- **S6 repair path**: Compute coordination number and packing efficiency explicitly and separately for both structures, showing the identical numeric results despite the different stacking pattern.

### MC-2: The fluorite structure has Ca²⁺ in octahedral holes because CaF₂ has Ca:F = 1:2
- **Probe**: "In the fluorite structure, which type of hole do the F⁻ ions occupy, and why?"
- **Characteristic phrase**: "1:2 stoichiometry → octahedral holes because there's one per atom."
- **Trigger (Type 4, notation-induced)**: Students may incorrectly reason that since octahedral holes are commonly discussed first or seem more "standard," a non-1:1 stoichiometry like 1:2 must somehow relate to octahedral-hole occupancy, without checking the actual hole-count-per-atom relationships.
- **Conflict evidence [P28]**: In the fluorite structure, Ca²⁺ occupies the CCP lattice positions themselves, while F⁻ fills ALL TETRAHEDRAL holes (not octahedral) — the 1:2 Ca:F ratio arises precisely because a CCP structure genuinely has TWICE as many tetrahedral holes as there are atoms in the lattice (2 tetrahedral holes per CCP atom), so filling all tetrahedral holes with F⁻ naturally gives 2 F⁻ per Ca²⁺, correctly matching CaF₂'s formula; octahedral holes, by contrast, occur at only 1 per atom in a close-packed structure, which would instead produce a 1:1 ratio (as seen in NaCl's structure, not fluorite's).
- **Bridge [P30]**: The correct reasoning connects stoichiometry to the ACTUAL geometric hole-count-per-atom ratio inherent to the close-packed lattice (tetrahedral: 2 per atom; octahedral: 1 per atom) — not to any assumed "more common" or "more standard" hole type; a 1:2 ratio specifically points to tetrahedral-hole filling (2 per atom), while a 1:1 ratio points to octahedral-hole filling (1 per atom).
- **Replacement [P31]**: Fluorite's Ca²⁺ occupies CCP lattice positions; F⁻ fills all tetrahedral holes (2 per Ca²⁺), correctly producing the 1:2 stoichiometry from the genuine 2-tetrahedral-holes-per-atom geometric ratio — never assume octahedral-hole occupancy from stoichiometry numbers alone.
- **Discrimination pairs [P33]**: NaCl structure (1:1 ratio, octahedral holes filled, 1 per atom) vs. fluorite structure (1:2 ratio, tetrahedral holes filled, 2 per atom) — the correct hole type follows directly from the actual geometric hole-count ratio matching the compound's stoichiometry.
- **S6 repair path**: Present the explicit tetrahedral-holes-per-atom (2) and octahedral-holes-per-atom (1) counts for a close-packed structure, connecting each directly to the resulting stoichiometric ratio it would produce if fully filled.

### MC-3: Simple cubic packing is denser than close packing
- **Probe**: "Calculate the packing efficiency of a simple cubic structure (each atom at a corner, touching along the edge) and compare to CCP."
- **Characteristic phrase**: "the neat square grid must be more efficient than the irregular hexagonal arrangement."
- **Trigger (Type 2, perceptual intuition)**: The visually regular, orderly appearance of a simple cubic grid intuitively suggests maximal efficiency, a plausible-sounding but quantitatively incorrect visual impression.
- **Conflict evidence [P28]**: For simple cubic (atoms touching along the cell edge, so r=a/2, with exactly 1 atom per unit cell), packing efficiency = (4/3)πr³/a³ = π/6 ≈ 52.4%; for CCP/FCC (4 atoms per unit cell, with atoms touching along the face diagonal, so 4r=a√2), packing efficiency works out to approximately 74% — CCP is dramatically MORE efficient than simple cubic, directly contradicting the visual "neat grid = more efficient" intuition.
- **Bridge [P30]**: Visual regularity/orderliness (a square, grid-like appearance) is not the same property as quantitative packing density (the actual fraction of space occupied by spheres) — simple cubic's "neat" appearance comes from atoms touching only along cell edges, leaving substantial empty space in the corners and center of each unit cell, while close-packed structures achieve genuinely denser occupancy through a less visually "square" but geometrically more efficient arrangement.
- **Replacement [P31]**: Packing efficiency must be computed quantitatively (volume of spheres divided by total unit cell volume) — simple cubic's visually regular appearance does NOT correspond to higher density; close-packed structures (HCP/CCP, ≈74%) are genuinely denser than simple cubic (≈52.4%).
- **Discrimination pairs [P33]**: Simple cubic (visually "neat" grid, but only 52.4% packing efficiency) vs. CCP/FCC (visually less obviously "square," but genuinely denser at 74% packing efficiency).
- **S6 repair path**: Compute both packing efficiencies explicitly using the correct geometric formulas, showing the numeric comparison directly contradicts the visual intuition.

## 5. Explanation Library

**Primary explanation**: HCP and CCP are two distinct ways of stacking identical, maximally-efficient layers of spheres — both achieve identical coordination number (12) and packing efficiency (74.05%), differing only in their specific stacking sequence (ABAB for HCP, ABCABC for CCP), which produces different overall crystal symmetry without any difference in local packing density. Ionic solids built on close-packed lattices derive their stoichiometry from the actual geometric ratio of available holes to atoms — tetrahedral holes occur at 2 per atom, octahedral holes at 1 per atom — with a compound's specific stoichiometric ratio (like CaF₂'s 1:2) directly indicating which hole type is being filled.

**Secondary explanation (quantitative-vs-visual packing framing)**: Packing efficiency must be computed quantitatively from the actual sphere volume divided by unit cell volume, not estimated from visual regularity — simple cubic packing, despite its visually "neat," grid-like appearance, is genuinely less dense (52.4%) than close-packed arrangements like CCP/FCC (74%), since visual orderliness and quantitative packing density are unrelated properties.

## 6. Analogy Library

- **Primary analogy**: Stacking oranges at a grocery store two different ways — directly on top of each other in aligned columns (like ABAB) versus offset in a brick-like pattern (like ABCABC) — both methods genuinely fit the SAME number of oranges into the same overall volume (identical density), but produce visually different overall patterns.
- **Breaking point**: The orange-stacking analogy conveys the HCP/CCP density-equivalence concept well but doesn't naturally capture the hole-count-to-stoichiometry relationship or the simple-cubic-vs-close-packed quantitative comparison — those need the explicit geometric hole-counting and packing-efficiency-formula arguments.
- **Anti-analogy**: Do NOT say "HCP and CCP have different packing efficiencies because they look different" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (HCP-vs-CCP coordination/efficiency computation)**: Compute coordination number and packing efficiency explicitly and separately for HCP and CCP, showing the identical numeric results.
- **Demonstration 2 (fluorite tetrahedral-hole-filling diagram)**: Present the fluorite unit cell explicitly, showing Ca²⁺ in CCP positions and F⁻ filling all tetrahedral holes, connecting the 2-holes-per-atom count directly to the 1:2 stoichiometry.

## 8. Discovery Lesson

**Opening**: "HCP and CCP have visibly different stacking sequences and different overall crystal symmetry. Do you expect their packing efficiencies to also differ?"

**Exploration**: Students compute coordination number and packing efficiency explicitly for both structures, discovering the numbers are identical despite the different stacking.

**Synthesis**: Guide toward: stacking sequence affects overall crystal symmetry without affecting local packing density or coordination.

**Closure**: "Does a visually 'neat' square grid arrangement (simple cubic) necessarily pack atoms more densely than a close-packed arrangement?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit HCP-vs-CCP coordination/efficiency computation, showing identical results.
- **TA-2 (TELL)**: State the tetrahedral-holes-per-atom (2) versus octahedral-holes-per-atom (1) rule explicitly, worked through for fluorite's 1:2 stoichiometry.
- **TA-3 (DO)**: Student computes simple cubic packing efficiency explicitly and compares it numerically to CCP.
- **TA-4 (TEST-THINKING)**: Present MC-2's fluorite probe and ask the student to justify tetrahedral (not octahedral) hole-filling using the correct hole-count ratio.

## 10. Voice Teaching

Whenever HCP and CCP are compared, state explicitly "identical coordination and packing efficiency — only the stacking sequence differs" before any further discussion. Whenever an ionic solid's hole-filling pattern is discussed, connect the specific stoichiometric ratio directly to the corresponding hole-count-per-atom value (2 for tetrahedral, 1 for octahedral), never assuming a hole type from the ratio number alone.

## 11. Assessment

**Mastery gate**: Student can (a) correctly state that HCP and CCP share identical coordination number and packing efficiency, differing only in stacking sequence, (b) correctly identify tetrahedral-hole filling from a 1:2 stoichiometric ratio using the correct hole-count-per-atom reasoning, (c) correctly compute and compare packing efficiencies quantitatively, recognizing simple cubic as less efficient than close packing.

- **FA-1**: "Compare the coordination number and packing efficiency of HCP and CCP." — targets MC-1.
- **FA-2**: "In the fluorite structure, which type of hole do the F⁻ ions occupy, and why?" — targets MC-2.
- **FA-3**: "Calculate the packing efficiency of simple cubic and compare to CCP." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-3 among students relying on visual "neatness" impressions rather than quantitative computation.

**Delayed retrieval**: Re-probe MC-1's HCP/CCP equivalence and MC-2's hole-count reasoning before `chem.solid.ionic-solids` requires fluent, correct structural analysis of diverse ionic lattice types.

## 12. Recovery Notes

- **S3 (stuck)**: For the HCP-CCP-difference confusion, compute coordination number and packing efficiency explicitly, letting the identical numbers speak directly against the "completely different" assumption.
- **S4 (frustrated)**: Normalize — the visibly different stacking patterns and symmetry genuinely do look like they should produce different properties, making this a reasonable, common visual-based inference.
- **S6 (collision)**: Use the explicit hole-count-per-atom reasoning for MC-2; use the explicit packing-efficiency-formula computation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why simple cubic's visually regular appearance doesn't translate to higher packing density.

## 13. Memory & Review

Tag as three conceptual-correction memories (HCP/CCP density equivalence; hole-count-per-atom determines stoichiometry, not assumed hole-type commonness; quantitative packing efficiency over visual impression). Schedule a spaced check at ~1 week and again before `chem.solid.ionic-solids`.

## 14. Transfer Map

Feeds directly into `chem.solid.ionic-solids` (ionic lattice structures like fluorite, rock-salt, and others directly apply the hole-filling and packing-efficiency reasoning established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

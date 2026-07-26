# chem.atomic.orbitals — Shapes of Atomic Orbitals

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.atomic.orbitals` |
| Domain | Atomic Structure |
| Requires | `chem.atomic.quantum-numbers` |
| Unlocks | `chem.atomic.electronic-config`, `chem.atomic.quantum-mech-model`, `chem.bond.mo-theory`, `chem.coord.cft` |
| Difficulty | proficient |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

Atomic orbitals are three-dimensional probability distributions for finding an electron, with characteristic shapes determined by their quantum numbers: s orbitals are spherical (l=0), p orbitals are dumbbell-shaped along one axis (l=1, three orientations), d orbitals have more complex four-lobed (mostly) or dumbbell-plus-torus (dz²) shapes (l=2, five orientations) — each orbital has angular nodes (= l, planes/surfaces of zero probability from angular shape) and radial nodes (= n − l − 1, spherical shells of zero probability from the radial wavefunction), and in multielectron atoms, orbitals sharing the same n but different l split into different energies due to shielding and penetration.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: A 3D-printed or rendered model set of s, p, and d orbital shapes, physically comparing the spherical s, dumbbell p, and clover-leaf/torus d shapes side by side.

**Representational**: Radial probability distribution plots for 1s, 2s, 3s orbitals showing an increasing number of radial nodes (0, 1, 2 respectively) as n increases.

**Abstract**: The node-counting formulas — angular nodes = l, radial nodes = n − l − 1, total nodes = n − 1 — and the shielding/penetration argument for why 2s sits below 2p in multielectron atoms despite sharing n=2.

**Transfer**: Predicting, for an arbitrary (n, l) combination not explicitly taught, the exact number of angular and radial nodes and a rough energy ranking within a multielectron atom.

## 3. Why Beginners Fail

Students overgeneralize the four commonly-diagrammed d orbitals (dxy, dxz, dyz, dx²−y², all four-lobed clover shapes) onto all five d orbitals, missing that dz² has a genuinely different dumbbell-plus-torus shape; they misapply the "total nodes = n−1" rule specifically to radial nodes without separating out the angular component (radial = n−l−1, not n−1); and they overgeneralize hydrogen's famous n-only energy dependence (all orbitals with the same n are degenerate) onto multielectron atoms, where shielding and penetration break that degeneracy.

## 4. Misconception Library

### MC-1: d orbitals all have 4 lobes
- **Probe**: "Draw or describe the dz² orbital. How is it different from dxy?"
- **Characteristic phrase**: "All d orbitals have 4 lobes in a clover-leaf pattern."
- **Trigger (Type 2, perceptual intuition)**: Diagrams consistently show the 4 textbook clover-leaf d orbitals (dxy, dxz, dyz, dx²−y²) and skip or briefly mention dz², so students generalize the clover-leaf pattern to all five.
- **Conflict evidence [P28]**: dz² has a dumbbell shape along the z-axis plus a torus (donut ring) in the xy-plane — two lobes plus a ring, visually distinct from the four-lobed clover shapes.
- **Bridge [P30]**: All five d orbitals share the same number of angular nodes (2, consistent with l=2), but that shared node count doesn't force an identical visual shape — the specific geometric arrangement of those nodes differs for dz².
- **Replacement [P31]**: Four of the five d orbitals are four-lobed clover shapes; the fifth, dz², is a dumbbell-plus-torus shape, all consistent with l=2's two angular nodes.
- **Discrimination pairs [P33]**: dxy (four-lobed clover) vs. dz² (dumbbell + torus) — same l, same node count, different geometric arrangement.
- **S6 repair path**: Show an explicit diagram of dz² alongside dxy and have the student count and compare the lobe/node arrangement directly.

### MC-2: The radial node count is n − 1
- **Probe**: "How many radial nodes does a 3p orbital have? How many angular nodes?"
- **Characteristic phrase**: "3p has n − 1 = 2 radial nodes."
- **Trigger (Type 5, instruction-induced)**: Students learn "total nodes = n − 1" and misapply it directly to radial nodes specifically, without separating out the angular contribution.
- **Conflict evidence [P28]**: For 3p (n=3, l=1): total nodes = n−1 = 2, but angular nodes = l = 1 and radial nodes = n−l−1 = 3−1−1 = 1 — the 2 total nodes split into 1 angular + 1 radial, not 2 radial.
- **Bridge [P30]**: "Total nodes = n−1" correctly counts all nodes combined, but doesn't tell you how many are angular versus radial — that split requires the separate formulas.
- **Replacement [P31]**: angular nodes = l; radial nodes = n − l − 1; total nodes = angular + radial = n − 1 (self-consistent, always).
- **Discrimination pairs [P33]**: 3s (l=0: 0 angular, 2 radial) vs. 3p (l=1: 1 angular, 1 radial) vs. 3d (l=2: 2 angular, 0 radial) — same n, same total nodes (2), different split.
- **S6 repair path**: Have the student compute angular and radial nodes separately for 3s, 3p, 3d and verify they always sum to n−1=2.

### MC-3: All orbitals with the same n are degenerate in multielectron atoms
- **Probe**: "Is the 2s orbital at higher, lower, or the same energy as the 2p orbital in a carbon atom?"
- **Characteristic phrase**: "In any atom, 2s and 2p are at the same energy because they have the same n."
- **Trigger (Type 1, overgeneralization)**: Hydrogen's famous n-only energy dependence (all same-n orbitals degenerate) is taught first, and students generalize this universally to all atoms.
- **Conflict evidence [P28]**: In a multielectron atom, 2s electrons penetrate closer to the nucleus (their radial probability distribution has a small inner lobe near the nucleus) than 2p electrons, so 2s electrons feel a higher effective nuclear charge (Zeff) and sit at lower energy — 2s and 2p are measurably split in energy for any real multielectron atom.
- **Bridge [P30]**: Hydrogen's n-only degeneracy is a special case arising because hydrogen has only one electron, so there's no shielding to break the degeneracy; multielectron atoms have electron-electron shielding, which does break it.
- **Replacement [P31]**: In multielectron atoms, orbital energy depends on both n and l — 2s sits below 2p, which would sit below a hypothetical 2d, due to shielding and penetration differences.
- **Discrimination pairs [P33]**: Hydrogen (2s = 2p, one-electron, no shielding) vs. carbon (2s < 2p, multielectron, shielding present).
- **S6 repair path**: Explain the penetration mechanism directly — 2s's inner lobe brings it closer to the nucleus's full charge, unshielded by other electrons, lowering its energy relative to 2p.

## 5. Explanation Library

**Primary explanation**: Each orbital's shape and node structure follows directly from its quantum numbers. The angular quantum number l sets both the orbital's basic shape family (s spherical, p dumbbell, d more complex) and the number of angular nodes (= l). The principal quantum number n, combined with l, sets the number of radial nodes (= n − l − 1), which shows up as additional concentric probability shells within the basic shape.

**Secondary explanation (energy-splitting framing)**: In hydrogen (one electron, no shielding), orbital energy depends only on n. In multielectron atoms, different l values within the same n shell penetrate the nucleus's charge differently — lower-l orbitals (like 2s) penetrate more, feel a higher effective nuclear charge, and sit at lower energy than higher-l orbitals of the same n (like 2p) — breaking hydrogen's n-only degeneracy.

## 6. Analogy Library

- **Primary analogy**: A set of differently-shaped balloons (spherical for s, dumbbell for p, clover-leaf or dumbbell-plus-torus for d) representing regions of high electron-finding probability, with node surfaces as the "pinch points" where the balloon material (probability) goes to exactly zero.
- **Breaking point**: The balloon analogy conveys static shape well but doesn't capture the wave-interference origin of nodes (they arise from the wavefunction crossing zero, not a physical pinching) — that requires the underlying quantum-mechanical wavefunction picture, developed further in `chem.atomic.quantum-mech-model`.
- **Anti-analogy**: Do NOT describe orbitals as "orbits" or fixed paths — this collides with `chem.atomic.bohr-model`'s already-corrected distinction between fixed circular orbits and probability distributions.

## 7. Demonstration Library

- **Demonstration 1 (node counting)**: Give students a table of (n, l) pairs and have them compute angular nodes, radial nodes, and total nodes for each, verifying the totals always equal n−1.
- **Demonstration 2 (d-orbital shape comparison)**: Present 3D renderings or models of all five d orbitals side by side and have students identify which one (dz²) breaks the four-lobed clover pattern.

## 8. Discovery Lesson

**Opening**: "In hydrogen, 2s and 2p have exactly the same energy. In carbon, do you think that's still true?"

**Exploration**: Students examine radial probability distribution plots for 2s and 2p, noting that 2s has a small inner lobe closer to the nucleus that 2p lacks, and reason about what that inner lobe means for how strongly the nucleus's charge is felt.

**Synthesis**: Guide toward: the inner lobe means 2s electrons spend some time much closer to the nucleus, unshielded by other electrons, giving them lower energy than 2p in any real multielectron atom.

**Closure**: "So was your first instinct — that same n always means same energy — a hydrogen-specific fact or a universal one?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present 3D models or renderings of s, p, and all five d orbital shapes, explicitly including dz².
- **TA-2 (TELL)**: State the angular-node/radial-node formulas explicitly, worked through for 3s, 3p, 3d.
- **TA-3 (DO)**: Student computes angular and radial node counts for a given (n, l) pair not previously worked as an example.
- **TA-4 (TEST-THINKING)**: Present MC-3's claim about carbon's 2s/2p energies and ask the student to argue for or against it using penetration/shielding reasoning.

## 10. Voice Teaching

When introducing radial vs. angular nodes, always compute both explicitly before stating the total — never state "total nodes = n−1" without immediately following with the angular/radial split, to preempt MC-2 rather than repair it later. When showing d orbitals, always include dz² in the same breath as the four clover-leaf ones, never as an afterthought.

## 11. Assessment

**Mastery gate**: Student can (a) describe dz²'s shape correctly and distinguish it from the four clover-leaf d orbitals, (b) compute angular and radial node counts separately for any given (n, l), (c) explain why 2s sits below 2p in a multielectron atom using penetration/shielding.

- **FA-1**: "Draw or describe the dz² orbital. How is it different from dxy?" — targets MC-1.
- **FA-2**: "How many radial nodes does a 3p orbital have? How many angular nodes?" — targets MC-2.
- **FA-3**: "Is 2s at higher, lower, or the same energy as 2p in a carbon atom? Why?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students who've memorized "total nodes = n−1" as a single undifferentiated rule.

**Delayed retrieval**: Re-probe MC-3's penetration/shielding argument before `chem.atomic.electronic-config` introduces the Aufbau filling order (which depends entirely on the 2s-before-2p-style energy ordering established here).

## 12. Recovery Notes

- **S3 (stuck)**: For node splitting, work through 3s, 3p, 3d side by side, always computing angular first (= l), then radial by subtraction.
- **S4 (frustrated)**: Normalize — the dz² shape genuinely is the outlier among the five d orbitals, and most diagrams do underemphasize it, so this gap is a common, reasonable one.
- **S6 (collision)**: Use the 2s/2p radial probability distribution comparison for MC-3; use the explicit dz² diagram for MC-1.
- **S9 (post-repair check)**: Ask the student to state, unprompted, why 2s and 2p are degenerate in hydrogen but not in carbon.

## 13. Memory & Review

Tag as a shape/visual memory (orbital geometries, especially dz²) plus a formula-based procedural memory (node-counting) plus a conceptual-correction memory (shielding breaks n-only degeneracy). Schedule a spaced check at ~1 week and again before `chem.atomic.electronic-config`.

## 14. Transfer Map

Feeds directly into `chem.atomic.electronic-config` (the Aufbau filling order depends on the energy splitting established here), `chem.atomic.quantum-mech-model` (formalizes the wavefunction origin of these shapes and nodes), `chem.bond.mo-theory` (orbital shapes determine overlap patterns in molecular orbital formation), and `chem.coord.cft` (d-orbital shapes are the foundation of crystal field theory's splitting diagrams).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

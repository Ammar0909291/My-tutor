# Atomic Orbitals — `chem.atomic.orbitals`

## Identity

- **KG ID**: chem.atomic.orbitals
- **Subject**: Chemistry
- **Domain**: Atomic Structure (chem.atomic)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.atomic.quantum-numbers
- **Unlocks**: chem.atomic.electronic-config, chem.atomic.quantum-mech-model, chem.bond.mo-theory, chem.coord.cft
- **Cross-links**: none

## Learning Objective

Students can describe the shapes of s, p, d, and f orbitals; define radial and angular nodes and calculate their counts; construct orbital energy diagrams for hydrogen and multielectron atoms; and explain why orbital shapes arise from the quantum numbers l and ml.

## Core Understanding

**Atomic orbital**: a one-electron wavefunction ψ(r, θ, φ). The probability of finding the electron in volume element dV is |ψ|² dV. Orbitals are described by three quantum numbers: n (size/energy), l (shape), ml (orientation).

**Shapes by subshell**:
- *s orbitals* (l = 0): spherically symmetric. 1s has no nodes; 2s has one radial node; 3s has two radial nodes.
- *p orbitals* (l = 1): dumbbell/figure-8 shaped; three orientations (px, py, pz). One nodal plane through the nucleus.
- *d orbitals* (l = 2): five orientations. Four are clover-leaf shaped (dxy, dxz, dyz, dx²−y²); one is dz² (torus + dumbbell). Two nodal surfaces.
- *f orbitals* (l = 3): seven orientations; complex, multi-lobed. Three nodal surfaces.

**Nodes**: regions where ψ = 0 (zero electron probability).
- Radial nodes (spherical shells): number = n − l − 1
- Angular nodes (planes or cones): number = l
- Total nodes = n − 1

Example: 3p orbital (n = 3, l = 1): radial nodes = 3 − 1 − 1 = 1; angular nodes = 1; total = 2.

**Orbital energy in hydrogen** (one electron): energy depends only on n:
E_n = −13.6 eV / n²

All orbitals with the same n are degenerate in hydrogen (2s = 2p; 3s = 3p = 3d).

**Orbital energy in multielectron atoms**: electron–electron repulsion and shielding (effective nuclear charge Z_eff) break the degeneracy:
- Within the same n: s < p < d < f (because s electrons penetrate more, experiencing higher Z_eff)
- 4s is filled before 3d in multielectron atoms (Aufbau); however, 3d is lower in energy than 4s once d electrons are present (relevant to ionisation order)

**Radial distribution function P(r)**: gives the probability of finding the electron at a distance r from the nucleus, regardless of direction:
P(r) = 4πr² |ψ|²

The 2s orbital's radial distribution shows a small inner hump (penetration) before its main lobe, explaining why 2s electrons feel a higher Z_eff than 2p.

## Mental Models

**The standing wave on a string model**: orbitals are stationary wave patterns on the 3D "string" of probability around a nucleus. Just as a vibrating string has nodes at fixed points, each orbital has fixed regions of zero probability. n − 1 nodes = n − 1 half-wavelengths.

**The lobe-and-cone model for angular nodes**: visualise an angular node as a plane slicing the orbital: p orbitals have 1 nodal plane; d orbitals have 2 nodal planes (or cones for dz²). The number of lobes equals the number of angular-node-separated regions.

## Why Students Fail

1. **Mixing up radial and angular nodes**: students confuse the total nodes formula (n − 1) with the individual components. They need to start from radial = n − l − 1 and angular = l separately.
2. **Thinking all d orbitals look the same**: dz² looks completely different from dxy etc. Students memorise "4 lobes" and are confused by dz²'s torus.
3. **Hydrogen degeneracy extended to multielectron atoms**: students assume 2s = 2p in energy for all atoms. This only holds for hydrogen.
4. **The 4s < 3d energy ordering is permanent**: students assume 4s always lies below 3d. After the 3d fills, 3d < 4s, so d-block cations lose 4s electrons first.

## Misconceptions

**MC-1 — d orbitals all have 4 lobes** (Type 2, perceptual intuition)
- *Mechanism*: diagrams always show 4 textbook d orbitals (dxy, dxz, dyz, dx²−y²) as clover-leaf, then skip dz² or show it briefly. Students generalise the pattern.
- *Diagnostic probe*: "Draw or describe the dz² orbital. How is it different from dxy?"
- *Characteristic phrase*: "All d orbitals have 4 lobes in a clover-leaf pattern."
- *Repair*: dz² has a dumbbell along the z-axis with a torus (donut) in the xy-plane — two lobes plus a ring. Show an explicit diagram. All 5 d orbitals have 2 angular nodes, consistent with l = 2, but the shape is divided differently.

**MC-2 — The radial node count is n − 1** (Type 5, instruction-induced)
- *Mechanism*: students learn "total nodes = n − 1" and apply it to radial nodes specifically, ignoring the angular component.
- *Diagnostic probe*: "How many radial nodes does a 3p orbital have? How many angular nodes?"
- *Characteristic phrase*: "3p has n − 1 = 2 radial nodes."
- *Repair*: total nodes = n − 1, but radial nodes = n − l − 1 and angular nodes = l. For 3p: radial = 3 − 1 − 1 = 1, angular = 1, total = 2. Emphasise the split: start with angular (= l), then get radial by subtraction.

**MC-3 — All orbitals with the same n are degenerate in multielectron atoms** (Type 1, overgeneralization from hydrogen)
- *Mechanism*: hydrogen's famous n-degeneracy is taught first; students generalise it universally.
- *Diagnostic probe*: "Is the 2s orbital at higher, lower, or the same energy as the 2p orbital in a carbon atom?"
- *Characteristic phrase*: "In any atom, 2s and 2p are at the same energy because they have the same n."
- *Repair*: shielding and penetration break n-degeneracy in multielectron atoms. 2s electrons penetrate closer to the nucleus (their radial probability distribution has a small inner lobe) → they feel a higher Z_eff → lower energy than 2p. So 2s < 2p < 2d (if 2d existed) in multielectron atoms.

## Analogies

**The standing wave in a box analogy**: quantum numbers n and l specify the pattern of a standing electromagnetic wave in a 3D box. Nodes are silent spots; higher quantum numbers mean higher frequency (higher energy) and more nodes, exactly as in a sound wave with harmonics.

**The street address analogy extended**: quantum numbers are the orbital's address — n is the city, l is the neighbourhood, ml is the specific house. The shape of the house (orbital) depends on the neighbourhood (l), not the city (n).

## Demonstrations

**Demonstration 1 — Orbital shape models**
- Show physical 3D orbital models or high-quality diagrams for 1s, 2s, 2p, 3d (all 5), 4f. Ask students to count lobes and nodal surfaces before explaining. The dz² model invariably surprises those who only saw clover-leaf d orbitals.

## Discovery Questions

1. "How many radial and angular nodes does a 4f orbital have? What is the total number of nodes?" (Targets: l = 3 → angular nodes = 3; radial nodes = 4 − 3 − 1 = 0; total = 3. A 4f orbital has no radial nodes — all three nodes are angular. This surprises students who expect more nodes at n = 4.)
2. "Why is the 2s orbital lower in energy than the 2p orbital in a multielectron atom, even though both have n = 2?" (Targets: radial distribution of 2s has a small inner lobe near the nucleus — it penetrates through the 1s shielding cloud — while 2p has its node at the nucleus. Greater penetration → higher Z_eff → lower energy for 2s.)
3. "An electron is in an orbital with 2 radial nodes and 1 angular node. What are the values of n and l?" (Targets: angular nodes = l = 1 (p orbital); radial nodes = n − l − 1 = 2 → n = l + 1 + 2 = 4. This is a 4p orbital.)

## Teaching Sequence

1. Review from chem.atomic.quantum-numbers: n, l, ml — restate that l determines shape.
2. Show s orbital shapes (1s through 3s): introduce radial nodes via 2s and 3s. Teach the formula: radial nodes = n − l − 1.
3. Show p orbitals (three orientations). Count angular nodes = 1. Teach angular nodes = l.
4. Show d orbitals (all 5, emphasise dz²). Count angular nodes = 2. Address MC-1.
5. Generalise: total nodes = n − 1 = radial + angular. Work Discovery Question 3.
6. Orbital energy: hydrogen (degenerate in n only) vs. multielectron (split by l). Penetration argument. Address MC-3.
7. Work Discovery Questions 1 and 2.

## Tutor Actions

- If student says all d orbitals are clover-leaf → MC-1 repair: show dz² explicitly; count its angular nodes.
- If student says radial nodes = n − 1 → MC-2 repair: radial = n − l − 1, angular = l; total = n − 1. Work 3p as the corrective example.
- If student says 2s = 2p in energy in carbon → MC-3 repair: penetration argument; 2s lower in multielectron atoms.
- Advance when student can state node counts (radial, angular, total) for any given n/l combination and explain multielectron energy splitting.

## Voice Teaching Notes

Node counting is the central arithmetic skill. Before every question: "What is n? What is l? Angular nodes = l. Radial nodes = n − l − 1. Total = n − 1." Drill this three-step sequence until it is automatic.

For orbital shapes, use visual language: "The s orbital is a ball. Each p is a dumbbell. Four of the d orbitals are like two butterflies at right angles. The fifth d — dz² — is like a dumbbell wearing a donut." The donut image fixes dz² in memory.

## Assessment Signals

**Mastery gate**:
1. Student correctly calculates radial, angular, and total nodes for any given orbital (including 4f with 0 radial nodes).
2. Student can describe the shape of each subshell type (s, p, d, f) including dz².
3. Student correctly states that in multielectron atoms, within the same n, s < p < d < f in energy, and explains why (penetration/shielding).
4. Student correctly identifies an orbital given its node counts.

**FRAGILE signal**: student can state the node formulas but cannot explain why 2s penetrates more than 2p (structural understanding absent).

**MISCONCEIVING signal**: student says all five d orbitals have 4 lobes. Address MC-1 before any orbital energy discussion.

## Tutor Recovery Strategy

If stuck:
1. For node counts: "How many quantum numbers define the orbital? Which one determines shape? That one equals angular nodes. Radial nodes = n − l − 1. Total = both added." Write the formula triangle before doing any example.
2. For dz²: "Look at the diagram. Is there a donut? That is the xy-plane angular node. Is there a straight dumbbell? That's the other angular node — a cone at 54.7° from z." Show and trace, don't just describe.
3. For energy in multielectron: "Where does the 2s radial distribution function peak? Does it have a small bump near the nucleus? Does 2p? The one with the inner bump sees more of the nucleus. More nucleus = lower energy."

## Memory Hooks

- **Radial nodes = n − l − 1. Angular nodes = l. Total = n − 1.**
- **s: sphere. p: dumbbell. d: clover or dumbbell-with-donut. f: complex.**
- **Multielectron: same n, energy goes s < p < d < f (penetration order).**
- **4f has 0 radial nodes — all 3 nodes are angular. (Surprises students; use it.)**

## Transfer Connections

- **chem.atomic.electronic-config**: orbital shapes and energies determine the Aufbau filling order; the 4s/3d energy crossover explains why transition metals lose 4s electrons before 3d.
- **chem.bond.mo-theory**: molecular orbitals are formed by combining (overlapping) atomic orbital wavefunctions; the shape and symmetry of the atomic orbitals determine which combinations are bonding vs. antibonding.

## Cross-Subject Connections

- **Physics (phys.qm.hydrogen-atom-qm)**: the hydrogen atom's Schrödinger equation gives the exact radial and angular parts of ψ — the s/p/d/f orbitals are the angular eigenfunctions (spherical harmonics) of that equation.
- **Mathematics (spherical harmonics)**: the angular part of each atomic orbital is a spherical harmonic Y_l^m — the nodal patterns are the zeros of these functions.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.atomic.orbitals`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.atomic.orbitals` as of 2026-07-23.

## Curriculum Feedback

This concept is a high-unlock node (4 unlocks: electronic-config, quantum-mech-model, mo-theory, coord.cft), making it a structural hub for the upper atomic/bonding curriculum. The proficient/understand combination is appropriate — understanding orbital shapes is largely conceptual/visual, while the node counting adds analytical practice. The teaching-sequence step that explicitly shows all 5 d orbitals and dz² is non-negotiable; textbooks that skip dz² are the direct cause of MC-1.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

# Quantum Numbers — `chem.atomic.quantum-numbers`

## Identity

- **KG ID**: chem.atomic.quantum-numbers
- **Subject**: Chemistry
- **Domain**: Atomic Structure (chem.atomic)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.atomic.bohr-model
- **Unlocks**: chem.atomic.orbitals
- **Cross-links**: none

## Learning Objective

Students can state the four quantum numbers (n, l, mₗ, mₛ); give their allowed values and physical significance; apply the rules to identify valid and invalid quantum-number sets; and explain how the quantum numbers determine the size, shape, and orientation of orbitals and the spin state of an electron.

## Core Understanding

**Principal quantum number (n)**: positive integers 1, 2, 3, … Determines the energy level (shell) and the average distance of the electron from the nucleus. Higher n → larger, higher-energy orbital.

**Azimuthal (angular momentum) quantum number (l)**: integers 0 to n−1 for a given n. Determines the shape of the orbital (subshell letter: l = 0 → s; l = 1 → p; l = 2 → d; l = 3 → f). Also governs the magnitude of the electron's orbital angular momentum: L = √[l(l+1)]ℏ.

**Magnetic quantum number (mₗ)**: integers from −l to +l (2l+1 values total). Determines the orientation of the orbital in space relative to an external magnetic field. For l = 1: mₗ = −1, 0, +1 → three p orbitals (p_x, p_y, p_z).

**Spin quantum number (mₛ)**: +½ or −½ only. Describes the intrinsic spin angular momentum of the electron (an inherently quantum property without a classical analogue). Two electrons in the same orbital must have opposite spins (Pauli exclusion principle).

**Pauli exclusion principle**: no two electrons in the same atom can have the same set of all four quantum numbers. This limits each orbital to exactly two electrons (one with mₛ = +½, one with mₛ = −½).

**Number of orbitals in a shell**: n² orbitals per principal shell (sum of 2l+1 for l = 0 to n−1). Each orbital holds 2 electrons → 2n² electrons per shell.

**Summary table (n = 1 to 3)**:

| n | l values | subshells | orbitals per shell | electrons per shell |
|---|---|---|---|---|
| 1 | 0 | 1s | 1 | 2 |
| 2 | 0, 1 | 2s, 2p | 4 | 8 |
| 3 | 0, 1, 2 | 3s, 3p, 3d | 9 | 18 |

## Mental Models

**The address model**: a quantum number set is like a mailing address. n = building (shell), l = floor (subshell), mₗ = apartment number (orbital orientation), mₛ = bunk (top or bottom). No two electrons share the same full address.

**The hierarchy of constraints**: n sets the range of l; l sets the range of mₗ. Changing n first opens up new subshells (new l values), which in turn open up new orbital orientations (new mₗ values). The numbers are nested, not independent.

## Why Students Fail

1. **l goes from 1 to n (not 0 to n−1)**: students start l at 1, missing the s-orbital (l = 0) and incorrectly counting subshells.
2. **mₗ confusion about zero**: students omit mₗ = 0 from the allowed set, thinking "zero means nothing." mₗ = 0 is a valid, real orientation (the pz orbital, for example).
3. **mₛ is the spin state of the electron, not the orbital**: students assign mₛ to an orbital and think an orbital has mₛ = +½ or −½. mₛ belongs to the electron, not the orbital; an orbital can hold two electrons, one of each spin.
4. **Pauli as "no same quantum number"**: students think the Pauli principle means no two electrons share even one quantum number, rather than that no two electrons share all four simultaneously.

## Misconceptions

**MC-1 — l starts at 1** (Type 5, instruction-induced)
- *Mechanism*: the letter–value correspondence (s, p, d, f) is introduced in alphabetical order without emphasising that l = 0 corresponds to s.
- *Diagnostic probe*: "For n = 3, list all allowed values of l."
- *Characteristic phrase*: "l = 1, 2, 3 because n = 3."
- *Repair*: l runs from 0 to n−1 inclusive. For n = 3: l = 0, 1, 2 (s, p, d). Write the table: n = 1 → l = 0 only (one subshell); n = 2 → l = 0, 1 (two subshells). The s orbital always exists because l = 0 is always valid.

**MC-2 — A specific mₗ value means a specific orbital in space, regardless of molecule** (Type 2, perceptual intuition)
- *Mechanism*: students picture p_x as always aligned with the x-axis in the laboratory frame.
- *Diagnostic probe*: "If mₗ = +1 for a p orbital, which direction in space does it point?"
- *Characteristic phrase*: "mₗ = +1 is the x-direction."
- *Repair*: the assignment of mₗ = +1, 0, −1 to p_x, p_z, p_y is a choice of complex/real combination of basis functions — the physical orbitals p_x and p_y are linear combinations of mₗ = +1 and mₗ = −1. mₗ specifies the component of angular momentum along the z-axis of quantization (the direction of an applied field), not a fixed laboratory direction.

**MC-3 — mₛ is a property of the orbital** (Type 5, instruction-induced)
- *Mechanism*: students learn "each orbital holds 2 electrons, one spin-up and one spin-down" and invert it to think the orbital has spin.
- *Diagnostic probe*: "Can we say that the 1s orbital has mₛ = +½?"
- *Characteristic phrase*: "The 1s orbital is spin-up and the 1s orbital filled is spin-down, so the orbital has mₛ = +½ first."
- *Repair*: mₛ is a property of the electron, not the orbital. The 1s orbital itself has no spin. The first electron placed in the 1s orbital can be arbitrarily labelled +½; the second must be −½. Orbitals are spatial probability distributions; spin is an intrinsic electron property.

## Analogies

**The seat-in-a-theatre analogy**: n = theatre, l = section (orchestra, mezzanine, balcony), mₗ = seat row within section, mₛ = left or right armrest. No two people share the same theatre + section + row + armrest.

**The nested doll (Matryoshka) analogy**: the four numbers are nested: n contains l, l contains mₗ, mₗ contains mₛ. Opening a doll (increasing n) reveals new dolls inside (new l values), which in turn contain new smaller dolls (new mₗ values), each with exactly two slots (mₛ = ±½).

## Demonstrations

**Demonstration 1 — Drawing the allowed-set table**
- For each n from 1 to 4: list all (n, l, mₗ, mₛ) combinations. Count totals and verify 2n² rule. Students discover the pattern rather than memorise it; connecting the count to the table builds structural understanding over rote recall.

## Discovery Questions

1. "An electron has quantum numbers n = 3, l = 1, mₗ = 0, mₛ = −½. Identify the subshell it occupies and state whether this is a valid set." (Targets: 3p subshell; valid — l = 1 is allowed for n = 3; mₗ = 0 is in [−1, 0, +1]; mₛ = −½ is valid.)
2. "How many orbitals are in the n = 4 shell? How many electrons can it hold?" (Targets: n² = 16 orbitals; 2n² = 32 electrons. Subshells: 4s (1 orbital), 4p (3), 4d (5), 4f (7) → total 16.)
3. "Is the set n = 2, l = 2, mₗ = 0, mₛ = +½ valid? If not, why?" (Targets: invalid — l must be 0 to n−1 = 0 to 1 for n = 2; l = 2 is not allowed when n = 2.)

## Teaching Sequence

1. Review from chem.atomic.bohr-model: Bohr's n; why Bohr failed for multi-electron atoms → need a richer description.
2. Introduce n: same physical meaning as Bohr's n (shell, energy, distance). Discovery Question 2 as motivation.
3. Introduce l: subshell letter–number correspondence (0=s, 1=p, 2=d, 3=f). Allowed range 0 to n−1. Address MC-1 immediately.
4. Introduce mₗ: orientation. Allowed range −l to +l. Show that for l = 1 this gives 3 p-orientations. Address MC-2 (mₗ ≠ fixed laboratory direction).
5. Introduce mₛ: intrinsic electron spin, +½ or −½. State the Pauli exclusion principle. Address MC-3 (mₛ is the electron's, not the orbital's).
6. Work Discovery Question 1 (valid set identification) then Discovery Question 3 (invalid set).
7. Demonstrate 1 (full allowed-set table for n = 1–4; verify 2n² count).

## Tutor Actions

- If student gives l = 1, 2, … for l values → MC-1 repair: l starts at 0; l = 0 is the s subshell.
- If student assigns mₗ to a fixed Cartesian direction → MC-2 repair: mₗ is the z-component of angular momentum relative to the quantisation axis, not a fixed lab direction.
- If student assigns mₛ to an orbital → MC-3 repair: mₛ belongs to the electron; an orbital is a region of space, not a spinning object.
- Advance when student correctly identifies valid/invalid (n, l, mₗ, mₛ) sets for arbitrary n and states the physical significance of each quantum number.

## Voice Teaching Notes

The most common spoken error is "l goes from one to n." Say out loud at the start of every problem: "l runs from zero — not one — to n minus one." The zero is the sticking point; say it explicitly every time until it is automatic.

For spin: say "spin is a property of the electron, not the orbital" verbatim when students first confuse them. The orbital is a place; the electron (which can be spin-up or spin-down) lives there.

## Assessment Signals

**Mastery gate**:
1. Student lists all valid (n, l, mₗ, mₛ) sets for n = 1 and n = 2 without prompting.
2. Student correctly identifies an invalid (n, l, mₗ, mₛ) set and gives the exact violated rule.
3. Student correctly counts the number of orbitals and maximum electrons for a given n.
4. Student correctly states the physical significance of each of the four quantum numbers (energy/size; shape; orientation; spin).

**FRAGILE signal**: student completes valid-set identification correctly but cannot explain why l runs from 0 to n−1 (rote rule application without structural understanding).

**MISCONCEIVING signal**: student writes l = 1 as the minimum value. Address MC-1 before any further quantum-number work.

## Tutor Recovery Strategy

If stuck:
1. For l range: return to n = 1. "For n = 1, what subshells exist?" → only s (l = 0). "Could l = 1 (a p orbital) exist in n = 1?" → no, p orbitals first appear at n = 2. Build up: n = 1 → {0}; n = 2 → {0, 1}; n = 3 → {0, 1, 2}. The pattern is 0 to n−1.
2. For mₗ count: "l = 2 means a d subshell. How many d orbitals are there? Five. Where do they come from?" → mₗ = −2, −1, 0, +1, +2 → five values → five orbitals. Count = 2l+1.
3. For Pauli principle: use the seat-in-a-theatre analogy. "Two people at the same seat (same n, l, mₗ) — can they still have different mₛ?" → yes, one on each armrest. "So the four numbers together must differ." → Pauli.

## Memory Hooks

- **n: 1, 2, 3, … → shell; l: 0 to n−1 → subshell (0=s, 1=p, 2=d, 3=f); mₗ: −l to +l; mₛ: +½ or −½.**
- **2n² electrons per shell.**
- **l starts at ZERO. The s subshell always exists.**
- **Pauli: no two electrons share all four quantum numbers.**

## Transfer Connections

- **chem.atomic.orbitals**: quantum numbers directly determine orbital shapes and orientations — n and l define which orbital type, mₗ specifies orientation; orbital diagrams (chem.atomic.orbitals) are the visual realisation of each (n, l, mₗ) combination.
- **chem.atomic.electronic-config**: the Aufbau principle assigns electrons to orbitals in energy order; the Pauli exclusion principle (from this node) limits 2 electrons per orbital; Hund's rule controls mₗ and mₛ assignments within a subshell.

## Cross-Subject Connections

- **Physics (phys.qm.wave-function)**: quantum numbers are eigenvalues of the hydrogen-atom Hamiltonian; n comes from the radial equation, l and mₗ from the angular part (spherical harmonics Yₗ^mₗ), mₛ from the Pauli spinor. The chemistry course treats quantum numbers as given; the physics course derives them.
- **Mathematics (spherical harmonics)**: the angular functions Yₗ^mₗ(θ, φ) are the mathematical basis for both l and mₗ; their squared moduli give the angular probability distributions of orbital shapes.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.atomic.quantum-numbers`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.atomic.quantum-numbers` as of 2026-07-23.

## Curriculum Feedback

The proficient/understand combination is appropriate — quantum numbers are conceptually subtle (especially the distinction between mₗ and spin), though the required computation is limited to listing valid sets and counting orbitals. The 4-hour estimate is on the high end for an understand-level node but defensible given the conceptual density (four new symbols, four physical interpretations, the Pauli principle, and the orbital-count rules).

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

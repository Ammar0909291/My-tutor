# Electronic Configuration — `chem.atomic.electronic-config`

## Identity

- **KG ID**: chem.atomic.electronic-config
- **Subject**: Chemistry
- **Domain**: Atomic Structure (chem.atomic)
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.atomic.orbitals
- **Unlocks**: chem.dblock.general, chem.period.modern-periodic-law
- **Cross-links**: none

## Learning Objective

Students can write ground-state electron configurations using the Aufbau principle, Pauli exclusion principle, and Hund's rule; use spdf notation and orbital-box diagrams; identify the anomalous configurations of Cr and Cu and explain them; and read configurations from periodic table position.

## Core Understanding

**Three rules for filling orbitals**:

1. **Aufbau principle** ("building up"): electrons fill orbitals in order of increasing energy. The filling order follows the diagonal (n + l) rule:
   1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p → 6s → 4f → 5d → 6p → ...
   Memory aid: the diagonal arrow mnemonic sweeps across the periodic table by (n + l) value.

2. **Pauli exclusion principle**: no two electrons in an atom may have identical sets of all four quantum numbers. Consequence: each orbital holds at most 2 electrons, which must have opposite spins (↑↓).

3. **Hund's rule**: within a subshell of equal-energy orbitals, electrons occupy orbitals singly before pairing, and all singly occupied orbitals have parallel spins (same ms). This minimises electron–electron repulsion.

**Writing configurations**:
- *spdf notation*: e.g., Na: 1s² 2s² 2p⁶ 3s¹ (total = 11 electrons)
- *Noble gas shorthand*: Na: [Ne] 3s¹ (abbreviates the noble gas core)
- *Orbital box diagram*: draw one box per orbital, arrows for electrons (↑ or ↓)

**Common configuration examples**:
- C (Z = 6): 1s² 2s² 2p²  → Hund's rule: two 2p electrons in separate orbitals, parallel spins
- Fe (Z = 26): [Ar] 3d⁶ 4s² → 3d has 4 paired + 2 unpaired electrons (Hund's rule)
- Cl⁻ (Z = 17+1e): [Ar] → same configuration as Ar

**4s before 3d, but ionised in reverse**:
In multielectron atoms, 4s is filled before 3d (Aufbau). However, after the 3d fills, 3d electrons have lower energy than 4s. When a d-block atom is ionised, it LOSES 4s electrons first:
Fe²⁺: [Ar] 3d⁶ (not [Ar] 3d⁴ 4s²)

**Anomalous configurations of Cr and Cu**:
- Cr (Z = 24): expected [Ar] 3d⁴ 4s²; actual [Ar] 3d⁵ 4s¹ (half-filled d subshell is extra stable)
- Cu (Z = 29): expected [Ar] 3d⁹ 4s²; actual [Ar] 3d¹⁰ 4s¹ (fully filled d subshell is extra stable)
Similar anomalies occur in Mo (like Cr) and Ag/Au (like Cu). The physical reason: exchange energy — electrons with the same spin in different orbitals have lower repulsion energy; half-filled and fully-filled subshells maximise exchange energy.

## Mental Models

**The hotel room model (Aufbau + Hund)**: electrons are guests filling a hotel. Each room (orbital) has 2 beds. Guests prefer their own room (Hund) before sharing. Guests sharing a room must sleep head-to-toe (opposite spins, Pauli). Lower floors (lower energy) fill first (Aufbau). The 4s floor happens to be below 3d during construction (filling), but 3d rooms are structurally sturdier (lower in energy) once the hotel is built.

**The stability plateau model for Cr/Cu**: energy as a function of d-electron count has local minima (extra stability) at d⁵ and d¹⁰ — half-filled and fully-filled d subshells. Promoting one 4s electron to 3d to reach these plateaus costs less energy than the exchange-energy gain provides.

## Why Students Fail

1. **Ionisation removes d electrons, not s electrons**: the most-tested confusing fact. Students use the Aufbau order to predict ionisation and write Fe²⁺ as [Ar] 3d⁴ 4s² instead of [Ar] 3d⁶.
2. **Hund's rule applied to different subshells**: Hund's rule applies ONLY within a subshell (same n and l). It doesn't mean one electron per subshell across the whole atom.
3. **Cr and Cu anomalies are just exceptions to memorise**: students memorise the anomalies without understanding the stability argument. When asked about Mo or Ag, they say "I didn't memorise those."
4. **Writing the configuration in incorrect Aufbau order**: students write 3d before 4s in the shorthand (e.g., [Ar] 3d⁶ 4s² → listed as 3d first) vs. the ground-state energy order (4s fills first). Both orderings are used in textbooks; clarify which is expected.

## Misconceptions

**MC-1 — d-block cations retain 4s electrons and lose d electrons** (Type 5, instruction-induced from Aufbau)
- *Mechanism*: Aufbau teaches "fill 4s before 3d"; students reverse this for ionisation → they lose d electrons instead of s.
- *Diagnostic probe*: "Write the electron configuration of Fe²⁺. Explain which electrons are removed first."
- *Characteristic phrase*: "Fe²⁺ is [Ar] 3d⁴ 4s² because we remove the 3d electrons which are highest in energy according to the Aufbau order."
- *Repair*: Aufbau gives the FILLING order for neutral atoms. Once filled, the energy ordering changes — 3d is now LOWER than 4s. Ionisation removes electrons from the highest-energy orbital present in the ion, which is 4s. Fe → Fe²⁺ by removing both 4s electrons → [Ar] 3d⁶. To verify: this is supported by experimental ionisation energies and magnetic properties of Fe²⁺.

**MC-2 — Hund's rule means one electron per orbital across all subshells** (Type 1, overgeneralization)
- *Mechanism*: "maximise unpaired electrons" is applied globally rather than within the degenerate set.
- *Diagnostic probe*: "Draw the orbital box diagram for nitrogen (Z = 7). Is there an electron in the 2s orbital and three separate electrons in 2p, or are some paired?"
- *Characteristic phrase*: "Hund's rule means each electron goes in its own orbital, so N has seven separate boxes each with one electron."
- *Repair*: Hund's rule applies only within the degenerate set (equal-energy orbitals). The three 2p orbitals of nitrogen are degenerate → one electron per 2p orbital (correct). But 2s is lower energy and holds 2 paired electrons before 2p is occupied at all. N: 1s² 2s² 2p³ (three unpaired 2p electrons, not seven separate electrons).

**MC-3 — Cr/Cu anomalies occur because half-filled/full subshells are "more stable" (memorised, no reason)** (Type 5, instruction-induced)
- *Mechanism*: students memorise "half-filled d = stable" without the exchange-energy argument; they cannot generalise.
- *Diagnostic probe*: "Molybdenum (Z = 42) is directly below Cr in the periodic table. Predict its actual configuration."
- *Characteristic phrase*: "I only memorised Cr and Cu as exceptions. I can't predict Mo."
- *Repair*: the rule generalises: any d-block element where [noble gas] d^n-1 s² → d^n-1 s¹ promotes to d^(n-1+1) = d^n (half-fill, d⁵) or d^10 gains exchange energy. Mo: expected [Kr] 4d⁴ 5s²; actual [Kr] 4d⁵ 5s¹ (same pattern as Cr). Students who understand the exchange-energy argument can predict all analogous cases.

## Analogies

**The bus-seat model for Hund's rule**: on a bus, people sit one per seat (one electron per orbital) before anyone doubles up. On a long bus (many degenerate orbitals), every seat fills once before the first pair shares. But between floors (between different energy subshells), this rule doesn't apply — the ground floor fills to capacity before the second floor opens.

**The half-time plateau analogy for Cr/Cu**: imagine running uphill. The hill has two rest platforms — one at the halfway point (d⁵) and one at the top (d¹⁰). If you are almost at a platform (d⁴ or d⁹), it is energetically worth the extra push to reach the platform rather than stopping just below it. Promoting one s electron covers the last step.

## Demonstrations

**Demonstration 1 — Magnetic properties demonstrating unpaired electrons**
- Show that liquid oxygen (two unpaired electrons, O₂) is attracted to a magnet (paramagnetism). Connect this to Hund's rule: parallel spins → magnetic moment → paramagnetism. Students see the physical consequence of electron configuration.

## Discovery Questions

1. "Write the full spdf configuration and the orbital box diagram for iron (Z = 26). How many unpaired electrons does Fe have?" (Targets: [Ar] 3d⁶ 4s². 3d has 6 electrons in 5 orbitals: 3 orbitals doubly filled + 2 singly filled by Hund's rule? No — 5 orbitals in 3d; 6 electrons: by Hund's rule, first 5 go in singly (↑) then the 6th pairs in the first orbital: ↑↓ ↑ ↑ ↑ ↑. So 4 unpaired electrons. Fe is paramagnetic with 4 unpaired electrons.)
2. "Write the electron configuration of Cu²⁺ (Z = 29, lose 2 electrons). Start from the actual ground state of neutral Cu." (Targets: neutral Cu: [Ar] 3d¹⁰ 4s¹ (anomalous). Lose 2 electrons: first remove the 4s¹ (1 electron), then one 3d electron: Cu²⁺: [Ar] 3d⁹.)
3. "Predict whether molybdenum (Z = 42) has the configuration [Kr] 4d⁴ 5s² or [Kr] 4d⁵ 5s¹ and justify." (Targets: [Kr] 4d⁵ 5s¹. Mo is directly below Cr; the same half-filled d⁵ stability argument applies. Promoting one 5s electron to complete the 4d half-shell gains exchange energy; this exceeds the cost of promotion. Mo behaves like Cr.)

## Teaching Sequence

1. Review from chem.atomic.orbitals: orbital energy ordering in multielectron atoms (s < p < d within same n; 4s < 3d during Aufbau). Explain the diagonal mnemonic.
2. State and apply the three rules. Use H through Ne as worked examples.
3. Practice with Na through Ar. Introduce noble gas shorthand.
4. Move to d-block (21–30). Work Fe orbital box. Address MC-2 (Hund within subshell).
5. Ionisation: 4s removed first. Work Fe²⁺. Address MC-1.
6. Anomalies: Cr, Cu. Explain half-filled/full stability via exchange energy. Work Discovery Question 3 (Mo generalisation). Address MC-3.
7. Work all three Discovery Questions in sequence.

## Tutor Actions

- If student writes Fe²⁺ as [Ar] 3d⁴ 4s² → MC-1 repair: Aufbau gives filling order; ionisation removes from highest energy → 4s first.
- If student applies Hund's rule across all subshells → MC-2 repair: Hund applies only within degenerate set (same subshell).
- If student can only name Cr/Cu as anomalies but not predict Mo → MC-3 repair: generalise the exchange-energy argument; apply to Mo.
- Advance when student can write any configuration (including Cr, Cu, and a d-block cation) correctly and in orbital-box form.

## Voice Teaching Notes

"Aufbau fills 4s before 3d. But once you're done filling and you want to remove an electron, you take from 4s first." Repeat this contrast every time ionisation of a transition metal appears. The distinction between "filling order" and "removal order" is the single most tested confusion in electronic configuration.

For Cr/Cu: "Expected, then actual, then reason." Make the student say the expected configuration, then the actual one, then explain the exchange energy gain — three steps, every time, until automatic.

## Assessment Signals

**Mastery gate**:
1. Student correctly writes the spdf configuration and orbital-box diagram for any Z ≤ 36 element.
2. Student correctly writes configurations for d-block cations (removes 4s first).
3. Student correctly states and explains the configurations of Cr and Cu.
4. Student can predict Mo's anomalous configuration by applying the exchange-energy argument.

**FRAGILE signal**: student writes all configurations correctly but states that Cr/Cu are "just exceptions" with no reason — no generalisation, no transfer to Mo.

**MISCONCEIVING signal**: student removes d electrons for d-block cation. Address MC-1 before moving to anomalies.

## Tutor Recovery Strategy

If stuck:
1. For ionisation order: "After filling, which subshell is HIGHER in energy in the Fe atom — 4s or 3d? (Answer: 4s — it becomes higher after 3d fills.) When you ionise, you remove from the highest energy. So 4s goes first." This reframes the question from filling (Aufbau) to removal (energy).
2. For Hund's rule scope: "Is 2s degenerate with 2p? No — 2s is lower. So Hund's rule does not compare 2s with 2p; it only compares the three equal-energy 2p orbitals. Fill 2s fully first, then start 2p."
3. For Cr/Cu explanation: "Cr is at d⁴ — just one step from d⁵. How much does it cost to promote one 4s electron? About 1 eV. How much exchange energy does d⁵ (fully unpaired) give? About 2 eV. Net gain: worth it. Same logic for d⁹ → d¹⁰."

## Memory Hooks

- **Aufbau: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p. Diagonal mnemonic.**
- **Pauli: max 2 electrons per orbital, opposite spins (↑↓).**
- **Hund: 1 electron per degenerate orbital first, all parallel spins; fill across before doubling up.**
- **Ionisation: ALWAYS remove 4s before 3d for d-block elements.**
- **Anomalies: Cr = [Ar]3d⁵4s¹; Cu = [Ar]3d¹⁰4s¹. Half-filled/full d = extra stable. Generalises to Mo, Ag, Au.**

## Transfer Connections

- **chem.dblock.general**: electronic configurations of d-block elements (this node) are the foundation for understanding transition-metal chemistry — variable oxidation states, colour, magnetism, and coordination chemistry all depend on d-electron count.
- **chem.period.modern-periodic-law**: the periodic table's block structure (s, p, d, f blocks) directly reflects the orbital filling order; periodic trends in ionisation energy, atomic radius, and electronegativity are rationalised from electronic configurations.

## Cross-Subject Connections

- **Physics (magnetism)**: paramagnetism (unpaired electrons) vs. diamagnetism (all paired) is determined by the electronic configuration — directly computed from Hund's rule; the magnetic moment μ = √(n(n+2)) Bohr magnetons where n = number of unpaired electrons.
- **Materials science**: the magnetic properties of iron (ferromagnetism), nickel, and cobalt follow from their electronic configurations and are the basis of modern magnetic materials.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.atomic.electronic-config`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.atomic.electronic-config` as of 2026-07-23.

## Curriculum Feedback

The 0.80 mastery threshold is appropriately high — this is a skills node (write any configuration correctly) rather than a conceptual one, and the skill must be reliable. The anomalous configurations of Cr and Cu are universally tested; the exchange-energy explanation is often omitted from textbooks at this level, but providing it (even qualitatively) converts a memorised exception into a transferable pattern — far more durable.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0

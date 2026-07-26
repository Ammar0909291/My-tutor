# chem.atomic.quantum-numbers — Quantum Numbers

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.atomic.quantum-numbers` |
| Domain | Atomic Structure |
| Requires | `chem.atomic.bohr-model` |
| Unlocks | `chem.atomic.orbitals` |
| Difficulty | proficient |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

Four quantum numbers fully specify an electron's state in an atom: principal (n, shell/energy/size, values 1,2,3...), azimuthal (l, subshell/shape, values 0 to n−1, labeled s/p/d/f), magnetic (mₗ, orbital orientation, values −l to +l), and spin (mₛ, intrinsic electron spin, ±½) — with the Pauli exclusion principle requiring every electron in an atom to have a unique (n, l, mₗ, mₛ) combination, and the total orbital count per shell (n²) and electron capacity (2n²) following directly from counting valid combinations.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: A seating chart for a large theatre — n as the theatre, l as the section, mₗ as the row within a section, mₛ as the left/right armrest — no two people share the exact same seat.

**Representational**: A full table of allowed (n, l, mₗ, mₛ) combinations for n=1 through n=4, built up subshell by subshell.

**Abstract**: The nesting rule — l runs 0 to n−1, mₗ runs −l to +l, mₛ is always ±½ — and the resulting 2n² total electron capacity per shell.

**Transfer**: Determining, for an arbitrary (n, l, mₗ, mₛ) set, whether it's valid or invalid, and correctly identifying which specific rule (if any) it violates.

## 3. Why Beginners Fail

Students memorize the s/p/d/f letter sequence in the order it's taught without connecting it to l=0,1,2,3, causing them to assume l starts at 1 rather than 0; they picture a specific mₗ value as pointing in a fixed laboratory direction (e.g., mₗ=+1 always means "the x-axis") rather than as a quantization-axis-relative label; and they invert "each orbital holds two electrons, one spin-up and one spin-down" into believing the orbital itself has a spin property, rather than understanding spin belongs to the electron.

## 4. Misconception Library

### MC-1: l starts at 1
- **Probe**: "For n = 3, list all allowed values of l."
- **Characteristic phrase**: "l = 1, 2, 3 because n = 3."
- **Trigger (Type 5, instruction-induced)**: The letter-value correspondence (s, p, d, f) is introduced in alphabetical order without emphasizing that l=0 corresponds to s.
- **Conflict evidence [P28]**: For n=1, only the s subshell exists (l=0) — there is no n=1 p orbital; building the table n=1→{0}, n=2→{0,1}, n=3→{0,1,2} shows the pattern is 0 to n−1, not 1 to n.
- **Bridge [P30]**: The s orbital always exists for every shell because l=0 is always a valid value — if l started at 1, no shell would ever have an s orbital, contradicting the known existence of 1s, 2s, 3s, etc.
- **Replacement [P31]**: l runs from 0 to n−1 inclusive; for n=3, l=0,1,2 (s,p,d).
- **Discrimination pairs [P33]**: n=1 (only l=0 exists — no p, d, or f) vs. n=3 (l=0,1,2 all exist).
- **S6 repair path**: Build the table n=1→{0}, n=2→{0,1}, n=3→{0,1,2} incrementally and have the student state the pattern in words.

### MC-2: A specific mₗ value means a specific orbital in space, regardless of molecule
- **Probe**: "If mₗ = +1 for a p orbital, which direction in space does it point?"
- **Characteristic phrase**: "mₗ = +1 is the x-direction."
- **Trigger (Type 2, perceptual intuition)**: Students picture p_x as always aligned with the x-axis in the laboratory frame.
- **Conflict evidence [P28]**: The assignment of mₗ=+1,0,−1 to p_x, p_z, p_y is a choice of complex/real basis-function combination — the physical orbitals p_x and p_y are actually linear combinations of the mₗ=+1 and mₗ=−1 states, not each one individually.
- **Bridge [P30]**: mₗ specifies the component of angular momentum along the axis of quantization (e.g., the direction of an applied magnetic field), not a fixed laboratory Cartesian direction.
- **Replacement [P31]**: mₗ is a quantum label for angular momentum orientation relative to a chosen quantization axis; the familiar p_x/p_y/p_z shapes are specific real combinations built from the mₗ eigenstates.
- **Discrimination pairs [P33]**: mₗ as a fixed lab direction (wrong) vs. mₗ as a z-axis-relative angular momentum component (correct).
- **S6 repair path**: State explicitly that "which direction is x" depends entirely on how you've oriented your quantization axis, not on mₗ's numeric value alone.

### MC-3: mₛ is a property of the orbital
- **Probe**: "Can we say that the 1s orbital has mₛ = +½?"
- **Characteristic phrase**: "The 1s orbital is spin-up and the 1s orbital filled is spin-down, so the orbital has mₛ = +½ first."
- **Trigger (Type 5, instruction-induced)**: Students learn "each orbital holds 2 electrons, one spin-up and one spin-down" and invert it to think the orbital itself has spin.
- **Conflict evidence [P28]**: The 1s orbital is a spatial probability distribution with no spin value of its own; it can be empty, hold one electron (mₛ=+½ or −½, either is a valid label for the first electron), or hold two electrons (one +½, one −½, required by Pauli).
- **Bridge [P30]**: "The orbital holds a spin-up and a spin-down electron" describes what fills the orbital, not a property the orbital possesses independent of any electron in it.
- **Replacement [P31]**: mₛ belongs to the electron, not the orbital; orbitals are spatial regions, spin is an intrinsic property carried only by the electrons occupying them.
- **Discrimination pairs [P33]**: An empty 1s orbital (no mₛ value applies at all) vs. a singly-occupied 1s orbital (the one electron present has a definite mₛ).
- **S6 repair path**: Ask directly whether an *empty* orbital can have a spin value — the answer (no) breaks the orbital-has-spin framing immediately.

## 5. Explanation Library

**Primary explanation**: Four quantum numbers together uniquely specify each electron's state. n (principal) sets the shell — roughly, energy and size. l (azimuthal) sets the subshell shape within that shell, running from 0 to n−1 and labeled s, p, d, f for l=0,1,2,3. mₗ (magnetic) sets orientation within a subshell, running from −l to +l. mₛ (spin) is the electron's own intrinsic ±½ property, independent of n, l, and mₗ. The Pauli exclusion principle requires every electron in an atom to have a unique full (n, l, mₗ, mₛ) combination.

**Secondary explanation (counting framing)**: The total number of orbitals in shell n is n² (sum of 2l+1 across l=0 to n−1), and since each orbital holds up to 2 electrons (one of each mₛ), the shell's electron capacity is 2n².

## 6. Analogy Library

- **Primary analogy**: A theatre seating chart — n is the theatre, l is the section (orchestra/mezzanine/balcony), mₗ is the row within a section, mₛ is the left or right armrest; no two people can share theatre + section + row + armrest simultaneously.
- **Breaking point**: The theatre analogy is static and doesn't convey that mₗ's meaning depends on a chosen quantization axis (unlike a theatre's fixed rows) — it explains uniqueness/counting, not the physical orientation subtlety in MC-2.
- **Anti-analogy**: Do NOT say "each orbital has its own spin" — this directly reinforces MC-3.

## 7. Demonstration Library

- **Demonstration 1 (allowed-set table construction)**: For each n from 1 to 4, have students build the full list of allowed (n, l, mₗ, mₛ) combinations from the nesting rules alone, then count totals and verify the 2n² formula — students discover the pattern rather than memorize it.

## 8. Discovery Lesson

**Opening**: "How many orbitals do you think exist in the n=4 shell? Take a guess before we calculate."

**Exploration**: Students build the subshell breakdown for n=4 (4s: 1 orbital, 4p: 3, 4d: 5, 4f: 7) using the l=0 to n−1 and mₗ=−l to +l rules, summing to 16 orbitals and 32 electrons.

**Synthesis**: Guide toward: the total orbital count (n²) and electron capacity (2n²) emerge directly and predictably from the nesting structure of the four quantum numbers, not from a memorized formula.

**Closure**: "Is the set n=2, l=2, mₗ=0, mₛ=+½ valid? Use the rules you just built to check." (Reinforces MC-1's l-range rule.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Build the n=1 through n=4 allowed-combination table live with the student, subshell by subshell.
- **TA-2 (TELL)**: State the l=0 to n−1 rule explicitly and immediately connect it to why 1s exists but 1p does not.
- **TA-3 (DO)**: Student computes the orbital count and electron capacity for a given n using the nesting rules.
- **TA-4 (TEST-THINKING)**: Present MC-3's "the orbital has spin" claim and ask the student to argue against it using the empty-orbital case.

## 10. Voice Teaching

Say aloud, every time, at the start of any l-value problem: "l runs from zero — not one — to n minus one." The zero is the sticking point and needs explicit repetition until automatic. For spin, say verbatim on first confusion: "spin is a property of the electron, not the orbital — the orbital is a place; the electron, which can be spin-up or spin-down, lives there."

## 11. Assessment

**Mastery gate**: Student can (a) list all valid (n, l, mₗ, mₛ) sets for n=1 and n=2 without prompting, (b) identify an invalid set and name the exact violated rule, (c) count orbitals and max electrons for a given n, (d) state the physical significance of each of the four quantum numbers.

- **FA-1**: "For n=3, list all allowed values of l." — targets MC-1.
- **FA-2**: "If mₗ=+1 for a p orbital, which direction in space does it point?" — targets MC-2.
- **FA-3**: "Can we say the 1s orbital has mₛ=+½?" — targets MC-3.

**Confidence calibration**: Predict a rote-but-fragile pattern — students often complete valid-set identification correctly via memorized rules but cannot explain why l runs from 0 to n−1 when asked to justify it.

**Delayed retrieval**: Re-probe MC-1's l-range rule before `chem.atomic.orbitals` introduces orbital shapes tied to specific l values, since orbital-shape work assumes fluent l-value handling.

## 12. Recovery Notes

- **S3 (stuck)**: For l-range confusion, return to n=1: "For n=1, what subshells exist? Only s. Could l=1 (a p orbital) exist in n=1?" Build up n=1→{0}, n=2→{0,1}, n=3→{0,1,2}.
- **S4 (frustrated)**: Normalize — the alphabetical s/p/d/f ordering genuinely doesn't hint at the 0/1/2/3 numbering, so this trips up most students on first exposure.
- **S6 (collision)**: Use the empty-orbital question for MC-3; use the incremental n=1,2,3 table for MC-1.
- **S9 (post-repair check)**: Ask the student to state, unprompted, why the 1s orbital always exists for every atom.

## 13. Memory & Review

Tag as a rule-based procedural memory (nesting rules for n, l, mₗ, mₛ) plus a conceptual-correction memory (spin belongs to electrons, not orbitals). Schedule a spaced check at ~1 week and again before `chem.atomic.orbitals`.

## 14. Transfer Map

Feeds directly into `chem.atomic.orbitals` (orbital shapes are the spatial visualization of the l and mₗ values established here) and supports electron configuration work throughout the periodic-trends domain.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

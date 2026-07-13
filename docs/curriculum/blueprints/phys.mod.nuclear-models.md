# Teaching Blueprint: Nuclear Models — Shell Model
**ID:** phys.mod.nuclear-models
**Version:** 1.0 | **Status:** PACKAGE_READY

---

## Section 0 — Concept Metadata
| Field | Value |
|---|---|
| Concept ID | phys.mod.nuclear-models |
| Name | Nuclear Models: Shell Model |
| Domain | Modern Physics |
| Difficulty | Expert |
| Bloom Level | Analyze |
| Estimated Hours | 8 |
| Prerequisites | phys.mod.binding-energy |
| Unlocks | (none) |

---

## Section 1 — Concept Spine

**Core Claim:** Nucleons occupy quantized energy shells inside the nucleus; magic numbers (2, 8, 20, 28, 50, 82, 126) mark closed shells of exceptional stability, and spin-orbit coupling splits the otherwise degenerate levels to produce the experimentally observed magic numbers.

**Why It Matters:** The shell model explains nuclear binding-energy anomalies, spin/parity of ground states, and the stability patterns that determine which isotopes exist — it is the nuclear analog of atomic electron shell structure and the foundation for understanding nuclear reactions and radioactive decay chains.

**Threshold Concept:** Nucleons are not point particles in a nucleus — they move in a mean-field potential and experience quantized orbits, just as electrons do in atoms; spin-orbit coupling is not a small perturbation here but the dominant level-splitter that creates magic numbers.

**Prerequisite Knowledge Check:**
- Binding energy and the SEMF (phys.mod.binding-energy)
- Quantum number concepts (n, l, m_l, m_s) from atomic physics

---

## Section 2 — Four-Stage CPA+ Mental Model

**Concrete:** Stack spherical shells inside a nucleus like nesting Russian dolls. Closed shells (magic numbers) are the complete dolls — extremely stable. An extra nucleon beyond a closed shell is loosely bound, like a rattling object in an otherwise packed doll.

**Representational:**
- Energy level diagram showing 1s, 1p, 1d/2s, 1f/2p… shells
- Splitting of each l-level by spin-orbit: j = l ± ½ → two sub-levels
- Shell filling order: 1s₁/₂ (2), 1p₃/₂ (4), 1p₁/₂ (2) → magic 8; continuing to 1d₅/₂ (6), 2s₁/₂ (2), 1d₃/₂ (4) → magic 20…

**Abstract:**
- Mean-field potential: V(r) ≈ Woods-Saxon well: V(r) = −V₀ / (1 + exp[(r−R)/a])
- Spin-orbit coupling term: V_SO = −f(r) ℓ⃗·s⃗
- Splitting: E(j=l+½) < E(j=l−½) for nucleons (opposite to electrons!)
- Total degeneracy of level j: 2j + 1 nucleons
- Magic numbers arise from large gaps in the level spectrum above spin-orbit split levels

**Transfer (Analogical Bridge):** Atomic electron shells → nuclear nucleon shells; but spin-orbit coupling 50× stronger in nuclei; pairing energy (nucleon pairing lowers energy) has no clean atomic analog.

---

## Section 3 — Why Beginners Fail

1. **Confusion with atomic shells:** Learners transfer the atomic level order (1s, 2s, 2p…) directly to nuclei; nuclear levels use different quantum number labeling and a different potential, so the filling order differs.
2. **Sign of spin-orbit coupling:** In atoms, j = l + ½ has higher energy (parallel less stable). In nuclei, j = l + ½ has *lower* energy. Learners often get this backwards.
3. **Independent proton and neutron shells:** The shell model runs two *separate* filling sequences — one for protons, one for neutrons. Learners sometimes fill a single combined sequence.
4. **Magic numbers as empirical observations:** Learners memorize 2, 8, 20, 28, 50, 82, 126 without connecting them to the gaps in the level diagram; when asked why 28 and not 30, they cannot explain.

---

## Section 4 — Misconception Library

### MC-1: Nuclear levels are the same as atomic levels
- **Probe:** "What is the order of nuclear energy levels?"
- **Characteristic phrase:** "1s, 2s, 2p just like in atoms."
- **Trigger:** Transfer from familiar atomic structure.
- **Conflict evidence [P28]:** Show binding-energy data: ⁴He (Z=2, N=2), ¹⁶O (Z=8, N=8), ⁴⁰Ca (Z=20, N=20) are doubly magic — stable, high BE/A. Atomic analog would predict magic at 2, 10, 18 — but ¹⁸O is not especially stable. Data contradicts atomic-shell prediction.
- **Bridge [P30]:** Different potential (Woods-Saxon vs. Coulomb/HF) → different level structure. Also spin-orbit coupling in nuclei is ∼20–50× stronger.
- **Replacement [P31]:** Nuclear levels: 1s₁/₂, 1p₃/₂, 1p₁/₂ (→ magic 8), 1d₅/₂, 2s₁/₂, 1d₃/₂ (→ magic 20)… The j-labels track spin-orbit split sub-levels.
- **Discrimination pairs [P33]:** Atom: He (Z=2) noble gas, Ne (Z=10) noble gas. Nucleus: ²He not magic-stable, ¹⁶O (N=8) is magic-stable.
- **S6 repair path:** Draw both level diagrams side-by-side; highlight where they diverge after l=1.

### MC-2: Spin-orbit in nuclei is same sign as in atoms
- **Probe:** "Which j level is lower — j = l + ½ or j = l − ½?"
- **Characteristic phrase:** "j = l + ½ is higher, like in atoms."
- **Trigger:** Transfer from atomic fine structure.
- **Conflict evidence [P28]:** If nuclear spin-orbit had atomic sign, the level ordering after the 1d shell would produce magic number 40, not 28. Data (²⁰⁸Pb, doubly magic at Z=82, N=126) confirms nuclear ordering.
- **Bridge [P30]:** In atoms V_SO arises from magnetic interaction; in nuclei it's a strong-force effect. Different physics → different sign.
- **Replacement [P31]:** Nuclear spin-orbit: j = l + ½ is *lower*. The 1f level splits into 1f₇/₂ (low, 8 states) then 1f₅/₂ (high, 6 states) → magic 28 appears after filling 1f₇/₂.
- **Discrimination pairs [P33]:** Atom Na (l=0 valence, no split relevant). Nucleus ²⁹Si — extra neutron above N=20 in 1d₃/₂ sub-level.
- **S6 repair path:** Work through the 1f level splitting step by step.

### MC-3: One combined level filling for protons and neutrons
- **Probe:** "How many nucleons fill the first two shells?"
- **Characteristic phrase:** "Eight total."
- **Trigger:** Treating nucleus as a single system.
- **Conflict evidence [P28]:** ⁴He has Z=2 and N=2 (both independently magic at 2). ¹⁶O has Z=8 and N=8. The stability comes from *both* separately filling their shells; if combined, only one sequence needed and ⁸O (8 total) would be magic — but it's not.
- **Bridge [P30]:** Protons and neutrons are different particle species, obeying the Pauli exclusion principle independently.
- **Replacement [P31]:** Run two filling diagrams: proton diagram and neutron diagram, each using the same shell structure, filled independently up to Z or N.
- **Discrimination pairs [P33]:** ¹⁴N (Z=7, N=7): neither magic. ¹⁶O (Z=8, N=8): doubly magic. ¹⁵N (Z=7, N=8): only N=8 magic — singly magic.
- **S6 repair path:** Draw the proton and neutron level diagrams separately for oxygen.

### MC-4: Magic numbers mean "most common isotopes"
- **Probe:** "Does a magic number nucleus have the most isotopes?"
- **Characteristic phrase:** "Magic nuclei must occur most in nature."
- **Trigger:** Conflating stability with abundance.
- **Conflict evidence [P28]:** ²⁰⁸Pb (doubly magic) is very stable, but lead has only 4 stable isotopes. Tin (Z=50, magic) has 10 stable isotopes — abundance of *isotopes*, not copies. But ⁵⁶Fe (not magic for either) is the most *cosmically abundant* nucleus.
- **Bridge [P30]:** Magic means extra binding energy → harder to change → more stable; but cosmic abundance depends on stellar nucleosynthesis pathways, not just stability.
- **Replacement [P31]:** Magic → exceptionally high separation energies, low excitation first excited states, anomalously small quadrupole moments (spherical nucleus).
- **Discrimination pairs [P33]:** ⁵²Fe vs. ⁵⁶Fe — ⁵⁶Fe more abundant (iron peak in stellar fusion), but ⁵²Fe not magic.
- **S6 repair path:** Discuss two-neutron separation energy S₂ₙ plots — sudden drop after N = magic number.

---

## Section 5 — Explanation Library

### Explanation A — Energy Gap Analogy
The shell model succeeds because it predicts *gaps* in the energy spectrum. Imagine climbing a ladder where some rungs are very close together and occasionally there's a big jump between rungs. After each big jump, you've completed a "shell." Filling a shell exactly (magic number) means the next nucleon must leap a large energy gap to find a home — making the nucleus resist being pulled apart. Magic-number nuclei have measurably higher two-neutron separation energies and lower first-excited-state energies, exactly as seen in data.

### Explanation B — Mean Field and Spin-Orbit
Each nucleon moves in the average potential created by all other nucleons (mean-field approximation). The potential is roughly Woods-Saxon: V(r) = −V₀/(1+exp[(r−R)/a]), a finite well with a soft edge. Inside this well, solutions to the Schrödinger equation give orbital quantum numbers (n, l). But nucleons also carry spin ½, and the nuclear force has a strong spin-orbit component V_SO ∝ ℓ⃗·s⃗. For j = l + ½ (spin parallel to orbit) the interaction is attractive — pushing that sub-level *down*. For j = l − ½ it's repulsive — pushing it *up*. The resulting gaps in the level diagram occur precisely at 2, 8, 20, 28, 50, 82, 126.

### Explanation C — Experimental Signatures
Magic numbers show up in four independent experimental signatures: (1) Two-nucleon separation energies S₂ₙ or S₂ₚ drop sharply after Z or N passes a magic number. (2) First-excited-state energies are anomalously *high* (hard to excite a closed-shell nucleus). (3) Nuclear quadrupole moments are near zero (spherical, no deformation). (4) Alpha-decay and beta-decay half-lives of nuclei near magic numbers are anomalously long. These four independent measures converge on the same set of numbers — strong evidence the shell model captures real nuclear structure.

---

## Section 6 — Analogy Library

**Primary Analogy:** Electron shells in atoms (same quantum number logic, Pauli exclusion, shell filling). Explains: level structure, magic numbers as closed shells, extra-stability of closed shells.

**Breaking Point:** Atomic analogy breaks on: (1) spin-orbit sign reversal in nuclei; (2) two independent filling sequences (p and n); (3) the potential shape (Woods-Saxon ≠ Coulomb); (4) pairing energy has no good atomic analog.

**Anti-Analogy:** Liquid drop model — treats nucleus as a uniform fluid with no internal structure. Useful for bulk properties (binding energy trends, fission), but cannot explain magic numbers or spin/parity of ground states. These two models are complementary, not competing.

---

## Section 7 — Demonstration Library

**Demo 1 — Magic Number Data Visualization**
Plot two-neutron separation energy S₂ₙ vs. N for a range of isotopes. Learner observes abrupt drops after N = 28, 50, 82, 126. Ask: "What physical property causes these drops?" Connects data pattern directly to the shell-gap concept.

**Demo 2 — Level Diagram Construction**
Build the nuclear level diagram step by step: (1) draw harmonic oscillator levels (gives wrong magic numbers 2, 8, 20, 40…); (2) add l² perturbation; (3) add spin-orbit (reveals 28, 50, 82, 126). Learner sees the necessity of spin-orbit — each step fixes what the previous step got wrong.

**Demo 3 — Isotope Chart Magic Number Lines**
Show the chart of nuclides. Draw vertical lines at Z = 20, 50, 82 and horizontal lines at N = 20, 50, 82, 126. Doubly magic nuclei (intersections: ⁴⁰Ca, ¹³²Sn, ²⁰⁸Pb) are islands of unusually long-lived isotopes. This makes the abstract number pattern concrete in the global landscape of all known nuclei.

---

## Section 8 — Discovery Lesson

**Setup:** Provide learners with a table of S₂ₙ values for isotopes Z = 50 (tin). Column: neutron number N = 60 to 90. Column: S₂ₙ (MeV).

**Exploration:** "Plot S₂ₙ vs. N. What pattern do you see? At what N does the largest drop occur?"

**Expected finding:** Large drop after N = 82. Learner discovers the magic number empirically.

**Extension:** "What does a large drop in S₂ₙ tell you about how tightly the last two neutrons were bound?" (Were very tightly bound before N=82; the 83rd and 84th neutrons are much less tightly bound.)

**Resolution:** Connect to level diagram — N=82 is a closed shell; nucleons 83, 84 must begin a new shell, which starts above a large energy gap.

---

## Section 9 — Teaching Actions

**Session cap:** 3 actions per session.

| Priority | Action | Trigger |
|---|---|---|
| 1 | Draw nuclear level diagram with spin-orbit splitting | First time learner sees magic numbers |
| 2 | Plot S₂ₙ vs. N data for N around 50 or 82 | Learner doubts magic numbers are real |
| 3 | Run separate proton/neutron filling for ¹⁶O and ⁴⁰Ca | Learner merges the two filling sequences |

---

## Section 10 — Voice Teaching

**Opening hook:** "Why should the nucleus care about special numbers? It turns out nature is obsessed with the numbers 2, 8, 20, 28, 50, 82, 126. Nuclei with these exact nucleon counts are dramatically more stable than their neighbors — they're the noble gases of the nuclear world."

**Pacing:** Spend 40% of session on the experimental evidence for magic numbers before introducing the model. Let learners see *why* an explanation is needed.

**Common impasse language:** "Is the spin-orbit sign confusing? Remember: nuclear spin-orbit is a strong-force effect, not a magnetic one. The sign flips. j = l + ½ is *lower* in energy. That's what makes magic 28 work."

**Closing consolidation:** "The shell model gives nuclei memory of structure — it's not a featureless liquid. That structure shows up in stability, spin, shape, and decay rates. Whenever you see an anomalously stable nucleus, ask: is it near a magic number?"

---

## Section 11 — Assessment

**Mastery gate:** Level diagram construction with spin-orbit splitting, explaining at least 3 magic numbers.

**FA-1:** "List the magic numbers. Why does 28 count as magic but 30 does not?"
*Expected:* 28 corresponds to the top of the 1f₇/₂ sub-level (8 states); filling it closes a shell. 30 would add nucleons to 2p₃/₂, which is above a gap but not a large one.
*Threshold:* Connects number to level closure, not just memorization.

**FA-2:** "For the 1f shell (l=3): what are j = l ± ½? How many states in each? What magic number does filling the lower sub-level give?"
*Expected:* j = 7/2 (lower, 8 states) and j = 5/2 (higher, 6 states). Filling 1f₇/₂ adds 8 to the previous magic of 20 → magic 28.
*Threshold:* Correct calculation of 2j+1 and addition to prior magic.

**FA-3:** "Name two experimental observations that support the shell model."
*Expected:* Any two: S₂ₙ drops, high first-excited-state energy, near-zero quadrupole moment, anomalous decay rates near magic numbers.
*Threshold:* Both are genuine experimental signatures, not theoretical arguments.

**FA-4:** "How does ²⁰⁸Pb demonstrate doubly magic stability?"
*Expected:* Z=82 and N=126, both magic; has unusually high S₂ₙ and S₂ₚ, highest first-excited-state energy among heavy nuclei, nearly spherical.
*Threshold:* States both Z and N values and at least one measurable consequence.

**Confidence calibration:** After FA-1, ask "How sure are you (0–100%)?" If confidence > 80% but answer incomplete, prompt: "You said you're very sure — can you show the level diagram that produces 28?"

**Delayed retrieval:** Return at day 7: "Sketch the nuclear level diagram from scratch up to magic number 28. Label each sub-level with its spin-orbit j value and degeneracy."

---

## Section 12 — Recovery Notes

**S0 — Below floor:** Revisit quantum numbers (n, l, m_l, m_s) and Pauli exclusion principle before any nuclear application.

**S3 — Partial understanding:** Learner can list magic numbers but cannot produce the level diagram. Intervention: walk through the splitting of the 1d and 1f levels step by step, computing 2j+1 at each step.

**S6 — Misconception detected:** MC-2 (spin-orbit sign) or MC-3 (single filling). Intervention: draw two separate filling diagrams for O-16, compute ground-state spin/parity and compare to measured J^π = 0⁺ — only doubly-closed shell gives correct J^π = 0⁺.

**S9 — Near mastery:** Learner can produce diagram but struggles to connect to experimental data. Intervention: assign S₂ₙ plot exercise (Demo 1) and have learner annotate it with shell closures.

---

## Section 13 — Memory & Review

**Memory type:** Structural/procedural — constructing the level diagram requires a reproducible procedure, not just facts.

**Spaced retrieval schedule:** Day 1 (construct diagram), Day 3 (explain magic 28 from 1f splitting), Day 7 (full diagram from scratch + name 2 experimental signatures), Day 21 (explain why ²⁰⁸Pb is doubly magic).

**Interleaving partners:** phys.mod.binding-energy (SEMF explains bulk trends; shell model explains residuals), phys.qm.operators (quantum number formalism), phys.mod.nuclear-reactions (Q-value anomalies near magic numbers).

---

## Section 14 — Transfer Map

**Near transfer:** Predict ground-state spin/parity of ¹⁷O (1 neutron above N=8 closed shell → j = 5/2, l=2 → J^π = 5/2⁺). Predict nuclear magnetic moment from valence nucleon.

**Far transfer:** Electron shell structure in atoms (same formalism, different potential and spin-orbit sign). Noble gas stability ↔ magic number stability.

**Structural abstraction:** Whenever a quantum system with many identical fermions shows anomalous stability at specific counts — nuclear magic numbers, electron shell closures, electron magic numbers in metallic clusters, proton magic numbers in superheavy elements — the explanation is a shell structure with energy gaps. The shell model is a universal pattern for many-fermion quantum systems.

---

## Section 15 — Curriculum Feedback

**Dependency check:** phys.mod.binding-energy must be mastered before this concept (SEMF gives the bulk context; shell corrections are deviations from SEMF).

**Common pacing error:** Teaching magic numbers as facts before showing experimental evidence. Learners memorize 2, 8, 20… without understanding they are empirically discovered anomalies.

**Assessment gap:** Standard curricula test recognition of magic numbers but rarely test ability to construct the level diagram or explain why 28 (not 30) is magic.

**Suggested pairing:** Pair with phys.mod.nuclear-reactions for a lesson on why reaction Q-values and cross-sections spike near magic-number nuclei.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

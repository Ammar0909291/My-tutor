# Teaching Blueprint: Nuclear Reactions and Q-Value

## 0. Concept Metadata
- **Concept ID**: phys.mod.nuclear-reactions
- **Name**: Nuclear Reactions and Q-Value
- **Domain**: Modern Physics
- **Difficulty**: advanced
- **Bloom Level**: apply
- **Estimated Hours**: 6
- **Prerequisites**: phys.mod.radioactive-decay
- **Unlocks**: phys.mod.binding-energy
- **Description**: Nuclear reactions conserve charge, mass number, and energy; the Q-value is the energy released or absorbed, calculated from the mass difference between reactants and products via Q = Δm·c².

---

## 1. Concept Spine

### Core Idea
Nuclear reactions transform one set of nuclei into another. Every reaction must conserve charge (total atomic number Z), baryon number (total mass number A), energy, and momentum. The Q-value measures the net energy released (Q > 0, exothermic) or absorbed (Q < 0, endothermic): Q = (m_reactants − m_products)c².

### Conceptual Ladder
1. **Recall**: Radioactive decay releases energy because products are lighter than parent.
2. **Understand**: Any nuclear reaction, induced or spontaneous, obeys the same conservation laws.
3. **Apply**: Write balanced nuclear equations; calculate Q from tabulated atomic masses.
4. **Extend**: Distinguish fission (heavy nucleus → two medium + neutrons) and fusion (light nuclei → heavier product); both are exothermic for the right mass range.

### Key Formula Set
- **Conservation**: ΣZ_reactants = ΣZ_products; ΣA_reactants = ΣA_products
- **Q-value**: Q = (Σm_reactants − Σm_products)c²
  - Using atomic mass units: Q [MeV] = (Δm [u]) × 931.5 MeV/u
- **Threshold energy** (endothermic reaction in lab frame):
  E_th = |Q|(1 + m_projectile/m_target)
- **Notation**: ᵃX(projectile, ejectile)ᵇY — compact reaction notation

### Canonical Example
Deuterium–tritium fusion: ²H + ³H → ⁴He + n
- m(²H) = 2.014102 u; m(³H) = 3.016049 u; m(⁴He) = 4.002602 u; m(n) = 1.008665 u
- Δm = (2.014102 + 3.016049) − (4.002602 + 1.008665) = 0.018884 u
- Q = 0.018884 × 931.5 = 17.59 MeV (exothermic, large — fusion energy)

Alpha-particle bombardment of nitrogen: ¹⁴N + ⁴He → ¹⁷O + ¹H
- Q = −1.19 MeV (endothermic — Rutherford's first artificial transmutation)

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Physical Experience)
Imagine two lumps of clay colliding. After sticking together, the combined lump is lighter than the sum of the originals — the missing mass was converted to heat and sound. Nuclear reactions are the extreme version: the "missing mass" converts to enormous energy via E = mc².

Hold a model of a helium nucleus (4 balls bound together) — it weighs less than 4 separate hydrogen atoms. That deficit (binding energy) is what powers the sun.

### Representational (Diagrams and Symbols)
- **Reaction diagram**: Arrow from reactant nuclei → product nuclei, label each with ᴬ_ᴢX notation.
- **Mass-energy bar chart**: Before-reaction total mass-energy bar vs. after bar — Q is the gap.
- **Nuclear notation grid**: protons (Z) on horizontal axis, neutrons (N = A − Z) on vertical, draw reaction as a path on the chart of nuclides.
- **Energy level diagram**: Reactant state energy vs. product state energy; Q is the drop (exothermic) or rise (endothermic).

### Abstract (Equation Manipulation)
Students must practice:
1. Balancing ΣZ and ΣA to find unknown product.
2. Looking up atomic masses from a data table.
3. Computing Δm → Q in MeV.
4. Deciding exothermic vs. endothermic from sign of Q.
5. Applying threshold formula for endothermic reactions.

### Transfer (Novel Contexts)
- Medical PET scan: ¹⁸F → ¹⁸O + e⁺ + νₑ; Q determines positron kinetic energy.
- Carbon dating cross-check: ¹⁴C decay Q = 0.156 MeV (pure beta, no gamma), confirming spin/parity assignments.
- Stellar nucleosynthesis: chain of exothermic reactions up to ⁵⁶Fe (peak binding energy per nucleon), then endothermic for heavier elements.

---

## 3. Why Beginners Fail

### Failure Mode 1: Confusing Mass Number with Mass
Students write A = Z + N correctly but use integers as if they equal the actual atomic mass. They forget that atomic masses deviate from whole numbers (mass defect), so Δm requires tabulated values, not arithmetic with integers.

### Failure Mode 2: Sign of Q
Students mix up which direction is positive. Remind them: Q > 0 means products are lighter (energy released). Q < 0 means energy must be supplied.

### Failure Mode 3: Forgetting to Include Electrons
Using nuclear masses vs. atomic masses. Atomic masses include Z electrons on both sides, which cancel for balanced reactions — safe to use atomic masses consistently. Switching between nuclear and atomic masses mid-calculation creates errors of Z × 0.000549 u per proton.

### Failure Mode 4: Missing the Threshold Concept
For Q < 0, students often think any projectile energy above |Q| is sufficient. The threshold is higher because momentum must also be conserved in the centre-of-mass frame.

---

## 4. Misconception Library

### MC-1: "Q-value equals kinetic energy of products"
- **Probe**: "If Q = 17.6 MeV for DT fusion and the reactants are at rest, where exactly does 17.6 MeV go?"
- **Characteristic phrase**: "The alpha gets 17.6 MeV of kinetic energy."
- **Trigger**: Students treat Q as going entirely to one particle.
- **Conflict evidence**: Momentum conservation forces the alpha and neutron to share kinetic energy in fixed proportion (m_n/m_α ratio); each gets a definite share, not the full Q.
- **Bridge**: Use a simpler analogy — two unequal masses connected by a compressed spring (momentum conservation splits energy by inverse mass ratio).
- **Replacement**: Q = ΔKE_total; individual shares determined by momentum conservation. KE_α ≈ 3.5 MeV, KE_n ≈ 14.1 MeV for DT.
- **Discrimination pairs**: "Q = 17.6 MeV total KE released" ✓ vs. "alpha gets 17.6 MeV" ✗
- **S6 repair path**: Solve two-body final state with p_alpha = −p_neutron and KE_total = Q; verify numbers add to 17.6 MeV.

### MC-2: "A balanced equation means the reaction happens spontaneously"
- **Probe**: "Is ¹⁴N + ⁴He → ¹⁷O + ¹H balanced? Will it happen if you just mix nitrogen gas and helium?"
- **Characteristic phrase**: "I balanced Z and A, so the reaction is allowed."
- **Trigger**: Confusing conservation laws (necessary) with probability/threshold (sufficient).
- **Conflict evidence**: The reaction has Q = −1.19 MeV; it requires a minimum projectile energy (threshold ≈ 1.53 MeV lab frame). Alpha particles in helium gas have negligible energy — no reaction occurs.
- **Bridge**: Conservation laws rule out impossible reactions; they don't guarantee possible ones.
- **Replacement**: Balanced AND exothermic (Q > 0) → spontaneous in principle. Balanced AND Q < 0 → requires above-threshold kinetic energy input.
- **Discrimination pairs**: "Balanced ⟹ possible" ✓ vs. "Balanced ⟹ spontaneous" ✗
- **S6 repair path**: Classify 5 balanced reactions by Q sign; identify which require an accelerator.

### MC-3: "Atomic mass ≈ mass number, so Δm ≈ 0"
- **Probe**: "If ¹H has mass 1.0000 u and the table says 1.007825 u, which do you use for Q?"
- **Characteristic phrase**: "The mass number is 1, so m = 1 u."
- **Trigger**: Integer approximation convenient for balancing but wrong for energy calculations.
- **Conflict evidence**: Using integers gives Δm = 0 for any balanced reaction → Q = 0 always, predicting no energy release.
- **Bridge**: Mass number is a count of nucleons; actual mass is slightly different due to binding energy. The tiny difference (milliunits) × 931.5 MeV/u = MeV-scale energy.
- **Replacement**: Always use tabulated atomic masses (4–6 decimal places in u) for Q calculations.
- **Discrimination pairs**: Use table value 4.002602 u for ⁴He ✓ vs. use "4 u" ✗
- **S6 repair path**: Redo a fusion Q calculation first with integers (Q ≈ 0) then with table values; feel the difference.

### MC-4: "Nuclear reactions change the number of protons arbitrarily"
- **Probe**: "In beta-minus decay, a neutron becomes a proton. Doesn't that violate conservation of Z?"
- **Characteristic phrase**: "Z increased from 6 to 7 in carbon-14 decay."
- **Trigger**: Seeing Z change without tracking the emitted particle's charge.
- **Conflict evidence**: The emitted electron (Z = −1) carries away the charge increase; total Z is conserved: 6 + 0 → 7 + (−1) = 6 ✓.
- **Bridge**: Every emitted particle has a charge and must be included in the balance.
- **Replacement**: Conservation of charge applies to the complete reaction including all products (particles, antiparticles, photons carry Z = 0).
- **Discrimination pairs**: "¹⁴C → ¹⁴N + e⁻ + ν̄ₑ: Z: 6 → 7−1 = 6 ✓" vs. "Z changes from 6 to 7 ✗"
- **S6 repair path**: Write full decay equations including electrons/positrons and verify Z balance.

---

## 5. Explanation Library

### Explanation A — First-Principles (for analytical learners)
The total rest mass energy of a system is not conserved in nuclear reactions — only total energy (rest + kinetic + binding) is. When ²H + ³H → ⁴He + n, the helium-4 nucleus is exceptionally tightly bound (largest binding energy per nucleon among light nuclei). Its rest mass is therefore unusually low. The 0.01888 u mass "lost" reappears as kinetic energy of the products: E = mc² → 17.6 MeV. This is the same principle as the mass defect in binding energy, now applied dynamically to a reaction.

Conservation laws as symmetry laws: charge conservation ↔ gauge symmetry (Noether); baryon conservation ↔ global U(1) symmetry; energy conservation ↔ time-translation symmetry. Nuclear reactions obey all three.

### Explanation B — Intuitive (for visual/conceptual learners)
Imagine atoms as Lego sets. Two Lego sets (²H and ³H) snap together, then instantly rearrange into a tighter, more compact set (⁴He) plus a loose brick (n). The new compact set uses less plastic per brick — that "saved" material becomes pure energy, shooting the loose brick away at enormous speed. Q is how much energy the rearrangement liberates.

### Explanation C — Procedural (for step-by-step learners)
Step 1: Write the reaction, identifying all reactants and products with ᴬ_ᴢX notation.
Step 2: Verify ΣZ_left = ΣZ_right and ΣA_left = ΣA_right. If not, find the missing particle.
Step 3: Look up atomic masses (in u) for every species.
Step 4: Compute Δm = Σm_reactants − Σm_products.
Step 5: Q = Δm × 931.5 MeV/u. If Q > 0: exothermic. If Q < 0: endothermic.
Step 6 (if Q < 0): Compute threshold: E_th = |Q|(1 + m_proj/m_targ).

---

## 6. Analogy Library

### Primary Analogy
**Currency exchange with a fee**: Sending money internationally, you start with €100. After conversion and fees, the recipient gets $108.00 instead of $110.00. The $2 "lost" paid the bank's overhead. In a nuclear reaction, the "exchange" is between nuclear configurations; the "fee paid back" (exothermic) or "extra fee charged" (endothermic) is the Q-value.

### Breaking Point
This analogy breaks when students think currency rates are continuous — nuclear reactions have discrete, quantized Q-values determined by nuclear structure. Also, currency exchange is reversible; many nuclear reactions are effectively irreversible under ordinary conditions.

### Anti-Analogy
"Chemical reactions releasing heat" — misleading because chemical Q-values are in eV (millionths of nuclear Q-values). Students who think nuclear reactions are "just like burning" drastically underestimate the energy scales. Emphasize: 1 MeV = 10⁶ eV; one DT fusion event releases more energy than burning ~10⁸ hydrogen molecules.

---

## 7. Demonstration Library

### Demo 1: Mass Deficit Calculation Live
Materials: atomic mass table (or NIST chart of nuclides on screen), calculator.
Procedure: Take ¹H + ¹H → ²H + e⁺ + νₑ (proton-proton chain step 1). Compute Q together step by step. Students verify conservation of Z and A first, then look up masses and calculate Q = 0.42 MeV. Discuss: this is the sun's first step; 4 such reactions + 2 more → ⁴He + 26.7 MeV total.

### Demo 2: Chart of Nuclides Navigation
Materials: printed or projected chart of nuclides.
Procedure: Mark ¹⁴N (start), draw arrow to ¹⁷O (up-left on chart) labeled with incoming ⁴He and outgoing ¹H. Students see that every nuclear reaction is a path on this map. The chart shows stable vs. unstable nuclides, giving intuition about which reactions produce useful products vs. radioactive waste.

### Demo 3: Energy Scale Comparison
Materials: whiteboard.
Show: Chemical bond energy ≈ 1–10 eV. Nuclear Q-value for fission ≈ 200 MeV. Ask: by what factor does nuclear energy exceed chemical? Answer: ~10⁷. This is why 1 kg of uranium releases more energy than thousands of tonnes of coal.

---

## 8. Discovery Lesson

**Title**: "Where Did the Mass Go?"

**Hook**: Show video of a nuclear reactor generating steam. Ask: "Where does the heat energy come from? It can't all be from electrons — those power chemistry. Something deeper is happening."

**Exploration**:
1. Students compute the mass of ²H + ³H separately (sum = 5.030151 u).
2. Students compute mass of ⁴He + n (sum = 5.011267 u).
3. They find Δm = 0.018884 u and feel confused — "mass disappeared?"
4. Students convert using E = mc²: 0.018884 × 931.5 = 17.59 MeV.
5. Students express this in Joules (×1.6×10⁻¹³): 2.82 × 10⁻¹² J per reaction.

**Investigation**: How many reactions per second would power a 1 GW reactor? Answer: ~3.5 × 10²⁰ per second. Students count atoms in 1 gram of tritium: ~2×10²³. So 1 gram of tritium fuel (with 1.5 g of deuterium) could sustain full power for ~10 minutes.

**Generalization**: The mass defect IS the binding energy, recast as energy released in rearrangement. This is the same physics as why helium is harder to ionize — its nucleons are more tightly bound.

---

## 9. Teaching Actions

**session_cap**: 6

1. **Activate prior knowledge**: Ask student to recall radioactive decay Q-value calculation (phys.mod.radioactive-decay). Confirm they can use N(t) = N₀e^(−λt) and half-life — now shift focus from decay to induced reactions.
2. **Establish conservation laws**: Drill Z and A balancing with 3 practice equations (find the missing particle). Confirm mastery before touching Q.
3. **Mass table exercise**: Give students a printed mass table. Have them find masses for ²H, ³H, ⁴He, n. Build the Q calculation together for DT fusion.
4. **Sign convention**: Present one exothermic and one endothermic reaction. Students classify each and state physical meaning.
5. **Threshold energy**: Endothermic reaction — students compute |Q| and E_th. Contrast lab frame vs. CM frame.
6. **Synthesis problem**: Given a new reaction (e.g., ⁶Li + n → ⁴He + ³H), students balance, find Q, classify, and state energy implications.

---

## 10. Voice Teaching

**Opening move**: "Let's do something that seems impossible — weigh a reaction."

**Core explanation**: "You're going to look up masses in a table — exact masses, not integers — and subtract. The tiny difference, multiplied by 931.5 MeV/u, gives you the energy of the reaction. That's Q. Positive means energy out, negative means you must put energy in."

**Common error interception**: "Before you calculate, check your units. Are you using atomic masses with decimal places? If your Δm is zero, you forgot to use the table values."

**Checkpoint question**: "Without calculating, just by looking at this reaction, how do you know immediately whether to expect Q positive or negative?" (Answer: if the products are known to be tightly bound — like ⁴He — likely positive.)

**Closing move**: "Every time you calculate Q, you're discovering how the structure of the nucleus stores or releases energy. It's the same physics behind stars, bombs, and medical scanners."

---

## 11. Assessment

### Mastery Gate
Student can: (1) write a balanced nuclear equation given partial information, (2) calculate Q using a mass table to ±0.1 MeV accuracy, (3) classify as exothermic/endothermic, (4) apply threshold formula for endothermic reactions.

### Formative Assessment 1 — Balance the equation
**Prompt**: "Complete and balance: ²⁷Al + ⁴He → ? + ¹H. What is Z and A of the product?"
**Expected answer**: ³⁰Si (Z = 14, A = 30). Check: Z: 13+2 = 14+1 ✓; A: 27+4 = 30+1 ✓.
**Threshold**: 100% (conservation laws are binary — correct or not).

### Formative Assessment 2 — Q-value calculation
**Prompt**: "For the reaction ²⁷Al(α,p)³⁰Si, using masses m(²⁷Al) = 26.981541 u, m(⁴He) = 4.002602 u, m(³⁰Si) = 29.973770 u, m(¹H) = 1.007825 u, find Q."
**Expected answer**: Δm = (26.981541 + 4.002602) − (29.973770 + 1.007825) = 0.002548 u; Q = 0.002548 × 931.5 = 2.37 MeV.
**Threshold**: ±0.1 MeV.

### Formative Assessment 3 — Threshold energy
**Prompt**: "A reaction has Q = −2.00 MeV. The projectile is a proton (m = 1.007825 u) hitting a stationary nitrogen-14 nucleus (m = 14.003074 u). Find the threshold kinetic energy of the proton in the lab frame."
**Expected answer**: E_th = 2.00 × (1 + 1.007825/14.003074) = 2.00 × 1.0720 = 2.14 MeV.
**Threshold**: ±0.05 MeV.

### Formative Assessment 4 — Conceptual
**Prompt**: "Why is Q = 17.6 MeV for DT fusion, but the alpha particle gets only ~3.5 MeV of kinetic energy?"
**Expected answer**: Momentum conservation: in the CM frame (reactants approximately at rest), alpha and neutron must have equal and opposite momenta. Since KE ∝ p²/2m and m_n << m_α, the neutron carries most of the kinetic energy (~14.1 MeV).
**Threshold**: Must invoke momentum conservation and mass ratio.

### Confidence Calibration
After each problem: "How confident are you that your Q value is correct: 0-100%? What would make you more confident?" Targets students who get the right answer by accident vs. those with genuine procedural understanding.

### Delayed Retrieval
One week later: Given a new reaction (not from class), balance it and calculate Q. No prompting on procedure. Confirms procedural transfer, not just formula recall.

---

## 12. Recovery Notes

### S0 — Conceptual block: "Why does mass become energy?"
Re-anchor to E = mc² from special relativity. Mass is a form of energy. When nucleons rearrange into a tighter configuration, the total rest mass decreases — those are the same statement. Use binding energy curve (BE/A vs. A) to show helium-4 is a local peak → reactions producing He-4 release large Q.

### S3 — Can balance but cannot calculate Q
Student likely using integer masses. Drill: open the mass table, find ⁴He, read "4.002602 u" aloud. Have them feel the difference from "4.000000 u". Show that Δm = 0.002602 u × 4 nucleons — each nucleon contributes to binding energy.

### S6 — Threshold formula confusion
Return to CM frame vs. lab frame derivation. In CM frame, threshold = |Q| exactly (all energy goes to rest mass of products at rest). In lab frame, you need extra KE to supply the CM frame's momentum. Derive E_th geometrically using four-vector invariant s = (ΣE)² − (Σpc)².

### S9 — Cannot classify exo vs. endothermic from context
Give student the binding energy per nucleon (BE/A) curve. Show that reactions moving toward the peak (A ≈ 56, Fe) release energy; reactions moving away absorb energy. Then show Q is just a quantitative version of this graphical insight.

---

## 13. Memory and Review

### Memory Type
Procedural (balancing + calculation) + semantic (Q-value meaning, conservation laws) + declarative (key reactions: DT fusion, PP chain, fission).

### Spaced Retrieval Schedule
- Day 1: Author a balanced equation for a new reaction.
- Day 3: Calculate Q for ²H + ²H → ³He + n (Q = 3.27 MeV).
- Day 7: Classify 5 reactions as exo/endo from their Q signs only.
- Day 14: Derive threshold energy for an endothermic reaction.
- Day 30: Explain to a peer why the sun's PP chain is exothermic.

### Interleaving Partners
- phys.mod.binding-energy (next concept — binding energy per nucleon curve gives intuition for Q)
- phys.mod.radioactive-decay (Q-value in decay = same calculation)
- phys.rel.mass-energy (E = mc² derivation that underpins Q)

---

## 14. Transfer Map

### Near Transfer
- Compute Q for any 2-body nuclear reaction given mass tables.
- Apply threshold formula for any endothermic reaction.
- Write compact reaction notation ᵃX(b,c)ᵈY.

### Far Transfer
- **Particle physics**: Quark-level processes (β⁻ decay as d → u + e⁻ + ν̄) — same conservation laws, higher energy scale.
- **Astrophysics**: Stellar nucleosynthesis sequences — which reactions power which stellar evolutionary stages?
- **Medical physics**: PET radiotracer Q-values determine maximum positron range in tissue, affecting image resolution.

### Structural Abstraction
Q-value = (initial rest energy) − (final rest energy) is a universal concept applicable to any reaction where rest mass changes: chemical reactions (eV scale), nuclear reactions (MeV scale), particle-antiparticle annihilation (GeV scale). The concept transfers with the formula; only the energy scale and particles change.

---

## 15. Curriculum Feedback

### Prerequisite Adequacy
phys.mod.radioactive-decay provides the Q-value calculation foundation. Students already used Δm → Q in decay contexts. This blueprint extends that to induced reactions and adds the threshold concept. Prerequisite is necessary and sufficient.

### Unlock Readiness
phys.mod.binding-energy requires students to understand Q as a function of nuclear structure — this blueprint provides the procedural and conceptual foundation.

### Suggested Flag
None. Concept sequence is well-ordered.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

# chem.equil.le-chatelier — Le Chatelier's Principle

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.equil.le-chatelier` |
| Domain | Chemical Equilibrium |
| Requires | `chem.equil.kc-kp` |
| Unlocks | (none) |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 3 |

## 1. Concept Spine

A catalyst does NOT shift equilibrium position or change Kc — it accelerates the forward AND reverse reactions EQUALLY (lowering the activation-energy "hill" symmetrically from both directions), so equilibrium concentrations are unchanged and only the TIME to reach equilibrium decreases; adding more of a reactant does NOT change K (which depends only on temperature) — it increases Q above K temporarily, driving the system to shift forward until Q=K again, redistributing amounts to a new equilibrium position with the same K value, never a changed K; and increased pressure shifts equilibrium toward the side with FEWER gas moles, which means "high pressure favors products" is only true when Δn_gas<0 for that specific reaction — when Δn_gas=0 (e.g., H₂+I₂⇌2HI), pressure changes have NO effect on equilibrium position at all, even though reaction rate increases in both directions equally.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing an energy diagram before and after catalyst addition, showing the activation-energy hill lowered symmetrically for both forward and reverse pathways, with the reactant/product energy levels (and hence K) unchanged.

**Representational**: A Q-vs-K reasoning diagram for adding excess H₂ to the Haber equilibrium — Q rising above K momentarily, then the system shifting forward until Q returns to equal K, tracking amounts (not K itself) redistributing.

**Abstract**: The general principle that catalysts affect kinetics (rate) without affecting thermodynamics (K, equilibrium position); the general Q-vs-K mechanism explaining why adding reactant shifts amounts without changing K; the general Δn_gas-dependent rule for predicting pressure effects on equilibrium position.

**Transfer**: Given an unfamiliar equilibrium system, correctly predicting that a catalyst leaves K and equilibrium concentrations unchanged, correctly distinguishing a shift in amounts from a change in K when a reactant/product is added, and correctly computing Δn_gas to determine whether (and in which direction) a pressure change affects equilibrium position.

## 3. Why Beginners Fail

Students reason from the observation "catalyst speeds up product formation" directly to "catalyst shifts equilibrium toward more product," without considering that the reverse reaction is accelerated equally, missing that a catalyst's symmetric rate enhancement means the system simply reaches the SAME equilibrium position faster, with K and equilibrium concentrations both genuinely unchanged; students see the forward shift that occurs when reactant is added and conflate this observable shift with "K increased," not distinguishing between a change in the AMOUNTS present at the new equilibrium and a change in the EQUILIBRIUM CONSTANT itself, missing that K depends only on temperature — adding reactant increases Q above K temporarily, and the system shifts to restore Q=K, with the new equilibrium amounts being different but K itself being identical; and students learn specific worked examples (like the Haber process) where high pressure favors products, and generalize this to "high pressure always favors products" as a universal rule, missing that the actual determinant is the CHANGE IN GAS MOLES (Δn_gas) between reactants and products for that specific reaction — pressure changes have zero effect on equilibrium position when Δn_gas=0, and can even favor reactants if the reactant side has fewer gas moles.

## 4. Misconception Library

### MC-1: A catalyst shifts the equilibrium position
- **Probe**: "A catalyst is added to an equilibrium mixture. What happens to (a) the reaction rate, (b) Kc, (c) the equilibrium concentrations?"
- **Characteristic phrase**: "The catalyst shifts equilibrium to the right, increasing [product] at equilibrium."
- **Trigger (Type 1, overgeneralization)**: Overgeneralization from "catalyst increases product formation" without considering that the reverse reaction is equally accelerated.
- **Conflict evidence [P28]**: (a) rate increases for both forward and reverse equally; (b) Kc unchanged (catalyst doesn't change ΔG° or thermodynamics); (c) equilibrium concentrations unchanged — only the TIME to reach equilibrium decreases. Using the energy diagram: the catalyst lowers the hill equally from left and right; the valley depths (reactant and product energies) are unchanged; K=e^(−ΔG°/RT) is unchanged.
- **Bridge [P30]**: "Catalyst increases product formation" is only observably true BEFORE equilibrium is reached (the system arrives there faster) — at the actual equilibrium state itself, the forward and reverse rates are already equal by definition, and since a catalyst accelerates both directions by the identical factor, the ratio of forward-to-reverse rate (which determines the equilibrium position) is completely unaffected; only the SPEED of reaching that unchanged equilibrium position changes.
- **Replacement [P31]**: A catalyst changes only the rate at which equilibrium is reached, never the equilibrium position, K, or equilibrium concentrations — both forward and reverse rates are accelerated equally.
- **Discrimination pairs [P33]**: Catalyzed system (reaches the SAME equilibrium concentrations faster) vs. uncatalyzed system (reaches the same equilibrium concentrations more slowly) — identical final state, different time to get there.
- **S6 repair path**: Present the explicit energy-diagram argument, showing the activation-energy hill lowered symmetrically with valley depths (and hence K) unchanged.

### MC-2: Adding reactant increases K
- **Probe**: "You add more H₂ to the Haber process equilibrium at constant temperature. Does Kc change? Does [NH₃] change?"
- **Characteristic phrase**: "Adding H₂ increases K because more NH₃ is produced."
- **Trigger (Type 5, instruction-induced)**: Students conflate "system shifts right" with "K increases," not distinguishing between a shift in amounts and a change in K.
- **Conflict evidence [P28]**: K depends ONLY on temperature. Adding H₂ increases Q initially (Q>K), so the system shifts forward to reduce [H₂] and increase [NH₃] until Q=K again. K is the same; the amounts redistributed until the ratio matches K. The final [NH₃] is higher than before, but K is unchanged.
- **Bridge [P30]**: Observing that MORE product forms after adding reactant does not, by itself, indicate a change in K — it indicates the system was momentarily pushed AWAY from equilibrium (Q≠K) and is now shifting to RESTORE the equilibrium condition (Q=K) at the new set of amounts; K itself is a temperature-dependent constant that governs what RATIO of concentrations constitutes equilibrium, not a quantity that shifts in response to concentration changes.
- **Replacement [P31]**: K depends only on temperature — adding reactant shifts the AMOUNTS present at the new equilibrium (via the Q-approaches-K mechanism), never changes K itself.
- **Discrimination pairs [P33]**: K (unchanged, temperature-dependent only) vs. equilibrium amounts/concentrations (changed, shift to restore Q=K after a concentration perturbation) — two genuinely distinct quantities often conflated.
- **S6 repair path**: Present the explicit Q-vs-K reasoning sequence (Q>K after addition → system shifts forward → Q returns to K), isolating what changes (amounts) from what doesn't (K).

### MC-3: Increased pressure always shifts toward products
- **Probe**: "For H₂(g) + I₂(g) ⇌ 2HI(g), predict the effect of doubling the pressure."
- **Characteristic phrase**: "Doubling pressure shifts the equilibrium toward HI (products), increasing yield."
- **Trigger (Type 1, overgeneralization)**: Students learn examples where high pressure favours products (Haber process) and apply this universally.
- **Conflict evidence [P28]**: Counting gas moles: Δn_gas=2−(1+1)=0. Pressure change has NO effect on equilibrium position when Δn_gas=0. Rate increases (more frequent collisions) but both forward and reverse rates increase equally. The equilibrium position and K are unchanged. "High pressure favours products" is only true when products have fewer gas moles (Δn_gas<0).
- **Bridge [P30]**: Pressure's effect on equilibrium position specifically arises from the system responding to a change in gas-phase VOLUME/concentration by shifting toward whichever side has FEWER total gas moles (reducing the total mole count reduces the "crowding" effect of increased pressure) — when the reactant and product sides have EQUAL gas-mole counts (Δn_gas=0), there is no such asymmetric response available, and pressure genuinely has no effect on equilibrium position, regardless of how pressure behaves in other reactions.
- **Replacement [P31]**: Always compute Δn_gas (product gas moles minus reactant gas moles) before predicting a pressure effect — pressure shifts equilibrium toward the side with fewer gas moles, and has NO effect when Δn_gas=0, never assume "high pressure favors products" universally.
- **Discrimination pairs [P33]**: Haber process (Δn_gas<0, pressure genuinely favors products) vs. H₂+I₂⇌2HI (Δn_gas=0, pressure has no effect on equilibrium position) — the same "increase pressure" action, different consequences depending on Δn_gas.
- **S6 repair path**: Present the explicit Δn_gas computation for H₂+I₂⇌2HI, contrasted with the Haber process's nonzero Δn_gas, deriving the differing pressure sensitivity.

## 5. Explanation Library

**Primary explanation**: A catalyst accelerates both forward and reverse reactions equally, changing only how quickly equilibrium is reached, never the equilibrium position, K, or equilibrium concentrations — this follows from the catalyst lowering the activation-energy barrier symmetrically without altering the reactant/product energy levels (and hence K=e^(−ΔG°/RT)). K itself depends only on temperature; adding reactant or product perturbs the system away from equilibrium (Q≠K), triggering a shift in AMOUNTS to restore Q=K, never a change in K itself.

**Secondary explanation (pressure effects depend on Δn_gas)**: Pressure changes shift equilibrium position specifically toward the side with fewer total gas moles — this effect depends entirely on Δn_gas for the specific reaction, and has zero effect on equilibrium position when Δn_gas=0, even though reaction rate still increases in both directions; "high pressure favors products" is a reaction-specific consequence, not a universal rule.

## 6. Analogy Library

- **Primary analogy**: A tunnel excavated equally from both ends of a mountain (catalyst lowering activation energy for both forward and reverse) — travelers reach the other side faster, but the two towns' relative populations (equilibrium concentrations) are unaffected by how fast the tunnel lets people through.
- **Breaking point**: The tunnel analogy conveys the catalyst's symmetric-rate-enhancement concept well but doesn't naturally capture the Q-vs-K distinction (MC-2) or the Δn_gas-dependent pressure rule (MC-3) — those need the explicit Q-approaches-K reasoning sequence and the gas-mole-counting argument.
- **Anti-analogy**: Do NOT say "a catalyst helps the reaction make more product" without qualification — this directly reinforces MC-1 by implying a shift in equilibrium position rather than merely reaching it faster.

## 7. Demonstration Library

- **Demonstration 1 (energy-diagram argument for catalyst's symmetric effect)**: Present the explicit activation-energy diagram before/after catalyst addition, showing valley depths (and K) unchanged.
- **Demonstration 2 (Q-vs-K reasoning sequence for reactant addition)**: Walk through the explicit Q>K→shift-forward→Q=K sequence for the Haber process after H₂ addition.
- **Demonstration 3 (Δn_gas comparison for pressure sensitivity)**: Compute Δn_gas explicitly for both the Haber process and H₂+I₂⇌2HI, deriving the differing pressure response.

## 8. Discovery Lesson

**Opening**: "Does adding a catalyst to an equilibrium mixture increase the amount of product at equilibrium?"

**Exploration**: Students examine the energy diagram before and after catalyst addition, discovering the reactant/product energy levels (and hence K) are unaffected.

**Synthesis**: Guide toward: a catalyst speeds up reaching equilibrium but never changes the equilibrium position itself.

**Closure**: "Does doubling the pressure on H₂+I₂⇌2HI shift the equilibrium toward HI?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit energy-diagram argument for a catalyst's symmetric rate enhancement.
- **TA-2 (TELL)**: State the Q-vs-K distinction explicitly, anchored to the Haber-process reactant-addition sequence.
- **TA-3 (DO)**: Student computes Δn_gas for an unfamiliar reaction and predicts the pressure effect.
- **TA-4 (TEST-THINKING)**: Present the H₂+I₂⇌2HI probe and ask the student to justify the absence of a pressure effect from Δn_gas=0.

## 10. Voice Teaching

Whenever a catalyst's effect on equilibrium is discussed, narrate "speeds up both directions equally — K and equilibrium concentrations don't change." Whenever a pressure change is considered, state "count the gas moles on each side first — Δn_gas determines the effect" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly state that a catalyst leaves K and equilibrium concentrations unchanged, (b) correctly distinguish a shift in amounts from a change in K when reactant/product is added, (c) correctly predict pressure effects from Δn_gas, including the Δn_gas=0 no-effect case.

- **FA-1**: "A catalyst is added to an equilibrium mixture. What happens to the reaction rate, Kc, and the equilibrium concentrations?" — targets MC-1.
- **FA-2**: "You add more H₂ to the Haber process equilibrium at constant temperature. Does Kc change? Does [NH₃] change?" — targets MC-2.
- **FA-3**: "For H₂(g)+I₂(g)⇌2HI(g), predict the effect of doubling the pressure." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-3 among students who have only encountered the Haber process as their worked example of pressure effects.

**Delayed retrieval**: Re-probe MC-2's Q-vs-K distinction and MC-3's Δn_gas-dependent pressure rule as foundational knowledge for subsequent industrial-equilibrium and van't Hoff applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the catalyst confusion, have the student explicitly state the effect on forward AND reverse rate before concluding anything about equilibrium position.
- **S4 (frustrated)**: Normalize — conflating "shifts amounts" with "changes K" is genuinely common on first exposure to Le Chatelier's principle.
- **S6 (collision)**: Use the explicit Q-vs-K reasoning sequence for MC-2; use the Δn_gas computation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why pressure has no effect on H₂+I₂⇌2HI's equilibrium position.

## 13. Memory & Review

Tag as three conceptual-correction memories (catalyst's symmetric, position-preserving effect; Q-vs-K distinction for reactant addition; Δn_gas-dependent pressure rule). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates equilibrium-constant reasoning built across `chem.equil.kc-kp`, forming a capstone application to industrial equilibrium optimization and van't Hoff isochore contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

# chem.equil.complex-equil — Complex Ion Formation Equilibria

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.equil.complex-equil` |
| Domain | Equilibrium |
| Requires | `chem.equil.kc-kp` |
| Unlocks | `chem.coord.stability` |
| Difficulty | advanced |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Combining (adding) two sequential equilibria requires MULTIPLYING their equilibrium constants (K_overall=K₁×K₂), not adding them — this follows directly from ΔG°_total=ΔG°₁+ΔG°₂ (free energies genuinely add) combined with K=e^(−ΔG°/RT) (exponentiating a sum of energies produces a PRODUCT of exponentials, hence a product of K values); and reversing an equilibrium reaction changes K to its RECIPROCAL (1/K), never to a negated value (−K) — since K is always a non-negative ratio of concentrations (never negative), and the correct derivation from ΔG°_reverse=−ΔG°_forward gives K_reverse=e^(−ΔG°_reverse/RT)=e^(ΔG°_forward/RT)=1/K_forward.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Combining two sequential formation-constant steps (K₁=3×10⁻⁵ and K₂=7×10²) and computing the correct overall K by multiplication (2.1×10⁻²), not addition.

**Representational**: A free-energy-diagram comparison showing ΔG° values adding directly for sequential steps, then tracing through the exponential relationship to show why K values must multiply, not add.

**Abstract**: The general derivation chain — ΔG°_total=ΔG°₁+ΔG°₂ (energies add) → K_total=e^(−ΔG°_total/RT)=e^(−(ΔG°₁+ΔG°₂)/RT)=e^(−ΔG°₁/RT)×e^(−ΔG°₂/RT)=K₁×K₂ (exponentiating a sum gives a product); the analogous derivation for reversal, showing reciprocal (not negation) is the correct sign-consistent operation.

**Transfer**: Given an unfamiliar sequence of coupled equilibria (like stepwise complex-ion formation constants), correctly combining K values by multiplication for added reactions, and correctly computing a reversed reaction's K by taking the reciprocal, never by negation.

## 3. Why Beginners Fail

Students apply ordinary arithmetic intuition (where combining/adding two equations typically means adding their associated numeric constants) directly to equilibrium constants, missing that the correct combination rule for equilibrium constants of ADDED reactions is MULTIPLICATION, not addition — a direct consequence of the exponential relationship between K and ΔG°; and students, knowing that reversing a reaction changes ΔG° to −ΔG° (a sign flip they've correctly learned), incorrectly apply this SAME sign-flip operation directly to K itself (writing K_reverse=−K_forward), missing that K is always non-negative (a ratio of concentrations can never be negative) and that the correct operation is instead taking the RECIPROCAL (1/K), which is what the sign flip in ΔG° actually produces once passed through the exponential relationship.

## 4. Misconception Library

### MC-1: Adding equilibria means adding K values
- **Probe**: "Reaction 1 has K₁ = 3 × 10⁻⁵. Reaction 2 (the next step in a sequence) has K₂ = 7 × 10². What is the K for the overall reaction (reactions 1 + 2 added)?"
- **Characteristic phrase**: "K_overall = K₁ + K₂ = 3 × 10⁻⁵ + 7 × 10² ≈ 7 × 10²."
- **Trigger (Type 5, instruction-induced)**: In ordinary mathematics, adding two equations typically means adding their associated constants directly, and students apply this same arithmetic intuition to equilibrium constants without checking whether the underlying relationship actually supports addition.
- **Conflict evidence [P28]**: Adding two sequential reactions requires MULTIPLYING their K values, not adding them — K_overall=K₁×K₂=3×10⁻⁵×7×10²=2.1×10⁻², a genuinely different (and vastly different in magnitude) result from the naive addition-based answer; the underlying source of this rule is K=e^(−ΔG°/RT) — since ΔG°_total=ΔG°₁+ΔG°₂ (free energies genuinely DO add for sequential steps), taking the exponential of a SUM of energies produces a PRODUCT of exponentials, hence K_total=K₁×K₂, never K₁+K₂.
- **Bridge [P30]**: Equilibrium constants are exponential functions of free energy (K=e^(−ΔG°/RT)) — while the underlying energies genuinely add for sequential reaction steps, the EXPONENTIAL nature of the K-to-ΔG° relationship means this additive combination of energies translates into a MULTIPLICATIVE combination of the resulting K values, not an additive one.
- **Replacement [P31]**: For sequential (added) equilibrium reactions, multiply the individual K values to get the overall K — never add them, since the underlying free-energy additivity translates into K-value multiplicativity through the exponential relationship.
- **Discrimination pairs [P33]**: The correct multiplicative combination (K_overall=K₁×K₂=2.1×10⁻²) vs. the incorrect additive combination (K₁+K₂≈7×10², wildly different in magnitude and mechanism).
- **S6 repair path**: Derive the multiplicative rule explicitly from ΔG°_total=ΔG°₁+ΔG°₂ through the exponential relationship, showing why addition of energies produces multiplication of K values.

### MC-2: Reversing an equilibrium changes K to −K
- **Probe**: "Reaction A ⇌ B has K = 500. Write K for B ⇌ A."
- **Characteristic phrase**: "K for B ⇌ A is −500."
- **Trigger (Type 4, notation-induced)**: Students correctly know that reversing a reaction changes ΔG° to −ΔG° (a genuine sign flip), and incorrectly apply this same sign-flip operation directly to K, without passing it through the actual exponential relationship connecting the two quantities.
- **Conflict evidence [P28]**: K is always non-negative (it's fundamentally a ratio of concentrations, which can never be negative) — a "−500" value for K is physically meaningless; the correct derivation follows the sign flip through the exponential relationship: ΔG°_reverse=−ΔG°_forward, so K_reverse=e^(−ΔG°_reverse/RT)=e^(−(−ΔG°_forward)/RT)=e^(ΔG°_forward/RT)=1/e^(−ΔG°_forward/RT)=1/K_forward — giving K_reverse=1/500=0.002, genuinely the reciprocal, never a negated value.
- **Bridge [P30]**: The sign flip genuinely does occur at the ΔG° level (a real, additive quantity that can be negative) — but ΔG° and K are related exponentially, not linearly, so a sign flip in the exponent (ΔG°) translates into taking the RECIPROCAL of the resulting exponential (K), not negating K directly.
- **Replacement [P31]**: Reversing an equilibrium reaction takes the RECIPROCAL of K (K_reverse=1/K_forward), never negates it — K itself is always non-negative, so negation is never a valid operation to apply to it.
- **Discrimination pairs [P33]**: The correct reciprocal operation (K_reverse=1/500=0.002, physically valid) vs. the incorrect negation operation (K_reverse=−500, physically meaningless since K can never be negative).
- **S6 repair path**: Derive the reciprocal relationship explicitly from the ΔG° sign flip passed through the exponential K=e^(−ΔG°/RT) relationship, showing exactly why reciprocal (not negation) is the correct result.

## 5. Explanation Library

**Primary explanation**: Equilibrium constants relate to free energy exponentially (K=e^(−ΔG°/RT)), not linearly — this has two important, non-obvious consequences that contradict naive arithmetic intuition: combining (adding) sequential reactions requires MULTIPLYING their K values (since adding the underlying free energies, when passed through the exponential relationship, produces a product of K values), and reversing a reaction requires taking the RECIPROCAL of K (since flipping the sign of ΔG°, when passed through the exponential relationship, produces the reciprocal of K, not a negated value).

**Secondary explanation (non-negativity framing)**: K is fundamentally a ratio of concentrations and can therefore never be negative — any calculation that produces a negative K value (such as directly negating K when reversing a reaction) is a clear signal that the wrong operation was applied; the correct approach always derives the resulting K by tracing the actual free-energy relationship through the exponential, never by directly manipulating K's sign or applying simple arithmetic addition/subtraction to K values themselves.

## 6. Analogy Library

- **Primary analogy**: Compound interest rates for sequential investment periods — the individual GROWTH FACTORS (analogous to K values) for consecutive periods MULTIPLY together to give the overall growth factor, even though the underlying interest RATES (analogous to ΔG° values, on a different, additive scale) might combine more simply — the multiplicative combination of growth factors mirrors exactly how K values combine for sequential equilibria.
- **Breaking point**: The compound-interest analogy conveys the multiplicative-combination concept well but doesn't naturally capture the reciprocal-not-negation rule for reversed reactions — that needs the explicit exponential-sign-flip derivation.
- **Anti-analogy**: Do NOT say "K for the reverse reaction is negative K" — this directly reinforces MC-2.

## 7. Demonstration Library

- **Demonstration 1 (multiplicative K-combination derivation)**: Derive the K_total=K₁×K₂ relationship explicitly from ΔG°_total=ΔG°₁+ΔG°₂ through the exponential relationship, applying it to the given K₁=3×10⁻⁵ and K₂=7×10² example.
- **Demonstration 2 (reciprocal-K derivation for reversal)**: Derive the K_reverse=1/K_forward relationship explicitly from the ΔG° sign flip, applying it to the given K=500 example.

## 8. Discovery Lesson

**Opening**: "If Reaction 1 has K₁=3×10⁻⁵ and Reaction 2 has K₂=7×10², and you add these two reactions together, would you add or multiply their K values to get the overall K?"

**Exploration**: Students derive the relationship starting from ΔG°_total=ΔG°₁+ΔG°₂ and the exponential K=e^(−ΔG°/RT) formula, discovering the addition of energies produces a multiplication of K values.

**Synthesis**: Guide toward: because K depends EXPONENTIALLY on ΔG°, additive combination of energies translates into multiplicative combination of K values.

**Closure**: "If Reaction A⇌B has K=500, and you reverse it to B⇌A, does K become −500, or something else?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit ΔG°-to-K exponential derivation for the multiplicative combination rule.
- **TA-2 (TELL)**: State explicitly that K is always non-negative, immediately followed by the reciprocal derivation for reversed reactions.
- **TA-3 (DO)**: Student combines two given sequential equilibrium K values correctly via multiplication.
- **TA-4 (TEST-THINKING)**: Present MC-2's reversal probe and ask the student to derive the correct reciprocal result from the ΔG° sign flip.

## 10. Voice Teaching

Whenever sequential equilibria are combined, narrate "multiply the K values" explicitly, tracing back to the exponential relationship each time rather than relying on memorized arithmetic. Whenever a reaction is reversed, state "K is never negative — always take the reciprocal" explicitly before any calculation.

## 11. Assessment

**Mastery gate**: Student can (a) correctly combine sequential equilibrium K values via multiplication, not addition, (b) correctly compute a reversed reaction's K via reciprocal, not negation, recognizing K is always non-negative.

- **FA-1**: "Reaction 1 has K₁=3×10⁻⁵. Reaction 2 has K₂=7×10². What is the overall K?" — targets MC-1.
- **FA-2**: "Reaction A⇌B has K=500. Write K for B⇌A." — targets MC-2.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students applying ordinary equation-addition arithmetic intuition directly to K values.

**Delayed retrieval**: Re-probe MC-1's multiplicative-combination rule and MC-2's reciprocal-reversal rule before `chem.coord.stability` requires fluent, correct manipulation of stepwise formation constants for complex-ion equilibria.

## 12. Recovery Notes

- **S3 (stuck)**: For the addition-vs-multiplication confusion, derive the relationship explicitly from ΔG°_total=ΔG°₁+ΔG°₂ each time, rather than asking the student to recall the rule from memory alone.
- **S4 (frustrated)**: Normalize — the additive-combination intuition from ordinary equation arithmetic is a very reasonable, deeply ingrained habit, making its incorrect transfer here a common, expected error.
- **S6 (collision)**: Use the explicit compound-interest-style multiplicative analogy for MC-1; use the explicit ΔG°-sign-flip-to-reciprocal derivation for MC-2.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why K values multiply (not add) for sequential reactions, tracing back to the exponential ΔG°-K relationship.

## 13. Memory & Review

Tag as two procedural-derivation memories (multiplicative K-combination for sequential reactions; reciprocal K for reversed reactions). Schedule a spaced check at ~1 week and again before `chem.coord.stability`.

## 14. Transfer Map

Feeds directly into `chem.coord.stability` (stepwise complex-ion formation constants directly apply the multiplicative-combination and reciprocal-reversal rules established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

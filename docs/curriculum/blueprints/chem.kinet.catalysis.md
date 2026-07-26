# chem.kinet.catalysis — Catalysis

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.kinet.catalysis` |
| Domain | Chemical Kinetics |
| Requires | `chem.kinet.arrhenius` |
| Unlocks | `chem.surface.adsorption` |
| Difficulty | proficient |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

A catalyst does NOT shift equilibrium position or change K — it lowers activation energy EQUALLY for both forward and reverse reactions, increasing both rates by the same factor, so the ratio kf/kr=K remains unchanged; a catalyst is NOT consumed overall — though it may appear consumed in an early mechanistic step, it is REGENERATED in a later step (canceling out of the net equation), distinguishing it from an intermediate (which is PRODUCED first, then consumed, the opposite temporal pattern); and rate enhancement from lowering activation energy is NOT proportional (linear) to the Ea reduction — the Arrhenius equation's exponential relationship (k∝e^(−Ea/RT)) means even a modest Ea reduction produces an enormous rate increase (halving Ea from 80 to 40 kJ/mol at 298K increases rate by a factor of roughly 10 million, not merely 2×).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Adding a catalyst to a reaction already at equilibrium and observing that product concentration doesn't change, despite the reaction now proceeding faster in both directions.

**Representational**: A mechanism diagram showing a catalyst (like NO in SO₂ oxidation) appearing as a reactant in step 1 and reappearing as a product in step 2, canceling out of the overall summed equation.

**Abstract**: The general principle that a catalyst symmetrically lowers Ea for both forward and reverse pathways (leaving K, the RATIO of rate constants, unchanged); the general exponential (not linear) relationship between Ea and rate via the Arrhenius equation.

**Transfer**: Given an unfamiliar catalyzed reaction or mechanism, correctly predicting that equilibrium position/K is unaffected by catalysis, correctly identifying a catalyst (consumed-then-regenerated) versus an intermediate (produced-then-consumed) from a mechanism, and correctly computing the (exponentially large) rate enhancement from a given Ea reduction.

## 3. Why Beginners Fail

Students hear "catalyst makes reaction go faster" and extend this into "more product forms," conflating reaction RATE (how quickly equilibrium is reached) with equilibrium EXTENT (how much product exists at equilibrium), missing that a catalyst speeds up both forward and reverse reactions equally, leaving K and the equilibrium position genuinely unchanged; they observe a catalyst being consumed in an early mechanistic step and stop tracking it there, missing that catalysts are specifically REGENERATED in a later step (making them absent from the overall net equation), a temporal pattern opposite to intermediates (which are produced first, then consumed); and they assume rate enhancement scales linearly with Ea reduction (halving Ea should double the rate), missing the Arrhenius equation's genuinely exponential relationship, where even modest Ea reductions produce enormous, multi-order-of-magnitude rate increases.

## 4. Misconception Library

### MC-1: A catalyst shifts the equilibrium position
- **Probe**: "You add a catalyst to a reaction at equilibrium. What happens to K? What happens to [products]?"
- **Characteristic phrase**: "The catalyst shifts the equilibrium to the right, increasing product concentration."
- **Trigger (Type 1, overgeneralization of "catalyst increases reaction")**: Students hear "catalyst makes reaction go faster" and directly (but incorrectly) extend this into "more product forms," conflating reaction rate with equilibrium extent.
- **Conflict evidence [P28]**: At equilibrium, forward and reverse rates are already exactly equal — a catalyst lowers activation energy EQUALLY for both directions, increasing BOTH the forward and reverse rate by the SAME factor; since K=kf/kr, and both kf and kr increase by the identical factor, this ratio (K) remains genuinely UNCHANGED — the equilibrium position and [products] are unaffected by the catalyst; the catalyst only speeds up how QUICKLY a non-equilibrium mixture REACHES that same equilibrium position, never changing where that position actually is.
- **Bridge [P30]**: "Faster reaction" describes RATE (how quickly equilibrium is approached), while "more product" describes EQUILIBRIUM POSITION (where the reaction settles) — these are entirely separate properties, and a catalyst's symmetric effect on both forward and reverse rates specifically preserves the ratio (K) that determines equilibrium position, even while dramatically changing how fast that position is reached.
- **Replacement [P31]**: A catalyst increases reaction rate (speed of reaching equilibrium) without changing K or equilibrium position/[products] — it lowers Ea equally for both forward and reverse reactions.
- **Discrimination pairs [P33]**: "Reaches equilibrium faster" (correct catalyst effect) vs. "produces more product at equilibrium" (incorrect — K, and hence equilibrium position, is unchanged).
- **S6 repair path**: Present the kf/kr=K relationship explicitly, showing that equal proportional increases to both kf and kr leave the ratio unchanged.

### MC-2: A catalyst is consumed during the reaction
- **Probe**: "In the NO-catalysed oxidation of SO₂, NO appears in step 1 as a reactant. Is NO consumed overall?"
- **Characteristic phrase**: "NO is used up in step 1, so it's consumed."
- **Trigger (Type 5, instruction-induced)**: Students read the first mechanistic step and see the catalyst apparently consumed there, but don't continue reading to a later step where it reappears as a product, missing the full picture.
- **Conflict evidence [P28]**: Writing out the NET equation (summing ALL mechanistic steps together) shows NO appearing as a reactant in step 1 and as a PRODUCT in step 2 — these cancel out algebraically, meaning NO does NOT appear at all in the overall summed equation, confirming it is genuinely regenerated, not net-consumed; the key distinguishing pattern: an INTERMEDIATE is produced FIRST (in an early step) and consumed LATER (in a subsequent step), while a CATALYST is consumed FIRST (in an early step) and regenerated LATER — both ultimately cancel from the overall equation, but via opposite temporal sequences.
- **Bridge [P30]**: Judging a species's overall role from only ONE mechanistic step (the first one it appears in) misses the full picture — the correct test is always to sum ALL steps into the net overall equation and check whether the species cancels out entirely, which reveals both intermediates and catalysts equally, distinguished only by which temporal role (produced-then-consumed vs. consumed-then-regenerated) each plays.
- **Replacement [P31]**: A catalyst is consumed in an early step and regenerated in a later step, canceling from the overall net equation — never conclude a catalyst is "consumed overall" from examining only its first appearance in the mechanism.
- **Discrimination pairs [P33]**: An intermediate (produced first, then consumed — opposite temporal order) vs. a catalyst (consumed first, then regenerated) — both cancel from the net equation, but via genuinely different sequences.
- **S6 repair path**: Sum all mechanistic steps explicitly, showing NO's cancellation directly, and contrast this with an intermediate's opposite temporal pattern.

### MC-3: Rate enhancement is proportional to Ea reduction
- **Probe**: "If a catalyst halves the activation energy from 80 kJ/mol to 40 kJ/mol at 298 K, estimate how much faster the reaction is."
- **Characteristic phrase**: "The reaction is twice as fast because the Ea is halved."
- **Trigger (Type 2, perceptual intuition of linearity)**: Students treat "smaller Ea → faster reaction" as a simple, linear (proportional) relationship, missing the genuinely exponential Arrhenius dependence.
- **Conflict evidence [P28]**: Using the Arrhenius equation, k∝e^(−Ea/RT), the ratio of rates is exp(−40000/RT)/exp(−80000/RT)=exp(40000/(8.314×298))=exp(16.1)≈10,000,000 — halving Ea from 80 to 40 kJ/mol genuinely produces a rate increase of approximately 10 MILLION-fold, not merely 2-fold as a linear (proportional) assumption would predict.
- **Bridge [P30]**: The Arrhenius equation's Ea term sits inside an EXPONENTIAL function, not a linear one — this means even modest absolute reductions in Ea correspond to dramatic, multiplicative rate changes, since the exponential amplifies small changes in its argument into enormous changes in its output value.
- **Replacement [P31]**: Rate enhancement from Ea reduction follows the exponential Arrhenius relationship, never a simple proportional/linear one — compute the actual ratio using k∝e^(−Ea/RT) rather than estimating a linear scaling.
- **Discrimination pairs [P33]**: The naive linear estimate ("Ea halved, so rate doubles," WRONG) vs. the correct exponential computation ("Ea halved, rate increases ~10 million-fold," CORRECT).
- **S6 repair path**: Compute the exact exponential ratio explicitly for the given example, showing the dramatic, multi-order-of-magnitude result directly.

## 5. Explanation Library

**Primary explanation**: A catalyst provides an alternative reaction pathway with lower activation energy, but this lowering applies EQUALLY to both the forward and reverse directions of a reaction — since the equilibrium constant K is the ratio of forward to reverse rate constants (kf/kr), and both increase by the same factor, K (and hence equilibrium position) remains genuinely unchanged; only the RATE of reaching that equilibrium is affected.

**Secondary explanation (catalyst-role and exponential-rate framing)**: A catalyst is consumed in an early mechanistic step and regenerated in a later one, canceling from the overall net equation — distinguished from an intermediate (produced first, then consumed) by the opposite temporal sequence; both must be identified by summing the full mechanism, not by examining a single step alone. Separately, rate enhancement from a catalyst's Ea reduction follows the Arrhenius equation's exponential relationship, meaning even modest Ea reductions produce dramatic, multi-order-of-magnitude rate increases, never a simple proportional scaling.

## 6. Analogy Library

- **Primary analogy**: A toll road with a temporary discount applied EQUALLY to traffic going both directions (forward and reverse) — more cars flow both ways faster, but the eventual balance point (how many cars end up on each side, analogous to equilibrium position) doesn't change, since both directions benefited equally from the discount.
- **Breaking point**: The toll-road analogy conveys the symmetric-effect-on-K concept well but doesn't naturally capture the catalyst-vs-intermediate temporal distinction or the exponential rate-Ea relationship — those need the explicit mechanism-summing and Arrhenius-computation arguments.
- **Anti-analogy**: Do NOT say "a catalyst shifts equilibrium toward more product" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (kf/kr=K symmetric-scaling demonstration)**: Present hypothetical kf and kr values before and after adding a catalyst, both scaled by the same factor, showing K (their ratio) stays unchanged.
- **Demonstration 2 (Arrhenius exponential rate-ratio computation)**: Compute the exact rate-enhancement ratio explicitly for the given 80-to-40 kJ/mol example, showing the ~10-million-fold result directly.

## 8. Discovery Lesson

**Opening**: "If you add a catalyst to a reaction that's already at equilibrium, does the amount of product present change?"

**Exploration**: Students trace how a catalyst affects both forward and reverse rate constants equally, discovering K (their ratio) is unaffected.

**Synthesis**: Guide toward: catalysts affect rate (how fast equilibrium is reached), never equilibrium position (K, [products]).

**Closure**: "If halving Ea doesn't just double the rate, how much faster is a reaction with Ea cut in half?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the kf/kr=K symmetric-scaling demonstration explicitly.
- **TA-2 (TELL)**: State the catalyst-consumed-then-regenerated pattern explicitly, worked through with the NO/SO₂ mechanism summing.
- **TA-3 (DO)**: Student computes the exact Arrhenius rate-enhancement ratio for a given Ea reduction.
- **TA-4 (TEST-THINKING)**: Present MC-2's NO probe and ask the student to sum the full mechanism to confirm NO's regeneration.

## 10. Voice Teaching

Whenever a catalyst's effect is discussed, state explicitly "rate changes, K does not" before any further explanation. Whenever a catalyst's role in a mechanism is assessed, always sum ALL steps before concluding whether it's net-consumed, never judging from a single step alone.

## 11. Assessment

**Mastery gate**: Student can (a) correctly explain that a catalyst leaves K and equilibrium position unchanged, affecting only rate, (b) correctly identify a catalyst (consumed-then-regenerated) versus an intermediate (produced-then-consumed) by summing a full mechanism, (c) correctly compute the exponential (not linear) rate enhancement from a given Ea reduction.

- **FA-1**: "You add a catalyst to a reaction at equilibrium. What happens to K? What happens to [products]?" — targets MC-1.
- **FA-2**: "In the NO-catalysed oxidation of SO₂, is NO consumed overall?" — targets MC-2.
- **FA-3**: "If a catalyst halves Ea from 80 to 40 kJ/mol at 298K, how much faster is the reaction?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-3 among students applying an intuitive linear-scaling assumption to the Ea-rate relationship.

**Delayed retrieval**: Re-probe MC-1's K-unchanged principle and MC-3's exponential relationship before `chem.surface.adsorption` requires fluent, correct catalytic-mechanism and kinetics reasoning.

## 12. Recovery Notes

- **S3 (stuck)**: For the equilibrium-shift confusion, present the kf/kr=K relationship directly and have the student verify that equal-factor scaling of both leaves K unchanged.
- **S4 (frustrated)**: Normalize — "faster reaction = more product" is a very reasonable, common conflation of rate and extent, given how casually "the reaction goes further/better" language is sometimes used.
- **S6 (collision)**: Use the explicit mechanism-summing exercise for MC-2; use the explicit exponential-ratio computation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a catalyst speeds up a reaction without changing how much product ultimately forms.

## 13. Memory & Review

Tag as three conceptual-correction memories (catalyst leaves K unchanged; catalyst-vs-intermediate temporal distinction; exponential Ea-rate relationship). Schedule a spaced check at ~1 week and again before `chem.surface.adsorption`.

## 14. Transfer Map

Feeds directly into `chem.surface.adsorption` (heterogeneous catalysis and surface adsorption mechanisms directly extend the catalytic reasoning established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

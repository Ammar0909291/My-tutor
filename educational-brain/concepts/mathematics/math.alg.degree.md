# math.alg.degree

## Identity
- **KG ID**: `math.alg.degree`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.polynomial` — load-bearing part: the term/coefficient structure and standard form. Degree is a property read off that structure, so a learner who cannot write standard form cannot locate it reliably.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5)
- **Estimated hours**: 1
- **Blueprint**: `docs/curriculum/blueprints/math.alg.degree.md` (reused by reference throughout)

## Learning Objective
- The learner can state the degree of a single-variable polynomial as its highest exponent.
- The learner can compute the degree of a multivariable *term* as the **sum** of its exponents, and of a multivariable polynomial as the largest such sum.
- The learner can state that degree is an **upper bound** on the number of real roots, not the exact count.
- The learner can exclude a zero-coefficient term when determining degree.

## Core Understanding
For a single-variable polynomial the degree is the highest exponent present. Two refinements make this node worth its own place. First, for a *multivariable* term the degree is the **sum** of all exponents in that term — 5x³y² has degree 5, not 3 — and the polynomial's degree is the largest of those sums, so 4x²y³ + x⁷ has degree 7 while 4x²y³ + x⁴ has degree 5. Second, degree bounds root count from above but does not determine it: a degree-3 polynomial has *at most* 3 real roots and may have 1 (x³ + x has only x = 0 as a real root); a degree-2 polynomial may have 2, 1 or 0. The bound is exact only over ℂ, counting multiplicity, which is the Fundamental Theorem of Algebra and belongs downstream. Finally, degree is determined by the terms that are actually *present*: a term written with coefficient 0 contributes nothing, so 0x⁵ + 3x² is degree 2.

## Mental Models
1. **Beginner — the biggest exponent.** Scan the exponents, take the largest. *Upgrade trigger*: a term with two variables. *Shelf life*: correct for the single-variable case and silently wrong the first time xy appears.
2. **Intermediate — degree is per-term, then maximised.** Compute each term's degree, then take the largest. This one procedure covers both cases and is the model to install, because it makes the multivariable rule a special case rather than an exception.
3. **Advanced — degree as a budget.** Degree n buys at most n roots and n+1 coefficients, and fixes the end behaviour. *Upgrade trigger*: meeting a cubic with one real root and needing the bound to still be true.
4. **Expert — degree over ℂ with multiplicity.** Exactly n roots, always, once complex roots and multiplicities are counted. *Shelf life*: forward pointer to `math.alg.fundamental-theorem-algebra`.

## Why Students Fail
Both failures are generalisations from a clean sample. Every polynomial in a first course has one variable, so "highest exponent" is learned as a *lookup* rather than as a *computation*, and when xy² arrives there is nothing in the learned rule that says to add. And every quadratic used to teach root-finding has two roots, because those are the ones that factor nicely, so "degree n means n roots" is a correct summary of everything the learner has seen. Neither is careless reasoning; both are correct induction over a biased curriculum, which is why both are prevented far more cheaply by widening the example set than by repairing afterwards.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry, with birth-type classification added.

- **MC-1 — MULTIVARIABLE-TERM-DEGREE-COMPUTED-AS-MAX-NOT-SUM** (foundational)
  - **Birth type**: Type 1, overgeneralisation. In the single-variable case max and sum coincide (there is one exponent), so the learner cannot have distinguished them from the evidence available. The rule they hold is not wrong about anything they have seen.
  - **Characteristic phrase**: "5x³y² is degree 3."
  - **Detection probe** (verbatim): "What is the degree of 5x³y²?"
  - **Repair**: Blueprint Repair Action B01 — expand the term: x³y² is x·x·x·y·y, five factors, degree 5. Degree counts *factors*, and counting is what makes the sum inevitable rather than stipulated.
  - **Verification of death**: correct degree on 4x²y³ + x⁴, where the max-reading (4) and the sum-reading (5) give different polynomial degrees.

- **MC-2 — DEGREE-ASSUMED-TO-EQUAL-EXACT-REAL-ROOT-COUNT** (foundational)
  - **Birth type**: Type 5, instruction-induced by example selection. Textbook quadratics factor; factorable quadratics have two real roots. The sample never contained a counterexample.
  - **Characteristic phrase**: "it's a cubic, so it has three roots."
  - **Detection probe**: "How many real roots does x² + 1 have? How many does x³ + x have?"
  - **Repair**: Blueprint Repair Action B02 — the two counterexamples, computed. x² + 1 is never zero for real x; x³ + x = x(x² + 1) is zero only at x = 0. The word "at most" then arrives as a summary of something observed rather than a hedge.
  - **Verification of death**: the learner states the bound with "at most" unprompted, and can produce a cubic with one real root.

- **MC-3 — ZERO-COEFFICIENT-TERM-INCLUDED-IN-DEGREE-DETERMINATION** (moderate)
  - **Birth type**: Type 4, notation-induced. A written 0x⁵ looks like a degree-5 term because the x⁵ is on the page; the learner reads the symbol rather than the value.
  - **Characteristic phrase**: "0x⁵ + 3x² is degree 5."
  - **Detection probe**: "What is the degree of 0x⁵ + 3x²?"
  - **Repair**: Blueprint Repair Action B03 — evaluate 0x⁵ at any value: it is 0, always, so the polynomial *is* 3x², which is degree 2. The term is not merely negligible; it is absent.
  - **Verification of death**: the learner simplifies before determining degree, as a matter of course.

## Analogies
- **Best — counting factors.** Degree is how many variable factors a term has when fully expanded. x³y² has five, so degree 5. This single framing makes the multivariable rule a consequence rather than an extra rule, and it is the only analogy needed here.
- **Alternative — degree as a seat count.** A degree-n polynomial has n seats for roots; some may be empty (no real root) or double-booked (repeated roots). Carries the *upper bound* idea, which the counting analogy does not.
- **Story analogy** — none; this is a one-hour concept and narrative would cost more than it returns.
- **ANTI-ANALOGY — "degree is the highest power you can see."** True in the single-variable case, false for multivariable terms, and false when a zero coefficient is written out. It installs MC-1 and MC-3 simultaneously and is the natural short summary, which is why it must be replaced deliberately with "count the factors in each term".
- **ANTI-ANALOGY — "degree n means n roots."** Installs MC-2 in four words, and it is very nearly true — exactly true over ℂ with multiplicity — which is what makes it so durable. Always say "at most n real roots".

## Demonstrations
- **The factor count.** Write x³y² as x·x·x·y·y and count. *Elicit the prediction first*: "what's the degree of 5x³y²?" — the prediction is the diagnostic, the expansion is the correction, and together they take twenty seconds.
- **The root-count counterexamples.** Graph or evaluate x² + 1 and x³ + x. *Predict first*: "how many real roots?" MC-2 shows up as "two" and "three".
- **The zero-coefficient simplification.** 0x⁵ + 3x², simplified before being asked for. *Predict first*, then simplify, then ask again. The answer changes, which is the point.

## Discovery Questions
**Direct instruction for the naming convention, genuine discovery for both refinements** — and the split is worth stating to the learner, because the two refinements are exactly where the value is.
1. **Stated**: degree of a single-variable polynomial is the highest exponent. A convention; no discovery available.
2. **Discovery, MC-1**: "Expand x³y² into individual factors. How many are there? Now: what should its degree be?" The learner derives the sum rule from counting.
3. **Discovery, MC-2**: "A cubic has degree 3. Sketch or evaluate x³ + x. How many times does it cross zero?" The learner finds one, and the exact-count belief breaks against their own computation.
4. **Compression**: "Count the factors per term, take the biggest. And degree caps the roots — it doesn't count them."

## Teaching Sequence
The Blueprint's teaching actions own the turn-level scripts. The load-bearing constraint at a one-hour concept is example composition rather than sequencing: **a multivariable term and a root-count counterexample must both appear inside the hour**, because both misconceptions are created by a clean sample and neither can be detected — let alone repaired — without a dirty one. Concretely: do not teach degree on x³ + 2x² + 1 and then test on it. Second, **simplification must precede degree determination as a fixed habit**, which disposes of MC-3 without ever discussing it. Third, the at-most-n-roots bound is *stated and demonstrated* here but not proven; the proof runs through the Factor Theorem and belongs to `math.alg.polynomial-roots`, and the Fundamental Theorem of Algebra's exact-count-over-ℂ refinement belongs further still.

## Tutor Actions
- **TEST-THINKING: Prediction** — degree of 5x³y², and root count of x² + 1, both taken before teaching. First action; two predictions catch two foundational misconceptions in under a minute.
- **DO: Worked Example** — the factor expansion and count.
- **ORGANIZE: Representation Table** — term / exponents / sum / degree, run across single- and multi-variable terms in the same table so the rule is visibly one rule.
- **TEST-THINKING: Error Analysis** — "a student says every cubic has three roots. Find a cubic that disproves it."
- **Does NOT fit: drill on single-variable degree.** It is already easy, it consumes the whole hour, and it deepens exactly the sample bias that causes both misconceptions.

## Voice Teaching Notes
The load-bearing phrase is "at most" — two words, and their omission is MC-2. Say "at most three real roots", never "three roots", every time. Listen for the learner reading 5x³y² aloud as "five x cubed y squared" and then answering "three": the pause between reading the full term and answering with only part of it is audible, and it is MC-1 in real time. Listen for "so it has n roots" as a confident throwaway; it will be delivered as background knowledge rather than as an answer, which is how it passes unexamined. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **3 given for 5x³y²** — MC-1, fast and confident. Undetectable on any single-variable probe, which is most of them.
- **Exact root counts asserted** — MC-2. Note it typically coexists with entirely correct degree extraction, so a degree-only gate certifies it intact.
- **Degree 5 for 0x⁵ + 3x²** — MC-3, and it only appears if a zero coefficient is deliberately written, which never happens naturally. Include one.
- **Correct degree for a multivariable polynomial where max and sum happen to agree** — non-diagnostic. Check the probe before reading the result: 4x²y³ + x⁴ discriminates, 4x²y³ + x⁶ does not.
- **Mastery trigger**: the Blueprint's gate at MAMR 5/5, with the added requirement that one item be a discriminating multivariable polynomial and one require the "at most" phrasing.

## Tutor Recovery Strategy
Recovery is uncommon at a one-hour concept; when it happens the utterance is usually "wait, why isn't it three?" after the multivariable correction — genuine surprise rather than distress, and it should be met as such. The concept-specific smaller question is the expansion: **"Write out x³y² with no exponents at all. Just the letters. How many letters did you write?"** Five, and the answer is the degree. The learner corrects themselves in one step and the surprise converts into a rule they now own. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **fact / procedure**. Review by computing degree on a novel multivariable polynomial; single-variable review is non-informative.
- Concept-specific deviation: MC-2 regrows through the whole of algebra because the diet of nicely-factoring examples never ends. Keep a "how many real roots?" item on a polynomial with fewer roots than its degree in permanent rotation.
- Interleaving partners: `math.alg.polynomial` (the parent, whose MC-1 is the coefficient/exponent confusion — interleave so the learner keeps both readings distinct) and later `math.alg.polynomial-roots`.

## Transfer Connections
- **Near**: `math.alg.polynomial-roots`, `math.alg.fundamental-theorem-algebra`, `math.alg.polynomial-division` — all of which take degree as their controlling parameter.
- **Far**: the general distinction between a bound and a count, which recurs everywhere from complexity analysis to error estimates and is genuinely hard for learners who have only met exact answers.
- **Real-world**: the degree of a fitted model is a choice about flexibility — how many times the curve may change direction — and reading degree as a capacity rather than a label is what makes model selection intelligible.
- **Expert transfer**: total degree as the sum of exponents generalises directly to multivariable calculus, homogeneous functions, and the grading of a polynomial ring.

## Cross-Subject Connections
- **Computer science**, genuine: polynomial degree is the parameter in interpolation-based schemes (error-correcting codes, secret sharing), and the at-most-n-roots bound is precisely the security argument in Shamir's scheme — a rare case where the *bound*, not the count, is the load-bearing fact.
- **Physics**, weak but real: the degree of a kinematic polynomial in t is what bounds how many times a trajectory can reach a given height.
- The KG records no `cross_links`; the CS connection above is strong enough to be worth encoding and is recorded as feedback.

## Blueprint References
`docs/curriculum/blueprints/math.alg.degree.md`. Reused by reference, not restated: the Component 6 Misconception Registry (MC-1..MC-3) and its repair actions B01–B03, the teaching-action sequence, the spaced-repetition schedule, and the mastery gate item set. This entry adds birth-type classification, the mental-model ladder, the two anti-analogies, the factor-counting framing that makes the multivariable rule a consequence rather than an extra rule, the finding that both foundational misconceptions are created by sample bias and are therefore prevented more cheaply than repaired, and the discriminating-probe requirement (max and sum must disagree, or the probe measures nothing).

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
Records the other half of the finding logged at `math.alg.polynomial`: this node is a one-hour child of a ten-hour parent whose Blueprint already teaches single-variable degree in full, as the repair for its own foundational misconception. The division that emerges in practice — parent owns single-variable degree, child owns multivariable degree and the root bound — is sound, but it is not visible from either KG description, and a reader of the KG alone would reasonably conclude the child is redundant. This is now the third instance of the pattern in this domain (also `math.alg.exponent-rules` versus its three extension nodes, and `math.alg.equation` versus `math.alg.solution-set`). Recorded for the Curriculum Production Pipeline as a domain-level observation rather than a per-node defect.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).

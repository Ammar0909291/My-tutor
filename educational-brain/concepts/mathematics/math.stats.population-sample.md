# math.stats.population-sample

## Identity
- **KG id**: `math.stats.population-sample`
- **Domain**: math.stats
- **Requires**: `math.arith.fractions`
- **Unlocks**: `math.stats.descriptive-statistics`, `math.stats.sampling`
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
Define the POPULATION as the complete set of units of interest and the SAMPLE as the subset
actually studied, using $N$ and $n$ respectively and the sampling fraction $n/N$ (reusing
`math.arith.fractions`'s own machinery directly); recognize that a REPRESENTATIVE sample —
determined by sampling METHOD, never size alone — is required for valid inference; and recognize
that a population is any well-defined collection of units, never restricted to people.

## Core Understanding
A SAMPLE STATISTIC ESTIMATES A POPULATION PARAMETER — THE TWO ARE NEVER THE SAME NUMBER: the
population is the complete group under study ($N$ units); the sample is the subset actually
examined ($n$ units), with sampling fraction $n/N$. A student surveying 25 classmates and finding
80% own a smartphone has measured a SAMPLE result; concluding "80% of all teenagers own a
smartphone" conflates that sample statistic with the (unknown) population parameter — the correct
statement is that the sample result ESTIMATES, never establishes, the population value.

REPRESENTATIVENESS COMES FROM SAMPLING METHOD, NEVER FROM SIZE ALONE: a larger sample amplifies a
biased method rather than fixing it. The 1936 Literary Digest poll surveyed 2.4 MILLION Americans
via telephone directories and car registrations (systematically excluding poorer voters) and
predicted the wrong president; a Gallup poll of just 50,000 RANDOMLY selected voters called the
election correctly — method beat size by a ratio of 48 to 1. A voluntary online poll of 5,000
respondents over-represents people with strong opinions (self-selection); a random phone-dialed
sample of 500 avoids that bias despite being ten times smaller.

A POPULATION IS ANY WELL-DEFINED COLLECTION, NEVER RESTRICTED TO PEOPLE: a factory's daily output
of 50,000 bolts, a lake's fish, a colony of 3,000 lab mice, or even a conceptually infinite set of
future coin flips are all genuine statistical populations — the everyday sense of "population"
(human residents) is only one special case of the general statistical meaning.

## Mental Models
- **"A sample is a spoonful of soup — its value as an estimate depends entirely on the pot being
  well-stirred (representative), not on the spoon's size."**
- **"Sampling method determines validity; sample size only determines precision — a larger biased
  sample is still biased, never fixed by volume alone."**

## Why Students Fail

### MC-1: SAMPLE-IS-POPULATION
- **Surface form**: treats sample results as definitive truth for the entire population without
  qualification, e.g. "I surveyed 30 students, 60% prefer pizza, so 60% of all students prefer
  pizza."
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  the sample-versus-population distinction goes unstated in casual reasoning about data).
- **Repair**: re-anchor on the sample-statistic-versus-population-parameter distinction directly,
  restating the claim as an estimate rather than a fact.

### MC-2: LARGER-IS-ALWAYS-BETTER
- **Surface form**: believes a much larger sample is always more accurate, regardless of how it
  was selected.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared trigger — "more data = more
  accurate" is intuitive but doesn't account for sampling bias).
- **Repair**: re-walk the Literary Digest counterexample, confirming method beats size directly.

### MC-3: POPULATION-IS-PEOPLE
- **Surface form**: cannot identify the population in a study of manufactured parts, tree
  heights, or bacteria counts, insisting "there's no population here — it's not about people."
- **Birth type**: Type 3, language contamination (Blueprint's own declared trigger — everyday
  usage of "population" means human residents specifically).
- **Repair**: re-anchor on the general definition — any well-defined collection of units — with a
  non-human example worked directly.

## Misconceptions

### MC-1: SAMPLE-IS-POPULATION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: LARGER-IS-ALWAYS-BETTER
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: POPULATION-IS-PEOPLE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A chef judges a whole pot of soup from one well-stirred spoonful — the spoonful (sample)
  must represent the pot (population), never merely be large."**
- **Anti-analogy**: 2.4 million biased responses do NOT beat 50,000 random ones — volume never
  substitutes for a sound sampling method.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: a school of 1,000 students (population) versus 50 randomly
  measured students (sample) for average height — the sample mean ESTIMATES, never equals with
  certainty, the true population mean.
- **Demonstration 2 (targets MC-2)**: Literary Digest's 2.4 million biased responses (wrong
  prediction) versus Gallup's 50,000 random responses (correct prediction) — method decisively
  outweighs raw size.
- **Demonstration 3 (targets MC-3)**: a pharmaceutical trial's population is all 3,000 lab mice in
  a colony — the sample is the 300 actually tested — no people involved at all, yet a genuine
  statistical population.

## Discovery Questions
1. "If 60% of your sample prefers X, does that mean exactly 60% of the whole population prefers
   X?"
2. "Is a survey of 10,000 volunteers automatically more reliable than a random survey of 500?"
3. "Can a population in statistics be something other than a group of people?"

## Teaching Sequence
1. **Analogy bridge**: the soup-tasting analogy, establishing population/sample as
   complete-group-versus-studied-subset before any formal notation.
2. **Conceptual shift**: Demonstration 1's estimate-versus-fact distinction, isolating MC-1 by
   requiring the sample result be stated as an estimate.
3. **Contrast pair**: Demonstration 2's Literary Digest/Gallup comparison, isolating MC-2 by
   requiring method be evaluated independently of size.
4. **Contrast pair**: Demonstration 3's non-human population example, isolating MC-3 by requiring
   the general definition applied directly.
5. **Mastery gate**: require a correct population/sample identification for a new study, a
   correct method-versus-size evaluation, and a correct sampling-fraction computation, at the
   Blueprint's own stated pass criterion of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a sample statistic stated as a population fact without the estimate qualification.
- Never accept "bigger sample is always better" without a method-based justification.

## Voice Teaching Notes
- Say "is that a fact about the whole population, or an estimate from your sample?" whenever a
  sample result is generalized.
- When sample size is emphasized, ask "was the sample selected randomly, or could it be
  systematically biased regardless of size?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the population and sample in a new
  study.
- **Rung 2 (application)**: learner correctly computes a sampling fraction and evaluates whether
  a sampling method is likely to produce a representative result.
- **Rung 3 (transfer)**: learner correctly evaluates a NEW size-versus-method tradeoff scenario,
  and correctly identifies a non-human population in an unfamiliar applied context.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the sample-statistic-versus-population-parameter distinction.
- If MC-2 recurs, re-walk the Literary Digest counterexample directly.
- If MC-3 recurs, re-anchor on the general population definition with a non-human example.

## Memory Hooks
- "A sample estimates, it never proves, a population fact."
- "Method beats size — a biased sample stays biased no matter how large."
- "Populations are any well-defined group — never assumed to be people."

## Transfer Connections
- `math.arith.fractions` (already authored): supplies the fraction arithmetic this concept's
  sampling-fraction computation ($n/N$) directly reuses.
- `math.stats.descriptive-statistics`, `math.stats.sampling` (not yet authored): the KG's
  declared unlocks, building summary statistics and formal sampling methods on top of this
  concept's foundational population/sample distinction.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.population-sample.md`, reused by
  reference for its soup-tasting analogy, its Literary Digest/Gallup historical contrast, its
  non-human population examples, and its three-misconception registry (severity levels and
  trigger conditions adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  national tax-policy poll's population and sample, and evaluating a critic's size-based
  objection against the method-versus-size principle.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.arith.fractions`, unlocks `math.stats.descriptive-statistics`+`math.stats.sampling`,
  cross_links none, developing/understand, mastery_threshold 0.9, estimated_hours 2) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 105): authored. Second entry this batch, opening the `math.stats` domain
  (0/40 → 1/40). Companion batch concept: `math.prob.bayesian-inference`.

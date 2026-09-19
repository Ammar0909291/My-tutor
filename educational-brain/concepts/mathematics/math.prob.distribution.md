# math.prob.distribution

## Identity
- **KG id**: `math.prob.distribution`
- **Domain**: math.prob
- **Requires**: `math.prob.random-variable`, `math.prob.cdf`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Define the distribution of a random variable $X$ as its COMPLETE probabilistic description —
equivalently the CDF $F$, PMF (discrete), or PDF (continuous), each fully determining the others;
recognize that a single summary statistic (mean, median, etc.) is a LOSSY compression, never
equivalent to the full distribution; and recognize named distributions (Binomial, Uniform, Normal)
as reusable models valid only once their defining assumptions are verified, never applied on
surface resemblance.

## Core Understanding
CDF, PMF, AND PDF ARE EQUIVALENT FULL SPECIFICATIONS — NEVER DIFFERENT INFORMATION: for a fair
die roll $X$, the PMF table $p(k)=1/6$ and the CDF step function $F(x)=\lfloor x\rfloor/6$ carry
EXACTLY the same information. Computing $P(2\le X\le4)=p(2)+p(3)+p(4)=3/6$ directly from the PMF,
or via $F(4)-F(1)$ from the CDF, gives the SAME answer — neither description adds anything the
other lacks; they are interchangeable full specifications, never independent pieces of
information.

A SHARED SUMMARY STATISTIC NEVER IMPLIES A SHARED DISTRIBUTION: the die roll $X$ has
$E[X]=3.5$. A two-point variable $Y$ taking $1$ or $6$ each with probability $1/2$ ALSO has
$E[Y]=3.5$ — the SAME mean. Yet $P(3\le X\le4)=2/6$ while $P(3\le Y\le4)=0$ (Y never lands there
at all) — a concrete question the shared mean alone cannot answer. The mean is a single number
computed FROM the distribution, necessarily discarding information; two genuinely different
distributions can share it.

A NAMED DISTRIBUTION APPLIES ONLY AFTER ITS ASSUMPTIONS ARE VERIFIED, NEVER ON SURFACE
RESEMBLANCE: inspecting 10 items independently defective with probability $p=0.05$ genuinely
satisfies Binomial's defining conditions (fixed $n=10$, independent trials, constant $p$) — so
$E[X]=np=0.5$ is immediately available from established theory. If instead finding one defect made
further defects more likely (dependence), calling the count "Binomial" anyway would apply the name
without verifying its assumptions, invalidating every property borrowed from that theory.

## Mental Models
- **"The distribution is the whole story — CDF, PMF, and PDF are just different ways of telling
  it, and any single summary number is a spoiler that leaves most of the plot out."**
- **"A named distribution's name is a shortcut for an already-verified structure, never a label
  applied because a scenario vaguely resembles one."**

## Why Students Fail

### MC-1: SHARED-SUMMARY-STATISTIC-ASSUMED-TO-IMPLY-SHARED-DISTRIBUTION
- **Surface form**: believes two random variables with the same mean must have the same
  distribution.
- **Birth type**: Foundational severity (Blueprint's own declared severity — comparing groups by a
  single average while assuming that comparison captures everything meaningful is one of the most
  consequential everyday statistical reasoning errors).
- **Repair**: re-walk the die-roll-versus-two-point-variable example, computing $P(3\le\cdot\le4)$
  for each to expose the concrete difference the shared mean hides.

### MC-2: NAMED-DISTRIBUTION-APPLIED-WITHOUT-VERIFYING-ASSUMPTIONS
- **Surface form**: labels a random variable with a named distribution based on surface
  resemblance, without checking the defining assumptions genuinely hold.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "counting successes"
  sounds Binomial-like regardless of whether independence and constant probability actually hold).
- **Repair**: re-walk the quality-control example, explicitly checking $n$ fixed, independence, and
  constant $p$ before concluding Binomial applies, then contrast with a dependent-trials variant.

### MC-3: CDF-PMF-PDF-TREATED-AS-DIFFERENT-INFORMATION
- **Surface form**: believes the CDF, PMF, and PDF of the same random variable carry different or
  additional information relative to each other.
- **Birth type**: Moderate severity (Blueprint's own declared severity — presenting these as
  separate formulas in earlier coursework obscures that they are equivalent packagings of one
  underlying object).
- **Repair**: re-verify the die-roll interval probability computed identically via the PMF sum and
  the CDF difference.

## Misconceptions

### MC-1: SHARED-SUMMARY-STATISTIC-ASSUMED-TO-IMPLY-SHARED-DISTRIBUTION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: NAMED-DISTRIBUTION-APPLIED-WITHOUT-VERIFYING-ASSUMPTIONS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: CDF-PMF-PDF-TREATED-AS-DIFFERENT-INFORMATION
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The distribution is like a complete recipe; the mean is like knowing only the calorie
  count — useful, but it tells you nothing about the ingredients or how the dish actually
  tastes."**
- **Anti-analogy**: the CDF, PMF, and PDF are NOT three separate ingredients lists — they're the
  same recipe written in three interchangeable formats, always translatable into each other.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: the die-roll PMF table and CDF step-graph, both giving
  $P(2\le X\le4)=3/6$.
- **Demonstration 2 (targets MC-1)**: the die roll $X$ and two-point variable $Y$, sharing
  $E=3.5$ but disagreeing on $P(3\le\cdot\le4)$.
- **Demonstration 3 (targets MC-2)**: the quality-control Binomial verification, contrasted with a
  dependent-trials scenario where the label would be misapplied.

## Discovery Questions
1. "Do the CDF, PMF, and PDF of the same random variable carry different information, or are they
   the same complete description in different forms?"
2. "If two random variables have the same mean, do they necessarily have the same distribution?"
3. "Can you call a count of successes 'Binomial' just because it resembles counting successes, or
   must specific assumptions be checked first?"

## Teaching Sequence
1. **Representation shift**: the equivalent-forms demonstration (Demonstration 1), isolating MC-3.
2. **Conflict evidence**: the shared-mean-different-distribution demonstration (Demonstration 2),
   isolating MC-1.
3. **Contrast pair**: the named-distribution verification demonstration (Demonstration 3),
   isolating MC-2.
4. **Mastery gate**: require a correct CDF/PMF equivalence computation, a correct construction of
   two same-mean-but-different-distribution variables with a distinguishing probability question,
   and a correct assumption-verification for a Binomial scenario, at the Blueprint's own stated
   MAMR of 5/5.

## Tutor Actions
- Never accept the CDF, PMF, or PDF of a random variable described as carrying different
  information from one another.
- Never accept a claim that a shared mean (or any single summary statistic) implies a shared
  distribution.
- Never accept a named distribution applied to a scenario without the learner verifying its
  defining assumptions genuinely hold.

## Voice Teaching Notes
- Say "is that the whole distribution, or just one number computed from it?" whenever a summary
  statistic is used to compare random variables.
- When a named distribution is invoked, ask "have you checked the assumptions actually hold, or
  does this just look similar?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a probability from a PMF and confirms the
  same answer via the corresponding CDF.
- **Rung 2 (application)**: learner correctly constructs two distinct random variables sharing a
  mean and identifies a probability question distinguishing them.
- **Rung 3 (transfer)**: learner correctly explains, for two cities sharing an average temperature,
  why the shared mean doesn't imply similar day-to-day experience, and what must be verified before
  applying a named distribution to either.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the die-roll-versus-two-point-variable interval-probability contrast.
- If MC-2 recurs, re-walk the quality-control assumption-verification process.
- If MC-3 recurs, re-verify the die-roll interval probability computed identically via PMF and CDF.

## Memory Hooks
- "The distribution is the whole story — a summary statistic is a spoiler, not the plot."
- "CDF, PMF, PDF: same complete information, different packaging."
- "A named distribution's name is a shortcut for assumptions already checked, never a label
  applied on vague resemblance."

## Transfer Connections
- `math.prob.random-variable` (already authored, certified domain): supplies the discrete/
  continuous distinction and measurable-function foundation this concept's complete description
  builds on.
- `math.prob.cdf` (already authored, certified domain): supplies the CDF as one of the equivalent
  full specifications of a distribution.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.distribution.md`, reused by reference
  for its die-roll/two-point-variable contrast, its quality-control Binomial verification example,
  and its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the shared-mean-versus-
  full-distribution distinction to two cities' daily temperatures and to verifying a named
  distribution before applying it.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.random-variable`/`math.prob.cdf`, unlocks none, cross_links none, proficient/
  understand, mastery_threshold 0.85, estimated_hours 3) was directly verified against the live KG
  and matches exactly.

## Version History
- 2026-09-19 (Batch 144): authored. First entry this batch. Companion batch concept:
  `math.prob.ergodicity`.

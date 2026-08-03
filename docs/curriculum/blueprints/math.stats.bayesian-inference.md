# Teaching Blueprint: Bayesian Statistics (`math.stats.bayesian-inference`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.bayesian-inference` |
| name | Bayesian Statistics |
| domain | Statistics |
| difficulty | expert |
| bloom | evaluate |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.prob.bayes-theorem`, `math.stats.mle` |
| unlocks | (none in KG) |
| cross_links | `math.prob.bayesian-inference` |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Treats parameters as random with prior π(θ). After data x, posterior π(θ|x) ∝ L(x|θ)π(θ). Inference based on posterior: point estimates (MAP, posterior mean), credible intervals. Contrasts with frequentist CI/p-value paradigm.

 |

## Component 1 — Learning Objectives

- LO1: State the Bayesian FRAMEWORK's core move: treating the parameter $\theta$ ITSELF as RANDOM, with a PRIOR distribution $\pi(\theta)$ (representing belief BEFORE seeing data) — a fundamentally different starting point from frequentist statistics, which treats $\theta$ as a FIXED (though unknown) constant.
- LO2: Apply Bayes' theorem to compute the POSTERIOR $\pi(\theta|x)\propto L(x|\theta)\pi(\theta)$ (prior TIMES likelihood, proportional to the posterior) — recognizing this combines PRIOR belief with the OBSERVED DATA's evidence (the likelihood, from `math.stats.mle`) into an UPDATED belief.
- LO3: Contrast the Bayesian paradigm's DIRECT probability statements about $\theta$ (e.g. "there's a 95% probability $\theta$ is in this interval," from `math.stats.credible-interval`) against the frequentist paradigm's INDIRECT statements (confidence intervals and $p$-values, which are probability statements about the PROCEDURE or the DATA, never DIRECTLY about the fixed parameter itself) — these are genuinely DIFFERENT philosophical frameworks, not just different notations for the same idea.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.bayes-theorem` (the mathematical tool underlying the posterior computation) and `math.stats.mle` (the likelihood function this framework reuses and reweights by the prior).

## Component 3 — Core Explanation

**Bayesian statistics** treats the unknown parameter $\theta$ ITSELF as a RANDOM variable, assigning it a **prior distribution** $\pi(\theta)$ representing belief about $\theta$ BEFORE observing any data. This is a fundamentally DIFFERENT starting philosophy from frequentist statistics (which treats $\theta$ as a FIXED, though unknown, constant — never itself "random").

After observing data $x$, Bayes' theorem combines the prior with the data's LIKELIHOOD to produce the **posterior** distribution: $\pi(\theta|x)\propto L(x|\theta)\pi(\theta)$ — the posterior is PROPORTIONAL to the likelihood (from `math.stats.mle`'s framework) TIMES the prior, representing UPDATED belief about $\theta$ after incorporating the observed evidence.

From this posterior, various inferences follow: POINT estimates (the MAP — Maximum A Posteriori, the posterior's mode — or the posterior MEAN) and `math.stats.credible-interval`'s DIRECT probability intervals for $\theta$.

The Bayesian paradigm's key philosophical contrast with the frequentist paradigm: Bayesian credible intervals support DIRECT probability statements about $\theta$ itself (e.g. "$P(\theta\in[a,b]\mid\text{data})=0.95$"). Frequentist confidence intervals and $p$-values, by contrast, are INDIRECT — they are probability statements about the PROCEDURE (how often a randomly-repeated procedure would capture the TRUE fixed $\theta$) or about the DATA (given a fixed $\theta$), NEVER a direct probability statement about $\theta$ itself, since frequentist $\theta$ is a fixed constant, not a random variable that can "have a probability" of being anywhere.

## Component 4 — Worked Examples

**Example 1 (LO1 — the core philosophical distinction, breaking MC-1)**: Explain the KEY difference in how frequentist and Bayesian statistics treat the true population parameter $\theta$ (e.g. a true population mean). Frequentist: $\theta$ is a FIXED, unknown constant — it has ONE true value, and doesn't have "a probability distribution" of its own. Bayesian: $\theta$ is treated as RANDOM, with a probability distribution reflecting belief about its likely value, updated as data arrives. A common error assumes these two frameworks are just DIFFERENT NOTATIONS for computing the "same underlying thing," rather than recognizing they represent GENUINELY DIFFERENT philosophical starting points about what probability even MEANS when applied to a parameter.

**Example 2 (LO2 — computing a simple posterior, breaking MC-2)**: For a Beta$(2,2)$ prior on a proportion $p$, and a single observed Bernoulli success ($x=1$, likelihood $L(x|p)=p$), state the (unnormalized) posterior. Posterior $\propto L(x|p)\pi(p)\propto p\cdot p(1-p)=p^2(1-p)$ — matching a Beta$(3,2)$ form (this specific example previews `math.stats.conjugate-prior`'s Beta-Binomial conjugacy). A common error computes the posterior as simply the PRIOR alone (ignoring the likelihood/data entirely) or the LIKELIHOOD alone (ignoring the prior) — the posterior genuinely requires MULTIPLYING both together; omitting either piece defeats the entire purpose of "updating" prior belief with new data.

**Example 3 (LO3 — direct vs. indirect probability statements, breaking MC-3-merged)**: Contrast the interpretations of a 95% Bayesian CREDIBLE interval $[a,b]$ versus a 95% frequentist CONFIDENCE interval $[c,d]$ for the same parameter. Bayesian: "$P(\theta\in[a,b]\mid\text{data})=0.95$" — a DIRECT probability statement about where $\theta$ likely lies, given the observed data. Frequentist: "if this procedure were repeated many times, 95% of the resulting intervals would contain the TRUE (fixed) $\theta$" — an INDIRECT statement about the PROCEDURE's long-run behavior, NOT a direct probability about this specific interval containing $\theta$. A common error interprets the frequentist confidence interval AS IF it made the same direct probability claim as the Bayesian credible interval (e.g. "there's a 95% chance $\theta$ is in $[c,d]$") — this is precisely the common CI-misinterpretation the Bayesian/frequentist contrast is designed to clarify.

## Component 5 — Teaching Actions

### Teaching Action A01 — Frequentist vs. Bayesian: Fixed Parameter vs. Random Parameter (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting the two frameworks' fundamentally different treatment of $\theta$.

- **MC-1 hook**: this directly targets MC-1 (treating the two frameworks as merely notational variants rather than genuinely different philosophies).

### Teaching Action A02 — Posterior Requires Multiplying Both Prior and Likelihood Together (Primitive P64: Conceptual Shift)

Work Example 2, explicitly computing the posterior as the product of both pieces.

- **MC-2 hook**: this directly targets MC-2 (computing the posterior using only the prior or only the likelihood, omitting the other).

### Teaching Action A03 — Credible Intervals Are Direct; Confidence Intervals Are Indirect Probability Statements (reused procedure)

Work Example 3, explicitly contrasting the two interval types' genuinely different interpretations.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Explain, in one sentence, how Bayesian and frequentist statistics fundamentally differ in their treatment of the parameter θ.
  2. For a Beta(1,1) prior and likelihood $L(x|p)=p^2(1-p)$, state the (unnormalized) posterior.
  3. Explain why the posterior is proportional to the PRODUCT of the prior and likelihood, not either alone.
  4. Explain the interpretive difference between a Bayesian credible interval and a frequentist confidence interval.
- **P76 (Transfer Probe, mode = independence)**: "A data scientist at a tech company is estimating the true click-through rate of a new website button, starting with a prior belief based on similar past buttons (a Beta distribution reflecting typical click rates), and plans to update this belief as new click data arrives. (a) Explain why this scenario naturally fits the Bayesian framework's core idea of updating a prior belief with observed data. (b) Explain what a 90% Bayesian credible interval for the click-through rate would directly tell the data scientist, in a way a 90% frequentist confidence interval technically would not."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BAYESIAN-AND-FREQUENTIST-FRAMEWORKS-TREATED-AS-MERELY-NOTATIONAL-VARIANTS | Treating Bayesian and frequentist statistics as different notations for computing the same underlying thing, rather than recognizing they are genuinely different philosophical frameworks | Foundational |
| MC-2 | POSTERIOR-COMPUTED-USING-ONLY-THE-PRIOR-OR-ONLY-THE-LIKELIHOOD | Computing the posterior distribution using only the prior or only the likelihood, omitting the required multiplication of both together | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Bayesian and Frequentist Frameworks Treated as Merely Notational Variants") → P41 (detect: present Example 1 and check whether the fundamental philosophical difference is recognized) → P64 (conceptual shift: re-state each framework's treatment of $\theta$ explicitly, side by side).
- **B02 (targets MC-2)**: P27 ("Posterior Computed Using Only the Prior or Only the Likelihood") → P41 (detect: present Example 2 and check whether both the prior and likelihood are multiplied together) → P64 (conceptual shift: re-derive the posterior explicitly as the product of both pieces).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.bayes-theorem`, `math.stats.mle`.
- **Unlocks**: none recorded in the KG (children `math.stats.conjugate-prior`, `math.stats.credible-interval` build directly on this concept).
- **Related**: `math.prob.bayesian-inference`.
- **Cross-links**: `math.prob.bayesian-inference`.

## Component 8 — Teaching Notes

- difficulty = expert, bloom = evaluate, and estimated_hours = 8 reflect the genuine philosophical depth of this concept, requiring students to reason about foundational differences in statistical paradigms, not just apply a formula.
- Both misconceptions were ranked Foundational because each reflects a fundamental misunderstanding of the framework's core logic, not a minor computational slip.
- The website-click-through-rate transfer probe was deliberately chosen because sequential belief-updating from accumulating data is one of the most natural, intuitive, and increasingly common real-world applications of Bayesian reasoning in modern data science and A/B testing practice.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.prob.bayes-theorem`, `math.stats.mle`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none; children noted) |
| V-5 | cross_links checked against disk | PASS (`math.prob.bayesian-inference`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

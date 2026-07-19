# Teaching Blueprint: Probability Distribution (`math.prob.distribution`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.distribution` |
| name | Probability Distribution |
| domain | Probability |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.prob.random-variable`, `math.prob.cdf` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a specific random variable's full probability behavior tabulated before the general definition |
| description (KG) | The complete probabilistic description of a random variable, given by its CDF (or PMF/PDF). Named distributions arise as models for specific types of random phenomena. |

## Component 1 — Learning Objectives

- LO1: Define the **probability distribution** of a random variable $X$ as its **complete** probabilistic description — everything needed to compute $P(X\in A)$ for any set $A$ — equivalently specified by its CDF $F$, or (for a discrete $X$) its PMF, or (for a continuous $X$) its PDF.
- LO2: Recognize that two random variables can share certain summary numbers (e.g. the same mean) while having genuinely **different distributions**, and correctly identify that only the FULL distribution (not a single summary statistic) constitutes a complete description — directly refuting the misconception that knowing a random variable's mean (or any single number) tells you its distribution.
- LO3: Recognize **named distributions** (e.g. Binomial, Uniform, Normal — cited by name, not derived in depth here) as standard, reusable models for specific types of random phenomena, and explain why using a named distribution (once its assumptions are verified to fit a scenario) saves the work of deriving a distribution's properties from scratch.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.random-variable` (a random variable $X$ as a measurable function $\Omega\to\mathbb{R}$, discrete vs. continuous) and `math.prob.cdf` (the CDF $F(x)=P(X\le x)$, unifying the discrete-sum and continuous-integral cases).

## Component 3 — Core Explanation

**The distribution as the complete description**: the **distribution** of a random variable $X$ is the full specification of how probability is spread across $X$'s possible values — enough information to answer $P(X\in A)$ for literally **any** set $A$ of interest, not just a few specific values. This complete information can be equivalently packaged in different but interchangeable forms: the CDF $F(x)=P(X\le x)$ (always available, from `math.prob.cdf`), the PMF $p(k)=P(X=k)$ (for discrete $X$), or the PDF $f(x)$ (for continuous $X$, satisfying $F(x)=\int_{-\infty}^x f(t)\,dt$). Knowing any ONE of these fully determines the others — they are different "views" of the same underlying complete description, not independent pieces of information.

**A single summary number is never the whole distribution**: quantities like the mean, median, or variance are useful **summaries** computed FROM a distribution, but they discard most of the distribution's information. Two random variables can share the exact same mean while having wildly different spreads, shapes, or even different supports entirely — the mean alone cannot distinguish them. Only the full CDF/PMF/PDF constitutes the complete distribution; any single number is, by construction, a lossy compression of it.

**Named distributions as reusable models**: certain distributions arise so frequently, as models for specific recurring types of random phenomena, that they are given names and studied in depth once, so their properties (mean, variance, useful probability formulas) don't need to be re-derived every time the same underlying phenomenon recurs. Examples include the **Binomial** distribution (counting successes in a fixed number of independent yes/no trials), the **Uniform** distribution (equal likelihood across an interval or a finite set of outcomes), and the **Normal** distribution (arising pervasively via the Central Limit Theorem for sums/averages of many independent effects). Using a named distribution is valid only once its defining assumptions are checked to genuinely match the scenario at hand — the name is a shortcut for an already-verified structure, not a label to apply on vague resemblance.

## Component 4 — Worked Examples

**Example 1 (LO1 — the distribution as the complete description, via multiple equivalent forms)**: A fair six-sided die roll $X$ has PMF $p(k)=1/6$ for $k=1,\dots,6$. Its CDF is the step function $F(x)=\lfloor x\rfloor/6$ for $1\le x<6$ (with $F(x)=0$ for $x<1$ and $F(x)=1$ for $x\ge6$). Both descriptions — the PMF table and the CDF step function — carry EXACTLY the same information: from either one, $P(2\le X\le4) = p(2)+p(3)+p(4) = 3/6$, or equivalently $F(4)-F(1)+p(1) = $ (computed via the CDF directly) the same value. Neither description tells you anything the other doesn't; they're two equivalent full specifications of the identical distribution.

**Example 2 (LO2 — same mean, different distributions, breaking MC-1)**: Let $X$ be the die roll from Example 1: $E[X] = (1+2+3+4+5+6)/6 = 3.5$. Now let $Y$ take only the values $1$ and $6$, each with probability $1/2$: $E[Y] = (1)(1/2)+(6)(1/2) = 3.5$ — the SAME mean as $X$. But $X$ and $Y$ have completely different distributions: $X$ spreads probability evenly across six values, while $Y$ concentrates all its probability on just two extreme values. $P(X=3.5)=0$ (die rolls are always integers) versus... well, $P(Y=3.5)=0$ too, but $P(3\le X\le4) = 2/6$ while $P(3\le Y\le4)=0$ (Y never lands there at all) — a concrete question the shared mean alone cannot answer, proving the mean is a lossy summary, not the distribution itself.

**Example 3 (LO3 — recognizing and correctly applying a named distribution)**: A quality-control process inspects 10 items, each independently defective with probability $p=0.05$. The count of defective items, $X$, follows a **Binomial** distribution (a fixed number of independent yes/no trials, constant success probability) — recognized by checking the defining assumptions (fixed $n=10$ trials, independence, constant $p$) genuinely hold here, rather than assumed just because "counting successes" sounds Binomial-like. Once verified, $X$'s properties (e.g. $E[X]=np=0.5$) are immediately available from the already-established Binomial theory, with no need to re-derive them from scratch for this specific scenario.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Distribution as the Full Story, in Equivalent Forms (Primitive P11: Representation Shift)

Present the die-roll PMF table and its CDF step-graph side by side (both already familiar from `math.prob.cdf`). State: "these are two DIFFERENT-LOOKING descriptions of the exact SAME complete information — the distribution. Neither one adds anything the other lacks; they're interchangeable full specifications." Work Example 1's direct interval-probability computation both ways.

### Teaching Action A02 — A Shared Summary Number Doesn't Mean a Shared Distribution (Primitive P28: Conflict Evidence)

Present Example 2's direct conflict: $X$ (die roll) and $Y$ (two-point variable) share the identical mean $3.5$, yet answer the specific question $P(3\le\cdot\le4)$ completely differently ($2/6$ vs. $0$). State: "the mean is a single number computed FROM the distribution — it necessarily throws away information. Two genuinely different distributions can produce the exact same mean, so 'I know the mean' is never the same claim as 'I know the distribution.'"

- **MC-1 hook**: ask "if two random variables have the same mean, do they have the same distribution?" — a "yes" answer reveals MC-1 (assuming a shared summary statistic implies a shared full distribution, missing how much information a single number discards).

### Teaching Action A03 — Named Distributions as Verified, Reusable Models (Primitive P06: Contrast Pair)

Present Example 3's verification process explicitly: checking $n=10$ fixed, trials independent, $p=0.05$ constant — THEN concluding Binomial applies. Contrast with a hypothetical mismatch: "if the 10 items were inspected in a way where finding one defect made further defects more likely (dependence), calling this 'Binomial' anyway would be applying the name without verifying its assumptions — invalidating every property borrowed from the named theory."

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For a random variable $Z$ with PMF $P(Z=0)=0.3$, $P(Z=1)=0.7$, write its CDF explicitly, and confirm both descriptions give the same answer for $P(Z\le0.5)$.
  2. Construct two DIFFERENT random variables (distinct distributions) that share the same mean of $10$, and identify one specific probability question (like Example 2's interval probability) that distinguishes them.
  3. A survey collects the number of heads in 20 independent fair coin flips. Explain what specific assumptions must hold for this count to be modeled as a Binomial distribution, and verify they hold in this scenario.
  4. Explain, in your own words, why "the distribution" of a random variable is a strictly richer piece of information than any single summary statistic (mean, median, or otherwise) computed from it.
- **P76 (Transfer Probe, mode = independence)**: "A city's daily high temperature over a year has an average (mean) of $70°F$. A different city, in a region with extreme seasonal swings, ALSO has a daily high temperature averaging $70°F$ over its year. (a) Explain why knowing both cities share the same mean temperature does not tell you whether their day-to-day temperature EXPERIENCES are similar. (b) Describe a specific question (analogous to Example 2's interval probability) a resident might ask that the shared mean cannot answer, but the full distribution could. (c) If a meteorologist wanted to model one of these cities' daily highs using a NAMED distribution (e.g. Normal), explain what they would need to verify first, rather than assuming the name applies just because temperatures are commonly modeled that way."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SHARED-SUMMARY-STATISTIC-ASSUMED-TO-IMPLY-SHARED-DISTRIBUTION | Believing that if two random variables share a summary statistic (like the mean), they must have the same distribution | Foundational |
| MC-2 | NAMED-DISTRIBUTION-APPLIED-WITHOUT-VERIFYING-ASSUMPTIONS | Labeling a random variable with a named distribution (e.g. Binomial) based on surface resemblance, without checking that the defining assumptions (fixed trials, independence, constant probability, etc.) genuinely hold | Foundational |
| MC-3 | CDF-PMF-PDF-TREATED-AS-DIFFERENT-INFORMATION | Believing the CDF, PMF, and PDF of the same random variable carry different or additional information relative to each other, rather than recognizing them as equivalent, interchangeable full specifications | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Shared-Statistic-Implies-Shared-Distribution Assumption") → P41 (detect: give two random variables with the same mean but visibly different spreads, and ask whether they have "the same distribution") → P64 (conceptual shift: re-walk Example 2's direct interval-probability computation, showing the shared mean masks a real difference the full distribution reveals).
- **B02 (targets MC-2)**: P27 (name it: "Named-Distribution-Without-Verification Error") → P41 (detect: present a scenario resembling Example 3's Binomial setup but with a violated assumption, e.g. dependent trials, and ask whether Binomial still applies) → P64 (conceptual shift: re-walk Example 3's explicit assumption-checking process, re-anchoring on "verify the defining conditions FIRST — the name is a shortcut for an already-checked structure, not a label based on vague similarity").
- **B03 (targets MC-3)**: P27 (name it: "CDF-PMF-PDF Information Mismatch Assumption") → P41 (detect: ask whether computing a probability from the CDF versus from the PMF for the same random variable could give different answers) → P64 (conceptual shift: re-walk Example 1's dual computation, confirming both routes give the identical numeric answer, re-anchoring on "these are the same complete information, just packaged differently").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.random-variable` (the discrete/continuous distinction and measurable-function foundation this concept's complete description builds on), `math.prob.cdf` (the CDF as one of the equivalent full specifications of a distribution).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/understand tag places this at a "3 TAs + gate" tier — A01 (equivalent full descriptions), A02 (summary statistics vs. full distribution), and A03 (named distributions as verified models) each target a distinct LO, appropriate for a compact synthesis concept whose main challenge is conceptual precision (what "the distribution" actually means) rather than new computation.
- MC-1 (shared statistic implies shared distribution) was given the most teaching weight because it is arguably the single most consequential everyday statistical reasoning error — comparing two groups, populations, or processes by a single average while assuming that comparison captures everything meaningful about how they differ — directly echoing `math.stats.descriptive-statistics`'s own MC-2 concern about over-generalizing from summary statistics, now formalized precisely at the distribution level.
- Named distributions (Binomial, Uniform, Normal) are deliberately cited by NAME and role only, without deriving their formulas or properties — this concept's job is to establish the general category ("named distributions exist as verified reusable models") and the discipline of verifying assumptions before applying one, leaving derivation of any specific named distribution's properties to that distribution's own future concept entry.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a specific random variable's full behavior tabulated first) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

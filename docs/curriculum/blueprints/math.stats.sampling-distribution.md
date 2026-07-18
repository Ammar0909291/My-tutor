<!-- BLUEPRINT: math.stats.sampling-distribution -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Sampling Distribution
**Concept ID:** `math.stats.sampling-distribution`
**KG Fields:** difficulty=proficient | bloom=understand | estimated_hours=5 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.stats.sampling-distribution |
| name | Sampling Distribution |
| difficulty | proficient |
| bloom | understand |
| estimated_hours | 5 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.stats.sampling, math.prob.random-variable |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.stats.sampling**: SRS, stratified, cluster methods — the mechanism by which repeated samples are drawn, which this concept studies the OUTCOME (the statistic's distribution) of
- **math.prob.random-variable**: a random variable assigns numbers to outcomes; a sample statistic (like $\bar X$) is itself a random variable, since its value differs from sample to sample
- **math.prob.clt**: the sampling distribution of $\bar X_n$ is approximately normal for large n — this concept develops the FULL sampling-distribution framework (mean, standard error, shape) that CLT's shape claim is one part of

### Target Knowledge State
Student can define a sampling distribution as the probability distribution of a STATISTIC (e.g. $\bar X$) computed across ALL possible samples of a given size — a distinct object from both the population and any single sample's raw data; correctly state $E[\bar X]=\mu$ and $SD(\bar X)=\sigma/\sqrt n$ (the standard error), applying the SQUARE-ROOT scaling correctly (not a linear $1/n$ scaling); and correctly reason about how sample size affects the standard error's magnitude, recognizing that QUADRUPLING (not doubling) the sample size is needed to HALVE the standard error, due to the square-root relationship.

### Conceptual Obstacles
1. Confusing the sampling distribution (of a STATISTIC, across MANY hypothetical samples) with the distribution of raw DATA within one single sample, or with the population distribution itself — three genuinely different objects that are easy to conflate given how similar their descriptions can sound
2. Misapplying the standard-error formula $\sigma/\sqrt n$ as $\sigma/n$ (a straightforward, but incorrect, linear scaling) — the square root is not optional or a rounding nuance, it fundamentally changes how much n must grow to shrink SE by a given factor
3. Assuming that DOUBLING the sample size HALVES the standard error (a linear-scaling intuition) — because SE scales as $1/\sqrt n$, halving SE actually requires QUADRUPLING n, not doubling it; this is a frequently tested, easy-to-miss numerical consequence of the square-root relationship

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SAMPLING-DISTRIBUTION-IS-THE-DATA | Student conflates the sampling distribution (of a statistic across many samples) with the distribution of individual data points within one sample, or with the population distribution | Any question distinguishing "spread of the data in one sample" from "spread of the statistic across many samples" |
| MC-2 | STANDARD-ERROR-IS-SIGMA-OVER-N | Student computes the standard error as $\sigma/n$ instead of $\sigma/\sqrt n$, applying a linear rather than square-root scaling | Any numeric standard-error computation |
| MC-3 | DOUBLE-N-HALVES-SE | Student assumes doubling the sample size halves the standard error, missing that SE scales as $1/\sqrt n$, so QUADRUPLING n is required to halve SE | Any question asking how much n must change to achieve a target reduction in standard error |

**Foundational Misconception:** MC-1 (SAMPLING-DISTRIBUTION-IS-THE-DATA) — the term "sampling distribution" is genuinely ambiguous-sounding to a new learner (it could plausibly mean "how the sample's data is distributed"), and a student who conflates it with the data distribution or population distribution cannot correctly interpret $E[\bar X]=\mu$ or $SD(\bar X)=\sigma/\sqrt n$ at all, since both formulas are statements about the STATISTIC's behavior across repeated sampling, not about any single sample's internal spread — this confusion directly undermines MC-2 and MC-3, both of which are precise claims about the sampling distribution specifically.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — proficient learner computes $\bar X$ for several small hypothetical samples from a tiny population, tabulating the RESULTING distribution of those means, before the formal mean/SE formulas are stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: sample means computed from a small enumerated population, their own distribution tabulated; P: three side-by-side pictures (population, one sample's data, sampling distribution of the mean); A: formal definition, $E[\bar X]=\mu$, $SD(\bar X)=\sigma/\sqrt n$
2. **A02 P06 CONTRAST PAIR** — the three distributions (population/one-sample-data/sampling-distribution) directly contrasted (MC-1); $\sigma/\sqrt n$ computed correctly vs. the $\sigma/n$ error (MC-2); doubling vs. quadrupling n to halve SE, computed explicitly (MC-3)
3. **A03 P28 CONFLICT EVIDENCE** — a composite numeric problem requiring all three distinctions together
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — The Distribution of a Statistic, Built by Hand

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Build a genuine (small) sampling distribution from an enumerated tiny population before any formula is stated; establish the mean and SE formulas formally

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (population {2, 4, 6, 8}, all samples of size $n=2$ without replacement):**

Population: $\{2,4,6,8\}$, population mean $\mu=(2+4+6+8)/4=5$, population variance $\sigma^2 = \frac{(2-5)^2+(4-5)^2+(6-5)^2+(8-5)^2}{4}=\frac{9+1+1+9}{4}=5$, so $\sigma=\sqrt5\approx2.236$.

All $\binom42=6$ samples of size 2 and their means:

| Sample | Mean $\bar x$ |
|--------|---------------|
| {2,4} | 3 |
| {2,6} | 4 |
| {2,8} | 5 |
| {4,6} | 5 |
| {4,8} | 6 |
| {6,8} | 7 |

**This table of 6 sample means IS the sampling distribution of $\bar X$ (for $n=2$, from this population)** — a genuinely different object from the original 4-element population, and different again from any single 2-element sample's own two data points. The AVERAGE of these 6 sample means: $(3+4+5+5+6+7)/6=30/6=5=\mu$ — matches the population mean exactly, confirming $E[\bar X]=\mu$.

**Stage P — Pictorial (three distinct objects, side by side):**

```
   POPULATION            ONE SAMPLE'S DATA        SAMPLING DISTRIBUTION
   {2,4,6,8}              e.g. {2,8}                (of X̄, all 6 means)
   4 elements              2 elements                6 elements: 3,4,5,5,6,7
   mean=5, σ=√5            values 2 and 8            mean of THESE =5
                            (mean=5, but this          spread SMALLER than
                             is ONE sample's            the population's
                             own 2 data points,         spread (means
                             not a "distribution"       cluster more
                             in the sense meant         tightly around 5
                             here)                      than raw data does)
```

**Stage A — Abstract (formal definition and formulas):**

**Sampling distribution:** the probability distribution of a statistic (e.g. $\bar X$) computed across ALL possible samples of a given size $n$ from the population.

**Mean of the sampling distribution:** $E[\bar X]=\mu$ (the sampling distribution of $\bar X$ is centered at the SAME value as the population mean — confirmed numerically above: both equal 5).

**Standard error (the sampling distribution's own standard deviation):** $SD(\bar X) = \sigma/\sqrt n$ — note the SQUARE ROOT of $n$, not $n$ itself. (For the example above with replacement and large-population approximations, this formula would give $\sigma/\sqrt2\approx2.236/1.414\approx1.581$; the finite, without-replacement population here has a slightly adjusted exact value, but the $1/\sqrt n$ SHRINKING pattern as $n$ grows is the essential, generalizable fact.)

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Using the population {2,4,6,8} and its 6 possible samples of size 2 (from the table above), state: (a) is the SPREAD of the 6 sample means (3,4,5,5,6,7) bigger, smaller, or the same as the spread of the original population {2,4,6,8}? (b) What does this suggest about how averaging affects variability?

**CORRECT:** (a) SMALLER — the sample means (ranging 3 to 7, clustering around 5) are less spread out than the original population (ranging 2 to 8). (b) Averaging REDUCES variability compared to individual raw values — extreme individual values (like 2 or 8) get "smoothed out" when combined with another value in a sample mean, since an unusually low value paired with a more typical value produces a less extreme mean.
→ "Correct — this is exactly why SD(X̄)=σ/√n is SMALLER than σ itself (dividing by √n, a number greater than 1 for n>1, shrinks the spread), matching the numeric observation here directly." → Proceed to A02.

**PARTIAL:** Student correctly observes the smaller spread in (a) but in (b) attributes it vaguely to "randomness" rather than the specific averaging mechanism.
→ "Be specific about the MECHANISM: a sample mean averages TWO values together. If one value happens to be extreme (like 2, far below the population mean 5), the OTHER value in that same sample (drawn from the same population) is likely closer to typical, pulling the average back toward the middle. This 'extremes get diluted by averaging' mechanism is precisely why SD(X̄) is always smaller than σ (for n>1) — it's not a vague randomness effect, it's the direct arithmetic consequence of averaging multiple values together."

**INCORRECT:** Student answers (a) "the same, since we're using the same population both times" (MC-1 — conflating the sampling distribution's spread with the population's spread).
→ "Compare the actual numbers directly: population {2,4,6,8} ranges from 2 to 8 (spread of 6); sample means {3,4,5,5,6,7} range from 3 to 7 (spread of only 4) — genuinely narrower. These are two DIFFERENT distributions (the population's own spread vs. the sampling distribution of the MEAN), and averaging demonstrably shrinks the spread; they are not automatically 'the same' just because they're derived from the same population."

**NO_RESPONSE:** → "(a) Smaller — sample means (3,4,5,5,6,7) cluster more tightly around 5 than the original population (2,4,6,8) does. (b) Averaging reduces variability: an extreme value in a sample tends to be paired with a more typical one, pulling the mean back toward the center."

---

### Teaching Action A02 — Three Distinct Objects; √n, Not n; Quadruple, Not Double

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with the three-object comparison stated explicitly; break MC-2 with a direct numeric SE computation contrasting the correct and incorrect formulas; break MC-3 by computing SE at n, 2n, and 4n side by side

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Population, one sample's data, sampling distribution: named and distinguished (MC-1):**

| Object | What it describes | Example (population {2,4,6,8}, n=2) |
|--------|---------------------|----------------------------------------|
| Population distribution | All values in the entire population | {2,4,6,8}: mean 5, SD √5≈2.24 |
| One sample's data | The 2 (or n) values in ONE specific drawn sample | e.g. {2,8}: just these two numbers |
| Sampling distribution (of $\bar X$) | The distribution of the MEAN across ALL possible samples | {3,4,5,5,6,7}: mean 5, smaller spread than the population |

All three can share the SAME mean (5, in this example) — which is exactly why they're easy to conflate — but they are fundamentally different objects with different SPREADS and different roles: the population describes the actual world being studied; one sample's data is what you happen to observe once; the sampling distribution describes the theoretical behavior of the STATISTIC (like $\bar X$) if the sampling process were repeated indefinitely.

**Contrast 2 — $\sigma/\sqrt n$ vs. $\sigma/n$ (MC-2), computed numerically:**

For $\sigma=12$, $n=9$: **Correct:** $SD(\bar X)=\sigma/\sqrt n = 12/\sqrt9 = 12/3 = 4$. **Incorrect ($\sigma/n$):** $12/9\approx1.33$ — a considerably SMALLER (and wrong) value. The square root fundamentally changes the scaling behavior — $\sigma/n$ shrinks much FASTER as $n$ grows than $\sigma/\sqrt n$ does, which would (wrongly) suggest that even modest sample sizes make the sampling distribution extremely tight, overstating precision.

**Contrast 3 — Doubling n vs. quadrupling n to halve SE (MC-3):**

Starting SE at $n=25$ (with $\sigma=20$): $SE=20/\sqrt{25}=20/5=4$.

- **Double n to 50:** $SE=20/\sqrt{50}\approx20/7.07\approx2.83$ — a REDUCTION, but NOT to half of 4 (half would be 2); $2.83$ is only about 71% of the original, not 50%.
- **Quadruple n to 100:** $SE=20/\sqrt{100}=20/10=2$ — exactly HALF of the original 4.

**To halve the standard error, you must QUADRUPLE the sample size, not merely double it** — a direct consequence of the square-root relationship (halving requires the DENOMINATOR $\sqrt n$ to double, which requires $n$ itself to become 4 times as large, since $\sqrt{4n}=2\sqrt n$).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** A population has $\sigma=30$. (a) Compute SE for $n=36$. (b) A researcher wants to cut this SE in half. What new sample size is needed? (c) If someone instead simply doubled the sample size to $n=72$, what would the new SE be — has it been cut in half?

**CORRECT:** (a) $SE=30/\sqrt{36}=30/6=5$. (b) To halve SE (target: 2.5), need $\sqrt n$ to double (from 6 to 12), so $n=12^2=144$ — QUADRUPLE the original 36. (c) At $n=72$: $SE=30/\sqrt{72}\approx30/8.49\approx3.53$ — a reduction from 5, but NOT half (half would be 2.5); doubling n only reduces SE by a factor of $1/\sqrt2\approx0.707$, not $1/2$.
→ "Correct — (c) explicitly confirms that doubling n undershoots the halving target, exactly the quadrupling requirement from Contrast 3." → Proceed to A03.

**PARTIAL:** Student gets (a) correctly but in (b) answers "n=72 (double), since that seems like the natural way to halve something."
→ "Test your proposed n=72 directly: SE there is $30/\sqrt{72}\approx3.53$, not $2.5$ (half of 5). The relationship is $SE\propto1/\sqrt n$, so achieving HALF the SE requires the sample size to grow by a factor of $2^2=4$ (since $\sqrt{4n}=2\sqrt n$, doubling the DENOMINATOR, which is what actually halves the fraction) — the correct target is $n=144$, not 72."

**INCORRECT:** Student computes (a) as $30/36\approx0.83$ (MC-2, dividing by n instead of √n).
→ "Standard error uses $\sigma/\sqrt n$, NOT $\sigma/n$ — take the square root of 36 first (which is 6), then divide: $30/6=5$. Dividing by the raw $n=36$ directly (giving 0.83) applies the wrong scaling and would drastically UNDERSTATE the true variability of the sampling distribution."

**NO_RESPONSE:** → "(a) SE=30/√36=30/6=5. (b) To halve SE, quadruple n: new n=4×36=144 (check: 30/√144=30/12=2.5, exactly half). (c) Doubling to n=72 gives SE=30/√72≈3.53, NOT half of 5 — confirms doubling is insufficient."

---

### Teaching Action A03 — Composite: All Three Distinctions Together

**Primitive:** P28 CONFLICT EVIDENCE
**Purpose:** Force correct identification of population/sample-data/sampling-distribution and correct SE scaling together in one problem

---

**[P28 — CONFLICT EVIDENCE]**

A factory's bolt-diameter population has mean $\mu=10$mm and standard deviation $\sigma=0.6$mm.

1. **"What is the standard deviation of a SINGLE randomly selected bolt's diameter?"** — This is asking about the POPULATION itself, not a sampling distribution: the answer is simply $\sigma=0.6$mm (a single observation's variability IS the population's variability; no averaging has occurred).
2. **"A quality-control inspector measures a sample of $n=16$ bolts. What is the standard deviation of the SAMPLE MEAN's sampling distribution?"** — This IS asking about the sampling distribution: $SE=\sigma/\sqrt n=0.6/\sqrt{16}=0.6/4=0.15$mm — considerably smaller than the population's own 0.6mm, since averaging 16 values dampens individual variability.
3. **"If the inspector wants to cut this standard error to 0.075mm (half of 0.15), what new sample size is needed?"** — Halving SE requires quadrupling n: new $n=4\times16=64$ (check: $0.6/\sqrt{64}=0.6/8=0.075$ ✓).
4. **"Does increasing the sample size change the ORIGINAL population's standard deviation (0.6mm) at all?"** — No — $\sigma=0.6$mm is a fixed, unchanging property of the bolt-manufacturing population; no amount of sampling or averaging alters it. Only the sampling distribution's OWN spread (the standard error) shrinks as $n$ grows.

A student weak on any of the three distinctions typically fails a different sub-question: answering (1) with a shrunk SE-style number instead of the plain $\sigma$ (MC-1), computing (2) as $0.6/16=0.0375$ instead of $0.6/4=0.15$ (MC-2), or answering (3) with $n=32$ (doubling) instead of $n=64$ (quadrupling) (MC-3).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** A population of test scores has $\sigma=15$. (a) What is the SD of a single student's score? (b) For a sample of $n=25$ students, what is the SE of the sample mean? (c) To reduce this SE to exactly one-third of its current value, what new sample size is needed?

**CORRECT:** (a) 15 (the population SD itself — a single observation carries the full population variability). (b) $SE=15/\sqrt{25}=15/5=3$. (c) Target SE = $3/3=1$; need $\sqrt n=15/1=15$, so $n=15^2=225$ — NINE times the original 25 (since reducing SE by a factor of 3 requires n to grow by a factor of $3^2=9$).
→ "Correct — (c) generalizes Contrast 3's quadrupling rule to a THIRD-reduction, testing whether the square-relationship (not just the specific 'halve→quadruple' fact) has been understood generally." → Proceed to A04.

**PARTIAL:** Student gets (a) and (b) but in (c) answers "n=75" (tripling, applying the linear-scaling error to a factor of 3 instead of 2).
→ "The relationship is $SE\propto1/\sqrt n$: to make SE one-third as large, $\sqrt n$ must become THREE TIMES as large, which means $n$ itself must become $3^2=9$ times as large (since $\sqrt{9n}=3\sqrt n$) — not simply tripled. Verify: at $n=75$ (tripled), $SE=15/\sqrt{75}\approx15/8.66\approx1.73$, not the target of 1 — confirming tripling n is insufficient; $n=225$ (nine times) is required."

**INCORRECT:** Student answers (a) "smaller than 15, since we should account for sample variability" (MC-1, applying sampling-distribution reasoning to a single observation with no sample involved at all).
→ "There IS no sample or averaging in question (a) — it asks about ONE single student's score, which is simply a draw from the population itself. Its standard deviation is the population's own SD, 15, unchanged and unreduced; the shrinking-with-n effect (the standard ERROR) only applies once you're asking about the MEAN of multiple observations, which is not what (a) asks."

**NO_RESPONSE:** → "(a) 15 (population SD, no averaging involved). (b) 15/√25=3. (c) Need SE=1: √n=15, so n=225 (nine times 25, since reducing SE by a factor of 3 requires n to grow by 3²=9)."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess the three-object distinction, correct SE computation, and correct scaling reasoning under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** A population has $\mu=50, \sigma=10$. For samples of size $n=4$, state $E[\bar X]$ and $SD(\bar X)$.

*Solution:* $E[\bar X]=\mu=50$. $SD(\bar X)=\sigma/\sqrt n=10/\sqrt4=10/2=5$.

**Problem 2:** True or false: "The standard error is the same thing as the population standard deviation." Justify.

*Solution:* **False.** SE = $\sigma/\sqrt n$ is the standard deviation of the SAMPLING DISTRIBUTION of the mean (always ≤ σ for n≥1, strictly smaller for n>1); σ itself is the population's own standard deviation, a fixed, larger quantity that averaging does not change.

**Problem 3:** For $\sigma=40$, find the sample size needed so that $SE=5$.

*Solution:* $5=40/\sqrt n \Rightarrow \sqrt n=8 \Rightarrow n=64$.

**Problem 4:** A sample size increases from $n=10$ to $n=20$ (doubled). Does the standard error get cut exactly in half? Justify with a computation (assume $\sigma=10$ for concreteness).

*Solution:* No. At $n=10$: $SE=10/\sqrt{10}\approx3.16$. At $n=20$: $SE=10/\sqrt{20}\approx2.24$. Ratio: $2.24/3.16\approx0.707=1/\sqrt2$, not $0.5$ — doubling n reduces SE by a factor of $1/\sqrt2$, not $1/2$; halving SE requires quadrupling n.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A polling organization surveys voters and reports the sample mean approval rating, with a population standard deviation (voter-to-voter variability in approval scores) of $\sigma=25$ points.

(a) For a poll of $n=100$ voters, compute the standard error, and explain in one sentence what this number represents (as opposed to what a single voter's own approval-score variability represents).
(b) The organization wants to reduce its margin of error (proportional to the SE) to one-FIFTH of its current size for a follow-up poll. What new sample size is required, and how many TIMES more voters must be surveyed compared to the original 100?
(c) A journalist writes: "The organization surveyed 4 times as many people this year (400 instead of 100), so their results should now be 4 times more precise." Evaluate this claim precisely, computing the actual change in standard error and identifying exactly what "4 times more precise" would have to mean for the claim to be numerically correct (if it is at all).

**Expected solution:**

(a) $SE=25/\sqrt{100}=25/10=2.5$. This represents the standard deviation of the SAMPLING DISTRIBUTION of the sample mean approval rating — i.e., how much the average approval rating would be expected to vary from one poll of 100 voters to another poll of 100 (different) voters — NOT the variability of individual voters' own approval scores (which remains the full population $\sigma=25$, unchanged by any polling).

(b) To reduce SE to $1/5$ of its current value, $\sqrt n$ must become 5 times as large, so $n$ must become $5^2=25$ times as large: new $n=25\times100=2500$ — **25 times** as many voters as the original 100 (not 5 times).

(c) The journalist's claim is **incorrect** as a direct precision multiplier. Computing directly: at $n=100$, $SE=2.5$; at $n=400$ (4 times as many voters), $SE=25/\sqrt{400}=25/20=1.25$ — exactly HALF of the original, not a quarter. The actual relationship: $SE\propto1/\sqrt n$, so multiplying $n$ by a factor of 4 multiplies $\sqrt n$ by a factor of $\sqrt4=2$, which divides SE by 2 (not 4). For "4 times more precise" (SE reduced to 1/4) to be numerically correct, $n$ would need to increase by a factor of $4^2=16$ (i.e. to $n=1600$), not merely 4. The journalist's error is applying a direct, linear "4x sample size → 4x precision" intuition, when the actual relationship is governed by the square root, exactly the DOUBLE-N-HALVES-SE misconception generalized to a different multiplier.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.85 × 5⌉ = ⌈4.25⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.stats.standard-error; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.stats.sampling-distribution assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SAMPLING-DISTRIBUTION-IS-THE-DATA (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Conflating the sampling distribution with one sample's raw data (or the population) is SAMPLING-DISTRIBUTION-IS-THE-DATA. The sampling distribution describes a STATISTIC's behavior across MANY hypothetical samples — a different object from any single sample's own data or the population itself."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is the 'sampling distribution' of a sample of 10 test scores?"
- MC-1 response: describes the spread of the 10 scores THEMSELVES, as if that were the sampling distribution.

**[P64 — CONCEPTUAL SHIFT]**
"The spread of the 10 scores in ONE sample is just that sample's own data — not a sampling distribution at all. The sampling distribution requires imagining (or actually computing) the STATISTIC (like the mean of those 10 scores) across MANY different possible samples of 10 — it describes how THAT statistic varies from sample to sample, a fundamentally different, 'one level up' object from the raw data in any single sample."

Practice: For a population {1,2,3,4,5,6}, list all samples of size 2, compute each sample's mean, and confirm the resulting list of means (the sampling distribution) is different from any single sample's own two data points.

---

### Repair Action B02 — STANDARD-ERROR-IS-SIGMA-OVER-N (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Computing SE as σ/n instead of σ/√n is STANDARD-ERROR-IS-SIGMA-OVER-N. The square root is essential — omitting it drastically understates the sampling distribution's true spread."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "σ=20, n=16. Compute the standard error."
- MC-2 response: "20/16=1.25."

**[P64 — CONCEPTUAL SHIFT]**
"Take the square root of n FIRST: $\sqrt{16}=4$, then divide: $20/4=5$. The correct SE is 5, not 1.25 — a substantial difference. Skipping the square root treats the sampling distribution as far more concentrated than it really is; always compute $\sqrt n$ as an explicit intermediate step before dividing."

Practice: Compute the standard error for σ=36, n=9, showing the √n step explicitly before dividing.

---

### Repair Action B03 — DOUBLE-N-HALVES-SE (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming doubling n halves the standard error is DOUBLE-N-HALVES-SE. Because SE∝1/√n, halving SE actually requires QUADRUPLING n — doubling n only reduces SE by a factor of 1/√2≈0.707, not 1/2."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "SE is currently 8, from n=25. What new n gives SE=4 (half)?"
- MC-3 response: "n=50 (double it)."

**[P64 — CONCEPTUAL SHIFT]**
"Test n=50 directly: if $\sigma$ is such that $\sigma/\sqrt{25}=8$, then $\sigma=40$. At $n=50$: $SE=40/\sqrt{50}\approx40/7.07\approx5.66$ — NOT 4. To actually reach SE=4: $4=40/\sqrt n \Rightarrow \sqrt n=10 \Rightarrow n=100$ — QUADRUPLE the original 25, not double. The rule: halving SE always requires multiplying n by $2^2=4$, because $\sqrt{4n}=2\sqrt n$ (doubling the square root, which is what actually halves the fraction)."

Practice: Starting from n=9 with some SE value, determine the exact new n required to cut SE to one-third of its original value (without being told the specific σ — reason purely from the scaling relationship).

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Restate the three-object distinction (population / one sample's data / sampling distribution) using a fresh tiny enumerated population |
| SR-2 | +3 days | Compute a fresh standard error using σ/√n, showing the square-root step explicitly |
| SR-3 | +7 days | Determine the sample-size multiplier needed to achieve a fresh target SE reduction (e.g. to one-quarter), generalizing beyond just "halving" |
| SR-4 | +14 days | Reconstruct the polling transfer probe's argument for why quadrupling the sample size only halves (not quarters) the standard error |

Retrieval flag: if student conflates the sampling distribution with raw sample data (MC-1) or applies a linear rather than square-root SE scaling (MC-2/MC-3), re-execute B01/B02/B03 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.stats.sampling | Supplies the repeated-sampling mechanism (SRS) whose statistic's distribution this concept studies |
| Requires (Tier-1) | math.prob.random-variable | A sample statistic (like $\bar X$) is itself a random variable, exactly the framework this concept applies |
| Requires (Tier-1, via this session's authoring) | math.prob.clt | Supplies the approximately-normal SHAPE claim for the sampling distribution of $\bar X$ at large n, which this concept's mean/SE formulas complement |
| Unlocks | math.stats.standard-error | The standard error formula developed here (σ/√n) becomes the dedicated subject of deeper treatment in that blueprint |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the three-object distinction and √n scaling to a polling-precision scenario, a genuinely new applied context rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=5 → standard structure (3 main TAs + gate), matching the concept's three genuinely separate skill clusters (object distinction, SE formula, scaling reasoning) despite proficient difficulty
- bloom=understand → V-4 = N/A (no P07 required; conceptual distinction-drawing and numeric-verification tasks, not derivations beyond the direct formula applications)
- CPA_entry = C for a proficient learner: an enumerated tiny population (all 6 samples of size 2 from a 4-element set) makes the sampling distribution a genuinely COMPUTABLE, checkable object before the abstract σ/√n formula is stated

**Key teaching insight:** MC-1 is this concept's root misconception because the very NAME "sampling distribution" invites confusion with "the distribution of the sample" (i.e. the sample's own data) — A01's three-panel picture (population / one sample's data / sampling distribution) is deliberately the FIRST thing shown, before any formula, specifically to establish that three different nouns describe three different objects, so that MC-2 and MC-3 (both precise numeric claims ABOUT the sampling distribution specifically) have a well-defined target to be precise about.

**MC-2 and MC-3 as one family of scaling errors:** Both misconceptions stem from expecting LINEAR behavior (÷n directly, or "double input → double output") where the true relationship is governed by a SQUARE ROOT. A02's Contrasts 2 and 3 are deliberately sequenced back to back (compute SE correctly, then explore how SE changes with n) so the square-root's TWO consequences — the formula itself, and its scaling behavior — are seen as one coherent mathematical fact, not two unrelated rules to memorize.

**Sequencing note:** No cross-link concept exists yet for math.stats.sampling-distribution; the P76 transfer probe instead uses a political-polling scenario, chosen because "surveyed more people" arguments about precision are common in real reporting and directly test whether the √n scaling (not a linear one) has been internalized as a general principle, not just recalled for the specific "double→halve" case already seen in A02.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.stats.sampling-distribution ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.stats.sampling ✓, math.prob.random-variable ✓ (math.prob.clt also authored this session) | PASS |
| V-3 | CPA entry = C for proficient difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=5, three skill clusters → standard (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Political polling precision scenario; 4x sample size → 2x (not 4x) precision, generalized scaling ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

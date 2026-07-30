# Blueprint: math.prob.total-probability

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.total-probability |
| name | Law of Total Probability |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.prob.conditional-probability |
| Cross-links | — |
| Unlocks | math.prob.bayes-theorem |

## Component 1 — Learning Objective
The student states the law of total probability: if B₁,…,Bₙ is a partition of the sample space (mutually exclusive, exhaustive), then P(A)=∑ᵢP(A|Bᵢ)P(Bᵢ); applies it to compute unconditional probabilities by conditioning on a helpful partition; distinguishes the law from Bayes' theorem (which uses it as a normaliser); and extends it to the continuous case using conditional densities.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw the sample space Ω as a rectangle partitioned by vertical stripes B₁,B₂,B₃; draw event A as an ellipse crossing multiple stripes; shade A∩B₁, A∩B₂, A∩B₃; label each area P(A∩Bᵢ)=P(A|Bᵢ)P(Bᵢ); show that P(A)=sum of all shaded areas = ∑ᵢP(A|Bᵢ)P(Bᵢ))

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | TOTAL-PROBABILITY-AVERAGES-PROBABILITIES | Student computes P(A)=[P(A|B₁)+P(A|B₂)]/2 (simple average) instead of the weighted average ∑P(A|Bᵢ)P(Bᵢ); ignores the base-rate weights P(Bᵢ) | Type 1 — overgeneralisation (averaging P(A|B₁) and P(A|B₂) seems intuitive when the student thinks of "averaging cases"; ignores that the Bᵢ may be unequally likely) |
| MC-2 | PARTITION-IS-OPTIONAL | Student applies the law to events B₁,B₂ that are not a partition (either not exhaustive or not mutually exclusive); gets incorrect results | Type 3 — language contamination ("condition on cases" is vague; "partition" means both mutually exclusive AND exhaustive, and students often check one but not both) |
| MC-3 | TOTAL-PROBABILITY-IS-ONLY-FOR-TWO-CASES | Student uses only P(A)=P(A|B)P(B)+P(A|Bᶜ)P(Bᶜ) and cannot extend to n>2 partition elements | Type 5 — instruction-induced (first examples always have two cases B and Bᶜ; students don't generalise to arbitrary partitions) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The law of total probability — computing P(A) by conditioning:**

**Setup:** Suppose {B₁,…,Bₙ} is a partition of Ω: mutually exclusive (Bᵢ∩Bⱼ=∅ for i≠j) and exhaustive (B₁∪⋯∪Bₙ=Ω).

**Law:** P(A) = ∑ᵢ₌₁ⁿ P(A|Bᵢ)P(Bᵢ)

**Proof:** A = A∩Ω = A∩(B₁∪⋯∪Bₙ) = (A∩B₁)∪⋯∪(A∩Bₙ). Since A∩Bᵢ are mutually exclusive: P(A)=∑P(A∩Bᵢ)=∑P(A|Bᵢ)P(Bᵢ). ∎

**Classic example — testing with imperfect test:**
- 1% of population has disease D.
- Test sensitivity: P(+|D)=0.95 (true positive rate).
- Test specificity: P(−|Dᶜ)=0.90 (true negative rate), so P(+|Dᶜ)=0.10 (false positive rate).
- Partition: {D, Dᶜ}. P(D)=0.01, P(Dᶜ)=0.99.

P(+) = P(+|D)·P(D) + P(+|Dᶜ)·P(Dᶜ) = 0.95·0.01 + 0.10·0.99 = 0.0095 + 0.099 = 0.1085.

About 10.85% of people test positive. (Bayes will then ask: of those who tested positive, what fraction actually have D?)

**P49 checkpoint:**
- CORRECT → "P(A)=∑P(A|Bᵢ)P(Bᵢ) over partition {Bᵢ}. Proof: partition A into A∩Bᵢ pieces. Medical testing example: weighted average of conditional probabilities by base rates." → A02
- PARTIAL (using unweighted average) → "P(A) is a WEIGHTED average of P(A|Bᵢ), weighted by P(Bᵢ). If B₁ is 10 times more likely than B₂, then P(A|B₁) contributes 10 times more to P(A). The simple average (P(A|B₁)+P(A|B₂))/2 ignores these base rates." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "A bag contains coins: 3 fair coins, 1 biased (P(H)=0.9). You pick a coin at random and flip it. What is P(H)? Condition: if fair coin, P(H)=0.5; if biased, P(H)=0.9. P(pick fair)=3/4, P(pick biased)=1/4. P(H)=?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Extensions and variations:**

**n-case partition** (generalise the coin bag example to 10 biased coins with different biases p₁,…,p₁₀, each equally likely): P(H)=∑(pᵢ/10). This is the AVERAGE bias of the coins.

**Total expectation (tower property):** E[X] = ∑ᵢ E[X|Bᵢ]·P(Bᵢ). Same structure as total probability (expected value instead of probability).

**Continuous version:** If Y is a continuous random variable: P(A) = ∫ P(A|Y=y)·f_Y(y)dy.

**Recursive structure (e.g. Gambler's ruin):** Let p_k = P(reach n before 0 | start at k). Condition on first step: p_k = p·p_{k+1} + (1−p)·p_{k-1}. This recurrence uses the law of total probability.

**P49 checkpoint:**
- CORRECT → "Law extends to n cases, continuous conditioning, and tower expectation. Recursive problems (Gambler's ruin, first-step analysis) use it as the core tool." → Gate (P91)
- PARTIAL → "The law works for any partition — even infinitely many pieces (integral form). For discrete Y: P(A)=∑_y P(A|Y=y)P(Y=y). For continuous Y: P(A)=∫P(A|Y=y)f_Y(y)dy." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Gambler's ruin: start at $2, win or lose $1 per game. Let p_k=P(reach $5 before $0 | have $k). Condition on first step: if win (prob 1/2) you move to k+1; if lose you move to k−1. p_k=½p_{k+1}+½p_{k-1}. This is the law of total probability — do you see it?" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 TOTAL-PROBABILITY-AVERAGES-PROBABILITIES):**
Step 1 — "P(A)=∑P(A|Bᵢ)P(Bᵢ) is a weighted average, not a simple average. The weights are P(Bᵢ) — the base rates."
Step 2 — "Extreme example: P(B₁)=0.001, P(B₂)=0.999. P(A|B₁)=1, P(A|B₂)=0. Simple average: (1+0)/2=0.5. Weighted average: 1·0.001+0·0.999=0.001. The correct answer is 0.001 (the rare case B₁ contributes negligibly)."
Step 3 — "Partition check: make sure ∑P(Bᵢ)=1 (exhaustive) and P(Bᵢ∩Bⱼ)=0 (mutually exclusive). If both hold, the weighted average formula applies."

**TB-R02 (MC-2 PARTITION-IS-OPTIONAL):**
Step 1 — "A partition requires: (1) mutually exclusive: the Bᵢ don't overlap. (2) Exhaustive: every outcome is in some Bᵢ. Without (2), you might miss some outcomes. Without (1), you double-count."
Step 2 — "Check: {heads, tails} is a partition of coin flip outcomes. {heads, even} is NOT a partition for a die (overlap: heads doesn't apply to a die; even is not exhaustive)."
Step 3 — "Practical construction: for any event B, {B, Bᶜ} is always a valid 2-element partition. For a more refined partition, think about what 'cases' naturally cover all possibilities without overlap."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. A bag has 4 red and 6 blue balls. You pick one at random; if red, you roll a 6-sided die; if blue, you roll a 4-sided die. What is P(roll a 3)?
2. 5% of emails are spam. A spam filter correctly identifies spam 95% of the time and correctly identifies non-spam 99% of the time. What fraction of all emails does the filter flag as spam?
3. A fair coin is flipped until heads appears. Let X be the number of flips. Using the law of total probability with conditioning on the first flip: P(X=1)=1/2, P(X=k)=P(X=k|first is T)·P(first is T)=P(X=k−1)·1/2. Verify this gives the Geometric distribution.
4. Let X~Uniform(0,2) and Y=X² if X<1, Y=X if X≥1. Compute E[Y] using the law of total expectation: E[Y]=E[Y|X<1]·P(X<1)+E[Y|X≥1]·P(X≥1).
5. In a random walk on {0,1,…,n}: from state k (0<k<n) move to k+1 with prob p and k−1 with prob 1−p. Let h_k=P(reach n before 0 | start at k). Write the recurrence using the law of total probability.

**P55 — Reflect & Consolidate:** "P(A)=∑P(A|Bᵢ)P(Bᵢ) over partition. Weighted average — NOT simple average. Proof: partition A into pieces. Extensions: tower expectation, integral form, first-step analysis recursions."

**P76 — Transfer Probe (Independence mode):**
(a) Law of total variance: Var(X) = E[Var(X|Y)] + Var(E[X|Y]). This is also called the variance decomposition formula. Explain its structure: the first term is the "within-group variance" (average of variance within each Y-group) and the second is the "between-group variance" (variance of the group means). (b) Apply it: X|Y=y ~ Poisson(y), Y~Gamma(α,β). Compute E[X|Y=y]=y and Var(X|Y=y)=y. Then E[X]=E[Y]=α/β. And Var(X)=E[Y]+Var(Y)=α/β+α/β²=α(β+1)/β². This is the negative binomial variance. (c) Why is the law of total variance useful for hierarchical/mixture models?

**P75 — Mastery Assessment:**
"A factory has three machines A, B, C producing 50%, 30%, and 20% of widgets respectively. Machine A produces 2% defective, B produces 5% defective, C produces 8% defective. (a) What fraction of all widgets are defective? (Use the law of total probability.) (b) If a widget is defective, which machine is most likely to have produced it? (This requires Bayes' theorem — set it up, using your answer to (a) as the denominator.)"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW partition definition
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.conditional-probability; reassign

**P78 — Completion:** Law of Total Probability certified. Student states and applies the law; identifies valid partitions; extends to expectation and continuous cases; uses as the building block for Bayes' theorem.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Law of total variance; hierarchical models; negative binomial variance derivation
Skill tested: Apply total probability and total expectation to multi-level models

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

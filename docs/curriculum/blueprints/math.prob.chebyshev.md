<!-- BLUEPRINT: math.prob.chebyshev -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Chebyshev's Inequality
**Concept ID:** `math.prob.chebyshev`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=3 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.prob.chebyshev |
| name | Chebyshev's Inequality |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 3 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.prob.variance |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.prob.variance**: Var(X)=E[(X−μ)²]; σ=√Var(X) as the standard deviation, the natural unit for measuring spread around the mean μ

### Target Knowledge State
Student can state Chebyshev's inequality P(|X−μ|≥kσ)≤1/k² and apply it to bound the probability of a deviation from the mean using only μ and σ, without knowing the distribution's shape; correctly treat the result as an UPPER BOUND (often loose), never as the exact probability; recognise that the inequality applies to ANY distribution with finite mean and variance (its entire value is this universality); and correctly convert a raw deviation into standardized units k=deviation/σ before applying the formula.

### Conceptual Obstacles
1. Treating the ≤ as an = — reading P(|X−μ|≥kσ)≤1/k² as if it says the probability EQUALS 1/k², when the true probability for a specific distribution (e.g. Normal) is typically much smaller; Chebyshev gives a guaranteed ceiling, not the exact value
2. Believing the inequality requires knowing the distribution — its entire purpose is the opposite: it holds for EVERY distribution with a finite mean and variance, with no assumption about shape (normal, skewed, discrete, unknown) at all
3. Plugging a raw deviation value directly in for k instead of standardizing — k counts "how many standard deviations away," so a deviation of 10 units with σ=5 means k=10/5=2, not k=10; skipping this conversion produces a nonsensical or wildly wrong bound

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | BOUND-IS-EXACT | Student treats P(\|X−μ\|≥kσ)≤1/k² as an equality, reporting 1/k² as THE probability rather than an upper bound on it | Any question asking "what is the probability," answered by quoting 1/k² directly without noting it's a ceiling |
| MC-2 | DISTRIBUTION-SPECIFIC-ASSUMPTION | Student believes Chebyshev's inequality can only be applied when the distribution is known (e.g. only for Normal variables), missing that distribution-freeness is the theorem's entire point | Word problems that don't specify a distribution shape, or that explicitly give only a mean and standard deviation |
| MC-3 | RAW-DEVIATION-NOT-STANDARDIZED | Student substitutes a raw deviation (in the variable's original units) directly as k, without dividing by σ first, producing a meaningless or badly wrong bound | Any problem stating a deviation in original units (e.g. "differs from the mean by more than 10") rather than already in units of σ |

**Foundational Misconception:** MC-1 (BOUND-IS-EXACT) — every application of Chebyshev's inequality is a bounding argument, and a student who reads the ≤ as = will misinterpret every subsequent use of the inequality (including in the transfer probe and in the Law of Large Numbers, which this concept unlocks), reporting false precision where the theorem deliberately offers only a guarantee.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — proficient learner computes the bound numerically for a stated μ, σ, and specific deviation before the general statement, anchoring "upper bound, not exact value" from the first example.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: numeric bound computation for k=2 and k=3 with a concrete μ, σ; P: a "worst case" visual (probability mass pushed as far into the tails as variance allows) showing why 1/k² is a ceiling, not the actual value; A: formal statement, standardization of k, and the universality (no distribution assumption) claim
2. **A02 P06 CONTRAST PAIR** — Chebyshev's bound vs. the Normal distribution's actual (much smaller) tail probability at the same k (MC-1); applying Chebyshev to a distribution-free scenario vs. wrongly demanding to know the shape first (MC-2); raw deviation vs. standardized k (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — A Universal, Loose Guarantee

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Compute the bound directly before stating it generally; establish immediately that it is a ceiling, not an exact answer; state the distribution-free scope

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (a random variable with μ=50, σ=5):**

Bound the probability that X deviates from the mean by at least 2 standard deviations (k=2): $P(|X-50|\ge 2(5)) = P(|X-50|\ge 10) \le \dfrac{1}{2^2} = \dfrac{1}{4} = 0.25$.

For k=3 (at least 3 standard deviations, i.e. $|X-50|\ge 15$): $P(|X-50|\ge 15) \le \dfrac{1}{3^2} = \dfrac{1}{9} \approx 0.111$.

Notice: larger k (further from the mean) gives a SMALLER bound — deviating a lot from the mean becomes guaranteed to be rare, for ANY distribution shape, using only μ and σ.

**Stage P — Pictorial (why the bound must be loose, "worst case" intuition):**

```
   Chebyshev's bound: 1/k² is the WORST CASE over all
   possible distributions with the given μ, σ:

   Normal distribution:         Some other distribution
   actual P(|X-μ|≥2σ) ≈ 0.046   engineered to push mass
   (much smaller than 1/4)      exactly to the boundary,
                                 actual P ≈ 1/4 (the bound
                                 is achieved, not beaten)
```

The bound 1/k² is proven to hold for every distribution, so it must be at least as large as the tail probability of the "worst" (most spread-toward-the-tails) distribution consistent with that μ and σ — for well-behaved distributions like the Normal, the true probability is typically far smaller than the bound.

**Stage A — Abstract (the theorem, standardization, and universality):**

**Chebyshev's Inequality:** For a random variable X with mean μ and variance σ² (both finite), and any k>0:
$$P(|X-\mu| \ge k\sigma) \le \frac{1}{k^2}.$$

**Standardization:** k is always "number of standard deviations from the mean" — to apply the inequality to a deviation stated in the variable's original units, first compute k = (raw deviation)/σ.

**Universality (the theorem's entire value):** This bound requires NO assumption about the shape of X's distribution — it holds for Normal, Binomial, Poisson, or a completely unknown/arbitrary distribution, as long as the mean and variance are finite. This is precisely what makes it useful when the distribution is not known but μ and σ are.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** A random variable has μ=100 and σ=8 (distribution unspecified). Give an upper bound on P(|X−100|≥16).

**CORRECT:** 16=2σ (since σ=8, 16/8=2, so k=2). $P(|X-100|\ge 16) \le 1/2^2 = 1/4$.
→ "Correct. Note we never used or needed to know the shape of the distribution — only μ, σ, and the deviation." → Proceed to A02.

**PARTIAL:** Student correctly identifies k=2 but reports the bound as "the probability is 1/4" rather than "at most 1/4."
→ "Chebyshev gives an upper bound, not the exact value — the correct statement is P(|X−100|≥16) ≤ 1/4; the true probability could be much smaller (even close to 0) depending on the actual distribution, but it can never exceed 1/4."

**INCORRECT:** Student plugs k=16 directly (forgetting to divide by σ), computing 1/16²=1/256 (MC-3).
→ "k must be the number of STANDARD DEVIATIONS from the mean, not the raw deviation itself. Here σ=8, so a deviation of 16 is 16/8=2 standard deviations: k=2, giving bound 1/2²=1/4, not 1/16²."

**NO_RESPONSE:** → "Convert the deviation to standard-deviation units: 16/σ=16/8=2, so k=2. Apply the formula: P(|X−100|≥16) ≤ 1/2² = 1/4."

---

### Teaching Action A02 — Loose Bound, Universal Scope, Standardized Units

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 by contrasting the bound with a real distribution's actual (smaller) tail probability; break MC-2 by applying the inequality where the distribution is genuinely unknown; break MC-3 with a raw-vs-standardized deviation contrast

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Chebyshev's ceiling vs. the Normal distribution's actual tail (MC-1):**

For a Normal random variable, the ACTUAL probability of being at least 2σ from the mean is about 0.0455 (a well-known Normal-table value), and at least 3σ is about 0.0027. Compare to Chebyshev's bounds:

| k | Chebyshev bound (1/k²) | Actual Normal tail probability |
|---|--------------------------|----------------------------------|
| 2 | 0.25 | ≈0.0455 |
| 3 | 0.111 | ≈0.0027 |

The bound is roughly 5–40× larger than the true Normal value — Chebyshev is deliberately loose, because it must remain valid even for distributions far less concentrated than the Normal. **Reading 1/k² as "the probability" would overstate the true risk by an order of magnitude for a Normal variable.**

**Contrast 2 — Genuinely unknown distribution: Chebyshev applies; "wait for the shape" does not (MC-2):**

A factory reports that a batch of components has mean lifetime μ=1000 hours and standard deviation σ=50 hours, but the exact distribution of lifetimes is not modeled (could be skewed by early failures, could be roughly symmetric — unknown). Question: bound P(lifetime differs from 1000 by at least 100 hours). Since 100=2σ, Chebyshev gives ≤1/4 immediately — no distributional assumption was needed, is available, or would help beyond what μ and σ already provide. A student insisting "we can't answer this without knowing the distribution" misses that Chebyshev was invented exactly for this situation.

**Contrast 3 — Raw deviation vs. standardized k (MC-3):**

Given μ=200, σ=10, bound P(|X−200|≥40). The RAW deviation is 40 (in the variable's original units, e.g. minutes). Converting: k=40/10=4 (four standard deviations). Bound: 1/4²=1/16=0.0625. Plugging k=40 directly (skipping standardization) would instead give the nonsensical 1/40²=1/1600 — sixteen times smaller than the correct bound, understating the true worst-case risk by conflating "40 units away" with "40 standard deviations away," a much more extreme and different claim.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** A machine fills bottles with mean volume μ=500 mL and σ=4 mL, distribution unspecified. (a) Bound P(a bottle differs from 500 mL by at least 12 mL). (b) A colleague says "we can't compute this without knowing if the fill volumes are Normally distributed." Are they correct? (c) If told instead that fill volumes ARE Normal, would the TRUE probability likely be larger, smaller, or the same as your Chebyshev bound?

**CORRECT:** (a) 12=3σ (12/4=3), so k=3: P ≤ 1/3² = 1/9 ≈ 0.111. (b) Not correct — Chebyshev requires no distributional assumption at all; μ and σ alone suffice. (c) Smaller — Chebyshev's bound is a worst-case ceiling; the actual Normal tail probability at 3σ (≈0.0027) is far below the bound (1/9≈0.111).
→ "Correct throughout — (c) is the key reminder that the bound and the true value are very different numbers whenever more is known about the distribution." → Proceed to A03.

**PARTIAL:** Student gets (a) and (c) but answers (b) "yes, we need the distribution" (MC-2).
→ "Chebyshev needs only μ and σ — that's its defining feature. The colleague is treating it like a distribution-specific tool (e.g. a Normal-table lookup), but Chebyshev was built precisely to give SOME guarantee when the shape is unknown or arbitrary."

**INCORRECT:** Student computes (a) as 1/12²=1/144 (MC-3) and/or answers (c) "the same, since Chebyshev gives the exact probability" (MC-1).
→ "(a) Standardize first: 12/σ=12/4=3, so k=3, giving 1/3²=1/9 — not 1/144 (that would treat 12 itself as the number of standard deviations, which it isn't). (c) Chebyshev is a ceiling, never the exact value; a Normal distribution's real tail probability at k=3 (≈0.0027) is dramatically smaller than the bound (1/9), which is exactly why 'Normal' additional information would change your answer even though Chebyshev's number stays 1/9 regardless."

**NO_RESPONSE:** → "(a) k=12/4=3, bound=1/9≈0.111. (b) Not correct — Chebyshev needs no distributional assumption. (c) Smaller — the bound is a worst-case ceiling, and Normal distributions concentrate mass much closer to the mean than the ceiling allows for."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess bound-vs-exact discipline, distribution-free application, and standardization fluency under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** X has μ=30, σ=6. Bound P(|X−30|≥18).

*Solution:* k=18/6=3. Bound ≤1/9.

**Problem 2:** A survey response time has mean 40 seconds and standard deviation 5 seconds (distribution unknown). Bound the probability that a response takes at least 60 seconds or at most 20 seconds (i.e. |X−40|≥20).

*Solution:* k=20/5=4. Bound ≤1/16=0.0625.

**Problem 3:** True or false, with a one-sentence justification: "If Chebyshev gives P(|X−μ|≥2σ)≤0.25, then the actual probability is 0.25." 

*Solution:* **False** — Chebyshev states an upper bound; the true probability can be (and for well-behaved distributions typically is) considerably smaller than 0.25.

**Problem 4:** A quality metric has μ=75 and σ=3. Using Chebyshev, find the smallest k (as a whole number) such that the bound on P(|X−75|≥kσ) is at most 0.10, then state the corresponding raw deviation.

*Solution:* Need 1/k²≤0.10, i.e. k²≥10, i.e. k≥√10≈3.16, so the smallest whole number is k=4. Bound at k=4: 1/16=0.0625≤0.10 ✓ (k=3 gives 1/9≈0.111>0.10, too large). Raw deviation: 4σ=4(3)=12.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** An investment fund reports average annual return μ=8% with standard deviation σ=15% (return distribution not modeled — could be skewed by rare large gains or losses).

(a) Using Chebyshev, bound the probability that this year's return is either below −22% or above 38% (i.e. deviates from the mean by at least 30 percentage points).
(b) A financial analyst claims: "Since stock returns are famously NOT Normally distributed (they have 'fat tails' — extreme events more often than a Normal model predicts), Chebyshev's bound is actually MORE useful here than a Normal-based calculation would be, not less." Evaluate this claim, connecting it explicitly to what makes Chebyshev distribution-free.
(c) If a second fund has the same μ=8% but σ=25% (more volatile), and you ask for the bound on the same absolute deviation (30 percentage points), would the new bound be larger or smaller than in (a)? Compute it and interpret why the direction makes sense.

**Expected solution:**

(a) k=30/15=2. Bound: P(|X−8%|≥30%) ≤ 1/2² = 1/4 = 0.25.

(b) The analyst is correct, and for exactly the reason Chebyshev is designed for: a Normal-based calculation (e.g. reading a z-table for k=2, giving ≈0.0455) silently ASSUMES Normality, and if returns genuinely have fatter tails than Normal, that Normal-based number would UNDERSTATE the true tail risk — potentially badly. Chebyshev's bound (0.25) makes no such assumption at all; it remains valid regardless of how fat the tails actually are, precisely because its derivation never used a specific distributional shape. This is the practical payoff of distribution-freeness: in a domain (finance) where the "known" distributional assumptions are frequently wrong in the tails, a valid-for-everything (if loose) guarantee can be more trustworthy than a precise-but-fragile one.

(c) New k = 30/25 = 1.2. Bound: 1/(1.2)² = 1/1.44 ≈ 0.694 — LARGER than the first fund's 0.25. This makes sense: with a bigger σ (25% vs 15%), the SAME 30-percentage-point deviation represents FEWER standard deviations away from the mean (1.2 vs 2), so it is less "extreme" in standardized terms, and Chebyshev can no longer guarantee as small a probability — a higher-volatility fund makes any FIXED absolute deviation less surprising, hence the weaker (larger) bound.

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

- MASTERY ACHIEVED → unlock math.prob.lln; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.prob.chebyshev assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — BOUND-IS-EXACT (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Reading P(\|X−μ\|≥kσ)≤1/k² as an equality is BOUND-IS-EXACT. Chebyshev gives a guaranteed CEILING, valid for every distribution — the true probability for any specific distribution is usually well below it."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Chebyshev gives P(\|X−μ\|≥2σ)≤0.25. What is the probability?"
- MC-1 response: "0.25."

**[P64 — CONCEPTUAL SHIFT]**
"The correct reading is 'at most 0.25' — the true value could be much smaller. Concretely, for a Normal variable the real value at k=2 is about 0.0455, more than five times smaller than the Chebyshev ceiling. The bound has to cover EVERY possible distribution with that μ,σ, including unusually spread-out ones, so it must be at least as large as the worst case — for typical, well-behaved distributions it overshoots considerably."

Practice: Compare the Chebyshev bound at k=3 (1/9≈0.111) to the actual Normal tail probability at k=3 (≈0.0027), and state the ratio between them.

---

### Repair Action B02 — DISTRIBUTION-SPECIFIC-ASSUMPTION (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Believing Chebyshev needs a known distribution shape is DISTRIBUTION-SPECIFIC-ASSUMPTION. The theorem's entire purpose is to work for ANY distribution with finite mean and variance — that universality is what makes it useful precisely when the shape is unknown."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "We're told only μ=50, σ=4, no distribution given. Can we bound P(\|X−50\|≥12)?"
- MC-2 response: "No, we'd need to know the distribution first."

**[P64 — CONCEPTUAL SHIFT]**
"Yes, we can, immediately: k=12/4=3, bound ≤1/9. Chebyshev's derivation uses only the definition of variance (via Markov's inequality applied to (X−μ)²) — nothing about the shape of the distribution enters the proof at any step. Contrast with a Normal-table lookup, which DOES require assuming Normality; Chebyshev is the tool for exactly the situation where that assumption isn't available or isn't safe to make."

Practice: Given only μ and σ for an unspecified distribution, compute the Chebyshev bound for k=1, k=2, and k=5, confirming no distributional information was used at any step.

---

### Repair Action B03 — RAW-DEVIATION-NOT-STANDARDIZED (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Plugging a raw deviation directly in for k is RAW-DEVIATION-NOT-STANDARDIZED. k always means 'number of standard deviations from the mean' — a raw deviation must be divided by σ first."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "μ=100, σ=5. Bound P(\|X−100\|≥20)."
- MC-3 response: "k=20, so bound=1/20²=1/400."

**[P64 — CONCEPTUAL SHIFT]**
"First convert: how many standard deviations is a deviation of 20, given σ=5? k=20/5=4 — the correct bound is 1/4²=1/16, not 1/400. Using k=20 directly claims the deviation is 20 STANDARD DEVIATIONS away (an enormous, much rarer event) rather than 20 raw units away (which is only 4 standard deviations here) — always perform deviation÷σ before applying the formula."

Practice: For μ=60, σ=3, bound P(|X−60|≥21) by first computing k=21/3=7, then applying the formula, and compare to the (much smaller, wrong) bound obtained by mistakenly using k=21 directly.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Restate the inequality from memory, including which quantity is the bound and which is the true (unknown) probability |
| SR-2 | +3 days | Compute Chebyshev bounds at k=2 and k=3 and compare against the memorized Normal tail values (≈0.0455, ≈0.0027) to re-anchor the looseness of the bound |
| SR-3 | +7 days | One standardization drill: given μ, σ, and a raw deviation, compute k correctly before applying the formula |
| SR-4 | +14 days | Reconstruct the fat-tails/distribution-free argument (A03 transfer probe) explaining why a loose, universal bound can be more trustworthy than a precise, assumption-laden one |

Retrieval flag: if student reports the Chebyshev bound as an exact probability (MC-1) or skips standardizing k (MC-3), re-execute B01/B03 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.prob.variance | σ (from Var(X)=σ²) is the unit in which k is measured; the inequality is meaningless without a finite variance to standardize against |
| Unlocks | math.prob.lln | The (weak) Law of Large Numbers is proved by applying Chebyshev's inequality to the sample mean, whose variance shrinks with sample size — this concept supplies the exact tool that proof uses |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the inequality to a financial fat-tails scenario, a genuinely new applied context rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=3 → compact structure (2 main TAs + gate), matching other h=3, proficient/apply Tier-2 concepts
- bloom=apply → checkpoints and the gate emphasize direct computation (bounding specific probabilities) over derivation or proof
- CPA_entry = C for a proficient learner: immediate numeric computation anchors "this is a bound, not the answer" before the formal statement can be misread as an equality

**Key teaching insight:** All three misconceptions in this concept share a common thread — each involves treating a carefully hedged, general-purpose mathematical tool as if it were a precise, situation-specific calculation. MC-1 mistakes the ceiling for an exact value; MC-2 mistakes distribution-freeness for a limitation rather than the point; MC-3 mistakes the standardized unit for the raw one. A02's three contrasts are sequenced to hit exactly these three "hedging" properties in turn: looseness, universality, and standardization, so a student leaves with a correct mental model of Chebyshev as "a guarantee that costs you precision in exchange for requiring almost nothing about the distribution."

**Numeric literacy emphasis:** Because this concept is bloom=apply, every teaching action after A01 uses fresh numeric scenarios (bottling machine, survey response time, investment fund) rather than re-explaining the theorem abstractly — the goal is procedural fluency in setting up and standardizing k correctly under varied surface features (percentages, seconds, milliliters), which the transfer probe (A03) tests explicitly by varying σ across two funds and asking the student to reason about the DIRECTION of the resulting change in the bound.

**Sequencing note:** No cross-link concept exists yet for math.prob.chebyshev; the P76 transfer probe instead uses a financial fat-tails scenario, chosen specifically because it is a well-known real domain where the distribution-free property (MC-2's territory) is a genuine practical advantage rather than a textbook abstraction.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.prob.chebyshev ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.prob.variance ✓ | PASS |
| V-3 | CPA entry = C for proficient difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Computation-heavy checkpoints throughout A01-A03 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=3 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Fat-tails financial scenario; σ-sensitivity direction reasoning ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

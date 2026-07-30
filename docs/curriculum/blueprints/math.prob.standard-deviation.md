# Blueprint: math.prob.standard-deviation

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.standard-deviation |
| name | Standard Deviation |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 1 |
| Mastery threshold | 0.95 |
| MAMR | 5/5 |
| Prerequisites | math.prob.variance |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines standard deviation as SD(X)=√Var(X); interprets SD as a measure of spread in the same units as X; distinguishes SD from variance (SD is interpretable, variance is mathematically tractable); applies the formula SD(aX+b)=|a|·SD(X); explains why adding a constant b does not affect spread; and uses SD to describe data spread in context (e.g. "scores are within ±1 SD of the mean about 68% of the time for normal distributions").

## Component 2 — CPA Entry Stage
**C — Concrete** (exam scores: mean=70, variance=100; SD=√100=10; a score of 80 is exactly 1 SD above the mean; a score of 50 is 2 SDs below the mean; contrast with height in cm — if variance=25 cm², SD=5 cm, and a person at mean+1SD is 5 cm taller than average; the SD unit matches the measurement unit, unlike variance which is in cm²)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | SD-AND-VARIANCE-ARE-INTERCHANGEABLE | Student treats SD and variance as synonyms; plugs variance where SD is expected or vice versa; reports SD as "the average squared deviation" | Type 3 — language contamination (both measure "spread"; students confuse them because the formula relationship is simple; instructors sometimes use one when they mean the other informally) |
| MC-2 | ADDING-CONSTANT-CHANGES-SD | Student believes SD(X+5)≠SD(X); thinks shifting the distribution changes its spread | Type 1 — overgeneralisation (E[X+5]=E[X]+5, so students apply the same logic to SD; the correct rule is that SD measures spread AROUND the mean, which is unchanged by a shift) |
| MC-3 | SD-IS-THE-AVERAGE-DEVIATION | Student believes SD=E[|X−μ|] (mean absolute deviation) not √E[(X−μ)²]; confuses the two measures of spread | Type 5 — instruction-induced (mean absolute deviation is mentioned in some curricula as an easier-to-understand alternative; students mix the two formulas) |

## Component 4 — Session TA Cap
**Cap = 3** (hrs = 1 → cap 3)

## Component 5 — Teaching Action Sequence

### A01 — P04 PATTERN INDUCTION
**From variance to standard deviation:**

Var(X) = E[(X−μ)²] — always non-negative; units are (units of X)².
SD(X) = √Var(X) — returns units to the original scale.

**Key rules:**
- SD(aX+b) = |a|·SD(X) (scaling multiplies SD; shifting doesn't change it)
- SD(X+Y) ≠ SD(X)+SD(Y) in general (covariance term; equality only when X,Y independent)
- SD(X+Y) = √(Var(X)+Var(Y)) when X,Y are independent

**Worked example:** X ~ Uniform{1,2,3,4,5}. E[X]=3, E[X²]=11, Var(X)=2. SD(X)=√2≈1.41.
Y=2X−3. SD(Y)=|2|·SD(X)=2√2≈2.83. E[Y]=2·3−3=3. Verify: Y∈{−1,1,3,5,7}, clearly spread twice as widely as X.

**P49 checkpoint:**
- CORRECT → "SD=√Var; units match X; SD(aX+b)=|a|·SD(X)." → Gate (P91)
- PARTIAL → revisit Var(X) definition and the square-root step → Gate
- INCORRECT → TB-R01 → Gate
- NO_RESPONSE → "If Var(X)=9 cm², what is SD(X) in cm? If Y=3X, what is SD(Y)?" → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 ADDING-CONSTANT-CHANGES-SD):**
Step 1 — "Var(X+b)=E[(X+b−(μ+b))²]=E[(X−μ)²]=Var(X). Adding b shifts the mean by b but doesn't move any point relative to the mean. So Var(X+b)=Var(X), hence SD(X+b)=SD(X)."
Step 2 — "Picture: shift all points right by b. The distances between points stay the same. Spread is unchanged."
Step 3 — "Only a SCALING (multiply by a) changes spread: SD(aX)=|a|·SD(X). Combined: SD(aX+b)=|a|·SD(X)."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. X has Var(X)=16. What is SD(X)? What is SD(3X−7)?
2. Scores on a test: mean=50, SD=8. A student scored 66. How many SDs above the mean is this?
3. X and Y are independent with SD(X)=3, SD(Y)=4. What is SD(X+Y)? What is SD(X−Y)?
4. If SD(X)=5, what is Var(X)? If the units of X are metres, what are the units of SD(X)? Of Var(X)?
5. True or false: SD(X+Y)=SD(X)+SD(Y) always. Give a counterexample or prove it.

**P55 — Reflect & Consolidate:** "SD=√Var; same units as X. Shift: no effect. Scale: SD multiplies by |a|. Independent sum: SD²=SD(X)²+SD(Y)² (Pythagoras of spread)."

**P76 — Transfer Probe (Independence mode):**
(a) Chebyshev's inequality: P(|X−μ|≥k·SD(X))≤1/k². For k=2: at most 25% of probability lies more than 2 SDs from the mean — for ANY distribution. Apply to X with mean=100, SD=10: what fraction of outcomes lie outside [80,120]? (b) For a normal distribution the 68-95-99.7 rule gives P(|X−μ|≤SD)≈0.68, P(|X−μ|≤2·SD)≈0.95. How does this compare with Chebyshev's bound at k=2? (c) When would you prefer to report SD rather than variance? When would you prefer variance?

**P75 — Mastery Assessment:**
"X~Bernoulli(p): compute Var(X)=p(1−p) and SD(X)=√(p(1−p)). At what value of p is SD(X) maximised? Interpret geometrically."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW SD(aX+b) rule
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.variance; reassign

**P78 — Completion:** Standard Deviation certified. Student computes SD from variance; applies scaling rules; interprets SD as spread in original units; uses Chebyshev's inequality.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Chebyshev's inequality; comparison with normal 68-95-99.7 rule
Skill tested: Apply SD in the context of probability bounds

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

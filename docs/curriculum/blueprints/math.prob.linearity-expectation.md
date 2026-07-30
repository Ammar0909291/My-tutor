# Blueprint: math.prob.linearity-expectation

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.linearity-expectation |
| name | Linearity of Expectation |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 2 |
| Mastery threshold | 0.95 |
| MAMR | 5/5 |
| Prerequisites | math.prob.expected-value |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student states and applies linearity of expectation: E[aX+bY]=aE[X]+bE[Y] for any random variables X,Y and constants a,b — without requiring independence; uses linearity to compute expectations by decomposing a complex random variable into a sum of simpler indicator variables; and recognises when linearity (vs. variance/independence) is the right tool.

## Component 2 — CPA Entry Stage
**C — Concrete** (birthday problem expectation: what is the expected number of people who share a birthday with at least one other person in a group of n? Direct computation is hard; indicator trick: let Xᵢ=1 if person i shares a birthday with someone; E[number sharing]=∑E[Xᵢ] by linearity; each E[Xᵢ] is computable. The power: linearity sidesteps the complex joint structure.)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | LINEARITY-REQUIRES-INDEPENDENCE | Student refuses to apply E[X+Y]=E[X]+E[Y] when X and Y are dependent; thinks the formula only holds for independent variables | Type 5 — instruction-induced (E[XY]=E[X]E[Y] DOES require independence; students overgeneralise this requirement to E[X+Y], which holds universally) |
| MC-2 | E[XY]=E[X]E[Y]-ALWAYS | Student confuses linearity (E[X+Y]=E[X]+E[Y], always true) with the product rule (E[XY]=E[X]E[Y], true only when independent); applies product rule to dependent variables | Type 1 — overgeneralisation (both look like "expectation distributes"; the distinction is + vs × and dependence) |
| MC-3 | LINEARITY-APPLIES-TO-NONLINEAR-FUNCTIONS | Student believes E[f(X)]=f(E[X]) for general f (e.g. E[X²]=(E[X])², E[1/X]=1/E[X]); conflates linearity with general function-composition | Type 1 — overgeneralisation (linearity DOES give E[aX+b]=aE[X]+b; students extend it to non-linear f, ignoring Jensen's inequality) |

## Component 4 — Session TA Cap
**Cap = 4** (hrs = 2 → cap 4)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Linearity of expectation — the most powerful tool in probabilistic combinatorics:**

**Statement:** For any random variables X₁,…,Xₙ (not necessarily independent) and constants c₁,…,cₙ:
E[c₁X₁+⋯+cₙXₙ] = c₁E[X₁]+⋯+cₙE[Xₙ]

**Why it's surprising:** This holds even when X₁,…,Xₙ are DEPENDENT. The joint distribution is irrelevant.

**Proof sketch:** E[X+Y] = ∑ₓ∑ᵧ (x+y)P(X=x,Y=y) = ∑ₓ∑ᵧ x·P(X=x,Y=y) + ∑ₓ∑ᵧ y·P(X=x,Y=y) = E[X]+E[Y]. No independence assumption used.

**Indicator variable technique:** Let Iₐ=1 if event A occurs, 0 otherwise. E[Iₐ]=P(A). If X=I_{A₁}+⋯+I_{Aₙ}, then E[X]=P(A₁)+⋯+P(Aₙ) — regardless of whether A₁,…,Aₙ are independent.

**Classic application — hat-check problem (derangements):**
n people hand in hats; hats returned randomly. X = number who receive their own hat.
Xᵢ = 1 if person i gets their own hat. E[Xᵢ]=1/n. E[X]=∑E[Xᵢ]=n·(1/n)=1.
Expected number who get own hat = 1, regardless of n. (The Xᵢ are NOT independent — but linearity doesn't care.)

**P49 checkpoint:**
- CORRECT → "E[X+Y]=E[X]+E[Y] always (no independence needed). Indicator technique: X=∑Iₐᵢ → E[X]=∑P(Aᵢ). E[XY]≠E[X]E[Y] in general." → A02
- PARTIAL (thinks independence needed) → "Independence is NOT required for E[X+Y]=E[X]+E[Y]. See the proof: it uses only P(X=x,Y=y) summing to P(X=x) and P(Y=y) marginally — no independence. Independence IS needed for E[XY]=E[X]E[Y]. Keep these two rules separate." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Roll two dice. X=face 1, Y=face 2. Are they independent? Yes. What is E[X+Y]? Now: coin flip H gives 1, T gives 0. Set X=result, Y=1−X. E[X]=1/2, E[Y]=1/2. Are X and Y independent? E[X+Y]=E[1]=1=E[X]+E[Y]. Linearity works even though X and Y are perfectly dependent (negatively correlated)." → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR
**Non-linear function gate:**

**Gate question:** "A student says E[X²]=(E[X])² since 'expectation is linear and you can pull it inside'. Is this correct?"

WRONG. Linearity gives E[aX+b]=aE[X]+b — only for LINEAR functions. f(x)=x² is non-linear. Jensen's inequality: for convex f, E[f(X)]≥f(E[X]). Since x² is convex: E[X²]≥(E[X])² (equality iff X is constant). The gap E[X²]−(E[X])²=Var(X)≥0.

**P49 checkpoint:**
- CORRECT → "E[f(X)]=f(E[X]) only for linear f. For x²: E[X²]≥(E[X])². The gap is exactly Var(X)." → Gate (P91)
- PARTIAL or INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "If X=2 always, then E[X²]=4=(E[X])². Now if X=0 or 2 with equal probability: E[X]=1, E[X²]=(0²+2²)/2=2≠1=(E[X])². What's the difference? Var(X)=E[X²]−(E[X])²." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 LINEARITY-REQUIRES-INDEPENDENCE):**
Step 1 — "The proof of E[X+Y]=E[X]+E[Y] uses only: ∑ₓ∑ᵧ P(X=x,Y=y)=P(X=x) (marginalising over y). This works for ANY joint distribution, dependent or not."
Step 2 — "Compare with E[XY]=E[X]E[Y]: this requires P(X=x,Y=y)=P(X=x)P(Y=y) (independence). The product doesn't factorise without independence."
Step 3 — "Memory rule: + distributes through E always. × distributes through E only when independent."

**TB-R02 (MC-3 LINEARITY-APPLIES-TO-NONLINEAR-FUNCTIONS):**
Step 1 — "Linearity: E[aX+b]=aE[X]+b. Here aX+b is a LINEAR function of X (degree 1, no X², no 1/X, no sin(X))."
Step 2 — "For non-linear f: E[f(X)] and f(E[X]) are generally different. Example: E[1/X]. If X=1 or 2 equally: E[1/X]=(1+1/2)/2=3/4; 1/E[X]=1/(3/2)=2/3. Not equal."
Step 3 — "Jensen's inequality captures the direction of the inequality for convex/concave f: E[f(X)]≥f(E[X]) for convex f (e.g. x², eˣ, x log x); E[f(X)]≤f(E[X]) for concave f (e.g. log x, √x). Linearity is the special case where equality holds exactly."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. A fair die is rolled n times. X = sum of all faces. Compute E[X] using linearity. (Xᵢ = face on roll i; E[Xᵢ]=3.5.)
2. A deck of 52 cards is shuffled. X = number of cards that are in the same position as in the original ordering (fixed points). Compute E[X] without computing the full distribution.
3. X~Binomial(n,p). Using Xᵢ=indicator that trial i succeeds: compute E[X]=np using linearity. (You do NOT need the Binomial PMF formula for this.)
4. Are X and −X independent? Compute E[X+(−X)]=E[0]=0 and E[X]+E[−X]=E[X]−E[X]=0. Does this use independence? Why or why not?
5. If E[X]=3 and E[X²]=13, compute Var(X). Can E[X²] be computed from linearity applied to X²? (Explain why or why not.)

**P55 — Reflect & Consolidate:** "E[X+Y]=E[X]+E[Y] always. Indicator trick: X=∑Iₐᵢ → E[X]=∑P(Aᵢ), no independence needed. E[XY]=E[X]E[Y] only for independent. E[f(X)]=f(E[X]) only for linear f."

**P76 — Transfer Probe (Independence mode):**
(a) Coupon collector problem: collect n types of coupons uniformly at random (with replacement). X = number of draws to complete the collection. Let Xₖ = number of draws to get the k-th new coupon after already having k−1 types. Xₖ~Geometric((n−k+1)/n). By linearity: E[X]=∑_{k=1}^{n} E[Xₖ]=n∑_{k=1}^{n} 1/k = n·H_n where H_n is the n-th harmonic number. Compute E[X] for n=4. (b) This sum ∑Xₖ: are the Xₖ independent? Does your answer to (a) depend on whether they are? (c) For n=365 (birthday coupons), E[X]≈365 ln 365≈2153 draws. Interpret this in the birthday context.

**P75 — Mastery Assessment:**
"n people are seated randomly. Person i 'matches' if they sit in their own seat. X=number of matches. (a) Compute E[X]. (b) Are the indicator events I₁,…,Iₙ independent? (c) Does independence matter for computing E[X]? (d) If instead you want Var(X), does independence matter then? (Hint: Var(∑Xᵢ)=∑Var(Xᵢ)+2∑_{i<j}Cov(Xᵢ,Xⱼ) — the covariance terms do NOT vanish here.)"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW indicator trick application
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.expected-value; reassign

**P78 — Completion:** Linearity of Expectation certified. Student states and applies E[X+Y]=E[X]+E[Y] without independence; uses indicator decomposition; distinguishes from product rule and non-linear case.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Coupon collector problem; linearity in combinatorial probability
Skill tested: Apply indicator decomposition; verify linearity holds regardless of dependence structure

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

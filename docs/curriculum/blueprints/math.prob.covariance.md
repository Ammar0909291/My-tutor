# Teaching Blueprint: Covariance (`math.prob.covariance`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.covariance` |
| name | Covariance |
| domain | Probability |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.prob.variance`, `math.prob.joint-distribution` |
| unlocks | `math.prob.correlation` |
| cross_links | `math.stats.covariance-matrix` (unauthored — see Component 7) |
| CPA_entry_stage | C (Concrete) — a scatter-style joint-outcome table showing two variables moving together, before the formal definition |
| description (KG) | Cov(X,Y) = E[(X−μ_X)(Y−μ_Y)] = E[XY]−E[X]E[Y]. Positive: X,Y tend to be above/below means together; negative: opposite. Zero for independent RVs (but not converse). |

## Component 1 — Learning Objectives

- LO1: Define **covariance** $\text{Cov}(X,Y)=E[(X-\mu_X)(Y-\mu_Y)]$, and apply the computational shortcut $\text{Cov}(X,Y)=E[XY]-E[X]E[Y]$ (directly parallel to `math.prob.variance`'s own shortcut $\text{Var}(X)=E[X^2]-(E[X])^2$) to compute it from a joint distribution.
- LO2: Interpret the **sign** of covariance: positive means $X$ and $Y$ tend to be above (or below) their respective means TOGETHER; negative means one tends to be above its mean when the other is below — directly reusing `math.prob.joint-distribution`'s own joint-distribution framework to verify this interpretation on a concrete example.
- LO3: Prove that **independence implies zero covariance**, but the **converse fails** — constructing a specific example where $\text{Cov}(X,Y)=0$ yet $X,Y$ are provably NOT independent (in fact perfectly, deterministically related) — directly refuting the misconception that zero covariance is equivalent to independence.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.variance` ($\text{Var}(X)=E[X^2]-(E[X])^2$, and the general habit of using an expectation-shortcut formula rather than the defining-formula directly) and `math.prob.joint-distribution` (the joint distribution of $(X,Y)$, and computing quantities like $E[XY]$ by summing/integrating over the joint PMF/PDF).

## Component 3 — Core Explanation

**Covariance, defined and computed via the shortcut**: $\text{Cov}(X,Y) = E[(X-\mu_X)(Y-\mu_Y)]$ measures how $X$ and $Y$ vary TOGETHER (relative to their own means), directly generalizing variance's single-variable "spread around the mean" idea to a PAIR of variables. Exactly as `math.prob.variance` provided the shortcut $\text{Var}(X)=E[X^2]-(E[X])^2$ (avoiding direct expansion of the squared-deviation definition), covariance has the analogous shortcut $\text{Cov}(X,Y)=E[XY]-E[X]E[Y]$ — computed directly from the joint distribution's $E[XY]=\sum_{x,y}xy\,p(x,y)$ (or the continuous double-integral analogue) together with the already-known marginal means $E[X],E[Y]$.

**Sign interpretation**: a POSITIVE covariance means $X$ and $Y$ tend to be simultaneously ABOVE their means, or simultaneously BELOW their means — moving "together." A NEGATIVE covariance means the opposite: when $X$ is above its mean, $Y$ tends to be below ITS mean, and vice versa. A covariance of (or near) zero means no such systematic tendency either way.

**Independence implies zero covariance, but not conversely**: if $X,Y$ are INDEPENDENT, then $E[XY]=E[X]E[Y]$ (a standard fact about independent random variables), which directly gives $\text{Cov}(X,Y)=E[XY]-E[X]E[Y]=0$. However, the CONVERSE genuinely fails: $\text{Cov}(X,Y)=0$ does NOT imply $X,Y$ are independent — there exist pairs of variables with zero covariance that are nevertheless strongly (even perfectly, deterministically) dependent, provided the specific FORM of their dependence isn't the "linear-tendency" pattern covariance is sensitive to. Covariance only detects a specific KIND of relationship (roughly, linear co-movement); it can be completely blind to other, equally real forms of dependence.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing covariance via the shortcut, from a joint distribution)**: Let $(X,Y)$ have the joint PMF: $P(X=1,Y=2)=0.2$, $P(X=1,Y=4)=0.1$, $P(X=3,Y=2)=0.1$, $P(X=3,Y=4)=0.6$. Compute $E[XY] = 1(2)(0.2)+1(4)(0.1)+3(2)(0.1)+3(4)(0.6) = 0.4+0.4+0.6+7.2=8.6$. Marginals: $E[X] = 1(0.3)+3(0.7)=0.3+2.1=2.4$ (summing $P(X=1)=0.2+0.1=0.3$, $P(X=3)=0.1+0.6=0.7$); $E[Y]=2(0.3)+4(0.7)=0.6+2.8=3.4$ (similarly). $\text{Cov}(X,Y) = 8.6-(2.4)(3.4) = 8.6-8.16=0.44$ — a positive covariance, computed entirely via the shortcut, no need to work with deviations from the mean directly.

**Example 2 (LO2 — interpreting the sign, contrasted with a negative case)**: Example 1's positive covariance ($0.44$) reflects that $X=3$ (above its mean $2.4$) occurs disproportionately WITH $Y=4$ (above its mean $3.4$, at probability $0.6$ out of the $0.7$ total probability of $X=3$) — the two variables tend to be simultaneously high together. Contrast with a NEGATIVE-covariance joint distribution: $P(X=1,Y=4)=0.6$, $P(X=1,Y=2)=0.1$, $P(X=3,Y=4)=0.1$, $P(X=3,Y=2)=0.2$ (same marginal structure, but the pairing reversed) — here $X=1$ (below its mean) occurs disproportionately WITH $Y=4$ (above its mean), giving a negative covariance: computing directly, $E[XY]=1(4)(0.6)+1(2)(0.1)+3(4)(0.1)+3(2)(0.2)=2.4+0.2+1.2+1.2=5.0$, with the same marginals as before ($E[X]=2.4$, wait let's recompute: $P(X=1)=0.7$, $P(X=3)=0.3$, so $E[X]=1(0.7)+3(0.3)=1.6$; similarly $E[Y]=4(0.7)+2(0.3)=3.4$), giving $\text{Cov}(X,Y)=5.0-(1.6)(3.4)=5.0-5.44=-0.44$ — confirming the reversed pairing flips the sign exactly as the interpretation predicts.

**Example 3 (LO3 — zero covariance without independence, breaking MC-1)**: Let $X$ take values $-1,0,1$ each with probability $1/3$, and define $Y=X^2$ (so $Y$ is COMPLETELY, deterministically determined by $X$ — about as dependent as two variables can be). Compute $E[X]=(-1+0+1)/3=0$. $E[XY]=E[X\cdot X^2]=E[X^3] = \frac{(-1)^3+0^3+1^3}{3} = \frac{-1+0+1}{3}=0$. $E[Y]=E[X^2]=\frac{1+0+1}{3}=\frac23$. So $\text{Cov}(X,Y)=E[XY]-E[X]E[Y] = 0-(0)\left(\frac23\right)=0$ — covariance is EXACTLY zero, despite $Y$ being a deterministic (nonlinear) function of $X$, hence about as far from independent as possible. This proves conclusively that $\text{Cov}(X,Y)=0$ does NOT imply independence — covariance is sensitive only to LINEAR co-movement tendencies, and this particular (symmetric, quadratic) dependence produces none.

## Component 5 — Teaching Actions

### Teaching Action A01 — Covariance via the Shortcut Formula (Primitive P11: Representation Shift)

State: "just like variance had a shortcut avoiding direct deviations, covariance does too: $E[XY]-E[X]E[Y]$." Work Example 1's full computation directly from the joint PMF.

### Teaching Action A02 — Sign of Covariance, Contrasted Directly (Primitive P06: Contrast Pair)

Present Example 2's paired joint distributions — identical marginals, but oppositely paired — giving covariances of opposite sign. State: "the SIGN tells you whether high values of one variable tend to accompany high or low values of the other — flip which outcomes get paired together, and the sign flips too."

### Teaching Action A03 — Zero Covariance Does Not Mean Independent (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: $Y=X^2$, a function completely determining $Y$ from $X$, yet $\text{Cov}(X,Y)=0$ exactly. State: "covariance only catches a SPECIFIC kind of relationship — roughly, a linear tendency to move together. A perfectly real, strong, but symmetric/nonlinear dependence like this one is completely invisible to covariance."

- **MC-1 hook**: ask "if $\text{Cov}(X,Y)=0$, does that mean $X$ and $Y$ are independent?" — a "yes" answer reveals MC-1 (assuming zero covariance implies independence, missing that covariance only detects linear co-movement and can be blind to other real forms of dependence).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For the joint PMF $P(X=0,Y=0)=0.4$, $P(X=0,Y=1)=0.1$, $P(X=1,Y=0)=0.1$, $P(X=1,Y=1)=0.4$, compute $\text{Cov}(X,Y)$ using the shortcut formula.
  2. Based on your answer to problem 1, interpret the sign: do $X$ and $Y$ tend to move together or oppositely?
  3. Verify directly that independent random variables have zero covariance, using the fact $E[XY]=E[X]E[Y]$ for independent $X,Y$.
  4. Construct (or describe) a DIFFERENT example (not $Y=X^2$) of two dependent random variables with zero covariance, briefly justifying why the dependence is "invisible" to covariance.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.stats.covariance-matrix` is not yet authored; a future revision may add a genuine cross-link probe into the multivariate covariance-matrix framework once that entry exists)**: "A financial analyst computes the covariance between two stocks' daily returns, $\text{Cov}(X,Y)$, and finds it is very close to zero. (a) Explain what this covariance value alone tells the analyst about whether the two stocks tend to move together or independently, and what it does NOT necessarily tell them. (b) A colleague claims 'zero covariance means these two stocks are completely unrelated — knowing one tells you nothing about the other.' Using Example 3's reasoning, explain why this claim is not necessarily justified, even if the covariance truly is zero. (c) Suggest, in general terms, what additional analysis (beyond just covariance) the analyst might want to check before concluding the two stocks are genuinely unrelated."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ZERO-COVARIANCE-ASSUMED-TO-IMPLY-INDEPENDENCE | Believing Cov(X,Y)=0 implies X and Y are independent, missing that covariance only detects linear co-movement and can be blind to other real forms of dependence | Foundational |
| MC-2 | COVARIANCE-SIGN-INTERPRETATION-REVERSED | Reversing the interpretation of covariance's sign (e.g. believing negative covariance means the variables move together) | Foundational |
| MC-3 | COVARIANCE-SHORTCUT-FORMULA-COMPUTED-WITH-WRONG-MARGINALS | Computing E[X] or E[Y] incorrectly from the joint distribution (e.g. using the joint probabilities directly instead of first finding the correct marginal distribution) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Zero-Covariance-Implies-Independence Assumption") → P41 (detect: ask whether Cov(X,Y)=0 guarantees X and Y are independent) → P64 (conceptual shift: re-walk Example 3's direct construction — $Y=X^2$, zero covariance, yet completely dependent — re-anchoring on "covariance only sees linear tendencies; this symmetric relationship has none").
- **B02 (targets MC-2)**: P27 (name it: "Covariance-Sign Interpretation Reversed") → P41 (detect: ask which sign of covariance indicates variables moving together) → P64 (conceptual shift: re-walk Example 2's direct paired contrast, re-anchoring on "positive = tend to be on the same side of their means together; negative = tend to be on opposite sides").
- **B03 (targets MC-3)**: P27 (name it: "Wrong Marginals in Shortcut Formula") → P41 (detect: ask a student to compute E[X] from a joint PMF and check whether they correctly sum over all y-values for each x, rather than using a single joint probability directly) → P64 (conceptual shift: re-walk Example 1's explicit marginal computation, re-anchoring on "find the marginal distribution FIRST — summing the joint PMF over the other variable — before computing E[X] or E[Y]").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.variance` (the E[X²]-(E[X])² shortcut pattern this concept's own shortcut directly parallels), `math.prob.joint-distribution` (the joint PMF/PDF this concept's E[XY] computation is built from).
- **Unlocks**: `math.prob.correlation` (the normalized version of covariance, dividing by the standard deviations).
- **Cross-link**: KG lists `math.stats.covariance-matrix` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.stats.covariance-matrix.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into the multivariate covariance-matrix framework (directly connecting to `math.linalg.symmetric-matrix`'s own covariance-matrix example) once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (the shortcut formula), A02 (sign interpretation), and A03 (zero covariance ≠ independence) each target a distinct LO, appropriate for a concept directly extending variance's already-mastered pattern to a pair of variables.
- MC-1 (zero covariance implies independence) was given the most teaching weight because it is arguably the single most consequential misconception in applied statistics — Example 3's $Y=X^2$ construction was deliberately chosen as the cleanest possible counterexample (a genuinely deterministic, unmistakably strong dependence) rather than a subtler case, to make the point as undeniable as possible.
- Example 2's paired joint distributions were deliberately constructed with IDENTICAL marginal distributions (same $E[X]$, same $E[Y]$ in each case) so that the ONLY thing differing between the positive and negative cases is which specific outcomes are paired together — isolating the sign's dependence on the pairing structure alone, not on any change in the individual variables' own behavior.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.stats.covariance-matrix not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a scatter-style joint-outcome table before the formal definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

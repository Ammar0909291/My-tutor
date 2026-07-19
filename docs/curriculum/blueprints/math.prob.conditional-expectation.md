# Teaching Blueprint: Conditional Expectation (`math.prob.conditional-expectation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.conditional-expectation` |
| name | Conditional Expectation |
| domain | Probability |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.prob.conditional-distribution` |
| unlocks | none |
| cross_links | `math.prob.martingale` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already computes $E[X\mid Y=y]$ for fixed $y$ (from `math.prob.conditional-distribution`); the shift to $E[X\mid Y]$ as a random variable is introduced directly |
| description (KG) | $E[X\mid Y]$ is a random variable, function of $Y$. Tower property (law of total expectation): $E[X]=E[E[X\mid Y]]$. Law of total variance: $\mathrm{Var}(X)=E[\mathrm{Var}(X\mid Y)]+\mathrm{Var}(E[X\mid Y])$. |

## Component 1 — Learning Objectives

- LO1: Recognize the shift from $E[X\mid Y=y]$ (`math.prob.conditional-distribution`'s own single NUMBER, computed for one fixed value $y$) to $E[X\mid Y]$ — a RANDOM VARIABLE, a function of $Y$ itself, taking the value $E[X\mid Y=y]$ whenever $Y=y$ occurs.
- LO2: Apply the **tower property** (law of total expectation) $E[X]=E[E[X\mid Y]]$ — computing $E[X]$ by first computing the conditional expectation as a function of $Y$, then taking the expectation of THAT function over $Y$'s own distribution — and verify it reproduces the ordinary marginal expectation on a concrete example.
- LO3 (orientation level — full variance-decomposition derivation deferred): recognize, without full derivation, the **law of total variance** $\mathrm{Var}(X)=E[\mathrm{Var}(X\mid Y)]+\mathrm{Var}(E[X\mid Y])$ — decomposing $X$'s total variance into an "average within-group variance" term and a "between-group variance" term, previewing its role in `math.prob.martingale`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.conditional-distribution` ($f_{X\mid Y}(x\mid y)=f(x,y)/f_Y(y)$ and the resulting conditional expectation $E[X\mid Y=y]=\int xf_{X\mid Y}(x\mid y)\,dx$, computed for one fixed $y$).

## Component 3 — Core Explanation

**$E[X\mid Y]$ is a random variable, not a single number**: `math.prob.conditional-distribution` computed $E[X\mid Y=y]$ for one SPECIFIC value $y$ — a single number. $E[X\mid Y]$ (without fixing $y$) instead denotes the FUNCTION $g(Y)$ where $g(y)=E[X\mid Y=y]$ for each possible $y$ — since $Y$ itself is random, $g(Y)$ is also a random variable, taking different values depending on which value $Y$ happens to take. This is the same relationship as, e.g., $Y^2$ being a random variable built by applying a function to $Y$; here the function is "compute the conditional expectation of $X$ given this value of $Y$."

**The tower property lets you compute $E[X]$ in two stages, using $Y$ as an intermediate**: $E[X]=E[E[X\mid Y]]$ says: first compute $g(Y)=E[X\mid Y]$ (a function of $Y$), then take ITS expectation over $Y$'s own distribution — $E[g(Y)]=\sum_yg(y)f_Y(y)$. This two-stage computation is guaranteed to produce the SAME answer as computing $E[X]$ directly from $X$'s marginal distribution, because $\sum_yE[X\mid Y=y]f_Y(y)=\sum_y\left(\sum_xxf_{X\mid Y}(x\mid y)\right)f_Y(y)=\sum_x x\sum_yf_{X\mid Y}(x\mid y)f_Y(y)=\sum_xxf_X(x)=E[X]$ (swapping the order of summation and using $f_{X\mid Y}(x\mid y)f_Y(y)=f(x,y)$, then summing out $y$ to recover the marginal $f_X(x)$).

**The law of total variance decomposes total variance into within-group and between-group parts (orientation level)**: $\mathrm{Var}(X)=E[\mathrm{Var}(X\mid Y)]+\mathrm{Var}(E[X\mid Y])$ splits $X$'s total variance into two genuinely different sources: $E[\mathrm{Var}(X\mid Y)]$ — the AVERAGE of how much $X$ varies WITHIN each fixed value of $Y$ — and $\mathrm{Var}(E[X\mid Y])$ — how much the conditional MEAN itself varies ACROSS different values of $Y$. Full derivation and its role as the variance analogue of the tower property is deferred beyond this concept's core scope, previewed further in `math.prob.martingale`.

## Component 4 — Worked Examples

**Example 1 (LO1 — $E[X\mid Y]$ as a function of $Y$, breaking MC-1)**: reusing the joint PMF $f(1,1)=0.1,f(1,2)=0.2,f(2,1)=0.3,f(2,2)=0.4$ (from `math.prob.conditional-distribution`'s own worked example): $E[X\mid Y=1]=1.75$ was already computed there, and computing $E[X\mid Y=2]$ similarly: $f_Y(2)=f(1,2)+f(2,2)=0.2+0.4=0.6$; $f_{X\mid Y}(1\mid2)=0.2/0.6=1/3$, $f_{X\mid Y}(2\mid2)=0.4/0.6=2/3$; so $E[X\mid Y=2]=1(1/3)+2(2/3)=1/3+4/3=5/3\approx1.67$. Together, $E[X\mid Y]$ is the FUNCTION $g$ with $g(1)=1.75$ and $g(2)\approx1.67$ — a genuinely different object from either single number, since it packages BOTH conditional expectations as one function of $Y$.

**Example 2 (LO2 — verifying the tower property reproduces the marginal expectation, breaking MC-2)**: continuing Example 1, with $f_Y(1)=0.4$ and $f_Y(2)=0.6$: $E[E[X\mid Y]]=E[X\mid Y=1]\cdot f_Y(1)+E[X\mid Y=2]\cdot f_Y(2)=1.75(0.4)+\frac{5}{3}(0.6)=0.7+1=1.7$. This matches EXACTLY `math.prob.conditional-distribution`'s own directly-computed marginal expectation $E[X]=1.7$ — confirming the tower property genuinely reproduces the same answer via this two-stage route (condition on $Y$, then average over $Y$), not merely approximately or by coincidence.

**Example 3 (LO3, orientation level — the law of total variance decomposing sources of variability, breaking MC-3)**: consider a factory with two production lines ($Y=1,2$) with EQUAL within-line variability in defect count ($\mathrm{Var}(X\mid Y=1)=\mathrm{Var}(X\mid Y=2)=0.5$, so $E[\mathrm{Var}(X\mid Y)]=0.5$), but where Line 1's average defect count is far lower than Line 2's (e.g. $E[X\mid Y=1]=0.5$ vs. $E[X\mid Y=2]=5$, giving a large $\mathrm{Var}(E[X\mid Y])$). Here MOST of $X$'s total variance comes from the BETWEEN-line difference in average defect rates, not from within-line randomness — the law of total variance makes this decomposition explicit and QUANTIFIABLE, rather than leaving "how much of the variability is due to which line" as a vague qualitative impression.

## Component 5 — Teaching Actions

### Teaching Action A01 — $E[X\mid Y]$ Packages All the Single-Value Conditional Expectations Into One Function (Primitive P11: Representation Shift)

State: "you already know how to compute $E[X\mid Y=y]$ for one fixed $y$ — $E[X\mid Y]$ is just the FUNCTION that does this for every possible $y$, making it itself a random variable once $Y$ varies." Walk Example 1's construction of $g(1)$ and $g(2)$ as one packaged function.

- **MC-1 hook**: ask "is $E[X\mid Y]$ (without a specific value substituted for $Y$) just another way of writing a single number, the same as $E[X\mid Y=y]$ for some fixed $y$?" — a "yes" answer reveals MC-1 (missing that $E[X\mid Y]$ is a random variable — a function of $Y$ — not a single number).

### Teaching Action A02 — The Tower Property Genuinely Reproduces the Marginal Expectation (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the two-stage computation ($E[E[X\mid Y]]$) gave EXACTLY $1.7$, matching the marginal $E[X]$ computed directly. State: "this isn't an approximation or a coincidence — conditioning on $Y$ and then averaging over $Y$'s own distribution is mathematically guaranteed to reproduce $E[X]$ exactly, every time."

- **MC-2 hook**: ask "does the tower property $E[X]=E[E[X\mid Y]]$ give only an approximate estimate of $E[X]$, rather than the exact value?" — a "yes" answer reveals MC-2 (missing that the tower property is an EXACT identity, not an approximation).

### Teaching Action A03 — Total Variance Splits Into Within-Group and Between-Group Sources (Primitive P06: Contrast Pair)

Contrast Example 3's LOW within-line variance ($E[\mathrm{Var}(X\mid Y)]=0.5$) against its LARGE between-line variance ($\mathrm{Var}(E[X\mid Y])$, driven by the $0.5$ vs. $5$ gap in conditional means). State: "total variance isn't one undifferentiated quantity — the law of total variance splits it into how much comes from randomness WITHIN each group versus how much comes from differences BETWEEN group averages, and these can contribute very unequally."

- **MC-3 hook**: ask "does the law of total variance mainly serve as a formula to double-check $\mathrm{Var}(X)$'s numeric value, without revealing anything about WHERE that variance comes from?" — a "yes" answer reveals MC-3 (missing that its real value is decomposing total variance into interpretable within-group and between-group sources).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Given $E[X\mid Y=1]=3$ and $E[X\mid Y=2]=7$ with $f_Y(1)=0.3,f_Y(2)=0.7$, describe $E[X\mid Y]$ as a function, and compute $E[E[X\mid Y]]$.
  2. Using the same data, explain in one sentence why $E[X\mid Y]$ is a random variable rather than a single number.
  3. Suppose $\mathrm{Var}(X\mid Y=1)=1$ and $\mathrm{Var}(X\mid Y=2)=1$ (equal within-group variances) but the conditional means from problem 1 differ substantially — explain qualitatively which term in the law of total variance is likely to dominate $\mathrm{Var}(X)$.
  4. Explain why the tower property's two-stage computation is guaranteed to equal the directly-computed marginal expectation, rather than being merely a useful approximation.
- **P76 (Transfer Probe, mode = independence)**: "An insurance company models claim size $X$ conditional on policy type $Y$ (basic or premium), with $E[X\mid Y=\text{basic}]=200$, $E[X\mid Y=\text{premium}]=800$, and $60\%$ of policies are basic. (a) Compute the company's overall average claim size $E[X]$ using the tower property. (b) Explain why this two-stage computation gives the exact overall average, not an approximation. (c) If within-policy-type claim variance is roughly similar for both types, but the two types' average claims differ sharply (as given), explain — citing the law of total variance — whether the total variance in claim size is likely to be dominated by within-type or between-type variability, and what this implies about whether policy type is a USEFUL variable for the company to track."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | E-X-GIVEN-Y-ASSUMED-SINGLE-NUMBER | Believing $E[X\mid Y]$ (unconditioned on a specific value) is just another way of writing a single number, missing that it is a random variable — a function of $Y$ | Foundational |
| MC-2 | TOWER-PROPERTY-ASSUMED-APPROXIMATE | Believing the tower property $E[X]=E[E[X\mid Y]]$ gives only an approximate estimate of $E[X]$, missing that it is an exact identity | High |
| MC-3 | TOTAL-VARIANCE-ASSUMED-UNDIFFERENTIATED | Believing the law of total variance mainly double-checks $\mathrm{Var}(X)$'s value without revealing its sources, missing that it decomposes variance into within-group and between-group parts | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "E[X|Y] Assumed Single Number") → P41 (detect: ask whether $E[X\mid Y]$ is just another way of writing a single number) → P64 (conceptual shift: re-walk Example 1's packaging of $g(1)$ and $g(2)$ into one function, re-anchoring on "$E[X\mid Y]$ is a random variable, a function of $Y$").
- **B02 (targets MC-2)**: P27 (name it: "Tower Property Assumed Approximate") → P41 (detect: ask whether the tower property gives only an approximate estimate) → P64 (conceptual shift: re-walk Example 2's exact-match verification, re-anchoring on "the tower property is an exact identity, not an approximation").
- **B03 (targets MC-3)**: P27 (name it: "Total Variance Assumed Undifferentiated") → P41 (detect: ask whether the law of total variance mainly serves to double-check a numeric value) → P64 (conceptual shift: re-walk Example 3's within-versus-between decomposition, re-anchoring on "its real value is revealing WHERE variance comes from").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.conditional-distribution` ($E[X\mid Y=y]$ for a fixed $y$, directly extended here to the random variable $E[X\mid Y]$).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.prob.martingale`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/analyze tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the function-construction and the exact tower-property verification) and LO3 kept orientation-level, appropriately previewing the law of total variance's decomposition without deriving it algebraically.
- **Division of labor**: `math.prob.conditional-distribution` owns computing $E[X\mid Y=y]$ for one fixed $y$; this concept owns the SHIFT to viewing $E[X\mid Y]$ as a random variable and the resulting tower-property/total-variance machinery — deliberately reusing the EXACT joint PMF from `math.prob.conditional-distribution`'s own worked example across Examples 1–2, so the new $E[X\mid Y=2]=5/3$ computation and the tower-property verification connect directly to already-computed values rather than introducing an unrelated data set.
- Example 3's deliberate choice of EQUAL within-group variances (isolating the between-group term as the dominant contributor) was chosen to make the within-versus-between decomposition's practical implication clearly visible in one worked scenario, without requiring both terms' exact numeric values to be computed.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.prob.martingale` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already computes $E[X\mid Y=y]$; shift to $E[X\mid Y]$ as a random variable introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

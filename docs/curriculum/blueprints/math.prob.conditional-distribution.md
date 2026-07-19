# Teaching Blueprint: Conditional Distribution (`math.prob.conditional-distribution`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.conditional-distribution` |
| name | Conditional Distribution |
| domain | Probability |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.prob.joint-distribution`, `math.prob.conditional-probability` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — computing one specific conditional distribution from a small joint table before naming the general formula |
| description (KG) | $f_{X\mid Y}(x\mid y)=f(x,y)/f_Y(y)$. The distribution of $X$ given $Y=y$. Conditional expectation $E[X\mid Y=y]=\int xf_{X\mid Y}(x\mid y)\,dx$ generalizes conditional probability. |

## Component 1 — Learning Objectives

- LO1: Define the **conditional distribution** $f_{X\mid Y}(x\mid y)=\dfrac{f(x,y)}{f_Y(y)}$, recognizing it as `math.prob.conditional-probability`'s own formula $P(A\mid B)=P(A\cap B)/P(B)$ applied at the level of ENTIRE DISTRIBUTIONS rather than single events — the joint density/PMF $f(x,y)$ plays the role of $P(A\cap B)$, and the marginal $f_Y(y)$ plays the role of $P(B)$.
- LO2: Compute a conditional distribution $f_{X\mid Y}(x\mid y)$ from a given joint distribution (from `math.prob.joint-distribution`) by fixing $Y=y$ and normalizing by the marginal $f_Y(y)$, and verify the result is itself a genuine, properly normalized probability distribution (summing/integrating to $1$).
- LO3 (orientation level — full conditional-expectation theory deferred): recognize, without full derivation, that the **conditional expectation** $E[X\mid Y=y]=\int xf_{X\mid Y}(x\mid y)\,dx$ generalizes ordinary expectation the same way the conditional distribution generalizes the ordinary (marginal) distribution — computed as an average over the CONDITIONAL distribution rather than the marginal one.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.joint-distribution` (the joint PMF/PDF $f(x,y)$ describing $(X,Y)$ together) and `math.prob.conditional-probability` ($P(A\mid B)=P(A\cap B)/P(B)$, updating the sample space from $\Omega$ to $B$).

## Component 3 — Core Explanation

**The conditional distribution formula is conditional probability, applied to entire distributions**: `math.prob.conditional-probability` established $P(A\mid B)=P(A\cap B)/P(B)$ — updating probabilities once $B$ is known to have occurred. The conditional distribution formula $f_{X\mid Y}(x\mid y)=f(x,y)/f_Y(y)$ is the SAME structural idea, applied not to a single event $A$ but to the ENTIRE distribution of $X$: the joint value $f(x,y)$ (the "intersection" of $X=x$ and $Y=y$) is divided by the marginal $f_Y(y)$ (the "conditioning event" $Y=y$'s own probability/density) — producing, for each fixed $y$, a complete distribution over $x$, rather than a single conditional probability number.

**Computing and verifying a conditional distribution is genuinely a distribution**: given a joint distribution $f(x,y)$, fixing $Y=y$ and dividing every value $f(x,y)$ (as $x$ varies) by the SAME constant $f_Y(y)$ produces $f_{X\mid Y}(x\mid y)$. Because $f_Y(y)=\sum_xf(x,y)$ (or $\int f(x,y)\,dx$ in the continuous case) by definition of the marginal, dividing by this exact normalizing constant guarantees $\sum_xf_{X\mid Y}(x\mid y)=1$ — the result is not merely "proportional to a distribution," it IS a genuine, properly normalized distribution in its own right.

**Conditional expectation as an average over the conditional distribution (orientation level)**: just as ordinary expectation $E[X]=\int xf_X(x)\,dx$ averages $x$ over $X$'s MARGINAL distribution, conditional expectation $E[X\mid Y=y]=\int xf_{X\mid Y}(x\mid y)\,dx$ averages $x$ over $X$'s CONDITIONAL distribution given $Y=y$ — the exact same averaging operation, just applied to the updated (conditional) distribution rather than the original (marginal) one. Full development of conditional expectation's properties (e.g. the law of total expectation) is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — conditional distribution as conditional probability applied to distributions, breaking MC-1)**: given the joint PMF (discrete $X,Y\in\{1,2\}$): $f(1,1)=0.1$, $f(1,2)=0.2$, $f(2,1)=0.3$, $f(2,2)=0.4$. The marginal $f_Y(1)=f(1,1)+f(2,1)=0.1+0.3=0.4$. Then $f_{X\mid Y}(1\mid1)=\frac{f(1,1)}{f_Y(1)}=\frac{0.1}{0.4}=0.25$ and $f_{X\mid Y}(2\mid1)=\frac{f(2,1)}{f_Y(1)}=\frac{0.3}{0.4}=0.75$ — directly matching `math.prob.conditional-probability`'s structure: $P(X=1\mid Y=1)=\frac{P(X=1,Y=1)}{P(Y=1)}$, with $f(x,y)$ playing the role of the joint probability and $f_Y(y)$ playing the role of the conditioning event's probability.

**Example 2 (LO2 — verifying the result is a genuine normalized distribution, breaking MC-2)**: continuing Example 1, checking $f_{X\mid Y}(\cdot\mid1)$ sums to $1$: $f_{X\mid Y}(1\mid1)+f_{X\mid Y}(2\mid1)=0.25+0.75=1$ ✓ — this is GUARANTEED, not a coincidence, because $f_Y(1)=f(1,1)+f(2,1)$ is EXACTLY the sum of the numerators, so dividing each numerator by that same sum always produces terms summing to $1$. This confirms $f_{X\mid Y}(\cdot\mid1)$ is a legitimate probability distribution over $x$, not merely a scaled-down version of the joint row.

**Example 3 (LO3, orientation level — conditional expectation as an average over the conditional distribution, breaking MC-3)**: using Example 1's conditional distribution $f_{X\mid Y}(1\mid1)=0.25$, $f_{X\mid Y}(2\mid1)=0.75$: the conditional expectation is $E[X\mid Y=1]=1(0.25)+2(0.75)=0.25+1.5=1.75$. Contrast with the MARGINAL expectation $E[X]=1\cdot f_X(1)+2\cdot f_X(2)$ where $f_X(1)=f(1,1)+f(1,2)=0.1+0.2=0.3$ and $f_X(2)=f(2,1)+f(2,2)=0.3+0.4=0.7$, giving $E[X]=1(0.3)+2(0.7)=0.3+1.4=1.7$ — genuinely DIFFERENT from $E[X\mid Y=1]=1.75$, confirming that conditioning on $Y=1$ shifts the expected value of $X$ away from its unconditional average, exactly because it uses a different (conditional, not marginal) distribution to average over.

## Component 5 — Teaching Actions

### Teaching Action A01 — Conditional Distribution Is Conditional Probability, Scaled Up (Primitive P11: Representation Shift)

State: "you already know $P(A\mid B)=P(A\cap B)/P(B)$ — the conditional distribution formula is exactly this, just applied to an entire distribution over $x$ instead of one event $A$ at a time." Walk Example 1's direct structural match.

- **MC-1 hook**: ask "is the conditional distribution formula $f_{X\mid Y}(x\mid y)=f(x,y)/f_Y(y)$ a genuinely new probability concept, unrelated to conditional probability $P(A\mid B)$?" — a "yes" answer reveals MC-1 (missing that it is the same conditional-probability structure, applied across an entire distribution rather than a single event).

### Teaching Action A02 — Dividing By the Marginal Guarantees Proper Normalization (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the resulting conditional probabilities summed to EXACTLY $1$, not approximately or by coincidence. State: "dividing every joint value by the SAME marginal isn't just a rescaling trick — it's precisely what guarantees the result sums to $1$, because the marginal IS the sum of those same joint values."

- **MC-2 hook**: ask "is the result of computing $f(x,y)/f_Y(y)$ for each $x$ merely a 'proportional' or 'rescaled' version of the joint row, rather than a genuine, properly normalized probability distribution?" — a "yes" answer reveals MC-2 (missing that dividing by the marginal is EXACTLY the normalization needed to guarantee the result sums to 1, making it a genuine distribution).

### Teaching Action A03 — Conditioning Can Genuinely Change the Expected Value (Primitive P06: Contrast Pair)

Contrast Example 3's marginal expectation $E[X]=1.7$ against the conditional expectation $E[X\mid Y=1]=1.75$ — genuinely different numbers, from the same joint distribution. State: "conditioning isn't a cosmetic relabeling — averaging over the CONDITIONAL distribution instead of the marginal one can genuinely shift the expected value, because you're averaging over a different distribution."

- **MC-3 hook**: ask "should the conditional expectation $E[X\mid Y=y]$ always equal the ordinary (marginal) expectation $E[X]$, since both are 'the expected value of $X$'?" — a "yes" answer reveals MC-3 (missing that conditioning generally shifts the distribution being averaged over, so the two expectations can genuinely differ).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Given a joint PMF $f(1,1)=0.15,f(1,2)=0.25,f(2,1)=0.2,f(2,2)=0.4$, compute the marginal $f_Y(2)$ and the conditional distribution $f_{X\mid Y}(\cdot\mid2)$.
  2. Verify your answer to problem 1 sums to $1$, and explain WHY this is guaranteed rather than coincidental.
  3. Using the same joint PMF, compute $E[X\mid Y=2]$.
  4. Explain, citing the structural parallel, why the conditional distribution formula is not a new probability concept but an application of conditional probability to entire distributions.
- **P76 (Transfer Probe, mode = independence)**: "A quality-control process records $(X,Y)$ where $X$ is a product's defect count and $Y$ indicates which of two production lines made it ($Y=1$ or $Y=2$), with joint PMF $f(0,1)=0.3,f(1,1)=0.1,f(0,2)=0.2,f(1,2)=0.4$. (a) Compute the conditional distribution of defect count $X$ given the product came from Line 2, $f_{X\mid Y}(\cdot\mid2)$, and verify it sums to $1$. (b) Compute $E[X\mid Y=2]$, the expected defect count for Line 2 specifically. (c) A manager claims 'the expected defect count is the same regardless of which line made the product, since it's the same product line overall' — evaluate this claim by also computing the marginal $E[X]$ and comparing."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONDITIONAL-DISTRIBUTION-ASSUMED-NEW-CONCEPT | Believing the conditional distribution formula is a genuinely new probability concept, missing that it is conditional probability's own structure applied across an entire distribution | Foundational |
| MC-2 | CONDITIONAL-DISTRIBUTION-ASSUMED-MERELY-RESCALED | Believing the result of dividing joint values by the marginal is merely a "proportional" rescaling, missing that this division is exactly what guarantees proper normalization to a genuine distribution | High |
| MC-3 | CONDITIONAL-EXPECTATION-ASSUMED-EQUAL-TO-MARGINAL | Believing the conditional expectation must equal the ordinary (marginal) expectation, missing that conditioning shifts the distribution being averaged over, so the two can genuinely differ | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Conditional Distribution Assumed New Concept") → P41 (detect: ask whether the conditional distribution formula is a genuinely new probability concept) → P64 (conceptual shift: re-walk Example 1's structural match to conditional probability, re-anchoring on "the same conditioning structure, applied across an entire distribution").
- **B02 (targets MC-2)**: P27 (name it: "Conditional Distribution Assumed Merely Rescaled") → P41 (detect: ask whether the result is merely a proportional rescaling rather than a genuine distribution) → P64 (conceptual shift: re-walk Example 2's guaranteed-sum-to-1 verification, re-anchoring on "dividing by the marginal is exactly the normalization guaranteeing a genuine distribution").
- **B03 (targets MC-3)**: P27 (name it: "Conditional Expectation Assumed Equal to Marginal") → P41 (detect: ask whether conditional expectation must equal the ordinary marginal expectation) → P64 (conceptual shift: re-walk Example 3's numeric mismatch, re-anchoring on "conditioning shifts the distribution being averaged over, so the two expectations can genuinely differ").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.joint-distribution` (the joint PMF/PDF $f(x,y)$ this concept conditions and normalizes) and `math.prob.conditional-probability` ($P(A\mid B)=P(A\cap B)/P(B)$, the exact structural template this concept's formula generalizes to entire distributions).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the structural derivation and the normalization verification) and LO3 kept orientation-level, appropriately introducing conditional expectation as an averaging analogy without deriving the law of total expectation or its variance analogue.
- **Division of labor**: `math.prob.conditional-probability` owns the general $P(A\mid B)=P(A\cap B)/P(B)$ template; `math.prob.joint-distribution` owns the joint PMF/PDF and marginal-computation machinery. This concept owns COMBINING these two into the conditional-distribution formula and verifying its normalization — deliberately reusing the SAME $2\times2$ joint PMF across Examples 1–3 so the conditional distribution, its normalization check, and its expectation all read as one continuous worked problem on shared data.
- Example 3's deliberate choice to compute BOTH the conditional and marginal expectations from the identical joint distribution (rather than two separate examples) was chosen to make the contrast — and the genuine numeric difference — directly comparable within one worked problem.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: one specific joint-table computation precedes the general formula statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

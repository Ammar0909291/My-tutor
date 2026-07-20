# Teaching Blueprint: Fundamental Theorem of Calculus (Rigorous) (`math.real.ftc-rigorous`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.ftc-rigorous` |
| name | Fundamental Theorem of Calculus (Rigorous) |
| domain | Real Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.real.riemann-integral`, `math.real.differentiability-rigorous` |
| unlocks | none |
| cross_links | `math.calc.ftc-part1` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already accepts FTC computationally; the task is the rigorous ε–δ/MVT-based PROOF, not the statement itself |
| description (KG) | Part 1: If $f$ integrable and $F(x)=\int_a^x f$, then $F$ is Lipschitz; if $f$ continuous at $x_0$ then $F'(x_0)=f(x_0)$. Part 2: If $F$ is an antiderivative of $f$, then $\int_a^b f=F(b)-F(a)$. Proof uses the MVT and Riemann sum properties. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize `math.calc.ftc-part1`'s already-known statement ($F'(x)=f(x)$ for $F(x)=\int_a^xf(t)\,dt$, $f$ continuous) as a SPECIAL CASE of this concept's more general, rigorously-proven Part 1 — which additionally establishes $F$ is LIPSCHITZ continuous whenever $f$ is merely integrable (not necessarily continuous), a genuinely stronger and more general statement than `math.calc.ftc-part1` ever claimed.
- LO2: Prove that $F$ is Lipschitz when $f$ is Riemann integrable (hence bounded, by `math.real.riemann-integral`), using a direct bound $|F(x)-F(y)|\le M|x-y|$ (where $M$ bounds $|f|$) derived from the integral's own additivity and monotonicity properties — and separately prove the differentiability claim $F'(x_0)=f(x_0)$ at points of continuity, using an $\varepsilon$–$\delta$ argument bounding the difference quotient directly against continuity's own definition.
- LO3: Prove Part 2 ($\int_a^bf=F(b)-F(a)$ for any antiderivative $F$ of $f$) using the Mean Value Theorem (via `math.real.differentiability-rigorous`'s own differentiability framework) applied to a Riemann-sum partition, and correctly explain why this is a genuinely different (and logically independent) claim from Part 1 — Part 2 assumes an antiderivative already EXISTS and evaluates the integral from it; Part 1 CONSTRUCTS a specific antiderivative-candidate $F$ from the integral and studies its properties.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.riemann-integral` (Darboux upper/lower sums, integrability, boundedness of integrable functions, continuous functions are integrable) and `math.real.differentiability-rigorous` (the rigorous $f'(a)=\lim_{h\to0}[f(a+h)-f(a)]/h$ definition, and the Mean Value Theorem framework built on it).

## Component 3 — Core Explanation

**Part 1 is a genuine generalization of `math.calc.ftc-part1`'s statement, not a re-statement**: `math.calc.ftc-part1` states $F'(x)=f(x)$ ASSUMING $f$ is continuous EVERYWHERE on the relevant interval. This concept's Part 1 proves something stronger in two ways: first, $F(x)=\int_a^xf(t)\,dt$ is LIPSCHITZ continuous (hence certainly continuous) whenever $f$ is merely Riemann INTEGRABLE — a weaker hypothesis than continuity, since `math.real.riemann-integral` already establishes integrable functions need only be bounded, not continuous. Second, the differentiability conclusion $F'(x_0)=f(x_0)$ is proven to hold at any INDIVIDUAL point $x_0$ where $f$ happens to be continuous — even if $f$ is discontinuous elsewhere on the interval. `math.calc.ftc-part1`'s global-continuity version is exactly the special case where $f$ is continuous at every point.

**Proving $F$ is Lipschitz uses only integrability + boundedness**: since $f$ is Riemann integrable, `math.real.riemann-integral` guarantees $f$ is BOUNDED: $|f(t)|\le M$ for all $t$ in the interval. For any $x,y$ (say $x<y$), $F(y)-F(x)=\int_x^yf(t)\,dt$ by the integral's additivity, so $|F(y)-F(x)|=\left|\int_x^yf(t)\,dt\right|\le\int_x^y|f(t)|\,dt\le M(y-x)=M|x-y|$ — exactly the Lipschitz condition, with Lipschitz constant $M$. Proving differentiability at a point $x_0$ of continuity uses an $\varepsilon$–$\delta$ argument directly: the difference quotient $\frac{F(x_0+h)-F(x_0)}h=\frac1h\int_{x_0}^{x_0+h}f(t)\,dt$ is an AVERAGE of $f$ over a shrinking interval around $x_0$; since $f$ is continuous at $x_0$, for any $\varepsilon>0$ there's a $\delta$ such that $|f(t)-f(x_0)|<\varepsilon$ whenever $|t-x_0|<\delta$, forcing this average to be within $\varepsilon$ of $f(x_0)$ for small enough $h$ — giving $F'(x_0)=f(x_0)$ exactly.

**Part 2's proof uses the Mean Value Theorem, and is logically independent of Part 1**: given ANY antiderivative $F$ of $f$ (meaning $F'=f$ everywhere, assumed to already exist — this is NOT the specific $F$ constructed in Part 1), partition $[a,b]$ into subintervals via a Riemann partition $a=x_0<x_1<\cdots<x_n=b$. On each subinterval, `math.real.differentiability-rigorous`'s own Mean Value Theorem gives a point $c_i\in(x_{i-1},x_i)$ with $F(x_i)-F(x_{i-1})=F'(c_i)(x_i-x_{i-1})=f(c_i)(x_i-x_{i-1})$. Summing telescopically: $F(b)-F(a)=\sum_i[F(x_i)-F(x_{i-1})]=\sum_if(c_i)(x_i-x_{i-1})$ — exactly a Riemann sum for $f$! As the partition refines, this Riemann sum converges to $\int_a^bf$ (by `math.real.riemann-integral`'s own definition), giving $F(b)-F(a)=\int_a^bf$. This proof assumes $F$ exists as a hypothesis and evaluates a known integral from it — logically the reverse direction from Part 1, which constructs $F$ from the integral and studies ITS properties.

## Component 4 — Worked Examples

**Example 1 (LO1 — Part 1 as a genuine generalization, using a function continuous at only one point, breaking MC-1)**: let $f(t)=t$ for $t\ne0$ and $f(0)=5$ (a function DISCONTINUOUS at $t=0$, but continuous everywhere else, and bounded, hence Riemann integrable — the single-point discontinuity doesn't affect integrability). `math.calc.ftc-part1`'s version cannot be applied directly (it assumes continuity everywhere). But THIS concept's Part 1 applies at any point of continuity, e.g. $x_0=2$: $F'(2)=f(2)=2$, genuinely provable even though $f$ is discontinuous at $0$ elsewhere on the domain — confirming Part 1's strictly broader applicability, exactly as LO1 requires recognizing.

**Example 2 (LO2 — proving the Lipschitz bound and differentiability directly, breaking MC-2)**: for $f(t)=\sin(t)$ on $[0,\pi]$ (bounded by $M=1$), $F(x)=\int_0^x\sin(t)\,dt=1-\cos(x)$. Checking the Lipschitz bound directly: $|F(y)-F(x)|=|\cos(x)-\cos(y)|$; by the Mean Value Theorem (or direct bound), this is $\le|x-y|$, matching $M=1$ exactly. Checking differentiability at $x_0=\pi/2$ (a point of continuity of $\sin$): $F'(\pi/2)=\sin(\pi/2)=1$ — verified directly since $F(x)=1-\cos x$ gives $F'(x)=\sin x$, confirming both the Lipschitz property and the pointwise differentiability claim concretely.

**Example 3 (LO3 — Part 2's MVT-based telescoping proof structure, applied concretely, breaking MC-3)**: for $f(t)=2t$ on $[1,3]$ with antiderivative $F(t)=t^2$ (verified $F'=f$ everywhere, assumed given — NOT constructed via Part 1's integral formula here): partitioning $[1,3]$ into $[1,2]\cup[2,3]$, the MVT gives some $c_1\in(1,2)$ with $F(2)-F(1)=f(c_1)(2-1)$, i.e. $4-1=3=2c_1$, so $c_1=1.5$ — and similarly some $c_2\in(2,3)$ with $F(3)-F(2)=f(c_2)(3-2)$, i.e. $9-4=5=2c_2$, so $c_2=2.5$. Summing: $F(3)-F(1)=[F(2)-F(1)]+[F(3)-F(2)]=3+5=8=f(c_1)(1)+f(c_2)(1)$ — a genuine (coarse) Riemann sum for $\int_1^32t\,dt$, which indeed equals $9-1=8$ exactly, confirming the telescoping-sum-becomes-a-Riemann-sum structure Part 2's proof relies on, using an antiderivative given as a HYPOTHESIS rather than constructed from the integral.

## Component 5 — Teaching Actions

### Teaching Action A01 — Part 1 Generalizes `math.calc.ftc-part1` in Two Genuine Ways (Primitive P11: Representation Shift)

State: "`math.calc.ftc-part1` assumed $f$ continuous everywhere — this concept's Part 1 proves the SAME differentiability conclusion at just ONE point of continuity (even amid other discontinuities), plus an entirely new Lipschitz-continuity conclusion that holds even where $f$ isn't continuous at all." Walk Example 1's single-discontinuity function.

- **MC-1 hook**: ask "is this concept's Part 1 just a restatement of `math.calc.ftc-part1`'s FTC1, or does it prove something genuinely more general?" — a "just a restatement" answer reveals MC-1 (missing the pointwise-continuity and Lipschitz generalizations).

### Teaching Action A02 — The Lipschitz Bound Comes From Boundedness Alone, Differentiability Needs Continuity (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the Lipschitz bound $|F(y)-F(x)|\le M|x-y|$ is verified using ONLY the bound $M=1$ on $|\sin t|$ (no continuity of $f$ needed for THIS part), while the differentiability conclusion $F'(\pi/2)=\sin(\pi/2)$ specifically requires $\sin$ being continuous AT $\pi/2$. State: "these are two SEPARATE conclusions with separate hypotheses — Lipschitz continuity of $F$ needs only boundedness of $f$; genuine differentiability of $F$ at a point needs $f$ to be continuous there specifically."

- **MC-2 hook**: ask "does proving $F$ is Lipschitz require $f$ to be continuous, the same way proving $F'(x_0)=f(x_0)$ does?" — a "yes" answer reveals MC-2 (conflating the weaker Lipschitz conclusion's hypothesis with the stronger differentiability conclusion's hypothesis).

### Teaching Action A03 — Part 2 Assumes an Antiderivative Exists; Part 1 Constructs One (Primitive P06: Contrast Pair)

Contrast Part 1's construction (start from the INTEGRAL, define $F$ FROM it, then study $F$'s properties) against Part 2's structure in Example 3 (START from an antiderivative $F$ GIVEN as a hypothesis, and EVALUATE a known integral using it via the MVT telescoping argument). State: "Part 1 and Part 2 run in logically opposite directions — Part 1 builds an antiderivative-candidate from the integral and studies it; Part 2 assumes an antiderivative is already known and uses it to evaluate the integral. They are not the same theorem proved twice."

- **MC-3 hook**: ask "do Part 1 and Part 2 prove the same claim in the same logical direction, just phrased differently?" — a "yes" answer reveals MC-3 (missing that Part 1 constructs $F$ from the integral while Part 2 assumes $F$ exists and evaluates the integral from it).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For a bounded, Riemann integrable $f$ that is discontinuous at exactly one point $x_0$ but continuous elsewhere, explain precisely at which points $F(x)=\int_a^xf$ is guaranteed differentiable, and why.
  2. Prove the Lipschitz bound $|F(y)-F(x)|\le M|x-y|$ directly from the integral's additivity, for a specific bounded $f$ of your choosing.
  3. Using the Mean Value Theorem telescoping argument (as in Example 3), verify Part 2 for $f(t)=3t^2$ on $[0,2]$ with antiderivative $F(t)=t^3$, using a 2-subinterval partition.
  4. Explain, in your own words, why Part 1 and Part 2 are logically independent claims running in opposite directions, rather than the same theorem restated.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.calc.ftc-part1`)**: "A physicist models a velocity function $v(t)$ that is bounded and Riemann integrable on $[0,T]$, but has a single instantaneous discontinuity at $t=t_0$ (representing an idealized instantaneous collision), and is continuous everywhere else. The physicist wants the position function $x(t)=x(0)+\int_0^tv(s)\,ds$. (a) Using THIS concept's Part 1 (not `math.calc.ftc-part1`'s version, which requires continuity everywhere), explain precisely at which times $t$ the physicist can conclude $x'(t)=v(t)$, and why $t=t_0$ must be excluded from this conclusion. (b) Separately, explain why $x(t)$ is still guaranteed to be a genuinely CONTINUOUS (in fact Lipschitz) function of time, even though $v$ has a discontinuity — citing which hypothesis (boundedness vs. continuity) is responsible for this weaker but still valuable guarantee. (c) If the physicist instead ALREADY has a known closed-form antiderivative for $v$ on some sub-interval away from $t_0$, explain, citing Part 2's logical structure, how they would use it to evaluate a definite integral of $v$ over that sub-interval directly, without needing to re-derive $x(t)$ from Part 1 at all."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RIGOROUS-FTC1-ASSUMED-MERE-RESTATEMENT | Believing this concept's Part 1 is just a restatement of `math.calc.ftc-part1`'s FTC1, missing the genuine generalizations to pointwise continuity and Lipschitz continuity under mere integrability | Foundational |
| MC-2 | LIPSCHITZ-CONCLUSION-CONFLATED-WITH-DIFFERENTIABILITY-HYPOTHESIS | Believing proving $F$ is Lipschitz requires $f$ to be continuous, conflating it with the stronger differentiability conclusion's genuinely different (continuity-at-a-point) hypothesis | High |
| MC-3 | PART-1-AND-PART-2-ASSUMED-SAME-DIRECTION | Believing Part 1 and Part 2 prove the same claim in the same logical direction, missing that Part 1 constructs $F$ from the integral while Part 2 assumes $F$ exists and evaluates the integral from it | High |

- **B01 (targets MC-1)**: P27 (name it: "Rigorous FTC1 Assumed Mere Restatement") → P41 (detect: ask whether this Part 1 is just `math.calc.ftc-part1` restated) → P64 (conceptual shift: re-walk Example 1's single-discontinuity function, where `math.calc.ftc-part1`'s version cannot directly apply but this concept's Part 1 still does at $x_0=2$).
- **B02 (targets MC-2)**: P27 (name it: "Lipschitz Conclusion Conflated with Differentiability Hypothesis") → P41 (detect: ask whether the Lipschitz bound requires continuity of $f$) → P64 (conceptual shift: re-walk Example 2's separate verification of the Lipschitz bound from boundedness alone versus differentiability from continuity at a point).
- **B03 (targets MC-3)**: P27 (name it: "Part 1 and Part 2 Assumed Same Direction") → P41 (detect: ask whether Part 1 and Part 2 run in the same logical direction) → P64 (conceptual shift: re-walk Example 3's MVT telescoping proof, re-anchoring on $F$ being GIVEN, not constructed).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.riemann-integral` (Darboux sums, integrability, and the boundedness of integrable functions this concept's Lipschitz proof directly uses) and `math.real.differentiability-rigorous` (the rigorous differentiability definition and Mean Value Theorem framework Part 2's proof directly uses).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.calc.ftc-part1`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.calc.ftc-part1`'s own global-continuity-hypothesis version directly in Component 3's generalization argument and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag supports the "3 TAs + gate" tier, with LO1 grounding the rigorous version in the already-known computational version, LO2 given full proof depth for both the Lipschitz and differentiability conclusions, and LO3 giving Part 2's MVT-based telescoping proof concretely.
- **Division of labor**: `math.calc.ftc-part1` already owns the computational, global-continuity-hypothesis statement of FTC1 (verified by grep — Riemann-sum-based intuition, no Lipschitz claim, no pointwise-continuity generalization, no rigorous $\varepsilon$–$\delta$ proof); this concept owns the RIGOROUS analysis-level proofs of both parts, the pointwise-continuity and mere-integrability generalizations of Part 1, and the MVT-based proof of Part 2 (entirely absent from the computational treatment). `math.real.riemann-integral` and `math.real.differentiability-rigorous` are reused directly for their own established machinery (boundedness, MVT) rather than re-derived.
- Example 1's deliberate choice of a function with EXACTLY one discontinuity (rather than a continuous function, which would only test the already-known global case) was made specifically to make LO1's claimed generalization concretely testable, not merely asserted as "more general" in the abstract.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.ftc-part1` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already accepts FTC computationally; task is the rigorous proof) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

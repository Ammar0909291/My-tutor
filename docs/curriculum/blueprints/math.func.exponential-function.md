# Teaching Blueprint: Exponential Function (`math.func.exponential-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.exponential-function` |
| name | Exponential Function |
| domain | Functions |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.alg.exponential-function`, `math.func.function-concept` |
| unlocks | `math.calc.derivative-exponential` |
| cross_links | `math.calc.derivative-exponential` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — the compound-interest story before the formal limit definition of $e$ |
| description (KG) | f(x) = aˣ (a > 0, a ≠ 1); the natural exponential eˣ is its own derivative; models growth, decay, compound interest. |

## Component 1 — Learning Objectives

- LO1: Recognize the **natural exponential base** $e\approx2.71828\ldots$ as a specific, special base — distinct from the general base-$a$ treatment already covered in `math.alg.exponential-function` — introduced via the compound-interest limit $\left(1+\frac1n\right)^n\to e$ as $n\to\infty$, connecting directly to real compounding phenomena rather than an arbitrarily chosen constant.
- LO2: Apply the general **growth/decay model** $N(t)=N_0e^{kt}$ ($k>0$ growth, $k<0$ decay) to real-world problems (population growth, radioactive decay, continuous compound interest $A=Pe^{rt}$), correctly identifying $N_0$ and $k$ from context and computing genuinely MULTIPLICATIVE (not linear) change.
- LO3 (orientation level — full derivation deferred to the unlocked child): recognize, without deriving, that $e^x$ is its OWN derivative ($\frac d{dx}[e^x]=e^x$) — the defining property that makes $e$ the "natural" choice of base for calculus — deferred to `math.calc.derivative-exponential`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.exponential-function` (the general $f(x)=a^x$, base restrictions, growth-vs-decay, and the exponential-vs-power-function distinction) and `math.func.function-concept` (domain/codomain/rule structure).

## Component 3 — Core Explanation

**$e$ as a genuine limit, not an arbitrary choice**: while `math.alg.exponential-function` treated $f(x)=a^x$ for a general base $a$, this concept singles out one SPECIFIC base: $e$, defined as $\lim_{n\to\infty}\left(1+\frac1n\right)^n\approx2.71828\ldots$. This is not an arbitrary mathematician's preference — the expression $(1+1/n)^n$ arises directly from compounding interest $n$ times per year at a $100\%$ annual rate, and as compounding becomes more and more frequent (daily, hourly, continuously), the result converges to this specific number.

**Modeling growth and decay multiplicatively**: the model $N(t)=N_0e^{kt}$ describes a quantity that changes MULTIPLICATIVELY over time — at every instant, the quantity's rate of change is proportional to its CURRENT size, not to a fixed constant amount per unit time. For $k>0$ this is growth (population, unchecked spread); for $k<0$, decay (radioactive decay, cooling). This produces genuinely ACCELERATING change (for growth) or decelerating-toward-zero change (for decay) — a fundamentally different behavior from linear ("add the same fixed amount every period") models.

**Continuous compounding and $e^x$'s self-derivative property (orientation level)**: as the number of compounding periods per year $n\to\infty$, the compound-interest formula $A=P(1+r/n)^{nt}$ converges to $A=Pe^{rt}$ — the SAME constant $e$ from LO1 arising again, now in a formula for continuously-compounded growth. The deeper reason $e$ is singled out as "natural" for calculus is that $\frac d{dx}[e^x]=e^x$ — its own derivative, a property no other base $a$ achieves without an extra constant multiplying factor. Full derivation of this fact is the dedicated subject of `math.calc.derivative-exponential`.

## Component 4 — Worked Examples

**Example 1 (LO1 — $e$ as a compound-interest limit, breaking MC-1)**: computing $\left(1+\frac1n\right)^n$ for increasing $n$: $n=1\to2$; $n=2\to2.25$; $n=10\to2.594$; $n=100\to2.705$; $n=1000\to2.7169$ — visibly approaching $e\approx2.71828$ as $n$ grows without bound. This defines $e$ as the genuine LIMIT of a concrete, motivated expression (compounding interest more and more frequently), not as an arbitrary constant selected for convenience.

**Example 2 (LO2 — growth modeling, multiplicative vs. linear, breaking MC-2)**: a bacteria culture starts at $N_0=500$ and grows according to $N(t)=500e^{0.3t}$ ($t$ in hours). At $t=2$: $N(2)=500e^{0.6}\approx500\times1.822\approx911$ bacteria. Contrast with a NAIVE linear estimate, "growing at rate $0.3$ means adding $0.3\times500=150$ per hour": $500+150\times2=800$ — a meaningfully DIFFERENT (and increasingly inaccurate as $t$ grows) answer from the true exponential value of $911$, since the true model compounds continuously rather than adding a fixed amount each period.

**Example 3 (LO3, orientation level — $e^x$ is its own derivative, preview)**: state, without deriving, that $\frac d{dx}[e^x]=e^x$ — a genuinely special property: no other choice of base $a$ in $a^x$ gives this exact self-derivative result without an extra constant factor appearing (e.g. $\frac d{dx}[2^x]=2^x\ln2$, carrying an extra $\ln2$ factor that $e^x$'s own derivative lacks). This is precisely why $e$ is singled out as the "natural" base for calculus, fully derived in `math.calc.derivative-exponential`.

## Component 5 — Teaching Actions

### Teaching Action A01 — $e$ Arises From a Genuine Compounding Limit (Primitive P11: Representation Shift)

State: "$e$ isn't a number mathematicians picked out of convenience — it's the actual limiting value of compounding interest more and more frequently, and you can watch it converge with your own calculations." Work Example 1's numerical table, showing the visible convergence toward $2.71828\ldots$.

- **MC-1 hook**: ask "is $e$ an arbitrary constant chosen by mathematicians for convenience, with no deeper mathematical origin?" — a "yes" answer reveals MC-1 (missing that $e$ arises naturally as a compound-interest limit).

### Teaching Action A02 — Exponential Growth Compounds, It Doesn't Add (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the true exponential model gives $911$ bacteria after 2 hours, while the naive linear "add a fixed amount" reasoning gives only $800$ — a genuine, checkable discrepancy. State: "exponential growth means the rate of change is proportional to the CURRENT amount, not a fixed constant — that's why the naive linear estimate falls further and further behind the true value as time passes."

- **MC-2 hook**: ask "can exponential growth be reasoned about the same way as linear growth — by adding a fixed amount determined by the rate, each period?" — a "yes" answer reveals MC-2 (the linear-growth misconception, missing the genuinely multiplicative/compounding nature of exponential change).

### Teaching Action A03 — $e$'s Self-Derivative Property Is Not a Coincidence (Primitive P06: Contrast Pair)

Contrast $\frac d{dx}[e^x]=e^x$ (no extra factor) against $\frac d{dx}[2^x]=2^x\ln2$ (an extra $\ln2$ factor appears for a different base). State: "this isn't a random quirk of $e$ — it's the SPECIFIC property that earns $e$ the title 'natural' base for calculus; no other base achieves a clean self-derivative without an extra multiplying constant."

- **MC-3 hook**: ask "would any positive base $a$ have equally simple calculus properties to $e$, given the right circumstances?" — a "yes" answer reveals MC-3 (missing that $e^x$'s self-derivative property is the SPECIFIC, defining reason $e$ is singled out, not an interchangeable feature of any base).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\left(1+\frac1n\right)^n$ for $n=5$ and $n=50$, and explain what these values are approaching as $n$ grows without bound.
  2. A radioactive sample starts at $N_0=1000$ grams and decays according to $N(t)=1000e^{-0.1t}$ ($t$ in years). Find $N(5)$.
  3. Explain why modeling exponential growth using a linear "add a fixed amount each period" approach gives a different (and increasingly inaccurate) answer than the true exponential model, using Example 2's bacteria culture as a reference.
  4. Explain, referencing this lesson's derivative preview, why $e$ is specifically called the "natural" base for calculus, rather than any other positive base $a$.
- **P76 (Transfer Probe, mode = independence)**: "A bank account earns continuously compounded interest, modeled by $A(t)=Pe^{rt}$, where $P$ is the initial deposit and $r$ is the annual interest rate. (a) If $P=\$2000$ and $r=0.05$, compute $A(10)$ (the balance after 10 years). (b) A friend claims that continuous compounding at $5\%$ for $10$ years should just give $2000\times(1+0.05\times10)=2000\times1.5=\$3000$, using simple linear-growth reasoning. Explain what is wrong with this reasoning, computing the actual compounded value for comparison. (c) Explain, referencing this lesson's discussion of $e$ as a limit, why 'continuous' compounding specifically leads to the constant $e$ appearing in the formula."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | E-ASSUMED-ARBITRARY | Believing $e$ is an arbitrary constant chosen by mathematicians for convenience, missing that it arises naturally as the limit of the compound-interest expression $(1+1/n)^n$ | Foundational |
| MC-2 | EXPONENTIAL-GROWTH-REASONED-LINEARLY | Believing exponential growth/decay can be reasoned about using linear "add a fixed amount per period" intuitions, missing the genuinely multiplicative, accelerating nature of $N_0e^{kt}$ | High |
| MC-3 | SELF-DERIVATIVE-PROPERTY-ASSUMED-COINCIDENTAL | Believing $e^x$'s self-derivative property is an interchangeable feature any base could share, missing that it is the SPECIFIC, defining reason $e$ is singled out as the natural base for calculus | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "$e$ Assumed Arbitrary") → P41 (detect: ask whether $e$ is a constant chosen by mathematicians for convenience with no deeper origin) → P64 (conceptual shift: re-walk Example 1's convergence table, re-anchoring on "$e$ is the genuine limit of a real compounding process").
- **B02 (targets MC-2)**: P27 (name it: "Exponential Growth Reasoned Linearly") → P41 (detect: ask whether exponential growth can be estimated the same way as linear growth, by adding a fixed amount per period) → P64 (conceptual shift: re-walk Example 2's $911$-vs-$800$ discrepancy, re-anchoring on "exponential change is proportional to the current amount, genuinely compounding, not additive").
- **B03 (targets MC-3)**: P27 (name it: "Self-Derivative Property Assumed Coincidental") → P41 (detect: ask whether any base would have equally simple calculus properties to $e$) → P64 (conceptual shift: re-walk Example 3's contrast between $e^x$ and $2^x$'s derivatives, re-anchoring on "$e$'s self-derivative property is the SPECIFIC defining reason it is singled out").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.exponential-function` (the general $f(x)=a^x$ treatment, base restrictions, and growth/decay classification this concept specializes to base $e$ — this authoring directly fulfills that concept's own previously-flagged forward cross-link to this concept) and `math.func.function-concept` (domain/codomain/rule structure).
- **Unlocks**: `math.calc.derivative-exponential` (will fully derive $\frac d{dx}[e^x]=e^x$, previewed at orientation level in LO3; not yet authored).
- **Cross-link**: KG lists `math.calc.derivative-exponential`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (the compound-interest limit and genuine growth/decay modeling) and LO3 kept orientation-level, appropriately deferring the derivative derivation to this concept's own unlocked child.
- **Division of labor**: `math.alg.exponential-function` owns the GENERAL base-$a$ algebra (domain restrictions, growth vs. decay classification, the exponential-vs-power-function distinction) and had already flagged this concept, `math.func.exponential-function`, as its own unauthored forward cross-link. This concept owns the SPECIALIZATION to the natural base $e$, real-world multiplicative modeling, and the calculus-motivated "why $e$ specifically" framing — deliberately not re-deriving the general base-$a$ material already covered.
- Example 2's explicit linear-vs-exponential numerical contrast ($800$ vs. $911$) was chosen because linear-growth reasoning is an extremely common and persistent intuition error when learners first meet exponential models — a concrete, checkable discrepancy is far more convincing than an abstract statement that "exponential growth compounds."

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.derivative-exponential` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: the compound-interest story before the formal limit definition of $e$) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Binomial Theorem (`math.alg.binomial-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.binomial-theorem` |
| name | Binomial Theorem |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.alg.polynomial`, `math.disc.combinations`, `math.found.proof-by-induction` |
| unlocks | `math.prob.discrete-distributions` |
| cross_links | `math.prob.discrete-distributions` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — the already-familiar $(a+b)^2$ and $(a+b)^3$ expansions, before the general formula |
| description (KG) | (a+b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ; gives the general expansion of a binomial power in terms of binomial coefficients. |

## Component 1 — Learning Objectives

- LO1: State the **Binomial Theorem**, $(a+b)^n=\sum_{k=0}^n\binom nk a^{n-k}b^k$, using `math.disc.combinations`'s own $\binom nk$ notation and meaning directly, and expand small cases ($n=2,3$) to confirm agreement with the already-familiar direct expansions.
- LO2: **Prove** the Binomial Theorem via `math.found.proof-by-induction`, recognizing that the inductive step's algebra works BECAUSE of Pascal's identity $\binom nk+\binom n{k+1}=\binom{n+1}{k+1}$ specifically, not as generic algebraic simplification.
- LO3 (orientation level — the KG's own named applications): recognize Pascal's triangle as a direct visual encoding of the coefficients $\binom nk$ (each row one value of $n$), and recognize — without deriving why — that these same coefficients become the probabilities in `math.prob.discrete-distributions`'s binomial distribution.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.polynomial` (multiplying and combining polynomial terms), `math.disc.combinations` (the meaning and computation of $\binom nk$, the number of ways to choose $k$ items from $n$), and `math.found.proof-by-induction` (base case, inductive hypothesis, inductive step).

## Component 3 — Core Explanation

**The theorem, and confirming it against known cases**: $(a+b)^n=\sum_{k=0}^n\binom nk a^{n-k}b^k$ generalizes the already-familiar expansions of $(a+b)^2$ and $(a+b)^3$, with each term's coefficient given directly by `math.disc.combinations`'s own $\binom nk$ — the number of ways to choose which $k$ of the $n$ factors $(a+b)(a+b)\cdots(a+b)$ contribute a $b$ (the rest contributing an $a$).

**Proving it by induction — Pascal's identity is the mechanism, not a coincidence**: the base case ($n=0$ or $n=1$) is immediate. For the inductive step, $(a+b)^{n+1}=(a+b)^n(a+b)$; substituting the inductive hypothesis and distributing, the coefficient of $a^{n+1-k}b^k$ in the result comes from combining TWO terms of the $n$-th expansion — one contributing an extra $a$, one contributing an extra $b$ — with coefficients $\binom n{k}$ and $\binom n{k-1}$ respectively. These combine via Pascal's identity $\binom nk+\binom n{k-1}=\binom{n+1}{k}$ to give exactly the coefficient the theorem predicts for $n+1$. This is not generic algebraic simplification "working out" — Pascal's identity is the SPECIFIC combinatorial fact making the induction step close.

**Pascal's triangle and the probability connection (orientation level)**: arranging the coefficients $\binom nk$ by row (one row per value of $n$) produces Pascal's triangle, where each entry is the sum of the two entries above it — a direct visual restatement of Pascal's identity. The SAME coefficients, normalized appropriately, become the term probabilities in `math.prob.discrete-distributions`'s binomial distribution (e.g. for $n$ fair-coin flips) — a genuine, non-coincidental link between this purely algebraic identity and probability, deferred to that concept for full derivation.

## Component 4 — Worked Examples

**Example 1 (LO1 — confirming against the known $(a+b)^3$ expansion, breaking MC-1)**: $(a+b)^3=\binom30a^3+\binom31a^2b+\binom32ab^2+\binom33b^3=a^3+3a^2b+3ab^2+b^3$ — matching the familiar FOIL-based expansion exactly. Note the presence of the CROSS terms $3a^2b$ and $3ab^2$: $(a+b)^3\ne a^3+b^3$ — the naive "distribute the exponent" shortcut discards these middle terms entirely.

**Example 2 (LO2 — the induction step traced concretely via Pascal's identity, breaking MC-2)**: extending $(a+b)^2=a^2+2ab+b^2$ to $(a+b)^3$: $(a+b)^3=(a+b)^2(a+b)=(a^2+2ab+b^2)(a+b)=a^3+2a^2b+ab^2+a^2b+2ab^2+b^3=a^3+3a^2b+3ab^2+b^3$. The coefficient of $a^2b$ (namely $3$) came from combining the $a^2\cdot b$ term (coefficient $1=\binom20$) and the $2ab\cdot a$ term (coefficient $2=\binom21$): $1+2=3$ — exactly Pascal's identity $\binom20+\binom21=\binom31$, i.e. $1+2=3$. The induction step's arithmetic IS Pascal's identity, applied concretely.

**Example 3 (LO3, orientation level — Pascal's triangle and the probability preview)**: Pascal's triangle rows for $n=0$ through $4$: $1$; $1,1$; $1,2,1$; $1,3,3,1$; $1,4,6,4,1$ — matching $\binom nk$ directly (e.g. row $4$: $\binom40,\binom41,\binom42,\binom43,\binom44=1,4,6,4,1$). These same numbers, divided by $2^n$, give binomial-distribution probabilities: flipping $4$ fair coins, $P(\text{exactly }2\text{ heads})=\binom42/2^4=6/16=3/8$ — the identical coefficient $6$ from row $4$ of Pascal's triangle, now serving a probabilistic role that `math.prob.discrete-distributions` will develop fully.

## Component 5 — Teaching Actions

### Teaching Action A01 — Cross Terms Are Not Optional (Primitive P11: Representation Shift)

State: "$(a+b)^n$ is NOT $a^n+b^n$ — every intermediate value of $k$ contributes its own cross term, weighted by $\binom nk$, and the theorem's whole content is specifying exactly those weights." Work Example 1's full expansion, pointing to the cross terms explicitly.

- **MC-1 hook**: ask "does $(a+b)^n=a^n+b^n$?" — a "yes" answer reveals MC-1 (the "freshman's dream" error, missing every cross term entirely).

### Teaching Action A02 — Pascal's Identity Is the Induction Step's Actual Mechanism (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the coefficient $3$ in $(a+b)^3$'s expansion comes from EXACTLY the sum $1+2$, which is Pascal's identity applied to $n=2$. State: "the induction step isn't generic algebra happening to simplify nicely — Pascal's identity is the specific combinatorial fact making the coefficients combine correctly, every time."

- **MC-2 hook**: ask "does the induction proof of the Binomial Theorem work through generic algebraic simplification, or is there a specific combinatorial identity making it work?" — a "generic algebra" answer reveals MC-2 (missing that Pascal's identity is the specific mechanism, not incidental algebra).

### Teaching Action A03 — Pascal's Triangle and Binomial Coefficients Are the Same Object (Primitive P06: Contrast Pair)

Contrast treating Pascal's triangle and the coefficients $\binom nk$ as two separate topics that "happen" to share numbers against Example 3's direct row-by-row confirmation that they are the identical object, viewed two ways. State: "Pascal's triangle isn't a coincidental pattern — each row literally IS the set of binomial coefficients for that value of $n$, and the same numbers reappear as probabilities once you divide by $2^n$."

- **MC-3 hook**: ask "are Pascal's triangle and the binomial coefficients $\binom nk$ two separate topics that happen to involve the same numbers?" — a "yes" answer reveals MC-3 (missing that the triangle is a direct visual encoding of the coefficients themselves).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Expand $(a+b)^4$ using the Binomial Theorem, and verify your answer contains exactly $5$ terms with coefficients matching Pascal's triangle's row for $n=4$.
  2. Explain why $(a+b)^2$ is NOT equal to $a^2+b^2$, identifying the missing term(s) explicitly.
  3. In the induction step from $n=3$ to $n=4$, identify which two coefficients from the $n=3$ expansion combine (via Pascal's identity) to produce the coefficient of $a^3b$ in the $n=4$ expansion, and verify the arithmetic.
  4. Using Pascal's triangle's row for $n=5$, state the probability of getting exactly $3$ heads in $5$ flips of a fair coin (without deriving why this connection holds).
- **P76 (Transfer Probe, mode = independence)**: "A student is asked to expand $(x-2)^5$ using the Binomial Theorem. (a) Rewrite $(x-2)^5$ in the form $(a+b)^n$, identifying $a$, $b$, and $n$ correctly (being careful with the sign). (b) Using the Binomial Theorem and Pascal's triangle's row for $n=5$ ($1,5,10,10,5,1$), write out the full expansion, tracking the alternating signs carefully. (c) Explain what would go wrong if a student instead assumed $(x-2)^5=x^5-2^5$, and identify which misconception from this lesson that assumption reflects."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BINOMIAL-DISTRIBUTED-AS-LINEAR | Believing $(a+b)^n=a^n+b^n$ (the "freshman's dream"), missing every cross term the exponent's actual expansion requires | Foundational |
| MC-2 | INDUCTION-STEP-TREATED-AS-GENERIC-ALGEBRA | Believing the induction proof's inductive step works through generic algebraic simplification, missing that Pascal's identity is the specific combinatorial mechanism making the coefficients combine correctly | High |
| MC-3 | PASCALS-TRIANGLE-TREATED-AS-COINCIDENCE | Treating Pascal's triangle and the binomial coefficients $\binom nk$ as separate topics sharing numbers coincidentally, rather than recognizing the triangle as a direct visual encoding of the same coefficients | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Binomial Power Assumed to Distribute Linearly") → P41 (detect: ask whether $(a+b)^n=a^n+b^n$) → P64 (conceptual shift: re-walk Example 1's full $(a+b)^3$ expansion, re-anchoring on "every intermediate power of $a$ and $b$ contributes its own weighted cross term").
- **B02 (targets MC-2)**: P27 (name it: "Induction Step Treated as Generic Algebra") → P41 (detect: ask whether the induction proof's step works through generic simplification or a specific combinatorial identity) → P64 (conceptual shift: re-walk Example 2's $1+2=3$ trace, re-anchoring on "Pascal's identity is the exact mechanism combining the coefficients, every single time").
- **B03 (targets MC-3)**: P27 (name it: "Pascal's Triangle Treated as Coincidental") → P41 (detect: ask whether Pascal's triangle and the binomial coefficients are two separate topics that happen to share numbers) → P64 (conceptual shift: re-walk Example 3's row-by-row confirmation, re-anchoring on "the triangle IS the coefficients, arranged visually").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.polynomial` (combining and multiplying polynomial terms), `math.disc.combinations` (the $\binom nk$ notation this concept's coefficients directly reuse), and `math.found.proof-by-induction` (the base-case/inductive-step machinery this concept's proof directly applies).
- **Unlocks**: `math.prob.discrete-distributions` (will develop the binomial-distribution connection previewed at orientation level in LO3; not yet authored).
- **Cross-link**: KG lists `math.prob.discrete-distributions`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a proficient/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (the theorem's statement confirmed against known cases, and a genuine induction proof tracing Pascal's identity concretely) and LO3 kept orientation-level, appropriately previewing the probability connection this concept's own unlocked child develops fully.
- **Division of labor**: `math.disc.combinations` owns the $\binom nk$ notation and its combinatorial meaning; `math.found.proof-by-induction` owns the general induction machinery. This concept owns the SPECIFIC application of both to prove the Binomial Theorem, deliberately tracing Pascal's identity's role concretely (Example 2) rather than treating the induction step as a black box.
- Example 2 deliberately reuses the SAME $(a+b)^2\to(a+b)^3$ step already shown in Example 1 (rather than jumping to a different $n$), so the induction mechanism (LO2) is demonstrated on the identical concrete numbers the learner already confirmed in LO1, making Pascal's identity's role fully traceable rather than abstract.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.prob.discrete-distributions` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: already-familiar $(a+b)^2$/$(a+b)^3$ expansions before the general formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

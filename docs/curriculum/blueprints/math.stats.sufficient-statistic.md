# Teaching Blueprint: Sufficient Statistic (`math.stats.sufficient-statistic`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.sufficient-statistic` |
| name | Sufficient Statistic |
| domain | Statistics |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.stats.estimator`, `math.prob.conditional-distribution` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already has estimators and conditional distributions; the sufficiency definition is introduced directly |
| description (KG) | $T(X)$ is sufficient for $\theta$ if the conditional distribution of $X\mid T(X)=t$ doesn't depend on $\theta$. Factorization criterion: $f(x\mid\theta)=g(T(x)\mid\theta)\cdot h(x)$. A sufficient statistic captures all information about $\theta$ in the sample. |

## Component 1 — Learning Objectives

- LO1: Define a **sufficient statistic** $T(X)$ for parameter $\theta$: the CONDITIONAL distribution of the full sample $X$ given $T(X)=t$ (via `math.prob.conditional-distribution`'s own machinery) does NOT depend on $\theta$ — meaning once $T(X)$ is known, the remaining randomness in $X$ carries no further information about $\theta$.
- LO2: Apply the **factorization criterion** $f(x\mid\theta)=g(T(x)\mid\theta)\cdot h(x)$ to VERIFY that a proposed statistic is sufficient, WITHOUT needing to compute the conditional distribution directly — recognizing this as a computationally easier equivalent test.
- LO3 (orientation level — full information-theoretic and minimal-sufficiency theory deferred): recognize, without full derivation, that a sufficient statistic "captures all the information about $\theta$" in the sense that any `math.stats.estimator` based on the full sample can be IMPROVED (or matched) by one depending only on $T(X)$ — previewing the Rao-Blackwell idea without deriving it.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.estimator` (a rule for estimating a parameter from sample data, and properties like unbiasedness, consistency, efficiency) and `math.prob.conditional-distribution` ($f_{X\mid Y}(x\mid y)=f(x,y)/f_Y(y)$, the machinery this concept's definition of sufficiency directly invokes).

## Component 3 — Core Explanation

**Sufficiency means the LEFTOVER randomness (given $T(X)$) is uninformative about $\theta$**: `math.prob.conditional-distribution` established $f_{X\mid T(X)}(x\mid t)$ as the conditional distribution of $X$ given the statistic's value. $T(X)$ is DEFINED as sufficient for $\theta$ precisely when this conditional distribution DOES NOT INVOLVE $\theta$ at all — meaning that once you know $T(X)=t$, the remaining details of exactly which sample $x$ occurred (among all samples consistent with $T(x)=t$) tell you nothing more about $\theta$, because their relative likelihoods don't shift as $\theta$ changes.

**The factorization criterion is an equivalent, computationally easier test**: rather than computing the conditional distribution directly (which can be intricate), the FACTORIZATION criterion says $T(X)$ is sufficient for $\theta$ if and only if the joint density/PMF can be split as $f(x\mid\theta)=g(T(x)\mid\theta)\cdot h(x)$ — a piece $g$ that depends on $\theta$ ONLY through $T(x)$, times a piece $h$ that doesn't involve $\theta$ at all. If such a factorization exists, $T(X)$ is guaranteed sufficient, without ever computing a conditional distribution directly.

**Sufficiency means no information about $\theta$ is lost by summarizing (orientation level)**: since $T(X)$ "captures all the information about $\theta$," any estimator built from the FULL sample $X$ can be improved — or at worst matched — by conditioning it on $T(X)$ instead (the Rao-Blackwell idea): averaging an estimator over the $\theta$-FREE conditional distribution given $T(X)=t$ produces a new estimator depending only on $T(X)$, with variance no larger than the original. Full derivation of this improvement result is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying sufficiency directly via the $\theta$-free conditional distribution, breaking MC-1)**: for $n$ independent Bernoulli$(\theta)$ trials $X_1,\dots,X_n$, let $T=X_1+\cdots+X_n$ (the total number of successes). Given $T=t$, EVERY specific sequence with exactly $t$ successes among $n$ trials is EQUALLY LIKELY — the conditional distribution of $(X_1,\dots,X_n)$ given $T=t$ is uniform over all $\binom{n}{t}$ such sequences, with probability $1/\binom{n}{t}$ for each, and crucially this probability does NOT involve $\theta$ at all. This confirms $T$ is sufficient: once you know the total count $t$, knowing WHICH specific sequence occurred adds nothing further about $\theta$.

**Example 2 (LO2 — applying the factorization criterion, breaking MC-2)**: for the same Bernoulli sample, the joint PMF is $f(x\mid\theta)=\theta^t(1-\theta)^{n-t}$ where $t=\sum x_i$. Writing this as $g(T(x)\mid\theta)\cdot h(x)$ with $g(t\mid\theta)=\theta^t(1-\theta)^{n-t}$ (depending on $x$ ONLY through $t$) and $h(x)=1$ (not depending on $\theta$ at all): the factorization holds EXACTLY, confirming $T=\sum X_i$ is sufficient — obtained WITHOUT computing the conditional distribution directly, unlike Example 1's route.

**Example 3 (LO3, orientation level — sufficiency and estimator improvement, breaking MC-3)**: suppose an estimator $\hat\theta_1=X_1$ (using only the FIRST observation) is proposed for $\theta$ in the Bernoulli setting. Since $T=\sum X_i$ is sufficient, conditioning $\hat\theta_1$ on $T$ — i.e. computing $E[X_1\mid T=t]$ — produces a NEW estimator (which works out to $t/n$, the sample proportion) that uses the FULL sample's information rather than just $X_1$, and has strictly smaller variance than $\hat\theta_1=X_1$ alone for $n>1$. This concretely demonstrates that basing an estimator only on the sufficient statistic (rather than throwing away information by using only part of the sample) genuinely improves estimation quality — the qualitative content of the Rao-Blackwell idea, without deriving its general variance-reduction proof here.

## Component 5 — Teaching Actions

### Teaching Action A01 — Sufficiency Means the Leftover Detail Tells You Nothing More (Primitive P11: Representation Shift)

State: "sufficiency isn't an abstract technical condition — it's the concrete claim that once you know $T(X)=t$, the SPECIFIC sample among those consistent with $t$ carries zero further information about $\theta$, because their relative likelihoods never shift as $\theta$ changes." Walk Example 1's uniform-conditional-distribution verification.

- **MC-1 hook**: ask "does verifying sufficiency require checking something about the estimator's accuracy, rather than about whether $\theta$ still influences the sample's distribution once $T(X)$ is known?" — a "yes" answer reveals MC-1 (missing that sufficiency is defined purely by whether $\theta$ drops out of the conditional distribution given $T(X)$, unrelated to any specific estimator's accuracy).

### Teaching Action A02 — The Factorization Criterion Avoids Computing the Conditional Distribution At All (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: factoring $\theta^t(1-\theta)^{n-t}\cdot1$ confirmed sufficiency WITHOUT ever computing the uniform conditional distribution Example 1 needed. State: "the factorization criterion is a shortcut — it's logically equivalent to the direct conditional-distribution definition, but usually far easier to check in practice."

- **MC-2 hook**: ask "must you always compute the conditional distribution $f_{X\mid T(X)}(x\mid t)$ directly (as in Example 1) to verify a statistic is sufficient, with no easier alternative test available?" — a "yes" answer reveals MC-2 (missing that the factorization criterion is an equivalent, often much easier test).

### Teaching Action A03 — Using a Sufficient Statistic Genuinely Beats Using Less Information (Primitive P06: Contrast Pair)

Contrast the single-observation estimator $\hat\theta_1=X_1$ against the sufficient-statistic-based estimator $t/n$ from Example 3 — genuinely lower variance, not merely a different but equally good choice. State: "sufficiency isn't just a labeling exercise — a statistic capturing 'all the information about $\theta$' means estimators built from it can genuinely outperform estimators that throw information away."

- **MC-3 hook**: ask "once we've labeled $T(X)$ as 'sufficient,' does this only serve as a theoretical classification, with no practical consequence for how good an estimator built from $T(X)$ actually is?" — a "yes" answer reveals MC-3 (missing that sufficiency has the concrete practical consequence of enabling estimator improvement, per the Rao-Blackwell idea).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain in one sentence what it means, structurally, for a statistic $T(X)$ to be sufficient for $\theta$.
  2. For $n$ i.i.d. Poisson$(\lambda)$ observations $X_1,\dots,X_n$ with joint PMF $f(x\mid\lambda)=\frac{e^{-n\lambda}\lambda^{\sum x_i}}{\prod x_i!}$, apply the factorization criterion to show $T=\sum X_i$ is sufficient for $\lambda$.
  3. Explain why the factorization criterion is preferred in practice over directly computing the conditional distribution of $X$ given $T(X)=t$.
  4. In one or two sentences, explain the practical (not just theoretical) significance of a statistic being sufficient, referencing estimator improvement.
- **P76 (Transfer Probe, mode = independence)**: "A quality control engineer samples $n$ items from a production line, each independently defective with probability $\theta$ (Bernoulli), and wants a single number summarizing the sample for estimating $\theta$. (a) Propose $T=\sum X_i$ (total defects) as a candidate sufficient statistic, and verify sufficiency using the factorization criterion. (b) A colleague proposes instead recording the full sequence of which specific items were defective, arguing this preserves 'more information' than just the total count — evaluate this claim, citing what sufficiency actually guarantees about the leftover detail. (c) Explain, without deriving it fully, why an estimator based on $T=\sum X_i$ would be expected to outperform (or at least match) an estimator based on only the first 3 observations $X_1,X_2,X_3$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SUFFICIENCY-ASSUMED-ABOUT-ESTIMATOR-ACCURACY | Believing sufficiency verification involves checking an estimator's accuracy, missing that it is purely about whether $\theta$ drops out of the conditional distribution given $T(X)$ | Foundational |
| MC-2 | CONDITIONAL-DISTRIBUTION-ASSUMED-ONLY-SUFFICIENCY-TEST | Believing the conditional distribution must always be computed directly to verify sufficiency, missing that the factorization criterion is an equivalent, often easier test | High |
| MC-3 | SUFFICIENCY-ASSUMED-MERELY-THEORETICAL-LABEL | Believing sufficiency is only a theoretical classification with no practical consequence, missing that it enables genuine estimator improvement (the Rao-Blackwell idea) | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Sufficiency Assumed About Estimator Accuracy") → P41 (detect: ask whether verifying sufficiency involves checking an estimator's accuracy) → P64 (conceptual shift: re-walk Example 1's uniform-conditional-distribution verification, re-anchoring on "sufficiency is about whether $\theta$ drops out of the conditional distribution").
- **B02 (targets MC-2)**: P27 (name it: "Conditional Distribution Assumed Only Sufficiency Test") → P41 (detect: ask whether the conditional distribution must always be computed directly to verify sufficiency) → P64 (conceptual shift: re-walk Example 2's factorization shortcut, re-anchoring on "the factorization criterion is an equivalent, easier test").
- **B03 (targets MC-3)**: P27 (name it: "Sufficiency Assumed Merely Theoretical Label") → P41 (detect: ask whether sufficiency has any practical consequence beyond classification) → P64 (conceptual shift: re-walk Example 3's estimator-improvement demonstration, re-anchoring on "sufficiency enables genuine, measurable estimator improvement").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.estimator` (the concept of an estimator and its accuracy properties, directly used in the Rao-Blackwell-idea preview) and `math.prob.conditional-distribution` (the conditional-distribution machinery this concept's core sufficiency definition directly invokes).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/analyze tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full derivational depth (the direct conditional-distribution verification and the factorization-criterion shortcut) and LO3 kept orientation-level, appropriately previewing the Rao-Blackwell estimator-improvement idea without deriving its general variance-reduction proof.
- **Division of labor**: `math.prob.conditional-distribution` owns the general conditional-distribution machinery; `math.stats.estimator` owns the general notion of an estimator and its accuracy properties. This concept owns COMBINING these into the specific sufficiency definition and its factorization shortcut — deliberately reusing the SAME Bernoulli sample setup across Examples 1–3 so the direct-verification route, the factorization shortcut, and the estimator-improvement consequence all connect to one running example rather than three disconnected ones.
- Example 3's deliberate choice of the SIMPLEST possible under-using estimator ($\hat\theta_1=X_1$, a single observation) rather than a more sophisticated alternative was chosen to make the improvement via conditioning on the sufficient statistic as stark and easy to verify as possible.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has estimators and conditional distributions; sufficiency introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

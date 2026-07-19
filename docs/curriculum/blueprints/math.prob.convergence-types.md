# Teaching Blueprint: Modes of Convergence (`math.prob.convergence-types`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.convergence-types` |
| name | Modes of Convergence |
| domain | Probability |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.prob.random-variable`, `math.real.convergence-sequences` |
| unlocks | `math.prob.lln`, `math.prob.clt` |
| cross_links | `math.real.convergence-sequences` |
| CPA_entry_stage | A (Abstract) — expert-tier learner already fluent in both prerequisites; convergence in probability is introduced directly as the natural generalization of ε–N convergence to random variables |
| description (KG) | Four modes: (1) almost sure (a.s.): P(Xₙ→X)=1; (2) in probability: P(|Xₙ−X|>ε)→0; (3) in Lp: E[|Xₙ−X|^p]→0; (4) in distribution: Fₙ(x)→F(x) at continuity points. Hierarchy: a.s. ⟹ in prob ⟹ in distribution. |

## Component 1 — Learning Objectives

- LO1: Define **convergence in probability**, $X_n\xrightarrow{P}X$ iff for every $\varepsilon>0$, $P(|X_n-X|>\varepsilon)\to0$ as $n\to\infty$ — directly generalizing `math.real.convergence-sequences`' $\varepsilon$–$N$ definition (values $a_n$ getting close to $L$) to a statement about the PROBABILITY of being far apart shrinking, rather than requiring actual values to converge for any single outcome.
- LO2: Define **almost sure convergence**, $X_n\to X$ a.s. iff $P(\lim_n X_n=X)=1$ — meaning for almost every fixed outcome $\omega$ (all except a probability-zero set), the ORDINARY sequence of real numbers $X_n(\omega)$ converges to $X(\omega)$ in the exact $\varepsilon$–$N$ sense already mastered — and recognize the key distinction from LO1: a.s. convergence requires genuine pointwise $\varepsilon$–$N$ convergence for almost every outcome, while convergence in probability only requires the PROBABILITY of a large gap to shrink, with no single outcome's sequence needing to converge at all.
- LO3 (concrete counterexample-driven; full Lp/distribution machinery at working level): define **convergence in $L^p$** ($E[|X_n-X|^p]\to0$) and **convergence in distribution** ($F_n(x)\to F(x)$ at every continuity point of $F$ — the weakest mode, requiring only that the CDFs match in the limit, with no requirement that $X_n$ and $X$ even be defined on the same probability space), and state the hierarchy $\text{a.s.}\Rightarrow\text{in probability}\Rightarrow\text{in distribution}$ as a chain of STRICTLY one-directional implications, each demonstrated false in reverse by a concrete counterexample.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.random-variable` (a random variable $X:\Omega\to\mathbb{R}$ is a FUNCTION on the outcome space, not a fixed value; $P(X=x)$ is a probability, not the random variable itself) and `math.real.convergence-sequences` (the $\varepsilon$–$N$ definition $a_n\to L$ iff $\forall\varepsilon>0\,\exists N: n>N\Rightarrow|a_n-L|<\varepsilon$, requiring an argument valid for ARBITRARY $\varepsilon$, not one convenient choice).

## Component 3 — Core Explanation

**From "values get close" to "the probability of being far apart shrinks"**: `math.real.convergence-sequences` required actual numbers $a_n$ to get arbitrarily close to $L$. For a SEQUENCE OF RANDOM VARIABLES $X_n$, the most direct probabilistic analog, **convergence in probability**, does not require any single realization's values to get close — it requires that the PROBABILITY of a large gap, $P(|X_n-X|>\varepsilon)$, shrinks toward $0$ as $n\to\infty$, for every fixed $\varepsilon>0$. This is a statement about probabilities converging (in the ordinary $\varepsilon$–$N$ sense, applied to the sequence of NUMBERS $P(|X_n-X|>\varepsilon)$), not about the random variables' actual values converging for any particular outcome.

**Almost sure convergence: genuine pointwise convergence, for almost every outcome**: **almost sure convergence** is stronger and more direct — $X_n\to X$ a.s. means that for almost every fixed outcome $\omega$ (every $\omega$ except possibly a set of outcomes with total probability $0$), the ORDINARY real-number sequence $X_n(\omega)$ converges to $X(\omega)$ exactly as `math.real.convergence-sequences` already defines it — genuine $\varepsilon$–$N$ convergence, checked outcome by outcome. The crucial distinction: a.s. convergence demands that almost every individual "run" of the random process settles down in the ordinary sense; convergence in probability only demands that the CHANCE of a large deviation shrinks, which can happen even if NO individual outcome's sequence ever actually settles down — a.s. convergence is a genuinely stronger requirement, and implies convergence in probability, but not conversely.

**$L^p$ convergence and convergence in distribution — the full hierarchy**: **convergence in $L^p$** requires $E[|X_n-X|^p]\to0$ — the AVERAGE $p$-th-power gap shrinks to zero (a statement about an ordinary expectation, itself an ordinary real-number limit). **Convergence in distribution** is the WEAKEST standard mode: $F_n(x)\to F(x)$ at every continuity point of $F$, a statement purely about the cumulative distribution FUNCTIONS matching in the limit — it says nothing whatsoever about $X_n$ and $X$'s actual values being close, and does not even require $X_n$ and $X$ to be defined on the same probability space at all. The full hierarchy is $\text{almost sure}\Rightarrow\text{in probability}\Rightarrow\text{in distribution}$ — each implication holds in ONE direction only, and each is a strictly weaker requirement than the one before it, verified by concrete counterexamples showing the reverse implications fail.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — convergence in probability without almost sure convergence, breaking MC-1)**: On $\Omega=[0,1]$ with uniform probability, define, for each level $m=0,1,2,\ldots$ and each $k=0,\ldots,2^m-1$, the random variable $X_{m,k}=\mathbb{1}_{[k/2^m,(k+1)/2^m]}$ (indicator of that subinterval), listed in one sequence $X_1,X_2,X_3,\ldots$ sweeping $k$ across each level $m$ before moving to level $m+1$ (a "moving spike" sweeping back and forth across $[0,1]$, narrowing at each level). Convergence in probability to $0$: at level $m$, $P(X_{m,k}=1)=1/2^m\to0$ as $m\to\infty$ — so $P(|X_n-0|>\varepsilon)\to0$ for any $\varepsilon\in(0,1)$; $X_n\xrightarrow{P}0$. But for ANY fixed $\omega\in[0,1]$: at EVERY level $m$, $\omega$ falls inside exactly one of that level's $2^m$ subintervals, so $X_n(\omega)=1$ at least once per level, infinitely often, forever alternating between $0$ and $1$ — $X_n(\omega)$ **never converges**, for any single $\omega$ at all. So $X_n\xrightarrow{P}0$ yet $X_n$ does **NOT** converge to $0$ almost surely (in fact, not for a single outcome).

**Example 2 (LO3 — convergence in distribution without any value closeness, breaking MC-2)**: Let $X\sim N(0,1)$ (standard normal, a symmetric distribution), and define $X_n=-X$ for every $n$. Since $-X\sim N(0,1)$ too (by symmetry of the normal distribution about $0$), $X_n$ has the EXACT SAME distribution as $X$ for every $n$ — trivially, $F_n(x)=F(x)$ for all $n,x$, so $X_n\to X$ in distribution. But $|X_n-X|=|-X-X|=2|X|$, which is NOT small at all — if $X=1.5$, the actual gap is $3$, a value that never shrinks as $n$ grows (indeed $X_n=-X$ for every single $n$, an identical relationship each time). $X_n$ does **NOT** converge to $X$ in probability or almost surely, despite converging in distribution perfectly — proving convergence in distribution carries no information whatsoever about actual value closeness.

**Example 3 (LO1/LO3 — convergence in probability never requires exactly zero probability, breaking MC-3)**: Let $Z\sim N(0,1)$ be a fixed random variable, and define $X_n = Z/n$, converging (target) to $X=0$. For any $\varepsilon>0$: $P(|X_n-0|>\varepsilon) = P(|Z|/n>\varepsilon) = P(|Z|>n\varepsilon)$. As $n\to\infty$, $n\varepsilon\to\infty$, so $P(|Z|>n\varepsilon)\to0$ — confirming $X_n\xrightarrow{P}0$. But for EVERY finite $n$, $P(|Z|>n\varepsilon)$ is **strictly positive** (never exactly $0$, since a standard normal has positive density everywhere on $\mathbb{R}$, however far out) — the probability shrinks TOWARD $0$ without ever actually REACHING $0$ at any finite $n$. Convergence in probability requires the LIMIT to be $0$, not that the probability ever becomes exactly $0$.

## Component 5 — Teaching Actions

### Teaching Action A01 — From Value-Closeness to Probability-of-Gap Shrinking (Primitive P11: Representation Shift)

State: "`math.real.convergence-sequences` needed actual numbers to get close. Convergence in probability needs something weaker: the CHANCE of a large gap, $P(|X_n-X|>\varepsilon)$, to shrink toward $0$ — that's an ordinary $\varepsilon$–$N$ statement, but about a sequence of PROBABILITIES, not about the random variables' actual values directly." Introduce both definitions (probability and almost sure) side by side, framing almost sure as pointwise $\varepsilon$–$N$ convergence "for almost every outcome."

### Teaching Action A02 — Converging in Probability Without Any Single Outcome Converging (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: the moving-spike sequence converges to $0$ in probability (the chance of hitting the spike shrinks), yet for every single fixed outcome $\omega$, the actual sequence $X_n(\omega)$ never settles down at all — it's hit by infinitely many spikes forever. State: "convergence in probability only promises the CHANCE of a big gap shrinks — it says nothing about any one particular outcome's sequence actually converging, and this example shows that gap can be total: NO outcome converges, yet the probability-of-gap goes to zero."

- **MC-1 hook**: ask "if $X_n$ converges to $X$ in probability, does that mean $X_n(\omega)$ converges to $X(\omega)$ for almost every outcome $\omega$?" — a "yes" answer reveals MC-1 (assuming convergence in probability automatically implies the stronger almost sure convergence).

### Teaching Action A03 — Distribution Convergence Ignores Value-Closeness; Probability-of-Gap Never Needs to Hit Zero (Primitive P06: Contrast Pair)

Present Example 2's direct evidence: $X_n=-X$ converges to $X$ in distribution trivially (identical distributions throughout), yet the actual gap $|X_n-X|=2|X|$ never shrinks at all. State: "convergence in distribution is ONLY about the CDFs matching in the limit — it makes no promise whatsoever about actual values being close, unlike the other three modes."

Then present Example 3's evidence: $P(|Z|/n>\varepsilon)$ is strictly positive for every finite $n$, yet still $\to0$ as $n\to\infty$. State: "convergence in probability is a LIMIT statement — the probability has to approach $0$, but it never needs to actually equal $0$ at any finite stage, exactly as ordinary sequence convergence never requires hitting the limit exactly."

- **MC-2 hook**: ask "if $X_n$ converges to $X$ in distribution, does that mean their actual values are getting close?" — a "yes" answer reveals MC-2 (assuming distributional convergence implies value-closeness, the weakest of the four modes' defining feature being routinely overlooked).
- **MC-3 hook**: ask "for $X_n$ to converge to $X$ in probability, does $P(|X_n-X|>\varepsilon)$ eventually need to become EXACTLY zero?" — a "yes" answer reveals MC-3 (confusing "approaches zero in the limit" with "eventually equals zero exactly").

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the formal definitions of convergence in probability and almost sure convergence, and explain in one sentence each what makes almost sure convergence the stronger requirement.
  2. Using Example 1's moving-spike sequence, explain concretely why NO single outcome $\omega\in[0,1]$ produces a convergent sequence $X_n(\omega)$, even though $X_n\xrightarrow{P}0$.
  3. Explain why $X_n=-X$ (for $X\sim N(0,1)$) converging in distribution to $X$ does not imply $X_n\xrightarrow{P}X$, referencing the actual gap $|X_n-X|$.
  4. State the full hierarchy of the four convergence modes from strongest to weakest, and explain (using this lesson's counterexamples) why each implication is one-directional.
- **P76 (Transfer Probe, mode = cross-link probe against `math.real.convergence-sequences`)**: "Recall from `math.real.convergence-sequences` that a sequence of real numbers $a_n\to L$ requires $\forall\varepsilon>0\,\exists N: n>N\Rightarrow|a_n-L|<\varepsilon$, checked for arbitrary $\varepsilon$, never just one convenient value. (a) Explain precisely how almost sure convergence uses this EXACT definition, just applied separately to each fixed outcome $\omega$ (excluding a probability-zero set). (b) Explain why convergence in probability, by contrast, applies that same $\varepsilon$–$N$ style reasoning not to the random variable's values directly, but to the sequence of NUMBERS $P(|X_n-X|>\varepsilon)$ instead — i.e., which sequence is actually the one being shown to converge to $0$ in the ordinary sense? (c) A classmate claims that because 'sequence convergence' and 'convergence in probability' both use an $\varepsilon$-based definition, they must be 'basically the same idea, just relabeled.' Using Example 1's moving-spike sequence, explain specifically what is different about WHAT is required to converge in each case."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONVERGENCE-IN-PROBABILITY-ASSUMED-EQUIVALENT-TO-ALMOST-SURE | Believing convergence in probability automatically implies almost sure convergence, missing that the probability of a large gap shrinking is strictly weaker than every individual outcome's sequence actually converging | Foundational |
| MC-2 | CONVERGENCE-IN-DISTRIBUTION-ASSUMED-TO-IMPLY-VALUE-CLOSENESS | Believing convergence in distribution means the actual values of X_n and X get close, missing that it is purely a statement about CDFs matching in the limit, with no requirement of value closeness at all | Foundational |
| MC-3 | CONVERGENCE-IN-PROBABILITY-REQUIRES-EXACT-ZERO | Believing convergence in probability requires P(\|X_n−X\|>ε) to become exactly zero for large n, rather than merely approaching zero in the limit while possibly remaining positive for every finite n | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Convergence in Probability Assumed Equivalent to Almost Sure") → P41 (detect: ask a student whether convergence in probability guarantees almost sure convergence, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's moving-spike sequence, showing zero outcomes converge pointwise despite convergence in probability, re-anchoring on "probability-of-gap shrinking is a genuinely weaker promise than every outcome's sequence actually settling down").
- **B02 (targets MC-2)**: P27 (name it: "Convergence in Distribution Assumed to Imply Value Closeness") → P41 (detect: ask a student whether convergence in distribution means the random variables' actual values get close, and check for a "yes") → P64 (conceptual shift: re-walk Example 2's $X_n=-X$ construction, showing a constant nonzero gap despite perfect distributional convergence, re-anchoring on "distribution convergence is ONLY about the CDFs, never about the actual realized values").
- **B03 (targets MC-3)**: P27 (name it: "Convergence in Probability Requires Exact Zero") → P41 (detect: ask a student whether P(\|X_n−X\|>ε) must eventually equal exactly zero for convergence in probability, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's $Z/n$ computation, showing the probability stays strictly positive for every finite $n$ yet still converges to $0$ in the limit, re-anchoring on "it's a LIMIT statement — approaching zero is enough, exactly like ordinary sequence convergence never needing to hit its limit exactly").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.random-variable` (the random variable as a function $X:\Omega\to\mathbb{R}$, never a fixed value — the object this concept's four convergence modes are all defined for), `math.real.convergence-sequences` (the $\varepsilon$–$N$ definition this concept's convergence-in-probability and almost-sure definitions both directly reuse, in two different roles).
- **Unlocks**: `math.prob.lln` (the Law of Large Numbers, typically stated as either an almost sure or in-probability convergence result — this concept supplies the precise vocabulary for which mode is being claimed), `math.prob.clt` (the Central Limit Theorem, a convergence-in-distribution result — this concept's LO3 supplies the exact meaning of that claim).
- **Cross-link (P76_mode = cross-link probe against `math.real.convergence-sequences`, already authored, and already a `requires` prerequisite)**: the transfer probe explicitly traces both convergence-in-probability and almost-sure convergence back to that concept's own $\varepsilon$–$N$ definition, in two structurally different roles (applied to the probability sequence vs. applied pointwise per outcome).

## Component 8 — Teaching Notes

- estimated_hours = 7 with an expert/analyze tag places this at a "3 TAs + gate" tier — A01 (the definitional generalization), A02 (probability-without-almost-sure), and A03 (distribution-without-closeness, plus the exact-zero clarification) each target distinct LOs, appropriate for a concept whose core difficulty is entirely conceptual (four related-but-distinct definitions and their strict hierarchy) rather than computational.
- All three worked examples are STANDARD, well-known counterexamples from the probability-theory literature (the moving-spike/typewriter sequence; the symmetric-distribution non-convergent-values example; the shrinking-but-never-zero tail probability) rather than invented constructions, since the corpus's own precedent (`math.fnal.spectral-theory`'s shift and multiplication operators) favors canonical field examples for genuinely delicate distinctions like these.
- Example 1's moving-spike construction was deliberately chosen over a simpler example because it demonstrates the STRONGEST possible form of the probability/almost-sure gap (zero outcomes converge, not merely "some"), making MC-1 as decisively refuted as possible rather than leaving room for a partial-truth reading.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.real.convergence-sequences authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.real.convergence-sequences) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert-tier learner, direct generalization of two mastered prerequisites) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

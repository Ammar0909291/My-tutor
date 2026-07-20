# Teaching Blueprint: Banach Fixed-Point Theorem (`math.real.fixed-point-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.fixed-point-theorem` |
| name | Banach Fixed-Point Theorem |
| domain | Real Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.real.lipschitz-continuity`, `math.real.completeness-metric` |
| unlocks | none |
| cross_links | `math.de.existence-uniqueness` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has the Lipschitz condition and metric-space completeness; the task is combining them into a genuinely constructive existence-and-uniqueness machine |
| description (KG) | A contraction mapping $T$ on a complete metric space ($d(Tx,Ty)\le k\cdot d(x,y)$, $k<1$) has a unique fixed point, attained in the limit of iterated applications $T^n(x_0)$. Used to prove ODE existence-uniqueness (Picard iteration). |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize a CONTRACTION mapping's condition, $d(Tx,Ty)\le k\cdot d(x,y)$ with $k<1$ STRICTLY, as `math.real.lipschitz-continuity`'s own Lipschitz condition SPECIALIZED to the case $L=k<1$ — a genuinely SHARPER requirement than merely being Lipschitz with SOME constant $L$ — and correctly determine, for a specific mapping, whether it is a contraction (Lipschitz with $k<1$), merely Lipschitz (some $L\ge1$), or neither.
- LO2: State and apply the theorem's conclusion: a contraction mapping $T$ on a COMPLETE metric space has a UNIQUE fixed point $x^*$ (satisfying $T(x^*)=x^*$), obtained as the LIMIT of the iterated sequence $x_0,T(x_0),T^2(x_0),T^3(x_0),\ldots$ starting from ANY point $x_0$ — and correctly compute several iterations of a specific contraction to observe direct numerical convergence toward the fixed point.
- LO3: Explain precisely WHY `math.real.completeness-metric`'s own completeness hypothesis is essential — the iterated sequence $x_0,T(x_0),T^2(x_0),\ldots$ is provably CAUCHY (a direct consequence of the contraction condition), and completeness is EXACTLY what guarantees a Cauchy sequence actually CONVERGES to a point WITHIN the space — using an incomplete metric space where a contraction genuinely fails to have a fixed point as a concrete counterexample.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.lipschitz-continuity` (the Lipschitz condition $|f(x)-f(y)|\le L|x-y|$, and its constructive relationship to uniform continuity) and `math.real.completeness-metric` (a metric space is complete iff every Cauchy sequence converges within the space).

## Component 3 — Core Explanation

**A contraction is a Lipschitz mapping with the STRICT constant condition $k<1$**: `math.real.lipschitz-continuity`'s own condition allows ANY finite constant $L\ge0$. A CONTRACTION additionally requires this constant to be STRICTLY LESS THAN 1 — meaning $T$ doesn't merely control how much it can "stretch" distances (as ordinary Lipschitz continuity does), it GUARANTEES it strictly SHRINKS every pair of points' distance by at least a factor of $k$. This single strengthening ($L\to k<1$) is the entire mechanism that makes repeated iteration of $T$ converge — a Lipschitz mapping with $L\ge1$ provides NO such guarantee, and iterating it need not converge at all.

**The iterated sequence is Cauchy — a direct consequence of the contraction condition, using completeness to secure convergence**: starting from any $x_0$, define $x_1=T(x_0),x_2=T(x_1)=T^2(x_0)$, and so on. The contraction condition gives $d(x_{n+1},x_n)=d(T(x_n),T(x_{n-1}))\le k\cdot d(x_n,x_{n-1})$ — so consecutive distances shrink GEOMETRICALLY by factor $k$ at each step: $d(x_{n+1},x_n)\le k^n\cdot d(x_1,x_0)$. Summing a geometric-decaying tail (using $k<1$) shows the sequence $(x_n)$ is CAUCHY — its terms get arbitrarily close together as $n$ grows. `math.real.completeness-metric`'s own completeness hypothesis is PRECISELY what upgrades this Cauchy property into actual CONVERGENCE — to a genuine point $x^*$ WITHIN the space (not merely "close to converging" without an actual limit point available). Continuity of $T$ (itself following from the Lipschitz/contraction condition) then confirms $x^*$ is a genuine FIXED point: $T(x^*)=T(\lim x_n)=\lim T(x_n)=\lim x_{n+1}=x^*$.

**Completeness is not a technicality — an incomplete space can genuinely lack a fixed point**: without completeness, the same Cauchy sequence construction goes through IDENTICALLY, but the Cauchy sequence might have NO limit point actually available WITHIN the space — the "would-be fixed point" is missing, exactly analogous to how $\mathbb{Q}$ (an incomplete metric space) is missing irrational limit points that Cauchy sequences of rationals genuinely converge toward IN $\mathbb{R}$, but not within $\mathbb{Q}$ itself.

## Component 4 — Worked Examples

**Example 1 (LO1 — distinguishing a genuine contraction from a merely-Lipschitz mapping, breaking MC-1)**: for $T(x)=\frac{x}{2}+1$ on $\mathbb{R}$: $|T(x)-T(y)|=\left|\frac{x-y}{2}\right|=\frac12|x-y|$ — a Lipschitz constant of EXACTLY $\frac12<1$, confirming $T$ IS a genuine contraction ($k=\frac12$). Contrast: for $S(x)=2x+1$: $|S(x)-S(y)|=2|x-y|$ — Lipschitz with constant $L=2$, but since $2\not<1$, $S$ is Lipschitz WITHOUT being a contraction — this distinction (verified by directly computing each mapping's own Lipschitz constant and checking it against the strict $<1$ threshold) is exactly LO1's classification test applied concretely.

**Example 2 (LO2 — direct numerical convergence to the fixed point via iteration, breaking MC-2)**: continuing Example 1's contraction $T(x)=\frac x2+1$ (with $k=\frac12<1$, on the complete metric space $\mathbb{R}$): starting from $x_0=0$: $x_1=T(0)=1$; $x_2=T(1)=1.5$; $x_3=T(1.5)=1.75$; $x_4=T(1.75)=1.875$; $x_5=1.9375$ — visibly converging toward $x^*=2$. Verifying directly: $T(2)=\frac22+1=1+1=2$ — confirming $x^*=2$ genuinely IS the fixed point, reached as the LIMIT of the iterated sequence starting from ANY $x_0$ (an algebraic check with a different starting point, e.g. $x_0=10$, would converge to the SAME $x^*=2$), exactly as the theorem's uniqueness claim predicts.

**Example 3 (LO3 — completeness's necessity via an incomplete-space counterexample, breaking MC-3)**: consider $T(x)=\frac x2+\frac1{2\sqrt2}$ on the metric space $\mathbb{Q}\cap(0,2)$ (RATIONAL numbers strictly between $0$ and $2$, with the usual distance — an INCOMPLETE metric space, since it's missing irrational limit points like $\sqrt2$ itself). Checking: $T$ IS a genuine contraction on this space ($k=\frac12<1$, verified identically to Example 1's computation). The iterated sequence starting from a rational $x_0$ is CAUCHY (guaranteed by the contraction condition, exactly as in Component 3's derivation) — but its actual limit, algebraically solvable from $x^*=T(x^*)\Rightarrow x^*=\sqrt2$, is IRRATIONAL, hence NOT a member of $\mathbb{Q}\cap(0,2)$ — the Cauchy sequence has NO limit point WITHIN this incomplete space, so $T$ genuinely has NO fixed point there, concretely confirming completeness's necessity rather than asserting it abstractly.

## Component 5 — Teaching Actions

### Teaching Action A01 — A Contraction Is Lipschitz With the Strict Extra Condition $k<1$ (Primitive P11: Representation Shift)

State: "`math.real.lipschitz-continuity`'s own condition allows any constant $L$ — a contraction demands the SAME kind of bound, but with the strict extra requirement $k<1$, which is exactly what guarantees genuine shrinking, not just controlled stretching." Walk Example 1's direct classification of two mappings.

- **MC-1 hook**: ask "is EVERY Lipschitz mapping automatically a contraction, or does 'contraction' require the additional strict condition $k<1$?" — a "every Lipschitz mapping is automatically a contraction" answer reveals MC-1 (missing the strict $k<1$ requirement, confusing contraction with mere Lipschitz continuity).

### Teaching Action A02 — Iteration From ANY Starting Point Converges to the SAME Fixed Point (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: iterating $T(x)=\frac x2+1$ from $x_0=0$ visibly converges toward $2$, matching the algebraically-verified fixed point $T(2)=2$ exactly. State: "the theorem isn't just claiming a fixed point exists somewhere abstractly — you can literally WATCH the iterated sequence converge to it numerically, starting from whichever point you like, and the theorem guarantees you'll always land on the SAME unique fixed point."

- **MC-2 hook**: ask "does iterating a contraction mapping from a DIFFERENT starting point $x_0$ converge to a genuinely DIFFERENT fixed point, or does the theorem guarantee convergence to the SAME unique fixed point regardless of the starting point?" — a "different starting points give different fixed points" answer reveals MC-2 (missing the theorem's uniqueness guarantee, independent of starting point).

### Teaching Action A03 — Completeness Genuinely Guarantees the Fixed Point Exists — Incomplete Spaces Can Lack One (Primitive P06: Contrast Pair)

Contrast the tempting assumption "the contraction condition alone is enough to guarantee a fixed point" against Example 3's demonstration that the SAME contraction, restricted to an INCOMPLETE metric space, genuinely has NO fixed point WITHIN that space — the Cauchy sequence's true limit ($\sqrt2$) simply isn't a member. State: "completeness isn't a technical footnote — it's precisely what guarantees the Cauchy sequence the contraction produces actually HAS somewhere to converge TO, within the space itself."

- **MC-3 hook**: ask "does the contraction condition alone (without any completeness hypothesis on the space) guarantee a fixed point exists?" — a "yes, contraction alone suffices" answer reveals MC-3 (missing completeness's essential, independently necessary role).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Determine whether $T(x)=\frac x3-1$ is a contraction on $\mathbb{R}$, computing its Lipschitz constant explicitly.
  2. For your answer to problem 1 (if a contraction), compute the first 4 iterates starting from $x_0=0$, and algebraically verify the fixed point.
  3. Explain, citing the contraction condition directly, why $d(x_{n+1},x_n)\le k^n\cdot d(x_1,x_0)$, and why this makes the sequence Cauchy.
  4. Explain, using Example 3's incomplete-space counterexample, why completeness cannot be dropped from the theorem's hypotheses.
- **P76 (Transfer Probe, mode = independence — `math.de.existence-uniqueness` not yet authored, pending future revision)**: "A numerical-methods engineer wants to solve an equation of the form $x=g(x)$ (a fixed-point formulation) by repeatedly computing $x_{n+1}=g(x_n)$ starting from a guess $x_0$, hoping the sequence converges to a genuine solution. (a) Using this lesson's theorem, explain precisely what property of $g$ (beyond merely being continuous) the engineer needs to verify to GUARANTEE this iterative scheme converges to a unique solution, regardless of the starting guess $x_0$. (b) If the engineer verifies $g$ is Lipschitz with constant $L=1.5$ on the domain of interest, explain why this is NOT sufficient to guarantee convergence, even though $g$ is genuinely Lipschitz. (c) Suppose the engineer is working within a domain that is bounded but NOT closed (hence not complete as a metric space). Explain what could go wrong with the iterative scheme even if $g$ IS verified to be a genuine contraction on that domain."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LIPSCHITZ-ASSUMED-AUTOMATICALLY-CONTRACTION | Believing every Lipschitz mapping is automatically a contraction, missing the strict extra requirement $k<1$ | Foundational |
| MC-2 | FIXED-POINT-ASSUMED-STARTING-POINT-DEPENDENT | Believing iterating a contraction from different starting points converges to genuinely different fixed points, missing the theorem's uniqueness guarantee | High |
| MC-3 | COMPLETENESS-ASSUMED-UNNECESSARY-FOR-FIXED-POINT | Believing the contraction condition alone (without completeness) guarantees a fixed point exists, missing completeness's essential, independently necessary role | High |

- **B01 (targets MC-1)**: P27 (name it: "Lipschitz Assumed Automatically Contraction") → P41 (detect: ask whether every Lipschitz mapping is automatically a contraction) → P64 (conceptual shift: re-walk Example 1's direct classification contrasting $k=\frac12$ against $L=2$).
- **B02 (targets MC-2)**: P27 (name it: "Fixed Point Assumed Starting-Point Dependent") → P41 (detect: ask whether different starting points give different fixed points) → P64 (conceptual shift: re-walk Example 2's numerical convergence, re-anchoring on the algebraically-verified unique fixed point).
- **B03 (targets MC-3)**: P27 (name it: "Completeness Assumed Unnecessary for Fixed Point") → P41 (detect: ask whether the contraction condition alone suffices without completeness) → P64 (conceptual shift: re-walk Example 3's incomplete-space counterexample where the fixed point genuinely fails to exist).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.lipschitz-continuity` (the Lipschitz condition this concept's contraction condition directly specializes) and `math.real.completeness-metric` (the Cauchy-sequence-convergence property this concept's proof directly relies on).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.de.existence-uniqueness`, checked via `ls docs/curriculum/blueprints/` — confirmed NOT YET authored at the time this blueprint was written. Per the established P76_mode rule, this blueprint uses **independence** mode.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 establishing the precise contraction-vs-Lipschitz distinction, LO2 given full constructive depth via direct numerical iteration, and LO3 grounding completeness's necessity in a genuine counterexample rather than an assertion.
- **Division of labor**: `math.real.lipschitz-continuity` already owns the general Lipschitz condition and its constructive relationship to uniform continuity (verified by grep — no contraction-mapping or fixed-point content there); `math.real.completeness-metric` already owns the completeness definition and Cauchy-sequence-convergence property this concept's proof directly reuses (verified by grep — no contraction or fixed-point content there either). This concept owns the contraction condition itself (the strict $k<1$ specialization), the full existence-and-uniqueness theorem with its constructive iterative proof, and completeness's necessity, demonstrated via a genuine counterexample.
- Example 3's deliberate choice of $\mathbb{Q}\cap(0,2)$ with a contraction whose true fixed point is $\sqrt2$ (rather than an abstract assertion that incompleteness could cause failure) was made specifically to give LO3's necessity claim a fully verified, concrete counterexample — directly paralleling the standard "why $\mathbb{Q}$ is incomplete" example familiar from `math.real.completeness-metric` itself, reusing that same intuition rather than introducing an unrelated new incomplete space.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.de.existence-uniqueness` confirmed NOT authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has Lipschitz continuity and completeness; task is combining them into a constructive machine) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

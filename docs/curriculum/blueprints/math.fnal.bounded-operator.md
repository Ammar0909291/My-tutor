# Teaching Blueprint: Bounded Linear Operator (`math.fnal.bounded-operator`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.bounded-operator` |
| name | Bounded Linear Operator |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.fnal.banach-space`, `math.linalg.linear-map` |
| unlocks | `math.fnal.spectral-theory`, `math.fnal.open-mapping-theorem` |
| cross_links | `math.linalg.linear-map` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | A (Abstract) — a direct refinement of the already-known linear map definition with one new quantitative condition added |
| description (KG) | T:X→Y linear is bounded iff \|T\| = sup_{\|x\|≤1}\|Tx\|<∞, equivalently continuous everywhere. B(X,Y) = space of bounded operators; Banach space under operator norm. T bounded iff maps bounded sets to bounded sets. |

## Component 1 — Learning Objectives

- LO1: Define a linear map $T:X\to Y$ between normed spaces as **bounded** iff $\|T\| := \sup_{\|x\|\le1}\|Tx\| < \infty$ — i.e. $T$ does not stretch the unit ball's vectors by an unbounded amount — and compute $\|T\|$ directly for a specific finite-dimensional operator.
- LO2: State and use the equivalence: **$T$ is bounded iff $T$ is continuous everywhere** — directly refuting the misconception (common when first meeting this in infinite dimensions) that boundedness is a strictly stronger or unrelated condition from continuity, when in fact for linear maps they coincide exactly.
- LO3: Recognize $B(X,Y)$, the space of all bounded linear operators from $X$ to $Y$, as itself a **normed vector space under the operator norm** $\|T\|$ — and (citing `math.fnal.banach-space`) that $B(X,Y)$ is itself a Banach space whenever $Y$ is a Banach space, regardless of whether $X$ is.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.linear-map` (a linear map $T$ satisfies additivity $T(u+v)=T(u)+T(v)$ and homogeneity $T(cv)=cT(v)$, and is completely determined by its action on a basis) and `math.fnal.banach-space` (a complete normed vector space, and why completeness is a load-bearing structural property).

## Component 3 — Core Explanation

**Boundedness, defined via the operator norm**: for a linear map $T:X\to Y$ between normed spaces, define $\|T\| = \sup_{\|x\|\le1}\|Tx\|$ — the largest factor by which $T$ can stretch a vector of length at most $1$. $T$ is **bounded** if this supremum is finite. Equivalently (and this is where the "bounded" terminology comes from directly): $T$ maps every bounded set to a bounded set — if $\|T\|=M<\infty$, then for any $x$ with $\|x\|\le r$, $\|Tx\|\le Mr$, so the image of any bounded set stays bounded.

**Bounded $\Leftrightarrow$ continuous, for linear maps specifically**: for a general (non-linear) function, boundedness and continuity are unrelated properties. But for a **linear** map, they are **exactly equivalent**: if $T$ is bounded with $\|T\|=M$, then for any $x,x_0$, $\|Tx-Tx_0\| = \|T(x-x_0)\| \le M\|x-x_0\|$ (using linearity to rewrite the difference as $T$ applied to a single vector, then boundedness), which is a Lipschitz-style bound directly giving continuity. Conversely, a linear map continuous at even a single point (e.g. at $0$) can be shown to be bounded everywhere, using linearity to transfer the local control at $0$ to a uniform bound. This equivalence is special to linearity — it is exactly linearity's algebraic structure (additivity/homogeneity) that lets local continuity information propagate into a single global bound.

**$B(X,Y)$ as a normed (and often Banach) space**: the collection of all bounded linear operators from $X$ to $Y$, denoted $B(X,Y)$, is itself a vector space (sums and scalar multiples of bounded linear operators are again bounded linear operators), and $\|T\|$ (the operator norm) makes $B(X,Y)$ a genuine normed space. If $Y$ is complete (a Banach space), then $B(X,Y)$ is **also** complete — a Banach space in its own right — regardless of whether $X$ itself is complete. This is a structurally important fact: operators themselves form a space with the same good properties as the target space $Y$.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing the operator norm directly)**: Let $T:\mathbb{R}^2\to\mathbb{R}^2$ be given by $T(x,y)=(3x,y)$ (a linear map, easily checked via additivity/homogeneity). Using the Euclidean norm, for $\|(x,y)\|\le1$ (i.e. $x^2+y^2\le1$), $\|T(x,y)\|=\sqrt{9x^2+y^2}$. This is maximized by putting all the "length budget" into $x$: at $(x,y)=(1,0)$, $\|T(1,0)\|=3$. So $\|T\|=3$ — finite, confirming $T$ is bounded.

**Example 2 (LO2 — boundedness and continuity coincide, breaking MC-1)**: Return to Example 1's $T(x,y)=(3x,y)$, with $\|T\|=3$. For any two points $(x_1,y_1),(x_2,y_2)$: $\|T(x_1,y_1)-T(x_2,y_2)\| = \|T((x_1,y_1)-(x_2,y_2))\| \le 3\|(x_1,y_1)-(x_2,y_2)\|$ — a direct Lipschitz bound with constant $3=\|T\|$, immediately giving continuity everywhere (make the input difference small enough and the output difference shrinks proportionally). This shows explicitly how the SAME number, $\|T\|=3$, that certified boundedness also directly certifies continuity — for a linear map, these are not two separate facts requiring two separate arguments, but one fact viewed two ways.

**Example 3 (LO3 — $B(X,Y)$'s own norm and Banach-space status)**: Consider two bounded operators on $\mathbb{R}^2$: $T_1(x,y)=(3x,y)$ (from Example 1, $\|T_1\|=3$) and $T_2(x,y)=(x,2y)$ (checking similarly, $\|T_2\|=2$). Their sum $(T_1+T_2)(x,y) = (4x,3y)$ is itself a linear map, and one can verify $\|T_1+T_2\|=4 \le \|T_1\|+\|T_2\|=5$ (the triangle inequality for the operator norm, exactly the norm-axiom structure from `math.fnal.normed-space`). Since $Y=\mathbb{R}^2$ is itself a Banach space (finite-dimensional, complete under any norm), $B(\mathbb{R}^2,\mathbb{R}^2)$ is guaranteed — by the cited structural fact — to be a Banach space as well, meaning any Cauchy sequence of operators in this space converges to another bounded operator in the same space.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Operator Norm as "Maximum Stretch Factor" (Primitive P11: Representation Shift)

State: "the operator norm $\|T\|$ answers one question: what's the biggest factor by which $T$ can stretch a length-1 vector?" Work Example 1's direct computation, geometrically framing the unit-ball input and finding where the stretch is maximized.

### Teaching Action A02 — Bounded and Continuous Are the Same Fact for Linear Maps (Primitive P28: Conflict Evidence)

Present Example 2's direct derivation: the same numeric value $\|T\|=3$ used first to confirm boundedness and then, via the Lipschitz-style inequality, to directly confirm continuity. State: "for a NON-linear function, boundedness and continuity can come apart completely — but for a LINEAR map, they're forced together, because linearity lets one single global constant ($\|T\|$) control the behavior everywhere at once."

- **MC-1 hook**: ask "are 'bounded' and 'continuous' two independent properties you'd need to check separately for a linear map?" — a "yes" answer reveals MC-1 (assuming boundedness and continuity are unrelated or require separate verification, missing the equivalence that is special to linearity).

### Teaching Action A03 — B(X,Y) Inherits Structure from Y (Primitive P06: Contrast Pair)

Work Example 3's operator-sum computation, verifying the triangle inequality for $\|\cdot\|$ directly. State: "operators themselves live in a space, $B(X,Y)$, with its own norm — and if the TARGET space $Y$ is Banach, this operator space is automatically Banach too, regardless of what $X$ looks like."

- **MC-2 hook**: ask "does $B(X,Y)$ being a Banach space depend on whether $X$ itself is complete?" — a "yes" answer reveals MC-2 (assuming $B(X,Y)$'s completeness depends on both $X$ and $Y$, rather than recognizing it depends only on $Y$'s completeness).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\|T\|$ for $T:\mathbb{R}^2\to\mathbb{R}^2$ given by $T(x,y)=(2x,-4y)$, using the Euclidean norm.
  2. Explain, using the Lipschitz-style inequality from Example 2, why a bounded linear operator with $\|T\|=5$ must satisfy $\|Tx-Ty\|\le5\|x-y\|$ for all $x,y$, and why this directly implies continuity.
  3. For two bounded operators $T_1,T_2:X\to Y$ with $\|T_1\|=4$ and $\|T_2\|=6$, use the triangle inequality for the operator norm to give the tightest upper bound you can state for $\|T_1+T_2\|$.
  4. Explain, in your own words, why $B(X,Y)$ being a Banach space is guaranteed by $Y$'s completeness alone, without needing $X$ to be complete — referencing the definition of the operator norm's supremum over $\|x\|\le1$.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.linear-map`)**: "Recall from your `math.linalg.linear-map` lesson the linear map $T:\mathbb{R}^2\to\mathbb{R}^2$ defined by its basis action $T(1,0)=(3,1)$, $T(0,1)=(-2,4)$, with matrix representation $A=\begin{pmatrix}3&-2\\1&4\end{pmatrix}$. (a) Explain why this $T$, being a linear map between finite-dimensional spaces, is AUTOMATICALLY a bounded operator — citing the fact that finite-dimensional linear maps are always bounded, unlike the infinite-dimensional case where boundedness must be checked. (b) Using that lesson's basis-determination fact (a linear map is completely determined by its action on a basis) together with THIS lesson's operator-norm definition, explain why knowing $\|T(1,0)\|$ and $\|T(0,1)\|$ alone is not enough to directly read off $\|T\|$ — the supremum must be taken over the ENTIRE unit ball, not just the basis vectors' images. (c) That lesson's Contrast 1 showed a linear map is fully forced by its basis images (no independent freedom elsewhere) — explain how this same forcing fact makes computing $\|T\|=\sup_{\|x\|\le1}\|Tx\|$ a finite, tractable computation rather than requiring you to check infinitely many vectors independently."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BOUNDED-AND-CONTINUOUS-TREATED-AS-INDEPENDENT | Believing boundedness and continuity are two unrelated properties requiring separate verification for a linear map, rather than recognizing they are exactly equivalent for linear maps specifically | Foundational |
| MC-2 | B-X-Y-COMPLETENESS-ASSUMED-TO-NEED-BOTH-SPACES-COMPLETE | Assuming $B(X,Y)$'s status as a Banach space depends on both $X$ and $Y$ being complete, rather than recognizing it depends only on $Y$'s completeness | Foundational |
| MC-3 | OPERATOR-NORM-COMPUTED-ONLY-AT-BASIS-VECTORS | Computing $\|T\|$ by checking only the images of basis vectors, rather than correctly taking the supremum over the entire unit ball (which, while achieved at a specific point, is not automatically one of the basis vectors) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Bounded-Continuous Independence Assumption") → P41 (detect: ask "if I told you $T$ is bounded, do you also know it's continuous, or would you need to check separately?") → P64 (conceptual shift: re-walk Example 2's single Lipschitz inequality, showing the identical constant $\|T\|$ certifies both properties at once via linearity).
- **B02 (targets MC-2)**: P27 (name it: "B(X,Y) Completeness Requires Both Spaces Assumption") → P41 (detect: ask whether $B(X,Y)$ can be Banach even if $X$ is not itself complete) → P64 (conceptual shift: re-state the structural fact precisely — completeness of $B(X,Y)$ transfers FROM $Y$ alone, since a Cauchy sequence of operators is controlled pointwise by where it sends vectors, landing in the (complete) target space $Y$).
- **B03 (targets MC-3)**: P27 (name it: "Operator Norm Computed Only at Basis Vectors") → P41 (detect: give a linear map and ask the student to compute $\|T\|$ by evaluating only $\|Te_1\|$ and $\|Te_2\|$ and taking their max) → P64 (conceptual shift: re-walk Example 1's optimization over the full unit circle, showing the maximizing vector need not be a basis vector, and re-anchor on "the supremum is over ALL unit vectors, not just the basis ones — though basis knowledge does make the computation tractable, as the transfer probe explores").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.banach-space` (the completeness property $B(X,Y)$ inherits from $Y$), `math.linalg.linear-map` (the additivity/homogeneity definition this concept adds the boundedness condition to).
- **Unlocks**: `math.fnal.spectral-theory`, `math.fnal.open-mapping-theorem` (both major functional-analysis results studying bounded operators specifically).
- **Cross-link**: KG lists `math.linalg.linear-map` as a cross-link — **verified authored** via `ls docs/curriculum/blueprints/math.linalg.linear-map.md` — so P76_mode = **cross-link probe**, directly reusing that blueprint's own basis-determined linear map example ($T(1,0)=(3,1)$, $T(0,1)=(-2,4)$) as the transfer probe's anchor, per this corpus's established cross-link-probe convention.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag places this at a "3 TAs + cross-link-probe gate" tier — A01 (operator norm computation), A02 (bounded/continuous equivalence), and A03 ($B(X,Y)$'s inherited Banach structure) each target a distinct LO, appropriate for a concept adding one precise quantitative condition to an already-mastered qualitative definition.
- The bounded-continuous equivalence (LO2/MC-1) was given the most teaching weight because it is the single most surprising fact for students transitioning from finite- to infinite-dimensional linear algebra — in finite dimensions EVERY linear map is automatically bounded (a fact the transfer probe uses explicitly in part (a)), so the boundedness condition only becomes a genuine constraint in infinite-dimensional settings, which this blueprint flags without requiring a full infinite-dimensional example (staying within finite-dimensional worked examples per the concept's own "apply" bloom level).
- The cross-link probe's part (a) deliberately surfaces the "every finite-dimensional linear map is bounded" fact explicitly, since `math.linalg.linear-map`'s own blueprint (finite-dimensional throughout) never needed to distinguish bounded from unbounded maps — this blueprint is the first point in the corpus where that distinction becomes meaningful.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.linalg.linear-map authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.linalg.linear-map) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct refinement of an already-known definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

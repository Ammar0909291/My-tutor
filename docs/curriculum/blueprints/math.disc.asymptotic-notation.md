# Teaching Blueprint: Asymptotic Notation (`math.disc.asymptotic-notation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.asymptotic-notation` |
| name | Asymptotic Notation |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.calc.limits`, `math.disc.counting-principles` |
| unlocks | `math.disc.algorithm-complexity` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with a direct numeric verification of the Big-O definition before the general Θ classification |
| description (KG) | f=O(g): f grows at most as fast as g. f=Ω(g): f grows at least as fast. f=Θ(g): f grows at the same rate. Used to classify algorithmic efficiency independent of constants and lower-order terms. |

## Component 1 — Learning Objectives

- LO1: Define Big-O ($f=O(g)$: $\exists c,n_0$ such that $f(n)\le c\cdot g(n)$ for all $n\ge n_0$ — an UPPER bound) and correctly recognize a function can satisfy $f=O(g)$ even while growing STRICTLY SLOWER than $g$ — $O$ is not a "same rate" statement.
- LO2: Distinguish Big-$\Omega$ (lower bound: $f$ grows AT LEAST as fast as $g$) from Big-$\Theta$ (BOTH $O$ and $\Omega$ simultaneously — the SAME rate) — three genuinely different comparison directions.
- LO3: Apply the principle that asymptotic notation is independent of constants and lower-order terms — verify $3n^2+5n+2=\Theta(n^2)$ directly, and recognize that a technically-true but WEAK $O$-bound (like stating a $\Theta(n)$ algorithm is merely $O(n^2)$) is far less informative than the tight $\Theta$ classification.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.limits` (limit behavior of functions as $n\to\infty$) and `math.disc.counting-principles` (basic combinatorial growth rates).

## Component 3 — Core Explanation

**Big-O is an upper bound, not a "same rate" claim**: $f=O(g)$ means $f$ grows AT MOST as fast as $g$ — there exist constants $c>0$ and $n_0$ such that $f(n)\le c\cdot g(n)$ for all $n\ge n_0$. Crucially, this permits $f$ to grow STRICTLY SLOWER than $g$ — a function that grows much more slowly still satisfies $f=O(g)$, since "at most as fast" includes "much slower."

**Three directions of comparison: O, Ω, and Θ**: Big-$\Omega$ is the mirror image — $f=\Omega(g)$ means $f$ grows AT LEAST as fast as $g$ (a LOWER bound). Big-$\Theta$ requires BOTH simultaneously: $f=\Theta(g)$ means $f=O(g)$ AND $f=\Omega(g)$ — genuinely the SAME growth rate, sandwiched from both sides. These are three distinct claims, not interchangeable notations for "similar growth."

**Constants and lower-order terms don't change the classification, but a loose bound can still mislead**: asymptotic notation deliberately ignores constant multipliers and lower-order additive terms — $3n^2+5n+2=\Theta(n^2)$ despite the $3$, the $5n$, and the $+2$. However, while $O$-bounds that are technically true but not TIGHT remain valid statements, they can be uninformative — an algorithm that is actually $\Theta(n)$ is also, technically, $O(n^2)$ (since $n=O(n^2)$), but stating the weaker $O(n^2)$ bound obscures the algorithm's true, much faster performance.

## Component 4 — Worked Examples

**Example 1 (LO1 — O as an upper bound, not same-rate, breaking MC-1)**: Is $n=O(n^2)$? Check the definition: does there exist $c,n_0$ such that $n\le c\cdot n^2$ for all $n\ge n_0$? Taking $c=1,n_0=1$: for $n\ge1$, $n\le n^2$ holds (e.g. $n=1$: $1\le1$; $n=5$: $5\le25$) — YES, $n=O(n^2)$ is TRUE, even though $n$ grows STRICTLY SLOWER than $n^2$ (their ratio $n/n^2=1/n\to0$). $O$ only asserts an upper bound — it says nothing about whether the two functions grow at comparable rates.

**Example 2 (LO2 — constants and lower-order terms don't change Θ classification, breaking MC-2)**: Show $3n^2+5n+2=\Theta(n^2)$: for the UPPER bound ($O$), for $n\ge1$: $3n^2+5n+2\le3n^2+5n^2+2n^2=10n^2$ (using $n\le n^2$ and $1\le n^2$ for $n\ge1$), so $c=10,n_0=1$ works, confirming $O(n^2)$. For the LOWER bound ($\Omega$), for all $n\ge0$: $3n^2+5n+2\ge3n^2$, so $c=3$ works, confirming $\Omega(n^2)$. Both bounds hold — $3n^2+5n+2=\Theta(n^2)$ — the constant $3$ and the lower-order terms $5n+2$ affect the ACTUAL runtime by a constant factor, but never change the fundamental $\Theta(n^2)$ growth-rate classification.

**Example 3 (LO3 — a weak but true O-bound can mislead, breaking MC-3)**: An algorithm with actual runtime $\Theta(n)$ (genuinely linear) is ALSO, technically, $O(n^2)$ — since Example 1 already confirmed $n=O(n^2)$. Stating "this algorithm is $O(n^2)$" is not FALSE, but it is a weak, misleading characterization of an algorithm that actually runs in linear time — far faster than an $O(n^2)$ bound alone would suggest. The tight, genuinely informative classification here is $\Theta(n)$, not the technically-true-but-loose $O(n^2)$.

## Component 5 — Teaching Actions

### Teaching Action A01 — O Permits Slower Growth, Not Just Equal Growth (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: $n=O(n^2)$ is true, even though $n$ grows strictly slower. State: "Big-O is an upper bound — it doesn't require the two functions to grow at comparable rates, only that one never outpaces the other beyond a constant multiple."

- **MC-1 hook**: ask "does f=O(g) mean f and g grow at the same rate?" — a "yes" answer reveals MC-1 (conflating O, an upper bound, with Θ, a same-rate statement).

### Teaching Action A02 — Constants and Lower-Order Terms Don't Change the Class (Primitive P11: Representation Shift)

State: "asymptotic classification deliberately ignores constant factors and lower-order terms — 3n²+5n+2 and n² belong to the identical Θ(n²) class, even though they're not literally the same function." Work Example 2's full upper-and-lower-bound verification.

- **MC-2 hook**: ask "does a leading constant (like the 3 in 3n²) or a lower-order term (like +5n+2) change a function's Θ classification?" — a "yes" answer reveals MC-2 (believing constants/lower-order terms affect the asymptotic class, rather than just the actual runtime by a constant factor).

### Teaching Action A03 — A Loose but True Bound Can Still Mislead (Primitive P06: Contrast Pair)

Contrast Example 3's technically-true $O(n^2)$ claim against the genuinely informative $\Theta(n)$ classification for the same algorithm. State: "a true but loose upper bound doesn't lie — but it can obscure how fast an algorithm actually is; always prefer the tightest classification (Θ) when it's known."

- **MC-3 hook**: ask "is stating an algorithm's Big-O bound always the most informative way to describe its efficiency, regardless of whether that bound is tight?" — a "yes" answer reveals MC-3 (missing that a loose O-bound, while technically true, can be far less informative than the tight Θ classification).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Determine whether $\log n=O(n)$, finding valid constants $c,n_0$.
  2. Show $5n^3+2n^2+n=\Theta(n^3)$ by verifying both the O and Ω bounds.
  3. Explain why $n^2=O(n^3)$ is true even though $n^2$ and $n^3$ do not grow at the same rate.
  4. An algorithm has actual runtime $\Theta(n\log n)$. Explain why stating it is "$O(n^2)$" is technically true but less informative than stating it is $\Theta(n\log n)$.
- **P76 (Transfer Probe, mode = independence)**: "A software engineer benchmarks two sorting algorithms and reports both as 'O(n²)' in their documentation. (a) Explain what this claim technically guarantees about each algorithm's growth rate, and what it does NOT guarantee (i.e., whether they must have the same actual performance). (b) The engineer later discovers one algorithm actually runs in $\Theta(n\log n)$ time. Explain why the original 'O(n²)' claim about this algorithm was not false, yet was a poor characterization of its actual efficiency. (c) A colleague argues 'since both algorithms are O(n²), they must be equally efficient in practice.' Explain specifically why this conclusion doesn't follow, using this lesson's O-vs-Θ distinction."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BIG-O-CONFLATED-WITH-SAME-RATE | Believing f=O(g) means f and g grow at the same rate, missing that O is only an upper bound permitting strictly slower growth | Foundational |
| MC-2 | CONSTANTS-AND-LOWER-ORDER-TERMS-ASSUMED-TO-CHANGE-CLASS | Believing constant factors or lower-order terms change a function's asymptotic classification, missing that Θ deliberately ignores them | Foundational |
| MC-3 | LOOSE-O-BOUND-ASSUMED-EQUALLY-INFORMATIVE-AS-TIGHT-BOUND | Believing any true Big-O bound is an equally informative description of an algorithm's efficiency, missing that a loose bound can obscure much faster actual performance | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Big-O Conflated with Same Rate") → P41 (detect: ask a student whether n=O(n²) implies n and n² grow at the same rate, checking for "yes") → P64 (conceptual shift: re-walk Example 1's direct verification, re-anchoring on "O is an upper bound, permitting strictly slower growth too").
- **B02 (targets MC-2)**: P27 (name it: "Constants and Lower-Order Terms Assumed to Change Class") → P41 (detect: ask a student whether 3n²+5n+2 and n² belong to different Θ classes, checking for "yes") → P64 (conceptual shift: re-walk Example 2's upper-and-lower-bound verification, re-anchoring on "Θ ignores constants and lower-order terms").
- **B03 (targets MC-3)**: P27 (name it: "Loose O Bound Assumed Equally Informative as Tight Bound") → P41 (detect: ask a student whether stating a Θ(n) algorithm as "O(n²)" is equally informative as stating Θ(n), checking for "yes") → P64 (conceptual shift: re-walk Example 3's contrast, re-anchoring on "a loose bound, though true, can obscure much faster actual performance").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.limits` (limiting growth-rate behavior this concept's O/Ω/Θ definitions formalize), `math.disc.counting-principles` (basic combinatorial growth rates this concept's examples build on).
- **Unlocks**: `math.disc.algorithm-complexity` (applies this concept's notation directly to classify algorithms' time/space efficiency).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/apply tag places this at a compact "3 TAs + gate" tier, appropriately terse given the concept directly reuses already-mastered limit reasoning, focusing the budget on the three notations' precise definitions and their common misapplications.
- **Division of labor**: `math.calc.limits` owns limiting behavior in general; `math.disc.counting-principles` owns basic combinatorial growth. This concept, `math.disc.asymptotic-notation`, deliberately does not re-teach either; it owns the specific O/Ω/Θ formalism, the constant/lower-order-term independence principle, and the tight-vs-loose bound distinction.
- Examples 1 and 3 deliberately reuse the identical fact ($n=O(n^2)$) across two learning objectives — first to establish that O permits slower growth (LO1), then to show why relying on this true-but-loose bound can misrepresent an algorithm's actual efficiency (LO3) — letting one concrete fact carry both points rather than introducing unrelated new functions.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: direct numeric verification of the Big-O definition before the general Θ classification) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

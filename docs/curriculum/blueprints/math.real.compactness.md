# Teaching Blueprint: Compactness (`math.real.compactness`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.compactness` |
| name | Compactness |
| domain | Real Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.real.open-sets` |
| unlocks | `math.real.extreme-value-theorem` |
| cross_links | `math.top.compactness` |
| CPA_entry_stage | C (Concrete) — testing one specific set against one specific open cover to disprove compactness, before the general "every cover" definition is stated abstractly |
| description (KG) | A set K is compact if every open cover has a finite subcover. Heine-Borel (in ℝⁿ): compact ⟺ closed and bounded. Sequential compactness: every sequence has a convergent subsequence (equivalent in metric spaces). |

## Component 1 — Learning Objectives

- LO1: Define an **open cover** of $K$ (a collection of open sets whose union contains $K$) and define $K$ as **compact** if EVERY open cover has a FINITE subcover — correctly recognizing this is a universal claim about ALL possible covers, not merely a claim that some well-chosen cover happens to reduce to a finite subcollection.
- LO2: State the **Heine-Borel theorem** (specific to $\mathbb{R}^n$): $K$ is compact iff $K$ is BOTH closed AND bounded — recognizing that bounded ALONE is not sufficient (nor is closed alone); both conditions from `math.real.open-sets`'s own closed-set definition are required together.
- LO3: State **sequential compactness** (every sequence in $K$ has a subsequence converging to a point actually WITHIN $K$) as an equivalent characterization in metric spaces, correctly distinguishing "the subsequence converges to some real number" from "the subsequence converges to a point genuinely inside $K$ itself."

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.open-sets` (the open ball $B(x,r)$; a set is open if every point is interior; a set is closed if its complement is open, equivalently if it contains all its limit points; open and closed are not opposites in the naive sense).

## Component 3 — Core Explanation

**Compactness: EVERY open cover, not just a convenient one**: an **open cover** of $K$ is a collection of open sets whose union contains $K$. $K$ is **compact** if EVERY such open cover — no matter how adversarially chosen — has a FINITE subcollection that still covers $K$ (a **finite subcover**). This is a genuine universal claim: to show $K$ is compact, one must handle ALL possible open covers; to show $K$ is NOT compact, it suffices to exhibit just ONE open cover that has no finite subcover at all — a single counterexample cover is fully conclusive, even if other covers of the same set do happen to admit finite subcovers.

**Heine-Borel: closed AND bounded, both required, specific to $\mathbb{R}^n$**: in $\mathbb{R}^n$, the Heine-Borel theorem gives a powerful, directly checkable equivalent: $K$ is compact iff $K$ is **closed** (contains all its limit points, per `math.real.open-sets`) AND **bounded** (contained within some ball of finite radius). Both conditions are genuinely required — a set that is bounded but not closed (missing some boundary point) fails to be compact, and a set that is closed but not bounded (extends infinitely) also fails.

**Sequential compactness: the limit must land back inside $K$ itself**: $K$ is sequentially compact if every sequence of points IN $K$ has a subsequence converging to a point that is ITSELF in $K$ — not merely converging to some real number in the ambient space. A sequence entirely inside $K$ can certainly converge (as an ordinary real-number sequence) to a point OUTSIDE $K$ if $K$ is missing that limit point — and when that happens, it does NOT count as evidence of $K$'s own sequential compactness, even though the sequence's ordinary convergence (per `math.real.convergence-sequences`) is perfectly genuine.

## Component 4 — Worked Examples

**Example 1 (LO1 — a specific cover with no finite subcover disproves compactness, breaking MC-1)**: Let $K=(0,1)$. Consider the open cover $\mathcal{U}=\{(1/n,1) : n=2,3,4,\ldots\}$ — every $x\in(0,1)$ lies in $(1/n,1)$ once $n>1/x$, so $\mathcal{U}$ genuinely covers $(0,1)$. Does $\mathcal{U}$ have a FINITE subcover? Any finite subcollection uses only finitely many values of $n$, say up to $n=N$; their union is just $(1/N,1)$, which MISSES points like $1/(N+1)\in(0,1)$. So NO finite subcollection of $\mathcal{U}$ covers $(0,1)$ — this ONE cover, with no finite subcover, is fully sufficient to prove $(0,1)$ is **NOT** compact, regardless of the fact that OTHER covers of $(0,1)$ (like the trivial single-set cover $\{(0,1)\}$, its own trivial finite subcover) behave perfectly well.

**Example 2 (LO2 — bounded alone is not enough, breaking MC-2)**: $(0,1)$ is bounded (contained in the ball $B(0.5,1)$, say) but NOT closed (it is missing the limit points $0$ and $1$) — by Heine-Borel, this failure of closedness ALONE is enough to conclude $(0,1)$ is not compact, matching Example 1's direct verification. Contrast with $[0,1]$: it IS closed (its complement $(-\infty,0)\cup(1,\infty)$ is open, per `math.real.open-sets`'s own Example 2 reasoning) AND bounded — by Heine-Borel, $[0,1]$ IS compact.

**Example 3 (LO3 — the sequence's limit must land back inside K, breaking MC-3)**: Consider the sequence $a_n=1/n$, entirely contained in $K=(0,1)$. As an ordinary real-number sequence, $a_n\to0$ — but $0\notin(0,1)$! Every subsequence of $a_n$ still converges to $0$, a point OUTSIDE $(0,1)$ — so this sequence provides NO evidence of sequential compactness for $(0,1)$, matching that set's failure via the other two characterizations. Now consider the SAME sequence $a_n=1/n$, but viewed inside $K'=[0,1]$: here $0\in[0,1]$, so this sequence's convergence to $0$ DOES genuinely count as sequential-compactness evidence for $[0,1]$ — the identical numerical sequence behaves completely differently depending on whether its limit point actually belongs to the set in question.

## Component 5 — Teaching Actions

### Teaching Action A01 — One Bad Cover Is Enough to Disprove Compactness (Primitive P11: Representation Shift)

State: "compactness demands EVERY open cover reduces to a finite subcover — finding even ONE cover that resists this is a complete, conclusive disproof, no matter how well-behaved other covers of the same set might be." Work Example 1's full cover-and-no-finite-subcover argument for $(0,1)$.

- **MC-1 hook**: ask "if I can find SOME open cover of a set that reduces to a finite subcover, does that prove the set is compact?" — a "yes" answer reveals MC-1 (missing that compactness requires success for EVERY cover, not just one well-chosen example).

### Teaching Action A02 — Bounded Alone Is Not Enough — Both Conditions Are Required (Primitive P06: Contrast Pair)

Contrast Example 2's $(0,1)$ (bounded, but not closed — fails to be compact) against $[0,1]$ (both closed and bounded — genuinely compact). State: "Heine-Borel needs BOTH conditions together — a bounded set missing even one boundary point, like $(0,1)$ missing $0$ and $1$, already fails to be compact."

- **MC-2 hook**: ask "if a subset of ℝⁿ is bounded, is that enough on its own to guarantee it's compact?" — a "yes" answer reveals MC-2 (missing that closedness is an independently required condition, not automatically implied by boundedness).

### Teaching Action A03 — The Limit Must Land Back Inside K (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: the SAME sequence $1/n$ converges to $0$ in both cases, but this only counts as sequential-compactness evidence when $0$ is actually IN the set being tested (true for $[0,1]$, false for $(0,1)$). State: "ordinary convergence, per `math.real.convergence-sequences`, is genuinely happening either way — but sequential compactness of $K$ specifically needs the limit to land back INSIDE $K$, not just somewhere in the ambient real numbers."

- **MC-3 hook**: ask "does a sequence inside K having a convergent subsequence (converging to any real number) prove K is sequentially compact?" — a "yes" answer reveals MC-3 (missing that the limit point must itself belong to K).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Show that the open cover $\{(-n,n) : n=1,2,3,\ldots\}$ of $\mathbb{R}$ has no finite subcover, and explain what this proves about $\mathbb{R}$'s compactness.
  2. Using Heine-Borel, determine whether $[2,\infty)$ is compact, justifying your answer via both the closed and bounded conditions.
  3. Using Heine-Borel, determine whether $(0,5]$ is compact, identifying specifically which condition (closed or bounded) fails, if any.
  4. Give a sequence inside $(0,5]$ that converges to a point NOT in $(0,5]$, and explain why this shows $(0,5]$ is not sequentially compact.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs to guarantee that an optimization algorithm searching over a parameter set $K\subseteq\mathbb{R}^n$ will always find a genuine best solution (not just get arbitrarily close without ever reaching it). (a) Using Heine-Borel, explain what two conditions the engineer should verify about $K$ to have confidence the search set is compact. (b) Suppose $K$ is defined by a strict inequality, like $K=\{x : \|x\|<10\}$ (an open ball) — explain, using this lesson's $(0,1)$ example as a direct analogy, why this specific $K$ fails to be compact, and what could go wrong for the optimization search as a result. (c) Explain how changing the definition to $K=\{x:\|x\|\le10\}$ (a closed ball) resolves the issue, connecting this directly to the closed-vs-bounded distinction from Heine-Borel."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SOME-COVER-REDUCIBLE-ASSUMED-SUFFICIENT-FOR-COMPACTNESS | Believing finding some open cover that reduces to a finite subcover proves compactness, missing that EVERY open cover must have this property, not just one convenient example | Foundational |
| MC-2 | BOUNDED-ALONE-ASSUMED-SUFFICIENT-FOR-COMPACTNESS | Believing boundedness alone guarantees compactness in ℝⁿ, missing that closedness is an independently required condition per Heine-Borel | Foundational |
| MC-3 | SEQUENCE-CONVERGENCE-TO-ANY-LIMIT-ASSUMED-SUFFICIENT-FOR-SEQUENTIAL-COMPACTNESS | Believing a sequence inside K having a convergent subsequence (to any real number) proves K is sequentially compact, missing that the limit point must itself belong to K | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Some Cover Reducible Assumed Sufficient for Compactness") → P41 (detect: ask a student whether finding one reducible cover proves a set compact, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's $(0,1)$ cover with no finite subcover, re-anchoring on "compactness is a universal claim over ALL covers — one failing cover is a complete disproof, regardless of how other covers behave").
- **B02 (targets MC-2)**: P27 (name it: "Bounded Alone Assumed Sufficient for Compactness") → P41 (detect: ask a student whether a bounded subset of ℝⁿ is automatically compact, and check for a "yes") → P64 (conceptual shift: re-walk Example 2's $(0,1)$-vs-$[0,1]$ contrast, re-anchoring on "Heine-Borel needs BOTH closed and bounded — a bounded set missing even one boundary point already fails").
- **B03 (targets MC-3)**: P27 (name it: "Sequence Convergence to Any Limit Assumed Sufficient for Sequential Compactness") → P41 (detect: ask a student whether a convergent subsequence inside K, converging to any real number, proves sequential compactness, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's $1/n\to0$ case, showing it fails for $(0,1)$ (limit outside the set) but succeeds for $[0,1]$ (limit inside), re-anchoring on "the limit must land back INSIDE K itself, not merely exist somewhere in the ambient space").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.open-sets` (open balls, interior points, the closed-set definition via complements/limit points this concept's Heine-Borel characterization directly reuses).
- **Unlocks**: `math.real.extreme-value-theorem` (a continuous function on a compact set always attains a maximum and minimum — this concept's compactness is exactly the hypothesis that theorem requires).
- **Cross-link**: KG lists `math.top.compactness` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe into the general topological-space definition of compactness (open-cover based, without reference to a metric) once that entry exists — this metric-space treatment is exactly the motivating special case for that later abstraction, paralleling `math.real.open-sets`' own noted relationship to `math.top.open-sets`.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/understand tag places this at a "3 TAs + gate" tier — A01 (the universal-cover definition), A02 (Heine-Borel's two required conditions), and A03 (sequential compactness's limit-must-land-inside-K subtlety) each target a distinct LO, appropriate for a concept whose core difficulty is entirely in correctly parsing three closely related but subtly different characterizations of one property.
- All three worked examples deliberately use the SAME underlying pair of sets, $(0,1)$ and $[0,1]$, viewed through three different lenses (open cover, Heine-Borel, sequential compactness) — demonstrating the THREE characterizations are genuinely equivalent by showing the identical failure (for $(0,1)$) and identical success (for $[0,1]$) recur across all three, rather than introducing a fresh example per lens, which could obscure the equivalence.
- Example 1's specific cover $\{(1/n,1)\}$ is the standard textbook illustration for "no finite subcover" (appearing in essentially every real analysis course covering this topic), chosen over an invented cover for the same reason this corpus favors canonical field examples for genuinely delicate points (`math.fnal.spectral-theory`, `math.calc.curl-divergence`).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.top.compactness unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific set tested against a specific cover before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Lipschitz Continuity (`math.real.lipschitz-continuity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.lipschitz-continuity` |
| name | Lipschitz Continuity |
| domain | Real Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.real.uniform-continuity` |
| unlocks | none |
| cross_links | `math.de.existence-uniqueness` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has the full uniform-continuity apparatus; the task is a strictly stronger, computationally checkable condition sitting one level above it |
| description (KG) | $\lvert f(x)-f(y)\rvert\le L\lvert x-y\rvert$ for some constant $L$ (Lipschitz constant). Lipschitz $\Rightarrow$ uniformly continuous $\Rightarrow$ continuous. Important in ODE existence-uniqueness (Picard-Lindelöf) and optimization. |

## Component 1 — Learning Objectives

- LO1: State the Lipschitz condition precisely — $\exists L\ge0$ such that $|f(x)-f(y)|\le L|x-y|$ for ALL $x,y$ in the domain — and correctly compute (or bound) the smallest valid Lipschitz constant $L$ for a specific differentiable function, connecting $L$ directly to a bound on $|f'|$.
- LO2 (cross-link objective): Prove Lipschitz $\Rightarrow$ uniformly continuous DIRECTLY from `math.real.uniform-continuity`'s own ε–δ definition — given $\varepsilon>0$, exhibit an EXPLICIT $\delta=\delta(\varepsilon)$ (namely $\delta=\varepsilon/L$) that works for the WHOLE domain simultaneously, making the implication completely constructive rather than an abstract existence claim.
- LO3: Exhibit a function that is uniformly continuous but NOT Lipschitz — using $f(x)=\sqrt x$ on $[0,1]$ as the standard example — showing its slope becomes UNBOUNDED near $x=0$ (ruling out any finite $L$) while still satisfying `math.real.uniform-continuity`'s own weaker ε–δ requirement, confirming the strict separation between the two properties.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.uniform-continuity` (the ε–δ definition with $\delta$ depending only on $\varepsilon$; the Heine-Cantor theorem).

## Component 3 — Core Explanation

**The Lipschitz condition is a single, computable inequality controlling how fast $f$ can change**: $|f(x)-f(y)|\le L|x-y|$ says the function's OUTPUT difference is bounded by a CONSTANT multiple of the INPUT difference, for every pair of points — $f$ can never "stretch" distances by more than a factor of $L$. For a differentiable function, this connects directly to the derivative: if $|f'(t)|\le L$ everywhere on an interval, the Mean Value Theorem gives $|f(x)-f(y)|=|f'(c)||x-y|\le L|x-y|$ for some $c$ between $x,y$ — so a BOUND on the derivative's magnitude directly supplies a valid Lipschitz constant, making $L$ concretely computable for many familiar functions rather than an abstract existence claim.

**Lipschitz $\Rightarrow$ uniformly continuous, proven CONSTRUCTIVELY**: `math.real.uniform-continuity`'s own definition requires, for every $\varepsilon>0$, a $\delta(\varepsilon)$ (independent of the specific points) such that $|x-y|<\delta\Rightarrow|f(x)-f(y)|<\varepsilon$. Given the Lipschitz bound $|f(x)-f(y)|\le L|x-y|$, choosing $\delta=\varepsilon/L$ (assuming $L>0$; the $L=0$ case is trivial, since $f$ is then constant) gives: $|x-y|<\delta=\varepsilon/L\Rightarrow|f(x)-f(y)|\le L|x-y|<L\cdot\frac\varepsilon L=\varepsilon$ — EXACTLY the uniform-continuity requirement, satisfied with an EXPLICIT formula for $\delta$ in terms of $\varepsilon$ and $L$, rather than merely an abstract "some $\delta$ exists" argument.

**Lipschitz is STRICTLY stronger than uniform continuity — $\sqrt x$ on $[0,1]$ separates the two**: `math.real.uniform-continuity`'s own machinery (specifically the Heine-Cantor theorem) already guarantees $f(x)=\sqrt x$ is uniformly continuous on the COMPACT interval $[0,1]$ (continuous on a compact set). But $f(x)=\sqrt x$ is NOT Lipschitz on $[0,1]$: its derivative $f'(x)=\frac1{2\sqrt x}$ grows WITHOUT BOUND as $x\to0^+$ — no single finite constant $L$ can bound the ratio $\frac{|f(x)-f(y)|}{|x-y|}$ near the origin, ruling out the Lipschitz condition entirely, even though the function remains perfectly uniformly continuous. This confirms the implication chain runs in only ONE direction: Lipschitz $\Rightarrow$ uniformly continuous $\Rightarrow$ continuous, with each arrow strict (not reversible).

## Component 4 — Worked Examples

**Example 1 (LO1 — computing a Lipschitz constant via a derivative bound, breaking MC-1)**: for $f(x)=\sin x$ on $\mathbb{R}$: $f'(x)=\cos x$, and $|\cos x|\le1$ for ALL $x$ — so by the Mean Value Theorem argument, $L=1$ is a valid Lipschitz constant: $|\sin x-\sin y|\le1\cdot|x-y|$ for every $x,y\in\mathbb{R}$. Verifying directly at a specific pair: $x=\pi/2,y=0$: $|\sin(\pi/2)-\sin(0)|=|1-0|=1$, and $|x-y|=\pi/2\approx1.57$ — confirming $1\le1\cdot1.57$ ✓, consistent with (though not tight at) the bound $L=1$.

**Example 2 (LO2 — the explicit $\delta=\varepsilon/L$ construction, breaking MC-2)**: continuing Example 1's $f(x)=\sin x$ with $L=1$: for a target $\varepsilon=0.01$, the construction gives $\delta=\varepsilon/L=0.01/1=0.01$ EXPLICITLY — no abstract existence argument needed. Verifying: for ANY $x,y$ with $|x-y|<0.01$, $|\sin x-\sin y|\le1\cdot|x-y|<1\cdot0.01=0.01=\varepsilon$ ✓, confirmed to work SIMULTANEOUSLY for every pair of points in the domain, exactly matching `math.real.uniform-continuity`'s own requirement, with the specific $\delta$ value derived directly from $L$ rather than asserted to exist.

**Example 3 (LO3 — $\sqrt x$'s unbounded derivative ruling out any Lipschitz constant, breaking MC-3)**: for $f(x)=\sqrt x$ on $[0,1]$: testing candidate points $x_n=1/n^2$ and $y_n=0$ for large $n$: $|f(x_n)-f(y_n)|=\left|\frac1n-0\right|=\frac1n$, while $|x_n-y_n|=\frac1{n^2}$. The RATIO $\frac{|f(x_n)-f(y_n)|}{|x_n-y_n|}=\frac{1/n}{1/n^2}=n$ — GROWING WITHOUT BOUND as $n\to\infty$, so NO finite $L$ can satisfy $|f(x_n)-f(y_n)|\le L|x_n-y_n|$ for all sufficiently large $n$ — rigorously ruling out the Lipschitz condition. Yet `math.real.uniform-continuity`'s own Heine-Cantor theorem still guarantees $\sqrt x$ IS uniformly continuous on the compact $[0,1]$ — concretely confirming the strict separation LO3 requires.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Lipschitz Constant Is Directly Computable From a Derivative Bound (Primitive P11: Representation Shift)

State: "the Lipschitz condition isn't an abstract existence claim — for a differentiable function, bounding $|f'|$ by some constant $L$ directly hands you a valid Lipschitz constant via the Mean Value Theorem, making $L$ concretely computable." Walk Example 1's derivative-bound computation for $\sin x$.

- **MC-1 hook**: ask "is finding a Lipschitz constant typically an abstract existence argument, or can it usually be computed directly from a bound on the function's derivative?" — an "abstract existence argument" answer reveals MC-1 (missing the direct, computable derivative-bound connection).

### Teaching Action A02 — Lipschitz $\Rightarrow$ Uniformly Continuous Is Fully Constructive — $\delta=\varepsilon/L$ (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the specific value $\delta=0.01$ computed EXPLICITLY from $\varepsilon=0.01$ and $L=1$, then verified to satisfy `math.real.uniform-continuity`'s own requirement precisely. State: "this implication isn't proven by an abstract compactness or existence argument — the Lipschitz bound HANDS you a formula for $\delta$ directly, $\delta=\varepsilon/L$, making the whole proof completely constructive."

- **MC-2 hook**: ask "does proving Lipschitz implies uniform continuity require an abstract, non-constructive argument, or can an explicit formula for $\delta$ be given directly in terms of $\varepsilon$ and the Lipschitz constant $L$?" — an "abstract, non-constructive" answer reveals MC-2 (missing the direct $\delta=\varepsilon/L$ construction).

### Teaching Action A03 — Uniformly Continuous Does Not Imply Lipschitz — $\sqrt x$ Proves It (Primitive P06: Contrast Pair)

Contrast the tempting assumption "uniform continuity and Lipschitz continuity are essentially the same strength" against Example 3's rigorous demonstration that $\sqrt x$'s difference-quotient ratio grows without bound near $0$, while `math.real.uniform-continuity`'s own Heine-Cantor theorem still guarantees uniform continuity on $[0,1]$. State: "Lipschitz continuity is a GENUINELY stronger condition — $\sqrt x$ is uniformly continuous (guaranteed by compactness) but its slope blows up near the origin, ruling out any finite Lipschitz constant."

- **MC-3 hook**: ask "does every uniformly continuous function on a compact domain automatically satisfy a Lipschitz condition?" — a "yes" answer reveals MC-3 (missing the strict separation $\sqrt x$ on $[0,1]$ demonstrates).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find a valid Lipschitz constant for $f(x)=\cos x$ on $\mathbb{R}$, using a derivative bound.
  2. For your answer to problem 1, compute the explicit $\delta$ (in terms of $\varepsilon$) the Lipschitz-implies-uniformly-continuous construction provides.
  3. Show directly (using a difference-quotient argument like Example 3's) that $f(x)=x^{1/3}$ is NOT Lipschitz on $[0,1]$.
  4. Explain, in your own words, why "Lipschitz $\Rightarrow$ uniformly continuous $\Rightarrow$ continuous" is a chain of strictly one-directional implications, not equivalences.
- **P76 (Transfer Probe, mode = independence — `math.de.existence-uniqueness` not yet authored, pending future revision)**: "A numerical-methods engineer is implementing an iterative algorithm that requires bounding how much a function's output can change relative to its input change, in order to guarantee the algorithm's error doesn't grow uncontrollably across iterations. (a) Explain why the engineer specifically needs a LIPSCHITZ bound (not merely uniform continuity) to get a concrete, USABLE numerical guarantee for each iteration step. (b) If the engineer's function has a derivative bounded by 5 everywhere on the domain of interest, explain how to obtain a usable Lipschitz constant directly, without any further analysis. (c) If the engineer's function instead behaves like $\sqrt x$ near a boundary point, explain what practical problem this would create for the algorithm's error-bound guarantee, even though the function remains uniformly continuous there."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LIPSCHITZ-CONSTANT-ASSUMED-ABSTRACT | Believing finding a Lipschitz constant is typically an abstract existence argument, missing that a derivative bound directly and computably supplies one | Foundational |
| MC-2 | LIPSCHITZ-TO-UNIFORM-CONTINUITY-ASSUMED-NON-CONSTRUCTIVE | Believing the Lipschitz-implies-uniformly-continuous proof requires a non-constructive argument, missing the explicit $\delta=\varepsilon/L$ formula | High |
| MC-3 | UNIFORM-CONTINUITY-ASSUMED-EQUIVALENT-TO-LIPSCHITZ | Believing uniform continuity and Lipschitz continuity are essentially equivalent strengths, missing the strict separation $\sqrt x$ on $[0,1]$ demonstrates | High |

- **B01 (targets MC-1)**: P27 (name it: "Lipschitz Constant Assumed Abstract") → P41 (detect: ask whether finding $L$ is typically abstract or directly computable from a derivative bound) → P64 (conceptual shift: re-walk Example 1's direct derivative-bound computation).
- **B02 (targets MC-2)**: P27 (name it: "Lipschitz to Uniform Continuity Assumed Non-Constructive") → P41 (detect: ask whether the implication's proof is constructive) → P64 (conceptual shift: re-walk Example 2's explicit $\delta=\varepsilon/L$ computation).
- **B03 (targets MC-3)**: P27 (name it: "Uniform Continuity Assumed Equivalent to Lipschitz") → P41 (detect: ask whether every uniformly continuous function on a compact domain is Lipschitz) → P64 (conceptual shift: re-walk Example 3's unbounded-difference-quotient demonstration for $\sqrt x$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.uniform-continuity` (the ε–δ definition and Heine-Cantor theorem this concept's implication and separating counterexample both directly build on).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.de.existence-uniqueness`, checked via `ls docs/curriculum/blueprints/` — confirmed NOT YET authored. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's Lipschitz condition directly to the Picard-Lindelöf existence-and-uniqueness theorem for ODEs, which relies on it as a core hypothesis.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 grounding the Lipschitz constant in a direct, computable derivative-bound connection, LO2 given full constructive-proof depth, and LO3 establishing the strict separation from uniform continuity via a fully worked counterexample.
- **Division of labor**: `math.real.uniform-continuity` already owns the ε–δ uniform-continuity definition and the Heine-Cantor theorem (verified by grep — no Lipschitz-specific content found there, and its own KG "related" field names this concept as the natural next step). This concept owns the Lipschitz condition itself, the CONSTRUCTIVE proof of Lipschitz $\Rightarrow$ uniformly continuous, and the strict-separation counterexample — all genuinely new material.
- Following the established corpus convention (e.g. `math.nt.fundamental-theorem-arithmetic`'s own deferred cross-link to `math.abst.ufd`), this concept's cross-link to `math.de.existence-uniqueness` is deliberately deferred to independence mode since that concept does not yet exist on disk, rather than fabricating a premature or ungrounded cross-link probe.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has uniform continuity; task is a strictly stronger, computable condition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

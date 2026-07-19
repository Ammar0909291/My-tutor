# Teaching Blueprint: Cauchy Sequence (`math.real.cauchy-sequence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.cauchy-sequence` |
| name | Cauchy Sequence |
| domain | Real Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.real.convergence-sequences` |
| unlocks | none |
| cross_links | `math.fnal.completeness` (unauthored — see Component 7) |
| CPA_entry_stage | A (Abstract) — the concept is a re-expression of an already-abstract idea (convergence) with no fresh concrete anchor beyond the ε-N template already mastered |
| description (KG) | A sequence where terms become arbitrarily close: ∀ε>0, ∃N: m,n>N ⟹ \|aₘ−aₙ\|<ε. In ℝ: Cauchy ⟺ convergent (completeness). Foundation for defining completeness in metric spaces. |

## Component 1 — Learning Objectives

- LO1: State the Cauchy criterion precisely: a sequence $(a_n)$ is **Cauchy** iff $\forall\varepsilon>0,\ \exists N:\ m,n>N \Rightarrow |a_m-a_n|<\varepsilon$ — a condition on the sequence's terms **relative to each other**, with no reference to any limit value $L$.
- LO2: Explain why this is the crucial distinction from ordinary convergence ($a_n\to L$): the Cauchy definition lets you certify that a sequence converges **without ever knowing or naming $L$** — directly refuting the misconception that you must find the limit first.
- LO3: State and apply the Cauchy Criterion for $\mathbb{R}$ (Cauchy $\Leftrightarrow$ convergent, by completeness of $\mathbb{R}$), and recognize that this equivalence is a genuinely special fact about $\mathbb{R}$ (and $\mathbb{R}^n$), not a universal property of every metric space — the reason this concept forward-links to completeness.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.convergence-sequences` (the rigorous $\varepsilon$-$N$ definition of $a_n\to L$, and the "convergent $\Rightarrow$ bounded" property) — the Cauchy definition is built from the identical logical template, substituting "terms close to each other" for "terms close to $L$."

## Component 3 — Core Explanation

**The Cauchy definition**: a sequence $(a_n)$ is Cauchy if, for every $\varepsilon>0$, there exists $N$ such that whenever both $m,n>N$, $|a_m-a_n|<\varepsilon$. In words: eventually, **every pair** of terms (not just consecutive ones) gets and stays arbitrarily close together.

**Why this matters — certifying convergence without the limit**: the ordinary definition $a_n\to L$ requires you to already have a candidate $L$ in hand to test against. But in many real problems (e.g. a sequence defined recursively, or arising from an iterative numerical method) you cannot easily write down $L$ in closed form — you can only observe how the terms behave relative to **each other**. The Cauchy condition captures exactly the internal "settling down" behavior a convergent sequence must have, using only the sequence's own terms.

**The Cauchy Criterion for $\mathbb{R}$**: in the real numbers (and more generally $\mathbb{R}^n$), a sequence is Cauchy **if and only if** it converges. The forward direction (convergent $\Rightarrow$ Cauchy) is straightforward: if $a_n\to L$, then for large $m,n$, both $a_m$ and $a_n$ are within $\varepsilon/2$ of $L$, so within $\varepsilon$ of each other (triangle inequality). The reverse direction (Cauchy $\Rightarrow$ convergent) is the deep half — it relies on the **completeness** of $\mathbb{R}$ (every bounded sequence has a convergent subsequence, via Bolzano–Weierstrass, and a Cauchy sequence is provably bounded and can be shown to converge to that subsequential limit). This reverse direction is genuinely special to complete spaces: in an incomplete space (e.g. $\mathbb{Q}$, the rationals), a sequence can be Cauchy yet fail to converge **within that space** — e.g. rational approximations to $\sqrt 2$ are Cauchy in $\mathbb{Q}$ but their limit $\sqrt2\notin\mathbb{Q}$.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the Cauchy condition directly)**: Let $a_n = 1/n$. Given $\varepsilon>0$, choose $N>2/\varepsilon$. For $m,n>N$: $|a_m-a_n| = |1/m-1/n| \le 1/m+1/n < 1/N+1/N = 2/N < \varepsilon$. So $(a_n)$ is Cauchy — verified using only the terms' relationship to each other, with **no mention of the limit $0$** anywhere in the argument.

**Example 2 (LO2 — certifying convergence without knowing $L$, breaking MC-1)**: Define $a_n$ recursively by $a_1=1$, $a_{n+1} = \frac{1}{2}\left(a_n + \frac{2}{a_n}\right)$ (Newton's method approximating $\sqrt2$). Without solving for the exact limit in closed form up front, one can show directly from the recursion that $|a_{n+1}-a_n|$ shrinks geometrically (roughly halving relative to the previous gap once $n$ is large), which is enough to establish the Cauchy condition and hence, by the Cauchy Criterion, that $(a_n)$ **does** converge — before ever identifying $L=\sqrt2$. This is exactly the practical power the definition exists for.

**Example 3 (LO3 — a Cauchy-in-$\mathbb{Q}$ sequence that fails to converge in $\mathbb{Q}$, targeting MC-2)**: The sequence of decimal truncations $a_1=1.4,\ a_2=1.41,\ a_3=1.414,\ a_4=1.4142,\dots$ (successive decimal approximations to $\sqrt2$) is Cauchy: consecutive terms (and indeed all sufficiently late pairs) differ by at most $10^{-n}$, so the Cauchy condition holds with $N$ chosen from $10^{-N}<\varepsilon$. Every $a_n\in\mathbb{Q}$, so this is a Cauchy sequence **of rational numbers**. Yet its limit is $\sqrt2$, which is irrational — so the sequence **does not converge within $\mathbb{Q}$**, even though it is Cauchy there. This proves the Cauchy $\Leftrightarrow$ convergent equivalence genuinely depends on completeness: it holds in $\mathbb{R}$ precisely because $\mathbb{R}$ is complete and $\mathbb{Q}$ is not.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Cauchy Definition and Its Purpose (Primitive P06: Contrast Pair)

State the two definitions side by side: "$a_n\to L$: terms get close to a **known target** $L$. Cauchy: terms get close **to each other**, no target needed." Work Example 1, explicitly narrating that the proof never once refers to the value $0$ — only to $a_m$ and $a_n$'s relationship.

- **MC-1 hook**: ask "to prove a sequence is Cauchy, do you first need to know what it converges to?" — a "yes" answer reveals MC-1 (believing the limit must be identified before the Cauchy condition can be checked, missing the entire point of the definition).

### Teaching Action A02 — Certifying Convergence Without the Limit (Primitive P28: Conflict Evidence)

Present Example 2 (the recursive Newton's-method sequence) as a case where finding $L$ in closed form is hard, but the Cauchy condition is checkable directly from the recursion. State: "the Cauchy Criterion for $\mathbb{R}$ says: Cauchy $\Rightarrow$ convergent. So once we show Cauchy, we get convergence for free — the existence of a limit — without yet knowing what that limit numerically is." This directly resolves the MC-1 hook from A01 with worked evidence.

### Teaching Action A03 — Completeness Is the Hidden Ingredient (Primitive P06: Contrast Pair)

**Contrast** Example 3's $\mathbb{Q}$-truncation sequence (Cauchy in $\mathbb{Q}$, not convergent in $\mathbb{Q}$) against Example 1's $1/n$ (Cauchy in $\mathbb{R}$, convergent in $\mathbb{R}$). State: "Cauchy $\Leftrightarrow$ convergent is NOT a free fact about sequences in general — it depends on the space having no 'holes.' $\mathbb{R}$ has none (completeness); $\mathbb{Q}$ has a hole exactly where $\sqrt2$ should be."

- **MC-2 hook**: ask "is every Cauchy sequence convergent, in any set of numbers you pick it from?" — a blanket "yes" reveals MC-2 (treating Cauchy $\Rightarrow$ convergent as a universal fact rather than one that specifically requires completeness).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Using the $\varepsilon$-$N$ definition, prove directly that $a_n = \frac{n}{n+1}$ is Cauchy (without invoking its limit).
  2. True or false, with justification: "if I can show a sequence is Cauchy, I have thereby also shown it converges, and I still may not know the limit's value." 
  3. Explain, referencing Example 3, why "Cauchy $\Rightarrow$ convergent" is a statement that depends on which set the sequence's terms and limit are drawn from, rather than being universally true.
  4. A sequence $(b_n)$ of rational numbers is Cauchy but its limit is $\pi$. Is $(b_n)$ convergent as a sequence of real numbers? Is it convergent as a sequence within $\mathbb{Q}$? Justify both answers.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.fnal.completeness` is not yet authored; a future revision may add a genuine cross-link probe into the general metric-space completeness definition once that entry exists)**: "A numerical algorithm generates successive approximations $x_1,x_2,x_3,\dots$ to a solution, and you can prove $|x_{n+1}-x_n|\le c\cdot r^n$ for some constant $c$ and some $0<r<1$ (a shrinking-gap bound, similar in spirit to Example 2). Explain how this bound lets you conclude the sequence is Cauchy, and therefore — by the Cauchy Criterion for $\mathbb{R}$ — that it converges, even before you can name the exact solution it converges to."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LIMIT-REQUIRED-BEFORE-CAUCHY-CHECK | Believing the sequence's limit must be known or found first, before the Cauchy condition can be checked, missing that Cauchy is defined purely in terms of the sequence's own terms | Foundational |
| MC-2 | CAUCHY-CONVERGENT-EQUIVALENCE-TREATED-AS-UNIVERSAL | Treating "Cauchy $\Rightarrow$ convergent" as a fact true in any set of numbers, rather than a special consequence of completeness (true in $\mathbb{R}$, false in $\mathbb{Q}$) | Foundational |
| MC-3 | CAUCHY-CONFUSED-WITH-CONSECUTIVE-TERMS-SHRINKING | Believing it suffices to check that consecutive terms $|a_{n+1}-a_n|$ shrink to $0$, rather than requiring ALL sufficiently late pairs $|a_m-a_n|$ to be small | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Limit-Required-First Assumption") → P41 (detect: ask a student to check whether $a_n=1/n$ is Cauchy and observe whether they first try to state the limit) → P64 (conceptual shift: re-walk Example 1's proof line by line, pointing out that $0$ never appears — only $a_m$ and $a_n$).
- **B02 (targets MC-2)**: P27 (name it: "Universal Cauchy-Convergent Equivalence Assumption") → P41 (detect: ask "is every Cauchy sequence of rational numbers convergent — as a sequence of rational numbers?") → P64 (conceptual shift: re-present Example 3's $\sqrt2$-truncation sequence as a direct counterexample, then restate the Cauchy Criterion precisely as a fact about $\mathbb{R}$'s completeness, not sequences in general).
- **B03 (targets MC-3)**: P27 (name it: "Consecutive-Terms-Only Cauchy Check") → P41 (detect: give a sequence where consecutive gaps shrink to 0 but the sequence is not Cauchy, e.g. partial sums of the harmonic series $H_n=\sum_{k=1}^n 1/k$, where $H_{n+1}-H_n=1/(n+1)\to0$ yet $H_n\to\infty$, and ask if this sequence is Cauchy) → P64 (conceptual shift: re-anchor on "Cauchy requires ALL pairs $m,n>N$ to be close, not just neighboring terms — the harmonic sum's consecutive gaps shrink, but terms far apart, like $H_{2n}-H_n\ge 1/2$, never do").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.convergence-sequences` (the $\varepsilon$-$N$ template this definition directly reuses, substituting inter-term distance for distance-to-limit).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists `math.fnal.completeness` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.fnal.completeness.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into the general completeness-of-metric-spaces framing once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag places this at a "3 TAs + gate" tier appropriate for a single, tightly focused definitional concept with one major subtlety (completeness-dependence) rather than a broad multi-technique topic — A01 (definition/purpose), A02 (certifying convergence without $L$), and A03 (completeness as the hidden ingredient) each target one of the three LOs directly.
- CPA_entry_stage = Abstract is a deliberate departure from the corpus's usual Concrete/Pictorial-first default: this concept is a structural variant of an already-abstracted idea (`math.real.convergence-sequences`'s $\varepsilon$-$N$ definition), and introducing a fresh concrete/pictorial anchor here would risk implying the concept is more novel than it is, when its entire pedagogical value is the direct definitional contrast with what's already mastered.
- Example 3 (rational Cauchy sequence converging to an irrational limit) was deliberately chosen over a more abstract completeness discussion because it is fully concrete and computable (decimal truncations of $\sqrt2$), giving students a hands-on counterexample rather than an appeal to authority about what completeness means.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.fnal.completeness not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: structural variant of an already-abstract idea) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

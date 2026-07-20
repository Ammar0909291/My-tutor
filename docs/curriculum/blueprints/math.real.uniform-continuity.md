# Teaching Blueprint: Uniform Continuity (`math.real.uniform-continuity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.uniform-continuity` |
| name | Uniform Continuity |
| domain | Real Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.real.continuity-rigorous` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already has the pointwise ε–δ definition; the task is the genuinely stronger uniform version and the compactness result that guarantees it for free |
| description (KG) | $f$ is uniformly continuous on $E$ iff $\forall\varepsilon>0,\exists\delta>0:|x-y|<\delta\Rightarrow|f(x)-f(y)|<\varepsilon$ ($\delta$ depends only on $\varepsilon$, not on $x$). Every continuous function on a compact set is uniformly continuous (Heine-Cantor theorem). |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize the precise SYNTAX difference from `math.real.continuity-rigorous`'s own pointwise definition: ordinary continuity requires, for each FIXED $x$, a $\delta(x,\varepsilon)$ that may depend on BOTH $x$ and $\varepsilon$; uniform continuity requires a SINGLE $\delta(\varepsilon)$ (depending on $\varepsilon$ ALONE) that works SIMULTANEOUSLY for every $x$ in $E$ — and correctly identify, by inspecting the quantifier ORDER, which definition is stronger.
- LO2: Exhibit a function that is continuous EVERYWHERE on its domain but NOT uniformly continuous there — using $f(x)=1/x$ on $(0,1)$ as the standard example — by showing directly that no single $\delta$ can work for all $x$ simultaneously, as $x$ approaches the domain's open (missing) endpoint.
- LO3: State and apply the Heine-Cantor theorem (every continuous function on a COMPACT set is automatically uniformly continuous) — correctly explaining why this theorem does NOT contradict LO2's counterexample (since $(0,1)$ is not compact — it's not closed, missing its limit point $0$), and correctly determine, for a given domain and continuous function, whether uniform continuity is automatically guaranteed.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.continuity-rigorous` (the pointwise ε–δ definition: $f$ continuous at $a$ iff $\forall\varepsilon>0,\exists\delta>0:|x-a|<\delta\Rightarrow|f(x)-f(a)|<\varepsilon$).

## Component 3 — Core Explanation

**The quantifier order is the entire difference**: `math.real.continuity-rigorous`'s pointwise definition, applied at EVERY point $a\in E$, reads (informally) "$\forall a,\forall\varepsilon,\exists\delta$" — the $\delta$ found may depend on BOTH which point $a$ is being checked AND the chosen $\varepsilon$. Uniform continuity's definition instead reads "$\forall\varepsilon,\exists\delta,\forall x,y$" — critically, the SAME $\delta$ (depending on $\varepsilon$ alone) must work for EVERY pair of points $x,y\in E$ simultaneously, not chosen freshly for each point. Swapping the order of "$\forall x$" and "$\exists\delta$" changes the claim's strength dramatically: uniform continuity is STRICTLY STRONGER than (ordinary) continuity at every point — a uniformly continuous function is automatically continuous everywhere (take $y=a$ fixed in the uniform definition), but the converse can fail.

**Why $1/x$ on $(0,1)$ fails uniform continuity despite being continuous everywhere**: `math.real.continuity-rigorous`'s pointwise definition is satisfied at EVERY individual point of $(0,1)$ — $f(x)=1/x$ is continuous there. But as $x$ gets closer to the missing endpoint $0$, $f$'s LOCAL steepness (its derivative $-1/x^2$) grows without bound — meaning the $\delta$ needed to keep $|f(x)-f(y)|<\varepsilon$ must shrink toward $0$ as $x\to0^+$, with NO single $\delta$ working uniformly across the whole interval. This is a genuinely different failure than any single-point continuity failure — every individual point is perfectly fine, but the "worst case" $\delta$ requirement across ALL points degenerates as $x$ approaches the domain's edge.

**Heine-Cantor: compactness upgrades continuity to uniform continuity for free — and explains why $(0,1)$ fails**: the Heine-Cantor theorem states that ANY function continuous on a COMPACT set is AUTOMATICALLY uniformly continuous there — no additional work needed. This does not contradict the $1/x$ counterexample: $(0,1)$ is NOT compact (it is bounded but not CLOSED — it is missing its limit point $0$, so it fails the closed-and-bounded compactness characterization in $\mathbb{R}$). On a genuinely compact domain like $[a,b]$ with $a>0$ (a closed, bounded interval strictly avoiding the problematic point $0$), $f(x)=1/x$ IS automatically uniformly continuous — confirming the theorem's guarantee applies exactly where its hypothesis (compactness) genuinely holds, and fails to apply exactly where it doesn't.

## Component 4 — Worked Examples

**Example 1 (LO1 — the quantifier-order distinction stated precisely, breaking MC-1)**: comparing the two definitions symbol by symbol for $f$ on $E$: ordinary continuity at $a$: "$\forall\varepsilon>0,\exists\delta(a,\varepsilon)>0:|x-a|<\delta\Rightarrow|f(x)-f(a)|<\varepsilon$" — $\delta$ may depend on $a$. Uniform continuity on $E$: "$\forall\varepsilon>0,\exists\delta(\varepsilon)>0:\forall x,y\in E,|x-y|<\delta\Rightarrow|f(x)-f(y)|<\varepsilon$" — $\delta$ depends ONLY on $\varepsilon$, chosen BEFORE any particular $x,y$ are considered. The quantifier "$\forall x,y$" appears AFTER "$\exists\delta$" in the uniform version, but the pointwise version's "$\forall a$" (over all points where continuity is checked) effectively sits BEFORE the $\exists\delta$ for each individual check — confirming uniform continuity is the strictly stronger, harder-to-satisfy claim.

**Example 2 (LO2 — $1/x$ failing uniform continuity on $(0,1)$, breaking MC-2)**: for $f(x)=1/x$ on $(0,1)$, fix $\varepsilon=1$ and attempt to find a single $\delta$ working for ALL $x,y\in(0,1)$: choosing $x_n=1/n$ and $y_n=1/(n+1)$ for large $n$: $|x_n-y_n|=\left|\frac1n-\frac1{n+1}\right|=\frac1{n(n+1)}\to0$ as $n\to\infty$ (so these pairs get arbitrarily CLOSE together), yet $|f(x_n)-f(y_n)|=|n-(n+1)|=1=\varepsilon$ EXACTLY, for EVERY $n$ — meaning no matter how small a candidate $\delta$ is chosen, some sufficiently large $n$ gives $|x_n-y_n|<\delta$ while $|f(x_n)-f(y_n)|=1\not<1=\varepsilon$ fails the requirement — directly demonstrating NO single $\delta$ can work, confirming LO2's counterexample rigorously rather than just informally.

**Example 3 (LO3 — Heine-Cantor applying on a genuinely compact sub-domain, breaking MC-3)**: for the SAME function $f(x)=1/x$, restricted instead to $[0.1,1]$ (a CLOSED, bounded — hence compact — interval, strictly avoiding $0$): Heine-Cantor's theorem GUARANTEES $f$ is uniformly continuous here, with no further verification needed. Confirming this doesn't contradict Example 2: the earlier counterexample specifically exploited points $x_n\to0$, which are simply NOT available in $[0.1,1]$ — the domain's compactness (closed and bounded, containing all its own limit points) is EXACTLY what rules out the earlier failure mode, concretely illustrating why the theorem's hypothesis and Example 2's counterexample are perfectly consistent rather than in tension.

## Component 5 — Teaching Actions

### Teaching Action A01 — Quantifier Order Distinguishes Uniform From Pointwise Continuity (Primitive P11: Representation Shift)

State: "`math.real.continuity-rigorous`'s $\delta$ is allowed to depend on WHICH point you're checking — uniform continuity demands a single $\delta$ that works everywhere at once, chosen before you even know which points you'll compare." Walk Example 1's symbol-by-symbol quantifier comparison.

- **MC-1 hook**: ask "is uniform continuity's definition just a restatement of ordinary pointwise continuity, or does swapping the quantifier order make it a genuinely stronger claim?" — a "just a restatement" answer reveals MC-1 (missing that the quantifier order makes uniform continuity strictly stronger).

### Teaching Action A02 — $1/x$ on $(0,1)$ Is Continuous Everywhere Yet Fails Uniform Continuity (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the sequences $x_n=1/n,y_n=1/(n+1)$ get arbitrarily close together, yet $f(x_n)-f(y_n)$ stays FIXED at exactly $1$ for every $n$ — a rigorous demonstration that no single $\delta$ can ever work. State: "$1/x$ is perfectly continuous at every individual point of $(0,1)$ — the failure isn't a pointwise problem, it's that the REQUIRED $\delta$ shrinks toward zero as you approach the missing endpoint, with no uniform bound possible."

- **MC-2 hook**: ask "if a function is continuous at every single point of its domain, must it also be uniformly continuous on that domain?" — a "yes" answer reveals MC-2 (missing that uniform continuity is a genuinely stronger, separately-checkable property).

### Teaching Action A03 — Compactness Guarantees Uniform Continuity for Free, Consistently With the $1/x$ Failure (Primitive P06: Contrast Pair)

Contrast Example 2's failure on the NON-compact $(0,1)$ against Example 3's automatic success (via Heine-Cantor) on the COMPACT $[0.1,1]$, using the SAME function $f(x)=1/x$ in both cases. State: "Heine-Cantor doesn't contradict the $1/x$ counterexample — it explains it precisely: the theorem's guarantee only kicks in on compact domains, and $(0,1)$'s missing endpoint is exactly what breaks compactness there."

- **MC-3 hook**: ask "does the Heine-Cantor theorem's guarantee of automatic uniform continuity on compact sets conflict with $1/x$'s failure to be uniformly continuous on $(0,1)$?" — a "yes, they conflict" answer reveals MC-3 (missing that $(0,1)$ is not compact, so the theorem's hypothesis simply doesn't apply there).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the pointwise and uniform continuity definitions side by side, explicitly identifying which quantifier's position differs.
  2. Prove $f(x)=x^2$ IS uniformly continuous on $[0,10]$, citing the Heine-Cantor theorem and verifying its hypothesis holds.
  3. Show directly (using a sequence-pair argument like Example 2's) that $f(x)=1/x^2$ is NOT uniformly continuous on $(0,1)$.
  4. Explain why $f(x)=x^2$ on ALL of $\mathbb{R}$ (an unbounded, non-compact domain) requires a separate argument to determine uniform continuity, rather than automatic application of Heine-Cantor.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A numerical-analysis researcher is designing an algorithm that approximates a function $f$ by sampling it at finitely many points, with an error guarantee that depends on choosing sample points close enough together (governed by some $\delta$) to keep the function's VALUES close together (within some $\varepsilon$) between samples. (a) Explain why the researcher's algorithm needs $f$ to be UNIFORMLY continuous on the domain being sampled, rather than merely continuous at each individual point, for a SINGLE sampling density (one $\delta$) to work reliably across the ENTIRE domain. (b) If the domain is a closed, bounded interval $[a,b]$, explain why the researcher can rely on the Heine-Cantor theorem to guarantee this property automatically, without separately verifying it. (c) If the domain is instead an OPEN interval like $(0,1)$ and $f$ behaves like $1/x$ near the missing endpoint, explain what practical problem the researcher's sampling algorithm would run into, connecting directly to this lesson's counterexample."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | UNIFORM-CONTINUITY-ASSUMED-EQUIVALENT-TO-POINTWISE | Believing uniform continuity is just a restatement of ordinary pointwise continuity, missing that the quantifier order makes it a genuinely stronger claim | Foundational |
| MC-2 | POINTWISE-CONTINUITY-ASSUMED-TO-IMPLY-UNIFORM | Believing continuity at every individual point automatically implies uniform continuity on the domain, missing genuine counterexamples like $1/x$ on $(0,1)$ | High |
| MC-3 | HEINE-CANTOR-ASSUMED-TO-CONFLICT-WITH-COUNTEREXAMPLES | Believing the Heine-Cantor theorem's guarantee conflicts with non-compact counterexamples like $1/x$ on $(0,1)$, missing that the theorem's hypothesis (compactness) simply doesn't hold there | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Uniform Continuity Assumed Equivalent to Pointwise") → P41 (detect: ask whether uniform continuity is just a restatement of pointwise continuity) → P64 (conceptual shift: re-walk Example 1's symbol-by-symbol quantifier comparison).
- **B02 (targets MC-2)**: P27 (name it: "Pointwise Continuity Assumed to Imply Uniform") → P41 (detect: ask whether pointwise continuity implies uniform continuity) → P64 (conceptual shift: re-walk Example 2's rigorous sequence-pair counterexample).
- **B03 (targets MC-3)**: P27 (name it: "Heine-Cantor Assumed to Conflict with Counterexamples") → P41 (detect: ask whether Heine-Cantor conflicts with the $1/x$ counterexample) → P64 (conceptual shift: re-walk Example 3's compact-subdomain resolution).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.continuity-rigorous` (the pointwise ε–δ definition this concept's uniform version directly contrasts against via quantifier order).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 establishing the precise quantifier-order distinction, LO2 given full rigorous-counterexample depth, and LO3 resolving the apparent tension between the counterexample and the Heine-Cantor theorem.
- **Division of labor**: `math.real.continuity-rigorous` already owns the pointwise ε–δ definition and previews uniform continuity only as a NAME (a forward pointer to "where the ε–δ pattern reappears," verified by grep — no formal uniform-continuity definition, counterexample, or Heine-Cantor content found there). This concept owns the full formal definition, the rigorous $1/x$ counterexample, and the Heine-Cantor theorem — all genuinely new material.
- Example 2 and Example 3's deliberate reuse of the SAME function ($f(x)=1/x$, first on the non-compact $(0,1)$, then on the compact $[0.1,1]$) rather than switching to unrelated functions was chosen specifically to make LO3's "no contradiction" resolution concrete and visually direct — the same function behaving differently on two domains, precisely because of the domains' differing compactness, rather than an abstract assurance the two facts don't conflict.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has the pointwise definition; task is the stronger uniform version and the compactness upgrade) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

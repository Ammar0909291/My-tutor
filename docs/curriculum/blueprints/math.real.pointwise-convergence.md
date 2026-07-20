# Teaching Blueprint: Pointwise Convergence (`math.real.pointwise-convergence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.pointwise-convergence` |
| name | Pointwise Convergence |
| domain | Real Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.real.convergence-sequences` |
| unlocks | `math.real.uniform-convergence` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already has the rigorous ε–N definition for sequences of NUMBERS; the task is extending it to sequences of FUNCTIONS, not re-deriving quantifier logic from scratch |
| description (KG) | $f_n\to f$ pointwise on $E$ iff $\forall x\in E,\forall\varepsilon>0,\exists N(x,\varepsilon): n>N\Rightarrow \lvert f_n(x)-f(x)\rvert<\varepsilon$. Weaker than uniform convergence; the limit of continuous functions need not be continuous. Dini's theorem: monotone pointwise limit on compact set is uniform. |

## Component 1 — Learning Objectives

- LO1: State the formal definition $f_n\to f$ pointwise on $E$ iff $\forall x\in E,\forall\varepsilon>0,\exists N(x,\varepsilon):n>N\Rightarrow|f_n(x)-f(x)|<\varepsilon$, recognizing it as EXACTLY `math.real.convergence-sequences`'s own ε–N definition applied SEPARATELY at each fixed $x\in E$ — a sequence of functions converges pointwise precisely when, for every individually fixed $x$, the resulting NUMBER sequence $(f_n(x))$ converges in the already-known sense.
- LO2: Recognize the CRUCIAL new feature not present in `math.real.convergence-sequences`'s single-sequence setting: $N$ may depend on BOTH $\varepsilon$ AND $x$ — different points $x$ can require completely different (and unboundedly larger) $N$ for the same $\varepsilon$, and correctly compute $N(x,\varepsilon)$ for a specific pointwise-convergent example to make this $x$-dependence concrete.
- LO3: State and apply the concrete consequence that pointwise convergence does NOT preserve continuity — a sequence of CONTINUOUS functions can converge pointwise to a DISCONTINUOUS limit — using a specific verified counterexample, and state (without proof) Dini's theorem as the one special condition (monotone convergence on a compact set) under which pointwise convergence upgrades automatically to uniform convergence.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.convergence-sequences` (the rigorous ε–N definition of $a_n\to L$ for sequences of numbers, and comfort constructing $N$ as a function of $\varepsilon$).

## Component 3 — Core Explanation

**Pointwise convergence is `math.real.convergence-sequences`'s definition, applied one point at a time**: given a sequence of functions $f_n:E\to\mathbb{R}$, FIX a single point $x\in E$. This produces an ordinary sequence of NUMBERS $f_1(x),f_2(x),f_3(x),\ldots$ — exactly the kind of object `math.real.convergence-sequences` already defines convergence for. Pointwise convergence $f_n\to f$ on $E$ simply means: for EVERY choice of $x\in E$, this resulting number sequence $(f_n(x))$ converges to $f(x)$ in `math.real.convergence-sequences`'s own ε–N sense. No new convergence machinery is invented — the definition is applied repeatedly, once per point.

**$N$ depending on $x$ is the genuinely new feature**: in `math.real.convergence-sequences`, $N$ depends only on $\varepsilon$ — there is only one sequence. Here, since a DIFFERENT number sequence $(f_n(x))$ arises at each $x$, the $N$ that works for a given $\varepsilon$ can legitimately be DIFFERENT at different points — written explicitly as $N(x,\varepsilon)$ to make this dependence visible. Some points may need only a small $N$; others (often points approaching a boundary or a place where the limit function changes character) may need arbitrarily larger $N$ for the SAME $\varepsilon$ — and pointwise convergence, by its definition, permits this entirely; it makes no requirement that a single $N$ work uniformly across all of $E$ simultaneously.

**Pointwise convergence does not preserve continuity, because the same $\varepsilon$ can demand different $N$ at nearby points**: each individual $f_n$ can be perfectly continuous, yet the pointwise limit $f$ can fail to be continuous. This is possible precisely because continuity of $f_n$ says nothing about how the various $N(x,\varepsilon)$ behave as $x$ varies — if $N(x,\varepsilon)$ grows without bound as $x$ approaches some point, the "just barely converged" behavior near that point can produce a genuine jump in the limit, even though every individual $f_n$ has no jump anywhere. Dini's theorem identifies one special sufficient condition (monotone convergence, PLUS a compact domain, PLUS a continuous limit) under which this failure provably cannot happen and pointwise convergence is automatically upgraded to uniform convergence — stated here without proof, as orientation toward `math.real.uniform-convergence`.

## Component 4 — Worked Examples

**Example 1 (LO1 — pointwise convergence as the ε–N definition applied per point, breaking MC-1)**: for $f_n(x)=x^n$ on $E=[0,1]$, fix $x=1/2$: the number sequence $f_n(1/2)=(1/2)^n\to0$ by `math.real.convergence-sequences`'s own definition (standard geometric-sequence limit). Fix $x=1$: $f_n(1)=1^n=1\to1$ trivially. Checking every $x\in[0,1)$ this way gives $f_n(x)\to0$, while $x=1$ gives $f_n(1)\to1$ — so the pointwise limit is $f(x)=0$ for $x<1$ and $f(1)=1$, computed by applying `math.real.convergence-sequences`'s definition SEPARATELY at each fixed $x$, exactly as LO1 states.

**Example 2 (LO2 — computing $N(x,\varepsilon)$ explicitly to show its $x$-dependence, breaking MC-2)**: continuing Example 1 with $\varepsilon=0.01$: at $x=1/2$, need $|(1/2)^n-0|<0.01$, i.e. $(1/2)^n<0.01$, i.e. $n>\log(0.01)/\log(0.5)\approx6.64$, so $N(1/2,0.01)=7$ suffices. At $x=0.9$, need $(0.9)^n<0.01$, i.e. $n>\log(0.01)/\log(0.9)\approx43.7$, so $N(0.9,0.01)=44$ — a MUCH larger $N$ for the SAME $\varepsilon$. As $x\to1^-$, $N(x,0.01)\to\infty$ — no single $N$ works for all $x<1$ simultaneously at this $\varepsilon$, concretely demonstrating the $x$-dependence LO2 requires recognizing.

**Example 3 (LO3 — continuous functions converging pointwise to a discontinuous limit, breaking MC-3)**: Example 1's $f_n(x)=x^n$ are each perfectly continuous on $[0,1]$ (polynomials), yet the pointwise limit $f(x)=0$ for $x<1$, $f(1)=1$ has a JUMP discontinuity at $x=1$ — directly confirming LO3's claim that pointwise convergence does not preserve continuity. Contrast: this same sequence does NOT satisfy Dini's theorem's hypotheses in a way that would force uniform convergence to a continuous limit, since the limit itself is discontinuous — consistent with Dini's theorem only guaranteeing uniformity when the limit function is ALSO continuous, one of its required hypotheses.

## Component 5 — Teaching Actions

### Teaching Action A01 — Pointwise Convergence Is the ε–N Definition, Applied Per Point (Primitive P11: Representation Shift)

State: "checking pointwise convergence is not a new skill — fix any single $x$, and you get an ordinary NUMBER sequence, so you check `math.real.convergence-sequences`'s own ε–N definition exactly as before; pointwise convergence just means doing this check successfully at every $x$." Walk Example 1's point-by-point computation.

- **MC-1 hook**: ask "does checking pointwise convergence require a genuinely new definition, separate from `math.real.convergence-sequences`'s ε–N definition for number sequences?" — a "yes" answer reveals MC-1 (missing that pointwise convergence is the same ε–N definition applied at each fixed point).

### Teaching Action A02 — $N$ Can Depend on $x$, Not Just $\varepsilon$ (Primitive P28: Conflict Evidence)

Present Example 2's explicit computation: $N(1/2,0.01)=7$ versus $N(0.9,0.01)=44$ for the SAME $\varepsilon$ — direct numeric evidence that a single $N$ cannot serve every point. State: "in `math.real.convergence-sequences`, $N$ only ever depended on $\varepsilon$, because there was only one sequence. Here there's a different sequence at every $x$, so $N$ genuinely depends on $x$ too — and as this example shows, that dependence can blow up as $x$ approaches certain points."

- **MC-2 hook**: ask "for a fixed $\varepsilon$, must the same $N$ work at every point $x\in E$ for pointwise convergence?" — a "yes" answer reveals MC-2 (missing that pointwise convergence permits $N$ to vary, potentially without bound, across $E$).

### Teaching Action A03 — Continuity Is NOT Automatically Preserved by Pointwise Limits (Primitive P06: Contrast Pair)

Contrast the (false) expectation that "a limit of continuous functions is continuous" against Example 3's concrete counterexample ($x^n\to$ a genuinely discontinuous step-like function on $[0,1]$). State: "every single $f_n=x^n$ is continuous — no exceptions — yet the pointwise LIMIT has a jump at $x=1$; pointwise convergence is simply too weak a notion to transfer continuity from the $f_n$'s to $f$, which is exactly why the stronger notion of uniform convergence exists."

- **MC-3 hook**: ask "if every $f_n$ in a sequence is continuous, must its pointwise limit $f$ also be continuous?" — a "yes" answer reveals MC-3 (assuming pointwise convergence preserves continuity, missing Example 3's direct counterexample).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f_n(x)=x/n$ on $E=\mathbb{R}$, find the pointwise limit $f(x)$, showing the per-point ε–N check for a general fixed $x$.
  2. For $\varepsilon=0.01$ and the sequence in problem 1, compute $N(x,\varepsilon)$ explicitly as a function of $x$ (or explain why a single formula suffices here, contrasting with Example 2).
  3. Give an example (can reuse or adapt $f_n(x)=x^n$) of a sequence of continuous functions whose pointwise limit is discontinuous, and identify exactly where the discontinuity occurs.
  4. State Dini's theorem and identify which of its three hypotheses (monotone convergence, compact domain, continuous limit) FAILS for the sequence in problem 3, explaining why this means Dini's theorem does not apply there.
- **P76 (Transfer Probe, mode = independence — no authored cross-link target exists yet for this concept)**: "A signal-processing engineer approximates a target waveform $f$ using a sequence of smooth approximating functions $f_n$ that converge to $f$ pointwise (but the engineer has not verified uniform convergence). (a) Explain, using this lesson's $N(x,\varepsilon)$ framework, why the engineer cannot assume a single fixed number of approximation terms $n$ will achieve a desired accuracy $\varepsilon$ SIMULTANEOUSLY across the entire signal's domain. (b) Even if each $f_n$ is smooth (hence continuous), explain why the engineer cannot conclude the target waveform $f$ itself is continuous, citing this lesson's continuity-failure example. (c) Under what additional condition (name it, citing Dini's theorem) could the engineer be confident the convergence is actually uniform, avoiding part (a)'s problem entirely?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POINTWISE-CONVERGENCE-ASSUMED-NEW-DEFINITION | Believing pointwise convergence requires a genuinely new definition, missing that it is `math.real.convergence-sequences`'s own ε–N definition applied separately at each fixed point | Foundational |
| MC-2 | N-ASSUMED-INDEPENDENT-OF-X | Believing a single $N$ (depending only on $\varepsilon$) must work at every point $x\in E$ simultaneously, missing that pointwise convergence permits $N(x,\varepsilon)$ to vary unboundedly across $E$ | High |
| MC-3 | CONTINUITY-ASSUMED-PRESERVED-BY-POINTWISE-LIMIT | Believing a pointwise limit of continuous functions must itself be continuous | High |

- **B01 (targets MC-1)**: P27 (name it: "Pointwise Convergence Assumed New Definition") → P41 (detect: ask whether pointwise convergence needs a genuinely new definition) → P64 (conceptual shift: re-walk Example 1's per-point application of `math.real.convergence-sequences`'s own ε–N definition).
- **B02 (targets MC-2)**: P27 (name it: "N Assumed Independent of X") → P41 (detect: ask whether one $N$ must work at every point for the same $\varepsilon$) → P64 (conceptual shift: re-walk Example 2's explicit $N(1/2,0.01)=7$ vs $N(0.9,0.01)=44$ contrast).
- **B03 (targets MC-3)**: P27 (name it: "Continuity Assumed Preserved by Pointwise Limit") → P41 (detect: ask whether a pointwise limit of continuous functions must be continuous) → P64 (conceptual shift: re-walk Example 3's $x^n$ counterexample, re-anchoring on the concrete jump discontinuity at $x=1$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.convergence-sequences` (the rigorous ε–N definition for sequences of numbers, applied here point-by-point to sequences of functions).
- **Unlocks**: `math.real.uniform-convergence` (the strictly stronger notion — a single $N$ working uniformly across all of $E$ — motivated directly by this concept's demonstrated failure of continuity preservation).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the per-point definition application and the explicit $N(x,\varepsilon)$ computation) and LO3 grounded in a fully verified concrete counterexample rather than an abstract claim.
- **Division of labor**: `math.real.convergence-sequences` already owns the rigorous ε–N machinery for number sequences (verified by grep — its content is entirely about single sequences of real numbers, with no function-sequence material); this concept owns the EXTENSION to function sequences, the $x$-dependence of $N$, and the continuity-failure phenomenon that motivates `math.real.uniform-convergence`. Deliberately reuses the SAME $x^n$ example across all three worked examples (rather than three unrelated examples) so the point-by-point convergence, the explicit $N(x,\varepsilon)$ blowup, and the continuity failure are all visibly the SAME underlying phenomenon viewed from three angles.
- No cross-link target was available for this concept (KG lists none), so the P76 transfer probe uses independence mode; this is a deliberate placement of `math.real.pointwise-convergence` itself EARLIER in this batch specifically so that `math.de.fourier-convergence` (authored immediately after this concept in the same batch) CAN use it as a genuine cross-link probe target — the same same-batch cross-link-enabling pattern used previously (e.g. math.linalg.tensor → math.cat.tensor-product).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.real.uniform-convergence`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has the ε–N definition; the task is extending it, not re-deriving quantifier logic) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

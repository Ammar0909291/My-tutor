# Teaching Blueprint: Convergence of Fourier Series (`math.de.fourier-convergence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.fourier-convergence` |
| name | Convergence of Fourier Series |
| domain | Differential Equations |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.de.fourier-series`, `math.seq.series-convergence` |
| unlocks | none |
| cross_links | `math.real.pointwise-convergence` (authored earlier in this same batch — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already builds Fourier series and computes coefficients; the task is analyzing WHERE and HOW WELL the resulting series actually converges, not re-deriving the construction |
| description (KG) | Dirichlet's theorem: if $f$ is piecewise smooth, the Fourier series converges to $f(x)$ at continuity points and to $[f(x^+)+f(x^-)]/2$ at jumps. Near jump discontinuities, overshoot is ~9% (Gibbs phenomenon). |

## Component 1 — Learning Objectives

- LO1: Recognize that a Fourier series, as an infinite SERIES, converges (or fails to) in exactly the sense `math.seq.series-convergence` already defines — via the convergence of its sequence of PARTIAL SUMS — and that asking "does this Fourier series converge?" is not a new kind of question, but `math.seq.series-convergence`'s own convergence question applied to this specific series.
- LO2: State Dirichlet's theorem precisely: for piecewise smooth $f$, the Fourier series converges to $f(x)$ at every point of CONTINUITY, and to the AVERAGE $[f(x^+)+f(x^-)]/2$ at every jump discontinuity — and correctly compute this average value at a specific jump, recognizing this as the cross-link objective connecting to `math.real.pointwise-convergence`'s own per-point convergence framework: Dirichlet's theorem is precisely a statement about the POINTWISE limit of the partial-sum sequence, evaluated separately at each $x$.
- LO3: Describe the Gibbs phenomenon — near a jump discontinuity, the partial sums do NOT approach the jump smoothly but persistently OVERSHOOT by approximately 9% of the jump's size, no matter how many terms are included — and correctly identify that this overshoot does not violate Dirichlet's theorem's pointwise convergence claim, since the overshoot's LOCATION shifts closer to the jump (rather than shrinking in height) as more terms are added, consistent with convergence holding at each FIXED point even though uniform convergence fails near the jump.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.fourier-series` (constructing $f(x)=a_0/2+\sum(a_n\cos(n\pi x/L)+b_n\sin(n\pi x/L))$ and computing coefficients via orthogonality integrals) and `math.seq.series-convergence` (a series converges iff its sequence of partial sums converges).

## Component 3 — Core Explanation

**Fourier series convergence is `math.seq.series-convergence`'s own question, applied to this specific series**: `math.de.fourier-series` constructs the infinite series $a_0/2+\sum_{n=1}^\infty(a_n\cos(n\pi x/L)+b_n\sin(n\pi x/L))$ but does not, by itself, guarantee this series actually converges to $f(x)$ — or converges at all. `math.seq.series-convergence` already establishes that convergence of ANY series means convergence of its sequence of PARTIAL SUMS $S_N(x)=a_0/2+\sum_{n=1}^N(a_n\cos(n\pi x/L)+b_n\sin(n\pi x/L))$. Asking whether the Fourier series converges is therefore exactly asking whether this specific sequence $(S_N(x))$ converges, in precisely the sense already known — no new definition of convergence is introduced.

**Dirichlet's theorem answers WHERE this partial-sum sequence converges and to WHAT value, pointwise**: since $S_N(x)$ is a sequence indexed by $N$ evaluated at each fixed $x$ — exactly `math.real.pointwise-convergence`'s framework, one number sequence per fixed point — Dirichlet's theorem is a POINTWISE convergence statement. It says: for piecewise smooth $f$, at every $x$ where $f$ is CONTINUOUS, $S_N(x)\to f(x)$; at every $x$ where $f$ has a JUMP discontinuity, $S_N(x)\to[f(x^+)+f(x^-)]/2$ — the average of the left- and right-hand limits, NOT $f(x)$ itself (which may not even be defined consistently at a jump, or may be defined as one side's value or something else entirely, depending on convention). This averaging behavior at jumps is a genuinely new, concrete instance of `math.real.pointwise-convergence`'s abstract "the pointwise limit need not equal what you might naively expect" theme.

**The Gibbs phenomenon is a genuine partial-sum overshoot that does not contradict pointwise convergence**: near a jump discontinuity, plotting $S_N(x)$ for increasing $N$ shows the partial sums persistently OVERSHOOT the jump by about 9% of the jump's total size — and this overshoot's HEIGHT does not shrink as $N\to\infty$. This can seem to contradict Dirichlet's theorem, but does not: at any FIXED $x$ near (but not exactly at) the jump, $S_N(x)$ does eventually converge to $f(x)$ as $N\to\infty$ — but the LOCATION of the ~9% overshoot peak keeps shifting closer to the jump point as $N$ grows, rather than the overshoot's height shrinking uniformly. This is precisely `math.real.pointwise-convergence`'s own phenomenon of $N(x,\varepsilon)$ depending on $x$ and blowing up as $x$ approaches a problematic point — here, the jump — playing out concretely for Fourier partial sums.

## Component 4 — Worked Examples

**Example 1 (LO1 — Fourier series convergence as a partial-sum question, breaking MC-1)**: for the square wave $f(x)=1$ on $(0,\pi)$, $f(x)=-1$ on $(-\pi,0)$ (period $2\pi$), `math.de.fourier-series`'s orthogonality integrals give $f(x)\sim\frac{4}{\pi}\sum_{n\text{ odd}}\frac{\sin(nx)}{n}$. Asking "does this converge at $x=\pi/2$?" means, per `math.seq.series-convergence`'s own definition, asking whether the partial sums $S_N(\pi/2)=\frac{4}{\pi}\sum_{n\text{ odd},\,n\le N}\frac{\sin(n\pi/2)}{n}$ converge as $N\to\infty$ — exactly the partial-sum-sequence question already known, with no new convergence concept required to even POSE it.

**Example 2 (LO2 — Dirichlet's theorem and the jump average, breaking MC-2)**: for Example 1's square wave, $x=0$ is a jump discontinuity: $f(0^+)=1$ (approaching from the right) and $f(0^-)=-1$ (approaching from the left). Dirichlet's theorem predicts $S_N(0)\to[f(0^+)+f(0^-)]/2=[1+(-1)]/2=0$. Checking directly: every term $\sin(n\cdot0)=0$, so $S_N(0)=0$ for EVERY $N$ — the partial sums are identically 0 at $x=0$, confirming Dirichlet's predicted average value of 0 EXACTLY, even though $f(0)$ itself is not consistently defined by the original piecewise description (0 is neither $1$ nor $-1$).

**Example 3 (LO3 — the Gibbs phenomenon's persistent overshoot near the jump, breaking MC-3)**: continuing Example 1's square wave near $x=0^+$: numerically, $S_9(x)$ (9 terms) peaks at approximately $1.09\times$ the jump height near $x\approx\pi/9$ — an overshoot of about 9%, as predicted. Increasing to $S_{99}(x)$ (99 terms), the peak overshoot remains approximately 9% in HEIGHT, but its location has shifted much closer to $x=0$ (near $x\approx\pi/99$). At any FIXED point like $x=\pi/4$ (away from the jump), both $S_9(\pi/4)$ and $S_{99}(\pi/4)$ are already close to $f(\pi/4)=1$, confirming pointwise convergence holds there — the persistent 9% overshoot is a LOCAL phenomenon that migrates toward the jump rather than a global failure of Dirichlet's theorem's pointwise claim.

## Component 5 — Teaching Actions

### Teaching Action A01 — Fourier Convergence Is `math.seq.series-convergence`'s Own Partial-Sum Question (Primitive P11: Representation Shift)

State: "asking whether a Fourier series converges is not a new question — it's exactly `math.seq.series-convergence`'s partial-sum-sequence question, applied to this specific series of sines and cosines." Walk Example 1's direct translation into a partial-sum sequence.

- **MC-1 hook**: ask "does determining Fourier series convergence require a genuinely new convergence concept, beyond `math.seq.series-convergence`'s partial-sum definition?" — a "yes" answer reveals MC-1 (missing that Fourier convergence is the already-known partial-sum convergence question, applied here).

### Teaching Action A02 — At Jumps, the Series Converges to the AVERAGE, Not $f(x)$ Itself (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $S_N(0)=0$ for every $N$ (an exact, verified computation), matching Dirichlet's predicted average $[f(0^+)+f(0^-)]/2=0$ — NOT either one-sided value $\pm1$. State: "at a jump, don't expect the Fourier series to converge to `math.real.pointwise-convergence`'s pointwise limit matching either side's value — Dirichlet's theorem specifically predicts the AVERAGE of the left and right limits, verified exactly in Example 2."

- **MC-2 hook**: ask "at a jump discontinuity, does the Fourier series converge to $f(x)$ as originally defined, or to one of the one-sided limits?" — a "yes, to $f(x)$ or to one side" answer reveals MC-2 (missing Dirichlet's theorem's specific average-value prediction at jumps).

### Teaching Action A03 — The Gibbs Overshoot Migrates Toward the Jump, It Doesn't Shrink Away (Primitive P06: Contrast Pair)

Contrast the naive expectation that "more terms should make the overshoot near a jump shrink toward zero" against Example 3's evidence that the ~9% overshoot HEIGHT persists from $S_9$ to $S_{99}$, while its LOCATION migrates closer to the jump. State: "the Gibbs phenomenon doesn't go away with more terms — it moves closer to the jump, which is exactly why pointwise convergence (true at every FIXED point) and this persistent LOCAL overshoot are not in conflict, echoing `math.real.pointwise-convergence`'s own $N(x,\varepsilon)$-blows-up-near-a-point phenomenon."

- **MC-3 hook**: ask "does adding more terms to a Fourier partial sum eventually shrink the Gibbs overshoot's height near a jump toward zero?" — a "yes" answer reveals MC-3 (missing that the overshoot height persists at ~9%, with only its location migrating, and that this is compatible with pointwise convergence at each fixed point).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain, citing `math.seq.series-convergence`'s own definition, exactly what it means for a Fourier series to converge at a specific point $x$.
  2. For a sawtooth wave with $f(0^+)=2$ and $f(0^-)=-2$ at a jump at $x=0$, use Dirichlet's theorem to predict the Fourier series' value at $x=0$.
  3. Explain why the Gibbs phenomenon's persistent ~9% overshoot does not contradict Dirichlet's theorem's pointwise convergence claim at points near (but not at) the jump.
  4. State the two conditions Dirichlet's theorem requires of $f$, and identify what the series converges to at (a) a continuity point and (b) a jump point.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.real.pointwise-convergence`)**: "An audio engineer reconstructs a square-wave test signal using a truncated Fourier series with a fixed, moderate number of terms $N$. Near the signal's sharp transitions (jumps), the reconstructed waveform persistently overshoots the true signal level by roughly 9%, no matter how the engineer adjusts $N$ within a practical range. (a) Using this lesson's Dirichlet's theorem, explain what value the FULL (infinite) Fourier series converges to exactly AT a jump point, and why this differs from the signal's one-sided values. (b) Using `math.real.pointwise-convergence`'s own framework (specifically, how $N(x,\varepsilon)$ can depend on $x$ and blow up near a particular point), explain why the engineer cannot eliminate the overshoot by simply increasing $N$ a practical, bounded amount — connecting this directly to why the overshoot's LOCATION, not its height, is what changes as $N$ grows. (c) At a point safely away from any jump, explain why the engineer's truncated series IS a good approximation even for moderate $N$, citing genuine pointwise convergence there."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FOURIER-CONVERGENCE-ASSUMED-NEW-CONCEPT | Believing determining Fourier series convergence requires a genuinely new convergence concept, missing that it is `math.seq.series-convergence`'s own partial-sum convergence question applied to this series | Foundational |
| MC-2 | JUMP-VALUE-ASSUMED-TO-MATCH-ONE-SIDE | Believing the Fourier series converges at a jump to $f(x)$ as originally defined or to one of the one-sided limits, missing Dirichlet's theorem's specific prediction of the AVERAGE $[f(x^+)+f(x^-)]/2$ | High |
| MC-3 | GIBBS-OVERSHOOT-ASSUMED-TO-SHRINK-WITH-MORE-TERMS | Believing the Gibbs phenomenon's overshoot height shrinks toward zero as more terms are added, missing that the ~9% height persists while only its location migrates toward the jump | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Fourier Convergence Assumed New Concept") → P41 (detect: ask whether Fourier convergence requires a new convergence concept) → P64 (conceptual shift: re-walk Example 1's direct translation into `math.seq.series-convergence`'s own partial-sum question).
- **B02 (targets MC-2)**: P27 (name it: "Jump Value Assumed to Match One Side") → P41 (detect: ask what value the series converges to at a jump) → P64 (conceptual shift: re-walk Example 2's exact verification that $S_N(0)=0$ for every $N$, matching the average, not either side).
- **B03 (targets MC-3)**: P27 (name it: "Gibbs Overshoot Assumed to Shrink with More Terms") → P41 (detect: ask whether the overshoot height shrinks as $N$ grows) → P64 (conceptual shift: re-walk Example 3's $S_9$-vs-$S_{99}$ comparison, re-anchoring on migration of location, not shrinking height).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.fourier-series` (the series construction and coefficient computation, assumed already mastered) and `math.seq.series-convergence` (the partial-sum definition of series convergence, applied directly here).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.real.pointwise-convergence`, checked via `ls docs/curriculum/blueprints/` — confirmed authored EARLIER IN THIS SAME BATCH (same-batch cross-link-enabling pattern). $P76_{mode}=$ **cross-link probe**, engaging `math.real.pointwise-convergence`'s own $N(x,\varepsilon)$-dependence framework directly in Component 3's Gibbs-phenomenon explanation and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/analyze tag supports the "3 TAs + gate" tier, with LO1 grounding convergence in already-known machinery, LO2 given full computational depth via Dirichlet's theorem and a verified jump-average example, and LO3 addressing the Gibbs phenomenon's genuinely subtle location-vs-height distinction.
- **Division of labor**: `math.de.fourier-series` already owns the series CONSTRUCTION and coefficient computation via orthogonality integrals (verified by grep — no Dirichlet's theorem, jump behavior, or Gibbs phenomenon content found there); this concept owns WHERE and HOW WELL that constructed series actually converges. `math.real.pointwise-convergence`, authored immediately before this concept in the same batch specifically to enable this cross-link, supplies the general $N(x,\varepsilon)$-dependence framework that Example 3 and the Gibbs-phenomenon discussion instantiate concretely for Fourier partial sums.
- The square-wave example was reused across all three worked examples (rather than three different functions) so the partial-sum framing (Example 1), the jump-average verification (Example 2), and the Gibbs overshoot (Example 3) are all visibly the SAME concrete Fourier series examined from three angles, making the connections between LOs tangible rather than merely asserted.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.real.pointwise-convergence` confirmed authored earlier in this batch → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already builds Fourier series; the task is analyzing convergence, not re-deriving construction) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

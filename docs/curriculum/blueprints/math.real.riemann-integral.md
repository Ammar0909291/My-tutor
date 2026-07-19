# Teaching Blueprint: Riemann Integral (Rigorous) (`math.real.riemann-integral`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.riemann-integral` |
| name | Riemann Integral (Rigorous) |
| domain | Real Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.real.continuity-rigorous`, `math.calc.definite-integral` |
| unlocks | `math.real.riemann-integrability`, `math.real.ftc-rigorous` |
| cross_links | `math.meas.lebesgue-integral` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | P (Pictorial) — over/under-rectangles squeezing the true area before the formal sup/inf definition |
| description (KG) | Partition P of [a,b]; upper/lower Darboux sums U(f,P) and L(f,P). f is Riemann integrable iff inf U(f,P) = sup L(f,P). Riemann integrable functions are bounded; continuous functions are integrable. |

## Component 1 — Learning Objectives

- LO1: Define a **partition** $P$ of $[a,b]$, and the **upper and lower Darboux sums** $U(f,P)$ (using the SUPREMUM of $f$ on each subinterval) and $L(f,P)$ (using the INFIMUM), and compute both for a simple function and partition.
- LO2: State the rigorous definition of **Riemann integrability**: $f$ is Riemann integrable on $[a,b]$ iff $\inf_P U(f,P) = \sup_P L(f,P)$ (the infimum over ALL partitions of the upper sums equals the supremum over all partitions of the lower sums) — and correctly interpret WHY this "squeeze" condition captures the informal idea of "a well-defined area."
- LO3: State (without full proof) the two foundational facts — **Riemann integrable functions are bounded** (a necessary condition, not automatic for unbounded functions), and **continuous functions ARE Riemann integrable** — and correctly identify a function that FAILS to be Riemann integrable (e.g. due to being unbounded, or via a genuinely oscillating discontinuity pattern).

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.continuity-rigorous` (the ε-δ definition of continuity, needed for the "continuous implies integrable" fact) and `math.calc.definite-integral` (the informal Riemann-sum-limit definition of the definite integral, which this concept makes fully rigorous).

## Component 3 — Core Explanation

A **partition** $P$ of $[a,b]$ is a finite set of points $a=x_0<x_1<\cdots<x_n=b$, dividing $[a,b]$ into subintervals $[x_{i-1},x_i]$.

For a bounded function $f$ on $[a,b]$, the **upper Darboux sum** is:
$$U(f,P) = \sum_{i=1}^n M_i\,\Delta x_i, \qquad M_i = \sup_{x\in[x_{i-1},x_i]} f(x)$$
and the **lower Darboux sum**:
$$L(f,P) = \sum_{i=1}^n m_i\,\Delta x_i, \qquad m_i = \inf_{x\in[x_{i-1},x_i]} f(x)$$
$U(f,P)$ always OVER-estimates the true area (using the highest value on each piece); $L(f,P)$ always UNDER-estimates it (using the lowest value); and $L(f,P)\leq U(f,P)$ for any single partition.

**Rigorous Riemann integrability**: $f$ is **Riemann integrable** on $[a,b]$ iff
$$\inf_P U(f,P) = \sup_P L(f,P)$$
— taking the BEST possible (smallest) upper estimate over ALL partitions, and the BEST possible (largest) lower estimate over all partitions, these two "squeeze" values must coincide EXACTLY. This common value, when it exists, IS the definite integral $\int_a^b f(x)\,dx$ — this is precisely what makes the informal "limit of Riemann sums" idea from `math.calc.definite-integral` fully rigorous: the upper and lower bounds must genuinely converge to the same number, not merely "look close."

**Two foundational facts** (stated here, proof deferred as beyond this concept's introductory scope):
- **Riemann integrable functions are bounded** — this is a NECESSARY condition: an unbounded function on $[a,b]$ cannot be Riemann integrable in this sense (some subinterval would always have $M_i=\infty$, making $U(f,P)$ undefined/infinite for every partition).
- **Continuous functions ARE Riemann integrable** — every function continuous on $[a,b]$ automatically satisfies the $\inf U=\sup L$ condition (this uses the continuity's uniform-continuity consequence on a closed bounded interval, a fact from `math.real.continuity-rigorous`'s broader context).

## Component 4 — Worked Examples

**Example 1 (LO1 — computing Darboux sums for a simple partition)**: For $f(x)=x^2$ on $[0,2]$, partition $P=\{0,1,2\}$ (two subintervals, $[0,1]$ and $[1,2]$). On $[0,1]$: $\sup f=1$ (at $x=1$), $\inf f=0$ (at $x=0$), since $f$ is increasing. On $[1,2]$: $\sup f=4$ (at $x=2$), $\inf f=1$ (at $x=1$). $U(f,P) = 1(1)+4(1)=5$. $L(f,P) = 0(1)+1(1)=1$. (Refining the partition with more subintervals would bring both sums closer to the true value $\int_0^2 x^2\,dx=\frac83\approx2.67$.)

**Example 2 (LO2 — the squeeze condition, concretely narrowing)**: Continuing with $f(x)=x^2$ on $[0,2]$, refine to $P'=\{0,0.5,1,1.5,2\}$ (four subintervals). Computing (using $f$ increasing, so sup/inf are at right/left endpoints of each subinterval): $U(f,P')=0.25(0.5)+1(0.5)+2.25(0.5)+4(0.5)=3.75$; $L(f,P')=0(0.5)+0.25(0.5)+1(0.5)+2.25(0.5)=1.75$. Both bounds moved CLOSER to the true value $\frac83\approx2.67$ ($U$ dropped from 5 to 3.75; $L$ rose from 1 to 1.75) — illustrating the squeezing process that, taken to the limit over increasingly fine partitions, gives $\inf U=\sup L=\frac83$.

**Example 3 (LO3 — a non-integrable function, breaking MC-1)**: The **Dirichlet function**, $f(x)=1$ if $x$ is rational, $f(x)=0$ if $x$ is irrational, on $[0,1]$. For ANY partition $P$ (any subinterval, no matter how small, contains BOTH rational and irrational points, by density of both in $\mathbb{R}$): every subinterval has $\sup f=1$ (some rational point present) and $\inf f=0$ (some irrational point present). So $U(f,P)=1$ for EVERY partition (total length $\times1$), and $L(f,P)=0$ for EVERY partition. Thus $\inf_P U(f,P)=1$ but $\sup_P L(f,P)=0$ — these do NOT match ($1\neq0$), so the Dirichlet function is **NOT Riemann integrable**, despite being perfectly bounded (values only 0 or 1) — demonstrating that boundedness alone does not guarantee integrability; the squeeze condition can genuinely fail even for a simple, bounded function.

## Component 5 — Teaching Actions

### Teaching Action A01 — Darboux Sums and the Squeezing Process (Primitive P11: Representation Shift)

Start pictorial: draw a curve with over-rectangles (using each subinterval's maximum height) and under-rectangles (using each subinterval's minimum height), visually bracketing the true area between them. State: "$U(f,P)$ is the total over-rectangle area; $L(f,P)$ is the total under-rectangle area — the TRUE area is always squeezed between them." Work Example 1's direct computation for a coarse partition, then Example 2's refinement, showing both bounds visibly tightening toward the true value.

- **MC-1 hook**: present the Dirichlet function (Example 3) and ask "since this function is bounded (only takes values 0 and 1), must it be Riemann integrable?" — a "yes" answer reveals MC-1 (believing boundedness alone is SUFFICIENT for Riemann integrability, rather than recognizing it as merely a necessary — not sufficient — condition, with the squeeze condition itself needing separate verification).

### Teaching Action A02 — Boundedness Is Necessary But Not Sufficient (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 3's full computation — showing $U(f,P)=1$ and $L(f,P)=0$ for EVERY partition, no matter how fine, because every subinterval always contains both rational and irrational points. State precisely: "boundedness rules out one FAILURE mode (unbounded functions definitely aren't integrable), but it does NOT guarantee success — the Dirichlet function is perfectly bounded, yet the upper and lower sums never converge to the same value, no matter how the partition is refined."

**Contrast 2**: Place the Dirichlet function's persistent gap ($U-L=1$ regardless of partition fineness) directly beside Example 1/2's continuous $f(x)=x^2$, whose $U-L$ gap genuinely SHRINKS toward 0 as the partition refines. State: "for continuous functions, refining the partition eventually squeezes $U$ and $L$ together — this is exactly why continuity guarantees integrability. The Dirichlet function's discontinuity is so pervasive (discontinuous at literally EVERY point) that no amount of refinement ever closes the gap."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f(x)=x$ on $[0,4]$ with partition $P=\{0,2,4\}$, compute $U(f,P)$ and $L(f,P)$.
  2. Refine the partition from problem 1 to $P'=\{0,1,2,3,4\}$ and recompute $U(f,P')$ and $L(f,P')$, confirming both bounds moved closer to the true value $\int_0^4 x\,dx=8$.
  3. Explain why an unbounded function on $[a,b]$ (e.g. $f(x)=1/x$ near $x=0$ on $[0,1]$) cannot be Riemann integrable in the Darboux sense, connecting your answer to the definition of $U(f,P)$.
  4. Explain precisely why the Dirichlet function's boundedness does NOT save it from failing to be Riemann integrable, using the specific values of $U(f,P)$ and $L(f,P)$ for any partition.
- **P76 (Transfer Probe, mode = independence)**: "A physicist modeling a genuinely continuous temperature profile $T(x)$ along a metal rod wants to compute total heat content via $\int_0^L T(x)\,dx$, confident this integral exists because temperature varies continuously with position. Separately, an engineer proposes a (hypothetical, not physically realistic) 'signal' function that takes one exact value at every rational-numbered position and a different exact value at every irrational-numbered position, and wants to integrate IT over an interval too. (a) Explain, using this lesson's continuity-implies-integrability fact, why the physicist's confidence in the temperature integral's EXISTENCE is well-justified. (b) Explain, using this lesson's Dirichlet-function analysis, why the engineer's proposed signal function's integral would NOT exist in the Riemann sense, even though the function itself is perfectly bounded — connecting your answer to the specific density-of-rationals-and-irrationals argument from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BOUNDEDNESS-ASSUMED-SUFFICIENT-FOR-INTEGRABILITY | Believing a bounded function must automatically be Riemann integrable, rather than recognizing boundedness as necessary but not sufficient — the squeeze condition itself must be separately verified | Foundational |
| MC-2 | UPPER-LOWER-SUMS-CONFUSED-WITH-SUP-INF-OVER-ALL-PARTITIONS | Confusing $U(f,P)$/$L(f,P)$ (computed for one SPECIFIC partition) with $\inf_P U(f,P)$/$\sup_P L(f,P)$ (the best possible value across ALL partitions) — the definitions require the latter, a genuinely different (and generally harder-to-compute) quantity | Moderate |
| MC-3 | FINER-PARTITION-ASSUMED-TO-ALWAYS-CLOSE-THE-GAP | Believing refining a partition always eventually closes the $U-L$ gap for ANY function, not recognizing some functions (like the Dirichlet function) maintain a persistent gap regardless of refinement | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Boundedness-Sufficient Assumption") → P41 (detect: present the Dirichlet function, confirm it's bounded, and ask if it must be integrable) → P64 (conceptual shift: work through the explicit $U=1,L=0$ computation for every partition, showing the squeeze condition genuinely fails despite boundedness).
- **B02 (targets MC-2)**: P27 (name it: "Single-Partition Sums Confused with Sup/Inf Over All Partitions") → P41 (detect: ask a student whether computing $U(f,P)$ for one specific partition is enough to determine integrability) → P64 (conceptual shift: re-anchor on the definition explicitly requiring the INFIMUM over EVERY possible partition, not just one — a single partition's sums only give one data point in that broader search).
- **B03 (targets MC-3)**: P27 (name it: "Refinement Always Closes Gap Assumption") → P41 (detect: ask whether refining the Dirichlet function's partition ever narrows the $U-L=1$ gap) → P64 (conceptual shift: re-derive directly — every subinterval, no matter how small, still contains both rational and irrational points by density, so $U=1,L=0$ persists at every refinement level, no matter how fine).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.continuity-rigorous` (the ε-δ continuity definition underlying the continuous-implies-integrable fact), `math.calc.definite-integral` (the informal Riemann-sum-limit definition this concept makes fully rigorous via the Darboux upper/lower sum squeeze).
- **Unlocks**: `math.real.riemann-integrability` (a deeper characterization of exactly which functions are Riemann integrable, building on this concept's basic definition), `math.real.ftc-rigorous` (the rigorous Fundamental Theorem of Calculus, requiring this concept's precise integral definition).
- **Cross-link**: KG lists `math.meas.lebesgue-integral` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.meas.lebesgue-integral.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's Dirichlet-function non-example directly to that concept's demonstration that the Lebesgue integral SUCCEEDS on exactly this function (since the rationals have Lebesgue measure zero) — one of the most celebrated illustrations of the Lebesgue integral's genuine generalization beyond Riemann integration.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag places this at the "2 main TAs + gate" tier — A01 (Darboux sums and the squeezing process) and A02 (boundedness as necessary-not-sufficient, contrasted against genuine continuity-driven convergence) jointly cover all three LOs.
- MC-1 (boundedness assumed sufficient) was made this blueprint's central focus because the Dirichlet function is precisely the standard, canonical counterexample used throughout real analysis pedagogy to demonstrate exactly this gap — a bounded, "simple-looking" function that nonetheless fails the rigorous squeeze condition, making the necessary-but-not-sufficient distinction concrete and memorable rather than a mere logical caveat.
- The temperature-profile/artificial-signal transfer probe was deliberately paired to contrast a genuinely physical (and thus continuous, hence integrable) scenario against a deliberately non-physical, purely mathematical counterexample — reinforcing that Riemann integrability failures like the Dirichlet function are a genuine mathematical possibility worth understanding, even though realistic physical functions essentially never exhibit this pathology.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.meas.lebesgue-integral` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: over/under-rectangles before formal definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

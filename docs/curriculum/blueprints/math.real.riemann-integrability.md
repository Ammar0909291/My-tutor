# Teaching Blueprint: Riemann Integrability (`math.real.riemann-integrability`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.riemann-integrability` |
| name | Riemann Integrability |
| domain | Real Analysis |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.real.riemann-integral` |
| unlocks | none |
| cross_links | `math.meas.measure-zero` (authored earlier in this same batch — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has upper/lower Darboux sums and knows continuous functions are integrable; the task is the PRECISE dividing line (the Lebesgue criterion) between integrable and non-integrable |
| description (KG) | $f$ is Riemann integrable on $[a,b]$ iff $f$ is bounded and its set of discontinuities has Lebesgue measure zero. Continuous functions and monotone functions are integrable. A function with infinitely many discontinuities can still be integrable. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): State the Lebesgue criterion precisely — $f$ is Riemann integrable on $[a,b]$ iff $f$ is BOUNDED (`math.real.riemann-integral`'s own already-established necessary condition) AND its set of discontinuities has `math.meas.measure-zero`'s own measure-zero property — and correctly recognize this as the EXACT dividing line, sharper than either "continuous everywhere" (sufficient but not necessary) or "bounded" (necessary but not sufficient) alone.
- LO2: Correctly re-diagnose `math.real.riemann-integral`'s own Dirichlet-function non-example using the Lebesgue criterion DIRECTLY — the Dirichlet function is discontinuous at EVERY point of $[0,1]$, so its discontinuity set is the WHOLE interval $[0,1]$, which has POSITIVE (not zero) measure — correctly explaining why the criterion correctly PREDICTS non-integrability, rather than merely re-confirming an already-known fact by a different route.
- LO3: Exhibit a function with INFINITELY MANY discontinuities that IS Riemann integrable — using a function discontinuous at every point of $\mathbb{Q}\cap[0,1]$ (countably infinite, hence `math.meas.measure-zero`'s own measure-zero property applies directly) as the standard example — correctly contrasting it against the Dirichlet function's failure to demonstrate that "infinitely many discontinuities" alone does not determine integrability; only the discontinuity set's MEASURE does.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.riemann-integral` (upper/lower Darboux sums $U(f,P),L(f,P)$; $f$ integrable iff $\inf U=\sup L$; integrable functions are bounded; continuous functions are integrable; the Dirichlet function as a non-integrable example, discontinuous everywhere).

## Component 3 — Core Explanation

**The Lebesgue criterion is the EXACT dividing line, sharpening both of `math.real.riemann-integral`'s own partial results**: `math.real.riemann-integral` already establishes two ONE-DIRECTIONAL facts: boundedness is NECESSARY (unbounded functions are never integrable) but NOT sufficient (some bounded functions still fail, like the Dirichlet function); continuity is SUFFICIENT (continuous functions are always integrable) but NOT necessary (some genuinely discontinuous functions are still integrable). The Lebesgue criterion RESOLVES both gaps at once: $f$ integrable $\Leftrightarrow$ bounded AND discontinuity set has measure zero — an "if and only if" characterization, not merely a one-directional sufficient or necessary condition.

**Re-diagnosing the Dirichlet function: its discontinuity set has POSITIVE measure, correctly predicting failure**: `math.real.riemann-integral`'s own Dirichlet function (1 on rationals, 0 on irrationals) is discontinuous at EVERY point of $[0,1]$ — its discontinuity set is the ENTIRE interval $[0,1]$, which has Lebesgue measure $1$ (positive, emphatically NOT zero, by the most basic measure fact — an interval's measure equals its length). The Lebesgue criterion correctly PREDICTS non-integrability here: boundedness holds (the function only takes values 0 and 1), but the discontinuity-set-measure-zero condition FAILS — confirming the criterion doesn't just re-derive an already-known fact by coincidence, it correctly DIAGNOSES the specific reason for failure, generalizing beyond the ad hoc upper/lower-sum argument `math.real.riemann-integral`'s own treatment used.

**A function with COUNTABLY infinite discontinuities can still be integrable — measure, not count, is what matters**: define $g(x)=1$ if $x\in\mathbb{Q}\cap[0,1]$, $g(x)=0$ otherwise EXCEPT modify this near each rational so $g$ is discontinuous ONLY at the countably many rational points (a standard construction, e.g. based on denominators, not derived in full here) — the discontinuity set is exactly $\mathbb{Q}\cap[0,1]$, a COUNTABLE set. By `math.meas.measure-zero`'s own already-established fact (countable sets have measure zero), this discontinuity set HAS measure zero — so by the Lebesgue criterion, $g$ IS Riemann integrable, DESPITE having infinitely many (countably infinite) discontinuities. This directly demonstrates the criterion's precision: it is the discontinuity set's MEASURE, not its cardinality (finite/countable/uncountable) alone, that determines integrability.

## Component 4 — Worked Examples

**Example 1 (LO1 — the criterion as the exact if-and-only-if dividing line, breaking MC-1)**: tabulating three functions against the criterion: $f_1(x)=x^2$ (continuous everywhere, discontinuity set $\varnothing$, measure zero trivially) — INTEGRABLE, correctly predicted by BOTH the criterion and `math.real.riemann-integral`'s own continuity-sufficient fact. $f_2(x)=\lfloor x\rfloor$ (a step function, discontinuous at finitely many integer points — a FINITE set, hence measure zero, per `math.meas.measure-zero`'s own countable-implies-measure-zero fact, since finite is a special case of countable) — INTEGRABLE, correctly predicted by the criterion even though $f_2$ is NOT continuous everywhere (`math.real.riemann-integral`'s own sufficient-but-not-necessary continuity condition would have left this case undetermined). The Dirichlet function — NOT integrable, correctly predicted (Example 2 below).

**Example 2 (LO2 — re-diagnosing the Dirichlet function via the measure of its discontinuity set, breaking MC-2)**: `math.real.riemann-integral`'s own Dirichlet function is discontinuous at EVERY $x\in[0,1]$ (verified there via the persistent upper/lower sum gap $U-L=1$ regardless of partition fineness). Its discontinuity set is therefore ALL of $[0,1]$ — and $\mu([0,1])=1$ (an interval's Lebesgue measure equals its length, a basic fact), which is POSITIVE, not zero. The Lebesgue criterion therefore correctly predicts NON-integrability — CONFIRMING (via a completely different mechanism — measuring the discontinuity set's size, rather than directly computing upper/lower sums) the SAME conclusion `math.real.riemann-integral`'s own direct argument already reached, demonstrating the criterion's genuine diagnostic power rather than merely restating a known answer.

**Example 3 (LO3 — a function with countably many discontinuities, still integrable, breaking MC-3)**: for a function $g$ discontinuous ONLY at the countably many points of $\mathbb{Q}\cap[0,1]$ (and continuous at every irrational point): the discontinuity set is $\mathbb{Q}\cap[0,1]$, which `math.meas.measure-zero`'s own already-established fact confirms has measure ZERO (a countable set, directly citable without re-derivation). By the Lebesgue criterion, $g$ IS Riemann integrable — DESPITE having infinitely many (in fact, densely packed) discontinuities. Contrasted DIRECTLY against Example 2's Dirichlet function (also infinitely discontinuous, but on a set of POSITIVE measure, and NOT integrable): the same "infinitely many discontinuities" description applies to both functions, yet one is integrable and the other isn't — confirming LO3's precise claim that MEASURE, not mere cardinality of the discontinuity set, is the deciding factor.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Lebesgue Criterion Is the Exact If-and-Only-If Dividing Line (Primitive P11: Representation Shift)

State: "`math.real.riemann-integral` gave you a sufficient condition (continuity) and a necessary condition (boundedness) — neither alone tells the whole story; the Lebesgue criterion combines boundedness with the discontinuity set's MEASURE to give the EXACT dividing line, both necessary and sufficient." Walk Example 1's three-function classification table.

- **MC-1 hook**: ask "is the Lebesgue criterion just another SUFFICIENT condition for integrability (like continuity), or is it the EXACT necessary-and-sufficient dividing line?" — a "just another sufficient condition" answer reveals MC-1 (missing the criterion's exact, two-directional characterization).

### Teaching Action A02 — The Criterion Correctly Diagnoses the Dirichlet Function's Failure, Not by Coincidence (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the Dirichlet function's discontinuity set is computed to have measure EXACTLY 1 (the whole interval), directly and independently confirming its non-integrability via an ENTIRELY different mechanism than `math.real.riemann-integral`'s own upper/lower-sum-gap argument. State: "these two arguments — the direct Darboux-sum computation and the Lebesgue-criterion measure check — aren't coincidentally agreeing; they're two independent, both-valid ways of diagnosing the SAME underlying failure."

- **MC-2 hook**: ask "does the Lebesgue criterion's correct prediction of the Dirichlet function's non-integrability merely coincidentally match `math.real.riemann-integral`'s own already-known result, or does it independently, correctly diagnose the same failure via a genuinely different mechanism?" — a "merely coincidental" answer reveals MC-2 (missing that the criterion is a genuinely independent, correct diagnostic tool).

### Teaching Action A03 — It's the MEASURE of the Discontinuity Set, Not Its Cardinality, That Determines Integrability (Primitive P06: Contrast Pair)

Contrast Example 2's Dirichlet function (infinitely — in fact uncountably — discontinuous, NOT integrable) directly against Example 3's function $g$ (also infinitely — but only countably — discontinuous, YET integrable). State: "'infinitely many discontinuities' by itself tells you NOTHING about integrability — what matters is whether that infinite discontinuity set has measure zero or positive measure, and countable infinities always have measure zero while the Dirichlet function's discontinuity set (literally everything) does not."

- **MC-3 hook**: ask "does having infinitely many discontinuities automatically rule out Riemann integrability?" — a "yes" answer reveals MC-3 (missing that countably infinite discontinuity sets have measure zero and remain fully compatible with integrability).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the Lebesgue criterion precisely, identifying which part is `math.real.riemann-integral`'s own already-known necessary condition and which part is genuinely new.
  2. For $f(x)=1/x$ on $(0,1]$ (unbounded near 0), explain why the Lebesgue criterion's boundedness requirement alone already rules out integrability, without needing to examine the discontinuity set at all.
  3. Compute the measure of the discontinuity set for a step function with 5 jump discontinuities, and confirm it predicts integrability.
  4. Explain, in your own words, why "infinitely many discontinuities" is not by itself sufficient information to determine Riemann integrability.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.meas.measure-zero`)**: "A numerical-analysis researcher is evaluating whether a piecewise-defined function $h$, built from countably many smooth pieces glued together with possible jumps at each of the countably many gluing points, can be safely numerically integrated via Riemann-sum-based methods. (a) Using the Lebesgue criterion, explain what TWO conditions the researcher needs to verify about $h$ to be confident it is Riemann integrable. (b) Using `math.meas.measure-zero`'s own already-established fact, explain why the countably many gluing points, by themselves, pose NO obstacle to integrability, regardless of how many there are. (c) If the researcher instead discovers $h$ is discontinuous on an entire subinterval (a set of positive measure, not just isolated points), explain why this WOULD genuinely threaten integrability, contrasting directly with the countable-gluing-points case."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LEBESGUE-CRITERION-ASSUMED-MERELY-SUFFICIENT | Believing the Lebesgue criterion is just another sufficient condition for integrability, missing that it is the exact necessary-and-sufficient dividing line | Foundational |
| MC-2 | LEBESGUE-CRITERION-DIRICHLET-PREDICTION-ASSUMED-COINCIDENTAL | Believing the criterion's correct prediction of the Dirichlet function's non-integrability is merely a coincidental match with the already-known result, missing that it is an independent, genuinely diagnostic mechanism | High |
| MC-3 | INFINITE-DISCONTINUITIES-ASSUMED-TO-RULE-OUT-INTEGRABILITY | Believing having infinitely many discontinuities automatically rules out Riemann integrability, missing that countably infinite discontinuity sets have measure zero and remain compatible with integrability | High |

- **B01 (targets MC-1)**: P27 (name it: "Lebesgue Criterion Assumed Merely Sufficient") → P41 (detect: ask whether the criterion is merely sufficient or the exact dividing line) → P64 (conceptual shift: re-walk Example 1's three-function classification, including the step function case continuity alone couldn't resolve).
- **B02 (targets MC-2)**: P27 (name it: "Lebesgue Criterion Dirichlet Prediction Assumed Coincidental") → P41 (detect: ask whether the criterion's Dirichlet-function prediction is coincidental) → P64 (conceptual shift: re-walk Example 2's independent measure computation).
- **B03 (targets MC-3)**: P27 (name it: "Infinite Discontinuities Assumed to Rule Out Integrability") → P41 (detect: ask whether infinitely many discontinuities automatically rules out integrability) → P64 (conceptual shift: re-walk Example 3's countably-discontinuous-yet-integrable function, contrasted against the Dirichlet function).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.riemann-integral` (Darboux sums, the boundedness-necessary and continuity-sufficient facts, and the Dirichlet function non-example this concept directly re-diagnoses).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.meas.measure-zero`, checked via `ls docs/curriculum/blueprints/` and confirmed authored EARLIER IN THIS SAME BATCH (same-batch cross-link-enabling pattern). $P76_{mode}=$ **cross-link probe**, engaging `math.meas.measure-zero`'s own countable-sets-have-measure-zero fact directly in Component 3's derivation and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/analyze tag supports the "3 TAs + gate" tier, with LO1 establishing the criterion's exact-dividing-line status, LO2 given full depth re-diagnosing an already-known example via a genuinely independent mechanism, and LO3 demonstrating the criterion's precision via a fully contrasted pair of examples.
- **Division of labor**: `math.real.riemann-integral` already owns Darboux sums, the boundedness-necessary and continuity-sufficient one-directional facts, and the Dirichlet function's own direct upper/lower-sum-based non-integrability proof (verified by grep — its own metadata explicitly notes the cross-link to `math.meas.lebesgue-integral`, a DIFFERENT concept, as pending); `math.meas.measure-zero` (authored immediately before this concept in the same batch) already owns the general measure-zero definition, the Cantor-set counterexample, and the countable-implies-measure-zero fact this concept directly reuses. This concept owns the Lebesgue CRITERION itself (the precise if-and-only-if characterization), its application re-diagnosing the Dirichlet function, and the countably-discontinuous-yet-integrable demonstration.
- Example 2's deliberate reuse of `math.real.riemann-integral`'s own already-established Dirichlet function (rather than a fresh non-example) was chosen specifically to make LO2's "independently, correctly diagnoses" claim directly checkable — the SAME function, already known non-integrable by one method, now shown non-integrable by a genuinely different method, rather than introducing an unfamiliar new counterexample that would leave the "independent confirmation" claim less concrete.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.meas.measure-zero` confirmed authored earlier in this batch → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has Darboux sums; task is the precise Lebesgue criterion dividing line) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

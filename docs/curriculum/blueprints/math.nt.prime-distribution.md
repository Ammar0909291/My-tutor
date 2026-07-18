# Teaching Blueprint: Distribution of Primes (`math.nt.prime-distribution`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.prime-distribution` |
| name | Distribution of Primes |
| domain | Number Theory |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 15 |
| requires | `math.nt.prime-number`, `math.calc.limits` |
| unlocks | `math.nt.analytic-number-theory` |
| cross_links | `math.cx.riemann-zeta` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | P (Pictorial) — a plotted prime-counting graph before the asymptotic formula |
| description (KG) | The study of how primes are distributed among the integers; the Prime Number Theorem states π(x) ~ x/ln(x) as x → ∞. |

## Component 1 — Learning Objectives

- LO1: Define the **prime-counting function** $\pi(x)$ as the number of primes less than or equal to $x$, compute it directly for small values, and state the **Prime Number Theorem**: $\pi(x)\sim\frac{x}{\ln x}$ as $x\to\infty$.
- LO2: Correctly interpret the **asymptotic equivalence** symbol $\sim$ — $\pi(x)\sim\frac{x}{\ln x}$ means $\lim_{x\to\infty}\frac{\pi(x)}{x/\ln x}=1$, i.e. the RATIO tends to 1 — and explicitly distinguish this from the (false) claim that $\pi(x)-\frac{x}{\ln x}\to0$ (the absolute difference does NOT vanish; it actually grows without bound, even as the ratio approaches 1).
- LO3: Analyze the practical implication of the Prime Number Theorem — that primes become **increasingly sparse** as numbers grow larger (the "density" of primes near $x$ behaves roughly like $\frac{1}{\ln x}$), and use this to reason qualitatively about how prime-counting behaves at different orders of magnitude.

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.prime-number` (the definition of a prime, and comfort finding/counting primes directly) and `math.calc.limits` (the formal meaning of a limit as $x\to\infty$, needed to correctly parse the asymptotic-equivalence statement).

## Component 3 — Core Explanation

The **prime-counting function** $\pi(x)$ counts the number of primes $\leq x$. E.g. $\pi(10)=4$ (the primes 2,3,5,7), $\pi(20)=8$ (adding 11,13,17,19).

**The Prime Number Theorem** (PNT) states:
$$\pi(x) \sim \frac{x}{\ln x} \quad\text{as } x\to\infty$$
The **asymptotic equivalence** symbol $\sim$ has a precise meaning: $f(x)\sim g(x)$ means $\lim_{x\to\infty}\frac{f(x)}{g(x)}=1$ — the RATIO of the two functions tends to 1, NOT that their difference tends to 0. This is a genuinely weaker (but still deep and highly nontrivial) statement than "$\pi(x)-\frac{x}{\ln x}\to 0$" — in fact, the actual difference between $\pi(x)$ and $\frac{x}{\ln x}$ grows without bound as $x\to\infty$, even while their RATIO converges to 1. (The refined error-term behavior of this difference is itself one of the deepest open areas in analytic number theory, closely tied to the Riemann Hypothesis.)

**Practical implication — primes get sparser**: the theorem says $\pi(x)$ grows like $\frac{x}{\ln x}$, which grows MUCH more slowly than $x$ itself (since $\ln x\to\infty$, however slowly, as $x$ grows). This means the "density" of primes near a large number $x$ — roughly the chance a randomly chosen number near $x$ is prime — behaves like $\frac{1}{\ln x}$, which shrinks (very slowly) as $x$ grows. Primes never stop appearing (there are infinitely many, a separate, older theorem), but they become relatively rarer and rarer among the integers as you look at larger and larger ranges.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing $\pi(x)$ directly, comparing to the PNT estimate)**: $\pi(100)=25$ (the exact count of primes up to 100). The PNT estimate: $\frac{100}{\ln100} = \frac{100}{4.605}\approx21.7$. The estimate (21.7) is reasonably close to but not exactly equal to the true value (25) — illustrating that the theorem is an asymptotic (large-$x$) statement, not an exact formula usable directly at any finite $x$.

**Example 2 (LO2 — ratio tends to 1, but the difference does not vanish, breaking MC-1)**: At $x=10^6$: $\pi(10^6)=78{,}498$ (a known exact value), while $\frac{10^6}{\ln(10^6)} = \frac{10^6}{13.816}\approx72{,}382$. Ratio: $\frac{78{,}498}{72{,}382}\approx1.0845$ — closer to 1 than the $x=100$ case was, illustrating the ratio's convergence toward 1 as $x$ grows. But the ABSOLUTE difference, $78{,}498-72{,}382=6{,}116$, is actually LARGER in absolute terms than at $x=100$ (where the difference was only $25-21.7\approx3.3$) — demonstrating explicitly that the ratio approaching 1 does NOT mean the difference is shrinking; the difference is growing, just much more slowly than $\pi(x)$ itself.

**Example 3 (LO3 — primes getting sparser)**: Comparing prime density in different ranges: among the first 100 integers, 25 are prime (25% density). Among integers near $10^6$, using $\pi(x)\approx x/\ln x$, the LOCAL density near $x$ is approximately $\frac{1}{\ln x}\approx\frac{1}{13.8}\approx7.2\%$ — noticeably lower than the 25% seen near small numbers, illustrating concretely (via the theorem's implication) that primes genuinely do get relatively less frequent as numbers grow, even though (by a separate, more elementary theorem) they never stop appearing entirely.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Prime-Counting Function and the PNT Statement (Primitive P11: Representation Shift)

Start pictorial: sketch a rough graph of $\pi(x)$ as a step function that climbs by 1 at each prime, and overlay the smooth curve $\frac{x}{\ln x}$ — showing the step function tracking the smooth curve reasonably well at large scale, even though it's jagged up close. State: "the Prime Number Theorem is exactly this observation, made rigorous: the smooth curve $x/\ln x$ becomes an increasingly GOOD RELATIVE approximation to the actual (jagged) prime count, as $x$ grows without bound."

Shift to the symbolic statement and work Example 1, directly computing $\pi(100)$ and comparing it to the PNT's estimate at $x=100$, noting the estimate is in the right ballpark but not exact.

- **MC-1 hook**: ask "since $\pi(x)\sim x/\ln x$, does that mean $\pi(x)-x/\ln x$ gets closer and closer to 0 as $x$ grows?" — a "yes" answer reveals MC-1 (misinterpreting asymptotic equivalence — a statement about the RATIO — as a statement about the DIFFERENCE vanishing).

### Teaching Action A02 — Ratio vs. Difference, and Prime Sparsity (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2's explicit numerical comparison — showing the ratio $\pi(x)/(x/\ln x)$ genuinely getting closer to 1 (from $x=100$ to $x=10^6$) while the raw DIFFERENCE $\pi(x)-x/\ln x$ actually grows larger in absolute terms over the same range. State the precise distinction explicitly: "$\sim$ is a claim about ratios converging to 1 — it says nothing directly about the gap shrinking, and in this case the gap genuinely does NOT shrink, even though the theorem's statement is completely correct as written."

**Contrast 2**: Work Example 3's density comparison (25% near $x=100$ vs. roughly 7% near $x=10^6$), connecting the shrinking local density directly back to the $1/\ln x$ behavior implied by the theorem — grounding the "primes get sparser" qualitative claim in a specific quantitative comparison rather than leaving it as an unquantified intuition.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\pi(30)$ directly by listing all primes up to 30, then compute the PNT estimate $30/\ln30$ and compare.
  2. Explain, in your own words, the precise meaning of $\pi(x)\sim x/\ln x$, being explicit about what this does and does not claim about the difference $\pi(x)-x/\ln x$.
  3. Given that $\pi(x)/(x/\ln x)$ is closer to 1 at $x=10^9$ than at $x=10^6$, is it still possible for $\pi(x)-x/\ln x$ to be a LARGER absolute number at $x=10^9$ than at $x=10^6$? Explain why or why not, using this lesson's ratio/difference distinction.
  4. Using the $1/\ln x$ local-density heuristic, roughly estimate what fraction of numbers near $x=10^{10}$ would be expected to be prime (you do not need to compute $\pi$ exactly — just apply the density heuristic).
- **P76 (Transfer Probe, mode = independence)**: "A cryptography course explains that generating a large random prime number (say, around 300 digits long) for use in an encryption key requires testing many random candidates before finding one that's actually prime, because primes become increasingly rare among large numbers. (a) Using the Prime Number Theorem's density heuristic ($\approx 1/\ln x$), roughly estimate what fraction of 300-digit numbers are prime (you can express $\ln x$ in terms of the number of digits, using $x\approx10^{300}$, so $\ln x \approx 300\ln10\approx691$). (b) Using this density estimate, explain roughly how many random 300-digit candidates you'd expect to need to test, on average, before finding a prime. (c) A student argues 'since we need to test hundreds of candidates, primes must be extremely rare and might eventually stop appearing altogether at very large sizes' — using a fact you know is TRUE about primes (distinct from the Prime Number Theorem itself), explain why this specific conclusion is incorrect even though the premise (many candidates needed) is correct." *Component 7 note: this scenario was chosen independently rather than cross-linking to `math.cx.riemann-zeta`, since that blueprint does not yet exist.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ASYMPTOTIC-RATIO-CONFLATED-WITH-VANISHING-DIFFERENCE | Believing $f(x)\sim g(x)$ (ratio tends to 1) implies $f(x)-g(x)\to0$ (difference vanishes), when in fact the difference can grow without bound while the ratio still converges to 1 | Foundational |
| MC-2 | PNT-TREATED-AS-EXACT-FORMULA | Treating $\pi(x)\approx x/\ln x$ as an exact or near-exact computational formula usable at any specific finite $x$, rather than recognizing it as a large-$x$ asymptotic statement with potentially significant relative error at smaller/moderate $x$ | Moderate |
| MC-3 | PRIME-SPARSITY-MISTAKEN-FOR-PRIME-FINITENESS | Believing that primes becoming increasingly sparse (rarer in relative density) as numbers grow implies primes eventually stop appearing altogether, confusing decreasing density with a finite total count | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Ratio/Difference Conflation") → P41 (detect: ask whether $\pi(x)\sim x/\ln x$ implies the difference $\pi(x)-x/\ln x$ shrinks toward 0) → P64 (conceptual shift: work through Example 2's explicit numbers, showing the ratio approaching 1 while the difference simultaneously grows — a directly checkable numerical counterexample to the naive interpretation).
- **B02 (targets MC-2)**: P27 (name it: "PNT as Exact Formula") → P41 (detect: ask a student to use $x/\ln x$ to predict $\pi(100)$ EXACTLY, checking if they present the estimate as the precise answer rather than an approximation) → P64 (conceptual shift: re-anchor on "this is an asymptotic ($x\to\infty$) statement — at any FIXED, finite $x$, especially small ones, it's only a rough estimate, with genuinely improving but never exact agreement as $x$ grows").
- **B03 (targets MC-3)**: P27 (name it: "Sparsity Mistaken for Finiteness") → P41 (detect: ask whether decreasing prime density implies primes eventually stop appearing) → P64 (conceptual shift: re-anchor on the distinct, separately-established fact that there are infinitely many primes — density can shrink toward zero while the COUNT still grows without bound and never terminates; these are compatible, not contradictory, facts).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.prime-number` (the definition of primality this entire concept counts and analyzes), `math.calc.limits` (the formal limit machinery underlying the precise meaning of asymptotic equivalence).
- **Unlocks**: `math.nt.analytic-number-theory` (the broader field this concept's central result, the Prime Number Theorem, is the flagship achievement of).
- **Cross-link**: KG lists `math.cx.riemann-zeta` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.cx.riemann-zeta.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's ratio-vs-difference distinction directly to the Riemann zeta function's role in controlling the PRECISE error term in the Prime Number Theorem (the connection between the zeta function's zeros and how tightly $\pi(x)$ tracks $x/\ln x$ is exactly the substance of the Riemann Hypothesis).

## Component 8 — Teaching Notes

- estimated_hours = 15 with an expert/analyze tag and a comparatively low mastery_threshold (0.65, MAMR 4/5) reflects the KG's own genuine judgment that this is deep, historically hard-won mathematics (the Prime Number Theorem was not proven until the late 19th century, over a century after being conjectured) — the "2 main TAs + gate" structure (A01: the counting function and PNT statement; A02: the ratio/difference distinction plus the sparsity implication) was kept deliberately lean, prioritizing correct conceptual understanding of the THEOREM'S STATEMENT and its precise meaning over any attempt at proof (which genuinely requires complex analysis machinery, specifically the Riemann zeta function, well beyond this concept's own scope).
- MC-1 (asymptotic ratio conflated with vanishing difference) was made this blueprint's central focus because it is both the single most common misreading of ANY "$\sim$" statement in mathematics generally, and specifically because the actual numbers here (Example 2) make an unusually vivid, concrete demonstration available — few asymptotic statements in earlier mathematics offer such an easily computed, striking numerical illustration of ratio-converges-while-difference-grows.
- The cryptography transfer probe was chosen because prime density directly underlies a widely-known, genuinely practical application (RSA-style key generation) that gives this deep theoretical result immediate real-world stakes, while part (c)'s prompt to distinguish sparsity from finiteness directly closes the loop on MC-3 within the same assessment item that exercises the density estimate itself.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.cx.riemann-zeta` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: plotted prime-counting graph before formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

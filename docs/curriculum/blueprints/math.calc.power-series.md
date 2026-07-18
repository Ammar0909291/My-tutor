<!-- BLUEPRINT: math.calc.power-series -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Power Series
**Concept ID:** `math.calc.power-series`
**KG Fields:** difficulty=advanced | bloom=analyze | estimated_hours=10 | mastery_threshold=0.75

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.calc.power-series |
| name | Power Series |
| difficulty | advanced |
| bloom | analyze |
| estimated_hours | 10 |
| mastery_threshold | 0.75 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.seq.series-convergence |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.75 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.series-convergence**: a series Σaₙ converges iff its partial sums converge; the ratio test (lim|aₙ₊₁/aₙ|<1 ⟹ converges, >1 ⟹ diverges, =1 ⟹ inconclusive) is the primary tool this concept reuses to find the radius of convergence

### Target Knowledge State
Student can define a power series Σcₙ(x−a)ⁿ and its radius of convergence R (via the ratio test); correctly determine the FULL interval of convergence by separately testing BOTH endpoints x=a−R and x=a+R (since the ratio test is inconclusive exactly there); distinguish the power series's convergence domain from the domain of the FUNCTION it may equal (e.g. 1/(1−x) is defined for all x≠1, but the geometric series Σxⁿ only converges to it for |x|<1); and correctly state (without necessarily proving) that term-by-term differentiation and integration of a power series preserve the radius of convergence R, while potentially changing endpoint behavior.

### Conceptual Obstacles
1. Assuming the interval of convergence is automatically the full closed interval [a−R, a+R] once R is found — the ratio test is INCONCLUSIVE exactly at the two endpoints, which must be checked separately (by substituting the endpoint value and applying a different test, e.g. comparison or alternating series test); the true interval can be open, closed, or half-open depending on the series
2. Confusing "the function the series represents" with "the series itself" — the geometric series formula gives $1/(1-x)$ for ALL $x\ne1$, but the SERIES $\sum x^n$ only converges (and hence only EQUALS that value) for $|x|<1$; outside that interval, the function value exists but the series diverges and represents nothing there
3. Assuming term-by-term differentiation/integration always preserves convergence at both endpoints unchanged — while the radius R is provably preserved, endpoint CONVERGENCE can change: differentiating can lose convergence at an endpoint (extra factor of n hurts convergence), while integrating can gain it (extra factor of 1/(n+1) helps)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | ENDPOINTS-AUTOMATICALLY-INCLUDED | Student states the interval of convergence as [a−R,a+R] (or (a−R,a+R)) without separately testing each endpoint, assuming the ratio test's verdict extends there | Any power series whose endpoint behavior differs between the two ends, e.g. Σxⁿ/n |
| MC-2 | SERIES-EQUALS-FUNCTION-EVERYWHERE | Student believes a power series equals its closed-form function value everywhere the function is defined, not just within the radius of convergence | The geometric series Σxⁿ=1/(1−x) example, or any power series with an elementary closed form defined on a larger domain than \|x−a\|<R |
| MC-3 | TERM-BY-TERM-PRESERVES-ENDPOINTS | Student assumes differentiating or integrating a power series term by term leaves endpoint convergence unchanged (since "the interval stays the same"), missing that only the RADIUS is guaranteed preserved, not endpoint behavior | Any term-by-term differentiation/integration task at a series whose original endpoint behavior is known |

**Foundational Misconception:** MC-1 (ENDPOINTS-AUTOMATICALLY-INCLUDED) — it is the single most common computational error in this topic (a ratio-test computation that is otherwise entirely correct still yields a wrong final answer if the endpoints aren't checked), and it directly sets up MC-3 (which is really MC-1's error recurring after an extra operation is applied) — a student who never learned to check endpoints has no habit to fall back on when asked whether differentiation changes them.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner works the geometric series (the single most important motivating example) fully, including both endpoints, before the general radius-of-convergence machinery is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: the geometric series Σxⁿ worked in full (ratio test, both endpoints, contrast with the function 1/(1−x)); P: a number-line picture of the interval of convergence with four possible endpoint configurations; A: formal definitions of radius/interval of convergence and the ratio-test procedure
2. **A02 P06 CONTRAST PAIR** — a series with different behavior at each endpoint (MC-1); series-vs-function domain (MC-2, reusing the geometric series); term-by-term differentiation shrinking an endpoint's convergence (MC-3)
3. **A03 P28 CONFLICT EVIDENCE** — a full worked example requiring radius computation, both-endpoint testing, and a term-by-term operation in one composite problem, surfacing any residual gaps before the gate
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — The Geometric Series as the Motivating Case

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Work the single most important example (geometric series) fully, including both endpoints, before generalizing; state the formal radius/interval definitions and the ratio-test procedure

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (the geometric series, worked completely):**

$$\sum_{n=0}^{\infty} x^n = 1+x+x^2+x^3+\cdots$$

Ratio test: $\left|\dfrac{x^{n+1}}{x^n}\right| = |x| < 1$ for convergence, $|x|>1$ for divergence. So $R=1$, candidate interval $(-1,1)$.

**Check the endpoints separately** (the ratio test gives exactly $|x|=1$ as inconclusive):
- At $x=1$: series becomes $1+1+1+\cdots$ — terms don't even go to 0, **diverges** (by the divergence test).
- At $x=-1$: series becomes $1-1+1-1+\cdots$ — partial sums oscillate between 0 and 1, never settle, **diverges**.

**Interval of convergence: $(-1,1)$, open at both ends** — neither endpoint is included here (though this varies series by series, as A02 shows).

Where it converges, the series equals a specific function: $\sum_{n=0}^\infty x^n = \dfrac{1}{1-x}$ for $|x|<1$ — this is provable by summing the finite geometric partial sum $1+x+\cdots+x^{N} = \frac{1-x^{N+1}}{1-x}$ and letting $N\to\infty$ (which requires $|x|<1$ for $x^{N+1}\to0$).

**Stage P — Pictorial (the interval of convergence, four possible endpoint configurations):**

```
   R = radius, centered at a:

   (a-R)────────a────────(a+R)      open at both ends: (a-R, a+R)
      ○                    ○         e.g. the geometric series above

   [a-R)────────a────────(a+R]      one open, one closed — either direction
      ●                    ○         e.g. Σxⁿ/n: converges at x=-1, diverges at x=1
                                      (or the reverse, depending on the series)

   [a-R]────────a────────[a+R]      closed at both ends
      ●                    ●         e.g. Σxⁿ/n²
```

Outside $[a-R, a+R]$ entirely: the series diverges everywhere (the ratio test already settles this without further checking).

**Stage A — Abstract (formal definitions):**

**Power series:** $\sum_{n=0}^\infty c_n(x-a)^n$, centered at $a$.

**Radius of convergence R:** found via the ratio test on the terms $c_n(x-a)^n$: solve $\lim_{n\to\infty}\left|\dfrac{c_{n+1}(x-a)^{n+1}}{c_n(x-a)^n}\right| < 1$ for $|x-a|$, giving $|x-a|<R$.

**Interval of convergence:** $(a-R, a+R)$ PLUS whichever of the two endpoints $x=a-R$, $x=a+R$ individually converge, checked by substituting the specific numeric value and applying an appropriate series test (not the ratio test, which is inconclusive there by construction).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Find the radius of convergence of $\sum_{n=1}^\infty \dfrac{x^n}{n}$, and state (without yet fully testing) which two specific x-values need separate endpoint checks.

**CORRECT:** Ratio test: $\left|\dfrac{x^{n+1}/(n+1)}{x^n/n}\right| = |x|\cdot\dfrac{n}{n+1} \to |x|$ as $n\to\infty$. Need $|x|<1$, so $R=1$. Endpoints to check separately: $x=1$ and $x=-1$.
→ "Correct — R=1 from the ratio test, and the ratio test's own inconclusive boundary (|x|=1) is exactly where the two endpoints x=1, x=-1 live, both requiring separate tests." → Proceed to A02.

**PARTIAL:** Student correctly computes R=1 but states the interval of convergence as $(-1,1)$ or $[-1,1]$ immediately, without flagging that endpoints still need individual checking.
→ "R=1 is correct, but the interval of convergence isn't settled yet — the ratio test only tells you $|x|<1$ converges and $|x|>1$ diverges; AT $|x|=1$ (i.e. exactly $x=1$ and $x=-1$) the ratio test gives limit exactly 1, which is its own inconclusive case. Each of those two specific values needs a DIFFERENT test (e.g. the alternating series test or a comparison test) before you can state the final interval."

**INCORRECT:** Student computes the ratio test limit incorrectly, e.g. treating it as $|x|\cdot n/(n+1)\to \infty$ or getting $R\ne1$.
→ "Redo the ratio carefully: $\dfrac{|x|^{n+1}/(n+1)}{|x|^n/n} = |x|\cdot\dfrac{n}{n+1}$. As $n\to\infty$, $n/(n+1)\to1$, so the whole limit is just $|x|$ — the coefficient $1/n$ contributes a factor that approaches 1 in the ratio, it doesn't change what value of $|x|$ makes the limit less than 1. Setting $|x|<1$ gives $R=1$."

**NO_RESPONSE:** → "Ratio test: $|x|\cdot n/(n+1) \to |x|$, need $|x|<1$, so $R=1$. The two endpoints needing separate checks are $x=1$ and $x=-1$ (where the ratio test gives exactly the boundary value 1, its own inconclusive case)."

---

### Teaching Action A02 — Endpoints Differ; Series ≠ Function Outside R; Term-by-Term Changes Endpoints

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 by fully resolving a series with DIFFERENT behavior at each endpoint; break MC-2 with the geometric series's function-vs-series domain gap; break MC-3 by differentiating a series and checking its endpoint behavior changes

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Different verdicts at the two endpoints (MC-1), completing $\sum x^n/n$:**

From A01: $R=1$, candidates $x=1, x=-1$.

- At $x=1$: series becomes $\sum 1/n$ — the **harmonic series**, known to **diverge**.
- At $x=-1$: series becomes $\sum (-1)^n/n$ — an **alternating series** with terms $1/n\to0$ decreasing, so by the alternating series test it **converges** (conditionally, not absolutely).

**Interval of convergence: $[-1, 1)$** — closed at $x=-1$, open at $x=1$. The two endpoints gave genuinely OPPOSITE verdicts; nothing about the ratio test or the radius alone could have predicted this asymmetry — only substituting each specific value and applying the right test settles it.

**Contrast 2 — Series domain vs. function domain (MC-2), the geometric series revisited:**

The function $f(x)=\dfrac{1}{1-x}$ is defined for every real $x\ne1$ (e.g. $f(2)=1/(1-2)=-1$, a perfectly good real number). But the SERIES $\sum x^n$ at $x=2$ is $1+2+4+8+\cdots$, which clearly diverges (terms grow without bound) — the series does NOT converge to $f(2)=-1$ or to anything else at $x=2$, despite $f(2)$ being defined. The series only equals the function where it actually converges: $|x|<1$. Outside the interval of convergence, "the function" and "the series" simply part ways — one is defined, the other isn't.

**Contrast 3 — Term-by-term differentiation changes an endpoint (MC-3):**

Start from $\sum_{n=1}^\infty x^n/n$, interval $[-1,1)$ (Contrast 1). Differentiate term by term: $\dfrac{d}{dx}\sum \dfrac{x^n}{n} = \sum n\cdot\dfrac{x^{n-1}}{n} = \sum x^{n-1} = \sum_{n=0}^\infty x^n$ (reindexed) — the geometric series, interval $(-1,1)$ (from A01, BOTH endpoints diverge). **The radius stayed $R=1$ (guaranteed, always true for term-by-term differentiation), but the endpoint at $x=-1$ that used to converge (alternating harmonic series) no longer converges after differentiating** (the extra effective factor from differentiating removed the alternating series test's applicability — the differentiated series's terms at $x=-1$ don't go to zero the same protective way). Differentiation can only shrink or preserve the interval at the endpoints, never enlarge it; integration works in the opposite direction (can gain endpoint convergence, e.g. integrating $\sum x^n$ term by term produces $\sum x^{n+1}/(n+1)$, which converges at $x=-1$ even though the original geometric series didn't).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** For $\sum_{n=1}^\infty \dfrac{(-1)^n x^n}{n^2}$: (a) find R, (b) test both endpoints, (c) state the full interval of convergence.

**CORRECT:** (a) Ratio test: $\left|\dfrac{x^{n+1}/(n+1)^2}{x^n/n^2}\right| = |x|\cdot\dfrac{n^2}{(n+1)^2}\to|x|$, need $|x|<1$, so $R=1$. (b) At $x=1$: series is $\sum(-1)^n/n^2$, absolutely convergent (since $\sum1/n^2$ converges, a p-series with $p=2>1$) — **converges**. At $x=-1$: series is $\sum(-1)^n(-1)^n/n^2 = \sum 1/n^2$ — also **converges** (same p-series). (c) Interval: $[-1,1]$, closed at both ends.
→ "Correct — both endpoints converge here (absolutely, in fact), a genuinely different outcome from Contrast 1's asymmetric case, showing endpoint behavior must always be checked fresh, never assumed from a similar-looking series." → Proceed to A03.

**PARTIAL:** Student gets (a) and correctly tests one endpoint but assumes the other behaves the same "by symmetry" without computing it.
→ "Each endpoint needs its own independent check — don't assume symmetry. Here it happens both converge, but that's a fact about THIS series (the $1/n^2$ factor makes the series absolutely convergent regardless of sign), not a general rule; Contrast 1's example ($\sum x^n/n$) had genuinely DIFFERENT behavior at its two endpoints, so 'symmetric behavior' cannot be assumed in general."

**INCORRECT:** Student concludes the interval is simply $(-1,1)$ without testing the endpoints at all (MC-1).
→ "The ratio test only established $R=1$, giving the OPEN interval $(-1,1)$ as a lower bound on what's known — the endpoints $x=\pm1$ are exactly where the ratio test is silent (limit equals 1) and must be tested separately. Here, testing shows both endpoints actually converge (via the $p$-series comparison), so the true interval is the CLOSED $[-1,1]$, strictly larger than what the ratio test alone would suggest."

**NO_RESPONSE:** → "(a) R=1. (b) At x=1: $\sum(-1)^n/n^2$ converges absolutely (compare to convergent p-series $\sum1/n^2$). At x=-1: $\sum1/n^2$ converges (same p-series). (c) Interval: $[-1,1]$."

---

### Teaching Action A03 — Composite Problem: Radius, Endpoints, and Term-by-Term Together

**Primitive:** P28 CONFLICT EVIDENCE
**Purpose:** Force all three skills (radius computation, independent endpoint testing, term-by-term consequence tracking) together in one problem before the gate

---

**[P28 — CONFLICT EVIDENCE]**

Consider $f(x) = \sum_{n=1}^\infty \dfrac{x^n}{n\cdot 2^n}$.

A student who has not integrated all three skills typically makes one of: skipping the endpoint check entirely (MC-1), assuming the $2^n$ somehow changes what "the function" the series represents means outside its interval (a variant of MC-2), or assuming a subsequently-requested derivative automatically keeps the same interval (MC-3).

**Full resolution:**

1. **Radius:** Ratio test: $\left|\dfrac{x^{n+1}/((n+1)2^{n+1})}{x^n/(n2^n)}\right| = \dfrac{|x|}{2}\cdot\dfrac{n}{n+1} \to \dfrac{|x|}{2}$. Need $|x|/2<1$, i.e. $|x|<2$, so $R=2$.
2. **Endpoints** (candidates $x=2, x=-2$): At $x=2$: $\sum \dfrac{2^n}{n2^n} = \sum\dfrac1n$ — harmonic series, **diverges**. At $x=-2$: $\sum\dfrac{(-2)^n}{n2^n} = \sum\dfrac{(-1)^n}{n}$ — alternating harmonic series, **converges**.
3. **Interval of convergence:** $[-2, 2)$.
4. **Term-by-term derivative:** $f'(x) = \sum_{n=1}^\infty \dfrac{x^{n-1}}{2^n} = \dfrac1x\sum\dfrac{x^n}{2^n}$ (for $x\ne0$; handle $x=0$ separately as the constant term $1/2$) — this is (up to the $1/x$ factor) a geometric-type series in $(x/2)$, with radius still $R=2$ (preserved, as guaranteed), but endpoint behavior must be re-checked independently: at $x=2$, $\sum(x/2)^n = \sum1^n$ diverges (terms don't → 0); at $x=-2$, $\sum(-1)^n$ also diverges (terms don't → 0, oscillate) — so the derivative's interval is $(-2,2)$, having LOST the endpoint convergence at $x=-2$ that the original series had.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** For $g(x) = \sum_{n=1}^\infty \dfrac{x^n}{n^2\cdot3^n}$: find R and both endpoints' behavior (you do not need to compute the derivative).

**CORRECT:** Ratio test: $\dfrac{|x|}{3}\cdot\dfrac{n^2}{(n+1)^2}\to|x|/3$, need $<1$, so $R=3$. At $x=3$: $\sum\dfrac{3^n}{n^23^n}=\sum\dfrac1{n^2}$, converges (p-series, $p=2$). At $x=-3$: $\sum\dfrac{(-1)^n}{n^2}$, converges absolutely (same comparison). Interval: $[-3,3]$.
→ "Correct — the extra $1/n^2$ factor (versus A03's $1/n$) is what makes BOTH endpoints converge here, unlike the composite example's asymmetric result." → Proceed to A04.

**PARTIAL:** Student correctly finds R=3 but tests only one endpoint and assumes the other matches.
→ "Test both independently — here they happen to match (both converge, via the same $1/n^2$ comparison), but as A02's Contrast 1 showed, this is never guaranteed in general; always substitute and check each endpoint's specific series."

**INCORRECT:** Student states the interval as $(-3,3)$ without any endpoint testing (MC-1).
→ "R=3 only gives the open interval as a starting point — the endpoints $x=\pm3$ are exactly where the ratio test is silent. Testing them: both give a convergent p-series-type comparison ($\sum1/n^2$), so they should be INCLUDED, making the true interval the closed $[-3,3]$, not the open $(-3,3)$."

**NO_RESPONSE:** → "R=3 from the ratio test. At x=3: $\sum1/n^2$ converges. At x=-3: $\sum(-1)^n/n^2$ converges absolutely. Interval: $[-3,3]$."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess radius computation, independent endpoint testing, series-vs-function domain awareness, and term-by-term consequence tracking under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Find the radius of convergence of $\sum_{n=0}^\infty \dfrac{x^n}{n!}$.

*Solution:* Ratio test: $\dfrac{|x|^{n+1}/(n+1)!}{|x|^n/n!} = \dfrac{|x|}{n+1}\to0$ for every fixed $x$, so the series converges for ALL $x$: $R=\infty$ (no endpoints to check — this is the series for $e^x$).

**Problem 2:** For $\sum_{n=1}^\infty n\cdot x^n$, find R and test both endpoints.

*Solution:* Ratio test: $\dfrac{(n+1)|x|^{n+1}}{n|x|^n} = |x|\cdot\dfrac{n+1}{n}\to|x|$, so $R=1$. At $x=1$: $\sum n$ diverges (terms → ∞, not 0). At $x=-1$: $\sum n(-1)^n$ also diverges (terms don't → 0, in fact grow in magnitude). Interval: $(-1,1)$, open at both ends.

**Problem 3:** True or false: "Since $\sum_{n=0}^\infty x^n$ converges to $1/(1-x)$ for $|x|<1$, the equation $\sum x^n = 1/(1-x)$ is valid for every $x\ne1$." Justify.

*Solution:* **False.** The series only converges (and hence only equals the right-hand side) for $|x|<1$. At, e.g., $x=2$: the right side $1/(1-2)=-1$ is a well-defined number, but the left side $\sum2^n=1+2+4+\cdots$ diverges — the series represents nothing there, so the "equation" is meaningless outside $|x|<1$ even though the function itself is defined more broadly.

**Problem 4:** The series $\sum_{n=1}^\infty x^n/n$ has interval of convergence $[-1,1)$ (established in A02). If this series is integrated term by term from 0 to x, will the radius of the resulting series change? Could its endpoint behavior change?

*Solution:* The radius stays $R=1$ (term-by-term integration always preserves the radius). Endpoint behavior CAN change — integration tends to help convergence at endpoints (an extra factor of $1/(n+1)$ appears), so it is possible (though not automatic without direct checking) that the endpoint $x=1$, which diverged for the original series, could gain convergence after integrating; each endpoint must still be re-tested directly on the new series to know for certain.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** Consider $h(x) = \sum_{n=1}^\infty \dfrac{(x-2)^n}{n\cdot4^n}$ (centered at $a=2$, not at 0).

(a) Find the radius of convergence R and the resulting candidate interval before endpoint-checking.
(b) Test both endpoints and state the full interval of convergence.
(c) A student argues: "Since this series is basically the same as $\sum x^n/(n\cdot4^n)$ but just shifted to be centered at 2 instead of 0, and shifting a graph doesn't change its shape, the endpoint behavior must be identical to whatever $\sum x^n/(n\cdot4^n)$ would have (just shifted by 2)." Evaluate this reasoning, and confirm (or correct it) using your answer to (b) together with a genuinely separate computation of the unshifted series' endpoints.

**Expected solution:**

(a) Ratio test: $\left|\dfrac{(x-2)^{n+1}/((n+1)4^{n+1})}{(x-2)^n/(n4^n)}\right| = \dfrac{|x-2|}{4}\cdot\dfrac{n}{n+1}\to\dfrac{|x-2|}{4}$. Need $<1$: $|x-2|<4$, so $R=4$, candidate interval $(2-4, 2+4)=(-2,6)$.

(b) Endpoints: $x=6$ gives $(x-2)=4$: $\sum\dfrac{4^n}{n4^n}=\sum\dfrac1n$ — harmonic, **diverges**. $x=-2$ gives $(x-2)=-4$: $\sum\dfrac{(-4)^n}{n4^n}=\sum\dfrac{(-1)^n}{n}$ — alternating harmonic, **converges**. Interval: $[-2,6)$.

(c) The student's reasoning about the SHAPE being preserved under a shift is directionally sound (a shift in the center doesn't change R, and indeed here R=4 matches what $\sum x^n/(n4^n)$ would give too, by the identical ratio-test computation with $(x-2)$ replaced by $x$) — but the specific CLAIM about endpoint labels needs to be checked, not just assumed, because "shifted by 2" changes WHICH x-values are the endpoints, not the underlying convergence facts at each corresponding point. Direct check of the unshifted series $\sum x^n/(n4^n)$: at $x=4$, $\sum1/n$ diverges; at $x=-4$, $\sum(-1)^n/n$ converges — EXACTLY the same pattern (diverge at the positive endpoint, converge at the negative endpoint) as the shifted version, just at $x=4,-4$ instead of $x=6,-2$ (each shifted by $+2$ from the unshifted case, confirming $6=4+2$ and $-2=-4+2$). So in THIS case the student's intuition happens to check out once verified directly — but the correct habit is to verify by substitution at the ACTUAL endpoint values of the specific series given, never to skip the check merely because a shift "looks like" it shouldn't change anything; the shift argument correctly predicts the RADIUS is unchanged (a real, provable fact) but endpoint convergence still requires its own substitution-based check to confirm rather than assume, even when, as here, the intuition turns out to be right.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 4/5 (⌈0.75 × 5⌉ = ⌈3.75⌉ = 4)

- S ≥ 4: MASTERY ACHIEVED → proceed to P74
- S = 3: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 2: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.calc.taylor-series and math.calc.maclaurin-series; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.calc.power-series assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — ENDPOINTS-AUTOMATICALLY-INCLUDED (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Assuming the interval of convergence is settled once R is found is ENDPOINTS-AUTOMATICALLY-INCLUDED. The ratio test is INCONCLUSIVE exactly at the two endpoints — each must be substituted in and tested by a different method."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "A series has R=5 centered at 0. What is the interval of convergence?"
- MC-1 response: "(-5, 5)" or "[-5, 5]" stated immediately, with no endpoint computation shown.

**[P64 — CONCEPTUAL SHIFT]**
"R only tells you the OPEN interval (-5,5) is definitely inside the region of convergence, and everything outside [-5,5] definitely diverges — the ratio test's own limit equals exactly 1 (its inconclusive case) precisely at x=5 and x=-5. You must SUBSTITUTE each specific value into the original series and apply a genuinely different test (comparison, alternating series, p-series, etc.) — there is no shortcut that reads off endpoint behavior from R alone, and the two endpoints can behave completely differently from each other (as in $\sum x^n/n$: converges at $-1$, diverges at $1$)."

Practice: For $\sum x^n/n^3$ (R=1 by the ratio test, same computation pattern as $1/n$ and $1/n^2$), test both endpoints and state the full interval.

---

### Repair Action B02 — SERIES-EQUALS-FUNCTION-EVERYWHERE (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Believing a power series equals its closed-form function everywhere the function is defined is SERIES-EQUALS-FUNCTION-EVERYWHERE. The series only equals that function value WITHIN its interval of convergence — outside it, the series diverges even if the function itself is still defined."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Since Σxⁿ = 1/(1−x), what does Σxⁿ equal at x=3?"
- MC-2 response: "1/(1-3) = -1/2."

**[P64 — CONCEPTUAL SHIFT]**
"Check directly: at x=3, the series is $1+3+9+27+\cdots$, whose terms grow without bound — it DIVERGES, representing no value at all, certainly not $-1/2$. The formula $1/(1-x)$ is a property of the FUNCTION, valid for all $x\ne1$; the equality with the SERIES only holds where the series actually converges, $|x|<1$. Once outside the interval of convergence, the series and the function are simply unrelated — the function persists, the series does not."

Practice: State, without computing, whether $\sum x^n=1/(1-x)$ is a valid equation at $x=0.5$, at $x=-0.9$, and at $x=1.5$ — and justify each using only the interval of convergence.

---

### Repair Action B03 — TERM-BY-TERM-PRESERVES-ENDPOINTS (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming differentiation/integration leaves endpoint convergence unchanged is TERM-BY-TERM-PRESERVES-ENDPOINTS. Only the RADIUS is guaranteed preserved — endpoint behavior can change (differentiation tends to hurt it, integration tends to help it) and must be re-checked on the new series."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Σxⁿ/n has interval [-1,1). After differentiating term by term, what is the new interval?"
- MC-3 response: "Still [-1,1), since differentiating doesn't change the interval."

**[P64 — CONCEPTUAL SHIFT]**
"Differentiate term by term: $\sum x^n/n \to \sum x^{n-1} = \sum_{n=0}^\infty x^n$ (the geometric series). Re-derive its interval FRESH: ratio test still gives R=1 (radius preserved, as guaranteed), but NOW check the endpoints of THIS new series — at x=-1: $\sum(-1)^n$ diverges (terms don't → 0), whereas the ORIGINAL series converged there. The endpoint convergence was LOST by differentiating. The radius is a guaranteed invariant; endpoint behavior is not, and must be re-verified by direct substitution every time a term-by-term operation is applied."

Practice: Starting from $\sum x^n/n^2$ (interval [-1,1], both endpoints convergent, by comparison to $\sum1/n^2$), differentiate term by term to get $\sum x^{n-1}/n$ (reindex as $\sum x^n/(n+1)$), and check whether its endpoint behavior at $x=1$ and $x=-1$ matches the original.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Recompute the geometric series's full interval of convergence (both endpoints) from memory |
| SR-2 | +3 days | Find R and test both endpoints for a fresh series (e.g. one with an $n^2$ or $n!$ coefficient) |
| SR-3 | +7 days | Explain, using a concrete x-value outside the interval of convergence, why the series and its closed-form function diverge from each other there |
| SR-4 | +14 days | Reconstruct the term-by-term differentiation endpoint-loss example (A02 Contrast 3 / B03) from scratch |

Retrieval flag: if student states an interval of convergence without independently testing both endpoints (MC-1) or claims a series equals its function value outside the interval (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.seq.series-convergence | The ratio test used throughout to find R, and the underlying partial-sums definition of series convergence, are both inherited directly from that blueprint |
| Unlocks | math.calc.taylor-series | Taylor series are power series with a specific coefficient formula; this concept's radius/interval/endpoint machinery applies unchanged |
| Unlocks | math.calc.maclaurin-series | The a=0 special case of Taylor series, inheriting the same convergence apparatus developed here |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the full radius/endpoint/shift-reasoning skill set to a series centered at a nonzero point, a genuinely new configuration rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=10 → extended structure (3 main TAs + gate, but each TA carries denser content than the h=3-6 concepts in this corpus, reflecting the larger time allocation), matching the concept's genuinely broader scope (radius, endpoints, series-vs-function, and term-by-term consequences all fall under one KG node)
- bloom=analyze → checkpoints and the gate require multi-step composite reasoning (radius AND both endpoints AND, in A03/A04, a downstream consequence), not single-fact recall
- CPA_entry = C for an advanced learner: the geometric series (already familiar from prior series work) is worked completely and concretely before any general machinery is introduced, anchoring both the radius concept and the endpoint-checking discipline in one canonical, memorable example

**Key teaching insight:** MC-1 (endpoint omission) is this concept's highest-leverage error because it recurs, disguised, inside MC-3 — a student who never built the habit of checking endpoints independently has no foothold when asked whether a DERIVATIVE'S endpoints match the original series's. A02's three contrasts and A03's composite problem are sequenced so the SAME endpoint-checking action (substitute the specific value, apply a fresh test) is practiced in three escalating contexts: a single series (Contrast 1), a series compared against its closed-form function (Contrast 2), and a series after a term-by-term operation (Contrast 3) — building one transferable skill rather than three separate ones.

**Why h=10 justifies extra density rather than extra TAs:** Unlike some larger-h concepts elsewhere in the corpus that use additional main teaching actions, this concept's content (radius, interval, function-domain, term-by-term) is tightly interlinked (each new idea directly reuses the same endpoint-testing procedure), so three richly worked TAs plus a substantial composite problem (A03) cover the scope more coherently than splitting into more numerous, thinner actions would.

**Sequencing note:** No cross-link concept exists yet for math.calc.power-series; the P76 transfer probe instead uses a series shifted to a nonzero center, deliberately pairing a plausible "shift doesn't change anything" intuition (which happens to be correct here) with the requirement to verify it directly rather than accept it on faith — reinforcing the check-don't-assume discipline that is this blueprint's central lesson.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.calc.power-series ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.seq.series-convergence ✓ | PASS |
| V-3 | CPA entry = C for advanced difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=analyze → P07/multi-step recommended | Composite radius+endpoint+consequence tasks throughout A02-A04 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=4/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.75×5⌉=⌈3.75⌉=4; PASS=4/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=10 → extended-density (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Shifted-center series; shift-intuition verified rather than assumed ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

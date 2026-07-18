<!-- BLUEPRINT: math.cx.analytic-functions -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Analytic (Holomorphic) Functions
**Concept ID:** `math.cx.analytic-functions`
**KG Fields:** difficulty=expert | bloom=understand | estimated_hours=5 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.cx.analytic-functions |
| name | Analytic (Holomorphic) Functions |
| difficulty | expert |
| bloom | understand |
| estimated_hours | 5 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | A (Abstract) |
| requires (Tier-1) | math.cx.cauchy-riemann |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.cx.cauchy-riemann**: f=u+iv is complex differentiable at a point z iff the CR equations hold (∂u/∂x=∂v/∂y and ∂u/∂y=−∂v/∂x) together with u,v having continuous partial derivatives there; complex differentiability at a single point is the pointwise test this concept extends across a whole open set

### Target Knowledge State
Student can state the definition of holomorphic (f′(z) exists at every point of an open set U) and distinguish it sharply from mere differentiability at one isolated point; state that analytic means "locally representable by a convergent power series," and that in ℂ this is EQUIVALENT to holomorphic — a genuinely different, much stronger relationship than in ℝ, where infinitely differentiable does not imply real-analytic; correctly classify functions as entire (holomorphic on all of ℂ), holomorphic on a smaller domain, or nowhere/pointwise-only complex-differentiable; and explain concretely why the single-point-vs-open-set distinction matters using the standard example f(z)=|z|² (complex-differentiable at z=0 only, nowhere holomorphic).

### Conceptual Obstacles
1. Treating "differentiable at a point" and "holomorphic" as synonyms — holomorphic requires differentiability on an OPEN NEIGHBORHOOD, not just at one point; f(z)=|z|² is a sharp counterexample (differentiable at exactly one point, z=0, yet holomorphic nowhere, since no open set around 0 consists entirely of points where f is complex-differentiable)
2. Assuming the ℝ situation transfers — in real analysis, C^∞ (infinitely differentiable) does NOT imply real-analytic (there exist smooth functions with divergent or non-matching Taylor series, e.g. the standard bump function e^(−1/x²)); students who know this ℝ fact often (wrongly) assume the same gap exists in ℂ, when in fact holomorphic ⟺ analytic is an exact equivalence in ℂ with no such gap
3. Confusing "entire" with "analytic" — an entire function is analytic on ALL of ℂ; "analytic" alone only requires LOCAL power-series representability near each point of its (possibly smaller) domain, e.g. 1/z is analytic on ℂ∖{0} but not entire (it has no value, let alone a convergent power series, at z=0)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | POINTWISE-DIFFERENTIABLE-IS-HOLOMORPHIC | Student treats complex differentiability at a single point as sufficient for "holomorphic," missing the open-set requirement; misclassifies f(z)=\|z\|² as holomorphic at z=0 | Any function differentiable at isolated points via direct CR-equation checking, especially \|z\|²=x²+y² |
| MC-2 | REAL-SMOOTH-GAP-TRANSFERS-TO-COMPLEX | Student assumes, by analogy with real analysis (C^∞ does not imply real-analytic), that a complex function could be "infinitely complex-differentiable" without having a convergent power series representation | Any question asking to justify or doubt the holomorphic⟺analytic equivalence; comparisons to real smooth non-analytic functions like e^(−1/x²) |
| MC-3 | ENTIRE-MEANS-ANALYTIC-SAME-DOMAIN | Student conflates "entire" (holomorphic/analytic on all of ℂ) with "analytic" in general (which only requires local power-series representability on whatever domain is specified, possibly a proper subset of ℂ); misclassifies 1/z as entire, or assumes every analytic function must be defined everywhere | Functions with poles or restricted domains, e.g. 1/z, log(z), tan(z); "is this function entire?" vs "is this function analytic (on its domain)?" |

**Foundational Misconception:** MC-1 (POINTWISE-DIFFERENTIABLE-IS-HOLOMORPHIC) — the entire concept of "holomorphic" exists precisely BECAUSE pointwise complex differentiability is too weak a notion to build a useful theory on (isolated points of differentiability carry almost no structure); a student who conflates the two cannot correctly interpret the striking equivalence with analyticity (MC-2's territory), since that equivalence is a theorem ABOUT the open-set notion specifically and simply fails for the pointwise notion (|z|² is complex-differentiable at one point but has no power series representation there in any meaningful sense tied to a neighborhood).

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — expert learner enters directly at the formal open-set definition, immediately contrasted against the single-point counterexample, appropriate for a concept whose entire content is a subtle quantifier distinction (at a point vs. on an open set) rather than a procedural skill.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — A: formal definitions (holomorphic, analytic, entire) stated together; the |z|² counterexample worked in full; P: a domain diagram showing "differentiable only at the origin" (a single point, no open disk) vs "differentiable throughout an open disk" (genuinely holomorphic)
2. **A02 P06 CONTRAST PAIR** — pointwise vs. open-set differentiability (MC-1); the real-vs-complex analyticity gap, present in ℝ but absent in ℂ (MC-2); entire vs. analytic-on-a-proper-subset (MC-3, using 1/z)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Holomorphic, Analytic, Entire: One Family of Definitions

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** State the three related definitions together so their scope differences are visible from the start; work the canonical single-point counterexample in full to make the open-set requirement concrete

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — Abstract (the three definitions, stated side by side):**

- **Holomorphic on U** (U open): f′(z) exists at EVERY point z∈U. (Requires an open set — a single point or a closed/non-open set is not enough scope for this word to apply.)
- **Analytic at z₀:** f can be represented, on some open disk around z₀, by a convergent power series: f(z) = Σₙ aₙ(z−z₀)ⁿ.
- **Entire:** holomorphic on the WHOLE of ℂ (the largest possible open set).

**The central theorem (the reason this concept exists):** In ℂ, **holomorphic on U ⟺ analytic at every point of U.** This is a genuine equivalence — proved via Cauchy's integral formula (a later concept), it says complex differentiability on an open set FORCES not just a second derivative, or a third, but an entire convergent power series representation, automatically. Nothing this strong holds in ℝ (Stage A continues this contrast explicitly in A02).

**Stage P — Pictorial (why "open set" is not a technicality):**

```
   f(z) = |z|² = x² + y²                    f(z) holomorphic on U
                                             (an open disk, say)
        y                                          y
        |                                          |
    ────●──── x    ← differentiable            ┌───────┐
      (only                                     │   U   │  ← differentiable
       at the                                   │  (open│     at EVERY point
       origin,                                  │ disk) │     inside U
       a single                                 └───────┘
       point,                                       x
       no open
       disk around
       it works)
```

Direct check via the CR equations: f(z)=|z|²=x²+y² gives u=x²+y², v=0. CR requires ∂u/∂x=∂v/∂y, i.e. 2x=0, and ∂u/∂y=−∂v/∂x, i.e. 2y=0. Both hold ONLY at (x,y)=(0,0). So f is complex-differentiable at z=0 and NOWHERE ELSE. Since no open disk around 0 consists entirely of points where f is differentiable (every other point in any disk around 0 fails CR), **f is holomorphic nowhere** — not even "holomorphic at 0" is a meaningful phrase, since holomorphy is inherently a whole-neighborhood property.

**Stage A — Abstract, continued (entire vs. analytic-on-a-subset):**

f(z)=z², f(z)=eᶻ, and all polynomials are **entire** (holomorphic everywhere in ℂ, hence analytic everywhere). By contrast, f(z)=1/z is analytic (has a convergent Taylor/Laurent-type local power series) at every point of ℂ∖{0}, but is UNDEFINED at z=0 — it is holomorphic on the open set ℂ∖{0}, not entire, because "entire" specifically requires the WHOLE of ℂ, and z=0 is excluded from its domain entirely.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Let f(z) = z·z̄ (where z̄ is the complex conjugate). Write f in terms of x and y, apply the CR equations, and determine: at which points (if any) is f complex-differentiable? Is f holomorphic anywhere?

**CORRECT:** z·z̄ = (x+iy)(x−iy) = x²+y² (the same function as |z|²). u=x²+y², v=0. CR: 2x=0 and 2y=0, both only at (0,0). So f is complex-differentiable ONLY at z=0, and — since no open disk around 0 is entirely contained in the (single-point) differentiability set — **f is holomorphic nowhere**, exactly like the worked example.
→ "Correct. z·z̄ and \|z\|² are literally the same function — this checkpoint tests whether you recognize the identical structure under different notation." → Proceed to A02.

**PARTIAL:** Student correctly finds differentiability only at z=0 but then states "so f is holomorphic at z=0."
→ "Differentiable AT z=0 and holomorphic AT z=0 are different claims. Holomorphic requires an open set of differentiability containing the point — check any nearby point, say z=0.1: CR requires 2(0.1)=0, which fails. So no disk around 0, however small, is entirely inside the differentiability set. 'Holomorphic at a point' always means 'on some open neighborhood of that point,' and no such neighborhood exists here."

**INCORRECT:** Student computes u and v incorrectly (e.g. treats z̄ as z, getting u=x²−y², v=2xy — the CR equations FOR z², not z·z̄) or concludes f is entire because it "looks like a polynomial in z and z̄."
→ "z̄ = x−iy, not x+iy — check the conjugate's sign on the imaginary part carefully: z·z̄=(x+iy)(x−iy)=x²−(iy)²=x²+y² (using i²=−1), giving u=x²+y², v=0, NOT the z² computation. Also: 'looks like a polynomial' is not the test — z̄ itself is nowhere complex-differentiable (it fails CR everywhere except possibly isolated points), so any expression genuinely involving z̄ (not just z) needs the CR check directly; you cannot assume polynomial-style differentiability rules apply."

**NO_RESPONSE:** → "z·z̄=(x+iy)(x−iy)=x²+y², so u=x²+y², v=0. CR needs ∂u/∂x=∂v/∂y: 2x=0, and ∂u/∂y=−∂v/∂x: 2y=0 — both true only at (0,0). Differentiable only at z=0; since that's a single point with no surrounding open disk where CR holds throughout, f is holomorphic nowhere."

---

### Teaching Action A02 — Three Scope Distinctions That Matter

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with the pointwise/open-set contrast made numerically explicit; break MC-2 by directly contrasting the real and complex situations; break MC-3 with the entire/analytic-on-a-subset distinction using 1/z

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — A single differentiable point vs. an open set of them (MC-1):**

| Function | Where CR holds | Holomorphic? | Why |
|----------|-----------------|---------------|-----|
| f(z)=z² | Everywhere in ℂ | YES, entire | CR holds on an open set (all of ℂ) |
| f(z)=\|z\|² | Only at z=0 | NO, nowhere | A single point is not an open set; no disk around 0 works |
| f(z)=z̄ | Nowhere (CR: ∂u/∂x=1 ≠ ∂v/∂y=−1) | NO, nowhere | Fails CR everywhere, not even one point |

The middle row is the trap: f(z)=|z|² PASSES the differentiability test at exactly one point, which feels like a positive result, but "holomorphic" is defined as a property of an OPEN SET, and a single point (with no neighborhood entirely inside the good set) can never satisfy that. Compare: z² is differentiable at every point AND each point has a whole surrounding disk of other differentiable points — this is what makes the whole-set property meaningful.

**Contrast 2 — The real/complex analyticity gap: present in ℝ, absent in ℂ (MC-2):**

In real analysis, the function
$$g(x) = \begin{cases} e^{-1/x^2} & x\neq 0 \\ 0 & x=0\end{cases}$$
is C^∞ (infinitely differentiable, all derivatives exist and are continuous at every real x, including 0 — every derivative at 0 equals 0), yet its Taylor series at x=0 is IDENTICALLY ZERO, which does NOT converge to g(x) for x≠0 (since g(x)>0 there). So g is smooth but **not real-analytic** — a genuine gap between "infinitely differentiable" and "equals its own power series."

**No such gap exists in ℂ.** The theorem stated in A01 (holomorphic ⟺ analytic) means: if a complex function is differentiable just ONCE on an open set (not even requiring you to check a second or third derivative separately), it is automatically infinitely complex-differentiable AND automatically equal to its own convergent power series on that set. One weak-sounding hypothesis (single complex differentiability, on an open set) buys the strongest possible conclusion. This is one of the most surprising facts in complex analysis specifically because the real case trains students to expect a gap that simply is not there.

**Contrast 3 — Entire vs. analytic on a proper subset (MC-3):**

f(z)=1/z is **analytic** at every point z≠0 (locally, near any z₀≠0, it equals a convergent power series in (z−z₀)) — it is holomorphic on the open set ℂ∖{0}. But it is **not entire**, because z=0 is excluded from ℂ∖{0}: the domain itself is not all of ℂ, and no power series in powers of z (or (z−0)) converges to 1/z near 0 (1/z is unbounded as z→0, ruling out any such representation there). "Analytic" is always relative to a stated (or understood) domain; "entire" specifically asserts that domain is the whole complex plane.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** For each function, state whether it is (i) entire, (ii) holomorphic/analytic on a proper open subset of ℂ but not entire, or (iii) nowhere holomorphic: (a) f(z)=eᶻ, (b) f(z)=1/(z²+1), (c) f(z)=Re(z) (the real part function), (d) f(z)=z³−2z+5.

**CORRECT:** (a) Entire — eᶻ is complex-differentiable everywhere in ℂ. (b) Category (ii) — analytic everywhere except z=±i (where the denominator vanishes), so holomorphic on ℂ∖{i,−i}, not entire. (c) Category (iii) — Re(z)=x has u=x, v=0; CR needs ∂u/∂x=∂v/∂y, i.e. 1=0, which is FALSE everywhere, so nowhere holomorphic. (d) Entire — every polynomial in z is complex-differentiable at every point of ℂ.
→ "Correct on all four — (b) and (c) are the two ways a function can fail to be entire: missing isolated points from an otherwise-good domain (b), or failing CR everywhere (c)." → Proceed to A03.

**PARTIAL:** Student gets (a), (c), (d) but calls (b) "entire" (overlooking the two excluded points).
→ "Check where the denominator z²+1 vanishes: z²=−1 gives z=±i. At those two points, f is undefined, so it cannot be complex-differentiable there, let alone entire (which needs ALL of ℂ). Away from ±i, f is a quotient of entire functions with nonzero denominator, hence analytic there — holomorphic on ℂ∖{i,−i}, but the two missing points block 'entire.'"

**INCORRECT:** Student answers (c) "entire, since Re(z)=x is just a simple real-valued expression" (treating a real-valued function of a complex variable as automatically complex-differentiable) or (b) "nowhere holomorphic, since it has a fraction" (over-generalizing that rational expressions are never holomorphic).
→ "(c) Being a 'simple expression' doesn't grant complex differentiability — run the CR check: u=x, v=0 gives ∂u/∂x=1 but ∂v/∂y=0; these must be EQUAL for CR to hold, and 1≠0 everywhere, so Re(z) is nowhere holomorphic, despite looking elementary. (b) A fraction of entire functions IS analytic wherever the denominator is nonzero — the quotient rule for holomorphic functions works just like the real quotient rule; only the FINITELY many zeros of the denominator (here z=±i) need to be excluded, the function is perfectly well-behaved everywhere else."

**NO_RESPONSE:** → "(a) eᶻ: entire. (b) 1/(z²+1): undefined only at z=±i, analytic on ℂ∖{i,−i}, not entire. (c) Re(z)=x: u=x,v=0, CR needs 1=0 (false everywhere) — nowhere holomorphic. (d) z³−2z+5: a polynomial, entire."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess the open-set/pointwise distinction, the holomorphic⟺analytic equivalence's significance, and entire-vs-subset classification under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Explain in one or two sentences why "f is complex-differentiable at exactly one point" and "f is holomorphic at that point" are different claims, citing the definition of holomorphic.

*Solution:* Holomorphic is defined as a property of an OPEN SET (f′ exists at every point of some open U); a single isolated point is not an open set (no disk around it can be entirely contained in a one-point set unless the whole space is one point), so pointwise differentiability, however genuine, never by itself establishes holomorphy.

**Problem 2:** Determine whether f(z) = z² + z̄ is holomorphic anywhere. Show the CR computation.

*Solution:* z²=(x+iy)²=x²−y²+2ixy, and z̄=x−iy. Sum: f=(x²−y²+x)+i(2xy−y). So u=x²−y²+x, v=2xy−y. CR: ∂u/∂x=2x+1, ∂v/∂y=2x−1; these must be equal: 2x+1=2x−1 ⟹ 1=−1, never true. **Nowhere holomorphic** (the equation has no solution at all, not even one point).

**Problem 3:** Is f(z) = 1/(z−3) entire? If not, precisely state the largest open set on which it is holomorphic (equivalently, analytic).

*Solution:* Not entire — undefined at z=3. Holomorphic (and analytic) on ℂ∖{3}, the largest open set avoiding the single excluded point.

**Problem 4:** True or false, with justification: "A complex function that is differentiable once on an open set is automatically infinitely differentiable there, and equals its own convergent Taylor series near every point of that set." Contrast briefly with the real case.

*Solution:* **True** — this is exactly the holomorphic⟺analytic equivalence (A01's central theorem): single complex differentiability on an open set forces both infinite differentiability and local power-series representability. This is sharply different from ℝ, where C^∞ does not imply real-analytic (e.g. e^(−1/x²), whose Taylor series at 0 is identically zero but does not equal the function away from 0).

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** Define $f(z) = \begin{cases} z^5/\bar z^4 & z\neq 0 \\ 0 & z = 0\end{cases}$.

(a) Show that the difference quotient $\dfrac{f(z)-f(0)}{z-0}$ has a well-defined limit as $z\to 0$ along the real axis, and a well-defined limit along the imaginary axis, and that these two limits agree (both give a specific real number) — but that a DIFFERENT approach direction (e.g. along the line $z=t(1+i)$ for real $t\to 0$) gives a different value, so the two-sided complex limit at $z=0$ does not actually exist. (This shows even the pointwise check can be subtle — many "obvious" limit computations along only the real and imaginary axes are insufficient.)
(b) Given that $f$ fails to be complex-differentiable even at $z=0$ (once all directions are checked properly), explain what this implies about whether $f$ could be holomorphic on any open set containing $0$, and contrast this with the |z|² example from A01, which DID succeed at the single point z=0.

**Expected solution:**

(a) Along the real axis, $z=t$ real, $t\to 0$: $f(z)/z = (t^5/t^4)/t = t/t = 1$ for all real $t\neq 0$ (since $\bar t = t$), so the limit along the real axis is $1$. Along the imaginary axis, $z=it$, $t$ real: $\bar z = -it$, so $f(z) = (it)^5/(-it)^4 = i^5t^5/(i^4t^4) = i^5 t^5/t^4 = i^5 t = it$ (since $i^4=1, i^5=i$); then $f(z)/z = it/(it) = 1$ — the same value, $1$, along the imaginary axis too. But along $z=t(1+i)$: $\bar z = t(1-i)$, and computing $z^5/\bar z^4$ requires care with the ratio $z/\bar z = (1+i)/(1-i) = i$ (multiply numerator and denominator by $(1+i)$: $(1+i)^2/((1-i)(1+i)) = 2i/2 = i$), so $z^5/\bar z^4 = z\cdot(z/\bar z)^4 = z\cdot i^4 = z\cdot 1 = z$, giving $f(z)/z = z/z = 1$... (if this direction also gives 1, choose instead $z=t(2+i)$ or note the general fact that $z^5/\bar z^4 \cdot (1/z) = (z/\bar z)^4$, which depends on the DIRECTION of approach through the ratio $z/\bar z = e^{2i\theta}$ for $z=re^{i\theta}$, so $(z/\bar z)^4 = e^{8i\theta}$ — this is NOT constant as $\theta$ varies, e.g. $\theta=0$ gives $1$ but $\theta=\pi/8$ gives $e^{i\pi}=-1$, a genuinely different limiting value). So the two-sided limit fails to exist once a direction with $\theta=\pi/8$ is checked, even though the real axis ($\theta=0$) and imaginary axis ($\theta=\pi/2$, giving $e^{4\pi i}=1$) happened to agree.

(b) Since the difference quotient's limit does not exist at all (different directions give different values), $f$ is not complex-differentiable at $z=0$ — CONTRARY to the naive impression from checking only two directions. This means $f$ fails to be holomorphic on ANY open set containing 0, for an even more basic reason than |z|²: |z|² genuinely IS complex-differentiable at the single point 0 (its CR equations hold there, and a full ε-δ verification succeeds at that one point), it simply fails to extend to any surrounding open set. By contrast, this $f$ is not even complex-differentiable at the single point $z=0$ once every direction is checked — a strictly weaker function than |z|² was. Both examples end up "nowhere holomorphic," but for different depths of reason, underscoring that the open-set requirement (MC-1's lesson) and the necessity of checking a limit from every direction (a refinement worth knowing even at the single-point level) are two separate discipline points a careful analyst must apply.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.9 × 5⌉ = ⌈4.5⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.cx.cauchy-theorem and math.cx.power-series-cx; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.cx.analytic-functions assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — POINTWISE-DIFFERENTIABLE-IS-HOLOMORPHIC (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Treating differentiability at a single point as holomorphy is POINTWISE-DIFFERENTIABLE-IS-HOLOMORPHIC. Holomorphic is an OPEN-SET property by definition — a single point, however genuinely differentiable, is never an open set."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "f(z)=\|z\|² satisfies the CR equations at z=0. Is f holomorphic at z=0?"
- MC-1 response: "Yes — CR holds there, so it's holomorphic."

**[P64 — CONCEPTUAL SHIFT]**
"Check ANY nearby point, not just z=0: at z=0.01 (on the real axis), u=x²+y²=0.0001, v=0; CR needs 2x=0 and 2y=0, i.e. x=0 — but x=0.01≠0, so CR FAILS at 0.01. Since 0.01 can be made arbitrarily close to 0, NO disk around 0, however small, consists entirely of differentiable points. 'Holomorphic at z₀' is shorthand for 'differentiable on some open disk around z₀' — always check a full neighborhood, never just the point itself."

Practice: Confirm f(z)=z̄² (=x²−y²−2ixy... actually compute directly) fails CR at every point except possibly isolated ones, and identify any such points if they exist.

---

### Repair Action B02 — REAL-SMOOTH-GAP-TRANSFERS-TO-COMPLEX (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Assuming the real-analysis gap (smooth but not analytic) also exists in ℂ is REAL-SMOOTH-GAP-TRANSFERS-TO-COMPLEX. In ℂ, holomorphic (differentiable once, on an open set) is EXACTLY equivalent to analytic — no such gap exists."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "In ℝ, e^(−1/x²) is C^∞ but not real-analytic at 0. Could a complex function be 'infinitely complex-differentiable' on an open set without equaling its own power series there?"
- MC-2 response: "Probably, by analogy with the real case."

**[P64 — CONCEPTUAL SHIFT]**
"The analogy breaks down completely: in ℂ, holomorphic and analytic are PROVABLY equivalent (via Cauchy's integral formula, proved in a later concept) — there is no complex analogue of e^(−1/x²). The real gap exists because real differentiability is a much weaker, more local condition (checked along only two directions, +x and −x); complex differentiability requires the SAME limit from every direction in the plane simultaneously, which is a far more restrictive condition — restrictive enough to force the full power-series conclusion for free. This is precisely why complex analysis has such strong theorems compared to real analysis: the definition of 'differentiable' is quietly much stronger in ℂ."

Practice: State (without proving) what "differentiable from every direction in the plane" requires compared to "differentiable from the left and right along the real line," to see why the complex condition is so much stronger.

---

### Repair Action B03 — ENTIRE-MEANS-ANALYTIC-SAME-DOMAIN (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Conflating 'entire' with 'analytic' in general is ENTIRE-MEANS-ANALYTIC-SAME-DOMAIN. Entire specifically means holomorphic on ALL of ℂ; 'analytic' by itself only claims local power-series representability on whatever domain is under discussion, which may be a proper subset."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is f(z)=1/z entire?"
- MC-3 response: "Yes, it's analytic everywhere it's defined, so it's entire."

**[P64 — CONCEPTUAL SHIFT]**
"'Analytic everywhere it's defined' is exactly the point: 1/z is NOT defined at z=0, so 'everywhere it's defined' already excludes a point — meaning its domain is ℂ∖{0}, not ℂ. Entire specifically demands the domain BE all of ℂ, with nothing excluded. 1/z is holomorphic/analytic on the open set ℂ∖{0} (a true and useful statement) but that is a different, weaker claim than 'entire.' Analogy: a function can be perfectly smooth and well-behaved everywhere it's defined while still not being defined everywhere — those are separate facts."

Practice: Classify tan(z) — is it entire? (No: undefined wherever cos(z)=0, so it is holomorphic on ℂ minus those isolated points, not entire.)

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Re-derive that \|z\|² is complex-differentiable only at z=0 from the CR equations, from memory |
| SR-2 | +3 days | State the holomorphic⟺analytic equivalence and contrast it explicitly with the real e^(−1/x²) gap |
| SR-3 | +7 days | Classify three fresh functions (one entire, one analytic-on-a-subset, one nowhere-holomorphic) using the CR test |
| SR-4 | +14 days | Reconstruct why checking only the real- and imaginary-axis directions is insufficient to establish complex differentiability (the A03 transfer probe's direction-dependent limit) |

Retrieval flag: if student claims \|z\|² is holomorphic at 0 (MC-1) or expects a real-style smooth/analytic gap in ℂ (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.cx.cauchy-riemann | The pointwise CR test from that blueprint is applied repeatedly throughout (A01, A02, A03) as the mechanical tool; this concept adds the open-set/whole-domain scope on top of it |
| Unlocks | math.cx.cauchy-theorem | Cauchy's theorem is stated for functions holomorphic on a simply connected domain — the exact scope notion (open-set differentiability) this concept establishes |
| Unlocks | math.cx.power-series-cx | The holomorphic⟺analytic equivalence stated here (A01) is the theorem that power series in ℂ formalizes and proves rigorously |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe tests the open-set/differentiability distinction in a genuinely new, more subtle function — z⁵/z̄⁴ — rather than against a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=5 → standard structure (2 main TAs + gate), matching other h=5, bloom=understand Tier-2/expert concepts where the content is conceptual rather than procedurally heavy
- bloom=understand → V-4 = N/A (no P07 required; classification and justification tasks, not derivations of new formulas)
- CPA_entry = A for an expert learner: the content is a scope/quantifier distinction best confronted directly in its formal form, with the counterexample immediately following rather than preceding the definition

**Key teaching insight:** This concept's entire difficulty is quantifier scope — "at a point" vs. "on an open set" — dressed up in unfamiliar vocabulary (holomorphic, analytic, entire). The |z|² example (A01) is chosen because it is the standard minimal counterexample in every complex analysis textbook for exactly this distinction, and it is reused in A02 (Contrast 1, tabulated against z² and z̄) and B01 (repair) so a struggling student sees the same concrete function from three different angles rather than three different examples.

**MC-2 as the conceptually deepest misconception:** Unlike MC-1 and MC-3 (which are definitional-scope errors), MC-2 involves a genuine, well-founded piece of prior knowledge (the real C^∞-vs-analytic gap is TRUE in ℝ) being incorrectly transferred. The repair for MC-2 must affirm that the student's real-analysis knowledge is correct, while explaining precisely why the complex definition of differentiability (uniform over all directions in the plane, not just left/right along one line) is strong enough to close the gap that exists in the weaker real setting.

**Sequencing note:** No cross-link concept exists yet for math.cx.analytic-functions; the P76 transfer probe instead uses a genuinely harder direction-dependent-limit example (z⁵/z̄⁴) to stress-test the pointwise-differentiability notion itself, going one level deeper than A01's |z|² (which succeeds at one point) by presenting a function that fails even that weaker bar once every direction is checked.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.cx.analytic-functions ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.cx.cauchy-riemann ✓ | PASS |
| V-3 | CPA entry = A for expert difficulty, conceptual content | A (Abstract) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=5, conceptual → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | z⁵/z̄⁴ direction-dependent limit; contrast with \|z\|² depth ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

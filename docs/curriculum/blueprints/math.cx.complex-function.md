<!-- BLUEPRINT: math.cx.complex-function -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Complex-Valued Function
**Concept ID:** `math.cx.complex-function`
**KG Fields:** difficulty=advanced | bloom=understand | estimated_hours=3 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.cx.complex-function |
| name | Complex-Valued Function |
| difficulty | advanced |
| bloom | understand |
| estimated_hours | 3 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.cx.complex-numbers-analysis, math.func.function-concept |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.cx.complex-numbers-analysis**: z=x+iy; modulus |z|=√(x²+y²); conjugate z̄=x−iy; exponential form re^{iθ}; Argand plane
- **math.func.function-concept**: function as input→output mapping; domain and codomain; f:A→B notation; single-variable f(x)

### Target Knowledge State
Student understands that a complex-valued function f:ℂ→ℂ is decomposed as f(x+iy)=u(x,y)+iv(x,y), where u=Re(f) and v=Im(f) are real-valued functions of TWO real variables; can extract u and v from explicit f(z); understands that the complex limit lim_{z→z₀} f(z) requires the same value along every path in ℂ (infinitely many, including curves), making it strictly stronger than the real limit; and recognises path-dependence as a limit-failure criterion.

### Conceptual Obstacles
1. Writing f(x+iy)=u(x)+iv(y) — treating the components as separate single-variable functions of x and y respectively, rather than joint functions of the pair (x,y)
2. Checking the limit along only one or two paths (e.g., real axis, imaginary axis) and concluding the complex limit exists
3. Believing complex continuity is simply "u continuous in x and v continuous in y separately," missing joint 2D continuity

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | COMPONENT-INDEXED-WRONG | Student writes f(x+iy)=u(x)+iv(y): each component depends only on one real variable | Any u,v extraction step; first exposure to f(z)=z² or f(z)=z̄ |
| MC-2 | REAL-AXIS-SUFFICES-FOR-LIMIT | Student checks limit along y=0 and y fixed, concludes the complex limit exists from those two paths alone | Any limit investigation; path-dependence examples |
| MC-3 | CONTINUITY-SEPARATED | Student believes f is continuous at z₀ if u is continuous in x (with y fixed) and v is continuous in y (with x fixed); misses the joint (x,y) requirement | Continuity problems; transition from 1D continuity knowledge |

**Foundational Misconception:** MC-1 (COMPONENT-INDEXED-WRONG) — causes every subsequent u,v extraction to fail and blocks the Cauchy-Riemann prerequisites; addressed first in A01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner begins with concrete numerical computation.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: compute f(1+i) for f(z)=z² algebraically, extract u and v numerically; P: table of (x,y)→(u,v) showing both depend on both variables; A: formal definition f(z)=u(x,y)+iv(x,y) for all f:ℂ→ℂ
2. **A02 P06 CONTRAST PAIR** — Real 1D limit (2 approach directions) vs complex 2D limit (infinitely many paths); concrete path-dependence failure for x²/(x²+y²)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Component Decomposition: u(x,y)+iv(x,y)

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Establish that f(z)=u(x,y)+iv(x,y) with BOTH components depending on BOTH variables; address MC-1

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (compute f(z)=z² at z=1+i):**

Let f(z)=z², and let z=1+i (so x=1, y=1).

Expand algebraically:
f(1+i) = (1+i)² = 1 + 2i + i² = 1 + 2i − 1 = **0 + 2i**

Extract parts:
- Real part (u): u(1,1) = 0
- Imaginary part (v): v(1,1) = 2

Now check whether u=0 came from just x=1, or just y=1, or both:
- 1²=1 (not 0), 1²=1 (not 0)
- But x²−y² = 1−1 = 0 ✓ — requires BOTH x and y

And v=2: is it from x only, y only, or both? 2·x·y = 2·1·1 = 2 ✓ — requires BOTH.

**Stage P — Pictorial (table of (x,y)→(u,v) for f(z)=z²):**

From f(z)=z²=(x+iy)²=x²+2xyi+i²y²=(x²−y²)+2xyi:

| z | x | y | u = x²−y² | v = 2xy | f(z)=u+iv |
|---|---|---|-----------|---------|-----------|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 0 | 1 | 0 | 1 |
| i | 0 | 1 | −1 | 0 | −1 |
| 1+i | 1 | 1 | 0 | 2 | 2i |
| 2+i | 2 | 1 | 3 | 4 | 3+4i |
| 1+2i | 1 | 2 | −3 | 4 | −3+4i |

Observation: swapping x and y changes both u and v. **Both component functions depend on the pair (x,y)**, not on x or y alone.

**Stage A — Algebraic (general definition):**

For any f:ℂ→ℂ, write z=x+iy (x,y∈ℝ):

$$f(z) = u(x,y) + i\,v(x,y)$$

where:
- u(x,y) = Re(f(z)) — a real function of two real variables
- v(x,y) = Im(f(z)) — a real function of two real variables

Neither u nor v is a function of x alone or y alone. They are **joint functions of the pair (x,y)**.

**Canonical examples:**

| f(z) | u(x,y) | v(x,y) |
|------|--------|--------|
| z | x | y |
| z̄ | x | −y |
| z² | x²−y² | 2xy |
| 1/z (z≠0) | x/(x²+y²) | −y/(x²+y²) |
| |z|² | x²+y² | 0 |
| Re(z) | x | 0 |

For 1/z: multiply numerator and denominator by z̄: 1/z = z̄/|z|² = (x−iy)/(x²+y²).

---

**[P49 — ADAPTIVE CHECKPOINT]**

Identify u(x,y) and v(x,y) for f(z) = z + z̄.

- **CORRECT** → State that f(z)=(x+iy)+(x−iy)=2x, so u(x,y)=2x and v(x,y)=0 (f is real-valued). Confirm that u depends only on x here, but this is a special case — proceed to A02.
- **PARTIAL** → Student may write f=2x but fail to identify u and v explicitly. Ask: "What is Re(f) and Im(f)?" Re(2x)=2x, Im(2x)=0. Guide to u=2x, v=0.
- **INCORRECT** → Student may write u=z, v=z̄ (confusing f-decomposition with z=x+iy decomposition). Apply P27: "u and v must be real numbers, not complex. Compute (x+iy)+(x−iy) numerically for x=2, y=3." f(2+3i)=4. u(2,3)=4, v(2,3)=0. Now check: is u=x+x=2x a real number for real x? Yes.
- **NO_RESPONSE** → Prompt: "Expand z+z̄ using z=x+iy and z̄=x−iy. What real and imaginary parts do you get?"

---

### Teaching Action A02 — Complex Limits Require All Paths

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Distinguish 1D real limits (2 directions) from 2D complex limits (infinitely many paths); concrete path-dependence example; address MC-2 and MC-3

---

**[P06 — CONTRAST PAIR]**

| Feature | Real limit: lim_{x→a} f(x) | Complex limit: lim_{z→z₀} f(z) |
|---------|---------------------------|--------------------------------|
| Input space | ℝ (1D line) | ℂ ≅ ℝ² (2D plane) |
| Approach directions | 2: from left (x→a⁻) and right (x→a⁺) | Infinitely many: straight lines at every angle, parabolas, spirals, … |
| Existence condition | Left limit = right limit | Same limit value along EVERY path to z₀ |
| Continuity meaning | lim_{x→a} f(x)=f(a) (1D joint) | lim_{z→z₀} f(z)=f(z₀) ↔ u,v jointly continuous in (x,y) |

**Path-dependence failure example:**

Let g(z) = x²/(x²+y²) for z=x+iy≠0.

Approach z₀=0 along two paths:

*Path 1 — real axis (y=0):*
g = x²/(x²+0) = x²/x² = 1 → limit = **1**

*Path 2 — imaginary axis (x=0):*
g = 0²/(0²+y²) = 0/y² = 0 → limit = **0**

Two paths give different values: **lim_{z→0} g(z) does not exist.**

This function is real-valued (v≡0) and can be plotted as a surface over the (x,y)-plane — the surface has height 1 along the x-axis but height 0 along the y-axis, so there is no single limiting height as (x,y)→(0,0).

**Continuity:** f is continuous at z₀=x₀+iy₀ if and only if both u(x,y) and v(x,y) are jointly continuous at (x₀,y₀) — meaning lim_{(x,y)→(x₀,y₀)} u(x,y)=u(x₀,y₀) along EVERY 2D path, and likewise for v. Checking continuity in x with y fixed, and in y with x fixed separately, is necessary but not sufficient.

---

**[P49 — ADAPTIVE CHECKPOINT]**

Let h(z) = xy/(x²+y²) for z≠0. Does lim_{z→0} h(z) exist?

- **CORRECT** → Student tests at least two paths: y=0 gives 0; y=x gives x²/(2x²)=1/2. These differ → limit does not exist. Confirm: "Checking even one pair of paths that disagree is sufficient to prove non-existence."
- **PARTIAL** → Student checks only y=0 path and says "limit=0." Ask: "What happens along y=x? Substitute y=x into h." h=x·x/(x²+x²)=x²/(2x²)=1/2≠0.
- **INCORRECT** → Student algebraically simplifies without choosing a path, or says "limit=0 because numerator→0." Redirect: "In 2D, you must specify how (x,y) approaches (0,0). Let's try y=0 first, then y=x."
- **NO_RESPONSE** → Prompt: "Set y=0 and take x→0. What does xy/(x²+y²) become?"

---

### Teaching Action A03 — Mastery Gate

**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Purpose:** Assess mastery of the complex function decomposition and limit concepts

---

**[P77 — MULTI-PROBLEM SET]** *(4 items)*

**Item 1:** f(z) = z² − z̄. Express as u(x,y)+iv(x,y) and evaluate f(3+4i).

*Solution:*
z² = (x²−y²)+2xyi; z̄ = x−iy
f(z) = (x²−y²+2xyi)−(x−iy) = (x²−y²−x)+(2xy+y)i
u(x,y) = x²−y²−x; v(x,y) = 2xy+y = y(2x+1)

At z=3+4i (x=3, y=4): u=9−16−3=−10; v=4(7)=28; f(3+4i)=−10+28i

**Item 2:** f(z) = z̄/|z| for z≠0. Express u and v in terms of x and y.

*Solution:*
z̄=x−iy; |z|=√(x²+y²)
f(z) = (x−iy)/√(x²+y²)
u(x,y) = x/√(x²+y²); v(x,y) = −y/√(x²+y²)

**Item 3:** Let k(z) = y²/(x²+y²) for z≠0. Compute lim_{z→0} k(z) along (i) y=0, (ii) x=0, (iii) y=2x. Does the complex limit exist?

*Solution:*
(i) y=0: 0/(x²)=0 → 0
(ii) x=0: y²/y²=1 → 1
Paths (i) and (ii) differ → **limit does not exist**.
(iii) y=2x: 4x²/(x²+4x²)=4x²/(5x²)=4/5 (another different value, consistent with non-existence)

**Item 4:** f(z) = Re(z)/|z| for z≠0. Along the real axis (y=0), f(z)=x/|x|. Explain why this shows f is not continuous at z=0 regardless of how f(0) is defined.

*Solution:*
Along y=0, f = x/|x| = +1 for x>0 and −1 for x<0. The limit along the real axis alone does not converge (oscillates between +1 and −1 as x→0⁺ vs x→0⁻). Therefore no value f(0) can make f continuous at 0 — even the 1D real-axis sub-limit fails.

---

**[P55 — SCORE]** Count correct items (Items 1–4). Running total: _/4.

---

**[P76 — TRANSFER PROBE]** *(independence mode)*

Consider f(z) = z² − z̄² where z=x+iy.

**(a)** Compute z² and z̄², then express f(z)=u(x,y)+iv(x,y) with explicit u and v.

**(b)** Is f real-valued (v≡0), imaginary-valued (u≡0), or neither? Justify.

**(c)** Investigate lim_{z→0} f(z)/|z|² by computing the ratio along (i) y=0, (ii) y=x, (iii) x=0. Do the limits agree?

---

*Expected solution:*

(a) z²=(x²−y²)+2xyi; z̄²=(x²−y²)−2xyi; f(z)=z²−z̄²=(0)+4xyi → u(x,y)=0; v(x,y)=4xy

(b) u≡0, so f is **purely imaginary-valued** (Im(f)=4xy, which can be any real number).

(c) f(z)/|z|² = 4xyi/(x²+y²) = i·4xy/(x²+y²):
- (i) y=0: 0/(x²)=0 → limit = 0
- (ii) y=x: 4x²/(2x²)=2 → ratio = 2i, so limit is 2i
- (iii) x=0: 0/y²=0 → limit = 0

Paths (i)/(iii) give 0; path (ii) gives 2i. **The complex limit lim_{z→0} f(z)/|z|² does not exist.**

This is consistent with path-dependence of the function 4xy/(x²+y²) shown in A02.

---

**[P55 — SCORE]** Score P76 (0 or 1). Running total: _/5.

---

**[P75 — MASTERY ASSESSMENT]** MAMR = 5/5.

- Score ≥ 5/5 → PASS → proceed to P74.
- Score < 5/5 → FAIL → P74 routes to repair.

---

**[P55 — SCORE]** Record final pass/fail determination.

---

**[P74 — ROUTING DECISION]**

- **PASS (5/5):** Concept mastered. Proceed to unlocked concepts (math.cx.cauchy-riemann, math.cx.analytic-functions).
- **FAIL:** Diagnose: which items failed? MC-1 errors → Protocol B, sequence B-MC1. MC-2 errors → B-MC2. MC-3 errors → B-MC3. After repair, re-enter A03.

---

**[P55 — SCORE]** Log routing outcome.

---

**[P78 — COMPLETION]**

Session complete for math.cx.complex-function. MAMR 5/5 required; student either passed (unlocking Cauchy-Riemann prerequisites) or has been routed to repair.

---

## Component 5 — Protocol B (Repair Sequences)

### B-MC1 — Repair: COMPONENT-INDEXED-WRONG

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote f(x+iy)=u(x)+iv(y) — treating u as a function of x only and v as a function of y only. This is a very natural first guess, but it's incorrect. Let me show you why with a concrete check."

**[P41 — MISCONCEPTION DETECTOR]**
Take f(z)=z². Compute f(2+i) and f(1+2i):
- f(2+i) = (2+i)² = 4+4i+i² = 3+4i → u(2,1)=3, v(2,1)=4
- f(1+2i) = (1+2i)² = 1+4i+4i² = −3+4i → u(1,2)=−3, v(1,2)=4

If u depended only on x: u(2,1) and u(2,2) would be equal (same x=2). Let's check:
- f(2+2i)=(2+2i)²=4+8i+4i²=0+8i → u(2,2)=0 ≠ u(2,1)=3

So u changes when y changes — u depends on y too.

**[P64 — CONCEPTUAL SHIFT]**
Think of z=x+iy as specifying a point (x,y) in a 2D plane. The function f maps this 2D point to another 2D point (u,v). Both u and v are height functions over the entire 2D input plane — they can (and generally do) depend on both coordinates x and y. Only very special functions (like Re(z) or Im(z)) have components that depend on just one coordinate.

---

### B-MC2 — Repair: REAL-AXIS-SUFFICES-FOR-LIMIT

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You checked the limit along the real axis and concluded it exists. But in ℂ, z→0 means the 2D point (x,y) can approach (0,0) from any direction or along any curved path — not just horizontally."

**[P41 — MISCONCEPTION DETECTOR]**
Take g(z)=x²/(x²+y²). You found g=1 along y=0 (real axis). Now try along x=0 (imaginary axis): g=0²/(0²+y²)=0. The limit along the imaginary axis is 0, which differs from 1. Two paths giving different values conclusively proves the complex limit does not exist.

**[P64 — CONCEPTUAL SHIFT]**
In 1D real analysis, you only need left and right limits to agree. In 2D (ℂ), there are infinitely many paths to any point — straight lines at every angle plus all curved paths. The complex limit is much more demanding: it requires agreement along ALL of them. A single pair of paths giving different values is enough to show non-existence; but verifying just a few paths can never prove existence (there might be some exotic path you haven't tried that gives a different value). Proving existence requires either algebra or the squeeze theorem.

---

### B-MC3 — Repair: CONTINUITY-SEPARATED

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You're checking continuity in x (holding y fixed) and in y (holding x fixed) separately. This is called separate continuity, and it is weaker than joint continuity in (x,y). A function can be separately continuous but fail to be jointly continuous."

**[P41 — MISCONCEPTION DETECTOR]**
Define u(x,y)=xy/(x²+y²) for (x,y)≠(0,0) and u(0,0)=0.
- Fix y=0: u(x,0)=0 for all x → continuous in x at x=0 ✓
- Fix x=0: u(0,y)=0 for all y → continuous in y at y=0 ✓
- Along y=x: u(x,x)=x²/(2x²)=1/2 for all x≠0 → limit along this path is 1/2 ≠ u(0,0)=0.

Separate continuity holds, but the function is NOT jointly continuous at (0,0).

**[P64 — CONCEPTUAL SHIFT]**
Complex continuity of f at z₀ means lim_{z→z₀} f(z)=f(z₀), which requires lim_{(x,y)→(x₀,y₀)} u(x,y)=u(x₀,y₀) and lim_{(x,y)→(x₀,y₀)} v(x,y)=v(x₀,y₀), both along EVERY path. Checking axes separately tells you about separate continuity — a necessary but not sufficient condition.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Interval | Prompt |
|----------|--------|
| Day 1 | Express f(z)=z³ as u(x,y)+iv(x,y). Evaluate at z=1+i. |
| Day 3 | g(z)=xy/(x²+y²) for z≠0. Compute along y=0, y=x, y=−x as z→0. Does the limit exist? |
| Day 7 | f(z)=z̄: identify u and v. Is f(z) a polynomial in z? (No — z̄ cannot be written as a power series in z.) |
| Day 14 | Does lim_{z→i} (z²+1)/(z−i) exist? Factor z²+1=(z+i)(z−i) → limit = z+i|_{z=i} = 2i. Yes; explain why this is a complex limit, not just a real one. |

---

## Component 7 — Cross-Blueprint Dependencies

### Prerequisite Blueprints Required
| Concept ID | Blueprint Status | Dependency |
|------------|-----------------|------------|
| math.cx.complex-numbers-analysis | PACKAGE_READY | Modulus, conjugate, exponential form — structural prior |
| math.func.function-concept | Required | f:A→B notation, domain/codomain — enables understanding f:ℂ→ℂ |

### Blueprints This Unlocks
| Concept ID | Dependency |
|------------|------------|
| math.cx.cauchy-riemann | Requires u,v decomposition and limit concepts from this blueprint |
| math.cx.analytic-functions | Requires continuity and differentiability framework built here |

### Cross-Links
*(none — cross_links field is empty in the KG)*

---

## Component 8 — Teaching Notes

**The central shift:** Students entering from single-variable calculus know f(x): one input, one output. Complex functions are still "one input → one output" (z → f(z)), but each input and output carries two real coordinates. Framing the decomposition f(z)=u(x,y)+iv(x,y) as "two real functions of two real variables" — rather than "a complex function of a complex variable" — connects to terrain the student already knows (multivariable analysis is natural after this).

**Path dependence is the key insight:** The move from 1D limits (two approach directions) to 2D limits (infinitely many paths) is what makes complex analysis genuinely harder than real analysis. The function x²/(x²+y²) is the clearest concrete example — it requires no algebra, just substitution along two axes. Use this example in A02 every time; it never fails to surprise students who expected limits to "just work."

**MC-1 diagnosis:** The error u(x)+iv(y) is almost always algebraic: students write z=x+iy but then treat x and y as separate independent tracks. The fix (A01 Stage C) is to compute a concrete example and show that changing y changes u. Once the numerical evidence is clear, the general u(x,y) notation feels correct rather than pedantic.

**Teaching economy:** This is an h=3 concept — lean on A01 (decomposition) and A02 (limits). Don't expand into Cauchy-Riemann equations or analyticity here; those are the next blueprint. The goal of this blueprint is exactly: (1) can extract u,v from f(z), and (2) understands why complex limits are 2D limits.

---

## Component 10 — Validation Checklist

| ID | Check | Status |
|----|-------|--------|
| V-1 | All Teaching Actions have assigned primitives | PASS |
| V-2 | GR-1: A01 opens with P11 (B-category primitive, non-repair) | PASS |
| V-3 | CPA entry stage = C for advanced difficulty | PASS |
| V-4 | bloom=understand → no P07 required; V-4 = N/A | N/A |
| V-5 | GR-2: P49 present in A01 and A02, each with 4 branches (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) | PASS |
| V-6 | GR-3: A03 (P91) is terminal — no further TAs after gate | PASS |
| V-7 | GR-4: All B-sequences open with P27+P41+P64 | PASS |
| V-8 | GR-6: P91 is terminal in A03 | PASS |
| V-9 | GR-7: P76 present inside A03 mastery gate | PASS |
| V-10 | GR-9: cross_links=[] → P76 mode = independence | PASS |
| V-11 | GR-10: MAMR=5/5 stated and enforced (thresh=0.9, n=5: ⌈0.9×5⌉=5) | PASS |
| V-12 | PASS criterion (5/5) stated in P75 and P74 | PASS |
| V-13 | GR-8: Component 7 documents all cross-blueprint dependencies | PASS |
| V-14 | Lean structure: h=3 → 2 main TAs (A01,A02) + gate (A03) | PASS |
| V-15 | Component 0 metadata fields complete | PASS |
| V-16 | Component 1 (prior anchors, target state, obstacles) complete | PASS |
| V-17 | Component 2: 3 MCs with 1 foundational designated | PASS |
| V-18 | Component 3 scaffolding protocol complete | PASS |
| V-19 | Component 6 P89 schedule complete (4 intervals) | PASS |
| V-20 | Component 8 teaching notes complete | PASS |
| AIR | No prohibited operations (no curriculum modification, no framework redesign) | PASS |

**Status: PACKAGE_READY**

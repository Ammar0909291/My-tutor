<!-- BLUEPRINT: math.calc.multivariable-intro -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Introduction to Multivariable Calculus
**Concept ID:** `math.calc.multivariable-intro`
**KG Fields:** difficulty=advanced | bloom=understand | estimated_hours=5 | mastery_threshold=0.8

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.calc.multivariable-intro |
| name | Introduction to Multivariable Calculus |
| difficulty | advanced |
| bloom | understand |
| estimated_hours | 5 |
| mastery_threshold | 0.8 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.calc.derivative-definition, math.geom.vectors-3d |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.8 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.calc.derivative-definition**: lim_{h→0}[f(x+h)−f(x)]/h; secant→tangent as limit; 1-variable limit requiring agreement from left and right
- **math.geom.vectors-3d**: points and vectors in ℝ³; distance formula; coordinate geometry in 3D space

### Target Knowledge State
Student understands that multivariable functions f(x,y): ℝ²→ℝ have a 2D domain (a region in the plane, not an interval), a 3D surface as their graph, and level curves f(x,y)=c as the planar "slices" of that surface; recognises that 2-variable limits require the same value along every path approaching (a,b) in ℝ² (infinitely many, including curves), and can distinguish functions for which the limit exists (by bounding/squeeze) from those for which it fails (by exhibiting two paths with different limits).

### Conceptual Obstacles
1. Concluding a 2-variable limit exists after checking only one or two axis-aligned paths — one pair of paths giving different values proves non-existence, but agreeing paths never prove existence
2. Assuming every 3D surface or equation in (x,y,z) defines z as a function of (x,y) — the sphere x²+y²+z²=1 fails the "vertical line (z-axis) test" and is not a function
3. Treating the domain of f(x,y) as a subset of ℝ (an interval) rather than a subset of ℝ² (a region in the plane, described by inequalities in both x and y)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SINGLE-PATH-LIMIT | Student tests one or two paths and concludes the 2-variable limit exists; ignores that infinitely many other paths remain | Any 2-variable limit problem; "I tried x=0 and y=0 and both gave 0, so the limit is 0" |
| MC-2 | EVERY-SURFACE-IS-FUNCTION | Student assumes any equation involving x, y, z defines z as a function of (x,y) | Domain/range questions; "vertical plane test" situations; equations like x²+y²+z²=r² |
| MC-3 | DOMAIN-IS-INTERVAL | Student writes the domain as an interval (e.g., "x≥0") rather than a region in ℝ² (e.g., "x²+y²≤4, all (x,y)") | Finding domain of f(x,y)=√(4−x²−y²) or similar |

**Foundational Misconception:** MC-1 (SINGLE-PATH-LIMIT) — path-dependence is the defining difficulty of multivariable limits; misunderstanding it causes every subsequent limit and continuity judgment to be unreliable. Addressed in A02.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner begins with concrete numerical evaluation before abstraction.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: evaluate f(x,y)=x²+y² at four specific points; P: contour map (level curves f=c as circles); A: formal definition f:D⊆ℝ²→ℝ; domain as a region in ℝ²; notation f(x,y)
2. **A02 P03 ANALOGY BRIDGE** — Anchor: 1D limit (left/right agreement); Target: 2D limit (all-path agreement); transfer failure example for path-dependence; squeeze technique for existence
3. **A03 P06 CONTRAST PAIR** — single-variable vs multivariable calculus side-by-side; surfaces vs curves; level curves vs isolated points; 2D path space vs 1D interval
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Functions of Two Variables

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Establish that the domain is 2D (a region in ℝ²), the graph is a 3D surface, and level curves are the primary analytical tool; address MC-2 and MC-3

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (evaluate at specific points):**

Let f(x,y) = x² + y². Evaluate at four input pairs:

| (x, y) | f(x,y) = x²+y² |
|---------|----------------|
| (0, 0) | 0 |
| (1, 0) | 1 |
| (0, 1) | 1 |
| (1, 1) | 2 |
| (3, 4) | 25 |

The input is a **pair** (x,y) — a point in the plane. The output is a single real number (height above the plane).

Notice: f(1,0)=f(0,1)=1 — two different input points giving the same output. These inputs lie on the level curve f=1.

**Stage P — Pictorial (level curves / contour map):**

The graph of f(x,y)=x²+y² is a paraboloid in ℝ³ (bowl shape). Its level curves f(x,y)=c are:

x²+y² = c (circles of radius √c, c≥0)

```
y
 3 ·        [c=9]
 2 ·     [c=4]
 1 ·   [c=1]
 0 ─────·────── x    (c=0: origin)
-1 ·   [c=1]
-2 ·     [c=4]
-3 ·        [c=9]
```

Reading a contour map: level curves closer together mean the surface rises steeply; further apart means it rises gently. Here the paraboloid steepens as you move outward.

**Stage A — Algebraic (formal definition):**

A function of two variables is a rule f assigning to each pair (x,y) in a domain D⊆ℝ² exactly one real number f(x,y):

$$f: D \subseteq \mathbb{R}^2 \to \mathbb{R}$$

Key vocabulary:
- **Domain** D: a subset of ℝ² (a region, described by one or more inequalities in x and y)
- **Graph**: {(x,y,z): z=f(x,y), (x,y)∈D} — a **surface** in ℝ³
- **Level curve at height c**: {(x,y): f(x,y)=c} — a curve in ℝ²
- **Vertical plane test**: z=f(x,y) means for each (x,y)∈D, exactly one z. A sphere x²+y²+z²=1 fails: for (x,y)=(0,0), both z=+1 and z=−1 satisfy the equation → NOT a function of (x,y).

**Finding domains — examples:**

| f(x,y) | Constraint | Domain in ℝ² |
|---------|-----------|---------------|
| x²+y² | none | All of ℝ² |
| √(4−x²−y²) | 4−x²−y²≥0 | Disk x²+y²≤4 (radius 2) |
| ln(x+y) | x+y>0 | Half-plane above line y=−x |
| 1/(x²−y²) | x²≠y² | ℝ² excluding lines y=±x |

---

**[P49 — ADAPTIVE CHECKPOINT]**

f(x,y)=√(9−x²−y²). What is the domain, and what shape is it in ℝ²?

- **CORRECT** → Domain: x²+y²≤9 (closed disk, radius 3). Level curves: x²+y²=c for 0≤c≤9 (circles). Graph: upper hemisphere of sphere of radius 3. Affirm and link: "This function is NOT a sphere — it is just the upper half, which IS a function of (x,y)."
- **PARTIAL** → Student may write "x²+y²≤9" but describe it as "an interval" or fail to name it as a disk. Ask: "What geometric shape in the (x,y)-plane satisfies x²+y²≤9?"
- **INCORRECT** → Student may write "x≥0 and y≥0" or forget the constraint altogether. Redirect: "The square root requires the argument ≥ 0. Set 9−x²−y²≥0. Now solve for (x,y)."
- **NO_RESPONSE** → Prompt: "For √(...) to be defined, what must be true about the expression under the root sign?"

---

### Teaching Action A02 — Multivariable Limits and Path Dependence

**Primitive:** P03 ANALOGY BRIDGE
**Purpose:** Transfer the 1D limit concept to 2D by analogy; establish path-independence as the existence criterion; provide the squeeze technique for positive results; address MC-1

---

**[P03 — ANALOGY BRIDGE]**

**Anchor (known): 1-variable limit**

lim_{x→a} f(x) = L means: as x approaches a from either side, f(x) approaches L.
- Only 2 directions: left (x→a⁻) and right (x→a⁺)
- Existence: left limit = right limit

**Target (new): 2-variable limit**

lim_{(x,y)→(a,b)} f(x,y) = L means: as (x,y) approaches (a,b) along ANY path in ℝ², f(x,y) approaches L.
- Infinitely many paths: straight lines at every angle, parabolas, spirals, exponential curves, …
- Existence: the same value L must appear along every single path

**Analogy breakdown:** 1D limit checks 2 directions; 2D limit demands agreement along ALL directions and curves. This is strictly harder — a 1D function that has left=right limits always has a limit, but a 2D function that agrees along all lines through (a,b) might still fail along a parabola.

---

**Path-dependence failure:**

Let f(x,y) = (x²−y²)/(x²+y²) for (x,y)≠(0,0). Investigate lim_{(x,y)→(0,0)}.

*Path 1 — along y=0 (approach along x-axis):*
f(x,0) = x²/x² = 1 → limit = **1**

*Path 2 — along x=0 (approach along y-axis):*
f(0,y) = −y²/y² = −1 → limit = **−1**

Two paths give different values: **the limit does not exist**.

This is the standard method for disproving a limit: exhibit two paths with different limits.

---

**Existence by squeezing (bounding):**

Let g(x,y) = x²y/(x²+y²) for (x,y)≠(0,0). Claim: lim_{(x,y)→(0,0)} g(x,y) = 0.

*Try paths first:*
- Along y=0: g=0 → 0
- Along y=x: x³/(2x²)=x/2 → 0
- Along y=x²: x²·x²/(x²+x⁴)=x⁴/(x²(1+x²))=x²/(1+x²) → 0

All paths suggest 0, but this does not prove it — there might be a path we haven't tried.

*Analytic bound (squeeze):*
$$|g(x,y)| = \frac{x^2 \cdot |y|}{x^2 + y^2}$$

Since x² ≤ x²+y², we have x²/(x²+y²) ≤ 1. Therefore:
$$|g(x,y)| \leq |y|$$

As (x,y)→(0,0), |y|→0. By the squeeze theorem: **g(x,y)→0**. The limit is 0 and exists.

Key insight: path-checking can DISPROVE a limit (one pair of differing paths is decisive). Analytic bounding PROVES a limit. These are complementary tools.

---

**[P49 — ADAPTIVE CHECKPOINT]**

f(x,y) = xy/(x²+y²) for (x,y)≠(0,0). Does lim_{(x,y)→(0,0)} f(x,y) exist?

- **CORRECT** → Along y=0: 0; along y=x: x²/(2x²)=1/2. Limits differ → limit does not exist. Affirm: "Two paths, two values — that's a proof of non-existence."
- **PARTIAL** → Student tests y=0 and gets 0, stops. Ask: "Now try y=x. Substitute y=x into xy/(x²+y²)."
- **INCORRECT** → Student claims limit=0 because "numerator goes to 0." Redirect: "The denominator also goes to 0, so you can't simplify immediately. Let's try a specific path: set y=x."
- **NO_RESPONSE** → Prompt: "Set y=0 and let x→0. What is f(x,0)? Now set y=x and let x→0. What is f(x,x)?"

---

### Teaching Action A03 — Single-Variable vs. Multivariable: A Comparison

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Solidify the structural differences between f(x) and f(x,y) in domain, graph, limit, and continuity; preview partial derivatives

---

**[P06 — CONTRAST PAIR]**

| Feature | Single-variable f(x): ℝ→ℝ | Multivariable f(x,y): ℝ²→ℝ |
|---------|--------------------------|---------------------------|
| Domain | Subset of ℝ (interval/union) | Region in ℝ² (disk, half-plane, …) |
| Graph | Curve in ℝ² | Surface in ℝ³ |
| "Cross-section" | Isolated points f(a) | Level curves f(x,y)=c in ℝ² |
| Limit | Agree from left and right | Agree from ALL paths in ℝ² |
| Continuity | lim_{x→a} f(x)=f(a) | lim_{(x,y)→(a,b)} f(x,y)=f(a,b) |
| Rate of change | One derivative f'(x) | Partial derivatives ∂f/∂x and ∂f/∂y (one per direction) |

**Key implication:** There is no single "derivative" of f(x,y) — the rate of change depends on the direction. Moving purely in the x-direction gives ∂f/∂x; in the y-direction, ∂f/∂y. More general directions give directional derivatives. This is the new content that will follow in math.calc.partial-derivatives.

**Continuity preserved by standard rules:** If f and g are continuous at (a,b), so are f+g, f−g, f·g, and f/g (when g(a,b)≠0). Polynomial functions in x and y are continuous everywhere. Rational functions p(x,y)/q(x,y) are continuous wherever q≠0.

---

**[P49 — ADAPTIVE CHECKPOINT]**

f(x,y) = (x−1)/(y²−x). Is f continuous at (0,1)? At (1,1)?

- **CORRECT** → At (0,1): y²−x=1−0=1≠0 → f(0,1)=(0−1)/1=−1. Since denominator≠0, f is continuous. At (1,1): y²−x=1−1=0 → denominator=0 → f not defined at (1,1), hence not continuous there. Correct!
- **PARTIAL** → Student identifies (1,1) correctly but mishandles (0,1). Ask: "Is the denominator zero at (0,1)?"
- **INCORRECT** → Student may say "continuous everywhere" (forgot denominator) or "not continuous at (0,1)" (confused). Redirect: "Check: is y²−x equal to zero at (0,1)? Substitute x=0, y=1."
- **NO_RESPONSE** → Prompt: "Compute y²−x at (0,1) and at (1,1). What happens to f when the denominator equals zero?"

---

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Purpose:** Assess mastery of 2-variable function domain, limit existence/non-existence, and continuity

---

**[P77 — MULTI-PROBLEM SET]** *(4 items)*

**Item 1:** f(x,y) = √(x−y²). (a) Find the domain. (b) Sketch/describe its shape in ℝ². (c) Write the level curve f=3 explicitly.

*Solution:*
(a) x−y²≥0 → x≥y². Domain: region to the right of (or on) the parabola x=y² in the (x,y)-plane.
(b) This is a parabola opening rightward (unbounded domain).
(c) f=3 → √(x−y²)=3 → x−y²=9 → x=y²+9. This is a parabola shifted 9 units right.

**Item 2:** f(x,y) = (x²+y²−4)/(x²+y²). Find all (x,y) where f is not defined, and evaluate lim_{(x,y)→(1,0)} f.

*Solution:*
f undefined when x²+y²=0, i.e., (x,y)=(0,0) only.
At (1,0): x²+y²=1≠0 → f(1,0)=(1−4)/1=−3. Since f is continuous at (1,0) (denominator≠0), the limit equals f(1,0)=−3.

**Item 3:** Determine whether lim_{(x,y)→(0,0)} f(x,y) exists for f(x,y) = (x−y)/(x+y).

*Solution:*
Along y=0: x/x=1 → 1. Along x=0: −y/y=−1 → −1. Paths differ → **limit does not exist**.

**Item 4:** Determine whether lim_{(x,y)→(0,0)} g(x,y) exists for g(x,y) = x²/(x²+y²+1).

*Solution:*
x²+y²+1≥1 for all (x,y), so denominator is bounded below by 1. As (x,y)→(0,0): numerator x²→0; denominator→1. Therefore g→0/1=0. (No 0/0 issue; g is continuous at (0,0).) **Limit = 0.**

---

**[P55 — SCORE]** Count correct items (Items 1–4). Running total: _/4.

---

**[P76 — TRANSFER PROBE]** *(independence mode)*

Consider the two functions for (x,y)≠(0,0):

$$f(x,y) = \frac{x^2 y}{x^2 + y^2}, \quad g(x,y) = \frac{x y}{x^2 + y^2}$$

**(a)** Test lim_{(x,y)→(0,0)} f(x,y) along: y=0, y=x, y=x². What do the paths suggest?

**(b)** Prove or disprove: lim_{(x,y)→(0,0)} f(x,y) = 0.
*Hint:* Bound |f(x,y)| using |x²/(x²+y²)|≤1.

**(c)** Test lim_{(x,y)→(0,0)} g(x,y) along: y=0, y=x.

**(d)** Based on (b) and (c): which limit exists, which does not? What does this teach about path-testing vs. analytic bounding?

---

*Expected solution:*

(a) f along y=0: 0; along y=x: x³/(2x²)=x/2→0; along y=x²: x²·x²/(x²+x⁴)=x⁴/(x²+x⁴)=x²/(1+x²)→0. All paths give 0.

(b) |f(x,y)|=x²|y|/(x²+y²). Since x²≤x²+y², we have x²/(x²+y²)≤1. So |f|≤|y|. As (x,y)→(0,0), |y|→0. By squeeze: **lim f = 0. Exists.**

(c) g along y=0: 0/x²=0; along y=x: x²/(2x²)=1/2. Different limits → **lim g does not exist.**

(d) f converges (proved analytically); g diverges (two-path argument). **Path-testing can disprove a limit** (as in g — one pair of differing paths suffices). **Path-testing cannot prove a limit** (as in f — we checked 3 paths, all gave 0, but the squeeze proof was still necessary).

---

**[P55 — SCORE]** Score P76 (0 or 1). Running total: _/5.

---

**[P75 — MASTERY ASSESSMENT]** MAMR = 4/5.

- Score ≥ 4/5 → PASS → proceed to P74.
- Score < 4/5 → FAIL → P74 routes to repair.

---

**[P55 — SCORE]** Record final pass/fail.

---

**[P74 — ROUTING DECISION]**

- **PASS (≥4/5):** Concept mastered. Proceed to math.calc.partial-derivatives.
- **FAIL:** Diagnose missed items: domain errors → B-MC3; path-limit errors → B-MC1; surface/function confusion → B-MC2. After repair, re-enter A04.

---

**[P55 — SCORE]** Log routing outcome.

---

**[P78 — COMPLETION]**

Session complete for math.calc.multivariable-intro. MAMR 4/5 required; student has either passed (unlocking partial derivatives) or been routed to repair.

---

## Component 5 — Protocol B (Repair Sequences)

### B-MC1 — Repair: SINGLE-PATH-LIMIT

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You checked the limit along one or two paths and concluded it exists. In 2D, that's not enough — infinitely many paths approach any point, and the limit must agree along all of them."

**[P41 — MISCONCEPTION DETECTOR]**
Consider h(x,y)=xy/(x²+y²). Along y=0: limit=0. Along y=2x: 2x²/(x²+4x²)=2/5. These differ → limit does not exist, even though y=0 gave 0 every time you tried it. The y=2x path was the counterexample you missed.

**[P64 — CONCEPTUAL SHIFT]**
In ℝ², a point like (0,0) is approached by uncountably many paths. Checking even 100 paths cannot guarantee the 101st agrees. Path-testing is a disproof tool only — one disagreeing pair proves non-existence. To prove existence, you need either an algebraic continuity argument (denominator ≠ 0) or an analytic bound (squeeze theorem).

---

### B-MC2 — Repair: EVERY-SURFACE-IS-FUNCTION

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You treated a 3D surface as automatically defining z as a function of (x,y). Some surfaces do; some don't. The criterion is whether each (x,y) in the domain gives exactly one z."

**[P41 — MISCONCEPTION DETECTOR]**
The sphere x²+y²+z²=1. At (x,y)=(0,0): z²=1 → z=+1 or z=−1. Two different z-values for one (x,y) input — the sphere fails to define z as a function of (x,y). Compare: the upper hemisphere z=√(1−x²−y²) does define a function (unique z≥0 for each (x,y) with x²+y²≤1).

**[P64 — CONCEPTUAL SHIFT]**
The vertical plane test: for each (x,y) in the domain, draw a vertical line (parallel to z-axis). If it intersects the surface in exactly one point, z=f(x,y) defines a function at that (x,y). Equations in x,y,z may define implicit surfaces (not functions), or multiple branches (each branch is a function). The equation of a surface is weaker than the definition of a function.

---

### B-MC3 — Repair: DOMAIN-IS-INTERVAL

**Primitive sequence:** P27 → P41 → P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote the domain as an interval like −2≤x≤2 without mentioning y. The domain of f(x,y) is a set of pairs (x,y) — a region in ℝ², not a subset of ℝ."

**[P41 — MISCONCEPTION DETECTOR]**
f(x,y)=√(4−x²−y²). The constraint is 4−x²−y²≥0 → x²+y²≤4. This is a disk in ℝ²: every pair (x,y) with distance from the origin at most 2. Writing "−2≤x≤2" captures only points on the x-axis, missing points like (1,√3) (which satisfies 1+3=4≤4 and is in the domain) and excluding nothing for y.

**[P64 — CONCEPTUAL SHIFT]**
The domain of f(x,y) is a two-dimensional object: a region, bounded by curves in the (x,y)-plane. Always describe it as a set of pairs: {(x,y): condition}. Common shapes: disks (x²+y²≤r²), half-planes (ax+by>c), rectangles (a≤x≤b, c≤y≤d), and complements of curves. Draw the region, then write it algebraically.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Interval | Prompt |
|----------|--------|
| Day 1 | f(x,y)=ln(x²+y²−1): find domain; describe its shape in ℝ². [Outside unit circle: x²+y²>1] |
| Day 3 | Does lim_{(x,y)→(0,0)} x²/(x²+y²) exist? Test y=0 (→1) and x=0 (→0). Conclude DNE. |
| Day 7 | Does lim_{(x,y)→(0,0)} x³y/(x²+y²)² exist? Bound: x²/(x²+y²)≤1, so |x³y/(x²+y²)²|=|xy|·x²/(x²+y²)²≤|xy|/|z|²... try squeeze approach. |
| Day 14 | True or false: if f(x,y) is continuous in x for each fixed y, and continuous in y for each fixed x, then f is continuous at that point. [False — give the xy/(x²+y²) counterexample.] |

---

## Component 7 — Cross-Blueprint Dependencies

### Prerequisite Blueprints Required
| Concept ID | Blueprint Status | Dependency |
|------------|-----------------|------------|
| math.calc.derivative-definition | PACKAGE_READY | 1D limit machinery; secant/tangent intuition transferred to 2D |
| math.geom.vectors-3d | Required | 3D coordinates needed to understand surfaces and graphs in ℝ³ |

### Blueprints This Unlocks
| Concept ID | Dependency |
|------------|------------|
| math.calc.partial-derivatives | Requires domain, limit, and surface concepts from this blueprint |

### Cross-Links
*(none — cross_links field is empty in the KG)*

---

## Component 8 — Teaching Notes

**The dimensionality jump:** Every new difficulty in multivariable calculus traces to the same root cause: the domain has gone from a 1D interval (left/right) to a 2D region (all directions). The path-dependence of limits is the most vivid consequence, and A02 should dwell on it. Students who absorb this once — that two disagreeing paths kill a limit, but no finite collection of agreeing paths proves one — develop the right instincts for partial derivatives, directional derivatives, and continuity in subsequent material.

**f(x,y) = (x²−y²)/(x²+y²) is the canonical example:** It has limit 1 along the real axis, −1 along the imaginary axis, and (1−m²)/(1+m²) along y=mx — every line through the origin gives a different value. It simultaneously teaches path-dependence and the parametric-slope trick for lines through the origin.

**Domain descriptions must be 2D:** Students with strong 1D backgrounds reliably write domains as intervals. A01's explicit table of domain shapes (disk, half-plane, parabolic region) with both algebraic and geometric descriptions corrects this. Require students to draw the domain region, not just write an inequality.

**Continuity for nice functions:** Polynomial functions of x and y (like 3x²−2xy+y) are always continuous. Rational functions are continuous wherever the denominator is non-zero. This simple rule handles most computational continuity questions without limits. The genuinely tricky cases are functions defined by 0/0 forms near isolated points.

---

## Component 10 — Validation Checklist

| ID | Check | Status |
|----|-------|--------|
| V-1 | All Teaching Actions have assigned primitives | PASS |
| V-2 | GR-1: A01 opens with P11 (B-category primitive, non-repair) | PASS |
| V-3 | CPA entry stage = C for advanced difficulty | PASS |
| V-4 | bloom=understand → no P07 required; V-4 = N/A | N/A |
| V-5 | GR-2: P49 present in A01, A02, A03, each with 4 branches | PASS |
| V-6 | GR-3: A04 (P91) is terminal — no further TAs after gate | PASS |
| V-7 | GR-4: All B-sequences open with P27+P41+P64 | PASS |
| V-8 | GR-6: P91 is terminal in A04 | PASS |
| V-9 | GR-7: P76 present inside A04 mastery gate | PASS |
| V-10 | GR-9: cross_links=[] → P76 mode = independence | PASS |
| V-11 | GR-10: MAMR=4/5 stated and enforced (thresh=0.8, n=5: ⌈0.8×5⌉=4) | PASS |
| V-12 | PASS criterion (≥4/5) stated in P75 and P74 | PASS |
| V-13 | GR-8: Component 7 documents all cross-blueprint dependencies | PASS |
| V-14 | Standard structure: h=5 → 3 main TAs (A01,A02,A03) + gate (A04) | PASS |
| V-15 | Component 0 metadata fields complete | PASS |
| V-16 | Component 1 (prior anchors, target state, obstacles) complete | PASS |
| V-17 | Component 2: 3 MCs with 1 foundational designated | PASS |
| V-18 | Component 3 scaffolding protocol complete | PASS |
| V-19 | Component 6 P89 schedule complete (4 intervals) | PASS |
| V-20 | Component 8 teaching notes complete | PASS |
| AIR | No prohibited operations (no curriculum modification, no framework redesign) | PASS |

**Status: PACKAGE_READY**

# Blueprint: math.func.domain-range

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.domain-range |
| name | Domain and Range |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | understand |
| Estimated hours | 4 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.func.function-concept |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a function defined by a formula, a graph, or a table, the student states the domain (all valid inputs) and the range (all actual outputs), identifies natural domain restrictions (denominator ≠ 0, radicand ≥ 0, logarithm argument > 0), reads domain and range from a graph using projection onto axes, and distinguishes domain restriction from range restriction when composing functions.

## Component 2 — CPA Entry Stage
**C — Concrete** (explicit tables; coordinate graphs with shading; interval notation on number lines)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | RANGE-EQUALS-DOMAIN | Student assumes the range of a function equals its domain; does not distinguish input set from output set; writes "domain = range = all reals" for f(x)=x² | Type 1 — overgeneralization (for f(x)=x, domain=range=ℝ is true; students extend this to all functions) |
| MC-2 | DOMAIN-ONLY-EXCLUDES-ZEROS | Student identifies only the zeros of denominators as domain restrictions; forgets radical restrictions (radicand ≥ 0) and logarithm restrictions (argument > 0) | Type 5 — instruction-induced (denominators are the most-emphasised restriction; others are introduced later) |
| MC-3 | RANGE-IS-COMPUTED-NOT-REASONED | Student attempts to find the range by plugging in arbitrary x-values rather than reasoning about the function's output structure; misses the range for functions with bounded outputs like f(x)=sin(x) | Type 1 — overgeneralization (domain is found by algebraic restriction; students try to apply the same algebraic approach to range, which requires different reasoning) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of domain and range:**

| Representation | Domain | Range |
|---|---|---|
| Set notation | {x ∈ ℝ : condition on x} | {y ∈ ℝ : y = f(x) for some x in domain} |
| Interval notation | [a,b), (−∞,3], (0,∞) etc. | Determined by function's output structure |
| Graph (horizontal projection) | Shadow of the graph onto the x-axis | Shadow of the graph onto the y-axis |
| Table | All x-values listed | All y-values listed (possibly with repetition) |

**Domain restriction gallery:**
| Function | Restriction | Domain |
|---|---|---|
| f(x)=1/x | x≠0 | (−∞,0)∪(0,∞) |
| f(x)=√x | x≥0 | [0,∞) |
| f(x)=ln(x) | x>0 | (0,∞) |
| f(x)=1/(x²−1) | x≠±1 | (−∞,−1)∪(−1,1)∪(1,∞) |
| f(x)=√(4−x²) | 4−x²≥0 → −2≤x≤2 | [−2,2] |

**Range from graph (f(x)=x²):**
The parabola y=x² has vertex at (0,0), opens upward. Projecting onto y-axis: y≥0. Range=[0,∞). Domain=ℝ (no x-restriction).

**P49 checkpoint:**
- CORRECT → "Domain = valid inputs (check: denominator≠0, radicand≥0, log argument>0). Range = actual outputs (reason from function's structure or graph projection)." → A02
- PARTIAL (finds domain, can't find range of f(x)=x²) → "What is the smallest value x² can take? Can x² be negative? Use this to state the range." → TB-R03 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "For f(x)=√(x−1), what values of x make the square root undefined? Start there." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Domain-range pattern gallery:**

| Function | Domain | Range | Reason for range |
|---|---|---|---|
| f(x)=x | ℝ | ℝ | Linear, unbounded |
| f(x)=x² | ℝ | [0,∞) | Square always ≥0; all non-negative values achieved |
| f(x)=x³ | ℝ | ℝ | Odd power, all reals achieved |
| f(x)=|x| | ℝ | [0,∞) | Absolute value ≥0 |
| f(x)=1/x | ℝ\{0} | ℝ\{0} | Reciprocal skips 0; achieves all other values |
| f(x)=√x | [0,∞) | [0,∞) | Input and output both restricted to non-negative |
| f(x)=2ˣ | ℝ | (0,∞) | Exponential is always positive; approaches 0 but never reaches it |
| f(x)=ln(x) | (0,∞) | ℝ | Logarithm can be any real value |
| f(x)=sin(x) | ℝ | [−1,1] | Oscillates; bounded above and below |

**Pattern for range:** (1) Identify the function's minimum/maximum output. (2) Identify which values in between are achieved. (3) Check for gaps (e.g., 1/x skips 0).

**P49 checkpoint:**
- CORRECT → "Each function type has a characteristic range shape. Polynomials (odd degree): ℝ. Even powers: [min,∞). Reciprocals: ℝ\{0}. Exponentials: (0,∞). Trig: bounded interval." → A03
- PARTIAL (knows some cases, can't find range of √(9−x²)) → "What does the graph of √(9−x²) look like? Project onto the y-axis." → TB-R03 → A03
- INCORRECT → TB-R03 → A03
- NO_RESPONSE → "For f(x)=2ˣ, can 2ˣ ever equal 0 or a negative number? What happens as x→−∞?" → TB-R03 → A03

### A03 — P06 CONTRAST PAIR
**Natural domain vs. restricted domain; domain of a composition:**

| Scenario | Natural domain | Restricted domain |
|---|---|---|
| f(x)=√(x−2) | [2,∞) (algebraic constraint) | Could also write [2,5] for a specific application |
| f(x)=1/(x−1) | ℝ\{1} | (2,∞) if x>2 is given as context |

**Domain of composition f(g(x)):**
Two-step rule: (1) x must be in the domain of g. (2) g(x) must be in the domain of f.

Example: f(x)=√x, g(x)=x−3.  
(f∘g)(x)=√(x−3).  
Step 1: domain of g is ℝ.  
Step 2: need g(x)=x−3≥0 → x≥3.  
Domain of f∘g: [3,∞). Range of f∘g: [0,∞).

**Contrast:** Domain of g: ℝ. Domain of f∘g: [3,∞). Restricting g's output to match f's domain restricts the composition's domain.

**P49 checkpoint:**
- CORRECT → "Natural domain from algebraic restrictions. Domain of f∘g: x in dom(g) AND g(x) in dom(f). Range found by output analysis or graph projection." → Gate (P91)
- PARTIAL (finds domain of f∘g incorrectly, uses dom(f) instead) → "The restriction comes from what f requires of its INPUT, which is g(x). What does √(·) need its argument to satisfy?" → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "For (f∘g)(x)=√(x−3), what must be true about x−3 for the square root to be defined?" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 RANGE-EQUALS-DOMAIN):**
Step 1 — "Domain = set of valid INPUTS (x-values you're allowed to put in). Range = set of actual OUTPUTS (y-values the function actually produces). These are different sets unless the function is a bijection from ℝ to ℝ like f(x)=x." Step 2 — Compare f(x)=x (domain=range=ℝ) and f(x)=x² (domain=ℝ but range=[0,∞) — negative outputs never occur). Step 3 — "For range: ask 'what y-values can this function produce?' not 'what x-values are valid inputs?' These are different questions requiring different analysis."

**TB-R02 (MC-2 DOMAIN-ONLY-EXCLUDES-ZEROS):**
Step 1 — "Three natural domain restrictions: (1) denominators cannot be 0; (2) even-root radicands must be ≥0; (3) logarithm arguments must be >0. Each comes from a different kind of operation." Step 2 — f(x)=ln(√(x−1)): chain of two restrictions. Inner: √(x−1) requires x−1≥0→x≥1. Outer: ln requires √(x−1)>0→x−1>0→x>1. Combined: domain=(1,∞). Step 3 — "Work inside-out for composite expressions. Each operation type has its own restriction."

**TB-R03 (MC-3 RANGE-IS-COMPUTED-NOT-REASONED):**
Step 1 — "Plugging in values samples the range; it doesn't prove it. Better method: reason about the function's structure. What is its minimum/maximum output? Does it skip any values? Is it continuous (intermediate value theorem says no gaps)?" Step 2 — f(x)=x²/(x²+1): denominator always > numerator → 0≤f(x)<1. As x→∞: f→1. f(0)=0. Range=[0,1). Step 3 — "Use the graph (projection onto y-axis), or solve y=f(x) for x and find which y-values give real solutions. That's the range."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Find the natural domain of: (a) f(x)=√(2x−6); (b) g(x)=(x+1)/(x²−4); (c) h(x)=ln(x²−9). Write answers in interval notation.
2. Find the range of: (a) f(x)=3−x² (without graphing, by reasoning); (b) g(x)=|2x+1|; (c) h(x)=eˣ−2.
3. Find the domain and range of f(x)=√(4−x²). Sketch the graph. What standard geometric shape is it?
4. Let f(x)=1/x and g(x)=x−2. Find the domain of f∘g and g∘f. Explain why they differ.

**P55 — Reflect & Consolidate:** "Domain: valid inputs (algebraic restrictions). Range: actual outputs (structure analysis, graph projection). Composition domain: two-step intersection. Natural domain: all real inputs not excluded by algebraic constraints."

**P76 — Transfer Probe (Independence mode):**
Formal domain-range analysis for a rational function: f(x)=(x²−1)/(x²+1). (a) Find the natural domain. (b) Show that f(x)∈[−1,1) for all x in the domain. [Hint: solve y=(x²−1)/(x²+1) for x² and find which y-values give real solutions.] (c) Is every value in [−1,1) actually achieved? Check the endpoints separately. (d) State the range.

**P55 — Reflect & Consolidate:** "To find the range algebraically: set y=f(x), solve for x (or x²), and find which y-values give real solutions. This is the inverse-function approach to range. The domain of the inverse = the range of the original."

**P75 — Mastery Assessment:**
"f(x)=√(x+3)/(x−1). (a) Find the natural domain. (b) Find the range by analyzing what values √(x+3)/(x−1) can take. (c) Verify your range by checking f at x=−3, x=0, x=2, and x→∞. (d) Find the domain and range of g(x)=f(x+1). How does the domain/range shift?"

**P55 — Reflect & Consolidate:** "Translating by c: domain shifts by −c (if g(x)=f(x+c), domain shifts left by c), range is unchanged. Algebraic domain restrictions, structural range reasoning, and composition domain are the three core skills."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.domain-range complete
- Score 3/5 → REVIEW range reasoning for non-linear functions; replay A02–A03
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.function-concept; reassign

**P78 — Completion:** Domain and range certified. Student can find natural domain by algebraic restriction, determine range by structural reasoning, read domain/range from graphs, and compute domain of function compositions.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Range of a bounded rational function via algebraic inversion; endpoint and achievability analysis
Skill tested: Solve y=f(x) for x to find which y-values are achievable; distinguish "f approaches 1" from "f achieves 1"

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

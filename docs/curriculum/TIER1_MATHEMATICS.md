# Tier 1 Mathematics — Canonical ROI Classification

**Status:** FINAL  
**Date:** 2026-07-11  
**Source KG:** `docs/mathematics/kg/graph.json` — 908 concepts, v1.0.1, status=frozen  
**Branch:** `claude/math-linalg-curriculum-34wonr`  
**Classification method:** Graph-theoretic ROI scoring (see §1)

---

## Contents

1. [Methodology](#1-methodology)
2. [Tier Thresholds and Counts](#2-tier-thresholds-and-counts)
3. [Tier 1 — Complete Classified List](#3-tier-1--complete-classified-list)
4. [Tier 2 — Domain Summary](#4-tier-2--domain-summary)
5. [Tier 3 — Domain Summary](#5-tier-3--domain-summary)
6. [Risks Discovered](#6-risks-discovered)
7. [Summary](#7-summary)

---

## 1. Methodology

Every concept in the Mathematics KG was evaluated on eight objective metrics derived
entirely from the KG graph structure:

| Metric | Symbol | Weight | Description |
|---|---|---|---|
| Transitive downstream blocking | DS | 4.0× | Concepts that cannot be reached if this one is not mastered (BFS over `required_by` edges) |
| Transitive unlock reach | REACH | 2.0× | Concepts this concept directly or transitively unlocks (BFS over `unlocks` edges) |
| Direct dependency count | REQ\_BY | 3.0× | Number of concepts listing this in their `requires` field |
| Direct unlock count | UNL | 1.5× | Number of concepts in this concept's `unlocks` field |
| Difficulty accessibility | DIFF | 2.0× | Inverse difficulty: foundational=6, developing=5, proficient=4, advanced=3, expert=2, research=1 |
| Cross-domain diversity | CD | 1.5× | Distinct domain prefixes reachable via requires/unlocks/cross\_links from this concept |
| Explicit cross-links | CL | 1.0× | Count of `cross_links` entries |
| Structural children | CH | 0.5× | Count of `children` entries |

**ROI Score** = DS×4 + REACH×2 + REQ\_BY×3 + UNL×1.5 + DIFF×2 + CD×1.5 + CL×1 + CH×0.5

The DS metric has the highest weight because a concept with high downstream blocking is a
true curriculum bottleneck: failure to master it prevents all downstream learning. REACH
and REQ\_BY add unlock potential and direct dependency. DIFF adds student-reach weighting
(foundational concepts reach more learners than research-level ones).

**Transitive computations** use BFS on the directed prerequisite graph built from the KG's
`requires` and `unlocks` edge sets. Only edges to valid KG IDs are followed.

---

## 2. Tier Thresholds and Counts

| Tier | Score threshold | Count | % of KG | Blueprint priority |
|---|---|---|---|---|
| **Tier 1** | score ≥ 150 | **139** | 15.3% | Highest — author first |
| **Tier 2** | 20 ≤ score < 150 | **309** | 34.0% | Medium — author second |
| **Tier 3** | score < 20 | **460** | 50.7% | Long-tail — author last |
| **Total** | — | **908** | 100% | — |

Estimated blueprint production milestones:
- After Tier 1 complete (139 blueprints): curriculum covers all structural backbone concepts.
  Any learner at any level can be taught using only Tier 1 blueprints; no critical gap exists.
- After Tier 2 complete (448 blueprints): 49% coverage; most common university pathways covered.
- After Tier 3 complete (908 blueprints): 100% KG coverage.

---

## 3. Tier 1 — Complete Classified List

Concepts are grouped into thirteen clusters by educational function.
Each row shows: KG ID | Difficulty | ROI Score | DS (downstream blocking) | REACH (unlock reach) | REQ\_BY (direct dependents).

### Cluster A — Universal Mathematical Foundation
*Concepts that virtually all 908 KG concepts flow through. DS > 400 means mastering (or
failing to master) these affects hundreds of downstream concepts. These are the highest-ROI
concepts in the entire curriculum — blueprint authoring here has the most leverage.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.found.mathematical-thinking` | foundational | 3844.5 | 907 | 89 | 6 | Root concept: 907 of 908 KG concepts are downstream. The curriculum's origin node. |
| `math.found.mathematical-language` | foundational | 3646.0 | 859 | 89 | 5 | Second highest DS; 859 concepts require mathematical language as prerequisite chain. |
| `math.found.logic` | foundational | 3628.5 | 853 | 88 | 6 | Foundation of all proof, reasoning, and formal argument across every domain. |
| `math.found.set-theory` | developing | 3516.5 | 825 | 79 | 11 | Highest direct dependency count (REQ\_BY=11) at this score level; functions, topology, measure theory all require it. |
| `math.found.set` | foundational | 3098.0 | 762 | 10 | 5 | The atomic building block of set-theory; ds=762 confirms structural necessity. |
| `math.found.relation` | developing | 3035.5 | 745 | 12 | 4 | All functions, orders, equivalences are relations; cross-domain breadth cd=2. |
| `math.found.cartesian-product` | developing | 3033.0 | 746 | 13 | 2 | Required for the formal definition of functions, product spaces, multi-dim coordinates. |
| `math.found.transitive-relation` | developing | 2825.0 | 659 | 85 | 2 | High unlock reach (85); prerequisite for equivalence relations and order theory. |
| `math.found.natural-numbers` | foundational | 2795.5 | 652 | 74 | 6 | First number system; required for counting, arithmetic, induction, and discrete math. |
| `math.found.partial-order` | developing | 2790.5 | 655 | 76 | 2 | Gateway to lattice theory, topology, and formal ordering concepts. |
| `math.found.total-order` | developing | 2779.5 | 653 | 75 | 2 | Required for real-number ordering, comparisons, sorting; reach=75. |
| `math.found.reflexive-relation` | developing | 2669.5 | 659 | 8 | 2 | Necessary precursor to equivalence and order relations; ds=659. |
| `math.found.integers` | foundational | 2186.0 | 522 | 35 | 3 | Extends natural numbers to negatives; required by rational numbers, number theory, algebra. |
| `math.found.rational-numbers` | developing | 2072.5 | 487 | 50 | 3 | Bridges integers to real analysis; reach=50 and ds=487 confirm bottleneck status. |
| `math.found.abstraction` | foundational | 2062.5 | 455 | 108 | 3 | Highest unlock reach of all concepts (108); the cognitive skill that enables all advanced mathematics. |
| `math.found.function-set-theoretic` | developing | 1933.0 | 474 | 4 | 5 | Formal definition of function; prerequisite to function-concept and all of analysis. |
| `math.found.mathematical-notation` | foundational | 1905.5 | 455 | 33 | 2 | Required for reading and writing all subsequent mathematics; ds=455. |
| `math.found.variable` | foundational | 1901.5 | 452 | 32 | 3 | Foundation of algebra, calculus, and parametric reasoning; req\_by=3 but ds=452. |
| `math.found.real-numbers` | developing | 1820.0 | 429 | 31 | 7 | Underpins all analysis, calculus, trigonometry; req\_by=7. |
| `math.found.irrational-numbers` | developing | 1805.5 | 431 | 32 | 2 | Completes the real-number line; required for limits and completeness arguments. |

### Cluster B — Arithmetic Core
*Foundational arithmetic operations. Every learner encounters these first; failure here
prevents all subsequent quantitative mathematics.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.arith.counting` | foundational | 1979.0 | 452 | 68 | 5 | First arithmetic skill; reach=68 confirms it unlocks most of primary mathematics. |
| `math.arith.place-value` | foundational | 1958.5 | 447 | 67 | 6 | Prerequisite for all decimal arithmetic; req\_by=6. |
| `math.arith.addition` | foundational | 1943.5 | 443 | 66 | 6 | Core operation; blocking 443 downstream concepts if not mastered. |
| `math.arith.multiplication` | foundational | 1780.5 | 404 | 58 | 8 | Highest REQ\_BY in arithmetic (8); required by fractions, exponents, ratios, algebra. |
| `math.arith.division` | foundational | 1326.0 | 307 | 29 | 7 | Required for fractions, ratios, rate, quotient — req\_by=7. |
| `math.arith.subtraction` | foundational | 658.5 | 126 | 65 | 3 | High unlock reach (65); prerequisite for negative numbers and distance concepts. |
| `math.arith.fractions` | developing | 710.5 | 156 | 16 | 11 | Highest REQ\_BY outside set-theory/calculus tier (11); universal bottleneck. |
| `math.arith.order-of-operations` | developing | 562.0 | 121 | 31 | 1 | Required for all algebraic expression evaluation; reach=31. |
| `math.arith.exponentiation` | developing | 502.5 | 103 | 30 | 4 | Prerequisite for logarithms, polynomial degree, scientific notation. |
| `math.arith.ratios` | developing | 394.5 | 88 | 7 | 4 | Required for proportional reasoning, probability, scale, and trigonometry. |
| `math.arith.exponent-rules` | developing | 369.0 | 84 | 7 | 2 | Prerequisite for polynomial manipulation, logarithm laws, calculus power rule. |

### Cluster C — Geometric Foundations
*Primary geometry concepts. High DS scores confirm that coordinate geometry, trigonometry,
linear algebra, and vector calculus all trace back to these primitives.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.geom.point` | foundational | 1644.5 | 383 | 45 | 2 | Atomic geometric object; everything in geometry descends from it. |
| `math.geom.line` | foundational | 1603.0 | 382 | 23 | 4 | Second-most foundational geometric object; req\_by=4. |
| `math.geom.coordinate-plane` | developing | 1360.0 | 317 | 19 | 11 | Highest REQ\_BY in geometry (11); gateway to analytic geometry and calculus. |
| `math.geom.plane` | foundational | 1343.0 | 318 | 26 | 1 | Prerequisite for all 2D geometric reasoning; ds=318. |
| `math.geom.x-y-coordinates` | developing | 485.0 | 118 | 0 | 1 | Despite reach=0, ds=118 confirms heavy downstream dependency through the required-by chain. |
| `math.geom.angle` | foundational | 540.0 | 117 | 19 | 5 | Required for triangle, trigonometry, circle, and rotation concepts. |
| `math.geom.ray` | foundational | 528.5 | 118 | 20 | 1 | Structural prerequisite for angle definition; ds=118. |
| `math.geom.line-segment` | foundational | 522.5 | 120 | 7 | 5 | Prerequisite for perimeter, distance, triangle sides; req\_by=5. |
| `math.geom.triangle` | developing | 514.0 | 108 | 18 | 9 | Most depended-upon shape (req\_by=9); gateway to trigonometry and Pythagorean theorem. |
| `math.geom.slope` | proficient | 797.0 | 188 | 12 | 3 | Prerequisite for linear equations, calculus derivative, and linear algebra vectors. |
| `math.geom.perpendicular-lines` | foundational | 402.5 | 87 | 19 | 1 | Required for right angles, Pythagorean theorem, orthogonality in linear algebra. |
| `math.geom.right-triangle` | developing | 401.5 | 86 | 18 | 2 | Foundation of all right-triangle trigonometry; req\_by includes trig concepts. |
| `math.geom.circle` | developing | 400.5 | 87 | 7 | 7 | Required for arc, sector, unit circle, π, and complex polar form. |
| `math.geom.angle-measurement` | foundational | 377.0 | 84 | 11 | 1 | Prerequisite for trigonometric functions and radian measure. |
| `math.geom.similar-triangles` | proficient | 364.5 | 82 | 10 | 1 | Required for scale, proportionality, and indirect measurement in calculus. |
| `math.geom.vectors-3d` | proficient | 362.0 | 69 | 26 | 6 | High unlock reach (26); gateway to vector calculus, linear algebra, and physics applications. |
| `math.geom.vectors-2d` | proficient | 352.0 | 70 | 27 | 1 | Highest unlock reach in geometry cluster (27); cd=2. |
| `math.geom.polar-coordinates` | advanced | 191.0 | 38 | 10 | 2 | Prerequisite for complex polar form, multivariable calculus, and Fourier series. |

### Cluster D — Algebraic Structure
*Algebraic manipulation skills. High DS for expression/term concepts confirms that
symbolic algebra underpins most of the advanced curriculum.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.alg.expression` | developing | 572.5 | 120 | 30 | 5 | Prerequisite for all symbolic manipulation; reach=30, req\_by=5. |
| `math.alg.like-terms` | developing | 373.5 | 77 | 24 | 2 | Required for simplification, polynomial operations; reach=24. |
| `math.alg.term` | developing | 332.0 | 79 | 0 | 2 | Atomic unit of algebraic expressions; ds=79. |
| `math.alg.coefficient` | developing | 325.0 | 78 | 0 | 1 | Required for polynomial degree, leading term, and linear combinations. |
| `math.alg.simplification` | developing | 188.5 | 32 | 23 | 1 | Prerequisite for equation solving; reach=23 through simplification chains. |
| `math.alg.equation` | developing | 211.0 | 36 | 22 | 3 | Gateway to all equation-solving; reach=22 confirms downstream breadth. |
| `math.alg.linear-equation-1var` | developing | 186.0 | 31 | 20 | 3 | First equation-solving skill; reach=20 into systems and matrix methods. |
| `math.alg.linear-equation-2var` | developing | 164.0 | 28 | 14 | 2 | Required for systems of equations, linear programming, and 2D geometry. |
| `math.alg.quadratic-equation` | proficient | 162.0 | 31 | 4 | 5 | Gateway to polynomial roots, conic sections, and complex numbers; req\_by=5. |
| `math.alg.polynomial` | proficient | 298.5 | 60 | 7 | 8 | Highest REQ\_BY in algebra cluster (8); cd=3 confirms cross-domain breadth. |
| `math.alg.polynomial-operations` | proficient | 194.5 | 43 | 5 | 1 | Prerequisite for polynomial division and the factor theorem. |
| `math.alg.polynomial-division` | proficient | 190.0 | 42 | 4 | 1 | Required for remainder theorem, partial fractions, and rational functions. |
| `math.alg.remainder-theorem` | proficient | 182.5 | 41 | 3 | 1 | Required for factor theorem and root-finding algorithms. |
| `math.alg.factor-theorem` | proficient | 179.5 | 40 | 2 | 2 | Required for polynomial factorization and root isolation. |
| `math.alg.factoring` | proficient | 187.5 | 39 | 5 | 3 | Prerequisite for rational functions, partial fractions, integration. |
| `math.alg.system-linear-equations` | proficient | 150.5 | 26 | 10 | 4 | Gateway to linear algebra, optimization, and multivariable methods. |
| `math.alg.factoring-trinomials` | proficient | 150.5 | 32 | 5 | 1 | Required for quadratic equation solving and rational expression simplification. |

### Cluster E — Functions
*The function concept is the single most directly depended-upon concept in the proficient
tier (REQ\_BY=19). Without it, calculus, linear algebra, and analysis cannot proceed.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.func.function-concept` | proficient | 1570.0 | 373 | 3 | 19 | Highest REQ\_BY of all 908 concepts (19); everything in calculus and analysis requires it. |
| `math.func.real-valued-function` | proficient | 1174.5 | 276 | 27 | 1 | High unlock reach (27) into analysis, calculus, and measure theory. |
| `math.func.composition` | proficient | 303.0 | 70 | 4 | 1 | Prerequisite for chain rule, inverse functions, and category-theoretic morphisms. |

### Cluster F — Analysis Gateways (Calculus)
*The limit concept is the gate to all of analysis; the derivative and integral unlock
applied mathematics, physics, engineering, and differential equations.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.calc.limits` | advanced | 1198.5 | 275 | 26 | 11 | Second highest REQ\_BY in calculus (11); prerequisite for continuity, derivative, integral. |
| `math.calc.continuity` | advanced | 850.0 | 191 | 25 | 7 | Required for IVT, differentiability, integration, and real analysis. |
| `math.calc.derivative-intro` | advanced | 767.0 | 177 | 22 | 2 | Conceptual entry to differentiation; reach=22 through derivative applications. |
| `math.calc.derivative-definition` | advanced | 788.5 | 176 | 21 | 10 | Formal limit-based definition; req\_by=10 confirms it gates the derivative chain. |
| `math.calc.derivative-rules` | advanced | 505.5 | 114 | 6 | 9 | Computation gateway (req\_by=9); power/product/quotient/chain rules all descend. |
| `math.calc.chain-rule` | advanced | 309.0 | 69 | 3 | 6 | Prerequisite for implicit differentiation, related rates, and backpropagation. |
| `math.calc.riemann-sums` | advanced | 570.5 | 137 | 6 | 1 | Conceptual foundation of integration; required before FTC. |
| `math.calc.definite-integral` | advanced | 601.5 | 136 | 5 | 12 | Highest REQ\_BY in calculus (12); area, probability density, and physics applications. |
| `math.calc.antiderivatives` | advanced | 304.5 | 69 | 6 | 3 | Required for indefinite integration, FTC part 2, and ODE solutions. |
| `math.calc.ftc-part1` | advanced | 262.5 | 61 | 4 | 1 | Connects derivatives and integrals; prerequisite for FTC part 2. |
| `math.calc.ftc-part2` | advanced | 256.5 | 60 | 3 | 1 | Enables computation of definite integrals; required for all applied integration. |
| `math.calc.u-substitution` | advanced | 259.5 | 59 | 2 | 4 | Most common integration technique; prerequisite for trigonometric substitution. |
| `math.calc.multivariable-intro` | advanced | 277.0 | 62 | 7 | 2 | Gateway to partial derivatives, multivariable integration, vector calculus. |
| `math.calc.partial-derivatives` | advanced | 266.5 | 55 | 6 | 8 | Required for gradient, Jacobian, optimization, and PDEs; req\_by=8. |

### Cluster G — Probability Core
*Probability underpins statistics, machine learning, and stochastic processes. The
sample-space/axioms/event triple forms the foundational triple that all probability
concepts require.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.prob.sample-space` | developing | 369.0 | 85 | 6 | 1 | First probability concept; ds=85 confirms it gates all of probability. |
| `math.prob.probability-axioms` | developing | 366.0 | 82 | 5 | 5 | Kolmogorov axioms; required by all rigorous probability. |
| `math.prob.event` | developing | 365.0 | 84 | 6 | 1 | Prerequisite for conditional probability, independence, and combinatorial probability. |
| `math.prob.probability-measure` | developing | 361.0 | 83 | 6 | 1 | Required for measure-theoretic probability and advanced analysis. |
| `math.prob.random-variable` | proficient | 329.0 | 68 | 10 | 7 | Gate to discrete/continuous distributions, expectation, variance; req\_by=7. |
| `math.prob.discrete-rv` | proficient | 229.0 | 52 | 2 | 2 | Required for PMF, Bernoulli, binomial, Poisson distributions. |
| `math.prob.continuous-rv` | proficient | 238.5 | 54 | 2 | 2 | Required for PDF, normal, exponential, and gamma distributions. |
| `math.prob.pmf` | proficient | 221.0 | 51 | 0 | 3 | Probabilistic mass function; required for discrete distribution computations. |
| `math.prob.pdf` | proficient | 229.0 | 53 | 0 | 3 | Probability density function; required for all continuous distribution work. |
| `math.prob.expected-value` | proficient | 237.0 | 47 | 8 | 7 | Foundational statistic; req\_by=7, reach=8 into moment generating functions. |
| `math.prob.variance` | proficient | 186.5 | 39 | 5 | 3 | Required for standard deviation, covariance, CLT, and hypothesis testing. |
| `math.prob.conditional-probability` | proficient | 206.5 | 42 | 4 | 6 | Required for Bayes' theorem, independence, and Markov chains. |
| `math.prob.continuous-distributions` | proficient | 158.0 | 33 | 0 | 6 | Required for normal, exponential, gamma, and beta distributions. |
| `math.prob.normal-distribution` | proficient | 150.0 | 31 | 1 | 4 | Most widely used distribution; prerequisite for CLT applications and inference. |

### Cluster H — Linear Algebra Core
*Linear algebra is the computational engine of applied mathematics, machine learning,
and physics. The vector and matrix concepts gate the entire cluster.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.linalg.vector` | developing | 539.0 | 117 | 17 | 6 | Prerequisite for dot product, matrix columns, and vector spaces; req\_by=6. |
| `math.linalg.matrix` | proficient | 393.0 | 79 | 18 | 9 | Second highest REQ\_BY in linear algebra (9); all matrix operations and eigenvalues require it. |
| `math.linalg.dot-product` | developing | 368.5 | 78 | 10 | 6 | Required for inner product spaces, orthogonality, and projection; req\_by=6. |
| `math.linalg.vector-addition` | developing | 259.5 | 61 | 0 | 1 | Prerequisite for vector space axioms and all vector arithmetic. |
| `math.linalg.scalar-multiplication` | developing | 257.0 | 61 | 0 | 1 | Required for linear combinations, span, and basis. |
| `math.linalg.vector-space` | proficient | 298.5 | 60 | 10 | 7 | Gate to subspace, basis, dimension, and linear maps; req\_by=7. |
| `math.linalg.matrix-multiplication` | proficient | 225.5 | 44 | 9 | 6 | Prerequisite for linear transformations, determinants, and eigenvalue problems. |
| `math.linalg.determinant` | proficient | 201.5 | 37 | 8 | 8 | Required for invertibility, eigenvalues, and change-of-variables in integration; req\_by=8. |
| `math.linalg.eigenvalues` | proficient | 157.0 | 25 | 5 | 10 | Highest REQ\_BY in linear algebra cluster (10); prerequisite for diagonalization, spectral theory. |

### Cluster I — Sequences and Series
*Sequences are the bridge between discrete and continuous mathematics. Series convergence
gates real analysis, Fourier analysis, and power series methods.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.seq.sequence` | proficient | 400.5 | 88 | 4 | 8 | Highest REQ\_BY in sequences (8); prerequisite for all series, convergence, and analysis. |
| `math.seq.series` | proficient | 234.5 | 49 | 3 | 7 | Gate to power series, Fourier series, and generating functions; req\_by=7. |
| `math.seq.series-convergence` | advanced | 192.5 | 36 | 3 | 10 | Highest REQ\_BY in sequences cluster (10); all convergence tests depend on it. |
| `math.seq.partial-sums` | proficient | 175.5 | 38 | 4 | 2 | Required for series convergence definition; ds=38. |
| `math.seq.convergent` | advanced | 195.0 | 39 | 8 | 3 | Required for Cauchy sequences, completeness, and metric-space convergence. |

### Cluster J — Abstract Algebra
*Group and ring theory underpin number theory, cryptography, algebraic geometry, and
physics symmetry. The group-theory concept has req\_by=12 — highest in the abstract
algebra domain.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.abst.binary-operation` | advanced | 448.0 | 105 | 8 | 1 | First abstract algebra concept; all groups, rings, and fields require a binary operation. |
| `math.abst.group-theory` | advanced | 479.0 | 104 | 7 | 12 | Highest REQ\_BY in abstract algebra (12); gateway to rings, fields, and Galois theory. |
| `math.abst.ring-theory` | advanced | 362.5 | 79 | 8 | 6 | Required for ideals, polynomial rings, and algebraic number theory; req\_by=6. |
| `math.abst.ideal` | expert | 311.0 | 71 | 7 | 2 | Required for quotient rings, prime ideals, and algebraic geometry. |
| `math.abst.prime-ideal` | expert | 294.5 | 69 | 5 | 1 | Required for ring spectrum, algebraic geometry, and commutative algebra. |
| `math.abst.field` | advanced | 300.0 | 68 | 4 | 3 | Required for vector spaces (field of scalars), Galois theory, and finite fields. |

### Cluster K — Trigonometry
*Trigonometric functions appear in calculus, complex analysis, Fourier analysis,
and physics. The trig-functions concept has req\_by=11.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.trig.angle-measure` | proficient | 371.0 | 83 | 10 | 2 | Prerequisite for radian conversion, trig functions, and arc length. |
| `math.trig.right-triangle-trig` | proficient | 369.0 | 81 | 9 | 4 | First application of trig; required for unit circle and inverse trig. |
| `math.trig.unit-circle` | proficient | 337.5 | 76 | 6 | 3 | Required for all trig identities, periodic functions, and complex polar form. |
| `math.trig.trig-functions` | proficient | 351.5 | 74 | 4 | 11 | Highest REQ\_BY in trigonometry (11); required by calculus, differential equations, Fourier. |
| `math.trig.polar-form-complex` | advanced | 188.0 | 36 | 10 | 3 | Gateway to complex exponentiation, Euler's formula, and signal processing. |

### Cluster L — Differential Equations
*ODEs appear in physics, engineering, biology, and finance. First-order and second-order
ODEs have combined req\_by of 14 direct dependents.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.de.ode` | advanced | 286.0 | 61 | 4 | 6 | Gateway concept for all differential equations; req\_by=6, cd=3. |
| `math.de.first-order-ode` | advanced | 253.5 | 53 | 3 | 8 | Required for separable, linear, and exact equations; req\_by=8. |
| `math.de.second-order-ode` | advanced | 195.5 | 42 | 2 | 4 | Required for harmonic oscillator, beam equations, and eigenvalue problems. |

### Cluster M — Complex Analysis Gateway
*Complex functions gate Fourier analysis, analytic continuation, and residue calculus.
The Cauchy-Riemann equations are the defining property of holomorphic functions.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.cx.complex-numbers-analysis` | advanced | 165.5 | 33 | 8 | 2 | First complex-analysis concept; required for analytic functions and contour integration. |
| `math.cx.complex-function` | advanced | 157.5 | 31 | 10 | 1 | Prerequisite for holomorphic functions, poles, and Laurent series. |
| `math.cx.cauchy-riemann` | expert | 152.5 | 30 | 9 | 2 | Required for all holomorphic function theory; ds=30 in complex analysis. |

### Cluster N — Foundational Logic and Number Extensions
*Logical quantifiers and predicates have very low DS but very high unlock reach (87-88),
meaning they unlock large swaths of the curriculum through formal reasoning. Complex
numbers extend the real number line into 2D.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.found.predicate` | developing | 209.5 | 4 | 88 | 2 | Unlock reach = 88; enables universal/existential quantification across the KG. |
| `math.found.predicate-logic` | developing | 210.0 | 4 | 87 | 2 | Required for formal proof, type theory, and mathematical logic. |
| `math.found.quantifiers` | developing | 199.0 | 2 | 87 | 1 | Universal/existential quantifiers are required for all formal mathematical statements. |
| `math.found.pattern-recognition` | foundational | 194.0 | 2 | 79 | 2 | Foundational cognitive skill; reach=79 through combinatorics and sequence chains. |
| `math.found.proposition` | foundational | 171.0 | 30 | 12 | 4 | Atomic logical unit; required for truth tables, proofs, and formal logic. |
| `math.found.logical-connectives` | foundational | 170.0 | 27 | 11 | 7 | Required for compound propositions, truth tables, and Boolean algebra; req\_by=7. |
| `math.found.complex-numbers` | proficient | 205.5 | 39 | 10 | 4 | Extends real numbers to ℂ; required for complex analysis, polar form, and eigenvalues. |

### Cluster O — Number Theory
*Divisibility and prime numbers underpin cryptography, abstract algebra, and the structure
of ℤ. Both have req\_by ≥ 7.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.nt.divisibility` | developing | 218.5 | 38 | 11 | 8 | Required for GCD, LCM, prime factorization, and modular arithmetic; cd=3. |
| `math.nt.prime-number` | developing | 192.0 | 34 | 10 | 7 | Required for prime factorization, number theory, and cryptographic foundations. |

### Cluster P — Statistics Gateway
*Population and sample is the entry concept to all statistical inference.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.stats.population-sample` | developing | 180.5 | 38 | 4 | 2 | Entry to statistics; required for sampling methods, estimation, and hypothesis testing. |

### Cluster Q — Topology Gateway
*Topological space has req\_by=11 — the same as set-theory — confirming it as the
structural entry point to all of topology, functional analysis, and modern geometry.*

| KG ID | Difficulty | Score | DS | REACH | REQ\_BY | Justification |
|---|---|---|---|---|---|---|
| `math.top.topological-space` | expert | 151.0 | 24 | 5 | 11 | Highest REQ\_BY outside calculus cluster (11); gates all of topology and functional analysis. |

---

## 4. Tier 2 — Domain Summary

309 concepts with ROI score 20–149. These cover the majority of standard university
mathematics courses. Blueprint authoring should begin after all Tier 1 blueprints are
complete.

| Domain | Tier 2 count | Domain | Tier 2 count |
|---|---|---|---|
| `math.linalg` | 28 | `math.calc` | 28 |
| `math.found` | 26 | `math.arith` | 23 |
| `math.geom` | 20 | `math.de` | 18 |
| `math.alg` | 17 | `math.nt` | 14 |
| `math.disc` | 14 | `math.prob` | 15 |
| `math.cx` | 12 | `math.real` | 12 |
| `math.stats` | 12 | `math.func` | 12 |
| `math.abst` | 11 | `math.meas` | 7 |
| `math.trig` | 7 | `math.opt` | 7 |
| `math.fnal` | 6 | `math.cat` | 6 |
| `math.top` | 6 | `math.num` | 5 |
| `math.graph` | 2 | `math.seq` | 1 |
| **Total** | **309** | | |

Notable Tier 2 gateway concepts (score 130–149, first in queue for authoring after Tier 1):
`math.arith.counting-sequence`, `math.found.proof`, `math.nt.prime-factorization`,
`math.found.axiom`, `math.linalg.subspace`, `math.alg.factoring-gcf`,
`math.real.metric-space`, `math.disc.counting-principles`.

---

## 5. Tier 3 — Domain Summary

460 concepts with ROI score < 20. These are specialised, advanced, or terminal concepts
within their domains. Blueprint authoring here provides diminishing marginal returns;
appropriate for deep-curriculum or specialist learner paths.

| Domain | Tier 3 count | Domain | Tier 3 count |
|---|---|---|---|
| `math.de` | 35 | `math.calc` | 34 |
| `math.geom` | 31 | `math.found` | 29 |
| `math.stats` | 27 | `math.alg` | 25 |
| `math.arith` | 24 | `math.linalg` | 24 |
| `math.nt` | 20 | `math.prob` | 20 |
| `math.abst` | 20 | `math.disc` | 18 |
| `math.real` | 18 | `math.top` | 16 |
| `math.cx` | 16 | `math.seq` | 15 |
| `math.func` | 14 | `math.graph` | 14 |
| `math.trig` | 13 | `math.fnal` | 12 |
| `math.num` | 11 | `math.opt` | 9 |
| `math.cat` | 9 | `math.meas` | 6 |
| **Total** | **460** | | |

---

## 6. Risks Discovered

**R-1 — Transitive closure inflation at the graph root.**
The top 12 foundational concepts (Cluster A) achieve DS > 600 because they are
ancestors of almost every other concept in the KG. This inflates their scores relative
to highly-depended proficient-level concepts. In practice, this is correct: mastery of
mathematical thinking, logic, and set theory genuinely is the highest-ROI investment.
No scoring change needed.

**R-2 — Low DS / high REACH anomaly (Cluster N predicates).**
`math.found.predicate`, `math.found.predicate-logic`, and `math.found.quantifiers` show
DS = 2-4 but REACH = 87-88. This means they unlock a huge swath of the curriculum
through the `unlocks` edge chain, but are only directly required by 2-4 concepts.
These concepts are correctly Tier 1 due to their unlock potential, but their educational
impact is delivered through breadth (they enable formal mathematical language) rather
than depth (they aren't bottlenecks in the required-by sense). Blueprint authors should
note that these concepts need to be taught for long-term payoff, not because learners
will immediately be blocked without them.

**R-3 — Expert-level concepts in Tier 1.**
Three Tier 1 concepts are expert-level (`math.abst.ideal`, `math.abst.prime-ideal`,
`math.cx.cauchy-riemann`) and one is expert-level at a borderline score
(`math.top.topological-space`). These are Tier 1 because downstream advanced concepts
require them (they are cut-nodes within their sub-graphs), but their blueprints should
be deprioritised within Tier 1 until the foundational and proficient clusters are
complete. Suggested sub-ordering within Tier 1: Clusters A–E first, then F–I, then J–M,
then N–Q.

**R-4 — `math.found.pattern-recognition` low DS (ds=2).**
Already authored as a blueprint (commit 29ebb27). Its Tier 1 classification rests on
REACH=79 (large unlock chain) combined with foundational difficulty. The KG only has
2 direct dependents for it, but the unlock chain through mathematical reasoning is wide.
Blueprint already exists; no further action needed.

**R-5 — Missing blueprints for cross-domain bridge concepts.**
Seven Tier 1 concepts have cross-domain diversity cd ≥ 3:
`math.found.set-theory` (cd=3), `math.arith.multiplication` (cd=3),
`math.alg.polynomial` (cd=3), `math.de.ode` (cd=3), `math.nt.divisibility` (cd=3),
`math.trig.polar-form-complex` (cd=3), `math.found.complex-numbers` (cd=3).
These concepts require cross-domain P76 transfer probes in their blueprints. Authors must
read all connected domain KG entries before authoring to construct accurate transfer
contexts.

**R-6 — Tier 1 blueprint count (139) exceeds current KG-authored blueprints (14).**
As of this commit, 14 blueprints exist (10.1% of Tier 1). The remaining 125 Tier 1
blueprints represent the primary production backlog. At the observed rate of ~2-3
blueprints per production session, Tier 1 completion requires approximately 42-63
sessions. This is a resource planning risk, not a schema or KG risk.

---

## 7. Summary

| Metric | Value |
|---|---|
| Total Mathematics KG concepts | **908** |
| Tier 1 count | **139** (15.3%) |
| Tier 2 count | **309** (34.0%) |
| Tier 3 count | **460** (50.7%) |
| Tier 1 blueprints already authored | 14 |
| Tier 1 blueprints remaining | 125 |
| Tier 2 blueprints remaining | 309 |
| Tier 3 blueprints remaining | 460 |
| Total blueprints remaining | **894** |
| Risks identified | 6 (R-1 through R-6) |
| Classification method | Graph-theoretic ROI score (8 metrics, BFS transitive closure) |
| KG source | `docs/mathematics/kg/graph.json` v1.0.1 (status=frozen) |

**Tier 1 domain leaders:** `math.found` (27), `math.geom` (18), `math.alg` (17),
`math.calc` (14), `math.prob` (14), `math.arith` (11).

**Recommended authoring order within Tier 1:** Cluster A (Universal Foundation) →
Cluster B (Arithmetic) → Cluster C (Geometry) → Cluster D (Algebra) → Cluster E
(Functions) → Cluster F (Calculus) → Cluster G (Probability) → Cluster H (Linear
Algebra) → Cluster I (Sequences) → Cluster J (Abstract Algebra) → Cluster K (Trig) →
Cluster L (ODEs) → Cluster M (Complex Analysis) → Cluster N (Logic Extensions) →
Cluster O (Number Theory) → Cluster P (Statistics) → Cluster Q (Topology).

<!-- BLUEPRINT: math.real.metric-space -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Metric Space
**Concept ID:** `math.real.metric-space`
**KG Fields:** difficulty=expert | bloom=understand | estimated_hours=5 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.real.metric-space |
| name | Metric Space |
| difficulty | expert |
| bloom | understand |
| estimated_hours | 5 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.found.set-theory, math.found.real-numbers |
| cross_links | math.top.topological-space (Tier 1); math.fnal.normed-space (NOT Tier 1) |
| P76_mode | cross-link probe |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.found.set-theory**: sets, subsets, Cartesian products X×X; functions with specified domain/codomain; set-builder notation
- **math.found.real-numbers**: ℝ and its order; absolute value |x−y| as distance on the line; triangle inequality for real numbers |a+b|≤|a|+|b|; non-negativity

### Target Knowledge State
Student can state the three metric axioms (identity of indiscernibles d(x,y)=0⟺x=y, symmetry, triangle inequality) and the implied non-negativity; verify whether a given function d:X×X→ℝ is a metric; work with the standard examples (ℝ with |x−y|, ℝⁿ with Euclidean/taxicab/max metrics, discrete metric on any set, sup metric on C([a,b])); define open balls B(x,r)={y: d(x,y)<r} and describe their shape under different metrics; and understand that a metric abstracts "distance" so that limits and continuity can be defined on arbitrary sets.

### Conceptual Obstacles
1. Assuming a metric must be the Euclidean formula — the metric axioms admit many distances on the same set (taxicab, max, discrete); "distance" is whatever satisfies the axioms, and different metrics give differently-shaped balls
2. Believing non-negativity must be a separate axiom — d(x,y)≥0 follows from the other axioms: 0=d(x,x)≤d(x,y)+d(y,x)=2d(x,y); students who memorize four axioms without seeing the derivation miss the economy of the definition
3. Misreading the triangle inequality direction — writing d(x,z)≥d(x,y)+d(y,z) or applying it with the wrong intermediate point; the inequality bounds the direct distance ABOVE by the detour distance: d(x,z)≤d(x,y)+d(y,z)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | METRIC-IS-EUCLIDEAN | Student equates "metric" with the Euclidean distance formula √(Σ(xᵢ−yᵢ)²); rejects the discrete metric or taxicab metric as "not real distances"; cannot conceive of two different metrics on the same set | Any non-Euclidean example; open balls that are not round; the discrete metric |
| MC-2 | NONNEGATIVITY-AS-AXIOM | Student lists d≥0 as an independent axiom and cannot derive it; misses that the three stated axioms force it, indicating rote memorization rather than structural understanding | Axiom verification tasks; "how many axioms does a metric have?" |
| MC-3 | TRIANGLE-DIRECTION-REVERSED | Student writes the triangle inequality as d(x,z)≥d(x,y)+d(y,z), or uses it to bound a detour below by the direct path; produces invalid verification arguments | Verifying candidate metrics; proving properties from the axioms |

**Foundational Misconception:** MC-1 (METRIC-IS-EUCLIDEAN) — the entire purpose of the metric-space abstraction is to free "distance" from any single formula; a student who identifies metric with Euclidean distance has missed the concept itself and cannot progress to open sets, completeness, or topology.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — expert learner starts by measuring the SAME pair of points in ℝ² three different ways (Euclidean, taxicab, max), discovering that all three behave like distances, before extracting the shared axioms.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: distance from (0,0) to (3,4) under Euclidean (5), taxicab (7), max (4) metrics; all three satisfy the same structural properties; P: unit balls under the three metrics (circle, diamond, square); A: formal metric axioms + derivation of non-negativity
2. **A02 P06 CONTRAST PAIR** — valid metrics vs. axiom-failures (d(x,y)=(x−y)² fails triangle; d(x,y)=|x−2y| fails symmetry/identity); discrete metric on any set; sup metric on C([0,1])
3. **A03 P03 ANALOGY BRIDGE** — open ball B(x,r) as generalization of interval (x−r, x+r); convergence and continuity restated in metric language; bridge toward open sets
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Three Distances, One Structure

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Break MC-1 at first contact by presenting three legitimate metrics on ℝ² before stating the axioms; derive non-negativity to preempt MC-2; make the axioms an abstraction of observed common structure

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (measuring (0,0) to (3,4) three ways):**

How far is P=(3,4) from the origin O=(0,0)? It depends on how you measure:

- **Euclidean (as the crow flies):** d₂(O,P)=√(3²+4²)=√25=**5**
- **Taxicab (city-block driving):** d₁(O,P)=|3|+|4|=**7**
- **Max / Chebyshev (chess-king moves scale):** d∞(O,P)=max(|3|,|4|)=**4**

Three different numbers — yet each behaves like a distance:
- Each gives 0 exactly when the points coincide
- Each is symmetric: distance O→P equals P→O
- Each obeys "no shortcut through a third point": going O→Q→P is never shorter than O→P directly

**Stage P — Pictorial (unit balls B(0,1)={y: d(0,y)<1} under each metric):**

```
   Euclidean d₂        Taxicab d₁          Max d∞
      ___                  /\              ┌────┐
    /     \               /  \             │    │
   |   •   |             ⟨  • ⟩            │  • │
    \ ___ /               \  /             │    │
                           \/              └────┘
    (circle)            (diamond)          (square)
```

Same set ℝ², same center, same radius — three different ball shapes. "Ball" means {y: d(x,y)<r}, whatever d is.

**Stage A — Abstract (the metric axioms):**

**Definition:** A **metric space** is a pair (X, d) where X is a set and d: X×X → ℝ satisfies, for all x,y,z∈X:

| # | Axiom | Name |
|---|-------|------|
| M1 | d(x,y)=0 ⟺ x=y | Identity of indiscernibles |
| M2 | d(x,y)=d(y,x) | Symmetry |
| M3 | d(x,z) ≤ d(x,y)+d(y,z) | Triangle inequality |

**Theorem (non-negativity is free):** d(x,y) ≥ 0 for all x,y.

*Proof:* By M3 with z=x: d(x,x) ≤ d(x,y)+d(y,x). By M1, d(x,x)=0. By M2, d(y,x)=d(x,y). So 0 ≤ 2d(x,y), hence d(x,y) ≥ 0. ∎

Only three axioms are needed; non-negativity is a consequence, not an assumption.

**Standard examples:**
- (ℝ, |x−y|) — the prototype; every axiom reduces to properties of absolute value
- (ℝⁿ, d₂), (ℝⁿ, d₁), (ℝⁿ, d∞) — three metrics on the same set
- **Discrete metric** on ANY set X: d(x,y)=0 if x=y, d(x,y)=1 if x≠y — every set carries at least this metric
- (C([a,b]), d_sup) with d_sup(f,g)=max_{x∈[a,b]}|f(x)−g(x)| — distance between functions

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** For the taxicab metric d₁ on ℝ², compute d₁((1,2),(4,−2)). Then verify the triangle inequality for the three points x=(1,2), y=(4,2), z=(4,−2): compute d₁(x,z), d₁(x,y), d₁(y,z) and check the inequality.

**CORRECT:** d₁((1,2),(4,−2))=|1−4|+|2−(−2)|=3+4=7. d₁(x,y)=|1−4|+|2−2|=3; d₁(y,z)=|4−4|+|2−(−2)|=4. Check: d₁(x,z)=7 ≤ 3+4=7 ✓ (equality — the detour through y is along a shortest taxicab path).
→ "Correct. Note the equality case: in the taxicab metric, axis-aligned detours can be exactly as short as the 'direct' route — a genuinely non-Euclidean phenomenon." → Proceed to A02.

**PARTIAL:** Student computes d₁ correctly but checks 7 ≥ 3+4 and declares the triangle inequality "satisfied by equality" with reversed direction (MC-3 tendency).
→ "The triangle inequality reads d(x,z) ≤ d(x,y)+d(y,z): the direct distance is at most the detour. Here 7 ≤ 7 ✓ — equality is allowed. The inequality would FAIL only if the direct distance exceeded the detour."

**INCORRECT:** Student computes d₁((1,2),(4,−2))=√(9+16)=5 (uses the Euclidean formula, MC-1).
→ "That is the Euclidean distance d₂. The taxicab metric adds coordinate differences without squaring: d₁((a,b),(c,d))=|a−c|+|b−d|=|1−4|+|2+2|=3+4=7. Different metric, different number — both are valid metrics on ℝ²."

**NO_RESPONSE:** → "Taxicab distance sums the absolute coordinate differences: d₁((1,2),(4,−2))=|1−4|+|2−(−2)|=3+4=7. For the triangle check: d₁(x,y)=3 (horizontal leg), d₁(y,z)=4 (vertical leg). Triangle inequality: 7 ≤ 3+4=7 ✓."

---

### Teaching Action A02 — Contrast: Valid Metrics vs Axiom Failures

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Build verification fluency by pairing genuine metrics with near-misses that fail exactly one axiom; establish the discrete metric and sup metric as legitimate; address MC-3 with an explicit triangle-failure computation

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — d(x,y)=|x−y| (metric) vs d(x,y)=(x−y)² (NOT a metric) on ℝ:**

|x−y|: M1 ✓ (|x−y|=0 iff x=y); M2 ✓; M3 ✓ (standard triangle inequality).

(x−y)²: M1 ✓ and M2 ✓ hold. Test M3 with x=0, y=1, z=2:
- d(x,z)=(0−2)²=4
- d(x,y)+d(y,z)=(0−1)²+(1−2)²=1+1=2
- Is 4 ≤ 2? **No — M3 fails.** Squaring penalizes long distances too much: a detour through the midpoint becomes "shorter" than the direct route, which the axioms forbid.

(But note: d(x,y)=√|x−y| IS a metric — concavity preserves the triangle inequality.)

**Contrast 2 — Symmetry/identity failures:**

d(x,y)=|x−2y| on ℝ: test M1 at x=2, y=1: d(2,1)=|2−2|=0 but 2≠1 — **M1 fails** (distinct points at distance 0). Also d(1,2)=|1−4|=3 while d(2,1)=0 — **M2 fails**. Not a metric.

**Contrast 3 — The discrete metric (valid on ANY set):**

d(x,y)=0 if x=y, 1 if x≠y. Check M3: if x=z, LHS=0≤anything ✓. If x≠z, LHS=1; then y cannot equal both x and z, so the RHS contains at least one term equal to 1, giving RHS≥1 ✓. All axioms hold — **every set, even with no algebraic or geometric structure, is a metric space** under the discrete metric. (Balls: B(x,r)={x} for r≤1, B(x,r)=X for r>1.)

**Contrast 4 — Distance between functions (sup metric):**

On C([0,1]), d_sup(f,g)=max_{x∈[0,1]}|f(x)−g(x)|. Example: f(x)=x, g(x)=x². |x−x²| is maximized at x=1/2 with value 1/4, so d_sup(f,g)=1/4. The "points" of this metric space are entire functions — the metric concept applies far beyond ℝⁿ.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Is d(x,y)=|x−y|+1 a metric on ℝ? Check each axiom.

**CORRECT:** M1 fails: d(x,x)=|x−x|+1=1≠0, so d(x,x)=0 is violated for every x. Not a metric. (M2 holds; M3 holds: |x−z|+1 ≤ |x−y|+|y−z|+2 ✓ — but one failed axiom suffices.)
→ "Correct. A single axiom failure disqualifies the candidate — no need to salvage it. Interesting variant: d(x,y)=0 for x=y and |x−y|+1 for x≠y IS a metric." → Proceed to A03.

**PARTIAL:** Student checks M2 and M3, finds them satisfied, and concludes it is a metric without testing M1.
→ "Check M1 first — it is usually fastest: d(x,x)=|x−x|+1=0+1=1. The axiom requires d(x,x)=0. Failure. Verification protocol: test all three axioms; any single failure ends the verification with 'not a metric'."

**INCORRECT:** Student claims M3 fails because of the +1 terms.
→ "Test M3 concretely: d(x,z)=|x−z|+1 and d(x,y)+d(y,z)=|x−y|+|y−z|+2. Since |x−z|≤|x−y|+|y−z|, we get |x−z|+1 ≤ |x−y|+|y−z|+1 < |x−y|+|y−z|+2. M3 actually holds. The failing axiom is M1: d(x,x)=1≠0."

**NO_RESPONSE:** → "Start with M1: does d(x,x)=0? Compute d(x,x)=|x−x|+1=1. The axiom requires 0. M1 fails, so d is not a metric — no further checking needed."

---

### Teaching Action A03 — Open Balls and Why Metrics Matter

**Primitive:** P03 ANALOGY BRIDGE
**Purpose:** Bridge from the familiar interval (x−r, x+r) on ℝ to the open ball B(x,r) in any metric space; show that limits and continuity are metric-expressible, previewing the topological viewpoint (cross-link)

---

**[P03 — ANALOGY BRIDGE]**

**Source (familiar):** On ℝ, "all points within distance r of x" is the open interval:
$$(x−r,\, x+r) = \{y ∈ ℝ : |x−y| < r\}$$

Everything in elementary analysis — limits, continuity, convergence — is phrased with such intervals: "for every ε>0 there is δ>0 such that |x−a|<δ implies |f(x)−f(a)|<ε."

**Bridge:** Replace |x−y| by an arbitrary metric d. The interval generalizes to the **open ball**:
$$B(x, r) = \{y ∈ X : d(x, y) < r\}$$

**Target (general metric space):** Every ε-δ definition transfers verbatim:

- **Convergence:** xₙ → x in (X,d) ⟺ d(xₙ, x) → 0 ⟺ for every ε>0, the sequence eventually stays inside B(x, ε)
- **Continuity:** f: (X,d_X) → (Y,d_Y) is continuous at a ⟺ for every ε>0 there is δ>0 with f(B(a,δ)) ⊆ B(f(a),ε)

**Where the analogy extends and where it strains:**
- ✓ Extends: all limit/continuity definitions work in ANY metric space — including spaces of functions (sup metric), so "a sequence of functions converging uniformly" is just convergence in (C([a,b]), d_sup)
- ⚠ Strains: ball SHAPE depends on the metric (diamond, square, singleton under the discrete metric); intuition tied to round balls misleads
- ⚠ Strains: under the discrete metric, xₙ→x forces xₙ=x eventually (balls of radius ½ are singletons) — convergence can be far more restrictive than Euclidean intuition suggests

**Preview (toward math.top.topological-space):** Call U⊆X **open** if every point of U has some ball around it inside U. The collection of open sets — not the metric values themselves — turns out to determine convergence and continuity. Different metrics (d₁, d₂, d∞ on ℝⁿ) can generate the SAME open sets. Topology takes this final abstraction step: keep the open sets, discard the metric.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** In the metric space (ℝ², d∞) with d∞((a,b),(c,d))=max(|a−c|,|b−d|), describe the open ball B((0,0), 1) as a set and as a geometric shape. Is the point (0.9, 0.9) in this ball? Would it be in the Euclidean ball B₂((0,0),1)?

**CORRECT:** B((0,0),1)={(x,y): max(|x|,|y|)<1}={(x,y): |x|<1 and |y|<1} — the open square (−1,1)×(−1,1). (0.9,0.9): max(0.9,0.9)=0.9<1 → inside the d∞ ball. Euclidean: √(0.81+0.81)=√1.62≈1.27>1 → NOT in the Euclidean ball.
→ "Correct. The same point is 'within distance 1' under one metric and not another — distance is metric-relative." → Proceed to A04.

**PARTIAL:** Student identifies the square but answers the (0.9,0.9) question with Euclidean reasoning for both.
→ "For the d∞ ball, use the d∞ formula: d∞((0,0),(0.9,0.9))=max(0.9,0.9)=0.9<1 → inside. Only for the Euclidean ball do you compute √(0.9²+0.9²)≈1.27>1 → outside. One point, two metrics, two answers."

**INCORRECT:** Student describes B((0,0),1) as the unit disc (MC-1).
→ "The disc is the Euclidean ball. Under d∞, the condition is max(|x|,|y|)<1, which means BOTH |x|<1 AND |y|<1 — a square, not a disc. Check a corner-ish point: (0.9,0.9) has max-distance 0.9 from the origin, so it's inside, even though it's Euclidean-distance ≈1.27 away."

**NO_RESPONSE:** → "Unpack the definition: B((0,0),1)={(x,y): d∞((0,0),(x,y))<1}={(x,y): max(|x|,|y|)<1}. The max of two numbers is <1 exactly when both are <1: the open square with corners (±1,±1). For (0.9,0.9): max(0.9,0.9)=0.9<1 → inside. Euclidean distance is √1.62≈1.27 → outside the Euclidean unit ball."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess understanding of the metric axioms, verification skill, ball geometry, and the cross-link toward topology

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** State the three metric axioms, and prove that they imply d(x,y) ≥ 0.

*Solution:* M1: d(x,y)=0⟺x=y; M2: d(x,y)=d(y,x); M3: d(x,z)≤d(x,y)+d(y,z). Non-negativity: 0=d(x,x)≤d(x,y)+d(y,x)=2d(x,y) (M3 with z=x, then M1, then M2), so d(x,y)≥0.

**Problem 2:** Is d(x,y)=|x³−y³| a metric on ℝ?

*Solution:* Yes. M1: |x³−y³|=0 ⟺ x³=y³ ⟺ x=y (cubing is injective on ℝ). M2: obvious. M3: |x³−z³|≤|x³−y³|+|y³−z³| (triangle inequality for absolute value applied to the reals x³,y³,z³). All axioms hold — a metric that distorts the line but never merges points.

**Problem 3:** In (ℝ², d₁), compute d₁((2,1),(−1,5)) and sketch/describe the ball B((0,0),2).

*Solution:* d₁=|2−(−1)|+|1−5|=3+4=7. B((0,0),2)={(x,y): |x|+|y|<2} — the open diamond (square rotated 45°) with vertices (±2,0),(0,±2).

**Problem 4:** Let X={a,b,c} with the discrete metric. List the elements of B(a, 1), B(a, 1.5), and determine whether the sequence a,a,a,… and the sequence a,b,a,b,… converge.

*Solution:* B(a,1)={x: d(a,x)<1}={a} (only a itself is at distance 0<1; b,c are at distance 1, not <1). B(a,1.5)=X={a,b,c}. Constant sequence a,a,a,… converges to a. Alternating a,b,a,b,… does not converge: for any candidate limit L, the ball B(L,½)={L} excludes infinitely many terms.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: cross-link probe — math.top.topological-space)*

**Prompt:** In a metric space (X,d), call a set U⊆X **open** if for every x∈U there exists r>0 with B(x,r)⊆U.

(a) Prove that every open ball B(a,s) is itself an open set. (Hint: for x∈B(a,s), take r=s−d(a,x) and use the triangle inequality.)

(b) On ℝ², the metrics d₂ (Euclidean) and d∞ (max) give differently-shaped balls. Show that every d∞-ball around a point contains a d₂-ball around the same point, and vice versa (you may argue via the inequalities d∞(x,y) ≤ d₂(x,y) ≤ √2·d∞(x,y)).

(c) Conclude from (b) that d₂ and d∞ define exactly the same open sets on ℝ² — and explain in one or two sentences why this suggests studying the open sets themselves (a "topological space") rather than any particular metric.

**Expected solution:**

(a) Let x∈B(a,s), so d(a,x)<s. Set r=s−d(a,x)>0. Claim B(x,r)⊆B(a,s): for any y with d(x,y)<r, the triangle inequality gives d(a,y) ≤ d(a,x)+d(x,y) < d(a,x)+r = d(a,x)+s−d(a,x) = s. So y∈B(a,s). Every point of the ball has a ball around it inside — the ball is open. ∎

(b) From d∞(x,y) ≤ d₂(x,y): if d₂(x,y)<r then d∞(x,y)<r, so B₂(x,r) ⊆ B∞(x,r) — every d∞-ball contains the d₂-ball of the same radius. From d₂(x,y) ≤ √2·d∞(x,y): if d∞(x,y)<r/√2 then d₂(x,y)<r, so B∞(x, r/√2) ⊆ B₂(x,r) — every d₂-ball contains a (smaller) d∞-ball. (Geometrically: every square contains a disc; every disc contains a smaller square.)

(c) A set U is d₂-open iff every point has a d₂-ball inside U; by (b) it then has a d∞-ball inside U as well, and conversely — so the d₂-open sets and the d∞-open sets coincide. Since convergence and continuity are expressible purely through open sets, the two metrics are indistinguishable for those purposes. This motivates abstracting away the metric and axiomatizing the family of open sets directly — which is precisely the definition of a topological space.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.85 × 5⌉ = ⌈4.25⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.real.open-sets, math.real.completeness-metric, math.real.compactness; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.real.metric-space assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — METRIC-IS-EUCLIDEAN (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Identifying 'metric' with the Euclidean formula is METRIC-IS-EUCLIDEAN. A metric is ANY function satisfying the three axioms — the Euclidean distance is one example among many, not the definition."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is the discrete metric (d=1 for distinct points) a real metric?"
- MC-1 response: "No, that's not measuring actual distance."
- Correct: "Yes — verify the three axioms; all hold."

**[P64 — CONCEPTUAL SHIFT]**
"The axioms ARE the definition of distance in mathematics; there is no external 'actual distance' to compare against. Verify the discrete metric: M1 ✓ by construction; M2 ✓ (the rule is symmetric in x,y); M3 ✓ (if x≠z, then y differs from at least one of them, so the RHS is ≥1=LHS). Three checks passed — it is a metric, full stop. The payoff of the abstraction: theorems proved from the axioms apply simultaneously to ℝⁿ, function spaces, and the discrete metric."

Practice: Verify that d(f,g)=∫₀¹|f(x)−g(x)|dx is a metric on C([0,1]) — a "distance" with no geometric picture at all (M1 uses continuity: a nonnegative continuous function with zero integral is identically zero).

---

### Repair Action B02 — NONNEGATIVITY-AS-AXIOM (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Listing d≥0 as a fourth independent axiom is NONNEGATIVITY-AS-AXIOM. It is a theorem: the three stated axioms already force it."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "How many axioms define a metric, and is d(x,y)≥0 one of them?"
- MC-2 response: "Four axioms; non-negativity is one."

**[P64 — CONCEPTUAL SHIFT]**
"Derive it in one line: apply M3 with z=x: d(x,x) ≤ d(x,y)+d(y,x). The left side is 0 by M1; the right side is 2d(x,y) by M2. So 0 ≤ 2d(x,y), i.e., d(x,y) ≥ 0. The derivation uses ALL three axioms — which is why the definition is economical: nothing redundant is assumed. Writing the proof yourself once fixes it permanently."

Practice: Reproduce the derivation from memory, citing which axiom justifies each step.

---

### Repair Action B03 — TRIANGLE-DIRECTION-REVERSED (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Writing d(x,z) ≥ d(x,y)+d(y,z) is TRIANGLE-DIRECTION-REVERSED. The triangle inequality says the DIRECT route is never longer than a detour: d(x,z) ≤ d(x,y)+d(y,z)."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Write the triangle inequality for points x, y, z."
- MC-3 response: d(x,z) ≥ d(x,y)+d(y,z), or the intermediate point placed on the left.

**[P64 — CONCEPTUAL SHIFT]**
"Anchor it physically: going from home (x) to school (z) directly can never be LONGER than going home → store (y) → school. Detours cost; they never save. So direct ≤ detour: d(x,z) ≤ d(x,y)+d(y,z). Sanity-check with ℝ: x=0, y=5, z=1. Direct: d(0,1)=1. Detour: d(0,5)+d(5,1)=5+4=9. Indeed 1 ≤ 9. The reversed inequality (1 ≥ 9) is absurd."

Practice: Use the triangle inequality to prove the "reverse triangle inequality" |d(x,z)−d(y,z)| ≤ d(x,y) — a standard consequence requiring correct direction twice.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | State the three axioms and derive non-negativity; compute d₁, d₂, d∞ for one pair of points in ℝ² |
| SR-2 | +3 days | Verify or refute two candidate metrics (one valid, one failing a single axiom); identify the failing axiom precisely |
| SR-3 | +7 days | Describe B(x,r) under d₂, d∞, and the discrete metric; state what convergence means under the discrete metric |
| SR-4 | +14 days | Prove open balls are open sets (P76(a) reconstruction); explain why d₂ and d∞ give the same open sets on ℝ² |

Retrieval flag: if student rejects a valid non-Euclidean metric (MC-1) or reverses the triangle inequality (MC-3) in any SR, re-execute B01/B03 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|--------------|
| Requires (Tier-1) | math.found.set-theory | X is an arbitrary set; d is a function on the Cartesian product X×X; set-builder definitions of balls |
| Requires (Tier-1) | math.found.real-numbers | The metric takes values in ℝ; absolute value on ℝ is the prototype metric; the real triangle inequality underlies most verifications |
| Cross-link (Tier-1) | math.top.topological-space | Metric balls generate open sets; equivalent metrics give identical topologies; P76 probes exactly this bridge (open balls are open; d₂ and d∞ topologically indistinguishable) |
| Cross-link (NOT Tier-1) | math.fnal.normed-space | A norm induces a metric via d(x,y)=‖x−y‖; documented for future linkage, not probed |
| Unlocks | math.real.open-sets | Open/closed sets, interior, closure are defined via balls in a metric space |
| Unlocks | math.real.completeness-metric | Cauchy sequences and completeness are metric-space notions |
| Unlocks | math.real.compactness | Sequential compactness and total boundedness live in metric spaces |

**GR-9:** cross_links include math.top.topological-space (Tier 1) → P76 mode = cross-link probe (probe targets the metric→topology bridge).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=5 → standard structure (3 main TAs + gate)
- bloom=understand → V-4 = N/A (no P07 required; definition, verification, and structural understanding tasks)
- CPA_entry = C for expert learner: three concrete distance computations on the SAME pair of points in A01 before any axiom is stated

**Key teaching insight:** MC-1 must be broken in the first five minutes or it contaminates everything downstream. Presenting three metrics simultaneously — before the word "axiom" appears — makes plurality of distance the default mental model rather than an exotic afterthought. The unit-ball picture (circle/diamond/square) is the single most memorable artifact of this blueprint; every SR session should be able to reproduce it.

**Non-negativity derivation (A01/B02):** Deliberately presented as a theorem immediately after the axioms. This is both a fact and a meta-lesson: good definitions are minimal, and checking candidate metrics requires exactly three verifications, not four.

**P76 design:** The probe is the metric→topology bridge in three graded steps: (a) is a self-contained triangle-inequality proof (the single most-assigned exercise in any metric-space course); (b) is a concrete equivalence-of-metrics argument using the sandwich inequalities; (c) asks for the conceptual conclusion that motivates the cross-linked concept (topological space) — open sets, not metric values, carry convergence and continuity. A student completing (c) has effectively derived the motivation for the next Tier-1 concept.

**Discrete metric emphasis:** Problem 4 (P77) uses the discrete metric to stress-test intuition: singleton balls and non-convergent bounded sequences are where Euclidean intuition fails loudest, making it the best diagnostic for residual MC-1.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.real.metric-space ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.found.set-theory ✓, math.found.real-numbers ✓ | PASS |
| V-3 | CPA entry = C for expert difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires, both cross-links (T1 and non-T1), unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | math.top.topological-space is Tier 1 → P76=cross-link probe ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=5 → standard (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Open-ball openness proof (r=s−d(a,x)); metric equivalence via d∞≤d₂≤√2·d∞; topology motivation ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

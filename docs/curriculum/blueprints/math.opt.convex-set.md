# Blueprint: math.opt.convex-set

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.convex-set |
| Title | Convex Set |
| Domain | math.opt |
| Difficulty | proficient |
| Bloom level | understand |
| Estimated hours | 3 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.linalg.vector |
| Cross-links | — |
| Unlocks | math.opt.convex-optimization |

## Component 1 — Learning Objective
Given a subset S of ℝⁿ, the student applies the line-segment criterion (for all x,y∈S and t∈[0,1], tx+(1−t)y∈S) to classify S as convex or non-convex, identifies canonical convex sets (balls, half-spaces, hyperplanes, polyhedra, cones), explains why convexity is closed under intersection and affine maps, and distinguishes convex from non-convex regions by counterexample.

## Component 2 — CPA Entry Stage
**A — Abstract** (set-builder notation; line-segment condition; algebraic verification)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | CONVEX-MEANS-SMOOTH | Student conflates convexity with smoothness of boundary; believes a square (with corners) is not convex | Type 2 — perceptual intuition (smooth curves look "more convex") |
| MC-2 | CONVEX-UNION-CLOSED | Student believes the union of two convex sets is convex; confuses with intersection rule | Type 1 — overgeneralization (closure feels symmetric for both operations) |
| MC-3 | MIDPOINT-SUFFICIENT | Student checks only the midpoint t=1/2 rather than all t∈[0,1]; concludes the star-shaped set is convex because all midpoints are inside | Type 3 — language contamination ("middle" collapses t to 1/2) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of convexity:**

| Representation | Instance |
|---|---|
| Geometric | Any two points in the set can be connected by a line segment lying entirely within the set |
| Algebraic | ∀x,y∈S, ∀t∈[0,1]: tx+(1−t)y∈S |
| Convex combination | S contains all convex combinations of its elements |
| Contrapositive | ∃x,y∈S and t∈(0,1) such that tx+(1−t)y∉S → S is non-convex |

**Example gallery (ℝ²):**

| Set | Convex? | Why |
|---|---|---|
| Disk {x: ‖x‖≤1} | Yes | Ball is convex in any norm |
| Square [0,1]² | Yes | Intersection of 4 half-spaces |
| Triangle | Yes | Intersection of 3 half-spaces |
| Star polygon | No | Two tips connected by segment exits set |
| Annulus {x: 1≤‖x‖≤2} | No | Segment between opposite sides exits interior ring |
| Single point | Yes | Trivially (t·p+(1−t)·p=p) |

**P49 checkpoint:**
- CORRECT → "Convexity is a line-segment property, not a smoothness property. A square's corners don't violate it." → A02
- PARTIAL (knows definition, misclassifies square) → "Take two corners of the square. Does the segment between them stay in [0,1]²?" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Choose x=(0,0) and y=(1,1) in the unit disk. Is (0.5,0.5) in the disk?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Convexity-preserving operations — pattern gallery:**

| Operation | Result | Counterexample if dropped |
|---|---|---|
| Intersection of convex sets | Convex | — |
| Union of convex sets | NOT convex in general | Two disjoint disks |
| Affine image φ(S)={Ax+b: x∈S} | Convex if S convex | — |
| Preimage φ⁻¹(T)={x: Ax+b∈T} | Convex if T convex | — |
| Cartesian product S₁×S₂ | Convex if both convex | — |

**Proof sketch for intersection:** Let x,y∈∩ᵢSᵢ. Then x,y∈Sᵢ for all i. Each Sᵢ convex → tx+(1−t)y∈Sᵢ → tx+(1−t)y∈∩ᵢSᵢ. ✓

**Canonical representation via intersection:** Every convex polytope = finite intersection of half-spaces {x: aᵢᵀx≤bᵢ}. Each half-space is convex; their intersection is convex.

**P49 checkpoint:**
- CORRECT → "Union is NOT closed; intersection IS. Affine maps preserve convexity." → A03
- PARTIAL (knows intersection, uncertain about union) → "Draw two disjoint line segments on ℝ. Is their union convex?" → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Is {x∈ℝ: 0≤x≤1} convex? Is {x∈ℝ: 2≤x≤3} convex? Is their union convex?" → TB-R02 → A03

### A03 — P06 CONTRAST PAIR
**Convex vs. non-convex sets that look similar:**

| Feature | Half-space {x: aᵀx≤b} | Hyperplane complement {x: aᵀx≠b} (two half-spaces minus boundary) |
|---|---|---|
| Convex? | Yes | No (disconnected) |
| Bounded? | No | No |
| Line-segment test | Segment between any two points on same side stays in set | Choose one point each side: segment crosses hyperplane |

| Feature | Norm ball {x: ‖x‖≤1} | Norm sphere {x: ‖x‖=1} |
|---|---|---|
| Convex? | Yes | No (for n≥2) |
| Proof | tx+(1−t)y ≤ t‖x‖+(1−t)‖y‖ ≤ 1 (triangle ineq.) | Segment between antipodal points passes through 0, not on sphere |

**P49 checkpoint:**
- CORRECT → "The boundary alone (sphere, hyperplane) is typically NOT convex; filled sets (ball, half-space) are." → Gate (P91)
- PARTIAL → "Apply the line-segment test between two opposite points on the unit circle." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Is (0,0) on the unit circle? Is (1,0) on the unit circle? Is (0.5,0) on the unit circle?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 CONVEX-MEANS-SMOOTH):**
Step 1 — "Convexity is about interior content, not boundary smoothness. A set with jagged boundaries can be convex; a smooth-looking crescent is not." Step 2 — Draw square: pick corners (0,0) and (1,1) — segment y=x lies in [0,1]². Draw circle: same. Then draw a crescent: pick two tips — the segment exits the crescent. Step 3 — Re-verify square with the algebraic condition: t(0,0)+(1−t)(1,1)=(1−t,1−t)∈[0,1]² for t∈[0,1]. ✓

**TB-R02 (MC-2 CONVEX-UNION-CLOSED):**
Step 1 — "Intersection: what's in BOTH sets stays together. Union: what's in EITHER set — two separate blobs joined — has a gap between them." Step 2 — S₁={x∈ℝ²: ‖x−(−1,0)‖≤0.5} (left disk), S₂={x∈ℝ²: ‖x−(1,0)‖≤0.5} (right disk). Both convex. Take x=(−1,0)∈S₁, y=(1,0)∈S₂. Midpoint=(0,0)∉S₁∪S₂. ✓ Non-convex. Step 3 — Correct rule: ∩ preserves convexity; ∪ does not.

**TB-R03 (MC-3 MIDPOINT-SUFFICIENT):**
Step 1 — "Checking t=1/2 only tests one midpoint. Convexity requires ALL t∈[0,1]." Step 2 — Star polygon: choose two tips x,y of the star. Midpoint (t=1/2) of nearby tips might be inside. But the segment at t=0.3 exits through the inner concave notch. Step 3 — Re-state: must verify tx+(1−t)y∈S for EVERY t in [0,1], not just t=1/2.

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Prove that every half-space H={x∈ℝⁿ: aᵀx≤b} is a convex set.
2. Let S={x∈ℝ²: x₁²+x₂²≤4} and T={x∈ℝ²: x₁≥0}. Is S∩T convex? Is S∪T convex? Justify both.
3. Is the set {(x,y)∈ℝ²: xy≥1, x>0} convex? Prove or give a counterexample.
4. Show that the image of a convex set under an affine map f(x)=Ax+b is convex.

**P55 — Reflect & Consolidate:** "Convexity is the line-segment condition on all pairs of points. It is closed under intersection and affine images, but not union."

**P76 — Transfer Probe (Independence mode):**
The epigraph of a function f: ℝⁿ→ℝ is epi(f) = {(x,t)∈ℝⁿ⁺¹: f(x)≤t}. Show that f is a convex function (f(tx+(1−t)y)≤tf(x)+(1−t)f(y)) if and only if epi(f) is a convex set in ℝⁿ⁺¹. (Establish both directions.)

**P55 — Reflect & Consolidate:** "The epigraph connection shows convex functions and convex sets are two faces of one concept: this is why convex analysis treats them uniformly."

**P75 — Mastery Assessment:**
"(a) Prove that any convex polytope P={x: Ax≤b} is convex. (b) Is the set {x∈ℝ²: |x₁|+|x₂|≤1} (the ℓ₁ unit ball) convex? Prove it. (c) Give an example of a non-convex set whose every pair of points has a convex hull contained in the set (so midpoints are always in the set, but the set is not convex). Why doesn't this contradict the definition?"

**P55 — Reflect & Consolidate:** "Part (c) illustrates why the full condition ∀t∈[0,1] is needed — not just t=1/2."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED; advance to math.opt.convex-optimization
- Score 4/5 → REVIEW line-segment condition and intersection rule; replay A01–A02
- Score ≤ 3/5 → PREREQUISITE GAP in math.linalg.vector; reassign before retry

**P78 — Completion:** Convex set certified. Student can apply and prove the line-segment criterion and identify convexity-preserving operations.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Epigraph of a convex function ↔ convex set in ℝⁿ⁺¹ (the fundamental duality between convex functions and convex sets)
Skill tested: Apply line-segment definition in a product space; translate functional inequality into geometric containment

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

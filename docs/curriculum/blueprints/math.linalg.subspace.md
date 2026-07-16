<!-- BLUEPRINT: math.linalg.subspace -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Subspace
**Concept ID:** `math.linalg.subspace`
**KG Fields:** difficulty=proficient | bloom=understand | estimated_hours=3 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.linalg.subspace |
| name | Subspace |
| difficulty | proficient |
| bloom | understand |
| estimated_hours | 3 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | P (Pictorial) |
| requires (Tier-1) | math.linalg.vector-space |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.linalg.vector-space**: the 8 vector-space axioms; zero vector; closure as part of the operation definitions; the 3-condition subspace test previewed in that blueprint's A03; examples ℝⁿ, P₂, M₂ₓ₂

### Target Knowledge State
Student can state the subspace definition (a subset of a vector space that is itself a vector space under the inherited operations); apply the 3-condition test (contains 0, closed under addition, closed under scalar multiplication) fluently and justify why the remaining axioms are inherited; classify the subspaces of ℝ² and ℝ³ geometrically (origin, lines/planes through the origin, whole space); recognise standard non-subspaces (sets missing 0, sets not closed); and identify subspaces defined by homogeneous linear conditions.

### Conceptual Obstacles
1. Believing any subset of a vector space is a subspace — a subspace must be closed under the operations; most subsets (a disc, a line not through the origin, a quadrant) fail closure
2. Forgetting the zero-vector requirement — a line like y=x+1 in ℝ² is closed-looking but excludes (0,0); checking 0∈W first is the fastest disqualifier, and its omission is the most common verification error
3. Confusing homogeneous with non-homogeneous conditions — {(x,y,z): x+y+z=0} is a subspace but {(x,y,z): x+y+z=1} is not; the constant term decides, and students who pattern-match "linear equation → subspace" miss this

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | ANY-SUBSET-IS-SUBSPACE | Student treats an arbitrary subset (disc, quadrant, curve) as a subspace without testing closure; assumes geometric containment in V is sufficient | Any subset-classification task; especially visually "nice" sets like the unit disc or the first quadrant |
| MC-2 | ZERO-CHECK-OMITTED | Student verifies closure conditions but never checks 0∈W; accepts affine lines/planes (not through the origin) as subspaces | Lines y=mx+b with b≠0; planes x+y+z=c with c≠0; solution sets of non-homogeneous systems |
| MC-3 | NONHOMOGENEOUS-AS-SUBSPACE | Student classifies solution sets of ANY linear equation as subspaces, missing that only homogeneous conditions (=0) give subspaces; conflates "defined by a linear equation" with "subspace" | Ax=b vs Ax=0 solution sets; constraint sets with nonzero constants |

**Foundational Misconception:** MC-2 (ZERO-CHECK-OMITTED) — the zero check is the single fastest and most decisive test; omitting it lets every affine (shifted) set through, and it is the root error behind MC-3 as well (nonhomogeneous solution sets fail precisely at the zero check).

---

## Component 3 — Scaffolding Protocol

**Entry point:** P (Pictorial) — proficient learner classifies pictured subsets of ℝ² (lines through/off origin, disc, quadrant) before the formal test, building geometric intuition first.

**Scaffolding sequence:**
1. **A01 P04 PATTERN INDUCTION** — P: gallery of six subsets of ℝ² with pass/fail verdicts; induce the three conditions from which sets survive; A: formal definition + theorem that the 3 conditions suffice (axiom inheritance argument)
2. **A02 P06 CONTRAST PAIR** — homogeneous vs non-homogeneous condition sets; y=2x vs y=2x+1; complete classification of subspaces of ℝ² and ℝ³
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Which Subsets Survive? Inducing the Subspace Test

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Let a gallery of concrete subsets of ℝ² reveal the three survival conditions; then prove that the three conditions are sufficient (inheritance of the remaining axioms); address MC-1 head-on with failing examples

---

**[P04 — PATTERN INDUCTION]**

**Stage P — Pictorial (six candidate subsets of ℝ²):**

| # | Subset W | Contains (0,0)? | u,v∈W ⟹ u+v∈W? | k·u∈W? | Subspace? |
|---|----------|-----------------|------------------|--------|-----------|
| 1 | {(0,0)} (just the origin) | ✓ | ✓ (0+0=0) | ✓ (k·0=0) | **YES** |
| 2 | Line y=2x | ✓ | ✓ | ✓ | **YES** |
| 3 | Line y=2x+1 | ✗ (0≠2·0+1) | — | — | **NO** |
| 4 | Unit disc x²+y²≤1 | ✓ | ✗ ((1,0)+(0,1)=(1,1), norm √2>1) | ✗ (2·(1,0)=(2,0)) | **NO** |
| 5 | First quadrant x≥0, y≥0 | ✓ | ✓ | ✗ ((−1)·(1,1)=(−1,−1)) | **NO** |
| 6 | All of ℝ² | ✓ | ✓ | ✓ | **YES** |

Pattern observed: the survivors are exactly the sets that (a) contain the origin, (b) are closed under addition, (c) are closed under scalar multiplication. Geometric containment (rows 4, 5) is not enough (MC-1); passing through the origin alone (rows 4, 5 again) is not enough either.

**Row 2 verification (the template):** W={(x,2x): x∈ℝ}.
- 0: (0,0)=(0,2·0)∈W ✓
- Addition: (a,2a)+(b,2b)=(a+b, 2(a+b))∈W ✓
- Scalar: k(a,2a)=(ka, 2(ka))∈W ✓

**Stage A — Abstract (definition and sufficiency theorem):**

**Definition:** A subset W of a vector space V over F is a **subspace** if W is itself a vector space under the addition and scalar multiplication inherited from V.

**Theorem (3-condition subspace test):** A subset W ⊆ V is a subspace if and only if:
1. **0 ∈ W**
2. **u, v ∈ W ⟹ u+v ∈ W** (closed under addition)
3. **u ∈ W, k ∈ F ⟹ k·u ∈ W** (closed under scalar multiplication)

*Why the other axioms come free:* Axioms A1, A2, S1–S4 are identities holding for ALL vectors of V — they cannot fail on a subset. A3 is condition 1. A4 follows from condition 3: for u∈W, take k=−1 to get −u=(−1)·u∈W. So only closure and the zero vector need checking. ∎

*Verification protocol:* check condition 1 FIRST — it is a one-line computation and disqualifies most non-subspaces instantly (MC-2 prevention).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Is W = {(x, y) ∈ ℝ²: xy = 0} (the union of the two axes) a subspace of ℝ²? Apply the 3-condition test in order.

**CORRECT:** 0: (0,0) has 0·0=0 ✓. Scalar: k(x,y) with xy=0 gives (kx)(ky)=k²xy=0 ✓. Addition: take u=(1,0)∈W and v=(0,1)∈W; u+v=(1,1) with 1·1=1≠0 ✗. Fails closure under addition. **Not a subspace.**
→ "Correct. Each axis separately IS a subspace, but their union is not — unions of subspaces almost never are. (Intersections always are.)" → Proceed to A02.

**PARTIAL:** Student checks 0 and scalar closure, both pass, and concludes subspace without testing addition (incomplete test).
→ "Two conditions passed, but all three must hold. Test addition with one point from each axis: (1,0)+(0,1)=(1,1). Is (1,1) in W? 1·1=1≠0 — no. W fails closure under addition, so it is not a subspace."

**INCORRECT:** Student says not a subspace "because it's not a line or plane" without any test (MC-1-style pattern matching in reverse).
→ "The conclusion is right but the reasoning must come from the test, not the shape. Run it: (0,0)∈W ✓; scalar multiples stay on their axis ✓; but (1,0)+(0,1)=(1,1)∉W ✗. The addition failure is the reason."

**NO_RESPONSE:** → "Condition 1: (0,0) satisfies 0·0=0, so 0∈W ✓. Condition 3: scaling (x,0) gives (kx,0), still on the axis ✓. Condition 2: add (1,0) and (0,1) — both in W. Sum is (1,1); product 1·1=1≠0, so (1,1)∉W. Closure under addition fails: not a subspace."

---

### Teaching Action A02 — Homogeneous vs Non-Homogeneous; the Full Classification

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Address MC-2 and MC-3 with the sharpest available contrast (same line, shifted); classify all subspaces of ℝ² and ℝ³; connect homogeneous linear conditions to subspaces (previewing null spaces)

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — y=2x vs y=2x+1 (MC-2):**

| Test | W₁ = {(x,2x)} | W₂ = {(x,2x+1)} |
|------|---------------|------------------|
| 0∈W? | (0,0): 0=2·0 ✓ | (0,0): 0=2·0+1? 0≠1 ✗ |
| Verdict | Continue testing → subspace | **STOP — not a subspace** |

Same slope, same shape — the shift by 1 moves the line off the origin and instantly disqualifies it. The zero check took one line of arithmetic. (For completeness: W₂ also fails closure — (0,1)+(1,3)=(1,4), but 2·1+1=3≠4.)

**Contrast 2 — Homogeneous vs non-homogeneous conditions (MC-3):**

| Set | Condition type | 0-check | Subspace? |
|-----|----------------|---------|-----------|
| {(x,y,z): x+y+z=0} | homogeneous (=0) | 0+0+0=0 ✓ | YES |
| {(x,y,z): x+y+z=1} | non-homogeneous (=1) | 0+0+0=0≠1 ✗ | NO |
| {(x,y,z): 2x−y=0 and z=0} | homogeneous system | ✓ | YES (a line) |
| {(x,y): y=x²} | non-linear | ✓ passes! | NO — closure fails: (1,1)+(2,4)=(3,5), 5≠9 |

Rules of thumb (each verified by the test, never assumed):
- Solution sets of **homogeneous** linear systems (Ax=0) are always subspaces — this is the null space, coming next in the curriculum.
- A **nonzero constant** anywhere in the defining equation kills the zero check.
- **Non-linear** conditions can pass the zero check yet fail closure — the zero check alone is necessary, not sufficient (row 4).

**Contrast 3 — The complete catalogue for ℝ² and ℝ³:**

| Space | All subspaces |
|-------|---------------|
| ℝ² | {0}; every line through the origin; ℝ² itself |
| ℝ³ | {0}; every line through the origin; every plane through the origin; ℝ³ itself |

Nothing else. Every subspace of ℝⁿ is "flat, unbounded, and through the origin" — discs, quadrants, shifted lines, and curves are all excluded by the three conditions.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Classify each as subspace / not, giving the decisive reason: (a) {p ∈ P₂ : p(3)=0}, (b) {p ∈ P₂ : p(3)=2}, (c) {(x,y,z) ∈ ℝ³ : x=2y and z=−y}.

**CORRECT:** (a) Subspace: zero poly has 0(3)=0 ✓; (p+q)(3)=p(3)+q(3)=0 ✓; (kp)(3)=k·0=0 ✓. (b) Not: zero poly gives 0(3)=0≠2 — fails the zero check. (c) Subspace: homogeneous linear conditions; 0=(0,0,0) satisfies both; sums and multiples preserve x=2y, z=−y. (It is the line {(2t, t, −t)}.)
→ "Correct. Note (a)/(b) is the same contrast as y=2x vs y=2x+1, transplanted to polynomial space." → Proceed to A03.

**PARTIAL:** Student gets (a) and (c) right but calls (b) a subspace after verifying "closure-like" behaviour (MC-2/MC-3).
→ "Run the zero check on (b) first: the zero polynomial evaluates to 0 at x=3, and the condition demands 2. The zero vector is missing — disqualified immediately. Also closure fails: if p(3)=2 and q(3)=2 then (p+q)(3)=4≠2."

**INCORRECT:** Student rejects (a) because "polynomials aren't vectors" (MC-1 variant — subspace concept tied to ℝⁿ).
→ "P₂ is a vector space (established in the vector-space blueprint), so 'subspace' applies to subsets of it. The vectors are polynomials; the zero vector is the zero polynomial. Test (a): 0(3)=0 ✓, (p+q)(3)=0+0=0 ✓, (kp)(3)=k·0=0 ✓. Subspace."

**NO_RESPONSE:** → "(a) Zero poly: 0(3)=0 ✓; sums/multiples of polynomials vanishing at 3 also vanish at 3 ✓✓ → subspace. (b) Zero poly gives 0≠2 → not a subspace. (c) (0,0,0): 0=2·0 ✓, 0=−0 ✓; conditions are homogeneous linear, preserved by + and k· → subspace."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess fluent subspace classification across ℝⁿ, polynomial, and matrix spaces

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Is W = {(x, y, z) ∈ ℝ³ : 3x − y + 2z = 0} a subspace of ℝ³? Apply the full test.

*Solution:* 0: 3(0)−0+2(0)=0 ✓. Addition: if 3a₁−a₂+2a₃=0 and 3b₁−b₂+2b₃=0, then 3(a₁+b₁)−(a₂+b₂)+2(a₃+b₃)=0+0=0 ✓. Scalar: 3(ka₁)−(ka₂)+2(ka₃)=k·0=0 ✓. **Subspace** (a plane through the origin).

**Problem 2:** Is W = {(x, y) ∈ ℝ² : |x| = |y|} a subspace of ℝ²?

*Solution:* 0: |0|=|0| ✓. Scalar: |kx|=|k||x|=|k||y|=|ky| ✓. Addition: (1,1)∈W and (1,−1)∈W, but (1,1)+(1,−1)=(2,0) with |2|≠|0| ✗. **Not a subspace** (union of the two diagonal lines y=x and y=−x; unions fail).

**Problem 3:** Is the set of 2×2 symmetric matrices W = {A ∈ M₂ₓ₂ : Aᵀ = A} a subspace of M₂ₓ₂?

*Solution:* 0: Oᵀ=O ✓. Addition: (A+B)ᵀ=Aᵀ+Bᵀ=A+B ✓. Scalar: (kA)ᵀ=kAᵀ=kA ✓. **Subspace.**

**Problem 4:** Give the complete list of subspaces of ℝ² and state which item on the list the set {(t, −3t) : t ∈ ℝ} is.

*Solution:* {0}, lines through the origin, and ℝ² itself. The given set is the line y=−3x through the origin — an instance of the middle category. (Verify: contains (0,0) at t=0; closed under + and k·.)

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** Let V = C([0,1]) (continuous functions on [0,1], a vector space), and consider:

W₁ = {f ∈ V : f(0) = f(1)} (functions with equal endpoint values)
W₂ = {f ∈ V : f(0) = 1} (functions starting at height 1)
W₃ = {f ∈ V : f(x) ≥ 0 for all x} (non-negative functions)

(a) For each set, determine whether it is a subspace of V, applying the 3-condition test.
(b) For each failure, name the exact condition that fails and give a concrete witness.

**Expected solution:**

**W₁ — SUBSPACE:**
- 0: the zero function has 0(0)=0=0(1) ✓
- Addition: (f+g)(0)=f(0)+g(0)=f(1)+g(1)=(f+g)(1) ✓
- Scalar: (kf)(0)=kf(0)=kf(1)=(kf)(1) ✓

**W₂ — NOT a subspace:**
- Zero check fails: 0(0)=0≠1. Witness: the zero function is absent.
- (Also addition: f,g∈W₂ gives (f+g)(0)=2≠1.)

**W₃ — NOT a subspace:**
- 0 ✓ (zero function is non-negative); addition ✓ (sum of non-negatives is non-negative).
- Scalar closure fails: take f(x)=1 (constant, in W₃) and k=−1; then (kf)(x)=−1<0, so kf∉W₃. One negative scalar breaks it — same failure mode as the first quadrant in ℝ².

*Structural summary:* homogeneous linear condition (W₁) → subspace; nonzero constant (W₂) → fails at zero; inequality condition (W₃) → fails at negative scalars.

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

- MASTERY ACHIEVED → unlock math.linalg.null-space and math.linalg.column-space; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.linalg.subspace assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — ANY-SUBSET-IS-SUBSPACE (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Treating an arbitrary subset as a subspace is ANY-SUBSET-IS-SUBSPACE. Sitting inside a vector space is not enough — the subset must be closed under the operations and contain 0."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is the unit disc {(x,y): x²+y²≤1} a subspace of ℝ²?"
- MC-1 response: "Yes, it's a subset of ℝ² and contains the origin."

**[P64 — CONCEPTUAL SHIFT]**
"Containment and the origin are not the whole test. A subspace must let you add and scale WITHOUT LEAVING the set. Scale test on the disc: (1,0) is in the disc; 2·(1,0)=(2,0) has norm 2>1 — outside. One escape is fatal. Mental model: a subspace is 'operation-proof' — no addition, no scaling can take you out. Only flat, unbounded, origin-through sets survive in ℝⁿ."

Practice: For the strip {(x,y): −1≤y≤1}, find the specific scalar multiple that escapes (e.g. 3·(0,1)=(0,3)).

---

### Repair Action B02 — ZERO-CHECK-OMITTED (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Skipping the zero-vector check is ZERO-CHECK-OMITTED. It is condition 1 of the test and the fastest disqualifier — every affine (shifted) set fails it in one line."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is the line y=x+1 a subspace of ℝ²?"
- MC-2 response: "Yes — it's a line, and sums of points on a line stay on a line."

**[P64 — CONCEPTUAL SHIFT]**
"First question, always: is (0,0) in the set? 0=0+1 is false — the line misses the origin. Done: not a subspace, regardless of any other property. (And the closure intuition was also wrong: (0,1)+(1,2)=(1,3), but 1+1=2≠3 — sums leave a shifted line.) Protocol: zero check FIRST, every time; it costs one substitution and catches every shifted line, plane, and non-homogeneous solution set."

Practice: One-line zero checks on: x+y=5 (fails), x−4y=0 (passes, continue test), p(1)=1 in P₂ (fails).

---

### Repair Action B03 — NONHOMOGENEOUS-AS-SUBSPACE (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Classifying every 'linear-equation set' as a subspace is NONHOMOGENEOUS-AS-SUBSPACE. Only homogeneous conditions (right-hand side 0) give subspaces; any nonzero constant breaks the zero check."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Both {x+y+z=0} and {x+y+z=6} are planes in ℝ³. Are both subspaces?"
- MC-3 response: "Yes, both are planes defined by linear equations."

**[P64 — CONCEPTUAL SHIFT]**
"Test both at the origin: 0+0+0=0 ✓ for the first; 0+0+0=0≠6 ✗ for the second. Geometrically the second plane is the first plane SHIFTED off the origin — parallel, same shape, but no zero vector and not closed (sum of two points with coordinate-sum 6 has coordinate-sum 12). The decisive feature is the right-hand side: =0 → candidate subspace (finish the test); =c≠0 → never a subspace. This distinction becomes Ax=0 (null space, a subspace) vs Ax=b (an affine set) in the next concepts."

Practice: Sort into subspace/not by inspection, then verify one of each: 2x−y=0; 2x−y=3; x=0; x=−1.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | State the 3-condition test and why the other axioms are inherited; classify three subsets of ℝ² by inspection then verify |
| SR-2 | +3 days | Homogeneous vs non-homogeneous drill: six defining equations, sort and justify via the zero check |
| SR-3 | +7 days | Subspaces of function/matrix spaces: {f: f(0)=0} in C([0,1]); trace-zero matrices; upper-triangular matrices |
| SR-4 | +14 days | Prove: the intersection of two subspaces is a subspace, and give the axes-union counterexample showing unions are not |

Retrieval flag: if student skips the zero check (MC-2) or accepts a shifted set (MC-3) in any SR, re-execute B02/B03 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|--------------|
| Requires (Tier-1) | math.linalg.vector-space | The 8 axioms, zero vector, and the subspace-test preview from that blueprint's A03; this blueprint deepens the test into fluent classification |
| Unlocks | math.linalg.null-space | The null space {x: Ax=0} is THE canonical subspace; the homogeneous/non-homogeneous contrast (A02) is its direct preparation |
| Unlocks | math.linalg.column-space | The column space (span of columns) is a subspace of the codomain; requires subspace fluency |

**GR-9:** cross_links=[] → P76 mode = independence (function-space transfer probe is self-contained).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=3 → lean structure (2 main TAs + gate)
- bloom=understand → V-4 = N/A (no P07 required)
- CPA_entry = P (Pictorial) for proficient difficulty; V-3 = N/A

**Key teaching insight:** This concept was previewed inside the vector-space blueprint (its A03 introduced the 3-condition test). This blueprint's job is to turn that acquaintance into fluency: instant zero-check reflex, the homogeneous/non-homogeneous discriminator, and the complete geometric catalogue of ℝ²/ℝ³ subspaces. The A01 gallery table is deliberately verdict-first — students induce the conditions from data rather than receiving them.

**Test-order discipline:** Teach the zero check as ALWAYS FIRST. It is the cheapest condition, it disqualifies the most common non-subspaces (affine sets), and its systematic omission is the foundational misconception (MC-2). The P49 branches consistently model this ordering.

**P76 design:** The probe moves the entire test to C([0,1]) — a space with no picture. W₁/W₂/W₃ are engineered so each fails (or passes) for a DIFFERENT structural reason: W₁ homogeneous linear (passes), W₂ nonzero constant (zero check), W₃ inequality (negative-scalar escape). A student who names all three failure modes has transferred the test itself, not memorized ℝ² examples.

**Forward pointer:** The homogeneous/non-homogeneous contrast is deliberately phrased as "Ax=0 vs Ax=b" in B03 — the exact language the null-space blueprint will inherit.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.linalg.subspace ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.linalg.vector-space ✓ | PASS |
| V-3 | CPA entry rule | proficient → CPA=P; V-3=N/A ✓ | N/A |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P04 PATTERN INDUCTION ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01 and A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_links=[] → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1, MC-2 FOUNDATIONAL, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=3 → lean (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | C([0,1]) triple classification; three distinct failure/pass modes; witnesses correct ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

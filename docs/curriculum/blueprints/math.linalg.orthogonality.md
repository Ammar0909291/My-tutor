<!-- BLUEPRINT: math.linalg.orthogonality -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Orthogonality
**Concept ID:** `math.linalg.orthogonality`
**KG Fields:** difficulty=developing | bloom=understand | estimated_hours=2 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.linalg.orthogonality |
| name | Orthogonality |
| difficulty | developing |
| bloom | understand |
| estimated_hours | 2 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.linalg.dot-product |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.linalg.dot-product**: $a\cdot b=\sum a_ib_i=|a||b|\cos\theta$; zero iff the vectors are orthogonal — this concept names and studies exactly that zero-dot-product condition

### Target Knowledge State
Student can determine whether two vectors are orthogonal by computing their dot product and checking whether it EQUALS EXACTLY ZERO (never approximately, and never by visual/geometric inspection alone); correctly recognize that orthogonality is checked ALGEBRAICALLY in any number of dimensions (including abstract inner product spaces where no picture is possible), not merely "perpendicular-looking" in 2D or 3D; and correctly distinguish orthogonality (dot product zero) from orthoNORMALITY (orthogonal AND each vector normalized to length 1) — orthogonal vectors need NOT have unit length.

### Conceptual Obstacles
1. Believing orthogonality can only be verified or even meaningfully discussed in 2D/3D where perpendicularity can be visualized — in higher dimensions (4D, 5D, or abstract vector spaces like polynomials or functions), there is no picture to inspect, and the dot-product-equals-zero ALGEBRAIC test is the only way orthogonality is ever determined, even in 2D/3D
2. Confusing orthogonal with orthonormal — believing vectors must have length (norm) exactly 1 to be called "orthogonal"; orthogonality is purely about the dot product being zero, completely independent of the vectors' lengths (an orthogonal pair can have any nonzero lengths at all)
3. Treating a small but NONZERO dot product as "approximately orthogonal" or "close enough" — orthogonality is an EXACT condition (dot product equal to exactly 0), not a matter of degree; a dot product of 0.001 means the vectors are NOT orthogonal, however small that number looks

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | ORTHOGONALITY-REQUIRES-VISUALIZATION | Student believes orthogonality can only be determined by visual inspection (in 2D/3D), missing that it is an algebraic test (dot product = 0) applicable in any dimension or abstract space | Any vectors in 4+ dimensions, or in an abstract vector space with no natural picture |
| MC-2 | ORTHOGONAL-REQUIRES-UNIT-LENGTH | Student believes orthogonal vectors must have length 1, confusing orthogonality with the stronger condition of orthonormality | Any orthogonal pair of vectors with non-unit lengths |
| MC-3 | SMALL-DOT-PRODUCT-MEANS-APPROXIMATELY-ORTHOGONAL | Student treats a small but nonzero dot product as "close enough" to orthogonal | Any pair of vectors with a small but definitively nonzero dot product |

**Foundational Misconception:** MC-1 (ORTHOGONALITY-REQUIRES-VISUALIZATION) — it directly contradicts the KG's own defining insight ("orthogonality generalizes perpendicularity to arbitrary inner product spaces"), and a student anchored to visual/geometric verification has no method at all for higher-dimensional or abstract vectors, where the dot-product-equals-zero test is the ONLY available (and, even in 2D/3D, the more RELIABLE) method; this directly enables both MC-2 (a student relying on visual intuition may conflate "looks like a right angle at unit length" with the actual algebraic condition) and MC-3 (visual/approximate judgments naturally tolerate "close to perpendicular" in a way the exact algebraic test never does).

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — developing learner checks orthogonality via the dot product on a familiar 2D pair (confirming it matches visual perpendicularity), then IMMEDIATELY applies the identical algebraic test to a 4D pair with no possible picture, before the formal definition is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: dot product check on a 2D perpendicular pair (matching intuition), then the SAME check on a 4D pair (no picture possible); P: an "algebra works where pictures can't" diagram; A: the formal definition and its dimension-independence
2. **A02 P06 CONTRAST PAIR** — orthogonal vectors with wildly different (non-unit) lengths (MC-2); a small-but-nonzero dot product firmly classified as NOT orthogonal (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — The Same Algebraic Test, With or Without a Picture

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Verify the dot-product test on a picturable 2D pair, then apply the IDENTICAL test to a 4D pair with no picture, establishing algebra as the universal method

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (2D: matching the picture; 4D: no picture, same test):**

**2D example:** $u=(1,0), v=(0,1)$ — visually, these point along the x-axis and y-axis, a right angle, matching intuitive "perpendicular." Check the dot product: $u\cdot v=(1)(0)+(0)(1)=0$ — **zero, confirming orthogonality**, matching what the picture already suggested.

**4D example (no picture possible):** $p=(1,2,3,4), q=(2,-1,2,-2)$ in $\mathbb R^4$. There is no way to DRAW these vectors or visually judge whether they're "perpendicular" — four dimensions cannot be pictured directly. Apply the IDENTICAL algebraic test: $p\cdot q = (1)(2)+(2)(-1)+(3)(2)+(4)(-2) = 2-2+6-8=-2$... let me choose a genuinely orthogonal 4D pair instead: $p=(1,1,1,1), q=(1,-1,1,-1)$: $p\cdot q=(1)(1)+(1)(-1)+(1)(1)+(1)(-1)=1-1+1-1=0$ — **zero, confirming orthogonality**, established PURELY algebraically, with no picture involved or even possible.

**Stage P — Pictorial (algebra works everywhere; pictures only work in 2D/3D):**

```
   2D/3D: picture AND algebra agree           4D+ / abstract spaces:
   (dot product = 0 ⟺ looks perpendicular)     ONLY algebra is available
                                                (dot product = 0 is the
        ↑                                       ENTIRE definition — no
        │  90°                                  picture to check against)
   ─────┼─────→
        │
   (both methods work, but algebra              (algebra is the ONLY
    is what's ACTUALLY being checked)             method, ever)
```

**Stage A — Abstract (formal definition, dimension-independent):**

Two vectors $u,v$ are **orthogonal** iff $u\cdot v = 0$ — this single algebraic condition is the ENTIRE definition, valid and checkable identically in $\mathbb R^2$, $\mathbb R^3$, $\mathbb R^4$, $\mathbb R^n$ for any $n$, and in abstract inner product spaces (polynomials, functions) where "perpendicular" has no direct visual meaning at all. Orthogonality GENERALIZES the geometric notion of perpendicularity; it does not depend on a picture existing.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Are $u=(1,2,3)$ and $v=(2,-1,0)$ orthogonal? Compute the dot product to check, regardless of whether you can easily picture these specific vectors.

**CORRECT:** $u\cdot v=(1)(2)+(2)(-1)+(3)(0)=2-2+0=0$ — **orthogonal**, confirmed algebraically.
→ "Correct — the algebraic test works the same way regardless of how easy or hard these specific vectors are to visualize." → Proceed to A02.

**PARTIAL:** Student computes the dot product correctly but expresses uncertainty about whether the conclusion is trustworthy without a picture to "confirm" it.
→ "The algebraic test IS the definition — there's nothing further to confirm visually. Even in 3D (where a picture is technically possible), the dot product computation alone is what settles the question; a picture would only be a supplementary sanity-check, never a requirement. The zero result you computed is complete, sufficient proof of orthogonality."

**INCORRECT:** Student attempts to sketch the vectors and judge visually, arriving at an uncertain or wrong answer without computing the dot product.
→ "Skip the sketch — compute the dot product directly: $(1)(2)+(2)(-1)+(3)(0)=2-2+0=0$. This IS the test; visual estimation (especially in 3D, which is hard to draw accurately) is unreliable and unnecessary once the algebraic computation is done. Zero confirms orthogonality with certainty, no picture needed."

**NO_RESPONSE:** → "u·v=(1)(2)+(2)(-1)+(3)(0)=0 — orthogonal, confirmed purely algebraically."

---

### Teaching Action A02 — Orthogonal ≠ Unit Length; Zero Means Exactly Zero

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-2 with orthogonal vectors of very different, non-unit lengths; break MC-3 with a small-but-firmly-nonzero dot product

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Orthogonal vectors with wildly different, non-unit lengths (MC-2):**

$u=(10,0)$ (length 10) and $v=(0,-3)$ (length 3). Neither has length 1. Check orthogonality: $u\cdot v=(10)(0)+(0)(-3)=0$ — **orthogonal**, despite NEITHER vector being a unit vector and despite their lengths being very different from each other (10 vs. 3). Orthogonality depends ENTIRELY on the dot product being zero — it says nothing whatsoever about the vectors' individual lengths. (ORTHONORMAL vectors are the STRONGER condition: orthogonal AND each individually normalized to length 1 — a separate, additional requirement, not part of orthogonality itself.)

**Contrast 2 — A small but definitively nonzero dot product is NOT orthogonal (MC-3):**

$a=(1,0.001)$ and $b=(0.001,1)$: $a\cdot b=(1)(0.001)+(0.001)(1)=0.001+0.001=0.002$ — a very SMALL number, but **NOT zero**. These vectors are **NOT orthogonal** — "very close to zero" is not the same claim as "equal to zero." Contrast with a genuinely orthogonal pair: $c=(1,0)$ and $d=(0,1)$ give $c\cdot d=0$ EXACTLY. Orthogonality admits no partial credit or approximation — 0.002, however small, definitively fails the test, exactly as decisively as a dot product of 500 would.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Are $u=(5,0,0)$ and $v=(0,0,7)$ orthogonal? Are either of them unit vectors? (b) Are $p=(1,0.01)$ and $q=(0.01,-1)$ orthogonal? Compute the dot product exactly.

**CORRECT:** (a) $u\cdot v=(5)(0)+(0)(0)+(0)(7)=0$ — orthogonal. Neither is a unit vector (lengths 5 and 7, not 1) — orthogonality holds regardless. (b) $p\cdot q=(1)(0.01)+(0.01)(-1)=0.01-0.01=0$ — **exactly zero, genuinely orthogonal** (this one actually IS orthogonal, unlike Contrast 2's near-miss example — a good reminder to always compute exactly rather than assume from "small-looking" numbers either way).
→ "Correct — (b) is a deliberate reversal of Contrast 2's lesson: small-looking numbers don't automatically mean 'not quite zero' either; only the exact computation decides, in both directions." → Proceed to A03.

**PARTIAL:** Student gets (a) but in (b) assumes "probably not exactly orthogonal since the numbers are small and messy-looking" without completing the exact computation.
→ "Compute exactly, don't estimate from how the numbers 'look': $(1)(0.01)+(0.01)(-1)=0.01-0.01=0$ precisely — this pair IS genuinely orthogonal. Small or decimal-looking numbers don't automatically mean 'approximately' anything; the exact arithmetic here happens to cancel perfectly to zero."

**INCORRECT:** Student answers (a) "not orthogonal, since neither vector has length 1" (MC-2).
→ "Length (whether either vector is a unit vector) is IRRELEVANT to orthogonality — only the dot product matters. Here $u\cdot v=0$ exactly, so they ARE orthogonal, regardless of their lengths (5 and 7, not 1). Orthogonal vectors need not be unit vectors at all; requiring unit length would instead describe the different, stronger notion of orthoNORMAL vectors."

**NO_RESPONSE:** → "(a) u·v=0 — orthogonal; neither has length 1, which doesn't matter. (b) p·q=0.01-0.01=0 exactly — genuinely orthogonal."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess dimension-independent algebraic testing, orthogonal-vs-orthonormal discrimination, and exact-zero discipline under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Are $(3,4)$ and $(4,-3)$ orthogonal?

*Solution:* $(3)(4)+(4)(-3)=12-12=0$ — orthogonal.

**Problem 2:** Are $(1,1,1,1,1)$ and $(1,-1,1,-1,1)$ (both in $\mathbb R^5$) orthogonal? Compute directly, without attempting to visualize.

*Solution:* $(1)(1)+(1)(-1)+(1)(1)+(1)(-1)+(1)(1)=1-1+1-1+1=1$ — NOT orthogonal (dot product is 1, not 0).

**Problem 3:** $(6,0)$ and $(0,2)$: are they orthogonal? Are either unit vectors?

*Solution:* $(6)(0)+(0)(2)=0$ — orthogonal. Neither is a unit vector (lengths 6 and 2) — irrelevant to orthogonality.

**Problem 4:** $(2,3)$ and $(3,-2.001)$: compute the exact dot product and state whether they are orthogonal.

*Solution:* $(2)(3)+(3)(-2.001)=6-6.003=-0.003$ — NOT zero, so NOT orthogonal, despite being very close to zero.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A data scientist represents two customers' purchase patterns as vectors in $\mathbb R^{10}$ (ten product categories, entries = amount spent in each), $c_1$ and $c_2$, and wants to know if the two customers' spending patterns are "orthogonal" (interpreted as: their spending is completely uncorrelated in this dot-product sense).

(a) Explain why the data scientist can determine orthogonality here PURELY by computing $c_1\cdot c_2$, with no need for (and no possibility of) drawing a 10-dimensional picture.
(b) The computed dot product comes out to $c_1\cdot c_2 = 0.4$ (a small positive number, given that individual spending amounts might be in the hundreds or thousands of dollars). A colleague says: "0.4 is basically zero compared to the size of the individual numbers involved, so let's just call these customers' patterns orthogonal for practical purposes." Evaluate this claim precisely, distinguishing the exact mathematical definition from a practical approximation the colleague might reasonably want to use, and state clearly which one is "orthogonality" in the technical sense used in this blueprint.
(c) Suppose instead $c_1\cdot c_2$ comes out to exactly $0$, but $c_1$ has a length (norm) of 500 (representing a big spender) and $c_2$ has a length of 12 (a small spender). Does this length difference affect whether they are orthogonal? Explain, and separately state what ADDITIONAL condition would be needed for the pair to also be called orthoNORMAL.

**Expected solution:**

(a) Orthogonality is defined ENTIRELY via the dot product ($c_1\cdot c_2=0$), an algebraic computation involving no geometric picture at all — this works identically whether the vectors live in $\mathbb R^2$ (picturable) or $\mathbb R^{10}$ (not picturable). Ten-dimensional space cannot be drawn or visualized directly by humans, but the SAME sum-of-products formula ($\sum_{i=1}^{10} c_{1,i}c_{2,i}$) applies without any modification, confirming orthogonality is a purely algebraic notion that generalizes far beyond what can ever be pictured.

(b) The colleague's claim is a PRACTICAL, approximate judgment, not the mathematical fact of orthogonality. Mathematically, $c_1\cdot c_2=0.4\ne0$ means these vectors are, precisely and unambiguously, **NOT orthogonal** — orthogonality admits no "basically zero" category; it is exactly zero or it is not orthogonal, full stop. The colleague may have a reasonable PRACTICAL point (perhaps 0.4 is negligible relative to the scale of the individual spending amounts, suggesting near-independence for business purposes) — but this is a separate, informal, context-dependent judgment call about practical significance, entirely distinct from the precise mathematical property of orthogonality, which this pair of vectors does not satisfy.

(c) No — the length difference (500 vs. 12) does NOT affect whether the pair is orthogonal; orthogonality depends ONLY on the dot product being exactly zero, completely independent of either vector's length. This pair IS orthogonal (given $c_1\cdot c_2=0$), regardless of the dramatic length difference. To ALSO be orthoNORMAL, an ADDITIONAL condition is needed: EACH vector would need to be individually normalized to have length exactly 1 (i.e., $c_1/\|c_1\|$ and $c_2/\|c_2\|$ would be the orthonormal pair, not $c_1$ and $c_2$ themselves as given) — orthonormality is a strictly stronger condition than orthogonality, requiring both the zero-dot-product property AND unit length for every vector involved.

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

- MASTERY ACHIEVED → unlock math.linalg.orthogonal-basis and math.linalg.gram-schmidt; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.linalg.orthogonality assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — ORTHOGONALITY-REQUIRES-VISUALIZATION (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Believing orthogonality can only be checked visually is ORTHOGONALITY-REQUIRES-VISUALIZATION. The dot-product-equals-zero test is a purely algebraic condition, applicable identically in any dimension or abstract space, with or without a picture."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Can two vectors in 6-dimensional space be orthogonal, even though we can't draw or picture 6D?"
- MC-1 response: "No, orthogonality only makes sense where you can see a right angle."

**[P64 — CONCEPTUAL SHIFT]**
"Orthogonality is DEFINED by the dot product equaling zero — a formula that works identically regardless of dimension. Compute it directly for two 6D vectors just as you would in 2D: sum the products of corresponding components. If the sum is zero, they're orthogonal, full stop — no picture is needed, checked, or even possible for 6D, yet the mathematical fact is exactly as well-defined and certain as in 2D."

Practice: Check whether (1,2,-1,3,0,1) and (2,-1,0,1,5,-3) (both in ℝ⁶) are orthogonal, using only the dot-product computation.

---

### Repair Action B02 — ORTHOGONAL-REQUIRES-UNIT-LENGTH (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Believing orthogonal vectors must have length 1 is ORTHOGONAL-REQUIRES-UNIT-LENGTH. Orthogonality depends only on the dot product being zero — length plays no role at all. Orthonormal (a stronger, separate condition) additionally requires unit length."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "(20,0) and (0,5): dot product is 0, but neither has length 1. Are they orthogonal?"
- MC-2 response: "No, since they're not unit vectors."

**[P64 — CONCEPTUAL SHIFT]**
"Orthogonality's ONLY test is the dot product: $(20)(0)+(0)(5)=0$ — this alone confirms orthogonality, completely independent of the lengths (20 and 5 here, not 1). Requiring unit length describes a DIFFERENT, stronger property (orthonormality), not orthogonality itself. These vectors ARE orthogonal, despite not being unit vectors."

Practice: Confirm (100,0,0) and (0,0,-50) are orthogonal despite neither having length 1, and state what would need to change to make them orthonormal instead.

---

### Repair Action B03 — SMALL-DOT-PRODUCT-MEANS-APPROXIMATELY-ORTHOGONAL (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Treating a small nonzero dot product as 'basically orthogonal' is SMALL-DOT-PRODUCT-MEANS-APPROXIMATELY-ORTHOGONAL. Orthogonality is an EXACT condition — a dot product of 0.001 fails the test exactly as decisively as one of 1000."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "(1,0.002) and (0.002,1) have dot product 0.004. Close enough to orthogonal?"
- MC-3 response: "Yes, basically orthogonal since 0.004 is so small."

**[P64 — CONCEPTUAL SHIFT]**
"0.004 is small in MAGNITUDE, but the definition requires EXACTLY zero — 0.004≠0, so these vectors are definitively NOT orthogonal, with no partial credit for 'close.' There is no such thing as 'approximately orthogonal' in the exact mathematical sense; either the dot product is precisely 0 (orthogonal) or it is anything else at all, however small (not orthogonal)."

Practice: Compute the exact dot product of (1,0.1) and (0.1,-1), determining precisely (not approximately) whether they are orthogonal.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Check orthogonality via dot product for a fresh 4D or higher-dimensional pair, with no attempt at visualization |
| SR-2 | +3 days | Confirm a fresh orthogonal pair with dramatically different, non-unit lengths |
| SR-3 | +7 days | Compute an exact dot product for a fresh small-looking-number pair, determining orthogonality precisely |
| SR-4 | +14 days | Reconstruct the customer-spending transfer probe's distinction between mathematical orthogonality and practical near-independence |

Retrieval flag: if student cannot check orthogonality without a picture (MC-1) or requires unit length for orthogonality (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.linalg.dot-product | Orthogonality is DEFINED directly as the zero-dot-product condition, inherited entirely from that blueprint's formula |
| Unlocks | math.linalg.orthogonal-basis | A basis whose vectors are pairwise orthogonal — this concept's pairwise test applied across an entire spanning set |
| Unlocks | math.linalg.gram-schmidt | The Gram-Schmidt process constructs an orthogonal (or orthonormal) basis by repeatedly applying this concept's zero-dot-product test |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the dimension-independence and exact-zero lessons to a high-dimensional customer-spending-pattern scenario rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=2 → compact structure (2 main TAs + gate), matching the concept's small time allocation and single-test (dot product = 0) scope
- bloom=understand → V-4 = N/A (no P07 required; algebraic verification and classification tasks, not derivations)
- CPA_entry = C for a developing learner: checking the SAME algebraic test on a familiar 2D pair (matching visual intuition) AND immediately on a 4D pair (no picture possible) anchors "algebra is the actual test, pictures are just a bonus check in low dimensions" before any visualization-dependent habit can form

**Key teaching insight:** MC-1 is this concept's root misconception because most students' FIRST exposure to "perpendicular" is entirely visual/geometric (from earlier geometry), and orthogonality's genuine power — generalizing far beyond what any picture can represent — is easy to miss if the algebraic test is introduced merely as "a way to CONFIRM what you can already see" rather than as the actual, sole definition. A01 deliberately follows the picturable 2D example IMMEDIATELY with an unpicturable 4D one, using the identical formula, so the algebraic test is established as primary from the very first lesson.

**MC-2 and MC-3 as precision refinements once the algebraic test is trusted:** Once orthogonality is understood as "dot product equals zero, full stop" (defeating MC-1), MC-2 (does length matter — no) and MC-3 (does 'close to zero' count — no) are natural follow-up precision questions about that SAME test's exact boundaries; A02's two contrasts are sequenced as direct refinements of the just-established algebraic criterion, rather than introducing unrelated new content.

**Sequencing note:** No cross-link concept exists yet for math.linalg.orthogonality; the P76 transfer probe instead uses a 10-dimensional customer-spending-pattern scenario specifically because it is both genuinely unpicturable (testing MC-1's territory at scale) and practically tempting to round "small" dot products to zero (testing MC-3's territory in a realistic data-science framing).

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.linalg.orthogonality ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.linalg.dot-product ✓ | PASS |
| V-3 | CPA entry = C for developing difficulty | C (Concrete) ✓ | PASS |
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
| V-19 | Structure matches h | h=2 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | 10D customer-spending scenario; mathematical-vs-practical near-orthogonality distinction ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

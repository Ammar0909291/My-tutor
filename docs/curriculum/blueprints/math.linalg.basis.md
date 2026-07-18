<!-- BLUEPRINT: math.linalg.basis -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Basis
**Concept ID:** `math.linalg.basis`
**KG Fields:** difficulty=proficient | bloom=understand | estimated_hours=4 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.linalg.basis |
| name | Basis |
| difficulty | proficient |
| bloom | understand |
| estimated_hours | 4 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.linalg.linear-independence, math.linalg.span |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.linalg.linear-independence**: no vector in the set is a combination of the others — one of the TWO requirements a basis must satisfy
- **math.linalg.span**: span(S) is the set of all linear combinations of S — the OTHER requirement (spanning the whole space) a basis must satisfy

### Target Knowledge State
Student can verify whether a candidate set is a basis by checking BOTH requirements (spans the space AND is linearly independent), recognizing that satisfying only one is insufficient; correctly recognize that a vector space generally has INFINITELY MANY different valid bases, not one unique "the" basis; and correctly compute a vector's coordinates relative to a GIVEN basis, recognizing that the SAME vector has DIFFERENT coordinate representations depending on which basis is used.

### Conceptual Obstacles
1. Verifying only the spanning condition (or only the independence condition) and declaring a set a basis, without checking BOTH — a spanning set with a redundant vector is not a basis (fails independence); an independent set that doesn't reach every vector in the space is not a basis either (fails spanning)
2. Believing a vector space has ONE single, uniquely correct basis (typically confusing "the standard basis" with "the only basis") — every vector space (beyond the zero space) has infinitely many different valid bases, all equally legitimate
3. Assuming a vector's coordinate representation is the same regardless of which basis is chosen — the SAME vector generally has DIFFERENT numerical coordinates relative to different bases; "coordinates" are always relative to a SPECIFIED basis, never an absolute property of the vector alone

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SPANNING-SET-IS-AUTOMATICALLY-A-BASIS | Student verifies only ONE of the two basis requirements (spanning OR independence) and declares a basis, without checking both | Any spanning set with a redundant (dependent) vector, or any independent set that fails to span |
| MC-2 | ONLY-ONE-BASIS-EXISTS | Student believes a vector space has a single, unique basis (typically conflating "the standard basis" with "the only basis") | Any request to find or verify an alternative (non-standard) basis for a familiar space |
| MC-3 | COORDINATES-ARE-BASIS-INDEPENDENT | Student assumes a vector's coordinates are fixed regardless of which basis is used, rather than recognizing coordinates are always RELATIVE to a specified basis | Any task computing the same vector's coordinates in two different bases |

**Foundational Misconception:** MC-1 (SPANNING-SET-IS-AUTOMATICALLY-A-BASIS) — a basis is defined as satisfying BOTH conditions simultaneously, and a student who checks only one has not verified a basis at all, regardless of which one they checked; this error directly enables MC-2 (a student unclear on the basis requirements has no framework for recognizing that many DIFFERENT valid sets can all satisfy both conditions) and MC-3 (coordinate computation depends entirely on having correctly identified a genuine basis first).

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — proficient learner checks BOTH conditions explicitly on a candidate set before the formal definition is stated, then computes coordinates relative to two different bases for the same vector.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: verifying both conditions on the standard basis and on an alternative basis for ℝ²; P: a picture of two different valid "grids" (bases) for the same plane; A: formal definition and the uniqueness-of-representation theorem
2. **A02 P06 CONTRAST PAIR** — a spanning-but-dependent set vs. a genuine basis (MC-1); the standard basis vs. a genuinely different valid basis for the same space (MC-2); the same vector's coordinates computed in two different bases, shown to differ (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Both Conditions, Checked Explicitly

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Verify both basis requirements explicitly on two different candidate sets for the same space; state the formal definition and the uniqueness-of-representation consequence

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (checking two candidate bases for $\mathbb R^2$):**

**Candidate 1 — standard basis** $\{e_1,e_2\}=\{(1,0),(0,1)\}$:
- Spans $\mathbb R^2$? Any $(a,b)=a(1,0)+b(0,1)$ ✓ — yes, every vector reachable.
- Independent? $c_1(1,0)+c_2(0,1)=(0,0) \Rightarrow c_1=c_2=0$ directly ✓ — only the trivial solution.
- **Both hold — genuine basis.**

**Candidate 2 — an alternative set** $\{(1,1),(1,-1)\}$:
- Spans $\mathbb R^2$? For any $(a,b)$, solve $c_1(1,1)+c_2(1,-1)=(a,b)$: $c_1+c_2=a$, $c_1-c_2=b$. Adding: $c_1=(a+b)/2$; subtracting: $c_2=(a-b)/2$ — a solution ALWAYS exists for any $(a,b)$ ✓ — spans.
- Independent? Set $(a,b)=(0,0)$ in the above: $c_1=c_2=0$ forced ✓ — independent.
- **Both hold — ALSO a genuine basis**, despite looking completely different from the standard one.

**Stage P — Pictorial (two different valid "grids" for the same plane):**

```
   Standard basis grid:          Alternative basis grid:
   ↑ e₂=(0,1)                     ↗ (1,1)
   │                               │  ↘ (1,-1)
   └──→ e₁=(1,0)                   (rotated 45°, different
                                     grid, same plane fully covered)

   BOTH grids reach every point in the plane — neither is
   "more correct" than the other; both are valid bases.
```

**Stage A — Abstract (formal definition and uniqueness of representation):**

**Basis:** a set of vectors that is BOTH (a) linearly independent AND (b) spans the vector space $V$.

**Uniqueness-of-representation theorem:** given a basis $\{b_1,\ldots,b_n\}$, EVERY vector $v\in V$ has a UNIQUE expression $v=c_1b_1+\cdots+c_nb_n$ — the coefficients $(c_1,\ldots,c_n)$ are called $v$'s **coordinates** relative to that basis. (Uniqueness follows directly from independence: if two different combinations both gave $v$, subtracting them would produce a nontrivial combination equal to 0, contradicting independence.)

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Is $\{(2,0),(1,1)\}$ a basis for $\mathbb R^2$? Check both conditions explicitly.

**CORRECT:** Spans? Solve $c_1(2,0)+c_2(1,1)=(a,b)$: from the second component, $c_2=b$; from the first, $2c_1+b=a \Rightarrow c_1=(a-b)/2$ — a solution always exists ✓. Independent? Set $(a,b)=(0,0)$: $c_2=0, c_1=0$ forced ✓. **Both hold — genuine basis.**
→ "Correct — both conditions verified explicitly, confirming this is a valid (if unfamiliar-looking) basis for the plane." → Proceed to A02.

**PARTIAL:** Student verifies spanning correctly but skips the independence check, assuming it's "probably fine since it spans."
→ "Spanning alone doesn't establish a basis — you must ALSO verify independence explicitly, even if it seems likely to hold. Set $(a,b)=(0,0)$ in your spanning solution: $c_2=0$ and $c_1=(0-0)/2=0$ — confirmed, only the trivial solution. Both checks are required, every time, regardless of how confident you feel about the second one after completing the first."

**INCORRECT:** Student declares it NOT a basis because "(2,0) and (1,1) don't look like a natural pair" (a vague aesthetic judgment, not a check of either condition).
→ "Whether vectors 'look natural together' is irrelevant — only the two DEFINED conditions matter: does the set span, and is it independent? Both computations above confirm yes to each, regardless of how unfamiliar the specific vectors (2,0) and (1,1) might look compared to the standard basis."

**NO_RESPONSE:** → "Spans: solving c₁(2,0)+c₂(1,1)=(a,b) always has a solution (c₂=b, c₁=(a-b)/2). Independent: setting (a,b)=(0,0) forces c₁=c₂=0. Both hold — basis."

---

### Teaching Action A02 — One Condition Isn't Enough; Many Bases Exist; Coordinates Are Basis-Relative

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with a spanning-but-dependent set that fails to be a basis; break MC-2 by exhibiting yet another distinct valid basis; break MC-3 by computing the same vector's coordinates in two different bases

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Spans, but NOT independent — fails to be a basis (MC-1):**

$\{(1,0),(0,1),(1,1)\}$ for $\mathbb R^2$: **spans** (already reachable using just the first two, and the third adds nothing new) — but is it independent? $(1,1)=1\cdot(1,0)+1\cdot(0,1)$, a nontrivial dependency ($1\cdot(1,0)+1\cdot(0,1)-1\cdot(1,1)=0$) — **NOT independent**. This set spans $\mathbb R^2$ perfectly well, but **FAILS to be a basis**, because a genuine basis must ALSO be independent — the third vector is pure redundancy, exactly like the redundant-vector case from math.linalg.span. (A valid basis exists WITHIN this set — just drop the third vector — but the full 3-element set itself is not one.)

**Contrast 2 — Yet another distinct valid basis for $\mathbb R^2$ (MC-2):**

$\{(3,1),(1,2)\}$: Spans? Solve $c_1(3,1)+c_2(1,2)=(a,b)$: $3c_1+c_2=a$, $c_1+2c_2=b$. Solving (e.g. by elimination): $c_1=(2a-b)/5$, $c_2=(3b-a)/5$ — a solution always exists for any $(a,b)$ ✓. Independent? At $(a,b)=(0,0)$: $c_1=c_2=0$ forced ✓. **Yet another genuine basis** — the THIRD distinct valid basis seen so far for the same $\mathbb R^2$ (after the standard basis and A01's Candidate 2). There is no limit to how many valid bases a space can have; "the standard basis" is just one convenient, commonly-used choice among infinitely many.

**Contrast 3 — Same vector, different coordinates in different bases (MC-3):**

Take $v=(5,3)$. **In the standard basis** $\{(1,0),(0,1)\}$: coordinates are simply $(5,3)$ (since $v=5(1,0)+3(0,1)$). **In the basis** $\{(1,1),(1,-1)\}$ (A01's Candidate 2): using the formulas derived there, $c_1=(a+b)/2=(5+3)/2=4$, $c_2=(a-b)/2=(5-3)/2=1$ — coordinates are $(4,1)$ in THIS basis. **The same geometric vector $v=(5,3)$ has coordinates $(5,3)$ in one basis and $(4,1)$ in another** — coordinates are never an absolute property of the vector alone; they always depend on WHICH basis is being used to describe it.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Is $\{(1,0),(2,0),(0,1)\}$ a basis for $\mathbb R^2$? Check both conditions. (b) Compute the coordinates of $v=(4,6)$ relative to the basis $\{(2,0),(0,3)\}$, and confirm they differ from $v$'s standard-basis coordinates.

**CORRECT:** (a) Spans $\mathbb R^2$ (using just the first and third vectors, or others). Independent? $(2,0)=2(1,0)$ — a nontrivial dependency exists directly between the first two vectors alone. **NOT independent — fails to be a basis**, despite spanning. (b) Solve $c_1(2,0)+c_2(0,3)=(4,6)$: $2c_1=4 \Rightarrow c_1=2$; $3c_2=6 \Rightarrow c_2=2$. Coordinates in this basis: $(2,2)$ — different from the standard-basis coordinates $(4,6)$.
→ "Correct — (a) directly applies Contrast 1's lesson to a fresh redundant set, and (b) confirms Contrast 3's basis-dependence of coordinates with fresh numbers." → Proceed to A03.

**PARTIAL:** Student gets (a) but in (b) reports coordinates $(4,6)$ (copying the standard-basis values without recomputing for the new basis).
→ "Coordinates must be recomputed for EACH specific basis — don't reuse the standard-basis numbers. Solve $c_1(2,0)+c_2(0,3)=(4,6)$ directly: $c_1=4/2=2$ and $c_2=6/3=2$, giving coordinates $(2,2)$ in this basis — genuinely different numbers from $(4,6)$, even though both describe the SAME vector."

**INCORRECT:** Student answers (a) "yes, it's a basis, since it clearly spans the plane" (MC-1, checking only spanning).
→ "Spanning is only HALF the requirement — check independence too: is $(2,0)$ a multiple of $(1,0)$? Yes, $(2,0)=2(1,0)$ exactly, a direct nontrivial dependency between just these two vectors alone. This set is NOT independent, and therefore NOT a basis, regardless of the fact that it does span the space."

**NO_RESPONSE:** → "(a) Spans, but (2,0)=2(1,0) is a dependency — NOT independent, so NOT a basis. (b) c₁(2,0)+c₂(0,3)=(4,6) gives c₁=2,c₂=2 — coordinates (2,2), different from the standard-basis coordinates (4,6)."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess both-conditions verification, recognition of basis multiplicity, and correct coordinate computation under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Is $\{(1,2),(2,4)\}$ a basis for $\mathbb R^2$? Justify.

*Solution:* $(2,4)=2(1,2)$ — dependent (fails independence), and consequently does NOT span all of $\mathbb R^2$ either (both vectors lie on the same line). NOT a basis.

**Problem 2:** Give a basis for $\mathbb R^2$ different from both the standard basis and any example already shown in this blueprint's lessons.

*Solution:* Many valid answers exist, e.g. $\{(1,3),(2,1)\}$ — verify: spans (solvable for any target), independent (only trivial solution at (0,0)); any genuinely independent, spanning pair works.

**Problem 3:** For $v=(6,2)$, compute coordinates relative to the basis $\{(1,0),(1,1)\}$.

*Solution:* Solve $c_1(1,0)+c_2(1,1)=(6,2)$: $c_1+c_2=6$, $c_2=2$, so $c_1=4$. Coordinates: $(4,2)$.

**Problem 4:** True or false: "Every vector space has exactly one basis." Correct if false.

*Solution:* **False.** Every nonzero vector space has infinitely many different valid bases (all satisfying spanning + independence); there is no single unique basis, though a "standard basis" is often chosen by convention for convenience.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** An image-compression engineer represents each small image patch as a vector in $\mathbb R^2$ (two pixel-intensity values) and wants to choose a basis that makes typical patches easy to describe compactly.

(a) Verify that $\{(1,1),(1,-1)\}$ (an "average/difference" basis: the first vector represents "both pixels equal," the second represents "pixels differ") is a genuine basis for $\mathbb R^2$.
(b) For a patch $v=(100,98)$ (two nearly-equal pixel intensities), compute its coordinates in this average/difference basis, and explain why these coordinates might be MORE useful for compression than the standard basis's raw coordinates $(100,98)$.
(c) A colleague argues: "Since the standard basis is simpler and more intuitive, engineers should always just use it — introducing a different basis is unnecessary complexity for what is fundamentally the same vector space." Evaluate this argument, using your answer to (b) as a concrete counterexample to the implied claim that basis choice doesn't matter practically.

**Expected solution:**

(a) This is exactly A01's Candidate 2, already verified: spans $\mathbb R^2$ (solvable for any target via $c_1=(a+b)/2, c_2=(a-b)/2$) and independent (only trivial solution at the origin) — genuine basis.

(b) Using $c_1=(a+b)/2, c_2=(a-b)/2$ with $(a,b)=(100,98)$: $c_1=(100+98)/2=99$, $c_2=(100-98)/2=1$. Coordinates in this basis: $(99,1)$. This is MORE useful for compression because the SECOND coordinate (the "difference" component) is very small (1) when the two pixels are nearly equal — a compression scheme can store the large "average" value (99) with full precision and the small "difference" value (1) with very few bits (or discard it almost entirely for further compression), whereas the standard-basis coordinates $(100,98)$ give no such structural hint — both raw pixel values look equally significant and equally large, hiding the fact that the patch is nearly uniform.

(c) The colleague's argument is **wrong in this practical context** — (b) is a direct, concrete counterexample to "basis choice doesn't matter": the SAME vector space (ℝ²) and the SAME vector $(100,98)$ reveal a genuinely useful structural property (near-uniformity, via a small difference coordinate) ONLY when described in the average/difference basis, a property that is NOT visible at all in the standard-basis coordinates. Basis choice is mathematically "just" a different, equally valid coordinate system (as established throughout this blueprint), but PRACTICALLY, different bases can make certain kinds of structure (like near-uniform patches) far easier to detect, exploit, or compress — this is exactly why real compression algorithms (e.g. JPEG, which uses a related transform) deliberately choose non-standard bases rather than always defaulting to the "simpler" standard one.

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

- MASTERY ACHIEVED → unlock math.linalg.dimension and math.linalg.coordinates; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.linalg.basis assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SPANNING-SET-IS-AUTOMATICALLY-A-BASIS (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Verifying only spanning (or only independence) and declaring a basis is SPANNING-SET-IS-AUTOMATICALLY-A-BASIS. A basis requires BOTH conditions simultaneously — checking one alone never establishes it."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "{(1,0),(0,1),(3,4)} spans ℝ². Is it a basis?"
- MC-1 response: "Yes, since it spans the space."

**[P64 — CONCEPTUAL SHIFT]**
"Spanning is only HALF the requirement — check independence too: is $(3,4)$ a combination of $(1,0)$ and $(0,1)$? Yes, $(3,4)=3(1,0)+4(0,1)$, a nontrivial dependency. This set spans but is NOT independent, so it is NOT a basis — a genuine basis is hiding inside it (just the first two vectors), but the full 3-element set fails the independence requirement."

Practice: Determine whether {(1,1),(2,2),(0,1)} is a basis for ℝ², checking both conditions explicitly.

---

### Repair Action B02 — ONLY-ONE-BASIS-EXISTS (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Believing a vector space has one unique basis is ONLY-ONE-BASIS-EXISTS. Every nonzero vector space has infinitely many valid bases — 'the standard basis' is just one conventional choice among many equally legitimate ones."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is {(1,0),(0,1)} the ONLY basis for ℝ²?"
- MC-2 response: "Yes, that's the definition of a basis for ℝ²."

**[P64 — CONCEPTUAL SHIFT]**
"Check a different candidate directly: is $\{(2,1),(1,3)\}$ also a basis? Verify spanning (solvable for any target) and independence (only trivial solution) — both hold, confirming this is ALSO a genuine basis, distinct from the standard one. In fact infinitely many such pairs exist. 'The standard basis' is a common, convenient choice, not a uniqueness claim — 'a basis' (not 'the basis') is the more accurate way to refer to any specific one."

Practice: Verify that {(1,2),(3,1)} is also a valid basis for ℝ², distinct from both the standard basis and the example just checked.

---

### Repair Action B03 — COORDINATES-ARE-BASIS-INDEPENDENT (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming a vector's coordinates are fixed regardless of basis is COORDINATES-ARE-BASIS-INDEPENDENT. Coordinates are always RELATIVE to a specified basis — the same vector gets different numerical coordinates in different bases."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "v=(7,3) in the standard basis. What are its coordinates in the basis {(1,1),(1,-1)}?"
- MC-3 response: "(7,3), same as before."

**[P64 — CONCEPTUAL SHIFT]**
"Recompute for the NEW basis specifically — don't reuse the standard-basis numbers. Solve $c_1(1,1)+c_2(1,-1)=(7,3)$: $c_1+c_2=7$, $c_1-c_2=3$; adding gives $c_1=5$, subtracting gives $c_2=2$. Coordinates in this basis: $(5,2)$ — genuinely DIFFERENT numbers from $(7,3)$, even though both pairs of numbers describe the exact same vector $v$. Coordinates are a property of the PAIRING between a vector and a chosen basis, never the vector alone."

Practice: For v=(9,1), compute its coordinates in the standard basis and separately in {(2,0),(0,1)}, confirming the two coordinate pairs differ.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Verify both basis conditions explicitly on a fresh candidate set |
| SR-2 | +3 days | Exhibit a fresh basis for ℝ² distinct from any seen before, verifying both conditions |
| SR-3 | +7 days | Compute a fresh vector's coordinates in two different bases and confirm they differ |
| SR-4 | +14 days | Reconstruct the image-compression transfer probe's argument for why basis choice has genuine practical consequences |

Retrieval flag: if student checks only one basis condition (MC-1) or assumes a unique basis exists (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1, this session) | math.linalg.linear-independence | Supplies one of the two basis requirements (no vector is a combination of the others) |
| Requires (Tier-1, this session) | math.linalg.span | Supplies the other basis requirement (reaching every vector in the space) |
| Unlocks | math.linalg.dimension | The dimension of a vector space is defined as the NUMBER of vectors in any basis (a well-defined, basis-independent count, even though the specific vectors differ across bases) |
| Unlocks | math.linalg.coordinates | The coordinate-vector machinery introduced here (relative to a chosen basis) is developed fully in that blueprint |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies basis-dependent coordinates to an image-compression scenario, a genuinely new applied context rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=4 → compact structure (2 main TAs + gate), matching the concept's tightly focused scope (one two-part definition, applied and contrasted across several bases) despite proficient difficulty
- bloom=understand → V-4 = N/A (no P07 required; verification and coordinate-computation tasks, not open derivations)
- CPA_entry = C for a proficient learner: checking BOTH conditions explicitly on two concrete candidate sets (the standard basis and a genuinely different one) anchors the two-part definition before any shortcut ("looks spanning, so probably a basis") can take hold

**Key teaching insight:** MC-1 is this concept's root misconception because "basis" is defined by a CONJUNCTION of two properties, and a student's natural tendency (especially under time pressure) is to check the more visually obvious one (spanning, since it can often be eyeballed for familiar-looking vectors) and stop. A01 and A02 both deliberately show a case where spanning alone is INSUFFICIENT (Contrast 1's redundant third vector), making the two-part nature of the definition impossible to skip past unnoticed.

**MC-2 and MC-3 as consequences of correctly understanding MC-1's two-part test:** Once a student accepts that MULTIPLE different sets can each independently satisfy both conditions (defeating MC-1), the natural next question is how many such bases exist (MC-2: infinitely many) and whether they all describe vectors the same way (MC-3: no, coordinates depend on the basis) — A02's Contrasts 2 and 3 are sequenced as direct follow-ups exploring the consequences of basis MULTIPLICITY, once that multiplicity itself has been established.

**Sequencing note:** No cross-link concept exists yet for math.linalg.basis; the P76 transfer probe instead uses an image-compression scenario, chosen because it demonstrates a genuine PRACTICAL payoff for choosing a non-standard basis (revealing near-uniform structure via a small "difference" coordinate) — directly countering the "just use the standard basis, it's simpler" argument that MC-2's underlying intuition might otherwise support.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.linalg.basis ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.linalg.linear-independence ✓ (this session), math.linalg.span ✓ (this session) | PASS |
| V-3 | CPA entry = C for proficient difficulty | C (Concrete) ✓ | PASS |
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
| V-19 | Structure matches h | h=4, tightly-scoped → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Image-compression average/difference basis; practical basis-choice consequences ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

<!-- BLUEPRINT: math.linalg.norm -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Vector Norm
**Concept ID:** `math.linalg.norm`
**KG Fields:** difficulty=developing | bloom=apply | estimated_hours=2 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.linalg.norm |
| name | Vector Norm |
| difficulty | developing |
| bloom | apply |
| estimated_hours | 2 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.linalg.dot-product |
| cross_links | math.real.metric-space (Tier 1) |
| P76_mode | cross-link probe |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.linalg.dot-product**: $v\cdot v=\sum v_i^2$ — the exact quantity under the square root in the norm's definition, already computed by the student in a different context

### Target Knowledge State
Student can compute the (Euclidean) norm $\|v\|=\sqrt{v\cdot v}=\sqrt{\sum v_i^2}$ correctly, squaring every component (never just summing raw components); correctly recognize that the norm is ALWAYS non-negative, regardless of negative components (squaring removes the sign before the square root is taken); and correctly distinguish the standard Euclidean (2-)norm from other valid $p$-norms (1-norm, ∞-norm), recognizing these generally give DIFFERENT numeric values for the same vector, not interchangeable synonyms for "the length."

### Conceptual Obstacles
1. Computing the norm by simply summing the raw components (ignoring the required squaring and square root), e.g. treating $\|(3,4)\|$ as $3+4=7$ rather than $\sqrt{3^2+4^2}=5$
2. Believing a vector with negative components must have a negative norm — squaring a negative component always produces a positive result, and the norm (a square root of a sum of squares) is ALWAYS non-negative, regardless of the original components' signs
3. Assuming all "norms" of a vector give the same numeric value, or that the Euclidean norm is the ONLY valid notion of vector length — the 1-norm ($\sum|v_i|$) and ∞-norm ($\max|v_i|$) are equally valid norms that generally give DIFFERENT values than the Euclidean 2-norm for the same vector

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | NORM-IS-SUM-OF-COMPONENTS | Student computes the norm by summing raw components (or their absolute values, without squaring and taking a square root), rather than $\sqrt{\sum v_i^2}$ | Any norm computation with components other than 0 or 1 |
| MC-2 | NEGATIVE-COMPONENTS-GIVE-NEGATIVE-NORM | Student believes a vector with one or more negative components must have a negative norm | Any vector with at least one negative component |
| MC-3 | ALL-NORMS-ARE-THE-SAME-VALUE | Student assumes the 1-norm, 2-norm (Euclidean), and ∞-norm of a vector are all equal, or treats "norm" as referring only to the Euclidean case with no valid alternatives | Any vector where the different p-norms give visibly different numeric values |

**Foundational Misconception:** MC-1 (NORM-IS-SUM-OF-COMPONENTS) — it is the most common computational shortcut error in this concept, directly producing a wrong numeric answer for any vector with components other than the trivial 0/1 cases, and it undermines the geometric meaning of the norm as "length" (a sum of raw components has no consistent geometric interpretation as a distance, while the sum-of-squares-then-root construction is exactly the Pythagorean-theorem generalization that gives genuine geometric length).

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — developing learner computes the norm of a concrete 2D vector via the Pythagorean theorem directly, connecting it to the already-known dot product, before the general formula and its variants are stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: norm of (3,4) via the Pythagorean theorem, connected explicitly to the dot product; P: a right-triangle picture of the norm as hypotenuse length; A: the formal norm definition and the p-norm family
2. **A02 P06 CONTRAST PAIR** — sum-of-components vs. sum-of-squares-then-root, computed side by side (MC-1); a vector with negative components still giving a positive norm (MC-2); the 1-norm, 2-norm, and ∞-norm computed on the same vector, showing different values (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Length via Pythagoras, Length via the Dot Product

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground the norm in the familiar Pythagorean theorem before the general formula; connect explicitly to the already-known dot product

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (the length of $v=(3,4)$ via Pythagoras):**

Picture $v=(3,4)$ as the hypotenuse of a right triangle with legs 3 and 4 (along the x- and y-axes). By the Pythagorean theorem: length $=\sqrt{3^2+4^2}=\sqrt{9+16}=\sqrt{25}=5$.

**Connect to the dot product** (already known): $v\cdot v = 3(3)+4(4) = 9+16=25$. So the norm is $\|v\|=\sqrt{v\cdot v}=\sqrt{25}=5$ — EXACTLY the same computation as the Pythagorean theorem, since $v\cdot v=\sum v_i^2$ is precisely the sum of squared legs.

**Stage P — Pictorial (norm as hypotenuse length):**

```
        y
        │
      4 ┤        ● (3,4)
        │      ╱ │
        │    ╱   │ 4
        │  ╱     │
        │╱_______│___ x
       0         3
      hypotenuse length = √(3²+4²) = √25 = 5 = ‖v‖
```

**Stage A — Abstract (formal definition and the p-norm family):**

**Euclidean (2-)norm:** $\|v\| = \sqrt{v\cdot v} = \sqrt{\sum_i v_i^2}$.

**General $p$-norm:** $\|v\|_p = \left(\sum_i|v_i|^p\right)^{1/p}$ — the Euclidean norm is the special case $p=2$. Other common cases: the **1-norm** $\|v\|_1=\sum_i|v_i|$ (sum of absolute values, no squaring); the **∞-norm** $\|v\|_\infty=\max_i|v_i|$ (the single largest absolute component). These generally give DIFFERENT numeric values for the same vector — "the norm" without a specified $p$ conventionally means the Euclidean ($p=2$) norm, but it is not the only valid one.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Compute $\|v\|$ for $v=(6,8)$ using the formula $\sqrt{\sum v_i^2}$, and verify it matches the Pythagorean-theorem hypotenuse length.

**CORRECT:** $\|v\|=\sqrt{6^2+8^2}=\sqrt{36+64}=\sqrt{100}=10$. Matches the Pythagorean hypotenuse of a 6-8-10 right triangle.
→ "Correct — 6-8-10 is a scaled-up version of the familiar 3-4-5 triangle, confirming the formula generalizes exactly as expected." → Proceed to A02.

**PARTIAL:** Student computes $6^2+8^2=100$ correctly but forgets the final square root, reporting $\|v\|=100$.
→ "The formula is $\sqrt{\sum v_i^2}$ — you've correctly computed the SUM of squares (100), but the norm requires the SQUARE ROOT of that sum: $\sqrt{100}=10$, not 100 itself. Don't stop at the sum-of-squares step; always take the final square root."

**INCORRECT:** Student computes $\|v\|=6+8=14$ (MC-1, summing raw components).
→ "This skips both the squaring and the square root. The norm formula is $\sqrt{v_1^2+v_2^2}$, not $v_1+v_2$ — compute $6^2=36$ and $8^2=64$ first, sum them ($100$), THEN take the square root ($\sqrt{100}=10$). Summing raw components (14) has no connection to the Pythagorean length of the vector at all."

**NO_RESPONSE:** → "$\|v\|=\sqrt{6^2+8^2}=\sqrt{36+64}=\sqrt{100}=10$."

---

### Teaching Action A02 — Square First, Always Non-Negative, Different Norms Give Different Values

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with a direct sum-vs-sum-of-squares comparison; break MC-2 with a negative-component example; break MC-3 by computing three different p-norms on one vector

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Summing raw components vs. summing squares then rooting (MC-1):**

For $v=(1,2,2)$: **Wrong (sum of components):** $1+2+2=5$. **Correct (norm):** $\sqrt{1^2+2^2+2^2}=\sqrt{1+4+4}=\sqrt9=3$. These give DIFFERENT numbers (5 vs. 3) — the raw sum has no geometric meaning as "length," while the sum-of-squares-then-root construction is the genuine generalization of the Pythagorean theorem to any number of components.

**Contrast 2 — A vector with negative components still has a positive norm (MC-2):**

For $v=(-3,4)$: $\|v\|=\sqrt{(-3)^2+4^2}=\sqrt{9+16}=\sqrt{25}=5$ — **POSITIVE**, exactly matching $\|(3,4)\|=5$ from A01, DESPITE the first component being negative. Squaring $(-3)^2=9$ removes the sign entirely before anything else happens; the norm depends only on the MAGNITUDES of the components (via squaring), never their signs directly.

**Contrast 3 — Three different p-norms on the same vector, three different values (MC-3):**

For $v=(3,-4)$:
- **1-norm:** $\|v\|_1=|3|+|-4|=3+4=7$
- **2-norm (Euclidean):** $\|v\|_2=\sqrt{3^2+(-4)^2}=\sqrt{9+16}=\sqrt{25}=5$
- **∞-norm:** $\|v\|_\infty=\max(|3|,|-4|)=\max(3,4)=4$

**Three genuinely different numbers (7, 5, 4) for the SAME vector** — "the norm" is not a single, universal number attached to a vector; it depends on WHICH norm (which value of $p$, or the ∞ case) is being used. Without further specification, "norm" conventionally means the Euclidean (2-norm), but the other norms are equally legitimate and simply answer a different question about the vector's "size."

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** For $v=(-6,-8)$: (a) compute the Euclidean norm. (b) Is the result positive, negative, or zero? (c) Compute the 1-norm and the ∞-norm as well, and confirm all three (1-norm, 2-norm, ∞-norm) give different values.

**CORRECT:** (a) $\|v\|_2=\sqrt{(-6)^2+(-8)^2}=\sqrt{36+64}=\sqrt{100}=10$. (b) Positive (10), despite both components being negative. (c) 1-norm: $|-6|+|-8|=6+8=14$. ∞-norm: $\max(6,8)=8$. Three values: 14, 10, 8 — all different.
→ "Correct throughout — (b) directly confirms squaring erases the sign, and (c) confirms the three norm types generally disagree numerically." → Proceed to A03.

**PARTIAL:** Student gets (a) and (b) but in (c) assumes the 1-norm and ∞-norm must equal the 2-norm (10) without computing them separately.
→ "Compute each definition explicitly, don't assume they match: 1-norm sums absolute values directly ($6+8=14$, no squaring or rooting at all); ∞-norm takes just the largest absolute value ($\max(6,8)=8$). Neither computation involves the same squaring-then-rooting process as the 2-norm, so there's no reason to expect them to equal 10 — and indeed they don't (14 and 8, both different from 10 and from each other)."

**INCORRECT:** Student answers (b) "negative, since both components of the vector are negative" (MC-2).
→ "Check the actual computation: $(-6)^2=36$ and $(-8)^2=64$ — squaring a negative number ALWAYS gives a positive result, regardless of the original sign. The norm sums these already-positive squared values and takes a square root of a positive sum — there is no step in this process where a negative sign could survive into the final answer. The norm is always $\ge0$, by construction, for every vector."

**NO_RESPONSE:** → "(a) √(36+64)=√100=10. (b) Positive — squaring removes the sign before summing. (c) 1-norm=14, ∞-norm=8 — both different from the 2-norm's 10."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess correct norm computation, sign-independence, and p-norm discrimination under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Compute $\|v\|$ for $v=(5,12)$.

*Solution:* $\sqrt{25+144}=\sqrt{169}=13$.

**Problem 2:** Compute $\|v\|$ for $v=(-1,-1,-1,-1)$ (four components).

*Solution:* $\sqrt{1+1+1+1}=\sqrt4=2$ (positive, despite all components being negative).

**Problem 3:** For $v=(2,-3,6)$, compute the 1-norm, 2-norm, and ∞-norm, and confirm they are all different.

*Solution:* 1-norm: $2+3+6=11$. 2-norm: $\sqrt{4+9+36}=\sqrt{49}=7$. ∞-norm: $\max(2,3,6)=6$. Three different values: 11, 7, 6.

**Problem 4:** True or false: "For any vector with at least one negative component, the norm must be negative." Justify.

*Solution:* **False.** Squaring any real number (including negatives) produces a non-negative result; the norm is a square root of a sum of squares, hence always $\ge0$, regardless of the signs of the original components.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: cross-link probe — math.real.metric-space)*

**Prompt:** Recall from math.real.metric-space that a metric $d(x,y)$ on a set must satisfy: (i) $d(x,y)\ge0$, with equality iff $x=y$; (ii) $d(x,y)=d(y,x)$ (symmetry); (iii) $d(x,z)\le d(x,y)+d(y,z)$ (triangle inequality).

(a) Define $d(u,v)=\|u-v\|$ (the Euclidean norm of the difference) for vectors $u,v\in\mathbb R^n$. Using ONLY what you know about the norm's non-negativity and sign-independence (established in A02), explain why $d(u,v)\ge0$ always, and why $d(u,v)=0$ exactly when $u=v$.
(b) Explain why $d(u,v)=d(v,u)$ follows from a general property of the norm applied to $u-v$ versus $v-u$ (hint: these two vectors are negatives of each other — connect this to squaring removing sign, from Contrast 2).
(c) A student claims: "Since the 1-norm, 2-norm, and ∞-norm all give different numeric values for the same vector (Contrast 3), only ONE of them (presumably the 2-norm) can actually be used to build a valid metric via $d(u,v)=\|u-v\|_p$ — the others must fail one of the three metric axioms." Evaluate this claim (you do not need to prove the triangle inequality in full generality; focus on whether the CLAIM that only one norm can work is well-justified given what you've verified in (a) and (b)).

**Expected solution:**

(a) $d(u,v)=\|u-v\|=\sqrt{\sum(u_i-v_i)^2}$ — a square root of a sum of squares, which by the exact same reasoning as Contrast 2 (squaring removes sign, giving a non-negative sum inside the root) is ALWAYS $\ge0$. It equals exactly 0 only when every term $(u_i-v_i)^2=0$, i.e. $u_i=v_i$ for every component $i$, i.e. $u=v$ — matching metric axiom (i) exactly.

(b) $v-u = -(u-v)$, i.e. $v-u$ is the negative of $u-v$, with every component's SIGN flipped but magnitude unchanged. Since the norm depends only on SQUARED components (Contrast 2's lesson: squaring a negative gives the same positive result as squaring its positive counterpart), $\|v-u\|=\sqrt{\sum(v_i-u_i)^2}=\sqrt{\sum(-(u_i-v_i))^2}=\sqrt{\sum(u_i-v_i)^2}=\|u-v\|$ — the sign flip on every component vanishes upon squaring, giving $d(u,v)=d(v,u)$ directly, exactly matching metric axiom (ii).

(c) The student's claim is **not well-justified** by what (a) and (b) established — those two arguments (non-negativity/definiteness from squaring-removes-sign, and symmetry from the sign-flip-vanishes-under-squaring argument) did not actually depend on using SPECIFICALLY the 2-norm; the identical reasoning applies to the 1-norm ($d_1(u,v)=\sum|u_i-v_i|$, still non-negative since it's a sum of absolute values, still zero only when $u=v$, still symmetric since $|u_i-v_i|=|v_i-u_i|$ for absolute values) and to the ∞-norm (similarly, $\max|u_i-v_i|$ is non-negative, zero only at $u=v$, and symmetric). In fact, all three $p$-norms (1, 2, and ∞) DO give valid metrics via $d(u,v)=\|u-v\|_p$ — each independently satisfies non-negativity/definiteness and symmetry by the same style of argument, and (though not required to prove here) each also satisfies the triangle inequality (this is precisely why the p-norm's defining KG description notes it "satisfies positivity, homogeneity, and triangle inequality (defines a metric)" for general $p$, not just $p=2$). The fact that the three norms give DIFFERENT NUMERIC VALUES for the same vector pair (Contrast 3) does not mean only one of them can define a valid metric — it means there are multiple different, equally valid metrics (one per choice of $p$) that can be built from the norm framework, each measuring "distance" in a genuinely different but equally legitimate way.

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

- MASTERY ACHIEVED → unlock math.linalg.unit-vector and math.linalg.distance; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.linalg.norm assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — NORM-IS-SUM-OF-COMPONENTS (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Computing the norm as a raw sum of components is NORM-IS-SUM-OF-COMPONENTS. The correct formula squares every component, sums the squares, THEN takes a square root — $\sqrt{\sum v_i^2}$, never $\sum v_i$."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is ‖(2,5)‖?"
- MC-1 response: "7" (summing 2+5).

**[P64 — CONCEPTUAL SHIFT]**
"The norm is $\sqrt{2^2+5^2}=\sqrt{4+25}=\sqrt{29}\approx5.39$, not 7. Think of the Pythagorean theorem: the hypotenuse of a right triangle with legs 2 and 5 is $\sqrt{2^2+5^2}$, never $2+5$ — the norm generalizes exactly this geometric length computation, requiring squaring and a square root, not a simple sum."

Practice: Compute ‖(9,12)‖, comparing the (wrong) raw sum against the (correct) square-root-of-sum-of-squares result.

---

### Repair Action B02 — NEGATIVE-COMPONENTS-GIVE-NEGATIVE-NORM (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Believing negative components force a negative norm is NEGATIVE-COMPONENTS-GIVE-NEGATIVE-NORM. Squaring a negative number always gives a positive result — the norm is always non-negative, regardless of the vector's own signs."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "v=(-5,-12). Is ‖v‖ positive or negative?"
- MC-2 response: "Negative, since both components are negative."

**[P64 — CONCEPTUAL SHIFT]**
"Compute directly: $(-5)^2=25$, $(-12)^2=144$ — BOTH squared values are positive, regardless of the original negative signs. $\|v\|=\sqrt{25+144}=\sqrt{169}=13$ — POSITIVE. Squaring happens BEFORE the sign could matter, and a square root of a positive sum is always positive (or zero, only for the zero vector) — there is no path for a negative sign to survive into the final norm value."

Practice: Compute ‖(-8,-15)‖ and confirm the result is positive despite both components being negative.

---

### Repair Action B03 — ALL-NORMS-ARE-THE-SAME-VALUE (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming the 1-norm, 2-norm, and ∞-norm always give the same value is ALL-NORMS-ARE-THE-SAME-VALUE. These are genuinely different formulas and generally give different numbers for the same vector — 'norm' without further specification conventionally means the Euclidean (2-)norm, but it is not the only valid one."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "For v=(4,-3), compute the 1-norm and the 2-norm. Should they be the same?"
- MC-3 response: assumes they must match without computing both separately.

**[P64 — CONCEPTUAL SHIFT]**
"Compute each definition on its own terms: 1-norm $=|4|+|-3|=4+3=7$ (just absolute values summed, no squaring). 2-norm $=\sqrt{4^2+(-3)^2}=\sqrt{16+9}=\sqrt{25}=5$ (squaring and rooting). These use DIFFERENT formulas and give DIFFERENT results (7 vs. 5) — there's no reason to expect them to match, since they're answering different (though related) questions about the vector's 'size.'"

Practice: For v=(6,8), compute the 1-norm, 2-norm, and ∞-norm, confirming all three give different values.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Recompute a fresh Euclidean norm, explicitly writing the squaring step before the square root |
| SR-2 | +3 days | Confirm a fresh negative-component vector still gives a positive norm |
| SR-3 | +7 days | Compute all three (1-, 2-, ∞-) norms on a fresh vector, confirming they differ |
| SR-4 | +14 days | Reconstruct the metric-space transfer probe's argument for why all three p-norms can independently define valid metrics |

Retrieval flag: if student sums raw components instead of squaring (MC-1) or expects a negative norm from negative components (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.linalg.dot-product | $\|v\|=\sqrt{v\cdot v}$ — the norm is defined directly in terms of the dot product already mastered |
| Unlocks | math.linalg.unit-vector | A unit vector is defined as a vector normalized to have norm exactly 1, i.e. $v/\|v\|$ |
| Unlocks | math.linalg.distance | Distance between two points is defined as the norm of their difference, $\|u-v\|$ |

**GR-9:** cross_links include math.real.metric-space (Tier 1) → P76_mode = cross-link probe (probe connects the norm's non-negativity/definiteness and symmetry directly to that blueprint's three metric axioms, and examines whether the p-norm family's distinct numeric values undermine or support the claim that multiple valid metrics can be built from it).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=2 → compact structure (2 main TAs + gate), matching the concept's small time allocation and tightly focused computational scope
- bloom=apply → every checkpoint and the gate require direct numeric computation of the norm, not merely definitional recall
- CPA_entry = C for a developing learner: the Pythagorean theorem (already familiar from geometry) anchors the norm's meaning as genuine geometric length before the general n-dimensional formula and p-norm variants are introduced

**Key teaching insight:** MC-1 is this concept's highest-leverage misconception because it is the most tempting computational shortcut (summing components is simpler than squaring-summing-rooting) and produces a plausible-looking but entirely wrong number for any nontrivial vector. A01's explicit connection between the norm formula and the ALREADY-FAMILIAR Pythagorean theorem is the single best defense against this shortcut, since a student who recognizes "this IS the Pythagorean theorem" has independent geometric grounds to expect squaring and a square root, not a bare sum.

**MC-2 and MC-3 as refinements building on MC-1's correction:** Once the correct squaring-based formula is established (defeating MC-1), MC-2 (sign-independence) and MC-3 (multiple valid p-norms) are natural follow-up precision questions about that SAME formula's behavior — A02's three contrasts are sequenced to build directly on the formula just established, rather than introducing unrelated new content.

**Sequencing note (cross-link):** math.real.metric-space is a genuine, actionable Tier-1 cross-link — the P76 transfer probe directly reconciles the norm's sign-independence and definiteness (established in this blueprint) with that blueprint's formal metric axioms, and uses the multiple-p-norms fact (Contrast 3) to test whether the student can correctly generalize the metric-construction argument beyond just the Euclidean case.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.linalg.norm ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.linalg.dot-product ✓ | PASS |
| V-3 | CPA entry = C for developing difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Direct numeric computation tasks throughout A01-A03 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | math.real.metric-space is Tier 1 → P76=cross-link probe ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=2 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Metric-axiom derivation from norm properties; p-norm-multiplicity argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

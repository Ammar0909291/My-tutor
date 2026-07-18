<!-- BLUEPRINT: math.linalg.linear-independence -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Linear Independence
**Concept ID:** `math.linalg.linear-independence`
**KG Fields:** difficulty=proficient | bloom=understand | estimated_hours=4 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.linalg.linear-independence |
| name | Linear Independence |
| difficulty | proficient |
| bloom | understand |
| estimated_hours | 4 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.linalg.span |
| cross_links | math.de.wronskian (not yet authored — see Component 7) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.linalg.span**: span(S) is the set of ALL linear combinations of S; the redundancy notion from that concept (a vector already reachable from the others) is EXACTLY what linear dependence formalizes

### Target Knowledge State
Student can determine whether a set of vectors is linearly independent by setting $c_1v_1+\cdots+c_kv_k=0$ and checking whether the ONLY solution is the trivial one ($c_1=\cdots=c_k=0$); correctly recognize that dependence among 3 or more vectors need not involve any TWO of them being parallel — one vector can be a combination of SEVERAL others collectively, with no pairwise relationship visible; and correctly apply the fact that in $\mathbb R^n$, any set of MORE than $n$ vectors is automatically linearly dependent, without needing to check a specific combination.

### Conceptual Obstacles
1. Assuming linear dependence only occurs when two vectors are identical or exact scalar multiples (parallel) — a set of 3+ vectors can be dependent purely through a MULTI-vector relationship (one vector equals a combination of two or more others), with no pair individually parallel
2. Believing that exhibiting the TRIVIAL solution ($c_i=0$ for all $i$, which always satisfies $\sum c_iv_i=0$ trivially) is sufficient to prove independence — proving independence requires showing this is the ONLY solution, i.e. that no NONTRIVIAL combination also equals 0
3. Assuming any set of vectors, regardless of how many there are relative to the ambient dimension, could turn out to be independent — in $\mathbb R^n$, ANY set of more than $n$ vectors is automatically dependent (a structural fact following from span/dimension considerations), no case-by-case check needed

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | DEPENDENCE-REQUIRES-PARALLEL-PAIR | Student checks only pairwise relationships (are any two vectors parallel/identical) to judge dependence, missing multi-vector dependencies with no pairwise relationship visible | Any 3+ vector set dependent via a genuine linear combination of 3 or more vectors, with no two individually parallel |
| MC-2 | TRIVIAL-SOLUTION-PROVES-INDEPENDENCE | Student exhibits the trivial solution ($c_i=0$ for all i) and declares independence proven, without checking whether a NONTRIVIAL solution also exists | Any set that is actually dependent, where a student stops after verifying the (always-true) trivial case |
| MC-3 | ANY-VECTOR-COUNT-CAN-BE-INDEPENDENT | Student assumes a large set of vectors in $\mathbb R^n$ could still be independent regardless of count, missing that more than n vectors in $\mathbb R^n$ is automatically dependent | Any set with more vectors than the ambient dimension, e.g. 4 vectors in $\mathbb R^3$ |

**Foundational Misconception:** MC-2 (TRIVIAL-SOLUTION-PROVES-INDEPENDENCE) — it is a basic logical error about what the DEFINITION actually demands: independence requires the trivial solution to be the ONLY one, and a student who stops at "the trivial solution works" (which is ALWAYS true for every set of vectors, dependent or not) has verified nothing at all — this directly enables MC-1 (since a student not searching for nontrivial solutions has no way to discover a genuine multi-vector dependency) and MC-3 (since dimension-count reasoning is itself a shortcut for concluding a nontrivial solution MUST exist, which requires first understanding what "must exist" even means here).

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — proficient learner sets up and solves $c_1v_1+c_2v_2+c_3v_3=0$ explicitly for a genuinely dependent set of 3 vectors (no pair parallel) before the general definition is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: solving the combination equation explicitly for a 3-vector dependent set with no parallel pair; P: a picture contrasting pairwise-parallel dependence against multi-vector dependence; A: the formal definition and the equivalent "one vector is a combination of the others" characterization
2. **A02 P06 CONTRAST PAIR** — a multi-vector dependency with no parallel pair (MC-1); trivial-solution-only check vs. full nontrivial-solution search (MC-2); a too-many-vectors-for-the-dimension case (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Solving the Combination Equation Explicitly

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground independence-checking in an explicit solved system for a genuinely non-obvious (no parallel pair) dependent set; state the formal definition and equivalent characterization

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (checking $v_1=(1,0), v_2=(0,1), v_3=(2,3)$ — no two are parallel):**

Set up $c_1(1,0)+c_2(0,1)+c_3(2,3)=(0,0)$: component-wise, $c_1+2c_3=0$ and $c_2+3c_3=0$. This has infinitely many solutions parametrized by $c_3$: e.g. $c_3=1 \Rightarrow c_1=-2, c_2=-3$. Check: $-2(1,0)-3(0,1)+1(2,3) = (-2,0)+(0,-3)+(2,3)=(0,0)$ ✓ — a genuinely **NONTRIVIAL** solution exists ($c_1=-2,c_2=-3,c_3=1$, not all zero). **The set is linearly DEPENDENT** — despite no two of $v_1,v_2,v_3$ being parallel or identical (check: $v_1,v_2$ point along different axes; $v_3=(2,3)$ isn't a multiple of either alone).

**Stage P — Pictorial (pairwise-parallel dependence vs. multi-vector dependence):**

```
   PAIRWISE DEPENDENCE               MULTI-VECTOR DEPENDENCE
   (easy to spot):                    (Contrast 1's example):
   v₁=(1,2), v₂=(2,4)                 v₁=(1,0), v₂=(0,1), v₃=(2,3)
   v₂=2v₁ — obviously parallel        NO pair is parallel, yet
                                        v₃ = 2v₁+3v₂ (a combination
                                        of BOTH others together)
```

**Stage A — Abstract (formal definition and equivalent characterization):**

**Definition:** $v_1,\ldots,v_k$ are **linearly independent** iff the ONLY solution to $c_1v_1+\cdots+c_kv_k=0$ is the trivial one, $c_1=\cdots=c_k=0$. If a NONTRIVIAL solution exists (some $c_i\ne0$), the set is **linearly dependent**.

**Equivalent characterization:** a set is dependent iff SOME vector in it is a linear combination of the OTHERS (in the A01 example: $v_3=2v_1+3v_2$, confirming dependence directly).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Set up and solve $c_1v_1+c_2v_2=0$ for $v_1=(2,1), v_2=(4,2)$. Is the set independent or dependent?

**CORRECT:** $c_1(2,1)+c_2(4,2)=(0,0)$: $2c_1+4c_2=0$ and $c_1+2c_2=0$ — both equations are the SAME (the first is exactly twice the second), so there are infinitely many solutions (e.g. $c_1=-2,c_2=1$): check $-2(2,1)+1(4,2)=(-4,-2)+(4,2)=(0,0)$ ✓. A nontrivial solution exists — **DEPENDENT** (indeed, $v_2=2v_1$, an obvious parallel pair here).
→ "Correct — this is the easy, pairwise-parallel case; A02 will show dependence can also hide in sets with no such obvious pair." → Proceed to A02.

**PARTIAL:** Student sets up the equations correctly but only checks the trivial solution $c_1=c_2=0$ and stops, declaring independence (MC-2).
→ "Checking that $c_1=c_2=0$ works is not enough — that trivial solution ALWAYS works for any set of vectors, dependent or independent, since $0\cdot v_1+0\cdot v_2=0$ regardless. You must check whether OTHER (nontrivial) solutions also exist. Here, since the two equations are literal multiples of each other, infinitely many nontrivial solutions exist (e.g. $c_1=-2,c_2=1$) — the set is dependent, not independent."

**INCORRECT:** Student concludes independence because "the vectors look different" (e.g. different-looking coordinate pairs) without setting up the equation at all.
→ "Visual dissimilarity doesn't settle the question — set up and solve $c_1v_1+c_2v_2=0$ explicitly. Here: $2c_1+4c_2=0$ and $c_1+2c_2=0$ are the SAME equation scaled by 2, so infinitely many nontrivial solutions exist (e.g. $c_1=-2,c_2=1$), confirming DEPENDENCE — despite the vectors (2,1) and (4,2) not looking identical at a glance, one is exactly twice the other."

**NO_RESPONSE:** → "2c₁+4c₂=0 and c₁+2c₂=0 are the same equation (one is twice the other), so infinitely many solutions exist, e.g. c₁=-2,c₂=1. Nontrivial solution exists — DEPENDENT (v₂=2v₁)."

---

### Teaching Action A02 — No Parallel Pair Needed; Search, Don't Stop at Trivial; Count vs. Dimension

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with a fresh no-parallel-pair dependent set; break MC-2 by explicitly searching beyond the trivial solution on a genuinely independent set; break MC-3 with the more-than-n-vectors fact

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Dependence with NO pairwise-parallel vectors (MC-1), a second example:**

$u_1=(1,1,0), u_2=(0,1,1), u_3=(1,2,1)$ in $\mathbb R^3$. Check all pairs: none is a scalar multiple of another (verify: $u_3/u_1$ would need to be constant across all three components, $1/1=1, 2/1=2$ — already inconsistent, so not parallel; similarly for the other pairs). Yet: $u_1+u_2=(1,2,1)=u_3$ — so $u_1+u_2-u_3=0$, a genuine NONTRIVIAL combination ($c_1=1,c_2=1,c_3=-1$, not all zero). **DEPENDENT**, confirmed with zero pairwise-parallel relationships anywhere — the dependency involves all three vectors jointly.

**Contrast 2 — Genuinely searching beyond the trivial solution (MC-2), on an actually INDEPENDENT set:**

$w_1=(1,0,0), w_2=(0,1,0), w_3=(0,0,1)$ (the standard basis vectors). Set up $c_1w_1+c_2w_2+c_3w_3=(0,0,0)$: this directly gives $(c_1,c_2,c_3)=(0,0,0)$, i.e. $c_1=c_2=c_3=0$ is FORCED — no other solution is even algebraically possible (each component equation independently pins down its own $c_i$ to exactly 0). Here, the search for nontrivial solutions genuinely comes up empty — this is what makes $\{w_1,w_2,w_3\}$ **INDEPENDENT**, a conclusion only earned by actually attempting (and failing) to find a nontrivial solution, not merely by noting the trivial one works.

**Contrast 3 — Too many vectors for the dimension (MC-3):**

Any set of 4 vectors in $\mathbb R^3$ (e.g. $(1,0,0),(0,1,0),(0,0,1),(1,1,1)$) is AUTOMATICALLY linearly dependent — no computation is even needed to know this in advance, because $\mathbb R^3$ has dimension 3, and any 4 vectors there must satisfy at least one nontrivial linear relationship (a structural consequence of dimension, developed fully in later concepts). Concretely here: $(1,1,1)=1\cdot(1,0,0)+1\cdot(0,1,0)+1\cdot(0,0,1)$, an explicit nontrivial dependency, exactly as the "more vectors than dimensions" rule predicts.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Are $p_1=(1,1,1), p_2=(1,2,3), p_3=(3,4,5)$ independent or dependent? Check for a nontrivial combination (hint: try $p_3$ as a combination of $p_1,p_2$). (b) Without any computation, is a set of 5 vectors in $\mathbb R^4$ necessarily dependent? Why or why not?

**CORRECT:** (a) Try $p_3=ap_1+bp_2$: $(3,4,5)=a(1,1,1)+b(1,2,3)=(a+b,a+2b,a+3b)$. From the first two components: $a+b=3, a+2b=4 \Rightarrow b=1,a=2$. Check the third: $a+3b=2+3=5$ ✓ — matches! So $p_3=2p_1+p_2$, i.e. $2p_1+p_2-p_3=0$, a nontrivial combination — **DEPENDENT**, with no pair of $p_1,p_2,p_3$ individually parallel. (b) Yes, necessarily dependent — 5 vectors in $\mathbb R^4$ (dimension 4) always exceeds the dimension, so by the more-than-n-vectors rule, dependence is guaranteed without needing to check the specific vectors at all.
→ "Correct — (a) confirms a fresh multi-vector dependency, and (b) applies the dimension-count shortcut directly, without redoing a full computation." → Proceed to A03.

**PARTIAL:** Student solves (a) correctly but in (b) insists on trying to set up and solve the general system rather than recognizing the dimension-count shortcut applies immediately.
→ "You could set up and solve the general system, but there's a faster, guaranteed conclusion available: whenever the NUMBER of vectors exceeds the AMBIENT DIMENSION (here, 5 vectors > 4 dimensions), dependence is structurally forced, with no need to examine the specific vectors at all. This shortcut is worth using directly once you recognize the vector-count-vs-dimension comparison, rather than re-deriving it from scratch each time."

**INCORRECT:** Student answers (a) "independent, since no two of p₁,p₂,p₃ are identical or obvious multiples" (MC-1).
→ "Checking only PAIRS misses multi-vector dependencies. Try expressing one vector as a combination of the OTHER TWO: solving $p_3=ap_1+bp_2$ gives $a=2,b=1$, and checking the third component confirms it works — $p_3=2p_1+p_2$ exactly. This is a genuine dependency involving all three vectors jointly, with no pair individually parallel — exactly the trap Contrast 1 warned about."

**NO_RESPONSE:** → "(a) p₃=2p₁+p₂ (verified in all three components) — a nontrivial combination, so DEPENDENT. (b) Yes — 5 vectors exceed the dimension 4 of ℝ⁴, so dependence is guaranteed by the count alone."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess full-search independence checking, multi-vector dependency recognition, and dimension-count reasoning under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Are $(1,2),(3,6)$ linearly independent?

*Solution:* $(3,6)=3(1,2)$ — a nontrivial dependency ($3v_1-v_2=0$). Dependent.

**Problem 2:** Are $(1,0,0),(0,1,0),(1,1,0)$ independent? (Note: all three lie in the xy-plane.)

*Solution:* $(1,1,0)=(1,0,0)+(0,1,0)$ — nontrivial dependency. Dependent (no pair is individually parallel, but the third is a sum of the other two).

**Problem 3:** Are $(1,0),(0,1)$ independent? Prove by solving the combination equation fully (not just checking the trivial case).

*Solution:* $c_1(1,0)+c_2(0,1)=(0,0)$ directly forces $c_1=0,c_2=0$ — no other solution is algebraically possible. Independent (search for a nontrivial solution genuinely fails).

**Problem 4:** Without computation, are 6 vectors in $\mathbb R^5$ necessarily dependent? Justify.

*Solution:* Yes — 6 exceeds the dimension 5, so dependence is structurally guaranteed regardless of which specific 6 vectors are chosen.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A chemist proposes three "basis" reaction mixtures $r_1=(2,1,0), r_2=(0,1,2), r_3=(2,3,4)$ (tracking three reactant concentrations) to combine into any target mixture.

(a) Determine whether $\{r_1,r_2,r_3\}$ is linearly independent, showing your full work (not stopping at the trivial solution).
(b) A colleague claims: "Since none of these three mixtures is literally a multiple of another, they must be independent." Evaluate this claim precisely, using your answer to (a).
(c) If the chemist proposes a FOURTH mixture $r_4$ (any concentrations at all) to add to the original three, is $\{r_1,r_2,r_3,r_4\}$ guaranteed to be dependent, guaranteed to be independent, or could it go either way — assuming these track exactly 3 reactant concentrations (i.e. vectors in $\mathbb R^3$)? Justify precisely.

**Expected solution:**

(a) Set up $c_1(2,1,0)+c_2(0,1,2)+c_3(2,3,4)=(0,0,0)$: $2c_1+2c_3=0$, $c_1+c_2+3c_3=0$, $2c_2+4c_3=0$. From the first: $c_1=-c_3$. From the third: $c_2=-2c_3$. Substitute into the second: $-c_3+(-2c_3)+3c_3=0 \Rightarrow 0=0$ — always true, meaning $c_3$ is FREE (any value works). Take $c_3=1$: $c_1=-1,c_2=-2$. Check: $-1(2,1,0)-2(0,1,2)+1(2,3,4) = (-2,-1,0)+(0,-2,-4)+(2,3,4) = (0,0,0)$ ✓. A nontrivial solution exists — **DEPENDENT** (specifically, $r_3=r_1+2r_2$, checkable directly: $(2,1,0)+2(0,1,2)=(2,1,0)+(0,2,4)=(2,3,4)=r_3$ ✓).

(b) The colleague's claim is **wrong** — exactly the MC-1 trap. None of $r_1,r_2,r_3$ is individually a scalar multiple of another (verify: no constant ratio holds across all three components for any pair), yet (a) showed the set IS dependent via a genuine three-vector relationship ($r_3=r_1+2r_2$). "No pair is parallel" rules out only the SIMPLEST kind of dependence; it says nothing about multi-vector dependencies, which require checking the full combination equation, not just pairwise ratios.

(c) Since $\{r_1,r_2,r_3\}$ (3 vectors in $\mathbb R^3$) is ALREADY dependent (from (a)), adding a fourth vector $r_4$ (of ANY concentrations) keeps the set dependent — a set that is already dependent cannot become independent by adding more vectors (the original nontrivial combination among $r_1,r_2,r_3$ still works with $c_4=0$ appended, giving a nontrivial combination for the 4-vector set too). So the answer is **guaranteed dependent**, regardless of what $r_4$ is — this is a general fact (once dependent, always dependent upon adding more vectors), distinct from (but related to) the separate more-than-n-vectors rule (which would ALSO guarantee dependence here, since 4 vectors exceed the dimension 3, but that rule isn't even needed since the original three were already dependent on their own).

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

- MASTERY ACHIEVED → unlock math.linalg.basis; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.linalg.linear-independence assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — DEPENDENCE-REQUIRES-PARALLEL-PAIR (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Checking only pairwise relationships to judge dependence is DEPENDENCE-REQUIRES-PARALLEL-PAIR. A set of 3+ vectors can be dependent through a MULTI-vector relationship, with no two individually parallel — only the full combination equation reliably detects this."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "v₁=(1,0,0), v₂=(0,1,0), v₃=(1,1,0). No pair is parallel. Independent?"
- MC-1 response: "Yes, since no two vectors are multiples of each other."

**[P64 — CONCEPTUAL SHIFT]**
"Check the FULL combination, not just pairs: is $v_3$ expressible using BOTH $v_1$ and $v_2$ together? $v_3=(1,1,0)=1\cdot(1,0,0)+1\cdot(0,1,0)=v_1+v_2$ — yes, exactly. This gives $v_1+v_2-v_3=0$, a nontrivial combination — DEPENDENT, despite no pairwise parallel relationship anywhere. Always set up and solve $c_1v_1+c_2v_2+c_3v_3=0$ in full; pairwise checks alone can miss dependencies distributed across three or more vectors."

Practice: Verify that $(1,2,0),(0,1,1),(1,3,1)$ has no pairwise-parallel vectors, then find the nontrivial combination proving dependence.

---

### Repair Action B02 — TRIVIAL-SOLUTION-PROVES-INDEPENDENCE (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Stopping at the trivial solution to declare independence is TRIVIAL-SOLUTION-PROVES-INDEPENDENCE. The trivial solution ALWAYS works, for any set — proving independence requires showing it's the ONLY solution, which means actually attempting to find a nontrivial one and failing."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "c₁=c₂=0 satisfies c₁v₁+c₂v₂=0 for any v₁,v₂. Does this prove independence?"
- MC-2 response: "Yes, since the equation is satisfied."

**[P64 — CONCEPTUAL SHIFT]**
"The trivial solution satisfying the equation is true for EVERY set of vectors, dependent or independent — it proves nothing on its own. To establish independence, you must show NO nontrivial solution exists: set up the full system, solve it completely, and confirm the ONLY solution that emerges is $c_1=c_2=\cdots=0$. If a nontrivial solution turns up during this solving process, the set is dependent, regardless of the trivial solution also technically working."

Practice: For $(1,3),(2,6)$, set up the combination equation, solve it completely, and determine whether the trivial solution is the ONLY one.

---

### Repair Action B03 — ANY-VECTOR-COUNT-CAN-BE-INDEPENDENT (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming any number of vectors could be independent regardless of dimension is ANY-VECTOR-COUNT-CAN-BE-INDEPENDENT. In $\mathbb R^n$, any set of MORE than n vectors is automatically dependent — no case-by-case check needed."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Could 5 vectors in ℝ³ possibly be independent?"
- MC-3 response: "Maybe, depending on which specific vectors they are."

**[P64 — CONCEPTUAL SHIFT]**
"No — this is guaranteed impossible, regardless of which 5 vectors are chosen. Whenever the vector COUNT exceeds the ambient DIMENSION (5>3 here), at least one nontrivial dependency is structurally forced to exist among them. This isn't a case-by-case computation; it's a general fact about vector spaces (their dimension caps how many independent vectors can coexist) — checking a specific example would only confirm what's already guaranteed."

Practice: State, without computation, whether 10 vectors in ℝ⁷ could possibly be independent, and explain why using the count-vs-dimension rule.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Solve a fresh combination equation fully (not stopping at the trivial solution) for a 3-vector set |
| SR-2 | +3 days | Find a fresh multi-vector dependency with no pairwise-parallel relationship |
| SR-3 | +7 days | Apply the count-vs-dimension rule to a fresh vector-count scenario without computation |
| SR-4 | +14 days | Reconstruct the chemistry transfer probe's argument for why a dependent set stays dependent after adding more vectors |

Retrieval flag: if student checks only pairwise parallelism (MC-1) or stops at the trivial solution (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.linalg.span | Linear dependence is precisely the redundancy notion from span (a vector already reachable from the others), now given its own name and formal test |
| Unlocks | math.linalg.basis | A basis requires BOTH spanning AND linear independence — this concept supplies the second half of that definition |

**GR-9:** cross_links: math.de.wronskian is listed in the KG but has **no authored blueprint yet** — P76_mode is therefore set to independence for now; once math.de.wronskian is authored, a future revision may add a genuine cross-link probe connecting linear independence of functions to the Wronskian determinant test.

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=4 → compact structure (2 main TAs + gate), matching the concept's tightly focused scope (one definitional test, applied across several configurations) despite proficient difficulty
- bloom=understand → V-4 = N/A (no P07 required; combination-equation solving and classification tasks, not open derivations)
- CPA_entry = C for a proficient learner: an explicit solved system for a genuinely non-obvious (no parallel pair) dependent set anchors the "search fully, don't just check pairs" discipline before the formal definition risks being read as a pairwise test

**Key teaching insight:** MC-2 is this concept's root misconception because it is a basic logical confusion about what the definition's "only solution" clause actually requires — a student who doesn't grasp that the trivial solution ALWAYS exists (for every set, dependent or not) will treat verifying it as meaningful progress, when in fact the entire content of the independence question lies in whether OTHER solutions exist. A01 and A02 are sequenced to first show a dependent set (where the search SUCCEEDS in finding a nontrivial solution) then an independent set (where the identical search FAILS), so the student experiences both outcomes of the same procedure rather than only ever confirming a foregone conclusion.

**MC-1 as a persistent, easy-to-miss trap:** Even after MC-2 is corrected, a student might perform the full combination-equation search but structure their SEARCH around pairwise comparisons only (checking "is any vector a multiple of another") rather than genuinely solving the joint system — A02's Contrast 1 and the A03 gate both deliberately use sets where no pairwise check would ever reveal the dependency, forcing genuine multi-vector reasoning.

**Sequencing note:** No cross-link concept exists yet for math.linalg.linear-independence; the P76 transfer probe instead uses a chemistry reaction-mixture scenario, chosen because "none of these looks like a multiple of another" is exactly the surface-level reasoning MC-1 relies on, and the probe's part (c) additionally tests the general (and less obvious) fact that a dependent set remains dependent after any further additions.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.linalg.linear-independence ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.linalg.span ✓ (this session) | PASS |
| V-3 | CPA entry = C for proficient difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented; not-yet-authored cross-link noted ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_link target not yet authored → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1, MC-2 FOUNDATIONAL, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=4, tightly-scoped → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Chemistry reaction-mixture scenario; dependent-stays-dependent general argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

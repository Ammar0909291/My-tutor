<!-- BLUEPRINT: math.linalg.span -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Span
**Concept ID:** `math.linalg.span`
**KG Fields:** difficulty=proficient | bloom=understand | estimated_hours=3 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.linalg.span |
| name | Span |
| difficulty | proficient |
| bloom | understand |
| estimated_hours | 3 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.linalg.subspace |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.linalg.subspace**: a subspace is a subset closed under addition and scalar multiplication, containing 0; span(S) is DEFINED to be the smallest subspace containing S, connecting this concept directly to the subspace test already mastered

### Target Knowledge State
Student can compute span(S) for a small set of vectors S as the set of ALL linear combinations $c_1v_1+\cdots+c_kv_k$ (every choice of scalars, not just a few sample combinations); correctly determine whether a given target vector lies in span(S) by solving for the combination coefficients (a linear system) rather than by guessing or pattern-matching; correctly recognize that adding a vector to S that is ALREADY a linear combination of the others does not enlarge the span (the redundant vector contributes nothing new); and correctly distinguish "span(S) is a specific finite SET of vectors used to generate it" from "span(S) is the (typically infinite) SET OF ALL VECTORS reachable by combining them."

### Conceptual Obstacles
1. Confusing the GENERATING set S (a specific, usually small, finite list of vectors) with the SPAN itself (the vastly larger — often infinite — set of ALL linear combinations of S); a common error is treating "span(S)" as if it just meant "the vectors in S," rather than everything reachable by combining them
2. Believing membership in span(S) can be checked by inspection or a few sample combinations, rather than by actually SOLVING the linear system $c_1v_1+\cdots+c_kv_k=w$ for the coefficients $c_i$ — a vector can look "unrelated" to S's vectors on casual inspection yet still be in the span (or vice versa), and only solving the system settles it
3. Assuming every additional vector added to a spanning set enlarges the span — if the new vector is ALREADY expressible as a combination of the existing vectors (i.e. it's redundant/dependent), adding it to S changes nothing about span(S); the span only grows when a genuinely NEW direction (not reachable from the existing vectors) is added

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SPAN-EQUALS-GENERATING-SET | Student treats span(S) as if it were just the (finite) set S itself, rather than the (typically infinite) set of ALL linear combinations of S | Any question asking "what is span(S)" where the answer is a whole subspace, not merely S's own elements |
| MC-2 | SPAN-MEMBERSHIP-BY-INSPECTION | Student judges whether a vector is in span(S) by eyeballing or trying a couple of sample combinations, rather than setting up and solving the linear system for the combination coefficients | Any target vector whose combination coefficients are not immediately obvious by inspection |
| MC-3 | EVERY-NEW-VECTOR-ENLARGES-SPAN | Student assumes adding any vector to a spanning set S always produces a strictly larger span, missing that a REDUNDANT (already-in-the-span) vector changes nothing | Adding a vector to S that happens to already be a linear combination of S's existing vectors |

**Foundational Misconception:** MC-1 (SPAN-EQUALS-GENERATING-SET) — it is a basic category error (confusing a small generating list with the entire, usually infinite, set it generates) that undermines every subsequent computation in this concept: a student who thinks span(S) IS S cannot correctly answer any "is w in span(S)?" question (since they'd only check membership in the tiny original list, not in the full combination-set), directly enabling MC-2's inspection-only shortcut and MC-3's redundancy confusion.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — proficient learner computes several explicit linear combinations of two vectors in ℝ² before the general "span = set of ALL combinations" definition is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: explicit linear combinations of two vectors computed, building toward "every point in the plane is reachable"; P: a grid picture showing span as a filled plane vs. a single generating pair; A: formal span definition and the smallest-subspace characterization
2. **A02 P06 CONTRAST PAIR** — span(S) as a set vs. S itself (MC-1); solving the linear system vs. inspection-only guessing for membership (MC-2); adding a redundant vector (no change) vs. a genuinely new direction (span grows) (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Every Combination, Not Just a Few

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Build span concretely from explicit combinations before generalizing; state the formal definition and its smallest-subspace characterization

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (combinations of $v_1=(1,0), v_2=(0,1)$ in ℝ²):**

$1\cdot v_1+0\cdot v_2=(1,0)$; $0\cdot v_1+1\cdot v_2=(0,1)$; $2\cdot v_1+3\cdot v_2=(2,3)$; $-1\cdot v_1+5\cdot v_2=(-1,5)$; $\pi\cdot v_1+(-\sqrt2)\cdot v_2=(\pi,-\sqrt2)$.

Notice: for ANY target point $(a,b)\in\mathbb R^2$, the combination $a\cdot v_1+b\cdot v_2=(a,b)$ reaches it EXACTLY — every single point in the plane is some combination of $v_1,v_2$. **span$(\{v_1,v_2\})=\mathbb R^2$, the ENTIRE plane**, not just the two listed vectors $v_1,v_2$ themselves.

**Stage P — Pictorial (the generating set vs. the filled-in span):**

```
   The generating set S = {v₁, v₂}:      span(S) = ALL of ℝ²:
        y                                     y
        │                                     │▓▓▓▓▓▓▓▓▓▓▓▓
    v₂ →●                                     │▓▓▓▓▓▓▓▓▓▓▓▓
        │                                     │▓▓▓▓▓▓▓▓▓▓▓▓
        └──●───x                              └──────────── x
          v₁                                   (every point reachable
   (just 2 specific points)                     by some combination)
```

S is two dots; span(S) is the WHOLE shaded plane — a vastly larger (here, infinite) set.

**Stage A — Abstract (formal definition):**

$$\text{span}(S) = \{c_1v_1+c_2v_2+\cdots+c_kv_k : c_1,\ldots,c_k\in\mathbb R\}$$
— the set of ALL linear combinations of the vectors in $S=\{v_1,\ldots,v_k\}$, using EVERY possible choice of scalars $c_i$ (not a fixed or sample selection).

**Characterization:** span(S) is the SMALLEST subspace containing S — it is itself a subspace (closed under addition and scalar multiplication, contains 0 via all $c_i=0$), and any subspace containing every vector of S must contain all their combinations too, hence must contain span(S) entirely.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Let $S=\{(1,1)\}$ (a single vector). Describe span(S) geometrically, and state whether $(3,3)$ and $(2,5)$ are each in span(S).

**CORRECT:** span(S) = all scalar multiples of $(1,1)$: $\{c(1,1):c\in\mathbb R\} = \{(c,c):c\in\mathbb R\}$ — geometrically, the LINE through the origin with slope 1 (i.e. $y=x$). $(3,3)=3(1,1)$ ✓ IS in span(S) (take $c=3$). $(2,5)$: would need $c=2$ AND $c=5$ simultaneously (from $(c,c)=(2,5)$), impossible — **NOT in span(S)**.
→ "Correct — span of a single nonzero vector is always a line through the origin, and membership requires the target to actually lie ON that line, checked by solving for a single consistent c." → Proceed to A02.

**PARTIAL:** Student correctly identifies span(S) as a line but only checks $(3,3)$ by inspection, without a similarly rigorous check for $(2,5)$ (e.g. "$(2,5)$ doesn't look like a multiple, so it's probably not in the span").
→ "Make the check for (2,5) explicit, not just a feeling: solve $(c,c)=(2,5)$ for a single c — the first coordinate demands $c=2$, the second demands $c=5$; no single value of c satisfies both simultaneously, so $(2,5)$ is definitively NOT in span(S). This explicit solve-and-check is the reliable method, even when the answer 'looks obvious' either way."

**INCORRECT:** Student answers "span(S) is just the point (1,1) itself, since that's the only vector given" (MC-1).
→ "span(S) is not the single vector (1,1) — it's the set of ALL its scalar multiples, $\{c(1,1):c\in\mathbb R\}$, which includes $(2,2),(3,3),(-1,-1),(0.5,0.5)$, and infinitely many more points — an entire LINE through the origin, not one point. The generating set S={(1,1)} has exactly one element; span(S) has infinitely many."

**NO_RESPONSE:** → "span(S)={c(1,1):c∈ℝ}, the line y=x. (3,3)=3(1,1) is in span(S). (2,5) would need c=2 and c=5 at once — impossible — so (2,5) is NOT in span(S)."

---

### Teaching Action A02 — Set vs. Generators; Solve, Don't Guess; Redundancy Doesn't Enlarge

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 by contrasting the generating set's size against the span's size; break MC-2 with a membership check requiring an actual linear-system solve; break MC-3 with a redundant vector that doesn't change the span

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — S (2 vectors) vs. span(S) (infinitely many) (MC-1):**

$S=\{(1,2),(3,1)\}$ has exactly 2 elements. span(S) — since these two vectors are not parallel (not scalar multiples of each other) — is ALL of $\mathbb R^2$ (by the same reasoning as A01's example): infinitely many vectors. "What is span(S)?" is never correctly answered by re-listing S's two vectors; it requires describing the entire reachable set (here, "all of ℝ²").

**Contrast 2 — Solving the system vs. guessing membership (MC-2):**

Is $w=(7,5)$ in span$(\{(1,2),(3,1)\})$? **Inspection-only approach** (unreliable): "7 and 5 don't obviously relate to 1,2,3,1 by eye, so maybe not?" — no actual justification. **Correct approach — solve the system:** need $c_1(1,2)+c_2(3,1)=(7,5)$, i.e. $c_1+3c_2=7$ and $2c_1+c_2=5$. From the second equation, $c_2=5-2c_1$; substitute: $c_1+3(5-2c_1)=7 \Rightarrow c_1+15-6c_1=7 \Rightarrow -5c_1=-8 \Rightarrow c_1=8/5$; then $c_2=5-16/5=9/5$. **Check:** $(8/5)(1,2)+(9/5)(3,1) = (8/5+27/5, 16/5+9/5) = (35/5,25/5)=(7,5)$ ✓. **Yes, $w$ IS in span(S)**, confirmed by an actual solved (and verified) system — no amount of eyeballing would have reliably produced this answer.

**Contrast 3 — A redundant vector changes nothing; a genuinely new direction does (MC-3):**

Start with $S_1=\{(1,0),(0,1)\}$, span$(S_1)=\mathbb R^2$ (from A01). Add the vector $(2,3)$, forming $S_2=\{(1,0),(0,1),(2,3)\}$: since $(2,3)=2(1,0)+3(0,1)$ is ALREADY a combination of the first two vectors, **span($S_2$) = span($S_1$) = $\mathbb R^2$ — completely UNCHANGED**, despite adding a third vector to the generating set. Contrast: start instead with $S_3=\{(1,0)\}$ (span = the x-axis line only) and add $(0,1)$: since $(0,1)$ is NOT a multiple of $(1,0)$ (not reachable from the existing generator), span grows genuinely, from a line to all of $\mathbb R^2$. **Whether a new vector enlarges the span depends entirely on whether it was ALREADY reachable from the existing generators — redundant additions change nothing; genuinely new directions change everything.**

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Let $S=\{(1,1),(2,2)\}$. (a) Are these two vectors parallel (scalar multiples of each other)? (b) Based on (a), describe span(S) — is it a line or all of ℝ²? (c) Is $(5,5)$ in span(S)? Is $(5,3)$?

**CORRECT:** (a) Yes — $(2,2)=2(1,1)$, so they're parallel (the second is redundant, already a multiple of the first). (b) Since the second vector adds no new direction, span(S) = span$(\{(1,1)\})$ = the LINE $y=x$ (all multiples of $(1,1)$), NOT all of ℝ². (c) $(5,5)=5(1,1)$ ✓ IS in span(S) (on the line $y=x$). $(5,3)$: would need $(c,c)=(5,3)$ for a single c from EITHER generator (since both are multiples of $(1,1)$) — impossible since $5\ne3$ — **NOT in span(S)**.
→ "Correct — this example directly tests whether the redundancy insight from Contrast 3 changes what you'd naively expect (two vectors 'should' span the whole plane, but here they don't, since they're parallel)." → Proceed to A03.

**PARTIAL:** Student gets (a) and (c) but in (b) assumes "two vectors always span all of ℝ²" without checking parallelism first (MC-3-adjacent).
→ "Two vectors span all of ℝ² ONLY if they point in genuinely different directions (are not scalar multiples of each other) — check this FIRST, always. Here $(2,2)=2(1,1)$ means the second vector is redundant (already reachable from the first), so despite having 'two vectors' listed, the actual reachable set is still just the one-dimensional line through $(1,1)$, not the full plane."

**INCORRECT:** Student answers (c) "(5,3) is in span(S) since 5 and 3 are both reasonably close to being multiples of 1 and 1" (a vague inspection-based judgment, MC-2).
→ "Solve explicitly, don't estimate: need $(c,c)=(5,3)$ for some single scalar c (since both generators are multiples of (1,1)). The first coordinate demands $c=5$; the second demands $c=3$ — these are DIFFERENT required values for the same c, an outright contradiction, so no valid c exists. (5,3) is definitively NOT in span(S) — 'reasonably close' is not a valid membership test; only an exact, consistent solve settles it."

**NO_RESPONSE:** → "(a) Yes, (2,2)=2(1,1), parallel. (b) span(S) is just the line y=x (the second vector adds nothing new). (c) (5,5)=5(1,1) is in span(S); (5,3) would need c=5 and c=3 simultaneously — impossible — so it's not in span(S)."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess span-as-a-set understanding, systematic membership checking, and redundancy-vs-genuine-growth discrimination under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Let $S=\{(1,0,0),(0,1,0)\}$ in $\mathbb R^3$. Describe span(S) geometrically, and state whether $(0,0,1)$ is in it.

*Solution:* span(S) = the xy-plane (all vectors of the form $(a,b,0)$). $(0,0,1)$ has a nonzero z-coordinate, which no combination $c_1(1,0,0)+c_2(0,1,0)=(c_1,c_2,0)$ can produce — NOT in span(S).

**Problem 2:** Is $w=(4,-1)$ in span$(\{(1,1),(1,-1)\})$? Solve explicitly.

*Solution:* Need $c_1(1,1)+c_2(1,-1)=(4,-1)$: $c_1+c_2=4$, $c_1-c_2=-1$. Adding: $2c_1=3, c_1=1.5$; then $c_2=2.5$. Check: $1.5(1,1)+2.5(1,-1)=(1.5+2.5,1.5-2.5)=(4,-1)$ ✓. Yes, in span(S).

**Problem 3:** $S=\{(2,4)\}$. Is $(1,2)$ redundant (already in span(S)) if added? What about $(1,3)$?

*Solution:* $(1,2)$: check if it's a multiple of $(2,4)$ — $(2,4)=2(1,2)$, so yes, $(1,2)=\frac12(2,4)$ is already in span(S); adding it is redundant, span stays the same line. $(1,3)$: is it a multiple of $(2,4)$? Would need $(2,4)=k(1,3)=(k,3k)$, giving $k=2$ from the first coordinate but $3k=6\ne4$ from the second — NOT a multiple, so $(1,3)$ is NOT in span($\{(2,4)\}$); adding it WOULD genuinely enlarge the span (to all of ℝ²).

**Problem 4:** True or false: "If S has 3 vectors, span(S) must be 'bigger' (in some sense) than if S had only 2 vectors." Justify or give a counterexample.

*Solution:* **False in general** — if the third vector is redundant (already a linear combination of the first two), span(S) with 3 vectors equals span(S) with just the first 2; the COUNT of generating vectors doesn't determine the span's size, only whether each new vector adds a genuinely new, previously-unreachable direction does.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A chemist mixes solutions using two base concentrates, represented as vectors $b_1=(2,1,0)$ and $b_2=(1,0,1)$ in $\mathbb R^3$ (three tracked chemical components).

(a) Is the target mixture $w=(5,2,1)$ achievable as SOME combination $c_1b_1+c_2b_2$ (with $c_1,c_2$ any real numbers, positive or negative — treat this as a pure linear-algebra question about span, not a physical constraint on concentrations)? Solve explicitly.
(b) The chemist then acquires a THIRD concentrate, $b_3=(4,2,0)$, and adds it to the available set. A colleague claims: "Now that we have three concentrates instead of two, we can definitely reach more target mixtures than before." Evaluate this claim precisely, using the relationship between $b_3$ and $\{b_1,b_2\}$.
(c) Suppose instead the chemist acquires $b_3'=(0,1,1)$ (a different third concentrate). Does adding THIS one enlarge the reachable set of mixtures? Justify by determining whether $b_3'$ is already in span($\{b_1,b_2\}$).

**Expected solution:**

(a) Solve $c_1(2,1,0)+c_2(1,0,1)=(5,2,1)$: component-wise, $2c_1+c_2=5$, $c_1=2$ (from the second component, since $b_1$'s second component is 1 and $b_2$'s is 0), $c_2=1$ (from the third component, since $b_1$'s third component is 0 and $b_2$'s is 1). Check the first equation: $2(2)+1=5$ ✓. So $c_1=2,c_2=1$ works: $2(2,1,0)+1(1,0,1)=(4,2,0)+(1,0,1)=(5,2,1)$ ✓. **Yes, $w$ is achievable.**

(b) The colleague's claim needs verification, not automatic acceptance: check whether $b_3=(4,2,0)$ is already in span($\{b_1,b_2\}$). Since $(4,2,0)=2(2,1,0)+0(1,0,1)=2b_1$, $b_3$ is simply TWICE $b_1$ — entirely redundant, already reachable using $b_1$ alone (with $c_2=0$). Adding $b_3$ to the set does **NOT** enlarge the reachable set of mixtures at all — the colleague's claim is **false** in this specific case, exactly the redundancy lesson from Contrast 3: having a THIRD concentrate doesn't automatically mean more mixtures are reachable, only a genuinely new (non-redundant) direction would do that.

(c) Check whether $b_3'=(0,1,1)$ is in span($\{b_1,b_2\}$): solve $c_1(2,1,0)+c_2(1,0,1)=(0,1,1)$: $2c_1+c_2=0$, $c_1=1$ (second component), $c_2=1$ (third component). Check the first equation: $2(1)+1=3\ne0$ — **inconsistent, no solution exists**. So $b_3'$ is NOT in span($\{b_1,b_2\}$) — it represents a genuinely new, previously unreachable direction. Adding $b_3'$ to the set **DOES** enlarge the reachable set of mixtures (span grows from whatever 2-dimensional set $\{b_1,b_2\}$ reaches to something strictly larger, potentially all of $\mathbb R^3$) — confirming that whether a new addition helps depends entirely on redundancy, verified here by an explicit solve exactly as in (b), not by simply counting how many concentrates are available.

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

Session record: concept math.linalg.span assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SPAN-EQUALS-GENERATING-SET (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Treating span(S) as just the set S is SPAN-EQUALS-GENERATING-SET. span(S) is the set of ALL linear combinations of S's vectors — typically vastly larger (often infinite) than S itself, which is just the small list of generators."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "S={(1,0),(0,1)}. What is span(S)?"
- MC-1 response: "span(S) = {(1,0),(0,1)}, the same two vectors."

**[P64 — CONCEPTUAL SHIFT]**
"span(S) includes EVERY combination $c_1(1,0)+c_2(0,1)=(c_1,c_2)$ for every choice of scalars — since $c_1,c_2$ can be ANY real numbers, this reaches every point in ℝ², not just the original two vectors. span(S) is the entire plane, an infinite set; S itself has exactly 2 elements. Always ask: 'every combination,' not 'the vectors themselves.'"

Practice: State how many elements S={(3,4)} has, and how many elements span(S) has (describe span(S) geometrically).

---

### Repair Action B02 — SPAN-MEMBERSHIP-BY-INSPECTION (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Judging span membership by eyeballing rather than solving is SPAN-MEMBERSHIP-BY-INSPECTION. Whether a target vector is in span(S) is settled by actually SOLVING the linear system for the combination coefficients — never by a visual guess."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is (6,4) in span({(1,2),(3,1)})? Just estimate."
- MC-2 response: gives a yes/no answer without setting up or solving the system.

**[P64 — CONCEPTUAL SHIFT]**
"Set up the system explicitly: $c_1(1,2)+c_2(3,1)=(6,4)$ gives $c_1+3c_2=6$ and $2c_1+c_2=4$. Solve: from the second, $c_2=4-2c_1$; substitute: $c_1+3(4-2c_1)=6 \Rightarrow c_1+12-6c_1=6 \Rightarrow -5c_1=-6 \Rightarrow c_1=6/5$, then $c_2=4-12/5=8/5$. Verify: $(6/5)(1,2)+(8/5)(3,1)=(6/5+24/5,12/5+8/5)=(30/5,20/5)=(6,4)$ ✓ — yes, in span(S), CONFIRMED by an actual solved system, not a guess. This solve-and-verify procedure is the only reliable method; some cases that 'look unlikely' are actually in the span, and vice versa."

Practice: Determine whether (10,1) is in span({(2,1),(1,3)}) by setting up and solving the system explicitly.

---

### Repair Action B03 — EVERY-NEW-VECTOR-ENLARGES-SPAN (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming any added vector enlarges the span is EVERY-NEW-VECTOR-ENLARGES-SPAN. A vector that is ALREADY a linear combination of the existing generators is redundant — adding it changes span(S) not at all; only a genuinely new (not-already-reachable) direction enlarges it."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "S={(1,0),(0,1)} spans ℝ². Adding (3,4) to S — does the span get bigger?"
- MC-3 response: "Yes, since we now have three vectors instead of two."

**[P64 — CONCEPTUAL SHIFT]**
"Check whether (3,4) was ALREADY reachable: $(3,4)=3(1,0)+4(0,1)$ — yes, it's already a combination of the existing two vectors. Adding an already-reachable vector to the generating set changes NOTHING about what's reachable — span stays exactly ℝ², unchanged. (In this specific case span was already the whole plane, so nothing COULD enlarge it further regardless — but the general principle holds even when span isn't already everything: check redundancy via an explicit solve, never assume vector count alone determines span size.)"

Practice: Starting from S={(1,0)} (span = x-axis only), determine whether adding (2,0) enlarges the span, and separately whether adding (0,5) enlarges the span — solve each redundancy check explicitly.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Restate the formal span definition from memory and describe span(S) geometrically for a fresh single-vector and two-vector set |
| SR-2 | +3 days | Solve a fresh linear system to determine span membership, without shortcutting to inspection |
| SR-3 | +7 days | Determine whether a new vector added to a spanning set is redundant or genuinely enlarges the span, via an explicit solve |
| SR-4 | +14 days | Reconstruct the chemistry transfer probe's redundancy-vs-genuine-growth argument for a fresh third concentrate |

Retrieval flag: if student conflates span(S) with S itself (MC-1) or judges membership by inspection alone (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.linalg.subspace | span(S) is DEFINED as the smallest subspace containing S; the subspace test (0, closure under +, closure under scalar ×) is exactly what confirms span(S) qualifies as a subspace at all |
| Unlocks | math.linalg.basis | A basis is a spanning set that is also linearly independent (no redundant vectors) — this concept's redundancy notion (MC-3) is precisely what a basis is required to avoid |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the redundancy/genuine-growth distinction to a chemistry-mixture scenario, a genuinely new applied context rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=3 → compact structure (2 main TAs + gate), matching other h=3, proficient/understand Tier-2 concepts
- bloom=understand → V-4 = N/A (no P07 required; set-description and verification tasks, not derivations)
- CPA_entry = C for a proficient learner: explicit numeric linear combinations (A01) anchor "span = every combination" in concrete arithmetic before the abstract definition risks being read as merely re-describing the generating set

**Key teaching insight:** MC-1 is this concept's highest-leverage misconception because it is a basic category error (confusing a small list with everything it generates) that, left uncorrected, makes every subsequent question in this concept unanswerable in principle — a student who thinks span(S) IS S has no way to even FORMULATE a membership question correctly, since they'd be checking against the wrong (finite) set entirely. A01's explicit "every point in the plane is reachable" demonstration is chosen specifically to make the SIZE gap between S and span(S) vivid before any abstract notation is introduced.

**MC-2 and MC-3 as two applications of the same underlying discipline:** Both misconceptions are cured by the identical habit — set up and SOLVE the relevant linear system explicitly, rather than relying on visual pattern-matching (MC-2, for membership) or vector-counting (MC-3, for redundancy, which is itself a membership question: "is the new vector already in the span of the old ones?"). A02's Contrasts 2 and 3 deliberately use the same solve-and-verify procedure so students see MC-3's redundancy check as a direct application of MC-2's membership-checking method, not a separate skill.

**Sequencing note:** No cross-link concept exists yet for math.linalg.span; the P76 transfer probe instead uses a chemistry-mixture scenario, chosen because "having a third concentrate" superficially suggests "more mixtures are reachable" (directly testing MC-3), and the probe requires the SAME explicit solve-and-verify technique from Contrast 2/B02 to settle whether each specific new concentrate is redundant or genuinely expands what's reachable.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.linalg.span ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.linalg.subspace ✓ | PASS |
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
| V-19 | Structure matches h | h=3 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Chemistry concentrate-mixing scenario; redundancy-vs-genuine-growth solved explicitly ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

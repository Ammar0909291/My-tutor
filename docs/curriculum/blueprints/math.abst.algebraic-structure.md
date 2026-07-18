<!-- BLUEPRINT: math.abst.algebraic-structure -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Algebraic Structure
**Concept ID:** `math.abst.algebraic-structure`
**KG Fields:** difficulty=advanced | bloom=understand | estimated_hours=2 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.abst.algebraic-structure |
| name | Algebraic Structure |
| difficulty | advanced |
| bloom | understand |
| estimated_hours | 2 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.found.axiom, math.found.set-theory |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.found.axiom**: a statement accepted as a starting rule, not proved from anything more basic — algebraic structures are DEFINED by which axioms their operation(s) satisfy
- **math.found.set-theory**: sets and their elements — an algebraic structure is a set PLUS operation(s), never the set alone

### Target Knowledge State
Student can recognize that an algebraic structure is a SET together with one or more OPERATIONS satisfying specified axioms — not the set alone; correctly recognize that the SAME underlying set can carry MULTIPLE different algebraic structures depending on which operation is paired with it (e.g. $(\mathbb Z,+)$ and $(\mathbb Z,\times)$ are different structures on the identical set $\mathbb Z$); and correctly verify structural axioms using only the OPERATION's behavior (abstractly), without needing to know any concrete details about what the elements "are."

### Conceptual Obstacles
1. Treating the algebraic structure as fully determined by the underlying set alone, ignoring that the CHOICE of operation is an equally essential, independent part of the structure — "the integers" is not one algebraic structure but the basis for MANY, depending on which operation accompanies them
2. Assuming a given set can only carry ONE "natural" algebraic structure — missing that the SAME set (e.g. $\mathbb Z$) simultaneously supports entirely different structures ($(\mathbb Z,+)$, $(\mathbb Z,\times)$, and others), each with its own distinct properties (e.g. $(\mathbb Z,+)$ has inverses for every element; $(\mathbb Z,\times)$ does not)
3. Believing you must know the concrete "nature" of the elements (numbers, matrices, functions, symbols) to verify an axiom — algebraic axioms are stated purely in terms of how the OPERATION behaves (closure, associativity, identity, inverses), and can be checked without any reference to what the elements intrinsically "are"

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | STRUCTURE-IS-JUST-THE-SET | Student treats "the algebraic structure" as fully determined by the underlying set, ignoring the operation's essential role | Any comparison between two different structures sharing the identical underlying set |
| MC-2 | ONE-STRUCTURE-PER-SET | Student assumes a given set has only one natural algebraic structure, missing that multiple operations yield multiple, genuinely different structures on the same set | Any set (e.g. ℤ) paired with two different operations, each satisfying different axiom sets |
| MC-3 | AXIOMS-REQUIRE-KNOWING-ELEMENT-NATURE | Student believes verifying a structural axiom requires understanding the concrete "nature" of the elements, rather than recognizing axioms are stated purely in terms of operation behavior | Any structure whose elements are abstract or unfamiliar (symbols, matrices, functions) rather than ordinary numbers |

**Foundational Misconception:** MC-1 (STRUCTURE-IS-JUST-THE-SET) — it is the conceptual root of this entire concept, since the KG's own defining insight ("the SAME set with different operations yields different structures") is precisely what this misconception denies; a student who thinks "the integers" IS an algebraic structure (rather than a raw set that many DIFFERENT structures can be built upon) cannot correctly distinguish $(\mathbb Z,+)$ from $(\mathbb Z,\times)$, directly enabling MC-2 (since distinguishing them is exactly what reveals multiple structures per set) and undermining MC-3's abstraction (since a student anchored to "the integers" as a fixed structure has no framework for verifying axioms on genuinely unfamiliar element types).

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner directly compares two different operations on the SAME set (ℤ with + vs. ℤ with ×), checking a specific axiom (inverses) that holds for one but not the other, before the general definition is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: $(\mathbb Z,+)$ vs. $(\mathbb Z,\times)$, checking the inverse axiom explicitly for both; P: a picture of one set supporting multiple structures; A: the formal definition of an algebraic structure
2. **A02 P06 CONTRAST PAIR** — the same set with two different operations, genuinely different structures (MC-1/MC-2); an abstract structure (e.g. symbol-string concatenation) with axioms verified purely from operation behavior (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — One Set, Two Structures

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Directly compare two operations on the identical set, checking a specific axiom that distinguishes them; state the formal definition of an algebraic structure

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (ℤ under + vs. ℤ under ×, checking the inverse axiom):**

**Structure 1: $(\mathbb Z,+)$.** Identity: 0 (since $n+0=n$ for all $n$). Inverses: for every $n\in\mathbb Z$, does an inverse exist (an element $m$ with $n+m=0$)? Yes — $m=-n$ always works, and $-n\in\mathbb Z$ (integers are closed under negation). **Every element has an additive inverse.**

**Structure 2: $(\mathbb Z,\times)$.** Identity: 1 (since $n\times1=n$ for all $n$). Inverses: for every $n\in\mathbb Z$, does an inverse exist (an element $m$ with $n\times m=1$)? Try $n=2$: need $m$ with $2m=1$, i.e. $m=1/2$ — **NOT an integer**. **Most elements of $(\mathbb Z,\times)$ have NO multiplicative inverse within $\mathbb Z$** (only $n=1$ and $n=-1$ do).

**The identical underlying set $\mathbb Z$ yields genuinely DIFFERENT structural behavior depending on the operation** — $(\mathbb Z,+)$ satisfies the inverse axiom universally; $(\mathbb Z,\times)$ does not. These are two different algebraic structures, not one structure viewed two ways.

**Stage P — Pictorial (one set, many possible structures):**

```
                    THE SET ℤ (just elements, no operation yet)
                   ╱                    │                    ╲
        (ℤ, +)              (ℤ, ×)              (ℤ, other operations...)
     inverses: YES         inverses: NO           (each combination is
     (every n has -n)   (only 1, -1 have them)     its OWN structure)
```

**Stage A — Abstract (formal definition):**

An **algebraic structure** is a SET $S$ together with one or more binary operations (e.g. $*:S\times S\to S$) satisfying a specified list of axioms (closure, associativity, identity, inverses, commutativity, etc. — different combinations define different NAMED structure types, e.g. group, ring, field, developed in later concepts). The structure is the PAIR (set, operation) — never the set in isolation — and abstract algebra studies these structures based purely on which axioms hold, independent of what the set's elements concretely "are."

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Consider the set $\{1,-1\}$ (just these two integers). Check whether this set, under MULTIPLICATION, satisfies the inverse axiom (every element has a multiplicative inverse within the set).

**CORRECT:** $1\times1=1$ — 1 is its own inverse. $(-1)\times(-1)=1$ — $-1$ is also its own inverse. **Every element of $\{1,-1\}$ has a multiplicative inverse within the set** — this small set, under multiplication, DOES satisfy the inverse axiom (unlike all of ℤ under multiplication, which failed this in A01).
→ "Correct — this shows the inverse axiom's success or failure depends on BOTH the specific set AND the operation together, not just the operation type (multiplication) alone." → Proceed to A02.

**PARTIAL:** Student checks $1\times1=1$ correctly but doesn't verify $(-1)\times(-1)=1$ separately, assuming the pattern from one element applies to both.
→ "Check EACH element individually — the inverse axiom requires EVERY element to have an inverse, so don't extrapolate from just one. Verify $-1$ specifically: $(-1)\times(-1)=1$ (a negative times a negative is positive), confirming $-1$ is its own inverse too. Both elements pass, independently verified."

**INCORRECT:** Student answers "no, since ℤ under multiplication failed the inverse axiom in A01, this smaller set must fail too" (incorrectly assuming the property transfers automatically from the larger set to a subset).
→ "A01's failure was specific to the FULL set ℤ (where most elements, like 2, have no integer inverse) — it does NOT automatically apply to every subset. Check THIS specific set $\{1,-1\}$ directly: $1\times1=1$ ✓ and $(-1)\times(-1)=1$ ✓ — both elements DO have inverses within this smaller set, even though the same operation (multiplication) failed the axiom for the larger set ℤ. The axiom must be re-verified for each specific (set, operation) pair."

**NO_RESPONSE:** → "1×1=1 (1 is its own inverse). (-1)×(-1)=1 (-1 is its own inverse). Every element of {1,-1} has a multiplicative inverse within the set — the axiom holds here, unlike for all of ℤ under multiplication."

---

### Teaching Action A02 — Multiple Structures, One Set; Axioms Without Knowing "What Elements Are"

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1/MC-2 by exhibiting a THIRD distinct structure on the same set ℤ; break MC-3 with an abstract structure (string concatenation) whose axioms are verified purely from operation behavior

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — A third structure on the same set ℤ (MC-1/MC-2):**

Define a new operation on ℤ: $a*b = a+b+1$ (add the two numbers, then add 1 more). Check identity: need $e$ with $a*e=a$ for all $a$, i.e. $a+e+1=a$, i.e. $e=-1$. Check: $a*(-1)=a+(-1)+1=a$ ✓ — **identity element is $-1$, NOT 0** (0 was the identity for ordinary $+$). Check inverses: need, for each $a$, some $m$ with $a*m=-1$ (the identity just found): $a+m+1=-1 \Rightarrow m=-2-a$. Since $-2-a\in\mathbb Z$ for any integer $a$, **every element has an inverse under this NEW operation too**. This is a THIRD genuinely distinct algebraic structure on the identical set ℤ (different identity element, different specific inverse formula) — beyond just $(\mathbb Z,+)$ and $(\mathbb Z,\times)$, confirming a single set can carry an UNLIMITED variety of different structures, not just one or two "natural" ones.

**Contrast 2 — An abstract structure verified purely from operation behavior (MC-3):**

Let $S$ = all finite strings of the letters 'a' and 'b' (e.g. "ab", "aab", "bba", including the empty string $\epsilon$), with the operation $*$ = concatenation (joining two strings end to end, e.g. "ab"*"ba" = "abba"). Check the axioms WITHOUT any deep "understanding" of what strings intrinsically "are" — purely from how concatenation behaves: **Closure:** joining two strings of a's and b's produces another string of a's and b's ✓. **Associativity:** $(x*y)*z$ and $x*(y*z)$ both produce the identical string formed by writing $x$, then $y$, then $z$ in order — concatenation is associative by its very definition, regardless of what the specific strings are ✓. **Identity:** the empty string $\epsilon$ satisfies $x*\epsilon=\epsilon*x=x$ for any string $x$ (adding nothing changes nothing) ✓. **Inverses:** does every string have an inverse (some string that concatenates with it to give $\epsilon$)? For a nonempty string like "ab", is there any string $y$ with "ab"*y=$\epsilon$? Concatenation only ever GROWS or preserves length — no nonempty string, joined with anything, can shrink back to the empty string. **NO inverses exist for nonempty strings** — this structure satisfies closure, associativity, and has an identity, but fails the inverse axiom. Every one of these checks was verified purely from how the OPERATION behaves, with zero need to ask "what is a string, really?" beyond its behavior under concatenation.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Define a new operation on the set $\{0,1\}$: $a\odot b = \max(a,b)$ (take the larger of the two). (a) Find the identity element. (b) Does every element have an inverse? (c) Is this the "same structure" as $(\{0,1\}, \min)$ (using minimum instead)?

**CORRECT:** (a) Need $e$ with $\max(a,e)=a$ for all $a\in\{0,1\}$: try $e=0$: $\max(0,0)=0$ ✓, $\max(1,0)=1$ ✓ — **identity is 0**. (b) Check inverses: need, for each $a$, some $m$ with $\max(a,m)=0$ (the identity). For $a=1$: need $\max(1,m)=0$ — but $\max(1,m)\ge1$ always (since 1 is one of the two arguments), NEVER equal to 0 for any choice of $m\in\{0,1\}$. **No inverse for $a=1$** — the inverse axiom fails. (c) No — different structure: $(\{0,1\},\min)$ has identity 1 (not 0) and a different inverse-failure pattern (checking: for $a=0$, need $\min(0,m)=1$, impossible since $\min(0,m)\le0$ always) — same underlying set, same TYPE of failure (one element lacks an inverse), but a genuinely different structure (different identity, different specific element that fails).
→ "Correct throughout — (c) directly tests whether 'looks similar' (both fail the inverse axiom for one element) is mistaken for 'is the same structure,' which it correctly rejects." → Proceed to A03.

**PARTIAL:** Student gets (a) and (b) but in (c) says "yes, same structure, since both have similar failure patterns" without checking the specific identity elements.
→ "Check the SPECIFIC details, not just the general shape of the failure: $(\{0,1\},\max)$ has identity 0; $(\{0,1\},\min)$ has identity 1 — these are DIFFERENT identity elements. Two structures having a superficially similar PROPERTY (both fail the inverse axiom for one element) doesn't make them the SAME structure; the specific operation, identity, and inverse behavior must all match for genuine sameness, and here they don't."

**INCORRECT:** Student answers (a) "there is no identity, since max just picks the bigger number" (MC-1-adjacent — assuming an unfamiliar operation can't have the same kind of structure as familiar ones).
→ "Test the definition directly, regardless of how unfamiliar 'max' feels compared to + or ×: does some $e$ satisfy $\max(a,e)=a$ for every $a$ in the set? Try $e=0$: $\max(0,0)=0$ and $\max(1,0)=1$ — both match, confirming 0 IS a genuine identity element for this operation. The axioms apply to ANY well-defined operation, however unfamiliar it looks, purely based on its behavior."

**NO_RESPONSE:** → "(a) Identity is 0 (max(a,0)=a for both a=0,1). (b) No inverse for a=1 (max(1,m)≥1 always, never 0). (c) No — different structure, since (\{0,1\},min) has identity 1, not 0."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess recognition of set-plus-operation as the structure, multiple-structures-per-set awareness, and abstract axiom verification under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Is $(\mathbb Q, +)$ (rational numbers under addition) the "same structure" as $(\mathbb Q,\times)$? Justify using the inverse axiom.

*Solution:* No — under +, every rational has an additive inverse (its negation, always rational). Under ×, EVERY rational EXCEPT 0 has a multiplicative inverse (its reciprocal), but 0 has none (no rational $m$ satisfies $0\times m=1$) — a genuinely different inverse-failure pattern, confirming different structures on the same set.

**Problem 2:** For the set of $2\times2$ matrices under matrix addition, find the identity element.

*Solution:* The zero matrix $\begin{pmatrix}0&0\\0&0\end{pmatrix}$ (adding it to any matrix leaves that matrix unchanged).

**Problem 3:** True or false: "Since ℤ is a specific, fixed set, it can only be given one natural algebraic structure." Correct if false.

*Solution:* False — ℤ supports many distinct structures depending on the chosen operation (e.g. $(\mathbb Z,+)$, $(\mathbb Z,\times)$, and countless custom operations like $a*b=a+b+1$), each with different axiom-satisfaction patterns.

**Problem 4:** On the set of all subsets of $\{1,2,3\}$ (the power set), define $A\cup B$ (union) as the operation. Is $\emptyset$ (empty set) the identity? Justify without needing to think deeply about "what a set really is," just how union behaves.

*Solution:* Yes — $A\cup\emptyset=A$ for any subset $A$ (unioning with nothing adds nothing), confirmed purely from the behavior of union, with no deeper reflection on set "nature" required.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** Consider the set of all $2\times2$ real matrices, $M_2(\mathbb R)$, under TWO different operations: (i) matrix addition, and (ii) matrix multiplication.

(a) Find the identity element for matrix addition, and separately for matrix multiplication (they will be different matrices).
(b) Check whether every element has an inverse under addition. Then check whether every element has an inverse under multiplication (hint: consider the zero matrix, or any matrix with determinant 0, e.g. $\begin{pmatrix}1&1\\1&1\end{pmatrix}$).
(c) A student argues: "Since we're always talking about '2×2 real matrices,' there's really only ONE algebraic structure being discussed here — 'the matrices' — regardless of which operation we happen to be using in a given problem." Evaluate this claim precisely, using your findings from (a) and (b) as direct evidence.

**Expected solution:**

(a) Additive identity: the zero matrix $\begin{pmatrix}0&0\\0&0\end{pmatrix}$ (adding it changes nothing). Multiplicative identity: $\begin{pmatrix}1&0\\0&1\end{pmatrix}$ (the identity matrix — multiplying by it changes nothing). These are DIFFERENT matrices serving as identity for the two different operations.

(b) Under addition: every matrix $A$ has an additive inverse $-A$ (negate every entry), and $A+(-A)=$ zero matrix — inverses always exist. Under multiplication: NOT every matrix has an inverse — e.g. $\begin{pmatrix}1&1\\1&1\end{pmatrix}$ has determinant $1(1)-1(1)=0$, and a matrix with determinant 0 has NO multiplicative inverse (a standard linear-algebra fact); indeed, this matrix would need some $B$ with $\begin{pmatrix}1&1\\1&1\end{pmatrix}B=\begin{pmatrix}1&0\\0&1\end{pmatrix}$, which is impossible since the given matrix maps every vector into a 1-dimensional subspace, never able to reach every possible output needed to recover the full identity matrix. So under multiplication, the inverse axiom FAILS for this (and every determinant-0) matrix.

(c) The student's claim is **wrong**, and (a)/(b) supply direct, concrete evidence: the two operations give DIFFERENT identity elements (zero matrix vs. identity matrix) and DIFFERENT inverse behavior (always exists under addition; fails for determinant-0 matrices under multiplication) — these are two demonstrably DIFFERENT algebraic structures sharing only their underlying SET ($M_2(\mathbb R)$), exactly the lesson of Contrast 1 (multiple structures per set) applied to a genuinely new, more complex example. "The matrices" names a set, not a structure; "the matrices under addition" and "the matrices under multiplication" are two separate, independently-axiom-checked structures, and treating them as interchangeable (as the student's claim implicitly does) would make it impossible to correctly state which properties (like universal invertibility) hold for which one.

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

- MASTERY ACHIEVED → unlock math.abst.group-theory and math.abst.ring-theory; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.abst.algebraic-structure assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — STRUCTURE-IS-JUST-THE-SET (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Treating the algebraic structure as fully determined by the set alone is STRUCTURE-IS-JUST-THE-SET. The structure is the SET together with an OPERATION — the operation choice is just as essential as the set itself."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Describe the algebraic structure of ℤ."
- MC-1 response: describes properties of the integers themselves (ordering, size, etc.) without mentioning any specific operation.

**[P64 — CONCEPTUAL SHIFT]**
"'ℤ' alone names only a SET — asking about ITS algebraic structure is incomplete until an operation is specified. $(\mathbb Z,+)$ has universal inverses; $(\mathbb Z,\times)$ does not (check: 2 has no integer multiplicative inverse). These are genuinely different structures despite sharing the identical set — always specify (and think about) BOTH the set AND the operation together when discussing 'the structure.'"

Practice: State the identity element and check inverse-existence for (ℤ,+) versus a new operation a*b=a-b (subtraction) on ℤ, confirming they give different results.

---

### Repair Action B02 — ONE-STRUCTURE-PER-SET (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Assuming a set has only one natural algebraic structure is ONE-STRUCTURE-PER-SET. A single set can support unlimited different structures, one for every distinct choice of qualifying operation."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Besides + and ×, could ℤ have any OTHER algebraic structures?"
- MC-2 response: "No, + and × are the only natural operations on integers."

**[P64 — CONCEPTUAL SHIFT]**
"Define a genuinely new operation directly: $a*b=a+b+1$. Check it satisfies closure (sum of integers plus 1 is still an integer), has an identity ($e=-1$, since $a+(-1)+1=a$), and has inverses (for each $a$, $m=-2-a$ works). This is a THIRD, entirely valid algebraic structure on ℤ, distinct from both $(\mathbb Z,+)$ and $(\mathbb Z,\times)$ — there is no upper limit on how many different structures a single set can support, as long as each new operation is well-defined and satisfies whichever axioms are being checked."

Practice: Define $a\star b = a\times b + 1$ on ℤ and check whether an identity element exists for this new operation.

---

### Repair Action B03 — AXIOMS-REQUIRE-KNOWING-ELEMENT-NATURE (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Believing you need to understand what elements concretely 'are' to verify axioms is AXIOMS-REQUIRE-KNOWING-ELEMENT-NATURE. Axioms are checked purely from the OPERATION's behavior — abstract elements (strings, matrices, symbols) work exactly the same way as familiar numbers, axiom-checking-wise."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Can you check the identity axiom for string concatenation without knowing 'what a string really is' philosophically?"
- MC-3 response: "No, you'd need to understand strings deeply first."

**[P64 — CONCEPTUAL SHIFT]**
"You only need to know how the OPERATION behaves, not any deeper 'nature' of the elements: does some element $e$ satisfy $x*e=e*x=x$ for every $x$? For concatenation, the empty string $\epsilon$ satisfies exactly this (joining nothing changes nothing) — verified purely by checking the operation's defining behavior, with zero need for any philosophical understanding of what a 'string' fundamentally is. The exact same style of check works for numbers, matrices, functions, or any other kind of element."

Practice: Without reflecting on 'what a function really is,' check whether the identity function (f(x)=x) acts as an identity element for FUNCTION COMPOSITION, purely by testing (f∘g)(x) and (g∘f)(x) for an arbitrary g.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Restate the definition (set + operation, not set alone) and re-derive the (ℤ,+) vs (ℤ,×) inverse-axiom contrast from memory |
| SR-2 | +3 days | Define a fresh new operation on a familiar set and check whether it satisfies the identity/inverse axioms |
| SR-3 | +7 days | Verify axioms for a fresh abstract structure (not numbers) purely from the operation's stated behavior |
| SR-4 | +14 days | Reconstruct the matrix addition-vs-multiplication transfer probe's argument for why "the matrices" names a set, not a structure |

Retrieval flag: if student describes a structure using only set properties (MC-1) or assumes a set has one fixed structure (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.found.axiom | Algebraic structures are defined precisely by WHICH axioms their operation(s) satisfy |
| Requires (Tier-1) | math.found.set-theory | An algebraic structure is a set (plus operation) — this concept's very first component |
| Unlocks | math.abst.group-theory | A group is the specific named structure type satisfying closure, associativity, identity, and inverses — the next-level specialization of this concept's general framework |
| Unlocks | math.abst.ring-theory | A ring adds a second operation with its own axioms and compatibility conditions — another specialization built on this concept's set-plus-operation(s) foundation |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the multiple-structures-per-set lesson to matrix addition vs. multiplication, a genuinely new, more complex example rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=2 → compact structure (2 main TAs + gate), matching the concept's small time allocation and tightly focused conceptual scope
- bloom=understand → V-4 = N/A (no P07 required; structural-recognition and axiom-verification tasks, not derivations)
- CPA_entry = C for an advanced learner: directly comparing $(\mathbb Z,+)$ against $(\mathbb Z,\times)$ on the SAME familiar set anchors "operation matters, not just the set" before the fully general and more abstract definition is introduced

**Key teaching insight:** MC-1 is this concept's root misconception because the KG's own defining description ("the SAME set with different operations yields different structures") is a direct denial of it — every subsequent lesson in abstract algebra (groups, rings, fields) depends on students correctly treating "structure" as inseparable from its operation(s). A01's inverse-axiom check (holding for + but not for × on the identical set ℤ) is chosen as the anchoring example specifically because it demonstrates a STRUCTURAL PROPERTY differing between two structures on one set — not merely a superficial notational difference — making the "operation matters" lesson concrete and falsifiable rather than assumed.

**MC-2 as a natural consequence, not a separate topic:** Once MC-1 is corrected (recognizing operation-dependence), MC-2 (multiple structures existing) follows almost automatically — A02's Contrast 1 exhibits a THIRD, genuinely novel operation ($a*b=a+b+1$) specifically to prevent the lesson from being limited to "there happen to be exactly two structures on ℤ" (+ and ×), instead establishing that the space of possible structures on any set is effectively unlimited.

**Sequencing note:** No cross-link concept exists yet for math.abst.algebraic-structure; the P76 transfer probe instead uses matrix addition vs. multiplication, a genuinely richer example (non-commutative multiplication, determinant-based invertibility) that stress-tests whether the "set vs. structure" distinction generalizes beyond the simpler ℤ examples used throughout the main teaching sequence.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.abst.algebraic-structure ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.found.axiom ✓, math.found.set-theory ✓ | PASS |
| V-3 | CPA entry = C for advanced difficulty | C (Concrete) ✓ | PASS |
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
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=2 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Matrix addition vs. multiplication; set-vs-structure argument at a richer scale ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |

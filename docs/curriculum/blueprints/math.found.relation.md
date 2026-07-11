# Teaching Blueprint — Relation

**PACKAGE_READY: YES**
**Framework Version:** Teaching Blueprint Specification v1.0
**KG Concept ID:** math.found.relation
**Authored:** 2026-07-11

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| KG concept ID | `math.found.relation` |
| Concept name | Relation |
| Aliases | binary relation, correspondence |
| Domain | Mathematical Foundations |
| Difficulty | developing (2) |
| Bloom level | understand |
| Bloom tier | LOT |
| CPA entry stage | C (concrete) — difficulty = developing ≤ 2 |
| Mastery threshold | 0.80 |
| Estimated hours | 6 |
| Session TA cap | 7 (estimated_hours ≥ 1 h) |
| Prerequisites (Tier 1) | `math.found.cartesian-product` |
| Cross-links | `math.graph.graph` |
| P76 cross-link bridge | Directed graph as a relation on a vertex set; (u,v) ∈ E ↔ edge from u to v |
| MAMR | MC-1 (FOUNDATIONAL) cleared before MC-2 and MC-3; MC-2 and MC-3 FIFO after |

---

## Component 1 — Concept Snapshot

A **relation** R from set A to set B is any **subset** of the Cartesian product A × B.

**Formal definition:**
> R ⊆ A × B
> We write a R b (or (a, b) ∈ R) to mean: a is related to b by R.

A relation from A to **A itself** (i.e., R ⊆ A × A) is called a **relation on A**.

**Key insight:** A relation imposes no uniqueness or totality constraints — any subset of A × B is a valid relation. This distinguishes relations from functions.

**Standard representations:**

| Form | Description | Example for R ⊆ {1,2,3} × {a,b}: R = {(1,a),(2,a),(2,b)} |
|---|---|---|
| Listing | Enumerate ordered pairs | {(1,a),(2,a),(2,b)} |
| Arrow diagram | Draw arrows from each first-component to second-component | 1→a; 2→a; 2→b; 3 unconnected |
| Relation matrix | M[i][j] = 1 if (aᵢ,bⱼ) ∈ R, else 0 | See TA-A02 |

**Terminology:**

| Term | Definition |
|---|---|
| Domain of R | {a ∈ A | ∃ b ∈ B: (a,b) ∈ R} — elements of A that are related to something |
| Codomain | B — the set of potential second components |
| Image / Range | {b ∈ B | ∃ a ∈ A: (a,b) ∈ R} — elements of B actually reached by R |

**Relation vs. Function:**
A function f: A → B is a relation where every a ∈ A is related to **exactly one** b ∈ B.
A general relation has no such restriction:
- An element of A may be related to zero, one, or many elements of B.
- An element of A need not appear at all.

**Downstream concepts (children of this concept):**
- Reflexive, symmetric, and transitive relations → these are special properties a relation on A may satisfy.
- Equivalence relation (reflexive + symmetric + transitive) and partial order (reflexive + antisymmetric + transitive) are built from combinations of these.

---

## Component 2 — Misconception Register

**MC-1 (FOUNDATIONAL) — A relation must assign exactly one output to each input (a relation is a function).**
- Trigger: student rejects R = {(1,a),(1,b)} because element 1 "goes to two things"
- Root cause: prior exposure to functions as "machines with one output"; generalises incorrectly to all relations
- Impact: blocks understanding of relation generality; corrupts set-up for reflexive/symmetric/transitive properties (which don't require uniqueness)
- Correction path: Protocol B-01 → contrast with explicit multi-output example
- MAMR role: FOUNDATIONAL — cleared first

**MC-2 — Every element of A must be related to something (relations must be "total").**
- Trigger: student rejects a relation that leaves some element of A unrelated
- Root cause: conflates with total functions where every input must have an output
- Correction path: Protocol B-02 → explicitly show valid relation with domain ≠ A

**MC-3 — If (a, b) ∈ R then (b, a) ∈ R must also hold (all relations are symmetric).**
- Trigger: student adds (b, a) whenever they write (a, b)
- Root cause: confuses "is related to" (directed) with everyday "knows each other" (mutual) relationships
- Correction path: Protocol B-03 → directed vs. undirected relationship examples

---

## Component 3 — Teaching Primitive Sequence

### Protocol A — Standard Teaching Sequence

**TA-A01: What Is a Relation?**

[P06 CONTRAST PAIR PROMPT — B-category opening, satisfies GR-1]

Everyday relations to motivate:
- "Alice is taller than Bob" — this pairs the person Alice with the person Bob under the relation "is taller than".
- "Course X is a prerequisite for course Y" — pairs courses under a prerequisite relation.
- "City A is connected by direct flight to city B" — pairs cities under a flight connection relation.

Mathematical formalisation:
> Given sets A = {Alice, Bob, Carol} and B = same set, the relation "is taller than" is a subset of A × A:
> R = {(Alice, Bob), (Alice, Carol)} — if Alice is tallest and Carol is taller than Bob.

Formal definition:
> **A relation R from A to B is any subset R ⊆ A × B.**
> No constraints. Not all elements of A need to appear. Elements may relate to multiple elements of B.

Examples with A = {1, 2, 3}, B = {a, b, c}:
- R₁ = {(1,a), (2,b), (3,c)} — valid relation (one-to-one, like a function)
- R₂ = {(1,a), (1,b), (2,c)} — valid relation (1 relates to two elements)
- R₃ = {} = ∅ — valid (the empty relation; no pairs)
- R₄ = A × B — valid (the complete relation; every pair is included)

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "Is R = {(1,a),(1,b),(2,a)} a valid relation from {1,2,3} to {a,b,c}? Why?"
- **CORRECT** (Yes — any subset of A×B is valid; 1 relating to both a and b is allowed) → TA-A02
- **PARTIAL** (says valid but unsure about element 1 relating to two things) → clarify: no uniqueness required → TA-A02
- **INCORRECT** (rejects because 1 has two targets) → Protocol B-01 (MC-1)
- **NO_RESPONSE** → "Is R a subset of {1,2,3}×{a,b,c}? Check: are all pairs in R valid members of A×B?"

---

**TA-A02: Representing Relations — Three Equivalent Forms**

[P11 REPRESENTATION SHIFT — B-category, satisfies GR-1]

Use R = {(1,a),(2,a),(2,b)} with A = {1,2,3}, B = {a,b}.

**Form 1: Set of ordered pairs**
R = {(1,a), (2,a), (2,b)}

**Form 2: Arrow diagram**
```
A          B
1 -------→ a
2 ------→→ a
           b ← (from 2)
3          (unconnected)
```
Draw one arrow for each ordered pair in R. Notice: element 3 has no arrow (not in domain of R). Element 2 has two arrows. Element b is reachable from 2 only.

**Form 3: Relation matrix (Boolean matrix)**
Rows = A-elements, columns = B-elements. Entry M[i][j] = 1 if (aᵢ,bⱼ) ∈ R, else 0.

|   | a | b |
|---|---|---|
| 1 | 1 | 0 |
| 2 | 1 | 1 |
| 3 | 0 | 0 |

Converting between forms:
- Listing → arrow diagram: draw one arrow per pair.
- Listing → matrix: fill in 1s at the corresponding row-column positions.
- Matrix → listing: extract all (row, column) pairs where the entry is 1.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "Build the relation matrix for S = {(2,b),(3,a),(3,c)} with A = {1,2,3}, B = {a,b,c}."
- **CORRECT** (matrix with 1s at (2,b), (3,a), (3,c); zeros elsewhere) → TA-A03
- **PARTIAL** (wrong row/column alignment) → re-read the matrix construction rule → TA-A03
- **INCORRECT** (doesn't understand matrix form) → re-do Form 3 example with a different pair set
- **NO_RESPONSE** → "The matrix has 3 rows (for 1, 2, 3) and 3 columns (for a, b, c). Fill in 1 wherever you see a pair in S."

---

**TA-A03: Domain, Codomain, and Image**

[P04 PATTERN INDUCTION — B-category, satisfies GR-1]

Definitions from a concrete example:
A = {1, 2, 3, 4}, B = {a, b, c, d}
R = {(1,a), (1,b), (3,c)}

Identify:
- **Codomain:** B = {a, b, c, d} — the full target set
- **Domain of R:** elements of A that appear as first components = {1, 3} (not 2 or 4)
- **Image / Range of R:** elements of B that appear as second components = {a, b, c} (not d)

Observe:
- Domain ⊆ A (can be a proper subset)
- Image ⊆ Codomain = B (can be a proper subset)
- An element of B may have zero, one, or more elements related to it from A

Compute for each of three relations (A = {p,q,r}, B = {1,2,3}):
- R₁ = {(p,1),(q,2),(r,3)}: Domain={p,q,r}=A; Image={1,2,3}=B
- R₂ = {(p,1),(p,2)}: Domain={p}; Image={1,2}
- R₃ = ∅: Domain=∅; Image=∅

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "R = {(a,1),(a,3),(c,1)} with A={a,b,c}, B={1,2,3}. Give: (i) Domain of R  (ii) Image of R  (iii) One element of B not in the Image."
- **CORRECT** (i:{a,c}, ii:{1,3}, iii:2) → TA-A04
- **PARTIAL** (one or two wrong) → address the specific error; distinguish domain from codomain if needed
- **INCORRECT** → re-work definition with arrows: domain = "tails of arrows"; image = "heads of arrows"
- **NO_RESPONSE** → "Mark each first element in R. Those form the domain. Mark each second element. Those form the image."

---

**TA-A04: Relation vs. Function — The Uniqueness Distinction**

[P07 WORKED EXAMPLE PAIR — B-category, satisfies GR-1]

**Relations and functions both live in A × B.** The difference is one constraint.

Consider A = {1, 2, 3}, B = {a, b, c}:

| Relation | Valid relation? | Valid function? | Why |
|---|---|---|---|
| {(1,a),(2,b),(3,c)} | YES | YES | Every element of A has exactly one image |
| {(1,a),(1,b),(2,c)} | YES | NO | 1 maps to both a and b — violates uniqueness |
| {(1,a),(2,b)} | YES | NO | 3 has no image — violates totality |
| ∅ | YES | NO | No element of A has any image |

**Rule:**
> A **function** f: A → B is a relation R ⊆ A × B such that:
> 1. **Totality:** every a ∈ A appears as a first component (domain of R = A)
> 2. **Uniqueness:** each a ∈ A appears as first component in exactly one pair

A relation satisfies neither constraint by default. A function is a **special kind of relation** that satisfies both.

**Mnemonic:** A function is a relation with "exactly-one" discipline. Relaxing that discipline gives a general relation.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "Classify each as relation-only or also-a-function: (a) R={( 1,a),(2,a),(3,a)}  (b) R={(1,a),(1,b)}  (c) R={(1,a),(2,b)}"
- **CORRECT** (a: also-a-function; b: relation-only — 1 has two images; c: relation-only — 3 is unrelated) → TA-A05
- **PARTIAL** (one wrong) → apply totality + uniqueness checks explicitly to that case
- **INCORRECT** (classifies multi-output as function) → Protocol B-01 (MC-1)
- **NO_RESPONSE** → "For each pair, check two things: Is every element of A present as first component? Does any element appear twice as first component?"

---

**TA-A05: Relations on a Single Set**

[P01 KNOWLEDGE ACTIVATION — B-category, satisfies GR-1]

Activate: "Can we form a relation from A back to A itself? What everyday relationships do that?"

Concrete examples:
- A = {students in a class}; R = "has worked with" — a relation on A (R ⊆ A × A)
- A = ℤ (integers); R = "is less than" (< ) — {(a,b) | a < b}, a relation on ℤ
- A = {1,2,3,4}; R = "divides" — {(1,1),(1,2),(1,3),(1,4),(2,2),(2,4),(3,3),(4,4)}

**Relation matrix for a relation on A:** the matrix is square (|A| × |A|). The diagonal corresponds to elements related to themselves.

For "divides" on A = {1,2,3,4}:

|   | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 1 | 1 | 1 | 1 | 1 |
| 2 | 0 | 1 | 0 | 1 |
| 3 | 0 | 0 | 1 | 0 |
| 4 | 0 | 0 | 0 | 1 |

Observation: M[i][i] = 1 for all i (every number divides itself) — this is the **reflexive** property. Other structural properties (symmetric, transitive, antisymmetric) will be studied in the child concepts.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "R = 'has the same remainder when divided by 3' on A = {0,1,2,3,4,5}. Is (4,1) ∈ R? Is (2,5) ∈ R?"
- **CORRECT** (4÷3 remainder 1; 1÷3 remainder 1 → (4,1) ∈ R; 2÷3 remainder 2; 5÷3 remainder 2 → (2,5) ∈ R; both YES) → TA-A06
- **PARTIAL** (one wrong) → compute the remainder step by step
- **INCORRECT** → revisit modular arithmetic concept briefly
- **NO_RESPONSE** → "Divide 4 by 3. What is the remainder? Now divide 1 by 3. Same remainder? Then (4,1) is in R."

---

**TA-A06: Mastery Gate** *(terminal TA — satisfies GR-3, GR-6)*

[P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78]

---

[P77 MULTI-PROBLEM SET — non-transfer domain]

Five problems on relations:

**Q1.** A = {1,2}, B = {a,b,c}. How many distinct relations from A to B exist (including ∅ and A×B)?

**Q2.** R = {(1,2),(2,3),(1,3)} on A = {1,2,3}. Build the relation matrix.

**Q3.** For the relation R in Q2: (a) What is the domain? (b) What is the image?

**Q4.** Is R in Q2 a function from A to A? Explain.

**Q5.** True or false: every function from A to B is also a relation from A to B.

*Answers:*
Q1: |A×B| = 6, so 2⁶ = 64 distinct subsets = 64 distinct relations
Q2: Matrix 3×3; 1s at (1,2),(2,3),(1,3); all other entries 0
Q3: (a) Domain = {1,2}; (b) Image = {2,3}
Q4: No — element 3 has no image (violates totality); also 1 relates to both 2 and 3 (violates uniqueness)
Q5: True — a function is a relation satisfying totality and uniqueness; every function is a relation

---

[P55 SCORE — record Q1–Q5: _/5]

---

[P76 TRANSFER PROBE — cross-link to `math.graph.graph`]

*Cross-link bridge (cd = 1):*
> "A **directed graph** (digraph) consists of a set of vertices V and a set of directed edges E, where each edge is an ordered pair (u, v) meaning 'there is an arrow from vertex u to vertex v.'
>
> (a) Express the directed graph on V = {A, B, C} with edges A→B, A→C, B→C as a relation on V.
>
> (b) The adjacency matrix of a directed graph has entry M[u][v] = 1 if there is an edge from u to v. How does this compare to the relation matrix you learned in this blueprint?
>
> (c) If R is a relation on V, can every relation on V be represented as a directed graph?"

*Answers:*
(a) R = {(A,B),(A,C),(B,C)} ⊆ V×V — a relation on V
(b) They are the same object — the adjacency matrix of a directed graph IS the relation matrix
(c) Yes — every relation R ⊆ V×V defines a directed graph with vertex set V and edge set E = R

---

[P55 SCORE — record transfer probe: _/3 (1 pt per part)]

---

[P75 MASTERY ASSESSMENT]

Total: __/8 (Q1–Q5 = 5 pts; transfer probe = 3 pts)

Mastery threshold: 0.80 → pass mark = ⌈0.80 × 8⌉ = 7/8

---

[P74 ROUTING DECISION]

- **8/8 or 7/8** → MASTERED → exit TA-A06 → spaced revision schedule activated
- **6/8** → PARTIAL — identify weakest area:
  - Q1 wrong (counting relations) → reteach: relations = subsets of A×B = 2^|A×B| choices
  - Q2 wrong (matrix) → reteach TA-A02 matrix construction
  - Q3 wrong (domain/image) → Protocol B targeting TA-A03 gap
  - Q4 wrong (relation vs. function) → Protocol B-01 or review TA-A04
  - Q5 wrong → Protocol B-01 (MC-1: thinks function ≠ relation)
  - Transfer probe wrong → cross-link concept is weak; supplementary digraph example
- **≤5/8** → Protocol C-01 then re-attempt TA-A06

---

[P55 SCORE — record mastery state: MASTERED / PARTIAL / INCOMPLETE]

---

[P78 COMPLETION]

Record: concept `math.found.relation`, mastery state, date, score __/8.
Unlock prerequisite check for `math.found.reflexive-relation` and `math.found.transitive-relation`.
Exit TA-A06.

---

### Protocol B — Misconception Repair Chains

**B-01: Relation ≠ Function (MC-1)**

[P41 MISCONCEPTION DETECTOR]
"I want to check something. If I give you the relation R = {(1, a), (1, b)}, does that bother you? Can 1 be related to both a and b at the same time?"
[Gate: if student says yes or shows discomfort about 1 having two targets → misconception active]

[P27 MISCONCEPTION NAMING]
"The **function-overreach misconception** assumes every mathematical relation must behave like a function — one output per input. A function is a *special* kind of relation. A general relation is simply any subset of A×B. One element can relate to zero, one, or many elements in B."

[P64 CONCEPTUAL SHIFT]
Everyday non-functional relation: "has acted in the same film as" on a set of actors.
- Tom Hanks has acted with: Meg Ryan, Gary Sinise, Robin Wright, … — multiple targets, all valid.
- This relation is NOT a function (Tom Hanks maps to many actors), but it IS a perfectly valid relation.

Mathematical example: R = "is a factor of" on A = {1,2,3,4,6,12}:
- (1,1),(1,2),(1,3),(1,4),(1,6),(1,12) — element 1 relates to all 6 elements
- (2,2),(2,4),(2,6),(2,12) — element 2 relates to 4 elements
Not a function; perfectly valid relation.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "R = {(x,1),(x,2),(x,3),(y,1)} with A={x,y}, B={1,2,3}. Is this a valid relation? Is it a function?"
- **CORRECT** (Valid relation — YES; function — NO because x maps to three values) → repair complete → return to suspended TA
- **INCORRECT** → restate: "A relation only requires R ⊆ A×B. Is R a subset of A×B here?"

---

**B-02: Totality Not Required (MC-2)**

[P41 MISCONCEPTION DETECTOR]
"Can a relation leave some elements of A with no target in B? Or must every element of A be 'used'?"

[P27 MISCONCEPTION NAMING]
"The **totality misconception** assumes all relations are total — every element of A must relate to at least one element of B. Relations have no such requirement. Only functions and total relations impose totality; a general relation may have a domain that is a proper subset of A."

[P64 CONCEPTUAL SHIFT]
Example: A = {undergraduate students}, B = {published papers}; R = "has authored":
- Most undergraduates haven't authored papers — they simply don't appear in the domain of R.
- This is a perfectly valid relation: R ⊆ A × B, even though most of A is absent from the domain.

Mathematical: R = {(1,a)} on A = {1,2,3}, B = {a,b,c}.
- Domain of R = {1} (not all of A)
- R is a valid relation — no constraint says 2 or 3 must appear.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "R = {(2,b)} on A = {1,2,3}, B = {a,b,c}. Is this valid? What is the domain of R?"
- **CORRECT** (Valid; Domain = {2}) → repair complete → return to suspended TA
- **INCORRECT** → "Is {(2,b)} a subset of {1,2,3}×{a,b,c}? Yes. Any subset is a valid relation."

---

**B-03: Relations Are Not Necessarily Symmetric (MC-3)**

[P41 MISCONCEPTION DETECTOR]
"You wrote (b, a) into the relation after writing (a, b). Why did you add that pair?"

[P27 MISCONCEPTION NAMING]
"The **symmetry misconception** adds the reverse pair automatically because everyday 'relationships' (friendship, marriage) are often mutual. But mathematical relations need not be symmetric. 'Is less than' is directed: 2 < 5 does NOT imply 5 < 2."

[P64 CONCEPTUAL SHIFT]
Directed examples:
- "is a prerequisite for" — Math 101 is a prerequisite for Math 201 does NOT mean Math 201 is a prerequisite for Math 101.
- "is a parent of" — Alice is a parent of Bob does NOT mean Bob is a parent of Alice.
- "is less than" on ℕ — (2,5) ∈ R but (5,2) ∉ R.

Counter-example demonstrating a symmetric relation (for contrast): "has the same birthday as" — if Alice and Bob share a birthday, the relation holds both ways. But not all relations are like this.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "R = 'is a divisor of' on {1,2,4,8}. Is (2,8) ∈ R? Is (8,2) ∈ R? Explain why or why not."
- **CORRECT** ((2,8) ∈ R because 2|8; (8,2) ∉ R because 8 does not divide 2) → repair complete
- **INCORRECT** → compute: does 2 divide 8? Yes. Does 8 divide 2? 8 > 2, so no.

---

### Protocol C — Consolidation

**C-01: Mixed Relation Review**

[P17 MIXED PRACTICE SET]

Six items:

1. A = {1,2,3}, B = {a,b}. How many distinct relations from A to B exist?
2. R = {(1,a),(2,b),(3,a)} on A={1,2,3}, B={a,b}. Build arrow diagram and matrix. Give domain and image.
3. Is R in (2) a function? Justify.
4. R = "x² = y" on A = B = {-3,-2,-1,0,1,2,3}. List R. Is R a function from A to A?
5. True or false: the empty relation ∅ is a valid relation from A to B for any sets A, B.
6. A directed graph on V={1,2,3} has edges 1→2, 2→3, 1→3. Write the corresponding relation on V as a set of pairs.

*Answers:*
1: |A×B|=6, so 2⁶=64 relations
2: Matrix with 1s at row1-cola, row2-colb, row3-cola; domain={1,2,3}=A; image={a,b}=B
3: Yes — every element of A appears exactly once as first component; unique target → function
4: R={(−3,9),(−2,4),(−1,1),(0,0),(1,1),(2,4),(3,9)}; not a function on A to A since 9,4 ∉ A; but if we restrict codomain to ℕ: R is a function (unique square for each input)
5: True — ∅ ⊆ A×B for any A, B
6: R = {(1,2),(2,3),(1,3)}

[P49 ADAPTIVE CHECKPOINT]
- **5–6/6** → MASTERED → spaced revision
- **3–4/6** → identify errors → specific B chain
- **≤2/6** → restart Protocol A from TA-A01

---

### Protocol D — Acceleration

Student state S6: prior knowledge of relation as subset of A×B demonstrated at TA-A01.

Skip TA-A01 through TA-A05. Proceed directly to TA-A06. Threshold 7/8 applies.

---

### Protocol E — Spaced Revision

[P89 SPACED REPETITION] Schedule: Day 1, Day 3, Day 7, Day 21, Day 60.

Five-item revision probe:

1. Define: what is a relation from A to B? (formal definition required)
2. R = {(p,1),(q,1),(q,2)} on A={p,q,r}, B={1,2}. What is the domain of R?
3. Is R in (2) a function from A to B? Why not?
4. True or false: a directed graph on V is the same as a relation on V × V.
5. R = 'is a multiple of' on {2,3,6,12}. Is (6,3) ∈ R? Is (3,6) ∈ R?

*Answers:* 1: R ⊆ A×B, any subset | 2: {p,q} | 3: No — r has no image (violates totality); q has two images (violates uniqueness) | 4: True (digraph edge set = relation) | 5: (6,3)∈R since 6 is a multiple of 3; (3,6)∉R since 3 is not a multiple of 6

Decay: score < 5/5 → reset to Day 1 + Protocol B targeting failed item.

---

## Component 4 — Student State Routing Table

| Student state | Detected by | Routed to |
|---|---|---|
| S0 (no prior knowledge) | No engagement with subset-of-A×B before TA-A01 | Protocol A, TA-A01 |
| S1 (active misconception) | P49 INCORRECT at any TA-A01 through TA-A05 | Protocol B matching the MC triggered |
| S2 (partial mastery) | TA-A06 score 6/8; or C-01 score 3–4/6 | Protocol C-01 |
| S6 (prior mastery / acceleration) | TA-A01 P49 answered CORRECT before instruction | Protocol D (skip to TA-A06) |
| S9 (spaced revision due) | P89 interval elapsed | Protocol E |

---

## Component 5 — Session Configuration

| Parameter | Value |
|---|---|
| CPA entry stage | C (Concrete) — difficulty = developing (2) |
| Session TA cap | 7 |
| Protocol A TAs | 6 (TA-A01 through TA-A05 + mastery gate TA-A06) |
| MAMR | MC-1 (function-overreach) cleared first; MC-2 and MC-3 FIFO after |
| Repair chain entry | Always via P41 → P27 → P64 → P49 |
| Mastery gate | TA-A06 (P91 compound) |

---

## Component 6 — Transfer Probe Documentation

**Cross-link:** `math.graph.graph` (cd = 1)

| Probe | Context | Transfer target |
|---|---|---|
| TA-A06 P76 | Directed graph as a relation R ⊆ V×V; adjacency matrix = relation matrix | Recognises that directed graphs are concrete instantiations of mathematical relations on a vertex set |

**Transfer relevance for math.graph.graph:** Graph theory heavily relies on relations — a directed graph IS a relation on its vertex set. The adjacency matrix students build in TA-A02 is the same object as the adjacency matrix in graph theory. This transfer prepares students to see graph algorithms (DFS, BFS, shortest path) as operations on relation structure.

---

## Component 7 — Spaced Repetition Schedule

| Interval | Trigger | Action |
|---|---|---|
| Day 1 | Day of initial mastery | Schedule Day 3 |
| Day 3 | 2 days after mastery | Protocol E 5-item probe |
| Day 7 | 4 days after Day 3 pass | Protocol E 5-item probe |
| Day 21 | 14 days after Day 7 pass | Protocol E 5-item probe |
| Day 60 | 39 days after Day 21 pass | Protocol E 5-item probe |
| Decay reset | Any probe score < 5/5 | Reset to Day 1 + Protocol B for failed item |

---

## Component 8 — Assessment Item Bank

| # | Item | Property | Answer |
|---|---|---|---|
| A1 | Define: what is a relation from A to B? | Definition | Any subset R ⊆ A × B |
| A2 | R = {(1,a),(2,b)} on A={1,2,3}, B={a,b,c}. List domain and image. | Domain/image | Domain={1,2}; Image={a,b} |
| A3 | How many distinct relations exist from A to B if \|A\|=2, \|B\|=3? | Counting | 2^6 = 64 |
| A4 | Is {(1,a),(1,b),(2,c)} a valid relation? A function? | Relation vs. function | Valid relation; not a function (1 has two images) |
| A5 | True or false: every function is a relation. | Relationship | True |
| A6 | R = 'divides' on {1,2,3,4,6}. Is (2,6) ∈ R? Is (6,2) ∈ R? | Membership | Yes; No |
| A7 | Build the 3×3 relation matrix for R={(1,1),(1,3),(2,2),(3,1)} on {1,2,3}. | Matrix | 1s at specified positions, 0s elsewhere |
| A8 | A directed graph on V has edge set {(A,B),(B,C),(A,C)}. Write as a relation. | Transfer (graph) | R = {(A,B),(B,C),(A,C)} ⊆ V×V |
| A9 | What is the image of the empty relation ∅ from A to B? | Edge case | ∅ |
| A10 | R = {(x,y) | x,y ∈ {1,2,3,4} and x + y = 5}. List R. | Enumeration | {(1,4),(2,3),(3,2),(4,1)} |
| A11 | For R in A10: is R symmetric? (Does (a,b)∈R always imply (b,a)∈R?) | Property test | Yes — if x+y=5 then y+x=5 |
| A12 | R = {(n,m) | n,m ∈ ℕ, n < m}. Is this a valid relation on ℕ? Is it a function? | Infinite relation | Valid relation; not a function (each n relates to infinitely many m) |

---

## Component 9 — Teaching Notes

- **Critical prerequisite check:** `math.found.cartesian-product` must be mastered before this blueprint — all definitions here build on ordered pairs and A×B.
- **Counting relations (Q1 / A3):** |A×B| = |A|·|B|; any subset of A×B is a relation; so there are 2^(|A|·|B|) relations. This combinatorial fact sometimes surprises students; it is worth dwelling on briefly in TA-A01.
- **Downstream cascade:** The five child concepts (reflexive, symmetric, transitive, equivalence, partial order) each add one or more structural properties to the general relation defined here. This blueprint must establish clearly that the general relation has NONE of these properties by default.
- **Graph theory cross-link (TA-A06):** Students who later study graph theory benefit greatly from having this connection made early. The adjacency matrix introduced in TA-A02 is identical to the graph adjacency matrix; this should be stated explicitly to reduce later cognitive load.

---

## Component 10 — Validation Checklist

### V-Checks

| ID | Check | Status |
|---|---|---|
| V-1 | KG concept ID `math.found.relation` verified; no duplicate blueprint | PASS |
| V-2 | Difficulty (developing) and Bloom (understand) match KG | PASS |
| V-3 | Mastery threshold (0.80) matches KG | PASS |
| V-4 | Estimated hours (6) matches KG | PASS |
| V-5 | CPA entry stage C derived correctly (difficulty = developing = 2 ≤ 2) | PASS |
| V-6 | Session TA cap 7 derived correctly (estimated_hours = 6 ≥ 1 h) | PASS |
| V-7 | MAMR stated: MC-1 FOUNDATIONAL cleared first; MC-2 and MC-3 FIFO | PASS |
| V-8 | Every non-repair TA opens with B-category primitive (P06, P11, P04, P07, P01) | PASS |
| V-9 | Each TA-A01 through TA-A05 contains exactly one P49 | PASS |
| V-10 | Mastery gate TA-A06 is terminal (satisfies GR-3) | PASS |
| V-11 | Repair chains B-01, B-02, B-03 entered via P41→P27→P64→P49 (satisfies GR-4) | PASS |
| V-12 | P91 compound is terminal in TA-A06 (satisfies GR-6) | PASS |
| V-13 | P76 transfer probe in TA-A06 P91 sequence (satisfies GR-7) | PASS |
| V-14 | Cross-link `math.graph.graph` documented in Component 0 and Component 6 | PASS |
| V-15 | MAMR routing enforced in P74: B-01 (MC-1) triggered first | PASS |
| V-16 | Assessment item bank contains 12 items (≥ 10 required) | PASS |
| V-17 | All three repair chains (B-01, B-02, B-03) fully documented with P41→P27→P64→P49 | PASS |
| V-18 | P76 probe uses valid cross-link context (directed graph ↔ relation on V) | PASS |
| V-19 | Cross-link field non-empty; P76 bridge to math.graph.graph documented | PASS |
| V-20 | All five student state routes documented: S0→A, S1→B, S2→C, S6→D, S9→E | PASS |

### AIR Test

| ID | Check | Status |
|---|---|---|
| AIR-1 | All content slots finite and pre-specified | PASS |
| AIR-2 | All P49 response taxonomies pre-authored (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) | PASS |
| AIR-3 | All branching decisions deterministic | PASS |
| AIR-4 | All primitives are concept-independent | PASS |
| AIR-5 | TA sequences fixed at authoring time | PASS |

**PACKAGE_READY: YES — all 20 V-checks PASS; AIR Test PASS**

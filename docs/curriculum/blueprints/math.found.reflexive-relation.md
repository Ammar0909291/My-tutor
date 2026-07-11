# Teaching Blueprint: Reflexive Relation
**ID:** math.found.reflexive-relation
**Version:** 1.0.0
**Status:** PACKAGE_READY
**Schema:** Blueprint Specification v1.0

---

## Component 0 — Concept Identity & Authoring Metadata

| Field | Value |
|---|---|
| KG ID | math.found.reflexive-relation |
| Name | Reflexive Relation |
| Aliases | reflexivity |
| Domain | math.found |
| Difficulty | developing (2) |
| Bloom | remember |
| Mastery Threshold | 0.90 |
| Estimated Hours | 1 |
| Requires | math.found.relation |
| Unlocks | math.found.equivalence-relation |
| Cross-links | (none) |
| P76 Independence | YES — cross_links=[], all transfer probes use self-contained real-world contexts |
| Blueprint Version | 1.0.0 |
| Authored | 2026-07-11 |

---

## Component 1 — Learning Objectives

On completion of all Protocol A Teaching Actions, a student will be able to:

1. **State** the definition of a reflexive relation on a set A.
2. **Identify** whether a given relation is reflexive by checking all required self-pairs.
3. **Recognize** the diagonal-all-ones signature of reflexivity in a relation matrix.
4. **Distinguish** reflexive from non-reflexive relations in standard mathematical and everyday contexts.

---

## Component 2 — Prerequisite Map

| Prerequisite KG ID | Name | Role |
|---|---|---|
| math.found.relation | Relation | Reflexive relation is a property of a relation R ⊆ A×A — must know what a relation is and how to read a relation matrix |

**Assumed entering knowledge:** Student can determine whether a pair (a,b) belongs to a relation R ⊆ A×A. Student can read a relation matrix entry M[i][j].

---

## Component 3 — Misconception Registry

### MC-1 (FOUNDATIONAL): Existential vs. Universal Error
**Label:** PARTIAL-DIAGONAL
**Statement:** A student checks that *some* element a has (a,a) ∈ R and concludes the relation is reflexive, ignoring that *every* element of A must have its self-pair.
**Trigger:** Asked "Is R = {(1,1),(2,3)} on {1,2,3} reflexive?" → answers YES because (1,1) is present.
**Root cause:** Conflating "there exists a with (a,a) ∈ R" (existential) with "for all a, (a,a) ∈ R" (universal).
**Repair chain:** B-01 — universal quantifier contrast drill.

### MC-2: Reflexive Implies Symmetric
**Label:** REFLEX-SYMM-CONFLATION
**Statement:** Student believes a reflexive relation must also be symmetric ("if everything relates to itself, then pairs must go both ways").
**Trigger:** Given R = {(1,1),(2,2),(3,3),(1,2)} → claims "not reflexive because (2,1) is missing."
**Root cause:** Overgeneralizing reflexivity to include symmetry constraints.
**Repair chain:** B-02 — independence contrast.

### MC-3: Diagonal Partial Check
**Label:** DIAGONAL-INCOMPLETE
**Statement:** Student reads the relation matrix and declares reflexivity if *some* diagonal entries are 1, without checking all n diagonal entries.
**Trigger:** Matrix with M[1][1]=1, M[2][2]=0, M[3][3]=1 → says "diagonal has 1s so it's reflexive."
**Root cause:** Lacks systematic ALL-check procedure for matrix reading.
**Repair chain:** B-03 — systematic diagonal scan.

**MAMR Protocol:** MC-1 is FOUNDATIONAL; MC-2 and MC-3 are secondary. If MC-1 is active, clear it first before addressing MC-2 or MC-3. Secondary MCs cleared FIFO.

---

## Component 4 — Teaching Action Sequence (Protocol A)

**CPA Entry Stage:** C (difficulty=2, domain=math.found)
**Session TA Cap:** 5 (estimated_hours=1 → 0.5–1h range)
**Protocol A TA Count:** 4

---

### TA-A01: Definition and Intuition
**Primitives:** P03 ANALOGY BRIDGE → P04 PATTERN INDUCTION → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P03 — ANALOGY BRIDGE**

> "Every person knows their own name. In that sense, every person 'relates to' themselves through the 'knows the name of' relation. Reflexivity captures exactly this idea in mathematics: every element of the set must relate to itself."

Formal definition:

> **Reflexive Relation:** A relation R on a set A is *reflexive* if for every element a ∈ A, the pair (a, a) ∈ R.
>
> In symbols: R is reflexive ⟺ ∀a ∈ A, (a, a) ∈ R.

Canonical examples:

| Relation | Set | Reflexive? | Reason |
|---|---|---|---|
| ≤ | ℤ | YES | n ≤ n for all integers n |
| ≥ | ℤ | YES | n ≥ n for all integers n |
| = | A | YES | a = a for any element a |
| ⊆ | 𝒫(A) | YES | every set is a subset of itself |
| "divides" | ℕ | YES | n divides n for all n ∈ ℕ |
| < | ℤ | NO | n < n is false for every integer n |
| "is parent of" | people | NO | no one is their own parent |

Matrix signature:
> A relation R on {1, 2, …, n} is reflexive if and only if **every diagonal entry M[i][i] = 1**.

**P04 — PATTERN INDUCTION**

Present three matrices on {1,2,3}:

Matrix X:
```
  1 2 3
1[1 0 1]
2[0 1 0]
3[1 0 1]
```
All diagonal entries = 1 → **REFLEXIVE**

Matrix Y:
```
  1 2 3
1[1 1 0]
2[0 0 1]
3[0 0 1]
```
M[2][2] = 0 → **NOT REFLEXIVE** (element 2 has no self-pair)

Matrix Z:
```
  1 2 3
1[0 0 0]
2[0 0 0]
3[0 0 0]
```
M[1][1] = 0 → **NOT REFLEXIVE** (empty relation on non-empty set is never reflexive)

Pattern: "Count the 1s on the main diagonal. Reflexive ⟺ all n diagonal entries equal 1."

**P49 — ADAPTIVE CHECKPOINT**

> Q: "The relation R on {a, b, c} is given as R = {(a,a), (b,b), (c,c), (a,b)}. Is R reflexive?"

- **CORRECT** → "Yes. Every element has its self-pair — (a,a), (b,b), (c,c) — so all three required self-pairs are present. The pair (a,b) is allowed but irrelevant to reflexivity. Proceed to TA-A02."
- **PARTIAL** → "You identified some diagonal pairs. Reflexivity requires checking ALL elements. List every element of {a,b,c} and confirm each has a self-pair in R before concluding."
- **INCORRECT** → "Reflexivity only asks: does every element relate to itself? Check: is (a,a) in R? Is (b,b) in R? Is (c,c) in R? Answer all three, then state your conclusion."
- **NO_RESPONSE** → "Look at the definition: 'for every a ∈ A, (a,a) ∈ R'. The set A = {a,b,c}. Does each element appear paired with itself in R?"

---

### TA-A02: Worked Examples — Checking Reflexivity
**Primitives:** P27 MISCONCEPTION NAMING (MC-1) → P07 WORKED EXAMPLE PAIR → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P27 — MISCONCEPTION NAMING**

> "A common mistake called PARTIAL-DIAGONAL: finding *one* self-pair like (1,1) and concluding the relation is reflexive. Reflexivity is a **universal** property — every single element of A needs its own self-pair. Finding one is not enough."

**P07 — WORKED EXAMPLE PAIR**

**Example A (Reflexive):** R = {(1,1),(1,2),(2,2),(3,3),(3,1)} on A = {1,2,3}.
- Step 1: List all elements of A: 1, 2, 3.
- Step 2: Check self-pairs systematically.
  - (1,1) ∈ R? YES ✓
  - (2,2) ∈ R? YES ✓
  - (3,3) ∈ R? YES ✓
- Step 3: All 3 elements have self-pairs → R is **reflexive**.
- Note: The extra pairs (1,2) and (3,1) do not affect reflexivity — they are irrelevant to the diagonal check.

**Example B (Not Reflexive):** R = {(1,1),(1,2),(2,3),(3,3)} on A = {1,2,3}.
- Step 1: List all elements: 1, 2, 3.
- Step 2: Check self-pairs.
  - (1,1) ∈ R? YES ✓
  - (2,2) ∈ R? NO ✗ ← FAILS HERE
  - (3,3) ∈ R? YES ✓
- Step 3: Element 2 has no self-pair → R is **not reflexive**.
- Conclusion: A single missing self-pair is sufficient to disqualify the entire relation.

**Systematic procedure:**
```
REFLEXIVITY-CHECK(R, A):
  FOR EACH element a in A:
    IF (a, a) ∉ R:
      RETURN "not reflexive"  ← stop at first failure
  RETURN "reflexive"
```

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Let A = {1,2,3} and R = {(2,1),(1,1),(3,3),(2,2),(1,3)}. Is R reflexive?"

- **CORRECT** → "Correct. (1,1), (2,2), (3,3) are all present. The pairs (2,1) and (1,3) are irrelevant to reflexivity. Proceed to TA-A03."
- **PARTIAL** → "You are on the right track. Complete the systematic check: verify (1,1), (2,2), and (3,3) individually before stating your conclusion."
- **INCORRECT** → "Apply the systematic procedure. FOR EACH element in {1,2,3}: is (1,1) in R? Is (2,2) in R? Is (3,3) in R? All three must be confirmed."
- **NO_RESPONSE** → "Pick any element, say 2. Is the pair (2,2) in the list? Find it and check the other two elements the same way."

---

### TA-A03: Contrast — Reflexivity and Symmetry Are Independent
**Primitives:** P41 MISCONCEPTION DETECTOR (MC-2) → P06 CONTRAST PAIR PROMPT → P64 CONCEPTUAL SHIFT → P49 ADAPTIVE CHECKPOINT

**Delivery:**

**P41 — MISCONCEPTION DETECTOR (MC-2: Reflexive Implies Symmetric)**

> "Before we continue: if a relation is reflexive, must it also be symmetric? That is, if (a,b) ∈ R, must (b,a) ∈ R as well?"

- If student answers YES: MC-2 is active. Trigger P64 immediately.
- If student answers NO: Proceed to P06 to reinforce with concrete contrast.

**P64 — CONCEPTUAL SHIFT (if MC-2 active)**

> "Reflexivity only concerns self-pairs — pairs of the form (a,a). The pair (a,b) with a ≠ b is completely invisible to the reflexivity test. A reflexive relation can have zero off-diagonal pairs (the identity relation) or many asymmetric off-diagonal pairs — reflexivity does not care. Symmetry is a completely separate checklist involving off-diagonal pairs only."

**P06 — CONTRAST PAIR PROMPT**

**Pair A — Symmetric but NOT reflexive:**
R₁ = {(1,2),(2,1)} on {1,2,3}
- Reflexive? NO — (1,1), (2,2), (3,3) all missing.
- Symmetric? YES — every pair has its reverse.

**Pair B — Reflexive but NOT symmetric:**
R₂ = {(1,1),(2,2),(3,3),(1,2)} on {1,2,3}
- Reflexive? YES — all self-pairs present.
- Symmetric? NO — (1,2) ∈ R but (2,1) ∉ R.

Contrast statement:
> "Reflexivity is about the main diagonal. Symmetry is about off-diagonal pairs. They are completely independent. You can have reflexive-only, symmetric-only, both, or neither."

**P49 — ADAPTIVE CHECKPOINT**

> Q: "Is R = {(1,1),(2,2),(3,3),(2,1)} on {1,2,3} reflexive? Is it symmetric?"

- **CORRECT (both)** → "Perfect. Reflexive — all three diagonal pairs present. Not symmetric — (2,1) ∈ R but (1,2) ∉ R. Proceed to TA-A04."
- **PARTIAL** → "You answered one correctly. Apply each checklist independently: reflexivity = diagonal pairs only; symmetry = for every (a,b) is (b,a) also present?"
- **INCORRECT** → "Two separate checklists. Reflexivity: is (1,1) in R? (2,2)? (3,3)? All present → reflexive. Symmetry: is (2,1) in R? YES. Is (1,2) in R? NO → not symmetric."
- **NO_RESPONSE** → "Answer two separate questions. First: does every element of {1,2,3} have a self-pair? Second: for every pair in R, is its reverse also in R?"

---

### TA-A04: Mastery Gate
**Primitives:** P91 [P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78]
**Gate type:** Terminal (GR-3). Pass → mark concept mastered and exit Protocol A.

**P77 — Multi-Problem Set (Q1–Q5):**

Q1. Let A = {0,1,2} and R = {(0,0),(1,1),(2,2),(0,1),(1,0)}. Is R reflexive?
Q2. Is the relation "has the same remainder when divided by 5" on ℤ reflexive?
Q3. A relation matrix M on {1,2,3} has M[1][1]=1, M[2][2]=1, M[3][3]=0. Is R reflexive?
Q4. How many reflexive relations exist on a set A where |A| = 3?
Q5. True or False: The empty relation ∅ on A = {1,2} is reflexive.

**P55 — Score (Q1–Q5):** 1 point each = 5 points possible.

Expected answers:
- Q1: YES — (0,0),(1,1),(2,2) all present; the extra pairs do not affect reflexivity.
- Q2: YES — every integer n has the same remainder as itself when divided by 5.
- Q3: NO — M[3][3]=0, element 3 has no self-pair.
- Q4: 64 — the 3 diagonal entries must each be 1 (forced); the remaining 9−3=6 off-diagonal entries are free, giving 2⁶ = 64 reflexive relations.
- Q5: FALSE — (1,1) is missing; ∅ is not reflexive on any non-empty set.

**P76 — Transfer Probe (cross_links=[], P76 independence):**

Context: A software access-control system defines a relation where pair (u, r) means "user u is permitted to access resource r." Company policy mandates: "every user must always be able to access their own account page."

> "Express this policy as a mathematical property of the access-control relation. What must hold, and why?"

Expected: The relation must be **reflexive** — treating each user as both a user and a resource (their own account page), the pair (u, u) must be present for every user u. Universal: every single user, not just some.

**P55 — Score (P76):** 1 point for correctly identifying reflexivity and invoking the universal quantifier ("every user," not "some users").

**P75 — Mastery Assessment:**

| Score | Percentage | Assessment |
|---|---|---|
| 6/6 | 100% | Mastery confirmed at 1.00 — all checks secure. |
| 5/6 | 83.3% | Near-mastery (below 0.90 threshold). Identify missed item; targeted repair for that MC. |
| ≤4/6 | ≤66.7% | Below mastery threshold. Full Protocol B remediation required. |

**P55 — Score (overall):** Report __/6.

**P74 — Routing Decision:**
- Score 6/6 → mastery PASS → P78 COMPLETION
- Score 5/6 → identify missed question; route to targeted Protocol B chain (B-01, B-02, or B-03 based on missed item pattern)
- Score ≤4/6 → Protocol B full remediation; restart from B-01

**P55 — Score final:** Record to student memory.

**P78 — Completion:**
> "Reflexive Relation: MASTERED. You can now identify reflexive relations from set listings and relation matrices, apply the universal quantifier correctly, and distinguish reflexivity from symmetry. The diagonal-all-ones pattern is yours permanently."
>
> Next concepts requiring this: math.found.equivalence-relation (requires reflexive + symmetric + transitive — both transitive-relation and reflexive-relation must be mastered first); math.found.partial-order (requires reflexive-relation + transitive-relation).

---

## Component 5 — Repair Protocols

### Protocol B: Misconception Repair Chains

**B-01: PARTIAL-DIAGONAL Repair (MC-1 — Universal Quantifier)**
1. P27 MISCONCEPTION NAMING: "You checked that *some* element relates to itself. Reflexivity is a FOR-ALL statement: every element must have a self-pair."
2. P03 ANALOGY BRIDGE: "Roll call in class — every student must answer 'present.' If one student is absent, roll call fails. One present student doesn't mean roll call passed."
3. Drill: Give R on A = {1,2,3}. Student must verbalize each step: "Checking 1: is (1,1) ∈ R? [answer]. Checking 2: is (2,2) ∈ R? [answer]. Checking 3: is (3,3) ∈ R? [answer]. Conclusion: [all YES → reflexive / any NO → not reflexive]."
4. P49 ADAPTIVE CHECKPOINT: Three examples; all three must be answered correctly.

**B-02: REFLEX-SYMM-CONFLATION Repair (MC-2)**
1. P27 MISCONCEPTION NAMING: "Reflexivity and symmetry are two different properties with two different checklists. Knowing one tells you nothing about the other."
2. P06 CONTRAST PAIR: Show a reflexive non-symmetric relation (R₂ above) and a symmetric non-reflexive relation (R₁ above) side by side.
3. P64 CONCEPTUAL SHIFT: "Reflexivity checklist: the main diagonal only — ignore all off-diagonal entries. Symmetry checklist: off-diagonal pairs only — for each (a,b), check (b,a). Never mix the checklists."
4. P49 ADAPTIVE CHECKPOINT: Three relations; student classifies each by BOTH properties independently before the response.

**B-03: DIAGONAL-INCOMPLETE Repair (MC-3)**
1. P27 MISCONCEPTION NAMING: "You read some diagonal entries. The diagonal of an n×n matrix has exactly n entries — all n must be 1 for reflexivity."
2. Drill: Student physically labels each diagonal entry M[1][1], M[2][2], M[3][3] with a checkmark or X, then counts the Xs. Any X = not reflexive.
3. P49 ADAPTIVE CHECKPOINT: Three matrices; student must scan and label ALL diagonal entries before concluding.

---

## Component 6 — Transfer & Cross-Link Inventory

**P76 Independence Note:** cross_links=[] for math.found.reflexive-relation. All transfer probes use self-contained real-world contexts with no reference to other KG nodes.

**Transfer contexts used:**
- TA-A04 P76: Software access-control system — "every user can access their own account page" as a reflexivity requirement on the permission relation.

**Additional transfer contexts (for repair and enrichment):**
- Database equality self-join: "a table joined with itself on a unique ID column — every row matches itself" — the join relation is reflexive.
- Road-network reachability: "every city has a trivial zero-length path to itself" — the reachability relation includes all self-pairs.
- Social-network self-follow policy: "every user is in their own follower list" — the follows-relation is reflexive.

---

## Component 7 — Assessment Item Bank

| # | Type | Item | Answer | Targets |
|---|---|---|---|---|
| 1 | Yes/No | R = {(1,1),(2,3),(3,3)} on {1,2,3}. Is R reflexive? | NO — (2,2) missing | MC-1 |
| 2 | Yes/No | R = {(a,a),(b,b),(c,c),(a,b)} on {a,b,c}. Is R reflexive? | YES | Recognition |
| 3 | True/False | ≤ is reflexive on ℤ. | TRUE | Definition |
| 4 | True/False | < is reflexive on ℤ. | FALSE | Contrast |
| 5 | True/False | ⊆ is reflexive on the power set of any set. | TRUE | Application |
| 6 | Short answer | Give an example of a reflexive relation on {1,2,3} that is NOT symmetric. | {(1,1),(2,2),(3,3),(1,2)} | MC-2 |
| 7 | Short answer | Give an example of a symmetric relation on {1,2,3} that is NOT reflexive. | {(1,2),(2,1)} | MC-2 |
| 8 | Computation | A 4×4 relation matrix has all 4 diagonal entries equal to 1. Is the relation reflexive? How many off-diagonal entries are free to be 0 or 1? | YES; 12 free entries | Matrix |
| 9 | Computation | How many reflexive relations exist on a set A with |A| = 4? | 2^12 = 4096 | Counting |
| 10 | True/False | The empty relation ∅ on A = ∅ (the empty set) is reflexive. | TRUE (vacuously — there are no elements to fail the check) | Edge case |
| 11 | True/False | The empty relation ∅ on A = {1} is reflexive. | FALSE — (1,1) is missing | Edge case |
| 12 | Analysis | R = {(1,1),(2,2),(3,3),(1,2),(2,3),(1,3)} on {1,2,3}. Is R reflexive? Transitive? Symmetric? | Reflexive YES; Transitive YES; Symmetric NO | Integration |

---

## Component 8 — Spaced Repetition Schedule

**P89 Spaced Repetition:** Intervals — Day 1, Day 3, Day 7, Day 21, Day 60.

| Day | Probe Focus | Sample Item |
|---|---|---|
| Day 1 | Core definition | Identify reflexive / non-reflexive from a set listing |
| Day 3 | Universal quantifier | Find the single element whose missing self-pair breaks reflexivity |
| Day 7 | Independence check | Classify a relation as reflexive / symmetric / neither / both |
| Day 21 | Counting reflexive relations | How many reflexive relations on a 4-element set? |
| Day 60 | Integration | Given a real-world relation (database, road network), determine reflexivity and state why |

**Decay protocol:** If student fails a spaced probe → reset to Day 1 + Protocol B (B-01 repair chain, then re-assess).

---

## Component 9 — Metadata & Validation Checklist

**Authoring metadata:**
- Blueprint ID: math.found.reflexive-relation
- Version: 1.0.0
- Status: PACKAGE_READY
- Authored: 2026-07-11
- KG Source: docs/mathematics/kg/graph.json (v1.0.1, status=frozen)

**Component 10 — Validation Checklist:**

| Check | Criterion | Status |
|---|---|---|
| V-1 | KG ID exists in docs/mathematics/kg/graph.json | PASS — math.found.reflexive-relation confirmed present |
| V-2 | All KG fields accurately transcribed | PASS — difficulty=developing, bloom=remember, threshold=0.90, hours=1 |
| V-3 | Prerequisite map complete | PASS — math.found.relation listed and explained |
| V-4 | Learning objectives match bloom level (remember) | PASS — objectives use state/identify/recognize/distinguish (recall verbs) |
| V-5 | CPA entry stage correct | PASS — C stage (difficulty=2, domain=math.found) |
| V-6 | Session TA cap respected | PASS — 4 TAs ≤ 5-TA cap |
| V-7 | Every non-repair TA opens with B-category primitive (GR-1) | PASS — TA-A01: P03; TA-A02: P27; TA-A03: P41; TA-A04: P91 |
| V-8 | Every TA contains P49 (GR-2) | PASS — TA-A01, TA-A02, TA-A03 each contain P49; TA-A04 is P91 terminal compound (exempt) |
| V-9 | Mastery gate TAs are terminal (GR-3) | PASS — TA-A04 is the only mastery gate and is marked Terminal |
| V-10 | P41/P64 gates repair chains (GR-4) | PASS — TA-A03 uses P41 to detect MC-2; P64 follows on MC-2 confirmation; B-chains in Component 5 |
| V-11 | P91 terminal in its TA (GR-6) | PASS — TA-A04 is the P91 TA; P91 is the sole content with no primitives after P78 |
| V-12 | P76 present in mastery gate (GR-7) | PASS — TA-A04 contains P76 transfer probe |
| V-13 | Cross-links documented (GR-8) | PASS — cross_links=[] stated in Component 0 and Component 6 |
| V-14 | P76 independence correct when cross_links=[] (GR-9) | PASS — P76 probe uses access-control context (self-contained, no KG cross-link reference) |
| V-15 | MAMR stated and enforced (GR-10) | PASS — MC-1 FOUNDATIONAL; B-01 clears first; MC-2 and MC-3 FIFO after |
| V-16 | Misconception registry has ≥1 FOUNDATIONAL MC | PASS — MC-1 (PARTIAL-DIAGONAL) is FOUNDATIONAL |
| V-17 | Assessment bank has ≥8 items | PASS — 12 items in Component 7 |
| V-18 | Spaced repetition schedule present (P89) | PASS — 5 intervals with probe focus in Component 8 |
| V-19 | All primitives used are from P01–P95 canonical set | PASS — P03, P04, P06, P07, P27, P41, P49, P55, P64, P74, P75, P76, P77, P78, P89, P91 all canonical |
| V-20 | No duplicate of existing blueprint | PASS — no math.found.reflexive-relation.md existed prior to this authoring |

**AI Removal Test:** Every TA is specified with concrete mathematical content, worked examples with full solution steps, relation matrices, contrast pairs, and a systematic procedure. An educator with no AI access can deliver this lesson from this document alone. AIR = PASS.

**Status: PACKAGE_READY — all 20 V-checks PASS, AIR PASS.**

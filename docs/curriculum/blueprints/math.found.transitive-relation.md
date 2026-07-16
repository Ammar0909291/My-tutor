# Teaching Blueprint — Transitive Relation

**PACKAGE_READY: YES**
**Framework Version:** Teaching Blueprint Specification v1.0
**KG Concept ID:** math.found.transitive-relation
**Authored:** 2026-07-11

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| KG concept ID | `math.found.transitive-relation` |
| Concept name | Transitive Relation |
| Aliases | transitivity |
| Domain | Mathematical Foundations |
| Difficulty | developing (2) |
| Bloom level | remember |
| Bloom tier | LOT |
| CPA entry stage | C (concrete) — difficulty = developing ≤ 2 |
| Mastery threshold | 0.90 |
| Estimated hours | 1 |
| Session TA cap | 7 (estimated_hours ≥ 1 h) |
| Prerequisites (Tier 1) | `math.found.relation` |
| Cross-links | none |
| P76 independence | YES — cross_links = [ ]; all transfer probes use self-contained real-world contexts |
| MAMR | MC-1 (FOUNDATIONAL) cleared before MC-2 and MC-3; MC-2 and MC-3 FIFO after |

---

## Component 1 — Concept Snapshot

A relation R on a set A is **transitive** if:
> (a, b) ∈ R and (b, c) ∈ R **implies** (a, c) ∈ R, for all a, b, c ∈ A.

Mnemonic: **if you can reach c from a in two steps via b, you must also be able to reach c from a in one step.**

**Verification method:** For every pair of "chained" ordered pairs (a,b) and (b,c) in R, check that (a,c) is also in R. A single counterexample — a chain (a,b),(b,c) where (a,c) ∉ R — makes R NOT transitive.

**Canonical transitive relations:**
- "Is less than" (< ) on ℤ: a < b and b < c → a < c ✓
- "Is an ancestor of" on people: if Alice is Bob's ancestor, and Bob is Carol's ancestor, then Alice is Carol's ancestor ✓
- "Is a subset of" (⊆) on sets: A ⊆ B and B ⊆ C → A ⊆ C ✓
- "Is divisible by" on ℤ: a|b and b|c → a|c ✓

**Non-transitive example:**
- "Is the mother of" on people: Alice is the mother of Bob; Bob is the mother of Carol → Alice is the mother of Carol? NO — Alice is Carol's grandmother, not mother.

**Vacuous transitivity:** If R has no pair (a,b),(b,c) with a shared middle element b, the transitivity condition is vacuously true (no counterexample can exist). The empty relation ∅ on any set is transitive.

---

## Component 2 — Misconception Register

**MC-1 (FOUNDATIONAL) — Transitivity checks (a,b) and (c,b) instead of (a,b) and (b,c).**
- Trigger: student pairs (a,b) with (c,b) — matching on the SECOND component instead of on the shared middle element appearing as second then first
- Root cause: confuses the chain direction; "b" must be the second component of the first pair AND the first component of the second pair
- Impact: systematic incorrect transitivity verdicts; all downstream equivalence/partial-order work corrupted
- Correction path: Protocol B-01 → directed chain visualisation
- MAMR role: FOUNDATIONAL — cleared first

**MC-2 — Transitivity means if (a,c) ∈ R, then there must exist a chain through some b.**
- Trigger: student tries to EXPLAIN every pair (a,c) by finding a chain; rejects (a,c) ∈ R if no such chain exists
- Root cause: inverts the implication — transitivity is "chain ⟹ shortcut", NOT "shortcut ⟹ chain exists"
- Correction path: Protocol B-02 → implication direction exercise

**MC-3 — A relation with no two "chain-able" pairs cannot be transitive (vacuous truth confusion).**
- Trigger: student says ∅ or a relation like {(1,2)} is "not transitive because there's nothing to verify"
- Root cause: misunderstands that a universal conditional is true when the antecedent is never satisfied
- Correction path: Protocol B-03 → vacuous truth explanation

---

## Component 3 — Teaching Primitive Sequence

### Protocol A — Standard Teaching Sequence

**TA-A01: The Transitivity Property**

[P03 ANALOGY BRIDGE — B-category opening, satisfies GR-1]

Everyday analogy: "If Alice lives in the same city as Bob, and Bob lives in the same city as Carol, then Alice and Carol must live in the same city." The relation "lives in the same city as" is transitive.

Counter-analogy: "If Alice knows Bob, and Bob knows Carol, does Alice necessarily know Carol?" NO — this shows "knows" (social acquaintance) is NOT transitive.

Formal definition:
> **R on A is transitive** if for all a, b, c ∈ A:
> **(a,b) ∈ R AND (b,c) ∈ R ⟹ (a,c) ∈ R**

The chain structure to memorize: **first → shared → last**
- (a, **b**) ∈ R — a relates to the shared element b
- (**b**, c) ∈ R — b (the shared element) relates to c
- (a, c) must be in R — shortcut from a to c

Testing transitivity on R = {(1,2),(2,3),(1,3)} on A = {1,2,3}:
- Chain: (1,2) and (2,3) → must have (1,3) ✓ — it's there.
- No other chains exist in R. ✓ TRANSITIVE.

Testing R = {(1,2),(2,3)} on A = {1,2,3}:
- Chain: (1,2) and (2,3) → must have (1,3). But (1,3) ∉ R. ✗ NOT TRANSITIVE.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "R = {(a,b),(b,c),(a,c),(c,a)} on A={a,b,c}. Is R transitive? Show one check."
- **CORRECT** (Check: does every chain imply the shortcut? Chain (b,c),(c,a) → need (b,a). (b,a) ∉ R. NOT TRANSITIVE.) → TA-A02
- **PARTIAL** (correct verdict but incomplete checking) → verify: need to check ALL possible chains, not just one → TA-A02
- **INCORRECT** (says transitive without checking all chains) → Protocol B-01
- **NO_RESPONSE** → "List all pairs of pairs (x,y) and (y,z) in R where the second component of one equals the first component of the next. For each, check if (x,z) ∈ R."

---

**TA-A02: Checking Transitivity from a Matrix**

[P07 WORKED EXAMPLE PAIR — B-category, satisfies GR-1]

The relation matrix M has M[a][b] = 1 iff (a,b) ∈ R. The matrix multiplication M² (Boolean) has M²[a][c] = 1 iff there exists b such that M[a][b]=1 AND M[b][c]=1. R is transitive iff wherever M²[a][c]=1, we also have M[a][c]=1.

**But at this level:** simply scan all 1-entries in M and check chains manually.

**Worked Example 1 (Transitive):**
R on {1,2,3}: M =
|   | 1 | 2 | 3 |
|---|---|---|---|
| 1 | 1 | 1 | 1 |
| 2 | 0 | 1 | 1 |
| 3 | 0 | 0 | 1 |

Pairs in R: (1,1),(1,2),(1,3),(2,2),(2,3),(3,3)
Chains to check:
- (1,1)+(1,2): need (1,2) ✓; (1,1)+(1,3): need (1,3) ✓; (1,2)+(2,2): need (1,2) ✓; (1,2)+(2,3): need (1,3) ✓; (1,3)+(3,3): need (1,3) ✓; (2,2)+(2,3): need (2,3) ✓; (2,3)+(3,3): need (2,3) ✓; (3,3)+(3,3): need (3,3) ✓
All present. TRANSITIVE.

**Worked Example 2 (Not Transitive):**
R on {1,2,3,4}: R={(1,2),(2,3),(3,4)}
Chains: (1,2)+(2,3) → need (1,3) — NOT in R. IMMEDIATELY NOT TRANSITIVE.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "R = {(1,2),(2,1),(1,1),(2,2)} on {1,2,3}. Is R transitive?"
- **CORRECT** (Check: (1,2)+(2,1)→need(1,1)✓; (2,1)+(1,2)→need(2,2)✓; (1,2)+(2,2)→need(1,2)✓; (2,1)+(1,1)→need(2,1)✓. YES, TRANSITIVE.) → TA-A03
- **PARTIAL** (finds it transitive but misses some chains) → re-enumerate all pairs systematically
- **INCORRECT** → Protocol B-01 (check direction of chains)
- **NO_RESPONSE** → "For every pair (a,b) in R and every pair (b,c) in R where the second element of one equals the first element of the other, check if (a,c) ∈ R."

---

**TA-A03: Vacuous Transitivity and Boundary Cases**

[P06 CONTRAST PAIR PROMPT — B-category, satisfies GR-1]

**Case 1: The empty relation**
∅ on A = {1,2,3}: no pairs in R → no chains can be formed → the condition "if (a,b) and (b,c) then (a,c)" is never triggered → TRUE (vacuously).
∅ is transitive.

**Case 2: A singleton pair**
R = {(1,2)} on {1,2,3}: Only chain would require (2,?) ∈ R. Since (2,y) ∉ R for any y, no chain exists. Vacuously transitive.

**Case 3: All-pairs relation**
R = A×A: every (a,c) is already in R, so any chain (a,b),(b,c) leads to (a,c) ∈ R. TRANSITIVE.

Key principle: **If you cannot form a valid chain (a,b),(b,c) from the relation's pairs, transitivity holds vacuously.** A counterexample requires you to FIND a chain (a,b),(b,c) such that (a,c) ∉ R.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "R = {(1,2),(3,4)} on {1,2,3,4}. Is R transitive? Explain."
- **CORRECT** (TRANSITIVE — no chains: (1,2) requires second pair starting with 2, but (2,y) ∉ R; (3,4) requires (4,y) ∉ R. No chains. Vacuously transitive.) → TA-A04
- **PARTIAL** (says "don't know" because no chains) → confirm: no chains = vacuously true = TRANSITIVE
- **INCORRECT** (says NOT transitive because no (a,c) shortcuts) → Protocol B-03 (vacuous truth)
- **NO_RESPONSE** → "Can you find any pair (a,b) in R AND a pair (b,c) in R with the SAME middle element? If not, what does that mean for transitivity?"

---

**TA-A04: Mastery Gate** *(terminal TA — satisfies GR-3, GR-6)*

[P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78]

---

[P77 MULTI-PROBLEM SET]

**Q1.** State the definition of a transitive relation in formal notation.

**Q2.** R = {(1,2),(2,3),(1,3),(3,3)} on {1,2,3}. Is R transitive? Show all chain checks.

**Q3.** R = {(a,b),(b,c),(c,a)} on {a,b,c}. Is R transitive?

**Q4.** True or false: the empty relation on any set is transitive.

**Q5.** Give an everyday example of a transitive relation and an everyday example of a non-transitive relation (not from the lesson).

*Answers:*
Q1: R transitive iff ∀ a,b,c ∈ A: (a,b)∈R ∧ (b,c)∈R ⟹ (a,c)∈R
Q2: Chains: (1,2)+(2,3)→need (1,3)✓; (2,3)+(3,3)→need (2,3)✓; (1,3)+(3,3)→need (1,3)✓; (3,3)+(3,3)→need (3,3)✓. All satisfied. TRANSITIVE.
Q3: Chains: (a,b)+(b,c)→need (a,c). (a,c)∉R. NOT TRANSITIVE.
Q4: True (vacuously — no chains can be formed)
Q5: Transitive: "is taller than", "is a descendant of", "⊆". Non-transitive: "is a sibling of" (Alice's sibling Bob, Bob's sibling Carol, but Carol ≠ Alice's sibling necessarily if they differ... actually this depends), "is the parent of", "is 1 step away from" on a graph.

---

[P55 SCORE — record Q1–Q5: _/5]

---

[P76 TRANSFER PROBE — real-world context (cross_links = [ ]; P76 independence)]

*Scheduling / prerequisite context:*
> "In a course catalog, relation R = 'is a direct prerequisite of' might not be transitive (e.g., Math 101 is a prerequisite for Math 201, and Math 201 is a prerequisite for Math 301 — but Math 101 may not be listed as a DIRECT prerequisite of Math 301, only an indirect one).
>
> Now consider R' = 'must be completed before' (which includes both direct and indirect prerequisites).
>
> (a) Is R' transitive? Explain.
>
> (b) Is R (direct prerequisites only) necessarily transitive? Give a reason."

*Answers:*
(a) R' IS transitive — if Math 101 must be before Math 201, and Math 201 must be before Math 301, then Math 101 must be before Math 301. The "must be completed before" relation is the transitive closure of R.
(b) R (direct prerequisites only) is NOT necessarily transitive. Math 101 is a direct prerequisite for Math 201, Math 201 for Math 301, but Math 101 is typically NOT listed as a direct prerequisite for Math 301 (only indirectly).

---

[P55 SCORE — record transfer probe: _/2]

---

[P75 MASTERY ASSESSMENT]
Total: __/7 (Q1–Q5 = 5 pts; transfer = 2 pts)
Threshold: 0.90 → pass = ⌈0.90 × 7⌉ = 7/7

---

[P74 ROUTING DECISION]
- **7/7** → MASTERED
- **6/7** → if transfer fully correct (2/2): MASTERED; if transfer wrong: Protocol C-01
- **Q3 wrong** (wrong verdict on non-transitive cycle) → Protocol B-01
- **Q4 wrong** (vacuous truth) → Protocol B-03
- **≤5/7** → Protocol C-01 then re-attempt

---

[P55 SCORE — mastery state]
[P78 COMPLETION] Record. Unlock prerequisite check for `math.found.partial-order`.

---

### Protocol B — Misconception Repair Chains

**B-01: Chain Direction Repair (MC-1)**

[P41 MISCONCEPTION DETECTOR]
"In the chain for transitivity: which element must BOTH pairs share? Is it the first component of both? The second? Or one of each?"
[Gate: student says "second of both" or is confused → misconception confirmed]

[P27 MISCONCEPTION NAMING]
"The **reversed-chain misconception** links pairs on the SAME second component instead of the SHARED MIDDLE element. Transitivity links (a,**b**) and (**b**,c) — the middle element b is the SECOND component of the first pair and the FIRST component of the second pair."

[P64 CONCEPTUAL SHIFT]
Physical arrow diagram: draw a→b→c as two consecutive arrows. The output of the first arrow (b) becomes the input of the second arrow. The transitivity requirement adds a direct shortcut arrow: a→c.

Now draw a→b and c→b (two arrows pointing TO b). No chain: these arrows don't form a path from a to c through b.

Work through: R = {(1,2),(2,3),(3,1)} on {1,2,3}. Chain: (1,2)+(2,3) → need (1,3). (1,3) ∉ R. NOT transitive.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "R={(p,q),(q,r),(r,p)} on {p,q,r}. Find one chain and the required pair. Is it in R?"
- **CORRECT** ((p,q)+(q,r)→need(p,r); (p,r)∉R → NOT transitive) → repair complete
- **INCORRECT** → re-draw the arrow diagram; emphasise flow direction

---

**B-02: Implication Direction Repair (MC-2)**

[P41 MISCONCEPTION DETECTOR]
"You tried to explain each pair in R by finding a chain that produces it. But that's the reverse direction. The rule says: IF a chain exists, THEN the shortcut must exist. It does NOT say: IF the shortcut exists, THEN a chain must exist."

[P27 MISCONCEPTION NAMING]
"The **converse confusion misconception** reverses the conditional. Transitivity: chain ⟹ shortcut. NOT: shortcut ⟹ chain. You can have (a,c) ∈ R without any chain through b."

[P64 CONCEPTUAL SHIFT]
R = {(1,3),(1,1),(3,3)} on {1,2,3}.
(1,3) ∈ R. Is there a chain through 2 giving (1,3)? No — (1,2) ∉ R. But (1,3) is still valid in R.
Now check transitivity: (1,3)+(3,3)→need(1,3)✓; (1,1)+(1,3)→need(1,3)✓; (1,1)+(1,1)→need(1,1)✓; (3,3)+(3,3)→need(3,3)✓. TRANSITIVE — even though (1,3) has no chain from 1 to 3 through 2.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "In testing transitivity, what exactly must you verify for each CHAIN (a,b),(b,c) in R?"
- **CORRECT** ("must verify (a,c) ∈ R" — not that there's a chain producing existing pairs) → repair complete
- **INCORRECT** → restate: "only chains impose requirements; existing pairs are free"

---

**B-03: Vacuous Truth Repair (MC-3)**

[P41 MISCONCEPTION DETECTOR]
"You said R = ∅ is not transitive because 'there's nothing to check.' But the definition says IF (a,b) ∈ R AND (b,c) ∈ R, THEN (a,c) ∈ R. For the empty relation, can the IF-part ever be true?"

[P27 MISCONCEPTION NAMING]
"The **vacuous-truth misconception** misreads a universal conditional ('for all... if... then...') as requiring at least one example to be true. Logically, 'for all x: if P(x) then Q(x)' is TRUE when P(x) is always false — because no counterexample exists."

[P64 CONCEPTUAL SHIFT]
Analogy: "All unicorns are pink." — True or false? Logically TRUE because there are no unicorns; no counterexample exists.

Transitivity of ∅: "For all (a,b),(b,c) in ∅: (a,c) ∈ ∅." The premise "(a,b) ∈ ∅" is always false. So no counterexample can be found. Statement is vacuously TRUE.

[P49 ADAPTIVE CHECKPOINT]
- **Probe:** "R = {(1,2)} on {1,2,3}. Is R transitive? Identify all possible chains."
- **CORRECT** (No chains: (1,2) is the only pair; (2,y) ∉ R for any y; no chain → vacuously transitive) → repair complete
- **INCORRECT** → "To violate transitivity, you need BOTH (a,b) AND (b,c) in R. Can you find such a pair of pairs in {(1,2)}?"

---

### Protocol C — Consolidation

**C-01: Mixed Transitivity Review**

[P17 MIXED PRACTICE SET] Six items:

1. R = {(1,2),(1,3),(2,3)} on {1,2,3}. Is R transitive?
2. R = "has the same last name as" on a set of people. Is it transitive?
3. R = {(a,b),(b,a)} on {a,b,c}. Is R transitive?
4. R = {(1,1),(2,2),(3,3)} on {1,2,3}. Is R transitive?
5. True or false: if R is transitive and (a,b),(b,c),(c,d) ∈ R, then (a,d) ∈ R.
6. R = {(x,y) | x,y ∈ ℕ and x ≤ y}. Is it transitive? Prove briefly.

*Answers:* 1: Chains: (1,2)+(2,3)→(1,3)✓ — TRANSITIVE | 2: Yes — same last name is transitive | 3: (a,b)+(b,a)→need (a,a)∉R → NOT TRANSITIVE | 4: (1,1)+(1,1)→(1,1)✓; similar for 2,3 → TRANSITIVE | 5: True — apply transitivity twice: (a,b)+(b,c)→(a,c); then (a,c)+(c,d)→(a,d) | 6: Yes — if x≤y and y≤z then x≤z (transitivity of ≤)

[P49 ADAPTIVE CHECKPOINT] 5–6/6 → MASTERED; 3–4/6 → re-route to specific B chain; ≤2/6 → restart Protocol A.

---

### Protocol D — Acceleration
S6: prior correct answer at TA-A01 checkpoint. Skip to TA-A04. Threshold 7/7 applies.

### Protocol E — Spaced Revision
[P89] Schedule: Day 1, 3, 7, 21, 60.
Probe: (1) State the formal definition of transitivity. (2) R={(1,2),(2,1),(1,1),(2,2)} on {1,2,3}: transitive? (3) Is "is a sibling of" transitive? (4) R=∅ on {a,b}: transitive? (5) R={(a,b),(b,c),(a,c),(c,c)} on {a,b,c}: transitive?
*Answers:* (1) formal def | (2) yes | (3) debatable (technically yes if defined as "shares at least one parent", no if defined as "has same parents") — accept either with justification | (4) yes (vacuous) | (5) chains: (a,b)+(b,c)→(a,c)✓; (b,c)+(c,c)→(b,c)✓; (a,c)+(c,c)→(a,c)✓; (a,b)+(b,c)+(c,c) already covered; YES TRANSITIVE
Decay: <5/5 → reset to Day 1 + Protocol B.

---

## Component 4 — Student State Routing Table

| State | Detected by | Route |
|---|---|---|
| S0 | No engagement before TA-A01 | Protocol A, TA-A01 |
| S1 | P49 INCORRECT | Protocol B matching MC |
| S2 | TA-A04 score 6/7; C-01 score 3–4/6 | Protocol C-01 |
| S6 | TA-A01 answered correctly before instruction | Protocol D (skip to TA-A04) |
| S9 | P89 interval elapsed | Protocol E |

---

## Component 5 — Session Configuration

| Parameter | Value |
|---|---|
| CPA entry stage | C (Concrete) |
| Session TA cap | 7 |
| Protocol A TAs | 4 (TA-A01 through TA-A04) |
| MAMR | MC-1 (chain direction) cleared first; MC-2 and MC-3 FIFO |
| Mastery gate | TA-A04 (P91 compound) |

---

## Component 6 — Transfer Probe Documentation

**P76 Independence Note:** cross_links = [ ]. Transfer probe uses course-prerequisite scheduling context — no external KG concepts required.

| Probe | Context | Transfer target |
|---|---|---|
| TA-A04 P76 | Course prerequisites: direct vs. indirect prerequisite chains | Distinguishes transitive closure (R') from original non-transitive relation (R) |

---

## Component 7 — Spaced Repetition Schedule

Day 1, Day 3, Day 7, Day 21, Day 60. Decay: score < 5/5 → reset to Day 1 + Protocol B.

---

## Component 8 — Assessment Item Bank

| # | Item | Property | Answer |
|---|---|---|---|
| A1 | State the definition of transitivity. | Definition | (a,b)∈R and (b,c)∈R ⟹ (a,c)∈R |
| A2 | R={(1,2),(2,3),(1,3)} on {1,2,3}. Transitive? | Standard check | Yes |
| A3 | R={(a,b),(b,c)} on {a,b,c}. Transitive? | Missing shortcut | No — (a,b)+(b,c)→need (a,c); (a,c)∉R |
| A4 | R=∅ on {1,2,3}. Transitive? | Vacuous | Yes |
| A5 | Is "is the parent of" transitive? | Real-world | No (parent of parent = grandparent, not parent) |
| A6 | Is "is an ancestor of" transitive? | Real-world | Yes |
| A7 | R={(1,1),(2,2),(3,3),(1,2),(2,3),(1,3)} on {1,2,3}. Transitive? | Full check | Yes |
| A8 | R={(p,q),(q,p)} on {p,q}. Transitive? | Cycle check | No — (p,q)+(q,p)→need(p,p)∉R |
| A9 | R={A×A} on A. Transitive? | Complete relation | Yes (trivially) |
| A10 | True or false: every transitive relation contains (a,a) for all a. | Confusion with reflexive | False — transitivity does not require reflexivity |
| A11 | R={(1,2),(3,4)} on {1,2,3,4}. Transitive? | No chains | Yes (vacuously) |
| A12 | R is transitive and (a,b),(b,c),(c,d) ∈ R. Is (a,d) ∈ R? | Chaining | Yes — apply transitivity twice |

---

## Component 9 — Teaching Notes

- **Estimated hours = 1:** This is a compact concept. Protocol A uses only 4 TAs. The mastery gate threshold of 0.90 is high because transitivity is definitional — it feeds directly into partial order and equivalence relation, which require exact recall of the chain condition.
- **MC-1 (chain direction) is the most common error:** Students confuse which element is shared. Emphasise the arrow-chain visual (a→b→c, then a→c as the shortcut) in TA-A01.
- **Vacuous transitivity (B-03):** This is philosophically tricky but important for later work. Partial orders on small sets and the empty relation arise frequently; shaky vacuous-truth understanding creates persistent confusion.
- **Do not conflate transitivity with symmetry or reflexivity:** TA-A03 briefly distinguishes by providing examples that are transitive but NOT reflexive (e.g., strict <) or transitive but NOT symmetric.

---

## Component 10 — Validation Checklist

### V-Checks

| ID | Check | Status |
|---|---|---|
| V-1 | KG concept ID `math.found.transitive-relation` verified; no duplicate blueprint | PASS |
| V-2 | Difficulty (developing) and Bloom (remember) match KG | PASS |
| V-3 | Mastery threshold (0.90) matches KG | PASS |
| V-4 | Estimated hours (1) matches KG | PASS |
| V-5 | CPA entry stage C derived correctly (difficulty = developing ≤ 2) | PASS |
| V-6 | Session TA cap 7 derived correctly (estimated_hours = 1 ≥ 1 h) | PASS |
| V-7 | MAMR stated: MC-1 FOUNDATIONAL cleared first; MC-2 and MC-3 FIFO | PASS |
| V-8 | Every non-repair TA opens with B-category primitive (P03, P07, P06) | PASS |
| V-9 | Each TA-A01 through TA-A03 contains exactly one P49 | PASS |
| V-10 | Mastery gate TA-A04 is terminal (satisfies GR-3) | PASS |
| V-11 | Repair chains B-01, B-02, B-03 entered via P41→P27→P64→P49 (satisfies GR-4) | PASS |
| V-12 | P91 compound is terminal in TA-A04 (satisfies GR-6) | PASS |
| V-13 | P76 transfer probe in TA-A04 P91 sequence (satisfies GR-7) | PASS |
| V-14 | Cross-links = [ ]; P76 independence documented in Component 0 and Component 6 | PASS |
| V-15 | MAMR routing enforced in P74 | PASS |
| V-16 | Assessment item bank contains 12 items (≥ 10 required) | PASS |
| V-17 | All three repair chains (B-01, B-02, B-03) fully documented with P41→P27→P64→P49 | PASS |
| V-18 | P76 probe uses valid real-world context (course prerequisites) | PASS |
| V-19 | P76 independence documented (cross_links = [ ]) | PASS |
| V-20 | All five student state routes documented: S0→A, S1→B, S2→C, S6→D, S9→E | PASS |

### AIR Test

| ID | Check | Status |
|---|---|---|
| AIR-1 | All content slots finite and pre-specified | PASS |
| AIR-2 | All P49 response taxonomies pre-authored | PASS |
| AIR-3 | All branching decisions deterministic | PASS |
| AIR-4 | All primitives concept-independent | PASS |
| AIR-5 | TA sequences fixed at authoring time | PASS |

**PACKAGE_READY: YES — all 20 V-checks PASS; AIR Test PASS**

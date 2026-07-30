# Teaching Blueprint — math.abst.group-order

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.abst.group-order
KG_FIELDS:
  difficulty:        advanced
  bloom:             apply
  mastery_threshold: 0.90
  estimated_hours:   3
  requires:          [math.abst.group-theory]
  unlocks:           [math.abst.lagrange-theorem]
  cross_links:       []

SESSION_TA_CAP:      5   (estimated_hours = 3 → ≥1h band → cap 5)
CPA_ENTRY_STAGE:     C   (concrete order computations in Z/nZ and D₃ before abstract definitions)
P76_MODE:            Independence
  rationale:         cross_links = []; P76 independence probe applies element order to the
                     structure theorem: in any group, the order of any element divides the
                     order of the group (Lagrange's theorem preview).
PASS_CRITERION:      ⌈0.90 × 5⌉ = 5 out of 5
  composition:       4 P77 questions + 1 P76 independence probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
Two separate but related uses of the word "order" in group theory:

**(O1) Order of a group** |G|: the number of elements in G.
- |Z/6Z| = 6.  |D₃| = 6.  |GL₂(ℝ)| = ∞.  |{e}| = 1 (trivial group).

**(O2) Order of an element** ord(g): the smallest positive integer k such that gᵏ = e.
- If no such k exists, ord(g) = ∞.
- ord(e) = 1 for any group (e¹ = e = identity).
- In Z/6Z: ord(1) = 6, ord(2) = 3, ord(3) = 2, ord(4) = 3, ord(5) = 6.

**Key theorem** (preview of Lagrange): In a **finite** group G, the order of every element
divides |G|.  (Full proof in `math.abst.lagrange-theorem`; here we verify empirically.)
- |Z/6Z| = 6; element orders {1,2,3,6}; all divide 6 ✓.
- |D₃| = 6; element orders {1,2,3}; all divide 6 ✓.

### Distinction from math.abst.group-theory
`math.abst.group-theory` defined G4 (inverses exist) without introducing orders.  This blueprint
defines both kinds of order, develops computational fluency, and previews the Lagrange divisibility
property that will be proved in the follow-on blueprint.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Z/6Z: compute each element's order by successive addition |
| **Pictorial (P)** | "Orbit" table: list gᵏ for k=1,2,… until reaching e |
| **Abstract (A)** | ord(g) definition; relationship between ord(g) and |G|; gⁿ=e ↔ ord(g)|n |

### Element Orders in D₃
| Element | gᵏ sequence | Order |
|---------|-------------|-------|
| e | e | 1 |
| r | r, r², e | 3 |
| r² | r², e | 3 |
| s | s, e | 2 |
| rs | rs, e | 2 |
| r²s | r²s, e | 2 |

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | ORDER-OF-GROUP-VS-ELEMENT | Confuses "order of the group" (number of elements) with "order of an element" (smallest power giving identity) | Two different technical meanings for the same word introduced simultaneously | **FOUNDATIONAL** |
| MC-2 | ORDER-ALWAYS-EQUALS-GROUP-ORDER | Claims every element has order = |G| | Over-generalises from generators of Z/nZ (which have order n); forgets elements like identity (order 1) and proper subgroup generators | Secondary |
| MC-3 | ORD-NOT-DIVIDES-GROUP-ORDER | After computing orders, doesn't recognise that ord(g) must divide |G| | Hasn't internalised the Lagrange divisibility pattern; sees it as a coincidence | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A01 gate; MC-2 and MC-3 addressed in TA-A02
and TA-A03.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P11: two meanings of order; orbit table for Z/6Z + P49)
      → TA-A02 (P04: element order gallery for D₃; all orders divide |D₃|=6 + P49)
      → TA-A03 (P06: ord(g)=|G| ↔ g is a generator of a cyclic group; identity always order 1 + P49)
      → TA-A04 (P91 terminal mastery gate)

Repair (Protocol B):
  MC-1 → TB-R01 (two-column comparison: order of group = counting; order of element = smallest power)
  MC-2 → TB-R02 (identity has order 1; element 2 in Z/6Z has order 3, not 6)
  MC-3 → TB-R03 (verify pattern in Z/8Z: all element orders divide 8)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Two Meanings of Order (P11 + P49)

**[P11 — REPRESENTATION SHIFT]**

| Representation | Order of G = Z/6Z | Order of element 2 in Z/6Z |
|----------------|-------------------|----------------------------|
| **Verbal** | "Number of elements in the group" | "Smallest k with k·2 ≡ 0 (mod 6)" |
| **Symbolic** | |G| = 6 | ord(2) = 3 |
| **Computation** | Count: {0,1,2,3,4,5} → 6 | 2,4,0 — reaches identity at k=3 |
| **Orbit table** | (n/a — whole group) | k=1:2; k=2:4; k=3:0=e ✓ |

**Orbit table for all elements of Z/6Z:**

| a | a,2a,3a,4a,5a,6a (mod 6) | ord(a) |
|---|--------------------------|--------|
| 0 | 0 | 1 |
| 1 | 1,2,3,4,5,0 | 6 |
| 2 | 2,4,0 | 3 |
| 3 | 3,0 | 2 |
| 4 | 4,2,0 | 3 |
| 5 | 5,4,3,2,1,0 | 6 |

Observation: orders are {1, 2, 3, 6} — all divisors of |G| = 6.

**[P49 — ADAPTIVE CHECKPOINT]**

> (i) What is |D₃|?
> (ii) What is ord(r) in D₃ where r is a rotation by 120°?
> (iii) Are these the same concept?  Explain in one sentence.

Expected:
*(i) |D₃| = 6 (elements: e, r, r², s, rs, r²s).*
*(ii) ord(r): r¹=r, r²=r², r³=e. ord(r) = 3.*
*(iii) No — |D₃| counts the elements in the group; ord(r) counts how many times r must be applied to return to identity.*

- **CORRECT** (all three distinct answers with clear justification): ✓ Advance to TA-A02.
- **PARTIAL — (i) and (ii) correct but (iii) conflates them**: MC-1 active. Route TB-R01. Return.
- **INCORRECT — (ii) says ord(r)=6**: MC-2 likely. Complete TA-A02 first, then TB-R02.
- **NO_RESPONSE**: Scaffold "(i) List the 6 elements of D₃. (ii) Compute r², r³. When do you first get back to e?"

---

### TA-A02 · Element Order Gallery for D₃ (P04 + P49)

**[P04 — PATTERN INDUCTION]**

Pattern: compute all element orders in D₃, then check divisibility by |D₃| = 6.

| Element | Orbit (gᵏ until reaching e) | ord | Does ord divide 6? |
|---------|----------------------------|-----|-------------------|
| e | e | 1 | 1 | 6 ✓ |
| r | r, r², e | 3 | 3 | 6 ✓ |
| r² | r², e | 3 | 3 | 6 ✓ |
| s | s, e | 2 | 2 | 6 ✓ |
| rs | rs, e | 2 | 2 | 6 ✓ |
| r²s | r²s, e | 2 | 2 | 6 ✓ |

Every element's order divides |D₃| = 6.
Possible orders: {1, 2, 3} — all are divisors of 6.  Notice: **no element has order 6** — D₃ is NOT cyclic (no generator of the whole group).

Compare with Z/6Z: elements 1 and 5 have order 6 = |G| → Z/6Z IS cyclic.

**Pattern rule:** In a group G, ord(g) divides |G| for every g ∈ G (Lagrange property — to be proved in the next blueprint).

**[P49 — ADAPTIVE CHECKPOINT]**

> In D₃, is there any element g with ord(g) = 4?  Is there one with ord(g) = 6?
> What does this tell you about D₃?

Expected:
*ord(g) must divide |D₃| = 6.  Divisors of 6: {1, 2, 3, 6}.  No element has order 4 (4 does not divide 6 — consistent with the orbit table).  No element has order 6 either (the table shows max order = 3 for r, r²).  D₃ is not cyclic (would need an element of order 6 to generate all 6 elements).*

- **CORRECT** (no order 4; no order 6; D₃ not cyclic): ✓ Advance to TA-A03.
- **PARTIAL — says an element might have order 4**: MC-3 active. Route TB-R03. Return.
- **PARTIAL — unsure about D₃ being cyclic**: Route to cyclic-group blueprint cross-reference. Return.
- **NO_RESPONSE**: Scaffold "From the table above, what orders appear? List divisors of 6 — could 4 appear?"

---

### TA-A03 · Key Relationships: Generator ↔ Order = |G|; Identity Has Order 1 (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Contrast A — Generator vs non-generator:**

| Claim | Group | Element | ord(g) | |G| | Generator? |
|-------|-------|---------|--------|-----|-----------|
| Generator | Z/6Z | 1 | 6 | 6 | ✓ (ord = |G|) |
| Non-generator | Z/6Z | 2 | 3 | 6 | ✗ (ord < |G|) |
| Non-generator | D₃ | r | 3 | 6 | ✗ (generates only {e,r,r²}) |

**Rule:** g is a generator of G ↔ ord(g) = |G| (for finite groups).
Equivalently: G is cyclic ↔ ∃g with ord(g) = |G|.

**Contrast B — Order of identity:**

- Identity e: e¹ = e.  Reaches identity in 1 step.  ord(e) = 1.
- ord(e) = 1 in **every** group — there are no exceptions.
- If ord(g) = 1, then g = e.  (Proof: g¹ = g = e.)

> Key theorem (proved here, not in Lagrange): gⁿ = e if and only if ord(g) | n.
>
> Proof (⟹): If gⁿ = e, write n = q·ord(g) + r with 0 ≤ r < ord(g) (Euclidean division).
> Then gⁿ = (g^{ord(g)})^q · gʳ = eᵠ · gʳ = gʳ.  gᵣ = e with r < ord(g) → r = 0 (minimality).
> So ord(g) | n.

**[P49 — ADAPTIVE CHECKPOINT]**

> In Z/10Z:
> (i) ord(5) = ?  (ii) Is 5 a generator of Z/10Z?
> (iii) Find all n ∈ {1,…,10} such that 5n ≡ 0 (mod 10).

Expected:
*(i) 5·1=5, 5·2=10≡0. ord(5)=2.*
*(ii) No: ord(5)=2 ≠ |Z/10Z|=10.*
*(iii) 5n ≡ 0 (mod 10) ↔ ord(5)|n ↔ 2|n → n ∈ {2,4,6,8,10}.*

- **CORRECT** (ord=2; not a generator; multiples of 2): ✓ Advance to TA-A04.
- **PARTIAL — (iii) wrong**: Revisit "gⁿ=e ↔ ord(g)|n" theorem. Re-administer.
- **PARTIAL — (i) says 5**: Recompute 5+5=10≡0. ord(5)=2. Return.
- **NO_RESPONSE**: Scaffold "(i) Compute 5+5 mod 10. Is it 0? Then ord(5)=2."

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** Find the order of every element in Z/8Z.  Which elements are generators?
*(Orders: ord(0)=1, ord(1)=8, ord(2)=4, ord(3)=8, ord(4)=2, ord(5)=8, ord(6)=4, ord(7)=8.
 Generators: {1,3,5,7} — those with ord=8=|G|.)*

**Q2.** In a group G of order 12, can an element have order 5?  Order 4?  Justify.
*(Order 5: No — 5 does not divide 12 (12/5 is not an integer). Order 4: Yes — 4|12. ✓)*

**Q3.** Prove: if ord(g) = k, then ord(g²) divides k.  (Hint: compute (g²)^k.)
*((g²)^k = g^{2k} = (g^k)² = e² = e.  By the gⁿ=e ↔ ord(g)|n theorem, ord(g²) | 2k.
 Also (g²)^k = e → ord(g²) | k directly from the theorem applied to g². ✓)*

**Q4.** The element g in a group satisfies g⁶ = e but g² ≠ e and g³ ≠ e.  What is ord(g)?
*(ord(g) must divide 6 (from g⁶=e). Divisors of 6: {1,2,3,6}.  g¹≠e (else ord=1 but g²≠e contradicts),
 g²≠e, g³≠e → ord(g)∉{1,2,3}. So ord(g)=6.)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independence probe: applies order divisibility in a novel finite group setting.*

> A group G has order 15.  An element g ∈ G satisfies g⁵ ≠ e and g³ ≠ e.
>
> (i) What are the possible orders of g?
> (ii) If additionally g¹⁵ = e, determine ord(g) exactly.
> (iii) Does the existence of g imply G is cyclic?  Explain.

*Expected answers:*
- **(i)** ord(g) must divide |G| = 15 (Lagrange divisibility).  Divisors of 15: {1, 3, 5, 15}.
  g³ ≠ e → ord(g) ≠ 1 and ord(g) ≠ 3.  g⁵ ≠ e → ord(g) ≠ 5.  So ord(g) ∈ {15}.
- **(ii)** g¹⁵ = e confirms ord(g) | 15; combined with (i), ord(g) = 15.
- **(iii)** Yes. ord(g) = 15 = |G|.  g generates all of G (every element is a power of g).  G = ⟨g⟩ is cyclic.

**[P55 — SCORE]**  Award 1 point for P76 if (i)+(ii) correct and (iii) reason stated; 0 otherwise.

---

**[P75 — MASTERY ASSESSMENT]**

```
PASS_CRITERION: 5 out of 5 items (4 P77 + 1 P76)
THRESHOLD:      0.90  →  ⌈0.90 × 5⌉ = 5
```

**[P55 — SCORE]**  Combine P77 tally + P76 score → total out of 5.

**[P74 — ROUTING DECISION]**

- **Score = 5/5 → MASTERY ACHIEVED.** Proceed to P78.
- **Score ≤ 4/5 → Identify which items failed:**
  - Q1 wrong → revisit orbit table in TA-A01; re-administer.
  - Q2 wrong → MC-3 → TB-R03 (divisibility check).
  - Q3 wrong → revisit gⁿ=e ↔ ord(g)|n from TA-A03.
  - Q4 wrong → revisit divisors-of-6 logic in TA-A03 P49.
  - P76 wrong → identify which part; route to TB-R03 for Lagrange divisibility.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.abst.group-order
MASTERY_REACHED: true
UNLOCKS:         math.abst.lagrange-theorem
NEXT_CONCEPT:    math.abst.lagrange-theorem
SESSION_CLOSE:   "You can compute the order of any element in a finite group, distinguish it
                  from the order of the group itself, identify generators (ord(g)=|G|), and
                  verify that element orders always divide the group order — a pattern that
                  Lagrange's theorem will prove in full generality."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: ORDER-OF-GROUP-VS-ELEMENT (MC-1)

**Trigger:** Student conflates |G| and ord(g).

**Step 1 — Two-column comparison.**
> | Concept | Symbol | What it counts | Example (Z/6Z) |
> |---------|--------|----------------|----------------|
> | Order of the group | |G| | Number of elements | |Z/6Z| = 6 |
> | Order of an element | ord(g) | Smallest k ≥ 1 with gᵏ = e | ord(2) = 3 |

**Step 2 — Show they are different for the same group.**
> |Z/6Z| = 6 but ord(2) = 3.  Different numbers, different questions.

**Exit:** Return to TA-A01 P49 checkpoint.

---

### TB-R02 · Repair: ORDER-ALWAYS-EQUALS-GROUP-ORDER (MC-2)

**Trigger:** Student claims every element has order |G|.

**Step 1 — Identity counterexample.**
> ord(e) = 1 in every group.  |G| = 1 only for the trivial group.  So ord(e) ≠ |G| unless |G|=1.

**Step 2 — Concrete counterexample in Z/6Z.**
> ord(2) = 3 ≠ 6 = |Z/6Z|.
> Orbit: 2, 4, 0 — only 3 steps to return to identity.

**Step 3 — Correct rule.**
> ord(g) = |G| ↔ g is a generator of a cyclic group.  Most elements have smaller orders.

**Exit:** Return to TA-A02 P49 checkpoint.

---

### TB-R03 · Repair: ORD-NOT-DIVIDES-GROUP-ORDER (MC-3)

**Trigger:** Student doesn't apply the Lagrange divisibility test.

**Step 1 — Verify pattern in Z/8Z.**
> |Z/8Z| = 8.  Element orders: ord(0)=1, ord(1)=8, ord(2)=4, ord(3)=8, ord(4)=2, ord(5)=8, ord(6)=4, ord(7)=8.
> Divisors of 8: {1, 2, 4, 8}.  Orders found: {1, 2, 4, 8}.  All divide 8 ✓.

**Step 2 — Apply the test prospectively.**
> If someone claims an element in a group of order 12 has order 5: check 5|12? No → impossible.
> If they claim order 4: check 4|12? Yes → possible.

**Step 3 — State the rule clearly.**
> In a finite group G: ord(g) always divides |G|.  This is Lagrange's theorem (proved next concept).
> Use it to rule out impossible orders before computing.

**Exit:** Return to TA-A03 P49 checkpoint.

---

<!-- COMPONENT 6: P89 Spaced Repetition -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "In Z/9Z, what is ord(3)? What is ord(6)?"
    Target: ord(3): 3,6,0 → order 3. ord(6): 6,3,0 → order 3. PASS if both correct.

  Interval-2 (+3 days):
    Probe: "A group has order 10. Can an element have order 4? Order 5?"
    Target: Order 4: No (4∤10). Order 5: Yes (5|10). PASS if both with divisibility reason.

  Interval-3 (+1 week):
    Probe: "g⁴ = e in a group. Does this mean ord(g)=4? What are the possibilities?"
    Target: No — ord(g) must divide 4, so ord(g) ∈ {1,2,4}.  All three are possible.
            PASS if divisors of 4 cited correctly.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A01 (orbit tables) or TA-A03 (gⁿ=e theorem).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.abst.group-theory:
    Used in:   TA-A01 (identity e used; G4 underlies orbit computation — gᵏ hits e),
               TA-A02 (G4 + G2 used in D₃ orbit computation), TA-A03 (Euclidean division
               argument for gⁿ=e theorem uses G2+G4).
    Assumed:   Student holds G1–G4 and can compute in concrete groups (Z/nZ, D₃).

UNLOCKS_ENABLED:
  math.abst.lagrange-theorem:
    Dependency: Lagrange's theorem states |H| divides |G| for any subgroup H ≤ G.
                The element-order divisibility rule (ord(g) | |G|) is an immediate corollary:
                ⟨g⟩ is a subgroup of order ord(g), so ord(g) | |G|.
                Students need element order fluency to follow the Lagrange proof.

CROSS_LINKS_NOTED:
  (none — cross_links = [])
  P76 independence probe uses a group of order 15 — a novel setting to apply order divisibility.
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. The "two orders" naming collision is the primary source of MC-1.**
Both "|G|" and "ord(g)" are called "order."  Make the two-column table in TA-A01 explicit and
visible throughout the session.  Encourage the student to write |G| and ord(g) on paper to
distinguish them by notation.

**2. The orbit table is the primary computational tool.**
Students should compute gᵏ for k=1, 2, … until reaching e, listing each value.  For Z/nZ this
is repeated addition mod n.  For D₃, use the composition table.  The orbit table is both the
computation method and the proof that the computed value IS the order.

**3. The "gⁿ=e ↔ ord(g)|n" theorem has a subtle implication.**
Q3 (prove ord(g²) divides ord(g)) is an advanced application — at bloom=apply, a complete proof
is expected.  However, the key step is just applying the theorem twice, not a new proof technique.
If Q3 is failed, route to TA-A03's statement of the theorem rather than re-teaching from scratch.

**4. The P76 probe anticipates Lagrange's theorem.**
Parts (i)–(iii) walk through the logic of Lagrange divisibility in a concrete order-15 group.
This is intentionally planted as a preparation for the next concept — the student sees Lagrange
used to determine order uniquely before the full theorem is stated.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.abst.group-order
=============================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 5; 4 TAs used ≤ 5. ✓
[PASS] V-4   CPA_ENTRY_STAGE = C (Z/6Z orbit table as concrete entry).
[PASS] V-5   P76_MODE = Independence (no cross_links; order-15 group novel setting).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A01 gate.
[PASS] V-7   MC-1 surfaced in TA-A01 P49 (iii); TB-R01 route.
[PASS] V-8   MC-2 and MC-3 addressed in TA-A02 and TA-A03.
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P11 ✓  TA-A02→P04 ✓  TA-A03→P06 ✓  TA-A04→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49. TA-A01→P49 ✓  TA-A02→P49 ✓  TA-A03→P49 ✓
[PASS] V-12  GR-3: Terminal TA (TA-A04) is a mastery gate containing P91.
[PASS] V-13  GR-4: P77 contains exactly 4 questions. ✓
[PASS] V-14  GR-5: P91 terminal in TA-A04 with correct compound
               P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-15  GR-6: P76 included inside P91 in the mastery gate.
[PASS] V-16  GR-9: P76 Independence mode — novel group of order 15; order divisibility applied.
[PASS] V-17  GR-10: MAMR stated; MC-1 cleared at TA-A01 before TA-A02.

PASS CRITERION
[PASS] V-18  PASS_CRITERION = ⌈0.90 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-19  P74 routing covers all score outcomes.

CONTENT
[PASS] AIR   Two orders defined: |G| (group size) and ord(g) (smallest power giving identity).
             Orbit tables for Z/6Z and D₃. Generator ↔ ord(g)=|G|. ord(e)=1 always.
             gⁿ=e ↔ ord(g)|n theorem stated and proved. Element orders divide |G| established
             empirically as preview of Lagrange. MC-1/MC-2/MC-3 all addressed.
             P76 independence: order-15 group; ord(g)=15 uniquely determined; G cyclic.

VERDICT: PACKAGE_READY
```

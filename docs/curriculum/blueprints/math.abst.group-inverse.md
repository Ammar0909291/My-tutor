# Teaching Blueprint — math.abst.group-inverse

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.abst.group-inverse
KG_FIELDS:
  difficulty:        advanced
  bloom:             understand
  mastery_threshold: 0.95
  estimated_hours:   1
  requires:          [math.abst.group-theory]
  unlocks:           []
  cross_links:       [math.linalg.matrix-inverse]

SESSION_TA_CAP:      4   (estimated_hours = 1 → short concept → cap 4)
CPA_ENTRY_STAGE:     A   (uniqueness and product-inverse proofs are purely algebraic)
P76_MODE:            Cross-link
  rationale:         math.linalg.matrix-inverse IS a Tier 1 concept; P76 probe verifies
                     that the matrix inverse in GL_n(ℝ) IS the group inverse, and checks
                     the product-inverse formula (AB)⁻¹ = B⁻¹A⁻¹ concretely.
PASS_CRITERION:      ⌈0.95 × 5⌉ = 5 out of 5
  composition:       4 P77 questions + 1 P76 cross-link probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
G4 guarantees that inverses **exist** in a group; this blueprint establishes two key **theorems**
that sharpen that guarantee:

**(T1) Uniqueness:** The inverse of any group element is unique.
  Proof: Suppose a·b = e and a·c = e.  Then b = b·e = b·(a·c) = (b·a)·c = e·c = c.

**(T2) Product-inverse formula:** For any a, b ∈ G, (a·b)⁻¹ = b⁻¹·a⁻¹ (reversal of order).
  Proof: (a·b)·(b⁻¹·a⁻¹) = a·(b·b⁻¹)·a⁻¹ = a·e·a⁻¹ = a·a⁻¹ = e.  By T1 (uniqueness),
         (a·b)⁻¹ = b⁻¹·a⁻¹.

**(T3) Double-inverse:** (a⁻¹)⁻¹ = a for every a ∈ G.
  Proof: a⁻¹ · a = e (G4), so a is the inverse of a⁻¹; by uniqueness T1, (a⁻¹)⁻¹ = a.

### Distinction from math.abst.group-theory
`math.abst.group-theory` established that G4 guarantees the **existence** of inverses and built
intuition via concrete groups (ℤ,+), (ℝ\{0},×).  This blueprint proves structural theorems
about inverses: uniqueness (T1), product-reversal (T2), double-inverse (T3).  The student moves
from "inverses exist" to "inverses behave exactly as these three theorems dictate."

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | (ℤ, +): inverse of 3 is unique (−3); (3+5)⁻¹ = (−5)+(−3) = −8 ✓ |
| **Pictorial (P)** | Cayley table excerpt: each element appears exactly once in each row/column |
| **Abstract (A)** | Uniqueness proof (T1), product-inverse proof (T2), double-inverse proof (T3) |

### Canonical Examples
| Group | a | b | (a·b)⁻¹ | b⁻¹·a⁻¹ | Match? |
|-------|---|---|---------|---------|--------|
| (ℤ, +) | 3 | 5 | −8 | (−5)+(−3) = −8 | ✓ |
| (ℝ\{0}, ×) | 2 | 3 | 1/6 | (1/3)·(1/2) = 1/6 | ✓ |
| (GL₂(ℝ), ×) | A | B | (AB)⁻¹ | B⁻¹A⁻¹ | ✓ (cross-link) |

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | INVERSE-NOT-UNIQUE | Claims "a group element might have two different inverses" or treats non-uniqueness as possible | Hasn't applied G4 and associativity together; doesn't realise G2+G4 force uniqueness | **FOUNDATIONAL** |
| MC-2 | PRODUCT-INVERSE-WRONG-ORDER | Writes (a·b)⁻¹ = a⁻¹·b⁻¹ (parallel to the product, not reversed) | Over-generalises from (ℤ,+) where addition is commutative and order doesn't matter; fails to account for non-abelian groups | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A01 gate; MC-2 addressed in TA-A02.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P11: uniqueness proof T1 + double-inverse T3 + P49)
      → TA-A02 (P06: product-inverse (ab)⁻¹=b⁻¹a⁻¹ vs wrong-order a⁻¹b⁻¹ + P49)
      → TA-A03 (P91 terminal mastery gate)

Repair (Protocol B):
  MC-1 → TB-R01 (trace uniqueness proof step-by-step with (ℤ,+) numbers)
  MC-2 → TB-R02 (compute (AB)⁻¹ numerically vs B⁻¹A⁻¹ vs A⁻¹B⁻¹; show only the former = I)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Uniqueness of the Inverse (P11 + P49)

**[P11 — REPRESENTATION SHIFT]**

Four ways to state the uniqueness theorem:

| Representation | Uniqueness of Inverse (T1) |
|----------------|---------------------------|
| **Verbal** | "Each element has exactly one inverse — no element has two" |
| **Symbolic** | If a·b = e AND a·c = e, then b = c |
| **Concrete (ℤ,+)** | If 3 + b = 0 AND 3 + c = 0, then b = c = −3 |
| **Proof** | b = b·e = b·(a·c) = (b·a)·c = e·c = c (using G4 then G2 then G3 then G4 then G3) |

Similarly, (T3) **Double-inverse:** (a⁻¹)⁻¹ = a.
- We have a⁻¹ · a = e (G4), so a satisfies the definition of the inverse of a⁻¹.
- By uniqueness (T1), (a⁻¹)⁻¹ = a.

**[P49 — ADAPTIVE CHECKPOINT]**

> (i) In a group (G, ·), suppose a·b = e and b·a = e for some b ∈ G.  Is b = a⁻¹?  Justify with one sentence referencing G4.
> (ii) What is ((a⁻¹)⁻¹)⁻¹?

Expected:
*(i) Yes. G4 says a⁻¹ is the unique element satisfying a·a⁻¹ = e; since a·b = e, b = a⁻¹.*
*(ii) Apply T3: (a⁻¹)⁻¹ = a, then T3 again: (a)⁻¹ = a⁻¹. So ((a⁻¹)⁻¹)⁻¹ = a⁻¹.*

- **CORRECT** (both right): ✓ Advance to TA-A02.
- **PARTIAL — (i) OK but (ii) wrong**: Remind T3 twice: ((a⁻¹)⁻¹)⁻¹ = (a)⁻¹ = a⁻¹. Advance.
- **INCORRECT — (i) wrong**: MC-1 active. Route to TB-R01. Return.
- **NO_RESPONSE**: Scaffold "(i) G4 says the inverse of a is the unique x with a·x = e. Does b satisfy that? (ii) Apply T3 once: what is (a⁻¹)⁻¹?"

---

### TA-A02 · Product-Inverse Formula (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Left side — WRONG order: (a·b)⁻¹ = a⁻¹·b⁻¹**

Test with (ℤ, +): (3 + 5)⁻¹ should be −8.
If formula says a⁻¹ + b⁻¹ = −3 + (−5) = −8 ✓ — this works!

But now test with (GL₂(ℝ), ×): Let A = [[1,1],[0,1]], B = [[1,0],[1,1]].
AB = [[2,1],[1,1]].  (AB)⁻¹ = [[1,−1],[−1,2]].
A⁻¹ = [[1,−1],[0,1]], B⁻¹ = [[1,0],[−1,1]].
**A⁻¹B⁻¹ = [[1,−1],[0,1]]·[[1,0],[−1,1]] = [[2,−1],[−1,1]] ≠ (AB)⁻¹.**

**Right side — CORRECT order: (a·b)⁻¹ = b⁻¹·a⁻¹**

**B⁻¹A⁻¹ = [[1,0],[−1,1]]·[[1,−1],[0,1]] = [[1,−1],[−1,2]] = (AB)⁻¹. ✓**

**Why the order reverses:** (a·b)·(b⁻¹·a⁻¹) = a·(b·b⁻¹)·a⁻¹ = a·e·a⁻¹ = a·a⁻¹ = e.
The inner pair cancels first. In (ℤ,+), commutativity hid the order issue.

> **Rule:** (a·b)⁻¹ = b⁻¹·a⁻¹ — like putting on shoes then socks: to undo, remove socks first then shoes.

**[P49 — ADAPTIVE CHECKPOINT]**

> In a group, simplify: (a·b·c)⁻¹.

Expected:
*(a·b·c)⁻¹ = c⁻¹·(a·b)⁻¹ = c⁻¹·b⁻¹·a⁻¹.  (Apply T2 twice, reversing each step.)*

- **CORRECT** (c⁻¹·b⁻¹·a⁻¹): ✓ Advance to TA-A03.
- **PARTIAL — writes a⁻¹·b⁻¹·c⁻¹**: MC-2 active. Route to TB-R02. Return.
- **INCORRECT**: TB-R02 with (ℤ,+) numeric check. Return.
- **NO_RESPONSE**: Scaffold "Apply T2 to (a·b)·c: ((a·b)·c)⁻¹ = c⁻¹·(a·b)⁻¹. Now expand (a·b)⁻¹."

---

### TA-A03 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** Prove that in any group (G, ·), the inverse of each element is unique.
*(Proof: Suppose a·b = e and a·c = e.  Then b = b·e = b·(a·c) = (b·a)·c = e·c = c.  So b = c.)*

**Q2.** In (ℤ, +), verify the product-inverse formula: compute (7 + (−3))⁻¹ using both sides.
*(LHS: (7 + (−3))⁻¹ = (4)⁻¹ = −4. RHS using T2: (−3)⁻¹ + (7)⁻¹ = 3 + (−7) = −4. ✓ Note: abelian, so order doesn't matter here.)*

**Q3.** Prove that (a⁻¹)⁻¹ = a for any element a in a group.
*(a⁻¹ · a = e by G4, so a satisfies the definition of the inverse of a⁻¹.  By uniqueness (T1), (a⁻¹)⁻¹ = a.)*

**Q4.** In a non-abelian group G, is it possible that (a·b)⁻¹ = a⁻¹·b⁻¹ for some specific a, b?  Give an example or explain why not.
*(Yes — if a and b happen to commute (b·a = a·b), then b⁻¹·a⁻¹ = a⁻¹·b⁻¹, so both formulas give the same result for that specific pair. Example: in GL₂(ℝ), any matrix commutes with scalar multiples of the identity.)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Cross-link to math.linalg.matrix-inverse)

*Cross-link probe: bridges group inverse to matrix inverse in GL₂(ℝ).*

> Let A = [[2,1],[1,1]] and B = [[1,1],[0,1]] be elements of GL₂(ℝ) (the group of invertible 2×2 matrices under multiplication).
>
> (i) Compute A⁻¹ and B⁻¹ using the 2×2 inverse formula.
> (ii) Compute AB and then (AB)⁻¹ directly.
> (iii) Compute B⁻¹A⁻¹ and verify it equals (AB)⁻¹.
> (iv) Compute A⁻¹B⁻¹ and confirm it does NOT equal (AB)⁻¹.

*Expected answers:*
- **(i)** A⁻¹ = [[1,−1],[−1,2]]; B⁻¹ = [[1,−1],[0,1]].
- **(ii)** AB = [[2,3],[1,2]]; (AB)⁻¹ = [[2,−3],[−1,2]].
- **(iii)** B⁻¹A⁻¹ = [[1,−1],[0,1]]·[[1,−1],[−1,2]] = [[2,−3],[−1,2]] = (AB)⁻¹. ✓
- **(iv)** A⁻¹B⁻¹ = [[1,−1],[−1,2]]·[[1,−1],[0,1]] = [[1,−2],[−1,3]] ≠ (AB)⁻¹. ✗

**[P55 — SCORE]**  Award 1 point for P76 if (ii) and (iii) correct with (iv) identified as wrong; 0 otherwise.

---

**[P75 — MASTERY ASSESSMENT]**

```
PASS_CRITERION: 5 out of 5 items (4 P77 + 1 P76)
THRESHOLD:      0.95  →  ⌈0.95 × 5⌉ = 5
```

**[P55 — SCORE]**  Combine P77 tally + P76 score → total out of 5.

**[P74 — ROUTING DECISION]**

- **Score = 5/5 → MASTERY ACHIEVED.** Proceed to P78.
- **Score ≤ 4/5 → Identify which items failed:**
  - Q1 wrong → MC-1 → TB-R01 (uniqueness proof step-by-step).
  - Q3 wrong → double-inverse gap → revisit T3 from TA-A01.
  - Q4 wrong → product-inverse formula gap → revisit TA-A02 Contrast; re-administer.
  - Q2 wrong → review (ℤ,+) case; note abelian allows commuting the order.
  - P76 wrong → identify which part failed; if (iii) wrong, MC-2 active → TB-R02.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.abst.group-inverse
MASTERY_REACHED: true
UNLOCKS:         (none — terminal node)
NEXT_CONCEPT:    (instructor-directed: revisit math.abst.group-operation or advance to subgroups)
SESSION_CLOSE:   "You have proved three theorems about group inverses: the inverse is unique (T1),
                  double-inverse is the original element (T3), and (ab)⁻¹ = b⁻¹a⁻¹ (T2 — note
                  the reversal). These theorems hold in every group, including matrix groups
                  where the order matters. The matrix inverse you know from linear algebra is
                  exactly the group inverse in GL_n(ℝ)."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: INVERSE-NOT-UNIQUE (MC-1)

**Trigger:** Student claims uniqueness is not guaranteed, or cannot prove T1.

**Step 1 — Set up the proof structure.**
> "Suppose a has two inverses: call them b and c.  We will show b and c must be equal."
> From G4: a·b = e.  Also: a·c = e.

**Step 2 — Use associativity (G2).**
> b = b·e         (G3: identity)
>   = b·(a·c)     (substitute a·c = e)
>   = (b·a)·c     (G2: associativity)
>   = e·c          (G4: b·a = e, since b is an inverse of a)
>   = c            (G3: identity)

**Step 3 — Concrete check.**
> In (ℤ,+): if 3 + b = 0 and 3 + c = 0, then b = 0 − 3 = −3 and c = 0 − 3 = −3 = b ✓.

**Exit:** Return to TA-A01 P49 checkpoint.

---

### TB-R02 · Repair: PRODUCT-INVERSE-WRONG-ORDER (MC-2)

**Trigger:** Student writes (a·b)⁻¹ = a⁻¹·b⁻¹.

**Step 1 — Concrete matrix counterexample.**
> Compute A = [[2,1],[1,1]], B = [[1,1],[0,1]].
> AB = [[2,3],[1,2]].  (AB)⁻¹ = [[2,−3],[−1,2]].
> A⁻¹B⁻¹ = [[1,−1],[−1,2]]·[[1,−1],[0,1]] = [[1,−2],[−1,3]].
> [[1,−2],[−1,3]] ≠ [[2,−3],[−1,2]].  **The wrong-order formula fails.**

**Step 2 — Show the correct order works.**
> B⁻¹A⁻¹ = [[1,−1],[0,1]]·[[1,−1],[−1,2]] = [[2,−3],[−1,2]] = (AB)⁻¹. ✓

**Step 3 — Reinforce the "shoes and socks" mnemonic.**
> To put on shoes-then-socks: first shoes, then socks.  To undo: remove socks (last on) first,
> then shoes (first on).  The inverse of the composite reverses the order.

**Exit:** Return to TA-A02 P49 checkpoint.

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "In a group, what is (a·b·c)⁻¹? State T2 applied twice."
    Target: c⁻¹·b⁻¹·a⁻¹. PASS if correct order stated.

  Interval-2 (+3 days):
    Probe: "In (GL₂(ℝ), ×), if (AB)⁻¹ = C, what is B⁻¹A⁻¹? What is (A⁻¹)⁻¹?"
    Target: B⁻¹A⁻¹ = C (= (AB)⁻¹); (A⁻¹)⁻¹ = A (T3). PASS if both correct.

  Interval-3 (+1 week):
    Probe: "Does every group element have a unique inverse? Cite the theorem and its proof idea."
    Target: Yes. Uniqueness (T1): if a·b = e and a·c = e, then b = (b·a)·c = e·c = c.
            PASS if the associativity step cited.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A01 (uniqueness) or TA-A02 (product-inverse).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.abst.group-theory:
    Used in:   TA-A01 (invokes G2, G3, G4 explicitly in the uniqueness proof; student
               is expected to name axioms by number), TA-A02 (G4 is the definition of
               inverse used in product-inverse proof; G2 cited for (b·a)·c step).
    Assumed:   Student holds G1–G4 and can identify which axiom justifies each step in
               a group-theoretic calculation.

UNLOCKS_ENABLED:
  (none — this is a terminal node for the math.abst.group-inverse subtopic)

CROSS_LINKS_NOTED:
  math.linalg.matrix-inverse:
    Status:    Tier 1 concept — P76 uses a cross-link probe.
    P76 probe: Student computes (AB)⁻¹ and B⁻¹A⁻¹ for specific 2×2 matrices, verifying
               that the group-theoretic formula T2 matches the linear-algebra matrix-inverse.
    Bridge:    The group inverse in GL_n(ℝ) is exactly the matrix inverse.  T2 in groups
               explains WHY (AB)⁻¹ = B⁻¹A⁻¹ in linear algebra — it is not a matrix-specific
               formula but a consequence of the universal group-inverse theorem.
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. This is a proof-heavy 1-hour concept.**
All three theorems (T1, T2, T3) are short proofs using only G2, G3, G4.  At bloom=understand,
the student needs to reproduce the proof steps and identify which axiom justifies each step,
not just state the conclusions.

**2. MC-2 is hidden in abelian groups.**
Students who have only worked in (ℤ,+) or (ℝ\{0},×) never see the wrong-order formula fail
because commutativity makes both orders equal.  The GL₂(ℝ) example in TA-A02 is the minimal
concrete counterexample — exactly what the P76 cross-link probe also exploits.

**3. T3 follows from T1 immediately.**
Many students re-derive double-inverse by solving (a⁻¹)⁻¹ = x → a⁻¹·x = e.  This is valid
but longer.  The elegant path is: "a is an inverse of a⁻¹; by T1 it is THE inverse."

**4. Q4 catches nuance.**
The question asks whether (a·b)⁻¹ = a⁻¹·b⁻¹ is EVER possible in a non-abelian group.
The answer "yes, when a and b commute" is the target — not "no, never."  This distinguishes
understanding from memorising the general formula.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.abst.group-inverse
===============================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 4; 3 TAs used ≤ 4. ✓
[PASS] V-4   CPA_ENTRY_STAGE = A (purely algebraic proofs; no concrete manipulation needed).
[PASS] V-5   P76_MODE = Cross-link with explicit rationale (math.linalg.matrix-inverse Tier 1).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A01 before TA-A02.
[PASS] V-7   MC-1 addressed by uniqueness proof in TA-A01 (P11 + P49).
[PASS] V-8   MC-2 addressed in TA-A02 (P06 contrast with GL₂(ℝ) counterexample).
[PASS] V-9   Both MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P11 ✓  TA-A02→P06 ✓  TA-A03→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49. TA-A01→P49 ✓  TA-A02→P49 ✓
[PASS] V-12  GR-3: Terminal TA (TA-A03) is a mastery gate containing P91.
[PASS] V-13  GR-4: P91 terminal in TA-A03 with correct compound
               P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-14  GR-5: P76 included inside P91 in the mastery gate.
[PASS] V-15  GR-6: Cross-link math.linalg.matrix-inverse documented in Component 7.
[PASS] V-16  GR-9: P76 uses Cross-link mode; probe verifies T2 concretely in GL₂(ℝ).
[PASS] V-17  GR-10: MAMR stated; MC-1 cleared at TA-A01 before TA-A02.

PASS CRITERION
[PASS] V-18  PASS_CRITERION = ⌈0.95 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-19  P74 routing covers all score outcomes (5/5 → pass; ≤4/5 → item-specific repair).
[PASS] V-20  P77 contains exactly 4 questions. ✓ (V-13)

CONTENT
[PASS] AIR   Uniqueness of inverse (T1), product-inverse formula T2: (ab)⁻¹=b⁻¹a⁻¹, and
             double-inverse T3: (a⁻¹)⁻¹=a all stated and proved.  GL₂(ℝ) concrete example
             for T2.  MC-2 counterexample via explicit 2×2 matrix calculation.
             P76 cross-link: (AB)⁻¹ vs B⁻¹A⁻¹ vs A⁻¹B⁻¹ computed for A=[[2,1],[1,1]],
             B=[[1,1],[0,1]], confirming the group-theoretic formula.

VERDICT: PACKAGE_READY
```

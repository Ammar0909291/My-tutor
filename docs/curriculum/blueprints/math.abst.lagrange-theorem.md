# Teaching Blueprint — math.abst.lagrange-theorem

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.abst.lagrange-theorem
KG_FIELDS:
  difficulty:        advanced
  bloom:             understand
  mastery_threshold: 0.90
  estimated_hours:   3
  requires:          [math.abst.coset]
  unlocks:           []
  cross_links:       []

SESSION_TA_CAP:      5   (estimated_hours = 3 → ≥1h band → cap 5)
CPA_ENTRY_STAGE:     C   (coset partitioning is concretely visible in Z/6Z before the abstract proof)
P76_MODE:            Independence
  rationale:         cross_links = []; P76 independence probe applies Lagrange to determine
                     which group orders can and cannot contain elements of given orders —
                     a novel inference problem not directly encountered in the teaching sequence.
PASS_CRITERION:      ⌈0.90 × 5⌉ = 5 out of 5
  composition:       4 P77 questions + 1 P76 independence probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
**Lagrange's Theorem:** Let G be a finite group and H a subgroup of G.  Then |H| divides |G|.
Moreover, |G| = |H| · [G:H] where [G:H] = number of distinct left cosets of H in G.

**Proof structure:**
1. Left cosets partition G: for any g₁, g₂ ∈ G, either g₁H = g₂H or g₁H ∩ g₂H = ∅.
2. Every coset has the same size |H|.
3. Therefore |G| = (number of distinct cosets) · |H| → |H| | |G|.

**Key corollaries:**
- **C1:** The order of every element divides |G|.
  (Since ⟨g⟩ is a subgroup of order ord(g), Lagrange gives ord(g) | |G|.)
- **C2:** Every group of prime order p is cyclic (isomorphic to Z/pZ).
  (Any non-identity element g has ord(g) | p, so ord(g) = p → g generates G.)
- **C3:** In a group of order n, gⁿ = e for every g ∈ G.
  (Since ord(g) | n, we have gⁿ = (g^{ord(g)})^{n/ord(g)} = e^{n/ord(g)} = e.)

### Distinction from math.abst.coset
`math.abst.coset` introduced left cosets aH, proved the partition property, and defined the
index [G:H].  This blueprint uses those results as the premise of Lagrange's proof and focuses
on the theorem's statement, proof, and corollaries.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Z/6Z: cosets of H = {0,2,4} (index 2); cosets of H = {0,3} (index 3) |
| **Pictorial (P)** | Partition diagram: G = H ∪ 1+H with each piece the same size |
| **Abstract (A)** | Lagrange proof via partition + equal-size cosets; corollaries C1–C3 |

### Coset Partition Example (Z/6Z, H = {0, 2, 4})
|H| = 3.  Cosets:
- 0 + H = {0, 2, 4}
- 1 + H = {1, 3, 5}
Two cosets, each of size 3.  |G| = 6 = 3 × 2 = |H| × [G:H]. ✓

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | LAGRANGE-CONVERSE-TRUE | Claims "if d divides |G|, then G has a subgroup of order d" | Confuses the theorem with its converse; the converse is FALSE in general (A₄ has order 12 but no subgroup of order 6) | **FOUNDATIONAL** |
| MC-2 | COSET-OVERLAP-POSSIBLE | Thinks two different cosets might share an element | Didn't absorb the coset partition property from the prerequisite; doesn't see that shared element ⟹ equal cosets | Secondary |
| MC-3 | COROLLARY-OVERSHOOT | Applies C2 (prime-order cyclic) to non-prime group orders | Misreads C2 as "G of order n is cyclic"; it only applies when n is prime | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A01 gate; MC-2 and MC-3 addressed in TA-A02
and TA-A03.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P11: coset partition of Z/6Z; equal-size cosets visualised + P49)
      → TA-A02 (P04: gallery of Lagrange applications — valid/invalid subgroup orders + P49)
      → TA-A03 (P06: Lagrange vs converse; prime-order groups cyclic + P49)
      → TA-A04 (P91 terminal mastery gate)

Repair (Protocol B):
  MC-1 → TB-R01 (A₄ counterexample: order 12, no subgroup of order 6)
  MC-2 → TB-R02 (coset partition proof: shared element implies equal cosets)
  MC-3 → TB-R03 (C2 applies only to prime order; construct D₃ (order 6, not prime, not cyclic))
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Coset Partition → Lagrange Proof (P11 + P49)

**[P11 — REPRESENTATION SHIFT]**

Four representations of Lagrange's theorem for H = {0, 3} in Z/6Z:

| Representation | Content |
|----------------|---------|
| **Verbal** | "Z/6Z is cut into equal-size pieces; each piece has the same 2 elements as H" |
| **Symbolic** | Cosets: 0+H = {0,3}; 1+H = {1,4}; 2+H = {2,5}; three cosets, each size 2 |
| **Partition** | Z/6Z = {0,3} ⊔ {1,4} ⊔ {2,5} — disjoint union of 3 equal pieces |
| **Division** | |G| = 6 = 2 × 3 = |H| × [G:H]; so |H| = 2 divides |G| = 6 ✓ |

**Proof steps:**
1. (From coset blueprint) Cosets are either equal or disjoint — they partition G.
2. Map φ: H → aH by φ(h) = ah.  φ is a bijection (left-multiply by a is a bijection on G).
   So every coset has size |H|.
3. Count: if there are k distinct cosets, then |G| = k·|H| → |H| | |G|.

**[P49 — ADAPTIVE CHECKPOINT]**

> G = D₃ (order 6).  H = {e, r, r²} (rotations, order 3).
> (i) List the distinct left cosets of H in D₃.
> (ii) Verify |G| = |H| × [G:H].

Expected:
*(i) eH = {e, r, r²}; sH = {s, sr, sr²} = {s, rs·r·r, r²s}... actually sH = {s·e, s·r, s·r²} = {s, sr, sr²}.
 Two cosets: {e,r,r²} and {s,sr,sr²}. [G:H] = 2.*
*(ii) |D₃| = 6 = 3 × 2 = |H| × [G:H]. ✓*

- **CORRECT** (two cosets; product formula verified): ✓ Advance to TA-A02.
- **PARTIAL — three cosets listed (overlap error)**: MC-2 active. Route TB-R02. Return.
- **PARTIAL — (ii) wrong arithmetic**: Walk through 3 × 2 = 6. Return.
- **NO_RESPONSE**: Scaffold "(i) Start with eH. Then pick s (not in eH) and list sH = {s·e, s·r, s·r²}. Any other elements remaining?"

---

### TA-A02 · Gallery: Valid and Invalid Subgroup Orders (P04 + P49)

**[P04 — PATTERN INDUCTION]**

Pattern: which values of d can be the order of a subgroup of G?

| Group G | |G| | Divisors of |G| | Possible |H| | Note |
|---------|-----|----------------|--------------|------|
| Z/12Z | 12 | 1,2,3,4,6,12 | All six | Cyclic → has subgroup of each order |
| Z/6Z | 6 | 1,2,3,6 | {1,2,3,6} | Cyclic → has subgroup of each order |
| D₃ | 6 | 1,2,3,6 | Only {1,2,3,6} possible | Has subgroups of orders 1,2,3,6 ✓ |
| A₄ | 12 | 1,2,3,4,6,12 | 6 is a divisor BUT | **No subgroup of order 6!** (converse fails) |

**Key pattern:** Lagrange says |H| | |G| is NECESSARY.  It is NOT sufficient.
Possible subgroup order ⟹ divisor of |G|.  Divisor of |G| ⟹ subgroup of that order. (Only in cyclic and a few special groups.)

**[P49 — ADAPTIVE CHECKPOINT]**

> A group G has order 20.  Answer TRUE/FALSE with a one-line reason:
> (i) G can have a subgroup of order 6.
> (ii) G can have a subgroup of order 5.
> (iii) Every element of G satisfies g²⁰ = e.

Expected:
*(i) FALSE — 6 does not divide 20 (20 = 4×5; 6∤20). By Lagrange, no subgroup of order 6 exists.*
*(ii) TRUE — 5|20. Lagrange allows it (but doesn't guarantee it).*
*(iii) TRUE — By Corollary C3: ord(g)|20, so g²⁰ = (g^{ord(g)})^{20/ord(g)} = e.*

- **CORRECT** (all three): ✓ Advance to TA-A03.
- **PARTIAL — (iii) wrong**: Revisit corollary C3. Return.
- **PARTIAL — (i) says TRUE**: MC-3 or MC-1. Ask "does 6 divide 20?" Route TB-R01. Return.
- **NO_RESPONSE**: Scaffold "(i) Does 6 divide 20? List divisors of 20: 1,2,4,5,10,20."

---

### TA-A03 · Lagrange vs Converse; Prime-Order Groups (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Lagrange (TRUE):** |H| | |G| for any subgroup H of G.
> If d does NOT divide |G|, then G has NO subgroup of order d — guaranteed.
> Example: D₃ (order 6) has no subgroup of order 4 (4∤6). ✓

**Converse of Lagrange (FALSE):** If d | |G|, G has a subgroup of order d.
> COUNTEREXAMPLE: A₄ (alternating group on 4 elements, |A₄| = 12).
> 6 | 12, but A₄ has NO subgroup of order 6.
> (Proof sketch: any order-6 subgroup would be normal of index 2, but A₄ has only even permutations
> and the normal subgroup structure prevents this — advanced, stated not proved here.)
> Moral: Lagrange gives a necessary condition, NOT a sufficient one.

**Corollary C2 — Prime-order groups (TRUE):**
> If |G| = p (prime), then G ≅ Z/pZ.
> Proof: pick any g ≠ e.  ord(g) | p; since p is prime, ord(g) = 1 or p.  ord(g) = 1 ↔ g = e.
> So ord(g) = p → ⟨g⟩ = G → G is cyclic of order p ≅ Z/pZ.

**NOT corollary C2 (common overreach):** "If |G| = n (not prime), then G ≅ Z/nZ."
> COUNTEREXAMPLE: |D₃| = 6, but D₃ ≇ Z/6Z (D₃ is non-abelian; Z/6Z is abelian).
> C2 applies ONLY when n is prime.

**[P49 — ADAPTIVE CHECKPOINT]**

> True or False? Justify:
> (i) Every group of order 7 is cyclic.
> (ii) Every group of order 6 is cyclic.

Expected:
*(i) TRUE — 7 is prime → C2 applies → every group of order 7 ≅ Z/7Z (cyclic).*
*(ii) FALSE — D₃ has order 6 and is non-abelian, hence not cyclic.  C2 does not apply to 6 (not prime).*

- **CORRECT** (TRUE with prime reason; FALSE with D₃ counterexample): ✓ Advance to TA-A04.
- **PARTIAL — (ii) says TRUE**: MC-3 active. Route TB-R03. Return.
- **PARTIAL — (i) says FALSE**: Hasn't absorbed C2. Route TB-R01 (prime case). Return.
- **NO_RESPONSE**: Scaffold "(i) Is 7 prime? Apply C2. (ii) Is 6 prime? Find a non-cyclic group of order 6."

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** State and prove Lagrange's Theorem.
*(Statement: |H| | |G| for any subgroup H ≤ G (finite).
 Proof: Cosets partition G (from coset theory). Each coset has size |H| (left multiplication by a
 is a bijection H → aH). If there are k cosets, |G| = k|H|, so |H| | |G|. ✓)*

**Q2.** G has order 35.  What are the possible orders of subgroups?  Possible element orders?
*(Divisors of 35 = {1, 5, 7, 35}. Possible subgroup orders: 1, 5, 7, 35. Element orders must
 also divide 35: same set {1, 5, 7, 35}.)*

**Q3.** Prove: in a group of order p (prime), every non-identity element generates the whole group.
*(Let g ≠ e. ord(g) | p; since p prime, ord(g) ∈ {1, p}. ord(g)=1 ↔ g=e (contradiction). So
 ord(g)=p → ⟨g⟩ has p elements = |G| → ⟨g⟩ = G. ✓)*

**Q4.** Does there exist a group of order 6 with no element of order 6?  Justify.
*(Yes — D₃ has order 6 and all element orders are 1, 2, or 3 (maximum 3). No element generates
 all of D₃ (not cyclic). Lagrange says orders must divide 6; {1,2,3} all divide 6 ✓.)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independence probe: applies Lagrange to constrain group structure.*

> A group G has order 21.
>
> (i) List all possible orders of proper subgroups (not trivial, not G itself).
> (ii) List all possible orders of elements (including e and non-identity).
> (iii) G has an element g with g³ = e but g ≠ e.  Can G have an element h with h⁷ = e but h ≠ e?  Can both g and h exist simultaneously?
> (iv) Is G necessarily cyclic?  Why or why not?

*Expected answers:*
- **(i)** Divisors of 21 = {1, 3, 7, 21}.  Proper non-trivial: {3, 7}.
- **(ii)** Element orders: divisors of 21 = {1, 3, 7, 21}.
- **(iii)** Yes to both — ord(g)=3 (divides 21 ✓) and ord(h)=7 (divides 21 ✓).  Both can exist.
- **(iv)** Not necessarily.  21 is not prime (21 = 3×7), so C2 doesn't apply.  If G has an element
  of order 21, then G is cyclic; but G could have only elements of orders 1, 3, 7 and still be a
  group of order 21 (e.g., Z/3Z × Z/7Z ≅ Z/21Z in this case — actually Z/21Z since gcd(3,7)=1 — but
  in general non-abelian groups of order 21 exist).  [Acceptable answer: "not necessarily; 21 is not prime."]

**[P55 — SCORE]**  Award 1 point for P76 if (i)+(ii) correct and (iv) reasoned; 0 otherwise.

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
  - Q1 wrong → revisit TA-A01 proof sketch; TB-R02 for coset partition step if needed.
  - Q2 wrong → revisit divisors of 35; apply Lagrange systematically.
  - Q3 wrong → revisit C2 in TA-A03 P64.
  - Q4 wrong → MC-3 → TB-R03 (D₃ counterexample).
  - P76 wrong → identify which part; route to TA-A02/TA-A03 as appropriate.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.abst.lagrange-theorem
MASTERY_REACHED: true
UNLOCKS:         (none — lateral enrichment)
NEXT_CONCEPT:    (instructor-directed: math.abst.group-isomorphism or sylow-theorems)
SESSION_CLOSE:   "Lagrange's theorem: |H| always divides |G|. The proof uses the fact that
                  cosets partition G into equal-size pieces. Key corollaries: element orders
                  divide |G|; prime-order groups are cyclic; gⁿ=e for all g. The converse
                  is FALSE — divisibility of |G| by d does not guarantee a subgroup of order d."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: LAGRANGE-CONVERSE-TRUE (MC-1)

**Trigger:** Student says every divisor of |G| gives a subgroup.

**Step 1 — State the theorem precisely.**
> Lagrange (THEOREM, one direction only): H ≤ G ⟹ |H| | |G|.
> Converse (NOT a theorem): d | |G| ⟹ ∃ subgroup of order d.  This is FALSE.

**Step 2 — Counterexample: A₄.**
> A₄ (even permutations of 4 elements): |A₄| = 12.  6 | 12.
> BUT A₄ has NO subgroup of order 6. (Accepted without full proof.)
> Lagrange's theorem gives only a necessary condition.

**Exit:** Return to TA-A03 P49 checkpoint.

---

### TB-R02 · Repair: COSET-OVERLAP-POSSIBLE (MC-2)

**Trigger:** Student thinks two different cosets can share an element.

**Step 1 — Coset partition from prerequisite.**
> Recall: if g₁H and g₂H share any element (say g₁h₁ = g₂h₂ for some h₁,h₂ ∈ H), then
> g₁⁻¹g₂ = h₁h₂⁻¹ ∈ H → g₁H = g₂H.  Distinct cosets have NO overlap.

**Step 2 — Verify in Z/6Z.**
> H = {0,3}. Coset 1+H = {1,4}. Coset 2+H = {2,5}.  No overlap with each other or H. ✓

**Exit:** Return to TA-A01 P49 checkpoint.

---

### TB-R03 · Repair: COROLLARY-OVERSHOOT (MC-3)

**Trigger:** Student applies prime-order corollary to non-prime group orders.

**Step 1 — State C2 precisely.**
> C2: If |G| = p is PRIME, then G ≅ Z/pZ (cyclic).
> This only holds for prime order.  It does NOT say "if |G| = n then G ≅ Z/nZ."

**Step 2 — Counterexample for non-prime order.**
> |D₃| = 6 (not prime).  D₃ is NOT cyclic (non-abelian).  Z/6Z IS cyclic (abelian).
> Same order (6), different groups.  Non-prime order → C2 fails to apply.

**Step 3 — Correct the rule.**
> Prime order → exactly one group up to isomorphism (Z/pZ).
> Composite order → multiple non-isomorphic groups may exist (e.g., order 6: Z/6Z and D₃).

**Exit:** Return to TA-A03 P49 checkpoint.

---

<!-- COMPONENT 6: P89 Spaced Repetition -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "A group of order 15 has a subgroup of order 5. Which theorem guarantees this is possible?"
    Target: Lagrange allows it (5|15), but doesn't guarantee it. Answer should mention Lagrange
            as the necessary condition, and note the converse is not guaranteed. PASS if Lagrange cited.

  Interval-2 (+3 days):
    Probe: "Is every group of order 11 cyclic? Why?"
    Target: Yes — 11 is prime → C2: every group of prime order is cyclic ≅ Z/11Z.
            PASS if prime cited and C2 applied.

  Interval-3 (+1 week):
    Probe: "Can a group of order 10 have a subgroup of order 4? Element of order 4?"
    Target: Subgroup of order 4: No — 4∤10. Element of order 4: No (same reason: ord(g)|10,
            divisors of 10 = {1,2,5,10}, 4 not among them). PASS if both with divisibility reason.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (divisor gallery) or TA-A03 (converse).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.abst.coset:
    Used in:   TA-A01 (coset partition property; equal-size bijection; index [G:H] — all from
               coset blueprint used directly in the Lagrange proof), TA-A02 (subgroup notation
               H ≤ G and order |H| assume coset fluency), TA-A03 (normal subgroup and index
               mentioned briefly in A₄ counterexample).
    Assumed:   Student holds: definition of left coset aH; proof that cosets partition G; the
               left-multiplication bijection H → aH; the index [G:H]; coset definition H ≤ G.

UNLOCKS_ENABLED:
  (none — terminal node for Lagrange; conceptually feeds Sylow theorems via group-order)

CROSS_LINKS_NOTED:
  (none — cross_links = [])
  P76 independence probe applies Lagrange to a group of order 21 (= 3×7).
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. The coset prerequisite does the heavy lifting.**
The entire proof of Lagrange reduces to two facts from the coset blueprint: (a) cosets partition
G, and (b) every coset has the same size |H|.  Students who hold these facts can reproduce the
proof in 3 lines.  Spend TA-A01 confirming these prerequisites are solid before proceeding.

**2. MC-1 (converse true) is the dominant long-term error.**
Students remember "subgroup orders divide group order" and incorrectly infer "any divisor gives
a subgroup."  The A₄ counterexample (order 12, no subgroup of order 6) is the standard reference
point.  Stating the counterexample without full proof is sufficient at this level.

**3. Corollary C2 is powerful but scoped.**
The prime-order corollary (C2) is arguably the most elegant consequence of Lagrange at this
level.  Its proof is 2 lines.  But its scope is strict — it applies only when |G| is prime.
Students should be able to cite both the theorem and its scope boundary.

**4. Q4 requires holding two ideas simultaneously.**
A group of order 6 with no element of order 6 (= D₃) shows that the divisibility rule (orders
1,2,3 all divide 6) is consistent with non-cyclicity.  This prepares students for the Sylow
theory distinction between "possible order" and "realised order."

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.abst.lagrange-theorem
===================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 5; 4 TAs used ≤ 5. ✓
[PASS] V-4   CPA_ENTRY_STAGE = C (Z/6Z coset partition as concrete anchor).
[PASS] V-5   P76_MODE = Independence (no cross_links; order-21 novel inference).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A03 gate.
[PASS] V-7   MC-1 surfaced via TA-A02 P49 and TA-A03 P06; TB-R01 route.
[PASS] V-8   MC-2 and MC-3 addressed in TA-A01 and TA-A03; repair chains present.
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P11 ✓  TA-A02→P04 ✓  TA-A03→P06 ✓  TA-A04→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49. TA-A01→P49 ✓  TA-A02→P49 ✓  TA-A03→P49 ✓
[PASS] V-12  GR-3: Terminal TA (TA-A04) is a mastery gate containing P91.
[PASS] V-13  GR-4: P77 contains exactly 4 questions. ✓
[PASS] V-14  GR-5: P91 terminal with correct compound P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-15  GR-6: P76 included inside P91.
[PASS] V-16  GR-9: P76 Independence — group of order 21; novel Lagrange application.
[PASS] V-17  GR-10: MAMR stated; MC-1 addressed before gate.

PASS CRITERION
[PASS] V-18  PASS_CRITERION = ⌈0.90 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-19  P74 routing covers all score outcomes.

CONTENT
[PASS] AIR   Lagrange's Theorem stated and proved (coset partition + equal-size bijection).
             Corollaries C1 (element orders divide |G|), C2 (prime-order → cyclic), C3 (gⁿ=e).
             Converse FALSE (A₄ counterexample). MC-1/MC-2/MC-3 all addressed.
             P76 independence: order-21 group; possible element orders; non-prime → not necessarily cyclic.

VERDICT: PACKAGE_READY
```

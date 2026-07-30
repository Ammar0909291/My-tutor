# Teaching Blueprint — math.abst.group-isomorphism

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.abst.group-isomorphism
KG_FIELDS:
  difficulty:        advanced
  bloom:             analyze
  mastery_threshold: 0.85
  estimated_hours:   4
  requires:          [math.abst.group-homomorphism]
  unlocks:           []
  cross_links:       []

SESSION_TA_CAP:      6   (estimated_hours = 4 → cap 6)
CPA_ENTRY_STAGE:     A   (isomorphism is a purely structural-algebraic criterion; abstract
                          treatment from first principles, with Cayley-table comparison as
                          pictorial layer)
P76_MODE:            Independence
  rationale:         cross_links = []; P76 probe uses structural invariants to prove
                     Z/4Z ≇ V₄ — independent reasoning within group theory.
PASS_CRITERION:      ⌈0.85 × 5⌉ = 5 out of 5
  composition:       4 P77 questions + 1 P76 independence probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
A **group isomorphism** φ: G → H is a **bijective group homomorphism**: a map satisfying
(I1) φ(a·b) = φ(a)·φ(b) for all a, b ∈ G (homomorphism condition);
(I2) φ is injective (one-to-one); (I3) φ is surjective (onto).
Two groups G and H are **isomorphic** (written G ≅ H) if such a φ exists.
Isomorphic groups are structurally identical — they differ only in the labeling of elements.
Properties **preserved** by isomorphisms: order of the group, element orders, abelian property,
cyclic property, number of elements of each order, number of subgroups of each order.

### Distinction from math.abst.group-homomorphism
The prerequisite established that a homomorphism φ: G → H satisfies φ(ab) = φ(a)φ(b) but may
collapse structure (e.g., the trivial map). An isomorphism requires bijection — no collapse,
no gaps — so both groups are structurally the same.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Z/4Z vs {1, i, −1, −i} ≅ via n ↦ iⁿ; counting element orders |
| **Pictorial (P)** | Cayley-table comparison; matching entry patterns |
| **Abstract (A)** | Bijective homomorphism definition; structural invariants as obstructions |

### Prerequisite Knowledge (from KG)
- **math.abst.group-homomorphism** — homomorphism condition φ(ab) = φ(a)φ(b); kernel; image;
  the homomorphism preserves identity and inverses

### Canonical Examples
| Isomorphism | φ | Key Check |
|:------------|:--|:----------|
| (Z/4Z, +) ≅ ({1,i,−1,−i}, ×) | φ(n) = iⁿ | φ(m+n) = i^(m+n) = iᵐ·iⁿ = φ(m)·φ(n) ✓; bijection ✓ |
| (Z/2Z, +) ≅ ({1,−1}, ×) | φ(0)=1, φ(1)=−1 | φ(0+0)=1=1·1 ✓; bijection ✓ |
| Z/4Z ≇ V₄ = Z/2Z×Z/2Z | — | Z/4Z has element of order 4; V₄ does not |

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | SAME-SIZE-MEANS-ISOMORPHIC | Claims Z/4Z ≅ V₄ because both have 4 elements | Confuses bijection of sets with isomorphism of groups; ignores the homomorphism condition and structural invariants | **FOUNDATIONAL** |
| MC-2 | ANY-BIJECTION-IS-ISOMORPHISM | Proposes a bijection φ: G → H without checking φ(ab) = φ(a)φ(b) | Forgets that isomorphism = bijection + homomorphism; treats it as a purely set-theoretic notion | Secondary |
| MC-3 | ISOMORPHISM-PRESERVES-LABELS | Thinks isomorphic groups share the same element names or operation symbol | Conflates structural sameness with identical representation; doesn't see that G ≅ H means relabeling, not identity | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate before TA-A03.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P11 four representations: Z/4Z ≅ {1,i,−1,−i} + P49)
      → TA-A02 (P41/P64 MC-1 gate: structural invariants distinguish non-isomorphic
                 groups even of the same order + P49)
      → TA-A03 (P06 contrast: bijection alone is not enough; homomorphism condition required + P49)
      → TA-A04 (P91 terminal mastery gate — P76 independence probe)

Repair (Protocol B):
  MC-1 → TB-R01 (structural invariant table; element orders of Z/4Z vs V₄)
  MC-2 → TB-R02 (verify φ(ab) = φ(a)φ(b) for a proposed bijection; counterexample)
  MC-3 → TB-R03 (isomorphism is relabeling; same group up to renaming of elements)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: Defining and Constructing an Isomorphism (P11 + P49)

**[P11 — REPRESENTATION SHIFT]**

Four representations of the isomorphism φ: (Z/4Z, +) → ({1, i, −1, −i}, ×), φ(n) = iⁿ:

| Representation | Statement |
|----------------|-----------|
| **Verbal** | "Every element of Z/4Z maps to a distinct power of i, and powers of i multiply as addition mod 4 predicts" |
| **Symbolic** | φ: n ↦ iⁿ; φ(m+n) = i^(m+n) = iᵐ · iⁿ = φ(m) · φ(n) |
| **Table** | Z/4Z elements {0,1,2,3} ↔ {1, i, −1, −i}; addition mod 4 ↔ complex multiplication |
| **Structural** | Both groups are cyclic of order 4; generator 1 in Z/4Z ↔ generator i in {1,i,−1,−i} |

Verification that φ is an isomorphism:
- **Homomorphism (I1):** φ(m + n) = i^(m+n) = iᵐ · iⁿ = φ(m) · φ(n) ✓
- **Injective (I2):** If iᵐ = iⁿ then m ≡ n (mod 4) ✓ (distinct powers of i are distinct)
- **Surjective (I3):** Every element {1, i, −1, −i} = {i⁰, i¹, i², i³} is hit ✓

So Z/4Z ≅ {1, i, −1, −i} — two different-looking groups that are structurally identical.

**[P49 — ADAPTIVE CHECKPOINT]**

> Let φ: (Z/3Z, +) → ({1, ω, ω²}, ×) where ω = e^(2πi/3) is a primitive cube root of unity,
> defined by φ(n) = ωⁿ.
> (i) Verify the homomorphism condition: show φ(m + n) = φ(m) · φ(n).
> (ii) Is φ a bijection?

Expected:
*(i) φ(m+n) = ω^(m+n) = ωᵐ · ωⁿ = φ(m)·φ(n) ✓.*
*(ii) φ maps {0,1,2} → {ω⁰=1, ω¹=ω, ω²=ω²}, which are all distinct, so bijection. ✓
Therefore Z/3Z ≅ {1,ω,ω²} under multiplication.*

- **CORRECT** (both parts): ✓ Advance to TA-A02.
- **PARTIAL** (homomorphism correct, bijection not justified): Ask "Are 1, ω, ω² all distinct? How do you know?" Return.
- **INCORRECT** (homomorphism wrong): TB-R02 step 1. Return.
- **NO_RESPONSE**: Scaffold "Compute φ(m)·φ(n) = ωᵐ·ωⁿ = ω^(?)."

---

### TA-A02 · MC-1 Gate: Structural Invariants Distinguish Non-Isomorphic Groups (P41 + P64 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> Are Z/4Z and V₄ = Z/2Z × Z/2Z isomorphic? Both have order 4.

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

**No.** |Z/4Z| = |V₄| = 4, but same order is necessary, not sufficient.

**Structural invariant: element orders.**

| Group | Element | Order |
|-------|---------|-------|
| Z/4Z | 0 | 1 |
| | 1 | 4 |
| | 2 | 2 |
| | 3 | 4 |
| V₄ = {e,(12)(34),(13)(24),(14)(23)} | e | 1 |
| | (12)(34) | 2 |
| | (13)(24) | 2 |
| | (14)(23) | 2 |

Z/4Z has elements of order 4; V₄ has **no element of order 4**.
An isomorphism must preserve element orders (if φ is an isomorphism and ord(g) = k, then ord(φ(g)) = k).
Therefore: if Z/4Z ≅ V₄, the image of a generator of Z/4Z (order 4) would have order 4 in V₄.
But V₄ has no such element. **Contradiction. Z/4Z ≇ V₄.**

The general principle: **isomorphic groups have identical multisets of element orders**.
If one group has more elements of order k than the other, they are not isomorphic.

MC-1 cleared. Do not revisit.

**[P49 — ADAPTIVE CHECKPOINT]**

> Are Z/6Z and S₃ isomorphic? Both have order 6.
> Use element orders to decide.

Expected:
*Z/6Z: element orders {1,6,2,3,2,3} (generator 1 has order 6). Z/6Z is cyclic, has element of order 6.*
*S₃: element orders {1,2,2,2,3,3} (transpositions have order 2; 3-cycles have order 3). No element of order 6.*
*S₃ has no element of order 6, so S₃ ≇ Z/6Z.*

- **CORRECT**: ✓ Advance to TA-A03.
- **PARTIAL** (right conclusion, incomplete order computation): "Which element of Z/6Z has order 6?" Return.
- **INCORRECT**: TB-R01. Return.
- **NO_RESPONSE**: Scaffold "List the element orders of Z/6Z by computing n+n+…+n = 0 for smallest n."

---

### TA-A03 · A Bijection Is Not Enough: The Homomorphism Condition (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Contrast A — A bijection that fails the homomorphism condition:**

Let G = (Z/4Z, +) and H = ({1, i, −1, −i}, ×).
Define ψ: Z/4Z → H by ψ(0)=1, ψ(1)=−1, ψ(2)=i, ψ(3)=−i.
ψ is a bijection (each element maps to a distinct target). But:
ψ(1+1) = ψ(2) = i.   ψ(1)·ψ(1) = (−1)·(−1) = 1.
i ≠ 1. **ψ is NOT a homomorphism, so NOT an isomorphism.**

**Contrast B — The correct isomorphism φ:**
φ(0)=1, φ(1)=i, φ(2)=−1, φ(3)=−i.
φ(1+1) = φ(2) = −1.   φ(1)·φ(1) = i·i = i² = −1. ✓
φ respects the group operation; ψ does not.

> **Key message:** Isomorphism = bijection + homomorphism. Bijection alone only says the sets
> have the same size. The homomorphism condition φ(ab) = φ(a)φ(b) is what makes the two groups
> structurally identical.

**[P49 — ADAPTIVE CHECKPOINT]**

> Consider φ: (Z/2Z, +) → ({1,−1}, ×) with φ(0)=1, φ(1)=−1.
> (i) Verify φ(a+b) = φ(a)·φ(b) for all a,b ∈ Z/2Z (check all 4 pairs).
> (ii) Is φ an isomorphism?

Expected:
*(i) 0+0=0: φ(0)=1, φ(0)φ(0)=1·1=1 ✓. 0+1=1: φ(1)=−1, φ(0)φ(1)=1·(−1)=−1 ✓.
    1+0=1: same as above ✓. 1+1=0: φ(0)=1, φ(1)φ(1)=(−1)(−1)=1 ✓.*
*(ii) φ is a bijection ({0,1}↔{1,−1}) and a homomorphism — so yes, Z/2Z ≅ {1,−1}.*

- **CORRECT**: ✓ Advance to TA-A04.
- **PARTIAL** (misses the 1+1 case): "What is 1+1 in Z/2Z? What is φ(1)·φ(1)?" Return.
- **INCORRECT**: TB-R02. Return.
- **NO_RESPONSE**: Scaffold "For each pair (a,b) ∈ {(0,0),(0,1),(1,0),(1,1)}, compute a+b mod 2, then φ(a+b), then φ(a)·φ(b) and compare."

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** Define group isomorphism. State which two properties a map φ: G → H must satisfy.

*(Target: φ must be (1) a group homomorphism — φ(ab) = φ(a)φ(b) — and (2) a bijection. Both required.)*

**Q2.** Show that Z/4Z ≇ Z/2Z × Z/2Z by identifying a structural invariant that differs.

*(Target: Z/4Z has an element of order 4 (e.g., 1); Z/2Z × Z/2Z has no element of order 4 — every non-identity element has order 2. Isomorphisms preserve element orders, so they cannot be isomorphic.)*

**Q3.** Determine whether the map φ: (Z/6Z, +) → (Z/6Z, +) defined by φ(n) = 2n is a group isomorphism.

*(Target: Homomorphism: φ(m+n) = 2(m+n) = 2m+2n = φ(m)+φ(n) ✓. But: φ(3) = 6 = 0 = φ(0), so φ is NOT injective. Not a bijection. Therefore φ is a homomorphism but NOT an isomorphism.)*

**Q4.** If φ: G → H is a group isomorphism, prove that φ maps the identity of G to the identity of H.

*(Target: Let e_G be the identity of G. Then φ(e_G) = φ(e_G · e_G) = φ(e_G) · φ(e_G) (homomorphism).
  In H: φ(e_G) = φ(e_G) · φ(e_G). Multiply both sides on the right by [φ(e_G)]⁻¹: e_H = φ(e_G).)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independent reasoning probe within group theory.*

> Let G = Z/5Z (the integers mod 5 under addition) and
> H = {z ∈ ℂ : z⁵ = 1} (the 5th roots of unity under multiplication).
> Define φ: G → H by φ(k) = e^(2πik/5).
>
> (a) Show φ is a group homomorphism.
> (b) Show φ is a bijection.
> (c) Conclude that G ≅ H.

*Expected answers:*
- **(a) Homomorphism:** φ(k + m) = e^(2πi(k+m)/5) = e^(2πik/5) · e^(2πim/5) = φ(k) · φ(m). ✓
- **(b) Bijection:** |G| = |H| = 5. The elements e^(2πik/5) for k=0,1,2,3,4 are distinct (distinct angles in [0,2π)). So φ maps 5 elements to 5 distinct targets — bijection. ✓
- **(c) Conclusion:** φ is a bijective homomorphism, so G ≅ H: Z/5Z ≅ {5th roots of unity}.

**[P55 — SCORE]**  Award 1 point for P76 if all three parts answered correctly; 0 otherwise.

---

**[P75 — MASTERY ASSESSMENT]**

```
PASS_CRITERION: 5 out of 5 items (4 P77 + 1 P76)
THRESHOLD:      0.85  →  ⌈0.85 × 5⌉ = 5
```

**[P55 — SCORE]**  Combine P77 tally + P76 score → total out of 5.

**[P74 — ROUTING DECISION]**

- **Score = 5/5 → MASTERY ACHIEVED.** Proceed to P78.
- **Score ≤ 4/5 → Identify which items failed:**
  - Q1 wrong → definition gap → re-state: bijection + homomorphism, both required.
  - Q2 wrong → MC-1 active → TB-R01 (element-order invariant table).
  - Q3 wrong → MC-2 active → TB-R02 (check injectivity: if φ(a)=φ(b), must a=b?).
  - Q4 wrong → homomorphism argument gap → scaffold: φ(e)·φ(e) = φ(e·e) = φ(e), cancel.
  - P76 wrong → identify which part failed; re-route to matching repair.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.abst.group-isomorphism
MASTERY_REACHED: true
UNLOCKS:         []
NEXT_CONCEPT:    (continue math.abst domain)
SESSION_CLOSE:   "You can now define and verify group isomorphisms, use structural
                  invariants (element orders) to prove groups are not isomorphic, and
                  distinguish bijection from isomorphism. Two isomorphic groups are
                  the same algebraic structure with different labels."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: SAME-SIZE-MEANS-ISOMORPHIC (MC-1)

**Trigger:** Student claims groups of the same order are always isomorphic.

**Step 1 — Name the counterexample.**
> Z/4Z and V₄ both have order 4. Are they isomorphic?

**Step 2 — Compute element orders.**
> Z/4Z: orders are {1, 4, 2, 4}. There IS an element of order 4.
> V₄: orders are {1, 2, 2, 2}. There is NO element of order 4.

**Step 3 — Apply the invariant.**
> Isomorphisms preserve element orders (proved: ord(φ(g)) = ord(g)).
> If Z/4Z ≅ V₄, V₄ would need an element of order 4. It doesn't.
> Conclusion: Z/4Z ≇ V₄, even though |Z/4Z| = |V₄| = 4.

**Exit:** Return to TA-A02 P49.

---

### TB-R02 · Repair: ANY-BIJECTION-IS-ISOMORPHISM (MC-2)

**Trigger:** Student proposes a bijection without checking φ(ab) = φ(a)φ(b).

**Step 1 — Show a bijection that fails.**
> ψ: Z/4Z → {1,i,−1,−i}: ψ(0)=1, ψ(1)=−1, ψ(2)=i, ψ(3)=−i.
> ψ is a bijection. But: ψ(1+1) = ψ(2) = i. ψ(1)·ψ(1) = (−1)(−1) = 1. i ≠ 1. FAIL.

**Step 2 — Reinforce the definition.**
> Isomorphism = bijection AND homomorphism (φ(ab)=φ(a)φ(b)).
> Must check BOTH. A bijection that fails the operation condition is NOT an isomorphism.

**Exit:** Return to TA-A03 P49.

---

### TB-R03 · Repair: ISOMORPHISM-PRESERVES-LABELS (MC-3)

**Trigger:** Student thinks G ≅ H means the groups are the same set with the same operation.

**Step 1 — Clarify.**
> G ≅ H means the groups have identical STRUCTURE — same operation table up to relabeling.
> The elements of G and H can be completely different objects (numbers vs. matrices vs. roots of unity).

**Step 2 — Example.**
> (Z/4Z, +) ≅ ({1,i,−1,−i}, ×): one has integers, the other has complex numbers.
> Different elements, different operation symbols, same structural blueprint.

**Exit:** Return to TA-A01.

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "Does Z/6Z have any element of order 6? Does S₃? Are they isomorphic?"
    Target: Z/6Z: yes (generator 1 has order 6). S₃: no element of order 6. S₃ ≇ Z/6Z.

  Interval-2 (+3 days):
    Probe: "State the two conditions a map φ: G → H must satisfy to be a group isomorphism."
    Target: (1) φ(ab)=φ(a)φ(b) for all a,b (homomorphism); (2) φ bijective.

  Interval-3 (+1 week):
    Probe: "Construct an isomorphism between Z/2Z and {1,−1} under multiplication."
    Target: φ(0)=1, φ(1)=−1; verify φ(0+1)=−1=φ(0)·φ(1)=1·(−1) ✓; bijection ✓.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (structural invariants) or TA-A03
                        (bijection vs. isomorphism).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.abst.group-homomorphism:
    Used in:   TA-A01 (definition of isomorphism as bijective homomorphism),
               TA-A03 (homomorphism condition φ(ab)=φ(a)φ(b) as mandatory requirement
                       separate from bijectivity),
               TA-A04 Q4 (using homomorphism property to prove identity preservation).
    Assumed:   Student holds φ(ab) = φ(a)φ(b); knows kernel and image; knows homomorphism
               preserves identity and inverses.

CROSS_LINKS_NOTED:
  (none — cross_links = [])
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. The structural invariant strategy is the most powerful proof tool here.**
Students at the analyze level should internalize: to prove G ≇ H, find ONE property that differs
(element order multiset, abelian vs. non-abelian, cyclic vs. non-cyclic). To prove G ≅ H, construct
an explicit bijective homomorphism. TA-A02 builds the "look for invariants" habit via element orders.

**2. MC-1 is the dominant error at this stage.**
After encountering Z/2Z ≅ {1,−1} and Z/4Z ≅ {1,i,−1,−i}, students often over-generalize to
"same order → isomorphic." The Z/4Z vs. V₄ example is the canonical corrective — memorizable
and unambiguous.

**3. Q3 tests the distinction between homomorphism and isomorphism at bloom=analyze.**
The map n ↦ 2n on Z/6Z is a homomorphism but not injective (fails I2). This requires the student
to check both conditions independently, not assume one implies the other.

**4. The P76 independence probe (nth roots of unity) extends the pattern.**
Students who saw Z/4Z ≅ {4th roots of unity} in TA-A01 should readily generalize to Z/5Z ≅
{5th roots of unity}, making the connection between cyclic groups and roots of unity. This probe
tests whether the student can apply the definition independently, not just verify given examples.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.abst.group-isomorphism
====================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 6; 4 TAs used ≤ 6.
[PASS] V-4   CPA_ENTRY_STAGE = A (abstract structural definition; abstract algebra bloom=analyze).
[PASS] V-5   P76_MODE = Independence with explicit rationale (cross_links = []).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03 (MAMR).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02: P41 + P64 — element-order invariant).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A03 contrast pair; TB-R02/R03).
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P11 ✓  TA-A02→P41 ✓  TA-A03→P06 ✓  TA-A04→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49.
               TA-A01→P49 ✓  TA-A03→P49 ✓  (TA-A02 is a gate TA)
[PASS] V-12  GR-3: Terminal TA (TA-A04) is a mastery gate containing P91; structure terminal.
[PASS] V-13  GR-4: P41/P64 gate structure present in TA-A02 for MC-1.
[PASS] V-14  GR-6: P91 terminal in TA-A04 with correct compound
               P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-15  GR-7: P76 included inside P91 in the mastery gate.
[PASS] V-16  GR-8: No cross-links in KG; cross_links = [].
[PASS] V-17  GR-9: P76 uses Independence mode; probe requires student to construct an
              isomorphism independently (Z/5Z ≅ 5th roots of unity) and verify all three
              conditions (homomorphism, injective, surjective).
[PASS] V-18  GR-10: MAMR stated in Component 3; MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.85 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (5/5 → pass; ≤4/5 → item-specific repair).

CONTENT
[PASS] AIR   Group isomorphism defined as bijective homomorphism (I1 + I2 + I3).
             Canonical isomorphisms: Z/4Z ≅ {1,i,−1,−i}, Z/2Z ≅ {1,−1}.
             MC-1: element-order invariant proves Z/4Z ≇ V₄.
             MC-2: bijection ψ without homomorphism property shown to fail.
             MC-3: structural sameness ≠ identical representation.
             Q4: identity-preservation proof via homomorphism cancellation.
             P76: Z/5Z ≅ {5th roots of unity} constructed and verified independently.

VERDICT: PACKAGE_READY
```

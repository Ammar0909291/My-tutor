# Teaching Blueprint — math.abst.sylow-theorems

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.abst.sylow-theorems
KG_FIELDS:
  difficulty:        expert
  bloom:             analyze
  mastery_threshold: 0.75
  estimated_hours:   7
  requires:          [math.abst.group-action, math.nt.prime-number]
  unlocks:           []
  cross_links:       []

SESSION_TA_CAP:      9   (estimated_hours = 7 → cap 9)
CPA_ENTRY_STAGE:     C   (begin with small-group examples: order-6 group, order-12 group;
                          concrete subgroup searches motivate all three Sylow theorems)
P76_MODE:            Independence
  rationale:         cross_links = []; P76 probe applies all three Sylow theorems to a
                     group of order 30, requiring independent structural analysis.
PASS_CRITERION:      ⌈0.75 × 5⌉ = 4 out of 5
  composition:       4 P77 questions + 1 P76 independence probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
Let G be a finite group with |G| = pⁿ × m where p is prime and gcd(p, m) = 1.
A **Sylow p-subgroup** of G is a subgroup of order pⁿ (the largest power of p dividing |G|).

**Three Sylow Theorems:**
- **Sylow I (Existence):** G has at least one Sylow p-subgroup.
- **Sylow II (Conjugacy):** All Sylow p-subgroups are conjugate to each other: if P and Q are
  both Sylow p-subgroups, then Q = gPg⁻¹ for some g ∈ G.
- **Sylow III (Count):** The number n_p of Sylow p-subgroups satisfies:
  (i) n_p ≡ 1 (mod p); (ii) n_p divides m; (iii) n_p = [G : N_G(P)] (index of normalizer).

**Application pattern:** n_p ≡ 1 (mod p) AND n_p | m narrows n_p to a small set of possibilities.
If n_p = 1, the unique Sylow p-subgroup is **normal** in G. This is the main tool for proving
groups are or are not simple.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | |G|=6: Sylow 2-subgroups (order 2), Sylow 3-subgroups (order 3); counting them |
| **Pictorial (P)** | Lattice of subgroups with Sylow subgroups highlighted; n_p divisibility diagram |
| **Abstract (A)** | Three theorems in full generality; n_p constraints as a system; simplicity criterion |

### Prerequisite Knowledge (from KG)
- **math.abst.group-action** — conjugation action; orbit-stabilizer theorem (used in Sylow I proof);
  normalizer N_G(P) = Stab_G(P) under conjugation action on subgroups
- **math.nt.prime-number** — prime p; gcd; prime factorization of |G|; prime powers

### Canonical Examples
| |G| | p | pⁿ | m | n_p constraints | n_p | Normal? |
|-----|---|----|----|-----------------|-----|---------|
| 6 | 2 | 2 | 3 | n_2≡1(mod2), n_2|3 → n_2∈{1,3} | 3 (in S₃) | No |
| 6 | 3 | 3 | 2 | n_3≡1(mod3), n_3|2 → n_3∈{1} | 1 | Yes |
| 12 | 2 | 4 | 3 | n_2≡1(mod2), n_2|3 → n_2∈{1,3} | 3 (in A₄) | No |
| 12 | 3 | 3 | 4 | n_3≡1(mod3), n_3|4 → n_3∈{1,4} | 4 (in A₄) | No |
| 15 | 3 | 3 | 5 | n_3≡1(mod3), n_3|5 → n_3=1 | 1 | Yes |
| 15 | 5 | 5 | 3 | n_5≡1(mod5), n_5|3 → n_5=1 | 1 | Yes |

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | SYLOW-SUBGROUP-ALWAYS-NORMAL | Claims every Sylow p-subgroup is automatically normal in G | Confuses the CONCLUSION (n_p=1 implies normality) with a universal claim; doesn't recall that normality requires n_p=1 specifically | **FOUNDATIONAL** |
| MC-2 | SYLOW-III-WRONG-DIVISOR | Applies n_p | |G| instead of n_p | m (where m = |G|/pⁿ) | Forgets to remove the p-part from |G| before applying divisibility; uses full group order instead of the cofactor | Secondary |
| MC-3 | ANY-p-SUBGROUP-IS-SYLOW | Calls any p-subgroup a "Sylow p-subgroup" regardless of order | Doesn't require the subgroup to have order pⁿ (the full prime-power factor); thinks any subgroup of prime-power order is a Sylow subgroup | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate before TA-A03.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P11 four representations: Sylow subgroup definition + n_p constraints
                 for |G|=6 + P49)
      → TA-A02 (P41/P64 MC-1 gate: n_p=1 ↔ normality; |G|=12 example shows n_p≠1 + P49)
      → TA-A03 (P04 pattern: n_p constraint system applied across multiple group orders;
                 simplicity via n_p analysis + P49)
      → TA-A04 (P06 contrast: Sylow p-subgroup vs. general p-subgroup; n_p|m vs n_p||G| + P49)
      → TA-A05 (P91 terminal mastery gate — P76 independence probe)

Repair (Protocol B):
  MC-1 → TB-R01 (n_p=1 ↔ unique ↔ normal; three-statement equivalence; S₃ counterexample)
  MC-2 → TB-R02 (compute m = |G|/pⁿ first; n_p divides m, not |G|)
  MC-3 → TB-R03 (Sylow p-subgroup has order pⁿ exactly; general p-subgroups smaller)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: Sylow Subgroups and the Three Theorems for |G|=6 (P11 + P49)

**[P11 — REPRESENTATION SHIFT]**

Four representations of Sylow theory for G with |G| = 6 = 2¹ × 3:

| Representation | Content |
|----------------|---------|
| **Verbal** | "A Sylow p-subgroup of G is the largest p-power-order subgroup; Sylow I guarantees one exists; Sylow III pins down how many there are" |
| **Symbolic** | pⁿ = largest power of p dividing |G|; n_p ≡ 1 (mod p) and n_p | m where m = |G|/pⁿ |
| **Table** | For |G|=6: p=2 → pⁿ=2, m=3; p=3 → pⁿ=3, m=2 |
| **Concrete** | S₃ (order 6): Sylow 2-subgroups = {e,(12)}, {e,(13)}, {e,(23)} — three of order 2; Sylow 3-subgroup = {e,(123),(132)} — one of order 3 |

Applying Sylow III to G = S₃ (|G| = 6):

**For p = 2** (pⁿ = 2, m = 3):
- n_2 ≡ 1 (mod 2) → n_2 is odd → n_2 ∈ {1, 3, 5, …}
- n_2 | 3 → n_2 ∈ {1, 3}
- Sylow III says: n_2 ∈ {1, 3}. Both are possible in principle. S₃ has n_2 = 3.

**For p = 3** (pⁿ = 3, m = 2):
- n_3 ≡ 1 (mod 3) → n_3 ∈ {1, 4, 7, …}
- n_3 | 2 → n_3 ∈ {1, 2}
- Intersection: n_3 = 1. **The unique Sylow 3-subgroup {e,(123),(132)} is normal in S₃.**

**[P49 — ADAPTIVE CHECKPOINT]**

> Let G be a group of order 20 = 2² × 5.
> (i) What is the Sylow 5-subgroup order?  What is m for p=5?
> (ii) List all possible values of n_5 using Sylow III.

Expected:
*(i) pⁿ = 5¹ = 5 (since 5 appears once). m = 20/5 = 4.*
*(ii) n_5 ≡ 1 (mod 5) → n_5 ∈ {1,6,11,...}; n_5 | 4 → n_5 ∈ {1,2,4}. Intersection: n_5 = 1.
     There is exactly one Sylow 5-subgroup in any group of order 20.*

- **CORRECT**: ✓ Advance to TA-A02.
- **PARTIAL** (right pⁿ, wrong n_5 divisor): TB-R02. Return.
- **INCORRECT**: Walk through the |G|=6 example step-by-step first. Return.
- **NO_RESPONSE**: Scaffold "Step 1: factor 20 = 2²·5; identify p=5 and pⁿ=5; m=20/5=4. Step 2: n_5 must divide m and be ≡1 mod p."

---

### TA-A02 · MC-1 Gate: n_p = 1 is the Normality Condition (P41 + P64 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> A group G has order 12. A student claims: "Since G has a Sylow 2-subgroup of order 4 (by Sylow I),
> this subgroup must be normal in G."
>
> Is the student correct?

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

**Not necessarily.** The key theorem is:

**A Sylow p-subgroup P is normal in G if and only if n_p = 1** (P is the UNIQUE Sylow p-subgroup).

The student's claim is wrong: Sylow I only guarantees EXISTENCE, not UNIQUENESS or NORMALITY.

For |G| = 12 = 2² × 3:
- **For p = 2** (pⁿ = 4, m = 3): n_2 ≡ 1 (mod 2), n_2 | 3 → n_2 ∈ {1, 3}.
  Both n_2 = 1 and n_2 = 3 are possible. In A₄: n_2 = 3 (three Sylow 2-subgroups, none normal).
- **For p = 3** (pⁿ = 3, m = 4): n_3 ≡ 1 (mod 3), n_3 | 4 → n_3 ∈ {1, 4}.
  In A₄: n_3 = 4 (four Sylow 3-subgroups, none normal).

In A₄, NEITHER the Sylow 2-subgroups NOR the Sylow 3-subgroups are normal.

**The normality chain:**
n_p = 1 ↔ unique Sylow p-subgroup ↔ normal in G (because conjugates of a Sylow p-subgroup
are also Sylow p-subgroups by Sylow II; if there's only one, it equals its own conjugate, so it's normal).

MC-1 cleared. Do not revisit.

**[P49 — ADAPTIVE CHECKPOINT]**

> G has order 35 = 5 × 7. Apply Sylow III to find n_5 and n_7.
> Which Sylow subgroups (if any) must be normal?

Expected:
*n_5: ≡1 mod 5, |4 → n_5∈{1}. Unique → normal.*
*n_7: ≡1 mod 7, |5 → n_7∈{1}. Unique → normal.*
*Both Sylow subgroups are normal. (In fact, every group of order 35 is cyclic.)*

- **CORRECT**: ✓ Advance to TA-A03.
- **PARTIAL** (n_5 correct, n_7 wrong): Check divisibility: "n_7 must divide m=35/7=5; 1 and 5 are divisors; but n_7≡1 mod 7 → n_7∈{1,8,...}; only 1 works." Return.
- **INCORRECT**: TB-R01 + TB-R02. Return.
- **NO_RESPONSE**: Scaffold "35 = 5·7. For p=5: pⁿ=5, m=7. List n_5 values: ≡1 mod 5 gives {1,6,11,...}; divides 7 gives {1,7}. Intersection?"

---

### TA-A03 · Pattern: Applying the Sylow Constraint System (P04 + P49)

**[P04 — PATTERN INDUCTION]**

**Pattern across group orders: n_p constraint gallery**

| |G| | p | pⁿ | m | n_p ≡1(mod p) | n_p | m | Candidates | n_p | Normal? |
|-----|---|----|----|---------------|-----|---|------------|-----|---------|
| 15 | 3 | 3 | 5 | {1,4,7,...} | ∩ | {1,5} | n_3=1 | Yes |
| 15 | 5 | 5 | 3 | {1,6,...} | ∩ | {1,3} | n_5=1 | Yes |
| 21 | 3 | 3 | 7 | {1,4,7,...} | ∩ | {1,7} | n_3=1 or 7 | ? |
| 21 | 7 | 7 | 3 | {1,8,...} | ∩ | {1,3} | n_7=1 | Yes |
| 30 | 5 | 5 | 6 | {1,6,...} | ∩ | {1,2,3,6} | n_5=1 or 6 | ? |

**Observation:** When n_p = 1 is forced (only possibility), the Sylow subgroup is normal — this
often forces the group to have non-trivial normal subgroups, ruling out simplicity.

**Simplicity criterion (key application):** G is simple if it has NO proper non-trivial normal
subgroups. If for some prime p dividing |G|, n_p = 1, then G has a normal Sylow p-subgroup,
so G is **not simple** (unless G itself is that Sylow subgroup, i.e., G has prime order).

Example: Is there a simple group of order 15?
- n_3 = 1 → Sylow 3-subgroup P₃ ⊴ G.
- G = P₃ · P₅ (product of normal subgroups with trivial intersection); by the structure theorem
  G ≅ Z/3Z × Z/5Z ≅ Z/15Z. Not simple (not prime order). ✓

**[P49 — ADAPTIVE CHECKPOINT]**

> Can a group of order 56 = 2³ × 7 be simple?
> Apply Sylow III to p=7 to decide.

Expected:
*n_7: ≡1 mod 7, |m=8. Candidates: {1,8}. n_7=1 or n_7=8.*
*If n_7=1: Sylow 7-subgroup is normal → G not simple.*
*If n_7=8: eight Sylow 7-subgroups, each of order 7 (prime, so cyclic), pairwise intersecting only
 in {e}. Total non-identity elements from Sylow 7-subgroups: 8×6=48. Remaining: 56−48=8 elements,
 which must form the unique Sylow 2-subgroup (order 8) → normal → G not simple.*
*Either way, G is not simple.*

- **CORRECT**: ✓ Advance to TA-A04.
- **PARTIAL** (n_7=1 case correct, n_7=8 case not analyzed): "If n_7=8, count how many elements are in the Sylow 7-subgroups." Return.
- **INCORRECT**: TB-R02 (divisibility). Return.
- **NO_RESPONSE**: Scaffold "n_7 must satisfy: n_7≡1 mod 7 → {1,8,15,...}; n_7|8 → {1,2,4,8}. Intersection?"

---

### TA-A04 · Contrast: Sylow Subgroup vs. General p-Subgroup (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Contrast A — Sylow p-subgroup vs. any p-subgroup:**

| Type | Definition | In |G|=12, p=2 | Guaranteed by |
|------|------------|-----|----------------|---------------|
| p-subgroup | Subgroup whose order is a power of p | Any of {e}, order-2 subgroups, order-4 subgroups | Cauchy's theorem (order-p subgroup) |
| Sylow p-subgroup | Subgroup of order pⁿ = full prime-power factor of |G| | Order-4 subgroup (pⁿ=4=2²) | Sylow I |

For |G| = 12 = 2² × 3: the Sylow 2-subgroups have order 4 (= 2²), not order 2.
A subgroup of order 2 is a p-subgroup but NOT a Sylow 2-subgroup.

**Contrast B — n_p | m vs. n_p | |G|:**

| Claim | Correct? | For |G|=12, p=2 | Why |
|-------|----------|-----------------|-----|
| n_p divides m = |G|/pⁿ | ✓ | n_2 | 3 | Third Sylow theorem as stated |
| n_p divides |G| | ✗ (or overcounts) | n_2 | 12 → {1,2,3,4,6,12} — too many candidates | Lagrange allows this, but Sylow III is sharper |

Using n_2 | 3 (not n_2 | 12) is the key efficiency. Sylow III specifically says m, not |G|.

**[P49 — ADAPTIVE CHECKPOINT]**

> G has order 45 = 3² × 5.
> (i) What is the Sylow 3-subgroup order?  (i.e., what is 3² = pⁿ?)
> (ii) Apply Sylow III correctly: find n_3.

Expected:
*(i) pⁿ = 3² = 9. Sylow 3-subgroups have order 9.*
*(ii) n_3: ≡1 mod 3 → {1,4,7,...}; n_3 | m=45/9=5 → {1,5}. Intersection: n_3=1.
     Unique Sylow 3-subgroup of order 9 is normal in G.*

- **CORRECT**: ✓ Advance to TA-A05.
- **PARTIAL** (uses n_3 | 45 instead of n_3 | 5): TB-R02. Return.
- **INCORRECT**: TB-R03 (subgroup order). Return.
- **NO_RESPONSE**: Scaffold "Factor 45=3²·5; p=3 → pⁿ=9; m=45/9=5. Then n_3 must divide m=5."

---

### TA-A05 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** State all three Sylow theorems for a group G of order pⁿm (gcd(p,m)=1).

*(Target: I: G has a Sylow p-subgroup of order pⁿ. II: All Sylow p-subgroups are conjugate.
III: n_p ≡ 1 (mod p), n_p | m, n_p = [G:N_G(P)]. All three needed.)*

**Q2.** For |G| = 30 = 2 × 3 × 5, apply Sylow III to show n_5 = 1 or 6, then use an element-count
argument to deduce n_5 = 1.

*(Target: n_5≡1 mod 5, n_5|6 → {1,2,3,6}; intersection {1,6}. If n_5=6: 6 Sylow 5-subgroups,
each order 5, pairwise only {e} in common → 6×4=24 elements of order 5. n_3: ≡1 mod 3, |10 →
{1,10}. If n_3=10: 10×2=20 elements of order 3. 24+20=44>30. Contradiction. So n_5=1 or n_3=1;
in either case G has a normal subgroup. Standard result: n_5=1.)*

**Q3.** A group of order 77 = 7 × 11. Show it must be cyclic using Sylow theory.

*(Target: n_7≡1 mod 7, |11 → {1,11}; n_7=1 (only 1≤11 and ≡1 mod 7; 11≢1 mod 7 since 11-1=10 is not divisible by 7). So P₇⊴G. n_11≡1 mod 11, |7 → {1,7}; 7≢1 mod 11. So n_11=1, P₁₁⊴G. G=P₇×P₁₁≅Z/7Z×Z/11Z≅Z/77Z (gcd(7,11)=1). G is cyclic.)*

**Q4.** In a group of order 12, can there be exactly 2 Sylow 3-subgroups?  Justify.

*(Target: No. Sylow III requires n_3≡1 mod 3 and n_3|4. n_3∈{1,4}. n_3=2 would require 2≡1 mod 3 (FALSE: 2-1=1, not divisible by 3). So n_3 cannot be 2. Only n_3∈{1,4}.)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independent Sylow analysis of a new group order.*

> G is a group of order 30 = 2 × 3 × 5.
>
> (a) For each prime p ∈ {2, 3, 5}: compute pⁿ, m, and the full list of candidates for n_p.
> (b) Which Sylow subgroup(s) are forced to be normal by the candidate list alone?
> (c) Using an element-counting argument if needed, show that G cannot be simple.

*Expected answers:*
- **(a)** p=2: pⁿ=2, m=15; n_2≡1(mod2), n_2|15 → {1,3,5,15}. p=3: pⁿ=3, m=10; n_3≡1(mod3), n_3|10 → {1,10}. p=5: pⁿ=5, m=6; n_5≡1(mod5), n_5|6 → {1,6}.
- **(b)** Only constraints: n_3∈{1,10} and n_5∈{1,6}. Neither is forced to 1 by divisibility alone.
- **(c)** Suppose n_5=6 AND n_3=10. Elements of order 5 from six Sylow 5-subgroups: 6×4=24. Elements of order 3 from ten Sylow 3-subgroups: 10×2=20. Total ≥ 24+20 = 44 > 30. Contradiction. So n_5=1 or n_3=1, giving a proper normal subgroup. G is not simple.

**[P55 — SCORE]**  Award 1 point if all three parts correct; 0 otherwise.

---

**[P75 — MASTERY ASSESSMENT]**

```
PASS_CRITERION: 4 out of 5 items (4 P77 + 1 P76)
THRESHOLD:      0.75  →  ⌈0.75 × 5⌉ = 4
```

**[P55 — SCORE]**  Combine P77 tally + P76 score → total out of 5.

**[P74 — ROUTING DECISION]**

- **Score ≥ 4/5 → MASTERY ACHIEVED.** Proceed to P78.
- **Score ≤ 3/5 → Identify which items failed:**
  - Q1 wrong → missing a theorem → re-state all three with precise hypotheses.
  - Q2 wrong → element-count argument gap → walk through: each Sylow 5-subgroup contributes 4 non-identity elements.
  - Q3 wrong → MC-3 (subgroup order) or MC-2 (divisibility) → TB-R03 or TB-R02.
  - Q4 wrong → n_p ≡ 1 (mod p) constraint → check 2 ≡ 1 (mod 3)? No.
  - P76 wrong → identify which part (a/b/c) failed; re-route to matching repair.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.abst.sylow-theorems
MASTERY_REACHED: true
UNLOCKS:         []
NEXT_CONCEPT:    (continue math.abst domain)
SESSION_CLOSE:   "You now know the three Sylow theorems: existence, conjugacy, and count
                  constraints for n_p. You can determine whether n_p is forced to 1 (giving
                  a normal Sylow subgroup), and you can use element-counting arguments to
                  rule out simplicity. These are the main tools for classifying small groups."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: SYLOW-SUBGROUP-ALWAYS-NORMAL (MC-1)

**Trigger:** Student claims Sylow p-subgroup is always normal in G.

**Step 1 — State the correct theorem.**
> A Sylow p-subgroup P is normal in G ↔ n_p = 1 (P is the unique Sylow p-subgroup).
> This is a biconditional: normal iff unique, NOT "exists iff normal."

**Step 2 — Counterexample.**
> In S₃ (order 6): three Sylow 2-subgroups: {e,(12)}, {e,(13)}, {e,(23)}.
> n_2 = 3 ≠ 1. None of them is normal in S₃.
> (Check: (123)(12)(132) = (23) ≠ (12). So {e,(12)} is not closed under conjugation by (123).)

**Exit:** Return to TA-A02 P49.

---

### TB-R02 · Repair: SYLOW-III-WRONG-DIVISOR (MC-2)

**Trigger:** Student uses n_p | |G| instead of n_p | m.

**Step 1 — Identify the correct m.**
> |G| = pⁿ × m where gcd(p,m) = 1.
> m = |G| / pⁿ. This removes the p-part entirely.
> Sylow III: n_p | m (not n_p | |G|).

**Step 2 — Example showing the difference.**
> |G|=12=2²·3. For p=2: pⁿ=4, m=3.
> n_2 | 3 → n_2∈{1,3}. Only 2 options.
> n_2 | 12 → n_2∈{1,2,3,4,6,12}. 6 options — much weaker, harder to conclude anything.

**Exit:** Return to TA-A03 P49 or TA-A04 P49 (whichever was active).

---

### TB-R03 · Repair: ANY-p-SUBGROUP-IS-SYLOW (MC-3)

**Trigger:** Student calls a subgroup of order p (rather than pⁿ) a Sylow p-subgroup.

**Step 1 — Definition check.**
> Sylow p-subgroup has order pⁿ = the LARGEST power of p dividing |G|.
> For |G|=12=2²·3: Sylow 2-subgroups have order 4 (=2²), NOT order 2.
> A subgroup of order 2 is a p-subgroup but NOT a Sylow 2-subgroup.

**Step 2 — Find pⁿ first.**
> Factor |G| = pⁿ · m. Then Sylow p-subgroup order = pⁿ.
> For |G|=12, p=2: 12 = 2² · 3 → Sylow 2-subgroup order = 4.

**Exit:** Return to TA-A04 P49.

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "For |G|=20=2²·5: find all candidates for n_5. Is the Sylow 5-subgroup normal?"
    Target: n_5≡1 mod 5, n_5|4 → n_5=1. Yes, normal.

  Interval-2 (+3 days):
    Probe: "State the three Sylow theorems."
    Target: I: existence. II: conjugacy (all are conjugate). III: n_p≡1(mod p), n_p|m.

  Interval-3 (+1 week):
    Probe: "In |G|=12, why can there NOT be exactly 2 Sylow 3-subgroups?"
    Target: n_3 must satisfy n_3≡1 mod 3; n_3=2 gives 2-1=1, but 1 must be divisible by 3 — FALSE.
            So n_3=2 violates the congruence condition. Sylow III eliminates it.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (normality gate) or TA-A04 (divisibility).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.abst.group-action:
    Used in:   TA-A02 (conjugation action of G on Sylow subgroups; n_p = [G:N_G(P)] from
               orbit-stabilizer; proof of Sylow II via conjugation orbits),
               TA-A03 (element-counting argument counts non-identity elements in orbits).
    Assumed:   Student holds orbit-stabilizer theorem; knows conjugation is a group action;
               knows normalizer N_G(H) = {g∈G: gHg⁻¹=H}.
  math.nt.prime-number:
    Used in:   All TAs (prime factorization of |G|; gcd(p,m)=1; prime power pⁿ).
    Assumed:   Student can factor integers into prime powers; knows gcd; knows prime p.

CROSS_LINKS_NOTED:
  (none — cross_links = [])
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. The two-constraint system (congruence + divisibility) is the core skill.**
Every Sylow III application reduces to: list numbers ≡ 1 (mod p), intersect with divisors of m.
This two-step filter is algorithmically simple but students often apply either constraint alone.
The TA-A03 gallery builds the "run the system" habit across many different group orders.

**2. The element-counting argument is the most powerful simplicity tool.**
When Sylow III gives multiple candidates for n_p, the element-count argument (total elements from
all Sylow subgroups exceeds |G|) is often decisive. TA-A03 develops this with |G|=56; TA-A05 Q2
and P76 apply it to |G|=30. Teach it as a systematic tool: count elements of highest-order
p-subgroups first, then check if any room remains for other Sylow subgroups.

**3. MC-1 (always normal) is structural and must be caught early.**
Students who take abstract algebra often believe Sylow subgroups are special and therefore normal.
The S₃ example (three Sylow 2-subgroups, none normal) is the canonical corrective. Reinforce:
uniqueness ↔ normality is the biconditional; existence alone guarantees nothing about normality.

**4. The P76 probe (order 30) requires synthesis of all three Sylow theorems.**
The standard order-30 non-simplicity proof is a good capstone: it requires applying Sylow III
three times, observing that no n_p is immediately forced to 1, and using the element count to
force a contradiction. This is a genuine analysis task at bloom=analyze.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.abst.sylow-theorems
================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 9; 5 TAs used ≤ 9.
[PASS] V-4   CPA_ENTRY_STAGE = C (Concrete: |G|=6, S₃, specific subgroup lists before theorems).
[PASS] V-5   P76_MODE = Independence with explicit rationale (cross_links = []).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03 (MAMR).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02: P41 + P64 — n_p=1 ↔ normality; A₄ counterexample).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A04 contrast; TB-R02/R03).
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P11 ✓  TA-A02→P41 ✓  TA-A03→P04 ✓  TA-A04→P06 ✓  TA-A05→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49.
               TA-A01→P49 ✓  TA-A03→P49 ✓  TA-A04→P49 ✓  (TA-A02 is a gate TA)
[PASS] V-12  GR-3: Terminal TA (TA-A05) is a mastery gate containing P91; structure terminal.
[PASS] V-13  GR-4: P41/P64 gate structure present in TA-A02 for MC-1.
[PASS] V-14  GR-6: P91 terminal in TA-A05 with correct compound
               P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-15  GR-7: P76 included inside P91 in the mastery gate.
[PASS] V-16  GR-8: No cross-links in KG; cross_links = [].
[PASS] V-17  GR-9: P76 uses Independence mode; probe applies all three Sylow theorems to
              |G|=30, requiring computation of three n_p candidate lists and an element-count
              argument — the full analytical sequence at bloom=analyze.
[PASS] V-18  GR-10: MAMR = 4/5; MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.75 × 5⌉ = 4/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (≥4/5 → pass; ≤3/5 → item-specific repair).

CONTENT
[PASS] AIR   All three Sylow theorems stated precisely in Component 1 and Q1.
             n_p constraint system (congruence + divisibility) applied in every non-gate TA.
             MC-1: S₃ counterexample (n_2=3, none normal); A₄ counterexample (n_2=3, n_3=4).
             MC-2: n_p|m vs n_p||G| contrasted explicitly in TA-A04.
             MC-3: Sylow p-subgroup order = pⁿ, not p; contrasted with general p-subgroup.
             Element-count argument introduced in TA-A03 and applied in Q2 and P76.
             P76: full Sylow analysis of |G|=30; non-simplicity proved via element count.

VERDICT: PACKAGE_READY
```

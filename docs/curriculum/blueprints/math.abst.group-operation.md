# Teaching Blueprint — math.abst.group-operation

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.abst.group-operation
KG_FIELDS:
  difficulty:        advanced
  bloom:             apply
  mastery_threshold: 0.85
  estimated_hours:   4
  requires:          [math.abst.group-theory]
  unlocks:           []
  cross_links:       [math.linalg.vector-addition]

SESSION_TA_CAP:      6   (estimated_hours = 4 → ≥1h band → cap 6)
CPA_ENTRY_STAGE:     C   (Cayley tables are concrete; start with Z/nZ before abstract operations)
P76_MODE:            Cross-link
  rationale:         math.linalg.vector-addition IS a Tier 1 concept; P76 probe asks the
                     student to build the Cayley table for Z/2Z × Z/2Z (Klein four-group)
                     and compare its operation structure to vector addition in ℝ².
PASS_CRITERION:      ⌈0.85 × 5⌉ = 5 out of 5
  composition:       4 P77 questions + 1 P76 cross-link probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
This blueprint makes the group operation **computational**: given a specific group, perform
operations, read Cayley tables, work in modular arithmetic, and recognise non-abelian structure.

**Key computational objects:**
1. **Z/nZ** (integers mod n under addition): the canonical finite abelian group.
   Elements: {0, 1, 2, …, n−1}.  Operation: a + b = (a + b) mod n.  Identity: 0.  Inverse: n−a.
2. **Cayley table** (multiplication table): encodes all |G|² group operation values.
   Row a, column b, entry = a·b.  Key structural property: every element appears **exactly once**
   in each row and each column (Latin square property — consequence of cancellation laws in groups).
3. **Z/2Z × Z/2Z** (Klein four-group): the smallest non-cyclic abelian group (4 elements, every
   non-identity element is its own inverse).
4. **D₃** (dihedral group of the triangle): 6 elements {e, r, r², s, sr, sr²}; non-abelian.
   r = rotation 120°, s = reflection; key relation: sr = r²s.

### Distinction from math.abst.group-theory
`math.abst.group-theory` established the four axioms G1–G4 and verified them for abstract
examples.  This blueprint focuses on **computing within specific groups** using Cayley tables and
modular arithmetic; the objective is fluency with the group operation as a tool, not just the
axiomatic structure.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Z/4Z Cayley table; compute 3 + 2 (mod 4) = 1; inverse of 3 = 1 |
| **Pictorial (P)** | Full 4×4 table; highlight: each number 0,1,2,3 appears exactly once per row/col |
| **Abstract (A)** | Latin square property; non-abelian D₃; sr ≠ rs derived from table |

### Canonical Cayley Table — Z/4Z
| + | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| **0** | 0 | 1 | 2 | 3 |
| **1** | 1 | 2 | 3 | 0 |
| **2** | 2 | 3 | 0 | 1 |
| **3** | 3 | 0 | 1 | 2 |

Every row is a cyclic shift; every element appears once per row/column.  Identity 0 = top-left.
Symmetric about the main diagonal (abelian).

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | CAYLEY-TABLE-ALWAYS-SYMMETRIC | Claims the Cayley table of any group must be symmetric (because "multiplication is symmetric") | Conflates commutativity with the group operation; only abelian groups have symmetric Cayley tables | **FOUNDATIONAL** |
| MC-2 | MODULAR-IDENTITY-IS-N | Writes "the identity in Z/nZ is n" | Confuses the modulus n with the identity element 0; in Z/nZ, n ≡ 0 (mod n) — the identity IS 0 | Secondary |
| MC-3 | MODULAR-INVERSE-SUBTRACTION | Computes inverse of a in Z/nZ as "−a" without checking it lies in {0,…,n−1} | Transfers additive inverse from ℤ without reducing mod n; e.g., writes inverse of 3 in Z/4Z as −3 instead of 1 | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate; MC-2 and MC-3 addressed in TA-A03
and P91.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P11: Z/4Z table + read-and-compute exercises + P49)
      → TA-A02 (P41/P64 MC-1 gate: non-abelian D₃ table — sr ≠ rs + P49)
      → TA-A03 (P06: symmetric (abelian) vs asymmetric (non-abelian) Cayley tables + P49)
      → TA-A04 (P91 terminal mastery gate)

Repair (Protocol B):
  MC-1 → TB-R01 (D₃ table excerpt showing sr ≠ rs)
  MC-2 → TB-R02 (n ≡ 0 mod n; identity is 0 not n)
  MC-3 → TB-R03 (compute inverse by solving a + x ≡ 0 mod n)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Computing in Z/4Z (P11 + P49)

**[P11 — REPRESENTATION SHIFT]**

Four ways to view the operation in Z/4Z:

| Representation | 3 + 3 in Z/4Z |
|----------------|---------------|
| **Verbal** | "Start at 3, count 3 more steps on a 4-clock, wrap at 4" |
| **Symbolic** | 3 + 3 = 6; 6 mod 4 = 2 |
| **Table lookup** | Row 3, column 3 → entry **2** in the Cayley table above |
| **Inverse** | Inverse of 3: solve 3 + x ≡ 0 (mod 4) → x = 1 (since 3+1=4≡0) |

Three key readings from the Cayley table:
- **Identity row/column:** The row (and column) labelled 0 is identical to the header row — e is 0.
- **Inverse pairs:** a and a⁻¹ give e (= 0) when multiplied.  In Z/4Z: 0↔0, 1↔3, 2↔2, 3↔1.
- **Latin square:** Each element 0,1,2,3 appears exactly once in every row and every column.

**[P49 — ADAPTIVE CHECKPOINT]**

> Using the Z/4Z Cayley table:
> (i) Compute 2 + 3.
> (ii) What is the inverse of 2 in Z/4Z?
> (iii) Compute (3 + 2) + 1 and 3 + (2 + 1).  Are they equal?

Expected:
*(i) Row 2, col 3 → 1. Or: 2+3=5; 5 mod 4 = 1.*
*(ii) Solve 2+x≡0 (mod 4): x=2 (since 2+2=4≡0). Self-inverse.*
*(iii) (3+2)+1 = 1+1 = 2; 3+(2+1) = 3+3 = 2. Equal (associativity holds). ✓*

- **CORRECT** (all three): ✓ Advance to TA-A02.
- **PARTIAL — (ii) says 2 is "0 or undefined"**: MC-2 possible. Check if student thinks e=4. Route TB-R02 if so.
- **PARTIAL — (i) says 5**: MC-3 approach (not reducing mod n). Route TB-R03. Return.
- **INCORRECT**: Walk through table step-by-step. Return.
- **NO_RESPONSE**: Scaffold "(i) Look at row 2, column 3 in the table above. (ii) Which x gives 2+x=0 (mod 4)?"

---

### TA-A02 · MC-1 Gate: The D₃ Cayley Table is Not Symmetric (P41 + P64 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> A student builds the Cayley table for D₃ (symmetries of an equilateral triangle: rotations
> {e, r, r²} and reflections {s, rs, r²s}) and sees that sr ≠ rs.
> They conclude: "D₃ cannot be a group, because the table is not symmetric."
> Is the student correct?

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

The student is **wrong**.

Symmetry of the Cayley table means a·b = b·a for ALL pairs — that is the definition of an
ABELIAN group.  The group axioms G1–G4 do NOT require a·b = b·a.

D₃ IS a group (satisfies G1–G4 under function composition) but is **non-abelian**.

Key computation in D₃: Using the defining relation sr = r²s,
- r · s = rs (rotation then reflection)
- s · r = sr = r²s (reflection then rotation — different element!)

Partial D₃ table (r and s rows):

| · | e | r | r² | s | rs | r²s |
|---|---|---|----|---|----|-----|
| **r** | r | r² | e | rs | r²s | s |
| **s** | s | r²s | rs | e | r² | r |

Check entry (r, s) = rs ≠ (s, r) = sr = r²s.  **Table is NOT symmetric.**  D₃ is still a group.

MC-1 resolved: Cayley table symmetry ↔ abelian group.  Non-symmetric ↔ non-abelian.  Both are valid groups.

**[P49 — ADAPTIVE CHECKPOINT]**

> In Z/4Z, is 2 + 3 = 3 + 2?  What does this tell you about the Cayley table of Z/4Z?
> In D₃, is r·s = s·r?  What does this tell you about D₃'s table?

Expected:
*Z/4Z: 2+3=5≡1 and 3+2=5≡1. Yes, equal. Z/4Z is abelian → its Cayley table IS symmetric.*
*D₃: r·s = rs and s·r = r²s ≠ rs. No. D₃ is non-abelian → its table is NOT symmetric.*

- **CORRECT** (Z/4Z abelian/symmetric; D₃ non-abelian/non-symmetric): ✓ MC-1 cleared. Advance to TA-A03.
- **PARTIAL — D₃ answer wrong**: Route TB-R01 with the sr = r²s computation. Return.
- **INCORRECT**: TB-R01 full. Return.
- **NO_RESPONSE**: Scaffold "For Z/4Z: compute row 2 col 3 vs row 3 col 2 from the table. Same? For D₃: read entry (r,s) vs entry (s,r) from the partial table above."

---

### TA-A03 · Contrast: Symmetric vs Non-Symmetric Tables (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Abelian group — Symmetric Cayley table (Z/4Z):**
- Every entry (a,b) = entry (b,a): row a col b = row b col a.
- Visually: mirror image across the main diagonal.
- Every element is its own inverse only if a + a = 0 (mod n); in Z/4Z, only 0 and 2 are self-inverse.

**Non-abelian group — Asymmetric Cayley table (D₃, excerpt):**
- Entry (r,s) = rs but entry (s,r) = r²s ≠ rs.
- Visually: reflection across diagonal gives a DIFFERENT table.
- Still a group: Latin square property holds (every element once per row and column), G1–G4 all satisfied.

**Structural observation — Latin square:**
ALL groups (abelian or not) have the Latin square property: each element appears exactly once in
every row and column.
Proof sketch: If a·b = a·c, then a⁻¹·(a·b) = a⁻¹·(a·c) → b = c (left cancellation).  No element
can repeat in a row.  Similarly for columns.

**[P49 — ADAPTIVE CHECKPOINT]**

> A table T has 3 rows/columns with entries from {e, a, b}.  Row e is [e, a, b] (identity row).
> Row a is [a, e, b]. Row b is [b, b, e].
> (i) Does T have the Latin square property?
> (ii) Can T be a valid Cayley table for a group?

Expected:
*(i) Row a: {a, e, b} — all distinct ✓.  Row b: {b, b, e} — b appears TWICE. Fails Latin square.
So no, T does NOT have the Latin square property.*
*(ii) No — if b·a = b and b·b = e, then left cancellation gives a = b (contradiction with distinct elements).
T cannot be a valid Cayley table.*

- **CORRECT** (Latin square fails in row b; T is not a valid group table): ✓ Advance to TA-A04.
- **PARTIAL — (i) says yes**: Point to row b: b appears in columns 1 and 2. Not a Latin square. Return.
- **INCORRECT**: TB-R01 abbreviated (cancellation law + Latin square). Return.
- **NO_RESPONSE**: Scaffold "(i) List the elements in row b: what are the three entries? Do they include any repeats?"

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** Write the complete Cayley table for Z/5Z (integers mod 5 under addition).
*(5×5 table with entries (a+b) mod 5. Identity row/column for 0. Inverse pairs: 1↔4, 2↔3, 0↔0.)*

**Q2.** In D₃, compute (r² · s) · r.  State which entry in the D₃ table this corresponds to.
*(r²s · r = r²(sr) = r²(r²s) = r⁴s = rs. [using sr = r²s repeatedly]. Or look up the D₃ table.)*

**Q3.** In Z/8Z, find the inverse of 5.  Show the verification.
*(Solve 5 + x ≡ 0 (mod 8): x = 3.  Verify: 5 + 3 = 8 ≡ 0 (mod 8) = identity ✓.)*

**Q4.** The table below has 4 elements {e, a, b, c}.  Determine whether it is a valid Cayley table.
| · | e | a | b | c |
|---|---|---|---|---|
| **e** | e | a | b | c |
| **a** | a | e | c | b |
| **b** | b | c | e | a |
| **c** | c | b | a | e |
*(Check Latin square: each row/col contains {e,a,b,c} exactly once ✓. Check symmetry: table is symmetric → abelian. Check identity: row e = header row ✓. This is a valid Cayley table (in fact the Klein four-group).)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Cross-link to math.linalg.vector-addition)

*Cross-link probe: bridges group operation in Z/2Z × Z/2Z to vector addition.*

> The Klein four-group V₄ = Z/2Z × Z/2Z has elements {(0,0), (1,0), (0,1), (1,1)} with
> component-wise addition mod 2.
>
> (i) Write the Cayley table for V₄.
> (ii) Note that these elements can be viewed as 2D vectors over Z/2Z.  Is the group operation
>      the same as component-wise vector addition?
> (iii) Is V₄ isomorphic to Z/4Z?  Give one structural reason.

*Expected answers:*
- **(i)** Table: (0,0) is the identity; each non-identity element is its own inverse (e.g.,
  (1,0)+(1,0)=(2,0)=(0,0)).  4×4 symmetric table with the Klein four-group structure.
- **(ii)** Yes — the operation IS component-wise vector addition (mod 2), identical to vector
  addition in (ℤ/2ℤ)².
- **(iii)** No. In Z/4Z, the element 1 has order 4 (1+1+1+1=4≡0 is the first time you return
  to identity).  In V₄, every non-identity element has order 2.  Different order structure → not isomorphic.

**[P55 — SCORE]**  Award 1 point for P76 if (i) correct table + (iii) correct non-isomorphism reason; 0 otherwise.

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
  - Q1 wrong → Z/5Z table error → recompute (a+b) mod 5 for a few entries, then retry.
  - Q2 wrong → D₃ relation sr = r²s not applied correctly → revisit TA-A02 P64.
  - Q3 wrong → MC-3 → TB-R03 (solve 5+x≡0 mod 8 as equation).
  - Q4 wrong → Latin square check → revisit TA-A03 P06.
  - P76 wrong → identify: if (i) table wrong, revisit Z/nZ computation; if (iii) wrong, preview order concept.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.abst.group-operation
MASTERY_REACHED: true
UNLOCKS:         (none — lateral enrichment node)
NEXT_CONCEPT:    (instructor-directed: math.abst.cyclic-group or math.abst.group-order)
SESSION_CLOSE:   "You can now compute within finite groups using Cayley tables and modular
                  arithmetic, read whether a table represents an abelian or non-abelian group
                  from its symmetry, identify the Latin square property, and contrast Z/4Z
                  (cyclic, abelian) with D₃ (non-abelian). The Klein four-group shows that
                  group operation on 2D vectors mod 2 is exactly the group structure of V₄."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: CAYLEY-TABLE-ALWAYS-SYMMETRIC (MC-1)

**Trigger:** Student claims every Cayley table must be symmetric.

**Step 1 — Define symmetry precisely.**
> Cayley table is symmetric ↔ for all a, b: entry(a,b) = entry(b,a) ↔ a·b = b·a for all a,b
> ↔ the group is ABELIAN.  Non-abelian groups have non-symmetric tables — still valid groups.

**Step 2 — Compute sr and rs in D₃.**
> Using sr = r²s (defining relation of D₃):
> r·s = rs (in the table: row r, col s → entry rs).
> s·r = sr = r²s (row s, col r → entry r²s).
> rs ≠ r²s → table is NOT symmetric at these entries.

**Step 3 — Verify D₃ is still a group.**
> The Latin square property holds (every element once per row/col).  G1–G4 verified.  D₃ IS a group; it is not abelian.

**Exit:** Return to TA-A02 P49 checkpoint.

---

### TB-R02 · Repair: MODULAR-IDENTITY-IS-N (MC-2)

**Trigger:** Student says the identity in Z/nZ is n.

**Step 1 — Apply G3 from first principles.**
> G3: find e such that a + e ≡ a (mod n) for all a.
> a + e ≡ a → e ≡ 0 (mod n).  The identity is **0**, not n.
> Note: n ≡ 0 (mod n) — they are the same congruence class, but the canonical representative is 0.

**Step 2 — Concrete check.**
> In Z/4Z: 3 + 0 = 3 ≡ 3 ✓.  3 + 4 = 7 ≡ 3 ✓ — same result, but 4 ≡ 0 in Z/4Z.
> The element is always written as 0, not 4.

**Exit:** Return to TA-A01 P49 checkpoint, part (ii).

---

### TB-R03 · Repair: MODULAR-INVERSE-SUBTRACTION (MC-3)

**Trigger:** Student writes inverse of a in Z/nZ as −a without reduction.

**Step 1 — State G4 as an equation.**
> Find x ∈ {0, 1, …, n−1} such that a + x ≡ 0 (mod n).  The answer must be in range.

**Step 2 — Compute.**
> Inverse of 3 in Z/4Z: 3 + x ≡ 0 (mod 4) → x ≡ −3 ≡ 1 (mod 4).  Write 1, not −3.
> Verify: 3 + 1 = 4 ≡ 0 ✓.

**Step 3 — General formula.**
> Inverse of a in Z/nZ is (n − a) mod n.  For a = 0: (n − 0) mod n = 0 (self-inverse).

**Exit:** Return to TA-A01 P49 checkpoint, part (ii).

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "In Z/7Z, what is 5 + 6?  What is the inverse of 5?"
    Target: 5+6=11≡4; inverse of 5 is 2 (5+2=7≡0). PASS if both correct.

  Interval-2 (+3 days):
    Probe: "A Cayley table is symmetric. What does that tell you about the group?"
    Target: The group is abelian (commutative). PASS if this connection stated.

  Interval-3 (+1 week):
    Probe: "What is the Latin square property of a Cayley table? Which groups have it?"
    Target: Every element appears exactly once in each row and column. ALL groups (not just abelian).
            PASS if "all groups" or "every group" stated.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A01 (Z/nZ) or TA-A02 (abelian/non-abelian).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.abst.group-theory:
    Used in:   TA-A01 (G3 identity and G4 inverse verified in Z/4Z table; Latin square
               property derived from cancellation via G4), TA-A02 (G1–G4 checked for D₃;
               P64 invokes G5 as the non-required extra property), TA-A03 (Latin square
               proof uses G4's implied left cancellation).
    Assumed:   Student holds all four group axioms G1–G4 and can identify which axiom
               justifies each group-theoretic step.

UNLOCKS_ENABLED:
  (none — lateral enrichment; prerequisite for deeper group-structure concepts via instructor)

CROSS_LINKS_NOTED:
  math.linalg.vector-addition:
    Status:    Tier 1 concept — P76 uses a cross-link probe.
    P76 probe: Student builds the Cayley table for V₄ = Z/2Z × Z/2Z and recognises it
               as component-wise vector addition; compares structure to Z/4Z.
    Bridge:    Group operation in V₄ IS component-wise addition on 2-vectors over Z/2Z.
               This prepares the student for vector space axioms (vector addition as an
               abelian group axiom) and distinguishes cyclic groups from non-cyclic ones.
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. Z/nZ is the principal computational laboratory for this blueprint.**
The Cayley table for Z/4Z should be provided (as above) for TA-A01 and available throughout.
Do not ask the student to construct it from scratch before they have practised reading it.

**2. MC-1 (symmetry required) is the key conceptual gate.**
TA-A02 is a formal MC-1 gate (P41 + P64) positioned early — before TA-A03's contrast pair —
so the student enters the contrast exercise with MC-1 already cleared.  D₃ is the ideal
counterexample: small enough (6 elements) to show the asymmetric computation sr ≠ rs concretely,
yet familiar from geometry.

**3. The Latin square property is a theorem, not an axiom.**
Students sometimes confuse the Latin square property (once-per-row, once-per-column) with an
axiom.  TA-A03 makes the derivation explicit: it follows from left cancellation (a⁻¹ applied
to a·b = a·c gives b = c), which itself follows from G4 + G2.

**4. The P76 Klein four-group probe distinguishes structure from elements.**
V₄ and Z/4Z both have 4 elements but are non-isomorphic.  The P76 probe requires the student
to identify the order-structure difference (every non-identity element has order 2 in V₄ vs
order 4 for the generator in Z/4Z).  This pre-builds intuition for the isomorphism blueprint.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.abst.group-operation
==================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 6; 4 TAs used ≤ 6. ✓
[PASS] V-4   CPA_ENTRY_STAGE = C (Z/4Z Cayley table as concrete anchor before abstraction).
[PASS] V-5   P76_MODE = Cross-link with explicit rationale (math.linalg.vector-addition Tier 1).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03.
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02: P41 + P64 — D₃ non-symmetric).
[PASS] V-8   MC-2 and MC-3 addressed in TA-A01/TA-A03 and repair chains.
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P11 ✓  TA-A02→P41 ✓  TA-A03→P06 ✓  TA-A04→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49.
               TA-A01→P49 ✓  TA-A03→P49 ✓  (TA-A02 is a gate TA, has P49 for exit check)
[PASS] V-12  GR-3: Terminal TA (TA-A04) is a mastery gate containing P91.
[PASS] V-13  GR-4: P77 contains exactly 4 questions. ✓
[PASS] V-14  GR-5: P91 terminal in TA-A04 with correct compound
               P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-15  GR-6: P76 included inside P91 in the mastery gate.
[PASS] V-16  GR-9: P76 uses Cross-link mode; probe builds V₄ Cayley table and compares
              to vector addition, bridging to math.linalg.vector-addition.
[PASS] V-17  GR-10: MAMR stated; MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-18  PASS_CRITERION = ⌈0.85 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-19  P74 routing covers all score outcomes (5/5 → pass; ≤4/5 → item-specific repair).

CONTENT
[PASS] AIR   Z/4Z Cayley table provided and used as primary computational tool.
             D₃ partial table provided to illustrate non-abelian (asymmetric) group.
             Latin square property derived from cancellation (not just asserted).
             MC-1 (table symmetry = abelian) cleared via D₃ gate in TA-A02.
             MC-2 (identity is n not 0) and MC-3 (inverse is −a not (n−a) mod n) addressed.
             P76 cross-link: V₄ = Z/2Z×Z/2Z; operation IS component-wise vector addition;
             V₄ ≇ Z/4Z (order argument).

VERDICT: PACKAGE_READY
```

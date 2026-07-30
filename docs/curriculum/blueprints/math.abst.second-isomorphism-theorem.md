# Teaching Blueprint — math.abst.second-isomorphism-theorem

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.abst.second-isomorphism-theorem
KG_FIELDS:
  difficulty:        expert
  bloom:             analyze
  mastery_threshold: 0.80
  estimated_hours:   4
  requires:          [math.abst.first-isomorphism-theorem]
  unlocks:           []
  cross_links:       []

SESSION_TA_CAP:      6   (estimated_hours = 4 → cap 6)
CPA_ENTRY_STAGE:     A   (expert/analyze; theorem statement and proof are the entry point;
                          concrete subgroup lattice diagrams provide pictorial layer)
P76_MODE:            Independence
  rationale:         cross_links = []; P76 probe requires applying the theorem to a
                     specific group to identify the induced isomorphism independently.
PASS_CRITERION:      ⌈0.80 × 5⌉ = 4 out of 5
  composition:       4 P77 questions + 1 P76 independence probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
**Second Isomorphism Theorem (SIT):** Let G be a group, H ≤ G a subgroup, and N ⊴ G a normal
subgroup. Then:
(S1) HN = {hn : h ∈ H, n ∈ N} is a subgroup of G;
(S2) H ∩ N is a normal subgroup of H;
(S3) H / (H ∩ N) ≅ HN / N via the natural map h(H∩N) ↦ hN.

The SIT is also called the **Diamond Isomorphism Theorem** — the four groups H, N, HN, H∩N
form a diamond-shaped lattice. The isomorphism identifies two quotients that live on different
sides of the diamond.

### Distinction from math.abst.first-isomorphism-theorem
The First Isomorphism Theorem (FIT) says: for φ: G → H, G/ker(φ) ≅ im(φ).
The SIT does not require a homomorphism — it finds a natural isomorphism between quotients of
subgroups whose interaction is constrained by the diamond lattice structure.

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | G = Z/12Z, H = {0,4,8} ≅ Z/3Z, N = {0,6} ≅ Z/2Z |
| **Pictorial (P)** | Diamond lattice diagram: HN at top, H and N on sides, H∩N at bottom |
| **Abstract (A)** | Full theorem statement; natural map h(H∩N) ↦ hN; proof that it's well-defined and bijective |

### Prerequisite Knowledge (from KG)
- **math.abst.first-isomorphism-theorem** — FIT statement G/ker(φ) ≅ im(φ); normal subgroups;
  quotient groups; coset arithmetic; well-definedness of quotient operations

### Canonical Example
G = Z, H = 2Z (even integers), N = 3Z (multiples of 3).
- HN = 2Z + 3Z = {2a + 3b : a,b ∈ Z} = Z (since gcd(2,3)=1, Bézout gives 1 = 3−2 ∈ HN)
- H ∩ N = 2Z ∩ 3Z = 6Z
- SIT: 2Z / 6Z ≅ Z / 3Z, i.e., Z/2Z·(Z/3Z) side → verified: |2Z/6Z| = 3 = |Z/3Z| ✓

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | HN-NOT-A-SUBGROUP | Claims HN may not be a subgroup without additional conditions | Forgets that N ⊴ G (not just N ≤ G) is exactly the condition that makes HN a subgroup; conflates subgroup and normal subgroup roles | **FOUNDATIONAL** |
| MC-2 | WRONG-QUOTIENT-SIDES | Writes H/(H∩N) ≅ N/something or confuses which quotient is on which side | Misreads the diamond; doesn't track which group is normal in which ambient group | Secondary |
| MC-3 | WELL-DEFINEDNESS-SKIPPED | Applies the map h(H∩N) ↦ hN without checking that different coset representatives give the same image | Doesn't recall that quotient maps must be checked for well-definedness; assumes any formula is a valid map | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate before TA-A03.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P11 four representations: HN subgroup criterion + diamond diagram + P49)
      → TA-A02 (P41/P64 MC-1 gate: why N ⊴ G is essential for HN ≤ G + P49)
      → TA-A03 (P06 contrast: well-definedness of the map h(H∩N)↦hN; SIT vs FIT + P49)
      → TA-A04 (P91 terminal mastery gate — P76 independence probe)

Repair (Protocol B):
  MC-1 → TB-R01 (HN subgroup test: closure requires nH = Hn, i.e., N normal)
  MC-2 → TB-R02 (diamond diagram walkthrough; identify H∩N as normal in H, HN as ambient)
  MC-3 → TB-R03 (well-definedness check: if h(H∩N) = h'(H∩N) then h⁻¹h'∈H∩N, so hN=h'N)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: The Diamond Structure and Statement (P11 + P49)

**[P11 — REPRESENTATION SHIFT]**

Four representations of the Second Isomorphism Theorem:

| Representation | Statement |
|----------------|-----------|
| **Verbal** | "The intersection H∩N is normal in H, and quotienting out by it gives the same group as quotienting HN by N" |
| **Symbolic** | H, N as above → H/(H∩N) ≅ HN/N via h(H∩N) ↦ hN |
| **Diagram** | Diamond lattice: HN at top; H (left), N (right) in middle; H∩N at bottom |
| **Concrete** | G=Z, H=2Z, N=3Z: HN=Z, H∩N=6Z; 2Z/6Z ≅ Z/3Z ✓ |

Diamond lattice for G = Z, H = 2Z, N = 3Z:

```
         Z  (= HN)
        / \
      2Z   3Z
        \ /
        6Z  (= H ∩ N)
```

The left side of the diamond is H = 2Z (from 6Z up to Z going left).
The right side is N = 3Z.
SIT says: the left-side quotient H/(H∩N) = 2Z/6Z is isomorphic to the right-side ambient
quotient HN/N = Z/3Z.

Verification:
- 2Z/6Z has cosets {6Z, 2+6Z, 4+6Z} → 3 cosets → |2Z/6Z| = 3.
- Z/3Z has order 3.
- Natural map: send 2k (mod 6) to k (mod 3). Bijective and respects addition.

**[P49 — ADAPTIVE CHECKPOINT]**

> Let G = Z/12Z, H = {0,4,8} (subgroup of order 3), N = {0,6} (subgroup of order 2).
> (i) What is H ∩ N?
> (ii) What is HN (as a set)?
> (iii) What does SIT predict: what is H/(H∩N) isomorphic to?

Expected:
*(i) H∩N = {0} (the only common element; gcd(3,2)=1).*
*(ii) HN = {h+n : h∈H, n∈N} = {0+0,0+6,4+0,4+6,8+0,8+6} = {0,4,6,8,2,10} = {0,2,4,6,8,10}
     — the even residues, a subgroup of order 6.*
*(iii) H/(H∩N) = H/{0} ≅ H ≅ Z/3Z; HN/N = {0,2,4,6,8,10}/{0,6} has 3 cosets of order 2.
     By SIT: Z/3Z ≅ HN/N. |HN/N| = 6/2 = 3 ✓.*

- **CORRECT**: ✓ Advance to TA-A02.
- **PARTIAL** (HN wrong): "List all h+n for h∈{0,4,8}, n∈{0,6}." Return.
- **INCORRECT**: TB-R02 (diamond diagram). Return.
- **NO_RESPONSE**: Scaffold "H∩N = elements in both {0,4,8} and {0,6}; HN = {h+n mod 12}."

---

### TA-A02 · MC-1 Gate: Why N Must Be Normal in G (P41 + P64 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> Suppose H ≤ G and N ≤ G but N is not normal in G (N is just a subgroup).
> Is HN necessarily a subgroup of G?

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

**No.** N ⊴ G is essential for HN to be a subgroup.

**Why:** To verify HN is a subgroup under the operation, we need closure: for h₁n₁, h₂n₂ ∈ HN,
their product h₁n₁h₂n₂ must also be in HN. Rewrite:
h₁(n₁h₂)n₂.
We need n₁h₂ ∈ HN — i.e., we need h₂⁻¹n₁h₂ ∈ N (so n₁h₂ = h₂(h₂⁻¹n₁h₂) ∈ HN).
This holds for ALL h₂ ∈ H exactly when N is **normal in G** (n₁h₂ = h₂n₁' for some n₁' ∈ N).

**Counterexample:** In S₃, let H = {e, (12)} and N = {e, (13)}. Neither is normal in S₃.
HN = {e, (12), (13), (12)(13)} = {e, (12), (13), (132)}. But |HN| = 4 does not divide |S₃| = 6,
so by Lagrange's theorem, HN cannot be a subgroup. ✓ (confirms N non-normal breaks the theorem)

MC-1 cleared: **N ⊴ G is the hypothesis that makes HN a subgroup.** Without normality, HN may
not even be a subgroup.

**[P49 — ADAPTIVE CHECKPOINT]**

> G = S₄, N = V₄ = {e, (12)(34), (13)(24), (14)(23)} ⊴ S₄ (a famous normal subgroup),
> H = {e, (12)}.
> (i) Is N ⊴ G here?
> (ii) By SIT, what is H/(H∩N) isomorphic to?

Expected:
*(i) Yes — V₄ ⊴ S₄ is a standard result (kernel of S₄ → S₃ via action on three pairs).*
*(ii) H∩N: H={e,(12)}, N={e,(12)(34),(13)(24),(14)(23)}. H∩N = {e} (only e in common).
     HN = H·N: |HN| = |H|·|N|/|H∩N| = 2·4/1 = 8. (Dihedral-like subgroup.)
     H/(H∩N) = H/{e} ≅ H = Z/2Z. HN/N has order 8/4 = 2 ≅ Z/2Z. ✓*

- **CORRECT**: ✓ Advance to TA-A03.
- **PARTIAL** (right conclusion, doesn't use |HN|=|H||N|/|H∩N|): "What is |HN| here?" Return.
- **INCORRECT**: TB-R01. Return.
- **NO_RESPONSE**: Scaffold "To find H∩N: list elements in both H and N."

---

### TA-A03 · The Natural Map: Well-Definedness and the SIT vs FIT Contrast (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Contrast A — SIT uses a natural map, not a given homomorphism:**

In the FIT, we start with an EXPLICIT homomorphism φ: G → K and conclude G/ker(φ) ≅ im(φ).
In the SIT, no homomorphism is given: the map is **natural** — h(H∩N) ↦ hN.
The SIT proves that this map IS a well-defined homomorphism, IS injective, IS surjective.

**Contrast B — Well-definedness of h(H∩N) ↦ hN:**

The map sends the coset h(H∩N) to the coset hN in HN/N.
If two representatives of the same H∩N-coset differ: h and h' with h⁻¹h' ∈ H∩N.
Then h⁻¹h' ∈ N, so hN = h'N. ✓ The map is well-defined.
Injectivity: if hN = h'N then h⁻¹h' ∈ N; since h,h'∈H also h⁻¹h' ∈ H, so h⁻¹h'∈H∩N,
meaning h(H∩N) = h'(H∩N). ✓
Surjectivity: every coset hnN = hN in HN/N is the image of h(H∩N). ✓

The SIT is therefore the FIT applied to the restriction φ|_H: H → HN/N, φ(h) = hN:
ker(φ|_H) = H ∩ N (exactly the h with hN = N), so H/(H∩N) ≅ im(φ|_H) = HN/N. ✓

**[P49 — ADAPTIVE CHECKPOINT]**

> For G = Z, H = 2Z, N = 3Z (so HN = Z, H∩N = 6Z):
> The natural map φ: 2Z → Z/3Z sends 2k ↦ k mod 3.
> (i) Verify φ is a homomorphism of additive groups.
> (ii) What is ker(φ)?  Verify it equals H∩N = 6Z.

Expected:
*(i) φ(2k + 2m) = φ(2(k+m)) = k+m mod 3 = (k mod 3) + (m mod 3) = φ(2k)+φ(2m) ✓.*
*(ii) ker(φ) = {2k : k ≡ 0 mod 3} = {2k : 3|k} = {6, 12, 18, ...} ∪ {−6,...} = 6Z = H∩N ✓.
By FIT: 2Z / 6Z ≅ Z/3Z, matching the SIT conclusion.*

- **CORRECT**: ✓ Advance to TA-A04.
- **PARTIAL** (kernel wrong): "φ(2k) = 0 in Z/3Z when 3|k; list such 2k values." Return.
- **INCORRECT**: TB-R03. Return.
- **NO_RESPONSE**: Scaffold "φ(2k)=0 means k ≡ 0 mod 3. What does 2k look like then?"

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** State the Second Isomorphism Theorem precisely (list all hypotheses and conclusions).

*(Target: Hypotheses: G group, H ≤ G, N ⊴ G. Conclusions: (S1) HN ≤ G; (S2) H∩N ⊴ H;
(S3) H/(H∩N) ≅ HN/N via h(H∩N) ↦ hN. All three parts required.)*

**Q2.** In G = Z/60Z, let H = {0,15,30,45} (order 4) and N = {0,20,40} (order 3).
Identify H∩N, HN, and state what the SIT gives for H/(H∩N).

*(Target: H∩N = {0} (gcd(4,3)=1). |HN| = |H|·|N|/|H∩N| = 4·3/1 = 12. H/(H∩N) ≅ H ≅ Z/4Z.
HN/N has order 12/3 = 4 ≅ Z/4Z. SIT: Z/4Z ≅ HN/N.)*

**Q3.** Why is it essential that N ⊴ G (and not merely N ≤ G) in the SIT?

*(Target: N ⊴ G is needed for HN to be a subgroup. Without normality, products h₁n₁h₂n₂ may
not factor into HN. Also, HN/N requires N to be normal in HN (which follows from N ⊴ G) to
form a quotient group.)*

**Q4.** Explain how the SIT follows from the FIT applied to the natural map φ|_H: H → HN/N.

*(Target: Define φ|_H(h) = hN ∈ HN/N. This is a homomorphism (φ(h₁h₂) = h₁h₂N = (h₁N)(h₂N) ✓).
ker(φ|_H) = {h∈H : hN=N} = {h∈H : h∈N} = H∩N. im(φ|_H) = HN/N.
By FIT: H/ker(φ|_H) = H/(H∩N) ≅ im(φ|_H) = HN/N.)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independent reasoning probe applying SIT to a new group.*

> Let G = S₄, N = A₄ ⊴ S₄ (alternating group, index 2), H = {e, (12)} ≤ S₄.
>
> (a) Compute H ∩ N and |HN|.
> (b) Identify the groups H/(H∩N) and HN/N and state the isomorphism the SIT gives.
> (c) What is the order of each quotient group?

*Expected answers:*
- **(a)** H = {e,(12)}, N = A₄ (all even permutations). H∩N = {e} ((12) is odd). |HN| = 2·12/1 = 24 = |S₄|, so HN = S₄.
- **(b)** H/(H∩N) = H/{e} ≅ H ≅ Z/2Z. HN/N = S₄/A₄ ≅ Z/2Z. SIT: Z/2Z ≅ S₄/A₄.
- **(c)** Both quotients have order 2.

**[P55 — SCORE]**  Award 1 point if all three parts correct; 0 otherwise.

---

**[P75 — MASTERY ASSESSMENT]**

```
PASS_CRITERION: 4 out of 5 items (4 P77 + 1 P76)
THRESHOLD:      0.80  →  ⌈0.80 × 5⌉ = 4
```

**[P55 — SCORE]**  Combine P77 tally + P76 score → total out of 5.

**[P74 — ROUTING DECISION]**

- **Score ≥ 4/5 → MASTERY ACHIEVED.** Proceed to P78.
- **Score ≤ 3/5 → Identify which items failed:**
  - Q1 wrong → missing a hypothesis or conclusion → re-state theorem in full.
  - Q2 wrong → MC-2 active → TB-R02 (diamond diagram; which group is normal in which).
  - Q3 wrong → MC-1 active → TB-R01 (counterexample in S₃ where HN not a subgroup).
  - Q4 wrong → FIT connection gap → TB-R03 (well-definedness + kernel identification).
  - P76 wrong → identify part (a/b/c) that failed; re-route to matching repair.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.abst.second-isomorphism-theorem
MASTERY_REACHED: true
UNLOCKS:         []
NEXT_CONCEPT:    (continue math.abst domain)
SESSION_CLOSE:   "You now know the Second Isomorphism Theorem: given H ≤ G and N ⊴ G,
                  HN is a subgroup, H∩N is normal in H, and H/(H∩N) ≅ HN/N. You can
                  apply the diamond lattice to identify the quotient groups, and you
                  understand why N must be normal in G for the theorem to hold."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: HN-NOT-A-SUBGROUP (MC-1)

**Trigger:** Student is unsure why N must be normal (vs. just a subgroup) for HN to be a subgroup.

**Step 1 — Show failure without normality.**
> S₃: H = {e,(12)}, N = {e,(13)} — both subgroups but neither normal.
> HN = {e,(12),(13),(12)(13)} = {e,(12),(13),(132)}: 4 elements. |S₃| = 6. 4 does not divide 6.
> By Lagrange, HN cannot be a subgroup. ✓ Normality is not optional.

**Step 2 — Show why normality fixes it.**
> N ⊴ G means gNg⁻¹ = N for all g ∈ G. In particular, for h ∈ H: hNh⁻¹ = N.
> So when we compute (h₁n₁)(h₂n₂) = h₁(h₂·h₂⁻¹n₁h₂)n₂ = h₁h₂·(n₁')n₂ where n₁' = h₂⁻¹n₁h₂ ∈ N.
> Product = (h₁h₂)(n₁'n₂) ∈ HN ✓.

**Exit:** Return to TA-A02 P49.

---

### TB-R02 · Repair: WRONG-QUOTIENT-SIDES (MC-2)

**Trigger:** Student confuses which group is quotient by which in H/(H∩N) ≅ HN/N.

**Step 1 — Draw the diamond.**
> Four groups form a diamond:
> - Top: HN (the "join" of H and N)
> - Left: H; Right: N
> - Bottom: H∩N (the "meet" of H and N)
> Left-side quotient: H / (H∩N). Right-side ambient quotient: HN / N.
> The isomorphism connects left-bottom to right-bottom via the top.

**Step 2 — Apply to the example.**
> G = Z, H = 2Z, N = 3Z, HN = Z, H∩N = 6Z.
> Left quotient: 2Z / 6Z. Right quotient: Z / 3Z.
> SIT: 2Z / 6Z ≅ Z / 3Z. (Not Z/6Z ≅ something.)

**Exit:** Return to TA-A03 P49.

---

### TB-R03 · Repair: WELL-DEFINEDNESS-SKIPPED (MC-3)

**Trigger:** Student applies φ(h(H∩N)) = hN without checking well-definedness.

**Step 1 — Why it matters.**
> A coset h(H∩N) has many representatives: h, h·x, h·y for x,y ∈ H∩N.
> Well-definedness means: regardless of which representative we use, the image is the same coset.

**Step 2 — Check it.**
> Suppose h(H∩N) = h'(H∩N), so h⁻¹h' ∈ H∩N ⊆ N.
> Then h⁻¹h' ∈ N, so hN = h'N. ✓ The image is the same.

**Exit:** Return to TA-A03 P49.

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "State the SIT. How many conclusions does it have?"
    Target: Three conclusions: HN ≤ G; H∩N ⊴ H; H/(H∩N) ≅ HN/N.

  Interval-2 (+3 days):
    Probe: "In G=Z, H=4Z, N=6Z: find H∩N and HN, then state what SIT gives."
    Target: H∩N = 12Z (lcm(4,6)=12). HN = 2Z (gcd(4,6)=2). SIT: 4Z/12Z ≅ 2Z/6Z.
            (Both ≅ Z/3Z, order 3.)

  Interval-3 (+1 week):
    Probe: "Why can't we drop the hypothesis N ⊴ G in the SIT?"
    Target: Without N ⊴ G, HN may not be a subgroup (S₃ counterexample). Also
            HN/N requires N ⊴ HN to form a quotient group.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (normality gate) or TA-A03 (diamond).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.abst.first-isomorphism-theorem:
    Used in:   TA-A03 (SIT derived from FIT applied to the restriction map h↦hN;
               ker identification as H∩N; image as HN/N),
               TA-A04 Q4 (formal proof path: restrict→apply FIT→identify kernel).
    Assumed:   Student holds the FIT statement G/ker(φ)≅im(φ), knows how to identify
               kernels and images, understands well-definedness of quotient maps.

CROSS_LINKS_NOTED:
  (none — cross_links = [])
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. The diamond diagram is the single most useful pedagogical tool for the SIT.**
Draw it at the start. Label all four vertices. Identify which quotient is on which "side." Students
who sketch the diamond make far fewer errors in applying the theorem than those who work purely
symbolically.

**2. The SIT-via-FIT derivation (TA-A03 Contrast B) is the proof sketch that sticks.**
Rather than proving the SIT from scratch, show it as a corollary of the FIT. Define φ|_H, compute
ker = H∩N, compute im = HN/N, apply FIT. This approach reuses the FIT immediately and reinforces
it, rather than introducing a separate standalone proof.

**3. MC-1 (HN not a subgroup) is easy to miss because students have many examples where N is normal.**
The S₃ counterexample with two non-normal 2-element subgroups is concrete and produces a violation
of Lagrange's theorem (4 does not divide 6), making the failure unambiguous.

**4. At bloom=analyze, Q4 requires the student to construct the derivation, not just recall it.**
The connection SIT→FIT is a non-trivial analysis step at this level. Students who can independently
identify φ|_H, compute its kernel as H∩N, and invoke the FIT have reached the bloom target.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.abst.second-isomorphism-theorem
=============================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 6; 4 TAs used ≤ 6.
[PASS] V-4   CPA_ENTRY_STAGE = A (expert/analyze; diamond structure introduced abstractly first).
[PASS] V-5   P76_MODE = Independence with explicit rationale (cross_links = []).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03 (MAMR).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02: P41 + P64 — S₃ counterexample; normality proof).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A03; TB-R02/R03).
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
[PASS] V-17  GR-9: P76 uses Independence mode; probe applies SIT to (S₄, A₄, H={e,(12)})
              requiring student to compute H∩N, HN, and both quotient groups independently.
[PASS] V-18  GR-10: MAMR = 4/5; MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.80 × 5⌉ = 4/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (≥4/5 → pass; ≤3/5 → item-specific repair).

CONTENT
[PASS] AIR   SIT stated with all hypotheses (H≤G, N⊴G) and three conclusions (S1, S2, S3).
             Diamond diagram introduced and labeled with four vertices.
             Concrete examples: Z with H=2Z, N=3Z; Z/60Z with H={0,15,30,45}, N={0,20,40};
             S₄ with N=A₄ in P76.
             MC-1: S₃ counterexample shows HN not a subgroup when N not normal (|HN|=4∤6).
             MC-2: Diamond diagram walkthrough clarifies which quotient on which side.
             MC-3: Well-definedness of h(H∩N)↦hN proved rigorously.
             Q4: SIT derived from FIT via restriction map — the analysis-level synthesis task.

VERDICT: PACKAGE_READY
```

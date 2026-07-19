# Teaching Blueprint: Subgroup (`math.abst.subgroup`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.abst.subgroup` |
| name | Subgroup |
| domain | Abstract Algebra |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.abst.group-theory` |
| unlocks | `math.abst.coset`, `math.abst.normal-subgroup` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct criterion, grounded immediately in already-known group examples |
| description (KG) | H≤G iff H is non-empty, closed under the operation, and closed under inverses (subgroup criterion). Equivalently: ∀a,b∈H, ab⁻¹∈H. Trivial subgroups: {e} and G itself. |

## Component 1 — Learning Objectives

- LO1: State the **subgroup criterion**: $H\leq G$ (H is a subgroup of G) iff $H$ is **non-empty**, **closed under the group operation**, and **closed under inverses** — and verify each condition explicitly for a given candidate subset $H$.
- LO2: State and apply the **equivalent one-line criterion**: $H\leq G$ iff $H$ is non-empty and $\forall a,b\in H, ab^{-1}\in H$ — and explain why this single condition is logically equivalent to (encapsulates) the three separate conditions of LO1.
- LO3: Identify the two **trivial subgroups** — $\{e\}$ (just the identity) and $G$ itself — present in EVERY group, and correctly distinguish these from **proper** (non-trivial) subgroups, verifying the subgroup criterion for a genuinely proper example.

## Component 2 — Prerequisite Check

Assumes mastery of `math.abst.group-theory` (the group axioms: closure, associativity, identity, inverses; the concept of a group $(G,\cdot)$).

## Component 3 — Core Explanation

A subset $H\subseteq G$ is a **subgroup** of $G$ (written $H\leq G$) if $H$ itself forms a group under the SAME operation as $G$. The **subgroup criterion** gives a practical checklist:
1. **Non-empty**: $H\neq\emptyset$ (in practice, usually verified by checking $e\in H$, the identity).
2. **Closed under the operation**: for all $a,b\in H$, $ab\in H$ (the product stays within $H$).
3. **Closed under inverses**: for all $a\in H$, $a^{-1}\in H$.
(Associativity is automatically inherited from $G$ — it holds for ALL elements of $G$, hence for the subset $H$ too, requiring no separate check.)

**The equivalent one-line criterion**: $H\leq G$ iff $H\neq\emptyset$ and $\forall a,b\in H, ab^{-1}\in H$. This single condition packages closure and inverse-closure together: setting $a=b$ gives $aa^{-1}=e\in H$ (identity is in $H$); then for any specific $b\in H$, setting $a=e$ (now known to be in $H$) gives $eb^{-1}=b^{-1}\in H$ (inverse-closure); then for any $a,b\in H$, since $b^{-1}\in H$ (just shown), applying the criterion to $a$ and $b^{-1}$ gives $a(b^{-1})^{-1}=ab\in H$ (operation-closure) — so the single compact condition genuinely implies all three separate ones.

**Trivial subgroups**: EVERY group $G$ has (at least) two subgroups: $\{e\}$ (just the identity element alone — trivially closed, since $ee=e$ and $e^{-1}=e$) and $G$ itself (trivially a subgroup of itself). These are called the **trivial subgroups**. Any OTHER subgroup (neither $\{e\}$ nor all of $G$) is called a **proper** subgroup.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the three-part criterion)**: In $G=(\mathbb{Z},+)$, let $H=2\mathbb{Z}=\{\ldots,-4,-2,0,2,4,\ldots\}$ (the even integers). Non-empty: $0\in H$. ✓ Closed under $+$: sum of two even integers is even. ✓ Closed under inverses (negation, in this additive group): negative of an even integer is even. ✓ All three conditions hold — $H\leq G$.

**Example 2 (LO2 — the one-line criterion, applied directly)**: Same $H=2\mathbb{Z}$ in $(\mathbb{Z},+)$ (note: the group operation is $+$, so "$ab^{-1}$" becomes "$a-b$" in additive notation). Check: for $a,b\in H$ (both even), is $a-b\in H$? Difference of two even numbers is always even. ✓ Confirms $H\leq G$ via the single compact criterion, without separately checking closure and inverse-closure.

**Example 3 (LO3 — trivial vs. proper subgroups, breaking MC-1)**: In $G=(\mathbb{Z}/6\mathbb{Z},+)$ (integers mod 6): the trivial subgroups are $\{0\}$ and all of $\mathbb{Z}/6\mathbb{Z}=\{0,1,2,3,4,5\}$. A PROPER subgroup: $H=\{0,2,4\}$ — check: non-empty ($0\in H$), closed under $+\pmod6$ ($2+4=6\equiv0\in H$, $2+2=4\in H$, $4+4=8\equiv2\in H$), closed under inverses ($-2\equiv4\in H$, $-4\equiv2\in H$). All hold — $H=\{0,2,4\}$ is a genuine PROPER subgroup, neither trivial subgroup. A student who claims "$\{0,2,4\}$ isn't really a subgroup since it's not the whole group or just the identity" would be confusing "proper" (a legitimate, non-trivial subgroup) with "not a subgroup at all."

## Component 5 — Teaching Actions

### Teaching Action A01 — The Three-Part Criterion, via a Familiar Group (Primitive P11: Representation Shift)

Recall the already-known group $(\mathbb{Z},+)$. State: "a subgroup is a SUBSET that's ALSO a group in its own right, under the same operation — check three things: does it contain the identity (or at least is non-empty), does combining two elements from the subset stay IN the subset, and does inverting an element from the subset stay IN the subset?" Work Example 1's full three-part verification for the even integers explicitly.

Shift representation to the compact one-line criterion, working Example 2's direct application to the same set, showing it reaches the identical conclusion more efficiently.

- **MC-1 hook**: present Example 3's $H=\{0,2,4\}\leq\mathbb{Z}/6\mathbb{Z}$ and ask "is this a genuine subgroup, or does it not count since it's not one of the trivial ones?" — an answer suggesting it "doesn't count" reveals MC-1 (confusing "proper" — a legitimate non-trivial subgroup — with "not actually a subgroup").

### Teaching Action A02 — Trivial vs. Proper Subgroups, and the One-Line Criterion's Derivation (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place the two trivial subgroups ($\{0\}$ and all of $\mathbb{Z}/6\mathbb{Z}$) directly beside the proper subgroup $\{0,2,4\}$ from Example 3 — verify all three satisfy the subgroup criterion equally validly. State the rule: "'trivial' just means 'always present, in every group, for free' — it does NOT mean 'the only real subgroups.' A proper subgroup is every bit as much a genuine subgroup as the trivial ones; it's simply neither of the two automatic cases."

**Contrast 2**: Walk through the one-line criterion's derivation (Component 3) step by step, showing explicitly how setting $a=b$ recovers the identity, then how the identity recovers inverse-closure, then how inverse-closure recovers operation-closure — demonstrating the compact criterion isn't a DIFFERENT test, but a cleverly sequenced way of extracting all three original conditions from one compact statement.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify, using the three-part criterion, that $H=3\mathbb{Z}=\{\ldots,-6,-3,0,3,6,\ldots\}$ is a subgroup of $(\mathbb{Z},+)$.
  2. Verify the same $H=3\mathbb{Z}$ using the equivalent one-line criterion ($a-b\in H$ for all $a,b\in H$), confirming it gives the same conclusion.
  3. In $G=(\mathbb{Z}/8\mathbb{Z},+)$, determine whether $H=\{0,4\}$ is a subgroup, checking all relevant conditions.
  4. State the two trivial subgroups of $(\mathbb{Z}/8\mathbb{Z},+)$, and explain why the $H=\{0,4\}$ subgroup from problem 3 (assuming it checks out) is classified as "proper" rather than "not a real subgroup."
- **P76 (Transfer Probe, mode = independence)**: "A cryptographic protocol works within the group of integers modulo a large prime $p$ under multiplication, $(\mathbb{Z}/p\mathbb{Z})^*$. A specific security scheme relies on a smaller SUBGROUP $H$ of this larger group — a set of values closed under multiplication and inverses within the same modular arithmetic — chosen specifically because it's neither the trivial identity-only subgroup nor the entire group. (a) Explain, using this lesson's proper-vs-trivial distinction, why choosing a PROPER subgroup (neither trivial case) makes sense for a scheme that needs a subgroup smaller than the full group but with genuine internal structure (more than just the identity). (b) Explain what the protocol designers would need to verify (using this lesson's subgroup criterion) before trusting that their chosen set $H$ genuinely behaves as a self-contained algebraic structure under the group's operation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PROPER-SUBGROUP-TREATED-AS-NOT-A-REAL-SUBGROUP | Confusing "proper subgroup" (a genuine, legitimate non-trivial subgroup) with "not actually a subgroup," believing only the trivial subgroups $\{e\}$ and $G$ truly count | Foundational |
| MC-2 | ASSOCIATIVITY-CHECKED-UNNECESSARILY | Attempting to separately verify associativity for a candidate subgroup, not recognizing it's automatically inherited from $G$ and requires no independent check | Minor |
| MC-3 | ONE-LINE-CRITERION-MISAPPLIED-WITHOUT-CORRECT-OPERATION-NOTATION | When applying the compact $ab^{-1}\in H$ criterion in an ADDITIVE group (where the "operation" is $+$ and "inverse" is negation), failing to correctly translate the criterion to $a-b\in H$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Proper Subgroup Dismissed as Non-Subgroup") → P41 (detect: present a genuine proper subgroup and ask if it "really counts" as a subgroup) → P64 (conceptual shift: re-anchor on "trivial just means 'automatically present in every group' — proper subgroups are every bit as legitimate, just not automatic").
- **B02 (targets MC-2)**: P27 (name it: "Unnecessary Associativity Check") → P41 (detect: check whether a student attempts to independently verify associativity when checking the subgroup criterion) → P64 (conceptual shift: re-anchor on "associativity is a property of the OPERATION itself, already established for all of $G$ — a subset automatically inherits it, with nothing new to check").
- **B03 (targets MC-3)**: P27 (name it: "One-Line Criterion Notation Mismatch") → P41 (detect: check whether a student correctly translates $ab^{-1}$ into $a-b$ when working in an additive group) → P64 (conceptual shift: re-derive by explicitly restating the operation and inverse notation for the specific group in question before applying the criterion).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.abst.group-theory` (the group axioms and structure this concept's subsets are checked against).
- **Unlocks**: `math.abst.coset` (cosets are defined directly in terms of a subgroup $H$), `math.abst.normal-subgroup` (a further, stronger condition refining this concept's basic subgroup notion).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/apply tag places this at the "2 main TAs + gate" tier — A01 (the three-part criterion, grounded in a familiar group) and A02 (trivial-vs-proper contrast plus the one-line criterion's derivation) jointly cover all three LOs.
- MC-1 (proper subgroup treated as not a real subgroup) was made this blueprint's central focus because the word "trivial" in everyday usage suggests "the only simple/obvious cases," easily misread as "the only genuine cases," precisely inverting the intended meaning ("trivial" = automatically present, NOT "the only real ones") — this blueprint's Example 3 and Contrast 1 were specifically designed to directly counter this reading.
- The cryptographic-subgroup transfer probe was chosen because subgroup structure genuinely underlies real cryptographic protocols (e.g. discrete-log-based schemes working within a specific subgroup of a larger multiplicative group), giving the proper-vs-trivial distinction concrete, applied stakes beyond abstract classification exercises.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.abst.group-theory`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in known group examples) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Congruence (`math.nt.congruence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.congruence` |
| name | Congruence |
| domain | Number Theory |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.nt.modular-arithmetic`, `math.found.equivalence-relation` |
| unlocks | `math.nt.residue-classes` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with direct divisibility checks on specific integer pairs before the general equivalence-relation verification |
| description (KG) | Two integers a and b are congruent modulo n (a ≡ b (mod n)) if n \| (a − b); congruence is an equivalence relation partitioning ℤ into residue classes. |

## Component 1 — Learning Objectives

- LO1: Define $a\equiv b\pmod n$ as $n\mid(a-b)$, and verify this directly on specific integer pairs — correctly distinguishing congruence (a WEAKER relation than equality, holding for many distinct integer pairs) from literal numerical equality.
- LO2: Prove that congruence modulo $n$ is an **equivalence relation**, by directly reusing `math.found.equivalence-relation`'s own reflexive/symmetric/transitive verification procedure on this specific relation, rather than treating the proof as requiring new machinery.
- LO3: Apply the resulting **partition** of $\mathbb{Z}$ into **residue classes** modulo $n$ — recognizing there are EXACTLY $n$ such classes (one per possible remainder $0,1,\dots,n-1$), each infinite, with every integer belonging to exactly one — as a direct instance of `math.found.equivalence-relation`'s own Partition Theorem.

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.modular-arithmetic` (arithmetic on residues modulo $n$) and `math.found.equivalence-relation` (a relation is an equivalence relation iff reflexive AND symmetric AND transitive, all three checked directly; the resulting Partition Theorem — equivalence classes are pairwise disjoint or identical, and collectively exhaustive).

## Component 3 — Core Explanation

**Congruence is divisibility of the difference, a genuinely weaker condition than equality**: $a\equiv b\pmod n$ means $n\mid(a-b)$ — the difference $a-b$ is an exact multiple of $n$. This holds for MANY pairs of distinct integers (any two integers differing by a multiple of $n$), not just when $a=b$ literally. Congruence and equality are related but distinct notions: every equal pair is trivially congruent (difference $0$, divisible by every $n$), but congruent pairs are typically NOT equal.

**Verifying congruence is an equivalence relation reuses the already-mastered three-step procedure directly, with no new technique**: `math.found.equivalence-relation` established that a relation is an equivalence relation exactly when reflexive, symmetric, and transitive all hold. Applying this DIRECTLY to $\equiv\pmod n$: reflexive ($n\mid(a-a)=n\mid0$, always true, since $0$ is divisible by every integer); symmetric ($n\mid(a-b)\Rightarrow n\mid(b-a)$, since $b-a=-(a-b)$, and divisibility is preserved under negation); transitive ($n\mid(a-b)$ and $n\mid(b-c)\Rightarrow n\mid(a-c)$, since $a-c=(a-b)+(b-c)$, a sum of two multiples of $n$ is itself a multiple of $n$). Each step is a direct algebraic verification, using exactly the checking discipline already established, not a new proof strategy invented specifically for congruence.

**$\mathbb{Z}$ partitions into exactly $n$ residue classes**: applying `math.found.equivalence-relation`'s own Partition Theorem directly to $\equiv\pmod n$: the equivalence classes (residue classes) are pairwise disjoint or identical, and collectively exhaustive — every integer belongs to exactly one. Because the possible remainders when dividing by $n$ are exactly $0,1,\dots,n-1$ ($n$ possibilities), there are EXACTLY $n$ residue classes — no more, no fewer — each one an infinite set of integers all sharing the same remainder mod $n$.

## Component 4 — Worked Examples

**Example 1 (LO1 — congruence holds for distinct integers, and fails to hold for others, breaking MC-1)**: Is $7\equiv2\pmod5$? Check: $5\mid(7-2)=5\mid5$ — YES, true, even though $7\ne2$ as integers. Now is $7\equiv3\pmod5$? Check: $5\mid(7-3)=5\mid4$ — NO, $4/5$ is not an integer, so FALSE. Congruence genuinely relates distinct integers (like $7$ and $2$) while correctly distinguishing which pairs qualify (not $7$ and $3$) — it is not a disguised form of equality, nor does it hold indiscriminately for every pair of distinct integers.

**Example 2 (LO2 — the equivalence-relation proof reuses the established procedure directly, breaking MC-2)**: Reflexive: for any integer $a$, $a-a=0$, and $n\mid0$ always (every integer divides $0$) ✓. Symmetric: if $n\mid(a-b)$, write $a-b=kn$ for some integer $k$; then $b-a=-kn=(-k)n$, so $n\mid(b-a)$ too ✓. Transitive: if $n\mid(a-b)$ and $n\mid(b-c)$, write $a-b=k_1n$ and $b-c=k_2n$; then $a-c=(a-b)+(b-c)=(k_1+k_2)n$, so $n\mid(a-c)$ ✓. All three properties verified using the exact same style of direct algebraic argument `math.found.equivalence-relation`'s own examples used — confirming congruence modulo $n$ is a genuine equivalence relation, with no new proof technique required.

**Example 3 (LO3 — exactly $n$ residue classes, breaking MC-3)**: For $n=4$, there are EXACTLY 4 residue classes: $[0]=\{\dots,-8,-4,0,4,8,\dots\}$, $[1]=\{\dots,-7,-3,1,5,9,\dots\}$, $[2]=\{\dots,-6,-2,2,6,10,\dots\}$, $[3]=\{\dots,-5,-1,3,7,11,\dots\}$. Every integer belongs to EXACTLY one of these 4 classes — for instance, $17=4(4)+1$, so $17\in[1]$. There is no 5th class, and merging any two of these four would violate the Partition Theorem's disjoint-or-identical guarantee (e.g., $[0]$ and $[1]$ share no elements — $0$ is never congruent to $1$ mod $4$). The count is fixed at exactly $n=4$, directly instantiating `math.found.equivalence-relation`'s Partition Theorem for this specific relation.

## Component 5 — Teaching Actions

### Teaching Action A01 — Congruence Relates Distinct Integers, Selectively (Primitive P06: Contrast Pair)

Contrast Example 1's two checks: $7\equiv2\pmod5$ (true, despite $7\ne2$) against $7\equiv3\pmod5$ (false). State: "congruence holds for many pairs of genuinely different integers — but not indiscriminately for every pair; the divisibility check $n\mid(a-b)$ decides which pairs qualify."

- **MC-1 hook**: ask "does $a\equiv b\pmod n$ mean $a$ and $b$ are literally the same number?" — a "yes" answer reveals MC-1 (conflating congruence with equality).

### Teaching Action A02 — The Equivalence-Relation Proof Reuses the Established Procedure, Not New Machinery (Primitive P11: Representation Shift)

State: "proving congruence is an equivalence relation isn't a new kind of proof — it's the exact same reflexive/symmetric/transitive checklist you already mastered, applied to this specific relation." Work Example 2's three direct algebraic verifications side by side with the general procedure's structure.

- **MC-2 hook**: ask "does verifying that congruence modulo n is an equivalence relation require a fundamentally new proof technique, beyond the reflexive/symmetric/transitive checks already established?" — a "yes" answer reveals MC-2 (missing that this is a direct application of already-mastered machinery, not new theory).

### Teaching Action A03 — Exactly n Residue Classes, No More and No Fewer (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: for $n=4$, exactly 4 residue classes exist, collectively containing every integer with no overlaps. State: "the number of residue classes is fixed by the modulus itself — $n$ possible remainders means exactly $n$ classes, always."

- **MC-3 hook**: ask "could the number of residue classes modulo a fixed $n$ vary, or be different from $n$ itself?" — a "yes" answer reveals MC-3 (missing that the count is fixed at exactly $n$, directly following from the Partition Theorem).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Determine whether $23\equiv8\pmod5$, showing the divisibility check directly.
  2. Verify reflexivity of $\equiv\pmod7$ directly for $a=12$.
  3. List all residue classes modulo $3$, and state which class contains $100$.
  4. Explain why $[0]$ and $[2]$ modulo $4$ must be disjoint, using the Partition Theorem's disjoint-or-identical guarantee.
- **P76 (Transfer Probe, mode = independence)**: "A cryptographic protocol groups integer keys by their remainder modulo a large prime $p$. (a) Using this lesson's congruence definition, explain how to check directly whether two specific keys $k_1$ and $k_2$ belong to the same residue class modulo $p$, without computing either key's actual remainder first. (b) A colleague asks whether proving 'same residue class membership' is an equivalence relation requires developing new mathematical machinery specific to cryptographic key values. Using this lesson's reuse of the general equivalence-relation procedure, explain why the answer is no. (c) The colleague also claims 'since $p$ is a very large prime, there could be far more than $p$ distinct residue classes modulo $p$, given how large the integers involved are.' Explain specifically why this claim is incorrect, referencing the Partition Theorem's exact count."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONGRUENCE-CONFLATED-WITH-EQUALITY | Believing a≡b (mod n) means a and b are literally the same integer, missing that congruence is a weaker relation holding for many distinct integer pairs | Foundational |
| MC-2 | CONGRUENCE-EQUIVALENCE-PROOF-ASSUMED-TO-NEED-NEW-MACHINERY | Believing proving congruence is an equivalence relation requires new proof techniques, missing that it directly reuses the already-established reflexive/symmetric/transitive checking procedure | Moderate |
| MC-3 | RESIDUE-CLASS-COUNT-ASSUMED-VARIABLE | Believing the number of residue classes modulo a fixed n could vary or differ from n itself, missing that the Partition Theorem fixes the count at exactly n | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Congruence Conflated with Equality") → P41 (detect: ask a student whether $a\equiv b\pmod n$ means $a=b$, checking for "yes") → P64 (conceptual shift: re-walk Example 1's $7\equiv2\pmod5$ (true, distinct integers) alongside $7\equiv3\pmod5$ (false), re-anchoring on "congruence is divisibility of the difference, not equality").
- **B02 (targets MC-2)**: P27 (name it: "Congruence Equivalence Proof Assumed to Need New Machinery") → P41 (detect: ask a student whether a new proof technique is needed to show congruence is an equivalence relation, checking for "yes") → P64 (conceptual shift: re-walk Example 2's direct reflexive/symmetric/transitive verifications, re-anchoring on "this is the same checklist already mastered, applied to one specific relation").
- **B03 (targets MC-3)**: P27 (name it: "Residue Class Count Assumed Variable") → P41 (detect: ask a student whether the number of residue classes modulo n could differ from n, checking for "yes") → P64 (conceptual shift: re-walk Example 3's complete 4-class enumeration for n=4, re-anchoring on "the Partition Theorem fixes the count at exactly n, always").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.modular-arithmetic` (residue arithmetic this concept's congruence relation formalizes), `math.found.equivalence-relation` (the reflexive/symmetric/transitive checking procedure and Partition Theorem this concept applies directly to congruence).
- **Unlocks**: `math.nt.residue-classes` (deepens the study of the residue classes this concept establishes via the Partition Theorem).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/understand tag places this at a "3 TAs + gate" tier; the concept's central pedagogical move (directly reusing `math.found.equivalence-relation`'s procedure and Partition Theorem, rather than re-deriving equivalence-relation theory from scratch) is reflected throughout, keeping the concept efficient despite covering three distinct learning objectives.
- **Division of labor**: `math.nt.modular-arithmetic` owns residue arithmetic operations; `math.found.equivalence-relation` owns the general reflexive/symmetric/transitive framework and Partition Theorem. This concept, `math.nt.congruence`, deliberately does not re-derive either; it owns the SPECIFIC application of the equivalence-relation framework to the divisibility-based congruence relation, and the resulting residue-class partition as a concrete instance of the general theorem.
- Example 2 was deliberately structured to mirror `math.found.equivalence-relation`'s own example format (checking each property in turn with direct algebraic justification) rather than inventing a new presentation style, reinforcing for the learner that this is genuinely the same procedure, not a superficially similar but different one.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: divisibility checks on specific integer pairs before the general equivalence-relation verification) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

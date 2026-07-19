# Teaching Blueprint: Symmetric Group (`math.abst.symmetric-group`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.abst.symmetric-group` |
| name | Symmetric Group |
| domain | Abstract Algebra |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.abst.group-theory` |
| unlocks | `math.abst.alternating-group` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — physically shuffling 3 labeled objects, before the formal Sₙ definition |
| description (KG) | Sₙ = all bijections on {1,…,n}; \|Sₙ\|=n!. Every finite group embeds in Sₙ (Cayley's theorem). Cycle notation; cycle structure determines conjugacy class. Transpositions generate Sₙ. |

## Component 1 — Learning Objectives

- LO1: Define $S_n$ as the group of ALL bijections (permutations) of $\{1,\dots,n\}$ under composition, directly verifying `math.abst.group-theory`'s own group axioms (closure, associativity, identity, inverses) hold — and confirm $|S_n|=n!$ by direct counting.
- LO2: Apply **cycle notation** to represent and analyze permutations, and recognize that the **cycle structure** (the multiset of cycle lengths) determines the **conjugacy class** — two permutations are conjugate in $S_n$ if and only if they share the same cycle structure.
- LO3 (orientation level — full development deferred): recognize **Cayley's theorem** (every finite group embeds in some $S_n$) as a deep structural fact, and recognize that **transpositions generate $S_n$** (every permutation is a product of $2$-cycles) — deferred to `math.abst.alternating-group`'s development of the resulting even/odd distinction.

## Component 2 — Prerequisite Check

Assumes mastery of `math.abst.group-theory` (the four group axioms — closure, associativity, identity, inverses — and how to verify them for a candidate group).

## Component 3 — Core Explanation

**$S_n$ genuinely satisfies the group axioms**: $S_n$ consists of ALL bijections of $\{1,\dots,n\}$, under function composition. Verifying `math.abst.group-theory`'s own axioms: CLOSURE (composing two bijections of $\{1,\dots,n\}$ gives another bijection of the same set); IDENTITY (the identity permutation, fixing every element); INVERSES (every bijection has an inverse bijection); ASSOCIATIVITY (function composition is always associative). Counting directly: there are $n$ choices for where $1$ maps, $n-1$ remaining choices for where $2$ maps, and so on, giving $|S_n|=n!$.

**Cycle notation and conjugacy classes**: a permutation can be written as a product of disjoint CYCLES (e.g. $(1\,3)(2\,4\,5)$ means $1\leftrightarrow3$ and $2\to4\to5\to2$). The **cycle structure** — the multiset of cycle lengths appearing (here: one $2$-cycle, one $3$-cycle) — is a powerful invariant: two permutations in $S_n$ are CONJUGATE if and only if they have the SAME cycle structure, a fact that replaces laborious case-by-case searching for an explicit conjugating element with a simple structural comparison.

**Cayley's theorem and transposition generation (orientation level)**: Cayley's theorem states every finite group $G$ embeds in $S_{|G|}$ — a genuine INJECTIVE, structure-preserving copy of $G$ sitting inside $S_{|G|}$, not necessarily an ONTO identification (the ambient $S_{|G|}$ can be far larger than $G$ itself). Separately, every permutation can be written as a product of TRANSPOSITIONS (2-cycles) — this decomposition is the seed of the even/odd permutation distinction, fully developed in `math.abst.alternating-group`.

## Component 4 — Worked Examples

**Example 1 (LO1 — Sₙ satisfies the group axioms, and |Sₙ|=n!, breaking MC-1)**: for $n=3$, $S_3$ consists of all $6$ bijections of $\{1,2,3\}$ (the identity, three transpositions, two $3$-cycles) — matching $3!=6$ directly counted ($3$ choices for where $1$ goes, $2$ remaining choices for where $2$ goes, $1$ remaining choice for $3$). Verifying the group axioms directly: CLOSURE (composing any two bijections of $\{1,2,3\}$ gives another bijection of $\{1,2,3\}$); IDENTITY (the identity permutation); INVERSES (every bijection has an inverse undoing it); ASSOCIATIVITY (function composition is always associative). $S_3$ genuinely satisfies every group axiom, confirmed directly rather than assumed.

**Example 2 (LO2 — cycle notation and conjugacy classes, breaking MC-2)**: in $S_5$, the permutation sending $1\to3,3\to1,2\to4,4\to5,5\to2$ is written in cycle notation as $(1\,3)(2\,4\,5)$ — a $2$-cycle and a $3$-cycle, disjoint. Its cycle STRUCTURE is "one $2$-cycle, one $3$-cycle." Any OTHER permutation in $S_5$ with the SAME cycle structure — e.g. $(1\,5)(2\,3\,4)$ — is CONJUGATE to it, a fact that would otherwise require laboriously searching for an explicit conjugating element.

**Example 3 (LO3, orientation level — Cayley's theorem and transposition generation, breaking MC-3)**: Cayley's theorem: a group $G$ of order $4$ EMBEDS in $S_4$ (which itself has order $24$, much larger — the embedding is injective, not onto). Separately, ANY permutation decomposes into transpositions: the $3$-cycle $(1\,2\,3)$ equals $(1\,3)(1\,2)$ (verify by composing right-to-left: $1\to2$ via $(1\,2)$, unaffected by $(1\,3)$, net $1\to2$; $2\to1$ via $(1\,2)$, then $1\to3$ via $(1\,3)$, net $2\to3$; $3$ unaffected by $(1\,2)$, then $3\to1$ via $(1\,3)$, net $3\to1$ — matching $(1\,2\,3)$ exactly). This decomposition is the seed of the even/odd distinction `math.abst.alternating-group` develops fully.

## Component 5 — Teaching Actions

### Teaching Action A01 — Group Membership Is Verified, Not Assumed (Primitive P11: Representation Shift)

State: "$S_n$ isn't automatically a group just because it's called one — every axiom (closure, identity, inverses, associativity) genuinely holds and can be checked directly." Work Example 1's axiom-by-axiom verification for $S_3$.

- **MC-1 hook**: ask "is $S_n$ automatically a group simply by being called 'the set of permutations,' without checking the actual group axioms?" — a "yes" answer reveals MC-1 (treating group membership as automatic rather than a checkable, verified fact).

### Teaching Action A02 — Cycle Structure Alone Determines Conjugacy (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: two permutations with the same cycle structure ($(1\,3)(2\,4\,5)$ and $(1\,5)(2\,3\,4)$) are conjugate, without needing to explicitly find the conjugating element by trial and error. State: "same cycle structure is both necessary and sufficient for conjugacy in $S_n$ — this is a genuine shortcut, not a coincidence for this one pair."

- **MC-2 hook**: ask "to determine whether two permutations are conjugate in $S_n$, must you explicitly find a conjugating element by trial and error?" — a "yes" answer reveals MC-2 (missing the cycle-structure shortcut that answers this directly).

### Teaching Action A03 — Embeds Into, Not Equals (Primitive P06: Contrast Pair)

Contrast a group $G$ of order $4$ EMBEDDING into $S_4$ (order $24$, much larger) against the mistaken idea that Cayley's theorem identifies $G$ with all of some $S_n$. State: "Cayley's theorem gives you a faithful COPY of $G$ living inside a (possibly much larger) $S_n$ — it doesn't say $G$ and $S_n$ are the same size or the same group."

- **MC-3 hook**: ask "does Cayley's theorem mean a finite group $G$ literally EQUALS some $S_n$ (not merely embeds in it)?" — a "yes" answer reveals MC-3 (missing that the embedding is injective into a possibly much larger ambient group, not an onto identification).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. List all $6$ elements of $S_3$ using cycle notation (including the identity).
  2. Verify the closure axiom for $S_3$ by composing two specific transpositions and confirming the result is still a valid permutation of $\{1,2,3\}$.
  3. Determine whether the permutations $(1\,2)(3\,4\,5)$ and $(1\,4)(2\,3\,5)$ in $S_5$ are conjugate, using the cycle-structure shortcut (no need to find an explicit conjugating element).
  4. Write the permutation $(1\,2\,3\,4)$ (a $4$-cycle) as a product of transpositions.
- **P76 (Transfer Probe, mode = independence)**: "A puzzle called the '15-puzzle' involves permuting tiles in a grid, and its solvability theory relies on group theory concepts from $S_n$. (a) Using cycle notation, write the permutation that cyclically shifts four tiles labeled A,B,C,D ($A\to B\to C\to D\to A$) as a single cycle. (b) Determine the cycle structure of a DIFFERENT permutation that swaps two pairs of tiles simultaneously (e.g., $A\leftrightarrow B$ and $C\leftrightarrow D$), and explain whether this permutation is conjugate to a permutation that instead swaps $A\leftrightarrow C$ and $B\leftrightarrow D$. (c) Explain how you would express your $4$-cycle from part (a) as a product of transpositions, and why this decomposition is relevant to determining whether a given tile arrangement is 'solvable' (a fact you need not derive in full, just explain the connection conceptually)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GROUP-AXIOMS-ASSUMED-AUTOMATIC-FOR-SN | Believing $S_n$ is automatically a group without checking the actual group axioms, treating group membership as automatic rather than verified | Foundational |
| MC-2 | CONJUGACY-ASSUMED-TO-REQUIRE-EXPLICIT-SEARCH | Believing determining conjugacy in $S_n$ requires explicitly finding a conjugating element by trial and error, missing the cycle-structure shortcut | High |
| MC-3 | CAYLEYS-THEOREM-MISREAD-AS-EQUALITY | Believing Cayley's theorem means a finite group literally equals some $S_n$, missing that it merely embeds injectively into a possibly much larger ambient group | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Group Axioms Assumed Automatic for Sₙ") → P41 (detect: ask whether $S_n$ is automatically a group without checking the axioms) → P64 (conceptual shift: re-walk Example 1's axiom-by-axiom verification, re-anchoring on "each axiom is genuinely checked, not assumed").
- **B02 (targets MC-2)**: P27 (name it: "Conjugacy Assumed to Require Explicit Search") → P41 (detect: ask whether conjugacy in $S_n$ requires explicitly finding a conjugating element) → P64 (conceptual shift: re-walk Example 2's cycle-structure comparison, re-anchoring on "same cycle structure alone determines conjugacy").
- **B03 (targets MC-3)**: P27 (name it: "Cayley's Theorem Misread as Equality") → P41 (detect: ask whether Cayley's theorem means $G$ literally equals some $S_n$) → P64 (conceptual shift: re-walk Example 3's order-$4$-into-$S_4$ example, re-anchoring on "this is an injective embedding into a possibly much larger group, not an equality").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.abst.group-theory` (the four group axioms this concept's own verification directly reuses).
- **Unlocks**: `math.abst.alternating-group` (will develop the even/odd permutation distinction previewed via transposition decomposition in LO3; not yet authored).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (a genuine axiom-by-axiom verification and a direct cycle-structure conjugacy comparison) and LO3 kept orientation-level, appropriately previewing Cayley's theorem and transposition generation without developing either fully.
- **Division of labor**: `math.abst.group-theory` owns the general four-axiom framework; this concept owns the SPECIFIC verification of those axioms for $S_n$, cycle notation, and the conjugacy-class shortcut, deliberately deferring the even/odd distinction (which the transposition-decomposition preview in Example 3 sets up) to `math.abst.alternating-group` rather than developing it prematurely.
- Example 3's explicit order-comparison ($|G|=4$ embedding into $|S_4|=24$) was chosen deliberately to make MC-3's target error concretely falsifiable — a learner can directly see the ambient group is much larger, rather than accepting an abstract assertion that embedding isn't equality.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physically shuffling 3 labeled objects, before the formal Sₙ definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

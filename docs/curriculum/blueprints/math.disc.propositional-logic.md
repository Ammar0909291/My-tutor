# Teaching Blueprint: Propositional Logic (`math.disc.propositional-logic`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.propositional-logic` |
| name | Propositional Logic |
| domain | Discrete Mathematics |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.found.proposition`, `math.found.logical-connectives` |
| unlocks | `math.disc.boolean-circuits` |
| cross_links | `math.found.truth-table` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | C (Concrete) — a small compound proposition's truth table, before the normal-form construction rules |
| description (KG) | The study of logical connectives (∧, ∨, ¬, →, ↔) and their truth-functional properties. Normal forms: DNF, CNF. SAT (satisfiability) problem: determine if a formula is satisfiable. Foundation of digital circuit design. |

## Component 1 — Learning Objectives

- LO1: Construct the **Disjunctive Normal Form (DNF)** of a compound proposition directly FROM its truth table (`math.found.truth-table`'s own row-by-row method) — for every row where the formula is TRUE, form a conjunction of the (possibly negated) variables matching that row, then OR all such conjunctions together.
- LO2: Construct the **Conjunctive Normal Form (CNF)** similarly, from the FALSE rows (each false row contributes a disjunction of negation-flipped literals, and all such disjunctions are ANDed together) — recognizing DNF and CNF as DUAL constructions built from the same truth table, reading different rows.
- LO3 (orientation level, given the concept's own explicit SAT framing): recognize the **SAT (satisfiability) problem** — does at least one row of the truth table make the formula TRUE? — and recognize, without deriving why, that SAT is a computationally HARD problem in general (NP-complete) even though checking a SINGLE proposed assignment is easy — directly paralleling `math.disc.euler-hamiltonian`'s own Hamiltonian-cycle complexity gap.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.proposition` (a statement with a definite truth value) and `math.found.logical-connectives` (¬, ∧, ∨, →, ↔ and their truth-functional meanings).

## Component 3 — Core Explanation

**DNF — built from the TRUE rows**: for a compound proposition, `math.found.truth-table`'s row-by-row method already tabulates every combination of truth values. The **Disjunctive Normal Form** is built MECHANICALLY from this table: for each row where the formula evaluates TRUE, form a conjunction of literals (each variable, negated if it was FALSE in that row) matching that row exactly; OR all such conjunctions together. The result is guaranteed logically EQUIVALENT to the original formula by construction — it is TRUE in exactly the same rows.

**CNF — built from the FALSE rows, a dual construction**: the **Conjunctive Normal Form** is built the same way but from the OPPOSITE rows: for each row where the formula evaluates FALSE, form a disjunction of literals (each variable, negated if it was TRUE in that row — the OPPOSITE negation convention from DNF) that is FALSE exactly at that row; AND all such disjunctions together. DNF is an OR-of-ANDs built from true rows; CNF is an AND-of-ORs built from false rows — two genuinely different-looking but logically equivalent normal forms, both mechanically derivable from the same single truth table.

**The SAT problem — easy to verify, hard to decide (orientation level)**: given a specific candidate assignment of truth values, checking whether it satisfies a formula (makes it TRUE) is easy — just evaluate the formula at that one row. But the **SAT problem** — determining, for an arbitrary formula, WHETHER any satisfying assignment exists AT ALL, without being handed one — is a genuinely different and much harder question. For formulas with many variables, checking all $2^n$ rows becomes intractable, and SAT is **NP-complete**: no known efficient general algorithm exists, directly paralleling the same easy-to-verify/hard-to-decide gap `math.disc.euler-hamiltonian` already established for Hamiltonian cycles.

## Component 4 — Worked Examples

**Example 1 (LO1 — DNF construction from the truth table's true rows, breaking MC-1)**: for $F=(P\wedge Q)\vee(\neg P\wedge R)$, building the full truth table over $P,Q,R$ (8 rows) and evaluating $F$ at each: $F$ is TRUE at rows $(T,T,T)$, $(T,T,F)$, $(F,T,T)$, $(F,F,T)$ and FALSE at the remaining four. The DNF, built from the TRUE rows, is $(P\wedge Q\wedge R)\vee(P\wedge Q\wedge\neg R)\vee(\neg P\wedge Q\wedge R)\vee(\neg P\wedge\neg Q\wedge R)$ — a form that LOOKS syntactically different from the original $F$, yet is logically equivalent to it by construction, since it is true at exactly the same rows.

**Example 2 (LO2 — CNF construction from the false rows, breaking MC-2)**: for the SAME formula $F$ from Example 1, the FALSE rows are $(T,F,T)$, $(T,F,F)$, $(F,T,F)$, $(F,F,F)$. Each false row contributes a clause that is false exactly there — e.g. row $(T,F,T)$ gives $(\neg P\vee Q\vee\neg R)$ (check: $\neg P=F$, $Q=F$, $\neg R=F$, so the clause is $F$ exactly at this row). Building all four clauses and ANDing them together gives the CNF: $(\neg P\vee Q\vee\neg R)\wedge(\neg P\vee Q\vee R)\wedge(P\vee\neg Q\vee R)\wedge(P\vee Q\vee R)$ — an AND-of-ORs, built from the FALSE rows with the OPPOSITE literal-negation convention from DNF's true-row construction, yet logically equivalent to the same original $F$.

**Example 3 (LO3, orientation level — SAT's easy-to-verify/hard-to-decide gap, breaking MC-3)**: for the same $F$, checking whether the SPECIFIC assignment $P=T,Q=T,R=F$ satisfies $F$ is trivial — just evaluate row $(T,T,F)$: $F=T$, so yes. But determining, for an arbitrary formula with many variables (not handed a candidate assignment), whether ANY satisfying assignment exists at all is the SAT problem — for formulas with dozens or hundreds of variables, checking all $2^n$ rows is computationally infeasible, and no known efficient general algorithm exists (SAT is NP-complete) — the identical shape of gap `math.disc.euler-hamiltonian` already showed between Euler's simple degree test and Hamiltonian cycle's NP-completeness.

## Component 5 — Teaching Actions

### Teaching Action A01 — DNF Is Mechanically Read Off the Truth Table (Primitive P11: Representation Shift)

State: "you don't need cleverness or a separate derivation to build the DNF — read the TRUE rows straight off the truth table, and each one becomes a conjunction; OR them all together." Work Example 1's full construction from the true rows.

- **MC-1 hook**: ask "is a formula's DNF just one arbitrary way among many to rewrite it, with no guaranteed connection to its truth table?" — a "yes" answer reveals MC-1 (missing that DNF is mechanically derived from the true rows, always guaranteed equivalent by construction).

### Teaching Action A02 — CNF Uses the Opposite Rows and the Opposite Literal Convention (Primitive P06: Contrast Pair)

Contrast Example 1's DNF (built from TRUE rows, OR-of-ANDs, literal negated when the row's variable was FALSE) against Example 2's CNF (built from FALSE rows, AND-of-ORs, literal negated when the row's variable was TRUE — the OPPOSITE convention). State: "DNF and CNF are mirror-image constructions — reading different rows of the SAME table, with the negation convention flipped between them."

- **MC-2 hook**: ask "is CNF built the same way as DNF — from the true rows, with the same negation convention?" — a "yes" answer reveals MC-2 (missing that CNF is built from the false rows with the opposite negation convention, not a copy of the DNF procedure).

### Teaching Action A03 — Checking One Assignment Is Easy; Deciding Satisfiability in General Is Not (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: verifying $F$ at one specific assignment is a single trivial evaluation, while determining satisfiability for an arbitrary large formula requires (in the worst case) checking exponentially many rows, with no known efficient shortcut (SAT is NP-complete). State: "easy to CHECK a proposed answer and easy to FIND one at all are two completely different questions — SAT is the classic example of a problem where only the first is easy."

- **MC-3 hook**: ask "since checking whether one specific assignment satisfies a formula is fast and easy, must determining whether ANY satisfying assignment exists also be easy?" — a "yes" answer reveals MC-3 (missing the fundamental easy-to-verify/hard-to-decide gap that makes SAT NP-complete).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Build the truth table for $G=(P\vee Q)\wedge(\neg Q\vee R)$ (3 variables, 8 rows).
  2. From your truth table, construct the DNF of $G$.
  3. From your truth table, construct the CNF of $G$.
  4. Explain why checking whether a SPECIFIC assignment satisfies a formula is easy, while determining satisfiability for an arbitrary large formula is generally hard, referencing the SAT problem.
- **P76 (Transfer Probe, mode = cross-link probe, engaging `math.found.truth-table`)**: "A digital circuit designer needs to implement the formula $H=(A\wedge\neg B)\vee(B\wedge C)$ using logic gates. (a) Using `math.found.truth-table`'s row-by-row method, construct the full truth table for $H$ with variables $A,B,C$. (b) From the true rows, construct the DNF of $H$. (c) From the false rows, construct the CNF of $H$. (d) Explain why a circuit designer might prefer the DNF form specifically when building the circuit out of AND/OR/NOT gates directly matching that normal form's structure."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DNF-TREATED-AS-ARBITRARY-REWRITE | Believing DNF is one arbitrary rewriting among many with no guaranteed connection to the truth table, missing that it is mechanically derived from the TRUE rows, always equivalent by construction | Foundational |
| MC-2 | CNF-BUILT-LIKE-DNF | Believing CNF is built the same way as DNF (from true rows, same negation convention), missing that CNF is built from the FALSE rows with the opposite literal-negation convention | High |
| MC-3 | EASY-VERIFICATION-ASSUMED-TO-IMPLY-EASY-DECISION | Believing that because checking one assignment is easy, determining satisfiability in general must also be easy, missing the fundamental easy-to-verify/hard-to-decide gap underlying SAT's NP-completeness | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "DNF Treated as Arbitrary Rewrite") → P41 (detect: ask whether DNF is just one arbitrary way to rewrite a formula, unconnected to its truth table) → P64 (conceptual shift: re-walk Example 1's row-by-row construction, re-anchoring on "DNF is read directly off the true rows — always guaranteed equivalent by construction").
- **B02 (targets MC-2)**: P27 (name it: "CNF Built Like DNF") → P41 (detect: ask whether CNF is built from the true rows, the same way as DNF) → P64 (conceptual shift: re-walk Example 2's false-row construction, re-anchoring on "CNF reads the FALSE rows, with the opposite negation convention from DNF").
- **B03 (targets MC-3)**: P27 (name it: "Easy Verification Assumed to Imply Easy Decision") → P41 (detect: ask whether easy single-assignment checking implies easy general satisfiability determination) → P64 (conceptual shift: re-walk Example 3's contrast, re-anchoring on "checking one answer and finding one at all are fundamentally different questions").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.proposition` (a statement with a definite truth value) and `math.found.logical-connectives` (¬, ∧, ∨, →, ↔ and their truth-functional meanings, this concept's normal-form constructions directly reuse).
- **Unlocks**: `math.disc.boolean-circuits` (will build digital circuits directly from the normal forms constructed here; not yet authored).
- **Cross-link**: KG lists `math.found.truth-table`, confirmed authored via `ls docs/curriculum/blueprints/`. $P76_{mode}=$ **cross-link probe**, directly reusing that concept's own row-by-row truth-table construction method as the mechanical basis for both DNF and CNF throughout this blueprint.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a developing/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (genuine DNF/CNF constructions from a shared truth table) and LO3 kept orientation-level, appropriately surveying SAT's complexity status (which the KG's own description names explicitly) without attempting to teach NP-completeness itself.
- **Division of labor**: `math.found.truth-table` owns the row-by-row truth-table construction method itself (including its own established misconceptions about ∨'s inclusivity and the material conditional's vacuous truth); this concept owns the NORMAL-FORM constructions built mechanically from that table, and the SAT complexity framing — deliberately reusing the SAME formula $F$ across Examples 1 and 2 so DNF and CNF read as two views of one shared truth table, not two unrelated procedures.
- The SAT/Hamiltonian-cycle parallel in Teaching Action A03 and LO3 was included deliberately, since `math.disc.euler-hamiltonian` (already authored) established the identical easy-to-verify/hard-to-decide complexity pattern — reusing that established framing here reinforces the pattern as a general phenomenon rather than a coincidence specific to graphs.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.found.truth-table` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a small compound proposition's truth table before the normal-form construction rules) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Axiomatic System (`math.found.axiomatic-system`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.axiomatic-system` |
| name | Axiomatic System |
| domain | Foundations |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.found.axiom`, `math.found.logic` |
| unlocks | `math.found.set-theory-axiomatic` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with a small toy system before the general definition and properties |
| description (KG) | A collection of axioms together with the rules of logic from which all theorems of a mathematical theory are derived. |

## Component 1 — Learning Objectives

- LO1: Define an axiomatic system as **axioms PLUS the rules of logic**, working together — recognizing that a list of axioms ALONE, without an accompanying deduction system, cannot generate any theorems at all.
- LO2: Distinguish three genuinely DIFFERENT properties an axiomatic system may or may not have — **consistency** (no contradiction derivable), **completeness** (every true statement in the system's language is provable), and **independence** (no axiom is derivable from the others) — checking each separately rather than treating them as interchangeable notions of "a good system."
- LO3: Recognize that changing a system's axioms produces a genuinely **different** axiomatic system with different theorems — there is no single "correct" axiomatic system for a given subject; different, individually consistent axiom choices (e.g., Euclidean vs. non-Euclidean geometry) yield different, equally legitimate theories.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.axiom` (an axiom as a foundational assumption, accepted without proof, a negotiable starting point rather than a "self-evident truth") and `math.found.logic` (valid reasoning, deductive rules, the structure of mathematical statements).

## Component 3 — Core Explanation

**Axioms alone are inert — deriving theorems requires the rules of logic too**: an axiomatic system is not merely a LIST of axioms; it is that list TOGETHER WITH the rules of logic (already mastered — modus ponens, substitution, and the other deductive inference rules) that allow theorems to be DERIVED from the axioms step by step. Without a deduction system, axioms are just a set of unconnected statements — no theorem can be produced from them at all.

**Consistency, completeness, and independence are three genuinely different properties**: CONSISTENCY means no contradiction can be derived from the axioms (the system doesn't prove both a statement and its negation). COMPLETENESS means every TRUE statement expressible in the system's language is actually provable from the axioms (nothing true slips through unprovable). INDEPENDENCE means no single axiom can itself be derived from the others (each contributes something the rest cannot supply). A system can have any combination of these properties — being consistent says nothing about being complete or independent, and vice versa; each must be checked on its own terms.

**Different axiom choices genuinely produce different theories — there is no unique "correct" system**: replacing even one axiom in a consistent axiomatic system (while keeping the rest, and keeping the new axiom consistent with them) produces a genuinely DIFFERENT axiomatic system, capable of proving different theorems. This is not a flaw — both the original and the modified system can be entirely legitimate, INDIVIDUALLY consistent theories, simply describing different mathematical structures (the classic case being Euclidean vs. non-Euclidean geometry, differing only in the parallel postulate).

## Component 4 — Worked Examples

**Example 1 (LO1 — axioms alone generate nothing without logic, breaking MC-1)**: Consider Peano Arithmetic's axioms (e.g., "$0$ is a natural number," "every natural number has a successor," and several others). Can "$2+2=4$" be derived from JUST these axioms, with no rules of inference applied at all? NO — the axioms, sitting alone as bare statements, cannot combine or transform into new statements by themselves. Deriving "$2+2=4$" requires actually APPLYING the rules of logic (substitution, modus ponens, and the specific recursive definitions the axioms set up) repeatedly, step by step, to the axioms. An axiomatic system genuinely requires BOTH pieces — axioms AND logic — working together; neither alone suffices.

**Example 2 (LO2 — consistency, completeness, and independence checked separately, breaking MC-2)**: Consider a toy system with axioms $\{P,\ P\to Q\}$ in a simple propositional language. CONSISTENCY: no contradiction arises from these two axioms alone (assuming $P,Q$ don't clash with anything else) — consistent. COMPLETENESS: if the system's LANGUAGE also includes some unrelated statement $R$, the axioms say nothing about $R$ at all — the system is INCOMPLETE with respect to that broader language, even though it is consistent. INDEPENDENCE: is "$P\to Q$" derivable from "$P$" alone? No — you cannot derive an implication from a single unrelated fact — so these two axioms ARE independent of each other. Contrast with a redundant version $\{P,\ P,\ P\to Q\}$ (listing $P$ twice) — NOT independent, since one copy of $P$ is trivially derivable from (indeed identical to) the other. These three properties were each checked SEPARATELY, and behaved differently — confirming they are not interchangeable.

**Example 3 (LO3 — different axiom choices yield different, legitimate theories, breaking MC-3)**: Euclidean geometry's parallel postulate states: through a point not on a line, there is EXACTLY ONE line parallel to it. Hyperbolic geometry replaces this single axiom with: through such a point, there are INFINITELY MANY parallels. BOTH resulting axiomatic systems are consistent (verified via models — e.g., the Poincaré disk model demonstrates hyperbolic geometry's consistency) — yet they prove genuinely DIFFERENT theorems: in Euclidean geometry, every triangle's angles sum to exactly $180°$; in hyperbolic geometry, every triangle's angles sum to STRICTLY LESS than $180°$. Neither system is "the" correct geometry — both are legitimate, consistent theories built from different, individually reasonable axiom choices.

## Component 5 — Teaching Actions

### Teaching Action A01 — Axioms Without Logic Generate No Theorems (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: Peano's axioms alone, with no logical inference applied, cannot produce "$2+2=4$" or any other theorem. State: "an axiomatic system is genuinely two ingredients working together — the axioms supply the starting content, the rules of logic supply the machinery that derives new statements from them."

- **MC-1 hook**: ask "can a list of axioms, by itself, without any accompanying rules of logic, generate the theorems of a mathematical theory?" — a "yes" answer reveals MC-1 (missing that logic's deductive rules are an equally essential, separate component).

### Teaching Action A02 — Three Properties, Checked Separately, Behaving Independently (Primitive P06: Contrast Pair)

Contrast Example 2's three separate checks on $\{P,P\to Q\}$: consistent, yet incomplete (w.r.t. a broader language), yet independent — and contrast the independent version against the redundant $\{P,P,P\to Q\}$, which fails independence specifically. State: "consistency, completeness, and independence are three separate questions, each requiring its own check — a system can have any combination of them."

- **MC-2 hook**: ask "are consistency, completeness, and independence really just three names for the same general idea of 'a good axiomatic system'?" — a "yes" answer reveals MC-2 (treating three logically distinct properties as interchangeable).

### Teaching Action A03 — Different Axioms, Different (Equally Legitimate) Theories (Primitive P11: Representation Shift)

State: "there is no single 'correct' axiomatic system for geometry — Euclidean and hyperbolic geometry are both fully consistent, just built from different choices about the parallel postulate, and they genuinely disagree about which theorems are true." Work Example 3's triangle-angle-sum contrast.

- **MC-3 hook**: ask "is there exactly one 'correct' axiomatic system for a subject like geometry, with any alternative axiom choice necessarily being wrong or inconsistent?" — a "yes" answer reveals MC-3 (missing that different, individually consistent axiom choices can yield different, equally legitimate theories).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain why a list of axioms with no accompanying logical inference rules cannot, by itself, constitute a functioning axiomatic system.
  2. For the axiom set $\{Q,\ P\to Q\}$, check whether $P\to Q$ is derivable from $Q$ alone, and state whether the set is independent.
  3. Explain the difference between a system being "consistent" and a system being "complete," using a concrete example where one holds without the other.
  4. Describe one specific way changing a single axiom of a consistent system could produce a different but still consistent system, using an example other than the Euclidean/hyperbolic geometry case.
- **P76 (Transfer Probe, mode = independence)**: "A logician is designing a new formal system for a specialized area of mathematics, and has written down a promising list of axioms. (a) Explain what ELSE the logician must specify, beyond just the axioms, before the system can actually derive any theorems. (b) The logician verifies the system is consistent (no contradiction derivable) and feels confident the system is therefore 'good enough' to use. Using this lesson's three-properties distinction, explain what the logician has NOT yet verified, and why consistency alone doesn't guarantee those other properties. (c) A colleague suggests modifying one of the axioms slightly to simplify a particular proof, arguing 'since the original system was already consistent, this small change couldn't possibly create a genuinely different theory — it's still basically the same system.' Explain, using the Euclidean/hyperbolic contrast, why this argument is not necessarily correct."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | AXIOMATIC-SYSTEM-AS-AXIOMS-ALONE | Believing a list of axioms alone, without rules of logic, constitutes a functioning axiomatic system, missing that logic's deductive rules are an equally essential separate component | Foundational |
| MC-2 | CONSISTENCY-COMPLETENESS-INDEPENDENCE-CONFLATED | Believing consistency, completeness, and independence are interchangeable notions of "a good system," missing that they are three logically distinct properties requiring separate verification | Foundational |
| MC-3 | UNIQUE-CORRECT-AXIOMATIC-SYSTEM-ASSUMED | Believing there is exactly one "correct" axiomatic system for a given subject, missing that different, individually consistent axiom choices can yield different, equally legitimate theories | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Axiomatic System as Axioms Alone") → P41 (detect: ask a student whether a list of axioms alone can generate theorems, checking for "yes") → P64 (conceptual shift: re-walk Example 1's Peano-arithmetic case, re-anchoring on "axioms and logic are two separate, both-essential ingredients").
- **B02 (targets MC-2)**: P27 (name it: "Consistency/Completeness/Independence Conflated") → P41 (detect: ask a student whether a consistent system is automatically complete and independent, checking for "yes") → P64 (conceptual shift: re-walk Example 2's separate checks on the toy system, re-anchoring on "three distinct properties, each needing its own verification").
- **B03 (targets MC-3)**: P27 (name it: "Unique Correct Axiomatic System Assumed") → P41 (detect: ask a student whether there is exactly one correct axiomatic system for geometry, checking for "yes") → P64 (conceptual shift: re-walk Example 3's Euclidean-vs-hyperbolic contrast, re-anchoring on "different consistent axiom choices yield different, equally legitimate theories").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.axiom` (the foundational-assumption concept this system's axioms directly are), `math.found.logic` (the deductive rules this concept's derivation machinery directly uses).
- **Unlocks**: `math.found.set-theory-axiomatic` (ZFC as a concrete, fully worked instance of an axiomatic system, building directly on this concept's framework).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/analyze tag places this at a "3 TAs + gate" tier; the analyze-level bloom (dissecting a system into its component properties, rather than merely stating a definition) is reflected in Example 2's careful, separate verification of three distinct properties on one small toy system.
- **Division of labor**: `math.found.axiom` owns the individual-axiom concept (foundational, unproven, negotiable); `math.found.logic` owns the deductive inference rules. This concept, `math.found.axiomatic-system`, deliberately does not re-teach either; it owns the COMBINATION of the two into a working system, the three distinguishing meta-properties (consistency/completeness/independence), and the recognition that different axiom choices yield genuinely different, non-unique theories.
- Example 2's toy system $\{P,P\to Q\}$ was deliberately kept minimal (just two simple propositional axioms) so all three properties (consistency, completeness, independence) could be checked explicitly and exhaustively within a single small example, rather than left as abstract claims about a more complex system too large to verify by hand.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: small toy system before the general definition and properties) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

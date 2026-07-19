# Teaching Blueprint: Axiomatic Set Theory (`math.found.set-theory-axiomatic`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.set-theory-axiomatic` |
| name | Axiomatic Set Theory |
| domain | Foundations |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 30 |
| requires | `math.found.axiomatic-system`, `math.found.set-theory` |
| unlocks | `math.found.ordinal-number`, `math.found.cardinal-arithmetic` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with Russell's Paradox as a concrete failure of naive set theory before the general axiomatic resolution |
| description (KG) | The standard axiomatic foundation of mathematics, ZFC, consisting of Zermelo-Fraenkel axioms plus the Axiom of Choice, resolving the paradoxes of naive set theory. |

## Component 1 — Learning Objectives

- LO1: Recognize ZFC as a concrete instance of `math.found.axiomatic-system`'s general framework — axioms specifically designed to RESTRICT naive set comprehension, resolving Russell's Paradox by replacing "any predicate defines a set" with the Axiom of Separation ($\{x\in A:P(x)\}$ for an ALREADY-EXISTING set $A$, never $\{x:P(x)\}$ unrestricted).
- LO2: Apply `math.found.axiomatic-system`'s own **independence** property concretely to the **Axiom of Choice** — recognizing AC is genuinely INDEPENDENT of the other ZF axioms (Gödel 1940: AC is consistent with ZF; Cohen 1963: $\lnot$AC is also consistent with ZF) — neither AC nor its negation is derivable from the rest.
- LO3 *(orientation-level, given the exceptional scope of this concept)*: Recognize `math.found.axiomatic-system`'s own **completeness** property concretely via the **Continuum Hypothesis** — CH is ALSO independent of ZFC (the same Gödel/Cohen technique pair) — meaning ZFC, despite being the standard foundation for essentially all of mathematics, is demonstrably NOT complete.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.axiomatic-system` (axioms + logic together; the consistency/completeness/independence meta-properties, each checked separately) and `math.found.set-theory` (naive sets, membership, basic set operations).

## Component 3 — Core Explanation

**ZFC restricts comprehension specifically to resolve Russell's Paradox**: naive set theory permits forming $\{x:P(x)\}$ for ANY predicate $P$ — but this leads directly to Russell's Paradox (letting $P(x)$ be "$x\notin x$" produces a genuine contradiction). ZFC's Axiom of Separation restricts this: you may only form $\{x\in A:P(x)\}$ for some ALREADY-EXISTING set $A$ — restricting a pre-existing set by a predicate, never conjuring an unrestricted "set of everything satisfying $P$" from nothing. This single design choice, motivated directly by the paradox, is the central reason ZFC's axioms take the specific restricted form they do.

**The Axiom of Choice is independent — genuinely undecidable from the other axioms**: `math.found.axiomatic-system` already established independence as one of three meta-properties an axiomatic system may have. The Axiom of Choice (every collection of nonempty sets has a "choice function" selecting one element from each) is the most famous concrete instance: Gödel proved AC is CONSISTENT with the remaining ZF axioms (safe to add), and Cohen later proved $\lnot$AC is ALSO consistent with ZF (safe to add instead) — meaning AC can neither be proved NOR disproved from ZF alone. This is independence, exactly as defined in the general framework, now demonstrated at the frontier of actual mathematical research.

**ZFC is consistent (as far as demonstrated) but provably NOT complete**: the Continuum Hypothesis (there is no set with cardinality strictly between $\mathbb{N}$ and $\mathbb{R}$) is ALSO independent of ZFC — via the same Gödel/Cohen technique pair used for AC. This is `math.found.axiomatic-system`'s "completeness" property, concretely failing: CH is a perfectly meaningful, well-formed statement in set theory's language, yet ZFC can neither prove nor disprove it. ZFC remains the standard, immensely powerful foundation for mathematics — but it is not a complete theory of sets.

## Component 4 — Worked Examples

**Example 1 (LO1 — Russell's Paradox and the Axiom of Separation's resolution, breaking MC-1)**: Naive comprehension permits forming $R=\{x:x\notin x\}$ (the "set" of all sets not containing themselves). Asking "is $R\in R$?": if $R\in R$, then by $R$'s own defining condition, $R\notin R$ — contradiction. If $R\notin R$, then $R$ satisfies its own defining condition, so $R\in R$ — also a contradiction. Either way, a genuine contradiction — Russell's Paradox. ZFC's Axiom of Separation blocks this construction entirely: you cannot form $\{x:x\notin x\}$ unrestricted; you may only form $\{x\in A:x\notin x\}$ for some SPECIFIC, already-existing set $A$ — and there is no "set of all sets" in ZFC serving as such an $A$, so Russell's paradoxical construction simply cannot be carried out.

**Example 2 (LO2 — the Axiom of Choice's genuine independence, breaking MC-2)**: The Axiom of Choice is needed to prove several important facts (e.g., every vector space has a basis; the Well-Ordering Theorem). Gödel (1940) constructed a model of ZF (the "constructible universe" $L$) in which AC genuinely HOLDS, proving AC is CONSISTENT with ZF. Cohen (1963), using an entirely different technique (forcing), constructed a DIFFERENT model of ZF in which AC genuinely FAILS, proving $\lnot$AC is ALSO consistent with ZF. Since BOTH AC and its negation can be consistently added to ZF, NEITHER is derivable from ZF alone — AC is independent, exactly matching `math.found.axiomatic-system`'s own independence definition, now demonstrated by two of the twentieth century's most celebrated logical results.

**Example 3 (orientation-level — the Continuum Hypothesis's independence, and ZFC's incompleteness, breaking MC-3)**: The Continuum Hypothesis (CH) states there is no set with cardinality strictly between $|\mathbb{N}|$ and $|\mathbb{R}|$. Using the SAME Gödel/Cohen technique pair as Example 2 (Gödel's constructible universe shows CH is consistent with ZFC; Cohen's forcing shows $\lnot$CH is also consistent with ZFC), CH is likewise independent of ZFC. This is `math.found.axiomatic-system`'s "completeness" property, concretely FAILING for ZFC: CH is a meaningful, well-posed question about sets, yet ZFC — despite underpinning essentially all of standard mathematics — cannot settle it either way.

## Component 5 — Teaching Actions

### Teaching Action A01 — Separation Blocks Russell's Paradox by Design (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: naive comprehension's $R=\{x:x\notin x\}$ produces a genuine contradiction, while ZFC's Separation (restricted to an already-existing set) cannot even construct $R$ in the first place. State: "ZFC's axioms aren't arbitrary — Separation's restriction to an existing set is a direct, deliberate response to Russell's Paradox."

- **MC-1 hook**: ask "does ZFC still permit forming a set from any predicate, the way naive set theory does?" — a "yes" answer reveals MC-1 (missing that ZFC specifically restricts comprehension via Separation to resolve Russell's Paradox).

### Teaching Action A02 — AC Is Independent, Demonstrated by Two Landmark Results (Primitive P11: Representation Shift)

State: "the Axiom of Choice isn't provable or disprovable from the rest of ZF — this is independence, the exact same meta-property from the general axiomatic-system framework, now shown concretely by Gödel and Cohen's constructions." Work Example 2's Gödel-consistent/Cohen-inconsistent pairing.

- **MC-2 hook**: ask "is the Axiom of Choice provable (or its negation provable) from the remaining ZF axioms?" — a "yes" answer reveals MC-2 (missing AC's genuine independence, established by Gödel and Cohen).

### Teaching Action A03 — ZFC Is Consistent But Not Complete — CH as the Landmark Case (Primitive P06: Contrast Pair)

Contrast ZFC's demonstrated power (foundation for essentially all standard mathematics) against its provable incompleteness (CH undecidable within it). State: "being the standard, trusted foundation for mathematics doesn't mean ZFC settles every set-theoretic question — the Continuum Hypothesis is a perfectly meaningful statement it simply cannot decide."

- **MC-3 hook**: ask "does ZFC, as the standard foundation of mathematics, settle every meaningful question that can be posed about sets?" — a "yes" answer reveals MC-3 (missing that ZFC is demonstrably incomplete, via the Continuum Hypothesis).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain why the Axiom of Separation's requirement that $A$ already exist blocks the construction of Russell's paradoxical set $R$.
  2. State what it means for a statement to be "independent" of an axiomatic system, using AC as the concrete example.
  3. Explain why proving $\lnot$CH consistent with ZFC (via Cohen) is just as important to CH's independence as proving CH consistent (via Gödel).
  4. Explain, using `math.found.axiomatic-system`'s three meta-properties, what it means to say ZFC is "consistent" (as far as demonstrated) but "not complete."
- **P76 (Transfer Probe, mode = independence)**: "A mathematics student encounters a set-theoretic conjecture in their research and, after extensive effort, cannot find a proof or a disproof from ZFC's axioms. (a) Using this lesson's AC/CH examples, explain what it would mean, in principle, for this conjecture to be genuinely independent of ZFC, rather than simply 'not yet proven.' (b) A colleague argues 'if the conjecture were truly independent, mathematicians would have definitively shown this by now for any interesting statement — since they haven't for this one, it must just be an unusually hard but ultimately decidable problem.' Explain why this argument is not a valid general principle, given how AC and CH's independence were actually established. (c) The colleague also suggests that ZFC's incompleteness (as demonstrated by CH) means ZFC is an unreliable or flawed foundation for mathematics. Explain why this conclusion does not follow, distinguishing 'incomplete' from 'inconsistent' or 'unreliable.'"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ZFC-ASSUMED-TO-PERMIT-NAIVE-COMPREHENSION | Believing ZFC still permits forming a set from any predicate as naive set theory does, missing that Separation specifically restricts comprehension to resolve Russell's Paradox | Foundational |
| MC-2 | AXIOM-OF-CHOICE-ASSUMED-DECIDABLE-FROM-ZF | Believing the Axiom of Choice (or its negation) is provable from the remaining ZF axioms, missing its genuine independence established by Gödel and Cohen | Foundational |
| MC-3 | ZFC-ASSUMED-COMPLETE | Believing ZFC, as the standard foundation of mathematics, settles every meaningful set-theoretic question, missing its demonstrated incompleteness via the Continuum Hypothesis | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "ZFC Assumed to Permit Naive Comprehension") → P41 (detect: ask a student whether ZFC allows forming $\{x:P(x)\}$ for any predicate P, checking for "yes") → P64 (conceptual shift: re-walk Example 1's Russell's Paradox and Separation's specific blocking mechanism, re-anchoring on "Separation requires an already-existing set to restrict, resolving the paradox by design").
- **B02 (targets MC-2)**: P27 (name it: "Axiom of Choice Assumed Decidable from ZF") → P41 (detect: ask a student whether AC is provable or disprovable from ZF, checking for "yes") → P64 (conceptual shift: re-walk Example 2's Gödel-consistent/Cohen-inconsistent pairing, re-anchoring on "AC is genuinely independent — neither it nor its negation is derivable").
- **B03 (targets MC-3)**: P27 (name it: "ZFC Assumed Complete") → P41 (detect: ask a student whether ZFC settles every meaningful set-theoretic question, checking for "yes") → P64 (conceptual shift: re-walk Example 3's Continuum Hypothesis independence, re-anchoring on "ZFC is the standard foundation, but demonstrably not complete").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.axiomatic-system` (the consistency/completeness/independence meta-properties this concept concretely instantiates via AC and CH; the Separation-based resolution of naive comprehension's paradoxes), `math.found.set-theory` (naive sets and membership, the informal theory ZFC formalizes and restricts).
- **Unlocks**: `math.found.ordinal-number`, `math.found.cardinal-arithmetic` (both built directly on ZFC's axiomatic foundation).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 30, by far the largest budget in the corpus, reflects ZFC's genuine scope as the standard foundation of all of mathematics — but this concept is deliberately scoped to the MOST PEDAGOGICALLY LOAD-BEARING content: WHY the axioms take their restricted form (Russell's Paradox, via Separation) and the two most celebrated META-MATHEMATICAL results about ZFC itself (AC's independence, CH's independence), each a direct, concrete instantiation of `math.found.axiomatic-system`'s own three meta-properties. This concept deliberately does NOT attempt to enumerate and individually teach all nine ZFC axioms' technical statements (Extensionality, Pairing, Union, Power Set, Infinity, Foundation, Replacement, Separation, Choice) in full technical detail — that enumeration is better absorbed via direct study of the axioms themselves (a reference/enumeration task, not a concept requiring dedicated misconception-repair teaching) than reproduced here as rote content.
- LO3 (the Continuum Hypothesis) is deliberately kept at ORIENTATION level even within this already-generous budget, since deriving Gödel's constructible universe or Cohen's forcing technique in any real technical depth is a multi-course graduate topic far beyond any single concept's scope — the landmark RESULT (CH's independence) and its meaning for ZFC's completeness are what this concept teaches, not the proof techniques themselves.
- **Division of labor**: `math.found.axiomatic-system` owns the GENERAL meta-properties (consistency/completeness/independence) in the abstract, verified there on a small toy propositional system. This concept, `math.found.set-theory-axiomatic`, deliberately does not re-derive those general definitions; it owns their CONCRETE instantiation at the highest-stakes, most historically significant level — the actual foundation of mathematics itself, via Russell's Paradox (motivating the axioms' restricted form), the Axiom of Choice (independence), and the Continuum Hypothesis (completeness).

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: Russell's Paradox as a concrete failure of naive set theory before the general axiomatic resolution) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3 orientation-level) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

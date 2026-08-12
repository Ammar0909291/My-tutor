# Teaching Blueprint: Mathematical Symbols (`math.found.mathematical-symbols`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.mathematical-symbols` |
| name | Mathematical Symbols |
| domain | Foundations |
| difficulty | foundational |
| bloom | remember |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.found.mathematical-language` |
| unlocks | `math.found.reading-mathematics` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — symbols are inherently abstract tokens; no concrete/pictorial stage applies |
| description (KG) | The collection of standardized symbols used in mathematics including operational symbols, relational symbols, set symbols, logical connectives, and quantifiers. |

## Component 1 — Learning Objectives

- LO1: Correctly name and produce (by hand or in speech) the standard symbols in five families: operational ($+,-,\times,\div$), relational ($=,\ne,<,>,\le,\ge$), set ($\in,\subseteq,\cup,\cap,\emptyset$), logical connectives ($\land,\lor,\neg,\Rightarrow,\Leftrightarrow$), and quantifiers ($\forall,\exists$).
- LO2: Given a symbol out of context, state which of the five families it belongs to and its precise meaning.
- LO3: Distinguish visually similar symbols that carry different meanings (e.g. $\subseteq$ vs. $\in$, $\Rightarrow$ vs. $\Leftrightarrow$, $\forall$ vs. $\exists$).

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.mathematical-language` (the general notion that mathematics uses a specialized vocabulary/notation system) — this concept is the first concrete inventory of that system's symbolic tokens.

## Component 3 — Core Explanation

Mathematical symbols are standardized, unambiguous tokens replacing verbose natural-language phrases. Five families are introduced here:

- **Operational**: $+,-,\times,\div$ — combine or transform quantities.
- **Relational**: $=,\ne,<,>,\le,\ge$ — compare two quantities.
- **Set**: $\in$ (element of), $\subseteq$ (subset of), $\cup,\cap$ (union, intersection), $\emptyset$ (empty set) — describe membership and relationships between collections.
- **Logical connectives**: $\land$ (and), $\lor$ (or), $\neg$ (not), $\Rightarrow$ (implies), $\Leftrightarrow$ (if and only if) — combine or negate statements.
- **Quantifiers**: $\forall$ (for all), $\exists$ (there exists) — state how many objects a claim covers.

Each symbol is a fixed, universally-recognized abbreviation — learning them is a memorization task (bloom = remember), but PRECISION matters: mixing up $\in$ (an element relation, between an object and a set) with $\subseteq$ (a set relation, between two sets) produces statements that are not merely sloppy but technically false.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — naming and family)**: Given the symbol $\forall$: name it ("for all"), state its family (quantifier), and give a usage: "$\forall x \in \mathbb{R}, x^2 \ge 0$" (for all real $x$, $x^2$ is non-negative).

**Example 2 (LO3 — $\in$ vs. $\subseteq$, breaking MC-1)**: Let $A=\{1,2\}$ and $B=\{1,2,3\}$. "$A\subseteq B$" is TRUE ($A$ is a subset of $B$) and correctly uses $\subseteq$ since both sides are sets. "$A\in B$" is FALSE and in fact a type error: $A=\{1,2\}$ is a set, not a member of $B$ (whose members are $1,2,3$, not sets of numbers) — $\in$ compares an ELEMENT to a set, never two sets to each other.

**Example 3 (LO3 — $\Rightarrow$ vs. $\Leftrightarrow$, breaking MC-2)**: "$x=4 \Rightarrow x^2=16$" is TRUE and one-directional (squaring 4 gives 16, but the reverse direction fails since $x=-4$ also gives $x^2=16$). "$x^2=16 \Leftrightarrow x=4 \text{ or } x=-4$" is the correctly BIDIRECTIONAL statement. Writing "$x^2=16 \Leftrightarrow x=4$" alone would be false, since it wrongly excludes $x=-4$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Five-Family Symbol Inventory (Primitive P11: Representation Shift)

Present the five families as a labeled reference table (symbol, name, family, one usage example each), reading each aloud in natural language alongside its symbolic form (e.g. "$\forall$ reads as 'for all'"). Drill recognition both directions: symbol→name and name→symbol.

- **MC-1 hook**: ask "is $\{1,2\} \in \{1,2,3\}$ true or false?" and observe whether the student answers based on $\subseteq$-reasoning (revealing MC-1: confusing element-of with subset-of).

### Teaching Action A02 — Visually Similar Symbols Contrasted (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2's $A\subseteq B$ vs. $A\in B$ side by side, naming the type mismatch explicitly: "$\in$ needs an element on the left; $\subseteq$ needs a set on the left — check what kind of object is actually there."

**Contrast 2 (targets MC-2)**: Work Example 3's $\Rightarrow$ vs. $\Leftrightarrow$ side by side, stating the rule: "$\Rightarrow$ only guarantees one direction; $\Leftrightarrow$ guarantees both — always check whether the reverse direction actually holds before using $\Leftrightarrow$."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Match each of 6 symbols ($\forall,\exists,\subseteq,\in,\Rightarrow,\Leftrightarrow$) to its correct name.
  2. Determine true/false: "$3\in\{1,2,3\}$", "$\{3\}\subseteq\{1,2,3\}$", "$\{3\}\in\{1,2,3\}$" — explaining the type distinction for the false case.
  3. Given "$n$ is divisible by 4 $\Rightarrow$ $n$ is divisible by 2," state whether the reverse implication also holds, and if not, give a counterexample.
  4. Translate "for every real number, its square is non-negative" into symbolic form using $\forall$.
- **P76 (Transfer Probe, mode = independence)**: "A textbook states: '$\forall$ students $x$ in the class, $x$ passed the exam $\Rightarrow$ $x$ receives a certificate.' (a) Rewrite this claim in full natural language. (b) A second sentence in the same textbook reads '$x$ receives a certificate $\Leftrightarrow$ $x$ passed the exam.' Explain, using the $\Rightarrow$ vs. $\Leftrightarrow$ distinction from this lesson, why these two sentences make genuinely different claims about whether certificates are given ONLY to students who passed."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ELEMENT-OF-CONFUSED-WITH-SUBSET-OF | Using $\in$ and $\subseteq$ interchangeably, ignoring that $\in$ relates an element to a set while $\subseteq$ relates two sets | Foundational |
| MC-2 | IMPLICATION-TREATED-AS-BICONDITIONAL | Assuming $P\Rightarrow Q$ also guarantees $Q\Rightarrow P$, i.e. treating one-directional implication as automatically reversible | Foundational |
| MC-3 | QUANTIFIER-SCOPE-MISREAD | Misreading $\forall$/$\exists$ as applying to the wrong variable or the wrong part of a compound statement | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Element-vs-Subset Confusion") → P41 (detect: present Example 2's true/false pair and check the reasoning given) → P64 (conceptual shift: re-derive both statements from the literal set contents, highlighting the type mismatch in the false case).
- **B02 (targets MC-2)**: P27 ("Implication Assumed Reversible") → P41 (detect: ask whether "$x=4\Rightarrow x^2=16$" reverses to "$x^2=16\Rightarrow x=4$"; check if the student misses the $x=-4$ counterexample) → P64 (re-walk Example 3, explicitly constructing the counterexample that breaks the reverse direction).
- **B03 (targets MC-3)**: P27 ("Quantifier Scope Misread") → P41 (detect: present a compound quantified statement and ask which variable each quantifier binds) → P64 (conceptual shift: rewrite the statement in full natural language, tracing each quantifier to its bound variable explicitly).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.mathematical-language`.
- **Unlocks**: `math.found.reading-mathematics` (parsing formal statements requires fluent recognition of exactly these symbol families).
- **Cross-link**: none declared in the KG.

## Component 8 — Teaching Notes

- estimated_hours = 2 and mastery_threshold = 0.90 reflect this concept's nature as a high-precision memorization task — errors here (MC-1, MC-2) propagate directly into every later proof and definition concept, justifying the unusually strict 5/5 gate for a "remember"-level concept.
- MC-1 and MC-2 were both ranked foundational severity because each represents a genuine TYPE error (element vs. set; one-directional vs. bidirectional claim), not merely a notational slip — getting either wrong changes the actual mathematical content of a statement, not just its presentation.
- CPA_entry_stage = Abstract (rather than the more typical Concrete/Pictorial-first progression) is deliberate: symbols are pure notation with no natural physical/pictorial analog at this stage; the analogical grounding instead comes from immediately pairing every symbol with its natural-language reading.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.mathematical-language`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.found.reading-mathematics`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: symbols have no concrete analog) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Combinatorics (`math.disc.combinatorics`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.combinatorics` |
| name | Combinatorics |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.disc.combinations` |
| unlocks | `math.disc.generating-functions` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — counting subsets of a small set directly by listing, before the bijective shortcut |
| description (KG) | The study of counting, arrangement, and combination of objects. Techniques: direct counting, bijections, recursion, generating functions. Applied to probability, algorithms, and coding theory. |

## Component 1 — Learning Objectives

- LO1: Apply **bijective counting** — establishing a one-to-one correspondence between a hard-to-count set and an easy-to-count one — on a problem that does not superficially resemble `math.disc.combinations`'s own $\binom nr$ setup.
- LO2: Apply **recursive counting** — expressing the count for a size-$n$ problem in terms of counts for smaller sizes (a recurrence relation) — and recognize that a valid recurrence is itself a COMPLETE answer, even without a closed-form formula.
- LO3 (orientation level — surveying the concept's own named further techniques): recognize **generating functions** as a technique encoding an entire counting sequence into one algebraic object (a power series whose coefficients ARE the counts), and recognize this concept's own three KG-listed children — stars-and-bars, the pigeonhole principle, and inclusion-exclusion — as dedicated further counting techniques this concept surveys but does not itself develop.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.combinations` (the formula $\binom nr$, and its own established distinction between order-matters and order-doesn't-matter counting).

## Component 3 — Core Explanation

**Bijective counting — mapping the hard onto the easy**: many counting problems don't obviously match a memorized formula's setup. A **bijection** — a one-to-one correspondence between the set being counted and some OTHER set whose size is already known or easier to determine — proves the two sets have the same size without directly enumerating the harder one. This is a genuinely general technique, not limited to problems that superficially resemble $\binom nr$ or $P(n,r)$.

**Recursive counting — building on smaller, already-known counts**: some counting problems resist a direct closed-form approach but yield to a RECURRENCE — expressing the count for size $n$ in terms of counts for smaller sizes, by reasoning about what happens at the "last step" (the last digit, the last item placed, etc.). A correctly-derived recurrence is a COMPLETE and valid answer to "how many," even if a closed-form formula is never found or is only found later by additional work.

**Generating functions and the concept's own named children (orientation level)**: a **generating function** encodes an entire counting SEQUENCE $a_0,a_1,a_2,\dots$ as the coefficients of a single power series $A(x)=\sum a_nx^n$ — algebraic manipulation of $A(x)$ (a technique developed elsewhere) can extract closed-form formulas or relationships among the $a_n$ that would be difficult to find by direct reasoning. This concept's own three named children each address a distinct counting-problem SHAPE: **stars-and-bars** (distributing identical items into distinct bins), the **pigeonhole principle** (if more items than bins, some bin must hold multiple), and **inclusion-exclusion** (correcting for overcounting when counting a union of overlapping sets) — each a dedicated technique surveyed here by name only.

## Component 4 — Worked Examples

**Example 1 (LO1 — bijection to binary strings, breaking MC-1)**: how many SUBSETS does a $5$-element set have? Rather than listing subsets directly, biject each subset onto a length-$5$ binary string (bit $i=1$ if element $i$ is included, $0$ otherwise) — every subset corresponds to exactly one such string, and every string corresponds to exactly one subset. There are $2^5=32$ such strings, so there are $32$ subsets — determined via a bijection to an easy-to-count object (binary strings), without directly enumerating subsets one at a time.

**Example 2 (LO2 — a recurrence relation as a complete answer, breaking MC-2)**: let $a_n$ count binary strings of length $n$ containing NO two consecutive $1$s. If such a string starts with $0$, the remaining $n-1$ digits form any valid string of that length: $a_{n-1}$ ways. If it starts with $1$, the NEXT digit must be $0$ (to avoid "$11$"), and the remaining $n-2$ digits form any valid string: $a_{n-2}$ ways. So $a_n=a_{n-1}+a_{n-2}$, with $a_1=2$ ($0,1$) and $a_2=3$ ($00,01,10$ — excluding $11$). Computing $a_3=a_2+a_1=3+2=5$: verified directly by listing $000,001,010,100,101$ — exactly $5$ strings. The recurrence $a_n=a_{n-1}+a_{n-2}$ is itself a complete, valid solution to the counting problem, independent of whether a closed form (related to the Fibonacci numbers) is ever separately derived.

**Example 3 (LO3, orientation level — generating functions and the named children survey)**: the sequence $a_n$ from Example 2 has a generating function $A(x)=\sum a_nx^n$ that can be manipulated algebraically (a technique developed elsewhere) to extract a closed-form formula for $a_n$ related to the Fibonacci numbers. Separately, this concept names its own three dedicated children: **stars-and-bars** (e.g. distributing $10$ identical candies among $4$ children), the **pigeonhole principle** (e.g. among $13$ people, at least two must share a birth month, since there are only $12$ months), and **inclusion-exclusion** (e.g. counting numbers up to $100$ divisible by $2$ OR $3$, correcting for double-counting multiples of $6$) — each a distinct counting-problem shape addressed by its own dedicated concept.

## Component 5 — Teaching Actions

### Teaching Action A01 — Bijection to an Easy-to-Count Set (Primitive P11: Representation Shift)

State: "when a counting problem doesn't match a formula you already know, look for a one-to-one correspondence with something you CAN already count — the bijection itself proves the sizes match, no direct enumeration required." Work Example 1's subset-to-binary-string bijection.

- **MC-1 hook**: ask "can every counting problem be solved by directly enumerating or by matching a memorized permutations/combinations formula?" — a "yes" answer reveals MC-1 (missing bijection as a general, independent counting technique).

### Teaching Action A02 — A Recurrence Is a Complete Answer, Not a Placeholder (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $a_n=a_{n-1}+a_{n-2}$, verified numerically ($a_3=5$, matching direct enumeration), is presented and accepted as the FULL solution before any closed form is derived. State: "a correctly-derived recurrence relation genuinely answers 'how many' — it doesn't need to be converted to a closed formula to count as a complete solution."

- **MC-2 hook**: ask "if you've derived a valid recurrence relation for a counting problem but haven't yet found a closed-form formula, have you actually solved the problem?" — a "no" answer reveals MC-2 (believing only a closed form counts as a genuine solution).

### Teaching Action A03 — Combinatorics Is a Broad Field, Not a Synonym for One Formula (Primitive P06: Contrast Pair)

Contrast the narrow view of "combinatorics = permutations and combinations" against Example 3's survey of bijections, recursion, generating functions, and three further named techniques (stars-and-bars, pigeonhole, inclusion-exclusion), each suited to a different counting-problem shape. State: "combinatorics is the whole field of counting techniques — $\binom nr$ and $P(n,r)$ are just two tools in a much larger toolbox."

- **MC-3 hook**: ask "is 'combinatorics' just another name for the permutations and combinations formulas you already know?" — a "yes" answer reveals MC-3 (conflating the whole field with two of its specific formulas).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. How many subsets does a $4$-element set have? Use the bijective argument from this lesson (binary strings), not direct enumeration.
  2. Let $b_n$ count binary strings of length $n$ with no three consecutive $0$s. Set up (but need not fully solve) a recurrence relation for $b_n$, following the reasoning style of Example 2.
  3. Explain why a valid recurrence relation (like $a_n=a_{n-1}+a_{n-2}$) counts as a complete answer to a counting problem, even without a closed-form formula.
  4. Name the three specific counting techniques this lesson previewed as its own dedicated children (without deriving any of them), and briefly state what kind of counting problem each is suited for.
- **P76 (Transfer Probe, mode = independence)**: "A password system requires passwords of length $n$ using only the symbols $\{A,B,C\}$ such that no two consecutive symbols are the same. (a) Using a bijective or direct-counting argument (not a memorized formula), determine how many valid length-$2$ passwords exist. (b) Set up a recurrence relation for $c_n$, the number of valid length-$n$ passwords, by reasoning about what symbol can follow a valid length-$(n-1)$ password. (c) Explain why this recurrence-based approach is a legitimate, complete answer to 'how many valid passwords are there,' even without solving the recurrence into a closed-form formula, referencing this lesson's contrast with the closed-form-only expectation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COUNTING-LIMITED-TO-FORMULAS-OR-ENUMERATION | Believing every counting problem must be solved by direct enumeration or matching a memorized permutations/combinations formula, missing bijection as a general, independent technique | Foundational |
| MC-2 | RECURRENCE-TREATED-AS-INCOMPLETE | Believing a valid recurrence relation is only a partial or placeholder answer until converted to a closed form, missing that a correctly-derived recurrence is itself a complete solution | High |
| MC-3 | COMBINATORICS-CONFLATED-WITH-ITS-TWO-FORMULAS | Treating "combinatorics" as a synonym for permutations and combinations specifically, missing the much broader field of bijections, recursion, generating functions, and further named techniques | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Counting Limited to Formulas or Enumeration") → P41 (detect: ask whether every counting problem can be solved by direct enumeration or a memorized formula) → P64 (conceptual shift: re-walk Example 1's bijection, re-anchoring on "a one-to-one correspondence with an easy-to-count set is a complete, independent technique").
- **B02 (targets MC-2)**: P27 (name it: "Recurrence Treated as Incomplete") → P41 (detect: ask whether a valid recurrence relation, without a closed form, actually solves the counting problem) → P64 (conceptual shift: re-walk Example 2's verified recurrence, re-anchoring on "a correctly-derived recurrence IS the complete answer").
- **B03 (targets MC-3)**: P27 (name it: "Combinatorics Conflated with Two Formulas") → P41 (detect: ask whether combinatorics is just another name for permutations and combinations) → P64 (conceptual shift: re-walk Example 3's survey of further techniques, re-anchoring on "combinatorics is the whole field — these are two tools among many").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.combinations` (the $\binom nr$ formula and its own order-matters-vs-doesn't distinction, the "easy to count" baseline this concept's bijections build on).
- **Unlocks**: `math.disc.generating-functions` (will develop the technique previewed at orientation level in LO3; not yet authored).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (a genuine bijective argument and a genuine, verified recurrence) and LO3 kept orientation-level, appropriately surveying generating functions and the concept's own three named children without developing any of them.
- **Division of labor**: `math.disc.combinations` owns the specific $\binom nr$ formula and its order-matters distinction; this concept owns the BROADER counting toolbox (bijection, recursion) and surveys, without developing, the further named techniques (`math.disc.stars-bars`, `math.disc.pigeonhole`, `math.disc.inclusion-exclusion`, `math.disc.generating-functions`) that extend this survey.
- Example 1's subset-counting bijection was deliberately chosen over a stars-and-bars-style distribution problem specifically to avoid pre-empting that named child concept's own content — the bijection technique is demonstrated on a genuinely different, self-contained counting problem instead.

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
| V-15 | CPA_entry_stage justified | PASS (Concrete: counting subsets of a small set directly by listing, before the bijective shortcut) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

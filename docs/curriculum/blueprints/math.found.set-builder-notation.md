# Teaching Blueprint: Set-Builder Notation (`math.found.set-builder-notation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.set-builder-notation` |
| name | Set-Builder Notation |
| domain | Foundations |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.found.set`, `math.found.predicate` |
| unlocks | `math.found.subset` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with checking specific candidate elements against a predicate before the general notation |
| description (KG) | A notation {x ∈ A : P(x)} defining a set by specifying a domain and a predicate that its elements must satisfy. |

## Component 1 — Learning Objectives

- LO1: Read and write set-builder notation $\{x\in A:P(x)\}$, correctly identifying its TWO separate, both-necessary components — the **domain** $A$ (where $x$ ranges) and the **predicate** $P(x)$ (the condition elements must satisfy) — recognizing that omitting either component leaves the set genuinely ambiguous or ill-defined.
- LO2: Convert a set-builder expression into explicit roster (list) notation for a finite set, by checking each candidate element of the domain against the predicate directly — and recognize that a predicate satisfied by NO element of the domain yields the empty set $\varnothing$, a perfectly valid outcome, not an error.
- LO3: Recognize that changing the domain $A$ alone, or changing the predicate $P(x)$ alone, generally changes the resulting set — the two components are independently meaningful, not redundant or substitutable for one another.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set` (basic set concept, membership) and `math.found.predicate` (a predicate $P(x)$ as a statement with a free variable, evaluating to true or false once $x$ is assigned a value).

## Component 3 — Core Explanation

**Set-builder notation has two necessary parts, not one**: $\{x\in A:P(x)\}$ names the set of all elements $x$ drawn from the domain $A$ that satisfy the predicate $P(x)$. The domain $A$ specifies WHERE $x$ is allowed to range; the predicate $P(x)$ specifies WHICH of those elements qualify. Both are required: the domain without a predicate would just be $A$ itself (no filtering); a predicate without a domain leaves the set of candidates completely unspecified, since the same predicate can produce dramatically different sets depending on what $x$ is allowed to range over.

**Checking membership means testing each candidate directly, and an empty result is a valid answer**: converting $\{x\in A:P(x)\}$ to an explicit list (for a finite $A$) means checking every element of $A$ against $P(x)$ one at a time, keeping exactly those that satisfy it. If NO element of $A$ satisfies $P(x)$, the result is the empty set $\varnothing$ — a completely valid, well-defined set, not an error, undefined result, or a sign that the predicate was somehow invalid.

**Domain and predicate are independently meaningful — changing either one generally changes the set**: because the resulting set depends on BOTH components jointly, holding the predicate fixed while changing the domain (or vice versa) generally produces a genuinely different set — neither component can be treated as fixed background detail safely ignorable once the "main idea" (the other component) is understood.

## Component 4 — Worked Examples

**Example 1 (LO1 — domain and predicate are both necessary, breaking MC-1)**: $\{x\in\mathbb{Z}:x^2=4\}=\{-2,2\}$ (domain: all integers; predicate: $x^2=4$; both $-2$ and $2$ satisfy it). Now change ONLY the domain, keeping the identical predicate: $\{x\in\mathbb{N}:x^2=4\}=\{2\}$ — since $-2\notin\mathbb{N}$ (the natural numbers), it is excluded, even though it still satisfies $x^2=4$ as an equation. The SAME predicate, with a different domain, yields a genuinely smaller set — proving the domain is a necessary, independent part of the notation, not an omittable detail.

**Example 2 (LO2 — checking each candidate directly, and a valid empty result, breaking MC-2)**: $\{x\in\mathbb{Z}:1\le x\le5\text{ and }x\text{ is even}\}$: checking each candidate $1,2,3,4,5$ against the predicate — $1$ (odd, fails), $2$ (even, in range, satisfies), $3$ (odd, fails), $4$ (even, in range, satisfies), $5$ (odd, fails) — roster form $\{2,4\}$. Now consider $\{x\in\mathbb{Z}:x^2=-1\}$: checking EVERY integer, none satisfies (a square is never negative) — the result is $\varnothing$, a perfectly valid, well-defined empty set, not an error or an indication that the notation was misused.

**Example 3 (LO3 — domain change vs. predicate change, each independently altering the set, breaking MC-3)**: $\{x\in\mathbb{Z}:0<x<10\}=\{1,2,\dots,9\}$ (9 elements). Changing ONLY the domain to $\mathbb{R}$: $\{x\in\mathbb{R}:0<x<10\}$ is the infinite real interval $(0,10)$ — the identical predicate produces a dramatically different (now infinite) set purely from the domain change. Separately, changing ONLY the predicate (keeping the domain $\mathbb{Z}$), from $0<x<10$ to $0\le x<10$: $\{x\in\mathbb{Z}:0\le x<10\}=\{0,1,\dots,9\}$ — now including $0$, a set genuinely different from the original $\{1,\dots,9\}$, purely from the predicate's boundary condition changing. Both components independently alter the resulting set.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Domain Is Not Optional (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: the identical predicate $x^2=4$ gives $\{-2,2\}$ over $\mathbb{Z}$ but only $\{2\}$ over $\mathbb{N}$. State: "the domain determines which candidates are even eligible to be checked against the predicate — without it, the same predicate can mean genuinely different sets."

- **MC-1 hook**: ask "is set-builder notation fully determined just by the predicate $P(x)$, without needing to separately specify the domain $A$?" — a "yes" answer reveals MC-1 (treating the domain as optional or implicit, missing that it independently determines the resulting set).

### Teaching Action A02 — An Empty Result Is a Valid Answer, Not an Error (Primitive P11: Representation Shift)

State: "checking every candidate and finding that none satisfies the predicate is not a failure of the notation — it correctly and validly produces $\varnothing$." Work Example 2's $\{x\in\mathbb{Z}:x^2=-1\}=\varnothing$ alongside the non-empty $\{2,4\}$ case, showing both are equally legitimate outcomes of the same checking procedure.

- **MC-2 hook**: ask "if no element of the domain satisfies the predicate, does that mean the set-builder expression is invalid or undefined?" — a "yes" answer reveals MC-2 (treating an empty result as an error rather than a valid empty set).

### Teaching Action A03 — Domain and Predicate Each Independently Change the Set (Primitive P06: Contrast Pair)

Contrast Example 3's two changes: switching the domain from $\mathbb{Z}$ to $\mathbb{R}$ (predicate fixed) turns a 9-element set into an infinite interval; switching the predicate's boundary from $<$ to $\le$ (domain fixed) adds exactly one element. State: "each component can be changed independently, and each change independently changes the resulting set — neither is a fixed backdrop you can safely ignore once you've focused on the other."

- **MC-3 hook**: ask "if the predicate stays the same, does changing only the domain leave the resulting set essentially unchanged?" — a "yes" answer reveals MC-3 (treating the domain, or the predicate, as substitutable background detail rather than an independently meaningful component).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Write $\{x\in\mathbb{Z}:x^2=9\}$ in roster form, and then write $\{x\in\mathbb{N}:x^2=9\}$, explaining why the two differ.
  2. Convert $\{x\in\mathbb{Z}:-3\le x\le3\text{ and }x\text{ is odd}\}$ to roster form by checking each candidate.
  3. State $\{x\in\mathbb{Z}:x^2=-4\}$ and explain why this is a valid, well-defined answer rather than an error.
  4. Give two set-builder expressions with the SAME predicate but different domains that produce genuinely different sets (other than the examples already given).
- **P76 (Transfer Probe, mode = independence)**: "A database engineer writes a query intending to select 'all customers with age less than 18,' but forgets to specify whether the query runs over the full customer table or only a filtered subset (say, customers from a specific store). (a) Using this lesson's domain/predicate distinction, explain what is genuinely ambiguous about the engineer's intended query as described. (b) Once the engineer specifies the domain explicitly (say, 'all customers in the full table'), and the query returns zero results because no customer happens to be under 18, a colleague argues 'this must mean the query itself is broken or malformed.' Using this lesson's empty-result reasoning, explain why the colleague's conclusion doesn't follow. (c) The colleague then proposes narrowing the domain to 'customers from Store A' instead, keeping the SAME age-under-18 predicate, and claims the result will be exactly the same set as before, 'since the predicate didn't change.' Explain specifically why this claim is incorrect."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DOMAIN-TREATED-AS-OPTIONAL | Believing set-builder notation is fully determined by the predicate alone, missing that the domain independently determines the resulting set | Foundational |
| MC-2 | EMPTY-RESULT-TREATED-AS-ERROR | Believing a set-builder expression with no satisfying elements is invalid or undefined, missing that it correctly produces the valid empty set | Foundational |
| MC-3 | DOMAIN-OR-PREDICATE-TREATED-AS-SUBSTITUTABLE-BACKGROUND | Believing changing the domain (or predicate) alone, while holding the other fixed, leaves the resulting set essentially unchanged | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Domain Treated as Optional") → P41 (detect: present a predicate alone without a domain and ask whether the set is fully determined, checking for "yes") → P64 (conceptual shift: re-walk Example 1's $\mathbb{Z}$-vs-$\mathbb{N}$ contrast under the same predicate, re-anchoring on "the domain independently determines which candidates are even eligible").
- **B02 (targets MC-2)**: P27 (name it: "Empty Result Treated as Error") → P41 (detect: present $\{x\in\mathbb{Z}:x^2=-1\}$ and ask whether it is a valid set, checking for "no, it's an error") → P64 (conceptual shift: re-walk Example 2's direct candidate-checking process yielding $\varnothing$, re-anchoring on "no satisfying elements simply means the answer is the empty set, a valid outcome").
- **B03 (targets MC-3)**: P27 (name it: "Domain or Predicate Treated as Substitutable Background") → P41 (detect: ask a student whether changing only the domain, predicate fixed, leaves the set essentially the same, checking for "yes") → P64 (conceptual shift: re-walk Example 3's two independent changes (domain: 9 elements to an infinite interval; predicate: adding exactly one boundary element), re-anchoring on "both components independently determine the resulting set").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set` (the basic set/membership concept this notation builds a specification method for), `math.found.predicate` (the $P(x)$ condition this notation applies to a domain).
- **Unlocks**: `math.found.subset` (set-builder notation is the standard tool for specifying a subset of a given set via a defining condition).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 2 with a foundational/apply tag places this at a compact "3 TAs + gate" tier, appropriately terse given the concept combines two already-mastered prerequisites (`math.found.set`, `math.found.predicate`) into one notation, rather than introducing substantial new machinery.
- **Division of labor**: `math.found.set` owns the basic set concept; `math.found.predicate` owns the predicate/free-variable concept. This concept, `math.found.set-builder-notation`, deliberately does not re-teach either; it owns the SPECIFIC notation combining them, and the two-component (domain + predicate) reading discipline that notation requires.
- Example 1 and Example 3's domain-change demonstrations were deliberately built around the SAME core predicate ($x^2=4$ in Example 1) or closely related predicates (Example 3), specifically to isolate the domain's own independent effect as cleanly as possible, rather than varying both components simultaneously and obscuring which change caused which difference.

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
| V-15 | CPA_entry_stage justified | PASS (Concrete: candidate-checking against a predicate before the general notation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

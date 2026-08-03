# Teaching Blueprint: Corollary (`math.found.corollary`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.corollary` |
| name | Corollary |
| domain | Foundations |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 2 |
| requires | `math.found.theorem` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A result that follows easily from a theorem, often requiring only a brief additional argument or a direct substitution. |
| related | `math.found.theorem`, `math.found.lemma` |
| aliases | immediate consequence |

## Component 1 — Learning Objectives

- LO1: Define a **corollary** as a result that follows EASILY from an already-proved theorem, typically via a brief additional step or a direct substitution, rather than requiring substantial new proof work.
- LO2: Given a theorem, derive a specific corollary by direct substitution or a short additional argument, citing the parent theorem explicitly rather than re-proving its content.
- LO3: Distinguish a corollary (a quick consequence) from a lemma (a stepping stone TOWARD a larger result, `math.found.lemma`) — the two sit on OPPOSITE sides of their associated theorem in the logical flow of a text.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.theorem` — a corollary derives its content directly and easily from an already-established theorem, contributing no substantial new proof machinery of its own.

## Component 3 — Core Explanation

A **corollary** is a result that follows EASILY from a theorem already proved, typically via a direct substitution of specific values, a special case, or one brief additional logical step. Corollaries are valued because they extract useful, ready-to-use specific consequences from a more general result, without requiring the reader to redo substantial proof work.

Corollaries and lemmas relate to their parent theorem in OPPOSITE directions: a lemma comes BEFORE the theorem (a stepping stone used to build UP to it); a corollary comes AFTER (an easy consequence derived FROM it, once already established).

## Component 4 — Worked Examples

**Example 1 (LO2 — a direct-substitution corollary)**: Given the theorem "the sum of the interior angles of any $n$-gon is $(n-2)\times180°$" (a genuine geometric result, taken as given here), a corollary follows immediately by substituting $n=3$: "the sum of the interior angles of a triangle is $(3-2)\times180°=180°$" — no new proof technique needed, just a direct substitution into an already-established general formula.

**Example 2 (LO3 — corollary vs. lemma placement, breaking MC-1)**: In a text proving "$\sqrt2$ is irrational" (the theorem), the sub-claim "if $n^2$ is even, then $n$ is even" is used BEFORE the main proof, as a LEMMA supporting it — it comes first in the logical order. By contrast, once the theorem is established, a natural COROLLARY might state "$\sqrt2$ is not a ratio of any two integers $a,b$ with $b\ne0$" (a direct restatement/consequence, following AFTER) — corollaries extend or restate an already-finished result, they don't support building toward it.

**Example 3 (LO1, LO2 — a corollary requiring one brief additional step, breaking MC-2)**: Given the theorem "every even integer greater than 2 that is expressible as a sum of two primes has at least one representation" (hypothetically taken as an established theorem for this exercise), a corollary might state "every even integer $n$ with $4\le n\le20$ has at least one such representation" — this requires slightly MORE than pure substitution (checking the range condition explicitly), yet still counts as a corollary since the additional work is minor and does not require redeveloping the theorem's own machinery.

## Component 5 — Teaching Actions

### Teaching Action A01 — Derive a Corollary by Direct Substitution (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly citing the parent theorem by name before substituting $n=3$, modeling the standard citation-then-substitution pattern corollaries follow.

- **MC-1 hook**: ask the student where a lemma and a corollary EACH sit relative to a theorem in a written proof (before it vs. after it) and observe whether they can distinguish the two directions (revealing MC-1: confusing a corollary's "comes after, easy consequence" role with a lemma's "comes before, stepping stone" role).

### Teaching Action A02 — "Easy" Doesn't Mean "Zero Additional Work" (Primitive P06: Contrast Pair)

Contrast Example 1 (pure substitution, essentially no additional reasoning) against Example 3 (a small but genuine extra argument — checking a range condition) to show corollaries can require a BRIEF additional step, not only bare substitution. State the rule: "a corollary can include a small amount of extra work — the defining feature is that this work is MINOR relative to the parent theorem's own proof, not that there is literally zero work at all."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given the (hypothetical, taken as established) theorem "every square number is nonnegative," derive the corollary that $(-5)^2\ge0$ by direct substitution.
  2. Given the theorem from Example 1 ($n$-gon angle sum), derive the corollary for a hexagon ($n=6$).
  3. Explain, in one sentence, the difference in WHEN a lemma and a corollary each appear relative to their associated theorem in a written proof.
  4. Given a theorem "every prime greater than 2 is odd," state whether "7 is odd" would count as a meaningful corollary of it, and explain why direct-verification examples like this are usually too trivial to be worth stating as formal corollaries (contrast with a genuinely useful, general special case).
- **P76 (Transfer Probe, mode = independence)**: "A physics-adjacent theorem (taken as given for this exercise) states: 'for any two objects with masses $m_1,m_2$ separated by distance $r$, the gravitational force between them is $F=Gm_1m_2/r^2$.' (a) Derive a corollary for the SPECIFIC case where $m_1=m_2=m$ (equal masses), simplifying the formula accordingly. (b) A colleague proposes stating, as a SEPARATE lemma (rather than corollary), the sub-fact 'inverse-square relationships decrease rapidly with distance' used earlier to help derive the general theorem in the first place. Explain, using this lesson's lemma/corollary distinction, why this sub-fact's PLACEMENT (before vs. after the main theorem) determines whether it should be labeled a lemma or a corollary."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COROLLARY-AND-LEMMA-PLACEMENT-CONFUSED | Confusing a corollary's "comes after, easy consequence" relationship to its theorem with a lemma's "comes before, stepping stone" relationship | Foundational |
| MC-2 | COROLLARY-REQUIRED-TO-BE-PURE-SUBSTITUTION-ONLY | Believing a corollary can never involve any additional reasoning step beyond direct substitution, rejecting valid corollaries that include a small extra argument | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Corollary/Lemma Placement Confused") → P41 (detect: the opening A01 question itself) → P64 (conceptual shift: re-walk Example 2, explicitly diagramming the BEFORE (lemma) / theorem / AFTER (corollary) sequence).
- **B02 (targets MC-2)**: P27 ("Corollary Required to Be Pure Substitution") → P41 (detect: present Example 3's range-checking corollary and ask if it still qualifies as a corollary) → P64 (conceptual shift: re-walk Example 3, confirming the additional range check is minor relative to the parent theorem's own proof work, still qualifying it as a corollary).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.theorem`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.lemma` (the opposite-direction sibling category this concept is directly contrasted against, sharing the same parent prerequisite `math.found.theorem`).

## Component 8 — Teaching Notes

- estimated_hours = 2, matching `math.found.lemma`'s allocation, since both concepts are targeted refinements of the already-mastered `math.found.theorem` category rather than sources of new proof machinery.
- MC-1 was ranked most severe because the lemma/corollary directional distinction is the single most useful piece of structural knowledge for READING mathematical texts fluently (per `math.found.reading-mathematics`) — misreading which role a labeled result plays disrupts understanding of the text's overall logical architecture.
- This blueprint was deliberately authored back-to-back with `math.found.lemma`, sharing the same $\sqrt2$-irrationality theorem as a running example in both (Example 2 here directly reuses that theorem's lemma from `math.found.lemma`'s own Example 1), reinforcing the contrast through a single, consistent worked case rather than two unrelated examples.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.theorem`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO3, Ex3→LO1/LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

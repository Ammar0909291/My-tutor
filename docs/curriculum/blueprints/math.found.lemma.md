# Teaching Blueprint: Lemma (`math.found.lemma`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.lemma` |
| name | Lemma |
| domain | Foundations |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 2 |
| requires | `math.found.theorem` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A proven statement used as a stepping stone in the proof of a larger theorem, valued for its utility in breaking complex proofs into manageable parts. |
| related | `math.found.theorem`, `math.found.corollary` |
| aliases | helper theorem, auxiliary lemma |

## Component 1 — Learning Objectives

- LO1: Define a **lemma** as a proven statement whose primary purpose is serving as a stepping stone within a larger proof, and recognize it is logically identical in RIGOR to a theorem — the difference is purely one of role/purpose, not proof standard.
- LO2: Given a complex proof, identify a natural sub-claim that could be extracted and proved separately as a lemma, explaining why doing so simplifies the overall argument.
- LO3: Recognize that a lemma's importance is not fixed by its label — some lemmas (e.g. certain famous ones) become more celebrated or reused than the "main" theorems they were designed to support.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.theorem` — a lemma is proved to EXACTLY the same standard as a theorem; the distinction is organizational, not logical.

## Component 3 — Core Explanation

A **lemma** is a proven mathematical statement whose primary role is to serve as a stepping stone within the proof of a larger, more significant result. Structurally and logically, a lemma is proved by the SAME standard as any theorem — full rigor, resting on axioms and prior results — the ONLY difference is its intended ROLE: lemmas exist to be USED, breaking a complex proof into smaller, independently-verifiable pieces rather than one monolithic argument.

Labeling something a "lemma" versus a "theorem" is often a judgment call by the author about relative significance, not a difference in logical status — and this label can be misleading, since some lemmas turn out to be more broadly useful or celebrated than the theorem they were originally introduced to support.

## Component 4 — Worked Examples

**Example 1 (LO2 — extracting a natural lemma from a larger proof)**: To prove the theorem "$\sqrt2$ is irrational" (via `math.found.proof-by-contradiction`), the argument relies on a sub-claim: "if $n^2$ is even, then $n$ is even." This sub-claim is naturally extracted as its own LEMMA, proved once (via `math.found.proof-by-contrapositive`) and then simply CITED within the main proof, rather than re-derived inline — keeping the main proof focused on its own structure.

**Example 2 (LO1, LO3 — a lemma more famous than its parent theorem, breaking MC-1)**: Zorn's Lemma was originally introduced as a technical stepping stone toward proving certain results in set theory and algebra, yet it is now used FAR more widely and is more famous, in its own right, than many of the specific theorems it was first used to prove — demonstrating that "lemma" is not a marker of lesser importance, merely of its originally intended supporting role.

**Example 3 (LO2 — a proof that becomes unwieldy without lemma extraction)**: A direct, un-decomposed proof that "every finite simple graph with more edges than $\binom{n-1}{2}$ vertices is connected" (a real graph-theory-style claim, offered here structurally) would need to repeatedly re-derive a counting sub-argument about vertex degrees at several points; extracting that counting argument as a separate lemma, proved once, lets the main proof simply CITE it each time it's needed — shortening and clarifying the overall argument considerably.

## Component 5 — Teaching Actions

### Teaching Action A01 — Extract a Reusable Sub-Claim as a Lemma (Primitive P64: Conceptual Shift)

Work Example 1, showing the main $\sqrt2$-irrationality proof both WITH the lemma extracted (clean, modular) and, briefly, what it would look like inline (cluttered), to make the organizational benefit concrete.

- **MC-1 hook**: ask "is a lemma logically 'weaker' or 'less proven' than a theorem?" and observe the response (revealing MC-1: believing the lemma/theorem label reflects a difference in RIGOR or certainty, rather than purely a difference in intended role).

### Teaching Action A02 — A Lemma's Label Doesn't Fix Its Importance (Primitive P06: Contrast Pair)

Present Example 2's Zorn's Lemma case directly: introduced as a supporting tool, now more broadly cited than many "main" theorems. State the rule: "the words 'lemma' and 'theorem' describe an author's INTENDED role for a result at the time of writing, not a permanent, objective ranking of the result's ultimate importance."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Explain, in one paragraph, why a lemma requires exactly the same standard of proof as a theorem, despite the different label.
  2. Given a proof outline that repeats a specific algebraic identity three separate times, propose extracting that identity as a lemma, and explain the resulting benefit.
  3. State whether a lemma can ever be cited and reused in the proof of a DIFFERENT theorem than the one it was originally introduced for, and justify (yes — a proven lemma is available for any future proof needing it, exactly like any theorem).
  4. Explain, using Zorn's Lemma as an example, why the label "lemma" does not tell you how significant or widely-used a result eventually becomes.
- **P76 (Transfer Probe, mode = independence)**: "A researcher is drafting a long proof of a new theorem and notices the same three-line algebraic manipulation is needed at four separate points in the argument. (a) Using this lesson's concept, describe what organizational choice the researcher should make, and why. (b) A junior colleague objects, 'but if it's just a helper step, doesn't that make the whole proof less rigorous than if everything were derived directly inline?' Explain why this objection is mistaken, connecting your answer to the lemma/theorem rigor-equivalence established in this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LEMMA-ASSUMED-LESS-RIGOROUSLY-PROVEN-THAN-THEOREM | Believing a lemma is proved to a lower standard of rigor or certainty than a theorem, rather than recognizing the labels differ only in intended organizational role | Foundational |
| MC-2 | LEMMA-EXTRACTION-OPPORTUNITY-MISSED-IN-REPETITIVE-PROOFS | Failing to recognize when a repeated sub-argument within a proof would benefit from extraction as a separate, reusable lemma | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Lemma Assumed Less Rigorously Proven") → P41 (detect: the opening A01 question itself) → P64 (conceptual shift: re-walk Example 1, confirming the even-square lemma is proved with the exact same rigor as the surrounding $\sqrt2$ theorem, using the identical proof-by-contrapositive machinery).
- **B02 (targets MC-2)**: P27 ("Lemma Extraction Opportunity Missed") → P41 (detect: present Example 3's repetitive-proof scenario and ask whether any restructuring would help) → P64 (conceptual shift: re-walk Example 3, showing how extracting the counting sub-argument shortens and clarifies the overall proof).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.theorem`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.corollary` (the other named-result category unlocked by `math.found.theorem`, contrasted directly in that concept's own material).

## Component 8 — Teaching Notes

- estimated_hours = 2, matching `math.found.theorem`'s own allocation, reflecting that this concept is a targeted refinement of an already-understood category (proven statements) rather than new proof machinery.
- MC-1 was ranked most severe because it represents a genuine misunderstanding of mathematical rigor's uniformity — believing some proven results are "more proven" than others based on a purely organizational label undermines confidence in using lemmas freely as fully-trustworthy building blocks.
- Zorn's Lemma was chosen as the canonical Example 2 case (rather than a smaller, invented illustration) because its real-world fame specifically as a "lemma" — despite being one of the most consequential and widely-cited results in set-theoretic mathematics — makes the label/importance disconnect unmistakably concrete.

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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO1/LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

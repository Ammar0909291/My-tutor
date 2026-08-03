# Teaching Blueprint: Writing Mathematics (`math.found.writing-mathematics`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.writing-mathematics` |
| name | Writing Mathematics |
| domain | Foundations |
| difficulty | developing |
| bloom | create |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.found.reading-mathematics`, `math.found.proof` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The craft of expressing mathematical reasoning clearly, precisely, and in standard notation, balancing rigor with readability. |
| related | `math.found.reading-mathematics` |
| aliases | mathematical writing, proof writing style |

## Component 1 — Learning Objectives

- LO1: Write a proof using complete sentences and standard connective phrases ("since," "therefore," "assume," "it follows that"), rather than a bare, disconnected sequence of symbolic steps.
- LO2: State every proof's assumptions, quantifiers, and conclusion EXPLICITLY at the start and end, rather than leaving them for the reader to infer from context.
- LO3: Balance rigor and readability — include enough justification for every step to be independently verifiable, without excessive, distracting over-explanation of routine algebra.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.reading-mathematics` (the complementary comprehension skill — this concept is its production-side counterpart) and `math.found.proof` (the content being written, already understood; this concept teaches how to WRITE it well).

## Component 3 — Core Explanation

**Writing mathematics** well means expressing a correct proof or argument so that a knowledgeable reader can follow and VERIFY it efficiently — a distinct skill from having found the correct argument in the first place. Good mathematical writing: (1) uses complete sentences with connective words, not merely a chain of symbols; (2) states the goal, assumptions, and structure UP FRONT, so the reader knows what is being attempted before working through the details; (3) justifies each nontrivial step, while not over-explaining routine manipulations a target-audience reader would find self-evident; (4) ends with a clear signal that the proof is complete (e.g. "$\blacksquare$" or "which completes the proof").

## Component 4 — Worked Examples

**Example 1 (LO1 — sentences vs. bare symbols, breaking MC-1)**: A bare-symbol version: "$n=2k$. $n^2=4k^2=2(2k^2)$." A well-written version: "Assume $n$ is even, so $n=2k$ for some integer $k$. Then $n^2=(2k)^2=4k^2=2(2k^2)$, and since $2k^2$ is an integer, $n^2$ is even." The second version is not "more correct" mathematically, but is dramatically easier to verify and follow — it makes the LOGICAL STRUCTURE (assumption, substitution, conclusion) explicit through connecting language, rather than requiring the reader to reconstruct it from bare algebra alone.

**Example 2 (LO2 — stating the goal upfront, breaking MC-2)**: A proof that plunges directly into algebra without first stating what is being proved forces the reader to guess the target and reconstruct it retroactively. Better practice: begin "We will show that if $n$ is even, then $n^2$ is even. Assume $n$ is even..." — stating the goal BEFORE the argument begins, so the reader can evaluate each step against a known target throughout.

**Example 3 (LO3 — balancing rigor and readability)**: For an audience already fluent in basic algebra, writing "expanding $(2k+1)^2$ gives $4k^2+4k+1$" needs no further justification of the expansion itself (routine, expected knowledge) — but the CONCLUSION drawn from it ("...which is odd, since it equals $2(2k^2+2k)+1$") DOES need the explicit odd-number justification spelled out, since that inferential step is the actual point of the proof, not a routine manipulation.

## Component 5 — Teaching Actions

### Teaching Action A01 — Write in Full Sentences with Explicit Connectives (Primitive P64: Conceptual Shift)

Work Example 1, rewriting the bare-symbol version into the full-sentence version live, narrating how each connective word ("assume," "then," "since") makes a specific logical relationship explicit that was only implicit in the symbols alone.

- **MC-1 hook**: present the bare-symbol version of Example 1 and ask the student to identify what logical role each line plays (assumption? derived consequence? conclusion?); check for hesitation or guessing (revealing MC-1: writing a technically-correct symbolic chain that omits the connecting language needed for a reader to easily identify each step's logical role).

### Teaching Action A02 — State the Goal Before the Argument (Primitive P06: Contrast Pair)

Contrast Example 2's two openings — plunging directly into algebra vs. stating the goal first — showing how the second version lets a reader track progress against a known target throughout, while the first requires guessing then retroactively reconstructing the intent.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Rewrite a given bare-symbol proof fragment into full sentences with explicit connective language.
  2. Write the opening sentence (goal statement) for a proof of "if $a$ and $b$ are both odd, then $ab$ is odd," before writing the proof itself.
  3. Given a proof that over-explains a routine algebraic expansion step by step while GLOSSING OVER the actual key inferential step, identify which parts should be condensed and which need more explicit justification.
  4. Write a complete, well-structured proof (goal stated first, full sentences, explicit conclusion marker) of "the product of two even integers is divisible by 4."
- **P76 (Transfer Probe, mode = independence)**: "A student submits the following as a complete proof: '$x=2k+1$. $x^2-1=4k^2+4k=4k(k+1)$.' (a) Rewrite this as a well-structured proof following this lesson's principles — state the goal, use full sentences with connectives, and make the concluding claim explicit (that $x^2-1$ is divisible by 4 whenever $x$ is odd). (b) Explain, using this lesson's rigor-vs-readability balance principle, which specific step in your rewritten version most needs an explicit justification, and which routine algebraic manipulation needs none."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BARE-SYMBOLIC-CHAIN-SUBSTITUTED-FOR-CONNECTED-PROSE | Writing a technically-correct sequence of symbolic steps without the connective language needed for a reader to identify each step's logical role | Foundational |
| MC-2 | PROOF-GOAL-LEFT-IMPLICIT-UNTIL-THE-END | Beginning a proof directly with algebra/computation without first stating what is being proved, forcing the reader to infer the target retroactively | Moderate |
| MC-3 | JUSTIFICATION-EFFORT-MISALLOCATED | Over-explaining routine, expected manipulations while under-explaining the genuinely key inferential steps that carry the proof's actual logical weight | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Bare Symbolic Chain Substituted for Prose") → P41 (detect: present the opening A01 hook and check for hesitation identifying each line's role) → P64 (conceptual shift: re-walk Example 1's rewrite, narrating each connective word's specific logical function).
- **B02 (targets MC-2)**: P27 ("Proof Goal Left Implicit Until the End") → P41 (detect: review a submitted proof attempt for a stated goal sentence before the argument begins) → P64 (conceptual shift: re-walk Example 2, demonstrating how stating the goal upfront changes the reading experience).
- **B03 (targets MC-3)**: P27 ("Justification Effort Misallocated") → P41 (detect: present Example 3's imbalanced-explanation case and ask the student to identify which parts are over- or under-explained) → P64 (conceptual shift: re-walk Example 3, explicitly separating "routine, expected" steps from "the actual point of the proof" steps).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.reading-mathematics`, `math.found.proof`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.reading-mathematics` (the direct comprehension-side counterpart to this concept's production-side skill — together forming a complete input/output pair for engaging with formal mathematical text).

## Component 8 — Teaching Notes

- estimated_hours = 8, the highest in this entire domain wave, reflects that writing mathematics well is a genuinely difficult CRAFT skill requiring extended practice and feedback, distinct from and beyond simply knowing correct proof content — comparable in scope to `math.found.mathematical-modeling`'s own generative demands.
- MC-1 was ranked most severe because it is the single most common failure mode among students who otherwise understand a proof's mathematical content perfectly well — the gap here is purely COMMUNICATIVE, yet it directly determines whether a written proof is actually usable by a reader (including, eventually, the student's own future self reviewing their own work).
- This concept was deliberately positioned as the FINAL entry in this domain wave (requiring both `math.found.reading-mathematics` and `math.found.proof`), completing the reading/writing pair that bookends this batch's extensive proof-technique cluster — students arrive here having already practiced the full range of proof techniques this concept now teaches them to communicate clearly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.reading-mathematics`, `math.found.proof`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

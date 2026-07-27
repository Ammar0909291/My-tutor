# math.geom.geometric-proof

## Identity
- **KG ID**: `math.geom.geometric-proof`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.found.proof`, `math.geom.congruent-triangles`, `math.geom.parallel-lines`
- **Unlocks**: none listed in the KG.
- **Cross-links**: none (KG lists no cross-links for this concept; P76_mode = independence).
- **Difficulty**: proficient
- **Bloom level**: create
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.geom.geometric-proof.md` (reused by reference throughout this entry).

## Learning Objective
The student will write a two-column proof using congruence criteria and parallel-line angle relationships as justifications, recognize that genuine proof chains multiple established facts to reach a new conclusion (via CPCTC), and recognize (at orientation level) that a paragraph proof carries identical logical content to a two-column proof, and that indirect proof is a valid alternative strategy, not a lower standard.

## Core Understanding
Per the Blueprint's Component 3: a two-column geometric proof makes `math.found.proof`'s general deductive structure explicit — the left column lists each statement, the right column gives its justification (a given fact, a definition, or a previously-proved theorem such as `math.geom.congruent-triangles`'s SAS criterion or `math.geom.parallel-lines`'s alternate-interior-angles fact); every line must be justified by something already established, never asserted because it "looks true." The genuine work of proof is chaining several already-proved facts in sequence — using parallel-line angle relationships to establish a congruence criterion's hypotheses, invoking that criterion to conclude congruence, then using CPCTC (corresponding parts of congruent triangles are congruent) to derive a further, genuinely new fact not present in the original given information. A paragraph proof expresses the identical chain of justified steps as continuous prose rather than a table — the logical rigor is unchanged, only the presentation format differs; indirect proof (assume the conclusion false, derive a contradiction) is a genuinely different but equally rigorous strategy, not a lower standard.

## Mental Models
1. **The explicit-justification model** (Blueprint TA-A01, P11): the two-column format forces every single statement to be backed by a given fact, a definition, or an already-proved theorem — nothing is asserted just because it looks true.
2. **The chain-goes-further model** (Blueprint TA-A02, P28): a proof's real payoff often comes after the headline conclusion (like congruence) — chaining that result forward via CPCTC reveals genuinely new facts not available before.
3. **The same-content-different-format model** (Blueprint TA-A03, P06): changing from two-column to paragraph format doesn't change the rigor at all, and using an indirect (assume-and-contradict) strategy doesn't lower the standard either.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing the justification column is mostly a formality where visually obvious statements need no specific backing, missing that every line requires a genuine, checkable justification. A second, high-severity failure is believing a proof's work ends once the headline conclusion (like triangle congruence) is established, missing that CPCTC can chain it forward to derive further new facts. A third failure is believing paragraph-form proofs are inherently less rigorous than two-column proofs, missing that they carry identical logical content in a different format.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — JUSTIFICATION-COLUMN-ASSUMED-FORMALITY** (Foundational)
  - **Blueprint description**: believing the justification column is mostly a formality where visually obvious statements need no specific backing.
  - **Birth type**: Type 5, instruction-induced — early proof examples often use highly intuitive statements, training a habit of treating "obvious" as sufficient justification on its own, rather than always naming a specific backing theorem.
  - **Repair approach**: Blueprint Repair Action B01 — re-walking the specific line-by-line justifications, re-anchoring on "every line requires a genuine, checkable justification."

- **MC-2 — PROOF-ASSUMED-TO-END-AT-MAIN-CONCLUSION** (High)
  - **Blueprint description**: believing a proof's work ends once the headline conclusion (like congruence) is established, missing that CPCTC can chain it forward to derive further new facts.
  - **Birth type**: Type 5, instruction-induced — introductory proof exercises frequently stop right at the "prove congruent" conclusion, so the forward-chaining CPCTC step never gets modeled or practiced.
  - **Repair approach**: Blueprint Repair Action B02 — re-walking the CPCTC-derived new fact that wasn't part of the original given information.

- **MC-3 — PARAGRAPH-PROOF-ASSUMED-LESS-RIGOROUS** (Moderate)
  - **Blueprint description**: believing paragraph-form proofs are inherently less rigorous than two-column proofs, missing that they carry identical logical content in a different format.
  - **Birth type**: Type 3, language contamination — the highly structured, tabular appearance of a two-column proof is conflated with rigor itself, so a less visually formal paragraph is assumed to be less rigorous.
  - **Repair approach**: Blueprint Repair Action B03 — re-walking the identical-content paragraph rewrite of the same proof, re-anchoring on "identical logical content, different presentation format."

## Analogies
- **The rectangle-diagonal-proof analogy** (Blueprint Component 5, P76): proving a rectangle's diagonals are equal in length by identifying which triangles to compare, which congruence criterion applies, and what CPCTC-derived fact follows — directly transferring this concept's two-column strategy and CPCTC-chaining to a new shape.

## Demonstrations
- The full two-column proof that △ABC≅△CDA using the given parallel condition, alternate interior angles, and SAS (Blueprint A01, Example 1), targeting MC-1.
- Extending the same proof via CPCTC to derive BC=DA, a fact not given in the original problem (Blueprint A02, Example 2), targeting MC-2.
- Rewriting the same proof as a paragraph, and contrasting direct chaining against an indirect-proof sketch (Blueprint A03, Example 3), targeting MC-3.

## Discovery Questions
1. "Is the justification column in a two-column proof mostly a formality for statements that seem visually obvious?"
2. "Does a geometric proof's work end once you've established the main conclusion, like triangle congruence?"
3. "Is a paragraph-form geometric proof inherently less rigorous than the equivalent two-column proof?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (every line of a two-column proof needs a real justification) → A02 (proof chains facts to reach genuinely new conclusions) → A03 (paragraph proofs have the same rigor; indirect proof is a different valid strategy) → A04 (Mastery Gate, P91).

## Tutor Actions
- **DO: Worked Example** — the full two-column proof with every line justified by a specific theorem (Blueprint A01), targeting MC-1.
- **TEST-THINKING: Error Analysis** — extending the proof via CPCTC to a genuinely new fact (Blueprint A02), targeting MC-2.
- **ORGANIZE: Concept Map** — the same proof rewritten as a paragraph, contrasted against an indirect-proof sketch (Blueprint A03), targeting MC-3.
- **TELL: Explanation** — the general two-column structure as `math.found.proof`'s deductive standard made explicit for geometry.

## Voice Teaching Notes
Before accepting any proof line, ask "what specific theorem or given fact justifies that statement?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — no cross_links listed)**: reused verbatim from the Blueprint's Component 5 A04 — the rectangle-diagonal proof scenario identifying triangles and a congruence criterion, the CPCTC-derived diagonal-equality fact, and evaluating whether a paragraph rewrite would be less rigorous.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to name the specific theorem or given fact for every single line of a proof before moving to the next line, rejecting "it's obvious" as an acceptable justification, until the habit of explicit backing becomes automatic.

## Memory Hooks
- "Every proof line needs a real, checkable justification — never 'it looks true.'"
- "A proof's real payoff can come after the headline conclusion — chain it forward with CPCTC."
- "Paragraph and two-column proofs carry the exact same logical content — only the format differs."

## Transfer Connections
- `math.found.proof` (requires) supplies the general deductive-sequence structure this concept's two-column format makes explicit for geometry.
- `math.geom.congruent-triangles` (requires) supplies the SSS/SAS/ASA/AAS/HL criteria used as justifications.
- `math.geom.parallel-lines` (requires) supplies the angle relationships used as justifications and to establish congruence criteria's hypotheses.

## Cross-Subject Connections
- Computer science: formal verification and theorem-proving systems rely on the same explicit-justification, chain-of-established-facts structure this concept teaches.

## Blueprint References
`docs/curriculum/blueprints/math.geom.geometric-proof.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 8.

# Teaching Blueprint: Geometric Proof (`math.geom.geometric-proof`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.geometric-proof` |
| name | Geometric Proof |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.found.proof`, `math.geom.congruent-triangles`, `math.geom.parallel-lines` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — writing one specific two-column proof using an already-known congruence criterion before naming the general geometric-proof format |
| description (KG) | A rigorous deductive argument establishing a geometric truth from axioms, definitions, and previously proved theorems; typically presented in two-column or paragraph form. |

## Component 1 — Learning Objectives

- LO1: Write a TWO-COLUMN proof (statement | justification, `math.found.proof`'s own general deductive structure, applied specifically to geometry) that establishes a geometric truth using previously-proved facts — specifically `math.geom.congruent-triangles`'s own SSS/SAS/ASA/AAS/HL criteria and `math.geom.parallel-lines`'s own angle relationships — as the JUSTIFICATIONS for each step.
- LO2: Recognize that geometric proof CHAINS TOGETHER multiple already-established facts to reach a NEW conclusion — e.g. using `math.geom.parallel-lines`'s angle facts to establish the CONDITIONS a triangle-congruence criterion requires, then invoking that criterion to conclude congruence, then using the congruence to derive a FURTHER new fact — recognizing this multi-step chaining as the genuine work of proof, not merely restating one already-known theorem.
- LO3 (orientation level — full paragraph-proof and indirect-proof techniques deferred): recognize, without full derivation, that a PARAGRAPH proof conveys the IDENTICAL logical content as a two-column proof, merely in continuous prose rather than tabular form — and that geometric proofs sometimes use INDIRECT reasoning (assume the conclusion false, derive a contradiction), previewing this as an alternative proof STRATEGY, not a different logical standard.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.proof` (a finite sequence of logically valid steps establishing truth with certainty, from axioms/prior results), `math.geom.congruent-triangles` (SSS, SAS, ASA, AAS, HL criteria), and `math.geom.parallel-lines` (corresponding/alternate-interior/co-interior angle relationships from a transversal).

## Component 3 — Core Explanation

**A two-column proof is `math.found.proof`'s own deductive structure, applied to geometry**: `math.found.proof` already establishes that a valid proof is a sequence of logically justified steps. A TWO-COLUMN geometric proof makes this structure EXPLICIT: the LEFT column lists each STATEMENT (a geometric fact being asserted), and the RIGHT column gives its JUSTIFICATION (a given fact, a definition, or a previously-proved theorem — such as `math.geom.congruent-triangles`'s own SAS criterion, or `math.geom.parallel-lines`'s own alternate-interior-angles fact). Every single line must be justified by SOMETHING already established — no step is permitted "because it looks true."

**Genuine proof chains multiple established facts together to reach something new**: the actual WORK of geometric proof is not simply restating one theorem — it is CHAINING several already-proved facts in sequence: e.g., using `math.geom.parallel-lines`'s angle relationships to establish that two angles ARE equal (satisfying part of a congruence criterion's requirements), THEN invoking `math.geom.congruent-triangles`'s own SAS or ASA criterion (now that its hypotheses are established) to conclude two triangles ARE congruent, THEN using THAT congruence to derive some FURTHER new fact (e.g., that certain corresponding sides or angles, previously unknown to be equal, must now be equal too, since congruent triangles have ALL corresponding parts equal). This CHAIN of already-known facts, each step justified, reaching a genuinely NEW conclusion, is what makes it a proof rather than a restatement.

**Paragraph proofs carry identical logical content; indirect proof is an alternative strategy (orientation level)**: a PARAGRAPH proof expresses the EXACT SAME chain of justified steps as a two-column proof, just written as connected prose ("Since $\angle A\cong\angle D$ by the Alternate Interior Angles theorem, and $AB\cong DE$ is given, and $\angle B\cong\angle E$ by...") rather than a two-column table — the underlying LOGICAL rigor is identical, only the presentation format differs. Separately, some geometric proofs use INDIRECT reasoning (assume the desired conclusion is FALSE, and derive a logical contradiction from that assumption) — a genuinely different PROOF STRATEGY from the direct chaining above, but not a lower logical standard; it is simply a different valid route to the same certainty `math.found.proof` requires. Full development of paragraph and indirect proof techniques is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — a two-column proof using already-known criteria as justifications, breaking MC-1)**: PROVE: given $AB\parallel CD$ and $AB=CD$ in quadrilateral $ABCD$ (with diagonal $AC$ drawn), $\triangle ABC\cong\triangle CDA$.

| Statement | Justification |
|---|---|
| 1. $AB\parallel CD$ | Given |
| 2. $\angle BAC\cong\angle DCA$ | Alternate Interior Angles (`math.geom.parallel-lines`), transversal $AC$ |
| 3. $AB=CD$ | Given |
| 4. $AC=AC$ | Reflexive property |
| 5. $\triangle ABC\cong\triangle CDA$ | SAS (`math.geom.congruent-triangles`): steps 3, 2, 4 |

Every line is justified by EITHER a given fact, a general logical property (reflexivity), or a specific ALREADY-PROVED theorem from `math.geom.parallel-lines` or `math.geom.congruent-triangles` — nothing is asserted without such backing.

**Example 2 (LO2 — chaining facts to reach a genuinely new conclusion, breaking MC-2)**: CONTINUING Example 1's proof that $\triangle ABC\cong\triangle CDA$: since congruent triangles have ALL corresponding parts equal (CPCTC — corresponding parts of congruent triangles are congruent), this ADDITIONALLY establishes $BC=DA$ (a fact NOT given directly, but DERIVED from the congruence just proved) and $\angle BCA\cong\angle DAC$ (similarly derived). This is the genuine WORK of the proof: `math.geom.parallel-lines`'s angle fact enabled invoking `math.geom.congruent-triangles`'s SAS criterion, and THAT congruence in turn revealed brand-new equal-measurement facts ($BC=DA$) that were NOT part of the original given information — a multi-step chain reaching genuinely new territory, not a restatement of any single input fact.

**Example 3 (LO3, orientation level — the SAME proof in paragraph form, and an indirect-proof preview, breaking MC-3)**: rewriting Example 1's two-column proof as a PARAGRAPH: "Since $AB\parallel CD$, the Alternate Interior Angles theorem gives $\angle BAC\cong\angle DCA$ (using transversal $AC$). We are given $AB=CD$, and $AC=AC$ trivially by the reflexive property. Therefore, by SAS, $\triangle ABC\cong\triangle CDA$." This conveys the IDENTICAL logical chain as the two-column version — every justification is still present, just woven into sentences rather than tabulated. Contrast with an INDIRECT proof STRATEGY (not used here, but illustrating the alternative): to prove $AB\ne0$ in some other context, one might instead ASSUME $AB=0$ and derive a contradiction (e.g., that a triangle would then have zero area, contradicting a given non-degeneracy condition) — a different logical ROUTE, but not a lower standard of rigor than the direct chaining used above.

## Component 5 — Teaching Actions

### Teaching Action A01 — Every Line of a Two-Column Proof Needs a Real Justification (Primitive P11: Representation Shift)

State: "the two-column format isn't just a formatting requirement — it forces you to make EXPLICIT what `math.found.proof` already demands: every single statement must be backed by a given fact, a definition, or an already-proved theorem, with nothing asserted just because it looks true." Walk Example 1's line-by-line justification, each backed by a specific named theorem.

- **MC-1 hook**: ask "is the 'justification' column in a two-column proof mostly a formality, where any statement that seems visually obvious can be included without a specific backing theorem?" — a "yes" answer reveals MC-1 (missing that every line genuinely requires a specific, checkable justification from given facts, definitions, or prior theorems).

### Teaching Action A02 — Proof Chains Facts to Reach Genuinely New Conclusions (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the proof didn't stop at concluding congruence — it went FURTHER, deriving $BC=DA$, a fact not given anywhere in the original problem. State: "the real payoff of a geometric proof often comes AFTER you've established the headline conclusion (like congruence) — chaining that result forward (via CPCTC, here) to reveal genuinely new facts you didn't have access to before."

- **MC-2 hook**: ask "does a geometric proof's work end once you've established the main conclusion (like triangle congruence), with no further genuinely new facts derivable from it?" — a "yes" answer reveals MC-2 (missing that congruence, once established, can be chained forward — via CPCTC — to derive additional new facts).

### Teaching Action A03 — Paragraph Proofs Have the Same Rigor; Indirect Proof Is a Different Valid Strategy (Primitive P06: Contrast Pair)

Contrast Example 1's two-column table against Example 3's paragraph rewrite of the IDENTICAL logical content, and separately contrast direct chaining against the indirect-proof sketch. State: "changing the FORMAT (two-column to paragraph) doesn't change the rigor at all — and using a DIFFERENT strategy (indirect, assume-and-contradict) doesn't lower the standard either; both are equally valid routes to the same certainty."

- **MC-3 hook**: ask "is a paragraph-form geometric proof inherently less rigorous or less formally justified than the equivalent two-column proof?" — a "yes" answer reveals MC-3 (missing that paragraph and two-column proofs carry identical logical content, differing only in presentation format).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Write a two-column proof that, given $\angle A\cong\angle D$, $\angle B\cong\angle E$, and $AB=DE$, $\triangle ABC\cong\triangle DEF$ (identify which congruence criterion applies).
  2. Using CPCTC, state one additional fact that follows from the congruence established in problem 1, that was not part of the original given information.
  3. Rewrite your two-column proof from problem 1 as a paragraph proof, verifying every justification is still present.
  4. Explain, in one or two sentences, why using an indirect proof strategy (assume the conclusion false, derive a contradiction) is not a lower standard of rigor than a direct proof.
- **P76 (Transfer Probe, mode = independence)**: "A student is asked to prove that the diagonals of a rectangle are equal in length, given only that a rectangle has four right angles and opposite sides parallel and equal (its defining properties from `math.geom.quadrilateral`). (a) Sketch a two-column proof strategy: identify which triangles you would compare, which congruence criterion (SSS, SAS, ASA, AAS, or HL) you would invoke, and what given/derived facts would justify using it. (b) Explain what additional fact, beyond the congruence itself, CPCTC would let you conclude, and why this is exactly the diagonal-equality result being sought. (c) A classmate claims 'writing this as a paragraph instead of a two-column table would make the proof less rigorous, since it's less formally organized' — evaluate this claim, citing Example 3's direct format comparison."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | JUSTIFICATION-COLUMN-ASSUMED-FORMALITY | Believing the justification column is mostly a formality where visually obvious statements need no specific backing, missing that every line requires a genuine, checkable justification | Foundational |
| MC-2 | PROOF-ASSUMED-TO-END-AT-MAIN-CONCLUSION | Believing a proof's work ends once the headline conclusion (like congruence) is established, missing that CPCTC can chain it forward to derive further new facts | High |
| MC-3 | PARAGRAPH-PROOF-ASSUMED-LESS-RIGOROUS | Believing paragraph-form proofs are inherently less rigorous than two-column proofs, missing that they carry identical logical content in a different format | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Justification Column Assumed Formality") → P41 (detect: ask whether the justification column is mostly a formality for obvious statements) → P64 (conceptual shift: re-walk Example 1's specific line-by-line justifications, re-anchoring on "every line requires a genuine, checkable justification").
- **B02 (targets MC-2)**: P27 (name it: "Proof Assumed to End at Main Conclusion") → P41 (detect: ask whether a proof's work ends once the main conclusion is established) → P64 (conceptual shift: re-walk Example 2's CPCTC-derived new fact, re-anchoring on "chaining the result forward can reveal genuinely new facts").
- **B03 (targets MC-3)**: P27 (name it: "Paragraph Proof Assumed Less Rigorous") → P41 (detect: ask whether paragraph proofs are inherently less rigorous than two-column proofs) → P64 (conceptual shift: re-walk Example 3's identical-content paragraph rewrite, re-anchoring on "identical logical content, different presentation format").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.proof` (the general deductive-sequence structure this concept's two-column format makes explicit for geometry), `math.geom.congruent-triangles` (the SSS/SAS/ASA/AAS/HL criteria used as justifications), and `math.geom.parallel-lines` (the angle relationships used as justifications and to establish congruence criteria's hypotheses).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the complete two-column proof and its CPCTC-derived extension) and LO3 kept orientation-level, appropriately introducing paragraph and indirect proof as alternative presentations/strategies without developing indirect proof technique in full.
- **Division of labor**: `math.geom.congruent-triangles` owns the five congruence criteria themselves (already fully derived and contrasted there, including the SSA ambiguous case); `math.geom.parallel-lines` owns the angle relationships; `math.found.proof` owns the general deductive-sequence standard. This concept owns APPLYING all three together in the specific two-column/paragraph FORMAT, and the CPCTC-chaining technique for deriving new facts — deliberately reusing the SAME parallelogram-diagonal proof across Examples 1–3 so the two-column structure, its CPCTC extension, and its paragraph rewrite all connect to one continuously developed running proof.
- Example 2's deliberate choice to explicitly name CPCTC and derive a fact NOT given in the original problem statement was chosen to make MC-2's "proof ends at the main conclusion" misconception concretely falsifiable, showing genuine forward progress beyond the headline congruence result.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: writing one specific two-column proof precedes the general geometric-proof format) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

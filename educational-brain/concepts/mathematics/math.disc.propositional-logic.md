# math.disc.propositional-logic — Propositional Logic

## Identity
- **KG ID:** `math.disc.propositional-logic`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.found.proposition`, `math.found.logical-connectives`
- **Unlocks:** `math.disc.boolean-circuits`
- **Cross-links:** `math.found.truth-table` (authored)
- **Difficulty:** developing
- **Bloom level:** apply
- **Mastery threshold:** 0.9 (MAMR 5/5)
- **Estimated hours:** 4

## Learning Objective
By the end of this concept, the student can: (1) construct the DISJUNCTIVE NORMAL FORM (DNF) of a compound proposition directly from its truth table — for every row where the formula is TRUE, form a conjunction of the (possibly negated) variables matching that row, then OR all such conjunctions together; (2) construct the CONJUNCTIVE NORMAL FORM (CNF) similarly from the FALSE rows, recognizing DNF and CNF as DUAL constructions reading different rows of the same table; (3) at orientation level, recognize the SAT (satisfiability) problem and the fundamental easy-to-verify/hard-to-decide gap that makes it NP-complete, without deriving why.

## Core Understanding
DNF is built MECHANICALLY from the TRUE rows of a proposition's truth table (`math.found.truth-table`'s already-mastered row-by-row method): for each row where the formula evaluates TRUE, form a conjunction of literals — each variable, NEGATED if it was FALSE in that row — matching that row exactly; OR all such conjunctions together. The result is guaranteed logically EQUIVALENT to the original formula by construction, since it is true in exactly the same rows.

CNF is the DUAL construction, built from the OPPOSITE (FALSE) rows: for each row where the formula evaluates FALSE, form a disjunction of literals — each variable, negated if it was TRUE in that row, the OPPOSITE negation convention from DNF — that is false exactly at that row; AND all such disjunctions together. DNF is an OR-of-ANDs built from TRUE rows; CNF is an AND-of-ORs built from FALSE rows — two genuinely different-looking but logically equivalent normal forms, both mechanically derivable from the SAME single truth table.

The SAT (satisfiability) problem asks, for an arbitrary formula, whether ANY satisfying assignment exists at all — a fundamentally different and harder question than checking whether one SPECIFIC candidate assignment satisfies the formula (which is a single, trivial evaluation). For formulas with many variables, checking all $2^n$ rows to determine satisfiability becomes computationally intractable, and SAT is NP-complete: no known efficient general algorithm exists. This easy-to-verify/hard-to-decide gap directly parallels the same complexity pattern established elsewhere for Hamiltonian cycles (Euler's simple degree test for Euler circuits is easy, but determining whether a Hamiltonian cycle exists is NP-complete) — reinforcing this as a general phenomenon in computational complexity, not a coincidence specific to one problem type.

## Mental Models
1. **Rung 1 — DNF is read directly off the true rows; CNF off the false rows.** Both are mechanical, guaranteed-correct-by-construction procedures applied to the same underlying truth table, not independently derived or arbitrary rewritings.
2. **Rung 2 — DNF and CNF are mirror-image constructions with OPPOSITE negation conventions.** DNF negates a variable that was FALSE in a true row; CNF negates a variable that was TRUE in a false row — genuinely flipped, not identical procedures applied to different rows.
3. **Rung 3 — checking ONE assignment is easy; finding whether ANY exists is a fundamentally different, harder question.** The SAT problem's difficulty lies entirely in the SEARCH, not in the verification of a given candidate.
4. **Rung 4 — the easy-verify/hard-decide gap is a general pattern, not unique to SAT.** The same structural gap appears in other NP-complete problems (e.g. Hamiltonian cycles), suggesting a shared underlying computational phenomenon.

## Why Students Fail
Both DNF and CNF are mechanical procedures, but their surface similarity (both are "build a formula from truth-table rows") invites conflating the two — specifically, defaulting to DNF's true-row/negate-if-false convention when CNF is actually required, or vice versa. Separately, without explicit grounding in the truth table, DNF and CNF can feel like arbitrary algebraic rewritings rather than guaranteed-equivalent-by-construction forms, obscuring WHY they always work. Finally, the intuitive (but false) inference "checking is easy, so finding must also be easy" is a natural but incorrect generalization from problems where verification and search genuinely are comparably difficult — SAT's NP-completeness is the canonical counterexample to that intuition.

## Misconceptions

### MC-1: DNF-TREATED-AS-ARBITRARY-REWRITE
- **Birth type:** Type 5 (instruction-induced) — foundational
- **Description:** Believing DNF is one arbitrary rewriting among many with no guaranteed connection to the truth table, missing that it is mechanically derived from the TRUE rows, always equivalent by construction.
- **Why this birth type:** Instruction-induced: DNF is often introduced via its symbolic FORM (an OR-of-ANDs expression) before the row-by-row CONSTRUCTION METHOD that guarantees its correctness is emphasized — so a student may learn to recognize DNF's shape without understanding that it is a deterministic, always-correct-by-construction output of a specific procedure applied to the truth table.
- **Detection probe:** "Is a formula's DNF just one arbitrary way among many to rewrite it, with no guaranteed connection to its truth table?" A student with MC-1 answers "yes."
- **Repair:** Walk the full row-by-row DNF construction (Demonstration 1) explicitly, confirming at the end that the constructed DNF, when re-evaluated, produces the SAME truth table as the original formula — making the guaranteed-equivalence concrete rather than asserted.
- **Verification of death:** Given a novel formula's truth table, the student constructs its DNF directly from the true rows without hesitation, and can explain why the result is guaranteed equivalent.

### MC-2: CNF-BUILT-LIKE-DNF
- **Birth type:** Type 1 (overgeneralization) — high
- **Description:** Believing CNF is built the same way as DNF (from true rows, same negation convention), missing that CNF is built from the FALSE rows with the OPPOSITE literal-negation convention.
- **Why this birth type:** An overgeneralization from DNF's just-learned procedure — since CNF is introduced immediately after DNF and shares a similar surface description ("build a formula from the truth table"), the specific procedural details (which rows, which negation direction) are easy to copy over unmodified rather than independently re-derived.
- **Detection probe:** "Is CNF built the same way as DNF — from the true rows, with the same negation convention?" A student with MC-2 answers "yes."
- **Repair:** Contrast Demonstration 1's DNF (built from TRUE rows) directly against Demonstration 2's CNF (built from FALSE rows, opposite negation convention) for the SAME formula, side by side, making the divergence in procedure concrete rather than asserted.
- **Verification of death:** Given a novel formula's truth table, the student correctly constructs BOTH the DNF (from true rows) and CNF (from false rows, opposite convention) without conflating the two procedures.

### MC-3: EASY-VERIFICATION-ASSUMED-TO-IMPLY-EASY-DECISION
- **Birth type:** Type 1 (overgeneralization) — moderate
- **Description:** Believing that because checking one assignment is easy, determining satisfiability in general must also be easy, missing the fundamental easy-to-verify/hard-to-decide gap underlying SAT's NP-completeness.
- **Why this birth type:** An overgeneralization from most prior mathematical experience, where a problem that is easy to CHECK is also typically easy to SOLVE — a pattern that holds for many familiar problem types but breaks down specifically for NP-complete problems like SAT, where the gap between verification and search is the entire point.
- **Detection probe:** "Since checking whether one specific assignment satisfies a formula is fast and easy, must determining whether ANY satisfying assignment exists also be easy?" A student with MC-3 answers "yes."
- **Repair:** Contrast the two questions explicitly: evaluating a formula at ONE given assignment is a single computation; determining satisfiability in general requires (in the worst case) checking exponentially many of the $2^n$ possible assignments, with no known efficient shortcut. State plainly: "easy to CHECK a proposed answer and easy to FIND one at all are two completely different questions."
- **Verification of death:** The student, when asked whether SAT is easy or hard in general, correctly distinguishes the easy verification step from the hard decision problem, without conflating the two.

## Analogies
1. **The mirror-construction analogy.** DNF and CNF are like two photographs of the same scene taken from opposite angles — both show the identical underlying truth table, but the "shot" (which rows, which negation convention) is deliberately reversed.
2. **The lock-and-combination analogy.** Checking whether a specific combination opens a lock is instant; finding SOME combination that opens it, with no combination handed to you, could require trying an astronomical number of possibilities — the SAT problem's easy-verify/hard-decide gap in miniature.

## Demonstrations
### Demonstration 1 — DNF construction from the true rows, breaking MC-1 (mirrors Blueprint Ex1)
For $F=(P\wedge Q)\vee(\neg P\wedge R)$, the truth table over $P,Q,R$ (8 rows) has $F$ TRUE at $(T,T,T)$, $(T,T,F)$, $(F,T,T)$, $(F,F,T)$. The DNF is $(P\wedge Q\wedge R)\vee(P\wedge Q\wedge\neg R)\vee(\neg P\wedge Q\wedge R)\vee(\neg P\wedge\neg Q\wedge R)$.

### Demonstration 2 — CNF construction from the false rows, breaking MC-2 (mirrors Blueprint Ex2)
For the same $F$, the FALSE rows are $(T,F,T)$, $(T,F,F)$, $(F,T,F)$, $(F,F,F)$. Each false row contributes a clause false exactly there (e.g. row $(T,F,T)$ gives $(\neg P\vee Q\vee\neg R)$). The CNF is $(\neg P\vee Q\vee\neg R)\wedge(\neg P\vee Q\vee R)\wedge(P\vee\neg Q\vee R)\wedge(P\vee Q\vee R)$.

### Demonstration 3 — SAT's easy-to-verify/hard-to-decide gap, breaking MC-3 (mirrors Blueprint Ex3)
For the same $F$, checking whether $P=T,Q=T,R=F$ satisfies it is a single trivial evaluation (row $(T,T,F)$: $F=T$, yes). But determining whether ANY satisfying assignment exists for an arbitrary large formula requires, in the worst case, checking all $2^n$ rows — computationally infeasible for large $n$, and no known efficient general algorithm exists (SAT is NP-complete).

## Discovery Questions
1. "You already know how to build a truth table for a formula. If you wanted a NEW formula, built purely from the TRUE rows, that is guaranteed to be logically equivalent to the original, what mechanical procedure could you use?"
2. "You just built DNF from the true rows. Would the SAME procedure, applied to the FALSE rows instead, still give something logically equivalent to the original formula? What would need to change?"
3. "If checking one specific answer to a puzzle takes one second, does that tell you how long it would take to FIND an answer if none were given to you?"

## Teaching Sequence
Best taught by **guided discovery for the DNF/CNF mechanical construction, direct instruction (orientation level) for the SAT complexity framing** — Discovery Questions 1 and 2 let the student derive the DNF procedure themselves and then predict what CNF's dual procedure should look like before being told, building much sturdier procedural understanding; the SAT complexity content is a stated fact (NP-completeness) appropriately surveyed rather than proven at this level.
1. Build the full truth table for a small formula together, reviewing `math.found.truth-table`'s row-by-row method.
2. Pose Discovery Question 1 and let the student attempt the DNF construction before confirming (Demonstration 1).
3. Pose Discovery Question 2 and let the student predict CNF's procedure before confirming the false-rows/opposite-convention construction (Demonstration 2).
4. Pose Discovery Question 3, then present the SAT framing directly at orientation level (Demonstration 3), naming NP-completeness without deriving it.
5. Assess with the P77 problem set and cross-link transfer probe (engaging `math.found.truth-table`).

## Tutor Actions
1. **On a DNF-construction request:** require the student to first identify the TRUE rows of the truth table before writing any conjunctions.
2. **On a CNF-construction request:** explicitly ask "which rows, and which negation convention?" before allowing the student to proceed, to surface any DNF/CNF conflation early.
3. **On a SAT-complexity question:** keep strictly at orientation level — name the easy-verify/hard-decide gap and NP-completeness, without attempting to prove or fully explain complexity-class theory.
4. **On the Hamiltonian-cycle parallel:** name it explicitly if the student has already encountered that concept, reinforcing the easy-verify/hard-decide pattern as general rather than SAT-specific.

## Voice Teaching Notes
1. **Register:** procedural and mechanically confident for DNF/CNF ("this is a guaranteed recipe, not a creative rewriting"), shifting to more exploratory and survey-oriented tone for the SAT/complexity content.
2. **Load-bearing sentence, spoken slowly:** "DNF reads the true rows; CNF reads the false rows, with the negation flipped."
3. **Wait time:** pause after posing Discovery Question 2 (predicting CNF's procedure), giving the student real space to attempt the dual construction before confirmation.

## Assessment Signals
1. **Gate concept:** correctly constructs the DNF of a novel formula directly from its truth table's true rows.
2. **Dual-construction fluency:** correctly constructs the CNF of the same formula from the false rows, with the correctly-flipped negation convention.
3. **Equivalence confidence:** confirms, by re-evaluation, that a constructed DNF or CNF produces the identical truth table as the original formula.
4. **SAT discrimination:** correctly distinguishes "checking one assignment" (easy) from "determining satisfiability in general" (hard) when asked.
5. **Transfer:** applies both DNF and CNF construction, plus the SAT framing, in a novel applied context (e.g. a digital circuit design scenario).

## Tutor Recovery Strategy
If the student conflates DNF and CNF procedures, work the two constructions for the SAME formula side by side (as in Demonstrations 1 and 2) repeatedly until the true-rows/false-rows and negation-convention distinctions become automatic rather than a source of confusion. If the student assumes easy verification implies easy decision, walk through the exponential-blowup argument concretely (counting how many of the $2^n$ rows would need checking for increasing $n$) to make the intractability visible rather than asserted.

## Memory Hooks
1. "DNF: true rows, OR of ANDs. CNF: false rows, AND of ORs — mirror images."
2. "Checking one answer is fast; finding whether ANY answer exists can be genuinely hard."
3. "Both DNF and CNF come from the SAME truth table — just read different rows."

## Transfer Connections
- **`math.found.truth-table`:** the row-by-row construction method this concept's entire DNF/CNF machinery directly reuses.
- **`math.found.proposition`, `math.found.logical-connectives`:** the statement/connective foundations this concept's compound propositions are built from.
- **`math.disc.boolean-circuits`:** the direct further application building digital circuits from the normal forms constructed here.

## Cross-Subject Connections
- **Computer Science (digital circuit design):** DNF directly corresponds to a sum-of-products circuit implementation using AND/OR/NOT gates, a foundational hardware design technique.
- **Computer Science (algorithm complexity theory):** SAT's NP-completeness is a foundational result in computational complexity, with implications across cryptography, optimization, and automated reasoning.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.propositional-logic.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, cross-link transfer probe engaging `math.found.truth-table`). Not restated verbatim; this entry adds birth-type classification, mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.
- Secondary reference: `math.found.truth-table` (already authored) — this entry's genuine cross-link target; its row-by-row construction method is the mechanical basis both DNF and CNF build on here.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- Genuine, already-authored cross-link confirmed and substantively incorporated: `math.found.truth-table`'s row-by-row method is this entry's mechanical foundation throughout, not merely flagged — the same class of substantive cross-link incorporation established for `math.disc.binomial-theorem` in Batch 19.
- The Blueprint's own reference to `math.disc.euler-hamiltonian` as "already authored," establishing the SAT/Hamiltonian-cycle complexity parallel, was NOT independently verified against the live EB directory this batch (that concept is outside `math.disc`'s currently-authored set) — the parallel is presented here as a stated fact from the Blueprint without claiming to have confirmed `math.disc.euler-hamiltonian`'s own EB entry exists; flagged honestly rather than silently assumed.
- This entry closes the propositional-logic subtree deliberately deferred from Batch 19, alongside `math.disc.graph`'s graph-theory subtree opened in this same batch. Its unlocked child `math.disc.boolean-circuits` is not yet authored.

## Version History
- **Batch 20** (2026-09-11): initial authoring, part 3 of 3 this batch (with `math.disc.derangements` and `math.disc.graph`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 5 foundational, MC-2 Type 1 high, MC-3 Type 1 moderate).

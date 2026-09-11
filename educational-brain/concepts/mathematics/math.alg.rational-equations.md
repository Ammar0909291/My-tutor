# math.alg.rational-equations

## Identity
- **KG ID**: `math.alg.rational-equations`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.rational-expressions` — per the live KG (verified directly this batch); load-bearing
    part: solving a rational equation requires finding the LCD of every denominator present, the
    exact skill that concept establishes; without it already secure, the clearing-denominators step
    has no foundation. **Note**: this concept's own Blueprint states its prerequisite as
    `math.alg.rational-expressions-addition` instead — see Curriculum Feedback below for this
    genuine KG/Blueprint discrepancy, resolved toward the KG per standing rule. Both concepts were
    authored in the same wave, so the practical distinction is moot for this batch, but the
    discrepancy itself is recorded honestly.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.alg.rational-equations.md` (reused by reference
  throughout)

## Learning Objective
- The learner can solve a rational equation by identifying the LCD of ALL denominators present and
  multiplying BOTH sides of the equation, term by term, by that LCD — correctly clearing every
  denominator into a single polynomial equation.
- The learner can solve the resulting polynomial equation using already-fluent prior techniques
  (linear solving, factoring a quadratic, etc.), treating the denominator-clearing step as a
  transformation into familiar territory rather than a new kind of equation-solving.
- The learner can check EVERY candidate solution against the ORIGINAL equation's excluded values
  (denominators that would be zero) and correctly discard any EXTRANEOUS solution — a value that
  satisfies the cleared polynomial equation but is undefined in the original equation — while
  correctly retaining any candidate that genuinely passes the check, even when other candidates in
  the same problem fail it.

## Core Understanding
A rational equation is any equation containing one or more rational expressions, and it is solved
in four stages: first, identify the LCD of ALL denominators present anywhere in the equation;
second, multiply BOTH sides of the equation by that LCD, clearing every denominator and reducing
the equation to an ordinary polynomial equation; third, solve that polynomial equation using
whatever standard technique applies (linear solving, factoring, etc.); fourth — and this is the
step with no counterpart in ordinary polynomial-equation solving — check EVERY candidate solution
against the ORIGINAL equation's excluded values (any value that would make an original denominator
zero), discarding as EXTRANEOUS any candidate that happens to equal an excluded value. Extraneous
solutions arise from a genuine, specific reason: multiplying both sides of an equation by the LCD
is only a valid, information-preserving, reversible step when the LCD is NONZERO; at exactly the
values where the LCD would be zero, this step's logic silently breaks down, and the cleared
polynomial equation can end up satisfied by a value that never actually worked in the original,
uncleared equation — the check is not a formality but the only thing standing between a plausible-
looking wrong answer and a genuinely verified one.

## Mental Models
1. **Beginner — clear the fractions by multiplying through by the LCD, then solve like a normal
   equation.** Directly extends the already-fluent LCD-finding technique to an equation-solving
   context. *Upgrade trigger*: a solved equation whose candidate answer, substituted back into the
   ORIGINAL equation, produces an undefined expression — revealing that clearing denominators isn't
   always a perfectly safe, reversible operation. *Shelf life*: one session.
2. **Intermediate — every candidate solution must be checked against the ORIGINAL equation's
   excluded values before being accepted, because clearing denominators can silently manufacture
   solutions that don't actually work.** *Upgrade trigger*: a problem with MULTIPLE candidate
   solutions where only SOME are extraneous — testing whether the "check everything" discipline
   survives the temptation to discard everything once one candidate fails. *Shelf life*: durable
   once the check becomes a non-negotiable final step on every problem, not merely ones that "look
   suspicious."
3. **Advanced — an extraneous solution is not a computational mistake in the solving process, but a
   structural consequence of multiplying by an expression that COULD be zero.** The algebra
   performed to reach the candidate was entirely correct; the candidate is still invalid, because
   the transformation step itself (multiplying by the LCD) is only reversible where the LCD is
   nonzero. *Upgrade trigger*: a request to explain WHY extraneous solutions arise, rather than
   simply detect and discard them.
4. **Expert — rational-equation solving is a direct, real-world-relevant instance of a general
   principle: any algebraic transformation that is not reversible everywhere in its domain can
   introduce solutions that must be checked against the ORIGINAL problem, not merely against the
   transformed one.** (The same caution applies, for instance, to squaring both sides of an
   equation involving radicals.) *Shelf life*: permanent, and it generalises well beyond this
   specific concept.

## Why Students Fail
The single most frequent and consequential failure, ranked foundational and named by the Blueprint
as the single most common error in rational-equation solving, is accepting a candidate solution
found by clearing denominators WITHOUT checking it against the original equation's excluded
values — for x/(x−3) = 3/(x−3) + 2, correctly clearing to x = 3 + 2(x−3), correctly solving to
x = 3, but failing to notice that x = 3 makes the ORIGINAL equation's denominator (x−3) equal to
zero, meaning the original equation was UNDEFINED at that exact value; this failure is especially
dangerous because every algebraic step performed to REACH x = 3 was entirely correct — the error is
purely one of omission, skipping the final check — and the resulting wrong answer looks completely
legitimate through every visible step except the missing one. The second failure occurs earlier in
the procedure: multiplying only ONE side of the equation by the LCD, or only SOME of the terms on
both sides, rather than every single term on both sides — since clearing denominators is only valid
if applied uniformly and completely, a partial application produces an equation that is no longer
equivalent to the original in any useful sense. The third failure is a specific misapplication of
the checking discipline itself, occurring only in equations with multiple candidate solutions:
when SOME candidates are extraneous and others are genuinely valid, incorrectly discarding ALL
candidates rather than checking each one independently and keeping whichever ones pass — this
failure inverts the intended caution of the checking step, over-applying it to punish valid
solutions merely because they appeared alongside an invalid one.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — EXTRANEOUS-SOLUTION-NOT-CHECKED-AND-DISCARDED** (FOUNDATIONAL)
  - **Birth type**: Type 5, instruction-induced — the multi-stage clearing-and-solving procedure is
    itself entirely correct algebra, and unless the final checking step is explicitly presented as
    an equally mandatory FIFTH stage (not an optional verification), it is easy to treat "solved
    the cleared equation" as equivalent to "found the solution."
  - **Characteristic phrase**: for x/(x−3) = 3/(x−3) + 2, accepting x = 3 as the final answer
    without checking it against the original denominator, missing that x = 3 makes the original
    equation undefined.
  - **Detection probe** (verbatim, Blueprint): present Example 2 and check whether x=3 is accepted
    without verification against the original denominator — acceptance confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-substitute the candidate directly into the
    ORIGINAL (uncleared) equation, showing concretely that it produces an undefined expression
    rather than a valid statement.
  - **Verification of death**: given several rational equations, the learner checks every candidate
    solution against the original denominators unprompted, before reporting any final answer.

- **MC-2 — LCD-MULTIPLICATION-APPLIED-TO-ONLY-PART-OF-THE-EQUATION** (foundational)
  - **Birth type**: Type 1, overgeneralisation — the general "multiply both sides by something" rule
    for solving equations is applied loosely, without the specific requirement (EVERY term, on BOTH
    sides, gets multiplied by the LCD, none skipped) being enforced as strictly as the procedure
    demands.
  - **Characteristic phrase**: multiplying only the left side, or only some terms, by the LCD while
    leaving other terms unmultiplied, breaking the equation's equivalence.
  - **Detection probe**: review a submitted LCD-clearing step for a term that wasn't multiplied
    through — an unmultiplied term confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-derive the clearing step explicitly, multiplying
    EVERY term on both sides by the LCD one at a time, visibly, rather than performing the
    multiplication mentally in one step.
  - **Verification of death**: given a multi-term rational equation, the learner correctly
    multiplies every single term on both sides by the LCD, with no term omitted, every time.

- **MC-3 — ALL-CANDIDATES-DISCARDED-WHEN-ONE-IS-EXTRANEOUS** (moderate)
  - **Birth type**: Type 1, overgeneralisation — the caution instilled by MC-1's repair ("check and
    be ready to discard") is over-applied once a genuinely extraneous candidate is found in a
    multi-solution problem, treating the discovery of ONE bad candidate as grounds to distrust and
    discard ALL candidates rather than checking each independently.
  - **Characteristic phrase**: in a problem with two candidate solutions where only one is
    extraneous, discarding both instead of retaining the genuinely valid one.
  - **Detection probe**: present a multi-solution scenario with a mix of valid and extraneous
    candidates and check whether valid ones are incorrectly discarded too — over-discarding
    confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-check EACH candidate independently against the
    excluded values, keeping any that pass regardless of any other candidate's status; the checking
    step is per-candidate, never a blanket judgment on the whole solution set.
  - **Verification of death**: given a multi-candidate problem with a genuine mix of valid and
    extraneous solutions, the learner correctly retains the valid ones and discards only the
    genuinely extraneous ones.

## Analogies
- **A background check that clears some applicants and disqualifies others independently.** Each
  candidate solution undergoes its own independent check against the original equation's
  exclusions, exactly as each job applicant undergoes their own background check — one applicant
  failing their check has no bearing on whether a DIFFERENT applicant passes theirs. *Where it
  holds*: the per-candidate independence of the check, directly targeting MC-3. *Where it breaks*:
  a background check is a binary pass/fail on external criteria; the mathematical check has a
  precise, derivable reason (does this value make an original denominator zero) that the analogy
  doesn't convey — it must be paired with the direct substitution demonstration.
- **A contract that becomes void, not merely inconvenient, at specific forbidden dates.** An
  extraneous solution is like signing a contract for a date that, upon checking the fine print, was
  explicitly forbidden from the start — the signed contract (the cleared equation's candidate
  solution) LOOKS valid on its own, but checking it against the original terms (the original
  denominators) reveals it was never actually permissible. *Where it holds*: the "looks valid in
  isolation, invalid against the original terms" structure, directly targeting MC-1. *Where it
  breaks*: a forbidden contract date is externally imposed; an excluded value here is a direct,
  computable consequence of the original equation's own denominators — the analogy illustrates the
  surprise of the invalidation, not its mathematical derivation.

## Demonstrations
1. **A rational equation with no solution at all, establishing the clearing procedure.** Solve
   x/(x+2) = 3/(x+2) + 1. LCD = x+2. Multiply through: x = 3+(x+2) → x = x+5 → 0 = 5 — a FALSE
   statement, meaning NO solution exists for this equation (a genuinely inconsistent equation, the
   same false-statement logic already established in `math.alg.substitution-method`).
2. **An extraneous solution, directly confronting MC-1.** Solve x/(x−3) = 3/(x−3) + 2. LCD = x−3.
   Multiply through: x = 3+2(x−3) → x = 3+2x−6 → x = 2x−3 → −x = −3 → x = 3. Check against the
   ORIGINAL denominator: x=3 makes x−3=0 — UNDEFINED. So x=3 is EXTRANEOUS and must be discarded;
   this equation, despite the algebra producing a clean candidate, has NO valid solution.
3. **A genuine solution surviving the check, contrasted directly against Demonstration 2.** Solve
   2/x + 1/(x+1) = 5/[x(x+1)]. LCD = x(x+1). Multiply through: 2(x+1)+x=5 → 2x+2+x=5 → 3x=3 → x=1.
   Check against original denominators: x=1 does NOT make x=0 or x+1=0 — a VALID, non-excluded
   value, so x=1 IS the genuine solution. Verify directly by substitution: 2/1+1/2=2.5 and
   5/(1×2)=2.5 ✓.

## Discovery Questions
- "You cleared the denominators and solved to get x=3. Before you report that as your final
  answer, substitute x=3 back into the ORIGINAL equation — what happens?" — surfaces MC-1 through
  direct self-checking substitution rather than a stated rule.
- "You multiplied the left side of the equation by the LCD. Did you also multiply EVERY term on the
  right side by the exact same thing?" — surfaces MC-2 by making the "every term, both sides"
  requirement explicit and checkable.
- "This equation had two candidate solutions, and one of them turned out to be extraneous. Does
  that automatically mean the OTHER candidate is also invalid? How would you check?" — surfaces
  MC-3 by requiring the learner to justify treating each candidate independently.

## Teaching Sequence
1. **Anchor**: connect explicitly to the already-secure LCD-finding technique from
   `math.alg.rational-expressions` (and, per the Blueprint's own framing,
   `math.alg.rational-expressions-addition` specifically) — this concept applies that exact
   technique to CLEAR denominators from an equation, rather than to combine expressions.
2. **Establish the four-stage procedure explicitly**, with the checking stage introduced as
   equally mandatory from the very first example, not as an optional afterthought.
3. **Work a no-solution case first** (Demonstration 1), connecting to the already-familiar
   false-statement-means-no-solution logic from systems of equations.
4. **Contrast an extraneous-solution case directly against a genuine-solution case**
   (Demonstrations 2 and 3, side by side), showing the SAME clearing-and-solving process can
   produce either outcome, distinguishable only by the final check — directly pre-empting MC-1.
5. **Install the every-term-both-sides discipline explicitly**, with the clearing step performed
   term-by-term and visibly rather than mentally, directly pre-empting MC-2.
6. **Practice a multi-candidate problem with a genuine mix of valid and extraneous solutions**,
   explicitly requiring each candidate to be checked and reported on independently, directly
   pre-empting MC-3.
7. **Practice mixed problems** deliberately combining no-solution, extraneous-solution, and
   genuine-solution cases, always requiring the full check against original denominators before
   any final answer is accepted.

## Tutor Actions
- Before accepting any final answer to a rational equation, ask "have you substituted your
  candidate back into the ORIGINAL equation to check it's actually defined there?" — this single
  question directly defends against MC-1, the single most consequential failure in this concept.
- After any LCD-clearing step, ask "did every single term, on both sides, get multiplied by the
  LCD? Can you show me each one?" — targeting MC-2 directly.
- In any multi-candidate problem, ask "you found this candidate is extraneous — does that tell you
  anything about whether the OTHER candidate is also extraneous?" — targeting MC-3 directly, by
  requiring the learner to articulate the independence of each check.
- Never accept a "no solution" or a specific numeric answer to a rational equation without the
  original-denominator check shown explicitly, even when the algebra leading up to it is otherwise
  flawless.

## Voice Teaching Notes
- When stating the final check aloud, use consistent, non-negotiable phrasing every time: "now,
  the check — does this value work in the ORIGINAL equation?" — spoken identically across every
  example so the check is heard as a fixed, mandatory ritual, directly targeting MC-1.
- When performing the LCD-clearing step aloud, narrate each term individually: "left side, this
  term, times the LCD... now this term... now the right side, this term..." — audibly enumerating
  every term reinforces the completeness requirement, targeting MC-2.
- When handling a multi-candidate problem aloud, explicitly restart the check for each candidate:
  "first candidate — check it. Second candidate — check IT, separately" — the audible restart
  models the independence of each check, targeting MC-3.

## Assessment Signals
- **Correct + fast + checks every candidate against the original denominators unprompted** →
  MASTERED.
- **Correct algebra reaching a candidate, candidate not checked against original exclusions or
  accepted despite being excluded** → MC-1 active; needs the substitute-into-original repair —
  this is the highest-priority repair given the misconception's foundational ranking.
- **LCD-clearing step incomplete (a term left unmultiplied)** → MC-2 active; needs the
  term-by-term visible-clearing repair.
- **A multi-candidate problem with a mix of valid/extraneous candidates has ALL candidates
  discarded** → MC-3 active; needs the per-candidate-independence repair.
- **Cannot find the LCD of the equation's denominators at all** → prerequisite gap in
  `math.alg.rational-expressions`(-addition), not specific to this concept's equation-solving
  content; route back to that concept.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and expresses frustration that "all the algebra was
right, so why is the answer wrong," validate the observation directly — the algebra WAS entirely
correct, and that is precisely the point: the error is not a computational mistake but a missing
final step, and reframing it this way (the algebra earned a candidate, the check determines
whether the candidate is real) helps the learner see the check as a genuinely necessary stage
rather than busywork after already-correct work. If MC-3 (over-discarding) appears after MC-1 has
just been corrected, this is a predictable overcorrection — explicitly reassure the learner that
being newly cautious about extraneous solutions is the right instinct, but that caution must be
applied PER CANDIDATE, not as a blanket rule discarding an entire multi-solution answer set.

## Memory Hooks
- "Solve the cleared equation, then check the original — always" — the two-stage discipline,
  directly targeting MC-1.
- "Every term, both sides, no exceptions" — the LCD-clearing completeness rule, directly targeting
  MC-2.
- "Check each candidate on its own" — the per-candidate independence rule, directly targeting MC-3.

## Transfer Connections
- **`math.alg.rational-expressions`** and **`math.alg.rational-expressions-addition`**
  (prerequisites, reused): the LCD-finding technique this concept applies to CLEAR denominators
  from an equation is the identical technique those concepts use to COMBINE expressions — same
  tool, different purpose.
- **`math.alg.substitution-method`** (indirect, technique reused): the "false statement means no
  solution" logic surfacing in Demonstration 1 is the identical reasoning already established for
  inconsistent systems of linear equations.
- Broader transfer (stated in the Advanced mental model): the extraneous-solution caution
  generalises to any non-reversible algebraic transformation, most notably squaring both sides of
  an equation involving radicals — a connection worth surfacing explicitly when that concept is
  eventually reached.

## Cross-Subject Connections
- **Chemistry** (`chem.` reaction-rate modelling): the Blueprint's own transfer probe uses a
  reaction-rate relationship where the algebraically-derived candidate solution turns out to be
  extraneous — directly modelling a case where "no valid solution exists" is itself the
  chemically/practically meaningful conclusion, not a dead end.
- **Physics** (`phys.` optics, circuits): solving for an unknown resistance or focal length in an
  equation involving reciprocal terms is a direct application of this concept's clearing-and-
  checking procedure, where an extraneous solution corresponds to a physically nonsensical
  component value (e.g. a resistance of exactly zero).

## Blueprint References
- `docs/curriculum/blueprints/math.alg.rational-equations.md` — Component 0 (metadata: difficulty
  proficient, bloom apply, mastery_threshold 0.80, estimated_hours 6, requires
  [math.alg.rational-expressions-addition per the Blueprint's own text — see Curriculum Feedback]);
  Component 6 (Misconception Registry MC-1..MC-3, reused above with birth-type classification
  added); Component 4 (worked examples for x/(x+2)=3/(x+2)+1, x/(x−3)=3/(x−3)+2,
  2/x+1/(x+1)=5/[x(x+1)], reused directly in the Demonstrations above); the P76 transfer probe (a
  reaction-rate chemistry scenario deliberately designed to produce an extraneous-only result,
  independence mode) — held in the Blueprint's own mastery-gate item bank, not restated here per
  the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Genuine KG/Blueprint metadata discrepancy found and resolved toward the KG (authoritative), per
  standing rule**: this concept's own Blueprint (Component 0, `requires`) states its prerequisite
  as `math.alg.rational-expressions-addition`, but the live KG (verified directly this batch) lists
  this concept's `requires` as `math.alg.rational-expressions` — the parent concept, not the
  addition-specific child. This is the identical discrepancy recorded from the other side in
  `math.alg.rational-expressions-addition`'s own Curriculum Feedback section this batch. Not fixed
  (no KG or Blueprint file modified); the topological-readiness computation this batch used the
  KG's own edge, which is why this concept was correctly identified as ready in the same wave as
  `math.alg.rational-expressions-addition` rather than gated behind it.

## Version History
- 2026-09-11 — Initial authoring (Batch 7 / math.alg Wave 9 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.

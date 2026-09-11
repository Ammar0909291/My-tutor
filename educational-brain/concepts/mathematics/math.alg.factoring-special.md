# math.alg.factoring-special

## Identity
- **KG ID**: `math.alg.factoring-special`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.factoring` — load-bearing part: these three patterns (difference of squares,
    sum/difference of cubes, perfect square trinomial) are memorised shortcuts for shapes that the
    general factoring decision tree could, in principle, reach by other means (e.g. the ac-method
    for the perfect-square-trinomial case); without the general strategy already secure, these
    patterns risk being learned as three disconnected magic formulas rather than as fast paths
    through an already-understood procedure.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (MAMR = ⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.alg.factoring-special.md` (reused by reference
  throughout)

## Learning Objective
- The learner can factor a difference of squares a²−b² = (a+b)(a−b) on sight, and can correctly
  state that a SUM of squares (a²+b²) has no equivalent real factorisation, rather than forcing the
  difference-of-squares pattern onto it.
- The learner can factor a sum or difference of cubes a³±b³ using the fixed pattern
  (a±b)(a²∓ab+b²), correctly tracking that the binomial factor's sign matches the original
  expression while the trinomial factor's middle-term sign is always the OPPOSITE.
- The learner can recognise whether a trinomial genuinely fits the perfect-square-trinomial pattern
  (a±b)² = a²±2ab+b² by explicitly checking that the middle term equals exactly twice the product
  of the square roots of the outer terms — not merely by noticing that the outer terms are perfect
  squares.

## Core Understanding
These three pattern families are memorised shortcuts through the general factoring procedure
(`math.alg.factoring`) for algebraic shapes common enough to be worth instant recognition rather
than re-derivation from scratch every time. Difference of squares, a²−b² = (a+b)(a−b), is the most
structurally simple: two perfect-square terms connected by subtraction factor into a sum and a
difference of the two roots — and critically, this pattern has NO analogue for addition (a²+b² does
not factor into real linear factors at all, which is exactly why `math.alg.factoring`'s own
discriminant test on x²+9 returns a negative value). Sum and difference of cubes,
a³+b³ = (a+b)(a²−ab+b²) and a³−b³ = (a−b)(a²+ab+b²), follow one fixed pattern with a specific,
memorisable sign rule: the sign inside the binomial factor MATCHES the sign of the original
expression, while the middle term of the trinomial factor is always the OPPOSITE sign — a rule best
internalised by verifying the expansion, not by rote alone. Perfect square trinomials,
(a±b)² = a²±2ab+b², require the sharpest discrimination of the three: a trinomial with two
perfect-square outer terms is only a genuine instance of this pattern if the middle term is EXACTLY
twice the product of the outer terms' square roots — having two perfect squares present is
necessary but never sufficient on its own, and every one of the three patterns is verified, at zero
extra cost, by expanding the proposed factorisation back out and confirming it exactly reproduces
the original expression.

## Mental Models
1. **Beginner — these are three special "shapes" worth memorising, each with its own recognisable
   pattern.** Spot the shape (two squares subtracted; a sum/difference of cubes; a trinomial with
   square-looking ends), apply the matching formula. *Upgrade trigger*: an expression that looks
   like one of the shapes but isn't quite (a sum of squares; a near-miss trinomial), where blind
   pattern-matching produces a wrong or invalid answer. *Shelf life*: one session.
2. **Intermediate — every one of these patterns requires exact structural matching, not
   approximate resemblance, and verification by expansion is the tool that tells the difference.**
   Two perfect-square terms alone doesn't certify a perfect-square trinomial; two squared terms
   with subtraction doesn't certify factorability if the operation is actually addition (which has
   no real analogue). *Upgrade trigger*: a genuinely near-miss case deliberately designed to fail
   the exact check (Demonstration 3's 9x+25 case below). *Shelf life*: durable once the "verify
   by expansion" habit from `math.alg.factoring-gcf` and `math.alg.factoring` is carried forward
   here.
3. **Advanced — these three patterns are not independent facts but consequences of one underlying
   algebraic identity family, and the sign rules follow from direct multiplication, not
   memorisation alone.** (a+b)(a²−ab+b²) expands, term by term, to a³+b³ exactly because the
   cross terms cancel — this can be re-derived, not merely recalled, whenever the sign rule is in
   doubt. *Upgrade trigger*: a request to explain WHY the cube-factoring sign rule works, rather
   than simply apply it.
4. **Expert — special-pattern recognition and the general factoring decision tree are two
   complementary tools, and knowing WHEN to reach for a memorised pattern versus the general
   ac-method/grouping approach is itself a skill.** A quadratic that happens to fit the perfect-
   square-trinomial pattern can also be factored by the general ac-method — recognising the special
   pattern is simply faster, not a different kind of correctness. *Shelf life*: permanent.

## Why Students Fail
The single most frequent failure, and the one the Blueprint marks FOUNDATIONAL alongside the other
two, is attempting to apply the difference-of-squares pattern to a SUM of squares — a learner who
has fluently memorised a²−b² = (a+b)(a−b) pattern-matches on "two squared terms present" without
checking which operation connects them, producing an invalid "factorisation" of 9x²+25 (such as
attempting (3x+5)(3x−5), which expands back to 9x²−25, not 9x²+25) where no real factorisation
exists at all. The second major failure occurs specifically with sum/difference of cubes: the
sign-tracking rule (binomial matches the original's sign; trinomial's middle term is the OPPOSITE
sign) is easy to state but easy to invert under cognitive load, producing an answer like
(x+2)(x²+2x+4) for x³+8 instead of the correct (x+2)(x²−2x+4) — a plausible-looking but wrong
answer that the mandatory verification-by-expansion step is specifically designed to catch, since
expanding the wrong version fails to reproduce x³+8. The third failure is the sharpest
discrimination challenge of the three: recognising a genuine perfect-square trinomial requires
checking that the middle term equals EXACTLY twice the product of the square roots of the outer
terms, not merely noticing that the first and last terms are perfect squares — a trinomial like
x²+9x+25 has the same perfect-square outer terms as the genuine x²+10x+25, but the middle term
(9x, not the required 10x) fails the exact check, and a learner who accepts "looks like two
squares" as sufficient will incorrectly force this near-miss into the (x+5)² pattern.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — SUM-OF-SQUARES-INCORRECTLY-FACTORED-LIKE-DIFFERENCE** (foundational)
  - **Birth type**: Type 2, perceptual intuition — a sum of squares (a²+b²) and a difference of
    squares (a²−b²) are visually almost identical (two squared terms, differing only by a single
    operator sign), so pattern-matching on "two perfect squares present" overrides checking which
    operation actually connects them; this is the identical mechanism `math.alg.factoring`'s own
    MC-3 (IRREDUCIBLE-QUADRATIC-FACTORABLE) already names for the general case — see Curriculum
    Feedback below.
  - **Characteristic phrase**: attempting to factor 9x²+25 as if it were a difference of squares,
    producing an incorrect result such as (3x+5)(3x−5), which expands back to 9x²−25, not 9x²+25.
  - **Detection probe**: present 9x²+25 and check whether a factoring attempt using the difference
    pattern is made — any such attempt confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — expand the proposed factorisation back out and show
    directly that it does not reproduce the original sum-of-squares expression; state the rule
    plainly: difference of squares factors over the reals, sum of squares does not.
  - **Verification of death**: given a mixed set of sum-of-squares and difference-of-squares
    expressions, the learner correctly factors the difference cases and correctly identifies the
    sum cases as not factorable over the reals, justified by attempted expansion rather than a
    memorised visual rule alone.

- **MC-2 — CUBE-FACTORING-TRINOMIAL-MIDDLE-SIGN-REVERSED** (foundational)
  - **Birth type**: Type 4, notation-induced — the sign rule (binomial matches original; trinomial
    middle term is opposite) has two moving parts that are easy to invert under cognitive load,
    especially since both signs are determined by the SAME original sign but in OPPOSITE
    directions.
  - **Characteristic phrase**: for x³+8, writing (x+2)(x²+2x+4) instead of the correct
    (x+2)(x²−2x+4) — the trinomial's middle-term sign left matching rather than flipped.
  - **Detection probe**: present Example 2 (x³+8) and check the trinomial's middle-term sign in
    the learner's answer — a matching (rather than opposite) sign confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-verify by fully expanding the proposed
    factorisation; the sign mismatch surfaces directly and concretely when the cross terms fail to
    cancel correctly.
  - **Verification of death**: given both a sum-of-cubes and a difference-of-cubes problem, the
    learner correctly tracks both sign rules independently and verifies by expansion without being
    prompted.

- **MC-3 — PERFECT-SQUARE-TRINOMIAL-MIDDLE-TERM-NOT-VERIFIED** (foundational)
  - **Birth type**: Type 1, overgeneralisation — "the outer terms are perfect squares" is
    generalised to mean "this is a perfect square trinomial," when that condition is necessary but
    not sufficient; the middle-term check is skipped as if it were redundant confirmation rather
    than the actual deciding test.
  - **Characteristic phrase**: for x²+9x+25 (perfect-square outer terms, but middle term 9x, not
    the required 10x), incorrectly accepting it as (x+5)²-shaped.
  - **Detection probe**: present the near-miss trinomial (Example 3's x²+9x+25) and check whether
    it is incorrectly accepted as fitting the perfect-square pattern — acceptance confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-compute the REQUIRED middle term (2ab, using the
    square roots of the outer terms) explicitly and compare it directly against the actual middle
    term present; state the rule: two perfect-square outer terms are necessary but not sufficient,
    the middle term must match exactly.
  - **Verification of death**: given a set of near-miss and genuine perfect-square trinomials side
    by side, the learner correctly distinguishes them every time by explicitly computing and
    comparing the required middle term, not by visual resemblance alone.

## Analogies
- **A locksmith's key template versus a similar-looking blank.** A genuine perfect-square-trinomial
  key must match the template EXACTLY (every tooth, i.e. every coefficient, correct) — a key that
  looks similar but has one tooth in the wrong position (the middle term) simply will not turn the
  lock, however close the resemblance. *Where it holds*: the exact-match, not approximate-match,
  requirement for all three patterns. *Where it breaks*: a key either fits or doesn't with no
  partial credit, but these patterns DO reward partial recognition (spotting "two squared terms" is
  a genuinely useful first step toward checking the rest) — stated explicitly so the analogy isn't
  read as "don't bother checking the outer terms first."
- **Mirror-image twins who are identical except for one detail.** The sum-of-cubes and difference-
  of-cubes formulas are mirror images of each other, differing only in which signs flip — like
  twins who are identical except for a birthmark (the ONE sign that stays fixed: the trinomial's
  middle term is always opposite the original, regardless of which twin you're looking at).
  *Where it holds*: the "almost identical, one fixed difference" structure. *Where it breaks*: real
  twins don't have a rule connecting their differences to anything external — the sign rule here is
  DERIVABLE from direct multiplication (as the Advanced mental model states), which the twin
  analogy has no equivalent for and should not be relied upon to convey.

## Demonstrations
1. **Difference of squares versus sum of squares, side by side, directly confronting MC-1.** Factor
   9x²−25 and attempt to factor 9x²+25. 9x²−25: recognising (3x)²−5², factor as (3x+5)(3x−5).
   Verify: (3x+5)(3x−5) = 9x²−15x+15x−25 = 9x²−25 ✓. 9x²+25: attempting the same structure,
   (3x+5)(3x−5), expands to 9x²−25 ≠ 9x²+25 — the attempt fails verification, concretely showing
   no real factorisation of this form exists.
2. **Sum of cubes with explicit sign-tracking and verification, directly confronting MC-2.** Factor
   x³+8. Recognising 8=2³: using a³+b³=(a+b)(a²−ab+b²) with a=x, b=2: x³+8 = (x+2)(x²−2x+4).
   Verify by full expansion: (x+2)(x²−2x+4) = x³−2x²+4x+2x²−4x+8 = x³+8 ✓ — the cross terms
   (−2x²+2x² and 4x−4x) cancel exactly, which is WHY the trinomial's middle sign must be opposite:
   only that sign choice makes the cross terms cancel.
3. **Perfect square trinomial versus a deliberate near-miss, directly confronting MC-3.** Factor
   x²+10x+25 and evaluate x²+9x+25. x²+10x+25: first term x²=(x)², last term 25=5², required
   middle term 2·x·5=10x — MATCHES exactly, confirming x²+10x+25=(x+5)². Verify: (x+5)²=x²+10x+25
   ✓. x²+9x+25: same outer terms, but required middle term is still 10x while the actual middle
   term is 9x — does NOT fit the pattern; must be left unfactored or approached by
   `math.alg.factoring`'s general ac-method instead (which will also fail here, since this
   trinomial has no rational factorisation — a genuine confirmation, not a gap).

## Discovery Questions
- "You just used the pattern (a+b)(a−b) to factor 9x²−25. Now try the same trick on 9x²+25 — what
  happens when you multiply your answer back out? Does it match?" — surfaces MC-1 directly through
  self-checking computation.
- "For x³+8, you wrote (x+2)(x²+2x+4). Multiply that out fully. Do the middle x² and x terms
  cancel, or do they add up?" — surfaces MC-2 by making the learner discover the sign error through
  their own expansion, not a stated correction.
- "Both x²+10x+25 and x²+9x+25 have perfect-square first and last terms. Compute what the middle
  term WOULD have to be for the pattern to work exactly. Does 9x match that requirement?" — surfaces
  MC-3 by requiring the exact computation rather than accepting visual resemblance.

## Teaching Sequence
1. **Anchor**: connect to the already-secure `math.alg.factoring` — these are three high-value
   memorised shortcuts through a procedure the learner already understands generally, not three new
   independent topics.
2. **Teach difference of squares first, with the no-sum-analogue contrast built in from the start**
   (Demonstration 1) — establishing early that these patterns require exact structural matching,
   directly pre-empting MC-1.
3. **Teach sum/difference of cubes with the sign rule derived, not merely stated** (Demonstration
   2) — the verification-by-expansion step is what proves WHY the sign rule is what it is, directly
   pre-empting MC-2.
4. **Teach perfect square trinomials with the near-miss contrast built in from the start**
   (Demonstration 3) — establishing that "two perfect squares present" is necessary but not
   sufficient, directly pre-empting MC-3.
5. **Install verification-by-expansion as the unifying habit across all three families**: every
   worked example ends with a full expansion check, reinforcing this as one generalisable skill
   rather than three separate memorisation tasks.
6. **Practice mixed problems** deliberately including near-miss and non-factorable cases alongside
   genuine instances of each pattern, always requiring the exact check (not visual resemblance) to
   be shown before an answer is accepted.
7. **Bridge back**: state explicitly that when a special pattern doesn't apply (or its applicability
   is uncertain), `math.alg.factoring`'s general decision tree (GCF, classify by term count,
   ac-method, discriminant test) remains available as the fallback strategy.

## Tutor Actions
- Before accepting any "sum of squares doesn't factor" or "difference of squares factors" claim,
  ask the learner to state which operation (addition or subtraction) connects the two squared
  terms, out loud, before applying any pattern — this single question directly defends against
  MC-1's perceptual pattern-match.
- After any cube-factoring answer, ask "what sign is in your binomial factor, and what sign is in
  your trinomial's middle term — are they the same or different? Should they be?" before accepting
  the answer, targeting MC-2 directly.
- Before accepting any perfect-square-trinomial claim, ask the learner to compute 2ab explicitly
  (using the square roots of the outer terms) and state whether it equals the actual middle term
  present — never accept "the ends look square" alone as sufficient, targeting MC-3 directly.
- Never accept any of the three patterns' results without the full expansion-verification step
  shown, even on an otherwise-correct answer — the verification habit itself is part of what is
  being assessed, not merely the final factored form.

## Voice Teaching Notes
- When contrasting sum versus difference of squares aloud, audibly emphasise the connecting
  operator: "nine x squared, MINUS twenty-five" versus "nine x squared, PLUS twenty-five" — matching
  `math.alg.factoring`'s own established voice-teaching precedent for the identical perceptual
  distinction.
- When stating the cube sign rule aloud, use a consistent two-beat cadence every time: "binomial
  sign — SAME as the original... trinomial middle sign — OPPOSITE" — repeated identically across
  every example so the rule is heard as a fixed refrain, not re-derived in varying words each time.
- When checking a perfect-square-trinomial candidate aloud, say the required computation before
  comparing: "two times the square roots... is that what I actually see in the middle?" — spoken as
  a genuine question with a pause before the answer, modelling the check as something to actively
  perform, not skip.

## Assessment Signals
- **Correct + fast + verifies unprompted across all three families** → MASTERED; the learner has a
  reliable set of fast paths through the general factoring procedure.
- **Attempts to factor a sum of squares** → MC-1 active; needs the expand-and-check repair before
  advancing.
- **Cube-factoring sign pattern inverted** → MC-2 active; needs the sign-rule-via-expansion repair.
- **Perfect-square-trinomial pattern accepted on outer-term resemblance alone** → MC-3 active;
  needs the explicit 2ab-computation repair.
- **Cannot recognise any of the three shapes at all** → prerequisite gap in `math.alg.factoring`'s
  general decision tree or in basic squaring/cubing fluency, not specific to this concept's pattern
  recognition; route back accordingly rather than re-teaching the special patterns in isolation.

## Tutor Recovery Strategy
If a learner has just had a sum-of-squares "factorisation" attempt corrected (MC-1) and expresses
frustration that the two forms "look the same," validate the observation directly — they DO look
almost identical, and the entire point of this concept's verification habit is that visual
resemblance is not a reliable guide here; reframe the correction as revealing a useful, general
skill (checking by expansion) rather than as a careless mistake. If the cube sign rule (MC-2)
continues to invert after one correction, do not simply re-state the rule a second time — instead
walk the full expansion of (a+b)(a²−ab+b²) from scratch, showing exactly which terms cancel and
why, since a rule stated twice without re-derivation is unlikely to stick better the second time
than the first.

## Memory Hooks
- "Minus splits, plus doesn't" — the compact difference-of-squares/sum-of-squares distinction,
  reused verbatim from `math.alg.factoring`'s own memory hook for the identical underlying
  distinction (see Curriculum Feedback).
- "Same sign in front, opposite sign in the middle" — the cube-factoring sign rule stated as one
  short, repeatable phrase.
- "Two squares isn't enough — check the middle" — the perfect-square-trinomial discrimination rule,
  directly targeting MC-3's "necessary but not sufficient" trap.
- "Expand to check, every time" — the standing verification reflex shared across all three pattern
  families and consistent with `math.alg.factoring-gcf`'s identical closing hook.

## Transfer Connections
- **`math.alg.factoring`** (prerequisite, reused): these three patterns are fast paths through that
  concept's general decision tree — a learner fluent here reaches a correct factorisation faster
  for the specific shapes these patterns cover, but the general procedure remains the fallback for
  everything else.
- **`math.alg.rational-expressions`** (sibling concept, this same wave): simplifying a rational
  expression requires fully factoring both numerator and denominator before cancelling — a
  difference-of-squares or perfect-square-trinomial numerator/denominator is exactly the kind of
  structure these patterns let a learner factor instantly rather than working through the general
  procedure each time.

## Cross-Subject Connections
- **Physics** (`phys.` kinematics, energy relations): the difference-of-squares pattern appears
  directly in kinematics identities such as v²−u²=2as (rearranged forms), and in energy expressions
  involving a difference of squared quantities — a learner fluent in this pattern recognises the
  algebraic structure immediately rather than treating it as new content each time it appears in a
  physics derivation.
- **Chemistry** (`chem.` equilibrium, rate expressions): perfect-square-trinomial and
  difference-of-squares structures arise when solving quadratic equilibrium-constant expressions
  (e.g. completing the square in an ICE-table quadratic) — the identical algebraic pattern-
  recognition skill transfers without modification.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.factoring-special.md` — Component 0 (metadata: difficulty
  proficient, bloom apply, mastery_threshold 0.85, estimated_hours 5, requires
  [math.alg.factoring]); Component 6 (Misconception Registry MC-1..MC-3, reused above with
  birth-type classification added); Component 4 (worked examples for 16x²−49, x³−27, x²−14x+49,
  4x²+9, reused directly in the mastery-gate item bank); the P76 transfer probe (an engineering
  volume-difference scenario, factor x³+64 via sum-of-cubes with explicit verification, independence
  mode) — held in the Blueprint's own mastery-gate item bank, not restated here per the Standard's
  ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Genuine mechanism overlap, not duplication, with `math.alg.factoring`'s own MC-3
  (IRREDUCIBLE-QUADRATIC-FACTORABLE)**: both this concept's MC-1
  (SUM-OF-SQUARES-INCORRECTLY-FACTORED-LIKE-DIFFERENCE) and the prerequisite's MC-3 are the
  identical Type-2 perceptual-intuition error — a sum of squares mistaken for a factorable
  difference of squares — recorded independently by two Blueprints for two different concepts.
  This is correctly authored as two separate entries (the prerequisite covers the general
  discriminant-based irreducibility test; this concept covers the specific memorised pattern and
  its exact no-real-factorisation exception), now explicitly cross-referenced in both directions,
  and this concept's own "Minus splits, plus doesn't" memory hook is deliberately reused verbatim
  from the prerequisite's identical hook rather than re-derived. Recorded, not fixed — no Blueprint
  file was modified.
- No genuine metadata discrepancy was found between this Blueprint and the live KG.

## Version History
- 2026-09-11 — Initial authoring (Batch 6 / math.alg Wave 8 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.

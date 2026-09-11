# math.alg.factoring-trinomials

## Identity
- **KG ID**: `math.alg.factoring-trinomials`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.factoring-gcf` — load-bearing part: every trinomial-factoring attempt must begin with
    GCF extraction (a trinomial with an unextracted GCF hiding inside it will resist the AC-method's
    number search, or worse, produce a "factored" form that is not fully factored); without this
    fluency already secure, trinomial factoring inherits an unreliable first step.
- **Unlocks**: `math.alg.quadratic-equation`
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.alg.factoring-trinomials.md` (reused by reference
  throughout)

## Learning Objective
- The learner can factor a monic trinomial (x²+bx+c) by finding two integers whose product is c
  and whose sum is b, and write the factored form (x+p)(x+q).
- The learner can factor a non-monic trinomial (ax²+bx+c, a≠1) via the AC method — finding two
  integers whose product is ac (not c) and whose sum is b, splitting the middle term accordingly,
  and factoring by grouping — correctly generalising the monic case rather than treating it as an
  unrelated procedure.
- The learner can recognise, via the discriminant, when a quadratic trinomial is genuinely
  irreducible over the reals (most commonly a sum-of-squares shape) rather than assuming every
  trinomial factors with integer coefficients.

## Core Understanding
Factoring a trinomial ax²+bx+c is finding two lower-degree factors whose product reproduces it, and
the entire procedure reduces to one search: find two numbers with a specified product and a
specified sum. For the MONIC case (a=1), that search target is simple — product = c, sum = b —
and the factored form is read directly as (x+p)(x+q). For the NON-MONIC case (a≠1), the identical
search idea still applies, but the product target changes to ac (not c alone), because the middle
term must be split into two pieces that, together with the outer terms, factor cleanly by grouping:
compute ac, find p and q with p·q=ac and p+q=b, rewrite the trinomial as ax²+px+qx+c, then group
the first two and last two terms and extract each group's own GCF, revealing a shared binomial
factor. This is not two different rules but one rule (search for a product/sum pair) applied to two
different targets, with the monic case being the special instance where a=1 makes ac=c. As with
every factoring strategy in this domain, a GCF must be extracted first if one exists, and a
trinomial that resists every integer product/sum search should be checked via the discriminant
(b²−4ac): a negative discriminant confirms genuine irreducibility over the reals rather than a
missed factor pair.

## Mental Models
1. **Beginner — find two numbers that multiply to give the last number and add to give the middle
   number.** For x²+7x+12, find p,q with p·q=12, p+q=7 → (3,4) → (x+3)(x+4). *Upgrade trigger*: a
   trinomial with a leading coefficient other than 1, where "the last number" (c) alone is no
   longer the correct product target. *Shelf life*: one session.
2. **Intermediate — the search target changes from c to ac when the leading coefficient isn't 1,
   but the underlying search (product and sum) is identical.** Compute ac first, then search exactly
   as before; split the middle term using the found pair, then factor by grouping. *Upgrade
   trigger*: a sign-heavy non-monic trinomial, where splitting and grouping correctly (especially
   factoring a negative GCF from the second group) becomes its own source of error separate from
   finding the correct pair. *Shelf life*: durable once grouping-with-correct-signs is practiced
   explicitly.
3. **Advanced — a trinomial that resists every integer product/sum search is not necessarily a
   personal failure to find the pair — it may be genuinely irreducible, checkable by the
   discriminant.** b²−4ac<0 proves no real linear factors exist, most commonly recognisable as a
   sum-of-squares shape. *Upgrade trigger*: a trinomial whose discriminant is positive but not a
   perfect square (irrational roots) — factorable in principle via the quadratic formula, but not
   via integer factoring, a third outcome distinct from both "factors cleanly" and "irreducible."
4. **Expert — trinomial factoring is the direct algebraic route into solving quadratic equations:
   a factored trinomial's zero-product property gives the equation's roots without the quadratic
   formula.** *Shelf life*: permanent, and it is exactly this concept's own unlock,
   `math.alg.quadratic-equation`, that formalises factoring as the primary solving method.

## Why Students Fail
The single most frequent failure, and the one the Blueprint marks foundational, is applying the
monic shortcut (find two numbers with product c and sum b) directly to a non-monic trinomial where
a≠1 — for 3x²+10x+8, incorrectly searching for a pair multiplying to 8 (the constant term alone)
instead of the correct target, ac=24, missing the leading coefficient's role in the search
entirely; this is a direct generalisation failure, since the monic rule is genuinely a special case
of the AC method (where a=1 makes ac=c) rather than an unrelated procedure, but that relationship is
easy to lose sight of once the monic shortcut has become an automatic habit. The second major
failure occurs during the grouping step of the AC method itself: after correctly splitting the
middle term, factoring out a GCF from the second group requires careful sign-tracking — assigning
an incorrect sign to the second group's extracted factor (especially when that group's leading
coefficient is negative) produces a binomial that does not actually match the first group's
binomial factor, breaking the grouping step even when the initial product/sum pair was found
correctly. The third failure is the identical sum-of-squares misconception already established
elsewhere in this domain: attempting to factor x²+k² (a positive constant term with no real
factor pair, since the discriminant b²−4k²<0) as though it were a genuine factorable trinomial,
sometimes producing an incorrect result such as (x+k)(x+k), which expands to x²+2kx+k², not
x²+k² — a direct confirmation, via expansion, that no such factorisation exists.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — MONIC-SHORTCUT-FOR-NONMONIC** (foundational)
  - **Birth type**: Type 1, overgeneralisation — the monic rule (product=c, sum=b), practiced until
    automatic, is applied unchanged to a non-monic trinomial, where the correct product target
    (ac) differs from c whenever a≠1.
  - **Characteristic phrase**: for 2x²+7x+3, searching for a pair with product 3 (the constant term
    alone) rather than the correct product target, ac=6.
  - **Detection probe** (verbatim, Blueprint): for 2x²+7x+3, a student finds the pair (1,3) since
    1×3=3 and 1+3=4≠7, tries (3,1), concludes it does not factor. Confirms MC-1 — the correct
    product target is ac=6, not c=3; pair (1,6) gives (x+3)(2x+1).
  - **Repair**: Blueprint Repair Action B01 — restate the rule with its derivation: the product
    target = c only when a=1; for a≠1, the AC method's product target is always ac. The monic rule
    is the special case of the AC method where a=1 makes ac=c, not a separate rule.
  - **Verification of death**: given a mixed set of monic and non-monic trinomials, the learner
    correctly identifies and uses ac (not c alone) as the search target whenever a≠1, without
    hesitation.

- **MC-2 — SIGN-ERROR-IN-GROUPING** (moderate)
  - **Birth type**: Type 4, notation-induced — the sign of a GCF extracted from the second group
    during factoring-by-grouping is easy to assign incorrectly, especially when that group's
    leading coefficient is negative, producing a binomial that fails to match the first group's.
  - **Characteristic phrase**: for 2x²−5x+3 split as 2x²−2x−3x+3, incorrectly writing
    2x(x−1)−3(x+1) (mismatched binomials) instead of the correct 2x(x−1)−3(x−1).
  - **Detection probe** (verbatim, Blueprint): for the above split, the student's second group is
    written as −3(x+1) — checking whether −3x+3 genuinely equals −3(x+1) (it does not: −3(x+1) =
    −3x−3) confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — verify the extracted GCF by expanding it back through
    the binomial and comparing term-by-term to the original split terms, before proceeding to
    factor the outer product; −3x+3 = −3(x−1), confirmed by expansion.
  - **Verification of death**: given a grouping problem with a negative second-group leading term,
    the learner correctly extracts the sign and verifies the resulting binomial matches the first
    group's before writing the final factored product.

- **MC-3 — SUM-OF-SQUARES-FACTORABLE** (moderate)
  - **Birth type**: Type 2, perceptual intuition — identical mechanism to `math.alg.factoring`'s
    own MC-3 and `math.alg.factoring-special`'s own MC-1: a sum of squares is visually
    near-identical to a difference of squares, and the "positive constant, quadratic shape"
    pattern is mistaken for automatically factorable.
  - **Characteristic phrase**: attempting to factor x²+9 as (x+3)(x+3) or similar, which expands to
    x²+6x+9 or x²+9x²... — not x²+9, confirming no such real factorisation exists.
  - **Detection probe** (verbatim, Blueprint): given a set including x²+16 alongside genuinely
    factorable quadratics, identifying x²+16 as factorable (rather than irreducible) confirms MC-3.
  - **Repair**: Blueprint Repair Action — use the discriminant as the deciding computation: for
    x²+k², b²−4ac = 0−4k² < 0, confirming irreducibility over the reals regardless of how the
    expression visually resembles a familiar factorable pattern.
  - **Verification of death**: given a mixed set of sum-of-squares and factorable quadratics, the
    learner correctly identifies which factor and which do not, justified by the discriminant
    computation rather than visual resemblance alone.

## Analogies
- **A locksmith's combination search that changes its own target number.** Finding the
  product/sum pair is like searching a combination-lock database for two numbers matching a target
  product and sum — for the monic case the target product is stamped directly on the lock (c), but
  for the non-monic case the actual target (ac) must first be COMPUTED before the search can begin;
  searching with the wrong target number will never find the right combination. *Where it holds*:
  the "compute the real target before searching" structure. *Where it breaks*: a lock combination
  has no equivalent of "splitting the middle term and grouping" — this analogy covers only the
  product-target confusion (MC-1), not the mechanical grouping procedure, which must be taught
  directly.
- **Assembling furniture from two half-built pieces that must match exactly.** Factoring by
  grouping is like building two half-assembled sections of furniture that are only useful if their
  connecting joint (the shared binomial factor) matches EXACTLY — a sign error in one section
  produces a joint that looks similar but doesn't actually fit, revealed only by attempting to
  connect the pieces (checking the binomials match). *Where it holds*: the exact-match requirement
  directly targeting MC-2. *Where it breaks*: furniture pieces are checked by physical fit; algebra
  requires the explicit expand-and-compare verification step, which has no physical analogue and
  must be taught as its own habit.

## Demonstrations
1. **A clean monic factoring, establishing the base search procedure.** Factor x²−5x+6. GCF=1.
   Monic: find p,q with p·q=6, p+q=−5. Factor pairs of 6: (1,6),(2,3),(−1,−6),(−2,−3). Check sums:
   −2+(−3)=−5 ✓. Result: (x−2)(x−3). Verify: x²−3x−2x+6=x²−5x+6 ✓.
2. **The AC method on a non-monic trinomial, directly confronting MC-1.** Factor 6x²+7x−3. GCF=1.
   Non-monic: ac=6×(−3)=−18. Find p,q with p·q=−18, p+q=7: pair (9,−2). Split: 6x²+9x−2x−3. Group:
   3x(2x+3)−1(2x+3)=(3x−1)(2x+3). Verify: (3x−1)(2x+3)=6x²+9x−2x−3=6x²+7x−3 ✓.
3. **A sign-heavy grouping stress test, directly confronting MC-2.** Factor 2x²−x−6. ac=2×(−6)=−12;
   find p,q with p·q=−12, p+q=−1: pair (3,−4). Split: 2x²+3x−4x−6. Group carefully: x(2x+3)−2(2x+3)
   = (x−2)(2x+3). Verify the second group's sign explicitly: −4x−6 = −2(2x+3), confirmed by
   expansion (−2×2x=−4x, −2×3=−6). Full verify: (x−2)(2x+3)=2x²+3x−4x−6=2x²−x−6 ✓.
4. **Factorable versus irreducible, directly confronting MC-3.** Compare x²−9 and x²+9. x²−9:
   discriminant 0−4(1)(−9)=36>0, factors as (x−3)(x+3). x²+9: discriminant 0−4(1)(9)=−36<0,
   irreducible over the reals — no real linear factors exist, confirmed by the negative
   discriminant rather than merely "looking similar" to the factorable case.

## Discovery Questions
- "For 2x²+7x+3, you're searching for two numbers. What should they multiply to — the last number
  alone, or something that also involves the leading coefficient?" — surfaces MC-1 by making the
  learner reconsider the search target before attempting it.
- "You wrote −3x+3 as −3(x+1). Multiply that back out. Does it actually equal −3x+3, or something
  else?" — surfaces MC-2 through direct self-checking computation.
- "x²+16 has a positive constant and looks like a quadratic that should factor. Try computing its
  discriminant. What does a negative result tell you?" — surfaces MC-3 by requiring the exact
  computational check rather than accepting visual resemblance.

## Teaching Sequence
1. **Anchor**: connect to the already-secure `math.alg.factoring-gcf` — GCF extraction is always
   the first step here too, and this concept's search procedure builds on the same "find a
   product/sum pair" idea already familiar from the monic-case intuition most learners bring in.
2. **Establish the monic case first, cleanly** (Demonstration 1), before introducing any
   complication.
3. **Bridge explicitly to the non-monic case via the AC method** (Demonstration 2), stating the
   monic rule as a and's special case (a=1 makes ac=c) rather than a separate procedure, directly
   pre-empting MC-1.
4. **Install grouping-with-verified-signs as its own explicit skill** (Demonstration 3), requiring
   the expand-and-compare check on every extracted group, directly pre-empting MC-2.
5. **Introduce the irreducibility check via the discriminant, contrasted directly against a
   factorable case** (Demonstration 4), directly pre-empting MC-3.
6. **Practice mixed problems** deliberately combining monic, non-monic, and irreducible cases,
   always requiring the correct product target to be stated before the search begins.
7. **Bridge forward**: state explicitly that a factored trinomial directly yields a quadratic
   equation's roots via the zero-product property, previewing `math.alg.quadratic-equation`.

## Tutor Actions
- Before accepting any product/sum search, ask "what is the leading coefficient here, and what
  should your product target actually be?" — this single question directly defends against MC-1 by
  forcing the ac-vs-c distinction to the front of the procedure.
- After any grouping step, ask "multiply your extracted factor back through the binomial — does it
  reconstruct the original split terms exactly?" — targeting MC-2 at the moment the error would be
  made.
- Before accepting any "cannot be factored" or "factors as..." claim on a positive-constant
  trinomial with no obvious integer pair, ask for the discriminant computation explicitly —
  targeting MC-3 with a computational check rather than accepting a guess either way.
- Never accept a factored trinomial without the full expand-and-verify step shown, matching the
  verification discipline already established in `math.alg.factoring-gcf` and
  `math.alg.factoring-special`.

## Voice Teaching Notes
- When introducing the AC method, say the computation aloud before naming any candidate pair: "a
  times c... six times minus three... is minus eighteen. Now, what two numbers multiply to minus
  eighteen and add to seven?" — hearing the ac computation performed first models it as the
  mandatory opening step, directly countering MC-1.
- When verifying a grouping step aloud, narrate the check explicitly: "minus three, times x minus
  one... does that give me back minus three x plus three? Yes." — spoken verification reinforces
  the habit as an audible ritual, targeting MC-2.
- When contrasting factorable and irreducible trinomials aloud, use the same audible operator
  emphasis already established for `math.alg.factoring`/`factoring-special`: "x squared, MINUS
  nine" versus "x squared, PLUS nine."

## Assessment Signals
- **Correct + fast + explains the ac-vs-c relationship unprompted** → MASTERED; ready for
  `math.alg.quadratic-equation`.
- **Monic case correct, non-monic case fails or reverts to the c-only search** → MC-1 active; needs
  the ac-as-generalisation repair.
- **Correct pair found, grouping sign error produces mismatched binomials** → MC-2 active; needs
  the expand-and-verify grouping repair.
- **Attempts to factor a sum of squares** → MC-3 active; needs the discriminant-based
  irreducibility repair, consistent with `math.alg.factoring`'s and `math.alg.factoring-special`'s
  identical repair for the same mechanism.
- **Cannot extract the GCF before attempting trinomial factoring** → prerequisite gap in
  `math.alg.factoring-gcf`, not a trinomial-specific misconception; route back to that concept.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and expresses frustration that "the rule I knew stopped
working," reframe directly: the monic rule was never wrong, it was incomplete — it is the a=1 case
of a single more general rule, and the correction is an extension, not a contradiction, of what
they already know. If sign errors in grouping (MC-2) persist after one correction, do not simply
restate the rule — instead walk the full expand-and-compare check on the learner's own submitted
group, since seeing their own specific error caught by verification is more durable than a generic
restated rule.

## Memory Hooks
- "a times c, always check first" — reused deliberately from the established "a times c, not c
  alone" framing already used in `math.alg.factoring`'s treatment of the ac-method, directly
  targeting MC-1.
- "Multiply back to check the group" — the grouping-verification habit, directly targeting MC-2.
- "Minus splits, plus doesn't" — reused verbatim from `math.alg.factoring` and
  `math.alg.factoring-special`'s identical hook for the same sum-of-squares distinction, directly
  targeting MC-3.

## Transfer Connections
- **`math.alg.quadratic-equation`** (direct unlock): a factored trinomial's zero-product property
  gives a quadratic equation's roots directly — factoring is the primary solving method that
  concept formalises.
- **`math.alg.factoring-gcf`** (prerequisite, reused): every trinomial factoring attempt begins
  with this concept's GCF-extraction fluency.
- **`math.alg.factoring`** and **`math.alg.factoring-special`** (siblings in the same decision
  tree): this concept specialises the general factoring strategy's trinomial branch, and shares the
  identical sum-of-squares irreducibility mechanism (MC-3) with both.

## Cross-Subject Connections
- **Physics** (`phys.` kinematics, projectile motion): factoring a quadratic time-of-flight
  expression to find when a projectile returns to a given height is a direct application of the
  monic/non-monic trinomial-factoring procedure taught here.
- **Chemistry** (`chem.` equilibrium expressions): solving a quadratic equilibrium-constant
  expression (e.g. an ICE-table quadratic) by factoring reuses this exact product/sum search
  procedure, with the discriminant test carrying the physically meaningful reading "no real
  concentration solves this" when it is negative.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.factoring-trinomials.md` — Component 0 (metadata: difficulty
  proficient, bloom apply, mastery_threshold 0.8, estimated_hours 8, requires
  [math.alg.factoring-gcf], unlocks [math.alg.quadratic-equation]); Component 2 (Misconception
  Registry MC-1..MC-3, reused above with birth-type classification added); Component 4 (worked
  examples for x²−5x+6, 6x²+7x−3, 2x²−x−6, reused directly in the Demonstrations above); the P76
  transfer probe (factor 6x³−x²−12x completely via GCF + AC method, independence mode) — held in
  the Blueprint's own mastery-gate item bank, not restated here per the Standard's ownership
  boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Third instance of the identical sum-of-squares mechanism, cross-referenced**: this concept's
  MC-3 (SUM-OF-SQUARES-FACTORABLE) is the same Type-2 perceptual error already documented in
  `math.alg.factoring`'s MC-3 (IRREDUCIBLE-QUADRATIC-FACTORABLE) and
  `math.alg.factoring-special`'s MC-1 (SUM-OF-SQUARES-INCORRECTLY-FACTORED-LIKE-DIFFERENCE) —
  independently authored across three Blueprints, each covering a different scope (general
  discriminant test; memorised-pattern exception; trinomial-search failure mode). Correctly
  authored as three separate entries given the different contexts each arises in, now
  cross-referenced across all three, and this entry's memory hook is deliberately reused verbatim
  rather than re-derived. Recorded, not fixed — no Blueprint file was modified.

## Version History
- 2026-09-11 — Initial authoring (Batch 7 / math.alg Wave 9 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.

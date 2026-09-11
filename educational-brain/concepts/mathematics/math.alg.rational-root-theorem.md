# math.alg.rational-root-theorem

## Identity
- **KG ID**: `math.alg.rational-root-theorem`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.polynomial-roots` — load-bearing part: this concept teaches a systematic SEARCH
    strategy for a specific kind of root (rational ones); without the already-secure concept of
    what a root is and how roots relate to factors, the theorem's candidate list has nothing to
    connect the search back to.
  - `math.nt.divisibility` — load-bearing part: generating the candidate list requires finding all
    divisors of the constant term and leading coefficient, which is exactly that concept's own
    skill; without it, the divisor-generation step (Learning Objective 1) has no foundation.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.alg.rational-root-theorem.md` (reused by
  reference throughout)
- **KG note**: this concept's KG parent is `math.alg.polynomial-roots`, and it is a cross-domain
  bridge concept — the second requirement, `math.nt.divisibility`, connects the algebra domain
  directly to the already-CERTIFIED `math.nt` domain, reusing that domain's fluency rather than
  re-teaching divisor-finding from scratch.

## Learning Objective
- The learner can list all POSSIBLE rational roots of a given integer-coefficient polynomial using
  the Rational Root Theorem: p divides the constant term, q divides the leading coefficient,
  candidates are ±p/q.
- The learner can TEST candidate rational roots (by substitution or synthetic division) to
  determine which, if any, are ACTUAL roots of the polynomial, testing each candidate as an
  independent check rather than stopping after the first failure.
- The learner can recognise the theorem's LIMITS: it only applies to polynomials with INTEGER
  coefficients, only lists possible RATIONAL roots (the polynomial may have irrational or complex
  roots not on this list at all), and provides candidates to TEST, never guaranteed actual roots.

## Core Understanding
The Rational Root Theorem states that for a polynomial with INTEGER coefficients, any RATIONAL
root, written in lowest terms as p/q, must satisfy p divides the constant term and q divides the
leading coefficient. This generates a FINITE LIST of candidate rational roots — every combination
of a constant-term divisor over a leading-coefficient divisor, with both signs — but the theorem
does NOT guarantee any of these candidates is an actual root; it only narrows an otherwise
unbounded search down to a manageable finite set, which must then be TESTED one candidate at a
time, each test independent of the others. Critically, the theorem says nothing at all about
IRRATIONAL or COMPLEX roots — a polynomial may genuinely have roots that are neither rational nor
appear anywhere on this candidate list, and when every rational candidate fails testing, the
correct conclusion is narrowly "no RATIONAL roots exist," not the broader and incorrect "no roots
exist at all" — the polynomial's actual roots, if it has any, simply require a different technique
entirely (such as the quadratic formula for a quadratic factor, or numerical/graphical methods for
higher degrees).

## Mental Models
1. **Beginner — list the divisors of the constant term and leading coefficient, form fractions,
   and test them to find rational roots.** For 2x³−3x²−11x+6, list divisors of 6 and 2, form ±p/q
   combinations, test each. *Upgrade trigger*: the first tested candidate fails, tempting a
   premature "no rational roots" conclusion before the remaining candidates have been checked.
   *Shelf life*: one session.
2. **Intermediate — every candidate on the list is an INDEPENDENT test; a failure at one candidate
   provides zero information about any other candidate, so the full list must be exhausted before
   any "no rational roots" conclusion is drawn.** *Upgrade trigger*: exhausting the entire
   candidate list without success, raising the question of what conclusion is actually warranted at
   that point. *Shelf life*: durable once the full-list discipline becomes automatic.
3. **Advanced — the theorem provides candidates to test, not roots to trust, and when the entire
   candidate list is exhausted without success, the only warranted conclusion is "no RATIONAL
   roots" — the polynomial may still have real (irrational) or complex roots the theorem was never
   designed to detect in the first place.** *Upgrade trigger*: being shown a concrete case (like
   x²−2=0) where the true irrational roots are found by a completely different method after the
   rational search comes up empty.
4. **Expert — the Rational Root Theorem is a targeted search tool for one specific kind of root
   among several possible kinds (rational, irrational, complex), and knowing what it can and
   cannot conclude is as important as knowing how to execute the search procedure itself.**
   *Shelf life*: permanent, and it directly informs when to reach for this theorem versus other
   root-finding techniques.

## Why Students Fail
The single most frequent failure, ranked foundational, is stopping the candidate-testing process
after the FIRST candidate fails, incorrectly concluding no rational roots exist without testing the
remaining candidates — for 2x³−3x²−11x+6, testing x=2 (which fails, giving −12≠0) and stopping
there, when x=3 (untested) is in fact a genuine root; each candidate is an entirely independent
test, and a single failure carries no information whatsoever about any other candidate on the list.
The second failure, equally ranked foundational, is concluding a polynomial has NO ROOTS WHATSOEVER
after exhausting the rational candidate list without success, rather than correctly concluding only
that no RATIONAL roots exist — for x²−2=0, testing all four candidates (±1, ±2) and finding none
work does NOT mean the equation has no solutions at all; its actual roots, x=±√2, are irrational
and therefore never appear on any Rational Root Theorem candidate list no matter how carefully the
divisors are computed, since the theorem was never designed to detect irrational roots in the first
place. The third failure is a mechanical one: missing one or more divisors of the constant term or
leading coefficient when generating the candidate list — producing an incomplete set of candidates
to test, which can cause a genuine rational root to be missed entirely simply because it was never
included in the search, independent of any testing discipline applied afterward.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — CANDIDATE-TESTING-ABANDONED-AFTER-ONE-FAILURE** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation — a single negative result is treated as
    representative of the whole search, generalising one candidate's failure to a conclusion about
    every candidate, when each test is genuinely independent.
  - **Characteristic phrase**: testing x=2 in 2x³−3x²−11x+6 (which fails), then stopping and
    concluding no rational roots exist, without testing x=3 (a genuine root).
  - **Detection probe** (verbatim, Blueprint): presenting Example 2 and checking whether testing
    stops after x=2 fails — confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-state that each candidate is an independent test,
    requiring the FULL list to be checked before any "no rational roots" conclusion is reached.
  - **Verification of death**: given a candidate list with a failing first entry and a genuine root
    later in the list, the learner tests every candidate through to completion, unprompted.

- **MC-2 — NO-RATIONAL-ROOTS-CONCLUDED-AS-NO-ROOTS-AT-ALL** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation — the theorem's specific scope (rational roots only)
    is silently dropped, so "no candidates on THIS list worked" is overgeneralised to "no roots
    exist in any number system."
  - **Characteristic phrase**: for x²−2=0, exhausting the candidates ±1, ±2 and concluding "no
    roots exist" instead of the correct "no rational roots exist — the actual roots are irrational."
  - **Detection probe** (verbatim, Blueprint): presenting Example 3's exhausted-candidates case and
    checking whether "no roots" (rather than the correct "no rational roots") is concluded —
    confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — reveal the true irrational roots ±√2 explicitly,
    demonstrating that roots genuinely exist despite the rational search coming up empty.
  - **Verification of death**: given a polynomial with no rational roots, the learner correctly
    states "no RATIONAL roots exist" (never the unqualified "no roots exist"), and recognises
    irrational or complex roots may still be present.

- **MC-3 — DIVISOR-LIST-INCOMPLETE** (moderate)
  - **Birth type**: Type 5, instruction-induced — divisor lists are frequently generated from
    memory or by pattern rather than systematically, so a genuine divisor can be silently missed,
    especially for less-common numbers.
  - **Characteristic phrase**: listing divisors of the constant term or leading coefficient
    incompletely, missing a genuine divisor and therefore omitting a valid candidate root.
  - **Detection probe**: reviewing a submitted candidate list against the full, correct divisor set
    — an incomplete list confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-derive the divisors systematically, checking every
    integer from 1 up to the value itself for exact division, rather than listing from memory or
    incompletely.
  - **Verification of death**: given several constant terms and leading coefficients, the learner
    systematically generates the complete, correct divisor set every time.

## Analogies
- **A locksmith trying every key on a labelled ring, one at a time, regardless of earlier
  failures.** Testing each rational-root candidate is like trying every key on a ring one by one —
  a key that doesn't fit tells you nothing about whether the NEXT key will fit; you must try every
  key on the ring before concluding none of them work. *Where it holds*: the independence of each
  test, directly targeting MC-1. *Where it breaks*: a locksmith's ring contains every key that
  COULD possibly work; the Rational Root Theorem's "ring" only contains RATIONAL candidates — there
  may be a genuine key (an irrational or complex root) that was never on this particular ring at
  all, which the locksmith analogy alone doesn't convey and must be paired with MC-2's own
  correction.
- **Searching a specific filing cabinet, not the entire building.** The Rational Root Theorem
  searches only the "rational roots" filing cabinet — if nothing is found there, it means nothing
  is filed under "rational," not that the entire building (all possible roots, of any kind) is
  empty. *Where it holds*: the "search is scoped, not exhaustive of everything" structure, directly
  targeting MC-2. *Where it breaks*: a building's other cabinets are searchable by walking to them;
  finding an irrational root genuinely requires an entirely different technique (not merely
  "looking elsewhere with the same method"), which this concept does not itself supply.

## Demonstrations
1. **Generating the full candidate list systematically, establishing the base skill.** For
   2x³−3x²−11x+6=0: constant term=6 (divisors ±1,±2,±3,±6), leading coefficient=2 (divisors
   ±1,±2). Candidates p/q: ±1,±2,±3,±6,±1/2,±3/2 — a list of 12 possible rational roots to test.
2. **Testing candidates one by one, directly confronting MC-1.** Testing x=2 in
   2x³−3x²−11x+6: 2(8)−3(4)−11(2)+6=16−12−22+6=−12≠0 — NOT a root. Testing x=3:
   2(27)−3(9)−11(3)+6=54−27−33+6=0 ✓ — a genuine root, found only because testing CONTINUED past
   the first failure.
3. **An exhausted candidate list with genuine irrational roots underneath, directly confronting
   MC-2.** For x²−2=0: candidates ±1,±2 (divisors of the constant term −2 over divisors of the
   leading coefficient 1). Testing all four: none satisfy x²−2=0. This does NOT mean the equation
   has no roots — its actual roots, x=±√2, are irrational and therefore never appear on any
   Rational Root Theorem candidate list, regardless of how carefully the divisors were computed.

## Discovery Questions
- "You tested x=2 in this cubic and it failed. Does that tell you anything about whether x=3
  works? Should you test it anyway?" — surfaces MC-1 by requiring the learner to justify continuing
  (or not continuing) the search.
- "You've tested every candidate for x²−2=0 and none worked. Does that mean this equation has
  absolutely no solutions, or does it mean something more specific?" — surfaces MC-2 by directing
  attention to the precision of the conclusion being drawn.
- "List every divisor of 12. Did you check every integer from 1 up to 12, or did you list them from
  memory? Could you have missed one?" — surfaces MC-3 by requiring a systematic, not recalled,
  divisor search.

## Teaching Sequence
1. **Anchor**: connect explicitly to the already-secure `math.alg.polynomial-roots` (what a root
   is) and `math.nt.divisibility` (finding divisors) — this concept combines both into a targeted
   search strategy for rational roots specifically.
2. **Establish systematic divisor-generation first** (Demonstration 1), directly pre-empting MC-3
   by modelling a complete, methodical search rather than a recalled list.
3. **Install the full-list testing discipline explicitly** (Demonstration 2), directly pre-empting
   MC-1 by showing a genuine root found only past an earlier failure.
4. **Introduce the theorem's scope limits directly, with a genuine irrational-root case**
   (Demonstration 3), directly pre-empting MC-2 by making the "search is scoped, not exhaustive"
   distinction concrete rather than abstract.
5. **Practice mixed problems** deliberately combining cases with genuine rational roots, cases with
   none, and polynomials requiring a complete divisor search, always requiring the precise "no
   RATIONAL roots" (never "no roots") conclusion when appropriate.
6. **Bridge forward**: state explicitly that when the rational search is exhausted without success,
   other techniques (the quadratic formula for a quadratic factor, or numerical methods more
   generally) remain available for finding the polynomial's actual roots.

## Tutor Actions
- After any failed candidate test, ask "does that failure tell you anything about the next
  candidate on the list? Should you test it?" — this single question directly defends against MC-1.
- Before accepting a "no roots" conclusion after an exhausted candidate search, ask "is that
  precisely true, or does it mean something narrower — no RATIONAL roots?" — targeting MC-2
  directly.
- Before accepting any candidate list, ask the learner to show their divisor search systematically
  (checking every integer up to the value) rather than reciting divisors from memory — targeting
  MC-3 directly.
- Never accept a "no rational roots" conclusion without every candidate on the correctly-generated
  list shown as tested.

## Voice Teaching Notes
- When testing candidates aloud, narrate each one as a fresh, independent check: "next candidate...
  test it fresh, the last one tells us nothing about this one" — audibly reinforcing independence,
  directly targeting MC-1.
- When concluding an exhausted search aloud, use precise language every time: "no RATIONAL roots —
  not necessarily no roots at all" — the explicit qualifier spoken aloud reinforces the correct
  scope, directly targeting MC-2.
- When generating a divisor list aloud, count through systematically: "one, does it divide? Two,
  does it divide?..." — the audible systematic count reinforces the complete-search habit,
  targeting MC-3.

## Assessment Signals
- **Correct + fast + tests every candidate through completion, states "no rational roots" precisely
  when appropriate** → MASTERED.
- **Testing stops after one failed candidate** → MC-1 active; needs the full-list-discipline
  repair.
- **"No roots at all" concluded after an exhausted rational search** → MC-2 active; needs the
  scope-limit repair with a genuine irrational-root example.
- **Candidate list missing a genuine divisor** → MC-3 active; needs the systematic-divisor-search
  repair.
- **Cannot connect "root" to "factor" or cannot find divisors at all** → prerequisite gap in
  `math.alg.polynomial-roots` or `math.nt.divisibility` respectively, not specific to this
  concept's search-strategy content; route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and expresses frustration at "having to test everything
anyway," validate the tedium directly while reframing its purpose — the theorem's whole value is
narrowing an otherwise unbounded search to a finite, manageable list; the remaining testing work,
while real, is bounded and finite precisely because of the theorem, not despite it. If MC-2
persists after one correction, avoid simply restating the distinction — instead have the learner
verify directly, by substitution, that √2 genuinely satisfies x²−2=0 while none of the rational
candidates do, since a concrete, self-verified contrast is more durable than a restated rule for
this specific scope-limiting error.

## Memory Hooks
- "Each candidate is a fresh test" — the independence-of-testing rule, directly targeting MC-1.
- "No RATIONAL roots, not no roots" — the theorem's scope-limit, directly targeting MC-2.
- "Check every integer up to the number" — the systematic divisor-search discipline, directly
  targeting MC-3.

## Transfer Connections
- **`math.alg.polynomial-roots`** (prerequisite, reused): this concept is a targeted search
  strategy for a specific kind of root (rational) within that concept's broader root-counting and
  classification framework.
- **`math.nt.divisibility`** (cross-domain prerequisite, reused): the divisor-generation step
  directly reuses that already-certified domain's own fluency, rather than re-teaching it.
- **`math.alg.quadratic-formula`**, **`math.alg.discriminant`** (indirect, sibling concepts): when
  the rational search is exhausted for a quadratic factor, the quadratic formula remains available
  as the fallback technique for finding the actual (possibly irrational or complex) roots.

## Cross-Subject Connections
- **Computer science** (`cs.` algorithm design): the Rational Root Theorem's "narrow to a finite
  candidate set, then test exhaustively" structure is a direct instance of a search-space-pruning
  strategy — a pattern that recurs throughout algorithm design whenever an infinite search can be
  reduced to a finite, checkable set.
- **Engineering** (`phys.`/`cs.` design constraints): the Blueprint's own transfer probe frames a
  cubic design-constraint equation with no "nice" rational solution — a realistic engineering
  scenario where knowing that a rational root search has been exhausted (and what that does and
  doesn't imply) is itself practically useful information, distinct from merely finding an answer.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.rational-root-theorem.md` — Component 0 (metadata:
  difficulty proficient, bloom apply, mastery_threshold 0.80, estimated_hours 4, requires
  [math.alg.polynomial-roots, math.nt.divisibility]); Component 6 (Misconception Registry
  MC-1..MC-3, reused above with birth-type classification added); Component 4 (worked examples for
  2x³−3x²−11x+6=0 and x²−2=0, reused directly in the Demonstrations above); the P76 transfer probe
  (an engineering design-constraint cubic x³−x−1=0 with no rational root, requiring the theorem's
  scope-limit understanding to be applied to a genuinely realistic case, independence mode) — held
  in the Blueprint's own mastery-gate item bank, not restated here per the Standard's ownership
  boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored sibling entry. This concept's cross-domain dependency on the already-CERTIFIED
  `math.nt` domain (via `math.nt.divisibility`) is the first instance in this campaign's math.alg
  work of a genuine cross-domain requires edge being exercised in practice, not merely declared —
  recorded as a confirmed, working connection.

## Version History
- 2026-09-11 — Initial authoring (Batch 11 / math.alg Wave 12 part 2 of the Mathematics Educational
  Brain completion campaign). Blueprint reused by reference in full. No KG or Blueprint file
  modified.
